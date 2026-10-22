/* v0.9.279：从三个文件的 I18N 里抽出「语言块 → key → value」映射（含转义还原） */
const fs = require('fs');

function blockBody(src, anchor, lang) {
  const i = src.indexOf(anchor);
  if (i < 0) throw new Error('找不到 ' + anchor);
  const re = new RegExp("\\n[ \\t]*'" + lang + "':\\s*\\{");
  const m = re.exec(src.slice(i));
  if (!m) return null;
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
  return src.slice(start, p - 1);
}

/* 在块体里按深度 0 扫 key: <字符串字面量> */
function parseBlock(body) {
  const out = {};
  let depth = 0, j = 0;
  while (j < body.length) {
    const c = body[j];
    if (c === "'" || c === '"' || c === '`') {          /* 跳过字面量 */
      const q0 = c; let k = j + 1;
      while (k < body.length) {
        if (body[k] === '\\') { k += 2; continue; }
        if (body[k] === q0) break;
        k++;
      }
      j = k + 1; continue;
    }
    if (c === '/' && body[j + 1] === '/') { const n = body.indexOf('\n', j); j = n < 0 ? body.length : n + 1; continue; }
    if (c === '/' && body[j + 1] === '*') { const n = body.indexOf('*/', j); j = n < 0 ? body.length : n + 2; continue; }
    if (c === '{' || c === '[' || c === '(') depth++;
    else if (c === '}' || c === ']' || c === ')') depth--;
    else if (depth === 0 && /[A-Za-z_$]/.test(c) && !/[\w$.]/.test(body[j - 1] || ' ')) {
      const mm = /^([A-Za-z_$][\w$]*)\s*:\s*/.exec(body.slice(j));
      if (mm) {
        const vStart = j + mm[0].length;
        const q0 = body[vStart];
        if (q0 === "'" || q0 === '"' || q0 === '`') {
          let k = vStart + 1; let raw = '';
          while (k < body.length) {
            if (body[k] === '\\') {
              const nx = body[k + 1];
              raw += nx === 'n' ? '\n' : nx === 't' ? '\t' : nx === 'r' ? '\r' : nx;
              k += 2; continue;
            }
            if (body[k] === q0) break;
            raw += body[k]; k++;
          }
          out[mm[1]] = raw;
          j = k + 1; continue;
        }
      }
    }
    j++;
  }
  return out;
}

function dump(file, anchor, langs) {
  const src = fs.readFileSync(file, 'utf8');
  const o = {};
  langs.forEach(l => {
    const b = blockBody(src, anchor, l);
    o[l] = b ? parseBlock(b) : null;
  });
  return o;
}

const res = {
  dict: dump('site-i18n.js', 'const I18N = {', ['zh-CN', 'zh-TW', 'en', 'ja']),
  merge: dump('merge.html', 'const I18N = {', ['zh-CN', 'zh-TW', 'en', 'ja']),
  clean: dump('clean.html', 'const I18N = {', ['zh-CN', 'en']),
};
Object.keys(res).forEach(f => Object.keys(res[f]).forEach(l =>
  console.log(f + '.' + l + ' → ' + (res[f][l] ? Object.keys(res[f][l]).length : 'null') + ' 条')));
fs.writeFileSync('_extract279.json', JSON.stringify(res, null, 1));
console.log('\n已写 _extract279.json');
