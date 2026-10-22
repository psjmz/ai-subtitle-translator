/* 补跑 live297 第⑨段（手机不塌 + 三张截图）。
   主脚本 ①–⑧ 已全绿；⑨ 因老页残留导航挂死，修好后单独补这一段。 */
'use strict';
process.on('unhandledRejection', (e) => { console.log('UNHANDLED ' + (e && e.message)); process.exit(1); });
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');
const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PORT = 9400 + Math.floor(Math.random() * 90), SITE = 'https://ai-srtsub.com';
const OUT = '/Users/jp/WorkBuddy/2026-09-04-00-29-54';
const wait = ms => new Promise(r => setTimeout(r, ms));
let PASS = 0, FAIL = 0, ws, tid = 0;
const pending = new Map();
const ok = (c, n, x) => { console.log((c ? '  ✓ ' : '  ✗ ') + n + (x !== undefined ? '  [' + String(x).slice(0, 140) + ']' : '')); c ? PASS++ : FAIL++; };
function send(m, p) {
  const id = ++tid; ws.send(JSON.stringify({ id, method: m, params: p || {} }));
  return new Promise((res, rej) => { pending.set(id, { res, rej }); setTimeout(() => { if (pending.has(id)) { pending.delete(id); rej(new Error('timeout ' + m)); } }, 40000); });
}
async function ev(e) {
  const r = await send('Runtime.evaluate', { expression: e, returnByValue: true, awaitPromise: true });
  if (r.exceptionDetails) throw new Error(r.exceptionDetails.text + ' :: ' + JSON.stringify(r.exceptionDetails.exception || {}).slice(0, 200));
  return r.result.value;
}
async function goto(u) {
  await send('Page.navigate', { url: 'about:blank' }); await wait(200);
  await send('Page.navigate', { url: u });
  for (let i = 0; i < 60; i++) { try { if (await ev('document.readyState') === 'complete') break; } catch (e) { } await wait(400); }
  await wait(2500);
}
async function metric(w, h) { await send('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: 1, mobile: w < 500 }); await wait(400); }
async function shot(name) {
  const r = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(OUT + '/' + name, Buffer.from(r.data, 'base64'));
}
(async () => {
  const dir = fs.mkdtempSync('/tmp/live297b-');
  const ch = spawn(CHROME, ['--headless=new', '--disable-gpu', '--no-sandbox',
    '--proxy-server=http://127.0.0.1:7897', '--remote-debugging-port=' + PORT,
    '--user-data-dir=' + dir, 'about:blank'], { stdio: 'ignore' });
  await wait(3000);
  let list = null;
  for (let i = 0; i < 30; i++) {
    try {
      list = await new Promise((res, rej) => http.get({ host: '127.0.0.1', port: PORT, path: '/json/list' }, r => {
        let d = ''; r.on('data', c => d += c); r.on('end', () => res(JSON.parse(d)));
      }).on('error', rej));
      const pg = list.filter(t => t.type === 'page' && t.url !== 'about:blank');
      if (pg.length && pg[0].url.startsWith('https://ai-srtsub.com')) break;
      if (pg.length) break;
    } catch (e) { }
    await wait(600);
  }
  const target = list.find(t => t.type === 'page');
  if (!target) throw new Error('没有页面目标');
  ws = new WebSocket(target.webSocketDebuggerUrl, { perMessageDeflate: false, maxPayload: 2e8 });
  await new Promise((res, rej) => { ws.on('open', res); ws.on('error', rej); });
  ws.on('message', s => {
    let m; try { m = JSON.parse(s); } catch (e) { return; }
    if (m.id && pending.has(m.id)) { const p = pending.get(m.id); pending.delete(m.id); m.error ? p.rej(new Error(JSON.stringify(m.error))) : p.res(m.result); }
  });
  await send('Page.enable'); await send('Runtime.enable');

  console.log('─── ⑨ 手机上看不塌（补跑）───');
  await goto(SITE + '/translate.html');
  ok(await ev(`typeof pgStart`) === 'function', '确实回到了工作台（pgStart 在）');
  await metric(390, 844); await wait(700);
  await ev(`(function(){var a=document.querySelectorAll('aside.panel');if(a[1])a[1].scrollIntoView();})();1`); await wait(400);
  ok(await ev(`document.documentElement.scrollWidth <= window.innerWidth + 1`) === true, '窄屏没有横向滚动',
    await ev(`document.documentElement.scrollWidth + '/' + window.innerWidth`));
  await shot('workbench-297-mobile.png');
  await metric(1440, 900); await wait(700);
  await ev(`(function(){window.scrollTo(0,0);})();1`); await wait(300);
  await shot('workbench-297-desktop.png');
  await ev(`pgStart();setProg(37,true);document.getElementById('prText').textContent='Batch 3/12';1`); await wait(500);
  ok(await ev(`!document.getElementById('pgBusy').hidden`) === true, '跑起来时提醒还在');
  await shot('workbench-297-running.png');

  console.log('\n== ' + PASS + ' 通过 / ' + FAIL + ' 失败 ==');
  ch.kill('SIGKILL');
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.log('FATAL ' + e.message); process.exit(1); });
