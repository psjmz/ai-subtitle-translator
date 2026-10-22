/* v0.9.305 引擎层改动自测 */
global.window = global;
require('./shift-core.js');
var C = window.ShiftCore;

var pass = 0, fail = 0;
function ok(name, cond) {
  if (cond) { pass++; console.log('  ok   ' + name); }
  else { fail++; console.log('  FAIL ' + name); }
}

function mkB(n) {
  var out = [], i;
  for (i = 0; i < n; i++) {
    var s = 1000 + i * 2000, e = s + 1800;
    out.push({ start: s, end: e, text: 'This is sentence number ' + (i + 1) + ' of the test.' });
    out.push({ start: s, end: e, text: '这是测试用的第 ' + (i + 1) + ' 句话。' });
  }
  return out;
}

console.log('--- 1. split 守卫补上形态 B ---');
var b = mkB(3);
var r = C.applyOps(b, [{ op: 'split', i: 0 }]);
ok('形态 B 的原文切不动（条数不变）', r.length === 6);
ok('切不动时文本一字未动', r[0].text === b[0].text);
var r2 = C.applyOps(b, [{ op: 'split', i: 2 }]);
ok('形态 B 的译文也切不动', r2.length === 6);
var a1 = [{ start: 0, end: 2000, text: 'Hello there\n你好呀' }];
ok('形态 A 仍然切不动（原有护栏没被改坏）', C.applyOps(a1, [{ op: 'split', i: 0 }]).length === 1);
var mono = [{ start: 0, end: 2000, text: 'First half of a long sentence here' },
            { start: 2100, end: 4000, text: 'Second half of a long sentence here' }];
ok('普通单语条目照样能切', C.applyOps(mono, [{ op: 'split', i: 0 }]).length === 3);

console.log('');
console.log('--- 2. unalignedPair ---');
ok('同轴的一对 → 不报（归 isBilingualPair 管）', C.unalignedPair(b, 0) === null);
var u1 = JSON.parse(JSON.stringify(b)); u1[0].end += 300;
var p1 = C.unalignedPair(u1, 0);
ok('终点错开 300ms → 报出伙伴 j=1', p1 && p1.j === 1);
ok('  off = 300', p1 && p1.off === 300);
var u2 = JSON.parse(JSON.stringify(b)); u2[0].start += 200;
ok('起点错开 200ms → off = 200', C.unalignedPair(u2, 0) && C.unalignedPair(u2, 0).off === 200);
ok('从译文那侧查也能查到（j=0）', u1[1] && C.unalignedPair(u1, 1).j === 0);
var seq = [{ start: 0, end: 2000, text: 'First sentence in english here' },
           { start: 2000, end: 4000, text: '第二句话在这里' }];
ok('首尾相接的中英流水 → 不报（不是被拆散的一对）', C.unalignedPair(seq, 0) === null);
var far = [{ start: 0, end: 1000, text: 'English line here' },
           { start: 9000, end: 11000, text: '中文一行在这里' }];
ok('隔了 8 秒的两条 → 不报（时间不重叠）', C.unalignedPair(far, 0) === null);
var same = [{ start: 0, end: 3000, text: 'English line here' },
            { start: 0, end: 2500, text: 'Another english line here' }];
ok('同语言且同轴 → 不报（那是屏幕叠字，归 overlap 管）', C.unalignedPair(same, 0) === null);
/* 闸门 ②：只压住一点点的是「各说各的」，不是被拆散的一对 */
var nar = [{ start: 0, end: 5000, text: 'A long english narration line here' },
           { start: 4000, end: 6000, text: '中文解说一行' }];
ok('只重叠 50% 的中英两条 → 不报（各说各的）', C.unalignedPair(nar, 0) === null);
var wide = [{ start: 0, end: 5000, text: 'A long english narration line here' },
            { start: 0, end: 1000, text: '中文解说一行' }];
ok('一条被压得很短、但仍整段落在另一条里 → 报（重叠 100%）', C.unalignedPair(wide, 0) !== null);

console.log('');
console.log('--- 2b. isPairGroup（列表分组判据）---');
ok('同轴的一对 → 算一组', C.isPairGroup(b, 0) === true);
ok('被调开的一对 → 仍算一组（关键：不能一调开就散）', C.isPairGroup(u1, 0) === true);
ok('组的第二条不再领一个组', C.isPairGroup(u1, 1) === false);
ok('正常流水 → 不算一组', C.isPairGroup(seq, 0) === false);
ok('只重叠 50% → 不算一组', C.isPairGroup(nar, 0) === false);
ok('列表末尾 → 不算一组', C.isPairGroup(b, b.length - 1) === false);

console.log('');
console.log('--- 3. alignOps 取并集 ---');
var ops = C.alignOps(u1, 0);
ok('返回一组两个 op', Array.isArray(ops) && ops.length === 2);
ok('两个 op 都是 set', ops[0].op === 'set' && ops[1].op === 'set');
ok('目标是两条各自的下标', ops[0].i === 0 && ops[1].i === 1);
ok('起点取 min = 1000', ops[0].s === 1000 && ops[1].s === 1000);
ok('终点取 max = 3100', ops[0].e === 3100 && ops[1].e === 3100);
var fixed = C.applyOps(u1, ops);
ok('对齐后两条起止完全相同', fixed[0].start === fixed[1].start && fixed[0].end === fixed[1].end);
ok('对齐后终点 = 3100（并集，没截短）', fixed[0].end === 3100);
ok('对齐后重新被认成一对', C.isBilingualPair(fixed[0], fixed[1]) === true);
ok('对齐后 unalignedPair 不再报', C.unalignedPair(fixed, 0) === null);
var R = { minDur: 833, maxDur: 7000, maxCps: 9, maxLine: 21 };
/* ⚠️ 这里不能断言「对齐后体检 0 条」：mkB 的句子间隔只有 200ms，
   把第 1 句撑到 3100 就撞上了第 2 句的 3000 —— 那个 overlap 是**真的**，
   对齐不管防碰撞（见 alignOps 注释）。只断言「配对关系恢复」。 */
ok('对齐前体检确实报了 overlap', C.checkCues(u1, R, false).length === 1);
var one = [fixed[0], fixed[1]];
ok('对齐后这一对自身体检 0 条', C.checkCues(one, R, false).length === 0);
var u3 = JSON.parse(JSON.stringify(b)); u3[1].end += 500;
var fixed3 = C.applyOps(u3, C.alignOps(u3, 1));
ok('从译文侧对齐也成立（终点 3300）', fixed3[0].end === 3300 && fixed3[1].end === 3300);

console.log('');
console.log('--- 4. 回归：形态 B 原样不受影响 ---');
ok('原样体检 0 条', C.checkCues(b, R, false).length === 0);
ok('双语处数仍为 3', C.bilingualCount(b) === 3);
ok('isBilingualEntry 两条都为真', C.isBilingualEntry(b, 0) && C.isBilingualEntry(b, 1));
var mg = C.applyOps(b, [{ op: 'merge', i: 0 }]);
ok('merge 仍能 B→A（有意为之的形态转换）', mg.length === 5 && C.isBilingualCue(mg[0]));

console.log('');
console.log('结果: ' + pass + ' 通过 / ' + fail + ' 失败');
process.exit(fail ? 1 : 0);
