/* live339.js —— 339 外网实测 https://ai-srtsub.com
 * ⚠️ 不挂代理（阿里云直连，沿用 live338 模板）。
 * 量：版号 / 界面语言 100 项 / 新语言页面 200 / RTL / og:locale 非空 / sitemap 条数 / 无异常。
 */
'use strict';
process.on('unhandledRejection', e => { console.log('UNHANDLED', e && e.message); });
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');
const { spawn } = require('child_process');
const http = require('http');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const BASE = 'https://ai-srtsub.com';
const PORT = 9900 + Math.floor(Math.random() * 80);
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

const NEW = ['ms', 'fa', 'bo', 'yi', 'mi', 'zu', 'sw', 'ur', 'ta'];
const RTL = ['fa', 'ur', 'yi'];

(async () => {
  const chrome = spawn(CHROME, ['--headless=new', '--remote-debugging-port=' + PORT, '--no-sandbox', '--disable-gpu',
    '--lang=zh-CN', '--user-data-dir=/tmp/cr-live339-' + Date.now(), 'about:blank'], { stdio: 'ignore' });
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
  await send('Page.enable'); await send('Runtime.enable'); await send('Log.enable');
  await send('Network.enable');
  await send('Network.setCacheDisabled', { cacheDisabled: true });

  const errs = [];
  const notFound = [];
  ws.on('message', d => {
    const m = JSON.parse(d);
    if (m.method === 'Runtime.exceptionThrown') errs.push('JS 异常: ' + ((m.params || {}).exceptionDetails || {}).text);
    if (m.method === 'Log.entryAdded' && ((((m.params || {}).entry) || {}).level) === 'error') errs.push('console.error: ' + m.params.entry.text);
    /* 单独记 404：console.error 只给一句「Failed to load resource」，看不出是谁 */
    if (m.method === 'Network.responseReceived') {
      const rp = (m.params || {}).response || {};
      if (rp.status === 404) notFound.push(String(rp.url || '').replace(/\?_=\d+/, ''));
    }
  });

  async function go(url) {
    await send('Page.navigate', { url });
    for (let i = 0; i < 60; i++) { const st = await ev('document.readyState'); if (st === 'complete') break; await wait(300); }
    await wait(1800);
  }

  console.log('— ① 首页：版号 + 界面语言 100 项 —');
  await go(BASE + '/?_=' + Date.now());
  let d = await ev(`({ href: location.href, ready: document.readyState,
    ver: (document.querySelector('.ver')||{}).textContent,
    uiLangs: (window.SiteI18N && SiteI18N.UI_LANGS) ? SiteI18N.UI_LANGS.length : -1 })`);
  ok(d.ready === 'complete', 'DIAG：页面加载完成', d.href);
  ok(d.ver === 'v0.9.339', '首页版号已升到 v0.9.339', d.ver);
  ok(d.uiLangs === 100, 'UI_LANGS 100 种（原 27）', d.uiLangs);
  /* ⚠️ #uiLang 这个下拉只在 translate.html / merge.html 上，首页没有，
     早先照抄旧脚本在这儿判会恒 0 —— 改到翻译页上判。 */
  await go(BASE + '/translate.html?_=' + Date.now());
  d = await ev(`({ sel: (document.getElementById('uiLang')||{options:[]}).options.length,
                    dst: (document.getElementById('dstLang')||{options:[]}).options.length })`);
  ok(d.sel === 100, '翻译页界面语言下拉 100 项', d.sel);
  ok(d.dst === 100, '翻译目标语言下拉 100 项', d.dst);

  console.log('— ② 新语言页面能打开 + 本地化真的落地 —');
  for (const l of NEW) {
    await go(BASE + '/' + l + '/?_=' + Date.now());
    /* ⚠️ #btnGo 是翻译页的按钮，首页根本没有 —— 早先照抄旧脚本在这儿判会恒空。
       首页改用 h1 与 title：它们由 applyI18n() 按 UI.lang 现场写入，能真实反映界面语言。 */
    const r = await ev(`({ lang: document.documentElement.lang,
      dir: document.documentElement.dir,
      h1: (document.querySelector('h1')||{innerText:''}).innerText.slice(0, 50),
      uiLang: (window.SiteI18N && SiteI18N.UI) ? SiteI18N.UI.lang : null,
      ogLocale: (document.querySelector('meta[property="og:locale"]')||{content:''}).content,
      altEmpty: document.querySelectorAll('meta[property="og:locale:alternate"][content=""]').length,
      altN: document.querySelectorAll('meta[property="og:locale:alternate"]').length,
      hreflangN: document.querySelectorAll('link[rel="alternate"][hreflang]').length,
      title: document.title })`);
    const isRTL = RTL.indexOf(l) >= 0;
    ok(r.lang === l && (!isRTL ? r.dir === 'ltr' : r.dir === 'rtl'),
      '/' + l + '/ lang=' + l + ' dir=' + (isRTL ? 'rtl' : 'ltr'), JSON.stringify({ lang: r.lang, dir: r.dir }));
    /* 中文访客（浏览器 zh-CN）从搜索结果进 /ms/，界面必须是马来语，不能是中文 */
    ok(r.uiLang === l && !!r.h1 && !/[\u4e00-\u9fff]/.test(r.h1),
      '/' + l + '/ UI.lang=' + l + ' 且正文非中文', JSON.stringify({ ui: r.uiLang, h1: r.h1 }));
    ok(r.ogLocale && r.ogLocale !== 'en_US' && r.ogLocale.indexOf('_') > 0,
      '/' + l + '/ og:locale=' + r.ogLocale + '（不能是 en_US）', r.ogLocale);
    ok(r.altEmpty === 0 && r.altN > 0,
      '/' + l + '/ og:locale:alternate ' + r.altN + ' 条，空 content ' + r.altEmpty + ' 个', String(r.altEmpty));
    ok(r.hreflangN >= 100, '/' + l + '/ hreflang ' + r.hreflangN + ' 条', String(r.hreflangN));
  }

  console.log('— ③ sitemap —');
  await go(BASE + '/sitemap.xml?_=' + Date.now());
  d = await ev(`({ n: document.querySelectorAll('loc').length,
                    a: (document.querySelectorAll('url')[0]||{children:[]}).children.length })`);
  ok(d.n === 2861, 'sitemap 2861 条（1700 工具页 + 1161 指南）', String(d.n));
  ok(d.a >= 100, '首条 URL 的 alternate ≥100', String(d.a));

  console.log('— ④ 老语言没被带崩 —');
  await go(BASE + '/en/?_=' + Date.now());
  d = await ev(`({ lang: document.documentElement.lang,
    uiLang: (window.SiteI18N && SiteI18N.UI) ? SiteI18N.UI.lang : null,
    h1: (document.querySelector('h1')||{innerText:''}).innerText.slice(0, 50),
    ver: (document.querySelector('.ver')||{}).textContent })`);
  ok(d.lang === 'en' && d.uiLang === 'en' && !/[\u4e00-\u9fff]/.test(d.h1 || ''),
    '/en/ 仍是英文界面（浏览器虽是 zh-CN）', JSON.stringify(d));

  ok(errs.length === 0, '全程无 JS 异常 / console.error', errs.slice(0, 3).join(' | '));
  if (notFound.length) console.log('  404 的资源: ' + notFound.slice(0, 6).join(' | '));
  else console.log('  无 404 资源');

  console.log('\n' + P + ' ✓ / ' + F + ' ✗');
  chrome.kill();
  process.exit(F ? 1 : 0);
})().catch(e => { console.error('FATAL', e.message); process.exit(1); });
