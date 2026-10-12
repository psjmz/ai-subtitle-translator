/* v0.9.282 实测：共享词典那 52 条 VTT 面板词条补齐到 27 语
   静态断言只能证明「源码里有这些行」，证明不了：
     ① 词典在浏览器里真的能 eval 出来、27 个语言块都活着（注入脚本写坏了的话页面整页瘫）
     ② 切到某个语言后，那 52 条拿到的是**该语言**的译文，不是回退的中文
     ③ 页面照常渲染、零 JS 异常（site-i18n.js 涨了 1196 条，别把它撑坏）
   ⚠️ 每次用新的 --user-data-dir：语言选择存 localStorage，复用 profile 会带上上一轮的语言。 */
'use strict';
process.on('unhandledRejection', e => { console.log('   (忽略一个导航噪音: ' + (e && e.message) + ')'); });
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');
const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PORT = 9382, BASE = 'http://127.0.0.1:3098';
const wait = ms => new Promise(r => setTimeout(r, ms));
let PASS = 0, FAIL = 0, ws, tid = 0; const pending = new Map(); let jsErrors = [];
const ok = (c, n, x) => { console.log((c ? '  ✓ ' : '  ✗ ') + n + (x !== undefined ? '  [' + x + ']' : '')); c ? PASS++ : FAIL++; };
function send(method, params) {
  const id = ++tid; ws.send(JSON.stringify({ id, method, params: params || {} }));
  return new Promise((res, rej) => {
    pending.set(id, { res, rej });
    setTimeout(() => { if (pending.has(id)) { pending.delete(id); rej(new Error('timeout ' + method)); } }, 25000);
  });
}
async function ev(expr) {
  const r = await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true });
  if (r.exceptionDetails) throw new Error(r.exceptionDetails.text);
  return r.result.value;
}
async function goto(url) {
  await send('Page.navigate', { url: 'about:blank' }); await wait(250);
  await send('Page.navigate', { url });
  for (let i = 0; i < 40; i++) { try { if (await ev('document.readyState') === 'complete') break; } catch (e) { } await wait(400); }
  await wait(1500);
}
const setLang = L => `(function(){var k='srtTool',o={};try{o=JSON.parse(localStorage.getItem(k)||'{}')||{}}catch(e){o={}}
  o.uiLang='${L}';o.langManual=1;localStorage.setItem(k,JSON.stringify(o));return o.uiLang;})()`;

(async () => {
  const chrome = spawn(CHROME, [
    '--headless=new', '--remote-debugging-port=' + PORT, '--no-sandbox', '--disable-gpu',
    '--remote-allow-origins=*', '--window-size=1440,1100', '--no-proxy-server',
    '--user-data-dir=/tmp/cbuddy-chk282-' + Date.now()
  ], { stdio: 'ignore' });
  let list = null;
  for (let i = 0; i < 20 && !list; i++) {
    await wait(1000);
    list = await new Promise(res => {
      const q = http.get('http://127.0.0.1:' + PORT + '/json/list', r => { let b = ''; r.on('data', d => b += d); r.on('end', () => res(JSON.parse(b))); });
      q.on('error', () => res(null));
    });
  }
  if (!list) throw new Error('Chrome 没起来');
  ws = new WebSocket(list.find(t => t.type === 'page').webSocketDebuggerUrl, { perMessageDeflate: false });
  ws.on('message', raw => {
    const o = JSON.parse(raw);
    if (o.id && pending.has(o.id)) { const p = pending.get(o.id); pending.delete(o.id); (o.error ? p.rej(new Error(o.error.message)) : p.res(o.result)); return; }
    if (o.method === 'Runtime.exceptionThrown') jsErrors.push((o.params.exceptionDetails || {}).text || '?');
    if (o.method === 'Log.entryAdded' && o.params.entry.level === 'error') jsErrors.push(o.params.entry.text);
    if (o.method === 'Runtime.consoleAPICalled' && o.params.type === 'error') jsErrors.push(String(o.params.args[0] && o.params.args[0].value));
  });
  await new Promise(r => ws.on('open', r));
  await send('Runtime.enable'); await send('Page.enable'); await send('Log.enable');
  await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false });

  console.log('— ① 工作台：版号、页面活着、字典能取到 —');
  await goto(BASE + '/translate.html');
  ok(await ev(`(document.querySelector('.ver-tag')||{}).textContent||''`) === 'v0.9.282', '版号是 v0.9.282');
  const dic = JSON.parse(await ev(`JSON.stringify((function(){
    var D=(window.SiteI18N&&window.SiteI18N.I18N)||null; if(!D) return {none:true};
    var L=Object.keys(D), base=Object.keys(D['zh-CN']);
    return {n:L.length, base:base.length, langs:L.join(',')};})())`));
  console.log('   ' + JSON.stringify(dic).slice(0, 200));
  ok(!dic.none && dic.n === 27, '浏览器里字典 27 个语言块都在', dic.n);
  ok(dic.base === 598, '基准词条 598 条', dic.base);

  console.log('— ② 抽查 6 个语言：52 条 VTT 词条都不是中文 —');
  /* 这些面板是 display:none 的，界面上看不见 —— 只能直接读字典取值 */
  const probe = `JSON.stringify((function(){
    var D=window.SiteI18N.I18N, base=Object.keys(D['zh-CN']);
    var CJ=/[\\u4e00-\\u9fff]/;
    var out={};
    ['es','ru','el','he','th','ar'].forEach(function(L){
      var d=D[L]; if(!d) { out[L]={no:true}; return; }
      var miss=base.filter(function(k){return !(k in d)||!String(d[k]||'').trim();});
      var han=base.filter(function(k){return CJ.test(String(d[k]||''));});
      out[L]={miss:miss.length, han:han.length, sample:String(d['secVttStyle']||'').slice(0,42)};
    });
    return out;})())`;
  const pr = JSON.parse(await ev(probe));
  Object.keys(pr).forEach(L => {
    const o = pr[L];
    console.log('   ' + L + ': ' + JSON.stringify(o));
    ok(!o.no && o.miss === 0, L + ' 无缺条', o.miss);
    ok(!o.no && o.han === 0, L + ' 译文里没汉字（不是回退中文）', o.han);
  });

  console.log('— ③ 切到俄语界面：页面照常渲染、页面上的文字真的变成俄语 —');
  await ev(setLang('ru'));
  await goto(BASE + '/translate.html');
  ok(await ev(`document.documentElement.lang`) === 'ru', '界面语言切成 ru');
  const ru = JSON.parse(await ev(`JSON.stringify({title:document.title, body:document.body.innerText.length,
     cyr:(document.body.innerText.match(/[\\u0400-\\u04FF]/g)||[]).length})`));
  console.log('   ' + JSON.stringify(ru));
  ok(ru.cyr > 50, '页面正文真的是西里尔字母（词典没整块失效）', ru.cyr + ' 个西里尔字符');
  ok(ru.body > 500, '页面正常渲染', ru.body + ' 字');

  console.log('— ④ 切希伯来语（RTL）：方向属性跟着翻 —');
  await ev(setLang('he'));
  await goto(BASE + '/translate.html');
  const he = JSON.parse(await ev(`JSON.stringify({lang:document.documentElement.lang, dir:document.documentElement.dir,
     heb:(document.body.innerText.match(/[\\u0590-\\u05FF]/g)||[]).length})`));
  console.log('   ' + JSON.stringify(he));
  ok(he.lang === 'he', '界面语言切成 he');
  ok(he.dir === 'rtl', 'dir 变成 rtl');
  ok(he.heb > 20, '正文是希伯来文', he.heb + ' 个希伯来字符');

  console.log('— ⑤ 回到简体中文 + 零 JS 异常 —');
  await ev(setLang('zh-CN'));
  await goto(BASE + '/translate.html');
  ok(await ev(`document.documentElement.lang`) === 'zh-CN', '切回 zh-CN');
  const gz = await ev(`(document.body.innerText.match(/[\\u4e00-\\u9fff]/g)||[]).length`);
  ok(gz > 100, '中文正文正常', gz + ' 个汉字');
  ok(jsErrors.length === 0, '整轮零 JS 异常', jsErrors[0] || '');

  const r2 = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('/tmp/chk282-ws-ru.png', Buffer.from(r2.data, 'base64'));

  console.log('\n核验: ' + PASS + ' 通过 / ' + FAIL + ' 失败');
  ws.close(); chrome.kill();
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.log('崩了: ' + e.message); try { chrome && chrome.kill(); } catch (x) { } process.exit(1); });
