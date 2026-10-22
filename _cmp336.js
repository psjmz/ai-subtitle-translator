/* _cmp336.js —— merge.html 标题 h4→h3 的「改前 / 改后同源对照」
 *
 * 为什么要对照：改标签本身没风险，风险是「选择器没跟上」导致样式丢失。
 *   .ass-col h4 定义的是 12px / 700 / flex + ::before 4×12 紫色竖条。
 *   所以不能只数标签，要把浏览器算出来的样式值抓出来，改前改后逐条比。
 *
 * 做法：同一台机器同时起两个服务 ——
 *   新版：node server.js            → /merge.html（已改成 h3）
 *   旧版：python3 -m http.server    → /tmp/old336/merge.html（git 副本，仍是 h4）
 *   用同一套 CDP 判据分别取值，再逐条 diff。
 *
 * 用法：node _cmp336.js
 */
'use strict';
const fs = require('fs');
const { spawn } = require('child_process');
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');

const ROOT = __dirname;
const PORT_NEW = Number(process.env.PORT_NEW || 3431);
const PORT_OLD = Number(process.env.PORT_OLD || 3432);
const DEBUG = Number(process.env.DEBUG_PORT || 9482);
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const sleep = ms => new Promise(r => setTimeout(r, ms));

let seq = 0;
const pend = new Map();

const PROBE = `(function(){
  var out = [];
  /* 栏标题 = .ass-col 的后代标题 + .stylebox 的直接子标题，按文档顺序取 */
  Array.prototype.slice.call(document.querySelectorAll('h3,h4')).forEach(function(h){
    var s = getComputedStyle(h);
    var b = getComputedStyle(h, '::before');
    var p = h.parentElement;
    out.push({
      tag: h.tagName.toLowerCase(),
      id: h.id || '',
      parent: (p ? p.tagName.toLowerCase() + (p.className ? '.' + String(p.className).trim().split(/\\s+/).join('.') : '') : ''),
      text: (h.textContent||'').trim().slice(0,18),
      fs: s.fontSize, fw: s.fontWeight, disp: s.display, color: s.color,
      bw: b.width, bh: b.height, bbg: b.backgroundColor
    });
  });
  var seqAll = Array.prototype.slice.call(document.querySelectorAll('h1,h2,h3,h4,h5,h6'))
    .map(function(h){ return h.tagName.toLowerCase(); });
  return JSON.stringify({ titles: out, seq: seqAll });
})()`;

(async () => {
  /* 新版：项目自带的 server.js */
  const srvNew = spawn(process.execPath, ['server.js'], {
    cwd: ROOT,
    env: Object.assign({}, process.env, { PORT: String(PORT_NEW), PUBLIC_URL: 'http://127.0.0.1:' + PORT_NEW }),
    stdio: 'ignore'
  });
  /* 旧版：静态服务 git 副本里的那一份 */
  const srvOld = spawn('/usr/bin/python3', ['-m', 'http.server', String(PORT_OLD)], {
    cwd: '/tmp/old336', stdio: 'ignore'
  });
  await sleep(6000);

  const udir = '/tmp/cr-cmp336-' + Date.now();
  const chrome = spawn(CHROME, ['--headless=new', '--no-sandbox', '--disable-gpu', '--no-first-run',
    '--remote-debugging-port=' + DEBUG, '--user-data-dir=' + udir, 'about:blank'],
    { stdio: 'ignore' });

  let list = null;
  for (let i = 0; i < 40; i++) {
    await sleep(500);
    try {
      const r = await fetch('http://127.0.0.1:' + DEBUG + '/json/list');
      list = await r.json();
      if (list && list.length) break;
    } catch (e) { /* 还没起来 */ }
  }
  if (!list) { chrome.kill(); srvNew.kill(); srvOld.kill(); throw new Error('CDP 起不来'); }

  const ws = new WebSocket(list[0].webSocketDebuggerUrl, { perMessageDeflate: false, maxPayload: 64 * 1024 * 1024 });
  await new Promise((res, rej) => { ws.on('open', res); ws.on('error', rej); });
  ws.on('message', d => {
    let m; try { m = JSON.parse(d.toString()); } catch (e) { return; }
    if (m.id && pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); }
  });
  const send = (method, params) => new Promise(res => {
    const id = ++seq; pend.set(id, res);
    ws.send(JSON.stringify({ id, method, params: params || {} }));
  });
  const ev = async (expr) => {
    const r = await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true });
    return r.result && r.result.result ? r.result.result.value : null;
  };

  const grab = async (url) => {
    await send('Page.navigate', { url });
    await sleep(4500);
    const s = await ev(PROBE);
    return JSON.parse(s);
  };

  const A = await grab('http://127.0.0.1:' + PORT_OLD + '/merge.html');   /* 改前：h4 */
  const B = await grab('http://127.0.0.1:' + PORT_NEW + '/merge.html');            /* 改后：h3 */

  console.log('\n===== 改前（git 副本，h4）=====');
  A.titles.forEach(t => console.log('  <' + t.tag + (t.id ? '#' + t.id : '') + '> 父=' + t.parent
    + '  [' + t.fs + '/' + t.fw + '/' + t.disp + ' ::before ' + t.bw + '×' + t.bh + ' ' + t.bbg + ']'));

  console.log('\n===== 改后（当前文件，h3）=====');
  B.titles.forEach(t => console.log('  <' + t.tag + (t.id ? '#' + t.id : '') + '> 父=' + t.parent
    + '  [' + t.fs + '/' + t.fw + '/' + t.disp + ' ::before ' + t.bw + '×' + t.bh + ' ' + t.bbg + ']'));

  console.log('\n===== diff =====');
  let diff = 0;
  const n = Math.max(A.titles.length, B.titles.length);
  for (let i = 0; i < n; i++) {
    const a = A.titles[i], b = B.titles[i];
    if (!a || !b) { console.log('  ✗ 第 ' + (i + 1) + ' 项缺失'); diff++; continue; }
    const keys = ['fs', 'fw', 'disp', 'bw', 'bh', 'bbg'];
    const bad = keys.filter(k => a[k] !== b[k]);
    if (bad.length) {
      diff++;
      console.log('  ✗ ' + a.text + ' ：' + bad.map(k => k + ' ' + a[k] + '→' + b[k]).join('，'));
    } else {
      console.log('  ✓ ' + a.text + ' 样式一致');
    }
  }
  console.log('\n层级序列  改前 ' + A.seq.join('→') + '\n          改后 ' + B.seq.join('→'));
  console.log('\n===== 汇总 =====');
  console.log(diff ? '样式差异 ' + diff + ' 处' : '改前改后视觉完全一致，0 差异');
  process.exit(diff ? 1 : 0);
})();
