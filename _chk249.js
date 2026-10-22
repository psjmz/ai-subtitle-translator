/* v0.9.249 视觉改造核验：读计算样式 + 局部放大截图。
   关注：渐变是否真的消失、主按钮是否实色、令牌是否落到实际渲染上。 */
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
  await wait(2200);

  const probe=await ev(`(function(){
    const g=(sel,prop)=>{const el=document.querySelector(sel);if(!el)return sel+' -> NOT FOUND';
      return getComputedStyle(el)[prop];};
    const grad=[...document.querySelectorAll('*')].filter(el=>{
      const bi=getComputedStyle(el).backgroundImage;return bi&&bi.indexOf('gradient')>=0;}).length;
    return {
      渐变元素数:grad,
      body背景:g('body','backgroundColor'),
      hero强调色:g('.hero h1 em','color'),
      hero强调背景图:g('.hero h1 em','backgroundImage'),
      主按钮背景:g('#btnMerge','backgroundColor'),
      主按钮圆角:g('#btnMerge','borderRadius'),
      主按钮高度:g('#btnMerge','height'),
      主按钮阴影:g('#btnMerge','boxShadow'),
      logo底色:g('.logo-mark','backgroundColor'),
      卡片圆角:g('.card','borderRadius'),
      卡片阴影:g('.card','boxShadow'),
      卡片底色:g('.card','backgroundColor'),
      页面底色:g('body','backgroundColor'),
      上传条内边距:g('.drop-zone','padding'),
      上传条底色:g('.drop-zone','backgroundColor'),
      格式卡选中背景:g('#tplSeg .fmtbtn.on','backgroundColor'),
      格式卡选中背景图:g('#tplSeg .fmtbtn.on','backgroundImage'),
      模式条选中背景:g('.mtab.on span','backgroundColor'),
      模式条选中色:g('.mtab.on span','color'),
      控件高度:g('#biMaxW','height'),
      i18n版本:document.querySelector('.ver').textContent
    };
  })()`);
  console.log(JSON.stringify(probe,null,1));

  /* 局部放大截图：hero + 模式条 + 上传区 */
  const box=await ev(`(function(){const r=document.querySelector('.hero').getBoundingClientRect();
    const b=document.querySelector('.mode-tabs').getBoundingClientRect();
    const c=document.querySelector('.grid2').getBoundingClientRect();
    return {x:0,y:Math.max(0,Math.floor(r.top)-10),w:1440,h:Math.ceil(c.bottom-r.top)+30};})()`);
  await ev(`window.scrollTo(0,0);1`); await wait(400);
  const shot=async(name,clip)=>{const r=await send('Page.captureScreenshot',{format:'png',clip});
    fs.writeFileSync('/Users/jp/WorkBuddy/2026-09-04-00-29-54/'+name,Buffer.from(r.data,'base64'));console.log('saved',name);};
  await shot('merge249-A-局部-首屏上半.png',{x:0,y:box.y,width:1440,height:Math.min(box.h,560),scale:1});
  /* 设置区 + 右栏放大 */
  await ev(`document.querySelector('.opts').scrollIntoView({block:'start'});1`); await wait(500);
  const y2=await ev(`Math.max(0,document.querySelector('.opts').getBoundingClientRect().top-14)`);
  await shot('merge249-A-局部-设置与导出.png',{x:0,y:Math.round(y2),width:1440,height:600,scale:1});
  process.exit(0);
})().catch(e=>{console.error('ERR',e.message);process.exit(1)});
