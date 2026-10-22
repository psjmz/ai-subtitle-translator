'use strict';
const http = require('http');
const { spawn } = require('child_process');
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');
const PORT = 3098, BASE = 'http://127.0.0.1:' + PORT;
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
let ws, idSeq = 0; const pending = new Map();
function send(m, p) { const id = ++idSeq; ws.send(JSON.stringify({ id, method: m, params: p || {} })); return new Promise((res, rej) => { pending.set(id, { res, rej }); setTimeout(() => { if (pending.has(id)) { pending.delete(id); rej(new Error('timeout')); } }, 15000); }); }
async function ev(e) { const r = await send('Runtime.evaluate', { expression: e, returnByValue: true, awaitPromise: true }); if (r.exceptionDetails) return 'ERR: ' + r.exceptionDetails.text; return r.result.value; }
const wait = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const chrome = spawn(CHROME, ['--headless=new', '--remote-debugging-port=9348', '--no-sandbox', '--disable-gpu', '--remote-allow-origins=*', '--window-size=1440,1600', '--user-data-dir=/tmp/d2-' + Date.now()], { stdio: 'ignore' });
  await wait(2500);
  const l = await new Promise((res, rej) => { http.get('http://127.0.0.1:9348/json/list', r => { let b = ''; r.on('data', d => b += d); r.on('end', () => res(JSON.parse(b))); }).on('error', rej); });
  ws = new WebSocket(l.find(t => t.type === 'page').webSocketDebuggerUrl, { perMessageDeflate: false });
  await new Promise(r => ws.on('open', r));
  ws.on('message', b => { const m = JSON.parse(b.toString()); if (m.id && pending.has(m.id)) { const p = pending.get(m.id); pending.delete(m.id); m.error ? p.rej(new Error(JSON.stringify(m.error))) : p.res(m.result); } });
  await send('Page.enable'); await send('Runtime.enable');
  await send('Page.navigate', { url: BASE + '/merge.html' }); await wait(2200);
  await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1600, deviceScaleFactor: 1, mobile: false }); await wait(400);

  await ev("(function(){var el=document.querySelector('#modeTabs input[value=mono]');el.checked=true;el.dispatchEvent(new Event('change',{bubbles:true}));})()");
  await wait(300);
  await ev("(function(){var t=$('srcText');t.value='1\\n00:00:01,000 --> 00:00:03,000\\n你好\\n\\n2\\n00:00:04,000 --> 00:00:06,000\\n第二行\\n';t.dispatchEvent(new Event('input',{bubbles:true}));})()");
  await wait(500); await ev("$('btnMerge').click()"); await wait(700);

  console.log('--- A. 差异视图为什么 0 行 ---');
  await ev("$('slotEdit').open=true;");
  await ev("(function(){var c=document.querySelector('#slotBar .slot-chip[data-slot=narration]');c.dispatchEvent(new MouseEvent('click',{bubbles:true}));})()");
  await wait(300);
  await ev("$('slotViewAll').click()"); await wait(300);
  console.log('all 视图行数:', await ev("document.querySelectorAll('#slotParams .slot-row').length"));
  await ev(`(function(){
    var d=S.style.slots.narration.dst;
    d.color='#112233';d.outlineColor='#445566';d.edgeColor='#778899';d.alpha=80;d.spacing=1;
    d.outlineW=3;d.edgeSize=4;d.edgeAlpha=70;d.dMV=10;d.marginL=11;d.marginR=12;d.size=110;
    d.font='Menlo';d.bold=true;d.italic=true;d.edgeMode='shadow';d.align='right';
    renderSlotEdit(); return 1;})()`);
  await wait(300);
  console.log('铺满后 all 视图行数:', await ev("document.querySelectorAll('#slotParams .slot-row').length"));
  console.log('cur =', await ev("S.style.cur"), '| view =', await ev("S.style.view"));
  console.log('dst 键数:', await ev("Object.keys(S.style.slots.narration.dst).length"));
  await ev("$('slotViewDiff').click()"); await wait(300);
  console.log('点 diff 后: view =', await ev("S.style.view"));
  console.log('  .slot-row 数:', await ev("document.querySelectorAll('#slotParams .slot-row').length"));
  console.log('  [data-sp-act] 数:', await ev("document.querySelectorAll('#slotParams [data-sp-act]').length"));
  console.log('  [data-sp-act=unset] 数:', await ev("document.querySelectorAll('#slotParams [data-sp-act=\"unset\"]').length"));
  console.log('  innerHTML 前 300:', await ev("$('slotParams').innerHTML.slice(0,300)"));

  console.log('--- B. 改字体控件后 assStyleOf 跟不跟 ---');
  console.log('只设 value 不派发:', await ev(`(function(){
    var el=$('assDstFont'); el.value='Menlo';
    return JSON.stringify({val:el.value, style:assStyleOf().dstFont});})()`));
  console.log('设完派发 input:', await ev(`(function(){
    var el=$('assDstFont'); el.value='Menlo'; el.dispatchEvent(new Event('input',{bubbles:true}));
    return JSON.stringify({val:el.value, style:assStyleOf().dstFont});})()`));
  console.log('设完派发 change:', await ev(`(function(){
    var el=$('assDstFont'); el.value='Menlo'; el.dispatchEvent(new Event('change',{bubbles:true}));
    return JSON.stringify({val:el.value, style:assStyleOf().dstFont});})()`));
  console.log('导出 ASS 的 Fontname:', await ev(`(function(){
    var el=$('assDstFont'); el.value='Menlo'; el.dispatchEvent(new Event('change',{bubbles:true}));
    var s=$('expFmt'); s.value='split'; s.dispatchEvent(new Event('change',{bubbles:true}));
    var o=buildExport(); var m=o.match(/^Style: Bottom,([^,]*)/m); return m?m[1]:'(无)';})()`));

  console.log('--- C. 双语 src 那半跳过了哪几项 ---');
  await ev("(function(){var el=document.querySelector('#modeTabs input[value=merge]');el.checked=true;el.dispatchEvent(new Event('change',{bubbles:true}));})()");
  await wait(300);
  await ev("(function(){var t=$('srcText');t.value='1\\n00:00:01,000 --> 00:00:03,000\\nHi\\n';t.dispatchEvent(new Event('input',{bubbles:true}));})()");
  await wait(300);
  await ev("(function(){var t=$('dstText');t.value='1\\n00:00:01,000 --> 00:00:03,000\\n你好\\n';t.dispatchEvent(new Event('input',{bubbles:true}));})()");
  await wait(500); await ev("$('btnMerge').click()"); await wait(900);
  await ev("$('slotEdit').open=true;");
  await ev("(function(){var c=document.querySelector('#slotBar .slot-chip[data-slot=lyric]');c.dispatchEvent(new MouseEvent('click',{bubbles:true}));})()");
  await wait(300); await ev("$('slotViewAll').click()"); await wait(300);
  console.log('双语全量行数:', await ev("document.querySelectorAll('#slotParams .slot-row').length"));
  console.log('各 role 的键:', await ev("JSON.stringify(Array.from(document.querySelectorAll('#slotParams .slot-row')).map(function(r){var a=r.querySelector('[data-sp-act]');return a?a.getAttribute('data-sp-k'):'?';}).reduce(function(o,x){var p=x.split('.');o[p[0]]=(o[p[0]]||0)+1;return o;},{}))"));
  console.log('src 那半的列出的键:', await ev("JSON.stringify(Array.from(document.querySelectorAll('#slotParams .slot-row')).map(function(r){var a=r.querySelector('[data-sp-act]');return a?a.getAttribute('data-sp-k'):'';}).filter(function(x){return x.indexOf('src.')===0;}))"));

  chrome.kill(); process.exit(0);
})().catch(e => { console.error(e); process.exit(2); });
