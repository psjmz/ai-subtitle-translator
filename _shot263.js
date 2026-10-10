/* v0.9.263 截图：点翻译那一刻（pgStart）任务条 + 广告位就已到位
   输出：
     ui-redesign/shot-263-click-0pct.png   点翻译即刻（0%，任务条刚出现）
     ui-redesign/shot-263-running.png      进度推进中（62%）
   本地 AdSense 不会投放，占位框仅用于截图展示（不进源码） */
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');
const http = require('http');
const fs = require('fs');
const PORT = 9333, BASE = 'http://127.0.0.1:3098';
const wait = ms => new Promise(r => setTimeout(r, ms));
function J(p){ return new Promise((res, rej) => { const r = http.request({ host:'127.0.0.1', port:PORT, path:p, method:'PUT' }, x => { let d=''; x.on('data',c=>d+=c); x.on('end',()=>{ try{ res(JSON.parse(d)); }catch(e){ rej(new Error(d.slice(0,200))); } }); }); r.on('error', rej); r.end(); }); }

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
  await send('Emulation.setDeviceMetricsOverride', { width:1440, height:1000, deviceScaleFactor:2, mobile:false });
  await send('Page.navigate', { url: BASE + '/' });
  await wait(2800);
  await ev(`showView('workspace')`); await wait(500);
  await ev(`document.getElementById('btnDemo').click()`); await wait(900);

  /* 占位框：展示广告位在线上的样子（细横条 728x90 一族） */
  const putPh = async txt => ev(`(function(){ var b=document.getElementById('adBox');
     var old=b.querySelector('#__ph'); if(old) old.remove();
     var d=document.createElement('div'); d.id='__ph';
     d.style.cssText='height:90px;margin-top:10px;border:1.5px dashed #C9C7CF;border-radius:12px;display:flex;align-items:center;justify-content:center;color:#9A97A0;font:12px/1.4 -apple-system,sans-serif;background:repeating-linear-gradient(45deg,#FBFBFD 0 10px,#F5F5F8 10px 20px)';
     d.textContent=${JSON.stringify(txt)}; b.appendChild(d); })()`);

  const rectOf = async () => JSON.parse(await ev(`JSON.stringify((function(){
    var a=document.querySelector('.metrics').getBoundingClientRect(), b=document.querySelector('.toolbar').getBoundingClientRect();
    return { x:a.left, y:a.top+window.scrollY, w:a.width, h:(b.bottom+window.scrollY)-(a.top+window.scrollY) };
  })())`));
  const shotTo = async (file, rect) => {
    const s = await send('Page.captureScreenshot', { format:'png',
      clip:{ x:Math.max(0,rect.x-10), y:Math.max(0,rect.y-10), width:rect.w+20, height:rect.h+20, scale:2 } });
    fs.writeFileSync(file, Buffer.from(s.data,'base64'));
    console.log('截图: ' + file);
  };

  const stat = async () => JSON.parse(await ev(`JSON.stringify((function(){
    var mi=document.querySelector('.progwrap'), ad=document.getElementById('adBox');
    return { progShown: mi.classList.contains('show'), progH: mi.offsetHeight,
             pct: document.getElementById('pgPct').textContent,
             adShown: ad.classList.contains('show'), adH: ad.offsetHeight,
             fmt: ad.querySelector('ins').getAttribute('data-ad-format') };
  })())`));

  /* A：点翻译即刻（pgStart）—— 原先这一步任务条还不出现 */
  console.log('点翻译前:', JSON.stringify(await stat()));
  await ev(`pgStart()`); await wait(500);
  await putPh('Google 广告位（728x90 水平横幅）—— 点翻译即刻出现并常驻');
  await wait(300);
  console.log('pgStart 后:', JSON.stringify(await stat()));
  await ev(`window.scrollTo(0,0)`); await wait(200);
  await shotTo('ui-redesign/shot-263-click-0pct.png', await rectOf());

  /* B：进度推进中 */
  await ev(`setProg(62, true)`); await wait(400);
  console.log('跑起来后:', JSON.stringify(await stat()));
  await ev(`window.scrollTo(0,0)`); await wait(200);
  await shotTo('ui-redesign/shot-263-running.png', await rectOf());

  ws.close(); process.exit(0);
})().catch(e => { console.error('crash:', e.message); process.exit(1); });
