/* 一次性脚本：给 site-i18n.js 的 27 个语言块补 fxGotoSub（去特效页引导卡的说明行）。
   插在 fxNoZh 之前（同一行，逗号分隔），只为 4 种语言给真翻译，其余回退英文。 */
const fs = require('fs');
const path = require('path');
const F = path.join(__dirname, 'site-i18n.js');
let s = fs.readFileSync(F, 'utf8');

const VAL = {
  'zh-CN': '字体 · 颜色 · 样式槽 · ASS / VTT',
  'zh-TW': '字體 · 顏色 · 樣式槽 · ASS / VTT',
  'ja': 'フォント · 色 · スタイルスロット · ASS / VTT',
};
const EN = 'Fonts · Colours · Style slots · ASS / VTT';

/* 定位每个语言块：'xx':{ … } —— 用块起点切分，再在块内找 fxNoZh */
const marks = [];
const re = /'([a-zA-Z-]{2,5})'\s*:\s*\{/g;
let m;
while ((m = re.exec(s))) marks.push({ lang: m[1], at: m.index });
console.log('语言块:', marks.length);

let done = 0, miss = [];
/* 从后往前改，避免位移影响前面的下标 */
for (let i = marks.length - 1; i >= 0; i--) {
  const from = marks[i].at;
  const to = (i + 1 < marks.length) ? marks[i + 1].at : s.length;
  const seg = s.slice(from, to);
  if (seg.indexOf('fxNoZh:') < 0) { miss.push(marks[i].lang); continue; }
  const lang = marks[i].lang;
  const val = (VAL[lang] || EN).replace(/'/g, "\\'");
  const seg2 = seg.replace('fxNoZh:', "fxGotoSub:'" + val + "', fxNoZh:");
  if (seg2 === seg) { miss.push(lang); continue; }
  s = s.slice(0, from) + seg2 + s.slice(to);
  done++;
}
fs.writeFileSync(F, s);
console.log('已注入', done, '个语言块；跳过', miss.join(',') || '无');

const chk = fs.readFileSync(F, 'utf8');
console.log('fxGotoSub 出现次数 =', (chk.match(/fxGotoSub:/g) || []).length, '（应为 27）');
