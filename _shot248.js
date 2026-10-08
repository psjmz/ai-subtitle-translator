const WebSocket=require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws'),http=require('http'),fs=require('fs');
const PORT=9333,BASE='http://127.0.0.1:8899';
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
  const shot=async(n)=>{const r=await send('Page.captureScreenshot',{format:'png'});
    fs.writeFileSync('/Users/jp/WorkBuddy/2026-09-04-00-29-54/'+n,Buffer.from(r.data,'base64'));console.log('saved',n);};
  await ev("window.scrollTo(0,0);1"); await wait(500);
  await shot('merge248-上传区瘦身.png');
  // 造数据 → 合并 → 勾选 → 截 dock
  let en='',zh='';
  for(let i=1;i<=40;i++){const a=String(i*3).padStart(2,'0');
    en+=`${i}\n00:00:${a},000 --> 00:00:${String(i*3+2).padStart(2,'0')},000\nHello line number ${i}\n\n`;
    zh+=`${i}\n00:00:${a},000 --> 00:00:${String(i*3+2).padStart(2,'0')},000\n你好第 ${i} 行内容\n\n`;}
  await ev(`(function(){var a=document.getElementById('srcText'),b=document.getElementById('dstText');
    a.value=${JSON.stringify(en)};a.dispatchEvent(new Event('input',{bubbles:true}));
    b.value=${JSON.stringify(zh)};b.dispatchEvent(new Event('input',{bubbles:true}));return 1})()`);
  await wait(700);
  await ev("document.getElementById('btnMerge').click();1"); await wait(1200);
  await ev("document.getElementById('expFmt').value='stack';document.getElementById('expFmt').dispatchEvent(new Event('change',{bubbles:true}));1"); await wait(600);
  await ev("(function(){var cbs=document.querySelectorAll('#repRows input[data-ri]');[0,1,2].forEach(i=>{if(cbs[i])cbs[i].click();});return 1})()"); await wait(600);
  await ev("document.querySelector('.tbl-wrap').scrollIntoView({block:'center'});1"); await wait(600);
  await shot('merge248-勾选后贴底选择条.png');
  process.exit(0);
})().catch(e=>{console.error('ERR',e.message);process.exit(1)});
