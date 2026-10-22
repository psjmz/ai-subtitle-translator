/* v0.9.323 预览截图：索引页 + 文章页（zh-CN/en/ar RTL），给用户看渲染效果 */
'use strict';
process.on('unhandledRejection', () => { });
const { spawn, execFileSync } = require('child_process');
const fs = require('fs');
const ROOT = __dirname;
const PORT = 3326;
const OUT = require('path').join(ROOT, 'outputs-323');
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT);

const srv = spawn(process.execPath, ['server.js'], { cwd: ROOT, env: Object.assign({}, process.env, { PORT: String(PORT), PUBLIC_URL: 'http://127.0.0.1:' + PORT }), stdio: 'ignore' });

(async () => {
  /* 等 server 就绪 */
  const http = require('http');
  for (let i = 0; i < 30; i++) {
    try { await new Promise((r, j) => http.get('http://127.0.0.1:' + PORT + '/robots.txt', r).on('error', j)); break; }
    catch (e) { await new Promise(r => setTimeout(r, 500)); }
  }
  /* chrome */
  const tmpDir = '/tmp/chrome-prev323-' + Date.now();
  const chrome = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', [
    '--headless', '--remote-debugging-port=9333', '--no-first-run', '--user-data-dir=' + tmpDir,
    '--host-resolver-rules=MAP * ~NOTFOUND, EXCLUDE 127.0.0.1', 'about:blank'], { stdio: 'ignore' });
  await new Promise(r => setTimeout(r, 2500));
  const WSLIST = await fetch('http://127.0.0.1:9333/json/list').then(r => r.json()).catch(() => null);
  const wsUrl = WSLIST && WSLIST[0] && WSLIST[0].webSocketDebuggerUrl;
  if (!wsUrl) throw new Error('chrome ws 没起来');

  const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');
  const ws = new WebSocket(wsUrl, { perMessageDeflate: false });
  let mid = 0; const pend = {};
  const send = (m, p) => new Promise(r => { const id = ++mid; pend[id] = r; ws.send(JSON.stringify({ id, method: m, params: p || {} })); });
  ws.on('message', d => { const m = JSON.parse(d); if (m.id && pend[m.id]) { pend[m.id](m.result); delete pend[m.id]; } });
  await new Promise(r => ws.on('open', r));
  await send('Emulation.setDeviceMetricsOverride', { width: 1280, height: 900, deviceScaleFactor: 2, mobile: false });

  const shot = async (url, file, fullPage) => {
    await send('Page.navigate', { url });
    for (let i = 0; i < 40; i++) {
      await new Promise(r => setTimeout(r, 250));
      const ev = await send('Runtime.evaluate', { expression: 'document.readyState' });
      if (ev && ev.result && ev.result.value === 'complete') break;
    }
    await new Promise(r => setTimeout(r, 400));
    let clip;
    if (fullPage) {
      const met = (await send('Page.getLayoutMetrics')).cssContentSize;
      clip = { x: 0, y: 0, width: met.width, height: Math.min(met.height, 4200), scale: 1 };
    }
    const r = await send('Page.captureScreenshot', { format: 'png', clip });
    fs.writeFileSync(require('path').join(OUT, file), Buffer.from(r.data, 'base64'));
    console.log('  ' + file);
  };

  await shot('http://127.0.0.1:' + PORT + '/guides/', 'guides-index.png', false);
  await shot('http://127.0.0.1:' + PORT + '/guides/shift.html', 'guide-shift-zh.png', true);
  await shot('http://127.0.0.1:' + PORT + '/en/guides/srt-fps-converter.html', 'guide-fps-en.png', true);
  await shot('http://127.0.0.1:' + PORT + '/ar/guides/shift.html', 'guide-shift-ar.png', true);

  ws.close(); chrome.kill(); srv.kill();
  console.log('四张预览图在 outputs-323/');
  process.exit(0);
})().catch(e => { console.error('FATAL', e.message); srv.kill(); process.exit(1); });
