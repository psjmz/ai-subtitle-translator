/* v0.9.260 交付截图：主站右栏「导出字幕样式」按钮面板 + 去特效页入口
   用法：先起 3098 server 与 9333 Chrome，再 node _shot262.js */
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');
const http = require('http');
const fs = require('fs');
const PORT = 9333, BASE = 'http://127.0.0.1:3098';
const OUT = '/Users/jp/WorkBuddy/2026-09-04-00-29-54/';
const wait = ms => new Promise(r => setTimeout(r, ms));
function J(p){ return new Promise((res, rej) => { const r = http.request({ host:'127.0.0.1', port:PORT, path:p, method:'PUT', headers:{Host:'127.0.0.1:'+PORT} }, x => { let d=''; x.on('data',c=>d+=c); x.on('end',()=>{ try{ res(JSON.parse(d)); }catch(e){ rej(new Error(d.slice(0,200))); } }); }); r.on('error', rej); r.end(); }); }

(async () => {
  const v = await J('/json/new?' + encodeURIComponent('about:blank'));
  const ws = new WebSocket(v.webSocketDebuggerUrl, { perMessageDeflate: false });
  let id = 0; const wt = new Map();
  await new Promise(r => ws.on('open', r));
  ws.on('message', m => { const g = JSON.parse(m); if (g.id && wt.has(g.id)) { const q = wt.get(g.id); wt.delete(g.id); g.error ? q.rej(new Error(JSON.stringify(g.error))) : q.res(g.result); } });
  const send = (m, p) => new Promise((res, rej) => { const i = ++id; wt.set(i, { res, rej }); ws.send(JSON.stringify({ id:i, method:m, params:p||{} })); });
  const ev = async e => { const r = await send('Runtime.evaluate', { expression:e, returnByValue:true, awaitPromise:true });
    if (r.exceptionDetails) throw new Error((r.exceptionDetails.exception||{}).description || r.exceptionDetails.text); return r.result.value; };
  await send('Page.enable'); await send('Runtime.enable');
  await send('Network.setCacheDisabled', { cacheDisabled: true });
  await send('Emulation.setDeviceMetricsOverride', { width:1280, height:1000, deviceScaleFactor:2, mobile:false });
  await send('Page.navigate', { url: BASE + '/index.html' });
  await wait(2200);

  await ev("document.getElementById('btnDemo').click()");
  await wait(1600);
  await ev(`(function(){S.rows=[
    {id:0,start:1000,end:3000,en:'Hello there',zh:'你好'},
    {id:1,start:4000,end:6000,en:'Good morning',zh:'早上好'},
    {id:2,start:7000,end:9000,en:'See you soon',zh:'回头见'}];
    S.fileBase='demo';renderRows();return 1})()`);
  await wait(600);
  await ev("(function(){setFmt('bi-src','ass');return 1})()");
  await wait(500);

  /* 滚到导出区再量（clip 用文档坐标） */
  await ev("(function(){document.getElementById('lblExpFmt').scrollIntoView({block:'center'});return 1})()");
  await wait(400);
  const box = JSON.parse(await ev(`(function(){var el=document.getElementById('lblExpFmt');
    var p=el.closest('.panel')||el.parentElement; var r=p.getBoundingClientRect();
    return JSON.stringify({x:r.x,y:r.y+window.scrollY,w:r.width,h:r.height,sh:document.documentElement.scrollHeight})})()`));
  const clip = { x:Math.max(0,box.x-8), y:Math.max(0,box.y-8), width:Math.min(box.w+16,1280), height:Math.min(box.h+16,960), scale:1 };
  const shot = await send('Page.captureScreenshot', { format:'png', clip });
  fs.writeFileSync(OUT + 'exp-panel260.png', Buffer.from(shot.data, 'base64'));
  console.log('已存 exp-panel260.png', JSON.stringify(clip));

  /* 第二张：单语视角（看折行设置切换 + ASS·双行收起） */
  await ev("(function(){setFmt('mono','ass');return 1})()");
  await wait(400);
  const shot2 = await send('Page.captureScreenshot', { format:'png', clip });
  fs.writeFileSync(OUT + 'exp-panel260-mono.png', Buffer.from(shot2.data, 'base64'));
  console.log('已存 exp-panel260-mono.png');
  ws.close();
})().catch(e => { console.error('crash', e.message); process.exit(1); });
