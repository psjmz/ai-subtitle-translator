/* _shot312.js —— v0.9.312 真浏览器验证：语言版站内链接联动（照 _shot310 的连接模式）
   量：/en/ 首页 site-nav 胶囊 + 静态工具卡 href；/zh-TW/merge 胶囊（混合大小写）；中文版无前缀 */
'use strict';
process.on('unhandledRejection', e => { console.log('UNHANDLED', e && e.message); });
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');
const { spawn } = require('child_process');
const http = require('http');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const ROOT = __dirname;
const SRV = Number(process.env.SRV || 3422);
const PORT = 9700 + Math.floor(Math.random() * 90);
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
let P = 0, F = 0;
const ok = (c, n, x) => { console.log((c ? '  ✓ ' : '  ✗ ') + n + (x !== undefined ? '  [' + String(x).slice(0, 150) + ']' : '')); c ? P++ : F++; };

(async () => {
  const srv = spawn(process.execPath, ['server.js'], { cwd: ROOT, env: Object.assign({}, process.env, { PORT: String(SRV), PUBLIC_URL: 'http://127.0.0.1:' + SRV }), stdio: 'ignore' });
  await wait(1500);
  const chrome = spawn(CHROME, ['--headless=new', '--remote-debugging-port=' + PORT, '--no-sandbox', '--disable-gpu',
    '--host-resolver-rules=MAP * ~NOTFOUND, EXCLUDE 127.0.0.1',
    '--lang=en-US', '--user-data-dir=/tmp/cr312-' + Date.now(), 'about:blank'], { stdio: 'ignore' });
  await wait(2000);
  let tgt = null;
  for (let i = 0; i < 30 && !tgt; i++) {
    try {
      const r = await new Promise((res, rej) => { const q = http.get({ host: '127.0.0.1', port: PORT, path: '/json/list' }, s => { let d = ''; s.on('data', c => d += c); s.on('end', () => res(JSON.parse(d))); }); q.on('error', rej); q.setTimeout(2000, () => q.destroy(new Error('t'))); });
      tgt = (r || []).find(t => t.type === 'page');
    } catch (e) { await wait(500); }
  }
  if (!tgt) { console.log('浏览器没起来'); srv.kill(); chrome.kill(); process.exit(2); }
  ws = new WebSocket(tgt.webSocketDebuggerUrl, { perMessageDeflate: false });
  await new Promise((r, j) => { ws.on('open', r); ws.on('error', j); });
  ws.on('message', d => { const m = JSON.parse(d); if (m.id && pending.has(m.id)) { pending.get(m.id).res(m.result || m); pending.delete(m.id); } });
  await send('Page.enable'); await send('Runtime.enable');

  async function go(url) {
    await send('Page.navigate', { url });
    for (let i = 0; i < 40; i++) { const st = await ev('document.readyState'); if (st === 'complete') break; await wait(200); }
    await wait(600);
  }

  /* ① /en/ 首页（首页 .tc 卡 11 张 = 9 站内 + 2 外链；外链绝对 URL 不参与前缀重写） */
  await go('http://127.0.0.1:' + SRV + '/en/');
  console.log('== /en/ 首页 ==');
  let r = await ev(`(() => {
    const g = s => [...document.querySelectorAll(s)].map(a => a.getAttribute('href'));
    const inSite = h => h && h.startsWith('/');
    return { pills: g('#siteNav a'), cards: g('#toolCards a'),
             tc: g('a.tc').filter(inSite), tcExt: g('a.tc').filter(h => !inSite(h)),
             cta: g('a.det-cta').filter(inSite),
             favicon: (document.querySelector('link[rel="icon"]')||{}).href };
  })()`);
  console.log('  站内 tc(' + r.tc.length + '): ' + JSON.stringify(r.tc));
  ok(r.tc.length === 9 && r.tc.every(h => h.startsWith('/en/')), '静态工具卡 .tc 站内 9 张全带 /en/ 前缀', JSON.stringify(r.tc));
  ok(r.cta.length === 9 && r.cta.every(h => h.startsWith('/en/')), 'det-cta 站内 9 张带 /en/ 前缀', JSON.stringify(r.cta));
  ok(r.tcExt.length === 2 && r.tcExt.every(h => h.startsWith('http')), '两张外链卡（下载/AI视频）未被误改', JSON.stringify(r.tcExt));
  ok(r.cards.length === 0 || r.cards.every(h => h.startsWith('/en/')), 'site-nav 导航卡（如有）带 /en/ 前缀', JSON.stringify(r.cards));
  ok(/\/favicon\.svg$/.test(r.favicon || ''), 'favicon 未被误改', r.favicon);

  /* ② /zh-TW/merge.html：混合大小写前缀 */
  await go('http://127.0.0.1:' + SRV + '/zh-TW/merge.html');
  console.log('== /zh-TW/merge.html ==');
  r = await ev(`[...document.querySelectorAll('#siteNav a')].map(a => a.getAttribute('href'))`);
  console.log('  胶囊: ' + JSON.stringify(r));
  ok(r.length >= 3 && r.every(h => h && h.startsWith('/zh-TW/')), 'zh-TW 胶囊前缀正确（混合大小写）', JSON.stringify(r));
  r = await ev(`[...document.querySelectorAll('a')].map(a=>a.getAttribute('href')||'').filter(h=>h.startsWith('/'))`);
  ok(r.every(h => h === '/favicon.svg' || h.startsWith('/zh-TW/')), 'zh-TW 页无前缀残留（favicon 除外）', JSON.stringify(r));

  /* ③ 中文版保持无前缀（首页没有 #siteNav 占位，量 .tc 站内卡） */
  await go('http://127.0.0.1:' + SRV + '/');
  console.log('== / 中文首页 ==');
  r = await ev(`[...document.querySelectorAll('a.tc')].map(a => a.getAttribute('href')||'').filter(h => h.startsWith('/'))`);
  console.log('  站内 tc(' + r.length + '): ' + JSON.stringify(r));
  ok(r.length === 9 && r.every(h => /^\/[a-z-]+\.html$/.test(h)), '中文版工具卡保持无前缀', JSON.stringify(r));

  console.log('\n_shot312: ' + P + ' 通过 / ' + F + ' 失败');
  chrome.kill(); srv.kill(); process.exit(F ? 1 : 0);
})().catch(e => { console.log('FATAL: ' + (e && e.message)); process.exit(1); });
