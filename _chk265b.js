/* v0.9.265 实测（第二批）：单语模式下不许再出现「原文 / 译文」这两套字眼与控件
     ① ASS 面板：原文（副）整栏收起 + 剩下的那栏改叫「字幕」+ 栅格收成单列
     ② VTT 面板：原文行整组收起 + 组标题/面板标题改词 + 栅格收成单列
     ③ 模板显示名「标准 · 底部双语」→「标准 · 底部双行」（预览角标 / 导出摘要 / ⓘ 三处）
     ④ 切回双语全部原样回来（只收起不删除，不吞用户参数）
   ⚠️ 每条语句单独 evaluate；界面状态一律走真实 .click() / setFmtSilently()。 */
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');
const http = require('http');
const PORT = 9333, BASE = 'http://127.0.0.1:3098';
const wait = ms => new Promise(r => setTimeout(r, ms));
let PASS = 0, FAIL = 0;
const ok = (c, name, extra) => { console.log((c ? '  ✓ ' : '  ✗ ') + name + (extra !== undefined && !c ? '  [' + extra + ']' : '')); c ? PASS++ : FAIL++; };
function J(p){ return new Promise((res, rej) => { const r = http.request({ host:'127.0.0.1', port:PORT, path:p, method:'PUT' }, x => { let d=''; x.on('data',c=>d+=c); x.on('end',()=>{ try{ res(JSON.parse(d)); }catch(e){ rej(new Error(d.slice(0,200))); } }); }); r.on('error', rej); r.end(); }); }

const NL = String.fromCharCode(10);
const ZH = ['1','00:00:01,000 --> 00:00:04,000','第一行原文','','2','00:00:05,000 --> 00:00:07,000','第二行原文',''].join(NL);
const EN = ['1','00:00:01,000 --> 00:00:04,000','First line','','2','00:00:05,000 --> 00:00:07,000','Second line',''].join(NL);
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
  const txt = id => `(function(){ var e=document.getElementById(${JSON.stringify(id)}); return e ? e.textContent : 'MISSING'; })()`;
  const go = async (label, steps) => { try { await step('endDemo();'); for (const s of steps) await step(s); return true; }
    catch(e){ ok(false, label, DBG || String(e.message).slice(0,120)); DBG=''; return false; } };

  /* ============ ① ASS 面板 ============ */
  console.log('【单语 · ASS 面板】');
  await go('单语 + ASS', [load('src', ZH, 'clip.srt'), setMode('mono'), 'doMono();', fmt('split'),
    `document.getElementById('assPanel').open = true;`]);
  ok(await ev(vis('assPanel')) !== 'none', 'ASS 档位：ASS 面板在（前提）', await ev(vis('assPanel')));
  ok(await ev(vis('assSrcCol')) === 'none', '单语下「原文（副）」整栏收起', await ev(vis('assSrcCol')));
  ok(await ev(vis('assDstCol')) !== 'none', '单语下「字幕」那一栏还在', await ev(vis('assDstCol')));
  ok(String(await ev(txt('assDstColTitle'))) === '字幕', '那一栏标题改叫「字幕」（不再是「译文（主）」）', await ev(txt('assDstColTitle')));
  ok(await ev(`document.getElementById('assCols').classList.contains('mono')`), '两栏栅格收成单列（不留半边空白）');
  ok(String(await ev(`getComputedStyle(document.getElementById('assCols')).gridTemplateColumns`)).split(' ').length === 1,
    '栅格真的只有一列', await ev(`getComputedStyle(document.getElementById('assCols')).gridTemplateColumns`));
  /* 单语下不该再看到「原文」「译文」这两个词（面板全展开扫描） */
  const asstxt = String(await ev(`Array.prototype.filter.call(document.querySelectorAll('#assPanel *'), function(e){ return e.offsetParent !== null && e.children.length === 0; }).map(function(e){ return e.textContent; }).join('|')`));
  ok(asstxt.indexOf('原文') < 0, 'ASS 面板可见文案里没有「原文」了', (asstxt.match(/[^|]*原文[^|]*/g)||[]).slice(0,3).join(' / '));
  ok(asstxt.indexOf('译文') < 0, 'ASS 面板可见文案里没有「译文」了', (asstxt.match(/[^|]*译文[^|]*/g)||[]).slice(0,3).join(' / '));

  /* ============ ② VTT 面板 ============ */
  console.log('【单语 · VTT 面板】');
  await go('切带样式 VTT', [fmt('vttStyle'), `document.getElementById('mVttPanel').open = true;`]);
  ok(await ev(vis('mVttPanel')) !== 'none', 'VTT 档位：VTT 面板在（前提）', await ev(vis('mVttPanel')));
  ok(await ev(vis('mVttSrcGrp')) === 'none', '单语下「原文行」整组收起', await ev(vis('mVttSrcGrp')));
  ok(String(await ev(txt('mVttGrpDstTitle'))) === '字幕行', '「译文行（主样式）」改叫「字幕行」', await ev(txt('mVttGrpDstTitle')));
  ok(String(await ev(txt('mVttGrpAllTitle'))) === '整条字幕', '「整条字幕（两层共用）」改叫「整条字幕」', await ev(txt('mVttGrpAllTitle')));
  const ptitle = String(await ev(txt('mVttPanelTitle')));
  ok(ptitle.indexOf('双语') < 0 && ptitle.indexOf('WebVTT') >= 0, '面板标题不再写「双语样式」', ptitle);
  ok(await ev(`document.getElementById('mVttCols2').classList.contains('mono')`), 'VTT 两组栅格收成单列');
  const vtttxt = String(await ev(`Array.prototype.filter.call(document.querySelectorAll('#mVttPanel *'), function(e){ return e.offsetParent !== null && e.children.length === 0; }).map(function(e){ return e.textContent; }).join('|')`));
  ok(vtttxt.indexOf('原文行') < 0, 'VTT 面板可见文案里没有「原文行」了', (vtttxt.match(/[^|]*原文[^|]*/g)||[]).slice(0,3).join(' / '));

  /* ============ ③ 模板名三处 ============ */
  /* ③ 模板名：v0.9.267 起单语那排换成四套样式模板（流媒体 / 无障碍 / 影院 / 社媒），
       不再显示「标准 · 底部双行」—— 它和「标准 · 底部双语」的唯一差别是原文行那一层，单语没有。
       ⚠️ 「下拉选项文案」那条没动：隐藏 select 的 option 仍叫「标准 · 底部双行」（它是状态源，不是展示项）。 */
  console.log('【单语 · 模板名改为业界四套】');
  ok(String(await ev(`vttPresetLabel()`)) === '流媒体标准', 'vttPresetLabel() = 流媒体标准（前身「标准 · 底部双行」）', await ev(`vttPresetLabel()`));
  ok(String(await ev(txt('mVttOptStd'))) === '标准 · 底部双行', '隐藏下拉的选项文案仍是「底部双行」（状态源不变）', await ev(txt('mVttOptStd')));
  ok(String(await ev(txt('expSum'))).indexOf('流媒体标准') >= 0, '导出摘要写当档的模板名', await ev(txt('expSum')));
  ok(String(await ev(txt('expSum'))).indexOf('双语') < 0 && String(await ev(txt('expSum'))).indexOf('双行') < 0,
    '导出摘要里没有「双语 / 双行」了', await ev(txt('expSum')));
  ok(String(await ev(`document.getElementById('mVttPresetHint').getAttribute('data-tip')`)).indexOf('金色原文') < 0,
    'ⓘ 说明里那句「金色原文」换掉了（单语没有原文行）', await ev(`document.getElementById('mVttPresetHint').getAttribute('data-tip')`));

  /* 换界面语言：单语下的改词也要跟着新语言走（applyI18n → syncAssChrome → syncMonoChrome） */
  await go('切英文', [`document.getElementById('uiLang').value='en'; document.getElementById('uiLang').dispatchEvent(new Event('change',{bubbles:true}));`]);
  ok(String(await ev(txt('assDstColTitle'))) === 'Subtitle', '换英文后 ASS 栏标题仍是单语那套词（没被按回「译文」）', await ev(txt('assDstColTitle')));
  ok(String(await ev(txt('mVttGrpDstTitle'))) === 'Subtitle line', '换英文后 VTT 组标题仍是单语那套词', await ev(txt('mVttGrpDstTitle')));
  ok(String(await ev(txt('mVttPanelTitle'))).indexOf('bilingual') < 0, '换英文后面板标题仍不写 bilingual', await ev(txt('mVttPanelTitle')));
  ok(String(await ev(`vttPresetLabel()`)) === 'Streaming standard', '换英文后模板名仍是单语那套词', await ev(`vttPresetLabel()`));
  await go('切回中文', [`document.getElementById('uiLang').value='zh-CN'; document.getElementById('uiLang').dispatchEvent(new Event('change',{bubbles:true}));`]);
  ok(String(await ev(txt('assDstColTitle'))) === '字幕', '切回中文：ASS 栏标题 = 字幕', await ev(txt('assDstColTitle')));

  /* ============ ④ 切回双语全部原样回来 ============ */
  console.log('【切回双语：原样回来】');
  await go('双语', [load('src', ZH, 'zh.srt'), load('dst', EN, 'en.srt'), setMode('merge'), 'doMerge();', fmt('split'),
    `document.getElementById('assPanel').open = true;`]);
  ok(await ev(vis('assSrcCol')) !== 'none', '双语下「原文（副）」整栏回来', await ev(vis('assSrcCol')));
  ok(String(await ev(txt('assDstColTitle'))) === '译文（主）', '双语下那一栏标题回到「译文（主）」', await ev(txt('assDstColTitle')));
  ok(!(await ev(`document.getElementById('assCols').classList.contains('mono')`)), '双语下栅格恢复两列');
  await go('双语 VTT', [fmt('vttStyle'), `document.getElementById('mVttPanel').open = true;`]);
  ok(await ev(vis('mVttSrcGrp')) !== 'none', '双语下 VTT「原文行」整组回来', await ev(vis('mVttSrcGrp')));
  ok(String(await ev(txt('mVttGrpDstTitle'))) === '译文行（主样式）', '双语下 VTT 组标题回到「译文行（主样式）」', await ev(txt('mVttGrpDstTitle')));
  ok(String(await ev(`vttPresetLabel()`)) === '标准 · 底部双语', '双语下模板名回到「标准 · 底部双语」', await ev(`vttPresetLabel()`));
  ok(String(await ev(txt('mVttPanelTitle'))).indexOf('双语') >= 0, '双语下面板标题写回「双语样式」', await ev(txt('mVttPanelTitle')));

  /* 值不丢：单语下改过一次 ASS 参数，切回双语那栏的值还在（只收起不删除的应有之义） */
  await go('单语改值', [setMode('mono'), load('src', ZH, 'clip.srt'), 'doMono();', fmt('split'),
    `document.getElementById('assDstSize').value='77';`]);
  await go('回到双语', [load('src', ZH, 'zh.srt'), load('dst', EN, 'en.srt'), setMode('merge'), 'doMerge();', fmt('split')]);
  ok(String(await ev(`document.getElementById('assSrcSize').value`)) === '50', '双语下原文栏的值没被单语改动带跑（仍是 50）',
    await ev(`document.getElementById('assSrcSize').value`));

  ok(errs.length === 0, '全程零 JS 异常', errs.slice(0, 2).join(' | '));
  console.log(NL + '总计：' + PASS + ' 通过 / ' + FAIL + ' 失败');
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error('脚本出错：', e.message); process.exit(2); });
