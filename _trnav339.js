/* _trnav339.js —— 顶栏 100 语真浏览器验收（本地真 server + headless Chrome）
 *
 * 由 _tr339.js 复制另写（老脚本零改动）。差别：验的是顶栏而不是界面词典。
 *
 * 验四件事：
 *   1 URL 语言优先：浏览器语言锁成 zh-CN，访问 /xx/ 必须去加载 /i18n/tnav-xx.js（且 200）
 *   2 顶栏文案真的是该语言（不是英文、也不是中文）
 *   3 内置 27 语一个 tnav 请求都不发（零额外开销）
 *   4 页内切换语言：按需补分片 + 顶栏跟着重绘
 *
 * 用法：
 *   node _trnav339.js            # 默认 ms / fa / en / yue
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');

const PORT = Number(process.env.PORT || 3408);
const DEBUG = Number(process.env.DEBUG_PORT || 9798);
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const NODE = process.execPath;
const sleep = ms => new Promise(r => setTimeout(r, ms));

/* 期望值从分片文件里读，保证测的是「实际下发的内容」而不是我猜的词 */
function shard(lang) {
  const f = path.join(__dirname, 'i18n', 'tnav-' + lang + '.js');
  if (!fs.existsSync(f)) return null;
  const bag = {};
  const ctx = { window: { __TNAV__: bag } }; ctx.globalThis = ctx; require('vm').createContext(ctx);
  require('vm').runInContext(fs.readFileSync(f, 'utf8'), ctx);
  return bag[lang] || null;
}
const EN_SRC = JSON.parse(fs.readFileSync(path.join(__dirname, '_navsrc.json'), 'utf8')).en;

const CASES = process.env.CASES ? process.env.CASES.split(' ') : ['ms', 'fa', 'bo', 'en'];

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
    try { const r = await fetch('http://127.0.0.1:' + PORT + '/index.html'); if (r.ok) { up = true; break; } } catch (e) {}
  }
  if (!up) { clean(); throw new Error('本地 server 起不来'); }

  const chrome = spawn(CHROME, ['--headless=new', '--no-sandbox', '--disable-gpu', '--no-first-run',
    '--disable-extensions', '--window-size=1440,1200', '--remote-debugging-port=' + DEBUG,
    '--user-data-dir=/tmp/cr-tnav-' + Date.now(), 'about:blank'], { stdio: 'ignore' });

  let list = null;
  for (let i = 0; i < 40; i++) {
    await sleep(500);
    try { const r = await fetch('http://127.0.0.1:' + DEBUG + '/json/list'); list = await r.json(); if (list && list.length) break; } catch (e) {}
  }
  if (!list) { chrome.kill(); clean(); throw new Error('CDP 起不来'); }
  const target = list.find(x => x.type === 'page' && (x.url === 'about:blank' || /^https?:/.test(x.url)));
  if (!target) { chrome.kill(); clean(); throw new Error('找不到页面 target'); }

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

  await send('Page.enable');
  await send('Network.enable');
  await send('Runtime.enable');
  await send('Log.enable');
  await send('Network.setCacheDisabled', { cacheDisabled: true });

  let pass = 0, fail = 0;
  const t = (n, ok, x) => { if (ok) { pass++; console.log('  ✓ ' + n); } else { fail++; console.log('  ✗ ' + n + (x ? '  → ' + x : '')); } };
  const isTnav = u => /\/i18n\/tnav-[a-z]{2,3}(-[A-Za-z]{2,4})?\.js(\?|$)/.test(u);
  const navSrc = (tags) => "Object.defineProperty(navigator,'languages',{configurable:true,get:function(){return " + JSON.stringify(tags) + ";}});"
    + "Object.defineProperty(navigator,'language',{configurable:true,get:function(){return " + JSON.stringify(tags[0]) + ";}});";

  /* 浏览器语言一律锁成 zh-CN —— 339 的教训：不锁的话 URL 语言是对的还是浏览器语言
     在对根本看不出来，中文访客进 /xx/ 却看到中文界面的 bug 就是这么漏掉的。 */
  const zh = await send('Page.addScriptToEvaluateOnNewDocument', { source: navSrc(['zh-CN', 'zh']) });

  const waitNav = async () => {
    for (let i = 0; i < 60; i++) {
      await sleep(300);
      const n = await ev('(document.getElementById("topNav")||{children:[]}).children.length');
      if (n > 0) return true;
    }
    return false;
  };

  for (const LANG of CASES) {
    console.log('\n===== /' + LANG + '/index.html（浏览器语言锁 zh-CN）=====');
    const sh = shard(LANG);
    reqs.length = 0; errs.length = 0;
    await send('Page.navigate', { url: 'http://127.0.0.1:' + PORT + '/' + LANG + '/index.html' });
    await sleep(400); await waitNav(); await sleep(700);

    const seen = reqs.filter(isTnav);
    if (sh) {
      const hit = seen.find(u => u.indexOf('tnav-' + LANG + '.js') >= 0);
      t('请求了 /i18n/tnav-' + LANG + '.js', !!hit, seen.join(' | '));
      t('分片返回 200', hit ? status[hit] === 200 : false, hit ? String(status[hit]) : '未请求');
      t('只拉自己那一片', seen.length === 1, seen.join(' | '));

      const d = await ev(`({ txt: (document.getElementById('topNav')||{}).innerText || '',
                              more: (window.__TNAV__ && window.__TNAV__[${JSON.stringify(LANG)}]) ? window.__TNAV__[${JSON.stringify(LANG)}].tnMore : null })`);
      const txt = String(d.txt || '');
      const want = String(sh.tnMore);
      t('顶栏出现该语言的「更多工具」：' + want, txt.indexOf(want) >= 0, txt.slice(0, 80).replace(/\n/g, ' / '));
      if (want.toLowerCase() !== String(EN_SRC.tnMore).toLowerCase()) {
        t('没有退回英文「' + EN_SRC.tnMore + '」', txt.indexOf(EN_SRC.tnMore) < 0);
      }
      if (!/^(zh|ja|ko|yue|wuu|nan|hak|lzh)/.test(LANG)) {
        t('顶栏没有混进中日韩汉字', !/[\u4e00-\u9fff\u3040-\u30ff\uac00-\ud7af]/.test(txt), txt.slice(0, 60).replace(/\n/g, ' / '));
      }
      const nm = String(sh.navTr);
      t('顶栏出现该语言的工具名：' + nm, txt.indexOf(nm) >= 0);
    } else {
      t('内置语言不发任何 tnav 请求', seen.length === 0, seen.join(' | '));
      const txt = String(await ev(`(document.getElementById('topNav')||{}).innerText||''`));
      t('顶栏有内容', txt.trim().length > 0, txt.slice(0, 60).replace(/\n/g, ' / '));
      /* 只有 en 才该是英文；ar/de/ja 这些内置语言走 site-topnav 自带的三张表 */
      if (LANG === 'en') t('英文页面顶栏是英文', txt.indexOf(EN_SRC.tnMore) >= 0, txt.slice(0, 80).replace(/\n/g, ' / '));
    }
    t('无 JS 异常 / console.error', errs.length === 0, errs.slice(0, 2).join(' | '));
  }

  /* —— 场景 D：页内切换语言（index.html 的 #uiLang2）—— */
  const TO = process.env.SWITCH_TO || 'yue';
  {
    console.log('\n===== 页内切换到 ' + TO + '（不刷新）=====');
    await send('Page.navigate', { url: 'http://127.0.0.1:' + PORT + '/index.html' });
    await sleep(400); await waitNav(); await sleep(600);
    const before = String(await ev(`(document.getElementById('topNav')||{}).innerText||''`));
    reqs.length = 0; errs.length = 0;
    await ev(`(function(){var s=document.getElementById('uiLang2'); if(!s) return 'no-select'; s.value=${JSON.stringify(TO)}; s.dispatchEvent(new Event('change')); return 'ok';})()`);
    await sleep(1800);
    const seen = reqs.filter(isTnav);
    const after = String(await ev(`(document.getElementById('topNav')||{}).innerText||''`));
    const shTo = shard(TO);
    t('页内切换触发补 tnav-' + TO + '.js', seen.some(u => u.indexOf('tnav-' + TO + '.js') >= 0), seen.join(' | '));
    t('顶栏真的重绘了（不再是原语言）', after !== before, (before.slice(0, 40) + ' → ' + after.slice(0, 40)).replace(/\n/g, ' / '));
    if (shTo) {
      t('重绘后出现目标语言文案：' + shTo.tnMore, after.indexOf(String(shTo.tnMore)) >= 0, after.slice(0, 80).replace(/\n/g, ' / '));
    }
    t('切换过程无 JS 异常', errs.length === 0, errs.slice(0, 2).join(' | '));
  }

  /* —— 场景 E：极长文字的顶栏 + 下拉不能被裁出屏幕 ——
     kn（卡纳达）单行比 .lnav 宽，会走 tnav-tight/tight2/右对齐两行这条路；
     不管几行，下拉菜单都必须完整落在视口里（v0.9.339 之前会顶出左边缘）。 */
  for (const LONG of (process.env.LONG_CASES || 'kn').split(' ')) {
    console.log('\n===== /' + LONG + '/index.html 极长文字：折行与下拉夹取 =====');
    await send('Page.navigate', { url: 'http://127.0.0.1:' + PORT + '/' + LONG + '/index.html' });
    await sleep(500); await waitNav(); await sleep(700);
    const box = await ev(`(function(){
      var n=document.getElementById('topNav'), r=n.getBoundingClientRect();
      return {h:Math.round(r.height), right:Math.round(r.right), cls:n.className||''};
    })()`);
    t('顶栏高度合理（单行 31 / 折行右对齐 61）：' + box.h, box.h === 31 || box.h === 61, JSON.stringify(box));
    t('顶栏右边缘不越界', box.right <= 1440, String(box.right));
    await ev(`(function(){var b=document.getElementById('tnavBtn'); if(b) b.click();})()`);
    await sleep(400);
    const m = await ev(`(function(){
      var el=document.getElementById('tnavMenu');
      if(!el || el.hidden) return null;
      var r=el.getBoundingClientRect();
      return {l:Math.round(r.left), r:Math.round(r.right), t:Math.round(r.top), b:Math.round(r.bottom),
              w:Math.round(r.width), h:Math.round(r.height)};
    })()`);
    t('下拉打开了', !!m);
    if (m) {
      t('下拉左边缘没出屏（' + m.l + ' ≥ 8）', m.l >= 8, JSON.stringify(m));
      t('下拉右边缘没出屏（' + m.r + ' ≤ 1432）', m.r <= 1432, JSON.stringify(m));
      t('下拉垂直方向也没出屏', m.t >= 8 && m.b <= 900, JSON.stringify(m));
    }
    await ev(`(function(){var b=document.getElementById('tnavBtn'); if(b) b.click();})()`);
  }

  console.log('\n========== ' + pass + ' ✓ / ' + fail + ' ✗ ==========');
  chrome.kill(); clean();
  process.exit(fail ? 1 : 0);
})().catch(e => { console.error('FATAL:', e.message); process.exit(1); });
