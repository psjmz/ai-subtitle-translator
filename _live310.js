/* v0.9.310 外网真浏览器：多语言 SEO 四类缺陷在线上到底修好了没有
   由 _live309.js 派生，三处必改：
     ① Chrome 不设代理（ai-srtsub 在国内直连可达；挂代理反而整页 chrome-error）
     ② URL 换 https://ai-srtsub.com，加载用轮询 readyState + 再等 3s
     ③ 语言三件套（--lang / setLocaleOverride / navigator.language）
   ⚠️ 本探针**只读**：不开跑翻译、不登录后台、不往服务端写任何东西（不产生任何账本记录）。
   ⚠️ 先打 DIAG 五项（href/ready/core/dollar/lang）再往下量 —— 不对就是加载问题，别量了。 */
'use strict';
process.on('unhandledRejection', () => { });
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');
const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PORT = 9790 + Math.floor(Math.random() * 60);
const BASE = 'https://ai-srtsub.com';
const OUT = '/Users/jp/WorkBuddy/2026-09-04-00-29-54/outputs';
const wait = ms => new Promise(r => setTimeout(r, ms));
let ws, tid = 0; const pending = new Map();
function send(m, p) { const id = ++tid; ws.send(JSON.stringify({ id, method: m, params: p || {} })); return new Promise((res, rej) => { pending.set(id, { res, rej }); setTimeout(() => { if (pending.has(id)) { pending.delete(id); rej(new Error('timeout ' + m)); } }, 40000); }); }
async function ev(e) { const r = await send('Runtime.evaluate', { expression: e, returnByValue: true, awaitPromise: true }); if (r.exceptionDetails) return '__ERR__' + r.exceptionDetails.text; return r.result.value; }
let P = 0, F = 0;
const ok = (c, n, x) => { console.log((c ? '  ✓ ' : '  ✗ ') + n + (x !== undefined ? '  [' + String(x).slice(0, 170) + ']' : '')); c ? P++ : F++; };

(async () => {
  const cr = spawn(CHROME, ['--headless=new', '--remote-debugging-port=' + PORT, '--no-sandbox', '--disable-gpu',
    '--lang=en-US',
    '--user-data-dir=/tmp/cr-live310-' + Date.now(), 'about:blank'], { stdio: 'ignore' });
  let list = null;
  for (let i = 0; i < 30; i++) {
    try { list = await new Promise((res, rej) => { http.get({ host: '127.0.0.1', port: PORT, path: '/json/list' }, r => { let d = ''; r.on('data', c => d += c); r.on('end', () => res(d)); }).on('error', rej); }); if (list.includes('webSocketDebuggerUrl')) break; } catch (e) { }
    await wait(300);
  }
  ws = new WebSocket(JSON.parse(list).find(t => t.type === 'page').webSocketDebuggerUrl, { perMessageDeflate: false });
  await new Promise((res, rej) => { ws.on('open', res); ws.on('error', rej); });
  ws.on('message', d => { const m = JSON.parse(d); if (m.id && pending.has(m.id)) { pending.get(m.id).res(m.result || m); pending.delete(m.id); } });
  await send('Page.enable'); await send('Runtime.enable'); await send('Network.enable');
  await send('Network.setCacheDisabled', { cacheDisabled: true });
  await send('Emulation.setDeviceMetricsOverride', { width: 1280, height: 1000, deviceScaleFactor: 1, mobile: false });
  await send('Emulation.setLocaleOverride', { locale: 'en-US' });
  await send('Page.addScriptToEvaluateOnNewDocument', {
    source: "try{Object.defineProperty(navigator,'language',{get:function(){return 'en-US'}});Object.defineProperty(navigator,'languages',{get:function(){return ['en-US','en']}});}catch(e){}"
  });

  async function go(url) {
    await send('Page.navigate', { url });
    for (let i = 0; i < 60; i++) {
      const st = await ev('document.readyState');
      if (st === 'complete') break;
      await wait(400);
    }
    await wait(3000);
  }

  /* ---------- /en/ 首页 ---------- */
  await go(BASE + '/en/');
  const diag = JSON.parse(await ev(`JSON.stringify({href:location.href, ready:document.readyState, lang:document.documentElement.lang})`));
  console.log('\n— DIAG —');
  console.log('  ' + JSON.stringify(diag));
  ok(diag.href.indexOf('ai-srtsub.com/en/') > 0, '页面确实在线上 /en/', diag.href);
  ok(diag.ready === 'complete', 'readyState=complete', diag.ready);

  console.log('\n— /en/ 首页：静态文案块（本地化正文）—');
  let M = JSON.parse(await ev(`JSON.stringify((function(){
    var s = document.querySelector('section.seo');
    var t = s ? s.innerText.trim() : '';
    return {
      hasSec: !!s,
      n: t.length,
      head: t.slice(0, 70),
      attrs: s ? s.querySelectorAll('[data-i18n]').length : -1,
      han: (t.match(/[\\u4e00-\\u9fff]/g) || []).length,
      leak: (document.body.innerText.match(/seoTitle|seoIntro|seoFeatures|seoWho|seoNoscript/g) || []).length,
      xd: (function(){var l=document.querySelector('link[rel=alternate][hreflang=x-default]');return l?l.href:'';})(),
      ver: ((document.querySelector('.ver')||document.querySelector('.ver-tag')||{}).textContent||'').trim()
    };})())`));
  console.log('    ' + JSON.stringify(M));
  ok(M.hasSec === true, '线上有 section.seo');
  ok(M.n > 600, '文案块字数 ' + M.n + '（改造前线上是 0 字）', M.head);
  ok(M.han === 0, '整段一个汉字都没有（爬虫读到的是英文）', M.han);
  ok(M.attrs === 0, '没有 data-i18n 残留', M.attrs);
  ok(M.leak === 0, '页面正文里没有键名泄漏（没变成 seoTitle）', M.leak);
  ok(M.xd === BASE + '/en/', 'x-default 指向 /en/', M.xd);
  ok(M.ver === 'v0.9.310', '线上版号 310', M.ver);

  const r1 = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
  fs.writeFileSync(OUT + '/live310-en-index-seo.png', Buffer.from(r1.data, 'base64'));
  console.log('    → live310-en-index-seo.png（滚到底拍整视口）');

  /* ---------- /th/glossary.html：desc 带英文双引号 ---------- */
  await go(BASE + '/th/glossary.html');
  M = JSON.parse(await ev(`JSON.stringify({
    desc: (document.querySelector('meta[name=description]')||{}).content || '',
    ogd: (document.querySelector('meta[property="og:description"]')||{}).content || '',
    title: document.title
  })`));
  console.log('\n— /th/glossary.html（desc 里有英文双引号）—');
  ok(M.desc.length > 150, '浏览器读到的 description 完整（' + M.desc.length + ' 字，改造前被引号截成 38）', M.desc.slice(0, 60));
  ok(M.desc.indexOf('"คำเดิม') >= 0, '举例那对引号还在');
  ok(M.ogd.length > 150, 'og:description 也完整（' + M.ogd.length + ' 字）');

  /* ---------- sitemap + robots ---------- */
  const sm = await ev(`(async()=>{var r=await fetch('/sitemap.xml',{cache:'no-store'});return await r.text();})()`);
  const nUrl = (sm.match(/<url>/g) || []).length;
  const nXd = (sm.match(/hreflang="x-default" href="/g) || []).length;
  /* ⚠️ 除首页外 x-default 是 /en/merge.html 这种形态，别只数以 /en/ 结尾的 */
  const xdEn = (sm.match(/hreflang="x-default" href="https:\/\/ai-srtsub\.com\/en\//g) || []).length;
  console.log('\n— sitemap.xml —');
  ok(nUrl === 270, 'sitemap 270 条', nUrl);
  ok(nXd === 270 && xdEn === 270, '每条 x-default 都指向 /en/（' + xdEn + '/' + nXd + '）');

  console.log('\n_live310: ' + P + ' 通过 / ' + F + ' 失败');
  ws.close(); cr.kill();
  process.exit(F ? 1 : 0);
})().catch(e => { console.log('FATAL', e.message); process.exit(2); });
