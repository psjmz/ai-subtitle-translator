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

const ROOT = __dirname;
const DATA_DIR = path.join(ROOT, 'data');
const CONFIG_PATH = path.join(DATA_DIR, 'config.json');
const USAGE_PATH = path.join(DATA_DIR, 'usage.json');
const PORT = Number(process.env.PORT) || 3000;

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
  langModelC: []           // 走模型 C 的目标语言码数组；空 = C 不参与分流
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
  b.subs = db.events.length;   /* 任务数口径：一条事件 = 一次翻译任务 */
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
const RT_FIELD = { 1: 'retryMusic', 2: 'retryAnchor', 3: 'retryCue', 4: 'retryRescue' };
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
const FAIL_FIELD = { trunc: 'failTrunc', json: 'failJson', net: 'failNet', other: 'failOther' };
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
/* 带任务号就以任务号为准；不带（老版本页面）沿用「文件名+语言」，行为不变 */
function evHit(e, ip, f){
  if (e.ip !== ip) return false;
  return f.task ? (e.taskId === f.task) : (e.file === f.file && e.lang === f.lang);
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
      if (src) e.src = src;   // v0.9.179: keep the newest known source language on the record
      if (extra && typeof extra === 'object') Object.assign(e, extra);
      fs.writeFileSync(EVENTS_PATH, JSON.stringify(db), 'utf8');
      return;
    }
    if (now - e.t >= EVENT_DEDUP_MS) break; // 事件按时间序，更早的必不在窗口内
  }
  const ev = { t: now, ip, file, lang, cues, batches: 0, retries: 0, model: mdl };
  if (src) ev.src = src;        // v0.9.179
  if (task) ev.taskId = task;   // v0.9.159：存任务号，后续批次才能归到这一条
  if (extra && typeof extra === 'object') Object.assign(ev, extra);
  bumpRetry(ev, meta.rt);
  if (meta.fwhy) bumpFail(ev, meta.fwhy);
  db.events.push(ev);
  if (db.events.length > EVENTS_MAX) db.events = db.events.slice(-EVENTS_MAX);
  fs.writeFileSync(EVENTS_PATH, JSON.stringify(db), 'utf8');
  /* v0.9.212：累计账本顺带累加。位置很关键——只在「新建事件」这一处加，
     上面那个同会话去重分支（batches+1）提前 return，不会走到这里，
     所以同一任务的第 2/3 批不会把字幕数重复计入。自带 Key 用户进不了本函数，不受影响。 */
  bumpStats({ ip: ip, subs: 1 });
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
        Object.assign(e, dropFields(meta), cueErrFields(meta));
      } else if (ev === 'download') {
        e.downloads = (e.downloads || 0) + 1;
        e.downloadedAt = now;
        /* v0.9.244：导出格式。只在白名单内记账，认不出就不写（绝不信前端字符串）。 */
        const df = pickWL(DL_FMT, meta.fmt);
        if (df) { e.dlFmt = df; e[DL_FMT_FIELD[df]] = (e[DL_FMT_FIELD[df]] || 0) + 1; }
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
  if (ev === 'finish') { lite.finishedAt = now; Object.assign(lite, dropFields(meta), cueErrFields(meta)); }
  /* v0.9.244：自带 Key 用户同样记导出格式（这条记录是本次上报新建的，计数从 1 起） */
  else if (ev === 'download') {
    lite.downloads = 1; lite.downloadedAt = now;
    const lf = pickWL(DL_FMT, meta.fmt);
    if (lf) { lite.dlFmt = lf; lite[DL_FMT_FIELD[lf]] = 1; }
  }
  else if (ev === 'fail') { lite.failedAt = now; lite.failMsg = cleanMsg(meta.msg); }
  else return false;
  db.events.push(lite);
  if (db.events.length > EVENTS_MAX) db.events = db.events.slice(-EVENTS_MAX);
  fs.writeFileSync(EVENTS_PATH, JSON.stringify(db), 'utf8');
  return true;
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
const CUE_ERR_FIELDS = ['cueEmpty','cueMissing','cueDup','cueUnknown','cueBadEntry','cueNoArr','cueOther'];
function cueErrFields(meta){
  const o = {};
  for (const k of CUE_ERR_FIELDS) {
    if (meta[k] != null) o[k] = Math.max(0, Math.min(100000, Math.floor(+meta[k] || 0)));
  }
  return o;
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
/* 模板白名单：ASS 三档 + VTT 四档 + 两档「无模板」（SRT、无样式 VTT） */
const MERGE_TPL = {
  'srt': 'srt', 'vtt': 'vtt',
  'ass-split': 'ass-split', 'ass-stack': 'ass-stack', 'ass-custom': 'ass-custom',
  'vtt-std': 'vtt-std', 'vtt-compact': 'vtt-compact', 'vtt-cinema': 'vtt-cinema', 'vtt-custom': 'vtt-custom'
};
/* 合并页两种模式（v0.9.222）：merge=两份字幕合并；adjust=一份双语字幕拆原文/译文 */
const MERGE_MODE = { merge: 'merge', adjust: 'adjust' };
function readMEvents(){
  try {
    const j = JSON.parse(fs.readFileSync(MEVENTS_PATH, 'utf8'));
    if (Array.isArray(j.events)) return j;
  } catch (e) {}
  return { events: [] };
}
/* kind: 'merge'（合并/拆分完成）| 'export'（导出成文件）。两条都写：
   merge 那条能看出「有人上传了却没导出」（多半是中途卡住），export 那条带格式与模板。 */
function appendMEvent(ip, body){
  const b = (body && typeof body === 'object') ? body : {};
  const kind = (b.kind === 'export') ? 'export' : 'merge';
  const src = cleanName(b.src), dst = cleanName(b.dst);
  if (!src && !dst) return;    // 连文件名都没有（异常/空请求）不记
  const ev = {
    t: Date.now(), ip: String(ip || ''), kind: kind,
    src: src, dst: dst,
    cues: Math.max(0, Math.min(1000000, Math.floor(+b.cues || 0))),
    mode: pickWL(MERGE_MODE, b.mode) || 'merge'
  };
  if (kind === 'export') {
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

/* ---------------- 管理会话（内存 token） ---------------- */
const TOKENS = new Set();
function newToken(){ const tk = crypto.randomBytes(24).toString('hex'); TOKENS.add(tk); return tk; }
function authed(req){ const tk = req.headers['x-admin-token']; return tk && TOKENS.has(tk); }

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
  return (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || req.socket.remoteAddress || 'unknown';
}
const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8',
  '.png': 'image/png', '.svg': 'image/svg+xml', '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8', '.xml': 'application/xml; charset=utf-8'
};
function serveStatic(req, res, urlPath){
  let p = decodeURIComponent(urlPath.split('?')[0]);
  // SEO：robots.txt / sitemap.xml 按当前访问域名动态生成（换域名/部署环境自动适配）
  const baseUrl = publicBase(req);
  if (p === '/robots.txt' && baseUrl) {
    const body = 'User-agent: *\nAllow: /\nDisallow: /admin.html\n\nSitemap: ' + baseUrl + '/sitemap.xml\n';
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(body); return;
  }
  if (p === '/sitemap.xml' && baseUrl) {
    const body = sitemapXml(baseUrl);
    res.writeHead(200, { 'Content-Type': 'application/xml; charset=utf-8' });
    res.end(body); return;
  }
  // SEO 多语言路由：/ = 简中（默认），/en/ /zh-TW/ /ja/ 各自输出对应语言的完整 head
  const lang = SEO_ROUTE[p];
  if (lang) { serveIndexLang(req, res, lang); return; }
  if (p === '/') { serveIndexLang(req, res, 'zh-CN'); return; }
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
const SEO_LANGS = ['zh-CN', 'zh-TW', 'en', 'ja', 'es', 'pt', 'ko', 'de', 'fr', 'id', 'hi', 'th', 'vi', 'ru', 'it', 'ar', 'tr', 'nl', 'pl', 'sv', 'cs', 'uk', 'da', 'fi', 'el', 'he', 'ro'];
const SEO_PATH = { 'zh-CN': '/', 'zh-TW': '/zh-TW/', 'en': '/en/', 'ja': '/ja/', 'es': '/es/', 'pt': '/pt/', 'ko': '/ko/', 'de': '/de/', 'fr': '/fr/', 'id': '/id/', 'hi': '/hi/', 'th': '/th/', 'vi': '/vi/', 'ru': '/ru/', 'it': '/it/', 'ar': '/ar/', 'tr': '/tr/', 'nl': '/nl/', 'pl': '/pl/', 'sv': '/sv/', 'cs': '/cs/', 'uk': '/uk/', 'da': '/da/', 'fi': '/fi/', 'el': '/el/', 'he': '/he/', 'ro': '/ro/' };
const SEO = {
  'zh-CN': {
    htmlLang: 'zh-CN', ogLocale: 'zh_CN', siteName: '随心字幕 AI',
    title: '随心字幕 AI (AI-SRTSub) - 全球好剧随心看，一键生成专属母语字幕',
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
    title: '隨心字幕 AI (AI-SRTSub) - 全球好劇隨心看，一鍵生成專屬母語字幕',
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
    desc: 'ai-srtsub.com is a free AI subtitle translator built for movie fans — no signup, no limits, no watermark. Turn subtitles of foreign films, US & UK series and documentaries into your native language in one click, with automatic timeline alignment. Stop hunting for subs and enjoy global content barrier-free.',
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
    desc: 'ai-srtsub.com es un traductor de subtítulos con IA gratis, hecho para cinéfilos — sin registro. Convierte en un clic los subtítulos de películas extranjeras, series y documentales a tu idioma materno, con alineación automática de tiempos. Deja de buscar subtítulos y disfruta del contenido mundial sin barreras.',
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
    desc: 'ai-srtsub.com é um tradutor de legendas com IA grátis, para fãs de cinema e séries — sem cadastro. Converta em um clique as legendas de filmes estrangeiros, séries americanas e britânicas e documentários para o seu idioma, com alinhamento automático de tempos. Chega de caçar legendas: conteúdo global sem barreiras.',
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
    title: 'AI-SRTSub - 세계 영화·드라마를 내 언어 자막으로 즐기는 AI 자막 번역기',
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
    desc: 'ai-srtsub.com ist ein kostenloser KI-Untertitel-Übersetzer für Filmfans — ohne Anmeldung. Übersetze Untertitel ausländischer Filme, Serien und Dokumentationen mit einem Klick in deine Sprache, mit automatischer Zeitleisten-Ausrichtung. Schluss mit der Untertitel-Suche: Genieße globale Inhalte ohne Sprachbarrieren.',
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
    desc: 'ai-srtsub.com est un traducteur de sous-titres IA gratuit, pensé pour les cinéphiles — sans inscription. Traduisez en un clic les sous-titres de films étrangers, de séries et de documentaires dans votre langue, avec alignement automatique de la timeline. Fini la chasse aux sous-titres — contenu mondial sans barrière.',
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
    desc: 'ai-srtsub.com adalah penerjemah subtitle AI gratis untuk para penikmat film — tanpa perlu daftar. Ubah subtitle film luar negeri, serial Barat, dan dokumenter menjadi bahasa Anda dalam satu klik, dengan penyelarasan timeline otomatis. Berhenti memburu subtitle — nikmati konten global tanpa hambatan bahasa.',
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
    desc: 'ai-srtsub.com फ़िल्म प्रेमियों के लिए बना मुफ़्त AI सबटाइटल अनुवादक है — बिना रजिस्ट्रेशन। विदेशी फ़िल्मों, अमेरिकी-ब्रिटिश सीरीज़ और डॉक्यूमेंट्री के सबटाइटल एक क्लिक में अपनी भाषा में अनुवाद करें, टाइमलाइन अपने आप संरेखित होती है। सबटाइटल ढूँढने की झंझट ख़त्म — भाषा की दीवार के बिना वैश्विक कंटेंट का आनंद लें।',
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
    desc: 'ai-srtsub.com คือเครื่องมือแปลซับไตเติลด้วย AI ฟรี สำหรับสายหนังตัวจริง ไม่ต้องสมัคร แปลซับหนังต่างประเทศ ซีรีส์ฝรั่ง และสารคดี เป็นภาษาของคุณในคลิกเดียว พร้อมจัดแนวไทม์ไลน์อัตโนมัติ ไม่ต้องเหนื่อยกับการหาซับอีกต่อไป ดื่มด่ำคอนเทนต์ทั่วโลกไร้กำแพงภาษา',
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
    desc: 'ai-srtsub.com là công cụ dịch phụ đề AI miễn phí dành cho người yêu phim — không cần đăng ký. Chuyển phụ đề phim nước ngoài, phim Mỹ - Anh và phim tài liệu sang ngôn ngữ của bạn chỉ trong một cú nhấp, tự động căn chỉnh timeline. Không còn cảnh đi tìm phụ đề — tận hưởng nội dung toàn cầu không rào cản ngôn ngữ.',
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
    title: 'AI-SRTSub - Фильмы и сериалы всего мира с субтитрами на вашем языке',
    desc: 'ai-srtsub.com — бесплатный ИИ-переводчик субтитров для киноманов — без регистрации. Переводите субтитры зарубежных фильмов, американских и британских сериалов и документалок на родной язык в один клик, с автоматическим выравниванием таймлайна. Хватит искать субтитры — смотрите мировой контент без языкового барьера.',
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
    title: 'AI-SRTSub - Film e serie del mondo, sottotitoli nella tua lingua',
    desc: 'ai-srtsub.com è un traduttore di sottotitoli IA gratuito, pensato per i cinefili — senza registrazione. Traduci in un clic i sottotitoli di film stranieri, serie e documentari nella tua lingua madre, con allineamento automatico della timeline. Basta cercare sottotitoli — contenuti mondiali senza barriere.',
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
    desc: 'ai-srtsub.com أداة ترجمة ترجمات بالذكاء الاصطناعي مجانية، صُممت لعشاق الأفلام — دون تسجيل. حوّل ترجمات الأفلام الأجنبية والمسلسلات الأمريكية والبريطانية والأفلام الوثائقية إلى لغتك في نقرة واحدة، مع محاذاة تلقائية للخط الزمني. لا مزيد من البحث عن الترجمات — استمتع بالمحتوى العالمي بلا حواجز لغوية.',
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
    desc: 'ai-srtsub.com, film tutkunları için tasarlanmış ücretsiz bir AI altyazı çevirmenisidir — kayıt gerektirmez. Yabancı filmlerin, Amerikan ve İngiliz dizilerinin ve belgesellerin altyazılarını tek tıkla ana diline çevir; zaman çizgisi otomatik hizalanır. Altyazı avı sona erdi: küresel içerik, dil bariyersiz.',
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
    desc: 'ai-srtsub.com is een gratis AI-ondertitelvertaler voor filmliefhebbers. Vertaal ondertitels van buitenlandse films, series en documentaires in één klik naar je eigen taal, met automatische tijdlijn-uitlijning. Geen registratie, geen limiet.',
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
    desc: 'ai-srtsub.com to darmowy tłumacz napisów AI dla miłośników kina. Przetłumacz napisy zagranicznych filmów, seriali i dokumentów jednym kliknięciem na swój język, z automatycznym dopasowaniem osi czasu. Bez rejestracji i bez limitów.',
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
    desc: 'ai-srtsub.com är en gratis AI-översättare för undertexter, byggd för filmälskare. Översätt undertexter till utländska filmer, serier och dokumentärer till ditt eget språk med ett klick, med automatisk tidslinjejustering. Ingen registrering, inga begränsningar.',
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
    title: 'AI-SRTSub - Bezplatný AI překladač titulků k filmům a seriálům',
    desc: 'ai-srtsub.com je bezplatný AI překladač titulků pro milovníky filmů. Přeložte titulky zahraničních filmů, seriálů a dokumentů jedním kliknutím do svého jazyka, s automatickým zarovnáním časové osy. Bez registrace a bez omezení.',
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
    desc: 'ai-srtsub.com — безкоштовний AI-перекладач субтитрів для поціновувачів кіно. Перекладайте субтитри іноземних фільмів, серіалів і документалок одним кліком рідною мовою з автоматичним вирівнюванням таймлайну. Без реєстрації та обмежень.',
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
    desc: 'ai-srtsub.com er en gratis AI-oversætter af undertekster, bygget til filmelskere. Oversæt undertekster til udenlandske film, serier og dokumentarer til dit eget sprog med ét klik, med automatisk tidslinjejustering. Ingen tilmelding, ingen begrænsninger.',
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
    title: 'AI-SRTSub - Ilmainen tekoälypohjainen tekstitysten kääntäjä elokuville ja sarjoille',
    desc: 'ai-srtsub.com on ilmainen tekoälypohjainen tekstitysten kääntäjä elokuvien ystäville. Käännä ulkomaisten elokuvien, sarjojen ja dokumenttien tekstitykset yhdellä klikkauksella omalle kielellesi automaattisella aikajanan kohdistuksella. Ei rekisteröitymistä, ei rajoituksia.',
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
    desc: 'Το ai-srtsub.com είναι ένας δωρεάν μεταφραστής υποτίτλων με AI για τους λάτρεις του κινηματογράφου. Μετέφρασε τους υπότιτλους ξένων ταινιών, σειρών και ντοκιμαντέρ στη γλώσσα σου με ένα κλικ, με αυτόματη ευθυγράμμιση χρονογραμμής. Χωρίς εγγραφή, χωρίς περιορισμούς.',
    kw: 'μετάφραση υποτίτλων, μεταφραστής υποτίτλων AI, δωρεάν μετάφραση υποτίτλων, μετάφραση SRT, μετάφραση VTT, μετάφραση ASS, υπότιτλοι ταινιών, υπότιτλοι σειρών, υπότιτλοι Netflix, υπότιτλοι anime, δίγλωσσοι υπότιτλοι, μετάφραση υποτίτλων online, υπότιτλοι YouTube, δωρεάν εργαλείο υποτίτλων, δωρεάν μετάφραση υποτίτλων, δωρεάν μεταφραστής SRT',
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
    desc: 'ai-srtsub.com הוא מתרגם כתוביות AI חינמי שנבנה בשביל חובבי קולנוע. תרגמו כתוביות של סרטים זרים, סדרות וסרטי תעודה לשפה שלכם בלחיצה אחת, עם יישור אוטומטי של ציר הזמן. בלי הרשמה, בלי הגבלות.',
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
    title: 'AI-SRTSub - Traducător AI de subtitrări gratuit pentru filme și seriale',
    desc: 'ai-srtsub.com este un traducător AI de subtitrări gratuit, creat pentru pasionații de film. Traduceți subtitrările filmelor străine, serialelor și documentarelor în limba voastră cu un singur clic, cu aliniere automată a timeline-ului. Fără înregistrare, fără limite.',
    kw: 'traducere subtitrări, traducător subtitrări AI, traducere subtitrări gratuită, traducere SRT, traducere VTT, traducere ASS, subtitrări filme, subtitrări seriale, subtitrări Netflix, subtitrări anime, subtitrări bilingve, traducere subtitrări online, subtitrări YouTube, instrument gratuit pentru subtitrări, traduce subtitrări gratis, traducător SRT gratuit',
    ogTitle: 'AI-SRTSub - Traducător AI de subtitrări gratuit pentru filme și seriale',
    ogDesc: 'Traducător AI de subtitrări gratuit pentru pasionații de film: subtitrările filmelor străine, serialelor și documentarelor în limba voastră cu un singur clic, cu aliniere automată a timeline-ului.',
    jsonldName: 'AI-SRTSub', jsonldAlt: '随心字幕 AI',
    jsonldDesc: 'Traducător AI de subtitrări gratuit pentru pasionații de film: subtitrările filmelor străine, serialelor și documentarelor în limba voastră cu un singur clic, cu aliniere automată a timeline-ului.',
    currency: 'RON',
    copy: '<section class="seo" aria-label="Despre acest instrument" style="max-width:1360px;margin:32px auto 0;padding:20px 24px 0;border-top:1px solid var(--line);color:var(--sub);font-size:13px;line-height:1.8;">\n    <h2 data-i18n="seoTitle" style="font-size:15px;color:var(--ink);margin:0 0 10px;font-weight:600;">Traducător AI de subtitrări gratuit</h2>\n    <p data-i18n-html="seoIntro">Acesta este un <strong>instrument online gratuit de traducere a subtitrărilor bazat pe modele de limbaj mari</strong>. Încarcă fișiere SRT, VTT sau ASS și tradu subtitrări între engleză, chineză, japoneză, coreeană, spaniolă, franceză și peste 65 de alte limbi. Fără cont, fără instalare, fără filigran — deschide-l în browser și începe. Datele subtitrărilor rămân în browserul tău, dacă nu activezi traducerea în cloud.</p>\n    <p data-i18n-html="seoFeatures" style="margin-top:8px;"><strong>Caracteristici principale:</strong> analiza și traducerea AI pentru SRT, VTT și ASS, unirea inteligentă a propozițiilor (când o propoziție se întinde pe mai multe replici, acestea se unesc, se traduc și se împart din nou pe axa temporală originală), alinierea axei temporale, împărțirea automată a rândurilor pentru text CJK și occidental, eliminarea cuvintelor de umplutură, gestionarea propriei terminologii și stiluri de traducere la alegere. Exportă fișiere SRT, VTT, ASS sau TXT gata de ars direct în clipul tău.</p>\n    <p data-i18n-html="seoWho" style="margin-top:8px;"><strong>Cine îl folosește:</strong> traducători de video, creatori YouTube și specialiști în localizare, cei care învață limbi străine, grupuri de subtitrare și echipe care trebuie să localizeze rapid conținut video.</p>\n  </section>\n  <noscript>\n    <p data-i18n="seoNoscript" style="max-width:1360px;margin:24px auto;padding:0 24px;color:#1C2E2B;">Acest instrument necesită JavaScript. Activează JavaScript în browser, apoi încarcă un fișier de subtitrări (SRT / VTT / ASS) pentru a traduce subtitrări gratuit cu AI.</p>\n  </noscript>'
  }
};

function seoHead(lang, base){
  const s = SEO[lang];
  const selfUrl = base + SEO_PATH[lang];
  const alternates = SEO_LANGS.map(l =>
    '<link rel="alternate" hreflang="' + l + '" href="' + base + SEO_PATH[l] + '">'
  ).join('\n') + '\n<link rel="alternate" hreflang="x-default" href="' + base + '/">';
  const jsonld = '{\n'
    + '  "@context": "https://schema.org",\n'
    + '  "@type": "WebApplication",\n'
    + '  "name": ' + JSON.stringify(s.jsonldName) + ',\n'
    + '  "alternateName": ' + JSON.stringify(s.jsonldAlt) + ',\n'
    + '  "url": ' + JSON.stringify(selfUrl) + ',\n'
    + '  "description": ' + JSON.stringify(s.jsonldDesc) + ',\n'
    + '  "applicationCategory": "UtilitiesApplication",\n'
    + '  "operatingSystem": "Web",\n'
    + '  "browserRequirements": "Requires JavaScript",\n'
    + '  "inLanguage": ' + JSON.stringify(SEO_LANGS) + ',\n'
    + '  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "' + s.currency + '" }\n'
    + '}';
  return [
    '<title>' + s.title + '</title>',
    '<meta name="description" content="' + s.desc + '">',
    '<meta name="keywords" content="' + s.kw + '">',
    '<meta name="robots" content="index, follow">',
    '<meta name="theme-color" content="#0E9488">',
    '<link rel="icon" type="image/svg+xml" href="/favicon.svg">',
    '<link rel="canonical" href="' + selfUrl + '">',
    alternates,
    '<!-- Open Graph / 社交分享卡片 -->',
    '<meta property="og:type" content="website">',
    '<meta property="og:title" content="' + s.ogTitle + '">',
    '<meta property="og:description" content="' + s.ogDesc + '">',
    '<meta property="og:image" content="' + base + '/og-image.png">',
    '<meta property="og:site_name" content="' + s.siteName + '">',
    '<meta property="og:locale" content="' + s.ogLocale + '">',
    '<meta property="og:url" content="' + selfUrl + '">',
    '<meta name="twitter:card" content="summary_large_image">',
    '<meta name="twitter:title" content="' + s.ogTitle + '">',
    '<meta name="twitter:description" content="' + s.ogDesc + '">',
    '<meta name="twitter:image" content="' + base + '/og-image.png">',
    '<!-- 结构化数据（搜索引擎富摘要） -->',
    '<script type="application/ld+json">\n' + jsonld + '\n</script>'
  ].join('\n');
}

/* 按语言服务 index.html：替换 SEO head 与静态文案块 */
function serveIndexLang(req, res, lang){
  fs.readFile(path.join(ROOT, 'index.html'), 'utf8', (err, html) => {
    if (err) { res.writeHead(500, {'Content-Type':'text/plain; charset=utf-8'}); res.end('index.html missing'); return; }
    const base = publicBase(req) || '';
    const head = seoHead(lang, base);
    html = html.replace(/<!--SEO-HEAD-START-->[\s\S]*?<!--SEO-HEAD-END-->/,
      '<!--SEO-HEAD-START-->\n' + head + '\n<!--SEO-HEAD-END-->');
    html = html.replace(/<!--SEO-COPY-START-->[\s\S]*?<!--SEO-COPY-END-->/,
      '<!--SEO-COPY-START-->\n  ' + SEO[lang].copy + '\n  <!--SEO-COPY-END-->');
    html = html.replace('<html lang="zh-CN"', '<html lang="' + SEO[lang].htmlLang + '"' + ((SEO[lang].htmlLang === 'ar' || SEO[lang].htmlLang === 'he') ? ' dir="rtl"' : ''));
    /* GA4 统计：配置了 analyticsId 才注入（fork 部署者用自己的 ID，避免统计进原作者账号） */
    const ga = (readConfig().analyticsId || '').trim();
    const gaTag = /^G-[A-Z0-9]+$/.test(ga)
      ? '<!-- Google tag (gtag.js) -->\n<script async src="https://www.googletagmanager.com/gtag/js?id=' + ga + '"></script>\n<script>\nwindow.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag(\'js\', new Date());\ngtag(\'config\', \'' + ga + '\');\n</script>'
      : '';
    html = html.replace('<!--ANALYTICS-->', gaTag);
    /* v0.9.75：页面必须协调验证（no-cache），否则新版 srt-core.js?v= 参数可能被旧缓存页面屏蔽 */
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-cache' });
    res.end(html);
  });
}

/* sitemap：27 语言 URL + hreflang alternates（v0.9.114） */
function sitemapXml(base){
  const alts = SEO_LANGS.map(l =>
    '    <xhtml:link rel="alternate" hreflang="' + l + '" href="' + base + SEO_PATH[l] + '"/>'
  ).join('\n') + '\n    <xhtml:link rel="alternate" hreflang="x-default" href="' + base + '/"/>';
  const urls = SEO_LANGS.map(l =>
    '  <url>\n    <loc>' + base + SEO_PATH[l] + '</loc>\n' + alts
    + '\n    <changefreq>weekly</changefreq>\n    <priority>' + (l === 'zh-CN' ? '1.0' : '0.9') + '</priority>\n  </url>'
  ).join('\n');
  return '<?xml version="1.0" encoding="UTF-8"?>\n'
    + '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n'
    + '        xmlns:xhtml="http://www.w3.org/1999/xhtml">\n'
    + urls + '\n</urlset>\n';
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
  return false;
}
function modelBReady(cfg){ return slotReady(cfg, 'B'); }
function modelCReady(cfg){ return slotReady(cfg, 'C'); }
/* 取出某个模型槽位的完整调用配置（A / B / C 共用 temperature） */
function slotCfg(cfg, which){
  if (which === 'B') return { base: cfg.base2, model: cfg.model2, key: cfg.key2, temperature: cfg.temperature, extraParams: cfg.extraParams2 };
  if (which === 'C') return { base: cfg.base3, model: cfg.model3, key: cfg.key3, temperature: cfg.temperature, extraParams: cfg.extraParams3 };
  return { base: cfg.base,  model: cfg.model,  key: cfg.key,  temperature: cfg.temperature, extraParams: cfg.extraParams };
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
function fallbackChain(cfg, which){
  if (which === 'C') return [slotReady(cfg, 'B') ? 'B' : null, 'A'].filter(Boolean);
  if (which === 'B') return ['A'];
  return [];
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
      const err = new Error('Upstream HTTP ' + r.status + ' ' + text.slice(0, 200));
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

/* ---------------- 路由 ---------------- */
const server = http.createServer(async (req, res) => {
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

    /* 公开：翻译代理 */
    if (req.method === 'POST' && u === '/api/translate') {
      /* v0.9.211：前端一断开（105 秒预算放弃 / 关标签页），服务端的上游 fetch 立刻中止——
         不再出现「客户端早走了、服务端还在傻等，上游跑完照样扣 token」。
         res 'close' 且响应未写完 = 客户端提前断开；正常结束也会触发 close，须用 writableFinished 区分。 */
      const cliAc = new AbortController();
      res.on('close', () => { if (!res.writableFinished) cliAc.abort(); });
      const CALL_BUDGET_MS = 90000;   /* 与前端「90 秒模型预算 + 15 秒排队冗余」对齐；回退链每级各拿一份 */
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
      /* v0.9.119：按目标语言分流到模型 A / B（meta.lang 由前端随每次请求带上） */
      const lang = (body.meta && String(body.meta.lang || '')) || '';
      const pick = pickModel(cfg, lang);
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
      const needGate = canPace && (pick.which !== 'A' || (RATE_LIMIT[pick.which] || 0) > 0);
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
      try { appendEvent(ip, body.meta, pick.cfg.model, { viaB: pick.which === 'B' ? 1 : 0, viaC: pick.which === 'C' ? 1 : 0 }); } catch (e) {} // 行为记录失败不影响翻译主流程
      /* v0.9.132：前端在 meta.json 里声明「本请求期望 JSON 输出」（非 JSON 请求不注入，否则上游会 400） */
      const jsonOpts = (body.meta && body.meta.json) ? { json: 1 } : null;
      try {
        const out = await callModel(pick.cfg, body.messages, undefined, Object.assign({}, jsonOpts, { signal: cliAc.signal, timeoutMs: CALL_BUDGET_MS }));
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
           模型名是专有名词，不需要进界面字典，直接原样输出。 */
        try { if (out && typeof out === 'object') out._used = String(pick.cfg.model || ''); } catch (e9) {}
        return sendJson(res, 200, out); // 原样透传 OpenAI 兼容响应
      } catch (e) {
        /* v0.9.183：429 的报错文案里带着上游的限额，学下来。硬编码的额度迟早会变，
           而这个数字是上游亲口报的——哪天 A 槽也开始限流了，不用改代码就能自动生效。 */
        try {
          if (canPace) {
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
           ⚠️ 每一级回退都走自己的槽位记账：记到原槽位上会凭空吃掉它的额度（原槽正堵着，等于火上浇油）。 */
        if (cfg.fallbackToA && pick.which !== 'A') {
          let lastErr = e;
          for (const fb of fallbackChain(cfg, pick.which)) {
            try {
              const slotFb = slotCfg(cfg, fb);
              const outF = await callModel(slotFb, body.messages, undefined, Object.assign({}, jsonOpts, { signal: cliAc.signal, timeoutMs: CALL_BUDGET_MS }));
              try {
                markEvent(ip, Object.assign({}, body.meta || {}, {
                  model: pick.cfg.model, usedModel: slotFb.model, msg: String(e.message || '').slice(0, 200)
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
              try { if (outF && typeof outF === 'object') outF._fb = { from: pick.cfg.model, to: slotFb.model, msg: String(e.message || '').slice(0, 200) }; } catch (e5) {}
              try { if (outF && typeof outF === 'object') outF._used = String(slotFb.model || ''); } catch (e6) {} // v0.9.157：回退后真正生效的是 fb
              return sendJson(res, 200, outF);
            } catch (e3) { lastErr = e3; }
          }
          return sendJson(res, 502, { error: { code: 'upstream_error', message: 'Default model call failed: ' + lastErr.message } });
        }
        return sendJson(res, 502, { error: { code: 'upstream_error', message: 'Default model call failed: ' + e.message } });
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
      if (ev !== 'finish' && ev !== 'download' && ev !== 'fail') {
        return sendJson(res, 400, { error: { message: 'ev must be finish, download or fail' } });
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

    /* 管理登录 */
    if (req.method === 'POST' && u === '/api/admin/login') {
      let body;
      try { body = JSON.parse(await readBody(req, 64 * 1024)); } catch (e) {
        return sendJson(res, 400, { error: { message: '请求体不是合法 JSON' } });
      }
      const pw = String(body.password || '');
      if (!pw) return sendJson(res, 400, { error: { message: '请输入密码' } });
      const cfg = readConfig();
      if (!cfg.adminHash) {
        // 首次部署：以本次登录密码初始化为管理密码（部署后请尽快登录一次）
        cfg.adminHash = sha256(pw);
        writeConfig(cfg);
        return sendJson(res, 200, { token: newToken(), firstRun: true });
      }
      if (sha256(pw) === cfg.adminHash) {
        return sendJson(res, 200, { token: newToken() });
      }
      return sendJson(res, 401, { error: { message: '密码错误' } });
    }

    /* 以下管理接口需 token */
    if (u.startsWith('/api/admin/')) {
      if (!authed(req)) return sendJson(res, 401, { error: { message: '未登录或会话已过期，请重新登录' } });

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
            failed: todays.filter(e => e.failedAt && dateOfTs(e.failedAt) === today).length
          },
          topFiles: cnt(all, 'file'),
          topLangs: cnt(all, 'lang'),
          topSrcs: cnt(all.filter(e => e.src), 'src'),   // v0.9.179: auto vs manually-picked source language
          topModels: cnt(all.filter(e => e.model), 'model'),
          topFails: cnt(all.filter(e => e.failMsg), 'failMsg'),
          /* v0.9.244：导出格式分布。⚠️ 不能对 dlFmt 做 cnt —— dlFmt 只是「最后一次」，
             同一任务先下 srt 再下 ass 会被覆盖成一条；分布必须读累计计数（dlSrt/dlVtt/…）。 */
          dlFmts: Object.keys(DL_FMT)
            .map(k => ({ name: k, n: all.reduce((s, e) => s + (Number(e[DL_FMT_FIELD[k]]) || 0), 0) }))
            .filter(x => x.n > 0).sort((a, b) => b.n - a.n)
        };
        const newest = all.slice().reverse(); // 最新在前（倒序拷贝，不动存储的追加序数组）
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
            exported: todays.filter(e => e.kind === 'export').length
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
        /* v0.9.193：连通性测试支持 C 槽 */
        const which = (tbody && (tbody.which === 'B' || tbody.which === 'C')) ? tbody.which : 'A';
        const slot = slotCfg(cfg, which);
        if (!(slot.base && slot.model && slot.key)) {
          const hint = which === 'A' ? '请先保存 Base URL / 模型 / API Key'
            : ('请先保存模型 ' + which + ' 的 Base URL / 模型 / API Key');
          return sendJson(res, 400, { error: { message: hint } });
        }
        try {
          // v0.9.44：max_tokens 从 10 提到 256——Gemini 等思考型模型在 10 token 限额下 0 completion，
          //  message.content 字段直接缺失，前端拿到 undefined（误判"模型返回空"）。
          const out = await callModel(slot, [{ role: 'user', content: 'Reply with exactly: OK' }], 256, { timeoutMs: 30000 });
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
