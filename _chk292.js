/* v0.9.292 本地真浏览器冒烟：同格式进出（ASS 样式保真）+ 合并 / 拆分 + 逐条微调。
   用法：node _chk292.js
   走 file:// 直接打开页面（纯前端页，不需要起服务）。 */
'use strict';
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');
const http = require('http');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawn } = require('child_process');

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PORT = 9920 + Math.floor(Math.random() * 60);
const DIR = '/Users/jp/WorkBuddy/2026-09-04-00-29-54/srt-translator';
const TARGET = 'file://' + DIR + '/shift.html';
const wait = ms => new Promise(r => setTimeout(r, ms));

const SRT = '1\n00:00:01,000 --> 00:00:03,200\nHello\n\n'
  + '2\n00:00:05,000 --> 00:00:07,000\nWorld\n';
const ASS = '[Script Info]\nTitle: My Show\nScriptType: v4.00+\n\n'
  + '[V4+ Styles]\nFormat: Name, Fontname, Fontsize, PrimaryColour\n'
  + 'Style: Karaoke,Arial,54,&H00FFFFFF\n\n'
  + '[Events]\nFormat: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text\n'
  + 'Dialogue: 2,0:00:01.00,0:00:03.20,Karaoke, singer,10,20,30,Fade,Hello\n'
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
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'chk292-'));
  console.log('[启动] port=' + PORT);
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
  console.log('[连接] 页面 URL = ' + tabs[0].url);
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
      const has = await ev("typeof setSrc!=='undefined'");
      dbg = rs + ' / setSrc=' + has;
      ok = rs === 'complete' && has === true;
    } catch (e) { dbg = 'ev 异常: ' + e.message; }
  }
  console.log('[就绪探测] ' + dbg);
  if (!ok) { console.log('!! 页面没加载出来'); chrome.kill('SIGKILL'); process.exit(1); }
  console.log('[就绪] 开始跑断言');

  let pass = 0, fail = 0;
  function chk(n, c, x) { if (c) { pass++; console.log('  ✓ ' + n); } else { fail++; console.log('  ✗ ' + n + (x !== undefined ? '  → ' + x : '')); } }
  const sleep = ms => wait(ms);
  async function setTool(id, val) {
    await ev("var s=document.getElementById('tool');s.value='" + id + "';s.dispatchEvent(new Event('change',{bubbles:true}));1");
    await sleep(150);
    if (val !== undefined) await ev("document.getElementById('toolVal').value='" + val + "';1");
    await ev('run();1');
    await sleep(300);
  }
  async function setMode(id) {
    await ev("var s=document.getElementById('mode');s.value='" + id + "';s.dispatchEvent(new Event('change',{bubbles:true}));1");
    await sleep(200);
  }

  /* ① 结构：模式 3 项 + 工具 4 项；输出格式下拉已经撤掉 */
  chk('模式下拉 3 个选项', (await ev("document.querySelectorAll('#mode option').length")) === 3);
  chk('合并拆分下拉 4 个选项', (await ev("document.querySelectorAll('#tool option').length")) === 4);
  chk('不再有输出格式下拉', (await ev("document.getElementById('outFmt')")) === null);
  chk('工具默认「不处理」时值框收起', (await ev("getComputedStyle(document.getElementById('toolVal')).display")) === 'none');

  /* ② SRT：同格式进出 + 平移不动时长 */
  await ev("setSrc(" + JSON.stringify(SRT) + ", 'demo.srt');1"); await sleep(400);
  chk('识别到 SRT', (await ev("document.getElementById('srcFmt').textContent")) === 'SRT');
  chk('明确写出「输出与原文件一致」', /SRT/.test(await ev("document.getElementById('outKeep').textContent")),
    await ev("document.getElementById('outKeep').textContent"));
  await setMode('shift');
  await ev("document.getElementById('msVal').value='2';run();1"); await sleep(350);
  chk('平移 +2s：起点 3000/7000', JSON.stringify(await ev("window.S.work.map(function(c){return c.start;})")) === '[3000,7000]',
    JSON.stringify(await ev("window.S.work.map(function(c){return c.start;})")));
  chk('平移不动时长', (await ev("JSON.stringify(window.S.work.map(function(c){return c.end-c.start;}))")) === '[2200,2000]');
  chk('输出还是 SRT（不是 VTT）', !/^WEBVTT/.test(await ev("window.S.text")) && /-->/.test(await ev("window.S.text")));
  chk('下载名沿用原文件名', (await ev("window.ShiftCore.outName('demo.srt','srt')")) === 'demo.srt');

  /* ③ 负时间截断 */
  await ev("document.getElementById('msVal').value='-6';run();1"); await sleep(350);
  chk('负时间压到 0 并报 2 条', (await ev("window.S.clamped")) === 2, await ev("window.S.clamped"));

  /* ④ 倍率 / 两点校正 */
  await setMode('rate');
  await ev("document.getElementById('rateVal').value='1.5';run();1"); await sleep(350);
  chk('倍率 1.5：时长同步缩放', (await ev("JSON.stringify(window.S.work.map(function(c){return c.end-c.start;}))")) === '[3300,3000]');
  await setMode('two');
  await ev("document.getElementById('tgtA').value='00:00:02,000';document.getElementById('tgtB').value='00:00:09,000';run();1"); await sleep(350);
  chk('两点校正：首条落在 2 秒', (await ev("window.S.work[0].start")) === 2000);
  chk('两点校正：末条落在 9 秒', (await ev("window.S.work[window.S.work.length-1].end")) === 9000);
  await ev("document.getElementById('tgtA').value='';run();1"); await sleep(300);
  chk('目标空着时报参数错', /参数/.test(await ev("document.getElementById('msg').textContent")),
    await ev("document.getElementById('msg').textContent"));

  /* ⑤ 合并相邻短间隙 */
  await setMode('shift');
  await ev("document.getElementById('msVal').value='0';1");
  await setTool('gap', '2000');
  chk('间隙 1800ms < 2000 → 合成一条', (await ev("window.S.work.length")) === 1, await ev("window.S.work.length"));
  chk('合并后起止取首尾', (await ev("window.S.work[0].start + '/' + window.S.work[0].end")) === '1000/7000',
    await ev("window.S.work[0].start + '/' + window.S.work[0].end"));
  chk('提示里报了合并条数', /1/.test(await ev("document.getElementById('msg').textContent")),
    await ev("document.getElementById('msg').textContent"));
  await setTool('gap', '100');
  chk('间隙阈值调小后不再合并', (await ev("window.S.work.length")) === 2);

  /* ⑥ 拆分：按时长 / 按字数 */
  await setTool('dur', '2');
  chk('单单词Hello切不动就不切（不劈成 Hel/lo）', (await ev("window.S.work.length")) === 2, await ev("window.S.work.length"));
  await setTool('char', '3');
  chk('按字数 3 也不劈单词', (await ev("window.S.work.length")) === 2, await ev("window.S.work.length"));
  /* 换一份有词边界的字幕，验证拆分是真的能拆 */
  await ev("setSrc(\"1\\n00:00:01,000 --> 00:00:09,000\\nHello there my friend\\n\\n2\\n00:00:20,000 --> 00:00:22,000\\nBye\\n\", 'w.srt');1"); await sleep(400);
  await setTool('dur', '2');
  chk('有词边界的长句按时长拆开了', (await ev("window.S.work.length")) > 2, await ev("window.S.work.length"));
  chk('拆分后时间首尾仍对齐', (await ev("window.S.work[0].start")) === 1000
    && (await ev("window.S.work[window.S.work.length-1].end")) === 22000,
    await ev("window.S.work[0].start + '/' + window.S.work[window.S.work.length-1].end"));
  await setTool('none');
  chk('切回不处理后恢复 2 条', (await ev("window.S.work.length")) === 2);

  /* ⑦ 双语：合并保两行、拆分整条跳过 */
  const BI = '1\n00:00:01,000 --> 00:00:03,200\nHello there\n你好啊\n\n'
    + '2\n00:00:05,000 --> 00:00:07,000\nBye\n再见\n';
  await ev("setSrc(" + JSON.stringify(BI) + ", 'bi.srt');1"); await sleep(400);
  chk('双语条目被认出来', (await ev("window.ShiftCore.isBilingualCue(window.S.base[0])")) === true);
  await setTool('char', '3');
  chk('双语条目不参与拆分', (await ev("window.S.work.length")) === 2, await ev("window.S.work.length"));
  await setTool('gap', '9000');
  chk('双语合并后仍是两行（不挤成一行）', (await ev("window.S.work[0].text.split('\\n').length")) === 4,
    await ev("JSON.stringify(window.S.work[0].text)"));

  /* ⑧ ASS：样式保真（本轮最关键的一条） */
  await ev("setSrc(" + JSON.stringify(ASS) + ", 'demo.ass');1"); await sleep(400);
  chk('识别到 ASS', (await ev("document.getElementById('srcFmt').textContent")) === 'ASS');
  await setTool('none');
  await setMode('shift');
  await ev("document.getElementById('msVal').value='2';run();1"); await sleep(350);
  let tx = await ev('window.S.text');
  chk('ASS 输出还是 ASS', /\[Script Info\]/.test(tx) && /Dialogue:/.test(tx));
  chk('ASS 的 Script Info 还在', /Title: My Show/.test(tx));
  chk('ASS 的样式表还在', /Style: Karaoke,Arial,54/.test(tx));
  chk('ASS 每条的 Style / 边距 / Effect 列还在', /Karaoke, singer,10,20,30,Fade/.test(tx));
  chk('ASS 的 Layer 列还在', /Dialogue: 2,/.test(tx));
  chk('ASS 时间确实被改了', /0:00:03\.00/.test(tx) && /0:00:05\.20/.test(tx), tx.split('\n').filter(l => /Dialogue/.test(l)).join(' | '));
  chk('下载名还是 .ass', (await ev("window.ShiftCore.outName('demo.ass','ass')")) === 'demo.ass');

  /* ⑨ 逐条微调：合并 / 切分 / 改时间 / 撤销 */
  await ev("setSrc(" + JSON.stringify(SRT) + ", 'demo.srt');1"); await sleep(400);
  await setMode('shift');
  await ev("document.getElementById('msVal').value='0';run();1"); await sleep(350);
  chk('逐条列表渲染出来了', (await ev("document.querySelectorAll('#list .li').length")) === 2,
    await ev("document.querySelectorAll('#list .li').length"));
  await ev("document.querySelector('[data-merge=\"0\"]').click();1"); await sleep(300);
  chk('点「合并下一条」后变 1 条', (await ev("window.S.work.length")) === 1, await ev("window.S.work.length"));
  chk('统计里记了 1 处手动调整', /1/.test(await ev("document.getElementById('editStat').textContent")),
    await ev("document.getElementById('editStat').textContent"));
  await ev("document.querySelector('[data-split=\"0\"]').click();1"); await sleep(300);
  chk('点「切分」后变 2 条', (await ev("window.S.work.length")) === 2, await ev("window.S.work.length"));
  await ev("var b=document.querySelector('[data-s=\"1\"]');b.value='00:00:20,000';b.dispatchEvent(new Event('change',{bubbles:true}));1"); await sleep(350);
  chk('手改起点生效', (await ev("window.S.work[1].start")) === 20000, await ev("window.S.work[1].start"));
  await ev("document.getElementById('btnUndo').click();1"); await sleep(300);
  /* 撤掉 set 之后还剩 merge + split，时间按切分重排（4000），不该再是手改的 20000 */
  chk('撤销手改后回到切分后的时间', (await ev("window.S.work[1].start")) === 4000, await ev("window.S.work[1].start"));
  await ev("document.getElementById('btnUndo').click();1"); await sleep(250);
  chk('再撤一步（撤掉切分）变回 1 条', (await ev("window.S.work.length")) === 1, await ev("window.S.work.length"));
  await ev("document.getElementById('btnUndo').click();1"); await sleep(250);
  chk('撤到底恢复 2 条', (await ev("window.S.work.length")) === 2, await ev("window.S.work.length"));
  await ev("document.getElementById('btnUndo').click();1"); await sleep(250);
  chk('撤到底后再点会提示没得撤', /没有|Nothing|No /i.test(await ev("document.getElementById('msg').textContent")),
    await ev("document.getElementById('msg').textContent"));

  /* ⑩ 27 语 */
  await ev("document.getElementById('langSel').value='en';document.getElementById('langSel').dispatchEvent(new Event('change',{bubbles:true}));1"); await sleep(400);
  chk('切英文后工具选项变英文', /Merge/i.test(await ev("document.getElementById('tool').options[1].textContent")),
    await ev("document.getElementById('tool').options[1].textContent"));
  chk('切英文后输出说明变英文', /Same as the original/i.test(await ev("document.getElementById('outKeep').textContent")),
    await ev("document.getElementById('outKeep').textContent"));
  chk('切英文后逐条列表标题变英文', /line/i.test(await ev("document.querySelector('#listCard h2 span:last-child').textContent")),
    await ev("document.querySelector('#listCard h2 span:last-child').textContent"));

  console.log('\n本地冒烟（shift v292）：' + pass + ' 通过 / ' + fail + ' 失败');
  chrome.kill('SIGKILL');
  process.exit(fail ? 1 : 0);
})().catch(e => { console.log('ERR ' + e.message); process.exit(1); });
