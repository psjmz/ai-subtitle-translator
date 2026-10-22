/* 单语模式下「原文 / 译文」残留扫描：切单语 → 展开各面板 → 列出所有可见的含「原文」「译文」的元素 */
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');
const http = require('http');
const PORT = 9333, BASE = 'http://127.0.0.1:3098';
const wait = ms => new Promise(r => setTimeout(r, ms));
function J(p){ return new Promise((res, rej) => { const r = http.request({ host:'127.0.0.1', port:PORT, path:p, method:'PUT' }, x => { let d=''; x.on('data',c=>d+=c); x.on('end',()=>{ try{ res(JSON.parse(d)); }catch(e){ rej(new Error(d.slice(0,200))); } }); }); r.on('error', rej); r.end(); }); }
const NL = String.fromCharCode(10);
const SRT = ['1','00:00:01,000 --> 00:00:03,000','第一行原文','','2','00:00:04,000 --> 00:00:06,000','第二行原文',''].join(NL);
const b64 = s => Buffer.from(s, 'utf8').toString('base64');

(async () => {
  const v = await J('/json/new?' + encodeURIComponent('about:blank'));
  const ws = new WebSocket(v.webSocketDebuggerUrl, { perMessageDeflate: false });
  let id = 0; const wt = new Map();
  await new Promise(r => ws.on('open', r));
  ws.on('message', m => { const g = JSON.parse(m); if (g.id && wt.has(g.id)) { const q = wt.get(g.id); wt.delete(g.id); g.error ? q.rej(new Error(JSON.stringify(g.error))) : q.res(g.result); } });
  const send = (m, p) => new Promise((res, rej) => { const i = ++id; wt.set(i, { res, rej }); ws.send(JSON.stringify({ id:i, method:m, params:p||{} })); });
  const ev = async e => { const r = await send('Runtime.evaluate', { expression:e, returnByValue:true, awaitPromise:true });
    if (r.exceptionDetails) throw new Error((r.exceptionDetails.exception||{}).description || r.exceptionDetails.text); return r.result.value; };
  await send('Page.enable'); await send('Runtime.enable');
  await send('Network.setCacheDisabled', { cacheDisabled: true });
  await send('Emulation.setDeviceMetricsOverride', { width:1280, height:1000, deviceScaleFactor:1, mobile:false });
  await send('Page.navigate', { url: BASE + '/merge.html' });
  await wait(2600);
  const step = async s => { await ev(s); };

  await step('endDemo();');
  await step(`loadSide('src', decodeURIComponent(escape(atob(${JSON.stringify(b64(SRT))}))), 'clip.srt');`);
  await step(`document.querySelector('#modeTabs input[name=workMode][value="mono"]').click();`);
  await step('doMono();');
  await step(`setFmtSilently('split');`);
  /* 把所有 details 面板都展开，才看得见里面的东西 */
  await step(`document.querySelectorAll('details').forEach(d=>{ d.open = true; });`);
  await wait(600);
  await step(`renderSlots(); renderPv();`);

  const scan = `(function(){
    var out = [];
    var seen = {};
    document.querySelectorAll('*').forEach(function(el){
      if (el.children.length) return;
      var cs = getComputedStyle(el);
      if (cs.display === 'none' || cs.visibility === 'hidden') return;
      if (!el.offsetParent && el.tagName !== 'TH' && el.tagName !== 'TD') return;
      var tx = (el.textContent || '').trim();
      if (!tx) return;
      if (tx.indexOf('原文') < 0 && tx.indexOf('译文') < 0) return;
      var path = [], p = el;
      for (var i=0; i<5 && p && p.tagName !== 'BODY'; i++){
        path.unshift(p.tagName.toLowerCase() + (p.id ? '#'+p.id : '') + (p.className && typeof p.className === 'string' ? '.'+p.className.split(' ')[0] : ''));
        p = p.parentElement;
      }
      var key = path.join('>') + '|' + tx.slice(0,20);
      if (seen[key]) return; seen[key] = 1;
      out.push({ 位置: path.slice(-3).join('>'), 文本: tx.slice(0, 46) });
    });
    return JSON.stringify(out);
  })()`;
  const list = JSON.parse(await ev(scan));
  console.log('【单语模式 · 可见的「原文 / 译文」字样】共 ' + list.length + ' 处');
  list.forEach(x => console.log('  · ' + x.位置 + '  →  ' + x.文本));

  console.log(NL + '【对照：各容器显隐】');
  const st = JSON.parse(await ev(`JSON.stringify({
    assPanel:getComputedStyle(document.getElementById('assPanel')).display,
    assSrcCol:(document.querySelector('.ass-col h4[data-i18n="lblSrcCol"]')||{}).textContent,
    assDstCol:(document.querySelector('.ass-col h4[data-i18n="lblDstCol"]')||{}).textContent,
    thSrc:(function(){ var e=document.getElementById('thSrc'); if(!e) return 'MISSING'; var cs=getComputedStyle(e); return cs.display+'/'+e.textContent; })(),
    thDst:(function(){ var e=document.getElementById('thDst'); if(!e) return 'MISSING'; return e.textContent; })(),
    slotWrap:getComputedStyle(document.getElementById('slotWrap')).display,
    vttPanel:getComputedStyle(document.getElementById('mVttPanel')).display
  })`));
  console.log('  ' + JSON.stringify(st, null, 0));
  process.exit(0);
})().catch(e => { console.error('探针出错：', e.message); process.exit(2); });
