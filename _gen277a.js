/* v0.9.277 一次性生成脚本·第一步：从 index.html 抽走界面字典，落到 site-i18n.js
   用法：node _gen277a.js
   ⚠️ 只在 v0.9.277 这次拆家用，验完就删。 */
'use strict';
const fs = require('fs');
const L = fs.readFileSync('index.html', 'utf8').split('\n');
const seg = (a, b) => L.slice(a - 1, b).join('\n');

/* 抽走这五段：UI_LANGS(2072) / I18N(2073-7507) / UI(7508) / t(7509-7514) / detectUiLang(7539-7576)
   留下：issTxt(7515-7522) 与 srvErrTxt(7523-7538) —— 这两个只有工作台用 */
const CHECKS = [
  ['UI_LANGS', 2072, 2072, (s) => /^const UI_LANGS = \[/.test(s) && /Română'\] \];\s*$/.test(s)],
  ['I18N', 2073, 7507, (s) => /^const I18N = \{/.test(s) && /^\};$/.test(s.split('\n').pop())],
  ['UI', 7508, 7508, (s) => /^const UI = \{/.test(s)],
  ['t', 7509, 7514, (s) => /^function t\(k\)\{/.test(s) && /^\}$/.test(s.split('\n').pop())],
  ['detectUiLang', 7539, 7576, (s) => /^function detectUiLang\(\)\{/.test(s) && /^\}$/.test(s.split('\n').pop())]
];
let bad = 0;
CHECKS.forEach(([n, a, b, f]) => {
  const ok = f(seg(a, b));
  if (!ok) { bad++; console.log('✗ ' + n + ' 边界不对（行 ' + a + '-' + b + '）'); }
});
if (bad) { console.log('中止'); process.exit(1); }
console.log('✓ 5 段抽取范围核对通过');

const HEAD = '/* =============================================================================\n' +
  '   site-i18n.js —— 全站界面多语言字典的唯一副本（v0.9.277）\n' +
  '\n' +
  '   为什么抽出来：\n' +
  '   v0.9.277 起首页拆成两块 —— / 是落地页、/translate.html 是字幕翻译工作台。\n' +
  '   两页都要用同一份 27 语界面字典，各留在自己的内联脚本里就会变成两份、改一处忘一处。\n' +
  '   所以把 UI_LANGS / I18N / UI / t() / detectUiLang() 集中到本文件，两个页面共同引用。\n' +
  '\n' +
  '   ⚠️ 本文件必须在 srt-core.js 与页面内联脚本**之前**加载：\n' +
  '      顶层 const / function 会进全局词法环境，后面的 classic script 直接可见，\n' +
  '      但加载顺序反了的话，内联脚本执行时会 ReferenceError。\n' +
  '   ⚠️ 引用它的页面里**不许再写** const UI_LANGS / const I18N / const UI / function t ——\n' +
  '      重复声明是 SyntaxError，整段脚本直接失效。\n' +
  '   ============================================================================= */\n' +
  "'use strict';\n\n";
const TAIL = '\n\n/* 给需要在别的作用域里取用的脚本留个出口（页面内联脚本一般直接用全局 UI / t 即可） */\n' +
  'window.SiteI18N = { UI_LANGS: UI_LANGS, I18N: I18N, UI: UI, t: t, detectUiLang: detectUiLang };\n';
const body = [seg(2072, 2072), '', seg(2073, 7507), '', seg(7508, 7508), '', seg(7509, 7514), '', seg(7539, 7576)].join('\n');
fs.writeFileSync('site-i18n.js', HEAD + body + TAIL);

/* index.html：抽走那五段，留一行说明别处去哪了 */
const marker = '  /* v0.9.277：界面字典（UI_LANGS / I18N / UI / t / detectUiLang）已抽到 site-i18n.js，\n' +
  '     由页面在本文件之前引入 —— 落地页与工作台共用一份，避免改一处忘一处。\n' +
  '     ⚠️ 本文件里不要再重复声明这几个名字（重复顶层 const 是 SyntaxError，整段脚本会失效）。 */';
const kept = [L.slice(0, 2071), [marker], L.slice(7514, 7538), L.slice(7576)].map((x) => x.join('\n')).join('\n');
fs.writeFileSync('index.html', kept);

const out = fs.readFileSync('index.html', 'utf8');
const A = (c, m) => { if (!c) { console.log('✗ ' + m); process.exit(1); } console.log('✓ ' + m); };
console.log('\nsite-i18n.js：' + fs.statSync('site-i18n.js').size + ' 字节');
console.log('index.html：' + out.split('\n').length + ' 行（原 ' + L.length + '）');
A(!/const UI_LANGS/.test(out) && !/const I18N\s*=/.test(out) && !/const UI = \{/.test(out) && !/function detectUiLang/.test(out), 'page 里已无重名声明');
A(/function issTxt/.test(out) && /function srvErrTxt/.test(out), 'issTxt / srvErrTxt 留在页面里');
fs.writeFileSync('_idx277-mid.html', out);   /* 第二步 _gen277b.js 的输入快照 */
console.log('✓ 中间态存到 _idx277-mid.html');
