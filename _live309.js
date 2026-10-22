/* v0.9.309 外网真浏览器：线上 translate.html 那句「AI 算力紧张…」到底是不是药丸
   由 _live308.js 派生，三处必改：
     ① Chrome 不设代理（ai-srtsub 在国内直连可达；挂代理反而整页 chrome-error）
     ② URL 换 https://ai-srtsub.com，加载用轮询 readyState + 再等 3s
     ③ 语言三件套（--lang / setLocaleOverride / navigator.language）
   ⚠️ 本探针**只读**：不开跑翻译、不登录后台、不往服务端写任何东西，
      只是把任务条挂出来（同 _shot309.js 的手法）量计算样式。 */
'use strict';
process.on('unhandledRejection', () => { });
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');
const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PORT = 9730 + Math.floor(Math.random() * 60);
const BASE = 'https://ai-srtsub.com';
const OUT = '/Users/jp/WorkBuddy/2026-09-04-00-29-54/outputs';
const wait = ms => new Promise(r => setTimeout(r, ms));
let ws, tid = 0; const pending = new Map();
function send(m, p) { const id = ++tid; ws.send(JSON.stringify({ id, method: m, params: p || {} })); return new Promise((res, rej) => { pending.set(id, { res, rej }); setTimeout(() => { if (pending.has(id)) { pending.delete(id); rej(new Error('timeout ' + m)); } }, 40000); }); }
async function ev(e) { const r = await send('Runtime.evaluate', { expression: e, returnByValue: true, awaitPromise: true }); if (r.exceptionDetails) return '__ERR__' + r.exceptionDetails.text; return r.result.value; }
let P = 0, F = 0;
const ok = (c, n, x) => { console.log((c ? '  ✓ ' : '  ✗ ') + n + (x !== undefined ? '  [' + String(x).slice(0, 160) + ']' : '')); c ? P++ : F++; };

(async () => {
  const cr = spawn(CHROME, ['--headless=new', '--remote-debugging-port=' + PORT, '--no-sandbox', '--disable-gpu',
    '--lang=zh-CN',
    '--user-data-dir=/tmp/cr-live309-' + Date.now(), 'about:blank'], { stdio: 'ignore' });
  let list = null;
  for (let i = 0; i < 30; i++) {
    try { list = await new Promise((res, rej) => { http.get({ host: '127.0.0.1', port: PORT, path: '/json/list' }, r => { let d = ''; r.on('data', c => d += c); r.on('end', () => res(d)); }).on('error', rej); }); if (list.includes('webSocketDebuggerUrl')) break; } catch (e) { }
    await wait(300);
  }
  ws = new WebSocket(JSON.parse(list).find(t => t.type === 'page').webSocketDebuggerUrl, { perMessageDeflate: false });
  await new Promise((res, rej) => { ws.on('open', res); ws.on('error', rej); });
  ws.on('message', d => { const m = JSON.parse(d); if (m.id && pending.has(m.id)) { pending.get(m.id).res(m.result || m); pending.delete(m.id); } });
  await send('Page.enable'); await send('Runtime.enable'); await send('Network.enable');
  await send('Network.setCacheDisabled', { cacheDisabled: true });
  await send('Emulation.setDeviceMetricsOverride', { width: 1280, height: 1000, deviceScaleFactor: 2, mobile: false });
  await send('Emulation.setLocaleOverride', { locale: 'zh-CN' });
  await send('Page.addScriptToEvaluateOnNewDocument', {
    source: "try{Object.defineProperty(navigator,'language',{get:function(){return 'zh-CN'}});Object.defineProperty(navigator,'languages',{get:function(){return ['zh-CN','en']}});}catch(e){}"
  });

  await send('Page.navigate', { url: BASE + '/translate.html' });
  for (let i = 0; i < 80; i++) { try { if ((await ev('document.readyState')) === 'complete') break; } catch (e) { } await wait(400); }
  await wait(3000);

  console.log('— DIAG（先自证加载对了，再往下量）—');
  const D = JSON.parse(await ev(`JSON.stringify({href:location.href, ready:document.readyState,
    core:typeof window.SrtCore, setSrc:typeof setSrc, pgBusy:typeof pgBusy,
    tip:document.getElementById('pgBusy')?document.getElementById('pgBusy').textContent:'(无)',
    lang:navigator.language})`));
  console.log('    ' + JSON.stringify(D));
  ok(D.href.indexOf('ai-srtsub.com/translate.html') >= 0 && D.ready === 'complete', '线上工作台加载完成', D.href);
  ok(D.core === 'object' && D.setSrc === 'function' && D.pgBusy === 'function', '引擎与 pgBusy 开关在（页面真的跑起来了）');
  ok(D.tip === 'AI 算力紧张，等一会就出结果了', '中文提醒文案对（语言三件套生效）', D.tip);
  if (D.pgBusy !== 'function') { console.log('DIAG 不对，到此为止'); ws.close(); cr.kill(); process.exit(2); }

  console.log('— 把任务条挂出来，量线上的计算样式 —');
  const M = JSON.parse(await ev(`(async()=>{
    document.querySelector('#progWrap').classList.add('show');
    $('pgPct').textContent='0%'; $('prText').textContent='第 1/1 批（句组 1–8）…'; $('pgState').textContent='翻译中';
    var e=document.getElementById('pgBusy');
    var hidden0=e.hidden, disp0=getComputedStyle(e).display;
    pgBusy(true); await new Promise(r=>setTimeout(r,260));
    var cs=getComputedStyle(e), b=e.getBoundingClientRect();
    var out={hidden0:hidden0, disp0:disp0,
      display:cs.display, color:cs.color, bg:cs.backgroundColor, fs:cs.fontSize, fw:cs.fontWeight,
      radius:cs.borderRadius, border:cs.borderLeftWidth+' '+cs.borderLeftColor,
      w:Math.round(b.width), h:Math.round(b.height),
      wrapH:Math.round(document.getElementById('progWrap').getBoundingClientRect().height),
      ver:(document.querySelector('.ver-tag')||{}).textContent||''};
    pgBusy(false); await new Promise(r=>setTimeout(r,260));
    out.hiddenEnd=e.hidden; out.dispEnd=getComputedStyle(e).display;
    return JSON.stringify(out);})()`));
  console.log('    ' + JSON.stringify(M));
  ok(M.hidden0 === true && M.disp0 === 'none', '没开跑时是藏着的（[hidden] 生效）', M.disp0);
  ok(M.bg === 'rgb(253, 241, 246)', '线上铺上了浅粉底 --tr-weak #FDF1F6（不再是纯文字）', M.bg);
  ok(M.fw === '600', '线上字重 600', M.fw);
  ok(M.color === 'rgb(192, 33, 89)', '字色仍是品牌粉 --tr-ink', M.color);
  ok(M.radius === '99px', '药丸圆角在', M.radius);
  ok(M.border.indexOf('1px') === 0, '同色描边在', M.border);
  ok(M.w > 180 && M.h >= 20 && M.h <= 26, '药丸盒子 ' + M.w + '×' + M.h + '（本地实测 205×22）', M.w + 'x' + M.h);
  ok(M.wrapH <= 60, '任务条总高 ' + M.wrapH + 'px（没被药丸撑高）', M.wrapH);
  ok(M.hiddenEnd === true && M.dispEnd === 'none', '收工后照样摘掉（[hidden] 守卫在线上也在）', M.dispEnd);
  ok(M.ver === 'v0.9.309', '线上页脚版号是 309', M.ver);

  /* 拍一张线上实拍（页面坐标裁，和 _shot309 同一手法） */
  await ev(`(async()=>{document.querySelector('#progWrap').classList.add('show');
    $('pgPct').textContent='0%'; $('prText').textContent='第 1/1 批（句组 1–8）…';
    $('pgState').textContent='翻译中'; pgBusy(true); await new Promise(r=>setTimeout(r,400));})()`);
  await wait(700);
  const info = JSON.parse(await ev(`JSON.stringify((function(){var b=document.getElementById('progWrap').getBoundingClientRect();
    return {x:b.x,y:b.y+window.scrollY,w:b.width,h:b.height};})())`));
  const r = await send('Page.captureScreenshot', {
    format: 'png', clip: { x: Math.max(0, info.x - 10), y: Math.max(0, info.y - 10), width: Math.min(1400, info.w + 20), height: Math.min(900, info.h + 20), scale: 3 }
  });
  fs.writeFileSync(OUT + '/live309-提醒-药丸.png', Buffer.from(r.data, 'base64'));
  console.log('    → live309-提醒-药丸.png');

  console.log('\n_live309: ' + P + ' 通过 / ' + F + ' 失败');
  ws.close(); cr.kill();
  process.exit(F ? 1 : 0);
})().catch(e => { console.log('FATAL', e.message); process.exit(2); });
