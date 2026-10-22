/* _design325.js：取真渲染的 guides 文章页/索引页 DOM（含 topnav 渲染产物），
   存 /tmp 供重设计可视稿用。内部脚本，不进部署包。 */
'use strict';
const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');

const PORT = 3352;
function wait(ms) { return new Promise(r => setTimeout(r, ms)); }

(async () => {
  const srv = spawn(process.execPath, ['/Users/jp/WorkBuddy/2026-09-04-00-29-54/srt-translator/server.js'],
    { env: Object.assign({}, process.env, { PORT: String(PORT), PUBLIC_URL: 'http://127.0.0.1:' + PORT }), stdio: 'ignore' });
  for (let i = 0; i < 40; i++) { await wait(250);
    const ok = await new Promise(res => http.get('http://127.0.0.1:' + PORT + '/', () => res(true)).on('error', () => res(false)));
    if (ok) break; }

  const chrome = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', [
    '--headless', '--remote-debugging-port=9352', '--no-first-run',
    '--user-data-dir=/tmp/design325-' + Date.now(),
    '--host-resolver-rules=MAP * ~NOTFOUND, EXCLUDE 127.0.0.1', 'about:blank'], { stdio: 'ignore' });
  let list = null;
  for (let i = 0; i < 30 && !list; i++) { await wait(500);
    list = await new Promise(res => http.get('http://127.0.0.1:9352/json/list', r => { let d = ''; r.on('data', c => d += c); r.on('end', () => res(JSON.parse(d))); }).on('error', () => res(null))); }
  const page = list.find(t => t.type === 'page') || list[0];
  const ws = new WebSocket(page.webSocketDebuggerUrl, { perMessageDeflate: false });
  let mid = 0; const pend = {};
  ws.on('message', d => { const m = JSON.parse(d); if (m.id && pend[m.id]) { pend[m.id](m); delete pend[m.id]; } });
  await new Promise(r => ws.on('open', r));
  const send = (method, params) => new Promise(r => { const id = ++mid; pend[id] = r; ws.send(JSON.stringify({ id, method, params: params || {} })); });

  const grab = async (url, out) => {
    await send('Page.navigate', { url });
    for (let i = 0; i < 30; i++) { await wait(250); const ev = await send('Runtime.evaluate', { expression: 'document.readyState' }); if (ev.result.result.value === 'complete') break; }
    await wait(900);
    const h = await send('Runtime.evaluate', { expression: 'document.documentElement.outerHTML' });
    fs.writeFileSync(out, h.result.result.value);
    console.log('saved', out, h.result.result.value.length);
  };
  await grab('http://127.0.0.1:' + PORT + '/guides/shift.html', '/tmp/dom-article.html');
  await grab('http://127.0.0.1:' + PORT + '/guides/', '/tmp/dom-index.html');
  ws.close(); chrome.kill(); srv.kill(); process.exit(0);
})().catch(e => { console.error('FATAL', e.message); process.exit(1); });
