/* _chkwrap.js —— v0.9.317 折行块单行制真浏览器验收（非交付件）
   改动：折行块压成一行 —— 「折行设置」标题行删掉，行宽标签+输入框+换算提示同一排；
   标题行 ⓘ 的「无须重跑翻译」并进行宽标签的 ⓘ（与行宽释义合并，syncWrapField 现拼）。
   这里量真渲染：单行性、显隐切换、合并 ⓘ 文案与切语言刷新、块高、de/ru 长标签不散架。 */
'use strict';
process.on('unhandledRejection', e => { console.log('UNHANDLED', e && e.message); });
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');
const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const ROOT = __dirname;
const SRV = 3510 + Math.floor(Math.random() * 60);
const PORT = 9900 + Math.floor(Math.random() * 80);
const wait = ms => new Promise(r => setTimeout(r, ms));

const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8' };
const srv = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  const m = p.match(/^\/[a-zA-Z]{2,3}(?:-[a-zA-Z]{2,4})?\/(.+)$/);
  if (m && fs.existsSync(path.join(ROOT, m[1]))) p = '/' + m[1];
  const f = path.join(ROOT, p === '/' ? 'index.html' : p);
  fs.readFile(f, (e, d) => {
    if (e) { res.writeHead(404); res.end('nf'); return; }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream' });
    res.end(d);
  });
});

let ws, tid = 0; const pending = new Map();
function send(m, p) {
  const id = ++tid; ws.send(JSON.stringify({ id, method: m, params: p || {} }));
  return new Promise((res, rej) => { pending.set(id, { res, rej }); setTimeout(() => { if (pending.has(id)) { pending.delete(id); rej(new Error('timeout ' + m)); } }, 30000); });
}
async function ev(e) {
  const r = await send('Runtime.evaluate', { expression: e, returnByValue: true, awaitPromise: true });
  if (r.exceptionDetails) throw new Error(r.exceptionDetails.text + ' :: ' + (r.exceptionDetails.exception && r.exceptionDetails.exception.description || '').slice(0, 200));
  return r.result.value;
}
let P = 0, F = 0;
const ok = (c, n, x) => { console.log((c ? '  ✓ ' : '  ✗ ') + n + (x !== undefined ? '  [' + String(x).slice(0, 140) + ']' : '')); c ? P++ : F++; };

/* 两个元素中心 y 是否同一行 */
const ROWchk = '(a,b)=>{const A=document.querySelector(a).getBoundingClientRect(),B=document.querySelector(b).getBoundingClientRect();return Math.abs(A.top+A.height/2-B.top-B.height/2);}';
/* 块截图：收「返回元素的 JS 表达式」；clip 是页面坐标，getBoundingClientRect 是视口坐标 —— 补 scroll 偏移 */
async function shot(expr, file) {
  const r = await ev(`(()=>{const b=(${expr}).getBoundingClientRect();return {x:b.x-6+scrollX,y:b.y-6+scrollY,w:b.width+12,h:b.height+12}})()`);
  const img = await send('Page.captureScreenshot', { format: 'png', clip: { x: r.x, y: r.y, width: r.w, height: r.h, scale: 2 } });
  fs.writeFileSync(file, Buffer.from(img.data, 'base64'));
}
const WRAPBLK = 'document.getElementById("wrapTipEl").closest(".param-blk")';

(async () => {
  await new Promise(r => srv.listen(SRV, '127.0.0.1', r));
  const chrome = spawn(CHROME, ['--headless=new', '--remote-debugging-port=' + PORT, '--no-sandbox', '--disable-gpu',
    '--host-resolver-rules=MAP * ~NOTFOUND, EXCLUDE 127.0.0.1',
    '--lang=zh-CN', '--user-data-dir=/tmp/crwrap-' + Date.now(), 'about:blank'], { stdio: 'ignore' });
  await wait(2000);
  let tgt = null;
  for (let i = 0; i < 30 && !tgt; i++) {
    try {
      const r = await new Promise((res, rej) => { const q = http.get({ host: '127.0.0.1', port: PORT, path: '/json/list' }, s => { let d = ''; s.on('data', c => d += c); s.on('end', () => res(JSON.parse(d))); }); q.on('error', rej); q.setTimeout(2000, () => q.destroy(new Error('t'))); });
      tgt = (r || []).find(t => t.type === 'page');
    } catch (e) { await wait(500); }
  }
  if (!tgt) { console.log('浏览器没起来'); srv.close(); chrome.kill(); process.exit(2); }
  ws = new WebSocket(tgt.webSocketDebuggerUrl, { perMessageDeflate: false });
  await new Promise((r, j) => { ws.on('open', r); ws.on('error', j); });
  ws.on('message', d => { const m = JSON.parse(d); if (m.id && pending.has(m.id)) { pending.get(m.id).res(m.result || m); pending.delete(m.id); } });
  await send('Page.enable'); await send('Runtime.enable');

  async function go(url) {
    await send('Page.navigate', { url });
    for (let i = 0; i < 40; i++) { const st = await ev('document.readyState'); if (st === 'complete') break; await wait(200); }
    await wait(900);
  }
  const vis = s => `(()=>{const e=document.querySelector(${JSON.stringify(s)});return !!e && e.offsetParent!==null;})()`;

  console.log('== ① zh-CN 单语（默认）：单行制 ==');
  await go('http://127.0.0.1:' + SRV + '/translate.html');
  ok(await ev('document.querySelector(".blk-title.wrap-head") === null') === true, '「折行设置」标题行已删干净');
  ok(await ev(vis('#wlblMaxW')) === true, '单语：显示「单语行宽」标签');
  ok(await ev(vis('#wlblBiMaxW')) === false, '单语：「双语行宽」标签隐藏');
  ok(await ev(vis('#wcellBiMaxW')) === false, '单语：双语单元格隐藏');
  const d1 = await ev(`(${ROWchk})('#wlblMaxW','#maxW')`);
  ok(d1 < 6, '标签与输入框同一行（中心差 ' + d1.toFixed(1) + 'px）', d1.toFixed(1));
  const d2 = await ev(`(${ROWchk})('#maxW','#maxWHint')`);
  ok(d2 < 6, '输入框与换算提示同一排（中心差 ' + d2.toFixed(1) + 'px）', d2.toFixed(1));
  const hint = await ev('document.getElementById("maxWHint").textContent');
  ok(hint.length > 0, '换算提示已填（updateWidthHints 取词口没断）', hint.slice(0, 30));
  const bh = await ev('document.querySelector("#wrapTipEl").closest(".param-blk").getBoundingClientRect().height');
  ok(bh < 75, '折行块高度压到单行（<75px）', Math.round(bh) + 'px');
  const lh = await ev('document.getElementById("wlblMaxW").getBoundingClientRect().height');
  ok(lh < 30, 'zh 标签单行没折', Math.round(lh) + 'px');
  /* 合并 ⓘ：单语那条 = wrapTip（无须重跑翻译）+ lblMaxW（全角宽单位释义） */
  const tip = await ev('document.getElementById("wrapTipEl").getAttribute("data-tip")');
  ok(!!tip && tip.indexOf('无须重新翻译') >= 0, 'ⓘ 合并了「无须重新翻译」那句', (tip || '').slice(0, 24));
  ok(!!tip && tip.indexOf('全角宽') >= 0, 'ⓘ 合并了行宽释义（全角宽单位）', (tip || '').slice(-40));
  ok(await ev('document.getElementById("wrapTipEl").hasAttribute("data-tip-i18n")') === false, '合并 ⓘ 不再挂单键取词口（防 applyTipI18n 冲掉）');
  const tipB0 = await ev('document.getElementById("wrapTipBiEl").getAttribute("data-tip")');
  ok(!!tipB0 && tipB0.indexOf('无须重新翻译') >= 0 && tipB0.indexOf('译文行') >= 0, '双语 ⓘ 也拼好了（隐藏时同样设值）', (tipB0 || '').slice(0, 24));
  /* 浮层锚点：单行制由 .wrap-line 承担，标签交出定位上下文 */
  const anch = await ev('getComputedStyle(document.querySelector(".wrap-line")).position');
  ok(anch === 'relative', '浮层锚点挂到单行（relative）', anch);
  const lpos = await ev('getComputedStyle(document.getElementById("wlblMaxW")).position');
  ok(lpos === 'static', '行宽标签不自成定位上下文（浮层铺满整行）', lpos);
  const zhTip = tip || '';
  await ev(WRAPBLK + '.scrollIntoView({block:"center"}); void 0');
  await wait(300);
  await shot(WRAPBLK, '/tmp/wrapshot-zh-mono.png');

  console.log('== ② 切双语（expStyle=bi-dst|*）：标签与单元格一起换 ==');
  /* 选项值是「模式|文件」组合值（bi-dst|srt 等），直接给裸值会落空成 '' */
  await ev('var es=document.getElementById("expStyle"); es.value=[...es.options].find(o=>o.value.startsWith("bi-dst")).value; es.dispatchEvent(new Event("change",{bubbles:true})); void 0');
  await wait(300);
  ok(await ev(vis('#wlblBiMaxW')) === true, '双语：换成「双语行宽」');
  ok(await ev(vis('#wlblMaxW')) === false, '双语：「单语行宽」标签隐藏');
  ok(await ev(vis('#biMaxW')) === true && await ev(vis('#maxW')) === false, '双语：输入框换成 biMaxW');
  const d3 = await ev(`(${ROWchk})('#wlblBiMaxW','#biMaxW')`);
  ok(d3 < 6, '双语：标签/输入框同一行（中心差 ' + d3.toFixed(1) + 'px）', d3.toFixed(1));
  const d4 = await ev(`(${ROWchk})('#biMaxW','#biMaxWHint')`);
  ok(d4 < 6, '双语：输入框与提示同一排（中心差 ' + d4.toFixed(1) + 'px）', d4.toFixed(1));
  const hint2 = await ev('document.getElementById("biMaxWHint").textContent');
  ok(hint2.length > 0, '双语：换算提示已填', hint2.slice(0, 30));
  const tipBv = await ev('document.getElementById("wrapTipBiEl").getAttribute("data-tip")');
  ok(!!tipBv && tipBv.indexOf('双语') >= 0, '双语 ⓘ 现拼的合并文案在位', (tipBv || '').slice(0, 24));
  const bh2 = await ev('document.querySelector("#wrapTipBiEl").closest(".param-blk").getBoundingClientRect().height');
  ok(bh2 < 75, '双语：块高仍是单行（<75px）', Math.round(bh2) + 'px');
  await shot(WRAPBLK, '/tmp/wrapshot-zh-bi.png');

  console.log('== ③ 切回单语：显隐回滚 ==');
  await ev('var es=document.getElementById("expStyle"); es.value="mono|srt"; es.dispatchEvent(new Event("change",{bubbles:true})); void 0');
  await wait(300);
  ok(await ev(vis('#wlblMaxW')) === true && await ev(vis('#maxW')) === true, '切回单语：标签与输入框都回来了');
  ok(await ev(vis('#wlblBiMaxW')) === false && await ev(vis('#biMaxW')) === false, '切回单语：双语项都藏好');

  console.log('== ④ de / ru：长标签不散架 + 切语言重拼合并 ⓘ ==');
  /* 切桌面三栏宽度：右栏只有 320px（减 padding 后 ~264px），才是标签最容易折行的场景 */
  await send('Emulation.setDeviceMetricsOverride', { width: 1280, height: 900, deviceScaleFactor: 1, mobile: false });
  for (const lg of ['de', 'ru']) {
    await go('http://127.0.0.1:' + SRV + '/' + lg + '/translate.html');
    const txt = await ev('document.getElementById("wlblMaxW").textContent');
    ok(await ev(vis('#wlblMaxW')) === true, lg + '：标签可见', txt.trim().slice(0, 30));
    const h2 = await ev('document.getElementById("wlblMaxW").getBoundingClientRect().height');
    ok(h2 < 45, lg + '：标签最多两行（<45px）', Math.round(h2) + 'px');
    const dd = await ev(`(${ROWchk})('#wlblMaxW','#maxW')`);
    ok(dd < 18, lg + '：标签与输入框仍同行（中心差 ' + dd.toFixed(1) + 'px）', dd.toFixed(1));
    const bh3 = await ev('document.querySelector("#wrapTipEl").closest(".param-blk").getBoundingClientRect().height');
    ok(bh3 < 110, lg + '：块高仍受控（<110px）', Math.round(bh3) + 'px');
    /* 切语言由包装版 applyI18n 调 syncWrapField → 合并 ⓘ 必须跟着换成德/俄语 */
    const tipL = await ev('document.getElementById("wrapTipEl").getAttribute("data-tip")');
    ok(!!tipL && tipL !== zhTip && tipL.length > 20, lg + '：合并 ⓘ 跟着切语言重拼了', (tipL || '').slice(0, 40));
    await ev(WRAPBLK + '.scrollIntoView({block:"center"}); void 0');
    await wait(300);
    await shot(WRAPBLK, '/tmp/wrapshot-' + lg + '.png');
  }

  console.log('---- 折行单行制：' + P + ' 过 / ' + F + ' 红 ----');
  srv.close(); chrome.kill(); process.exit(F ? 1 : 0);
})().catch(e => { console.log('FATAL', e && e.message); srv.close(); process.exit(1); });
