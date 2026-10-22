/* v0.9.277 字典补充：wsDocTitle —— 工作台页自己的 27 语标题
   取值直接沿用 _seo277.json（server.js 注入的 SEO title），
   两处必须一致：爬虫读到的是 SEO 那份，用户看到的是这里这份。
   用法：node _i18n277b.js */
'use strict';
const fs = require('fs');
const SEO = JSON.parse(fs.readFileSync('_seo277.json', 'utf8'));
const LANGS = ['zh-CN', 'zh-TW', 'en', 'ja', 'es', 'pt', 'ko', 'de', 'fr', 'id', 'hi', 'th', 'vi', 'ru', 'it', 'ar', 'tr', 'nl', 'pl', 'sv', 'cs', 'uk', 'da', 'fi', 'el', 'he', 'ro'];
const FILE = 'site-i18n.js';
if ((fs.readFileSync(FILE, 'utf8').match(/wsDocTitle/g) || []).length) { console.log('✗ wsDocTitle 已存在（别重复注入）'); process.exit(1); }
const miss = LANGS.filter((l) => !SEO[l] || !SEO[l].title);
if (miss.length) { console.log('✗ 缺语言：' + miss.join(' ')); process.exit(1); }

/* 找一个语言块的起止（处理好字符串与注释）—— 与 _i18n277.js 同一套算法 */
function blockRange(s, lang) {
  const head = "'" + lang + "': {";
  const i = s.indexOf(head);
  if (i < 0) throw new Error('找不到语言块 ' + lang);
  let depth = 0, inStr = null, esc = false, lineC = false, blockC = false, lastComma = -1;
  let j = i + head.length - 1;
  for (; j < s.length; j++) {
    const c = s[j], n = s[j + 1];
    if (lineC) { if (c === '\n') lineC = false; continue; }
    if (blockC) { if (c === '*' && n === '/') { blockC = false; j++; } continue; }
    if (inStr) {
      if (esc) { esc = false; continue; }
      if (c === '\\') { esc = true; continue; }
      if (c === inStr) inStr = null;
      continue;
    }
    if (c === '/' && n === '/') { lineC = true; j++; continue; }
    if (c === '/' && n === '*') { blockC = true; j++; continue; }
    if (c === "'" || c === '"' || c === '`') { inStr = c; continue; }
    if (c === '{') depth++;
    else if (c === '}') { depth--; if (depth === 0) return { start: i, close: j, lastComma: lastComma }; }
    else if (c === ',' && depth === 1) lastComma = j;
  }
  throw new Error('语言块 ' + lang + ' 没找到配对的 }');
}

let src = fs.readFileSync(FILE, 'utf8');
LANGS.forEach((lang) => {
  const r = blockRange(src, lang);
  if (r.lastComma < 0) throw new Error(lang + ' 找不到挂载点');
  const line = "\n    wsDocTitle:'" + SEO[lang].title.replace(/\\/g, '\\\\').replace(/'/g, "\\'") + "',";
  src = src.slice(0, r.lastComma + 1) + line + src.slice(r.lastComma + 1);
});
fs.writeFileSync(FILE, src);

let bad = 0;
LANGS.forEach((lang) => {
  const r = blockRange(src, lang);
  const n = (src.slice(r.start, r.close).match(/(^|\n)\s*wsDocTitle:'/g) || []).length;
  if (n !== 1) { console.log('✗ ' + lang + ' 出现 ' + n + ' 次'); bad++; }
});
if (bad) process.exit(1);
console.log('✓ 27 个语言块各注入一份 wsDocTitle');
