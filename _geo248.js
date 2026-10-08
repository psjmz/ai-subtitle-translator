const WebSocket=require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws'),http=require('http');
const PORT=9333,PAGE='http://127.0.0.1:8899/merge.html';
function httpJson(p){return new Promise((res,rej)=>{const r=http.request({host:'127.0.0.1',port:PORT,path:p,method:'PUT'},x=>{let d='';x.on('data',c=>d+=c);x.on('end',()=>{try{res(JSON.parse(d))}catch(e){rej(new Error(d.slice(0,200)))}})});r.on('error',rej);r.end();});}
const wait=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{
  const v=await httpJson('/json/new?'+encodeURIComponent(PAGE));
  const ws=new WebSocket(v.webSocketDebuggerUrl,{perMessageDeflate:false});let id=0;const wt=new Map();
  await new Promise(r=>ws.on('open',r));
  ws.on('message',m=>{const g=JSON.parse(m);if(g.id&&wt.has(g.id)){const q=wt.get(g.id);wt.delete(g.id);g.error?q.rej(new Error(JSON.stringify(g.error))):q.res(g.result);}});
  const send=(m,p)=>new Promise((res,rej)=>{const i=++id;wt.set(i,{res,rej});ws.send(JSON.stringify({id:i,method:m,params:p||{}}))});
  const ev=async e=>{const r=await send('Runtime.evaluate',{expression:e,awaitPromise:true,returnByValue:true});
    if(r.exceptionDetails)throw new Error((r.exceptionDetails.exception||{}).description||'err');return r.result.value;};
  await send('Page.enable');await send('Runtime.enable');
  await send('Emulation.setDeviceMetricsOverride',{width:1440,height:900,deviceScaleFactor:1,mobile:false});
  await wait(2200);
  const H = s => `Math.round(document.querySelector('${s}').getBoundingClientRect().height)`;
  console.log('--- 页头纵向占用（1440x900）---');
  console.log(await ev(`JSON.stringify({
    hero: ${H('.hero')},
    modeTabs: ${H('.mode-tabs')},
    grid2上传区: ${H('.grid2')},
    单卡src: ${H('#srcCard')},
    drop块: ${H('#srcDrop')},
    textarea框: ${H('#srcText')},
    到设置卡顶部: Math.round(document.querySelector('.opts').getBoundingClientRect().top + window.scrollY),
    视口高: window.innerHeight
  })`));
  // 造 40 行数据并合并
  let en='',zh='';
  for(let i=1;i<=40;i++){const a=String(i*3).padStart(2,'0');
    en+=`${i}\n00:00:${a},000 --> 00:00:${String(i*3+2).padStart(2,'0')},000\nHello line number ${i}\n\n`;
    zh+=`${i}\n00:00:${a},000 --> 00:00:${String(i*3+2).padStart(2,'0')},000\n你好第 ${i} 行内容\n\n`;}
  await ev(`(function(){var a=document.getElementById('srcText'),b=document.getElementById('dstText');
    a.value=${JSON.stringify(en)};a.dispatchEvent(new Event('input',{bubbles:true}));
    b.value=${JSON.stringify(zh)};b.dispatchEvent(new Event('input',{bubbles:true}));return 1})()`);
  await wait(600);
  await ev("document.getElementById('btnMerge').click();1"); await wait(1200);
  await ev("document.getElementById('expFmt').value='stack';document.getElementById('expFmt').dispatchEvent(new Event('change',{bubbles:true}));1"); await wait(600);
  console.log('--- 结果区结构 ---');
  console.log(await ev(`JSON.stringify({
    行数: S.rows.length,
    槽栏y: Math.round(document.getElementById('slotBar').getBoundingClientRect().top+window.scrollY),
    槽栏高: ${H('#slotBar')},
    筛选栏y: Math.round(document.getElementById('filterBar').getBoundingClientRect().top+window.scrollY),
    表格wrap高: ${H('.tbl-wrap')},
    应用条y: Math.round(document.getElementById('applyBar').getBoundingClientRect().top+window.scrollY),
    结果区总高: ${H('#rep')}
  })`));
  // 勾选前 3 行，量「勾选处 → 应用条」的距离
  console.log('--- 勾选后，应用条离视野多远 ---');
  console.log(await ev(`(function(){
    var cbs=document.querySelectorAll('#repRows input[type=checkbox]');
    for(var i=0;i<3;i++){cbs[i].click();}
    return '已勾 '+document.querySelectorAll('#repRows input[type=checkbox]:checked').length+' 行';})()`));
  await wait(400);
  console.log(await ev(`(function(){
    var cb=document.querySelectorAll('#repRows input[type=checkbox]')[2];
    var r=cb.getBoundingClientRect();
    var ab=document.getElementById('applyBar').getBoundingClientRect();
    var sb=document.getElementById('slotBar').getBoundingClientRect();
    return JSON.stringify({
      第3行勾选框视口y: Math.round(r.top),
      应用条视口y: Math.round(ab.top),
      槽栏视口y: Math.round(sb.top),
      勾选到应用条距离: Math.round(ab.top-r.top),
      勾选到槽栏距离: Math.round(sb.top-r.top),
      应用条在视口内: ab.top>0&&ab.top<window.innerHeight,
      应用条文案: document.getElementById('applyLabel').textContent
    });})()`));
  process.exit(0);
})().catch(e=>{console.error('ERR',e.message);process.exit(1)});
