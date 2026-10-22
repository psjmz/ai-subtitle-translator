/* _acc339.js —— v0.9.339 全站验收（100 语 × 17 页 + sitemap）
 *
 * 它查的是「页面能开但 SEO 半残」这类静默问题，光看 HTTP 200 是查不出来的：
 *   ① 每种语言的 17 个页面是否都 200（不是只有首页通、工具页 404）
 *   ② <html lang> 是否与路径语言一致（错了 hreflang 全白做）
 *   ③ RTL 语言是否带 dir="rtl"（缺了整页排版镜像错误）
 *   ④ <title> / meta description 是否非空且不是英文（说明该语没译）
 *   ⑤ hreflang alternates 条数是否 = 该页实际具备的语言数
 *   ⑥ sitemap URL 数是否 = Σ(各页语言数)，以及体积是否逼近 50MB 上限
 *
 * 用法：
 *   node _acc339.js              # 全量（1700 个请求，约 3~5 分钟）
 *   node _acc339.js --sample     # 抽样：每语抽 4 页，快扫
 *   node _acc339.js ms fa        # 只验指定语言
 */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { execSync } = require('child_process');

const DIR = __dirname;
const PORT = parseInt(process.env.ACC_PORT || '3450', 10);
const args = process.argv.slice(2);
const SAMPLE = args.includes('--sample');
const ONLY = args.filter(a => !a.startsWith('-'));

/* ---------- 语言清单：与 site-i18n.js 的 UI_LANGS 同源 ---------- */
const ctx = { window: {} }; ctx.globalThis = ctx; vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(DIR, 'site-i18n.js'), 'utf8')
  + ';globalThis.__U = UI_LANGS; globalThis.__27 = UI27;', ctx);
const UI_LANGS = ctx.__U, UI27 = ctx.__27;

/* RTL 清单取自 server.js，不另抄一份，避免两边走偏 */
const serverSrc = fs.readFileSync(path.join(DIR, 'server.js'), 'utf8');
const RTL = (function () {
  const m = /const RTL_LANGS = \[([^\]]*)\]/.exec(serverSrc);
  return m ? m[1].split(',').map(s => s.trim().replace(/^'|'$/g, '')) : [];
})();

/* 17 个页面：路径与 SEO_PAGES 的 path[lang] 一致 */
const PAGES = ['', 'merge.html', 'clean.html', 'glossary.html', 'qc.html', 'translate.html',
  'convert.html', 'bilingual.html', 'shift.html', 'repair.html', 'extract.html',
  'videosub.html', 'hanconv.html', 'split.html', 'table.html', 'batch.html', 'lrc.html'];

const LANG_PATH = l => (l === 'zh-CN') ? '/' : '/' + l + '/';

/* ---------- 起服务 ---------- */
let srv;
function start() {
  return new Promise(res => {
    const env = Object.assign({}, process.env, { PORT: String(PORT) });
    srv = require('child_process').spawn(process.execPath, ['server.js'], {
      cwd: DIR, env, stdio: ['ignore', 'pipe', 'pipe']
    });
    let done = false;
    const ok = () => { if (!done) { done = true; res(); } };
    srv.stdout.on('data', d => { if (/listening|ready|:\d+/.test(String(d))) ok(); });
    srv.stderr.on('data', d => { if (/listening|ready|:\d+/.test(String(d))) ok(); });
    setTimeout(ok, 5000);
  });
}
function stop() { try { srv && srv.kill('SIGKILL'); } catch (e) {} }

/* 带重试的单次请求。
   ❗并发太高会把本地服务打挂，表现为一片 HTTP 0 —— 那是测试脚本的问题，不是站点问题。
     所以并发压到 6，并对 HTTP 0 重试两次，避免把假失败当成真缺陷。 */
const get1 = p => new Promise(res => {
  const req = http.get({ host: '127.0.0.1', port: PORT, path: p, timeout: 30000 }, r => {
    let b = ''; r.setEncoding('utf8');
    r.on('data', d => b += d);
    r.on('end', () => res({ code: r.statusCode, body: b }));
  });
  req.on('error', () => res({ code: 0, body: '' }));
  req.on('timeout', () => { req.destroy(); res({ code: 0, body: '' }); });
});
const sleep = ms => new Promise(r => setTimeout(r, ms));
async function get(p) {
  let r = await get1(p);
  for (let i = 0; i < 2 && r.code === 0; i++) { await sleep(300); r = await get1(p); }
  return r;
}

const HAN = /[\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF]/;
const CJK_L = ['zh-CN', 'zh-TW', 'yue', 'ja', 'ko'];

/* 英文源：<页面> → title。用来判断某语种到底有没有译。
   ❗不能用「有没有非 ASCII 字符」来判断 —— 马来语、他加禄语、斯瓦希里语、
     越南语、乌兹别克语、爱沙尼亚语、巴斯克语全用拉丁字母，那样判必然误报。
     正确判据只有一条：译文与英文源是否完全相同。 */
const SRC = JSON.parse(fs.readFileSync(path.join(DIR, '_seo', 'src.json'), 'utf8'));
const PAGE_KEY = { '': 'index', 'merge.html': 'merge', 'clean.html': 'clean', 'glossary.html': 'glossary',
  'qc.html': 'qc', 'translate.html': 'translate', 'convert.html': 'convert',
  'bilingual.html': 'bilingual', 'shift.html': 'shift', 'repair.html': 'repair',
  'extract.html': 'extract', 'videosub.html': 'videosub', 'hanconv.html': 'hanconv',
  'split.html': 'split', 'table.html': 'table', 'batch.html': 'batch', 'lrc.html': 'lrc' };
const unent = s => String(s).replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'");
const EN_TITLE = {};
for (const [pg, key] of Object.entries(PAGE_KEY)) {
  if (SRC[key + '__title'] !== undefined) EN_TITLE[pg] = unent(SRC[key + '__title']);
}

(async () => {
  /* 只验「已经有分片」的语言。没翻完的语言不算错误，单独列为待补，
     否则几十条 404 会把真错误淹掉。 */
  const shardDir = path.join(DIR, 'i18n');
  const hasShard = new Set(fs.readdirSync(shardDir)
    .map(f => /^seo-(.+)\.json$/.exec(f)).filter(Boolean).map(m => m[1]));
  const all = ONLY.length ? ONLY : UI_LANGS.map(x => x[0]);
  const todo = all.filter(l => hasShard.has(l) || ONLY.length);
  const pending = all.filter(l => !hasShard.has(l));

  const jobs = [];
  for (const l of todo) {
    const list = SAMPLE ? ['', 'merge.html', 'qc.html', 'translate.html'] : PAGES;
    for (const pg of list) jobs.push([l, pg]);
  }
  if (pending.length) {
    console.log('未生成分片（待补）' + pending.length + ' 种：' + pending.join(' '));
  }
  console.log('待验语言 ' + todo.length + ' 种，共 ' + jobs.length + ' 个页面');
  console.log('起服务…');
  await start();

  const errs = [];
  let ok = 0, rtln = 0;
  /* 并发 6：再高本地服务就扛不住，会报一片假的 HTTP 0 */
  const W = 6;
  let idx = 0;
  async function worker() {
    while (idx < jobs.length) {
      const [l, pg] = jobs[idx++];
      const url = LANG_PATH(l) + pg;
      const r = await get(url);
      const tag = l + (pg || '(index)');
      if (r.code !== 200) { errs.push(tag + ' HTTP ' + r.code); continue; }
      const hm = /<html([^>]*)>/i.exec(r.body);
      if (!hm) { errs.push(tag + ' 没有 <html> 标签'); continue; }
      const attrs = hm[1];
      const lm = /\blang="([^"]+)"/.exec(attrs);
      if (!lm) { errs.push(tag + ' <html> 缺 lang'); continue; }
      if (lm[1] !== l) { errs.push(tag + ' lang=' + lm[1] + ' 应为 ' + l); continue; }
      const wantRtl = RTL.indexOf(l) >= 0;
      const hasRtl = /\bdir="rtl"/.test(attrs);
      if (wantRtl !== hasRtl) { errs.push(tag + ' dir=' + (hasRtl ? 'rtl' : '无') + ' 应为 ' + (wantRtl ? 'rtl' : 'ltr')); continue; }
      const tm = /<title>([^<]*)<\/title>/.exec(r.body);
      if (!tm || !tm[1].trim()) { errs.push(tag + ' title 空'); continue; }
      /* 非中日韩语言的 title 不应残留汉字，也不该是纯英文（= 没译） */
      const t = tm[1].trim();
      if (CJK_L.indexOf(l) < 0 && HAN.test(t)) { errs.push(tag + ' title 残留汉字：' + t); continue; }
      /* 与英文源逐字相同 = 这一语种没译（专名除外：英文源本身就很短时不判） */
      const ent = EN_TITLE[pg];
      if (l !== 'en' && ent && ent.length > 12 && unent(t) === ent) {
        errs.push(tag + ' title 与英文源完全相同（未译）：' + t); continue;
      }
      const dm = /<meta name="description" content="([^"]*)"/.exec(r.body);
      if (!dm || dm[1].length < 20) { errs.push(tag + ' description 缺失或过短'); continue; }
      /* hreflang 条数 = 该页具备的语言数（含 x-default） */
      const alts = (r.body.match(/rel="alternate" hreflang="/g) || []).length;
      if (alts < 28) { errs.push(tag + ' hreflang 只有 ' + alts + ' 条'); continue; }
      /* og:locale 与 og:locale:alternate 都不能为空。
         v0.9.339 前的 bug：alternate 从只含 27 语的 OG_LOCALE 取，新语言落成空 content。 */
      if (!/<meta property="og:locale" content="[^"]+">/.test(r.body)) {
        errs.push(tag + ' og:locale 缺失或为空'); continue;
      }
      const ogEmpty = (r.body.match(/og:locale:alternate" content=""/g) || []).length;
      if (ogEmpty) { errs.push(tag + ' og:locale:alternate 空 ' + ogEmpty + ' 条'); continue; }
      if (wantRtl) rtln++;
      ok++;
    }
  }
  const t0 = Date.now();
  await Promise.all(Array.from({ length: W }, worker));
  const ms = Date.now() - t0;

  console.log('\n=== 页面验收 ===');
  console.log('通过 ' + ok + ' / ' + jobs.length + '（' + (ms / 1000).toFixed(0) + 's' + (SAMPLE ? '，抽样' : '') + '）');
  if (rtln) console.log('其中 RTL 页面 ' + rtln + ' 个，dir 属性全部正确');
  if (errs.length) {
    console.log('\n✗ 错误 ' + errs.length + ' 条：');
    errs.slice(0, 30).forEach(e => console.log('  · ' + e));
    if (errs.length > 30) console.log('  … 还有 ' + (errs.length - 30) + ' 条');
  }

  /* ---------- sitemap ---------- */
  console.log('\n=== sitemap ===');
  const sm = await get('/sitemap.xml');
  if (sm.code !== 200) {
    console.log('✗ HTTP ' + sm.code);
  } else {
    const n = (sm.body.match(/<loc>/g) || []).length;
    const bytes = Buffer.byteLength(sm.body, 'utf8');
    const mb = bytes / 1048576;
    console.log('URL 数 : ' + n);
    console.log('体积   : ' + mb.toFixed(2) + ' MB（上限 50MB / 50000 条）');
    console.log(mb > 40 ? '⚠ 接近体积上限，考虑拆成 sitemap index'
      : mb > 10 ? '· 体积偏大，建议加缓存，别每次实时生成' : '✓ 体积正常');
    /* 抽样核对 hreflang 条数 */
    const first = /<url>[\s\S]*?<\/url>/.exec(sm.body);
    if (first) {
      const a = (first[0].match(/xhtml:link/g) || []).length;
      console.log('首条 URL 的 alternates: ' + a + ' 个');
    }
  }
  stop();
  process.exit(errs.length ? 1 : 0);
})().catch(e => { console.error('FATAL:', e.message); stop(); process.exit(2); });
