/* v0.9.305：i18n 三条硬规矩核验 —— 用 vm 读真 key，不用正则数（译文里的「词: '」会被算进去） */
var fs = require('fs'), vm = require('vm');
var src = fs.readFileSync('shift-i18n.js', 'utf8');
var ctx = { globalThis: {} };
ctx.window = ctx;               /* 文件末尾是 })(window); —— vm 里得先摆一个 */
vm.createContext(ctx);
vm.runInContext(src + '\n;globalThis.__D = window.SHIFT_I18N;', ctx);
var D = ctx.globalThis.__D, DICT = D.DICT, LANGS = D.LANGS.map(function (p) { return p[0]; });
console.log('语言数:', LANGS.length);

var NEED = ['btnMergeOne', 'btnAlign', 'msgUnalign'];
var HAN = /[\u4e00-\u9fff\u3400-\u4dbf]/;
var CJK = ['zh-CN', 'zh-TW', 'ja'];
var bad = 0;

LANGS.forEach(function (lg) {
  var d = DICT[lg];
  if (!d) { console.log('缺语言块: ' + lg); bad++; return; }
  NEED.forEach(function (k) {
    var v = d[k];
    if (v === undefined) { console.log('缺键: ' + lg + '.' + k); bad++; return; }
    if (k === 'msgUnalign' && v.indexOf('{0}') < 0) { console.log('占位符丢了: ' + lg + '.' + k); bad++; }
    if (CJK.indexOf(lg) < 0 && HAN.test(v)) { console.log('非中日韩混汉字: ' + lg + '.' + k + ' = ' + v); bad++; }
  });
});

/* 顺带确认：老的键一个都没被碰掉 */
var OLD = ['btnMergeNext', 'btnSplit', 'btnUndo', 'chkBil', 'statEdit'];
OLD.forEach(function (k) {
  var miss = LANGS.filter(function (lg) { return !DICT[lg] || DICT[lg][k] === undefined; });
  if (miss.length) { console.log('老键被弄丢了: ' + k + ' -> ' + miss.join(',')); bad++; }
});

/* 每个语言块的键数应该完全一致 */
var counts = {};
LANGS.forEach(function (lg) {
  var n = Object.keys(DICT[lg]).length;
  counts[n] = (counts[n] || 0) + 1;
});
console.log('各块键数分布:', JSON.stringify(counts));
if (Object.keys(counts).length !== 1) { console.log('键数不一致，有块多键或少键'); bad++; }
else console.log('每块键数:', Object.keys(counts)[0], '（27 语一致）');

console.log('');
console.log(new Array(NEED.length * LANGS.length).fill(0).length + ' 个新条目，问题 ' + bad + ' 处');
['zh-CN', 'en', 'fr', 'uk', 'ja', 'ar'].forEach(function (lg) {
  console.log('  ' + lg + ': ' + DICT[lg].btnMergeOne + ' / ' + DICT[lg].btnAlign);
  console.log('         ' + DICT[lg].msgUnalign.replace('{0}', '300'));
});
process.exit(bad ? 1 : 0);
