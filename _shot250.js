/* v0.9.250 分区截图：① 胶囊 Aa 效果字 ② 贴底条「整篇套用」 ③ ✎ 面板里的 16:9 对照预览（套用 / 基础） */
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
  await wait(2400);
  const dir='/Users/jp/WorkBuddy/2026-09-04-00-29-54/';
  const shot=async(name,clip)=>{const r=await send('Page.captureScreenshot',{format:'png',clip});
    fs.writeFileSync(dir+name,Buffer.from(r.data,'base64'));console.log('saved',name);};
  const toEl=async(sel,offset)=>ev(`(function(){var e=document.querySelector('${sel}');e.scrollIntoView({block:'start'});
    return Math.max(0,Math.round(e.getBoundingClientRect().top+window.scrollY-${offset||14}));})()`);

  /* 造数据 → 合并 → ASS 双行底部 */
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
  await wait(600);

  /* ① 槽栏 Aa 胶囊 */
  await ev("(function(){ensureStyle();renderSlots();})()"); await wait(300);
  const aa = await ev(`JSON.stringify([...document.querySelectorAll('#slotBar .slot-aa')].map(function(e){
    var cs=getComputedStyle(e);return {色:cs.color,斜:cs.fontStyle,粗:cs.fontWeight,底:cs.backgroundColor};}))`);
  console.log('   胶囊 Aa：'+aa);
  let y=await toEl('.slot-wrap'); await wait(300);
  await shot('merge250-A-槽栏Aa.png',{x:0,y,width:1440,height:430,scale:1});

  /* ② 勾 3 行 → 贴底条「整篇套用」 */
  await ev("(function(){var cbs=document.querySelectorAll('#repRows input[data-ri]');[0,1,2].forEach(i=>{if(cbs[i])cbs[i].click();});return 1})()");
  await wait(600);
  const dock = await ev(`JSON.stringify({显示:getComputedStyle(document.getElementById('selDock')).display,
    文案:document.getElementById('selDock').textContent,
    按钮宽:Math.round(document.querySelector('#selDock [data-dock-all="1"]').getBoundingClientRect().width)})`);
  console.log('   贴底条：'+dock);
  y=await toEl('.tbl-wrap'); await wait(300);
  await shot('merge250-B-贴底条整篇套用.png',{x:0,y,width:1440,height:560,scale:1});

  /* ③ ✎ 面板里的对照预览 —— 歌词槽（斜体 + 上移 70）。用「分屏」模板：译文行在底部居中，
        上移 70 一眼看得出；底部双行模板下译文行本来就在原文行附近，位移容易看成重叠。 */
  await ev("(function(){var s=document.getElementById('expFmt');s.value='split';s.dispatchEvent(new Event('change',{bubbles:true}));})()");
  await wait(600);
  await ev("(function(){ensureStyle();S.style.cur='lyric';S.pv={base:false};document.getElementById('slotEdit').open=true;renderSlots();renderSlotPvMini();})()");
  await wait(700);
  const pv1 = await ev(`JSON.stringify({显示:getComputedStyle(document.getElementById('slotPv')).display,
    标签:document.getElementById('slotPvTag').textContent,
    原文行色:getComputedStyle(document.getElementById('slotPvLine1')).color,
    译文行色:getComputedStyle(document.getElementById('slotPvLine2')).color,
    译文行离底:Math.round(document.getElementById('slotPvLine2').getBoundingClientRect().bottom-document.getElementById('slotPvScreen').getBoundingClientRect().bottom)})`);
  console.log('   预览（套用音效槽）：'+pv1);
  y=await toEl('#slotEdit'); await wait(300);
  await shot('merge250-C-预览-套用音效槽.png',{x:0,y,width:1440,height:520,scale:1});

  /* 同一块地方，点「基础样式」看对照 */
  await ev("(function(){document.getElementById('slotPvBaseBtn').click();})()"); await wait(600);
  const pv2 = await ev(`JSON.stringify({标签:document.getElementById('slotPvTag').textContent,
    译文行色:getComputedStyle(document.getElementById('slotPvLine2')).color,
    译文行离底:Math.round(document.getElementById('slotPvLine2').getBoundingClientRect().bottom-document.getElementById('slotPvScreen').getBoundingClientRect().bottom)})`);
  console.log('   预览（基础样式）：'+pv2);
  y=await toEl('#slotEdit'); await wait(300);
  await shot('merge250-D-预览-基础样式.png',{x:0,y,width:1440,height:520,scale:1});

  /* ④ VTT 带样式：确认 panel 预览切到 VTT 那套（cue 出来、ASS 两行收起） */
  await ev("(function(){var s=document.getElementById('expFmt');s.value='vttStyle';s.dispatchEvent(new Event('change',{bubbles:true}));})()");
  await wait(700);
  await ev("(function(){S.style.cur='lyric';document.getElementById('slotPvOn').click();})()"); await wait(500);
  const pv3 = await ev(`JSON.stringify({标签:document.getElementById('slotPvTag').textContent,
    cue显:getComputedStyle(document.getElementById('slotPvCue')).display,
    ass两行显:[getComputedStyle(document.getElementById('slotPvLine1')).display,getComputedStyle(document.getElementById('slotPvLine2')).display].join('/'),
    cue文:(document.getElementById('slotPvCue').textContent||'').slice(0,40)})`);
  console.log('   预览（VTT 歌词槽）：'+pv3);
  y=await toEl('#slotEdit'); await wait(300);
  await shot('merge250-E-预览-VTT歌词槽.png',{x:0,y,width:1440,height:560,scale:1});
  process.exit(0);
})().catch(e=>{console.error('ERR',e.message);process.exit(1)});
