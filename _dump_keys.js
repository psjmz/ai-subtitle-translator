/* 导出 site-i18n 的 735 个键 + zh-CN/en 基准值，供翻译与校验。
   输出 _keys338.json 与一份可读清单 _keys338.txt（只读，不改站内文件）。 */
'use strict';
const fs = require('fs'), vm = require('vm');
const ctx = { window: {}, document: { documentElement: {}, addEventListener() {}, querySelector() { return null; }, querySelectorAll() { return []; } }, navigator: { language: 'zh-CN' }, localStorage: { getItem() { return null; }, setItem() {} }, location: { pathname: '/', search: '' } };
ctx.window = ctx; ctx.globalThis = ctx;
vm.runInNewContext(fs.readFileSync('site-i18n.js', 'utf8'), ctx, { timeout: 8000 });
const I = ctx.SiteI18N || ctx.window.SiteI18N;
const D = I.I18N || I;
const zh = D['zh-CN'], en = D['en'];
const keys = Object.keys(zh);
const rows = keys.map(k => ({ k, zh: zh[k], en: en[k] }));

/* 占位符普查 */
const ph = {};
rows.forEach(r => {
  (String(r.zh).match(/\{[^}]*\}/g) || []).forEach(p => { ph[p] = (ph[p] || 0) + 1; });
});

fs.writeFileSync('_keys338.json', JSON.stringify(rows, null, 2));
const txt = rows.map((r, i) => (i + 1) + '\t' + r.k + '\t' + r.zh + '\t' + r.en).join('\n');
fs.writeFileSync('_keys338.txt', txt);

console.log('键数 ' + keys.length);
console.log('占位符：' + (Object.keys(ph).length ? Object.keys(ph).map(k => k + '×' + ph[k]).join(' ') : '无'));
console.log('zh 平均长度 ' + Math.round(rows.reduce((a, r) => a + String(r.zh).length, 0) / rows.length) + ' 字');
console.log('含 HTML 标签的键 ' + rows.filter(r => /<[a-z/][^>]*>/i.test(String(r.zh))).length + ' 个');
console.log('\n=== 前 40 个键 ===');
rows.slice(0, 40).forEach((r, i) => console.log((i + 1) + '. ' + r.k + '  =  ' + r.zh));
