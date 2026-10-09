/* v0.9.251 细节图：出厂歌词槽 dMV 70→36 之后，**底部双行（默认模板）**下的实际观感。
   用法：PORT=3098 node server.js + 9333 上已有调试 Chrome */
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
  const ts=s=>String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0');
  let en='',zh='';
  for(let i=1;i<=6;i++){const a=i*2,b=i*2+1;
    en+=`${i}\n00:${ts(a)},000 --> 00:${ts(b)},000\nHello line number ${i}\n\n`;
    zh+=`${i}\n00:${ts(a)},000 --> 00:${ts(b)},000\n你好第 ${i} 行内容\n\n`;}
  await ev(`(function(){var a=document.getElementById('srcText'),b=document.getElementById('dstText');
    a.value=${JSON.stringify(en)};a.dispatchEvent(new Event('input',{bubbles:true}));
    b.value=${JSON.stringify(zh)};b.dispatchEvent(new Event('input',{bubbles:true}));return 1})()`);
  await wait(700);
  await ev("document.getElementById('btnMerge').click();1"); await wait(1400);
  /* ⚠️ 必须显式切到「ASS 底部双行」（42/117）—— 这才是 70 会撞车的场景。
     出厂 expFmt 是 srt（无样式，SRT 根本不吃槽），别指望默认就落在这一档。 */
  await ev("var s=document.getElementById('expFmt');s.value='stack';s.dispatchEvent(new Event('change',{bubbles:true}));1"); await wait(700);
  await ev("(function(){ensureStyle();S.style.cur='lyric';applySlotToAll('lyric');syncSlotsToRows();S.pv={base:false};document.getElementById('slotEdit').open=true;renderReport();renderSlots();renderAssPv();renderSlotPvMini();})()");
  await wait(900);
  console.log('默认模板/预设：'+await ev(`JSON.stringify({expFmt:document.getElementById('expFmt').value,
    dstMV:document.getElementById('assDstMV').value, srcMV:document.getElementById('assSrcMV').value,
    lyric:SLOT_FACTORY.filter(function(f){return f.id==='lyric';})[0].dst})`));

  const boxOf=async sel=>JSON.parse(await ev(`(function(){var e=document.querySelector('${sel}');e.scrollIntoView({block:'center'});var r=e.getBoundingClientRect();
    return JSON.stringify([Math.round(r.left),Math.round(r.top+window.scrollY),Math.round(r.width),Math.round(r.height)]);})()`));
  const grab=async(name,sel,pad)=>{const [x,y,w,h]=await boxOf(sel);await wait(350);
    await shot(name,{x:Math.max(0,x-(pad||8)),y:Math.max(0,y-(pad||8)),width:w+(pad||8)*2,height:h+(pad||8)*2,scale:2});};

  await grab('zoom251-A-主预览-歌词槽.png','#assPvScreen');
  console.log('  主预览两行：'+await ev(`JSON.stringify({l1:getComputedStyle(document.getElementById('assPvLine1')).bottom,
    l2:getComputedStyle(document.getElementById('assPvLine2')).bottom, l2斜:getComputedStyle(document.getElementById('assPvLine2')).fontStyle})`));
  await grab('zoom251-B-面板预览-歌词槽.png','#slotPv');
  await ev("document.getElementById('slotPvBaseBtn').click();1"); await wait(800);
  await grab('zoom251-C-面板预览-基础样式.png','#slotPv');
  await grab('zoom251-D-槽胶囊.png','#slotBar');
  process.exit(0);
})().catch(e=>{console.error('ERR',e.message);process.exit(1)});
