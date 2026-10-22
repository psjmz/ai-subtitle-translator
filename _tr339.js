/* _tr339.js —— 界面语言分片链路验收（本地真 server + 真浏览器）
 *
 * 用法：
 *   node _tr339.js                 # 默认验 ms
 *   LANG_TEST=fa node _tr339.js    # 验任意已有分片的语言
 *
 * 验四件事：
 *   1 浏览器语言为 xx 时，页面真的去加载 /i18n/ui-xx.js（且 200）
 *   2 界面文案真的变成该语言（与英文、中文都不同）
 *   3 缺键回落英文（不是中文）
 *   4 老的 27 语（en）一个分片请求都不发；RTL 语言 dir=rtl
 */
'use strict';
const { spawn } = require('child_process');
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');

const PORT = Number(process.env.PORT || 3405);
const DEBUG = Number(process.env.DEBUG_PORT || 9795);
const LANG = process.env.LANG_TEST || 'ms';
const RTL = ['ar', 'fa', 'he', 'ur', 'ps', 'ku', 'ug', 'sd', 'yi'];
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const NODE = process.execPath;
const sleep = ms => new Promise(r => setTimeout(r, ms));

(async () => {
  const srv = spawn(NODE, ['server.js'], {
    cwd: __dirname,
    env: Object.assign({}, process.env, { PORT: String(PORT), PUBLIC_URL: 'http://127.0.0.1:' + PORT }),
    stdio: 'ignore'
  });
  const clean = () => { try { srv.kill(); } catch (e) {} };
  process.on('exit', clean);

  let up = false;
  for (let i = 0; i < 40; i++) {
    await sleep(400);
    try { const r = await fetch('http://127.0.0.1:' + PORT + '/translate.html'); if (r.ok) { up = true; break; } } catch (e) {}
  }
  if (!up) { clean(); throw new Error('本地 server 起不来'); }

  const chrome = spawn(CHROME, ['--headless=new', '--no-sandbox', '--disable-gpu', '--no-first-run',
    '--disable-extensions', '--window-size=1440,1200', '--remote-debugging-port=' + DEBUG,
    '--user-data-dir=/tmp/cr-tr339-' + Date.now(), 'about:blank'], { stdio: 'ignore' });

  let list = null;
  for (let i = 0; i < 40; i++) {
    await sleep(500);
    try { const r = await fetch('http://127.0.0.1:' + DEBUG + '/json/list'); list = await r.json(); if (list && list.length) break; } catch (e) {}
  }
  if (!list) { chrome.kill(); clean(); throw new Error('CDP 起不来'); }
  /* ⚠️ list[0] 可能是扩展后台页（chrome-extension://），拿它量什么都是 undefined */
  const target = list.find(x => x.type === 'page' && (x.url === 'about:blank' || /^https?:/.test(x.url)));
  if (!target) { chrome.kill(); clean(); throw new Error('找不到页面 target：' + list.map(x => x.type + ':' + x.url).join(', ')); }

  const ws = new WebSocket(target.webSocketDebuggerUrl, { perMessageDeflate: false });
  await new Promise((res, rej) => { ws.on('open', res); ws.on('error', rej); });
  let seq = 0; const pend = new Map(); const reqs = []; const errs = []; const status = {};
  ws.on('message', d => {
    let m; try { m = JSON.parse(d.toString()); } catch (e) { return; }
    if (m.id && pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); }
    if (m.method === 'Network.requestWillBeSent') reqs.push(m.params.request.url);
    if (m.method === 'Network.responseReceived') status[m.params.response.url] = m.params.response.status;
    if (m.method === 'Runtime.exceptionThrown') errs.push(((m.params || {}).exceptionDetails || {}).text);
    if (m.method === 'Log.entryAdded' && ((((m.params || {}).entry || {}).level)) === 'error') errs.push('console.error: ' + m.params.entry.text);
  });
  const send = (method, params) => new Promise(res => { const id = ++seq; pend.set(id, res); ws.send(JSON.stringify({ id, method, params: params || {} })); });
  const ev = async expr => { const r = await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true }); return r.result && r.result.result ? r.result.result.value : null; };

  await send('Page.enable');      /* ⚠️ 不 enable Page，addScriptToEvaluateOnNewDocument 静默不生效 */
  await send('Network.enable');
  await send('Runtime.enable');
  await send('Log.enable');
  await send('Network.setCacheDisabled', { cacheDisabled: true });

  let pass = 0, fail = 0;
  const t = (n, ok, x) => { if (ok) { pass++; console.log('  ✓ ' + n); } else { fail++; console.log('  ✗ ' + n + (x ? '  → ' + x : '')); } };
  const isFrag = u => /\/i18n\/ui-[a-z]{2,3}(-[A-Za-z]{2,4})?\.js(\?|$)/.test(u);
  const navSrc = (tags) => "Object.defineProperty(navigator,'languages',{configurable:true,get:function(){return " + JSON.stringify(tags) + ";}});"
    + "Object.defineProperty(navigator,'language',{configurable:true,get:function(){return " + JSON.stringify(tags[0]) + ";}});";

  const waitReady = async () => {
    for (let i = 0; i < 60; i++) {
      await sleep(400);
      const n = await ev('(document.getElementById("dstLang")||{options:[]}).options.length');
      if (n > 0) return true;
    }
    return false;
  };

  /* —— 场景 A：浏览器语言 = LANG —— */
  const injectA = await send('Page.addScriptToEvaluateOnNewDocument', { source: navSrc([LANG, LANG]) });
  reqs.length = 0;
  await send('Page.navigate', { url: 'http://127.0.0.1:' + PORT + '/translate.html' });
  await waitReady();
  await sleep(800);

  const frag = reqs.filter(isFrag);
  const fragUrl = frag.find(u => u.indexOf('ui-' + LANG + '.js') >= 0);
  t('页面请求了 ui-' + LANG + '.js 分片', !!fragUrl, frag.join(' | '));
  t('分片返回 200', fragUrl ? status[fragUrl] === 200 : false, fragUrl ? String(status[fragUrl]) : '未请求');
  t('只请求了这一个分片（没有把全部语言都拉下来）', frag.length === 1, frag.join(' | '));

  let d = await ev(`({ lang: (window.SiteI18N||{}).UI ? SiteI18N.UI.lang : null,
                       dir: document.documentElement.dir,
                       btnGo: (document.querySelector('#btnGo')||{}).textContent,
                       en: (SiteI18N.I18N['en']||{}).btnGo })`);
  t('UI.lang 被识别为 ' + LANG, d.lang === LANG, JSON.stringify(d));
  t('按钮文案已是该语言（不是英文、不是中文）',
    !!d.btnGo && d.btnGo !== d.en && !/[\u4e00-\u9fff]/.test(d.btnGo), d.btnGo);
  if (RTL.indexOf(LANG) >= 0) t('RTL 语言 dir=rtl', d.dir === 'rtl', String(d.dir));
  else t('LTR 语言 dir=ltr', d.dir === 'ltr', String(d.dir));

  /* 缺键回落英文（取一个分片里没写的长文案） */
  d = await ev(`(function(){try{return t('errTimeout')}catch(e){return 'ERR:'+e.message}})()`);
  t('缺键回落英文而不是中文', /No response after/.test(String(d)) && !/[\u4e00-\u9fff]/.test(String(d)), String(d).slice(0, 60));

  /* —— 场景 B：老语言 en 不该发任何分片请求 —— */
  await send('Page.removeScriptToEvaluateOnNewDocument', { identifier: injectA.result.identifier });
  await send('Page.addScriptToEvaluateOnNewDocument', { source: navSrc(['en-US', 'en']) });
  reqs.length = 0;
  await send('Page.navigate', { url: 'http://127.0.0.1:' + PORT + '/translate.html' });
  await waitReady();
  await sleep(600);
  const fragEn = reqs.filter(isFrag);
  t('英文页面一个分片请求都不发（老 27 语零开销）', fragEn.length === 0, fragEn.join(' | '));
  d = await ev(`({ lang: SiteI18N.UI.lang, btnGo: (document.querySelector('#btnGo')||{}).textContent })`);
  t('英文界面仍是英文', d && d.lang === 'en' && /Start translation/.test(d.btnGo || ''), JSON.stringify(d));

  t('全程无 JS 异常 / console.error', errs.length === 0, errs.slice(0, 3).join(' | '));

  /* —— 场景 C：页内手动切换（不刷新）—— 必须按需补分片 + 地址栏不许写成 404 的 /xx/ —— */
  reqs.length = 0;
  await ev(`(function(){var s=document.getElementById('uiLang'); s.value=${JSON.stringify(LANG)}; s.dispatchEvent(new Event('change')); return 1;})()`);
  await sleep(1500);
  const fragC = reqs.filter(isFrag);
  d = await ev(`({ lang: SiteI18N.UI.lang, dir: document.documentElement.dir, path: location.pathname,
                  btnGo: (document.querySelector('#btnGo')||{}).textContent })`);
  t('页内切换会按需补该语言分片', fragC.some(u => u.indexOf('ui-' + LANG + '.js') >= 0), fragC.join(' | '));
  t('页内切换后界面真的变了', d && d.btnGo && !/[\u4e00-\u9fff]/.test(d.btnGo) && !/Start translation/.test(d.btnGo), JSON.stringify(d));
  t('页内切换后地址栏不带该语言段（还没页面，别写成 404）', d && d.path === '/translate.html', d && d.path);
  if (RTL.indexOf(LANG) >= 0) t('页内切到 RTL 语言后 dir 也跟着变', d.dir === 'rtl', String(d.dir));

  console.log('\n[' + LANG + '] ' + pass + ' ✓ / ' + fail + ' ✗');
  chrome.kill(); clean();
  process.exit(fail ? 1 : 0);
})();
