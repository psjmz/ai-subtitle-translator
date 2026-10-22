/* v0.9.309 本地实拍：「AI 算力紧张…」那句提醒的显眼度改法对照
   同一页、同一状态（任务条跑起来的那一帧）下切三种样式各拍一张：
     ① 现状（v0.9.297 起的纯粉字）
     ② 方案 A = 小药丸（浅粉底 + 描边 + 加粗 + 呼吸圆点）—— 本次已写进 translate.html
     ③ 备选 B = 无底色、字号加大加粗 + 左侧竖条
   顺带量：药丸把任务条撑高了多少、和同行文字是否还在一根基线上、收工后还摘不摘得掉。
   用法（服务与浏览器都在本进程里管，别用后台跑）：
     node _shot309.js            # 默认 3210 端口
     SRV=3222 node _shot309.js   # 换端口
*/
'use strict';
process.on('unhandledRejection', e => { console.log('UNHANDLED', e && e.message); });
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');
const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const ROOT = __dirname;
const SRV = Number(process.env.SRV || 3210);
const PORT = 9500 + Math.floor(Math.random() * 90);
const OUT = '/Users/jp/WorkBuddy/2026-09-04-00-29-54/outputs';
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
const ok = (c, n, x) => { console.log((c ? '  ✓ ' : '  ✗ ') + n + (x !== undefined ? '  [' + String(x).slice(0, 170) + ']' : '')); c ? P++ : F++; };

async function shot(file, sel, pad, scale) {
  const info = JSON.parse(await ev(`JSON.stringify((function(){var e=document.querySelector('${sel}');if(!e)return null;var b=e.getBoundingClientRect();return {x:b.x,y:b.y+window.scrollY,w:b.width,h:b.height};})())`));
  if (!info) { console.log('  找不到 ' + sel); return; }
  await wait(420);
  const r = await send('Page.captureScreenshot', {
    format: 'png',
    clip: {
      x: Math.max(0, info.x - pad), y: Math.max(0, info.y - pad),
      width: Math.min(1400, info.w + pad * 2), height: Math.min(1200, info.h + pad * 2), scale: scale || 3
    }
  });
  fs.writeFileSync(path.join(OUT, file), Buffer.from(r.data, 'base64'));
  console.log('    → ' + file + '  (' + Math.round(info.w) + 'x' + Math.round(info.h) + ')');
}

/* 三种样式的 CSS 覆盖（只在浏览器里注入，不改文件） */
const V_BASE = `
  .pg-busy{display:inline-block!important;position:relative;font-size:11.5px!important;font-weight:400!important;
    color:var(--tr-ink)!important;background:none!important;border:0!important;border-radius:0!important;
    padding:0!important;line-height:1.4!important}
  .pg-busy::before{display:none!important}`;
const V_A = '';   /* 就是文件里现在的样子，不覆盖 */
const V_B = `
  .pg-busy{display:inline-block!important;position:relative;font-size:13px!important;font-weight:700!important;
    color:var(--tr)!important;background:none!important;border:0!important;border-left:3px solid var(--tr)!important;
    border-radius:0!important;padding:0 0 0 8px!important;line-height:1.35!important}
  .pg-busy::before{display:none!important}`;

async function applyVariant(css) {
  await ev(`(function(){var s=document.getElementById('__v309');
    if(!s){s=document.createElement('style');s.id='__v309';document.head.appendChild(s);}
    s.textContent=${JSON.stringify(css)};})()`);
  await wait(260);
}

/* 这一帧的几何：任务条总高、药丸盒子、与同行文字的基线关系 */
async function geo() {
  return JSON.parse(await ev(`JSON.stringify((function(){
    var q=function(s){return document.querySelector(s)};
    var r=function(e){var b=e.getBoundingClientRect();return {x:Math.round(b.x),y:Math.round(b.y),w:Math.round(b.width),h:Math.round(b.height)}};
    var busy=q('#pgBusy'), pr=q('#prText'), eta=q('#pgEta'), wrap=q('#progWrap'), row=q('.pg-row');
    var bs=r(busy), ps=r(pr);
    return {wrapH:Math.round(wrap.getBoundingClientRect().height), rowH:Math.round(row.getBoundingClientRect().height),
      busy:bs, pr:ps, busyColor:getComputedStyle(busy).color, busyBg:getComputedStyle(busy).backgroundColor,
      busyFs:getComputedStyle(busy).fontSize, busyFw:getComputedStyle(busy).fontWeight,
      busyDisplay:getComputedStyle(busy).display,
      midDelta:Math.round((bs.y+bs.h/2)-(ps.y+ps.h/2)),
      afterPr:bs.x>ps.x, beforeEta:bs.x<=r(eta).x, aboveProg:bs.y<r(q('#prog')).y};
  })())`));
}

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  console.log('— 起本地服务 :' + SRV + ' —');
  const srv = spawn(process.execPath, ['server.js'], { cwd: ROOT, env: Object.assign({}, process.env, { PORT: String(SRV) }), stdio: 'ignore' });
  await wait(1200);

  const cr = spawn(CHROME, ['--headless=new', '--remote-debugging-port=' + PORT, '--no-sandbox', '--disable-gpu',
    '--host-resolver-rules=MAP * ~NOTFOUND, EXCLUDE 127.0.0.1',
    '--user-data-dir=/tmp/cr-shot309-' + Date.now(), 'about:blank'], { stdio: 'ignore' });
  let list = null;
  for (let i = 0; i < 30; i++) {
    try { list = await new Promise((res, rej) => { http.get({ host: '127.0.0.1', port: PORT, path: '/json/list' }, r => { let d = ''; r.on('data', c => d += c); r.on('end', () => res(d)); }).on('error', rej); }); if (list.includes('webSocketDebuggerUrl')) break; } catch (e) { }
    await wait(300);
  }
  if (!list) { console.log('Chrome 没起来'); srv.kill(); process.exit(2); }
  ws = new WebSocket(JSON.parse(list).find(t => t.type === 'page').webSocketDebuggerUrl, { perMessageDeflate: false });
  await new Promise((res, rej) => { ws.on('open', res); ws.on('error', rej); });
  ws.on('message', d => { const m = JSON.parse(d); if (m.id && pending.has(m.id)) { pending.get(m.id).res(m.result || m); pending.delete(m.id); } });
  await send('Page.enable'); await send('Runtime.enable');
  await send('Emulation.setDeviceMetricsOverride', { width: 1200, height: 900, deviceScaleFactor: 2, mobile: false });

  await send('Page.navigate', { url: 'http://127.0.0.1:' + SRV + '/translate.html' });
  for (let i = 0; i < 60; i++) { try { if (await ev('document.readyState') === 'complete') break; } catch (e) { } await wait(400); }
  await wait(2200);

  /* DIAG：页面真的加载对了才往下量 */
  const D = JSON.parse(await ev('JSON.stringify({href:location.href,core:typeof setSrc,busy:!!document.getElementById("pgBusy")})'));
  console.log('— DIAG —'); console.log('    ' + JSON.stringify(D));
  ok(D.href.indexOf('translate.html') >= 0 && D.core === 'function' && D.busy, '页面/引擎/提醒位都在位', D.href);
  if (!D.busy) { ws.close(); cr.kill(); srv.kill(); process.exit(2); }

  /* 还原用户截图里那一帧：任务条出来、跑态、批进度文本就位 */
  await ev(`(async()=>{
    document.querySelector('#progWrap').classList.add('show');
    $('pgPct').textContent='0%';
    $('prText').textContent='第 1/1 批（句组 1–8）…';
    $('pgState').textContent='翻译中';
    getComputedStyle(document.querySelector('#progWrap')).display;})()`);
  await wait(300);

  console.log('— ① 现状（纯粉字，v0.9.297 起）—');
  await applyVariant(V_BASE);
  await ev('pgBusy(true)'); await wait(300);
  const g0 = await geo();
  console.log('    ' + JSON.stringify({ wrapH: g0.wrapH, busy: g0.busy, fs: g0.busyFs, color: g0.busyColor, bg: g0.busyBg }));
  await shot('309-提醒-现状.png', '#progWrap', 10, 3);

  console.log('— ② 方案 A：小药丸（文件里现在的样子）—');
  await applyVariant(V_A);
  await wait(300);
  const g1 = await geo();
  console.log('    ' + JSON.stringify({ wrapH: g1.wrapH, busy: g1.busy, fs: g1.busyFs, fw: g1.busyFw, color: g1.busyColor, bg: g1.busyBg, midDelta: g1.midDelta }));
  /* ⚠️ .pg-row 是 flex，子项的 inline-block 会被块化成 block —— 实测值就是 block，不是写错 */
  ok(g1.busyDisplay === 'block', 'A：药丸样式生效（flex 子项块化后是 block）', g1.busyDisplay);
  ok(g1.busyBg !== 'rgba(0, 0, 0, 0)', 'A：浅粉底铺上了（不再是无底色文字）', g1.busyBg);
  ok(g1.busyFw === '600', 'A：加粗到 600', g1.busyFw);
  ok(Math.abs(g1.midDelta) <= 3, 'A：和同行文字（第 1/1 批）中线基本齐平，没上下错位', 'Δ' + g1.midDelta + 'px');
  ok(g1.afterPr && g1.beforeEta && g1.aboveProg, 'A：位置没变（仍在「第 x/y 批」之后、ETA 之前、进度条之上）');
  ok(g1.wrapH - g0.wrapH <= 6, 'A：任务条只高了 ' + (g1.wrapH - g0.wrapH) + 'px（262 起刻意瘦身过，别反弹）', g1.wrapH + ' vs ' + g0.wrapH);
  await shot('309-提醒-方案A-药丸.png', '#progWrap', 10, 3);
  await shot('309-提醒-方案A-全景.png', '.center', 6, 2);

  console.log('— ③ 备选 B：无底色、加大加粗 + 左侧竖条 —');
  await applyVariant(V_B);
  await wait(300);
  const g2 = await geo();
  console.log('    ' + JSON.stringify({ wrapH: g2.wrapH, busy: g2.busy, fs: g2.busyFs, color: g2.busyColor, bg: g2.busyBg, midDelta: g2.midDelta }));
  await shot('309-提醒-备选B-竖条.png', '#progWrap', 10, 3);

  console.log('— ④ 收工后摘不摘得掉（A 的 [hidden] 有没有被 display 盖掉）—');
  await applyVariant(V_A);
  await ev('pgBusy(false)'); await wait(260);
  const h = JSON.parse(await ev(`JSON.stringify((function(){var e=document.getElementById('pgBusy');
    return {hidden:e.hidden, display:getComputedStyle(e).display, visible:!!(e.offsetWidth||e.offsetHeight)};})())`));
  ok(h.hidden === true && h.display === 'none' && !h.visible, 'A：收工后真的藏住了（[hidden] 没被 display:inline-block 盖掉）', JSON.stringify(h));
  await ev('pgBusy(true)'); await wait(200);
  const h2 = JSON.parse(await ev(`JSON.stringify((function(){var e=document.getElementById('pgBusy');
    return {hidden:e.hidden, display:getComputedStyle(e).display};})())`));
  ok(h2.hidden === false && h2.display !== 'none' && h2.display !== 'inline', 'A：再开一轮又露出来', JSON.stringify(h2));

  console.log('— ⑤ 窄屏（390px）会不会被截断 —');
  /* 药丸比原来的纯文字宽约 40px，窄屏是要重点看的一档（298 有「完整可见不截断」的老断言） */
  await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 900, deviceScaleFactor: 2, mobile: true });
  await wait(500);
  const n = JSON.parse(await ev(`JSON.stringify((function(){var e=document.getElementById('pgBusy');
    return {hidden:e.hidden, scrollW:e.scrollWidth, clientW:e.clientWidth,
      clipped:e.scrollWidth>e.clientWidth+1, wrapH:Math.round(document.getElementById('progWrap').getBoundingClientRect().height)};})())`));
  ok(!n.clipped, 'A：窄屏下那句话完整可见、没被右边缘吃掉', JSON.stringify(n));
  /* ⚠️ 切 metrics 后 reflow + sticky 会挪位置，clip 用旧坐标会裁出一片空白（试过两次都白图）；
     窄屏直接拍整视口，药丸折行后的样子反而看得更全。 */
  await ev(`document.getElementById('progWrap').scrollIntoView({block:'center'})`);
  await wait(700);
  {
    const info = JSON.parse(await ev(`JSON.stringify((function(){var b=document.getElementById('progWrap').getBoundingClientRect();
      return {x:Math.round(b.x),y:Math.round(b.y),w:Math.round(b.width),h:Math.round(b.height),scrollY:window.scrollY};})())`));
    console.log('    窄屏任务条实测: ' + JSON.stringify(info) + '（药丸折到第二行）');
    const r = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
    fs.writeFileSync(path.join(OUT, '309-提醒-方案A-窄屏.png'), Buffer.from(r.data, 'base64'));
    console.log('    → 309-提醒-方案A-窄屏.png  (整视口 390px)');
  }

  console.log('\n_shot309: ' + P + ' 通过 / ' + F + ' 失败');
  ws.close(); cr.kill(); srv.kill();
  process.exit(F ? 1 : 0);
})().catch(e => { console.log('FATAL', e.message); process.exit(2); });
