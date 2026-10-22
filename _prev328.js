/* _prev328.js —— 第四批内容页预览截图（起服务 + 截图 + 关进程同一条命令）
   目的：给用户看第四批 10 篇指南页真机渲染长什么样，不是出图用的（出图走 _shot328.js）。
   截 4 张：zh-CN /guides/repair.html、en /en/guides/hanconv.html、
            zh-CN /guides/table.html、en /en/guides/batch-convert-srt.html（整页首屏 1440x1500）。 */
'use strict';
const { spawn } = require('child_process');
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');
const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const OUT = '/tmp/prev328';
const PORT = 3391;
const DEBUG = 9396;
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const UA_DIR = '/tmp/prev328-' + Date.now();
const NODE = '/Users/jp/.workbuddy/binaries/node/versions/22.22.2-6/bin/node';
const sleep = ms => new Promise(r => setTimeout(r, ms));

const getJson = url => new Promise((res, rej) => {
  http.get(url, r => { let b = ''; r.on('data', d => b += d); r.on('end', () => { try { res(JSON.parse(b)); } catch (e) { rej(e); } }); }).on('error', rej);
});

if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

(async () => {
  const srv = spawn(NODE, ['server.js'], {
    cwd: ROOT, stdio: 'ignore',
    env: Object.assign({}, process.env, { PORT: String(PORT), PUBLIC_URL: 'http://127.0.0.1:' + PORT })
  });
  await sleep(2500);
  const chrome = spawn(CHROME, [
    '--headless', '--no-sandbox', '--disable-gpu', '--no-first-run',
    '--remote-debugging-port=' + DEBUG, '--user-data-dir=' + UA_DIR, 'about:blank'
  ], { stdio: 'ignore' });
  let list = null;
  for (let i = 0; i < 40 && !list; i++) {
    await sleep(400);
    try { list = await getJson('http://127.0.0.1:' + DEBUG + '/json/list'); } catch (e) { list = null; }
  }
  if (!list) { srv.kill(); chrome.kill(); throw new Error('CDP 起不来'); }
  const tab = list.find(t => t.type === 'page') || list[0];
  const ws = new WebSocket(tab.webSocketDebuggerUrl, { perMessageDeflate: false, maxPayload: 256 * 1024 * 1024 });
  let mid = 0; const pend = {};
  ws.on('message', d => { const m = JSON.parse(d); if (m.id && pend[m.id]) { const f = pend[m.id]; delete pend[m.id]; f(m); } });
  await new Promise(r => ws.on('open', r));
  const send = (method, params) => new Promise(r => {
    const id = ++mid;
    const timer = setTimeout(() => { delete pend[id]; r({ __timeout: true, method }); }, 20000);
    pend[id] = m => { clearTimeout(timer); r(m); };
    ws.send(JSON.stringify({ id, method, params: params || {} }));
  });
  await send('Runtime.enable'); await send('Page.enable');
  const ev = async (expr) => {
    const r = await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true });
    if (r.__timeout) throw new Error('evaluate 超时');
    return r.result && r.result.result ? r.result.result.value : null;
  };
  await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1500, deviceScaleFactor: 1, mobile: false });

  async function navigate(url) {
    await send('Page.navigate', { url: 'http://127.0.0.1:' + PORT + url });
    for (let i = 0; i < 60; i++) { await sleep(200); try { if (await ev('document.readyState') === 'complete') break; } catch (e) { } }
    await sleep(1200);
  }
  async function shotPage(prefix) {
    const s = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true });
    if (s.__timeout || !s.result || !s.result.data) throw new Error('截图失败 ' + prefix);
    fs.writeFileSync(path.join(OUT, prefix + '.png'), Buffer.from(s.result.data, 'base64'));
    const t = await ev("document.querySelector('title') ? document.querySelector('title').textContent : ''");
    console.log('  ' + prefix + '.png  | title: ' + t);
  }

  const PAGES = [
    ['/guides/repair.html', '01-repair-zhCN'],
    ['/en/guides/hanconv.html', '02-hanconv-en'],
    ['/guides/table.html', '03-table-zhCN'],
    ['/en/guides/batch-convert-srt.html', '04-batchseason-en']
  ];
  try {
    for (const [url, pre] of PAGES) {
      await navigate(url);
      const h1 = await ev("document.querySelector('h1') ? document.querySelector('h1').textContent.trim() : '(无 h1)'");
      const sec = await ev("document.querySelectorAll('.gbody h2').length");
      const img = await ev("document.querySelectorAll('.gbody picture').length");
      const rel = await ev("document.querySelectorAll('.grel a').length");
      console.log(url + '  → h1「' + h1 + '」 节 ' + sec + ' / 图 ' + img + ' / 相关卡 ' + rel);
      await shotPage(pre);
    }
  } finally {
    try { ws.close(); } catch (e) { }
    chrome.kill(); srv.kill();
    await sleep(300);
  }
  console.log('预览图出完 → ' + OUT);
})().then(() => process.exit(0)).catch(e => { console.error('FATAL', e.message); process.exit(1); });
