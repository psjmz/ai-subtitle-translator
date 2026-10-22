/* live340.js —— 外网实测 https://ai-srtsub.com（不挂代理，阿里云直连）
 *
 * 只量这一版改的东西：
 *   1 版号 v0.9.340（首页顶栏）
 *   2 73 种新语言里挑几种：顶栏真的本地化（分片 200、文案是该语言）
 *   3 下拉「更多工具」完整落在视口内（这一版修的就是它顶出屏幕）
 *   4 无 JS 异常
 *
 * 用法：node live340.js
 */
'use strict';
process.on('unhandledRejection', e => console.log('UNHANDLED', e && e.message));
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { spawn } = require('child_process');
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const BASE = 'https://ai-srtsub.com';
const PORT = 9900 + Math.floor(Math.random() * 80);
const wait = ms => new Promise(r => setTimeout(r, ms));
const LANGS = (process.env.LANGS || 'ms bo yi fa').split(' ');

function shard(lang) {
  const f = path.join(__dirname, 'i18n', 'tnav-' + lang + '.js');
  if (!fs.existsSync(f)) return null;
  const bag = {};
  const ctx = { window: { __TNAV__: bag } }; ctx.globalThis = ctx; vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(f, 'utf8'), ctx);
  return bag[lang] || null;
}

let ws, tid = 0; const pending = new Map(); const reqs = []; const errs = [];
function send(m, p) {
  const id = ++tid; ws.send(JSON.stringify({ id, method: m, params: p || {} }));
  return new Promise((res, rej) => { pending.set(id, { res, rej }); setTimeout(() => { if (pending.has(id)) { pending.delete(id); rej(new Error('timeout ' + m)); } }, 40000); });
}
async function ev(e) {
  const r = await send('Runtime.evaluate', { expression: e, returnByValue: true, awaitPromise: true });
  if (r.exceptionDetails) throw new Error(r.exceptionDetails.text);
  return r.result.value;
}
let P = 0, F = 0;
const ok = (c, n, x) => { console.log((c ? '  ✓ ' : '  ✗ ') + n + (x !== undefined ? '  [' + String(x).slice(0, 140) + ']' : '')); c ? P++ : F++; };

(async () => {
  const chrome = spawn(CHROME, ['--headless=new', '--remote-debugging-port=' + PORT, '--no-sandbox', '--disable-gpu',
    '--lang=zh-CN', '--user-data-dir=/tmp/cr-live340-' + Date.now(), 'about:blank'], { stdio: 'ignore' });
  await wait(2000);
  let tgt = null;
  for (let i = 0; i < 30 && !tgt; i++) {
    try {
      const r = await new Promise((res, rej) => {
        const http = require('http');
        const q = http.get({ host: '127.0.0.1', port: PORT, path: '/json/list' }, s => { let d = ''; s.on('data', c => d += c); s.on('end', () => res(JSON.parse(d))); });
        q.on('error', rej); q.setTimeout(2000, () => q.destroy(new Error('t')));
      });
      tgt = (r || []).find(t => t.type === 'page');
    } catch (e) { await wait(500); }
  }
  if (!tgt) { chrome.kill(); throw new Error('CDP 起不来'); }
  ws = new WebSocket(tgt.webSocketDebuggerUrl, { perMessageDeflate: false });
  await new Promise((res, rej) => { ws.on('open', res); ws.on('error', rej); });
  ws.on('message', d => {
    let m; try { m = JSON.parse(d.toString()); } catch (e) { return; }
    if (m.id && pending.has(m.id)) { const p = pending.get(m.id); pending.delete(m.id); m.error ? p.rej(new Error(m.error.message)) : p.res(m.result); }
    if (m.method === 'Network.requestWillBeSent') reqs.push(m.params.request.url);
    if (m.method === 'Runtime.exceptionThrown') errs.push(((m.params || {}).exceptionDetails || {}).text);
    if (m.method === 'Log.entryAdded' && ((m.params || {}).entry || {}).level === 'error') errs.push('console.error: ' + m.params.entry.text);
  });
  await send('Page.enable'); await send('Network.enable'); await send('Runtime.enable'); await send('Log.enable');
  await send('Network.setCacheDisabled', { cacheDisabled: true });
  await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
  /* 浏览器语言锁成 zh-CN：不锁的话分不清「顶栏跟着 URL」还是「跟着浏览器」 */
  await send('Page.addScriptToEvaluateOnNewDocument', {
    source: "Object.defineProperty(navigator,'languages',{configurable:true,get:function(){return ['zh-CN','zh'];}});"
      + "Object.defineProperty(navigator,'language',{configurable:true,get:function(){return 'zh-CN';}});"
  });

  for (const L of LANGS) {
    const sh = shard(L);
    console.log('\n===== ' + BASE + '/' + L + '/index.html =====');
    reqs.length = 0; errs.length = 0;
    await send('Page.navigate', { url: BASE + '/' + L + '/index.html' });
    await wait(1500);
    let navOk = false;
    for (let i = 0; i < 60; i++) {
      const n = await ev('(document.getElementById("topNav")||{children:[]}).children.length');
      if (n > 0) { navOk = true; break; }
      await wait(300);
    }
    ok(navOk, '顶栏渲染出来了');
    const seen = reqs.filter(u => /\/i18n\/tnav-/.test(u));
    if (sh) {
      ok(seen.some(u => u.indexOf('tnav-' + L + '.js') >= 0), '拉了 /i18n/tnav-' + L + '.js', seen.join(' | '));
    } else {
      /* 内置 27 语（de/ar/ja…）本来就不发分片，这里别再断言"该拉" —— 10-19 误判过一次 */
      ok(seen.length === 0, '内置语言不发分片（de 这一类）', seen.join(' | '));
    }
    const txt = String(await ev("(document.getElementById('topNav')||{}).innerText||''"));
    if (sh) {
      ok(txt.indexOf(String(sh.tnMore)) >= 0, '顶栏「更多工具」= ' + sh.tnMore);
      ok(txt.indexOf(String(sh.navTr)) >= 0, '顶栏「翻译」= ' + sh.navTr);
    }
    ok(!/[\u4e00-\u9fff\u3040-\u30ff]/.test(txt) || /^(zh|ja|yue)/.test(L), '顶栏没有混进中日韩汉字');
    /* 长语言把整行挤满时，品牌块会被压窄断成两行（kn/bg/hy 实测 42px 高） */
    const lg = await ev("(function(){var e=document.getElementById('logoHome');if(!e)return null;var r=e.getBoundingClientRect();return {w:Math.round(r.width),h:Math.round(r.height)};})()");
    ok(!lg || lg.h <= 40, '品牌块没被压成两行', lg ? lg.w + 'x' + lg.h : '无');

    /* 展开下拉：整块必须落在视口里 */
    const opened = await ev('(function(){var b=document.getElementById("tnavBtn");if(!b)return false;b.click();var m=document.getElementById("tnavMenu");return m?!m.hidden:false;})()');
    ok(!!opened, '下拉打开了');
    if (opened) {
      await wait(300);
      const m = await ev('(function(){var e=document.getElementById("tnavMenu");var r=e.getBoundingClientRect();return {l:Math.round(r.left),r:Math.round(r.right),t:Math.round(r.top),b:Math.round(r.bottom),w:Math.round(r.width)};})()');
      ok(m.l >= 8 && m.r <= 1432, '下拉在视口内（' + m.l + '~' + m.r + '）', JSON.stringify(m));
      ok(m.t >= 8 && m.b <= 900, '下拉垂直方向也在视口内', JSON.stringify(m));
      await ev('(function(){var b=document.getElementById("tnavBtn");b.click();})()');
    }
    ok(errs.length === 0, '无 JS 异常', errs.slice(0, 2).join(' | '));
  }

  /* 版号 */
  console.log('\n===== 版号 =====');
  await send('Page.navigate', { url: BASE + '/index.html' });
  await wait(2500);
  const ver = await ev('(function(){var e=document.querySelector(".ver");return e?e.innerText.trim():"";})()');
  ok(/0\.9\.340/.test(ver), '首页顶栏版号 ' + ver);

  console.log('\n========== ' + P + ' ✓ / ' + F + ' ✗ ==========');
  try { chrome.kill(); } catch (e) {}
  process.exit(F ? 1 : 0);
})().catch(e => { console.error('FATAL', e.message); process.exit(1); });
