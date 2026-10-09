/* v0.9.254 出图：五个出厂槽的「套用样式预览」各截一张（看文本是否随槽区分） */
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');
const http = require('http');
const fs = require('fs');
const PORT = 9333, BASE = 'http://127.0.0.1:3098';
const OUT = '/Users/jp/WorkBuddy/2026-09-04-00-29-54/';
const wait = ms => new Promise(r => setTimeout(r, ms));
function J(p){ return new Promise((res, rej) => { const r = http.request({ host:'127.0.0.1', port:PORT, path:p, method:'PUT' }, x => { let d=''; x.on('data',c=>d+=c); x.on('end',()=>{ try{ res(JSON.parse(d)); }catch(e){ rej(new Error(d.slice(0,200))); } }); }); r.on('error', rej); r.end(); }); }
(async () => {
  const v = await J('/json/new?' + encodeURIComponent(BASE + '/merge.html'));
  const ws = new WebSocket(v.webSocketDebuggerUrl, { perMessageDeflate: false });
  let id = 0; const wt = new Map();
  await new Promise(r => ws.on('open', r));
  ws.on('message', m => { const g = JSON.parse(m); if (g.id && wt.has(g.id)) { const q = wt.get(g.id); wt.delete(g.id); g.error ? q.rej(new Error(JSON.stringify(g.error))) : q.res(g.result); } });
  const send = (m, p) => new Promise((res, rej) => { const i = ++id; wt.set(i, { res, rej }); ws.send(JSON.stringify({ id:i, method:m, params:p||{} })); });
  const ev = async e => { const r = await send('Runtime.evaluate', { expression:e, returnByValue:true, awaitPromise:true });
    if (r.exceptionDetails) throw new Error((r.exceptionDetails.exception||{}).description || r.exceptionDetails.text); return r.result.value; };
  await send('Page.enable'); await send('Runtime.enable');
  await send('Emulation.setDeviceMetricsOverride', { width:1440, height:1100, deviceScaleFactor:1, mobile:false });
  await wait(2600);
  for (const sid of ['default','lyric','sfx','narration','emphasis']) {
    const box = await ev(`(function(){ensureStyle();S.style.cur='${sid}';S.pv={base:false};
      document.getElementById('slotEdit').open=true; renderSlots(); renderSlotPvMini();
      var e=document.getElementById('slotPvScreen'); e.scrollIntoView({block:'center'});
      var r=e.getBoundingClientRect();
      return JSON.stringify({x:Math.round(r.left+window.scrollX),y:Math.round(r.top+window.scrollY),w:Math.round(r.width),h:Math.round(r.height)});})()`);
    await wait(600);
    const b = JSON.parse(box);
    const r = await send('Page.captureScreenshot', { format:'png', clip:{ x:b.x, y:b.y, width:b.w, height:b.h, scale:1.6 } });
    fs.writeFileSync(OUT + '_shot254-' + sid + '.png', Buffer.from(r.data, 'base64'));
    console.log('  截图 _shot254-' + sid + '.png');
  }
  process.exit(0);
})().catch(e => { console.error('ERR', e.message); process.exit(1); });
