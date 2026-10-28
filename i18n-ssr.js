'use strict';
/* =============================================================================
   i18n-ssr.js —— 服务端按 URL 语言把首屏文案写进 HTML（v0.9.408）

   为什么需要：
   页面的可见文案一直是「HTML 里写中文默认值 + 客户端 applyI18n() 换掉」，对爬虫和
   禁用 JS 的访客只剩中文。/ja/ 这类语言页虽然有正确的 <title>/canonical，正文却是中文，
   收录质量打折扣。既然词典已经在服务器上（i18n/dict.*.js），渲染时直接换掉最稳。

   做法：
   · 用 vm 跑一遍浏览器端同一份分片 → 拿到 {key: 译文}（不复制数据，避免两份真相）
   · 只替换「元素里全是纯文本」的 data-i18n 节点，以及 placeholder / aria-label 属性
   · 空文本节点跳过（那些是 JS 运行时才填的，服务端没有值可填）
   · data-i18n-html 不碰（译文里带标签，服务端插入容易把结构写坏；客户端会补）
   · zh-CN 直接原样返回：HTML 里的默认文案就是中文

   失败一律降级：语言没有分片、分片坏了、vm 超时 → 返回原 HTML，绝不让页面 500。
   ============================================================================= */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = __dirname;
const DICT_DIR = path.join(ROOT, 'i18n');

/* 27 个核心语言（有 dict.<lang>.js 全量分片）；其余 73 语只有 ui-<lang>.js 差异分片，
   需要叠在英文上才有完整词条。这张表与 i18n/core.js 的 UI27 必须一致，单测会校验。 */
const CORE_LANGS = ['zh-CN', 'zh-TW', 'en', 'ja', 'es', 'pt', 'ko', 'de', 'fr', 'id', 'hi', 'th', 'vi',
  'ru', 'it', 'ar', 'tr', 'nl', 'pl', 'sv', 'cs', 'uk', 'da', 'fi', 'el', 'he', 'ro'];

const dictCache = new Map();      // lang -> {key:text} | null

/* 用 vm 跑分片：分片里就是浏览器那两行赋值，跑完从沙箱里取对象。
   比在 Node 里重新实现一套 JSON 解析稳 —— 词条里带 {0} 占位符、引号、换行都不会翻车。 */
function evalShard(file, lang) {
  const src = fs.readFileSync(file, 'utf8');
  const sandbox = { I18N: {} };
  sandbox.window = sandbox;
  sandbox.SiteI18N = { I18N: sandbox.I18N };
  vm.createContext(sandbox);
  vm.runInContext(src, sandbox, { timeout: 2000, filename: file });
  const d = sandbox.I18N[lang];
  return (d && typeof d === 'object') ? d : null;
}

function dictFor(lang) {
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

/* 元素里只有纯文本时替换：
   <button class="x" data-i18n="k" type="button">中文</button>
   → 同样的标签，文本换成译文。带子标签的（<a data-i18n="k"><b>…</b></a>）不匹配，
   交给客户端——服务端硬插会破坏结构。 */
const RE_TEXT = /<([a-zA-Z][\w:-]*)((?:[^<>"']|"[^"]*"|'[^']*')*?\bdata-i18n="([^"]+)"(?:[^<>"']|"[^"]*"|'[^']*')*)>([^<]*)<\/\1>/g;
/* 属性：placeholder / aria-label 跟着 data-i18n-ph / data-i18n-aria 走 */
const RE_TAG = /<([a-zA-Z][\w:-]*)((?:[^<>"']|"[^"]*"|'[^']*')*\bdata-i18n-(ph|aria)="([^"]+)"(?:[^<>"']|"[^"]*"|'[^']*')*)>/g;

function localizeHtml(html, lang) {
  if (!lang || lang === 'zh-CN') return html;
  const dict = dictFor(lang);
  if (!dict) return html;

  let out = html.replace(RE_TEXT, function (m, tag, attrs, key, text) {
    const v = dict[key];
    if (typeof v !== 'string' || !v) return m;
    if (!text.trim()) return m;              // 空节点：运行时才填，服务端无值可填
    if (text.trim() === key) return m;       // 已经是键名（上一轮降级过的），别再来一次
    return '<' + tag + attrs + '>' + escText(v) + '</' + tag + '>';
  });

  out = out.replace(RE_TAG, function (m, tag, attrs, kind, key) {
    const v = dict[key];
    if (typeof v !== 'string' || !v) return m;
    const name = kind === 'ph' ? 'placeholder' : 'aria-label';
    const re = new RegExp('\\b' + name + '="([^"]*)"');
    if (!re.test(attrs)) return m;           // 没有对应属性就不加（有可见 label 的别硬塞 aria）
    return '<' + tag + attrs.replace(re, name + '="' + escAttr(v) + '"') + '>';
  });

  return out;
}

module.exports = { localizeHtml, dictFor, CORE_LANGS };
