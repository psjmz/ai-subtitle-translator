/* _exseo.js —— 把 server.js 里 17 张 SEO 表的「英文源」抽成一条条待翻译条目
 *
 * 为什么要有它：SEO 表散在 server.js 的 17 个 const 里（SEO / SEO_MERGE / … ），
 * 每张表 27 语、每语 6~13 个字段，直接改 server.js 既容易改错也没法断点续跑。
 * 抽成扁平的「键 → 英文原文」之后，翻译、校验、回注三段就能各自独立跑。
 *
 * 哪些字段要翻、哪些不用翻：
 *   · 要翻：title / desc / kw / ogDesc / intro / feat / who，以及首页 copy 拆出的 5 段。
 *     ogTitle 与 title 完全相同、jsonldDesc 与 ogDesc 完全相同（已实测 27 语全等），
 *     所以这两个不单独翻，回注时直接复制，省掉 1/5 的翻译量也避免两边译文打架。
 *   · 不翻：htmlLang / ogLocale / siteName / jsonldName / jsonldAlt / currency / copy 骨架。
 *     siteName、jsonldName、jsonldAlt 在 27 语里是同一个英文串（品牌与工具名不本地化），
 *     实测 SEO_QC 的 ja.jsonldAlt 也是 "Subtitle QC Checker"，照抄即可。
 *
 * 用法：node _exseo.js
 * 输出：_seo/src.json（键 → 英文原文）、_seo/meta.json（键 → {page, field, len}）
 */
'use strict';
const fs = require('fs');
const path = require('path');

const DIR = __dirname;
const OUT = path.join(DIR, '_seo');
const SRC = fs.readFileSync(path.join(DIR, 'server.js'), 'utf8');

/* 表名 → 页面名（与 server.js 的 SEO_PAGES 一一对应） */
const PAGES = {
  SEO: 'index', SEO_MERGE: 'merge', SEO_CLEAN: 'clean', SEO_GLOSSARY: 'glossary',
  SEO_QC: 'qc', SEO_TRANSLATE: 'translate', SEO_CONVERT: 'convert',
  SEO_BILINGUAL: 'bilingual', SEO_SHIFT: 'shift', SEO_REPAIR: 'repair',
  SEO_EXTRACT: 'extract', SEO_VIDEOSUB: 'videosub', SEO_HANCONV: 'hanconv',
  SEO_SPLIT: 'split', SEO_TABLE: 'table', SEO_BATCH: 'batch', SEO_LRC: 'lrc'
};
/* 需要翻译的字段，顺序固定 —— 键的次序决定后面分批的次序 */
const TR_FIELDS = ['title', 'desc', 'kw', 'ogDesc', 'intro', 'feat', 'who'];

const vm = require('vm');
function loadTable(varName) {
  const i = SRC.indexOf('const ' + varName + ' = {');
  if (i < 0) throw new Error('找不到表 ' + varName);
  const j = SRC.indexOf('\n};', i);
  const ctx = {};
  vm.createContext(ctx);
  vm.runInContext('var X=' + SRC.slice(SRC.indexOf('{', i), j + 2), ctx);
  return ctx.X;
}

/* 首页 copy 是整段 HTML，这里拆成 6 段纯文本：aria-label + 5 段正文（保留内部 <strong>）。
   ⚠️ 为什么连 aria-label 也拆：实测 27 语的 copy 骨架有 27 种差异，差异全在 aria-label
      （"关于本工具" / "About this tool" / …）和 RTL 时多出来的 dir="rtl"。
      把 aria-label 也当文案翻，剩下的骨架就完全一致了，可以用模板重建 —— 结构绝不会译坏。 */
/* ⚠️ 为什么不用正则抓内容：copy 里可翻文本跨着 <strong> 标签
      （如 `<strong>免费…工具</strong>，支持 SRT…`），非贪婪正则会在 `</strong>` 的 `</` 处
      提前收尾，只抓到半句。所以这里走一遍标签栈，取到「开标签 → 对应闭标签」之间的完整片段。 */
function scanElements(html) {
  const out = [];
  const stack = [];
  const re = /<(\/?)([a-zA-Z][\w-]*)([^>]*)>/g;
  let m;
  while ((m = re.exec(html))) {
    const close = m[1] === '/';
    const tag = m[2].toLowerCase();
    if (close) {
      for (let i = stack.length - 1; i >= 0; i--) {
        if (stack[i].tag === tag) {
          const open = stack.splice(i)[0];
          if (open.key) out.push({ key: open.key, text: html.slice(open.contentStart, m.index) });
          break;
        }
      }
    } else {
      const keyM = /data-i18n(?:-html)?="(\w+)"/.exec(m[3]);
      stack.push({ tag, key: keyM ? keyM[1] : null, contentStart: m.index + m[0].length });
    }
  }
  return out;
}
const ARIA_RE = /aria-label="([^"]+)"/;

function main() {
  if (!fs.existsSync(OUT)) fs.mkdirSync(OUT);
  const src = {}, meta = {};
  let n = 0, chars = 0;

  for (const [varName, page] of Object.entries(PAGES)) {
    const t = loadTable(varName);
    const en = t['en'];
    if (!en) { console.log('⚠ ' + varName + ' 无 en'); continue; }

    for (const f of TR_FIELDS) {
      if (en[f] === undefined) continue;
      const v = String(en[f]);
      const key = page + '__' + f;
      src[key] = v;
      meta[key] = { page, field: f, len: v.length };
      n++; chars += v.length;
    }

    if (en.copy !== undefined) {
      const copyStr = String(en.copy);
      /* 骨架模板：把可翻文本换成 {aria} / {seoTitle} / … 占位符。
         注入时按占位符回填，标签、style、缩进全部与 en 逐字一致。 */
      let tpl = copyStr;
      const ariaM = ARIA_RE.exec(copyStr);
      if (ariaM) {
        tpl = tpl.split('aria-label="' + ariaM[1] + '"').join('aria-label="{aria}"');
        src[page + '__copy_aria'] = ariaM[1];
        meta[page + '__copy_aria'] = { page, field: 'copy:aria', len: ariaM[1].length };
        n++; chars += ariaM[1].length;
      }
      for (const el of scanElements(copyStr)) {
        const key = page + '__copy_' + el.key;
        const v = el.text.trim();
        src[key] = v;
        meta[key] = { page, field: 'copy:' + el.key, len: v.length };
        tpl = tpl.split('>' + el.text + '</').join('>{' + el.key + '}</');
        n++; chars += v.length;
      }
      /* 模板里不该再残留可翻文本：只剩标签、style 与 {占位符} */
      const leftover = tpl.replace(/\{[a-zA-Z_]+\}/g, '').replace(/<[^>]*>/g, '').replace(/[\s\n]+/g, '');
      if (leftover) console.log('⚠ ' + page + ' 模板残留文本：' + leftover.slice(0, 80));
      fs.writeFileSync(path.join(OUT, 'tpl-' + page + '.txt'), tpl, 'utf8');
    }
  }

  fs.writeFileSync(path.join(OUT, 'src.json'), JSON.stringify(src, null, 1), 'utf8');
  fs.writeFileSync(path.join(OUT, 'meta.json'), JSON.stringify(meta, null, 1), 'utf8');

  const byPage = {};
  for (const k of Object.keys(meta)) {
    const p = meta[k].page;
    byPage[p] = (byPage[p] || 0) + 1;
  }
  console.log('条目数/语 = ' + n + '   字符/语 = ' + chars);
  console.log('外推 73 语：' + (n * 73) + ' 条，' + (chars * 73 / 10000).toFixed(1) + ' 万字');
  console.log('每页条目数：' + Object.entries(byPage).map(([k, v]) => k + ':' + v).join(' '));
  console.log('已写 _seo/src.json / _seo/meta.json');
}
main();
