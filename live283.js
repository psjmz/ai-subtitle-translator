/* v0.9.283 外网实测（走代理 7897 起 headless Chrome）
   重点：① /data/* 从公网取必须 404  ② 四页版号 283  ③ 控制台干净  ④ 移动端不溢出
   只取 HTTP 状态码，不读取也不落盘任何响应内容 */
'use strict';
process.on('unhandledRejection', () => {});
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');
const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PORT = 9372, SITE = 'https://ai-srtsub.com';
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
  if (r.exceptionDetails) throw new Error(r.exceptionDetails.text);
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

let errs = [], bad = [];
(async () => {
  const dir = '/tmp/live283-' + Date.now();
  const ch = spawn(CHROME, ['--headless=new', '--disable-gpu', '--no-sandbox',
    '--proxy-server=http://127.0.0.1:7897', '--remote-debugging-port=' + PORT,
    '--user-data-dir=' + dir, 'about:blank'], { stdio: 'ignore' });
  await wait(3000);
  let list = null;
  for (let i = 0; i < 30; i++) {
    try { list = await new Promise((res, rej) => http.get({ host: '127.0.0.1', port: PORT, path: '/json/list' }, r => { let d = ''; r.on('data', c => d += c); r.on('end', () => res(JSON.parse(d))); }).on('error', rej)); if (list && list.length) break; } catch (e) { }
    await wait(600);
  }
  const tgt = (list || []).find(t => t.type === 'page');
  ws = new WebSocket(tgt.webSocketDebuggerUrl, { perMessageDeflate: false, maxPayload: 256 * 1024 * 1024 });
  await new Promise((res, rej) => { ws.on('open', res); ws.on('error', rej); });
  ws.on('message', s => {
    let m; try { m = JSON.parse(s); } catch (e) { return; }
    if (m.id && pending.has(m.id)) { const p = pending.get(m.id); pending.delete(m.id); m.error ? p.rej(new Error(m.error.message)) : p.res(m.result); return; }
    if (m.method === 'Runtime.exceptionThrown') errs.push(((m.params.exceptionDetails || {}).exception || {}).description || '');
    if (m.method === 'Runtime.consoleAPICalled' && m.params.type === 'error') { try { errs.push(String((m.params.args[0] || {}).value || '').slice(0, 120)); } catch (e) { } }
  });
  await send('Runtime.enable'); await send('Page.enable'); await send('Network.enable');
  await metric(1440, 900);

  const DIAG = await goto(SITE + '/').then(() => ev(`JSON.stringify({href:location.href, ready:document.readyState})`)).catch(e => 'ERR ' + e.message);
  console.log('DIAG ' + DIAG);

  /* ---------- ① 漏洞是否堵住（本版核心） ---------- */
  console.log('\n─── ① /data 公网不可读（v0.9.283 主角）───');
  const codes = await ev(`(async()=>{
    const ps=['/data/config.json','/data/events.json','/data/usage.json','/data/merge-events.json',
              '/data/clean-events.json','/data/data.bak/config.json','/data/'];
    const out={};
    for(const p of ps){ try{ const r=await fetch(p,{cache:'no-store'}); out[p]=r.status; }catch(e){ out[p]='ERR'; } }
    return JSON.stringify(out);
  })()`);
  const co = JSON.parse(codes);
  Object.keys(co).forEach(p => ok(co[p] === 404, '→ ' + p + ' 应为 404', co[p]));

  /* ---------- ② 四页版号 ---------- */
  console.log('\n─── ② 版号 ───');
  for (const [name, p] of [['首页', '/'], ['工作台', '/translate.html'], ['特效页', '/merge.html'], ['清洗页', '/clean.html']]) {
    errs = [];
    await goto(SITE + p);
    const v = await ev(`JSON.stringify({
      top:(document.querySelector('.ver')||{}).textContent||'',
      tag:(document.querySelector('.ver-tag')||{}).textContent||'',
      core:[...document.querySelectorAll('script[src*="-core.js"]')].map(s=>s.src).join(',')
    })`);
    const o = JSON.parse(v);
    const has283 = /0\.9\.283/.test(o.top + o.tag + o.core);
    ok(has283, name + ' 版号 v0.9.283', o.top + ' | ' + o.tag + ' | ' + o.core.slice(-40));
    ok(errs.length === 0, name + ' 控制台干净', errs.slice(0, 2).join(';') || '干净');
  }

  /* ---------- ③ 多语言 + logo ---------- */
  console.log('\n─── ③ 多语言路由 / logo ───');
  for (const [lg, p] of [['ja', '/ja/'], ['es', '/es/'], ['he', '/he/'], ['ar', '/ar/']]) {
    await goto(SITE + p);
    const o = JSON.parse(await ev(`JSON.stringify({t:document.title, l:document.documentElement.lang})`));
    ok(o.l === lg && !!o.t, lg + ' 路由', o.l + ' | ' + o.t.slice(0, 40));
  }
  await goto(SITE + '/ja/translate.html');
  const logo = await ev(`(document.getElementById('logoHome')||{}).getAttribute('href')`);
  ok(logo === '/ja/', '日语工作台 logo 指回 /ja/', logo);

  /* ---------- ④ 移动端 ---------- */
  console.log('\n─── ④ 移动端 375px ───');
  for (const [name, p] of [['首页', '/'], ['工作台', '/translate.html'], ['特效页', '/merge.html'], ['清洗页', '/clean.html']]) {
    await metric(375, 800);
    await goto(SITE + p);
    await wait(700);
    const o = JSON.parse(await ev(`JSON.stringify({cw:document.documentElement.clientWidth, sw:document.documentElement.scrollWidth})`));
    ok(o.sw <= o.cw + 1, '375px ' + name + ' 无横向溢出', o.sw + ' vs ' + o.cw);
  }

  /* ---------- ⑤ 截图 ---------- */
  console.log('\n─── ⑤ 截图 ───');
  await metric(1440, 900);
  await goto(SITE + '/'); await shot('live283-home.png');
  await goto(SITE + '/translate.html'); await shot('live283-ws.png');
  console.log('  已存 live283-home.png / live283-ws.png');

  console.log('\n—— 外网实测：通过 ' + PASS + ' / 失败 ' + FAIL + ' ——');
  ws.close(); try { ch.kill('SIGKILL'); } catch (e) { }
  try { fs.rmSync(dir, { recursive: true, force: true }); } catch (e) { }
  setTimeout(() => process.exit(FAIL ? 1 : 0), 600);
})().catch(e => { console.error('外网实测异常:', e.message); process.exit(2); });
