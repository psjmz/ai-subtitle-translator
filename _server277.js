/* v0.9.277 一次性脚本：给 server.js 加 translate 页的 SEO 表 / 路由 / sitemap
   用法：node _server277.js
   改三处：
     1) SEO_PAGES 里加 translate 项（title/desc 自己一套，kw 复用首页那张表）
     2) 静态路由：/translate.html 与 /<lang>/translate.html 都要能出对应语言的 head
     3) 静态 SEO 文案：translate 页沿用首页那整段 copy（内容本来讲的就是字幕翻译）
   ⚠️ 路由优先级：带文件名的语言路由必须排在「语言目录下的静态资源回退」之前 */
'use strict';
const fs = require('fs');
const SEO = JSON.parse(fs.readFileSync('_seo277.json', 'utf8'));
const LANGS = ['zh-CN', 'zh-TW', 'en', 'ja', 'es', 'pt', 'ko', 'de', 'fr', 'id', 'hi', 'th', 'vi', 'ru', 'it', 'ar', 'tr', 'nl', 'pl', 'sv', 'cs', 'uk', 'da', 'fi', 'el', 'he', 'ro'];

const miss = LANGS.filter((l) => !SEO[l] || !SEO[l].title || !SEO[l].desc);
if (miss.length) { console.log('✗ 缺语言：' + miss.join(' ')); process.exit(1); }
console.log('✓ 27 语的 title / desc 齐了');

let src = fs.readFileSync('server.js', 'utf8');
const need = (s, m) => { if (src.indexOf(s) < 0) { console.log('✗ 找不到：' + m); process.exit(1); } };

/* ---------- 1) SEO_TRANSLATE 表：插在 MERGE_PATH 定义之前 ---------- */
const tableLines = LANGS.map((l) => {
  const o = SEO[l];
  const j = (x) => JSON.stringify(x).replace(/</g, '\\u003c');
  return "  '" + l + "': { title: " + j(o.title) + ", desc: " + j(o.desc) + " }";
}).join(',\n');
const TABLE = '/* v0.9.277：字幕翻译工作台（/translate.html）的 SEO 表。\n' +
  '   ❗为什么单独一张：v0.9.277 起首页是落地页（讲四个工具），翻译工具搬去了 /translate.html。\n' +
  '     两个 URL 若共用一套 title/description，搜索引擎会当成重复内容收录，所以这里另写一套。\n' +
  '     kw 不重复造：关键词一致不容易出错，直接取首页那张表的同语言值。 */\n' +
  'const SEO_TRANSLATE = {\n' + tableLines + '\n};\n';

need("const MERGE_PATH = {}, CLEAN_PATH = {};", 'MERGE_PATH 定义');
const rowTr = "TRANSLATE_PATH[l] = (l === 'zh-CN') ? '/translate.html' : '/' + l + '/translate.html';";
src = src.replace(
  "const MERGE_PATH = {}, CLEAN_PATH = {};",
  "const MERGE_PATH = {}, CLEAN_PATH = {}, TRANSLATE_PATH = {};"
);
src = src.replace(
  "  CLEAN_PATH[l] = (l === 'zh-CN') ? '/clean.html' : '/' + l + '/clean.html';",
  "  CLEAN_PATH[l] = (l === 'zh-CN') ? '/clean.html' : '/' + l + '/clean.html';\n  " + rowTr
);
src = src.replace(
  "const SEO_PAGES = {",
  TABLE + "\nconst SEO_PAGES = {"
);

/* ---------- 2) SEO_PAGES 加一项 ---------- */
src = src.replace(
  "  clean: { file: 'clean.html', table: SEO_CLEAN, path: CLEAN_PATH, jsonldType: 'WebApplication' }\n};",
  "  clean: { file: 'clean.html', table: SEO_CLEAN, path: CLEAN_PATH, jsonldType: 'WebApplication' },\n" +
  "  translate: { file: 'translate.html', table: SEO_TRANSLATE, path: TRANSLATE_PATH, jsonldType: 'WebApplication' }\n};"
);

/* kw 回落：translate 表没有 kw 字段，从首页那张表取同语言的 */
src = src.replace(
  "  const s = P.table[lang] || P.table['en'] || P.table['zh-CN'];",
  "  const s = P.table[lang] || P.table['en'] || P.table['zh-CN'];\n" +
  "  /* v0.9.277：translate 表只写了 title / desc，关键词沿用首页那张表的同语言值 */\n" +
  "  const kw = s.kw || ((SEO[lang] || SEO['zh-CN']).kw) || '';"
);
src = src.replace(
  "    '<meta name=\"keywords\" content=\"' + (s.kw || '') + '\">',",
  "    '<meta name=\"keywords\" content=\"' + kw + '\">',"
);

/* ---------- 3) 静态 SEO 文案：translate 页沿用首页那整段 copy ---------- */
src = src.replace(
  "    const copy = (page === 'index') ? (SEO[lang] && SEO[lang].copy) : seoCopy(page, lang);",
  "    /* v0.9.277：那段 copy 通篇讲的是字幕翻译引擎，正好属于 /translate.html；\n" +
  "       首页现在是四工具落地页，正文本身就是静态 HTML，不再需要这段注入。 */\n" +
  "    const copy = (page === 'index') ? (SEO[lang] && SEO[lang].copy)\n" +
  "               : (page === 'translate') ? (SEO[lang] && SEO[lang].copy)\n" +
  "               : seoCopy(page, lang);"
);

/* ---------- 4) 路由 ---------- */
src = src.replace(
  "  let pm = p.match(/^\\/([a-zA-Z][a-zA-Z\\-]*)\\/(merge|clean)\\.html$/);",
  "  let pm = p.match(/^\\/([a-zA-Z][a-zA-Z\\-]*)\\/(merge|clean|translate)\\.html$/);"
);
src = src.replace(
  "  pm = p.match(/^\\/(merge|clean)\\.html$/);",
  "  pm = p.match(/^\\/(merge|clean|translate)\\.html$/);"
);

/* ---------- 5) sitemap 说明与实际一致了（4 页 × 27 语） ---------- */
src = src.replace(
  "/* sitemap：三页 × 27 语言 = 81 条 URL，每条带本页的 hreflang alternates。\n   v0.9.273 之前只有首页进 sitemap —— 特效页和清洗页对爬虫来说是不存在的。 */",
  "/* sitemap：四页 × 27 语言 = 108 条 URL，每条带本页的 hreflang alternates。\n   v0.9.273 之前只有首页进 sitemap —— 特效页和清洗页对爬虫来说是不存在的。\n   v0.9.277 起字幕翻译工作台独立成 /translate.html，第四个页面进表。 */"
);

/* ---------- 6) canonical 的 og:url 与 selfUrl 已经按 P.path 算，不用动 ---------- */

fs.writeFileSync('server.js', src);

const out = fs.readFileSync('server.js', 'utf8');
const A = (c, m) => { if (!c) { console.log('✗ ' + m); process.exit(1); } console.log('✓ ' + m); };
A(/const SEO_TRANSLATE = \{/.test(out), 'SEO_TRANSLATE 已写入');
A(/TRANSLATE_PATH\[l\]/.test(out), 'TRANSLATE_PATH 已生成');
A(/translate: \{ file: 'translate\.html'/.test(out), 'SEO_PAGES 已加 translate');
const route1 = "(merge|clean|translate)\\.html$/";
const route2 = "pm = p.match(/^\\/(merge|clean|translate)\\.html$/)";
A(src.indexOf(route1) >= 0, '语言目录下的路由正则已含 translate');
A(src.indexOf(route2) >= 0, '根路径路由正则已含 translate');
A((out.match(/const SEO_TRANSLATE = \{/g) || []).length === 1, 'SEO_TRANSLATE 只写了一份（幂等）');
A((out.match(/TRANSLATE_PATH\[l\]/g) || []).length === 1, 'TRANSLATE_PATH 生成式只有一处');
A(/page === 'translate'/.test(out), '静态 copy 复用规则已改');
A(!/81 条 URL/.test(out), 'sitemap 说明已更新');
console.log('server.js：' + out.split('\n').length + ' 行');
