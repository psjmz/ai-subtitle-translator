/* v0.9.246：真浏览器 E2E —— 槽参数放开到全部可支持项 + 从已存方案导入
   坑位（沿用 245）：
     ⚠️ Emulation.setDeviceMetricsOverride 必须在 Page.navigate 之后
     ⚠️ VTT 面板 <details> 要 .open=true
     ⚠️ rows 字段是 en / zh（不是 src / dst）
   246 新增：
     ⚠️ 从方案导入走 localStorage 直接写（schemeDoSave 里是 window.prompt，会阻塞 headless）
     ⚠️ size 在方案里是**绝对字号**，在槽里是**百分比** —— 断言必须按口径各自算 */
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

const SRT_MONO = [
  '1', '00:00:01,000 --> 00:00:03,000', '你好，这是一条普通台词', '',
  '2', '00:00:04,000 --> 00:00:06,000', '[电话铃声]', '',
  '3', '00:00:07,000 --> 00:00:12,000', '十年后他回到了那条街', '',
  '4', '00:00:13,000 --> 00:00:18,000', '♪ 片头曲 ♪', ''
].join('\n') + '\n';

const SRT_EN = [
  '1', '00:00:01,000 --> 00:00:03,000', 'Hello, this is a normal line', '',
  '2', '00:00:04,000 --> 00:00:06,000', '[phone ringing]', '',
  '3', '00:00:07,000 --> 00:00:12,000', 'Ten years later he came back', '',
  '4', '00:00:13,000 --> 00:00:18,000', '♪ opening theme ♪', ''
].join('\n') + '\n';

let ws, idSeq = 0;
const pending = new Map();
const events = [];
function send(method, params, sessionId) {
  const id = ++idSeq;
  const msg = { id, method, params: params || {} };
  if (sessionId) msg.sessionId = sessionId;
  ws.send(JSON.stringify(msg));
  return new Promise((res, rej) => {
    pending.set(id, { res, rej });
    setTimeout(() => { if (pending.has(id)) { pending.delete(id); rej(new Error('timeout ' + method)); } }, 15000);
  });
}
async function evalJs(expr, sessionId) {
  const r = await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true }, sessionId);
  if (r.exceptionDetails) throw new Error(r.exceptionDetails.text + ' ' + (r.exceptionDetails.exception || {}).description);
  return r.result.value;
}
const wait = ms => new Promise(r => setTimeout(r, ms));

(async () => {
  const chrome = spawn(CHROME, [
    '--headless=new', '--remote-debugging-port=9346', '--no-sandbox', '--disable-gpu',
    '--remote-allow-origins=*', '--window-size=1440,1600',
    '--user-data-dir=/tmp/cbuddy-e2e246-' + Date.now()
  ], { stdio: 'ignore' });
  await wait(2500);

  const list = await new Promise((res, rej) => {
    http.get('http://127.0.0.1:9346/json/list', r => { let b = ''; r.on('data', d => b += d); r.on('end', () => res(JSON.parse(b))); }).on('error', rej);
  });
  const page = list.find(t => t.type === 'page');
  ws = new WebSocket(page.webSocketDebuggerUrl, { perMessageDeflate: false });
  await new Promise(r => ws.on('open', r));
  ws.on('message', (buf) => {
    const m = JSON.parse(buf.toString());
    if (m.id && pending.has(m.id)) { const p = pending.get(m.id); pending.delete(m.id); m.error ? p.rej(new Error(JSON.stringify(m.error))) : p.res(m.result); }
    else if (m.method) events.push(m);
  });

  await send('Page.enable'); await send('Runtime.enable'); await send('Network.enable');
  await send('Network.setCacheDisabled', { cacheDisabled: true });
  await send('Log.enable');

  console.log('— v0.9.246：槽参数表 —');
  await send('Page.navigate', { url: BASE + '/merge.html' });
  await wait(2200);
  await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1600, deviceScaleFactor: 1, mobile: false });
  await wait(400);

  const errs = events.filter(e => e.method === 'Log.entryAdded' && e.params.entry.level === 'error').map(e => e.params.entry.text);
  ok('页面加载无 JS 错误', errs.length === 0, errs.join(' | '));

  const specN = await evalJs("SLOT_SPEC.length");
  ok('SLOT_SPEC 有 17 项（245 只有 5 项）', specN === 17, '实际=' + specN);

  const keys = await evalJs("SLOT_KEYS.join(',')");
  ['size', 'color', 'font', 'bold', 'italic', 'alpha', 'spacing', 'outlineW', 'outlineColor',
    'edgeMode', 'edgeSize', 'edgeColor', 'edgeAlpha', 'align', 'dMV', 'marginL', 'marginR'
  ].forEach(k => {
    ok('参数表含 ' + k, keys.split(',').indexOf(k) >= 0);
  });
  ok('参数键无重复', new Set(keys.split(',')).size === keys.split(',').length, keys);

  const noSrc = await evalJs("SLOT_SPEC.filter(function(p){return p.noSrc;}).map(function(p){return p.k;}).join(',')");
  ok('alpha 标了 noSrc（VTT 没有原文行不透明度）', noSrc === 'alpha', 'noSrc=' + noSrc);

  const fmtAss = await evalJs("SLOT_SPEC.filter(function(p){return p.fmt==='ass';}).map(function(p){return p.k;}).join(',')");
  ok('仅在 ASS 生效的项标记出来（不许静默忽略）',
    fmtAss.split(',').sort().join(',') === 'marginL,marginR,spacing', 'fmt:ass=' + fmtAss);

  /* 进单语模式 + 生成 rows */
  await evalJs("(function(){var el=document.querySelector('#modeTabs input[value=mono]');el.checked=true;el.dispatchEvent(new Event('change',{bubbles:true}));})()");
  await wait(300);
  await evalJs("(function(){var t=$('srcText');t.value=" + JSON.stringify(SRT_MONO) + ";t.dispatchEvent(new Event('input',{bubbles:true}));})()");
  await wait(500);
  await evalJs("$('btnMerge').click()");
  await wait(700);
  ok('生成了 4 条 rows', await evalJs("(S.rows||[]).length") === 4, 'rows=' + await evalJs("(S.rows||[]).length"));

  /* 槽编辑面板：全量视图列出全部 17 项 */
  await evalJs("$('slotEdit').open = true;");
  await evalJs("(function(){var c=document.querySelector('#slotBar [data-slot-edit=narration]');c.dispatchEvent(new MouseEvent('click',{bubbles:true}));})()");
  await wait(300);
  await evalJs("$('slotViewAll').click()");
  await wait(300);

  const allRows = await evalJs("document.querySelectorAll('#slotParams .slot-row').length");
  ok('单语全量视图列出 17 项（245 时是 5 项）', allRows === 17, '实际=' + allRows);

  const grpN = await evalJs("document.querySelectorAll('#slotParams .slot-subgrp').length");
  ok('按 5 个分组铺开（整条/文字/描边/阴影底衬/位置）', grpN === 5, '组数=' + grpN);

  /* ⚠️ 未覆盖的项显示「沿用 · 当前值」文本，**不给控件**（点了「覆盖」才出控件）。
     所以要查控件形态，得先把这个槽的参数全铺上。 */
  await evalJs(`(function(){
    var d = S.style.slots.narration.dst;
    d.color='#112233'; d.outlineColor='#445566'; d.edgeColor='#778899';
    d.alpha=80; d.spacing=1; d.outlineW=3; d.edgeSize=4; d.edgeAlpha=70; d.dMV=10;
    d.marginL=11; d.marginR=12; d.size=110; d.font='Menlo'; d.bold=true; d.italic=true;
    d.edgeMode='shadow'; d.align='right';
    renderSlotEdit(); return 1;
  })()`);
  await wait(300);
  const ctl = JSON.parse(await evalJs("JSON.stringify({color:document.querySelectorAll('#slotParams input[type=color]').length, num:document.querySelectorAll('#slotParams input[type=number]').length, sel:document.querySelectorAll('#slotParams select').length, txt:document.querySelectorAll('#slotParams input[type=text]').length})"));
  ok('颜色项出取色器（color/outlineColor/edgeColor = 3）', ctl.color === 3, JSON.stringify(ctl));
  ok('数值项出数字框（size/alpha/spacing/outlineW/edgeSize/edgeAlpha/dMV/marginL/marginR = 9）', ctl.num === 9, JSON.stringify(ctl));
  ok('布尔与枚举项出下拉（bold/italic/edgeMode/align = 4）', ctl.sel === 4, JSON.stringify(ctl));
  ok('字体项出文本框（datalist 联想）', ctl.txt === 1, JSON.stringify(ctl));

  const onlyAss = await evalJs("document.querySelectorAll('#slotParams .fmt-tag').length");
  ok('「仅 ASS」的项在列表里标出来（spacing/marginL/marginR = 3）', onlyAss === 3, '标记数=' + onlyAss);

  /* 差异视图只列被覆盖的项 */
  await evalJs("$('slotViewDiff').click()");
  await wait(300);
  const diffRows = await evalJs("document.querySelectorAll('#slotParams [data-sp-act=\\'unset\\']').length");
  ok('差异视图仍只列出已覆盖项（上面铺了 17 项 → 17 行）', diffRows === 17, '实际=' + diffRows);
  await evalJs("(function(){S.style.slots.narration.dst={italic:true};renderSlotEdit();})()");
  await wait(250);
  const diffN = await evalJs("document.querySelectorAll('#slotParams [data-sp-act=\\'unset\\']').length");
  ok('清回只覆盖斜体 → 差异视图只剩 1 行', diffN === 1, '实际=' + diffN);

  console.log('— v0.9.246：新参数落到 ASS 导出 —');
  await evalJs("(function(){var s=$('expFmt');s.value='split';s.dispatchEvent(new Event('change',{bubbles:true}));})()");
  await wait(400);

  /* 给 emphasis 槽铺一堆覆盖，先看导出有没有吃到 */
  await evalJs(`(function(){
    ensureStyle();
    var d = S.style.slots.emphasis.dst;
    d.marginL = 200; d.marginR = 30; d.spacing = 3; d.outlineColor = '#FF0000';
    d.font = 'Songti SC'; d.edgeMode = 'box'; d.edgeAlpha = 90;
    S.style.assign[0] = 'emphasis'; syncSlotsToRows(); return JSON.stringify(d);
  })()`);
  await wait(300);
  const assOut = await evalJs("buildExport()");
  const slotLine = (assOut.match(/^Style: SlotD_emphasis,.*$/m) || [''])[0];
  ok('ASS 里生成了 SlotD_emphasis 样式行', !!slotLine, slotLine.slice(0, 120));

  /* ASS Style 列序：Name,Fontname,Fontsize,Pri,Sec,Outline,Back,Bold,Italic,Underline,StrikeOut,
     ScaleX,ScaleY,Spacing,Angle,BorderStyle,Outline,Shadow,Alignment,MarginL,MarginR,MarginV,Encoding */
  const cols = slotLine.split(',');
  ok('左右边距生效：MarginL=200（此前列写死 60）', cols[19] === '200', 'MarginL=' + cols[19]);
  ok('左右边距生效：MarginR=30', cols[20] === '30', 'MarginR=' + cols[20]);
  ok('字间距生效：Spacing=3', cols[13] === '3', 'Spacing=' + cols[13]);
  ok('字体生效：Fontname=Songti SC', cols[1] === 'Songti SC', 'Font=' + cols[1]);
  ok('描边色生效：OutlineColour 不是黑', cols[5] !== '&H00000000', 'Outline=' + cols[5]);
  ok('底衬模式生效：BorderStyle=3', cols[15] === '3', 'BorderStyle=' + cols[15]);

  /* 上面 6 项没一项曾是 245 能做到的 —— 245 只有 size/color/bold/italic/dMV */

  /* size 是「基础字号的百分比」，不是绝对字号 */
  const sizePct = await evalJs(`(function(){
    S.style.slots.emphasis.dst.size = 120;
    var before = slotAssSpec('emphasis','dst').size;
    return JSON.stringify({base: +assStyleOf().dstSize, slot: before});
  })()`);
  const sz = JSON.parse(sizePct);
  ok('size=120 解释为「基础字号的 120%」（' + sz.base + ' → ' + sz.slot + '）',
    Math.abs(sz.slot - Math.round(sz.base * 1.2)) <= 1, JSON.stringify(sz));

  console.log('— v0.9.246：补丁语义不能破（改基础样式，槽跟着变） —');
  const follow = await evalJs(`(function(){
    S.style.slots.emphasis.dst.size = 120;
    delete S.style.slots.emphasis.dst.color;      /* 颜色不覆盖 → 应跟着基础走 */
    $('assDstColor').value = '#00FF00'; $('assDstColor').dispatchEvent(new Event('change',{bubbles:true}));
    var a0 = slotAssSpec('emphasis','dst').color;
    $('assDstSize').value = '100'; $('assDstSize').dispatchEvent(new Event('change',{bubbles:true}));
    var s1 = slotAssSpec('emphasis','dst').size;
    $('assDstSize').value = '56'; $('assDstSize').dispatchEvent(new Event('change',{bubbles:true}));
    $('assDstColor').value = '#FFFFFF'; $('assDstColor').dispatchEvent(new Event('change',{bubbles:true}));
    return JSON.stringify({colorFollows: a0, sizeAt100: s1, sizeAt56: slotAssSpec('emphasis','dst').size});
  })()`);
  const fw = JSON.parse(follow);
  ok('没覆盖的颜色跟着基础样式走（补丁不是快照）', fw.colorFollows !== '&H00FFFFFF', '变更后=' + fw.colorFollows);
  ok('字号=120% 随基础字号变化（100 → 120，不是钉死）', fw.sizeAt100 === 120, JSON.stringify(fw));
  ok('基础字号改回来，槽也跟着回来（56 → 67）', fw.sizeAt56 === Math.round(56 * 1.2), JSON.stringify(fw));

  console.log('— v0.9.246：VTT 侧新参数 —');
  await evalJs("(function(){var s=$('expFmt');s.value='vttStyle';s.dispatchEvent(new Event('change',{bubbles:true}));})()");
  await wait(500);
  await evalJs(`(function(){
    var p=$('mVttPanel'); if(p) p.open=true;
    S.style.slots.emphasis.dst.font = 'Songti SC';
    S.style.slots.emphasis.dst.spacing = 2;
    syncSlotsToRows(); return 1;
  })()`);
  await wait(300);
  const vttOut = await evalJs("buildExport()");
  const cueRule = (vttOut.match(/::cue\(\.sg-emphasis\)\s*\{[\s\S]*?\}/) || [''])[0];
  ok('VTT 里有 ::cue(.sg-emphasis) 规则', !!cueRule, cueRule.slice(0, 100));
  ok('VTT 槽规则带 font-family', /font-family/.test(cueRule), cueRule);

  /* ⚠️ 255/246 纪律：预览必须与导出同源 —— VTT 预览按槽画 */
  /* ⚠️ v0.9.256：先回「成片」视角（按行上实际套的槽画）；本套前面点过小铅笔，
     视角会停在那颗槽上，预览就固定画它，改 emphasis 也看不出来。 */
  await evalJs("setPvView('movie');"); await wait(300);
  await evalJs("(function(){var e=$('exp');if(e&&getComputedStyle(e).display==='none')e.style.display='block';renderVttPv();})()");
  await wait(400);
  const pvFont = await evalJs("(function(){var d=document.querySelector('#mVttPvCue .vtt-pv-line');return d?getComputedStyle(d).fontFamily:'(无行)';})()");
  ok('预览里的行用了槽的字体（预览 = 导出）', /Songti/.test(pvFont), '预览字体=' + pvFont);

  console.log('— v0.9.246：从已存方案导入 —');
  /* 直接写 localStorage（schemeDoSave 里有 window.prompt，headless 会卡死） */
  await evalJs(`(function(){
    var all = JSON.parse(localStorage.getItem('srt_merge_ass_schemes_v1') || '{}');
    var cur = {};
    ASS_DEFAULTS.forEach(function(p){ cur[p[0]] = p[1]; });
    cur.assMarginL = '60'; cur.assMarginR = '60';
    /* 「导入测试」方案：字号与颜色不同，其余完全一样 → 只应写出 2 项覆盖 */
    var sc = Object.assign({}, cur);
    sc.assDstSize = '80'; sc.assDstColor = '#3388FF';
    sc.__v = 1; sc.__layout = 'split'; sc.__order = 'dstTop';
    all['导入测试'] = sc;
    /* 「全同」方案：与基础样式一项不差 → 导入后应一项覆盖都不写 */
    all['全同方案'] = Object.assign({}, cur, {__v:1, __layout:'split', __order:'dstTop'});
    localStorage.setItem('srt_merge_ass_schemes_v1', JSON.stringify(all));
    renderSlotSchemeSel(); renderSchemeList();
    return JSON.stringify(Object.keys(all));
  })()`);
  await wait(300);

  const selOpts = await evalJs("Array.from($('slotSchemeSel').options).map(function(o){return o.value;}).join('|')");
  ok('槽面板下拉列出了已存方案', /导入测试/.test(selOpts) && /全同方案/.test(selOpts), selOpts);

  /* 导入「导入测试」→ 只出现 2 项差异 */
  const imp1 = await evalJs(`(function(){
    ensureStyle(); S.style.cur='lyric'; S.style.slots.lyric.dst = {};
    var n = slotImportScheme('lyric', '导入测试');
    return JSON.stringify({n:n, d:S.style.slots.lyric.dst});
  })()`);
  const r1 = JSON.parse(imp1);
  ok('导入「导入测试」写出 2 项覆盖（字号+颜色）', r1.n === 2, JSON.stringify(r1.d));
  ok('导入的字号换算成百分比（80/56≈143）', Math.abs(r1.d.size - 143) <= 2, 'size=' + r1.d.size);
  ok('导入的颜色是方案里的 #3388FF', String(r1.d.color).toUpperCase() === '#3388FF', 'color=' + r1.d.color);
  ok('相同的项一项都没写（补丁只存差异）',
    !('bold' in r1.d) && !('font' in r1.d) && !('edgeMode' in r1.d) && !('marginL' in r1.d),
    JSON.stringify(Object.keys(r1.d)));
  ok('⚠️ dMV 不导入（方案存绝对位置、槽存偏移，硬搬会整屏飞）', !('dMV' in r1.d));

  /* 导入「全同方案」→ 一项都不写 */
  const imp2 = await evalJs(`(function(){
    S.style.slots.lyric.dst = {};
    var n = slotImportScheme('lyric', '全同方案');
    return JSON.stringify({n:n, keys:Object.keys(S.style.slots.lyric.dst)});
  })()`);
  const r2 = JSON.parse(imp2);
  ok('导入与基础完全相同的方案 → 一项覆盖都不写', r2.n === 0 && r2.keys.length === 0, JSON.stringify(r2));

  /* 导入后仍可继续微调，且仍是补丁 */
  /* ⚠️ assDstFont 是 <select>（字体下拉），给它赋不存在的 option 会被浏览器清成空 ——
     测补丁语义改用「没被导入覆盖的数字项」字间距。 */
  const afterImp = await evalJs(`(function(){
    slotImportScheme('lyric', '导入测试');
    var sp0 = slotAssSpec('lyric','dst').spacing;
    $('assDstSpacing').value = '7'; $('assDstSpacing').dispatchEvent(new Event('change',{bubbles:true}));
    var spFollows = slotAssSpec('lyric','dst').spacing;
    $('assDstColor').value = '#FFFFFF'; $('assDstColor').dispatchEvent(new Event('change',{bubbles:true}));
    var colorKeeps = slotAssSpec('lyric','dst').color;
    $('assDstSpacing').value = '0'; $('assDstSpacing').dispatchEvent(new Event('change',{bubbles:true}));
    return JSON.stringify({sp0:sp0, spFollows:spFollows, colorKeeps:colorKeeps});
  })()`);
  const ai = JSON.parse(afterImp);
  ok('导入后仍是补丁：没覆盖的字间距跟着基础走（0 → 7）',
    ai.spFollows === 7, JSON.stringify(ai));
  ok('导入后仍是补丁：已覆盖的颜色保持覆盖（不跟着基础退回去）',
    ai.colorKeeps !== '&H00FFFFFF', JSON.stringify(ai));

  /* 不存在 / 空名字 → 不炸 */
  const impBad = await evalJs("JSON.stringify([slotImportScheme('lyric',''), slotImportScheme('lyric','__不存在__')])");
  ok('传空名 / 不存在的方案返回 0，不炸', impBad === '[0,0]', impBad);

  console.log('— v0.9.246：导入 UI 真实点击路径 —');
  await evalJs("(function(){S.style.cur='sfx'; S.style.slots.sfx.dst={}; renderSlotEdit();})()");
  await wait(300);
  await evalJs("(function(){var s=$('slotSchemeSel'); s.value='导入测试'; s.dispatchEvent(new Event('change',{bubbles:true}));})()");
  await evalJs("$('slotSchemeImp').dispatchEvent(new MouseEvent('click',{bubbles:true}))");
  await wait(400);
  const clickImp = await evalJs("JSON.stringify(Object.keys(S.style.slots.sfx.dst||{}))");
  ok('点「导入」按钮真的写了覆盖项（245 教训：键看得见点不动）',
    /"size"/.test(clickImp) && /"color"/.test(clickImp), clickImp);

  const coverTxt = await evalJs("$('slotCover').textContent");
  ok('覆盖计数跟着导入更新（2 项）', /2\s*\/\s*17/.test(coverTxt), coverTxt);

  console.log('— v0.9.246：i18n 四语 —');
  const i18nKeys = ['slotPrmSize','slotPrmColor','slotPrmBold','slotPrmItalic','slotPrmDMV','slotPrmFont',
    'slotPrmAlpha','slotPrmSpacing','slotPrmOutlineW','slotPrmOutlineColor','slotPrmEdgeMode',
    'slotPrmEdgeSize','slotPrmEdgeColor','slotPrmEdgeAlpha','slotPrmAlign','slotPrmMarginL','slotPrmMarginR',
    'slotGrpCue','slotGrpText','slotGrpEdge','slotGrpFx','slotGrpPos',
    'slotEdgeNone','slotEdgeShadow','slotEdgeBox','slotAlignLeft','slotAlignCenter','slotAlignRight',
    'slotOnlyAss','slotImpFrom','slotImpBtn','slotImpNone','slotImpDone','slotImpSame'];
  /* ⚠️ 字典变量是 I18N（不是 DIC），语言对象是 UI.lang，切完要调 applyI18n() */
  const i18nMiss = await evalJs(`(function(){
    var ks = ${JSON.stringify(i18nKeys)};
    var out = [];
    ['zh-CN','zh-TW','en','ja'].forEach(function(L){
      ks.forEach(function(k){
        var v = (I18N[L] || {})[k];
        if (v == null || v === '') out.push(L + '.' + k);
      });
    });
    return out.join(',');
  })()`).catch(e => 'ERR:' + e.message);
  ok('新增词条四语齐全（漏一个语块界面就整块空白）', String(i18nMiss) === '', String(i18nMiss));

  /* 切四语，看有没有 undefined 冒出来 */
  for (const lg of ['zh-TW', 'en', 'ja', 'zh-CN']) {
    await evalJs("(function(){UI.lang='" + lg + "';applyI18n();renderSlotEdit();})()");
    await wait(250);
    const bad = await evalJs("(document.getElementById('slotParams').textContent.match(/undefined|NaN/g)||[]).length");
    ok('切到 ' + lg + ' 后槽面板无 undefined/NaN', bad === 0, '命中 ' + bad + ' 处');
  }

  console.log('— v0.9.246：双语模式 —');
  await evalJs("(function(){var el=document.querySelector('#modeTabs input[value=merge]');el.checked=true;el.dispatchEvent(new Event('change',{bubbles:true}));})()");
  await wait(300);
  await evalJs("(function(){var t=$('srcText');t.value=" + JSON.stringify(SRT_EN) + ";t.dispatchEvent(new Event('input',{bubbles:true}));})()");
  await wait(300);
  await evalJs("(function(){var t=$('dstText');t.value=" + JSON.stringify(SRT_MONO) + ";t.dispatchEvent(new Event('input',{bubbles:true}));})()");
  await wait(500);
  await evalJs("$('btnMerge').click()");
  await wait(1000);
  await evalJs("$('slotEdit').open = true;");
  await evalJs("(function(){var c=document.querySelector('#slotBar [data-slot-edit=lyric]');c.dispatchEvent(new MouseEvent('click',{bubbles:true}));})()");
  await wait(300);
  await evalJs("$('slotViewAll').click()");
  await wait(300);
  const biRows = await evalJs("document.querySelectorAll('#slotParams .slot-row').length");
  /* 双语：dst 17 项 + src 15 项 = 32。
     src 少了两项：alpha（noSrc：VTT 没有原文行不透明度）、dMV（level:'cue' 整条级，
     只在承载行那半出现一次 —— 没有「只把原文行上移 20px」这回事）。 */
  ok('双语全量视图 32 项（dst 17 + src 15）', biRows === 32, '实际=' + biRows);
  const biKeys = await evalJs("Array.from(document.querySelectorAll('#slotParams [data-sp-act]')).map(function(e){return e.getAttribute('data-sp-k');}).join(',')");
  ok('src 那半没有 alpha（noSrc）', biKeys.split(',').indexOf('src.alpha') < 0);
  ok('src 那半没有 dMV（整条级参数，只在承载行那半）', biKeys.split(',').indexOf('src.dMV') < 0);
  ok('dst 那半两项都在', biKeys.split(',').indexOf('dst.alpha') >= 0 && biKeys.split(',').indexOf('dst.dMV') >= 0);

  const errs2 = events.filter(e => e.method === 'Log.entryAdded' && e.params.entry.level === 'error').map(e => e.params.entry.text);
  ok('整轮跑完无 JS 错误', errs2.length === 0, errs2.slice(0, 3).join(' | '));

  console.log('\n通过 ' + pass + ' · 失败 ' + fail);
  chrome.kill();
  process.exit(fail ? 1 : 0);
})().catch(e => { console.error('致命错误:', e); process.exit(2); });
