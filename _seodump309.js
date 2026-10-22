/* v0.9.309：把 server.js 里的十张 SEO 表导成 JSON，供修文案脚本读写
   做法：只截取「const SEO_ROUTE … 到 const SEO_PAGES 之前」那一段纯对象字面量，
   丢进 vm 里跑一遍导出。⚠️ 整份 server.js 不能直接 require —— 它会真的起服务。 */
'use strict';
const fs = require('fs');
const vm = require('vm');
const path = require('path');
const src = fs.readFileSync(path.join(__dirname, 'server.js'), 'utf8');
const a = src.indexOf('const SEO_ROUTE');
const b = src.indexOf('const SEO_PAGES');
if (a < 0 || b < 0) { console.log('边界没找到'); process.exit(2); }
const code = src.slice(a, b);
const names = ['SEO', 'SEO_TRANSLATE', 'SEO_MERGE', 'SEO_CLEAN', 'SEO_CONVERT', 'SEO_BILINGUAL', 'SEO_SHIFT', 'SEO_REPAIR', 'SEO_EXTRACT', 'SEO_GLOSSARY'];
const ctx = {};
vm.createContext(ctx);
vm.runInContext(code + '\n;__out = {' + names.map(n => n + ': (typeof ' + n + ' !== "undefined" ? ' + n + ' : null)').join(',') + ', OG_LOCALE: OG_LOCALE, SEO_LANGS: SEO_LANGS, SEO_PATH: SEO_PATH};', ctx);
const out = ctx.__out;
const missing = names.filter(n => !out[n]);
if (missing.length) { console.log('缺表：' + missing.join(',')); process.exit(2); }
const dest = process.argv[2] || path.join(__dirname, '_seo309.json');
fs.writeFileSync(dest, JSON.stringify(out, null, 1), 'utf8');
console.log('已导出 ' + names.length + ' 张表 → ' + dest);

/* 顺手把「截断 / 空」的清单打出来，便于核对 */
const LANGS = out.SEO_LANGS;
let trunc = [], empty = [], ttrunc = [];
names.forEach(n => {
  const t = out[n];
  LANGS.forEach(l => {
    const e = t[l]; if (!e) return;
    const d = (e.desc || '').trim(), ti = (e.title || '').trim();
    const og = (e.ogDesc || e.jsonldDesc || '').trim();
    if (d === '') empty.push([n, l]);
    else if (/…$|\.\.\.$/.test(d)) trunc.push([n, l, d.length, (og && !/…$|\.\.\.$/.test(og)) ? 'ogDesc 完整可用' : 'ogDesc 也截断/无']);
    if (/…$|\.\.\.$/.test(ti) || (e.ogTitle && e.ogTitle.startsWith(ti.slice(0, Math.max(8, ti.length - 2))) && e.ogTitle.length - ti.length > 3)) ttrunc.push([n, l, ti.length]);
  });
});
console.log('\ndesc 被截断：' + trunc.length + ' 条');
const byT = {}; trunc.forEach(x => byT[x[0]] = (byT[x[0]] || 0) + 1);
console.log('  按表：' + JSON.stringify(byT));
const useOg = trunc.filter(x => x[3] === 'ogDesc 完整可用').length;
console.log('  其中 ogDesc 完整可当底稿的：' + useOg + ' 条；其余 ' + (trunc.length - useOg) + ' 条要靠 intro/feat/who 现拼');
console.log('\ndesc 为空：' + empty.length + ' 条 → ' + JSON.stringify(empty));
console.log('\ntitle 被截断：' + ttrunc.length + ' 条 → ' + JSON.stringify(ttrunc.map(x => x[0] + '/' + x[1])));
