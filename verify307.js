/* v0.9.307 核验：DIR 环境变量可指本地预演，线上直接跑（默认 /opt 路径）
   本版（307）：用户说「横屏、竖屏的按钮应该明显点，放在前面，而且后面的参数应该联动起来，
              并且应该增加注释，说明这是基于什么来定的」。体检参数行重排 ——
             ⑧ 画面方向从行尾挪到**最前**，做成两格分段控件（选中格实心主色）：原先是行尾
                一个灰底小 chip，用户看不出来、也想不到它会改变什么
             ⑨ 单行字数跟着方向联动：竖屏显示 21 × 0.6 = 13，框旁标 ×0.6；
                改竖屏的值会**反算回基线**（20 → 基线 33），来回切方向不掉精度。
                换算收进引擎一处（uiLineOut / uiLineIn），页面自己不乘 0.6
             ⑩ 参数下面加依据注释（rlNote ×27 语）：默认值取自 Netflix 字幕规范
                （停留 0.833–7 秒 / 读速 ≤9 字每秒 / 单行 ≤21 字＝拉丁 42 字符），
                以及为什么只有行宽跟方向走（停留与读速跟画面横竖无关）
             ⑪ 顺带：最短停留框 78px 装不下「0.833」被截成「0.8」→ 加宽到 92px
             以下 ⑥⑦ 为 306 内容、①-⑤ 为 305 内容（均保留回归）：305 上线后用户实测
             「一道竖线串成一组，我没看出来」→ 配对可见性重做（色带 + 4px 左条 + 组间间隙）
             + 按钮护栏改成按 role 判定；再往前是形态 B（两条同轴双语）在「逐条微调」里的
             呈现（分开调 + 结构看得见 + 后果可修回）。 */
var fs = require('fs');
var R = f => fs.readFileSync(process.env.DIR ? process.env.DIR + '/' + f : '/opt/srt-translator/' + f, 'utf8');
var items = [];
var chk = (name, actual, expect) => items.push([name, actual, expect]);
var has = (f, re) => re.test(R(f));
var Vp = '0\\.9\\.307';

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
  .forEach(f => chk(f + ' 带新版本号', has(f, new RegExp('\\?v=' + Vp)), true));
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
/* ---- 306：护栏一律看 role，不许现算「当前还算不算一对」 ----
   ⚠️ 305 的写法（后一条传 mate=-1，靠 isBilingualMate/isBilingualEntry 现判）有个坑：
      两条一被调开超过 120ms，配对关系立刻不成立，护栏集体失效 ——
      译文行冒出「合并下一条」（点下去跨句拼的是下一句的原文）和「切分」
      （引擎 isBilingualEntry 拦着，点了没反应，看着像坏了）。恰恰是最该拦住的时候。 */
chk('rowHtml 第三参数是 role（-1/0/1）', /function rowHtml\(list, i, role\) \{/.test(SH), true);
chk('切分护栏挂在 role 上（不现算配对）', /if \(role < 0 && !C\.isBilingualEntry\(list, i\)\) \{/.test(SH), true);
chk('合并护栏挂在 role 上（不现算配对）', /else if \(role < 0 && !C\.isBilingualMate\(list, i\)\) \{/.test(SH), true);
chk('组头 role=0 / 组尾 role=1', /rowHtml\(list, i, 0\) \+ rowHtml\(list, mate, 1\)/.test(SH), true);
chk('独立行走 role=-1', /rowHtml\(list, i, -1\)/.test(SH), true);
chk('旧的无条件 isBilingualEntry 直判已退场', /if \(!C\.isBilingualEntry\(list, i\)\) \{/.test(SH), false);
/* 一对的后一条不给合并按钮：它下面接的是下一句原文，跨句拼起来没有意义 */
chk('组尾靠 role 拦跨句合并（isBilingualMate 只留给独立行）', /isBilingualMate\(list, i\)/.test(SH), true);

/* ---- 306：配对可见性（305 那道淡紫竖线用户「没看出来」） ---- */
chk('整对铺淡靛蓝色带', /\.pg\{[^}]*background:var\(--acc-weak\)/.test(SH), true);
chk('左条是 4px 实心主色（不是淡 --acc-line）', /\.pg\{[^}]*border-left:4px solid var\(--acc\)/.test(SH), true);
chk('左条已不再是 3px --acc-line', /border-left:3px solid var\(--acc-line\)/.test(SH), false);
chk('色带圆角收口', /\.pg\{[^}]*border-radius:9px 0 0 9px/.test(SH), true);
chk('行背景透明，让色带透出来', /\.pg \.li\{background:transparent\}/.test(SH), true);
chk('组内分隔用淡主色线', /\.pg \.li \+ \.li\{border-top:1px solid var\(--acc-line\)\}/.test(SH), true);
chk('组与组留间隙（断开处就是分组线）', /\.pg\{margin:6px 0;/.test(SH), true);
chk('组间不再靠旧规则画发丝线', /\.pg \+ \.pg, \.li \+ \.pg, \.pg \+ \.li\{border-top/.test(SH), false);
chk('配对上用「合并为一条」文案', /data-merge="' \+ i \+ '">' \+ esc\(t\('btnMergeOne'\)\)/.test(SH), true);

/* ---- 本版：新词条 rlNote 27 语齐全（带两个占位符）---- */
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
  ['rlNote'].forEach(function (k) {
    var v = d[k];
    if (typeof v !== 'string' || !v) miss++;
    else {
      /* ⚠️ 本版这条注释有两个占位符（横屏 {0} → 竖屏 {1}），少一个就是半句话 */
      if (v.indexOf('{0}') < 0 || v.indexOf('{1}') < 0) noPh++;
      if (!/^(zh-CN|zh-TW|ja)$/.test(l) && RE_HAN.test(v)) hanBad++;
    }
  });
  /* 老词条不能被注入脚本挤掉（含 305/306 那批） */
  ['btnMergeNext', 'btnSplit', 'btnUndo', 'chkBil', 'btnMergeOne', 'btnAlign',
    'msgUnalign', 'rlOn', 'rlOff', 'rlPortrait'].forEach(function (k) {
    if (!d[k]) miss++;
  });
});
chk('新词条 + 老词条缺条 0', miss, 0);
chk('rlNote 两个占位符齐全', noPh, 0);
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


/* ---- 307 静态：参数行重排 / 联动 / 依据注释 ---- */
var SHV = R('shift.html');
chk('两格分段控件齐（横屏 / 竖屏）',
  /data-dir="land"/.test(SHV) && /data-dir="port"/.test(SHV), true);
chk('分段控件样式在位（选中格实心）', /\.rules \.seg button\[aria-pressed="true"\]\{background:var\(--acc\)/.test(SHV), true);
chk('画面方向排在四个参数前面', SHV.indexOf('data-dir="land"') < SHV.indexOf('data-rule='), true);
chk('行宽显示走引擎的 uiLineOut', /uiLineOut\(/.test(SHV), true);
chk('写回基线走引擎的 uiLineIn', /uiLineIn\(/.test(SHV), true);
chk('页面自己不乘 0.6（换算只有引擎一处）', /\*\s*0\.6/.test(SHV), false);
chk('依据注释挂在参数行里', /tpl\('rlNote'/.test(SHV), true);
chk('注释样式在位（独占一整行）', /\.rules \.rnote\{flex-basis:100%/.test(SHV), true);
chk('竖屏折扣标记样式在位', /\.rules \.lk\{/.test(SHV), true);
chk('305/306 的行尾 chip 残留 0', /id="rlPortrait"/.test(SHV), false);
chk('最短停留框已加宽（0.833 不再被截）', /\.rules \.rl \.pv input\.num\{width:92px/.test(SHV), true);
chk('引擎换算常量为 0.6', E.PORTRAIT_LINE, 0.6);
chk('引擎导出 uiLineOut', typeof E.uiLineOut, 'function');
chk('引擎导出 uiLineIn', typeof E.uiLineIn, 'function');

/* ---- 307 行为：竖屏行宽的正反换算（拉起来真跑）---- */
chk('行为：横屏就是基线', E.uiLineOut(21, false), 21);
chk('行为：竖屏 21 → 13', E.uiLineOut(21, true), 13);
chk('行为：竖屏填 13 → 基线 22', E.uiLineIn(13, true), 22);
chk('行为：再窄也不低于 4', E.uiLineOut(3, true), 4);
chk('行为：清空退回默认基线', E.uiLineIn('', true), E.CHECK_RULES.maxLine);
var rtBad = [10, 12, 13, 14, 16, 21, 26, 30]
  .filter(v => E.uiLineOut(E.uiLineIn(v, true), true) !== v);
chk('行为：8 个值往返切方向都不掉精度', rtBad.length, 0);
var P307 = E.uiRules({ minDur: 0.833, maxDur: 7, maxCps: 9, maxLine: 21 }, 'srt', true);
chk('行为：竖屏只动行宽', P307.maxLine, 13);
chk('行为：竖屏停留下限不动', P307.minDur, 833);
chk('行为：竖屏读速不动', P307.maxCps, 9);
chk('行为：uiRules 与 uiLineOut 是同一个换算点', P307.maxLine === E.uiLineOut(21, true), true);
/* 判据真的换了吗：16 个全角字一行 —— 横屏放过、竖屏报出 */
var W16 = mk([[0, 3000, '\u4e00\u4e8c\u4e09\u56db\u4e94\u516d\u4e03\u516b\u4e5d\u5341\u7532\u4e59\u4e19\u4e01\u620a\u5df1']]);
chk('行为：夹具宽度 16', E.cueWidth(W16[0]), 16);
chk('行为：16 字横屏不报行宽', E.checkCues(W16, E.uiRules({ maxLine: 21 }, 'srt', false)).length, 0);
chk('行为：16 字竖屏报行宽', E.checkCues(W16, E.uiRules({ maxLine: 21 }, 'srt', true)).length, 1);

/* ---- 汇总 ---- */
var bad = 0;
items.forEach(function (it) {
  var good = it[1] === it[2];
  if (!good) bad++;
  console.log((good ? 'OK   ' : 'MISS ') + it[0]
    + (good ? '' : '   actual=' + JSON.stringify(it[1]) + ' expect=' + JSON.stringify(it[2])));
});
console.log('\nverify307: ' + (items.length - bad) + '/' + items.length + ' OK, bad=' + bad);
