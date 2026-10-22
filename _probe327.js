'use strict';
const { spawn } = require('child_process');
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');
const http = require('http');
const PORT = 3385, DEBUG = 9395;
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const NODE = '/Users/jp/.workbuddy/binaries/node/versions/22.22.2-6/bin/node';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const getJson = url => new Promise((res, rej) => {
  http.get(url, r => { let d = ''; r.on('data', c => d += c); r.on('end', () => res(JSON.parse(d))); }).on('error', rej);
});
(async () => {
  const srv = spawn(NODE, ['server.js'], { cwd: __dirname, stdio: 'ignore',
    env: Object.assign({}, process.env, { PORT: String(PORT), PUBLIC_URL: 'http://127.0.0.1:' + PORT }) });
  await sleep(2500);
  const chrome = spawn(CHROME, ['--headless', '--no-sandbox', '--disable-gpu', '--no-first-run',
    '--remote-debugging-port=' + DEBUG, '--user-data-dir=/tmp/probe327-' + Date.now(), 'about:blank'], { stdio: 'ignore' });
  let list = null;
  for (let i = 0; i < 40 && !list; i++) { await sleep(400); try { list = await getJson('http://127.0.0.1:' + DEBUG + '/json/list'); } catch (e) { list = null; } }
  const tab = list.find(t => t.type === 'page');
  const ws = new WebSocket(tab.webSocketDebuggerUrl, { perMessageDeflate: false });
  let mid = 0; const pend = {};
  ws.on('message', d => { const m = JSON.parse(d); if (m.id && pend[m.id]) { const f = pend[m.id]; delete pend[m.id]; f(m); } });
  await new Promise(r => ws.on('open', r));
  const send = (method, params) => new Promise(r => {
    const id = ++mid;
    const timer = setTimeout(() => { delete pend[id]; r({ __timeout: true, method }); }, 15000);
    pend[id] = m => { clearTimeout(timer); r(m); };
    ws.send(JSON.stringify({ id, method, params: params || {} }));
  });
  await send('Runtime.enable'); await send('Page.enable');
  const errors = [];
  ws.on('message', d => { const m = JSON.parse(d); if (m.method === 'Runtime.exceptionThrown') errors.push(JSON.stringify(m.params.exceptionDetails).slice(0, 150)); });
  const ev = async (expr) => {
    const r = await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true });
    if (r.__timeout) return 'EVAL_TIMEOUT';
    if (r.result && r.result.exceptionDetails) return 'EVAL_EXC';
    return r.result && r.result.result ? r.result.result.value : null;
  };
  console.log('navigate...');
  await send('Page.navigate', { url: 'http://127.0.0.1:' + PORT + '/translate.html' });
  for (let i = 0; i < 60; i++) { await sleep(300); if (await ev('document.readyState') === 'complete') break; }
  console.log('readyState:', await ev('document.readyState'), '| href:', await ev('location.href'));
  console.log('btnDemo:', await ev("!!document.querySelector('#btnDemo')"), '| rows:', await ev("!!document.querySelector('#rows')"), '| stTotal:', await ev("document.querySelector('#stTotal') ? document.querySelector('#stTotal').textContent : 'NOELEM'"));
  console.log('typeof setSrc:', await ev('typeof setSrc'), '| typeof showView:', await ev('typeof showView'));
  console.log('点击 btnDemo...');
  await ev("document.querySelector('#btnDemo').click()");
  await sleep(3000);
  console.log('rows rows:', await ev("document.querySelector('#rows') ? document.querySelector('#rows').children.length : 'NOELEM'"));
  console.log('stTotal:', await ev("document.querySelector('#stTotal') ? document.querySelector('#stTotal').textContent : 'NOELEM'"));
  console.log('secImport:', await ev("!!document.querySelector('.sec-title [data-i18n=\"secImport\"]')"));
  console.log('secTerms:', await ev("!!document.querySelector('.sec-title [data-i18n=\"secTerms\"]')"));
  console.log('所有 sec-title data-i18n:', await ev("Array.from(document.querySelectorAll('.sec-title [data-i18n]')).map(e=>e.getAttribute('data-i18n')).join(',')"));
  console.log('fmtPanel:', await ev("document.querySelector('#fmtPanel') ? getComputedStyle(document.querySelector('#fmtPanel')).display : 'NOELEM'"));
  console.log('console errors:', errors.length ? errors.slice(0,5) : '无');
  try { ws.close(); } catch (e) { }
  chrome.kill(); srv.kill();
  await sleep(300);
  process.exit(0);
})().catch(e => { console.error('FATAL', e.message); process.exit(1); });
