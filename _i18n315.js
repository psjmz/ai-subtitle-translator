/* _i18n315.js —— v0.9.315 多语言联动体检（本地，非交付件）
   ① 界面语言三优先级：URL 前缀 > 上次手动选 > 浏览器检测（translate / merge 两页）
   ② 服务端链接联动：/en/ 的静态 href 补语言前缀、favicon / 绝对 URL 不碰、?from= 保留
   ③ site-nav 客户端胶囊按 URL 前缀补
   ④ sitemap / robots（外网核验另跑） */
'use strict';
process.on('unhandledRejection', e => { console.log('UNHANDLED', e && e.message); });
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');
const { spawn } = require('child_process');
const http = require('http');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const ROOT = __dirname;
const SRV = Number(process.env.SRV || 3415);
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
const ok = (c, n, x) => { console.log((c ? '  ✓ ' : '  ✗ ') + n + (x !== undefined ? '  [' + String(x).slice(0, 130) + ']' : '')); c ? P++ : F++; };
const get = p => new Promise((res, rej) => { const q = http.get({ host: '127.0.0.1', port: SRV, path: p }, s => { let d = ''; s.on('data', c => d += c); s.on('end', () => res(d)); }); q.on('error', rej); });

(async () => {
  const srv = spawn(process.execPath, ['server.js'], { cwd: ROOT, env: Object.assign({}, process.env, { PORT: String(SRV), PUBLIC_URL: 'http://127.0.0.1:' + SRV }), stdio: 'ignore' });
  await wait(1500);
  const chrome = spawn(CHROME, ['--headless=new', '--remote-debugging-port=' + PORT, '--no-sandbox', '--disable-gpu',
    '--host-resolver-rules=MAP * ~NOTFOUND, EXCLUDE 127.0.0.1',
    '--lang=en-US', '--user-data-dir=/tmp/cr-i18n315-' + Date.now(), 'about:blank'], { stdio: 'ignore' });
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
  await send('Page.enable'); await send('Runtime.enable'); await send('Network.setCacheDisabled', { cacheDisabled: true });
  /* 语言三件套：--lang=en-US 已给；再叠 locale + navigator.language 覆盖 */
  await send('Emulation.setLocaleOverride', { locale: 'en-US' });
  await send('Page.addScriptToEvaluateOnNewDocument', { source: 'Object.defineProperty(navigator, "language", { get: function(){ return "en-US"; } }); Object.defineProperty(navigator, "languages", { get: function(){ return ["en-US", "en"]; } });' });

  async function go(url) {
    await send('Page.navigate', { url });
    for (let i = 0; i < 50; i++) { const st = await ev('document.readyState'); if (st === 'complete') break; await wait(300); }
    await wait(900);
  }

  console.log('— ① 界面语言三优先级（浏览器语言 = en-US）—');
  /* A. 无前缀 → 浏览器检测 en */
  await go('http://127.0.0.1:' + SRV + '/translate.html');
  let d = await ev(`({ lang: (document.querySelector('select#uiLang')||{value:''}).value, doc: document.documentElement.lang, href: location.pathname })`);
  ok(d.lang === 'en', 'translate 无前缀 → 浏览器检测 en', JSON.stringify(d));
  /* B. URL 前缀优先于浏览器语言（zh-TW 前缀 + en 浏览器） */
  await go('http://127.0.0.1:' + SRV + '/zh-TW/translate.html');
  d = await ev(`({ lang: (document.querySelector('select#uiLang')||{value:''}).value, doc: document.documentElement.lang })`);
  ok(d.lang === 'zh-TW' && d.doc === 'zh-TW', 'translate /zh-TW/ 前缀压过浏览器语言', JSON.stringify(d));
  /* C. 手动记忆优先于浏览器检测（无前缀 + 记忆 ja） */
  await go('http://127.0.0.1:' + SRV + '/translate.html');
  await ev(`(function(){ var sv = JSON.parse(localStorage.getItem('srtTool')||'{}'); sv.langManual = true; sv.uiLang = 'ja'; localStorage.setItem('srtTool', JSON.stringify(sv)); })()`);
  await go('http://127.0.0.1:' + SRV + '/translate.html');
  d = await ev(`({ lang: (document.querySelector('select#uiLang')||{value:''}).value })`);
  ok(d.lang === 'ja', 'translate 手动记忆 ja 压过浏览器 en', JSON.stringify(d));
  await ev(`localStorage.clear()`);
  /* D. URL 前缀也压过手动记忆 */
  await go('http://127.0.0.1:' + SRV + '/translate.html');
  await ev(`(function(){ var sv = JSON.parse(localStorage.getItem('srtTool')||'{}'); sv.langManual = true; sv.uiLang = 'ko'; localStorage.setItem('srtTool', JSON.stringify(sv)); })()`);
  await go('http://127.0.0.1:' + SRV + '/en/translate.html');
  d = await ev(`({ lang: (document.querySelector('select#uiLang')||{value:''}).value })`);
  ok(d.lang === 'en', 'translate /en/ 前缀压过手动记忆 ko', JSON.stringify(d));
  await ev(`localStorage.clear()`);
  /* E. merge 页（自带 27 语词典，不引 site-i18n） */
  await go('http://127.0.0.1:' + SRV + '/merge.html');
  d = await ev(`({ lang: (document.querySelector('select#uiLang')||{value:''}).value, nav: (document.querySelector('select#uiLang')||{value:''}).value })`);
  ok(d.lang === 'en', 'merge 无前缀 → 浏览器检测 en', JSON.stringify(d));
  await go('http://127.0.0.1:' + SRV + '/ja/merge.html');
  d = await ev(`({ lang: (document.querySelector('select#uiLang')||{value:''}).value, doc: document.documentElement.lang, h1: (document.querySelector('h1')||{textContent:''}).textContent.slice(0,20) })`);
  ok(d.lang === 'ja' && d.doc === 'ja', 'merge /ja/ 前缀生效', JSON.stringify(d));

  console.log('— ② 服务端链接联动（/en/ 静态 href 补前缀）—');
  const enHome = await get('/en/');
  ok(/href="\/en\/translate\.html"/.test(enHome), '/en/ 首页：翻译卡 → /en/translate.html');
  ok(/href="\/en\/clean\.html"/.test(enHome) && /href="\/en\/merge\.html"/.test(enHome), '/en/ 首页：clean/merge 卡也带前缀');
  ok(/href="\/favicon\.svg"/.test(enHome) || /href="\/apple-touch-icon/.test(enHome), '/en/ 首页：favicon 不被补前缀');
  ok(!/href="\/en\/https?:/.test(enHome), '/en/ 首页：绝对 URL 没被误补');
  const zhHome = await get('/');
  ok(/href="\/translate\.html"/.test(zhHome) && !/href="\/zh-CN\/translate\.html"/.test(zhHome), 'zh-CN 首页保持无前缀');
  const enWithFrom = await get('/en/translate.html');
  /* translate 页里引导卡带 ?from=translate（源码静态，服务端补前缀后查询串要保留） */
  ok(/\/en\/merge\.html\?from=translate/.test(enWithFrom) || !/merge\.html\?from=translate/.test(enWithFrom) === false, '/en/translate 引导卡 ?from= 保留', null);
  const deTr = await get('/de/translate.html');
  ok(/href="\/de\/merge\.html\?from=translate"/.test(deTr) || /\/de\/merge\.html\?from=translate/.test(deTr), '/de/translate 引导卡带 /de/ 前缀 + ?from= 保留');

  console.log('— ③ site-nav 客户端胶囊按 URL 前缀补 —');
  await go('http://127.0.0.1:' + SRV + '/en/clean.html');
  await wait(1200);
  const nav = await ev(`(function(){
    var links = Array.prototype.slice.call(document.querySelectorAll('a')).map(function(a){ return a.getAttribute('href')||''; }).filter(function(h){ return /\\.(html)?/.test(h) && h.indexOf('clean')<0; });
    return { sample: links.slice(0,8), bad: links.filter(function(h){ return /^\\/(translate|merge|convert|bilingual|shift|repair|extract|glossary|videosub|hanconv)\\.html/.test(h); }) };
  })()`);
  ok(nav.bad.length === 0, '/en/clean 胶囊链接无裸前缀漏网', JSON.stringify(nav.bad.slice(0,3)));

  console.log('— ④ lang 属性 & ar/he RTL —');
  const arHome = await get('/ar/');
  ok(/<html lang="ar"/.test(arHome) && /dir="rtl"/.test(arHome), '/ar/ lang + dir=rtl');
  const heTr = await get('/he/translate.html');
  ok(/<html lang="he"/.test(heTr) && /dir="rtl"/.test(heTr), '/he/translate lang + dir=rtl');

  console.log('----');
  console.log('_i18n315: ' + P + ' 通过 / ' + F + ' 失败');
  srv.kill(); chrome.kill();
  process.exit(F ? 1 : 0);
})().catch(e => { console.log('FATAL', e && e.stack); process.exit(3); });
