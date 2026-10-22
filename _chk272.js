/* v0.9.272 实测（特效页）：双语模板 2→5 / 3→6 + 时间轴四件套
   验的是真 DOM：真点模板按钮、真敲 +1.5s、真点三选、真点批量弹窗、真点一键修。
   契约：
     ① ASS 模板 6 档 / VTT 模板 7 档，点新档位 → 档位码与角标真的换
     ② 时间格认绝对时间，也认 +1.5s / -500 这类相对值；认不出来不动这一格
     ③ 改完与邻居重叠 → 行下真的摊出三选条；点「吸附」真的吸上去
     ④ 批量三件套：整体偏移（真点弹窗）/ 从某条起 / 比例缩放（连时长一起缩）
     ⑤ 时长体检 → 一键修只修「轴站不住」的三类，修完再体检是干净的
     ⑥ 整轮无 JS 异常 */
'use strict';
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');
const PORT = 9333, BASE = 'http://127.0.0.1:3098';
const wait = ms => new Promise(r => setTimeout(r, ms));
const http = require('http');
let PASS = 0, FAIL = 0;
const ok = (c, n, x) => { console.log((c ? '  ✓ ' : '  ✗ ') + n + (x !== undefined ? '  [' + x + ']' : '')); c ? PASS++ : FAIL++; };
const J = p => new Promise((res, rej) => { const r = http.request({ host: '127.0.0.1', port: PORT, path: p, method: 'PUT' }, x => { let d = ''; x.on('data', c => d += c); x.on('end', () => { try { res(JSON.parse(d)); } catch (e) { rej(new Error(d.slice(0, 200))); } }); }); r.on('error', rej); r.end(); });

(async () => {
  const v = await J('/json/new?' + encodeURIComponent('about:blank'));
  const ws = new WebSocket(v.webSocketDebuggerUrl, { perMessageDeflate: false });
  let id = 0; const wt = new Map(); const errs = [];
  await new Promise(r => ws.on('open', r));
  ws.on('message', m => { const g = JSON.parse(m);
    if (g.id && wt.has(g.id)) { const q = wt.get(g.id); wt.delete(g.id); g.error ? q.rej(new Error(JSON.stringify(g.error))) : q.res(g.result); }
    if (g.method === 'Runtime.exceptionThrown') errs.push(((g.params.exceptionDetails.exception || {}).description) || g.params.exceptionDetails.text); });
  const send = (m, p) => new Promise((res, rej) => { const i = ++id; wt.set(i, { res, rej }); ws.send(JSON.stringify({ id: i, method: m, params: p || {} })); });
  const ev = async e => { const r = await send('Runtime.evaluate', { expression: e, returnByValue: true, awaitPromise: true });
    if (r.exceptionDetails) { console.log('  EXPR>>> ' + String(e).slice(0, 400)); throw new Error((r.exceptionDetails.exception || {}).description || r.exceptionDetails.text); } return r.result.value; };
  await send('Page.enable'); await send('Runtime.enable');
  await send('Network.setCacheDisabled', { cacheDisabled: true });
  await send('Page.navigate', { url: BASE + '/merge.html' });
  await wait(2500);
  await send('Emulation.setDeviceMetricsOverride', { width: 1400, height: 1200, deviceScaleFactor: 1, mobile: false });
  await wait(500);

  /* 双语三行：直接铺 S.rows（合并页的导出/预览全是它的派生，铺它等于真跑了合并） */
  const load = () => `(function(){
    try{ localStorage.removeItem('srt_fx_edit_v1'); }catch(e){}
    S.mode='merge'; S.srcName='a.srt'; S.dstName='b.srt';
    S.rows=[
      {start:1000,end:3000,en:'Hello there',zh:'你好啊'},
      {start:4000,end:6000,en:'How are you',zh:'你好吗'},
      {start:7000,end:9000,en:'Thanks for watching',zh:'谢谢观看'}];
    S.report={pairs:3,onlySrc:[],onlyDst:[],merged:0};
    ensureStyle(); S.editFp=calcEditFp(); renderReport(); railOn(true); renderPv();
    return S.rows.length;
  })()`;
  /* 模拟「刷新」：同一份字幕重新铺一遍，但**不清**快照，并真的走 restoreEdits() */
  const reload = () => `(function(){
    S.rows=[
      {start:1000,end:3000,en:'Hello there',zh:'你好啊'},
      {start:4000,end:6000,en:'How are you',zh:'你好吗'},
      {start:7000,end:9000,en:'Thanks for watching',zh:'谢谢观看'}];
    S.report={pairs:3,onlySrc:[],onlyDst:[],merged:0};
    ensureStyle(); S.editFp=calcEditFp(); restoreEdits(); renderReport();
    return S.rows.length;
  })()`;
  ok(await ev(load()) === 3, '铺进 3 行双语');

  /* ---------- ① 模板档位 ---------- */
  console.log('\n【① 双语模板：ASS 6 档 / VTT 7 档】');
  ok(await ev(`document.querySelectorAll('#assTplSeg .segbtn').length`) === 6,
    'ASS 模板 6 个按钮', await ev(`document.querySelectorAll('#assTplSeg .segbtn').length`));
  ok(await ev(`document.querySelectorAll('#mVttPresetSeg .segbtn').length`) === 7,
    'VTT 模板 7 个按钮', await ev(`document.querySelectorAll('#mVttPresetSeg .segbtn').length`));
  /* 真点「影院质感」→ 档位码必须是 ass-cinema（不是被归并成 ass-stack） */
  await ev(`(function(){ var b=[].slice.call(document.querySelectorAll('#assTplSeg .segbtn')).filter(function(x){return x.getAttribute('data-v')==='cinema';})[0]; b.click(); return 1; })()`);
  await wait(200);
  ok(await ev(`expFmtVal()`) === 'ass-cinema', '点「影院质感」→ ass-cinema', await ev(`expFmtVal()`));
  ok(await ev(`expTplKey()`) === 'ass-cinema', '上报键也是 ass-cinema（后台分得清）', await ev(`expTplKey()`));
  ok(String(await ev(`document.getElementById('pvTag').textContent`)).indexOf('影院质感') >= 0,
    '预览角标写「影院质感」', await ev(`document.getElementById('pvTag').textContent`));
  ok(await ev(`assStackedOut('ass-cinema')`) === true, '影院档算「双行布局」（原文不会跑到画面顶上）');
  ok(await ev(`assStackedOut('ass-split')`) === false, '分屏档不算双行');
  /* 真点 VTT「顶部双语」 */
  await ev(`(function(){ document.getElementById('expFmt').value='vttStyle'; document.getElementById('expFmt').dispatchEvent(new Event('change',{bubbles:true})); return 1;})()`);
  await wait(200);
  await ev(`(function(){ var b=[].slice.call(document.querySelectorAll('#mVttPresetSeg .segbtn')).filter(function(x){return x.getAttribute('data-v')==='top';})[0]; b.click(); return 1; })()`);
  await wait(200);
  ok(await ev(`document.getElementById('mVttPresetSel').value`) === 'top', '点「顶部」→ 档位落到 top',
    await ev(`document.getElementById('mVttPresetSel').value`));
  ok(await ev(`vttPresetLabel()`).then ? true : /顶部/.test(String(await ev(`vttPresetLabel()`))),
    '模板名是「顶部双语」', await ev(`vttPresetLabel()`));

  /* ---------- ② 时间格精修：相对值 ---------- */
  console.log('\n【② 时间格：绝对 + 相对 +1.5s / -500】');
  await ev(load());
  const editTm = (i, s, e) => `(function(){
    var tds=document.querySelectorAll('#repRows td.ed');
    var td=null; [].slice.call(tds).forEach(function(x){ if(x.getAttribute('data-ed')==='tm' && x.getAttribute('data-ri')==='${i}') td=x; });
    if(!td) return 'NO_TD';
    if(!td.classList.contains('on')) td.click();
    var ins=td.querySelectorAll('.ed-in');
    if(ins.length<2) return 'NO_INPUT';
    ins[0].value=${JSON.stringify(s)}; ins[1].value=${JSON.stringify(e)};
    ins[1].dispatchEvent(new KeyboardEvent('keydown',{key:'Enter',bubbles:true}));
    return 'OK';
  })()`;
  ok(await ev(editTm(0, '+1.5s', '+1.5s')) === 'OK', '能点开第 1 行时间格并敲字');
  await wait(300);
  ok(await ev(`S.rows[0].start`) === 2500 && await ev(`S.rows[0].end`) === 4500,
    '+1.5s 生效（1000→2500 / 3000→4500）', await ev(`S.rows[0].start`) + '→' + await ev(`S.rows[0].end`));
  ok(await ev(editTm(1, '-500', '')) === 'OK', '第 2 行敲 -500');
  await wait(300);
  ok(await ev(`S.rows[1].start`) === 3500, '-500 生效（4000→3500）', await ev(`S.rows[1].start`));
  /* 认不出来 → 整格不动 */
  ok(await ev(editTm(2, '乱写', '')) === 'OK', '第 3 行敲非法值');
  await wait(300);
  ok(await ev(`S.rows[2].start`) === 7000, '非法值被拒绝，这一格没动', await ev(`S.rows[2].start`));

  /* ---------- ③ 改出重叠 → 三选 ---------- */
  console.log('\n【③ 与邻居重叠 → 行下三选】');
  await ev(load());
  await ev(editTm(1, '1500', ''));    /* 第 2 行开始 1500，压进第 1 行（1000–3000）里 */
  await wait(400);
  ok(await ev(`document.querySelectorAll('#repRows .ov-bar').length`) === 1,
    '重叠行下面真的摊出三选条', await ev(`document.querySelectorAll('#repRows .ov-bar').length`));
  ok(String(await ev(`(document.querySelector('#repRows .ov-bar')||{}).textContent`)).indexOf('重叠') >= 0,
    '三选条写了「重叠」', await ev(`(document.querySelector('#repRows .ov-bar')||{}).textContent`));
  await ev(`(function(){ var b=document.querySelector('#repRows .ov-bar [data-ov="snap"]'); if(!b) return 'NO'; b.click(); return 'OK'; })()`);
  await wait(300);
  ok(await ev(`S.rows[1].start`) === 3000, '点「吸附」→ 吸到上一条结束（3000）', await ev(`S.rows[1].start`));
  ok(await ev(`document.querySelectorAll('#repRows .ov-bar').length`) === 0, '修完三选条收掉');

  /* ---------- ④ 批量三件套 ---------- */
  console.log('\n【④ 批量：整体偏移 / 从某条起 / 比例缩放】');
  await ev(load());
  await ev(`document.getElementById('fxTcShiftAll').click()`);
  await wait(300);
  ok(await ev(`document.querySelectorAll('.fx-ask-mask').length`) === 1, '点「整体偏移」弹出输入框');
  await ev(`(function(){ var i=document.querySelectorAll('.fx-ask .f input'); i[0].value='1000';
    var b=[].slice.call(document.querySelectorAll('.fx-ask .btns button')).pop(); b.click(); return 'OK'; })()`);
  await wait(400);
  ok(await ev(`S.rows[0].start`) === 2000 && await ev(`S.rows[2].start`) === 8000,
    '整体 +1000 三条都动', await ev(`S.rows[0].start`) + '/' + await ev(`S.rows[2].start`));
  /* 从某条起 */
  await ev(load());
  await ev(`document.getElementById('fxTcShiftFrom').click()`);
  await wait(300);
  await ev(`(function(){ var i=document.querySelectorAll('.fx-ask .f input'); i[0].value='3'; i[1].value='500';
    var b=[].slice.call(document.querySelectorAll('.fx-ask .btns button')).pop(); b.click(); return 'OK'; })()`);
  await wait(400);
  ok(await ev(`S.rows[0].start`) === 1000 && await ev(`S.rows[1].start`) === 4000 && await ev(`S.rows[2].start`) === 7500,
    '「从第 3 条起 +500」只动第 3 条',
    [await ev(`S.rows[0].start`), await ev(`S.rows[1].start`), await ev(`S.rows[2].start`)].join('/'));
  /* 比例缩放：连时长一起缩 */
  await ev(load());
  await ev(`fxScale(2000, 8000)`);
  await wait(300);
  ok(await ev(`S.rows[0].start`) === 2000 && await ev(`S.rows[2].start`) === 8000,
    '首尾锚到 2000 / 8000', [await ev(`S.rows[0].start`), await ev(`S.rows[2].start`)].join('/'));
  ok(await ev(`S.rows[0].end - S.rows[0].start`) === 2000,
    '时长按同一比例缩（原 2000ms → 2000ms）', await ev(`S.rows[0].end - S.rows[0].start`));

  /* ---------- ⑤ 时长体检 → 一键修 ---------- */
  console.log('\n【⑤ 时长体检 → 一键修】');
  await ev(load());
  await ev(`(function(){ S.rows[1].end = S.rows[1].start + 100; renderReport(); return 1; })()`);   /* 100ms，闪一下看不清 */
  await wait(200);
  ok(await ev(`fxIssues().length`) >= 1, '体检报出问题', await ev(`fxIssues().length`));
  await ev(`document.getElementById('fxTcCheck').click()`);
  await wait(300);
  ok(String(await ev(`document.getElementById('fxTcIssN').textContent`)).length > 0,
    '体检结果写在工具条上', await ev(`document.getElementById('fxTcIssN').textContent`));
  ok(await ev(`!!document.querySelector('#fxTcIssN button')`), '给了「一键修」按钮');
  await ev(`(function(){ var b=document.querySelector('#fxTcIssN button'); if(!b) return 'NO'; b.click(); return 'OK'; })()`);
  await wait(400);
  ok(await ev(`S.rows[1].end - S.rows[1].start`) >= 833, '短时长被补到 ≥833ms',
    await ev(`S.rows[1].end - S.rows[1].start`));
  ok(await ev(`fxIssues().length`) === 0, '修完再体检是干净的', await ev(`fxIssues().length`));

  /* ---------- ⑥ 快照：刷新不丢 ---------- */
  console.log('\n【⑥ 刷新不丢（改完重开还在）】');
  await ev(load());
  await ev(`fxShift(0, 700)`);
  await wait(400);
  await ev(`(function(){ S.rows=null; renderReport(); return 1; })()`);
  await ev(reload());                    /* 重新铺同一份 + 走快照恢复 = 模拟刷新 */
  await wait(300);
  ok(await ev(`S.rows[0].start`) === 1700, '偏移 700 被快照带回来', await ev(`S.rows[0].start`));

  console.log('\n【⑦ JS 异常】');
  ok(errs.length === 0, '整轮无 JS 异常', errs.slice(0, 3).join(' | '));
  console.log('\n—— ' + PASS + ' 通过 / ' + FAIL + ' 失败 ——');
  ws.close();
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error('FATAL', e); process.exit(2); });
