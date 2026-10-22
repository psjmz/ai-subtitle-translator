/* v0.9.295 词典硬规矩校验：
   ① 每个 key 在 27 个语言块里都得有（缺了会静默回退中文）
   ② 非中日韩语言块里不许混进汉字（模型/读者会当成没翻译）
   ③ 占位符 {0} 必须原样保留 */
'use strict';
global.window = {};
require('./shift-i18n.js');
var I18N = global.window.SHIFT_I18N.DICT, LANGS = global.window.SHIFT_I18N.LANGS;

var NEW = ['chkTitle', 'chkHint', 'chkStat', 'chkNone', 'chkNoTime',
  'chkWhy_short', 'chkWhy_long', 'chkWhy_fast', 'chkWhy_line',
  'chkWhy_gap', 'chkWhy_overlap',
  'btnLengthen', 'btnMergePrev', 'btnPush', 'unitCps',
  'rlDurMin', 'rlDurMax', 'rlSpeed', 'rlGap', 'rlLine'];
var REUSE = ['btnMergeNext', 'btnSplit', 'btnMore'];

var HAN_OK = { 'zh-CN': 1, 'zh-TW': 1, 'ja': 1 };   /* 只有这三种书面语本来就用汉字 */
var RE_HAN = /[一-鿿]/;

var n = 0, bad = 0;
function ok(name, cond, got) {
  n++;
  if (cond) console.log('  ok   ' + name);
  else { bad++; console.log('  FAIL ' + name + '   ' + JSON.stringify(got)); }
}

console.log('== 语言块齐不齐 ==');
ok('27 个语言块', LANGS.length === 27 && Object.keys(I18N).length === 27, LANGS.length);

console.log('== 新键零缺条 ==');
NEW.concat(REUSE).forEach(function (k) {
  var miss = LANGS.map(function (p) { return p[0]; }).filter(function (l) {
    return !I18N[l] || I18N[l][k] === undefined;
  });
  ok(k + ' 27 语全齐', miss.length === 0, miss);
});

console.log('== 非中日韩语言里不许混汉字 ==');
LANGS.forEach(function (p) {
  var l = p[0];
  if (HAN_OK[l]) return;
  var dirty = [];
  NEW.concat(REUSE).forEach(function (k) {
    var v = (I18N[l] || {})[k];
    if (v && RE_HAN.test(v)) dirty.push(k + '=' + v);
  });
  ok(l + ' 没有汉字', dirty.length === 0, dirty);
});

console.log('== 占位符保留 ==');
LANGS.forEach(function (p) {
  var v = (I18N[p[0]] || {}).chkStat;
  ok(p[0] + ' chkStat 里有 {0}', typeof v === 'string' && v.indexOf('{0}') >= 0, v);
});

console.log('== 译文不许是空串 / 不许直接抄 key 名 ==');
LANGS.forEach(function (p) {
  var dirty = NEW.concat(REUSE).filter(function (k) {
    var v = (I18N[p[0]] || {})[k];
    return v === '' || v === k;
  });
  ok(p[0] + ' 新键都有真译文', dirty.length === 0, dirty);
});

console.log('== 抽样：几种语言的实际文案 ==');
['zh-CN', 'zh-TW', 'en', 'ja', 'he', 'ar', 'th', 'fr', 'uk'].forEach(function (l) {
  var d = I18N[l];
  console.log('  ' + l + ': ' + [d.chkTitle, d.chkStat.replace('{0}', 'N'), d.chkWhy_short, d.btnMergePrev, d.unitCps].join(' | '));
});

console.log('\n== ' + (n - bad) + '/' + bad + ' ==');
process.exit(bad ? 1 : 0);
