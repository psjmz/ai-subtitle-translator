/* v0.9.295 引擎自测：体检（checkCues / suggest）+ applyOps 支持 n 段拆分 */
global.window = {};
require('./shift-core.js');
var C = global.window.ShiftCore;

var n = 0, bad = 0;
function ok(name, cond, got) {
  n++;
  if (cond) { console.log('  ok   ' + name); }
  else { bad++; console.log('  FAIL ' + name + '   got=' + JSON.stringify(got)); }
}
function C2(s, e, t) { return { start: s, end: e, text: t }; }

console.log('== 规则默认值 ==');
ok('默认 minDur=700', C.CHECK_RULES.minDur === 700);
ok('默认 maxLine=42', C.CHECK_RULES.maxLine === 42);
ok('CHECK_FIELDS 五项', C.CHECK_FIELDS.length === 5);

var r0 = C.uiRules({}, 'srt');
ok('空输入退回默认', r0.minDur === 700 && r0.maxDur === 7000 && r0.maxCps === 21 && r0.minGap === 100 && r0.maxLine === 42, r0);
var r1 = C.uiRules({ minDur: '0.7', maxDur: '7', maxCps: '21', minGap: '100', maxLine: '42' }, 'srt');
ok('页面上「秒」换算成毫秒', r1.minDur === 700 && r1.maxDur === 7000, r1);
var r2 = C.uiRules({ minDur: '1', maxDur: '6', maxCps: '18', minGap: '200', maxLine: '36' }, 'srt');
ok('用户改过的阈值生效', r2.minDur === 1000 && r2.maxDur === 6000 && r2.maxCps === 18 && r2.minGap === 200 && r2.maxLine === 36, r2);
ok('歌词不吃空档规则', C.uiRules({}, 'lrc').minGap === 0, C.uiRules({}, 'lrc'));
ok('纯文本不体检', C.checkable('txt') === false && C.checkable('srt') === true && C.checkable(null) === false);
ok('领导人/minDur 反着填不会跑歪', C.uiRules({ minDur: '99', maxDur: '2' }, 'srt').minDur === 700);

console.log('== checkCues：各种病灶 ==');
function idxWhy(list, i) {
  var iss = C.checkCues(list, r0), hit = null;
  iss.forEach(function (x) { if (x.i === i) hit = x.why.slice(); });
  return hit;
}
var base = [
  C2(0, 2000, '常规一条字幕在这里'),
  C2(3000, 5000, '下一条'),
  C2(6000, 9000, '第三条'),
  C2(10000, 13000, '第四条')
];
ok('健康的时间轴没有问题', C.checkCues(base, r0).length === 0, C.checkCues(base, r0));

var short = [C2(0, 2000, '好'), C2(3000, 3300, '短'), C2(4000, 6000, '好')];
ok('停留太短 → short', (idxWhy(short, 1) || []).indexOf('short') >= 0, idxWhy(short, 1));

var long = [C2(0, 2000, '好'), C2(3000, 12000, '长得过分的一条字幕在这里停很久'), C2(13000, 15000, '好')];
var lw = idxWhy(long, 1);
ok('停留太长 → long', lw.indexOf('long') >= 0, lw);

/* 一行 50 个汉字，宽 = 50 > 42 */
var longLine = [C2(0, 4000, '一二三四五六七八九十一二三四五六七八九十二二三四五六七八九十三二三四五六七八九十四二三四五六七八九十五二三四五六七八九十六')];
var llw = idxWhy(longLine, 0);
ok('一行太宽 → line', llw && llw.indexOf('line') >= 0, llw);

/* 宽 84 的中文（84 个汉字）停 1 秒 = 84 cps > 21 */
var fast = [C2(0, 1000, '一二三四五六七八九十一二三四五六七八九十二二三四五六七八九十三二三四五六七八九十四二三四五六七八九十五二三四五六七八九十六二三四五六七八九十七二三四五六七八九十八二三四五六七八九十九一二三四五六七八九十一二三四'), C2(2000, 4000, '好')];
var fw = idxWhy(fast, 0);
ok('字多时间少 → fast', fw && fw.indexOf('fast') >= 0, fw);
ok('fast 那条同时也一行太宽', fw && fw.indexOf('line') >= 0, fw);

var gap = [C2(0, 2000, '好'), C2(2050, 4000, '挨太近'), C2(5000, 7000, '好')];
var gw = idxWhy(gap, 1);
ok('空隙不足 → gap', gw && gw.indexOf('gap') >= 0, gw);

var ov = [C2(0, 2000, '好'), C2(1500, 4000, '叠上来了'), C2(5000, 7000, '好')];
var ow = idxWhy(ov, 1);
ok('重叠 → overlap', ow && ow.indexOf('overlap') >= 0, ow);
ok('重叠时不重复报 gap', ow && ow.indexOf('gap') < 0, ow);

console.log('== suggest：给的建议能落到实处 ==');
function keysFor(list, i) {
  var iss = C.checkCues(list, r0), target = null;
  iss.forEach(function (x) { if (x.i === i) target = x; });
  return target ? C.suggest(list, target, r0).map(function (s) { return s.k; }) : [];
}
ok('短会给「延长」或「与上一条合并」', keysFor(short, 1).some(function (k) { return k === 'btnLengthen' || k === 'btnMergePrev'; }), keysFor(short, 1));
ok('长会给「拆分」', keysFor(long, 1).indexOf('btnSplit') >= 0, keysFor(long, 1));
ok('贴太近会给「与上一条合并」', keysFor(gap, 1).indexOf('btnMergePrev') >= 0, keysFor(gap, 1));
ok('重叠会给「往后挪开」', keysFor(ov, 1).indexOf('btnPush') >= 0, keysFor(ov, 1));

/* 延长不许压到下一条身上：前一条住到 200ms，后一条 500ms 就来了，
   留 100ms 缝隙的话这一条最多只能撑到 400ms —— 设想回到 700ms 会把后一条挤成负数。 */
var tight = [C2(0, 200, '短'), C2(500, 3000, '后一条')];
var tightSug = C.suggest(tight, { i: 0, why: ['short'] }, r0);
var lengthenOp = null;
tightSug.forEach(function (s) { if (s.k === 'btnLengthen') lengthenOp = s.op; });
ok('延长不越界到相邻那条', lengthenOp && lengthenOp.e === 400, lengthenOp);

/* 反面：后一条离得远，就补到标准的 700 */
var roomy = [C2(0, 200, '短'), C2(3000, 5000, '后一条')];
var roomyOp = null;
C.suggest(roomy, { i: 0, why: ['short'] }, r0).forEach(function (s) { if (s.k === 'btnLengthen') roomyOp = s.op; });
ok('离得远就补到最短停留', roomyOp && roomyOp.e === 700, roomyOp);

/* 建议的 op 真跑一遍：不能再检出同一条问题 */
var list2 = [C2(0, 200, '短'), C2(3000, 5000, '后一条')];
var after = C.applyOps(list2, [{ op: 'set', i: 0, s: 0, e: 2900 }]);
ok('采纳建议后这条不再是 short', C.checkCues(after, r0).every(function (x) { return x.i !== 0 || x.why.indexOf('short') < 0; }), C.checkCues(after, r0));

console.log('== 拆分才性命帛：n 段 ==');
/* 一条 21 秒的中文长句，按最长 7 秒要 3 段 */
var long21 = [C2(0, 21000, '今天要说的第一件事是先把时间轴看成一条线然后再条分缕析地往下推演接着会发现每个环节都在叠加上一段的结论最后才得到一个能落地的办法'), C2(22000, 24000, '尾巴')];
var iss21 = C.checkCues(long21, r0);
var s21 = C.suggest(long21, iss21[0], r0), op21 = null;
s21.forEach(function (s) { if (s.k === 'btnSplit') op21 = s.op; });
/* 21 秒 ÷ 7 秒 = 3 段是纸面答案，但按 3 段切最宽那段是 7.2 秒 —— 采纳完还是红的。
   所以要补到 4 段（每段 5.25 秒）才算真的把问题解决掉。 */
ok('21 秒长条建议切 4 段（最宽那段必须也够短）', op21 && op21.n === 4, op21);
var sp = C.applyOps(long21, [op21]);
var segs = sp.filter(function (c) { return c.end <= 21000; });   /* 尾巴那一句不算在拼字比对里 */
ok('真的切成了 3 段以上', segs.length >= 3, sp.length);
var joined = segs.map(function (c) { return c.text; }).join('').replace(/\s/g, '');
ok('拼回去还是原文（没丢字也没多字）', joined === long21[0].text.replace(/\s/g, ''), joined);
ok('拆分后首尾时间不变', segs[0].start === 0 && segs[segs.length - 1].end === 21000, [segs[0].start, segs[segs.length - 1].end]);
ok('切完之后不再报 long（余量要够，否则用户采纳了还是红的）',
  C.checkCues(sp, r0).every(function (x) { return x.why.indexOf('long') < 0; }), C.checkCues(sp, r0));
ok('切完之后也不至于短得读不完', C.checkCues(sp, r0).every(function (x) { return x.why.indexOf('short') < 0; }), C.checkCues(sp, r0));

/* 老行为不能变：不带 n 的 split 还是切 2 段（292/294 记下的旧 ops） */
var two = C.applyOps([C2(0, 4000, '前半句在这里结束，后半句从这里开始'), C2(5000, 7000, '尾巴')], [{ op: 'split', i: 0 }]);
ok('旧 op 不带 n 仍切 2 段', two.length === 3, two.length);

/* 双语不许被体检切开 */
var bi = [C2(0, 21000, '这是原文的一句话要说得足够长才够触发那条最长停留的规则然后再往下接\nThis is the translation long enough too.'), C2(22000, 24000, '尾巴')];
ok('双语条目整条跳过（不给拆分建议）', C.suggest(bi, { i: 0, why: ['long'] }, r0).every(function (s) { return s.k !== 'btnSplit'; }), C.suggest(bi, { i: 0, why: ['long'] }, r0));

console.log('\n== ' + (n - bad) + '/' + bad + ' ==');
process.exit(bad ? 1 : 0);
