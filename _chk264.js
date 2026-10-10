/* v0.9.261 导出命名实测：单语不挂 .bi / 无名不张冠李戴 / 二次加工不叠 .bi
   ⚠️ 拦截 a.click 取 a.download，不真下载；每条语句单独 evaluate。 */
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');
const http = require('http');
const PORT = 9333, BASE = 'http://127.0.0.1:3098';
const wait = ms => new Promise(r => setTimeout(r, ms));
let PASS = 0, FAIL = 0;
const ok = (c, name, extra) => { console.log((c ? '  ✓ ' : '  ✗ ') + name + (extra !== undefined && !c ? '  [' + extra + ']' : '')); c ? PASS++ : FAIL++; };
function J(p){ return new Promise((res, rej) => { const r = http.request({ host:'127.0.0.1', port:PORT, path:p, method:'PUT' }, x => { let d=''; x.on('data',c=>d+=c); x.on('end',()=>{ try{ res(JSON.parse(d)); }catch(e){ rej(new Error(d.slice(0,200))); } }); }); r.on('error', rej); r.end(); }); }

const NL = String.fromCharCode(10);
const SRT  = ['1','00:00:01,000 --> 00:00:03,000','第一行原文','','2','00:00:04,000 --> 00:00:06,000','第二行原文',''].join(NL);
const SRT2 = ['1','00:00:01,000 --> 00:00:03,000','First line','','2','00:00:04,000 --> 00:00:06,000','Second line',''].join(NL);
const BI   = ['1','00:00:01,000 --> 00:00:03,000','第一行原文' + NL + 'First line','','2','00:00:04,000 --> 00:00:06,000','第二行原文' + NL + 'Second line',''].join(NL);
const b64 = s => Buffer.from(s, 'utf8').toString('base64');

(async () => {
  const v = await J('/json/new?' + encodeURIComponent('about:blank'));
  const ws = new WebSocket(v.webSocketDebuggerUrl, { perMessageDeflate: false });
  let id = 0; const wt = new Map(); const errs = [];
  await new Promise(r => ws.on('open', r));
  ws.on('message', m => { const g = JSON.parse(m);
    if (g.id && wt.has(g.id)) { const q = wt.get(g.id); wt.delete(g.id); g.error ? q.rej(new Error(JSON.stringify(g.error))) : q.res(g.result); }
    if (g.method === 'Runtime.exceptionThrown') errs.push(((g.params.exceptionDetails.exception||{}).description) || g.params.exceptionDetails.text); });
  const send = (m, p) => new Promise((res, rej) => { const i = ++id; wt.set(i, { res, rej }); ws.send(JSON.stringify({ id:i, method:m, params:p||{} })); });
  const ev = async e => { const r = await send('Runtime.evaluate', { expression:e, returnByValue:true, awaitPromise:true });
    if (r.exceptionDetails) throw new Error((r.exceptionDetails.exception||{}).description || r.exceptionDetails.text); return r.result.value; };

  await send('Page.enable'); await send('Runtime.enable');
  await send('Network.setCacheDisabled', { cacheDisabled: true });
  await send('Page.addScriptToEvaluateOnNewDocument', { source: `
    window.__dl = [];
    HTMLAnchorElement.prototype.click = function(){ if (this.download) window.__dl.push(this.download); };
  `});
  await send('Emulation.setDeviceMetricsOverride', { width:1280, height:1000, deviceScaleFactor:1, mobile:false });
  await send('Page.navigate', { url: BASE + '/merge.html' });
  await wait(2600);

  let DBG = '';
  const step = async s => { try { await ev(s); } catch(e){ DBG = '步骤失败[' + s.slice(0,90) + '] :: ' + String(e.message).slice(0,80); throw new Error(DBG); } };
  /* ⚠️ 用真实 .click()：手写 checked + dispatchEvent 在这版 Chrome 的 Runtime.evaluate 里撞解析问题 */
  const setMode = m => `document.querySelector('#modeTabs input[name=workMode][value=${JSON.stringify(m)}]').click();`;
  const setFmt  = f => `var __s=document.getElementById('expFmt'); if(__s && [...__s.options].some(o=>o.value===${JSON.stringify(f)})){ __s.value=${JSON.stringify(f)}; __s.dispatchEvent(new Event('change',{bubbles:true})); } var __s2=document.getElementById('expFmt2'); if(__s2 && [...__s2.options].some(o=>o.value===${JSON.stringify(f)})){ __s2.value=${JSON.stringify(f)}; __s2.dispatchEvent(new Event('change',{bubbles:true})); }`;
  const load = (side, text, name) => `loadSide('${side}', decodeURIComponent(escape(atob(${JSON.stringify(b64(text))}))), ${JSON.stringify(name)});`;

  const run = async (label, want, steps) => {
    let name = '(没触发下载)';
    try {
      await step('window.__dl = []; endDemo();');
      for (const s of steps) await step(s);
      name = await ev(`(function(){ doDownload(); return window.__dl.length ? window.__dl[window.__dl.length-1] : '(没触发下载)'; })()`);
    } catch(e){ name = '[错] ' + (DBG || String(e.message).slice(0,100)); DBG = ''; }
    ok(name === want, label + ' → ' + want, name);
    return name;
  };

  console.log('【v0.9.261 导出命名】');
  await run('① 合并两份 src=电影.srt / dst=movie.en.srt', '电影.bi.ass',
    [setMode('merge'), load('src', SRT, '电影.srt'), load('dst', SRT2, 'movie.en.srt'), 'doMerge();', setFmt('split')]);
  await run('② 单语 src=clip.srt → ASS（不挂 .bi）', 'clip.ass',
    [setMode('mono'), load('src', SRT, 'clip.srt'), 'doMerge();', setFmt('split')]);
  await run('③ 单语 src=clip.srt → SRT（不挂 .bi）', 'clip.srt',
    [setMode('mono'), load('src', SRT, 'clip.srt'), 'doMerge();', setFmt('srt')]);
  await run('④ 调整双语 src=电影.srt → ASS', '电影.bi.ass',
    [setMode('adjust'), load('src', BI, '电影.srt'), 'doMerge();', setFmt('split')]);
  await run('⑤ 粘贴文本无名（单语）→ 不张冠李戴', 'merged.ass',
    [setMode('mono'), load('src', SRT, ''), 'doMerge();', setFmt('split')]);
  await run('⑥ 二次加工 src=电影.bi.ass（双语）→ 不叠 .bi', '电影.bi.ass',
    [setMode('adjust'), load('src', BI, '电影.bi.ass'), 'doMerge();', setFmt('split')]);
  await run('⑦ 二次加工 src=电影.bi.ass（单语）→ 不叠 .bi', '电影.bi.ass',
    [setMode('mono'), load('src', SRT, '电影.bi.ass'), 'doMerge();', setFmt('split')]);

  /* 主站带过来的两条链路（sessionStorage → 落地即删） */
  for (const [tag, mode, txt, want] of [['⑧ 主站带过来 mono', 'mono', SRT, 'movie.ass'], ['⑨ 主站带过来 bi（双语）', 'bi', BI, 'movie.bi.ass']]) {
    await ev(`sessionStorage.setItem('srt_fx_in', ${JSON.stringify(JSON.stringify({ mode: mode, text: txt, name: 'movie.srt' }))});`);
    await send('Page.navigate', { url: BASE + '/merge.html' });
    await wait(2500);
    let name;
    try {
      await step('window.__dl = []; endDemo();');
      await step(setFmt('split'));
      name = await ev(`(function(){ doDownload(); return window.__dl.length ? window.__dl[window.__dl.length-1] : '(没触发下载)'; })()`);
    } catch(e){ name = '[错] ' + (DBG || String(e.message).slice(0,100)); DBG = ''; }
    ok(name === want, tag + ' (name=movie.srt) → ' + want, name);
  }

  /* 复制内容与下载同名（复制走的是同一个 outName） */
  const copyName = await ev(`(function(){ var a=document.createElement('a'); a.href='#'; a.download=outName(); return a.download; })()`);
  ok(typeof copyName === 'string' && /\.(srt|vtt|ass)$/.test(copyName), '⑩ outName() 扩展名合法', copyName);

  ok(errs.length === 0, '全程无 JS 异常', errs.slice(0,2).join(' | '));
  console.log(`\n结果: ${PASS}/${PASS+FAIL}`);
  ws.close(); process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error('crash', e.message); process.exit(1); });
