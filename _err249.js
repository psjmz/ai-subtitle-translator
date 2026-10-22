/* 抓 merge.html 的运行时异常与 console.error */
const WebSocket=require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws'),http=require('http');
function httpJson(p){return new Promise((res,rej)=>{const r=http.request({host:'127.0.0.1',port:9333,path:p,method:'PUT'},x=>{let d='';x.on('data',c=>d+=c);x.on('end',()=>{try{res(JSON.parse(d))}catch(e){rej(new Error(d.slice(0,200)))}})});r.on('error',rej);r.end();});}
const wait=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{
  const v=await httpJson('/json/new?'+encodeURIComponent('http://127.0.0.1:8899/merge.html'));
  const ws=new WebSocket(v.webSocketDebuggerUrl,{perMessageDeflate:false});let id=0;const wt=new Map();
  await new Promise(r=>ws.on('open',r));
  ws.on('message',m=>{const g=JSON.parse(m);
    if(g.id&&wt.has(g.id)){const q=wt.get(g.id);wt.delete(g.id);g.error?q.rej(new Error(JSON.stringify(g.error))):q.res(g.result);}
    else if(g.method==='Runtime.exceptionThrown'){
      const d=g.params.exceptionDetails;
      console.log('!! EXCEPTION:', d.text, '|', (d.exception&&(d.exception.description||d.exception.value))||'');
      if(d.stackTrace) console.log('   at', (d.stackTrace.callFrames||[]).slice(0,4).map(f=>f.url+':'+f.lineNumber+':'+f.columnNumber).join(' <- '));
    }
    else if(g.method==='Runtime.consoleAPICalled'){
      const t=g.params.type; if(t==='error'||t==='warning')
        console.log('!! console.'+t+':', (g.params.args||[]).map(a=>a.value||a.description||'').join(' ').slice(0,300));
    }
    else if(g.method==='Log.entryAdded'){const e=g.params.entry;
      if(e.level==='error') console.log('!! log.error:', e.text, e.url||'', e.lineNumber||'');}
  });
  const send=(m,p)=>new Promise((res,rej)=>{const i=++id;wt.set(i,{res,rej});ws.send(JSON.stringify({id:i,method:m,params:p||{}}))});
  await send('Runtime.enable');await send('Log.enable');await send('Page.enable');
  await send('Page.navigate',{url:'http://127.0.0.1:8899/merge.html'});
  await wait(3500);
  const r=await send('Runtime.evaluate',{expression:"typeof $ + ' | ' + (typeof document.querySelector('table.tbl')) + ' | ' + document.querySelectorAll('.card').length",returnByValue:true});
  console.log('probe:', r.result.value);
  process.exit(0);
})().catch(e=>{console.error('ERR',e.message);process.exit(1)});
