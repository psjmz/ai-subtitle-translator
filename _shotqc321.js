/* _shotqc321.js —— v0.9.321 截图（非交付件）：质检页跑完报告的样式 + 首页第十七张卡 */
'use strict';
process.on('unhandledRejection', e => { console.log('UNHANDLED', e && e.message); });
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');
const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const ROOT = '/Users/jp/WorkBuddy/2026-09-04-00-29-54/srt-translator';
const OUT = '/Users/jp/WorkBuddy/2026-09-04-00-29-54/outputs-321';
const SRV = 3950 + Math.floor(Math.random() * 30);
const PORT = 9985 + Math.floor(Math.random() * 10);
const wait = ms => new Promise(r => setTimeout(r, ms));
try { fs.mkdirSync(OUT); } catch (e) { }

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
async function shot(name) {
  const r = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(OUT + '/' + name, Buffer.from(r.data, 'base64'));
  console.log('  写出 ' + OUT + '/' + name);
}

(async () => {
  await wait(1500);
  const SRT = [
    '1', '00:00:01,000 --> 00:00:02,000',
    '这一句话很长很长很长很长很长很长很长很长很长很长很长很长很长很长',
    '', '2', '00:00:01,500 --> 00:00:03,000',
    '与上一条重叠了,而且逗号是半角',
    '', '3', '00:00:05,000 --> 00:00:04,000',
    '这条时间轴倒挂了', '', ''
  ].join('\n');
  fs.writeFileSync('/tmp/_shot321.srt', SRT);

  const chrome = spawn(CHROME, ['--headless=new', '--remote-debugging-port=' + PORT, '--no-sandbox', '--disable-gpu',
    '--host-resolver-rules=MAP * ~NOTFOUND, EXCLUDE 127.0.0.1',
    '--lang=zh-CN', '--user-data-dir=/tmp/crshot321-' + Date.now(), 'about:blank'], { stdio: 'ignore' });
  await wait(2000);
  let tgt = null;
  for (let i = 0; i < 30 && !tgt; i++) {
    try {
      const r = await new Promise((res, rej) => { const q = http.get({ host: '127.0.0.1', port: PORT, path: '/json/list' }, s => { let d = ''; s.on('data', c => d += c); s.on('end', () => res(JSON.parse(d))); }); q.on('error', rej); q.setTimeout(2000, () => q.destroy(new Error('t'))); });
      tgt = (r || []).find(t => t.type === 'page');
    } catch (e) { await wait(500); }
  }
  if (!tgt) { console.log('浏览器没起来'); srv.kill(); chrome.kill(); process.exit(2); }
  ws = new WebSocket(tgt.webSocketDebuggerUrl, { perMessageDeflate: false });
  await new Promise((r, j) => { ws.on('open', r); ws.on('error', j); });
  ws.on('message', d => { const m = JSON.parse(d); if (m.id && pending.has(m.id)) { pending.get(m.id).res(m.result || m); pending.delete(m.id); } });
  await send('Page.enable'); await send('Runtime.enable'); await send('DOM.enable');
  await send('Emulation.setDeviceMetricsOverride', { width: 1180, height: 1000, deviceScaleFactor: 2, mobile: false });

  /* ① 质检页：上传 → 检查 → 报告 */
  await send('Page.navigate', { url: 'http://127.0.0.1:' + SRV + '/qc.html' });
  for (let i = 0; i < 60; i++) { try { const st = await ev('document.readyState + "|" + !!document.getElementById("btnRun")'); if (st.indexOf('complete') === 0 && st.indexOf('true') > 0) break; } catch (e) { } await wait(200); }
  await wait(700);
  const { root } = await send('DOM.getDocument', { depth: 0 });
  const { nodeId: fid } = await send('DOM.querySelector', { nodeId: root.nodeId, selector: '#file' });
  await send('DOM.setFileInputFiles', { files: ['/tmp/_shot321.srt'], nodeId: fid });
  await wait(800);
  await ev('document.getElementById("btnRun").click()');
  await wait(800);
  await shot('qc-report-zh.png');
  /* 报告本体在首屏之下，单独再滚过去拍两张（体检报告 + 修与导出） */
  await send('Emulation.setDeviceMetricsOverride', { width: 1180, height: 1250, deviceScaleFactor: 2, mobile: false });
  await ev('document.getElementById("repCard").scrollIntoView({block:"start"})');
  await wait(600);
  await shot('qc-report-issues.png');
  await ev('document.getElementById("fixCard").scrollIntoView({block:"start"})');
  await wait(600);
  await shot('qc-fix-export.png');
  await send('Emulation.setDeviceMetricsOverride', { width: 1180, height: 1000, deviceScaleFactor: 2, mobile: false });

  /* ② 首页：滚到质检卡 + 质检详解段 */
  await send('Page.navigate', { url: 'http://127.0.0.1:' + SRV + '/' });
  for (let i = 0; i < 60; i++) { try { const st = await ev('document.readyState + "|" + !!document.querySelector(".tc.qc")'); if (st.indexOf('complete') === 0 && st.indexOf('true') > 0) break; } catch (e) { } await wait(200); }
  await wait(800);
  await ev('document.querySelector(".tc.qc").scrollIntoView({block:"center"})');
  await wait(500);
  await shot('home-card-qc.png');
  await ev('document.getElementById("detQcTitle").scrollIntoView({block:"start"})');
  await wait(500);
  await shot('home-det-qc.png');

  try { srv.kill(); } catch (e) { } chrome.kill();
  console.log('完成');
  process.exit(0);
})();
