/* v0.9.257 交付截图：首页顶部工具导航 + 三大工具卡片 / 特效页与清洗页顶部
   用法：先起 3098 server 与 9333 Chrome，再 node _shot258.js */
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');
const http = require('http');
const fs = require('fs');
const PORT = 9333, BASE = 'http://127.0.0.1:3098';
const OUT = '/Users/jp/WorkBuddy/2026-09-04-00-29-54/';
const wait = ms => new Promise(r => setTimeout(r, ms));
function J(p){ return new Promise((res, rej) => { const r = http.request({ host:'127.0.0.1', port:PORT, path:p, method:'PUT', headers:{Host:'127.0.0.1:'+PORT} }, x => { let d=''; x.on('data',c=>d+=c); x.on('end',()=>{ try{ res(JSON.parse(d)); }catch(e){ rej(new Error(d.slice(0,200))); } }); }); r.on('error', rej); r.end(); }); }

(async () => {
  const v = await J('/json/new?' + encodeURIComponent(BASE + '/index.html'));
  const ws = new WebSocket(v.webSocketDebuggerUrl, { perMessageDeflate: false });
  let id = 0; const wt = new Map();
  await new Promise(r => ws.on('open', r));
  ws.on('message', m => { const g = JSON.parse(m);
    if (g.id && wt.has(g.id)) { const q = wt.get(g.id); wt.delete(g.id); g.error ? q.rej(new Error(JSON.stringify(g.error))) : q.res(g.result); } });
  const send = (m, p) => new Promise((res, rej) => { const i = ++id; wt.set(i, { res, rej }); ws.send(JSON.stringify({ id:i, method:m, params:p||{} })); });
  const ev = async e => { const r = await send('Runtime.evaluate', { expression:e, returnByValue:true, awaitPromise:true });
    if (r.exceptionDetails) throw new Error((r.exceptionDetails.exception||{}).description || r.exceptionDetails.text); return r.result.value; };
  await send('Page.enable'); await send('Runtime.enable');
  await send('Network.setCacheDisabled', { cacheDisabled: true });
  await send('Emulation.setDeviceMetricsOverride', { width:1180, height:1000, deviceScaleFactor:1, mobile:false });
  await wait(2400);

  async function shot(file, sel, pad) {
    const rect = await ev(`JSON.stringify((function(){var e=document.querySelector(${JSON.stringify(sel)});if(!e)return null;
      e.scrollIntoView({block:'start'});
      var r=e.getBoundingClientRect();
      return {x:Math.max(0,Math.round(r.left+window.scrollX-12)),y:Math.max(0,Math.round(r.top+window.scrollY-12)),
              width:Math.round(r.width+24),height:Math.round(r.height+24+${pad||0})};})())`);
    if (!rect || rect === 'null') { console.log('   跳过 ' + file); return; }
    await wait(500);
    const r = await send('Page.captureScreenshot', { format:'png', clip: Object.assign({ scale:2 }, JSON.parse(rect)) });
    fs.writeFileSync(OUT + file, Buffer.from(r.data, 'base64'));
    console.log('   截图 ' + file);
  }
  async function go(path) {
    await send('Page.navigate', { url: BASE + path });
    await wait(2400);
    await send('Emulation.setDeviceMetricsOverride', { width:1180, height:1000, deviceScaleFactor:1, mobile:false });
    await wait(600);
  }

  await shot('nav258-A-首页顶部.png', '.lnav', 0);
  await shot('nav258-B-三工具卡片.png', '#toolCards', 0);
  await shot('nav258-C-首屏.png', '.hero', 700);

  await go('/merge.html');
  await shot('nav258-D-特效页顶部.png', '.lnav', 0);
  await shot('nav258-E-特效页标题.png', '.hero', 0);

  await go('/clean.html');
  await shot('nav258-F-清洗页顶部.png', '.hd', 0);

  console.log('完成');
  ws.close(); process.exit(0);
})().catch(e => { console.error('崩了：', e.message); process.exit(1); });
