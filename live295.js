/* v0.9.295 外网实测（走代理 7897 起 headless Chrome 打线上 https://ai-srtsub.com/shift.html）
   重点：① 版号真的上去了 ② 体检卡在真网速下能出来并能采纳建议 ③ 控制台干净 ④ 移动端不溢出 */
'use strict';
process.on('unhandledRejection', () => { });
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');
const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PORT = 9395, SITE = 'https://ai-srtsub.com';
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

/* 四种病灶各一条：太短 / 挂太久 / 挨太近 / 一行太宽又读不完 */
const LONGHAN = '一二三四五六七八九十一二三四五六七八九十二二三四五六七八九十三二三四五六七八九十四二三四'
  + '五六七八九十五二三四五六七八九十六二三四五六七八九十七二三四五六七八九十八二三四五六七八九十九';
const SICK = '1\n00:00:00,000 --> 00:00:00,300\n太短的一条\n\n'
  + '2\n00:00:01,000 --> 00:00:09,000\n一句话在屏幕上挂了整整九秒钟啊\n\n'
  + '3\n00:00:09,080 --> 00:00:11,000\n紧贴着来的一条字幕\n\n'
  + '4\n00:00:12,000 --> 00:00:13,000\n' + LONGHAN + '\n';

let errs = [];
(async () => {
  const dir = '/tmp/live295-' + Date.now();
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

  const DIAG = await goto(SITE + '/shift.html').then(() => ev(`JSON.stringify({href:location.href, ready:document.readyState, core:typeof window.ShiftCore, setSrc:typeof setSrc})`)).catch(e => 'ERR ' + e.message);
  console.log('DIAG ' + DIAG);

  console.log('\n─── ① 线上确实是 295 ───');
  const src = await ev(`document.documentElement.innerHTML`);
  ok(/shift-core\.js\?v=0\.9\.295/.test(src), '页面引的是 295 的引擎', (src.match(/shift-core\.js\?v=[0-9.]+/) || [''])[0]);
  ok(/shift-i18n\.js\?v=0\.9\.295/.test(src), '页面引的是 295 的词典', (src.match(/shift-i18n\.js\?v=[0-9.]+/) || [''])[0]);
  ok(await ev(`!!document.getElementById('chkCard')`) === true, '体检卡在 DOM 里');
  ok(await ev(`!!(window.ShiftCore && window.ShiftCore.checkCues)`) === true, '引擎带着 checkCues');

  console.log('\n─── ② 放字幕进去，体检当场说话 ───');
  await ev(`setSrc(${JSON.stringify(SICK)}, 'sick.srt');1`); await wait(700);
  ok(await ev(`document.getElementById('chkCard').style.display`) !== 'none', '体检卡显示出来',
    await ev(`document.getElementById('chkCard').style.display`));
  const iss = await ev(`JSON.stringify(window.S.issues.map(function(x){return x.i+':'+x.why.join('+');}))`);
  ok(iss === '["0:short","1:long","2:gap","3:fast+line"]', '四条病灶全被点名', iss);
  ok(/4 条需要留意/.test(await ev(`document.getElementById('chkStat').textContent`)),
    '统计说「4 条需要留意」', await ev(`document.getElementById('chkStat').textContent`));
  ok(await ev(`document.querySelectorAll('#ruleRow [data-rule]').length`) === 5, '五个阈值框都渲染了',
    await ev(`document.querySelectorAll('#ruleRow [data-rule]').length`));
  const un = await ev(`JSON.stringify(Array.prototype.slice.call(document.querySelectorAll('#ruleRow .un')).map(function(e){return e.textContent;}))`);
  ok(un === '["秒","秒","字/秒","毫秒","字"]', '单位后缀写得很清楚', un);

  console.log('\n─── ③ 采纳建议：改得动，也撤得回 ───');
  ok(await ev(`JSON.stringify(window.S.ops.length)`) === '0', '没点之前一条操作都没有',
    await ev(`window.S.ops.length`));
  await ev(`document.querySelector('[data-fix="0,btnLengthen"]').click();1`); await wait(600);
  ok(await ev(`window.S.work[0].end - window.S.work[0].start`) === 700, '第 1 条补到 700 毫秒',
    await ev(`window.S.work[0].end - window.S.work[0].start`));
  const iss2 = await ev(`JSON.stringify(window.S.issues.map(function(x){return x.i+':'+x.why.join('+');}))`);
  ok(iss2.indexOf('0:short') < 0, '采纳后它从清单里消失', iss2);
  await ev(`document.getElementById('btnUndo').click();1`); await wait(500);
  ok(await ev(`JSON.stringify([window.S.work[0].start,window.S.work[0].end])`) === '[0,300]',
    '撤一次回到原样', await ev(`JSON.stringify([window.S.work[0].start,window.S.work[0].end])`));

  console.log('\n─── ④ 切分长条：字一个不许丢 ───');
  const before = await ev(`window.S.work.map(function(c){return c.text;}).join('')`);
  await ev(`document.querySelector('[data-fix="1,btnSplit"]').click();1`); await wait(700);
  const after = await ev(`window.S.work.map(function(c){return c.text;}).join('')`);
  ok(after.replace(/\s/g, '') === before.replace(/\s/g, ''), '切完拼回去还是原文', after.slice(0, 40));
  ok(await ev(`window.S.work.length`) >= 5, '条目数涨到 5 条以上', await ev(`window.S.work.length`));

  console.log('\n─── ⑤ 双语不该被单语的尺子量 ───');
  const BI = '1\n00:00:01,000 --> 00:00:09,000\n原文一句话停久了也不该被拆开\nThe translation should never be chopped\n\n'
    + '2\n00:00:10,000 --> 00:00:12,000\n尾巴\n';
  await ev(`setSrc(${JSON.stringify(BI)}, 'bi.srt');1`); await wait(700);
  ok(await ev(`JSON.stringify(window.S.issues.length)`) === '0', '双语持续 9 秒也没被点名',
    await ev(`JSON.stringify(window.S.issues.map(function(x){return x.i+':'+x.why.join('+');}))`));

  console.log('\n─── ⑥ 控制台干净 ───');
  ok(errs.length === 0, '没有 JS 报错', errs.slice(0, 3).join(' | '));

  console.log('\n─── ⑦ 手机上看不塌 ───');
  await ev(`setSrc(${JSON.stringify(SICK)}, 'sick.srt');1`); await wait(700);
  await metric(390, 844); await wait(600);
  ok(await ev(`document.documentElement.scrollWidth <= window.innerWidth + 1`) === true, '窄屏没有横向滚动',
    await ev(`document.documentElement.scrollWidth + '/' + window.innerWidth`));
  await shot('shift-295-mobile.png');
  await metric(1440, 900); await wait(600);
  await shot('shift-295-desktop.png');

  console.log('\n== ' + PASS + ' 通过 / ' + FAIL + ' 失败 ==');
  ch.kill('SIGKILL');
  process.exit(FAIL ? 1 : 0);
})();
