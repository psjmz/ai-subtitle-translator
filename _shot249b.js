/* v0.9.249 视觉改造：分区截图（ASS 面板 / VTT 面板 / 槽编辑 / 筛选态 / 单语模式） */
const WebSocket=require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws'),http=require('http'),fs=require('fs');
const PORT=9333,BASE='http://127.0.0.1:3098';
function httpJson(p){return new Promise((res,rej)=>{const r=http.request({host:'127.0.0.1',port:PORT,path:p,method:'PUT'},x=>{let d='';x.on('data',c=>d+=c);x.on('end',()=>{try{res(JSON.parse(d))}catch(e){rej(new Error(d.slice(0,200)))}})});r.on('error',rej);r.end();});}
const wait=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{
  const v=await httpJson('/json/new?'+encodeURIComponent(BASE+'/merge.html'));
  const ws=new WebSocket(v.webSocketDebuggerUrl,{perMessageDeflate:false});let id=0;const wt=new Map();
  await new Promise(r=>ws.on('open',r));
  ws.on('message',m=>{const g=JSON.parse(m);if(g.id&&wt.has(g.id)){const q=wt.get(g.id);wt.delete(g.id);g.error?q.rej(new Error(JSON.stringify(g.error))):q.res(g.result);}});
  const send=(m,p)=>new Promise((res,rej)=>{const i=++id;wt.set(i,{res,rej});ws.send(JSON.stringify({id:i,method:m,params:p||{}}))});
  const ev=async e=>{const r=await send('Runtime.evaluate',{expression:e,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw new Error(r.exceptionDetails.text);return r.result.value;};
  await send('Page.enable');await send('Runtime.enable');
  await send('Emulation.setDeviceMetricsOverride',{width:1440,height:1000,deviceScaleFactor:1,mobile:false});
  await wait(2200);
  const dir='/Users/jp/WorkBuddy/2026-09-04-00-29-54/';
  const shot=async(name,clip)=>{const r=await send('Page.captureScreenshot',{format:'png',clip});
    fs.writeFileSync(dir+name,Buffer.from(r.data,'base64'));console.log('saved',name);};
  const toEl=async(sel,offset)=>ev(`(function(){var e=document.querySelector('${sel}');e.scrollIntoView({block:'start'});
    return Math.max(0,Math.round(e.getBoundingClientRect().top+window.scrollY-${offset||14}));})()`);

  /* 合并设置 + ASS 面板展开 */
  await ev("document.getElementById('assPanel').open=true;1"); await wait(400);
  let y=await toEl('.opts'); await wait(300);
  await shot('merge249-A-ASS面板.png',{x:0,y,width:1440,height:820,scale:1});

  /* 导出格式切 VTT 样式 → VTT 面板展开 */
  await ev("var s=document.getElementById('expFmt');s.value='vttStyle';s.dispatchEvent(new Event('change',{bubbles:true}));1");
  await wait(400);
  await ev("document.getElementById('assPanel').open=false;document.getElementById('mVttPanel').open=true;1");
  await wait(400);
  y=await toEl('#mVttPanel'); await wait(300);
  await shot('merge249-A-VTT面板.png',{x:0,y,width:1440,height:820,scale:1});

  /* 造数据 → 合并 → 套槽 → 筛选态 */
  let en='',zh='';
  for(let i=1;i<=40;i++){const a=String(i*3).padStart(2,'0');
    en+=`${i}\n00:00:${a},000 --> 00:00:${String(i*3+2).padStart(2,'0')},000\nHello line number ${i}\n\n`;
    zh+=`${i}\n00:00:${a},000 --> 00:00:${String(i*3+2).padStart(2,'0')},000\n你好第 ${i} 行内容\n\n`;}
  await ev(`(function(){var a=document.getElementById('srcText'),b=document.getElementById('dstText');
    a.value=${JSON.stringify(en)};a.dispatchEvent(new Event('input',{bubbles:true}));
    b.value=${JSON.stringify(zh)};b.dispatchEvent(new Event('input',{bubbles:true}));return 1})()`);
  await wait(700);
  await ev("document.getElementById('btnMerge').click();1"); await wait(1400);
  await ev("var s=document.getElementById('expFmt');s.value='stack';s.dispatchEvent(new Event('change',{bubbles:true}));1");
  await wait(500);
  /* 勾 3 行 → 套「旁白」→ 再点胶囊做筛选 */
  await ev("(function(){var cbs=document.querySelectorAll('#repRows input[data-ri]');[0,1,2].forEach(i=>{if(cbs[i])cbs[i].click();});return 1})()");
  await wait(500);
  await ev(`(function(){ensureStyle();var c=document.querySelector('#selDock [data-dock-slot="narration"]');if(c)c.click();return 1})()`);
  await wait(700);
  await ev(`(function(){var c=[...document.querySelectorAll('#slotBar .slot-chip')].find(x=>/旁白/.test(x.textContent));
    if(c)c.click();return 1})()`);
  await wait(700);
  await ev("document.getElementById('slotEdit').open=true;1"); await wait(400);
  y=await toEl('.slot-wrap'); await wait(300);
  await shot('merge249-A-槽筛选与编辑.png',{x:0,y,width:1440,height:820,scale:1});

  /* 结果区整体（配对条 + 表格 + dock + 应用条） */
  y=await toEl('.rep'); await wait(300);
  await shot('merge249-A-结果区.png',{x:0,y,width:1440,height:860,scale:1});

  /* 单语模式：只有一列「字幕」，确认表格/设置区不塌 */
  await ev("var r=document.querySelector('input[name=workMode][value=mono]');r.checked=true;r.dispatchEvent(new Event('change',{bubbles:true}));1");
  await wait(900);
  y=await toEl('.mode-tabs'); await wait(300);
  await shot('merge249-A-单语模式.png',{x:0,y,width:1440,height:700,scale:1});
  process.exit(0);
})().catch(e=>{console.error('ERR',e.message);process.exit(1)});
