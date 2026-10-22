/* _shotqc322.js —— v0.9.322 截图（非交付件）
   ① 画面方向三档：同一个 choose card 在横屏/方形/竖屏下的行宽
   ② 双语字幕跑完修复后，原文与译文各自成行 */
'use strict';
process.on('unhandledRejection', e => { console.log('UNHANDLED', e && e.message); });
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');
const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const ROOT = '/Users/jp/WorkBuddy/2026-09-04-00-29-54/srt-translator';
const OUT = '/Users/jp/WorkBuddy/2026-09-04-00-29-54/outputs-322';
const SRV = 3950 + Math.floor(Math.random() * 30);
const PORT = 9985 + Math.floor(Math.random() * 10);
const wait = ms => new Promise(r => setTimeout(r, ms));
try { fs.mkdirSync(OUT, { recursive: true }); } catch (e) { }

const srv = spawn(process.execPath, ['server.js'], {
  cwd: ROOT, env: Object.assign({}, process.env, { PORT: String(SRV), PUBLIC_URL: 'http://127.0.0.1:' + SRV }), stdio: 'ignore'
});
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
/* ⚠️ 只截某个元素：整视口拍下来信息太散。clip 用页面坐标 */
async function shotEl(name, sel) {
  const box = await ev('(function(){var e=document.querySelector("' + sel + '");if(!e)return null;var r=e.getBoundingClientRect();return {x:r.x+window.scrollX,y:r.y+window.scrollY,w:r.width,h:r.height}})()');
  if (!box) { console.log('  找不到 ' + sel); return; }
  const r = await send('Page.captureScreenshot', {
    format: 'png',
    clip: { x: Math.max(0, box.x - 8), y: Math.max(0, box.y - 8), width: box.w + 16, height: box.h + 16, scale: 2 }
  });
  fs.writeFileSync(OUT + '/' + name, Buffer.from(r.data, 'base64'));
  console.log('  写出 ' + OUT + '/' + name);
}

(async () => {
  await wait(1500);
  /* 双语 A 形态：两行都够长（足够触发「讲故事」的 covid 行长冲突） */
  const BI = [
    '1', '00:00:01,000 --> 00:00:04,000',
    'This is a very long English line that definitely exceeds the limit',
    '这是一句同样很长很长很长很长很长的中文,逗号是半角',
    '', '2', '00:00:04,000 --> 00:00:07,000',
    'Short one here', '短句在这边', '', ''
  ].join('\n');
  const f = '/tmp/_qc322_shot.srt';
  fs.writeFileSync(f, BI);

  const chrome = spawn(CHROME, ['--headless=new', '--remote-debugging-port=' + PORT, '--no-sandbox', '--disable-gpu',
    '--host-resolver-rules=MAP * ~NOTFOUND, EXCLUDE 127.0.0.1',
    '--lang=zh-CN', '--user-data-dir=/tmp/crshot322-' + Date.now(), 'about:blank'], { stdio: 'ignore' });
  await wait(2000);
  let tgt = null;
  for (let i = 0; i < 30 && !tgt; i++) {
    try {
      const r = await new Promise((res, rej) => { const q = http.get({ host: '127.0.0.1', port: PORT, path: '/json/list' }, s => { let d = ''; s.on('data', c => d += c); s.on('end', () => res(JSON.parse(d))); }); q.on('error', rej); q.setTimeout(2000, () => q.destroy(new Error('t'))); });
      tgt = (r || []).find(t => t.type === 'page');
    } catch (e) { await wait(500); }
  }
  if (!tgt) { console.log('浏览器没起来'); process.exit(2); }
  ws = new WebSocket(tgt.webSocketDebuggerUrl, { perMessageDeflate: false });
  await new Promise((r, j) => { ws.on('open', r); ws.on('error', j); });
  ws.on('message', d => { const m = JSON.parse(d); if (m.id && pending.has(m.id)) { pending.get(m.id).res(m.result || m); pending.delete(m.id); } });
  await send('Page.enable'); await send('Runtime.enable'); await send('DOM.enable');
  await send('Emulation.setDeviceMetricsOverride', { width: 1180, height: 1400, deviceScaleFactor: 2, mobile: false });
  await send('Page.navigate', { url: 'http://127.0.0.1:' + SRV + '/qc.html' });
  for (let i = 0; i < 60; i++) {
    try { const st = await ev('document.readyState + "|" + (!!document.getElementById("btnRun"))'); if (st.indexOf('complete') === 0 && st.indexOf('true') > 0) break; } catch (e) { }
    await wait(200);
  }
  await wait(700);

  const { root } = await send('DOM.getDocument', { depth: 0 });
  const { nodeId } = await send('DOM.querySelector', { nodeId: root.nodeId, selector: '#file' });
  await send('DOM.setFileInputFiles', { files: [f], nodeId });
  await wait(900);
  await ev('(function(){var s=document.getElementById("subLang");s.value="zh-CN";s.dispatchEvent(new Event("change"))})()');
  await wait(300);

  console.log('— 画面方向三档 —');
  for (const fr of ['land', 'square', 'port']) {
    await ev('(function(){var f=document.getElementById("frameSel");f.value="' + fr + '";f.dispatchEvent(new Event("change"))})()');
    await wait(400);
    await shotEl('frame-' + fr + '.png', '#thBox');
  }
  await ev('(function(){var f=document.getElementById("frameSel");f.value="land";f.dispatchEvent(new Event("change"))})()');
  await wait(300);

  console.log('— 语言/画面方向卡 —');
  /* ⚠️ 卡片本身没有 id，nth-of-type 在 .wrap 下数不对（抓到的是第 1 张卡），给个临时 id */
  await ev('(function(){document.querySelectorAll(".card")[1].id="qcard2"})()');
  await shotEl('card-lang.png', '#qcard2');

  console.log('— 跑检查 + 应用修复 —');
  await ev('document.getElementById("btnRun").click()');
  await wait(700);
  await shotEl('report.png', '#repCard');
  await ev('(function(){document.querySelectorAll(\'#fixBox [data-fix]\').forEach(function(b){if(!b.checked)b.click()})})()');
  await wait(200);
  await ev('document.getElementById("btnFix").click()');
  await wait(900);
  await shotEl('fixed.png', '#fixCard');
  const after = await ev('JSON.stringify(S.items.map(function(c){return c.tx}))');
  console.log('  修完：' + after);

  srv.kill(); chrome.kill();
  process.exit(0);
})();
