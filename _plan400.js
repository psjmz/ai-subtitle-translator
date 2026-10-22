/* 盘点：界面语言 / SEO / 内容 / sitemap 扩到 100 语到底是多少量。
   只读，不改任何文件。 */
'use strict';
const fs = require('fs');

/* 1 界面字典：site-i18n 735 键 × 27 语 */
const vm = require('vm');
const ctx = { window: {}, document: { documentElement: {}, addEventListener() {}, querySelector() { return null; }, querySelectorAll() { return []; } }, navigator: { language: 'zh-CN' }, localStorage: { getItem() { return null; }, setItem() {} }, location: { pathname: '/', search: '' } };
ctx.window = ctx; ctx.globalThis = ctx;
vm.runInNewContext(fs.readFileSync('site-i18n.js', 'utf8'), ctx, { timeout: 8000 });
const I = ctx.SiteI18N || ctx.window.SiteI18N;
const wrap = I.I18N || I;
const uiLangs = Object.keys(wrap);
const keys = Object.keys(wrap[uiLangs[0]]);
/* 汉字段数（用于估字数） */
let totalChar = 0;
uiLangs.forEach(l => keys.forEach(k => { totalChar += String(wrap[l][k] || '').length; }));

/* 2 各工具页 i18n 的语言数（静态解析：找形如  xx: { 的顶层键） */
const toolFiles = fs.readdirSync('.').filter(f => /-i18n\.js$/.test(f));
const toolRows = [];
toolFiles.forEach(f => {
  const s = fs.readFileSync(f, 'utf8');
  const codes = new Set();
  const re = /(?:^|\n)\s{0,4}(?:'|")?([a-z]{2,3}(?:-[A-Z]{2})?)(?:'|")?\s*:\s*\{/g;
  let m;
  while ((m = re.exec(s))) codes.add(m[1]);
  /* 只保留像语言代码的（去掉 style/meta 之类） */
  const L = [...codes].filter(c => /^[a-z]{2,3}(-[A-Z]{2})?$/.test(c) && c !== 'px' && c !== 'em');
  /* 单语键数：取第一个语言块的 {} 层数太麻烦，用文件大小/语数粗估 */
  toolRows.push({ f, langs: L.length, kb: Math.round(fs.statSync(f).size / 1024) });
});

/* 3 SEO 页表 */
const sv = fs.readFileSync('server.js', 'utf8');
const seoLangLine = (sv.match(/const SEO_LANGS = \[([^\]]*)\]/) || [])[1] || '';
const seoLangs = seoLangLine.split(',').map(x => x.trim().replace(/^'|'$/g, '')).filter(Boolean);
const seoPageCount = (sv.match(/const SEO_PAGES = \{/) ? 1 : 0);
/* 每个 SEO 页的 table 有多少语种：抓 SEO_ 常量的键 */
const seoConsts = [...sv.matchAll(/const (SEO_[A-Z_]+) = \{/g)].map(m => m[1]);

/* 4 内容页 */
const contentFiles = fs.readdirSync('content').filter(f => /\.js$/.test(f));
let guideLangsTotal = 0, guideBodyChars = 0, perGuide = [];
contentFiles.forEach(f => {
  let d = null;
  try { d = require('./content/' + f); } catch (e) { return; }
  if (!d || !d.seo || !d.body) return;
  const L = Object.keys(d.body).filter(l => d.seo[l]);
  let chars = 0;
  L.forEach(l => { chars += JSON.stringify(d.body[l]).length; });
  guideLangsTotal += L.length; guideBodyChars += chars;
  perGuide.push({ slug: d.slug, langs: L.length, chars });
});

console.log('===== 界面字典（site-i18n.js）=====');
console.log('  语言 ' + uiLangs.length + ' 语 × 键 ' + keys.length + ' 个 = ' + (uiLangs.length * keys.length) + ' 条');
console.log('  当前字符量 ≈ ' + (totalChar / 10000).toFixed(1) + ' 万字，文件 ' + Math.round(fs.statSync('site-i18n.js').size / 1024) + ' KB');
console.log('  扩到 100 语需新增 ' + (73 * keys.length) + ' 条（' + (totalChar / uiLangs.length * 73 / 10000).toFixed(1) + ' 万字）');
console.log('  预估文件 ' + Math.round(fs.statSync('site-i18n.js').size / 1024 / 27 * 100 / 1024) + ' MB（不分片的话）');

console.log('\n===== 各工具页 i18n =====');
toolRows.sort((a, b) => b.langs - a.langs).forEach(r => {
  console.log('  ' + r.f.padEnd(22) + r.langs + ' 语  ' + r.kb + ' KB');
});

console.log('\n===== SEO =====');
console.log('  SEO_LANGS ' + seoLangs.length + ' 语：' + seoLangs.join(' '));
console.log('  SEO 常量表：' + seoConsts.join(', '));

console.log('\n===== 内容页 =====');
console.log('  篇数 ' + perGuide.length + '，语言版本合计 ' + guideLangsTotal + ' 条，正文约 ' + (guideBodyChars / 10000).toFixed(0) + ' 万字');
console.log('  扩到 100 语需新增 ≈ ' + (perGuide.length * 73) + ' 篇（按现均 ' + Math.round(guideBodyChars / guideLangsTotal / 1000 * 10) / 10 + ' KB/篇 估 ≈ ' + (guideBodyChars / guideLangsTotal * perGuide.length * 73 / 10000).toFixed(0) + ' 万字）');

console.log('\n===== sitemap 变化 =====');
const toolPages = 17, guides = perGuide.length;
console.log('  现在：工具页 ' + toolPages + '×27=' + toolPages * 27 + ' + 指南 ' + guideLangsTotal + ' = ' + (toolPages * 27 + guideLangsTotal));
console.log('  100 语：工具页 ' + toolPages + '×100=' + toolPages * 100 + ' + 指南 ' + guides * 100 + ' = ' + (toolPages * 100 + guides * 100));
