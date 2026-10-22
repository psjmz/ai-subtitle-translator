/* _report339.js —— 生成翻译质量分布报告
 *
 * 思路：把「我的译文」和「Google 机器译文」做字符 trigram 相似度。
 * ⚠️ 这个分数**不是准确率** —— 措辞不同也会把分压低（同义词、语序、本地化表达）。
 *    它的用途是：分数越低 = 与机器译法分歧越大 = 越值得人工看一眼。
 *    低分不代表我错了（实测机器在 Cues/graceful 这类领域词上错得更多）。
 *
 * 用法：node _report339.js            # 扫全部已有分片
 *       node _report339.js bn ta      # 只看指定语言
 * 输出：_tr/REPORT.md
 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const DIR = __dirname;
const CORE = JSON.parse(fs.readFileSync(path.join(DIR, '_core338.json'), 'utf8'));
const KEYS = Object.keys(CORE);

const args = process.argv.slice(2).filter(a => !a.startsWith('-'));
let langs = args.length ? args : fs.readdirSync(path.join(DIR, 'i18n'))
  .filter(f => /^ui-[a-z]{2,3}\.js$/.test(f)).map(f => f.slice(3, -3)).sort();

const grams = (s, n) => {
  s = String(s).toLowerCase().replace(/\s+/g, '');
  const S = new Set();
  for (let i = 0; i + n <= s.length; i++) S.add(s.slice(i, i + n));
  return S;
};
const jac = (a, b) => {
  const A = grams(a, 3), B = grams(b, 3);
  if (!A.size || !B.size) return 0;
  let i = 0; for (const x of A) if (B.has(x)) i++;
  return i / (A.size + B.size - i);
};

const rows = [];
for (const lang of langs) {
  const js = path.join(DIR, 'i18n', 'ui-' + lang + '.js');
  if (!fs.existsSync(js)) continue;
  const ctx = { window: {} }; ctx.globalThis = ctx; vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(path.join(DIR, 'site-i18n.js'), 'utf8') + ';globalThis.__I=I18N;', ctx);
  vm.runInContext(fs.readFileSync(js, 'utf8'), ctx);
  const d = ctx.__I[lang] || {};

  const rp = path.join(DIR, '_tr', 'ref-' + lang + '.json');
  if (!fs.existsSync(rp)) { rows.push({ lang, avg: null, low: [], n: 0 }); continue; }
  const ref = JSON.parse(fs.readFileSync(rp, 'utf8'));
  if (ref.length !== KEYS.length) { rows.push({ lang, avg: null, low: [], n: ref.length }); continue; }

  let sum = 0, cnt = 0;
  const low = [];
  for (let i = 0; i < KEYS.length; i++) {
    const en = String(CORE[KEYS[i]].en);
    const mine = String(d[KEYS[i]] === undefined ? en : d[KEYS[i]]);
    if (en.length < 12) continue;                 /* 短标签不比 */
    const w = jac(mine, ref[i] || '');
    sum += w; cnt++;
    if (w < 0.25) low.push({ k: KEYS[i], w: w, en: en.slice(0, 80), mine: mine.slice(0, 80), ref: String(ref[i] || '').slice(0, 80) });
  }
  rows.push({ lang, avg: cnt ? sum / cnt : null, low: low, n: KEYS.length });
}

const withData = rows.filter(r => r.avg !== null).sort((a, b) => a.avg - b.avg);
const noData = rows.filter(r => r.avg === null);

let md = '# 界面语言分片·翻译质量分布报告\n\n';
md += '生成时间：' + new Date().toISOString() + '\n\n';
md += '共 ' + rows.length + ' 份分片，其中 ' + withData.length + ' 份有机器对照基准。\n\n';

md += '## 怎么看这个分数\n\n';
md += '- 分数 = 我的译文 与 Google 机器译文 的字符 trigram 相似度\n';
md += '- **它不是准确率**：同义词、语序、本地化表达都会压低分数\n';
md += '- 用途只有一个：**分数越低，越值得人工看一眼**\n';
md += '- 实测机器在领域词上错得更多（`Cues`→提示、`graceful`→可怜的），所以低分不等于我错\n\n';

md += '## 分布（由低到高，低分优先复核）\n\n';
md += '| 排名 | 语言 | 平均分 | 分歧条目数(<0.25) |\n|---|---|---|---|\n';
withData.forEach((r, i) => {
  md += '| ' + (i + 1) + ' | ' + r.lang + ' | ' + r.avg.toFixed(3) + ' | ' + r.low.length + ' |\n';
});
if (noData.length) {
  md += '\n尚无机器对照基准：' + noData.map(r => r.lang).join(', ') + '\n';
}

md += '\n## 分歧最大的条目（每种语言最多 5 条）\n\n';
for (const r of withData.slice(0, 12)) {
  if (!r.low.length) continue;
  md += '### ' + r.lang + '（均分 ' + r.avg.toFixed(3) + '）\n\n';
  for (const x of r.low.sort((a, b) => a.w - b.w).slice(0, 5)) {
    md += '- **' + x.k + '**（相似度 ' + x.w.toFixed(2) + '）\n';
    md += '  - 英：' + x.en + '\n';
    md += '  - 我：' + x.mine + '\n';
    md += '  - 机：' + x.ref + '\n';
  }
  md += '\n';
}

fs.writeFileSync(path.join(DIR, '_tr', 'REPORT.md'), md);
console.log('已生成 _tr/REPORT.md');
console.log('\n均分最低 8 种（优先人工复核）：');
withData.slice(0, 8).forEach((r, i) => console.log('  ' + (i + 1) + '. ' + r.lang + '  ' + r.avg.toFixed(3) + '  分歧 ' + r.low.length + ' 条'));
