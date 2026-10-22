/* v0.9.272 出图：特效页新模板按钮排 + 时间轴工具条 + 重叠三选条 */
'use strict';
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');
const http = require('http'); const fs = require('fs');
const PORT = 9333, BASE = 'http://127.0.0.1:3098';
const wait = ms => new Promise(r => setTimeout(r, ms));
const J = p => new Promise((res, rej) => { const r = http.request({ host: '127.0.0.1', port: PORT, path: p, method: 'PUT' }, x => { let d = ''; x.on('data', c => d += c); x.on('end', () => { try { res(JSON.parse(d)); } catch (e) { rej(new Error(d.slice(0, 200))); } }); }); r.on('error', rej); r.end(); });

(async () => {
  const v = await J('/json/new?' + encodeURIComponent('about:blank'));
  const ws = new WebSocket(v.webSocketDebuggerUrl, { perMessageDeflate: false });
  let id = 0; const wt = new Map();
  await new Promise(r => ws.on('open', r));
  ws.on('message', m => { const g = JSON.parse(m); if (g.id && wt.has(g.id)) { const q = wt.get(g.id); wt.delete(g.id); g.error ? q.rej(new Error(JSON.stringify(g.error))) : q.res(g.result); } });
  const send = (m, p) => new Promise((res, rej) => { const i = ++id; wt.set(i, { res, rej }); ws.send(JSON.stringify({ id: i, method: m, params: p || {} })); });
  const ev = async e => { const r = await send('Runtime.evaluate', { expression: e, returnByValue: true, awaitPromise: true }); if (r.exceptionDetails) throw new Error((r.exceptionDetails.exception || {}).description || r.exceptionDetails.text); return r.result.value; };
  await send('Page.enable'); await send('Runtime.enable');
  await send('Network.setCacheDisabled', { cacheDisabled: true });
  await send('Page.navigate', { url: BASE + '/merge.html' });
  await wait(2500);
  await send('Emulation.setDeviceMetricsOverride', { width: 1400, height: 1200, deviceScaleFactor: 1, mobile: false });
  await wait(400);

  await ev(`(function(){
    try{ localStorage.removeItem('srt_fx_edit_v1'); }catch(e){}
    S.mode='merge'; S.srcName='a.srt'; S.dstName='b.srt';
    S.rows=[];
    for(var i=0;i<6;i++){
      S.rows.push({start:1000+i*3000, end:1000+i*3000+2200,
        en:['Hello there, how are you?','I am fine, thank you.','What time is it now?',
            'Let us go for a walk.','This is a test line.','Thanks for watching!'][i],
        zh:['你好啊，你怎么样？','我很好，谢谢你。','现在几点了？','我们出去走走吧。','这是一行测试。','谢谢观看！'][i]});
    }
    S.report={pairs:6,onlySrc:[],onlyDst:[],merged:0};
    ensureStyle(); S.editFp=calcEditFp(); renderReport(); railOn(true); renderPv();
    /* 展开 ASS 面板 + 点开第 2 行的时间格（看相对值提示） */
    var ap=document.getElementById('assPanel'); if(ap) ap.open=true;
    document.getElementById('expFmt').value='stack';
    document.getElementById('expFmt').dispatchEvent(new Event('change',{bubbles:true}));
    return S.rows.length;
  })()`);
  await wait(500);
  /* 造一个重叠，把三选条也拍进去 */
  await ev(`(function(){
    var tds=document.querySelectorAll('#repRows td.ed'), td=null;
    [].slice.call(tds).forEach(function(x){ if(x.getAttribute('data-ed')==='tm' && x.getAttribute('data-ri')==='2') td=x; });
    if(td){ td.click(); var ins=td.querySelectorAll('.ed-in'); ins[0].value='+0.2s';
      ins[1].dispatchEvent(new KeyboardEvent('keydown',{key:'Enter',bubbles:true})); }
    return 1;
  })()`);
  await wait(400);
  await ev(`window.scrollTo(0, document.getElementById('rep').getBoundingClientRect().top + window.scrollY - 90)`);
  await wait(300);
  const shot = async (name) => {
    const r = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('/Users/jp/WorkBuddy/2026-09-04-00-29-54/srt-translator/' + name, Buffer.from(r.data, 'base64'));
    console.log('saved ' + name);
  };
  await shot('_shot272-merge.png');
  ws.close(); process.exit(0);
})().catch(e => { console.error('FATAL', e); process.exit(2); });
