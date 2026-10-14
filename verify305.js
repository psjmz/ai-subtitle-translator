/* v0.9.305 核验：DIR 环境变量可指本地预演，线上直接跑（默认 /opt 路径）
   本版内容：形态 B（两条同轴的双语）在「逐条微调」里的呈现 ——
             ① 一对在列表里串成一组（.pg，左边一道竖线），两条各自保留独立时间框
                （用户拍板：分开调，保留自己定原文/译文时间轴的自由）
             ② 修真 bug：applyOps 的 split 守卫只挡了形态 A（isBilingualCue），形态 B 漏网
                —— 原文被切开、译文留在原地，一对就这么散了（实测多报 1 overlap + 1 short）
             ③ 两条被调开时明说后果（.pnote）+ 给「对齐」按钮（成组两个 set op，取并集）
             ④ 合并按钮文案在配对上改成「合并为一条」，明说这是 B→A 的形态转换
             ⑤ 回归：304 体检口径 / 303 双语对 / 单语老行为 */
var fs = require('fs');
var R = f => fs.readFileSync(process.env.DIR ? process.env.DIR + '/' + f : '/opt/srt-translator/' + f, 'utf8');
var items = [];
var chk = (name, actual, expect) => items.push([name, actual, expect]);
var has = (f, re) => re.test(R(f));
var Vp = '0\\.9\\.305';

/* ---- 版号：十页 ---- */
chk('index 顶栏版号', has('index.html', new RegExp('class="ver">v' + Vp)), true);
chk('index site-i18n bust', has('index.html', new RegExp('site-i18n\\.js\\?v=' + Vp)), true);
chk('translate 页脚版号', has('translate.html', new RegExp('ver-tag">v' + Vp)), true);
chk('translate srt-core bust', has('translate.html', new RegExp('srt-core\\.js\\?v=' + Vp)), true);
chk('translate site-i18n bust', has('translate.html', new RegExp('site-i18n\\.js\\?v=' + Vp)), true);
chk('merge 顶栏版号', has('merge.html', new RegExp('class="ver">v' + Vp)), true);
chk('merge merge-core bust', has('merge.html', new RegExp('merge-core\\.js\\?v=' + Vp)), true);
/* ⚠️ shift-core.js 与 shift-i18n.js 本版都改了 —— 两个 ?v= 必须跟着走，
      否则线上还吃旧缓存，改了跟没改一样（静态核验照绿） */
chk('shift-core bust（本版改了引擎）', has('shift.html', new RegExp('shift-core\\.js\\?v=' + Vp)), true);
chk('shift-i18n bust（本版加了三条词条）', has('shift.html', new RegExp('shift-i18n\\.js\\?v=' + Vp)), true);
['clean.html', 'convert.html', 'bilingual.html', 'repair.html', 'extract.html', 'glossary.html']
  .forEach(f => chk(f + ' 带 305 版本号', has(f, new RegExp('\\?v=' + Vp)), true));
chk('glossary 引擎 bust', has('glossary.html', new RegExp('glossary-core\\.js\\?v=' + Vp)), true);

/* ---- 本版：引擎新增的三个入口 ---- */
var SC = R('shift-core.js');
chk('定义了 unalignedPair', /function unalignedPair\s*\(/.test(SC), true);
chk('定义了 alignOps', /function alignOps\s*\(/.test(SC), true);
chk('定义了 isPairGroup（列表分组判据）', /function isPairGroup\s*\(/.test(SC), true);
/* ⚠️ 本版修的真 bug：split 守卫原来是 isBilingualCue（只挡形态 A），
   304 统一口径后必须换成 isBilingualEntry（A 和 B 一起挡） */
chk('split 守卫用 isBilingualEntry（不是只挡形态 A）',
  /if \(isBilingualEntry\(list, i\)\) return;/.test(SC), true);
chk('split 守卫没退回 isBilingualCue', /if \(isBilingualCue\(src\)\) return;/.test(SC), false);
/* 两道闸门：只认「被调开的一对」，不认正常流水 */
chk('不同轴判据要求时间重叠（ov > 0）', /if \(ov <= 0\) continue;/.test(SC), true);
chk('不同轴判据要求重叠占七成以上', /var PAIR_OV = 0\.7;/.test(SC), true);
chk('三个新函数都挂到出口', /unalignedPair: unalignedPair,/.test(SC)
  && /alignOps: alignOps,/.test(SC) && /isPairGroup: isPairGroup,/.test(SC), true);

/* ---- 本版：页面 ---- */
var SH = R('shift.html');
chk('有配对组样式 .pg', /\.pg\{/.test(SH), true);
chk('renderList 用 isPairGroup 分组', /isPairGroup\(list, i\)/.test(SH), true);
chk('一组整组渲染（i += 2）', /html \+= pairHtml\(list, i, i \+ 1\); i \+= 2/.test(SH), true);
chk('两条各自有独立的起点输入框（自由还在）', /data-s="' \+ i \+ '"/.test(SH), true);
chk('两条各自有独立的终点输入框（自由还在）', /data-e="' \+ i \+ '"/.test(SH), true);
chk('有不同轴提示行样式 .pnote', /\.pnote\{/.test(SH), true);
chk('提示行文案走词典', /tpl\('msgUnalign'/.test(SH), true);
chk('有对齐按钮绑定', /data-align="' \+ i \+ '"/.test(SH), true);
chk('对齐走引擎 alignOps', /C\.alignOps\(S\.work, i\)/.test(SH), true);
chk('alignOps 返回空时不硬推', /if \(ops\) pushOp\(ops\)/.test(SH), true);
chk('提示行用 warn 不用 del', /\.pnote\{[^}]*--warn-weak/.test(SH), true);
/* 双语条目不给切分按钮 —— 摆出来点不动，看着像坏了 */
chk('双语条目不摆切分按钮', /if \(!C\.isBilingualEntry\(list, i\)\) \{/.test(SH), true);
/* 一对的后一条不给合并按钮：它下面接的是下一句原文，跨句拼起来没有意义 */
chk('拦住一对后一条的跨句合并', /isBilingualMate\(list, i\)/.test(SH), true);
chk('配对上用「合并为一条」文案', /data-merge="' \+ i \+ '">' \+ esc\(t\('btnMergeOne'\)\)/.test(SH), true);

/* ---- 本版：三条新词条 27 语齐全 ---- */
var vm = require('vm');
var b3 = { window: {}, console: console };
b3.globalThis = b3; b3.global = b3;
vm.createContext(b3);
vm.runInContext(R('shift-i18n.js'), b3, { filename: 'shift-i18n.js' });
var SI = b3.window.SHIFT_I18N;
chk('shift-i18n 读出 27 语', SI.LANGS.length, 27);
var miss = 0, noPh = 0, hanBad = 0;
var RE_HAN = /[\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF]/;
SI.LANGS.forEach(function (p) {
  var l = p[0], d = SI.DICT[l];
  ['btnMergeOne', 'btnAlign', 'msgUnalign'].forEach(function (k) {
    var v = d[k];
    if (typeof v !== 'string' || !v) miss++;
    else {
      if (k === 'msgUnalign' && v.indexOf('{0}') < 0) noPh++;
      if (!/^(zh-CN|zh-TW|ja)$/.test(l) && RE_HAN.test(v)) hanBad++;
    }
  });
  /* 老词条不能被注入脚本挤掉 */
  ['btnMergeNext', 'btnSplit', 'btnUndo', 'chkBil'].forEach(function (k) {
    if (!d[k]) miss++;
  });
});
chk('新词条 + 老词条缺条 0', miss, 0);
chk('msgUnalign 占位符齐全', noPh, 0);
chk('非中日韩不混汉字', hanBad, 0);

/* ---- 行为验证：静态字符串全对也可能跑歪，直接把引擎拉起来跑一遍 ---- */
var b2 = { window: {}, console: console };
b2.globalThis = b2; b2.global = b2;
vm.createContext(b2);
vm.runInContext(R('shift-core.js'), b2, { filename: 'shift-core.js' });
var E = b2.window.ShiftCore;
var mk = a => a.map(p => ({ start: p[0], end: p[1], text: p[2] }));
var RB = E.uiRules({}, 'srt');
var mkB = function (s0, e0, x, y) { return mk([[s0, e0, x], [s0, e0, y]]); };
var mkA = function (s0, e0, x, y) { return mk([[s0, e0, x + '\n' + y]]); };

/* ① 配对不许切 —— 本版修的真 bug */
var pb = mkB(1000, 2800, 'Hello world', '你好世界');
chk('行为：形态 B 的原文切不动', E.applyOps(pb, [{ op: 'split', i: 0 }]).length, 2);
chk('行为：形态 B 的译文切不动', E.applyOps(pb, [{ op: 'split', i: 1 }]).length, 2);
chk('行为：形态 A 仍然切不动（304 的护栏没改坏）',
  E.applyOps(mkA(1000, 2800, 'Hello world', '你好世界'), [{ op: 'split', i: 0 }]).length, 1);
chk('行为：普通单语照样能切',
  E.applyOps(mk([[0, 3000, 'First half of a long sentence here'], [3100, 6000, 'Second half here']]),
    [{ op: 'split', i: 0 }]).length >= 3, true);

/* ② 不同轴判定 */
chk('行为：同轴的一对不报不同轴', E.unalignedPair(pb, 0), null);
var off = mk([[1000, 3100, 'Hello world'], [1000, 2800, '你好世界']]);
var u = E.unalignedPair(off, 0);
chk('行为：调开 300ms 报出伙伴 j=1', u && u.j, 1);
chk('行为：偏差报 300ms', u && u.off, 300);
chk('行为：从译文那侧也查得到', !!E.unalignedPair(off, 1), true);
chk('行为：首尾相接的中英流水不报',
  E.unalignedPair(mk([[0, 2000, 'First sentence in english'], [2000, 4000, '第二句话']]), 0), null);
chk('行为：只重叠一半的不报（各说各的）',
  E.unalignedPair(mk([[0, 5000, 'A long english narration'], [4000, 6000, '中文解说']]), 0), null);
chk('行为：同语言同轴不报（归 overlap 管）',
  E.unalignedPair(mk([[0, 3000, 'English line'], [0, 2500, 'Another english line']]), 0), null);

/* ③ 对齐取并集 */
var ops = E.alignOps(off, 0);
chk('行为：alignOps 返回一组两个 op', ops && ops.length, 2);
chk('行为：两个 op 都是 set', ops[0].op === 'set' && ops[1].op === 'set', true);
var fixed = E.applyOps(off, ops);
chk('行为：对齐后两条起点相同', fixed[0].start === fixed[1].start, true);
chk('行为：对齐后两条终点相同', fixed[0].end === fixed[1].end, true);
chk('行为：终点取并集 3100（不截短）', fixed[0].end, 3100);
chk('行为：对齐后重新被认成一对', E.isBilingualPair(fixed[0], fixed[1]), true);
chk('行为：对齐后不再报不同轴', E.unalignedPair(fixed, 0), null);
chk('行为：对齐后这一对自身体检 0 条', E.checkCues(fixed, RB).length, 0);
chk('行为：对齐前确实报了（被调开）', E.checkCues(off, RB).length >= 1, true);

/* ④ 分组：被调开仍算一组 —— 一调开就散的话，界面反而看不见了 */
chk('行为：同轴的一对算一组', E.isPairGroup(pb, 0), true);
chk('行为：被调开的一对仍算一组', E.isPairGroup(off, 0), true);
chk('行为：组里第二条不再领一个组', E.isPairGroup(pb, 1), false);
chk('行为：正常流水不算一组',
  E.isPairGroup(mk([[0, 2000, 'First sentence'], [2000, 4000, '第二句话']]), 0), false);

/* ⑤ 回归：304 口径 / 303 双语对 / 单语老行为一条没松 */
var cdiff = 0;
[['停留太短', 1000, 1500, 'Hello world', '你好世界'],
 ['停留太久', 1000, 13000, 'This is a very long English sentence', '这是一句非常长的中文'],
 ['一行太宽', 1000, 4000, 'This sentence is quite long and will overflow the line width', '这句话有点长']
].forEach(function (c) {
  cdiff += E.checkCues(mkA(c[1], c[2], c[3], c[4]), RB).length;
  cdiff += E.checkCues(mkB(c[1], c[2], c[3], c[4]), RB).length;
});
chk('回归：形态 A 与形态 B 结论一致（六组全 0）', cdiff, 0);
chk('回归：303 双语对 0 重叠', E.checkCues(mkB(1000, 3000, 'Hello world', '你好世界'), RB)
  .filter(x => x.why.indexOf('overlap') >= 0).length, 0);
chk('回归：同轴的两条英文照报停留太短',
  E.checkCues(mk([[1000, 1300, 'Hello'], [1000, 1300, 'World']]), RB)
    .filter(x => x.why.indexOf('short') >= 0).length, 2);
chk('回归：双语处数统计 1+1+2',
  E.bilingualCount(mkA(1000, 3000, 'Hello', '你好'))
  + E.bilingualCount(mkB(1000, 3000, 'Hello', '你好'))
  + E.bilingualCount(mk([[1000, 3000, 'Hello'], [1000, 3000, '你好'],
    [4000, 6000, 'Bye'], [4000, 6000, '再见']])), 4);
chk('回归：形态 B 两条都被认成双语条目',
  E.isBilingualEntry(pb, 0) && E.isBilingualEntry(pb, 1), true);

/* ---- 汇总 ---- */
var bad = 0;
items.forEach(function (it) {
  var good = it[1] === it[2];
  if (!good) bad++;
  console.log((good ? 'OK   ' : 'MISS ') + it[0]
    + (good ? '' : '   actual=' + JSON.stringify(it[1]) + ' expect=' + JSON.stringify(it[2])));
});
console.log('\nverify305: ' + (items.length - bad) + '/' + items.length + ' OK, bad=' + bad);
