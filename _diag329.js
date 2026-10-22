/* _diag329.js —— 第五批出图前诊断：merge 页点了合并之后到底渲染出什么 */
'use strict';
const { spawn } = require('child_process');
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');
const http = require('http');
const fs = require('fs');
const path = require('path');
const ROOT = __dirname, PORT = 3387, DEBUG = 9398;
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const UA_DIR = '/tmp/diag329-' + Date.now();
const NODE = '/Users/jp/.workbuddy/binaries/node/versions/22.22.2-6/bin/node';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const getJson = u => new Promise((res, rej) => {
  http.get(u, r => { let b = ''; r.on('data', d => b += d); r.on('end', () => { try { res(JSON.parse(b)); } catch (e) { rej(e); } }); }).on('error', rej);
});
const TMP = '/tmp/diag329f'; fs.mkdirSync(TMP, { recursive: true });
const SRT = ['1', '00:00:01,000 --> 00:00:03,500', 'Good morning. Did you sleep well?', '',
  '2', '00:00:04,000 --> 00:00:07,200', 'Not really. The storm kept me up.', '',
  '3', '00:00:08,000 --> 00:00:11,400', 'The forecast said it would pass.', ''].join('\n');
const TRA = ['1', '00:00:01,000 --> 00:00:03,500', '早上好。你睡得好吗？', '',
  '2', '00:00:04,000 --> 00:00:07,200', '不太好。暴风雨吵得我睡不着。', '',
  '3', '00:00:08,000 --> 00:00:11,400', '天气预报说它会过去。', ''].join('\n');

(async () => {
  const srv = spawn(NODE, ['server.js'], { cwd: ROOT, stdio: 'ignore', env: Object.assign({}, process.env, { PORT: String(PORT) }) });
  await sleep(2200);
  const chrome = spawn(CHROME, ['--headless', '--no-sandbox', '--disable-gpu', '--no-first-run',
    '--remote-debugging-port=' + DEBUG, '--user-data-dir=' + UA_DIR, 'about:blank'], { stdio: 'ignore' });
  let list = null;
  for (let i = 0; i < 40 && !list; i++) { await sleep(400); try { list = await getJson('http://127.0.0.1:' + DEBUG + '/json/list'); } catch (e) { } }
  if (!list) { srv.kill(); chrome.kill(); throw new Error('CDP 起不来'); }
  const tab = list.find(t => t.type === 'page') || list[0];
  const ws = new WebSocket(tab.webSocketDebuggerUrl, { perMessageDeflate: false, maxPayload: 64 * 1024 * 1024 });
  let mid = 0; const pend = {};
  ws.on('message', d => { const m = JSON.parse(d); if (m.id && pend[m.id]) { const f = pend[m.id]; delete pend[m.id]; f(m); } });
  await new Promise(r => ws.on('open', r));
  const send = (method, params) => new Promise(r => {
    const id = ++mid; const t = setTimeout(() => { delete pend[id]; r({ __timeout: true }); }, 20000);
    pend[id] = m => { clearTimeout(t); r(m); };
    ws.send(JSON.stringify({ id, method, params: params || {} }));
  });
  await send('Runtime.enable'); await send('Page.enable'); await send('DOM.enable');
  const ev = async e => {
    const r = await send('Runtime.evaluate', { expression: e, returnByValue: true, awaitPromise: true });
    if (r.result && r.result.exceptionDetails) return 'EXC ' + JSON.stringify(r.result.exceptionDetails).slice(0, 160);
    return r.result && r.result.result ? r.result.result.value : null;
  };
  await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false });
  await send('Page.navigate', { url: 'http://127.0.0.1:' + PORT + '/merge.html' });
  for (let i = 0; i < 60; i++) { await sleep(200); try { if (await ev('document.readyState') === 'complete') break; } catch (e) { } }
  await sleep(1200);

  const upload = async (sel, file) => {
    const doc = await send('DOM.getDocument', { depth: 0 });
    const rootId = doc.result.root.nodeId;
    const node = await send('DOM.querySelector', { nodeId: rootId, selector: sel });
    await send('DOM.setFileInputFiles', { files: [file], nodeId: node.result.nodeId });
  };
  fs.writeFileSync(path.join(TMP, 'a.en.srt'), SRT);
  fs.writeFileSync(path.join(TMP, 'a.zh.srt'), TRA);
  await upload('#srcFile', path.join(TMP, 'a.en.srt'));
  await upload('#dstFile', path.join(TMP, 'a.zh.srt'));
  await sleep(2000);

  console.log('srcOk  :', await ev("(document.querySelector('#srcOk')||{}).textContent"));
  console.log('dstOk  :', await ev("(document.querySelector('#dstOk')||{}).textContent"));
  console.log('modeTab:', await ev("(document.querySelector('#modeTabs')||{}).className"));
  console.log('btnMerge 可见:', await ev("(()=>{const b=document.querySelector('#btnMerge');return b? (b.offsetParent!==null)+' text='+b.textContent.trim() : 'no btn';})()"));
  console.log('pvCard 存在:', await ev("!!document.querySelector('#pvCard')"));
  console.log('pvCard 可见:', await ev("(()=>{const e=document.querySelector('#pvCard');return e?(e.offsetParent!==null)+' h='+Math.round(e.getBoundingClientRect().height)+' w='+Math.round(e.getBoundingClientRect().width):'-';})()"));
  console.log('pvCard tr/行:', await ev("(()=>{const e=document.querySelector('#pvCard');return e? e.querySelectorAll('tr').length + ' / ' + e.querySelectorAll('.row,.cue,.pvrow').length : '-';})()"));
  await ev("document.querySelector('#btnMerge').click()");
  await sleep(2500);
  console.log('--- 点击后 ---');
  console.log('pvCard h:', await ev("(()=>{const e=document.querySelector('#pvCard');return e? Math.round(e.getBoundingClientRect().height)+'x'+Math.round(e.getBoundingClientRect().width):'-';})()"));
  console.log('pvCard tr:', await ev("document.querySelectorAll('#pvCard tr').length"));
  console.log('pvCard 文本:', await ev("(()=>{const e=document.querySelector('#pvCard');return e? e.textContent.replace(/\\s+/g,' ').slice(0,220):'-';})()"));
  console.log('msg    :', await ev("(document.querySelector('#msg')||{}).textContent"));
  await ev("(()=>{const s=document.querySelector('#expFmt');s.value='split';s.dispatchEvent(new Event('change',{bubbles:true}));})()");
  await sleep(1200);
  console.log('expFmt 值:', await ev("(document.querySelector('#expFmt')||{}).value"));
  console.log('assPanel h:', await ev("(()=>{const e=document.querySelector('#assPanel');return e? Math.round(e.getBoundingClientRect().height)+'x'+Math.round(e.getBoundingClientRect().width)+' vis='+(e.offsetParent!==null):'-';})()"));
  console.log('assPanel 直接子元素:', await ev("(()=>{const e=document.querySelector('#assPanel');if(!e)return '-';return Array.from(e.children).map(c=>c.tagName+'.'+c.className.split(' ')[0]+':'+Math.round(c.getBoundingClientRect().height)+(c.offsetParent===null?'[hidden]':'')).join(' | ');})()"));
  console.log('assPanel 文本:', await ev("(()=>{const e=document.querySelector('#assPanel');return e? e.textContent.replace(/\\s+/g,' ').slice(0,200):'-';})()"));
  console.log('assPanel 的父卡片:', await ev("(()=>{const e=document.querySelector('#assPanel');const c=e&&e.closest('.card');return c? (c.id||c.className)+' '+Math.round(c.getBoundingClientRect().height)+'x'+Math.round(c.getBoundingClientRect().width):'-';})()"));

  ws.close(); chrome.kill(); srv.kill();
  await sleep(300);
  process.exit(0);
})().catch(e => { console.error('FATAL', e.message); process.exit(1); });
