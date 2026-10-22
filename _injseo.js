/* _injseo.js —— 把 _seo/<lang>.json 的译文变成 i18n/seo-<lang>.json，并让 server.js 自动并入
 *
 * 为什么不直接把 73 种语言写进 server.js 那 17 张表：
 *   · 那会让 server.js 再胖 1~2 MB，且每次补语言都要重新切一遍 843 KB 的源码；
 *   · 17 张表是 const 对象 —— 不能重新赋值，但**可以加属性**，所以运行时并入是安全的；
 *   · 分片化之后，补一种语言 = 加一个 json 文件，跟 i18n/ui-<lang>.js 一个套路。
 *
 * 它做两件事：
 *   ① 为每种译文齐全的语言生成 i18n/seo-<lang>.json
 *   ② 往 server.js 里插一段启动加载代码（幂等：有标记就跳过，不会插两遍）
 *
 * 加载代码负责四件事，缺一个就会出现「页面能开但 SEO 半残」的静默问题：
 *   · SEO_LANGS.push(lang)      —— sitemap / hreflang 都从它派生
 *   · SEO_PATH[lang]            —— 语言首页路径
 *   · SEO_ROUTE['/'+lang]       —— /ur/ 这类路径才不会 404
 *   · SEO_PAGES[pg].path[lang]  —— 16 个工具页路径（那 16 个 PATH 映射在 2203 行就
 *     用 SEO_LANGS.forEach 跑完了，新语言是后来才 push 的，必须单独补）
 *
 * 用法：
 *   node _injseo.js --dry       # 只看会生成什么，不写文件
 *   node _injseo.js             # 生成分片 + 改 server.js
 */
'use strict';
const fs = require('fs');
const path = require('path');

const DIR = __dirname;
const OUT = path.join(DIR, '_seo');
const I18N = path.join(DIR, 'i18n');
const SERVER = path.join(DIR, 'server.js');
const SRC = JSON.parse(fs.readFileSync(path.join(OUT, 'src.json'), 'utf8'));
const META = JSON.parse(fs.readFileSync(path.join(OUT, 'meta.json'), 'utf8'));
const KEYS = Object.keys(SRC);
const DRY = process.argv.includes('--dry');

const vm = require('vm');
const ctx = { window: {} }; ctx.globalThis = ctx; vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(DIR, 'site-i18n.js'), 'utf8') + ';globalThis.__U = UI_LANGS; globalThis.__27 = UI27;', ctx);
const NEW = ctx.__U.filter(x => ctx.__27.indexOf(x[0]) < 0);

/* og:locale = 语言_主要使用地区。73 种新语言逐一认定，不猜。 */
const REGION = {
  ms: 'MY', fil: 'PH', fa: 'IR', nb: 'NO', sk: 'SK', hu: 'HU', ca: 'AD', hr: 'HR', sr: 'RS', bg: 'BG',
  ur: 'PK', bn: 'BD', ta: 'IN', te: 'IN', mr: 'IN', ne: 'NP', si: 'LK', my: 'MM', km: 'KH', lo: 'LA', sw: 'KE',
  gu: 'IN', kn: 'IN', ml: 'IN', pa: 'IN', or: 'IN', as: 'IN', kk: 'KZ', uz: 'UZ', mn: 'MN', az: 'AZ',
  is: 'IS', et: 'EE', lv: 'LV', lt: 'LT', sl: 'SI', sq: 'AL', mk: 'MK', eu: 'ES', gl: 'ES',
  am: 'ET', ha: 'NG', yo: 'NG', zu: 'ZA', so: 'SO', ps: 'AF', ku: 'IQ', af: 'ZA',
  yue: 'HK', be: 'BY', tg: 'TJ', ky: 'KG', tk: 'TM', bs: 'BA', mt: 'MT', cy: 'GB', ga: 'IE', hy: 'AM', ka: 'GE',
  ti: 'ET', bo: 'CN', ug: 'CN', sd: 'PK', yi: 'US', jv: 'ID', su: 'ID', ceb: 'PH', mg: 'MG',
  ig: 'NG', xh: 'ZA', sn: 'ZW', ny: 'MW', mi: 'NZ'
};

/* 品牌与工具名不本地化 —— 27 语里它们本来就是同一个英文串 */
const KEEP = ['htmlLang', 'ogLocale', 'siteName', 'jsonldName', 'jsonldAlt', 'currency'];

const PAGES = {
  SEO: 'index', SEO_MERGE: 'merge', SEO_CLEAN: 'clean', SEO_GLOSSARY: 'glossary',
  SEO_QC: 'qc', SEO_TRANSLATE: 'translate', SEO_CONVERT: 'convert',
  SEO_BILINGUAL: 'bilingual', SEO_SHIFT: 'shift', SEO_REPAIR: 'repair',
  SEO_EXTRACT: 'extract', SEO_VIDEOSUB: 'videosub', SEO_HANCONV: 'hanconv',
  SEO_SPLIT: 'split', SEO_TABLE: 'table', SEO_BATCH: 'batch', SEO_LRC: 'lrc'
};
const PAGE2VAR = {};
for (const [v, p] of Object.entries(PAGES)) PAGE2VAR[p] = v;

const serverSrc = fs.readFileSync(SERVER, 'utf8');
function loadTable(varName) {
  const i = serverSrc.indexOf('const ' + varName + ' = {');
  if (i < 0) throw new Error('找不到表 ' + varName);
  const j = serverSrc.indexOf('\n};', i);
  const c = {};
  vm.createContext(c);
  vm.runInContext('var X=' + serverSrc.slice(serverSrc.indexOf('{', i), j + 2), c);
  return c.X;
}

const RTL = (function () {
  const m = /const RTL_LANGS = \[([^\]]*)\]/.exec(serverSrc);
  return m ? m[1].split(',').map(s => s.trim().replace(/^'|'$/g, '')) : [];
})();

/* 首页 copy：用 en 的骨架模板回填译文，标签与 style 逐字一致。
   ❗RTL 语言（fa / ur / ps / ku / ug / sd / yi）必须在 <section> 上加 dir="rtl"，
     否则整段正文会左对齐、标点跑到错误的一侧 —— 与 27 语里 ar / he 的处理保持一致。 */
function buildCopy(page, lang, tr) {
  const tplPath = path.join(OUT, 'tpl-' + page + '.txt');
  if (!fs.existsSync(tplPath)) return undefined;
  let tpl = fs.readFileSync(tplPath, 'utf8');
  tpl = tpl.replace(/\{([a-zA-Z_]+)\}/g, (all, k) => {
    const key = page + '__copy_' + k;
    if (!(key in tr)) throw new Error('copy 占位符缺译文：' + key);
    return tr[key];
  });
  if (RTL.indexOf(lang) >= 0) {
    tpl = tpl.replace('<section class="seo"', '<section class="seo" dir="rtl"');
  }
  return tpl;
}

function buildRow(page, lang, en, tr) {
  const out = {};
  let title = '', ogDesc = '';
  for (const f of Object.keys(en)) {
    if (f === 'htmlLang') { out[f] = lang; continue; }
    if (f === 'ogLocale') { out[f] = lang.replace(/-.*$/, '') + '_' + (REGION[lang] || lang.toUpperCase()); continue; }
    if (KEEP.indexOf(f) >= 0) { out[f] = en[f]; continue; }
    if (f === 'copy') { out[f] = buildCopy(page, lang, tr); continue; }
    if (f === 'ogTitle') { out[f] = title; continue; }
    if (f === 'jsonldDesc') { out[f] = ogDesc; continue; }
    const key = page + '__' + f;
    if (!(key in tr)) throw new Error(lang + ' 缺条目 ' + key);
    const v = tr[key];
    out[f] = v;
    if (f === 'title') title = v;
    if (f === 'ogDesc') ogDesc = v;
  }
  if ('title' in out && 'ogTitle' in en) out.ogTitle = title;
  if ('ogDesc' in out && 'jsonldDesc' in en) out.jsonldDesc = ogDesc;
  return out;
}

const MARK = '/* __SEO_SHARDS__ */';
/* og:locale 是「语言_地区」，内置 27 语从 server.js 的 OG_LOCALE 取，
   新增 73 语不在那张表里 —— 这里按各语言的主要使用地区逐一认定，不靠猜。 */
const OG_LOCALE_JS = Object.keys(REGION).sort()
  .map(c => "  " + c + ": '" + c.replace(/-.*$/, '') + "_" + REGION[c] + "'").join(',\n');
const LOADER = [
  MARK,
  '/* 新增 73 语的 og:locale。内置 27 语走上面那张 OG_LOCALE —— 它只覆盖 27 语，',
  '   所以 og:locale:alternate 必须两个都查，否则新语言会输出空 content。 */',
  'const SEO_OG_LOCALE = {',
  OG_LOCALE_JS,
  '};',
  '/* v0.9.339：新增 73 种语言的 SEO 元数据走分片（i18n/seo-<lang>.json），启动时并入上面 17 张表。',
  '   ❗四件事必须一起做，漏一件就会「页面能开但 SEO 半残」：',
  '     ① SEO_LANGS.push  —— sitemap 与 hreflang 全从它派生',
  '     ② SEO_PATH        —— 语言首页路径',
  '     ③ SEO_ROUTE       —— /<lang>/ 与 /<lang>/xxx.html 路由，缺了就 404',
  '     ④ SEO_PAGES[].path —— 16 个工具页路径；那 16 个 *_PATH 映射早在 2203 行就',
  '        SEO_LANGS.forEach 跑完了，新语言是之后才 push 的，只能在这里补。 */',
  '(function loadSeoShards() {',
  '  var d = path.join(__dirname, \'i18n\');',
  '  var files;',
  '  try { files = fs.readdirSync(d); } catch (e) { return; }',
  '  for (var i = 0; i < files.length; i++) {',
  '    var m = /^seo-(.+)\\.json$/.exec(files[i]);',
  '    if (!m) continue;',
  '    var lang = m[1], data;',
  '    try { data = JSON.parse(fs.readFileSync(path.join(d, files[i]), \'utf8\')); } catch (e) { continue; }',
  '    if (SEO_LANGS.indexOf(lang) < 0) SEO_LANGS.push(lang);',
  '    SEO_PATH[lang] = (lang === \'zh-CN\') ? \'/\' : \'/\' + lang + \'/\';',
  '    SEO_ROUTE[\'/\' + lang] = lang;',
  '    SEO_ROUTE[\'/\' + lang + \'/\'] = lang;',
  '    for (var pg in SEO_PAGES) {',
  '      if (data[pg]) SEO_PAGES[pg].table[lang] = data[pg];',
  '    }',
  '  }',
  '})();',
  '',
].join('\n');

function main() {
  const ready = [];
  for (const [code, native] of NEW) {
    const p = path.join(OUT, code + '.json');
    if (!fs.existsSync(p)) continue;
    let tr;
    try { tr = JSON.parse(fs.readFileSync(p, 'utf8')); } catch (e) { console.log('⚠ ' + code + ' json 坏了：' + e.message); continue; }
    const miss = KEYS.filter(k => !(k in tr) || !String(tr[k]).trim());
    if (miss.length) { console.log('· ' + code + ' 译文缺 ' + miss.length + ' 条，跳过'); continue; }
    ready.push([code, native, tr]);
  }

  console.log('译文齐全的语言：' + ready.length + ' / ' + NEW.length);
  if (DRY) { ready.forEach(([c, n]) => console.log('  · ' + c + ' ' + n)); return; }
  if (!ready.length) { console.log('没有可注入的语言'); return; }

  if (!fs.existsSync(I18N)) fs.mkdirSync(I18N);
  let written = 0;
  for (const [code, native, tr] of ready) {
    const bundle = {};
    for (const [varName, page] of Object.entries(PAGES)) {
      const t = loadTable(varName);
      const en = t['en'];
      if (!en) continue;
      bundle[page] = buildRow(page, code, en, tr);
    }
    fs.writeFileSync(path.join(I18N, 'seo-' + code + '.json'), JSON.stringify(bundle), 'utf8');
    written++;
  }
  console.log('已生成分片：' + written + ' 个（i18n/seo-<lang>.json）');

  /* 插入启动加载代码 —— 幂等 */
  if (serverSrc.indexOf(MARK) >= 0) {
    console.log('server.js 已有加载代码，跳过');
    return;
  }
  const anchor = 'const SEO_PAGES = {';
  const ai = serverSrc.indexOf(anchor);
  if (ai < 0) throw new Error('找不到 SEO_PAGES 定义处');
  /* 插到 SEO_PAGES 整块定义结束之后：从 anchor 起找第一个 '\n};' */
  const end = serverSrc.indexOf('\n};', ai);
  if (end < 0) throw new Error('找不到 SEO_PAGES 定义结尾');
  const insertAt = end + 4;
  const next = serverSrc.slice(insertAt, insertAt + 200);
  console.log('插入点之后的源码：\n' + next.split('\n').slice(0, 4).join('\n'));

  const out = serverSrc.slice(0, insertAt) + '\n' + LOADER + serverSrc.slice(insertAt);
  fs.writeFileSync(SERVER, out, 'utf8');
  console.log('server.js 已插入加载代码（' + LOADER.length + ' 字节）');
}
main();
