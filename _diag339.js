/* _diag339.js —— 最小诊断：外网 /ms/ 与 /fa/ 到底渲染成什么
 * 目的：live339.js 读到 documentElement.lang=zh-CN，但 curl 下来明明是 ms/fa，
 *       先确认是浏览器端真错了，还是探针读错了页面。
 */
'use strict';
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');
const { spawn } = require('child_process');
const http = require('http');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const BASE = 'https://ai-srtsub.com';
const PORT = 9930 + Math.floor(Math.random() * 60);
const wait = ms => new Promise(r => setTimeout(r, ms));

let ws, tid = 0; const pending = new Map();
function send(m, p) {
  const id = ++tid; ws.send(JSON.stringify({ id, method: m, params: p || {} }));
  return new Promise((res, rej) => { pending.set(id, { res, rej }); setTimeout(() => { if (pending.has(id)) { pending.delete(id); rej(new Error('timeout ' + m)); } }, 30000); });
}
async function ev(e) {
  const r = await send('Runtime.evaluate', { expression: e, returnByValue: true, awaitPromise: true });
  if (r.exceptionDetails) throw new Error(r.exceptionDetails.text + ' @ ' + JSON.stringify(r.exceptionDetails));
  return r.result.value;
}

(async () => {
  const chrome = spawn(CHROME, ['--headless=new', '--remote-debugging-port=' + PORT, '--no-sandbox', '--disable-gpu',
    '--lang=zh-CN', '--user-data-dir=/tmp/cr-diag339-' + Date.now(), 'about:blank'], { stdio: 'ignore' });
  await wait(2000);
  let tgt = null;
  for (let i = 0; i < 30 && !tgt; i++) {
    try {
      const r = await new Promise((res, rej) => { const q = http.get({ host: '127.0.0.1', port: PORT, path: '/json/list' }, s => { let d = ''; s.on('data', c => d += c); s.on('end', () => res(JSON.parse(d))); }); q.on('error', rej); q.setTimeout(2000, () => q.destroy(new Error('t'))); });
      tgt = (r || []).find(t => t.type === 'page');
    } catch (e) { await wait(500); }
  }
  if (!tgt) { console.log('浏览器没起来'); chrome.kill(); process.exit(2); }
  ws = new WebSocket(tgt.webSocketDebuggerUrl, { perMessageDeflate: false });
  await new Promise((r, j) => { ws.on('open', r); ws.on('error', j); });
  ws.on('message', d => { const m = JSON.parse(d); if (m.id && pending.has(m.id)) { pending.get(m.id).res(m.result || m); pending.delete(m.id); } });
  await send('Page.enable'); await send('Runtime.enable');
  await send('Network.setCacheDisabled', { cacheDisabled: true });

  for (const u of ['/', '/ms/', '/fa/', '/bo/']) {
    await send('Page.navigate', { url: BASE + u + '?_=' + Date.now() });
    for (let i = 0; i < 60; i++) { const st = await ev('document.readyState'); if (st === 'complete') break; await wait(300); }
    await wait(2000);
    const d = await ev(`({
      href: location.href,
      htmlTag: (document.documentElement.outerHTML||'').slice(0, 120),
      lang: document.documentElement.lang,
      dir: document.documentElement.dir,
      title: document.title,
      uiLang: (window.SiteI18N && SiteI18N.UI) ? SiteI18N.UI.lang : null,
      navLang: navigator.language,
      navLangs: navigator.languages.join(','),
      h1: (document.querySelector('h1')||{innerText:''}).innerText.slice(0,60)
    })`);
    console.log('\n=== ' + u + ' ===');
    for (const k of Object.keys(d)) console.log('  ' + k.padEnd(9) + ' = ' + JSON.stringify(d[k]));
  }
  chrome.kill();
  process.exit(0);
})().catch(e => { console.error('FATAL', e.message); process.exit(1); });
