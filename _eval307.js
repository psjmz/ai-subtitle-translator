/* v0.9.307 引擎层自测：竖屏行宽的「显示值 ↔ 基线」换算（新增 uiLineOut / uiLineIn） */
global.window = global;
require('./shift-core.js');
var C = window.ShiftCore;
var P = 0, F = 0;
function ok(c, n, x) {
  if (c) { P++; console.log('  ✓ ' + n + (x !== undefined ? '  [' + x + ']' : '')); }
  else { F++; console.log('  ✗ ' + n + '  [' + x + ']'); }
}

console.log('--- uiLineOut：基线 → 当前方向显示值 ---');
ok(C.uiLineOut(21, false) === 21, '横屏就是基线（21 → 21）', C.uiLineOut(21, false));
ok(C.uiLineOut(21, true) === 13, '竖屏收到 60%（21 → 13）', C.uiLineOut(21, true));
ok(C.uiLineOut(16, true) === 10, '简中口径 16 → 10', C.uiLineOut(16, true));
ok(C.uiLineOut(4, true) === 4, '再窄也不低于 4（一行的最低可读宽度）', C.uiLineOut(4, true));
ok(C.uiLineOut(3, true) === 4, '低于 4 的基线也被抬到 4', C.uiLineOut(3, true));
ok(C.uiLineOut('', true) === 13, '空值退回默认基线 21 再打折 = 13', C.uiLineOut('', true));
ok(C.uiLineOut(0, false) === 21, '0 / 非正数退回默认', C.uiLineOut(0, false));
ok(C.uiLineOut('abc', false) === 21, '非数字退回默认', C.uiLineOut('abc', false));

console.log('--- uiLineIn：当前方向填的值 → 基线（反算） ---');
ok(C.uiLineIn(21, false) === 21, '横屏原样写回', C.uiLineIn(21, false));
ok(C.uiLineIn(13, true) === 22, '竖屏填 13 → 基线 22', C.uiLineIn(13, true));
ok(C.uiLineIn(10, true) === 17, '竖屏填 10 → 基线 17', C.uiLineIn(10, true));
ok(C.uiLineIn(4, true) === 7, '竖屏填最小值 4 → 基线 7', C.uiLineIn(4, true));
ok(C.uiLineIn('', true) === 21, '清空 = 退回默认基线', C.uiLineIn('', true));
ok(C.uiLineIn(0, true) === 21, '0 不等于「无限窄」，退回默认', C.uiLineIn(0, true));

console.log('--- 往返：来回切方向不许一轮轮掉精度 ---');
[10, 12, 13, 14, 16, 21, 26, 30].forEach(function (shown) {
  var back = C.uiLineOut(C.uiLineIn(shown, true), true);
  ok(back === shown, '竖屏 ' + shown + ' 写回基线再算回来还是 ' + shown, back);
});
/* 稳定的基线：横屏 21 → 竖屏显示 13 → 用户不改就失焦（值没变，不触发 change）→ 基线不动 */
ok(C.uiLineIn(C.uiLineOut(21, true), true) === 22,
  '竖屏 13 写回会把基线挪到 22（这是有意的：两个方向看到的是同一个阈值）',
  C.uiLineIn(C.uiLineOut(21, true), true));
ok(C.uiLineOut(C.uiLineIn(C.uiLineOut(21, true), true), true) === 13,
  '挪到 22 之后竖屏显示仍是 13（不抖）', C.uiLineOut(22, true));

console.log('--- uiRules 走的是同一个换算点 ---');
var R1 = C.uiRules({ minDur: 0.833, maxDur: 7, maxCps: 9, maxLine: 21 }, 'srt', false);
ok(R1.maxLine === 21 && R1.minDur === 833 && R1.maxCps === 9, '横屏规则表', JSON.stringify(R1));
var R2 = C.uiRules({ minDur: 0.833, maxDur: 7, maxCps: 9, maxLine: 21 }, 'srt', true);
ok(R2.maxLine === 13, '竖屏只动行宽（21 → 13）', R2.maxLine);
ok(R2.minDur === 833 && R2.maxDur === 7000 && R2.maxCps === 9,
  '停留与读速不随方向变（跟画面横竖无关）', R2.minDur + '/' + R2.maxDur + '/' + R2.maxCps);
ok(R2.maxLine === C.uiLineOut(21, true), 'uiRules 与 uiLineOut 结果一致（换算只有一处）',
  R2.maxLine + ' vs ' + C.uiLineOut(21, true));

console.log('--- 体检真的按竖屏那 13 判吗 ---');
/* 十六个全角字 = 宽度 16：横屏 21 之内、竖屏 13 之外 —— 一句话就能验出判据换没换 */
var wide = [{ start: 0, end: 3000, text: '一二三四五六七八九十甲乙丙丁戊己' }];
ok(C.cueWidth(wide[0]) === 16, '夹具宽度正好 16', C.cueWidth(wide[0]));
var h = C.checkCues(wide, C.uiRules({ minDur: 0.833, maxDur: 7, maxCps: 9, maxLine: 21 }, 'srt', false), false);
var v = C.checkCues(wide, C.uiRules({ minDur: 0.833, maxDur: 7, maxCps: 9, maxLine: 21 }, 'srt', true), false);
ok(h.filter(function (x) { return x.why.indexOf('line') >= 0; }).length === 0,
  '横屏 16 字不报行宽', JSON.stringify(h));
ok(v.filter(function (x) { return x.why.indexOf('line') >= 0; }).length === 1,
  '竖屏同一行报行宽（判据确实收到 13）', JSON.stringify(v));

console.log('\n_eval307: ' + P + ' 通过 / ' + F + ' 失败');
process.exit(F ? 1 : 0);
