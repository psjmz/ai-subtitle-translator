/* SRT 字幕翻译工作台 - 后端服务
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
  '/ru': 'ru', '/ru/': 'ru'
};
const SEO_LANGS = ['zh-CN', 'zh-TW', 'en', 'ja', 'es', 'pt', 'ko', 'de', 'fr', 'id', 'hi', 'th', 'vi', 'ru'];
const SEO_PATH = { 'zh-CN': '/', 'zh-TW': '/zh-TW/', 'en': '/en/', 'ja': '/ja/', 'es': '/es/', 'pt': '/pt/', 'ko': '/ko/', 'de': '/de/', 'fr': '/fr/', 'id': '/id/', 'hi': '/hi/', 'th': '/th/', 'vi': '/vi/', 'ru': '/ru/' };
const SEO = {
  'zh-CN': {
    htmlLang: 'zh-CN', ogLocale: 'zh_CN', siteName: 'SRT 字幕翻译工作台',
    title: 'AI 免费字幕翻译 - SRT 字幕在线翻译工具｜多语言支持',
    desc: '用 AI 大模型免费翻译 SRT 字幕：上传 .srt 文件，自动翻译成中文、英文、日文等多语言字幕。内置句级智能合并、时间轴对齐、自动折行、去水词、专有名词处理，译文可直接压制视频。',
    kw: 'SRT翻译,字幕翻译,AI字幕,免费字幕翻译,大模型翻译,SRT字幕在线翻译,字幕机翻,video subtitle translation,translate SRT',
    ogTitle: 'AI 免费字幕翻译 - SRT 字幕在线翻译工具',
    ogDesc: '上传 .srt 字幕，AI 大模型免费翻译成多语言。句级智能合并、时间轴对齐、自动折行，译文可直接压制视频。',
    jsonldName: 'SRT 字幕翻译工作台', jsonldAlt: 'AI Free SRT Subtitle Translator',
    jsonldDesc: '用 AI 大模型免费翻译 SRT 字幕文件，支持中英日等多语言互译，句级智能合并、时间轴对齐、自动折行、去水词，译文可直接压制视频。',
    currency: 'CNY',
    copy: '<section class="seo" aria-label="关于本工具" style="max-width:1360px;margin:32px auto 0;padding:20px 24px 0;border-top:1px solid var(--line);color:var(--sub);font-size:13px;line-height:1.8;">\n    <h2 style="font-size:15px;color:var(--ink);margin:0 0 10px;font-weight:600;">关于 SRT 字幕翻译工作台</h2>\n    <p>本工具是一款<strong>基于 AI 大模型的免费在线 SRT 字幕翻译服务</strong>，支持中文、英文、日文等多语言互译。无需注册、无需下载客户端，浏览器打开即可使用，字幕数据全程不上传服务器（除非你勾选了云端翻译）。</p>\n    <p style="margin-top:8px;"><strong>主要功能：</strong>SRT 字幕文件解析与翻译、句级智能合并（一个完整句子分布在多条字幕时合并翻译后按时长回填）、时间轴对齐、自动折行（支持 CJK 与西文混合宽度）、去水词、专有名词保留或翻译、可选翻译风格（信达雅 / 大白话 / 自定义）。译文可直接导出为标准 .srt 文件压制视频。</p>\n    <p style="margin-top:8px;"><strong>适用人群：</strong>视频翻译从业者、自媒体创作者、外语学习者、字幕组、需要快速本地化视频内容的团队。</p>\n  </section>\n  <noscript>\n    <p style="max-width:1360px;margin:24px auto;padding:0 24px;color:#1C2E2B;">本工具需要启用 JavaScript 才能使用。请在浏览器中启用 JavaScript，然后上传 .srt 字幕文件即可使用 AI 免费字幕翻译。</p>\n  </noscript>'
  },
  'zh-TW': {
    htmlLang: 'zh-TW', ogLocale: 'zh_TW', siteName: 'SRT 字幕翻譯工作台',
    title: 'AI 免費字幕翻譯 - SRT 字幕線上翻譯工具｜多語言支援',
    desc: '用 AI 大模型免費翻譯 SRT 字幕：上傳 .srt 檔案，自動翻譯成中文、英文、日文等多語言字幕。內建句級智慧合併、時間軸對齊、自動折行、去口語贅詞、專有名詞處理，譯文可直接壓製影片。',
    kw: 'SRT翻譯,字幕翻譯,AI字幕,免費字幕翻譯,繁體中文翻譯,大模型翻譯,字幕線上翻譯,translate SRT',
    ogTitle: 'AI 免費字幕翻譯 - SRT 字幕線上翻譯工具',
    ogDesc: '上傳 .srt 字幕，AI 大模型免費翻譯成多語言。句級智慧合併、時間軸對齊、自動折行，譯文可直接壓製影片。',
    jsonldName: 'SRT 字幕翻譯工作台', jsonldAlt: 'AI Free SRT Subtitle Translator',
    jsonldDesc: '用 AI 大模型免費翻譯 SRT 字幕檔案，支援中英日等多語言互譯，句級智慧合併、時間軸對齊、自動折行、去口語贅詞，譯文可直接壓製影片。',
    currency: 'CNY',
    copy: '<section class="seo" aria-label="關於本工具" style="max-width:1360px;margin:32px auto 0;padding:20px 24px 0;border-top:1px solid var(--line);color:var(--sub);font-size:13px;line-height:1.8;">\n    <h2 style="font-size:15px;color:var(--ink);margin:0 0 10px;font-weight:600;">關於 SRT 字幕翻譯工作台</h2>\n    <p>本工具是一款<strong>基於 AI 大模型的免費線上 SRT 字幕翻譯服務</strong>，支援中文、英文、日文等多語言互譯。無需註冊、無需下載用戶端，瀏覽器開啟即可使用，字幕資料全程不上傳伺服器（除非勾選了雲端翻譯）。</p>\n    <p style="margin-top:8px;"><strong>主要功能：</strong>SRT 字幕檔案解析與翻譯、句級智慧合併（一個完整句子分佈在多條字幕時合併翻譯後按時長回填）、時間軸對齊、自動折行（支援 CJK 與西文混合寬度）、去口語贅詞、專有名詞保留或翻譯、可選翻譯風格（信達雅 / 大白話 / 自訂）。譯文可直接匯出為標準 .srt 檔案壓製影片。</p>\n    <p style="margin-top:8px;"><strong>適用人群：</strong>影片翻譯從業者、自媒體創作者、外語學習者、字幕組、需要快速在地化影片內容的團隊。</p>\n  </section>\n  <noscript>\n    <p style="max-width:1360px;margin:24px auto;padding:0 24px;color:#1C2E2B;">本工具需要啟用 JavaScript 才能使用。請在瀏覽器中啟用 JavaScript，然後上傳 .srt 字幕檔案即可使用 AI 免費字幕翻譯。</p>\n  </noscript>'
  },
  'en': {
    htmlLang: 'en', ogLocale: 'en_US', siteName: 'SRT Subtitle Translator',
    title: 'Free AI Subtitle Translator - Translate SRT Files Online | 15+ Languages',
    desc: 'Free AI-powered SRT subtitle translator. Upload a .srt file and translate subtitles into English, Chinese, Japanese, Korean, Spanish, French and 15+ languages. Smart sentence merging, timeline alignment, auto line-wrapping, filler-word removal. No signup, no watermark.',
    kw: 'subtitle translator, SRT translator, translate SRT file, AI subtitle translation, free subtitle translator, translate subtitles online, SRT to English, video subtitle translation, YouTube subtitles',
    ogTitle: 'Free AI Subtitle Translator - Translate SRT Files Online',
    ogDesc: 'Upload a .srt file and let AI translate subtitles into 15+ languages for free. Smart sentence merging, timeline alignment, auto line-wrapping. No signup, no watermark.',
    jsonldName: 'SRT Subtitle Translator', jsonldAlt: 'AI 免费字幕翻译',
    jsonldDesc: 'Free AI-powered online SRT subtitle translator. Translate subtitle files between English, Chinese, Japanese and 15+ languages with smart sentence merging, timeline alignment and automatic line wrapping.',
    currency: 'USD',
    copy: '<section class="seo" aria-label="About this tool" style="max-width:1360px;margin:32px auto 0;padding:20px 24px 0;border-top:1px solid var(--line);color:var(--sub);font-size:13px;line-height:1.8;">\n    <h2 style="font-size:15px;color:var(--ink);margin:0 0 10px;font-weight:600;">Free AI SRT Subtitle Translator</h2>\n    <p>This is a <strong>free online subtitle translation tool powered by large language models</strong>. Upload a .srt file and translate subtitles between English, Chinese, Japanese, Korean, Spanish, French and 15+ other languages. No signup, no installation, no watermark — open it in a browser and start translating. Subtitle data stays in your browser unless you enable cloud translation.</p>\n    <p style="margin-top:8px;"><strong>Key features:</strong> SRT parsing and AI translation, smart sentence merging (when one sentence spans multiple cues, cues are merged, translated, then split back across the original timeline), timeline alignment, automatic line wrapping for CJK and Western text, filler-word removal, custom terminology handling, and selectable translation styles. Export a standard .srt file ready to hard-sub onto your video.</p>\n    <p style="margin-top:8px;"><strong>Who uses it:</strong> video translators, YouTube creators and localizers, language learners, subtitle groups and teams that need to localize video content quickly.</p>\n  </section>\n  <noscript>\n    <p style="max-width:1360px;margin:24px auto;padding:0 24px;color:#1C2E2B;">This tool requires JavaScript. Please enable JavaScript in your browser, then upload a .srt subtitle file to translate subtitles with AI for free.</p>\n  </noscript>'
  },
  'ja': {
    htmlLang: 'ja', ogLocale: 'ja_JP', siteName: 'SRT 字幕翻訳ワークベンチ',
    title: 'AI無料 字幕翻訳ツール - SRT字幕をオンライン翻訳｜15言語以上対応',
    desc: 'AI大規模モデルでSRT字幕を無料翻訳。.srtファイルをアップロードするだけで、日本語・英語・中国語・韓国語など15言語以上へ自動翻訳。文単位のスマート結合、タイムライン整合、自動改行、フィラー語削除。登録不要・透かしなし。',
    kw: '字幕翻訳,SRT翻訳,AI字幕翻訳,無料 字幕翻訳,オンライン字幕翻訳,動画翻訳,日本語字幕,翻訳ツール',
    ogTitle: 'AI無料 字幕翻訳ツール - SRT字幕をオンライン翻訳',
    ogDesc: '.srt字幕をアップロードするだけで、AIが15言語以上に無料翻訳。文単位スマート結合・タイムライン整合・自動改行。登録不要です。',
    jsonldName: 'SRT 字幕翻訳ワークベンチ', jsonldAlt: 'AI Free SRT Subtitle Translator',
    jsonldDesc: 'AI大規模モデルでSRT字幕ファイルを無料翻訳。日本語・英語・中国語など15言語以上の相互翻訳に対応し、文単位スマート結合・タイムライン整合・自動改行を実現。',
    currency: 'JPY',
    copy: '<section class="seo" aria-label="このツールについて" style="max-width:1360px;margin:32px auto 0;padding:20px 24px 0;border-top:1px solid var(--line);color:var(--sub);font-size:13px;line-height:1.8;">\n    <h2 style="font-size:15px;color:var(--ink);margin:0 0 10px;font-weight:600;">無料のAI SRT字幕翻訳ツール</h2>\n    <p>本ツールは<strong>AI大規模モデルを利用した無料のオンラインSRT字幕翻訳サービス</strong>です。.srtファイルをアップロードするだけで、日本語・英語・中国語・韓国語など15言語以上の間で字幕を翻訳できます。登録不要・インストール不要・透かしなし、ブラウザで開くだけで使えます。クラウド翻訳を有効にしない限り、字幕データはサーバーに送信されません。</p>\n    <p style="margin-top:8px;"><strong>主な機能：</strong>SRTファイルの解析とAI翻訳、文単位のスマート結合（1つの文が複数の字幕にまたがる場合、結合して翻訳後、元のタイムラインに沿って再分割）、タイムライン整合、CJKと西文の混在に対応した自動改行、フィラー語の削除、専門用語の処理、翻訳スタイルの選択。標準的な.srtファイルとして書き出し、そのまま動画に焼き付けられます。</p>\n    <p style="margin-top:8px;"><strong>こんな方に：</strong>動画翻訳の業務に携わる方、YouTubeクリエイター、語学学習者、字幕チーム、動画コンテンツを素早くローカライズしたいチーム。</p>\n  </section>\n  <noscript>\n    <p style="max-width:1360px;margin:24px auto;padding:0 24px;color:#1C2E2B;">本ツールを使用するにはJavaScriptが必要です。ブラウザでJavaScriptを有効にしてから、.srt字幕ファイルをアップロードしてAI字幕翻訳をご利用ください。</p>\n  </noscript>'
  },
  'es': {
    htmlLang: 'es', ogLocale: 'es_ES', siteName: 'Traductor de Subtítulos SRT',
    title: 'Traductor de Subtítulos Gratis con IA - Traduce Archivos SRT Online | 15+ Idiomas',
    desc: 'Traductor de subtítulos SRT gratis con IA. Sube tu archivo .srt y traduce subtítulos al español, inglés, chino, japonés, coreano, francés y 15+ idiomas. Fusión inteligente de frases, alineación de línea de tiempo, ajuste de línea automático, eliminación de muletillas. Sin registro ni marca de agua.',
    kw: 'traductor de subtitulos, traducir srt, subtitulos con IA, traductor srt gratis, traducir subtitulos online, subtitulos peliculas, traductor video, subtitulos youtube',
    ogTitle: 'Traductor de Subtítulos Gratis con IA - Traduce Archivos SRT Online',
    ogDesc: 'Sube un archivo .srt y deja que la IA traduzca los subtítulos a 15+ idiomas gratis. Fusión inteligente de frases, alineación de línea de tiempo, ajuste de línea automático. Sin registro.',
    jsonldName: 'Traductor de Subtítulos SRT', jsonldAlt: 'Traductor gratuito de subtítulos con IA',
    jsonldDesc: 'Traductor online gratuito de subtítulos SRT con IA. Traduce archivos de subtítulos entre español, inglés, chino, japonés y 15+ idiomas con fusión inteligente de frases, alineación de línea de tiempo y ajuste de línea automático.',
    currency: 'EUR',
    copy: '<section class="seo" aria-label="Sobre esta herramienta" style="max-width:1360px;margin:32px auto 0;padding:20px 24px 0;border-top:1px solid var(--line);color:var(--sub);font-size:13px;line-height:1.8;">\n    <h2 style="font-size:15px;color:var(--ink);margin:0 0 10px;font-weight:600;">Traductor de Subtítulos SRT Gratuito con IA</h2>\n    <p>Esta es una <strong>herramienta online gratuita de traducción de subtítulos basada en grandes modelos de lenguaje (IA)</strong>. Sube un archivo .srt y traduce subtítulos entre español, inglés, chino, japonés, coreano, francés y 15+ idiomas. Sin registro, sin instalación y sin marca de agua: ábrela en el navegador y empieza a traducir. Los datos de los subtítulos permanecen en tu navegador salvo que actives la traducción en la nube.</p>\n    <p style="margin-top:8px;"><strong>Funciones principales:</strong> análisis de archivos SRT y traducción con IA, fusión inteligente de frases (cuando una frase abarca varios subtítulos, se fusionan, se traducen y se vuelven a repartir en la línea de tiempo original), alineación de línea de tiempo, ajuste de línea automático para texto CJK y occidental, eliminación de muletillas, gestión de términos propios y estilos de traducción seleccionables. Exporta un archivo .srt estándar listo para incrustar en tu vídeo.</p>\n    <p style="margin-top:8px;"><strong>Para quién es:</strong> traductores de vídeo, creadores de YouTube y localizadores, estudiantes de idiomas, grupos de subtítulos y equipos que necesitan localizar contenido de vídeo rápidamente.</p>\n  </section>\n  <noscript>\n    <p style="max-width:1360px;margin:24px auto;padding:0 24px;color:#1C2E2B;">Esta herramienta necesita JavaScript. Actívalo en tu navegador y sube un archivo .srt para traducir subtítulos con IA gratis.</p>\n  </noscript>'
  },
  'pt': {
    htmlLang: 'pt', ogLocale: 'pt_BR', siteName: 'Tradutor de Legendas SRT',
    title: 'Tradutor de Legendas Grátis com IA - Traduza Arquivos SRT Online | 15+ Idiomas',
    desc: 'Tradutor de legendas SRT grátis com IA. Envie seu arquivo .srt e traduza legendas para português, inglês, espanhol, chinês, japonês, coreano e 15+ idiomas. Fusão inteligente de frases, alinhamento de linha do tempo, quebra de linha automática, remoção de vícios de fala. Sem cadastro e sem marca d\u2019água.',
    kw: 'tradutor de legendas, traduzir srt, legendas com IA, tradutor srt grátis, traduzir legendas online, legendas de filmes, tradutor de vídeo, legendas youtube',
    ogTitle: 'Tradutor de Legendas Grátis com IA - Traduza Arquivos SRT Online',
    ogDesc: 'Envie um arquivo .srt e deixe a IA traduzir as legendas para 15+ idiomas de graça. Fusão inteligente de frases, alinhamento de linha do tempo, quebra de linha automática. Sem cadastro.',
    jsonldName: 'Tradutor de Legendas SRT', jsonldAlt: 'Tradutor gratuito de legendas com IA',
    jsonldDesc: 'Tradutor online gratuito de legendas SRT com IA. Traduza arquivos de legendas entre português, inglês, espanhol, chinês, japonês e 15+ idiomas com fusão inteligente de frases, alinhamento de linha do tempo e quebra de linha automática.',
    currency: 'BRL',
    copy: '<section class="seo" aria-label="Sobre esta ferramenta" style="max-width:1360px;margin:32px auto 0;padding:20px 24px 0;border-top:1px solid var(--line);color:var(--sub);font-size:13px;line-height:1.8;">\n    <h2 style="font-size:15px;color:var(--ink);margin:0 0 10px;font-weight:600;">Tradutor de Legendas SRT Gratuito com IA</h2>\n    <p>Esta é uma <strong>ferramenta online gratuita de tradução de legendas baseada em grandes modelos de linguagem (IA)</strong>. Envie um arquivo .srt e traduza legendas entre português, inglês, espanhol, chinês, japonês, coreano e 15+ idiomas. Sem cadastro, sem instalação e sem marca d\u2019água: abra no navegador e comece a traduzir. Os dados das legendas ficam no seu navegador, exceto se você ativar a tradução na nuvem.</p>\n    <p style="margin-top:8px;"><strong>Funções principais:</strong> análise de arquivos SRT e tradução com IA, fusão inteligente de frases (quando uma frase se espalha por várias legendas, elas são fundidas, traduzidas e redistribuídas na linha do tempo original), alinhamento de linha do tempo, quebra de linha automática para texto CJK e ocidental, remoção de vícios de fala, gestão de termos próprios e estilos de tradução selecionáveis. Exporte um arquivo .srt padrão pronto para embutir no seu vídeo.</p>\n    <p style="margin-top:8px;"><strong>Para quem é:</strong> tradutores de vídeo, criadores de YouTube e localizadores, estudantes de idiomas, grupos de legendas e equipes que precisam localizar conteúdo de vídeo rapidamente.</p>\n  </section>\n  <noscript>\n    <p style="max-width:1360px;margin:24px auto;padding:0 24px;color:#1C2E2B;">Esta ferramenta precisa de JavaScript. Ative-o no navegador e envie um arquivo .srt para traduzir legendas com IA de graça.</p>\n  </noscript>'
  },
  'ko': {
    htmlLang: 'ko', ogLocale: 'ko_KR', siteName: 'SRT 자막 번역기',
    title: '무료 AI 자막 번역기 - SRT 파일 온라인 번역 | 15개 이상 언어',
    desc: 'AI 대규모 언어 모델로 SRT 자막을 무료 번역. .srt 파일을 업로드하기만 하면 한국어·영어·중국어·일본어·스페인어 등 15개 이상 언어로 자동 번역됩니다. 문장 단위 스마트 병합, 타임라인 정렬, 자동 줄바꿈, 필러 워드 제거. 가입 불필요, 워터마크 없음.',
    kw: '자막 번역, SRT 번역, AI 자막 번역, 무료 자막 번역기, 온라인 자막 번역, 영상 번역, 한국어 자막, 유튜브 자막',
    ogTitle: '무료 AI 자막 번역기 - SRT 파일 온라인 번역',
    ogDesc: '.srt 파일을 업로드하면 AI가 15개 이상 언어로 무료 번역합니다. 문장 단위 스마트 병합, 타임라인 정렬, 자동 줄바꿈. 가입 불필요.',
    jsonldName: 'SRT 자막 번역기', jsonldAlt: '무료 AI 자막 번역 도구',
    jsonldDesc: 'AI 대규모 언어 모델 기반 무료 온라인 SRT 자막 번역기. 한국어·영어·중국어·일본어 등 15개 이상 언어 간 자막 번역을 지원하며 문장 단위 스마트 병합, 타임라인 정렬, 자동 줄바꿈을 제공합니다.',
    currency: 'KRW',
    copy: '<section class="seo" aria-label="이 도구 소개" style="max-width:1360px;margin:32px auto 0;padding:20px 24px 0;border-top:1px solid var(--line);color:var(--sub);font-size:13px;line-height:1.8;">\n    <h2 style="font-size:15px;color:var(--ink);margin:0 0 10px;font-weight:600;">무료 AI SRT 자막 번역기</h2>\n    <p>이 도구는 <strong>AI 대규모 언어 모델 기반 무료 온라인 SRT 자막 번역 서비스</strong>입니다. .srt 파일을 업로드하기만 하면 한국어·영어·중국어·일본어·스페인어 등 15개 이상 언어 간 자막 번역이 가능합니다. 가입 불필요, 설치 불필요, 워터마크 없음 — 브라우저에서 열고 바로 번역하세요. 클라우드 번역을 켜지 않는 한 자막 데이터는 서버로 전송되지 않습니다.</p>\n    <p style="margin-top:8px;"><strong>주요 기능:</strong> SRT 파일 분석 및 AI 번역, 문장 단위 스마트 병합(하나의 문장이 여러 자막에 걸쳐 있을 때 병합하여 번역한 뒤 원래 타임라인에 따라 재분배), 타임라인 정렬, CJK·서구 문자 혼용 자동 줄바꿈, 필러 워드 제거, 고유명사 처리, 번역 스타일 선택. 표준 .srt 파일로 내보내 바로 영상에 삽입할 수 있습니다.</p>\n    <p style="margin-top:8px;"><strong>이런 분들에게 유용합니다:</strong> 영상 번역 종사자, 유튜브 크리에이터, 외국어 학습자, 자막 팀, 영상 콘텐츠를 빠르게 현지화해야 하는 팀.</p>\n  </section>\n  <noscript>\n    <p style="max-width:1360px;margin:24px auto;padding:0 24px;color:#1C2E2B;">이 도구를 사용하려면 JavaScript가 필요합니다. 브라우저에서 JavaScript를 활성화한 후 .srt 자막 파일을 업로드하여 AI 자막 번역을 무료로 이용해 보세요.</p>\n  </noscript>'
  },
  'de': {
    htmlLang: 'de', ogLocale: 'de_DE', siteName: 'SRT Untertitel-Übersetzer',
    title: 'Kostenloser KI-Untertitel-Übersetzer - SRT-Dateien online übersetzen | 15+ Sprachen',
    desc: 'Kostenloser KI-gestützter SRT-Untertitel-Übersetzer. Laden Sie eine .srt-Datei hoch und übersetzen Sie Untertitel ins Deutsche, Englische, Chinesische, Japanische, Spanische und 15+ weitere Sprachen. Intelligente Satz-Zusammenführung, Zeitleisten-Ausrichtung, automatischer Zeilenumbruch, Füllwort-Entfernung. Keine Anmeldung, kein Wasserzeichen.',
    kw: 'untertitel übersetzen, SRT übersetzen, KI Untertitel, Untertitel Übersetzer kostenlos, Untertitel online übersetzen, Video Untertitel, YouTube Untertitel',
    ogTitle: 'Kostenloser KI-Untertitel-Übersetzer - SRT-Dateien online übersetzen',
    ogDesc: 'Laden Sie eine .srt-Datei hoch und lassen Sie KI Untertitel kostenlos in 15+ Sprachen übersetzen. Intelligente Satz-Zusammenführung, Zeitleisten-Ausrichtung, automatischer Zeilenumbruch. Keine Anmeldung.',
    jsonldName: 'SRT Untertitel-Übersetzer', jsonldAlt: 'Kostenloser KI-Untertitel-Übersetzer',
    jsonldDesc: 'Kostenloser online SRT-Untertitel-Übersetzer mit KI. Übersetzen Sie Untertiteldateien zwischen Deutsch, Englisch, Chinesisch, Japanisch und 15+ Sprachen mit intelligenter Satz-Zusammenführung, Zeitleisten-Ausrichtung und automatischem Zeilenumbruch.',
    currency: 'EUR',
    copy: '<section class="seo" aria-label="Über dieses Tool" style="max-width:1360px;margin:32px auto 0;padding:20px 24px 0;border-top:1px solid var(--line);color:var(--sub);font-size:13px;line-height:1.8;">\n    <h2 style="font-size:15px;color:var(--ink);margin:0 0 10px;font-weight:600;">Kostenloser KI SRT-Untertitel-Übersetzer</h2>\n    <p>Dies ist ein <strong>kostenloses Online-Tool zur Untertitel-Übersetzung auf Basis großer Sprachmodelle (KI)</strong>. Laden Sie eine .srt-Datei hoch und übersetzen Sie Untertitel zwischen Deutsch, Englisch, Chinesisch, Japanisch, Koreanisch, Spanisch und 15+ weiteren Sprachen. Keine Anmeldung, keine Installation, kein Wasserzeichen — im Browser öffnen und loslegen. Untertiteldaten bleiben in Ihrem Browser, sofern Sie die Cloud-Übersetzung nicht aktivieren.</p>\n    <p style="margin-top:8px;"><strong>Hauptfunktionen:</strong> SRT-Analyse und KI-Übersetzung, intelligente Satz-Zusammenführung (wenn ein Satz über mehrere Untertitel verteilt ist, werden sie zusammengeführt, übersetzt und wieder auf die Original-Zeitleiste verteilt), Zeitleisten-Ausrichtung, automatischer Zeilenumbruch für CJK- und westliche Texte, Füllwort-Entfernung, Verwaltung von Eigennamen und wählbare Übersetzungsstile. Export als Standard-.srt-Datei, bereit zum Einbrennen in Ihr Video.</p>\n    <p style="margin-top:8px;"><strong>Für wen:</strong> Video-Übersetzer, YouTube-Creator und Localizer, Sprachlernende, Untertitel-Teams und alle, die Videoinhalte schnell lokalisieren müssen.</p>\n  </section>\n  <noscript>\n    <p style="max-width:1360px;margin:24px auto;padding:0 24px;color:#1C2E2B;">Dieses Tool benötigt JavaScript. Bitte aktivieren Sie JavaScript im Browser und laden Sie dann eine .srt-Untertiteldatei hoch, um Untertitel kostenlos mit KI zu übersetzen.</p>\n  </noscript>'
  },
  'fr': {
    htmlLang: 'fr', ogLocale: 'fr_FR', siteName: 'Traducteur de Sous-titres SRT',
    title: 'Traducteur de Sous-titres Gratuit par IA - Traduire des Fichiers SRT en Ligne | 15+ Langues',
    desc: 'Traducteur de sous-titres SRT gratuit propulsé par l\u2019IA. Importez un fichier .srt et traduisez des sous-titres en français, anglais, chinois, japonais, espagnol et 15+ langues. Fusion intelligente de phrases, alignement de la timeline, retour à la ligne automatique, suppression des tics de langage. Sans inscription, sans filigrane.',
    kw: 'traduire sous-titres, traduction srt, sous-titres IA, traducteur sous-titres gratuit, traduire sous-titres en ligne, sous-titres vidéo, sous-titres youtube',
    ogTitle: 'Traducteur de Sous-titres Gratuit par IA - Traduire des Fichiers SRT en Ligne',
    ogDesc: 'Importez un fichier .srt et laissez l\u2019IA traduire les sous-titres gratuitement en 15+ langues. Fusion intelligente de phrases, alignement de la timeline, retour à la ligne automatique. Sans inscription.',
    jsonldName: 'Traducteur de Sous-titres SRT', jsonldAlt: 'Traducteur gratuit de sous-titres par IA',
    jsonldDesc: 'Traducteur en ligne gratuit de sous-titres SRT par IA. Traduisez des fichiers de sous-titres entre le français, l\u2019anglais, le chinois, le japonais et 15+ langues, avec fusion intelligente de phrases, alignement de la timeline et retour à la ligne automatique.',
    currency: 'EUR',
    copy: '<section class="seo" aria-label="À propos de cet outil" style="max-width:1360px;margin:32px auto 0;padding:20px 24px 0;border-top:1px solid var(--line);color:var(--sub);font-size:13px;line-height:1.8;">\n    <h2 style="font-size:15px;color:var(--ink);margin:0 0 10px;font-weight:600;">Traducteur de Sous-titres SRT Gratuit par IA</h2>\n    <p>Voici un <strong>outil en ligne gratuit de traduction de sous-titres basé sur de grands modèles de langage (IA)</strong>. Importez un fichier .srt et traduisez des sous-titres entre le français, l\u2019anglais, le chinois, le japonais, le coréen, l\u2019espagnol et 15+ autres langues. Sans inscription, sans installation et sans filigrane — ouvrez-le dans le navigateur et commencez à traduire. Les données des sous-titres restent dans votre navigateur, sauf si vous activez la traduction cloud.</p>\n    <p style="margin-top:8px;"><strong>Fonctions principales :</strong> analyse de fichiers SRT et traduction par IA, fusion intelligente de phrases (quand une phrase s\u2019étale sur plusieurs sous-titres, ils sont fusionnés, traduits puis répartis sur la timeline d\u2019origine), alignement de la timeline, retour à la ligne automatique pour textes CJK et occidentaux, suppression des tics de langage, gestion des noms propres et styles de traduction au choix. Exportez un fichier .srt standard prêt à incruster dans votre vidéo.</p>\n    <p style="margin-top:8px;"><strong>Pour qui :</strong> traducteurs vidéo, créateurs YouTube et localisateurs, apprenants en langues, équipes de sous-titres et équipes qui doivent localiser rapidement du contenu vidéo.</p>\n  </section>\n  <noscript>\n    <p style="max-width:1360px;margin:24px auto;padding:0 24px;color:#1C2E2B;">Cet outil nécessite JavaScript. Activez-le dans votre navigateur, puis importez un fichier .srt pour traduire des sous-titres gratuitement avec l\u2019IA.</p>\n  </noscript>'
  },
  'id': {
    htmlLang: 'id', ogLocale: 'id_ID', siteName: 'Penerjemah Subtitle SRT',
    title: 'Penerjemah Subtitle Gratis dengan AI - Terjemahkan File SRT Online | 15+ Bahasa',
    desc: 'Penerjemah subtitle SRT gratis dengan AI. Unggah file .srt dan terjemahkan subtitle ke bahasa Indonesia, Inggris, Spanyol, Mandarin, Jepang, Korea, dan 15+ bahasa lainnya. Penggabungan kalimat cerdas, penyelarasan timeline, pembungkusan baris otomatis, penghapusan kata pengisi. Tanpa daftar, tanpa watermark.',
    kw: 'terjemah subtitle, penerjemah srt, subtitle AI, terjemahkan subtitle online, penerjemah subtitle gratis, subtitle film, terjemah video, subtitle youtube',
    ogTitle: 'Penerjemah Subtitle Gratis dengan AI - Terjemahkan File SRT Online',
    ogDesc: 'Unggah file .srt dan biarkan AI menerjemahkan subtitle ke 15+ bahasa secara gratis. Penggabungan kalimat cerdas, penyelarasan timeline, pembungkusan baris otomatis. Tanpa daftar.',
    jsonldName: 'Penerjemah Subtitle SRT', jsonldAlt: 'Penerjemah subtitle gratis dengan AI',
    jsonldDesc: 'Penerjemah subtitle SRT online gratis dengan AI. Terjemahkan file subtitle antara bahasa Indonesia, Inggris, Spanyol, Mandarin, Jepang, dan 15+ bahasa lainnya dengan penggabungan kalimat cerdas, penyelarasan timeline, dan pembungkusan baris otomatis.',
    currency: 'IDR',
    copy: '<section class="seo" aria-label="Tentang alat ini" style="max-width:1360px;margin:32px auto 0;padding:20px 24px 0;border-top:1px solid var(--line);color:var(--sub);font-size:13px;line-height:1.8;">\n    <h2 style="font-size:15px;color:var(--ink);margin:0 0 10px;font-weight:600;">Penerjemah Subtitle SRT Gratis dengan AI</h2>\n    <p>Ini adalah <strong>alat penerjemahan subtitle online gratis berbasis model bahasa besar (AI)</strong>. Unggah file .srt dan terjemahkan subtitle antara bahasa Indonesia, Inggris, Spanyol, Mandarin, Jepang, Korea, dan 15+ bahasa lainnya. Tanpa daftar, tanpa instalasi, tanpa watermark — buka di browser dan langsung terjemahkan. Data subtitle tetap di browser Anda kecuali Anda mengaktifkan terjemahan cloud.</p>\n    <p style="margin-top:8px;"><strong>Fitur utama:</strong> parsing file SRT dan terjemahan AI, penggabungan kalimat cerdas (saat satu kalimat terbagi ke beberapa subtitle, semuanya digabung, diterjemahkan, lalu dibagi ulang sesuai timeline asli), penyelarasan timeline, pembungkusan baris otomatis untuk teks CJK dan Barat, penghapusan kata pengisi, pengelolaan istilah khusus, dan pilihan gaya terjemahan. Ekspor file .srt standar yang siap ditanam ke video Anda.</p>\n    <p style="margin-top:8px;"><strong>Untuk siapa:</strong> penerjemah video, kreator YouTube, pelajar bahasa, tim subtitle, dan tim yang perlu melokalkan konten video dengan cepat.</p>\n  </section>\n  <noscript>\n    <p style="max-width:1360px;margin:24px auto;padding:0 24px;color:#1C2E2B;">Alat ini membutuhkan JavaScript. Aktifkan JavaScript di browser Anda, lalu unggah file subtitle .srt untuk menerjemahkan subtitle dengan AI secara gratis.</p>\n  </noscript>'
  },
  'hi': {
    htmlLang: 'hi', ogLocale: 'hi_IN', siteName: 'SRT सबटाइटल अनुवादक',
    title: 'मुफ़्त AI सबटाइटल अनुवादक - SRT फ़ाइलें ऑनलाइन अनुवाद करें | 15+ भाषाएँ',
    desc: 'AI आधारित मुफ़्त SRT सबटाइटल अनुवादक। एक .srt फ़ाइल अपलोड करें और सबटाइटल को हिंदी, अंग्रेज़ी, चीनी, जापानी, स्पेनिश सहित 15+ भाषाओं में अनुवाद करें। स्मार्ट वाक्य-विलय, टाइमलाइन संरेखण, स्वचालित लाइन-रैप, फिलर-शब्द हटाना। साइनअप नहीं, वॉटरमार्क नहीं।',
    kw: 'सबटाइटल अनुवाद, SRT अनुवाद, AI सबटाइटल, मुफ़्त सबटाइटल अनुवादक, ऑनलाइन सबटाइटल अनुवाद, वीडियो अनुवाद, यूट्यूब सबटाइटल',
    ogTitle: 'मुफ़्त AI सबटाइटल अनुवादक - SRT फ़ाइलें ऑनलाइन अनुवाद करें',
    ogDesc: '.srt फ़ाइल अपलोड करें और AI से सबटाइटल को 15+ भाषाओं में मुफ़्त अनुवाद करवाएँ। स्मार्ट वाक्य-विलय, टाइमलाइन संरेखण, स्वचालित लाइन-रैप। साइनअप नहीं।',
    jsonldName: 'SRT सबटाइटल अनुवादक', jsonldAlt: 'मुफ़्त AI सबटाइटल अनुवाद उपकरण',
    jsonldDesc: 'AI आधारित मुफ़्त ऑनलाइन SRT सबटाइटल अनुवादक। हिंदी, अंग्रेज़ी, चीनी, जापानी सहित 15+ भाषाओं के बीच सबटाइटल फ़ाइलों का अनुवाद करें — स्मार्ट वाक्य-विलय, टाइमलाइन संरेखण और स्वचालित लाइन-रैप के साथ।',
    currency: 'INR',
    copy: '<section class="seo" aria-label="इस टूल के बारे में" style="max-width:1360px;margin:32px auto 0;padding:20px 24px 0;border-top:1px solid var(--line);color:var(--sub);font-size:13px;line-height:1.8;">\n    <h2 style="font-size:15px;color:var(--ink);margin:0 0 10px;font-weight:600;">मुफ़्त AI SRT सबटाइटल अनुवादक</h2>\n    <p>यह <strong>बड़े भाषा मॉडल (AI) पर आधारित मुफ़्त ऑनलाइन SRT सबटाइटल अनुवाद सेवा</strong> है। एक .srt फ़ाइल अपलोड करें और हिंदी, अंग्रेज़ी, चीनी, जापानी, कोरियाई, स्पेनिश सहित 15+ भाषाओं के बीच सबटाइटल का अनुवाद करें। साइनअप नहीं, इंस्टॉल नहीं, वॉटरमार्क नहीं — ब्राउज़र में खोलें और अनुवाद शुरू करें। जब तक आप क्लाउड अनुवाद सक्रिय न करें, सबटाइटल डेटा आपके ब्राउज़र में ही रहता है।</p>\n    <p style="margin-top:8px;"><strong>मुख्य सुविधाएँ:</strong> SRT फ़ाइल पार्सिंग और AI अनुवाद, स्मार्ट वाक्य-विलय (जब एक वाक्य कई सबटाइटलों में बँटा हो, तो उन्हें जोड़कर अनुवाद कर मूल टाइमलाइन पर फिर बाँटा जाता है), टाइमलाइन संरेखण, CJK और पश्चिमी टेक्स्ट के लिए स्वचालित लाइन-रैप, फिलर-शब्द हटाना, संज्ञा-प्रबंधन और चुनने योग्य अनुवाद शैलियाँ। मानक .srt फ़ाइल एक्सपोर्ट करें, जो सीधे आपके वीडियो में जोड़ी जा सकती है।</p>\n    <p style="margin-top:8px;"><strong>किसके लिए:</strong> वीडियो अनुवादक, YouTube क्रिएटर, भाषा सीखने वाले, सबटाइटल टीमें और वे टीमें जिन्हें वीडियो सामग्री जल्दी स्थानीयकृत करनी है।</p>\n  </section>\n  <noscript>\n    <p style="max-width:1360px;margin:24px auto;padding:0 24px;color:#1C2E2B;">इस टूल के लिए JavaScript आवश्यक है। ब्राउज़र में JavaScript सक्रिय करें, फिर .srt सबटाइटल फ़ाइल अपलोड करके AI से मुफ़्त सबटाइटल अनुवाद कराएँ।</p>\n  </noscript>'
  },
  'th': {
    htmlLang: 'th', ogLocale: 'th_TH', siteName: 'ตัวแปลซับไตเติล SRT',
    title: 'แปลซับไตเติลฟรีด้วย AI - แปลไฟล์ SRT ออนไลน์ | รองรับ 15+ ภาษา',
    desc: 'ตัวแปลซับไตเติล SRT ฟรีด้วย AI อัปโหลดไฟล์ .srt แล้วแปลซับไตเติลเป็นภาษาไทย อังกฤษ จีน ญี่ปุ่น เกาหลี สเปน และ 15+ ภาษา รวมประโยคอัจฉริยะ จัดแนวไทม์ไลน์ ตัดบรรทัดอัตโนมัติ ลบคำไร้สาระ ไม่ต้องสมัคร ไม่มีลายน้ำ',
    kw: 'แปลซับไตเติล, แปล srt, ซับไตเติล AI, แปลซับออนไลน์, ตัวแปลซับฟรี, ซับหนัง, แปลวิดีโอ, ซับยูทูป',
    ogTitle: 'แปลซับไตเติลฟรีด้วย AI - แปลไฟล์ SRT ออนไลน์',
    ogDesc: 'อัปโหลดไฟล์ .srt แล้วให้ AI แปลซับไตเติลเป็น 15+ ภาษาฟรี รวมประโยคอัจฉริยะ จัดแนวไทม์ไลน์ ตัดบรรทัดอัตโนมัติ ไม่ต้องสมัคร',
    jsonldName: 'ตัวแปลซับไตเติล SRT', jsonldAlt: 'ตัวแปลซับไตเติลฟรีด้วย AI',
    jsonldDesc: 'ตัวแปลซับไตเติล SRT ออนไลน์ฟรีด้วย AI แปลไฟล์ซับไตเติลระหว่างภาษาไทย อังกฤษ จีน ญี่ปุ่น และ 15+ ภาษา พร้อมการรวมประโยคอัจฉริยะ จัดแนวไทม์ไลน์ และตัดบรรทัดอัตโนมัติ',
    currency: 'THB',
    copy: '<section class="seo" aria-label="เกี่ยวกับเครื่องมือนี้" style="max-width:1360px;margin:32px auto 0;padding:20px 24px 0;border-top:1px solid var(--line);color:var(--sub);font-size:13px;line-height:1.8;">\n    <h2 style="font-size:15px;color:var(--ink);margin:0 0 10px;font-weight:600;">ตัวแปลซับไตเติล SRT ฟรีด้วย AI</h2>\n    <p>นี่คือ<strong>บริการแปลซับไตเติล SRT ออนไลน์ฟรีที่ขับเคลื่อนด้วยโมเดลภาษาขนาดใหญ่ (AI)</strong> อัปโหลดไฟล์ .srt แล้วแปลซับไตเติลระหว่างภาษาไทย อังกฤษ จีน ญี่ปุ่น เกาหลี สเปน และอีก 15+ ภาษา ไม่ต้องสมัคร ไม่ต้องติดตั้ง ไม่มีลายน้ำ เปิดในเบราว์เซอร์แล้วแปลได้เลย ข้อมูลซับไตเติลจะอยู่ในเบราว์เซอร์ของคุณ เว้นแต่คุณจะเปิดใช้การแปลผ่านคลาวด์</p>\n    <p style="margin-top:8px;"><strong>ฟีเจอร์หลัก:</strong> แยกไฟล์ SRT และแปลด้วย AI, รวมประโยคอัจฉริยะ (เมื่อประโยคหนึ่งกระจายอยู่หลายซับ ระบบจะรวม แปล แล้วแบ่งกลับตามไทม์ไลน์เดิม), จัดแนวไทม์ไลน์, ตัดบรรทัดอัตโนมัติสำหรับข้อความ CJK และตะวันตก, ลบคำไร้สาระ, จัดการคำเฉพาะ และเลือกสไตล์การแปลได้ ส่งออกไฟล์ .srt มาตรฐานพร้อมใส่ในวิดีโอของคุณทันที</p>\n    <p style="margin-top:8px;"><strong>เหมาะสำหรับ:</strong> นักแปลวิดีโอ ครีเอเตอร์ YouTube ผู้เรียนภาษา ทีมซับไตเติล และทีมที่ต้องการแปลเนื้อหาวิดีโอให้เป็นภาษาท้องถิ่นอย่างรวดเร็ว</p>\n  </section>\n  <noscript>\n    <p style="max-width:1360px;margin:24px auto;padding:0 24px;color:#1C2E2B;">เครื่องมือนี้ต้องใช้ JavaScript โปรดเปิดใช้ JavaScript ในเบราว์เซอร์ แล้วอัปโหลดไฟล์ซับไตเติล .srt เพื่อแปลซับไตเติลด้วย AI ฟรี</p>\n  </noscript>'
  },
  'vi': {
    htmlLang: 'vi', ogLocale: 'vi_VN', siteName: 'Trình Dịch Phụ đề SRT',
    title: 'Trình Dịch Phụ đề Miễn phí bằng AI - Dịch File SRT Online | 15+ Ngôn ngữ',
    desc: 'Trình dịch phụ đề SRT miễn phí bằng AI. Tải lên file .srt và dịch phụ đề sang tiếng Việt, Anh, Trung, Nhật, Hàn, Tây Ban Nha và 15+ ngôn ngữ. Gộp câu thông minh, căn chỉnh timeline, ngắt dòng tự động, loại từ đệm. Không cần đăng ký, không watermark.',
    kw: 'dịch phụ đề, dịch srt, phụ đề AI, trình dịch phụ đề miễn phí, dịch phụ đề online, phụ đề phim, dịch video, phụ đề youtube',
    ogTitle: 'Trình Dịch Phụ đề Miễn phí bằng AI - Dịch File SRT Online',
    ogDesc: 'Tải lên file .srt và để AI dịch phụ đề sang 15+ ngôn ngữ miễn phí. Gộp câu thông minh, căn chỉnh timeline, ngắt dòng tự động. Không cần đăng ký.',
    jsonldName: 'Trình Dịch Phụ đề SRT', jsonldAlt: 'Trình dịch phụ đề miễn phí bằng AI',
    jsonldDesc: 'Trình dịch phụ đề SRT online miễn phí bằng AI. Dịch file phụ đề giữa tiếng Việt, Anh, Trung, Nhật và 15+ ngôn ngữ với gộp câu thông minh, căn chỉnh timeline và ngắt dòng tự động.',
    currency: 'VND',
    copy: '<section class="seo" aria-label="Về công cụ này" style="max-width:1360px;margin:32px auto 0;padding:20px 24px 0;border-top:1px solid var(--line);color:var(--sub);font-size:13px;line-height:1.8;">\n    <h2 style="font-size:15px;color:var(--ink);margin:0 0 10px;font-weight:600;">Trình Dịch Phụ đề SRT Miễn phí bằng AI</h2>\n    <p>Đây là <strong>công cụ dịch phụ đề online miễn phí dựa trên mô hình ngôn ngữ lớn (AI)</strong>. Tải lên file .srt và dịch phụ đề giữa tiếng Việt, Anh, Trung, Nhật, Hàn, Tây Ban Nha và 15+ ngôn ngữ khác. Không cần đăng ký, không cài đặt, không watermark — mở bằng trình duyệt và bắt đầu dịch. Dữ liệu phụ đề luôn nằm trong trình duyệt của bạn trừ khi bạn bật dịch qua cloud.</p>\n    <p style="margin-top:8px;"><strong>Tính năng chính:</strong> phân tích file SRT và dịch bằng AI, gộp câu thông minh (khi một câu trải dài qua nhiều phụ đề, chúng được gộp lại, dịch, rồi chia về đúng timeline gốc), căn chỉnh timeline, ngắt dòng tự động cho văn bản CJK và phương Tây, loại từ đệm, quản lý thuật ngữ riêng và chọn phong cách dịch. Xuất file .srt chuẩn, sẵn sàng nhúng vào video của bạn.</p>\n    <p style="margin-top:8px;"><strong>Dành cho ai:</strong> người dịch video, nhà sáng tạo YouTube, người học ngoại ngữ, nhóm làm phụ đề và các đội ngũ cần bản địa hóa nội dung video nhanh chóng.</p>\n  </section>\n  <noscript>\n    <p style="max-width:1360px;margin:24px auto;padding:0 24px;color:#1C2E2B;">Công cụ này cần JavaScript. Hãy bật JavaScript trong trình duyệt, sau đó tải lên file phụ đề .srt để dịch phụ đề miễn phí bằng AI.</p>\n  </noscript>'
  },
  'ru': {
    htmlLang: 'ru', ogLocale: 'ru_RU', siteName: 'Переводчик Субтитров SRT',
    title: 'Бесплатный ИИ-переводчик субтитров - Перевод SRT-файлов онлайн | 15+ Языков',
    desc: 'Бесплатный ИИ-переводчик субтитров SRT. Загрузите файл .srt и переведите субтитры на русский, английский, китайский, японский, испанский и 15+ языков. Умное объединение предложений, выравнивание таймлайна, автоматический перенос строк, удаление слов-паразитов. Без регистрации, без водяных знаков.',
    kw: 'перевод субтитров, перевести srt, субтитры ИИ, бесплатный переводчик субтитров, перевести субтитры онлайн, субтитры для фильмов, перевод видео, субтитры youtube',
    ogTitle: 'Бесплатный ИИ-переводчик субтитров - Перевод SRT-файлов онлайн',
    ogDesc: 'Загрузите файл .srt, и ИИ бесплатно переведёт субтитры на 15+ языков. Умное объединение предложений, выравнивание таймлайна, автоматический перенос строк. Без регистрации.',
    jsonldName: 'Переводчик Субтитров SRT', jsonldAlt: 'Бесплатный ИИ-переводчик субтитров',
    jsonldDesc: 'Бесплатный онлайн ИИ-переводчик субтитров SRT. Переводите файлы субтитров между русским, английским, китайским, японским и 15+ языками с умным объединением предложений, выравниванием таймлайна и автоматическим переносом строк.',
    currency: 'RUB',
    copy: '<section class="seo" aria-label="Об этом инструменте" style="max-width:1360px;margin:32px auto 0;padding:20px 24px 0;border-top:1px solid var(--line);color:var(--sub);font-size:13px;line-height:1.8;">\n    <h2 style="font-size:15px;color:var(--ink);margin:0 0 10px;font-weight:600;">Бесплатный ИИ-переводчик субтитров SRT</h2>\n    <p>Это <strong>бесплатный онлайн-инструмент перевода субтитров на базе больших языковых моделей (ИИ)</strong>. Загрузите файл .srt и переводите субтитры между русским, английским, китайским, японским, корейским, испанским и 15+ другими языками. Без регистрации, без установки и без водяных знаков — откройте в браузере и начинайте переводить. Данные субтитров остаются в вашем браузере, если вы не включите облачный перевод.</p>\n    <p style="margin-top:8px;"><strong>Основные функции:</strong> разбор SRT-файлов и ИИ-перевод, умное объединение предложений (когда одно предложение разбросано по нескольким субтитрам, они объединяются, переводятся и распределяются обратно по исходному таймлайну), выравнивание таймлайна, автоматический перенос строк для CJK и западного текста, удаление слов-паразитов, управление именами собственными и выбор стиля перевода. Экспорт стандартного .srt-файла, готового к вшиванию в ваше видео.</p>\n    <p style="margin-top:8px;"><strong>Для кого:</strong> переводчики видео, YouTube-авторы и локализаторы, изучающие языки, команды субтитров и коллективы, которым нужно быстро локализовать видеоконтент.</p>\n  </section>\n  <noscript>\n    <p style="max-width:1360px;margin:24px auto;padding:0 24px;color:#1C2E2B;">Для работы инструмента нужен JavaScript. Включите JavaScript в браузере, затем загрузите файл субтитров .srt, чтобы бесплатно перевести субтитры с помощью ИИ.</p>\n  </noscript>'
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
    html = html.replace('<html lang="zh-CN"', '<html lang="' + SEO[lang].htmlLang + '"');
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

/* sitemap：4 语言 URL + hreflang alternates */
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
  if (!r.ok) throw new Error('上游 HTTP ' + r.status + ' ' + text.slice(0, 200));
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
        return sendJson(res, 503, { error: { code: 'not_configured', message: '管理员尚未配置默认模型，请改用自定义 API。' } });
      }
      const usage = readUsage();
      const ip = clientIp(req);
      const ipUsed = usage.ips[ip] || 0;
      if (cfg.perIpDaily > 0 && ipUsed >= cfg.perIpDaily) {
        return sendJson(res, 429, { error: { code: 'ip_limit', message: '今日该访问的免费翻译额度（' + cfg.perIpDaily + ' 次请求）已用完，可填写自己的 API Key 继续使用。' } });
      }
      if (cfg.globalDaily > 0 && usage.global >= cfg.globalDaily) {
        return sendJson(res, 429, { error: { code: 'global_limit', message: '本站今日免费翻译总额度已用完，可填写自己的 API Key 继续使用。' } });
      }
      let body;
      try { body = JSON.parse(await readBody(req, 2 * 1024 * 1024)); } catch (e) {
        return sendJson(res, 400, { error: { code: 'bad_request', message: '请求体不是合法 JSON' } });
      }
      if (!Array.isArray(body.messages) || !body.messages.length) {
        return sendJson(res, 400, { error: { code: 'bad_request', message: '缺少 messages' } });
      }
      usage.ips[ip] = ipUsed + 1;
      usage.global += 1;
      writeUsage(usage);
      try {
        const out = await callModel(cfg, body.messages, undefined);
        return sendJson(res, 200, out); // 原样透传 OpenAI 兼容响应
      } catch (e) {
        return sendJson(res, 502, { error: { code: 'upstream_error', message: '默认模型调用失败：' + e.message } });
      }
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
          const out = await callModel(cfg, [{ role: 'user', content: 'Reply with exactly: OK' }], 10);
          const sample = out.choices && out.choices[0] && out.choices[0].message ? out.choices[0].message.content : '';
          return sendJson(res, 200, { ok: true, sample: String(sample).slice(0, 40) });
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
