/* 运行时切换界面语言：演示区文案与数字带是否跟着变（用户真会这么操作） */
'use strict';
const { spawn } = require('child_process');
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');
const http = require('http');

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const DBG = 9445;
const sleep = ms => new Promise(r => setTimeout(r, ms));
const getJson = url => new Promise((res, rej) => {
  http.get(url, r => { let b = ''; r.on('data', d => b += d); r.on('end', () => { try { res(JSON.parse(b)); } catch (e) { rej(e); } }); }).on('error', rej);
});

(async () => {
  const udir = '/tmp/cr-switch-' + Date.now();
  const chrome = spawn(CHROME, ['--headless=new', '--no-sandbox', '--disable-gpu', '--no-first-run',
    '--remote-debugging-port=' + DBG, '--user-data-dir=' + udir, 'about:blank'], { stdio: 'ignore' });
  let list = null;
  for (let i = 0; i < 60 && !list; i++) { await sleep(400); try { list = await getJson('http://127.0.0.1:' + DBG + '/json/list'); } catch (e) { } }
  if (!list) { chrome.kill(); throw new Error('CDP 起不来'); }
  const tab = list.find(t => t.type === 'page') || list[0];
  const ws = new WebSocket(tab.webSocketDebuggerUrl, { perMessageDeflate: false, maxPayload: 64 * 1024 * 1024 });
  let mid = 0; const pend = {};
  ws.on('message', d => { const m = JSON.parse(d); if (m.id && pend[m.id]) { const f = pend[m.id]; delete pend[m.id]; f(m); } });
  await new Promise(r => ws.on('open', r));
  const send = (method, params) => new Promise(r => {
    const id = ++mid;
    const t = setTimeout(() => { delete pend[id]; r({ __t: 1 }); }, 20000);
    pend[id] = m => { clearTimeout(t); r(m); };
    ws.send(JSON.stringify({ id, method, params: params || {} }));
  });
  await send('Runtime.enable'); await send('Page.enable');
  const ev = async expr => {
    const r = await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true });
    return r.result && r.result.result ? r.result.result.value : null;
  };

  await send('Page.navigate', { url: 'https://ai-srtsub.com/' });
  for (let i = 0; i < 100; i++) { await sleep(250); if (await ev('document.readyState') === 'complete') break; }
  await sleep(1500);

  const before = await ev(`JSON.stringify({
    lang: document.documentElement.lang,
    dst: (document.querySelector('[data-i18n=demoGoDst]')||{}).textContent,
    scared: (document.querySelector('[data-i18n=demoScared]')||{}).textContent,
    tok: (document.getElementById('ldTok')||{}).textContent
  })`);
  console.log('切换前：' + before);

  await ev(`(function(){
    var s = document.getElementById('uiLang2');
    s.value = 'de';
    s.dispatchEvent(new Event('change'));
    return 1;
  })()`);
  await sleep(800);

  const after = await ev(`JSON.stringify({
    lang: document.documentElement.lang,
    dst: (document.querySelector('[data-i18n=demoGoDst]')||{}).textContent,
    scared: (document.querySelector('[data-i18n=demoScared]')||{}).textContent,
    tok: (document.getElementById('ldTok')||{}).textContent,
    url: location.pathname
  })`);
  console.log('切到 de：' + after);

  const A = JSON.parse(before), B = JSON.parse(after);
  const ok = B.lang === 'de' &&
    B.dst === 'Wohin gehst du?' &&
    B.scared === 'Ich hatte wirklich Angst.' &&
    /[0-9]/.test(B.tok);
  console.log(ok ? '✓ 切换生效：演示文案与数字带都跟着变了' : '✗ 切换后没跟上');
  if (!ok) console.log('  期望 dst=Wohin gehst du? / scared=Ich hatte wirklich Angst.');

  ws.close(); chrome.kill();
  process.exit(ok ? 0 : 1);
})().catch(e => { console.error('FATAL', e.message); process.exit(2); });
