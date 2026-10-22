const WebSocket=require('ws'),http=require('http');
const PORT=9333;const PAGE='http://127.0.0.1:8899/merge.html';
function httpJson(p){return new Promise((res,rej)=>{const r=http.request({host:'127.0.0.1',port:PORT,path:p,method:'PUT'},x=>{let d='';x.on('data',c=>d+=c);x.on('end',()=>{try{res(JSON.parse(d))}catch(e){rej(new Error(d.slice(0,300)))}})});r.on('error',rej);r.end();});}
let ws,id=0;const wt=new Map();
const send=(m,p)=>new Promise((res,rej)=>{const i=++id;wt.set(i,{res,rej});ws.send(JSON.stringify({id:i,method:m,params:p||{}}))});
async function ev(e){const r=await send('Runtime.evaluate',{expression:e,awaitPromise:true,returnByValue:true});if(r.exceptionDetails)throw new Error((r.exceptionDetails.exception||{}).description||'err');return r.result.value;}
const wait=ms=>new Promise(r=>setTimeout(r,ms));
const EN='1\n00:00:00,000 --> 00:00:02,000\nhello one\n\n2\n00:00:03,000 --> 00:00:05,000\nhello two\n';
const ZH='1\n00:00:00,000 --> 00:00:02,000\n你好一\n\n2\n00:00:03,000 --> 00:00:05,000\n你好二\n';
(async()=>{
  const v=await httpJson('/json/new?'+encodeURIComponent(PAGE));
  ws=new WebSocket(v.webSocketDebuggerUrl,{perMessageDeflate:false});
  await new Promise(r=>ws.on('open',r));
  ws.on('message',m=>{const g=JSON.parse(m);if(g.id&&wt.has(g.id)){const q=wt.get(g.id);wt.delete(g.id);g.error?q.rej(new Error(JSON.stringify(g.error))):q.res(g.result);}});
  await send('Page.enable');await send('Runtime.enable');
  await send('Emulation.setDeviceMetricsOverride',{width:1440,height:900,deviceScaleFactor:1,mobile:false});
  await wait(1500);
  console.log('fill', await ev(`(function(){var a=document.getElementById('srcText'),b=document.getElementById('dstText');a.value=${JSON.stringify(EN)};a.dispatchEvent(new Event('input',{bubbles:true}));b.value=${JSON.stringify(ZH)};b.dispatchEvent(new Event('input',{bubbles:true}));return [a.value.length,b.value.length];})()`));
  await wait(600);
  console.log('srcOk', await ev("document.getElementById('srcOk').textContent+'|'+getComputedStyle(document.getElementById('srcOk')).display"));
  console.log('btnDisabled', await ev("document.getElementById('btnMerge').disabled"));
  console.log('click', await ev("document.getElementById('btnMerge').click();'clicked'"));
  await wait(1200);
  console.log('rows', await ev("(typeof S!=='undefined'&&S.rows)?S.rows.length:'no S'"));
  console.log('display', await ev("document.getElementById('rep').style.display+' / '+document.getElementById('exp').style.display"));
  console.log('expRect', await ev("JSON.stringify(document.getElementById('exp').getBoundingClientRect())"));
  console.log('fmt', await ev("document.getElementById('expFmt').value"));
  process.exit(0);
})().catch(e=>{console.error('ERR',e.message);process.exit(1)});
