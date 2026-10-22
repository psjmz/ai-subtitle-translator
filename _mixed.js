/* _mixed.js —— 检查顶栏译文有没有「混入别的文字系统」
 *
 * 起因：bo（藏语）的 tnMore 被 Gemini 写成 ལག་ཆ་མfམ། —— 藏文里夹了一个阿拉伯字母 ف。
 * 这种错肉眼很难发现（加上一个外来字母看起来"也像字"），对母语者却是明显的乱码。
 *
 * 判据（不猜每种语言该用什么文字，让它自己投票）：
 *   一种语言的全部译文里，出现频次最高的那个 Unicode Script 记为「主文字」；
 *   任何一条译文里只要出现不属于主文字的**字母**就报出来。
 *   拉丁字母放行（Batch / MP4 / AI 这类借词全世界都在用），主文字本身是拉丁则反过来管。
 *
 * 跑法：node _mixed.js        （只报告，不改文件）
 *      _gemclean.js 会 require 这里的 scriptsOf，判据保持单一来源。
 */
'use strict';
const fs = require('fs');
const path = require('path');

const DIR = __dirname;
const NAV = JSON.parse(fs.readFileSync(path.join(DIR, '_navsrc.json'), 'utf8'));
const KEYS = NAV.keys.slice();

/* 逐个查太慢，先把 Unicode 里的字母按 script 归类 —— 只需要覆盖本站 100 语会用到的 */
const SCRIPTS = ['Latin', 'Cyrillic', 'Greek', 'Arabic', 'Hebrew', 'Thai', 'Devanagari', 'Bengali',
  'Tamil', 'Telugu', 'Kannada', 'Malayalam', 'Sinhala', 'Gujarati', 'Gurmukhi', 'Oriya',
  'Tibetan', 'Myanmar', 'Khmer', 'Lao', 'Georgian', 'Armenian', 'Ethiopic', 'Han', 'Hiragana',
  'Katakana', 'Hangul', 'Thaana', 'Syriac', 'Cherokee'];
const RE = {};
for (const s of SCRIPTS) RE[s] = new RegExp('\\p{Script=' + s + '}', 'u');

function scriptsOf(str) {
  const set = new Set();
  for (const ch of str) {
    if (!/\p{L}/u.test(ch)) continue;          /* 数字标点不看 */
    let hit = null;
    for (const s of SCRIPTS) if (RE[s].test(ch)) { hit = s; break; }
    set.add(hit || ('other:' + ch.codePointAt(0).toString(16)));
  }
  return set;
}

/* 单源判据：给定整份译文，算出主文字 + 逐条列出混了别的字母的键。
   _gemclean.js 复用这份，避免「检查」和「修复」用两套标准。 */
function audit(tr) {
  const vote = {};
  for (const k of KEYS) for (const s of scriptsOf(String(tr[k] || ''))) vote[s] = (vote[s] || 0) + 1;
  const main = Object.keys(vote).sort((a, b) => vote[b] - vote[a])[0];
  const rows = [];
  if (main) {
    for (const k of KEYS) {
      const v = String(tr[k] || '');
      if (!v) continue;
      for (const s of scriptsOf(v)) {
        if (s === main) continue;
        if (s === 'Latin' && main !== 'Latin') continue;   /* 借词、专有名词正常 */
        if (main === 'Latin' && scriptsOf(v).size <= 2) continue; /* 拉丁语言夹一两个外来符号也不管 */
        rows.push({ key: k, val: v, mixed: s });
        break;
      }
    }
  }
  return { main: main || 'Latin', rows };
}

module.exports = { scriptsOf, audit, KEYS };

if (require.main !== module) return;

let langs = 0, bad = 0;
const report = [];
for (const f of fs.readdirSync(path.join(DIR, '_trnav'))) {
  if (!/^[a-z]{2,3}(-[A-Za-z]{2,4})?\.json$/.test(f)) continue;
  const lang = f.replace(/\.json$/, '');
  const tr = JSON.parse(fs.readFileSync(path.join(DIR, '_trnav', f), 'utf8'));
  langs++;

  /* 主文字投票 */
  const { main, rows } = audit(tr);
  if (!main) continue;

  /* 逐条查混字 */
  const rws = rows.map(r => r.key + ' = ' + r.val + '   ⟵ 混入 ' + r.mixed);
  if (rws.length) { bad++; report.push('[' + lang + '] 主文字 ' + main + '：'); rws.forEach(r => report.push('    ' + r)); }
}

console.log('检查 ' + langs + ' 种语言的主文字一致性');
console.log('混入非主文字大众脚本的语种：' + bad);
if (report.length) report.forEach(r => console.log(r));
process.exit(0);
