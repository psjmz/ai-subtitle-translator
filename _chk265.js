/* v0.9.265 实测：① 单语模式放出「整体偏移 / 行宽」且走单语折行管线
   ② SRT / 无样式 VTT 有预览（播放器画面 + 文件文本），样式槽整块收起
   ⚠️ 每条语句单独 evaluate；界面状态一律走真实 .click() / setFmtSilently()。 */
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');
const http = require('http');
const PORT = 9333, BASE = 'http://127.0.0.1:3098';
const wait = ms => new Promise(r => setTimeout(r, ms));
let PASS = 0, FAIL = 0;
const ok = (c, name, extra) => { console.log((c ? '  ✓ ' : '  ✗ ') + name + (extra !== undefined && !c ? '  [' + extra + ']' : '')); c ? PASS++ : FAIL++; };
function J(p){ return new Promise((res, rej) => { const r = http.request({ host:'127.0.0.1', port:PORT, path:p, method:'PUT' }, x => { let d=''; x.on('data',c=>d+=c); x.on('end',()=>{ try{ res(JSON.parse(d)); }catch(e){ rej(new Error(d.slice(0,200))); } }); }); r.on('error', rej); r.end(); }); }

const NL = String.fromCharCode(10);
/* 30 字中文：单语口径 16 必须折成 2 行；若仍按双语 32 折就是 1 行（这就是本次要修的） */
const ZH1 = '这是一段足够长的中文句子用来检验单语折行到底走的是哪一套行宽';
const ZH2 = '第二条短句';
const ZH  = ['1','00:00:01,000 --> 00:00:04,000',ZH1,'','2','00:00:05,000 --> 00:00:07,000',ZH2,''].join(NL);
const EN  = ['1','00:00:01,000 --> 00:00:04,000','First line of the sample subtitle','','2','00:00:05,000 --> 00:00:07,000','Second line',''].join(NL);
const b64 = s => Buffer.from(s, 'utf8').toString('base64');

(async () => {
  const v = await J('/json/new?' + encodeURIComponent('about:blank'));
  const ws = new WebSocket(v.webSocketDebuggerUrl, { perMessageDeflate: false });
  let id = 0; const wt = new Map(); const errs = [];
  await new Promise(r => ws.on('open', r));
  ws.on('message', m => { const g = JSON.parse(m);
    if (g.id && wt.has(g.id)) { const q = wt.get(g.id); wt.delete(g.id); g.error ? q.rej(new Error(JSON.stringify(g.error))) : q.res(g.result); }
    if (g.method === 'Runtime.exceptionThrown') errs.push(((g.params.exceptionDetails.exception||{}).description) || g.params.exceptionDetails.text); });
  const send = (m, p) => new Promise((res, rej) => { const i = ++id; wt.set(i, { res, rej }); ws.send(JSON.stringify({ id:i, method:m, params:p||{} })); });
  const ev = async e => { const r = await send('Runtime.evaluate', { expression:e, returnByValue:true, awaitPromise:true });
    if (r.exceptionDetails) throw new Error((r.exceptionDetails.exception||{}).description || r.exceptionDetails.text); return r.result.value; };

  await send('Page.enable'); await send('Runtime.enable');
  await send('Network.setCacheDisabled', { cacheDisabled: true });
  await send('Emulation.setDeviceMetricsOverride', { width:1280, height:1000, deviceScaleFactor:1, mobile:false });
  await send('Page.navigate', { url: BASE + '/merge.html' });
  await wait(2600);

  let DBG = '';
  const step = async s => { try { await ev(s); } catch(e){ DBG = '步骤失败[' + s.slice(0,90) + '] :: ' + String(e.message).slice(0,80); throw new Error(DBG); } };
  const setMode = m => `document.querySelector('#modeTabs input[name=workMode][value=${JSON.stringify(m)}]').click();`;
  const load = (side, text, name) => `loadSide('${side}', decodeURIComponent(escape(atob(${JSON.stringify(b64(text))}))), ${JSON.stringify(name)});`;
  const fmt = f => `setFmtSilently(${JSON.stringify(f)});`;
  const vis = id => `(function(){ var e=document.getElementById(${JSON.stringify(id)}); return e ? getComputedStyle(e).display : 'MISSING'; })()`;

  const go = async (label, steps) => { try { await step('endDemo();'); for (const s of steps) await step(s); return true; }
    catch(e){ ok(false, label, DBG || String(e.message).slice(0,120)); DBG=''; return false; } };

  /* ============ ① 单语：偏移 / 行宽控件 ============ */
  console.log('【单语模式：整体偏移 + 行宽】');
  await go('准备单语', [load('src', ZH, 'clip.srt'), setMode('mono'), 'doMono();']);
  ok(await ev(vis('shiftRow')) !== 'none', '单语下「整体偏移」输入框可见', await ev(vis('shiftRow')));
  ok(await ev(vis('shiftLbl')) !== 'none', '单语下「整体偏移」标签可见', await ev(vis('shiftLbl')));
  ok(await ev(vis('biMaxWRow')) !== 'none', '单语下「行宽」输入框可见', await ev(vis('biMaxWRow')));
  ok(await ev(vis('biMaxWLbl')) !== 'none', '单语下「行宽」标签可见', await ev(vis('biMaxWLbl')));
  ok(await ev(vis('orderRow')) === 'none', '单语下「双语上下顺序」仍收起（纯双语概念）', await ev(vis('orderRow')));
  ok(String(await ev(`(document.querySelector('#shiftLbl span[data-i18n]')||{}).textContent`)).indexOf('整体偏移') >= 0,
    '偏移标签已换成「整体偏移」（不是「译文整体偏移」）', await ev(`(document.querySelector('#shiftLbl span[data-i18n]')||{}).textContent`));
  ok(String(await ev(`(document.querySelector('#biMaxWLbl span[data-i18n]')||{}).textContent`)) === '行宽',
    '行宽标签已换成「行宽」（不是「双语行宽」）', await ev(`(document.querySelector('#biMaxWLbl span[data-i18n]')||{}).textContent`));
  ok(await ev(`document.querySelectorAll('#shiftLbl i.info').length`) === 1, '偏移标签的 ⓘ 还在（没被 textContent 冲掉）');
  ok(await ev(`document.querySelectorAll('#biMaxWLbl i.info').length`) === 1, '行宽标签的 ⓘ 还在');
  /* 行宽默认按语言：中文 16（此前一律沿用双语 32） */
  ok(String(await ev(`document.getElementById('biMaxW').value`)) === '16', '单语行宽默认 = 16（中文）',
    await ev(`document.getElementById('biMaxW').value`));

  /* 切去双语再切回来：值要保住，不能被重置（v0.9.242 那个坑） */
  await go('切双语', [setMode('merge')]);
  ok(String(await ev(`document.getElementById('biMaxW').value`)) === '32', '切回双语 → 行宽恢复 32', await ev(`document.getElementById('biMaxW').value`));
  await go('改单语值', [setMode('mono'), `document.getElementById('biMaxW').value='20'; document.getElementById('biMaxW').dispatchEvent(new Event('input',{bubbles:true}));`]);
  await go('往返一次', [setMode('merge'), setMode('mono')]);
  ok(String(await ev(`document.getElementById('biMaxW').value`)) === '20', '单语调成 20 → 往返双语后仍是 20（不被重置）',
    await ev(`document.getElementById('biMaxW').value`));

  /* ============ ② 单语导出走单语折行管线 ============ */
  console.log('【单语折行：buildMonoParts（中 16）】');
  await go('单语 SRT', [load('src', ZH, 'clip.srt'), setMode('mono'),
    `document.getElementById('biMaxW').value='16'; document.getElementById('biMaxW').dispatchEvent(new Event('input',{bubbles:true}));`,
    'doMono();', fmt('srt')]);
  const srtTxt = String(await ev('(function(){ return buildExport(); })()'));
  const cueLines = srtTxt.split(NL);
  const body = cueLines.slice(2, cueLines.indexOf('', 2) >= 0 ? cueLines.indexOf('', 2) : cueLines.length);
  ok(body.length >= 2, '30 字中文按 16 折成了 2 行（此前按 32 → 1 行不折）', '行数=' + body.length + ' 首行=' + body[0]);
  ok(body[0] && body[0].length <= 16, '折出第一行 ≤ 16 字', body[0] && body[0].length);
  ok(srtTxt.indexOf('00:00:01,000 --> 00:00:04,000') >= 0, 'SRT 时间轴格式正确（逗号毫秒）');

  /* ============ ③ SRT / 无样式 VTT 的预览 + 样式槽 ============ */
  console.log('【SRT / 无样式 VTT 预览 + 样式槽收起】');
  await go('切 SRT', [fmt('srt')]);
  ok(await ev(vis('srtPv')) !== 'none', 'SRT 档位：预览块出现（此前只有一行空提示）', await ev(vis('srtPv')));
  ok(await ev(vis('pvNone')) === 'none', 'SRT 档位：「没有画面」的空提示收掉了', await ev(vis('pvNone')));
  ok(await ev(vis('slotWrap')) === 'none', 'SRT 档位：样式槽整块收起（不再摆着改了没反应的假控件）', await ev(vis('slotWrap')));
  ok(await ev(vis('slotPlainNote')) !== 'none', 'SRT 档位：留了「样式槽去哪了」的说明', await ev(vis('slotPlainNote')));
  ok(await ev(vis('assPv')) === 'none' && await ev(vis('mVttPv')) === 'none', 'SRT 档位：ASS / VTT 两块画布收着（三块互斥）');
  const raw = String(await ev(`(document.getElementById('srtPvRaw')||{}).textContent`));
  ok(raw.indexOf('-->') >= 0 && raw.indexOf('00:00:01,000') >= 0, '文本块给出文件里真正的内容（序号 + 时间轴）', raw.split(NL)[0]);
  ok(raw.indexOf(ZH1.slice(0, 8)) >= 0 || raw.indexOf(ZH2) >= 0, '文本块用的是真实字幕文本', raw.slice(0, 40));
  const note = String(await ev(`(document.getElementById('srtPvNote')||{}).textContent`));
  ok(note.indexOf('播放器') >= 0, '说明了「上面是播放器的默认外观」（不是文件里存的）', note.slice(0, 30));
  ok(String(await ev(`(document.querySelector('#srtPvLine1 .pv-in')||{}).textContent + (document.querySelector('#srtPvLine2 .pv-in')||{}).textContent`)).length > 0,
    '画面里真的画了字幕文字');
  /* 视角按钮：无样式格式只有「成片」一种画法，三档视角不适用 */
  ok(await ev(vis('pvSeg')) === 'none', 'SRT 档位：三档视角按钮收起（成片/这个槽/基础样式不适用）');

  await go('切 ASS', [fmt('split')]);
  ok(await ev(vis('srtPv')) === 'none', '切回 ASS：SRT 预览块收起', await ev(vis('srtPv')));
  ok(await ev(vis('slotWrap')) !== 'none', '切回 ASS：样式槽原样回来', await ev(vis('slotWrap')));
  ok(await ev(vis('slotPlainNote')) === 'none', '切回 ASS：说明行收起', await ev(vis('slotPlainNote')));

  await go('无样式 VTT', [fmt('vtt')]);
  ok(await ev(vis('srtPv')) !== 'none', '无样式 VTT：同样给了文本预览', await ev(vis('srtPv')));
  ok(await ev(vis('slotWrap')) === 'none', '无样式 VTT：样式槽同样收起', await ev(vis('slotWrap')));
  await go('带样式 VTT', [fmt('vttStyle')]);
  ok(await ev(vis('slotWrap')) !== 'none', '带样式 VTT：样式槽回来（槽对它有效）', await ev(vis('slotWrap')));
  ok(await ev(vis('srtPv')) === 'none', '带样式 VTT：文本预览收起（改画 VTT cue 盒）');

  /* ============ ④ 预览跟随选中行 ============ */
  console.log('【预览跟随选中行】');
  await go('选第 2 行', [fmt('srt'), `document.querySelectorAll('#rep tbody tr')[1].querySelector('input[type=checkbox]').click();`]);
  const tag = String(await ev(`(document.getElementById('pvTag')||{}).textContent`));
  ok(tag.indexOf('2') >= 0, '勾选第 2 行 → 预览切到第 2 条', tag);
  const raw2 = String(await ev(`(document.getElementById('srtPvRaw')||{}).textContent`));
  ok(raw2.indexOf('00:00:05,000') >= 0, '文本块跟着换成了第 2 条的时间轴', raw2.split(NL)[1]);

  ok(errs.length === 0, '全程零 JS 异常', errs.slice(0, 2).join(' | '));
  console.log(NL + '总计：' + PASS + ' 通过 / ' + FAIL + ' 失败');
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error('脚本出错：', e.message); process.exit(2); });
