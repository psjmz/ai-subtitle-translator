/* 体检补刀：同一页面在不同界面语言下，具体控件到底显示什么文字 */
'use strict';
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');
const http = require('http');
const { spawn } = require('child_process');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PORT = 9355, BASE = 'http://127.0.0.1:3098';
const wait = ms => new Promise(r => setTimeout(r, ms));
let ws, tid = 0; const pending = new Map();
function send(method, params) {
  const id = ++tid;
  ws.send(JSON.stringify({ id, method, params: params || {} }));
  return new Promise((res, rej) => { pending.set(id, { res, rej }); setTimeout(() => { if (pending.has(id)) { pending.delete(id); rej(new Error('timeout')); } }, 25000); });
}
async function ev(e) {
  const r = await send('Runtime.evaluate', { expression: e, returnByValue: true, awaitPromise: true });
  if (r.exceptionDetails) throw new Error(r.exceptionDetails.text);
  return r.result.value;
}
async function goto(url) {
  await send('Page.navigate', { url: 'about:blank' }); await wait(250);
  await send('Page.navigate', { url });
  for (let i = 0; i < 40; i++) { try { if (await ev('document.readyState') === 'complete') break; } catch (e) { } await wait(400); }
  await wait(2000);
}
(async () => {
  const chrome = spawn(CHROME, ['--headless=new', '--remote-debugging-port=' + PORT, '--no-sandbox', '--disable-gpu',
    '--remote-allow-origins=*', '--window-size=1440,1000', '--no-proxy-server', '--user-data-dir=/tmp/cb-lang-' + Date.now()], { stdio: 'ignore' });
  let list = null;
  for (let i = 0; i < 25 && !list; i++) {
    await wait(1000);
    list = await new Promise(res => { const q = http.get('http://127.0.0.1:' + PORT + '/json/list', r => { let b = ''; r.on('data', d => b += d); r.on('end', () => res(JSON.parse(b))); }); q.on('error', () => res(null)); });
  }
  ws = new WebSocket(list.find(t => t.type === 'page').webSocketDebuggerUrl, { perMessageDeflate: false });
  await new Promise(r => ws.on('open', r));
  ws.on('message', b => { const o = JSON.parse(b.toString()); if (o.id && pending.has(o.id)) { const p = pending.get(o.id); pending.delete(o.id); o.error ? p.rej(new Error(JSON.stringify(o.error))) : p.res(o.result); } });
  await send('Runtime.enable'); await send('Page.enable');

  /* 每个页面抓「一个有代表性的控件」的文字 */
  const TARGET = {
    'translate.html': '[data-i18n="btnGo"], #btnGo',
    'merge.html': '[data-i18n="btnMerge"], #btnMerge',
    'clean.html': '[data-i18n="optTitle"], #optCard h3, .card h3'
  };
  const LANGS = ['zh-CN', 'zh-TW', 'ja', 'es', 'ru', 'en'];
  for (const [file, sel] of Object.entries(TARGET)) {
    console.log('\n【' + file + '】同一下拉切不同语言，主按钮显示：');
    for (const l of LANGS) {
      const path = '/' + (l === 'zh-CN' ? '' : l + '/') + file;
      await goto(BASE + path);
      const txt = await ev(`(function(){
        var e=document.querySelector(${JSON.stringify(sel)});
        var nav=document.querySelector('#siteNav a');
        return (e? e.innerText.trim().slice(0,28):'(没找到)') + '  ‖ 导航:' + (nav?nav.innerText.trim().slice(0,14):'-');
      })()`);
      console.log('   ' + l.padEnd(6) + ' → ' + txt);
    }
  }
  console.log('');
  process.exit(0);
})().catch(e => { console.error('崩了：', e.message); process.exit(1); });
