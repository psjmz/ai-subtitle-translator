/* _shot336.js —— 截取线上 merge.html 展开后的样式分组面板（给人看效果用）
 *
 * 栏标题（Translation (primary) / Original (secondary) 等）在「ASS appearance」
 * 折叠面板里，直接 --screenshot 看不到，所以这里先用 JS 把所有 <details> 打开，
 * 再整页截图，最后交给 Python 按坐标裁切。
 *
 * ⚠️ 不用 CDP 的 clip：.ass-cols 是 grid 容器，在折叠面板里算出来宽度是 0，
 *    照它裁只会得到一条几十像素的窄边（已踩）。
 *
 * 用法：DEBUG_PORT=9741 node _shot336.js
 *      → /tmp/mg336-full.png（整页）+ /tmp/mg336-y.txt（面板起始 y）
 */
'use strict';
const { spawn } = require('child_process');
const fs = require('fs');
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');

const DEBUG = Number(process.env.DEBUG_PORT || 9731);
const BASE = process.env.BASE || 'https://ai-srtsub.com';
const LANG = process.env.LANG_PATH || '/en/merge.html';
const OUT = process.env.OUT || '/tmp/mg336-full.png';
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const sleep = ms => new Promise(r => setTimeout(r, ms));

let seq = 0;
const pend = new Map();

(async () => {
  const udir = '/tmp/cr-shot336-' + Date.now();
  const chrome = spawn(CHROME, ['--headless=new', '--no-sandbox', '--disable-gpu', '--no-first-run',
    '--window-size=1440,2600', '--remote-debugging-port=' + DEBUG, '--user-data-dir=' + udir, 'about:blank'],
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
  if (!list) { chrome.kill(); throw new Error('CDP 起不来'); }

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

  await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 2600, deviceScaleFactor: 2, mobile: false });
  await send('Page.navigate', { url: BASE + LANG });
  await sleep(6500);

  /* 展开所有 details，回报面板起始 y 与页面总高 */
  const info = await ev(`(function(){
    Array.prototype.slice.call(document.querySelectorAll('details')).forEach(function(d){ d.open = true; });
    return new Promise(function(res){
      setTimeout(function(){
        var el = document.querySelector('.ass-cols') || document.querySelector('.stylebox');
        var y = el ? Math.round(el.getBoundingClientRect().top + window.scrollY) : 0;
        res(JSON.stringify({ y: y, h: document.documentElement.scrollHeight,
                             w: window.innerWidth, found: !!el }));
      }, 1500);
    });
  })()`);

  if (!info) { ws.close(); chrome.kill(); throw new Error('取面板位置失败'); }
  const b = JSON.parse(info);
  console.log('面板起始 y=' + b.y + '  页面总高=' + b.h + '  视口宽=' + b.w + '  找到元素=' + b.found);
  fs.writeFileSync('/tmp/mg336-y.txt', String(b.y));

  /* ⚠️ 别把视口拉到整页高度再 captureBeyondViewport：
     页面高上万像素时 Chrome 会重复绘制（裁出来是「页面顶部 + 右侧又一份」）。
     改成固定视口 + 滚到元素位置再截，稳。 */
  await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1700, deviceScaleFactor: 2, mobile: false });
  await sleep(600);
  await ev(`(function(){
    var el = document.querySelector('.ass-cols') || document.querySelector('.stylebox');
    if (el) window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - 110);
    return 1;
  })()`);
  await sleep(1200);

  const shot = await send('Page.captureScreenshot', { format: 'png' });
  const data = shot.result && shot.result.data;
  if (!data) { ws.close(); chrome.kill(); throw new Error('截图失败'); }
  fs.writeFileSync(OUT, Buffer.from(data, 'base64'));
  console.log('已写 ' + OUT + '  ' + Math.round(fs.statSync(OUT).size / 1024) + ' KB');

  ws.close(); chrome.kill();
})();
