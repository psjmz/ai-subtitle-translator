/* _chk316nav.js —— v0.9.316 NAV 胶囊专项（非交付件）
   背景：split/table/batch 三页 NAV 数组曾有双逗号（稀疏洞，map 静默跳过 → 顶栏 14 颗）。
   静态断言已钉死（test-core 316 段），这里真浏览器量一次渲染结果：每页 15 颗、颗颗有字。
   另带：升版后 ver 显示（index/merge/translate）真渲染抽查。 */
'use strict';
process.on('unhandledRejection', e => { console.log('UNHANDLED', e && e.message); });
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');
const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const ROOT = __dirname;
const SRV = 3510 + Math.floor(Math.random() * 60);
const PORT = 9900 + Math.floor(Math.random() * 80);
const wait = ms => new Promise(r => setTimeout(r, ms));

const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8' };
const srv = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  const m = p.match(/^\/[a-zA-Z]{2,3}(?:-[a-zA-Z]{2,4})?\/(.+)$/);
  if (m && fs.existsSync(path.join(ROOT, m[1]))) p = '/' + m[1];
  const f = path.join(ROOT, p === '/' ? 'index.html' : p);
  fs.readFile(f, (e, d) => {
    if (e) { res.writeHead(404); res.end('nf'); return; }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream' });
    res.end(d);
  });
});

let ws, tid = 0; const pending = new Map();
function send(m, p) {
  const id = ++tid; ws.send(JSON.stringify({ id, method: m, params: p || {} }));
  return new Promise((res, rej) => { pending.set(id, { res, rej }); setTimeout(() => { if (pending.has(id)) { pending.delete(id); rej(new Error('timeout ' + m)); } }, 30000); });
}
async function ev(e) {
  const r = await send('Runtime.evaluate', { expression: e, returnByValue: true, awaitPromise: true });
  if (r.exceptionDetails) throw new Error(r.exceptionDetails.text + ' :: ' + (r.exceptionDetails.exception && r.exceptionDetails.exception.description || '').slice(0, 200));
  return r.result.value;
}
let P = 0, F = 0;
const ok = (c, n, x) => { console.log((c ? '  ✓ ' : '  ✗ ') + n + (x !== undefined ? '  [' + String(x).slice(0, 140) + ']' : '')); c ? P++ : F++; };

(async () => {
  await new Promise(r => srv.listen(SRV, '127.0.0.1', r));
  const chrome = spawn(CHROME, ['--headless=new', '--remote-debugging-port=' + PORT, '--no-sandbox', '--disable-gpu',
    '--host-resolver-rules=MAP * ~NOTFOUND, EXCLUDE 127.0.0.1',
    '--lang=zh-CN', '--user-data-dir=/tmp/cr316n-' + Date.now(), 'about:blank'], { stdio: 'ignore' });
  await wait(2000);
  let tgt = null;
  for (let i = 0; i < 30 && !tgt; i++) {
    try {
      const r = await new Promise((res, rej) => { const q = http.get({ host: '127.0.0.1', port: PORT, path: '/json/list' }, s => { let d = ''; s.on('data', c => d += c); s.on('end', () => res(JSON.parse(d))); }); q.on('error', rej); q.setTimeout(2000, () => q.destroy(new Error('t'))); });
      tgt = (r || []).find(t => t.type === 'page');
    } catch (e) { await wait(500); }
  }
  if (!tgt) { console.log('浏览器没起来'); srv.close(); chrome.kill(); process.exit(2); }
  ws = new WebSocket(tgt.webSocketDebuggerUrl, { perMessageDeflate: false });
  await new Promise((r, j) => { ws.on('open', r); ws.on('error', j); });
  ws.on('message', d => { const m = JSON.parse(d); if (m.id && pending.has(m.id)) { pending.get(m.id).res(m.result || m); pending.delete(m.id); } });
  await send('Page.enable'); await send('Runtime.enable');

  async function go(url) {
    await send('Page.navigate', { url });
    for (let i = 0; i < 40; i++) { const st = await ev('document.readyState'); if (st === 'complete') break; await wait(200); }
    await wait(900);
  }

  console.log('== ① 四新页 NAV：15 颗胶囊、颗颗有字、不含自己 ==');
  for (const p of ['split', 'table', 'batch', 'lrc']) {
    await go('http://127.0.0.1:' + SRV + '/' + p + '.html');
    const n = await ev('document.querySelectorAll("#navPills .pill").length');
    ok(n === 15, p + ' 顶栏胶囊 15 颗（双逗号稀疏洞会让它变 14）', n);
    const empty = await ev('[...document.querySelectorAll("#navPills .pill")].filter(a => !a.textContent.trim()).length');
    ok(empty === 0, p + ' 胶囊颗颗有字（空串=词典缺条）', empty);
    const self = await ev('[...document.querySelectorAll("#navPills .pill")].filter(a => (a.getAttribute("href")||"").includes("/' + p + '.html")).length');
    ok(self === 0, p + ' 胶囊不含自己', self);
  }

  console.log('== ② 老页 NAV 不回归（快照口径：shift 走 site-nav=6 颗、hanconv=313 快照 11 颗）==');
  /* 红线：老页一个字不动 —— 316 的「互含 15 颗」只管四新页；
     shift 用 site-nav.js（TOOLS 只有 tr/clean/fx），hanconv 是 313 时的 11 颗快照。 */
  for (const [p, want] of [['shift', 6], ['hanconv', 11]]) {
    await go('http://127.0.0.1:' + SRV + '/' + p + '.html');
    const n = await ev('document.querySelectorAll("#navPills .pill").length');
    ok(n === want, p + ' 顶栏胶囊还是 ' + want + ' 颗（快照不许被动）', n);
    const empty = await ev('[...document.querySelectorAll("#navPills .pill")].filter(a => !a.textContent.trim()).length');
    ok(empty === 0, p + ' 胶囊颗颗有字', empty);
  }

  console.log('== ③ 升版后 ver 真渲染 ==');
  await go('http://127.0.0.1:' + SRV + '/');
  const v1 = await ev('(document.querySelector(".ver")||{}).textContent');
  ok(v1 === 'v0.9.316', 'index 顶栏 ver 显示 v0.9.316', v1);
  await go('http://127.0.0.1:' + SRV + '/translate.html');
  const v2 = await ev('(document.querySelector(".ver-tag")||{}).textContent');
  ok(v2 === 'v0.9.316', 'translate 页脚 ver-tag v0.9.316', v2);
  await go('http://127.0.0.1:' + SRV + '/merge.html');
  const v3 = await ev('(document.querySelector(".ver")||{}).textContent');
  ok(v3 === 'v0.9.316', 'merge 顶栏 ver v0.9.316', v3);

  console.log('---- NAV 专项：' + P + ' 过 / ' + F + ' 红 ----');
  srv.close(); chrome.kill(); process.exit(F ? 1 : 0);
})().catch(e => { console.log('FATAL', e && e.message); srv.close(); process.exit(1); });
