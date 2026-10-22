/* 从 translate.html 的 LANGS 提取 100 语元数据，生成 langs100.js（独立新文件，不改老代码）。
   语言元数据是后面 UI 语言 / SEO / 内容 / sitemap 扩到 100 语的单一数据源。 */
'use strict';
const fs = require('fs');
const s = fs.readFileSync('translate.html', 'utf8');
const RE = /\{\s*v:'([a-zA-Z-]+)',\s*zh:'([^']*)',\s*en:'([^']*)',\s*file:'([^']*)',\s*prompt:'([^']*)'\s*\}/g;
let m, rows = [];
while ((m = RE.exec(s))) rows.push({ v: m[1], zh: m[2], en: m[3], file: m[4], prompt: m[5] });
if (rows.length !== 100) { console.error('提取到的不是 100 条：' + rows.length); process.exit(1); }

/* RTL 书写系统：阿拉伯字母（ar fa ur ps ku ug sd）、希伯来（he yi） */
const RTL = new Set(['ar', 'fa', 'ur', 'ps', 'ku', 'ug', 'sd', 'he', 'yi']);
/* CJK：汉字（zh-CN zh-TW yue）、日文、韩文 */
const CJK = new Set(['zh-CN', 'zh-TW', 'yue', 'ja', 'ko']);

const out = rows.map(r => ({
  v: r.v,
  zh: r.zh,            // 语言自称（语言切换器显示这个）
  en: r.en,            // 英文名（hreflang 注释 / 后台用）
  file: r.file,        // 文件名里的中文名（导出文件命名用）
  dir: RTL.has(r.v) ? 'rtl' : 'ltr',
  cjk: CJK.has(r.v),
  prompt: r.prompt     // 翻译提示词里的语言名（translate.html 用）
}));

const header = `/* langs100.js —— 站内 100 种语言的元数据（单一数据源）
 *
 * 为什么单独一份：v0.9.338 起「翻译目标语言」有 100 种，但「网站界面语言」只有 27 种。
 * 要把界面语言、SEO、指南内容、sitemap 都扩到 100 种，四套系统必须共用同一份语言清单，
 * 否则一定会出现「下拉里有、sitemap 里没有」「一个语言两种代码」这类静默不一致。
 *
 * 字段：
 *   v      语言代码（= <html lang> = URL 路径段 = hreflang 值）
 *   zh     语言自称（语言切换器上显示的，永远用本语言写，不翻译成中文）
 *   en     英文名（后台 / 日志 / 校验脚本用）
 *   file   文件名里的中文名（导出文件的命名模板用）
 *   dir    ltr / rtl（阿拉伯字母与希伯来字母系为 rtl，页面要加 dir 属性）
 *   cjk    是否中日韩（行宽、字号、断行规则按这个分流）
 *   prompt 翻译提示词里的语言名（与 translate.html 的 LANGS 保持一致）
 *
 * ⚠️ 这份表不改任何老逻辑：site-i18n / SEO_LANGS / content 仍然各走各的 27 语，
 *    要扩哪一块，从这份表里取语言清单即可（详见 memory 里的分批计划）。
 */
'use strict';

const LANGS100 = `;

const tail = `
;

/* ---------- 便捷索引 ---------- */
const BY_CODE = {};
LANGS100.forEach(function (l) { BY_CODE[l.v] = l; });

/* 与既有 27 语界面语言的重合部分（扩界面时用来避免重复劳动） */
const UI27 = ['zh-CN', 'zh-TW', 'en', 'ja', 'es', 'pt', 'ko', 'de', 'fr', 'id', 'hi', 'th', 'vi',
  'ru', 'it', 'ar', 'tr', 'nl', 'pl', 'sv', 'cs', 'uk', 'da', 'fi', 'el', 'he', 'ro'];

module.exports = {
  LANGS100: LANGS100,
  BY_CODE: BY_CODE,
  UI27: UI27,
  RTL: LANGS100.filter(function (l) { return l.dir === 'rtl'; }).map(function (l) { return l.v; }),
  CJK: LANGS100.filter(function (l) { return l.cjk; }).map(function (l) { return l.v; }),
  NEW73: LANGS100.map(function (l) { return l.v; }).filter(function (v) { return UI27.indexOf(v) < 0; })
};
`;

fs.writeFileSync('langs100.js', header + JSON.stringify(out, null, 2).replace(/"([a-zA-Z]+)":/g, '$1:') + tail);
console.log('已写 langs100.js：' + out.length + ' 条');
console.log('RTL ' + out.filter(x => x.dir === 'rtl').length + ' 种：' + out.filter(x => x.dir === 'rtl').map(x => x.v).join(' '));
console.log('CJK ' + out.filter(x => x.cjk).length + ' 种：' + out.filter(x => x.cjk).map(x => x.v).join(' '));
const ui27 = ['zh-CN', 'zh-TW', 'en', 'ja', 'es', 'pt', 'ko', 'de', 'fr', 'id', 'hi', 'th', 'vi',
  'ru', 'it', 'ar', 'tr', 'nl', 'pl', 'sv', 'cs', 'uk', 'da', 'fi', 'el', 'he', 'ro'];
const miss = ui27.filter(v => !out.some(x => x.v === v));
console.log('既有 27 语是否都在：' + (miss.length ? '缺 ' + miss.join(',') : '全在'));
console.log('待新增 73 语：' + out.map(x => x.v).filter(v => ui27.indexOf(v) < 0).length + ' 种');
