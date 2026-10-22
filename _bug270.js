/* v0.9.270 hotfix 回归：翻译完成后 restoreEdits 不能把刚翻好的译文抹掉
   ① 翻译后译文保住（用户报的那个 bug）② 时间轴 / 原文仍照常恢复（主功能不能顺手修坏）
   ③ 手改的译文仍豁免自动折行 ④ 只改原文的行，译文照常折行
   ⑤ 重新导入（= 刷新）时译文仍能认回来 ⑥ 全部还原连 zhHand 一起清 */
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');
const http = require('http');
const PORT = 9333, BASE = 'http://127.0.0.1:3098';
const wait = ms => new Promise(r => setTimeout(r, ms));
let PASS = 0, FAIL = 0;
const ok = (c, n, x) => { console.log((c ? '  ✓ ' : '  ✗ ') + n + (x !== undefined ? '  [' + x + ']' : '')); c ? PASS++ : FAIL++; };
const J = p => new Promise((res, rej) => { const r = http.request({ host: '127.0.0.1', port: PORT, path: p, method: 'PUT' }, x => { let d = ''; x.on('data', c => d += c); x.on('end', () => { try { res(JSON.parse(d)); } catch (e) { rej(new Error(d.slice(0, 200))); } }); }); r.on('error', rej); r.end(); });
const NL = String.fromCharCode(10);
const b64 = s => Buffer.from(s, 'utf8').toString('base64');
const SRT = ['1', '00:00:01,000 --> 00:00:03,000', 'Hello there', '',
  '2', '00:00:04,000 --> 00:00:06,000', 'How are you', '',
  '3', '00:00:07,000 --> 00:00:09,000', 'Thanks for watching', ''].join(NL);
const LOAD = `localStorage.removeItem('srt_edit_v1');
  setSrc(decodeURIComponent(escape(atob(${JSON.stringify(b64(SRT))}))), 'demo.srt');`;

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
    if (r.exceptionDetails) { console.log('  EXPR>>> ' + String(e).slice(0, 200)); throw new Error((r.exceptionDetails.exception || {}).description || r.exceptionDetails.text); } return r.result.value; };
  await send('Page.enable'); await send('Runtime.enable');
  await send('Network.setCacheDisabled', { cacheDisabled: true });
  await send('Emulation.setDeviceMetricsOverride', { width: 1320, height: 1000, deviceScaleFactor: 1, mobile: false });
  await send('Page.navigate', { url: BASE + '/index.html' });
  await wait(3000);

  /* 用户报的那条路径：先动时间轴（落快照）→ 翻译 → 译文必须还在 */
  console.log('【① 翻译前动过时间轴，翻译后译文还在吗】');
  await ev(LOAD); await wait(300);
  await ev(`shiftTimes(0, 300);`); await wait(400);
  await ev(`S.rows.forEach(function(r,i){ r.zh=['你好啊','你好吗','感谢观看'][i]; });`);
  await ev(`(function(){var ne=restoreEdits(true); return ne;})()`);
  await ev(`renderRows();`); await ev(`applyPost();`); await wait(400);
  ok(await ev(`S.rows[0].zh`) === '你好啊', '译文没被快照抹掉', await ev(`S.rows[0].zh`));
  ok(await ev(`document.querySelectorAll('#rows .zh.placeholder').length`) === 0, '编辑区没有「待翻译…」占位', await ev(`document.querySelectorAll('#rows .zh.placeholder').length`));
  ok(await ev(`buildExportItems().length`) === 3, '导出 3 条（不是空的）', await ev(`buildExportItems().length`));

  console.log('【② 主功能不能顺手修坏：时间轴 / 原文仍照常恢复】');
  await ev(LOAD); await wait(300);
  await ev(`shiftTimes(0, 300);`);
  await ev(`(function(){var g=document.querySelectorAll('#rows .cuegrid')[1];
    var en=g.querySelector('.en.ed'); en.focus(); en.innerText='手改的原文';
    en.dispatchEvent(new Event('input',{bubbles:true})); return 1;})()`);
  await wait(400);
  ok(await ev(`S.rows[0].start`) === 1300, '改前：第 1 条已 offset 到 1300', await ev(`S.rows[0].start`));
  ok(await ev(`S.rows[1].en`) === '手改的原文', '改前：第 2 条原文已改', await ev(`S.rows[1].en`));
  await ev(`S.rows.forEach(function(r,i){ r.zh=['你好啊','你好吗','感谢观看'][i]; });`);
  await ev(`(function(){var ne=restoreEdits(true); return ne;})()`);
  await ev(`renderRows();`); await wait(300);
  ok(await ev(`S.rows[0].start`) === 1300, '翻译后时间轴仍是改过的 1300', await ev(`S.rows[0].start`));
  ok(await ev(`S.rows[1].en`) === '手改的原文', '翻译后原文仍是改过的那句', await ev(`S.rows[1].en`));
  ok(await ev(`S.rows[1].zh`) === '你好吗', '同一行的译文是新翻的、没被顺手清掉', await ev(`S.rows[1].zh`));

  console.log('【③ 手改的译文仍豁免自动折行（保留了用户手敲的换行）】');
  await ev(LOAD); await wait(300);
  await ev(`S.rows[0].zh='第一行\\n第二行';`);
  await ev(`renderRows();`); await wait(200);
  await ev(`(function(){var g=document.querySelectorAll('#rows .cuegrid')[0];
    var z=g.querySelector('.zh'); z.focus(); z.innerText='第一行\\n第二行';
    z.dispatchEvent(new Event('input',{bubbles:true})); return 1;})()`);
  await wait(300);
  ok(await ev(`S.rows[0].zhHand`) === true, '改译文 = 打上 zhHand 标记', await ev(`S.rows[0].zhHand`));
  await ev(`reflowRows();`); await wait(300);
  ok(String(await ev(`S.rows[0].zh`)).indexOf('\n') > 0, '重排后手工折行还在（没被压平）', JSON.stringify(await ev(`S.rows[0].zh`)));

  console.log('【④ 只改原文的行，译文照常折行】');
  await ev(LOAD); await wait(300);
  await ev(`(function(){var g=document.querySelectorAll('#rows .cuegrid')[0];
    var en=g.querySelector('.en.ed'); en.focus(); en.innerText='改过的原文';
    en.dispatchEvent(new Event('input',{bubbles:true})); return 1;})()`);
  await wait(300);
  ok(await ev(`S.rows[0].edited`) === true, '改原文 = 也算 edited', await ev(`S.rows[0].edited`));
  ok(!(await ev(`S.rows[0].zhHand`)), '但没打 zhHand（译文不是手写的）', await ev(`S.rows[0].zhHand`));
  await ev(`S.rows[0].zh='这是一句非常非常非常长的中文译文需要被自动折行处理才行';`);
  await ev(`renderRows(); reflowRows();`); await wait(300);
  ok(String(await ev(`S.rows[0].zh`)).indexOf('\n') > 0, '长译文被正常折行（不再被豁免漏掉）', JSON.stringify(await ev(`S.rows[0].zh`)));

  console.log('【⑤ 重新导入（= 刷新）时译文仍能认回来】');
  await ev(LOAD); await wait(300);
  await ev(`S.rows.forEach(function(r,i){ r.zh=['你好啊','你好吗','感谢观看'][i]; }); renderRows();`);
  await wait(200);
  await ev(`(function(){var g=document.querySelectorAll('#rows .cuegrid')[0];
    var z=g.querySelector('.zh'); z.focus(); z.innerText='手工订正的译文';
    z.dispatchEvent(new Event('input',{bubbles:true})); return 1;})()`);
  await wait(600);   // 等 150ms 防抖落盘
  await send('Page.navigate', { url: BASE + '/index.html' }); await wait(2600);
  await ev(`setSrc(decodeURIComponent(escape(atob(${JSON.stringify(b64(SRT))}))), 'demo.srt');`); await wait(400);
  ok(await ev(`S.rows[0].zh`) === '手工订正的译文', '刷新后译文认回来了', await ev(`S.rows[0].zh`));
  ok(await ev(`S.rows[0].zhHand`) === true, '并带着 zhHand（不会再被折行改动）', await ev(`S.rows[0].zhHand`));

  console.log('【⑥ 全部还原连 zhHand 一起清】');
  await ev(`clearEdits(); renderRows();`); await wait(250);
  ok(await ev(`editedCount()`) === 0, '标记清掉了', await ev(`editedCount()`));
  ok(!(await ev(`S.rows[0].zhHand`)), 'zhHand 也清掉了', await ev(`S.rows[0].zhHand`));
  ok(await ev(`localStorage.getItem('srt_edit_v1')`) === null, '快照也清掉了');

  ok(errs.length === 0, '整轮没抛 JS 异常', errs.slice(0, 2).join(' | ') || 'none');
  console.log('\n通过 ' + PASS + ' / 失败 ' + FAIL);
  ws.close(); process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error('FATAL', e.message); process.exit(2); });
