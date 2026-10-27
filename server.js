/* 随心字幕 AI (AI-SRTSub) - 后端服务
 * - 托管静态文件（index.html / srt-core.js / admin.html）
 * - POST /api/translate    代理转发到管理员配置的默认模型（Key 只存服务端）
 * - GET  /api/model-info   前端探测默认模型配置状态（不含 Key）
 * - 管理接口：/api/admin/login|config|test（密码登录 + 热更新配置）
 * - 限流：按 IP 每日请求数 + 全站每日总量（data/usage.json 持久化）
 * 零依赖：仅用 Node 内置模块。Node >= 18（fetch）。
 */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
/* v0.9.348：两件事 ——
   ① D 槽从「整个槽锁给一个任务」细化成「按模型档认领」：3 档可同时服务 3 个任务，
      任务结束（前端 POST /api/model-done）立刻释放，闲置 3 分钟只是兜底。
   ② 质检补洞：纯拉丁译文在 CJK 目标下曾被 anchorOk 无条件放行，导致「两条 cue 并成
      一条翻译、后一条原样返回英文」整段通过。新增 sameAsSource（与源文比对）+
      looksUntranslated（无 CJK 且 ≥3 词含功能词）。 */
/* v0.9.343：100 种语言的单一数据源（代码 / 自称 / dir / 是否中日韩）。
   页脚多语言互链要用它的 zh（语言自称）与 dir 字段 —— 别在 server.js 里另抄一份名册。 */
const LANGS100 = require(path.join(__dirname, 'langs100.js'));

const ROOT = __dirname;
/* v0.9.348：允许用 DATA_DIR 指向独立目录 —— 只为端到端测试时能起一个不碰真实配置的实例。
   不设这个环境变量时行为与之前完全一致（生产环境不会设）。 */
const DATA_DIR = process.env.DATA_DIR ? path.resolve(process.env.DATA_DIR) : path.join(ROOT, 'data');
const CONFIG_PATH = path.join(DATA_DIR, 'config.json');
const USAGE_PATH = path.join(DATA_DIR, 'usage.json');
const PORT = Number(process.env.PORT) || 3000;
/* v0.9.368：服务端注入的静态资源版本号（目前只有 seo-alt.js）。
   以前这类注入要么不带 ?v=、要么在字符串里手写版号 —— 升号时必漏。统一走这个常量，
   单测会校验它与 index.html 里的 ?v= 一致。 */
const ASSET_VER = '0.9.398';

/* ---------------- 配置 ---------------- */
const DEFAULTS = {
  provider: '',            // 预设名（仅展示用）
  base: '',                // 如 https://api.deepseek.com
  model: '',               // 如 deepseek-chat
  key: '',                 // API Key（只存服务端）
  perIpDaily: 20,          // 每 IP 每日翻译请求数上限
  globalDaily: 300,        // 全站每日翻译请求总量上限
  adminHash: '',           // 管理密码 sha256(hex)
  publicUrl: '',           // 站点公开 URL（SEO canonical/sitemap 前缀；空=按请求头）
  analyticsId: '',         // GA4 统计 ID（如 G-XXXXXXX；空=不注入统计代码）
  temperature: 0.2,        // 采样温度 0-2（v0.9.91 起可在 admin 配置，此前硬编码 0.2）
  /* --- 双模型 + 按目标语言分流（v0.9.119）---
     模型 A = 上面那组 provider/base/model/key（老配置原样可用，零迁移）；
     模型 B = 下面带 2 后缀的那组，留空即不启用，全部语言走 A。
     判定只看目标语言（请求里的 meta.lang），其它维度不参与。 */
  provider2: '',
  base2: '',
  model2: '',
  key2: '',
  extraParams: {},         // 模型 A 的附加请求参数（平铺 JSON 对象，如 {"enable_thinking":false}）
  extraParams2: {},        // 模型 B 的附加请求参数
  langModelB: [],          // 走模型 B 的目标语言码数组（如 ['ja','th']）；空 = 全部走 A
  fallbackToA: true,       // 模型 B/C 调用失败时自动回退（事件里记 fallback 次数）
  /* --- 模型 C（v0.9.193）：与 B 同结构，后缀 3。优先级 C > B > A ---
     分流：先查 langModelC → C，再查 langModelB → B，否则 A。
     回退：C 失败 → B → A（逐级，B 未配全则直接跳到 A）。
     ⚠️ langModelC 默认留空 = C 不接管任何语言，配好参数也不会有流量进来，
        由你在后台手动挑语言试点。要让它接管，把语言码填进 langModelC 即可。 */
  provider3: '',
  base3: '',
  model3: '',
  key3: '',
  extraParams3: {},        // 模型 C 的附加请求参数
  langModelC: [],          // 走模型 C 的目标语言码数组；空 = C 不参与分流
  /* --- 模型 D（v0.9.345）：Gemini 免费额度池 ---
     与 A/B/C 的根本差别：额度单位是**请求次数**（免费层 RPM / RPD），不是 token。
     一个槽带 1~3 个 key：单个 key 到限就换下一个，三个都到限才跨槽降级 C → B → A。
     优先级 D > C > B > A —— D 是唯一「免费优先」的槽，配好就该先吃它的额度。 */
  provider4: '',
  base4: '',
  model4: '',              // 兼容字段：等于 models4[0].name（老代码/老配置都认它）
  keys4: [],               // 1~3 个 API Key：顺序填充，用完一个才动下一个（不是轮询）
  /* v0.9.347：模型池。Google 的免费额度按「项目 × 模型」各自独立算，挂几档就有几份额度。
     数组顺序 = 优先级（强的在前）：上一档的 key 全用满才降下一档。
     每档独立 RPM / RPD —— 不同模型的免费档位本来就不一样。
     v0.9.361：降级为**兼容字段** —— 等于第一把有 key 的槽的模型列表。老前端与老配置仍认它。 */
  models4: [],
  /* v0.9.361：key 为第一层的模型配置。下标与 keys4 一一对应（固定 3 项）：
       [{ label:'项目A', on:true, models:[{ name, rpm, rpd, on }] }, …]
     为什么改成 key 先：Google 的免费额度是「按项目」给的，一把 key 只属于一个项目，
     而不同项目里开通的模型不一定相同（有的项目只有 lite）。原来的「全局模型池 × 所有 key」
     做笛卡尔积，会给没开通的模型格子也记一份额度 —— 判「这一集够不够跑完」时虚高，
     跑到一半撞 403/429 再降档。改成 key 下挂自己的模型，容量才是真的。
     调度顺序：Key 1 的模型从上到下 → Key 1 全用满 → Key 2 的模型从上到下 → …
     （用户 2026-10-22 定案：不要跨 key 轮询均摊，一把一把用干净）。 */
  keyModels4: [],
  extraParams4: {},
  langModelDAll: true,     // true = 全部目标语言先走 D；false = 只走 langModelD 列出的
  langModelD: [],
  rpmD: 15,                // 兼容字段：等于 models4[0].rpm（models4 为空时才是唯一模型的 RPM）
  rpdD: 1500,              // 兼容字段：等于 models4[0].rpd
  hourlyD: 0,              // v0.9.346：整槽每小时补多少个名额（0 = 不限）。见 dBucket 注释
  /* --- 模型 E（v0.9.350）：网页 Gemini 独占通道 ---
     结构与 A/B/C 完全同构（一组 base/model/key）+ 与 C/B 同一套语言分流（langModelE）。
     两条 A/B/C 没有的规则：
     ① **独占**：同一时刻只服务一个任务。别的任务首批判定就判「用不上 E」，整程走 D/C/B/A，
        不排队（用户 10-21 定案：档被占了就换槽，别等）。
     ② 流量：批间最小间隔 gapE + 每分钟请求数 rpmE，两者都只约束**同一个任务自己**。
     ⚠️ langModelE 留空 = E 不接管任何语言（与 C/B 一致），配好参数也不会有流量进来。 */
  provider5: '',
  base5: '',
  model5: '',
  key5: '',
  extraParams5: {},
  langModelE: [],          // 走模型 E 的目标语言码数组；空 = E 不参与分流
  rpmE: 8,                 // 每分钟最多请求数（60 秒滑窗）；0 = 不限
  gapE: 2,                 // 批间最小间隔（秒）；0 = 不限
  /* --- v0.9.365：E 专属节奏（用户定案：E 单独一套策略，不动共用链路） ---
     eOffHours：晚高峰窗口（北京时间 "a-b" 含两端，跨零点如 "23-6" 也认；空串 = 关）。
       Google 网页端在美东上午（北京 18~24 点）拥堵最重，单批从十几秒涨到 200~300 秒，
       必然顶穿预算。窗口内 E 不接**新任务**（整程走 D），已在跑的任务不切断。
     eCooldownMin：超时判死后全局冷却多少分钟（0 = 关）。晚高峰拥堵时每个新任务都会
       重新撞 E、烧 2×120 秒才降级 —— 冷却让后面的任务直接走 D，不重复交学费。
     eBridgeUrl：桥接活性探测地址（后台健康灯用；空串 = 不探测）。 */
  eOffHours: '18-23',
  eCooldownMin: 30,
  eBridgeUrl: 'http://127.0.0.1:4982/openai/v1/models'
};

function ensureData(){
  fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(CONFIG_PATH)) {
    fs.writeFileSync(CONFIG_PATH, JSON.stringify(DEFAULTS, null, 2), 'utf8');
  }
}
function readConfig(){
  ensureData();
  try {
    return Object.assign({}, DEFAULTS, JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8')));
  } catch (e) {
    return Object.assign({}, DEFAULTS);
  }
}
function writeConfig(cfg){
  fs.writeFileSync(CONFIG_PATH, JSON.stringify(cfg, null, 2), 'utf8');
}
function sha256(s){ return crypto.createHash('sha256').update(String(s), 'utf8').digest('hex'); }

/* ---------------- 用量（每日重置） ---------------- */
function todayStr(){
  const d = new Date();
  return d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
}
function readUsage(){
  try {
    const u = JSON.parse(fs.readFileSync(USAGE_PATH, 'utf8'));
    if (u.date === todayStr()) return u;
  } catch (e) {}
  return { date: todayStr(), global: 0, ips: {} };
}
function writeUsage(u){ fs.writeFileSync(USAGE_PATH, JSON.stringify(u), 'utf8'); }

/* ---------------- 累计统计账本（v0.9.212）----------------
   为什么不能扫 events.json 算累计：日志只保留最近 EVENTS_MAX(3000) 条，超了裁掉最旧的。
   扫它算出来的是「最近 3000 条任务的量」，数字会随旧记录被裁而**变小**，不是累计。
   所以维护一个只增不减的独立账本 stats.json，在写事件的同一处顺带累加（O(1)，不重扫日志）。

   口径（用户 2026-10-03 定案）：
   - users   累计服务用户 = 去重 IP 数（同 IP 反复来只 +1；自带 Key 的记录不计入 users）
   - subs    累计字幕数   = 经服务端跑过的翻译任务数（同任务的重试/重发不重复加；
                            重译同一文件算新的一次）
   - tkIn/tkOut/tkCache 累计 token（tkIn 含缓存命中部分）；在 recordTokens 处累加，天然不重复
   自带 Key 用户（markEvent 造的 lite 记录）翻译不经服务端，不进本账本。 */
const STATS_PATH = path.join(DATA_DIR, 'stats.json');
const STATS_TTL_MS = 30 * 60 * 1000;   // 接口侧缓存 30 分钟：既满足刷新节奏，又不重复算/重复读盘
function blankStats(){ return { v: 1, users: 0, subs: 0, tkIn: 0, tkOut: 0, tkCache: 0, ipN: 0, at: 0 }; }
function readStatsRaw(){
  try {
    const s = JSON.parse(fs.readFileSync(STATS_PATH, 'utf8'));
    if (s && typeof s === 'object' && Array.isArray(s.ips)) return s;
  } catch (e) {}
  return null;
}
/* 累加器。ip 集合只增不减（去重靠它），故单独存；用户数 = ipN（集合大小），不另存数字以免两者漂移。
   整段 try/catch 静默：统计记账失败绝不能影响翻译主流程。 */
let _statsCache = { at: 0, val: null };   // 声明必须在 bumpStats 之前（下面要用）
function bumpStats(d){
  try {
    const cur = readStatsRaw() || (function(){ const b = blankStats(); b.ips = []; return b; })();
    if (!Array.isArray(cur.ips)) cur.ips = [];
    if (d && d.ip && cur.ips.indexOf(d.ip) < 0) cur.ips.push(d.ip);
    if (d && d.subs) cur.subs = (Number(cur.subs) || 0) + d.subs;
    if (d && d.tin)  cur.tkIn  = (Number(cur.tkIn)  || 0) + d.tin;
    if (d && d.tout) cur.tkOut = (Number(cur.tkOut) || 0) + d.tout;
    if (d && d.tch)  cur.tkCache = (Number(cur.tkCache) || 0) + d.tch;
    cur.ipN = cur.ips.length;
    cur.at = Date.now();
    fs.writeFileSync(STATS_PATH, JSON.stringify(cur), 'utf8');
    /* 写完立刻把内存缓存换成新值。这一步不是优化，是正确性：
       若只靠 TTL 过期才重读，回填后的第一个访客会把 0 缓存住、接下来 30 分钟都看到 0。 */
    _statsCache = { at: Date.now(), val: statsOf(cur) };
  } catch (e) {}
}
function statsOf(raw){
  return {
    users:  raw ? (Number(raw.ipN) || (Array.isArray(raw.ips) ? raw.ips.length : 0) || 0) : 0,
    subs:   raw ? (Number(raw.subs)  || 0) : 0,
    tkIn:   raw ? (Number(raw.tkIn)  || 0) : 0,
    tkOut:  raw ? (Number(raw.tkOut) || 0) : 0,
    tokens: raw ? ((Number(raw.tkIn) || 0) + (Number(raw.tkOut) || 0)) : 0,
    at:     raw ? (Number(raw.at)   || 0) : 0
  };
}
/* 账本快照（给接口用）。带 30 分钟内存缓存：同一窗口内重复访问不读盘。
   缓存由 bumpStats 写入时同步刷新，所以窗口内看到的一定是最新值。 */
function publicStats(){
  const now = Date.now();
  if (_statsCache.val && now - _statsCache.at < STATS_TTL_MS) return _statsCache.val;
  const val = statsOf(readStatsRaw());
  _statsCache = { at: now, val };
  return val;
}
/* 一次性回填：拿现有 events.json 里的历史算出初始值写进账本。
   只在账本不存在时跑（部署脚本调一次）；已存在则原样返回，绝不覆盖已累计的数。 */
function backfillStats(){
  if (readStatsRaw()) return { skipped: true };
  const db = readEvents();
  const b = blankStats(); b.ips = [];
  for (const e of db.events){
    if (e && e.ip && b.ips.indexOf(e.ip) < 0) b.ips.push(e.ip);
  }
  b.ipN = b.ips.length;
  /* v0.9.337：回填口径与线上记账对齐 —— 一次任务算一次，不是一条事件算一次。
     历史里同一任务号被 IP 轮换拆成的多条只算一条；没有任务号的老事件（v0.9.159 之前）按条计。 */
  const seenTask = new Set();
  let subsN = 0;
  for (const e of db.events){
    if (!e) continue;
    if (e.taskId) { seenTask.add(e.taskId); continue; }
    subsN += 1;
  }
  b.subs = subsN + seenTask.size;
  b.tkIn  = db.events.reduce((a, e) => a + (Number(e.tkIn)  || 0), 0);
  b.tkOut = db.events.reduce((a, e) => a + (Number(e.tkOut) || 0), 0);
  b.tkCache = db.events.reduce((a, e) => a + (Number(e.tkCache) || 0), 0);
  b.at = Date.now();
  fs.writeFileSync(STATS_PATH, JSON.stringify(b), 'utf8');
  _statsCache = { at: 0, val: null };
  return { skipped: false, users: b.ipN, subs: b.subs, tokens: b.tkIn + b.tkOut };
}

/* ---------------- 使用行为记录（仅元数据：文件名/条数，不含字幕内容） ---------------- */
const EVENTS_PATH = path.join(DATA_DIR, 'events.json');
const EVENTS_MAX = 3000;             // 最多保留条数（防无限增长，超出裁掉最旧的）
const EVENT_DEDUP_MS = 30 * 60 * 1000; // 同 IP 同文件同语言 30 分钟内视为同一会话（批次累加）
function readEvents(){
  try {
    const j = JSON.parse(fs.readFileSync(EVENTS_PATH, 'utf8'));
    if (Array.isArray(j.events)) return j;
  } catch (e) {}
  return { events: [] };
}
/* v0.9.73：重译按类型分别计数。meta.rt: 1=音乐误删 2=语言跑偏 3=cue 结构错。
   retries 保留为三类之和（与 v0.9.72 的总量口径一致）；rt=0（主批）累加 batches。 */
/* v0.9.146：4=整批失败后的逐组补救（此前误用 rt=2，与「语言跑偏」混在同一计数里，
   导致统计把网络/截断造成的补救全赖给语言检测，排查方向被带偏）。 */
/* v0.9.390：rt=2 与 rt=5 的分工 —— 两个号不再互相污染。
   rt=2 → retryAnchor：历史号，只有 386 及更早的页面还在发。那时 badAnchor 装的是「语言跑偏」，
     所以历史记录里 retryAnchor 的语义是真的语言跑偏，不能洗成别的意思。
   rt=5 → retryLyric：387 起语言跑偏检测整套摘掉，badAnchor 只剩「歌词缺词」一类（与语言无关），
     但它仍在借 rt=2 上报，于是 retryAnchor 这个桶里装的全是歌词缺词，名不副实。
     390 起歌词缺词改走 rt=5，与语言跑偏彻底分开。
   副作用（正是想要的）：新记录里 retryAnchor 恒为 0。哪天它又不是 0，说明有人把语言检测加回来了。 */
const RT_FIELD = { 1: 'retryMusic', 2: 'retryAnchor', 3: 'retryCue', 4: 'retryRescue', 5: 'retryLyric' };
function bumpRetry(ev, rt){
  const n = Number(rt) || 0;
  if (!n) { ev.batches = (ev.batches || 0) + 1; return; }
  const k = RT_FIELD[n] || 'retryOther';
  ev[k] = (ev[k] || 0) + 1;
  ev.retries = (ev.retries || 0) + 1;
}
/* v0.9.146：整批请求失败的原因分类。此前 events 只记「重试了几次」，看不出整批为什么失败，
   无法区分「输出被截断」「JSON 畸形」「网络/上游错误」，只能靠猜。
   白名单映射——未收录的原因一律落到 failOther，绝不按前端字符串动态建字段。 */
const FAIL_FIELD = { trunc: 'failTrunc', json: 'failJson', net: 'failNet', other: 'failOther',
  /* v0.9.380：上游 200 但正文为空，单列一类 —— 此前它落进 other/json，
     与「JSON 畸形」「其它」混在一起，排查时看不出「模型压根没回话」。 */
  empty: 'failEmpty' };
function bumpFail(ev, why){
  /* 必须用 hasOwnProperty 而非直接取键：FAIL_FIELD['__proto__'] / ['constructor'] 会命中原型链
     返回 Object.prototype / Object 构造函数（均为 truthy），于是把计数写进 '[object Object]'
     这类垃圾字段而不是 failOther。数值键的 RT_FIELD 无此风险（原型上无数字属性）。 */
  const key = String(why == null ? '' : why);
  const k = Object.prototype.hasOwnProperty.call(FAIL_FIELD, key) ? FAIL_FIELD[key] : 'failOther';
  ev[k] = (ev[k] || 0) + 1;
}
/* v0.9.161：事件匹配的口径收归一处（字段清洗 + 命中判定），三处记账共用。
   此前三处各写一遍：appendEvent 与 markEvent 在 v0.9.159 已改为按任务号匹配，
   recordTokens 却仍留在「IP+文件名+语言」→ 同一文件连翻两次（v0.9.159 后是两条独立记录）时，
   两条的 token 全记到后一条，前一条 tkIn 显示 0。
   分散在三处正是它当初被漏掉的原因，故抽成函数：以后改口径只改这里。 */
function evFields(meta){
  const m = (meta && typeof meta === 'object') ? meta : {};
  return {
    file: String(m.file || '').replace(/[\x00-\x1f]/g, '').slice(0, 120),
    lang: String(m.lang || '').slice(0, 10),
    /* 任务号：前端每次点「开始翻译」生成一个，随每个请求带上；老前端没有 → 回退旧口径 */
    task: String(m.taskId || '').replace(/[\x00-\x1f]/g, '').slice(0, 24)
  };
}
/* 带任务号就以任务号为准，且**不再比较 IP**；不带（老版本页面）沿用「IP+文件名+语言」，行为不变。
   v0.9.337：IP 那句原本挡在最前面，带任务号也先过它 —— 任务号于是永远吃不到。
   后果 10-18 实测：用户端走轮换住宅代理，出口 IP 每批一换（一个任务 25 批刷出 17 条事件、
   IP 落在 31.171.100/101 两个 /24 里轮），而任务号整段任务不变；去重落空 → 每批新建一条事件，
   后台「已翻译字幕数」被同一任务灌了 17 次。任务号由前端每次点「开始翻译」随机生成、
   一次任务内恒定，比 IP 稳，故以它为准；IP 只在无任务号的老口径里参与判定。 */
function evHit(e, ip, f){
  if (f.task) return e.taskId === f.task;
  if (e.ip !== ip) return false;
  return e.file === f.file && e.lang === f.lang;
}
/* v0.9.337：字幕数幂等键 —— 一次任务只给「已翻译字幕数」加一次。
   上面改完 evHit 后同一任务不会再被拆成多条，这条是兜底：万一仍出现两条同任务号的记录
   （典型是批间隔超过 30 分钟去重窗口、或中途换网络），第二条不再重复计数。
   以事件上的 subCounted 标记为凭（只有真正加过数的新建事件才带），自带 Key 用户的轻量记录
   不走 appendEvent、不带标记，不会被误判成「已计」。无任务号的老事件按条计，行为不变。
   扫描上界 24 小时：事件按时间序追加，更早的不必再找。 */
const SUBS_SCAN_MS = 24 * 60 * 60 * 1000;
function subsCounted(db, task, now){
  for (let i = db.events.length - 1; i >= 0; i--) {
    const e = db.events[i];
    if (!e || !(e.t > 0)) continue;
    if (now - e.t > SUBS_SCAN_MS) break;
    if (e.taskId === task && e.subCounted) return true;
  }
  return false;
}
/* v0.9.244：用户导出（下载）的字幕格式。此前后台只有「下载了几次」，
   看不出用户到底把字幕导成什么格式——ASS 样式、VTT 样式做了那么多版，
   却没有任何数据说明有没有人真的在用、主流的到底是 srt 还是 ass。
   取值与主站 expFileFmt() 一一对应（ass-stack 在前端已归一为 ass）。
   ⚠️ dlFmt 只记「最后一次」，同一任务先下 srt 再下 ass 会被覆盖；
      故另配一组累计计数（dlSrt/dlVtt/…），分布统计一律读累计值。 */
const DL_FMT = { srt: 'srt', vtt: 'vtt', sbv: 'sbv', ass: 'ass', txt: 'txt' };
const DL_FMT_FIELD = { srt: 'dlSrt', vtt: 'dlVtt', sbv: 'dlSbv', ass: 'dlAss', txt: 'dlTxt' };
/* 白名单取值（与上面 FAIL_FIELD 同口径：必须 hasOwnProperty，否则 '__proto__' 会命中原型链）。
   不在表里一律返回 '' —— 宁可这一笔不记，也绝不按前端字符串动态建字段。 */
function pickWL(map, v){
  const k = String(v == null ? '' : v);
  return Object.prototype.hasOwnProperty.call(map, k) ? map[k] : '';
}
/* v0.9.373：按批次累加「这一批落在哪个槽」。
   为什么不只靠 viaB/viaC/viaD/viaE：那四个是**覆盖写**，只留最后一批。
   而一个任务中途会换槽（D 的日额度 / 小时名额耗尽 → 降到 C/B；E 失败 → 降级），
   后台「这一单到底用了谁」就只剩最后一格。故另记 sbA..sbE（每批 +1），
   与 via* 共存：老记录看 via*，新记录看计数，互不覆盖。
   ⚠️ A 槽没有 via 标记（四个 0），所以必须由「extra 里四个键都在」判定；
      调用方传空对象 / 老调用方不传时一律不记，免得把未知记成 A。 */
function bumpSlotUse(ev, extra){
  if (!ev || !extra || typeof extra !== 'object') return;
  if (!('viaB' in extra) && !('viaC' in extra) && !('viaD' in extra) && !('viaE' in extra)) return;
  const s = extra.viaE ? 'E' : extra.viaD ? 'D' : extra.viaC ? 'C' : extra.viaB ? 'B' : 'A';
  ev['sb' + s] = (ev['sb' + s] || 0) + 1;
}
function appendEvent(ip, meta, model, extra){
  if (!meta || typeof meta !== 'object') return;
  const now = Date.now();
  const f = evFields(meta);
  const file = f.file, lang = f.lang, task = f.task;
  const cues = Math.max(0, Math.floor(+meta.cues || 0));
  if (!file && !lang) return; // 无有效元数据（老版前端/异常请求）不记
  const mdl = String(model || '').replace(/[\x00-\x1f]/g, '').slice(0, 60);
  /* v0.9.179: src = source language ('auto' or a concrete code). Stats only - never used for
     matching or routing (batching reads dst; bilingual wrapping has its own guessing helper).
     Needed to tell whether the v0.9.177 "default to auto" change helped or hurt. */
  const src = String(meta.src || '').replace(/[\x00-\x1f]/g, '').slice(0, 10);
  const db = readEvents();
  // 会话去重：从尾部找同 ip + 同任务号（或同文件名+语言）且时间窗口内的记录 → 批次 +1
  for (let i = db.events.length - 1; i >= 0; i--) {
    const e = db.events[i];
    /* 不带任务号（老版本页面）时完全沿用旧口径，行为不变——否则老页面一次任务会刷出十几条 */
    if (evHit(e, ip, f) && now - e.t < EVENT_DEDUP_MS) {
      /* v0.9.73：meta.rt 是前端隔离重译调用类型——1=音乐误删 2=语言跑偏 3=cue 结构错。
         重译不计入 batches，按类型分别累加，站长一眼看出「主批 / 哪类重译最多」 */
      bumpRetry(e, meta.rt);
      if (meta.fwhy) bumpFail(e, meta.fwhy);
      if (cues > (e.cues || 0)) e.cues = cues;
      /* v0.9.157：模型名一律以「本次实际生效的」为准覆写，走 A / 走 B 都要写。
         v0.9.156 只补了「走 B 时覆写」这一半，反方向漏了：把某语言从 B 列表移除后，
         本次走 A 命中 30 分钟去重窗口里那条旧事件，名字仍停在旧模型、viaB 仍是 1，
         后台看起来就是「我明明移除了，怎么还在走 B」。故这里不再加条件，配合调用处
         恒传 viaB（0/1）保证旧标记被覆盖。 */
      if (mdl) e.model = mdl;
      /* v0.9.158：记「最后活动时间」。会话去重命中时只累加、不新建条目也不改 t，
         后台列表（按追加序倒序、显示 t）于是纹丝不动 → 用户翻完一次以为「后台没日志」。
         只补这一个字段，不动 t、不改任何计数口径。 */
      e.lastAt = now;
      /* v0.9.337：本批 IP 与首条不同 → 记一笔。正常数据里不会出现这个字段，
         后台一眼能看出哪些任务是「IP 一直在换、任务其实没换」（客户端代理轮换）。 */
      if (e.ip !== ip) e.ipSwap = (e.ipSwap || 0) + 1;
      if (src) e.src = src;   // v0.9.179: keep the newest known source language on the record
      if (extra && typeof extra === 'object') Object.assign(e, extra);
      bumpSlotUse(e, extra);   // v0.9.373：这一批走的槽累加到 sbA..sbE
      fs.writeFileSync(EVENTS_PATH, JSON.stringify(db), 'utf8');
      return;
    }
    if (now - e.t >= EVENT_DEDUP_MS) break; // 事件按时间序，更早的必不在窗口内
  }
  const ev = { t: now, ip, file, lang, cues, batches: 0, retries: 0, model: mdl };
  if (src) ev.src = src;        // v0.9.179
  if (task) ev.taskId = task;   // v0.9.159：存任务号，后续批次才能归到这一条
  if (extra && typeof extra === 'object') Object.assign(ev, extra);
  bumpSlotUse(ev, extra);       // v0.9.373：首批也要记，否则只显示「最后一批」
  bumpRetry(ev, meta.rt);
  if (meta.fwhy) bumpFail(ev, meta.fwhy);
  /* v0.9.337：先查这个任务号有没有计过数（见 subsCounted）。
     v0.9.212 起字幕数是「每新建一条事件 +1」，前提是同一任务只会有一条事件；
     IP 轮换会把一条任务拆成多条（10-18 实证：一个任务 25 批刷出 17 条、字幕数被灌 17 次），
     故再加一层以任务号为凭的幂等键。不带任务号的老请求按条计，行为不变。 */
  const counted = task ? subsCounted(db, task, now) : false;
  if (task && !counted) ev.subCounted = 1;
  db.events.push(ev);
  if (db.events.length > EVENTS_MAX) db.events = db.events.slice(-EVENTS_MAX);
  fs.writeFileSync(EVENTS_PATH, JSON.stringify(db), 'utf8');
  /* v0.9.212：只在「新建事件」这一处累加（去重分支提前 return，第 2/3 批不会走到这里）；
     自带 Key 用户进不了本函数，不受影响。v0.9.337：同任务号已计过则跳过。 */
  if (!task || !counted) bumpStats({ ip: ip, subs: 1 });
}
/* 前端生命周期上报：翻译完成（finish）/ 下载字幕（download）。
   匹配窗口放宽到 3 小时（大文件翻译+用户迟些下载都算同一次会话），取最新一条。
   匹配不到但带了 model（自带 Key 用户，翻译不经服务器）→ 创建轻量记录，模型也能统计。 */
const EVENT_LIFE_MS = 3 * 60 * 60 * 1000;
/* v0.9.80：失败上报的错误消息清洗——去控制字符、截断 200 字，防止脏数据撑大 events.json */
function cleanMsg(s){ return String(s || '').replace(/[\x00-\x1f]/g, ' ').trim().slice(0, 200); }
function markEvent(ip, meta, ev){
  if (!meta || typeof meta !== 'object') return false;
  const now = Date.now();
  const f = evFields(meta);
  const file = f.file, lang = f.lang;
  const mdl = String(meta.model || '').replace(/[\x00-\x1f]/g, '').slice(0, 60);
  /* v0.9.179: BYOK users never hit appendEvent, so src only arrives via the finish/download report. */
  const src = String(meta.src || '').replace(/[\x00-\x1f]/g, '').slice(0, 10);
  if (!file && !lang) return false;
  /* v0.9.159：完成/下载上报同样按任务号匹配——否则同一文件连翻两次，
     第二次的完成时间会被记到第一条上。老前端不带任务号时回退旧口径。 */
  const db = readEvents();
  for (let i = db.events.length - 1; i >= 0; i--) {
    const e = db.events[i];
    if (now - e.t >= EVENT_LIFE_MS) break; // 更早的必不在窗口内
    if (evHit(e, ip, f)) {
      if (ev === 'finish') {
        e.finishedAt = now;                    // 完成时间（重译后再完成取最新；开始时间即 e.t）
        /* v0.9.86：丢弃遥测——dropN 被删总行数、subDrop 其中源文仍有实义的行数。
           v0.9.148 再加三项归因：dropLocal（本地决策：水词组 + 歌词按设置删除）、
           dropAiFiller（模型声明的水词）、dropAiDrop（模型显式判 drop）。
           前端保证每行只按第一个把它标记为 drop 的原因计一次，故三项之和 ≤ dropN。
           纯统计，不影响任何行为。 */
        /* v0.9.375：样本单独拿出来算一次 —— 重译后这次没样本（错误清零）时必须把上一次的
           删掉，否则会出现「cueMissing=0 却挂着 UNKNOWN 样本」的记录，分析时自相矛盾。
           Object.assign 不会删键，只能显式 delete。 */
        const cs = cueSampleField(meta);
        /* v0.9.381：分配失衡样本同口径——本次没有就得删旧键，否则会出现「thinN=0 还挂着样本」 */
        const th = thinSampleField(meta);
        Object.assign(e, dropFields(meta), cueErrFields(meta), gapFields(meta), cs, th);
        if (!cs.cueSample) delete e.cueSample;
        if (!th.thinSample) delete e.thinSample;
        /* v0.9.351：用户点停止也会走到 finish（批次循环 break 后照常收尾），
           以前后台看不出「真跑完」和「被停掉」。续跑真跑完后要能清掉旧标记。 */
        if (meta.stopped) e.stopped = 1; else delete e.stopped;
      } else if (ev === 'download') {
        e.downloads = (e.downloads || 0) + 1;
        e.downloadedAt = now;
        /* v0.9.244：导出格式。只在白名单内记账，认不出就不写（绝不信前端字符串）。 */
        const df = pickWL(DL_FMT, meta.fmt);
        if (df) { e.dlFmt = df; e[DL_FMT_FIELD[df]] = (e[DL_FMT_FIELD[df]] || 0) + 1; }
      } else if (ev === 'copy') {
        /* v0.9.298：复制到剪贴板也是「拿到结果」—— 与 download 同口径（点击计数，不去重），
           补上「完成未下载」里复制党的统计盲区。fmt 不另记：格式分布只看下载口径，避免混淆。 */
        e.copies = (e.copies || 0) + 1;
        e.copiedAt = now;
      } else if (ev === 'fail') {
        e.failedAt = now;                      // v0.9.80：客户端异常（含错误消息）上报
        e.failMsg = cleanMsg(meta.msg);
      } else if (ev === 'fallback') {
        /* v0.9.119：模型 B 调用失败自动回退模型 A。mdl=回退前的模型(B)，usedModel=真正生效的 A */
        e.fallback = (e.fallback || 0) + 1;
        e.fbModel = mdl;
        e.fbMsg = cleanMsg(meta.msg);
        if (meta.usedModel) e.model = String(meta.usedModel).slice(0, 60);
      } else return false;
      if (mdl && !e.model) e.model = mdl;
      if (src && !e.src) e.src = src;   // v0.9.179
      fs.writeFileSync(EVENTS_PATH, JSON.stringify(db), 'utf8');
      return true;
    }
  }
  /* 自带 Key 用户（翻译未经服务器，无 builtin 会话）：首次上报时创建轻量记录 */
  if (!mdl) return false;
  const lite = { t: now, ip, file, lang, cues: 0, batches: 0, model: mdl, byok: true };
  if (src) lite.src = src;              // v0.9.179
  /* v0.9.244：自带 Key 用户的轻量记录也必须存任务号。此前没存 → 同一任务的第二次上报
     （典型是「完成」之后「下载」）匹配不到自己那条，又新建一条：后台看到两条同任务的记录、
     下载次数恒为 1，v0.9.244 新加的导出格式计数也被拆到两条里（同一单导了 SRT 又导 ASS 看不出来）。 */
  if (f.task) lite.taskId = f.task;
  if (ev === 'finish') { lite.finishedAt = now; Object.assign(lite, dropFields(meta), cueErrFields(meta), cueSampleField(meta), thinSampleField(meta)); if (meta.stopped) lite.stopped = 1; }
  /* v0.9.244：自带 Key 用户同样记导出格式（这条记录是本次上报新建的，计数从 1 起） */
  else if (ev === 'download') {
    lite.downloads = 1; lite.downloadedAt = now;
    const lf = pickWL(DL_FMT, meta.fmt);
    if (lf) { lite.dlFmt = lf; lite[DL_FMT_FIELD[lf]] = 1; }
  }
  else if (ev === 'copy') { lite.copies = 1; lite.copiedAt = now; }   // v0.9.298：自带 Key 用户的复制同样记账
  else if (ev === 'fail') { lite.failedAt = now; lite.failMsg = cleanMsg(meta.msg); }
  else return false;
  db.events.push(lite);
  if (db.events.length > EVENTS_MAX) db.events = db.events.slice(-EVENTS_MAX);
  fs.writeFileSync(EVENTS_PATH, JSON.stringify(db), 'utf8');
  return true;
}
/* v0.9.373：把一单的「槽位用量」整理成 [{s,n}]，后台那一列直接渲染。
   两代数据：
     ① sbA..sbE —— v0.9.373 起按批次累加，能看出整单跨了哪几个槽（exact=1）；
     ② viaB/viaC/viaD/viaE —— 更早的记录只有「最后一批」的归属（exact=0）。
   两代都没有（v0.9.157 之前的老记录、自带 Key 记录）→ 空数组，后台显示「-」。
   ⚠️ 绝不按模型名反推槽位：同一个模型名可以挂在不同槽上（D 的池子里也有 gemini 系），
      猜测错比空着更糟 —— 后台是要拿来判断「钱花在哪个槽」的。 */
const SLOT_ORDER = ['E', 'D', 'C', 'B', 'A'];   // 与 pickRoute 的优先级一致（E > D > C > B > A）
function evSlotMix(e){
  const mix = [];
  let total = 0;
  for (const s of SLOT_ORDER) {
    const n = Number(e['sb' + s]) || 0;
    if (n > 0) { mix.push({ s: s, n: n }); total += n; }
  }
  if (total) return { mix: mix, exact: 1 };
  const hasFlag = ('viaB' in e) || ('viaC' in e) || ('viaD' in e) || ('viaE' in e);
  if (!hasFlag) return { mix: [], exact: 0 };
  for (const s of SLOT_ORDER) {
    /* A 槽没有标记位（四个键全 0 就是 A），放在最后兜底 */
    if (s === 'A' || Number(e['via' + s]) === 1) return { mix: [{ s: s, n: 1 }], exact: 0 };
  }
  return { mix: [], exact: 0 };
}
/* 今日汇总条的「槽位」chip：按**批次**统计（与「N 次请求」同口径）。
   老记录只有最后一批的归属 → 把它的 batches 整笔记到那一格，宁可少看跨槽，也不虚增。 */
function slotTally(arr){
  const o = { A: 0, B: 0, C: 0, D: 0, E: 0 };
  for (const e of arr) {
    const m = evSlotMix(e);
    if (!m.mix.length) continue;
    if (m.exact) { for (const x of m.mix) o[x.s] += x.n; continue; }
    o[m.mix[0].s] += Math.max(1, Number(e.batches) || 1);
  }
  return o;
}
/* v0.9.145：token 用量埋点。上游返回 usage 之后，把 prompt/completion tokens 累加到「同一条」任务事件上。
   只累加已存在的记录，找不到就丢弃——绝不新建记录（否则会给自带 Key 用户凭空造出带 token 的脏数据）。
   全程同步读写，读-改-写是原子的，并发请求不会互相覆盖；任何异常都不许冒泡到翻译主流程。 */
function tokNum(v){
  const n = Number(v);
  return Number.isFinite(n) && n > 0 ? Math.floor(n) : 0;
}
function usageTokens(u){
  if (!u || typeof u !== 'object') return null;
  const tin  = tokNum(u.prompt_tokens != null ? u.prompt_tokens : u.input_tokens);
  const tout = tokNum(u.completion_tokens != null ? u.completion_tokens : u.output_tokens);
  let tch = tokNum(u.cached_tokens != null ? u.cached_tokens : (u.prompt_tokens_details && u.prompt_tokens_details.cached_tokens));
  /* v0.9.160：DeepSeek 的缓存命中字段名是 prompt_cache_hit_tokens，不在上面两种口径里。
     此前只读 OpenAI 系字段 → 走 A 槽（deepseek-chat）的任务 tkCache 恒为 0，
     后台看着像「没命中」，实际命中率 90%+。补读这一个字段即可，前面的优先。 */
  if (!tch) tch = tokNum(u.prompt_cache_hit_tokens);
  if (!tin && !tout) return null;
  if (tch > tin) tch = tin; // 缓存命中数不可能大于输入总数，异常值夹回去
  return { tin: tin, tout: tout, tch: tch };
}
function recordTokens(ip, meta, usage){
  const tk = usageTokens(usage);
  if (!tk) return false;
  if (!meta || typeof meta !== 'object') return false;
  const now = Date.now();
  /* v0.9.161：与 appendEvent / markEvent 共用同一套匹配（任务号优先）。
     此前这里是「IP+文件名+语言」→ 同一文件连翻两次（v0.9.159 起是两条独立记录）时，
     两条的 token 会被一起记到后一条上，前一条的 tkIn 显示 0。 */
  const f = evFields(meta);
  if (!f.file && !f.lang) return false;
  const db = readEvents();
  for (let i = db.events.length - 1; i >= 0; i--) {
    const e = db.events[i];
    if (now - e.t >= EVENT_LIFE_MS) break;
    if (!evHit(e, ip, f)) continue;
    e.tkIn = (e.tkIn || 0) + tk.tin;
    e.tkOut = (e.tkOut || 0) + tk.tout;
    if (tk.tch) e.tkCache = (e.tkCache || 0) + tk.tch;
    fs.writeFileSync(EVENTS_PATH, JSON.stringify(db), 'utf8');
    /* v0.9.212：token 进累计账本。放在这里而不是扫日志——上游每次返回的 usage 都是本批新产生的，
       累加一次不多一次不少；真没匹配到事件时（下面打 warn 那种）也不补，缺那一笔语义明确。 */
    bumpStats({ tin: tk.tin, tout: tk.tout, tch: tk.tch });
    return true;
  }
  /* v0.9.161：账记不上就留痕。以前静默 return false，「这单怎么没 token」只能靠猜——
     常见原因是事件被 EVENTS_MAX 截断或超出 3 小时窗口。只打日志，不改变任何行为。 */
  try { console.warn('[tok] 未找到可记账的事件 file=' + f.file + ' lang=' + f.lang + ' task=' + (f.task || '-')); } catch (e) {}
  return false;
}
/* v0.9.148：丢行归因字段的统一清洗（三处上报点共用，避免各处口径漂移）。
   规则与 dropN/subDrop 一致：非数字按 0，负数夹到 0，一律取整。 */
function dropFields(meta){
  const o = {};
  if (meta.dropN        != null) o.dropN        = Math.max(0, Math.floor(+meta.dropN || 0));
  if (meta.subDrop      != null) o.subDrop      = Math.max(0, Math.floor(+meta.subDrop || 0));
  if (meta.dropLocal    != null) o.dropLocal    = Math.max(0, Math.floor(+meta.dropLocal || 0));
  if (meta.dropAiFiller != null) o.dropAiFiller = Math.max(0, Math.floor(+meta.dropAiFiller || 0));
  if (meta.dropAiDrop   != null) o.dropAiDrop   = Math.max(0, Math.floor(+meta.dropAiDrop || 0));
  return o;
}
/* v0.9.151：cue 结构错类型字段的统一清洗（与 dropFields 同口径：非数字按 0、负数夹 0、取整）。
   字段列表写死为白名单——绝不按前端传来的字符串动态建字段。
   用途：retryCue 只有一个总数，分不清「模型漏条目 MISSING」与「译文被判空 EMPTY」，
   两者解法相反（调小批次 vs 扩充 fillers 白名单），必须先有类型分布才能定性。 */
/* v0.9.375：末两项是「重试修复率」的分子分母（重试过的组数 / 其中修好的组数），
   与 cue 错误计数同一套清洗口径。有了它才能算出「这一类结构错重试到底值不值」。 */
const CUE_ERR_FIELDS = ['cueEmpty','cueMissing','cueDup','cueUnknown','cueBadEntry','cueNoArr','cueOther','cueRetryN','cueRetryFix'];
/* v0.9.380：编号级补译 + 漏句保底的字段。
   gapTryN/gapFixN/gapGiveUpN 是前端 v0.9.379 埋的，但当时没进 reportEvent 的 body ——
   等于只累加不上报，后台一条都看不到，本次一并接上。
   shortDropKeepN / lyricShortN 是本次新增的两条「静默丢内容」兜底的计数。
   与 CUE_ERR_FIELDS 同为写死白名单：绝不按前端传来的字符串动态建字段。 */
/* v0.9.381：thinN = 分配失衡条数（跨条语序重排后某条只剩虚词/符号）。
   与 CUE_ERR_FIELDS 同为写死白名单：绝不按前端传来的字符串动态建字段。 */
/* v0.9.383：gapAbortN = 补译止损是否触发（1/0）。有了它才能回答「线上到底有没有再出现
   那种试到 235 次才停的任务」，以及止损阈值定得对不对。 */
const GAP_FIELDS = ['gapTryN','gapFixN','gapGiveUpN','shortDropKeepN','lyricShortN','thinN','gapAbortN','gapCoverN','missN'];
function gapFields(meta){
  const o = {};
  for (const k of GAP_FIELDS) {
    if (meta[k] != null) o[k] = Math.max(0, Math.min(100000, Math.floor(+meta[k] || 0)));
  }
  return o;
}
function cueErrFields(meta){
  const o = {};
  for (const k of CUE_ERR_FIELDS) {
    if (meta[k] != null) o[k] = Math.max(0, Math.min(100000, Math.floor(+meta[k] || 0)));
  }
  return o;
}
/* v0.9.375：cue 结构错的「编号级」样本（前端 noteCueSample 产生）。
   为什么需要：只有计数时，「编号串组」（本组缺 n、邻组多 n，内容都对，可零重试救回）
   与「编号写错」（本组真少一条，照搬会把译文搬错位）长得一模一样，离线验证的收益
   只能给到 5.9%~40.8% 的区间。有了编号才能收敛成一个数，再决定要不要上归位规则。
   ⚠️ 只收编号与错误码，绝不收字幕文本；前端传来的数组一律**重新拼装**（不落原始对象，
      不认任何未知键），逐层限量后再校验整包大小 —— 遥测入口绝不能成为写脏数据的通道。 */
const CUE_SAMPLE_MAX = 3;             // 每单最多几批（与前端 CUE_SAMPLE_MAX 对齐）
const CUE_SAMPLE_CHARS = 6000;        // 整包序列化上限（前端单批 2000，三批留余量）
const CUE_ERR_RE = /^(?:MISSING_[\d,]+|EMPTY_\d+|DUP_\d+|UNKNOWN_\d+|BAD_ENTRY|NO_CUES_ARRAY)$/;
function cueSampleField(meta){
  if (!Array.isArray(meta.cueSample) || !meta.cueSample.length) return {};
  const out = [];
  for (const s of meta.cueSample.slice(0, CUE_SAMPLE_MAX)) {
    if (!s || typeof s !== 'object') continue;
    const i = Math.max(0, Math.min(100000, Math.floor(+s.i || 0)));
    const b = [];
    if (Array.isArray(s.b)) {
      for (const pair of s.b.slice(0, 40)) {
        if (!Array.isArray(pair)) continue;
        const gno = Math.floor(+pair[0]);
        if (!isFinite(gno) || gno < 0) continue;
        const errs = [];
        if (Array.isArray(pair[1])) {
          for (const e of pair[1].slice(0, 20)) {
            const str = String(e == null ? '' : e);
            if (CUE_ERR_RE.test(str)) errs.push(str);
          }
        }
        /* 第三位：「本该搬走、但只是本组自己那条的重复」的条数（归位规则的判据），只收整数 */
        const dupN = Math.max(0, Math.min(1000, Math.floor(+pair[2] || 0)));
        if (errs.length) b.push([gno, errs, dupN]);
      }
    }
    if (!b.length) continue;
    const one = { i, b };
    if (Array.isArray(s.m)) {
      const m = [];
      for (const pair of s.m.slice(0, 60)) {
        if (!Array.isArray(pair)) continue;
        const gno = Math.floor(+pair[0]);
        if (!isFinite(gno) || gno < 0) continue;
        const nums = String(pair[1] == null ? '' : pair[1]).replace(/[^\d,]/g, '').slice(0, 240);
        if (!nums) continue;
        m.push([gno, nums]);
      }
      if (m.length) one.m = m;
    }
    out.push(one);
  }
  if (!out.length) return {};
  /* 超限整包丢弃，不存半截：半截样本会让「这批有几组」这种判断建立在残缺数据上 */
  if (JSON.stringify(out).length > CUE_SAMPLE_CHARS) return {};
  return { cueSample: out };
}
/* v0.9.381：分配失衡样本——跨条语序重排后某条只剩虚词/符号。
   只收 [组号, cue编号, 原文实义长度]，**绝不收字幕文本**（与 cueSample 同口径，遥测入口不当写数据通道）。 */
const THIN_SAMPLE_MAX = 8;
function thinSampleField(meta){
  if (!Array.isArray(meta.thinSample) || !meta.thinSample.length) return {};
  const out = [];
  for (const s of meta.thinSample.slice(0, THIN_SAMPLE_MAX)) {
    if (!s || typeof s !== 'object') continue;
    const g = Math.floor(+s.g), no = Math.floor(+s.no), src = Math.floor(+s.src);
    if (!isFinite(g) || g < 0 || !isFinite(no) || no < 0) continue;
    out.push([g, no, Math.max(0, Math.min(10000, isFinite(src) ? src : 0))]);
  }
  if (!out.length) return {};
  return { thinSample: out };
}
function dateOfTs(ts){
  const d = new Date(ts);
  return d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
}

/* ---------------- 双语合并页使用记录（v0.9.244）----------------
   合并页是纯前端工具（不调模型、不翻译、请求根本不过服务端），此前**零埋点**：
   谁在用、上传的什么字幕、最终导成什么格式、套的哪个模板，后台一概看不见。
   ⚠️ 单独一个文件，不与翻译事件混在 events.json 里：两者口径完全不同——
     翻译事件按「任务」去重累加（同 IP 同文件 30 分钟内的批次并成一条），
     合并页没有任务概念，一次「合并」和一次「导出」各自就是一条完整记录。
   只记元数据（文件名/条数/格式/模板），绝不记字幕内容。 */
const MEVENTS_PATH = path.join(DATA_DIR, 'merge-events.json');
const MEVENTS_MAX = 2000;
/* 导出格式白名单：与 merge.html 的 expExt() 一致（vtt-styled 已归一为 vtt） */
const MERGE_FMT = { srt: 'srt', vtt: 'vtt', ass: 'ass' };
/* 模板白名单：ASS 六档 + VTT 七档 + 单语四档 + 两档「无模板」（SRT、无样式 VTT）
   ⚠️ v0.9.272：双语各补三套后，新档不在名单里的话后台会记成空值（等于「用户用了新模板但看不见」），
      加模板时必须同步这里。 */
const MERGE_TPL = {
  'srt': 'srt', 'vtt': 'vtt',
  'ass-split': 'ass-split', 'ass-stack': 'ass-stack', 'ass-custom': 'ass-custom',
  'ass-cinema': 'ass-cinema', 'ass-a11y': 'ass-a11y', 'ass-social': 'ass-social',
  'vtt-std': 'vtt-std', 'vtt-compact': 'vtt-compact', 'vtt-cinema': 'vtt-cinema', 'vtt-custom': 'vtt-custom',
  'vtt-top': 'vtt-top', 'vtt-a11y': 'vtt-a11y', 'vtt-social': 'vtt-social',
  'vtt-m-stream': 'vtt-m-stream', 'vtt-m-a11y': 'vtt-m-a11y',
  'vtt-m-cinema': 'vtt-m-cinema', 'vtt-m-social': 'vtt-m-social'
};
/* 合并页三种模式：merge=两份字幕合并；adjust=一份双语字幕拆原文/译文；
   mono=单语字幕直接加特效（v0.9.245 新增，不配对不拆分） */
const MERGE_MODE = { merge: 'merge', adjust: 'adjust', mono: 'mono' };
/* v0.9.363：动作三态 —— merge=合并/调整完成、export=下载成文件、copy=复制结果到剪贴板。
   ⚠️ 以前只有 merge/export，复制完全不上报：用户复制走了结果，后台只看到一条 merge，
      会被误判成「上传了没导出（多半卡住）」。translate 页早有 copy 事件，这里补齐。 */
const MERGE_KIND = { merge: 'merge', export: 'export', copy: 'copy' };
function readMEvents(){
  try {
    const j = JSON.parse(fs.readFileSync(MEVENTS_PATH, 'utf8'));
    if (Array.isArray(j.events)) return j;
  } catch (e) {}
  return { events: [] };
}
/* kind: 'merge'（合并/拆分完成）| 'export'（导出成文件）| 'copy'（复制结果）。
   三条都写：merge 那条能看出「有人上传了却没拿走结果」，export/copy 那条带格式与模板。 */
function appendMEvent(ip, body){
  const b = (body && typeof body === 'object') ? body : {};
  const kind = pickWL(MERGE_KIND, b.kind) || 'merge';
  const src = cleanName(b.src), dst = cleanName(b.dst);
  if (!src && !dst) return;    // 连文件名都没有（异常/空请求）不记
  const ev = {
    t: Date.now(), ip: String(ip || ''), kind: kind,
    src: src, dst: dst,
    cues: Math.max(0, Math.min(1000000, Math.floor(+b.cues || 0))),
    mode: pickWL(MERGE_MODE, b.mode) || 'merge'
  };
  /* export 与 copy 都是「用户把结果拿走了」，都带格式与模板；merge 只是算完看了一眼 */
  if (kind !== 'merge') {
    ev.fmt = pickWL(MERGE_FMT, b.fmt);
    ev.tpl = pickWL(MERGE_TPL, b.tpl);
  }
  try {
    const db = readMEvents();
    db.events.push(ev);
    if (db.events.length > MEVENTS_MAX) db.events = db.events.slice(-MEVENTS_MAX);
    fs.writeFileSync(MEVENTS_PATH, JSON.stringify(db), 'utf8');
  } catch (e) {}
}
function cleanName(s){ return String(s || '').replace(/[\x00-\x1f]/g, '').slice(0, 120); }
/* 按字段做 TOP 计数（空值归到「(空)」，取前 n 个）。
   ⚠️ 必须提到模块层：/api/admin/events 里的 cnt 是那个 if 块内的局部变量，
      合并记录接口照着写会直接 ReferenceError（v0.9.244 首次联调就炸在这里）。 */
function countTop(arr, key, n){
  const m = new Map();
  for (const e of arr) { const k = e[key] || '(空)'; m.set(k, (m.get(k) || 0) + 1); }
  return [...m.entries()].sort((a, b) => b[1] - a[1]).slice(0, n || 10).map(([name, n2]) => ({ name, n: n2 }));
}

/* ---------------- 字幕清洗页使用记录（v0.9.275）----------------
   清洗页（clean.html）同样是纯前端工具：解析、清洗、导出全在浏览器里做，
   请求根本不过服务端，此前后台对这个模块的使用情况完全看不见。
   ⚠️ 照例单独一个文件 clean-events.json，不混进 events / merge-events：
      三者口径不同——翻译按「任务」去重累加，合并一次一记，清洗也是一次一记但字段完全不同。
   只记元数据（文件名 / 条数 / 改动数 / 删除数 / 命中规则 / 导出格式），绝不记字幕内容。 */
const CEVENTS_PATH = path.join(DATA_DIR, 'clean-events.json');
const CEVENTS_MAX = 2000;
/* v0.9.362：补 txt —— 清洗页的「导出纯文本」也是一次真实导出，不认这个格式就会被丢掉 */
const CLEAN_FMT = { srt: 'srt', vtt: 'vtt', ass: 'ass', txt: 'txt' };
/* v0.9.363：clean=洗完看了一眼 / export=下载成文件 / copy=复制走结果 */
const CLEAN_KIND = { clean: 'clean', export: 'export', copy: 'copy' };
/* 清洗规则白名单：与 clean.html 的 OPT[].id 一一对应（13 条）。
   ⚠️ 加减规则必须同步这里，否则新规则命中了后台却记成空值——
      等于「用户在用这条规则，但站长看不见」，统计直接失真。 */
const CLEAN_RULE = {
  assFx: 'assFx', html: 'html', ctrl: 'ctrl', sort: 'sort', sdh: 'sdh',
  speaker: 'speaker', music: 'music', wm: 'wm', dup: 'dup', empty: 'empty',
  punct: 'punct', upper: 'upper', merge: 'merge'
};
/* tags 是数组（一条改动可能同时命中多条规则），逐条过白名单去重 */
function cleanRulesOf(v){
  const out = [];
  for (const r of (Array.isArray(v) ? v : [])) {
    const k = pickWL(CLEAN_RULE, r);
    if (k && out.indexOf(k) < 0) out.push(k);
  }
  return out.slice(0, 13);
}
function readCEvents(){
  try {
    const j = JSON.parse(fs.readFileSync(CEVENTS_PATH, 'utf8'));
    if (Array.isArray(j.events)) return j;
  } catch (e) {}
  return { events: [] };
}
/* kind: 'clean'（解析并清洗完成）| 'export'（真的下载了文件）。两条都写：
   clean 那条能看出「有人上传了却没导出」（多半是结果不满意或中途放弃），
   export 那条带最终生效的改动数、删除数与导出格式。 */
function appendCEvent(ip, body){
  const b = (body && typeof body === 'object') ? body : {};
  const kind = pickWL(CLEAN_KIND, b.kind) || 'clean';
  const src = cleanName(b.src);
  const cues = Math.max(0, Math.min(1000000, Math.floor(+b.cues || 0)));
  /* ⚠️ 粘贴进来的字幕没有文件名。此时不能按「没有文件名就丢弃」处理——
     那等于把粘贴用户整类排除在外，后台看到的量会被系统性低估。
     判据放宽到「有文件名 或 有条目」。 */
  if (!src && cues <= 0) return;
  const num = v => Math.max(0, Math.min(1000000, Math.floor(+v || 0)));
  const ev = {
    t: Date.now(), ip: String(ip || ''), kind: kind,
    src: src, cues: cues,
    mod: num(b.mod), del: num(b.del),
    rules: cleanRulesOf(b.rules)
  };
  if (kind !== 'clean') ev.fmt = pickWL(CLEAN_FMT, b.fmt);
  try {
    const db = readCEvents();
    db.events.push(ev);
    if (db.events.length > CEVENTS_MAX) db.events = db.events.slice(-CEVENTS_MAX);
    fs.writeFileSync(CEVENTS_PATH, JSON.stringify(db), 'utf8');
  } catch (e) {}
}

/* ---------------- 六个垂直工具页的统一使用记录（v0.9.308）----------------
   背景：shift / convert / extract / bilingual / repair / glossary 六个页面全是纯前端工具，
   解析与生成都在浏览器里做，请求根本不过服务端 —— 不埋点，后台永远不知道有没有人在用、
   哪一页最忙、用户是不是「传进来了却没导出」。六个 SEO 入口的价值就凭感觉判断。

   ⚠️ 为什么这六页合起来只写一本账，而翻译/合并/清洗要分三本：
      三本账的**口径互不相同**（翻译按任务去重累加、合并一次一记、清洗带规则命中），
      混在一起没法看；而这六页口径完全一样 —— 都是「某个页发生了某个动作」，
      合一本账、用 page 字段区分反而更好按页横向对比。真要拆，将来按 page 拆文件即可。
   字段只有元数据：哪个页、什么动作、字幕条数、关键数字、导出格式。**绝不记字幕内容。 */
const TEVENTS_PATH = path.join(DATA_DIR, 'tool-events.json');
const TEVENTS_MAX = 3000;
/* ⚠️ 页面白名单必须与六个页面的 reportTool(page,...) 首参一一对应。
      漏一个 → 那一页的记录进来被判成未知页，后台看不见，等于白埋。 */
const TOOL_PAGE = {
  shift: 'shift', convert: 'convert', extract: 'extract',
  bilingual: 'bilingual', repair: 'repair', glossary: 'glossary',
  videosub: 'videosub', hanconv: 'hanconv',
  /* v0.9.316：四个新工具页进账（纯前端页，与上六页同一本账） */
  split: 'split', table: 'table', batch: 'batch', lrc: 'lrc',
  /* v0.9.321：字幕质检页。act 复用现有动作不新增：check=执行质检，fix=应用修复 */
  qc: 'qc',
  /* v0.9.355：YouTube 字幕修正页（纯前端，解析与重排都在浏览器里跑）。
     act 同样复用现有动作：apply=真跑了一次修正，export=真下载了文件。
     ⚠️ 这一页此前完全没埋点 —— 上线后后台看不到「有没有人用、用了多少人、有没有导出」，
        只能去 GA 看个页面浏览量。白名单漏了 ytfix，前端发过来的记录会被整条丢弃。 */
  ytfix: 'ytfix',
  /* v0.9.356：自动生成字幕页与画面硬字幕提取页。
     act 复用现有动作：run=真跑了一次识别，apply=出了结果，export=真下载了文件。 */
  autosub: 'autosub', ocrsub: 'ocrsub'
};
/* ⚠️ 动作白名单：与六页各自埋点处传的 act 一一对应（逐页对齐，共 14 个）。
      加减动作两边必须同步，否则新动作被记成空值 —— 用户明明用了，后台却看不到。
      v0.9.316 四页复用现有动作不新增：split 页 split/merge，table 页 convert/merge，
      batch 页 convert，lrc 页 export。 */
const TOOL_ACT = {
  /* shift 时间轴调整：跑了流水线 / 用户改了一条 */
  edit: 'edit', apply: 'apply',
  /* convert 格式转换 / extract 字幕提取 */
  convert: 'convert', extract: 'extract',
  /* bilingual 双语处理：拆轨记 split，取原文·取译文·合并三档归入 merge */
  merge: 'merge', split: 'split',
  /* repair 乱码修复 */
  repair: 'repair',
  /* glossary 术语批量替换 */
  replace: 'replace',
  /* 六页共用的「真的下载了文件」 */
  export: 'export',
  /* v0.9.321：qc 页的两个动作 —— 跑一遍检查 / 应用修复 */
  check: 'check', fix: 'fix',
  /* v0.9.356：autosub 页的「真跑完一次识别」。
     不复用 check —— 那一档在后台记的是「体检」，跟识别不是一回事；
     漏在这里的话，这一页的上报会被下面那道「page/act 对不上就整条丢」的闸全丢掉。 */
  run: 'run'
};
const TOOL_FMT = { srt: 'srt', vtt: 'vtt', ass: 'ass', txt: 'txt', json: 'json',
  /* v0.9.316：table 页 xlsx/csv、batch 页 zip、lrc 页 lrc */
  xlsx: 'xlsx', csv: 'csv', zip: 'zip', lrc: 'lrc' };
function readTEvents(){
  try {
    const j = JSON.parse(fs.readFileSync(TEVENTS_PATH, 'utf8'));
    if (Array.isArray(j.events)) return j;
  } catch (e) {}
  return { events: [] };
}
function appendTEvent(ip, body){
  const b = (body && typeof body === 'object') ? body : {};
  const page = pickWL(TOOL_PAGE, b.page);
  const act = pickWL(TOOL_ACT, b.act);
  /* 页或动作对不上号就丢：宁可不计，也不往账本里写一条认不出来的脏数据 */
  if (!page || !act) return;
  const num = v => Math.max(0, Math.min(1000000, Math.floor(+v || 0)));
  const ev = { t: Date.now(), ip: String(ip || ''), page: page, act: act, cues: num(b.cues), n: num(b.n) };
  /* ⚠️ 只有认得出来的格式才落字段：pickWL 认不出会返回空串，存进去后台 TOP 里就多一个
     「(空)」，看着像「一堆人导出了未知格式」。repair 页按原编码另存，本来就没格式可说。 */
  if (act === 'export') { const f = pickWL(TOOL_FMT, b.fmt); if (f) ev.fmt = f; }
  try {
    const db = readTEvents();
    db.events.push(ev);
    if (db.events.length > TEVENTS_MAX) db.events = db.events.slice(-TEVENTS_MAX);
    fs.writeFileSync(TEVENTS_PATH, JSON.stringify(db), 'utf8');
  } catch (e) {}
}

/* ---------------- v0.9.371：用户反馈 ----------------
   与 events / merge-events / clean-events / tool-events 四本账并列的第五本，但性质不同：
   前四本是**统计账**（丢一条还能从别的记录推回来），这本是**用户的原始提交**——
   丢了就是丢了，用户不会重发。所以这一个是原子写（tmp + rename），且不参与任何聚合换算。

   字段口径：
     · msg 上限 500 字（用户定案 10-23），前后空白与换行外的控制符清掉；
     · type 只认四类，认不出来的整条拒收（不落成 (空) 污染统计）；
     · ip 原值只留服务端，后台默认打码；ipHash 用于「同 IP 同内容」去重；
     · 不记任何字幕内容 —— 前端也只发页面路径、语言、版本、UA、视口宽。 */
const FB_PATH = path.join(DATA_DIR, 'feedback.json');
const FB_MAX = 3000;
const FB_TXT_MAX = 500;
const FB_CTX_MAX = 80;
const FB_TYPES = { bug: 'bug', idea: 'idea', quality: 'quality', other: 'other' };
const FB_STATUS = { new: 'new', doing: 'doing', done: 'done', spam: 'spam' };

function readFB(){
  try {
    const j = JSON.parse(fs.readFileSync(FB_PATH, 'utf8'));
    if (j && Array.isArray(j.items)) return j;
  } catch (e) {}
  return { v: 1, seq: 0, items: [] };
}
function writeFB(db){
  const tmp = FB_PATH + '.tmp';
  fs.writeFileSync(tmp, JSON.stringify(db), 'utf8');
  fs.renameSync(tmp, FB_PATH);
}
/* 控制符清掉但保留换行：用户可能分条写，压成一行反而难读。
   \x09(Tab) 留成空格，\x0b \x0c 与其它控制符一律清掉。 */
function fbClean(s, max){
  return String(s == null ? '' : s)
    .replace(/\r\n/g, '\n')
    .replace(/[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]/g, ' ')
    .replace(/\t/g, ' ')
    .trim()
    .slice(0, max);
}
/* 后台展示用的打码 IP：1.2.*.* / 2408:8207:*。原值只在服务端内存里用于反滥用。 */
function fbMaskIp(ip){
  const s = String(ip || '');
  if (!s) return '';
  if (s.indexOf('.') > 0) {
    const p = s.split('.');
    if (p.length === 4) return p[0] + '.' + p[1] + '.*.*';
  }
  if (s.indexOf(':') >= 0) return s.split(':').slice(0, 2).join(':') + ':*';
  return '*';
}

/* 限流：1 分钟 1 条 / 1 小时 5 条 / 1 天 10 条，按 IP（CF-Connecting-IP）。
   ⚠️ 只存内存：重启即清零。对反馈这种低频入口足够，也不值得为它落盘。 */
const FB_HITS = new Map();
const FB_WIN = { min: 60 * 1000, hour: 60 * 60 * 1000, day: 24 * 60 * 60 * 1000 };
function fbRate(ip, now){
  const arr = (FB_HITS.get(ip) || []).filter(t => now - t < FB_WIN.day);
  const last = arr.length ? arr[arr.length - 1] : 0;
  if (last && now - last < FB_WIN.min) return false;
  if (arr.filter(t => now - t < FB_WIN.hour).length >= 5) return false;
  if (arr.length >= 10) return false;
  arr.push(now);
  FB_HITS.set(ip, arr);
  return true;
}
(function(){
  const h = setInterval(function(){
    try {
      const now = Date.now();
      for (const [k, v] of FB_HITS) {
        const keep = v.filter(t => now - t < FB_WIN.day);
        if (keep.length) FB_HITS.set(k, keep); else FB_HITS.delete(k);
      }
    } catch (e) {}
  }, 30 * 60 * 1000);
  if (h && typeof h.unref === 'function') h.unref();
})();

function appendFeedback(ip, body){
  const b = (body && typeof body === 'object') ? body : {};
  const type = Object.prototype.hasOwnProperty.call(FB_TYPES, b.type) ? b.type : '';
  if (!type) return { ok: false, code: 'bad_type' };
  const msg = fbClean(b.msg, FB_TXT_MAX + 1);
  /* 超长一律拒（不是截断）：截断会把用户最后半句悄悄吃掉，看着像我们没读懂。 */
  if (msg.length > FB_TXT_MAX) return { ok: false, code: 'too_long' };
  if (msg.length < 5) return { ok: false, code: 'too_short' };

  const now = Date.now();
  const iph = sha256(ip).slice(0, 12);
  const db = readFB();

  /* 同 IP + 同内容 10 分钟内视为重复提交（连点两次 / 网络重试）：回原编号，不新增。 */
  for (let i = db.items.length - 1; i >= 0; i--) {
    const e = db.items[i];
    if (!e || now - (e.t || 0) > 10 * 60 * 1000) break;
    if (e.ipHash === iph && e.msg === msg) return { ok: true, no: e.no, dup: true };
  }

  db.seq = (Number(db.seq) || 0) + 1;
  const page = fbClean(b.page, FB_CTX_MAX);
  const item = {
    id: 'f_' + db.seq,
    no: db.seq,
    t: now,
    type: type,
    msg: msg,
    contact: fbClean(b.contact, 120),
    /* 页面只留路径：带 query 的链接可能含 token/文件名，不该进后台 */
    page: /^\//.test(page) ? page.split('?')[0].split('#')[0] : '',
    lang: /^[A-Za-z-]{2,12}$/.test(String(b.lang || '')) ? String(b.lang) : '',
    ver: /^[0-9.]{1,16}$/.test(String(b.ver || '')) ? String(b.ver) : '',
    ua: fbClean(b.ua, 200),
    vw: Math.max(0, Math.min(10000, Math.floor(Number(b.vw) || 0))),
    ip: String(ip || ''),
    ipHash: iph,
    status: 'new',
    note: '',
    repliedAt: 0
  };
  db.items.push(item);
  if (db.items.length > FB_MAX) db.items = db.items.slice(-FB_MAX);
  writeFB(db);
  return { ok: true, no: item.no };
}

/* 反馈与埋点的关联：同 IP ±30 分钟内有没有翻译事件、有没有失败。
   反馈说「翻到一半卡住」时，这一行比让用户复述十遍都管用。
   ⚠️ 只读，不写任何账本。 */
function fbNear(evs, ip, ts){
  let n = 0, fail = '';
  for (const e of evs) {
    if (e.ip !== ip) continue;
    if (Math.abs((e.t || 0) - ts) > 30 * 60 * 1000) continue;
    n++;
    if (e.failMsg && !fail) fail = String(e.failMsg);
  }
  return { n: n, fail: fail };
}

/* ---------------- 管理会话（内存 token） ---------------- */
const TOKENS = new Set();
function newToken(){ const tk = crypto.randomBytes(24).toString('hex'); TOKENS.add(tk); return tk; }
function authed(req){ const tk = req.headers['x-admin-token']; return tk && TOKENS.has(tk); }

/* ---------------- v0.9.285：后台登录限流 ----------------
   规则：连续输错 3 次 → 账户与来源 IP 同时锁定 24 小时。

   两条计数各自独立、任一触线即拒绝：
   - 账户维度（全局单例，本后台只有一个管理员）：挡「换 IP 分布式爆破」
   - IP 维度：挡单机连打
   ⚠️ 锁定期内即使密码正确也拒绝（回 429 而非 401）—— 否则等于只是「3 次内随便试」，
      攻击者换个正确密码就能重置计数，限流形同虚设。

   ⚠️ 计数只存内存，重启服务即全部解锁 —— 这是刻意留的紧急出口：
      自己连错 3 次被锁时 `systemctl restart srt-translator` 即可恢复，不必改代码。
      代价是重启后攻击者也能重来一轮，所以账户维度必须同步存在。

   ⚠️ IP 取自 clientIp()：v0.9.324 起优先 CF-Connecting-IP（真实访客 IP），无该头时回退
      X-Forwarded-For 首段。头均可被直连伪造，因此不能只依赖 IP 这一条，
      账户维度锁定必须同步存在。当前部署在 Cloudflare 之后。 */
const LOGIN_MAX_FAIL = 3;
const LOGIN_LOCK_MS = 24 * 60 * 60 * 1000;
const loginIp = new Map();              // ip -> { n, until }
let loginAcct = { n: 0, until: 0 };     // 账户维度（单例）
let loginSweepAt = 0;
function loginSweep(now){
  if (now - loginSweepAt < 10 * 60 * 1000) return;  // 最多 10 分钟清理一次，防 Map 无限增长
  loginSweepAt = now;
  for (const [k, v] of loginIp) if (!v.until || v.until <= now) loginIp.delete(k);
}
/** 已锁定 → 返回剩余毫秒；未锁 → null */
function loginLocked(now, ip){
  loginSweep(now);
  const a = (loginAcct.until && loginAcct.until > now) ? loginAcct.until - now : 0;
  const v = loginIp.get(ip);
  const b = (v && v.until && v.until > now) ? v.until - now : 0;
  const m = Math.max(a, b);
  return m > 0 ? m : null;
}
function loginReset(ip){ loginAcct = { n: 0, until: 0 }; loginIp.delete(ip); }
function loginBump(now, ip){
  loginAcct = { n: loginAcct.n + 1, until: loginAcct.until };
  if (loginAcct.n >= LOGIN_MAX_FAIL) loginAcct.until = now + LOGIN_LOCK_MS;
  const v = loginIp.get(ip) || { n: 0, until: 0 };
  v.n += 1;
  if (v.n >= LOGIN_MAX_FAIL) v.until = now + LOGIN_LOCK_MS;
  loginIp.set(ip, v);
}

/* ---------------- 工具 ---------------- */
function readBody(req, limitBytes){
  return new Promise((resolve, reject) => {
    let size = 0; const chunks = [];
    req.on('data', c => {
      size += c.length;
      if (size > limitBytes) { reject(new Error('body too large')); req.destroy(); return; }
      chunks.push(c);
    });
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    req.on('error', reject);
  });
}
function sendJson(res, code, obj){
  const body = JSON.stringify(obj);
  res.writeHead(code, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(body);
}
function clientIp(req){
  /* v0.9.324：站前是 Cloudflare，真实访客 IP 在 CF-Connecting-IP；X-Forwarded-For 首段
     实测是 CF 边缘节点 IP（162.158/172.68-71/104.22-23 段），随请求漂移 —— 同一个用户
     每次请求可能换节点，按它统计/限流会把一个人拆成多个"IP"（10-16 账本诊断实证）。
     ⚠️ 该头可被「直连源站」伪造（绕过 CF），所以带格式校验 + 保留 XFF/remoteAddress 兜底；
     登录锁定等安全逻辑不能只依赖 IP，账户维度锁定兜底（见上方 loginBump）。 */
  const cf = String(req.headers['cf-connecting-ip'] || '').trim();
  if (cf && (/^(\d{1,3}\.){3}\d{1,3}$/.test(cf) || /^([0-9a-fA-F]{0,4}:){2,7}[0-9a-fA-F]{0,4}$/.test(cf))) return cf;
  return (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || req.socket.remoteAddress || 'unknown';
}
const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8',
  '.png': 'image/png', '.svg': 'image/svg+xml', '.ico': 'image/x-icon',
  /* v0.9.323：内容页截图用 WebP+PNG 双源（<picture>），MIME 得认识 webp */
  '.webp': 'image/webp',
  '.txt': 'text/plain; charset=utf-8', '.xml': 'application/xml; charset=utf-8'
};
function serveStatic(req, res, urlPath){
  let p = decodeURIComponent(urlPath.split('?')[0]);
  /* v0.9.366：/zh 与 /zh/* 301 到无前缀形态（/zh/ → /，/zh/autosub.html → /autosub.html，
     /zh/guides/ → /guides/）。zh 是外链和浏览器最常见的短代码写法，但中文是默认语言：
     根路径直接服务、hreflang 里 zh-CN 指向 /。此前这类链接一律 404，外链流量全落空。
     ⚠️ 只接 zh 这一个；zh-CN 故意不接（继续 404），否则同一种语言会有两个可访问地址，
         canonical 与实际 URL 就对不上了。 */
  if (p === '/zh' || p === '/zh/' || p.indexOf('/zh/') === 0) {
    const rest = (p === '/zh' || p === '/zh/') ? '/' : p.slice(3);
    const qi = req.url.indexOf('?');
    res.writeHead(301, { Location: rest + (qi >= 0 ? req.url.slice(qi) : '') });
    return res.end();
  }
  // SEO：robots.txt / sitemap.xml 按当前访问域名动态生成（换域名/部署环境自动适配）
  const baseUrl = publicBase(req);
  if (p === '/robots.txt' && baseUrl) {
    /* v0.9.284：/data/ 一并声明不抓取。
       ⚠️ 别把 robots 当安全手段 —— 它只挡守规矩的爬虫，挡不住直接 curl。
          真正的防线是上面 serveStatic 里那条 404（v0.9.283）。 */
    const body = 'User-agent: *\nAllow: /\nDisallow: /admin.html\nDisallow: /data/\nDisallow: /content/\n\nSitemap: ' + baseUrl + '/sitemap.xml\n';
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(body); return;
  }
  /* v0.9.342：sitemap 拆成 index + 按语言的子 sitemap。
     之前是单个 19.6MB 的巨型文件（2861 条 URL × 每条 101 个 xhtml:link），
     爬虫每次都要整包重下；拆开后每片 ~190KB，可按语言增量、单独重抓。
     ⚠️ /sitemap-all.xml 保留全量版（排障/第三方工具要用），但不进 index、不进 robots。 */
  if (p === '/sitemap.xml' && baseUrl) {
    const body = sitemapIndexXml(baseUrl);
    res.writeHead(200, { 'Content-Type': 'application/xml; charset=utf-8' });
    res.end(body); return;
  }
  if (p === '/sitemap-all.xml' && baseUrl) {
    const body = sitemapXml(baseUrl);
    res.writeHead(200, { 'Content-Type': 'application/xml; charset=utf-8' });
    res.end(body); return;
  }
  const smLang = /^\/sitemap-([a-zA-Z][a-zA-Z-]*)\.xml$/.exec(p);
  if (smLang && baseUrl && SEO_LANGS.indexOf(smLang[1]) >= 0) {
    const body = sitemapLangXml(baseUrl, smLang[1]);
    res.writeHead(200, { 'Content-Type': 'application/xml; charset=utf-8' });
    res.end(body); return;
  }
  // SEO 多语言路由：/ = 简中（默认），/en/ /zh-TW/ /ja/ 各自输出对应语言的完整 head
  const lang = SEO_ROUTE[p];
  if (lang) { serveIndexLang(req, res, lang, 'index'); return; }
  if (p === '/') { serveIndexLang(req, res, 'zh-CN', 'index'); return; }
  /* v0.9.273：特效页 / 清洗页的多语言路由。
     ⚠️ 必须排在下面那条「语言目录下的静态资源回退」之前 —— 否则 /en/merge.html
     会被当成 /merge.html 原样吐出去，SEO head 一个字都换不掉，等于没做。 */
  /* v0.9.288：转换页 /convert.html 与 /en/convert.html */
  let pm = p.match(/^\/([a-zA-Z][a-zA-Z\-]*)\/(merge|clean|translate|convert|bilingual|shift|repair|extract|glossary|videosub|hanconv|split|table|batch|lrc|qc)\.html$/);
  if (pm && SEO_ROUTE['/' + pm[1]]) {
    serveIndexLang(req, res, SEO_ROUTE['/' + pm[1]], pm[2]); return;
  }
  pm = p.match(/^\/(merge|clean|translate|convert|bilingual|shift|repair|extract|glossary|videosub|hanconv|split|table|batch|lrc|qc)\.html$/);
  if (pm) { serveIndexLang(req, res, 'zh-CN', pm[1]); return; }
  /* v0.9.352：YouTube 字幕优化页。与上面两条白名单正则分开写 —— 那两条被 17 页共用，
     往里塞第 18 个分支等于动 17 个页面的路由，出错面太大。这里自己一条，
     URL 形态只有 /ytfix.html 与 /<lang>/ytfix.html 两种。
     ⚠️ 必须排在下面「语言目录下的静态资源回退」之前，否则 /en/ytfix.html 会被
        改写成 /ytfix.html 当静态文件吐出去，SEO head 一个字都换不掉。 */
  const ym = p.match(/^\/(?:([a-zA-Z][a-zA-Z\-]*)\/)?ytfix\.html$/);
  if (ym && (!ym[1] || SEO_ROUTE['/' + ym[1]])) {
    serveIndexLang(req, res, ym[1] ? SEO_ROUTE['/' + ym[1]] : 'zh-CN', 'ytfix'); return;
  }
  /* v0.9.356：自动生成字幕页与画面硬字幕提取页。与上面那条 17 页白名单分开，
     理由同上（不动老页面路由）。URL 形态只有 /xxx.html 与 /<lang>/xxx.html 两种。
     ⚠️ 同样必须排在「语言目录下的静态资源回退」之前。 */
  const am = p.match(/^\/(?:([a-zA-Z][a-zA-Z\-]*)\/)?(autosub|ocrsub)\.html$/);
  if (am && (!am[1] || SEO_ROUTE['/' + am[1]])) {
    serveIndexLang(req, res, am[1] ? SEO_ROUTE['/' + am[1]] : 'zh-CN', am[2]); return;
  }
  /* v0.9.373：一次出多语 / 多集批量页。同上，独立一条正则 —— 不往那条 17 页白名单里塞，
     改动面小；URL 形态只有 /multilang.html 与 /<lang>/multilang.html 两种。
     ⚠️ 必须在「语言目录下的静态资源回退」之前，否则 /en/multilang.html 会当静态文件原样吐出。 */
  const mlm = p.match(/^\/(?:([a-zA-Z][a-zA-Z\-]*)\/)?multilang\.html$/);
  if (mlm && (!mlm[1] || SEO_ROUTE['/' + mlm[1]])) {
    serveIndexLang(req, res, mlm[1] ? SEO_ROUTE['/' + mlm[1]] : 'zh-CN', 'multilang'); return;
  }
  /* v0.9.323：内容页（指南）路由 —— 独立分支，不动上面那条 16 页白名单正则。
     URL 形态：/guides/<slug>.html（简中）与 /<lang>/guides/<slug>.html（语言版）；
     /guides/ 是索引页。slug 来自 content/ 目录扫描（GUIDE_PAGES），
     没注册的一律不接 —— 下面自然落进静态 404。
     ⚠️ 必须排在「语言目录下的静态资源回退」之前：否则 /en/guides/x.html 会被
        改写成 /guides/x.html 直接当静态文件找（不存在 → 404），SEO head 一个字都注入不上。 */
  let gm = p.match(/^\/guides\/([a-z0-9][a-z0-9\-]*)\.html$/);
  if (gm && GUIDE_PAGES[gm[1]]) { serveGuide(req, res, 'zh-CN', gm[1]); return; }
  gm = p.match(/^\/guides\/?$/);
  if (gm) { serveGuideIndex(req, res, 'zh-CN'); return; }
  gm = p.match(/^\/([a-zA-Z][a-zA-Z\-]*)\/guides\/([a-z0-9][a-z0-9\-]*)\.html$/);
  if (gm && SEO_ROUTE['/' + gm[1]] && GUIDE_PAGES[gm[2]]) { serveGuide(req, res, SEO_ROUTE['/' + gm[1]], gm[2]); return; }
  gm = p.match(/^\/([a-zA-Z][a-zA-Z\-]*)\/guides\/?$/);
  if (gm && SEO_ROUTE['/' + gm[1]]) { serveGuideIndex(req, res, SEO_ROUTE['/' + gm[1]]); return; }
  /* v0.9.366：guides.html 是**模板**，里面的 H1 / 正文 / 语言下拉都是占位符，
     只有 /guides/ 这条路由会替换。直接静态访问它会拿到一个「H1 是英文 Guides、
     正文空白、语言下拉是个白框」的空壳页（v0.9.365 实测）。301 到真正渲染过的索引页。 */
  gm = p.match(/^(?:\/([a-zA-Z][a-zA-Z\-]*))?\/guides\.html$/);
  if (gm && (!gm[1] || SEO_ROUTE['/' + gm[1]])) {
    res.writeHead(301, { Location: (gm[1] ? '/' + gm[1] : '') + '/guides/', 'Cache-Control': 'no-cache' });
    res.end(); return;
  }
  /* v0.9.33：语言路由下的静态资源（/en/srt-core.js 等）回退到根目录同名文件——
     修复语言路由页面相对引用 404 导致整页 JS 失效的预存 bug */
  const lm = p.match(/^\/([a-zA-Z][a-zA-Z-]*)\/(.+)$/);
  if (lm && SEO_ROUTE['/' + lm[1]]) p = '/' + lm[2];
  // v0.9.68 安全加固：点文件/点目录一律 404（.bash_history、.ssh、.git、._* AppleDouble 等）。
  // 2026-09-12 事故：deploy.sh 被在 /root 下运行，把 /root 杂物（含 .bash_history）整体拷进
  // 应用目录，serveStatic 无差别放行导致其公网可读约 30 小时。合法静态资源无一是点文件。
  if (p.split('/').some((seg) => seg.startsWith('.'))) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Not Found'); return;
  }
  /* v0.9.283 安全加固：data/ 整目录（含 data.bak 备份）一律 404。
     2026-10-12 体检发现：/api/admin/config 本身是鉴权的、密钥也只回 keyMask 掩码，
     但 data/config.json 是「点文件」之外的普通路径，被上面的静态分支原样吐了出去，
     等于给那条鉴权开了一扇后门——明文 API Key、adminHash、analyticsId 公网可读。
     ⚠️ data/data.bak/ 是本地备份副本，含同样的 config.json，必须一起挡。 */
  if (p === '/data' || p.startsWith('/data/') || p === '/data.bak' || p.startsWith('/data.bak/')) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Not Found'); return;
  }
  /* v0.9.323：content/ 是内容页的数据源（正文+SEO 文案），只有渲染后的 HTML 对外，
     数据文件本身不许被直接读到 —— 照 data/ 的做法整目录 404。 */
  if (p === '/content' || p.startsWith('/content/')) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Not Found'); return;
  }
  const file = path.normalize(path.join(ROOT, p));
  if (!file.startsWith(ROOT)) { res.writeHead(403); res.end('Forbidden'); return; }
  /* v0.9.75 缓存修复：此前响应无 Cache-Control/Last-Modified，浏览器启发式缓存且无法
     协调验证——用户长期跑旧版 srt-core.js（2026-09-12 日语词切断事故根因）。
     策略：no-cache（每次协调验证）+ Last-Modified/If-Modified-Since（未变则 304，零开销）。
     index.html 变 fresh 后，其内 ?v= 版本参数才能及时把新版 srt-core.js 推给浏览器 */
  fs.stat(file, (err, st) => {
    if (err || !st.isFile()) { res.writeHead(404, {'Content-Type':'text/plain; charset=utf-8'}); res.end('Not Found'); return; }
    const lastMod = st.mtime.toUTCString();
    const mtimeSec = Math.floor(st.mtime.getTime() / 1000) * 1000;
    const ims = req.headers['if-modified-since'];
    if (ims) {
      const t = Date.parse(ims);
      if (!isNaN(t) && t >= mtimeSec) {
        res.writeHead(304, { 'Cache-Control': 'no-cache', 'Last-Modified': lastMod });
        res.end(); return;
      }
    }
    res.writeHead(200, {
      'Content-Type': MIME[path.extname(file)] || 'application/octet-stream',
      'Cache-Control': 'no-cache',
      'Last-Modified': lastMod
    });
    fs.readFile(file, (err2, buf) => {
      if (err2) { res.writeHead(404, {'Content-Type':'text/plain; charset=utf-8'}); res.end('Not Found'); return; }
      res.end(buf);
    });
  });
}
/* ---------------- SEO 多语言版本（v0.9） ----------------
 * URL 路由：/ = 简体中文（默认） /en/ = English /zh-TW/ = 繁體中文 /ja/ = 日本語
 * 每个语言版本由服务端注入完整的 <head>（title/description/hreflang/canonical/OG/JSON-LD）
 * 与静态 SEO 文案块——爬虫无需执行 JS 即可拿到对应语言内容。
 * 前端 srt-core / UI 不变：index.html 内置简中默认版，直接文件打开也可用。
 */
const SEO_ROUTE = {
  '/en': 'en', '/en/': 'en',
  '/zh-TW': 'zh-TW', '/zh-TW/': 'zh-TW',
  '/ja': 'ja', '/ja/': 'ja',
  '/es': 'es', '/es/': 'es',
  '/pt': 'pt', '/pt/': 'pt',
  '/ko': 'ko', '/ko/': 'ko',
  '/de': 'de', '/de/': 'de',
  '/fr': 'fr', '/fr/': 'fr',
  '/id': 'id', '/id/': 'id',
  '/hi': 'hi', '/hi/': 'hi',
  '/th': 'th', '/th/': 'th',
  '/vi': 'vi', '/vi/': 'vi',
  '/ru': 'ru', '/ru/': 'ru',
  '/it': 'it', '/it/': 'it',
  '/ar': 'ar', '/ar/': 'ar',
  '/tr': 'tr', '/tr/': 'tr',
  '/nl': 'nl', '/nl/': 'nl',
  '/pl': 'pl', '/pl/': 'pl',
  '/sv': 'sv', '/sv/': 'sv',
  '/cs': 'cs', '/cs/': 'cs',
  '/uk': 'uk', '/uk/': 'uk',
  '/da': 'da', '/da/': 'da',
  '/fi': 'fi', '/fi/': 'fi',
  '/el': 'el', '/el/': 'el',
  '/he': 'he', '/he/': 'he',
  '/ro': 'ro', '/ro/': 'ro'
};
/* v0.9.339：从右向左书写的语言（页面 <html dir> 用）。
   与 site-i18n.js 的 RTL_UI 保持一致 —— 那 9 种文字都是 RTL。 */
const RTL_LANGS = ['ar', 'fa', 'he', 'ur', 'ps', 'ku', 'ug', 'sd', 'yi'];
const SEO_LANGS = ['zh-CN', 'zh-TW', 'en', 'ja', 'es', 'pt', 'ko', 'de', 'fr', 'id', 'hi', 'th', 'vi', 'ru', 'it', 'ar', 'tr', 'nl', 'pl', 'sv', 'cs', 'uk', 'da', 'fi', 'el', 'he', 'ro'];
const SEO_PATH = { 'zh-CN': '/', 'zh-TW': '/zh-TW/', 'en': '/en/', 'ja': '/ja/', 'es': '/es/', 'pt': '/pt/', 'ko': '/ko/', 'de': '/de/', 'fr': '/fr/', 'id': '/id/', 'hi': '/hi/', 'th': '/th/', 'vi': '/vi/', 'ru': '/ru/', 'it': '/it/', 'ar': '/ar/', 'tr': '/tr/', 'nl': '/nl/', 'pl': '/pl/', 'sv': '/sv/', 'cs': '/cs/', 'uk': '/uk/', 'da': '/da/', 'fi': '/fi/', 'el': '/el/', 'he': '/he/', 'ro': '/ro/' };
const SEO = {
  'zh-CN': {
    htmlLang: 'zh-CN', ogLocale: 'zh_CN', siteName: '随心字幕 AI',
    title: '随心字幕 AI (AI-SRTSub) - 全球好剧，一键生成母语字幕',
    desc: 'ai-srtsub.com 是专为影迷打造的免费 AI 字幕翻译工具。支持海外电影、美剧英剧、纪录片一键生成精准母语字幕，自动配轴对齐，无需注册，轻松告别啃生肉，让全球好内容无语言障碍随心畅享。',
    kw: 'AI字幕翻译,字幕翻译,SRT翻译,VTT翻译,ASS翻译,免费字幕翻译,电影字幕翻译,美剧英剧字幕,纪录片字幕,母语字幕,双语字幕,韩剧字幕,日剧字幕,泰剧字幕,动漫字幕,Netflix字幕翻译,追剧字幕,生肉字幕,海外剧字幕,字幕在线翻译,大模型翻译,视频字幕翻译,translate subtitles,免费翻译字幕工具,免费AI字幕翻译,免费在线字幕翻译',
    ogTitle: '随心字幕 AI (AI-SRTSub) - 全球好剧随心看，一键生成专属母语字幕',
    ogDesc: '专为影迷打造的免费 AI 字幕翻译工具：海外电影、美剧英剧、纪录片一键生成精准母语字幕，自动配轴对齐，告别啃生肉，全球好内容随心畅享。',
    jsonldName: '随心字幕 AI', jsonldAlt: 'AI-SRTSub',
    jsonldDesc: '专为影迷打造的免费 AI 字幕翻译工具：海外电影、美剧英剧、纪录片一键生成精准母语字幕，自动配轴对齐，告别啃生肉，全球好内容随心畅享。',
    currency: 'CNY',
    copy: '<section class="seo" aria-label="关于本工具" style="max-width:1360px;margin:32px auto 0;padding:20px 24px 0;border-top:1px solid var(--line);color:var(--sub);font-size:13px;line-height:1.8;">\n    <h2 data-i18n="seoTitle" style="font-size:15px;color:var(--ink);margin:0 0 10px;font-weight:600;">关于随心字幕 AI</h2>\n    <p data-i18n-html="seoIntro">本工具是一款<strong>基于 AI 大模型的免费在线字幕翻译服务</strong>，支持 SRT / VTT / ASS 等主流字幕格式与中文、英文、日文等多语言互译。无需注册、无需下载客户端，浏览器打开即可使用，字幕数据全程不上传服务器（除非你勾选了云端翻译）。</p>\n    <p data-i18n-html="seoFeatures" style="margin-top:8px;"><strong>主要功能：</strong>SRT / VTT / ASS 字幕解析与翻译、句级智能合并（一个完整句子分布在多条字幕时合并翻译后按时长回填）、时间轴对齐、自动折行（支持 CJK 与西文混合宽度）、去水词、专有名词保留或翻译、可选翻译风格（信达雅 / 大白话 / 自定义）。译文可直接导出为 SRT / VTT / ASS / TXT 等格式压制视频。</p>\n    <p data-i18n-html="seoWho" style="margin-top:8px;"><strong>适用人群：</strong>视频翻译从业者、自媒体创作者、外语学习者、字幕组、需要快速本地化视频内容的团队。</p>\n  </section>\n  <noscript>\n    <p data-i18n="seoNoscript" style="max-width:1360px;margin:24px auto;padding:0 24px;color:#1C2E2B;">本工具需要启用 JavaScript 才能使用。请在浏览器中启用 JavaScript，然后上传 SRT / VTT / ASS 字幕文件即可使用 AI 免费字幕翻译。</p>\n  </noscript>'
  },
  'zh-TW': {
    htmlLang: 'zh-TW', ogLocale: 'zh_TW', siteName: '隨心字幕 AI',
    title: '隨心字幕 AI (AI-SRTSub) - 全球好劇一鍵生成專屬母語字幕',
    desc: 'ai-srtsub.com 是專為影迷打造的免費 AI 字幕翻譯工具。支援海外電影、美劇英劇、紀錄片一鍵生成精準母語字幕，自動配軸對齊，無需註冊，輕鬆告別啃生肉，讓全球好內容無語言障礙隨心暢享。',
    kw: 'AI字幕翻譯,字幕翻譯,SRT翻譯,VTT翻譯,ASS翻譯,免費字幕翻譯,繁體中文翻譯,電影字幕翻譯,美劇英劇字幕,紀錄片字幕,母語字幕,雙語字幕,韓劇字幕,日劇字幕,泰劇字幕,動漫字幕,追劇字幕,字幕線上翻譯,Netflix字幕,translate subtitles,免費翻譯字幕工具,免費AI字幕翻譯,免費線上字幕翻譯',
    ogTitle: '隨心字幕 AI (AI-SRTSub) - 全球好劇隨心看，一鍵生成專屬母語字幕',
    ogDesc: '專為影迷打造的免費 AI 字幕翻譯工具：海外電影、美劇英劇、紀錄片一鍵生成精準母語字幕，自動配軸對齊，告別啃生肉，全球好內容隨心暢享。',
    jsonldName: '隨心字幕 AI', jsonldAlt: 'AI-SRTSub',
    jsonldDesc: '專為影迷打造的免費 AI 字幕翻譯工具：海外電影、美劇英劇、紀錄片一鍵生成精準母語字幕，自動配軸對齊，告別啃生肉，全球好內容隨心暢享。',
    currency: 'CNY',
    copy: '<section class="seo" aria-label="關於本工具" style="max-width:1360px;margin:32px auto 0;padding:20px 24px 0;border-top:1px solid var(--line);color:var(--sub);font-size:13px;line-height:1.8;">\n    <h2 data-i18n="seoTitle" style="font-size:15px;color:var(--ink);margin:0 0 10px;font-weight:600;">關於隨心字幕 AI</h2>\n    <p data-i18n-html="seoIntro">本工具是一款<strong>基於 AI 大模型的免費線上字幕翻譯服務</strong>，支援 SRT / VTT / ASS 等主流字幕格式與中文、英文、日文等多語言互譯。無需註冊、無需下載用戶端，瀏覽器開啟即可使用，字幕資料全程不上傳伺服器（除非勾選了雲端翻譯）。</p>\n    <p data-i18n-html="seoFeatures" style="margin-top:8px;"><strong>主要功能：</strong>SRT / VTT / ASS 字幕解析與翻譯、句級智慧合併（一個完整句子分佈在多條字幕時合併翻譯後按時長回填）、時間軸對齊、自動折行（支援 CJK 與西文混合寬度）、去口語贅詞、專有名詞保留或翻譯、可選翻譯風格（信達雅 / 大白話 / 自訂）。譯文可直接匯出為 SRT / VTT / ASS / TXT 等格式壓製影片。</p>\n    <p data-i18n-html="seoWho" style="margin-top:8px;"><strong>適用人群：</strong>影片翻譯從業者、自媒體創作者、外語學習者、字幕組、需要快速在地化影片內容的團隊。</p>\n  </section>\n  <noscript>\n    <p data-i18n="seoNoscript" style="max-width:1360px;margin:24px auto;padding:0 24px;color:#1C2E2B;">本工具需要啟用 JavaScript 才能使用。請在瀏覽器中啟用 JavaScript，然後上傳 SRT / VTT / ASS 字幕檔案即可使用 AI 免費字幕翻譯。</p>\n  </noscript>'
  },
  'en': {
    htmlLang: 'en', ogLocale: 'en_US', siteName: 'AI-SRTSub',
    title: 'AI-SRTSub - Global Movies & Series, Subtitles in Your Language',
    desc: "Free AI subtitle translator — no signup, no limits, no watermark. Turn subtitles of foreign films, series and documentaries into your language in one click.",
    kw: 'AI subtitle translator, translate subtitles, free subtitle translator, translate SRT file, translate VTT, translate ASS, movie subtitle translation, TV series subtitles, Netflix subtitles, KDrama subtitles, anime subtitles, bilingual subtitles, foreign film subtitles, translate subtitles online, YouTube subtitles,free subtitle translation tool,translate subtitles free,free SRT translator',
    ogTitle: 'AI-SRTSub - Global Movies & Series, Subtitles in Your Language',
    ogDesc: '100% free AI subtitle translator for movie fans: one click turns subtitles of foreign films, series and documentaries into your native language, with automatic timeline alignment. Enjoy global content barrier-free.',
    jsonldName: 'AI-SRTSub', jsonldAlt: '随心字幕 AI',
    jsonldDesc: '100% free AI subtitle translator for movie fans: one click turns subtitles of foreign films, series and documentaries into your native language, with automatic timeline alignment. Enjoy global content barrier-free.',
    currency: 'USD',
    copy: '<section class="seo" aria-label="About this tool" style="max-width:1360px;margin:32px auto 0;padding:20px 24px 0;border-top:1px solid var(--line);color:var(--sub);font-size:13px;line-height:1.8;">\n    <h2 data-i18n="seoTitle" style="font-size:15px;color:var(--ink);margin:0 0 10px;font-weight:600;">Free AI Auto Subtitle Translator</h2>\n    <p data-i18n-html="seoIntro">This is a <strong>free online subtitle translation tool powered by large language models</strong>. Upload SRT, VTT or ASS files and translate subtitles between English, Chinese, Japanese, Korean, Spanish, French and 15+ other languages. No signup, no installation, no watermark — open it in a browser and start translating. Subtitle data stays in your browser unless you enable cloud translation.</p>\n    <p data-i18n-html="seoFeatures" style="margin-top:8px;"><strong>Key features:</strong> SRT, VTT and ASS parsing and AI translation, smart sentence merging (when one sentence spans multiple cues, cues are merged, translated, then split back across the original timeline), timeline alignment, automatic line wrapping for CJK and Western text, filler-word removal, custom terminology handling, and selectable translation styles. Export standard SRT, VTT, ASS or TXT files ready to hard-sub onto your video.</p>\n    <p data-i18n-html="seoWho" style="margin-top:8px;"><strong>Who uses it:</strong> video translators, YouTube creators and localizers, language learners, subtitle groups and teams that need to localize video content quickly.</p>\n  </section>\n  <noscript>\n    <p data-i18n="seoNoscript" style="max-width:1360px;margin:24px auto;padding:0 24px;color:#1C2E2B;">This tool requires JavaScript. Please enable JavaScript in your browser, then upload a subtitle file (SRT / VTT / ASS) to translate subtitles with AI for free.</p>\n  </noscript>'
  },
  'ja': {
    htmlLang: 'ja', ogLocale: 'ja_JP', siteName: 'AI-SRTSub',
    title: 'AI-SRTSub - 世界の映画・ドラマを母国語字幕で楽しむAI字幕翻訳',
    desc: 'ai-srtsub.comは映画ファンのための無料AI字幕翻訳ツール。海外映画・海外ドラマ・ドキュメンタリーの字幕をワンクリックで日本語に自動翻訳し、タイムラインも自動整合。字幕探しの手間から解放され、言葉の壁なしで世界の名作を思う存分楽しめます。',
    kw: '字幕翻訳,AI字幕翻訳,無料 字幕翻訳,SRT翻訳,VTT翻訳,ASS翻訳,オンライン字幕翻訳,動画翻訳,海外映画 字幕,海外ドラマ 字幕,韓流 字幕,アニメ 字幕,二か国語 字幕,日本語字幕,Netflix 字幕,ユーチューブ 字幕,無料 字幕翻訳ツール,字幕を無料で翻訳',
    ogTitle: 'AI-SRTSub - 世界の映画・ドラマを母国語字幕で楽しむAI字幕翻訳',
    ogDesc: '映画ファンのための無料AI字幕翻訳ツール：海外映画・海外ドラマ・ドキュメンタリーの字幕をワンクリックで日本語に自動翻訳、タイムライン自動整合。言葉の壁なしで世界の名作を。',
    jsonldName: 'AI-SRTSub', jsonldAlt: '随心字幕 AI',
    jsonldDesc: '映画ファンのための無料AI字幕翻訳ツール：海外映画・海外ドラマ・ドキュメンタリーの字幕をワンクリックで日本語に自動翻訳、タイムライン自動整合。言葉の壁なしで世界の名作を。',
    currency: 'JPY',
    copy: '<section class="seo" aria-label="このツールについて" style="max-width:1360px;margin:32px auto 0;padding:20px 24px 0;border-top:1px solid var(--line);color:var(--sub);font-size:13px;line-height:1.8;">\n    <h2 data-i18n="seoTitle" style="font-size:15px;color:var(--ink);margin:0 0 10px;font-weight:600;">無料のAI全自動字幕翻訳ツール</h2>\n    <p data-i18n-html="seoIntro">本ツールは<strong>AI大規模モデルを利用した無料のオンラインSRT字幕翻訳サービス</strong>です。SRT / VTT / ASSファイルをアップロードするだけで、日本語・英語・中国語・韓国語など15言語以上の間で字幕を翻訳できます。登録不要・インストール不要・透かしなし、ブラウザで開くだけで使えます。クラウド翻訳を有効にしない限り、字幕データはサーバーに送信されません。</p>\n    <p data-i18n-html="seoFeatures" style="margin-top:8px;"><strong>主な機能：</strong>SRT / VTT / ASSファイルの解析とAI翻訳、文単位のスマート結合（1つの文が複数の字幕にまたがる場合、結合して翻訳後、元のタイムラインに沿って再分割）、タイムライン整合、CJKと西文の混在に対応した自動改行、フィラー語の削除、専門用語の処理、翻訳スタイルの選択。標準的なSRT / VTT / ASS / TXTファイルとして書き出し、そのまま動画に焼き付けられます。</p>\n    <p data-i18n-html="seoWho" style="margin-top:8px;"><strong>こんな方に：</strong>動画翻訳の業務に携わる方、YouTubeクリエイター、語学学習者、字幕チーム、動画コンテンツを素早くローカライズしたいチーム。</p>\n  </section>\n  <noscript>\n    <p data-i18n="seoNoscript" style="max-width:1360px;margin:24px auto;padding:0 24px;color:#1C2E2B;">本ツールを使用するにはJavaScriptが必要です。ブラウザでJavaScriptを有効にしてから、SRT / VTT / ASS字幕ファイルをアップロードしてAI字幕翻訳をご利用ください。</p>\n  </noscript>'
  },
  'es': {
    htmlLang: 'es', ogLocale: 'es_ES', siteName: 'AI-SRTSub',
    title: 'AI-SRTSub - Cine y series del mundo, subtítulos en tu idioma',
    desc: 'ai-srtsub.com: traductor de subtítulos con IA gratis para cinéfilos y sin registro. Convierte en un clic subtítulos de películas y series a tu idioma.',
    kw: 'traductor de subtitulos, subtitulos con IA, traducir srt, traducir vtt, traducir ass, traductor de subtitulos gratis, traducir subtitulos online, subtitulos peliculas, subtitulos series, subtitulos doramas, subtitulos anime, subtitulos bilingües, subtitulos Netflix, subtitulos youtube, traducir subtitulos ingles a español,traducir subtítulos gratis,herramienta para traducir subtítulos gratis',
    ogTitle: 'AI-SRTSub - Cine y series del mundo, subtítulos en tu idioma',
    ogDesc: 'Traductor de subtítulos con IA gratis para cinéfilos: subtítulos de películas extranjeras, series y documentales en tu idioma materno en un clic, con alineación automática de tiempos. Contenido mundial sin barreras.',
    jsonldName: 'AI-SRTSub', jsonldAlt: '随心字幕 AI',
    jsonldDesc: 'Traductor de subtítulos con IA gratis para cinéfilos: subtítulos de películas extranjeras, series y documentales en tu idioma materno en un clic, con alineación automática de tiempos. Contenido mundial sin barreras.',
    currency: 'EUR',
    copy: '<section class="seo" aria-label="Sobre esta herramienta" style="max-width:1360px;margin:32px auto 0;padding:20px 24px 0;border-top:1px solid var(--line);color:var(--sub);font-size:13px;line-height:1.8;">\n    <h2 data-i18n="seoTitle" style="font-size:15px;color:var(--ink);margin:0 0 10px;font-weight:600;">Traductor de Subtítulos Automático Gratuito con IA</h2>\n    <p data-i18n-html="seoIntro">Esta es una <strong>herramienta online gratuita de traducción de subtítulos basada en grandes modelos de lenguaje (IA)</strong>. Sube archivos SRT, VTT o ASS y traduce subtítulos entre español, inglés, chino, japonés, coreano, francés y 15+ idiomas. Sin registro, sin instalación y sin marca de agua: ábrela en el navegador y empieza a traducir. Los datos de los subtítulos permanecen en tu navegador salvo que actives la traducción en la nube.</p>\n    <p data-i18n-html="seoFeatures" style="margin-top:8px;"><strong>Funciones principales:</strong> análisis de archivos SRT, VTT y ASS y traducción con IA, fusión inteligente de frases (cuando una frase abarca varios subtítulos, se fusionan, se traducen y se vuelven a repartir en la línea de tiempo original), alineación de línea de tiempo, ajuste de línea automático para texto CJK y occidental, eliminación de muletillas, gestión de términos propios y estilos de traducción seleccionables. Exporta archivos SRT, VTT, ASS o TXT estándar listos para incrustar en tu vídeo.</p>\n    <p data-i18n-html="seoWho" style="margin-top:8px;"><strong>Para quién es:</strong> traductores de vídeo, creadores de YouTube y localizadores, estudiantes de idiomas, grupos de subtítulos y equipos que necesitan localizar contenido de vídeo rápidamente.</p>\n  </section>\n  <noscript>\n    <p data-i18n="seoNoscript" style="max-width:1360px;margin:24px auto;padding:0 24px;color:#1C2E2B;">Esta herramienta necesita JavaScript. Actívalo en tu navegador y sube un archivo de subtítulos (SRT / VTT / ASS) para traducir subtítulos con IA gratis.</p>\n  </noscript>'
  },
  'pt': {
    htmlLang: 'pt', ogLocale: 'pt_BR', siteName: 'AI-SRTSub',
    title: 'AI-SRTSub - Filmes e séries do mundo, legendas no seu idioma',
    desc: 'ai-srtsub.com: tradutor de legendas com IA grátis e sem cadastro. Converta em um clique legendas de filmes e séries para seu idioma.',
    kw: 'tradutor de legendas, legendas com IA, traduzir srt, traduzir vtt, traduzir ass, tradutor de legendas grátis, traduzir legendas online, legendas de filmes, legendas de séries, legendas de doramas, legendas de anime, legendas bilíngues, legendas Netflix, legendas youtube, traduzir legendas inglês português,traduzir legendas de graça,site para traduzir legendas grátis',
    ogTitle: 'AI-SRTSub - Filmes e séries do mundo, legendas no seu idioma',
    ogDesc: 'Tradutor de legendas com IA grátis para fãs de cinema e séries: legendas de filmes estrangeiros, séries e documentários no seu idioma em um clique, com alinhamento automático de tempos.',
    jsonldName: 'AI-SRTSub', jsonldAlt: '随心字幕 AI',
    jsonldDesc: 'Tradutor de legendas com IA grátis para fãs de cinema e séries: legendas de filmes estrangeiros, séries e documentários no seu idioma em um clique, com alinhamento automático de tempos.',
    currency: 'BRL',
    copy: '<section class="seo" aria-label="Sobre esta ferramenta" style="max-width:1360px;margin:32px auto 0;padding:20px 24px 0;border-top:1px solid var(--line);color:var(--sub);font-size:13px;line-height:1.8;">\n    <h2 data-i18n="seoTitle" style="font-size:15px;color:var(--ink);margin:0 0 10px;font-weight:600;">Tradutor de Legendas Automático Gratuito com IA</h2>\n    <p data-i18n-html="seoIntro">Esta é uma <strong>ferramenta online gratuita de tradução de legendas baseada em grandes modelos de linguagem (IA)</strong>. Envie arquivos SRT, VTT ou ASS e traduza legendas entre português, inglês, espanhol, chinês, japonês, coreano e 15+ idiomas. Sem cadastro, sem instalação e sem marca d\u2019água: abra no navegador e comece a traduzir. Os dados das legendas ficam no seu navegador, exceto se você ativar a tradução na nuvem.</p>\n    <p data-i18n-html="seoFeatures" style="margin-top:8px;"><strong>Funções principais:</strong> análise de arquivos SRT, VTT e ASS e tradução com IA, fusão inteligente de frases (quando uma frase se espalha por várias legendas, elas são fundidas, traduzidas e redistribuídas na linha do tempo original), alinhamento de linha do tempo, quebra de linha automática para texto CJK e ocidental, remoção de vícios de fala, gestão de termos próprios e estilos de tradução selecionáveis. Exporte arquivos SRT, VTT, ASS ou TXT padrão prontos para embutir no seu vídeo.</p>\n    <p data-i18n-html="seoWho" style="margin-top:8px;"><strong>Para quem é:</strong> tradutores de vídeo, criadores de YouTube e localizadores, estudantes de idiomas, grupos de legendas e equipes que precisam localizar conteúdo de vídeo rapidamente.</p>\n  </section>\n  <noscript>\n    <p data-i18n="seoNoscript" style="max-width:1360px;margin:24px auto;padding:0 24px;color:#1C2E2B;">Esta ferramenta precisa de JavaScript. Ative-o no navegador e envie um arquivo de legendas (SRT / VTT / ASS) para traduzir legendas com IA de graça.</p>\n  </noscript>'
  },
  'ko': {
    htmlLang: 'ko', ogLocale: 'ko_KR', siteName: 'AI-SRTSub',
    title: 'AI-SRTSub - 세계 영화·드라마, 내 언어로 AI 자막 번역기',
    desc: 'ai-srtsub.com은 영화 팬을 위한 무료 AI 자막 번역기입니다. 해외 영화·미국/영국 드라마·다큐멘터리 자막을 원클릭으로 한국어로 번역하고 타임라인도 자동 정렬됩니다. 자막 찾아 해매는 대신, 언어의 장벽 없이 세계 콘텐츠를 마음껏 즐기세요.',
    kw: '자막 번역, AI 자막 번역, SRT 번역, VTT 번역, ASS 번역, 무료 자막 번역기, 온라인 자막 번역, 영화 자막, 드라마 자막, 미드 자막, 한드 자막, 애니 자막, 두 언어 자막, 유튜브 자막, 넷플릭스 자막,무료 자막 번역 사이트,자막 무료 번역',
    ogTitle: 'AI-SRTSub - 세계 영화·드라마를 내 언어 자막으로 즐기는 AI 자막 번역기',
    ogDesc: '영화 팬을 위한 무료 AI 자막 번역기: 해외 영화·드라마·다큐멘터리 자막을 원클릭 한국어 번역, 타임라인 자동 정렬. 언어 장벽 없이 세계 콘텐츠를.',
    jsonldName: 'AI-SRTSub', jsonldAlt: '随心字幕 AI',
    jsonldDesc: '영화 팬을 위한 무료 AI 자막 번역기: 해외 영화·드라마·다큐멘터리 자막을 원클릭 한국어 번역, 타임라인 자동 정렬. 언어 장벽 없이 세계 콘텐츠를.',
    currency: 'KRW',
    copy: '<section class="seo" aria-label="이 도구 소개" style="max-width:1360px;margin:32px auto 0;padding:20px 24px 0;border-top:1px solid var(--line);color:var(--sub);font-size:13px;line-height:1.8;">\n    <h2 data-i18n="seoTitle" style="font-size:15px;color:var(--ink);margin:0 0 10px;font-weight:600;">무료 AI 자동 자막 번역기</h2>\n    <p data-i18n-html="seoIntro">이 도구는 <strong>AI 대규모 언어 모델 기반 무료 온라인 SRT 자막 번역 서비스</strong>입니다. SRT / VTT / ASS 파일을 업로드하기만 하면 한국어·영어·중국어·일본어·스페인어 등 15개 이상 언어 간 자막 번역이 가능합니다. 가입 불필요, 설치 불필요, 워터마크 없음 — 브라우저에서 열고 바로 번역하세요. 클라우드 번역을 켜지 않는 한 자막 데이터는 서버로 전송되지 않습니다.</p>\n    <p data-i18n-html="seoFeatures" style="margin-top:8px;"><strong>주요 기능:</strong> SRT / VTT / ASS 파일 분석 및 AI 번역, 문장 단위 스마트 병합(하나의 문장이 여러 자막에 걸쳐 있을 때 병합하여 번역한 뒤 원래 타임라인에 따라 재분배), 타임라인 정렬, CJK·서구 문자 혼용 자동 줄바꿈, 필러 워드 제거, 고유명사 처리, 번역 스타일 선택. 표준 SRT / VTT / ASS / TXT 파일로 내보내 바로 영상에 삽입할 수 있습니다.</p>\n    <p data-i18n-html="seoWho" style="margin-top:8px;"><strong>이런 분들에게 유용합니다:</strong> 영상 번역 종사자, 유튜브 크리에이터, 외국어 학습자, 자막 팀, 영상 콘텐츠를 빠르게 현지화해야 하는 팀.</p>\n  </section>\n  <noscript>\n    <p data-i18n="seoNoscript" style="max-width:1360px;margin:24px auto;padding:0 24px;color:#1C2E2B;">이 도구를 사용하려면 JavaScript가 필요합니다. 브라우저에서 JavaScript를 활성화한 후 SRT / VTT / ASS 자막 파일을 업로드하여 AI 자막 번역을 무료로 이용해 보세요.</p>\n  </noscript>'
  },
  'de': {
    htmlLang: 'de', ogLocale: 'de_DE', siteName: 'AI-SRTSub',
    title: 'AI-SRTSub - Filme & Serien weltweit, Untertitel in deiner Sprache',
    desc: 'ai-srtsub.com ist ein kostenloser KI-Untertitel-Übersetzer für Filmfans — ohne Anmeldung. Übersetze Untertitel ausländischer Filme, Serien und Dokumentationen mit einem Klick in deine Sprache.',
    kw: 'untertitel übersetzen, KI Untertitel, SRT übersetzen, VTT übersetzen, ASS übersetzen, Untertitel Übersetzer kostenlos, Untertitel online übersetzen, Film Untertitel, Serien Untertitel, Anime Untertitel, zweisprachige Untertitel, YouTube Untertitel, Netflix Untertitel, Untertitel Englisch Deutsch,Untertitel kostenlos online übersetzen,kostenloser Untertitelübersetzer',
    ogTitle: 'AI-SRTSub - Filme & Serien weltweit, Untertitel in deiner Sprache',
    ogDesc: 'Kostenloser KI-Untertitel-Übersetzer für Filmfans: Untertitel ausländischer Filme, Serien und Dokumentationen mit einem Klick in deiner Sprache, mit automatischer Zeitleisten-Ausrichtung.',
    jsonldName: 'AI-SRTSub', jsonldAlt: '随心字幕 AI',
    jsonldDesc: 'Kostenloser KI-Untertitel-Übersetzer für Filmfans: Untertitel ausländischer Filme, Serien und Dokumentationen mit einem Klick in deiner Sprache, mit automatischer Zeitleisten-Ausrichtung.',
    currency: 'EUR',
    copy: '<section class="seo" aria-label="Über dieses Tool" style="max-width:1360px;margin:32px auto 0;padding:20px 24px 0;border-top:1px solid var(--line);color:var(--sub);font-size:13px;line-height:1.8;">\n    <h2 data-i18n="seoTitle" style="font-size:15px;color:var(--ink);margin:0 0 10px;font-weight:600;">Kostenloser KI-Untertitel-Autoübersetzer</h2>\n    <p data-i18n-html="seoIntro">Dies ist ein <strong>kostenloses Online-Tool zur Untertitel-Übersetzung auf Basis großer Sprachmodelle (KI)</strong>. Laden Sie SRT-, VTT- oder ASS-Dateien hoch und übersetzen Sie Untertitel zwischen Deutsch, Englisch, Chinesisch, Japanisch, Koreanisch, Spanisch und 15+ weiteren Sprachen. Keine Anmeldung, keine Installation, kein Wasserzeichen — im Browser öffnen und loslegen. Untertiteldaten bleiben in Ihrem Browser, sofern Sie die Cloud-Übersetzung nicht aktivieren.</p>\n    <p data-i18n-html="seoFeatures" style="margin-top:8px;"><strong>Hauptfunktionen:</strong> SRT-, VTT- und ASS-Analyse und KI-Übersetzung, intelligente Satz-Zusammenführung (wenn ein Satz über mehrere Untertitel verteilt ist, werden sie zusammengeführt, übersetzt und wieder auf die Original-Zeitleiste verteilt), Zeitleisten-Ausrichtung, automatischer Zeilenumbruch für CJK- und westliche Texte, Füllwort-Entfernung, Verwaltung von Eigennamen und wählbare Übersetzungsstile. Export als Standard-SRT-, VTT-, ASS- oder TXT-Datei, bereit zum Einbrennen in Ihr Video.</p>\n    <p data-i18n-html="seoWho" style="margin-top:8px;"><strong>Für wen:</strong> Video-Übersetzer, YouTube-Creator und Localizer, Sprachlernende, Untertitel-Teams und alle, die Videoinhalte schnell lokalisieren müssen.</p>\n  </section>\n  <noscript>\n    <p data-i18n="seoNoscript" style="max-width:1360px;margin:24px auto;padding:0 24px;color:#1C2E2B;">Dieses Tool benötigt JavaScript. Bitte aktivieren Sie JavaScript im Browser und laden Sie dann eine Untertiteldatei (SRT / VTT / ASS) hoch, um Untertitel kostenlos mit KI zu übersetzen.</p>\n  </noscript>'
  },
  'fr': {
    htmlLang: 'fr', ogLocale: 'fr_FR', siteName: 'AI-SRTSub',
    title: 'AI-SRTSub - Films et séries du monde, sous-titres dans votre langue',
    desc: "Traducteur de sous-titres IA gratuit — sans inscription. Traduisez en un clic les sous-titres de films étrangers, séries et documentaires dans votre langue.",
    kw: 'traduire sous-titres, sous-titres IA, traduction srt, traduction vtt, traduction ass, traducteur sous-titres gratuit, traduire sous-titres en ligne, sous-titres films, sous-titres séries, sous-titres dramas, sous-titres anime, sous-titres bilingues, sous-titres youtube, sous-titres Netflix, traduire sous-titres anglais français,outil traduction sous-titres gratuit,traduire des sous-titres gratuitement',
    ogTitle: 'AI-SRTSub - Films et séries du monde, sous-titres dans votre langue',
    ogDesc: 'Traducteur de sous-titres IA gratuit pour cinéphiles : sous-titres de films étrangers, de séries et de documentaires dans votre langue maternelle en un clic, avec alignement automatique de la timeline.',
    jsonldName: 'AI-SRTSub', jsonldAlt: '随心字幕 AI',
    jsonldDesc: 'Traducteur de sous-titres IA gratuit pour cinéphiles : sous-titres de films étrangers, de séries et de documentaires dans votre langue maternelle en un clic, avec alignement automatique de la timeline.',
    currency: 'EUR',
    copy: '<section class="seo" aria-label="À propos de cet outil" style="max-width:1360px;margin:32px auto 0;padding:20px 24px 0;border-top:1px solid var(--line);color:var(--sub);font-size:13px;line-height:1.8;">\n    <h2 data-i18n="seoTitle" style="font-size:15px;color:var(--ink);margin:0 0 10px;font-weight:600;">Traducteur de Sous-titres Automatique Gratuit par IA</h2>\n    <p data-i18n-html="seoIntro">Voici un <strong>outil en ligne gratuit de traduction de sous-titres basé sur de grands modèles de langage (IA)</strong>. Importez des fichiers SRT, VTT ou ASS et traduisez des sous-titres entre le français, l\u2019anglais, le chinois, le japonais, le coréen, l\u2019espagnol et 15+ autres langues. Sans inscription, sans installation et sans filigrane — ouvrez-le dans le navigateur et commencez à traduire. Les données des sous-titres restent dans votre navigateur, sauf si vous activez la traduction cloud.</p>\n    <p data-i18n-html="seoFeatures" style="margin-top:8px;"><strong>Fonctions principales :</strong> analyse de fichiers SRT, VTT et ASS et traduction par IA, fusion intelligente de phrases (quand une phrase s\u2019étale sur plusieurs sous-titres, ils sont fusionnés, traduits puis répartis sur la timeline d\u2019origine), alignement de la timeline, retour à la ligne automatique pour textes CJK et occidentaux, suppression des tics de langage, gestion des noms propres et styles de traduction au choix. Exportez des fichiers SRT, VTT, ASS ou TXT standard prêts à incruster dans votre vidéo.</p>\n    <p data-i18n-html="seoWho" style="margin-top:8px;"><strong>Pour qui :</strong> traducteurs vidéo, créateurs YouTube et localisateurs, apprenants en langues, équipes de sous-titres et équipes qui doivent localiser rapidement du contenu vidéo.</p>\n  </section>\n  <noscript>\n    <p data-i18n="seoNoscript" style="max-width:1360px;margin:24px auto;padding:0 24px;color:#1C2E2B;">Cet outil nécessite JavaScript. Activez-le dans votre navigateur, puis importez un fichier de sous-titres (SRT / VTT / ASS) pour traduire des sous-titres gratuitement avec l\u2019IA.</p>\n  </noscript>'
  },
  'id': {
    htmlLang: 'id', ogLocale: 'id_ID', siteName: 'AI-SRTSub',
    title: 'AI-SRTSub - Film & drama dunia, subtitle dalam bahasa Anda',
    desc: 'ai-srtsub.com: penerjemah subtitle AI gratis tanpa daftar. Ubah subtitle film, serial, dokumenter ke bahasa Anda, penyelarasan timeline otomatis.',
    kw: 'terjemah subtitle, subtitle AI, terjemahkan srt, terjemahkan vtt, terjemahkan ass, penerjemah subtitle gratis, terjemahkan subtitle online, subtitle film, subtitle drama, subtitle drakor, subtitle anime, subtitle dua bahasa, subtitle youtube, subtitle Netflix,translate subtitle gratis,web translate subtitle gratis',
    ogTitle: 'AI-SRTSub - Film & drama dunia, subtitle dalam bahasa Anda',
    ogDesc: 'Penerjemah subtitle AI gratis untuk penikmat film: subtitle film luar negeri, serial, dan dokumenter dalam bahasa Anda dalam satu klik, dengan penyelarasan timeline otomatis.',
    jsonldName: 'AI-SRTSub', jsonldAlt: '随心字幕 AI',
    jsonldDesc: 'Penerjemah subtitle AI gratis untuk penikmat film: subtitle film luar negeri, serial, dan dokumenter dalam bahasa Anda dalam satu klik, dengan penyelarasan timeline otomatis.',
    currency: 'IDR',
    copy: '<section class="seo" aria-label="Tentang alat ini" style="max-width:1360px;margin:32px auto 0;padding:20px 24px 0;border-top:1px solid var(--line);color:var(--sub);font-size:13px;line-height:1.8;">\n    <h2 data-i18n="seoTitle" style="font-size:15px;color:var(--ink);margin:0 0 10px;font-weight:600;">Penerjemah Subtitle Otomatis Gratis dengan AI</h2>\n    <p data-i18n-html="seoIntro">Ini adalah <strong>alat penerjemahan subtitle online gratis berbasis model bahasa besar (AI)</strong>. Unggah file SRT, VTT, atau ASS dan terjemahkan subtitle antara bahasa Indonesia, Inggris, Spanyol, Mandarin, Jepang, Korea, dan 15+ bahasa lainnya. Tanpa daftar, tanpa instalasi, tanpa watermark — buka di browser dan langsung terjemahkan. Data subtitle tetap di browser Anda kecuali Anda mengaktifkan terjemahan cloud.</p>\n    <p data-i18n-html="seoFeatures" style="margin-top:8px;"><strong>Fitur utama:</strong> parsing file SRT, VTT, dan ASS serta terjemahan AI, penggabungan kalimat cerdas (saat satu kalimat terbagi ke beberapa subtitle, semuanya digabung, diterjemahkan, lalu dibagi ulang sesuai timeline asli), penyelarasan timeline, pembungkusan baris otomatis untuk teks CJK dan Barat, penghapusan kata pengisi, pengelolaan istilah khusus, dan pilihan gaya terjemahan. Ekspor file SRT, VTT, ASS, atau TXT standar yang siap ditanam ke video Anda.</p>\n    <p data-i18n-html="seoWho" style="margin-top:8px;"><strong>Untuk siapa:</strong> penerjemah video, kreator YouTube, pelajar bahasa, tim subtitle, dan tim yang perlu melokalkan konten video dengan cepat.</p>\n  </section>\n  <noscript>\n    <p data-i18n="seoNoscript" style="max-width:1360px;margin:24px auto;padding:0 24px;color:#1C2E2B;">Alat ini membutuhkan JavaScript. Aktifkan JavaScript di browser Anda, lalu unggah file subtitle (SRT / VTT / ASS) untuk menerjemahkan subtitle dengan AI secara gratis.</p>\n  </noscript>'
  },
  'hi': {
    htmlLang: 'hi', ogLocale: 'hi_IN', siteName: 'AI-SRTSub',
    title: 'AI-SRTSub - दुनिया की फ़िल्में और सीरीज़, सबटाइटल आपकी भाषा में',
    desc: 'ai-srtsub.com फ़िल्म प्रेमियों के लिए बना मुफ़्त AI सबटाइटल अनुवादक है — बिना रजिस्ट्रेशन। विदेशी फ़िल्मों, अमेरिकी-ब्रिटिश सीरीज़ और डॉक्यूमेंट्री के सबटाइटल एक क्लिक में अपनी भाषा में पाएँ।',
    kw: 'सबटाइटल अनुवाद, AI सबटाइटल, SRT अनुवाद, VTT अनुवाद, ASS अनुवाद, मुफ़्त सबटाइटल अनुवादक, ऑनलाइन सबटाइटल अनुवाद, फ़िल्म सबटाइटल, सीरीज़ सबटाइटल, एनीमे सबटाइटल, द्विभाषी सबटाइटल, यूट्यूब सबटाइटल, नेटफ्लिक्स सबटाइटल, वीडियो अनुवाद,मुफ़्त में सबटाइटल अनुवाद,सबटाइटल अनुवादक मुफ़्त',
    ogTitle: 'AI-SRTSub - दुनिया की फ़िल्में और सीरीज़, सबटाइटल आपकी भाषा में',
    ogDesc: 'फ़िल्म प्रेमियों के लिए मुफ़्त AI सबटाइटल अनुवादक: विदेशी फ़िल्मों, सीरीज़ और डॉक्यूमेंट्री के सबटाइटल एक क्लिक में अपनी भाषा में, टाइमलाइन ऑटो संरेखण के साथ।',
    jsonldName: 'AI-SRTSub', jsonldAlt: '随心字幕 AI',
    jsonldDesc: 'फ़िल्म प्रेमियों के लिए मुफ़्त AI सबटाइटल अनुवादक: विदेशी फ़िल्मों, सीरीज़ और डॉक्यूमेंट्री के सबटाइटल एक क्लिक में अपनी भाषा में, टाइमलाइन ऑटो संरेखण के साथ।',
    currency: 'INR',
    copy: '<section class="seo" aria-label="इस टूल के बारे में" style="max-width:1360px;margin:32px auto 0;padding:20px 24px 0;border-top:1px solid var(--line);color:var(--sub);font-size:13px;line-height:1.8;">\n    <h2 data-i18n="seoTitle" style="font-size:15px;color:var(--ink);margin:0 0 10px;font-weight:600;">मुफ़्त AI स्वचालित सबटाइटल अनुवादक</h2>\n    <p data-i18n-html="seoIntro">यह <strong>बड़े भाषा मॉडल (AI) पर आधारित मुफ़्त ऑनलाइन SRT सबटाइटल अनुवाद सेवा</strong> है। SRT, VTT या ASS फ़ाइल अपलोड करें और हिंदी, अंग्रेज़ी, चीनी, जापानी, कोरियाई, स्पेनिश सहित 15+ भाषाओं के बीच सबटाइटल का अनुवाद करें। साइनअप नहीं, इंस्टॉल नहीं, वॉटरमार्क नहीं — ब्राउज़र में खोलें और अनुवाद शुरू करें। जब तक आप क्लाउड अनुवाद सक्रिय न करें, सबटाइटल डेटा आपके ब्राउज़र में ही रहता है।</p>\n    <p data-i18n-html="seoFeatures" style="margin-top:8px;"><strong>मुख्य सुविधाएँ:</strong> SRT, VTT और ASS फ़ाइल पार्सिंग और AI अनुवाद, स्मार्ट वाक्य-विलय (जब एक वाक्य कई सबटाइटलों में बँटा हो, तो उन्हें जोड़कर अनुवाद कर मूल टाइमलाइन पर फिर बाँटा जाता है), टाइमलाइन संरेखण, CJK और पश्चिमी टेक्स्ट के लिए स्वचालित लाइन-रैप, फिलर-शब्द हटाना, संज्ञा-प्रबंधन और चुनने योग्य अनुवाद शैलियाँ। मानक SRT, VTT, ASS या TXT फ़ाइल एक्सपोर्ट करें, जो सीधे आपके वीडियो में जोड़ी जा सकती है।</p>\n    <p data-i18n-html="seoWho" style="margin-top:8px;"><strong>किसके लिए:</strong> वीडियो अनुवादक, YouTube क्रिएटर, भाषा सीखने वाले, सबटाइटल टीमें और वे टीमें जिन्हें वीडियो सामग्री जल्दी स्थानीयकृत करनी है।</p>\n  </section>\n  <noscript>\n    <p data-i18n="seoNoscript" style="max-width:1360px;margin:24px auto;padding:0 24px;color:#1C2E2B;">इस टूल के लिए JavaScript आवश्यक है। ब्राउज़र में JavaScript सक्रिय करें, फिर SRT / VTT / ASS सबटाइटल फ़ाइल अपलोड करके AI से मुफ़्त सबटाइटल अनुवाद कराएँ।</p>\n  </noscript>'
  },
  'th': {
    htmlLang: 'th', ogLocale: 'th_TH', siteName: 'AI-SRTSub',
    title: 'AI-SRTSub - หนังและซีรีส์จากทั่วโลก ซับในภาษาของคุณ',
    desc: 'ai-srtsub.com เครื่องมือแปลซับไตเติลด้วย AI ฟรี ไม่ต้องสมัคร แปลซับหนังต่างประเทศ ซีรีส์ สารคดีเป็นภาษาของคุณในคลิกเดียว พร้อมจัดไทม์ไลน์อัตโนมัติ',
    kw: 'แปลซับไตเติล, ซับไตเติล AI, แปล srt, แปล vtt, แปล ass, ตัวแปลซับฟรี, แปลซับออนไลน์, ซับหนัง, ซับซีรีส์, ซับอนิเมะ, ซับสองภาษา, ซับยูทูป, ซับเน็ตฟลิก, ซับฝรั่ง,เว็บแปลซับฟรี,แปลซับฟรีออนไลน์',
    ogTitle: 'AI-SRTSub - หนังและซีรีส์จากทั่วโลก ซับในภาษาของคุณ',
    ogDesc: 'เครื่องมือแปลซับไตเติลด้วย AI ฟรี สำหรับสายหนัง: แปลซับหนังต่างประเทศ ซีรีส์ และสารคดีเป็นภาษาของคุณในคลิกเดียว พร้อมจัดแนวไทม์ไลน์อัตโนมัติ',
    jsonldName: 'AI-SRTSub', jsonldAlt: '随心字幕 AI',
    jsonldDesc: 'เครื่องมือแปลซับไตเติลด้วย AI ฟรี สำหรับสายหนัง: แปลซับหนังต่างประเทศ ซีรีส์ และสารคดีเป็นภาษาของคุณในคลิกเดียว พร้อมจัดแนวไทม์ไลน์อัตโนมัติ',
    currency: 'THB',
    copy: '<section class="seo" aria-label="เกี่ยวกับเครื่องมือนี้" style="max-width:1360px;margin:32px auto 0;padding:20px 24px 0;border-top:1px solid var(--line);color:var(--sub);font-size:13px;line-height:1.8;">\n    <h2 data-i18n="seoTitle" style="font-size:15px;color:var(--ink);margin:0 0 10px;font-weight:600;">ตัวแปลซับไตเติลอัตโนมัติฟรีด้วย AI</h2>\n    <p data-i18n-html="seoIntro">นี่คือ<strong>บริการแปลซับไตเติล SRT ออนไลน์ฟรีที่ขับเคลื่อนด้วยโมเดลภาษาขนาดใหญ่ (AI)</strong> อัปโหลดไฟล์ SRT, VTT หรือ ASS แล้วแปลซับไตเติลระหว่างภาษาไทย อังกฤษ จีน ญี่ปุ่น เกาหลี สเปน และอีก 15+ ภาษา ไม่ต้องสมัคร ไม่ต้องติดตั้ง ไม่มีลายน้ำ เปิดในเบราว์เซอร์แล้วแปลได้เลย ข้อมูลซับไตเติลจะอยู่ในเบราว์เซอร์ของคุณ เว้นแต่คุณจะเปิดใช้การแปลผ่านคลาวด์</p>\n    <p data-i18n-html="seoFeatures" style="margin-top:8px;"><strong>ฟีเจอร์หลัก:</strong> แยกไฟล์ SRT, VTT และ ASS แล้วแปลด้วย AI, รวมประโยคอัจฉริยะ (เมื่อประโยคหนึ่งกระจายอยู่หลายซับ ระบบจะรวม แปล แล้วแบ่งกลับตามไทม์ไลน์เดิม), จัดแนวไทม์ไลน์, ตัดบรรทัดอัตโนมัติสำหรับข้อความ CJK และตะวันตก, ลบคำไร้สาระ, จัดการคำเฉพาะ และเลือกสไตล์การแปลได้ ส่งออกไฟล์ SRT, VTT, ASS หรือ TXT มาตรฐานพร้อมใส่ในวิดีโอของคุณทันที</p>\n    <p data-i18n-html="seoWho" style="margin-top:8px;"><strong>เหมาะสำหรับ:</strong> นักแปลวิดีโอ ครีเอเตอร์ YouTube ผู้เรียนภาษา ทีมซับไตเติล และทีมที่ต้องการแปลเนื้อหาวิดีโอให้เป็นภาษาท้องถิ่นอย่างรวดเร็ว</p>\n  </section>\n  <noscript>\n    <p data-i18n="seoNoscript" style="max-width:1360px;margin:24px auto;padding:0 24px;color:#1C2E2B;">เครื่องมือนี้ต้องใช้ JavaScript โปรดเปิดใช้ JavaScript ในเบราว์เซอร์ แล้วอัปโหลดไฟล์ซับไตเติล (SRT / VTT / ASS) เพื่อแปลซับไตเติลด้วย AI ฟรี</p>\n  </noscript>'
  },
  'vi': {
    htmlLang: 'vi', ogLocale: 'vi_VN', siteName: 'AI-SRTSub',
    title: 'AI-SRTSub - Phim và series thế giới, phụ đề bằng ngôn ngữ của bạn',
    desc: 'ai-srtsub.com là công cụ dịch phụ đề AI miễn phí dành cho người yêu phim — không cần đăng ký. Chuyển phụ đề phim nước ngoài, phim Mỹ - Anh và phim tài liệu thành ngôn ngữ của bạn trong một cú nhấp.',
    kw: 'dịch phụ đề, phụ đề AI, dịch srt, dịch vtt, dịch ass, trình dịch phụ đề miễn phí, dịch phụ đề online, phụ đề phim, phụ đề phim bộ, phụ đề anime, phụ đề song ngữ, phụ đề youtube, phụ đề Netflix, dịch phụ đề tiếng Anh,web dịch phụ đề miễn phí,tool dịch phụ đề miễn phí',
    ogTitle: 'AI-SRTSub - Phim và series thế giới, phụ đề bằng ngôn ngữ của bạn',
    ogDesc: 'Công cụ dịch phụ đề AI miễn phí cho người yêu phim: phụ đề phim nước ngoài, series và phim tài liệu bằng ngôn ngữ của bạn trong một cú nhấp, tự động căn chỉnh timeline.',
    jsonldName: 'AI-SRTSub', jsonldAlt: '随心字幕 AI',
    jsonldDesc: 'Công cụ dịch phụ đề AI miễn phí cho người yêu phim: phụ đề phim nước ngoài, series và phim tài liệu bằng ngôn ngữ của bạn trong một cú nhấp, tự động căn chỉnh timeline.',
    currency: 'VND',
    copy: '<section class="seo" aria-label="Về công cụ này" style="max-width:1360px;margin:32px auto 0;padding:20px 24px 0;border-top:1px solid var(--line);color:var(--sub);font-size:13px;line-height:1.8;">\n    <h2 data-i18n="seoTitle" style="font-size:15px;color:var(--ink);margin:0 0 10px;font-weight:600;">Trình Dịch Phụ đề Tự động Miễn phí bằng AI</h2>\n    <p data-i18n-html="seoIntro">Đây là <strong>công cụ dịch phụ đề online miễn phí dựa trên mô hình ngôn ngữ lớn (AI)</strong>. Tải lên file SRT, VTT hoặc ASS và dịch phụ đề giữa tiếng Việt, Anh, Trung, Nhật, Hàn, Tây Ban Nha và 15+ ngôn ngữ khác. Không cần đăng ký, không cài đặt, không watermark — mở bằng trình duyệt và bắt đầu dịch. Dữ liệu phụ đề luôn nằm trong trình duyệt của bạn trừ khi bạn bật dịch qua cloud.</p>\n    <p data-i18n-html="seoFeatures" style="margin-top:8px;"><strong>Tính năng chính:</strong> phân tích file SRT, VTT và ASS rồi dịch bằng AI, gộp câu thông minh (khi một câu trải dài qua nhiều phụ đề, chúng được gộp lại, dịch, rồi chia về đúng timeline gốc), căn chỉnh timeline, ngắt dòng tự động cho văn bản CJK và phương Tây, loại từ đệm, quản lý thuật ngữ riêng và chọn phong cách dịch. Xuất file SRT, VTT, ASS hoặc TXT chuẩn, sẵn sàng nhúng vào video của bạn.</p>\n    <p data-i18n-html="seoWho" style="margin-top:8px;"><strong>Dành cho ai:</strong> người dịch video, nhà sáng tạo YouTube, người học ngoại ngữ, nhóm làm phụ đề và các đội ngũ cần bản địa hóa nội dung video nhanh chóng.</p>\n  </section>\n  <noscript>\n    <p data-i18n="seoNoscript" style="max-width:1360px;margin:24px auto;padding:0 24px;color:#1C2E2B;">Công cụ này cần JavaScript. Hãy bật JavaScript trong trình duyệt, sau đó tải lên file phụ đề (SRT / VTT / ASS) để dịch phụ đề miễn phí bằng AI.</p>\n  </noscript>'
  },
  'ru': {
    htmlLang: 'ru', ogLocale: 'ru_RU', siteName: 'AI-SRTSub',
    title: 'AI-SRTSub — Фильмы и сериалы с субтитрами на вашем языке',
    desc: 'ai-srtsub.com — бесплатный ИИ-переводчик субтитров без регистрации. Переводите субтитры зарубежных фильмов и сериалов на родной язык в один клик.',
    kw: 'перевод субтитров, субтитры ИИ, перевести srt, перевести vtt, перевести ass, бесплатный переводчик субтитров, перевести субтитры онлайн, субтитры для фильмов, субтитры для сериалов, субтитры аниме, двуязычные субтитры, субтитры youtube, субтитры Netflix, перевести субтитры с английского,перевести субтитры бесплатно,бесплатный перевод субтитров онлайн',
    ogTitle: 'AI-SRTSub - Фильмы и сериалы всего мира с субтитрами на вашем языке',
    ogDesc: 'Бесплатный ИИ-переводчик субтитров для киноманов: субтитры зарубежных фильмов, сериалов и документалок на родном языке в один клик, с автоматическим выравниванием таймлайна.',
    jsonldName: 'AI-SRTSub', jsonldAlt: '随心字幕 AI',
    jsonldDesc: 'Бесплатный ИИ-переводчик субтитров для киноманов: субтитры зарубежных фильмов, сериалов и документалок на родном языке в один клик, с автоматическим выравниванием таймлайна.',
    currency: 'RUB',
    copy: '<section class="seo" aria-label="Об этом инструменте" style="max-width:1360px;margin:32px auto 0;padding:20px 24px 0;border-top:1px solid var(--line);color:var(--sub);font-size:13px;line-height:1.8;">\n    <h2 data-i18n="seoTitle" style="font-size:15px;color:var(--ink);margin:0 0 10px;font-weight:600;">Бесплатный автоматический ИИ-переводчик субтитров</h2>\n    <p data-i18n-html="seoIntro">Это <strong>бесплатный онлайн-инструмент перевода субтитров на базе больших языковых моделей (ИИ)</strong>. Загрузите файлы SRT, VTT или ASS и переводите субтитры между русским, английским, китайским, японским, корейским, испанским и 15+ другими языками. Без регистрации, без установки и без водяных знаков — откройте в браузере и начинайте переводить. Данные субтитров остаются в вашем браузере, если вы не включите облачный перевод.</p>\n    <p data-i18n-html="seoFeatures" style="margin-top:8px;"><strong>Основные функции:</strong> разбор файлов SRT, VTT и ASS и ИИ-перевод, умное объединение предложений (когда одно предложение разбросано по нескольким субтитрам, они объединяются, переводятся и распределяются обратно по исходному таймлайну), выравнивание таймлайна, автоматический перенос строк для CJK и западного текста, удаление слов-паразитов, управление именами собственными и выбор стиля перевода. Экспорт стандартных файлов SRT, VTT, ASS или TXT, готовых к вшиванию в ваше видео.</p>\n    <p data-i18n-html="seoWho" style="margin-top:8px;"><strong>Для кого:</strong> переводчики видео, YouTube-авторы и локализаторы, изучающие языки, команды субтитров и коллективы, которым нужно быстро локализовать видеоконтент.</p>\n  </section>\n  <noscript>\n    <p data-i18n="seoNoscript" style="max-width:1360px;margin:24px auto;padding:0 24px;color:#1C2E2B;">Для работы инструмента нужен JavaScript. Включите JavaScript в браузере, затем загрузите файл субтитров (SRT / VTT / ASS), чтобы бесплатно перевести субтитры с помощью ИИ.</p>\n  </noscript>'
  },
  'it': {
    htmlLang: 'it', ogLocale: 'it_IT', siteName: 'AI-SRTSub',
    title: 'AI-SRTSub - Film e serie, sottotitoli nella tua lingua',
    desc: 'ai-srtsub.com: traduttore di sottotitoli IA gratuito, senza registrazione. Traduci i sottotitoli di film, serie e documentari nella tua lingua.',
    kw: 'traduttore sottotitoli, sottotitoli IA, tradurre srt, tradurre vtt, tradurre ass, traduttore sottotitoli gratis, tradurre sottotitoli online, sottotitoli film, sottotitoli serie, sottotitoli anime, sottotitoli bilingue, sottotitoli youtube, sottotitoli Netflix, tradurre sottotitoli inglese italiano,tradurre sottotitoli gratis online,strumento traduzione sottotitoli gratuito',
    ogTitle: 'AI-SRTSub - Film e serie del mondo, sottotitoli nella tua lingua',
    ogDesc: 'Traduttore di sottotitoli IA gratuito per cinefili: sottotitoli di film stranieri, serie e documentari nella tua lingua madre in un clic, con allineamento automatico della timeline.',
    jsonldName: 'AI-SRTSub', jsonldAlt: '随心字幕 AI',
    jsonldDesc: 'Traduttore di sottotitoli IA gratuito per cinefili: sottotitoli di film stranieri, serie e documentari nella tua lingua madre in un clic, con allineamento automatico della timeline.',
    currency: 'EUR',
    copy: '<section class="seo" aria-label="Informazioni su questo strumento" style="max-width:1360px;margin:32px auto 0;padding:20px 24px 0;border-top:1px solid var(--line);color:var(--sub);font-size:13px;line-height:1.8;">\n    <h2 data-i18n="seoTitle" style="font-size:15px;color:var(--ink);margin:0 0 10px;font-weight:600;">Traduttore Automatico di Sottotitoli Gratuito con IA</h2>\n    <p data-i18n-html="seoIntro">Questo è uno <strong>strumento online gratuito di traduzione di sottotitoli basato su grandi modelli linguistici (IA)</strong>. Carica file SRT, VTT o ASS e traduci sottotitoli tra italiano, inglese, cinese, giapponese, coreano, spagnolo e 20+ altre lingue. Senza registrazione, senza installazione e senza watermark: aprilo nel browser e inizia a tradurre. I dati dei sottotitoli restano nel tuo browser a meno che tu non attivi la traduzione cloud.</p>\n    <p data-i18n-html="seoFeatures" style="margin-top:8px;"><strong>Funzioni principali:</strong> analisi di file SRT, VTT e ASS e traduzione con IA, fusione intelligente di frasi (quando una frase si estende su più sottotitoli, vengono fusi, tradotti e ridistribuiti sulla timeline originale), allineamento della timeline, ritorno a capo automatico per testo CJK e occidentale, rimozione dei riempitivi, gestione dei nomi propri e stili di traduzione selezionabili. Esporta file SRT, VTT, ASS o TXT standard pronti da incidere nel tuo video.</p>\n    <p data-i18n-html="seoWho" style="margin-top:8px;"><strong>A chi si rivolge:</strong> traduttori video, creator e localizzatori YouTube, studenti di lingue, gruppi di sottotitoli e team che devono localizzare contenuti video rapidamente.</p>\n  </section>\n  <noscript>\n    <p data-i18n="seoNoscript" style="max-width:1360px;margin:24px auto;padding:0 24px;color:#1C2E2B;">Questo strumento richiede JavaScript. Abilitalo nel browser, poi carica un file di sottotitoli (SRT / VTT / ASS) per tradurre sottotitoli gratuitamente con l\u2019IA.</p>\n  </noscript>'
  },
  'ar': {
    htmlLang: 'ar', ogLocale: 'ar_AR', siteName: 'AI-SRTSub',
    title: 'AI-SRTSub - أفلام ومسلسلات من العالم بترجمات بلغتك',
    desc: 'ai-srtsub.com أداة مجانية لترجمة ترجمات الأفلام والمسلسلات بالذكاء الاصطناعي في نقرة واحدة، مع محاذاة تلقائية للخط الزمني ودون تسجيل.',
    kw: 'ترجمة ترجمات, ترجمات بالذكاء الاصطناعي, ترجمة srt, ترجمة vtt, ترجمة ass, مترجم ترجمات مجاني, ترجمة الترجمات اونلاين, ترجمات افلام, ترجمات مسلسلات, ترجمات انمي, ترجمات ثنائية اللغة, ترجمات يوتيوب, ترجمات نتفلكس, ترجمة من الانجليزية,ترجمة الترجمات مجانا,موقع ترجمة ترجمات مجاني',
    ogTitle: 'AI-SRTSub - أفلام ومسلسلات من العالم بترجمات بلغتك',
    ogDesc: 'أداة مجانية لترجمة الترجمات بالذكاء الاصطناعي لعشاق الأفلام: ترجمات الأفلام الأجنبية والمسلسلات والوثائقيات بلغتك في نقرة واحدة، مع محاذاة تلقائية للخط الزمني.',
    jsonldName: 'AI-SRTSub', jsonldAlt: '随心字幕 AI',
    jsonldDesc: 'أداة مجانية لترجمة الترجمات بالذكاء الاصطناعي لعشاق الأفلام: ترجمات الأفلام الأجنبية والمسلسلات والوثائقيات بلغتك في نقرة واحدة، مع محاذاة تلقائية للخط الزمني.',
    currency: 'USD',
    copy: '<section class="seo" dir="rtl" aria-label="عن هذه الأداة" style="max-width:1360px;margin:32px auto 0;padding:20px 24px 0;border-top:1px solid var(--line);color:var(--sub);font-size:13px;line-height:1.8;">\n    <h2 data-i18n="seoTitle" style="font-size:15px;color:var(--ink);margin:0 0 10px;font-weight:600;">مترجم ترجمات تلقائي مجاني بالذكاء الاصطناعي</h2>\n    <p data-i18n-html="seoIntro">هذه <strong>أداة online مجانية لترجمة الترجمات تعمل بالنماذج اللغوية الكبيرة (الذكاء الاصطناعي)</strong>. ارفع ملفات SRT أو VTT أو ASS وترجم الترجمات بين العربية والإنجليزية والصينية واليابانية والكورية والإسبانية وأكثر من 20 لغة أخرى. بلا تسجيل وبلا تثبيت وبلا علامة مائية — افتحها في المتصفح وابدأ الترجمة. تبقى بيانات الترجمات في متصفحك ما لم تُفعّل الترجمة السحابية.</p>\n    <p data-i18n-html="seoFeatures" style="margin-top:8px;"><strong>الوظائف الرئيسية:</strong> تحليل ملفات SRT وVTT وASS وترجمتها بالذكاء الاصطناعي، الدمج الذكي للجمل (عندما تمتد جملة عبر ترجمات متعددة تُدمج وتُترجم ثم تُوزَّع على الخط الزمني الأصلي)، محاذاة الخط الزمني، التفاف تلقائي للأسطر لنصوص CJK والغربية، إزالة الحشو اللفظي، إدارة الأسماء الخاصة، واختيار أسلوب الترجمة. صدّر ملفات SRT أو VTT أو ASS أو TXT قياسية جاهزة للتضمين في الفيديو.</p>\n    <p data-i18n-html="seoWho" style="margin-top:8px;"><strong>لمن هذه الأداة:</strong> مترجمو الفيديو، صنّاع محتوى YouTube والمترجمون المحليون، متعلمو اللغات، فرق الترجمة، والفرق التي تحتاج إلى توطين محتوى الفيديو بسرعة.</p>\n  </section>\n  <noscript>\n    <p data-i18n="seoNoscript" style="max-width:1360px;margin:24px auto;padding:0 24px;color:#1C2E2B;">تتطلب هذه الأداة JavaScript. فعّلها في المتصفح ثم ارفع ملف ترجمات (SRT / VTT / ASS) لترجمة الترجمات مجانًا بالذكاء الاصطناعي.</p>\n  </noscript>'
  },
  'tr': {
    htmlLang: 'tr', ogLocale: 'tr_TR', siteName: 'AI-SRTSub',
    title: 'AI-SRTSub - Dünyanın film ve dizileri, altyazı senin dilinde',
    desc: 'ai-srtsub.com ücretsiz AI altyazı çevirmenidir; kayıt gerektirmez. Altyazıları tek tıkla ana diline çevir, zaman çizgisi otomatik hizalanır.',
    kw: 'altyazı çevir, altyazı AI, srt çevir, vtt çevir, ass çevir, ücretsiz altyazı çevirmeni, online altyazı çevir, film altyazısı, dizi altyazısı, anime altyazısı, iki dilli altyazı, youtube altyazısı, Netflix altyazısı, İngilizce altyazı çevirisi,altyazı ücretsiz çevir,ücretsiz altyazı çevirme sitesi',
    ogTitle: 'AI-SRTSub - Dünyanın film ve dizileri, altyazı senin dilinde',
    ogDesc: 'Film tutkunları için ücretsiz AI altyazı çevirmeni: yabancı film, dizi ve belgesel altyazılarını tek tıkla ana diline çevir, zaman çizgisi otomatik hizalanır.',
    jsonldName: 'AI-SRTSub', jsonldAlt: '随心字幕 AI',
    jsonldDesc: 'Film tutkunları için ücretsiz AI altyazı çevirmeni: yabancı film, dizi ve belgesel altyazılarını tek tıkla ana diline çevir, zaman çizgisi otomatik hizalanır.',
    currency: 'TRY',
    copy: '<section class="seo" aria-label="Bu araç hakkında" style="max-width:1360px;margin:32px auto 0;padding:20px 24px 0;border-top:1px solid var(--line);color:var(--sub);font-size:13px;line-height:1.8;">\n    <h2 data-i18n="seoTitle" style="font-size:15px;color:var(--ink);margin:0 0 10px;font-weight:600;">AI ile Ücretsiz Otomatik Altyazı Çevirici</h2>\n    <p data-i18n-html="seoIntro">Bu, <strong>büyük dil modellerine (AI) dayanan ücretsiz bir online altyazı çeviri aracıdır</strong>. SRT, VTT veya ASS dosyalarını yükle ve altyazıları Türkçe, İngilizce, Çince, Japonca, Korece, İspanyolca ve 20+ diğer dil arasında çevir. Kayıt yok, kurulum yok, filigran yok — tarayıcıda aç ve çevirmeye başla. Bulut çeviriyi etkinleştirmediğin sürece altyazı verileri tarayıcında kalır.</p>\n    <p data-i18n-html="seoFeatures" style="margin-top:8px;"><strong>Temel özellikler:</strong> SRT, VTT ve ASS dosya çözümleme ve AI çevirisi, akıllı cümle birleştirme (bir cümle birden çok altyazıya yayıldığında birleştirilir, çevrilir ve özgün zaman çizgisine geri dağıtılır), zaman çizgisi hizalama, CJK ve Batı metinleri için otomatik satır sarma, dolgu temizleme, özel isim yönetimi ve seçilebilir çeviri tarzları. Videona gömmeye hazır standart SRT, VTT, ASS veya TXT dosyaları olarak dışa aktar.</p>\n    <p data-i18n-html="seoWho" style="margin-top:8px;"><strong>Kimler için:</strong> video çevirmenleri, YouTube içerik üreticileri ve yerelleştiriciler, dil öğrenenler, altyazı ekipleri ve video içeriğini hızla yerelleştirmesi gereken ekipler.</p>\n  </section>\n  <noscript>\n    <p data-i18n="seoNoscript" style="max-width:1360px;margin:24px auto;padding:0 24px;color:#1C2E2B;">Bu araç JavaScript gerektirir. Tarayıcında JavaScript\'i etkinleştir, sonra altyazı dosyasını (SRT / VTT / ASS) yükleyerek altyazıları AI ile ücretsiz çevir.</p>\n  </noscript>'
  },
  'nl': {
    htmlLang: 'nl', ogLocale: 'nl_NL', siteName: 'AI-SRTSub',
    title: 'AI-SRTSub - Gratis AI-ondertitelvertaler voor films en series',
    desc: 'ai-srtsub.com is een gratis AI-ondertitelvertaler voor filmliefhebbers. Vertaal ondertitels van buitenlandse films, series en documentaires in één klik naar je eigen taal.',
    kw: 'ondertitels vertalen, AI ondertitelvertaler, gratis ondertitels vertalen, SRT vertalen, VTT vertalen, ASS vertalen, film ondertitels, serie ondertitels, Netflix ondertitels, anime ondertitels, tweetalige ondertitels, ondertitels online vertalen, YouTube ondertitels, gratis ondertitels vertalen tool, ondertitels gratis vertalen, gratis SRT vertaler',
    ogTitle: 'AI-SRTSub - Gratis AI-ondertitelvertaler voor films en series',
    ogDesc: 'Gratis AI-ondertitelvertaler voor filmliefhebbers: zet ondertitels van buitenlandse films, series en documentaires in één klik om naar je eigen taal, met automatische tijdlijn-uitlijning.',
    jsonldName: 'AI-SRTSub', jsonldAlt: '随心字幕 AI',
    jsonldDesc: 'Gratis AI-ondertitelvertaler voor filmliefhebbers: zet ondertitels van buitenlandse films, series en documentaires in één klik om naar je eigen taal, met automatische tijdlijn-uitlijning.',
    currency: 'EUR',
    copy: '<section class="seo" aria-label="Over deze tool" style="max-width:1360px;margin:32px auto 0;padding:20px 24px 0;border-top:1px solid var(--line);color:var(--sub);font-size:13px;line-height:1.8;">\n    <h2 data-i18n="seoTitle" style="font-size:15px;color:var(--ink);margin:0 0 10px;font-weight:600;">Gratis AI-ondertitelvertaler</h2>\n    <p data-i18n-html="seoIntro">Dit is een <strong>gratis online ondertitelvertaler op basis van grote taalmodellen</strong>. Upload SRT-, VTT- of ASS-bestanden en vertaal ondertitels tussen Engels, Chinees, Japans, Koreaans, Spaans, Frans en meer dan 65 andere talen. Geen registratie, geen installatie, geen watermerk — open de tool in je browser en begin met vertalen. Ondertiteldata blijft in je browser, tenzij je vertalen in de cloud inschakelt.</p>\n    <p data-i18n-html="seoFeatures" style="margin-top:8px;"><strong>Belangrijkste functies:</strong> SRT-, VTT- en ASS-verwerking en AI-vertaling, slim samenvoegen van zinnen (als één zin over meerdere cues loopt, worden die samengevoegd, vertaald en weer over de oorspronkelijke tijdlijn verdeeld), tijdlijnuitlijning, automatisch afbreken van regels voor CJK- en westerse tekst, verwijderen van stopwoorden, eigen terminologie en kiesbare vertaalstijlen. Exporteer kant-en-klare SRT-, VTT-, ASS- of TXT-bestanden die direct in je video gebrand kunnen worden.</p>\n    <p data-i18n-html="seoWho" style="margin-top:8px;"><strong>Wie gebruikt het:</strong> video-vertalers, YouTube-makers en lokaliseerders, taalleerders, ondertitelteteams en iedereen die videocontent snel wil lokaliseren.</p>\n  </section>\n  <noscript>\n    <p data-i18n="seoNoscript" style="max-width:1360px;margin:24px auto;padding:0 24px;color:#1C2E2B;">Deze tool heeft JavaScript nodig. Schakel JavaScript in je browser in en upload daarna een ondertitelbestand (SRT / VTT / ASS) om ondertitels gratis met AI te vertalen.</p>\n  </noscript>'
  },
  'pl': {
    htmlLang: 'pl', ogLocale: 'pl_PL', siteName: 'AI-SRTSub',
    title: 'AI-SRTSub - Darmowy tłumacz napisów AI do filmów i seriali',
    desc: 'ai-srtsub.com to darmowy tłumacz napisów AI dla miłośników kina. Przetłumacz napisy zagranicznych filmów, seriali i dokumentów jednym kliknięciem na twój język.',
    kw: 'tłumaczenie napisów, tłumacz napisów AI, darmowe tłumaczenie napisów, tłumaczenie SRT, tłumaczenie VTT, tłumaczenie ASS, napisy do filmów, napisy do seriali, napisy Netflix, napisy anime, napisy dwujęzyczne, tłumaczenie napisów online, napisy YouTube, darmowe narzędzie do tłumaczenia napisów, tłumacz napisów za darmo, darmowy translator SRT',
    ogTitle: 'AI-SRTSub - Darmowy tłumacz napisów AI do filmów i seriali',
    ogDesc: 'Darmowy tłumacz napisów AI dla miłośników kina: napisy zagranicznych filmów, seriali i dokumentów w jednym kliknięciu w twoim języku, z automatycznym dopasowaniem osi czasu.',
    jsonldName: 'AI-SRTSub', jsonldAlt: '随心字幕 AI',
    jsonldDesc: 'Darmowy tłumacz napisów AI dla miłośników kina: napisy zagranicznych filmów, seriali i dokumentów w jednym kliknięciu w twoim języku, z automatycznym dopasowaniem osi czasu.',
    currency: 'PLN',
    copy: '<section class="seo" aria-label="O tym narzędziu" style="max-width:1360px;margin:32px auto 0;padding:20px 24px 0;border-top:1px solid var(--line);color:var(--sub);font-size:13px;line-height:1.8;">\n    <h2 data-i18n="seoTitle" style="font-size:15px;color:var(--ink);margin:0 0 10px;font-weight:600;">Darmowy tłumacz napisów AI</h2>\n    <p data-i18n-html="seoIntro">To <strong>darmowe internetowe narzędzie do tłumaczenia napisów oparte na dużych modelach językowych</strong>. Wgraj pliki SRT, VTT lub ASS i tłumacz napisy między angielskim, chińskim, japońskim, koreańskim, hiszpańskim, francuskim i ponad 65 innymi językami. Bez rejestracji, bez instalacji, bez znaku wodnego — otwórz w przeglądarce i tłumacz. Dane napisów zostają w przeglądarce, chyba że włączysz tłumaczenie w chmurze.</p>\n    <p data-i18n-html="seoFeatures" style="margin-top:8px;"><strong>Najważniejsze funkcje:</strong> parsowanie i tłumaczenie AI plików SRT, VTT i ASS, inteligentne łączenie zdań (gdy jedno zdanie obejmuje kilka linii, są one łączone, tłumaczone i ponownie rozdzielane na oryginalną oś czasu), wyrównanie osi czasu, automatyczne łamanie linii dla tekstu CJK i zachodniego, usuwanie wypełniaczy, obsługa własnej terminologii oraz wybór stylu tłumaczenia. Eksportuj gotowe pliki SRT, VTT, ASS lub TXT, które można od razu wgrać na wideo jako napisy twarde.</p>\n    <p data-i18n-html="seoWho" style="margin-top:8px;"><strong>Kto z tego korzysta:</strong> tłumacze wideo, twórcy YouTube i lokalizatorzy, osoby uczące się języków, grupy napisowe oraz zespoły, które muszą szybko lokalizować materiały wideo.</p>\n  </section>\n  <noscript>\n    <p data-i18n="seoNoscript" style="max-width:1360px;margin:24px auto;padding:0 24px;color:#1C2E2B;">To narzędzie wymaga JavaScriptu. Włącz JavaScript w przeglądarce, a potem wgraj plik napisów (SRT / VTT / ASS), aby tłumaczyć napisy AI za darmo.</p>\n  </noscript>'
  },
  'sv': {
    htmlLang: 'sv', ogLocale: 'sv_SE', siteName: 'AI-SRTSub',
    title: 'AI-SRTSub - Gratis AI-översättare för undertexter till film och serier',
    desc: 'ai-srtsub.com är en gratis AI-översättare för undertexter, byggd för filmälskare. Översätt undertexter till utländska filmer, serier och dokumentärer till ditt språk med ett klick.',
    kw: 'översätt undertexter, AI undertextöversättare, gratis översätta undertexter, översätt SRT, översätt VTT, översätt ASS, film undertexter, serier undertexter, Netflix undertexter, anime undertexter, tvåspråkiga undertexter, översätt undertexter online, YouTube undertexter, gratis verktyg för undertexter, översätt undertexter gratis, gratis SRT-översättare',
    ogTitle: 'AI-SRTSub - Gratis AI-översättare för undertexter till film och serier',
    ogDesc: 'Gratis AI-översättare för undertexter: omvandla undertexter till utländska filmer, serier och dokumentärer till ditt språk med ett klick, med automatisk tidslinjejustering.',
    jsonldName: 'AI-SRTSub', jsonldAlt: '随心字幕 AI',
    jsonldDesc: 'Gratis AI-översättare för undertexter: omvandla undertexter till utländska filmer, serier och dokumentärer till ditt språk med ett klick, med automatisk tidslinjejustering.',
    currency: 'SEK',
    copy: '<section class="seo" aria-label="Om detta verktyg" style="max-width:1360px;margin:32px auto 0;padding:20px 24px 0;border-top:1px solid var(--line);color:var(--sub);font-size:13px;line-height:1.8;">\n    <h2 data-i18n="seoTitle" style="font-size:15px;color:var(--ink);margin:0 0 10px;font-weight:600;">Gratis AI-undertextöversättare</h2>\n    <p data-i18n-html="seoIntro">Detta är ett <strong>kostnadsfritt onlineverktyg för undertextöversättning som drivs av stora språkmodeller</strong>. Ladda upp SRT-, VTT- eller ASS-filer och översätt undertexter mellan engelska, kinesiska, japanska, koreanska, spanska, franska och över 65 andra språk. Ingen registrering, ingen installation, ingen vattenstämpel — öppna det i webbläsaren och sätt igång. Undertextdata stannar i din webbläsare om du inte aktiverar molnöversättning.</p>\n    <p data-i18n-html="seoFeatures" style="margin-top:8px;"><strong>Viktiga funktioner:</strong> tolkning och AI-översättning av SRT, VTT och ASS, smart meningssammanslagning (när en mening spänner över flera repliker slås de ihop, översätts och delas sedan upp igen över originaltidslinjen), tidslinjesynkronisering, automatisk radbrytning för CJK- och västerländsk text, borttagning av utfyllnadsord, hantering av egen terminologi och valbara översättningsstilar. Exportera färdiga SRT-, VTT-, ASS- eller TXT-filer som kan brännas in direkt i din video.</p>\n    <p data-i18n-html="seoWho" style="margin-top:8px;"><strong>Vem använder det:</strong> videoöversättare, YouTube-skapare och lokaliserare, språkinlärare, undertextgrupper och team som snabbt behöver lokalisera videoinnehåll.</p>\n  </section>\n  <noscript>\n    <p data-i18n="seoNoscript" style="max-width:1360px;margin:24px auto;padding:0 24px;color:#1C2E2B;">Detta verktyg kräver JavaScript. Aktivera JavaScript i webbläsaren och ladda sedan upp en undertextfil (SRT / VTT / ASS) för att översätta undertexter med AI gratis.</p>\n  </noscript>'
  },
  'cs': {
    htmlLang: 'cs', ogLocale: 'cs_CZ', siteName: 'AI-SRTSub',
    title: 'AI-SRTSub - Bezplatný AI překladač titulků filmů a seriálů',
    desc: 'ai-srtsub.com - bezplatný AI překladač titulků pro filmy a seriály. Překlad jedním kliknutím, automatické zarovnání časové osy, bez registrace.',
    kw: 'překlad titulků, AI překladač titulků, překlad titulků zdarma, překlad SRT, překlad VTT, překlad ASS, titulky k filmům, titulky k seriálům, titulky Netflix, titulky anime, dvojjazyčné titulky, překlad titulků online, titulky YouTube, bezplatný nástroj na překlad titulků, přeložit titulky zdarma, bezplatný překladač SRT',
    ogTitle: 'AI-SRTSub - Bezplatný AI překladač titulků k filmům a seriálům',
    ogDesc: 'Bezplatný AI překladač titulků pro milovníky filmů: titulky zahraničních filmů, seriálů a dokumentů jedním kliknutím ve vašem jazyce, s automatickým zarovnáním časové osy.',
    jsonldName: 'AI-SRTSub', jsonldAlt: '随心字幕 AI',
    jsonldDesc: 'Bezplatný AI překladač titulků pro milovníky filmů: titulky zahraničních filmů, seriálů a dokumentů jedním kliknutím ve vašem jazyce, s automatickým zarovnáním časové osy.',
    currency: 'CZK',
    copy: '<section class="seo" aria-label="O tomto nástroji" style="max-width:1360px;margin:32px auto 0;padding:20px 24px 0;border-top:1px solid var(--line);color:var(--sub);font-size:13px;line-height:1.8;">\n    <h2 data-i18n="seoTitle" style="font-size:15px;color:var(--ink);margin:0 0 10px;font-weight:600;">Bezplatný AI překladač titulků</h2>\n    <p data-i18n-html="seoIntro">Toto je <strong>bezplatný online nástroj pro překlad titulků využívající velké jazykové modely</strong>. Nahrajte soubory SRT, VTT nebo ASS a překládejte titulky mezi angličtinou, čínštinou, japonštinou, korejštinou, španělštinou, francouzštinou a více než 65 dalšími jazyky. Bez registrace, bez instalace, bez vodoznaku — otevřete v prohlížeči a překládejte. Data titulků zůstávají ve vašem prohlížeči, pokud nezapnete překlad v cloudu.</p>\n    <p data-i18n-html="seoFeatures" style="margin-top:8px;"><strong>Hlavní funkce:</strong> parsování a AI překlad SRT, VTT a ASS, chytré slučování vět (když jedna věta zasahuje do více titulků, ty se sloučí, přeloží a znovu rozdělí přes původní časovou osu), zarovnání časové osy, automatické zalamování řádků pro CJK i západní text, odstraňování výplňových slov, vlastní terminologie a volitelné styly překladu. Exportujte hotové soubory SRT, VTT, ASS nebo TXT připravené k vypálení do videa.</p>\n    <p data-i18n-html="seoWho" style="margin-top:8px;"><strong>Kdo jej používá:</strong> překladatelé videa, youtubeři a lokalizátoři, studenti jazyků, titulkovací skupiny a týmy, které potřebují rychle lokalizovat videoobsah.</p>\n  </section>\n  <noscript>\n    <p data-i18n="seoNoscript" style="max-width:1360px;margin:24px auto;padding:0 24px;color:#1C2E2B;">Tento nástroj vyžaduje JavaScript. Zapněte JavaScript v prohlížeči a poté nahrajte soubor s titulky (SRT / VTT / ASS), abyste mohli titulky přeložit AI zdarma.</p>\n  </noscript>'
  },
  'uk': {
    htmlLang: 'uk', ogLocale: 'uk_UA', siteName: 'AI-SRTSub',
    title: 'AI-SRTSub - Безкоштовний AI-перекладач субтитрів до фільмів і серіалів',
    desc: 'ai-srtsub.com — безкоштовний AI-перекладач субтитрів для поціновувачів кіно. Перекладайте субтитри іноземних фільмів, серіалів і документалок одним кліком вашою мовою.',
    kw: 'переклад субтитрів, AI перекладач субтитрів, безкоштовний переклад субтитрів, перекласти SRT, перекласти VTT, перекласти ASS, субтитри до фільмів, субтитри до серіалів, субтитри Netflix, субтитри аніме, двомовні субтитри, переклад субтитрів онлайн, субтитри YouTube, безкоштовний інструмент перекладу субтитрів, перекласти субтитри безкоштовно, безкоштовний перекладач SRT',
    ogTitle: 'AI-SRTSub - Безкоштовний AI-перекладач субтитрів до фільмів і серіалів',
    ogDesc: 'Безкоштовний AI-перекладач субтитрів для поціновувачів кіно: субтитри іноземних фільмів, серіалів і документалок одним кліком вашою мовою з автоматичним вирівнюванням таймлайну.',
    jsonldName: 'AI-SRTSub', jsonldAlt: '随心字幕 AI',
    jsonldDesc: 'Безкоштовний AI-перекладач субтитрів для поціновувачів кіно: субтитри іноземних фільмів, серіалів і документалок одним кліком вашою мовою з автоматичним вирівнюванням таймлайну.',
    currency: 'UAH',
    copy: '<section class="seo" aria-label="Про цей інструмент" style="max-width:1360px;margin:32px auto 0;padding:20px 24px 0;border-top:1px solid var(--line);color:var(--sub);font-size:13px;line-height:1.8;">\n    <h2 data-i18n="seoTitle" style="font-size:15px;color:var(--ink);margin:0 0 10px;font-weight:600;">Безкоштовний AI-перекладач субтитрів</h2>\n    <p data-i18n-html="seoIntro">Це <strong>безкоштовний онлайн-інструмент перекладу субтитрів на базі великих мовних моделей</strong>. Завантажте файли SRT, VTT або ASS і перекладайте субтитри між англійською, китайською, японською, корейською, іспанською, французькою та понад 65 іншими мовами. Без реєстрації, без установлення, без водяних знаків — просто відкрийте у браузері й перекладайте. Дані субтитрів залишаються у вашому браузері, якщо ви не ввімкнете хмарний переклад.</p>\n    <p data-i18n-html="seoFeatures" style="margin-top:8px;"><strong>Основні можливості:</strong> розбір і AI-переклад SRT, VTT та ASS, розумне об’єднання речень (коли одне речення охоплює кілька реплік, їх об’єднують, перекладають і знову розподіляють по вихідній часовій шкалі), синхронізація часової шкали, автоматичне перенесення рядків для CJK і західних писемностей, вилучення слів-заповнювачів, власна термінологія та вибір стилю перекладу. Експортуйте готові файли SRT, VTT, ASS або TXT, які можна одразу вмонтувати у відео.</p>\n    <p data-i18n-html="seoWho" style="margin-top:8px;"><strong>Хто користується:</strong> перекладачі відео, youtube-автори й локалізатори, ті, хто вивчає мови, субтитрувальні групи та команди, яким потрібно швидко локалізувати відеоконтент.</p>\n  </section>\n  <noscript>\n    <p data-i18n="seoNoscript" style="max-width:1360px;margin:24px auto;padding:0 24px;color:#1C2E2B;">Цей інструмент потребує JavaScript. Увімкніть JavaScript у браузері, а потім завантажте файл субтитрів (SRT / VTT / ASS), щоб безкоштовно перекладати субтитри за допомогою ШІ.</p>\n  </noscript>'
  },
  'da': {
    htmlLang: 'da', ogLocale: 'da_DK', siteName: 'AI-SRTSub',
    title: 'AI-SRTSub - Gratis AI-oversætter af undertekster til film og serier',
    desc: 'ai-srtsub.com er en gratis AI-oversætter af undertekster til film, serier og dokumentarer. Ét klik, automatisk tidslinjejustering, ingen tilmelding.',
    kw: 'oversæt undertekster, AI undertekstoversætter, gratis oversættelse af undertekster, oversæt SRT, oversæt VTT, oversæt ASS, undertekster til film, undertekster til serier, Netflix undertekster, anime undertekster, tosprogede undertekster, oversæt undertekster online, YouTube undertekster, gratis værktøj til undertekster, oversæt undertekster gratis, gratis SRT-oversætter',
    ogTitle: 'AI-SRTSub - Gratis AI-oversætter af undertekster til film og serier',
    ogDesc: 'Gratis AI-oversætter af undertekster til filmelskere: undertekster til udenlandske film, serier og dokumentarer på dit sprog med ét klik, med automatisk tidslinjejustering.',
    jsonldName: 'AI-SRTSub', jsonldAlt: '随心字幕 AI',
    jsonldDesc: 'Gratis AI-oversætter af undertekster til filmelskere: undertekster til udenlandske film, serier og dokumentarer på dit sprog med ét klik, med automatisk tidslinjejustering.',
    currency: 'DKK',
    copy: '<section class="seo" aria-label="Om dette værktøj" style="max-width:1360px;margin:32px auto 0;padding:20px 24px 0;border-top:1px solid var(--line);color:var(--sub);font-size:13px;line-height:1.8;">\n    <h2 data-i18n="seoTitle" style="font-size:15px;color:var(--ink);margin:0 0 10px;font-weight:600;">Gratis AI-undertekstoversætter</h2>\n    <p data-i18n-html="seoIntro">Dette er et <strong>gratis onlineværktøj til oversættelse af undertekster drevet af store sprogmodeller</strong>. Upload SRT-, VTT- eller ASS-filer og oversæt undertekster mellem engelsk, kinesisk, japansk, koreansk, spansk, fransk og mere end 65 andre sprog. Ingen tilmelding, ingen installation, intet vandmærke — åbn det i browseren og gå i gang. Undertekstdata bliver i din browser, medmindre du slår skyoversættelse til.</p>\n    <p data-i18n-html="seoFeatures" style="margin-top:8px;"><strong>Vigtigste funktioner:</strong> parsing og AI-oversættelse af SRT, VTT og ASS, smart sætningssammenslåning (når én sætning går over flere replikker, slås de sammen, oversættes og deles igen ud over den oprindelige tidslinje), tidslinjesynkronisering, automatisk ombrud for CJK- og vestlig tekst, fjernelse af fyldord, håndtering af egen terminologi og valgbare oversættelsesstile. Eksportér færdige SRT-, VTT-, ASS- eller TXT-filer, der kan brændes direkte ind i din video.</p>\n    <p data-i18n-html="seoWho" style="margin-top:8px;"><strong>Hvem bruger det:</strong> videooversættere, YouTube-skabere og lokalisatorer, sprogstuderende, undertekstgrupper og teams der hurtigt skal lokalisere videoindhold.</p>\n  </section>\n  <noscript>\n    <p data-i18n="seoNoscript" style="max-width:1360px;margin:24px auto;padding:0 24px;color:#1C2E2B;">Dette værktøj kræver JavaScript. Aktivér JavaScript i din browser, og upload derefter en undertekstfil (SRT / VTT / ASS) for at oversætte undertekster gratis med AI.</p>\n  </noscript>'
  },
  'fi': {
    htmlLang: 'fi', ogLocale: 'fi_FI', siteName: 'AI-SRTSub',
    title: 'AI-SRTSub - Ilmainen tekstitysten kääntäjä elokuville ja sarjoille',
    desc: 'ai-srtsub.com on ilmainen tekoälypohjainen tekstitysten kääntäjä elokuvien ystäville. Käännä ulkomaisten elokuvien, sarjojen ja dokumenttien tekstitykset yhdellä klikkauksella omalla kielelläsi.',
    kw: 'tekstitysten kääntäminen, tekoäly tekstitysten kääntäjä, ilmainen tekstitysten käännös, käännä SRT, käännä VTT, käännä ASS, elokuvien tekstitykset, sarjojen tekstitykset, Netflix-tekstitykset, anime-tekstitykset, kaksikieliset tekstitykset, käännä tekstitykset verkossa, YouTube-tekstitykset, ilmainen tekstitystyökalu, käännä tekstitykset ilmaiseksi, ilmainen SRT-kääntäjä',
    ogTitle: 'AI-SRTSub - Ilmainen tekoälypohjainen tekstitysten kääntäjä elokuville ja sarjoille',
    ogDesc: 'Ilmainen tekoälypohjainen tekstitysten kääntäjä elokuvien ystäville: ulkomaisten elokuvien, sarjojen ja dokumenttien tekstitykset yhdellä klikkauksella omalla kielelläsi, automaattisella aikajanan kohdistuksella.',
    jsonldName: 'AI-SRTSub', jsonldAlt: '随心字幕 AI',
    jsonldDesc: 'Ilmainen tekoälypohjainen tekstitysten kääntäjä elokuvien ystäville: ulkomaisten elokuvien, sarjojen ja dokumenttien tekstitykset yhdellä klikkauksella omalla kielelläsi, automaattisella aikajanan kohdistuksella.',
    currency: 'EUR',
    copy: '<section class="seo" aria-label="Tietoa tästä työkalusta" style="max-width:1360px;margin:32px auto 0;padding:20px 24px 0;border-top:1px solid var(--line);color:var(--sub);font-size:13px;line-height:1.8;">\n    <h2 data-i18n="seoTitle" style="font-size:15px;color:var(--ink);margin:0 0 10px;font-weight:600;">Ilmainen tekoälypohjainen tekstitysten kääntäjä</h2>\n    <p data-i18n-html="seoIntro">Tämä on <strong>ilmainen verkkotyökalu tekstitysten kääntämiseen suurten kielimallien avulla</strong>. Lataa SRT-, VTT- tai ASS-tiedostoja ja käännä tekstityksiä englannin, kiinan, japanin, korean, espanjan, ranskan ja yli 65 muun kielen välillä. Ei rekisteröitymistä, ei asennusta, ei vesileimaa — avaa selaimessa ja aloita. Tekstitysten tiedot pysyvät selaimessasi, ellet ota pilvikäännöstä käyttöön.</p>\n    <p data-i18n-html="seoFeatures" style="margin-top:8px;"><strong>Tärkeimmät ominaisuudet:</strong> SRT-, VTT- ja ASS-tiedostojen jäsennys ja tekoälykäännös, älykäs virkeyhdistely (kun yksi virke ulottuu usealle tekstitykselle, ne yhdistetään, käännetään ja jaetaan takaisin alkuperäiselle aikajanalle), aikajanan tahdistus, automaattinen rivittely CJK- ja länsimaiselle tekstille, täytesanojen poisto, oma terminologia ja valittavat käännöstyylit. Vie valmiit SRT-, VTT-, ASS- tai TXT-tiedostot, jotka voi polttaa suoraan videoon.</p>\n    <p data-i18n-html="seoWho" style="margin-top:8px;"><strong>Kuka sitä käyttää:</strong> videoiden kääntäjät, YouTube-tekijät ja lokalisointityöntekijät, kielten opiskelijat, tekstitysryhmät ja tiimit, joiden on lokalisoitava videosisältöä nopeasti.</p>\n  </section>\n  <noscript>\n    <p data-i18n="seoNoscript" style="max-width:1360px;margin:24px auto;padding:0 24px;color:#1C2E2B;">Tämä työkalu vaatii JavaScriptin. Ota JavaScript käyttöön selaimessasi ja lataa sitten tekstitystiedosto (SRT / VTT / ASS) kääntääksesi tekstityksiä tekoälyllä ilmaiseksi.</p>\n  </noscript>'
  },
  'el': {
    htmlLang: 'el', ogLocale: 'el_GR', siteName: 'AI-SRTSub',
    title: 'AI-SRTSub - Δωρεάν μεταφραστής υποτίτλων με AI για ταινίες και σειρές',
    desc: 'Το ai-srtsub.com είναι ένας δωρεάν μεταφραστής υποτίτλων με AI για τους λάτρεις του κινηματογράφου. Μετέφρασε τους υπότιτλους ξένων ταινιών, σειρών και ντοκιμαντέρ στη γλώσσα σου με ένα κλικ.',
    kw: 'μετάφραση υποτίτλων, μεταφραστής υποτίτλων AI, δωρεάν μετάφραση υποτίτλων, μετάφραση SRT, μετάφραση VTT, μετάφραση ASS, υπότιτλοι ταινιών, υπότιτλοι σειρών, υπότιτλοι Netflix, υπότιτλοι anime, δίγλωσσοι υπότιτλοι, μετάφραση υποτίτλων online, υπότιτλοι YouTube, δωρεάν εργαλείο υποτίτλων, δωρεάν μεταφραστής SRT',
    ogTitle: 'AI-SRTSub - Δωρεάν μεταφραστής υποτίτλων με AI για ταινίες και σειρές',
    ogDesc: 'Δωρεάν μεταφραστής υποτίτλων με AI για τους λάτρεις του κινηματογράφου: υπότιτλοι ξένων ταινιών, σειρών και ντοκιμαντέρ στη γλώσσα σου με ένα κλικ, με αυτόματη ευθυγράμμιση χρονογραμμής.',
    jsonldName: 'AI-SRTSub', jsonldAlt: '随心字幕 AI',
    jsonldDesc: 'Δωρεάν μεταφραστής υποτίτλων με AI για τους λάτρεις του κινηματογράφου: υπότιτλοι ξένων ταινιών, σειρών και ντοκιμαντέρ στη γλώσσα σου με ένα κλικ, με αυτόματη ευθυγράμμιση χρονογραμμής.',
    currency: 'EUR',
    copy: '<section class="seo" aria-label="Σχετικά με αυτό το εργαλείο" style="max-width:1360px;margin:32px auto 0;padding:20px 24px 0;border-top:1px solid var(--line);color:var(--sub);font-size:13px;line-height:1.8;">\n    <h2 data-i18n="seoTitle" style="font-size:15px;color:var(--ink);margin:0 0 10px;font-weight:600;">Δωρεάν μεταφραστής υποτίτλων με AI</h2>\n    <p data-i18n-html="seoIntro">Αυτό είναι ένα <strong>δωρεάν διαδικτυακό εργαλείο μετάφρασης υποτίτλων με χρήση μεγάλων γλωσσικών μοντέλων</strong>. Ανεβάστε αρχεία SRT, VTT ή ASS και μεταφράστε υπότιτλους ανάμεσα στα αγγλικά, κινεζικά, ιαπωνικά, κορεατικά, ισπανικά, γαλλικά και περισσότερες από 65 ακόμη γλώσσες. Χωρίς εγγραφή, χωρίς εγκατάσταση, χωρίς υδατογράφημα — ανοίξτε το στον περιηγητή και ξεκινήστε. Τα δεδομένα των υποτίτλων μένουν στον περιηγητή σας, εκτός αν ενεργοποιήσετε μετάφραση στο cloud.</p>\n    <p data-i18n-html="seoFeatures" style="margin-top:8px;"><strong>Κύρια χαρακτηριστικά:</strong> ανάλυση και μετάφραση με AI των SRT, VTT και ASS, έξυπνη συγχώνευση προτάσεων (όταν μια πρόταση εκτείνεται σε πολλούς υπότιτλους, συγχωνεύονται, μεταφράζονται και ξαναδιασπώνται στην αρχική χρονική γραμμή), ευθυγράμμιση χρονικής γραμμής, αυτόματο σπάσιμο γραμμών για κείμενο CJK και λατινικό, αφαίρεση λέξεων-πληρωτικών, διαχείριση δικής σας ορολογίας και επιλέξιμα ύφη μετάφρασης. Εξάγετε έτοιμα αρχεία SRT, VTT, ASS ή TXT, έτοιμα να «καούν» στο βίντεό σας.</p>\n    <p data-i18n-html="seoWho" style="margin-top:8px;"><strong>Ποιοι το χρησιμοποιούν:</strong> μεταφραστές βίντεο, δημιουργοί στο YouTube και τοπικοποιητές, όσοι μαθαίνουν γλώσσες, ομάδες υποτιτλισμού και ομάδες που χρειάζεται να τοπικοποιήσουν γρήγορα περιεχόμενο βίντεο.</p>\n  </section>\n  <noscript>\n    <p data-i18n="seoNoscript" style="max-width:1360px;margin:24px auto;padding:0 24px;color:#1C2E2B;">Αυτό το εργαλείο απαιτεί JavaScript. Ενεργοποιήστε τη JavaScript στον περιηγητή σας και μετά ανεβάστε ένα αρχείο υποτίτλων (SRT / VTT / ASS) για δωρεάν μετάφραση υποτίτλων με AI.</p>\n  </noscript>'
  },
  'he': {
    htmlLang: 'he', ogLocale: 'he_IL', siteName: 'AI-SRTSub',
    title: 'AI-SRTSub - מתרגם כתוביות AI חינם לסרטים וסדרות',
    desc: 'ai-srtsub.com הוא מתרגם כתוביות AI חינמי. תרגמו כתוביות של סרטים וסדרות לשפה שלכם בלחיצה אחת, עם יישור אוטומטי של ציר הזמן.',
    kw: 'תרגום כתוביות, מתרגם כתוביות AI, תרגום כתוביות חינם, תרגום SRT, תרגום VTT, תרגום ASS, כתוביות לסרטים, כתוביות לסדרות, כתוביות נטפליקס, כתוביות אנימה, כתוביות דו-לשוניות, תרגום כתוביות אונליין, כתוביות יוטיוב, כלי חינמי לתרגום כתוביות, תרגום כתוביות בחינם, מתרגם SRT חינם',
    ogTitle: 'AI-SRTSub - מתרגם כתוביות AI חינם לסרטים וסדרות',
    ogDesc: 'מתרגם כתוביות AI חינמי לחובבי קולנוע: כתוביות של סרטים זרים, סדרות וסרטי תעודה בשפה שלכם בלחיצה אחת, עם יישור אוטומטי של ציר הזמן.',
    jsonldName: 'AI-SRTSub', jsonldAlt: '随心字幕 AI',
    jsonldDesc: 'מתרגם כתוביות AI חינמי לחובבי קולנוע: כתוביות של סרטים זרים, סדרות וסרטי תעודה בשפה שלכם בלחיצה אחת, עם יישור אוטומטי של ציר הזמן.',
    currency: 'ILS',
    copy: '<section class="seo" aria-label="אודות הכלי" style="max-width:1360px;margin:32px auto 0;padding:20px 24px 0;border-top:1px solid var(--line);color:var(--sub);font-size:13px;line-height:1.8;">\n    <h2 data-i18n="seoTitle" style="font-size:15px;color:var(--ink);margin:0 0 10px;font-weight:600;">מתרגם כתוביות AI חינם</h2>\n    <p data-i18n-html="seoIntro">זהו <strong>כלי מקוון חינמי לתרגום כתוביות שמבוסס על מודלי שפה גדולים</strong>. העלו קבצי SRT, VTT או ASS ותרגמו כתוביות בין אנגלית, סינית, יפנית, קוריאנית, ספרדית, צרפתית ועוד יותר מ-65 שפות. בלי הרשמה, בלי התקנה, בלי סימן מים — פשוט פתחו בדפדפן והתחילו. נתוני הכתוביות נשארים בדפדפן שלכם אלא אם תפעילו תרגום בענן.</p>\n    <p data-i18n-html="seoFeatures" style="margin-top:8px;"><strong>תכונות עיקריות:</strong> פענוח ותרגום AI של SRT, VTT ו-ASS, מיזוג משפטים חכם (כשמשפט אחד נפרש על פני כמה כתוביות, הן מאוחדות, מתורגמות ומפוצלות חזרה על ציר הזמן המקורי), יישור ציר זמן, שבירת שורות אוטומטית לטקסט CJK ולטיני, הסרת מילות מילוי, טיפול במונחים שלכם וסגנונות תרגום לבחירה. ייצוא קבצי SRT, VTT, ASS או TXT מוכנים להטבעה ישירה בווידאו.</p>\n    <p data-i18n-html="seoWho" style="margin-top:8px;"><strong>מי משתמש בזה:</strong> מתרגמי וידאו, יוצרי YouTube ואנשי לוקליזציה, לומדי שפות, קבוצות כתוביות וצוותים שצריכים להתאים תוכן וידאו במהירות.</p>\n  </section>\n  <noscript>\n    <p data-i18n="seoNoscript" style="max-width:1360px;margin:24px auto;padding:0 24px;color:#1C2E2B;">הכלי הזה דורש JavaScript. הפעילו JavaScript בדפדפן, ואז העלו קובץ כתוביות (SRT / VTT / ASS) כדי לתרגם כתוביות עם AI בחינם.</p>\n  </noscript>'
  },
  'ro': {
    htmlLang: 'ro', ogLocale: 'ro_RO', siteName: 'AI-SRTSub',
    title: "AI-SRTSub - Traducător AI subtitrări, filme și seriale",
    desc: 'ai-srtsub.com este un traducător AI de subtitrări gratuit, creat pentru pasionații de film. Traduceți subtitrările filmelor străine, serialelor și documentarelor în limba ta cu un singur clic.',
    kw: 'traducere subtitrări, traducător subtitrări AI, traducere subtitrări gratuită, traducere SRT, traducere VTT, traducere ASS, subtitrări filme, subtitrări seriale, subtitrări Netflix, subtitrări anime, subtitrări bilingve, traducere subtitrări online, subtitrări YouTube, instrument gratuit pentru subtitrări, traduce subtitrări gratis, traducător SRT gratuit',
    ogTitle: 'AI-SRTSub - Traducător AI de subtitrări gratuit pentru filme și seriale',
    ogDesc: 'Traducător AI de subtitrări gratuit pentru pasionații de film: subtitrările filmelor străine, serialelor și documentarelor în limba voastră cu un singur clic, cu aliniere automată a timeline-ului.',
    jsonldName: 'AI-SRTSub', jsonldAlt: '随心字幕 AI',
    jsonldDesc: 'Traducător AI de subtitrări gratuit pentru pasionații de film: subtitrările filmelor străine, serialelor și documentarelor în limba voastră cu un singur clic, cu aliniere automată a timeline-ului.',
    currency: 'RON',
    copy: '<section class="seo" aria-label="Despre acest instrument" style="max-width:1360px;margin:32px auto 0;padding:20px 24px 0;border-top:1px solid var(--line);color:var(--sub);font-size:13px;line-height:1.8;">\n    <h2 data-i18n="seoTitle" style="font-size:15px;color:var(--ink);margin:0 0 10px;font-weight:600;">Traducător AI de subtitrări gratuit</h2>\n    <p data-i18n-html="seoIntro">Acesta este un <strong>instrument online gratuit de traducere a subtitrărilor bazat pe modele de limbaj mari</strong>. Încarcă fișiere SRT, VTT sau ASS și tradu subtitrări între engleză, chineză, japoneză, coreeană, spaniolă, franceză și peste 65 de alte limbi. Fără cont, fără instalare, fără filigran — deschide-l în browser și începe. Datele subtitrărilor rămân în browserul tău, dacă nu activezi traducerea în cloud.</p>\n    <p data-i18n-html="seoFeatures" style="margin-top:8px;"><strong>Caracteristici principale:</strong> analiza și traducerea AI pentru SRT, VTT și ASS, unirea inteligentă a propozițiilor (când o propoziție se întinde pe mai multe replici, acestea se unesc, se traduc și se împart din nou pe axa temporală originală), alinierea axei temporale, împărțirea automată a rândurilor pentru text CJK și occidental, eliminarea cuvintelor de umplutură, gestionarea propriei terminologii și stiluri de traducere la alegere. Exportă fișiere SRT, VTT, ASS sau TXT gata de ars direct în clipul tău.</p>\n    <p data-i18n-html="seoWho" style="margin-top:8px;"><strong>Cine îl folosește:</strong> traducători de video, creatori YouTube și specialiști în localizare, cei care învață limbi străine, grupuri de subtitrare și echipe care trebuie să localizeze rapid conținut video.</p>\n  </section>\n  <noscript>\n    <p data-i18n="seoNoscript" style="max-width:1360px;margin:24px auto;padding:0 24px;color:#1C2E2B;">Acest instrument necesită JavaScript. Activează JavaScript în browser, apoi încarcă un fișier de subtitrări (SRT / VTT / ASS) pentru a traduce subtitrări gratuit cu AI.</p>\n  </noscript>'
  }
};

/* ---------------- 三页 SEO 表（v0.9.273） ----------------
 * 以前只有首页有 27 语版本，特效页 / 清洗页是「一份中文 + 一份英文 meta」，
 * 搜索引擎只能抓到 zh-CN，其它语言的搜索流量全部丢掉。
 * 现在三页共用一套语言表：每页 27 语各一份 title / desc / kw / 静态文案块。
 * 字段约定：ogTitle 缺省用 title、ogDesc 与 jsonldDesc 缺省用 desc——
 * 少写三遍同样的句子，也就少三处改漏的机会。 */
/* og:locale 只跟界面语言走，与页面无关：特效页 / 清洗页的表里不必各写一遍 */
const OG_LOCALE = {
  'zh-CN': 'zh_CN', 'zh-TW': 'zh_TW', 'en': 'en_US', 'ja': 'ja_JP', 'es': 'es_ES', 'pt': 'pt_BR',
  'ko': 'ko_KR', 'de': 'de_DE', 'fr': 'fr_FR', 'id': 'id_ID', 'hi': 'hi_IN', 'th': 'th_TH',
  'vi': 'vi_VN', 'ru': 'ru_RU', 'it': 'it_IT', 'ar': 'ar_AR', 'tr': 'tr_TR', 'nl': 'nl_NL',
  'pl': 'pl_PL', 'sv': 'sv_SE', 'cs': 'cs_CZ', 'uk': 'uk_UA', 'da': 'da_DK', 'fi': 'fi_FI',
  'el': 'el_GR', 'he': 'he_IL', 'ro': 'ro_RO'
};
const SEO_MERGE = {
  'zh-CN': {
    title: '特效字幕工具-双语合并·样式模板·ASS/VTT 特效 | 随心字幕 AI',
    desc: '免费在线特效字幕工具：两份字幕合并成双语、调整已有双语的顺序与样式、给单语字幕加特效。ASS 5 套 / VTT 6 套行业模板，实时预览所见即所得，导出 SRT / VTT / ASS。',
    kw: '字幕合并,双语字幕合并,特效字幕,ASS字幕样式,VTT字幕样式,双语字幕制作,字幕配轴,中英双语字幕,ASS特效,字幕模板,免费字幕工具,merge subtitles,bilingual subtitles',
    intro: '把两份字幕合并成双语，或给字幕直接上样式：字体、颜色、描边、位置所见即所得。',
    feat: '双语合并与双语调整、ASS / VTT 样式模板、样式槽逐项微调、时间轴就地精修与批量校正、实时预览等于导出结果。',
    who: '要做双语或特效字幕的创作者、压制组、需要无障碍字幕的团队。',
    /* 中文站点的品牌名跟着首页走中文，缺省的 AI-SRTSub 只在其它语言下用 */
    siteName: '随心字幕 AI', jsonldName: '随心字幕 AI', jsonldAlt: 'AI-SRTSub'
  },
  'en': {
    title: 'Styled Subtitle Maker - Merge Bilingual, ASS & VTT Effect',
    desc: "Free tool for styled subtitles: merge two files into bilingual, restyle a bilingual track, or add effects. 5 ASS / 6 VTT presets; export as SRT / VTT / ASS.",
    kw: 'merge subtitles, bilingual subtitles, combine subtitle files, styled subtitles, ASS subtitle styles, VTT subtitle styles, subtitle effects, dual subtitle maker, ASS presets, subtitle template, free subtitle tool',
    intro: 'Merge two subtitle files into bilingual, or style a track: font, colour, outline and position, all WYSIWYG.',
    feat: 'Bilingual merge and adjust, ASS / VTT style presets, per-value style slots, in-place and bulk timeline fixes, and a live preview that is literally the exported file.',
    who: 'Creators making bilingual or styled subtitles, encoding groups, and teams that need accessible captions.'
  }
,
  'zh-TW': {
    title: "特效字幕工具 - 雙語合併 · 樣式範本 · ASS/VTT | 隨心字幕 AI",
    desc: "免費線上特效字幕工具：兩份字幕合併成雙語、調整既有雙語的順序與樣式、替單語字幕加特效。ASS 5 套 / VTT 6 套業界範本，即時預覽所見即所得，匯出 SRT / VTT / ASS。",
    kw: "字幕合併,雙語字幕合併,特效字幕,ASS字幕樣式,VTT字幕樣式,雙語字幕製作,字幕配軸,中英雙語字幕,ASS特效,字幕範本,免費字幕工具,merge subtitles,bilingual subtitles",
    intro: "把兩份字幕合併成雙語，或直接替字幕上樣式：字體、顏色、描邊、位置所見即所得。",
    feat: "雙語合併與雙語調整、ASS / VTT 樣式範本、樣式槽逐項微調、時間軸就地精修與批量校正、即時預覽等於匯出結果。",
    who: "要做雙語或特效字幕的創作者、壓製組、需要無障礙字幕的團隊。",
    siteName: "隨心字幕 AI", jsonldName: "隨心字幕 AI", jsonldAlt: "AI-SRTSub"
  },
  'ja': {
    title: "装飾字幕ツール - 二か国語結合 · ASS/VTT装飾 | AI-SRTSub",
    desc: "無料のオンライン装飾字幕ツール：2本の字幕を二か国語に統合、既存の二か国語字幕の順序とスタイルを調整、単一言語の字幕に装飾を追加。ASS 5種 / VTT 6種の業界テンプレート、ライブプレビューは書き出し結果と同じです。SRT / VTT / ASS で書き出し。",
    kw: "字幕結合,二か国語字幕 作成,装飾字幕,ASS字幕スタイル,VTT字幕スタイル,字幕統合,字幕タイミング調整,日英字幕,ASS装飾,字幕テンプレート,無料字幕ツール,merge subtitles",
    intro: "2本の字幕を二か国語に統合、あるいは字幕に直接スタイルを適用：フォント・色・縁取り・位置を見たまま調整できます。",
    feat: "二か国語の結合と調整、ASS / VTT スタイルテンプレート、スタイルスロットでの項目別微調整、タイムラインの個別修正と一括補正、ライブプレビュー＝書き出し結果。",
    who: "二か国語・装飾字幕を作るクリエイター、エンコード担当、バリアフリー字幕が必要なチーム。"
  },
  'ko': {
    title: "스타일 자막 도구 - 두 언어 합치기·ASS/VTT 효과 | AI-SRTSub",
    desc: "무료 온라인 스타일 자막 도구: 자막 두 개를 두 언어로 합치고, 기존 두 언어 자막의 순서와 스타일을 조정하고, 단일 언어 자막에 효과를 더합니다. ASS 5종 / VTT 6종 업계 프리셋, 실시간 미리보기는 내보낸 결과와 같습니다. SRT / VTT / ASS로 내보내기.",
    kw: "자막 합치기,두 언어 자막 만들기,스타일 자막,ASS 자막 스타일,VTT 자막 스타일,자막 싱크,영한 자막,ASS 효과,자막 템플릿,무료 자막 도구,merge subtitles",
    intro: "자막 두 개를 두 언어로 합치거나, 자막에 바로 스타일을 입힙니다. 글꼴·색·외곽선·위치를 그대로 보며 조정하세요.",
    feat: "두 언어 합치기와 조정, ASS / VTT 스타일 프리셋, 스타일 슬롯 항목별 미세 조정, 타임라인 개별 수정과 일괄 보정, 실시간 미리보기 = 내보낸 파일.",
    who: "두 언어·스타일 자막을 만드는 크리에이터, 인코딩 팀, 접근성 자막이 필요한 팀."
  },
  'es': {
    title: "Herramienta de subtítulos con estilo - unir bilingües · p",
    desc: "Herramienta gratis de subtítulos con estilo: une dos archivos en bilingüe o reestiliza una pista bilingüe. 5 plantillas ASS / 6 VTT, exporta a SRT / VTT / ASS.",
    kw: "unir subtitulos, subtitulos bilingües, combinar subtitulos, subtitulos con estilo, estilos ASS, estilos VTT, efectos subtitulos, plantilla subtitulos, herramienta subtitulos gratis, merge subtitles",
    intro: "Une dos archivos de subtítulos en uno bilingüe o aplícales estilo: tipografía, color, contorno y posición, todo en WYSIWYG.",
    feat: "Unión y ajuste bilingüe, plantillas de estilo ASS / VTT, ranuras de estilo para afinar cada valor, corrección de la línea de tiempo al detalle o en bloque, y una vista previa que es literalmente el archivo exportado.",
    who: "Creadores de subtítulos bilingües o con estilo, grupos de codificación y equipos que necesitan subtítulos accesibles."
  },
  'pt': {
    title: "Ferramenta de legendas com estilo - unir bilíngues · mode",
    desc: "Ferramenta grátis de legendas com estilo: una dois arquivos em bilíngue ou reestilize uma faixa bilíngue. 5 modelos ASS / 6 VTT, exporta SRT / VTT / ASS.",
    kw: "unir legendas, legendas bilíngues, combinar legendas, legendas com estilo, estilos ASS, estilos VTT, efeitos em legendas, modelo de legenda, ferramenta de legenda grátis, merge subtitles",
    intro: "Una dois arquivos de legenda em bilíngue ou aplique estilo: fonte, cor, contorno e posição, tudo em WYSIWYG.",
    feat: "União e ajuste bilíngue, modelos de estilo ASS / VTT, slots de estilo para ajustar cada valor, correção da timeline no detalhe ou em bloco, e uma prévia que é literalmente o arquivo exportado.",
    who: "Criadores de legendas bilíngues ou estilizadas, grupos de encoding e times que precisam de legendas acessíveis."
  },

  'de': {
    title: "Untertitel mit Stil - zweisprachig zusammenführen · Vorla",
    desc: "Kostenloses Tool für Untertitel mit Stil: zwei Dateien zweisprachig zusammenführen, eine Spur umgestalten. 5 ASS- / 6 VTT-Vorlagen, Ausgabe SRT / VTT / ASS.",
    kw: "untertitel zusammenführen, zweisprachige untertitel, untertitel kombinieren, untertitel mit stil, ASS stile, VTT stile, untertitel effekte, untertitel vorlage, kostenloses untertitel tool",
    intro: "Zwei Untertitel-Dateien zu zweisprachig zusammenführen oder direkt gestalten: Schrift, Farbe, Kontur und Position — WYSIWYG.",
    feat: "Zweisprachiges Zusammenführen und Anpassen, ASS- / VTT-Stilvorlagen, Stil-Slots für jeden Wert, Zeitleisten-Korrektur im Detail oder im Block, und eine Vorschau, die buchstäblich die exportierte Datei ist.",
    who: "Creator für zweisprachige oder gestaltete Untertitel, Encoding-Gruppen und Teams mit Bedarf an barrierefreien Untertiteln."
  },
  'fr': {
    title: "Sous-titres stylisés : fusion bilingue, ASS/VTT | AI-SRTSub",
    desc: "Outil gratuit pour sous-titres stylisés : fusion bilingue, effets, 5 modèles ASS et 6 VTT avec aperçu WYSIWYG. Export SRT/VTT/ASS.",
    kw: "fusionner sous-titres, sous-titres bilingues, combiner sous-titres, sous-titres stylisés, styles ASS, styles VTT, effets sous-titres, modèle sous-titres, outil sous-titres gratuit",
    intro: "Fusionnez deux fichiers de sous-titres en bilingue ou stylisez-les : police, couleur, contour et position, en WYSIWYG.",
    feat: "Fusion et ajustement bilingues, modèles de style ASS / VTT, emplacements de style pour régler chaque valeur, correction de la timeline au détail ou en bloc, et un aperçu qui est littéralement le fichier exporté.",
    who: "Créateurs de sous-titres bilingues ou stylisés, groupes d’encodage et équipes qui ont besoin de sous-titres accessibles."
  },
  'id': {
    title: "Alat subtitle berestet: gabung dwibahasa ASS/VTT | AI-SRTSub",
    desc: "Alat subtitle berestet online gratis: gabung dua file jadi dwibahasa, ubah gaya, tambah efek. 5 template ASS & 6 VTT, ekspor SRT/VTT/ASS.",
    kw: "gabung subtitle, subtitle dwibahasa, menggabungkan subtitle, subtitle bergaya, gaya ASS, gaya VTT, efek subtitle, template subtitle, alat subtitle gratis",
    intro: "Gabung dua file subtitle jadi dwibahasa, atau beri gaya langsung: fon, warna, outline, dan posisi — semuanya WYSIWYG.",
    feat: "Penggabungan dan penyesuaian dwibahasa, template gaya ASS / VTT, slot gaya untuk menyetel tiap nilai, koreksi timeline per titik atau sekaligus, dan pratinjau yang sama persis dengan hasil ekspor.",
    who: "Kreator subtitle dwibahasa atau bergaya, tim encoding, dan tim yang butuh subtitle aksesibel."
  },
  'hi': {
    title: "स्टाइल सबटाइटल टूल - द्विभाषी मर्ज · टेम्पलेट · ASS/VTT इ",
    desc: "मुफ़्त स्टाइल टूल: दो फ़ाइलों को द्विभाषी बनाएँ, द्विभाषी ट्रैक को नया स्टाइल दें या इफ़ेक्ट जोड़ें। ASS 5 / VTT 6 टेम्पलेट, SRT / VTT / ASS में निर्यात।",
    kw: "सबटाइटल मर्ज, द्विभाषी सबटाइटल, सबटाइटल जोड़ें, स्टाइलिश सबटाइटल, ASS स्टाइल, VTT स्टाइल, सबटाइटल इफ़ेक्ट, सबटाइटल टेम्पलेट, मुफ़्त सबटाइटल टूल",
    intro: "दो सबटाइटल फ़ाइलों को द्विभाषी बनाएँ या सीधे स्टाइल दें: फ़ॉन्ट, रंग, आउटलाइन और जगह — WYSIWYG में।",
    feat: "द्विभाषी मर्ज और समायोजन, ASS / VTT स्टाइल टेम्पलेट, हर वैल्यू के लिए स्टाइल स्लॉट, टाइमलाइन की बिंदुवत या सामूहिक सुधार, और प्रीव्यू जो वही फ़ाइल है जो निर्यात होगी।",
    who: "द्विभाषी या स्टाइलिश सबटाइटल बनाने वाले क्रिएटर, एन्कोडिंग टीम, और सुलभ सबटाइटल चाहने वाली टीमें।"
  },
  'th': {
    title: "เครื่องมือซับไตเติลใส่สไตล์ - รวมสองภาษา · แม่แบบ · เอฟเฟ",
    desc: "เครื่องมือซับใส่สไตล์ฟรี: รวมสองไฟล์เป็นสองภาษา ปรับสไตล์ซับสองภาษาใหม่ หรือเพิ่มเอฟเฟกต์ แม่แบบ ASS 5 / VTT 6 แบบ ส่งออก SRT / VTT / ASS",
    kw: "รวมซับไตเติล, ซับสองภาษา, รวมไฟล์ซับ, ซับใส่สไตล์, สไตล์ ASS, สไตล์ VTT, เอฟเฟกต์ซับ, แม่แบบซับ, เครื่องมือซับฟรี",
    intro: "รวมซับสองไฟล์เป็นสองภาษา หรือแต่งสไตล์ได้เลย: ฟอนต์ สี ขอบ และตำแหน่ง — WYSIWYG ทั้งหมด",
    feat: "รวมและปรับสองภาษา, แม่แบบสไตล์ ASS / VTT, ช่องสไตล์ปรับทีละค่า, แก้ไทม์ไลน์ทีละจุดหรือทั้งชุด, และพรีวิวที่ตรงกับไฟล์ที่ส่งออกทุกประการ",
    who: "ครีเอเตอร์ที่ทำซับสองภาษาหรือซับแต่ง ทีมเข้ารหัส และทีมที่ต้องการซับสำหรับผู้บกพร่องทางการได้ยิน"
  },
  'vi': {
    title: "Công cụ phụ đề tạo kiểu - gộp song ngữ · mẫu · hiệu ứng A",
    desc: "Công cụ phụ đề tạo kiểu miễn phí: gộp hai file thành song ngữ, đổi kiểu phụ đề song ngữ có sẵn hoặc thêm hiệu ứng. 5 mẫu ASS / 6 VTT, xuất SRT / VTT / ASS.",
    kw: "gộp phụ đề, phụ đề song ngữ, kết hợp phụ đề, phụ đề tạo kiểu, kiểu ASS, kiểu VTT, hiệu ứng phụ đề, mẫu phụ đề, công cụ phụ đề miễn phí",
    intro: "Gộp hai file phụ đề thành song ngữ hoặc tạo kiểu trực tiếp: phông, màu, viền và vị trí — tất cả WYSIWYG.",
    feat: "Gộp và điều chỉnh song ngữ, mẫu kiểu ASS / VTT, slot kiểu cho từng giá trị, sửa timeline từng điểm hoặc hàng loạt, và bản xem trước chính là file được xuất.",
    who: "Creator làm phụ đề song ngữ hoặc tạo kiểu, nhóm encode, đội cần phụ đề hỗ trợ tiếp cận."
  },

  'ru': {
    title: "Инструмент оформленных субтитров - слияние двуязычных · ш",
    desc: "Бесплатный инструмент для субтитров: объедините два файла в двуязычные или переоформите двуязычную дорожку. 5 шаблонов ASS / 6 VTT, вывод в SRT / VTT / ASS.",
    kw: "объединить субтитры, двуязычные субтитры, соединить субтитры, оформленные субтитры, стили ASS, стили VTT, эффекты субтитров, шаблон субтитров, бесплатный инструмент субтитров",
    intro: "Объедините два файла субтитров в двуязычные или сразу оформите их: шрифт, цвет, контур и положение — всё в WYSIWYG.",
    feat: "Двуязычное слияние и настройка, шаблоны стилей ASS / VTT, слоты стиля для каждой величины, точечная или пакетная правка таймлайна и предпросмотр, буквально равный экспортированному файлу.",
    who: "Авторы двуязычных и оформленных субтитров, группы кодирования и команды, которым нужны доступные субтитры."
  },
  'it': {
    title: "Strumento sottotitoli con stile - unione bilingue · model",
    desc: "Strumento gratuito per sottotitoli con stile: unisci due file in bilingue o ristilizza una traccia bilingue. 5 modelli ASS / 6 VTT, esporta in SRT / VTT / ASS.",
    kw: "unire sottotitoli, sottotitoli bilingue, combinare sottotitoli, sottotitoli con stile, stili ASS, stili VTT, effetti sottotitoli, modello sottotitoli, strumento sottotitoli gratis",
    intro: "Unisci due file di sottotitoli in bilingue o applicali uno stile: font, colore, contorno e posizione — tutto WYSIWYG.",
    feat: "Unione e regolazione bilingue, modelli di stile ASS / VTT, slot di stile per ogni valore, correzione della timeline nel dettaglio o in blocco, e un’anteprima che è letteralmente il file esportato.",
    who: "Creator di sottotitoli bilingue o stilizzati, gruppi di encoding e team che hanno bisogno di sottotitoli accessibili."
  },
  'ar': {
    title: "أداة الترجمة بتنسيق - دمج بلغتين · قوالب · تأثيرات ASS/VT",
    desc: "أداة مجانية للترجمات المنسّقة: ادمج ملفين في ترجمة بلغتين، أعد تنسيق ترجمة بلغتين موجودة، أو أضف تأثيرات. 5 قوالب ASS / 6 VTT، تصدير SRT / VTT / ASS.",
    kw: "دمج الترجمة, ترجمة بلغتين, دمج ملفات الترجمة, ترجمة بتنسيق, أنماط ASS, أنماط VTT, تأثيرات الترجمة, قالب ترجمة, أداة ترجمة مجانية",
    intro: "ادمج ملفي ترجمة في واحد بلغتين، أو أعطهما تنسيقاً مباشرة: الخط واللون والإطار والموضع — كما تراه تماماً.",
    feat: "الدمج والضبط بلغتين، قوالب أنماط ASS / VTT، خانات نمط لضبط كل قيمة، تصحيح التوقيتات نقطة بنقطة أو دفعة واحدة، ومعاينة هي نفسها الملف المُصدَّر.",
    who: "صنّاع الترجمات بلغتين أو المنسّقة، فرق الترميز، والفرق التي تحتاج ترجمات متاحة للجميع."
  },
  'tr': {
    title: "Stil altyazı aracı - iki dilli birleştirme · şablonlar ·",
    desc: "Ücretsiz stil altyazı aracı: iki dosyayı iki dilli hale getirin veya iki dilli altyazıyı yeniden biçimlendirin. 5 ASS / 6 VTT şablonu, SRT / VTT / ASS çıktısı.",
    kw: "altyazı birleştirme, iki dilli altyazı, altyazıları birleştir, stilli altyazı, ASS stilleri, VTT stilleri, altyazı efektleri, altyazı şablonu, ücretsiz altyazı aracı",
    intro: "İki altyazı dosyasını iki dilli yapın ya da doğrudan stil verin: yazı tipi, renk, kontur ve konum — hepsi WYSIWYG.",
    feat: "İki dilli birleştirme ve ayar, ASS / VTT stil şablonları, her değer için stil yuvası, zaman çizelgesinin noktasal veya toplu düzeltilmesi ve düpedüz dışa aktarılan dosyanın kendisi olan önizleme.",
    who: "İki dilli veya stilli altyazı yapan içerik üreticileri, encode ekipleri ve erişilebilir altyazıya ihtiyaç duyan ekipler."
  },
  'nl': {
    title: "Tool voor ondertitels met stijl - tweetalig samenvoegen ·",
    desc: "Gratis tool voor gestylede ondertitels: voeg twee bestanden samen tot tweetalig of herstijl een tweetalig spoor. 5 ASS- / 6 VTT-sjablonen, uitvoer SRT/VTT/ASS.",
    kw: "ondertitels samenvoegen, tweetalige ondertitels, ondertitels combineren, ondertitels met stijl, ASS stijlen, VTT stijlen, ondertitel effecten, ondertitel sjabloon, gratis ondertitel tool",
    intro: "Voeg twee ondertitelbestanden samen tot tweetalig of geef ze direct stijl: lettertype, kleur, contour en positie — allemaal WYSIWYG.",
    feat: "Tweetalig samenvoegen en aanpassen, ASS- / VTT-stijlsjablonen, stijlsleuven voor elke waarde, tijdlijncorrectie per punt of in bulk, en een voorbeeld dat letterlijk het geëxporteerde bestand is.",
    who: "Creators van tweetalige of gestijlde ondertitels, encode-teams en teams die toegankelijke ondertitels nodig hebben."
  },
  'pl': {
    title: "Narzędzie napisów ze stylem - łączenie dwujęzyczne · szab",
    desc: "Darmowe narzędzie do napisów ze stylem: połącz dwa pliki w dwujęzyczne lub zmień styl ścieżki dwujęzycznej. 5 szablonów ASS / 6 VTT, zapis do SRT / VTT / ASS.",
    kw: "łączenie napisów, napisy dwujęzyczne, łączenie plików napisów, napisy ze stylem, style ASS, style VTT, efekty napisów, szablon napisów, darmowe narzędzie napisów",
    intro: "Połącz dwa pliki napisów w dwujęzyczne albo od razu nadaj im styl: font, kolor, kontur i położenie — wszystko WYSIWYG.",
    feat: "Łączenie i dopasowanie dwujęzyczne, szablony stylów ASS / VTT, gniazda stylu dla każdej wartości, korekta osi czasu punktowo lub hurtem oraz podgląd, który jest dosłownie eksportowanym plikiem.",
    who: "Twórcy napisów dwujęzycznych i stylowych, grupy encodingowe i zespoły potrzebujące napisów dostępnych."
  },

  'sv': {
    title: "Verktyg för undertexter med stil - slå ihop tvåspråkigt ·",
    desc: "Gratis verktyg för undertexter med stil: slå ihop två filer till tvåspråkig eller forma om tvåspråkigt spår. 5 ASS- / 6 VTT-mallar, export till SRT / VTT / ASS.",
    kw: "slå ihop undertexter, tvåspråkiga undertexter, kombinera undertexter, undertexter med stil, ASS-stilar, VTT-stilar, undertexteffekter, undertextmall, gratis undertextverktyg",
    intro: "Slå ihop två undertextfiler till tvåspråkig eller ge dem stil direkt: typsnitt, färg, kontur och placering — allt WYSIWYG.",
    feat: "Tvåspråkig sammanslagning och justering, ASS- / VTT-stilmallar, stilplatser för varje värde, tidslinjekorrigering punktvis eller i block, och en förhandsvisning som är exakt den exporterade filen.",
    who: "Kreatörer som gör tvåspråkiga eller stilade undertexter, encodegrupper och team som behöver tillgängliga undertexter."
  },
  'cs': {
    title: "Nástroj pro titulky se stylem - sloučení dvojjazyčných ·",
    desc: "Bezplatný nástroj pro titulky se stylem: spojte dva soubory do dvojjazyčných nebo přestylujte dvojjazyčnou stopu. 5 šablon ASS / 6 VTT, výstup SRT / VTT / ASS.",
    kw: "sloučit titulky, dvojjazyčné titulky, spojit titulky, titulky se stylem, styly ASS, styly VTT, efekty titulků, šablona titulků, bezplatný nástroj titulky",
    intro: "Spojte dva soubory titulků do dvojjazyčných nebo jim rovnou dejte styl: písmo, barva, obrys a pozice — vše WYSIWYG.",
    feat: "Dvojjazyčné sloučení a úprava, šablony stylů ASS / VTT, sloty stylu pro každou hodnotu, oprava časové osy po bodech nebo hromadně a náhled, který je doslova exportovaný soubor.",
    who: "Tvůrci dvojjazyčných a stylovaných titulků, encode skupiny a týmy, které potřebují přístupné titulky."
  },
  'uk': {
    title: "Інструмент оформлених субтитрів - злиття двомовних · шабл",
    desc: "Безплатний інструмент для субтитрів: об'єднайте два файли в двомовні або переоформіть двомовну доріжку. 5 шаблонів ASS / 6 VTT, вивід у SRT / VTT / ASS.",
    kw: "об’єднати субтитри, двомовні субтитри, поєднати субтитри, оформлені субтитри, стилі ASS, стилі VTT, ефекти субтитрів, шаблон субтитрів, безплатний інструмент субтитрів",
    intro: "Об’єднайте два файли субтитрів у двомовні або відразу оформіть їх: шрифт, колір, контур і позиція — усе в WYSIWYG.",
    feat: "Двомовне злиття і налаштування, шаблони стилів ASS / VTT, слоти стилю для кожного значення, точкове або пакетне виправлення таймлайну і попередній перегляд, що буквально дорівнює експортованому файлу.",
    who: "Автори двомовних і оформлених субтитрів, групи кодування та команди, яким потрібні доступні субтитри."
  },
  'da': {
    title: "Værktøj til undertekster med stil - slå tosproget sammen",
    desc: "Gratis værktøj til undertekster med stil: sæt to filer sammen til tosproget eller omstil et tosproget spor. 5 ASS- / 6 VTT-skabeloner, output SRT / VTT / ASS.",
    kw: "slå undertekster sammen, tosprogede undertekster, kombiner undertekster, undertekster med stil, ASS-stile, VTT-stile, underteksteffekter, undertekstskabelon, gratis undertekstværktøj",
    intro: "Sæt to undertekstfiler sammen til tosproget, eller giv dem stil med det samme: skrifttype, farve, kontur og placering — det hele i WYSIWYG.",
    feat: "Tosproget sammenlægning og justering, ASS- / VTT-stilskabeloner, stil-pladser til hver værdi, rettelse af tidslinjen punktvist eller i blok, og en forhåndsvisning der bogstaveligt er den eksporterede fil.",
    who: "Kreative der laver tosprogede eller stilede undertekster, encode-grupper og teams der har brug for tilgængelige undertekster."
  },
  'fi': {
    title: "Tyyliteltyjen tekstitysten työkalu - kaksikielisten yhdis",
    desc: "Ilmainen tyyliteltyjen tekstitysten työkalu: yhdistä tiedostot kaksikieliseksi tai muotoile raita uudelleen. 5 ASS- / 6 VTT-mallia, vienti SRT / VTT / ASS.",
    kw: "yhdistä tekstitykset, kaksikieliset tekstitykset, yhdistä tekstitystiedostot, tyylitellyt tekstitykset, ASS-tyylit, VTT-tyylit, tekstitystehosteet, tekstitysmalli, ilmainen tekstitystyökalu",
    intro: "Yhdistä kaksi tekstitystiedostoa kaksikieliseksi tai anna niille tyyli suoraan: fontti, väri, ääriviiva ja sijainti — kaikki WYSIWYG.",
    feat: "Kaksikielinen yhdistäminen ja säätö, ASS- / VTT-tyylimallit, tyylipaikat jokaiselle arvolle, aikajanan korjaus kohdittain tai erissä ja esikatselu, joka on kirjaimellisesti viety tiedosto.",
    who: "Kaksikielisiä tai tyyliteltyjä tekstityksiä tekevät tekijät, encode-ryhmät ja tiimit, jotka tarvitsevat saavutettavia tekstityksiä."
  },
  'el': {
    title: "Εργαλείο υποτίτλων με στυλ - συγχώνευση δίγλωσσων · πρότυ",
    desc: "Δωρεάν εργαλείο για υπότιτλους με στυλ: ενώστε δύο αρχεία σε δίγλωσσο ή αλλάξτε στυλ δίγλωσσου κομματιού. 5 πρότυπα ASS / 6 VTT, εξαγωγή σε SRT / VTT / ASS.",
    kw: "συγχώνευση υποτίτλων, δίγλωσσοι υπότιτλοι, ένωση υποτίτλων, υπότιτλοι με στυλ, στυλ ASS, στυλ VTT, εφέ υποτίτλων, πρότυπο υποτίτλων, δωρεάν εργαλείο υποτίτλων",
    intro: "Ενώστε δύο αρχεία υποτίτλων σε δίγλωσσο ή δώστε τους στυλ απευθείας: γραμματοσειρά, χρώμα, περίγραμμα και θέση — όλα WYSIWYG.",
    feat: "Δίγλωσση συγχώνευση και προσαρμογή, πρότυπα στυλ ASS / VTT, υποδοχές στυλ για κάθε τιμή, διόρθωση χρονικής γραμμής σημειακά ή μαζικά, και προεπισκόπηση που είναι κυριολεκτικά το εξαγόμενο αρχείο.",
    who: "Δημιουργοί δίγλωσσων ή στυλιζαρισμένων υποτίτλων, ομάδες encoding και ομάδες που χρειάζονται προσβάσιμους υπότιτλους."
  },
  'he': {
    title: "כלי כתוביות עם סגנון - מיזוג דו-לשוני · תבניות · אפקטים A",
    desc: "כלי חינם לכתוביות עם סגנון: חברו שני קבצים לדו-לשוני, עצבו מחדש רצועה דו-לשונית או הוסיפו אפקטים. 5 תבניות ASS ו-6 VTT, ייצוא ל-SRT / VTT / ASS.",
    kw: "מיזוג כתוביות, כתוביות דו-לשוניות, שילוב כתוביות, כתוביות עם סגנון, סגנונות ASS, סגנונות VTT, אפקטים לכתוביות, תבנית כתוביות, כלי כתוביות חינם",
    intro: "חברו שני קבצי כתוביות לדו-לשוני או תנו להן סגנון ישר: גופן, צבע, מסגרת ומיקום — הכל WYSIWYG.",
    feat: "מיזוג וכוונון דו-לשוני, תבניות סגנון ASS / VTT, חריצי סגנון לכל ערך, תיקון ציר הזמן נקודתית או בקבוצות, ותצוגה מקדימה שהיא פשוט הקובץ שייצא.",
    who: "יוצרים של כתוביות דו-לשוניות או מעוצבות, צוותי קידוד, וצוותים שצריכים כתוביות נגישות."
  },
  'ro': {
    title: "Subtitrări cu stil: bilingv, șabloane ASS/VTT | AI-SRTSub",
    desc: "Instrument online gratuit: îmbină două subtitrări într-una bilingvă, cu șabloane ASS/VTT și previzualizare. Export SRT/VTT/ASS.",
    kw: "îmbinare subtitrări, subtitrări bilingve, combinare subtitrări, subtitrări cu stil, stiluri ASS, stiluri VTT, efecte subtitrări, șablon subtitrări, instrument subtitrări gratuit",
    intro: "Îmbină două fișiere de subtitrări într-unul bilingv sau dă-le stil direct: font, culoare, contur și poziție — totul WYSIWYG.",
    feat: "Îmbinare și ajustare bilingvă, șabloane de stil ASS / VTT, sloturi de stil pentru fiecare valoare, corecția timeline-ului punctual sau în bloc, și o previzualizare care este chiar fișierul exportat.",
    who: "Creators de subtitrări bilingve sau stilizate, echipe de encoding și echipe care au nevoie de subtitrări accesibile."
  },
};
const SEO_CLEAN = {
  'zh-CN': {
    title: '字幕清洗器 - 去水印广告 · 听障提示 · 修乱码 | 随心字幕 AI',
    desc: '免费在线字幕清洗工具：去掉字幕组水印与广告、听障提示、HTML 标签、ASS 特效，修复全大写与乱码，13 条规则随手开关，每条改动可单独还原，不动时间轴。',
    kw: '字幕清洗,srt清洗,去字幕水印,去听障字幕,SDH字幕,去说话人,字幕去广告,字幕乱码修复,字幕去标签,ASS去特效,subtitle cleaner,clean srt',
    intro: '下载来的字幕先过一遍：水印、广告、听障提示、HTML 标签一次剔干净。',
    feat: '13 条规则分四类（默认开 9 条）、去水印广告与听障提示、修全大写与乱码、逐条列出改了什么并可单独还原、时间轴一律不动。',
    who: '拿到现成字幕想直接用的人、要批量整理素材的字幕组。',
    siteName: '随心字幕 AI', jsonldName: '随心字幕 AI', jsonldAlt: 'AI-SRTSub'
  },
  'en': {
    title: 'Subtitle Cleaner - Strip Watermarks, SDH Cues & HTML Tags',
    desc: "Free online subtitle cleaner: strip watermarks, ads, SDH, HTML tags, ASS effects; fix caps, mojibake. 13 switchable rules, undo per change, timeline untouched.",
    kw: 'subtitle cleaner, clean srt file, remove subtitle watermark, remove SDH subtitles, remove HTML tags from subtitles, fix all caps subtitles, fix mojibake, remove hearing impaired subtitles, strip ASS effects',
    intro: 'Run a downloaded subtitle through here first: watermarks, ads, SDH cues and HTML tags, gone in one pass.',
    feat: '13 rules in four groups (9 on by default), watermark and SDH removal, all-caps and mojibake fixes, per-cue change list with individual revert, and the timing is never touched.',
    who: 'Anyone who grabbed an existing subtitle and just wants it usable, and groups batch-cleaning material.'
  }
,
  'zh-TW': {
    title: "字幕清洗器 - 去浮水印廣告 · 聽障提示 · 修亂碼 | 隨心字幕 AI",
    desc: "免費線上字幕清洗工具：去掉字幕組浮水印與廣告、聽障提示、HTML 標籤、ASS 特效，修復全大寫與亂碼。13 條規則隨手開關，每條改動可單獨還原，不改時間軸。",
    kw: "字幕清洗,srt清洗,去字幕浮水印,去聽障字幕,SDH字幕,去說話人,字幕去廣告,字幕亂碼修復,字幕去標籤,ASS去特效,subtitle cleaner,clean srt",
    intro: "下載來的字幕先過一遍：浮水印、廣告、聽障提示、HTML 標籤一次剔乾淨。",
    feat: "13 條規則分四類（預設開 9 條）、去浮水印廣告與聽障提示、修全大寫與亂碼、逐條列出改了什麼並可單獨還原、時間軸一律不改。",
    who: "拿到現成字幕想直接用的人、要批量整理素材的字幕組。",
    siteName: "隨心字幕 AI", jsonldName: "隨心字幕 AI", jsonldAlt: "AI-SRTSub"
  },
  'ja': {
    title: "字幕クリーニング - ウォーターマーク広告・聴覚障害者向け表",
    desc: "無料のオンライン字幕クリーニングツール：字幕組のウォーターマークと広告、聴覚障害者向け表記、HTMLタグ、ASS装飾を除去し、全角大文字と文字化けを修復。13項目のルールを個別に切替、変更は一件ずつ取り消し可能、時間軸は不変更。",
    kw: "字幕クリーニング,srt クリーニング,字幕 ウォーターマーク 除去,SDH 字幕 削除,字幕 広告 除去,字幕 文字化け 修正,字幕 タグ 除去,ASS 装飾 除去,subtitle cleaner",
    intro: "落としてきた字幕はまずここに通しましょう。ウォーターマーク、広告、聴覚障害者向け表記、HTMLタグを一度に除去します。",
    feat: "13項目のルールを4グループに分類（既定で9項目ON）、ウォーターマークと広告・SDHの除去、全角大文字と文字化けの修復、変更点を一件ずつ表示して個別に取り消し、時間軸は一切変更しません。",
    who: "入手した字幕をそのまま使いたい人、素材をまとめて整えたい字幕チーム。"
  },
  'ko': {
    title: "자막 정리 도구 - 워터마크 광고 · 청각 장애인용 표기 · 깨",
    desc: "무료 온라인 자막 정리 도구: 자막팀 워터마크와 광고, 청각 장애인용 표기, HTML 태그, ASS 효과를 제거하고 전체 대문자와 깨진 글자를 고칩니다. 13개 규칙을 자유롭게 켜고 끌 수 있고, 바뀐 내용은 하나씩 되돌릴 수 있으며 시간축은 그대로입니다.",
    kw: "자막 정리,srt 정리,자막 워터마크 제거,SDH 자막 제거,자막 광고 제거,자막 깨짐 복구,자막 태그 제거,ASS 효과 제거,subtitle cleaner",
    intro: "다운받은 자막은 먼저 여기 한 번 통과시키세요. 워터마크, 광고, 청각 장애인용 표기, HTML 태그를 한 번에 걷어냅니다.",
    feat: "13개 규칙을 4개 그룹으로 구성(기본 9개 켜짐), 워터마크·광고·SDH 제거, 전체 대문자와 깨진 글자 수정, 바뀐 내용을 자막별로 표시하고 개별 복원, 시간축은 절대 건드리지 않습니다.",
    who: "받은 자막을 바로 쓰고 싶은 사람, 자료를 한꺼번에 정리하는 자막팀."
  },
  'es': {
    title: "Limpiador de subtítulos - quita marcas de agua, avisos SD",
    desc: "Limpiador de subtítulos gratis: quita marcas de agua, anuncios, SDH, etiquetas HTML, efectos ASS; corrige mayúsculas y mojibake. 13 reglas, deshacer por cambio.",
    kw: "limpiar subtitulos, limpiar srt, quitar marca de agua subtitulos, quitar subtitulos SDH, quitar anuncios subtitulos, arreglar caracteres corruptos, quitar etiquetas html subtitulos",
    intro: "Pasa primero los subtítulos descargados por aquí: marcas de agua, anuncios, avisos SDH y etiquetas HTML, fuera en una pasada.",
    feat: "13 reglas en cuatro grupos (9 activas por defecto), eliminación de marcas de agua, anuncios y SDH, corrección de mayúsculas y caracteres corruptos, lista de cambios por rótulo con reversión individual y tiempos intactos.",
    who: "Quien tiene subtítulos hechos y quiere usarlos ya, y los grupos que limpian material por lotes."
  },
  'pt': {
    title: "Limpador de legendas - remove marcas d’água, avisos SDH e",
    desc: "Limpador de legendas grátis: remove marcas d'água, SDH, tags HTML e efeitos ASS; corrige maiúsculas e caracteres corrompidos. 13 regras, desfaça por item.",
    kw: "limpar legendas, limpar srt, remover marca d’água legenda, remover SDH legenda, remover anúncios legenda, corrigir caracteres corrompidos, remover tags html legenda",
    intro: "Passe as legendas baixadas primeiro por aqui: marcas d’água, anúncios, avisos SDH e tags HTML saem de uma vez.",
    feat: "13 regras em quatro grupos (9 ativas por padrão), remoção de marcas d’água, anúncios e SDH, correção de maiúsculas e caracteres corrompidos, lista de mudanças por legenda com reversão individual e tempos intactos.",
    who: "Quem tem legendas prontas e quer usar agora, e os grupos que limpam material em lote."
  },

  'de': {
    title: "Untertitel-Reiniger - entfernt Wasserzeichen, SDH-Hinweis",
    desc: "Untertitel reinigen: Wasserzeichen, Werbung, SDH, HTML-Tags und ASS-Effekte entfernen; Großschreibung und kaputte Zeichen korrigieren. 13 schaltbare Regeln.",
    kw: "untertitel reinigen, srt reinigen, wasserzeichen aus untertiteln entfernen, SDH untertitel entfernen, werbung aus untertiteln entfernen, zeichensalat reparieren, html tags untertitel entfernen",
    intro: "Heruntergeladene Untertitel zuerst hier durchlaufen lassen: Wasserzeichen, Werbung, SDH-Hinweise und HTML-Tags sind in einem Durchgang weg.",
    feat: "13 Regeln in vier Gruppen (9 standardmäßig aktiv), Wasserzeichen-, Werbe- und SDH-Entfernung, Korrektur von Großbuchstaben und Zeichensalat, Änderungsliste pro Titel mit einzelnem Rückgängig und unangetastete Zeiten.",
    who: "Alle, die fertige Untertitel einfach nutzen wollen, und Gruppen, die Material im Batch reinigen."
  },
  'fr': {
    title: "Nettoyeur de sous-titres - supprime filigranes, indicatio",
    desc: "Nettoyeur de sous-titres gratuit : supprime filigranes, pubs, SDH, balises HTML et effets ASS; corrige majuscules et caractères cassés. 13 règles réversibles.",
    kw: "nettoyer sous-titres, nettoyer srt, retirer filigrane sous-titres, retirer sous-titres SDH, retirer publicités sous-titres, réparer caractères corrompus, retirer balises html sous-titres",
    intro: "Faites d’abord passer les sous-titres téléchargés ici : filigranes, pubs, indications SDH et balises HTML disparaissent en une passe.",
    feat: "13 règles en quatre groupes (9 actives par défaut), suppression des filigranes, pubs et SDH, correction des majuscules et caractères corrompus, liste des modifications par sous-titre avec annulation individuelle et temps intacts.",
    who: "Quiconque a des sous-titres prêts et veut les utiliser tout de suite, et les groupes qui nettoient du matériel par lots."
  },
  'id': {
    title: "Pembersih subtitle - hapus watermark, penanda SDH dan kar",
    desc: "Pembersih subtitle gratis: hapus watermark, iklan, penanda SDH, tag HTML dan efek ASS; perbaiki karakter rusak. 13 aturan, batalkan satu per satu.",
    kw: "bersihkan subtitle, bersihkan srt, hapus watermark subtitle, hapus subtitle SDH, hapus iklan subtitle, perbaiki karakter rusak, hapus tag html subtitle",
    intro: "Lewatkan subtitle yang sudah diunduh ke sini dulu: watermark, iklan, penanda SDH, dan tag HTML hilang dalam satu kali jalan.",
    feat: "13 aturan dalam empat kelompok (9 aktif bawaan), penghapusan watermark, iklan dan SDH, perbaikan huruf kapital dan karakter rusak, daftar perubahan per subtitle dengan pembatalan satuan, serta waktu yang tetap utuh.",
    who: "Siapa pun yang punya subtitle jadi dan ingin langsung memakainya, serta tim yang membersihkan materi sekaligus."
  },
  'hi': {
    title: "सबटाइटल क्लीनर - वॉटरमार्क, SDH संकेत और गड़बड़ अक्षर हटा",
    desc: "मुफ़्त ऑनलाइन सबटाइटल क्लीनर: वॉटरमार्क, विज्ञापन, SDH, HTML टैग और ASS इफ़ेक्ट हटाता है; ऑल-कैप्स और गड़बड़ अक्षर ठीक करता है। 13 नियम, हर बदलाव अलग से वापस।",
    kw: "सबटाइटल साफ़ करें, srt साफ़ करें, सबटाइटल वॉटरमार्क हटाएँ, SDH सबटाइटल हटाएँ, सबटाइटल विज्ञापन हटाएँ, गड़बड़ अक्षर ठीक करें, html टैग हटाएँ",
    intro: "डाउनलोड किए सबटाइटल पहले यहाँ से गुज़ारें: वॉटरमार्क, विज्ञापन, SDH संकेत और HTML टैग एक ही पास में हट जाते हैं।",
    feat: "चार समूहों में 13 नियम (डिफ़ॉल्ट 9 चालू), वॉटरमार्क·विज्ञापन·SDH हटाना, बड़े अक्षरों और गड़बड़ अक्षरों की मरम्मत, हर सबटाइटल के बदलाव की सूची और अलग से वापसी, और समय बिलकुल सुरक्षित।",
    who: "जिनके पास तैयार सबटाइटल हैं और उन्हें तुरंत इस्तेमाल करना है, और जो टीमें सामग्री बैच में साफ़ करती हैं।"
  },
  'th': {
    title: "เครื่องมือล้างซับไตเติล - ลบลายน้ำ โฆษณา ป้าย SDH และตัวอ",
    desc: "เครื่องมือล้างซับออนไลน์ฟรี: ลบลายน้ำ โฆษณา ป้าย SDH แท็ก HTML และเอฟเฟกต์ ASS แก้ตัวพิมพ์ใหญ่และตัวอักษรเพี้ยน 13 กฎเปิดปิดได้ ย้อนกลับทีละจุด ไม่แตะไทม์ไลน์",
    kw: "ล้างซับไตเติล, ล้าง srt, ลบลายน้ำซับ, ลบซับ SDH, ลบโฆษณาซับ, ซ่อมตัวอักษรเพี้ยน, ลบแท็ก html ซับ",
    intro: "เอาซับที่โหลดมากรองผ่านที่นี่ก่อน: ลายน้ำ โฆษณา ป้าย SDH และแท็ก HTML หายในรอบเดียว",
    feat: "13 กฎใน 4 กลุ่ม (เปิดมา 9 ข้อ), ลบลายน้ำ โฆษณา และ SDH, แก้ตัวพิมพ์ใหญ่และตัวอักษรเพี้ยน, รายการเปลี่ยนแปลงรายซับพร้อมย้อนกลับรายการ และไทม์ไลน์คงเดิม",
    who: 'ใครก็ตามที่มีซับพร้อมแล้วและอยากใช้เลย รวมถึงทีมที่ต้องล้างซับเป็นชุด'
  },
  'vi': {
    title: "Công cụ làm sạch phụ đề - xóa watermark, ký hiệu SDH và k",
    desc: "Công cụ làm sạch phụ đề online miễn phí: xóa watermark, quảng cáo, SDH, thẻ HTML và hiệu ứng ASS; sửa chữ viết hoa và ký tự lỗi. 13 quy tắc, hoàn tác riêng.",
    kw: "làm sạch phụ đề, làm sạch srt, xóa watermark phụ đề, xóa phụ đề SDH, xóa quảng cáo phụ đề, sửa ký tự lỗi, xóa thẻ html phụ đề",
    intro: "Cho phụ đề đã tải qua đây trước: watermark, quảng cáo, ký hiệu SDH và thẻ HTML biến mất trong một lượt.",
    feat: "13 quy tắc trong bốn nhóm (9 bật sẵn), xóa watermark, quảng cáo và SDH, sửa viết hoa và ký tự lỗi, danh sách thay đổi theo từng phụ đề với hoàn tác riêng, và thời gian giữ nguyên.",
    who: "Ai có phụ đề có sẵn và muốn dùng ngay, cùng các nhóm làm sạch tài liệu theo lô."
  },

  'ru': {
    title: "Очиститель субтитров - удаляет водяные знаки, пометки SDH",
    desc: "Бесплатный онлайн-очиститель субтитров: удаляет водяные знаки, рекламу, SDH, HTML-теги и эффекты ASS; исправляет КАПС и кракозябры. 13 правил, откат по одному.",
    kw: "очистить субтитры, очистить srt, удалить водяной знак субтитров, удалить субтитры SDH, удалить рекламу из субтитров, исправить кракозябры, удалить html теги субтитров",
    intro: "Сначала прогоните скачанные субтитры здесь: водяные знаки, реклама, пометки SDH и HTML-теги исчезают за один проход.",
    feat: "13 правил в четырёх группах (9 включены по умолчанию), удаление водяных знаков, рекламы и SDH, исправление заглавных букв и кракозябр, список изменений по титрам с отменой каждого и нетронутые таймкоды.",
    who: "Те, у кого уже есть субтитры и нужно их просто использовать, и команды, чистящие материал пакетами."
  },
  'it': {
    title: "Pulitore di sottotitoli - rimuove filigrane, indicazioni",
    desc: "Pulitore di sottotitoli gratuito: rimuove filigrane, pubblicità, SDH, tag HTML ed effetti ASS; sistema maiuscole e caratteri rotti. 13 regole, annullabile.",
    kw: "pulire sottotitoli, pulire srt, rimuovere filigrana sottotitoli, rimuovere sottotitoli SDH, rimuovere pubblicità sottotitoli, riparare caratteri corrotti, rimuovere tag html sottotitoli",
    intro: "Fai passare prima i sottotitoli scaricati da qui: filigrane, pubblicità, indicazioni SDH e tag HTML spariscono in una passata.",
    feat: "13 regole in quattro gruppi (9 attive di default), rimozione di filigrane, pubblicità e SDH, correzione di maiuscole e caratteri corrotti, elenco delle modifiche per sottotitolo con annullamento singolo e tempi intatti.",
    who: "Chi ha già dei sottotitoli e vuole usarli subito, e i gruppi che puliscono materiale in blocco."
  },
  'ar': {
    title: "منظّف الترجمة - يزيل العلامات المائية وإشارات SDH والأحرف",
    desc: "منظّف ترجمة مجاني: يزيل العلامات المائية والإعلانات وإشارات SDH ووسوم HTML وتأثيرات ASS؛ ويصلح الكتابة بأحرف كبيرة والأحرف التالفة. 13 قاعدة، تراجع فردي.",
    kw: "تنظيف الترجمة, تنظيف srt, إزالة العلامة المائية من الترجمة, إزالة ترجمة SDH, إزالة الإعلانات من الترجمة, إصلاح الأحرف التالفة, إزالة وسوم html من الترجمة",
    intro: "مرّر الترجمة التي حمّلتها من هنا أولاً: العلامات المائية والإعلانات وإشارات SDH ووسوم HTML تختفي بمرور واحد.",
    feat: "13 قاعدة في أربع مجموعات (9 مفعّلة افتراضياً)، إزالة العلامات المائية والإعلانات وSDH، إصلاح الأحرف الكبيرة والتالفة، قائمة بالتغييرات لكل ترجمة مع تراجع منفرد، والتوقيتات سليمة تماماً.",
    who: "من لديه ترجمة جاهزة ويريد استخدامها فوراً، والفرق التي تنظّف المواد على دفعات."
  },
  'tr': {
    title: "Altyazı temizleyici - filigranları, SDH işaretlerini ve b",
    desc: "Ücretsiz altyazı temizleyici: filigranları, reklamları, SDH, HTML ve ASS etiketlerini siler; büyük harf, bozuk karakterleri düzeltir. 13 kural, geri alınabilir.",
    kw: "altyazı temizleme, srt temizleme, altyazıdan filigran kaldırma, SDH altyazı kaldırma, altyazıdan reklam kaldırma, bozuk karakter onarma, html etiketlerini kaldırma",
    intro: "İndirdiğiniz altyazıyı önce buradan geçirin: filigranlar, reklamlar, SDH işaretleri ve HTML etiketleri tek geçişte silinir.",
    feat: "Dört grupta 13 kural (9’u varsayılan açık), filigran · reklam · SDH silme, büyük harf ve bozuk karakter düzeltme, altyazı başına değişiklik listesi ve tek tek geri alma, zamanlar ise hiç dokunulmadan kalır.",
    who: "Hazır altyazısı olup hemen kullanmak isteyenler ve malzemeyi toplu temizleyen ekipler."
  },
  'nl': {
    title: "Ondertitel-schoonmaker - verwijdert watermerken, SDH-mark",
    desc: "Gratis ondertitel-schoonmaker: verwijdert watermerken, reclame, SDH, HTML- en ASS-tags; herstelt hoofdletters en kapotte tekens. 13 regels, terug te draaien.",
    kw: "ondertitels schoonmaken, srt schoonmaken, watermerk uit ondertitels verwijderen, SDH ondertitels verwijderen, reclame uit ondertitels verwijderen, corrupte tekens herstellen, html tags verwijderen",
    intro: "Haal gedownloade ondertitels eerst hier doorheen: watermerken, reclame, SDH-markeringen en HTML-tags verdwijnen in één keer.",
    feat: "13 regels in vier groepen (9 standaard aan), verwijdering van watermerken, reclame en SDH, herstel van hoofdletters en corrupte tekens, wijzigingenlijst per ondertitel met individuele terugdraai en intacte tijden.",
    who: "Wie kant-en-klare ondertitels heeft en ze meteen wil gebruiken, en teams die materiaal in bulk schoonmaken."
  },
  'pl': {
    title: "Czyścik napisów - usuwa znaki wodne, oznaczenia SDH i krz",
    desc: "Darmowy czyścik napisów online: usuwa znaki wodne, reklamy, SDH, tagi HTML i efekty ASS; naprawia WIELKIE LITERY i krzaki. 13 reguł, cofaj po jednej.",
    kw: "czyszczenie napisów, czyszczenie srt, usuwanie znaku wodnego z napisów, usuwanie napisów SDH, usuwanie reklam z napisów, naprawa krzaków, usuwanie tagów html",
    intro: "Przepuść pobrane napisy najpierw tutaj: znaki wodne, reklamy, oznaczenia SDH i tagi HTML znikają w jednym przebiegu.",
    feat: "13 reguł w czterech grupach (9 domyślnie włączonych), usuwanie znaków wodnych, reklam i SDH, naprawa wielkich liter i krzaków, lista zmian per napis z osobnym cofnięciem i nienaruszalne czasy.",
    who: "Ktoś, kto ma gotowe napisy i chce ich zaraz użyć, oraz grupy czyszczące materiał hurtowo."
  },

  'sv': {
    title: "Rensare för undertexter - tar bort vattenmärken, SDH-mark",
    desc: "Gratis rensning av undertexter: tar bort vattenmärken, reklam, SDH, HTML-taggar och ASS-effekter; åtgärdar VERSALER, trasiga tecken. 13 regler, ångra enskilt.",
    kw: "rensa undertexter, rensa srt, ta bort vattenmärke undertexter, ta bort SDH-undertexter, ta bort reklam undertexter, reparera trasiga tecken, ta bort html-taggar",
    intro: "Kör nedladdade undertexter hit först: vattenmärken, reklam, SDH-markeringar och HTML-taggar försvinner i ett svep.",
    feat: "13 regler i fyra grupper (9 på som standard), borttagning av vattenmärken, reklam och SDH, åtgärd av versaler och trasiga tecken, ändringslista per undertext med enskild ångra och intakta tider.",
    who: "Den som har färdiga undertexter och vill använda dem direkt, och grupper som rensar material i batch."
  },
  'cs': {
    title: "Čistič titulků - odstraní vodoznaky, SDH značky a rozbité",
    desc: "Bezplatný čistič titulků: odstraní vodoznaky, reklamu, SDH, HTML tagy a ASS efekty; opraví VELKÁ PÍSMENA a rozbité znaky. 13 pravidel, vrátit po jedné.",
    kw: "vyčistit titulky, vyčistit srt, odstranit vodoznak titulků, odstranit SDH titulky, odstranit reklamu z titulků, opravit rozbité znaky, odstranit html tagy",
    intro: "Stažené titulky nejdřív prožeňte tudy: vodoznaky, reklama, SDH značky a HTML tagy zmizí v jednom průchodu.",
    feat: "13 pravidel ve čtyřech skupinách (9 ve výchozím stavu zapnuto), odstranění vodoznaků, reklamy a SDH, oprava velkých písmen a rozbitých znaků, seznam změn po titulcích s jednotlivým vrácením a netknuté časy.",
    who: "Kdo má hotové titulky a chce je hned použít, a týmy, které čistí materiál po dávkách."
  },
  'uk': {
    title: "Очищувач субтитрів - видаляє водяні знаки, позначки SDH і",
    desc: "Безплатний очищувач субтитрів: видаляє водяні знаки, рекламу, SDH, HTML-теги й ефекти ASS; виправляє ВЕЛИКІ ЛІТЕРИ та кракозябри. 13 правил, скасування окремо.",
    kw: "очистити субтитри, очистити srt, видалити водяний знак субтитрів, видалити субтитри SDH, видалити рекламу з субтитрів, виправити кракозябри, видалити html теги",
    intro: "Спершу проженіть завантажені субтитри тут: водяні знаки, реклама, позначки SDH і HTML-теги зникають за один прохід.",
    feat: "13 правил у чотирьох групах (9 увімкнено за замовчуванням), видалення водяних знаків, реклами і SDH, виправлення великих літер і кракозябрів, перелік змін по титрах з окремим скасуванням і недоторкані таймкоди.",
    who: "Ті, хто має готові субтитри й хоче просто ними користуватися, та команди, що чистять матеріал пакетами."
  },
  'da': {
    title: "Renser til undertekster - fjerner vandmærker, SDH-markeri",
    desc: "Gratis renser: fjerner vandmærker, reklamer, SDH, HTML-tags og ASS-effekter; retter VERSALER og ødelagte tegn. 13 regler at slå til/fra, fortryd enkeltvis.",
    kw: "rense undertekster, rense srt, fjerne vandmærke undertekster, fjerne SDH undertekster, fjerne reklamer undertekster, reparere ødelagte tegn, fjerne html tags",
    intro: "Kør downloadede undertekster igennem her først: vandmærker, reklamer, SDH-markeringer og HTML-tags forsvinder på én gang.",
    feat: "13 regler i fire grupper (9 slået til som standard), fjernelse af vandmærker, reklamer og SDH, rettelse af versaler og ødelagte tegn, ændringsliste per undertekst med individuel fortryd og intakte tider.",
    who: "Alle der har færdige undertekster og vil bruge dem med det samme, og grupper der renser materiale i bundter."
  },
  'fi': {
    title: "Tekstitysten puhdistaja - poistaa vesileimat, SDH-merkinn",
    desc: "Ilmainen tekstitysten puhdistus: poistaa vesileimat, SDH-merkinnät, HTML-tagit ja ASS-tehosteet; korjaa ISOILLA kirjoitetun ja rikkinäiset merkit. 13 sääntöä.",
    kw: "puhdista tekstitykset, puhdista srt, poista vesileima tekstityksistä, poista SDH-tekstitykset, poista mainokset tekstityksistä, korjaa rikkinäiset merkit, poista html-tagit",
    intro: "Aja ladatut tekstitykset ensin tämän kautta: vesileimat, mainokset, SDH-merkinnät ja HTML-tagit poistuvat yhdellä kertaa.",
    feat: "13 sääntöä neljässä ryhmässä (9 oletuksena päällä), vesileimojen, mainosten ja SDH:n poisto, isojen kirjainten ja rikkinäisten merkkien korjaus, muutoslista per tekstitys yksittäisellä peruutuksella ja koskemattomat ajat.",
    who: "Kaikki joilla on valmiit tekstitykset ja jotka haluavat käyttää niitä heti, sekä ryhmät jotka puhdistavat materiaalia erissä."
  },
  'el': {
    title: "Καθαριστής υποτίτλων - αφαιρεί υδατογραφήματα, σημάνσεις",
    desc: "Δωρεάν καθαριστής υποτίτλων: αφαιρεί υδατογραφήματα, διαφημίσεις, SDH, ετικέτες HTML και εφέ ASS· διορθώνει ΚΕΦΑΛΑΙΑ και χαλασμένους χαρακτήρες. 13 κανόνες.",
    kw: "καθαρισμός υποτίτλων, καθαρισμός srt, αφαίρεση υδατογραφήματος υποτίτλων, αφαίρεση SDH υποτίτλων, αφαίρεση διαφημίσεων υποτίτλων, επιδιόρθωση χαλασμένων συμβόλων, αφαίρεση ετικετών html",
    intro: "Περάστε πρώτα τους κατεβασμένους υπότιτλους από εδώ: υδατογραφήματα, διαφημίσεις, σημάνσεις SDH και ετικέτες HTML εξαφανίζονται με μία.",
    feat: "13 κανόνες σε τέσσερις ομάδες (9 ενεργοί εξ ορισμού), αφαίρεση υδατογραφημάτων, διαφημίσεων και SDH, διόρθωση κεφαλαίων και χαλασμένων συμβόλων, λίστα αλλαγών ανά υπότιτλο με μεμονωμένη αναίρεση και άθικτοι χρόνοι.",
    who: "Όποιος έχει έτοιμους υπότιτλους και θέλει να τους χρησιμοποιήσει αμέσως, και οι ομάδες που καθαρίζουν υλικό σε παρτίδες."
  },
  'he': {
    title: "מנקה כתוביות - מסיר סימני מים, SDH ותווים שבורים | AI-SRTSub",
    desc: "מנקה כתוביות מקוון חינם: מסיר סימני מים, פרסומות, סימוני SDH, תגי HTML ואפקטים ASS; מתקן תווים שבורים. 13 כללים, שינוי ניתן לביטול, והזמנים לא זזים.",
    kw: "ניקוי כתוביות, ניקוי srt, הסרת סימן מים מכתוביות, הסרת כתוביות SDH, הסרת פרסומות מכתוביות, תיקון תווים שבורים, הסרת תגי html",
    intro: "העבירו קודם את הכתוביות שהורדתם דרך כאן: סימני מים, פרסומות, סימוני SDH ותגי HTML נעלמים במעבר אחד.",
    feat: "13 כללים בארבע קבוצות (9 פעילים כברירת מחדל), הסרת סימני מים, פרסומות ו-SDH, תיקון אותיות גדולות ותווים שבורים, רשימת שינויים לכל כתובית עם ביטול נפרד, וזמנים שנשארים שלמים.",
    who: "מי שיש לו כתוביות מוכנות ורוצה להשתמש בהן מיד, וצוותים שמנקים חומר בקבוצות."
  },
  'ro': {
    title: "Curățător de subtitrări - elimină filigranele, marcajele",
    desc: "Curățător de subtitrări gratuit: elimină filigrane, SDH, taguri HTML și efecte ASS; corectează MAJUSCULE și caractere stricate. 13 reguli, revert individual.",
    kw: "curățare subtitrări, curățare srt, eliminare filigran subtitrări, eliminare subtitrări SDH, eliminare reclame subtitrări, reparare caractere stricate, eliminare taguri html",
    intro: "Treci mai întâi subtitrările descărcate pe aici: filigranele, reclamele, marcajele SDH și tagurile HTML dispar dintr-o singură trecere.",
    feat: "13 reguli în patru grupe (9 active implicit), eliminarea filigranelor, reclamelor și SDH, corectarea majusculelor și caracterelor stricate, lista modificărilor per subtitrare cu anulare individuală și timpi intacte.",
    who: "Oricine are subtitrări gata făcute și vrea să le folosească imediat, plus echipele care curăță material pe loturi."
  },
};
/* v0.9.302：第十个页面 —— 字幕术语批量替换 /glossary.html 的 SEO 表。
   与提取页同理：URL 不同就该有自己的 title / description，否则会被当重复内容收录。 */
const SEO_GLOSSARY = {
  'zh-CN': {
    title: '字幕术语批量替换 - 一份术语表改完整个文件 | 随心字幕 AI',
    desc: '免费在线按术语表批量改字幕：写好一串「原词 → 新词」，SRT / VTT / ASS / SBV / LRC / TXT 一次全部替换。时间轴、样式和 NOTE 块一个字符都不动，改动逐条可退回。',
    kw: '字幕术语替换,批量替换字幕,srt批量替换,术语表,字幕统一译名,字幕批量修改,人名地名统一,字幕替换工具,find and replace subtitle,subtitle glossary,batch replace srt',
    intro: '一份术语表，把整份字幕里的用词一次性改统一 —— 时间轴、ASS 样式与 VTT 的 NOTE 块一个字符都不动。',
    feat: '每行一条规则，用 -> 、 => 、 → 或 Tab 分隔原词与新词，# 开头的行当注释。可整词匹配（art 不会误伤 start）、区分大小写、只替换双语条目里的第 1 行或第 2 行。改动明细逐条列出，哪一条不想改点一下就退回。',
    who: '要统一人名地名译名、替换专有名词、批量修掉机器翻译翻错的词，或者接到别人的字幕要改成自己习惯用法的人。',
    siteName: '随心字幕 AI', jsonldName: '随心字幕 AI', jsonldAlt: 'Subtitle Glossary Batch Replace'
  },
  'zh-TW': {
    title: '字幕術語批次替換 - 一份術語表改完整個檔案 | 隨心字幕 AI',
    desc: '免費線上按術語表批次改字幕：寫好一串「原詞 → 新詞」，SRT / VTT / ASS / SBV / LRC / TXT 一次全部替換。時間軸、樣式和 NOTE 區塊一個字元都不動，改動逐條可退回。',
    kw: '字幕術語替換,批次替換字幕,srt批次替換,術語表,字幕統一譯名,字幕批次修改,人名地名統一,字幕替換工具,find and replace subtitle,subtitle glossary,batch replace srt',
    intro: '一份術語表，把整份字幕裡的用詞一次改統一 —— 時間軸、ASS 樣式與 VTT 的 NOTE 區塊一個字元都不動。',
    feat: '每行一條規則，用 -> 、 => 、 → 或 Tab 分隔原詞與新詞，# 開頭的行當註解。可全詞比對（art 不會誤傷 start）、區分大小寫、只替換雙語字幕裡的第 1 行或第 2 行。改動明細逐條列出，哪一條不想改點一下就退回。',
    who: '要統一人名地名譯名、替換專有名詞、批次修掉機器翻譯翻錯的詞，或者接到別人的字幕要改成自己習慣用法的人。',
    siteName: '隨心字幕 AI', jsonldName: '隨心字幕 AI', jsonldAlt: 'Subtitle Glossary Batch Replace'
  },
  'en': {
    title: 'Batch Subtitle Term Replace - One Glossary, Whole File | AI-SRTSub',
    desc: "Glossary replace for subtitles: list \"old → new\" once and the whole SRT / VTT / ASS / TXT file updates. Timing, styles and NOTE blocks stay; revert per line.",
    kw: 'subtitle glossary,batch replace srt,find and replace subtitle,subtitle term replace,srt batch edit,replace words in subtitles,unify subtitle names,subtitle terminology,replace text in vtt,glossary srt tool,batch terminology replace',
    intro: 'A glossary of "old term → new term" rules applied across the whole subtitle file at once, with timing, ASS styles and VTT note blocks left byte-identical.',
    feat: 'One rule per line, separated by -> , => , → or a tab; lines starting with # are comments. Whole-word matching keeps "art" out of "start", case sensitivity is optional, and you can restrict the replace to line 1 or line 2 of bilingual cues. Every changed cue is listed, and any single one can be put back.',
    who: 'Anyone unifying names and terminology across a season, fixing machine-translation wording in bulk, or adapting someone else’s subtitles to their own house style.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Glossary Batch Replace'
  },
  'ja': {
    title: '字幕用語一括置換 - 用語集ひとつでファイル全体 | AI-SRTSub',
    desc: '無料のオンライン用語一括置換： 「置換前 → 置換後」 を並べるだけで、SRT / VTT / ASS / SBV / LRC / TXT の全字幕をまとめて置き換えます。時間軸・スタイル・NOTE ブロックは変更せず、行ごとに元に戻せます。',
    kw: '字幕 用語 一括置換,srt 一括置換,字幕 置換,vtt 一括変換,字幕 用語統一,固有名詞 置換,字幕 名前 統一,字幕 編集,find and replace subtitle,subtitle glossary,batch replace srt',
    intro: '「置換前 → 置換後」の用語集を、ファイル全体の字幕へ一度に適用します。時間軸・ASS スタイル・VTT の NOTE ブロックは一切変更しません。',
    feat: '1 行に 1 ルール、区切りは -> 、 => 、 → 、タブのいずれか。# で始まる行はコメントです。単語単位の一致（art が start を置き換えない）、大文字と小文字の区別、字幕の 1 行目だけ / 2 行目だけといった指定ができます。変更点は行ごとに一覧表示され、個別に元へ戻せます。',
    who: '人名や地名、専門用語の訳を統一したいとき、機械翻訳の言い回しをまとめて直したいとき、他人の字幕を自分の基準に合わせたいときに。',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Glossary Batch Replace'
  },
  'es': {
    title: 'Reemplazo masivo de términos en subtítulos - AI-SRTSub',
    desc: "Reemplaza términos en subtítulos gratis: escribe «original → nuevo» y se actualiza el archivo. Tiempos, estilos y bloques NOTE no cambian; deshacer por línea.",
    kw: 'reemplazar términos subtítulos,glosario subtítulos,reemplazo masivo srt,buscar y reemplazar subtítulos,editar srt por lotes,unificar nombres subtítulos,reemplazar palabras srt,sustituir texto vtt,find and replace subtitle,subtitle glossary,batch replace srt',
    intro: 'Un glosario con reglas «término original → término nuevo» que se aplica a todo el archivo de subtítulos a la vez, sin tocar los tiempos, los estilos ASS ni los bloques NOTE del VTT.',
    feat: 'Una regla por línea, separada por -> , => , → o tabulador; las líneas con # son comentarios. Coincidencia de palabra completa (art no altera start), distinción opcional de mayúsculas y posibilidad de limitar el cambio a la línea 1 o 2 en subtítulos bilingües. Todas las líneas modificadas se listan y se pueden revertir de una en una.',
    who: 'Quien unifica nombres y términos en una serie, corrige en bloque el vocabulario de una traducción automática o adapta subtítulos ajenos a su propio criterio.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Glossary Batch Replace'
  },
  'pt': {
    title: 'Substituição de termos em legendas em massa - AI-SRTSub',
    desc: "Substitua termos nas legendas grátis: escreva «original → novo» e atualize todo o arquivo. Tempos, estilos e blocos NOTE não mudam; desfazer por linha.",
    kw: 'substituir termos legendas,glossário legendas,substituição em massa srt,localizar e substituir legendas,editar srt em lote,unificar nomes legendas,substituir palavras srt,alterar texto vtt,find and replace subtitle,subtitle glossary,batch replace srt',
    intro: 'Um glossário com regras «termo original → termo novo» aplicado a todo o arquivo de legendas de uma vez, sem mexer nos tempos, nos estilos ASS nem nos blocos NOTE do VTT.',
    feat: 'Uma regra por linha, separada por -> , => , → ou tabulação; linhas com # são comentários. Correspondência de palavra inteira (art não altera start), diferenciação opcional de maiúsculas e opção de limitar a troca à linha 1 ou 2 em legendas bilíngues. Todas as linhas alteradas aparecem listadas e podem ser revertidas individualmente.',
    who: 'Quem unifica nomes e terminologia numa temporada, corrige em bloco o vocabulário de uma tradução automática ou adapta legendas de terceiros ao próprio padrão.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Glossary Batch Replace'
  },
  'ko': {
    title: '자막 용어 일괄 바꾸기 - 용어집 하나로 파일 전체 | AI-SRTSub',
    desc: '무료 온라인 자막 용어 일괄 교체: 「바꿀 말 → 새 말」을 한 번 적으면 SRT / VTT / ASS / SBV / LRC / TXT 전체가 한 번에 바뀝니다. 시간축·스타일·NOTE 블록은 그대로이고, 줄마다 되돌릴 수 있습니다.',
    kw: '자막 일괄 바꾸기,자막 용어 교체,srt 일괄 수정,자막 찾아 바꾸기,자막 용어 통일,고유명사 일괄 수정,자막 인물명 통일,srt 용어 일괄,find and replace subtitle,subtitle glossary,batch replace srt',
    intro: '「바꿀 말 → 새 말」 규칙을 모아 파일 전체 자막에 한 번에 적용합니다. 시간축·ASS 스타일·VTT의 NOTE 블록은 전혀 바꾸지 않습니다.',
    feat: '한 줄에 규칙 하나, 구분은 -> 、 => 、 → 、탭 중 아무거나, # 로 시작하는 줄은 주석입니다. 단어 단위 일치(art 는 start 를 건드리지 않음), 대소문자 구분, 이중 언어 자막의 1번째 줄 또는 2번째 줄만 바꾸기를 지원합니다. 바뀐 줄은 목록으로 모두 표시되고, 하나씩 되돌릴 수 있습니다.',
    who: '시리즈 전체의 인명·지명·전문용어를 통일하거나, 기계 번역의 표현을 한꺼번에 고치거나, 남의 자막을 자기 기준에 맞게 수정해야 하는 사람.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Glossary Batch Replace'
  },
  'de': {
    title: 'Begriffe in Untertiteln massenhaft ersetzen - AI-SRTSub',
    desc: "Begriffe in Untertiteln kostenlos ersetzen: «alt → neu» notieren, das ganze File wird aktualisiert. Zeiten, Stile und NOTE-Blöcke bleiben, rücknehmbar.",
    kw: 'untertitel begriffe ersetzen,glossar untertitel,srt massenersetzung,suchen und ersetzen untertitel,srt stapelverarbeitung,namen vereinheitlichen untertitel,wörter ersetzen srt,text ersetzen vtt,find and replace subtitle,subtitle glossary,batch replace srt',
    intro: 'Ein Glossar mit Regeln «alter Begriff → neuer Begriff», das auf die ganze Untertiteldatei angewendet wird, ohne Zeiten, ASS-Stile oder VTT-NOTE-Blöcke anzufassen.',
    feat: 'Eine Regel pro Zeile, getrennt durch -> , => , → oder Tab; Zeilen mit # sind Kommentare. Treffer nur als ganzes Wort (art lässt start unberührt), optionale Groß-/Kleinschreibung und Begrenzung auf Zeile 1 oder 2 bei zweisprachigen Untertiteln. Jede geänderte Zeile wird aufgelistet und lässt sich einzeln zurücknehmen.',
    who: 'Wer Namen und Fachbegriffe über eine ganze Staffel vereinheitlicht, Formulierungen aus maschineller Übersetzung in Mengen korrigiert oder fremde Untertitel an die eigene Hausregel anpasst.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Glossary Batch Replace'
  },
  'fr': {
    title: 'Remplacement de termes dans les sous-titres en masse - AI-SRTSub',
    desc: "Remplacez des termes dans les sous-titres gratuitement : notez « ancien → nouveau » et tout le fichier est mis à jour. Temps, styles et blocs NOTE restent.",
    kw: 'remplacer termes sous-titres,glossaire sous-titres,remplacement masse srt,chercher et remplacer sous-titres,modifier srt par lot,uniformiser noms sous-titres,remplacer mots srt,remplacer texte vtt,find and replace subtitle,subtitle glossary,batch replace srt',
    intro: 'Un glossaire de règles « ancien terme → nouveau terme » appliqué à tout le fichier de sous-titres en une fois, sans toucher aux temps, aux styles ASS ni aux blocs NOTE du VTT.',
    feat: 'Une règle par ligne, séparée par -> , => , → ou une tabulation ; les lignes commençant par # sont des commentaires. Correspondance sur le mot entier (art ne touche pas start), sensibilité à la casse optionnelle et limitation possible à la ligne 1 ou 2 des sous-titres bilingues. Chaque ligne modifiée est listée et peut être rétablie une par une.',
    who: 'Celles et ceux qui uniformisent noms et terminologie sur toute une saison, corrigent en bloc le vocabulaire d’une traduction automatique, ou adaptent des sous-titres venus d’ailleurs à leur propre charte.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Glossary Batch Replace'
  },
  'id': {
    title: "Ganti Istilah Subtitle Sekaligus - Satu Daftar, Semua File",
    desc: "Ganti istilah di subtitle gratis: tulis \"istilah lama → baru\" sekali, seluruh berkas berubah. Garis waktu, gaya dan blok NOTE utuh, kembalikan per baris.",
    kw: 'ganti istilah subtitle,glosarium subtitle,ganti kata srt,replace teks subtitle,cari dan ganti subtitle,edit srt massal,samakan nama subtitle,ganti kata vtt,find and replace subtitle,subtitle glossary,batch replace srt',
    intro: 'Satu daftar aturan "istilah lama → istilah baru" yang diterapkan ke seluruh berkas subtitle sekaligus, tanpa menyentuh garis waktu, gaya ASS, maupun blok NOTE di VTT.',
    feat: 'Satu aturan per baris, dipisahkan -> , => , → , atau tab; baris berawal # adalah catatan. Cocok kata utuh (art tidak mengubah start), opsi bedakan huruf besar-kecil, dan bisa dibatasi hanya ke baris 1 atau baris 2 pada subtitle dwibahasa. Setiap baris yang berubah ditampilkan dan bisa dikembalikan satu-satu.',
    who: 'Yang perlu menyeragamkan nama tokoh, tempat, dan istilah di satu seri, memperbaiki kata hasil terjemahan mesin sekaligus, atau menyesuaikan subtitle orang lain dengan gaya sendiri.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Glossary Batch Replace'
  },
  'hi': {
    title: 'सबटाइटल में शब्द एक साथ बदलें - एक ग्लॉसरी, पूरी फ़ाइल | AI-SRTSub',
    desc: "सबटाइटल में शब्द बदलना मुफ़्त और ऑनलाइन: \"पुराना → नया शब्द\" लिखें और पूरी फ़ाइल अपडेट हो जाए। समय-रेखा, स्टाइल और NOTE ब्लॉक जस के तस, हर बदलाव अलग से वापस।",
    kw: 'सबटाइटल शब्द बदलें,सबटाइटल ग्लॉसरी,srt शब्द बदलें,सबटाइटल में टेक्स्ट रिप्लेस,एसआरटी बैच एडिट,सबटाइटल नाम एक जैसे,वीटीटी टेक्स्ट बदलें,शब्द एक साथ बदलें,find and replace subtitle,subtitle glossary,batch replace srt',
    intro: 'एक ग्लॉसरी में "पुराना शब्द → नया शब्द" नियम लिखें और पूरी सबटाइटल फ़ाइल एक बार में बदल जाए — समय-रेखा, ASS स्टाइल और VTT के NOTE ब्लॉक पर कोई असर नहीं।',
    feat: 'एक पंक्ति में एक नियम, -> , => , → या टैब से अलग करें; # से शुरू होने वाली पंक्ति टिप्पणी है। पूरे शब्द से मिलान (art से start नहीं बदलता), बड़े-छोटे अक्षर का विकल्प, और द्विभाषी सबटाइटल में सिर्फ़ पंक्ति 1 या 2 तक सीमित करने की सुविधा। बदली हुई हर पंक्ति सूची में दिखती है और अलग से वापस लाई जा सकती है।',
    who: 'जिन्हें पूरे सीज़न में नाम और पारिभाषिक शब्द एक जैसे करने हैं, मशीनी अनुवाद की भाषा एक साथ सुधारनी है, या किसी और की सबटाइटल को अपने नियमों के अनुसार ढालना है।',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Glossary Batch Replace'
  },
  'th': {
    title: 'เปลี่ยนศัพท์ในซับไตเติลครั้งเดียวทั้งไฟล์ - AI-SRTSub',
    desc: 'เปลี่ยนคำในซับไตเติลออนไลน์ฟรี: เขียน "คำเดิม → คำใหม่" ครั้งเดียว ทั้ง SRT / VTT / ASS / SBV / LRC / TXT ก็อัปเดตตาม เวลา สไตล์ และบล็อก NOTE จะไม่ถูกแตะต้อง และแต่ละบรรทัดก็เรียกคืนได้',
    kw: 'เปลี่ยนศัพท์ซับไตเติล,อภิธานศัพท์ซับไตเติล,แก้คำ srt,แทนที่ข้อความซับไตเติล,ค้นหาและแทนที่ซับไตเติล,แก้ srt ทั้งชุด,ทำให้ชื่อในซับไตเติลตรงกัน,แก้ข้อความ vtt,find and replace subtitle,subtitle glossary,batch replace srt',
    intro: 'เขียนกฎ "คำเดิม → คำใหม่" ครั้งเดียว แล้วใช้กับซับไตเติลทั้งไฟล์ โดยไม่แตะต้อง เวลา สไตล์ ASS และบล็อก NOTE ของ VTT เลย',
    feat: 'หนึ่งบรรทัดต่อหนึ่งกฎ คั่นด้วย -> , => , → หรือแท็บ บรรทัดที่ขึ้นต้นด้วย # คือหมายเหตุ จับคู่แบบเต็มคำ (art จะไม่ไปยุ่งกับ start) เลือกแยกตัวพิมพ์เล็กใหญ่ได้ และจำกัดให้แก้เฉพาะบรรทัดที่ 1 หรือ 2 ในซับไตเติลสองภาษาก็ได้ ทุกบรรทัดที่แก้จะแสดงเป็นรายการและเรียกคืนทีละบรรทัดได้',
    who: 'คนที่ต้องทำให้ชื่อตัวละคร สถานที่ และศัพท์เฉพาะตรงกันทั้งซีรีส์ แก้คำแปลจากเครื่องแปลทีเดียวเป็นกลุ่ม หรือปรับซับไตเติลของคนอื่นให้เข้ากับมาตรฐานของตัวเอง',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Glossary Batch Replace'
  },
  'vi': {
    title: 'Thay thuật ngữ phụ đề hàng loạt - Một bảng, cả tệp | AI-SRTSub',
    desc: "Thay thuật ngữ trong phụ đề miễn phí: ghi \"cũ → mới\" một lần, toàn bộ tệp được cập nhật. Trục thời gian, kiểu và khối NOTE giữ nguyên, hoàn tác từng dòng.",
    kw: 'thay thuật ngữ phụ đề,bảng thuật ngữ phụ đề,sửa từ hàng loạt srt,thay thế văn bản phụ đề,tìm và thay thế phụ đề,sửa srt hàng loạt,thống nhất tên phụ đề,thay văn bản vtt,find and replace subtitle,subtitle glossary,batch replace srt',
    intro: 'Một bảng quy tắc "thuật ngữ cũ → thuật ngữ mới" được áp dụng cho toàn bộ tệp phụ đề cùng lúc, không đụng vào trục thời gian, kiểu ASS hay khối NOTE của VTT.',
    feat: 'Mỗi dòng một quy tắc, ngăn bằng -> , => , → hoặc tab; dòng bắt đầu bằng # là chú thích. Khớp nguyên từ (art không đụng vào start), tùy chọn phân biệt hoa thường, và có thể giới hạn chỉ dòng 1 hoặc dòng 2 trong phụ đề song ngữ. Mọi dòng bị thay đổi đều được liệt kê và hoàn tác từng dòng một.',
    who: 'Người cần thống nhất tên nhân vật, địa danh và thuật ngữ trong cả mùa phim, sửa hàng loạt cách dùng từ của bản dịch máy, hoặc chỉnh phụ đề của người khác theo chuẩn của mình.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Glossary Batch Replace'
  },
  'ru': {
    title: 'Массовая замена терминов в субтитрах - AI-SRTSub',
    desc: "Бесплатная онлайн-замена терминов в субтитрах: запишите «старый → новый термин» и весь файл обновится. Тайминг, стили и блоки NOTE не меняются, откат построчно.",
    kw: 'замена терминов в субтитрах,глоссарий субтитров,массовая замена srt,найти и заменить в субтитрах,пакетное изменение srt,унификация имён в субтитрах,заменить слова в srt,заменить текст vtt,find and replace subtitle,subtitle glossary,batch replace srt',
    intro: 'Глоссарий правил «старый термин → новый термин», применяемый ко всему файлу субтитров сразу: тайминг, стили ASS и блоки NOTE в VTT остаются без изменений.',
    feat: 'Одно правило в строке, разделитель — -> , => , → или табуляция; строки с # — комментарии. Совпадение только по целому слову (art не трогает start), необязательный учёт регистра и возможность ограничить замену строкой 1 или 2 в двуязычных субтитрах. Все изменённые строки выводятся списком и отменяются по отдельности.',
    who: 'Тем, кто приводит к единообразию имена и терминологию во всём сезоне, массово исправляет формулировки машинного перевода или подгоняет чужие субтитры под свой стандарт.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Glossary Batch Replace'
  },
  'it': {
    title: 'Sostituzione termini nei sottotitoli in blocco - AI-SRTSub',
    desc: "Sostituisci i termini nei sottotitoli gratis: scrivi «vecchio → nuovo» e si aggiorna tutto il file. Tempi, stili e NOTE restano identici; ripristino per riga.",
    kw: 'sostituire termini sottotitoli,glossario sottotitoli,sostituzione massiva srt,trova e sostituisci sottotitoli,modifica srt in blocco,uniformare nomi sottotitoli,sostituire parole srt,sostituire testo vtt,find and replace subtitle,subtitle glossary,batch replace srt',
    intro: 'Un glossario di regole «termine vecchio → termine nuovo» applicato a tutto il file di sottotitoli in una volta, senza toccare tempi, stili ASS e blocchi NOTE del VTT.',
    feat: 'Una regola per riga, separata da -> , => , → o tabulazione; le righe con # sono commenti. Corrispondenza sulla parola intera (art non tocca start), distinzione facoltativa tra maiuscole e possibilità di limitarsi alla riga 1 o 2 nei sottotitoli bilingui. Ogni riga modificata viene elencata e può essere ripristinata singolarmente.',
    who: 'Chi uniforma nomi e terminologia in un’intera stagione, corregge in blocco il vocabolario di una traduzione automatica o adatta sottotitoli altrui al proprio standard.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Glossary Batch Replace'
  },
  'ar': {
    title: 'استبدال المصطلحات في الترجمات دفعة واحدة - AI-SRTSub',
    desc: "استبدل المصطلحات في ملفات الترجمة مجاناً: اكتب «المصطلح القديم → الجديد» ويتحدَّث الملف كاملًا. التوقيت والأنماط وكتل NOTE تبقى، والتراجع يتم سطرًا سطرًا.",
    kw: 'استبدال المصطلحات في الترجمة,مسرد مصطلحات الترجمة,استبدال جماعي srt,ابحث واستبدل في الترجمة,تعديل srt دفعة,توحيد الأسماء في الترجمة,استبدال كلمات srt,استبدال نص vtt,find and replace subtitle,subtitle glossary,batch replace srt',
    intro: 'مسرد بقواعد «المصطلح القديم → المصطلح الجديد» يُطبَّق على ملف الترجمة كاملًا مرة واحدة، دون أن يمس التوقيت أو أنماط ASS أو كتل NOTE في VTT.',
    feat: 'قاعدة واحدة في كل سطر، يفصل بينها -> أو => أو → أو مسافة جدولة، والأسطر التي تبدأ بـ # تعليقات. مطابقة الكلمة كاملة (art لا يمس start)، وخيار التفريق بين الحروف الكبيرة والصغيرة، وحصر الاستبدال في السطر 1 أو 2 للترجمات ثنائية اللغة. تُعرض كل الأسطر التي تغيّرت ويمكن إرجاع كل سطر بمفرده.',
    who: 'من يوحّد أسماء الأشخاص والأماكن والمصطلحات في موسم كامل، أو يصحّح عبارات الترجمة الآلية دفعة واحدة، أو يكيّف ترجمات الآخرين مع معاييره.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Glossary Batch Replace'
  },
  'tr': {
    title: "Altyazıda Terimleri Toplu Değiştirme - Tek Liste, Tüm Dosya",
    desc: "Altyazıdaki terimleri ücretsiz değiştirin: \"eski → yeni\" yazın, tüm dosya güncellensin. Zamanlama, stiller ve NOTE blokları değişmez, geri alma satır bazlı.",
    kw: 'altyazı terim değiştirme,altyazı sözlüğü,srt toplu değiştirme,altyazıda bul ve değiştir,srt toplu düzenleme,altyazı isimleri eşitle,vtt metin değiştir,altyazı kelime değiştir,find and replace subtitle,subtitle glossary,batch replace srt',
    intro: 'Bir "eski terim → yeni terim" kuralları sözlüğü tüm altyazı dosyasına bir kerede uygulanır; zamanlama, ASS stilleri ve VTT NOTE bloklarına hiç dokunulmaz.',
    feat: 'Her satıra bir kural; ayırıcı olarak -> , => , → veya sekme kullanılır, # ile başlayan satırlar açıklamadır. Sadece tam sözcük eşleşmesi (art, start’a dokunmaz), isteğe bağlı büyük/küçük harf duyarlılığı ve iki dilli altyazılarda değişikliği yalnızca 1. veya 2. satırla sınırlama. Değişen her satır listelenir ve tek tek geri alınabilir.',
    who: 'Bir sezon boyunca kişi, yer ve terim adlarını tekdüze yapmak, makine çevirisinin ifadelerini topluca düzeltmek ya da başkasının altyazısını kendi ölçüsüne uydurmak isteyenler.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Glossary Batch Replace'
  },
  'nl': {
    title: 'Termen in ondertitels in bulk vervangen - AI-SRTSub',
    desc: "Vervang termen in ondertitels gratis: schrijf \"oude → nieuwe\" en het hele bestand verandert. Timing, stijlen en NOTE-blokken blijven; per regel terug te zetten.",
    kw: 'termen ondertitels vervangen,ondertitel glossarium,srt bulk vervangen,zoeken en vervangen ondertitels,srt batch bewerken,namen gelijk maken ondertitels,woorden vervangen srt,tekst vervangen vtt,find and replace subtitle,subtitle glossary,batch replace srt',
    intro: 'Een glossarium met regels "oude term → nieuwe term" dat in één keer op het hele ondertitelbestand wordt toegepast, zonder timing, ASS-stijlen of VTT-NOTE-blokken aan te raken.',
    feat: 'Eén regel per lijn, gescheiden door -> , => , → of een tab; regels die beginnen met # zijn opmerkingen. Alleen hele woorden (art laat start met rust), optioneel onderscheid tussen hoofdletters en beperking tot regel 1 of 2 bij tweetalige ondertitels. Elke gewijzigde regel wordt getoond en kan afzonderlijk worden teruggedraaid.',
    who: 'Wie namen en terminologie in een heel seizoen gelijk wil trekken, machinevertalingen in één keer wil bijschaven, of ondertitels van anderen naar eigen huisstijl wil omzetten.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Glossary Batch Replace'
  },
  'pl': {
    title: "Masowa zamiana terminów w napisach - jedna lista, cały plik",
    desc: "Zamieniaj terminy w napisach online za darmo: zapisz „stary → nowy termin\" i zaktualizuj cały plik. Czasy, style i bloki NOTE bez zmian, cofanie linia po linii.",
    kw: 'zamiana terminów w napisach,glosariusz napisów,masowa zamiana srt,znajdź i zamień w napisach,edycja srt hurtowo,ujednolić nazwy w napisach,zamienić słowa w srt,zamienić tekst vtt,find and replace subtitle,subtitle glossary,batch replace srt',
    intro: 'Glosariusz reguł „stary termin → nowy termin" stosowany do całego pliku napisów naraz, bez dotykania czasów, stylów ASS i bloków NOTE w VTT.',
    feat: 'Jedna reguła w wierszu, oddzielona -> , => , → lub tabulatorem; wiersze z # to komentarze. Trafienia tylko w całe słowa (art nie tyka start), opcjonalne rozróżnianie wielkości liter i możliwość ograniczenia do wiersza 1 lub 2 w napisach dwujęzycznych. Każda zmieniona linia jest wypisana i można ją cofnąć pojedynczo.',
    who: 'Osobom ujednolicającym imiona, nazwy miejsc i terminologię w całym sezonie, poprawiającym hurtowo słownictwo z tłumaczenia maszynowego albo dopasowującym cudze napisy do własnego standardu.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Glossary Batch Replace'
  },
  'sv': {
    title: 'Ersätt termer i undertexter i mängd - AI-SRTSub',
    desc: "Ersätt termer i undertexter gratis: skriv \"gammal → ny term\" så uppdateras hela filen. Tidsättning, stilar och NOTE-block lämnas orörda, återställ rad för rad.",
    kw: 'ersätt termer undertexter,ordlista undertexter,massersätt srt,sök och ersätt undertexter,redigera srt i mängd,enhetliga namn undertexter,ersätt ord i srt,ersätt text vtt,find and replace subtitle,subtitle glossary,batch replace srt',
    intro: 'En ordlista med regler "gammal term → ny term" som tillämpas på hela undertextfilen på en gång, utan att röra tidsättning, ASS-stilar eller VTT:s NOTE-block.',
    feat: 'En regel per rad, avgränsad med -> , => , → eller tabb; rader som börjar med # är kommentarer. Träff på hela ord (art lämnar start ifred), valbar skiftlägeskänslighet och möjlighet att begränsa till rad 1 eller 2 i tvåspråkiga undertexter. Varje ändrad rad listas och kan återställas en och en.',
    who: 'Den som vill ha enhetliga namn och terminologi genom en hel säsong, rätta maskinöversatta formuleringar i mängd, eller anpassa andras undertexter till sin egen standard.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Glossary Batch Replace'
  },
  'cs': {
    title: 'Hromadná výměna pojmů v titulcích - AI-SRTSub',
    desc: "Vyměňujte pojmy v titulcích zdarma online: zapište „starý → nový\" a celý soubor se aktualizuje. Časování, styly a bloky NOTE zůstávají, každý řádek jde vrátit.",
    kw: 'výměna pojmů v titulcích,glosář titulků,hromadná výměna srt,najít a nahradit v titulcích,hromadná úprava srt,sjednotit jména v titulcích,nahradit slova v srt,nahradit text vtt,find and replace subtitle,subtitle glossary,batch replace srt',
    intro: 'Glosář pravidel „starý pojem → nový pojem" aplikovaný na celý soubor titulků najednou, bez zásahu do časování, stylů ASS a bloků NOTE ve VTT.',
    feat: 'Jedno pravidlo na řádek, oddělené -> , => , → nebo tabulátorem; řádky začínající # jsou poznámky. Shoda jen u celých slov (art nezasáhne start), volitelné rozlišování velikosti písmen a možnost omezit změnu na řádek 1 nebo 2 u dvojjazyčných titulků. Každý změněný řádek je vypsán a dá se vrátit jednotlivě.',
    who: 'Kdo sjednocuje jména, místa a terminologii v celé sérii, opravuje hromadně formulace strojového překladu nebo převádí cizí titulky na vlastní standard.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Glossary Batch Replace'
  },
  'uk': {
    title: 'Масова заміна термінів у субтитрах - AI-SRTSub',
    desc: "Замінюйте терміни в субтитрах безкоштовно: запишіть «старий → новий термін» — весь файл оновиться. Таймінг, стилі та блоки NOTE без змін, скасування порядково.",
    kw: 'заміна термінів у субтитрах,глосарій субтитрів,масова заміна srt,знайти і замінити в субтитрах,пакетне редагування srt,уніфікувати імена в субтитрах,замінити слова в srt,замінити текст vtt,find and replace subtitle,subtitle glossary,batch replace srt',
    intro: 'Глосарій правил «старий термін → новий термін», що застосовується до всього файлу субтитрів відразу, не зачіпаючи таймінг, стилі ASS і блоки NOTE у VTT.',
    feat: 'Одне правило в рядку, роздільник — -> , => , → або табуляція; рядки з # — коментарі. Збіг лише цілим словом (art не чіпає start), необов’язкове врахування регістру та можливість обмежити заміну рядком 1 або 2 у двомовних субтитрах. Усі змінені рядки виводяться списком і скасовуються окремо.',
    who: 'Тим, хто уніфікує імена, назви та термінологію в цілому сезоні, масово виправляє формулювання машинного перекладу або приводить чужі субтитри до власного стандарту.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Glossary Batch Replace'
  },
  'da': {
    title: 'Erstat termer i undertekster i flæng - AI-SRTSub',
    desc: "Erstat termer i undertekster gratis: skriv \"gammel → ny\" og hele filen bliver opdateret. Timing, typografier og NOTE-blokke røres ikke; fortryd pr. linje.",
    kw: 'erstat termer undertekster,ordliste undertekster,masserediger srt,søg og erstat undertekster,rediger srt i flæng,ensartede navne undertekster,erstat ord i srt,erstat tekst vtt,find and replace subtitle,subtitle glossary,batch replace srt',
    intro: 'En ordliste med regler "gammelt udtryk → nyt udtryk", der anvendes på hele undertitel­filen på én gang uden at røre timing, ASS-typografier eller VTT’s NOTE-blokker.',
    feat: 'Én regel pr. linje adskilt af -> , => , → eller tabulatorslag; linjer der starter med # er kommentarer. Kun hele ord (art lader start være), valgfri forskel på store og små bogstaver og mulighed for at begrænse til linje 1 eller 2 i tosprogede undertekster. Hver ændret linje listes og kan rulles tilbage enkeltvis.',
    who: 'Dem der vil ensrette navne og terminologi gennem en hel sæson, rette maskinoversatte formuleringer i flæng eller tilpasse andres undertekster til egen standard.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Glossary Batch Replace'
  },
  'fi': {
    title: 'Termien massavaihto tekstityksissä - AI-SRTSub',
    desc: "Vaihda termejä tekstityksissä ilmaiseksi: kirjoita \"vanha → uusi\" ja koko tiedosto päivittyy. Ajoitus, tyylit ja NOTE-lohkot pysyvät, palautus rivikohtaisesti.",
    kw: 'vaihda termejä tekstityksissä,tekstitysten sanasto,srt massavaihto,etsi ja korvaa tekstityksissä,srt joukkomuokkaus,yhtenäiset nimet tekstityksissä,korvaa sanat srt,korvaa teksti vtt,find and replace subtitle,subtitle glossary,batch replace srt',
    intro: 'Sanasto säännöillä "vanha termi → uusi termi", joka sovelletaan koko tekstitystiedostoon kerralla koskematta ajoitukseen, ASS-tyyleihin tai VTT:n NOTE-lohkoihin.',
    feat: 'Yksi sääntö rivillä, erottimena -> , => , → tai sarkain; # -merkillä alkavat rivit ovat kommentteja. Osuma vain kokonaisiin sanoihin (art ei koske sanaan start), valinnainen kirjainkoon erottelu ja mahdollisuus rajata muutos kaksikielisissä teksteissä riviin 1 tai 2. Jokainen muutettu rivi listataan ja voidaan palauttaa yksitellen.',
    who: 'Niille, jotka yhtenäistävät nimet ja terminologian koko kauden ajan, korjaavat konetunnistuksen sanavalintoja joukkona tai sovittavat toisten tekstitykset omaan tyyliinsä.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Glossary Batch Replace'
  },
  'el': {
    title: 'Μαζική αντικατάσταση όρων στους υπότιτλους - AI-SRTSub',
    desc: "Αντικαταστήστε όρους σε υπότιτλους δωρεάν: γράψτε «παλιός → νέος» και όλο το αρχείο ενημερώνεται. Χρονισμός, στυλ και μπλοκ NOTE δεν αλλάζουν.",
    kw: 'αντικατάσταση όρων υπότιτλων,γλωσσάρι υπότιτλων,μαζική αντικατάσταση srt,εύρεση και αντικατάσταση υπότιτλων,μαζική επεξεργασία srt,ενιαία ονόματα υπότιτλων,αντικατάσταση λέξεων srt,αντικατάσταση κειμένου vtt,find and replace subtitle,subtitle glossary,batch replace srt',
    intro: 'Ένα γλωσσάρι με κανόνες «παλιός όρος → νέος όρος» που εφαρμόζεται σε όλο το αρχείο υποτίτλων μεμιάς, χωρίς να πειράζει τον χρονισμό, τα στυλ ASS ή τα μπλοκ NOTE του VTT.',
    feat: 'Ένας κανόνας ανά γραμμή, με διαχωριστικό -> , => , → ή στηλοθέτη· οι γραμμές που αρχίζουν με # είναι σχόλια. Αντιστοίχιση μόνο σε ολόκληρες λέξεις (το art δεν πειράζει το start), προαιρετική διάκριση πεζών/κεφαλαίων και δυνατότητα περιορισμού στη γραμμή 1 ή 2 σε δίγλωσσους υπότιτλους. Κάθε αλλαγμένη γραμμή εμφανίζεται στη λίστα και μπορεί να επανέλθει μία προς μία.',
    who: 'Όσοι ενοποιούν ονόματα και ορολογία σε όλο τον κύκλο επεισοδίων, διορθώνουν μαζικά διατυπώσεις αυτόματης μετάφρασης ή προσαρμόζουν ξένους υπότιτλους στο δικό τους πρότυπο.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Glossary Batch Replace'
  },
  'he': {
    title: 'החלפת מונחים בכתוביות בבת אחת - AI-SRTSub',
    desc: 'החליפו מונחים בכתוביות בחינם באינטרנט: כתבו "מונח ישן → מונח חדש" וכל קובץ SRT / VTT / ASS / SBV / LRC / TXT יתעדכן. התזמון, הסגנונות ובלוקי NOTE נשארים כמו שהם, וכל שורה ניתנת להחזרה בנפרד.',
    kw: 'החלפת מונחים בכתוביות,מילון מונחים לכתוביות,החלפה המונית srt,חיפוש והחלפה בכתוביות,עריכת srt בהמונים,איחוד שמות בכתוביות,החלפת מילים ב-srt,החלפת טקסט vtt,find and replace subtitle,subtitle glossary,batch replace srt',
    intro: 'מילון מונחים עם כללים של "מונח ישן → מונח חדש" שמוחל על כל קובץ הכתוביות בבת אחת, בלי לגעת בתזמון, בסגנונות ASS או בבלוקי NOTE ב־VTT.',
    feat: 'כלל אחד בכל שורה, מופרד ב־-> , => , → או בטאב; שורות שמתחילות ב־# הן הערות. התאמה למילים שלמות בלבד (art לא נוגע ב־start), אפשרות להבחין בין אותיות גדולות לקטנות, ואפשרות להגביל לשורה 1 או 2 בכתוביות דו־לשוניות. כל שורה שהשתנתה מופיעה ברשימה ואפשר להחזיר אותה לבד.',
    who: 'מי שמאחד שמות ומונחים בכל העונה, מתקן בבת אחת ניסוחים מתרגום מכונה, או מתאים כתוביות של אחרים לסטנדרט שלו.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Glossary Batch Replace'
  },
  'ro': {
    title: 'Înlocuire termeni în subtitrări în bloc - AI-SRTSub',
    desc: "Înlocuiți termeni în subtitrări gratuit: scrieți „vechi → nou\" și se actualizează tot fișierul. Timpul, stilurile și blocurile NOTE rămân; anulare pe rând.",
    kw: 'înlocuire termeni subtitrări,glosar subtitrări,înlocuire în bloc srt,căutare și înlocuire subtitrări,editare srt în bloc,uniformizare nume subtitrări,înlocuire cuvinte srt,înlocuire text vtt,find and replace subtitle,subtitle glossary,batch replace srt',
    intro: 'Un glosar de reguli „termen vechi → termen nou" aplicat pe tot fișierul de subtitrări dintr-o dată, fără să atingă timpul, stilurile ASS sau blocurile NOTE din VTT.',
    feat: 'O regulă pe linie, separată prin -> , => , → sau tab; liniile care încep cu # sunt comentarii. Potrivire doar pe cuvântul întreg (art nu îl atinge pe start), diferențiere opțională a majusculelor și posibilitatea de a limita la linia 1 sau 2 în subtitrările bilingve. Fiecare linie modificată este listată și poate fi anulată individual.',
    who: 'Cei care unifică nume și terminologie într-un sezon întreg, corectează în bloc formulările din traducerea automată sau adaptează subtitrările altora la propriul standard.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Glossary Batch Replace'
  }
};
/* v0.9.321：第十七个页面 —— 字幕质检（/qc.html）
   与前面十六页同一套字段：title / desc / kw / intro / feat / who + 品牌三件套。
   ⚠️ 卖点不是「又一个 srt 校验器」，而是「按字幕语言自己的规矩查」——
      feat 里必须写清楚按文字系统分档的口径，以及那几条语言专属规范。 */
const SEO_QC = {
  'zh-CN': {
    title: "字幕质检 - 按语言规则查时间轴与排版 | 随心字幕 AI",
    desc: "免费在线字幕质检：上传 SRT / VTT / ASS，按这门语言自己的规矩查时间轴重叠、停留时长、阅读速度、行宽、断行位置、序号与编码。27 种语言各有各的阈值，另带中西文空格、全角标点等语言专属规范。",
    kw: "字幕质检,字幕检查,srt检查,字幕校验,字幕体检,字幕规范检查,字幕时间轴检查,srt validator,subtitle checker,subtitle qc",
    intro: "上传一份字幕，按这门语言自己的规矩查一遍，每条问题都给出实测值和阈值。全程在浏览器里完成，文件不上传。",
    feat: "时间轴重叠、停留过短或过长、阅读速度过快、单行过宽、超过两行、断行位置、序号错乱、空条目、乱码与控制字符都能查。行宽与阅读速度按文字系统口径算：中文按全角字计宽，泰文与阿拉伯文的组合记号不计宽。语言专属规范包括西班牙语疑问句开头的 ¿、法语在 ? ! ; : 之前的不破空格、希腊语的问号、中文与日文的全角标点、阿拉伯语的 ؟ 与 ،。可自动修的项目单独列出，会动时间轴的默认不勾选。",
    who: "译制组、字幕组、剪辑师和本地化团队，在交付前把字幕过一遍。",
    siteName: "随心字幕 AI", jsonldName: "随心字幕 AI", jsonldAlt: "Subtitle QC Checker"
  },
  'zh-TW': {
    title: "字幕質檢 - 依語言規則檢查時間軸與排版 | 隨心字幕 AI",
    desc: "免費線上字幕質檢：上傳 SRT / VTT / ASS，依這門語言自己的規矩檢查時間軸重疊、停留時長、閱讀速度、行寬、斷行位置、序號與編碼。27 種語言各有各的門檻，另帶中西文空格、全角標點等語言專屬規範。",
    kw: "字幕質檢,字幕檢查,srt檢查,字幕校驗,字幕體檢,字幕規範檢查,字幕時間軸檢查,srt validator,subtitle checker,subtitle qc",
    intro: "上傳一份字幕，依這門語言自己的規矩檢查一遍，每個問題都給出實測值和門檻。全程在瀏覽器裡完成，檔案不上傳。",
    feat: "時間軸重疊、停留過短或過長、閱讀速度過快、單行過寬、超過兩行、斷行位置、序號錯亂、空條目、亂碼與控制字元都能查。行寬與閱讀速度依文字系統口徑計算：中文按全形字計寬，泰文與阿拉伯文的組合記號不計寬。語言專屬規範包括西班牙語疑問句開頭的 ¿、法語在 ? ! ; : 之前的不換行空格、希臘語的問號、中文與日文的全形標點、阿拉伯語的 ؟ 與 ،。可自動修的項目單獨列出，會動時間軸的預設不勾選。",
    who: "譯製組、字幕組、剪輯師和本地化團隊，在交付前把字幕過一遍。",
    siteName: "隨心字幕 AI", jsonldName: "隨心字幕 AI", jsonldAlt: "Subtitle QC Checker"
  },
  'en': {
    title: "Subtitle QC - Check Timing and Layout per Language | AI-SRTSub",
    desc: "Free online subtitle QC: upload SRT, VTT or ASS and check overlaps, duration, reading speed, line width, line breaks, numbering and encoding against the rules of that language. 27 languages, 27 sets of thresholds, plus language-specific rules.",
    kw: "subtitle checker,subtitle qc,srt validator,subtitle quality check,srt check,subtitle timing check,subtitle validator,check srt file,subtitle proofreading,subtitle linter",
    intro: "Upload a subtitle file and check it against the rules of its own language - every finding comes with the measured value and the threshold. Runs fully in your browser, nothing is uploaded.",
    feat: "Checks overlapping cues, too short or too long on screen, reading speed, line width, line count, awkward line breaks, numbering, empty cues, mojibake and control characters. Width and reading speed follow the writing system: Chinese is measured in full-width characters, Thai and Arabic combining marks count as zero width. Language-specific rules cover the Spanish opening ¿, the French non-breaking space before ? ! ; :, the Greek question mark, full-width punctuation in Chinese and Japanese, and the Arabic question mark and comma. Auto-fixable items are listed separately, and anything that moves timecodes is unchecked by default.",
    who: "Subtitle groups, localisation vendors, editors and anyone who wants to check a file before delivery.",
    siteName: "AI-SRTSub", jsonldName: "AI-SRTSub", jsonldAlt: "Subtitle QC Checker"
  },
  'ja': {
    title: "字幕QC - 言語ごとの規則でタイミングと組み版を検査 | AI-SRTSub",
    desc: "無料のオンライン字幕QC。SRT・VTT・ASS を読み込み、その言語の規則で時間の重なり、表示時間、読み速度、行の幅、改行位置、番号、エンコーディングを検査します。27言語それぞれに閾値があり、言語固有の規則も備えています。",
    kw: "字幕QC,字幕チェック,srtチェック,字幕検査,字幕校正,字幕タイミング検査,subtitle checker,subtitle qc,srt validator,字幕検証",
    intro: "字幕ファイルをアップロードして、その言語自身の規則で検査します。指摘ごとに実測値と閾値が表示されます。すべてブラウザ内で動作し、ファイルはアップロードされません。",
    feat: "時間の重なり、表示が短すぎ・長すぎ、読み速度、行の幅、行数、不自然な改行、番号の乱れ、空の字幕、文字化けと制御文字を検査します。幅と読み速度は文字体系に従って計算します：中国語は全角文字で測り、タイ語とアラビア語の結合記号は幅ゼロとして扱います。言語固有の規則として、スペイン語の文頭の ¿、フランス語の ? ! ; : 前のノーブレークスペース、ギリシャ語の疑問符、中国語と日本語の全角句読点、アラビア語の ؟ と ، に対応します。自動修正できる項目は別にまとめ、タイミングを動かす項目は既定でオフです。",
    who: "字幕グループ、ローカライズ担当者、編集者、納品前に字幕を確認したいすべての人に。",
    siteName: "AI-SRTSub", jsonldName: "AI-SRTSub", jsonldAlt: "Subtitle QC Checker"
  },
  'es': {
    title: "Control de calidad de subtítulos - tiempo y maquetación por idioma | AI-SRTSub",
    desc: "Control de calidad de subtítulos gratis en línea: sube SRT, VTT o ASS y comprueba solapamientos, duración, velocidad de lectura, ancho de línea, cortes de línea, numeración y codificación según las reglas de ese idioma. 27 idiomas, 27 umbrales y reglas específicas por idioma.",
    kw: "control calidad subtítulos,comprobar subtítulos,validador srt,revisar subtítulos,corrector subtítulos,comprobar tiempo subtítulos,subtitle checker,subtitle qc,srt validator, revisión de subtítulos",
    intro: "Sube un archivo de subtítulos y compruébalo con las reglas de su propia idioma: cada aviso incluye el valor medido y el umbral. Funciona en tu navegador, no se sube nada.",
    feat: "Comprueba solapamientos, duración demasiado corta o larga, velocidad de lectura, ancho de línea, número de líneas, cortes incómodos, numeración, subtítulos vacíos y codificación rota. El ancho y la velocidad siguen el sistema de escritura: el chino se mide en caracteres de ancho completo y los signos combinantes del tailandés y el árabe cuentan como ancho cero. Las reglas específicas cubren la ¿ inicial española, el espacio duro francés antes de ? ! ; :, el signo de interrogación griego, la puntuación de ancho completo en chino y japonés y los signos árabes. Los elementos corregibles automáticamente se listan aparte y los que mueven los códigos de tiempo vienen desmarcados.",
    who: "Grupos de subtitulado, proveedores de localización, editores y cualquiera que quiera revisar un archivo antes de entregarlo.",
    siteName: "AI-SRTSub", jsonldName: "AI-SRTSub", jsonldAlt: "Subtitle QC Checker"
  },
  'pt': {
    title: "Controlo de qualidade de legendas - tempo e formatação por idioma | AI-SRTSub",
    desc: "Controlo de qualidade de legendas grátis online: carregue SRT, VTT ou ASS e verifique sobreposições, duração, velocidade de leitura, largura da linha, quebras de linha, numeração e codificação segundo as regras desse idioma. 27 idiomas, 27 limiares e regras específicas.",
    kw: "controlo qualidade legendas,verificar legendas,validador srt,revisar legendas,corretor legendas,verificar tempo legendas,subtitle checker,subtitle qc,srt validator,revisão de legendas",
    intro: "Carregue um ficheiro de legendas e verifique-o com as regras do seu próprio idioma: cada aviso traz o valor medido e o limiar. Funciona no navegador, nada é enviado.",
    feat: "Verifica sobreposições, duração curta ou longa demais, velocidade de leitura, largura da linha, número de linhas, quebras estranhas, numeração, legendas vazias e codificação corrompida. A largura e a velocidade seguem o sistema de escrita: o chinês mede-se em caracteres de largura total e os sinais combinantes do tailandês e do árabe contam como largura zero. As regras específicas cobrem o ¿ inicial espanhol, o espaço inquebrável francês antes de ? ! ; :, o ponto de interrogação grego, a pontuação de largura total em chinês e japonês e os sinais árabes. Os itens corrigíveis automaticamente ficam separados e os que mexem nos códigos de tempo vêm desmarcados.",
    who: "Grupos de legendagem, fornecedores de localização, editores e quem quiser rever um ficheiro antes da entrega.",
    siteName: "AI-SRTSub", jsonldName: "AI-SRTSub", jsonldAlt: "Subtitle QC Checker"
  },
  'ko': {
    title: "자막 검수 - 언어별 규칙으로 타임라인과 줄바꿈 확인 | AI-SRTSub",
    desc: "무료 온라인 자막 검수: SRT, VTT, ASS를 올리면 해당 언어의 규칙으로 겹침·노출 시간·읽기 속도·줄 너비·줄바꿈·번호·인코딩을 확인합니다. 27개 언어에 각자의 기준값과 언어 전용 규칙이 있습니다.",
    kw: "자막 검수,자막 검사,srt 검사,자막 확인,자막 교정,자막 타임라인 검사,subtitle checker,subtitle qc,srt validator,자막 검증",
    intro: "자막 파일을 올리고 그 언어 고유의 규칙으로 검사하세요. 지적마다 실측값과 기준값이 함께 표시됩니다. 모두 브라우저에서 실행되며 파일은 업로드되지 않습니다.",
    feat: "겹침, 너무 짧거나 긴 노출, 읽기 속도, 줄 너비, 줄 수, 어색한 줄바꿈, 번호 오류, 빈 자막, 깨진 문자와 제어 문자를 검사합니다. 너비와 속도는 문자 체계에 따라 계산합니다. 중국어는 전각 문자로 재고, 태국어와 아랍어의 결합 기호는 너비 0으로 봅니다. 언어 전용 규칙으로 스페인어 문두의 ¿, 프랑스어의 ? ! ; : 앞 줄바꿈 없는 공백, 그리스어 물음표, 중국어와 일본어의 전각 문장부호, 아랍어의 ؟와 ،를 다룹니다. 자동 수정 항목은 따로 모아 두고, 타임코드를 움직이는 항목은 기본적으로 꺼져 있습니다.",
    who: "자막팀, 로컬라이제이션 업체, 편집자, 납품 전에 파일을 확인하려는 모든 사람에게.",
    siteName: "AI-SRTSub", jsonldName: "AI-SRTSub", jsonldAlt: "Subtitle QC Checker"
  },
  'de': {
    title: "Untertitel-Prüfung - Timing und Satz nach Sprache | AI-SRTSub",
    desc: "Kostenlose Untertitel-Prüfung online: SRT, VTT oder ASS laden und Überlappungen, Dauer, Lesegeschwindigkeit, Zeilenbreite, Zeilenumbrüche, Nummerierung und Kodierung nach den Regeln dieser Sprache prüfen. 27 Sprachen, 27 Grenzwerte, dazu sprachspezifische Regeln.",
    kw: "Untertitel prüfen,Untertitel Kontrolle,srt validieren,Untertitel Korrektur,Untertitel Timing prüfen,Untertitel Qualität,subtitle checker,subtitle qc,srt validator, Untertitel Prüftool",
    intro: "Untertitel-Datei laden und nach den Regeln ihrer eigenen Sprache prüfen lassen - jeder Befund nennt Messwert und Grenzwert. Läuft vollständig im Browser, nichts wird hochgeladen.",
    feat: "Prüft Überlappungen, zu kurze oder zu lange Anzeige, Lesegeschwindigkeit, Zeilenbreite, Zeilenzahl, ungünstige Umbrüche, Nummerierung, leere Untertitel sowie defekte Kodierung. Breite und Tempo folgen dem Schriftsystem: Chinesisch wird in vollen Zeichenbreiten gemessen, kombinierende Zeichen im Thailändischen und Arabischen zählen null Breite. Sprachspezifische Regeln betreffen das spanische eröffnende ¿, das französische geschützte Leerzeichen vor ? ! ; :, das griechische Fragezeichen, volle Satzzeichen im Chinesischen und Japanischen sowie die arabischen Zeichen. Automatisch korrigierbare Punkte stehen getrennt, und was Zeitcodes verschiebt, ist standardmäßig abgewählt.",
    who: "Untertitel-Gruppen, Lokalisierungsdienstleister, Cutter und alle, die eine Datei vor der Abgabe prüfen wollen.",
    siteName: "AI-SRTSub", jsonldName: "AI-SRTSub", jsonldAlt: "Subtitle QC Checker"
  },
  'fr': {
    title: "Contrôle qualité des sous-titres - timing et mise en page par langue | AI-SRTSub",
    desc: "Contrôle qualité des sous-titres gratuit en ligne : chargez SRT, VTT ou ASS et vérifiez chevauchements, durée, vitesse de lecture, largeur de ligne, coupures, numérotation et encodage selon les règles de cette langue. 27 langues, 27 seuils et des règles propres à chaque langue.",
    kw: "contrôle qualité sous-titres,vérifier sous-titres,validateur srt,corriger sous-titres,vérifier timing sous-titres,qualité sous-titres,subtitle checker,subtitle qc,srt validator, relecture sous-titres",
    intro: "Chargez un fichier de sous-titres et vérifiez-le selon les règles de sa propre langue : chaque signalement donne la valeur mesurée et le seuil. Tout se passe dans le navigateur, rien n'est envoyé.",
    feat: "Vérifie les chevauchements, les durées trop courtes ou trop longues, la vitesse de lecture, la largeur de ligne, le nombre de lignes, les coupures mal placées, la numérotation, les sous-titres vides et l'encodage cassé. Largeur et vitesse suivent le système d'écriture : le chinois se mesure en caractères pleine largeur, les signes combinants du thaï et de l'arabe comptent pour une largeur nulle. Les règles propres à chaque langue couvrent le ¿ ouvrant espagnol, l'espace insécable française avant ? ! ; :, le point d'interrogation grec, la ponctuation pleine largeur en chinois et japonais et les signes arabes. Les éléments corrigibles automatiquement sont listés à part, et ceux qui déplacent les codes temporels sont décochés par défaut.",
    who: "Groupes de sous-titrage, prestataires de localisation, monteurs et tous ceux qui veulent vérifier un fichier avant livraison.",
    siteName: "AI-SRTSub", jsonldName: "AI-SRTSub", jsonldAlt: "Subtitle QC Checker"
  },
  'id': {
    title: "Pemeriksaan subtitle - timing dan tata letak per bahasa | AI-SRTSub",
    desc: "Pemeriksaan subtitle gratis online: unggah SRT, VTT, atau ASS dan periksa tumpang tindih, durasi, kecepatan baca, lebar baris, pemotongan baris, penomoran, dan encoding menurut aturan bahasa itu. 27 bahasa, 27 set ambang, plus aturan khusus per bahasa.",
    kw: "pemeriksaan subtitle,cek subtitle,validator srt,koreksi subtitle,cek timing subtitle,kualitas subtitle,subtitle checker,subtitle qc,srt validator,pemeriksaan kualitas subtitle",
    intro: "Unggah file subtitle dan periksa dengan aturan bahasanya sendiri - setiap temuan menyertakan nilai terukur dan ambangnya. Berjalan sepenuhnya di browser, tidak ada yang diunggah.",
    feat: "Memeriksa tumpang tindih, durasi terlalu pendek atau panjang, kecepatan baca, lebar baris, jumlah baris, pemotongan baris yang jangkal, penomoran, subtitle kosong, dan encoding rusak. Lebar dan kecepatan mengikuti sistem tulisan: bahasa Cina diukur dalam karakter lebar penuh, tanda gabungan Thai dan Arab dihitung lebar nol. Aturan khusus bahasa mencakup ¿ pembuka dalam bahasa Spanyol, spasi tak terputus bahasa Prancis sebelum ? ! ; :, tanda tanya Yunani, tanda baca lebar penuh dalam bahasa Cina dan Jepang, serta tanda Arab. Item yang bisa diperbaiki otomatis dikelompokkan terpisah, dan yang menggeser kode waktu tidak dicentang secara bawaan.",
    who: "Tim subtitle, vendor lokalisasi, editor, dan siapa pun yang ingin memeriksa file sebelum dikirim.",
    siteName: "AI-SRTSub", jsonldName: "AI-SRTSub", jsonldAlt: "Subtitle QC Checker"
  },
  'hi': {
    title: "सबटाइटल जाँच - भाषा के अनुसार समय और लेआउट | AI-SRTSub",
    desc: "मुफ़्त ऑनलाइन सबटाइटल जाँच: SRT, VTT या ASS अपलोड करें और उस भाषा के नियमों से ओवरलैप, अवधि, पढ़ने की गति, पंक्ति की चौड़ाई, पंक्ति-विच्छेद, क्रमांक और एन्कोडिंग जाँचें। 27 भाषाएँ, 27 सीमा-मान, साथ ही भाषा-विशेष नियम।",
    kw: "सबटाइटल जाँच,सबटाइटल जांच,srt जांच,सबटाइटल सुधार,सबटाइटल टाइमिंग जांच,सबटाइटल गुणवत्ता,subtitle checker,subtitle qc,srt validator,सबटाइटल समीक्षा",
    intro: "सबटाइटल फ़ाइल अपलोड करें और उसे उसकी अपनी भाषा के नियमों से जाँचें - हर नतीजे के साथ मापा गया मान और सीमा दी गई है। पूरा काम ब्राउज़र में होता है, कुछ अपलोड नहीं होता।",
    feat: "ओवरलैप, बहुत कम या अधिक समय, पढ़ने की गति, पंक्ति की चौड़ाई, पंक्तियों की संख्या, अजीब पंक्ति-विच्छेद, क्रमांक, खाली सबटाइटल और खराब एन्कोडिंग जाँची जाती है। चौड़ाई और गति लेखन-प्रणाली के अनुसार तय होती है: चीनी पूर्ण-चौड़ाई के अक्षरों में मापी जाती है, थाई और अरबी के संयुक्त चिह्न शून्य चौड़ाई माने जाते हैं। भाषा-विशेष नियमों में स्पेनिश का शुरुआती ¿, फ़्रांसीसी का ? ! ; : से पहले का non-breaking space, ग्रीक प्रश्नचिह्न, चीनी और जापानी के पूर्ण-चौड़ाई विराम-चिह्न और अरबी चिह्न शामिल हैं। स्वचालित सुधार वाले आइटम अलग रखे गए हैं और जो समय-कोड हिलाते हैं वे डिफ़ॉल्ट रूप से अनचेक हैं।",
    who: "सबटाइटल टीमें, लोकलाइज़ेशन विक्रेता, संपादक और कोई भी जो डिलीवरी से पहले फ़ाइल जाँचना चाहता है।",
    siteName: "AI-SRTSub", jsonldName: "AI-SRTSub", jsonldAlt: "Subtitle QC Checker"
  },
  'th': {
    title: "ตรวจซับไตเติล - ตรวจเวลาและการจัดวางตามภาษา | AI-SRTSub",
    desc: "ตรวจซับไตเติลออนไลน์ฟรี: อัปโหลด SRT, VTT หรือ ASS แล้วตรวจเวลาซ้อน ระยะเวลา ความเร็วอ่าน ความกว้างบรรทัด การตัดบรรทัด ลำดับเลข และการเข้ารหัสตามกฎของภาษานั้น 27 ภาษา 27 ชุดเกณฑ์ พร้อมกฎเฉพาะของแต่ละภาษา",
    kw: "ตรวจซับไตเติล,เช็คซับไตเติล,ตรวจ srt,แก้ซับไตเติล,เช็คเวลาซับไตเติล,คุณภาพซับไตเติล,subtitle checker,subtitle qc,srt validator,ตรวจคุณภาพซับไตเติล",
    intro: "อัปโหลดไฟล์ซับไตเติลแล้วตรวจด้วยกฎของภาษานั้นเอง - ทุกข้อที่พบจะแสดงค่าที่วัดได้และเกณฑ์ ทำงานในเบราว์เซอร์ทั้งหมด ไม่มีการอัปโหลด",
    feat: "ตรวจเวลาซ้อน อยู่บนจอสั้นหรือยาวเกินไป ความเร็วอ่าน ความกว้างบรรทัด จำนวนบรรทัด ตัดบรรทัดไม่เหมาะ ลำดับเลข ซับไตเติลว่าง และการเข้ารหัสพัง ความกว้างและความเร็วอิงตามระบบตัวอักษร: ภาษาจีนวัดเป็นตัวอักษรเต็มความกว้าง สัญลักษณ์รวมของไทยและอาหรับนับเป็นความกว้างศูนย์ กฎเฉพาะภาษาครอบคลุม ¿ เปิดประโยคของสเปน ช่องว่างไม่ตัดคำของฝรั่งเศสก่อน ? ! ; : เครื่องหมายคำถามกรีก เครื่องหมายวรรคตอนเต็มความกว้างของจีนและญี่ปุ่น และเครื่องหมายอาหรับ รายการที่แก้ได้อัตโนมัติแยกไว้ต่างหาก และรายการที่ขยับรหัสเวลาจะไม่ถูกเลือกโดยค่าเริ่มต้น",
    who: "ทีมซับไตเติล ผู้รับจ้างโลคัลไลซ์ ผู้ตัดต่อ และทุกคนที่อยากตรวจไฟล์ก่อนส่งมอบ",
    siteName: "AI-SRTSub", jsonldName: "AI-SRTSub", jsonldAlt: "Subtitle QC Checker"
  },
  'vi': {
    title: "Kiểm tra phụ đề - thời gian và bố cục theo ngôn ngữ | AI-SRTSub",
    desc: "Kiểm tra phụ đề trực tuyến miễn phí: tải lên SRT, VTT hoặc ASS và kiểm tra chồng lấn thời gian, thời lượng, tốc độ đọc, độ rộng dòng, ngắt dòng, đánh số và mã hóa theo quy tắc của ngôn ngữ đó. 27 ngôn ngữ, 27 bộ ngưỡng, cùng các quy tắc riêng theo ngôn ngữ.",
    kw: "kiểm tra phụ đề,kiểm tra srt,sửa phụ đề,kiểm tra thời gian phụ đề,chất lượng phụ đề,subtitle checker,subtitle qc,srt validator,kiểm tra chất lượng phụ đề,hiệu đính phụ đề",
    intro: "Tải file phụ đề lên và kiểm tra theo quy tắc của chính ngôn ngữ đó - mỗi kết quả đều kèm giá trị đo được và ngưỡng. Chạy hoàn toàn trong trình duyệt, không có gì được tải lên.",
    feat: "Kiểm tra chồng lấn, hiển thị quá ngắn hoặc quá dài, tốc độ đọc, độ rộng dòng, số dòng, ngắt dòng không hợp lý, đánh số, phụ đề trống và mã hóa hỏng. Độ rộng và tốc độ đi theo hệ chữ viết: tiếng Trung đo bằng ký tự toàn chiều rộng, dấu tổ hợp của tiếng Thái và tiếng Ả Rập tính là độ rộng bằng không. Quy tắc riêng bao gồm dấu ¿ mở đầu trong tiếng Tây Ban Nha, dấu cách không ngắt của tiếng Pháp trước ? ! ; :, dấu hỏi của tiếng Hy Lạp, dấu câu toàn chiều rộng trong tiếng Trung và tiếng Nhật, và các dấu tiếng Ả Rập. Các mục có thể sửa tự động được tách riêng, và những mục làm dịch chuyển mã thời gian mặc định không được chọn.",
    who: "Nhóm phụ đề, nhà cung cấp bản địa hóa, người dựng phim và bất kỳ ai muốn kiểm tra file trước khi giao.",
    siteName: "AI-SRTSub", jsonldName: "AI-SRTSub", jsonldAlt: "Subtitle QC Checker"
  },
  'ru': {
    title: "Проверка субтитров - тайминг и вёрстка по языку | AI-SRTSub",
    desc: "Бесплатная онлайн-проверка субтитров: загрузите SRT, VTT или ASS и проверьте перекрытия, длительность, скорость чтения, ширину строки, переносы, нумерацию и кодировку по правилам этого языка. 27 языков, 27 наборов порогов плюс правила для конкретных языков.",
    kw: "проверка субтитров,проверить субтитры,валидатор srt,исправление субтитров,проверка тайминга субтитров,качество субтитров,subtitle checker,subtitle qc,srt validator,проверка srt",
    intro: "Загрузите файл субтитров и проверьте его по правилам его собственного языка - у каждой находки указаны измеренное значение и порог. Всё считается в браузере, файл никуда не отправляется.",
    feat: "Проверяются перекрытия, слишком короткий или долгий показ, скорость чтения, ширина строки, число строк, неудачные переносы, нумерация, пустые субтитры и битая кодировка. Ширина и скорость считаются по системе письма: китайский измеряется полноширинными символами, комбинированные знаки тайского и арабского имеют нулевую ширину. Языковые правила охватывают открывающее ¿ в испанском, неразрывный пробел во французском перед ? ! ; :, греческий вопросительный знак, полноширинную пунктуацию в китайском и японском, а также арабские знаки. Правимое автоматически вынесено отдельно, а то, что сдвигает таймкоды, по умолчанию отключено.",
    who: "Командам субтитров, поставщикам локализации, монтажёрам и всем, кто хочет проверить файл перед сдачей.",
    siteName: "AI-SRTSub", jsonldName: "AI-SRTSub", jsonldAlt: "Subtitle QC Checker"
  },
  'it': {
    title: "Controllo qualità sottotitoli - timing e impaginazione per lingua | AI-SRTSub",
    desc: "Controllo qualità dei sottotitoli gratuito online: carica SRT, VTT o ASS e verifica sovrapposizioni, durata, velocità di lettura, larghezza della riga, a capo, numerazione e codifica secondo le regole di quella lingua. 27 lingue, 27 soglie e regole specifiche per lingua.",
    kw: "controllo qualità sottotitoli,verifica sottotitoli,validatore srt,correzione sottotitoli,controllo timing sottotitoli,qualità sottotitoli,subtitle checker,subtitle qc,srt validator,revisione sottotitoli",
    intro: "Carica un file di sottotitoli e controllalo secondo le regole della sua stessa lingua: ogni segnalazione riporta il valore misurato e la soglia. Gira tutto nel browser, non si carica nulla.",
    feat: "Controlla sovrapposizioni, durata troppo breve o lunga, velocità di lettura, larghezza della riga, numero di righe, a capo mal posizionati, numerazione, sottotitoli vuoti e codifica rotta. Larghezza e velocità seguono il sistema di scrittura: il cinese si misura in caratteri a larghezza piena, i segni combinanti di thai e arabo valgono larghezza zero. Le regole specifiche coprono la ¿ iniziale spagnola, lo spazio unificatore francese prima di ? ! ; :, il punto interrogativo greco, la punteggiatura a larghezza piena in cinese e giapponese e i segni arabi. Le voci correggibili automaticamente sono elencate a parte e quelle che spostano i timecode sono disattivate per impostazione predefinita.",
    who: "Gruppi di sottotitolazione, fornitori di localizzazione, montatori e chiunque voglia controllare un file prima della consegna.",
    siteName: "AI-SRTSub", jsonldName: "AI-SRTSub", jsonldAlt: "Subtitle QC Checker"
  },
  'ar': {
    title: "فحص الترجمة - التوقيت والتنسيق حسب اللغة | AI-SRTSub",
    desc: "فحص ترجمة مجاني على الإنترنت: ارفع SRT أو VTT أو ASS وافحص التداخل والمدة وسرعة القراءة وعرض السطر وكسر السطر والترقيم والترميز وفق قواعد تلك اللغة. 27 لغة و27 مجموعة عتبات، إضافة إلى قواعد خاصة بكل لغة.",
    kw: "فحص الترجمة,فحص الترجمة النصية,التحقق من srt,تدقيق الترجمة,فحص توقيت الترجمة,جودة الترجمة,subtitle checker,subtitle qc,srt validator,مراجعة الترجمة",
    intro: "ارفع ملف ترجمة وافحصه بقواعد لغته نفسها - كل ملاحظة تعرض القيمة المقاسة والعتبة. كل شيء يعمل في المتصفح ولا يُرفع أي ملف.",
    feat: "يفحص التداخل، والمدة القصيرة أو الطويلة جداً، وسرعة القراءة، وعرض السطر، وعدد الأسطر، وكسر السطر غير المناسب، والترقيم، والمقاطع الفارغة، والترميز التالف. العرض والسرعة يتبعان نظام الكتابة: الصينية تُقاس بالأحرف كاملة العرض، والعلامات المركّبة في التايلاندية والعربية تُحسب بعرض صفر. القواعد الخاصة باللغة تغطي ¿ الافتتاحية في الإسبانية، والمسافة غير القابلة للكسر في الفرنسية قبل ? ! ; :، وعلامة الاستفهام اليونانية، وعلامات الترقيم كاملة العرض في الصينية واليابانية، والعلامات العربية. العناصر القابلة للإصلاح التلقائي مدرجة بشكل منفصل، والعناصر التي تحرك الأكواد الزمنية غير محددة افتراضياً.",
    who: "فرق الترجمة، ومورّدو التعريب، والمونتيرون، وكل من يريد فحص ملف قبل التسليم.",
    siteName: "AI-SRTSub", jsonldName: "AI-SRTSub", jsonldAlt: "Subtitle QC Checker"
  },
  'tr': {
    title: "Altyazı denetimi - dile göre zamanlama ve dizgi | AI-SRTSub",
    desc: "Ücretsiz çevrimiçi altyazı denetimi: SRT, VTT veya ASS yükleyin ve o dilin kurallarına göre çakışmaları, süreyi, okuma hızını, satır genişliğini, satır kesmelerini, numaralandırmayı ve kodlamayı denetleyin. 27 dil, 27 eşik seti ve dile özel kurallar.",
    kw: "altyazı denetimi,altyazı kontrol,srt doğrulama,altyazı düzeltme,altyazı zamanlama kontrolü,altyazı kalitesi,subtitle checker,subtitle qc,srt validator,altyazı inceleme",
    intro: "Bir altyazı dosyası yükleyin ve kendi dilinin kurallarıyla denetlenmesini sağlayın - her bulgu ölçülen değeri ve eşiği gösterir. Tamamen tarayıcıda çalışır, hiçbir şey yüklenmez.",
    feat: "Çakışmalar, çok kısa veya uzun süre, okuma hızı, satır genişliği, satır sayısı, yersiz satır kesmeleri, numaralandırma, boş altyazılar ve bozuk kodlama denetlenir. Genişlik ve hız yazı sistemine göre hesaplanır: Çince tam genişlikli karakterle ölçülür, Tayca ve Arapçadaki birleşik işaretler sıfır genişlik sayılır. Dile özel kurallar İspanyolcadaki açılış ¿ işaretini, Fransızcada ? ! ; : öncesindeki bölünmeyen boşluğu, Yunanca soru işaretini, Çince ve Japoncadaki tam genişlikli noktalamayı ve Arapça işaretleri kapsar. Otomatik düzeltilebilen maddeler ayrı listelenir ve zaman kodlarını kaydıranlar varsayılan olarak seçili değildir.",
    who: "Altyazı ekipleri, yerelleştirme sağlayıcıları, kurgucular ve teslimden önce dosyasını denetlemek isteyen herkes.",
    siteName: "AI-SRTSub", jsonldName: "AI-SRTSub", jsonldAlt: "Subtitle QC Checker"
  },
  'nl': {
    title: "Ondertitelcontrole - timing en opmaak per taal | AI-SRTSub",
    desc: "Gratis online ondertitelcontrole: laad SRT, VTT of ASS en controleer overlappingen, duur, leestempo, regelbreedte, regeleinden, nummering en codering volgens de regels van die taal. 27 talen, 27 sets drempels plus taalspecifieke regels.",
    kw: "ondertitelcontrole,ondertitels controleren,srt validatie,ondertitels corrigeren,ondertitel timing controleren,ondertitelkwaliteit,subtitle checker,subtitle qc,srt validator,ondertitels nakijken",
    intro: "Laad een ondertitelbestand en laat het controleren volgens de regels van de eigen taal - elke bevinding geeft de gemeten waarde en de drempel. Alles draait in de browser, er wordt niets geüpload.",
    feat: "Controleert overlappingen, te korte of te lange weergave, leestempo, regelbreedte, aantal regels, onhandige regeleinden, nummering, lege ondertitels en kapotte codering. Breedte en tempo volgen het schriftsysteem: Chinees wordt gemeten in volle tekenbreedte, gecombineerde tekens in het Thais en Arabisch tellen als nul breedte. Taalspecifieke regels omvatten de Spaanse openings-¿, de Franse vaste spatie voor ? ! ; :, het Griekse vraagteken, volledige leestekens in het Chinees en Japans en de Arabische tekens. Automatisch corrigeerbare items staan apart en wat tijdcodes verschuift staat standaard uitgevinkt.",
    who: "Ondertitelteams, lokalisatiebureaus, editors en iedereen die een bestand vóór levering wil controleren.",
    siteName: "AI-SRTSub", jsonldName: "AI-SRTSub", jsonldAlt: "Subtitle QC Checker"
  },
  'pl': {
    title: "Kontrola napisów - czas i układ według języka | AI-SRTSub",
    desc: "Darmowa kontrola napisów online: wczytaj SRT, VTT lub ASS i sprawdź nakładanie, czas trwania, tempo czytania, szerokość wiersza, łamanie wierszy, numerację i kodowanie według reguł tego języka. 27 języków, 27 zestawów progów oraz reguły dla konkretnych języków.",
    kw: "kontrola napisów,sprawdzanie napisów,walidator srt,korekta napisów,kontrola czasu napisów,jakość napisów,subtitle checker,subtitle qc,srt validator,sprawdzenie napisów",
    intro: "Wczytaj plik napisów i sprawdź go według reguł jego własnego języka - każde znalezisko podaje wartość zmierzoną i próg. Wszystko działa w przeglądarce, nic nie jest wysyłane.",
    feat: "Sprawdza nakładanie, zbyt krótki lub długi czas, tempo czytania, szerokość wiersza, liczbę wierszy, niefortunne łamanie, numerację, puste napisy i uszkodzone kodowanie. Szerokość i tempo wynikają z systemu pisma: chiński mierzony jest pełną szerokością znaku, znaki łączone w tajskim i arabskim mają zerową szerokość. Reguły językowe obejmują hiszpańskie otwierające ¿, francuską spację niełamliwą przed ? ! ; :, grecki znak zapytania, pełnoszerokościową interpunkcję w chińskim i japońskim oraz znaki arabskie. Pozycje możliwe do automatycznej poprawy są wyszczególnione osobno, a te przesuwające kody czasu są domyślnie odznaczone.",
    who: "Grupy napisów, dostawcy lokalizacji, montażyści i każdy, kto chce sprawdzić plik przed przekazaniem.",
    siteName: "AI-SRTSub", jsonldName: "AI-SRTSub", jsonldAlt: "Subtitle QC Checker"
  },
  'sv': {
    title: "Undertextkontroll - timing och layout per språk | AI-SRTSub",
    desc: "Gratis undertextkontroll online: ladda SRT, VTT eller ASS och kontrollera överlappningar, varaktighet, läshastighet, radbredd, radbrytningar, numrering och kodning enligt reglerna för det språket. 27 språk, 27 gränsvärden plus språkspecifika regler.",
    kw: "undertextkontroll,kontrollera undertexter,srt-validering,korrigera undertexter,kontrollera undertexttiming,undertextkvalitet,subtitle checker,subtitle qc,srt validator,granska undertexter",
    intro: "Ladda en undertextfil och låt den kontrolleras enligt sitt eget språks regler - varje fynd visar uppmätt värde och gräns. Allt körs i webbläsaren, inget laddas upp.",
    feat: "Kontrollerar överlappningar, för kort eller lång visningstid, läshastighet, radbredd, antal rader, klumpiga radbrytningar, numrering, tomma undertexter och trasig kodning. Bredd och hastighet följer skriftsystemet: kinesiska mäts i hela teckenbredder, kombinerande tecken i thailändska och arabiska räknas som noll bredd. Språkspecifika regler täcker spanskans inledande ¿, franskans hårda mellanslag före ? ! ; :, grekiskt frågetecken, fullbreddsskiljetecken i kinesiska och japanska samt arabiska tecken. Automatiskt rättningsbara poster listas separat och de som flyttar tidskoder är avmarkerade som standard.",
    who: "Undertextgrupper, lokaliseringsleverantörer, klippare och alla som vill kontrollera en fil före leverans.",
    siteName: "AI-SRTSub", jsonldName: "AI-SRTSub", jsonldAlt: "Subtitle QC Checker"
  },
  'cs': {
    title: "Kontrola titulků - timing a sazba podle jazyka | AI-SRTSub",
    desc: "Bezplatná online kontrola titulků: načtěte SRT, VTT nebo ASS a zkontrolujte překrývání, délku, rychlost čtení, šířku řádku, zalomení, číslování a kódování podle pravidel daného jazyka. 27 jazyků, 27 sad prahů a pravidla pro konkrétní jazyky.",
    kw: "kontrola titulků,kontrola titulků srt,validace srt,oprava titulků,kontrola času titulků,kvalita titulků,subtitle checker,subtitle qc,srt validator,kontrola kvality titulků",
    intro: "Načtěte soubor s titulky a nechte ho zkontrolovat podle pravidel jeho vlastního jazyka - u každého nálezu je uvedena naměřená hodnota a práh. Vše běží v prohlížeči, nic se nenahrává.",
    feat: "Kontroluje překrývání, příliš krátké nebo dlouhé zobrazení, rychlost čtení, šířku řádku, počet řádků, nevhodné zalomení, číslování, prázdné titulky a rozbité kódování. Šířka a rychlost vycházejí ze systému písma: čínština se měří v plné šířce znaku, kombinující značky v thajštině a arabštině mají nulovou šířku. Jazyková pravidla pokrývají španělské úvodní ¿, francouzskou pevnou mezeru před ? ! ; :, řecký otazník, plnošířkovou interpunkci v čínštině a japonštině a arabské znaky. Položky opravitelné automaticky jsou uvedeny zvlášť a ty, které posouvají časové kódy, jsou ve výchozím stavu nezaškrtnuté.",
    who: "Týmy titulků, dodavatelé lokalizace, střihači a kdokoli, kdo chce soubor před odevzdáním zkontrolovat.",
    siteName: "AI-SRTSub", jsonldName: "AI-SRTSub", jsonldAlt: "Subtitle QC Checker"
  },
  'uk': {
    title: "Перевірка субтитрів - таймінг і верстка за мовою | AI-SRTSub",
    desc: "Безкоштовна онлайн-перевірка субтитрів: завантажте SRT, VTT або ASS і перевірте перекриття, тривалість, швидкість читання, ширину рядка, переноси, нумерацію та кодування за правилами цієї мови. 27 мов, 27 наборів порогів і правила для окремих мов.",
    kw: "перевірка субтитрів,перевірити субтитри,валідатор srt,виправлення субтитрів,перевірка таймінгу субтитрів,якість субтитрів,subtitle checker,subtitle qc,srt validator,перевірка srt",
    intro: "Завантажте файл субтитрів і перевірте його за правилами його власної мови - кожна знахідка містить виміряне значення і поріг. Усе працює в браузері, файл нікуди не надсилається.",
    feat: "Перевіряються перекриття, надто короткий або довгий показ, швидкість читання, ширина рядка, кількість рядків, невдалі переноси, нумерація, порожні субтитри та зіпсована кодування. Ширина і швидкість визначаються системою письма: китайська вимірюється повноширинними символами, комбіновані знаки тайської та арабської мають нульову ширину. Мовні правила охоплюють відкривне ¿ в іспанській, нерозривний пробіл у французькій перед ? ! ; :, грецький знак питання, повноширинну пунктуацію в китайській і японській та арабські знаки. Те, що правиться автоматично, винесено окремо, а те, що зсуває таймкоди, за замовчуванням вимкнено.",
    who: "Командам субтитрів, постачальникам локалізації, монтажерам і всім, хто хоче перевірити файл перед здачею.",
    siteName: "AI-SRTSub", jsonldName: "AI-SRTSub", jsonldAlt: "Subtitle QC Checker"
  },
  'da': {
    title: "Undertekstkontrol - timing og layout pr. sprog | AI-SRTSub",
    desc: "Gratis online undertekstkontrol: indlæs SRT, VTT eller ASS og kontroller overlap, varighed, læsehastighed, linjebredde, linjeskift, nummerering og kodning efter reglerne for det sprog. 27 sprog, 27 sæt grænseværdier plus sprogsspecifikke regler.",
    kw: "undertekstkontrol,kontroller undertekster,srt-validering,ret undertekster,kontroller underteksttiming,undertekstkvalitet,subtitle checker,subtitle qc,srt validator,gennemse undertekster",
    intro: "Indlæs en undertekstfil og få den kontrolleret efter sit eget sprogs regler - hvert fund viser den målte værdi og grænsen. Det hele kører i browseren, intet uploades.",
    feat: "Kontrollerer overlap, for kort eller lang visningstid, læsehastighed, linjebredde, antal linjer, uheldige linjeskift, nummerering, tomme undertekster og ødelagt kodning. Bredde og hastighed følger skriftsystemet: kinesisk måles i fuld tegnbredde, kombinerende tegn i thai og arabisk tæller som nul bredde. Sprogsspecifikke regler dækker spansk indledende ¿, fransk fast mellemrum før ? ! ; :, græsk spørgsmålstegn, fuld bredde-tegnsætning på kinesisk og japansk samt arabiske tegn. Automatisk rettelige punkter er listet separat, og dem der flytter tidskoder er fravalgt som standard.",
    who: "Underteksthold, lokaliseringspartnere, klippere og alle der vil kontrollere en fil før levering.",
    siteName: "AI-SRTSub", jsonldName: "AI-SRTSub", jsonldAlt: "Subtitle QC Checker"
  },
  'fi': {
    title: "Tekstitysten tarkistus - ajoitus ja asettelu kielen mukaan | AI-SRTSub",
    desc: "Ilmainen verkkotarkistus tekstityksille: lataa SRT, VTT tai ASS ja tarkista päällekkäisyydet, kesto, lukunopeus, rivin leveys, rivinvaihdot, numerointi ja merkistö kyseisen kielen sääntöjen mukaan. 27 kieltä, 27 raja-arvosarjaa sekä kielikohtaisia sääntöjä.",
    kw: "tekstitysten tarkistus,tarkista tekstitykset,srt-validointi,korjaa tekstitykset,tarkista tekstitysten ajoitus,tekstitysten laatu,subtitle checker,subtitle qc,srt validator,tekstitysten tarkastus",
    intro: "Lataa tekstitystiedosto ja tarkistuta se oman kielensä säännöillä - jokainen löydös näyttää mitatun arvon ja rajan. Kaikki toimii selaimessa, mitään ei ladata ylös.",
    feat: "Tarkistaa päällekkäisyydet, liian lyhyen tai pitkän näyttöajan, lukunopeuden, rivin leveyden, rivimäärän, huonot rivinvaihdot, numeroinnin, tyhjät tekstitykset ja rikkinäisen merkistön. Leveys ja nopeus seuraavat kirjoitusjärjestelmää: kiina mitataan täysleveinä merkkeinä, thain ja arabian yhdistyvät merkit lasketaan nollalevyisiksi. Kielikohtaiset säännöt kattavat espanjan aloittavan ¿-merkin, ranskan sitovan välilyönnin ennen ? ! ; :, kreikkalaisen kysymysmerkin, kiinan ja japanin täysleveät välimerkit sekä arabialaiset merkit. Automaattisesti korjattavat kohdat on listattu erikseen, ja aikakoodeja siirtävät kohdat ovat oletuksena valitsematta.",
    who: "Tekstitystiimeille, lokalisointikumppaneille, leikkaajille ja kaikille, jotka haluavat tarkistaa tiedoston ennen luovutusta.",
    siteName: "AI-SRTSub", jsonldName: "AI-SRTSub", jsonldAlt: "Subtitle QC Checker"
  },
  'el': {
    title: "Έλεγχος υποτίτλων - χρονισμός και στοίχιση ανά γλώσσα | AI-SRTSub",
    desc: "Δωρεάν διαδικτυακός έλεγχος υποτίτλων: φορτώστε SRT, VTT ή ASS και ελέγξτε επικαλύψεις, διάρκεια, ταχύτητα ανάγνωσης, πλάτος γραμμής, αλλαγές γραμμής, αρίθμηση και κωδικοποίηση σύμφωνα με τους κανόνες της γλώσσας. 27 γλώσσες, 27 σειρές ορίων και κανόνες ανά γλώσσα.",
    kw: "έλεγχος υποτίτλων,έλεγχος srt,επικύρωση srt,διόρθωση υποτίτλων,έλεγχος χρονισμού υποτίτλων,ποιότητα υποτίτλων,subtitle checker,subtitle qc,srt validator,επιμέλεια υποτίτλων",
    intro: "Φορτώστε ένα αρχείο υποτίτλων και ελέγξτε το σύμφωνα με τους κανόνες της δικής του γλώσσας - κάθε εύρημα δείχνει τη μετρημένη τιμή και το όριο. Όλα τρέχουν στον περιηγητή, δεν ανεβαίνει τίποτα.",
    feat: "Ελέγχει επικαλύψεις, πολύ σύντομη ή μεγάλη διάρκεια, ταχύτητα ανάγνωσης, πλάτος γραμμής, αριθμό γραμμών, ακατάλληλες αλλαγές γραμμής, αρίθμηση, κενούς υπότιτλους και χαλασμένη κωδικοποίηση. Το πλάτος και η ταχύτητα ακολουθούν το σύστημα γραφής: τα κινεζικά μετρώνται σε χαρακτήρες πλήρους πλάτους, τα συνδυαστικά σημεία στα ταϊλανδικά και τα αραβικά μετρώνται ως μηδενικό πλάτος. Οι κανόνες ανά γλώσσα καλύπτουν το ισπανικό εναρκτήριο ¿, το γαλλικό αδιάσπαστο διάστημα πριν από ? ! ; :, το ελληνικό ερωτηματικό, τα σημεία στίξης πλήρους πλάτους στα κινεζικά και τα ιαπωνικά και τα αραβικά σημεία. Τα στοιχεία που διορθώνονται αυτόματα εμφανίζονται ξεχωριστά και όσα μετακινούν τους χρονικούς κώδικες είναι εξ ορισμού ανεπιλεγμένα.",
    who: "Ομάδες υποτίτλων, πάροχοι τοπικοποίησης, μοντέρ και όποιος θέλει να ελέγξει ένα αρχείο πριν την παράδοση.",
    siteName: "AI-SRTSub", jsonldName: "AI-SRTSub", jsonldAlt: "Subtitle QC Checker"
  },
  'he': {
    title: "בדיקת כתוביות - תזמון ועימוד לפי שפה | AI-SRTSub",
    desc: "בדיקת כתוביות חינמית באינטרנט: טען SRT, VTT או ASS ובדוק חפיפות, משך, קצב קריאה, רוחב שורה, שבירות שורה, מספור וקידוד לפי הכללים של השפה הזאת. 27 שפות, 27 מערכי ספים וכללים ייעודיים לשפות.",
    kw: "בדיקת כתוביות,בדוק כתוביות,אימות srt,תיקון כתוביות,בדיקת תזמון כתוביות,איכות כתוביות,subtitle checker,subtitle qc,srt validator,ביקורת כתוביות",
    intro: "טען קובץ כתוביות ובדוק אותו לפי הכללים של השפה שלו - כל ממצא מציג את הערך שנמדד ואת הסף. הכול רץ בדפדפן, שום דבר לא מועלה.",
    feat: "בודק חפיפות, תצוגה קצרה או ארוכה מדי, קצב קריאה, רוחב שורה, מספר שורות, שבירות שורה לא מוצלחות, מספור, כתוביות ריקות וקידוד שבור. הרוחב והקצב נגזרים ממערכת הכתב: סינית נמדדת בתווים ברוחב מלא, סימנים משולבים בתאית ובערבית נספרים כרוחב אפס. הכללים הייעודיים מכסים את ה-¿ הפותחת בספרדית, הרווח הקשיח בצרפתית לפני ? ! ; :, סימן השאלה היווני, פיסוק ברוחב מלא בסינית וביפנית והסימנים הערביים. פריטים שניתן לתקן אוטומטית מופיעים בנפרד, ואלה שמזיזים קודי זמן אינם מסומנים כברירת מחדל.",
    who: "צוותי כתוביות, ספקי לוקליזציה, עורכים וכל מי שרוצה לבדוק קובץ לפני מסירה.",
    siteName: "AI-SRTSub", jsonldName: "AI-SRTSub", jsonldAlt: "Subtitle QC Checker"
  },
  'ro': {
    title: "Verificare subtitrări - timing și aspect pe limbă | AI-SRTSub",
    desc: "Verificare gratuită de subtitrări online: încarcă SRT, VTT sau ASS și verifică suprapunerile, durata, viteza de citire, lățimea liniei, tăierile de linie, numerotarea și codificarea după regulile limbii respective. 27 de limbi, 27 de seturi de praguri și reguli specifice pe limbă.",
    kw: "verificare subtitrări,verificare srt,validare srt,corectare subtitrări,verificare timing subtitrări,calitate subtitrări,subtitle checker,subtitle qc,srt validator,revizuire subtitrări",
    intro: "Încarcă un fișier de subtitrări și verifică-l după regulile limbii lui - fiecare constatare afișează valoarea măsurată și pragul. Totul rulează în browser, nu se încarcă nimic.",
    feat: "Verifică suprapunerile, afișarea prea scurtă sau prea lungă, viteza de citire, lățimea liniei, numărul de linii, tăierile nepotrivite, numerotarea, subtitrările goale și codificarea stricată. Lățimea și viteza urmează sistemul de scriere: chineza se măsoară în caractere de lățime întreagă, semnele combinante din thailandeză și arabă se numără ca lățime zero. Regulile specifice acoperă ¿-ul de deschidere din spaniolă, spațiul insecabil din franceză înainte de ? ! ; :, semnul întrebării grecesc, punctuația de lățime întreagă în chineză și japoneză și semnele arabe. Elementele care se pot corecta automat sunt listate separat, iar cele care mută codurile de timp sunt debifate implicit.",
    who: "Echipe de subtitrare, furnizori de localizare, editori și oricine vrea să verifice un fișier înainte de livrare.",
    siteName: "AI-SRTSub", jsonldName: "AI-SRTSub", jsonldAlt: "Subtitle QC Checker"
  }
};

/* v0.9.352：第十八个页面 —— YouTube 字幕优化（/ytfix.html）
   与前面十七页同一套字段：title / desc / kw / intro / feat / who + 品牌三件套。
   ⚠️ 这一页的卖点不是「又一个字幕清洗器」，而是**只动边界、不动字**：
      desc 与 feat 里必须出现「一个字都不改」「文本逐字核对」这两层，否则用户会
      以为它跟乱码修复、字幕清洗是同一个东西。
   ⚠️ 「100 种语言」是**字幕语言**（引擎支持），与站上界面语言（27 内置 + 73 分片）
      是两件事，写文案时别混：这里说的是「能处理 100 种语言的字幕」。 */
const SEO_YTFIX = {
  'zh-CN': {
    title: "YouTube 字幕优化 - 把断在半句的字幕重新对齐 | 随心字幕 AI",
    desc: "油管自动字幕按固定 3~4 秒切条，句子常被切断。本工具一个字不改，只把断句边界搬回句子真正结束的位置。免费，支持 100 种语言。",
    kw: "youtube字幕优化,youtube自动字幕修复,字幕断句,字幕重切,字幕时间轴对齐,srt断句,字幕句子合并,subtitle realign,youtube subtitle fix,sentence alignment",
    intro: "把 YouTube 自动生成的字幕丢进来，选好语言，工具会把跨条断开的句子拼回去，再按句子重新切条。一个字都不改，时间轴尽量落在原字幕的真实时间点上。",
    feat: "YouTube 自动字幕按近似固定的 3~4 秒切条，切点跟句子无关，所以常见「上一句的尾巴 + 下一句的开头」挤在同一条里。本工具以原字幕的时间戳为锚点——那些时间本来就是语音识别给出的真实词边界——按标点判断句子在哪结束，用动态规划在句末、逗号、连词、硬切之间选代价最小的落点，再按语速把停留时间补回去。100 种语言各有一套断句规则：中文和日文没有词间空格，泰文连词边界都不明显，印地语用 ।，阿拉伯语用 ؟，亚美尼亚语用 ։。行宽上限与阅读速度按文字系统分档，中文默认每行 16 字，西文 42 字符。导出前会逐字核对文本，字少了或多了当场告警。",
    who: "把 YouTube、播客、网课的自动字幕整理成正式字幕的字幕组和译制团队，以及自己剪视频、被半句字幕烦到的创作者。",
    siteName: "随心字幕 AI", jsonldName: "随心字幕 AI", jsonldAlt: "YouTube Subtitle Realigner"
  },
  'zh-TW': {
    title: "YouTube 字幕優化 - 把斷在半句的字幕重新對齊 | 隨心字幕 AI",
    desc: "免費線上修復 YouTube 自動字幕：官方自動字幕依固定 3~4 秒切條，不看句子在哪結束，於是上一句的尾巴掛到下一條開頭。本工具一個字都不改，只把邊界搬回句子該在的位置，時間軸沿用原字幕的真實錨點。可處理 100 種語言的字幕，全程在瀏覽器裡跑。",
    kw: "youtube字幕優化,youtube自動字幕修復,字幕斷句,字幕重切,字幕時間軸對齊,srt斷句,字幕句子合併,subtitle realign,youtube subtitle fix,sentence alignment",
    intro: "把 YouTube 自動產生的字幕丟進來，選好語言，工具會把跨條斷開的句子接回去，再依句子重新切條。一個字都不改，時間軸盡量落在原字幕的真實時間點上。",
    feat: "YouTube 自動字幕依近似固定的 3~4 秒切條，切點跟句子無關，所以常見「上一句的尾巴 + 下一句的開頭」擠在同一條裡。本工具以原字幕的時間戳為錨點——那些時間本來就是語音辨識給出的真實詞邊界——依標點判斷句子在哪結束，用動態規劃在句末、逗號、連接詞、硬切之間選代價最小的落點，再依語速把停留時間補回去。100 種語言各有一套斷句規則：中文與日文沒有詞間空格，泰文連詞邊界都不明顯，印地語用 ।，阿拉伯語用 ؟，亞美尼亞語用 ։。行寬上限與閱讀速度依文字系統分檔，中文預設每行 16 字，西文 42 字元。匯出前會逐字核對文字，字少了或多了當場告警。",
    who: "把 YouTube、Podcast、線上課程的自動字幕整理成正式字幕的字幕組與譯製團隊，以及自己剪片、被半句字幕煩到的創作者。",
    siteName: "隨心字幕 AI", jsonldName: "隨心字幕 AI", jsonldAlt: "YouTube Subtitle Realigner"
  },
  'en': {
    title: "YouTube Subtitle Realigner - Put Broken Sentences Back Together | AI-SRTSub",
    desc: "YouTube auto-captions break sentences at fixed 3-4 second marks. This tool keeps every word and moves the cue boundaries back to where sentences really end. Free, 100 languages.",
    kw: "youtube subtitle fix,youtube auto captions,subtitle realign,subtitle sentence alignment,fix broken subtitles,srt sentence alignment,subtitle re-segmentation,youtube captions repair,sentence aware subtitles",
    intro: "Drop in a YouTube auto-generated subtitle file, pick the language, and the tool stitches sentences back together across cues, then re-cuts the file sentence by sentence. Not a single word is changed, and cue times stay as close to the original timestamps as possible.",
    feat: "YouTube auto-captions are cut into near-fixed 3-4 second cues regardless of where sentences end, so one cue often carries the tail of the previous sentence plus the start of the next one. The tool treats the original timestamps as anchors - those times are the real word boundaries the speech recogniser produced - decides where each sentence ends from punctuation, and uses dynamic programming to pick the cheapest break point among sentence end, comma, conjunction and hard cut, then extends the on-screen time to match the reading rate. Each of the 100 languages has its own sentence rules: Chinese and Japanese have no spaces between words, Thai barely marks word edges, Hindi ends sentences with ।, Arabic with ؟, Armenian with ։. Line width and reading speed follow the writing system - 16 full-width characters per line for Chinese, 42 characters for Latin scripts. Before export the text is compared character by character, and any lost or added word is flagged on the spot.",
    who: "Subtitle teams turning YouTube, podcast and course auto-captions into finished subtitles, and creators editing their own videos who are tired of sentences that stop halfway.",
    siteName: "AI-SRTSub", jsonldName: "AI-SRTSub", jsonldAlt: "YouTube Subtitle Realigner"
  },
  'ja': {
    title: "YouTube 字幕最適化 - 途中で切れた文を組み直す | AI-SRTSub",
    desc: "YouTube の自動字幕を無料でオンライン修正。自動字幕は 3~4 秒ごとに機械的に区切られるため、前の文の後半が次の字幕の頭に付いてしまいます。本ツールは一字も変えず、区切りだけを文の終わりに戻します。元のタイムスタンプをアンカーとして使うので、時間軸も大きくずれません。100 言語の字幕に対応し、すべてブラウザ内で動作します。",
    kw: "youtube 字幕 修正,youtube 自動字幕,字幕 文節 区切り,字幕 再分割,字幕 タイミング 調整,srt 文分割,字幕 文 結合,subtitle realign,youtube subtitle fix,sentence alignment",
    intro: "YouTube の自動生成字幕を読み込んで言語を選ぶだけ。離れていた文をつなぎ直し、文単位で切り直します。一字も変えず、時間軸は元のタイムスタンプにできるだけ沿わせます。",
    feat: "YouTube の自動字幕は 3~4 秒というほぼ固定の長さで切られ、切れ目は文と無関係です。そのため 1 本の字幕に「前の文の尻尾」と「次の文の頭」が同居します。本ツールは元のタイムスタンプをアンカーとして使い（もともと音声認識が返した実際の語境界です）、句読点から文の終わりを判断し、動的計画法で文末・読点・接続詞・強制改行の中から最もコストの低い切れ目を選び、読み速度に合わせて表示時間を延ばします。100 言語それぞれに文分割の規則があります。中国語と日本語は語間に空白がなく、タイ語は語の境目すら曖昧で、ヒンディー語は ।、アラビア語は ؟、アルメニア語は ։ で文を終えます。行幅と読み速度は文字体系ごとに設定し、中国語は 1 行 16 字、ラテン文字は 42 文字が既定です。書き出す前にテキストを 1 文字ずつ照合し、欠けや増加があればその場で警告します。",
    who: "YouTube、ポッドキャスト、オンライン講座の自動字幕を正式な字幕に仕上げる字幕班や翻訳チーム、そして自分の動画を編集していて半端な字幕に困っているクリエイター。",
    siteName: "AI-SRTSub", jsonldName: "AI-SRTSub", jsonldAlt: "YouTube Subtitle Realigner"
  },
  'ko': {
    title: "YouTube 자막 최적화 - 중간에 끊긴 문장 재정렬 | AI-SRTSub",
    desc: "YouTube 자동 자막을 무료로 온라인 교정합니다. 자동 자막은 3~4초마다 기계적으로 잘려서 앞 문장의 꼬리가 다음 자막 첫머리에 붙습니다. 이 도구는 글자를 하나도 바꾸지 않고, 경계만 문장이 끝나는 자리로 되돌립니다. 원본 타임스탬프를 기준점으로 쓰기 때문에 시간축도 크게 어긋나지 않습니다. 100개 언어 자막 지원, 모든 처리는 브라우저에서 실행됩니다.",
    kw: "youtube 자막 수정,youtube 자동 자막,자막 문장 분할,자막 재분할,자막 시간축 정렬,srt 문장 분리,자막 문장 합치기,subtitle realign,youtube subtitle fix,sentence alignment",
    intro: "YouTube 자동 생성 자막을 넣고 언어를 고르면, 흩어져 있던 문장을 다시 이어 붙이고 문장 단위로 새로 자릅니다. 글자는 그대로 두고 시간축은 원본 타임스탬프에 최대한 붙입니다.",
    feat: "YouTube 자동 자막은 3~4초라는 거의 고정된 길이로 잘리며, 자르는 지점은 문장과 무관합니다. 그래서 한 자막에 앞 문장의 꼬리와 다음 문장의 머리가 함께 들어갑니다. 이 도구는 원본 타임스탬프를 기준점으로 삼고(원래 음성 인식이 준 실제 단어 경계입니다), 문장부호로 문장이 끝나는 곳을 판단하며, 동적 계획법으로 문장 끝·쉼표·접속사·강제 분할 중 비용이 가장 낮은 지점을 고른 뒤 읽기 속도에 맞춰 표시 시간을 늘립니다. 100개 언어마다 문장 분할 규칙이 따로 있습니다. 중국어와 일본어는 단어 사이에 띄어쓰기가 없고, 태국어는 단어 경계마저 흐리며, 힌디어는 ।, 아랍어는 ؟, 아르메니아어는 ։ 로 문장을 끝냅니다. 줄 폭과 읽기 속도는 문자 체계별로 다르게 잡으며 중국어는 한 줄 16자, 라틴 문자는 42자가 기본입니다. 내보내기 전에 텍스트를 글자 단위로 대조해 빠지거나 늘어난 글자가 있으면 즉시 경고합니다.",
    who: "YouTube, 팟캐스트, 온라인 강의의 자동 자막을 정식 자막으로 다듬는 자막팀과 번역팀, 그리고 직접 영상을 편집하다 반 토막 자막에 지친 크리에이터.",
    siteName: "AI-SRTSub", jsonldName: "AI-SRTSub", jsonldAlt: "YouTube Subtitle Realigner"
  },
  'es': {
    title: "Optimizador de subtítulos de YouTube - recomponer frases cortadas | AI-SRTSub",
    desc: "Los subtítulos automáticos de YouTube cortan cada 3-4 segundos. Esta herramienta mantiene tus palabras y ajusta las marcas al final real de las frases. Gratis, 100 idiomas.",
    kw: "arreglar subtítulos youtube,subtítulos automáticos youtube,realinear subtítulos,cortes de subtítulos,unir frases subtítulos,alinear frases srt,subtítulos por frases,subtitle realign,youtube subtitle fix,sentence alignment",
    intro: "Carga un subtítulo generado automáticamente por YouTube, elige el idioma y la herramienta vuelve a unir las frases que quedaron partidas entre subtítulos y recorta el archivo frase por frase. Ni una palabra cambia y los tiempos se quedan lo más cerca posible de las marcas originales.",
    feat: "Los subtítulos automáticos de YouTube se cortan en tramos de 3 o 4 segundos sin atender a las frases, así que un subtítulo suele llevar la cola de la frase anterior y el arranque de la siguiente. La herramienta toma las marcas de tiempo originales como anclas —son los límites reales de palabra que dio el reconocedor—, decide dónde termina cada frase por la puntuación y usa programación dinámica para elegir el corte más barato entre fin de frase, coma, conjunción y corte forzado; después alarga el tiempo en pantalla según la velocidad de lectura. Cada uno de los 100 idiomas tiene sus reglas: el chino y el japonés no separan palabras con espacios, el tailandés apenas marca límites, el hindi cierra con ।, el árabe con ؟ y el armenio con ։. El ancho de línea y la velocidad de lectura dependen del sistema de escritura: 16 caracteres de ancho completo por línea en chino y 42 caracteres en alfabetos latinos. Antes de exportar se compara el texto carácter a carácter y cualquier palabra perdida o añadida se avisa al momento.",
    who: "Equipos de subtitulado que convierten subtítulos automáticos de YouTube, pódcast y cursos en subtítulos finales, y creadores que editan sus propios vídeos y están hartos de frases que se cortan a medias.",
    siteName: "AI-SRTSub", jsonldName: "AI-SRTSub", jsonldAlt: "YouTube Subtitle Realigner"
  },
  'pt': {
    title: "Otimizador de legendas do YouTube - recompor frases cortadas | AI-SRTSub",
    desc: "As legendas automáticas do YouTube cortam a cada 3-4 segundos. Esta ferramenta mantém as palavras e ajusta as marcas para o fim real das frases. Grátis, 100 idiomas.",
    kw: "corrigir legendas youtube,legendas automáticas youtube,realinhar legendas,cortes de legendas,juntar frases legendas,alinhar frases srt,legendas por frase,subtitle realign,youtube subtitle fix,sentence alignment",
    intro: "Coloque uma legenda gerada automaticamente pelo YouTube, escolha o idioma e a ferramenta volta a unir as frases que ficaram partidas entre legendas e recorta o arquivo frase por frase. Nenhuma palavra muda e os tempos ficam o mais próximo possível das marcações originais.",
    feat: "As legendas automáticas do YouTube são cortadas em blocos de 3 a 4 segundos sem considerar as frases, então um bloco costuma levar o rabo da frase anterior e o começo da seguinte. A ferramenta usa os tempos originais como âncoras — são os limites reais de palavra que o reconhecedor produziu —, decide onde cada frase termina pela pontuação e usa programação dinâmica para escolher o corte de menor custo entre fim de frase, vírgula, conjunção e corte forçado; depois estende o tempo em tela conforme a velocidade de leitura. Cada um dos 100 idiomas tem suas regras: chinês e japonês não separam palavras com espaço, o tailandês quase não marca limites, o híndi fecha com ।, o árabe com ؟ e o armênio com ։. A largura de linha e a velocidade de leitura seguem o sistema de escrita: 16 caracteres de largura total por linha em chinês e 42 caracteres em alfabetos latinos. Antes de exportar, o texto é comparado caractere por caractere e qualquer palavra perdida ou acrescentada é avisada na hora.",
    who: "Equipes de legendagem que transformam legendas automáticas de YouTube, podcast e cursos em legendas finais, e criadores que editam os próprios vídeos e se cansam de frases cortadas no meio.",
    siteName: "AI-SRTSub", jsonldName: "AI-SRTSub", jsonldAlt: "YouTube Subtitle Realigner"
  },
  'de': {
    title: "YouTube-Untertitel optimieren - angeschnittene Sätze neu zusammensetzen | AI-SRTSub",
    desc: "YouTube-Autocaptions trennen Sätze starr alle 3-4 Sekunden. Dieses Tool ändert kein Wort, sondern setzt die Grenzen dorthin, wo Sätze wirklich enden. Kostenlos, 100 Sprachen.",
    kw: "youtube untertitel reparieren,automatische untertitel youtube,untertitel neu schneiden,untertitel satzgrenzen,sätze zusammenführen untertitel,untertitel zeitachse,srt satzgrenzen,subtitle realign,youtube subtitle fix,sentence alignment",
    intro: "Automatisch erzeugte YouTube-Untertitel hineinlegen, Sprache wählen - das Werkzeug fügt über Untertitelgrenzen zerrissene Sätze wieder zusammen und schneidet die Datei anschließend satzweise neu. Kein Wort wird verändert, die Zeiten bleiben so nah wie möglich an den Originalstempeln.",
    feat: "Automatische YouTube-Untertitel werden in fast feste Blöcke von 3 bis 4 Sekunden geschnitten, unabhängig vom Satz. Ein Block enthält deshalb oft das Ende des vorigen und den Anfang des nächsten Satzes. Das Werkzeug nimmt die Originalzeitstempel als Anker - das sind die echten Wortgrenzen der Spracherkennung -, entscheidet anhand der Satzzeichen, wo ein Satz endet, und wählt per dynamischer Programmierung die günstigste Schnittstelle zwischen Satzende, Komma, Konjunktion und hartem Schnitt. Danach wird die Anzeigedauer an die Lesegeschwindigkeit angepasst. Jede der 100 Sprachen hat eigene Regeln: Chinesisch und Japanisch trennen Wörter nicht mit Leerzeichen, Thai markiert Wortgrenzen kaum, Hindi endet mit ।, Arabisch mit ؟, Armenisch mit ։. Zeilenbreite und Lesetempo richten sich nach der Schrift: 16 Vollbreite-Zeichen pro Zeile im Chinesischen, 42 Zeichen bei lateinischen Schriften. Vor dem Export wird der Text Zeichen für Zeichen verglichen; fehlende oder zusätzliche Wörter werden sofort gemeldet.",
    who: "Untertitelteams, die automatische Untertitel von YouTube, Podcasts und Kursen zu fertigen Untertiteln machen, und Creator, die ihre Videos selbst schneiden und genug von halben Sätzen haben.",
    siteName: "AI-SRTSub", jsonldName: "AI-SRTSub", jsonldAlt: "YouTube Subtitle Realigner"
  },
  'fr': {
    title: "Optimiseur de sous-titres YouTube - recomposer les phrases coupées | AI-SRTSub",
    desc: "Les sous-titres auto de YouTube coupent toutes les 3-4 secondes. Cet outil garde vos mots et replace les limites là où les phrases se finissent vraiment. Gratuit, 100 langues.",
    kw: "réparer sous-titres youtube,sous-titres automatiques youtube,réaligner sous-titres,découpage sous-titres,regrouper phrases sous-titres,synchroniser phrases srt,sous-titres par phrase,subtitle realign,youtube subtitle fix,sentence alignment",
    intro: "Déposez un sous-titre généré automatiquement par YouTube, choisissez la langue : l'outil recolle les phrases séparées par un changement de sous-titre, puis redécoupe le fichier phrase par phrase. Aucun mot ne change et les temps restent au plus près des horodatages d'origine.",
    feat: "Les sous-titres automatiques de YouTube sont découpés en blocs de 3 à 4 secondes sans égard pour les phrases : un bloc contient donc souvent la fin de la phrase précédente et le début de la suivante. L'outil prend les horodatages d'origine comme ancrages - ce sont les véritables frontières de mots fournies par la reconnaissance vocale -, déduit de la ponctuation où chaque phrase se termine et choisit par programmation dynamique la coupure la moins coûteuse entre fin de phrase, virgule, conjonction et coupe forcée, puis allonge le temps d'affichage selon la vitesse de lecture. Chacune des 100 langues a ses règles : le chinois et le japonais n'espacent pas les mots, le thaï marque à peine les frontières, l'hindi termine par ।, l'arabe par ؟, l'arménien par ։. La largeur de ligne et la vitesse de lecture suivent le système d'écriture : 16 caractères pleine chasse par ligne en chinois, 42 caractères pour les alphabets latins. Avant l'export, le texte est comparé caractère par caractère et tout mot perdu ou ajouté est signalé sur-le-champ.",
    who: "Les équipes de sous-titrage qui transforment les sous-titres automatiques de YouTube, de podcasts et de cours en sous-titres finis, et les créateurs qui montent leurs propres vidéos et en ont assez des phrases coupées en deux.",
    siteName: "AI-SRTSub", jsonldName: "AI-SRTSub", jsonldAlt: "YouTube Subtitle Realigner"
  },
  'it': {
    title: "Ottimizzatore di sottotitoli YouTube - ricomporre le frasi spezzate | AI-SRTSub",
    desc: "I sottotitoli auto di YouTube tagliano ogni 3-4 secondi. Questo strumento tiene le tue parole e sposta i confini dove le frasi finiscono davvero. Gratis, 100 lingue.",
    kw: "riparare sottotitoli youtube,sottotitoli automatici youtube,riallineare sottotitoli,divisione sottotitoli,unire frasi sottotitoli,allineare frasi srt,sottotitoli per frase,subtitle realign,youtube subtitle fix,sentence alignment",
    intro: "Carica un sottotitolo generato automaticamente da YouTube, scegli la lingua e lo strumento ricuce le frasi spezzate tra un sottotitolo e l'altro, poi ritaglia il file frase per frase. Nessuna parola cambia e i tempi restano il più vicino possibile ai timecode originali.",
    feat: "I sottotitoli automatici di YouTube sono tagliati in blocchi di 3-4 secondi senza badare alle frasi, quindi un blocco porta spesso la coda della frase precedente e l'inizio della successiva. Lo strumento usa i timecode originali come ancore - sono i confini reali di parola prodotti dal riconoscimento vocale -, capisce dalla punteggiatura dove finisce ogni frase e con la programmazione dinamica sceglie il taglio meno costoso tra fine frase, virgola, congiunzione e taglio forzato, poi allunga la permanenza a schermo in base alla velocità di lettura. Ognuna delle 100 lingue ha le sue regole: cinese e giapponese non separano le parole con spazi, il thai segna a malapena i confini, l'hindi chiude con ।, l'arabo con ؟, l'armeno con ։. Larghezza di riga e velocità di lettura seguono il sistema di scrittura: 16 caratteri a larghezza piena per riga in cinese, 42 caratteri per gli alfabeti latini. Prima dell'esportazione il testo viene confrontato carattere per carattere e ogni parola persa o aggiunta viene segnalata subito.",
    who: "Team di sottotitolaggio che trasformano i sottotitoli automatici di YouTube, podcast e corsi in sottotitoli finiti, e creator che montano i propri video e sono stanchi delle frasi tagliate a metà.",
    siteName: "AI-SRTSub", jsonldName: "AI-SRTSub", jsonldAlt: "YouTube Subtitle Realigner"
  },
  'nl': {
    title: "YouTube-ondertitels optimaliseren - afgebroken zinnen weer heel maken | AI-SRTSub",
    desc: "YouTube-autocaptions breken zinnen na 3-4 seconden. Deze tool behoudt elk woord en verplaatst grenzen naar echte zine-einden. Gratis, 100 talen.",
    kw: "youtube ondertitels repareren,automatische ondertitels youtube,ondertitels opnieuw knippen,zinsegrenzen ondertitels,zinnen samenvoegen ondertitels,tijdlijn ondertitels,srt zinsplitsing,subtitle realign,youtube subtitle fix,sentence alignment",
    intro: "Sleep een automatisch gegenereerde YouTube-ondertitel erin, kies de taal en de tool lijmt zinnen die over ondertitels heen waren gesplitst weer aan elkaar, waarna het bestand per zin opnieuw wordt geknipt. Geen woord verandert en de tijden blijven zo dicht mogelijk bij de originele tijdstippen.",
    feat: "Automatische YouTube-ondertitels worden in blokken van 3 tot 4 seconden geknipt, ongeacht de zinnen. Eén blok bevat daardoor vaak de staart van de vorige en het begin van de volgende zin. De tool gebruikt de originele tijdstippen als anker - dat zijn de echte woordgrenzen van de spraakherkenning -, bepaalt aan de leestekens waar een zin eindigt en kiest met dynamisch programmeren de goedkoopste knip tussen zinseinde, komma, voegwoord en harde knip. Daarna wordt de leesduur op het leestempo aangepast. Elk van de 100 talen heeft eigen regels: Chinees en Japans zetten geen spaties tussen woorden, Thai markeert woordgrenzen nauwelijks, Hindi eindigt met ।, Arabisch met ؟, Armeens met ։. Regelbreedte en leessnelheid volgen het schriftsysteem: 16 volledige tekens per regel in het Chinees, 42 tekens bij Latijnse schriften. Voor het exporteren wordt de tekst teken voor teken vergeleken en elk weggevallen of toegevoegd woord wordt meteen gemeld.",
    who: "Ondertitelteams die automatische ondertitels van YouTube, podcasts en cursussen omzetten in definitieve ondertitels, en makers die hun eigen video's monteren en genoeg hebben van halve zinnen.",
    siteName: "AI-SRTSub", jsonldName: "AI-SRTSub", jsonldAlt: "YouTube Subtitle Realigner"
  },
  'id': {
    title: "Pengoptimal Subtitle YouTube - menyambung kalimat yang terpotong | AI-SRTSub",
    desc: "Auto-caption YouTube memotong kalimat tiap 3-4 detik. Alat ini pertahankan kata & pindahkan batas ke akhir kalimat asli. Gratis, 100 bahasa.",
    kw: "perbaiki subtitle youtube,subtitle otomatis youtube,menyambung subtitle,pembagian kalimat subtitle,menggabungkan kalimat subtitle,menyejajarkan waktu srt,subtitle per kalimat,subtitle realign,youtube subtitle fix,sentence alignment",
    intro: "Masukkan subtitle hasil otomatis YouTube, pilih bahasanya, dan alat ini menyambung kembali kalimat yang terpisah antar-subtitle lalu memotong ulang per kalimat. Tidak ada kata yang diubah, dan waktu tetap sedekat mungkin dengan stempel waktu asli.",
    feat: "Subtitle otomatis YouTube dipotong dalam blok nyaris tetap 3-4 detik tanpa peduli batas kalimat, sehingga satu blok sering memuat ekor kalimat sebelumnya sekaligus awal kalimat berikutnya. Alat ini memakai stempel waktu asli sebagai jangkar - itulah batas kata sebenarnya dari pengenalan suara -, menentukan akhir kalimat dari tanda baca, lalu memakai pemrograman dinamis untuk memilih titik potong paling murah di antara akhir kalimat, koma, kata sambung, dan potong paksa, kemudian memperpanjang durasi tampil sesuai kecepatan baca. Setiap dari 100 bahasa punya aturannya sendiri: Mandarin dan Jepang tidak memakai spasi antar kata, Thai hampir tidak menandai batas kata, Hindi menutup dengan ।, Arab dengan ؟, Armenia dengan ։. Lebar baris dan kecepatan baca mengikuti sistem tulisan: 16 karakter lebar penuh per baris untuk Mandarin, 42 karakter untuk aksara Latin. Sebelum ekspor, teks dibandingkan karakter demi karakter dan kata yang hilang atau bertambah langsung diperingatkan.",
    who: "Tim subtitle yang mengubah subtitle otomatis YouTube, podcast, dan kursus daring menjadi subtitle rapi, serta kreator yang mengedit videonya sendiri dan bosan dengan kalimat terpotong separuh.",
    siteName: "AI-SRTSub", jsonldName: "AI-SRTSub", jsonldAlt: "YouTube Subtitle Realigner"
  },
  'hi': {
    title: "YouTube सबटाइटल ऑप्टिमाइज़र - आधे कटे वाक्य फिर से जोड़ें | AI-SRTSub",
    desc: "यूट्यूब ऑटो-कैप्शन 3-4 सेकंड पर वाक्य तोड़ते हैं। यह टूल शब्द रखता है और सीमाएं वाक्य अंत पर ले जाता है। मुफ्त, 100 भाषाएं।",
    kw: "youtube सबटाइटल ठीक करें,ऑटो सबटाइटल youtube,सबटाइटल रीअलाइन,सबटाइटल वाक्य विभाजन,वाक्य जोड़ना सबटाइटल,srt वाक्य विभाजन,सबटाइटल टाइमिंग,subtitle realign,youtube subtitle fix,sentence alignment",
    intro: "YouTube से अपने आप बने सबटाइटल डालें, भाषा चुनें - टूल सबटाइटल के बीच बँटे वाक्यों को फिर जोड़ता है और फिर वाक्य के हिसाब से फ़ाइल दोबारा काटता है। कोई शब्द नहीं बदलता और समय मूल टाइमस्टैम्प के जितना क़रीब हो सके उतना ही रहता है।",
    feat: "YouTube के ऑटो सबटाइटल लगभग तय 3-4 सेकंड के टुकड़ों में काटे जाते हैं, कट वाक्य से कोई संबंध नहीं रखता, इसलिए एक ही टुकड़े में पिछले वाक्य की पूँछ और अगले वाक्य की शुरुआत साथ आ जाती है। यह टूल मूल टाइमस्टैम्प को एंकर बनाता है - वे असल में स्पीच रिकग्निशन के दिए हुए सच्चे शब्द-बिंदु हैं -, विराम चिह्नों से तय करता है कि वाक्य कहाँ ख़त्म होता है, और डायनैमिक प्रोग्रामिंग से वाक्यांत, अल्पविराम, संयोजक और ज़बरदस्ती कट के बीच सबसे कम क़ीमत वाला कट चुनता है, फिर पढ़ने की गति के हिसाब से स्क्रीन पर रहने का समय बढ़ाता है। 100 भाषाओं में से हर एक के अपने नियम हैं: चीनी और जापानी में शब्दों के बीच स्पेस नहीं होता, थाई में शब्द की सीमा भी धुँधली है, हिन्दी में वाक्य । पर ख़त्म होता है, अरबी में ؟, आर्मेनियाई में ։। पंक्ति की चौड़ाई और पढ़ने की गति लिपि के हिसाब से तय होती है: चीनी में 16 पूर्ण-चौड़ाई अक्षर प्रति पंक्ति, लातिनी लिपियों में 42 अक्षर। निर्यात से पहले पाठ की अक्षर-दर-अक्षर तुलना होती है और कोई शब्द छूटा या बढ़ा हो तो तुरंत चेतावनी मिलती है।",
    who: "वे सबटाइटल टीमें जो YouTube, पॉडकास्ट और ऑनलाइन कोर्स के ऑटो सबटाइटल को तैयार सबटाइटल में बदलती हैं, और वे क्रिएटर जो अपने वीडियो ख़ुद एडिट करते हैं और आधे कटे वाक्यों से परेशान हैं।",
    siteName: "AI-SRTSub", jsonldName: "AI-SRTSub", jsonldAlt: "YouTube Subtitle Realigner"
  },
  'th': {
    title: "ปรับซับไตเติล YouTube - ต่อประโยคที่ถูกตัดครึ่งให้สมบูรณ์ | AI-SRTSub",
    desc: "คำบรรยายอัตโนมัติของ YouTube ตัดประโยคทุก 3-4 วินาที เครื่องนี้คงทุกคำและย้ายขอบเขตไปยังจุดสิ้นสุดจริง ฟรี 100 ภาษา",
    kw: "ซ่อมซับ youtube,ซับอัตโนมัติ youtube,จัดซับใหม่,แบ่งซับตามประโยค,รวมประโยคซับ,จัดเวลา srt,ซับแยกตามประโยค,subtitle realign,youtube subtitle fix,sentence alignment",
    intro: "วางไฟล์ซับที่ YouTube สร้างอัตโนมัติ เลือกภาษา แล้วเครื่องมือจะต่อประโยคที่ขาดออกจากกันข้ามซับให้กลับมาเป็นประโยคเดียว แล้วตัดไฟล์ใหม่ทีละประโยค ไม่มีการแก้ข้อความแม้แต่คำเดียว และเวลายังใกล้เคียงเวลาเดิมมากที่สุด",
    feat: "ซับอัตโนมัติของ YouTube ถูกตัดเป็นท่อนละประมาณ 3-4 วินาทีโดยไม่เกี่ยวกับประโยค ดังนั้นหนึ่งท่อนมักมีทั้งหางประโยคก่อนหน้าและต้นประโยคถัดไปปนกัน เครื่องมือนี้ใช้เวลาเดิมเป็นจุดยึด ซึ่งเป็นขอบเขตคำจริงที่ระบบรู้จำเสียงให้มา ตัดสินว่าประโยคจบตรงไหนจากเครื่องหมายวรรคตอน แล้วใช้การโปรแกรมแบบพลวัตเลือกจุดตัดที่ต้นทุนต่ำที่สุดระหว่างท้ายประโยค จุลภาค คำเชื่อม และการตัดกลางประโยค จากนั้นขยายเวลาที่แสดงตามความเร็วในการอ่าน แต่ละภาษาจาก 100 ภาษามีกฎต่างกัน จีนและญี่ปุ่นไม่เว้นวรรคระหว่างคำ ไทยแทบไม่แสดงขอบเขตคำ ฮินดีจบประโยคด้วย । อาหรับด้วย ؟ อาร์เมเนียด้วย ։ ความกว้างบรรทัดและความเร็วในการอ่านแบ่งตามระบบตัวอักษร จีนบรรทัดละ 16 ตัวอักษรเต็มความกว้าง อักษรละติน 42 ตัวอักษร ก่อนส่งออกจะเทียบข้อความทีละตัวอักษร ถ้ามีคำหายหรือเกินจะเตือนทันที",
    who: "ทีมซับที่แปลงซับอัตโนมัติจาก YouTube พอดแคสต์ และคอร์สออนไลน์ให้เป็นซับพร้อมใช้ และครีเอเตอร์ที่ตัดต่อวิดีโอเองแล้วเบื่อกับซับที่ตัดประโยคครึ่งๆ",
    siteName: "AI-SRTSub", jsonldName: "AI-SRTSub", jsonldAlt: "YouTube Subtitle Realigner"
  },
  'vi': {
    title: "Tối ưu phụ đề YouTube - nối lại câu bị cắt giữa chừng | AI-SRTSub",
    desc: "Phụ đề tự động YouTube cắt câu mỗi 3-4 giây. Công cụ này giữ nguyên từ và chỉnh lại ranh giới phụ đề chuẩn xác theo câu. Miễn phí với 100 ngôn ngữ.",
    kw: "sửa phụ đề youtube,phụ đề tự động youtube,nối lại phụ đề,chia phụ đề theo câu,gộp câu phụ đề,căn thời gian srt,phụ đề theo câu,subtitle realign,youtube subtitle fix,sentence alignment",
    intro: "Đưa vào tệp phụ đề do YouTube tạo tự động, chọn ngôn ngữ, công cụ sẽ nối lại những câu bị tách qua nhiều dòng rồi cắt lại theo từng câu. Không chữ nào bị sửa và thời gian vẫn bám sát mốc gốc nhất có thể.",
    feat: "Phụ đề tự động của YouTube bị cắt thành từng khối gần như cố định 3-4 giây, không quan tâm câu kết thúc ở đâu, nên một khối thường chứa cả đuôi câu trước lẫn đầu câu sau. Công cụ lấy mốc thời gian gốc làm điểm neo - đó chính là ranh giới từ thật do nhận dạng giọng nói trả về -, dựa vào dấu câu để xác định câu kết thúc ở đâu, rồi dùng quy hoạch động chọn điểm cắt rẻ nhất trong bốn khả năng: cuối câu, dấu phẩy, liên từ và cắt cứng; sau đó kéo dài thời gian hiển thị theo tốc độ đọc. Mỗi ngôn ngữ trong 100 ngôn ngữ có bộ quy tắc riêng: tiếng Trung và tiếng Nhật không có dấu cách giữa từ, tiếng Thái gần như không đánh dấu ranh giới từ, tiếng Hindi kết câu bằng ।, tiếng Ả Rập bằng ؟, tiếng Armenia bằng ։. Độ rộng dòng và tốc độ đọc tính theo hệ chữ: tiếng Trung 16 ký tự toàn khổ mỗi dòng, chữ Latinh 42 ký tự. Trước khi xuất, văn bản được đối chiếu từng ký tự, thiếu hay thừa chữ đều cảnh báo ngay.",
    who: "Nhóm làm phụ đề biến phụ đề tự động của YouTube, podcast và khóa học thành phụ đề hoàn chỉnh, cùng những người tự dựng video và đã chán cảnh câu bị cắt đôi.",
    siteName: "AI-SRTSub", jsonldName: "AI-SRTSub", jsonldAlt: "YouTube Subtitle Realigner"
  },
  'ru': {
    title: "Оптимизация субтитров YouTube — склеить разрезанные фразы | AI-SRTSub",
    desc: "Автосубтитры YouTube режут текст каждые 3-4 секунды. Этот инструмент сохраняет слова и двигает границы туда, где реально кончаются фразы. Бесплатно, 100 языков.",
    kw: "исправить субтитры youtube,автоматические субтитры youtube,переразбить субтитры,границы фраз субтитры,склеить фразы субтитры,выровнять таймкоды srt,субтитры по фразам,subtitle realign,youtube subtitle fix,sentence alignment",
    intro: "Загрузите субтитры, созданные YouTube автоматически, выберите язык — инструмент склеит фразы, разорванные между субтитрами, и заново нарежет файл по фразам. Ни одно слово не меняется, а время остаётся как можно ближе к исходным таймкодам.",
    feat: "Автоматические субтитры YouTube нарезаются почти ровными кусками по 3-4 секунды, не считаясь с фразами, поэтому в одном субтитре часто оказываются хвост предыдущей фразы и начало следующей. Инструмент берёт исходные таймкоды за опорные точки — это настоящие границы слов, которые выдало распознавание речи, — определяет конец фразы по знакам препинания и с помощью динамического программирования выбирает самый дешёвый разрез среди конца фразы, запятой, союза и принудительного разрыва, а затем продлевает показ по скорости чтения. У каждого из 100 языков свои правила: в китайском и японском нет пробелов между словами, в тайском границы слов почти не размечены, хинди заканчивает фразу на ।, арабский на ؟, армянский на ։. Ширина строки и скорость чтения зависят от письменности: 16 полноширинных знаков в строке для китайского, 42 знака для латиницы. Перед экспортом текст сверяется посимвольно, и о любом потерянном или лишнем слове сразу сообщается.",
    who: "Команды субтитров, которые превращают автоматические субтитры YouTube, подкастов и курсов в готовые субтитры, и авторы, монтирующие свои видео и уставшие от фраз, оборванных на середине.",
    siteName: "AI-SRTSub", jsonldName: "AI-SRTSub", jsonldAlt: "YouTube Subtitle Realigner"
  },
  'ar': {
    title: "تحسين ترجمات يوتيوب — إعادة ضبط الجمل المقطوعة | AI-SRTSub",
    desc: "الترجمة التلقائية في YouTube تقطع الجمل كل ٣-٤ ثوانٍ. هذه الأداة تحافظ على الكلمات وتنقل حدود الترجمة لنهاية الجمل الحقيقية. مجانية وبـ ١٠٠ لغة.",
    kw: "إصلاح ترجمات يوتيوب,الترجمة التلقائية يوتيوب,إعادة تقسيم الترجمات,حدود الجمل في الترجمة,دمج الجمل في الترجمة,ضبط توقيت srt,ترجمة حسب الجملة,subtitle realign,youtube subtitle fix,sentence alignment",
    intro: "أدخل ملف ترجمة أنشأه يوتيوب تلقائياً، واختر اللغة، فتعيد الأداة وصل الجمل التي انقسمت بين الترجمات ثم تقطع الملف من جديد جملةً جملة. لا تتغيّر أي كلمة، ويبقى التوقيت أقرب ما يمكن إلى الطوابع الأصلية.",
    feat: "تُقطع الترجمات التلقائية في يوتيوب إلى مقاطع شبه ثابتة من 3 إلى 4 ثوانٍ دون اعتبار للجمل، فيحمل المقطع الواحد ذيل الجملة السابقة وبداية الجملة التالية. تتخذ الأداة الطوابع الزمنية الأصلية مراسٍ لها، وهي حدود الكلمات الحقيقية التي أعطاها التعرّف على الكلام، وتستدل من علامات الترقيم على نهاية الجملة، ثم تستخدم البرمجة الديناميكية لاختيار أقل نقطة قطع كلفة بين نهاية الجملة والفاصلة وحرف العطف والقطع الاضطراري، وبعدها تمدّد زمن العرض بحسب سرعة القراءة. ولكل لغة من اللغات المئة قواعدها: الصينية واليابانية بلا فراغ بين الكلمات، والتايلاندية تكاد لا تعلّم حدود الكلمات، والهندية تنهي الجملة بـ ।، والعربية بـ ؟، والأرمنية بـ ։. ويُحسب عرض السطر وسرعة القراءة بحسب نظام الكتابة: 16 حرفاً كامل العرض في السطر للصينية، و42 حرفاً للكتابات اللاتينية. وقبل التصدير يُقارن النص حرفاً بحرف، ويُنبَّه فوراً إلى أي كلمة سقطت أو زادت.",
    who: "فرق الترجمة التي تحوّل ترجمات يوتيوب والبودكاست والدورات التلقائية إلى ترجمات جاهزة، وصنّاع المحتوى الذين يحرّرون فيديوهاتهم بأنفسهم وقد سئموا الجمل المقطوعة في منتصفها.",
    siteName: "AI-SRTSub", jsonldName: "AI-SRTSub", jsonldAlt: "YouTube Subtitle Realigner"
  },
  'tr': {
    title: "YouTube altyazı iyileştirme - yarıda kesilen cümleleri toparlayın | AI-SRTSub",
    desc: "YouTube otomatik altyazıları 3-4 saniyede bir keser. Bu araç kelimeleri korur ve sınırları cümlelerin bittiği yere taşır. Ücretsiz ve 100 dil desteğiyle.",
    kw: "youtube altyazı onarma,youtube otomatik altyazı,altyazı yeniden bölme,altyazı cümle sınırı,altyazı cümle birleştirme,altyazı zaman çizelgesi,srt cümle bölme,subtitle realign,youtube subtitle fix,sentence alignment",
    intro: "YouTube'un otomatik oluşturduğu altyazıyı yükleyin, dili seçin; araç altyazılar arasında bölünmüş cümleleri yeniden birleştirir, sonra dosyayı cümle cümle yeniden keser. Hiçbir kelime değişmez, zamanlar özgün damgalara olabildiğince yakın kalır.",
    feat: "YouTube otomatik altyazıları neredeyse sabit 3-4 saniyelik parçalara bölünür ve kesim noktası cümleyle ilgili değildir; bu yüzden bir parçada önceki cümlenin kuyruğu ile sonrakinin başı birlikte bulunur. Araç özgün zaman damgalarını çapa alır - bunlar konuşma tanımanın verdiği gerçek kelime sınırlarıdır -, cümlenin nerede bittiğini noktalama işaretlerinden çıkarır ve dinamik programlamayla cümle sonu, virgül, bağlaç ve zorunlu kesme arasından en düşük maliyetli noktayı seçer; ardından okuma hızına göre ekranda kalma süresini uzatır. 100 dilin her birinin kendi kuralı var: Çince ve Japonca sözcükler arasına boşluk koymaz, Tayca sözcük sınırlarını neredeyse hiç belirtmez, Hintçe cümleyi । ile, Arapça ؟ ile, Ermenice ։ ile bitirir. Satır genişliği ve okuma hızı yazı sistemine göre belirlenir: Çincede satır başına 16 tam genişlikli karakter, Latin alfabelerinde 42 karakter. Dışa aktarmadan önce metin karakter karakter karşılaştırılır; eksilen ya da eklenen kelime anında bildirilir.",
    who: "YouTube, podcast ve çevrimiçi derslerin otomatik altyazılarını kullanıma hazır altyazıya çeviren altyazı ekipleri ve kendi videosunu kurgularken yarım kalan cümlelerden bıkmış üreticiler.",
    siteName: "AI-SRTSub", jsonldName: "AI-SRTSub", jsonldAlt: "YouTube Subtitle Realigner"
  },
  'pl': {
    title: "Optymalizacja napisów YouTube - scalanie przeciętych zdań | AI-SRTSub",
    desc: "Automatyczne napisy YouTube dzielą zdanie co 3-4 sekundy. Narzędzie zachowuje każde słowo i przesuwa granice tam, gdzie kończą się zdania. Darmowe, 100 języków.",
    kw: "naprawa napisów youtube,automatyczne napisy youtube,ponowne cięcie napisów,granice zdań napisy,scalanie zdań napisy,wyrównanie czasu srt,napisy według zdań,subtitle realign,youtube subtitle fix,sentence alignment",
    intro: "Wrzuć napisy wygenerowane automatycznie przez YouTube, wybierz język, a narzędzie połączy zdania rozdzielone między napisami i przetnie plik od nowa, zdanie po zdaniu. Żadne słowo się nie zmienia, a czasy pozostają jak najbliżej oryginalnych znaczników.",
    feat: "Automatyczne napisy YouTube są cięte na bloki o prawie stałej długości 3-4 sekund, bez oglądania się na zdania, więc jeden blok często zawiera ogon poprzedniego zdania i początek następnego. Narzędzie przyjmuje oryginalne znaczniki czasu za punkty zaczepienia - to rzeczywiste granice słów zwrócone przez rozpoznawanie mowy - rozpoznaje koniec zdania po interpunkcji i za pomocą programowania dynamicznego wybiera najtańsze cięcie spośród końca zdania, przecinka, spójnika i cięcia wymuszonego, a potem wydłuża czas na ekranie zgodnie z tempem czytania. Każdy ze 100 języków ma własne zasady: chiński i japoński nie oddzielają słów spacjami, tajski prawie nie znaczy granic słów, hindi kończy zdanie znakiem ।, arabski ؟, ormiański ։. Szerokość wiersza i tempo czytania zależą od systemu pisma: 16 znaków pełnej szerokości w wierszu po chińsku, 42 znaki przy alfabetach łacińskich. Przed eksportem tekst jest porównywany znak po znaku, a każde brakujące lub dodane słowo jest natychmiast zgłaszane.",
    who: "Zespoły napisowe, które zamieniają automatyczne napisy z YouTube, podcastów i kursów w gotowe napisy, oraz twórcy montujący własne filmy i zmęczeni zdaniami uciętymi w połowie.",
    siteName: "AI-SRTSub", jsonldName: "AI-SRTSub", jsonldAlt: "YouTube Subtitle Realigner"
  },
  'sv': {
    title: "Optimera YouTube-undertexter - sätt ihop avhuggna meningar | AI-SRTSub",
    desc: "YouTube-undertexter bryter meningar var 3-4 sekund. Verktyget behåller orden och flyttar tidsgränserna dit meningarna slutar. Gratis, 100 språk.",
    kw: "reparera undertexter youtube,automatiska undertexter youtube,klippa om undertexter,meninggränser undertexter,slå ihop meningar undertexter,justera tidslinje srt,undertexter per mening,subtitle realign,youtube subtitle fix,sentence alignment",
    intro: "Lägg in en undertext som YouTube skapat automatiskt, välj språk, och verktyget fogar ihop meningar som delats mellan undertexter och klipper sedan om filen mening för mening. Inte ett ord ändras och tiderna ligger så nära originaltidsstämplarna som möjligt.",
    feat: "YouTubes automatiska undertexter klipps i nästan fasta block på 3-4 sekunder utan att bry sig om meningarna, så ett block innehåller ofta både slutet av föregående mening och början av nästa. Verktyget tar originaltidsstämplarna som ankare - det är de verkliga ordgränser taligenkänningen gav - avgör var meningen slutar utifrån skiljetecken och väljer med dynamisk programmering det billigaste klippet bland meningsslut, komma, konjunktion och påtvingat klipp, och förlänger sedan visningstiden efter läshastigheten. Var och en av de 100 språken har egna regler: kinesiska och japanska sätter inga mellanslag mellan ord, thailändska markerar knappt ordgränser, hindi avslutar med ।, arabiska med ؟, armeniska med ։. Radbredd och läshastighet följer skriftsystemet: 16 helbreddstecken per rad på kinesiska, 42 tecken för latinska skrifter. Före export jämförs texten tecken för tecken och varje förlorat eller tillagt ord larmas direkt.",
    who: "Undertextteam som gör färdiga undertexter av automatiska undertexter från YouTube, poddar och kurser, och kreatörer som klipper sina egna videor och tröttnat på meningar som kapas på mitten.",
    siteName: "AI-SRTSub", jsonldName: "AI-SRTSub", jsonldAlt: "YouTube Subtitle Realigner"
  },
  'cs': {
    title: "Optimalizace titulků YouTube - spojení přeťatých vět | AI-SRTSub",
    desc: "Automatické titulky YouTube dělí věty po 3-4 sekundách. Nástroj zachovává každé slovo a posouvá hranice tam, kde věty končí. Zdarma, 100 jazyků.",
    kw: "oprava titulků youtube,automatické titulky youtube,přestřižení titulků,hranice vět titulky,spojování vět titulky,zarovnání času srt,titulky podle vět,subtitle realign,youtube subtitle fix,sentence alignment",
    intro: "Vložte titulky, které YouTube vytvořil automaticky, vyberte jazyk a nástroj znovu spojí věty rozdělené mezi titulky a pak soubor přestřihne větu po větě. Nemění se žádné slovo a časy zůstávají co nejblíž původním značkám.",
    feat: "Automatické titulky YouTube se stříhají do bloků o téměř pevné délce 3-4 sekundy bez ohledu na věty, takže jeden blok často nese konec předchozí věty i začátek následující. Nástroj bere původní časové značky jako kotvy - to jsou skutečné hranice slov z rozpoznávání řeči -, podle interpunkce určí, kde věta končí, a pomocí dynamického programování vybere nejlevnější řez mezi koncem věty, čárkou, spojkou a vynuceným řezem; poté prodlouží dobu na obrazovce podle tempa čtení. Každý ze 100 jazyků má svá pravidla: čínština a japonština neoddělují slova mezerami, thajština hranice slov téměř neznačí, hindština končí větu znakem ।, arabština ؟, arménština ։. Šířka řádku a tempo čtení se řídí písmem: 16 znaků plné šířky na řádek v čínštině, 42 znaků u latinek. Před exportem se text porovnává znak po znaku a každé chybějící či přidané slovo se okamžitě ohlásí.",
    who: "Titulkovací týmy, které mění automatické titulky z YouTube, podcastů a kurzů v hotové titulky, a tvůrci, kteří si stříhají vlastní videa a mají dost vět uříznutých v půlce.",
    siteName: "AI-SRTSub", jsonldName: "AI-SRTSub", jsonldAlt: "YouTube Subtitle Realigner"
  },
  'uk': {
    title: "Оптимізація субтитрів YouTube — зшивання розірваних фраз | AI-SRTSub",
    desc: "Автосубтитри YouTube обрізають рядки кожні 3-4 секунди. Цей інструмент не чіпає слова, а переносить межі туди, де справді кінець. Безкоштовно, 100 мов.",
    kw: "виправити субтитри youtube,автоматичні субтитри youtube,перерозбити субтитри,межі фраз субтитри,зшити фрази субтитри,вирівняти таймкоди srt,субтитри за фразами,subtitle realign,youtube subtitle fix,sentence alignment",
    intro: "Завантажте субтитри, створені YouTube автоматично, виберіть мову — інструмент зшиє фрази, розірвані між субтитрами, і заново наріже файл по фразах. Жодне слово не змінюється, а час залишається якнайближче до оригінальних таймкодів.",
    feat: "Автоматичні субтитри YouTube нарізаються майже рівними шматками по 3-4 секунди, не зважаючи на фрази, тому в одному субтитрі часто опиняються хвіст попередньої фрази й початок наступної. Інструмент бере оригінальні таймкоди за опорні точки — це справжні межі слів, які видало розпізнавання мовлення, — визначає кінець фрази за розділовими знаками і за допомогою динамічного програмування обирає найдешевший розріз серед кінця фрази, коми, сполучника та примусового розриву, а потім подовжує показ за темпом читання. Кожна зі 100 мов має власні правила: у китайській та японській немає пробілів між словами, тайська майже не позначає межі слів, гінді завершує фразу знаком ।, арабська — ؟, вірменська — ։. Ширина рядка й темп читання залежать від письма: 16 повноширинних знаків у рядку для китайської, 42 знаки для латинки. Перед експортом текст звіряється символ за символом, і про кожне загублене чи зайве слово одразу повідомляється.",
    who: "Команди субтитрів, які перетворюють автоматичні субтитри YouTube, подкастів і курсів на готові субтитри, та автори, що монтують власні відео і втомилися від фраз, обірваних на півслові.",
    siteName: "AI-SRTSub", jsonldName: "AI-SRTSub", jsonldAlt: "YouTube Subtitle Realigner"
  },
  'da': {
    title: "Optimer YouTube-undertekster - sæt afskårne sætninger sammen | AI-SRTSub",
    desc: "YouTube-undertitler deler sætninger ved faste 3-4 sekunder. Dette værktøj flytter tidsgrænserne til ægte sætningsslutninger. Gratis, 100 sprog, fjern alle ordfejl.",
    kw: "ret undertekster youtube,automatiske undertekster youtube,kap undertekster om,sætningsgrænser undertekster,flet sætninger undertekster,juster tidslinje srt,undertekster per sætning,subtitle realign,youtube subtitle fix,sentence alignment",
    intro: "Læg en undertekst ind, som YouTube har lavet automatisk, vælg sprog, og værktøjet syr sætninger sammen igen på tværs af undertekster og klipper derefter filen om sætning for sætning. Ikke ét ord ændres, og tiderne ligger så tæt på de oprindelige tidsstempler som muligt.",
    feat: "YouTubes automatiske undertekster klippes i næsten faste blokke på 3-4 sekunder uden at se på sætningerne, så en blok ofte rummer både halen af den foregående sætning og starten af den næste. Værktøjet bruger de oprindelige tidsstempler som ankre - det er de rigtige ordgrænser, som talegenkendelsen gav - afgør ud fra tegnsætningen, hvor sætningen slutter, og vælger med dynamisk programmering det billigste klip blandt sætningsslut, komma, bindeord og tvunget klip, hvorefter visningstiden forlænges efter læsehastigheden. Hvert af de 100 sprog har sine egne regler: kinesisk og japansk sætter ikke mellemrum mellem ord, thai markerer næsten ikke ordgrænser, hindi slutter med ।, arabisk med ؟, armensk med ։. Linjebredde og læsehastighed følger skriftsystemet: 16 fuldbreddetegn per linje på kinesisk, 42 tegn for latinske skrifter. Før eksport sammenlignes teksten tegn for tegn, og hvert tabt eller tilføjet ord varsles med det samme.",
    who: "Undertekstteams, der laver automatiske undertekster fra YouTube, podcasts og kurser om til færdige undertekster, og skabere, der klipper deres egne videoer og er trætte af sætninger, der hugges midt over.",
    siteName: "AI-SRTSub", jsonldName: "AI-SRTSub", jsonldAlt: "YouTube Subtitle Realigner"
  },
  'fi': {
    title: "YouTube-tekstityksen optimointi - katkaistut lauseet takaisin yhteen | AI-SRTSub",
    desc: "YouTube-tekstitykset katkaisevat lauseet 3-4 sekunnin välein. Tämä työkalu siirtää rajat oikeisiin lauseiden loppuihin. Ilmainen, 100 kieltä, sanoja poistamatta.",
    kw: "korjaa youtube tekstitys,automaattinen tekstitys youtube,leikkaa tekstitys uudelleen,lauserajat tekstitys,yhdistä lauseet tekstitys,aikalinjan tasaus srt,tekstitys lauseittain,subtitle realign,youtube subtitle fix,sentence alignment",
    intro: "Lataa YouTuben automaattisesti luoma tekstitys, valitse kieli, niin työkalu ompelee tekstitysten väliin jakautuneet lauseet takaisin yhteen ja leikkaa tiedoston uudelleen lause kerrallaan. Yksikään sana ei muutu ja ajat pysyvät mahdollisimman lähellä alkuperäisiä aikaleimoja.",
    feat: "YouTuben automaattiset tekstitykset leikataan lähes kiinteisiin 3-4 sekunnin pätkiin lauseista välittämättä, joten yhdessä pätkässä on usein sekä edellisen lauseen häntä että seuraavan alku. Työkalu ottaa alkuperäiset aikaleimat ankkureiksi - ne ovat puheentunnistuksen antamia todellisia sanarajoja -, päättelee välimerkeistä, mihin lause loppuu, ja valitsee dynaamisella ohjelmoinnilla halvimman leikkauskohdan lauseen lopun, pilkun, konjunktion ja pakkoleikkauksen joukosta sekä pidentää näyttöaikaa lukuvauhdin mukaan. Jokaisella 100 kielestä on omat sääntönsä: kiinassa ja japanissa sanojen välissä ei ole välilyöntejä, thaissa sanarajat ovat lähes näkymättömiä, hindi päättää lauseen merkkiin ।, arabia merkkiin ؟, armenia merkkiin ։. Rivin leveys ja lukuvauhti riippuvat kirjoitusjärjestelmästä: kiinassa 16 täysleveää merkkiä riville, latinalaisissa kirjaimissa 42 merkkiä. Ennen vientiä teksti vertaillaan merkki merkiltä ja jokaisesta kadonneesta tai lisätystä sanasta varoitetaan heti.",
    who: "Tekstitystiimit, jotka muuttavat YouTuben, podcastien ja kurssien automaattitekstitykset valmiiksi tekstityksiksi, sekä tekijät, jotka leikkaavat omat videonsa ja ovat kyllästyneet keskeltä katkaistuihin lauseisiin.",
    siteName: "AI-SRTSub", jsonldName: "AI-SRTSub", jsonldAlt: "YouTube Subtitle Realigner"
  },
  'el': {
    title: "Βελτιστοποίηση υποτίτλων YouTube - ξανά ενωμένες κομμένες προτάσεις | AI-SRTSub",
    desc: "Οι αυτόματοι υπότιτλοι του YouTube κόβουν φράσεις ανά 3-4 δευτερόλεπτα. Αυτό το εργαλείο διορθώνει τα όρια εκεί που τελειώνουν οι προτάσεις. Δωρεάν, 100 γλώσσες.",
    kw: "διόρθωση υποτίτλων youtube,αυτόματοι υπότιτλοι youtube,επανακοπή υποτίτλων,όρια προτάσεων υπότιτλοι,ένωση προτάσεων υπότιτλοι,ευθυγράμμιση χρόνου srt,υπότιτλοι ανά πρόταση,subtitle realign,youtube subtitle fix,sentence alignment",
    intro: "Φορτώστε έναν υπότιτλο που δημιούργησε αυτόματα το YouTube, διαλέξτε γλώσσα και το εργαλείο ράβει ξανά τις προτάσεις που είχαν σπάσει ανάμεσα σε υπότιτλους και κόβει το αρχείο από την αρχή, πρόταση-πρόταση. Καμία λέξη δεν αλλάζει και οι χρόνοι μένουν όσο πιο κοντά γίνεται στα αρχικά timecodes.",
    feat: "Οι αυτόματοι υπότιτλοι του YouTube κόβονται σε σχεδόν σταθερά κομμάτια 3-4 δευτερολέπτων χωρίς να υπολογίζουν τις προτάσεις, οπότε ένα κομμάτι κρατά συχνά την ουρά της προηγούμενης πρότασης και την αρχή της επόμενης. Το εργαλείο παίρνει τα αρχικά timecodes ως άγκυρες - είναι τα πραγματικά όρια λέξεων που έδωσε η αναγνώριση ομιλίας -, βρίσκει από τη στίξη πού τελειώνει η πρόταση και με δυναμικό προγραμματισμό διαλέγει την πιο φθηνή κοπή ανάμεσα σε τέλος πρότασης, κόμμα, σύνδεσμο και αναγκαστική κοπή, έπειτα επιμηκύνει τον χρόνο προβολής ανάλογα με την ταχύτητα ανάγνωσης. Κάθε μία από τις 100 γλώσσες έχει τους κανόνες της: τα κινεζικά και τα ιαπωνικά δεν χωρίζουν λέξεις με κενά, τα ταϊλανδικά σχεδόν δεν σημαδεύουν όρια λέξεων, τα χίντι κλείνουν με ।, τα αραβικά με ؟, τα αρμενικά με ։. Το πλάτος γραμμής και η ταχύτητα ανάγνωσης ακολουθούν το σύστημα γραφής: 16 χαρακτήρες πλήρους πλάτους ανά γραμμή στα κινεζικά, 42 χαρακτήρες στα λατινικά αλφάβητα. Πριν την εξαγωγή το κείμενο συγκρίνεται χαρακτήρα προς χαρακτήρα και κάθε χαμένη ή πρόσθετη λέξη ειδοποιεί αμέσως.",
    who: "Ομάδες υποτίτλων που μετατρέπουν αυτόματους υπότιτλους από YouTube, podcast και μαθήματα σε έτοιμους υπότιτλους, και δημιουργοί που μοντάρουν μόνοι τα βίντεό τους και έχουν βαρεθεί προτάσεις κομμένες στη μέση.",
    siteName: "AI-SRTSub", jsonldName: "AI-SRTSub", jsonldAlt: "YouTube Subtitle Realigner"
  },
  'he': {
    title: "אופטימיזציית כתוביות יוטיוב - חיבור מחדש של משפטים קטועים | AI-SRTSub",
    desc: "הכתוביות האוטומטיות של YouTube חותכות משפטים כל 3-4 שניות. כלי זה מתקן את גבולות המקטעים לסוף המשפטים האמיתי. חינם, 100 שפות, ללא מילים אבודות.",
    kw: "תיקון כתוביות יוטיוב,כתוביות אוטומטיות יוטיוב,חיתוך כתוביות מחדש,גבולות משפטים בכתוביות,חיבור משפטים בכתוביות,יישור ציר זמן srt,כתוביות לפי משפט,subtitle realign,youtube subtitle fix,sentence alignment",
    intro: "טענו קובץ כתוביות שיוטיוב יצר אוטומטית, בחרו שפה, והכלי מחבר חזרה משפטים שנחתכו בין כתוביות ואז חותך את הקובץ מחדש משפט אחר משפט. אף מילה לא משתנה, והזמנים נשארים קרובים ככל האפשר לחותמות המקוריות.",
    feat: "הכתוביות האוטומטיות של יוטיוב נחתכות למקטעים באורך כמעט קבוע של 3-4 שניות, בלי קשר למשפטים, ולכן מקטע אחד נושא לעתים קרובות גם את סוף המשפט הקודם וגם את תחילת המשפט הבא. הכלי מתייחס לחותמות הזמן המקוריות כעוגנים - אלה גבולות המילים האמיתיים שזיהוי הדיבור החזיר -, קובע לפי הפיסוק היכן המשפט נגמר, ובוחר בתכנות דינמי את נקודת החיתוך הזולה ביותר מבין סוף משפט, פסיק, מילת חיבור וחיתוך כפוי, ואחר כך מאריך את זמן התצוגה לפי קצב הקריאה. לכל אחת מ-100 השפות כללים משלה: בסינית וביפנית אין רווחים בין מילים, בתאית כמעט אין סימון לגבולות מילים, בהינדי המשפט נגמר ב-।, בערבית ב-؟, בארמנית ב-։. רוחב השורה וקצב הקריאה נקבעים לפי מערכת הכתב: 16 תווים ברוחב מלא בשורה בסינית, 42 תווים בכתב לטיני. לפני הייצוא הטקסט מושווה תו אחר תו, וכל מילה שנעלמה או נוספה מדווחת מיד.",
    who: "צוותי כתוביות שהופכים כתוביות אוטומטיות מיוטיוב, מפודקאסטים ומקורסים לכתוביות מוגמרות, ויוצרים שעורכים בעצמם את הסרטונים שלהם ונגעלו ממשפטים שנקטעים באמצע.",
    siteName: "AI-SRTSub", jsonldName: "AI-SRTSub", jsonldAlt: "YouTube Subtitle Realigner"
  },
  'ro': {
    title: "Optimizare subtitrări YouTube - recompune propozițiile tăiate | AI-SRTSub",
    desc: "YouTube taie subtitrările la fiecare 3-4 secunde. Această unealtă păstrează cuvintele și mută limitele la finalul real al propozițiilor. Gratuit, 100 limbi.",
    kw: "reparare subtitrări youtube,subtitrări automate youtube,retăiere subtitrări,granițe de propoziție subtitrări,unire propoziții subtitrări,aliniere timp srt,subtitrări pe propoziții,subtitle realign,youtube subtitle fix,sentence alignment",
    intro: "Încarcă o subtitrare generată automat de YouTube, alege limba, iar instrumentul reunește propozițiile rupte între subtitrări și retaie fișierul propoziție cu propoziție. Niciun cuvânt nu se schimbă, iar timpii rămân cât mai aproape de marcajele originale.",
    feat: "Subtitrările automate din YouTube sunt tăiate în blocuri aproape fixe de 3-4 secunde, fără legătură cu propozițiile, așa că un bloc conține des și finalul propoziției anterioare, și începutul celei următoare. Instrumentul ia marcajele de timp originale ca ancore - acelea sunt granițele reale de cuvânt date de recunoașterea vocală -, deduce din punctuație unde se termină propoziția și, prin programare dinamică, alege tăietura cu cel mai mic cost între sfârșit de propoziție, virgulă, conjuncție și tăiere forțată, apoi prelungește durata pe ecran după ritmul de citire. Fiecare dintre cele 100 de limbi are regulile ei: chineza și japoneza nu despart cuvintele cu spații, thai aproape nu marchează granițele, hindi încheie cu ।, araba cu ؟, armenește cu ։. Lățimea rândului și ritmul de citire depind de sistemul de scriere: 16 caractere de lățime întreagă pe rând în chineză, 42 de caractere la alfabetele latine. Înainte de export textul este comparat caracter cu caracter, iar orice cuvânt pierdut sau adăugat este semnalat imediat.",
    who: "Echipele de subtitrare care transformă subtitrările automate din YouTube, podcasturi și cursuri în subtitrări finale, și creatorii care își montează singuri videoclipurile și s-au săturat de propoziții tăiate la mijloc.",
    siteName: "AI-SRTSub", jsonldName: "AI-SRTSub", jsonldAlt: "YouTube Subtitle Realigner"
  }
};

/* zh-CN 走站点根路径（/merge.html），其余语言挂在自己的语言目录（/en/merge.html） */
const MERGE_PATH = {}, CLEAN_PATH = {}, TRANSLATE_PATH = {}, CONVERT_PATH = {}, BILINGUAL_PATH = {}, SHIFT_PATH = {}, REPAIR_PATH = {}, EXTRACT_PATH = {}, GLOSSARY_PATH = {}, VIDEOSUB_PATH = {}, HANCONV_PATH = {}, SPLIT_PATH = {}, TABLE_PATH = {}, BATCH_PATH = {}, LRC_PATH = {}, QC_PATH = {}, YTFIX_PATH = {}, AUTOSUB_PATH = {}, OCRSUB_PATH = {}, MULTILANG_PATH = {};

SEO_LANGS.forEach(function (l) {
  MERGE_PATH[l] = (l === 'zh-CN') ? '/merge.html' : '/' + l + '/merge.html';
  CLEAN_PATH[l] = (l === 'zh-CN') ? '/clean.html' : '/' + l + '/clean.html';
  TRANSLATE_PATH[l] = (l === 'zh-CN') ? '/translate.html' : '/' + l + '/translate.html';
  /* v0.9.288：字幕格式转换页 */
  CONVERT_PATH[l] = (l === 'zh-CN') ? '/convert.html' : '/' + l + '/convert.html';
  /* v0.9.289：双语字幕剥离页 */
  BILINGUAL_PATH[l] = (l === 'zh-CN') ? '/bilingual.html' : '/' + l + '/bilingual.html';
  /* v0.9.291：字幕时间轴调整页 */
  SHIFT_PATH[l] = (l === 'zh-CN') ? '/shift.html' : '/' + l + '/shift.html';
  /* v0.9.296：字幕乱码修复页 */
  REPAIR_PATH[l] = (l === 'zh-CN') ? '/repair.html' : '/' + l + '/repair.html';
  /* v0.9.299：字幕提取纯文本页 */
  EXTRACT_PATH[l] = (l === 'zh-CN') ? '/extract.html' : '/' + l + '/extract.html';
  /* v0.9.302：字幕术语批量替换页 */
  GLOSSARY_PATH[l] = (l === 'zh-CN') ? '/glossary.html' : '/' + l + '/glossary.html';
  /* v0.9.313：视频内封字幕提取页 */
  VIDEOSUB_PATH[l] = (l === 'zh-CN') ? '/videosub.html' : '/' + l + '/videosub.html';
  /* v0.9.313：中文字幕繁简转换页 */
  HANCONV_PATH[l] = (l === 'zh-CN') ? '/hanconv.html' : '/' + l + '/hanconv.html';
  /* v0.9.316：四个新工具页 */
  SPLIT_PATH[l] = (l === 'zh-CN') ? '/split.html' : '/' + l + '/split.html';
  TABLE_PATH[l] = (l === 'zh-CN') ? '/table.html' : '/' + l + '/table.html';
  BATCH_PATH[l] = (l === 'zh-CN') ? '/batch.html' : '/' + l + '/batch.html';
  LRC_PATH[l] = (l === 'zh-CN') ? '/lrc.html' : '/' + l + '/lrc.html';
  /* v0.9.321：字幕质检页 */
  QC_PATH[l] = (l === 'zh-CN') ? '/qc.html' : '/' + l + '/qc.html';
  /* v0.9.352：YouTube 字幕优化页 */
  YTFIX_PATH[l] = (l === 'zh-CN') ? '/ytfix.html' : '/' + l + '/ytfix.html';
  /* v0.9.356：自动生成字幕页与画面硬字幕提取页 */
  AUTOSUB_PATH[l] = (l === 'zh-CN') ? '/autosub.html' : '/' + l + '/autosub.html';
  OCRSUB_PATH[l] = (l === 'zh-CN') ? '/ocrsub.html' : '/' + l + '/ocrsub.html';
  /* v0.9.373：第二十一个页面 —— 一次出多语 / 多集批量 */
  MULTILANG_PATH[l] = (l === 'zh-CN') ? '/multilang.html' : '/' + l + '/multilang.html';
});
/* v0.9.356：第十九个页面 —— 自动生成字幕（/autosub.html）
   ⚠️ 这一页的卖点与前十八页正好相反：前面全是「手上已经有字幕」的处理工具，
     这一页是「从零开始把声音变成字幕」。文案里必须出现「识别」「生成」「草稿」，
     不能让人以为它又是格式转换或清洗。
   ⚠️ 「100 种语言」说的是**音频语言**（识别引擎支持），与界面语言是两件事。
   ⚠️ 不许写「三步走 / 一条龙」这类流程叙事（站内有回归断言）。 */
const SEO_AUTOSUB = {
  'zh-CN': {
    title: "音频自动生成字幕 - 浏览器里把语音转成 SRT | 随心字幕 AI",
    desc: "音频或视频丢进来，语音识别在浏览器里跑：按句子断开、控制行宽、按语速补停留时间，导出 SRT / VTT。文件不上传，免费。",
    kw: "音频转字幕,语音生成字幕,自动字幕生成,音频识别,srt 自动生成,audio to srt,generate subtitles from audio,speech to subtitle,whisper 字幕,本地识别字幕",
    intro: "把音频或视频丢进来，选好语言和模型，识别在本机浏览器里跑，出来的是一份带时间码、已经按句子切好、每行不超宽的字幕草稿。",
    feat: "识别引擎给的是「一串词 + 每个词的真实起止时间」，它不知道什么叫一条字幕：句号后面不会自动断开，长句也不会自己折行。本工具在识别结果之上再做一层排版——按这门语言的句末标点断句，一条放不下就按逗号与词边界再切，按文字系统给行宽上限（中文 16 个全角字、西文 42 字符），最后按阅读速度补最短停留时间、条间留出间隙，并保证时间不倒退不重叠。模型有三个档位，第一次用要下载，之后浏览器会缓存。识别在本机跑，音频不上传服务器。中文的识别结果常是繁体，导出时可以一键转简体。",
    who: "要给自己拍的视频配字幕的创作者、要把播客和网课转成文字的团队，以及拿到一份没有字幕的素材、只想要个能改的初稿的人。",
    siteName: "随心字幕 AI", jsonldName: "随心字幕 AI", jsonldAlt: "Audio to Subtitle Generator"
  },
  'zh-TW': {
    title: "音訊自動生成字幕 - 瀏覽器裡把語音轉成 SRT | 隨心字幕 AI",
    desc: "把音訊或影片丟進來，辨識引擎在瀏覽器裡把語音轉成帶時間碼的字幕：依標點斷句、長句依詞邊界再切、每行不超寬、停留時間依語速補足，直接匯出 SRT / VTT。支援 100 種語言的音訊，檔案不上傳，免費免註冊。",
    kw: "音訊轉字幕,語音生成字幕,自動字幕生成,音訊辨識,srt 自動生成,audio to srt,generate subtitles from audio,speech to subtitle,whisper 字幕,本機辨識字幕",
    intro: "把音訊或影片丟進來，選好語言和模型，辨識在本機瀏覽器裡跑，出來的是一份帶時間碼、已經依句子切好、每行不超寬的字幕草稿。",
    feat: "辨識引擎給的是「一串詞 + 每個詞的真實起止時間」，它不知道什麼叫一條字幕：句號後面不會自動斷開，長句也不會自己折行。本工具在辨識結果之上再做一層排版——依這門語言的句末標點斷句，一條放不下就依逗號與詞邊界再切，依文字系統給行寬上限（中文 16 個全角字、西文 42 字元），最後依閱讀速度補最短停留時間、條間留出間隙，並保證時間不倒退不重疊。模型有三個檔位，第一次用要下載，之後瀏覽器會快取。辨識在本機跑，音訊不上傳伺服器。中文的辨識結果常是繁體，匯出時可以一鍵轉簡體。",
    who: "要給自己拍的影片配字幕的創作者、要把 Podcast 和線上課程轉成文字的團隊，以及拿到一份沒有字幕的素材、只想要個能改的初稿的人。",
    siteName: "隨心字幕 AI", jsonldName: "隨心字幕 AI", jsonldAlt: "Audio to Subtitle Generator"
  },
  'en': {
    title: "Audio to Subtitles — turn speech into SRT in your browser | AI-SRTSub",
    desc: "Audio or video in, subtitles out: speech recognition runs in your browser, cuts the result into cues at real sentence ends and exports SRT / VTT. Nothing is uploaded, free.",
    kw: "audio to srt,speech to subtitle,generate subtitles from audio,automatic subtitle generator,transcribe audio to srt,whisper subtitles,browser speech recognition,offline subtitle generation",
    intro: "Drop in an audio or video file, pick a language and a model, and the recognition runs in your browser. What comes out is a subtitle draft with timing, already cut at sentences and already within line width.",
    feat: "A speech recogniser returns a stream of words with real start and end times — it has no idea what a subtitle cue is. Full stops do not break anything, and long sentences do not wrap themselves. This tool adds that layer: sentences are cut at the punctuation the language actually uses, a cue that does not fit is re-cut at commas and word edges, line width follows the writing system (16 full-width characters for Chinese, 42 for Latin scripts), and on-screen time is topped up to the reading speed with a gap between cues and no overlap or backwards jump. Three model sizes are available; the model downloads on first use and is then cached by the browser. Recognition runs locally and the audio is never uploaded. Chinese output is often traditional characters — one switch converts it to simplified on export.",
    who: "Creators captioning their own videos, teams turning podcasts and courses into text, and anyone handed footage with no subtitles who just wants a draft they can edit.",
    siteName: "AI-SRTSub", jsonldName: "AI-SRTSub", jsonldAlt: "Audio to Subtitle Generator"
  }
};

/* v0.9.356：第二十个页面 —— 画面硬字幕提取（/ocrsub.html）
   ⚠️ 与 videosub 的分工必须写清楚：videosub 抽的是**内封字幕轨**（MKV/MP4 里的文字流），
     这一页认的是**烧在画面上的字**（抖音、录屏、老片源）。两者混了用户会走错门。 */
const SEO_OCRSUB = {
  'zh-CN': {
    title: "画面硬字幕提取 - 从视频里把烧死的字幕认出来 | 随心字幕 AI",
    desc: "字幕烧在画面上、没有轨道可抽时，框出字幕条，工具逐帧认字并把相同画面并成一条字幕，导出 SRT / VTT。视频不上传，免费。",
    kw: "硬字幕提取,视频字幕提取,画面字幕识别,视频转字幕,ocr 字幕,extract hardcoded subtitles,burn-in subtitle ocr,video subtitle ocr,subtitle from video",
    intro: "把视频丢进来，框出字幕所在的那一条，工具逐帧认字，再把连续相同的帧合并成一条带时间码的字幕。",
    feat: "烧死在画面上的字幕没有轨道可抽，只能看画面。字幕有三个可以利用的特点：它是画面里最亮的一批像素，位置固定在下方一条带子里，一句台词会停留一到三秒。所以先把这条带子裁出来、按亮度二值化，背景的花花绿绿就全没了，识别器只需要认形状；同一段文字出现在连续几帧里，合并成一条字幕，时间取第一帧到最后一帧。裁得越准、阈值调得越对，认错的字越少。得到的是一份初稿：形近字、漏笔画、把标点认成字这类错误一定会有，接着用清洗和质检过一遍比一条条手改快。",
    who: "要搬运外语短视频的字幕组、要把老片源重新做字幕的人，以及手上只有成片、拿不到原始字幕文件的剪辑。",
    siteName: "随心字幕 AI", jsonldName: "随心字幕 AI", jsonldAlt: "Hardcoded Subtitle OCR"
  },
  'zh-TW': {
    title: "畫面硬字幕提取 - 從影片裡把燒死的字幕認出來 | 隨心字幕 AI",
    desc: "影片裡的字幕燒在畫面上，沒有字幕軌可抽。框出字幕所在的那一條，工具逐幀取畫面、依亮度二值化、辨識文字，把連續相同的幀合併成一條字幕，匯出 SRT / VTT。影片不上傳，免費免註冊。",
    kw: "硬字幕提取,影片字幕提取,畫面字幕辨識,影片轉字幕,ocr 字幕,extract hardcoded subtitles,burn-in subtitle ocr,video subtitle ocr,subtitle from video",
    intro: "把影片丟進來，框出字幕所在的那一條，工具逐幀認字，再把連續相同的幀合併成一條帶時間碼的字幕。",
    feat: "燒死在畫面上的字幕沒有軌道可抽，只能看畫面。字幕有三個可以利用的特點：它是畫面裡最亮的一批像素，位置固定在下方一條帶子裡，一句台詞會停留一到三秒。所以先把這條帶子裁出來、依亮度二值化，背景的花花綠綠就全沒了，辨識器只需要認形狀；同一段文字出現在連續幾幀裡，合併成一條字幕，時間取第一幀到最後一幀。裁得越準、閾值調得越對，認錯的字越少。得到的是一份初稿：形近字、漏筆畫、把標點認成字這類錯誤一定會有，接著用清洗和質檢過一遍比一條條手改快。",
    who: "要搬運外語短影音的字幕組、要把老片源重新做字幕的人，以及手上只有成片、拿不到原始字幕檔案的剪輯。",
    siteName: "隨心字幕 AI", jsonldName: "隨心字幕 AI", jsonldAlt: "Hardcoded Subtitle OCR"
  },
  'en': {
    title: "Hardcoded Subtitle OCR — read subtitles burned into the picture | AI-SRTSub",
    desc: "Subtitles burned into the picture have no track to extract. Mark the strip and the tool reads it frame by frame, merging identical frames into one timed cue. SRT / VTT out, free.",
    kw: "extract hardcoded subtitles,subtitle ocr,video subtitle extraction,burned in subtitles,ocr subtitles from video,video to srt,subtitle from video,hardcoded caption ocr",
    intro: "Drop in a video, mark the strip the subtitles sit in, and the tool reads frame by frame, merging identical consecutive frames into one cue with timing.",
    feat: "Subtitles baked into the picture have no track to pull. They do have three useful properties: they are the brightest pixels on screen, they stay in a fixed strip near the bottom, and one line stays for one to three seconds. So the strip is cropped out and binarised by brightness — the background disappears and the recogniser only has shapes to read. The same text appearing across consecutive frames becomes one cue, timed from the first frame to the last. A tighter crop and a better threshold mean fewer misread characters. What you get is a draft: lookalike characters, missing strokes and punctuation read as text will happen, and running the cleaner and the checker afterwards beats fixing cue by cue.",
    who: "Subtitle teams localising short foreign videos, anyone re-subtitling an old release, and editors who only have the finished video and no original subtitle file.",
    siteName: "AI-SRTSub", jsonldName: "AI-SRTSub", jsonldAlt: "Hardcoded Subtitle OCR"
  }
};

/* v0.9.373：第二十一个页面 —— 一次出多语 / 多集批量（/multilang.html）
   ⚠️ 这一页与 /translate.html 的关系要写清：它不是「翻译页的另一个皮肤」，
     而是「整季 × 多语」的队列工作台。文案里必须出现「整季」「排队」「一个 zip」，
     否则用户会以为它只是多选了几种语言。
   ⚠️ 与 autosub / ocrsub 一样先只写 3 语：其余语言访问时 renderSeo 会 302 到英文版，
     不会出现「英文标题 + 中文正文」被按 100 种语言重复收录。 */
const SEO_MULTILANG = {
  'zh-CN': {
    title: "一次出多语 - 整季字幕一次上传，多种语言排队跑完 | 随心字幕 AI",
    desc: "把整季字幕一次拖进来，勾几种目标语言，点一次开始：按「集 × 语言」排成一条队列，一种语言跑完再跑下一种，结果打成一个 zip。断点续跑、关页面即停，术语表全季共用。",
    kw: "多语言字幕翻译,一次出多语,整季字幕翻译,字幕批量翻译,多集字幕翻译,批量字幕,多语种字幕导出,一集多语,multi language subtitle,batch subtitle translation,translate multiple languages",
    intro: "整季字幕一次拖进来，勾选要出的语言，点一次开始。工具把「集 × 语言」排成一条队列，一种语言跑完再跑下一种，最后打成一个 zip。",
    feat: "多语批量最容易失控的地方是并发：20 集 × 5 语同时发出去，几百个请求一起挤进来，服务端的排队就被架空了，先发的和后发的混在一起，谁也说不清哪一格跑没跑完。所以这里刻意做成一条队列：同一时刻只有一个批次在跑，一种语言跑完才换下一种。进度按「集 + 语言」分开记在本机，跑到第 3 集断了，重新打开页面导入同一批文件，它会从断掉的那一批接着做，已经译完的不会重发一次。跨集最容易露馅的是人名地名：一套剧 20 集分开翻，同一个人会被译成三种写法，所以术语表在这一页是独立的一栏，上传一次、全季共用，开跑前还会告诉你这批字幕里命中了多少条。关掉页面任务会立刻停下，不会在后台继续烧额度。",
    who: "一次要给整季剧配多语字幕的字幕组、把同一批片子分发到多个语区的搬运 up 主，以及手上压着一堆剧集、只想点一次就等结果的独立译者。",
    siteName: "随心字幕 AI", jsonldName: "随心字幕 AI", jsonldAlt: "Batch Multi-language Subtitle Translator"
  },
  'zh-TW': {
    title: "一次出多語 - 整季字幕一次上傳，多種語言排隊跑完 | 隨心字幕 AI",
    desc: "把整季字幕一次拖進來，勾幾種目標語言，點一次開始：依「集 × 語言」排成一條佇列，一種語言跑完再跑下一種，結果打成一個 zip。斷點續跑、關頁面即停，術語表全季共用。",
    kw: "多語言字幕翻譯,一次出多語,整季字幕翻譯,字幕批次翻譯,多集字幕翻譯,批次字幕,多語種字幕匯出,一集多語,multi language subtitle,batch subtitle translation",
    intro: "整季字幕一次拖進來，勾選要出的語言，點一次開始。工具把「集 × 語言」排成一條佇列，一種語言跑完再跑下一種，最後打成一個 zip。",
    feat: "多語批次最容易失控的地方是並行：20 集 × 5 語同時送出去，幾百個請求一起擠進來，服務端的排隊就被架空了，先送的和後送的混在一起，誰也說不清哪一格跑沒跑完。所以這裡刻意做成一條佇列：同一時刻只有一個批次在跑，一種語言跑完才換下一種。進度依「集 + 語言」分開記在本機，跑到第 3 集斷了，重新打開頁面匯入同一批檔案，它會從斷掉的那一批接著做，已經譯完的不會重送一次。跨集最容易露餡的是人名地名：一套劇 20 集分開翻，同一個人會被譯成三種寫法，所以術語表在這一頁是獨立的一欄，上傳一次、全季共用，開跑前還會告訴你這批字幕裡命中了多少條。關掉頁面任務會立刻停下，不會在背景繼續燒額度。",
    who: "一次要給整季劇配多語字幕的字幕組、把同一批片子分發到多個語區的搬運 up 主，以及手上壓著一堆劇集、只想點一次就等結果的獨立譯者。",
    siteName: "隨心字幕 AI", jsonldName: "隨心字幕 AI", jsonldAlt: "Batch Multi-language Subtitle Translator"
  },
  'en': {
    title: "Many languages at once — upload a whole season, queue up every target language | AI-SRTSub",
    desc: "Drop in a whole season, tick the languages you need, press start once. Episodes × languages form a single queue and run one after another; results come back as one zip. Resumes where it stopped, stops when you close the tab.",
    kw: "batch subtitle translation,translate subtitles multiple languages,multi language subtitles,whole season subtitles,subtitle batch export,translate srt to many languages,one season many languages",
    intro: "Drop in a whole season at once, tick the target languages, press start. Episodes × languages become one queue: each language runs to the end before the next one begins, and everything is packed into a single zip.",
    feat: "The part that goes wrong in batch translation is concurrency. Twenty episodes times five languages fired at once is hundreds of requests landing together, which quietly defeats the server-side queue — early and late requests interleave and nobody can say which cell actually finished. So this page runs deliberately as one queue: a single batch at a time, one language to completion before the next. Progress is stored per episode and per language on your machine, so if it breaks at episode three you reopen the page, load the same files, and it picks up at that batch without re-sending what is already done. The thing that gives a season away is names: translate twenty episodes separately and the same character ends up spelled three ways. That is why the glossary is its own panel here — upload once, shared by the whole season — and it tells you how many entries actually matched before you start. Close the tab and the task stops immediately instead of burning quota in the background.",
    who: "Subtitle teams captioning a full season into several languages, channels redistributing the same batch of episodes to different markets, and solo translators who would rather press start once and come back later.",
    siteName: "AI-SRTSub", jsonldName: "AI-SRTSub", jsonldAlt: "Batch Multi-language Subtitle Translator"
  }
};

/* v0.9.277：字幕翻译工作台（/translate.html）的 SEO 表。
   ❗为什么单独一张：v0.9.277 起首页是落地页（讲四个工具），翻译工具搬去了 /translate.html。
     两个 URL 若共用一套 title/description，搜索引擎会当成重复内容收录，所以这里另写一套。
     kw 不重复造：关键词一致不容易出错，直接取首页那张表的同语言值。 */
const SEO_TRANSLATE = {
  'zh-CN': { title: "字幕翻译 - SRT / VTT / ASS 在线翻译成母语 | 随心字幕 AI", desc: "把 SRT / VTT / ASS 字幕丢进来，选好目标语言即可翻成母语字幕：自动配轴对齐、句级智能合并、术语全片统一、按标点智能折行。支持 100 种语言，免费免注册。" },
  'zh-TW': { title: "字幕翻譯 - SRT / VTT / ASS 線上翻譯成母語 | 隨心字幕 AI", desc: "把 SRT / VTT / ASS 字幕丟進來，選好目標語言即可翻成母語字幕：自動對軸對齊、句級智慧合併、術語全片一致、依標點智慧折行。支援 100 種語言，免費免註冊。" },
  'en': { title: "Subtitle Translator — SRT/VTT/ASS into Your Language", desc: "Drop in an SRT / VTT / ASS file, pick a target language, and get timeline-locked translation. 100 languages, free, no sign-up." },
  'ja': { title: "字幕翻訳 - SRT / VTT / ASS を母語へ | 随心字幕 AI", desc: "SRT / VTT / ASS の字幕を入れて翻訳先を選ぶだけ。時間軸に沿った訳文、文単位の結合、用語の統一、句読点を考慮した折り返しまで自動。100 言語対応、無料・登録不要。" },
  'es': { title: "Traductor de subtítulos — SRT / VTT / ASS a tu idioma", desc: "Carga tu subtítulo SRT / VTT / ASS, elige el idioma y obtén subtítulos traducidos con sincronización automática. 100 idiomas, gratis y sin registro." },
  'pt': { title: "Tradutor de legendas — SRT / VTT / ASS no seu idioma", desc: "Envie um SRT/VTT/ASS, escolha o idioma e receba legendas com sincronia automática e glossário consistente. 100 idiomas, grátis e sem cadastro." },
  'ko': { title: "자막 번역 - SRT / VTT / ASS 를 내 언어로 | AI-SRTSub", desc: "SRT / VTT / ASS 자막을 넣고 대상 언어만 고르면 내 언어 자막이 됩니다. 타임라인 자동 정렬, 문장 단위 병합, 용어 통일, 문장부호 기준 줄바꿈까지 자동. 100개 언어, 무료·가입 없음." },
  'de': { title: "Untertitel übersetzen — SRT / VTT / ASS in deine Sprache", desc: "SRT/VTT/ASS hochladen, Zielsprache wählen, Untertitel erhalten – exakte Zeitachse, 100 Sprachen, kostenlos, ohne Anmeldung." },
  'fr': { title: 'Traducteur de sous-titres — SRT / VTT / ASS dans votre langue', desc: "Déposez un SRT / VTT / ASS, choisissez la langue et recevez des sous-titres synchronisés, au vocabulaire cohérent et bien découpés. Gratuit, sans inscription." },
  'id': { title: "Penerjemah Subtitle — Terjemahkan SRT/VTT/ASS ke Bahasamu", desc: "Unggah subtitle SRT/VTT/ASS, pilih bahasa tujuan, dapatkan subtitle dalam bahasamu dengan sinkronisasi otomatis. 100 bahasa, gratis, tanpa daftar." },
  'hi': { title: "सबटाइटल अनुवादक - SRT / VTT / ASS को अपनी भाषा में", desc: "SRT / VTT / ASS सबटाइटल अपलोड करें, लक्ष्य भाषा चुनें और अपनी भाषा में सबटाइटल पाएं: स्वचालित समय-रेखा मिलान। 100 भाषाएं, मुफ़्त, बिना साइन-अप।" },
  'th': { title: "แปลซับไตเติล - แปล SRT / VTT / ASS เป็นภาษาของคุณ", desc: "อัปโหลดซับไตเติล SRT / VTT / ASS เลือกภาษาปลายทาง รับซับไตเติลในภาษาของคุณ จัดแนวไทม์ไลน์อัตโนมัติ 100 ภาษา ฟรี ไม่ต้องสมัคร" },
  'vi': { title: "Dịch phụ đề - Dịch SRT / VTT / ASS sang ngôn ngữ của bạn", desc: "Tải lên phụ đề SRT/VTT/ASS, chọn ngôn ngữ đích, nhận phụ đề bằng ngôn ngữ bạn: căn chỉnh thời gian tự động, 100 ngôn ngữ, miễn phí, không cần đăng ký." },
  'ru': { title: "Перевод субтитров — SRT / VTT / ASS на ваш язык", desc: "Загрузите субтитры SRT/VTT/ASS, выберите язык и получите перевод с точной привязкой к таймкодам. 100 языков, бесплатно, без регистрации." },
  'it': { title: "Traduttore di sottotitoli — SRT / VTT / ASS nella tua lingua", desc: "Carica SRT/VTT/ASS, scegli la lingua di destinazione e ottieni sottotitoli con sincronizzazione automatica. 100 lingue, gratis e senza registrazione." },
  'ar': { title: "مترجم الترجمات المصاحبة — ترجمة SRT / VTT / ASS إلى لغتك", desc: "ارفع ملف SRT/VTT/ASS، اختر اللغة الهدف واحصل على ترجمة بلغتك. 100 لغة، مجاناً وبدون تسجيل." },
  'tr': { title: "Altyazı Çevirici - SRT / VTT / ASS'i Kendi Dilinize Çevirin", desc: "SRT/VTT/ASS altyazı yükleyin, hedef dili seçin, kendi dilinizde altyazı alın. Otomatik hizalama, 100 dil, ücretsiz, kayıt gerekmez." },
  'nl': { title: "Ondertitels vertalen — SRT / VTT / ASS naar jouw taal", desc: "Upload SRT/VTT/ASS, kies je doeltaal en krijg ondertitels in je eigen taal. Automatische tijdlijnuitlijning, 100 talen, gratis, zonder registratie." },
  'pl': { title: "Tłumacz napisów — Przetłumacz SRT / VTT / ASS na swój język", desc: "Wgraj napisy SRT/VTT/ASS, wybierz język docelowy i otrzymaj napisy w swoim języku. 100 języków, za darmo, bez rejestracji." },
  'sv': { title: "Översätt undertexter — SRT / VTT / ASS till ditt språk", desc: "Ladda upp en SRT / VTT / ASS-fil, välj målspråk och få undertexter på ditt språk: tidslinjejustering, enhetlig terminologi. Gratis, ingen registrering." },
  'cs': { title: "Překladač titulků — Přeložte SRT / VTT / ASS do svého jazyka", desc: "Nahrajte titulky SRT/VTT/ASS, zvolte cílový jazyk a získejte titulky: automatické zarovnání časové osy, 100 jazyků, zdarma, bez registrace." },
  'uk': { title: "Переклад субтитрів — SRT / VTT / ASS вашою мовою", desc: "Завантажте субтитри SRT/VTT/ASS, виберіть мову перекладу й отримайте субтитри своєю мовою. 100 мов, безкоштовно й без реєстрації." },
  'da': { title: "Oversæt undertekster — SRT / VTT / ASS til dit sprog", desc: "Upload SRT/VTT/ASS-fil, vælg målsprog og få undertekster på dit eget sprog. Automatisk tidslinjejustering, ensartet terminologi. 100 sprog, gratis." },
  'fi': { title: 'Tekstitysten kääntäjä — Käännä SRT / VTT / ASS omalle kielellesi', desc: "Lataa SRT / VTT / ASS -tekstitys, valitse kieli ja saat tekstityksen omallasi: lukittu aikajana, yhtenäinen sanasto. Ilmainen, ei rekisteröitymistä." },
  'el': { title: "Μεταφραστής υποτίτλων — SRT / VTT / ASS στη γλώσσα σας", desc: "Ανεβάστε SRT/VTT/ASS, επιλέξτε γλώσσα και λάβετε υπότιτλους με αυτόματη ευθυγράμμιση και έξυπνο σπάσιμο γραμμών. 100 γλώσσες, δωρεάν, χωρίς εγγραφή." },
  'he': { title: "מתרגם כתוביות - תרגום SRT / VTT / ASS לשפה שלך", desc: "העלה SRT/VTT/ASS, בחר שפת יעד וקבל כתוביות בשפה שלך: יישור ציר זמן אוטומטי. 100 שפות, חינם, בלי הרשמה." },
  'ro': { title: "Traducător de subtitrări — SRT / VTT / ASS în limba ta", desc: "Încarcă SRT/VTT/ASS, alege limba țintă și primești subtitrări cu aliniere automată pe axa timpului. 100 de limbi, gratuit, fără cont." }
};

/* v0.9.288：字幕格式转换页（/convert.html）的 27 语 SEO 表。
   与前三页同规格：title / desc / kw / 三段静态文案（intro / feat / who）。 */
const SEO_CONVERT = {
  'zh-CN': {
    title: '字幕格式转换 - SRT / VTT / ASS / SBV / LRC / TXT 互转 | 随心字幕 AI',
    desc: '免费在线字幕格式转换：SRT、VTT、ASS、SBV、LRC、TXT 互相转换，时间轴原样保留，ASS 特效标记自动清理。',
    kw: '字幕格式转换,srt转vtt,vtt转srt,ass转srt,sbv转srt,srt转lrc,字幕转txt,字幕转换工具,subtitle converter,srt to vtt,vtt to srt',
    intro: 'SRT、VTT、ASS、SBV、LRC、TXT 互相转换，时间轴原样保留。',
    feat: '自动识别输入格式，导出时按目标格式重排时间码；ASS 特效标记与强制换行在导出成普通字幕时还原成可读文本；歌词文件没有小时位，超过一小时按分钟累计。',
    who: '拿到字幕但播放器不认的人、要在剪辑软件与网页播放器之间来回倒素材的人。',
    siteName: '随心字幕 AI', jsonldName: '随心字幕 AI', jsonldAlt: 'AI-SRTSub'
  },
  'zh-TW': {
    title: '字幕格式轉換 - SRT / VTT / ASS / SBV / LRC / TXT 互轉 | 隨心字幕 AI',
    desc: '免費線上字幕格式轉換：SRT、VTT、ASS、SBV、LRC、TXT 互相轉換，時間軸原樣保留，ASS 特效標記自動清理。',
    kw: '字幕格式轉換,srt轉vtt,vtt轉srt,ass轉srt,sbv轉srt,srt轉lrc,字幕轉txt,字幕轉換工具,subtitle converter,srt to vtt,vtt to srt',
    intro: 'SRT、VTT、ASS、SBV、LRC、TXT 互相轉換，時間軸原樣保留。',
    feat: '自動辨識輸入格式，匯出時按目標格式重排時間碼；ASS 特效標記與強制換行在匯出成普通字幕時還原成可讀文字；歌詞檔案沒有小時位，超過一小時按分鐘累計。',
    who: '拿到字幕但播放器不認的人、要在剪輯軟體與網頁播放器之間來回倒素材的人。',
    siteName: '隨心字幕 AI', jsonldName: '隨心字幕 AI', jsonldAlt: 'AI-SRTSub'
  },
  'en': {
    title: 'Subtitle Converter - SRT / VTT / ASS / SBV / LRC / TXT | AI-SRTSub',
    desc: 'Free online subtitle converter: convert between SRT, VTT, ASS, SBV, LRC and TXT with the timeline kept intact, ASS effect tags cleaned up automatically.',
    kw: 'subtitle converter,srt to vtt,vtt to srt,ass to srt,sbv to srt,srt to lrc,subtitle to txt,convert subtitles,srt converter,vtt converter',
    intro: 'Convert between SRT, VTT, ASS, SBV, LRC and TXT with the timeline kept intact.',
    feat: 'The input format is detected automatically and timestamps are rewritten for the target format; ASS effect tags and forced line breaks become readable text when you export to a plain format; lyrics files have no hour field, so anything past one hour is counted in minutes.',
    who: 'Anyone whose player refuses a subtitle file, and anyone moving material between an editor and a web player.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Converter'
  },
  'ja': {
    title: '字幕フォーマット変換 - SRT / VTT / ASS / SBV / LRC / TXT 相互変換 | AI-SRTSub',
    desc: '無料のオンライン字幕変換ツール：SRT、VTT、ASS、SBV、LRC、TXT を相互に変換し、タイムラインはそのまま保持、ASS のエフェクトタグは自動的に整理されます。',
    kw: '字幕変換,srt vtt 変換,字幕フォーマット変換,ass srt 変換,sbv 変換,字幕 テキスト変換,subtitle converter,srt to vtt',
    intro: 'SRT、VTT、ASS、SBV、LRC、TXT を相互に変換し、タイムラインはそのまま保持されます。',
    feat: '入力形式を自動判別し、出力形式に合わせてタイムコードを書き直します。ASS のエフェクトタグと強制改行は、通常の字幕へ書き出すときに読めるテキストへ戻します。歌詞ファイルには時間の桁がないため、1 時間を超える分は分単位で累計します。',
    who: '字幕ファイルをプレイヤーが読み込まない人、編集ソフトとウェブプレイヤーの間で素材を行き来させている人。',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Converter'
  },
  'es': {
    title: "Conversor de subtítulos - SRT / VTT / ASS / SBV / LRC / TXT",
    desc: 'Conversor de subtítulos online gratis: convierte entre SRT, VTT, ASS, SBV, LRC y TXT conservando la línea de tiempo y limpiando las etiquetas de efectos ASS.',
    kw: 'convertir subtítulos,srt a vtt,vtt a srt,ass a srt,sbv a srt,srt a lrc,subtítulos a txt,conversor srt,subtitle converter',
    intro: 'Convierte entre SRT, VTT, ASS, SBV, LRC y TXT conservando la línea de tiempo.',
    feat: 'El formato de entrada se detecta automáticamente y los códigos de tiempo se reescriben para el formato de salida; las etiquetas de efectos y los saltos forzados de ASS vuelven a ser texto legible al exportar a un formato simple; los archivos de letras no tienen campo de horas, así que lo que pasa de una hora se acumula en minutos.',
    who: 'Quien tiene subtítulos que su reproductor no acepta, y quien mueve material entre un editor y un reproductor web.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Converter'
  },
  'pt': {
    title: 'Conversor de legendas - SRT / VTT / ASS / SBV / LRC / TXT | AI-SRTSub',
    desc: 'Conversor de legendas online grátis: converta entre SRT, VTT, ASS, SBV, LRC e TXT mantendo a linha do tempo e limpando as tags de efeito do ASS.',
    kw: 'converter legendas,srt para vtt,vtt para srt,ass para srt,sbv para srt,srt para lrc,legenda para txt,conversor srt,subtitle converter',
    intro: 'Converta entre SRT, VTT, ASS, SBV, LRC e TXT mantendo a linha do tempo.',
    feat: 'O formato de entrada é detectado automaticamente e os códigos de tempo são reescritos para o formato de saída; tags de efeito e quebras forçadas do ASS voltam a ser texto legível ao exportar para um formato simples; arquivos de letra não têm campo de horas, então o que passa de uma hora é acumulado em minutos.',
    who: 'Quem tem legendas que o player não aceita, e quem move material entre um editor e um player web.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Converter'
  },
  'ko': {
    title: '자막 포맷 변환 - SRT / VTT / ASS / SBV / LRC / TXT 상호 변환 | AI-SRTSub',
    desc: '무료 온라인 자막 변환기: SRT, VTT, ASS, SBV, LRC, TXT 를 서로 변환하고 타임라인은 그대로 유지하며 ASS 효과 태그는 자동으로 정리됩니다.',
    kw: '자막 변환,srt vtt 변환,자막 포맷 변환,ass srt 변환,sbv 변환,자막 텍스트 변환,subtitle converter,srt to vtt',
    intro: 'SRT, VTT, ASS, SBV, LRC, TXT 를 서로 변환하고 타임라인은 그대로 유지합니다.',
    feat: '입력 형식을 자동으로 감지하고 출력 형식에 맞춰 타임코드를 다시 씁니다. ASS 효과 태그와 강제 줄바꿈은 일반 자막으로 내보낼 때 읽을 수 있는 텍스트로 되돌립니다. 가사 파일에는 시간 단위가 없어 1시간을 넘는 분은 분 단위로 누적합니다.',
    who: '플레이어가 자막 파일을 읽지 못하는 사람, 편집 프로그램과 웹 플레이어 사이에서 자료를 옮기는 사람.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Converter'
  },
  'de': {
    title: 'Untertitel-Konverter - SRT / VTT / ASS / SBV / LRC / TXT | AI-SRTSub',
    desc: 'Kostenloser Online-Konverter für Untertitel: zwischen SRT, VTT, ASS, SBV, LRC und TXT konvertieren, Zeitachse bleibt erhalten, ASS-Effekt-Tags werden automatisch entfernt.',
    kw: 'untertitel konvertieren,srt in vtt,vtt in srt,ass in srt,sbv in srt,srt in lrc,untertitel in txt,srt konverter,subtitle converter',
    intro: 'Konvertiere zwischen SRT, VTT, ASS, SBV, LRC und TXT - die Zeitachse bleibt erhalten.',
    feat: 'Das Eingabeformat wird automatisch erkannt und die Zeitcodes werden für das Ausgabeformat neu geschrieben; ASS-Effekt-Tags und erzwungene Zeilenumbrüche werden beim Export in ein einfaches Format wieder zu lesbarem Text; Liedtextdateien haben kein Stunden Feld, alles über eine Stunde wird in Minuten gezählt.',
    who: 'Wessen Player eine Untertiteldatei nicht annimmt, und wer Material zwischen einem Schnittprogramm und einem Webplayer hin und her schiebt.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Converter'
  },
  'fr': {
    title: "Convertisseur de sous-titres - SRT, VTT, ASS, SBV, LRC, TXT",
    desc: 'Convertisseur de sous-titres en ligne gratuit : convertissez entre SRT, VTT, ASS, SBV, LRC et TXT en conservant la ligne de temps, les balises d\'effet ASS sont nettoyées automatiquement.',
    kw: 'convertir sous-titres,srt vers vtt,vtt vers srt,ass vers srt,sbv vers srt,srt vers lrc,sous-titres vers txt,convertisseur srt,subtitle converter',
    intro: 'Convertissez entre SRT, VTT, ASS, SBV, LRC et TXT en conservant la ligne de temps.',
    feat: 'Le format d\'entrée est détecté automatiquement et les codes temporels sont réécrits pour le format de sortie ; les balises d\'effet et les sauts de ligne forcés de l\'ASS redeviennent du texte lisible à l\'export vers un format simple ; les fichiers de paroles n\'ont pas de champ heures, donc ce qui dépasse une heure est cumulé en minutes.',
    who: 'Ceux dont le lecteur refuse un fichier de sous-titres, et ceux qui font circuler du matériel entre un éditeur et un lecteur web.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Converter'
  },
  'id': {
    title: 'Konverter Subtitle - SRT / VTT / ASS / SBV / LRC / TXT | AI-SRTSub',
    desc: 'Konverter subtitle online gratis: konversi antara SRT, VTT, ASS, SBV, LRC, dan TXT dengan timeline tetap utuh, tag efek ASS dibersihkan otomatis.',
    kw: 'konversi subtitle,srt ke vtt,vtt ke srt,ass ke srt,sbv ke srt,srt ke lrc,subtitle ke txt,konverter srt,subtitle converter',
    intro: 'Konversi antara SRT, VTT, ASS, SBV, LRC, dan TXT dengan timeline tetap utuh.',
    feat: 'Format input dideteksi otomatis dan kode waktu ditulis ulang sesuai format output; tag efek ASS dan pemaksaan baris baru dikembalikan menjadi teks yang terbaca saat diekspor ke format biasa; file lirik tidak memiliki kolom jam, jadi yang lebih dari satu jam dihitung dalam menit.',
    who: 'Orang yang pemutarnya menolak file subtitle, dan orang yang memindahkan materi antara editor dan pemutar web.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Converter'
  },
  'hi': {
    title: 'सबटाइटल कनवर्टर - SRT / VTT / ASS / SBV / LRC / TXT | AI-SRTSub',
    desc: 'SRT, VTT, ASS, SBV, LRC और TXT के बीच बदलें, टाइमलाइन ज्यों की त्यों रहती है। इनपुट फ़ॉर्मैट अपने आप पहचाना जाता है और ASS इफ़ेक्ट टैग साफ़ हो जाते हैं।',
    kw: 'सबटाइटल कनवर्टर,srt to vtt,vtt to srt,ass to srt,sbv to srt,सबटाइटल टेक्स्ट,subtitle converter,srt converter',
    intro: 'SRT, VTT, ASS, SBV, LRC और TXT के बीच बदलें, टाइमलाइन ज्यों की त्यों रहती है।',
    feat: 'इनपुट फ़ॉर्मैट अपने आप पहचाना जाता है और टाइमकोड आउटपुट फ़ॉर्मैट के अनुसार दोबारा लिखे जाते हैं; ASS इफ़ेक्ट टैग और ज़बरदस्ती की लाइन ब्रेक आम फ़ॉर्मैट में निर्यात करते समय पढ़े जा सकने वाले टेक्स्ट बन जाते हैं; लिरिक्स फ़ाइल में घंटे का फ़ील्ड नहीं होता, इसलिए एक घंटे से अधिक को मिनट में जोड़ा जाता है।',
    who: 'जिनका प्लेयर सबटाइटल फ़ाइल नहीं पढ़ता, और जो एडिटर और वेब प्लेयर के बीच सामग्री ले जाते हैं।',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Converter'
  },
  'th': {
    title: 'ตัวแปลงซับไตเติล - SRT / VTT / ASS / SBV / LRC / TXT | AI-SRTSub',
    desc: 'แปลงระหว่าง SRT, VTT, ASS, SBV, LRC และ TXT โดยไทม์ไลน์คงเดิม ตรวจจับรูปแบบอินพุตอัตโนมัติ และล้างแท็กเอฟเฟกต์ ASS ให้เรียบร้อย',
    kw: 'แปลงซับไตเติล,srt เป็น vtt,vtt เป็น srt,ass เป็น srt,sbv เป็น srt,ซับไตเติลเป็นข้อความ,subtitle converter,srt converter',
    intro: 'แปลงระหว่าง SRT, VTT, ASS, SBV, LRC และ TXT โดยไทม์ไลน์คงเดิม',
    feat: 'ตรวจจับรูปแบบอินพุตอัตโนมัติและเขียนไทม์โค้ดใหม่ให้ตรงกับรูปแบบเอาต์พุต แท็กเอฟเฟกต์และการขึ้นบรรทัดใหม่แบบบังคับของ ASS จะกลับเป็นข้อความที่อ่านได้เมื่อส่งออกเป็นรูปแบบธรรมดา ไฟล์เนื้อเพลงไม่มีฟิลด์ชั่วโมง จึงนับเป็นนาทีเมื่อเกินหนึ่งชั่วโมง',
    who: 'คนที่เครื่องเล่นไม่ยอมอ่านไฟล์ซับไตเติล และคนที่ย้ายสื่อระหว่างโปรแกรมตัดต่อกับเว็บเพลเยอร์',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Converter'
  },
  'vi': {
    title: 'Bộ chuyển đổi phụ đề - SRT / VTT / ASS / SBV / LRC / TXT | AI-SRTSub',
    desc: 'Công cụ chuyển đổi phụ đề trực tuyến miễn phí: chuyển giữa SRT, VTT, ASS, SBV, LRC và TXT, giữ nguyên trục thời gian, tự động dọn thẻ hiệu ứng ASS.',
    kw: 'chuyển đổi phụ đề,srt sang vtt,vtt sang srt,ass sang srt,sbv sang srt,srt sang lrc,phụ đề thành văn bản,subtitle converter',
    intro: 'Chuyển đổi giữa SRT, VTT, ASS, SBV, LRC và TXT, giữ nguyên trục thời gian.',
    feat: 'Tự động nhận dạng định dạng đầu vào và viết lại mã thời gian theo định dạng đầu ra; thẻ hiệu ứng ASS và ngắt dòng ép buộc trở lại thành văn bản đọc được khi xuất sang định dạng thường; tệp lời bài hát không có trường giờ, nên phần vượt quá một giờ được tính bằng phút.',
    who: 'Người có trình phát không chịu đọc tệp phụ đề, và người chuyển tài liệu qua lại giữa phần mềm dựng và trình phát web.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Converter'
  },
  'ru': {
    title: 'Конвертер субтитров - SRT / VTT / ASS / SBV / LRC / TXT | AI-SRTSub',
    desc: 'Бесплатный онлайн-конвертер субтитров: преобразуйте SRT, VTT, ASS, SBV, LRC и TXT друг в друга, таймлайн сохраняется, теги эффектов ASS очищаются автоматически.',
    kw: 'конвертер субтитров,srt в vtt,vtt в srt,ass в srt,sbv в srt,srt в lrc,субтитры в текст,subtitle converter,srt converter',
    intro: 'Преобразуйте SRT, VTT, ASS, SBV, LRC и TXT друг в друга, таймлайн сохраняется.',
    feat: 'Формат ввода определяется автоматически, а таймкоды переписываются под формат вывода; теги эффектов ASS и принудительные переносы строк при экспорте в обычный формат снова становятся читаемым текстом; в файлах текстов песен нет поля часов, поэтому всё, что больше часа, считается в минутах.',
    who: 'Те, чей плеер не принимает файл субтитров, и те, кто переносит материал между редактором и веб-плеером.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Converter'
  },
  'it': {
    title: "Convertitore di sottotitoli - SRT, VTT, ASS, SBV, LRC, TXT",
    desc: 'Convertitore di sottotitoli online gratuito: converti tra SRT, VTT, ASS, SBV, LRC e TXT mantenendo la linea temporale, i tag di effetto ASS vengono puliti automaticamente.',
    kw: 'convertire sottotitoli,srt in vtt,vtt in srt,ass in srt,sbv in srt,srt in lrc,sottotitoli in testo,convertitore srt,subtitle converter',
    intro: 'Converti tra SRT, VTT, ASS, SBV, LRC e TXT mantenendo la linea temporale.',
    feat: 'Il formato di ingresso viene rilevato automaticamente e i codici di tempo riscritti per il formato di uscita; i tag di effetto ASS e le interruzioni di riga forzate tornano testo leggibile esportando in un formato semplice; i file dei testi non hanno il campo ore, quindi ciò che supera un\'ora viene conteggiato in minuti.',
    who: 'Chi ha un lettore che non accetta il file dei sottotitoli, e chi sposta materiale fra un editor e un lettore web.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Converter'
  },
  'ar': {
    title: 'محوّل الترجمة النصية - SRT / VTT / ASS / SBV / LRC / TXT | AI-SRTSub',
    desc: 'محوّل ترجمة نصية مجاني عبر الإنترنت: حوّل بين SRT و VTT و ASS و SBV و LRC و TXT مع الحفاظ على الخط الزمني وتنظيف وسوم تأثيرات ASS تلقائياً.',
    kw: 'تحويل الترجمة,srt إلى vtt,vtt إلى srt,ass إلى srt,sbv إلى srt,ترجمة إلى نص,subtitle converter,srt converter',
    intro: 'حوّل بين SRT و VTT و ASS و SBV و LRC و TXT مع الحفاظ على الخط الزمني.',
    feat: 'يتم التعرف على صيغة الإدخال تلقائياً وإعادة كتابة الأكواد الزمنية بما يناسب صيغة الإخراج؛ وسوم تأثيرات ASS وفواصل الأسطر القسرية تعود نصاً مقروءاً عند التصدير إلى صيغة بسيطة؛ ملفات الكلمات لا تحتوي حقل ساعات، لذا يُحسب ما يتجاوز ساعة بالدقائق.',
    who: 'من يرفض مشغّله قراءة ملف الترجمة، ومن ينقل المواد بين برنامج مونتاج ومشغّل ويب.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Converter'
  },
  'tr': {
    title: 'Altyazı Dönüştürücü - SRT / VTT / ASS / SBV / LRC / TXT | AI-SRTSub',
    desc: 'Ücretsiz çevrimiçi altyazı dönüştürücü: SRT, VTT, ASS, SBV, LRC ve TXT arasında dönüştürün, zaman çizgisi korunur, ASS efekt etiketleri otomatik temizlenir.',
    kw: 'altyazı dönüştürme,srt vtt dönüştürme,vtt srt dönüştürme,ass srt dönüştürme,altyazı metin,subtitle converter,srt converter',
    intro: 'SRT, VTT, ASS, SBV, LRC ve TXT arasında dönüştürün, zaman çizgisi korunur.',
    feat: 'Girdi biçimi otomatik algılanır ve zaman kodları çıktı biçimine göre yeniden yazılır; ASS efekt etiketleri ve zorunlu satır sonları sade bir biçime aktarılırken okunabilir metne döner; şarkı sözü dosyalarında saat alanı yoktur, bir saati aşan kısım dakika olarak toplanır.',
    who: 'Oynatıcısı altyazı dosyasını okumayanlar ve malzemeyi kurgu programı ile web oynatıcı arasında taşıyanlar.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Converter'
  },
  'nl': {
    title: 'Ondertitelconverter - SRT / VTT / ASS / SBV / LRC / TXT | AI-SRTSub',
    desc: 'Gratis online ondertitelconverter: converteer tussen SRT, VTT, ASS, SBV, LRC en TXT met behoud van de tijdlijn, ASS-effecttags worden automatisch opgeschoond.',
    kw: 'ondertitel converteren,srt naar vtt,vtt naar srt,ass naar srt,sbv naar srt,ondertitel naar tekst,subtitle converter,srt converter',
    intro: 'Converteer tussen SRT, VTT, ASS, SBV, LRC en TXT met behoud van de tijdlijn.',
    feat: 'Het invoerformaat wordt automatisch herkend en de tijdscodes worden herschreven voor het uitvoerformaat; ASS-effecttags en gedwongen regeleinden worden bij export naar een gewoon formaat weer leesbare tekst; liedtekstbestanden hebben geen ure-veld, dus alles boven een uur wordt in minuten geteld.',
    who: 'Wie een speler heeft die het ondertitelbestand weigert, en wie materiaal heen en weer schuift tussen een editor en een webspeler.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Converter'
  },
  'pl': {
    title: 'Konwerter napisów - SRT / VTT / ASS / SBV / LRC / TXT | AI-SRTSub',
    desc: 'Darmowy internetowy konwerter napisów: konwertuj między SRT, VTT, ASS, SBV, LRC i TXT, zachowując oś czasu, znaczniki efektów ASS są czyszczone automatycznie.',
    kw: 'konwersja napisów,srt na vtt,vtt na srt,ass na srt,sbv na srt,napisy do tekstu,subtitle converter,srt converter',
    intro: 'Konwertuj między SRT, VTT, ASS, SBV, LRC i TXT, zachowując oś czasu.',
    feat: 'Format wejściowy jest rozpoznawany automatycznie, a kody czasowe przepisywane na format wyjściowy; znaczniki efektów ASS i wymuszone łamania wierszy przy eksporcie do zwykłego formatu znów stają się czytelnym tekstem; pliki z tekstami piosenek nie mają pola godzin, więc wszystko powyżej godziny liczone jest w minutach.',
    who: 'Osoby, których odtwarzacz nie przyjmuje pliku napisów, i osoby przenoszące materiał między edytorem a odtwarzaczem w przeglądarce.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Converter'
  },
  'sv': {
    title: 'Undertextkonverterare - SRT / VTT / ASS / SBV / LRC / TXT | AI-SRTSub',
    desc: 'Gratis undertextkonverterare online: konvertera mellan SRT, VTT, ASS, SBV, LRC och TXT med tidslinjen intakt, ASS-effekttaggar städas automatiskt.',
    kw: 'konvertera undertexter,srt till vtt,vtt till srt,ass till srt,sbv till srt,undertext till text,subtitle converter,srt converter',
    intro: 'Konvertera mellan SRT, VTT, ASS, SBV, LRC och TXT med tidslinjen intakt.',
    feat: 'Inmatningsformatet känns igen automatiskt och tidskoderna skrivs om för utdataformatet; ASS-effekttaggar och tvingade radbrytningar blir läsbar text igen vid export till ett enkelt format; sångtextfiler saknar timfält, så allt över en timme räknas i minuter.',
    who: 'Den vars spelare vägrar läsa undertextfilen, och den som flyttar material mellan ett redigeringsprogram och en webbspelare.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Converter'
  },
  'cs': {
    title: 'Převod titulků - SRT / VTT / ASS / SBV / LRC / TXT | AI-SRTSub',
    desc: 'Bezplatný online převod titulků: převáděj mezi SRT, VTT, ASS, SBV, LRC a TXT se zachovanou časovou osou, značky efektů ASS se vyčistí automaticky.',
    kw: 'převod titulků,srt na vtt,vtt na srt,ass na srt,sbv na srt,titulky na text,subtitle converter,srt converter',
    intro: 'Převáděj mezi SRT, VTT, ASS, SBV, LRC a TXT se zachovanou časovou osou.',
    feat: 'Vstupní formát je rozpoznán automaticky a časové kódy jsou přepsány pro výstupní formát; značky efektů ASS a vynucené zalomení řádků se při exportu do běžného formátu vrací na čitelný text; soubory s texty písní nemají pole hodin, takže vše nad hodinu se počítá v minutách.',
    who: 'Kdo má přehrávač, který soubor s titulky nevezme, a kdo přenáší materiál mezi střižnou a webovým přehrávačem.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Converter'
  },
  'uk': {
    title: 'Конвертер субтитрів - SRT / VTT / ASS / SBV / LRC / TXT | AI-SRTSub',
    desc: 'Безкоштовний онлайн-конвертер субтитрів: перетворюйте SRT, VTT, ASS, SBV, LRC і TXT один в одного, таймлайн зберігається, теги ефектів ASS очищаються автоматично.',
    kw: 'конвертер субтитрів,srt в vtt,vtt в srt,ass в srt,sbv в srt,субтитри в текст,subtitle converter,srt converter',
    intro: 'Перетворюйте SRT, VTT, ASS, SBV, LRC і TXT один в одного, таймлайн зберігається.',
    feat: 'Формат вводу визначається автоматично, а таймкоди переписуються під формат виводу; теги ефектів ASS і примусові перенесення рядків при експорті у звичайний формат знову стають читабельним текстом; у файлах текстів пісень немає поля годин, тому все, що більше години, рахується у хвилинах.',
    who: 'Ті, чий програвач не приймає файл субтитрів, і ті, хто переносить матеріал між редактором і веб-програвачем.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Converter'
  },
  'da': {
    title: 'Undertekstkonverter - SRT / VTT / ASS / SBV / LRC / TXT | AI-SRTSub',
    desc: 'Gratis online undertekstkonverter: konverter mellem SRT, VTT, ASS, SBV, LRC og TXT med tidslinjen intakt, ASS-effektmærker ryddes op automatisk.',
    kw: 'konverter undertekster,srt til vtt,vtt til srt,ass til srt,sbv til srt,undertekst til tekst,subtitle converter,srt converter',
    intro: 'Konverter mellem SRT, VTT, ASS, SBV, LRC og TXT med tidslinjen intakt.',
    feat: 'Inputformatet registreres automatisk, og tidskoderne omskrives til outputformatet; ASS-effektmærker og tvungne linjeskift bliver til læsbar tekst igen ved eksport til et almindeligt format; sangtekstfiler har ikke et timefelt, så alt over en time tælles i minutter.',
    who: 'Dem hvis afspiller ikke vil læse undertekstfilen, og dem der flytter materiale mellem et redigeringsprogram og en webafspiller.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Converter'
  },
  'fi': {
    title: 'Tekstitysmuunnin - SRT / VTT / ASS / SBV / LRC / TXT | AI-SRTSub',
    desc: 'Ilmainen verkkotyökalu tekstitysten muuntamiseen: muunna SRT-, VTT-, ASS-, SBV-, LRC- ja TXT-muotojen välillä aikajanan säilyessä, ASS-tehostemerkinnät siivotaan automaattisesti.',
    kw: 'muunna tekstitys,srt vtt muunnos,vtt srt muunnos,ass srt muunnos,tekstitys tekstiksi,subtitle converter,srt converter',
    intro: 'Muunna SRT-, VTT-, ASS-, SBV-, LRC- ja TXT-muotojen välillä aikajanan säilyessä.',
    feat: 'Syötemuoto tunnistetaan automaattisesti ja aikakoodit kirjoitetaan uudelleen tulostusmuotoon; ASS-tehostemerkinnät ja pakotetut rivinvaihdot muuttuvat luettavaksi tekstiksi vietäessä tavalliseen muotoon; sanoitustiedostoissa ei ole tuntikenttää, joten yli tunnin menevä osuus lasketaan minuutteina.',
    who: 'Ne, joiden soitin ei suostu lukemaan tekstitystiedostoa, ja ne, jotka siirtävät aineistoa editorin ja verkkosoittimen välillä.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Converter'
  },
  'el': {
    title: 'Μετατροπέας υποτίτλων - SRT / VTT / ASS / SBV / LRC / TXT | AI-SRTSub',
    desc: 'Δωρεάν διαδικτυακός μετατροπέας υποτίτλων: μετατρέψτε μεταξύ SRT, VTT, ASS, SBV, LRC και TXT διατηρώντας τη χρονική γραμμή, οι ετικέτες εφέ ASS καθαρίζονται αυτόματα.',
    kw: 'μετατροπή υποτίτλων,srt σε vtt,vtt σε srt,ass σε srt,sbv σε srt,υπότιτλοι σε κείμενο,subtitle converter,srt converter',
    intro: 'Μετατρέψτε μεταξύ SRT, VTT, ASS, SBV, LRC και TXT διατηρώντας τη χρονική γραμμή.',
    feat: 'Η μορφή εισόδου αναγνωρίζεται αυτόματα και οι χρονικοί κώδικες ξαναγράφονται για τη μορφή εξόδου· οι ετικέτες εφέ ASS και οι αναγκαστικές αλλαγές γραμμής γίνονται ξανά αναγνώσιμο κείμενο κατά την εξαγωγή σε απλή μορφή· τα αρχεία στίχων δεν έχουν πεδίο ώρας, οπότε ό,τι ξεπερνά τη μία ώρα μετριέται σε λεπτά.',
    who: 'Όσων ο player δεν διαβάζει το αρχείο υποτίτλων, και όσων μεταφέρουν υλικό ανάμεσα σε ένα πρόγραμμα μοντάζ και έναν web player.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Converter'
  },
  'he': {
    title: 'ממיר כתוביות - SRT / VTT / ASS / SBV / LRC / TXT | AI-SRTSub',
    desc: 'ממיר כתוביות חינמי באינטרנט: המרה בין SRT, VTT, ASS, SBV, LRC ו־TXT תוך שמירה על ציר הזמן, ותגיות האפקטים של ASS מנוקות אוטומטית.',
    kw: 'המרת כתוביות,srt ל vtt,vtt ל srt,ass ל srt,sbv ל srt,כתוביות לטקסט,subtitle converter,srt converter',
    intro: 'המרה בין SRT, VTT, ASS, SBV, LRC ו־TXT תוך שמירה על ציר הזמן.',
    feat: 'פורמט הקלט מזוהה אוטומטית וקודי הזמן נכתבים מחדש לפי פורמט הפלט; תגיות האפקטים של ASS ושבירת השורה הכפויה חוזרות להיות טקסט קריא בייצוא לפורמט פשוט; בקובצי מילים אין שדה שעות, ולכן מה שמעל שעה נספר בדקות.',
    who: 'מי שהנגן שלו מסרב לקרוא את קובץ הכתוביות, ומי שמעביר חומר בין תוכנת עריכה לנגן ווב.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Converter'
  },
  'ro': {
    title: "Convertor de subtitrări - SRT / VTT / ASS / SBV / LRC / TXT",
    desc: 'Convertor de subtitrări online gratuit: convertește între SRT, VTT, ASS, SBV, LRC și TXT păstrând linia de timp, etichetele de efecte ASS sunt curățate automat.',
    kw: 'conversie subtitrări,srt în vtt,vtt în srt,ass în srt,sbv în srt,subtitrări în text,subtitle converter,srt converter',
    intro: 'Convertește între SRT, VTT, ASS, SBV, LRC și TXT păstrând linia de timp.',
    feat: 'Formatul de intrare este detectat automat, iar codurile de timp sunt rescrise pentru formatul de ieșire; etichetele de efecte ASS și trecerile forțate la linie nouă redevin text lizibil la exportul într-un format simplu; fișierele cu versuri nu au câmp pentru ore, așa că ce depășește o oră se adună în minute.',
    who: 'Cei al căror player nu vrea să citească fișierul de subtitrări, și cei care mută material între un editor și un player web.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Converter'
  }
};

/* v0.9.289：双语字幕剥离页（/bilingual.html）的 SEO 表。
   ❗为什么单独一张：和转换页一样，这个 URL 讲的是另一种用途，
     共用 title/description 会被搜索引擎当成重复内容收录。 */
const SEO_BILINGUAL = {
  'zh-CN': {
    /* ⚠️ v0.9.290：文案不再写死「中文」—— 译文可能是英文 / 日文 / 法文。
       kw 里那两条「只留中文」是真实搜索词，留着拉流量；但标题与正文说「译文」。 */
    title: '双语字幕剥离 - 只留译文 / 只留原文 / 拆成两份 | 随心字幕 AI',
    desc: '免费在线双语字幕剥离：把双语字幕拆成原文一份、译文一份，或者只留其中一种。支持「一条字幕两行」和「两条字幕同一时间轴」两种写法，按先后与文字系统分轨，时间轴原样保留。',
    kw: '双语字幕剥离,双语字幕只留译文,双语字幕只留中文,双语字幕只保留一种语言,双语字幕提取原文,双语字幕拆分,srt双语分离,ass双语字幕拆分,bilingual subtitle splitter',
    intro: '把双语字幕拆成原文一份、译文一份，或者只留其中一种。',
    feat: '支持「一条字幕两行」和「两条字幕同一时间轴」两种双语写法；按先后与文字系统分轨，译文是英文、日文还是法文都成立；时间轴原样保留；整片只有一种语言的字幕会给出提示，不会悄悄删内容。',
    who: '拿到别人做好的双语字幕、只想留一种语言的人，以及要把原文与译文分开存档的字幕组。',
    siteName: '随心字幕 AI', jsonldName: '随心字幕 AI', jsonldAlt: 'AI-SRTSub'
  },
  'zh-TW': {
    title: '雙語字幕剝離 - 只留譯文 / 只留原文 / 拆成兩份 | 隨心字幕 AI',
    desc: '免費線上雙語字幕剝離：把雙語字幕拆成原文一份、譯文一份，或者只留其中一種。支援「一條字幕兩行」和「兩條字幕同一時間軸」兩種寫法，按先後與文字系統分軌，時間軸原樣保留。',
    kw: '雙語字幕剝離,雙語字幕只留譯文,雙語字幕只留中文,雙語字幕只保留一種語言,雙語字幕提取原文,雙語字幕拆分,srt雙語分離,ass雙語字幕拆分,bilingual subtitle splitter',
    intro: '把雙語字幕拆成原文一份、譯文一份，或者只留其中一種。',
    feat: '支援「一條字幕兩行」和「兩條字幕同一時間軸」兩種雙語寫法；依先後與文字系統分軌，譯文是英文、日文還是法文都成立；時間軸原樣保留；整片只有一種語言的字幕會給出提示，不會悄悄刪內容。',
    who: '拿到別人做好的雙語字幕、只想留一種語言的人，以及要把原文與譯文分開存檔的字幕組。',
    siteName: '隨心字幕 AI', jsonldName: '隨心字幕 AI', jsonldAlt: 'AI-SRTSub'
  },
  'en': {
    title: 'Bilingual Subtitle Splitter - Keep Just One Language | AI-SRTSub',
    desc: 'Free online bilingual subtitle splitter: split a bilingual subtitle file into an original track and a translated track, or keep just one.',
    kw: 'bilingual subtitle splitter,split bilingual srt,remove second language subtitle,keep only english subtitle,extract translated subtitle,srt bilingual split,ass bilingual split',
    intro: 'Split a bilingual subtitle file into an original track and a translated track, or keep just one of them.',
    feat: 'Handles both common layouts - one cue carrying two lines, and two cues sharing the same timeline. Tracks are split by order and script type, the timeline is kept exactly as it is, and a single-language file is flagged instead of being silently emptied.',
    who: 'Anyone handed a ready-made bilingual file who wants only one language, and subtitle teams who archive the original and the translation separately.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Bilingual Subtitle Splitter'
  },
  'ja': {
    title: 'バイリンガル字幕の分離 - 原文だけ / 訳文だけ / 二つに分ける | AI-SRTSub',
    desc: '無料のオンラインツール：二か国語の字幕を原文と訳文に分けます。どちらか一方だけを残すこともできます。',
    kw: '字幕 二か国語 分離,字幕 原文だけ,字幕 訳文だけ,バイリンガル字幕 分割,srt 二言語 分離,ass 二言語 字幕',
    intro: '二か国語の字幕を原文と訳文に分け、どちらか一方だけを残すこともできます。',
    feat: '「1 件に 2 行」と「2 件が同じ時間軸」という二つの形式に対応します。文字の種類で仕分けし、時間軸はそのまま保持します。単一言語の字幕はこっそり消さずに警告を出します。',
    who: '二か国語の字幕を受け取って片方の言語だけ欲しい人、原文と訳文を分けて保管したい字幕チーム。',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Bilingual Subtitle Splitter'
  },
  'es': {
    title: 'Separar subtítulos bilingües - dejar solo un idioma | AI-SRTSub',
    desc: 'Herramienta online gratis para separar subtítulos bilingües: divide el archivo en una pista original y una traducida, o quédate solo con una.',
    kw: 'separar subtítulos bilingües,dejar solo un idioma subtítulos,quitar segundo idioma subtítulos,srt bilingüe separar,extraer subtítulos traducidos',
    intro: 'Divide unos subtítulos bilingües en una pista original y una traducida, o quédate solo con una de las dos.',
    feat: 'Admite las dos formas habituales: una entrada con dos líneas y dos entradas que comparten la misma línea de tiempo. La separación se hace por tipo de escritura, la línea de tiempo se conserva tal cual y un archivo de un solo idioma avisa en lugar de vaciarse en silencio.',
    who: 'Quien recibe subtítulos bilingües ya hechos y solo quiere un idioma, y los equipos que archivan original y traducción por separado.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Bilingual Subtitle Splitter'
  },
  'pt': {
    title: 'Separar legendas bilíngues - manter só um idioma | AI-SRTSub',
    desc: 'Ferramenta online grátis para separar legendas bilíngues: divida o arquivo em uma faixa original e uma traduzida, ou fique só com uma.',
    kw: 'separar legendas bilíngues,manter só um idioma legenda,remover segunda língua legenda,srt bilíngue separar,extrair legenda traduzida',
    intro: 'Divida legendas bilíngues em uma faixa original e uma traduzida, ou fique só com uma das duas.',
    feat: 'Aceita os dois formatos comuns: uma entrada com duas linhas e duas entradas na mesma linha do tempo. A separação é feita pelo tipo de escrita, a linha do tempo fica exatamente igual e um arquivo de um só idioma avisa em vez de esvaziar em silêncio.',
    who: 'Quem recebeu legendas bilíngues prontas e quer só um idioma, e equipes que arquivam original e tradução separadamente.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Bilingual Subtitle Splitter'
  },
  'ko': {
    title: '이중 언어 자막 분리 - 원문만 / 번역문만 / 두 파일로 | AI-SRTSub',
    desc: '무료 온라인 이중 언어 자막 분리: 두 언어가 섞인 자막을 원문과 번역문으로 나누거나 둘 중 하나만 남길 수 있습니다.',
    kw: '이중 언어 자막 분리,자막 한 언어만 남기기,자막 원문만 추출,자막 번역문만 추출,srt 이중 언어 분리,ass 자막 분리',
    intro: '두 언어가 섞인 자막을 원문과 번역문으로 나누거나, 둘 중 하나만 남길 수 있습니다.',
    feat: '한 항목에 두 줄이 있는 경우와 두 항목이 같은 시간축을 쓰는 경우를 모두 처리합니다. 문자 형태로 분리하며 타임라인은 그대로 유지합니다. 한 언어로만 된 자막은 조용히 지우지 않고 알려 줍니다.',
    who: '이중 언어 자막을 받아 한 언어만 필요한 사람, 원문과 번역문을 따로 보관하는 자막 팀.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Bilingual Subtitle Splitter'
  },
  'de': {
    title: "Zweisprachige Untertitel trennen - nur eine Sprache behalten",
    desc: 'Kostenloses Online-Werkzeug: zweisprachige Untertitel in eine Original- und eine übersetzte Spur aufteilen oder nur eine behalten.',
    kw: 'zweisprachige untertitel trennen,nur eine sprache untertitel,zweite sprache entfernen untertitel,srt zweisprachig trennen,untertitel übersetzung extrahieren',
    intro: 'Zweisprachige Untertitel in eine Original- und eine übersetzte Spur aufteilen - oder nur eine von beiden behalten.',
    feat: 'Beide üblichen Varianten werden erkannt: eine Zeile mit zwei Textzeilen und zwei Zeilen mit identischer Zeitachse. Getrennt wird nach Reihenfolge und Schriftart, die Zeitachse bleibt unverändert, und eine einsprachige Datei meldet sich statt stillschweigend leer zu bleiben.',
    who: 'Wer fertige zweisprachige Untertitel bekommt und nur eine Sprache braucht, und Teams, die Original und Übersetzung getrennt archivieren.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Bilingual Subtitle Splitter'
  },
  'fr': {
    title: "Séparer les sous-titres bilingues - ne garder qu'une langue",
    desc: 'Outil en ligne gratuit : séparez des sous-titres bilingues en une piste originale et une piste traduite, ou ne gardez qu\'une seule.',
    kw: 'séparer sous-titres bilingues,garder une seule langue sous-titres,retirer deuxième langue sous-titres,srt bilingue séparer,extraire sous-titres traduits',
    intro: 'Séparez des sous-titres bilingues en une piste originale et une piste traduite, ou ne gardez que l\'une des deux.',
    feat: 'Les deux présentations courantes sont gérées : une entrée à deux lignes et deux entrées partageant la même ligne de temps. Le tri se fait selon l\'ordre et le type d\'écriture, la ligne de temps reste intacte, et un fichier monolingue prévient au lieu de se vider en silence.',
    who: 'Ceux qui reçoivent des sous-titres bilingues tout faits et ne veulent qu\'une langue, et les équipes qui archivent original et traduction séparément.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Bilingual Subtitle Splitter'
  },
  'id': {
    title: 'Pemisah subtitle dwibahasa - simpan satu bahasa saja | AI-SRTSub',
    desc: 'Alat online gratis untuk memisahkan subtitle dwibahasa: pisahkan menjadi berkas teks asli dan terjemahan, atau simpan salah satunya.',
    kw: 'pisah subtitle dwibahasa,subtitle satu bahasa saja,hapus bahasa kedua subtitle,srt dwibahasa pisah,ekstrak subtitle terjemahan',
    intro: 'Pisahkan subtitle dwibahasa menjadi teks asli dan terjemahan, atau simpan salah satunya saja.',
    feat: 'Mendukung dua bentuk umum: satu entri berisi dua baris, dan dua entri dengan garis waktu yang sama. Pemilahan dilakukan berdasarkan jenis tulisan, garis waktu tetap utuh, dan berkas satu bahasa akan diberi peringatan alih-alih dikosongkan diam-diam.',
    who: 'Siapa pun yang menerima subtitle dwibahasa jadi dan hanya butuh satu bahasa, serta tim yang mengarsipkan teks asli dan terjemahan terpisah.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Bilingual Subtitle Splitter'
  },
  'hi': {
    title: 'द्विभाषी सबटाइटल अलग करें - केवल एक भाषा रखें | AI-SRTSub',
    desc: 'द्विभाषी सबटाइटल को मूल और अनूदित हिस्सों में बाँटें, या केवल एक रखें। दोनों सामान्य रूप संभाले जाते हैं और टाइमलाइन नहीं बदलती।',
    kw: 'द्विभाषी सबटाइटल अलग,सबटाइटल एक भाषा,दूसरी भाषा हटाएं सबटाइटल,srt द्विभाषी अलग करें,अनूदित सबटाइटल निकालें',
    intro: 'द्विभाषी सबटाइटल को मूल और अनूदित हिस्सों में बाँटें, या केवल एक रखें।',
    feat: 'दोनों सामान्य रूप संभाले जाते हैं: एक प्रविष्टि में दो पंक्तियाँ, और दो प्रविष्टियाँ जिनकी समयरेखा एक ही है। बँटवारा लिपि के आधार पर होता है, समयरेखा वैसी ही रहती है, और एकभाषी फ़ाइल चुपचाप खाली होने के बजाय संकेत देती है।',
    who: 'जिसे तैयार द्विभाषी सबटाइटल मिलीं और एक ही भाषा चाहिए, और वे टीमें जो मूल व अनुवाद अलग संग्रहीत करती हैं।',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Bilingual Subtitle Splitter'
  },
  'th': {
    title: 'แยกซับไตเติลสองภาษา - เก็บไว้ภาษาเดียว | AI-SRTSub',
    desc: 'แยกซับไตเติลสองภาษาเป็นต้นฉบับกับคำแปล หรือเก็บไว้เพียงชุดเดียว รองรับทั้งสองรูปแบบที่พบบ่อย และไทม์ไลน์คงเดิมทุกประการ',
    kw: 'แยกซับไตเติลสองภาษา,ซับไตเติลภาษาเดียว,ลบภาษาที่สองออกจากซับไตเติล,แยก srt สองภาษา,ดึงซับไตเติลที่แปลแล้ว',
    intro: 'แยกซับไตเติลสองภาษาเป็นต้นฉบับกับคำแปล หรือเก็บไว้เพียงชุดเดียว',
    feat: 'รองรับทั้งสองรูปแบบที่พบบ่อย: หนึ่งรายการที่มีสองบรรทัด และสองรายการที่ใช้เส้นเวลาเดียวกัน แยกตามลักษณะตัวอักษร เส้นเวลาคงเดิมทุกประการ และไฟล์ภาษาเดียวจะแจ้งเตือนแทนที่จะถูกลบเงียบ ๆ',
    who: 'ผู้ที่ได้รับซับไตเติลสองภาษาสำเร็จรูปและต้องการเพียงภาษาเดียว รวมถึงทีมที่เก็บต้นฉบับและคำแปลแยกกัน',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Bilingual Subtitle Splitter'
  },
  'vi': {
    title: 'Tách phụ đề song ngữ - chỉ giữ một ngôn ngữ | AI-SRTSub',
    desc: 'Công cụ online miễn phí để tách phụ đề song ngữ: chia thành bản gốc và bản dịch, hoặc chỉ giữ một trong hai.',
    kw: 'tách phụ đề song ngữ,phụ đề một ngôn ngữ,bỏ ngôn ngữ thứ hai trong phụ đề,tách srt song ngữ,trích phụ đề đã dịch',
    intro: 'Tách phụ đề song ngữ thành bản gốc và bản dịch, hoặc chỉ giữ một trong hai.',
    feat: 'Xử lý cả hai dạng thường gặp: một mục gồm hai dòng, và hai mục dùng chung một dòng thời gian. Phân loại theo dạng chữ viết, dòng thời gian giữ nguyên, và tệp chỉ có một ngôn ngữ sẽ được cảnh báo thay vì bị xóa âm thầm.',
    who: 'Người nhận được phụ đề song ngữ có sẵn và chỉ cần một ngôn ngữ, cùng các nhóm lưu bản gốc và bản dịch riêng biệt.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Bilingual Subtitle Splitter'
  },
  'ru': {
    title: 'Разделить двуязычные субтитры - оставить один язык | AI-SRTSub',
    desc: 'Бесплатный онлайн-инструмент: разделите двуязычные субтитры на оригинал и перевод или оставьте только что-то одно.',
    kw: 'разделить двуязычные субтитры,оставить один язык субтитры,убрать второй язык субтитры,srt двуязычный разделить,извлечь переведённые субтитры',
    intro: 'Разделите двуязычные субтитры на оригинал и перевод или оставьте только одну из двух частей.',
    feat: 'Поддерживаются оба распространённых вида: одна запись с двумя строками и две записи с одинаковой временной шкалой. Разделение идёт по типу письменности, шкала остаётся без изменений, а одноязычный файл получит предупреждение вместо тихого удаления содержимого.',
    who: 'Тем, кто получил готовые двуязычные субтитры и хочет только один язык, и командам, которые хранят оригинал и перевод отдельно.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Bilingual Subtitle Splitter'
  },
  'it': {
    title: 'Separare sottotitoli bilingui - tenere una sola lingua | AI-SRTSub',
    desc: 'Strumento online gratuito per separare i sottotitoli bilingui: dividili in una traccia originale e una tradotta, oppure tieni solo una delle due.',
    kw: 'separare sottotitoli bilingui,sottotitoli una sola lingua,rimuovere seconda lingua sottotitoli,srt bilingue separare,estrarre sottotitoli tradotti',
    intro: 'Dividi i sottotitoli bilingui in una traccia originale e una tradotta, oppure tieni solo una delle due.',
    feat: 'Gestisce entrambe le forme più comuni: una voce con due righe e due voci che condividono la stessa linea del tempo. La separazione avviene per ordine e tipo di scrittura, la linea del tempo resta identica e un file monolingue avvisa invece di svuotarsi in silenzio.',
    who: 'Chi riceve sottotitoli bilingui già pronti e vuole una sola lingua, e i team che archiviano originale e traduzione separatamente.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Bilingual Subtitle Splitter'
  },
  'ar': {
    title: 'فصل الترجمة ثنائية اللغة - الإبقاء على لغة واحدة | AI-SRTSub',
    desc: 'أداة مجانية على الإنترنت: افصل الترجمة ثنائية اللغة إلى مسار أصلي ومسار مترجم، أو احتفظ بواحد فقط.',
    kw: 'فصل الترجمة ثنائية اللغة,ترجمة بلغة واحدة,إزالة اللغة الثانية من الترجمة,فصل srt ثنائي اللغة,استخراج الترجمة المترجمة',
    intro: 'افصل الترجمة ثنائية اللغة إلى مسار أصلي ومسار مترجم، أو احتفظ بواحد فقط منهما.',
    feat: 'يتعامل مع الشكلين الشائعين: مدخل بسطرين، ومدخلان يتشاركان نفس الخط الزمني. يتم الفصل حسب نوع الكتابة، ويبقى الخط الزمني كما هو، والملف بلغة واحدة يُنبّه بدل أن يُفرغ بصمت.',
    who: 'من وصلته ترجمة بلغتين جاهزة ويريد لغة واحدة فقط، والفرق التي تحفظ الأصل والترجمة بشكل منفصل.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Bilingual Subtitle Splitter'
  },
  'tr': {
    title: 'İki dilli altyazıyı ayır - tek dil bırak | AI-SRTSub',
    desc: 'Ücretsiz online araç: iki dilli altyazıyı orijinal ve çeviri olarak ayırın ya da sadece birini bırakın.',
    kw: 'iki dilli altyazı ayırma,altyazı tek dil,altyazıdan ikinci dili kaldırma,srt iki dili ayırma,çevrilmiş altyazıyı çıkarma',
    intro: 'İki dilli altyazıyı orijinal ve çeviri olarak ayırın ya da sadece birini bırakın.',
    feat: 'Yaygın iki düzen de desteklenir: iki satırlı tek giriş ve aynı zaman çizgisini paylaşan iki giriş. Ayırma yazı türüne göre yapılır, zaman çizgisi aynı kalır ve tek dilli dosya sessizce boşaltılmak yerine uyarı verir.',
    who: 'Hazır iki dilli altyazı alıp tek dil isteyenler ile orijinali ve çeviriyi ayrı arşivleyen ekipler.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Bilingual Subtitle Splitter'
  },
  'nl': {
    title: 'Tweetalige ondertiteling splitsen - één taal houden | AI-SRTSub',
    desc: 'Gratis online tool: splits tweetalige ondertiteling in een originele en een vertaalde versie, of houd er maar één over.',
    kw: 'tweetalige ondertiteling splitsen,ondertiteling één taal,tweede taal verwijderen ondertiteling,srt tweetalig splitsen,vertaalde ondertiteling extraheren',
    intro: 'Splits tweetalige ondertiteling in een originele en een vertaalde versie, of houd er maar één over.',
    feat: 'Beide gangbare vormen worden herkend: één item met twee regels en twee items die dezelfde tijdlijn delen. Scheiden gebeurt op volgorde en schrifttype, de tijdlijn blijft gelijk en een eentalig bestand geeft een melding in plaats van stilletjes leeg te raken.',
    who: 'Wie kant-en-klare tweetalige ondertiteling krijgt en maar één taal nodig heeft, en teams die origineel en vertaling apart archiveren.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Bilingual Subtitle Splitter'
  },
  'pl': {
    title: 'Podział napisów dwujęzycznych - zostaw jeden język | AI-SRTSub',
    desc: 'Darmowe narzędzie online: podziel dwujęzyczne napisy na wersję oryginalną i przetłumaczoną albo zostaw tylko jedną.',
    kw: 'podział napisów dwujęzycznych,napisy tylko w jednym języku,usuń drugi język z napisów,podział srt dwujęzyczny,wyodrębnij przetłumaczone napisy',
    intro: 'Podziel dwujęzyczne napisy na wersję oryginalną i przetłumaczoną albo zostaw tylko jedną z nich.',
    feat: 'Obsługuje obie popularne postacie: jedną pozycję z dwoma wierszami oraz dwie pozycje na tej samej osi czasu. Podział idzie po rodzaju pisma, oś czasu zostaje bez zmian, a plik jednojęzyczny dostaje ostrzeżenie zamiast zostać po cichu opróżniony.',
    who: 'Osoby, które dostały gotowe napisy dwujęzyczne i chcą tylko jeden język, oraz zespoły archiwizujące oryginał i tłumaczenie osobno.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Bilingual Subtitle Splitter'
  },
  'sv': {
    title: 'Dela tvåspråkig undertext - behåll ett språk | AI-SRTSub',
    desc: 'Gratis online-verktyg: dela tvåspråkig undertext i en original- och en översättningsdel, eller behåll bara en.',
    kw: 'dela tvåspråkig undertext,undertext ett språk,ta bort andra språket undertext,dela srt tvåspråkig,extrahera översatt undertext',
    intro: 'Dela tvåspråkig undertext i en original- och en översättningsdel, eller behåll bara en av dem.',
    feat: 'Båda vanliga varianterna hanteras: en post med två rader och två poster som delar samma tidslinje. Uppdelningen sker efter ordning och skrifttyp, tidslinjen lämnas orörd och en enspråkig fil varnar i stället för att tömmas i tysthet.',
    who: 'Den som fått färdig tvåspråkig undertext och bara vill ha ett språk, och team som arkiverar original och översättning separat.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Bilingual Subtitle Splitter'
  },
  'cs': {
    title: 'Rozdělit dvojjazyčné titulky - ponechat jeden jazyk | AI-SRTSub',
    desc: 'Zdarma online nástroj: rozděl dvojjazyčné titulky na originál a překlad, nebo ponech jen jednu část.',
    kw: 'rozdělit dvojjazyčné titulky,titulky jen jeden jazyk,odstranit druhý jazyk titulek,rozdělit srt dvojjazyčné,extrahovat přeložené titulky',
    intro: 'Rozděl dvojjazyčné titulky na originál a překlad, nebo ponech jen jednu z obou částí.',
    feat: 'Zvládá obě běžné podoby: jednu položku se dvěma řádky a dvě položky sdílející stejnou časovou osu. Dělení probíhá podle typu písma, časová osa zůstává beze změny a jednojazyčný soubor upozorní místo aby se potichu vyprázdnil.',
    who: 'Kdo dostal hotové dvojjazyčné titulky a chce jen jeden jazyk, a týmy, které archivují originál a překlad odděleně.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Bilingual Subtitle Splitter'
  },
  'uk': {
    title: 'Розділити двомовні субтитри - залишити одну мову | AI-SRTSub',
    desc: 'Безкоштовний онлайн-інструмент: розділіть двомовні субтитри на оригінал і переклад або залиште лише щось одне.',
    kw: 'розділити двомовні субтитри,субтитри однією мовою,прибрати другу мову з субтитрів,розділити srt двомовний,витягти перекладені субтитри',
    intro: 'Розділіть двомовні субтитри на оригінал і переклад або залиште лише одну з двох частин.',
    feat: 'Підтримуються обидва поширені варіанти: один запис із двома рядками та два записи з однаковою часовою шкалою. Розділення йде за типом письма, шкала лишається незмінною, а одномовний файл попередить замість тихого спорожнення.',
    who: 'Ті, хто отримав готові двомовні субтитри й хоче лише одну мову, та команди, що зберігають оригінал і переклад окремо.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Bilingual Subtitle Splitter'
  },
  'da': {
    title: 'Del tosprogede undertekster - behold ét sprog | AI-SRTSub',
    desc: 'Gratis online værktøj: del tosprogede undertekster op i en original og en oversat udgave, eller behold kun den ene.',
    kw: 'del tosprogede undertekster,undertekster ét sprog,fjern andet sprog undertekster,del srt tosproget,udtræk oversatte undertekster',
    intro: 'Del tosprogede undertekster op i en original og en oversat udgave, eller behold kun den ene af dem.',
    feat: 'Begge almindelige varianter håndteres: én post med to linjer og to poster der deler samme tidslinje. Opdelingen sker efter rækkefølge og skrifttype, tidslinjen forbliver uændret, og en etsproget fil giver besked i stedet for at blive tømt i stilhed.',
    who: 'Dem der har fået færdige tosprogede undertekster og kun vil have ét sprog, og teams der arkiverer original og oversættelse hver for sig.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Bilingual Subtitle Splitter'
  },
  'fi': {
    title: 'Jaa kaksikieliset tekstitykset - jätä vain yksi kieli | AI-SRTSub',
    desc: 'Ilmainen verkkotyökalu: jaa kaksikieliset tekstitykset alkuperäiseen ja käännettyyn osaan tai jätä vain toinen.',
    kw: 'jaa kaksikieliset tekstitykset,tekstitykset yhdellä kielellä,poista toinen kieli tekstityksistä,jaa srt kaksikielinen,poimi käännetyt tekstitykset',
    intro: 'Jaa kaksikieliset tekstitykset alkuperäiseen ja käännettyyn osaan tai jätä vain toinen niistä.',
    feat: 'Molemmat yleiset muodot tunnistetaan: yksi merkintä, jossa on kaksi riviä, ja kaksi merkintää samalla aikajanalla. Jako tehdään kirjoitusmerkkien perusteella, aikajana pysyy muuttumattomana, ja yksikielinen tiedosto varoittaa sen sijaan että tyhjenisi hiljaa.',
    who: 'Ne, jotka saivat valmiit kaksikieliset tekstitykset ja haluavat vain yhden kielen, sekä tiimit, jotka arkistoivat alkuperäisen ja käännöksen erikseen.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Bilingual Subtitle Splitter'
  },
  'el': {
    title: 'Διαχωρισμός δίγλωσσων υποτίτλων - κράτα μία γλώσσα | AI-SRTSub',
    desc: 'Δωρεάν εργαλείο στο διαδίκτυο: χώρισε δίγλωσσους υπότιτλους σε πρωτότυπο και μετάφραση ή κράτα μόνο το ένα.',
    kw: 'διαχωρισμός δίγλωσσων υποτίτλων,υπότιτλοι μία γλώσσα,αφαίρεση δεύτερης γλώσσας υποτίτλων,διαχωρισμός srt δίγλωσσο,εξαγωγή μεταφρασμένων υποτίτλων',
    intro: 'Χώρισε δίγλωσσους υπότιτλους σε πρωτότυπο και μετάφραση ή κράτα μόνο το ένα από τα δύο.',
    feat: 'Υποστηρίζονται και οι δύο συνηθισμένες μορφές: μία καταχώρηση με δύο γραμμές και δύο καταχωρήσεις που μοιράζονται την ίδια γραμμή χρόνου. Ο διαχωρισμός γίνεται με βάση το είδος γραφής, η γραμμή χρόνου μένει ακριβώς ίδια και ένα μονόγλωσσο αρχείο ειδοποιεί αντί να αδειάσει σιωπηλά.',
    who: 'Όποιος έλαβε έτοιμους δίγλωσσους υπότιτλους και θέλει μόνο μία γλώσσα, και οι ομάδες που αρχειοθετούν πρωτότυπο και μετάφραση ξεχωριστά.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Bilingual Subtitle Splitter'
  },
  'he': {
    title: 'פיצול כתוביות דו-לשוניות - להשאיר שפה אחת | AI-SRTSub',
    desc: 'כלי מקוון חינמי: פצל כתוביות דו-לשוניות למקור ולתרגום או השאר רק אחד מהם.',
    kw: 'פיצול כתוביות דו לשוניות,כתוביות בשפה אחת,הסרת השפה השנייה מכתוביות,פיצול srt דו לשוני,חילוץ כתוביות מתורגמות',
    intro: 'פצל כתוביות דו-לשוניות למקור ולתרגום או השאר רק אחד מהם.',
    feat: 'שתי הצורות הנפוצות נתמכות: רשומה אחת עם שתי שורות ושתי רשומות שחולקות את אותו ציר זמן. ההפרדה נעשית לפי סוג הכתב, ציר הזמן נשאר כמו שהוא, וקובץ חד-לשוני יתריע במקום להתרוקן בשקט.',
    who: 'מי שקיבל כתוביות דו-לשוניות מוכנות ורוצה שפה אחת בלבד, וצוותים ששומרים את המקור והתרגום בנפרד.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Bilingual Subtitle Splitter'
  },
  'ro': {
    title: "Separă subtitrările bilingve - păstrează o singură limbă",
    desc: 'Instrument online gratuit: împarte subtitrările bilingve într-o versiune originală și una tradusă sau păstrează doar una.',
    kw: 'împărțire subtitrări bilingve,subtitrări o singură limbă,elimină a doua limbă subtitrări,împarte srt bilingv,extrage subtitrări traduse',
    intro: 'Împarte subtitrările bilingve într-o versiune originală și una tradusă sau păstrează doar una dintre ele.',
    feat: 'Sunt tratate ambele forme uzuale: o intrare cu două rânduri și două intrări care împart aceeași linie de timp. Separarea se face după tipul de scriere, linia de timp rămâne neschimbată, iar un fișier într-o singură limbă avertizează în loc să se golească pe tăcute.',
    who: 'Cine a primit subtitrări bilingve gata făcute și vrea o singură limbă, și echipele care arhivează originalul și traducerea separat.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Bilingual Subtitle Splitter'
  }
};
/* v0.9.291：第七个页面 —— 字幕时间轴调整（/shift.html）
   与双语剥离页同理：纯前端零 API 调用费，是优先抢的搜索词。 */
const SEO_SHIFT = {
  'zh-CN': {
    title: '字幕时间轴调整 - 整体平移 / 倍率缩放 / 两点校正 / 合并与拆分 | 随心字幕 AI',
    desc: '免费在线字幕时间轴调整：整体提前或延后、按倍率缩放、两点校正一次对上。进来什么格式就出去什么格式，ASS 样式与特效标记原样保留，还能合并碎片、拆分长句。',
    kw: '字幕时间轴调整,字幕时间轴平移,字幕延迟调整,srt时间轴校正,字幕对不上,字幕快慢调整,ass时间轴调整,字幕时间轴缩放,subtitle timing shift,字幕合并,字幕拆分,srt字幕合并,字幕太长拆分,双语字幕合并',
    intro: '字幕和画面对不上时，把时间轴整体提前或延后、按倍率缩放，或者用两点校正一次对上。还能合并碎片、拆分长句。',
    feat: '平移只改位置、不动每条字幕的时长；倍率缩放会把时长同步缩放，适合 24 帧与 25 帧互转这类场景；两点校正针对既有偏移又有速率差的字幕。算出来是负数的时间会截断到 0，并告诉你有几条受影响。 进来什么格式就出去什么格式，不做格式转换；ASS 的样式表和每条的样式、特效标记都原样保留。双语字幕合并时保持原文一行、译文一行，拆分时整条跳过。',
    who: '换了片源、字幕整体快了或慢了、或者拿到别人按不同帧率做的字幕的人。',
    siteName: '随心字幕 AI', jsonldName: '随心字幕 AI', jsonldAlt: 'AI-SRTSub'
  },
  'zh-TW': {
    title: '字幕時間軸調整 - 整體平移 / 倍率縮放 / 兩點校正 / 合併與拆分 | 隨心字幕 AI',
    desc: '免費線上字幕時間軸調整：整體提前或延後、依倍率縮放、兩點校正一次對上。進來什麼格式就出去什麼格式，ASS 的樣式與特效標記原樣保留，還能合併碎片、拆分長句。',
    kw: '字幕時間軸調整,字幕時間軸平移,字幕延遲調整,srt時間軸校正,字幕對不上,字幕快慢調整,ass時間軸調整,字幕時間軸縮放,subtitle timing shift,字幕合併,字幕拆分,srt字幕合併,字幕太長拆分,雙語字幕合併',
    intro: '字幕和畫面對不上時，把時間軸整體提前或延後、依倍率縮放，或用兩點校正一次對上。還能合併碎片、拆分長句。',
    feat: '平移只改位置、不動每條字幕的長度；倍率縮放會讓長度同步縮放，適合 24 幀與 25 幀互轉這類情境；兩點校正針對既有偏移又有速率差的字幕。算出來的時間若為負數會截到 0，並告訴你有幾條受影響。 進來什麼格式就出去什麼格式，不做格式轉換；ASS 的樣式表和每條的樣式、特效標記都原樣保留。雙語字幕合併時保持原文一行、譯文一行，拆分時整條跳過。',
    who: '換了片源、字幕整體快了或慢了、或拿到別人按不同幀率做的字幕的人。',
    siteName: '隨心字幕 AI', jsonldName: '隨心字幕 AI', jsonldAlt: 'AI-SRTSub'
  },
  'en': {
    title: 'Subtitle Timeline Shift - Move, Rescale, Merge and split | AI-SRTSub',
    desc: 'Free online subtitle timing tool: shift everything at once, rescale by a ratio, or fix drift with two anchor points. Works with SRT, VTT, ASS, SBV, LRC and TXT.',
    kw: 'subtitle timing shift,shift srt timing,subtitle sync adjust,rescale subtitle timing,fix subtitle delay,srt time offset,subtitle drift fix,merge subtitles,split subtitles,combine srt,split long subtitle',
    intro: 'When subtitles are out of sync, move the whole timeline, rescale it by a ratio, or fix it with two anchor points. It can also merge lines that were split apart, and split ones that run too long.',
    feat: 'Shifting moves every cue without changing how long each one stays on screen. Rescaling multiplies both ends, so cue length changes with it - handy between 24 and 25 fps. The two-point fix handles files that are both offset and running at the wrong speed. Times that come out negative are clamped to zero, and the tool tells you how many were affected. Same format in, same format out - no conversion, and ASS styles, per-line styling and effect tags are kept exactly as they were. Bilingual cues stay on two lines when merged and are skipped when splitting.',
    who: 'Anyone whose subtitles drift after a source change, run slightly fast or slow, or came from someone working at a different frame rate.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Timeline Shift'
  },
  'ja': {
    title: '字幕タイムライン調整 - 一括移動 / 倍率伸縮 / 2 点補正 / 結合と分割 | AI-SRTSub',
    desc: '無料のオンラインツール：字幕のタイムラインを一括でずらす、倍率で伸縮する、2 点で補正できます。',
    kw: '字幕 タイムライン 調整,字幕 ずらす,srt 時間 調整,字幕 遅れ 修正,字幕 早い 遅い,ass タイムライン,subtitle timing shift,字幕結合,字幕分割,srt結合,長い字幕分割',
    intro: '字幕が映像とずれるとき、タイムラインを一括で動かす、倍率で伸縮する、2 点で補正できます。 細切れになった行をまとめたり、長すぎる行を分割したりもできます。',
    feat: '一括移動は各字幕の表示時間を変えずに位置だけ動かします。倍率は開始と終了の両方にかかるため表示時間も変わります（24fps と 25fps の違いに最適）。2 点補正はずれと速度差が両方ある字幕に対応します。負の時間になった行は 0 に丸められ、件数が表示されます。 入れた形式のまま出力します。変換は行わず、ASS のスタイルや各行のスタイル、タグもそのまま残ります。二言語の字幕は結合しても二行のまま、分割時は対象から外れます。',
    who: '配信元が変わって字幕がずれた人、字幕全体が速い・遅い人、別のフレームレートで作られた字幕を受け取った人。',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Timeline Shift'
  },
  'es': {
    title: 'Ajuste de tiempos - mover, escalar, unir y dividir | AI-SRTSub',
    desc: 'Herramienta online gratis: desplaza todos los tiempos, reescala con un factor o corrige con dos puntos. Funciona con SRT, VTT, ASS, SBV, LRC y TXT.',
    kw: 'ajustar tiempo subtítulos,desplazar subtítulos srt,sincronizar subtítulos,corregir retraso subtítulos,reescalar subtítulos,srt tiempo desfase,unir subtítulos,dividir subtítulos,combinar srt,subtítulo largo dividir',
    intro: 'Cuando los subtítulos no van sincronizados, desplaza toda la línea de tiempo, reescala con un factor o corrígela con dos puntos. También une las líneas partidas y divide las demasiado largas.',
    feat: 'Desplazar mueve cada línea sin cambiar cuánto tiempo se muestra. Reescalar multiplica el inicio y el fin, así que la duración cambia: útil entre 24 y 25 fps. La corrección de dos puntos sirve para archivos con desfase y velocidad distinta. Los tiempos negativos se fijan en cero y se indica cuántas líneas se vieron afectadas. Entra y sale en el mismo formato: no hay conversión y se conservan los estilos, el formato de cada línea y las etiquetas del ASS. Los subtítulos bilingües siguen en dos líneas al unirse y se omiten al dividir.',
    who: 'Quien cambia de fuente y los subtítulos se desincronizan, van algo rápidos o lentos, o vienen de alguien que trabajó a otro fotogramaje.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Timeline Shift'
  },
  'pt': {
    title: 'Ajuste de tempo - mover, escalar, unir e dividir | AI-SRTSub',
    desc: 'Ferramenta online grátis: desloque tudo de uma vez, reescale com um fator ou corrija com dois pontos. Funciona com SRT, VTT, ASS, SBV, LRC e TXT.',
    kw: 'ajustar tempo legendas,deslocar legenda srt,sincronizar legendas,corrigir atraso legenda,reescalar legenda,srt tempo deslocado,unir legendas,dividir legendas,combinar srt,legenda longa dividir',
    intro: 'Quando as legendas estão fora de sincronia, mova toda a linha do tempo, reescale com um fator ou corrija com dois pontos. Também une as linhas partidas e divide as longas demais.',
    feat: 'Deslocar move cada linha sem mudar quanto tempo ela fica na tela. Reescalar multiplica o início e o fim, então a duração muda: útil entre 24 e 25 fps. A correção de dois pontos atende arquivos com deslocamento e velocidade diferente. Tempos negativos vão a zero e a ferramenta informa quantas linhas foram afetadas. Entra e sai no mesmo formato: não há conversão e os estilos, a formatação de cada linha e as tags do ASS são mantidos. As legendas bilíngues continuam em duas linhas ao unir e são ignoradas ao dividir.',
    who: 'Quem troca de fonte e as legendas dessincronizam, ficam rápidas ou lentas, ou vieram de alguém que trabalhou em outra taxa de quadros.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Timeline Shift'
  },
  'ko': {
    title: '자막 타임라인 조정 - 이동 / 배율 / 두 지점 보정 / 병합과 분할 | AI-SRTSub',
    desc: '무료 온라인 자막 시간 조정 도구: 한꺼번에 이동, 배율 조정, 두 지점 보정을 지원합니다.',
    kw: '자막 시간 조정,자막 싱크 맞추기,srt 시간 조정,자막 밀림 수정,자막 빠르게 느리게,ass 타임라인,subtitle timing shift,자막 병합,자막 분할,srt 병합,긴 자막 분할',
    intro: '자막이 영상과 맞지 않을 때 타임라인을 한꺼번에 옮기거나 배율로 조정하거나 두 지점으로 보정하세요. 잘게 나뉜 줄을 합치고, 너무 긴 줄을 나눌 수도 있습니다.',
    feat: '이동은 각 자막의 표시 시간을 바꾸지 않고 위치만 옮깁니다. 배율은 시작과 끝을 모두 곱하므로 길이도 함께 바뀝니다(24fps와 25fps 사이에 유용). 두 지점 보정은 밀림과 속도 차이가 모두 있는 파일에 적합합니다. 음수가 된 시간은 0으로 처리되고 몇 줄이 영향을 받았는지 알려 줍니다. 들어온 형식 그대로 나갑니다. 변환하지 않으며 ASS 스타일과 각 줄의 서식, 태그가 그대로 유지됩니다. 이중 언어 자막은 합쳐도 두 줄을 유지하고 분할할 때는 건너뜁니다.',
    who: '소스를 바꿔 자막이 밀린 사람, 자막이 전반적으로 빠르거나 느린 사람, 다른 프레임레이트로 만든 자막을 받은 사람.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Timeline Shift'
  },
  'de': {
    title: 'Zeitachse der Untertitel - verschieben, skalieren, teilen | AI-SRTSub',
    desc: 'Kostenloses Online-Werkzeug: alles gemeinsam verschieben, mit einem Faktor skalieren oder mit zwei Punkten korrigieren. Für SRT, VTT, ASS, SBV, LRC und TXT.',
    kw: 'Untertitel Zeitachse anpassen,Untertitel verschieben,srt Zeit korrigieren,Untertitel Versatz,Untertitel zu schnell,ass Zeitachse,Untertitel zusammenführen,Untertitel teilen,srt zusammenfügen,lange Untertitel teilen',
    intro: 'Wenn die Untertitel nicht passen: ganze Zeitachse verschieben, mit einem Faktor skalieren oder mit zwei Punkten korrigieren. Es führt auch zerschnittene Zeilen zusammen und teilt zu lange.',
    feat: 'Verschieben bewegt jede Zeile, ohne ihre Anzeigedauer zu ändern. Skalieren multipliziert Anfang und Ende, also ändert sich die Dauer - praktisch zwischen 24 und 25 fps. Die Zwei-Punkt-Korrektur greift bei Versatz und falscher Geschwindigkeit. Negative Zeiten werden auf 0 gesetzt, und es wird angezeigt, wie viele Zeilen betroffen sind. Gleiches Format rein, gleiches Format raus - es wird nichts konvertiert, und ASS-Stile, Zeilenformatierung und Effekt-Tags bleiben unverändert. Zweisprachige Zeilen bleiben beim Zusammenführen zweizeilig und werden beim Teilen übersprungen.',
    who: 'Alle, deren Untertitel nach einem Quellwechsel verrutschen, etwas zu schnell oder zu langsam laufen, oder von jemandem mit anderer Bildrate stammen.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Timeline Shift'
  },
  'fr': {
    title: 'Décalage des sous-titres - déplacer, fusionner ou diviser | AI-SRTSub',
    desc: 'Outil en ligne gratuit : décalez tout d\'un coup, redimensionnez avec un facteur ou corrigez avec deux points. Fonctionne avec SRT, VTT, ASS, SBV, LRC et TXT.',
    kw: 'décaler sous-titres,ajuster temps sous-titres,synchroniser sous-titres,corriger retard sous-titres,srt décalage horaire,sous-titres décalés,fusionner sous-titres,diviser sous-titres,combinaison srt,sous-titre long diviser',
    intro: 'Quand les sous-titres ne sont pas synchronisés, déplacez toute la ligne de temps, redimensionnez avec un facteur ou corrigez avec deux points. Il peut aussi fusionner les lignes morcelées et diviser les trop longues.',
    feat: 'Le décalage déplace chaque ligne sans changer sa durée d\'affichage. La mise à l\'échelle multiplie le début et la fin, la durée change donc aussi - pratique entre 24 et 25 i/s. La correction à deux points traite les fichiers à la fois décalés et à la mauvaise vitesse. Les temps négatifs sont ramenés à zéro, avec le nombre de lignes concernées. Même format en entrée et en sortie : aucune conversion, et les styles ASS, la mise en forme de chaque ligne et les balises restent intactes. Les sous-titres bilingues gardent deux lignes à la fusion et sont ignorés à la division.',
    who: 'Ceux dont les sous-titres dérivent après un changement de source, vont un peu trop vite ou trop lentement, ou viennent de quelqu\'un qui a travaillé à une autre cadence.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Timeline Shift'
  },
  'id': {
    title: "Penyesuaian waktu subtitle - geser, skala, gabung dan pisah",
    desc: 'Alat online gratis: geser semuanya sekaligus, ubah skala dengan faktor, atau koreksi dengan dua titik. Mendukung SRT, VTT, ASS, SBV, LRC, dan TXT.',
    kw: 'sesuaikan waktu subtitle,geser subtitle srt,sinkronkan subtitle,perbaiki subtitle telat,ubah skala subtitle,srt waktu bergeser,gabung subtitle,pisah subtitle,gabung srt,subtitle panjang dipisah',
    intro: 'Saat subtitle tidak sinkron, geser seluruh timeline, ubah skalanya dengan faktor, atau koreksi dengan dua titik. Juga bisa menggabungkan baris yang terpecah dan memisahkan yang terlalu panjang.',
    feat: 'Menggeser memindahkan setiap baris tanpa mengubah durasi tayangnya. Mengubah skala mengalikan awal dan akhir, jadi durasinya ikut berubah - berguna antara 24 dan 25 fps. Koreksi dua titik menangani file yang bergeser sekaligus meleset kecepatannya. Waktu yang menjadi negatif dikembalikan ke 0 dan jumlah baris yang terdampak diberitahukan. Format yang masuk sama dengan yang keluar, tanpa konversi; gaya ASS, format tiap baris, dan tag tetap dipertahankan. Subtitle dwibahasa tetap dua baris saat digabung dan dilewati saat dipisah.',
    who: 'Siapa pun yang subtitle-nya bergeser setelah ganti sumber, terasa lebih cepat atau lambat, atau berasal dari orang yang bekerja di frame rate berbeda.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Timeline Shift'
  },
  'hi': {
    title: "सबटाइटल समय समायोजन - खिसकाएँ, स्केल करें, मिलाएँ और बाँटें",
    desc: "पूरी समय रेखा खिसकाएँ, गुणक से स्केल करें, या दो बिंदुओं से ठीक करें। छोटी पंक्तियाँ मिलाई और लंबी बाँटी जा सकती हैं; SRT, VTT, ASS, SBV, LRC, TXT सब चलते हैं।",
    kw: 'सबटाइटल समय समायोजन,सबटाइटल सिंक,srt समय सुधार,सबटाइटल देरी,सबटाइटल स्केल,ass टाइमलाइन,सबटाइटल मिलाना,सबटाइटल बाँटना,srt मिलाना,लंबी सबटाइटल बाँटें',
    intro: 'जब सबटाइटल मेल न खाएँ, पूरी समय रेखा खिसकाएँ, गुणक से स्केल करें, या दो बिंदुओं से ठीक करें। छोटी-छोटी पंक्तियों को मिलाया और बहुत लंबी पंक्तियों को बाँटा भी जा सकता है।',
    feat: 'खिसकाने से हर पंक्ति की प्रदर्शन अवधि बदले बिना समय बदलता है। स्केलिंग से शुरू और अंत दोनों गुणा होते हैं, इसलिए अवधि भी बदलती है - 24 और 25 fps के बीच काम का। दो-बिंदु सुधार उन फ़ाइलों के लिए है जिनमें खिसकाव और गलत गति दोनों हैं। ऋणात्मक समय 0 कर दिया जाता है और बताया जाता है कि कितनी पंक्तियाँ प्रभावित हुईं। जैसा फ़ॉर्मैट अंदर जाता है, वैसा ही बाहर आता है — कोई रूपांतरण नहीं, और ASS की स्टाइल, हर पंक्ति की फ़ॉर्मैटिंग और टैग ज्यों के त्यों रहते हैं। द्विभाषी सबटाइटल मिलाने पर दो पंक्तियों में रहते हैं और बाँटते समय छोड़ दिए जाते हैं।',
    who: 'जिनके सबटाइटल स्रोत बदलने पर खिसक जाते हैं, थोड़े तेज़ या धीमे चलते हैं, या किसी और फ़्रेम दर पर बने हैं।',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Timeline Shift'
  },
  'th': {
    title: 'ปรับไทม์ไลน์ซับไตเติล - เลื่อน, ปรับสัดส่วน, รวมและแบ่ง | AI-SRTSub',
    desc: "เลื่อนทั้งไทม์ไลน์ ปรับสัดส่วนด้วยอัตรา หรือแก้ด้วยจุดอ้างอิงสองจุด รวมบรรทัดเล็กและแบ่งบรรทัดยาวได้ ใช้ได้กับ SRT, VTT, ASS, SBV, LRC และ TXT",
    kw: 'ปรับเวลาซับไตเติล,เลื่อนซับไตเติล,ซิงค์ซับไตเติล,แก้ซับไตเติลช้า,ปรับสัดส่วนซับไตเติล,srt เวลาเพี้ยน,รวมซับไตเติล,แบ่งซับไตเติล,รวม srt,แบ่งซับไตเติลยาว',
    intro: 'เมื่อซับไตเติลไม่ตรงกับภาพ ให้เลื่อนทั้งไทม์ไลน์ ปรับสัดส่วนด้วยอัตรา หรือแก้ด้วยจุดอ้างอิงสองจุด ยังรวมบรรทัดที่แตกเป็นชิ้นเล็กชิ้นน้อยและแบ่งบรรทัดที่ยาวเกินไปได้',
    feat: 'การเลื่อนจะขยับทุกบรรทัดโดยไม่เปลี่ยนระยะเวลาที่แสดง การปรับสัดส่วนคูณทั้งเวลาเริ่มและจบ จึงเปลี่ยนความยาวด้วย - เหมาะระหว่าง 24 กับ 25 fps การแก้สองจุดจัดการไฟล์ที่ทั้งเพี้ยนและความเร็วไม่ตรง เวลาที่ติดลบจะถูกตั้งเป็น 0 และแจ้งจำนวนบรรทัดที่ได้รับผล ฟอร์แมตที่เข้าและออกเหมือนกัน ไม่มีการแปลงรูปแบบ สไตล์ ASS การจัดรูปแบบของแต่ละบรรทัดและแท็กยังคงเดิม คำบรรยายสองภาษาเมื่อรวมจะอยู่สองบรรทัด และข้ามเมื่อแบ่ง',
    who: 'คนที่ซับไตเติลเพี้ยนหลังเปลี่ยนแหล่งที่มา เร็วหรือช้าไปนิด หรือได้มาจากคนที่ทำงานที่เฟรมเรตต่างกัน',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Timeline Shift'
  },
  'vi': {
    title: 'Chỉnh thời gian phụ đề - dời, đổi tỷ lệ, gộp và tách | AI-SRTSub',
    desc: 'Công cụ online miễn phí: dời tất cả cùng lúc, đổi tỷ lệ theo hệ số, hoặc sửa bằng hai điểm. Hỗ trợ SRT, VTT, ASS, SBV, LRC và TXT.',
    kw: 'chinh thoi gian phu de,dời phụ đề srt,đồng bộ phụ đề,sửa phụ đề trễ,đổi tỷ lệ phụ đề,srt lệch thời gian,gộp phụ đề,tách phụ đề,gộp srt,tách phụ đề dài',
    intro: 'Khi phụ đề không khớp hình, hãy dời toàn bộ trục thời gian, đổi tỷ lệ theo hệ số hoặc sửa bằng hai điểm. Cũng có thể gộp các dòng bị vụn và tách những dòng quá dài.',
    feat: 'Dời chuyển từng dòng mà không đổi thời lượng hiển thị. Đổi tỷ lệ nhân cả thời điểm bắt đầu và kết thúc, nên thời lượng cũng đổi - hữu ích giữa 24 và 25 fps. Sửa hai điểm xử lý tệp vừa lệch vừa sai tốc độ. Thời gian âm được đưa về 0 và công cụ cho biết có bao nhiêu dòng bị ảnh hưởng. Định dạng đầu ra giống đầu vào, không chuyển đổi; style ASS, định dạng từng dòng và thẻ đều giữ nguyên. Phụ đề song ngữ khi gộp vẫn giữ hai dòng và được bỏ qua khi tách.',
    who: 'Người có phụ đề bị lệch sau khi đổi nguồn, chạy nhanh hoặc chậm hơn một chút, hoặc nhận từ người làm ở tốc độ khung hình khác.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Timeline Shift'
  },
  'ru': {
    title: 'Сдвиг времени субтитров - сдвинуть, объединить и разбить | AI-SRTSub',
    desc: 'Бесплатный онлайн-инструмент: сдвиньте всё сразу, измените масштаб коэффициентом или исправьте по двум точкам. Работает с SRT, VTT, ASS, SBV, LRC и TXT.',
    kw: 'сдвиг субтитров,синхронизация субтитров,srt сдвиг времени,субтитры отстают,субтитры спешат,масштаб субтитров,объединить субтитры,разбить субтитры,склеить srt,длинные субтитры разбить',
    intro: 'Когда субтитры не совпадают с видео, сдвиньте всю временную шкалу, измените её коэффициентом или исправьте по двум точкам. А ещё объединяет раздробленные строки и разбивает слишком длинные.',
    feat: 'Сдвиг перемещает каждую строку, не меняя, сколько она остаётся на экране. Масштабирование умножает и начало, и конец, поэтому меняется и длительность - удобно между 24 и 25 кадр/с. Коррекция по двум точкам подходит для файлов с одновременным сдвигом и неверной скоростью. Отрицательное время обнуляется, и показывается, сколько строк затронуто. Формат на выходе тот же, что на входе: преобразования нет, стили ASS, оформление каждой строки и теги сохраняются. Двуязычные строки при объединении остаются в две строки, а при разбиении пропускаются.',
    who: 'Те, у кого субтитры поехали после смены источника, идут чуть быстрее или медленнее, или сделаны при другой частоте кадров.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Timeline Shift'
  },
  'it': {
    title: 'Tempi dei sottotitoli - sposta, riscala, unisci e dividi | AI-SRTSub',
    desc: 'Strumento online gratuito: sposta tutto insieme, riscala con un fattore o correggi con due punti. Funziona con SRT, VTT, ASS, SBV, LRC e TXT.',
    kw: 'regolare tempi sottotitoli,spostare sottotitoli srt,sincronizzare sottotitoli,correggere ritardo sottotitoli,riscalare sottotitoli,srt tempo sfalsato,unire sottotitoli,dividere sottotitoli,unire srt,sottotitolo lungo dividere',
    intro: 'Quando i sottotitoli non sono sincronizzati, sposta tutta la linea temporale, riscala con un fattore o correggi con due punti. Può anche unire le righe spezzate e dividere quelle troppo lunghe.',
    feat: 'Lo spostamento muove ogni riga senza cambiare per quanto resta sullo schermo. Il riscalamento moltiplica inizio e fine, quindi cambia anche la durata: utile tra 24 e 25 fps. La correzione a due punti gestisce i file con sia sfalsamento sia velocità errata. I tempi negativi vengono portati a zero, con l\'indicazione di quante righe sono interessate. Stesso formato in ingresso e in uscita: nessuna conversione, e stili ASS, formattazione di ogni riga e tag restano identici. I sottotitoli bilingue restano su due righe quando uniti e vengono saltati quando divisi.',
    who: 'Chi ha sottotitoli che slittano dopo un cambio di fonte, scorrono un po\' veloci o lenti, o arrivano da chi ha lavorato a un frame rate diverso.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Timeline Shift'
  },
  'ar': {
    title: 'ضبط توقيت الترجمة - إزاحة أو دمج وتقسيم | AI-SRTSub',
    desc: 'أداة مجانية عبر الإنترنت: انقل كل شيء دفعة واحدة، غيّر المقياس بمعامل، أو صحّح بنقطتين. تعمل مع SRT و VTT و ASS و SBV و LRC و TXT.',
    kw: 'ضبط توقيت الترجمة,إزاحة الترجمة,مزامنة الترجمة,تصحيح تأخير الترجمة,تغيير مقياس الترجمة,srt إزاحة الوقت,دمج الترجمة,تقسيم الترجمة,دمج srt,تقسيم الترجمة الطويلة',
    intro: 'عندما لا تتطابق الترجمة مع الصورة، انقل الخط الزمني كله، أو غيّر مقياسه بمعامل، أو صحّحه بنقطتين. كما يمكنه دمج الأسطر المجزأة وتقسيم الأسطر الطويلة جداً.',
    feat: 'الإزاحة تنقل كل سطر دون تغيير مدة ظهوره. تغيير المقياس يضرب البداية والنهاية معاً فتتغير المدة أيضاً - مفيد بين 24 و25 إطاراً في الثانية. التصحيح بنقطتين يتعامل مع الملفات التي فيها إزاحة وسرعة خاطئة معاً. الأوقات السالبة تُصفَّر، ويُذكر عدد الأسطر المتأثرة. الصيغة نفسها في الدخول والخروج، بلا أي تحويل، مع الحفاظ على أنماط ASS وتنسيق كل سطر والوسوم كما هي. التراجم ثنائية اللغة تبقى على سطرين عند الدمج ويتم تخطيها عند التقسيم.',
    who: 'من تزحف ترجمته بعد تغيير المصدر، أو تسير أسرع أو أبطأ قليلاً، أو وصلته ممن عمل بمعدل إطارات مختلف.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Timeline Shift'
  },
  'tr': {
    title: 'Altyazı zaman ayarı - kaydır, ölçekle, birleştir ve böl | AI-SRTSub',
    desc: 'Ücretsiz çevrimiçi araç: hepsini birlikte kaydırın, bir katsayıyla ölçekleyin veya iki noktayla düzeltin. SRT, VTT, ASS, SBV, LRC ve TXT ile çalışır.',
    kw: 'altyazı zaman ayarı,altyazı kaydırma,altyazı senkron,srt zaman düzeltme,altyazı gecikme,altyazı ölçekleme,altyazı birleştirme,altyazı bölme,srt birleştirme,uzun altyazı bölme',
    intro: 'Altyazılar görüntüyle uymadığında tüm zaman çizgisini kaydırın, bir katsayıyla ölçekleyin veya iki noktayla düzeltin. Ayrıca parçalanmış satırları birleştirir, çok uzun olanları böler.',
    feat: 'Kaydırma her satırı ekranda kalma süresini değiştirmeden taşır. Ölçekleme başlangıcı ve bitişi birlikte çarpar, bu yüzden süre de değişir - 24 ile 25 fps arasında kullanışlı. İki noktayla düzeltme, hem kaymış hem de hızı yanlış dosyaları ele alır. Negatif çıkan süreler 0 yapılır ve kaç satırın etkilendiği belirtilir. Giriş ve çıkış biçimi aynıdır, dönüştürme yapılmaz; ASS stilleri, her satırın biçimi ve etiketler olduğu gibi korunur. İki dilli satırlar birleştirilirken iki satır olarak kalır, bölmede atlanır.',
    who: 'Kaynak değişince altyazısı kayan, biraz hızlı ya da yavaş akan, ya da farklı kare hızında çalışan birinden gelen altyazıyı kullananlar.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Timeline Shift'
  },
  'nl': {
    title: 'Ondertiteltijden - verschuiven, samenvoegen en splitsen | AI-SRTSub',
    desc: 'Gratis online tool: verschuif alles tegelijk, schaal met een factor of corrigeer met twee punten. Werkt met SRT, VTT, ASS, SBV, LRC en TXT.',
    kw: 'ondertitels timen,ondertitel verschuiven,srt tijd corrigeren,ondertitels synchroniseren,ondertitels schalen,srt tijdverschil,ondertiteling samenvoegen,ondertiteling splitsen,srt samenvoegen,lange ondertitel splitsen',
    intro: 'Als de ondertitels niet synchroon lopen: verschuif de hele tijdlijn, schaal met een factor of corrigeer met twee punten. Ook kunnen versnipperde regels worden samengevoegd en te lange gesplitst.',
    feat: 'Verschuiven verplaatst elke regel zonder de weergaveduur te wijzigen. Schalen vermenigvuldigt begin en eind, dus de duur verandert mee - handig tussen 24 en 25 fps. De correctie met twee punten is voor bestanden die zowel verschoven zijn als een verkeerde snelheid hebben. Negatieve tijden worden op 0 gezet, met het aantal getroffen regels. Hetzelfde formaat erin en eruit, zonder conversie; ASS-stijlen, de opmaak van elke regel en tags blijven behouden. Tweetalige regels blijven bij samenvoegen twee regels en worden bij splitsen overgeslagen.',
    who: 'Wie ondertitels ziet verschuiven na een andere bron, die iets te snel of te langzaam lopen, of van iemand met een andere framesnelheid komen.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Timeline Shift'
  },
  'pl': {
    title: 'Czas napisów - przesuń, przeskaluj, połącz lub podziel | AI-SRTSub',
    desc: 'Darmowe narzędzie online: przesuń wszystko naraz, przeskaluj współczynnikiem albo popraw dwoma punktami. Działa z SRT, VTT, ASS, SBV, LRC i TXT.',
    kw: 'korekta czasu napisów,przesuwanie napisów,srt czas poprawka,synchronizacja napisów,skalowanie napisów,napisy opóźnione,łączenie napisów,dzielenie napisów,łączenie srt,długie napisy podzielić',
    intro: 'Gdy napisy nie pasują do obrazu, przesuń całą oś czasu, przeskaluj współczynnikiem lub popraw dwoma punktami. Może też łączyć poszatkowane linie i dzielić zbyt długie.',
    feat: 'Przesuwanie przesuwa każdą linię bez zmiany czasu jej wyświetlania. Skalowanie mnoży początek i koniec, więc zmienia się też czas trwania - przydatne między 24 a 25 kl./s. Poprawka dwupunktowa radzi sobie z plikami, które są jednocześnie przesunięte i mają złe tempo. Czasy ujemne są zerowane, z informacją ile linii to dotyczy. Ten sam format na wejściu i wyjściu, bez konwersji; style ASS, formatowanie każdej linii i tagi zostają zachowane. Dwujęzyczne linie po połączeniu zostają dwiema liniami, a przy dzieleniu są pomijane.',
    who: 'Osoby, którym napisy rozjechały się po zmianie źródła, idą nieco za szybko lub za wolno, albo powstały przy innej liczbie klatek.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Timeline Shift'
  },
  'sv': {
    title: 'Undertextens tidslinje - flytta, skala, slå ihop och dela | AI-SRTSub',
    desc: 'Gratis onlineverktyg: flytta allt på en gång, skala med en faktor eller korrigera med två punkter. Fungerar med SRT, VTT, ASS, SBV, LRC och TXT.',
    kw: 'justera undertextens tid,flytta undertext,srt tidsjustering,synkronisera undertext,skala undertext,undertext fördröjning,slå ihop undertexter,dela undertexter,slå ihop srt,lång undertext dela',
    intro: 'När undertexten inte stämmer med bilden: flytta hela tidslinjen, skala med en faktor eller korrigera med två punkter. Den kan också slå ihop sönderdelade rader och dela för långa.',
    feat: 'Att flytta ändrar varje rad utan att ändra hur länge den visas. Skalning multiplicerar både start och slut, så längden ändras också - praktiskt mellan 24 och 25 fps. Tvåpunktskorrigeringen hanterar filer som både är förskjutna och har fel hastighet. Negativa tider sätts till 0 och det framgår hur många rader som påverkades. Samma format in och ut, ingen konvertering; ASS-stilar, varje rads formatering och taggar bevaras. Tvåspråkiga rader förblir två rader vid sammanslagning och hoppas över vid delning.',
    who: 'Den som får undertexten ur fas efter ett källbyte, där den går lite för fort eller för långsamt, eller som kommer från någon med en annan bildfrekvens.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Timeline Shift'
  },
  'cs': {
    title: 'Časová osa titulků - posunout, škálovat, spojit a rozdělit | AI-SRTSub',
    desc: 'Zdarma online nástroj: posuňte vše najednou, přeškálujte koeficientem nebo opravte dvěma body. Funguje se SRT, VTT, ASS, SBV, LRC a TXT.',
    kw: 'úprava času titulků,posunout titulky,srt oprava času,synchronizace titulků,škálování titulků,titulky zpoždění,spojování titulků,dělení titulků,spojení srt,dlouhé titulky rozdělit',
    intro: 'Když titulky nesedí s obrazem, posuňte celou časovou osu, přeškálujte koeficientem nebo opravte dvěma body. Umí také spojit rozdělené řádky a rozdělit příliš dlouhé.',
    feat: 'Posun přesune každý řádek, aniž by změnil dobu jeho zobrazení. Škálování násobí začátek i konec, takže se změní i délka - hodí se mezi 24 a 25 fps. Oprava dvěma body zvládne soubory, které jsou zároveň posunuté a běží jinou rychlostí. Záporné časy se nastaví na 0 a nástroj oznámí, kolika řádků se to týká. Stejný formát na vstupu i výstupu, bez převodu; styly ASS, formátování každého řádku a značky zůstanou zachovány. Dvojjazyčné řádky zůstanou při spojení dva a při dělení se přeskočí.',
    who: 'Komu se titulky rozjedou po změně zdroje, běží o něco rychleji nebo pomaleji, nebo pocházejí od někoho s jinou snímkovou frekvencí.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Timeline Shift'
  },
  'uk': {
    title: 'Зсув часу субтитрів - зсунути, об’єднати і розбити | AI-SRTSub',
    desc: 'Безкоштовний онлайн-інструмент: зсуньте все разом, масштабуйте коефіцієнтом або виправте за двома точками. Працює з SRT, VTT, ASS, SBV, LRC і TXT.',
    kw: 'зсув субтитрів,синхронізація субтитрів,srt зсув часу,субтитри відстають,субтитри поспішають,масштаб субтитрів,об\'єднати субтитри,розбити субтитри,склеїти srt,довгі субтитри розбити',
    intro: 'Коли субтитри не збігаються з відео, зсуньте всю часову шкалу, масштабуйте коефіцієнтом або виправте за двома точками. А ще об\'єднує роздрібнені рядки та розбиває занадто довгі.',
    feat: 'Зсув переміщує кожен рядок, не змінюючи тривалість його показу. Масштабування множить і початок, і кінець, тому змінюється й тривалість - зручно між 24 і 25 кадр/с. Виправлення за двома точками підходить для файлів з одночасним зсувом і неправильною швидкістю. Від\'ємний час обнуляється й показується, скільки рядків зачеплено. Формат на виході той самий, що на вході, без перетворення; стилі ASS, форматування кожного рядка і теги зберігаються. Двомовні рядки при об’єднанні лишаються двома рядками, а при розбитті пропускаються.',
    who: 'Тим, у кого субтитри поїхали після зміни джерела, йдуть трохи швидше або повільніше, або зроблені при іншій частоті кадрів.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Timeline Shift'
  },
  'da': {
    title: 'Justering af undertekster - flyt, skaler, flet og del | AI-SRTSub',
    desc: 'Gratis online værktøj: flyt det hele på én gang, skaler med en faktor, eller ret det med to punkter. Virker med SRT, VTT, ASS, SBV, LRC og TXT.',
    kw: 'justere undertekster,flytte undertekster,srt tidsjustering,synkronisere undertekster,skalere undertekster,undertekster forskudt,flet undertekster,del undertekster,flet srt,lang undertekst del',
    intro: 'Når underteksterne ikke passer til billedet: flyt hele tidslinjen, skaler med en faktor, eller ret den med to punkter. Den kan også flette opsplittede linjer og dele for lange.',
    feat: 'Flytning rykker hver linje uden at ændre, hvor længe den vises. Skalering ganger både start og slut, så længden også ændres - nyttigt mellem 24 og 25 fps. Retning med to punkter klarer filer, der både er forskudt og har forkert hastighed. Negative tider sættes til 0, og det oplyses hvor mange linjer der er berørt. Samme format ind og ud, ingen konvertering; ASS-stile, formateringen af hver linje og tags bevares. Tosprogede linjer forbliver to linjer ved sammenfletning og springes over ved deling.',
    who: 'Alle hvis undertekster rykker sig efter et kildeskift, går lidt for hurtigt eller langsomt, eller kommer fra en med en anden billedfrekvens.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Timeline Shift'
  },
  'fi': {
    title: 'Tekstityksen aikajana - siirrä, skaalaa, yhdistä ja jaa | AI-SRTSub',
    desc: 'Ilmainen verkkotyökalu: siirrä kaikki kerralla, skaalaa kertoimella tai korjaa kahdella pisteellä. Toimii SRT-, VTT-, ASS-, SBV-, LRC- ja TXT-tiedostoille.',
    kw: 'tekstityksen ajan säätö,tekstityksen siirto,srt ajan korjaus,tekstityksen synkronointi,tekstityksen skaalaus,tekstitys jäljessä,yhdistä tekstitykset,jaa tekstitykset,yhdistä srt,pitkä tekstitys jaa',
    intro: 'Kun tekstitys ei täsmää kuvaan, siirrä koko aikajanaa, skaalaa kertoimella tai korjaa kahdella pisteellä. Se voi myös yhdistää pirstaleiset rivit ja jakaa liian pitkät.',
    feat: 'Siirtäminen siirtää jokaisen rivin muuttamatta sen näyttöaikaa. Skaalaus kertoo sekä alun että lopun, joten myös kesto muuttuu - kätevä 24 ja 25 fps välillä. Kahden pisteen korjaus hoitaa tiedostot, joissa on sekä siirtymä että väärä nopeus. Negatiiviset ajat asetetaan nollaan ja kerrotaan, kuinka monta riviä muutettiin. Sama muoto sisään ja ulos, ei muunnosta; ASS-tyylit, jokaisen rivin muotoilu ja tagit säilyvät. Kaksikieliset rivit pysyvät kahtena rivinä yhdistettäessä ja ohitetaan jaettaessa.',
    who: 'Kaikille, joiden tekstitys on siirtynyt lähteen vaihtuessa, kulkee hieman liian nopeasti tai hitaasti, tai on peräisin eri kuvataajuudella työskennelleeltä.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Timeline Shift'
  },
  'el': {
    title: 'Υπότιτλοι - μετακίνηση, συγχώνευση και διαχωρισμός | AI-SRTSub',
    desc: 'Δωρεάν εργαλείο στο διαδίκτυο: μετακινήστε τα όλα μαζί, κλιμακώστε με συντελεστή ή διορθώστε με δύο σημεία. Λειτουργεί με SRT, VTT, ASS, SBV, LRC και TXT.',
    kw: 'ρύθμιση χρόνου υποτίτλων,μετακίνηση υποτίτλων,srt διόρθωση χρόνου,συγχρονισμός υποτίτλων,κλιμάκωση υποτίτλων,υπότιτλοι καθυστέρηση,συγχώνευση υποτίτλων,διαχωρισμός υποτίτλων,ένωση srt,μακροσκελής υπότιτλος',
    intro: 'Όταν οι υπότιτλοι δεν ταιριάζουν με την εικόνα, μετακινήστε όλη τη χρονική γραμμή, κλιμακώστε με συντελεστή ή διορθώστε με δύο σημεία. Μπορεί επίσης να ενώνει κομματιασμένες γραμμές και να χωρίζει τις πολύ μεγάλες.',
    feat: 'Η μετακίνηση μεταφέρει κάθε γραμμή χωρίς να αλλάζει πόσο μένει στην οθόνη. Η κλιμάκωση πολλαπλασιάζει αρχή και τέλος, οπότε αλλάζει και η διάρκεια - χρήσιμο μεταξύ 24 και 25 fps. Η διόρθωση με δύο σημεία χειρίζεται αρχεία με μετατόπιση και λάθος ταχύτητα. Οι αρνητικοί χρόνοι μηδενίζονται και εμφανίζεται πόσες γραμμές επηρεάστηκαν. Ίδια μορφή στην είσοδο και στην έξοδο, χωρίς μετατροπή· τα στυλ ASS, η μορφοποίηση κάθε γραμμής και τα tags διατηρούνται. Οι δίγλωσσες γραμμές παραμένουν δύο κατά τη συγχώνευση και παραλείπονται στον διαχωρισμό.',
    who: 'Όσοι βλέπουν τους υπότιτλους να μετατοπίζονται μετά από αλλαγή πηγής, να τρέχουν λίγο γρήγορα ή αργά, ή προέρχονται από άλλον ρυθμό καρέ.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Timeline Shift'
  },
  'he': {
    title: 'ציר הזמן של הכתוביות - הזזה, מיזוג ופיצול | AI-SRTSub',
    desc: 'כלי חינמי ברשת: הזיזו הכול יחד, שנו קנה מידה לפי מקדם, או תקנו בעזרת שתי נקודות. עובד עם SRT, VTT, ASS, SBV, LRC ו־TXT.',
    kw: 'הזזת כתוביות,סנכרון כתוביות,srt תיקון זמן,כתוביות מאחרות,שינוי קנה מידה כתוביות,כתוביות פיגור,מיזוג כתוביות,פיצול כתוביות,מיזוג srt,פיצול כתוביות ארוכות',
    intro: 'כשהכתוביות לא תואמות לתמונה, הזיזו את כל ציר הזמן, שנו קנה מידה לפי מקדם או תקנו בעזרת שתי נקודות. יכול גם לאחד שורות מפוצלות ולפצל שורות ארוכות מדי.',
    feat: 'ההזזה מזיזה כל שורה בלי לשנות את משך ההצגה שלה. שינוי קנה המידה מכפיל גם התחלה וגם סוף, ולכן גם המשך משתנה - שימושי בין 24 ל־25 fps. התיקון בשתי נקודות מטפל בקבצים שיש בהם גם הזזה וגם מהירות שגויה. זמנים שליליים מאופסים ל־0 ומצוין כמה שורות הושפעו. אותו פורמט בכניסה וביציאה, ללא המרה; סגנונות ASS, העיצוב של כל שורה והתגיות נשמרים. שורות דו-לשוניות נשארות שתי שורות במיזוג ומדולגות בפיצול.',
    who: 'מי שהכתוביות שלו זזות אחרי החלפת מקור, רצות מעט מהר או לאט מדי, או שהגיעו ממישהו שעבד בקצב פריימים אחר.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Timeline Shift'
  },
  'ro': {
    title: 'Timpul subtitrărilor - mută, scalează, îmbină și împărți | AI-SRTSub',
    desc: 'Instrument online gratuit: mută totul deodată, scalează cu un factor sau corectează cu două puncte. Funcționează cu SRT, VTT, ASS, SBV, LRC și TXT.',
    kw: 'reglaj timp subtitrări,mutare subtitrări,srt corecție timp,sincronizare subtitrări,scalare subtitrări,subtitrări decalate,îmbinare subtitrări,împărțire subtitrări,îmbinare srt,subtitrare lungă împărți',
    intro: 'Când subtitrările nu se potrivesc cu imaginea, mută toată linia de timp, scalează cu un factor sau corectează cu două puncte. Poate de asemenea îmbina rândurile fragmentate și împărți cele prea lungi.',
    feat: 'Mutarea deplasează fiecare linie fără să schimbe cât timp rămâne pe ecran. Scalarea înmulțește și începutul, și sfârșitul, deci se schimbă și durata - util între 24 și 25 fps. Corecția cu două puncte rezolvă fișierele care sunt și decalate, și cu viteză greșită. Timpii negativi sunt aduși la 0 și se arată câte linii au fost afectate. Același format la intrare și ieșire, fără conversie; stilurile ASS, formatarea fiecărui rând și tagurile sunt păstrate. Rândurile bilingve rămân două la îmbinare și sunt omise la împărțire.',
    who: 'Cei cărora li se decalează subtitrările după o schimbare de sursă, merg puțin prea repede sau prea încet, sau vin de la cineva care a lucrat la altă rată de cadre.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Timeline Shift'
  }
};
/* v0.9.296：第八个页面 —— 字幕乱码修复（/repair.html）
   与前面几个工具页同理：纯前端、不烧 API 调用费，是优先抢的搜索词。 */
const SEO_REPAIR = {
  'zh-CN': {
    title: '字幕乱码修复 - 锟斤拷 / 浣犲ソ 一键还原 | 随心字幕 AI',
    desc: '免费在线修复字幕乱码：认出它原本是 UTF-8、GBK、Big5、Shift_JIS 还是 EUC-KR，把读错的字换回去，还能另存成播放器认得出的编码。',
    kw: '字幕乱码修复,srt乱码,字幕乱码怎么办,锟斤拷,utf8转gbk字幕,字幕编码转换,字幕编码识别,ass乱码,vtt乱码,播放器字幕乱码,subtitle mojibake,fix subtitle encoding',
    intro: '字幕打开是一堆看不懂的字，多半是编码读错了。把文件丢进来，认出它原本用什么编码写的，把读错的字换回去。',
    feat: '传文件时按原始字节重新试各种编码，一个字节都不损失 —— 认出是 GBK 就直接告诉你，播放器读错的话另存一份「带 BOM 的 UTF-8」通常就好了。粘贴进来的文本已经不是原始字节了，能修的范围小得多；里面要是已经出现替换字符（方框问号），那就谁也修不回来，会直说而不是假装修好。序号、时间轴一个字都不动，ASS 的样式标记也原样保留。',
    who: '下载的字幕打开是一堆怪字、播放器里中文全是方块、或者从别人手里拿到一份编码不明的字幕文件的人。',
    siteName: '随心字幕 AI', jsonldName: '随心字幕 AI', jsonldAlt: 'Subtitle Mojibake Repair'
  },
  'zh-TW': {
    title: '字幕亂碼修復 - 錕斤拷 / 浣犲ソ 一鍵還原 | 隨心字幕 AI',
    desc: '免費線上修復字幕亂碼：認出它原本是 UTF-8、GBK、Big5、Shift_JIS 還是 EUC-KR，把讀錯的字換回去，還能另存成播放器認得出的編碼。',
    kw: '字幕亂碼修復,srt亂碼,字幕亂碼怎麼辦,錕斤拷,utf8轉gbk字幕,字幕編碼轉換,字幕編碼識別,ass亂碼,vtt亂碼,播放器字幕亂碼,subtitle mojibake,fix subtitle encoding',
    intro: '字幕打開是一堆看不懂的字，多半是編碼讀錯了。把檔案丟進來，認出它原本用什麼編碼寫的，把讀錯的字換回去。',
    feat: '傳檔案時按原始位元組重新試各種編碼，一個位元組都不損失 —— 認出是 GBK 就直接告訴你，播放器讀錯的話另存一份「帶 BOM 的 UTF-8」通常就好了。貼進來的文字已經不是原始位元組了，能修的範圍小得多；裡面要是已經出現替換字元（方框問號），那就誰也修不回來，會直說而不是假裝修好。序號、時間軸一個字都不動，ASS 的樣式標記也原樣保留。',
    who: '下載的字幕打開是一堆怪字、播放器裡中文全是方塊、或者從別人手裡拿到一份編碼不明的字幕檔案的人。',
    siteName: '隨心字幕 AI', jsonldName: '隨心字幕 AI', jsonldAlt: 'Subtitle Mojibake Repair'
  },
  'en': {
    title: 'Fix Garbled Subtitles - Repair Mojibake / Wrong Encoding | AI-SRTSub',
    desc: "Free online repair for garbled subtitles: detects if the file is UTF-8, GBK, Big5, Shift_JIS or EUC-KR, restores misread text, re-saves for your player.",
    kw: 'fix garbled subtitles,subtitle mojibake,srt encoding fix,fix subtitle encoding,utf8 to gbk subtitle,srt shows weird characters,subtitle wrong encoding,ass garbled,vtt garbled,detect subtitle encoding',
    intro: 'Subtitles that open as a wall of nonsense are almost always read with the wrong encoding. Drop the file in, and it works out which encoding the file was really written in and puts the misread characters back.',
    feat: 'Uploaded files are re-decoded from the original bytes, so nothing is lost: if the file turns out to be GBK, it says so, and if your player is the one misreading it, saving a copy as "UTF-8 with BOM" usually settles it. Pasted text is no longer the original bytes, so much less can be recovered; if it already contains replacement characters, that is unrecoverable and the tool says so plainly instead of pretending otherwise. Line numbers and timecodes are never touched, and ASS style tags are left exactly as they were.',
    who: 'Anyone who downloaded subtitles that open as gibberish, sees boxes instead of Chinese in the player, or was handed a file with an unknown encoding.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Mojibake Repair'
  },
  'ja': {
    title: '字幕の文字化け修復 - 豆腐 / 浣犲ソ を元に戻す | AI-SRTSub',
    desc: '無料のオンライン文字化け修復：ファイルが本当は UTF-8 / GBK / Big5 / Shift_JIS / EUC-KR のどれで書かれていたかを判別し、読み間違えられた文字を元に戻します。プレイヤーが読めるエンコードで保存し直すこともできます。',
    kw: '字幕 文字化け 直す,srt 文字化け,字幕 文字化け 修正,utf8 gbk 変換 字幕,字幕 エンコード 変換,字幕 エンコード 判定,ass 文字化け,vtt 文字化け,プレイヤー 字幕 文字化け,subtitle mojibake',
    intro: '字幕を開いたときに意味不明な文字の羅列になるのは、ほぼエンコードの読み間違いです。ファイルを放り込めば、本来どのエンコードで書かれていたかを判別し、読み間違えられた文字を元に戻します。',
    feat: 'アップロードされたファイルは元のバイト列から各エンコードで再デコードされるため、情報は一切失われません。GBK だと判明すればそのように表示し、プレイヤー側が読み間違えている場合は「BOM 付き UTF-8」で保存し直せば大抵解決します。貼り付けられたテキストは元のバイト列ではないため復元できる範囲が狭く、すでに置換文字（豆腐）が含まれている場合は修復不能とはっきり伝えます。行番号とタイムコードには一切触れず、ASS のスタイル指定もそのまま残します。',
    who: 'ダウンロードした字幕が開くと意味不明な文字になる人、プレイヤーで中国語が四角になってしまう人、エンコード不明の字幕ファイルを渡された人。',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Mojibake Repair'
  },
  'es': {
    title: "Reparar subtítulos ilegibles - codificación errónea",
    desc: "Reparación online gratuita de subtítulos ilegibles: detecta si el archivo era UTF-8, GBK, Big5, Shift_JIS o EUC-KR, devuelve el texto a su forma correcta.",
    kw: 'reparar subtítulos codificación,subtítulos caracteres extraños,srt caracteres raros,corregir codificación subtítulos,utf8 a gbk subtítulos,subtítulos ilegibles,detectar codificación subtítulos,ass caracteres raros,vtt caracteres raros',
    intro: 'Cuando los subtítulos se abren como un muro de caracteres sin sentido, casi siempre se han leído con la codificación equivocada. Suelta el archivo: averigua con qué codificación se escribió y devuelve los caracteres mal leídos a su sitio.',
    feat: 'Los archivos se vuelven a decodificar desde los bytes originales, así que no se pierde nada: si resulta ser GBK lo indica, y si el que se equivoca es tu reproductor, guardar una copia como «UTF-8 con BOM» suele bastar. El texto pegado ya no son los bytes originales, así que se recupera mucho menos; si ya contiene caracteres de reemplazo, es imposible recuperarlo y la herramienta lo dice sin rodeos en lugar de aparentar lo contrario. Los números de línea y los códigos de tiempo no se tocan, y las etiquetas de estilo del ASS se dejan tal cual.',
    who: 'Quien descarga subtítulos que se abren como jerigonza, ve cuadros en lugar de caracteres chinos en el reproductor, o recibe un archivo de codificación desconocida.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Reparación de codificación de subtítulos'
  },
  'pt': {
    title: "Corrigir legendas ilegíveis - codificação errada",
    desc: "Reparo online gratuito de legendas ilegíveis: detecta se o arquivo era UTF-8, GBK, Big5, Shift_JIS ou EUC-KR, devolve o texto à forma correta.",
    kw: 'corrigir legenda caracteres estranhos,legenda codificação errada,srt caracteres estranhos,converter utf8 para gbk legenda,legenda ilegível,detectar codificação legenda,ass caracteres estranhos,vtt caracteres estranhos',
    intro: 'Legendas que abrem como um muro de caracteres sem sentido quase sempre foram lidas com a codificação errada. Solte o arquivo: ele descobre em qual codificação foi escrito e devolve os caracteres mal lidos ao lugar.',
    feat: 'Os arquivos são decodificados novamente a partir dos bytes originais, então nada se perde: se for GBK, ele informa, e se o erro for do seu player, salvar uma cópia como "UTF-8 com BOM" costuma resolver. O texto colado já não são os bytes originais, então muito menos pode ser recuperado; se já contiver caracteres de substituição, não há como recuperar e a ferramenta diz isso claramente em vez de fingir o contrário. Números de linha e códigos de tempo não são tocados, e as tags de estilo do ASS ficam exatamente como estavam.',
    who: 'Quem baixa legendas que abrem como um monte de caracteres estranhos, vê quadrados no lugar de caracteres chineses no player, ou recebeu um arquivo de codificação desconhecida.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Correção de codificação de legendas'
  },
  'ko': {
    title: '자막 깨짐 복구 - 인코딩 오류 / 문자 깨짐 되돌리기 | AI-SRTSub',
    desc: '무료 온라인 자막 깨짐 복구: 파일이 원래 UTF-8 / GBK / Big5 / Shift_JIS / EUC-KR 중 무엇이었는지 판별해 잘못 읽힌 글자를 되돌리고, 플레이어가 읽을 수 있는 인코딩으로 다시 저장할 수 있습니다.',
    kw: '자막 깨짐,자막 인코딩,srt 깨짐,자막 문자 깨짐 해결,utf8 gbk 자막 변환,자막 인코딩 변환,자막 인코딩 확인,ass 깨짐,vtt 깨짐,플레이어 자막 깨짐',
    intro: '자막을 열었을 때 알 수 없는 글자만 잔뜩 나온다면 대개 인코딩을 잘못 읽은 것입니다. 파일을 넣으면 원래 어떤 인코딩으로 쓰였는지 판별해 잘못 읽힌 글자를 되돌립니다.',
    feat: '업로드한 파일은 원래 바이트에서 각 인코딩으로 다시 디코딩하므로 손실이 없습니다. GBK로 판명되면 그대로 알려주고, 플레이어가 잘못 읽는 것이라면 \'BOM 있는 UTF-8\'로 다시 저장하면 대개 해결됩니다. 붙여넣은 텍스트는 이미 원래 바이트가 아니므로 복구 범위가 훨씬 좁고, 이미 대체 문자가 들어 있다면 복구가 불가능하다고 숨기지 않고 분명히 알려줍니다. 줄 번호와 타임코드는 전혀 건드리지 않고 ASS 스타일 태그도 그대로 둡니다.',
    who: '다운로드한 자막이 열면 이상한 글자로만 보이는 사람, 플레이어에서 중국어가 네모로 나오는 사람, 인코딩을 알 수 없는 자막 파일을 받은 사람.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Mojibake Repair'
  },
  'de': {
    title: 'Untertitel mit Zeichensalat reparieren - Falsche Kodierung | AI-SRTSub',
    desc: "Kostenlose Online-Reparatur für unlesbare Untertitel: erkennt, ob die Datei UTF-8, GBK, Big5, Shift_JIS oder EUC-KR war, macht falsch gelesene Zeichen lesbar.",
    kw: 'untertitel zeichensalat reparieren,srt kodierung korrigieren,untertitel falsche kodierung,utf8 nach gbk untertitel,untertitel unlesbar,kodierung untertitel erkennen,ass zeichensalat,vtt zeichensalat',
    intro: 'Wenn Untertitel als Wand aus sinnlosen Zeichen aufgehen, wurden sie fast immer mit der falschen Kodierung gelesen. Datei hineinwerfen: Sie findet heraus, in welcher Kodierung sie wirklich geschrieben wurden, und setzt die falsch gelesenen Zeichen zurück.',
    feat: 'Dateien werden aus den ursprünglichen Bytes neu dekodiert, es geht also nichts verloren: Ist es GBK, wird das angezeigt, und wenn dein Player sich irrt, hilft meist eine Kopie als „UTF-8 mit BOM“. Eingefügter Text sind nicht mehr die ursprünglichen Bytes, deshalb lässt sich viel weniger retten; enthält er bereits Ersatzzeichen, ist nichts mehr zu holen, und das Werkzeug sagt das klar statt es zu vertuschen. Zeilennummern und Zeitcodes bleiben unangetastet, ASS-Formatierungen werden exakt so belassen.',
    who: 'Wer Untertitel herunterlädt und nur Buchstabensalat sieht, im Player Kästchen statt chinesischer Zeichen bekommt oder eine Datei mit unbekannter Kodierung erhalten hat.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Untertitel-Kodierung reparieren'
  },
  'fr': {
    title: 'Réparer les sous-titres illisibles - Mauvais encodage | AI-SRTSub',
    desc: "Réparation en ligne gratuite des sous-titres illisibles : détecte si le fichier était en UTF-8, GBK, Big5, Shift_JIS ou EUC-KR, remet les caractères en forme.",
    kw: 'réparer sous-titres illisibles,sous-titres caractères bizarres,corriger encodage sous-titres,srt caractères étranges,utf8 vers gbk sous-titres,détecter encodage sous-titres,ass caractères bizarres,vtt caractères bizarres',
    intro: 'Des sous-titres qui s\'ouvrent comme un mur de caractères incompréhensibles ont presque toujours été lus avec le mauvais encodage. Déposez le fichier : il détermine l\'encodage réel et remet les caractères mal lus à leur place.',
    feat: 'Les fichiers sont redécodés à partir des octets d\'origine, donc rien n\'est perdu : si c\'est du GBK, il l\'indique, et si c\'est votre lecteur qui se trompe, enregistrer une copie en « UTF-8 avec BOM » suffit généralement. Le texte collé n\'est plus les octets d\'origine, on peut donc récupérer beaucoup moins ; s\'il contient déjà des caractères de remplacement, c\'est irrécupérable et l\'outil le dit clairement au lieu de faire semblant. Les numéros de ligne et les codes de temps ne sont jamais touchés, et les balises de style ASS restent exactement telles quelles.',
    who: 'Ceux qui téléchargent des sous-titres qui s\'ouvrent en charabia, voient des carrés à la place des caractères chinois dans le lecteur, ou reçoivent un fichier dont l\'encodage est inconnu.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Réparation d\'encodage des sous-titres'
  },
  'id': {
    title: 'Perbaiki Subtitle Rusak - Karakter Aneh / Salah Encoding | AI-SRTSub',
    desc: "Perbaikan online gratis untuk subtitle yang rusak: mendeteksi apakah berkas UTF-8, GBK, Big5, Shift_JIS atau EUC-KR, mengembalikan teks yang salah dibaca.",
    kw: 'perbaiki subtitle rusak,subtitle karakter aneh,srt karakter aneh,perbaiki encoding subtitle,utf8 ke gbk subtitle,subtitle tidak terbaca,deteksi encoding subtitle,ass karakter aneh,vtt karakter aneh',
    intro: 'Subtitle yang terbuka sebagai tumpukan karakter tak bermakna hampir selalu dibaca dengan encoding yang salah. Masukkan berkasnya, dan akan diketahui encoding aslinya lalu karakter yang salah dibaca dikembalikan.',
    feat: 'Berkas didekode ulang dari byte aslinya, jadi tidak ada yang hilang: jika ternyata GBK, akan diberitahu, dan jika pemutar Anda yang salah membaca, menyimpan salinan sebagai "UTF-8 dengan BOM" biasanya sudah cukup. Teks yang ditempel bukan lagi byte asli, jadi yang bisa dipulihkan jauh lebih sedikit; jika sudah berisi karakter pengganti, itu tidak bisa dipulihkan dan alat ini mengatakannya terus terang. Nomor baris dan kode waktu tidak disentuh, dan tag gaya ASS dibiarkan persis seperti semula.',
    who: 'Siapa pun yang mengunduh subtitle dan yang muncul hanya karakter aneh, melihat kotak-kotak di pemutar, atau menerima berkas dengan encoding yang tidak diketahui.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Perbaikan encoding subtitle'
  },
  'hi': {
    title: 'खराब सबटाइटल ठीक करें - गलत एन्कोडिंग / अजीब अक्षर | AI-SRTSub',
    desc: "गड़बड़ सबटाइटल की मुफ़्त मरम्मत: पता लगाता है कि फ़ाइल UTF-8, GBK, Big5, Shift_JIS या EUC-KR में थी और गलत पढ़े अक्षर वापस लाता है।",
    kw: 'सबटाइटल गड़बड़ ठीक,srt अजीब अक्षर,सबटाइटल एन्कोडिंग ठीक,utf8 से gbk सबटाइटल,सबटाइटल पढ़ा नहीं जा रहा,एन्कोडिंग पहचानें सबटाइटल,ass गड़बड़,vtt गड़बड़',
    intro: 'सबटाइटल खुलते ही अगर बेतुके अक्षरों की दीवार दिखे, तो लगभग हमेशा गलत एन्कोडिंग से पढ़ी गई होती हैं। फ़ाइल डालें: यह पता लगाता है कि वे वाकई किस एन्कोडिंग में लिखी थीं और गलत पढ़े गए अक्षर वापस ला देता है।',
    feat: 'फ़ाइलें मूल बाइट्स से दोबारा डिकोड की जाती हैं, इसलिए कुछ भी नहीं खोता: अगर वह GBK है तो बताया जाता है, और अगर गलती आपके प्लेयर की है, तो "BOM वाले UTF-8" के रूप में एक कॉपी सहेजना आम तौर पर काफी होता है। चिपकाया गया टेक्स्ट अब मूल बाइट्स नहीं रहता, इसलिए बहुत कम बचाया जा सकता है; अगर उसमें पहले से रिप्लेसमेंट कैरेक्टर हैं, तो वह वापस नहीं लाया जा सकता और यह उपकरण साफ़-साफ़ कहता है, दिखावा नहीं करता। पंक्ति संख्या और समय कोड छुए नहीं जाते, और ASS स्टाइल टैग ज्यों के त्यों रहते हैं।',
    who: 'जिन्होंने सबटाइटल डाउनलोड कीं और खुलते ही अजीब अक्षर दिखे, प्लेयर में चीनी के स्थान पर बक्से दिखें, या अज्ञात एन्कोडिंग वाली फ़ाइल मिली।',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Mojibake Repair'
  },
  'th': {
    title: 'ซ่อมซับไตเติลที่เป็นตัวอักษรแปลก ๆ - รหัสตัวอักษรผิด | AI-SRTSub',
    desc: "ซ่อมซับไตเติลที่อ่านไม่ได้ฟรีออนไลน์: ตรวจว่าไฟล์เป็น UTF-8, GBK, Big5, Shift_JIS หรือ EUC-KR เปลี่ยนตัวอักษรที่อ่านผิดกลับเป็นข้อความที่อ่านได้",
    kw: 'ซ่อมซับไตเติลตัวอักษรแปลก,srt ตัวอักษรแปลก,ซับไตเติลอ่านไม่ได้,แก้รหัสตัวอักษรซับไตเติล,แปลง utf8 เป็น gbk ซับไตเติล,ตรวจสอบรหัสตัวอักษรซับไตเติล,ass ตัวอักษรแปลก,vtt ตัวอักษรแปลก',
    intro: 'ซับไตเติลที่เปิดมาแล้วเจอแต่ตัวอักษรที่อ่านไม่ออกเรียงกัน แทบทุกครั้งมาจากการอ่านรหัสตัวอักษรผิด ใส่ไฟล์เข้ามา ระบบจะดูว่าเขียนด้วยรหัสใด แล้วเปลี่ยนตัวอักษรที่อ่านผิดกลับมา',
    feat: 'ไฟล์จะถูกถอดรหัสใหม่จากไบต์ต้นฉบับ จึงไม่มีอะไรหายไป: ถ้าเป็น GBK ก็จะบอกให้ และถ้าเครื่องเล่นของคุณต่างหากที่อ่านผิด การบันทึกสำเนาเป็น "UTF-8 แบบมี BOM" มักจะเพียงพอ ข้อความที่วางมาไม่ใช่ไบต์ต้นฉบับอีกต่อไป จึงกู้คืนได้น้อยกว่ามาก และถ้ามีตัวอักษรแทนที่อยู่แล้ว ก็กู้คืนไม่ได้และเครื่องมือจะบอกตรง ๆ ไม่ใช่แกล้งทำเป็นว่าแก้ได้ หมายเลขบรรทัดและรหัสเวลาจะไม่ถูกแตะต้อง และแท็กสไตล์ของ ASS ก็คงไว้ตามเดิมทุกประการ',
    who: 'คนที่ดาวน์โหลดซับไตเติลมาเปิดแล้วเจอแต่ตัวอักษรแปลก ๆ เห็นสี่เหลี่ยมแทนตัวอักษรจีนในเครื่องเล่น หรือได้รับไฟล์ที่ไม่ทราบรหัสตัวอักษร',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Mojibake Repair'
  },
  'vi': {
    title: 'Sửa phụ đề bị lỗi font - Sai bảng mã / Ký tự lạ | AI-SRTSub',
    desc: "Sửa phụ đề không đọc được miễn phí: nhận ra tệp là UTF-8, GBK, Big5, Shift_JIS hay EUC-KR, trả chữ bị đọc sai về dạng đúng và lưu lại cho trình phát của bạn.",
    kw: 'sửa phụ đề lỗi font,phụ đề ký tự lạ,srt ký tự lạ,sửa bảng mã phụ đề,chuyển utf8 sang gbk phụ đề,phụ đề không đọc được,nhận diện bảng mã phụ đề,ass lỗi font,vtt lỗi font',
    intro: 'Phụ đề mở ra chỉ thấy một bức tường ký tự vô nghĩa hầu như luôn là bị đọc sai bảng mã. Đưa tệp vào, nó sẽ biết tệp được viết bằng bảng mã nào và trả những chữ bị đọc sai về chỗ cũ.',
    feat: 'Tệp được giải mã lại từ byte gốc nên không mất gì: nếu là GBK thì nói rõ, và nếu chính trình phát của bạn đọc sai thì lưu một bản dưới dạng "UTF-8 có BOM" thường là đủ. Chữ dán vào không còn là byte gốc nên cứu được ít hơn nhiều; nếu đã có ký tự thay thế thì không thể cứu và công cụ nói thẳng chứ không giả vờ sửa được. Số thứ tự và mã thời gian không bị đụng tới, thẻ định dạng ASS cũng giữ nguyên.',
    who: 'Người tải phụ đề về mở ra chỉ thấy ký tự lạ, thấy toàn ô vuông thay vì chữ Hán trong trình phát, hoặc nhận được tệp không rõ bảng mã.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Mojibake Repair'
  },
  'ru': {
    title: 'Исправить кракозябры в субтитрах - Неверная кодировка | AI-SRTSub',
    desc: "Бесплатное онлайн-исправление нечитаемых субтитров: определяет, был ли файл в UTF-8, GBK, Big5, Shift_JIS или EUC-KR, возвращает неверно прочитанные символы.",
    kw: 'исправить кракозябры в субтитрах,субтитры неверная кодировка,srt кракозябры,исправить кодировку субтитров,utf8 в gbk субтитры,субтитры не читаются,определить кодировку субтитров,ass кракозябры,vtt кракозябры',
    intro: 'Если субтитры открываются как стена бессмысленных символов, почти всегда их прочитали в неправильной кодировке. Загрузите файл: он определит настоящую кодировку и вернёт символы на место.',
    feat: 'Файлы перекодируются из исходных байтов, поэтому ничего не теряется: если это GBK, об этом сообщается, а если ошибается ваш проигрыватель, обычно достаточно сохранить копию как «UTF-8 с BOM». Вставленный текст уже не является исходными байтами, поэтому возвращается гораздо меньше; если в нём уже есть символы-заменители, восстановление невозможно, и инструмент говорит об этом прямо, а не делает вид, что всё исправлено. Номера строк и таймкоды не затрагиваются, теги оформления ASS остаются без изменений.',
    who: 'Тем, кто скачал субтитры, которые открываются как набор странных символов, видит квадратики вместо иероглифов в проигрывателе или получил файл с неизвестной кодировкой.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Исправление кодировки субтитров'
  },
  'it': {
    title: 'Ripara sottotitoli illeggibili - Codifica errata | AI-SRTSub',
    desc: "Riparazione online gratuita dei sottotitoli illeggibili: rileva se il file era in UTF-8, GBK, Big5, Shift_JIS o EUC-KR, riporta i caratteri a posto.",
    kw: 'riparare sottotitoli illeggibili,sottotitoli caratteri strani,srt caratteri strani,correggere codifica sottotitoli,utf8 in gbk sottotitoli,sottotitoli non leggibili,rilevare codifica sottotitoli,ass caratteri strani,vtt caratteri strani',
    intro: 'Sottotitoli che si aprono come un muro di caratteri senza senso sono stati quasi sempre letti con la codifica sbagliata. Inserisci il file: scopre con quale codifica era stato scritto e rimette a posto i caratteri letti male.',
    feat: 'I file vengono decodificati di nuovo dai byte originali, quindi non si perde nulla: se è GBK lo dice, e se è il tuo lettore a sbagliare, di solito basta salvare una copia come "UTF-8 con BOM". Il testo incollato non è più costituito dai byte originali, quindi si recupera molto meno; se contiene già caratteri di sostituzione, non c\'è nulla da fare e lo strumento lo dice apertamente invece di fingere il contrario. I numeri di riga e i codici di tempo non vengono toccati, e i tag di stile ASS restano esattamente com\'erano.',
    who: 'Chi scarica sottotitoli che si aprono come un guazzabuglio, vede quadratini al posto dei caratteri cinesi nel lettore, o ha ricevuto un file con codifica sconosciuta.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Riparazione codifica sottotitoli'
  },
  'ar': {
    title: 'إصلاح الترجمات ذات الحروف الغريبة - ترميز خاطئ | AI-SRTSub',
    desc: "إصلاح مجاني للترجمات غير المقروءة: يكتشف إن كان الملف UTF-8 أم GBK أم Big5 أم Shift_JIS أم EUC-KR، يعيد الحروف المقروءة خطأً ويحفظ بترميز يفهمه مشغّلك.",
    kw: 'إصلاح ترجمة حروف غريبة,ترجمة حروف غريبة,srt حروف غريبة,تصحيح ترميز الترجمة,تحويل utf8 إلى gbk ترجمة,ترجمة غير مقروءة,اكتشاف ترميز الترجمة,ass حروف غريبة,vtt حروف غريبة',
    intro: 'الترجمات التي تُفتح كجدار من الحروف غير المفهومة قُرئت في الغالب بترميز خاطئ. ضع الملف، وسيعرف الترميز الأصلي ويعيد الحروف التي قُرئت خطأً إلى مكانها.',
    feat: 'تُفكّ شفرة الملفات من البايتات الأصلية، فلا يضيع شيء: إن كانت GBK فسيُخبرك، وإن كان مشغّلك هو من يخطئ فعادةً يكفي حفظ نسخة باسم «UTF-8 مع BOM». النص الملصوق ليس البايتات الأصلية، لذا يمكن استرجاع قدر أقل بكثير؛ وإن كان يحتوي بالفعل على أحرف استبدال فلا سبيل لاسترجاعه، وتقول الأداة ذلك صراحةً بدل التظاهر بغيره. أرقام الأسطر ورموز التوقيت لا تُغيَّر، ووسوم تنسيق ASS تُترك كما هي تماماً.',
    who: 'من نزل ترجمة تُفتح كحروف غريبة، أو يرى مربعات بدل الحروف الصينية في المشغّل، أو وصله ملف بترميز غير معروف.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Mojibake Repair'
  },
  'tr': {
    title: 'Bozuk Altyazıyı Onar - Yanlış Kodlama / Garip Karakterler | AI-SRTSub',
    desc: "Okunamayan altyazılar için ücretsiz çevrimiçi onarım: dosyanın UTF-8, GBK, Big5, Shift_JIS veya EUC-KR olduğunu saptar, yanlış okunan karakterleri düzeltir.",
    kw: 'altyazı bozuk karakterler,altyazı kodlama hatası,srt bozuk karakterler,altyazı kodlamasını düzelt,utf8\'den gbk\'ye altyazı,altyazı okunamıyor,altyazı kodlamasını algıla,ass bozuk,vtt bozuk',
    intro: 'Açıldığında anlamsız karakterlerden oluşan bir duvara dönüşen altyazılar neredeyse her zaman yanlış kodlamayla okunmuştur. Dosyayı verin: hangi kodlamayla yazıldığını bulur ve yanlış okunan karakterleri yerine koyar.',
    feat: 'Dosyalar özgün baytlardan yeniden çözülür, yani hiçbir şey kaybolmaz: GBK çıkarsa bunu söyler, yanlış okuyan sizin oynatıcınızsa "BOM\'lu UTF-8" olarak bir kopya kaydetmek genelde yeterlidir. Yapıştırılan metin artık özgün baytlar değildir, bu yüzden çok daha azı kurtarılabilir; içinde yedek karakterler varsa kurtarılamaz ve araç bunu açıkça söyler, aksini iddia etmez. Satır numaraları ve zaman kodlarına dokunulmaz, ASS biçim etiketleri de tamamen korunur.',
    who: 'İndirdiği altyazı açıldığında sadece garip karakterler gören, oynatıcıda Çince yerine kutucuklar çıkan veya kodlaması bilinmeyen bir dosya alan herkes.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Mojibake Repair'
  },
  'nl': {
    title: "Ondertitels met vreemde tekens herstellen - foute codering",
    desc: "Gratis online herstel voor onleesbare ondertitels: detecteert of het bestand UTF-8, GBK, Big5, Shift_JIS of EUC-KR was, zet verkeerd gelezen tekens terug.",
    kw: 'ondertitels vreemde tekens herstellen,ondertitel codering corrigeren,srt vreemde tekens,utf8 naar gbk ondertitels,ondertitels onleesbaar,ondertitel codering detecteren,ass vreemde tekens,vtt vreemde tekens',
    intro: 'Ondertitels die opengaan als een muur van onbegrijpelijke tekens zijn bijna altijd met de verkeerde codering gelezen. Gooi het bestand erin: hij zoekt uit in welke codering het echt geschreven is en zet de verkeerd gelezen tekens terug.',
    feat: 'Bestanden worden opnieuw gedecodeerd vanaf de oorspronkelijke bytes, dus er gaat niets verloren: is het GBK, dan zegt hij dat, en als jouw speler het mis heeft, is een kopie opslaan als "UTF-8 met BOM" meestal genoeg. Geplakte tekst zijn niet meer de oorspronkelijke bytes, dus er valt veel minder te redden; bevat die al vervangingstekens, dan is er niets meer aan te doen en zegt het gereedschap dat ronduit in plaats van iets anders te doen voorkomen. Regelnummers en tijdscodes blijven onaangeroerd, en ASS-opmaakcodes blijven precies zoals ze waren.',
    who: 'Wie ondertitels downloadt die openen als een brij aan vreemde tekens, vierkantjes ziet in plaats van Chinese tekens in de speler, of een bestand met onbekende codering kreeg.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Ondertitel-codering herstellen'
  },
  'pl': {
    title: 'Napraw napisy z krzakami - Złe kodowanie | AI-SRTSub',
    desc: "Darmowa naprawa nieczytelnych napisów online: wykrywa, czy plik był w UTF-8, GBK, Big5, Shift_JIS czy EUC-KR, przywraca źle odczytane znaki.",
    kw: 'napraw napisy krzaki,napisy dziwne znaki,srt krzaki,napraw kodowanie napisów,utf8 na gbk napisy,napisy nieczytelne,wykryj kodowanie napisów,ass krzaki,vtt krzaki',
    intro: 'Napisy, które po otwarciu wyglądają jak ściana bezsensownych znaków, prawie zawsze zostały odczytane w złym kodowaniu. Wrzuć plik: narzędzie ustali właściwe kodowanie i przywróci źle odczytane znaki.',
    feat: 'Pliki są dekodowane ponownie z oryginalnych bajtów, więc nic nie ginie: jeśli to GBK, zostanie to powiedziane, a jeśli to twój odtwarzacz się myli, zwykle wystarczy zapisać kopię jako „UTF-8 z BOM”. Wklejony tekst nie jest już oryginalnymi bajtami, więc da się odzyskać znacznie mniej; jeśli zawiera już znaki zastępcze, nie da się go odzyskać i narzędzie mówi to wprost, zamiast udawać. Numery linii i kody czasu pozostają nietknięte, a znaczniki stylów ASS zostają dokładnie takie, jakie były.',
    who: 'Każdy, kto pobrał napisy otwierające się jako dziwne znaki, widzi kwadraciki zamiast chińskich znaków w odtwarzaczu albo dostał plik o nieznanym kodowaniu.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Naprawa kodowania napisów'
  },
  'sv': {
    title: 'Reparera undertexter med konstiga tecken - Fel kodning | AI-SRTSub',
    desc: "Gratis online-reparation för oläsbara undertexter: känner av om filen var UTF-8, GBK, Big5, Shift_JIS eller EUC-KR, återställer fellästa tecken.",
    kw: 'reparera undertexter konstiga tecken,undertext fel kodning,srt konstiga tecken,åtgärda kodning undertexter,utf8 till gbk undertexter,undertexter oläsbara,upptäck kodning undertexter,ass konstiga tecken,vtt konstiga tecken',
    intro: 'Undertexter som öppnas som en vägg av meningslösa tecken har nästan alltid lästs med fel kodning. Lägg in filen: den tar reda på vilken kodning den faktiskt skrevs i och sätter tillbaka de fellästa tecknen.',
    feat: 'Filer avkodas om från originalbyten, så inget går förlorat: är det GBK säger den det, och om det är din spelare som läser fel räcker det oftast att spara en kopia som "UTF-8 med BOM". Inklistrad text är inte längre originalbytena, så mycket mindre kan räddas; om den redan innehåller ersättningstecken går den inte att återställa, och verktyget säger det rakt ut i stället för att låtsas. Radnummer och tidskoder rörs inte, och ASS-formatkoder lämnas precis som de var.',
    who: 'Den som laddat ner undertexter som öppnas som konstiga tecken, ser fyrkanter i stället för kinesiska tecken i spelaren, eller fått en fil med okänd kodning.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Reparation av undertextkodning'
  },
  'cs': {
    title: 'Opravit titulky s rozbitými znaky - Špatné kódování | AI-SRTSub',
    desc: "Bezplatná online oprava nečitelných titulků: zjistí, zda soubor byl UTF-8, GBK, Big5, Shift_JIS nebo EUC-KR, a vrátí špatně přečtené znaky.",
    kw: 'opravit titulky rozbité znaky,titulky špatné kódování,srt rozbité znaky,opravit kódování titulků,utf8 na gbk titulky,titulky nečitelné,zjistit kódování titulků,ass rozbité znaky,vtt rozbité znaky',
    intro: 'Titulky, které se po otevření změní v zeď nesmyslných znaků, byly téměř vždy přečteny ve špatném kódování. Vložte soubor: nástroj zjistí skutečné kódování a vrátí špatně přečtené znaky na místo.',
    feat: 'Soubory se dekódují znovu z původních bajtů, takže se nic neztratí: jde-li o GBK, nástroj to sdělí, a pokud se mýlí váš přehrávač, obvykle stačí uložit kopii jako „UTF-8 s BOM“. Vložený text už nejsou původní bajty, takže toho lze zachránit mnohem méně; pokud už obsahuje náhradní znaky, nelze ho obnovit a nástroj to řekne rovnou, místo aby to zastíral. Čísla řádků a časové kódy zůstanou nedotčené a značky stylů ASS se ponechají přesně tak, jak byly.',
    who: 'Kdokoli, kdo si stáhl titulky, které se otevřou jako podivné znaky, vidí v přehrávači čtverečky místo čínských znaků, nebo dostal soubor s neznámým kódováním.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Oprava kódování titulků'
  },
  'uk': {
    title: 'Виправити «кракозябри» в субтитрах - Неправильне кодування | AI-SRTSub',
    desc: "Безкоштовне онлайн-виправлення нерозбірливих субтитрів: визначає, чи був файл у UTF-8, GBK, Big5, Shift_JIS чи EUC-KR, повертає неправильно прочитані символи.",
    kw: 'виправити кракозябри субтитри,субтитри неправильне кодування,srt кракозябри,виправити кодування субтитрів,utf8 у gbk субтитри,субтитри не читаються,визначити кодування субтитрів,ass кракозябри,vtt кракозябри',
    intro: 'Субтитри, які відкриваються як стіна безглуздих символів, майже завжди прочитані в неправильному кодуванні. Завантажте файл: він визначить справжнє кодування і поверне символи на місце.',
    feat: 'Файли перекодовуються з вихідних байтів, тож нічого не втрачається: якщо це GBK, про це повідомляється, а якщо помиляється ваш програвач, зазвичай досить зберегти копію як «UTF-8 з BOM». Вставлений текст уже не є вихідними байтами, тому відновлюється набагато менше; якщо в ньому вже є символи-замінники, відновлення неможливе, і інструмент каже це прямо, а не вдає інше. Номери рядків і таймкоди не чіпаються, а теги оформлення ASS залишаються без змін.',
    who: 'Ті, хто завантажив субтитри, які відкриваються як дивні символи, бачить квадратики замість китайських ієрогліфів у програвачі, або отримав файл з невідомим кодуванням.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Виправлення кодування субтитрів'
  },
  'da': {
    title: 'Reparer undertekster med mærkelige tegn - Forkert kodning | AI-SRTSub',
    desc: "Gratis online reparation af ulæselige undertekster: registrerer om filen var UTF-8, GBK, Big5, Shift_JIS eller EUC-KR, sætter tegnene på plads.",
    kw: 'reparer undertekster mærkelige tegn,undertekster forkert kodning,srt mærkelige tegn,ret undertekster kodning,utf8 til gbk undertekster,undertekster ulæselige,registrer undertekster kodning,ass mærkelige tegn,vtt mærkelige tegn',
    intro: 'Undertekster, der åbner som en mur af meningsløse tegn, er næsten altid læst med forkert kodning. Smid filen ind: den finder ud af, hvilken kodning den faktisk blev skrevet i, og sætter de forkert læste tegn tilbage.',
    feat: 'Filer afkodes igen fra de oprindelige bytes, så intet går tabt: er det GBK, siger den det, og hvis det er din afspiller, der læser forkert, er det som regel nok at gemme en kopi som "UTF-8 med BOM". Indsat tekst er ikke længere de oprindelige bytes, så der er meget mindre at redde; indeholder den allerede erstatningstegn, kan den ikke gendannes, og værktøjet siger det rent ud i stedet for at lade som om. Linjenumre og tidskoder røres ikke, og ASS-formateringskoder bevares nøjagtigt, som de var.',
    who: 'Alle der har downloadet undertekster, der åbner som mærkelige tegn, ser firkanter i stedet for kinesiske tegn i afspilleren, eller har fået en fil med ukendt kodning.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Reparation af undertekstkodning'
  },
  'fi': {
    title: 'Korjaa tekstityksen outo merkistö - Väärä koodaus | AI-SRTSub',
    desc: "Ilmainen verkkokorjaus lukukelvottomille tekstityksille: tunnistaa, oliko tiedosto UTF-8, GBK, Big5, Shift_JIS vai EUC-KR, palauttaa väärin luetut merkit.",
    kw: 'korjaa tekstitys outo merkistö,tekstitys väärä koodaus,srt outoja merkkejä,korjaa tekstityksen koodaus,utf8 gbk tekstitys,tekstitys ei lukukelpoinen,tunnista tekstityksen koodaus,ass outoja merkkejä,vtt outoja merkkejä',
    intro: 'Tekstitykset, jotka avautuvat merkityksettömien merkkien muurina, on lähes aina luettu väärällä merkistöllä. Pudota tiedosto: se selvittää, millä merkistöllä se oikeasti kirjoitettiin, ja palauttaa väärin luetut merkit.',
    feat: 'Tiedostot puretaan uudelleen alkuperäisistä tavuista, joten mitään ei katoa: jos kyseessä on GBK, se kerrotaan, ja jos soittimesi lukee väärin, kopion tallentaminen "UTF-8 BOM:illa" riittää yleensä. Liitetty teksti ei ole enää alkuperäisiä tavuja, joten palautettavaa on paljon vähemmän; jos siinä on jo korvausmerkkejä, sitä ei voi palauttaa, ja työkalu sanoo tämän suoraan sen sijaan että teeskentelisi. Rivi­numeroita ja aikakoodeja ei kosketa, ja ASS-tyylimerkit jätetään täsmälleen ennalleen.',
    who: 'Kaikille, jotka lataavat tekstityksiä jotka avautuvat outoina merkkeinä, näkevät ruutuja kiinalaisten merkkien sijasta soittimessa, tai saivat tiedoston tuntemattomalla merkistöllä.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Tekstityksen koodauksen korjaus'
  },
  'el': {
    title: "Διόρθωση υποτίτλων με περίεργα σύμβολα - Λάθος κωδικοποίηση",
    desc: "Δωρεάν online επιδιόρθωση μη αναγνώσιμων υπότιτλων: εντοπίζει αν το αρχείο ήταν UTF-8, GBK, Big5, Shift_JIS ή EUC-KR, επαναφέρει τους λάθος χαρακτήρες.",
    kw: 'διόρθωση υποτίτλων περίεργα σύμβολα,υπότιτλοι λάθος κωδικοποίηση,srt περίεργα σύμβολα,διόρθωση κωδικοποίησης υποτίτλων,utf8 σε gbk υπότιτλοι,υπότιτλοι μη αναγνώσιμοι,εντοπισμός κωδικοποίησης υποτίτλων,ass περίεργα σύμβολα,vtt περίεργα σύμβολα',
    intro: 'Υπότιτλοι που ανοίγουν ως ένας τοίχος από ακατανόητα σύμβολα έχουν σχεδόν πάντα διαβαστεί με λάθος κωδικοποίηση. Ρίξτε το αρχείο: βρίσκει σε ποια κωδικοποίηση γράφτηκε πραγματικά και επαναφέρει τους χαρακτήρες.',
    feat: 'Τα αρχεία αποκωδικοποιούνται ξανά από τα πρωτότυπα bytes, οπότε δεν χάνεται τίποτα: αν είναι GBK το λέει, κι αν αυτός που κάνει λάθος είναι ο αναπαραγωγέας σας, συνήθως αρκεί να αποθηκεύσετε ένα αντίγραφο ως «UTF-8 με BOM». Το κείμενο που επικολλάται δεν είναι πλέον τα πρωτότυπα bytes, οπότε ανακτάται πολύ λιγότερο· αν περιέχει ήδη χαρακτήρες αντικατάστασης, δεν ανακτάται και το εργαλείο το λέει ξεκάθαρα αντί να το αποκρύπτει. Οι αριθμοί γραμμών και οι κωδικοί χρόνου δεν πειράζονται, και οι ετικέτες μορφοποίησης ASS μένουν ακριβώς όπως ήταν.',
    who: 'Όποιος κατέβασε υπότιτλους που ανοίγουν ως περίεργα σύμβολα, βλέπει τετραγωνάκια αντί για κινεζικούς χαρακτήρες στον αναπαραγωγέα, ή έλαβε αρχείο με άγνωστη κωδικοποίηση.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Διόρθωση κωδικοποίησης υποτίτλων'
  },
  'he': {
    title: 'תיקון כתוביות עם סימנים מוזרים - קידוד שגוי | AI-SRTSub',
    desc: 'תיקון מקוון חינם לכתוביות בלתי קריאות: מזהה אם הקובץ היה באמת UTF-8, GBK, Big5, Shift_JIS או EUC-KR, מחזיר תווים שנקראו לא נכון ויכול לשמור אותו בקידוד שהנגן שלכם מבין.',
    kw: 'תיקון כתוביות סימנים מוזרים,כתוביות קידוד שגוי,srt סימנים מוזרים,תיקון קידוד כתוביות,המרת utf8 ל-gbk כתוביות,כתוביות לא קריאות,זיהוי קידוד כתוביות,ass סימנים מוזרים,vtt סימנים מוזרים',
    intro: 'כתוביות שנפתחות כקיר של סימנים חסרי משמעות נקראו כמעט תמיד בקידוד הלא נכון. הכניסו את הקובץ: הוא יגלה באיזה קידוד הוא נכתב באמת ויחזיר את התווים שנקראו לא נכון למקומם.',
    feat: 'הקבצים מפוענחים מחדש מהבתים המקוריים, כך ששום דבר לא אובד: אם זה GBK הוא יאמר זאת, ואם הנגן שלכם הוא זה שטועה, בדרך כלל מספיק לשמור עותק כ"UTF-8 עם BOM". טקסט מודבק אינו הבתים המקוריים עוד, ולכן ניתן לשחזר הרבה פחות; אם הוא כבר מכיל תווי החלפה, לא ניתן לשחזרו והכלי אומר זאת בגלוי במקום להעמיד פנים. מספרי השורות וקודי הזמן אינם נוגעים, ותגיות העיצוב של ASS נשארות בדיוק כפי שהיו.',
    who: 'מי שהוריד כתוביות שנפתחות כסימנים מוזרים, רואה ריבועים במקום תווים סיניים בנגן, או קיבל קובץ עם קידוד לא ידוע.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Mojibake Repair'
  },
  'ro': {
    title: 'Repară subtitrări cu caractere ciudate - Codare greșită | AI-SRTSub',
    desc: "Reparare online gratuită pentru subtitrări ilizibile: detectează dacă fișierul era UTF-8, GBK, Big5, Shift_JIS sau EUC-KR, readuce caracterele citite greșit.",
    kw: 'repară subtitrări caractere ciudate,subtitrări codare greșită,srt caractere ciudate,corectează codare subtitrări,utf8 în gbk subtitrări,subtitrări ilizibile,detectează codare subtitrări,ass caractere ciudate,vtt caractere ciudate',
    intro: 'Subtitrările care se deschid ca un zid de caractere fără sens au fost aproape mereu citite cu codarea greșită. Pune fișierul: află în ce codare a fost scris de fapt și readuce caracterele citite greșit.',
    feat: 'Fișierele sunt decodificate din nou din octeții originali, deci nu se pierde nimic: dacă este GBK, spune asta, iar dacă playerul tău este cel care greșește, de obicei ajunge să salvezi o copie ca „UTF-8 cu BOM”. Textul lipit nu mai este octeții originali, așa că se recuperează mult mai puțin; dacă deja conține caractere de înlocuire, nu se mai poate recupera și unealta o spune clar în loc să prefacă. Numerele de linie și codurile de timp nu sunt atinse, iar etichetele de stil ASS rămân exact cum erau.',
    who: 'Oricine a descărcat subtitrări care se deschid ca un talmeș-balmeș de caractere, vede pătrate în loc de caractere chinezești în player sau a primit un fișier cu codare necunoscută.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Reparare codare subtitrări'
  }
};

/* v0.9.299：第九个页面 —— 字幕提取纯文本（/extract.html）
   与前面几个工具页同理：纯前端、不烧 API 调用费，是优先抢的搜索词。 */
const SEO_EXTRACT = {
  'zh-CN': {
    title: '字幕提取纯文本 - SRT / ASS / VTT 台词一键导出 | 随心字幕 AI',
    desc: '免费在线把字幕提取成纯文本：SRT、VTT、ASS、SBV、LRC、TXT 都认，时间轴和序号自动去掉，输出连续段落或逐条一行，还能顺手去掉听障提示、水印和说话人名。',
    kw: '字幕提取文本,srt转txt,ass转txt,字幕转文本,提取台词,字幕去时间轴,srt导出文本,字幕转纯文字,台词提取工具,subtitle to text,srt to txt,extract text from subtitles',
    intro: '把 SRT / VTT / ASS / SBV / LRC / TXT 字幕里的台词提取成干净的纯文本，时间轴、序号、样式标记全部自动去掉。',
    feat: '两种布局随选：连续段落按停顿和句末标点自动分段，适合当文章读；逐条一行适合拿去做对白清单。听障提示（如「(电话铃响)」）、片源水印、相邻重复句默认去掉，说话人名（如「TOM:」）和歌词行要不要留也可以自己选。中英日韩等不同文字的折行合并规则不同，按语言自动处理。',
    who: '想把台词抄下来做笔记、做剧本、练翻译、喂给别的工具，但不想一条条手动删时间轴的人。',
    siteName: '随心字幕 AI', jsonldName: '随心字幕 AI', jsonldAlt: 'Subtitle Text Extractor'
  },
  'zh-TW': {
    title: '字幕提取純文字 - SRT / ASS / VTT 台詞一鍵匯出 | 隨心字幕 AI',
    desc: '免費線上把字幕提取成純文字：SRT、VTT、ASS、SBV、LRC、TXT 都認得，時間軸和序號自動去掉，輸出連續段落或逐條一行，還能順手去掉聽障提示、浮水印和說話人名。',
    kw: '字幕提取文字,srt轉txt,ass轉txt,字幕轉文字,提取台詞,字幕去時間軸,srt匯出文字,字幕轉純文字,台詞提取工具,subtitle to text,srt to txt,extract text from subtitles',
    intro: '把 SRT / VTT / ASS / SBV / LRC / TXT 字幕裡的台詞提取成乾淨的純文字，時間軸、序號、樣式標記全部自動去掉。',
    feat: '兩種版面隨選：連續段落按停頓和句末標點自動分段，適合當文章讀；逐條一行適合拿去做對白清單。聽障提示（如「(電話鈴響)」）、片源浮水印、相鄰重複句預設去掉，說話人名（如「TOM:」）和歌詞行要不要留也可以自己選。中英日韓等不同文字的換行合併規則不同，按語言自動處理。',
    who: '想把台詞抄下來做筆記、寫劇本、練翻譯、餵給別的工具，但不想一條條手動刪時間軸的人。',
    siteName: '隨心字幕 AI', jsonldName: '隨心字幕 AI', jsonldAlt: 'Subtitle Text Extractor'
  },
  'en': {
    title: 'Extract Text From Subtitles - SRT/ASS/VTT to Plain Text | AI-SRTSub',
    desc: 'Free online subtitle-to-text extractor: reads SRT, VTT, ASS, SBV, LRC and TXT, drops timecodes and line numbers, and outputs clean dialogue as paragraphs or one line per cue.',
    kw: 'extract text from subtitles,subtitle to text,srt to txt,srt to plain text,ass to txt,vtt to txt,subtitle transcript,extract dialogue from srt,srt remove timecodes,subtitle text extractor',
    intro: 'Pull the dialogue out of SRT / VTT / ASS / SBV / LRC / TXT subtitles as clean plain text: timecodes, cue numbers and style tags are stripped automatically.',
    feat: 'Two layouts: continuous paragraphs split on pauses and end-of-sentence punctuation, or one line per cue for dialogue lists. Sound cues like "(phone ringing)", source watermarks and repeated back-to-back lines are removed by default; speaker names like "TOM:" and lyric lines can be kept or dropped. Line-wrapping is merged back per script — CJK joins directly, Korean and Latin add spaces — so nothing gets glued together.',
    who: 'Anyone who wants subtitle text for notes, scripts, translation practice or feeding another tool, without deleting hundreds of timecodes by hand.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Text Extractor'
  },
  'ja': {
    title: '字幕からテキスト抽出 - SRT / ASS / VTT のセリフを書き出し | AI-SRTSub',
    desc: '無料のオンラインツール：SRT・VTT・ASS・SBV・LRC・TXT の字幕からセリフだけを取り出します。タイムコードと行番号は自動で消え、段落つなぎまたは一行ずつで出力できます。',
    kw: '字幕 テキスト 抽出,srt テキスト 変換,ass テキスト 抽出,字幕 セリフ 書き出し,字幕 書き起こし,srt 台本,字幕 タイムコード 削除,subtitle to text,srt to txt',
    intro: 'SRT / VTT / ASS / SBV / LRC / TXT の字幕から、タイムコード・行番号・スタイル指定を自動で取り除き、セリフだけをきれいなテキストとして取り出します。',
    feat: '出力は二種類：休止と句読点で段落分けする「連続段落」は読み物向き、セリフを行ごとに並べる「一行ずつ」は台本作成向き。聴覚障害者向けの注記（「(電話の着信音)」など）、放送元の透かし、連続する重複行はデフォルトで除去。話者名（「TOM:」など）と歌詞行の去就は自分で選べます。折り返しの結合は文字体系ごとに判断し、日本語はそのまま、韓国語や英語はスペースを補います。',
    who: 'セリフをメモや台本、翻訳の練習、他ツールへの入力に使いたいけど、タイムコードを一つずつ消すのは嫌な人。',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Text Extractor'
  },
  'es': {
    title: 'Extraer texto de subtítulos - SRT/ASS/VTT a texto plano | AI-SRTSub',
    desc: 'Extractor gratuito online: lee SRT, VTT, ASS, SBV, LRC y TXT, elimina códigos de tiempo y números de línea, y entrega el diálogo limpio en párrafos o una línea por entrada.',
    kw: 'extraer texto de subtítulos,subtítulos a texto,srt a txt,ass a txt,vtt a txt,extraer diálogos srt,transcripción de subtítulos,srt quitar tiempos,subtitle to text,srt to txt',
    intro: 'Saca el diálogo de subtítulos SRT / VTT / ASS / SBV / LRC / TXT como texto plano limpio: códigos de tiempo, números y etiquetas de estilo se eliminan automáticamente.',
    feat: 'Dos diseños: párrafos continuos divididos por pausas y puntuación final, o una línea por entrada para listas de diálogo. Las acotaciones sonoras como "(suena el teléfono)", marcas de agua y líneas repetidas consecutivas se quitan por defecto; los nombres de hablante como "TOM:" y las líneas de canciones se pueden conservar o descartar. Los saltos de línea se vuelven a unir según la escritura: el japonés se une directo y el coreano o el latino añaden espacios.',
    who: 'Quien quiera el texto de los subtítulos para apuntes, guiones, práctica de traducción u otra herramienta, sin borrar cientos de códigos de tiempo a mano.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Text Extractor'
  },
  'pt': {
    title: 'Extrair texto de legendas - SRT/ASS/VTT para texto | AI-SRTSub',
    desc: 'Extrator online gratuito: lê SRT, VTT, ASS, SBV, LRC e TXT, remove timecodes e números de linha, e entrega o diálogo limpo em parágrafos ou uma linha por legenda.',
    kw: 'extrair texto de legendas,legenda para texto,srt para txt,ass para txt,vtt para txt,extrair diálogo srt,transcrição de legenda,remover timecode srt,subtitle to text,srt to txt',
    intro: 'Tire o diálogo de legendas SRT / VTT / ASS / SBV / LRC / TXT como texto puro e limpo: timecodes, números e tags de estilo são removidos automaticamente.',
    feat: 'Dois layouts: parágrafos contínuos divididos por pausas e pontuação final de frase, ou uma linha por legenda para listas de diálogo. Indicações sonoras como "(telefone toca)", marcas d’água e linhas repetidas em sequência saem por padrão; nomes de personagem como "TOM:" e letras de música você escolhe manter ou tirar. As quebras de linha são reunidas conforme a escrita: japonês junta direto, coreano e latinos ganham espaços.',
    who: 'Quem quer o texto das legendas para anotações, roteiros, prática de tradução ou outra ferramenta, sem apagar centenas de timecodes à mão.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Text Extractor'
  },
  'ko': {
    title: '자막에서 텍스트 추출 - SRT / ASS / VTT 대사 내보내기 | AI-SRTSub',
    desc: '무료 온라인 도구: SRT, VTT, ASS, SBV, LRC, TXT 자막에서 대사만 뽑아냅니다. 타임코드와 줄번호는 자동으로 지워지고, 문단 이어쓰기 또는 한 줄씩 출력을 고를 수 있습니다.',
    kw: '자막 텍스트 추출,srt 텍스트 변환,ass 텍스트 추출,자막 대사 추출,자막 변환 텍스트,srt 대본,자막 타임코드 삭제,subtitle to text,srt to txt',
    intro: 'SRT / VTT / ASS / SBV / LRC / TXT 자막에서 타임코드·줄번호·스타일 태그를 자동으로 걷어내고 대사만 깔끔한 텍스트로 뽑아냅니다.',
    feat: '출력은 두 가지: 멈춤과 문장 끝 문장부호 기준으로 문단을 나누는 이어쓰기, 대사를 한 줄씩 나열하는 목록용. 청각 장애인용 표기("(전화벨 소리)" 등), 방송사 워터마크, 연속된 중복 줄은 기본적으로 제거하고 화자명("TOM:" 등)과 가사 줄은 남길지 직접 고릅니다. 줄바꿈 병합은 문자 체계별로 판단해 한국어와 영어는 공백을 넣고 일본어·중국어는 바로 이어 붙입니다.',
    who: '대사를 메모·대본·번역 연습이나 다른 도구에 쓰고 싶지만 타임코드를 하나하나 지우기는 싫은 사람.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Text Extractor'
  },
  'de': {
    title: 'Text aus Untertiteln extrahieren - SRT/ASS/VTT als Text | AI-SRTSub',
    desc: 'Kostenloses Online-Tool: liest SRT, VTT, ASS, SBV, LRC und TXT, entfernt Timecodes und Zeilennummern und liefert den Dialog sauber als Absätze oder je Zeile eine Aussage.',
    kw: 'untertitel text extrahieren,srt zu text,ass zu txt,vtt zu txt,untertitel transkript,dialog extrahieren srt,srt timecodes entfernen,subtitle to text,srt to txt',
    intro: 'Zieh den Dialog aus SRT-/VTT-/ASS-/SBV-/LRC-/TXT-Untertiteln als sauberen Text: Timecodes, Zeilennummern und Style-Tags fallen automatisch weg.',
    feat: 'Zwei Layouts: fortlaufende Absätze, getrennt nach Pausen und Satzzeichen, oder eine Zeile pro Untertitel für Dialoglisten. Sound-Hinweise wie "(Telefon klingelt)", Wasserzeichen und direkt wiederholte Zeilen sind standardmäßig raus; Sprechernamen wie "TOM:" und Songzeilen behältst oder wirfst du selbst. Umbrüche werden je Schrift wieder zusammengefügt — Japanisch direkt, Koreanisch und Lateinschrift mit Leerzeichen.',
    who: 'Wer den Untertiteltext für Notizen, Drehbücher, Übersetzungsübung oder andere Tools braucht, aber keine Hunderten Timecodes von Hand löschen will.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Text Extractor'
  },
  'fr': {
    title: 'Extraire le texte des sous-titres - SRT/ASS/VTT en texte | AI-SRTSub',
    desc: 'Outil gratuit en ligne : lit les SRT, VTT, ASS, SBV, LRC et TXT, retire timecodes et numéros de ligne, et livre les dialogues propres en paragraphes ou une ligne par sous-titre.',
    kw: 'extraire texte sous-titres,srt en txt,ass en txt,vtt en txt,sous-titres transcription,extraire dialogues srt,supprimer timecode srt,subtitle to text,srt to txt',
    intro: 'Tirez les dialogues de sous-titres SRT / VTT / ASS / SBV / LRC / TXT en texte brut propre : timecodes, numéros et balises de style disparaissent automatiquement.',
    feat: 'Deux dispositions : paragraphes continus coupés aux pauses et à la ponctuation de fin de phrase, ou une ligne par sous-titre pour les listes de dialogues. Les indications sonores comme "(le téléphone sonne)", les filigranes et les lignes répétées d’affilée partent par défaut ; les noms de locuteurs comme "TOM :" et les lignes de chansons, à toi de choisir. Les retours à la ligne sont recollés selon l’écriture : le japonais directement, le coréen et l’alphabet avec des espaces.',
    who: 'Toute personne qui veut le texte des sous-titres pour des notes, un script, de la traduction ou un autre outil, sans supprimer des centaines de timecodes à la main.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Text Extractor'
  },
  'id': {
    title: 'Ekstrak Teks dari Subtitle - SRT/ASS/VTT ke Teks | AI-SRTSub',
    desc: 'Alat online gratis: membaca SRT, VTT, ASS, SBV, LRC, dan TXT, membuang timecode dan nomor baris, lalu menghasilkan dialog bersih sebagai paragraf atau satu baris per subtitle.',
    kw: 'ekstrak teks subtitle,subtitle ke teks,srt ke txt,ass ke txt,vtt ke txt,transkrip subtitle,ambil dialog srt,hapus timecode srt,subtitle to text,srt to txt',
    intro: 'Ambil dialog dari subtitle SRT / VTT / ASS / SBV / LRC / TXT sebagai teks bersih: timecode, nomor baris, dan tag gaya dibuang otomatis.',
    feat: 'Dua tata letak: paragraf berkesinambungan yang dipotong pada jeda dan tanda baca akhir kalimat, atau satu baris per subtitle untuk daftar dialog. Keterangan suara seperti "(telepon berdering)", watermark, dan baris yang berulang berurutan dibuang secara bawaan; nama pembicara seperti "TOM:" dan baris lirik bisa Anda simpan atau buang. Penggabungan baris mengikuti aksara: Jepang langsung disambung, Korea dan Latin diberi spasi.',
    who: 'Siapa pun yang butuh teks subtitle untuk catatan, naskah, latihan terjemahan, atau alat lain, tanpa menghapus ratusan timecode satu per satu.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Text Extractor'
  },
  'hi': {
    title: 'सबटाइटल से टेक्स्ट निकालें - SRT/ASS/VTT से प्लेन टेक्स्ट | AI-SRTSub',
    desc: 'मुफ्त ऑनलाइन टूल: SRT, VTT, ASS, SBV, LRC और TXT पढ़ता है, टाइमकोड और लाइन नंबर हटा देता है, और साफ़ संवाद पैराग्राफ या हर सबटाइटल एक लाइन में देता है।',
    kw: 'सबटाइटल से टेक्स्ट,srt to text,srt से txt,subtitle transcript,संवाद निकालें srt,टाइमकोड हटाएं srt,ass to text,vtt to text,subtitle to plain text',
    intro: 'SRT / VTT / ASS / SBV / LRC / TXT सबटाइटल से टाइमकोड, नंबर और स्टाइल टैग अपने आप हटाकर सिर्फ़ संवाद को साफ़ टेक्स्ट के रूप में निकालें।',
    feat: 'दो लेआउट: ठहराव और वाक्य-अंत विराम चिह्न पर बँटे लगातार पैराग्राफ, या संवाद सूची के लिए हर सबटाइटल एक लाइन। "(फ़ोन बजता है)" जैसी ध्वनि-टिप्पणियाँ, वॉटरमार्क और लगातार दोहराई गई लाइनें डिफ़ॉल्ट रूप से हट जाती हैं; "TOM:" जैसे बोलने वाले का नाम और गीत की लाइनें रखना या हटाना आप तय करते हैं। लाइन-ब्रेक जोड़ने का नियम लिपि के हिसाब से है: जापानी सीधे जुड़ता है, कोरियाई और लैटिन में स्पेस लगता है।',
    who: 'जो सबटाइटल का टेक्स्ट नोट्स, स्क्रिप्ट, अनुवाद अभ्यास या किसी और टूल के लिए चाहते हैं, लेकिन सैकड़ों टाइमकोड हाथ से मिटाना नहीं चाहते।',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Text Extractor'
  },
  'th': {
    title: 'แยกข้อความจากซับไตเติล - SRT/ASS/VTT เป็นข้อความ | AI-SRTSub',
    desc: 'เครื่องมือออนไลน์ฟรี: อ่าน SRT, VTT, ASS, SBV, LRC และ TXT ตัดไทม์โค้ดกับหมายเลขบรรทัดทิ้ง แล้วส่งออกบทสนทนาเป็นย่อหน้า หรือบรรทัดละหนึ่งคิว',
    kw: 'แยกข้อความจากซับ,ซับเป็นข้อความ,srt เป็น txt,ass เป็น txt,vtt เป็น txt,ถอดบทสนทนา srt,ลบไทม์โค้ด srt,subtitle to text,srt to txt',
    intro: 'ดึงบทสนทนาจากซับไตเติล SRT / VTT / ASS / SBV / LRC / TXT ออกมาเป็นข้อความสะอาด ๆ โดยไทม์โค้ด หมายเลข และแท็กสไตล์ถูกตัดทิ้งให้อัตโนมัติ',
    feat: 'เลย์เอาต์สองแบบ: ย่อหน้าต่อเนื่องที่แบ่งตามช่วงหยุดและเครื่องหมายสิ้นสุดประโยค หรือบรรทัดละหนึ่งคิวสำหรับทำรายการบทสนทนา คำอธิบายเสียงอย่าง "(เสียงโทรศัพท์)" ลายน้ำ และบรรทัดซ้ำติดกันถูกตัดทิ้งตั้งแต่ค่าเริ่มต้น ส่วนชื่อผู้พูดอย่าง "TOM:" และบรรทัดเนื้อเพลงจะเก็บหรือทิ้งก็เลือกได้เอง การรวมบรรทัดจะดูตามระบบตัวเขียน ญี่ปุ่นต่อกันได้เลย ส่วนเกาหลีและอักษรละตินใส่ช่องว่างให้',
    who: 'คนที่อยากได้ข้อความจากซับไว้ทำโน้ต บทภาพยนตร์ ฝึกแปล หรือป้อนเข้าเครื่องมืออื่น แต่ไม่อยากนั่งลบไทม์โค้ดทีละร้อยด้วยมือ',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Text Extractor'
  },
  'vi': {
    title: 'Trích văn bản từ phụ đề - SRT/ASS/VTT sang text | AI-SRTSub',
    desc: 'Công cụ trực tuyến miễn phí: đọc SRT, VTT, ASS, SBV, LRC và TXT, loại timecode và số dòng, xuất lời thoại sạch thành đoạn văn hoặc mỗi dòng phụ đề một dòng.',
    kw: 'trích văn bản từ phụ đề,phụ đề sang text,srt sang txt,ass sang txt,vtt sang txt,trích lời thoại srt,xóa timecode srt,subtitle to text,srt to txt',
    intro: 'Lấy lời thoại từ phụ đề SRT / VTT / ASS / SBV / LRC / TXT thành văn bản sạch: timecode, số dòng và thẻ định dạng được loại tự động.',
    feat: 'Hai bố cục: đoạn văn liền mạch ngắt theo chỗ dừng và dấu câu cuối câu, hoặc mỗi dòng phụ đề một dòng cho danh sách thoại. Chú thích âm thanh như "(điện thoại reo)", watermark và các dòng lặp liền nhau bị loại mặc định; tên nhân vật như "TOM:" và lời bài hát giữ hay bỏ do bạn chọn. Việc nối dòng ngắt được xử lý theo hệ chữ: tiếng Nhật nối thẳng, tiếng Hàn và chữ Latin thêm dấu cách.',
    who: 'Ai cần văn bản phụ đề để ghi chú, viết kịch bản, luyện dịch hoặc đưa vào công cụ khác, mà không muốn xóa hàng trăm timecode bằng tay.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Text Extractor'
  },
  'ru': {
    title: 'Извлечь текст из субтитров — SRT/ASS/VTT в текст | AI-SRTSub',
    desc: 'Бесплатный онлайн-инструмент: читает SRT, VTT, ASS, SBV, LRC и TXT, убирает таймкоды и номера строк и выдаёт чистые диалоги абзацами или по строке на реплику.',
    kw: 'извлечь текст из субтитров,srt в txt,ass в txt,vtt в txt,субтитры в текст,расшифровка субтитров,убрать таймкоды srt,диалоги из srt,subtitle to text,srt to txt',
    intro: 'Достаньте диалоги из субтитров SRT / VTT / ASS / SBV / LRC / TXT в виде чистого текста: таймкоды, номера строк и теги стилей убираются автоматически.',
    feat: 'Два формата: сплошные абзацы, разбитые по паузам и знакам конца предложения, или по строке на реплику для списка диалогов. Звуковые пометки вроде "(звонит телефон)", водяные знаки и подряд повторяющиеся строки убраны по умолчанию; имена говорящих вроде "TOM:" и строки песен оставляете или убираете сами. Переносы строк склеиваются по письму: японский — напрямую, корейский и латиница — с пробелом.',
    who: 'Тем, кому нужен текст субтитров для заметок, сценария, практики перевода или другой программы, но не хочется вручную удалять сотни таймкодов.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Text Extractor'
  },
  'it': {
    title: 'Estrarre testo dai sottotitoli - SRT/ASS/VTT in testo | AI-SRTSub',
    desc: 'Strumento online gratuito: legge SRT, VTT, ASS, SBV, LRC e TXT, toglie timecode e numeri di riga e restituisce i dialoghi puliti in paragrafi o una riga per battuta.',
    kw: 'estrarre testo sottotitoli,srt in txt,ass in txt,vtt in txt,transcrizione sottotitoli,estrarre dialoghi srt,rimuovere timecode srt,subtitle to text,srt to txt',
    intro: 'Estrai i dialoghi da sottotitoli SRT / VTT / ASS / SBV / LRC / TXT come testo pulito: timecode, numeri e tag di stile vengono via automaticamente.',
    feat: 'Due impaginazioni: paragrafi continui spezzati su pause e punteggiatura di fine frase, oppure una riga per battuta per le liste dei dialoghi. Le didascalie sonore come "(squilla il telefono)", i watermark e le righe ripetute di fila via per impostazione predefinita; i nomi dei parlanti come "TOM:" e le righe delle canzoni le scegli tu. Le interruzioni di riga vengono ricucite in base alla scrittura: il giapponese in diretta, il coreano e l’alfabeto latino con spazi.',
    who: 'Chi vuole il testo dei sottotitoli per appunti, copioni, esercizio di traduzione o un altro strumento, senza cancellare a mano centinaia di timecode.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Text Extractor'
  },
  'ar': {
    title: 'استخراج النص من الترجمات - SRT/ASS/VTT إلى نص | AI-SRTSub',
    desc: 'أداة مجانية عبر الإنترنت: تقرأ SRT وVTT وASS وSBV وLRC وTXT، وتحذف أكواد التوقيت وأرقام الأسطر، وتخرج الحوارات نظيفة في فقرات أو سطر لكل ترجمة.',
    kw: 'استخراج نص من الترجمات,تحويل الترجمة إلى نص,srt إلى txt,ass إلى txt,vtt إلى txt,تفريغ الترجمات,حذف التوقيت من srt,حوارات من srt,subtitle to text,srt to txt',
    intro: 'استخرج الحوارات من ترجمات SRT / VTT / ASS / SBV / LRC / TXT كنص نظيف: أكواد التوقيت وأرقام الأسطر ووسوم التنسيق تُحذف تلقائيًا.',
    feat: 'تخطيطان: فقرات متصلة تُقسم عند الوقفات وعلامات نهاية الجملة، أو سطر واحد لكل ترجمة لقوائم الحوار. الملاحظات الصوتية مثل "(رنين الهاتف)" والعلامات المائية والأسطر المتكررة المتتالية تُحذف افتراضيًا؛ أسماء المتحدثين مثل "TOM:" وأسطر الأغاني تحذفها أو تبقيها بنفسك. دمج فواصل الأسطر يتم حسب نظام الكتابة: اليابانية تُوصل مباشرة، والكورية والحروف اللاتينية تُفصل بمسافات.',
    who: 'من يريد نص الترجمات للملاحظات أو السيناريو أو التدريب على الترجمة أو أداة أخرى، دون حذف مئات أكواد التوقيت يدويًا.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Text Extractor'
  },
  'tr': {
    title: 'Altyazılardan metin çıkarma - SRT/ASS/VTT metin olarak | AI-SRTSub',
    desc: 'Ücretsiz çevrimiçi araç: SRT, VTT, ASS, SBV, LRC ve TXT okur, zaman kodlarını ve satır numaralarını atar, temiz diyalogları paragraf ya da her satır için bir dize olarak verir.',
    kw: 'altyazıdan metin çıkarma,srt txt yap,ass txt yap,vtt txt yap,altyazı transkript,srt diyalog çıkarma,srt zaman kodu silme,subtitle to text,srt to txt',
    intro: 'SRT / VTT / ASS / SBV / LRC / TXT altyazılarındaki diyalogları temiz bir metin olarak çıkar: zaman kodları, numaralar ve stil etiketleri otomatik kalkar.',
    feat: 'İki yerleşim: duraklamalara ve cümle sonu noktalamasına göre bölünen sürekli paragraflar, ya da diyalog listeleri için altyazı başına bir satır. "(telefon çalıyor)" gibi ses notları, kaynak filigranları ve art arda tekrarlanan satırlar varsayılan olarak çıkarılır; "TOM:" gibi konuşmacı adları ve şarkı satırlarını tutmak ya da atmak sana kalmış. Satır sonları yazı sistemine göre birleştirilir: Japonca doğrudan, Korece ve Latin alfabesi boşlukla.',
    who: 'Altyazı metnini notlar, senaryo, çeviri pratiği ya da başka bir araç için isteyen ama yüzlerce zaman kodunu elle silmek istemeyen herkes.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Text Extractor'
  },
  'nl': {
    title: 'Tekst uit ondertitels halen - SRT/ASS/VTT naar tekst | AI-SRTSub',
    desc: 'Gratis online tool: leest SRT, VTT, ASS, SBV, LRC en TXT, haalt timecodes en regelnummers weg en levert schone dialoog als alinea’s of één regel per ondertitel.',
    kw: 'ondertitel naar tekst,srt naar txt,ass naar txt,vtt naar txt,ondertitels transcriberen,dialoog uit srt,timecode verwijderen srt,subtitle to text,srt to txt',
    intro: 'Haal de dialoog uit SRT-/VTT-/ASS-/SBV-/LRC-/TXT-ondertitels als schone platte tekst: timecodes, nummers en stijltags verdwijnen automatisch.',
    feat: 'Twee lay-outs: doorlopende alinea’s, verdeeld op pauzes en eindpunten, of één regel per ondertitel voor dialooglijsten. Geluidsaanduidingen als "(telefoon gaat)", watermerken en direct herhaalde regels zijn standaard weg; sprekersnamen als "TOM:" en songregels houd of gooi je zelf weg. Regeleinden worden per schrift weer samengevoegd — Japans direct, Koreaans en Latijns met spaties.',
    who: 'Wie de tekst van ondertitels wil voor aantekeningen, scripts, vertaaloefening of een andere tool, zonder honderden timecodes met de hand te wissen.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Text Extractor'
  },
  'pl': {
    title: 'Wyodrębnij tekst z napisów - SRT/ASS/VTT do tekstu | AI-SRTSub',
    desc: 'Darmowe narzędzie online: czyta SRT, VTT, ASS, SBV, LRC i TXT, usuwa kody czasu i numery linii, i zwraca czyste dialogi jako akapity albo po jednej linii na napis.',
    kw: 'wyodrębnij tekst z napisów,srt do txt,ass do txt,vtt do txt,napisy transkrypcja,dialogi z srt,usuń kody czasu srt,subtitle to text,srt to txt',
    intro: 'Wyciągnij dialogi z napisów SRT / VTT / ASS / SBV / LRC / TXT jako czysty tekst: kody czasu, numery i znaczniki stylu znikają automatycznie.',
    feat: 'Dwa układy: ciągłe akapity dzielone po pauzach i interpunkcji kończącej zdanie albo po jednej linii na napis do list dialogów. Opisy dźwięków jak "(dzwoni telefon)", znaki wodne i linie powtórzone bezpośrednio po sobie schodzą domyślnie; nazwy mówców jak "TOM:" i linii piosenek pilnujesz sam. Złamania linii sklejają się według pisma: japoński bezpośrednio, koreański i łacina ze spacją.',
    who: 'Każdy, kto chce tekst napisów do notatek, scenariusza, ćwiczeń tłumaczeniowych albo innego narzędzia, bez ręcznego usuwania setek kodów czasu.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Text Extractor'
  },
  'sv': {
    title: 'Extrahera text från undertexter - SRT/ASS/VTT till text | AI-SRTSub',
    desc: 'Gratis onlineverktyg: läser SRT, VTT, ASS, SBV, LRC och TXT, tar bort tidskoder och radnummer, och levererar ren dialog som stycken eller en rad per undertitel.',
    kw: 'extrahera text undertexter,srt till txt,ass till txt,vtt till txt,undertexter transkribera,dialog ur srt,ta bort tidskoder srt,subtitle to text,srt to txt',
    intro: 'Dra ut dialogen ur SRT-/VTT-/ASS-/SBV-/LRC-/TXT-undertexter som ren text: tidskoder, nummer och stiltaggar försvinner automatiskt.',
    feat: 'Två layouter: sammanhängande stycken delade på pauser och meningsslutspunktering, eller en rad per undertitel för dialoglistor. Ljudnoteringar som "(telefonen ringer)", vattenstämplar och rader som upprepas direkt efter varandra är borta som standard; talarnamn som "TOM:" och sångrader behåller eller slänger du själv. Radbrytningar fogas ihop per skrift — japanska direkt, koreanska och latinska med mellanslag.',
    who: 'Den som vill ha undertexttexten till anteckningar, manus, översättningsövning eller ett annat verktyg, utan att ta bort hundratals tidskoder för hand.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Text Extractor'
  },
  'cs': {
    title: 'Vyextrahovat text z titulků - SRT/ASS/VTT do textu | AI-SRTSub',
    desc: 'Bezplatný online nástroj: čte SRT, VTT, ASS, SBV, LRC a TXT, odstraňuje časové kódy a čísla řádků a vrací čisté dialogy jako odstavce nebo po jednom řádku na titulek.',
    kw: 'vyextrahovat text z titulků,srt do txt,ass do txt,vtt do txt,titulky transkripce,dialogy ze srt,odstranit časové kódy srt,subtitle to text,srt to txt',
    intro: 'Vytáhněte dialogy z titulků SRT / VTT / ASS / SBV / LRC / TXT jako čistý text: časové kódy, čísla a stylové značky zmizí automaticky.',
    feat: 'Dvě rozložení: souvislé odstavce dělené po pauzách a interpunkci na konci věty, nebo jeden řádek na titulek pro seznamy dialogů. Zvukové poznámky jako "(zvoní telefon)", vodoznaky a bezprostředně opakované řádky jsou ve výchozím stavu pryč; jména mluvčích jako "TOM:" a řádky písní si ponecháte nebo zahodíte sami. Zalomení řádků se slepují podle písma: japonština přímo, korejština a latinka s mezerou.',
    who: 'Kdo chce text titulků do poznámek, scénáře, cvičení překladu nebo jiného nástroje, bez ručního mazání stovek časových kódů.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Text Extractor'
  },
  'uk': {
    title: 'Витягти текст із субтитрів — SRT/ASS/VTT у текст | AI-SRTSub',
    desc: 'Безкоштовний онлайн-інструмент: читає SRT, VTT, ASS, SBV, LRC і TXT, прибирає таймкоди та номери рядків і видає чисті діалоги абзацами або по рядку на репліку.',
    kw: 'витягти текст із субтитрів,srt в txt,ass в txt,vtt в txt,субтитри в текст,розшифровка субтитрів,прибрати таймкоди srt,діалоги з srt,subtitle to text,srt to txt',
    intro: 'Дістаньте діалоги із субтитрів SRT / VTT / ASS / SBV / LRC / TXT як чистий текст: таймкоди, номери рядків і теги стилів прибираються автоматично.',
    feat: 'Два формати: суцільні абзаци, розбиті за паузами та розділовими знаками кінця речення, або по рядку на репліку для списку діалогів. Звукові позначки на кшталт "(дзвонить телефон)", водяні знаки та підряд повторювані рядки прибрані за замовчуванням; імена мовців на кшталт "TOM:" і рядки пісень лишаєте чи прибираєте самі. Переноси рядків склеюються за письмом: японська — напряму, корейська та латиниця — із пробілом.',
    who: 'Тим, кому потрібен текст субтитрів для нотаток, сценарію, практики перекладу чи іншої програми, але не хочеться вручну видаляти сотні таймкодів.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Text Extractor'
  },
  'da': {
    title: 'Udtræk tekst fra undertekster - SRT/ASS/VTT til tekst | AI-SRTSub',
    desc: 'Gratis onlineværktøj: læser SRT, VTT, ASS, SBV, LRC og TXT, fjerner tidskoder og linjenumre og giver ren dialog som afsnit eller én linje pr. undertekst.',
    kw: 'udtræk tekst undertekster,srt til txt,ass til txt,vtt til txt,undertekster transskription,dialog fra srt,fjern tidskoder srt,subtitle to text,srt to txt',
    intro: 'Træk dialogen ud af SRT-/VTT-/ASS-/SBV-/LRC-/TXT-undertekster som ren tekst: tidskoder, numre og style-tags fjernes automatisk.',
    feat: 'To layouts: sammenhængende afsnit delt ved pauser og sætningsafsluttende tegnsætning, eller én linje pr. undertekst til dialoglister. Lydnoteringer som "(telefonen ringer)", vandmærker og linjer, der gentages lige efter hinanden, er væk som standard; talernavne som "TOM:" og sanglinjer beholder eller smider du selv væk. Linjeskift sættes sammen pr. skrift — japansk direkte, koreansk og latinsk med mellemrum.',
    who: 'Alle, der vil have undertekstteksten til noter, manuskripter, oversættelsestræning eller et andet værktøj, uden at slette hundredvis af tidskoder i hånden.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Text Extractor'
  },
  'fi': {
    title: 'Poimi teksti tekstityksistä - SRT/ASS/VTT tekstiksi | AI-SRTSub',
    desc: 'Ilmainen verkkotyökalu: lukee SRT-, VTT-, ASS-, SBV-, LRC- ja TXT-tiedostot, poistaa aikakoodit ja rivinumerot ja antaa puhtaat dialogit kappaleina tai yhtenä rivinä per tekstitysrivi.',
    kw: 'tekstitys tekstiksi,srt txt:ksi,ass txt:ksi,vtt txt:ksi,tekstitysten transkriptio,dialogi srt:stä,poista aikakoodit srt,subtitle to text,srt to txt',
    intro: 'Poimi dialogi SRT-/VTT-/ASS-/SBV-/LRC-/TXT-tekstityksistä puhtaana tekstinä: aikakoodit, numerot ja tyylitunnisteet katoavat automaattisesti.',
    feat: 'Kaksi asettelua: yhtenäiset kappaleet, jotka katkeavat taukojen ja virkkeen lopun välimerkkien kohdalta, tai yksi rivi per tekstitysrivi dialogilistoihin. Äänihuomiot kuten "(puhelin soi)", vesileimat ja peräkkäin toistetut rivit poistuvat oletuksena; puhujan nimet kuten "TOM:" ja laulurivit säilytät tai poistat itse. Rivinvaihdot liitetään kirjoitusjärjestelmän mukaan — japani suoraan, korea ja latina välilyönnillä.',
    who: 'Kaikki, jotka haluavat tekstityksen tekstiä muistiinpanoihin, käsikirjoitukseen, käännösharjoitteluun tai toiseen työkaluun ilman satojen aikakoodien käsin poistamista.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Text Extractor'
  },
  'el': {
    title: 'Εξαγωγή κειμένου από υπότιτλους - SRT/ASS/VTT σε κείμενο | AI-SRTSub',
    desc: 'Δωρεάν διαδικτυακό εργαλείο: διαβάζει SRT, VTT, ASS, SBV, LRC και TXT, αφαιρεί κωδικούς χρόνου και αριθμούς γραμμών και αποδίδει καθαρούς διαλόγους σε παραγράφους ή μία γραμμή ανά υπότιτλο.',
    kw: 'εξαγωγή κειμένου υπότιτλων,srt σε txt,ass σε txt,vtt σε txt,υπότιτλοι απομαγνητοφώνηση,διάλογοι από srt,αφαίρεση χρόνων srt,subtitle to text,srt to txt',
    intro: 'Βγάλτε τους διαλόγους από υπότιτλους SRT / VTT / ASS / SBV / LRC / TXT ως καθαρό κείμενο: κωδικοί χρόνου, αριθμοί και ετικέτες στυλ φεύγουν αυτόματα.',
    feat: 'Δύο διατάξεις: συνεχείς παράγραφοι που κόβονται σε παύσεις και τελικά σημεία στίξης, ή μία γραμμή ανά υπότιτλο για λίστες διαλόγων. Ηχητικές σημειώσεις όπως "(χτυπάει το τηλέφωνο)", υδατογραφήματα και γραμμές που επαναλαμβάνονται αμέσως μετά η μία την άλλη βγαίνουν από προεπιλογή· ονόματα ομιλητών όπως "TOM:" και στίχους τραγουδιών τους κρατάτε ή πετάτε μόνοι σας. Οι αλλαγές γραμμής ενώνονται ανά γραφή: τα ιαπωνικά απευθείας, τα κορεατικά και το λατινικό αλφάβητο με κενό.',
    who: 'Όσοι θέλουν το κείμενο των υπότιτλων για σημειώσεις, σενάριο, εξάσκηση μετάφρασης ή άλλο εργαλείο, χωρίς να σβήνουν εκατοντάδες κωδικούς χρόνου στο χέρι.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Text Extractor'
  },
  'he': {
    title: 'חילוץ טקסט מכתוביות - SRT/ASS/VTT לטקסט | AI-SRTSub',
    desc: 'כלי אינטרנט חינמי: קורא SRT, VTT, ASS, SBV, LRC ו-TXT, מסיר קודי זמן ומספרי שורות, ומוציא דיאלוגים נקיים כפסקאות או שורה אחת לכל כתובית.',
    kw: 'חילוץ טקסט מכתוביות,srt לטקסט,ass לטקסט,vtt לטקסט,תמליל כתוביות,דיאלוגים מ-srt,הסרת קודי זמן srt,subtitle to text,srt to txt',
    intro: 'חלצו את הדיאלוגים מכתוביות SRT / VTT / ASS / SBV / LRC / TXT כטקסט נקי: קודי זמן, מספרים ותגיות עיצוב מוסרים אוטומטית.',
    feat: 'שתי פריסות: פסקאות רצופות הנחתכות בהפסקות ובסימני סוף משפט, או שורה אחת לכל כתובית לרשימות דיאלוגים. הערות קול כמו "(הטלפון מצלצל)", סימני מים ושורות החוזרות זו אחר זו מוסרות כברירת מחדל; שמות דוברים כמו "TOM:" ושורות שירים תשמרו או תסירו בעצמכם. שבירות השורות מאוחות לפי כתב: יפנית ישירות, קוריאנית ולטינית עם רווח.',
    who: 'מי שרוצה את טקסט הכתוביות לפתקים, לתסריט, לתרגול תרגום או לכלי אחר, בלי למחוק מאות קודי זמן ביד.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Text Extractor'
  },
  'ro': {
    title: 'Extrage textul din subtitrări - SRT/ASS/VTT în text | AI-SRTSub',
    desc: 'Instrument online gratuit: citește SRT, VTT, ASS, SBV, LRC și TXT, scoate timecode-urile și numerele de linii și livrează dialogurile curate ca paragrafe sau o linie per subtitrare.',
    kw: 'extrage text din subtitrări,srt în txt,ass în txt,vtt în txt,transcriere subtitrări,dialoguri din srt,șterge timecode srt,subtitle to text,srt to txt',
    intro: 'Scoate dialogurile din subtitrări SRT / VTT / ASS / SBV / LRC / TXT ca text curat: timecode-urile, numerele și etichetele de stil dispar automat.',
    feat: 'Două așezări: paragrafe continue tăiate la pauze și la punctuația de final de propoziție, sau o linie per subtitrare pentru liste de dialoguri. Indicațiile sonore precum "(sună telefonul)", mărcile de apă și liniile repetate una după alta dispar implicit; numele vorbitorilor precum "TOM:" și liniile de cântece le păstrezi sau le arunci tu. Ruperile de rând se reunesc după scriere: japoneza direct, coreeana și alfabetul latin cu spațiu.',
    who: 'Oricine vrea textul subtitrărilor pentru notițe, scenariu, exersarea traducerii sau alt instrument, fără să șteargă manual sute de timecode-uri.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Text Extractor'
  }
};

/* v0.9.313：第十一个页面 —— 视频内封字幕提取 /videosub.html 的 SEO 表。
   与前十张表同规格：title / desc / kw 是 head 三件套，intro / feat / who 是爬虫唯一能读到的
   静态正文三段（seoCopy 注入 <!--SEO-COPY-START-->），siteName / jsonldName 走品牌口径。 */
const SEO_VIDEOSUB = {
  'zh-CN': {
    title: '提取视频内封字幕 - MKV / MP4 里的字幕轨直接导出 SRT | 随心字幕 AI',
    desc: '免费在线提取 MKV、WebM、MP4、MOV 里内封的字幕轨，导出成 SRT / VTT / ASS / TXT。视频不上传、不转码，全在浏览器本地读取，几个 G 的片子也吃得下。多语言轨逐条列出，图形字幕会明说抽不了。',
    kw: '提取视频内封字幕,mkv 提取字幕,mp4 提取字幕,视频字幕转 srt,内嵌字幕导出,字幕轨导出,视频转 srt,mov 提取字幕,extract embedded subtitles,mkv to srt,mp4 subtitle extract',
    intro: '把封在 MKV / MP4 里的字幕轨直接读出来导出成 SRT —— 视频不上传，就在浏览器里翻。',
    feat: '认得纯文本轨、ASS 轨、WebVTT 轨与 MP4 的 mov_text / tx3g 轨，ASS 原轨自带的样式头与分辨率原样带回，按偏移小段读取所以几 GB 的文件也不占内存。',
    who: '拿到带内封字幕的片子想直接改字幕的人、压制组、要拿原文轨做翻译或双语的字幕组。',
    siteName: '随心字幕 AI', jsonldName: '随心字幕 AI', jsonldAlt: 'Video Embedded Subtitle Extractor'
  },
  'zh-TW': {
    title: '提取影片內封字幕 - MKV / MP4 裡的字幕軌直接匯出 SRT | 隨心字幕 AI',
    desc: '免費線上提取 MKV、WebM、MP4、MOV 裡內封的字幕軌，匯出成 SRT / VTT / ASS / TXT。影片不上傳、不轉檔，全在瀏覽器本機讀取，幾個 G 的片子也吃得下。多語言軌逐條列出，圖形字幕會明說抽不了。',
    kw: '提取影片內封字幕,mkv 提取字幕,mp4 提取字幕,影片字幕轉 srt,內嵌字幕匯出,字幕軌匯出,影片轉 srt,mov 提取字幕,extract embedded subtitles,mkv to srt,mp4 subtitle extract',
    intro: '把封在 MKV / MP4 裡的字幕軌直接讀出來匯出成 SRT —— 影片不上傳，就在瀏覽器裡翻。',
    feat: '認得純文字軌、ASS 軌、WebVTT 軌與 MP4 的 mov_text / tx3g 軌，ASS 原軌自帶的樣式頭與解析度原樣帶回，按偏移小段讀取所以幾 GB 的檔案也不佔記憶體。',
    who: '拿到有內封字幕的片子想直接改字幕的人、壓製組、要拿原文軌做翻譯或雙語的字幕組。',
    siteName: '隨心字幕 AI', jsonldName: '隨心字幕 AI', jsonldAlt: 'Video Embedded Subtitle Extractor'
  },
  'en': {
    title: 'Extract Embedded Subtitles from MKV / MP4 to SRT | AI-SRTSub',
    desc: "Extract embedded subtitles from MKV, WebM, MP4, MOV; export as SRT / VTT / ASS / TXT. No upload or re-encode — files are read in your browser; multi-GB OK.",
    kw: 'extract embedded subtitles,mkv to srt,mp4 subtitle extract,extract subtitles from video,embedded subtitle extractor,srt from mkv,mov subtitle extract,subtitle track export,vtt from mkv,extract soft subtitles,mkv subtitle rip',
    intro: 'Pull the subtitle track sealed inside an MKV or MP4 straight out into an SRT — no upload, it all happens in your browser.',
    feat: 'Reads plain-text, ASS, WebVTT and mov_text / tx3g tracks, keeps the original ASS header and resolution, and reads in small slices by offset so a huge file never fills memory.',
    who: 'Anyone with a movie carrying soft subtitles who wants the text out, encoding groups, and fansub teams starting from the original track.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Video Embedded Subtitle Extractor'
  },
  'ja': {
    title: '動画の内蔵字幕を取り出して SRT へ - MKV / MP4 対応 | AI-SRTSub',
    desc: 'MKV、WebM、MP4、MOV に内蔵された字幕トラックを無料で取り出し、SRT / VTT / ASS / TXT に書き出せます。アップロードも再エンコードもなく、ブラウザ内で読むので数 GB の動画でも大丈夫です。',
    kw: '内蔵字幕 取り出し,mkv 字幕 抽出,mp4 字幕 抽出,動画 字幕 srt,字幕トラック 抽出,srt 書き出し,mov 字幕 抽出,ソフト字幕 抽出,extract embedded subtitles,mkv to srt,mp4 subtitle extract',
    intro: 'MKV や MP4 に封じられた字幕トラックをそのまま取り出して SRT に。アップロード不要、ブラウザ内で完結します。',
    feat: 'プレーンテキスト、ASS、WebVTT、mov_text / tx3g の各トラックに対応。ASS の元ヘッダーと解像度はそのまま保持し、オフセット指定で小さく読むので大きなファイルでもメモリを圧迫しません。',
    who: 'ソフト字幕入りの動画からテキストを取り出したい人、エンコードグループ、原文トラックから翻訳や二か国語字幕を作る人。',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Video Embedded Subtitle Extractor'
  },
  'es': {
    title: 'Extraer subtítulos incrustados de MKV / MP4 a SRT | AI-SRTSub',
    desc: "Extrae gratis las pistas de subtítulos incrustadas en MKV, MP4 y MOV y expórtalas a SRT, VTT, ASS o TXT. Sin subida ni recodificación: se lee en tu navegador.",
    kw: 'extraer subtítulos incrustados,mkv a srt,extraer subtítulos mp4,sacar subtítulos del vídeo,exportar pista de subtítulos,srt desde mkv,mov extraer subtítulos,subtítulos sueltos,extract embedded subtitles,mkv to srt,mp4 subtitle extract',
    intro: 'Saca la pista de subtítulos incrustada en un MKV o MP4 y llévatela a SRT — sin subidas, todo ocurre en tu navegador.',
    feat: 'Lee pistas de texto plano, ASS, WebVTT y mov_text / tx3g, conserva la cabecera y resolución ASS originales y lee por fragmentos pequeños para no llenar la memoria.',
    who: 'Quien tiene una película con subtítulos incrustados y quiere el texto, los grupos de codificación y los equipos de fansub.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Video Embedded Subtitle Extractor'
  },
  'pt': {
    title: 'Extrair legendas embutidas de MKV / MP4 para SRT | AI-SRTSub',
    desc: "Extraia grátis as faixas de legenda embutidas em MKV, WebM, MP4 e MOV e exporte para SRT, VTT, ASS ou TXT. Sem upload nem recodificação: lido no navegador.",
    kw: 'extrair legendas embutidas,mkv para srt,extrair legenda mp4,tirar legenda do vídeo,exportar faixa de legenda,srt a partir de mkv,mov extrair legenda,legenda solta,extract embedded subtitles,mkv to srt,mp4 subtitle extract',
    intro: 'Tire a faixa de legenda embutida em um MKV ou MP4 e leve para SRT — sem upload, tudo acontece no seu navegador.',
    feat: 'Lê faixas de texto simples, ASS, WebVTT e mov_text / tx3g, mantém o cabeçalho e a resolução ASS originais e lê em pedaços pequenos para não encher a memória.',
    who: 'Quem tem um filme com legendas embutidas e quer o texto, grupos de encoding e equipes de fansub.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Video Embedded Subtitle Extractor'
  },
  'ko': {
    title: 'MKV / MP4 내장 자막 추출해서 SRT로 | AI-SRTSub',
    desc: 'MKV, WebM, MP4, MOV 안에 들어 있는 자막 트랙을 무료로 추출해 SRT / VTT / ASS / TXT로 내보냅니다. 업로드도 재인코딩도 없고 브라우저에서 바로 읽으니 몇 GB짜리 영상도 괜찮습니다.',
    kw: '내장 자막 추출,mkv 자막 추출,mp4 자막 추출,동영상 자막 srt,자막 트랙 추출,srt 변환,mov 자막 추출,소프트 자막 추출,extract embedded subtitles,mkv to srt,mp4 subtitle extract',
    intro: 'MKV나 MP4 안에 든 자막 트랙을 그대로 꺼내 SRT로 만듭니다. 업로드 없이 브라우저에서 끝납니다.',
    feat: '일반 텍스트, ASS, WebVTT, mov_text / tx3g 트랙을 읽고 ASS 원본 헤더와 해상도를 그대로 유지합니다. 오프셋으로 조금씩 읽어 큰 파일도 메모리를 잡아먹지 않습니다.',
    who: '소프트 자막이 든 영상에서 텍스트를 뽑고 싶은 사람, 인코딩 팀, 원문 트랙에서 번역이나 이중 자막을 만드는 팀.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Video Embedded Subtitle Extractor'
  },
  'de': {
    title: 'Eingebettete Untertitel aus MKV / MP4 als SRT extrahieren | AI-SRTSub',
    desc: "Extrahieren Sie kostenlos Untertitelspuren aus MKV, MP4, MOV und exportieren als SRT, VTT, ASS oder TXT. Kein Upload — Dateien werden im Browser gelesen.",
    kw: 'eingebettete untertitel extrahieren,mkv zu srt,untertitel aus mp4 extrahieren,untertitel aus video holen,untertitelspur exportieren,srt aus mkv,mov untertitel extrahieren,softsubs extrahieren,extract embedded subtitles,mkv to srt,mp4 subtitle extract',
    intro: 'Holt die Untertitelspur aus einer MKV oder MP4 direkt als SRT heraus — ohne Upload, alles im Browser.',
    feat: 'Liest Klartext-, ASS-, WebVTT- und mov_text- / tx3g-Spuren, behält den originalen ASS-Kopf mit Auflösung und liest in kleinen Stücken, damit große Dateien den Speicher nicht füllen.',
    who: 'Wer einen Film mit Softsubs hat und den Text braucht, Encoding-Gruppen und Fansub-Teams.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Video Embedded Subtitle Extractor'
  },
  'fr': {
    title: 'Extraire les sous-titres intégrés de MKV / MP4 vers SRT | AI-SRTSub',
    desc: "Extrayez gratuitement la piste de sous-titres d'un MKV, MP4 ou MOV; export en SRT, VTT, ASS ou TXT. Aucun envoi ni réencodage : lu dans votre navigateur.",
    kw: 'extraire sous-titres intégrés,mkv vers srt,extraire sous-titres mp4,récupérer sous-titres vidéo,exporter piste sous-titres,srt depuis mkv,mov extraire sous-titres,softsubs,extract embedded subtitles,mkv to srt,mp4 subtitle extract',
    intro: 'Sortez la piste de sous-titres intégrée à un MKV ou MP4 directement en SRT — sans envoi, tout se passe dans le navigateur.',
    feat: 'Lit les pistes texte brut, ASS, WebVTT et mov_text / tx3g, conserve l’en-tête et la résolution ASS d’origine, et lit par petits blocs pour ne pas saturer la mémoire.',
    who: 'Ceux qui ont un film avec sous-titres incrustés et veulent le texte, les groupes d’encodage et les équipes de fansub.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Video Embedded Subtitle Extractor'
  },
  'id': {
    title: 'Ekstrak Subtitle Tertanam dari MKV / MP4 ke SRT | AI-SRTSub',
    desc: "Ekstrak gratis trek subtitle yang tertanam di MKV, WebM, MP4 dan MOV lalu ekspor ke SRT, VTT, ASS atau TXT. Tanpa upload: berkas dibaca di browser.",
    kw: 'ekstrak subtitle tertanam,mkv ke srt,ekstrak subtitle mp4,ambil subtitle dari video,ekspor trek subtitle,srt dari mkv,mov ekstrak subtitle,softsub,extract embedded subtitles,mkv to srt,mp4 subtitle extract',
    intro: 'Keluarkan trek subtitle yang tertanam di MKV atau MP4 langsung menjadi SRT — tanpa upload, semuanya di browser.',
    feat: 'Membaca trek teks biasa, ASS, WebVTT, dan mov_text / tx3g, mempertahankan header dan resolusi ASS asli, serta membaca per potongan kecil agar memori tidak penuh.',
    who: 'Siapa pun yang punya film bersubtitle lunak dan ingin teksnya, grup encoding, dan tim fansub.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Video Embedded Subtitle Extractor'
  },
  'hi': {
    title: 'MKV / MP4 में एम्बेडेड सबटाइटल निकालें - SRT में | AI-SRTSub',
    desc: "MKV, WebM, MP4 और MOV के अंदर बंद सबटाइटल ट्रैक मुफ़्त में निकालें और SRT / VTT / ASS / TXT में एक्सपोर्ट करें। अपलोड नहीं: फ़ाइल ब्राउज़र में पढ़ी जाती है।",
    kw: 'एम्बेडेड सबटाइटल निकालें,mkv से srt,mp4 सबटाइटल निकालें,वीडियो से सबटाइटल,srt में बदलें,mov सबटाइटल निकालें,सॉफ्ट सबटाइटल,subtitle track export,extract embedded subtitles,mkv to srt,mp4 subtitle extract',
    intro: 'MKV या MP4 में छिपी सबटाइटल ट्रैक को सीधे SRT में निकालें — अपलोड नहीं, सब आपके ब्राउज़र में।',
    feat: 'प्लेन टेक्स्ट, ASS, WebVTT और mov_text / tx3g ट्रैक पढ़ता है; ASS का मूल हेडर और रिज़ॉल्यूशन वैसा ही रहता है; छोटे हिस्सों में पढ़ता है इसलिए बड़ी फ़ाइल भी मेमोरी नहीं भरती।',
    who: 'जिसके पास सॉफ्ट सबटाइटल वाली फ़िल्म है और टेक्स्ट चाहिए, एन्कोडिंग ग्रुप, और फैनसब टीम।',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Video Embedded Subtitle Extractor'
  },
  'th': {
    title: 'ดึงซับไตเติลใน MKV / MP4 ออกเป็น SRT | AI-SRTSub',
    desc: 'ดึงแทร็กซับไตเติลที่ฝังอยู่ใน MKV, WebM, MP4 และ MOV ได้ฟรี แล้วส่งออกเป็น SRT / VTT / ASS / TXT ไม่ต้องอัปโหลด ไม่ต้องเข้ารหัสใหม่ อ่านไฟล์ในเบราว์เซอร์ของคุณเอง หนังหลายกิกะไบต์ก็ทำได้',
    kw: 'ดึงซับไตเติลที่ฝังมา,mkv เป็น srt,ดึงซับไตเติล mp4,แปลงซับไตเติลเป็น srt,mov ดึงซับไตเติล,ส่งออกแทร็กซับไตเติล,ซับไตเติลแบบซอฟต์,subtitle track export,extract embedded subtitles,mkv to srt,mp4 subtitle extract',
    intro: 'ดึงแทร็กซับไตเติลใน MKV หรือ MP4 ออกมาเป็น SRT ได้เลย — ไม่ต้องอัปโหลด ทำในเบราว์เซอร์ทั้งหมด',
    feat: 'อ่านแทร็กข้อความธรรมดา, ASS, WebVTT และ mov_text / tx3g เก็บส่วนหัวและความละเอียดของ ASS ไว้ตามต้นฉบับ และอ่านทีละส่วนเล็ก ๆ จึงไม่กินหน่วยความจำ',
    who: 'คนที่มีหนังพร้อมซับไตเติลแบบซอฟต์และต้องการข้อความ กลุ่มทีมเข้ารหัส และทีมซับไตเติลแฟนคลับ',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Video Embedded Subtitle Extractor'
  },
  'vi': {
    title: 'Trích phụ đề nhúng từ MKV / MP4 sang SRT | AI-SRTSub',
    desc: "Trích miễn phí phụ đề nằm trong MKV, WebM, MP4 và MOV rồi xuất ra SRT / VTT / ASS / TXT. Không tải lên, không mã hóa lại: tệp được đọc trong trình duyệt.",
    kw: 'trích phụ đề nhúng,mkv sang srt,trích phụ đề mp4,lấy phụ đề từ video,xuất track phụ đề,srt từ mkv,mov trích phụ đề,softsub,subtitle track export,extract embedded subtitles,mkv to srt',
    intro: 'Lấy track phụ đề đang nằm trong MKV hoặc MP4 ra thẳng thành SRT — không tải lên, mọi thứ trong trình duyệt.',
    feat: 'Đọc track văn bản thuần, ASS, WebVTT và mov_text / tx3g, giữ nguyên header và độ phân giải ASS gốc, đọc từng phần nhỏ nên file lớn không chiếm bộ nhớ.',
    who: 'Người có phim kèm phụ đề mềm và muốn lấy văn bản, nhóm encode, và đội làm phụ đề fansub.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Video Embedded Subtitle Extractor'
  },
  'ru': {
    title: 'Извлечь встроенные субтитры из MKV / MP4 в SRT | AI-SRTSub',
    desc: "Извлеките дорожку субтитров из MKV, WebM, MP4, MOV и экспортируйте в SRT, VTT, ASS или TXT. Без загрузки и перекодирования: файл читается в браузере.",
    kw: 'извлечь встроенные субтитры,mkv в srt,извлечь субтитры из mp4,достать субтитры из видео,экспорт дорожки субтитров,srt из mkv,mov извлечь субтитры,софтсабы,subtitle track export,extract embedded subtitles,mkv to srt',
    intro: 'Вытащите дорожку субтитров из MKV или MP4 прямо в SRT — без загрузки, всё в вашем браузере.',
    feat: 'Читает дорожки обычного текста, ASS, WebVTT и mov_text / tx3g, сохраняет исходный заголовок ASS с разрешением и читает небольшими фрагментами, поэтому большой файл не забьёт память.',
    who: 'Тем, у кого фильм с мягкими субтитрами и нужен текст, группам кодирования и командам фэнсаба.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Video Embedded Subtitle Extractor'
  },
  'it': {
    title: 'Estrarre i sottotitoli incorporati da MKV / MP4 in SRT | AI-SRTSub',
    desc: "Estraete gratis la traccia di sottotitoli da MKV, WebM, MP4 e MOV ed esportatela in SRT, VTT, ASS o TXT. Nessun upload: il file si legge nel browser.",
    kw: 'estrarre sottotitoli incorporati,mkv in srt,estrarre sottotitoli mp4,prendere sottotitoli dal video,esportare traccia sottotitoli,srt da mkv,mov estrarre sottotitoli,softsub,subtitle track export,extract embedded subtitles,mkv to srt',
    intro: 'Tirate fuori la traccia di sottotitoli da un MKV o MP4 direttamente in SRT — senza upload, tutto nel browser.',
    feat: 'Legge tracce di testo semplice, ASS, WebVTT e mov_text / tx3g, conserva intestazione e risoluzione ASS originali e legge a piccoli blocchi, così un file grande non riempie la memoria.',
    who: 'Chi ha un film con sottotitoli morbidi e vuole il testo, i gruppi di encoding e le squadre di fansub.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Video Embedded Subtitle Extractor'
  },
  'ar': {
    title: 'استخراج الترجمة المدمجة من MKV / MP4 إلى SRT | AI-SRTSub',
    desc: 'استخرج مجاناً مسار الترجمة المدمج داخل MKV وWebM وMP4 وMOV وصدّره كملف SRT أو VTT أو ASS أو TXT. بلا رفع وبلا إعادة ترميز: يُقرأ الملف في متصفحك، وفيلم بحجم عدة غيغابايت ليس مشكلة.',
    kw: 'استخراج الترجمة المدمجة,mkv إلى srt,استخراج ترجمة mp4,استخراج ترجمة من الفيديو,تصدير مسار الترجمة,srt من mkv,mov استخراج ترجمة,ترجمة ناعمة,subtitle track export,extract embedded subtitles,mkv to srt',
    intro: 'أخرج مسار الترجمة من داخل MKV أو MP4 مباشرة إلى SRT — بلا رفع، كل شيء يجري في المتصفح.',
    feat: 'يقرأ مسارات النص العادي وASS وWebVTT وmov_text / tx3g، ويحافظ على ترويسة ASS ودقتها الأصلية، ويقرأ على دفعات صغيرة فلا يمتلئ الذاكرة.',
    who: 'من لديه فيلم بترجمة مدمجة ويريد النص، ومجموعات الترميز، وفرق ترجمة المعجبين.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Video Embedded Subtitle Extractor'
  },
  'tr': {
    title: 'MKV / MP4 içindeki gömülü altyazıyı SRT olarak çıkar | AI-SRTSub',
    desc: "MKV, WebM, MP4 ve MOV içindeki altyazı parçasını ücretsiz çıkarıp SRT, VTT, ASS veya TXT olarak dışa aktarın. Yükleme yok: dosya tarayıcınızda okunur.",
    kw: 'gömülü altyazı çıkarma,mkv srt dönüştür,mp4 altyazı çıkar,videodan altyazı alma,srt olarak aktar,mov altyazı çıkar,yumuşak altyazı,altyazı parçası dışa aktar,extract embedded subtitles,mkv to srt,mp4 subtitle extract',
    intro: 'Bir MKV veya MP4 dosyasındaki altyazı parçasını doğrudan SRT olarak çıkarın — yükleme yok, hepsi tarayıcıda.',
    feat: 'Düz metin, ASS, WebVTT ve mov_text / tx3g parçalarını okur, ASS başlığını ve çözünürlüğünü korur, küçük parçalarla okuduğu için büyük dosya belleği doldurmaz.',
    who: 'Filminde yumuşak altyazı olup metni isteyenler, kodlama grupları ve fansub ekipleri.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Video Embedded Subtitle Extractor'
  },
  'nl': {
    title: 'Ingebedde ondertiteling uit MKV / MP4 naar SRT halen | AI-SRTSub',
    desc: "Haal gratis het ondertitelspoor uit MKV, WebM, MP4 en MOV en exporteer als SRT, VTT, ASS of TXT. Geen upload: het bestand wordt in je browser gelezen.",
    kw: 'ingebedde ondertiteling extraheren,mkv naar srt,ondertitel uit mp4 halen,ondertitel uit video,srt maken van mkv,mov ondertitel extraheren,softsub,ondertitelspoor exporteren,extract embedded subtitles,mkv to srt,mp4 subtitle extract',
    intro: 'Haal het ondertitelspoor uit een MKV of MP4 direct als SRT naar buiten — geen upload, alles in je browser.',
    feat: 'Leest tekst-, ASS-, WebVTT- en mov_text- / tx3g-sporen, behoudt de oorspronkelijke ASS-header en resolutie, en leest in kleine stukken zodat een groot bestand het geheugen niet vult.',
    who: 'Wie een film met zachte ondertiteling heeft en de tekst wil, encoding-groepen en fansubteams.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Video Embedded Subtitle Extractor'
  },
  'pl': {
    title: 'Wyciągnij osadzone napisy z MKV / MP4 do SRT | AI-SRTSub',
    desc: "Wyciągnij za darmo ścieżkę napisów z MKV, WebM, MP4 i MOV i wyeksportuj jako SRT, VTT, ASS lub TXT. Bez wysyłania i rekompresji: plik czytany w przeglądarce.",
    kw: 'wyciągnij osadzone napisy,mkv do srt,napisy z mp4,napisy z wideo,eksport ścieżki napisów,srt z mkv,mov napisy,softsub,wyodrębnianie napisów,extract embedded subtitles,mkv to srt',
    intro: 'Wyciągnij ścieżkę napisów z MKV lub MP4 prosto do SRT — bez wysyłania, wszystko w przeglądarce.',
    feat: 'Czyta ścieżki zwykłego tekstu, ASS, WebVTT i mov_text / tx3g, zachowuje oryginalny nagłówek ASS i rozdzielczość, czyta małymi fragmentami, więc duży plik nie zapcha pamięci.',
    who: 'Osoby z filmem z miękkimi napisami, grupy encodingowe i zespoły fansub.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Video Embedded Subtitle Extractor'
  },
  'sv': {
    title: 'Extrahera inbäddad undertext från MKV / MP4 till SRT | AI-SRTSub',
    desc: "Extrahera gratis textspåret i MKV, WebM, MP4 och MOV och exportera som SRT, VTT, ASS eller TXT. Ingen uppladdning eller omkodning: filen läses i webbläsaren.",
    kw: 'extrahera inbäddad undertext,mkv till srt,undertext från mp4,undertext från video,exportera textspår,srt från mkv,mov undertext extrahera,softsub,extrahera undertext,extract embedded subtitles,mkv to srt',
    intro: 'Ta ut textspåret ur en MKV eller MP4 direkt som SRT — ingen uppladdning, allt i webbläsaren.',
    feat: 'Läser text-, ASS-, WebVTT- och mov_text- / tx3g-spår, behåller originalets ASS-huvud och upplösning och läser i små bitar så en stor fil inte fyller minnet.',
    who: 'Den som har en film med mjuk undertext och vill ha texten, encodinggrupper och fansubteam.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Video Embedded Subtitle Extractor'
  },
  'cs': {
    title: 'Extrahujte vložené titulky z MKV / MP4 do SRT | AI-SRTSub',
    desc: 'Zdarma extrahujte titulkovou stopu uzavřenou v MKV, WebM, MP4 a MOV a exportujte do SRT, VTT, ASS nebo TXT. Bez nahrávání a bez překódování: soubor se čte lokálně ve vašem prohlížeči.',
    kw: 'extrahovat vložené titulky,mkv do srt,mp4 titulky extrahovat,extrahovat titulky z videa,titulková stopa export,srt z mkv,mov titulky,export titulků,vtt z mkv,extrahovat měkké titulky,mkv titulky rip',
    intro: 'Vytáhněte titulkovou stopu z MKV nebo MP4 rovnou do SRT — bez nahrávání, vše ve vašem prohlížeči.',
    feat: 'Přečte textové stopy, ASS, WebVTT i mov_text / tx3g, zachová původní ASS hlavičku a rozlišení a čte po malých úsecích podle offsetu, takže velký soubor nezaplní paměť.',
    who: 'Kdokoli s filmem s měkkými titulky, kdo chce text ven, encoding skupiny a fansub týmy začínající od původní stopy.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Video Embedded Subtitle Extractor'
  },
  'uk': {
    title: 'Витягти вбудовані субтитри з MKV / MP4 у SRT | AI-SRTSub',
    desc: 'Безкоштовно витягніть доріжку субтитрів, запаковану в MKV, WebM, MP4 і MOV, та експортуйте в SRT, VTT, ASS або TXT. Без завантаження і перекодування: файл читається локально у вашому браузері.',
    kw: 'витягти вбудовані субтитри,mkv в srt,субтитри з mp4,витягти субтитри з відео,експорт доріжки субтитрів,srt з mkv,субтитри mov,експорт субтитрів,vtt з mkv,витягти softsub,субтитри з mkv',
    intro: 'Витягніть доріжку субтитрів з MKV або MP4 прямо в SRT — без завантаження, все у вашому браузері.',
    feat: 'Читає текстові доріжки, ASS, WebVTT і mov_text / tx3g, зберігає оригінальний ASS-заголовок і роздільність і читає невеликими фрагментами за зміщенням, тому великий файл не заповнює пам\'ять.',
    who: 'Усі, хто має фільм із м\'якими субтитрами і хоче дістати текст, групи кодування та команди фансабу.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Video Embedded Subtitle Extractor'
  },
  'da': {
    title: 'Udtræk indlejrede undertekster fra MKV / MP4 til SRT | AI-SRTSub',
    desc: 'Udtræk gratis undertekstsporet i MKV, WebM, MP4 og MOV og eksportér til SRT, VTT, ASS eller TXT. Ingen upload, ingen omkodning: filen læses lokalt i din browser.',
    kw: 'udtræk indlejrede undertekster,mkv til srt,mp4 undertekster udtræk,udtræk undertekster fra video,eksporter undertekstspor,srt fra mkv,mov undertekster,eksport undertekster,vtt fra mkv,udtræk softsubs,mkv undertekster rip',
    intro: 'Træk undertekstsporet ud af en MKV eller MP4 direkte som SRT — ingen upload, det hele i din browser.',
    feat: 'Læser tekst-, ASS-, WebVTT- og mov_text-/tx3g-spor, bevarer originalens ASS-hoved og opløsning og læser i små udsnit efter offset, så en stor fil ikke fylder hukommelsen.',
    who: 'Alle med en film med softsubs der vil have teksten ud, encodinggrupper og fansub-hold der starter fra originalsporet.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Video Embedded Subtitle Extractor'
  },
  'fi': {
    title: "Pura upotetut tekstitykset MKV/MP4-tiedostosta SRT-muotoon",
    desc: 'Ilmainen verkkotyökalu MKV-, WebM-, MP4- ja MOV-tiedostoihin upotetun tekstitysraidan purkamiseen — vienti SRT-, VTT-, ASS- tai TXT-muotoon. Ei latausta, ei uudelleenkoodausta.',
    kw: 'purista upotetut tekstitykset,mkv srt-muotoon,mp4 tekstitys purkaa,tekstitykset videosta,tekstitysraita vienti,srt mkv-tiedostosta,mov tekstitys,vienti tekstitykset,vtt mkv,pehmeät tekstitykset,mkv tekstitykset',
    intro: 'Pura MKV- tai MP4-tiedostoon upotettu tekstitysraita suoraan SRT-muotoon — ei latausta, kaikki tapahtuu selaimessasi.',
    feat: 'Lukee teksti-, ASS-, WebVTT- ja mov_text-/tx3g-raidat, säilyttää alkuperäisen ASS-otsikon ja resoluution ja lukee pienissä osissa, jolloin suuri tiedosto ei täytä muistia.',
    who: 'Kaikki, joilla on elokuva pehmeillä tekstityksillä ja jotka haluavat tekstin ulos, koodausryhmät ja fansub-tiimit.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Video Embedded Subtitle Extractor'
  },
  'el': {
    title: 'Εξαγωγή ενσωματωμένων υποτίτλων από MKV / MP4 σε SRT | AI-SRTSub',
    desc: 'Δωρεάν εξαγωγή του κομματιού υποτίτλων μέσα σε MKV, WebM, MP4 και MOV — εξαγωγή σε SRT, VTT, ASS ή TXT. Χωρίς μεταφόρτωση και επανακωδικοποίηση: το αρχείο διαβάζεται τοπικά.',
    kw: 'εξαγωγή ενσωματωμένων υποτίτλων,mkv σε srt,εξαγωγή υποτίτλων mp4,υπότιτλοι από βίντεο,εξαγωγή κομματιού υποτίτλων,srt από mkv,υπότιτλοι mov,εξαγωγή υποτίτλων,vtt από mkv,εξαγωγή softsubs,mkv υπότιτλοι',
    intro: 'Βγάλτε το κομμάτι υποτίτλων από ένα MKV ή MP4 κατευθείαν σε SRT — χωρίς μεταφόρτωση, όλα στον περιηγητή σας.',
    feat: 'Διαβάζει κομμάτια κειμένου, ASS, WebVTT και mov_text / tx3g, κρατά την αυθεντική ASS κεφαλίδα και ανάλυση και διαβάζει σε μικρά τμήματα ώστε να μη γεμίζει τη μνήμη.',
    who: 'Όσοι έχουν ταινία με softsubs και θέλουν το κείμενο, ομάδες κωδικοποίησης και ομάδες fansub.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Video Embedded Subtitle Extractor'
  },
  'he': {
    title: 'חילוץ כתוביות מובנות מ-MKV / MP4 ל-SRT | AI-SRTSub',
    desc: 'חילוץ חינמי באינטרנט לרצועת כתוביות שסגורה ב-MKV, WebM, MP4 ו-MOV — ייצוא ל-SRT, VTT, ASS או TXT. בלי העלאה ובלי המרה מחדש: הקובץ נקרא מקומית בדפדפן שלכם.',
    kw: 'חילוץ כתוביות מובנות,mkv ל-srt,חילוץ כתוביות mp4,כתוביות מסרטון,ייצוא רצועת כתוביות,srt מ-mkv,כתוביות mov,ייצוא כתוביות,vtt מ-mkv,חילוץ כתוביות רכות,mkv כתוביות',
    intro: 'הוציאו את רצועת הכתוביות מתוך MKV או MP4 ישר ל-SRT — בלי העלאה, הכול בדפדפן שלכם.',
    feat: 'קורא רצועות טקסט, ASS, WebVTT ו-mov_text / tx3g, שומר על כותרת ה-ASS והרזולוציה המקוריים וקורא במקטעים קטנים, כך שקובץ ענק לא ממלא את הזיכרון.',
    who: 'כל מי שיש לו סרט עם כתוביות רכות ורוצה את הטקסט החוצה, קבוצות קידוד וצוותי fansub.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Video Embedded Subtitle Extractor'
  },
  'ro': {
    title: 'Extrage subtitrările încorporate din MKV / MP4 în SRT | AI-SRTSub',
    desc: 'Extrage gratuit pista de subtitrări din MKV, WebM, MP4 și MOV și exportă în SRT, VTT, ASS sau TXT. Fără încărcare și fără reencodare: fișierul este citit local în browserul tău.',
    kw: 'extrage subtitrări încorporate,mkv în srt,extrage subtitrări mp4,subtitrări din video,export pistă subtitrări,srt din mkv,subtitrări mov,export subtitrări,vtt din mkv,extrage softsub-uri,mkv subtitrări',
    intro: 'Scoate pista de subtitrări dintr-un MKV sau MP4 direct în SRT — fără încărcare, totul în browserul tău.',
    feat: 'Citește piste text, ASS, WebVTT și mov_text / tx3g, păstrează antetul ASS și rezoluția originale și citește în bucăți mici după offset, astfel încât un fișier mare nu umple memoria.',
    who: 'Oricine are un film cu softsub-uri și vrea textul afară, grupuri de encodare și echipe de fansub.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Video Embedded Subtitle Extractor'
  }
};

/* v0.9.313：第十二个页面 —— 中文字幕繁简转换 /hanconv.html 的 SEO 表。
   与前十张表同规格：title / desc / kw 是 head 三件套，intro / feat / who 是爬虫唯一能读到的
   静态正文三段（seoCopy 注入 <!--SEO-COPY-START-->），siteName / jsonldName 走品牌口径。 */
const SEO_HANCONV = {
  'zh-CN': {
    title: '字幕简繁转换 - 简体转繁体只动台词 | 随心字幕 AI',
    desc: '免费在线给字幕做简繁转换：简体转繁体、台湾正体、香港繁体，也能整份转回简体。时间轴、序号、ASS 样式指令一个字都不动，只换台词正文。词库来自 OpenCC，一简对多繁不会转错。',
    kw: '简繁转换,简体转繁体,繁体转简体,字幕简繁转换,srt 简繁转换,台湾正体,香港繁体,繁简互转,chinese subtitle converter,simplified to traditional,srt traditional chinese',
    intro: '一份字幕整份简繁互转，只换台词正文 —— 时间轴、序号与 ASS 样式指令一个字都不动。',
    feat: '九个方向：通用繁体、台湾用词、台湾字形、香港繁体、转回简体、繁体之间换字形。词库来自 OpenCC，长词优先，一简对多繁按词组判定。',
    who: '要把字幕发给台湾或香港观众的人、做两岸三地版本的发行方、接到繁体字幕想转成简体再加工的人。',
    siteName: '随心字幕 AI', jsonldName: '随心字幕 AI', jsonldAlt: 'Chinese Simplified Traditional Converter'
  },
  'zh-TW': {
    title: '字幕簡繁轉換 - 簡體轉繁體只動台詞 | 隨心字幕 AI',
    desc: '免費線上給字幕做簡繁轉換：簡體轉繁體、台灣正體、香港繁體，也能整份轉回簡體。時間軸、序號、ASS 樣式指令一個字都不動，只換台詞正文。詞庫來自 OpenCC，一簡對多繁不會轉錯。',
    kw: '簡繁轉換,簡體轉繁體,繁體轉簡體,字幕簡繁轉換,srt 簡繁轉換,台灣正體,香港繁體,繁簡互轉,chinese subtitle converter,simplified to traditional,srt traditional chinese',
    intro: '一份字幕整份簡繁互轉，只換台詞正文 —— 時間軸、序號與 ASS 樣式指令一個字都不動。',
    feat: '九個方向：通用繁體、台灣用詞、台灣字形、香港繁體、轉回簡體、繁體之間換字形。詞庫來自 OpenCC，長詞優先，一簡對多繁按詞組判定。',
    who: '要把字幕發給台灣或香港觀眾的人、做兩岸三地版本的發行方、接到繁體字幕想轉成簡體再加工的人。',
    siteName: '隨心字幕 AI', jsonldName: '隨心字幕 AI', jsonldAlt: 'Chinese Simplified Traditional Converter'
  },
  'en': {
    title: 'Chinese Subtitle Converter - Simplified ⇄ Traditional | AI-SRTSub',
    desc: "Free Chinese subtitle converter: Simplified ⇄ Traditional (Taiwan / Hong Kong) and back. Only dialogue changes — timecodes and ASS tags stay. Built on OpenCC.",
    kw: 'chinese subtitle converter,simplified to traditional,traditional to simplified,srt traditional chinese,convert subtitle chinese,taiwan traditional chinese,hong kong traditional chinese,han conversion,convert srt to traditional chinese,simplified chinese srt,opencc subtitle',
    intro: 'Convert a whole subtitle file between Simplified and Traditional, changing nothing but the dialogue.',
    feat: 'Nine directions: general Traditional, Taiwan vocabulary, Taiwan forms, Hong Kong, back to Simplified, and Traditional-to-Traditional regional forms. Uses the OpenCC dictionary with longest-match-first phrase resolution.',
    who: 'Anyone delivering subtitles to Taiwanese or Hong Kong audiences, distributors preparing regional versions, and editors who received a Traditional file and want Simplified.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Chinese Simplified Traditional Converter'
  },
  'ja': {
    title: '字幕の繁簡変換 - 簡体字と繁体字を一括変換 | AI-SRTSub',
    desc: '字幕ファイルを無料で繁簡変換：簡体字から繁体字（台湾・香港）へ、そして繁体字から簡体字へも一括で変換します。タイムコード、通し番号、ASS のスタイル指定には一切触れません。辞書は OpenCC 由来です。',
    kw: '繁簡変換,簡体字 繁体字 変換,srt 繁体字,字幕 中国語 変換,台湾 繁体字,香港 繁体字,繁体字 簡体字 変換,字幕 変換,chinese subtitle converter,simplified to traditional,srt traditional chinese',
    intro: '字幕ファイルをまるごと繁簡変換。変わるのはセリフだけで、時間軸やスタイル指定はそのままです。',
    feat: '9 方向対応：共通繁体字、台湾の語彙、台湾の字体、香港、簡体字への逆変換、繁体字どうしの字体変換。OpenCC 辞書で longest-match により語単位で判定します。',
    who: '台湾・香港向けに字幕を出す人、地域別バージョンを作る配給元、繁体字字幕を簡体字に直して編集したい人。',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Chinese Simplified Traditional Converter'
  },
  'es': {
    title: 'Convertir subtítulos chino simplificado y tradicional | AI-SRTSub',
    desc: "Conversor gratuito de chino para subtítulos: simplificado ⇄ tradicional (Taiwán/Hong Kong). Solo cambian los diálogos; códigos y etiquetas ASS intactos.",
    kw: 'convertir chino simplificado tradicional,subtítulos chino tradicional,srt chino tradicional,convertir subtítulos chino,chino de taiwán,chino de hong kong,simplificado a tradicional,opencc subtítulos,chinese subtitle converter,simplified to traditional,srt traditional chinese',
    intro: 'Convierte un archivo de subtítulos completo entre simplificado y tradicional sin tocar nada más que los diálogos.',
    feat: 'Nueve direcciones: tradicional general, vocabulario de Taiwán, formas de Taiwán, Hong Kong, vuelta al simplificado y formas regionales. Usa el diccionario OpenCC con resolución por frase.',
    who: 'Quien entrega subtítulos a público taiwanés o hongkonés, distribuidores con versiones regionales y editores que reciben un archivo tradicional.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Chinese Simplified Traditional Converter'
  },
  'pt': {
    title: 'Converter legendas do chinês simplificado e tradicional | AI-SRTSub',
    desc: "Conversor gratuito de chinês para legendas: simplificado ⇄ tradicional (Taiwan/Hong Kong). Só os diálogos mudam; códigos de tempo e tags ASS ficam intactos.",
    kw: 'converter chinês simplificado tradicional,legendas chinês tradicional,srt chinês tradicional,converter legenda chinesa,chinês de taiwan,chinês de hong kong,simplificado para tradicional,opencc legendas,chinese subtitle converter,simplified to traditional,srt traditional chinese',
    intro: 'Converta um arquivo de legendas inteiro entre simplificado e tradicional sem mexer em nada além dos diálogos.',
    feat: 'Nove direções: tradicional geral, vocabulário de Taiwan, formas de Taiwan, Hong Kong, volta ao simplificado e formas regionais. Usa o dicionário OpenCC com decisão por palavra.',
    who: 'Quem entrega legendas para público de Taiwan ou Hong Kong, distribuidores com versões regionais e editores que recebem arquivo tradicional.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Chinese Simplified Traditional Converter'
  },
  'ko': {
    title: '자막 한자 간번 변환 - 간체자 ↔ 번체자 | AI-SRTSub',
    desc: '자막 전용 무료 한자 변환기: 간체자를 번체자(대만·홍콩)로, 번체자를 다시 간체자로 한 번에 바꿉니다. 타임코드·번호·ASS 스타일 태그는 전혀 건드리지 않습니다. OpenCC 사전 기반입니다.',
    kw: '한자 변환,간체자 번체자 변환,srt 번체자,자막 중국어 변환,대만 번체자,홍콩 번체자,번체자 간체자 변환,자막 변환,chinese subtitle converter,simplified to traditional,srt traditional chinese',
    intro: '자막 파일 전체를 간체자와 번체자 사이에서 변환합니다. 바뀌는 것은 대사뿐입니다.',
    feat: '아홉 가지 방향: 공통 번체자, 대만 어휘, 대만 자형, 홍콩, 간체자로 되돌리기, 번체자 간 자형 변환. OpenCC 사전으로 낱말 단위 longest-match 판정을 씁니다.',
    who: '대만·홍콩 시청자에게 자막을 내보내는 사람, 지역별 버전을 만드는 배급사, 번체자 자막을 받아 간체자로 고치려는 편집자.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Chinese Simplified Traditional Converter'
  },
  'de': {
    title: "Chinesische Untertitel - Vereinfacht ⇄ Traditionell",
    desc: "Kostenloser chinesischer Untertitel-Konverter: vereinfacht ⇄ traditionell (Taiwan/Hongkong). Nur die Dialoge ändern sich — Zeitcodes und ASS-Stile bleiben.",
    kw: 'chinesische untertitel umwandeln,vereinfacht zu traditionell,srt traditionelles chinesisch,untertitel chinesisch konvertieren,taiwan chinesisch,hongkong chinesisch,traditionell zu vereinfacht,opencc untertitel,chinese subtitle converter,simplified to traditional,srt traditional chinese',
    intro: 'Eine ganze Untertiteldatei zwischen Vereinfacht und Traditionell umwandeln, ohne etwas anderes als die Dialoge anzufassen.',
    feat: 'Neun Richtungen: allgemeines Traditionell, Taiwan-Wortschatz, Taiwan-Formen, Hongkong, zurück zu Vereinfacht und regionale Formen. Mit dem OpenCC-Wörterbuch und Entscheidung auf Wortebene.',
    who: 'Wer Untertitel für Taiwan oder Hongkong ausliefert, Verteiler mit Regionalfassungen und Editoren mit traditioneller Quelldatei.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Chinese Simplified Traditional Converter'
  },
  'fr': {
    title: "Convertir les sous-titres chinois simplifié et traditionnel",
    desc: "Convertisseur gratuit pour sous-titres chinois : simplifié ⇄ traditionnel (Taïwan/Hong Kong). Seuls les dialogues changent — codes et balises ASS intacts.",
    kw: 'convertir chinois simplifié traditionnel,sous-titres chinois traditionnel,srt chinois traditionnel,convertir sous-titres chinois,chinois de taïwan,chinois de hong kong,simplifié vers traditionnel,opencc sous-titres,chinese subtitle converter,simplified to traditional,srt traditional chinese',
    intro: 'Convertissez un fichier de sous-titres entier entre le simplifié et le traditionnel sans toucher à autre chose que les dialogues.',
    feat: 'Neuf sens : traditionnel général, vocabulaire de Taïwan, formes de Taïwan, Hong Kong, retour au simplifié et formes régionales. S’appuie sur le dictionnaire OpenCC avec résolution par mot.',
    who: 'Ceux qui livrent des sous-titres au public taïwanais ou hongkongais, les distributeurs de versions régionales et les éditeurs qui reçoivent un fichier traditionnel.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Chinese Simplified Traditional Converter'
  },
  'id': {
    title: 'Konverter Hanzi Subtitle - Sederhana ⇄ Tradisional | AI-SRTSub',
    desc: "Konverter gratis untuk subtitle bahasa Mandarin: Hanzi sederhana ⇄ tradisional (Taiwan/Hongkong). Hanya dialog yang berubah — kode waktu dan tag ASS tetap.",
    kw: 'konversi hanzi sederhana tradisional,subtitle mandarin tradisional,srt mandarin tradisional,konversi subtitle china,mandarin taiwan,mandarin hong kong,sederhana ke tradisional,opencc subtitle,chinese subtitle converter,simplified to traditional,srt traditional chinese',
    intro: 'Ubah seluruh berkas subtitle antara Hanzi sederhana dan tradisional tanpa menyentuh apa pun selain dialognya.',
    feat: 'Sembilan arah: tradisional umum, kosakata Taiwan, bentuk Taiwan, Hong Kong, kembali ke sederhana, dan bentuk regional. Memakai kamus OpenCC dengan penentuan berbasis kata.',
    who: 'Yang mengirim subtitle untuk penonton Taiwan atau Hong Kong, distributor versi regional, dan editor yang menerima berkas tradisional.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Chinese Simplified Traditional Converter'
  },
  'hi': {
    title: 'सबटाइटल सरलीकृत ↔ पारंपरिक चीनी परिवर्तक | AI-SRTSub',
    desc: 'सबटाइटल के लिए मुफ़्त चीनी परिवर्तक: सरलीकृत से पारंपरिक (ताइवान या हांगकांग) और वापस। केवल संवाद बदलते हैं — समय-कोड, क्रमांक और ASS स्टाइल टैग ज्यों के त्यों रहते हैं। OpenCC शब्दकोश पर आधारित।',
    kw: 'चीनी सबटाइटल परिवर्तक,सरलीकृत से पारंपरिक,srt पारंपरिक चीनी,सबटाइटल चीनी बदलें,ताइवान पारंपरिक,हांगकांग पारंपरिक,पारंपरिक से सरलीकृत,opencc सबटाइटल,chinese subtitle converter,simplified to traditional,srt traditional chinese',
    intro: 'पूरी सबटाइटल फ़ाइल को सरलीकृत और पारंपरिक के बीच बदलें — संवाद के अलावा कुछ नहीं छुआ जाता।',
    feat: 'नौ दिशाएँ: सामान्य पारंपरिक, ताइवान शब्दावली, ताइवान रूप, हांगकांग, वापस सरलीकृत, और क्षेत्रीय रूप। OpenCC शब्दकोश के साथ शब्द-स्तर पर निर्णय।',
    who: 'ताइवान या हांगकांग के दर्शकों के लिए सबटाइटल देने वाले, क्षेत्रीय संस्करण बनाने वाले वितरक, और पारंपरिक फ़ाइल पाने वाले संपादक।',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Chinese Simplified Traditional Converter'
  },
  'th': {
    title: 'แปลงซับไตเติลจีนตัวย่อ ⇄ ตัวเต็ม | AI-SRTSub',
    desc: 'ตัวแปลงภาษาจีนสำหรับซับไตเติลฟรี: จากตัวย่อเป็นตัวเต็ม (ไต้หวันหรือฮ่องกง) และกลับกัน เปลี่ยนเฉพาะบทสนทนา รหัสเวลา หมายเลข และแท็กสไตล์ ASS คงเดิมทุกประการ ใช้พจนานุกรม OpenCC',
    kw: 'แปลงซับไตเติลจีน,ตัวย่อเป็นตัวเต็ม,srt ตัวเต็ม,ซับไตเติลจีนแปลง,ตัวเต็มไต้หวัน,ตัวเต็มฮ่องกง,ตัวเต็มเป็นตัวย่อ,opencc ซับไตเติล,chinese subtitle converter,simplified to traditional,srt traditional chinese',
    intro: 'แปลงไฟล์ซับไตเติลทั้งไฟล์ระหว่างตัวย่อและตัวเต็ม โดยไม่แตะต้องอะไรนอกจากบทสนทนา',
    feat: 'เก้าทิศทาง: ตัวเต็มทั่วไป คำศัพท์ไต้หวัน รูปอักษรไต้หวัน ฮ่องกง กลับเป็นตัวย่อ และรูปแบบภูมิภาค ใช้พจนานุกรม OpenCC ตัดสินระดับคำ',
    who: 'คนที่ส่งซับไตเติลให้ผู้ชมไต้หวันหรือฮ่องกง ผู้จัดจำหน่ายที่ทำเวอร์ชันภูมิภาค และบรรณาธิการที่ได้รับไฟล์ตัวเต็ม',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Chinese Simplified Traditional Converter'
  },
  'vi': {
    title: 'Chuyển đổi phụ đề chữ Hán giản thể ⇄ phồn thể | AI-SRTSub',
    desc: "Công cụ chuyển tiếng Trung cho phụ đề: giản thể ⇄ phồn thể (Đài Loan hoặc Hồng Kông) và ngược lại. Chỉ lời thoại thay đổi — mã thời gian và thẻ ASS giữ nguyên.",
    kw: 'chuyển đổi phụ đề trung quốc,giản thể sang phồn thể,srt phồn thể,chuyển phụ đề tiếng trung,phồn thể đài loan,phồn thể hồng kông,phồn thể sang giản thể,opencc phụ đề,chinese subtitle converter,simplified to traditional,srt traditional chinese',
    intro: 'Chuyển toàn bộ tệp phụ đề giữa giản thể và phồn thể mà không đụng vào gì ngoài lời thoại.',
    feat: 'Chín hướng: phồn thể phổ thông, từ vựng Đài Loan, dạng chữ Đài Loan, Hồng Kông, về giản thể và dạng vùng miền. Dùng từ điển OpenCC, quyết định theo cấp độ từ.',
    who: 'Người giao phụ đề cho khán giả Đài Loan hoặc Hồng Kông, nhà phát hành bản vùng, và biên tập viên nhận tệp phồn thể.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Chinese Simplified Traditional Converter'
  },
  'ru': {
    title: 'Конвертер китайских субтитров - упрощённый ⇄ традиционный | AI-SRTSub',
    desc: "Бесплатный конвертер китайского для субтитров: упрощённый ⇄ традиционный (Тайвань/Гонконг) и обратно. Меняются только реплики — таймкоды и теги ASS остаются.",
    kw: 'конвертер китайских субтитров,упрощённый в традиционный,srt традиционный китайский,конвертировать субтитры китайский,традиционный тайвань,традиционный гонконг,традиционный в упрощённый,opencc субтитры,chinese subtitle converter,simplified to traditional,srt traditional chinese',
    intro: 'Преобразуйте весь файл субтитров между упрощённым и традиционным, не трогая ничего, кроме реплик.',
    feat: 'Девять направлений: общее традиционное, словарь Тайваня, формы Тайваня, Гонконг, обратно в упрощённое и региональные формы. Словарь OpenCC с решением на уровне слова.',
    who: 'Тем, кто отдаёт субтитры зрителям Тайваня или Гонконга, дистрибьюторам региональных версий и редакторам традиционных файлов.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Chinese Simplified Traditional Converter'
  },
  'it': {
    title: "Converti sottotitoli cinesi - semplificato ⇄ tradizionale",
    desc: "Convertitore gratuito di cinese per sottotitoli: semplificato ⇄ tradizionale (Taiwan/Hongkong). Cambiano solo i dialoghi; codici di tempo e tag ASS restano.",
    kw: 'convertitore sottotitoli cinesi,semplificato a tradizionale,srt cinese tradizionale,convertire sottotitoli cinesi,cinese di taiwan,cinese di hong kong,tradizionale a semplificato,opencc sottotitoli,chinese subtitle converter,simplified to traditional,srt traditional chinese',
    intro: 'Converti un intero file di sottotitoli tra semplificato e tradizionale senza toccare nulla oltre ai dialoghi.',
    feat: 'Nove direzioni: tradizionale generale, vocabolario di Taiwan, forme di Taiwan, Hong Kong, ritorno al semplificato e forme regionali. Usa il dizionario OpenCC con decisione a livello di parola.',
    who: 'Chi consegna sottotitoli al pubblico di Taiwan o Hong Kong, i distributori di versioni regionali e i redattori che ricevono file tradizionali.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Chinese Simplified Traditional Converter'
  },
  'ar': {
    title: 'محوّل الترجمة الصينية - المبسّطة ⇄ التقليدية | AI-SRTSub',
    desc: 'محوّل صيني مجاني للترجمة: من المبسّطة إلى التقليدية (تايوان أو هونغ كونغ) وبالعكس. الحوار وحده هو الذي يتغيّر، أما رموز التوقيت والأرقام ووسوم التنسيق ASS فتبقى كما هي. يعتمد على قاموس OpenCC.',
    kw: 'محول الترجمة الصينية,المبسطة إلى التقليدية,srt صينية تقليدية,تحويل الترجمة الصينية,صينية تايوان,صينية هونغ كونغ,التقليدية إلى المبسطة,opencc ترجمة,chinese subtitle converter,simplified to traditional,srt traditional chinese',
    intro: 'حوّل ملف الترجمة بالكامل بين المبسّطة والتقليدية دون أن يُمسّ شيء غير الحوار.',
    feat: 'تسعة اتجاهات: التقليدية العامة، مفردات تايوان، أشكال تايوان، هونغ كونغ، العودة إلى المبسّطة، والأشكال الإقليمية. يستخدم قاموس OpenCC ويحسم على مستوى الكلمة.',
    who: 'من يسلّم الترجمة لجمهور تايوان أو هونغ كونغ، والموزّعون الذين يعدّون نسخاً إقليمية، والمحرّرون الذين يتسلّمون ملفاً تقليدياً.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Chinese Simplified Traditional Converter'
  },
  'tr': {
    title: 'Çince altyazı dönüştürücü - basitleştirilmiş ⇄ geleneksel | AI-SRTSub',
    desc: "Ücretsiz Çince altyazı dönüştürücü: basitleştirilmiş ⇄ geleneksel (Tayvan/Hong Kong). Yalnızca diyaloglar değişir — zaman kodları ve ASS etiketleri kalır.",
    kw: 'çince altyazı dönüştürücü,basitleştirilmişten geleneğe,srt geleneksel çince,altyazı çince çevir, Tayvan geleneksel,Hong Kong geleneksel,gelenekselden basitleştirilmişe,opencc altyazı,chinese subtitle converter,simplified to traditional,srt traditional chinese',
    intro: 'Altyazı dosyasının tamamını diyaloglardan başka hiçbir şeye dokunmadan basitleştirilmiş ile geleneksel arasında dönüştürün.',
    feat: 'Dokuz yön: genel geleneksel, Tayvan sözcükleri, Tayvan biçimleri, Hong Kong, basitleştirilmişe dönüş ve bölgesel biçimler. OpenCC sözlüğüyle sözcük düzeyinde karar verir.',
    who: 'Tayvan veya Hong Kong izleyicisine altyazı verenler, bölgesel sürüm hazırlayan dağıtımcılar ve geleneksel dosya alan editörler.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Chinese Simplified Traditional Converter'
  },
  'nl': {
    title: 'Chinese ondertitelconverter - vereenvoudigd ⇄ traditioneel | AI-SRTSub',
    desc: "Gratis converter voor Chinese ondertitels: vereenvoudigd ⇄ traditioneel (Taiwan/Hongkong). Alleen de dialogen veranderen — tijdscodes en ASS-stijltags blijven.",
    kw: 'chinese ondertitelconverter,vereenvoudigd naar traditioneel,srt traditioneel chinees,ondertitel chinees omzetten,chinees taiwan,chinees hongkong,traditioneel naar vereenvoudigd,opencc ondertitel,chinese subtitle converter,simplified to traditional,srt traditional chinese',
    intro: 'Zet een heel ondertitelbestand om tussen vereenvoudigd en traditioneel zonder iets anders dan de dialogen aan te raken.',
    feat: 'Negen richtingen: algemeen traditioneel, Taiwan-woordenschat, Taiwan-vormen, Hongkong, terug naar vereenvoudigd en regionale vormen. Gebruikt het OpenCC-woordenboek met beslissing op woordniveau.',
    who: 'Wie ondertitels levert aan Taiwanese of Hongkongse kijkers, distributeurs van regionale versies en redacteuren met een traditioneel bestand.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Chinese Simplified Traditional Converter'
  },
  'pl': {
    title: 'Konwerter chińskich napisów - uproszczony ⇄ tradycyjny | AI-SRTSub',
    desc: "Darmowy konwerter chińskiego dla napisów: uproszczony ⇄ tradycyjny (Tajwan/Hongkong) i z powrotem. Zmieniają się tylko dialogi — kody czasu i tagi ASS zostają.",
    kw: 'konwerter chińskich napisów,uproszczony na tradycyjny,srt tradycyjny chiński,napisy chińskie konwersja,chiński tajwański,chiński hongkoński,tradycyjny na uproszczony,opencc napisy,chinese subtitle converter,simplified to traditional,srt traditional chinese',
    intro: 'Zamień cały plik napisów między uproszczonym a tradycyjnym, nie ruszając niczego poza dialogami.',
    feat: 'Dziewięć kierunków: tradycyjny ogólny, słownictwo Tajwanu, formy Tajwanu, Hongkong, powrót do uproszczonego i formy regionalne. Słownik OpenCC z decyzją na poziomie słowa.',
    who: 'Dostawcy napisów dla widzów z Tajwanu lub Hongkongu, dystrybutorzy wersji regionalnych i redaktorzy z tradycyjnym plikiem.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Chinese Simplified Traditional Converter'
  },
  'sv': {
    title: 'Kinesisk undertextomvandlare - förenklad ⇄ traditionell | AI-SRTSub',
    desc: "Gratis omvandlare för kinesiska undertexter: förenklad ⇄ traditionell (Taiwan/Hongkong). Bara replikerna ändras — tidskoder och ASS-koder förblir.",
    kw: 'kinesisk undertextomvandlare,förenklad till traditionell,srt traditionell kinesiska,omvandla undertext kinesiska,kinesiska taiwan,kinesiska hongkong,traditionell till förenklad,opencc undertext,chinese subtitle converter,simplified to traditional,srt traditional chinese',
    intro: 'Gör om en hel undertextfil mellan förenklad och traditionell utan att röra något annat än replikerna.',
    feat: 'Nio riktningar: allmän traditionell, taiwanesiskt ordförråd, taiwanesiska former, Hongkong, tillbaka till förenklad och regionala former. Använder OpenCC-ordlistan med beslut på ordnivå.',
    who: 'Den som levererar undertexter till taiwanesisk eller hongkongkinesisk publik, distributörer av regionala versioner och redaktörer med traditionell fil.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Chinese Simplified Traditional Converter'
  },
  'cs': {
    title: 'Konvertor čínských titulků - zjednodušená ⇄ tradiční | AI-SRTSub',
    desc: "Zdarma převeďte čínské titulky mezi zjednodušenou a tradiční čínštinou (Tchaj-wan, Hongkong) a zpět. Mění se jen repliky — časové kódy a ASS značky zůstávají.",
    kw: 'konvertor čínských titulků,zjednodušená na tradiční,tradiční na zjednodušenou,srt tradiční čínština,převod titulků čínština,tchajwanská tradiční čínština,hongkongská tradiční čínština,převod znaků,srt do tradiční čínštiny,zjednodušená čínština srt,opencc titulky',
    intro: 'Převeďte celý soubor titulků mezi zjednodušenou a tradiční čínštinou, aniž by se změnilo cokoli kromě replik.',
    feat: 'Devět směrů: obecná tradiční, tchajwanský slovník, tchajwanské tvary, hongkongské, zpět na zjednodušenou a regionální tvary. Používá slovník OpenCC s rozhodováním podle nejdelší shody.',
    who: 'Kdokoli, kdo dodává titulky pro tchajwanské nebo hongkongské publikum, distributoři regionálních verzí a střihači, kteří dostali tradiční soubor.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Chinese Simplified Traditional Converter'
  },
  'uk': {
    title: 'Конвертер китайських субтитрів - спрощена ⇄ традиційна | AI-SRTSub',
    desc: "Безкоштовний конвертер китайських субтитрів: спрощена ⇄ традиційна (Тайвань або Гонконг) і назад. Змінюються лише репліки — часові коди та ASS-теги лишаються.",
    kw: 'конвертер китайських субтитрів,спрощена в традиційну,традиційна в спрощену,srt традиційна китайська,перетворення субтитрів китайська,традиційна тайванська,гонконгська традиційна,перетворення ієрогліфів,srt в традиційну китайську,спрощена китайська srt,opencc субтитри',
    intro: 'Перетворіть весь файл субтитрів між спрощеною та традиційною китайською, не змінюючи нічого, крім реплік.',
    feat: 'Дев\'ять напрямків: загальна традиційна, тайванський словник, тайванські форми, гонконгська, назад до спрощеної та регіональні форми. Використовує словник OpenCC за принципом найдовшої відповідності.',
    who: 'Усі, хто готує субтитри для тайванської або гонконгської аудиторії, дистриб\'ютори регіональних версій і редактори.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Chinese Simplified Traditional Converter'
  },
  'da': {
    title: 'Kinesisk undertekstkonverter - forenklet ⇄ traditionelt | AI-SRTSub',
    desc: "Konvertér gratis kinesiske undertekster: forenklet ⇄ traditionelt (Taiwan/Hongkong) og tilbage. Kun replikkerne ændres — tidskoder og ASS-koder forbliver.",
    kw: 'kinesisk undertekstkonverter,forenklet til traditionelt,traditionelt til forenklet,srt traditionelt kinesisk,konverter undertekster kinesisk,taiwan traditionelt kinesisk,hongkong traditionelt kinesisk,tegnkonvertering,srt til traditionelt kinesisk,forenklet kinesisk srt,opencc undertekster',
    intro: 'Konvertér en hel undertekstfil mellem forenklet og traditionelt kinesisk uden at ændre andet end replikkerne.',
    feat: 'Ni retninger: generelt traditionelt, taiwansk ordforråd, taiwanske former, Hongkong, tilbage til forenklet og regionale former. Bruger OpenCC-ordlisten med længste match først.',
    who: 'Alle der leverer undertekster til taiwansk eller hongkongkinesisk publikum, distributører af regionale versioner og redaktører.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Chinese Simplified Traditional Converter'
  },
  'fi': {
    title: "Tekstitysten muunnin: yksinkertaistettu ⇄ perinteinen kiina",
    desc: "Muunna ilmaiseksi kiinalaiset tekstitykset: yksinkertaistettu ⇄ perinteinen (Taiwan/Hongkong). Vain repliikit muuttuvat — aikakoodit ja ASS-tyylit pysyvät.",
    kw: 'kiinan tekstitysten muunnin,yksinkertaistettu perinteiseksi,perinteinen yksinkertaistetuksi,srt perinteinen kiina,muunna tekstitykset kiina,taiwan perinteinen kiina,hongkong perinteinen kiina,merkkimuunnos,srt perinteiseen kiinaan,yksinkertaistettu kiina srt,opencc tekstitykset',
    intro: 'Muunna koko tekstitystiedosto yksinkertaistetun ja perinteisen kiinan välillä muuttamatta mitään muuta kuin repliikit.',
    feat: 'Yhdeksän suuntaa: yleinen perinteinen, taiwanilainen sanasto, taiwanilaiset muodot, Hongkong, takaisin yksinkertaistettuun ja alueelliset muodot. Käyttää OpenCC-sanakirjaa pisin täsmäys ensin.',
    who: 'Kaikki, jotka toimittavat tekstityksiä taiwanilaiselle tai hongkongilaiselle yleisölle, alueversioiden jakelijat ja editorit.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Chinese Simplified Traditional Converter'
  },
  'el': {
    title: "Μετατροπέας κινεζικών υποτίτλων - απλοποιημένα ⇄ παραδοσιακά",
    desc: "Δωρεάν μετατροπέας κινεζικών υποτίτλων: απλοποιημένα ⇄ παραδοσιακά (Ταϊβάν/Χονγκ Κονγκ). Αλλάζουν μόνο οι διάλογοι — χρονικοί κωδικοί και ετικέτες ASS μένουν.",
    kw: 'μετατροπέας κινεζικών υποτίτλων,απλοποιημένα σε παραδοσιακά,παραδοσιακά σε απλοποιημένα,srt παραδοσιακά κινεζικά,μετατροπή υποτίτλων κινεζικά,παραδοσιακά ταϊβάν,παραδοσιακά χονγκ κονγκ,μετατροπή χαρακτήρων,srt σε παραδοσιακά κινεζικά,απλοποιημένα κινεζικά srt,opencc υπότιτλοι',
    intro: 'Μετατρέψτε ολόκληρο το αρχείο υποτίτλων μεταξύ απλοποιημένων και παραδοσιακών κινεζικών, αλλάζοντας μόνο τους διαλόγους.',
    feat: 'Εννέα κατευθύνσεις: γενικά παραδοσιακά, λεξιλόγιο Ταϊβάν, μορφές Ταϊβάν, Χονγκ Κονγκ, επιστροφή στα απλοποιημένα και περιφερειακές μορφές. Χρησιμοποιεί το λεξικό OpenCC με πρώτη τη μεγαλύτερη αντιστοίχιση.',
    who: 'Όσοι παραδίδουν υπότιτλους σε κοινό Ταϊβάν ή Χονγκ Κονγκ, διανομείς περιφερειακών εκδόσεων και μοντέρ.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Chinese Simplified Traditional Converter'
  },
  'he': {
    title: 'ממיר כתוביות סיניות - מפושט ⇄ מסורתי | AI-SRTSub',
    desc: 'המירו חינם כתוביות סיניות: מפושטת למסורתית (טאיוואן או הונג קונג) ובחזרה. רק הדיאלוגים משתנים — קודי זמן, מספרים ותגיות עיצוב ASS נותרים זהים. מבוסס על מילון OpenCC.',
    kw: 'ממיר כתוביות סיניות,מפושטת למסורתית,מסורתית למפושטת,srt סינית מסורתית,המרת כתוביות סינית,סינית מסורתית טאיוואן,סינית מסורתית הונג קונג,המרת תווים,srt לסינית מסורתית,סינית מפושטת srt,opencc כתוביות',
    intro: 'המירו קובץ כתוביות שלם בין סינית מפושטת למסורתית בלי לשנות שום דבר מלבד הדיאלוגים.',
    feat: 'תשעה כיוונים: מסורתית כללית, אוצר מילים טאיוואני, צורות טאיוואניות, הונג קונג, חזרה למפושטת וצורות אזוריות. משתמש במילון OpenCC עם התאמה ארוכה ביותר קודם.',
    who: 'כל מי שמספק כתוביות לקהל בטאיוואן או בהונג קונג, מפיצים של גרסאות אזוריות ועורכים.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Chinese Simplified Traditional Converter'
  },
  'ro': {
    title: "Convertor subtitrări chinezești - simplificat ⇄ tradițional",
    desc: "Convertor gratuit pentru subtitrări chinezești: simplificat ⇄ tradițional (Taiwan/Hongkong). Se schimbă doar replicile — codurile și etichetele ASS rămân.",
    kw: 'convertor subtitrări chinezești,simplificat în tradițional,tradițional în simplificat,srt chineză tradițională,conversie subtitrări chineză,chineză tradițională taiwan,chineză tradițională hong kong,conversie caractere,srt în chineză tradițională,chineză simplificată srt,opencc subtitrări',
    intro: 'Convertește un întreg fișier de subtitrări între chineza simplificată și cea tradițională, fără să schimbi altceva în afară de replici.',
    feat: 'Nouă direcții: tradițional general, vocabular taiwanez, forme taiwaneze, Hong Kong, înapoi la simplificat și forme regionale. Folosește dicționarul OpenCC cu cea mai lungă potrivire întâi.',
    who: 'Oricine livrează subtitrări pentru publicul din Taiwan sau Hong Kong, distribuitorii de versiuni regionale și editorii.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Chinese Simplified Traditional Converter'
  }
};

/* v0.9.316：第十三个页面 —— 字幕拆分与拼接 /split.html 的 SEO 表。与既有十二张表同规格。 */
const SEO_SPLIT = {
  'zh-CN': {
    title: '字幕拆分与拼接 - 切成多段 / 多份合一 | 随心字幕 AI',
    desc: '免费在线拆分和拼接字幕文件：按时长或条数把一份字幕切成多段，每段可从零开始计时；也能把多份按顺序拼成一集，或保留时间戳交织合并。序号自动重排，台词一个字不改。支持 SRT、VTT。',
    kw: '字幕拆分,字幕拼接,srt拆分,srt合并,字幕分割,字幕合并成一个,srt splitter,merge srt files,split subtitle,combine subtitles',
    intro: '把一份长字幕切成多段，或把多份散字幕拼成一份。全程在浏览器里完成，文件不上传。',
    feat: '按时长或条数拆分、每段重新从零计时；多份按顺序拼接或按时间交织合并，序号自动重排，台词一字不改。支持 SRT、VTT。',
    who: '要做分集上传、分段校对、多段字幕合并的创作者、译制组、剪辑师。',
    siteName: '随心字幕 AI', jsonldName: '随心字幕 AI', jsonldAlt: 'Subtitle Splitter and Merger'
  },
  'zh-TW': {
    title: '字幕拆分與拼接 - 切成多段 / 多份合一 | 隨心字幕 AI',
    desc: '免費線上拆分和拼接字幕檔案：按時長或條數把一份字幕切成多段，每段可從零開始計時；也能把多份按順序拼成一集，或保留時間戳交織合併。序號自動重排，台詞一個字不改。支援 SRT、VTT。',
    kw: '字幕拆分,字幕拼接,srt拆分,srt合併,字幕分割,字幕合併成一個,srt splitter,merge srt files,split subtitle,combine subtitles',
    intro: '把一份長字幕切成多段，或把多份散字幕拼成一份。全程在瀏覽器裡完成，檔案不上傳。',
    feat: '按時長或條數拆分、每段重新從零計時；多份按順序拼接或按時間交織合併，序號自動重排，台詞一字不改。支援 SRT、VTT。',
    who: '要做分集上傳、分段校對、多段字幕合併的創作者、譯製組、剪輯師。',
    siteName: '隨心字幕 AI', jsonldName: '隨心字幕 AI', jsonldAlt: 'Subtitle Splitter and Merger'
  },
  'en': {
    title: 'Subtitle Splitter & Merger - SRT / VTT | AI-SRTSub',
    desc: 'Split subtitles by duration or count, or join many files in order or by timestamp. Renumbering is automatic, dialogue untouched. SRT & VTT.',
    kw: 'subtitle splitter,split subtitles,merge srt files,srt merger,combine subtitles,split srt,join srt files,cut subtitles,split vtt,subtitle merger',
    intro: 'Cut one long subtitle into parts, or join many files into one. Runs fully in your browser — nothing is uploaded.',
    feat: 'Split by duration or count with per-part renumbering and optional zero-based timing; join sequentially with a gap or interleave by original timestamps. SRT and VTT.',
    who: 'Creators splitting episodes for upload, teams reviewing in parts, and editors merging multi-part subtitles.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Splitter and Merger'
  },
  'ja': {
    title: '字幕の分割・結合 - SRT / VTT 対応 | AI-SRTSub',
    desc: '字幕を無料で分割・結合：長さや条数で分割、複数ファイルを順番に連結、またはタイムスタンプで統合。番号は自動振り直し、セリフは一切変更しません。SRT / VTT 対応。',
    kw: '字幕 分割,字幕 結合,srt 分割,srt 結合,字幕 連結,subtitle splitter,merge srt files,split subtitle,combine subtitles',
    intro: '長い字幕を複数パートに分割、または複数ファイルを 1 本に結合。すべてブラウザ内で処理され、ファイルはアップロードされません。',
    feat: '長さ・条数での分割（各パートをゼロから計測可能）、順次連結またはタイムスタンプでの統合。番号は自動で振り直されます。SRT / VTT 対応。',
    who: 'アップロード用にエピソードを分割するクリエイター、分担チェックする翻訳チーム、複数パートの字幕を統合する編集者。',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Splitter and Merger'
  },
  'es': {
    title: 'Dividir y unir subtítulos - SRT / VTT | AI-SRTSub',
    desc: 'Divide subtítulos por duración o número de líneas, o une varios archivos en orden o por marca de tiempo. Renumeración automática, diálogos intactos. SRT y VTT.',
    kw: 'dividir subtítulos,unir subtítulos,dividir srt,unir srt,combinar subtítulos,subtitle splitter,merge srt files,split subtitle',
    intro: 'Corta un subtítulo largo en partes o une varios archivos en uno. Todo ocurre en tu navegador; nada se sube.',
    feat: 'División por duración o número con renumeración automática y reinicio de tiempos opcional; unión secuencial o por marcas de tiempo. SRT y VTT.',
    who: 'Creadores que trocean episodios, equipos que revisan por partes y editores que unen subtítulos multiparte.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Splitter and Merger'
  },
  'pt': {
    title: 'Dividir e unir legendas - SRT / VTT | AI-SRTSub',
    desc: 'Divida legendas por duração ou número de linhas, ou una vários arquivos em ordem ou por marca de tempo. Renumeração automática, diálogos intactos. SRT e VTT.',
    kw: 'dividir legendas,unir legendas,dividir srt,unir srt,combinar legendas,subtitle splitter,merge srt files,split subtitle',
    intro: 'Corte uma legenda longa em partes ou una vários arquivos em um só. Tudo no navegador, nada é enviado.',
    feat: 'Divisão por duração ou número com renumeração automática e reinício opcional dos tempos; união sequencial ou por marcas de tempo. SRT e VTT.',
    who: 'Criadores que dividem episódios, equipes que revisam por partes e editores que unem legendas multiparte.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Splitter and Merger'
  },
  'ko': {
    title: '자막 분할·병합 - SRT / VTT | AI-SRTSub',
    desc: '자막을 길이나 줄 수로 분할하거나, 여러 파일을 순서대로 또는 타임스탬프 기준으로 하나로 합칩니다. 번호는 자동으로 다시 매겨지고 대사는 그대로입니다. SRT / VTT 지원.',
    kw: '자막 분할,자막 병합,srt 분할,srt 병합,자막 합치기,subtitle splitter,merge srt files,split subtitle',
    intro: '긴 자막을 여러 파트로 나누거나 여러 파일을 하나로 합칩니다. 모두 브라우저에서 처리되며 파일은 업로드되지 않습니다.',
    feat: '길이·줄 수 기준 분할(파트별 0초 시작 가능), 순차 연결 또는 타임스탬프 기준 병합. 번호는 자동으로 재정렬됩니다. SRT / VTT 지원.',
    who: '업로드용으로 에피소드를 나누는 크리에이터, 분담 검수하는 팀, 여러 파트 자막을 합치는 편집자.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Splitter and Merger'
  },
  'de': {
    title: 'Untertitel teilen & zusammenfügen | AI-SRTSub',
    desc: 'Untertitel nach Dauer oder Zeilen teilen oder viele Dateien geordnet oder nach Zeitstempel vereinen. Nummerierung automatisch, Text bleibt. SRT & VTT.',
    kw: 'untertitel teilen,untertitel zusammenfügen,srt teilen,srt zusammenfügen,untertitel splitten,subtitle splitter,merge srt files',
    intro: 'Einen langen Untertitel in Teile schneiden oder viele Dateien zu einem vereinen. Läuft komplett im Browser, nichts wird hochgeladen.',
    feat: 'Teilung nach Dauer oder Anzahl mit automatischer Nummerierung und optionalem Neustart bei null; sequentielles oder zeitstempelbasiertes Vereinen. SRT und VTT.',
    who: 'Creator, die Episoden aufteilen, Teams, die in Teilen prüfen, und Cutter, die mehrteilige Untertitel vereinen.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Splitter and Merger'
  },
  'fr': {
    title: 'Découper et fusionner des sous-titres | AI-SRTSub',
    desc: "Découpez des sous-titres par durée ou nombre, ou fusionnez des fichiers dans l'ordre ou par horodatage. Renumérotation automatique, dialogues intacts. SRT et VTT.",
    kw: 'découper sous-titres,fusionner sous-titres,diviser srt,fusionner srt,combiner sous-titres,subtitle splitter,merge srt files',
    intro: "Coupez un long sous-titre en parties ou fusionnez plusieurs fichiers en un seul. Tout se passe dans le navigateur, rien n'est envoyé.",
    feat: 'Découpage par durée ou nombre avec renumérotation automatique et redémarrage optionnel à zéro ; fusion séquentielle ou par horodatage. SRT et VTT.',
    who: 'Créateurs qui découpent des épisodes, équipes qui vérifient par parties et monteurs qui fusionnent des sous-titres.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Splitter and Merger'
  },
  'id': {
    title: 'Pisah & Gabung Subtitle - SRT / VTT | AI-SRTSub',
    desc: 'Pisahkan subtitle berdasarkan durasi atau jumlah baris, atau gabungkan banyak file berurutan atau menurut stempel waktu. Penomoran otomatis, dialog utuh. SRT & VTT.',
    kw: 'pisah subtitle,gabung subtitle,split srt,merge srt,gabung srt,subtitle splitter,merge srt files',
    intro: 'Potong subtitle panjang menjadi beberapa bagian atau gabungkan banyak file menjadi satu. Semua di browser, tak ada unggahan.',
    feat: 'Pemisahan menurut durasi atau jumlah dengan penomoran otomatis dan mulai dari nol opsional; penggabungan berurutan atau menurut stempel waktu. SRT dan VTT.',
    who: 'Kreator yang membagi episode, tim yang meninjau per bagian, dan editor yang menggabungkan subtitle multi-bagian.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Splitter and Merger'
  },
  'hi': {
    title: 'सबटाइटल स्प्लिटर और मर्जर | AI-SRTSub',
    desc: 'सबटाइटल को अवधि या पंक्तियों की संख्या से बाँटें, या कई फ़ाइलों को क्रम या टाइमस्टैम्प से जोड़ें। नंबरिंग स्वतः, संवाद अपरिवर्तित। SRT और VTT।',
    kw: 'सबटाइटल स्प्लिटर,सबटाइटल मर्जर,srt स्प्लिट,srt मर्ज,subtitle splitter,merge srt files',
    intro: 'लंबे सबटाइटल को भागों में बाँटें या कई फ़ाइलों को एक में जोड़ें। सब ब्राउज़र में होता है, कुछ अपलोड नहीं होता।',
    feat: 'अवधि या संख्या से विभाजन, स्वतः नंबरिंग और वैकल्पिक शून्य-आधारित समय; क्रमबद्ध या टाइमस्टैम्प से संयोजन। SRT और VTT।',
    who: 'एपिसोड बाँटने वाले क्रिएटर, भागों में समीक्षा करने वाली टीमें और बहु-भाग सबटाइटल जोड़ने वाले एडिटर।',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Splitter and Merger'
  },
  'th': {
    title: 'แยกและรวมซับไทย - SRT / VTT | AI-SRTSub',
    desc: 'แยกซับตามความยาวหรือจำนวนบรรทัด หรือรวมหลายไฟล์ตามลำดับหรือตาม timestamp โน้มตัวเลขใหม่อัตโนมัติ ไม่แตะต้องบทสนทนา รองรับ SRT และ VTT',
    kw: 'แยกซับ,รวมซับ,split srt,merge srt,รวมไฟล์ซับ,subtitle splitter,merge srt files',
    intro: 'ตัดซับยาว ๆ เป็นหลายช่วง หรือรวมหลายไฟล์เป็นหนึ่งเดียว ทำทั้งหมดในเบราว์เซอร์ ไม่มีการอัปโหลดไฟล์',
    feat: 'แยกตามความยาวหรือจำนวนบรรทัด เริ่มนับใหม่จากศูนย์ได้ รวมแบบเรียงลำดับหรือแทรกตาม timestamp รองรับ SRT และ VTT',
    who: 'ครีเอเตอร์ที่แยกตอนเพื่ออัปโหลด ทีมที่ตรวจทีละช่วง และคนตัดต่อที่รวมซับหลายส่วนเข้าด้วยกัน',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Splitter and Merger'
  },
  'vi': {
    title: 'Tách và gộp phụ đề - SRT / VTT | AI-SRTSub',
    desc: 'Tách phụ đề theo thời lượng hoặc số dòng, hoặc gộp nhiều file theo thứ tự hay theo timestamp. Đánh số lại tự động, lời thoại giữ nguyên. Hỗ trợ SRT và VTT.',
    kw: 'tách phụ đề,gộp phụ đề,tách srt,gộp srt,subtitle splitter,merge srt files',
    intro: 'Cắt một phụ đề dài thành nhiều phần hoặc gộp nhiều file thành một. Mọi thứ chạy trong trình duyệt, không tải lên đâu cả.',
    feat: 'Tách theo thời lượng hoặc số dòng, có thể tính lại từ 0; gộp theo thứ tự hoặc đan xen theo timestamp. Hỗ trợ SRT và VTT.',
    who: 'Creator tách tập để đăng tải, đội soát từng phần, và biên tập viên gộp phụ đề nhiều phần.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Splitter and Merger'
  },
  'ru': {
    title: 'Разделение и склейка субтитров | AI-SRTSub',
    desc: 'Разрезайте субтитры по длительности или числу строк либо склеивайте файлы по порядку или по меткам времени. Нумерация заново, реплики без изменений. SRT и VTT.',
    kw: 'разделить субтитры,склеить субтитры,разделить srt,склеить srt,объединить субтитры,subtitle splitter,merge srt files',
    intro: 'Разрежьте длинные субтитры на части или склейте несколько файлов в один. Всё в браузере, ничего не загружается.',
    feat: 'Разрезка по длительности или количеству строк со сбросом времени на ноль; склейка по порядку или по меткам времени. SRT и VTT.',
    who: 'Авторы, режущие эпизоды на части, команды с проверкой по частям и монтажёры, склеивающие многотомные субтитры.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Splitter and Merger'
  },
  'it': {
    title: 'Dividi e unisci sottotitoli | AI-SRTSub',
    desc: 'Dividi sottotitoli per durata o numero di righe, o unisci più file in ordine o per timestamp. Rinumerazione automatica, dialoghi intatti. SRT e VTT.',
    kw: 'dividere sottotitoli,unire sottotitoli,dividere srt,unire srt,combinare sottotitoli,subtitle splitter,merge srt files',
    intro: 'Taglia un sottotitolo lungo in parti o unisci più file in uno. Tutto nel browser, nessun caricamento.',
    feat: 'Divisione per durata o numero con rinumerazione automatica e ripartenza opzionale da zero; unione sequenziale o per timestamp. SRT e VTT.',
    who: 'Creator che dividono episodi, team che revisionano a parti e montatori che uniscono sottotitoli in più parti.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Splitter and Merger'
  },
  'ar': {
    title: 'تقسيم ودمج الترجمات - SRT / VTT | AI-SRTSub',
    desc: 'قسّم ملفات الترجمة حسب المدة أو عدد الأسطر، أو ادمج عدة ملفات بالترتيب أو حسب الطوابع الزمنية. ترقيم تلقائي جديد والحوارات بلا تغيير. يدعم SRT و VTT.',
    kw: 'تقسيم الترجمة,دمج الترجمة,تقسيم srt,دمج srt,subtitle splitter,merge srt files',
    intro: 'قسّم ترجمة طويلة إلى أجزاء أو ادمج عدة ملفات في واحد. كل شيء في المتصفح ولا يُرفع أي ملف.',
    feat: 'التقسيم حسب المدة أو العدد مع إعادة الترقيم تلقائيًا وإمكانية العد من الصفر؛ الدمج بالتسلسل أو حسب الطوابع الزمنية. يدعم SRT و VTT.',
    who: 'صنّاع محتوى يقسمون الحلقات، وفرق تراجع جزءًا جزءًا، ومونتيرات يدمجون ترجمات متعددة الأجزاء.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Splitter and Merger'
  },
  'tr': {
    title: 'Altyazı bölme ve birleştirme | AI-SRTSub',
    desc: 'Altyazıları süreye veya satıra göre bölün ya da çok dosyayı sırayla veya zamana göre birleştirin. Numaralama otomatik, diyaloglara dokunulmaz. SRT ve VTT.',
    kw: 'altyazı bölme,altyazı birleştirme,srt bölme,srt birleştirme,subtitle splitter,merge srt files',
    intro: 'Uzun bir altyazıyı parçalara bölün veya çok sayıda dosyayı tek dosyada birleştirin. Hepsi tarayıcıda olur, hiçbir şey yüklenmez.',
    feat: 'Süreye veya sayıya göre bölme, sıfırdan başlatma seçeneğiyle otomatik numaralama; sıralı veya zaman damgalı birleştirme. SRT ve VTT.',
    who: 'Bölümleri ayıran içerik üreticileri, parça parça kontrol eden ekipler ve çok parçalı altyazıları birleştiren kurgucular.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Splitter and Merger'
  },
  'nl': {
    title: 'Ondertitels splitsen en samenvoegen | AI-SRTSub',
    desc: 'Splits ondertitels op duur of regelental, of voeg vele bestanden op volgorde of op timestamp samen. Automatische hernummering, dialogen onaangeroerd. SRT en VTT.',
    kw: 'ondertitels splitsen,ondertitels samenvoegen,srt splitsen,srt samenvoegen,subtitle splitter,merge srt files',
    intro: 'Knip een lange ondertitel in delen of voeg vele bestanden samen tot één. Alles in de browser, niets wordt geüpload.',
    feat: 'Splitsen op duur of aantal met automatische hernummering en optioneel vanaf nul; sequentieel of op timestamp samenvoegen. SRT en VTT.',
    who: 'Creators die afleveringen knippen, teams die per deel controleren en editors die meerdelige ondertitels samenvoegen.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Splitter and Merger'
  },
  'pl': {
    title: 'Dzielenie i łączenie napisów | AI-SRTSub',
    desc: 'Podziel napisy według czasu lub liczby linii albo połącz wiele plików po kolei lub według znaczników czasu. Automatyczna numeracja, dialogi bez zmian. SRT i VTT.',
    kw: 'dzielenie napisów,łączenie napisów,podziel srt,połącz srt,subtitle splitter,merge srt files',
    intro: 'Potnij długie napisy na części albo połącz wiele plików w jeden. Wszystko w przeglądarce, nic nie jest wysyłane.',
    feat: 'Dzielenie według czasu lub liczby z automatyczną numeracją i opcjonalnym startem od zera; łączenie sekwencyjne lub po znacznikach czasu. SRT i VTT.',
    who: 'Twórcy dzielący odcinki, zespoły sprawdzające częściami i montażyści łączący wieloczęściowe napisy.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Splitter and Merger'
  },
  'sv': {
    title: 'Dela och slå ihop undertexter | AI-SRTSub',
    desc: 'Dela undertexter efter längd eller antal rader, eller slå ihop många filer i ordning eller efter tidsstämpel. Automatisk omnumrering, dialoger orörda. SRT och VTT.',
    kw: 'dela undertexter,slå ihop undertexter,dela srt,slå ihop srt,subtitle splitter,merge srt files',
    intro: 'Klipp en lång undertext i delar eller slå ihop många filer till en. Allt sker i webbläsaren, inget laddas upp.',
    feat: 'Delning efter längd eller antal med automatisk omnumrering och valfri nollställning; sammanslagning i ordning eller efter tidsstämplar. SRT och VTT.',
    who: 'Skapare som delar avsnitt, team som granskar delvis och klippare som slår ihop flerdelade undertexter.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Splitter and Merger'
  },
  'cs': {
    title: 'Dělení a slučování titulků | AI-SRTSub',
    desc: 'Dělte titulky podle délky nebo počtu řádků, nebo slučujte mnoho souborů podle pořadí či časových značek. Automatické číslování, dialogy beze změny. SRT a VTT.',
    kw: 'dělení titulků,slučování titulků,rozdělit srt,sloučit srt,subtitle splitter,merge srt files',
    intro: 'Rozdělte dlouhé titulky na části nebo slučte mnoho souborů do jednoho. Vše v prohlížeči, nic se nenahrává.',
    feat: 'Dělení podle délky nebo počtu s automatickým číslováním a volitelným startem od nuly; slučování postupně nebo podle časových značek. SRT a VTT.',
    who: 'Tvůrci dělící epizody, týmy kontrolojící po částech a střihači slučující vícedílné titulky.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Splitter and Merger'
  },
  'uk': {
    title: 'Розділення та склеювання субтитрів | AI-SRTSub',
    desc: 'Ріжте субтитри за тривалістю або кількістю рядків або склеюйте багато файлів за порядком чи мітками часу. Автоматична нумерація, репліки без змін. SRT і VTT.',
    kw: 'розділити субтитри,склеїти субтитри,розділити srt,склеїти srt,subtitle splitter,merge srt files',
    intro: 'Розріжте довгі субтитри на частини або склейте багато файлів в один. Усе в браузері, нічого не завантажується.',
    feat: 'Розділення за тривалістю або кількістю з автоматичною нумерацією та скиданням до нуля; склеювання послідовно або за мітками часу. SRT і VTT.',
    who: 'Автори, що ділять епізоди, команди з перевіркою частинами та монтажери, що склеюють багаточастинні субтитри.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Splitter and Merger'
  },
  'da': {
    title: 'Opdel og sæt undertekster sammen | AI-SRTSub',
    desc: 'Opdel undertekster efter varighed eller linjeantal, eller sæt filer sammen i rækkefølge eller efter tidsstempel. Nummerering automatisk, dialog urørt.',
    kw: 'opdel undertekster,sæt undertekster sammen,opdel srt,sæt srt sammen,subtitle splitter,merge srt files',
    intro: 'Klip en lang undertekst i dele eller sæt mange filer sammen til én. Alt sker i browseren, intet uploades.',
    feat: 'Opdeling efter varighed eller antal med automatisk nummerering og valgfri nulstilling; sammensætning i rækkefølge eller efter tidsstempler. SRT og VTT.',
    who: 'Skabere der opdeler afsnit, teams der reviewer i dele og klippere der sætter flerdelte undertekster sammen.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Splitter and Merger'
  },
  'fi': {
    title: 'Tekstitysten jakaminen ja yhdistäminen | AI-SRTSub',
    desc: 'Jaa tekstityksiä keston tai rivimäärän mukaan tai yhdistä tiedostoja järjestyksessä tai aikaleimojen mukaan. Numerointi automaattinen, dialogi koskematon.',
    kw: 'jaa tekstitys,yhdistä tekstitykset,jaa srt,yhdistä srt,subtitle splitter,merge srt files',
    intro: 'Leikkaa pitkä tekstitys osiin tai yhdistä monta tiedostoa yhdeksi. Kaikki tapahtuu selaimessa, mitään ei lähetetä.',
    feat: 'Jakaminen keston tai määrän mukaan automaattisella numeroinnilla ja valinnaisella nollasta aloittamisella; yhdistäminen järjestyksessä tai aikaleimojen mukaan. SRT ja VTT.',
    who: 'Jaksuja jaavat tekijät, osissa tarkistavat tiimit ja moniosaisia tekstityksiä yhdistävät leikkaajat.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Splitter and Merger'
  },
  'el': {
    title: 'Διαχωρισμός και συγχώνευση υποτίτλων | AI-SRTSub',
    desc: 'Διαχωρίστε υπότιτλους κατά διάρκεια ή αριθμό γραμμών, ή συγχωνεύστε αρχεία με σειρά ή βάσει χρονοσφραγίδων. Αυτόματη αρίθμηση, διάλογοι ανέγγιχτοι. SRT και VTT.',
    kw: 'διαχωρισμός υποτίτλων,συγχώνευση υποτίτλων,διαχωρισμός srt,συγχώνευση srt,subtitle splitter,merge srt files',
    intro: 'Κόψτε έναν μακρύ υπότιτλο σε μέρη ή συγχωνεύστε πολλά αρχεία σε ένα. Όλα γίνονται στο πρόγραμμα περιήγησης, δεν ανεβαίνει τίποτα.',
    feat: 'Διαχωρισμός κατά διάρκεια ή αριθμό με αυτόματη αρίθμηση και προαιρετικό μηδενισμό· συγχώνευση με σειρά ή βάσει χρονοσφραγίδων. SRT και VTT.',
    who: 'Δημιουργοί που κόβουν επεισόδια, ομάδες που ελέγχουν τμηματικά και μοντέρ που συγχωνεύουν πολυμερείς υπότιτλους.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Splitter and Merger'
  },
  'he': {
    title: 'פיצול ומיזוג כתוביות | AI-SRTSub',
    desc: 'פצלו כתוביות לפי משך או מספר שורות, או מזגו קבצים רבים לפי סדר או לפי חותמות זמן. מספור אוטומטי מחדש, הדיאלוגים ללא שינוי. תומך SRT ו-VTT.',
    kw: 'פיצול כתוביות,מיזוג כתוביות,פיצול srt,מיזוג srt,subtitle splitter,merge srt files',
    intro: 'חתכו כתוביות ארוכות לחלקים או מזגו קבצים רבים לאחד. הכול מתבצע בדפדפן, שום דבר לא מועלה.',
    feat: 'פיצול לפי משך או כמות עם מספור אוטומטי ואיפוס לאפס אופציונלי; מיזוג עוקב או לפי חותמות זמן. תומך SRT ו-VTT.',
    who: 'יוצרים שמפצלים פרקים, צוותים שסוקרים חלק-חלק ועורכים שממזגים כתוביות מרובות חלקים.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Splitter and Merger'
  },
  'ro': {
    title: 'Împărțire și îmbinare subtitrări | AI-SRTSub',
    desc: 'Împărțiți subtitrări după durată sau număr de linii, sau îmbinați multe fișiere în ordine sau după timestamp. Numerotare automată, dialoguri neatinse. SRT și VTT.',
    kw: 'împărțire subtitrări,îmbinare subtitrări,împarte srt,îmbină srt,subtitle splitter,merge srt files',
    intro: 'Tăiați un subtitraj lung în părți sau îmbinați multe fișiere într-unul singur. Totul în browser, nimic nu se încarcă.',
    feat: 'Împărțire după durată sau număr cu numerotare automată și repornire opțională de la zero; îmbinare secvențială sau după timestamp. SRT și VTT.',
    who: 'Creatori care împart episoade, echipe care verifică pe părți și editori care îmbină subtitrări în mai multe părți.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Splitter and Merger'
  },
};

/* v0.9.316：第十四个页面 —— 字幕 Excel/CSV 互转 /table.html 的 SEO 表。与既有十二张表同规格。 */
const SEO_TABLE = {
  'zh-CN': {
    title: '字幕转 Excel/CSV 表格 - 批量翻译校对好帮手 | 随心字幕 AI',
    desc: '免费在线字幕表格互转：把 SRT、VTT 字幕导出成 Excel（xlsx）或 CSV 表格，在 Excel 里逐行校对、翻译、批注后再导回字幕；时间列用文本保真，台词换行原样保留。全程在浏览器里完成，文件不上传。',
    kw: '字幕转excel,srt转csv,srt转excel,excel转srt,csv转srt,字幕表格,subtitle to excel,srt to csv,excel to srt,subtitle spreadsheet',
    intro: '把字幕导出成表格逐行校对翻译，改完再导回字幕。全程在浏览器里完成，文件不上传。',
    feat: 'SRT、VTT 一键转 Excel（xlsx）或 CSV，在表格里改时间、改台词、写批注，再导回 SRT、VTT。时间列按文本原样保留不丢毫秒，台词里的换行原样进单元格。支持中英文列头，识别不了的行自动跳过。',
    who: '要做翻译校对、团队协作审稿、批量修改字幕的译者、译制组、剪辑师。',
    siteName: '随心字幕 AI', jsonldName: '随心字幕 AI', jsonldAlt: 'Subtitle Excel CSV Converter'
  },
  'zh-TW': {
    title: '字幕轉 Excel/CSV 表格 - 批量翻譯校對好幫手 | 隨心字幕 AI',
    desc: '免費線上字幕表格互轉：把 SRT、VTT 字幕匯出成 Excel（xlsx）或 CSV 表格，在 Excel 裡逐行校對、翻譯、批註後再匯回字幕；時間欄用文字保真，台詞換行原樣保留。全程在瀏覽器裡完成，檔案不上傳。',
    kw: '字幕轉excel,srt轉csv,srt轉excel,excel轉srt,csv轉srt,字幕表格,subtitle to excel,srt to csv,excel to srt,subtitle spreadsheet',
    intro: '把字幕匯出成表格逐行校對翻譯，改完再匯回字幕。全程在瀏覽器裡完成，檔案不上傳。',
    feat: 'SRT、VTT 一鍵轉 Excel（xlsx）或 CSV，在表格裡改時間、改台詞、寫批註，再匯回 SRT、VTT。時間欄按文字原樣保留不丟毫秒，台詞裡的換行原樣進儲存格。支援中英文欄頭，識別不了的行自動跳過。',
    who: '要做翻譯校對、團隊協作審稿、批量修改字幕的譯者、譯製組、剪輯師。',
    siteName: '隨心字幕 AI', jsonldName: '隨心字幕 AI', jsonldAlt: 'Subtitle Excel CSV Converter'
  },
  'en': {
    title: 'Subtitles to Excel/CSV and Back | AI-SRTSub',
    desc: 'Turn SRT or VTT into an Excel or CSV sheet for review and translation, then bring it back. Timecodes stay exact, line breaks survive. Nothing uploads.',
    kw: 'subtitle to excel,srt to csv,srt to excel,excel to srt,csv to srt,subtitle spreadsheet,subtitle converter table',
    intro: 'Export subtitles to a spreadsheet for review and translation, then import the sheet back. Runs fully in your browser.',
    feat: 'One click from SRT or VTT to xlsx or CSV; edit times, text and notes in your spreadsheet, then export back to SRT or VTT. Time columns keep full millisecond precision; in-cell line breaks are preserved. Chinese and English headers both work.',
    who: 'Translators, fansub teams and editors who review, annotate or batch-fix subtitles in a spreadsheet.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Excel CSV Converter'
  },
  'ja': {
    title: '字幕を Excel/CSV に変換 | AI-SRTSub',
    desc: 'SRT・VTT を Excel（xlsx）や CSV に書き出し、表で訳文チェック・翻訳・注記をつけ、また字幕に戻せます。時間はテキストで保持され、改行もそのまま。ブラウザ内で完結します。',
    kw: '字幕 excel,srt csv 変換,srt excel,excel 字幕,subtitle to excel,srt to csv',
    intro: '字幕を表計算に出して訳文をチェックし、編集後に字幕へ戻します。すべてブラウザ内で処理されます。',
    feat: 'SRT・VTT をワンクリックで xlsx・CSV に。表で時間・テキスト・注記を編集し、SRT・VTT に戻せます。時間列はミリ秒まで保持、セル内改行も維持。中国語・英語の列ヘッダーに対応。',
    who: '表計算で字幕を校正・翻訳・注記する翻訳者、ファンサブ、編集者。',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Excel CSV Converter'
  },
  'es': {
    title: 'Subtítulos a Excel/CSV y al revés | AI-SRTSub',
    desc: 'Pasa SRT o VTT a una hoja Excel o CSV para revisar y traducir línea a línea, y vuelve a subtítulos. Los tiempos siguen exactos y los saltos de línea se conservan.',
    kw: 'subtítulos a excel,srt a csv,srt a excel,excel a srt,csv a srt,subtitle to excel',
    intro: 'Exporta subtítulos a una hoja de cálculo para revisarlos y traducirlos, y luego importa la hoja de vuelta. Todo en tu navegador.',
    feat: 'De SRT o VTT a xlsx o CSV en un clic; edita tiempos, texto y notas en tu hoja y exporta de nuevo a SRT o VTT. Las columnas de tiempo conservan los milisegundos y los saltos de línea en celda se mantienen. Cabeceras en chino e inglés.',
    who: 'Traductores, equipos de fansub y editores que revisan, anotan o corrigen subtítulos en una hoja de cálculo.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Excel CSV Converter'
  },
  'pt': {
    title: 'Legendas para Excel/CSV e de volta | AI-SRTSub',
    desc: 'Converta SRT ou VTT em planilha Excel ou CSV para revisar e traduzir linha a linha, e volte a legendas. Tempos exatos, quebras de linha preservadas.',
    kw: 'legendas para excel,srt para csv,srt para excel,excel para srt,subtitle to excel',
    intro: 'Exporte legendas para uma planilha, revise e traduza, e importe a planilha de volta. Tudo no navegador.',
    feat: 'De SRT ou VTT para xlsx ou CSV em um clique; edite tempos, texto e notas na planilha e exporte de volta. As colunas de tempo mantêm os milissegundos e as quebras de linha nas células ficam intactas. Cabeçalhos em chinês e inglês.',
    who: 'Tradutores, equipes de fansub e editores que revisam, anotam ou corrigem legendas em planilha.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Excel CSV Converter'
  },
  'ko': {
    title: '자막 Excel/CSV 변환 | AI-SRTSub',
    desc: 'SRT·VTT 자막을 Excel(xlsx)이나 CSV 표로 내보내 한 줄씩 검수·번역하고 다시 자막으로 되돌립니다. 시간은 텍스트 그대로, 줄바꿈도 유지됩니다. 모두 브라우저에서 처리됩니다.',
    kw: '자막 엑셀,srt csv 변환,srt 엑셀,엑셀 자막,subtitle to excel,srt to csv',
    intro: '자막을 스프레드시트로 내보내 검수·번역하고, 편집한 표를 다시 자막으로 가져옵니다. 모두 브라우저에서 처리됩니다.',
    feat: 'SRT·VTT를 한 번에 xlsx·CSV로; 표에서 시간·텍스트·메모를 고치고 SRT·VTT로 되돌립니다. 시간 열은 밀리초까지 보존되고 셀 안 줄바꿈도 유지됩니다. 중국어·영어 열 머리글 모두 지원.',
    who: '스프레드시트에서 자막을 검수·번역·주석 다는 번역가, 자막 팀, 편집자.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Excel CSV Converter'
  },
  'de': {
    title: 'Untertitel nach Excel/CSV und zurück | AI-SRTSub',
    desc: 'SRT oder VTT als Excel- oder CSV-Tabelle exportieren, Zeile für Zeile prüfen und übersetzen, dann zurückwandeln. Zeiten bleiben exakt, Umbrüche bleiben erhalten.',
    kw: 'untertitel excel,srt zu csv,srt zu excel,excel zu srt,subtitle to excel',
    intro: 'Untertitel für Durchsicht und Übersetzung ins Tabellenblatt exportieren und die Tabelle danach zurückholen. Läuft komplett im Browser.',
    feat: 'SRT oder VTT per Klick als xlsx oder CSV; Zeiten, Text und Notizen im Blatt bearbeiten und wieder als SRT oder VTT exportieren. Zeitspalten behalten Millisekunden, Zellumbrüche bleiben erhalten. Chinesische und englische Kopfzeilen.',
    who: 'Übersetzer, Fansub-Teams und Redakteure, die Untertitel im Tabellenblatt prüfen, kommentieren oder korrigieren.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Excel CSV Converter'
  },
  'fr': {
    title: 'Sous-titres vers Excel/CSV et retour | AI-SRTSub',
    desc: 'Exportez SRT ou VTT en feuille Excel ou CSV pour relire et traduire ligne à ligne, puis revenez aux sous-titres. Horodatages exacts, sauts de ligne conservés.',
    kw: 'sous-titres excel,srt vers csv,srt vers excel,excel vers srt,subtitle to excel',
    intro: 'Exportez les sous-titres vers un tableur pour les relire et les traduire, puis réimportez la feuille. Tout dans le navigateur.',
    feat: 'De SRT ou VTT vers xlsx ou CSV en un clic ; modifiez temps, texte et notes dans le tableur, puis réexportez en SRT ou VTT. Les colonnes de temps gardent les millisecondes, les retours à la ligne en cellule sont préservés. En-têtes chinois et anglais.',
    who: 'Traducteurs, équipes de fansub et monteurs qui relisent, annotent ou corrigent des sous-titres dans un tableur.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Excel CSV Converter'
  },
  'id': {
    title: 'Subtitle ke Excel/CSV dan sebaliknya | AI-SRTSub',
    desc: 'Ubah SRT atau VTT menjadi lembar Excel atau CSV untuk periksa dan terjemahkan per baris, lalu kembali ke subtitle. Waktu tetap presisi, baris baru utuh.',
    kw: 'subtitle ke excel,srt ke csv,srt ke excel,excel ke srt,subtitle to excel',
    intro: 'Ekspor subtitle ke spreadsheet untuk ditinjau dan diterjemahkan, lalu impor kembali lembarannya. Semua di browser.',
    feat: 'Dari SRT atau VTT ke xlsx atau CSV sekali klik; edit waktu, teks, dan catatan di spreadsheet lalu ekspor kembali. Kolom waktu menjaga presisi milidetik, pemisah baris dalam sel utuh. Header bahasa Mandarin dan Inggris.',
    who: 'Penerjemah, tim fansub, dan editor yang meninjau, memberi catatan, atau memperbaiki subtitle di spreadsheet.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Excel CSV Converter'
  },
  'hi': {
    title: 'सबटाइटल Excel/CSV कनवर्टर | AI-SRTSub',
    desc: 'SRT या VTT को Excel या CSV शीट में निकालें, पंक्ति-दर-पंक्ति समीक्षा और अनुवाद करें, फिर सबटाइटल में वापस लाएँ। समय सटीक रहता है, लाइन ब्रेक बने रहते हैं।',
    kw: 'सबटाइटल excel,srt to csv,srt excel,excel to srt,subtitle spreadsheet',
    intro: 'सबटाइटल को समीक्षा और अनुवाद के लिए स्प्रेडशीट में निर्यात करें, फिर शीट वापस आयात करें। सब ब्राउज़र में।',
    feat: 'SRT या VTT से xlsx या CSV एक क्लिक में; स्प्रेडशीट में समय, पाठ और नोट्स संपादित करें और SRT या VTT में वापस निर्यात करें। समय कॉलम मिलीसेकंड सटीक रहते हैं, सेल-भर लाइन ब्रेक सुरक्षित। चीनी-अंग्रेज़ी दोनों हेडर।',
    who: 'स्प्रेडशीट में सबटाइटल समीक्षा करने, टिप्पणी करने या सुधारने वाले अनुवादक, फैनसब टीम और संपादक।',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Excel CSV Converter'
  },
  'th': {
    title: 'แปลงซับเป็น Excel/CSV และย้อนกลับ | AI-SRTSub',
    desc: 'เปลี่ยน SRT หรือ VTT เป็นชีต Excel หรือ CSV เพื่อตรวจทานและแปลทีละบรรทัด แล้วส่งกลับเป็นซับได้ เวลายังเป๊ะ การขึ้นบรรทัดใหม่คงเดิม',
    kw: 'ซับเป็น excel,srt เป็น csv,excel เป็น srt,subtitle to excel,srt to csv',
    intro: 'ส่งออกซับไปสเปรดชีตเพื่อตรวจทานและแปล แล้วนำชีตกลับมาเป็นซับอีกครั้ง ทำทั้งหมดในเบราว์เซอร์',
    feat: 'จาก SRT หรือ VTT เป็น xlsx หรือ CSV ในคลิกเดียว แก้เวลา ข้อความ และโน้ตในสเปรดชีตแล้วส่งออกกลับ คอลัมน์เวลารักษาความละเอียดระดับมิลลิวินาที การขึ้นบรรทัดในเซลคงเดิม รองรับหัวคอลัมน์จีน-อังกฤษ',
    who: 'นักแปล ทีมแฟนซับ และคนตัดต่อที่ตรวจทาน ใส่โน้ต หรือแก้ซับเป็นกลุ่มในสเปรดชีต',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Excel CSV Converter'
  },
  'vi': {
    title: 'Phụ đề sang Excel/CSV và ngược lại | AI-SRTSub',
    desc: 'Đưa SRT hoặc VTT thành trang tính Excel hoặc CSV để soát và dịch từng dòng, rồi đưa về phụ đề. Thời gian giữ chính xác, xuống dòng giữ nguyên.',
    kw: 'phụ đề excel,srt sang csv,srt sang excel,excel sang srt,subtitle to excel',
    intro: 'Xuất phụ đề ra trang tính để soát và dịch, rồi nhập lại trang tính. Mọi thứ trong trình duyệt.',
    feat: 'Từ SRT hoặc VTT sang xlsx hoặc CSV một cú nhấp; sửa thời gian, văn bản, ghi chú rồi xuất lại. Cột thời gian giữ trọn milli-giây, xuống dòng trong ô được giữ. Tiêu đề tiếng Trung và tiếng Anh.',
    who: 'Dịch giả, nhóm fansub và biên tập viên soát, chú thích hay sửa phụ đề trong trang tính.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Excel CSV Converter'
  },
  'ru': {
    title: 'Субтитры в Excel/CSV и обратно | AI-SRTSub',
    desc: 'Экспортируйте SRT или VTT в лист Excel или CSV, вычитывайте и переводите построчно, затем верните в субтитры. Времена точны, переносы строк сохранены.',
    kw: 'субтитры excel,srt в csv,srt в excel,excel в srt,subtitle to excel',
    intro: 'Экспортируйте субтитры в таблицу для вычитки и перевода, затем импортируйте лист обратно. Всё в браузере.',
    feat: 'Из SRT или VTT в xlsx или CSV в один клик; правьте время, текст и заметки в таблице и экспортируйте обратно. Столбцы времени хранят миллисекунды, переносы строк в ячейках сохраняются. Заголовки на китайском и английском.',
    who: 'Переводчики, фанатские команды и редакторы, которые вычитывают, комментируют или правят субтитры в таблице.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Excel CSV Converter'
  },
  'it': {
    title: 'Sottotitoli in Excel/CSV e ritorno | AI-SRTSub',
    desc: 'Esporta SRT o VTT in un foglio Excel o CSV per rivedere e tradurre riga per riga, poi torna ai sottotitoli. Tempi esatti, a capo conservato.',
    kw: 'sottotitoli excel,srt in csv,srt in excel,excel in srt,subtitle to excel',
    intro: 'Esporta i sottotitoli in un foglio di calcolo per revisione e traduzione, quindi reimporta il foglio. Tutto nel browser.',
    feat: 'Da SRT o VTT a xlsx o CSV in un clic; modifica tempi, testo e note nel foglio ed esporta di nuovo. Le colonne dei tempi mantengono i millisecondi, gli a capo in cella restano. Intestazioni cinesi e inglesi.',
    who: 'Traduttori, team di fansub ed editor che rivedono, annotano o correggono sottotitoli in un foglio di calcolo.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Excel CSV Converter'
  },
  'ar': {
    title: 'الترجمات إلى Excel/CSV والعكس | AI-SRTSub',
    desc: 'حوّل SRT أو VTT إلى ورقة Excel أو CSV لمراجعتها وترجمتها سطرًا سطرًا، ثم أعدها إلى ترجمات. الأوقات دقيقة وفواصل الأسطر محفوظة.',
    kw: 'ترجمات excel,srt إلى csv,srt إلى excel,excel إلى srt,subtitle to excel',
    intro: 'صدّر الترجمات إلى جدول بيانات للمراجعة والترجمة، ثم أعد استيراد الورقة. كل شيء في المتصفح.',
    feat: 'من SRT أو VTT إلى xlsx أو CSV بنقرة واحدة؛ حرّر الأوقات والنص والملاحظات في الجدول ثم صدّر مجددًا. أعمدة الوقت تحفظ أجزاء الثانية وفواصل الأسطر داخل الخلايا تبقى. رؤوس بالصينية والإنجليزية.',
    who: 'المترجمون وفرق المعجبين والمحررون الذين يراجعون الترجمات أو يعلّقون عليها أو يصححونها في جدول بيانات.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Excel CSV Converter'
  },
  'tr': {
    title: "Altyazıları Excel/CSV'ye çevir ve geri | AI-SRTSub",
    desc: "SRT veya VTT'yi Excel ya da CSV sayfasına aktarıp satır satır inceleyin ve çevirin, sonra altyazıya geri dönün. Zamanlar keskin, satır sonları korunur.",
    kw: 'altyazı excel,srt csv,srt excel,excelden srt,subtitle to excel',
    intro: 'Altyazıları inceleme ve çeviri için tabloya aktarın, sonra sayfayı geri alın. Hepsi tarayıcıda.',
    feat: "SRT veya VTT'den xlsx veya CSV'ye tek tıkla; tabloda zamanları, metni ve notları düzenleyip geri dışa aktarın. Zaman sütunları milisaniyeyi korur, hücre içi satır sonları kalır. Çince ve İngilizce başlıklar.",
    who: 'Altyazıları tabloda inceleyen, not alan veya düzelten çevirmenler, fansub ekipleri ve editörler.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Excel CSV Converter'
  },
  'nl': {
    title: 'Ondertitels naar Excel/CSV en terug | AI-SRTSub',
    desc: 'Zet SRT of VTT om naar een Excel- of CSV-blad om regel voor regel te controleren en vertalen, en keer dan terug naar ondertitels. Tijden exact, regeleinden bewaard.',
    kw: 'ondertitels excel,srt naar csv,srt naar excel,excel naar srt,subtitle to excel',
    intro: 'Exporteer ondertitels naar een spreadsheet voor controle en vertaling, en importeer het blad daarna terug. Alles in de browser.',
    feat: 'Van SRT of VTT naar xlsx of CSV in één klik; bewerk tijden, tekst en notities in het blad en exporteer opnieuw. Tijdkolommen behouden milliseconden, regeleinden in cellen blijven staan. Chinese en Engelse koppen.',
    who: 'Vertalers, fansub-teams en editors die ondertitels in een spreadsheet nazien, annoteren of verbeteren.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Excel CSV Converter'
  },
  'pl': {
    title: 'Napisy do Excela/CSV i z powrotem | AI-SRTSub',
    desc: 'Wyeksportuj SRT lub VTT do arkusza Excel lub CSV, sprawdzaj i tłumacz wiersz po wierszu, a potem wróć do napisów. Czasy dokładne, łamanie wierszy zachowane.',
    kw: 'napisy excel,srt do csv,srt do excelu,excel do srt,subtitle to excel',
    intro: 'Eksportuj napisy do arkusza kalkulacyjnego do sprawdzenia i tłumaczenia, po czym zaimportuj arkusz z powrotem. Wszystko w przeglądarce.',
    feat: 'Z SRT lub VTT do xlsx lub CSV jednym kliknięciem; edytuj czasy, tekst i notatki w arkuszu i eksportuj z powrotem. Kolumny czasu zachowują milisekundy, łamanie wierszy w komórkach zostaje. Nagłówki chińskie i angielskie.',
    who: 'Tłumacze, zespoły fansub i edytorzy, którzy sprawdzają, komentują lub poprawiają napisy w arkuszu.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Excel CSV Converter'
  },
  'sv': {
    title: 'Undertexter till Excel/CSV och tillbaka | AI-SRTSub',
    desc: 'Exportera SRT eller VTT till ett Excel- eller CSV-blad för granskning och översättning, och återvänd till undertexter. Tider exakta, radbrytningar bevarade.',
    kw: 'undertexter excel,srt till csv,srt till excel,excel till srt,subtitle to excel',
    intro: 'Exportera undertexter till ett kalkylblad för granskning och översättning, importera sedan bladet tillbaka. Allt i webbläsaren.',
    feat: 'Från SRT eller VTT till xlsx eller CSV med ett klick; redigera tider, text och anteckningar i bladet och exportera igen. Tidskolumner behåller millisekunder, radbrytningar i celler bevaras. Kinesiska och engelska rubriker.',
    who: 'Översättare, fansub-team och redaktörer som granskar, kommenterar eller rättar undertexter i ett kalkylblad.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Excel CSV Converter'
  },
  'cs': {
    title: 'Titulky do Excelu/CSV a zpět | AI-SRTSub',
    desc: 'Exportujte SRT nebo VTT do listu Excel nebo CSV, kontrolujte a překládejte řádek po řádku a vraťte se k titulkům. Časy přesné, zalomení řádků zachováno.',
    kw: 'titulky excel,srt do csv,srt do excelu,excel do srt,subtitle to excel',
    intro: 'Exportujte titulky do tabulky pro kontrolu a překlad a poté list importujte zpět. Vše v prohlížeči.',
    feat: 'Ze SRT nebo VTT do xlsx nebo CSV na jedno kliknutí; upravujte časy, text a poznámky v listu a exportujte zpět. Sloupce času uchovávají milisekundy, zalomení řádků v buňkách zůstává. Čínské i anglické záhlaví.',
    who: 'Překladatelé, fansub týmy a editoři, kteří v tabulce kontrolují, komentují nebo opravují titulky.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Excel CSV Converter'
  },
  'uk': {
    title: 'Субтитри в Excel/CSV і назад | AI-SRTSub',
    desc: 'Експортуйте SRT або VTT у аркуш Excel або CSV, вичитуйте й перекладайте рядок за рядком, потім повертайте до субтитрів. Часи точні, переноси рядків збережено.',
    kw: 'субтитри excel,srt в csv,srt в excel,excel в srt,subtitle to excel',
    intro: 'Експортуйте субтитри в таблицю для вичитки та перекладу, потім імпортуйте аркуш назад. Усе в браузері.',
    feat: 'З SRT або VTT у xlsx або CSV за один клік; правьте час, текст і нотатки в таблиці та експортуйте назад. Стовпці часу зберігають мілісекунди, переноси в клітинках лишаються. Заголовки китайською та англійською.',
    who: 'Перекладачі, фан-команди та редактори, що вичитують, коментують чи правлять субтитри в таблиці.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Excel CSV Converter'
  },
  'da': {
    title: 'Undertekster til Excel/CSV og tilbage | AI-SRTSub',
    desc: 'Eksportér SRT eller VTT til et Excel- eller CSV-ark for linjevis gennemgang og oversættelse, og vend tilbage til undertekster. Tider præcise, linjeskift bevaret.',
    kw: 'undertekster excel,srt til csv,srt til excel,excel til srt,subtitle to excel',
    intro: 'Eksportér undertekster til et regneark til gennemgang og oversættelse, og importér arket tilbage bagefter. Alt i browseren.',
    feat: 'Fra SRT eller VTT til xlsx eller CSV med ét klik; redigér tider, tekst og noter i arket og eksportér igen. Tidskolonner bevarer millisekunder, linjeskift i celler bevares. Kinesiske og engelske overskrifter.',
    who: 'Oversættere, fansub-hold og klippere, der gennemgår, kommenterer eller retter undertekster i et regneark.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Excel CSV Converter'
  },
  'fi': {
    title: 'Tekstitykset Exceliin/CSV:hen ja takaisin | AI-SRTSub',
    desc: 'Vie SRT tai VTT Excel- tai CSV-taulukkoon rivikohtaiseen tarkistukseen ja kääntämiseen, ja palaa sitten tekstityksiin. Ajat tarkkoja, rivinvaihdot säilyvät.',
    kw: 'tekstitys excel,srt csv:hen,srt excel,excel srt,subtitle to excel',
    intro: 'Vie tekstitykset taulukkolaskentaan tarkistettavaksi ja käännettäväksi, tuo taulukko sitten takaisin. Kaikki selaimessa.',
    feat: 'SRT:stä tai VTT:stä xlsx- tai CSV-muotoon yhdellä napsautuksella; muokkaa aikoja, tekstiä ja muistiinpanoja taulukossa ja vie takaisin. Aikasarjat säilyttävät millisekunnit, solujen rivinvaihdot pysyvät. Kiinalaiset ja englantilaiset otsikot.',
    who: 'Kääntäjät, fansub-tiimit ja leikkaajat, jotka tarkistavat, kommentoivat tai korjaavat tekstityksiä taulukkolaskennassa.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Excel CSV Converter'
  },
  'el': {
    title: 'Υπότιτλοι σε Excel/CSV και αντίστροφα | AI-SRTSub',
    desc: 'Εξαγάγετε SRT ή VTT σε φύλλο Excel ή CSV για γραμμή-γραμμή αναθεώρηση και μετάφραση, και επιστρέψτε σε υπότιτλους. Ακριβείς χρόνοι, διατηρημένες αλλαγές γραμμής.',
    kw: 'υπότιτλοι excel,srt σε csv,srt σε excel,excel σε srt,subtitle to excel',
    intro: 'Εξαγάγετε υπότιτλους σε υπολογιστικό φύλλο για αναθεώρηση και μετάφραση, μετά επανεισάγετε το φύλλο. Όλα στο πρόγραμμα περιήγησης.',
    feat: 'Από SRT ή VTT σε xlsx ή CSV με ένα κλικ· επεξεργαστείτε χρόνους, κείμενο και σημειώσεις στο φύλλο και εξαγάγετε ξανά. Οι στήλες χρόνου κρατούν τα millisecond, οι αλλαγές γραμμής στα κελιά διατηρούνται. Κινεζικές και αγγλικές κεφαλίδες.',
    who: 'Μεταφραστές, ομάδες fansub και μοντέρ που αναθεωρούν, σχολιάζουν ή διορθώνουν υπότιτλους σε υπολογιστικό φύλλο.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Excel CSV Converter'
  },
  'he': {
    title: 'כתוביות ל-Excel/CSV ובחזרה | AI-SRTSub',
    desc: 'המירו SRT או VTT לגיליון Excel או CSV לביקורת ותרגום שורה-שורה, ואז החזירו לכתוביות. זמנים מדויקים, שבירת שורות נשמרת.',
    kw: 'כתוביות excel,srt ל csv,srt ל excel,excel ל srt,subtitle to excel',
    intro: 'ייצאו כתוביות לגיליון אלקטרוני לביקורת ותרגום, ואז ייבאו את הגיליון בחזרה. הכול בדפדפן.',
    feat: 'מ-SRT או VTT אל xlsx או CSV בלחיצה אחת; ערכו זמנים, טקסט והערות בגיליון וייצאו שוב. עמודות הזמן שומרות מילישניות, שבירת שורות בתאים נשמרת. כותרות בסינית ובאנגלית.',
    who: 'מתרגמים, צוותי מעריצים ועורכים שסוקרים, מעירים או מתקנים כתוביות בגיליון אלקטרוני.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Excel CSV Converter'
  },
  'ro': {
    title: 'Subtitrări în Excel/CSV și invers | AI-SRTSub',
    desc: 'Exportați SRT sau VTT într-o foaie Excel sau CSV pentru revizuire și traducere rând cu rând, apoi reveniți la subtitrări. Timpi exacți, rânduri noi păstrate.',
    kw: 'subtitrări excel,srt în csv,srt în excel,excel în srt,subtitle to excel',
    intro: 'Exportați subtitrările într-o foaie de calcul pentru revizuire și traducere, apoi importați foaia înapoi. Totul în browser.',
    feat: 'Din SRT sau VTT în xlsx sau CSV într-un clic; editați timpii, textul și notele în foaie și exportați din nou. Coloanele de timp păstrează milisecundele, rândurile noi din celule rămân. Antete în chineză și engleză.',
    who: 'Traducători, echipe de fansub și editori care revizuiesc, adnotează sau corectează subtitrări într-o foaie de calcul.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Subtitle Excel CSV Converter'
  },
};

/* v0.9.316：第十五个页面 —— 批量字幕转换打包 /batch.html 的 SEO 表。与既有十二张表同规格。 */
const SEO_BATCH = {
  'zh-CN': {
    title: '批量转换字幕 SRT/VTT 并打包下载 - 一次几百个 | 随心字幕 AI',
    desc: '免费在线批量字幕转换：一次拖入几十上百个 SRT 或 VTT，统一转成目标格式后打成一个 ZIP 下载。序号重排、时间戳规范化，认不出的文件单独标出来不含糊。全程在浏览器里完成，文件不上传。',
    kw: '批量转换字幕,srt批量转vtt,vtt批量转srt,字幕批量处理,batch convert subtitles,srt to vtt online,批量字幕工具',
    intro: '几十上百个字幕文件一次拖进来，统一转格式，打成一个 ZIP 拿走。全程在浏览器里完成，文件不上传。',
    feat: 'SRT 批量转 VTT、VTT 批量转 SRT，序号统一重排，时间戳按目标格式规范化。认不出的文件单独标出来、不进包。文件名保持原名只换扩展名，重名自动加序号。',
    who: '要给整个剧集目录换格式、给播放器统一喂 VTT 的剪辑师、字幕组、站长。',
    siteName: '随心字幕 AI', jsonldName: '随心字幕 AI', jsonldAlt: 'Batch Subtitle Converter'
  },
  'zh-TW': {
    title: '批次轉換字幕 SRT/VTT 並打包下載 - 一次幾百個 | 隨心字幕 AI',
    desc: '免費線上批次字幕轉換：一次拖入幾十上百個 SRT 或 VTT，統一轉成目標格式後打成一個 ZIP 下載。序號重排、時間戳規範化，認不出的檔案單獨標出來不含糊。全程在瀏覽器裡完成，檔案不上傳。',
    kw: '批次轉換字幕,srt批次轉vtt,vtt批次轉srt,字幕批次處理,batch convert subtitles,srt to vtt online,批次字幕工具',
    intro: '幾十上百個字幕檔案一次拖進來，統一轉格式，打成一個 ZIP 拿走。全程在瀏覽器裡完成，檔案不上傳。',
    feat: 'SRT 批次轉 VTT、VTT 批次轉 SRT，序號統一重排，時間戳按目標格式規範化。認不出的檔案單獨標出來、不進包。檔名保持原名只換副檔名，重名自動加序號。',
    who: '要給整個劇集目錄換格式、給播放器統一餵 VTT 的剪輯師、字幕組、站長。',
    siteName: '隨心字幕 AI', jsonldName: '隨心字幕 AI', jsonldAlt: 'Batch Subtitle Converter'
  },
  'en': {
    title: 'Batch Convert Subtitles to SRT/VTT | AI-SRTSub',
    desc: 'Drop dozens or hundreds of SRT/VTT files, convert them all to one format and download one ZIP. Renumbering and timestamps normalized; unreadable files flagged.',
    kw: 'batch convert subtitles,srt to vtt,batch subtitle converter,bulk srt,convert multiple subtitles,subtitle zip',
    intro: 'Drag in hundreds of subtitle files, convert them all, take away one ZIP. Runs fully in your browser.',
    feat: "SRT to VTT and back in bulk; sequence numbers re-ordered and timestamps normalized per target format. Files that can't be parsed are flagged and left out of the ZIP. Original filenames kept with a new extension; collisions get a suffix.",
    who: 'Editors and subtitlers converting whole series folders, and site owners feeding players a single format.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Batch Subtitle Converter'
  },
  'ja': {
    title: '字幕を一括変換して ZIP で保存 | AI-SRTSub',
    desc: '何十・何百もの SRT/VTT をまとめて投入し、全てを目標形式へ変換、ZIP 1 つでダウンロード。番号は振り直し、読めないファイルは明示。ブラウザ内で完結します。',
    kw: '字幕 一括変換,srt 一括 vtt,vtt 一括 srt,一括 字幕,batch convert subtitles,srt to vtt',
    intro: '何百もの字幕ファイルを一度に投入し、全て変換して ZIP 1 つで持ち帰れます。すべてブラウザ内で処理されます。',
    feat: 'SRT→VTT、VTT→SRT を一括で。番号は統一して振り直し、タイムスタンプは出力形式に正規化。解析できないファイルは明示され ZIP に入りません。ファイル名は元のままで拡張子だけ変更、重複には番号を付与。',
    who: 'シリーズ全体のフォルダを変換したい編集者・字幕チーム、プレイヤーに VTT を統一供給したいサイト管理者。',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Batch Subtitle Converter'
  },
  'es': {
    title: 'Conversión por lotes de subtítulos | AI-SRTSub',
    desc: 'Suelta decenas o cientos de SRT/VTT, conviértelos todos a un formato y descarga un único ZIP. Renumeración y marcas normalizadas; los ilegibles se señalan.',
    kw: 'convertir subtítulos por lotes,srt a vtt por lotes,conversor masivo subtítulos,batch convert subtitles',
    intro: 'Arrastra cientos de archivos de subtítulos, conviértelos todos y llévate un solo ZIP. Todo en tu navegador.',
    feat: 'SRT a VTT y al revés en masa; renumeración de secuencias y marcas de tiempo normalizadas al formato destino. Los archivos ilegibles se marcan y quedan fuera del ZIP. Se conservan los nombres originales con nueva extensión; los duplicados llevan sufijo.',
    who: 'Editores y subtituladores que convierten carpetas de series enteras, y webmasters que alimentan reproductores con un solo formato.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Batch Subtitle Converter'
  },
  'pt': {
    title: 'Conversão em lote de legendas | AI-SRTSub',
    desc: 'Solte dezenas ou centenas de SRT/VTT, converta todos para um formato e baixe um único ZIP. Renumeração e marcas normalizadas; ilegíveis sinalizados.',
    kw: 'converter legendas em lote,srt para vtt em lote,conversor em massa de legendas,batch convert subtitles',
    intro: 'Arraste centenas de arquivos de legenda, converta todos e leve um único ZIP. Tudo no navegador.',
    feat: 'SRT para VTT e vice-versa em massa; renumeração e marcações de tempo normalizadas ao formato alvo. Arquivos ilegíveis são marcados e ficam de fora do ZIP. Nomes originais mantidos com nova extensão; duplicatas ganham sufixo.',
    who: 'Editores e legendadores convertendo pastas de séries inteiras, e donos de sites que alimentam players com um único formato.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Batch Subtitle Converter'
  },
  'ko': {
    title: '자막 일괄 변환 | AI-SRTSub',
    desc: '수십~수백 개의 SRT/VTT를 한 번에 넣고 모두 목표 형식으로 변환해 ZIP 하나로 받습니다. 번호 재정렬, 타임스탬프 정규화, 못 읽는 파일은 따로 표시됩니다.',
    kw: '자막 일괄 변환,srt 일괄 vtt,자막 대량 변환,batch convert subtitles,srt to vtt',
    intro: '수백 개 자막 파일을 한 번에 넣고 모두 변환해 ZIP 하나로 가져갑니다. 모두 브라우저에서 처리됩니다.',
    feat: 'SRT↔VTT 대량 변환; 번호는 통일해 다시 매기고 타임스탬프는 대상 형식에 맞춰 정규화합니다. 파싱 못 하는 파일은 표시되고 ZIP에 들어가지 않습니다. 파일명은 유지하고 확장자만 교체, 중복엔 번호를 붙입니다.',
    who: '시즌 전체 폴더를 변환하는 편집자·자막 팀, 플레이어에 VTT를 통일해 먹이는 사이트 운영자.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Batch Subtitle Converter'
  },
  'de': {
    title: 'Untertitel stapelweise konvertieren | AI-SRTSub',
    desc: 'Ziehen Sie Dutzende oder Hunderte SRT/VTT-Dateien hinein, konvertieren Sie alle in ein Format und laden Sie ein ZIP herunter. Unlesbare Dateien werden markiert.',
    kw: 'untertitel stapelweise konvertieren,srt stapelweise vtt,untertitel massenkonvertierung,batch convert subtitles',
    intro: 'Hunderte Untertiteldateien hineinziehen, alle konvertieren, ein ZIP mitnehmen. Läuft komplett im Browser.',
    feat: 'SRT nach VTT und zurück in Masse; Nummern neu geordnet, Zeitstempel ans Zielformat angepasst. Unlesbare Dateien werden markiert und landen nicht im ZIP. Ursprüngliche Namen mit neuer Endung; bei Kollisionen gibt es einen Suffix.',
    who: 'Cutter und Untertitler, die ganze Serienordner umwandeln, und Betreiber, die Playern ein einheitliches Format füttern.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Batch Subtitle Converter'
  },
  'fr': {
    title: 'Conversion de sous-titres par lot | AI-SRTSub',
    desc: 'Déposez des dizaines ou centaines de fichiers SRT/VTT, convertissez-les tous vers un format cible et téléchargez un seul ZIP. Les fichiers illisibles sont signalés.',
    kw: 'convertir sous-titres par lot,srt vers vtt par lot,conversion en masse sous-titres,batch convert subtitles',
    intro: 'Glissez des centaines de fichiers de sous-titres, convertissez-les tous et repartez avec un seul ZIP. Tout dans le navigateur.',
    feat: "SRT vers VTT et inversement en masse ; renumérotation et horodatages normalisés selon le format cible. Les fichiers illisibles sont signalés et exclus du ZIP. Noms d'origine conservés avec nouvelle extension ; les doublons reçoivent un suffixe.",
    who: 'Monteurs et sous-titreurs convertissant des dossiers de séries entières, et webmestres alimentant leurs lecteurs avec un format unique.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Batch Subtitle Converter'
  },
  'id': {
    title: 'Konversi subtitle massal | AI-SRTSub',
    desc: 'Masukkan puluhan hingga ratusan file SRT/VTT, konversi semua ke satu format, unduh satu ZIP. Penomoran dan stempel waktu dinormalisasi; file tak terbaca ditandai.',
    kw: 'konversi subtitle massal,srt ke vtt massal,konverter batch subtitle,batch convert subtitles',
    intro: 'Seret ratusan file subtitle, konversi semuanya, dan bawa pulang satu ZIP. Semua di browser.',
    feat: 'SRT ke VTT dan sebaliknya secara massal; penomoran urutan diurutkan ulang dan stempel waktu dinormalisasi sesuai format target. File yang tak terurai ditandai dan tidak masuk ZIP. Nama asli dipertahankan dengan ekstensi baru; tabrakan nama diberi akhiran.',
    who: 'Editor dan pembuat subtitle yang mengonversi folder serial utuh, dan pengelola situs yang memberi player satu format seragam.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Batch Subtitle Converter'
  },
  'hi': {
    title: 'सबटाइटल बैच कनवर्टर | AI-SRTSub',
    desc: 'दर्जनों-सैकड़ों SRT/VTT फ़ाइलें डालें, सबको एक फ़ॉर्मैट में बदलें, एक ZIP डाउनलोड करें। नंबरिंग फिर से, टाइमस्टैम्प सामान्यीकृत; न पढ़ी जाने वाली चिह्नित।',
    kw: 'सबटाइटल बैच कनवर्टर,srt बैच vtt,सबटाइटल थोक कनवर्टर,batch convert subtitles',
    intro: 'सैकड़ों सबटाइटल फ़ाइलें डालें, सब बदलें, एक ZIP लेकर चलें। सब ब्राउज़र में होता है।',
    feat: 'SRT↔VTT थोक में; क्रम संख्याएँ फिर लगती हैं और टाइमस्टैम्प लक्ष्य फ़ॉर्मैट के अनुसार सामान्यीकृत होते हैं। जो फ़ाइलें पार्स नहीं होतीं वे चिह्नित होकर ZIP में नहीं आतीं। मूल नाम बने रहते हैं, केवल एक्सटेंशन बदलता है; टकराव पर प्रत्यय लगता है।',
    who: 'पूरे सीरीज़ फ़ोल्डर बदलने वाले एडिटर-सबटाइटलर और प्लेयर को एक ही फ़ॉर्मैट खिलाने वाले साइट संचालक।',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Batch Subtitle Converter'
  },
  'th': {
    title: 'แปลงซับแบบชุด | AI-SRTSub',
    desc: 'ลากไฟล์ SRT/VTT หลายสิบหลายร้อยไฟล์เข้ามา แปลงทั้งหมดเป็นฟอร์แมตเดียว แล้วดาวน์โหลดเป็น ZIP เดียว ไฟล์ที่อ่านไม่ออกจะถูกทำเครื่องหมายแยกไว้',
    kw: 'แปลงซับแบบชุด,srt เป็น vtt ทีเดียว,ตัวแปลงซับจำนวนมาก,batch convert subtitles',
    intro: 'ลากไฟล์ซับหลายร้อยไฟล์เข้ามา แปลงให้หมดแล้วรับกลับเป็น ZIP เดียว ทำทั้งหมดในเบราว์เซอร์',
    feat: 'แปลง SRT↔VTT แบบจำนวนมาก เลขลำดับเรียงใหม่ timestamp ปรับตามฟอร์แมตปลายทาง ไฟล์ที่อ่านไม่ออกถูกทำเครื่องหมายและไม่เข้า ZIP ชื่อไฟล์เดิมเปลี่ยนแค่นามสกุล ชื่อซ้ำต่อท้ายเลข',
    who: 'คนตัดต่อและทีมซับที่แปลงทั้งโฟลเดอร์ซีรีส์ และเว็บมาสเตอร์ที่ป้อน VTT ให้เครื่องเล่นเป็นฟอร์แมตเดียว',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Batch Subtitle Converter'
  },
  'vi': {
    title: 'Chuyển đổi phụ đề hàng loạt | AI-SRTSub',
    desc: 'Kéo hàng chục hay hàng trăm file SRT/VTT vào, chuyển tất cả sang một định dạng, tải về một ZIP. Đánh số lại, timestamp chuẩn hóa; file không đọc được bị đánh dấu.',
    kw: 'chuyển đổi phụ đề hàng loạt,srt sang vtt hàng loạt,batch convert subtitles',
    intro: 'Kéo hàng trăm file phụ đề vào, chuyển tất cả và mang về một ZIP. Mọi thứ trong trình duyệt.',
    feat: 'SRT↔VTT hàng loạt; số thứ tự được đánh lại, timestamp chuẩn hóa theo định dạng đích. File không phân tích được bị đánh dấu và không vào ZIP. Giữ tên gốc, chỉ đổi phần mở rộng; trùng tên thì thêm hậu tố.',
    who: 'Biên tập viên và người làm phụ đề chuyển cả thư mục series, và chủ trang web muốn trình phát dùng một định dạng duy nhất.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Batch Subtitle Converter'
  },
  'ru': {
    title: 'Пакетное конвертирование субтитров | AI-SRTSub',
    desc: 'Закиньте десятки или сотни файлов SRT/VTT, переведите их все в один формат и скачайте один ZIP. Нумерация заново, метки нормализованы; нечитаемые файлы помечены.',
    kw: 'пакетное конвертирование субтитров,srt в vtt пачкой,массовая конвертация субтитров,batch convert subtitles',
    intro: 'Перетащите сотни файлов субтитров, конвертируйте все и заберите один ZIP. Всё в браузере.',
    feat: 'SRT↔VTT массово; нумерация переупорядочена, метки времени нормализованы под целевой формат. Нечитаемые файлы помечаются и не попадают в ZIP. Исходные имена сохраняются, меняется только расширение; при совпадении добавляется суффикс.',
    who: 'Монтажёры и субтитровщики, конвертирующие целые папки сериалов, и владельцы сайтов, дающие плеерам единый формат.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Batch Subtitle Converter'
  },
  'it': {
    title: 'Conversione sottotitoli in batch | AI-SRTSub',
    desc: 'Trascina decine o centinaia di SRT/VTT, convertili in un formato e scarica un solo ZIP. Rinumerazione e timestamp normalizzati; i file illeggibili sono segnalati.',
    kw: 'convertire sottotitoli in batch,srt in vtt in blocco,conversione in massa sottotitoli,batch convert subtitles',
    intro: 'Trascina centinaia di file di sottotitoli, convertili tutti e portati via un solo ZIP. Tutto nel browser.',
    feat: 'Da SRT a VTT e viceversa in blocco; sequenze rinumerate e timestamp normalizzati al formato di destinazione. I file illeggibili sono segnalati ed esclusi dallo ZIP. I nomi originali restano con la nuova estensione; ai doppioni va un suffisso.',
    who: 'Montatori e sottotitolatori che convertono intere cartelle di serie, e webmaster che danno ai player un unico formato.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Batch Subtitle Converter'
  },
  'ar': {
    title: 'تحويل الترجمات دفعة واحدة | AI-SRTSub',
    desc: 'ألقِ عشرات أو مئات ملفات SRT/VTT، وحوّلها كلها إلى صيغة واحدة ونزّل ملف ZIP واحد. إعادة ترقيم وطوابع زمنية منظمة؛ الملفات غير المقروءة تُعلَّم.',
    kw: 'تحويل الترجمات دفعة,srt إلى vtt بالجملة,محول ترجمات جماعي,batch convert subtitles',
    intro: 'اسحب مئات ملفات الترجمة، حوّلها كلها واحصل على ملف ZIP واحد. كل شيء في المتصفح.',
    feat: 'تحويل جماعي بين SRT و VTT؛ إعادة ترقيم التسلسلات وتنظيم الطوابع الزمنية حسب الصيغة الهدف. الملفات غير المقروءة تُعلَّم ولا تدخل الأرشيف. تُحفظ الأسماء الأصلية مع امتداد جديد، والمتكررة تأخذ لاحقة.',
    who: 'المونتيرون والمترجمون الذين يحولون مجلدات مسلسلات كاملة، وأصحاب المواقع الذين يقدمون للمشغّلات صيغة واحدة.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Batch Subtitle Converter'
  },
  'tr': {
    title: 'Toplu altyazı dönüştürme | AI-SRTSub',
    desc: 'Onlarca ya da yüzlerce SRT/VTT bırakın, hepsini tek biçime dönüştürün ve tek ZIP indirin. Yeniden numaralama, normalize damgalar; okunmayanlar işaretlenir.',
    kw: 'toplu altyazı dönüştürme,srt toplu vtt,toplu subtitle dönüştürücü,batch convert subtitles',
    intro: 'Yüzlerce altyazı dosyasını sürükleyin, hepsini dönüştürün ve tek ZIP alın. Hepsi tarayıcıda.',
    feat: "SRT↔VTT toplu; sıra numaraları yeniden düzenlenir, zaman damgaları hedef biçime göre normalize edilir. Okunamayan dosyalar işaretlenir ve ZIP'e girmez. Özgün adlar korunur, sadece uzantı değişir; çakışmalara sonek eklenir.",
    who: 'Tüm dizi klasörlerini dönüştüren kurgucular, altyazıcular ve oynatıcılara tek biçim sunan site sahipleri.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Batch Subtitle Converter'
  },
  'nl': {
    title: 'Ondertitels bulksgewijs converteren | AI-SRTSub',
    desc: 'Sleep tientallen of honderden SRT/VTT-bestanden in, converteer alles naar één formaat en download één ZIP. Onleesbare bestanden worden gemarkeerd.',
    kw: 'ondertitels bulksgewijs,srt naar vtt in bulk,bulk subtitle converter,batch convert subtitles',
    intro: 'Sleep honderden ondertitelbestanden, converteer alles en neem één ZIP mee. Alles in de browser.',
    feat: 'SRT naar VTT en terug in bulk; volgnummers opnieuw gerangschikt, tijdstempels genormaliseerd naar het doelformaat. Onleesbare bestanden worden gemarkeerd en gaan de ZIP niet in. Originele namen blijven, alleen de extensie verandert; bij botsingen komt er een achtervoegsel.',
    who: 'Cutters en ondertitelaars die hele seriemappen converteren, en webmasters die spelers één formaat voeden.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Batch Subtitle Converter'
  },
  'pl': {
    title: 'Masowa konwersja napisów | AI-SRTSub',
    desc: 'Wrzuć dziesiątki lub setki plików SRT/VTT, przekonwertuj je na jeden format i pobierz ZIP. Renumeracja i znaczniki znormalizowane; nieczytelne pliki oznaczone.',
    kw: 'masowa konwersja napisów,srt do vtt hurtowo,konwerter wsadowy napisów,batch convert subtitles',
    intro: 'Przeciągnij setki plików napisów, przekonwertuj wszystkie i zabierz jedno ZIP. Wszystko w przeglądarce.',
    feat: 'SRT↔VTT masowo; numeracja ponownie uporządkowana, znaczniki czasu znormalizowane do formatu docelowego. Nieczytelne pliki są oznaczane i nie trafiają do ZIP-a. Nazwy oryginalne zostają, zmienia się tylko rozszerzenie; kolizje dostają przyrostek.',
    who: 'Montażyści i twórcy napisów konwertujący całe foldery seriali oraz właściciele stron karmiący odtwarzacze jednym formatem.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Batch Subtitle Converter'
  },
  'sv': {
    title: 'Masskonvertering av undertexter | AI-SRTSub',
    desc: 'Släpp in dussentals eller hundratals SRT/VTT-filer, konvertera alla till ett format och ladda ner en ZIP. Oläsliga filer markeras.',
    kw: 'masskonvertera undertexter,srt till vtt i bulk,konvertera undertexter batchvis,batch convert subtitles',
    intro: 'Dra in hundratals undertextfiler, konvertera alla och hämta en enda ZIP. Allt i webbläsaren.',
    feat: 'SRT till VTT och tillbaka i bulk; sekvensnummer omordnade, tidsstämplar normaliserade till målformatet. Oläsliga filer markeras och hamnar inte i ZIP:en. Ursprungliga namn behålls med ny filändelse; kollisioner får ett suffix.',
    who: 'Klippare och undertextare som konverterar hela seriemappar, och webbansvariga som ger spelarna ett enda format.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Batch Subtitle Converter'
  },
  'cs': {
    title: 'Hromadná konverze titulků | AI-SRTSub',
    desc: 'Hoďte desítky či stovky souborů SRT/VTT, převeďte je do jednoho formátu a stáhněte ZIP. Přečíslování a časové značky normalizovány; nečitelné soubory označeny.',
    kw: 'hromadná konverze titulků,srt na vtt hromadně,dávkový převod titulků,batch convert subtitles',
    intro: 'Přetáhněte stovky souborů titulků, převeďte všechny a odneste jedno ZIP. Vše v prohlížeči.',
    feat: 'SRT↔VTT hromadně; čísla sekvencí přečíslována, časové značky normalizovány pro cílový formát. Nečitelné soubory se označí a do ZIPu se nedostanou. Původní názvy zůstávají, mění se jen přípona; kolize dostanou číselnou příponu.',
    who: 'Střihači a titulkáři převádějící celé složky seriálů a provozovatelé webů, kteří přehrávačům dávají jednotný formát.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Batch Subtitle Converter'
  },
  'uk': {
    title: 'Пакетне конвертування субтитрів | AI-SRTSub',
    desc: 'Закиньте десятки чи сотні файлів SRT/VTT, конвертуйте всі в один формат і скачайте один ZIP. Перенумерація та мітки нормалізовані; нечитані файли позначено.',
    kw: 'пакетне конвертування субтитрів,srt у vtt пачкою,масове конвертування субтитрів,batch convert subtitles',
    intro: 'Перетягніть сотні файлів субтитрів, конвертуйте всі та заберіть один ZIP. Усе в браузері.',
    feat: 'SRT↔VTT масово; нумерація перевпорядкована, мітки часу нормалізовані під цільовий формат. Нечитані файли позначаються і не потрапляють у ZIP. Початкові назви зберігаються, змінюється лише розширення; збіги отримують суфікс.',
    who: 'Монтажери та субтитрувальники, що конвертують цілі теки серіалів, і власники сайтів, які дають плеєрам один формат.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Batch Subtitle Converter'
  },
  'da': {
    title: 'Massekonvertering af undertekster | AI-SRTSub',
    desc: 'Smid dusinvise eller hundredvis af SRT/VTT ind, konvertér dem alle til ét format og download én ZIP. Gennumrering og tider normaliseret; ulæselige filer markeres.',
    kw: 'massekonverter undertekster,srt til vtt i bulk,konverter undertekster batchvis,batch convert subtitles',
    intro: 'Træk hundredvis af undertekstfiler ind, konvertér dem alle og hent én ZIP. Alt i browseren.',
    feat: "SRT til VTT og tilbage i bulk; sekvensnumre omnummereret, tidsstempler normaliseret til målformatet. Ulæselige filer markeres og kommer ikke i ZIP'en. Oprindelige navne bevares med ny filendelse; kollisioner får et suffiks.",
    who: 'Klippere og undertekstere, der konverterer hele seriemapper, og webansvarlige, der giver afspillerne ét format.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Batch Subtitle Converter'
  },
  'fi': {
    title: 'Tekstitysten massamuunnos | AI-SRTSub',
    desc: 'Pudota kymmeniä tai satoja SRT/VTT-tiedostoa, muunna kaikki yhteen muotoon ja lataa yksi ZIP. Uudelleennumerointi ja aikaleimat normalisoitu; lukemattomat merkitty.',
    kw: 'tekstitysten massamuunnos,srt vtt:ksi erissä,muunna tekstitykset erissä,batch convert subtitles',
    intro: 'Vedä satoja tekstitystiedostoja, muunna kaikki ja nappaa yksi ZIP. Kaikki selaimessa.',
    feat: 'SRT↔VTT massana; järjestysnumerot uudelleennumeroitu, aikaleimat normalisoitu kohdemuotoon. Lukemattomat tiedostot merkitään eivätkä päädy ZIP:iin. Alkuperäiset nimet säilyvät, vain tiedostopääte vaihtuu; törmäykset saavat jälkiliitteen.',
    who: 'Koko sarjakansioita muuntavat leikkaajat ja tekstittäjät sekä sivuston ylläpitäjät, jotka syöttävät soittimille yhden muodon.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Batch Subtitle Converter'
  },
  'el': {
    title: 'Μαζική μετατροπή υποτίτλων | AI-SRTSub',
    desc: 'Ρίξτε δεκάδες ή εκατοντάδες SRT/VTT, μετατρέψτε όλα σε μία μορφή και κατεβάστε ένα ZIP. Επαναρίθμηση και χρονοσφραγίδες κανονικοποιημένες· τα αδιάβαστα σημειώνονται.',
    kw: 'μαζική μετατροπή υποτίτλων,srt σε vtt μαζικά,μαζικός μετατροπέας υποτίτλων,batch convert subtitles',
    intro: 'Σύρετε εκατοντάδες αρχεία υποτίτλων, μετατρέψτε τα όλα και πάρετε ένα ZIP. Όλα στο πρόγραμμα περιήγησης.',
    feat: 'SRT↔VTT μαζικά· η αρίθμηση αναδιατάσσεται και οι χρονοσφραγίδες κανονικοποιούνται στην μορφή προορισμού. Τα αδιάβαστα αρχεία σημειώνονται και μένουν εκτός ZIP. Τα αρχικά ονόματα μένουν με νέα κατάληξη· οι συγκρούσεις παίρνουν επίθεμα.',
    who: 'Μοντέρ και υπότιτλοι που μετατρέπουν ολόκληρους φακέλους σειρών και διαχειριστές που δίνουν στους players μία μορφή.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Batch Subtitle Converter'
  },
  'he': {
    title: 'המרת כתוביות באצווה | AI-SRTSub',
    desc: 'השליכו עשרות או מאות קבצי SRT/VTT, המירו את כולם לפורמט אחד והורידו ZIP אחד. מספור מחדש וחותמות זמן מנורמלות; קבצים בלתי קריאים מסומנים.',
    kw: 'המרת כתוביות באצווה,srt ל vtt בכמות גדולה,ממיר כתוביות המוני,batch convert subtitles',
    intro: 'גררו מאות קבצי כתוביות, המירו את כולם וקחו ZIP אחד. הכול בדפדפן.',
    feat: 'המרה המונית בין SRT ל-VTT; המספור מסודר מחדש וחותמות הזמן מנורמלות לפורמט היעד. קבצים בלתי קריאים מסומנים ולא נכנסים ל-ZIP. השמות המקוריים נשמרים עם סיומת חדשה; התנגשויות מקבלות סיומת מספר.',
    who: 'עורכים ומתרגמים הממירים תיקיות סדרות שלמות, ומנהלי אתרים שמזינים לנגנים פורמט אחד.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Batch Subtitle Converter'
  },
  'ro': {
    title: 'Conversia în lot a subtitrărilor | AI-SRTSub',
    desc: 'Aruncați zeci sau sute de fișiere SRT/VTT, convertiți-le într-un format și descărcați un ZIP. Renumerotare și marcaje normalizate; fișierele ilizibile sunt marcate.',
    kw: 'conversie subtitrări în lot,srt în vtt în masă,convertor lot subtitrări,batch convert subtitles',
    intro: 'Trageți sute de fișiere de subtitrări, convertiți-le pe toate și luați un singur ZIP. Totul în browser.',
    feat: 'SRT↔VTT în masă; numerotarea se reordonează, marcajele de timp se normalizează pentru formatul țintă. Fișierele ilizibile sunt marcate și rămân afară din ZIP. Numele originale rămân cu extensie nouă; coliziunile primesc un sufix.',
    who: 'Editori și subtitratori care convertesc foldere întregi de seriale și administratori care dau playelor un singur format.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'Batch Subtitle Converter'
  },
};

/* v0.9.316：第十六个页面 —— 歌词打轴 /lrc.html 的 SEO 表。与既有十二张表同规格。 */
const SEO_LRC = {
  'zh-CN': {
    title: '歌词打轴器：听歌逐句点时间，导出 LRC/SRT - 在线免费 | 随心字幕 AI',
    desc: '免费在线歌词打轴：放入音乐、贴入歌词，边听边逐句点时间轴，实时预览 LRC 效果，导出 LRC 或 SRT。支持导入已有 LRC 微调，快捷键打轴，全程在浏览器里完成，文件不上传。',
    kw: '歌词打轴,LRC制作,歌词同步,lrc editor online,打轴工具,lrc生成,歌词时间轴,make lrc online',
    intro: '放入音乐、贴入歌词，边听边逐句点时间轴，导出标准 LRC 或 SRT。全程在浏览器里完成，文件不上传。',
    feat: '支持 MP3、M4A、FLAC、WAV、OGG 等常见音频；歌词一行一句贴进来即可，已有的 LRC 文件也能导入微调。空格键播放暂停、回车键打当前句、Z 键撤销，双手不离键盘。',
    who: '给自制视频配歌、给播放器做歌词字幕、翻唱爱好者对时间轴的音乐人。',
    siteName: '随心字幕 AI', jsonldName: '随心字幕 AI', jsonldAlt: 'LRC Lyric Timing Editor'
  },
  'zh-TW': {
    title: '歌詞打軸器：聽歌逐句點時間，匯出 LRC/SRT - 線上免費 | 隨心字幕 AI',
    desc: '免費線上歌詞打軸：放入音樂、貼入歌詞，邊聽邊逐句點時間軸，即時預覽 LRC 效果，匯出 LRC 或 SRT。支援匯入已有 LRC 微調，快捷鍵打軸，全程在瀏覽器裡完成，檔案不上傳。',
    kw: '歌詞打軸,LRC製作,歌詞同步,lrc editor online,打軸工具,lrc生成,歌詞時間軸,make lrc online',
    intro: '放入音樂、貼入歌詞，邊聽邊逐句點時間軸，匯出標準 LRC 或 SRT。全程在瀏覽器裡完成，檔案不上傳。',
    feat: '支援 MP3、M4A、FLAC、WAV、OGG 等常見音訊；歌詞一行一句貼進來即可，已有的 LRC 檔案也能匯入微調。空格鍵播放暫停、Enter 鍵打當前句、Z 鍵復原，雙手不離鍵盤。',
    who: '給自製影片配歌、給播放器做歌詞字幕、翻唱愛好者對時間軸的音樂人。',
    siteName: '隨心字幕 AI', jsonldName: '隨心字幕 AI', jsonldAlt: 'LRC Lyric Timing Editor'
  },
  'en': {
    title: 'LRC Lyric Editor - Tap Timing While Listening | AI-SRTSub',
    desc: "Load a song, paste the lyrics, and tap each line's time while listening; export LRC or SRT. Import existing LRC to fine-tune. Keyboard-driven, fully in-browser.",
    kw: 'lrc editor online,make lrc,lyric timing,lrc maker,create lrc,lyrics synchronizer,lrc to srt',
    intro: 'Load music, paste lyrics, tap the timing line by line as you listen, and export LRC or SRT. Nothing uploads.',
    feat: 'Works with MP3, M4A, FLAC, WAV and OGG. One line per row; existing LRC files can be imported and adjusted. Space plays/pauses, Enter stamps the current line, Z undoes — hands stay on the keyboard.',
    who: 'Musicians syncing covers, creators adding songs to videos, and anyone building lyric subtitles for a player.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'LRC Lyric Timing Editor'
  },
  'ja': {
    title: '歌詞タイマー - LRC メーカー | AI-SRTSub',
    desc: '音楽を入れて歌詞を貼り、聴きながら各行にタイミングを打ち、LRC または SRT で書き出せます。既存 LRC の取り込み微調整も可能。キーボード操作中心です。',
    kw: '歌詞 タイマー,lrc メーカー,lrc 作成,歌詞 シンクロ,lrc editor',
    intro: '音楽と歌詞を用意して聴きながら一行ずつタイミングを打ち、LRC / SRT を書き出します。すべてブラウザ内で処理されます。',
    feat: 'MP3・M4A・FLAC・WAV・OGG に対応。歌詞は 1 行 1 文で貼るだけ。既存 LRC の取り込みと微調整もできます。スペースで再生/一時停止、Enter で現在行に打刻、Z で取り消し。',
    who: 'カバー曲のシンクロをする音楽家、動画に曲を付けるクリエイター、プレイヤー用の歌詞字幕を作る人。',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'LRC Lyric Timing Editor'
  },
  'es': {
    title: 'Editor LRC - marca letras al escuchar | AI-SRTSub',
    desc: 'Carga la canción, pega la letra y marca cada línea mientras escuchas; exporta LRC o SRT. Importa un LRC existente para afinarlo. Manejado por teclado.',
    kw: 'editor lrc online,crear lrc,sincronizar letras,letras con tiempo,lrc maker',
    intro: 'Carga música, pega la letra, marca el tiempo línea a línea mientras escuchas y exporta LRC o SRT. Nada se sube.',
    feat: 'Funciona con MP3, M4A, FLAC, WAV y OGG. Una línea por fila; los LRC existentes se pueden importar y ajustar. Espacio reproduce/pausa, Enter marca la línea actual, Z deshace.',
    who: 'Músicos que sincronizan versiones, creadores que añaden canciones a vídeos y quien hace subtítulos de letras para un reproductor.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'LRC Lyric Timing Editor'
  },
  'pt': {
    title: 'Editor LRC - marque a letra ouvindo | AI-SRTSub',
    desc: 'Carregue a música, cole a letra e marque cada linha enquanto ouve; exporte LRC ou SRT. Importe um LRC existente para ajustar. Controlado pelo teclado.',
    kw: 'editor lrc online,criar lrc,sincronizar letras,letra com tempo,lrc maker',
    intro: 'Carregue música, cole a letra, marque o tempo linha a linha ouvindo e exporte LRC ou SRT. Nada é enviado.',
    feat: 'Funciona com MP3, M4A, FLAC, WAV e OGG. Uma linha por linha da letra; LRCs existentes podem ser importados e ajustados. Espaço toca/pausa, Enter marca a linha atual, Z desfaz.',
    who: 'Músicos sincronizando covers, criadores adicionando músicas a vídeos e quem faz legendas de letras para um player.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'LRC Lyric Timing Editor'
  },
  'ko': {
    title: 'LRC 가사 타이머 | AI-SRTSub',
    desc: '음악을 넣고 가사를 붙여 넣은 뒤, 듣면서 각 줄의 시간을 찍어 LRC 또는 SRT로 내보냅니다. 기존 LRC를 가져와 다듬을 수도 있습니다. 키보드 중심 조작입니다.',
    kw: 'lrc 편집기,lrc 만들기,가사 싱크,가사 타이밍,lrc 메이커',
    intro: '음악과 가사를 준비하고 듣으며 한 줄씩 시간을 찍어 LRC / SRT로 내보냅니다. 모두 브라우저에서 처리됩니다.',
    feat: 'MP3, M4A, FLAC, WAV, OGG 지원. 가사는 한 줄에 한 문장씩 붙여넣으면 됩니다. 기존 LRC 가져와 미세 조정 가능. 스페이스 재생/일시정지, Enter 현재 줄 찍기, Z 되돌리기.',
    who: '커버 곡을 싱크하는 뮤지션, 영상에 곡을 넣는 크리에이터, 플레이어용 가사 자막을 만드는 사람.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'LRC Lyric Timing Editor'
  },
  'de': {
    title: 'LRC-Editor - Lyrics beim Hören timen | AI-SRTSub',
    desc: 'Song laden, Lyrics einfügen und jede Zeile beim Hören timen; als LRC oder SRT exportieren. Vorhandene LRC-Dateien importieren und feinjustieren. Tastaturgesteuert.',
    kw: 'lrc editor online,lrc erstellen,lyrics synchronisieren,lrc maker,text timing',
    intro: 'Musik laden, Lyrics einfügen, Zeile für Zeile beim Hören timen und als LRC oder SRT exportieren. Nichts wird hochgeladen.',
    feat: 'Läuft mit MP3, M4A, FLAC, WAV und OGG. Eine Zeile pro Reihe; bestehende LRC-Dateien lassen sich importieren und anpassen. Leertaste spielt/pausiert, Enter setzt die aktuelle Zeile, Z macht rückgängig.',
    who: 'Musiker, die Covers synchronisieren, Creator, die Songs ins Video bringen, und alle, die Lyrics-Untertitel für einen Player bauen.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'LRC Lyric Timing Editor'
  },
  'fr': {
    title: 'Éditeur LRC - chronométrez en écoutant | AI-SRTSub',
    desc: "Chargez la chanson, collez les paroles et chronométrez chaque ligne en écoutant ; exportez en LRC ou SRT. Importez un LRC existant pour l'affiner. Au clavier.",
    kw: 'éditeur lrc en ligne,créer lrc,synchroniser paroles,minuterie paroles,lrc maker',
    intro: 'Chargez la musique, collez les paroles, tapez le minutage ligne par ligne en écoutant et exportez en LRC ou SRT. Aucun envoi.',
    feat: "Compatible MP3, M4A, FLAC, WAV et OGG. Une ligne par ligne de paroles ; les LRC existants s'importent et se règlent finement. Espace lecture/pause, Entrée horodate la ligne courante, Z annule.",
    who: 'Musiciens qui synchronisent des reprises, créateurs qui ajoutent des chansons à des vidéos et quiconque fait des sous-titres de paroles pour un lecteur.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'LRC Lyric Timing Editor'
  },
  'id': {
    title: 'Editor LRC - tandai lirik sambil dengar | AI-SRTSub',
    desc: 'Muat lagunya, tempel liriknya, dan tandai waktu tiap baris sambil mendengarkan; ekspor LRC atau SRT standar. Impor LRC lama untuk disetel halus. Berbasis keyboard.',
    kw: 'editor lrc online,buat lrc,sinkron lirik,timing lirik,lrc maker',
    intro: 'Muat musik, tempel lirik, tandai waktunya baris demi baris sambil mendengar, lalu ekspor LRC atau SRT. Tak ada unggahan.',
    feat: 'Mendukung MP3, M4A, FLAC, WAV, dan OGG. Satu baris per baris; LRC yang sudah ada bisa diimpor dan disetel. Spasi putar/jeda, Enter menandai baris aktif, Z membatalkan.',
    who: 'Musisi yang menyinkronkan cover, kreator yang menambahkan lagu ke video, dan siapa pun yang membuat subtitel lirik untuk pemutar.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'LRC Lyric Timing Editor'
  },
  'hi': {
    title: 'LRC लिरिक्स टाइमर | AI-SRTSub',
    desc: 'गाना लोड करें, बोल पेस्ट करें, सुनते हुए हर पंक्ति का समय टैप करें; LRC या SRT में निर्यात करें। पुराना LRC इम्पोर्ट कर बारीकी लें।',
    kw: 'lrc एडिटर ऑनलाइन,lrc बनाएं,लिरिक्स सिंक,लिरिक्स टाइमिंग,lrc मेकर',
    intro: 'संगीत लोड करें, बोल चिपकाएँ, सुनते हुए पंक्ति-दर-पंक्ति समय टैप करें और LRC या SRT निर्यात करें। कुछ अपलोड नहीं होता।',
    feat: 'MP3, M4A, FLAC, WAV, OGG समर्थित। बोल एक पंक्ति में एक पंक्ति चिपकाएँ; पुरानी LRC फ़ाइलें इम्पोर्ट कर सुधारी जा सकती हैं। स्पेस चलाएँ/रोकें, Enter वर्तमान पंक्ति दर्ज करे, Z पूर्ववत करे।',
    who: 'कवर सिंक करने वाले संगीतकार, वीडियो में गाने जोड़ने वाले क्रिएटर और प्लेयर के लिए लिरिक्स सबटाइटल बनाने वाले।',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'LRC Lyric Timing Editor'
  },
  'th': {
    title: 'เครื่องมือทำ LRC - จับเวลาเนื้อร้อง | AI-SRTSub',
    desc: 'ใส่เพลง วางเนื้อร้อง แล้วจับเวลาทีละบรรทัดไปพร้อมกับที่ฟัง ส่งออกเป็น LRC หรือ SRT มาตรฐาน นำเข้าไฟล์ LRC เดิมมาปรับจูนได้',
    kw: 'ทำ lrc,lrc editor,จับเวลาเนื้อร้อง,ซิงค์เนื้อร้อง,สร้าง lrc',
    intro: 'ใส่เพลงและเนื้อร้อง จับเวลาทีละบรรทัดไปพร้อมที่ฟัง แล้วส่งออก LRC หรือ SRT ไม่มีการอัปโหลด',
    feat: 'รองรับ MP3, M4A, FLAC, WAV, OGG วางเนื้อร้องบรรทัดละหนึ่งประโยค นำเข้า LRC เดิมมาปรับได้ spacebar เล่น/หยุด Enter ปักเวลาบรรทัดปัจจุบัน Z ย้อน',
    who: 'นักดนตรีที่ซิงค์เพลง cover ครีเอเตอร์ที่ใส่เพลงในวิดีโอ และคนทำซับเนื้อร้องให้เครื่องเล่น',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'LRC Lyric Timing Editor'
  },
  'vi': {
    title: 'Trục thời gian lời bài hát LRC | AI-SRTSub',
    desc: 'Nạp bài hát, dán lời và bấm mốc thời gian từng dòng khi nghe; xuất LRC hoặc SRT chuẩn. Nhập file LRC sẵn có để tinh chỉnh. Vận hành bằng bàn phím.',
    kw: 'trình chỉnh lrc online,tạo lrc,canh lời bài hát,gõ thời gian lời,lrc maker',
    intro: 'Nạp nhạc, dán lời, bấm mốc từng dòng khi nghe và xuất LRC hoặc SRT. Không tải gì lên.',
    feat: 'Chạy với MP3, M4A, FLAC, WAV và OGG. Mỗi dòng một hàng; LRC sẵn có có thể nhập vào và chỉnh. Space phát/tạm dừng, Enter đóng dấu dòng hiện tại, Z hoàn tác.',
    who: 'Nhạc sĩ căn lời bản cover, creator thêm bài hát vào video và người làm phụ đề lời cho trình phát.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'LRC Lyric Timing Editor'
  },
  'ru': {
    title: 'Редактор LRC — тайминг по слуху | AI-SRTSub',
    desc: 'Загрузите песню, вставьте текст и отмечайте время каждой строки на слух; экспорт в LRC или SRT. Готовый LRC можно импортировать и подправить. Всё с клавиатуры.',
    kw: 'редактор lrc онлайн,создать lrc,синхронизация текста песни,тайминг текста,lrc maker',
    intro: 'Загрузите музыку, вставьте текст, отбивайте тайминг построчно на слух и экспортируйте в LRC или SRT. Ничего не загружается.',
    feat: 'Работает с MP3, M4A, FLAC, WAV и OGG. Одна строка на строку текста; готовые LRC импортируются и корректируются. Пробел — воспроизведение/пауза, Enter — метка текущей строки, Z — отмена.',
    who: 'Музыканты, синхронизирующие каверы, авторы, добавляющие песни в видео, и все, кто делает текстовые субтитры для плеера.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'LRC Lyric Timing Editor'
  },
  'it': {
    title: 'Editor LRC - timing delle parole | AI-SRTSub',
    desc: 'Carica il brano, incolla il testo e segna il tempo di ogni riga mentre ascolti; esporta in LRC o SRT standard. Importa un LRC esistente per rifinirlo. Da tastiera.',
    kw: 'editor lrc online,creare lrc,sincronizzare testo canzone,timing testo,lrc maker',
    intro: 'Carica la musica, incolla il testo, batti il tempo riga per riga mentre ascolti ed esporta in LRC o SRT. Nessun caricamento.',
    feat: 'Funziona con MP3, M4A, FLAC, WAV e OGG. Una riga per verso; i file LRC esistenti si importano e si regolano. Spazio riproduce/pausa, Invio timbra la riga corrente, Z annulla.',
    who: 'Musicisti che sincronizzano cover, creator che aggiungono canzoni ai video e chi fa sottotitoli di testo per un lettore.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'LRC Lyric Timing Editor'
  },
  'ar': {
    title: 'محرر LRC - توقيت الكلمات بالاستماع | AI-SRTSub',
    desc: 'حمّل الأغنية وألصق الكلمات وسجّل توقيت كل سطر أثناء الاستماع؛ صدّر بصيغة LRC أو SRT القياسية. استورد ملف LRC جاهزًا لضبطه. تحكم بلوحة المفاتيح.',
    kw: 'محرر lrc اونلاين,انشاء lrc,مزامنة كلمات الاغاني,توقيت الكلمات,lrc maker',
    intro: 'حمّل الموسيقى، ألصق الكلمات، سجّل التوقيت سطرًا سطرًا أثناء الاستماع وصدّر بصيغة LRC أو SRT. لا يُرفع شيء.',
    feat: 'يدعم MP3 و M4A و FLAC و WAV و OGG. سطر واحد لكل صف؛ ملفات LRC الجاهزة تُستورد وتُضبط. المسافة تشغيل/إيقاف، Enter يسجّل السطر الحالي، Z يتراجع.',
    who: 'الموسيقيون الذين يزامنون أغاني الغلاف، وصنّاع المحتوى الذين يضيفون الأغاني إلى الفيديو، ومن يصنع ترجمات كلمات لمشغّل.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'LRC Lyric Timing Editor'
  },
  'tr': {
    title: 'LRC editörü - dinleyerek zamanlama | AI-SRTSub',
    desc: "Şarkıyı yükleyin, sözleri yapıştırın ve dinlerken her satırın zamanını vurun; standart LRC veya SRT olarak dışa aktarın. Mevcut bir LRC'yi içe alıp ince ayar yapın.",
    kw: 'lrc editör online,lrc oluşturma,şarkı sözü senkron,söz zamanlaması,lrc maker',
    intro: 'Müziği yükleyin, sözleri yapıştırın, dinlerken satır satır zaman vurun ve LRC veya SRT dışa aktarın. Hiçbir şey yüklenmez.',
    feat: 'MP3, M4A, FLAC, WAV ve OGG ile çalışır. Satır başına bir dize; mevcut LRC dosyaları içe alınıp ayarlanabilir. Boşluk oynat/duraklat, Enter geçerli satırı damgalar, Z geri alır.',
    who: 'Cover senkronlayan müzisyenler, videolara şarkı ekleyen içerik üreticileri ve oynatıcı için şarkı sözü altyazısı yapan herkes.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'LRC Lyric Timing Editor'
  },
  'nl': {
    title: 'LRC-editor - lyrics timen tijdens luisteren | AI-SRTSub',
    desc: "Laad het nummer, plak de lyrics en tim elke regel terwijl je luistert; exporteer als standaard LRC of SRT. Bestaande LRC's importeer je voor fijnafstelling.",
    kw: 'lrc editor online,lrc maken,lyrics synchroniseren,tekst timing,lrc maker',
    intro: 'Laad muziek, plak de lyrics, tim regel voor regel mee met het luisteren en exporteer LRC of SRT. Niets wordt geüpload.',
    feat: "Werkt met MP3, M4A, FLAC, WAV en OGG. Eén regel per rij; bestaande LRC's importeren en bijstellen kan. Spatie speelt/pauzeert, Enter zet de huidige regel, Z maakt ongedaan.",
    who: "Muzikanten die covers syncen, creators die nummers aan video's toevoegen en iedereen die lyric-ondertitels voor een speler maakt.",
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'LRC Lyric Timing Editor'
  },
  'pl': {
    title: 'Edytor LRC - timing tekstu na słuch | AI-SRTSub',
    desc: 'Wczytaj piosenkę, wklej tekst i zaznaczaj czas linijek podczas słuchania; eksportuj do LRC lub SRT. Zaimportuj istniejący LRC i doszlifuj. Z klawiatury.',
    kw: 'edytor lrc online,stwórz lrc,synchronizacja tekstu,timing tekstu piosenki,lrc maker',
    intro: 'Wczytaj muzykę, wklej tekst, odmierzaj czas linijka po linijce na słuch i eksportuj do LRC lub SRT. Nic nie jest wysyłane.',
    feat: 'Działa z MP3, M4A, FLAC, WAV i OGG. Jedna linijka na wiersz; istniejące pliki LRC można importować i stroić. Spacja odtwarza/pauzuje, Enter znaczy bieżącą linijkę, Z cofa.',
    who: 'Muzycy synchronizujący covery, twórcy dodający piosenki do filmów i wszyscy, którzy robią napisy z tekstem dla odtwarzacza.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'LRC Lyric Timing Editor'
  },
  'sv': {
    title: 'LRC-redigerare - tida texten vid lyssning | AI-SRTSub',
    desc: 'Ladda låten, klistra in texten och markera varje rads tid medan du lyssnar; exportera som LRC eller SRT. Befintliga LRC kan importeras och finjusteras.',
    kw: 'lrc redigerare online,skapa lrc,synka text,timing låttext,lrc maker',
    intro: 'Ladda musik, klistra in texten, tida rad för rad medan du lyssnar och exportera LRC eller SRT. Inget laddas upp.',
    feat: 'Fungerar med MP3, M4A, FLAC, WAV och OGG. En rad per rad; befintliga LRC-filer kan importeras och justeras. Mellanslag spelar/pausar, Enter stämplar aktuell rad, Z ångrar.',
    who: 'Musiker som synkar covers, skapare som lägger låtar på video och alla som gör textundertexter till en spelare.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'LRC Lyric Timing Editor'
  },
  'cs': {
    title: 'LRC editor - časuj text poslechem | AI-SRTSub',
    desc: 'Nahrajte píseň, vložte text a při poslechu označujte čas řádků; exportujte do LRC nebo SRT. Existující LRC naimportujete a doladíte. Ovládání klávesnicí.',
    kw: 'lrc editor online,vytvořit lrc,synchronizace textu,časování textu,lrc maker',
    intro: 'Nahrajte hudbu, vložte text, časujte řádek po řádku při poslechu a exportujte LRC nebo SRT. Nic se nenahrává.',
    feat: 'Funguje s MP3, M4A, FLAC, WAV a OGG. Jeden řádek na řádek textu; hotová LRC lze importovat a upravit. Mezerník přehraje/pozastaví, Enter označí aktuální řádek, Z vrátí zpět.',
    who: 'Hudebníci synchronizující covery, tvůrci přidávající písně do videí a všichni, kdo dělají textové titulky pro přehrávač.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'LRC Lyric Timing Editor'
  },
  'uk': {
    title: 'LRC-редактор — таймінг на слух | AI-SRTSub',
    desc: 'Завантажте пісню, вставте текст і позначайте час рядків на слух; експорт у LRC або SRT. Наявний LRC можна імпортувати та підправити. Керування з клавіатури.',
    kw: 'lrc редактор онлайн,створити lrc,синхронізація тексту пісні,таймінг тексту,lrc maker',
    intro: 'Завантажте музику, вставте текст, відбивайте таймінг рядок за рядком на слух і експортуйте у LRC або SRT. Нічого не завантажується.',
    feat: 'Працює з MP3, M4A, FLAC, WAV і OGG. Один рядок на рядок тексту; готові LRC імпортуються й коригуються. Пробіл — відтворення/пауза, Enter — позначка поточного рядка, Z — скасування.',
    who: 'Музиканти, що синхронізують кавери, автори, що додають пісні у відео, і всі, хто робить текстові субтитри для плеєра.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'LRC Lyric Timing Editor'
  },
  'da': {
    title: 'LRC-editor - timing teksten mens du hører | AI-SRTSub',
    desc: 'Indlæs sangen, indsæt teksten og markér hver linje, mens du hører; eksportér som LRC eller SRT. Importér en eksisterende LRC og finjustér. Tastaturstyret.',
    kw: 'lrc editor online,lav lrc,synkroniser tekst,timing sangtekst,lrc maker',
    intro: 'Indlæs musik, indsæt teksten, markér tiden linje for linje, mens du hører, og eksportér LRC eller SRT. Intet uploades.',
    feat: 'Virker med MP3, M4A, FLAC, WAV og OGG. Én linje pr. række; eksisterende LRC-filer kan importeres og justeres. Mellemrum afspiller/pauser, Enter stempler den aktuelle linje, Z fortryder.',
    who: 'Musikere, der synkroniserer covers, skabere, der tilføjer sange til video, og alle, der laver tekstundertekster til en afspiller.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'LRC Lyric Timing Editor'
  },
  'fi': {
    title: 'LRC-editori - aikana sanoitukset kuunnellen | AI-SRTSub',
    desc: 'Lataa kappale, liitä sanoitus ja merkitse rivien ajat kuunnellessasi; vie LRC:nä tai SRT:nä. Tuo olemassa oleva LRC ja hienosäädä. Näppäimistöohjattu.',
    kw: 'lrc editor verkossa,tee lrc,sanoitusten synkronointi,sanoitusten ajoitus,lrc maker',
    intro: 'Lataa musiikki, liitä sanoitus, merkitse rivien ajat kuunnellessa ja vie LRC tai SRT. Mitään ei lähetetä.',
    feat: 'Toimii MP3-, M4A-, FLAC-, WAV- ja OGG-tiedostojen kanssa. Yksi rivi per rivi; olemassa olevia LRC-tiedostoja voi tuoda ja säätää. Välilyönti toistaa/keskeyttää, Enter leimaa nykyisen rivin, Z kumoa.',
    who: 'Covereita synkronoivat muusikot, videoihin kappaleita lisäävät tekijät ja kaikki, jotka tekevät sanoitustekstityksiä soittimelle.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'LRC Lyric Timing Editor'
  },
  'el': {
    title: 'Επεξεργαστής LRC - χρονισμός στίχων | AI-SRTSub',
    desc: 'Φορτώστε το τραγούδι, επικολλήστε τους στίχους και σημειώστε τον χρόνο του καθενός καθώς ακούτε· εξαγωγή σε LRC ή SRT. Ένα υπάρχον LRC εισάγεται για ρύθμιση.',
    kw: 'lrc editor online,δημιουργία lrc,συγχρονισμός στίχων,χρονισμός στίχων,lrc maker',
    intro: 'Φορτώστε μουσική, επικολλήστε τους στίχους, σημειώστε τον χρόνο στίχο-στίχο καθώς ακούτε και εξαγάγετε LRC ή SRT. Τίποτα δεν ανεβαίνει.',
    feat: 'Λειτουργεί με MP3, M4A, FLAC, WAV και OGG. Μία γραμμή ανά σειρά· υπάρχοντα LRC εισάγονται και ρυθμίζονται. Το κενό παίζει/παύει, το Enter σφραγίζει την τρέχουσα γραμμή, το Z αναιρεί.',
    who: 'Μουσικοί που συγχρονίζουν διασκευές, δημιουργοί που προσθέτουν τραγούδια σε βίντεο και όσοι φτιάχνουν υπότιτλους στίχων για player.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'LRC Lyric Timing Editor'
  },
  'he': {
    title: 'עורך LRC - תזמון מילים בהאזנה | AI-SRTSub',
    desc: 'טענו את השיר, הדביקו את המילים וסמנו את זמן כל שורה תוך כדי האזנה; ייצאו כ-LRC או SRT תקני. ייבאו קובץ LRC קיים לכיול עדין. בניהול מקלדת.',
    kw: 'עורך lrc אונליין,יצירת lrc,סנכרון מילים,תזמון מילים,lrc maker',
    intro: 'טענו מוזיקה, הדביקו מילים, סמנו זמנים שורה-שורה בהאזנה וייצאו LRC או SRT. שום דבר לא מועלה.',
    feat: 'תומך ב-MP3, M4A, FLAC, WAV ו-OGG. שורה אחת לכל שורת טקסט; קובצי LRC קיימים ניתנים לייבוא וכיול. רווח מנגן/עוצר, Enter מתעד את השורה הנוכחית, Z מבטל.',
    who: 'מוזיקאים שמסנכרנים גרסאות כיסוי, יוצרים שמוסיפים שירים לסרטונים וכל מי שמכין כתוביות מילים לנגן.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'LRC Lyric Timing Editor'
  },
  'ro': {
    title: 'Editor LRC - sincronizezi ascultând | AI-SRTSub',
    desc: 'Încarcă piesa, lipește versurile și marchează timpul liniilor în timp ce asculți; exportă în LRC sau SRT. Importă un LRC existent pentru ajustări. Din tastatură.',
    kw: 'editor lrc online,creare lrc,sincronizare versuri,timing versuri,lrc maker',
    intro: 'Încarcă muzica, lipește versurile, marchează timpul linie cu linie în timp ce asculți și exportă LRC sau SRT. Nimic nu se încarcă.',
    feat: 'Merge cu MP3, M4A, FLAC, WAV și OGG. Un rând pe linie; fișierele LRC existente se importă și se ajustează. Spațiu play/pauză, Enter marchează linia curentă, Z anulează.',
    who: 'Muzicieni care sincronizează cover-uri, creatori care adaugă melodii în videoclipuri și oricine face subtitrări de versuri pentru un player.',
    siteName: 'AI-SRTSub', jsonldName: 'AI-SRTSub', jsonldAlt: 'LRC Lyric Timing Editor'
  },
};

const SEO_PAGES = {
  index: { file: 'index.html', table: SEO, path: SEO_PATH, jsonldType: 'WebApplication' },
  merge: { file: 'merge.html', table: SEO_MERGE, path: MERGE_PATH, jsonldType: 'WebApplication' },
  clean: { file: 'clean.html', table: SEO_CLEAN, path: CLEAN_PATH, jsonldType: 'WebApplication' },
  translate: { file: 'translate.html', table: SEO_TRANSLATE, path: TRANSLATE_PATH, jsonldType: 'WebApplication' },
  /* v0.9.288：第五个页面 —— 字幕格式转换 */
  convert: { file: 'convert.html', table: SEO_CONVERT, path: CONVERT_PATH, jsonldType: 'WebApplication' },
  /* v0.9.289：第六个页面 —— 双语字幕剥离 */
  bilingual: { file: 'bilingual.html', table: SEO_BILINGUAL, path: BILINGUAL_PATH, jsonldType: 'WebApplication' },
  /* v0.9.291：第七个页面 —— 字幕时间轴调整 */
  shift: { file: 'shift.html', table: SEO_SHIFT, path: SHIFT_PATH, jsonldType: 'WebApplication' },
  /* v0.9.296：第八个页面 */
  repair: { file: 'repair.html', table: SEO_REPAIR, path: REPAIR_PATH, jsonldType: 'WebApplication' },
  /* v0.9.299：第九个页面 —— 字幕提取纯文本 */
  extract: { file: 'extract.html', table: SEO_EXTRACT, path: EXTRACT_PATH, jsonldType: 'WebApplication' },
  /* v0.9.302：第十个页面 —— 字幕术语批量替换 */
  glossary: { file: 'glossary.html', table: SEO_GLOSSARY, path: GLOSSARY_PATH, jsonldType: 'WebApplication' },
  /* v0.9.313：第十一个页面 —— 视频内封字幕提取 */
  videosub: { file: 'videosub.html', table: SEO_VIDEOSUB, path: VIDEOSUB_PATH, jsonldType: 'WebApplication' },
  /* v0.9.313：第十二个页面 —— 中文字幕繁简转换 */
  hanconv: { file: 'hanconv.html', table: SEO_HANCONV, path: HANCONV_PATH, jsonldType: 'WebApplication' },
  /* v0.9.316：第十三个页面 —— 字幕拆分与拼接 */
  split: { file: 'split.html', table: SEO_SPLIT, path: SPLIT_PATH, jsonldType: 'WebApplication' },
  /* v0.9.316：第十四个页面 —— 字幕 Excel/CSV 互转 */
  table: { file: 'table.html', table: SEO_TABLE, path: TABLE_PATH, jsonldType: 'WebApplication' },
  /* v0.9.316：第十五个页面 —— 批量字幕转换打包 */
  batch: { file: 'batch.html', table: SEO_BATCH, path: BATCH_PATH, jsonldType: 'WebApplication' },
  /* v0.9.316：第十六个页面 —— 歌词打轴 */
  lrc: { file: 'lrc.html', table: SEO_LRC, path: LRC_PATH, jsonldType: 'WebApplication' },
  /* v0.9.321：第十七个页面 —— 字幕质检 */
  qc: { file: 'qc.html', table: SEO_QC, path: QC_PATH, jsonldType: 'WebApplication' },
  /* v0.9.352：第十八个页面 —— YouTube 字幕优化 */
  ytfix: { file: 'ytfix.html', table: SEO_YTFIX, path: YTFIX_PATH, jsonldType: 'WebApplication' },
  /* v0.9.356：第十九、二十个页面 —— 自动生成字幕 / 画面硬字幕提取 */
  autosub: { file: 'autosub.html', table: SEO_AUTOSUB, path: AUTOSUB_PATH, jsonldType: 'WebApplication' },
  ocrsub: { file: 'ocrsub.html', table: SEO_OCRSUB, path: OCRSUB_PATH, jsonldType: 'WebApplication' },
  /* v0.9.373：第二十一个页面 —— 一次出多语 / 多集批量 */
  multilang: { file: 'multilang.html', table: SEO_MULTILANG, path: MULTILANG_PATH, jsonldType: 'WebApplication' }
};

/* __SEO_SHARDS__ */
/* v0.9.339：新增 73 种语言的 SEO 元数据走分片（i18n/seo-<lang>.json），启动时并入上面 17 张表。
   ❗四件事必须一起做，漏一件就会「页面能开但 SEO 半残」：
     ① SEO_LANGS.push  —— sitemap 与 hreflang 全从它派生
     ② SEO_PATH        —— 语言首页路径
     ③ SEO_ROUTE       —— /<lang>/ 与 /<lang>/xxx.html 路由，缺了就 404
     ④ SEO_PAGES[].path —— 16 个工具页路径；那 16 个 *_PATH 映射早在 2203 行就
        SEO_LANGS.forEach 跑完了，新语言是之后才 push 的，只能在这里补。 */
/* 新增 73 语的 og:locale。内置 27 语走上面那张 OG_LOCALE —— 它只覆盖 27 语，
   所以 og:locale:alternate 必须两个都查，否则新语言会输出空 content。 */
const SEO_OG_LOCALE = {
  ms: 'ms_MY', fil: 'fil_PH', fa: 'fa_IR', nb: 'nb_NO', sk: 'sk_SK', hu: 'hu_HU', ca: 'ca_AD',
  hr: 'hr_HR', sr: 'sr_RS', bg: 'bg_BG', ur: 'ur_PK', bn: 'bn_BD', ta: 'ta_IN', te: 'te_IN',
  mr: 'mr_IN', ne: 'ne_NP', si: 'si_LK', my: 'my_MM', km: 'km_KH', lo: 'lo_LA', sw: 'sw_KE',
  gu: 'gu_IN', kn: 'kn_IN', ml: 'ml_IN', pa: 'pa_IN', or: 'or_IN', as: 'as_IN', kk: 'kk_KZ',
  uz: 'uz_UZ', mn: 'mn_MN', az: 'az_AZ', is: 'is_IS', et: 'et_EE', lv: 'lv_LV', lt: 'lt_LT',
  sl: 'sl_SI', sq: 'sq_AL', mk: 'mk_MK', eu: 'eu_ES', gl: 'gl_ES', am: 'am_ET', ha: 'ha_NG',
  yo: 'yo_NG', zu: 'zu_ZA', so: 'so_SO', ps: 'ps_AF', ku: 'ku_IQ', af: 'af_ZA',
  yue: 'yue_HK', be: 'be_BY', tg: 'tg_TJ', ky: 'ky_KG', tk: 'tk_TM', bs: 'bs_BA',
  mt: 'mt_MT', cy: 'cy_GB', ga: 'ga_IE', hy: 'hy_AM', ka: 'ka_GE', ti: 'ti_ET', bo: 'bo_CN',
  ug: 'ug_CN', sd: 'sd_PK', yi: 'yi_US', jv: 'jv_ID', su: 'su_ID', ceb: 'ceb_PH', mg: 'mg_MG',
  ig: 'ig_NG', xh: 'xh_ZA', sn: 'sn_ZW', ny: 'ny_MW', mi: 'mi_NZ'
};
(function loadSeoShards() {
  var d = path.join(__dirname, 'i18n');
  var files;
  try { files = fs.readdirSync(d); } catch (e) { return; }
  for (var i = 0; i < files.length; i++) {
    var m = /^seo-(.+)\.json$/.exec(files[i]);
    if (!m) continue;
    var lang = m[1], data;
    try { data = JSON.parse(fs.readFileSync(path.join(d, files[i]), 'utf8')); } catch (e) { continue; }
    if (SEO_LANGS.indexOf(lang) < 0) SEO_LANGS.push(lang);
    SEO_PATH[lang] = (lang === 'zh-CN') ? '/' : '/' + lang + '/';
    SEO_ROUTE['/' + lang] = lang;
    SEO_ROUTE['/' + lang + '/'] = lang;
    for (var pg in SEO_PAGES) {
      if (data[pg]) SEO_PAGES[pg].table[lang] = data[pg];
      /* ④ 工具页路径。16 个 *_PATH 早在 2203 行就 SEO_LANGS.forEach 跑完了，
         73 种新语言是之后才 push 进 SEO_LANGS 的 —— 那 16 张表从此没有它们的条目。
         后果：seoHead() 里 base + P.path[lang] 拼成 "https://ai-srtsub.comundefined"，
         每个工具页的 canonical + 73 条 hreflang 全指向无效 URL，sitemap.xml 同样被污染
         （语言首页没事，因为 SEO_PATH 在上面单独补过）。
         ⚠️ 路径跟该页有没有 seo 数据无关（路由本身是确定的），所以放在 if 外边。
         ⚠️ index 的 path 就是 SEO_PATH，上面刚赋过值；if 保护避免被覆盖成 /xx/index.html。 */
      if (!SEO_PAGES[pg].path[lang]) {
        SEO_PAGES[pg].path[lang] = (lang === 'zh-CN')
          ? '/' + SEO_PAGES[pg].file
          : '/' + lang + '/' + SEO_PAGES[pg].file;
      }
    }
  }
})();
/* 静态文案块：爬虫不执行 JS，这一段是它唯一能读到的正文 */
function seoCopy(page, lang){
  const s = SEO_PAGES[page].table[lang];
  if (!s || !s.intro) return '';
  return '<section class="seo" style="max-width:1080px;margin:28px auto 0;padding:18px 24px 0;' +
    'border-top:1px solid var(--line,#E9E9EF);color:var(--sub,#767680);font-size:13px;line-height:1.8;">\n' +
    '    <h2 style="font-size:15px;color:var(--ink,#15151A);margin:0 0 10px;font-weight:600;">' + (s.h || s.title) + '</h2>\n' +
    '    <p><strong>' + s.intro + '</strong></p>\n' +
    '    <p style="margin-top:8px;">' + s.feat + '</p>\n' +
    '    <p style="margin-top:8px;">' + s.who + '</p>\n' +
    '  </section>';
}

/* v0.9.368：中文页（无前缀 URL）多带一份英文正文 + 英文标题，给界面语言不是中文的访客。
   为什么需要：界面语言从 v0.9.136 起按浏览器语言自动切换（不认识的语言落英文），
   但这段正文与 <title> 是服务端按 **URL 语言** 注入的 —— 无前缀 URL 恒为中文，
   于是英文/卢森堡语访客拿到的是「英文界面 + 中文正文 + 中文标签页标题」。
   为什么藏进 <template>：模板内容不渲染、不进正文流、不参与可访问性树，
   禁用 JS 时页面与今天完全一样；只有 seo-alt.js 判定界面语言不是中文时才取出来换上。
   为什么只给 zh 路由：另外 99 个语言路由的正文本来就是该语言，不需要第二份。
   ⚠️ 首页/工作台那段 copy 末尾还带一个 <noscript>，不属于正文 —— 客户端只取 section.seo。 */
function seoAltBlock(page){
  const P = SEO_PAGES[page];
  if (!P || !P.table['en']) return '';
  const en = (page === 'index' || page === 'translate')
    ? (SEO['en'] && SEO['en'].copy)
    : seoCopy(page, 'en');
  if (!en || String(en).indexOf('<section class="seo"') < 0) return '';
  const esc = (v) => String(v == null ? '' : v)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  /* v0.9.310 那条规矩照旧：剥掉 data-i18n，这一段归 URL/界面语言管，别再被 applyI18n 改一遍 */
  const body = String(en).replace(/\s+data-i18n(?:-html)?="[^"]*"/g, '');
  /* data-zh-title：页面此刻的 <title> 原文。客户端拿它判断「标题归谁管」——
     7 个页面（qc/lrc/split/table/batch/translate/index）自己的 applyI18n 里就写
     document.title = t('docTitle')，标题本来就跟着界面语言走，别去覆盖它们
     （改了会跟页面自己那份措辞打架）。只有标题仍是服务端这份中文原样时，才由我们代管。 */
  return '<template id="seo-alt-en" data-title="' + esc(P.table['en'].title) + '"'
    + ' data-zh-title="' + esc(P.table['zh-CN'] ? P.table['zh-CN'].title : '') + '">\n' + body + '\n</template>\n'
    + '<script src="/seo-alt.js?v=' + ASSET_VER + '" defer></script>';
}

function seoHead(lang, base, page){
  page = page || 'index';
  const P = SEO_PAGES[page];
  const s = P.table[lang] || P.table['en'] || P.table['zh-CN'];
  /* v0.9.277：translate 表只写了 title / desc，关键词沿用首页那张表的同语言值 */
  const kw = s.kw || ((SEO[lang] || SEO['zh-CN']).kw) || '';
  const selfUrl = base + P.path[lang];
  const alternates = SEO_LANGS.filter(function (l) { return P.table[l]; }).map(function (l) {
    return '<link rel="alternate" hreflang="' + l + '" href="' + base + P.path[l] + '">';
  }).join('\n') + '\n<link rel="alternate" hreflang="x-default" href="' + base + P.path['en'] + '">';
  /* 首页那张表字段最全（jsonldName / ogLocale / currency 都有）；
     特效页与清洗页只写 title / desc / kw / 三段文案，其余一律走这里的缺省值。 */
  const ogTitle = s.ogTitle || s.title;
  const ogDesc = s.ogDesc || s.desc;
  const siteName = s.siteName || 'AI-SRTSub';
  const jsonldName = s.jsonldName || siteName;
  const jsonldAlt = s.jsonldAlt || (page === 'merge' ? 'Subtitle Effects' : page === 'clean' ? 'Subtitle Cleaner' : 'AI-SRTSub');
  const jsonldDesc = s.jsonldDesc || s.desc;
  /* v0.9.339：16 个工具页的表里没有 ogLocale 字段（og:locale 只跟界面语言走），
     所以内置 27 语靠 OG_LOCALE，新增 73 语必须再查 SEO_OG_LOCALE —— 否则会静默
     回落成 en_US，社交平台按错误语言展示。 */
  const ogLocale = s.ogLocale || OG_LOCALE[lang] || SEO_OG_LOCALE[lang] || 'en_US';
  const currency = s.currency || 'USD';
  const jsonld = '{\n'
    + '  "@context": "https://schema.org",\n'
    + '  "@type": "' + P.jsonldType + '",\n'
    + '  "name": ' + JSON.stringify(jsonldName) + ',\n'
    + '  "alternateName": ' + JSON.stringify(jsonldAlt) + ',\n'
    + '  "url": ' + JSON.stringify(selfUrl) + ',\n'
    + '  "description": ' + JSON.stringify(jsonldDesc) + ',\n'
    + '  "applicationCategory": "UtilitiesApplication",\n'
    + '  "operatingSystem": "Web",\n'
    + '  "browserRequirements": "Requires JavaScript",\n'
    + '  "inLanguage": ' + JSON.stringify(SEO_LANGS) + ',\n'
    + '  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "' + currency + '" }\n'
    + '}';
  /* v0.9.310：属性值必须转义。术语页有 15 种语言的 desc 里带着英文双引号
     （"old term → new term" 这类举例），直接拼进 content="…" 会把标签当场截断 ——
     线上 /th/glossary.html 的 description 只剩引号前那 38 个字，后面全成了乱码属性。
     ⚠️ & 也要转：& 不转的话 &nbsp; 这类写法会被浏览器当实体吃掉。
     ⚠️ 只转属性值，JSON-LD 那边走的是 JSON.stringify，别重复转。 */
  const ea = (v) => String(v == null ? '' : v)
    .replace(/&(?!(amp|lt|gt|quot|#\d+|#x[0-9a-f]+);)/gi, '&amp;')
    .replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  return [
    '<title>' + ea(s.title) + '</title>',
    '<meta name="description" content="' + ea(s.desc) + '">',
    '<meta name="keywords" content="' + ea(kw) + '">',
    '<meta name="robots" content="index, follow">',
    '<meta name="theme-color" content="#0E9488">',
    '<link rel="icon" type="image/svg+xml" href="/favicon.svg">',
    '<link rel="canonical" href="' + selfUrl + '">',
    alternates,
    '<!-- Open Graph / 社交分享卡片 -->',
    '<meta property="og:type" content="website">',
    '<meta property="og:title" content="' + ea(ogTitle) + '">',
    '<meta property="og:description" content="' + ea(ogDesc) + '">',
    '<meta property="og:image" content="' + base + '/og-image.png">',
    '<meta property="og:site_name" content="' + siteName + '">',
    '<meta property="og:locale" content="' + ogLocale + '">',
    /* v0.9.311：og:locale:alternate —— 本页其余 26 个语言版本，给 FB 等社交平台做语言发现用。
       搜索引擎的语言版本靠 hreflang（早就有），这个缺失不影响 Google，但多语言站配上更完整。
       ⚠️ 顺序跟 SEO_LANGS 走，与 hreflang 一一对应，方便对照排查。
       v0.9.339：OG_LOCALE 只有内置 27 语，新增 73 语会落成空 content —— 改从各表自己的
       ogLocale 字段取（分片里已按「语言_主要使用地区」写好），取不到才回 OG_LOCALE。 */
    SEO_LANGS.filter(function (l) { return l !== lang && P.table[l]; }).map(function (l) {
      return '<meta property="og:locale:alternate" content="'
        + (P.table[l].ogLocale || OG_LOCALE[l] || SEO_OG_LOCALE[l] || '') + '">';
    }).join('\n'),
    '<meta property="og:url" content="' + selfUrl + '">',
    '<meta name="twitter:card" content="summary_large_image">',
    '<meta name="twitter:title" content="' + ea(ogTitle) + '">',
    '<meta name="twitter:description" content="' + ea(ogDesc) + '">',
    '<meta name="twitter:image" content="' + base + '/og-image.png">',
    '<!-- 结构化数据（搜索引擎富摘要） -->',
    '<script type="application/ld+json">\n' + jsonld + '\n</script>'
  ].join('\n');
}

/* 按语言服务某一页（index / merge / clean）：替换 SEO head 与静态文案块 */
/* v0.9.343：页脚多语言互链 —— 服务端渲染，爬虫不跑 JS 也能顺着爬到全部语言版本。
   为什么需要：语言切换器是个 <select>，Googlebot 就算执行 JS 也不会去「选」它，
   各语言版本此前只能靠 hreflang 与 sitemap 被发现。这里补一层站内可抓取的互链
   （Wikipedia 式的紧凑排布），三条发现路径互相兜底。
   ⚠️ 必须用绝对 URL：下面 serveIndexLang 里「按 URL 语言补前缀」那段会把 href="/xxx"
      改写成 /<lang>/xxx，这里若写相对路径会被二次补前缀成 /ms/ms/xxx（直接 404）。
   ⚠️ 语言自称取 LANGS100.BY_CODE[l].zh（永远用该语言自己写，不翻译成中文）；
      rtl 语言名要带 dir="rtl"，否则混在 ltr 列表里会贴错边。 */
function langLinksRender(base, lang, items){
  if (!items || items.length < 2) return '';
  const esc = function (v) {
    return String(v == null ? '' : v).replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  };
  const lis = items.map(function (it) {
    const m = LANGS100.BY_CODE[it.code];
    const dir = (m && m.dir === 'rtl') ? ' dir="rtl"' : '';
    /* 当前语言：aria-current 给读屏器，加粗给眼睛；其余用弱化色 */
    const cur = (it.code === lang)
      ? ' aria-current="page" style="font-weight:600;color:var(--ink,#15151A)"'
      : ' style="color:var(--sub,#767680)"';
    return '<li><a href="' + base + it.url + '" hreflang="' + it.code + '" lang="' + it.code + '"'
      + dir + cur + '>' + esc((m && m.zh) || it.code) + '</a></li>';
  }).join('');
  return '<nav class="langlinks" aria-label="Languages" style="max-width:1080px;margin:26px auto 0;'
    + 'padding:14px 24px 24px;border-top:1px solid var(--line,#E9E9EF)">'
    + '<ul style="list-style:none;margin:0;padding:0;display:flex;flex-wrap:wrap;'
    + 'gap:4px 14px;font-size:12px;line-height:1.9">'
    + lis + '</ul></nav>';
}
/* 工具页：SEO_PAGES 那 17 页，每页 100 种语言 */
function langLinksHtml(base, lang, page){
  const P = SEO_PAGES[page];
  if (!P) return '';
  return langLinksRender(base, lang, SEO_LANGS.filter(function (l) { return P.table[l]; })
    .map(function (l) { return { code: l, url: P.path[l] }; }));
}
/* 指南页：只列这篇指南真正有的语言版本（目前 27 语，不是 100），URL 走 guideUrl() */
function guideLangLinksHtml(base, lang, slug){
  const g = GUIDE_PAGES[slug];
  if (!g) return '';
  return langLinksRender(base, lang, guideLangs(g)
    .map(function (l) { return { code: l, url: guideUrl(l, slug) }; }));
}

function serveIndexLang(req, res, lang, page){
  page = page || 'index';
  const P = SEO_PAGES[page];
  /* v0.9.364：这一页还没有这个语言的版本 → 302 到该页英文版。
     此前 autosub / ocrsub 只有 3 语的 SEO 表，其余 97 个语言 URL 一样返 200：
     标题英文、正文中文、<html lang> 却是路径上那个语言 —— 用户在下拉框选「日本語」
     会得到一整页中文，爬虫则把同一份中文正文按 100 种语言各收一遍。
     收口放在渲染前（不是渲染后加 noindex）：内容不存在就不该有 200。
     ⚠️ 用 302 不用 301：译文补齐后这条自然失效，浏览器也不会把旧跳转长期缓存。 */
  if (!P.table[lang]) {
    const to = P.path['en'] || ('/' + P.file);
    const b0 = publicBase(req) || '';
    res.writeHead(302, { 'Location': b0 + to, 'Cache-Control': 'no-store' });
    res.end(); return;
  }
  fs.readFile(path.join(ROOT, P.file), 'utf8', (err, html) => {
    if (err) { res.writeHead(500, {'Content-Type':'text/plain; charset=utf-8'}); res.end(P.file + ' missing'); return; }
    const base = publicBase(req) || '';
    const head = seoHead(lang, base, page);
    html = html.replace(/<!--SEO-HEAD-START-->[\s\S]*?<!--SEO-HEAD-END-->/,
      '<!--SEO-HEAD-START-->\n' + head + '\n<!--SEO-HEAD-END-->');
    /* 首页那张表自带整段 copy；其余页由 seoCopy() 现拼（没有就跳过，页面照常出） */
    /* v0.9.277：那段 copy 通篇讲的是字幕翻译引擎，正好属于 /translate.html。
       ⚠️ v0.9.310：首页落地页正文也是静态 HTML（爬虫读到的永远是中文），
          所以首页同样要注入 —— 两页以前都缺 SEO-COPY 占位符，这段 copy 一直是一份死数据。 */
    const copy = (page === 'index') ? (SEO[lang] && SEO[lang].copy)
               : (page === 'translate') ? (SEO[lang] && SEO[lang].copy)
               : seoCopy(page, lang);
    if (copy) {
      /* v0.9.310：SEO 表里那段 copy 原本就是页面 DOM 的一部分，写着 data-i18n="seoTitle" 这类属性。
         但这里是**服务端按 URL 语言**注入的，客户端词典里并没有 seoTitle / seoIntro 这些键 ——
         t(k) 缺键时返回键名本身，applyI18n 会把英文版那几段当场改成「seoTitle」几个字。
         所以注入前先把这些属性剥掉：这一段归 URL 语言管，不再被界面语言改一遍。 */
      const copyHtml = String(copy).replace(/\s+data-i18n(?:-html)?="[^"]*"/g, '');
      html = html.replace(/<!--SEO-COPY-START-->[\s\S]*?<!--SEO-COPY-END-->/,
        '<!--SEO-COPY-START-->\n  ' + copyHtml + '\n  <!--SEO-COPY-END-->');
    }
    /* v0.9.368：中文页额外带一份英文正文（藏在 <template> 里），界面语言非中文时由
       seo-alt.js 换上 —— 否则英文访客看到的是英文界面配中文正文与中文标题。 */
    if (lang === 'zh-CN') {
      const alt = seoAltBlock(page);
      /* 函数式 replacement：文案里若出现 $& / $' / $` 这类字符，字符串替换会当成替换模式，
         把整段正文换成别的东西（英文文案里 $ 不算罕见）。 */
      if (alt) html = html.replace('<!--SEO-COPY-END-->', function () { return '<!--SEO-COPY-END-->\n' + alt; });
    }
    const htmlLang = (page === 'index' && SEO[lang]) ? SEO[lang].htmlLang : lang;
    html = html.replace('<html lang="zh-CN"', '<html lang="' + htmlLang + '"' + (RTL_LANGS.indexOf(htmlLang) >= 0 ? ' dir="rtl"' : ''));
    /* v0.9.312：站内链接按 URL 语言补前缀。页面源码里的站内链接（首页十二张工具卡、
       各页 logo / 页脚）写的是无前缀形态 —— 那是 zh-CN 版的路径。语言版访客点了会
       掉回中文版（底部 SEO 文案整段变中文，多语言联动就断在这）。六个垂直页自己的
       胶囊导航有 JS 补前缀，但静态 href 没人管 —— 统一在这补：
         /convert.html → /en/convert.html；/ → /en/（zh-CN 本就无前缀，不重写）
       ⚠️ 正则只认「/」或「/xxx.html（可带 ?query#hash）」：favicon.svg 不匹配；
          seoHead 注入的 canonical/hreflang 全是绝对 URL 也不匹配；
          JS 里 a.href = URL.createObjectURL(...) 是赋值语句，同样碰不到。
       site-nav.js 渲染的胶囊/卡片是客户端生成的 DOM，服务端够不着 —— 那边自己补。 */
    if (lang !== 'zh-CN') {
      const lp = '/' + lang;
      html = html.replace(/href="(\/(?:[a-z-]+\.html)?(?:[?#][^"]*)?)"/g, 'href="' + lp + '$1"');
      /* v0.9.366：指南入口单独一条。上面那条只认 "/" 与 "/xxx.html"，认不出
         href="/guides/"，于是 ytfix 页的「看怎么用」在 73 个语言版的静态 HTML 里
         全指向中文指南索引（JS 起来后 applyI18n 会改成 /<lang>/guides/，爬虫和
         禁用 JS 的访客只看得到静态值）。
         照这个文件的既有规矩新开一条，不去动上面那条老正则 —— 它有单测逐字校验，
         改一个字符就会红。指南页那条同款正则在 v0.9.323 时就已含 guides\/。 */
      html = html.replace(/href="(\/(?:guides\/[a-z0-9-]+\.html|guides\/)(?:[?#][^"]*)?)"/g, 'href="' + lp + '$1"');
    }
    /* GA4 统计：配置了 analyticsId 才注入（fork 部署者用自己的 ID，避免统计进原作者账号） */
    const ga = (readConfig().analyticsId || '').trim();
    const gaTag = /^G-[A-Z0-9]+$/.test(ga)
      ? '<!-- Google tag (gtag.js) -->\n<script async src="https://www.googletagmanager.com/gtag/js?id=' + ga + '"></script>\n<script>\nwindow.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag(\'js\', new Date());\ngtag(\'config\', \'' + ga + '\');\n</script>'
      : '';
    html = html.replace('<!--ANALYTICS-->', gaTag);
    /* v0.9.343：页脚多语言互链。放在补前缀那段之后 —— 它生成的是绝对 URL，
       不会被那条 href="/xxx" 的正则二次改写。 */
    const langNav = langLinksHtml(base, lang, page);
    if (langNav) html = html.replace('</body>', langNav + '\n</body>');
    /* v0.9.75：页面必须协调验证（no-cache），否则新版 srt-core.js?v= 参数可能被旧缓存页面屏蔽 */
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-cache' });
    res.end(html);
  });
}

/* sitemap：十七页 × 27 语言 = 459 条 URL，每条带本页的 hreflang alternates。
   v0.9.273 之前只有首页进 sitemap —— 特效页和清洗页对爬虫来说是不存在的。
   v0.9.277 起字幕翻译工作台独立成 /translate.html，第四个页面进表。
   v0.9.288 起字幕格式转换独立成 /convert.html，第五个页面进表。
   v0.9.296 起字幕乱码修复独立成 /repair.html，第八个页面进表。
   v0.9.299 起字幕提取纯文本独立成 /extract.html，第九个页面进表。
   v0.9.302 起术语批量替换独立成 /glossary.html，第十个页面进表。
   v0.9.313 起视频内封字幕提取 /videosub.html、繁简转换 /hanconv.html 进表，共十二页 324 条。
   v0.9.316 起拆分拼接 /split.html、表格互转 /table.html、批量转换 /batch.html、歌词打轴 /lrc.html 进表，共十六页 432 条。
   v0.9.321 起字幕质检 /qc.html 进表，共十七页 459 条。
   v0.9.323 起内容页（指南）进表：/guides/<slug>.html 每篇按其实际语言版本列出，
   只列 seo+body 双全的语言，不骗爬虫。第一批 5 篇 × 27 语 = 135 条，共 594 条。 */
/* v0.9.343：<lastmod> 取源文件 mtime，W3C 日期格式（YYYY-MM-DD）。
   Google 拿它做增量抓取判断 —— 以前一条都没有，爬虫每次只能全量重抓。
   ⚠️ 取不到就返回空串，调用方整行省略，别输出空的 <lastmod></lastmod>。 */
function lastmodOf(file){
  try {
    return fs.statSync(path.join(ROOT, file)).mtime.toISOString().slice(0, 10);
  } catch (e) { return ''; }
}
function lmTag(file){
  const d = lastmodOf(file);
  return d ? '    <lastmod>' + d + '</lastmod>\n' : '';
}

/* v0.9.342：sitemap index —— 按语言切分，每种语言一片。
   子片命名 /sitemap-<lang>.xml（含 zh-CN 这种带连字符的），index 只列它们。
   ⚠️ 不列 /sitemap-all.xml：那是给人排障用的全量版，别让爬虫再下一遍。 */
function sitemapIndexXml(base){
  const items = SEO_LANGS.map(function (l) {
    return '  <sitemap>\n    <loc>' + base + '/sitemap-' + l + '.xml</loc>\n  </sitemap>';
  }).join('\n');
  return '<?xml version="1.0" encoding="UTF-8"?>\n'
    + '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
    + items + '\n</sitemapindex>\n';
}

/* v0.9.342：某一种语言的子 sitemap —— 该语言的 17 个工具页 + 该语言有的指南页。
   v0.9.343：不再写 xhtml:link。每个页面的 <head> 里已有完整双向 hreflang
   （工具页 101 条、指南页 28 条，都含 x-default），Google 三选一即可 ——
   sitemap 里再写一遍纯属冗余：2861 条 × 101 个 link 把文件撑到 19.6MB，去掉后约 1/34，
   而 head 那份才是它认的主来源。
   ⚠️ 若哪天改回在 sitemap 带 hreflang：必须整簇重复且跟 head 完全一致，
      两处不一致会让 Google 直接忽略整组注解（比不放还糟）。 */
function sitemapLangXml(base, lang){
  const urls = [];
  Object.keys(SEO_PAGES).forEach(function (page) {
    const P = SEO_PAGES[page];
    if (!P.table[lang]) return;
    /* 首页权重最高，两个工具页低一档 */
    const pr = (page === 'index') ? (lang === 'zh-CN' ? '1.0' : '0.9') : (lang === 'zh-CN' ? '0.8' : '0.7');
    urls.push('  <url>\n    <loc>' + base + P.path[lang] + '</loc>\n' + lmTag(P.file)
      + '    <changefreq>weekly</changefreq>\n    <priority>' + pr + '</priority>\n  </url>');
  });
  Object.keys(GUIDE_PAGES).sort().forEach(function (slug) {
    const g = GUIDE_PAGES[slug];
    const langs = guideLangs(g);
    if (langs.indexOf(lang) < 0) return;
    const pr = (lang === 'zh-CN') ? '0.6' : '0.5';
    urls.push('  <url>\n    <loc>' + base + guideUrl(lang, slug) + '</loc>\n' + lmTag('content/' + slug + '.js')
      + '    <changefreq>monthly</changefreq>\n    <priority>' + pr + '</priority>\n  </url>');
  });
  return '<?xml version="1.0" encoding="UTF-8"?>\n'
    + '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
    + urls.join('\n') + '\n</urlset>\n';
}

function sitemapXml(base){
  const urls = [];
  Object.keys(SEO_PAGES).forEach(function (page) {
    const P = SEO_PAGES[page];
    const langs = SEO_LANGS.filter(function (l) { return P.table[l]; });
    langs.forEach(function (l) {
      /* 首页权重最高，两个工具页低一档 */
      const pr = (page === 'index') ? (l === 'zh-CN' ? '1.0' : '0.9') : (l === 'zh-CN' ? '0.8' : '0.7');
      urls.push('  <url>\n    <loc>' + base + P.path[l] + '</loc>\n' + lmTag(P.file)
        + '    <changefreq>weekly</changefreq>\n    <priority>' + pr + '</priority>\n  </url>');
    });
  });
  /* v0.9.323：内容页段。指南索引页 /guides/ 不进 sitemap（靠文章面包屑互链发现），
     只列文章本身。x-default 指向 en 版；某篇没有 en 版时退回首语言。 */
  Object.keys(GUIDE_PAGES).sort().forEach(function (slug) {
    const g = GUIDE_PAGES[slug];
    const langs = guideLangs(g);
    if (!langs.length) return;
    langs.forEach(function (l) {
      const pr = (l === 'zh-CN') ? '0.6' : '0.5';
      urls.push('  <url>\n    <loc>' + base + guideUrl(l, slug) + '</loc>\n' + lmTag('content/' + slug + '.js')
        + '    <changefreq>monthly</changefreq>\n    <priority>' + pr + '</priority>\n  </url>');
    });
  });
  return '<?xml version="1.0" encoding="UTF-8"?>\n'
    + '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
    + urls.join('\n') + '\n</urlset>\n';
}

/* ---------------- v0.9.323 内容模块（指南页） ----------------
 * 数据源：content/<slug>.js（CommonJS 导出 { slug, kind, tool, date, seo, body, related }）。
 * 启动时扫描注册进 GUIDE_PAGES，之后加文章只往 content/ 放一个文件（重启生效），
 * server.js 不用再动 —— 老的「每加一页改四处」只留给工具页。
 * 渲染完全独立成套（guideHead/guideBodyHtml/serveGuide），不碰 seoHead/seoCopy/serveIndexLang。
 * ⚠️ 语言版本判据：seo[l] 与 body[l] 双全才算有该语言（sitemap 也只列双全的，不骗爬虫）。
 * ⚠️ 截图铁律：图里不打一个字。图注/alt 放数据文件里随语言翻译；
 *    截图文件出 en 与 zh-CN 两套（<file>.en.png / <file>.zh-CN.png），
 *    zh-CN 用中文版，其余 26 语共用英文版。 */
const GUIDE_DIR = path.join(ROOT, 'content');
const GUIDE_PAGES = {};
try {
  fs.readdirSync(GUIDE_DIR).sort().forEach(function (f) {
    if (!/^[a-z0-9][a-z0-9\-]*\.js$/.test(f)) return;
    let d = null;
    try { d = require(path.join(GUIDE_DIR, f)); } catch (e) { d = null; }
    if (d && d.slug && d.kind && d.seo && d.body && !GUIDE_PAGES[d.slug]) GUIDE_PAGES[d.slug] = d;
  });
} catch (e) { /* content/ 目录还没建：安静跳过，站点照常跑 */ }

/* v0.9.344：指南页 73 种新语言的译文放在 i18n/gd-<lang>.js（_mkgd.js 生成，每片约 160KB / 43 篇）。
   content/*.js 里仍只有原来 27 语 —— 100 语全塞进 content/ 会让目录从 5.1MB 涨到约 19MB，
   而 server 启动是整体 require 的，内存和启动时间都吃亏。这里改成按需 require + 缓存：
   只有真的有人访问该语言的指南页时才读那一片。
   ⚠️ gd-<lang>.js 是 server 自己 require 的，不被任何 html 引用 ——
      _mkpkg341.py 那种「扫 html 引用」的打包规则装不到它，部署时必须显式加进传输列表
      （343 那次 langs100.js 就是这么漏掉、导致线上 MODULE_NOT_FOUND 全站宕机的）。 */
const GD_CACHE = {};
function gdShard(lang) {
  if (GD_CACHE[lang] === undefined) {
    const f = path.join(__dirname, 'i18n', 'gd-' + lang + '.js');
    let d = null;
    try { d = fs.existsSync(f) ? require(f) : null; } catch (e) { d = null; }
    GD_CACHE[lang] = d;
  }
  return GD_CACHE[lang];
}
/* 统一取值口：content 里有就用 content 的（原 27 语），没有就回落到语言分片 */
function gdSeo(g, lang) {
  if (g.seo[lang]) return g.seo[lang];
  const s = gdShard(lang);
  return (s && s[g.slug] && s[g.slug].seo) || null;
}
function gdBody(g, lang) {
  if (g.body[lang]) return g.body[lang];
  const s = gdShard(lang);
  return (s && s[g.slug] && s[g.slug].body) || null;
}

function guideLangs(g) {
  return SEO_LANGS.filter(function (l) { return gdSeo(g, l) && gdBody(g, l); });
}
function guideUrl(lang, slug) {
  return (lang === 'zh-CN' ? '' : '/' + lang) + '/guides/' + slug + '.html';
}
function guideIndexUrl(lang) {
  return (lang === 'zh-CN' ? '' : '/' + lang) + '/guides/';
}
/* 截图路径：zh-CN 用中文版，其余语言共用英文版；img.nolang 时是无文字图表，全语共用 */
function guideImgPath(img, lang) {
  return '/img/guides/' + img.file + (img.nolang ? '' : (lang === 'zh-CN' ? '.zh-CN' : '.en'));
}
function guideEsc(v) {
  return String(v == null ? '' : v)
    .replace(/&(?!(amp|lt|gt|quot|#\d+|#x[0-9a-f]+);)/gi, '&amp;')
    .replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
/* 正文内联标记（翻译时原样保留，渲染时转 HTML，杜绝手写 HTML 注入）：
   **加粗** → <strong>；[[文字|/shift.html]] → 站内链接 */
function guideInline(t) {
  return guideEsc(t)
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\[\[([^|\]]+)\|([a-zA-Z0-9\-\/.#?]+)\]\]/g, '<a href="$2">$1</a>');
}

/* 指南索引页自己的 27 语表（标题/分组名/面包屑），与各文章数据文件无关 */
const GUIDE_INDEX = {
  'zh-CN': { title: '字幕工具使用指南与教程 – 随心字幕 AI', desc: '图文教程：字幕翻译、格式转换、时间轴调整等工具怎么用，常见场景怎么处理，出问题怎么修，每篇都带配图。', h1: '字幕指南与教程', intro: '每篇指南对应一个具体需求：怎么用某个工具、某个场景怎么解决、出了问题怎么修。', lhowto: '工具使用说明', lscene: '场景指南', lguide: '问题指南', lrel: '相关指南', home: '首页', guides: '指南' , toc: '本页内容', upd: '更新于', ctaLead: '全程在浏览器里完成，无需安装。' },
  'zh-TW': { title: '字幕工具使用指南與教學 – 隨心字幕 AI', desc: '圖文教學：字幕翻譯、格式轉換、時間軸調整等工具怎麼用，常見場景怎麼處理，出問題怎麼修，每篇都帶配圖。', h1: '字幕指南與教學', intro: '每篇指南對應一個具體需求：怎麼用某個工具、某個場景怎麼解決、出了問題怎麼修。', lhowto: '工具使用說明', lscene: '場景指南', lguide: '問題指南', lrel: '相關指南', home: '首頁', guides: '指南' , toc: '本頁內容', upd: '更新於', ctaLead: '全程在瀏覽器裡完成，無需安裝。' },
  'en': { title: 'Subtitle Tool Guides & Tutorials – AI-SRTSub', desc: 'Illustrated guides: how to use the subtitle translator, format converter, timing editor and other tools, and how to fix common subtitle problems.', h1: 'Subtitle Guides & Tutorials', intro: 'Every guide answers one specific need: how to use a tool, how to solve a scenario, or how to fix a problem.', lhowto: 'Tool guides', lscene: 'Scenario guides', lguide: 'Troubleshooting guides', lrel: 'Related guides', home: 'Home', guides: 'Guides' , toc: 'On this page', upd: 'Updated', ctaLead: 'Runs entirely in your browser, nothing to install.' },
  'ja': { title: '字幕ツール使い方ガイドとチュートリアル – AI-SRTSub', desc: '字幕翻訳・形式変換・タイミング調整など各ツールの使い方と、よくある字幕トラブルの直し方を画像付きで解説。', h1: '字幕ガイドとチュートリアル', intro: '各ガイドはひとつの具体的なニーズに応えます。ツールの使い方、シーン別の解決策、トラブルの直し方。', lhowto: 'ツール使い方ガイド', lscene: 'シナリオガイド', lguide: 'トラブル解決ガイド', lrel: '関連ガイド', home: 'ホーム', guides: 'ガイド' , toc: 'このページの内容', upd: '更新日', ctaLead: 'すべてブラウザ内で完結します。インストールは不要です。' },
  'es': { title: 'Guías y tutoriales de subtítulos – AI-SRTSub', desc: 'Guías ilustradas: cómo usar el traductor, el conversor de formatos, el editor de tiempos y otras herramientas, y cómo resolver problemas comunes de subtítulos.', h1: 'Guías y tutoriales de subtítulos', intro: 'Cada guía responde a una necesidad concreta: usar una herramienta, resolver un escenario o arreglar un problema.', lhowto: 'Guías de herramientas', lscene: 'Guías por escenario', lguide: 'Guías de solución de problemas', lrel: 'Guías relacionadas', home: 'Inicio', guides: 'Guías' , toc: 'En esta página', upd: 'Actualizado', ctaLead: 'Todo ocurre en el navegador, sin instalar nada.' },
  'pt': { title: 'Guias e tutoriais de legendas – AI-SRTSub', desc: 'Guias ilustrados: como usar o tradutor, o conversor de formatos, o editor de tempo e outras ferramentas, e como resolver problemas comuns de legendas.', h1: 'Guias e tutoriais de legendas', intro: 'Cada guia responde a uma necessidade específica: usar uma ferramenta, resolver um cenário ou corrigir um problema.', lhowto: 'Guias de ferramentas', lscene: 'Guias por cenário', lguide: 'Guias de solução de problemas', lrel: 'Guias relacionados', home: 'Início', guides: 'Guias' , toc: 'Nesta página', upd: 'Atualizado', ctaLead: 'Tudo acontece no navegador, sem instalar nada.' },
  'ko': { title: '자막 도구 사용 가이드와 튜토리얼 – AI-SRTSub', desc: '자막 번역, 형식 변환, 타이밍 조정 등 도구 사용법과 흔한 자막 문제 해결 방법을 그림과 함께 설명합니다.', h1: '자막 가이드와 튜토리얼', intro: '모든 가이드는 하나의 구체적인 필요를 해결합니다. 도구 사용법, 시나리오별 해결책, 문제 해결.', lhowto: '도구 사용 가이드', lscene: '시나리오 가이드', lguide: '문제 해결 가이드', lrel: '관련 가이드', home: '홈', guides: '가이드' , toc: '이 페이지의 내용', upd: '업데이트', ctaLead: '모두 브라우저에서 실행됩니다. 설치가 필요 없습니다.' },
  'de': { title: 'Anleitungen und Tutorials für Untertitel-Tools – AI-SRTSub', desc: 'Illustrierte Anleitungen: So nutzt du Übersetzer, Formatkonverter, Zeitachsen-Editor und weitere Tools – und behebst häufige Untertitel-Probleme.', h1: 'Anleitungen und Tutorials', intro: 'Jede Anleitung beantwortet ein konkretes Bedürfnis: ein Tool nutzen, ein Szenario lösen oder ein Problem beheben.', lhowto: 'Tool-Anleitungen', lscene: 'Szenario-Anleitungen', lguide: 'Problemlösungen', lrel: 'Verwandte Anleitungen', home: 'Startseite', guides: 'Anleitungen' , toc: 'Auf dieser Seite', upd: 'Aktualisiert', ctaLead: 'Läuft vollständig im Browser, nichts zu installieren.' },
  'fr': { title: 'Guides et tutoriels sous-titres – AI-SRTSub', desc: "Guides illustrés : utiliser le traducteur, le convertisseur de formats, l'éditeur de synchronisation et les autres outils, et résoudre les problèmes courants de sous-titres.", h1: 'Guides et tutoriels sous-titres', intro: 'Chaque guide répond à un besoin précis : utiliser un outil, résoudre un scénario ou corriger un problème.', lhowto: "Guides d'outils", lscene: 'Guides par scénario', lguide: 'Guides de dépannage', lrel: 'Guides associés', home: 'Accueil', guides: 'Guides' , toc: 'Sur cette page', upd: 'Mis à jour', ctaLead: 'Tout se passe dans le navigateur, rien à installer.' },
  'id': { title: 'Panduan & Tutorial Alat Subtitle – AI-SRTSub', desc: 'Panduan bergambar: cara menggunakan penerjemah, konverter format, editor waktu, dan alat lainnya, serta cara memperbaiki masalah subtitle umum.', h1: 'Panduan & Tutorial Subtitle', intro: 'Setiap panduan menjawab satu kebutuhan spesifik: menggunakan alat, menyelesaikan skenario, atau memperbaiki masalah.', lhowto: 'Panduan alat', lscene: 'Panduan per skenario', lguide: 'Panduan pemecahan masalah', lrel: 'Panduan terkait', home: 'Beranda', guides: 'Panduan' , toc: 'Di halaman ini', upd: 'Diperbarui', ctaLead: 'Semua berjalan di browser, tidak perlu menginstal apa pun.' },
  'hi': { title: 'सबटाइटल टूल गाइड और ट्यूटोरियल – AI-SRTSub', desc: 'चित्रों के साथ गाइड: अनुवादक, फॉर्मेट कनवर्टर, टाइमिंग एडिटर जैसे टूल कैसे इस्तेमाल करें और आम सबटाइटल समस्याएँ कैसे ठीक करें।', h1: 'सबटाइटल गाइड और ट्यूटोरियल', intro: 'हर गाइड एक ठोस ज़रूरत का जवाब देता है: टूल इस्तेमाल करना, किसी स्थिति का हल निकालना या समस्या ठीक करना।', lhowto: 'टूल गाइड', lscene: 'परिदृश्य गाइड', lguide: 'समस्या समाधान गाइड', lrel: 'संबंधित गाइड', home: 'होम', guides: 'गाइड' , toc: 'इस पृष्ठ पर', upd: 'अपडेट', ctaLead: 'सब कुछ ब्राउज़र में ही होता है, इंस्टॉल करने की ज़रूरत नहीं।' },
  'th': { title: 'คู่มือและบทแนะนำเครื่องมือซับไตเติล – AI-SRTSub', desc: 'คู่มือประกอบภาพ: วิธีใช้ตัวแปลภาษา ตัวแปลงรูปแบบ ตัวแก้ไขจังหวะเวลา และเครื่องมืออื่น ๆ รวมถึงวิธีแก้ปัญหาซับไตเติลที่พบบ่อย', h1: 'คู่มือและบทแนะนำซับไตเติล', intro: 'ทุกคู่มือตอบโจทย์ความต้องการเฉพาะเรื่อง: ใช้เครื่องมือ แก้ปัญหาตามสถานการณ์ หรือแก้ไขข้อผิดพลาด', lhowto: 'คู่มือการใช้เครื่องมือ', lscene: 'คู่มือตามสถานการณ์', lguide: 'คู่มือแก้ปัญหา', lrel: 'คู่มือที่เกี่ยวข้อง', home: 'หน้าแรก', guides: 'คู่มือ' , toc: 'ในหน้านี้', upd: 'อัปเดตเมื่อ', ctaLead: 'ทั้งหมดทำงานในเบราว์เซอร์ ไม่ต้องติดตั้งอะไร' },
  'vi': { title: 'Hướng dẫn và bài viết về công cụ phụ đề – AI-SRTSub', desc: 'Hướng dẫn kèm hình ảnh: cách dùng trình dịch, bộ chuyển đổi định dạng, trình chỉnh thời gian và các công cụ khác, cùng cách xử lý các lỗi phụ đề thường gặp.', h1: 'Hướng dẫn phụ đề', intro: 'Mỗi hướng dẫn trả lời một nhu cầu cụ thể: dùng một công cụ, giải quyết một tình huống hay sửa một lỗi.', lhowto: 'Hướng dẫn công cụ', lscene: 'Hướng dẫn theo tình huống', lguide: 'Hướng dẫn xử lý sự cố', lrel: 'Hướng dẫn liên quan', home: 'Trang chủ', guides: 'Hướng dẫn' , toc: 'Trang này', upd: 'Cập nhật', ctaLead: 'Tất cả diễn ra trong trình duyệt, không cần cài đặt.' },
  'ru': { title: 'Руководства по инструментам для субтитров – AI-SRTSub', desc: 'Иллюстрированные руководства: как пользоваться переводчиком, конвертером форматов, редактором тайминга и другими инструментами, а также как решать типичные проблемы с субтитрами.', h1: 'Руководства и уроки по субтитрам', intro: 'Каждое руководство отвечает на конкретный запрос: освоить инструмент, решить сценарий или устранить проблему.', lhowto: 'Руководства по инструментам', lscene: 'Руководства по сценариям', lguide: 'Устранение проблем', lrel: 'Похожие руководства', home: 'Главная', guides: 'Руководства' , toc: 'На этой странице', upd: 'Обновлено', ctaLead: 'Всё работает в браузере, ничего устанавливать не нужно.' },
  'it': { title: 'Guide e tutorial sui sottotitoli – AI-SRTSub', desc: 'Guide illustrate: come usare traduttore, convertitore di formati, editor dei tempi e altri strumenti, e come risolvere i problemi più comuni di sottotitolatura.', h1: 'Guide e tutorial sui sottotitoli', intro: 'Ogni guida risponde a un bisogno preciso: usare uno strumento, risolvere uno scenario o correggere un problema.', lhowto: 'Guide agli strumenti', lscene: 'Guide per scenario', lguide: 'Guide alla risoluzione dei problemi', lrel: 'Guide correlate', home: 'Home', guides: 'Guide' , toc: 'In questa pagina', upd: 'Aggiornato', ctaLead: 'Tutto avviene nel browser, niente da installare.' },
  'ar': { title: 'أدلة ودروس أدوات الترجمة – AI-SRTSub', desc: 'أدلة مصوّرة: كيف تستخدم المترجم ومحوّل الصيغ ومحرّر التوقيت وغيرها من الأدوات، وكيف تحل مشاكل الترجمة الشائعة.', h1: 'أدلة ودروس الترجمة', intro: 'كل دليل يجيب عن حاجة محددة: استخدام أداة، أو حل سيناريو، أو إصلاح مشكلة.', lhowto: 'أدلة الأدوات', lscene: 'أدلة السيناريوهات', lguide: 'أدلة حل المشكلات', lrel: 'أدلة ذات صلة', home: 'الرئيسية', guides: 'الأدلة' , toc: 'في هذه الصفحة', upd: 'آخر تحديث', ctaLead: 'كل شيء يعمل في المتصفح، لا حاجة للتثبيت.' },
  'tr': { title: 'Altyazı Araç Kılavuzları – AI-SRTSub', desc: 'Resimli kılavuzlar: çevirmen, format dönüştürücü, zaman düzenleyici ve diğer araçları nasıl kullanırsınız, sık altyazı sorunlarını nasıl çözersiniz.', h1: 'Altyazı Kılavuzları ve Dersler', intro: 'Her kılavuz tek bir somut ihtiyaca cevap verir: araç kullanmak, bir senaryoyu çözmek veya sorunu düzeltmek.', lhowto: 'Araç kılavuzları', lscene: 'Senaryo kılavuzları', lguide: 'Sorun çözme kılavuzları', lrel: 'İlgili kılavuzlar', home: 'Ana sayfa', guides: 'Kılavuzlar' , toc: 'Bu sayfada', upd: 'Güncelleme', ctaLead: 'Her şey tarayıcıda çalışır, kurulum gerekmez.' },
  'nl': { title: 'Handleidingen en tutorials voor ondertiteltools – AI-SRTSub', desc: 'Geïllustreerde handleidingen: hoe je de vertaler, formaatconverter, timing-editor en andere tools gebruikt, en hoe je veelvoorkomende ondertitelproblemen oplost.', h1: 'Handleidingen en tutorials', intro: 'Elke handleiding beantwoordt één concrete vraag: een tool gebruiken, een scenario oplossen of een probleem verhelpen.', lhowto: 'Toolhandleidingen', lscene: 'Scenariohandleidingen', lguide: 'Problemen oplossen', lrel: 'Gerelateerde handleidingen', home: 'Startpagina', guides: 'Handleidingen' , toc: 'Op deze pagina', upd: 'Bijgewerkt', ctaLead: 'Alles gebeurt in de browser, niets installeren.' },
  'pl': { title: 'Poradniki i tutoriale narzędzi do napisów – AI-SRTSub', desc: 'Ilustrowane poradniki: jak korzystać z tłumacza, konwertera formatów, edytora synchronizacji i innych narzędzi oraz jak rozwiązywać typowe problemy z napisami.', h1: 'Poradniki i tutoriale o napisach', intro: 'Każdy poradnik odpowiada na jedną konkretną potrzebę: korzystanie z narzędzia, rozwiązanie scenariusza lub naprawa problemu.', lhowto: 'Poradniki narzędzi', lscene: 'Poradniki scenariuszowe', lguide: 'Rozwiązywanie problemów', lrel: 'Powiązane poradniki', home: 'Strona główna', guides: 'Poradniki' , toc: 'Na tej stronie', upd: 'Zaktualizowano', ctaLead: 'Wszystko działa w przeglądarce, nic nie trzeba instalować.' },
  'sv': { title: 'Guider och självstudier för undertextverktyg – AI-SRTSub', desc: 'Illustrerade guider: hur du använder översättaren, formatkonverteraren, tidsredigeraren och andra verktyg – och löser vanliga undertextproblem.', h1: 'Guider och självstudier', intro: 'Varje guide svarar på ett konkret behov: använda ett verktyg, lösa ett scenario eller åtgärda ett problem.', lhowto: 'Verktygsguider', lscene: 'Scenarioguider', lguide: 'Felsökningsguider', lrel: 'Relaterade guider', home: 'Startsida', guides: 'Guider' , toc: 'På den här sidan', upd: 'Uppdaterad', ctaLead: 'Allt sker i webbläsaren, inget att installera.' },
  'cs': { title: 'Návody a tutoriály pro nástroje na titulky – AI-SRTSub', desc: 'Návody s obrázky: jak používat překladač, převodník formátů, editor časování a další nástroje a jak řešit časté problémy s titulky.', h1: 'Návody a tutoriály k titulkům', intro: 'Každý návod odpovídá na jednu konkrétní potřebu: použití nástroje, vyřešení scénáře nebo oprava problému.', lhowto: 'Návody k nástrojům', lscene: 'Návody podle scénáře', lguide: 'Řešení problémů', lrel: 'Související návody', home: 'Domů', guides: 'Návody' , toc: 'Na této stránce', upd: 'Aktualizováno', ctaLead: 'Vše probíhá v prohlížeči, není třeba nic instalovat.' },
  'uk': { title: 'Посібники та уроки з інструментів для субтитрів – AI-SRTSub', desc: 'Ілюстровані посібники: як користуватися перекладачем, конвертером форматів, редактором таймінгу та іншими інструментами, і як вирішувати типові проблеми із субтитрами.', h1: 'Посібники та уроки з субтитрів', intro: 'Кожен посібник відповідає на одну конкретну потребу: опанувати інструмент, вирішити сценарій чи усунути проблему.', lhowto: 'Посібники з інструментів', lscene: 'Посібники за сценаріями', lguide: 'Вирішення проблем', lrel: 'Схожі посібники', home: 'Головна', guides: 'Посібники' , toc: 'На цій сторінці', upd: 'Оновлено', ctaLead: 'Усе відбувається у браузері, нічого не треба встановлювати.' },
  'da': { title: 'Vejledninger og tutorials til undertekstværktøjer – AI-SRTSub', desc: 'Illustrerede vejledninger: Sådan bruger du oversætteren, formatkonverteren, timing-editoren og andre værktøjer – og løser almindelige undertekstproblemer.', h1: 'Vejledninger og tutorials', intro: 'Hver vejledning besvarer ét konkret behov: at bruge et værktøj, løse et scenarie eller rette et problem.', lhowto: 'Værktøjsvejledninger', lscene: 'Scenarievejledninger', lguide: 'Fejlfinding', lrel: 'Relaterede vejledninger', home: 'Forside', guides: 'Vejledninger' , toc: 'På denne side', upd: 'Opdateret', ctaLead: 'Det hele foregår i browseren, intet at installere.' },
  'fi': { title: 'Ohjeet ja oppaat tekstitystyökaluille – AI-SRTSub', desc: 'Kuvitellut ohjeet: miten käytät kääntäjää, muunninta, ajoituseditoria ja muita työkaluja – ja korjaat yleiset tekstitysongelmat.', h1: 'Ohjeet ja oppaat tekstitykseen', intro: 'Jokainen opas vastaa yhteen konkreettiseen tarpeeseen: työkalun käyttöön, skenaarion ratkaisuun tai ongelman korjaamiseen.', lhowto: 'Työkaluohjeet', lscene: 'Skenaario-oppaat', lguide: 'Vianetsintäoppaat', lrel: 'Aiheeseen liittyvät oppaat', home: 'Etusivu', guides: 'Oppaat' , toc: 'Tällä sivulla', upd: 'Päivitetty', ctaLead: 'Kaikki tapahtuu selaimessa, ei asennettavaa.' },
  'el': { title: 'Οδηγοί και μαθήματα για εργαλεία υπότιτλων – AI-SRTSub', desc: 'Εικονογραφημένοι οδηγοί: πώς να χρησιμοποιείτε τον μεταφραστή, τον μετατροπέα μορφών, τον επεξεργαστή συγχρονισμού και άλλα εργαλεία, και πώς να λύνετε συνηθισμένα προβλήματα υποτίτλων.', h1: 'Οδηγοί και μαθήματα υποτίτλων', intro: 'Κάθε οδηγός απαντά σε μία συγκεκριμένη ανάγκη: χρήση ενός εργαλείου, επίλυση ενός σεναρίου ή διόρθωση ενός προβλήματος.', lhowto: 'Οδηγοί εργαλείων', lscene: 'Οδηγοί σεναρίων', lguide: 'Αντιμετώπιση προβλημάτων', lrel: 'Σχετικοί οδηγοί', home: 'Αρχική', guides: 'Οδηγοί' , toc: 'Σε αυτή τη σελίδα', upd: 'Ενημερώθηκε', ctaLead: 'Όλα γίνονται στον περιηγητή, δεν χρειάζεται εγκατάσταση.' },
  'he': { title: 'מדריכים ושיעורים לכלי כתוביות – AI-SRTSub', desc: 'מדריכים מאוירים: איך משתמשים במתרגם, בממיר הפורמטים, בעורך התזמון ובשאר הכלים, ואיך פותרים בעיות כתוביות נפוצות.', h1: 'מדריכים ושיעורים לכתוביות', intro: 'כל מדריך עונה על צורך אחד מוגדר: להשתמש בכלי, לפתור תרחיש או לתקן בעיה.', lhowto: 'מדריכי כלים', lscene: 'מדריכי תרחישים', lguide: 'פתרון בעיות', lrel: 'מדריכים קשורים', home: 'דף הבית', guides: 'מדריכים' , toc: 'בעמוד זה', upd: 'עודכן', ctaLead: 'הכול מתבצע בדפדפן, אין צורך בהתקנה.' },
  'ro': { title: 'Ghiduri și tutoriale pentru instrumente de subtitrări – AI-SRTSub', desc: 'Ghiduri ilustrate: cum folosești traducătorul, convertorul de formate, editorul de sincronizare și celelalte instrumente, și cum rezolvi problemele frecvente de subtitrare.', h1: 'Ghiduri și tutoriale de subtitrări', intro: 'Fiecare ghid răspunde unei nevoi concrete: să folosești un instrument, să rezolvi un scenariu sau să corectezi o problemă.', lhowto: 'Ghiduri de instrumente', lscene: 'Ghiduri pe scenarii', lguide: 'Rezolvarea problemelor', lrel: 'Ghiduri similare', home: 'Acasă', guides: 'Ghiduri' , toc: 'Pe această pagină', upd: 'Actualizat', ctaLead: 'Totul se întâmplă în browser, nimic de instalat.' }
};
/* 语言切换下拉的 27 语原生名（与各工具页 select 同一张名单） */
const GUIDE_LANG_NAMES = [['zh-CN', '简体中文'], ['zh-TW', '繁體中文'], ['en', 'English'], ['ja', '日本語'], ['es', 'Español'], ['pt', 'Português'], ['ko', '한국어'], ['de', 'Deutsch'], ['fr', 'Français'], ['id', 'Bahasa Indonesia'], ['hi', 'हिन्दी'], ['th', 'ไทย'], ['vi', 'Tiếng Việt'], ['ru', 'Русский'], ['it', 'Italiano'], ['ar', 'العربية'], ['tr', 'Türkçe'], ['nl', 'Nederlands'], ['pl', 'Polski'], ['sv', 'Svenska'], ['cs', 'Čeština'], ['uk', 'Українська'], ['da', 'Dansk'], ['fi', 'Suomi'], ['el', 'Ελληνικά'], ['he', 'עברית'], ['ro', 'Română']];

/* 文章页 <head>：Article + BreadcrumbList（⚠️ 不上 HowTo / FAQPage，Google 已移除其富摘要） */
function guideHead(lang, base, slug) {
  const g = GUIDE_PAGES[slug];
  const s = gdSeo(g, lang);
  const selfUrl = base + guideUrl(lang, slug);
  const langs = guideLangs(g);
  const xdef = langs.indexOf('en') >= 0 ? 'en' : langs[0];
  const alternates = langs.map(function (l) {
    return '<link rel="alternate" hreflang="' + l + '" href="' + base + guideUrl(l, slug) + '">';
  }).join('\n') + '\n<link rel="alternate" hreflang="x-default" href="' + base + guideUrl(xdef, slug) + '">';
  const firstImg = (gdBody(g, lang) || []).filter(function (sec) { return sec.img && sec.img.file; })[0];
  const imgUrl = firstImg ? base + guideImgPath(firstImg.img, lang) + '.png' : base + '/og-image.png';
  const brand = (lang === 'zh-CN') ? '随心字幕 AI' : (lang === 'zh-TW') ? '隨心字幕 AI' : 'AI-SRTSub';
  const IX = GUIDE_INDEX[lang] || GUIDE_INDEX['en'];
  const article = '{\n'
    + '  "@context": "https://schema.org",\n'
    + '  "@type": "Article",\n'
    + '  "headline": ' + JSON.stringify(s.h1 || s.title) + ',\n'
    + '  "description": ' + JSON.stringify(s.desc) + ',\n'
    + '  "mainEntityOfPage": ' + JSON.stringify(selfUrl) + ',\n'
    + '  "image": ' + JSON.stringify([imgUrl]) + ',\n'
    + '  "inLanguage": ' + JSON.stringify(lang) + ',\n'
    + '  "datePublished": ' + JSON.stringify(g.date || '') + (g.date ? '' : '') + ',\n'
    + '  "dateModified": ' + JSON.stringify(g.date || '') + ',\n'
    + '  "author": { "@type": "Organization", "name": ' + JSON.stringify(brand) + ', "url": ' + JSON.stringify(base + '/') + ' },\n'
    + '  "publisher": { "@type": "Organization", "name": ' + JSON.stringify(brand) + ', "url": ' + JSON.stringify(base + '/') + ' }\n'
    + '}';
  const crumb = '{\n'
    + '  "@context": "https://schema.org",\n'
    + '  "@type": "BreadcrumbList",\n'
    + '  "itemListElement": [\n'
    + '    { "@type": "ListItem", "position": 1, "name": ' + JSON.stringify(IX.home) + ', "item": ' + JSON.stringify(base + (lang === 'zh-CN' ? '/' : '/' + lang + '/')) + ' },\n'
    + '    { "@type": "ListItem", "position": 2, "name": ' + JSON.stringify(IX.guides) + ', "item": ' + JSON.stringify(base + guideIndexUrl(lang)) + ' },\n'
    + '    { "@type": "ListItem", "position": 3, "name": ' + JSON.stringify(s.h1 || s.title) + ', "item": ' + JSON.stringify(selfUrl) + ' }\n'
    + '  ]\n'
    + '}';
  return [
    '<title>' + guideEsc(s.title) + '</title>',
    '<meta name="description" content="' + guideEsc(s.desc) + '">',
    '<meta name="robots" content="index, follow">',
    '<meta name="theme-color" content="#4F46E5">',
    '<link rel="icon" type="image/svg+xml" href="/favicon.svg">',
    '<link rel="canonical" href="' + selfUrl + '">',
    alternates,
    '<meta property="og:type" content="article">',
    '<meta property="og:title" content="' + guideEsc(s.title) + '">',
    '<meta property="og:description" content="' + guideEsc(s.desc) + '">',
    '<meta property="og:image" content="' + imgUrl + '">',
    '<meta property="og:site_name" content="' + brand + '">',
    '<meta property="og:locale" content="' + (OG_LOCALE[lang] || 'en_US') + '">',
    '<meta property="og:url" content="' + selfUrl + '">',
    '<meta name="twitter:card" content="summary_large_image">',
    '<meta name="twitter:title" content="' + guideEsc(s.title) + '">',
    '<meta name="twitter:description" content="' + guideEsc(s.desc) + '">',
    '<meta name="twitter:image" content="' + imgUrl + '">',
    '<script type="application/ld+json">\n' + article + '\n</script>',
    '<script type="application/ld+json">\n' + crumb + '\n</script>'
  ].join('\n');
}

/* 索引页 <head>：CollectionPage + 两级面包屑 */
function guideIndexHead(lang, base) {
  const IX = GUIDE_INDEX[lang] || GUIDE_INDEX['en'];
  const selfUrl = base + guideIndexUrl(lang);
  const alternates = SEO_LANGS.map(function (l) {
    return '<link rel="alternate" hreflang="' + l + '" href="' + base + guideIndexUrl(l) + '">';
  }).join('\n') + '\n<link rel="alternate" hreflang="x-default" href="' + base + guideIndexUrl('en') + '">';
  const brand = (lang === 'zh-CN') ? '随心字幕 AI' : (lang === 'zh-TW') ? '隨心字幕 AI' : 'AI-SRTSub';
  const jsonld = '{\n'
    + '  "@context": "https://schema.org",\n'
    + '  "@type": "CollectionPage",\n'
    + '  "name": ' + JSON.stringify(IX.h1) + ',\n'
    + '  "description": ' + JSON.stringify(IX.desc) + ',\n'
    + '  "url": ' + JSON.stringify(selfUrl) + ',\n'
    + '  "inLanguage": ' + JSON.stringify(lang) + '\n'
    + '}';
  const crumb = '{\n'
    + '  "@context": "https://schema.org",\n'
    + '  "@type": "BreadcrumbList",\n'
    + '  "itemListElement": [\n'
    + '    { "@type": "ListItem", "position": 1, "name": ' + JSON.stringify(IX.home) + ', "item": ' + JSON.stringify(base + (lang === 'zh-CN' ? '/' : '/' + lang + '/')) + ' },\n'
    + '    { "@type": "ListItem", "position": 2, "name": ' + JSON.stringify(IX.guides) + ', "item": ' + JSON.stringify(selfUrl) + ' }\n'
    + '  ]\n'
    + '}';
  return [
    '<title>' + guideEsc(IX.title) + '</title>',
    '<meta name="description" content="' + guideEsc(IX.desc) + '">',
    '<meta name="robots" content="index, follow">',
    '<meta name="theme-color" content="#4F46E5">',
    '<link rel="icon" type="image/svg+xml" href="/favicon.svg">',
    '<link rel="canonical" href="' + selfUrl + '">',
    alternates,
    '<meta property="og:type" content="website">',
    '<meta property="og:title" content="' + guideEsc(IX.title) + '">',
    '<meta property="og:description" content="' + guideEsc(IX.desc) + '">',
    '<meta property="og:image" content="' + base + '/og-image.png">',
    '<meta property="og:site_name" content="' + brand + '">',
    '<meta property="og:locale" content="' + (OG_LOCALE[lang] || 'en_US') + '">',
    '<meta property="og:url" content="' + selfUrl + '">',
    '<meta name="twitter:card" content="summary_large_image">',
    '<meta name="twitter:title" content="' + guideEsc(IX.title) + '">',
    '<meta name="twitter:description" content="' + guideEsc(IX.desc) + '">',
    '<meta name="twitter:image" content="' + base + '/og-image.png">',
    '<script type="application/ld+json">\n' + jsonld + '\n</script>',
    '<script type="application/ld+json">\n' + crumb + '\n</script>'
  ].join('\n');
}

/* v0.9.325：左分组导航（按 kind 三组）。文章页传当前 slug 标 aria-current，索引页传 ''。
   ⚠️ 只列「当前语言版本存在」的文章（与索引页同一判据），不给爬虫和用户看到死链 */
function guideNavHtml(lang, curSlug) {
  const IX = GUIDE_INDEX[lang] || GUIDE_INDEX['en'];
  const groups = [['howto', IX.lhowto], ['scene', IX.lscene], ['guide', IX.lguide]];
  const out = ['<p class="snav-h"><a href="' + guideIndexUrl(lang) + '">' + guideEsc(IX.guides) + '</a></p>'];
  groups.forEach(function (grp) {
    const items = Object.keys(GUIDE_PAGES).filter(function (sl) {
      const g = GUIDE_PAGES[sl];
      return g.kind === grp[0] && gdSeo(g, lang) && gdBody(g, lang);
    }).sort();
    if (!items.length) return;
    out.push('<div class="snav-grp"><h3>' + guideEsc(grp[1]) + '</h3><ul>'
      + items.map(function (sl) {
        const s = gdSeo(GUIDE_PAGES[sl], lang);
        return '<li><a href="' + guideUrl(lang, sl) + '"'
          + (sl === curSlug ? ' aria-current="page"' : '') + '>' + guideEsc(s.h1 || s.title) + '</a></li>';
      }).join('') + '</ul></div>');
  });
  return out.join('\n');
}

/* v0.9.325：右栏「本页内容」目录。锚点序号必须与 guideBodyHtml 的 h2 id 完全一致
   （两边都只给「真有 h2 的 section」计数，空标题的 section 不占位） */
function guideTocHtml(g, lang) {
  let n = 0;
  return (gdBody(g, lang) || []).filter(function (sec) { return sec.h2; }).map(function (sec) {
    n += 1;
    return '<a href="#sec' + n + '">' + guideEsc(sec.h2) + '</a>';
  }).join('');
}

/* v0.9.325：底部深色行动带（整页唯一「重物」）。文案只用既有的 ctaText + 新增的 ctaLead，
   不编流程叙事；没有 CTA 的文章（工具字段缺失）就整块不输出 */
function guideCtaHtml(g, lang) {
  const s = gdSeo(g, lang) || {};
  if (!(g.tool && s.ctaText)) return '';
  const IX = GUIDE_INDEX[lang] || GUIDE_INDEX['en'];
  return '<div class="gcta"><p>' + guideEsc(IX.ctaLead || '') + '</p>'
    + '<a class="gbtn" href="/' + g.tool + '.html">' + guideInline(s.ctaText) + '</a></div>';
}

/* v0.9.325：相关指南卡片网格（从正文里独立出来，正文只留图文，左边界才跟标题对齐） */
function guideRelHtml(g, lang) {
  if (!(g.related && g.related.length)) return '';
  const IX = GUIDE_INDEX[lang] || GUIDE_INDEX['en'];
  const lis = g.related.map(function (sl) {
    const rg = GUIDE_PAGES[sl];
    const rs = rg && gdSeo(rg, lang);
    if (!rs || !gdBody(rg, lang)) return '';
    return '<li><a href="' + guideUrl(lang, sl) + '">' + guideEsc(rs.h1 || rs.title) + '</a></li>';
  }).join('');
  if (!lis) return '';
  return '<h2 class="grelnav">' + guideEsc(IX.lrel) + '</h2><ul class="grel">' + lis + '</ul>';
}

/* 正文 → HTML：各 section（h2/ps/ul/figure）。
   ⚠️ v0.9.325 起 intro / CTA / 相关指南都不再塞进正文 —— intro 提到题头，
   CTA 变底部深色带、相关指南变卡片网格，正文左边界才与 h1 在同一条轴线上。 */
function guideBodyHtml(g, lang) {
  const out = [];
  let n = 0;
  (gdBody(g, lang) || []).forEach(function (sec) {
    if (sec.h2) { n += 1; out.push('<h2 id="sec' + n + '">' + guideInline(sec.h2) + '</h2>'); }
    (sec.ps || []).forEach(function (p) { out.push('<p>' + guideInline(p) + '</p>'); });
    if (sec.ul && sec.ul.length) {
      out.push('<ul>' + sec.ul.map(function (li) { return '<li>' + guideInline(li) + '</li>'; }).join('') + '</ul>');
    }
    if (sec.img && sec.img.file) {
      const b = guideImgPath(sec.img, lang);
      const dim = sec.img.w ? ' width="' + sec.img.w + '" height="' + sec.img.h + '"' : '';
      out.push('<figure class="gfig"><picture><source type="image/webp" srcset="' + b + '.webp"><img src="' + b + '.png" alt="' + guideEsc(sec.img.alt || '') + '" loading="lazy"' + dim + '></picture>'
        + (sec.img.cap ? '<figcaption>' + guideInline(sec.img.cap) + '</figcaption>' : '') + '</figure>');
    }
  });
  return out.join('\n');
}

/* 文章页与索引页共用的注入逻辑（读 guides.html 模板）
   v0.9.325：面包屑取消（用户定案「非常多余」），换成左分组导航 + 题头 intro/meta、
   右栏本页目录、底部深色行动带、相关指南卡片。parts 缺哪个就注空串。 */
/* v0.9.325：指南页照 Astro Starlight 重做 —— 版心 1200（左分组导航 232 + 正文 + 右「本页内容」192），
   面包屑取消，CTA 换成底部深色行动带。占位符从 5 个换成 12 个，改对象传参 parts。 */
function serveGuideHtml(req, res, lang, parts) {
  fs.readFile(path.join(ROOT, 'guides.html'), 'utf8', function (err, html) {
    if (err) { res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' }); res.end('guides.html missing'); return; }
    const base = publicBase(req) || '';
    const P = parts || {};
    const put = function (key, val) {
      const re = new RegExp('<!--GUIDE-' + key + '-START-->[\\s\\S]*?<!--GUIDE-' + key + '-END-->');
      html = html.replace(re, '<!--GUIDE-' + key + '-START-->' + (val || '') + '<!--GUIDE-' + key + '-END-->');
    };
    const put1 = function (key, val) {   /* 无 END 配对的单标记（纯占位替换） */
      html = html.replace('<!--GUIDE-' + key + '-->', val || '');
    };
    put('HEAD', P.head);
    put('H1', P.h1);
    put('INTRO', P.intro);
    put('META', P.meta);
    put('NAV', P.nav);
    put('TOCH', P.toch);
    put('TOC', P.toc);
    put('BODY', P.body);
    put('CTA', P.cta);
    put('REL', P.rel);
    put1('CLS', P.cls);   /* 唯一无 END 配对的：class 属性里的占位符 */
    /* 语言切换下拉：服务端注入 27 个 option，当前语言选中 */
    const opts = GUIDE_LANG_NAMES.map(function (p) {
      return '<option value="' + p[0] + '"' + (p[0] === lang ? ' selected' : '') + '>' + p[1] + '</option>';
    }).join('');
    html = html.replace('<!--GUIDE-LANGS-->', opts);
    html = html.replace('<html lang="zh-CN"', '<html lang="' + lang + '"' + (RTL_LANGS.indexOf(lang) >= 0 ? ' dir="rtl"' : ''));
    /* 站内链接按 URL 语言补前缀（与 serveIndexLang 同思路，模板里写的都是无前缀形态）。
       v0.9.323 挂 topnav 后多了 /guides/ 形态的链接，一并纳入改写 */
    if (lang !== 'zh-CN') {
      const lp = '/' + lang;
      html = html.replace(/href="(\/(?:guides\/[a-z0-9-]+\.html|guides\/|[a-z-]+\.html)?(?:[?#][^"]*)?)"/g, 'href="' + lp + '$1"');
    }
    const ga = (readConfig().analyticsId || '').trim();
    const gaTag = /^G-[A-Z0-9]+$/.test(ga)
      ? '<!-- Google tag (gtag.js) -->\n<script async src="https://www.googletagmanager.com/gtag/js?id=' + ga + '"></script>\n<script>\nwindow.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag(\'js\', new Date());\ngtag(\'config\', \'' + ga + '\');\n</script>'
      : '';
    html = html.replace('<!--ANALYTICS-->', gaTag);
    /* v0.9.343：页脚多语言互链（指南页版）。放在补前缀那段之后 —— 生成的是绝对 URL，
       不会被那条 href="/xxx" 的正则二次改写。 */
    if (P.langlinks) html = html.replace('</body>', P.langlinks + '\n</body>');
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-cache' });
    res.end(html);
  });
}

function serveGuide(req, res, lang, slug) {
  const g = GUIDE_PAGES[slug];
  if (!g || !gdSeo(g, lang) || !gdBody(g, lang)) {
    /* v0.9.366：这篇在该语言没有译文时，别直接 404。
       现状：44 篇里 27 个内置语齐全，73 个新语言是 43/44 —— 缺的都是
       youtube-auto-caption-sentences，合计 73 个 404，白丢一条活链接。
       英文版一定在（27 语含 en，且 seo/body 成对），先把它顶上去。
       ⚠️ 用 302 不用 301：这一条是等 73 语译文补齐的临时出口，译文一落地
          就该恢复原 URL 自己出内容。301 会被浏览器和 Google 长期缓存，
          到时候反而把修复锁死 —— 与 ?lang=xx 那条 301 的取舍不同，
          那条的终点 URL 是永久的，这条不是。 */
    if (g && lang !== 'en' && gdSeo(g, 'en') && gdBody(g, 'en')) {
      res.writeHead(302, { Location: '/en/guides/' + slug + '.html' });
      return res.end();
    }
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Not Found'); return;
  }
  const s = gdSeo(g, lang);
  const IX = GUIDE_INDEX[lang] || GUIDE_INDEX['en'];
  const base = publicBase(req) || '';
  /* meta：更新时间 + 所属分组（分组名是既有词条，按 kind 取；不编新文案） */
  const KIND_LABEL = { howto: IX.lhowto, scene: IX.lscene, guide: IX.lguide };
  const kindLabel = KIND_LABEL[g.kind] || '';
  const meta = '<span>' + guideEsc(IX.upd || '') + ' ' + guideEsc(g.date || '') + '</span>'
    + (kindLabel ? '<span>' + guideEsc(kindLabel) + '</span>' : '');
  serveGuideHtml(req, res, lang, {
    head: guideHead(lang, base, slug),
    h1: guideInline(s.h1 || s.title),
    intro: guideInline(s.intro || ''),
    meta: meta,
    nav: guideNavHtml(lang, slug),
    toch: guideEsc(IX.toc || ''),
    toc: guideTocHtml(g, lang),
    body: guideBodyHtml(g, lang),
    cta: guideCtaHtml(g, lang),
    rel: guideRelHtml(g, lang),
    /* v0.9.343：指南页同样补一层可抓取的语言互链（这篇有几种语言就列几种） */
    langlinks: guideLangLinksHtml(base, lang, slug),
    cls: ''
  });
}

function serveGuideIndex(req, res, lang) {
  const IX = GUIDE_INDEX[lang] || GUIDE_INDEX['en'];
  const base = publicBase(req) || '';
  /* 三组：工具使用说明 / 场景指南 / 问题指南。组内按字母序，只列当前语言版本存在的文章 */
  const groups = [['howto', IX.lhowto], ['scene', IX.lscene], ['guide', IX.lguide]];
  const out = [];
  groups.forEach(function (grp) {
    const items = Object.keys(GUIDE_PAGES).filter(function (sl) {
      const g = GUIDE_PAGES[sl];
      return g.kind === grp[0] && gdSeo(g, lang) && gdBody(g, lang);
    }).sort();
    if (!items.length) return;
    out.push('<section class="ggrp"><div class="ghd"><h2>' + guideEsc(grp[1]) + '</h2><em>' + items.length + '</em></div><ul class="glist">'
      + items.map(function (sl) {
        const s = gdSeo(GUIDE_PAGES[sl], lang);
        return '<li><a href="' + guideUrl(lang, sl) + '"><b>' + guideEsc(s.h1 || s.title) + '</b>'
          + '<span>' + guideEsc(s.intro || s.desc) + '</span></a></li>';
      }).join('') + '</ul></section>');
  });
  serveGuideHtml(req, res, lang, {
    head: guideIndexHead(lang, base),
    h1: guideEsc(IX.h1),
    intro: guideInline(IX.intro || ''),
    /* 索引页的篇数已经逐组标了胶囊，题头不再重复一个裸数字（.ameta:empty 会自己收掉） */
    meta: '',
    nav: guideNavHtml(lang, ''),
    /* 索引页没有正文小节 → 右栏「本页内容」整块收掉（cls=gidx），正文占满整行 */
    toch: '', toc: '', body: out.join('\n'), cta: '', rel: '', cls: ' gidx'
  });
}

function proto(req){
  const h = (req.headers['x-forwarded-proto'] || '').split(',')[0].trim();
  return (h || 'http') + '://';
}
// 站公共访问基址：优先级 PUBLIC_URL env > X-Forwarded-* > Host 头
// 用于 robots.txt / sitemap.xml / OG canonical——保证搜索引擎拿到的是用户真实可访问的域名
function publicBase(req){
  const env = (process.env.PUBLIC_URL || '').trim().replace(/\/+$/,'');
  if (env) return env;
  const cfgUrl = (readConfig().publicUrl || '').trim().replace(/\/+$/,'');
  if (cfgUrl) return cfgUrl;
  const xfHost = (req.headers['x-forwarded-host'] || '').split(',')[0].trim();
  const host = xfHost || ((req.headers.host || '').split(',')[0].trim());
  if (!host) return '';
  return proto(req) + host;
}

/* ---------------- 模型转发 ---------------- */
/* 附加请求参数白名单化处理：只接受平铺的 string/number/boolean，
   且禁止覆盖核心字段（否则会打乱模型名/正文/流式与事件记录）。
   非对象、非 JSON 字符串、数组一律回落 {}。 */
const PARAM_RESERVED = ['model', 'messages', 'stream', 'temperature', 'max_tokens'];
/* v0.9.132：response_format 默认注入的白名单（与前端 index.html 的 RF_SUPPORT 逐项保持一致）。
   实测 api.deepseek.com / deepseek-chat（2026-09-20，真 key）：
     带 response_format 且 prompt 含 JSON 字样   → 200
     带 response_format 但 prompt 不含 json 字样 → 400 "Prompt must contain the word 'json'
                                                    in some form to use 'response_format' of type 'json_object'."
   ⚠️ 所以只给「前端显式声明要 JSON 输出」的请求注入（前端通过 meta.json 传意图）；
      像「回复 OK」这种非 JSON 请求一旦被注入会直接 400。
   未知端点一律不注入（未知 API 表面不猜）；Anthropic / Gemini 原生端点无此字段，显式排除。 */
const RF_SUPPORT = [
  /api\.deepseek\.com/i,
  /api\.openai\.com/i,
  /api\.moonshot\.(cn|ai)/i,
  /dashscope[a-z\-]*\.aliyuncs\.com/i,
  /open\.bigmodel\.cn/i,
  /api\.z\.ai/i,
  /api\.siliconflow\.(cn|com)/i,
  /openrouter\.ai/i,
  /api\.groq\.com/i,
  /api\.together\.xyz/i,
  /api\.x\.ai/i,
  /localhost/i, /127\.0\.0\.1/i, /\[::1\]/i
];
const RF_DENY = [
  /anthropic\.com/i,
  /generativelanguage\.googleapis\.com/i
];
function rfSupported(base){
  try{
    const b = String(base || '');
    if (!b) return false;
    for (const re of RF_DENY) if (re.test(b)) return false;
    for (const re of RF_SUPPORT) if (re.test(b)) return true;
    return false;
  }catch(e){ return false; }
}
function normParams(v){
  if (v == null) return {};
  if (typeof v === 'string') {
    const t = v.trim();
    if (!t) return {};
    try { v = JSON.parse(t); } catch (e) { return {}; }
  }
  if (!v || typeof v !== 'object' || Array.isArray(v)) return {};
  /* v0.9.210：允许嵌套对象 / 数组（递归清洗），不再只收平铺标量。
     旧版只认 string/number/boolean —— 于是 OpenRouter 这类「值是对象」的参数
     （例：{"provider":{"sort":"price","allow_fallbacks":true}}）会被整条静默丢掉，
     后台保存后输入框回显为空，用户以为「没保存」，而请求里也真的没带上它。
     ⚠️ 保留键（model/messages/stream/temperature/max_tokens）只在顶层拦截 ——
        那是用来防止覆盖核心字段的；嵌套层里同名是人家自己的结构，不能拦。
     深度封顶 4 层 + 只留标量叶子，避免把超大结构写进配置并被塞进每个请求体。 */
  const MAX_DEPTH = 4;
  const walk = (node, depth) => {
    if (depth > MAX_DEPTH) return undefined;
    if (node === null) return null;
    const t = typeof node;
    if (t === 'string' || t === 'number' || t === 'boolean') return node;
    if (Array.isArray(node)) {
      const arr = [];
      for (const it of node) { const x = walk(it, depth + 1); if (x !== undefined) arr.push(x); }
      return arr;
    }
    if (t === 'object') {
      const o = {};
      for (const k of Object.keys(node)) {
        if (depth === 0 && PARAM_RESERVED.indexOf(k) >= 0) continue;
        const x = walk(node[k], depth + 1);
        if (x !== undefined) o[k] = x;
      }
      return o;
    }
    return undefined;
  };
  return walk(v, 0) || {};
}
/* 附加参数合并到请求体：附加项不覆盖核心字段（core 后写，始终胜出） */
function withExtra(core, extra){
  if (!extra || typeof extra !== 'object') return core;
  const body = Object.assign({}, extra, core);
  return body;
}
/* 槽位是否配全（缺任一项即视为未启用）。A 是兜底槽，永不参与「未启用」判断。
   v0.9.193：B/C 同构，故抽成通用函数；modelBReady 保留为别名，别处的引用不用改。 */
function slotReady(cfg, which){
  if (which === 'B') return !!(cfg.base2 && cfg.model2 && cfg.key2);
  if (which === 'C') return !!(cfg.base3 && cfg.model3 && cfg.key3);
  /* v0.9.350：E 与 A/B/C 同构，三项配全即启用（独占、限流另算，见 ePick） */
  if (which === 'E') return !!(cfg.base5 && cfg.model5 && cfg.key5);
  /* v0.9.345：D 的「配全」= base + 至少一把 key 配了至少一档启用的模型。
     v0.9.361：模型挂在 key 下面，dSlots 已经把「没 key / 停用 / 没有可用模型」的槽滤掉了。 */
  if (which === 'D') return !!(cfg.base4 && dSlots(cfg).length);
  return false;
}
function modelBReady(cfg){ return slotReady(cfg, 'B'); }
function modelCReady(cfg){ return slotReady(cfg, 'C'); }
/* 取出某个模型槽位的完整调用配置（A / B / C 共用 temperature） */
function slotCfg(cfg, which){
  if (which === 'B') return { base: cfg.base2, model: cfg.model2, key: cfg.key2, temperature: cfg.temperature, extraParams: cfg.extraParams2 };
  if (which === 'C') return { base: cfg.base3, model: cfg.model3, key: cfg.key3, temperature: cfg.temperature, extraParams: cfg.extraParams3 };
  /* v0.9.350：E 也是固定一组 base/model/key —— 直接复用 callModel，不需要单独一套调用路径 */
  if (which === 'E') return { base: cfg.base5, model: cfg.model5, key: cfg.key5, temperature: cfg.temperature, extraParams: cfg.extraParams5 };
  return { base: cfg.base,  model: cfg.model,  key: cfg.key,  temperature: cfg.temperature, extraParams: cfg.extraParams };
}
/* v0.9.345：D 槽的调用配置。key 由 dPick 现选、模型由模型池现挑（都不像 A/B/C 是固定一个），
   故单列一个函数、不塞进 slotCfg —— slotCfg(cfg,'D') 没有确定的 key/model，塞进去只会让人误用。 */
function slotCfgD(cfg, key, model){
  return { base: cfg.base4, model: model, key: key, temperature: cfg.temperature, extraParams: cfg.extraParams4 };
}
/* v0.9.193：按目标语言分流，优先级 C > B > A。
   先查 langModelC（C 配全才作数）→ 再查 langModelB → 否则 A。
   ⚠️ 只有 C 明确列出的语言才走 C；C 没列出的语言照旧走 B，互不挤占。 */
function pickModel(cfg, lang){
  const lg = String(lang || '');
  if (slotReady(cfg, 'C') && Array.isArray(cfg.langModelC) && cfg.langModelC.indexOf(lg) >= 0) {
    return { which: 'C', cfg: slotCfg(cfg, 'C') };
  }
  if (slotReady(cfg, 'B') && Array.isArray(cfg.langModelB) && cfg.langModelB.indexOf(lg) >= 0) {
    return { which: 'B', cfg: slotCfg(cfg, 'B') };
  }
  return { which: 'A', cfg: slotCfg(cfg, 'A') };
}
/* v0.9.193：回退链。C → B → A，B → A，A 是终点（它自己失败就真的失败了）。
   前一级没配全就直接跳过（比如 C 挂了但 B 压根没配 → 直接退 A）。 */
function fallbackChain(cfg, which, lang){
  /* v0.9.345：D 耗尽/失败 → C → B → A。这里比 C/B 多一步语言过滤：
     D 是「全部语言」的槽，落到 C/B 时必须尊重它们各自的分流勾选，
     否则没勾给 C 的语言会被硬塞过去 —— C 的勾选是我们自己定的规则，不该被 D 绕过。 */
  if (which === 'D') {
    const lg = String(lang || '');
    const out = [];
    if (slotReady(cfg, 'C') && (!lg || (Array.isArray(cfg.langModelC) && cfg.langModelC.indexOf(lg) >= 0))) out.push('C');
    if (slotReady(cfg, 'B') && (!lg || (Array.isArray(cfg.langModelB) && cfg.langModelB.indexOf(lg) >= 0))) out.push('B');
    out.push('A');
    return out;
  }
  if (which === 'C') return [slotReady(cfg, 'B') ? 'B' : null, 'A'].filter(Boolean);
  if (which === 'B') return ['A'];
  /* v0.9.350：E 失败 → C → B → A。与 D 同一条规矩：C/B 的勾选是我们自己定的分流规则，
     E 落下来也必须尊重，不能把没勾给 C 的语言硬塞过去。
     ⚠️ 不把 D 放进这条链：D 的 key/模型是调用时现选的，slotCfg 给不出确定的一份。
        本批由 C/B/A 兜住，下一批起任务已标成 on=-1，自然会走 D。 */
  if (which === 'E') {
    const lg = String(lang || '');
    const out = [];
    if (slotReady(cfg, 'C') && (!lg || (Array.isArray(cfg.langModelC) && cfg.langModelC.indexOf(lg) >= 0))) out.push('C');
    if (slotReady(cfg, 'B') && (!lg || (Array.isArray(cfg.langModelB) && cfg.langModelB.indexOf(lg) >= 0))) out.push('B');
    out.push('A');
    return out;
  }
  return [];
}

/* ---------------- v0.9.345：模型 D · Gemini 免费额度池 ----------------
   为什么另起一套账本：A/B/C 的额度是 token（TPM），按滑窗估算；Gemini 免费层的额度是
   **请求次数**（RPM / RPD）。用 token 账本管它两头都不对——3000 字符的批次会被当成几千
   token 去排队（白白拖慢），而按 token 算「还够」的时候请求数早就超了（直接 429）。

   轮换规则（用户 2026-10-20 定案）：
   · RPD 打满 → 该 key 当天退役，按顺序用下一个
   · RPM 打满 → 只是这一分钟，**跳过它用下一个**，不退役
   · 三个 key 的 RPM 都满、RPD 还有 → 回 {wait}，等几十秒重发同一批，**不降级**
     （免费额度一分钟后就回来，降到 C/B/A 等于白扔）
   · 三个 key 的 RPD 都满 → 抛 _dExhausted，交给 C → B → A

   计数一律在「选 key 那一刻预扣」：并发请求必须看见彼此，否则三个请求同时看到
   1499/1500 一起放行，一起撞 429。预扣后请求失败（非额度类错误）不退回 ——
   宁可多算一次，也不能超发；多算的代价只是提前几分钟下班。
   ⚠️ 账本索引用 keys4 的**原始下标**，不是过滤空 key 后的下标：
      否则用户在后台清空 Key 2，Key 3 的用量会错记到 Key 2 头上。 */
const DQUOTA_PATH = path.join(DATA_DIR, 'gemini-quota.json');
const D_RPM_WIN   = 60000;          // RPM 滑窗长度
const D_RPM       = Object.create(null);   // 'key下标|模型名' -> [时间戳…]（内存，重启清零可接受）
const D_TASK      = new Map();      // taskId -> {slot:'D'|'X', model, at} 整集锁 + 档位粘性
const D_TASK_TTL  = 6 * 3600 * 1000;
/* v0.9.348：档位认领表 —— 模型名 -> {task, at}。
   用户 10-20 定案：按「模型档」认领，不是按整个 D 槽认领。3 档就能同时服务 3 个任务，
   各占一档、互不抢 RPM；整槽独占是反的（1 个任务就把三档全占了，后面的人全被赶去 C/B/A）。
   at = 最后活跃时间。超过 D_TIER_TTL 就允许别人接手 —— 前端没有「任务结束」信号，
   只能靠这个阈值判断它是跑完了还是卡死了。3 分钟是排队预算（90 秒）的两倍余量，
   不会把「正在老实排队」的任务误判成结束。 */
const D_TIER_OWN  = new Map();
const D_TIER_TTL  = 3 * 60 * 1000;
/* v0.9.351：估批数不再一律 ÷45。
   前端只有 ja / nl / sv / zh-CN / zh-TW 是 45 条一批，其余语言都是 60 条 ——
   10-21 00:43 那集 1948 条的波斯语，真实要 33 批，按 45 估成 44 批，而该档当日
   只剩 42 次，差 2 次就被判「这一集在 D 里跑不完」整集扔给 B。 */
const D_CUE_CAP_CJK = 45;           // 与前端 CUE_CAP_BY_LANG 一致（ja/nl/sv/zh-CN/zh-TW）
const D_CUE_CAP     = 60;           // 前端默认值（其余语言）
/* 同一个人刷新/重开页面时，旧任务的认领还在（刷新瞬间 finally 里的 model-done 发不出去），
   要等 3 分钟才过期 —— 这段时间新任务被挤去 B，然后旧认领一过期又跳回 D，来回抖。
   v0.9.351：IP + 目标语言 + 字幕条数三项全同、且旧认领已静默 20 秒 → 认定为同一人重开，
   直接把认领接过来，不必等满 3 分钟。20 秒是「排队一次最长 60 秒」的三分之一，
   正常在跑的任务每批都会续约，不会静默这么久。测试可用环境变量缩短。 */
const D_TAKEOVER_MS = Math.max(1000, Number(process.env.D_TAKEOVER_MS) || 20 * 1000);
let D_TAKEOVER_N = 0;               // 接手次数（进程内累计，重启清零；只给后台看）
function dCueCap(lang){
  const L = String(lang || '');
  return (L === 'ja' || L === 'nl' || L === 'sv' || L === 'zh-CN' || L === 'zh-TW') ? D_CUE_CAP_CJK : D_CUE_CAP;
}
const D_MAX_MODELS = 6;             // 模型池上限。再多后台表格就看不清了，也没有实际收益

/* 太平洋时间日期串（YYYY-MM-DD）。Gemini 免费额度按 PT 午夜重置，用本地日期会在
   北京时间下午三点前后错位一天 —— 那正好是国内用户最活跃的时段。 */
function ptDateStr(){
  try {
    return new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Los_Angeles',
      year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
  } catch (e) { return todayStr(); }
}
/* keys4 → [{i, key}]，i 是原始下标（账本用） */
function dKeyList(cfg){
  const arr = (cfg && Array.isArray(cfg.keys4)) ? cfg.keys4 : [];
  const out = [];
  for (let i = 0; i < arr.length && i < 3; i++) {
    const k = String(arr[i] == null ? '' : arr[i]).trim();
    if (k) out.push({ i: i, key: k });
  }
  return out;
}
/* dKeys 保留成「只看数量」的简写，slotReady / 报错文案用它 */
function dKeys(cfg){ return dKeyList(cfg).map(x => x.key); }

/* ---------------- v0.9.347：模型池 ----------------
   背景：Gemini 免费层的额度是**每个模型各自独立**的（同一项目里 Flash 和 Flash-Lite
   各算各的 RPD）。所以「加一档模型」等于「多加一份免费额度」—— 这是唯一不花钱、
   又能实打实提高免费请求总量的办法（合并批次也能省请求数，但那个动的是翻译主链路）。

   v0.9.361：模型不再是全局池，而是挂在每把 key 下面（见 keyModels4 的注释）。
   下面这几个函数是唯一的读配置入口，调度、状态面板、保存校验都走它们，
   别在别处直接读 cfg.keyModels4 —— 老配置（只有 models4）要靠这里摊平。 */
function dNormModels(arr){
  const out = [];
  if (!Array.isArray(arr)) return out;
  for (const m of arr) {
    if (!m || typeof m !== 'object') continue;
    const name = String(m.name == null ? '' : m.name).trim().slice(0, 64);
    if (!name) continue;
    out.push({
      name: name,
      rpm: Math.max(1, Math.min(600, Math.floor(+m.rpm || 15))),
      rpd: Math.max(1, Math.min(1000000, Math.floor(+m.rpd || 1500))),
      on: m.on !== false
    });
    if (out.length >= D_MAX_MODELS) break;
  }
  return out;
}
/* 老的单模型 / 全局模型池（models4）。老配置兼容：models4 为空时把 model4 当成一档。 */
function dModelsRaw(cfg){
  const out = dNormModels((cfg && Array.isArray(cfg.models4)) ? cfg.models4 : []);
  if (!out.length && String((cfg && cfg.model4) || '').trim()) {
    out.push({ name: String(cfg.model4).trim().slice(0, 64),
      rpm: Math.max(1, Math.min(600, Math.floor(+cfg.rpmD || 15))),
      rpd: Math.max(1, Math.min(1000000, Math.floor(+cfg.rpdD || 1500))), on: true });
  }
  return out;
}
/* 三把 key 的模型配置，固定 3 项、下标与 keys4 对齐。
   ⚠️ 老配置（keyModels4 完全没有）→ 每把 key 都挂同一份 models4。
      这样升级当天不用重填，行为和升级前完全一致（都是「每把 key 都有这几档」）；
      区别只是调度顺序从「跨 key 先横着换」变成「一把一把用干净」。
   ⚠️ keyModels4 存在但某一项缺 models → 就是空的（用户在后台真的清空了），不要拿 legacy 兜底，
      否则删掉的档会自己长回来。 */
function dSlotsRaw(cfg){
  const arr = (cfg && Array.isArray(cfg.keyModels4)) ? cfg.keyModels4 : [];
  const legacy = dModelsRaw(cfg);
  const out = [];
  for (let i = 0; i < 3; i++) {
    const src = arr[i] && typeof arr[i] === 'object' ? arr[i] : null;
    let models;
    if (src && Array.isArray(src.models)) models = dNormModels(src.models);
    else if (!arr.length) {
      /* 老配置摊平：只给**有 key** 的槽挂上模型 —— 没配 key 的槽留空表，
         否则后台会出现「未设置的 Key 3 里挂着两档模型」这种看不懂的画面。 */
      const hasKey = String(((cfg && Array.isArray(cfg.keys4)) ? cfg.keys4[i] : '') || '').trim();
      models = hasKey ? legacy.map(m => Object.assign({}, m)) : [];
    }
    else models = [];
    out.push({
      i: i,
      label: String((src && src.label) || '').trim().slice(0, 24),
      on: src ? src.on !== false : true,
      models: models
    });
  }
  return out;
}
/* 参与调度的 key 槽：有 key、没被停用、至少一档启用的模型。顺序 = key 顺序。 */
function dSlots(cfg){
  const keys = dKeyList(cfg);
  const out = [];
  for (const s of dSlotsRaw(cfg)) {
    const k = keys.find(x => x.i === s.i);
    if (!k || !s.on) continue;
    const ms = s.models.filter(m => m.on && m.name);
    if (!ms.length) continue;
    out.push({ i: s.i, key: k.key, label: s.label, models: ms });
  }
  return out;
}
/* 某把 key 的全部模型（含停用档）—— 清用量 / 判 key 死要用它，
   否则停用档上留着的旧用量永远清不掉。 */
function dSlotModelsAll(cfg, i){
  const s = dSlotsRaw(cfg).find(x => x.i === i);
  return s ? s.models : [];
}
/* 跨 key 去重后的模型列表（顺序：先按第一个出现的 key 排，再补后面 key 独有的）。
   只给状态面板的「每档合计」用；调度不再用它 —— 调度走 dCellList。 */
function dModels(cfg){
  const seen = Object.create(null), out = [];
  for (const s of dSlotsRaw(cfg)) {
    for (const m of s.models) {
      if (!m.on || !m.name || seen[m.name]) continue;
      seen[m.name] = 1;
      out.push(m);
    }
  }
  return out;
}

/* 账本单元 = (key 下标, 模型名)。用模型名而不是数组下标当键，是因为后台可以上移下移
   调整顺序 —— 用下标的话，调一次顺序昨天的用量就记到别的模型头上了。
   ⚠️ 老版本（345/346）的账本是 q.keys[i]（按 key 记、只有单模型）。升级当天那份用量
      不会被继承（cells 里没有对应单元），当天会多放一截流量；第二天自然对齐。
      生产环境升级时 D 槽还没有 key，实际影响为零。 */
function dCellKey(i, model){ return i + '|' + model; }
function dRead(){
  try {
    const q = JSON.parse(fs.readFileSync(DQUOTA_PATH, 'utf8'));
    if (q && q.date === ptDateStr()) {
      if (!q.cells || typeof q.cells !== 'object' || Array.isArray(q.cells)) q.cells = {};
      return q;
    }
  } catch (e) {}
  return { date: ptDateStr(), cells: {} };
}
function dWrite(q){
  try { fs.writeFileSync(DQUOTA_PATH, JSON.stringify(q), 'utf8'); } catch (e) {}
}
function dCell(q, i, model){
  const k = dCellKey(i, model);
  if (!q.cells[k]) q.cells[k] = { used: 0, ex: 0, cool: 0, err: '' };
  return q.cells[k];
}
function dRpmKey(i, model){ return i + '|' + model; }
function dRpmUsed(i, model){
  const k = dRpmKey(i, model);
  const arr = D_RPM[k] || (D_RPM[k] = []);
  const cut = Date.now() - D_RPM_WIN;
  while (arr.length && arr[0] < cut) arr.shift();
  return arr.length;
}
function dRpmWait(i, model){
  const arr = D_RPM[dRpmKey(i, model)] || [];
  if (!arr.length) return 0;
  return Math.max(1, Math.ceil((arr[0] + D_RPM_WIN - Date.now()) / 1000));
}

/* ---------------- v0.9.346：整槽「每小时 N 次」流量闸 ----------------
   用户 10-20 拍板：不要那套按太平洋时间算比例的算法，就要后台一个数好调。
   所以这里只做一件事 —— 每小时往桶里补 N 个名额，桶空了就走 C/B/A。

   为什么是令牌桶，不是「整点清零的计数器」：
   · 整点清零会在 59 分和 00 分各放行 N 次，一瞬间 2N，正是要避免的猛冲；
   · 桶按小时匀速滴水，**用不完的会攒着**（最多攒 3 小时）。
     深夜没人用，额度就攒到白天高峰 —— 用户要的「别上午就见底」和
     「把额度留给高峰」其实是同一件事，一个桶就都解决了。
   语义：cap 是「每小时补多少」，不是「每小时只能发多少」；上限是 3×cap。

   ⚠️ 桶与每个 key 的 RPD 是两套独立约束，取小的那个生效：
      桶管节奏（用户可控），RPD 管 Google 那边的硬顶（不可超）。
   ⚠️ 桶在内存里结算、由调用方 dWrite 落盘。dPeek 只读不写，别在探测里改文件。 */
const D_BURST_H = 3;                // 最多攒 3 小时的量，防止攒够了一次性倾泻
const D_HIT     = [];               // 池级时间戳，只用于后台显示「近 60 分钟已发」

function dHourly(cfg){ return Math.max(0, Math.floor(+cfg.hourlyD || 0)); }
function dHourUsed(){
  const cut = Date.now() - D_RPM_WIN;
  while (D_HIT.length && D_HIT[0] < cut) D_HIT.shift();
  return D_HIT.length;
}
/* 取桶并结算到此刻。cap = 0 时返回 null（表示不限，调用方一律当作「有额度」） */
function dBucket(q, cfg){
  const cap = dHourly(cfg);
  if (!cap) return null;
  const now = Date.now();
  const b = (q.bucket && typeof q.bucket === 'object') ? q.bucket : null;
  if (!b) { q.bucket = { at: now, tokens: cap }; return q.bucket; }  // 当天第一次：先给满一小时
  const dt = Math.max(0, now - (+b.at || now));
  let tok = Math.max(0, +b.tokens || 0) + cap * dt / 3600000;
  const ceil = cap * D_BURST_H;
  b.tokens = tok > ceil ? ceil : tok;
  b.at = now;
  return b;
}
/* 选路用的候选单元，按「key 从上到下、key 内的模型也从上到下」排好：
       Key1·模型1 → Key1·模型2 → Key2·模型1 → Key2·模型2 → …
   v0.9.361 改的就是这两层循环的顺序。原来外层是模型、内层是 key（同样模型先跨 key 横着换），
   现在外层是 key —— 用户 2026-10-22 定案：一把 key 就是一个项目，先把一个项目用干净，
   再动下一个。
   prefer 是整集锁记下的格子（'key下标|模型名'）：上一批用的那一格先试，其余保持原顺序。
   只把锁定的那格提到最前，不重排整个池 —— 一集里不要因为「锁的格暂时 RPM 满」就跳到别的模型。
   dPeek 与 dPick 必须共用这一份顺序，否则「探到的」和「扣掉的」不是同一格。 */
function dCellList(cfg, prefer){
  const out = [];
  for (const s of dSlots(cfg)) {
    for (const m of s.models) {
      out.push({ i: s.i, key: s.key, model: m.name, rpm: m.rpm, rpd: m.rpd,
        cell: dCellKey(s.i, m.name) });
    }
  }
  if (!prefer) return out;
  const pi = out.findIndex(c => c.cell === prefer);
  if (pi <= 0) return out;
  const one = out.splice(pi, 1)[0];
  out.unshift(one);
  return out;
}
/* 该单元今天还能不能用（ex=当日报废；used 到 RPD 也算报废） */
function dCellDead(st, rpd){ return !!(st.ex || (st.used || 0) >= rpd); }

/* 今日还能发多少次（每把 key × 它自己的模型，逐格加总）。整集锁 D 用它判断「够不够跑完这一集」。
   v0.9.361：只算真实存在的格子 —— 某把 key 没挂的模型不再凭空多出一份额度。 */
function dRemain(cfg, q0){
  const q = q0 || dRead();
  let n = 0;
  for (const c of dCellList(cfg, '')) {
    const st = q.cells[dCellKey(c.i, c.model)] || {};
    if (st.ex) continue;
    n += Math.max(0, c.rpd - (st.used || 0));
  }
  return n;
}
/* v0.9.361：某把 key 此刻能不能接一个新任务，能就返回该 key 下第一个可用的模型名。
   ① 这把 key 的**日剩余合计** ≥ 本集估算批数 —— 按 key 合计，不按单档：
      同一把 key 的额度是同一个项目给的，模型之间换档是允许的，只要总量够跑完。
      按单档判会把「模型1剩 10、模型2剩 400」的 key 整把跳过，白白让给下一个项目。
   ② 至少一档还有本分钟名额（RPM 未满、不在 429 冷静期）。
   ③ 没被别的活跃任务认领（认领判断在 dTaskSlot 里做，这里只管额度与速率）。
   用户 10-20 定案：分配阶段发现档被占就整集交给 C/B/A，不排队等 ——
   任务还没开始，等一分钟纯属白拖；等待只留给「已经分到这一档、中途撞限速」的情况。 */
function dSlotReady(cfg, s, need, q0){
  const q = q0 || dRead();
  const now = Date.now();
  let day = 0;
  for (const m of s.models) {
    const st = q.cells[dCellKey(s.i, m.name)] || {};
    if (st.ex) continue;
    day += Math.max(0, m.rpd - (st.used || 0));
  }
  if (day < Math.max(1, need)) return [];
  const out = [];
  for (const m of s.models) {
    const st = q.cells[dCellKey(s.i, m.name)] || {};
    if (dCellDead(st, m.rpd)) continue;
    if ((+st.cool || 0) > now) continue;
    if (dRpmUsed(s.i, m.name) < m.rpm) out.push(m);
  }
  return out;
}
/* 后台展示：整槽视角的额度面板（每个 key 的明细走 dKeyStatus）。
   v0.9.361：多一层 key 汇总 —— 后台要能一眼看出「Key 1 今天用了多少 / 还剩多少」，
   这正是改成 key 优先之后最需要的那个数。
   ⚠️ 容量的口径必须和 dRemain 完全一致：都只算**能真派出去的格子**
      （有 key + 槽没停用 + 这一档也没停用）。后台那行「今日 used / cap」是用
      cap − dailyRemain 反算 used 的（见 admin.html renderDPool），
      一旦 cap 把「没配 key 的位置」或「停用档」算进去，used 会跟着虚高 ——
      少挂一把 key 就凭空多出几百次「已用」，比不显示更糟。 */
function dPoolStatus(cfg){
  const q = dRead();
  const cap = dHourly(cfg);
  const b = dBucket(q, cfg);
  const keys = dKeyList(cfg);
  const byName = Object.create(null), order = [], keyRows = [];
  for (const s of dSlotsRaw(cfg)) {
    const set = !!keys.find(k => k.i === s.i);
    const live = s.models.filter(m => m.on && m.name);      // 真正占额度的档
    const ready = set && s.on && live.length > 0;           // 真会被调度的 key
    let used = 0, sum = 0, allCap = 0, dead = 0, err = '';
    const models = [];
    for (const m of s.models) {
      const st = q.cells[dCellKey(s.i, m.name)] || {};
      const on = m.on !== false;
      allCap += m.rpd;
      if (on) { used += (st.used || 0); sum += m.rpd; }
      /* v0.9.361：这里的 ex 是「后台徽章用的到限」，口径含 used>=rpd（不是只有 429 才算）。
         新结构按 key 合计判额度，用量走到 rpd 就直接跳过、根本不会去撞 429，
         只看 st.ex 会让「已经用满 900/900」的 key 一直显示正常。 */
      if (on && dCellDead(st, m.rpd)) { dead++; if (!err && st.ex) err = st.err || ''; }
      models.push({ name: m.name, rpm: m.rpm, rpd: m.rpd, used: st.used || 0, ex: st.ex || 0, on: on });
      if (on && ready) {
        if (!byName[m.name]) {
          byName[m.name] = { name: m.name, rpm: m.rpm, rpd: m.rpd, cap: 0, used: 0, ex: 0 };
          order.push(m.name);
        }
        byName[m.name].cap += m.rpd;
        byName[m.name].used += (st.used || 0);
        if (dCellDead(st, m.rpd)) byName[m.name].ex = 1;
      }
    }
    keyRows.push({
      i: s.i, label: s.label, on: s.on, set: set, ready: ready,
      used: used, cap: ready ? sum : 0, capAll: allCap,   // cap 才是算进日容量的那份
      ex: (live.length && dead === live.length) ? 1 : 0,
      err: err, models: models
    });
  }
  const ms = order.map(n => byName[n]);
  return {
    hourly: cap,                                  // 0 = 不限
    tokens: b ? Math.floor(b.tokens) : 0,         // 现在能发几次
    max: cap ? cap * D_BURST_H : 0,               // 桶的上限（攒满 3 小时）
    over: (+q.over || 0),                         // v0.9.349：今日超桶放行的请求数
    takeovers: D_TAKEOVER_N,                      // v0.9.351：同人重开直接接手的次数（内存计数）
    hourUsed: dHourUsed(),                        // 近 60 分钟已发
    models: ms,                                   // 每档模型的今日合计（跨 key，只算参与调度的）
    keyCount: keyRows.filter(k => k.ready).length,
    keys: keyRows,                                // v0.9.361：每把 key 的合计与明细（固定 3 项，没配的也在）
    modelCount: ms.length,
    dailyCap: keyRows.reduce((s, k) => s + k.cap, 0),  // 全池日容量 = dCellList 的 RPD 之和
    dailyRemain: dRemain(cfg, q),
    date: ptDateStr()
  };
}
/* 后台展示用：每个 key 的掩码 + 今日用量 + 状态。明文一律不回传（与 A/B/C 的 keyMask 同规矩）。
   固定返回 3 项：输入框是固定三个，没配的位置也要能显示「未设置」。
   v0.9.361：用量只算**这把 key 自己挂的模型**；ex 改成「该 key 的所有档都到限」才置 1 ——
   一档用满不等于整把 key 用满，原来的语义在新结构下会把「还有别的档能用」的 key 显示成耗尽。
   注意这里「到限」= dCellDead（429 报废 **或** used>=rpd）：新结构按 key 合计判额度，
   用到 rpd 就直接跳过、不会再去撞 429，光看 st.ex 会让用满的 key 一直显示绿色。
   v0.9.361：合计的 used / rpd 跟着「启用的档」走，与 dPoolStatus.dailyCap 同一口径 ——
   停用一档就等于这份额度不用了，卡片上的分母要立刻变小，否则三张卡的合计对不上整槽那行。 */
function dKeyStatus(cfg){
  const q = dRead();
  const arr = (cfg && Array.isArray(cfg.keys4)) ? cfg.keys4 : [];
  const slots = dSlotsRaw(cfg);
  const out = [];
  for (let i = 0; i < 3; i++) {
    const raw = String(arr[i] == null ? '' : arr[i]).trim();
    const s = slots.find(x => x.i === i) || { label: '', on: true, models: [] };
    let used = 0, cap = 0, dead = 0, err = '', rpmUsed = 0, rpm = 0, live = 0;
    const cells = [];
    for (const m of s.models) {
      const st = q.cells[dCellKey(i, m.name)] || {};
      const on = m.on !== false;
      if (on) {
        live++;
        used += (st.used || 0);
        cap += m.rpd;
        /* 到限（429 报废 或 used>=rpd）都算这一档用完；err 只在真被上游拒时才有 */
        if (dCellDead(st, m.rpd)) { dead++; if (!err && st.ex) err = st.err || ''; }
        const ru = dRpmUsed(i, m.name);
        if (ru > rpmUsed) rpmUsed = ru;
        if (!rpm || m.rpm < rpm) rpm = m.rpm;
      }
      cells.push({ model: m.name, used: st.used || 0, rpd: m.rpd, ex: st.ex || 0, rpm: m.rpm, on: on });
    }
    out.push({ i: i, set: !!raw, label: s.label, on: s.on,
      ready: !!raw && s.on && live > 0,          // 后台据此决定「正常 / 无可用模型」
      mask: raw ? (raw.slice(0, 5) + '…' + raw.slice(-4)) : '',
      used: used, rpd: cap,
      ex: (live && dead === live) ? 1 : 0,
      err: err, rpmUsed: rpmUsed, rpm: rpm || 15, cells: cells });
  }
  return out;
}
/* v0.9.348：把候选单元分成「锁定档」和「其余档」两组。
   锁档组里只要还有未报废的单元，就只在这一组里找 —— RPM 满就回 wait，**不往下走**
   （用户 10-20 定案：模型分给这个任务了，就按它的限速慢慢发，别中途换）。
   锁档组当天真的全耗尽了（live=0），才允许用其余档 —— 同槽换档总比掉到 C/B/A 好，
   而且那是唯一的活路：不换就只能整集换供应商，语气跳得更大。 */
function dCellSplit(cfg, prefer){
  const cells = dCellList(cfg, prefer);
  if (!prefer) return { locked: [], rest: cells };
  const locked = [], rest = [];
  for (const c of cells) (c.cell === prefer ? locked : rest).push(c);
  return { locked: locked, rest: rest };
}
/* 扫一组单元，找第一个「今天没报废 + 本分钟有名额」的。只读，不扣。
   返回 {ok:单元} / {live, wait}：live=0 表示这组今天真的没了；live>0 表示只是这一分钟满。 */
function dScanCells(q, arr, now){
  let live = 0, wait = 0;
  for (const c of arr) {
    const st = q.cells[dCellKey(c.i, c.model)] || {};
    if (dCellDead(st, c.rpd)) continue;
    live++;
    /* RPM 满 / 刚被上游按分钟限过（cool）都只是「这一会儿不行」，不退役 */
    const cool = Math.max(0, Math.ceil(((+st.cool || 0) - now) / 1000));
    if (dRpmUsed(c.i, c.model) >= c.rpm || cool > 0) {
      const w = Math.max(dRpmWait(c.i, c.model), cool);
      if (w > 0 && (!wait || w < wait)) wait = w;
      continue;
    }
    return { ok: c, live: live, wait: wait };
  }
  return { live: live, wait: wait };
}
/* 只探测「有没有可用 key+模型」，**不预扣**。选路的判断（走 D 还是走 C/B/A）用它，
   真正扣额度留给 callModelD —— 否则同一批会被扣两次（v0.9.345 自测抓到的真 bug：
   选路时预扣一次、调用时又选一次，结果一个 key 的每日额度被吃掉两倍）。
   prefer 是整集锁记下的档位，v0.9.348 起它是「锁」而不只是「优先」。 */
function dPeek(cfg, prefer){
  const g = dCellSplit(cfg, prefer);
  if (!g.locked.length && !g.rest.length) return null;
  const q = dRead();
  /* v0.9.349：桶空不再把请求交给 C/B/A。走到这里说明任务已经分到 D 了，
     半路换槽 = 一集两个模型（用户 10-20 定案：只要日额度还有，允许超桶跑完）。
     桶只在新任务分配时起作用，见 dTaskSlot。 */
  const now = Date.now();
  const a = dScanCells(q, g.locked, now);
  if (a.ok) return { ok: true, model: a.ok.model, i: a.ok.i, key: a.ok.key, cell: a.ok.cell };
  if (a.live > 0) return { wait: a.wait || 30 };     // 锁档只是这一分钟满 → 等，不降档
  const r = dScanCells(q, g.rest, now);
  if (r.ok) return { ok: true, model: r.ok.model, i: r.ok.i, key: r.ok.key, cell: r.ok.cell };
  if (r.live > 0) return { wait: r.wait || 30 };
  return null;                                       // 全池当日耗尽 → 跨槽降级
}
/* 选一个 (key, 模型) 单元并**预扣**。
   返回 {i,key,model} / {wait:n}（只是这一分钟满）/ null（全池当日耗尽）
   ⚠️ v0.9.349 起这里**不会**再因「小时桶空」返回 deny：任务已经分到 D 了，
      中途踢去 C/B/A 会让一集里出现两个模型。桶空只记账（q.over），照发。 */
function dPick(cfg, prefer){
  const g = dCellSplit(cfg, prefer);
  if (!g.locked.length && !g.rest.length) return null;
  const q = dRead();
  const b = dBucket(q, cfg);
  const now = Date.now();
  const take = (c) => {
    const st = dCell(q, c.i, c.model);            // 预扣前先拿到单元（会补默认值）
    st.used = (st.used || 0) + 1;                 // 预扣
    (D_RPM[dRpmKey(c.i, c.model)] || (D_RPM[dRpmKey(c.i, c.model)] = [])).push(now);
    if (b){
      /* v0.9.349 超额放行：日额度还有就发。桶扣到 0 为止（不记负），
         超额次数单独记在 q.over，后台能看到「阀门被踩穿了多少次」。 */
      if (b.tokens >= 1) b.tokens -= 1;
      else { b.tokens = 0; q.over = (q.over || 0) + 1; }
    }
    D_HIT.push(now);
    dWrite(q);
    return { i: c.i, key: c.key, model: c.model, cell: c.cell };
  };
  const a = dScanCells(q, g.locked, now);
  if (a.ok) return take(a.ok);
  if (a.live > 0) return { wait: a.wait || 30 };      // 锁档只是这一分钟满 → 等，不降档
  const r = dScanCells(q, g.rest, now);
  if (r.ok) return take(r.ok);
  if (r.live > 0) return { wait: r.wait || 30 };
  return null;                                        // 全池当日耗尽 → 跨槽降级
}
/* 额度类错误：429 / 403 一律算「这个 key 现在用不了」。
   403 也要算 —— Gemini 对无效 key、未开通的模型、地区不支持都回 403，
   不换 key 的话这条请求就死在这儿了。文案匹配只作兜底（有些网关把 429 包成 400）。 */
function dQuotaErr(e){
  const st = e && e._status;
  /* 401 也算：D 的 Base URL 可以填任意 OpenAI 兼容端点，那种端点对无效 key 回的是 401。
     Gemini 自己回 400/403，两种都覆盖到才不用为「换了一家上游」改代码。 */
  if (st === 429 || st === 403 || st === 401) return true;
  const s = String((e && e.message) || '');
  return /RESOURCE_EXHAUSTED|exceeded your current quota|quota|rate.?limit|API[_ ]?KEY_INVALID|API key not valid|invalid[_ ]api[_ ]key/i.test(s);
}
/* v0.9.347：429 要分两种，否则会把一整天的额度白白作废。
   · per day（RPD 打满）→ 这格今天真的没了
   · per minute（RPM 打满）→ 只是这一分钟，冷静 60 秒就回来，绝不能标成「今日耗尽」
     免费档的 RPM 只有十几次，撞 minute 限额是常态；按天退役的话，上午就会把
     三个 key 全部判死 —— 正是用户说的「很早就榨干」。
   说不清是哪种时按「当天」处理（保守：宁可少发，也别反复撞 429 白等）。 */
function dErrKind(e){
  const s = String((e && e.message) || '');
  if (/per[\s_-]?day|per[\s_-]?diem|daily|RPD/i.test(s)) return 'day';
  if (/per[\s_-]?minute|per[\s_-]?min|rate.?limit|RPM/i.test(s)) return 'rpm';
  return 'day';
}
/* 明确的「key 本身无效」才把整个 key 判死（它在所有模型上都不通）。
   ⚠️ 403 不都是 key 的问题 —— 「模型没开通」「地区不支持」也回 403，
      那种只该废掉当前这一格，不能连坐这个 key 的其它模型。 */
function dKeyDead(e){
  const st = e && e._status;
  const s = String((e && e.message) || '');
  return /API[_ ]?KEY[_ ]?INVALID|API key not valid|invalid.*api.?key/i.test(s)
    || (st === 401);
}
/* 标记一次失败。kind='key' 连坐该 key 的所有模型；'rpm' 只冷静 60 秒；其余按当日耗尽。 */
function dMarkErr(cfg, i, model, err){
  const q = dRead();
  /* 10-24：120 → 800，与 callModel 的截断对齐（存储层不再二次截断）。
     上游 429 是 pretty-print 的 JSON，quotaId 落在 500~600 字符之间，截 120 会让后台卡片
     永远只看到「You exceeded your current quota…」这半句，分不出分钟限流还是日额度。 */
  const msg = String((err && err.message) || '').replace(/[\x00-\x1f]/g, ' ').slice(0, 800);
  if (dKeyDead(err)) {
    /* v0.9.361：只连坐**这把 key 自己的**模型。以前遍历全局模型池，
       会把别的 key 上同名的格子也一起判死（新结构下每把 key 的模型可以完全不同）。 */
    for (const m of dSlotModelsAll(cfg, i)) {
      const st = dCell(q, i, m.name);
      st.ex = Date.now(); st.err = msg;
    }
  } else if (dErrKind(err) === 'rpm') {
    const st = dCell(q, i, model);
    st.cool = Date.now() + 60000;
    st.err = msg;
  } else {
    const st = dCell(q, i, model);
    st.ex = Date.now(); st.err = msg;
  }
  dWrite(q);
}
/* 整集锁：任务第一次进来决定「走不走 D、用哪一档模型」，之后整个任务沿用
   （用户 10-20 拍板：一集里不要出现两个模型 —— 前半 Gemini 后半 DeepSeek，语气会跳）。
   v0.9.347：锁从「整个 D 槽」细化到「某一档模型」。同一档换 key 输出完全一致，
   所以粘住档位就够；上一档真用满了，还是会降下一档（但尽量不在集内来回跳）。
   v0.9.348：首次分配改成「认领」—— 按档位顺序找第一个「没被别的活跃任务认领 +
   日额度够跑完这一集 + 当前 RPM 有空位」的模型，整集锁在它上面。一个都认领不到
   就直接判 X 走 C/B/A，不在这里排队（用户 10-20 定案：档被占了就换槽，别等）。
   v0.9.361：顺序改成 key 优先 —— 先 Key 1 的模型从上到下，Key 1 装不下这一集，
   再试 Key 2。认领键也改成 'key下标|模型名'（不同 key 上的同名模型不再是同一个东西）。
   总批数：v0.9.351 起由前端报真实值（meta.batches）；老前端退回「按目标语言的
   真实每批上限」估（45 / 60），不再一律 ÷45。另外支持「同一个人重开 → 接管
   旧认领」，见 D_TAKEOVER_MS。 */
function dTaskSlot(task, cfg, cues, lang, planB, ip, file){
  if (!task) return { slot: 'D', model: '', cell: '' };   // 没有任务号（老前端）：不锁，单批判断
  const now = Date.now();
  for (const [k, v] of D_TASK) if (now - v.at > D_TASK_TTL) D_TASK.delete(k);
  /* 认领表按「最后活跃时间」过期：跑完的任务不会发任何信号，闲置超时即视为结束 */
  for (const [k, v] of D_TIER_OWN) if (now - v.at > D_TIER_TTL) D_TIER_OWN.delete(k);
  let hit = D_TASK.get(task);
  if (!hit) {
    /* v0.9.351：优先用前端报的真实总批数；没有就按目标语言的真实每批上限估。
       少估只会让更多任务进 D（跑完前额度耗尽再降档），多估会把整集挡在门外 ——
       10-21 00:43 那集波斯语就是被多估的 11 批挡掉的。 */
    const real = Math.min(5000, Math.floor(Number(planB) || 0));
    const need = Math.max(1, real > 0 ? real : Math.ceil((Number(cues) || 0) / dCueCap(lang)));
    /* 身份指纹：同 IP + 同目标语言 + 同文件名 + 同字幕条数。只看 IP 不够（31.171.x 是
       代理池），四项一起看基本不会把「另一个人」错认成同一人重开。文件名取自前端上报的
       片名（不带内容），贴字幕没有文件名时退化成空串，剩下三项仍然可用。 */
    const fp = ip ? (ip + '|' + String(lang || '') + '|' + String(file || '') + '|' +
      String(Math.max(0, Math.floor(+cues || 0)))) : '';
    const q = dRead();
    const b = dBucket(q, cfg);
    /* v0.9.349：桶只决定「新任务能不能进 D」，不再要求「桶里备齐整集的量」。
       旧判据 `tokens >= need` 在线上把大任务全挡在门外（10-20 21:00 实测：
       一个 1033 条的任务 need=23，桶里只剩 3 个名额 → 整集扔给 B，
       而当时 D 的日额度还剩 900 多次）。用户定案：分配只看有没有名额，
       跑起来按限速慢慢发；桶空了也不许把在跑的任务踢走。 */
    let pick = '', pickI = -1, picked = '', took = false;
    if (!b || b.tokens >= 1) {
      for (const s of dSlots(cfg)) {
        /* 按 key 合计判额度：同一把 key 的模型之间换档是允许的，
           只要这个项目今天还剩够跑完这一集的量。按单档判会把
           「模型1剩 10、模型2剩 400」的 key 整把跳过，白白让给下一个项目。 */
        const ready = dSlotReady(cfg, s, need, q);
        if (!ready.length) continue;
        for (const m of ready) {
          const cell = dCellKey(s.i, m.name);
          const own = D_TIER_OWN.get(cell);
          let tookThis = false;
          if (own && own.task !== task) {
            /* v0.9.351：同一个人重开 → 旧认领静默够久就直接接手，不等 3 分钟过期。
               旧任务若真的还活着（例如两个标签页），它下一批会重新评估并落去 C/B/A；
               这比「两个都卡在 D 门外」好，认错了也只是共用一格、分摊 RPM，不会丢数据。 */
            const same = !!fp && own.fp === fp && (now - (own.at || 0)) >= D_TAKEOVER_MS;
            if (!same) continue;        // 已被别的活跃任务认领
            D_TASK.delete(own.task);    // 旧任务的僵死记录一并清掉，别让它继续指着这一格
            tookThis = true;
          }
          pick = m.name; pickI = s.i; picked = cell; took = tookThis;
          break;
        }
        if (picked) break;              // 锁在这把 key 上了，后面的 key 一个都不动
      }
    }
    if (picked) {
      D_TIER_OWN.set(picked, { task: task, at: now, fp: fp });
      if (took) D_TAKEOVER_N++;     // 只统计真正接手成功的那次（额度不够的尝试不算）
    }
    hit = { slot: picked ? 'D' : 'X', model: pick, cell: picked, i: pickI, at: now };
    D_TASK.set(task, hit);
  } else {
    hit.at = now;
    /* 已分配的任务续约认领。⚠️ 只在「这格还没被别人接手」时续：
       自己闲置超时被 B 接手后再回来，两个任务共享这一格即可，不要把 B 踢掉
       —— 踢掉会让 B 的整集锁指向一个它不再独占的格子，反而更乱。 */
    if (hit.slot === 'D' && hit.cell){
      const own = D_TIER_OWN.get(hit.cell);
      if (!own || own.task === task) D_TIER_OWN.set(hit.cell, { task: task, at: now, fp: (own && own.fp) || '' });
    }
  }
  return hit;
}
/* 记住这一集实际用的是哪一格，后面几批优先沿用。
   中途真降了档（该格日额度耗尽）→ 认领也要跟着搬走，并把旧格让出来，
   否则旧格会一直被这个任务占着、直到 3 分钟闲置过期。 */
function dTaskMark(task, i, model){
  if (!task || !model) return;
  const cell = dCellKey(i, model);
  const now = Date.now();
  const hit = D_TASK.get(task);
  const own = D_TIER_OWN.get(cell);
  /* v0.9.351：身份指纹要跟着任务走。每批成功调用都会走这里续约，漏掉 fp 会被冲成空，
     后面的「同人重开」就永远认不出来（v0.9.351 端到端第一次跑就是这么挂的）。 */
  let fp = (own && own.fp) || '';
  if (hit){
    if (hit.cell && hit.cell !== cell){
      const old = D_TIER_OWN.get(hit.cell);
      if (old && old.task === task) { fp = fp || old.fp || ''; D_TIER_OWN.delete(hit.cell); }
    }
    hit.cell = cell;
    hit.i = i;
    hit.model = model;
    hit.at = now;
  }
  if (!own || own.task === task) D_TIER_OWN.set(cell, { task: task, at: now, fp: fp });
}
/* v0.9.348：任务收尾时主动释放认领的模型档。
   用户 10-20 定案：「任务完没完咱们自己清楚，完成了就释放给别人」。
   只靠 D_TIER_TTL 闲置过期是不够的 —— 小任务 1 分钟就跑完，白占满 3 分钟，
   这段时间别人只能去 C/B/A。前端跑完 / 失败 / 用户点停止都会 POST 一次。 */
function dReleaseTask(taskId){
  const tid = String(taskId || '').replace(/[\x00-\x1f]/g, '').slice(0, 24);
  if (!tid) return false;
  let freed = false;
  /* 认领表按 owner 扫一遍：档位中途搬过家（降档）时，D_TASK.model 只指向当前这一档，
     旧档若不一起清掉会一直占着，直到 3 分钟闲置过期。 */
  for (const [m, v] of D_TIER_OWN){
    if (v && v.task === tid){ D_TIER_OWN.delete(m); freed = true; }
  }
  D_TASK.delete(tid);
  return freed;
}
function langInD(cfg, lang){
  if (cfg.langModelDAll !== false) return true;
  const arr = Array.isArray(cfg.langModelD) ? cfg.langModelD : [];
  return arr.indexOf(String(lang || '')) >= 0;
}

/* ---------------- v0.9.350：模型 E · 网页 Gemini 独占通道 ----------------
   和 A/B/C 同构（base5/model5/key5 + langModelE 语言分流），额外两条规则：

   ① 独占（用户 10-21 定案）：同一时刻只服务一个任务。别的任务**首批判定**时就判
      「这个任务用不上 E」，整程走 D/C/B/A —— 不排队、不提示、不改前端。
      判完就粘住：中途 E 空出来了也不回头，避免一集里前后两个模型。
   ② 流量：批间最小间隔 + 每分钟请求数。两者都只约束**同一个任务自己**，
      所以到顶时回 {wait:N} 让前端等几十秒，绝不降级（降级会让语气跳）。
   ⚠️ 没有 taskId 的请求不给 E：认领、释放、粘性全靠任务号，没有号就保证不了独占。
   ⚠️ 这里的表全是内存态，重启清零 —— 与 D 的 D_RPM/D_TASK 同一取舍。 */
const E_TASK = new Map();            // taskId -> { on: 1 | 0 | -1, why, at }
const E_OWN  = { task: '', at: 0 };  // 当前占用者（同一时刻只有一个）
const E_LAST = { at: 0 };            // 上次发往 E 的起始时间（算批间间隔）
const E_RPM  = [];                   // 最近 60 秒的请求时间戳
const E_OK   = { at: 0, model: '' }; // 最近一次成功调用（后台健康灯：cookie 掉了能一眼看出）
/* v0.9.354：E 的失败计数。原来只有「最近成功」一盏灯 —— 通道挂了后台只能看出「很久没成功」，
   看不出「试了几次、错在哪一条」。这里纯统计，不参与任何选路判断。
   ⚠️ 不做熔断：线上 30 小时只 dead 过 1 次、日流量 4~10 个任务，加状态机不划算（10-21 定案）。
   按 PT 日滚动，与配额重置同步 —— 用本地日会在下午三点错位一天。 */
const E_DIAG = { day: '', fail: 0, empty: 0, lastErr: '', lastErrAt: 0 };
function eDiagRoll(){
  const d = ptDateStr();
  if (E_DIAG.day !== d) { E_DIAG.day = d; E_DIAG.fail = 0; E_DIAG.empty = 0; }
}
const E_TTL  = 3 * 60 * 1000;        // 闲置多久视为任务已结束（与 D_TIER_TTL 同一取舍）
const E_RPM_WIN = 60000;
/* v0.9.365：E 的全局冷却。晚高峰拥堵（超时类软失败）判死后，别的任务别再一头撞进去
   重交 2×120 秒学费 —— 暂停接新任务，到期自动恢复。E 一旦成功一次立刻清零（见 E_OK 更新处）。
   ⚠️ 硬失败（cookie 掉 / 连接拒绝）不冷却：等待不会让它自愈，对症疗法是换 cookie。 */
const E_COOLDOWN = { until: 0 };
function eCooldownMs(cfg){
  const n = Number(cfg && cfg.eCooldownMin);
  if (!Number.isFinite(n) || n <= 0) return 0;
  return Math.min(720, Math.floor(n)) * 60000;
}
/* v0.9.365：晚高峰窗口判定（北京时间，"a-b" 含两端；空串/非法 = 永不屏蔽）。
   ⚠️ 北京时间必须显式算：服务器时区不可信（PT 日滚动已经踩过本地日错位的坑）。 */
function eOffHoursHit(cfg){
  const m = /^(\d{1,2})-(\d{1,2})$/.exec(String((cfg && cfg.eOffHours) || '').replace(/\s+/g, ''));
  if (!m || +m[1] > 23 || +m[2] > 23) return false;
  const a = +m[1], b = +m[2];
  const h = new Date(Date.now() + 8 * 3600 * 1000).getUTCHours();
  return a <= b ? (h >= a && h <= b) : (h >= a || h <= b);
}
/* v0.9.365：桥接活性探测（后台健康灯）。cookie 掉了桥接会回 400「no Gemini models available」，
   以前要等翻译报错才知道。这里 4 秒超时 GET 一次，结果缓存 30 秒 —— admin 页每次 loadConfig
   都会来问，真打这么频会把桥接的限速窗口打满（10-22 的教训）。
   ⚠️ 异步 fire-and-forget：本轮返回的是上次缓存，下一轮 poll 拿到本轮结果 —— 首轮显示
   「探测中…」是预期行为。探测地址只在配置里出现，绝不写死进选路逻辑。 */
const E_BRIDGE = { at: 0, ok: false, ms: 0, pending: false };
function eBridgeProbe(cfg){
  const url = String((cfg && cfg.eBridgeUrl) || '').trim();
  if (!/^https?:\/\//.test(url)) return null;         // 没配/配错 = 不探测
  const now = Date.now();
  if (now - E_BRIDGE.at < 30000) return E_BRIDGE;     // 30 秒缓存
  E_BRIDGE.at = now;
  E_BRIDGE.pending = true;                            // 本轮还没回来，别让后台当成「无响应」
  const t0 = now;
  const ac = new AbortController();
  const timer = setTimeout(() => ac.abort(), 4000);
  fetch(url, { signal: ac.signal })
    .then(r => r.json().then(j => {
      E_BRIDGE.ok = !!(r.ok && Array.isArray(j.data) && j.data.length);
      E_BRIDGE.ms = Date.now() - t0;
    }))
    .catch(() => { E_BRIDGE.ok = false; E_BRIDGE.ms = Date.now() - t0; })
    .finally(() => { E_BRIDGE.pending = false; clearTimeout(timer); });
  return E_BRIDGE;
}

/* 分流：与 C/B 同一套语义 —— 空数组 = E 不接管任何语言 */
function langInE(cfg, lang){
  const arr = Array.isArray(cfg.langModelE) ? cfg.langModelE : [];
  return arr.indexOf(String(lang || '')) >= 0;
}
function eGapMs(cfg){
  const n = Number(cfg.gapE);
  // 上界 30 秒：填多大都不会把一批请求拖过前端的 105 秒预算
  return (Number.isFinite(n) ? Math.max(0, Math.min(30, n)) : 2) * 1000;
}
function eRpmCap(cfg){
  const n = Number(cfg.rpmE);
  if (!Number.isFinite(n) || n <= 0) return 0;          // 0 / 非法 = 不限
  return Math.max(1, Math.min(600, Math.floor(n)));
}
/* 清掉闲置超时的任务记录与占用。跑完的任务会主动 POST /api/model-done 释放，
   这里只是兜底（关标签页、断网这类收不到收尾信号的）。 */
function eSweep(now){
  for (const [k, v] of E_TASK) if (now - v.at > E_TTL) E_TASK.delete(k);
  if (E_OWN.task && now - E_OWN.at > E_TTL) { E_OWN.task = ''; E_OWN.at = 0; }
}
/* 任务结束 → 立刻让出 E（和 dReleaseTask 一个作用：小任务不必白占 3 分钟） */
function eRelease(taskId){
  const tid = String(taskId || '').replace(/[\x00-\x1f]/g, '').slice(0, 24);
  if (!tid) return false;
  const had = E_TASK.delete(tid);
  if (E_OWN.task === tid) { E_OWN.task = ''; E_OWN.at = 0; }
  /* 本分钟已发的请求仍留在窗口里 —— 那是真实发生过的请求，不该因为任务结束就当成没发生 */
  return !!had;
}
/* 整槽清空配置时一起清：不然刚清掉 base5，旧任务还占着 E 直到超时 */
function eClearAll(){
  E_TASK.clear();
  E_OWN.task = ''; E_OWN.at = 0;
  E_LAST.at = 0;
  E_RPM.length = 0;
  E_OK.at = 0; E_OK.model = '';
  E_COOLDOWN.until = 0;   // v0.9.365：冷却一起清（配置换了，旧冷却的归因已失效）
  /* v0.9.354：清配置就是「当它没配过」，旧失败计数留着会让新配置一上来就顶着红灯 */
  E_DIAG.day = ''; E_DIAG.fail = 0; E_DIAG.empty = 0; E_DIAG.lastErr = ''; E_DIAG.lastErrAt = 0;
}
/* 后台状态灯：当前占用 / 最近成功 / 本分钟已发几次（只给已鉴权的 /api/admin/config 用）
   v0.9.365：带 cfg —— 顺带算「此刻在不在晚高峰窗口」与冷却剩余；E 配齐时探一次桥接活性。 */
function eStatus(cfg){
  const now = Date.now();
  eSweep(now);
  eDiagRoll();
  let n = 0;
  for (let i = E_RPM.length - 1; i >= 0; i--) {
    if (now - E_RPM[i] < E_RPM_WIN) n++; else break;
  }
  const bridge = slotReady(cfg, 'E') ? eBridgeProbe(cfg) : null;
  /* v0.9.354：带上失败次数与最后一条错误（后台健康灯的第二个判据）
     v0.9.365：加 offHours / coolUntil / bridge（E 槽自己的节奏，后台一眼看全） */
  return { busy: E_OWN.task || '', okAt: E_OK.at || 0, okModel: E_OK.model || '', rpm: n, lastAt: E_LAST.at || 0,
           fail: E_DIAG.fail || 0, empty: E_DIAG.empty || 0, lastErr: E_DIAG.lastErr || '', lastErrAt: E_DIAG.lastErrAt || 0,
           offHours: eOffHoursHit(cfg) ? 1 : 0, coolUntil: E_COOLDOWN.until || 0,
           bridge: bridge ? { ok: !!bridge.ok, ms: bridge.ms || 0, pending: !!bridge.pending } : null };
}
/* 每分钟窗口还有名额吗？满了返回「还要等几秒」 */
function eRpmWait(cfg, now){
  const cap = eRpmCap(cfg);
  while (E_RPM.length && now - E_RPM[0] >= E_RPM_WIN) E_RPM.shift();
  if (!cap || E_RPM.length < cap) return 0;
  return Math.max(1, Math.ceil((E_RPM[0] + E_RPM_WIN - now) / 1000));
}
/* 选路。命中返回 {which:'E', cfg, model} 或 {which:'E', wait}；不命中返回 null（交回 D/C/B/A）。
   注意：这里是**唯一**决定「这个任务用不用 E」的地方，之后的批次只读 E_TASK 的结果。 */
function ePick(cfg, lang, meta){
  if (!slotReady(cfg, 'E')) return null;
  if (!langInE(cfg, lang)) return null;
  const task = String((meta && meta.taskId) || '').replace(/[\x00-\x1f]/g, '').slice(0, 24);
  if (!task) return null;
  const now = Date.now();
  eSweep(now);
  let rec = E_TASK.get(task);
  if (!rec) {
    /* 首批判定：E 空着就抢下来，被别人占着就直接认降级（不排队） */
    const busy = !!E_OWN.task && E_OWN.task !== task;
    /* v0.9.365：晚高峰窗口 / 全局冷却中 → 首批就认降级，整程走 D/C/B/A。
       只拦**新任务**：已在跑的 E 任务不切断（中途换模型语气会跳），跑完自然释放。
       rec 粘住降级决定，窗口中途结束本任务也不回头 —— 与 busy 同一语义。 */
    const off = eOffHoursHit(cfg) ? 'offhours' : (E_COOLDOWN.until > now ? 'cooldown' : '');
    const deny = busy || !!off;
    rec = deny ? { on: 0, why: off || 'busy', at: now } : { on: 1, why: '', at: now };
    E_TASK.set(task, rec);
    if (!deny) { E_OWN.task = task; E_OWN.at = now; }
  } else {
    rec.at = now;
    /* 自己闲置超时、被别人接手了 → 本任务认降级，不抢回来（抢回来会让两边来回跳） */
    if (rec.on === 1 && E_OWN.task !== task) { rec.on = 0; rec.why = 'lost'; }
    if (rec.on === 1) E_OWN.at = now;
  }
  if (rec.on !== 1) return null;
  const w = eRpmWait(cfg, now);
  if (w) return { which: 'E', wait: w };
  return { which: 'E', cfg: slotCfg(cfg, 'E'), model: cfg.model5 };
}
/* 后台使用记录的「E 为什么没用上」：只给管理员看，不返回前端。 */
function eOffReason(cfg, lang, meta){
  if (!slotReady(cfg, 'E') || !langInE(cfg, lang)) return '';
  const task = String((meta && meta.taskId) || '').replace(/[\x00-\x1f]/g, '').slice(0, 24);
  if (!task) return '';
  const rec = E_TASK.get(task);
  if (!rec) return '';
  return rec.on === 1 ? '' : (rec.why || 'off');
}
/* E 调用失败（桥接挂 / cookie 掉 / 超时）：本批交给 C/B/A 兜。
   v0.9.354：顺带记一笔失败次数与最后错误 —— 只给后台看，不影响任何判断。
   v0.9.357：**软失败不再一次判死**。上游 gemini 网页单批已经要 40~66 秒，撞上 code 13
      重试就是 105~263 秒，必然顶穿 90 秒预算。10-21 晚上 5 次 dead 里有 4 次是这种偶发超时，
      而原来的逻辑是「一次失败 → 整集后续批次全部弃用 E」，代价太大。
      现在：超时类（软失败）连着 2 次才判死，中间保持认领、下批继续用 E；连接拒绝 / DNS
      这类硬失败仍是一次判死（那种不会自愈，多试一次纯浪费 90 秒）。
   v0.9.366：上游 5xx / 405 / 429 / redirect 循环（Google 风控、/sorry/ 拦截）虽判死条件
      同硬失败（一次即死），但**进全局冷却** —— 风控会自愈，冷却正好对症；
      10-24 双出口风控时硬失败不冷却曾让每个新任务都重撞一次 502。
   ⚠️ 只有真判死才释放 E_OWN —— 软失败期间把占用放掉，别的任务抢走后就轮到本任务 lost。
   ⚠️ 计数在成功时清零（见下方 E_OK 更新处），所以「连续」是真的连续。 */
function eTaskFail(taskId, err){
  const tid = String(taskId || '').replace(/[\x00-\x1f]/g, '').slice(0, 24);
  if (!tid) return;
  eDiagRoll();
  E_DIAG.fail++;
  const msg = String((err && err.message) || err || '');
  E_DIAG.lastErr = msg.replace(/[\x00-\x1f]/g, ' ').slice(0, 160);
  E_DIAG.lastErrAt = Date.now();
  const rec = E_TASK.get(tid);
  if (!rec) return;
  rec.at = Date.now();
  rec.fail = (rec.fail || 0) + 1;
  /* 超时 / 被前端放弃 = 软失败；桥接没起来、DNS 挂了 = 硬失败。
     v0.9.366：上游 5xx / 405 / 429 / 重定向循环（Google 风控、/sorry/ 拦截）= 会自愈的失败，
     与「cookie 掉了等不来」分开对待 —— 一次判死但走全局冷却（等得住，对症）。 */
  const soft = (err && err.name === 'AbortError') || /timeout|timed? ?out|abort|ETIMEDOUT|EAI_AGAIN/i.test(msg);
  const rate = /\b(?:405|429|5\d\d)\b|upstream|redirect|sorry|rate.?limit/i.test(msg);
  /* v0.9.380：空正文。一次即判死 —— 它不像超时那样「再等等可能就好」，
     而是这条链路此刻压根不出货；本批已由回退链接住，继续给它机会只会再空转一轮。 */
  const empty = !!(err && err._empty);
  if (empty) { try { eDiagRoll(); E_DIAG.empty++; } catch (e0) {} }
  const need = soft ? 2 : 1;
  if (rec.fail >= need) {
    rec.on = -1; rec.why = 'dead';
    if (E_OWN.task === tid) { E_OWN.task = ''; E_OWN.at = 0; }
    /* v0.9.365：软失败（晚高峰拥堵超时）判死 → 全局冷却，后面的任务直接走 D，
       不再每个新任务重交一遍学费。硬失败不冷却：cookie 掉了等不来，对症是换 cookie。
       v0.9.366：风控类（上游 5xx/405/redirect，msg 命中 rate）同样进冷却 ——
       10-24 实证：Google 双出口风控时，不冷却导致每个新任务都重撞一次 502
       （当日 10 个任务白交 10 次学费）。风控会自愈，冷却正好对症；
       连接拒绝 / DNS / 401 仍不冷却（那类等不来，多等只会误伤调度）。
       cfg 现读而非传参 —— eTaskFail 的签名被 354 断言钉死，且这里一天也走不到几次。 */
    if (soft || rate || empty) {
      const cd = eCooldownMs(readConfig());
      if (cd > 0) E_COOLDOWN.until = Date.now() + cd;
    }
  } else {
    /* 软失败第一次：保持 on=1 与认领，本批已由调用方回退到 C/B/A，下一批再给 E 一次机会 */
    rec.on = 1; rec.why = '';
    if (E_OWN.task === tid) E_OWN.at = Date.now();
  }
}
/* v0.9.345：D 槽选路。老的 pickModel 一字未动 —— D 的判断全在这里，
   不命中就原样落回 C > B > A，老行为零变化。
   ⚠️ 这里只 dPeek、不 dPick：真正的「选 key + 预扣」在 callModelD 里做且只做一次。
      两处都预扣的话，一个 key 的每日额度会被同一批请求吃掉两倍（自测实证）。 */
function pickRoute(cfg, lang, meta, ip){
  /* v0.9.350：E 排最前。命中就直走 E；不命中（没配 / 语言没勾 / 被占 / 任务已降级）
     原样往下走 D → C → B → A，老路径一行未动。 */
  const pe = ePick(cfg, lang, meta);
  if (pe) return pe;
  if (!slotReady(cfg, 'D')) return pickModel(cfg, lang);
  if (!langInD(cfg, lang)) return pickModel(cfg, lang);
  const task = String((meta && meta.taskId) || '').replace(/[\x00-\x1f]/g, '').slice(0, 24);
  const cues = Math.max(0, Math.floor(+((meta && meta.cues) || 0)));
  /* v0.9.351：前端报的真实总批数（meta.batches）。有它就不猜了 —— 猜错两种方向都难受：
     多估会把整集挡在 D 门外，少估会让它在额度耗尽时中途降档。 */
  const planB = Math.max(0, Math.floor(+((meta && meta.batches) || 0)));
  const file = String((meta && meta.file) || '').replace(/[\x00-\x1f]/g, '').slice(0, 120);
  const lock = dTaskSlot(task, cfg, cues, lang, planB, ip || '', file);
  if (lock.slot !== 'D') return pickModel(cfg, lang);
  const peek = dPeek(cfg, lock.cell);
  if (!peek) return pickModel(cfg, lang);        // 全池当天都满了 → 交给 C/B/A
  if (peek.deny) return pickModel(cfg, lang);    // v0.9.346 本小时名额用完 → 交给 C/B/A，不排队
  if (peek.wait) return { which: 'D', wait: peek.wait };
  /* 带上 peek 预测的档位只用于「事件里记哪个模型名」——真正选 key+预扣在 callModelD 里做且只做一次。
     pick.cfg 恒为 undefined：D 的 key 和模型都是调用时现选的，这里给不出确定的一份。 */
  return { which: 'D', model: peek.model };
}
/* D 槽调用：额度类错误就地换 key / 降档（同一批重发，前端完全无感），其他错误原样抛出。
   v0.9.347：轮数上限按「单元数 + 2」算 —— 3 key × 6 档 = 18 格，固定 6 轮会在
   多档场景下提前放弃（明明还有额度，却当成都用完了）。
   ⚠️ 换 key / 降档共用**同一份**超时预算：一次换 key 不该让总耗时翻倍，否则前端 105 秒的
      总预算会在槽内就被吃光，连跨槽回退的机会都没有。 */
async function callModelD(cfg, messages, maxTokens, opts, task){
  const t0 = Date.now();
  const budget = (opts && opts.timeoutMs) || 90000;
  const lock = task ? D_TASK.get(task) : null;
  const prefer = (lock && lock.cell) || '';
  const maxRound = Math.max(4, dCellList(cfg, prefer).length + 2);
  let last = null;
  for (let round = 0; round < maxRound; round++) {
    const kp = dPick(cfg, prefer);
    if (!kp) {
      const cells = dCellList(cfg, '');
      const e = new Error('Gemini 免费额度已用尽（' + dKeys(cfg).length + ' 把 key 下 ' +
        cells.length + ' 个模型格子全部到限）');
      e._dExhausted = true; e._status = 429;
      if (last) e.message += '；最后一次上游报错：' + String(last.message || '').slice(0, 120);
      throw e;
    }
    /* v0.9.346：任务跑到一半小时名额被别的任务用完 → 这一批交给 C/B/A。
       不回 wait：等一小时不如直接换槽，用户至少能拿到结果。 */
    if (kp.deny) {
      const e = new Error('Gemini 本小时名额已用完（每小时 ' + dHourly(cfg) + ' 次）');
      e._dExhausted = true; e._status = 429;
      throw e;
    }
    if (kp.wait) { const e = new Error('Gemini 免费额度 RPM 已满'); e._dWait = kp.wait; throw e; }
    const left = Math.max(5000, budget - (Date.now() - t0));
    try {
      const out = await callModel(slotCfgD(cfg, kp.key, kp.model), messages, maxTokens, Object.assign({}, opts, { timeoutMs: left }));
      /* 真正生效的模型名回传，主流程不要再覆写成第一档 */
      try { if (out && typeof out === 'object') out._used = kp.model; } catch (e8) {}
      dTaskMark(task, kp.i, kp.model);      // 这一集后面几批优先用同一格
      return out;
    } catch (e) {
      if (dQuotaErr(e)) { dMarkErr(cfg, kp.i, kp.model, e); last = e; continue; }  // 换 key / 降档
      throw e;                                                        // 非额度错误 → 跨槽
    }
  }
  const e = new Error('Gemini 免费额度已用尽（连续换 key / 降档均失败）');
  e._dExhausted = true; e._status = 429;
  throw e;
}

/* ---------------- v0.9.183 上游额度排队（按模型槽位分开） ----------------
   为什么必须分槽：实测近 14 天，A 槽 deepseek-chat 跑了 1133 个任务、从未限流；
   B 槽 gpt-6-luna 只有 345 个任务却挨了 82 次 429（Limit 200000、Used 打到 199713）。
   两槽的额度是两套完全独立的东西，共用一个账本会让 A 的请求被 B 的拥堵连坐 ——
   而 A 压根不需要排队，给它排就是白白拖慢用户。所以账本与限额都按槽位分开，
   且 A 默认「不限」（LIMIT.A = 0），行为与此前完全一致。

   只做「延迟」不做「拒绝」：额度不够时回 200 {wait:N}，前端等完重发同一批，
   而不是现在这样挨一记 429 就降级换模型（一集前后两个模型，语气会不一致）。 */
const RATE_WIN_MS   = 60000;   // 滑窗长度，与上游 TPM 的统计窗口对齐
const RATE_SAFE     = 0.85;    // 只用额度的 85%，余量留给估算误差和并发穿透
const RATE_MAX_WAIT = 60;      // 最多等一个滑窗。要等更久说明额度被最近几秒的请求占满了，
                               // 而等待的上限本来就是「滑窗里最早那笔滑出去」——正好 60 秒。
                               // 定成 45 会让这种最常见的情况直接放行降级，排队就白做了
/* v0.9.185：2 → 4。前端隔离重译是 poolMap(…, 3)、术语提取是 poolMap(…, 4)，
   而「同一 IP 同时在途」此前只给 2 → 同一个用户自己并发的第 3 个请求必然被判
   inflight 拒掉，白等 8~16 秒再撞一次。上限必须盖住前端自己的并发度。 */
const RATE_INFLIGHT = 4;       // 同一 IP 同时在途的请求数（防多标签页霸占队列）
const RATE_EST_MIN  = 3000;    // 单批消耗预估下限（token）
const RATE = { A: [], B: [], C: [] };       // 各槽位滑窗 [{t, tk}]（v0.9.193 加 C）
/* v0.9.187：B 的种子值 20 万 → 200 万。
   2026-09-27 直连 api.openai.com 实测：x-ratelimit-limit-tokens = **2,000,000** TPM
   （remaining 1,999,997 / reset 0s；另有 limit-requests 5000 RPM，我们没跟踪）。
   20 万是用户提额**之前**从 429 文案「Limit 200000, Used 199713」里学到的旧值。
   ⚠️ 种子值只用于「进程刚起来、还没读到第一个响应头」的那一瞬；一旦读到上游头，
   noteQuota() 会按真实值再校准（可高可低）。但种子太低会在重启后头几秒无谓地排队，
   所以种子必须跟真实额度同量级。 */
/* v0.9.193：C 的种子值与 B 对齐（200 万 TPM）。C 若接的是别的家，跑到第一个响应就会被
   noteQuota() 按上游头校准，种子只影响进程刚起来的那一瞬。 */
const RATE_LIMIT = { A: 0, B: 2000000, C: 2000000 };  // 0 = 该槽位不限，永不 wait
const RATE_OUT_EMA = { A: 0, B: 0, C: 0 };  // 各槽位平均每批输出 token，供预估
const INFLIGHT = Object.create(null);       // ip -> 在途请求数
/* v0.9.185：短等由服务端自己扛。额度只差几秒时让客户端空跑一趟往返、再倒数重发，
   既多一次 RTT、又会让一批人整整齐齐撞回来（惊群）。服务端 await 掉这几秒，客户端完全无感。
   上限 15 秒——再长就交给客户端排队（用户 9/27 拍板：排再久也不换模型）。 */
const HOLD_MAX_MS      = 15000;
const HOLD_MAX_WAITERS = 8;    // 同时在服务端等待的请求数，别把 Node 变成等待池
let   HOLD_N           = 0;
/* v0.9.185：上游每次响应都会报剩余额度（OpenAI 系：x-ratelimit-remaining-tokens）。
   这是权威数字，比我们按字符数估算准得多；没有这个头的端点才回落到本地滑窗账本。 */
const QUOTA       = { A: null, B: null, C: null };  // {rem, at}
const RETRY_UNTIL = { A: 0, B: 0, C: 0 };   // 上游 Retry-After 报的下次可试时刻

/* 预估本批消耗：输入按字符数折算（中英混排实测约 2.5 字符/token），输出用该槽位 EMA */
function estTokens(messages, which){
  let chars = 0;
  if (Array.isArray(messages)) {
    for (const m of messages) {
      if (!m) continue;
      const c = typeof m.content === 'string' ? m.content
        : Array.isArray(m.content) ? JSON.stringify(m.content) : '';
      chars += c.length;
    }
  }
  const tin = Math.round(chars / 2.5);
  return Math.max(RATE_EST_MIN, tin + (RATE_OUT_EMA[which] || 0));
}
/* 该槽位过去 60 秒用了多少（顺带清掉过期记录） */
function rateUsed(which){
  const arr = RATE[which] || (RATE[which] = []);
  const cut = Date.now() - RATE_WIN_MS;
  while (arr.length && arr[0].t < cut) arr.shift();
  let sum = 0;
  for (const r of arr) sum += r.tk;
  return sum > 0 ? sum : 0;   // v0.9.185：有负值补正，别让账本算出负数
}
/* 记账。并发请求会同时判定，所以放行那一刻就先「预扣」预估值，
   真实 usage 回来后只补正差额（实际比预估少的部分随滑窗自然滑出，偏保守但不会穿透） */
function rateAdd(which, tk){
  const v = Math.round(Number(tk) || 0);
  /* v0.9.185：允许负值。预估偏高时差额是负数，此前直接 return 丢弃 → 账本只增不减、
     累计虚高 → 本来有额度也让人排队；排队没发成的预扣也要原样退还。 */
  if (!v) return;
  const arr = RATE[which] || (RATE[which] = []);
  arr.push({ t: Date.now(), tk: v });
  if (arr.length > 400) arr.splice(0, arr.length - 400);
}
/* 从上游 429 文案里学限额："Rate limit ... Limit 200000, Used 199713, Requested 5018"。
   硬编码的额度迟早会变（上游改配额、换模型），而这个数字是上游亲口报的，最准。
   只收紧不放松：万一某次报的是别的配额，取小的更保险。
   ⚠️ 收紧只走这一条；**放宽走另外两条**（v0.9.185）：响应头里的 x-ratelimit-limit-tokens、
   以及「实测用量超过旧限额却没挨限流」。缺了放宽通道，用户提了额度我们永远看不到。 */
function learnLimit(which, msg){
  const m = String(msg || '').match(/Limit\s+(\d{3,})/i);
  if (!m) return;
  const v = Number(m[1]);
  if (!Number.isFinite(v) || v <= 0) return;
  if (!RATE_LIMIT[which] || v < RATE_LIMIT[which]) RATE_LIMIT[which] = v;
}
/* OpenAI 的 reset 形如 "6m0s" / "1.5s" / "800ms"，逐段相加（不猜默认单位） */
function parseResetMs(v){
  const s = String(v == null ? '' : v).trim();
  if (!s) return 0;
  const re = /(\d+(?:\.\d+)?)\s*(ms|h|m|s)/gi;
  let m, total = 0, hit = false;
  while ((m = re.exec(s))) {
    hit = true;
    const n = Number(m[1]); const u = String(m[2]).toLowerCase();
    total += u === 'ms' ? n : u === 's' ? n * 1000 : u === 'm' ? n * 60000 : n * 3600000;
  }
  return hit ? Math.round(total) : 0;
}
function numOrNull(v){ const n = Number(String(v == null ? '' : v).trim()); return Number.isFinite(n) ? n : null; }
/* 抓上游的额度头。OpenAI 官方端点每次响应都带，这是权威数字 */
function rateHeaders(h){
  const g = (k) => { try { return (h && typeof h.get === 'function') ? h.get(k) : ''; } catch (e) { return ''; } };
  return { remTok: numOrNull(g('x-ratelimit-remaining-tokens')), limTok: numOrNull(g('x-ratelimit-limit-tokens')),
           resetTok: g('x-ratelimit-reset-tokens') || '' };
}
function retryAfterMs(h){
  const v = (h && typeof h.get === 'function') ? (h.get('retry-after') || '') : '';
  const n = Number(String(v).trim());
  return Number.isFinite(n) && n > 0 ? Math.round(n * 1000) : 0;
}
/* 记下上游报的余额，并用它校正限额。
   ⚠️ 旧的 learnLimit 只收紧不放宽，会把 429 文案里学到的 20 万永久锁死——
   用户在 OpenAI 后台提了额我们也看不到。放宽只认上游头/实测用量，不认猜测。 */
function noteQuota(which, rl){
  if (!rl || typeof rl !== 'object') return;
  if (rl.limTok > 0 && RATE_LIMIT[which] > 0 && rl.limTok > RATE_LIMIT[which]) RATE_LIMIT[which] = rl.limTok;
  /* 桶的大小也记下来：回补速度要按上游自己的桶算，不能拿我们这边学来的限额去套 */
  if (rl.remTok != null) QUOTA[which] = { rem: rl.remTok, lim: rl.limTok || 0, at: Date.now() };
}
/* 按上游余额算要等几秒；没有余额数据返回 null（交给本地滑窗账本） */
function quotaWait(which, est){
  const q = QUOTA[which];
  if (!q) return null;
  const age = Date.now() - q.at;
  if (age > 120000) return null;                 // 太久没有新数据，不敢再拿它判定
  const cap = (q.lim > 0 ? q.lim : 0) || (RATE_LIMIT[which] || 0) || Math.max(q.rem, est);
  if (est > cap) return 0;                       // 本批本身就超过整个额度，等也没用
  const frac = Math.min(1, age / RATE_WIN_MS);
  const eff  = q.rem + (Math.max(cap, q.rem) - q.rem) * frac;   // 令牌桶按线性回补估当前可用
  let w = 0;
  if (eff < est) {
    const rate = Math.max((Math.max(cap, q.rem) - q.rem) / RATE_WIN_MS, 1e-9);   // token/ms
    w = Math.ceil((est - eff) / rate / 1000) + 1;
  }
  const ra = Math.ceil((RETRY_UNTIL[which] - Date.now()) / 1000);  // 上游 Retry-After 亲口说的，优先
  if (ra > w) w = ra;
  return w > 0 ? Math.min(RATE_MAX_WAIT, w) : 0;
}
const sleepMs = (ms) => new Promise(r => setTimeout(r, ms));

/* ---------------- v0.9.185 先来先出（FIFO） ----------------
   「等 N 秒再重发」本身不是 FIFO：谁先重发谁先进，后到的新请求反而插队。
   所以给每个排队的请求发一个顺序号（token 形式回给客户端，重发时带回）：
   判定不只看额度——只要队里还有比我更早的号，就继续等。
   号只在客户端按服务端给的秒数回来重发时才续期，标签页关掉 90 秒后自动出队，
   不会让一个消失的请求把后面所有人堵死。 */
/* v0.9.210：补 C。v0.9.193 加 C 槽时漏了这两本账 → ++Q_SEQ.C = NaN → NaN 永远进不了队首
   → 永远回 {wait, why:'fifo'}，前端无限重发、任务卡 0%（10/02 线上实证）。 */
const Q_SEQ   = { A: 0, B: 0, C: 0 };
const Q_WAIT  = { A: Object.create(null), B: Object.create(null), C: Object.create(null) };  // token -> {seq, at}
const Q_TTL   = 90000;   // 续期窗口（> 服务端单次最长 60 秒的等待）
const FIFO_POLL = 3;     // 不是队首时的回问间隔（秒）：队首一走要能立刻顶上
function qSweep(which){
  const m = Q_WAIT[which] || (Q_WAIT[which] = Object.create(null));
  const cut = Date.now() - Q_TTL;
  for (const k in m) if (m[k].at < cut) delete m[k];
  return m;
}
function qMinSeq(which){
  const m = Q_WAIT[which] || {};
  let min = Infinity;
  for (const k in m) if (m[k].seq < min) min = m[k].seq;
  return min;
}
function qTouch(which, tok, seq){
  const m = Q_WAIT[which] || (Q_WAIT[which] = Object.create(null));
  m[tok] = { seq: seq, at: Date.now() };
}
function qDrop(which, tok){ const m = Q_WAIT[which]; if (m) delete m[tok]; }
function qNewTok(which, seq){ return which + ':' + seq + ':' + Math.random().toString(36).slice(2, 8); }

/* 判定：0 = 放行；>0 = 需要等待的秒数 */
function paceCheck(which, est){
  const limit = RATE_LIMIT[which] || 0;
  if (limit <= 0) return 0;                          // 该槽位不限流，永不排队
  const used = rateUsed(which);
  const budget = limit * RATE_SAFE;
  if (used + est <= budget) return 0;
  /* 要腾出 need 这么多额度：从滑窗最早的记录往前推，看多久之后累计用量降到预算内 */
  const arr = RATE[which] || [];
  const need = used + est - budget;
  let freed = 0, wait = RATE_MAX_WAIT;
  for (const r of arr) {
    freed += r.tk;
    if (freed >= need) { wait = Math.ceil((r.t + RATE_WIN_MS - Date.now()) / 1000) + 1; break; }
  }
  if (wait > RATE_MAX_WAIT) return 0;                // 等太久不如放行
  if (wait < 1) wait = 1;
  /* 抖动 ±15%：同一批被放行的人别再整整齐齐地一起撞回来 */
  wait = Math.round(wait * (0.85 + Math.random() * 0.3));
  return Math.min(RATE_MAX_WAIT, Math.max(1, wait));
}
/* 每 IP 在途：拿不到就返回需要等待的秒数（不知道别人的批多久跑完，给个保守值） */
function inflightTake(ip){
  const n = INFLIGHT[ip] || 0;
  if (n >= RATE_INFLIGHT) return 0;
  INFLIGHT[ip] = n + 1;
  return 1;
}
function inflightFree(ip){
  const n = (INFLIGHT[ip] || 1) - 1;
  if (n <= 0) delete INFLIGHT[ip]; else INFLIGHT[ip] = n;
}
function inflightWait(){ return 8 + Math.floor(Math.random() * 8); }

/* 上游是否因 response_format 拒收（HTTP 4xx + 文案相关）→ 摘掉参数重试一次 */
function rfRejected(e){
  const s = String((e && e.message) || '');
  if (!/HTTP (400|404|415|422)/.test(s)) return false;
  return /response[_ -]?format|json[_ -]?object|json[_ -]?mode|response[_ -]?schema|unsupported/i.test(s);
}
/* 上游是否因 max_tokens 改名而拒收（OpenAI o 系列 / gpt-5 起只认 max_completion_tokens）→ 改名重发一次。
   与 rfRejected 同一套路：靠错误文案判定，不维护模型名名单，新出的模型无需改代码就能自适应。 */
function tokNameRejected(e){
  const s = String((e && e.message) || '');
  if (!/HTTP (400|404|415|422)/.test(s)) return false;
  return /max_tokens/i.test(s) && /max_completion_tokens/i.test(s);
}
/* 上游是否拒收自定义 temperature（OpenAI o 系列 / gpt-5 只接受默认 1）→ 不再发送该字段。
   典型文案："Unsupported value: 'temperature' does not support 0.2 with this model.
   Only the default (1) value is supported." */
function tempRejected(e){
  const s = String((e && e.message) || '');
  if (!/HTTP (400|404|415|422)/.test(s)) return false;
  return /temperature/i.test(s) && /(does not support|not supported|only the default)/i.test(s);
}
/* ---------------- v0.9.232：转发通道的安全边界 ----------------
   /api/proxy 会替用户把请求发到他填的任意地址，等于一个开放代理，故必须设边界：
   ① 只允许 https（明文 http 会在链路上裸奔 Key）
   ② 禁止内网 / 本机 / 云元数据地址（含域名解析后指向内网的情形，防 DNS 指向 127.0.0.1）
   ③ 按 IP 限流，避免被当成免费代理池刷
   ⚠️ 这里只做「目的地合法性」判断，不碰用户 Key 与正文内容。 */
const PROXY_RATE = new Map();    /* ip -> { n, t }，滑动窗口按分钟计数 */
const PROXY_CAP = 600;           /* 每分钟每 IP 上限：长字幕一集上百个批次也够用，同时挡住刷量 */
function proxyAllow(ip){
  try{
    const now = Date.now(), win = 60000;
    const r = PROXY_RATE.get(ip);
    if (!r || now - r.t > win){ PROXY_RATE.set(ip, { n: 1, t: now }); return true; }
    if (r.n >= PROXY_CAP) return false;
    r.n++; return true;
  }catch(e){ return true; }
}
/* 计数表清理：不清理会随访问 IP 数无限增长（每个访客一条） */
(function(){
  const h = setInterval(function(){
    try{ const now = Date.now(); for (const k of Array.from(PROXY_RATE.keys())){ const v = PROXY_RATE.get(k); if (!v || now - v.t > 600000) PROXY_RATE.delete(k); } }catch(e){}
  }, 300000);
  if (h && typeof h.unref === 'function') h.unref();
})();
function isPrivateIp(ip){
  const s = String(ip || '').trim().toLowerCase();
  if (!s) return true;
  if (s === '::1' || s === '::' || s === '0.0.0.0') return true;
  if (/^::ffff:/.test(s)) return isPrivateIp(s.slice(7));           /* IPv4-mapped IPv6 */
  if (/^f[cd]/.test(s) || /^fe80/.test(s)) return true;             /* ULA / link-local */
  if (/^10\./.test(s) || /^127\./.test(s) || /^169\.254\./.test(s) || /^0\./.test(s)) return true;
  if (/^192\.168\./.test(s)) return true;
  if (/^172\.(1[6-9]|2\d|3[01])\./.test(s)) return true;
  if (/^100\.(6[4-9]|[7-9]\d|1\d\d)\./.test(s)) return true;        /* CGNAT 100.64/10 */
  return false;
}
async function targetAllowed(base){
  let u;
  try { u = new URL(String(base)); } catch (e) { return { ok: false, reason: 'Base URL is not a valid URL' }; }
  if (u.protocol !== 'https:') return { ok: false, reason: 'Only https:// endpoints are allowed for relay' };
  if (u.username || u.password) return { ok: false, reason: 'Base URL must not contain credentials' };
  const host = String(u.hostname || '').replace(/^\[|\]$/g, '');
  if (!host) return { ok: false, reason: 'Base URL has no host' };
  const isIp = /^(\d{1,3}\.){3}\d{1,3}$/.test(host) || host.indexOf(':') >= 0;
  if (isIp) return isPrivateIp(host) ? { ok: false, reason: 'Relay to private or local addresses is not allowed' } : { ok: true };
  try {
    const dns = require('dns');
    const addrs = await dns.promises.lookup(host, { all: true });
    if (!addrs || !addrs.length) return { ok: false, reason: 'DNS lookup failed for ' + host };
    for (const a of addrs) if (isPrivateIp(a.address)) return { ok: false, reason: 'Relay to private or local addresses is not allowed' };
  } catch (e) { return { ok: false, reason: 'DNS lookup failed for ' + host }; }
  return { ok: true };
}
async function callModel(cfg, messages, maxTokens, opts){
  const url = String(cfg.base).replace(/\/+$/, '') + '/chat/completions';
  /* v0.9.211：上游请求必须有超时 + 可被客户端断开中止。
     ⚠️ 10/02 线上事故：fetch 无超时，前端 105 秒放弃后服务端仍挂着等上游——
     上游跑完照样扣 token（结果没人收）、在途名额被占死 → 后续全部 why:'inflight' →
     前端「排队超时」卡 0%。两个信号源：opts.timeoutMs（每次调用独立，回退链各拿各的预算）、
     opts.signal（客户端断开，整个请求生命周期共享）。 */
  const sigs = [];
  if (opts && opts.timeoutMs) sigs.push(AbortSignal.timeout(opts.timeoutMs));
  if (opts && opts.signal) sigs.push(opts.signal);
  const abortSig = sigs.length === 1 ? sigs[0] : (sigs.length ? AbortSignal.any(sigs) : undefined);
  // v0.9.91：temperature 改为配置项（admin 可调）；旧配置无该字段时回退 0.2，并夹紧到 0-2
  let temp = Number(cfg.temperature);
  if (!Number.isFinite(temp)) temp = 0.2;
  temp = Math.min(2, Math.max(0, temp));
  /* v0.9.132：opts.json 由前端 meta.json 传来，标明「这条请求期望 JSON 输出」 */
  const useRf = !!(opts && opts.json) && rfSupported(cfg.base);
  /* plan = { rf, newTok, temp }：分别决定是否带 response_format / 用哪个 token 上限参数名 / 是否带 temperature。
     v0.9.154：把原来的「两项布尔参数」改成 plan 对象，因为端点不兼容往往是成串出现的。 */
  const once = async (plan) => {
    const core = { model: cfg.model, messages, stream: false };
    if (maxTokens != null) core[plan.newTok ? 'max_completion_tokens' : 'max_tokens'] = maxTokens;
    if (plan.temp) core.temperature = temp;
    if (plan.rf) core.response_format = { type: 'json_object' };
    const r = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + cfg.key },
      body: JSON.stringify(withExtra(core, cfg.extraParams)),
      signal: abortSig   /* v0.9.211：超时/客户端断开 → fetch 立刻中止，不再傻等上游 */
    });
    /* v0.9.185：无论成败都要看额度头——成功时它告诉我们还剩多少，429 时它告诉我们何时能再试 */
    const rl = rateHeaders(r.headers);
    const text = await r.text();
    if (!r.ok) {
      /* 10-24：200 → 800。Google 的 429 原文是 pretty-print 的 JSON，`details[].quotaId`
         （…PerMinute… / …PerDay…）在 300 字符之后才出现，截 200 等于把「到底撞的是分钟线
         还是日线」这个唯一的判据砍掉，归因只能靠猜。 */
      const err = new Error('Upstream HTTP ' + r.status + ' ' + text.slice(0, 800));
      err._rl = rl; err._status = r.status; err._ra = retryAfterMs(r.headers);
      throw err;
    }
    const out = JSON.parse(text);
    if (out && typeof out === 'object') out._rl = rl;
    return out;
  };
  /* v0.9.154：逐项降级重发，而不是「失败一次就放弃」。
     端点不兼容常常成串出现——OpenAI o 系列同一条请求既不要 max_tokens 也不要自定义
     temperature，只修一项下一轮照样 400。这里每轮只修一个维度，沿用上一轮已生效的修复，
     最多四轮；三者 any 都拿不到对应错误就立刻抛，不会瞎试。

     ⚠️ 判定顺序不可调换：OpenAI 的报错文案一律以 Unsupported 开头，
     会被最宽泛的 rfRejected（正则含 /unsupported/i）一并命中。若让它抢先，
     会摘掉 response_format 重发——同一条参数错误必然再现，后面两项就成了永远到不了的死代码。
     所以必须由具体到宽泛：先 tokName / temp（要求点名具体参数），最后才轮到 rf。 */
  let plan = { rf: useRf, newTok: false, temp: true };
  let lastErr = null;
  for (let round = 0; round < 4; round++) {
    try {
      return await once(plan);
    } catch (e) {
      lastErr = e;
      if (maxTokens != null && !plan.newTok && tokNameRejected(e)) { plan = { rf: false, newTok: true,  temp: plan.temp }; continue; }
      if (plan.temp && tempRejected(e))                            { plan = { rf: false, newTok: plan.newTok, temp: false }; continue; }
      if (plan.rf && rfRejected(e))                                { plan = { rf: false, newTok: plan.newTok, temp: plan.temp }; continue; }
      throw e;
    }
  }
  throw lastErr;
}

/* v0.9.380：上游回 200 但正文为空 —— 网页桥接（E）最典型的失败形态，其它槽也可能遇到。
   此前这种响应当「成功」原样透传给前端：服务端顺手把 E 记成健康（E_OK 更新、冷却清零、
   连续失败计数归零），前端拿到空串只能整批重试，3 次全空后再逐组补救 ——
   一次空响应被放大成 N 个请求。10-25 实测：E 连撞 3 小时、367 次补救，源头就是这条路径。
   ⚠️ 判定放在这里而不是 callModel 里：只有路由知道「这批该不该继续」以及回退链怎么走。 */
function modelOutEmpty(out){
  if (!out || typeof out !== 'object') return true;
  if (out.wait) return false;                       // v0.9.183 的排队回执，不是空响应
  const ch = out.choices;
  if (!Array.isArray(ch) || !ch.length) return true;
  const m = ch[0] && ch[0].message;
  const c = m && m.content;
  return !String(c == null ? '' : c).trim();
}

/* ---------------- 路由 ---------------- */
const server = http.createServer(async (req, res) => {
  /* v0.9.284：基础安全响应头，对所有响应统一生效。
     ⚠️ 有意**不上 CSP** —— 四页引擎逻辑大量内联 <script>（translate.html 单页 540KB），
        一旦上 CSP 又没放行 'unsafe-inline'，整站当场瘫痪。
        真要上，得先把内联脚本梳理成白名单/外链，是个独立小工程。
     下面这三个都是「只加约束、不改行为」的，不会破坏现有功能：
       nosniff      → 不让浏览器猜 MIME（防止 .txt 被当 HTML 执行）
       Referrer     → 跨站只带来源，不带完整 URL（字幕相关路径不泄漏给第三方）
       XFO SAMEORIGIN → 只许自己嵌自己，挡掉基本的点击劫持 */
  try {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  } catch (e) { }

  const u = req.url.split('?')[0];
  try {
    /* 公开：累计统计（顶栏三个数字）。只读账本，不扫 events.json，服务端 30 分钟内存缓存。 */
    if (req.method === 'GET' && u === '/api/stats') {
      return sendJson(res, 200, publicStats());
    }

    /* 公开：默认模型状态（前端展示用，不泄露 Key） */
    if (req.method === 'GET' && u === '/api/model-info') {
      const cfg = readConfig();
      const usage = readUsage();
      const configured = !!(cfg.base && cfg.model && cfg.key);
      return sendJson(res, 200, {
        configured,
        adminInit: !!cfg.adminHash,
        label: configured ? ((cfg.provider ? cfg.provider + ' · ' : '') + cfg.model) : '',
        perIpDaily: cfg.perIpDaily,
        globalDaily: cfg.globalDaily,
        usedToday: usage.global
      });
    }

    /* 公开：自定义引擎的「服务端转发」通道（v0.9.232）
       存在理由：部分 OpenAI 兼容端点的网关不放行 CORS 预检——OPTIONS 只回 200 且不带
       Access-Control-Allow-*，浏览器直连必抛 "Failed to fetch"（实测 api.z.ai 即如此：
       它的 POST 反而带 CORS 头，唯独预检被网关吞掉）。这类端点只能由服务端代发。
       ⚠️ 勾选后请求体与 Key 会经过本站：只在内存里用一次，不落盘、不进埋点、不写日志。
       ⚠️ 它本质上是一个受限的开放代理，故三重约束：只放行 https、禁内网与云元数据地址、
          按 IP 限流（见 targetAllowed / proxyAllow）。
       转发链路与内置通道完全同一套 callModel：附加参数、temperature、response_format、
       max_tokens↔max_completion_tokens 改名、temperature 降级、超时与客户端断开中止。 */
    if (req.method === 'POST' && u === '/api/proxy') {
      /* v0.9.211 同款：前端一断开（放弃/关标签页）立刻中止上游，不留下没人收的结果 */
      const cliAc = new AbortController();
      res.on('close', () => { if (!res.writableFinished) cliAc.abort(); });
      let pbody;
      try { pbody = JSON.parse(await readBody(req, 4 * 1024 * 1024)); } catch (e) {
        return sendJson(res, 400, { error: { code: 'bad_json', message: 'Request body is not valid JSON' } });
      }
      const pIp = clientIp(req);
      if (!proxyAllow(pIp)) return sendJson(res, 429, { error: { code: 'relay_rate', message: 'Too many relay requests from this IP. Please slow down.' } });
      const pBase = String((pbody && pbody.base) || '').trim();
      const pModel = String((pbody && pbody.model) || '').trim();
      const pKey = String((pbody && pbody.key) || '');
      if (!pBase || !pModel) return sendJson(res, 400, { error: { code: 'missing', message: 'Missing Base URL or model' } });
      const chk = await targetAllowed(pBase);
      if (!chk.ok) return sendJson(res, 400, { error: { code: 'blocked', message: chk.reason } });
      if (!Array.isArray(pbody.messages) || !pbody.messages.length) {
        return sendJson(res, 400, { error: { code: 'missing_messages', message: 'Missing messages' } });
      }
      const pTemp = Number(pbody && pbody.temperature);
      const relayCfg = {
        base: pBase, model: pModel, key: pKey,
        temperature: Number.isFinite(pTemp) ? Math.min(2, Math.max(0, pTemp)) : 0.2,
        extraParams: normParams(pbody && pbody.extra)
      };
      /* 服务端预算比前端的放弃时间稍短——让「确切的上游错误」先于「前端超时」到达，
         用户看到的是 HTTP 401 / 模型不存在，而不是一句 Failed to fetch。 */
      const pMs = Number(pbody && pbody.timeoutMs);
      const budget = Math.min(300000, Math.max(5000, Number.isFinite(pMs) && pMs > 0 ? pMs : 120000));
      const pTok = Number(pbody && pbody.maxTokens);
      try {
        const pOut = await callModel(relayCfg, pbody.messages,
          Number.isFinite(pTok) && pTok > 0 ? pTok : undefined,
          { json: !!(pbody && pbody.json), timeoutMs: budget, signal: cliAc.signal });
        if (pOut && typeof pOut === 'object') delete pOut._rl;   /* 额度头是本站内部用的，不外泄 */
        return sendJson(res, 200, pOut || {});
      } catch (e) {
        return sendJson(res, 502, { error: { code: 'upstream', message: String((e && e.message) || e).slice(0, 300) } });
      }
    }

    /* 公开：任务结束 → 立刻释放 D 槽认领的模型档（v0.9.348）。
       只带 taskId，没有敏感信息；前端在 finally 里发（跑完 / 失败 / 用户停止都发）。
       没有它，档位就只能等 3 分钟闲置过期，小任务会把后面的人挤去 C/B/A。 */
    if (req.method === 'POST' && u === '/api/model-done') {
      let b = {};
      try { b = JSON.parse(await readBody(req, 4096)); } catch (e) {}
      const freed = dReleaseTask(String((b && b.taskId) || ''));
      /* v0.9.350：E 的占用也在这里一起放掉 —— 前端跑完/失败/停止都只发这一个请求 */
      try { eRelease(String((b && b.taskId) || '')); } catch (e2) {}
      return sendJson(res, 200, { ok: 1, released: freed ? 1 : 0 });
    }

    /* 公开：翻译代理 */
    if (req.method === 'POST' && u === '/api/translate') {
      /* v0.9.211：前端一断开（105 秒预算放弃 / 关标签页），服务端的上游 fetch 立刻中止——
         不再出现「客户端早走了、服务端还在傻等，上游跑完照样扣 token」。
         res 'close' 且响应未写完 = 客户端提前断开；正常结束也会触发 close，须用 writableFinished 区分。 */
      const cliAc = new AbortController();
      /* v0.9.369：客户端走了（关页面 / 断网 / 崩掉），除了中止上游 fetch（省钱），
         还要**当场**把这一轮占的 D / E 任务槽放掉。原来只靠前端 pagehide 的 sendBeacon，
         浏览器被强杀或断网时那一发发不出去，槽位就一直占到 3 分钟闲置兜底为止 ——
         多集批量跑到一半被关掉时，用户重开页面会看到「任务还在跑」，别人也被挤在外面。
         ⚠️ 正常结束也会触发 close，用 writableFinished 区分，别把正常收尾当成断开。 */
      let cliTaskId = '';
      res.on('close', () => {
        if (!res.writableFinished) {
          cliAc.abort();
          if (cliTaskId) {
            try { dReleaseTask(cliTaskId); } catch (e) {}
            try { eRelease(cliTaskId); } catch (e) {}
          }
        }
      });
      const CALL_BUDGET_MS = 90000;   /* 与前端「90 秒模型预算 + 15 秒排队冗余」对齐；回退链每级各拿一份 */
      /* v0.9.365：E 走网页桥接，正常单批 6~66 秒，90 秒预算贴着上限 —— 晚高峰前段（还没拥堵到
         200 秒）的批会被误杀。给 E 单独放宽到 120 秒（用户定案）；回退链每级仍是 90 秒。 */
      const CALL_BUDGET_E_MS = 120000;
      /* v0.9.382：回退链共享一份总预算。此前每级各拿一份独立预算（E 120 + C/B/A 各 90 = 最坏 390s），
         而前端内置通道 135s 就把连接断了 —— 服务端还在算、用户早已看到失败，这段算力纯白烧，
         用户还会重试，把同一个死循环再走一遍。
         总预算取 240s：够 E 跑满（120）+ 至少一级完整回退（90），还剩 30s 余量。
         每级实拿 = min(该级预算, 剩余)；剩余不足 15s 就不再往下回退，直接把首个错误交给前端。 */
      const CHAIN_BUDGET_MS = 240000;
      const cfg = readConfig();
      if (!(cfg.base && cfg.model && cfg.key)) {
        return sendJson(res, 503, { error: { code: 'not_configured', message: 'Default model is not configured by the site admin. Use your own API instead.' } });
      }
      const usage = readUsage();
      const ip = clientIp(req);
      const ipUsed = usage.ips[ip] || 0;
      if (cfg.perIpDaily > 0 && ipUsed >= cfg.perIpDaily) {
        return sendJson(res, 429, { error: { code: 'ip_limit', message: 'Daily free quota for this IP (' + cfg.perIpDaily + ' requests) is used up. Enter your own API key to continue.', params: [cfg.perIpDaily] } });
      }
      if (cfg.globalDaily > 0 && usage.global >= cfg.globalDaily) {
        return sendJson(res, 429, { error: { code: 'global_limit', message: 'Today\'s site-wide free quota is used up. Enter your own API key to continue.' } });
      }
      let body;
      try { body = JSON.parse(await readBody(req, 2 * 1024 * 1024)); } catch (e) {
        return sendJson(res, 400, { error: { code: 'bad_json', message: 'Request body is not valid JSON' } });
      }
      if (!Array.isArray(body.messages) || !body.messages.length) {
        return sendJson(res, 400, { error: { code: 'missing_messages', message: 'Missing messages' } });
      }
      /* v0.9.119：按目标语言分流到模型 A / B（meta.lang 由前端随每次请求带上）
         v0.9.345：D 槽（Gemini 免费池）优先级最高。pickRoute 内部先判 D，
         不命中就原样落回老的 pickModel（C > B > A），老路径零改动。 */
      const lang = (body.meta && String(body.meta.lang || '')) || '';
      /* 任务号与 pickRoute 内部用的是同一套清洗规则（脏字符去掉、截 24 字），
         否则「选路时锁定 A 档」和「调用时读粘性档位」会读到两个不同的 key。 */
      const dTaskId = String((body.meta && body.meta.taskId) || '').replace(/[\x00-\x1f]/g, '').slice(0, 24);
      cliTaskId = dTaskId;   /* 交给上面的 close 处理：客户端断开时据此释放槽位 */
      const pick = pickRoute(cfg, lang, body.meta, ip);
      /* D 的额度还在、只是这一分钟 RPM 满了：让前端等几十秒重发同一批，**不降级**。
         免费额度一分钟后就回来，降到 C/B/A 等于白扔。复用既有 {wait} 回执
         （只有带 meta.pace=1 的前端才认，老前端根本走不到这里）。 */
      if (pick && pick.wait) return sendJson(res, 200, { wait: pick.wait, slot: pick.which, why: 'rpm' });
      /* D 的 key/模型由 callModelD 现选现扣，pick 上没有 cfg —— 模型名一律从这里取，
         别处不要再碰 pick.cfg（D 走这条路时它是 undefined）。
         v0.9.347：多档模型时用 peek 预测的那一档（事件里记的名称）；真正调用的档位
         若因额度变化换了一档，callModelD 会把 out._used 覆写成真实值。 */
      const firstCell = pick.which === 'D' ? (dCellList(cfg, '')[0] || null) : null;
      const slotModelName = pick.which === 'D'
        ? String(pick.model || (firstCell && firstCell.model) || '')
        : String((pick.cfg && pick.cfg.model) || '');
      /* v0.9.183：排队闸门，按槽位判定。只有前端在 meta 里声明 pace=1 才可能收到 wait——
         旧版本不带这个标记，走的是原路径，不会因为收到一个没有 choices 的响应而误判成「上游返回空」。
         日配额与埋点都放在闸门之后再记：排队只是「晚点再来」，既没真翻译也不该留下事件。 */
      const canPace = !!(body.meta && body.meta.pace === 1);
      /* v0.9.185：A 槽默认整个闸门都不进（不只是豁免在途闸）。
         ⚠️ 首次线上冒烟就抓到：只豁免在途闸、仍让它进 FIFO 队列的话，只要队里有更早的号，
         A 的请求照样被回 wait（实测 zh-CN 拿到 why=fifo、wait=5）。而 A 槽（deepseek 官方端点）
         1133 个任务零限流，让它排队纯属拖慢。
         但也不能一刀切永久豁免：A 真挨了 429 时 learnLimit 会把 RATE_LIMIT.A 从 0 改成非零，
         那时它确实得排队保护——所以「A 是否进闸门」取决于它自己有没有被限流。 */
      /* v0.9.345：D 槽不进 token 闸门 —— 它自己的 RPM/RPD 账本已经管着节流，
         再套一层按 token 的 FIFO 只会把「还有请求额度」的批次白白卡住。
         在途闸同理（那个是防多标签页霸占 B/C 的 token 额度）。
         v0.9.350：E 同理 —— 独占 + 每秒/每分钟闸已在 ePick 里，再套 FIFO 只会互相打架。 */
      const needGate = canPace && pick.which !== 'D' && pick.which !== 'E' && (pick.which !== 'A' || (RATE_LIMIT[pick.which] || 0) > 0);
      const est = needGate ? estTokens(body.messages, pick.which) : 0;
      let tookInflight = false;
      if (needGate) {
        if (pick.which !== 'A') {
          /* 在途闸只用来防止单个 IP 的多标签页霸占 B 的额度 */
          if (!inflightTake(ip)) return sendJson(res, 200, { wait: inflightWait(), slot: pick.which, why: 'inflight' });
          tookInflight = true;
        }
        /* 顺序号：客户端把上次的 q 带回来就沿用旧号（保持先来先出），否则新领一个 */
        let tok = (body.meta && typeof body.meta.q === 'string') ? body.meta.q : '';
        let seq = (tok && Q_WAIT[pick.which] && Q_WAIT[pick.which][tok]) ? Q_WAIT[pick.which][tok].seq : 0;
        /* v0.9.210：!(seq>0) 连 NaN 一起拦（旧账本里可能存着 NaN 序号），新槽位漏初始化也不再死循环 */
        if (!(seq > 0)) {
          if (!Number.isFinite(Q_SEQ[pick.which])) Q_SEQ[pick.which] = 0;
          seq = ++Q_SEQ[pick.which]; tok = qNewTok(pick.which, seq);
        }

        let admitted = false;
        /* 服务端静默等待**累计**封顶 HOLD_MAX_MS（不是每轮 15 秒 × 4 = 60 秒）。
           ⚠️ 前端给内置通道的超时是 105 秒 = 90 秒模型预算 + 15 秒服务端静默排队冗余（v0.9.185）。
           服务端要是能静默等 60 秒，客户端那 15 秒冗余就不够，会出现「替你排了 60 秒、
           模型只剩 45 秒就被 abort」——排队反而制造失败。累计封顶，超了就交回客户端排。 */
        let holdUsed = 0;
        for (let guard = 0; guard < 4; guard++) {
          qSweep(pick.which);
          const head = qMinSeq(pick.which);
          let w = 0, why = 'quota';
          if (seq <= head) {
            /* 轮到我了：先看上游亲口报的余额，没有才回落本地滑窗估算 */
            let qw = quotaWait(pick.which, est);
            if (qw == null) qw = paceCheck(pick.which, est);
            w = qw;
          } else {
            why = 'fifo';
            w = FIFO_POLL + Math.floor(Math.random() * 3);   // 前面还有人：短间隔回来问，队首一走立刻顶上
          }
          if (w <= 0) {
            rateAdd(pick.which, est);   // 预扣：并发请求要看得见彼此，否则一起判定、一起放行、又一起撞墙
            qDrop(pick.which, tok);
            admitted = true;
            break;
          }
          qTouch(pick.which, tok, seq);
          /* 只有「轮到我了、且差得不多」才值得服务端静默等。排在别人后面时等也没意义
             （不知道前面那位要跑多久），直接回短间隔让客户端来问，别白占一条连接。 */
          const wms = w * 1000;
          if (why === 'quota' && holdUsed + wms <= HOLD_MAX_MS && HOLD_N < HOLD_MAX_WAITERS) {
            /* 短等：服务端自己等完再判一次。客户端完全无感——不多一次往返，也不惊群。 */
            HOLD_N++;
            holdUsed += wms;
            try { await sleepMs(wms); } finally { HOLD_N--; }
            continue;
          }
          /* 长等：告诉客户端排多久，让它倒数后把同一批原样重发。
             ⚠️ 用户 9/27 拍板：排再久也不换模型（一集里两个模型语气会不一致），
             所以这里只给 wait，绝不放行去撞 429（那会触发 fallbackToA 换道）。 */
          if (tookInflight) inflightFree(ip);
          return sendJson(res, 200, { wait: w, q: tok, slot: pick.which, why: why });
        }
        if (!admitted) {
          if (tookInflight) inflightFree(ip);
          return sendJson(res, 200, { wait: 10, q: tok, slot: pick.which, why: 'quota' });
        }
      }
      usage.ips[ip] = ipUsed + 1;
      usage.global += 1;
      writeUsage(usage);
      /* v0.9.157：viaB 恒传 0/1（此前走 A 时传 null，旧事件上的 viaB=1 不会被清掉） */
      /* v0.9.193：加 viaC。viaB 语义不动（走 B 记 1），走 C 时 viaC=1、viaB=0，
         这样既有的「viaB=1 即 B 槽」统计口径继续成立，C 用 viaC 单独识别。
         ⚠️ 两个标记记的都是**分流归属**（初次选中谁），不是最终落地模型 ——
         回退会把 e.model 覆写成真正生效的那个，跟既有行为一致。 */
      try {
        const evExtra = { viaB: pick.which === 'B' ? 1 : 0, viaC: pick.which === 'C' ? 1 : 0, viaD: pick.which === 'D' ? 1 : 0, viaE: pick.which === 'E' ? 1 : 0 };
        /* v0.9.350：E 明明勾了这门语言却没走成，把原因记在事件上（busy / lost / dead）。
           只在真降级时才写这个字段，正常走 E 或压根没配 E 的任务不落这个键。 */
        const eoff = eOffReason(cfg, lang, body.meta);
        if (eoff) evExtra.eOff = eoff;
        appendEvent(ip, body.meta, slotModelName, evExtra);
      } catch (e) {} // 行为记录失败不影响翻译主流程
      /* v0.9.132：前端在 meta.json 里声明「本请求期望 JSON 输出」（非 JSON 请求不注入，否则上游会 400） */
      const jsonOpts = (body.meta && body.meta.json) ? { json: 1 } : null;
      /* v0.9.350：E 的批间间隔。只有 E 会进这里；睡的是「距上次请求不足 gapE」的差额，
         最多 gapE 秒（≤30），远小于前端 105 秒预算。此刻 E 只被本任务占着，睡期间没人抢。
         ⚠️ 计时从**发出请求**那一刻算（E_LAST = 发请求时间），不是从响应回来算 ——
            否则「调用耗时 7 秒 + gap 2 秒」会变成 9 秒的真空档，纯浪费。 */
      if (pick.which === 'E') {
        const gapMs = eGapMs(cfg);
        const gapWait = gapMs - (Date.now() - E_LAST.at);
        if (gapWait > 0 && !cliAc.signal.aborted) {
          try { await sleepMs(gapWait); } catch (e20) {}
        }
        /* 客户端在间隔里断开了 → 这次请求根本没发出去，不该记进每分钟窗口 */
        if (!cliAc.signal.aborted) {
          E_LAST.at = Date.now();
          E_RPM.push(E_LAST.at);
        }
      }
      /* v0.9.382：回退链总预算的起算点 —— 从「本请求第一次真正发出模型调用」算起。
         排队与批间隔的空档不计入（那是等待不是计算，与 v0.9.185「排队期间暂停计时」同一原则）。 */
      const chainT0 = Date.now();
      const chainLeft = () => CHAIN_BUDGET_MS - (Date.now() - chainT0);
      try {
        /* v0.9.345：D 走 callModelD —— 它在槽内换 key（额度类错误就换下一个重发同一批，
           前端完全无感）。注意它吃的是**同一份** 90 秒预算，不会因为换 key 就多拿时间。 */
        const out = pick.which === 'D'
          ? await callModelD(cfg, body.messages, undefined, Object.assign({}, jsonOpts, { signal: cliAc.signal, timeoutMs: Math.min(CALL_BUDGET_MS, chainLeft()) }), dTaskId)
          : await callModel(pick.cfg, body.messages, undefined, Object.assign({}, jsonOpts, { signal: cliAc.signal, timeoutMs: Math.min(pick.which === 'E' ? CALL_BUDGET_E_MS : CALL_BUDGET_MS, chainLeft()) }));
        /* v0.9.380：空正文一律当失败 —— 必须排在下面「E 成功」记账之前。
           否则空响应会被记成 E 健康（E_OK / 冷却清零 / 失败计数归零），
           链路明明不出货，调度却一直往它身上派任务，就是这个顺序造成的。
           抛进 catch 后：E 侧 markDead → 本批由回退链（C→B→A）接住，用户无感。 */
        if (modelOutEmpty(out)) {
          const e0 = new Error('Upstream empty content (' + pick.which + ' ' + String(slotModelName || '') + ')');
          e0._empty = 1; e0._status = 200; e0._rl = out && out._rl;
          throw e0;
        }
        /* v0.9.350：E 的成功时间只用于后台健康灯（cookie 掉了要能一眼看出）
           v0.9.357：成功一次就把该任务的连续失败计数清零 —— 否则「2 次才判死」会变成
           「历史上失败过 2 次就死」，跑一整天必然误杀。 */
        if (pick.which === 'E') {
          E_OK.at = Date.now(); E_OK.model = String(slotModelName || '');
          E_COOLDOWN.until = 0;               // v0.9.365：成功一次立刻解除全局冷却（E 已被证明可用）
          const r0 = E_TASK.get(dTaskId);
          if (r0) { r0.fail = 0; r0.on = 1; r0.why = ''; }
        }
        try { if (canPace) { noteQuota(pick.which, out && out._rl); if (out) delete out._rl; } } catch (e13) {}
        try { recordTokens(ip, body.meta, out && out.usage); } catch (e) {} // v0.9.145 token 埋点：失败一律静默
        /* v0.9.183：按真实消耗修正预扣（只补正差额，实际比预估少的部分随滑窗自然滑出），
           并把本批输出喂给该槽位的 EMA，让下一批预估更准 */
        try {
          if (needGate) {
            /* ⚠️ 只补正「真实消耗 − 预扣」。A 槽默认不进闸门（est=0），这里也必须同步跳过，
               否则会把没预扣过的 est 当成预扣减掉，账本被冲成负数。 */
            const tk = usageTokens(out && out.usage);
            if (tk) {
              rateAdd(pick.which, tk.tin + tk.tout - est);
              const ema = RATE_OUT_EMA[pick.which] || 0;
              RATE_OUT_EMA[pick.which] = ema ? ema * 0.7 + tk.tout * 0.3 : tk.tout;
            }
            /* v0.9.185：实测用量超过了「以为的额度」却没挨限流 → 说明额度被上调了
               （用户在 OpenAI 后台提了额）。只收紧不放宽会把它永久锁死在旧值上。 */
            const usedNow = rateUsed(pick.which);
            if (RATE_LIMIT[pick.which] > 0 && usedNow > RATE_LIMIT[pick.which]) {
              RATE_LIMIT[pick.which] = Math.round(usedNow / RATE_SAFE);
            }
          }
        } catch (e10) {}
        /* v0.9.157：本次实际生效的模型名回传前端。分流只在服务端发生，前端原本无从得知
           自己这次用的是 A 还是 B，只能靠后台 events 反推（而后台记账又有延迟/去重问题）。
           模型名是专有名词，不需要进界面字典，直接原样输出。
           v0.9.347：D 槽在 callModelD 里已经把真实档位写进 _used（锁档/降档后可能与
           事件里记的不同），这里不能再无条件覆写，否则前端会显示一个没用过的模型名。 */
        try { if (out && typeof out === 'object' && !out._used) out._used = String(slotModelName || ''); } catch (e9) {}
        return sendJson(res, 200, out); // 原样透传 OpenAI 兼容响应
      } catch (e) {
        /* v0.9.345：D 槽 RPM 满但当日额度还在 → 回 wait 让前端等几十秒，绝不降级。
           注意这一条要放在「学限额」之前：它不是失败，是节流。 */
        if (e && e._dWait) return sendJson(res, 200, { wait: e._dWait, slot: 'D', why: 'rpm' });
        /* v0.9.350：E 失败 = 这个任务不再用 E（本批照常走下面的 C/B/A 回退）。
           不标记的话，后面每一批都白等一次 90 秒超时。
           ⚠️ 客户端主动断开（关标签页 / 前端放弃）不算 E 挂 —— 那种情况任务本身已经停了，
              标成 dead 会让「重新开始的任务」也拿不到 E。 */
        if (pick.which === 'E' && !cliAc.signal.aborted) { try { eTaskFail(dTaskId, e); } catch (e21) {} }
        /* v0.9.183：429 的报错文案里带着上游的限额，学下来。硬编码的额度迟早会变，
           而这个数字是上游亲口报的——哪天 A 槽也开始限流了，不用改代码就能自动生效。
           v0.9.345：D 槽跳过这套 token 账本，它的额度是请求数，学来只会污染 RATE_LIMIT.D。 */
        try {
          if (canPace && pick.which !== 'D') {
            learnLimit(pick.which, e && e.message);
            noteQuota(pick.which, e && e._rl);
            /* 429 时余额基本见底；上游若给了 Retry-After，那是最权威的等待时间，优先于我们算的 */
            const ra = Number(e && e._ra) || 0;
            if (ra > 0) RETRY_UNTIL[pick.which] = Date.now() + ra;
            if (e && e._status === 429) QUOTA[pick.which] = { rem: 0, at: Date.now() };
          }
        } catch (e11) {}
        /* v0.9.193：C/B 失败且开启回退 → 按 C→B→A 逐级再试（此前只写了 B→A 一条）。
           回退成功后把事件里的模型改写成真正生效的那个，并记 fallback 次数。
           ⚠️ 每一级回退都走自己的槽位记账：记到原槽位上会凭空吃掉它的额度（原槽正堵着，等于火上浇油）。
           v0.9.345：D 也走这条链，且带上 lang —— D 是「全部语言」的槽，落到 C/B 时要尊重
           它们各自的分流勾选，不能把没勾给 C 的语言硬塞过去。 */
        if (cfg.fallbackToA && pick.which !== 'A') {
          let lastErr = e;
          for (const fb of fallbackChain(cfg, pick.which, lang)) {
            /* v0.9.381：剩余预算不够跑完一级 → 不再往下回退，把首个错误原样交给前端。
               继续下去只会让「服务端 390 秒 / 前端 135 秒」的错配把这次调用注定丢弃。 */
            if (chainLeft() < 15000) break;
            try {
              const slotFb = slotCfg(cfg, fb);
              const outF = await callModel(slotFb, body.messages, undefined, Object.assign({}, jsonOpts, { signal: cliAc.signal, timeoutMs: Math.min(CALL_BUDGET_MS, chainLeft()) }));
              /* v0.9.380：回退这一级也可能返空。不判的话会把这个「空成功」当成回退成功发给前端，
                 于是一边记着「已回退到 B」，一边让用户去看一批空内容。 */
              if (modelOutEmpty(outF)) {
                const eF = new Error('Upstream empty content (' + fb + ' ' + String(slotFb.model || '') + ')');
                eF._empty = 1;
                lastErr = eF;
                continue;
              }
              try {
                markEvent(ip, Object.assign({}, body.meta || {}, {
                  model: slotModelName, usedModel: slotFb.model, msg: String(e.message || '').slice(0, 200)
                }), 'fallback');
              } catch (e2) {}
              try { recordTokens(ip, body.meta, outF && outF.usage); } catch (e4) {} // v0.9.145：回退也算真实开销
              try {
                if (canPace) {
                  const tkF = usageTokens(outF && outF.usage);
                  if (tkF) rateAdd(fb, tkF.tin + tkF.tout);
                }
                try { noteQuota(fb, outF && outF._rl); if (outF) delete outF._rl; } catch (e14) {}
              } catch (e12) {}
              /* v0.9.156：回退必须让用户看得见。此前静默降级——界面无任何提示，
                 后台又因为上面那条记账问题显示的是 A 的名字，用户只能判定「分流没生效」。 */
              try { if (outF && typeof outF === 'object') outF._fb = { from: slotModelName, to: slotFb.model, msg: String(e.message || '').slice(0, 200) }; } catch (e5) {}
              try { if (outF && typeof outF === 'object') outF._used = String(slotFb.model || ''); } catch (e6) {} // v0.9.157：回退后真正生效的是 fb
              return sendJson(res, 200, outF);
            } catch (e3) { lastErr = e3; }
          }
          /* v0.9.380：空正文用独立错误码 —— 前端据此把它单列成 failEmpty，
             而不是靠散文文案匹配（errEmpty 是多语言文案，非中文界面永远匹配不上）。 */
          return sendJson(res, 502, { error: { code: (lastErr && lastErr._empty) ? 'upstream_empty' : 'upstream_error', message: 'Default model call failed: ' + lastErr.message } });
        }
        return sendJson(res, 502, { error: { code: (e && e._empty) ? 'upstream_empty' : 'upstream_error', message: 'Default model call failed: ' + e.message } });
      } finally {
        if (tookInflight) inflightFree(ip); // 成功 / 回退 / 失败，都要把在途名额还回去
      }
    }

    /* 前端生命周期上报（公开轻接口）：翻译完成 / 下载字幕。
       body: {file, lang, model?, ev:'finish'|'download'}。
       云端会话：匹配更新；自带 Key 用户（带 model、无会话）：创建轻量记录（模型/语言/下载可统计，批次与时长不适用）。 */
    if (req.method === 'POST' && u === '/api/event') {
      let body;
      try { body = JSON.parse(await readBody(req, 4 * 1024)); } catch (e) {
        return sendJson(res, 400, { error: { message: 'Request body is not valid JSON' } });
      }
      const ev = String(body.ev || '');
      if (ev !== 'finish' && ev !== 'download' && ev !== 'fail' && ev !== 'copy') {
        return sendJson(res, 400, { error: { message: 'ev must be finish, download, copy or fail' } });
      }
      try { markEvent(clientIp(req), body, ev); } catch (e) {}
      return sendJson(res, 200, { ok: true });
    }

    /* v0.9.244：双语合并页使用记录上报（公开轻接口，与 /api/event 同规格：fire-and-forget）。
       body: {kind:'merge'|'export', src, dst, cues, mode, fmt?, tpl?}
       只收元数据，不收字幕内容；任何字段不认识的一律丢弃，不建脏字段。 */
    if (req.method === 'POST' && u === '/api/merge-event') {
      let mbody;
      try { mbody = JSON.parse(await readBody(req, 4 * 1024)); } catch (e) {
        return sendJson(res, 400, { error: { message: 'Request body is not valid JSON' } });
      }
      try { appendMEvent(clientIp(req), mbody); } catch (e) {}
      return sendJson(res, 200, { ok: true });
    }

    /* v0.9.275：字幕清洗页使用记录上报（公开轻接口，与 /api/merge-event 同规格：fire-and-forget）。
       body: {kind:'clean'|'export', src, cues, mod, del, rules[], fmt?}
       只收元数据，不收字幕内容；任何不认识的字段一律丢弃，不留脏字段。 */
    if (req.method === 'POST' && u === '/api/clean-event') {
      let cbody;
      try { cbody = JSON.parse(await readBody(req, 4 * 1024)); } catch (e) {
        return sendJson(res, 400, { error: { message: 'Request body is not valid JSON' } });
      }
      try { appendCEvent(clientIp(req), cbody); } catch (e) {}
      return sendJson(res, 200, { ok: true });
    }

    /* v0.9.308：八个垂直工具页的统一使用记录上报（公开轻接口，fire-and-forget，同上规格）。
       body: {page:'shift'|'convert'|'extract'|'bilingual'|'repair'|'glossary'|'videosub'|'hanconv',
              act:'check'|'apply'|'edit'|'align'|'convert'|'extract'|'merge'|'split'|'repair'|'replace'|'export',
              cues?, n?, fmt?}
       ⚠️ page 或 act 不在白名单里就整条丢弃（不记账）—— 认不出来的脏数据会污染统计。
       只收元数据，不收字幕内容；不认识的字段一律丢弃。 */
    if (req.method === 'POST' && u === '/api/tool-event') {
      let tbody;
      try { tbody = JSON.parse(await readBody(req, 4 * 1024)); } catch (e) {
        return sendJson(res, 400, { error: { message: 'Request body is not valid JSON' } });
      }
      try { appendTEvent(clientIp(req), tbody); } catch (e) {}
      return sendJson(res, 200, { ok: true });
    }

    /* v0.9.371：用户反馈（公开轻接口，与上面几个埋点同规格：fire-and-forget）。
       body: {type:'bug'|'idea'|'quality'|'other', msg, contact?, page?, lang?, ver?, ua?, vw?, hp?}
       ⚠️ hp 是蜜罐字段：正常用户看不见它（前端永远传空串），机器人会把隐藏字段填满。
          填了就直接回 200 假成功 —— 不落盘、也不告诉对方「你被识破了」。
       ⚠️ 限流在内容校验之前扣：宁可让一条格式错的请求也占一次配额，也不给刷子试错的空间。 */
    if (req.method === 'POST' && u === '/api/feedback') {
      let fbody;
      try { fbody = JSON.parse(await readBody(req, 16 * 1024)); } catch (e) {
        return sendJson(res, 400, { error: { code: 'bad_json', message: 'Request body is not valid JSON' } });
      }
      if (fbody && String(fbody.hp || '').trim()) return sendJson(res, 200, { ok: true, no: 0 });
      const fip = clientIp(req);
      if (!fbRate(fip, Date.now())) {
        return sendJson(res, 429, { error: { code: 'rate', message: 'Too many feedback submissions. Please try again later.' } });
      }
      let out;
      try { out = appendFeedback(fip, fbody); } catch (e) { out = { ok: false, code: 'io' }; }
      if (!out.ok) {
        if (out.code === 'too_short') return sendJson(res, 400, { error: { code: 'too_short', message: 'Feedback is too short.' } });
        if (out.code === 'too_long') return sendJson(res, 400, { error: { code: 'too_long', message: 'Feedback is too long.' } });
        if (out.code === 'bad_type') return sendJson(res, 400, { error: { code: 'bad_type', message: 'Unknown feedback type.' } });
        return sendJson(res, 500, { error: { code: 'io', message: 'Could not save feedback.' } });
      }
      return sendJson(res, 200, { ok: true, no: out.no, dup: !!out.dup });
    }

    /* 管理登录 */
    if (req.method === 'POST' && u === '/api/admin/login') {
      let body;
      try { body = JSON.parse(await readBody(req, 64 * 1024)); } catch (e) {
        return sendJson(res, 400, { error: { message: '请求体不是合法 JSON' } });
      }
      const pw = String(body.password || '');
      if (!pw) return sendJson(res, 400, { error: { message: '请输入密码' } });
      const now = Date.now();
      const ip = clientIp(req);
      /* v0.9.285：先看是否已被锁。锁定期内不校验密码，直接 429 */
      const left = loginLocked(now, ip);
      if (left !== null) {
        const hours = Math.max(1, Math.ceil(left / (60 * 60 * 1000)));
        const body2 = JSON.stringify({
          error: { message: '密码连续输错 3 次，已锁定 24 小时（约 ' + hours + ' 小时后自动解锁）' }
        });
        res.writeHead(429, {
          'Content-Type': 'application/json; charset=utf-8',
          'Retry-After': String(Math.ceil(left / 1000))
        });
        return res.end(body2);
      }
      const cfg = readConfig();
      if (!cfg.adminHash) {
        // 首次部署：以本次登录密码初始化为管理密码（部署后请尽快登录一次）
        cfg.adminHash = sha256(pw);
        writeConfig(cfg);
        return sendJson(res, 200, { token: newToken(), firstRun: true });
      }
      if (sha256(pw) === cfg.adminHash) {
        loginReset(ip);
        return sendJson(res, 200, { token: newToken() });
      }
      loginBump(now, ip);
      const tryLeft = Math.max(0, LOGIN_MAX_FAIL - loginIp.get(ip).n);
      return sendJson(res, 401, {
        error: { message: '密码错误，还可尝试 ' + tryLeft + ' 次（连续 3 次输错将锁定 24 小时）' }
      });
    }

    /* 以下管理接口需 token */
    if (u.startsWith('/api/admin/')) {
      if (!authed(req)) return sendJson(res, 401, { error: { message: '未登录或会话已过期，请重新登录' } });

      /* v0.9.371：后台未读徽章。单独一个极轻接口 —— 后台每 60 秒探一次，
         只读 feedback.json 算两个数，不扫 events。 */
      if (req.method === 'GET' && u === '/api/admin/feedback/badge') {
        const items = readFB().items;
        const today = todayStr();
        return sendJson(res, 200, {
          unread: items.filter(e => e.status === 'new').length,
          today: items.filter(e => dateOfTs(e.t) === today).length
        });
      }

      /* v0.9.371：反馈列表（?status=&q=&page=&size=）
         · status 只认四档白名单，认不出按「全部」处理（不报错，后台切错档不该白屏）
         · q 在内容 / 联系方式 / 页面上做不区分大小写的包含匹配
         · ip 一律打码返回，原值只有服务端有 */
      if (req.method === 'GET' && u === '/api/admin/feedback') {
        let q = {};
        try { q = Object.fromEntries(new URL('http://x' + req.url).searchParams); } catch (e) {}
        const all = readFB().items;
        const st = String(q.status || 'all');
        const kw = String(q.q || '').trim().toLowerCase();
        let rows = all.slice().reverse();
        if (Object.prototype.hasOwnProperty.call(FB_STATUS, st)) rows = rows.filter(e => e.status === st);
        if (kw) {
          rows = rows.filter(e => ((e.msg || '') + '\n' + (e.contact || '') + '\n' + (e.page || ''))
            .toLowerCase().indexOf(kw) >= 0);
        }
        const total = rows.length;
        const size = Math.min(100, Math.max(1, parseInt(q.size, 10) || 20));
        const pages = Math.max(1, Math.ceil(total / size));
        const page = Math.min(pages, Math.max(1, parseInt(q.page, 10) || 1));
        const today = todayStr();

        let evs = [];
        try { evs = readEvents().events; } catch (e) {}
        const items = rows.slice((page - 1) * size, page * size).map(e => {
          const near = fbNear(evs, e.ip, e.t || 0);
          return {
            id: e.id, no: e.no, t: e.t, type: e.type, msg: e.msg, contact: e.contact,
            page: e.page, lang: e.lang, ver: e.ver, vw: e.vw, ua: e.ua,
            ip: fbMaskIp(e.ip), status: e.status, note: e.note, repliedAt: e.repliedAt,
            near: near.n, nearFail: near.fail
          };
        });

        const byType = {};
        Object.keys(FB_TYPES).forEach(k => { byType[k] = all.filter(e => e.type === k).length; });
        return sendJson(res, 200, {
          total: total, all: all.length,
          unread: all.filter(e => e.status === 'new').length,
          today: all.filter(e => dateOfTs(e.t) === today).length,
          done: all.filter(e => e.status === 'done').length,
          spam: all.filter(e => e.status === 'spam').length,
          byType: byType,
          page: page, size: size, pages: pages,
          items: items
        });
      }

      /* v0.9.371：改状态 / 写备注。status 只认四档；note 覆盖式写入（后台是一个文本框）。 */
      if (req.method === 'POST' && u === '/api/admin/feedback/status') {
        let sbody;
        try { sbody = JSON.parse(await readBody(req, 16 * 1024)); } catch (e) {
          return sendJson(res, 400, { error: { code: 'bad_json', message: '请求体不是合法 JSON' } });
        }
        const id = String((sbody && sbody.id) || '');
        const to = String((sbody && sbody.status) || '');
        if (!Object.prototype.hasOwnProperty.call(FB_STATUS, to)) {
          return sendJson(res, 400, { error: { code: 'bad_status', message: '未知状态' } });
        }
        const db = readFB();
        const it = db.items.find(x => x.id === id);
        if (!it) return sendJson(res, 404, { error: { code: 'not_found', message: '反馈不存在（可能已被归档）' } });
        it.status = to;
        if (sbody.note !== undefined) it.note = fbClean(sbody.note, 300);
        if (to === 'done' || to === 'doing') it.repliedAt = Date.now();
        writeFB(db);
        return sendJson(res, 200, { ok: true, unread: db.items.filter(e => e.status === 'new').length });
      }

      if (req.method === 'GET' && u === '/api/admin/config') {
        const cfg = readConfig();
        const usage = readUsage();
        return sendJson(res, 200, {
          provider: cfg.provider, base: cfg.base, model: cfg.model,
          keySet: !!cfg.key,
          keyMask: cfg.key ? (cfg.key.slice(0, 4) + '…' + cfg.key.slice(-4)) : '',
          extraParams: normParams(cfg.extraParams),
          provider2: cfg.provider2 || '', base2: cfg.base2 || '', model2: cfg.model2 || '',
          keySet2: !!cfg.key2,
          keyMask2: cfg.key2 ? (cfg.key2.slice(0, 4) + '…' + cfg.key2.slice(-4)) : '',
          extraParams2: normParams(cfg.extraParams2),
          langModelB: Array.isArray(cfg.langModelB) ? cfg.langModelB.slice() : [],
          /* v0.9.193：模型 C 同结构返回（后缀 3）。langModelC 空数组 = C 不接管任何语言 */
          provider3: cfg.provider3 || '', base3: cfg.base3 || '', model3: cfg.model3 || '',
          keySet3: !!cfg.key3,
          keyMask3: cfg.key3 ? (cfg.key3.slice(0, 4) + '…' + cfg.key3.slice(-4)) : '',
          extraParams3: normParams(cfg.extraParams3),
          langModelC: Array.isArray(cfg.langModelC) ? cfg.langModelC.slice() : [],
          /* v0.9.345：D 槽（Gemini 免费池）。key 只回掩码与今日用量，明文绝不出服务端 */
          provider4: cfg.provider4 || '', base4: cfg.base4 || '', model4: cfg.model4 || '',
          models4: dModelsRaw(cfg),     // v0.9.347：模型池（含停用的档，后台要能编辑/重新启用）
          /* v0.9.361：每把 key 的模型与备注。老配置在这里已经被摊平成
             「每把 key 各挂同一份 models4」，后台直接按新结构渲染即可，不需要自己判老新。 */
          keyModels4: dSlotsRaw(cfg),
          extraParams4: normParams(cfg.extraParams4),
          langModelDAll: cfg.langModelDAll !== false,
          langModelD: Array.isArray(cfg.langModelD) ? cfg.langModelD.slice() : [],
          rpmD: cfg.rpmD || 15, rpdD: cfg.rpdD || 1500,
          hourlyD: cfg.hourlyD || 0, dPool: dPoolStatus(cfg),
          dKeys: dKeyStatus(cfg), dDate: ptDateStr(),
          /* v0.9.350：E 槽（网页 Gemini 独占通道）。key 只回掩码，明文绝不出服务端 */
          provider5: cfg.provider5 || '', base5: cfg.base5 || '', model5: cfg.model5 || '',
          keySet5: !!cfg.key5,
          keyMask5: cfg.key5 ? (cfg.key5.slice(0, 4) + '…' + cfg.key5.slice(-4)) : '',
          extraParams5: normParams(cfg.extraParams5),
          langModelE: Array.isArray(cfg.langModelE) ? cfg.langModelE.slice() : [],
          rpmE: (typeof cfg.rpmE === 'number' && Number.isFinite(cfg.rpmE)) ? cfg.rpmE : 8,
          gapE: (typeof cfg.gapE === 'number' && Number.isFinite(cfg.gapE)) ? cfg.gapE : 2,
          eOffHours: cfg.eOffHours || '',
          eCooldownMin: (typeof cfg.eCooldownMin === 'number' && Number.isFinite(cfg.eCooldownMin)) ? cfg.eCooldownMin : 30,
          eBridgeUrl: cfg.eBridgeUrl || '',
          eStat: eStatus(cfg),
          fallbackToA: cfg.fallbackToA !== false,
          perIpDaily: cfg.perIpDaily, globalDaily: cfg.globalDaily,
          temperature: (typeof cfg.temperature === 'number' && Number.isFinite(cfg.temperature)) ? cfg.temperature : 0.2,
          publicUrl: cfg.publicUrl || '',
          analyticsId: cfg.analyticsId || '',
          usedToday: usage.global, usedIps: Object.keys(usage.ips).length
        });
      }

      /* 使用行为记录：统计汇总 + 事件流
         ?page=N&size=20 → 分页模式（v0.9.42：默认 20 条/页，最新在第 1 页；size 上限 100）
         ?limit=N → 旧兼容（最近 N 条一次性返回，上限 500，默认 100） */
      if (req.method === 'GET' && u === '/api/admin/events') {
        let q = {};
        try { q = Object.fromEntries(new URL('http://x' + req.url).searchParams); } catch (e) {}
        const db = readEvents();
        const all = db.events;
        const today = todayStr();
        const todays = all.filter(e => dateOfTs(e.t) === today);
        const cnt = (arr, key) => {
          const m = new Map();
          for (const e of arr) { const k = e[key] || '(空)'; m.set(k, (m.get(k) || 0) + 1); }
          return [...m.entries()].sort((a, b) => b[1] - a[1]).slice(0, 10).map(([name, n]) => ({ name, n }));
        };
        const base = {
          total: all.length,
          today: {
            count: todays.length,
            ips: new Set(todays.map(e => e.ip)).size,
            batches: todays.reduce((s, e) => s + (e.batches || 1), 0),
            finished: todays.filter(e => e.finishedAt && dateOfTs(e.finishedAt) === today).length,
            downloaded: todays.filter(e => e.downloadedAt && dateOfTs(e.downloadedAt) === today).length,
            copied: todays.filter(e => e.copiedAt && dateOfTs(e.copiedAt) === today).length,   // v0.9.298：复制也是拿到结果
            failed: todays.filter(e => e.failedAt && dateOfTs(e.failedAt) === today).length,
            /* v0.9.373：今日各槽的批次数（后台顶部 chip）。自带 Key 的记录不进这本账（没走本站槽位）。 */
            slots: slotTally(todays)
          },
          topFiles: cnt(all, 'file'),
          topLangs: cnt(all, 'lang'),
          topSrcs: cnt(all.filter(e => e.src), 'src'),   // v0.9.179: auto vs manually-picked source language
          topModels: cnt(all.filter(e => e.model), 'model'),
          topFails: cnt(all.filter(e => e.failMsg), 'failMsg'),
          /* v0.9.374：全时段的「下载/复制次数」（事件上的累计计数）。
             ⚠️ today.downloaded 是**任务数**（今天有过下载动作的记录条数），
                同一任务今天下 3 次只算 1 —— 它统计不了「次数」：
                事件只存最后一次 downloadedAt，无法把累计数按天拆开。
                所以后台文案必须写「N 个任务」，次数看这两个字段。 */
          dlTotal: all.reduce((s, e) => s + (Number(e.downloads) || 0), 0),
          cpTotal: all.reduce((s, e) => s + (Number(e.copies) || 0), 0),
          /* v0.9.244：导出格式分布。⚠️ 不能对 dlFmt 做 cnt —— dlFmt 只是「最后一次」，
             同一任务先下 srt 再下 ass 会被覆盖成一条；分布必须读累计计数（dlSrt/dlVtt/…）。 */
          dlFmts: Object.keys(DL_FMT)
            .map(k => ({ name: k, n: all.reduce((s, e) => s + (Number(e[DL_FMT_FIELD[k]]) || 0), 0) }))
            .filter(x => x.n > 0).sort((a, b) => b.n - a.n)
        };
        const newest = all.slice().reverse(); // 最新在前（倒序拷贝，不动存储的追加序数组）
        /* v0.9.373：每条带上「用了哪些槽、各几批」。派生只在这里做一次，后台只负责上色 —— 
           两边各算一遍迟早会漂（后台按 via*、服务端按 sb*，同一行能看出两个答案）。 */
        const withSlot = list => list.map(e => {
          const m = evSlotMix(e);
          return Object.assign({}, e, { slot: m.mix, slotExact: m.exact });
        });
        if (q.page !== undefined) {
          const size = Math.min(100, Math.max(1, parseInt(q.size, 10) || 20));
          const pages = Math.max(1, Math.ceil(all.length / size));
          const page = Math.min(pages, Math.max(1, parseInt(q.page, 10) || 1));
          return sendJson(res, 200, Object.assign(base, {
            page, size, pages,
            events: withSlot(newest.slice((page - 1) * size, page * size))
          }));
        }
        const qLimit = Math.min(500, Math.max(1, parseInt(q.limit, 10) || 100));
        return sendJson(res, 200, Object.assign(base, { events: withSlot(newest.slice(0, qLimit)) }));
      }

      /* v0.9.244：双语合并页使用记录（独立卡片，与翻译事件分开统计）
         ?page=N&size=20 → 分页；汇总只认 kind='export' 的记录（只有导出才有格式与模板） */
      if (req.method === 'GET' && u === '/api/admin/merge-events') {
        let q = {};
        try { q = Object.fromEntries(new URL('http://x' + req.url).searchParams); } catch (e) {}
        const all = readMEvents().events;
        const today = todayStr();
        const todays = all.filter(e => dateOfTs(e.t) === today);
        const exp = all.filter(e => e.kind === 'export');
        /* 文件名分布：一份合并涉及原文/译文两个文件，两个都算（看的是「哪些字幕在被处理」） */
        const m = new Map();
        for (const e of all) {
          for (const k of ['src', 'dst']) {
            const n = e[k]; if (!n) continue;
            m.set(n, (m.get(n) || 0) + 1);
          }
        }
        const base = {
          total: all.length,
          today: {
            count: todays.length,
            ips: new Set(todays.map(e => e.ip)).size,
            merged: todays.filter(e => e.kind === 'merge').length,
            exported: todays.filter(e => e.kind === 'export').length,
            copied: todays.filter(e => e.kind === 'copy').length
          },
          topFiles: [...m.entries()].sort((a, b) => b[1] - a[1]).slice(0, 10).map(([name, n]) => ({ name, n })),
          topFmts: countTop(exp.filter(e => e.fmt), 'fmt'),
          topTpls: countTop(exp.filter(e => e.tpl), 'tpl')
        };
        const newest = all.slice().reverse();
        if (q.page !== undefined) {
          const size = Math.min(100, Math.max(1, parseInt(q.size, 10) || 20));
          const pages = Math.max(1, Math.ceil(all.length / size));
          const page = Math.min(pages, Math.max(1, parseInt(q.page, 10) || 1));
          return sendJson(res, 200, Object.assign(base, {
            page, size, pages,
            events: newest.slice((page - 1) * size, page * size)
          }));
        }
        const qLimit = Math.min(500, Math.max(1, parseInt(q.limit, 10) || 100));
        return sendJson(res, 200, Object.assign(base, { events: newest.slice(0, qLimit) }));
      }

      /* v0.9.275：字幕清洗页使用记录（独立于上面两块，字段是清洗页独有的一套） */
      if (req.method === 'GET' && u === '/api/admin/clean-events') {
        let q = {};
        try { q = Object.fromEntries(new URL('http://x' + req.url).searchParams); } catch (e) {}
        const all = readCEvents().events;
        const today = todayStr();
        const todays = all.filter(e => dateOfTs(e.t) === today);
        const exp = all.filter(e => e.kind === 'export');
        /* 规则 TOP：一条改动可能同时命中多条规则（tags 是数组），每条规则各计一次 */
        const rm = new Map();
        for (const e of all) {
          for (const r of (e.rules || [])) rm.set(r, (rm.get(r) || 0) + 1);
        }
        const base = {
          total: all.length,
          today: {
            count: todays.length,
            ips: new Set(todays.map(e => e.ip)).size,
            cleaned: todays.filter(e => e.kind === 'clean').length,
            exported: todays.filter(e => e.kind === 'export').length,
            copied: todays.filter(e => e.kind === 'copy').length
          },
          topFiles: countTop(all.filter(e => e.src), 'src'),
          topRules: [...rm.entries()].sort((a, b) => b[1] - a[1]).slice(0, 10).map(([name, n]) => ({ name, n })),
          topFmts: countTop(exp.filter(e => e.fmt), 'fmt')
        };
        const newest = all.slice().reverse();
        if (q.page !== undefined) {
          const size = Math.min(100, Math.max(1, parseInt(q.size, 10) || 20));
          const pages = Math.max(1, Math.ceil(all.length / size));
          const page = Math.min(pages, Math.max(1, parseInt(q.page, 10) || 1));
          return sendJson(res, 200, Object.assign(base, {
            page, size, pages,
            events: newest.slice((page - 1) * size, page * size)
          }));
        }
        const qLimit = Math.min(500, Math.max(1, parseInt(q.limit, 10) || 100));
        return sendJson(res, 200, Object.assign(base, { events: newest.slice(0, qLimit) }));
      }

      /* v0.9.308：六个垂直工具页的统一使用记录。
         与上面三本账平级、独立一个文件；返回里多一块 byPage —— 后台要靠它横向对比
         「八个 SEO 入口哪一页最忙」，只看总数等于没看。 */
      if (req.method === 'GET' && u === '/api/admin/tool-events') {
        let q = {};
        try { q = Object.fromEntries(new URL('http://x' + req.url).searchParams); } catch (e) {}
        const all = readTEvents().events;
        const today = todayStr();
        const todays = all.filter(e => dateOfTs(e.t) === today);
        /* 按页汇总：count + 独立 IP + 导出数 + 今日数。
           ⚠️ 八个页面名在这里补齐（哪怕一条记录都没有也要出现），
              否则后台表格会随数据漂移 —— 昨天没人的页今天突然没名字，看着像坏了。 */
        const pm = new Map();
        for (const p of Object.keys(TOOL_PAGE)) pm.set(p, { page: p, n: 0, ips: new Set(), exported: 0, today: 0 });
        for (const e of all) {
          const row = pm.get(e.page);
          if (!row) continue;
          row.n++;
          if (e.ip) row.ips.add(e.ip);
          if (e.act === 'export') row.exported++;
          if (dateOfTs(e.t) === today) row.today++;
        }
        const byPage = [...pm.values()]
          .sort((a, b) => b.n - a.n)
          .map(r => ({ page: r.page, n: r.n, ips: r.ips.size, exported: r.exported, today: r.today }));
        const base = {
          total: all.length,
          today: {
            count: todays.length,
            ips: new Set(todays.map(e => e.ip)).size,
            exported: todays.filter(e => e.act === 'export').length
          },
          byPage: byPage,
          topActs: countTop(all, 'act', 12),
          topFmts: countTop(all.filter(e => e.fmt), 'fmt')
        };
        const newest = all.slice().reverse();
        if (q.page !== undefined) {
          const size = Math.min(100, Math.max(1, parseInt(q.size, 10) || 20));
          const pages = Math.max(1, Math.ceil(all.length / size));
          const page = Math.min(pages, Math.max(1, parseInt(q.page, 10) || 1));
          return sendJson(res, 200, Object.assign(base, {
            page, size, pages,
            events: newest.slice((page - 1) * size, page * size)
          }));
        }
        const qLimit = Math.min(500, Math.max(1, parseInt(q.limit, 10) || 100));
        return sendJson(res, 200, Object.assign(base, { events: newest.slice(0, qLimit) }));
      }

      if (req.method === 'POST' && u === '/api/admin/config') {
        let body;
        try { body = JSON.parse(await readBody(req, 256 * 1024)); } catch (e) {
          return sendJson(res, 400, { error: { message: '请求体不是合法 JSON' } });
        }
        const cfg = readConfig();
        if (typeof body.base === 'string') cfg.base = body.base.trim();
        if (typeof body.model === 'string') cfg.model = body.model.trim();
        if (typeof body.provider === 'string') cfg.provider = body.provider.trim();
        if (typeof body.key === 'string' && body.key.trim() !== '') cfg.key = body.key.trim(); // 留空 = 保留原 Key
        /* v0.9.119：模型 B（留空 = 不启用，全部语言走 A）；clearKey2 用于「清空模型 B」 */
        if (typeof body.base2 === 'string') cfg.base2 = body.base2.trim();
        if (typeof body.model2 === 'string') cfg.model2 = body.model2.trim();
        if (typeof body.provider2 === 'string') cfg.provider2 = body.provider2.trim();
        if (typeof body.key2 === 'string' && body.key2.trim() !== '') cfg.key2 = body.key2.trim();
        if (body.clearKey2) { cfg.key2 = ''; cfg.base2 = ''; cfg.model2 = ''; cfg.provider2 = ''; cfg.extraParams2 = {}; cfg.langModelB = []; }
        if (body.extraParams !== undefined) cfg.extraParams = normParams(body.extraParams);
        if (body.extraParams2 !== undefined) cfg.extraParams2 = normParams(body.extraParams2);
        if (Array.isArray(body.langModelB)) {
          const seen = {};
          cfg.langModelB = body.langModelB
            .map(x => String(x || ''))
            .filter(x => /^[A-Za-z][A-Za-z0-9-]{0,11}$/.test(x) && !seen[x] && (seen[x] = 1));
        }
        /* v0.9.193：模型 C（与 B 同规则；clearKey3 用于「清空模型 C」） */
        if (typeof body.base3 === 'string') cfg.base3 = body.base3.trim();
        if (typeof body.model3 === 'string') cfg.model3 = body.model3.trim();
        if (typeof body.provider3 === 'string') cfg.provider3 = body.provider3.trim();
        if (typeof body.key3 === 'string' && body.key3.trim() !== '') cfg.key3 = body.key3.trim(); // 留空 = 保留原 Key
        if (body.clearKey3) { cfg.key3 = ''; cfg.base3 = ''; cfg.model3 = ''; cfg.provider3 = ''; cfg.extraParams3 = {}; cfg.langModelC = []; }
        if (body.extraParams3 !== undefined) cfg.extraParams3 = normParams(body.extraParams3);
        if (Array.isArray(body.langModelC)) {
          const seenC = {};
          cfg.langModelC = body.langModelC
            .map(x => String(x || ''))
            .filter(x => /^[A-Za-z][A-Za-z0-9-]{0,11}$/.test(x) && !seenC[x] && (seenC[x] = 1));
        }
        /* v0.9.345：模型 D（Gemini 免费池）
           keys4 是数组 —— key4_1/2/3 分别落到下标 0/1/2，留空 = 保留原值（与 A/B/C 同规矩）；
           clearDKey 是按**下标**清单条，clearKey4 是整槽清空。
           ⚠️ 清空中间某个 key 时不重排数组：账本按原始下标记，重排会让 key3 的用量记到 key2 头上。 */
        if (typeof body.base4 === 'string') cfg.base4 = body.base4.trim();
        if (typeof body.provider4 === 'string') cfg.provider4 = body.provider4.trim();
        if (!Array.isArray(cfg.keys4)) cfg.keys4 = [];
        ['1', '2', '3'].forEach((n, idx) => {
          const v = body['key4_' + n];
          if (typeof v === 'string' && v.trim() !== '') {
            while (cfg.keys4.length <= idx) cfg.keys4.push('');
            cfg.keys4[idx] = v.trim();
          }
        });
        /* v0.9.361：模型挂在 key 下面。三把固定槽，下标与 keys4 对齐。
           ⚠️ 模型名只留可见 ASCII —— 它会被拿去拼 JSON 请求，允许空格/引号只会制造无解的 400。
           ⚠️ 老后台页面（浏览器还缓存着旧 admin.html）只会发 models4 —— 当成
              「每把 key 都挂这一份」处理，保存后的行为和升级前完全一致，不会把配置弄丢。 */
        const cleanDModels = (arr) => {
          const seen = {};
          const list = [];
          for (const m of (Array.isArray(arr) ? arr : [])) {
            if (!m || typeof m !== 'object') continue;
            const name = String(m.name == null ? '' : m.name).trim().slice(0, 64);
            if (!name || !/^[A-Za-z0-9][A-Za-z0-9._:\/-]*$/.test(name)) continue;
            if (seen[name]) continue;
            seen[name] = 1;
            list.push({
              name: name,
              rpm: Math.max(1, Math.min(600, Math.floor(+m.rpm || 15))),
              rpd: Math.max(1, Math.min(1000000, Math.floor(+m.rpd || 1500))),
              on: m.on !== false
            });
            if (list.length >= D_MAX_MODELS) break;
          }
          return list;
        };
        if (Array.isArray(body.keyModels4)) {
          const slots = [];
          for (let i = 0; i < 3; i++) {
            const src = body.keyModels4[i] && typeof body.keyModels4[i] === 'object' ? body.keyModels4[i] : {};
            slots.push({
              label: String(src.label == null ? '' : src.label).trim().slice(0, 24),
              on: src.on !== false,
              models: cleanDModels(src.models)
            });
          }
          cfg.keyModels4 = slots;
        } else if (Array.isArray(body.models4)) {
          const list = cleanDModels(body.models4);
          cfg.keyModels4 = [0, 1, 2].map(() => ({
            label: '', on: true, models: list.map(m => Object.assign({}, m))
          }));
        } else if (typeof body.model4 === 'string' && body.model4.trim()) {
          /* 只发单模型字段 = 浏览器还在用更早的后台页。把三把 key 都收敛成这一档，
             否则用户改了模型名、保存成功，实际却还在用模型池里的旧名字 —— 最难查的一类。 */
          const one = { name: body.model4.trim(), rpm: 15, rpd: 1500, on: true };
          cfg.keyModels4 = [0, 1, 2].map(() => ({ label: '', on: true, models: [Object.assign({}, one)] }));
        }
        /* 兼容字段（models4 / model4 / rpmD / rpdD）跟「第一把配了模型的 key」走。
           老代码、老前端、slotModelName 的兜底都读它们。 */
        const firstSlot = (() => {
          const keys = Array.isArray(cfg.keys4) ? cfg.keys4 : [];
          const slots = Array.isArray(cfg.keyModels4) ? cfg.keyModels4 : [];
          for (let i = 0; i < 3; i++) {
            if (String(keys[i] || '').trim() && slots[i] && slots[i].models.length) return slots[i];
          }
          for (let i = 0; i < 3; i++) if (slots[i] && slots[i].models.length) return slots[i];
          return null;
        })();
        if (firstSlot) {
          cfg.models4 = firstSlot.models.map(m => ({
            name: m.name, rpm: m.rpm, rpd: m.rpd, on: m.on
          }));
          cfg.model4 = firstSlot.models[0].name;
          cfg.rpmD = firstSlot.models[0].rpm;
          cfg.rpdD = firstSlot.models[0].rpd;
        } else {
          cfg.models4 = [];
          cfg.model4 = '';
        }
        if (Number.isFinite(+body.clearDKey)) {
          const i = Math.floor(+body.clearDKey);
          if (i >= 0 && i < 3) {
            while (cfg.keys4.length <= i) cfg.keys4.push('');
            cfg.keys4[i] = '';
            /* 该位置的用量也归零：换了新 key 还背着旧 key 的用量，等于一上来就少半天额度。
               v0.9.361：只清**这把 key 挂的**模型格（含停用档），别把别的 key 上的同名格清掉。 */
            try {
              const q = dRead();
              for (const m of dSlotModelsAll(cfg, i)) delete q.cells[dCellKey(i, m.name)];
              dWrite(q);
            } catch (e) {}
            for (const k in D_RPM) if (k.indexOf(i + '|') === 0) delete D_RPM[k];
          }
        }
        if (body.clearKey4) {
          cfg.keys4 = []; cfg.base4 = ''; cfg.model4 = ''; cfg.models4 = []; cfg.provider4 = '';
          cfg.keyModels4 = [];
          cfg.extraParams4 = {}; cfg.langModelD = [];
        }
        if (body.extraParams4 !== undefined) cfg.extraParams4 = normParams(body.extraParams4);
        if (body.langModelDAll !== undefined) cfg.langModelDAll = !!body.langModelDAll;
        if (Array.isArray(body.langModelD)) {
          const seenD = {};
          cfg.langModelD = body.langModelD
            .map(x => String(x || ''))
            .filter(x => /^[A-Za-z][A-Za-z0-9-]{0,11}$/.test(x) && !seenD[x] && (seenD[x] = 1));
        }
        if (Number.isFinite(+body.rpmD)) cfg.rpmD = Math.max(1, Math.min(600, Math.floor(+body.rpmD)));
        if (Number.isFinite(+body.rpdD)) cfg.rpdD = Math.max(1, Math.min(1000000, Math.floor(+body.rpdD)));
        /* v0.9.346：整槽每小时名额。0 = 不限（保持老行为），所以下界是 0 不是 1 */
        if (Number.isFinite(+body.hourlyD)) cfg.hourlyD = Math.max(0, Math.min(100000, Math.floor(+body.hourlyD)));
        /* 重置今日计数：误判把某个 key 锁死一整天时的手动出口。连带清整集锁，
           否则刚才被判「额度不够」的任务还会继续走 C/B/A */
        if (body.resetD) {
          try { fs.unlinkSync(DQUOTA_PATH); } catch (e) {}
          for (const k in D_RPM) delete D_RPM[k];
          D_HIT.length = 0;
          D_TASK.clear();
        }
        /* v0.9.350：模型 E（网页 Gemini 独占通道）。与 A/B/C 同规矩：key 留空 = 保留原值，
           clearKey5 = 整槽清空（连带释放占用与限流窗口，否则清完还被旧任务占着）。 */
        if (typeof body.base5 === 'string') cfg.base5 = body.base5.trim();
        if (typeof body.model5 === 'string') cfg.model5 = body.model5.trim();
        if (typeof body.provider5 === 'string') cfg.provider5 = body.provider5.trim();
        if (typeof body.key5 === 'string' && body.key5.trim() !== '') cfg.key5 = body.key5.trim();
        if (body.clearKey5) {
          cfg.key5 = ''; cfg.base5 = ''; cfg.model5 = ''; cfg.provider5 = '';
          cfg.extraParams5 = {}; cfg.langModelE = [];
          try { eClearAll(); } catch (e) {}
        }
        if (body.extraParams5 !== undefined) cfg.extraParams5 = normParams(body.extraParams5);
        if (Array.isArray(body.langModelE)) {
          const seenE = {};
          cfg.langModelE = body.langModelE
            .map(x => String(x || ''))
            .filter(x => /^[A-Za-z][A-Za-z0-9-]{0,11}$/.test(x) && !seenE[x] && (seenE[x] = 1));
        }
        /* rpmE 下界是 0：0 = 不限（与 hourlyD 同一约定）；gapE 上界 30 秒，见 eGapMs */
        if (body.rpmE !== undefined && Number.isFinite(+body.rpmE)) cfg.rpmE = Math.max(0, Math.min(600, Math.floor(+body.rpmE)));
        if (body.gapE !== undefined && Number.isFinite(+body.gapE)) cfg.gapE = Math.max(0, Math.min(30, Math.floor(+body.gapE)));
        /* v0.9.365：E 专属节奏 —— 晚高峰窗口（"a-b" 或空=关）/ 冷却分钟 / 桥接探测地址 */
        if (typeof body.eOffHours === 'string') {
          const m = /^(\d{1,2})-(\d{1,2})$/.exec(body.eOffHours.replace(/\s+/g, ''));
          cfg.eOffHours = (m && +m[1] <= 23 && +m[2] <= 23) ? (+m[1] + '-' + +m[2]) : '';
        }
        if (body.eCooldownMin !== undefined && Number.isFinite(+body.eCooldownMin)) cfg.eCooldownMin = Math.max(0, Math.min(720, Math.floor(+body.eCooldownMin)));
        if (typeof body.eBridgeUrl === 'string') cfg.eBridgeUrl = body.eBridgeUrl.trim();
        if (body.fallbackToA !== undefined) cfg.fallbackToA = !!body.fallbackToA;
        if (Number.isFinite(+body.perIpDaily)) cfg.perIpDaily = Math.max(0, Math.floor(+body.perIpDaily));
        if (Number.isFinite(+body.globalDaily)) cfg.globalDaily = Math.max(0, Math.floor(+body.globalDaily));
        if (body.temperature != null && Number.isFinite(+body.temperature)) cfg.temperature = Math.min(2, Math.max(0, +body.temperature)); // v0.9.91：空值=保持不变
        if (typeof body.publicUrl === 'string') cfg.publicUrl = body.publicUrl.trim().replace(/\/+$/,'');
        if (typeof body.analyticsId === 'string') cfg.analyticsId = body.analyticsId.trim();
        if (typeof body.newPassword === 'string' && body.newPassword !== '') {
          if (body.newPassword.length < 6) return sendJson(res, 400, { error: { message: '新密码至少 6 位' } });
          cfg.adminHash = sha256(body.newPassword);
        }
        writeConfig(cfg);
        return sendJson(res, 200, { ok: true });
      }

      if (req.method === 'POST' && u === '/api/admin/test') {
        const cfg = readConfig();
        let tbody = {};
        try { tbody = JSON.parse(await readBody(req, 64 * 1024)); } catch (e) {}
        /* v0.9.193：连通性测试支持 C 槽；v0.9.345 加 D —— D 是逐个 key **各测一次**，
           因为一个死 key 混在里面，要等真用户撞上才发现，代价是那批字幕白跑一趟。
           ⚠️ 测试不记入 D 的额度账本（管理员手点的几次不该把 key 打到退役）。 */
        const which = (tbody && (tbody.which === 'B' || tbody.which === 'C' || tbody.which === 'D' || tbody.which === 'E')) ? tbody.which : 'A';
        if (which === 'D') {
          const slots = dSlots(cfg);
          if (!cfg.base4 || !slots.length) {
            return sendJson(res, 400, { error: { message: '请先保存模型 D 的 Base URL / 至少一把 key / 每把 key 至少一档模型' } });
          }
          /* v0.9.361：改成按 key 分组，每把 key 测它**自己挂的**模型。
             原来只测「第一个 key × 其余模型」，新结构下 Key 2 可能挂着完全不同的模型，
             拿 Key 1 的结果推断 Key 2 会得出错误结论。
             总次数 = 各 key 的模型数之和；给 12 项上限，3 把 key × 2 档 = 6 次，
             真有人每把挂 6 档也不会把后台点成几分钟没响应。
             ⚠️ 测试不记入 D 的额度账本（管理员手点的几次不该把 key 打到退役）。 */
          const sampleMsg = [{ role: 'user', content: 'Reply with exactly: OK' }];
          const groups = [];
          let budget = 12;
          for (const s of slots) {
            const rows = [];
            for (const m of s.models) {
              if (budget <= 0) {
                rows.push({ name: m.name, ok: false, skipped: 1, err: '测试次数已达上限（12 项）' });
                continue;
              }
              budget--;
              try {
                const out = await callModel(slotCfgD(cfg, s.key, m.name), sampleMsg, 256, { timeoutMs: 20000 });
                const c = out.choices && out.choices[0];
                const sample = c && c.message ? c.message.content : '';
                rows.push({ name: m.name, ok: !!sample, sample: String(sample || '').slice(0, 40),
                  hint: sample ? '' : '模型未返回正文（finish_reason=' + ((c && c.finish_reason) || '?') + '）' });
              } catch (e) {
                rows.push({ name: m.name, ok: false, err: String((e && e.message) || e).slice(0, 160), quota: dQuotaErr(e) });
              }
            }
            groups.push({ i: s.i, label: s.label, results: rows });
          }
          /* keys / models / first 是给缓存里的旧后台页留的兼容字段：
             旧页面只认「每个 key 一个结果 + 一份模型列表」，这里按 key 结果汇总。 */
          const keys = groups.map(g => {
            const bad = g.results.filter(r => !r.ok);
            return bad.length
              ? { i: g.i, ok: false, err: (bad[0].err || bad[0].hint || '失败') }
              : { i: g.i, ok: true, sample: (g.results[0] && g.results[0].sample) || '' };
          });
          const first = (slots[0] && slots[0].models[0] && slots[0].models[0].name) || '';
          return sendJson(res, 200, {
            ok: groups.every(g => g.results.every(r => r.ok)),
            which: 'D', first: first, keys: keys, models: [],
            groups: groups
          });
        }
        const slot = slotCfg(cfg, which);
        if (!(slot.base && slot.model && slot.key)) {
          const hint = which === 'A' ? '请先保存 Base URL / 模型 / API Key'
            : ('请先保存模型 ' + which + ' 的 Base URL / 模型 / API Key');
          return sendJson(res, 400, { error: { message: hint } });
        }
        try {
          // v0.9.44：max_tokens 从 10 提到 256——Gemini 等思考型模型在 10 token 限额下 0 completion，
          //  message.content 字段直接缺失，前端拿到 undefined（误判"模型返回空"）。
          /* v0.9.358：E 走网页桥接，单次实测 17~66 秒，30 秒测试预算必然超时 ——
             后台点「测试」就报 502「连通失败」，看着像通道挂了，其实只是预算太短。
             v0.9.365：E 的正式预算放宽到 120 秒，测试预算同步跟上（与 CALL_BUDGET_E_MS 一致），
             A/B/C 维持 30 秒。 */
          const testBudget = which === 'E' ? 120000 : 30000;
          const out = await callModel(slot, [{ role: 'user', content: 'Reply with exactly: OK' }], 256, { timeoutMs: testBudget });
          const choice = out.choices && out.choices[0];
          const sample = choice && choice.message ? choice.message.content : '';
          const reason = choice ? choice.finish_reason : null;
          const usage = out.usage || null;
          if (sample) return sendJson(res, 200, { ok: true, sample: String(sample).slice(0, 40), reason, usage });
          // v0.9.44：content 缺失时把 finish_reason + usage 暴露给前端，便于定位（思考模型限额、模型名拼错、鉴权失败返回空 body 等）
          return sendJson(res, 200, { ok: false, sample: '', reason, usage, hint: '模型未返回正文（finish_reason=' + (reason||'?') + '，completion_tokens=' + ((usage&&usage.completion_tokens!=null)?usage.completion_tokens:'?') + '）。常见原因：思考型模型 token 全用于 thinking 上限不足、模型名拼错、鉴权失败返回空 body' });
        } catch (e) {
          return sendJson(res, 502, { error: { message: '连通失败：' + e.message } });
        }
      }

      return sendJson(res, 404, { error: { message: 'unknown admin api' } });
    }

    /* SEO：?lang=xx → 301 重定向到语言路径（/en/ 等），保证每种语言只有一个规范 URL */
    if (req.method === 'GET' && req.url.indexOf('?') > -1) {
      try {
        const q = new URL(req.url, 'http://local');
        const lg = q.searchParams.get('lang');
        if (lg && SEO_ROUTE['/' + lg]) {
          q.searchParams.delete('lang');
          const qs = q.searchParams.toString();
          res.writeHead(301, { Location: SEO_PATH[lg] + (qs ? '?' + qs : '') });
          return res.end();
        }
      } catch (e) { /* fallthrough */ }
    }

    /* 静态文件 */
    if (req.method === 'GET' || req.method === 'HEAD') return serveStatic(req, res, u);
    res.writeHead(405); res.end('Method Not Allowed');
  } catch (e) {
    sendJson(res, 500, { error: { message: '服务器内部错误：' + e.message } });
  }
});

ensureData();
server.listen(PORT, '0.0.0.0', () => {
  console.log('SRT 工具服务已启动: http://0.0.0.0:' + PORT + '  (管理后台: /admin.html)');
});
