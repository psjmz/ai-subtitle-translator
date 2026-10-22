/* v0.9.291 本地真浏览器冒烟：时间轴页三种调整方式、负时间截断、参数校验。
   用法：node _chk291.js
   走 file:// 直接打开页面（纯前端页，不需要起服务）。 */
'use strict';
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');
const http = require('http');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawn } = require('child_process');

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PORT = 9870 + Math.floor(Math.random() * 60);
const DIR = '/Users/jp/WorkBuddy/2026-09-04-00-29-54/srt-translator';
const TARGET = 'file://' + DIR + '/shift.html';
const wait = ms => new Promise(r => setTimeout(r, ms));

const SRT = '1\n00:00:01,000 --> 00:00:03,200\nHello\n\n'
  + '2\n00:00:05,000 --> 00:00:07,000\nWorld\n';

let ws, tid = 0; const pending = new Map();
function send(method, params) {
  const id = ++tid;
  ws.send(JSON.stringify({ id, method, params: params || {} }));
  return new Promise((res, rej) => {
    pending.set(id, { res, rej });
    setTimeout(() => { if (pending.has(id)) { pending.delete(id); rej(new Error('timeout ' + method)); } }, 30000);
  });
}
async function ev(expr) {
  const r = await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true });
  if (r.exceptionDetails) throw new Error(String(r.exceptionDetails.exception && r.exceptionDetails.exception.description).slice(0, 300));
  return r.result.value;
}

(async () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'chk291-'));
  const chrome = spawn(CHROME, ['--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check',
    '--no-proxy-server', '--remote-debugging-port=' + PORT, '--user-data-dir=' + dir, TARGET], { stdio: 'ignore' });

  let tabs = [];
  for (let i = 0; i < 40 && !tabs.length; i++) {
    await wait(400);
    try {
      const l = await new Promise((res, rej) => http.get('http://127.0.0.1:' + PORT + '/json/list', r => { let b = ''; r.on('data', d => b += d); r.on('end', () => res(b)); }).on('error', rej));
      tabs = (JSON.parse(l) || []).filter(x => x.type === 'page' && x.webSocketDebuggerUrl);
    } catch (e) { }
  }
  if (!tabs.length) { console.log('!! 浏览器起不来'); process.exit(1); }
  ws = new WebSocket(tabs[0].webSocketDebuggerUrl, { perMessageDeflate: false, maxPayload: 256 * 1024 * 1024 });
  await new Promise((res, rej) => { ws.on('open', res); ws.on('error', rej); });
  ws.on('message', raw => {
    let m; try { m = JSON.parse(raw); } catch (e) { return; }
    if (m.id && pending.has(m.id)) { const p = pending.get(m.id); pending.delete(m.id); m.error ? p.rej(new Error(JSON.stringify(m.error))) : p.res(m.result); return; }
  });

  let ok = false;
  for (let i = 0; i < 40 && !ok; i++) {
    await wait(500);
    try { ok = (await ev('document.readyState')) === 'complete' && (await ev("typeof setSrc!=='undefined'")); } catch (e) { }
  }
  if (!ok) { console.log('!! 页面没加载出来'); chrome.kill('SIGKILL'); process.exit(1); }

  let pass = 0, fail = 0;
  function chk(n, c, x) { if (c) { pass++; console.log('  ✓ ' + n); } else { fail++; console.log('  ✗ ' + n + (x !== undefined ? '  → ' + x : '')); } }
  const sleep = ms => wait(ms);

  /* ① 三种模式只显示自己那一行参数 */
  chk('模式下拉 3 个选项', (await ev("document.querySelectorAll('#mode option').length")) === 3);
  chk('默认只显示平移那一行', (await ev("getComputedStyle(document.getElementById('rowShift')).display")) !== 'none'
    && (await ev("getComputedStyle(document.getElementById('rowRate')).display")) === 'none'
    && (await ev("getComputedStyle(document.getElementById('rowTwo')).display")) === 'none');
  await ev("document.getElementById('mode').value='rate';document.getElementById('mode').dispatchEvent(new Event('change',{bubbles:true}));1"); await sleep(250);
  chk('切到倍率后只显示倍率那一行', (await ev("getComputedStyle(document.getElementById('rowRate')).display")) !== 'none'
    && (await ev("getComputedStyle(document.getElementById('rowShift')).display")) === 'none');
  await ev("document.getElementById('mode').value='two';document.getElementById('mode').dispatchEvent(new Event('change',{bubbles:true}));1"); await sleep(250);
  chk('切到两点校正后只显示时间那一行', (await ev("getComputedStyle(document.getElementById('rowTwo')).display")) !== 'none'
    && (await ev("getComputedStyle(document.getElementById('rowRate')).display")) === 'none');

  /* ② 读入字幕：「当前」两栏自动填首末条 */
  await ev("setSrc(" + JSON.stringify(SRT) + ", 'demo.srt');1"); await sleep(300);
  chk('识别到 SRT', (await ev("document.getElementById('srcFmt').textContent")) === 'SRT', await ev("document.getElementById('srcFmt').textContent"));
  chk('两点校正的当前两栏自动填好', (await ev("document.getElementById('curA').value")) === '00:00:01,000'
    && (await ev("document.getElementById('curB').value")) === '00:00:07,000',
    await ev("document.getElementById('curA').value + ' / ' + document.getElementById('curB').value"));

  /* ③ 平移 +2 秒：位置动、时长不动 */
  await ev("document.getElementById('mode').value='shift';document.getElementById('mode').dispatchEvent(new Event('change',{bubbles:true}));1"); await sleep(250);
  await ev("document.getElementById('msVal').value='2';document.getElementById('outFmt').value='srt';run();1"); await sleep(350);
  let st = await ev("(window.S.out||[]).map(function(c){return c.start;})");
  let en = await ev("(window.S.out||[]).map(function(c){return c.end;})");
  chk('平移 +2s：起点 3000/7000', JSON.stringify(st) === '[3000,7000]', JSON.stringify(st));
  chk('平移 +2s：终点 5200/9000', JSON.stringify(en) === '[5200,9000]', JSON.stringify(en));
  chk('平移不动时长', (await ev("JSON.stringify((window.S.out||[]).map(function(c){return c.end-c.start;}))")) === '[2200,2000]');
  chk('结果区显示出来了', (await ev("getComputedStyle(document.getElementById('repCard')).display")) !== 'none');
  chk('对照里有前后箭头', /⇒/.test(await ev("document.querySelector('pre.cmp').textContent")), String(await ev("document.querySelector('pre.cmp').textContent")).slice(0, 60));

  /* ④ 提前过头：截断到 0 并报条数 */
  await ev("document.getElementById('msVal').value='-6';run();1"); await sleep(350);
  chk('负时间被压到 0', JSON.stringify(await ev("(window.S.out||[]).map(function(c){return c.start;})")) === '[0,0]');
  chk('如实报出 2 条被截断', (await ev("window.S.clamped")) === 2, await ev("window.S.clamped"));
  chk('提示里说了条数', /2/.test(await ev("document.getElementById('msg').textContent"))
    && /0/.test(await ev("document.getElementById('msg').textContent")), await ev("document.getElementById('msg').textContent"));

  /* ⑤ 倍率缩放：时长同步缩放 */
  await ev("document.getElementById('mode').value='rate';document.getElementById('mode').dispatchEvent(new Event('change',{bubbles:true}));1"); await sleep(250);
  await ev("document.getElementById('rateVal').value='1.5';run();1"); await sleep(350);
  chk('倍率 1.5：起点 1500/7500', JSON.stringify(await ev("(window.S.out||[]).map(function(c){return c.start;})")) === '[1500,7500]',
    JSON.stringify(await ev("(window.S.out||[]).map(function(c){return c.start;})")));
  chk('倍率 1.5：时长变 3300/3000', (await ev("JSON.stringify((window.S.out||[]).map(function(c){return c.end-c.start;}))")) === '[3300,3000]');

  /* ⑥ 两点校正：首末条正好落在目标时间 */
  await ev("document.getElementById('mode').value='two';document.getElementById('mode').dispatchEvent(new Event('change',{bubbles:true}));1"); await sleep(250);
  await ev("document.getElementById('tgtA').value='00:00:02,000';document.getElementById('tgtB').value='00:00:09,000';run();1"); await sleep(350);
  chk('两点校正：首条落在 2 秒', (await ev("(window.S.out||[])[0].start")) === 2000, await ev("(window.S.out||[])[0].start"));
  chk('两点校正：末条落在 9 秒', (await ev("(window.S.out||[])[(window.S.out.length-1)].end")) === 9000,
    await ev("(window.S.out||[])[(window.S.out.length-1)].end"));

  /* ⑦ 参数填错：不许跑出结果 */
  await ev("document.getElementById('tgtA').value='';run();1"); await sleep(300);
  chk('目标时间空着时报参数错', (await ev("document.getElementById('msg').textContent")).indexOf('参数') >= 0,
    await ev("document.getElementById('msg').textContent"));
  await ev("document.getElementById('mode').value='rate';document.getElementById('mode').dispatchEvent(new Event('change',{bubbles:true}));1"); await sleep(250);
  await ev("document.getElementById('rateVal').value='0';run();1"); await sleep(300);
  chk('倍率 0 时报参数错', (await ev("document.getElementById('msg').textContent")).indexOf('参数') >= 0,
    await ev("document.getElementById('msg').textContent"));

  /* ⑧ 输出格式切换 */
  await ev("document.getElementById('mode').value='shift';document.getElementById('mode').dispatchEvent(new Event('change',{bubbles:true}));1"); await sleep(250);
  await ev("document.getElementById('msVal').value='2';document.getElementById('outFmt').value='vtt';run();1"); await sleep(350);
  chk('切 VTT 输出以 WEBVTT 开头', /^WEBVTT/.test(await ev("window.S.text")), String(await ev("window.S.text")).slice(0, 30));

  /* ⑨ 27 语：切英文 */
  await ev("document.getElementById('langSel').value='en';document.getElementById('langSel').dispatchEvent(new Event('change',{bubbles:true}));1"); await sleep(400);
  chk('切英文后模式选项变英文', /Rescale/i.test(await ev("document.getElementById('mode').options[1].textContent")),
    await ev("document.getElementById('mode').options[1].textContent"));
  chk('切英文后按钮变英文', /Apply/i.test(await ev("document.getElementById('btnGo').textContent")),
    await ev("document.getElementById('btnGo').textContent"));

  console.log('\n本地冒烟（shift）：' + pass + ' 通过 / ' + fail + ' 失败');
  chrome.kill('SIGKILL');
  process.exit(fail ? 1 : 0);
})().catch(e => { console.log('ERR ' + e.message); process.exit(1); });
