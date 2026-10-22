/* v0.9.277 字典补充：heroTitle —— 首页头条
   为什么必须改：首页已经没有上传框了，原来那句「把字幕丢进来」指的是一个不存在的控件。
   （用户原话：我觉得首页这个导入字幕翻译的模块不需要了）
   用法：node _i18n277c.js */
'use strict';
const fs = require('fs');
const T = JSON.parse(fs.readFileSync('_title277.json', 'utf8'));
const LANGS = ['zh-CN', 'zh-TW', 'en', 'ja', 'es', 'pt', 'ko', 'de', 'fr', 'id', 'hi', 'th', 'vi', 'ru', 'it', 'ar', 'tr', 'nl', 'pl', 'sv', 'cs', 'uk', 'da', 'fi', 'el', 'he', 'ro'];
const FILE = 'site-i18n.js';
const miss = LANGS.filter((l) => !T[l]);
if (miss.length) { console.log('✗ 缺语言：' + miss.join(' ')); process.exit(1); }

function blockRange(s, lang) {
  const head = "'" + lang + "': {";
  const i = s.indexOf(head);
  if (i < 0) throw new Error('找不到语言块 ' + lang);
  let depth = 0, inStr = null, esc = false, lineC = false, blockC = false;
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
    else if (c === '}') { depth--; if (depth === 0) return { start: i, close: j }; }
  }
  throw new Error('语言块 ' + lang + ' 没找到配对的 }');
}

let src = fs.readFileSync(FILE, 'utf8');
let n = 0;
LANGS.forEach((lang) => {
  const r = blockRange(src, lang);
  const body = src.slice(r.start, r.close);
  /* ⚠️ 不能要求前面一定是换行：字典里有的条目跟在前一条后面同一行
     （zh-CN 的 heroTitle 就是 navRepo:'开源仓库', heroTitle:'…' 这种写法） */
  const re = /([,{\n]\s*)heroTitle:'(?:[^'\\]|\\.)*'/;
  const m = body.match(re);
  if (!m) throw new Error(lang + ' 里没有 heroTitle');
  const val = T[lang].replace(/\\/g, '\\\\').replace(/'/g, "\\'");
  const nb = body.replace(re, m[1] + "heroTitle:'" + val + "'");
  src = src.slice(0, r.start) + nb + src.slice(r.close);
  n++;
});
fs.writeFileSync(FILE, src);
console.log('✓ 覆盖 ' + n + ' 个语言块的 heroTitle');
const chk = fs.readFileSync(FILE, 'utf8');
LANGS.forEach((lang) => {
  const r = blockRange(chk, lang);
  const c = (chk.slice(r.start, r.close).match(/heroTitle:'/g) || []).length;
  if (c !== 1) { console.log('✗ ' + lang + ' heroTitle 出现 ' + c + ' 次'); process.exit(1); }
});
console.log('✓ 每块各一份，无重复');
