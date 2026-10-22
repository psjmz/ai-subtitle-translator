/* 渲染三版重设计稿 —— 分别截 #optA / #optB / #optC 的 .panel
   ⚠️ clip 用文档坐标（rect + scrollX/scrollY），别用 captureBeyondViewport+clip（会挂死） */
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');
const http = require('http'), fs = require('fs');
const PORT = 9333;
const FILE = 'file:///Users/jp/WorkBuddy/2026-09-04-00-29-54/ui-redesign/mock-form-v3.html';
const OUT = '/Users/jp/WorkBuddy/2026-09-04-00-29-54/ui-redesign';
const wait = ms => new Promise(r => setTimeout(r, ms));
function J(p) { return new Promise((res, rej) => { const r = http.request({ host: '127.0.0.1', port: PORT, path: p, method: 'PUT' }, x => { let d = ''; x.on('data', c => d += c); x.on('end', () => { try { res(JSON.parse(d)); } catch (e) { rej(new Error(d.slice(0, 200))); } }); }); r.on('error', rej); r.end(); }); }

(async () => {
  const v = await J('/json/new?' + encodeURIComponent('about:blank'));
  const ws = new WebSocket(v.webSocketDebuggerUrl, { perMessageDeflate: false });
  let id = 0; const wt = new Map();
  await new Promise(r => ws.on('open', r));
  ws.on('message', m => { const g = JSON.parse(m); if (g.id && wt.has(g.id)) { const q = wt.get(g.id); wt.delete(g.id); g.error ? q.rej(new Error(JSON.stringify(g.error))) : q.res(g.result); } });
  const send = (m, p) => new Promise((res, rej) => { const i = ++id; wt.set(i, { res, rej }); ws.send(JSON.stringify({ id: i, method: m, params: p || {} })); });
  const ev = async e => { const r = await send('Runtime.evaluate', { expression: e, returnByValue: true, awaitPromise: true }); if (r.exceptionDetails) throw new Error((r.exceptionDetails.exception || {}).description); return r.result.value; };
  await send('Page.enable'); await send('Runtime.enable');
  await send('Emulation.setDeviceMetricsOverride', { width: 820, height: 1200, deviceScaleFactor: 2, mobile: false });
  await send('Page.navigate', { url: FILE });
  await wait(1500);
  console.log('href=' + await ev('location.href'));
  console.log('readyState=' + await ev('document.readyState') + '  三个方案数=' + await ev('document.querySelectorAll(".opt").length'));

  for (const opt of ['D']) {
    const sel = '#opt' + opt + ' .panel';
    await ev(`document.querySelector(${JSON.stringify(sel)}).scrollIntoView({block:'start'});`);
    await wait(350);
    const b = await ev(`(function(){ var e=document.querySelector(${JSON.stringify(sel)}); var r=e.getBoundingClientRect();
      return {x:Math.round(r.x+window.scrollX), y:Math.round(r.y+window.scrollY), vy:Math.round(r.y),
              w:Math.round(r.width), h:Math.round(r.height), vh:window.innerHeight}; })()`);
    const clip = { x: b.x, y: b.y, width: b.w, height: Math.min(b.h, b.vh - Math.max(0, b.vy) - 4), scale: 1 };
    const r = await send('Page.captureScreenshot', { format: 'png', clip: Object.assign({ captureBeyondViewport: false }, clip) });
    const name = 'v3design-' + opt.toLowerCase() + '.png';
    fs.writeFileSync(OUT + '/' + name, Buffer.from(r.data, 'base64'));
    console.log(name + '  面板 ' + b.w + '×' + b.h + '  截到 ' + clip.height);
  }
  process.exit(0);
})().catch(e => { console.error('出错：', e.message); process.exit(2); });
