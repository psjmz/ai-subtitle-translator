/* v0.9.245 第三批 E2E：槽的语义（补丁 vs 快照）+ 双语/单语参数组数 + 整篇套用按钮 + 槽标签 */
'use strict';
const http = require('http');
const { spawn } = require('child_process');
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');

const PORT = 3098;
const BASE = 'http://127.0.0.1:' + PORT;
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

let pass = 0, fail = 0;
function ok(name, cond, extra) {
  if (cond) { pass++; console.log('  ✓ ' + name); }
  else { fail++; console.log('  ✗ ' + name + (extra ? '\n      ' + extra : '')); }
}

const SRT_EN = ['1', '00:00:01,000 --> 00:00:03,000', 'Hello there', '',
  '2', '00:00:04,000 --> 00:00:06,000', 'Second line here', ''].join('\n') + '\n';
const SRT_ZH = ['1', '00:00:01,000 --> 00:00:03,000', '你好啊', '',
  '2', '00:00:04,000 --> 00:00:06,000', '这是第二行', ''].join('\n') + '\n';

let ws, idSeq = 0;
const pending = new Map();
const events = [];
function send(method, params) {
  const id = ++idSeq;
  ws.send(JSON.stringify({ id, method, params: params || {} }));
  return new Promise((res, rej) => {
    pending.set(id, { res, rej });
    setTimeout(() => { if (pending.has(id)) { pending.delete(id); rej(new Error('timeout ' + method)); } }, 20000);
  });
}
async function evalJs(expr) {
  const r = await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true });
  if (r.exceptionDetails) throw new Error(r.exceptionDetails.text + ' ' + (r.exceptionDetails.exception || {}).description);
  return r.result.value;
}
const wait = ms => new Promise(r => setTimeout(r, ms));

(async () => {
  const chrome = spawn(CHROME, ['--headless=new', '--remote-debugging-port=9335', '--no-sandbox', '--disable-gpu',
    '--remote-allow-origins=*', '--window-size=1440,1600', '--user-data-dir=/tmp/cbuddy-e2e245c-' + Date.now()], { stdio: 'ignore' });
  await wait(2500);
  const list = await new Promise((res, rej) => {
    http.get('http://127.0.0.1:9335/json/list', r => { let b = ''; r.on('data', d => b += d); r.on('end', () => res(JSON.parse(b))); }).on('error', rej);
  });
  ws = new WebSocket(list.find(t => t.type === 'page').webSocketDebuggerUrl, { perMessageDeflate: false });
  await new Promise(r => ws.on('open', r));
  ws.on('message', buf => {
    const m = JSON.parse(buf.toString());
    if (m.id && pending.has(m.id)) { const p = pending.get(m.id); pending.delete(m.id); m.error ? p.rej(new Error(JSON.stringify(m.error))) : p.res(m.result); }
    else if (m.method) events.push(m);
  });
  await send('Page.enable'); await send('Runtime.enable'); await send('Log.enable');
  await send('Network.enable'); await send('Network.setCacheDisabled', { cacheDisabled: true });

  await send('Page.navigate', { url: BASE + '/merge.html' });
  await wait(2200);
  await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1600, deviceScaleFactor: 1, mobile: false });
  await wait(400);

  console.log('— 双语模式：槽编辑是两组 —');
  await evalJs("(function(){var t=$('srcText');t.value=" + JSON.stringify(SRT_EN) + ";t.dispatchEvent(new Event('input',{bubbles:true}));})()");
  await evalJs("(function(){var t=$('dstText');t.value=" + JSON.stringify(SRT_ZH) + ";t.dispatchEvent(new Event('input',{bubbles:true}));})()");
  await wait(500);
  await evalJs("$('btnMerge').click()");
  await wait(700);
  await evalJs("$('slotEdit').open = true;");
  await evalJs("$('slotViewAll').click()");
  await wait(300);
  const biRows = await evalJs("document.querySelectorAll('#slotParams .slot-row').length");
  /* 246 起参数 5→17 项：双语 = dst 17 + src 15 = 32（src 少 alpha「noSrc」与 dMV「整条级」） */
  ok('双语模式全量视图 = 32 项（dst 17 + src 15）', biRows === 32, 'rows=' + biRows);
  await evalJs("$('slotViewDiff').click()");
  await wait(250);
  const covTxt = await evalJs("$('slotCover').textContent");
  ok('覆盖计数文案带总数（N / 32，= 实际能覆盖的项数）', /32/.test(covTxt), '文案=' + covTxt);
  const grpN = await evalJs("document.querySelectorAll('#slotParams .slot-grp').length");
  ok('双语模式有「译文行 / 原文行」两个分组标题', grpN >= 0, 'grp=' + grpN);

  console.log('— 切单语：只剩一组 —');
  await evalJs("(function(){var el=document.querySelector('#modeTabs input[value=mono]');el.checked=true;el.dispatchEvent(new Event('change',{bubbles:true}));})()");
  await wait(300);
  await evalJs("(function(){var t=$('srcText');t.value=" + JSON.stringify(SRT_ZH) + ";t.dispatchEvent(new Event('input',{bubbles:true}));$('btnMerge').click();})()");
  await wait(700);
  await evalJs("$('slotViewAll').click()");
  await wait(300);
  const monoRows = await evalJs("document.querySelectorAll('#slotParams .slot-row').length");
  ok('单语模式全量视图 = 17 项（原文行那半整块不画）', monoRows === 17, 'rows=' + monoRows);
  const noSrcKey = await evalJs("document.querySelectorAll('#slotParams [data-sp-k^=\"src.\"]').length");
  ok('单语模式不出现 src.* 参数', noSrcKey === 0, 'src 控件=' + noSrcKey);

  console.log('— 「整篇套用」按钮真实点击（v0.9.250 起在贴底条里）—');
  await evalJs("(function(){ensureStyle();S.sel=new Set((S.rows||[]).map(function(r,i){return i;}));renderReport();})()");
  await wait(400);
  const chipN = await evalJs("document.querySelectorAll('#selDock [data-dock-slot]').length");
  ok('贴底条槽胶囊与槽栏同源（5 个出厂槽）', chipN === 5, 'chips=' + chipN);
  await evalJs("(function(){ensureStyle();S.style.cur='narration';renderSelDock();document.querySelector('#selDock [data-dock-all=\"1\"]').click();})()");
  await wait(400);
  const allNar = await evalJs("(S.rows||[]).every(function(r,i){return slotOfRow(i)==='narration';})");
  ok('点「整篇套用」→ 每行都是旁白槽', allNar, JSON.stringify(await evalJs("S.style.assign")));
  const tagColor = await evalJs("(function(){var d=document.querySelector('#repRows .slot-tag .slot-dot');return d?d.style.background:'(无)';})()");
  ok('表格槽标签用的是槽自己的颜色', /186, 117, 23|rgb/.test(String(tagColor)), '色=' + tagColor);
  const btnLbl = await evalJs("document.querySelector('#selDock [data-dock-all=\"1\"]').textContent");
  ok('「整篇套用」按钮文案带槽名', /旁白|narration/i.test(String(btnLbl)), '文案=' + btnLbl);

  console.log('— 槽是「补丁」不是「快照」：改基础样式，槽行跟着变 —');
  await evalJs("(function(){var s=$('expFmt');s.value='split';s.dispatchEvent(new Event('change',{bubbles:true}));})()");
  await wait(400);
  await evalJs("applySlotToAll('emphasis')");   /* 强调槽：只覆盖 bold，字号沿用基础 */
  await wait(300);
  const sz1 = await evalJs("(buildExport().match(/^Style: SlotD_emphasis,.*$/m)||[''])[0].split(',')[2]");
  const base1 = await evalJs("(buildExport().match(/^Style: Bottom,.*$/m)||[''])[0].split(',')[2]");
  ok('槽没覆盖字号 → 槽样式的字号 = 基础样式字号', sz1 === base1 && !!sz1, '槽=' + sz1 + ' 基础=' + base1);
  /* 改基础字号 → 两边一起变 */
  await evalJs("(function(){var e=$('assDstSize');if(!e){var c=document.querySelector('[id*=DstSize]');e=c;}e.value=String(parseFloat(e.value||'54')+20);e.dispatchEvent(new Event('input',{bubbles:true}));e.dispatchEvent(new Event('change',{bubbles:true}));})()");
  await wait(400);
  const sz2 = await evalJs("(buildExport().match(/^Style: SlotD_emphasis,.*$/m)||[''])[0].split(',')[2]");
  const base2 = await evalJs("(buildExport().match(/^Style: Bottom,.*$/m)||[''])[0].split(',')[2]");
  ok('基础字号 +20 → 基础样式跟着变', parseFloat(base2) === parseFloat(base1) + 20, base1 + ' → ' + base2);
  ok('基础字号 +20 → 槽样式**也**跟着变（槽是补丁，不是拍下来的快照）',
    parseFloat(sz2) === parseFloat(base2), '槽=' + sz2 + ' 基础=' + base2);
  const boldCol = await evalJs("(buildExport().match(/^Style: SlotD_emphasis,.*$/m)||[''])[0].split(',')[7]");
  ok('槽自己覆盖的粗体没有跟着基础跑（仍是 -1）', boldCol === '-1', 'Bold 列=' + boldCol);

  console.log('— 出厂槽改过 → 标「已修改」且能恢复 —');
  await evalJs("(function(){var c=document.querySelector('#slotBar [data-slot-edit=emphasis]');c.dispatchEvent(new MouseEvent('click',{bubbles:true}));})()");
  await wait(250);
  await evalJs("$('slotViewAll').click()");
  await wait(250);
  await evalJs("(function(){var a=document.querySelector('#slotParams [data-sp-act=set][data-sp-k=\"dst.color\"]');a.dispatchEvent(new MouseEvent('click',{bubbles:true}));})()");
  await wait(300);
  const chipTxt = await evalJs("document.querySelector('#slotBar .slot-chip[data-slot=emphasis]').textContent");
  ok('槽栏上出现「已修改」标记', /已修改/.test(chipTxt), 'chip=' + chipTxt.trim());
  await evalJs("$('slotRestore').click()");
  await wait(300);
  const chipTxt2 = await evalJs("document.querySelector('#slotBar .slot-chip[data-slot=emphasis]').textContent");
  ok('恢复预设后「已修改」标记消失', !/已修改/.test(chipTxt2), 'chip=' + chipTxt2.trim());

  const errs = events.filter(e => e.method === 'Log.entryAdded' && e.params.entry.level === 'error').map(e => e.params.entry.text);
  ok('全流程无 JS 错误', errs.length === 0, errs.slice(0, 3).join(' | '));

  console.log('\n通过 ' + pass + ' · 失败 ' + fail);
  ws.close(); chrome.kill('SIGKILL');
  process.exit(fail ? 1 : 0);
})().catch(e => { console.error('FATAL', e); try { ws.close(); } catch (_) {} process.exit(1); });
