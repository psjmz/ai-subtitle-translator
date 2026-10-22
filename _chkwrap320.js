/* _chkwrap320.js —— 为「折行块压高度」量真实尺寸（非交付件）
   量：折行块 .param-blk 的高/padding/margin、内层 .wrap-line 高、input 高、上下相邻元素间距。 */
'use strict';
process.on('unhandledRejection', e => { console.log('UNHANDLED', e && e.message); });
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');
const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const ROOT = '/Users/jp/WorkBuddy/2026-09-04-00-29-54/srt-translator';
const SRV = 3800 + Math.floor(Math.random() * 60);
const PORT = 9960 + Math.floor(Math.random() * 30);
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
  if (r.exceptionDetails) throw new Error(r.exceptionDetails.text);
  return r.result.value;
}
(async () => {
  await new Promise(r => srv.listen(SRV, '127.0.0.1', r));
  const chrome = spawn(CHROME, ['--headless=new', '--remote-debugging-port=' + PORT, '--no-sandbox', '--disable-gpu',
    '--host-resolver-rules=MAP * ~NOTFOUND, EXCLUDE 127.0.0.1',
    '--lang=zh-CN', '--user-data-dir=/tmp/crwrap320-' + Date.now(), 'about:blank'], { stdio: 'ignore' });
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
  await send('Emulation.setDeviceMetricsOverride', { width: 1280, height: 900, deviceScaleFactor: 2, mobile: false });
  await send('Page.navigate', { url: 'http://127.0.0.1:' + SRV + '/translate.html' });
  for (let i = 0; i < 60; i++) {
    try { const st = await ev('document.readyState + "|" + (!!document.getElementById("viewWorkspace"))'); if (st.indexOf('complete') === 0 && st.indexOf('true') > 0) break; } catch (e) { }
    await wait(200);
  }
  await wait(1500);

  const m = await ev(`(()=>{
    const line=document.querySelector('.wrap-line');
    const blk=line.parentElement;
    const cs=getComputedStyle(blk), lcs=getComputedStyle(line);
    const inp=document.getElementById('biMaxW').offsetParent?document.getElementById('biMaxW'):document.getElementById('maxW');
    const cell=inp.parentElement;
    const hint=cell.querySelector('.hint');
    const prev=blk.previousElementSibling, next=blk.nextElementSibling;
    const R=e=>{const r=e.getBoundingClientRect();return {t:Math.round(r.top),b:Math.round(r.bottom),h:Math.round(r.height)}};
    return {
      blkCls:blk.className, blkH:Math.round(blk.getBoundingClientRect().height),
      padT:cs.paddingTop,padB:cs.paddingBottom,padL:cs.paddingLeft,padR:cs.paddingRight,
      mt:cs.marginTop,mb:cs.marginBottom, radius:cs.borderRadius,
      lineH:Math.round(line.getBoundingClientRect().height), align:lcs.alignItems, gap:lcs.gap,
      lbl:document.getElementById('wlblBiMaxW').offsetParent?'双语':'单语',
      inpId:inp.id, inpH:Math.round(inp.getBoundingClientRect().height),
      hintH:hint?Math.round(hint.getBoundingClientRect().height):0,
      cellH:Math.round(cell.getBoundingClientRect().height),
      prev:prev?{tag:prev.tagName,cls:prev.className,h:R(prev).h}:null,
      next:next?{tag:next.tagName,cls:next.className,h:R(next).h}:null,
      gapAbove:prev?R(blk).t-R(prev).b:null,
      gapBelow:next?R(next).t-R(blk).b:null
    }})()`);
  console.log(JSON.stringify(m, null, 1));
  const OUTD = '/Users/jp/WorkBuddy/2026-09-04-00-29-54/outputs-320';
  if (!fs.existsSync(OUTD)) fs.mkdirSync(OUTD, { recursive: true });
  async function shotBlk(file) {
    const r = await ev(`(()=>{const b=document.querySelector('.wrap-line').parentElement.getBoundingClientRect();
      return {x:Math.max(0,b.x-10+scrollX),y:Math.max(0,b.y-20+scrollY),w:b.width+20,h:b.height+40}})()`);
    const im = await send('Page.captureScreenshot', { format: 'png', clip: { x: r.x, y: r.y, width: r.w, height: r.h, scale: 2 } });
    fs.writeFileSync(file, Buffer.from(im.data, 'base64'));
  }
  await shotBlk(OUTD + '/wrap320-after.png');
  /* 用同特异性的后置规则把内衬还原成改前的 12px，拍一张对照图（只影响这一次渲染） */
  await ev(`(()=>{const s=document.createElement('style');s.textContent='.param-blk.wrap-blk{padding:12px;margin-top:12px}';document.head.appendChild(s);return 1})()`);
  await wait(300);
  const before = await ev(`(()=>{const b=document.querySelector('.wrap-line').parentElement;return {h:Math.round(b.getBoundingClientRect().height)}})()`);
  await shotBlk(OUTD + '/wrap320-before.png');
  console.log('对照（改前 12px 内衬）块高:', before.h, 'px');
  srv.close(); chrome.kill(); process.exit(0);
})().catch(e => { console.log('FATAL', e && e.message); srv.close(); process.exit(2); });
