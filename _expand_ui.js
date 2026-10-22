/* 界面语言扩容第一步：UI_LANGS 27 → 100 + detectUiLang 认识 73 种新语言。
   ⚠️ 老 27 语的顺序与匹配分支一个字不动，只在末尾追加。 */
'use strict';
const fs = require('fs');
const L = require('./langs100.js');
const src = fs.readFileSync('site-i18n.js', 'utf8');

/* ---- 1. UI_LANGS ---- */
const line = 'const UI_LANGS = [' + L.LANGS100.map(x => "['" + x.v + "','" + x.zh + "']").join(', ') + ' ];';
const oldLine = src.match(/const UI_LANGS = \[[^\n]*\];/);
if (!oldLine) { console.error('找不到 UI_LANGS 定义'); process.exit(1); }
let out = src.replace(oldLine[0], line);

/* ---- 2. detectUiLang：在既有 27 分支之后追加通用前缀匹配 ---- */
const anchor = `    if (l.startsWith('ro')) return 'ro';
  }`;
if (out.indexOf(anchor) < 0) { console.error('找不到 detectUiLang 锚点'); process.exit(1); }
const NEW = L.NEW73;
const add = `    if (l.startsWith('ro')) return 'ro';
    /* v0.9.339：73 种新增界面语言（v0.9.338 起翻译目标语言共 100 种）。
       一律按「语言代码 或 代码-地区」精确前缀匹配，不做 startsWith('ms') 这种宽松判断——
       否则 'ms' 会吃掉 'ms-MY'（正确）也会误伤不存在的 'msa'（不存在的代码本就该落到英文）。
       顺序无关：这些代码与上面 27 个互不为前缀。 */
    for (var _i = 0; _i < NEW_UI_CODES.length; _i++) {
      var _c = NEW_UI_CODES[_i];
      if (l === _c || l.indexOf(_c + '-') === 0) return _c;
    }
  }`;
out = out.replace(anchor, add);

/* ---- 3. 在 UI_LANGS 之后插入 NEW_UI_CODES ---- */
const newCodes = `\n/* v0.9.339：新增界面语言代码（detectUiLang 用；不在 UI_LANGS 里重复声明第二份名称） */\nconst NEW_UI_CODES = [${NEW.map(c => "'" + c + "'").join(',')}];\n`;
out = out.replace(line, line + newCodes);

fs.writeFileSync('site-i18n.js', out);
console.log('UI_LANGS 行长度 ' + line.length + ' 字符，共 ' + L.LANGS100.length + ' 语');
console.log('NEW_UI_CODES 追加 ' + NEW.length + ' 个代码');
console.log('文件体积 ' + Math.round(fs.statSync('site-i18n.js').size / 1024) + ' KB（仅涨了语言清单，字典没动）');

/* 自检 */
const vm = require('vm');
const ctx = { window: {}, document: { documentElement: {}, addEventListener() {}, querySelector() { return null; }, querySelectorAll() { return []; } }, navigator: { language: 'zh-CN' }, localStorage: { getItem() { return null; }, setItem() {} }, location: { pathname: '/', search: '' } };
ctx.window = ctx; ctx.globalThis = ctx;
vm.runInNewContext(out, ctx, { timeout: 8000 });
const S = ctx.SiteI18N;
console.log('\nUI_LANGS = ' + S.UI_LANGS.length + ' 语；I18N 仍 = ' + Object.keys(S.I18N).length + ' 语（分片另加）');
/* 浏览器语言识别抽查 */
const cases = [['ms-MY', 'ms'], ['fil-PH', 'fil'], ['ur', 'ur'], ['bn-BD', 'bn'], ['yue-HK', 'yue'], ['bo', 'bo'],
  ['mi-NZ', 'mi'], ['zh-HK', 'zh-TW'], ['zh-CN', 'zh-CN'], ['en-GB', 'en'], ['ro-RO', 'ro'], ['xx-YY', 'en']];
cases.forEach(([nav, want]) => {
  const c2 = Object.assign({}, ctx, { navigator: { languages: [nav], language: nav } });
  vm.runInNewContext(out, c2, { timeout: 8000 });
  const got = c2.SiteI18N.detectUiLang();
  console.log('  detect(' + nav + ') = ' + got + (got === want ? '  ✓' : '  ✗ 期望 ' + want));
});
