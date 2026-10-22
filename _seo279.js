/* v0.9.279：把四张 SEO 表超长的 title / desc 压进 Google 的展示宽度内
   （title ≤ 60 视觉宽、desc ≤ 155 字符）。只动超标的那些，达标的原样不动。 */
const fs = require('fs');

const WIDE = /[ᄀ-ᇿ㄰-㆏぀-ヿ㐀-䶿一-鿿가-힯豈-﫿︰-﹏＀-｠]/;
function width(s) { return [...String(s)].reduce((a, c) => a + (WIDE.test(c) ? 2 : 1), 0); }

const sv = fs.readFileSync('server.js', 'utf8');

/* 语言块切分：表体内按顶层 'xx': { */
function langRanges(name) {
  const i = sv.indexOf('const ' + name + ' = {');
  if (i < 0) return [];
  /* ⚠️ 只切到本表结束（第一个顶格 };）——否则会把后面几张表也算进来 */
  const close = sv.indexOf('\n};', i);
  const head = sv.slice(i, close < 0 ? i + 400000 : close + 3);
  const re = /\n[ \t]*'([a-zA-Z\-]{2,10})':\s*\{/g;
  const hits = [];
  let m;
  while ((m = re.exec(head))) hits.push({ lang: m[1], at: i + m.index, bodyAt: i + m.index + m[0].length });
  return hits.map((h, k) => ({ lang: h.lang, start: h.at, bodyStart: h.bodyAt, end: (k + 1 < hits.length ? hits[k + 1].at : i + head.length) }));
}

/* SEO_TRANSLATE 用的是双引号，两种都要认 */
function field(seg, name) {
  const re = new RegExp("(?:^|[,\\s])" + name + ":\\s*(['\"])((?:[^'\"\\\\]|\\\\.)*?)\\1");
  const m = re.exec(seg);
  return m ? m[2] : null;
}

const TABLES = ['SEO', 'SEO_MERGE', 'SEO_CLEAN', 'SEO_TRANSLATE'];
const jobs = [];
TABLES.forEach(t => {
  langRanges(t).forEach(r => {
    const seg = sv.slice(r.bodyStart, r.end);
    const ti = field(seg, 'title'), de = field(seg, 'desc');
    if (ti == null && de == null) return;
    const overT = ti != null && width(ti) > 60;
    const overD = de != null && de.length > 155;
    if (overT || overD) jobs.push({ table: t, lang: r.lang, title: ti, desc: de, overT, overD, w: width(ti || ''), dl: (de || '').length });
  });
});

console.log('需要压缩的条目：' + jobs.length);
const byT = {};
jobs.forEach(j => { byT[j.table] = (byT[j.table] || 0) + 1; });
console.log(byT);
console.log('\n样例（前 12）：');
jobs.slice(0, 12).forEach(j => console.log('  [' + j.table + '/' + j.lang + '] t宽' + j.w + ' d长' + j.dl + '\n     T: ' + (j.title || '').slice(0, 90) + '\n     D: ' + (j.desc || '').slice(0, 90)));
fs.writeFileSync('_seo279-todo.json', JSON.stringify(jobs, null, 1));
console.log('\n明细 → _seo279-todo.json');
