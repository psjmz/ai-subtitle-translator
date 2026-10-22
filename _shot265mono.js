/* 截单语模式下 ASS / VTT 样式面板的现状（用于对比改版效果）
   ⚠️ 别用 captureBeyondViewport+clip（会挂死）→ 设大视口 + 视口内 clip。 */
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
  await send('Emulation.setDeviceMetricsOverride', { width: 1320, height: 1600, deviceScaleFactor: 1, mobile: false });
  await send('Page.navigate', { url: BASE + '/merge.html' });
  await wait(2600);
  const step = s => ev(s);
  const load = (side, text, name) => `loadSide('${side}', decodeURIComponent(escape(atob(${JSON.stringify(b64(text))}))), ${JSON.stringify(name)});`;
  await step('endDemo();');
  await step(load('src', ZH, 'clip.srt'));
  await step(`document.querySelector('#modeTabs input[name=workMode][value="mono"]').click();`);
  await step('doMono();');

  const shot = async (name, sel) => {
    const box = await ev(`(function(){ var e=document.querySelector(${JSON.stringify(sel)}); if(!e) return null; var r=e.getBoundingClientRect(); return {x:Math.round(r.x), y:Math.round(r.y), w:Math.round(r.width), h:Math.round(r.height)}; })()`);
    if (!box) { console.log('MISSING ' + sel); return; }
    await ev(`window.scrollTo(0, window.scrollY + ${box.y} - 20);`);
    await wait(400);
    /* ⚠️ clip 要的是**文档坐标**，getBoundingClientRect 给的是**视口坐标** —— 必须加 scrollY/scrollX，
       否则页面滚动后会截到上面去（本次第一次就踩了，截出来的是「粘贴文本」那一屏）。 */
    const b2 = await ev(`(function(){ var e=document.querySelector(${JSON.stringify(sel)}); var r=e.getBoundingClientRect(); return {x:Math.round(r.x+window.scrollX), y:Math.round(r.y+window.scrollY), vy:Math.round(r.y), w:Math.round(r.width), h:Math.round(r.height), vh:window.innerHeight}; })()`);
    const clip = { x: b2.x, y: b2.y, width: b2.w, height: Math.min(b2.h, b2.vh - Math.max(0, b2.vy) - 4), scale: 1 };
    const r = await send('Page.captureScreenshot', { format: 'png', clip: Object.assign({ captureBeyondViewport: false }, clip) });
    fs.writeFileSync(OUT + '/' + name, Buffer.from(r.data, 'base64'));
    console.log(name + '  ' + JSON.stringify(b2) + '  clip=' + JSON.stringify(clip));
  };

  console.log('— 单语 ASS 面板 —');
  await step(`setFmtSilently('split');`);
  await step(`document.getElementById('assPanel').open = true;`);
  await step(`document.getElementById('assPanel').scrollIntoView({block:'start'});`);
  await wait(500);
  console.log('栏宽: ' + await ev(`Math.round(document.getElementById('assCols').getBoundingClientRect().width)`));
  console.log('字段行宽/内容宽: ' + await ev(`(function(){ var a=document.querySelector('#assDstCol .af'); var r=a.getBoundingClientRect(); var kids=Array.prototype.map.call(a.children,function(c){return Math.round(c.getBoundingClientRect().width);}); return Math.round(r.width)+' 子元素=' + kids.join(','); })()`));
  await shot('mono-ass-265-before.png', '#assPanel');

  console.log('— 单语 VTT 面板 —');
  await step(`setFmtSilently('vttStyle');`);
  await step(`document.getElementById('mVttPanel').open = true;`);
  await step(`document.getElementById('mVttPanel').scrollIntoView({block:'start'});`);
  await wait(500);
  console.log('VTT 第二组栏宽: ' + await ev(`Math.round(document.getElementById('mVttCols2').getBoundingClientRect().width)`));
  await shot('mono-vtt-265-before.png', '#mVttCols2');
  process.exit(0);
})().catch(e => { console.error('出错：', e.message); process.exit(2); });
