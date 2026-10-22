/* _chkshard.js —— 界面语言分片校验器（v0.9.339）
 *
 * 用法：node _chkshard.js ui-fil.js ui-fa.js ...
 * 不给参数则校验 i18n/ 下所有分片。
 *
 * 逐条对齐 _core338.json（337 键的核心集）：
 *   1 键齐 / 无多余键
 *   2 值非空、非 undefined
 *   3 占位符 {0}{1}… 与英文源一致（少了占位符 = 运行时数字丢失）
 *   4 <b> </b> 配对数一致（多了会破坏排版）
 *   5 非 CJK 语言不许出现汉字（漏译的硬指标）
 *   6 分片能被 vm 正常执行，且挂在同一个 I18N 对象上（不是新建对象）
 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const DIR = __dirname;
const CORE = JSON.parse(fs.readFileSync(path.join(DIR, '_core338.json'), 'utf8'));
const KEYS = Object.keys(CORE);
const CJK_OK = /^(zh-CN|zh-TW|ja|yue)$/;

// 用一份干净的 site-i18n.js 建立 I18N 对象，再执行分片
function loadBase() {
  const ctx = { window: {} };
  ctx.globalThis = ctx;
  vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(path.join(DIR, 'site-i18n.js'), 'utf8') + ';globalThis.__I=I18N;', ctx);
  return ctx;
}

const ph = s => (String(s).match(/\{\d+\}/g) || []).sort().join(',');
const bTag = s => (String(s).match(/<\/?b>/g) || []).length;

const files = process.argv.slice(2).length ? process.argv.slice(2)
  : fs.readdirSync(path.join(DIR, 'i18n')).filter(f => /^ui-[a-z]{2,3}(-[A-Za-z]+)?\.js$/.test(f));

let allBad = 0;
for (const f of files) {
  const file = path.join(DIR, 'i18n', f);
  const lang = f.replace(/^ui-/, '').replace(/\.js$/, '');
  const errs = [];

  const ctx = loadBase();
  const before = vm.runInContext('Object.keys(I18N).length', ctx);
  try {
    vm.runInContext(fs.readFileSync(file, 'utf8'), ctx);
  } catch (e) { errs.push('执行报错：' + e.message); }
  const after = vm.runInContext('Object.keys(I18N).length', ctx);
  if (after <= before) errs.push('没有往 I18N 上加语言（' + before + ' → ' + after + '）');

  const d = vm.runInContext('I18N[' + JSON.stringify(lang) + ']', ctx);
  if (!d) { errs.push('I18N["' + lang + '"] 不存在'); }
  else {
    const have = Object.keys(d);
    const miss = KEYS.filter(k => !(k in d));
    const extra = have.filter(k => KEYS.indexOf(k) < 0);
    if (miss.length) errs.push('缺 ' + miss.length + ' 键：' + miss.slice(0, 8).join(','));
    if (extra.length) errs.push('多 ' + extra.length + ' 键：' + extra.slice(0, 8).join(','));
    const empty = KEYS.filter(k => k in d && (d[k] === '' || d[k] == null));
    if (empty.length) errs.push('空值 ' + empty.length + '：' + empty.slice(0, 8).join(','));
    const phBad = KEYS.filter(k => k in d && ph(d[k]) !== ph(CORE[k].en));
    if (phBad.length) errs.push('占位符不一致 ' + phBad.length + '：' + phBad.slice(0, 6).map(k => k + '(' + ph(d[k]) + '≠' + ph(CORE[k].en) + ')').join(' '));
    const bBad = KEYS.filter(k => k in d && bTag(d[k]) !== bTag(CORE[k].en));
    if (bBad.length) errs.push('<b> 不配对 ' + bBad.length + '：' + bBad.slice(0, 6).join(','));
    if (!CJK_OK.test(lang)) {
      const cjk = KEYS.filter(k => k in d && /[\u4e00-\u9fff]/.test(String(d[k])));
      if (cjk.length) errs.push('残留汉字 ' + cjk.length + '：' + cjk.slice(0, 8).join(','));
    }
    const same = KEYS.filter(k => k in d && d[k] === CORE[k].en).length;
    console.log((errs.length ? '✗ ' : '✓ ') + lang.padEnd(6) + ' ' + (have.length) + ' 键' + (same ? '（与英文同形 ' + same + ' 条，多为专名/符号，正常）' : ''));
  }
  errs.forEach(e => console.log('    · ' + e));
  if (errs.length) allBad++;
}
console.log('\n' + (files.length - allBad) + ' ✓ / ' + allBad + ' ✗');
process.exit(allBad ? 1 : 0);
