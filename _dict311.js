/* v0.9.310 复查·词典篇：全站 11 份界面词典逐一审 27 语完整性（v0.9.313 起加两份）
   词典源：
     1. site-i18n.js（index + translate 用，const I18N）
     2. merge.html 内嵌（const I18N，约 11272 行）
     3. clean.html 内嵌（const I18N，约 913 行）
   4~9. convert/bilingual/shift/repair/extract/glossary-i18n.js（var DICT，导出 root.XXX_I18N）
10~11. videosub/hanconv-i18n.js（v0.9.313，形态同上）
   检查项（对应各词典文件头的三条硬规矩 + 27 语全齐）：
     ① 语言块数 = 27 且名单与全站一致
     ② 每个语言块的键集合与 zh-CN 基准完全一致（缺键静默回退、多键多半是拼错）
     ③ 占位符 {0}{1}… 在各语言版本里集合一致（少一个 UI 上数字就串位）
     ④ 非中日韩语言块的值里不许混汉字
     ⑤ 值不许是空串
     ⑥ 公共键跨文件一致（navXxx / brandName / footBrand 这类在多份词典都有的键，逐语比对）
   用法：node _dict311.js
*/
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = __dirname;
const SOURCES = [
  { name: 'site-i18n.js',       file: 'site-i18n.js',  kind: 'I18N' },
  { name: 'merge.html 内嵌',     file: 'merge.html',    kind: 'I18N' },
  { name: 'clean.html 内嵌',     file: 'clean.html',    kind: 'I18N' },
  { name: 'convert-i18n.js',    file: 'convert-i18n.js', kind: 'DICT' },
  { name: 'bilingual-i18n.js',  file: 'bilingual-i18n.js', kind: 'DICT' },
  { name: 'shift-i18n.js',      file: 'shift-i18n.js',  kind: 'DICT' },
  { name: 'repair-i18n.js',     file: 'repair-i18n.js', kind: 'DICT' },
  { name: 'extract-i18n.js',    file: 'extract-i18n.js', kind: 'DICT' },
  { name: 'glossary-i18n.js',   file: 'glossary-i18n.js', kind: 'DICT' },
  { name: 'videosub-i18n.js',  file: 'videosub-i18n.js', kind: 'DICT' }, /* v0.9.313 新增 */
  { name: 'hanconv-i18n.js',   file: 'hanconv-i18n.js',  kind: 'DICT' }, /* v0.9.313 新增 */
];
const LANGS = ['zh-CN', 'zh-TW', 'en', 'ja', 'es', 'pt', 'ko', 'de', 'fr', 'id', 'hi', 'th', 'vi', 'ru', 'it', 'ar', 'tr', 'nl', 'pl', 'sv', 'cs', 'uk', 'da', 'fi', 'el', 'he', 'ro'];
const CJK_OK = new Set(['zh-CN', 'zh-TW', 'ja', 'ko']);
const HAN = /[\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff]/;

/* 从源文本里提取「var/const XXX = { … };」的对象字面量（花括号配平，跳过字符串与注释） */
function extractObject(src, varName) {
  const m = src.match(new RegExp('(?:var|const|let)\\s+' + varName + '\\s*=\\s*\\{'));
  if (!m) return null;
  let i = m.index + m[0].length - 1;          // 指向起始 {
  let depth = 0, inStr = null, esc = false, lineComment = false, blockComment = false;
  for (; i < src.length; i++) {
    const c = src[i], n = src[i + 1];
    if (lineComment) { if (c === '\n') lineComment = false; continue; }
    if (blockComment) { if (c === '*' && n === '/') { blockComment = false; i++; } continue; }
    if (inStr) {
      if (esc) { esc = false; continue; }
      if (c === '\\') { esc = true; continue; }
      if (c === inStr) inStr = null;
      continue;
    }
    if (c === '/' && n === '/') { lineComment = true; i++; continue; }
    if (c === '/' && n === '*') { blockComment = true; i++; continue; }
    if (c === "'" || c === '"' || c === '`') { inStr = c; continue; }
    if (c === '{') depth++;
    else if (c === '}') { depth--; if (depth === 0) return src.slice(m.index + m[0].length - 1, i + 1); }
  }
  return null;
}
function evalObj(objSrc) {
  try { return vm.runInNewContext('(' + objSrc + ')'); } catch (e) { return null; }
}

const bad = [];
const push = (sev, where, what) => { bad.push([sev, where, what]); };
const dicts = {};                    // name -> { lang -> { key -> value } }

for (const S of SOURCES) {
  const src = fs.readFileSync(path.join(ROOT, S.file), 'utf8');
  const objSrc = extractObject(src, S.kind);
  const where = S.name;
  if (!objSrc) { push('严重', where, '找不到 ' + S.kind + ' 对象定义'); continue; }
  const d = evalObj(objSrc);
  if (!d) { push('严重', where, S.kind + ' 求值失败（语法错？）'); continue; }
  dicts[where] = d;

  /* ① 语言块数与名单 */
  const got = Object.keys(d);
  const missing = LANGS.filter(l => !(l in d));
  const alien = got.filter(l => !LANGS.includes(l));
  if (missing.length) push('严重', where, '缺语言块：' + missing.join(','));
  if (alien.length) push('中', where, '计划外语言块：' + alien.join(','));
  if (got.length !== 27) push('中', where, '语言块 ' + got.length + ' 个（应 27）');

  /* ② 键集合与 zh-CN 基准一致 */
  const base = d['zh-CN'] || {};
  const baseKeys = new Set(Object.keys(base));
  for (const l of LANGS) {
    if (!d[l]) continue;
    const ks = Object.keys(d[l]);
    const miss = ks.filter(k => !baseKeys.has(k));   // zh-CN 没有而本语言有
    const gone = Object.keys(base).filter(k => !(k in d[l])); // zh-CN 有而本语言没有
    if (gone.length) push('严重', where + ' ' + l, '缺 ' + gone.length + ' 个词条：' + gone.slice(0, 8).join(',') + (gone.length > 8 ? '…' : ''));
    if (miss.length) push('中', where + ' ' + l, '多出 ' + miss.length + ' 个词条（zh-CN 没有）：' + miss.slice(0, 6).join(','));
  }

  /* ③ 占位符 {N} 跨语言一致 */
  const ph = s => [...String(s).matchAll(/\{(\d+)\}/g)].map(m => '{' + m[1] + '}').sort().join(',');
  for (const k of Object.keys(base)) {
    const want = ph(base[k]);
    for (const l of LANGS) {
      if (!d[l] || !(k in d[l])) continue;
      if (ph(d[l][k]) !== want)
        push('严重', where + ' ' + l, '词条「' + k + '」占位符不符：zh-CN=' + (want || '无') + ' 本语=' + (ph(d[l][k]) || '无'));
    }
  }

  /* ④ 汉字泄漏 + ⑤ 空值 */
  let han = 0, empty = 0;
  for (const l of LANGS) {
    if (!d[l] || CJK_OK.has(l)) continue;
    for (const k of Object.keys(d[l])) {
      const v = d[l][k];
      if (v == null || String(v) === '') { empty++; push('中', where + ' ' + l, '词条「' + k + '」是空值'); continue; }
      if (typeof v === 'string' && HAN.test(v)) {
        han++;
        push('严重', where + ' ' + l, '词条「' + k + '」混汉字：' + JSON.stringify(v.slice(0, 30)));
      }
    }
  }

  console.log('✓ ' + where.padEnd(22) + '词条 ' + Object.keys(base).length + ' 个 × ' + got.length + ' 语' + (han ? '  ⚠️汉字泄漏 ' + han : '') + (empty ? '  ⚠️空值 ' + empty : ''));
}

/* ⑥ 公共键跨文件一致 */
console.log('\n— 公共键跨文件比对 —');
const names = Object.keys(dicts);
for (let i = 0; i < names.length; i++) for (let j = i + 1; j < names.length; j++) {
  const A = dicts[names[i]], B = dicts[names[j]];
  const common = Object.keys(A['zh-CN'] || {}).filter(k => B['zh-CN'] && (k in B['zh-CN']));
  if (!common.length) continue;
  let diff = 0;
  for (const k of common) for (const l of LANGS) {
    if (!A[l] || !B[l] || !(k in A[l]) || !(k in B[l])) continue;
    if (String(A[l][k]) !== String(B[l][k])) {
      diff++;
      if (diff <= 3) push('中', names[i] + ' ≠ ' + names[j], '公共词条「' + k + '」' + l + '：' + JSON.stringify(String(A[l][k]).slice(0, 24)) + ' vs ' + JSON.stringify(String(B[l][k]).slice(0, 24)));
    }
  }
  console.log('  ' + names[i] + ' × ' + names[j] + '：公共键 ' + common.length + ' 个，不一致 ' + diff + ' 处');
}

/* ---------- 汇总 ---------- */
console.log('\n===== 问题清单 =====');
if (!bad.length) console.log('（无）');
const g = new Map();
bad.forEach(b => {
  const k = b[2].split('：')[0].slice(0, 24);
  if (!g.has(k)) g.set(k, []);
  g.get(k).push(b);
});
[...g.keys()].sort((a, b) => g.get(b).length - g.get(a).length).forEach(k => {
  const list = g.get(k);
  console.log('\n【' + k + '】共 ' + list.length + ' 条');
  list.slice(0, 8).forEach(x => console.log('   [' + x[0] + '] ' + x[1] + ' —— ' + x[2].slice(0, 110)));
  if (list.length > 8) console.log('   … 其余 ' + (list.length - 8) + ' 条');
});
const sev = { '严重': 0, '中': 0 };
bad.forEach(b => sev[b[0]]++);
console.log('\n_dict311：严重 ' + sev['严重'] + ' 条 / 中 ' + sev['中'] + ' 条，合计 ' + bad.length + ' 条');
