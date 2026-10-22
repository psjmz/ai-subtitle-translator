/* v0.9.306 真浏览器实测（形态 B 在「逐条微调」里的呈现）
   ① 一对串成一组 .pg，两条各自保留独立时间框（分开调的自由度还在）
   ② 同轴时不提示；手动把两条调开 → 出现 .pnote + 「对齐」按钮
   ③ 点「对齐」→ 两条拉回同轴（取并集），提示消失
   ④ 撤销一次撤一整组（成组 op），不会留下「只撤了一半」的中间态
   ⑤ 配对上的「合并为一条」把形态 B 转成形态 A，文案说清了是形态转换
   ⑥ 双语条目上不摆「切分」按钮（点了引擎也拦，摆出来看着像坏了）
   ⚠️ 探针口径：S.work 没点「开始」时是空的，页面自己回退到 S.base —— 跟着写，别直接读 S.work */
'use strict';
process.on('unhandledRejection', e => { console.log('UNHANDLED', e && e.message); });
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');
const { spawn } = require('child_process');
const http = require('http');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PORT = 9500 + Math.floor(Math.random() * 90);
const SRV = Number(process.env.SRV || 3512);
const wait = ms => new Promise(r => setTimeout(r, ms));
let PASS = 0, FAIL = 0, ws, tid = 0;
const pending = new Map();
const ok = (c, n, x) => { console.log('  ' + (c ? '✓' : '✗') + ' ' + n + (x !== undefined ? '  [' + String(x).slice(0, 150) + ']' : '')); c ? PASS++ : FAIL++; };
function send(m, p) {
  const id = ++tid; ws.send(JSON.stringify({ id, method: m, params: p || {} }));
  return new Promise((res, rej) => { pending.set(id, { res, rej }); setTimeout(() => { if (pending.has(id)) { pending.delete(id); rej(new Error('timeout ' + m)); } }, 30000); });
}
async function ev(e) {
  const r = await send('Runtime.evaluate', { expression: e, returnByValue: true, awaitPromise: true });
  if (r.exceptionDetails) throw new Error(r.exceptionDetails.text + ' ' + JSON.stringify(r.exceptionDetails.exception || '').slice(0, 200));
  return r.result.value;
}

const SRT = [
  '1', '00:00:01,000 --> 00:00:02,800', 'This is sentence number one.', '',
  '2', '00:00:01,000 --> 00:00:02,800', '这是第一句话。', '',
  '3', '00:00:03,000 --> 00:00:04,800', 'This is sentence number two.', '',
  '4', '00:00:03,000 --> 00:00:04,800', '这是第二句话。', '',
  '5', '00:00:05,000 --> 00:00:06,800', 'This is sentence number three.', '',
  '6', '00:00:05,000 --> 00:00:06,800', '这是第三句话。', ''
].join('\n');

async function main() {
  const cr = spawn(CHROME, ['--headless=new', '--remote-debugging-port=' + PORT, '--no-sandbox', '--disable-gpu',
    '--host-resolver-rules=MAP * ~NOTFOUND, EXCLUDE 127.0.0.1',
    '--user-data-dir=/tmp/cr-305-' + Date.now(), 'about:blank'], { stdio: 'ignore' });
  let list = null;
  for (let i = 0; i < 30; i++) {
    try { list = await new Promise((res, rej) => { http.get({ host: '127.0.0.1', port: PORT, path: '/json/list' }, r => { let d = ''; r.on('data', c => d += c); r.on('end', () => res(d)); }).on('error', rej); }); if (list.includes('webSocketDebuggerUrl')) break; } catch (e) { }
    await wait(300);
  }
  const target = JSON.parse(list).find(t => t.type === 'page');
  ws = new WebSocket(target.webSocketDebuggerUrl, { perMessageDeflate: false });
  await new Promise((res, rej) => { ws.on('open', res); ws.on('error', rej); });
  ws.on('message', d => { const m = JSON.parse(d); if (m.id && pending.has(m.id)) { pending.get(m.id).res(m.result || m); pending.delete(m.id); } });
  await send('Page.enable'); await send('Runtime.enable');
  await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1200, deviceScaleFactor: 1, mobile: false });

  /* ① 页面加载 */
  await send('Page.navigate', { url: 'http://127.0.0.1:' + SRV + '/shift.html' });
  for (let i = 0; i < 60; i++) { try { if ((await ev('document.readyState')) === 'complete') break; } catch (e) { } await wait(400); }
  await wait(1200);
  const D = JSON.parse((await ev('JSON.stringify({href:location.href,setSrc:typeof setSrc,core:typeof window.ShiftCore,pg:(window.ShiftCore&&typeof ShiftCore.isPairGroup)})')));
  ok(D.href.includes('shift.html'), '页面在本机服务上', D.href);
  ok(D.setSrc === 'function', 'setSrc 在位');
  ok(D.pg === 'function', '引擎有 isPairGroup（新文件真的服务出来了）', D.pg);

  /* ② 注入形态 B 字幕 + 点「开始」 */
  await ev('setSrc(' + JSON.stringify(SRT) + ', "bil.srt")');
  await wait(300);
  ok((await ev('S.base.length')) === 6, '解析出 6 条（3 句 × 原文/译文）', await ev('S.base.length'));
  await ev("$('#btnGo').click()");
  await wait(600);
  ok((await ev('S.work && S.work.length')) === 6, '「开始」后 S.work 就位');
  ok((await ev("$('#listCard').style.display !== 'none'")), '逐条微调卡片已展开');

  /* ③ 一对 = 一组；两条各自保留独立时间框 */
  const L = JSON.parse((await ev(`JSON.stringify({
    pg: document.querySelectorAll('#list .pg').length,
    li: document.querySelectorAll('#list .li').length,
    inPg: Array.from(document.querySelectorAll('#list .pg')).map(p => p.querySelectorAll('.li').length),
    sIn: document.querySelectorAll('#list .pg .li input[data-s]').length,
    eIn: document.querySelectorAll('#list .pg .li input[data-e]').length,
    note: document.querySelectorAll('#list .pnote').length,
    mtxt: (document.querySelector('#list .pg .li [data-merge]')||{}).textContent,
    split: document.querySelectorAll('#list .pg .li [data-split]').length,
    line: (function(){var s=getComputedStyle(document.querySelector('#list .pg'));return s.borderLeftWidth+' '+s.borderLeftColor;})(),
    band: (function(){var g=document.querySelector('#list .pg'),q=document.querySelector('#list .pg .li');
      return getComputedStyle(g).backgroundColor+' | '+getComputedStyle(q).backgroundColor;})(),
    gap: getComputedStyle(document.querySelector('#list .pg')).marginTop
  })`)));
  ok(L.pg === 3, '3 句串成 3 个组', L.pg);
  ok(L.li === 6, '组内共 6 行（一条没少）', L.li);
  ok(L.inPg.join(',') === '2,2,2', '每组正好两条', L.inPg.join(','));
  ok(L.sIn === 6 && L.eIn === 6, '每条各有独立的起点/终点输入框（分开调的自由度还在）', L.sIn + '/' + L.eIn);
  ok(L.note === 0, '同轴时不提示（没噪音）', L.note);
  ok(L.mtxt === '合并为一条', '配对上文案是「合并为一条」（明说是形态转换）', L.mtxt);
  ok(L.split === 0, '双语条目上不摆切分按钮', L.split);
  /* 306：305 那道 3px --acc-line 竖线在用户那里「没看出来」—— 断言不能再只查「有没有画」，
     要查「看不看得出来」：实心 --acc 左条 + 整对有色带 + 组之间有间隙（不然三组连成一条） */
  ok(L.line === '4px rgb(79, 70, 229)', '组左边是 4px 实心主色条（不再是白底上看不见的淡紫）', L.line);
  ok(L.band === 'rgb(238, 240, 254) | rgba(0, 0, 0, 0)', '整对铺一条淡靛蓝色带（行本身透明，让色带透出来）', L.band);
  ok(parseFloat(L.gap) > 0, '组与组之间留了间隙（否则相邻两组的竖线连成整条，反而看不出分组）', L.gap);

  /* ④ 手动把原文结束时间调开 300ms —— 这本来会让体检静默报 overlap */
  await ev(`(function(){
    var inp=document.querySelector('#list input[data-e="0"]');
    inp.value='00:00:03,100';
    inp.dispatchEvent(new Event('change'));
    return 1;})()`);
  await wait(500);
  const U = JSON.parse((await ev(`JSON.stringify({
    pg: document.querySelectorAll('#list .pg').length,
    note: document.querySelectorAll('#list .pnote').length,
    txt: (document.querySelector('#list .pnote .pn')||{}).textContent,
    align: document.querySelectorAll('#list [data-align]').length,
    bg: document.querySelector('#list .pnote') ? getComputedStyle(document.querySelector('#list .pnote')).backgroundColor : '',
    ends: [S.work[0].end, S.work[1].end],
    pair: ShiftCore.isBilingualPair(S.work[0], S.work[1]),
    /* 306 修的护栏 bug：305 的按钮护栏全是「现算当前还算不算一对」，
       两条一被调开配对关系就不成立，护栏集体失效 ——
       译文行冒出「合并下一条」（跨句拼接）和「切分」（引擎拦着，点了没反应）。 */
    tailMerge: document.querySelectorAll('#list .pg .li:nth-child(2) [data-merge]').length,
    tailSplit: document.querySelectorAll('#list .pg .li:nth-child(2) [data-split]').length,
    headTxt: (document.querySelector('#list .pg .li [data-merge]')||{}).textContent
  })`)));
  ok(U.pg === 3, '被调开后组**还在**（不能一调开就散）', U.pg);
  ok(U.tailMerge === 0, '被调开后译文行也不摆合并按钮（否则会跨句拼下一句原文）', U.tailMerge);
  ok(U.tailSplit === 0, '被调开后译文行也不摆切分按钮（护栏不许一调开就失效）', U.tailSplit);
  ok(U.headTxt === '合并为一条', '被调开后前一条仍是「合并为一条」', U.headTxt);
  ok(U.note === 1, '出现不同轴提示', U.note);
  ok(!!U.txt && U.txt.indexOf('300') >= 0, '提示说清了差多少', U.txt);
  ok(U.align === 1, '给了「对齐」退路', U.align);
  ok(U.ends[0] === 3100 && U.ends[1] === 2800, '两条终点确实被调开了', U.ends.join('/'));
  ok(U.pair === false, '此时已不算一对（判据没被放宽）', U.pair);

  /* ⑤ 点「对齐」 */
  await ev(`document.querySelector('#list [data-align]').click()`);
  await wait(500);
  const A = JSON.parse((await ev(`JSON.stringify({
    note: document.querySelectorAll('#list .pnote').length,
    ends: [S.work[0].end, S.work[1].end],
    starts: [S.work[0].start, S.work[1].start],
    pair: ShiftCore.isBilingualPair(S.work[0], S.work[1]),
    ops: S.ops.length
  })`)));
  ok(A.ends[0] === 3100 && A.ends[1] === 3100, '对齐后终点一致，取并集 3100（不截短）', A.ends.join('/'));
  ok(A.starts[0] === A.starts[1], '对齐后起点一致');
  ok(A.pair === true, '重新被认成一对');
  ok(A.note === 0, '提示消失了', A.note);
  ok(A.ops === 2, 'ops 累积了 2 步（改时间 + 对齐）', A.ops);

  /* ⑥ 撤销一次撤一整组 —— 成组 op 不能被拆成两步 */
  await ev(`$('#btnUndo').click()`);
  await wait(500);
  const N = JSON.parse((await ev(`JSON.stringify({
    ops: S.ops.length,
    ends: [S.work[0].end, S.work[1].end],
    note: document.querySelectorAll('#list .pnote').length
  })`)));
  ok(N.ops === 1, '撤一次只退一步（对齐那一组两个 op 一起撤）', N.ops);
  ok(N.ends[0] === 3100 && N.ends[1] === 2800, '退回到对齐前：两条又错开了（不是只撤一半）', N.ends.join('/'));
  ok(N.note === 1, '提示跟着回来了', N.note);

  /* ⑦ 「合并为一条」把形态 B 转成形态 A */
  await ev(`document.querySelector('#list .pg .li [data-merge]').click()`);
  await wait(500);
  const M = JSON.parse((await ev(`JSON.stringify({
    n: S.work.length,
    cue: ShiftCore.isBilingualCue(S.work[0]),
    txt: S.work[0].text,
    pg: document.querySelectorAll('#list .pg').length
  })`)));
  ok(M.n === 5, '6 条 → 5 条（一对并成一条）', M.n);
  ok(M.cue === true, '并出来的是形态 A（一条两行）', M.cue);
  ok(M.txt.indexOf('\n') > 0, '两行都留着，没被拼成一行', JSON.stringify(M.txt));
  ok(M.pg === 2, '剩下 2 句仍是 2 组', M.pg);

  /* ⑧ 换一门语言，提示文案跟着变（带数字的行不走 data-i18n） */
  await ev(`$('#btnUndo').click()`);
  await wait(400);
  await ev(`(function(){var s=$('#langSel');if(s){s.value='en';s.dispatchEvent(new Event('change'));}return 1;})()`);
  await wait(600);
  const EN = (await ev(`(document.querySelector('#list .pnote .pn')||{}).textContent`));
  ok(!!EN && /Out of sync/.test(String(EN)), '切英文后提示变英文', EN);
  const ENB = (await ev(`(document.querySelector('#list .pg .li [data-merge]')||{}).textContent`));
  ok(String(ENB) === 'Join into one', '切英文后按钮文案跟着变', ENB);

  console.log('---- ' + PASS + ' 通过 / ' + FAIL + ' 失败 ----');
  cr.kill();
  process.exit(FAIL ? 1 : 0);
}
main().catch(e => { console.log('FATAL', e.message); process.exit(2); });
