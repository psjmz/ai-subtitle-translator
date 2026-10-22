/* v0.9.278：首页 hero 标题的候选版式 —— 真浏览器渲染 + 截图，给人眼挑。
   不写文件、不改源码，只在页面里临时改 DOM 再拍。
   四个版本：
     0 现状（字幕的活儿，／交给 AI，紫 #7C4DDB，三个 emoji 装饰）
     A 单行 · 主色点缀（去逗号悬挂）
     B 两行对句 · 去逗号
     C 短标题 · 单行
   A/B/C 统一：撤掉 ✨🎬💜 三个 emoji 装饰（全站禁 emoji，且 💜 会压住副标题），
   强调色从 #7C4DDB 换成站点主色 #D4206A。 */
'use strict';
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');
const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PORT = 9349, BASE = 'http://127.0.0.1:3098';
const wait = ms => new Promise(r => setTimeout(r, ms));
let ws, tid = 0; const pending = new Map();
function send(method, params, sessionId) {
  const id = ++tid; const msg = { id, method, params: params || {} };
  if (sessionId) msg.sessionId = sessionId;
  ws.send(JSON.stringify(msg));
  return new Promise((res, rej) => {
    pending.set(id, { res, rej });
    setTimeout(() => { if (pending.has(id)) { pending.delete(id); rej(new Error('timeout ' + method)); } }, 25000);
  });
}
async function ev(expr) {
  const r = await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true });
  if (r.exceptionDetails) throw new Error(r.exceptionDetails.text + ' ' + ((r.exceptionDetails.exception || {}).description || ''));
  return r.result.value;
}
async function goto(url) {
  await send('Page.navigate', { url: 'about:blank' });
  await wait(250);
  await send('Page.navigate', { url });
  for (let i = 0; i < 40; i++) { try { if (await ev('document.readyState') === 'complete') break; } catch (e) { } await wait(500); }
  await wait(1800);
}
async function shotHero(file) {
  await ev(`document.querySelector('.hero').scrollIntoView({block:'center'})`);
  await wait(600);
  const r = JSON.parse(await ev(`JSON.stringify((function(){var b=document.querySelector('.hero').getBoundingClientRect();
    return {y:Math.max(0,b.y+window.scrollY-10), h:b.height+20};})())`));
  const rr = await send('Page.captureScreenshot', { format: 'png', clip: { x: 0, y: r.y, width: 1440, height: Math.min(Math.max(r.h, 120), 900), scale: 1 } });
  fs.writeFileSync(file, Buffer.from(rr.data, 'base64'));
  return file;
}
/* 在页面里套用某一版：titleHtml 是 h1 的 innerHTML */
const APPLY = (titleHtml, keepSparks, emColor) => `(function(){
  document.querySelectorAll('.hero .spark').forEach(function(s){ s.style.display = ${keepSparks ? "''" : "'none'"}; });
  document.querySelector('.hero h1').innerHTML = ${JSON.stringify(titleHtml)};
  var em=document.querySelector('.hero h1 em');
  if(em) em.style.color=${JSON.stringify(emColor)};
  return document.querySelector('.hero h1').innerText.replace(/\\n/g,' | ');
})()`;

(async () => {
  const chrome = spawn(CHROME, [
    '--headless=new', '--remote-debugging-port=' + PORT, '--no-sandbox', '--disable-gpu',
    '--remote-allow-origins=*', '--window-size=1440,1200', '--no-proxy-server',
    '--user-data-dir=/tmp/cbuddy-hero278-' + Date.now()
  ], { stdio: 'ignore' });
  let list = null;
  for (let i = 0; i < 20 && !list; i++) {
    await wait(1000);
    list = await new Promise(res => {
      const q = http.get('http://127.0.0.1:' + PORT + '/json/list', r => { let b = ''; r.on('data', d => b += d); r.on('end', () => res(JSON.parse(b))); });
      q.on('error', () => res(null));
    });
  }
  if (!list) { console.log('Chrome 起不来'); process.exit(1); }
  const target = list.find(t => t.type === 'page');
  ws = new WebSocket(target.webSocketDebuggerUrl, { maxPayload: 256 * 1024 * 1024 });
  ws.on('message', m => {
    const o = JSON.parse(m);
    if (o.id && pending.has(o.id)) { const p = pending.get(o.id); pending.delete(o.id); o.error ? p.rej(new Error(o.error.message)) : p.res(o.result); }
  });
  await new Promise(r => ws.on('open', r));
  await send('Page.enable'); await send('Runtime.enable');

  await goto(BASE + '/');
  console.log('  现状 →', await shotHero('/tmp/hero278-0-now.png'));

  const VAR = [
    ['A', '字幕的活儿，<em>交给 AI</em>', '/tmp/hero278-A-oneline.png'],
    ['B', '字幕的活儿<br><em>交给 AI</em>', '/tmp/hero278-B-twoline.png'],
    ['C', '字幕，<em>交给 AI</em>', '/tmp/hero278-C-short.png'],
  ];
  for (const [tag, html, file] of VAR) {
    const txt = await ev(APPLY(html, false, '#D4206A'));
    await wait(400);
    console.log('  ' + tag + ' [' + txt + '] → ' + await shotHero(file));
  }
  /* 顺带量一下：单行版会不会折行（折了就不是「单行」了） */
  const wrap = JSON.parse(await ev(`JSON.stringify((function(){
    document.querySelector('.hero h1').innerHTML = '字幕的活儿，<em>交给 AI</em>';
    var h=document.querySelector('.hero h1');
    var lh=parseFloat(getComputedStyle(h).lineHeight);
    return { lines: Math.round(h.getBoundingClientRect().height/lh), lineHeight: lh, width: Math.round(h.getBoundingClientRect().width) };
  })())`));
  console.log('  单行实测：行数 ' + wrap.lines + '，行高 ' + wrap.lineHeight + 'px，标题块宽 ' + wrap.width + 'px');
  ws.close(); chrome.kill();
  process.exit(0);
})().catch(e => { console.log('炸了：' + e.message); process.exit(1); });
