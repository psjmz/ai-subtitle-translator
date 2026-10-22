/* _cmpnav.js —— 对账生成物与线上版（备份）的结构差异，一次性排查脚本 */
'use strict';
const fs = require('fs');
const A = fs.readFileSync(__dirname + '/site-topnav.js.bak-pre339nav', 'utf8');
const B = fs.readFileSync(__dirname + '/site-topnav.js', 'utf8');

function seg(s, name) {
  const i = s.indexOf('var ' + name + ' =');
  if (i < 0) return null;
  const j = s.indexOf('\n  };', i);
  return s.slice(i, j < 0 ? i + 300 : j + 4);
}
for (const n of ['TOOLS', 'GROUPS', 'MAIN', 'SEL_IDS', 'EXT', 'ALLHREF']) {
  const a = seg(A, n), b = seg(B, n);
  const same = a === b;
  console.log('--- ' + n + '：' + (same ? '一致' : '★ 不一致'));
  if (!same) {
    console.log('  线上: ' + String(a).replace(/\s+/g, ' ').slice(0, 260));
    console.log('  生成: ' + String(b).replace(/\s+/g, ' ').slice(0, 260));
  }
}

function ic(s) { const m = s.match(/var ICONS = (\{[\s\S]*?\});/); return m ? m[1] : ''; }
const ia = ic(A), ib = ic(B);
console.log('--- ICONS：' + (ia === ib ? '一致' : '★ 不一致'));
if (ia !== ib) {
  const ka = [...ia.matchAll(/'([a-z]{2})':/g)].map(m => m[1]);
  const kb = [...ib.matchAll(/'([a-z]{2})':/g)].map(m => m[1]);
  console.log('  线上键: ' + ka.join(','));
  console.log('  生成键: ' + kb.join(','));
  console.log('  线上独有: ' + (ka.filter(x => kb.indexOf(x) < 0).join(',') || '无'));
  console.log('  生成独有: ' + (kb.filter(x => ka.indexOf(x) < 0).join(',') || '无'));
}

function css(s) { const m = s.match(/var CSS = \[([\s\S]*?)\n  \];/); return m ? m[1].replace(/\s+/g, '') : ''; }
const ca = css(A), cb = css(B);
console.log('--- CSS：' + (ca === cb ? '一致' : '★ 不一致 线上 ' + ca.length + ' / 生成 ' + cb.length + ' 字符'));
if (ca !== cb) {
  /* 找到第一个不同的位置，打印上下文 */
  let i = 0; while (i < ca.length && i < cb.length && ca[i] === cb[i]) i++;
  console.log('  首个差异 @' + i);
  console.log('  线上: …' + ca.slice(Math.max(0, i - 60), i + 80));
  console.log('  生成: …' + cb.slice(Math.max(0, i - 60), i + 80));
}

/* 三张词典的键集是否一致 */
function keys(s, varName) {
  const m = s.match(new RegExp("var " + varName + " = \\{[\\s\\S]*?\\n  \\};"));
  if (!m) return [];
  const first = m[0].match(/'[a-zA-Z-]+': \{[^}]*\}/);
  return first ? [...first[0].matchAll(/([a-zA-Z]+):/g)].map(x => x[1]) : [];
}
for (const n of ['N', 'D', 'T']) {
  const ka = keys(A, n), kb = keys(B, n);
  console.log('--- 词典 ' + n + '：' + (ka.join() === kb.join() ? '一致（' + ka.length + ' 键）' : '★ 不一致'));
  if (ka.join() !== kb.join()) {
    console.log('  线上: ' + ka.join(','));
    console.log('  生成: ' + kb.join(','));
  }
}
