/* v0.9.255 交付截图：① 右栏唯一预览卡（视角三档）② ⓘ 悬停浮层 ③ 窄屏回单列 */
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws'), http = require('http'), fs = require('fs');
const PORT = 9333, BASE = 'http://127.0.0.1:3098', OUT = '/Users/jp/WorkBuddy/2026-09-04-00-29-54/';
function J(p){ return new Promise((res, rej) => { const r = http.request({ host:'127.0.0.1', port:PORT, path:p, method:'PUT' }, x => { let d=''; x.on('data',c=>d+=c); x.on('end',()=>{ try{ res(JSON.parse(d)); }catch(e){ rej(new Error(d.slice(0,200))); } }); }); r.on('error', rej); r.end(); }); }
const wait = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const v = await J('/json/new?' + encodeURIComponent(BASE + '/merge.html'));
  const ws = new WebSocket(v.webSocketDebuggerUrl, { perMessageDeflate: false });
  let id = 0; const wt = new Map();
  await new Promise(r => ws.on('open', r));
  ws.on('message', m => { const g = JSON.parse(m); if (g.id && wt.has(g.id)) { const q = wt.get(g.id); wt.delete(g.id); g.error ? q.rej(new Error(JSON.stringify(g.error))) : q.res(g.result); } });
  const send = (m, p) => new Promise((res, rej) => { const i = ++id; wt.set(i, { res, rej }); ws.send(JSON.stringify({ id:i, method:m, params:p||{} })); });
  const ev = async e => { const r = await send('Runtime.evaluate', { expression:e, returnByValue:true, awaitPromise:true });
    if (r.exceptionDetails) throw new Error((r.exceptionDetails.exception||{}).description || r.exceptionDetails.text); return r.result.value; };
  async function grab(file, rect, scale){
    const r = await send('Page.captureScreenshot', { format:'png', clip: Object.assign({ scale: scale || 2 }, rect) });
    fs.writeFileSync(OUT + file, Buffer.from(r.data, 'base64')); console.log('   ' + file);
  }
  /* 元素在**视口内**的位置（captureScreenshot 的 clip 是视口坐标，不随滚动走） */
  const vpRect = async (sel, pad, extraH) => JSON.parse(await ev(`JSON.stringify((function(){
    var e=document.querySelector(${JSON.stringify(sel)}); if(!e) return null; e.scrollIntoView({block:'center'});
    var r=e.getBoundingClientRect();   /* ⚠️ clip 用的是**文档坐标**，必须把滚动量加回去 */
    return {x:Math.max(0,Math.round(r.left+window.scrollX-${pad})), y:Math.max(0,Math.round(r.top+window.scrollY-${pad})),
            width:Math.round(r.width+${pad*2}), height:Math.round(r.height+${pad*2}+${extraH||0})};})())`));

  await send('Page.enable'); await send('Runtime.enable');
  await send('Network.setCacheDisabled', { cacheDisabled: true });

  /* ① 桌面 1440：右栏「预览卡 + 导出卡」整栏 */
  await send('Emulation.setDeviceMetricsOverride', { width:1440, height:1000, deviceScaleFactor:1, mobile:false });
  await wait; await wait(2600);
  await grab('merge255-A-唯一预览卡.png', await vpRect('#rail', 14), 2);

  /* ② ⓘ 悬停浮层：先把 ⓘ 滚到视口中间，**量完再悬停**（滚动会收起浮层） */
  await ev("(function(){document.getElementById('assPanel').open=true;return 1})()"); await wait(400);
  const p = JSON.parse(await ev(`JSON.stringify((function(){
    var el=document.querySelector('.info[data-tip-i18n="assTplTip"]'); el.scrollIntoView({block:'center'});
    var r=el.getBoundingClientRect();
    /* 鼠标事件要的是**视口**坐标；截图 clip 要的是**文档**坐标 —— 两个都留着，别混 */
    return {x:Math.round(r.left+r.width/2), y:Math.round(r.top+r.height/2),
            dx:Math.round(r.left+r.width/2+window.scrollX), dy:Math.round(r.top+r.height/2+window.scrollY)};})())`));
  await wait(700);
  await send('Input.dispatchMouseEvent', { type:'mouseMoved', x:2, y:2 }); await wait(150);
  await send('Input.dispatchMouseEvent', { type:'mouseMoved', x:p.x, y:p.y }); await wait(700);
  const box = JSON.parse(await ev(`JSON.stringify((function(){var L=document.getElementById('tipLayer');var r=L.getBoundingClientRect();
    var sy=window.scrollY, sx=window.scrollX;
    var lo=Math.min(r.top+sy, ${p.dy}-100), hi=Math.max(r.bottom+sy, ${p.dy}+40);
    return {x:Math.max(0,Math.round(r.left+sx-280)), y:Math.max(0,Math.round(lo-16)), width:1150, height:Math.round(hi-lo+32)};})())`));
  await grab('merge255-B-悬停说明.png', box, 2);

  /* ③ 窄屏 900：右栏落页底、预览限宽居中 */
  await send('Emulation.setDeviceMetricsOverride', { width:900, height:1100, deviceScaleFactor:1, mobile:false });
  await wait(1200);
  await grab('merge255-C-窄屏单列.png', await vpRect('#rail', 14), 2);

  console.log('done');
  process.exit(0);
})().catch(e => { console.error('ERR', e.message); process.exit(1); });
