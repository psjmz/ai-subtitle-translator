/* v0.9.266 实测：单语面板的字段排布（栏内 2 列 + 控件右边界对齐）
   背景：单语收掉原文那栏后栏宽 339 → 700px，字段仍一列竖着堆，
        一行只用到 181px，右侧 528px（3/4）纯空白 —— 用户 2026-10-10 报「超级难看」。
   ⚠️ 量 DOM 不量 CSS 文本：断言「每列里所有字段的控件右边界对齐成一条竖线」，
      这比 grep 一句 grid-template-columns 有意义得多。 */
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

/* 量一栏：列数 / 字段是否铺满列宽 / 控件右边界有没有贴住列右边界（= 对齐成一条竖线）
   ⚠️ 判据用 gapRight（字段行右边界 − 最后一个控件的右边界）：
      「字段行铺满列宽」是 trivial 的（.af 是块级，永远铺满），真正要量的是**控件贴不贴右**。
   双语：label 固定 88px、控件紧跟标签 → gapRight 100~220（右边一片空）
   单语网格：label 撑开、控件贴右 → gapRight ≈ 6（= .af 的 padding-right） */
const MEASURE = `(function(colSel){
  var col = document.querySelector(colSel); if(!col) return {err:'MISS'};
  var cs = getComputedStyle(col);
  var afs = Array.prototype.filter.call(col.querySelectorAll(':scope > .af'), function(a){ return a.offsetParent !== null; });
  if (!afs.length) return {err:'NO_FIELDS'};
  var cols = cs.display === 'grid' ? cs.gridTemplateColumns.split(' ').length : 1;
  var w = Math.round(col.getBoundingClientRect().width);
  var gaps = [], labs = [], byCol = {};
  afs.forEach(function(a){
    var r = a.getBoundingClientRect();
    var kids = Array.prototype.filter.call(a.children, function(c){ return c.offsetParent !== null; });
    var last = kids[kids.length - 1].getBoundingClientRect();
    var g = Math.round(r.right) - Math.round(last.right);
    gaps.push(g);
    labs.push(Math.round(a.querySelector('label').getBoundingClientRect().width));
    var key = Math.round(r.left / 10);
    (byCol[key] = byCol[key] || []).push(g);
  });
  var groups = Object.keys(byCol).map(function(k){ return byCol[k]; });
  var spread = groups.map(function(g){ return Math.max.apply(null, g) - Math.min.apply(null, g); });
  return {cols: cols, colW: w, fields: afs.length, groups: groups.length,
          gapMin: Math.min.apply(null, gaps), gapMax: Math.max.apply(null, gaps),
          gapSpread: Math.max.apply(null, gaps) - Math.min.apply(null, gaps),
          labMin: Math.min.apply(null, labs), labMax: Math.max.apply(null, labs),
          colSpread: Math.max.apply(null, spread), spreads: spread.join(',')};
})`;

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

  console.log('【单语 · ASS 面板：字段在栏内排 2 列】');
  await seq([load('src', ZH, 'clip.srt'), setMode('mono'), 'doMono();', fmt('split'), `document.getElementById('assPanel').open = true;`]);
  const a = await ev(MEASURE + `('#assDstCol')`);
  console.log('     量到：' + JSON.stringify(a));
  ok(!a.err, 'ASS 那一栏能量到字段', a.err);
  ok(a.cols === 2, '栏内是 2 列网格（此前是 1 列竖直堆）', a.cols);
  ok(a.groups === 2, '字段真的落在两列里', a.groups);
  /* 控件贴住列右边界（留 .af 的 6px padding）—— 这就是「不再只用到左边 181px」的硬指标 */
  ok(a.gapMin === a.gapMax && a.gapMax <= 8, '每个字段的控件都贴住列右边界（此前 gapRight≈152）', a.gapMin + '~' + a.gapMax);
  /* label 撑开吃掉了原先空在右边的那片空白（88px → 136~293px），文字仍左对齐 */
  ok(a.labMin > 120, '标签被撑开、空白挪到标签侧', a.labMin + '~' + a.labMax);
  /* 同一列里所有字段的「贴右余量」必须完全一致 = 视觉上一条竖线 */
  ok(a.colSpread === 0, '每列内控件右边界严格对齐成一条竖线', a.spreads);
  const panelH = await ev(`Math.round(document.getElementById('assPanel').getBoundingClientRect().height)`);
  ok(panelH < 860, 'ASS 面板高度比「一列竖直」时（962px）明显变矮', panelH);

  console.log('\n【单语 · VTT「字幕行」】');
  await seq([fmt('vttStyle'), `document.getElementById('mVttPanel').open = true;`]);
  const b = await ev(MEASURE + `('#mVttCols2 > .ass-col')`);
  console.log('     量到：' + JSON.stringify(b));
  ok(!b.err && b.cols === 2, 'VTT 字幕行也是 2 列网格', b.cols);
  ok(b.groups === 2, '字段真的落在两列里', b.groups);
  ok(b.gapMin === b.gapMax && b.gapMax <= 8, '每个字段的控件都贴住列右边界', b.gapMin + '~' + b.gapMax);
  ok(b.colSpread === 0, '每列内控件右边界严格对齐', b.spreads);
  /* 「整条字幕」那组是另一个 .vtt-cols（不带 .mono）—— 它必须保持原样，别被一起改了 */
  const c = await ev(MEASURE + `('#mVttPanel .vtt-cols:not(.mono) .ass-col')`);
  /* 判据是「标签有没有被撑开」：仍是固定 88px = 没被 mono 规则命中（gapRight 会因控件类型在 68~152 间变，
     那是双语下的既有表现，不是错） */
  ok(c.cols === 1 && c.labMin === 88 && c.labMax === 88, '「整条字幕」那组不受影响（标签仍固定 88px、没被撑开）', JSON.stringify(c));

  console.log('\n【单语 · 折行边距那行跟着对齐】');
  await seq([fmt('split'), `document.getElementById('assPanel').open = true;`]);   /* ⚠️ 上面切到了 VTT，ASS 面板此刻是 display:none，量不到 */
  const d = await ev(MEASURE + `('.mg-row')`);
  console.log('     量到：' + JSON.stringify(d));
  ok(d.gapMin === d.gapMax && d.gapMax <= 8, '左右边距的控件也贴住各自那格右边界', d.gapMin + '~' + d.gapMax);
  const dg = await ev(`getComputedStyle(document.querySelector('.ass-cols.mono .ass-col')).columnGap + ' / ' + getComputedStyle(document.querySelector('.mg-row')).columnGap`);
  ok(dg.split(' / ')[0] === dg.split(' / ')[1], '两处栏距相同（否则竖线错开 2px）', dg);

  console.log('\n【切回双语：一个像素都不动】');
  await seq([load('src', ZH, 'zh.srt'), load('dst', EN, 'en.srt'), setMode('merge'), 'doMerge();', fmt('split'), `document.getElementById('assPanel').open = true;`]);
  const e = await ev(MEASURE + `('#assDstCol')`);
  console.log('     量到：' + JSON.stringify(e));
  ok(e.cols === 1, '双语下 ASS 栏回到「一列竖直」（沿用旧排布）', e.cols);
  ok(e.gapMin > 50, '双语下控件仍紧跟标签（右边留白照旧，没被拉宽）', e.gapMin + '~' + e.gapMax);
  ok(e.labMin === e.labMax, '双语下标签仍是固定 88px', e.labMin + '~' + e.labMax);
  await seq([fmt('vttStyle'), `document.getElementById('mVttPanel').open = true;`]);
  const f = await ev(MEASURE + `('#mVttCols2 > .ass-col')`);
  ok(f.cols === 1, '双语下 VTT 字幕行栏也回到一列', f.cols);

  console.log('\n【窄屏回落（620px）】');
  await send('Emulation.setDeviceMetricsOverride', { width: 620, height: 1200, deviceScaleFactor: 1, mobile: false });
  await seq([load('src', ZH, 'clip.srt'), setMode('mono'), 'doMono();', fmt('split'), `document.getElementById('assPanel').open = true;`]);
  await wait(400);
  const g = await ev(MEASURE + `('#assDstCol')`);
  console.log('     量到：' + JSON.stringify(g));
  ok(g.cols === 1, '窄屏下回落单列（2 列会把控件挤没）', g.cols);

  ok(errs.length === 0, '全程零 JS 异常', errs.slice(0, 2).join(' | '));
  console.log(NL + '总计：' + PASS + ' 通过 / ' + FAIL + ' 失败');
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error('脚本出错：', e.message); process.exit(2); });
