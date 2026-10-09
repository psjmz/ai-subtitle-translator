/* 放大看槽栏胶囊与预览块的细节（2x） */
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
  await send('Emulation.setDeviceMetricsOverride',{width:1440,height:1000,deviceScaleFactor:2,mobile:false});
  await wait(2400);
  const dir='/Users/jp/WorkBuddy/2026-09-04-00-29-54/';
  const shot=async(name,clip)=>{const r=await send('Page.captureScreenshot',{format:'png',clip});
    fs.writeFileSync(dir+name,Buffer.from(r.data,'base64'));console.log('saved',name);};
  let en='',zh='';
  for(let i=1;i<=40;i++){const a=String(i*3).padStart(2,'0');
    en+=`${i}\n00:00:${a},000 --> 00:00:${String(i*3+2).padStart(2,'0')},000\nHello line number ${i}\n\n`;
    zh+=`${i}\n00:00:${a},000 --> 00:00:${String(i*3+2).padStart(2,'0')},000\n你好第 ${i} 行内容\n\n`;}
  await ev(`(function(){var a=document.getElementById('srcText'),b=document.getElementById('dstText');
    a.value=${JSON.stringify(en)};a.dispatchEvent(new Event('input',{bubbles:true}));
    b.value=${JSON.stringify(zh)};b.dispatchEvent(new Event('input',{bubbles:true}));return 1})()`);
  await wait(700);
  await ev("document.getElementById('btnMerge').click();1"); await wait(1400);
  await ev("var s=document.getElementById('expFmt');s.value='split';s.dispatchEvent(new Event('change',{bubbles:true}));1");
  await wait(600);
  await ev("(function(){ensureStyle();S.style.assign={1:'sfx',2:'lyric',3:'emphasis',4:'narration'};S.style.cur='lyric';S.pv={base:false};document.getElementById('slotEdit').open=true;renderReport();renderSlots();renderSlotPvMini();})()");
  await wait(800);

  /* 槽栏放大 */
  let box=await ev(`(function(){var e=document.getElementById('slotBar');e.scrollIntoView({block:'center'});var r=e.getBoundingClientRect();
    return JSON.stringify([Math.round(r.left),Math.round(r.top+window.scrollY),Math.round(r.width),Math.round(r.height)]);})()`);
  let [x,y,w,h]=JSON.parse(box);
  await wait(300);
  await shot('zoom250-A-槽胶囊.png',{x:Math.max(0,x-8),y:Math.max(0,y-8),width:w+16,height:h+16,scale:2});

  /* 预览块放大（套用歌词槽） */
  box=await ev(`(function(){var e=document.getElementById('slotPv');e.scrollIntoView({block:'center'});var r=e.getBoundingClientRect();
    return JSON.stringify([Math.round(r.left),Math.round(r.top+window.scrollY),Math.round(r.width),Math.round(r.height)]);})()`);
  [x,y,w,h]=JSON.parse(box); await wait(300);
  await shot('zoom250-B-预览-歌词.png',{x:Math.max(0,x-8),y:Math.max(0,y-8),width:w+16,height:h+16,scale:2});

  /* 切「基础样式」对照 */
  await ev("document.getElementById('slotPvBaseBtn').click();1"); await wait(700);
  box=await ev(`(function(){var e=document.getElementById('slotPv');var r=e.getBoundingClientRect();
    return JSON.stringify([Math.round(r.left),Math.round(r.top+window.scrollY),Math.round(r.width),Math.round(r.height)]);})()`);
  [x,y,w,h]=JSON.parse(box);
  await shot('zoom250-C-预览-基础.png',{x:Math.max(0,x-8),y:Math.max(0,y-8),width:w+16,height:h+16,scale:2});

  /* 贴底条放大 */
  await ev("(function(){var cbs=document.querySelectorAll('#repRows input[data-ri]');[0,1,2].forEach(i=>{if(cbs[i])cbs[i].click();});return 1})()");
  await wait(800);
  box=await ev(`(function(){var e=document.getElementById('selDock');var tb=document.querySelector('.tbl-wrap');
    tb.scrollTop=tb.scrollHeight;e.scrollIntoView({block:'center'});var r=e.getBoundingClientRect();
    return JSON.stringify([Math.round(r.left),Math.round(r.top+window.scrollY),Math.round(r.width),Math.round(r.height),
      getComputedStyle(e).display]);})()`);
  console.log('   dock 几何：'+box);
  [x,y,w,h]=JSON.parse(box); await wait(400);
  await shot('zoom250-D-贴底条.png',{x:Math.max(0,x-8),y:Math.max(0,y-8),width:w+16,height:h+16,scale:2});
  process.exit(0);
})().catch(e=>{console.error('ERR',e.message);process.exit(1)});
