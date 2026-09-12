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
  analyticsId: ''          // GA4 统计 ID（如 G-XXXXXXX；空=不注入统计代码）
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

/* ---------------- 使用行为记录（仅元数据：文件名/语言/条数，不含字幕内容） ---------------- */
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
const RT_FIELD = { 1: 'retryMusic', 2: 'retryAnchor', 3: 'retryCue' };
function bumpRetry(ev, rt){
  const n = Number(rt) || 0;
  if (!n) { ev.batches = (ev.batches || 0) + 1; return; }
  const k = RT_FIELD[n] || 'retryOther';
  ev[k] = (ev[k] || 0) + 1;
  ev.retries = (ev.retries || 0) + 1;
}
function appendEvent(ip, meta, model){
  if (!meta || typeof meta !== 'object') return;
  const now = Date.now();
  const file = String(meta.file || '').replace(/[\x00-\x1f]/g, '').slice(0, 120);
  const lang = String(meta.lang || '').slice(0, 10);
  const cues = Math.max(0, Math.floor(+meta.cues || 0));
  if (!file && !lang) return; // 无有效元数据（老版前端/异常请求）不记
  const mdl = String(model || '').replace(/[\x00-\x1f]/g, '').slice(0, 60);
  const db = readEvents();
  // 会话去重：从尾部找同 ip+file+lang 且时间窗口内的记录 → 批次 +1
  for (let i = db.events.length - 1; i >= 0; i--) {
    const e = db.events[i];
    if (e.ip === ip && e.file === file && e.lang === lang && now - e.t < EVENT_DEDUP_MS) {
      /* v0.9.73：meta.rt 是前端隔离重译调用类型——1=音乐误删 2=语言跑偏 3=cue 结构错。
         重译不计入 batches，按类型分别累加，站长一眼看出「主批 / 哪类重译最多」 */
      bumpRetry(e, meta.rt);
      if (cues > (e.cues || 0)) e.cues = cues;
      if (mdl && !e.model) e.model = mdl;
      fs.writeFileSync(EVENTS_PATH, JSON.stringify(db), 'utf8');
      return;
    }
    if (now - e.t >= EVENT_DEDUP_MS) break; // 事件按时间序，更早的必不在窗口内
  }
  const ev = { t: now, ip, file, lang, cues, batches: 0, retries: 0, model: mdl };
  bumpRetry(ev, meta.rt);
  db.events.push(ev);
  if (db.events.length > EVENTS_MAX) db.events = db.events.slice(-EVENTS_MAX);
  fs.writeFileSync(EVENTS_PATH, JSON.stringify(db), 'utf8');
}
/* 前端生命周期上报：翻译完成（finish）/ 下载字幕（download）。
   匹配窗口放宽到 3 小时（大文件翻译+用户迟些下载都算同一次会话），取最新一条。
   匹配不到但带了 model（自带 Key 用户，翻译不经服务器）→ 创建轻量记录，模型也能统计。 */
const EVENT_LIFE_MS = 3 * 60 * 60 * 1000;
function markEvent(ip, meta, ev){
  if (!meta || typeof meta !== 'object') return false;
  const now = Date.now();
  const file = String(meta.file || '').replace(/[\x00-\x1f]/g, '').slice(0, 120);
  const lang = String(meta.lang || '').slice(0, 10);
  const mdl = String(meta.model || '').replace(/[\x00-\x1f]/g, '').slice(0, 60);
  if (!file && !lang) return false;
  const db = readEvents();
  for (let i = db.events.length - 1; i >= 0; i--) {
    const e = db.events[i];
    if (now - e.t >= EVENT_LIFE_MS) break; // 更早的必不在窗口内
    if (e.ip === ip && e.file === file && e.lang === lang) {
      if (ev === 'finish') {
        e.finishedAt = now;                    // 完成时间（重译后再完成取最新；开始时间即 e.t）
      } else if (ev === 'download') {
        e.downloads = (e.downloads || 0) + 1;
        e.downloadedAt = now;
      } else return false;
      if (mdl && !e.model) e.model = mdl;
      fs.writeFileSync(EVENTS_PATH, JSON.stringify(db), 'utf8');
      return true;
    }
  }
  /* 自带 Key 用户（翻译未经服务器，无 builtin 会话）：首次上报时创建轻量记录 */
  if (!mdl) return false;
  const lite = { t: now, ip, file, lang, cues: 0, batches: 0, model: mdl, byok: true };
  if (ev === 'finish') lite.finishedAt = now;
  else if (ev === 'download') { lite.downloads = 1; lite.downloadedAt = now; }
  else return false;
  db.events.push(lite);
  if (db.events.length > EVENTS_MAX) db.events = db.events.slice(-EVENTS_MAX);
  fs.writeFileSync(EVENTS_PATH, JSON.stringify(db), 'utf8');
  return true;
}
function dateOfTs(ts){
  const d = new Date(ts);
  return d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
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
  fs.readFile(file, (err, buf) => {
    if (err) { res.writeHead(404, {'Content-Type':'text/plain; charset=utf-8'}); res.end('Not Found'); return; }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] || 'application/octet-stream' });
    res.end(buf);
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
  '/tr': 'tr', '/tr/': 'tr'
};
const SEO_LANGS = ['zh-CN', 'zh-TW', 'en', 'ja', 'es', 'pt', 'ko', 'de', 'fr', 'id', 'hi', 'th', 'vi', 'ru', 'it', 'ar', 'tr'];
const SEO_PATH = { 'zh-CN': '/', 'zh-TW': '/zh-TW/', 'en': '/en/', 'ja': '/ja/', 'es': '/es/', 'pt': '/pt/', 'ko': '/ko/', 'de': '/de/', 'fr': '/fr/', 'id': '/id/', 'hi': '/hi/', 'th': '/th/', 'vi': '/vi/', 'ru': '/ru/', 'it': '/it/', 'ar': '/ar/', 'tr': '/tr/' };
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
    html = html.replace('<html lang="zh-CN"', '<html lang="' + SEO[lang].htmlLang + '"' + (SEO[lang].htmlLang === 'ar' ? ' dir="rtl"' : ''));
    /* GA4 统计：配置了 analyticsId 才注入（fork 部署者用自己的 ID，避免统计进原作者账号） */
    const ga = (readConfig().analyticsId || '').trim();
    const gaTag = /^G-[A-Z0-9]+$/.test(ga)
      ? '<!-- Google tag (gtag.js) -->\n<script async src="https://www.googletagmanager.com/gtag/js?id=' + ga + '"></script>\n<script>\nwindow.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag(\'js\', new Date());\ngtag(\'config\', \'' + ga + '\');\n</script>'
      : '';
    html = html.replace('<!--ANALYTICS-->', gaTag);
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(html);
  });
}

/* sitemap：17 语言 URL + hreflang alternates */
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
async function callModel(cfg, messages, maxTokens){
  const url = String(cfg.base).replace(/\/+$/, '') + '/chat/completions';
  const r = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + cfg.key },
    body: JSON.stringify({ model: cfg.model, messages, temperature: 0.2, stream: false, max_tokens: maxTokens })
  });
  const text = await r.text();
  if (!r.ok) throw new Error('Upstream HTTP ' + r.status + ' ' + text.slice(0, 200));
  return JSON.parse(text);
}

/* ---------------- 路由 ---------------- */
const server = http.createServer(async (req, res) => {
  const u = req.url.split('?')[0];
  try {
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

    /* 公开：翻译代理 */
    if (req.method === 'POST' && u === '/api/translate') {
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
      usage.ips[ip] = ipUsed + 1;
      usage.global += 1;
      writeUsage(usage);
      try { appendEvent(ip, body.meta, cfg.model); } catch (e) {} // 行为记录失败不影响翻译主流程
      try {
        const out = await callModel(cfg, body.messages, undefined);
        return sendJson(res, 200, out); // 原样透传 OpenAI 兼容响应
      } catch (e) {
        return sendJson(res, 502, { error: { code: 'upstream_error', message: 'Default model call failed: ' + e.message } });
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
      if (ev !== 'finish' && ev !== 'download') {
        return sendJson(res, 400, { error: { message: 'ev must be finish or download' } });
      }
      try { markEvent(clientIp(req), body, ev); } catch (e) {}
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
          perIpDaily: cfg.perIpDaily, globalDaily: cfg.globalDaily,
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
            downloaded: todays.filter(e => e.downloadedAt && dateOfTs(e.downloadedAt) === today).length
          },
          topFiles: cnt(all, 'file'),
          topLangs: cnt(all, 'lang'),
          topModels: cnt(all.filter(e => e.model), 'model')
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
        if (Number.isFinite(+body.perIpDaily)) cfg.perIpDaily = Math.max(0, Math.floor(+body.perIpDaily));
        if (Number.isFinite(+body.globalDaily)) cfg.globalDaily = Math.max(0, Math.floor(+body.globalDaily));
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
        if (!(cfg.base && cfg.model && cfg.key)) {
          return sendJson(res, 400, { error: { message: '请先保存 Base URL / 模型 / API Key' } });
        }
        try {
          // v0.9.44：max_tokens 从 10 提到 256——Gemini 等思考型模型在 10 token 限额下 0 completion，
          //  message.content 字段直接缺失，前端拿到 undefined（误判"模型返回空"）。
          const out = await callModel(cfg, [{ role: 'user', content: 'Reply with exactly: OK' }], 256);
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
