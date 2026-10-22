/* _diag339b.js —— 决定性测试：浏览器到底收到了哪份 HTML？
 * 在页面内 fetch 自己的 URL，把「网络层收到的 HTML」与「DOM 现状」对照：
 *   - fetch 回来是 ms、DOM 是 zh-CN  → JS 运行时改的（前端问题）
 *   - fetch 回来也是 zh-CN           → 网络层/CDN 给错了（后端或 CDN 问题）
 */
'use strict';
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');
const { spawn } = require('child_process');
const http = require('http');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const BASE = 'https://ai-srtsub.com';
const PORT = 9950 + Math.floor(Math.random() * 40);
const wait = ms => new Promise(r => setTimeout(r, ms));

let ws, tid = 0; const pending = new Map();
function send(m, p) {
  const id = ++tid; ws.send(JSON.stringify({ id, method: m, params: p || {} }));
  return new Promise((res, rej) => { pending.set(id, { res, rej }); setTimeout(() => { if (pending.has(id)) { pending.delete(id); rej(new Error('timeout ' + m)); } }, 30000); });
}
async function ev(e) {
  const r = await send('Runtime.evaluate', { expression: e, returnByValue: true, awaitPromise: true });
  if (r.exceptionDetails) throw new Error(r.exceptionDetails.text);
  return r.result.value;
}

(async () => {
  const chrome = spawn(CHROME, ['--headless=new', '--remote-debugging-port=' + PORT, '--no-sandbox', '--disable-gpu',
    '--lang=zh-CN', '--user-data-dir=/tmp/cr-diag339b-' + Date.now(), 'about:blank'], { stdio: 'ignore' });
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
  await send('Page.enable'); await send('Runtime.enable'); await send('Network.enable');
  await send('Network.setCacheDisabled', { cacheDisabled: true });

  const resp = {};
  ws.on('message', d => {
    const m = JSON.parse(d);
    if (m.method === 'Network.responseReceived') {
      const u = (((m.params || {}).response) || {}).url || '';
      if (u.indexOf('ai-srtsub.com/ms') >= 0 || u.indexOf('ai-srtsub.com/fa') >= 0) {
        resp[u] = { status: m.params.response.status, headers: m.params.response.headers };
      }
    }
  });

  for (const u of ['/ms/', '/fa/']) {
    await send('Page.navigate', { url: BASE + u + '?_=' + Date.now() });
    for (let i = 0; i < 60; i++) { const st = await ev('document.readyState'); if (st === 'complete') break; await wait(300); }
    await wait(2000);

    /* 页面内 fetch 自己，拿到网络层的原始 HTML */
    const raw = await ev(`(async () => {
      try {
        const r = await fetch(location.pathname, { cache: 'no-store' });
        const t = await r.text();
        return { status: r.status, htmlTag: (t.match(/<html[^>]*>/)||['-'])[0],
                 title: (t.match(/<title>([^<]*)<\\/title>/)||[,'-'])[1].slice(0,60) };
      } catch (e) { return { err: String(e) }; }
    })()`);

    const dom = await ev(`({
      htmlTag: (document.documentElement.outerHTML||'').slice(0, 60),
      title: document.title.slice(0, 60),
      uiLang: (window.SiteI18N && SiteI18N.UI) ? SiteI18N.UI.lang : null,
      navLang: navigator.language
    })`);

    console.log('\n=== ' + u + ' ===');
    console.log('  网络层 fetch : ' + JSON.stringify(raw));
    console.log('  DOM 现状    : ' + JSON.stringify(dom));
    console.log('  判定        : ' + (raw.htmlTag === dom.htmlTag.slice(0, raw.htmlTag.length)
      ? '网络层给的就是 ' + raw.htmlTag + ' → 后端/CDN 问题'
      : '网络层是 ' + raw.htmlTag + ' 但 DOM 是 ' + dom.htmlTag.match(/<html[^>]*>/) + ' → JS 运行时改的'));
  }

  console.log('\n=== 网络响应头（含语言相关）===');
  for (const u of Object.keys(resp)) {
    const h = resp[u].headers || {};
    console.log('  ' + u.slice(0, 60) + '  status=' + resp[u].status);
    for (const k of ['content-language', 'vary', 'cache-control', 'cf-cache-status', 'location']) {
      if (h[k]) console.log('      ' + k + ': ' + h[k]);
    }
  }
  chrome.kill();
  process.exit(0);
})().catch(e => { console.error('FATAL', e.message); process.exit(1); });
