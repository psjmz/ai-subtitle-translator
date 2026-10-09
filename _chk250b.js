/* v0.9.250 补测：① ASS 预览画斜体 ② 贴底条主操作在最右（本地 3098，连 9333） */
const WebSocket=require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws'),http=require('http');
const PORT=9333,BASE='http://127.0.0.1:3098';
function httpJson(p){return new Promise((res,rej)=>{const r=http.request({host:'127.0.0.1',port:PORT,path:p,method:'PUT'},x=>{let d='';x.on('data',c=>d+=c);x.on('end',()=>{try{res(JSON.parse(d))}catch(e){rej(new Error(d.slice(0,200)))}})});r.on('error',rej);r.end();});}
const wait=ms=>new Promise(r=>setTimeout(r,ms));
let pass=0,fail=0;
const ok=(c,m,x)=>{if(c){pass++;console.log('  ✓ '+m);}else{fail++;console.log('  ✗ '+m+(x!=null?'  → '+String(x).slice(0,160):''));}};
(async()=>{
  const v=await httpJson('/json/new?'+encodeURIComponent(BASE+'/merge.html'));
  const ws=new WebSocket(v.webSocketDebuggerUrl,{perMessageDeflate:false});let id=0;const wt=new Map();const errs=[];
  await new Promise(r=>ws.on('open',r));
  ws.on('message',m=>{const g=JSON.parse(m);if(g.id&&wt.has(g.id)){const q=wt.get(g.id);wt.delete(g.id);g.error?q.rej(new Error(JSON.stringify(g.error))):q.res(g.result);}
    if(g.method==='Runtime.exceptionThrown')errs.push(((g.params.exceptionDetails.exception||{}).description)||g.params.exceptionDetails.text);});
  const send=(m,p)=>new Promise((res,rej)=>{const i=++id;wt.set(i,{res,rej});ws.send(JSON.stringify({id:i,method:m,params:p||{}}))});
  const ev=async e=>{const r=await send('Runtime.evaluate',{expression:e,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)return 'ERR:'+r.exceptionDetails.text;return r.result.value;};
  await send('Page.enable');await send('Runtime.enable');
  await send('Emulation.setDeviceMetricsOverride',{width:1440,height:1000,deviceScaleFactor:1,mobile:false});
  await wait(2300);

  let en='',zh='';
  for(let i=1;i<=20;i++){const a=String(i*2).padStart(2,'0'),b=String(i*2+1).padStart(2,'0');
    en+=`${i}\n00:00:${a},000 --> 00:00:${b},000\nHello line number ${i}\n\n`;
    zh+=`${i}\n00:00:${a},000 --> 00:00:${b},000\n你好第 ${i} 行内容\n\n`;}
  await ev(`(function(){var a=document.getElementById('srcText'),b=document.getElementById('dstText');
    a.value=${JSON.stringify(en)};a.dispatchEvent(new Event('input',{bubbles:true}));
    b.value=${JSON.stringify(zh)};b.dispatchEvent(new Event('input',{bubbles:true}));return 1})()`);
  await wait(700);
  await ev("document.getElementById('btnMerge').click();1"); await wait(1300);
  const rows=await ev('S.rows.length'); ok(Number(rows)===20,'合并 20 行',rows);
  await ev("var s=document.getElementById('expFmt');s.value='split';s.dispatchEvent(new Event('change',{bubbles:true}));1"); await wait(600);

  console.log('— ① ↑ 标记（歌词槽带 dMV:70）—');
  const up=await ev(`JSON.stringify({upN:document.querySelectorAll('#slotBar .slot-aa-up').length,
    chips:[...document.querySelectorAll('#slotBar .slot-chip')].map(function(c){return c.textContent.replace(/\\s+/g,' ').trim();}).slice(0,5)})`);
  console.log('  ',up);
  let U={};try{U=JSON.parse(up);}catch(e){}
  ok(Number(U.upN)===1,'只有歌词槽带 ↑（'+U.upN+' 个）',U.upN);

  console.log('— ② ASS 主预览：基础样式 vs 歌词槽（斜体）—');
  await ev("(function(){ensureStyle();applySlotToAll('default');renderAssPv();})()"); await wait(500);
  const base=await ev(`getComputedStyle(document.getElementById('assPvLine2')).fontStyle`);
  await ev("(function(){ensureStyle();S.style.cur='lyric';applySlotToAll('lyric');renderAssPv();})()"); await wait(600);
  const lyric=await ev(`JSON.stringify({主:getComputedStyle(document.getElementById('assPvLine2')).fontStyle,
    导出斜:(function(){var l=buildExport().split('\\n').filter(function(x){return /^Style: SlotD_lyric/.test(x);})[0];
      if(!l)return 'nostyle';return l.split(',')[8]==='-1';})()})`);
  console.log('   基础='+base+'  歌词='+lyric);
  let L={};try{L=JSON.parse(lyric);}catch(e){}
  ok(base==='normal','基础样式译文行不是斜体',base);
  ok(L.主==='italic','歌词槽 → 主预览译文行变斜体',L.主);
  ok(L.导出斜===true,'导出里 Italic 也是 -1（预览与导出同源）',L.导出斜);

  console.log('— ③ 面板预览同样画斜体 —');
  await ev("(function(){S.pv={base:false};document.getElementById('slotEdit').open=true;renderSlots();renderSlotPvMini();})()"); await wait(600);
  const mini=await ev(`getComputedStyle(document.getElementById('slotPvLine2')).fontStyle`);
  ok(mini==='italic','✎ 面板预览也画斜体',mini);
  await ev("document.getElementById('slotPvBaseBtn').click();1"); await wait(600);
  const mini2=await ev(`getComputedStyle(document.getElementById('slotPvLine2')).fontStyle`);
  ok(mini2==='normal','切基础样式 → 面板预览回正',mini2);

  console.log('— ④ 贴底条：主操作在最右 —');
  await ev("(function(){var cbs=document.querySelectorAll('#repRows input[data-ri]');[0,1,2].forEach(i=>{if(cbs[i])cbs[i].click();});return 1})()"); await wait(600);
  const dock=await ev(`JSON.stringify({all:Math.round(document.querySelector('#selDock [data-dock-all="1"]').getBoundingClientRect().right-document.getElementById('selDock').getBoundingClientRect().right),
    clr:Math.round(document.querySelector('#selDock [data-dock-clr="1"]').getBoundingClientRect().right-document.getElementById('selDock').getBoundingClientRect().right),
    顺序:[...document.querySelectorAll('#selDock button')].map(function(b){return b.className.indexOf('sd-all')>=0?'整篇套用':'清除';}).join('→')})`);
  console.log('  ',dock);
  let DK={};try{DK=JSON.parse(dock);}catch(e){}
  ok(DK.顺序==='清除→整篇套用','按钮顺序：清除在前、整篇套用在后',DK.顺序);
  ok(Math.abs(Number(DK.all))<=20,'「整篇套用」贴住右端（差 '+DK.all+'px）',DK.all);
  ok(errs.length===0,'无 JS 错误',JSON.stringify(errs.slice(0,2)));
  console.log('\n合计 '+pass+' 通过 / '+fail+' 失败');
  process.exit(fail?1:0);
})().catch(e=>{console.error('ERR',e.message);process.exit(1)});
