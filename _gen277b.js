/* v0.9.277 一次性生成脚本：把 index.html 重写成纯落地页
   （工作台已在 _gen277.js 里拆去 translate.html）
   用法：node _gen277b.js
   ⚠️ 只在 v0.9.277 这次拆家用，验完就删。 */
'use strict';
const fs = require('fs');

const VER = '0.9.277';
const L = fs.readFileSync('_idx277-mid.html', 'utf8').split('\n');
const at = (n) => L[n - 1];
const seg = (a, b) => L.slice(a - 1, b).join('\n');

/* ---------- 边界核对 ---------- */
const EXPECT = [
  [1, '<!DOCTYPE html>'], [1008, '</head>'], [1009, '<body>'],
  [1014, '<div id="viewLanding">'], [1240, '</div>'],
  [1245, '<div id="viewWorkspace">'], [1811, '</div>'],
  [1813, '<!-- 共享页脚（两个视图之外） -->'], [1816, ''],
  [1817, '<script src="srt-core.js'], [1818, '<script>'],
  [7807, '</script>'], [7808, '<script src="site-nav.js" data-tool="tr"></script>'],
  [7809, '</body>'], [7810, '</html>']
];
let bad = 0;
EXPECT.forEach(([n, head]) => {
  if (!at(n).startsWith(head)) { bad++; console.log('✗ 第 ' + n + ' 行不是 "' + head + '" → ' + at(n).slice(0, 70)); }
});
if (bad) { console.log('边界不对，中止'); process.exit(1); }
console.log('✓ ' + EXPECT.length + ' 处边界核对通过');

/* ---------- 复用区块：数字带 / 六个细节 + 导出橱窗 / 关于 ---------- */
const chk = (name, s, firstKey, lastLine) => {
  const a = s.split('\n')[0], b = s.split('\n').slice(-1)[0];
  const ok1 = a.indexOf(firstKey) >= 0, ok2 = (b.trim() === lastLine);
  console.log((ok1 && ok2 ? '✓ ' : '✗ ') + name + '：首行 ' + a.slice(0, 34) + ' | 末行 ' + b.slice(0, 20));
  if (!ok1 || !ok2) process.exit(1);
};
const stats = seg(1117, 1126);
const abilities = seg(1128, 1213);
const about = seg(1215, 1226);
chk('数字带', stats, 'class="section"', '</div>');
chk('能力+导出', abilities, '<!-- 优势 -->', '</div>');
chk('关于', about, '<!-- 关于我们', '</div>');

/* 六个细节那两块的间距微调：详解段自带 46px 分隔，别再叠 56px */
const abilitiesTuned = abilities.split('style="margin-top:56px"').join('style="margin-top:20px"');

/* ---------- 新落地页 body ---------- */
let part = fs.readFileSync('_part277.html', 'utf8');
const before = part;
part = part.replace('<!--INSERT-HEAD-->', stats);
part = part.replace('<!--INSERT-ABILITIES-->', abilitiesTuned);
part = part.replace('<!--INSERT-TAIL-->', about);
if (part === before || /INSERT-/.test(part)) { console.log('✗ 占位没替换干净'); process.exit(1); }
console.log('✓ 三个占位全部填上');

/* ---------- head：追加新样式 ---------- */
let head = seg(1, 1008);
/* 版号检查必须在注入新样式**之前**做：新样式的注释里本来就写着 v0.9.277 */
{
  const stuckBefore = (head.match(/v0\.9\.277/g) || []).length;
  if (stuckBefore) { console.log('✗ 原 head 里不该出现 277 标注（' + stuckBefore + ' 处）'); process.exit(1); }
  console.log('✓ 原 head 未被版号误改（' + (head.match(/v0\.9\.276/g) || []).length + ' 处「功能出处」注释原样保留）');
}
const css = fs.readFileSync('_part277.css', 'utf8');
if (head.indexOf('.det-cta') >= 0) { console.log('✗ 新样式已经在 head 里了（重复注入）'); process.exit(1); }
head = head.replace('</style>', css + '</style>');
if (head.indexOf('.det-cta') < 0) { console.log('✗ 新样式没注入进去'); process.exit(1); }
console.log('✓ 新样式已追加到 head');

/* ---------- 落地页脚本（取代原工作台那一大段） ---------- */
const landing = [
  '<script src="site-i18n.js?v=' + VER + '"></script><!-- v0.9.277：27 语界面字典，与 /translate.html 共用一份 -->',
  '<script>',
  fs.readFileSync('_landing277.js', 'utf8').replace(/\s*$/, ''),
  '</script>',
  '<script src="site-nav.js" data-tool="tr"></script>'
].join('\n');

/* ---------- 拼装 ---------- */
const out = [
  head,
  '<body>',
  '',
  part,
  '',
  seg(1813, 1816),   /* 共享页脚 */
  '',
  landing,
  '</body>',
  '</html>',
  ''
].join('\n');

fs.writeFileSync('index.html', out);

const A = (cond, msg) => { if (!cond) { console.log('✗ ' + msg); process.exit(1); } console.log('✓ ' + msg); };
console.log('\n新 index.html：' + out.length + ' 字节 / ' + out.split('\n').length + ' 行');
A(!/id="viewWorkspace"/.test(out), '工作台 DOM 已从首页移除');
A(!/<script src="srt-core\.js/.test(out), '首页不再加载翻译引擎');
A(out.indexOf('site-i18n.js') > 0, '首页认了共享字典');
A(!/viewLanding/.test(out.slice(out.indexOf('</body>'))), 'body 之后没有落地页残留');
const body = out.slice(out.indexOf('<body>'), out.indexOf('</body>'));
const open = (body.match(/<div\b/g) || []).length, close = (body.match(/<\/div>/g) || []).length;
A(open === close, 'div 配平（开 ' + open + ' / 闭 ' + close + '）');
const so = (body.match(/<section\b/g) || []).length, sc = (body.match(/<\/section>/g) || []).length;
A(so === sc, 'section 配平（开 ' + so + ' / 闭 ' + sc + '）');
const ao = (body.match(/<a\b/g) || []).length, ac = (body.match(/<\/a>/g) || []).length;
A(ao === ac, 'a 标签配平（开 ' + ao + ' / 闭 ' + ac + '）');
A((out.match(/class="ver">v0\.9\.277/g) || []).length === 1, '顶栏版号 277');
A(!/<script src="srt-core/.test(out), '确认无 srt-core 的 script 标签');
