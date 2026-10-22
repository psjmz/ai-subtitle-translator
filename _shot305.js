/* 只看一眼：形态 B 的一对在列表里到底长什么样（用户说「没看出来竖线」） */
'use strict';
process.on('unhandledRejection', () => { });
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');
const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PORT = 9600 + Math.floor(Math.random() * 90);
const SRV = Number(process.env.SRV || 3513);
const wait = ms => new Promise(r => setTimeout(r, ms));
let ws, tid = 0; const pending = new Map();
function send(m, p) { const id = ++tid; ws.send(JSON.stringify({ id, method: m, params: p || {} })); return new Promise((res, rej) => { pending.set(id, { res, rej }); setTimeout(() => { if (pending.has(id)) { pending.delete(id); rej(new Error('timeout ' + m)); } }, 30000); }); }
async function ev(e) { const r = await send('Runtime.evaluate', { expression: e, returnByValue: true, awaitPromise: true }); if (r.exceptionDetails) throw new Error(r.exceptionDetails.text); return r.result.value; }

const SRT = [
  '1', '00:00:01,000 --> 00:00:02,800', 'This is sentence number one.', '',
  '2', '00:00:01,000 --> 00:00:02,800', '这是第一句话。', '',
  '3', '00:00:03,000 --> 00:00:04,800', 'This is sentence number two.', '',
  '4', '00:00:03,000 --> 00:00:04,800', '这是第二句话。', '',
  '5', '00:00:05,000 --> 00:00:06,800', 'This is sentence number three.', '',
  '6', '00:00:05,000 --> 00:00:06,800', '这是第三句话。', ''
].join('\n');

async function clipShot(file, sel, pad) {
  const info = JSON.parse(await ev(`JSON.stringify((function(){var e=document.querySelector('${sel}');if(!e)return null;e.scrollIntoView({block:'center'});var b=e.getBoundingClientRect();return {x:b.x,y:b.y+window.scrollY,w:b.width,h:b.height};})())`));
  if (!info) { console.log('  找不到 ' + sel); return; }
  await wait(600);
  const r = await send('Page.captureScreenshot', {
    format: 'png',
    clip: { x: Math.max(0, info.x - pad), y: Math.max(0, info.y - pad), width: Math.min(1440, info.w + pad * 2), height: Math.min(700, info.h + pad * 2), scale: 2 }
  });
  fs.writeFileSync(file, Buffer.from(r.data, 'base64'));
  console.log('  ' + file + '  ' + JSON.stringify(info));
}

(async () => {
  const cr = spawn(CHROME, ['--headless=new', '--remote-debugging-port=' + PORT, '--no-sandbox', '--disable-gpu',
    '--host-resolver-rules=MAP * ~NOTFOUND, EXCLUDE 127.0.0.1',
    '--user-data-dir=/tmp/cr-shot305-' + Date.now(), 'about:blank'], { stdio: 'ignore' });
  let list = null;
  for (let i = 0; i < 30; i++) {
    try { list = await new Promise((res, rej) => { http.get({ host: '127.0.0.1', port: PORT, path: '/json/list' }, r => { let d = ''; r.on('data', c => d += c); r.on('end', () => res(d)); }).on('error', rej); }); if (list.includes('webSocketDebuggerUrl')) break; } catch (e) { }
    await wait(300);
  }
  ws = new WebSocket(JSON.parse(list).find(t => t.type === 'page').webSocketDebuggerUrl, { perMessageDeflate: false });
  await new Promise((res, rej) => { ws.on('open', res); ws.on('error', rej); });
  ws.on('message', d => { const m = JSON.parse(d); if (m.id && pending.has(m.id)) { pending.get(m.id).res(m.result || m); pending.delete(m.id); } });
  await send('Page.enable'); await send('Runtime.enable');
  await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1200, deviceScaleFactor: 2, mobile: false });
  await send('Page.navigate', { url: 'http://127.0.0.1:' + SRV + '/shift.html' });
  for (let i = 0; i < 60; i++) { try { if ((await ev('document.readyState')) === 'complete') break; } catch (e) { } await wait(400); }
  await wait(1200);

  await ev('setSrc(' + JSON.stringify(SRT) + ', "bil.srt")');
  await wait(300);
  await ev("$('#btnGo').click()");
  await wait(800);

  console.log('— 现状：同轴的一对 —');
  console.log(JSON.stringify(await ev(`JSON.stringify({pg:document.querySelectorAll('#list .pg').length, li:document.querySelectorAll('#list .li').length})`)));
  await clipShot('/tmp/s305-now.png', '#list', 8);

  /* 把第 1 条结束时间往后挪 800ms，看「已不同轴」提示 */
  await ev("(function(){var b=document.querySelector('#list .pg .li input[data-e]');b.value='00:00:03,600';b.dispatchEvent(new Event('change',{bubbles:true}));})()");
  await wait(700);
  console.log('— 调开后 —');
  console.log(JSON.stringify(await ev(`JSON.stringify({pnote:document.querySelectorAll('#list .pnote').length, txt:(document.querySelector('#list .pnote .pn')||{}).textContent})`)));
  await clipShot('/tmp/s305-off.png', '#list', 8);

  ws.close(); cr.kill(); process.exit(0);
})().catch(e => { console.error('崩了', e.message); process.exit(1); });
