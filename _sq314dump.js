/* _sq314dump.js：把 desc≥200 / title≥71 的原文导出来供逐条改写（非交付件） */
const fs = require('fs');
const SRC = fs.readFileSync('server.js', 'utf8');
const NAMES = ['SEO', 'SEO_MERGE', 'SEO_CLEAN', 'SEO_TRANSLATE', 'SEO_CONVERT',
  'SEO_BILINGUAL', 'SEO_SHIFT', 'SEO_REPAIR', 'SEO_EXTRACT', 'SEO_GLOSSARY',
  'SEO_VIDEOSUB', 'SEO_HANCONV'];
function grab(name) {
  const m = SRC.indexOf('const ' + name + ' = {');
  let i = m + ('const ' + name + ' = ').length, depth = 0, started = false;
  while (i < SRC.length) {
    const c = SRC[i];
    if (c === '{') { depth++; started = true; }
    else if (c === '}') { depth--; if (started && depth === 0) { i++; break; } }
    i++;
  }
  return SRC.slice(m + ('const ' + name + ' = ').length, i);
}
const tables = {};
for (const n of NAMES) tables[n] = (new Function('return (' + grab(n) + ')'))();
const out = [];
for (const n of NAMES) {
  const t = tables[n];
  for (const l of Object.keys(t)) {
    const e = t[l];
    if (!e || !e.title) continue;
    if ((e.desc || '').length >= 200) out.push(['DESC', n, l, e.desc.length, e.desc]);
    if ((e.title || '').length >= 71) out.push(['TITLE', n, l, e.title.length, e.title]);
  }
}
/* 同一条目 title 和 desc 都超时合并输出 */
out.sort((a, b) => a[1].localeCompare(b[1]) || a[2].localeCompare(b[2]));
let buf = '';
for (const r of out) buf += '@@' + r[0] + '|' + r[1] + '|' + r[2] + '|' + r[3] + '\n' + r[4] + '\n';
fs.writeFileSync('/tmp/_sq314_dump.txt', buf);
console.log('总条数', out.length, '（desc', out.filter(x => x[0] === 'DESC').length, '/ title', out.filter(x => x[0] === 'TITLE').length, '）');
/* 每页分布 */
const byPage = {};
out.forEach(r => { byPage[r[1]] = (byPage[r[1]] || 0) + 1; });
console.log(byPage);
