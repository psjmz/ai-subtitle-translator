/* v0.9.305 评估用：形态 B 在「逐条微调」里的实际行为摸底 */
global.window = global;
require('./shift-core.js');
var C = window.ShiftCore;

/* 构造形态 B：原文一条 + 译文一条，两条同轴 */
function mkB(n) {
  var out = [], i, t = 0;
  for (i = 0; i < n; i++) {
    var s = 1000 + i * 2000, e = s + 1800;
    out.push({ start: s, end: e, text: 'This is sentence number ' + (i + 1) + ' of the test.' });
    out.push({ start: s, end: e, text: '这是测试用的第 ' + (i + 1) + ' 句话。' });
  }
  return out;
}
var R = { minDur: 833, maxDur: 7000, maxCps: 9, maxLine: 21 };
function fmtIssues(list) {
  var iss = C.checkCues(list, R, false), by = {};
  iss.forEach(function (x) { by[x.why] = (by[x.why] || 0) + 1; });
  return JSON.stringify(by) + '  总=' + iss.length;
}

var base = mkB(20);   /* 20 句 = 40 条 */
console.log('素材：形态 B，20 句 40 条（原文/译文各一条，同轴）');
console.log('双语处数 bilingualCount =', C.bilingualCount(base));
console.log('');

console.log('--- 场景 1：原样 ---');
console.log('  体检:', fmtIssues(base));

console.log('');
console.log('--- 场景 2：在列表里把第 1 条（原文）结束时间往后挪 300ms ---');
var l2 = JSON.parse(JSON.stringify(base));
l2[0].end += 300;
console.log('  体检:', fmtIssues(l2));
console.log('  isBilingualPair(0,1) =', C.isBilingualPair(l2[0], l2[1]), '(false = 配对已破裂)');

console.log('');
console.log('--- 场景 3：在列表第 1 条上点「合并下一条」 ---');
var l3 = C.applyOps(base, [{ op: 'merge', i: 0 }]);
console.log('  条数 40 ->', l3.length);
console.log('  第1条文本:', JSON.stringify(l3[0].text));
console.log('  isBilingualCue(第1条) =', C.isBilingualCue(l3[0]), '(true = 形态 B 被并成了形态 A)');

console.log('');
console.log('--- 场景 4：在列表第 1 条上点「切分」 ---');
var l4 = C.applyOps(base, [{ op: 'split', i: 0 }]);
console.log('  条数 40 ->', l4.length);
console.log('  前 3 条起止:');
[0, 1, 2].forEach(function (k) {
  console.log('   [' + k + '] ' + l4[k].start + '->' + l4[k].end + '  ' + JSON.stringify(l4[k].text));
});
console.log('  isBilingualPair(1,2) =', C.isBilingualPair(l4[1], l4[2]));
console.log('  双语处数 =', C.bilingualCount(l4), '(原 ' + C.bilingualCount(base) + ')');
console.log('  体检:', fmtIssues(l4));

console.log('');
console.log('--- 场景 5：列表视觉标记 ---');
console.log('  形态 B 第1条 isBilingualCue =', C.isBilingualCue(base[0]), '-> 列表不加 .bi 类，跟普通两行无异');
console.log('  形态 B 第1条 isBilingualMate =', C.isBilingualMate(base, 0));
var a1 = [{ start: 0, end: 1000, text: 'Hello there\n你好呀' }];
console.log('  形态 A 一条 isBilingualCue =', C.isBilingualCue(a1[0]), '-> 列表加 .bi 类');
