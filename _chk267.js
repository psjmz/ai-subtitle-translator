/* v0.9.267 实测：单语面板方案 A 重排 + 四套业界模板
   背景：266 把控件推到右边界，但标签仍贴左 → 每行中间隔着一大片死区（眼要横跨半个面板
        才把标签和值对上），控件宽度五马八门（84/116/129/168/16），复选框还是颗原生小方块。
        267 改成「标签提到控件正上方 + 控件铺满整格 + 复选框变 44×24 开关 + 色块统一 26×26」，
        并把单语那排「分屏/堆叠/底部双行」（实测：单语下只有字号 56 vs 54 的差别，没有排版含义）
        换成四套有出处可依的模板：流媒体标准 / 无障碍高对比 / 影院质感 / 社媒竖屏。
   ⚠️ 量 DOM 不量 CSS 文本：
      · 布局 —— 标签是否在控件**正上方**、每行最右元素是否收在**同一条右边界**、左边界是否只有两个取值
      · 模板 —— 逐档点按钮读 assDst* 真实取值，同时盯住 assSrc* / mVttSrc* 一个都不许动
      · 预览 —— 单语只画一行（266 及更早会凭空画一条英文原文行）
   ⚠️ 「控件宽度」本就该分三种（纯控件 317 / 带色块 283 / 带百分比 271）—— 由第二列内容决定，
      硬要三者同宽反而是错的；真正要验的是**所有行收在同一条右边界**。 */
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');
const http = require('http');
const PORT = 9333, BASE = 'http://127.0.0.1:3098';
const wait = ms => new Promise(r => setTimeout(r, ms));
let PASS = 0, FAIL = 0;
const ok = (c, name, extra) => { console.log((c ? '  ✓ ' : '  ✗ ') + name + (extra !== undefined && !c ? '  [' + extra + ']' : '')); c ? PASS++ : FAIL++; };
function J(p) { return new Promise((res, rej) => { const r = http.request({ host: '127.0.0.1', port: PORT, path: p, method: 'PUT' }, x => { let d = ''; x.on('data', c => d += c); x.on('end', () => { try { res(JSON.parse(d)); } catch (e) { rej(new Error(d.slice(0, 200))); } }); }); r.on('error', rej); r.end(); }); }
const NL = String.fromCharCode(10);
const ZH = ['1', '00:00:01,000 --> 00:00:04,000', '第一行原文', '', '2', '00:00:05,000 --> 00:00:07,000', '第二行原文', ''].join(NL);
const EN = ['1', '00:00:01,000 --> 00:00:04,000', 'First line', '', '2', '00:00:05,000 --> 00:00:07,000', 'Second line', ''].join(NL);
const b64 = s => Buffer.from(s, 'utf8').toString('base64');

/* 量一栏：标签位置、每行最右元素与内容右边界的差（= 右边界是否一条线）、左边界取值个数 */
const LAYOUT = `(function(colSel){
  var col=document.querySelector(colSel); if(!col) return {err:'MISS'};
  var cs=getComputedStyle(col);
  var afs=Array.prototype.filter.call(col.querySelectorAll(':scope > .af'), function(a){return a.offsetParent!==null;});
  if(!afs.length) return {err:'NO_FIELDS'};
  var rows=[], sws=[];
  afs.forEach(function(a){
    var ar=a.getBoundingClientRect(), acs=getComputedStyle(a);
    var contentR = ar.right - parseFloat(acs.paddingRight) - parseFloat(acs.borderRightWidth);
    var lab=a.querySelector('label');
    var ins=Array.prototype.filter.call(a.querySelectorAll('input,select,textarea'), function(i){return i.offsetParent!==null;});
    if(!lab || !ins.length) return;
    var lr=lab.getBoundingClientRect(), c=ins[0], cr=c.getBoundingClientRect();
    var ext=Array.prototype.filter.call(a.querySelectorAll('.sw,.pct'), function(x){return x.offsetParent!==null;});
    var tail = ext.length ? ext[0].getBoundingClientRect() : cr;
    if (ext.length && ext[0].className === 'sw') sws.push(Math.round(tail.width)+'x'+Math.round(tail.height));
    rows.push({ id:c.id||'', typ:c.tagName.toLowerCase()+(c.type?':'+c.type:''),
      isSwitch: c.type === 'checkbox',
      below: Math.round(cr.top) - Math.round(lr.bottom),
      labAbove: lr.bottom <= cr.top + 1,
      sameRow: !(lr.bottom <= cr.top) && !(cr.bottom <= lr.top),
      left: Math.round(cr.left),
      tailSlack: Math.round(contentR - tail.right) });
  });
  var buckets={}, body=[];
  rows.forEach(function(r){ buckets[Math.round(r.left/10)] = 1; });
  rows.forEach(function(r){ if(!r.isSwitch) body.push(r); });   /* 开关是固定 44px 宽，本来就不该被拉满 */
  return { cols: cs.display==='grid' ? cs.gridTemplateColumns.split(' ').length : 1,
    n:rows.length, rows:rows, sws:sws, colCount:Object.keys(buckets).length,
    sameRowCount: rows.filter(function(r){return r.sameRow;}).length,
    labAboveCount: rows.filter(function(r){return r.labAbove;}).length,
    minBelow: body.reduce(function(m,r){return Math.min(m,r.below);}, 9999),
    maxBelow: body.reduce(function(m,r){return Math.max(m,r.below);}, -9999),
    tailMin: body.reduce(function(m,r){return Math.min(m,r.tailSlack);}, 9999),
    tailMax: body.reduce(function(m,r){return Math.max(m,r.tailSlack);}, -9999) };
})`;
/* 读一组控件当前值（⚠️ 字符串拼接，别再写成函数源码参与 + 拼接） */
const VALS = ids => `(function(){var o={};${JSON.stringify(ids)}.forEach(function(id){
  var e=document.getElementById(id); if(!e){o[id]='MISS';return;} o[id]=(e.type==='checkbox')?e.checked:e.value;});return o;})()`;

const DST = ['assDstSize', 'assDstColor', 'assDstBold', 'assDstOutline', 'assDstEdge', 'assDstEdgeAlpha', 'assDstMV', 'assDstFont', 'assDstSpacing'];
const SRC = ['assSrcSize', 'assSrcColor', 'assSrcOutline', 'assSrcMV'];
const VDST = ['mVttSize', 'mVttColor', 'mVttBgOn', 'mVttBgAlpha', 'mVttShadowOn', 'mVttShadowW', 'mVttLine', 'mVttWidth', 'mVttLH'];
const VSRC = ['mVttSrcSize', 'mVttSrcColor', 'mVttSrcBgAlpha'];

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
    if (r.exceptionDetails) throw new Error((r.exceptionDetails.exception || {}).description || r.exceptionDetails.text); return r.result.value; };
  await send('Page.enable'); await send('Runtime.enable');
  await send('Network.setCacheDisabled', { cacheDisabled: true });
  await send('Emulation.setDeviceMetricsOverride', { width: 1320, height: 1200, deviceScaleFactor: 1, mobile: false });
  await send('Page.navigate', { url: BASE + '/merge.html' });
  await wait(2600);
  const step = s => ev(s);
  const setMode = m => `document.querySelector('#modeTabs input[name=workMode][value=${JSON.stringify(m)}]').click();`;
  const load = (side, text, name) => `loadSide('${side}', decodeURIComponent(escape(atob(${JSON.stringify(b64(text))}))), ${JSON.stringify(name)});`;
  const fmt = f => `setFmtSilently(${JSON.stringify(f)});`;
  const seq = async arr => { await step('endDemo();'); for (const s of arr) await step(s); };
  const segVals = async selId => ev(`Array.prototype.map.call(document.querySelectorAll(${JSON.stringify('#' + selId + ' .segbtn')}), function(b){return b.getAttribute('data-v');}).join(',')`);
  const clickSeg = (selId, val) => `document.querySelector(${JSON.stringify('#' + selId + ' .segbtn[data-v=' + val + ']')}).click();`;
  const onSeg = async selId => ev(`(document.querySelector(${JSON.stringify('#' + selId + ' .segbtn.on')})||{getAttribute:function(){return 'NONE'}}).getAttribute('data-v')`);
  const uniq = arr => arr.filter((x, i, s) => s.indexOf(x) === i);
  const dump = m => '  量到 -> cols=' + m.cols + ' n=' + m.n + ' 竖线数=' + m.colCount + ' 标签在上=' + m.labAboveCount + '/' + m.n +
    ' 同行=' + m.sameRowCount + ' 标签间距=' + m.minBelow + '~' + m.maxBelow + ' 右余量=' + m.tailMin + '~' + m.tailMax + ' sw=' + JSON.stringify(m.sws);

  /* ───────── ① 单语 ASS 面板：方案 A 布局 ───────── */
  console.log('【单语 · ASS 面板：标签在上 / 控件铺满】');
  await seq([load('src', ZH, 'clip.srt'), setMode('mono'), 'doMono();', fmt('split'), `document.getElementById('assPanel').open = true;`]);
  const a = await ev(LAYOUT + `('#assDstCol')`);
  console.log(dump(a));
  ok(!a.err && a.cols === 2, '栏内是 2 列网格（双语是一列）', a.err || a.cols);
  ok(a.sameRowCount === 0 && a.labAboveCount === a.n, '标签全部移到控件正上方（266 是标签贴左、控件同行）', a.sameRowCount + ' 个仍同行');
  /* range 行的极值是 13px（range 自带内边距把轨道往下推了一点点），仍是「紧贴」的观感 */
  ok(a.minBelow >= 0 && a.maxBelow <= 14, '标签紧贴自己那个控件（间距 0~14px），不会跟隔壁串', a.minBelow + '~' + a.maxBelow);
  ok(a.colCount === 2, '控件左边界只有两个取值 = 纵向两条整齐竖线', JSON.stringify(uniq(a.rows.map(r => r.left))));
  ok(a.tailMin === 0 && a.tailMax === 0, '每行最右元素都收在同一条右边界（色块行不再比纯控件行凸 8px）', a.tailMin + '~' + a.tailMax);
  ok(a.sws.length > 0 && a.sws.every(s => s === '26x26'), '色块统一 26×26 方块（双语那边仍 16×16，互不影响）', JSON.stringify(a.sws));
  const cb = await ev(`(function(){var c=document.getElementById('assDstBold');var r=c.getBoundingClientRect();
    return {w:Math.round(r.width),h:Math.round(r.height),app:getComputedStyle(c).webkitAppearance||getComputedStyle(c).appearance};})()`);
  console.log('  复选框 -> ' + JSON.stringify(cb));
  ok(cb.w === 44 && cb.h === 24, '复选框变 44×24 开关（双语仍是 16×16 原生框）', cb.w + 'x' + cb.h);
  ok(cb.app === 'none', '原生外观已卸掉', cb.app);
  /* 高度判「两列 vs 强行一列」的差 —— 绝对像素随容器浮动，没有意义 */
  const h2 = await ev(`Math.round(document.getElementById('assPanel').getBoundingClientRect().height)`);
  const h1 = await ev(`(function(){var st=document.createElement('style');
    st.textContent='.ass-cols.mono .ass-col{grid-template-columns:1fr!important}';
    document.head.appendChild(st);
    var h=Math.round(document.getElementById('assPanel').getBoundingClientRect().height);
    st.remove();return h;})()`);
  console.log('  面板高 -> 两列 ' + h2 + 'px / 强行一列 ' + h1 + 'px');
  ok(h2 < h1 - 100, '两列比一列竖排明显矮（同样 15 个字段）', h2 + ' vs ' + h1);

  console.log('\n【单语 · VTT「字幕行」同样受益】');
  await seq([fmt('vttStyle'), `document.getElementById('mVttPanel').open = true;`]);
  const b = await ev(LAYOUT + `('#mVttCols2 > .ass-col')`);
  console.log(dump(b));
  ok(b.cols === 2 && b.sameRowCount === 0, 'VTT 字幕行也是「标签在上 + 满格」', b.cols + '/' + b.sameRowCount);
  ok(b.tailMin === 0 && b.tailMax === 0, '右边界同样收成一条线', b.tailMin + '~' + b.tailMax);
  /* 「整条字幕」那组也要一起重排 —— 它和「字幕行」同屏并排，只改一组就是同一屏两种风格；
     ⚠️ 它没有 id（是第一个 .vtt-cols），所以判定容器靠 :not(.mono) 反查不成立，直接量它。 */
  const c = await ev(LAYOUT + `('#mVttPanel .vtt-cols:not(#mVttCols2) .ass-col')`);
  console.log(dump(c));
  ok(c.cols === 2 && c.sameRowCount === 0, '「整条字幕」那组同屏一并重排（否则上下一新一旧）', c.cols + '/' + c.sameRowCount);

  /* ───────── ② 单语 ASS 四套模板 ───────── */
  console.log('\n【单语 · ASS 四套模板（流媒体 / 无障碍 / 影院 / 社媒）】');
  await seq([fmt('split'), `document.getElementById('assPanel').open = true;`]);
  ok(await segVals('assTplSeg') === 'stream,a11y,cinema,social,custom', '模板排 = 五档（原「分屏/堆叠」在单语里是空选择，已撤）', await segVals('assTplSeg'));
  await step(clickSeg('assTplSeg', 'stream'));
  const baseSrc = await ev(VALS(SRC));
  const s0 = await ev(VALS(DST));
  console.log('  stream -> ' + JSON.stringify(s0));
  ok(s0.assDstSize === '56' && s0.assDstBold === true && s0.assDstOutline === '2.5' && s0.assDstMV === '42',
    'stream = 56 / 粗 / 2.5 描边 / MV42（与双语 split 主行一致 → 零迁移成本）', JSON.stringify(s0));
  ok(s0.assDstEdge === 'none', 'stream 不带底衬（Netflix/BBC 通用口径）', s0.assDstEdge);

  await step(clickSeg('assTplSeg', 'a11y'));
  const s1 = await ev(VALS(DST));
  console.log('  a11y   -> ' + JSON.stringify(s1));
  ok(s1.assDstSize === '60' && s1.assDstEdge === 'box' && s1.assDstEdgeAlpha === '85' && s1.assDstMV === '50',
    'a11y = 60 / 黑底衬 85%（≈21:1，过 WCAG AAA）/ MV50', JSON.stringify(s1));
  ok(await onSeg('assTplSeg') === 'a11y', '高亮跟着当前档走', await onSeg('assTplSeg'));

  await step(clickSeg('assTplSeg', 'cinema'));
  const s2 = await ev(VALS(DST));
  console.log('  cinema -> ' + JSON.stringify(s2));
  ok(s2.assDstSize === '48' && String(s2.assDstColor).toUpperCase() === '#FFF6E5' && s2.assDstBold === false && s2.assDstMV === '30',
    'cinema = 48 / 暖白 / 不粗 / MV30（DCP 惯例）', JSON.stringify(s2));

  await step(clickSeg('assTplSeg', 'social'));
  const s3 = await ev(VALS(DST));
  console.log('  social -> ' + JSON.stringify(s3));
  ok(s3.assDstSize === '64' && s3.assDstMV === '240' && s3.assDstOutline === '3.5',
    'social = 64 / MV240（抬高让位底部 UI）/ 3.5 粗描边', JSON.stringify(s3));
  const srcNow = await ev(VALS(SRC));
  ok(JSON.stringify(srcNow) === JSON.stringify(baseSrc), '四档来回切，原文那半（assSrc*）一个没动', JSON.stringify(srcNow));

  await ev(`(function(){var e=document.getElementById('assDstSize');e.value='71';
    e.dispatchEvent(new Event('input',{bubbles:true}));e.dispatchEvent(new Event('change',{bubbles:true}));})()`);
  ok(await onSeg('assTplSeg') === 'custom', '手改任意参数自动跳「自定义」', await onSeg('assTplSeg'));
  await step(clickSeg('assTplSeg', 'social'));
  const s4 = await ev(VALS(DST));
  ok(s4.assDstSize === '64' && s4.assDstMV === '240', '从自定义点回某一档能复位（不是「改过就再也套不回来」）', JSON.stringify(s4));

  /* ───────── ③ 单语预览只画一行 ───────── */
  console.log('\n【单语 · 预览不再凭空画「原文行」】');
  await step('renderPv();');
  const pv = await ev(`(function(){var l1=document.getElementById('assPvLine1'),l2=document.getElementById('assPvLine2');
    return {l1:(l1.textContent||'').trim(), l2d:getComputedStyle(l2).display, tag:(document.getElementById('pvTag')||{}).textContent};})()`);
  console.log('  预览 -> ' + JSON.stringify(pv));
  ok(pv.l1.indexOf('第一行原文') >= 0, '第一行 = 真实字幕（266 时是 "Hello there, this is a sample line"）', pv.l1);
  ok(pv.l2d === 'none', '第二行隐掉（单语没有第二语言的余地）', pv.l2d);
  ok(String(pv.tag).indexOf('社媒竖屏') >= 0, '角标跟着当前模板走', pv.tag);

  /* ───────── ④ 单语 VTT 四套模板 ───────── */
  console.log('\n【单语 · VTT 四套模板】');
  await seq([fmt('vttStyle'), `document.getElementById('mVttPanel').open = true;`]);
  ok(await segVals('mVttPresetSeg') === 'm-stream,m-a11y,m-cinema,m-social,custom', 'VTT 那一排同构（双语那份一字未动）', await segVals('mVttPresetSeg'));
  await step(clickSeg('mVttPresetSeg', 'm-stream'));
  const baseVSrc = await ev(VALS(VSRC));
  const v0 = await ev(VALS(VDST));
  console.log('  m-stream -> ' + JSON.stringify(v0));
  ok(v0.mVttSize === '100' && v0.mVttLine === '90' && v0.mVttWidth === '80' && v0.mVttBgAlpha === '55',
    'm-stream = 100% / line90 / width80（90% 水平安全区）/ 底衬 55%', JSON.stringify(v0));
  await step(clickSeg('mVttPresetSeg', 'm-a11y'));
  const v1 = await ev(VALS(VDST));
  console.log('  m-a11y   -> ' + JSON.stringify(v1));
  ok(v1.mVttSize === '108' && v1.mVttBgAlpha === '85' && v1.mVttShadowOn === false,
    'm-a11y = 108% / 底衬 85% / 关阴影（整块衬底，不跟描边打架）', JSON.stringify(v1));
  await step(clickSeg('mVttPresetSeg', 'm-cinema'));
  const v2 = await ev(VALS(VDST));
  console.log('  m-cinema -> ' + JSON.stringify(v2));
  ok(v2.mVttSize === '92' && String(v2.mVttColor).toUpperCase() === '#FFF6E5' && v2.mVttBgOn === false && v2.mVttShadowW === '3',
    'm-cinema = 92% / 暖白 / 无底衬只靠阴影', JSON.stringify(v2));
  await step(clickSeg('mVttPresetSeg', 'm-social'));
  const v3 = await ev(VALS(VDST));
  console.log('  m-social -> ' + JSON.stringify(v3));
  ok(v3.mVttSize === '115' && v3.mVttLine === '72' && v3.mVttWidth === '72',
    'm-social = 115% / line72（抬高躲评论区）/ width72', JSON.stringify(v3));
  ok(JSON.stringify(await ev(VALS(VSRC))) === JSON.stringify(baseVSrc), 'mVttSrc*（原文行）一个没动', JSON.stringify(await ev(VALS(VSRC))));
  const tips = [];
  for (const k of ['m-stream', 'm-a11y', 'm-cinema', 'm-social']) {
    await step(clickSeg('mVttPresetSeg', k));
    tips.push(String(await ev(`(document.getElementById('mVttPresetHint')||{getAttribute:function(){return ''}}).getAttribute('data-tip')||''`)));
  }
  console.log('  ⓘ 出处 -> ' + JSON.stringify(tips.map(s => s.slice(0, 24))));
  ok(tips.every(s => s.length > 8) && new Set(tips).size === 4, '四档各有自己的 ⓘ 出处说明且互不相同', JSON.stringify(tips.map(s => s.slice(0, 16))));

  /* ───────── ⑤ 双语零改动 ───────── */
  console.log('\n【切回双语：一个像素都不动】');
  await seq([load('src', ZH, 'zh.srt'), load('dst', EN, 'en.srt'), setMode('merge'), 'doMerge();', fmt('split'), `document.getElementById('assPanel').open = true;`]);
  ok(await segVals('assTplSeg') === 'split,stack,custom', '双语 ASS 模板排恢复原样', await segVals('assTplSeg'));
  const e = await ev(LAYOUT + `('#assDstCol')`);
  console.log(dump(e));
  ok(e.cols === 1 && e.sameRowCount === e.n, '双语面板仍是「标签贴左 + 控件同行」的旧排布', e.cols + '/' + e.sameRowCount + '/' + e.n);
  /* 双语里 range 与 checkbox 各有 2~4px 的 UA 固有偏移（165/167/169），那是既有的老样子，不进判据 */
  ok(e.rows.filter(r => /number|text|select-one/.test(r.typ)).every(r => r.left === 165),
    '双语控件左边界仍统一落在标签之后（165px）', JSON.stringify(uniq(e.rows.map(r => r.left))));
  ok(e.sws.length === 0 || e.sws.every(s => s === '16x16'), '双语色块仍是 16×16（没被拉成 26）', JSON.stringify(e.sws));
  const vsz = await ev(VALS(['assDstSize']));
  ok(vsz.assDstSize === '56', '双语主行字号仍是 56', JSON.stringify(vsz));
  await seq([fmt('vttStyle'), `document.getElementById('mVttPanel').open = true;`]);
  ok(await segVals('mVttPresetSeg') === 'std,compact,cinema,custom', '双语 VTT 仍是原来的四档（cinema 没被单语那套顶掉）', await segVals('mVttPresetSeg'));
  ok(await ev(`document.querySelectorAll('#mVttPanel .vtt-cols.mono').length`) === 0,
    '双语下 VTT 那两组都没挂 mono（重排规则不会漏到双语）',
    await ev(`document.querySelectorAll('#mVttPanel .vtt-cols.mono').length`));
  ok(await ev(`document.querySelectorAll('#assCols.mono').length`) === 0, '双语下 ASS 栅格也没挂 mono');
  await step(clickSeg('mVttPresetSeg', 'cinema'));
  const vc = await ev(VALS(VDST));
  ok(vc.mVttSize === '115' && vc.mVttWidth === '84', '双语 cinema 仍是自己的参数（115% / width84）', JSON.stringify(vc));

  /* ───────── ⑥ 跨模式折算：单语点过模板后切回双语 ───────── */
  console.log('\n【跨模式折算：m-* 不许泄漏到双语】');
  await seq([load('src', ZH, 'clip.srt'), setMode('mono'), 'doMono();', fmt('vttStyle'), `document.getElementById('mVttPanel').open = true;`]);
  await step(clickSeg('mVttPresetSeg', 'm-stream'));
  ok(await ev(`vttPresetKey()`) === 'm-stream', '单语下档位停在 m-stream', await ev(`vttPresetKey()`));
  await seq([load('src', ZH, 'zh.srt'), load('dst', EN, 'en.srt'), setMode('merge'), 'doMerge();', fmt('vttStyle'), `document.getElementById('mVttPanel').open = true;`]);
  ok(await ev(`vttPresetKey()`) === 'std', '切回双语折算成 std（m-stream 与 std 主行参数等价）', await ev(`vttPresetKey()`));
  ok(String(await ev(`vttPresetLabel()`)) === '标准 · 底部双语', '模板名回到双语那套词（此前会串成「流媒体标准」）', await ev(`vttPresetLabel()`));
  ok(await onSeg('mVttPresetSeg') === 'std', '双语按钮排有且只有一个高亮（此前一个都不亮）', await onSeg('mVttPresetSeg'));
  /* m-a11y / m-social 在双语里没有等价物（双语每档都为原文行预留了值） */
  await seq([load('src', ZH, 'clip.srt'), setMode('mono'), 'doMono();', fmt('vttStyle'), `document.getElementById('mVttPanel').open = true;`]);
  await step(clickSeg('mVttPresetSeg', 'm-a11y'));
  await seq([load('src', ZH, 'zh.srt'), load('dst', EN, 'en.srt'), setMode('merge'), 'doMerge();', fmt('vttStyle'), `document.getElementById('mVttPanel').open = true;`]);
  ok(await ev(`vttPresetKey()`) === 'custom', 'm-a11y 没有等价双语档 → 落「自定义」，不冒充标准档', await ev(`vttPresetKey()`));
  ok(String(await ev(`document.getElementById('mVttPresetSel').value`)) === 'custom',
    'select 里写的也是双语认得的档（它是唯一状态源，写错就全套串）', await ev(`document.getElementById('mVttPresetSel').value`));

  /* ───────── ⑦ 窄屏回落 ───────── */
  console.log('\n【窄屏回落（620px）】');
  await send('Emulation.setDeviceMetricsOverride', { width: 620, height: 1200, deviceScaleFactor: 1, mobile: false });
  await seq([load('src', ZH, 'clip.srt'), setMode('mono'), 'doMono();', fmt('split'), `document.getElementById('assPanel').open = true;`]);
  await wait(400);
  const g = await ev(LAYOUT + `('#assDstCol')`);
  console.log(dump(g));
  ok(g.cols === 1 && g.sameRowCount === 0 && g.tailMax === 0, '窄屏回落单列，但仍保「标签在上 + 收同一条右边界」', JSON.stringify({ cols: g.cols, same: g.sameRowCount, tail: g.tailMin + '~' + g.tailMax }));

  ok(errs.length === 0, '全程零 JS 异常', errs.slice(0, 2).join(' | '));
  console.log(NL + '总计：' + PASS + ' 通过 / ' + FAIL + ' 失败');
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error('脚本出错：', e.message); process.exit(2); });
