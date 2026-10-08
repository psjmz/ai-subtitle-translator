/* v0.9.247 示例态冒烟：初始是否铺样本、预览是否点亮、下载是否被拦、合并后是否退场 */
const WebSocket=require('ws'),http=require('http');
const PORT=9333,PAGE='http://127.0.0.1:8899/merge.html';
function httpJson(p){return new Promise((res,rej)=>{const r=http.request({host:'127.0.0.1',port:PORT,path:p,method:'PUT'},x=>{let d='';x.on('data',c=>d+=c);x.on('end',()=>{try{res(JSON.parse(d))}catch(e){rej(new Error(d.slice(0,300)))}})});r.on('error',rej);r.end();});}
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
  console.log('1. 初始示例态:', await ev(`JSON.stringify({
    demo: S.demo, 行数: S.rows?S.rows.length:0,
    结果区: getComputedStyle(document.getElementById('rep')).display,
    导出卡: getComputedStyle(document.getElementById('exp')).display,
    提示条可见: getComputedStyle(document.getElementById('demoTip')).display,
    提示条文本: document.getElementById('demoTip').textContent.slice(0,40),
    ASS预览: getComputedStyle(document.getElementById('assPv')).display,
    预览屏高: Math.round(document.getElementById('assPvScreen').getBoundingClientRect().height),
    格式: tplVal(),
    右栏x: Math.round(document.getElementById('exp').getBoundingClientRect().x)
  })`));
  console.log('2. 点下载（应被拦）:', await ev(`(function(){document.getElementById('btnDownload').click();
    return document.getElementById('toast').textContent;})()`));
  await wait(300);
  console.log('   toast:', await ev("document.getElementById('toast').textContent"));
  // 真实合并
  const EN='1\n00:00:00,000 --> 00:00:02,000\nhello one\n\n2\n00:00:03,000 --> 00:00:05,000\nhello two\n';
  const ZH='1\n00:00:00,000 --> 00:00:02,000\n你好一\n\n2\n00:00:03,000 --> 00:00:05,000\n你好二\n';
  await ev(`(function(){var a=document.getElementById('srcText'),b=document.getElementById('dstText');
    a.value=${JSON.stringify(EN)};a.dispatchEvent(new Event('input',{bubbles:true}));
    b.value=${JSON.stringify(ZH)};b.dispatchEvent(new Event('input',{bubbles:true}));return 1;})()`);
  await wait(700);
  await ev("document.getElementById('btnMerge').click();1"); await wait(1200);
  console.log('3. 合并后:', await ev(`JSON.stringify({
    demo: S.demo, 行数: S.rows.length,
    提示条可见: getComputedStyle(document.getElementById('demoTip')).display,
    格式: tplVal(),
    下载可用: !document.getElementById('btnDownload').disabled
  })`));
  process.exit(0);
})().catch(e=>{console.error('ERR',e.message);process.exit(1)});
