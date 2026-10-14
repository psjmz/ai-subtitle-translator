/* v0.9.310 本地真浏览器核验：多语言 SEO 注入之后，页面上到底显示什么
   ⚠️ 静态 curl 只能证明「服务端吐了英文」，证明不了「客户端 JS 跑完之后还是英文」——
      那段 copy 原本带着 data-i18n="seoTitle" 这类属性，而客户端词典里并没有这些键，
      t(k) 缺键时返回键名本身 → applyI18n 会把英文版那几段改成「seoTitle」几个字。
      服务端已经在注入前把属性剥掉了，这里就是验这件事。
   量：/en/ 与 /en/translate.html 的 SEO 文案块（字数、语言、有没有键名残留）、
       h1、title，以及 /th/glossary.html 的 description 是否被双引号截断。
   用法：node _shot310.js（服务与浏览器都在本进程里管，别用后台跑）
*/
'use strict';
process.on('unhandledRejection', e => { console.log('UNHANDLED', e && e.message); });
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');
const { spawn } = require('child_process');
const http = require('http');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const ROOT = __dirname;
const SRV = Number(process.env.SRV || 3310);
const PORT = 9600 + Math.floor(Math.random() * 90);
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
    '--lang=en-US', '--user-data-dir=/tmp/cr310-' + Date.now(), 'about:blank'], { stdio: 'ignore' });
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
  /* ⚠️ 少了这行的话每条 CDP 命令都会等到超时（309 那版也是这么写的） */
  ws.on('message', d => { const m = JSON.parse(d); if (m.id && pending.has(m.id)) { pending.get(m.id).res(m.result || m); pending.delete(m.id); } });

  
const OUT = '/Users/jp/WorkBuddy/2026-09-04-00-29-54/outputs';
async function snap(name) {
  await send('Emulation.setDeviceMetricsOverride', { width: 1280, height: 900, deviceScaleFactor: 1, mobile: false });
  await wait(600);
  await ev('window.scrollTo(0, document.body.scrollHeight)');
  await wait(600);
  const r = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
  require('fs').writeFileSync(OUT + '/' + name + '.png', Buffer.from(r.data, 'base64'));
  console.log('  已存图 ' + name + '.png');
}


async function snap(name) {
  await send('Emulation.setDeviceMetricsOverride', { width: 1280, height: 900, deviceScaleFactor: 1, mobile: false });
  await wait(600);
  await ev('window.scrollTo(0, document.body.scrollHeight)');
  await wait(600);
  const r = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
  require('fs').writeFileSync(OUT + '/' + name + '.png', Buffer.from(r.data, 'base64'));
  console.log('  已存图 ' + name + '.png');
}

async function open(url) {
    await send('Page.enable'); await send('Runtime.enable');
    await send('Page.navigate', { url: 'about:blank' });
    await wait(300);
    await send('Page.navigate', { url });
    for (let i = 0; i < 40; i++) {
      const st = await ev('document.readyState');
      if (st === 'complete') break;
      await wait(300);
    }
    await wait(3000);   /* 客户端 i18n 在 DOMContentLoaded 之后跑，等它跑完再量 */
  }

  /* ---------- /en/ 首页 ---------- */
  console.log('\n===== /en/ 首页 =====');
  await open('http://127.0.0.1:' + SRV + '/en/');
  let d = await ev(`JSON.stringify({
    href: location.href,
    lang: document.documentElement.lang,
    title: document.title,
    h1: (document.querySelector('h1') || {}).textContent || '',
    copy: (function(){ var m = document.body.innerHTML.match(/<!--SEO-COPY-START__-->[\\s\\S]*?<!--SEO-COPY-END__-->/); return null; })(),
    seoSec: (function(){ var s = document.querySelector('section.seo'); if (!s) return null; return { txt: s.innerText.trim(), attrs: s.querySelectorAll('[data-i18n]').length }; })(),
    keyLeak: (document.body.innerText.match(/seoTitle|seoIntro|seoFeatures|seoWho|seoNoscript/g) || []).length,
    bodyHan: (document.body.innerText.match(/[\\u4e00-\\u9fff]/g) || []).length
  })`);
  d = JSON.parse(d);
  console.log('  href=' + d.href + '  lang=' + d.lang);
  console.log('  title=' + d.title);
  ok(d.lang === 'en', 'html lang=en');
  ok(!!d.seoSec, '页面上有 section.seo（SEO 静态文案块）');
  ok(d.seoSec && d.seoSec.txt.length > 300, '文案块有内容（' + (d.seoSec ? d.seoSec.txt.length : 0) + ' 字）', d.seoSec && d.seoSec.txt.slice(0, 90).replace(/\n/g, ' '));
  ok(d.seoSec && d.seoSec.attrs === 0, '文案块里没有 data-i18n 残留（有就会被客户端改成键名）', d.seoSec && d.seoSec.attrs);
  ok(d.keyLeak === 0, '正文里没有 seoTitle / seoIntro 这类键名', d.keyLeak);
  await snap('310-en-index-seo');

  /* ---------- /en/translate.html ---------- */
  console.log('\n===== /en/translate.html 工作台 =====');
  await open('http://127.0.0.1:' + SRV + '/en/translate.html');
  d = await ev(`JSON.stringify({
    href: location.href,
    lang: document.documentElement.lang,
    title: document.title,
    seoSec: (function(){ var s = document.querySelector('section.seo'); if (!s) return null; return { txt: s.innerText.trim(), attrs: s.querySelectorAll('[data-i18n]').length }; })(),
    keyLeak: (document.body.innerText.match(/seoTitle|seoIntro|seoFeatures|seoWho|seoNoscript/g) || []).length
  })`);
  d = JSON.parse(d);
  console.log('  href=' + d.href + '  title=' + d.title);
  ok(!!d.seoSec, '工作台也有 section.seo');
  ok(d.seoSec && d.seoSec.txt.length > 300, '文案块有内容（' + (d.seoSec ? d.seoSec.txt.length : 0) + ' 字）', d.seoSec && d.seoSec.txt.slice(0, 90).replace(/\n/g, ' '));
  ok(d.seoSec && d.seoSec.attrs === 0, '文案块里没有 data-i18n 残留', d.seoSec && d.seoSec.attrs);
  ok(d.keyLeak === 0, '正文里没有键名泄漏', d.keyLeak);
  await snap('310-en-translate-seo');

  /* ---------- /th/glossary.html：description 是否被双引号截断 ---------- */
  console.log('\n===== /th/glossary.html（desc 带英文双引号）=====');
  await open('http://127.0.0.1:' + SRV + '/th/glossary.html');
  d = await ev(`JSON.stringify({
    desc: (document.querySelector('meta[name=description]') || {}).content || '',
    ogd: (document.querySelector('meta[property="og:description"]') || {}).content || ''
  })`);
  d = JSON.parse(d);
  ok(d.desc.length > 150, '浏览器读到的 description 是完整的（' + d.desc.length + ' 字）', d.desc.slice(0, 70));
  ok(d.desc.indexOf('"คำเดิม') >= 0, '里面那对引号还在（举例用，不该被吃掉）');
  ok(d.ogd.length > 150, 'og:description 也完整（' + d.ogd.length + ' 字）');

  console.log('\n_shot310：' + P + ' 通过 / ' + F + ' 失败');
  ws.close(); chrome.kill(); srv.kill(); process.exit(F ? 1 : 0);
})().catch(e => { console.log('FATAL', e && e.message); try { ws && ws.close(); } catch (x) { } process.exit(2); });
