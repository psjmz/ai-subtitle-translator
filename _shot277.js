/* v0.9.277 出图：给人眼复核的新首页 + 工作台
   用法：node _shot277.js  → /tmp/shot277-*.png */
'use strict';
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');
const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PORT = 9351, BASE = 'http://127.0.0.1:3098';
const wait = ms => new Promise(r => setTimeout(r, ms));
let ws, tid = 0; const pending = new Map();
function send(method, params) {
  const id = ++tid; ws.send(JSON.stringify({ id, method, params: params || {} }));
  return new Promise((res, rej) => { pending.set(id, { res, rej }); setTimeout(() => { if (pending.has(id)) { pending.delete(id); rej(new Error('timeout ' + method)); } }, 25000); });
}
const ev = async (x) => (await send('Runtime.evaluate', { expression: x, returnByValue: true, awaitPromise: true })).result.value;
async function goto(url) {
  await send('Page.navigate', { url: 'about:blank' }); await wait(250);
  await send('Page.navigate', { url });
  for (let i = 0; i < 40; i++) { try { if (await ev('document.readyState') === 'complete') break; } catch (e) { } await wait(500); }
  await wait(2500);
}
/* 先定视口 → 再滚到目标 → 再量坐标（顺序反了坐标作废） */
async function shot(yFrom, yTo, file) {
  await ev(`window.scrollTo(0,${yFrom})`); await wait(500);
  const rr = await send('Page.captureScreenshot', { format: 'png', clip: { x: 0, y: yFrom, width: 1440, height: yTo - yFrom, scale: 1 } });
  fs.writeFileSync(file, Buffer.from(rr.data, 'base64'));
  console.log('  → ' + file + '  (y ' + yFrom + '→' + yTo + ')');
}
(async () => {
  const chrome = spawn(CHROME, ['--headless=new', '--remote-debugging-port=' + PORT, '--no-sandbox', '--disable-gpu',
    '--remote-allow-origins=*', '--window-size=1440,1200', '--no-proxy-server', '--user-data-dir=/tmp/cbuddy-shot277-' + Date.now()], { stdio: 'ignore' });
  let list = null;
  for (let i = 0; i < 20 && !list; i++) {
    await wait(1000);
    list = await new Promise(res => { const q = http.get('http://127.0.0.1:' + PORT + '/json/list', r => { let b = ''; r.on('data', d => b += d); r.on('end', () => res(JSON.parse(b))); }); q.on('error', () => res(null)); });
  }
  ws = new WebSocket(list.find(t => t.type === 'page').webSocketDebuggerUrl, { perMessageDeflate: false });
  await new Promise(r => ws.on('open', r));
  ws.on('message', buf => { const m = JSON.parse(buf.toString()); if (m.id && pending.has(m.id)) { const p = pending.get(m.id); pending.delete(m.id); m.error ? p.rej(new Error(JSON.stringify(m.error))) : p.res(m.result); } });
  await send('Runtime.enable'); await send('Page.enable');
  await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1100, deviceScaleFactor: 1, mobile: false });

  console.log('首页 /');
  await goto(BASE + '/?rkbanner=1');
  const marks = JSON.parse(await ev(`JSON.stringify((function(){
    var q=function(s){var e=document.querySelector(s);return e?Math.round(e.getBoundingClientRect().top+window.scrollY):0;};
    return { hero:q('.hero'), tools:q('.tools'), d1:q('.det.first'), d2:q('.det.rev'), d3:q('.det:nth-of-type(3)'), band:q('.stats-band'), end:Math.round(document.body.scrollHeight)};
  })())`));
  console.log('  区块位置 ' + JSON.stringify(marks));
  await shot(0, marks.tools + 200, '/tmp/shot277-1-hero-cards.png');
  await shot(marks.d1 - 40, marks.d1 + 520, '/tmp/shot277-2-det-tr.png');

  console.log('工作台 /translate.html');
  await goto(BASE + '/translate.html');
  await shot(0, 560, '/tmp/shot277-3-workspace.png');

  chrome.kill(); ws.close(); process.exit(0);
})().catch(e => { console.error('崩了：', e.message); process.exit(1); });
