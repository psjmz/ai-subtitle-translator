/* _chktopnav.js —— v0.9.318 统一导航大 Mega 下拉版 真浏览器验收（非交付件）
   317 首版（小 pills + 两列纯文字）被用户否掉，318 推倒重做。本探针量：
   ① 首页通栏顶栏：.topbar 全宽 + .lnav 内衬 1080 居中；
   ② 四主项：2 文字链 + 视频下载渐变推广 pill（computed background-image 真渐变）+ 更多工具按钮；
   ③ Mega 下拉：开合/点外收起/13 项（图标+名+描述）/4 组标题/底栏全部工具；
   ④ 当前页高亮（工具页）；⑤ 切语言重渲染（de）；⑥ /de/ 前缀链接；⑦ 窄屏一列可滚；
   ⑧ 截图存档。 */
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

async function shot(expr, file, extra) {
  const r = await ev(`(()=>{const b=(${expr}).getBoundingClientRect();const e=${extra || 0};return {x:Math.max(0,b.x-8+scrollX),y:Math.max(0,b.y-8+scrollY),w:b.width+16,h:b.height+16+e}})()`);
  const img = await send('Page.captureScreenshot', { format: 'png', clip: { x: r.x, y: r.y, width: r.w, height: r.h, scale: 2 } });
  fs.writeFileSync(file, Buffer.from(img.data, 'base64'));
}

(async () => {
  await new Promise(r => srv.listen(SRV, '127.0.0.1', r));
  const chrome = spawn(CHROME, ['--headless=new', '--remote-debugging-port=' + PORT, '--no-sandbox', '--disable-gpu',
    '--host-resolver-rules=MAP * ~NOTFOUND, EXCLUDE 127.0.0.1',
    '--lang=zh-CN', '--user-data-dir=/tmp/crtnav318-' + Date.now(), 'about:blank'], { stdio: 'ignore' });
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
  await send('Emulation.setDeviceMetricsOverride', { width: 1280, height: 900, deviceScaleFactor: 1, mobile: false });

  async function go(url) {
    await send('Page.navigate', { url });
    for (let i = 0; i < 40; i++) { const st = await ev('document.readyState'); if (st === 'complete') break; await wait(200); }
    await wait(900);
  }

  /* ============ ① 首页：通栏顶栏 + 四主项 ============ */
  console.log('== index.html @1280 ==');
  await go('http://127.0.0.1:' + SRV + '/index.html');
  const bar = await ev('(()=>{const t=document.querySelector(".topbar");if(!t)return null;const b=t.getBoundingClientRect();return {w:Math.round(b.width),x:Math.round(b.x)}})()');
  ok(bar && bar.w === 1280, '通栏顶栏满宽 1280', JSON.stringify(bar));
  const ln = await ev('(()=>{const l=document.querySelector(".lnav");const b=l.getBoundingClientRect();return {w:Math.round(b.width),x:Math.round(b.x)}})()');
  ok(ln && ln.w === 1080 && Math.abs(ln.x - 100) <= 2, '内衬 1080 且居中（x=100）', JSON.stringify(ln));
  const mains = await ev('[...document.querySelectorAll("#topNav .tnav-lnk")].map(a=>a.textContent.trim())');
  ok(mains.length === 2 && mains[0] === '字幕翻译' && mains[1] === '特效字幕', '两个文字链主项', mains.join('|'));
  const promo = await ev('(()=>{const a=document.querySelector("#topNav .tnav-promo");if(!a)return null;const cs=getComputedStyle(a);return {txt:a.textContent.trim(),href:a.getAttribute("href"),tgt:a.target,bg:cs.backgroundImage.slice(0,40),color:cs.color}})()');
  ok(promo && promo.txt === '视频下载' && promo.href === 'https://risekol.com/video' && promo.tgt === '_blank'
    && /linear-gradient/.test(promo.bg) && promo.color === 'rgb(255, 255, 255)',
    '视频下载 = 渐变实心推广 pill（白字）', JSON.stringify(promo));
  const more = await ev('document.getElementById("tnavBtn").textContent.trim()');
  ok(more.indexOf('更多工具') >= 0, '更多工具按钮', more);
  ok(await ev('document.getElementById("tnavMenu").hidden') === true, '菜单默认收起');

  /* ============ ② Mega 下拉展开 ============ */
  await ev('document.getElementById("tnavBtn").click(); void 0'); await wait(250);
  ok(await ev('document.getElementById("tnavBtn").getAttribute("aria-expanded")') === 'true', '展开后 aria-expanded=true');
  ok(await ev('document.getElementById("tnavMenu").hidden') === false, '展开后菜单可见');
  const cols = await ev('getComputedStyle(document.getElementById("tnavMenu")).gridTemplateColumns.split(" ").length');
  ok(cols === 4, '桌面四列（实际 ' + cols + ' 列）');
  const items = await ev('[...document.querySelectorAll("#topNav .tnav-it")].map(a=>({nm:a.querySelector(".tnav-nm").textContent,ds:a.querySelector(".tnav-ds").textContent,ic:a.querySelector(".tnav-ic svg")?1:0,c:getComputedStyle(a.querySelector(".tnav-ic")).color}))');
  ok(items.length === 13, '菜单 13 项（实际 ' + items.length + '）');
  ok(items.every(x => x.nm && x.ds && x.ic), '每项都有 图标+名称+描述', JSON.stringify(items[0]));
  const uniqColors = [...new Set(items.map(x => x.c))];
  ok(uniqColors.length >= 12, '图标主题色 ≥12 种（不串色）', uniqColors.slice(0, 4).join(' '));
  const gts = await ev('[...document.querySelectorAll("#topNav .tnav-gt")].map(x=>x.textContent)');
  ok(gts.length === 4 && gts[0] === '转换与格式', '四个分组标题', gts.join('/'));
  const foot = await ev('(()=>{const a=document.querySelector("#topNav .tnav-all");return a?a.getAttribute("href"):""})()');
  ok(foot === '/#toolsTitle', '底栏「全部工具」指首页工具区', foot);
  const onIdx = await ev('document.querySelectorAll("#topNav [aria-current=page]").length');
  ok(onIdx === 0, '首页无当前页高亮', onIdx);
  await shot('document.getElementById("tnavMenu")', '/tmp/tnav318-menu.png');
  await shot('document.querySelector(".topbar")', '/tmp/tnav318-index.png', 0);
  /* 点外面收起 */
  await ev('document.querySelector("h1").click(); void 0'); await wait(200);
  ok(await ev('document.getElementById("tnavMenu").hidden') === true, '点外面收起');

  /* ============ ③ 工具页：当前页高亮 ============ */
  console.log('== convert.html ==');
  await go('http://127.0.0.1:' + SRV + '/convert.html');
  await ev('document.getElementById("tnavBtn").click(); void 0'); await wait(200);
  const cur = await ev('(()=>{const a=document.querySelector("#topNav .tnav-it.on");return a?a.querySelector(".tnav-nm").textContent:""})()');
  ok(cur === '格式转换', 'convert 页菜单里「格式转换」高亮', cur);
  const mainOn = await ev('document.querySelectorAll("#topNav .tnav-lnk.on").length');
  ok(mainOn === 0, 'convert 页主项无高亮（高亮在菜单里）', mainOn);
  await shot('document.querySelector(".hd")', '/tmp/tnav318-convert.png');

  /* ============ ④ split 页切德语 ============ */
  console.log('== split.html 切 de ==');
  await go('http://127.0.0.1:' + SRV + '/split.html');
  await ev('(()=>{const s=document.getElementById("langSel");s.value="de";s.dispatchEvent(new Event("change",{bubbles:true}))})()'); await wait(300);
  const de = await ev('({lang:SiteTopNav.lang(),main:[...document.querySelectorAll("#topNav .tnav-lnk")].map(a=>a.textContent.trim()),more:document.getElementById("tnavBtn").textContent.trim()})');
  ok(de.lang === 'de' && de.main[0] === 'Übersetzen', '切德语后主项变德语（Übersetzen）', JSON.stringify(de));
  await ev('document.getElementById("tnavBtn").click(); void 0'); await wait(200);
  const deItem = await ev('(()=>{const a=document.querySelector("#topNav .tnav-it");return {nm:a.querySelector(".tnav-nm").textContent,ds:a.querySelector(".tnav-ds").textContent}})()');
  ok(/Konvertier/.test(deItem.ds) || /konvertier/i.test(deItem.ds), '德语描述也换了', JSON.stringify(deItem));
  await shot('document.querySelector(".hd")', '/tmp/tnav318-de.png');

  /* ============ ⑤ /de/ 前缀 ============ */
  console.log('== /de/convert.html ==');
  await go('http://127.0.0.1:' + SRV + '/de/convert.html');
  const deLinks = await ev('[...document.querySelectorAll("#topNav .tnav-lnk,#topNav .tnav-it")].map(a=>a.getAttribute("href")).filter(h=>h&&h[0]==="/")');
  ok(deLinks.length > 0 && deLinks.every(h => h.startsWith('/de/')), '链接全带 /de/ 前缀', deLinks.slice(0, 3).join(' '));

  /* ============ ⑥ 窄屏 375 ============ */
  console.log('== index.html @375 ==');
  await send('Emulation.setDeviceMetricsOverride', { width: 375, height: 720, deviceScaleFactor: 1, mobile: true });
  await go('http://127.0.0.1:' + SRV + '/index.html');
  await ev('document.getElementById("tnavBtn").click(); void 0'); await wait(250);
  const mCols = await ev('getComputedStyle(document.getElementById("tnavMenu")).gridTemplateColumns.split(" ").length');
  ok(mCols === 1, '窄屏一列（实际 ' + mCols + '）');
  const mh = await ev('(()=>{const r=document.getElementById("tnavMenu").getBoundingClientRect();return {h:Math.round(r.height),vw:innerHeight,vis:r.bottom<=innerHeight+1||getComputedStyle(document.getElementById("tnavMenu")).overflowY}})()');
  ok(mh.vis !== false, '窄屏菜单不溢出视口', JSON.stringify(mh));
  await shot('document.querySelector(".topbar")', '/tmp/tnav318-m.png', 0);

  console.log('\n_chktopnav318: ' + P + '/' + (P + F) + ' OK, bad=' + F);
  srv.close(); chrome.kill(); process.exit(F ? 1 : 0);
})().catch(e => { console.log('FATAL', e && e.message); srv.close(); process.exit(2); });
