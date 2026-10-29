'use strict';
/* =============================================================================
   i18n-ssr.js —— 服务端按 URL 语言把首屏文案写进 HTML（v0.9.409）

   为什么需要：
   页面的可见文案一直是「HTML 里写中文默认值 + 客户端 applyI18n() 换掉」，对爬虫和
   禁用 JS 的访客只剩中文。/ja/ 这类语言页虽然有正确的 <title>/canonical，正文却是中文，
   收录质量打折扣。既然词典已经在服务器上（i18n/dict.*.js），渲染时直接换掉最稳。

   做法：
   · 用同一份浏览器分片（dict.<lang>.js / ui-<lang>.js）在服务端取到 {key: 译文}
     （不复制数据，避免两份真相）
   · 只替换「元素里全是纯文本」的 data-i18n 节点，以及 placeholder / aria-label 属性
   · 空文本节点跳过（那些是 JS 运行时才填的，服务端没有值可填）
   · data-i18n-html 不碰（译文里带标签，服务端插入容易把结构写坏；客户端会补）
   · zh-CN 直接原样返回：HTML 里的默认文案就是中文

   ⚠️ 必须跳过 <script> / <style> / <!-- -->：
      页面里的 JS 自己也拼带 data-i18n 的 HTML 字符串，例如 convert.html 的
      '<span data-i18n="statDur">' + tpl('statDur', …) + '</span>'。
      若不加闸门，正则会把这段**表达式**当成静态节点，整段换成一句死译文 ——
      输出区的时长统计从此永远显示同一个字面量。这类坑肉眼极难发现，靠单测钉住。

   失败一律降级：语言不在 100 语名单内、分片坏了、分片抛异常 → 返回原 HTML，绝不让页面 500。
   ============================================================================= */

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const DICT_DIR = path.join(ROOT, 'i18n');

/* 100 种语言名单 —— 唯一数据源 langs100.js，别在这里另抄一份。
   为什么要这份名单：早先「取不到分片就叠英文」的兜底会把 /klingon/ 这种未知语言
   也翻成英文页 —— 未知语言应该原样返回（中文默认值），不该凭空造一门英文版。 */
const KNOWN_LANGS = require(path.join(ROOT, 'langs100.js')).LANGS100.map(function (x) { return x.v; });

/* 27 个核心语言（有 dict.<lang>.js 全量分片）；其余 73 语只有 ui-<lang>.js 差异分片，
   需要叠在英文上才有完整词条。这张表与 i18n/core.js 的 UI27 必须一致，单测会校验。 */
const CORE_LANGS = ['zh-CN', 'zh-TW', 'en', 'ja', 'es', 'pt', 'ko', 'de', 'fr', 'id', 'hi', 'th', 'vi',
  'ru', 'it', 'ar', 'tr', 'nl', 'pl', 'sv', 'cs', 'uk', 'da', 'fi', 'el', 'he', 'ro'];

const dictCache = new Map();      // lang -> {key:text} | null

/* 跑分片：分片本身就是「给全局 I18N 挂一个语言块」的赋值语句，把它放进一个只有
   三个形参的小函数里执行，等于给了它一个干净的全局 —— 比 vm.createContext 轻得多。
   ⚠️ 为什么不用 vm：73 份差异分片每份开一个 context，单测里 100 语跑一遍会把 node
      进程撑到被系统 SIGKILL（实测）。三形参注入没有 context 开销，行为等价。
   形参对应分片里能碰到的三个全局：
     I18N        —— dict.<lang>.js 走 I18N['ja'] = {...}
     window      —— ui-<lang>.js 走 (function(){ var I = window.SiteI18N.I18N; … })()
     SiteI18N    —— 同上，挂在 window 上 */
function evalShard(file, lang) {
  const src = fs.readFileSync(file, 'utf8');
  const bag = {};
  const win = { SiteI18N: { I18N: bag } };
  new Function('I18N', 'window', 'SiteI18N', src)(bag, win, win.SiteI18N);
  const d = bag[lang];
  return (d && typeof d === 'object') ? d : null;
}

function dictFor(lang) {
  if (KNOWN_LANGS.indexOf(lang) < 0) return null;
  if (dictCache.has(lang)) return dictCache.get(lang);
  let dict = null;
  try {
    const core = path.join(DICT_DIR, 'dict.' + lang + '.js');
    if (CORE_LANGS.indexOf(lang) >= 0 && fs.existsSync(core)) {
      dict = evalShard(core, lang);
    } else {
      /* 73 语：英文打底 + 差异分片覆盖 */
      const en = evalShard(path.join(DICT_DIR, 'dict.en.js'), 'en') || {};
      const shard = path.join(DICT_DIR, 'ui-' + lang + '.js');
      const diff = fs.existsSync(shard) ? (evalShard(shard, lang) || {}) : {};
      dict = Object.assign({}, en, diff);
    }
  } catch (e) {
    console.error('[i18n-ssr] 词条加载失败', lang, e && e.message);
    dict = null;
  }
  dictCache.set(lang, dict);
  return dict;
}

const escText = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const escAttr = s => escText(s).replace(/"/g, '&quot;');

/* 保护区：script / style / 注释。它们内部的 data-i18n 一律不动。 */
const SKIP_SRC = '<script\\b[\\s\\S]*?<\\/script>|<style\\b[\\s\\S]*?<\\/style>|<!--[\\s\\S]*?-->';
const ATTRS_SRC = '(?:[^<>"\']|"[^"]*"|\'[^\']*\')*';

/* 元素里只有纯文本时替换：
   <button class="x" data-i18n="k" type="button">中文</button>
   → 同样的标签，文本换成译文。带子标签的（<a data-i18n="k"><b>…</b></a>）不匹配，
   交给客户端——服务端硬插会破坏结构。
   ⚠️ 组号：1=保护区，2=标签名，3=属性串，4=键，5=原文（所以闭合用 \2）。 */
const RE_TEXT = new RegExp(
  '(' + SKIP_SRC + ')' +
  '|<([a-zA-Z][\\w:-]*)(' + ATTRS_SRC + '?\\bdata-i18n="([^"]+)"' + ATTRS_SRC + ')>([^<]*)<\\/\\2>',
  'g');

/* 属性：placeholder / aria-label 跟着 data-i18n-ph / data-i18n-aria 走。同样避开保护区。 */
const RE_TAG = new RegExp(
  '(' + SKIP_SRC + ')' +
  '|<([a-zA-Z][\\w:-]*)(' + ATTRS_SRC + '\\bdata-i18n-(ph|aria)="([^"]+)"' + ATTRS_SRC + ')>',
  'g');

function localizeHtml(html, lang) {
  if (!lang || lang === 'zh-CN') return html;
  const dict = dictFor(lang);
  if (!dict) return html;

  let out = html.replace(RE_TEXT, function (m, skip, tag, attrs, key, text) {
    if (skip) return m;                      // script / style / 注释：原样
    const v = dict[key];
    if (typeof v !== 'string' || !v) return m;
    if (!text.trim()) return m;              // 空节点：运行时才填，服务端无值可填
    if (text.trim() === key) return m;       // 已经是键名（上一轮降级过的），别再来一次
    return '<' + tag + attrs + '>' + escText(v) + '</' + tag + '>';
  });

  out = out.replace(RE_TAG, function (m, skip, tag, attrs, kind, key) {
    if (skip) return m;
    const v = dict[key];
    if (typeof v !== 'string' || !v) return m;
    const name = kind === 'ph' ? 'placeholder' : 'aria-label';
    const re = new RegExp('\\b' + name + '="([^"]*)"');
    if (!re.test(attrs)) return m;           // 没有对应属性就不加（有可见 label 的别硬塞 aria）
    return '<' + tag + attrs.replace(re, name + '="' + escAttr(v) + '"') + '>';
  });

  return out;
}

/* 仅供单测：把 100 语词典缓存整块放掉。生产环境不用调（进程常驻，缓存就是要常驻的） */
function clearCache() { dictCache.clear(); }

module.exports = { localizeHtml, dictFor, CORE_LANGS, KNOWN_LANGS, clearCache };
