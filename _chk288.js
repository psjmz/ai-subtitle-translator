/* v0.9.288 转换页冒烟：真浏览器打开 /convert.html，注入字幕，点「转换」，
   逐格式检查产物。全程走本地实例，不碰线上。 */
'use strict';
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');
const http = require('http');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawn } = require('child_process');

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PORT = 9500 + Math.floor(Math.random() * 90);
const BASE = process.argv[2] || 'http://127.0.0.1:4187';
const wait = ms => new Promise(r => setTimeout(r, ms));

let ws, tid = 0; const pending = new Map();
function send(method, params) {
  const id = ++tid;
  ws.send(JSON.stringify({ id, method, params: params || {} }));
  return new Promise((res, rej) => {
    pending.set(id, { res, rej });
    setTimeout(() => { if (pending.has(id)) { pending.delete(id); rej(new Error('timeout ' + method)); } }, 60000);
  });
}
async function ev(expr) {
  const r = await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true });
  if (r.exceptionDetails) throw new Error(String(r.exceptionDetails.exception && r.exceptionDetails.exception.description).slice(0, 400));
  return r.result.value;
}
function httpJson(url) {
  return new Promise((res, rej) => {
    http.get(url, r => { let b = ''; r.on('data', d => b += d); r.on('end', () => { try { res(JSON.parse(b)); } catch (e) { rej(e); } }); }).on('error', rej);
  });
}

const SRC = '1\n00:00:01,000 --> 00:00:03,200\nHello world\n\n2\n00:00:04,100 --> 00:00:06,400\nSecond line\n';

(async () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'chk288-'));
  /* 直接把目标页当启动页，省掉 Page.navigate；本机实例一律 --no-proxy-server */
  const chrome = spawn(CHROME, ['--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check',
    '--no-proxy-server', '--remote-debugging-port=' + PORT, '--user-data-dir=' + dir, BASE + '/convert.html'], { stdio: 'ignore' });

  console.log('[1] chrome 已起，调试端口 ' + PORT);
  let tabs = [];
  for (let i = 0; i < 40 && !tabs.length; i++) {
    await wait(500);
    try { const l = await httpJson('http://127.0.0.1:' + PORT + '/json/list'); tabs = (Array.isArray(l) ? l : []).filter(x => x.type === 'page' && x.webSocketDebuggerUrl); } catch (e) { }
  }
  if (!tabs.length) { console.log('!! 浏览器起不来'); process.exit(1); }
  console.log('[2] 页面会话 ' + tabs.length + ' 个');

  ws = new WebSocket(tabs[0].webSocketDebuggerUrl, { perMessageDeflate: false, maxPayload: 512 * 1024 * 1024 });
  await new Promise((res, rej) => { ws.on('open', res); ws.on('error', rej); });
  console.log('[3] CDP 已连上');
  ws.on('message', raw => {
    let m; try { m = JSON.parse(raw); } catch (e) { return; }
    if (m.id && pending.has(m.id)) { const p = pending.get(m.id); pending.delete(m.id); m.error ? p.rej(new Error(JSON.stringify(m.error))) : p.res(m.result); return; }
  });
  /* 不调 Runtime.enable / Page.enable —— 这条链路上它们会挂住，直接 evaluate 就行 */
  let ok = false;
  for (let i = 0; i < 60 && !ok; i++) {
    await wait(600);
    try { ok = (await ev('document.readyState')) === 'complete' && (await ev("typeof setSrc!=='undefined'")); } catch (e) { }
  }
  if (!ok) { console.log('!! 页面没起来'); chrome.kill('SIGKILL'); process.exit(1); }

  let pass = 0, fail = 0;
  function chk(name, cond, extra) { if (cond) { pass++; console.log('  ✓ ' + name); } else { fail++; console.log('  ✗ ' + name + (extra ? '  → ' + extra : '')); } }

  console.log('页面已就绪');
  chk('1 个 h1', (await ev('document.querySelectorAll("h1").length')) === 1);
  chk('输出格式下拉 6 项', (await ev('document.querySelectorAll("#outFmt option").length')) === 6);
  chk('语言下拉 27 项', (await ev('document.querySelectorAll("#langSel option").length')) === 27);
  chk('导航胶囊 4 个', (await ev('document.querySelectorAll("#navPills a").length')) === 4);

  await ev("setSrc(" + JSON.stringify(SRC) + ", 'demo.srt')");
  await wait(300);
  chk('识别成 SRT', (await ev("document.getElementById('srcFmt').textContent")) === 'SRT');

  for (const f of ['srt', 'vtt', 'ass', 'sbv', 'lrc', 'txt']) {
    await ev("document.getElementById('outFmt').value='" + f + "';document.getElementById('btnGo').click();1");
    await wait(200);
    const out = await ev("document.getElementById('out').value");
    const shown = await ev("getComputedStyle(document.getElementById('repCard')).display");
    const head = String(out).split('\n')[0].slice(0, 40);
    chk('导出 ' + f.toUpperCase() + ' 有内容且结果区可见', out && out.length > 5 && shown !== 'none', '首行=' + head);
  }

  /* 时间轴保留：SRT 转 VTT 再转回 SRT，时间码应与原文一致 */
  await ev("document.getElementById('outFmt').value='vtt';document.getElementById('btnGo').click();1");
  await wait(200);
  const vtt = await ev("document.getElementById('out').value");
  await ev("setSrc(" + JSON.stringify(vtt) + ", 'demo.vtt')");
  await wait(200);
  chk('VTT 能被识别', (await ev("document.getElementById('srcFmt').textContent")) === 'VTT');
  await ev("document.getElementById('outFmt').value='srt';document.getElementById('btnGo').click();1");
  await wait(200);
  const back = await ev("document.getElementById('out').value");
  chk('SRT→VTT→SRT 时间轴与原文一致', String(back).replace(/\r/g, '') === SRC.replace(/\r/g, ''), JSON.stringify(String(back).slice(0, 60)));

  /* 空输入 */
  await ev("setSrc('', 'x.srt');document.getElementById('btnGo').click();1");
  await wait(200);
  chk('空输入给出提示而不是白屏', /err/.test(await ev("document.getElementById('msg').className")));

  /* 切语言不崩、文案真的换掉 */
  await ev("document.getElementById('langSel').value='en';document.getElementById('langSel').dispatchEvent(new Event('change',{bubbles:true}));1");
  await wait(300);
  const heroEn = await ev("document.querySelector('.hero h1').textContent");
  chk('切到英文后标题变英文', /Subtitle\s*Converter/.test(heroEn), heroEn);

  console.log('\n结果：' + pass + ' 通过 / ' + fail + ' 失败');
  chrome.kill('SIGKILL');
  process.exit(fail ? 1 : 0);
})().catch(e => { console.log('ERR ' + e.message); process.exit(1); });
