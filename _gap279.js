/* v0.9.279：统计特效页 / 清洗页要补多少词条，以及有多少能复用共享词典 site-i18n.js */
const fs = require('fs');

function blockKeys(src, anchor, lang) {
  const i = src.indexOf(anchor);
  if (i < 0) throw new Error('找不到 ' + anchor);
  /* 找到该语言块的起点，再用大括号配平（跳过字符串/注释）取出整块 */
  const re = new RegExp("\\n[ \\t]*'" + lang + "':\\s*\\{");
  const m = re.exec(src.slice(i));
  if (!m) throw new Error('找不到语言块 ' + lang);
  const start = i + m.index + m[0].length;
  let d = 1, p = start, st = null;
  while (d > 0 && p < src.length) {
    const c = src[p];
    if (st === "'" || st === '"' || st === '`') {
      if (c === '\\') { p += 2; continue; }
      if (c === st) st = null;
    } else if (st === '//') { if (c === '\n') st = null; }
    else if (st === '/*') { if (c === '*' && src[p + 1] === '/') { st = null; p += 2; continue; } }
    else if (c === "'" || c === '"' || c === '`') st = c;
    else if (c === '/' && src[p + 1] === '/') st = '//';
    else if (c === '/' && src[p + 1] === '*') st = '/*';
    else if (c === '{') d++;
    else if (c === '}') d--;
    p++;
  }
  const body = src.slice(start, p - 1);
  /* 顶层 key：深度 1 处的 key: */
  const keys = [];
  let depth = 0, q = null, j = 0;
  const out = [];
  while (j < body.length) {
    const c = body[j];
    if (q === "'" || q === '"' || q === '`') {
      if (c === '\\') { j += 2; continue; }
      if (c === q) q = null;
    } else if (q === '//') { if (c === '\n') q = null; }
    else if (q === '/*') { if (c === '*' && body[j + 1] === '/') { q = null; j += 2; continue; } }
    else if (c === "'" || c === '"' || c === '`') q = c;
    else if (c === '/' && body[j + 1] === '/') q = '//';
    else if (c === '/' && body[j + 1] === '*') q = '/*';
    else if (c === '{' || c === '[' || c === '(') depth++;
    else if (c === '}' || c === ']' || c === ')') depth--;
    else if (depth === 0 && /[A-Za-z_$]/.test(c) && !/[\w$.]/.test(body[j - 1] || ' ')) {
      const mm = /^([A-Za-z_$][\w$]*)\s*:/.exec(body.slice(j));
      if (mm) { out.push(mm[1]); j += mm[0].length; continue; }
    }
    j++;
  }
  return out;
}

const dict = fs.readFileSync('site-i18n.js', 'utf8');
const mg = fs.readFileSync('merge.html', 'utf8');
const cl = fs.readFileSync('clean.html', 'utf8');

const dKeys = blockKeys(dict, 'const I18N = {', 'zh-CN');
const mKeys = blockKeys(mg, 'const I18N = {', 'zh-CN');
const cKeys = blockKeys(cl, 'const I18N = {', 'zh-CN');

console.log('共享词典 site-i18n.js  zh-CN 顶层词条：', dKeys.length);
console.log('特效页 merge.html      zh-CN 顶层词条：', mKeys.length);
console.log('清洗页 clean.html      zh-CN 顶层词条：', cKeys.length);

const dSet = new Set(dKeys);
const mReuse = mKeys.filter(k => dSet.has(k));
const cReuse = cKeys.filter(k => dSet.has(k));
console.log('');
console.log('特效页能直接复用共享词典的：', mReuse.length, '/', mKeys.length,
  '→ 还需新翻', (mKeys.length - mReuse.length), '条 × 23 语 =', (mKeys.length - mReuse.length) * 23);
console.log('清洗页能直接复用共享词典的：', cReuse.length, '/', cKeys.length,
  '→ 还需新翻', (cKeys.length - cReuse.length), '条 × 25 语 =', (cKeys.length - cReuse.length) * 25);

fs.writeFileSync('_gap279.json', JSON.stringify({
  dictKeys: dKeys,
  mergeKeys: mKeys, mergeReuse: mReuse, mergeNew: mKeys.filter(k => !dSet.has(k)),
  cleanKeys: cKeys, cleanReuse: cReuse, cleanNew: cKeys.filter(k => !dSet.has(k)),
}, null, 1));
console.log('\n明细已写 _gap279.json');
