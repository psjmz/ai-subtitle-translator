/* v0.9.247 布局冒烟：右栏是否常驻、是否与左栏重叠、预览尺寸、窄屏是否回单列 */
const WebSocket = require('ws'), http = require('http');
const PORT = +(process.env.CDP_PORT || 9333);
const PAGE = process.env.PAGE || 'http://127.0.0.1:8899/merge.html';
function httpJson(p){return new Promise((res,rej)=>{const r=http.request({host:'127.0.0.1',port:PORT,path:p,method:'PUT'},x=>{let d='';x.on('data',c=>d+=c);x.on('end',()=>{try{res(JSON.parse(d))}catch(e){rej(new Error(d.slice(0,300)))}})});r.on('error',rej);r.end();});}
const wait=ms=>new Promise(r=>setTimeout(r,ms));

const srt=(tag,step)=>Array.from({length:60},(_,i)=>{
  const s=i*step,e=s+2.4;
  const f=t=>{const h=String(Math.floor(t/3600)).padStart(2,'0'),m=String(Math.floor(t/60)%60).padStart(2,'0'),
    ss=String(Math.floor(t%60)).padStart(2,'0'),ms=String(Math.round(t%1*1000)).padStart(3,'0');
    return h+':'+m+':'+ss+','+ms;};
  return (i+1)+'\n'+f(s)+' --> '+f(e)+'\n'+tag+' '+(i+1)+'\n';
}).join('\n');
const EN=srt('All right, this is the first thing we need to do today',3.1);
const ZH=srt('好的，这就是我们今天要做的第一件事情，接下来会更精彩',3.1);

const GEOM = `(function(){
  var q=function(s){var e=document.querySelector(s);if(!e)return null;var r=e.getBoundingClientRect();
    return {x:Math.round(r.x),y:Math.round(r.y),w:Math.round(r.width),h:Math.round(r.height)};};
  var exp=document.getElementById('exp'), rep=document.getElementById('rep'), opts=document.querySelector('.opts');
  var pv=document.getElementById('assPvScreen'); var vv=document.getElementById('mVttPvScreen');
  var scr=(pv&&getComputedStyle(pv).display!=='none')?pv:((vv&&getComputedStyle(vv).display!=='none')?vv:null);
  var pr=scr?scr.getBoundingClientRect():null;
  return {
    文档高:document.documentElement.scrollHeight,
    左_设置:q('.opts'),
    右_导出卡:q('#exp'),
    右_位置:getComputedStyle(exp).position,
    预览屏:pr?{w:Math.round(pr.width),h:Math.round(pr.height)}:null,
    行数:(typeof S!=='undefined'&&S.rows)?S.rows.length:0,
    重叠:(function(){var a=opts.getBoundingClientRect(),b=exp.getBoundingClientRect();
      if(b.width===0)return false; return !(a.right<=b.left+1||b.right<=a.left+1);})()
  };})()`;

async function run(W){
  const v=await httpJson('/json/new?'+encodeURIComponent(PAGE));
  const ws=new WebSocket(v.webSocketDebuggerUrl,{perMessageDeflate:false});
  let id=0; const wt=new Map();
  await new Promise(r=>ws.on('open',r));
  ws.on('message',m=>{const g=JSON.parse(m);if(g.id&&wt.has(g.id)){const q=wt.get(g.id);wt.delete(g.id);g.error?q.rej(new Error(JSON.stringify(g.error))):q.res(g.result);}});
  const send=(m,p)=>new Promise((res,rej)=>{const i=++id;wt.set(i,{res,rej});ws.send(JSON.stringify({id:i,method:m,params:p||{}}))});
  const ev=async e=>{const r=await send('Runtime.evaluate',{expression:e,awaitPromise:true,returnByValue:true});
    if(r.exceptionDetails)throw new Error((r.exceptionDetails.exception||{}).description||'err');return r.result.value;};
  await send('Page.enable'); await send('Runtime.enable');
  await send('Emulation.setDeviceMetricsOverride',{width:W,height:900,deviceScaleFactor:1,mobile:false});
  await wait(2200);
  await ev(`(function(){var a=document.getElementById('srcText'),b=document.getElementById('dstText');
    a.value=${JSON.stringify(EN)};a.dispatchEvent(new Event('input',{bubbles:true}));
    b.value=${JSON.stringify(ZH)};b.dispatchEvent(new Event('input',{bubbles:true}));return 1;})()`);
  await wait(700);
  await ev("document.getElementById('btnMerge').click();1");
  await wait(1500);
  await ev("var s=document.getElementById('expFmt');s.value='stack';s.dispatchEvent(new Event('change',{bubbles:true}));var d=document.getElementById('assPanel');d.open=true;1");
  await wait(700);
  const top=await ev(GEOM);
  await ev("window.scrollTo(0,1400)"); await wait(500);
  const after=await ev(GEOM);
  console.log('\n=== 视口宽 '+W+' ===');
  console.log('文档高', top.文档高, '| 行数', top.行数, '| 左栏宽', top.左_设置.w, '| 右栏', JSON.stringify(top.右_导出卡), 'position='+top.右_位置);
  console.log('预览屏', JSON.stringify(top.预览屏), '| 左右重叠:', top.重叠);
  console.log('滚到 y=1400 后 右栏 y =', after.右_导出卡.y,
    (after.右_导出卡.y>=0 && after.右_导出卡.y<900) ? '→ 仍在视口内（常驻生效）' : '→ 已离开视口');
  ws.close();
}
(async()=>{ for (const W of [1440,1100,820]) await run(W); process.exit(0); })()
  .catch(e=>{console.error('ERR',e.message);process.exit(1)});
