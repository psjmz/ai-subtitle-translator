/* 截 v0.9.266 当前单语面板的完整样子（给 redesign 用）
   ⚠️ clip 必须用文档坐标；别用 captureBeyondViewport+clip（会挂死）。 */
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');
const http = require('http'), fs = require('fs');
const PORT = 9333, BASE = 'http://127.0.0.1:3098';
const OUT = '/Users/jp/WorkBuddy/2026-09-04-00-29-54/ui-redesign';
const wait = ms => new Promise(r => setTimeout(r, ms));
function J(p) { return new Promise((res, rej) => { const r = http.request({ host: '127.0.0.1', port: PORT, path: p, method: 'PUT' }, x => { let d = ''; x.on('data', c => d += c); x.on('end', () => { try { res(JSON.parse(d)); } catch (e) { rej(new Error(d.slice(0, 200))); } }); }); r.on('error', rej); r.end(); }); }
const NL = String.fromCharCode(10);
const ZH = ['1', '00:00:01,000 --> 00:00:04,000', '第一行原文', '', '2', '00:00:05,000 --> 00:00:07,000', '第二行原文', ''].join(NL);
const b64 = s => Buffer.from(s, 'utf8').toString('base64');

(async () => {
  const v = await J('/json/new?' + encodeURIComponent('about:blank'));
  const ws = new WebSocket(v.webSocketDebuggerUrl, { perMessageDeflate: false });
  let id = 0; const wt = new Map();
  await new Promise(r => ws.on('open', r));
  ws.on('message', m => { const g = JSON.parse(m); if (g.id && wt.has(g.id)) { const q = wt.get(g.id); wt.delete(g.id); g.error ? q.rej(new Error(JSON.stringify(g.error))) : q.res(g.result); } });
  const send = (m, p) => new Promise((res, rej) => { const i = ++id; wt.set(i, { res, rej }); ws.send(JSON.stringify({ id: i, method: m, params: p || {} })); });
  const ev = async e => { const r = await send('Runtime.evaluate', { expression: e, returnByValue: true, awaitPromise: true }); if (r.exceptionDetails) throw new Error((r.exceptionDetails.exception || {}).description); return r.result.value; };
  await send('Page.enable'); await send('Runtime.enable');
  await send('Network.setCacheDisabled', { cacheDisabled: true });
  await send('Emulation.setDeviceMetricsOverride', { width: 1320, height: 1800, deviceScaleFactor: 2, mobile: false });
  await send('Page.navigate', { url: BASE + '/merge.html' });
  await wait(2600);
  const step = s => ev(s);
  const load = (side, text, name) => `loadSide('${side}', decodeURIComponent(escape(atob(${JSON.stringify(b64(text))}))), ${JSON.stringify(name)});`;
  await step('endDemo();');
  await step(load('src', ZH, 'clip.srt'));
  await step(`document.querySelector('#modeTabs input[name=workMode][value="mono"]').click();`);
  await step('doMono();');

  const shot = async (name, sel) => {
    await ev(`document.querySelector(${JSON.stringify(sel)}).scrollIntoView({block:'start'});`);
    await wait(400);
    const b = await ev(`(function(){ var e=document.querySelector(${JSON.stringify(sel)}); var r=e.getBoundingClientRect();
      return {x:Math.round(r.x+window.scrollX), y:Math.round(r.y+window.scrollY), vy:Math.round(r.y), w:Math.round(r.width), h:Math.round(r.height), vh:window.innerHeight}; })()`);
    const clip = { x: b.x, y: b.y, width: b.w, height: Math.min(b.h, b.vh - Math.max(0, b.vy) - 4), scale: 1 };
    const r = await send('Page.captureScreenshot', { format: 'png', clip: Object.assign({ captureBeyondViewport: false }, clip) });
    fs.writeFileSync(OUT + '/' + name, Buffer.from(r.data, 'base64'));
    console.log(name + '  ' + JSON.stringify(b) + '  clip.h=' + clip.height);
  };

  console.log('— ASS 面板 —');
  await step(`setFmtSilently('split');`);
  await step(`document.getElementById('assPanel').open = true;`);
  await wait(400);
  console.log('#assCols 宽: ' + await ev(`Math.round(document.getElementById('assCols').getBoundingClientRect().width)`));
  console.log('#assDstCol 列: ' + await ev(`getComputedStyle(document.getElementById('assDstCol')).gridTemplateColumns`));
  await shot('now266-ass.png', '#assPanel');

  console.log('— VTT 面板 —');
  await step(`setFmtSilently('vttStyle');`);
  await step(`document.getElementById('mVttPanel').open = true;`);
  await wait(400);
  await shot('now266-vtt.png', '#mVttPanel');
  process.exit(0);
})().catch(e => { console.error('出错：', e.message); process.exit(2); });
