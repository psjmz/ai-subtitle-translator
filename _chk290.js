/* v0.9.290 本地真浏览器冒烟：未检测到双语要置灰、英日双语要能剥。
   用法：node _chk290.js convert | node _chk290.js bilingual
   走 file:// 直接打开页面（纯前端页，不需要起服务）。 */
'use strict';
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');
const http = require('http');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawn } = require('child_process');

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PORT = 9850 + Math.floor(Math.random() * 90);
const MODE = process.argv[2] || 'convert';
const DIR = '/Users/jp/WorkBuddy/2026-09-04-00-29-54/srt-translator';
const TARGET = 'file://' + DIR + '/' + (MODE === 'bilingual' ? 'bilingual.html' : 'convert.html');
const wait = ms => new Promise(r => setTimeout(r, ms));

const ASS_JA = '[Script Info]\n\n[Events]\n'
  + 'Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text\n'
  + 'Dialogue: 0,0:00:01.00,0:00:03.20,Default,,0,0,0,,We were just getting started.\n'
  + 'Dialogue: 0,0:00:01.00,0:00:03.20,Default,,0,0,0,,私たちは始めたばかりです。\n';
const EN_ONLY = '1\n00:00:01,000 --> 00:00:03,200\nWe were just getting started here tonight\nand look at this and that\n';

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
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'chk290-'));
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
  if (!ok) { console.log('!! 页面没加载出来（' + await ev('location.href') + '）'); chrome.kill('SIGKILL'); process.exit(1); }

  let pass = 0, fail = 0;
  function chk(n, c, x) { if (c) { pass++; console.log('  ✓ ' + n); } else { fail++; console.log('  ✗ ' + n + (x !== undefined ? '  → ' + x : '')); } }
  const sleep = ms => wait(ms);

  if (MODE === 'convert') {
    chk('初始：空输入时下拉锁着', (await ev("document.getElementById('biMode').disabled")) === true);
    chk('初始：不显示任何提示', (await ev("document.getElementById('biHint').style.display")) === 'none');
    chk('初始：标签变淡', /off/.test(await ev("document.getElementById('biLb').className")), await ev("document.getElementById('biLb').className"));

    await ev("setSrc(" + JSON.stringify(EN_ONLY) + ", 'en.srt');1"); await sleep(300);
    chk('纯英文：仍锁着', (await ev("document.getElementById('biMode').disabled")) === true);
    chk('纯英文：提示说未检测到', (await ev("document.getElementById('biHint').textContent")).indexOf('未检测到') >= 0, await ev("document.getElementById('biHint').textContent"));

    await ev("setSrc(" + JSON.stringify(ASS_JA) + ", 'ja.ass');1"); await sleep(300);
    chk('英日双语：下拉放开', (await ev("document.getElementById('biMode').disabled")) === false);
    chk('英日双语：提示说检测到', (await ev("document.getElementById('biHint').textContent")).indexOf('检测到') >= 0, await ev("document.getElementById('biHint').textContent"));
    chk('英日双语：选项 4 个', (await ev("document.querySelectorAll('#biMode option').length")) === 4);

    await ev("document.getElementById('biMode').value='dst';document.getElementById('outFmt').value='srt';convert();1"); await sleep(300);
    const out = await ev("document.getElementById('out').value");
    chk('只留译文：输出日文', /私たちは始めたばかりです/.test(out) && !/We were just/.test(out), String(out).slice(0, 70));

    await ev("document.getElementById('biMode').value='keep';convert();1"); await sleep(300);
    const keep = await ev("document.getElementById('out').value");
    chk('保留双语：两条都还在', /私たちは始めたばかりです/.test(keep) && /We were just/.test(keep));
  } else {
    chk('初始：模式下拉锁着', (await ev("document.getElementById('mode').disabled")) === true);
    chk('初始：开始按钮锁着', (await ev("document.getElementById('btnGo').disabled")) === true);
    chk('初始：不显示任何提示', (await ev("document.getElementById('biState').style.display")) === 'none');

    await ev("setSrc(" + JSON.stringify(EN_ONLY) + ", 'en.srt');1"); await sleep(300);
    chk('纯英文：下拉与按钮都锁着', (await ev("document.getElementById('mode').disabled")) === true
      && (await ev("document.getElementById('btnGo').disabled")) === true);
    chk('纯英文：提示说未检测到', (await ev("document.getElementById('biState').textContent")).indexOf('未检测到') >= 0, await ev("document.getElementById('biState').textContent"));

    await ev("setSrc(" + JSON.stringify(ASS_JA) + ", 'ja.ass');1"); await sleep(300);
    chk('英日双语：控件放开', (await ev("document.getElementById('mode').disabled")) === false
      && (await ev("document.getElementById('btnGo').disabled")) === false);
    chk('英日双语：提示说检测到', (await ev("document.getElementById('biState').textContent")).indexOf('检测到') >= 0, await ev("document.getElementById('biState').textContent"));

    await ev("document.getElementById('mode').value='dst';document.getElementById('outFmt').value='srt';run();1"); await sleep(300);
    const parts = await ev("(window.S.parts||[]).map(function(p){return p.text;})");
    chk('只留译文：出一份且是日文', parts.length === 1 && /私たちは始めたばかりです/.test(parts[0]), JSON.stringify(parts).slice(0, 80));
    chk('导出名带 dst 后缀（两份不互相覆盖）',
      (await ev("window.BilingualCore.outName('ja.ass','srt',document.querySelector('#parts a, #parts button')?tagOf('partDst'):'dst')")) === 'ja.dst.srt',
      await ev("window.BilingualCore.outName('x.srt','srt','dst')"));

    await ev("document.getElementById('mode').value='split';run();1"); await sleep(300);
    const two = await ev("(window.S.parts||[]).map(function(p){return p.text;})");
    chk('拆成两份：一份原文一份译文', two.length === 2 && /We were just/.test(two[0]) && /私たちは始めたばかりです/.test(two[1]));

    await ev("document.getElementById('langSel').value='en';document.getElementById('langSel').dispatchEvent(new Event('change',{bubbles:true}));1"); await sleep(400);
    const chip = await ev("document.getElementById('biState').textContent");
    chk('切英文后提示跟着变英文', /detected/i.test(chip), chip);
    chk('切英文后模式下拉仍是英文选项', /Translation/i.test(await ev("document.getElementById('mode').options[1].textContent")),
      await ev("document.getElementById('mode').options[1].textContent"));
  }

  console.log('\n本地冒烟（' + MODE + '）：' + pass + ' 通过 / ' + fail + ' 失败');
  chrome.kill('SIGKILL');
  process.exit(fail ? 1 : 0);
})().catch(e => { console.log('ERR ' + e.message); process.exit(1); });
