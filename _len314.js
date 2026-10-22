/* _len314.js：盘点 SEO 表 title/desc 长度（v0.9.314 前置盘点，非交付件）
   从 server.js 源码括号配对抠出每张 SEO 表，new Function 求值成对象后量长度。 */
const fs = require('fs');
const SRC = fs.readFileSync('server.js', 'utf8');

const NAMES = ['SEO', 'SEO_MERGE', 'SEO_CLEAN', 'SEO_TRANSLATE', 'SEO_CONVERT',
  'SEO_BILINGUAL', 'SEO_SHIFT', 'SEO_REPAIR', 'SEO_EXTRACT', 'SEO_GLOSSARY',
  'SEO_VIDEOSUB', 'SEO_HANCONV'];
const LANGS = ['zh-CN', 'zh-TW', 'en', 'ja', 'es', 'pt', 'ko', 'de', 'fr', 'id', 'hi', 'th', 'vi', 'ru', 'it', 'ar', 'tr', 'nl', 'pl', 'sv', 'cs', 'uk', 'da', 'fi', 'el', 'he', 'ro'];

function grab(name) {
  const m = SRC.indexOf('const ' + name + ' = {');
  if (m < 0) throw new Error('找不到 ' + name);
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

let nDesc = 0, nTitle = 0, nTitle60 = 0, nDesc160 = 0;
const longDesc = [], longTitle = [], runon = [];
for (const n of NAMES) {
  const t = tables[n];
  for (const l of LANGS) {
    const e = t[l];
    if (!e) { console.log('!! 缺语言', n, l); continue; }
    const d = (e.desc || '').length, ti = (e.title || '').length;
    if (d >= 200) { nDesc++; longDesc.push([n, l, d]); }
    if (d > 160 && d < 200) nDesc160++;
    if (ti >= 71) { nTitle++; longTitle.push([n, l, ti]); }
    if (ti > 60 && ti < 71) nTitle60++;
    /* 连写检测：只查英文标题 —— 两个小写字母后紧跟大写（camelcase），或「小写.大写」这类粘连 */
    if (l === 'en' && /[a-z]{2,}[A-Z][a-z]/.test(e.title || '')) runon.push([n, e.title]);
  }
}
console.log('=== desc ≥200：', nDesc, ' 条（目标压到 ≤160）');
console.log('=== desc 161–199：', nDesc160, ' 条（不在本次范围）');
console.log('=== title ≥71：', nTitle, ' 条（目标压到 ≤60）');
console.log('=== title 61–70：', nTitle60, ' 条（不在本次范围）');
console.log('=== en 标题 camelcase 连写：', runon.length);
runon.forEach(r => console.log('   ', r[0], '|', r[1]));
console.log('\n--- desc ≥200 明细（页/语/长度）---');
longDesc.sort((a, b) => b[2] - a[2]).forEach(x => console.log(x[2], x[0], x[1]));
console.log('\n--- title ≥71 明细 ---');
longTitle.sort((a, b) => b[2] - a[2]).forEach(x => console.log(x[2], x[0], x[1]));
fs.writeFileSync('/tmp/_len314.json', JSON.stringify({ longDesc, longTitle }, null, 1));
