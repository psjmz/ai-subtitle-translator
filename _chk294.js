/* v0.9.294 本地真浏览器冒烟：步骤流水线（可增删 / 可排序 / 可单独停用）+ 单位后缀 + 合并拆分叠加。
   用法：node _chk294.js
   走 file:// 直接打开页面（纯前端页，不需要起服务）。 */
'use strict';
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');
const http = require('http');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawn } = require('child_process');

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PORT = 9940 + Math.floor(Math.random() * 40);
const DIR = '/Users/jp/WorkBuddy/2026-09-04-00-29-54/srt-translator';
const TARGET = 'file://' + DIR + '/shift.html';
const wait = ms => new Promise(r => setTimeout(r, ms));

const SRT = '1\n00:00:01,000 --> 00:00:03,200\nHello\n\n'
  + '2\n00:00:05,000 --> 00:00:07,000\nWorld\n';
const LONG = '1\n00:00:01,000 --> 00:00:09,000\nHello there my friend\n\n'
  + '2\n00:00:20,000 --> 00:00:22,000\nBye\n';
const ASS = '[Script Info]\nTitle: My Show\nScriptType: v4.00+\n\n'
  + '[V4+ Styles]\nFormat: Name, Fontname, Fontsize, PrimaryColour\n'
  + 'Style: Karaoke,Arial,54,&H00FFFFFF\n\n'
  + '[Events]\nFormat: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text\n'
  + 'Dialogue: 2,0:00:01.00,0:00:03.20,Karaoke,singer,10,20,30,Fade,Hello\n'
  + 'Dialogue: 0,0:00:05.00,0:00:07.00,Default,,0,0,0,,World\n';

let ws, tid = 0; const pending = new Map();
function send(method, params) {
  const id = ++tid;
  ws.send(JSON.stringify({ id, method, params: params || {} }));
  return new Promise((res, rej) => {
    pending.set(id, { res, rej });
    setTimeout(() => { if (pending.has(id)) { pending.delete(id); rej(new Error('timeout ' + method)); } }, 8000);
  });
}
async function ev(expr) {
  const r = await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true });
  if (r.exceptionDetails) throw new Error(String(r.exceptionDetails.exception && r.exceptionDetails.exception.description).slice(0, 300));
  return r.result.value;
}

(async () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'chk294-'));
  const chrome = spawn(CHROME, ['--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check',
    '--no-proxy-server', '--remote-debugging-port=' + PORT, '--user-data-dir=' + dir, TARGET], { stdio: 'ignore' });

  let tabs = [];
  for (let i = 0; i < 40 && !tabs.length; i++) {
    await wait(400);
    try {
      const l = await new Promise((res, rej) => http.get('http://127.0.0.1:' + PORT + '/json/list', r => { let b = ''; r.on('data', d => b += d); r.on('end', () => res(b)); }).on('error', rej));
      const all = (JSON.parse(l) || []).filter(x => x.type === 'page' && x.webSocketDebuggerUrl);
      const hit = all.filter(x => /shift\.html/.test(x.url || ''));
      tabs = hit.length ? hit : all;
    } catch (e) { }
  }
  if (!tabs.length) { console.log('!! 浏览器起不来 port=' + PORT); process.exit(1); }
  ws = new WebSocket(tabs[0].webSocketDebuggerUrl, { perMessageDeflate: false, maxPayload: 256 * 1024 * 1024 });
  await new Promise((res, rej) => { ws.on('open', res); ws.on('error', rej); });
  ws.on('message', raw => {
    let m; try { m = JSON.parse(raw); } catch (e) { return; }
    if (m.id && pending.has(m.id)) { const p = pending.get(m.id); pending.delete(m.id); m.error ? p.rej(new Error(JSON.stringify(m.error))) : p.res(m.result); return; }
  });

  let ok = false, dbg = '';
  for (let i = 0; i < 25 && !ok; i++) {
    await wait(600);
    try {
      const rs = await ev('document.readyState');
      const has = await ev("typeof setSrc!=='undefined' && typeof window.S!=='undefined'");
      dbg = rs + ' / ready=' + has;
      /* 纯前端页没有后台请求，readyState 卡在 interactive 也算就绪 —— 认 CDP 的口供没用，
         认定页面自己的全局变量在不在（srt 工具线的老教训） */
      ok = has === true && (rs === 'complete' || rs === 'interactive');
    } catch (e) { dbg = 'ev 异常: ' + e.message; }
  }
  console.log('[就绪探测] ' + dbg);
  if (!ok) { console.log('!! 页面没加载出来'); chrome.kill('SIGKILL'); process.exit(1); }

  let pass = 0, fail = 0;
  function chk(n, c, x) { if (c) { pass++; console.log('  ✓ ' + n); } else { fail++; console.log('  ✗ ' + n + (x !== undefined ? '  → ' + x : '')); } }
  const sleep = ms => wait(ms);
  async function addStep(id) {
    await ev("var s=document.getElementById('addSel');s.value='" + id + "';s.dispatchEvent(new Event('change',{bubbles:true}));1");
    await ev("document.getElementById('btnAdd').click();1");
    await sleep(250);
  }
  async function setVal(i, v) {
    await ev("(function(){var el=document.querySelector('[data-sv=\"" + i + ',0"]\');el.value=' + JSON.stringify(String(v)) + ";el.dispatchEvent(new Event('change',{bubbles:true}));})();1");
    await sleep(300);
  }
  async function click(sel) {
    await ev("document.querySelector('" + sel + "').click();1");
    await sleep(300);
  }
  const starts = () => ev("JSON.stringify(window.S.work.map(function(c){return c.start;}))");
  const durs = () => ev("JSON.stringify(window.S.work.map(function(c){return c.end-c.start;}))");

  console.log('--- ① 区块结构 ---');
  chk('「添加哪道工序」下拉 6 项', (await ev("document.querySelectorAll('#addSel option').length")) === 6,
    await ev("document.querySelectorAll('#addSel option').length"));
  chk('旧的「调整方式」下拉已撤', (await ev("document.getElementById('mode')")) === null);
  chk('旧的「合并与拆分」下拉已撤', (await ev("document.getElementById('tool')")) === null);
  chk('默认没有步骤时是空状态提示', (await ev("document.querySelectorAll('#steps .steps-empty').length")) === 1);

  console.log('--- ② 加一道「平移」，单位是固定后缀 ---');
  await ev("setSrc(" + JSON.stringify(SRT) + ", 'demo.srt');1"); await sleep(400);
  await addStep('shift');
  chk('步骤数变成 1', (await ev("window.S.steps.length")) === 1);
  chk('单位后缀写「秒」', (await ev("document.querySelector('#steps .st .un').textContent")) === '秒',
    await ev("document.querySelector('#steps .st .un').textContent"));
  chk('单位不在 placeholder 里', !(await ev("document.querySelector('#steps .st .num').getAttribute('placeholder')")),
    await ev("String(document.querySelector('#steps .st .num').getAttribute('placeholder'))"));
  chk('默认值给的是 0', (await ev("document.querySelector('#steps .st .num').value")) === '0',
    await ev("document.querySelector('#steps .st .num').value"));
  await setVal(0, 2);
  chk('平移 +2 秒生效', (await starts()) === '[3000,7000]', await starts());
  chk('平移不动时长', (await durs()) === '[2200,2000]', await durs());

  console.log('--- ③ 两步叠加：平移 + 倍率 ---');
  await addStep('rate');
  chk('倍率这一步的单位是「倍」', (await ev("document.querySelectorAll('#steps .st .un')[1].textContent")) === '倍',
    await ev("document.querySelectorAll('#steps .st .un')[1].textContent"));
  await setVal(1, 1.001);
  chk('先平移再缩放 = 3003（顺序敏感）', (await starts()) === '[3003,7007]', await starts());
  chk('倍率同时缩放时长', (await durs()) === '[2202,2002]', await durs());

  console.log('--- ④ 换顺序：↑↓ 按钮 ---');
  await click('[data-dn="0"]');
  chk('第 1 步下移后顺序换了', JSON.stringify(await ev("window.S.steps.map(function(s){return s.id;})")) === '["rate","shift"]',
    JSON.stringify(await ev("window.S.steps.map(function(s){return s.id;})")));
  /* 5000 × 1.001 = 5005，再 +2000 = 7005 —— 跟先平移（3003）对不上，顺序确实有影响 */
  chk('先缩放再平移 = 3001/7005（与 3003/7007 不同）', (await starts()) === '[3001,7005]', await starts());
  await click('[data-up="1"]');
  chk('再移回去又变 3003', (await starts()) === '[3003,7007]', await starts());

  console.log('--- ⑤ 单独停用一道 ---');
  await click('[data-toggle="0"]');
  chk('停用的那道加了灰样式', (await ev("document.querySelectorAll('#steps .st')[0].className")) === 'st off',
    await ev("document.querySelectorAll('#steps .st')[0].className"));
  chk('停用后平移不生效', (await starts()) === '[1001,5005]', await starts());
  await click('[data-toggle="0"]');
  chk('再启用回到 3003', (await starts()) === '[3003,7007]', await starts());

  console.log('--- ⑥ 参数填错：说是哪一步、不许出结果 ---');
  await setVal(0, '');
  chk('空参数报错译文诚实', /平移/.test(await ev("document.getElementById('msg').textContent")),
    await ev("document.getElementById('msg').textContent"));
  await setVal(0, 2);
  chk('改回合法值恢复正常', (await starts()) === '[3003,7007]', await starts());

  console.log('--- ⑦ 合并与拆分也能进同一条流水线 ---');
  await ev("setSrc(" + JSON.stringify(LONG) + ", 'l.srt');1"); await sleep(400);
  chk('换文件后步骤还在', (await ev("window.S.steps.length")) === 2);
  await addStep('gap');
  chk('合并这一步的单位是「毫秒」', (await ev("document.querySelectorAll('#steps .st .un')[2].textContent")) === '毫秒',
    await ev("document.querySelectorAll('#steps .st .un')[2].textContent"));
  await addStep('dur');
  chk('按时长拆这一步的单位是「秒」', (await ev("document.querySelectorAll('#steps .st .un')[3].textContent")) === '秒',
    await ev("document.querySelectorAll('#steps .st .un')[3].textContent"));
  await setVal(3, 2);
  chk('平移+缩放+合并+拆分四步叠加跑通', (await ev("window.S.work.length")) > 2, await ev("window.S.work.length"));
  chk('有词边界的长句真被拆开了', (await ev("window.S.split")) > 0, await ev("window.S.split"));
  /* 四步流水线是 平移(+2s) → 缩放(×1.001) → 合并 → 拆分：
     首条 1000 → 3000 → ×1.001 = 3003；末条 22000 → 24000 → ×1.001 = 24024 */
  chk('拆分后时间首尾仍严丝合缝', (await ev("window.S.work[0].start")) === Math.round(3000 * 1.001)
    && (await ev("window.S.work[window.S.work.length-1].end")) === Math.round(24000 * 1.001),
    await ev("window.S.work[0].start + '/' + window.S.work[window.S.work.length-1].end"));

  console.log('--- ⑧ 删步骤回到空状态 ---');
  for (let i = 0; i < 4; i++) { await click('[data-del="0"]'); }
  chk('全删完回到空状态', (await ev("document.querySelectorAll('#steps .steps-empty').length")) === 1);
  await ev('run();1'); await sleep(300);
  chk('没有步骤时原样输出', (await ev("window.S.work.length")) === 2, await ev("window.S.work.length"));
  chk('提示明说「没有调整步骤」', /没有调整步骤|步骤/.test(await ev("document.getElementById('msg').textContent")),
    await ev("document.getElementById('msg').textContent"));

  console.log('--- ⑨ ASS 样式保真（294 没动这块，回归验证）---');
  await ev("setSrc(" + JSON.stringify(ASS) + ", 'demo.ass');1"); await sleep(400);
  await addStep('shift'); await setVal(0, 2);
  chk('识别成 ASS', (await ev("document.getElementById('srcFmt').textContent")) === 'ASS');
  chk('输出仍是 ASS', (await ev("window.S.text.indexOf('[Script Info]')")) === 0);
  chk('样式名 / 说话人 / 边距 / Effect 全在',
    /Dialogue: 2,0:00:03\.00,0:00:05\.20,Karaoke,singer,10,20,30,Fade,Hello/.test(await ev("window.S.text")),
    (await ev("window.S.text.split('\\n').filter(function(l){return l.indexOf('Dialogue: 2,')===0;})[0]")));
  chk('第二条也不丢', /Dialogue: 0,0:00:07\.00,0:00:09\.00,Default,,0,0,0,,World/.test(await ev("window.S.text")),
    (await ev("window.S.text.split('\\n').filter(function(l){return l.indexOf('Dialogue: 0,')===0;})[0]")));

  console.log('--- ⑩ 布局：不横向溢出 ---');
  chk('没有横向滚动', (await ev("document.documentElement.scrollWidth <= window.innerWidth + 1")) === true,
    await ev("document.documentElement.scrollWidth + '/' + window.innerWidth"));

  console.log('\n== ' + pass + ' 通过 / ' + fail + ' 失败 ==');
  chrome.kill('SIGKILL');
  process.exit(fail ? 1 : 0);
})();
