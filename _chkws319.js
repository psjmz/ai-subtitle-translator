/* _chkws319.js —— v0.9.319 工作台（translate.html）撤掉统一导航后的真浏览器验收（非交付件）
   ① 工作台：无 #topNav、不引 site-topnav.js（SiteTopNav 未定义）、logo + 首页键 + 项目名 + 播报 +
      上传/开始翻译 + 语言全在，且顶栏一行放得下（不折行）；② 其余页导航照旧（convert 回归）；
   ③ 截图存档。 */
'use strict';
process.on('unhandledRejection', e => { console.log('UNHANDLED', e && e.message); });
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');
const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const ROOT = '/Users/jp/WorkBuddy/2026-09-04-00-29-54/srt-translator';
const SRV = 3600 + Math.floor(Math.random() * 60);
const PORT = 9920 + Math.floor(Math.random() * 60);
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
const ok = (c, n, x) => { console.log((c ? '  ✓ ' : '  ✗ ') + n + (x !== undefined ? '  [' + String(x).slice(0, 130) + ']' : '')); c ? P++ : F++; };
async function shot(expr, file) {
  const r = await ev(`(()=>{const b=(${expr}).getBoundingClientRect();return {x:Math.max(0,b.x-6+scrollX),y:Math.max(0,b.y-6+scrollY),w:b.width+12,h:b.height+12}})()`);
  const img = await send('Page.captureScreenshot', { format: 'png', clip: { x: r.x, y: r.y, width: r.w, height: r.h, scale: 2 } });
  fs.writeFileSync(file, Buffer.from(img.data, 'base64'));
}
(async () => {
  await new Promise(r => srv.listen(SRV, '127.0.0.1', r));
  const chrome = spawn(CHROME, ['--headless=new', '--remote-debugging-port=' + PORT, '--no-sandbox', '--disable-gpu',
    '--host-resolver-rules=MAP * ~NOTFOUND, EXCLUDE 127.0.0.1',
    '--lang=zh-CN', '--user-data-dir=/tmp/crws319-' + Date.now(), 'about:blank'], { stdio: 'ignore' });
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
  await send('Emulation.setDeviceMetricsOverride', { width: 1280, height: 900, deviceScaleFactor: 1, mobile: false });
  /* ⚠️ 别只等 readyState：navigate 后马上读可能拿到上一个文档（about:blank 也是 complete），
     导致后续 getElementById 全 null（319 首跑就踩了这个）。要轮询到 URL 与关键节点都就位。 */
  async function go(url, probe) {
    await send('Page.navigate', { url });
    const tail = url.split('/').pop() || '';
    for (let i = 0; i < 60; i++) {
      try {
        const st = await ev('document.readyState + "|" + location.pathname + "|" + (' + (probe || 'true') + ')');
        if (st.indexOf('complete') === 0 && st.indexOf(tail) > 0) break;
      } catch (e) { }
      await wait(200);
    }
    await wait(1200);
  }

  console.log('== translate.html（工作台，319 撤导航）==');
  await go('http://127.0.0.1:' + SRV + '/translate.html', '!!document.getElementById(\"viewWorkspace\")');
  const d = await ev('({tn:typeof SiteTopNav,nav:!!document.getElementById("topNav"),back:!!document.getElementById("btnBackHome"),logo:!!document.getElementById("logoHome"),ver:(document.querySelector(".ver-tag")||{}).textContent})');
  ok(d.tn === 'undefined' && d.nav === false, '工作台无 #topNav、没引 site-topnav.js', JSON.stringify(d));
  ok(d.back && d.logo, '「首页」返回键 + logo 还在', JSON.stringify(d));
  ok(String(d.ver).indexOf('0.9.319') >= 0, '工作台版号 v0.9.319', d.ver);
  const ids = await ev('["projName","ticker","btnUploadNew","btnGo","uiLang"].filter(x=>!!document.getElementById(x))');
  ok(ids.length === 5, '项目名/播报/上传/开始翻译/语言全在', ids.join(','));
  /* 折行判据：看垂直中心点是否同一条线（align-items:center 下各元素高度不同，top 本来就不齐，
     用 top 判会假红）。再加一条：appbar 高度不超过单行上限 64px。 */
  const row = await ev('(()=>{const a=document.querySelector(".appbar");const cs=[...a.children].filter(c=>getComputedStyle(c).display!=="none"&&c.getBoundingClientRect().width>0);const mid=cs.map(c=>{const r=c.getBoundingClientRect();return Math.round(r.top+r.height/2)});return {n:cs.length,h:Math.round(a.getBoundingClientRect().height),mid:[...new Set(mid)]}})()');
  ok(row.h <= 64 && Math.max.apply(null, row.mid) - Math.min.apply(null, row.mid) <= 6,
    '顶栏一行放得下（不折行）', JSON.stringify(row));
  await shot('document.querySelector(".appbar")', '/Users/jp/WorkBuddy/2026-09-04-00-29-54/outputs-319/ws319-appbar.png');

  console.log('== convert.html（回归：导航照旧）==');
  await go('http://127.0.0.1:' + SRV + '/convert.html');
  const c = await ev('({tn:typeof SiteTopNav,mains:document.querySelectorAll("#topNav .tnav-lnk").length,promo:!!document.querySelector("#topNav .tnav-promo"),more:!!document.getElementById("tnavBtn")})');
  ok(c.tn === 'object' && c.mains === 2 && c.promo && c.more, 'convert 页统一导航照旧', JSON.stringify(c));

  console.log('\n_chkws319: ' + P + '/' + (P + F) + ' OK, bad=' + F);
  srv.close(); chrome.kill(); process.exit(F ? 1 : 0);
})().catch(e => { console.log('FATAL', e && e.message); srv.close(); process.exit(2); });
