/* 只看一眼：新文案在右栏里长什么样（1440 桌面 + 1000 窄屏各一张） */
'use strict';
process.on('unhandledRejection', () => { });
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');
const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PORT = 9363, BASE = 'http://127.0.0.1:3098';
const wait = ms => new Promise(r => setTimeout(r, ms));
let ws, tid = 0; const pending = new Map();
function send(m, p) { const id = ++tid; ws.send(JSON.stringify({ id, method: m, params: p || {} })); return new Promise((res, rej) => { pending.set(id, { res, rej }); setTimeout(() => { if (pending.has(id)) { pending.delete(id); rej(new Error('timeout ' + m)); } }, 20000); }); }
async function ev(e) { const r = await send('Runtime.evaluate', { expression: e, returnByValue: true, awaitPromise: true }); if (r.exceptionDetails) throw new Error(r.exceptionDetails.text); return r.result.value; }
async function goto(u) { await send('Page.navigate', { url: 'about:blank' }); await wait(200); await send('Page.navigate', { url: u }); for (let i = 0; i < 40; i++) { try { if (await ev('document.readyState') === 'complete') break; } catch (e) { } await wait(300); } await wait(1500); }
async function snap(w, h, file) {
  await send('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: 2, mobile: false }); await wait(700);
  await ev(`document.querySelector('#donateBox').scrollIntoView({block:'center'})`); await wait(700);
  const info = JSON.parse(await ev(`JSON.stringify((function(){var b=document.querySelector('#btnDonate').getBoundingClientRect(),p=document.querySelector('#donateBox').getBoundingClientRect();
    return {sy:Math.round(window.scrollY),btnY:Math.round(b.y),btnX:Math.round(b.x),btnW:Math.round(b.width),btnH:Math.round(b.height),boxW:Math.round(p.width)};})())`));
  /* 裁切一律以按钮自己的 rect 为准（文档坐标 = 视口坐标 + scrollY），别用 panel.left 推 */
  const r = await send('Page.captureScreenshot', { format: 'png', clip: { x: Math.max(0, info.btnX - 30), y: Math.max(0, info.sy + info.btnY - 40), width: Math.min(w, info.btnW + 60), height: Math.min(180, info.btnH + 80), scale: 2 } });
  fs.writeFileSync(file, Buffer.from(r.data, 'base64'));
  console.log('  ' + file + '  ' + JSON.stringify(info));
}
(async () => {
  const chrome = spawn(CHROME, ['--headless=new', '--remote-debugging-port=' + PORT, '--no-sandbox', '--disable-gpu', '--remote-allow-origins=*', '--window-size=1440,1000', '--no-proxy-server', '--user-data-dir=/tmp/cbuddy-shot281-' + Date.now()], { stdio: 'ignore' });
  let list = null;
  for (let i = 0; i < 20 && !list; i++) { await wait(1000); list = await new Promise(res => { const q = http.get('http://127.0.0.1:' + PORT + '/json/list', r => { let b = ''; r.on('data', d => b += d); r.on('end', () => res(JSON.parse(b))); }); q.on('error', () => res(null)); }); }
  ws = new WebSocket(list.find(t => t.type === 'page').webSocketDebuggerUrl, { perMessageDeflate: false });
  ws.on('message', raw => { const o = JSON.parse(raw); if (o.id && pending.has(o.id)) { const p = pending.get(o.id); pending.delete(o.id); (o.error ? p.rej(new Error(o.error.message)) : p.res(o.result)); } });
  await new Promise(r => ws.on('open', r));
  await send('Runtime.enable'); await send('Page.enable');
  await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1000, deviceScaleFactor: 2, mobile: false });
  await goto(BASE + '/translate.html');
  await ev(`(function(){var k='srtTool',o={};try{o=JSON.parse(localStorage.getItem(k)||'{}')||{}}catch(e){o={}};o.uiLang='zh-CN';o.langManual=1;localStorage.setItem(k,JSON.stringify(o));})()`);
  await goto(BASE + '/translate.html');
  console.log('— 桌面 1440（右栏 320，文案折两行）—');
  await snap(1440, 1000, '/tmp/shot281-1440.png');
  console.log('— 窄屏 1000（右栏变全宽，回单行）—');
  await snap(1000, 900, '/tmp/shot281-1000.png');
  /* 展开态：二维码 + 「图个快乐，多少随意」 */
  await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1000, deviceScaleFactor: 2, mobile: false }); await wait(600);
  await ev(`document.querySelector('#btnDonate').click()`); await wait(800);
  await ev(`document.querySelector('#donateBox').scrollIntoView({block:'center'})`); await wait(600);
  const info2 = JSON.parse(await ev(`JSON.stringify((function(){var b=document.querySelector('#donateBox').getBoundingClientRect();return {y:b.y+window.scrollY,x:b.x,w:b.width,h:b.height};})())`));
  const r2 = await send('Page.captureScreenshot', { format: 'png', clip: { x: Math.max(0, info2.x - 20), y: Math.max(0, info2.y - 10), width: Math.min(1440, info2.w + 40), height: Math.min(460, info2.h + 20), scale: 2 } });
  fs.writeFileSync('/tmp/shot281-open.png', Buffer.from(r2.data, 'base64'));
  console.log('  /tmp/shot281-open.png');
  ws.close(); chrome.kill(); process.exit(0);
})().catch(e => { console.error('崩了', e.message); process.exit(1); });
