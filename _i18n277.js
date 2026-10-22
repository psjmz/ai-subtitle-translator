/* v0.9.277 一次性脚本：把新文案词条写进 site-i18n.js 的 27 个语言块
   用法：node _i18n277.js
   规则：
     - zh-CN / zh-TW / en / ja 四语各自取值（人工定的口径）
     - 其余 23 语先顶英文值 —— 宁可给英文，也不留空让用户看到 key 明文
     - heroSub 是**已存在**的键 → 整条替换（内容是整句改写了）
     - 其余是新键 → 追加到该语言块最后一个条目之后
   ⚠️ 注入点用字符状态机找，不能按行找（字典里存在跨行字符串） */
'use strict';
const fs = require('fs');
const DICT = JSON.parse(fs.readFileSync('_dict277.json', 'utf8'));
const FILE = 'site-i18n.js';
const LANGS = ['zh-CN', 'zh-TW', 'en', 'ja', 'es', 'pt', 'ko', 'de', 'fr', 'id', 'hi', 'th', 'vi', 'ru', 'it', 'ar', 'tr', 'nl', 'pl', 'sv', 'cs', 'uk', 'da', 'fi', 'el', 'he', 'ro'];
const EXISTING = ['heroSub'];   /* 这几个是覆盖，不是新增 */

let src = fs.readFileSync(FILE, 'utf8');

/* ---------- 找一个语言块的起止（处理好字符串与注释） ---------- */
function blockRange(s, lang) {
  const head = "'" + lang + "': {";
  const i = s.indexOf(head);
  if (i < 0) throw new Error('找不到语言块 ' + lang);
  let depth = 0, inStr = null, esc = false, lineC = false, blockC = false;
  let lastComma = -1;
  let j = i + head.length - 1;               /* 指向 '{' */
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

/* ---------- 1) 覆盖已存在的键 ---------- */
function replaceKey(s, lang, key, val) {
  const r = blockRange(s, lang);
  const body = s.slice(r.start, r.close);
  /* 形如 heroSub:'……', 一条值里可能有转义，但不能跨到下一个键 */
  const re = new RegExp("(\\n\\s*)" + key + ":'(?:[^'\\\\]|\\\\.)*'");
  const m = body.match(re);
  if (!m) throw new Error(lang + ' 里没有 ' + key);
  const nu = m[1] + key + ":'" + String(val).replace(/\\/g, '\\\\').replace(/'/g, "\\'") + "'";
  const nb = body.replace(re, nu);
  return s.slice(0, r.start) + nb + s.slice(r.close);
}

/* ---------- 2) 追加新键 ---------- */
function appendKeys(s, lang, entries) {
  if (!entries.length) return s;
  const r = blockRange(s, lang);
  if (r.lastComma < 0) throw new Error(lang + ' 块里没找到可挂载的逗号');
  /* ⚠️ 插入点落在「最后一个条目之前」（lastComma 后面还跟着原最后一条），
       所以追加串要以逗号**收尾** —— 少了它，原来的最后一条就变成缺逗号、整段 SyntaxError。 */
  const add = entries.map(([k, v]) => "\n    " + k + ":'" + String(v).replace(/\\/g, '\\\\').replace(/'/g, "\\'") + "'").join(',') + ',';
  return s.slice(0, r.lastComma + 1) + add + s.slice(r.lastComma + 1);
}

/* ---------- 执行 ---------- */
let nReplace = 0, nAppend = 0;
LANGS.forEach((lang) => {
  const pick = (k) => (DICT[k][lang] !== undefined ? DICT[k][lang] : DICT[k]['en']);
  EXISTING.forEach((k) => { src = replaceKey(src, lang, k, pick(k)); nReplace++; });
  const news = Object.keys(DICT).filter((k) => EXISTING.indexOf(k) < 0);
  src = appendKeys(src, lang, news.map((k) => [k, pick(k)]));
  nAppend += news.length;
});
fs.writeFileSync(FILE, src);
console.log('覆盖 ' + nReplace + ' 处 / 新增 ' + nAppend + ' 处');

/* ---------- 自检：每个语言块里每个键都真的存在且只有一份 ---------- */
let bad = 0;
LANGS.forEach((lang) => {
  const r = blockRange(src, lang);
  const body = src.slice(r.start, r.close);
  Object.keys(DICT).forEach((k) => {
    const n = (body.match(new RegExp("(^|\\n)\\s*" + k + ":'", 'g')) || []).length;
    if (n !== 1) { console.log('✗ ' + lang + ' 的 ' + k + ' 出现 ' + n + ' 次'); bad++; }
  });
});
if (bad) { console.log('自检未过，回滚前请检查 site-i18n.js'); process.exit(1); }
console.log('✓ 27 个语言块 × ' + Object.keys(DICT).length + ' 个词条，各出现且仅出现一次');
