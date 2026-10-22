/* _path339.js —— 验证 pathUiLang() 修复：URL 语言必须赢过浏览器语言
 *
 * 场景：浏览器设成 zh-CN（最常见的中文访客），直接访问 /ms/、/en/、/fa/qc.html 这类 URL。
 * 修之前：URL 语言不在各页面写死的 26/27 语清单里 → 退回浏览器语言 → 中文访客在 /ms/ 看到中文页。
 * 修之后：URL 语言优先。
 *
 * 用法：PORT=3499 node _path339.js
 */
'use strict';
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');
const { spawn } = require('child_process');
const http = require('http');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PORT = parseInt(process.env.PORT || '3499', 10);
const DP = parseInt(process.env.DEBUG_PORT || '9810', 10);
const BASE = 'http://127.0.0.1:' + PORT;
const wait = ms => new Promise(r => setTimeout(r, ms));

let ws, tid = 0; const pending = new Map();
function send(m, p, s) {
  const id = ++tid; ws.send(JSON.stringify({ id, method: m, params: p || {}, sessionId: s }));
  return new Promise((res, rej) => { pending.set(id, { res, rej }); setTimeout(() => { if (pending.has(id)) { pending.delete(id); rej(new Error('timeout ' + m)); } }, 30000); });
}
async function ev(e, s) {
  const r = await send('Runtime.evaluate', { expression: e, returnByValue: true, awaitPromise: true }, s);
  if (r.exceptionDetails) throw new Error(r.exceptionDetails.text);
  return r.result.value;
}
let P = 0, F = 0;
const t = (c, n, x) => { console.log((c ? '  ✓ ' : '  ✗ ') + n + (x !== undefined ? '   [' + String(x).slice(0, 130) + ']' : '')); c ? P++ : F++; };

/* [URL, 期望 UI.lang, 期望 dir, 说明] */
const CASES = [
  ['/', 'zh-CN', 'ltr', '根路径没有语言段 → 听浏览器（zh-CN）'],
  ['/en/', 'en', 'ltr', '老语言：URL 赢过浏览器'],
  ['/ja/', 'ja', 'ltr', '老语言：URL 赢过浏览器'],
  ['/he/', 'he', 'rtl', '老 RTL 语言'],
  ['/ms/', 'ms', 'ltr', '新语言（原写死清单里没有）'],
  ['/fa/', 'fa', 'rtl', '新 RTL 语言'],
  ['/bo/', 'bo', 'ltr', '新语言（藏文）'],
  ['/yi/', 'yi', 'rtl', '新 RTL 语言（意第绪）'],
  ['/mi/', 'mi', 'ltr', '新语言（毛利）'],
  ['/en/merge.html', 'en', 'ltr', '工具页 老语言'],
  ['/ms/merge.html', 'ms', 'ltr', '工具页 新语言（无译文 → t() 落英文）'],
  ['/fa/qc.html', 'fa', 'rtl', '工具页 新 RTL'],
  ['/bo/clean.html', 'bo', 'ltr', 'clean 用 CLEAN_UI_LANGS'],
  ['/mi/split.html', 'mi', 'ltr', 'split 用 LANGS'],
];

(async () => {
  const srv = spawn('node', ['server.js'], { cwd: __dirname, env: Object.assign({}, process.env, { PORT: String(PORT) }), stdio: ['ignore', 'ignore', 'pipe'] });
  let slog = ''; srv.stderr.on('data', d => slog += d);
  await wait(6000);

  const chrome = spawn(CHROME, ['--headless=new', '--remote-debugging-port=' + DP, '--no-sandbox', '--disable-gpu',
    '--lang=zh-CN', '--user-data-dir=/tmp/cr-path339-' + Date.now(), 'about:blank'], { stdio: 'ignore' });
  await wait(2500);
  let tgt = null;
  for (let i = 0; i < 40 && !tgt; i++) {
    try {
      const r = await new Promise((res, rej) => { const q = http.get({ host: '127.0.0.1', port: DP, path: '/json/list' }, s => { let d = ''; s.on('data', c => d += c); s.on('end', () => res(JSON.parse(d))); }); q.on('error', rej); q.setTimeout(2000, () => q.destroy(new Error('t'))); });
      tgt = (r || []).find(x => x.type === 'page');
    } catch (e) { await wait(500); }
  }
  if (!tgt) { console.log('浏览器没起来'); srv.kill(); chrome.kill(); process.exit(2); }
  ws = new WebSocket(tgt.webSocketDebuggerUrl, { perMessageDeflate: false });
  await new Promise((r, j) => { ws.on('open', r); ws.on('error', j); });
  ws.on('message', d => { const m = JSON.parse(d); if (m.id && pending.has(m.id)) { pending.get(m.id).res(m.result || m); pending.delete(m.id); } });
  await send('Page.enable'); await send('Runtime.enable'); await send('Log.enable'); await send('Network.enable');

  const errs = [];
  ws.on('message', d => {
    const m = JSON.parse(d);
    if (m.method === 'Runtime.exceptionThrown') errs.push('JS 异常: ' + ((m.params || {}).exceptionDetails || {}).text);
    if (m.method === 'Log.entryAdded' && ((((m.params || {}).entry) || {}).level) === 'error') errs.push('console.error: ' + m.params.entry.text);
  });

  /* 关键：把浏览器语言锁成 zh-CN，模拟中文访客 */
  const navSrc = 'Object.defineProperty(navigator,"language",{get:function(){return "zh-CN";}});' +
    'Object.defineProperty(navigator,"languages",{get:function(){return ["zh-CN","zh"];}});';
  await send('Page.addScriptToEvaluateOnNewDocument', { source: navSrc });

  const { sessionId } = await send('Target.attachToTarget', { targetId: tgt.id, flatten: true });

  console.log('浏览器语言锁死为 zh-CN，逐个 URL 检查界面语言是否听 URL 的\n');
  for (const [url, wantLang, wantDir, note] of CASES) {
    await send('Page.navigate', { url: BASE + url + '?_=' + Date.now() }, sessionId);
    for (let i = 0; i < 60; i++) { const st = await ev('document.readyState', sessionId); if (st === 'complete') break; await wait(250); }
    await wait(1200);
    const d = await ev(`({
      navLang: navigator.language,
      path: location.pathname,
      htmlLang: document.documentElement.lang,
      dir: document.documentElement.dir,
      uiLang: (window.SiteI18N && SiteI18N.UI) ? SiteI18N.UI.lang
              : (typeof LANG !== 'undefined' ? LANG : (typeof UI_LANGS !== 'undefined' ? '(inline)' : null)),
      title: document.title.slice(0, 70),
      codes: window.UI_CODES ? UI_CODES.length : -1
    })`, sessionId);
    /* LTR 时服务端根本不写 dir 属性（HTML 默认就是 ltr），空值不算错；
       RTL 必须有 dir="rtl"，漏了整页排版就反了。 */
    const dirOk = wantDir === 'rtl' ? d.dir === 'rtl' : (d.dir === 'ltr' || d.dir === '');
    t(d.htmlLang === wantLang && dirOk,
      url.padEnd(16) + ' → lang=' + wantLang + ' dir=' + wantDir + '  ' + note,
      JSON.stringify({ nav: d.navLang, htmlLang: d.htmlLang, dir: d.dir, codes: d.codes, title: d.title }));
  }

  console.log('');
  t(errs.length === 0, '全程无 JS 异常 / console.error', errs.slice(0, 3).join(' | '));

  console.log('\n' + P + ' ✓ / ' + F + ' ✗');
  if (slog.trim()) console.log('服务日志: ' + slog.trim().slice(0, 300));
  srv.kill('SIGTERM'); chrome.kill();
  await wait(400);
  process.exit(F ? 1 : 0);
})().catch(e => { console.error('FATAL', e.message); process.exit(1); });
