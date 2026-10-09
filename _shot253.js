/* v0.9.253 出图：复刻用户截图的那一刻 —— 正在编辑「强调」，然后**真点**「默认」胶囊。
   改前：胶囊高亮跳到「默认」，下面仍写「编辑槽 · 强调」；
   改后：两处一起变成「默认」。
   用法：先 PORT=3098 node server.js + 9333 上已有调试 Chrome，再 node _shot253.js */
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');
const http = require('http');
const fs = require('fs');
const PORT = 9333, BASE = 'http://127.0.0.1:3098';
const OUT = '/Users/jp/WorkBuddy/2026-09-04-00-29-54/';
function J(p){return new Promise((res,rej)=>{const r=http.request({host:'127.0.0.1',port:PORT,path:p,method:'PUT'},x=>{let d='';x.on('data',c=>d+=c);x.on('end',()=>{try{res(JSON.parse(d))}catch(e){rej(new Error(d.slice(0,200)))}})});r.on('error',rej);r.end();});}
const wait = ms => new Promise(r => setTimeout(r, ms));

(async () => {
  const v = await J('/json/new?' + encodeURIComponent(BASE + '/merge.html'));
  const ws = new WebSocket(v.webSocketDebuggerUrl, { perMessageDeflate: false });
  let id = 0; const wt = new Map();
  await new Promise(r => ws.on('open', r));
  ws.on('message', m => { const g = JSON.parse(m); if (g.id && wt.has(g.id)) { const q = wt.get(g.id); wt.delete(g.id); g.error ? q.rej(new Error(JSON.stringify(g.error))) : q.res(g.result); } });
  const send = (m, p) => new Promise((res, rej) => { const i = ++id; wt.set(i, { res, rej }); ws.send(JSON.stringify({ id: i, method: m, params: p || {} })); });
  const ev = async e => { const r = await send('Runtime.evaluate', { expression: e, returnByValue: true, awaitPromise: true }); if (r.exceptionDetails) throw new Error(r.exceptionDetails.text); return r.result.value; };
  await send('Page.enable'); await send('Runtime.enable');
  await send('Emulation.setDeviceMetricsOverride', { width: 1240, height: 1000, deviceScaleFactor: 1, mobile: false });
  await wait(2300);

  const ts = s => String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0');
  let en = '', zh = '';
  for (let i = 1; i <= 6; i++) { const a = i * 2, b = i * 2 + 1;
    en += `${i}\n00:${ts(a)},000 --> 00:${ts(b)},000\nHello line ${i}\n\n`;
    zh += `${i}\n00:${ts(a)},000 --> 00:${ts(b)},000\n你好第 ${i} 行\n\n`; }
  await ev(`(function(){var a=document.getElementById('srcText'),b=document.getElementById('dstText');
    a.value=${JSON.stringify(en)};a.dispatchEvent(new Event('input',{bubbles:true}));
    b.value=${JSON.stringify(zh)};b.dispatchEvent(new Event('input',{bubbles:true}));return 1})()`);
  await wait(700);
  await ev("document.getElementById('btnMerge').click();1"); await wait(1300);

  /* 1) 先落到「编辑强调」的状态：勾几行 → dock 套强调 → 铅笔点强调 */
  await ev(`(function(){ensureStyle();
    [0,1].forEach(function(i){setRowSlot(i,'lyric')});
    [2,3].forEach(function(i){setRowSlot(i,'emphasis')});
    S.style.cur='emphasis'; S.filter.slot='';
    document.getElementById('slotEdit').open=true;
    renderReport(); renderAssPv(); renderVttPv(); return 1})()`);
  await wait(600);
  /* 2) 真点「默认」胶囊（就是用户截图上那一步） */
  await ev(`(function(){document.querySelector('#slotBar [data-slot="default"]').click();return 1})()`);
  await wait(800);
  const st = await ev(`JSON.stringify({cur:S.style.cur, filt:S.filter.slot, 标题:document.getElementById('slotEditName').textContent})`);
  console.log('点「默认」之后: ' + st);

  /* 3) 出图：提示行 + 胶囊条 + 面板标题，三者同框 */
  const box = await ev(`(function(){var ss=['#slotWrap .slot-hd','#slotBar','#slotEditName'].map(function(s){return document.querySelector(s)}).filter(Boolean);
    function union(){var L=1e9,T=1e9,R=-1e9,B=-1e9;
      ss.forEach(function(e){var r=e.getBoundingClientRect();L=Math.min(L,r.left);T=Math.min(T,r.top);R=Math.max(R,r.right);B=Math.max(B,r.bottom);});
      return {x:L+window.scrollX,y:T+window.scrollY,w:R-L,h:B-T};}
    var u0=union(); window.scrollTo(0, Math.max(0,u0.y-30)); var u=union();
    var y=Math.max(window.scrollY+6, Math.min(u.y, window.scrollY+window.innerHeight-u.h-10));
    return JSON.stringify({x:Math.round(u.x),y:Math.round(y),w:Math.round(u.w),h:Math.round(u.h)});})()`);
  await wait(500);
  const b = JSON.parse(box);
  const r = await send('Page.captureScreenshot', { format: 'png', clip: { x: b.x - 16, y: b.y - 16, width: b.w + 32, height: b.h + 32, scale: 2 } });
  fs.writeFileSync(OUT + 'merge253-C-点默认后面板跟着切.png', Buffer.from(r.data, 'base64'));
  console.log('截图 merge253-C-点默认后面板跟着切.png');
  process.exit(0);
})().catch(e => { console.error('ERR', e.message); process.exit(1); });
