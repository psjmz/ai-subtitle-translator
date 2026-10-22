/* v0.9.269 出图：字幕区就地编辑的实际样子
   —— 第 3 行正开着编辑框（含「回车保存 · Shift+回车换行 · Esc 取消」提示），
      第 1、2 行已经改过（行号后有粉点），底部挂着「已手工改 2 处 · 刷新页面不会丢 · 全部还原」。
   用法：先 PORT=3098 node server.js + 9333 上已有调试 Chrome，再 node _shot269.js */
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');
const http = require('http');
const fs = require('fs');
const PORT = 9333, BASE = 'http://127.0.0.1:3098';
const OUT = '/Users/jp/WorkBuddy/2026-09-04-00-29-54/ui-redesign/';
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
  await send('Emulation.setDeviceMetricsOverride', { width: 1320, height: 1100, deviceScaleFactor: 1, mobile: false });
  await wait(2400);

  const ts = s => String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0');
  let en = '', zh = '';
  const Z = ['这是第一句原文', '欢迎收看本期节目', '今天我们来聊聊字幕', '特效处理其实不难', '改完直接导出就行', '感谢你的观看'];
  const E = ['This is the first line', 'Welcome to the show', 'Today we talk about subtitles', 'Effects are not that hard', 'Just export when done', 'Thanks for watching'];
  for (let i = 0; i < 6; i++) { const a = i * 2 + 1, b = i * 2 + 2;
    en += `${i+1}\n00:${ts(a)},000 --> 00:${ts(b)},000\n${E[i]}\n\n`;
    zh += `${i+1}\n00:${ts(a)},000 --> 00:${ts(b)},000\n${Z[i]}\n\n`; }
  await ev(`localStorage.removeItem('srt_fx_edit_v1')`);
  await ev(`(function(){var a=document.getElementById('srcText'),b=document.getElementById('dstText');
    a.value=${JSON.stringify(en)};a.dispatchEvent(new Event('input',{bubbles:true}));
    b.value=${JSON.stringify(zh)};b.dispatchEvent(new Event('input',{bubbles:true}));return 1})()`);
  await wait(700);
  await ev("document.getElementById('btnMerge').click();1"); await wait(1300);

  /* ① 第 1 行改译文 */
  await ev(`(function(){var td=document.querySelector('#repRows td.ed[data-ed="dst"][data-ri="0"]');
    td.click(); var i=td.querySelector('.ed-in'); i.value='这是第一句（改过的译文）';
    i.dispatchEvent(new KeyboardEvent('keydown',{key:'Enter',bubbles:true})); return 1})()`);
  await wait(400);
  /* ② 第 2 行改时间轴 */
  await ev(`(function(){var td=document.querySelector('#repRows td.ed[data-ed="tm"][data-ri="1"]');
    td.click(); var ins=td.querySelectorAll('.ed-in');
    ins[0].value='00:00:04,500'; ins[1].value='00:00:07,000';
    ins[1].dispatchEvent(new KeyboardEvent('keydown',{key:'Enter',bubbles:true})); return 1})()`);
  await wait(400);
  /* ③ 第 3 行把编辑框**开着**（截图要看的就是这一刻） */
  await ev(`(function(){var td=document.querySelector('#repRows td.ed[data-ed="dst"][data-ri="2"]');
    td.click(); return !!td.querySelector('.ed-in')})()`);
  await wait(500);

  const info = await ev(`JSON.stringify({ed:editedCount(), bar:document.getElementById('edBar').innerText})`);
  console.log('状态: ' + info);

  /* 出图：表格头部 + 前几行 + 底部状态条，三者同框 */
  const box = await ev(`(function(){var ss=['#repRows tr:nth-child(1)','#repRows tr:nth-child(3)','#edBar'].map(function(s){return document.querySelector(s)}).filter(Boolean);
    function union(){var L=1e9,T=1e9,R=-1e9,B=-1e9;
      ss.forEach(function(e){var r=e.getBoundingClientRect();L=Math.min(L,r.left);T=Math.min(T,r.top);R=Math.max(R,r.right);B=Math.max(B,r.bottom);});
      return {x:L+window.scrollX,y:T+window.scrollY,w:R-L,h:B-T};}
    var u0=union(); window.scrollTo(0, Math.max(0,u0.y-90)); var u=union();
    var y=Math.max(window.scrollY+6, Math.min(u.y, window.scrollY+window.innerHeight-u.h-10));
    return JSON.stringify({x:Math.round(u.x),y:Math.round(y),w:Math.round(u.w),h:Math.round(u.h)});})()`);
  await wait(500);
  const b = JSON.parse(box);
  const r = await send('Page.captureScreenshot', { format: 'png', clip: { x: b.x - 16, y: b.y - 16, width: b.w + 32, height: b.h + 32, scale: 2 } });
  fs.writeFileSync(OUT + 'v269-edit-inline.png', Buffer.from(r.data, 'base64'));
  console.log('已出图 ui-redesign/v269-edit-inline.png');
  process.exit(0);
})().catch(e => { console.error('ERR', e.message); process.exit(1); });
