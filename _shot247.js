const WebSocket=require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws'),http=require('http'),fs=require('fs');
const PORT=9337,BASE='http://127.0.0.1:3098';
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
  await wait(2500);
  const shot=async(name)=>{const r=await send('Page.captureScreenshot',{format:'png'});
    fs.writeFileSync('/Users/jp/WorkBuddy/2026-09-04-00-29-54/'+name,Buffer.from(r.data,'base64'));console.log('saved',name);};
  await ev("document.getElementById('assPanel').open=true;window.scrollTo(0,0);1"); await wait(600);
  await shot('merge247-顶部空状态示例.png');
  await ev("window.scrollTo(0,900);1"); await wait(700);
  await shot('merge247-参数区右栏常驻.png');
  process.exit(0);
})().catch(e=>{console.error('ERR',e.message);process.exit(1)});
