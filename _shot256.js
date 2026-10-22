/* v0.9.256 交付图：点胶囊 vs 再点取消 —— 右侧画面与视角条的两态对比
   用法：先 `PORT=3098 node server.js`，再手动起 9333 的 headless Chrome，然后 node _shot256.js */
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
  await send('Network.setCacheDisabled', { cacheDisabled: true });
  await send('Emulation.setDeviceMetricsOverride', { width:1440, height:1000, deviceScaleFactor:1, mobile:false });
  await wait(2600);

  async function shotPv(file) {
    const rect = await ev(`JSON.stringify((function(){var e=document.getElementById('pvCard');
      e.scrollIntoView({block:'center'});
      var r=e.getBoundingClientRect();
      return {x:Math.max(0,Math.round(r.left+window.scrollX-8)),y:Math.max(0,Math.round(r.top+window.scrollY-8)),
              width:Math.round(r.width+16),height:Math.round(r.height+16)};})())`);
    await wait(600);
    const r = await send('Page.captureScreenshot', { format:'png', clip: Object.assign({ scale:2 }, JSON.parse(rect)) });
    fs.writeFileSync(OUT + file, Buffer.from(r.data, 'base64'));
    console.log('   截图 ' + file);
  }

  /* ① 点胶囊 → 画面切到歌词槽 */
  await ev(`(function(){setPvView('movie');S.filter.slot='';ensureStyle();renderReport();return 1})()`);
  await wait(600);
  await ev(`(function(){document.getElementById('slotBar').scrollIntoView({block:'center'});
    document.querySelector('#slotBar [data-slot="lyric"]').click();return 1})()`);
  await wait(900);
  console.log(await ev(`JSON.stringify({视角:pvView(), 原文:document.getElementById('assPvLine1').textContent})`));
  await shotPv('merge256-B-点了槽画面切过去.png');

  /* ② 再点一次取消 → 画面回成片 */
  await ev(`(function(){document.querySelector('#slotBar [data-slot="lyric"]').click();return 1})()`);
  await wait(900);
  console.log(await ev(`JSON.stringify({视角:pvView(), 原文:document.getElementById('assPvLine1').textContent})`));
  await shotPv('merge256-C-取消选中回成片.png');
  process.exit(0);
})().catch(e => { console.error('ERR', e.message); process.exit(1); });
