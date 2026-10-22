/* v0.9.269 实测：特效页字幕区就地编辑 + 刷新不丢
   验的是真 DOM：真点单元格、真敲回车、真刷新页面，然后看 S.rows 与导出有没有跟着变。
   五条硬契约：
     ① 点单元格能改，改完立刻进数据、进预览、进导出
     ② 时间轴也能改，且认得出 时:分:秒,毫秒
     ③ **手改的折行不许被重排**（折行是引擎按行宽做的，编辑行必须原样出去）
     ④ 刷新页面编辑还在（快照按指纹恢复），换一份字幕则不恢复
     ⑤ 「全部还原」是真的还原成原始值，不是只摘掉标记 */
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');
const http = require('http');
const PORT = 9333, BASE = 'http://127.0.0.1:3098';
const wait = ms => new Promise(r => setTimeout(r, ms));
let PASS = 0, FAIL = 0;
const ok = (c, n, x) => { console.log((c ? '  ✓ ' : '  ✗ ') + n + (x !== undefined ? '  [' + x + ']' : '')); c ? PASS++ : FAIL++; };
const J = p => new Promise((res, rej) => { const r = http.request({ host: '127.0.0.1', port: PORT, path: p, method: 'PUT' }, x => { let d = ''; x.on('data', c => d += c); x.on('end', () => { try { res(JSON.parse(d)); } catch (e) { rej(new Error(d.slice(0, 200))); } }); }); r.on('error', rej); r.end(); });
const NL = String.fromCharCode(10);
const b64 = s => Buffer.from(s, 'utf8').toString('base64');
const EN = ['1', '00:00:01,000 --> 00:00:03,000', 'Hello there', '',
  '2', '00:00:04,000 --> 00:00:06,000', 'How are you', '',
  '3', '00:00:07,000 --> 00:00:09,000', 'Thanks for watching', ''].join(NL);
const ZH = ['1', '00:00:01,000 --> 00:00:03,000', '你好啊', '',
  '2', '00:00:04,000 --> 00:00:06,000', '你好吗', '',
  '3', '00:00:07,000 --> 00:00:09,000', '感谢观看', ''].join(NL);

(async () => {
  const v = await J('/json/new?' + encodeURIComponent('about:blank'));
  const ws = new WebSocket(v.webSocketDebuggerUrl, { perMessageDeflate: false });
  let id = 0; const wt = new Map(); const errs = [];
  await new Promise(r => ws.on('open', r));
  ws.on('message', m => { const g = JSON.parse(m);
    if (g.id && wt.has(g.id)) { const q = wt.get(g.id); wt.delete(g.id); g.error ? q.rej(new Error(JSON.stringify(g.error))) : q.res(g.result); }
    if (g.method === 'Runtime.exceptionThrown') errs.push(((g.params.exceptionDetails.exception || {}).description) || g.params.exceptionDetails.text);
    /* v0.9.269：guardEdits 用 window.confirm 问「会覆盖，继续吗」——
       headless 默认把对话框当「取消」，那样所有 doMerge 都跑不动。默认一律「继续」。 */
    if (g.method === 'Page.javascriptDialogOpening') send('Page.handleJavaScriptDialog', { accept: true }); });
  const send = (m, p) => new Promise((res, rej) => { const i = ++id; wt.set(i, { res, rej }); ws.send(JSON.stringify({ id: i, method: m, params: p || {} })); });
  const ev = async e => { const r = await send('Runtime.evaluate', { expression: e, returnByValue: true, awaitPromise: true });
    if (r.exceptionDetails) { console.log('  EXPR>>> ' + String(e).slice(0, 240)); throw new Error((r.exceptionDetails.exception || {}).description || r.exceptionDetails.text); } return r.result.value; };
  await send('Page.enable'); await send('Runtime.enable');
  await send('Network.setCacheDisabled', { cacheDisabled: true });
  await send('Emulation.setDeviceMetricsOverride', { width: 1320, height: 1200, deviceScaleFactor: 1, mobile: false });
  await send('Page.navigate', { url: BASE + '/merge.html' });
  await wait(2600);

  /* 找一个可编辑单元格：⚠️ 不用 data-ri="1" 这种嵌套引号的选择器，
     那段表达式在 CDP 里会报 SyntaxError（实测），改成遍历比对属性。 */
  const pick = (f, ri) => `(function(){var a=document.querySelectorAll('#repRows td.ed');for(var k=0;k<a.length;k++){if(a[k].getAttribute('data-ed')===${JSON.stringify(f)}&&a[k].getAttribute('data-ri')===${JSON.stringify(String(ri))})return a[k];}return null;})()`;
  /* 编辑一个单元格：真 click → 真敲键 */
  const editCell = (field, ri, val, newline) => `(function(){
    var td = document.querySelector('#repRows td.ed[data-ed=${JSON.stringify(field)}][data-ri="${ri}"]');
    if(!td) return 'NO_TD';
    td.click();
    var inp = td.querySelector('.ed-in');
    if(!inp) return 'NO_INPUT';
    inp.value = ${JSON.stringify(val)};
    inp.dispatchEvent(new KeyboardEvent('keydown',{key:${JSON.stringify(newline ? 'Enter' : 'Enter')},shiftKey:${!!newline},bubbles:true}));
    return 'OK';
  })()`;
  const loadBi = async () => {
    await ev(`localStorage.removeItem('srt_fx_edit_v1')`);
    await ev(`endDemo();`);
    await ev(`loadSide('src', decodeURIComponent(escape(atob(${JSON.stringify(b64(EN))}))), 'a.srt');`);
    await ev(`loadSide('dst', decodeURIComponent(escape(atob(${JSON.stringify(b64(ZH))}))), 'b.srt');`);
    await ev(`document.querySelector('#modeTabs input[name=workMode][value="merge"]').click();`);
    await ev(`doMerge();`);
    await wait(400);
  };

  console.log('【① 点单元格改译文：进数据 / 进导出】');
  await loadBi();
  ok(await ev(`document.querySelectorAll('#repRows td.ed').length`) > 0, '表格里有可编辑单元格', await ev(`document.querySelectorAll('#repRows td.ed').length`));
  const openR = await ev(editCell('dst', 0, '改过的第一句'));
  ok(openR === 'OK', '点译文格真的打开输入框', openR);
  await wait(300);
  ok(await ev(`S.rows[0].zh`) === '改过的第一句', 'S.rows 写回去了', await ev(`S.rows[0].zh`));
  ok(await ev(`!!S.rows[0].edited`), '这一行打了 edited 标记', await ev(`!!S.rows[0].edited`));
  ok(await ev(`!!S.rows[0].__o && S.rows[0].__o.zh === '你好啊'`), '原始值留了底（用于「全部还原」）', await ev(`JSON.stringify(S.rows[0].__o)`));
  ok(String(await ev(`document.getElementById('edBar').style.display`)) === 'flex', '底部出现「改了几处」状态条', await ev(`document.getElementById('edBar').style.display`));
  const inPv = await ev(`(function(){var p=monoMode()?monoParts():C.buildBilingualParts(S.rows,{maxW:32,biMaxW:32});
    return applyEdits(p).map(function(x){return x.dstLines.join('|');}).join(' >> ');})()`);
  ok(inPv.indexOf('改过的第一句') >= 0, '导出管线拿到了新值', inPv);

  console.log('\n【② 时间轴也能改】');
  const before = await ev(`JSON.stringify([S.rows[1].start, S.rows[1].end])`);
  const tmOpen = await ev(`(function(){var td=${pick('tm',1)};if(!td)return -1;td.click();return td.querySelectorAll('.ed-in').length;})()`);
  ok(tmOpen === 2, '时间格打开两个输入框（开始 / 结束）', tmOpen);
  const tmVal = await ev(`(function(){var td=${pick('tm',1)};var i=td?td.querySelector('.ed-in'):null;return i?i.value:'NONE';})()`);
  ok(String(tmVal).length >= 12, '编辑框里是完整时间（含毫秒）', tmVal);
  await ev(`(function(){var td=${pick('tm',1)};var ins=td.querySelectorAll('.ed-in');
    ins[0].value='00:00:10,500';ins[1].value='00:00:12,000';
    ins[1].dispatchEvent(new KeyboardEvent('keydown',{key:'Enter',bubbles:true}));})()`);
  await wait(300);
  ok(await ev(`S.rows[1].start`) === 10500, '开始时间写回（10500ms）', await ev(`S.rows[1].start`));
  ok(await ev(`S.rows[1].end`) === 12000, '结束时间写回（12000ms）', await ev(`S.rows[1].end`));
  ok(await ev(`msToStr(10500)`) === '00:00:10,500', 'msToStr 往返正确', await ev(`msToStr(10500)`));
  ok(await ev(`strToMs('1:23.4')`) === 83400, 'strToMs 认 1:23.4 → 83400', await ev(`strToMs('1:23.4')`));
  ok(await ev(`strToMs('乱写')`) === null, '认不出来的格式返回 null（不乱存）', await ev(`strToMs('乱写')`));
  console.log('  改前 -> ' + before);

  console.log('\n【③ 手改的折行不许被重排】');
  await ev(`(function(){var td=${pick('dst',2)};if(!td)return;td.click();
    var inp=td.querySelector('.ed-in');inp.value=['AAA','BBB','CCC'].join(String.fromCharCode(10));
    inp.dispatchEvent(new KeyboardEvent('keydown',{key:'Enter',bubbles:true}));})()`);
  await wait(300);
  const lines3 = await ev(`(function(){var p=monoMode()?monoParts():C.buildBilingualParts(S.rows,{maxW:32,biMaxW:32});
    return JSON.stringify(applyEdits(p)[2].dstLines);})()`);
  ok(lines3 === '["AAA","BBB","CCC"]', '三行原样出去（没被折行合并/截断）', lines3);
  const noEd = await ev(`(function(){var p=monoMode()?monoParts():C.buildBilingualParts(S.rows,{maxW:32,biMaxW:32});
    return JSON.stringify(p[0].dstLines);})()`);
  console.log('  未编辑的行仍走引擎折行 -> ' + noEd);

  console.log('\n【④ 刷新不丢（快照按指纹恢复）】');
  await ev(`saveEdits();`);
  await wait(400);
  await send('Page.navigate', { url: BASE + '/merge.html' });
  await wait(2600);
  await ev(`loadSide('src', decodeURIComponent(escape(atob(${JSON.stringify(b64(EN))}))), 'a.srt');`);
  await ev(`loadSide('dst', decodeURIComponent(escape(atob(${JSON.stringify(b64(ZH))}))), 'b.srt');`);
  await ev(`document.querySelector('#modeTabs input[name=workMode][value="merge"]').click();`);
  await ev(`doMerge();`);
  await wait(500);
  ok(await ev(`S.rows[0].zh`) === '改过的第一句', '刷新后译文改动回来了', await ev(`S.rows[0].zh`));
  ok(await ev(`S.rows[1].start`) === 10500, '刷新后时间改动回来了', await ev(`S.rows[1].start`));
  ok(await ev(`S.rows[2].zh.split(String.fromCharCode(10)).length`) === 3, '刷新后三行折行还在', await ev(`JSON.stringify(S.rows[2].zh)`));
  ok(await ev(`editedCount()`) === 3, '统计是 3 处', await ev(`editedCount()`));

  console.log('\n【⑤ 换一份字幕不该套用旧编辑】');
  const EN2 = ['1', '00:00:01,000 --> 00:00:03,000', 'Another file', ''].join(NL);
  const ZH2 = ['1', '00:00:01,000 --> 00:00:03,000', '另一份字幕', ''].join(NL);
  await ev(`loadSide('src', decodeURIComponent(escape(atob(${JSON.stringify(b64(EN2))}))), 'x.srt');`);
  await ev(`loadSide('dst', decodeURIComponent(escape(atob(${JSON.stringify(b64(ZH2))}))), 'y.srt');`);
  await ev(`doMerge();`);
  await wait(400);
  ok(await ev(`S.rows[0].zh`) === '另一份字幕', '另一份字幕没被旧编辑污染', await ev(`S.rows[0].zh`));
  ok(await ev(`editedCount()`) === 0, '没有凭空多出编辑标记', await ev(`editedCount()`));
  ok(await ev(`!!localStorage.getItem('srt_fx_edit_v1')`) === false, '换字幕＝放弃了旧编辑，快照一并清掉', 'ok');

  console.log('\n【⑥ 全部还原 = 真还原】');
  /* ⚠️ 不再依赖快照恢复：⑤ 里换字幕点了「确定」，快照已被 guardEdits 清掉（这是对的）。
     所以这里自己现场改 3 处，验的是 clearEdits 能不能真还原成原始值。 */
  await ev(`loadSide('src', decodeURIComponent(escape(atob(${JSON.stringify(b64(EN))}))), 'a.srt');`);
  await ev(`loadSide('dst', decodeURIComponent(escape(atob(${JSON.stringify(b64(ZH))}))), 'b.srt');`);
  await ev(`doMerge();`);
  await wait(500);
  await ev(`(function(){var td=${pick('dst',0)};td.click();
    var i=td.querySelector('.ed-in');i.value='改A';i.dispatchEvent(new KeyboardEvent('keydown',{key:'Enter',bubbles:true}));})()`);
  await wait(200);
  await ev(`(function(){var td=${pick('tm',1)};td.click();var ins=td.querySelectorAll('.ed-in');
    ins[0].value='00:00:20,000';ins[1].dispatchEvent(new KeyboardEvent('keydown',{key:'Enter',bubbles:true}));})()`);
  await wait(200);
  await ev(`(function(){var td=${pick('src',2)};td.click();
    var i=td.querySelector('.ed-in');i.value='改C';i.dispatchEvent(new KeyboardEvent('keydown',{key:'Enter',bubbles:true}));})()`);
  await wait(300);
  ok(await ev(`editedCount()`) === 3, '（现场改够 3 处：译文 / 时间 / 原文）', await ev(`editedCount()`));
  await ev(`clearEdits();`);
  await wait(300);
  ok(await ev(`S.rows[0].zh`) === '你好啊', '还原成原始译文', await ev(`S.rows[0].zh`));
  ok(await ev(`S.rows[1].start`) === 4000, '原始时间也回来了', await ev(`S.rows[1].start`));
  ok(await ev(`editedCount()`) === 0 && await ev(`!!localStorage.getItem('srt_fx_edit_v1')`) === false, '标记与快照一起清掉', await ev(`editedCount()`));

  console.log('\n【⑦ 单语下原文列不给编辑入口 + 四语词条】');
  await ev(`document.querySelector('#modeTabs input[name=workMode][value="mono"]').click();`);
  await ev(`loadSide('src', decodeURIComponent(escape(atob(${JSON.stringify(b64(ZH))}))), 'm.srt');`);
  await ev(`doMono();`);
  await wait(400);
  ok(await ev(`document.querySelectorAll('#repRows td.ed[data-ed="src"]').length`) === 0, '单语下没有原文编辑格', await ev(`document.querySelectorAll('#repRows td.ed[data-ed="src"]').length`));
  ok(await ev(`document.querySelectorAll('#repRows td.ed[data-ed="dst"]').length`) > 0, '单语下译文仍可编辑', await ev(`document.querySelectorAll('#repRows td.ed[data-ed="dst"]').length`));
  const KEYS = ['edEdited', 'edStart', 'edEnd', 'edHint', 'edHintTm', 'edSaved', 'edBadTime', 'edBarCount', 'edBarKeep', 'edClear', 'edCleared', 'edRestored', 'edNone'];
  for (const lang of ['zh-CN', 'zh-TW', 'en', 'ja']) {
    const got = await ev(`(function(){UI.lang=${JSON.stringify(lang)};return ${JSON.stringify(KEYS)}.map(function(k){return t(k);});})()`);
    const badKey = KEYS.filter((k, i) => typeof got[i] !== 'string' || !got[i] || got[i] === k);
    ok(badKey.length === 0, '[' + lang + '] 13 条词条齐全', badKey.join(',') || JSON.stringify(got[0]));
  }
  await ev(`UI.lang='zh-CN'`);

  console.log('\n【⑧ 重新合并会先问一句（别无声覆盖手工改动）】');
  await ev(`document.querySelector('#modeTabs input[name=workMode][value="merge"]').click();`);
  await ev(`localStorage.removeItem('srt_fx_edit_v1')`);
  await ev(`loadSide('src', decodeURIComponent(escape(atob(${JSON.stringify(b64(EN))}))), 'a.srt');`);
  await ev(`loadSide('dst', decodeURIComponent(escape(atob(${JSON.stringify(b64(ZH))}))), 'b.srt');`);
  await ev(`doMerge();`);
  await wait(400);
  ok(await ev(`editedCount()`) === 0, '（先确认这份是干净的 0 处编辑）', await ev(`editedCount()`));
  ok(await ev(`typeof guardEdits === 'function'`), 'guardEdits 存在');
  const askTxt = await ev(`(function(){UI.lang='zh-CN';return t('edOverwriteAsk', 2);})()`);
  ok(String(askTxt).indexOf('2') >= 0 && String(askTxt).indexOf('{0}') < 0, '提示文案带了条数占位替换', askTxt);
  await ev(`(function(){var td=${pick('dst',0)};if(!td)return;td.click();
    var inp=td.querySelector('.ed-in');inp.value='手改的一句';
    inp.dispatchEvent(new KeyboardEvent('keydown',{key:'Enter',bubbles:true}));})()`);
  await wait(300);
  ok(await ev(`editedCount()`) === 1, '手工改了 1 处', await ev(`editedCount()`));
  await ev(`saveEdits();`); await wait(300);
  ok(await ev(`!!localStorage.getItem('srt_fx_edit_v1')`) === true, '快照已落盘', 'ok');
  /* 点「取消」→ 不动 */
  await ev(`window.__cf = window.confirm; window.confirm = function(){ return false; };`);
  await ev(`doMerge();`);
  await wait(300);
  ok(await ev(`S.rows[0].zh`) === '手改的一句', '点取消：改动原样保留', await ev(`S.rows[0].zh`));
  ok(await ev(`editedCount()`) === 1, '点取消：编辑计数不变', await ev(`editedCount()`));
  /* 点「确定」→ 覆盖，且快照一并清掉 */
  await ev(`window.confirm = function(){ return true; };`);
  await ev(`doMerge();`);
  await wait(400);
  ok(await ev(`S.rows[0].zh`) === '你好啊', '点确定：重算回原始值', await ev(`S.rows[0].zh`));
  ok(await ev(`editedCount()`) === 0, '点确定：编辑计数归零', await ev(`editedCount()`));
  ok(await ev(`!!localStorage.getItem('srt_fx_edit_v1')`) === false, '点确定：快照也被清掉（不然指纹相同会被套回来）', 'ok');
  await ev(`window.confirm = window.__cf;`);

  ok(errs.length === 0, '整轮没抛 JS 异常', errs.slice(0, 2).join(' | ') || 'none');
  console.log('\n通过 ' + PASS + ' / 失败 ' + FAIL);
  ws.close(); process.exit(FAIL ? 1 : 0);
})();
