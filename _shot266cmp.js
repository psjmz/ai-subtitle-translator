/* v0.9.266 对比截图：单语模式 ASS / VTT 面板「改前 vs 改后」
   ⚠️ clip 用文档坐标（rect + scrollX/Y），别用视口坐标 —— 上一版就截偏了。 */
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');
const http = require('http'), fs = require('fs');
const PORT = 9333, BASE = 'http://127.0.0.1:3098';
const OUT = '/Users/jp/WorkBuddy/2026-09-04-00-29-54/ui-redesign';
const wait = ms => new Promise(r => setTimeout(r, ms));
function J(p) { return new Promise((res, rej) => { const r = http.request({ host: '127.0.0.1', port: PORT, path: p, method: 'PUT' }, x => { let d = ''; x.on('data', c => d += c); x.on('end', () => { try { res(JSON.parse(d)); } catch (e) { rej(new Error(d.slice(0, 200))); } }); }); r.on('error', rej); r.end(); }); }
const NL = String.fromCharCode(10);
const ZH = ['1', '00:00:01,000 --> 00:00:04,000', '第一行原文', '', '2', '00:00:05,000 --> 00:00:07,000', '第二行原文', ''].join(NL);
const b64 = s => Buffer.from(s, 'utf8').toString('base64');
/* 把 v0.9.266 的网格规则还原成 265 的「一列竖直堆」——这就是改前的真实样子。
   ⚠️ 不要用 !important：它连 #assSrcCol 的 inline `display:none` 一起覆盖，
      结果「改前」图里冒出了本该收起的「原文（副）」栏，做成一张假的对比图。
      改用 id 选择器（优先级 1,x,x）压过 `.ass-cols.mono .ass-col .af label`（0,4,1）即可。 */
const OLD_CSS = `
  #assDstCol{display:block}
  #assDstCol .af{margin-bottom:5px}
  #assDstCol .af label{flex:0 0 88px}
  #assDstCol > .ass-sub{margin:12px 0 6px}
  #mVttCols2 > .ass-col{display:block}
  #mVttCols2 > .ass-col .af{margin-bottom:5px}
  #mVttCols2 > .ass-col .af label{flex:0 0 88px}
  #assPanel .mg-row{column-gap:22px}
  #assPanel .mg-row .af label{flex:0 0 88px}
`;

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
  await send('Emulation.setDeviceMetricsOverride', { width: 1320, height: 1700, deviceScaleFactor: 1, mobile: false });
  await send('Page.navigate', { url: BASE + '/merge.html' });
  await wait(2600);
  const step = s => ev(s);
  const load = (side, text, name) => `loadSide('${side}', decodeURIComponent(escape(atob(${JSON.stringify(b64(text))}))), ${JSON.stringify(name)});`;
  await step('endDemo();');
  await step(load('src', ZH, 'clip.srt'));
  await step(`document.querySelector('#modeTabs input[name=workMode][value="mono"]').click();`);
  await step('doMono();');

  async function shot(name, sel) {
    const box = await ev(`(function(){ var e=document.querySelector(${JSON.stringify(sel)}); if(!e) return null; var r=e.getBoundingClientRect(); return {y:Math.round(r.y)}; })()`);
    if (!box) { console.log('MISSING ' + sel); return; }
    await ev(`window.scrollTo(0, window.scrollY + ${box.y} - 16);`);
    await wait(350);
    const b = await ev(`(function(){ var e=document.querySelector(${JSON.stringify(sel)}); var r=e.getBoundingClientRect(); return {x:Math.round(r.x+window.scrollX), y:Math.round(r.y+window.scrollY), vy:Math.round(r.y), w:Math.round(r.width), h:Math.round(r.height), vh:window.innerHeight}; })()`);
    const clip = { x: b.x, y: b.y, width: b.w, height: Math.min(b.h, b.vh - Math.max(0, b.vy) - 4), scale: 1 };
    const r = await send('Page.captureScreenshot', { format: 'png', clip: clip });
    fs.writeFileSync(OUT + '/' + name, Buffer.from(r.data, 'base64'));
    console.log(name.padEnd(34) + Math.round(b.w) + 'x' + Math.round(clip.height));
  }

  console.log('— 改后（v0.9.266 网格）—');
  await step(`setFmtSilently('split');`);
  await step(`document.getElementById('assPanel').open = true;`);
  await step(`document.getElementById('assPanel').scrollIntoView({block:'start'});`);
  await wait(400);
  await shot('v266-ass-after.png', '#assPanel');
  await step(`setFmtSilently('vttStyle');`);
  await step(`document.getElementById('mVttPanel').open = true;`);
  await step(`document.getElementById('mVttCols2').scrollIntoView({block:'start'});`);
  await wait(400);
  await shot('v266-vtt-after.png', '#mVttCols2');

  console.log('— 改前（还原成 265 的一列竖直）—');
  const tagId = await ev(`(function(){ var s=document.createElement('style'); s.id='__oldCss'; s.textContent=${JSON.stringify(OLD_CSS)}; document.head.appendChild(s); return s.id; })()`);
  await step(`setFmtSilently('split');`);
  await step(`document.getElementById('assPanel').open = true;`);
  await step(`document.getElementById('assPanel').scrollIntoView({block:'start'});`);
  await wait(400);
  await shot('v266-ass-before.png', '#assPanel');
  await step(`setFmtSilently('vttStyle');`);
  await step(`document.getElementById('mVttPanel').open = true;`);
  await step(`document.getElementById('mVttCols2').scrollIntoView({block:'start'});`);
  await wait(400);
  await shot('v266-vtt-before.png', '#mVttCols2');
  await ev(`document.getElementById('__oldCss').remove();`);
  console.log('注入的还原样式 id=' + tagId + ' 已移除');
  process.exit(0);
})().catch(e => { console.error('出错：', e.message); process.exit(2); });
