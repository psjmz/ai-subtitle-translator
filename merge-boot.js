/* merge-boot.js —— merge 页界面词典分片加载器（v0.9.370）
 *
 * 背景：merge 页有 100 种界面语言，整包词典让 merge-ui.js 涨到 2.84MB（首访 966KB）。
 * 27 个内置语言留在 merge-ui.js 里，其余 73 语各拆一片 /i18n/mg-<lang>.js，
 * 一次访问只加载当前这一份 —— 与主站 site-i18n.js + i18n/ui-*.js + i18n/ui-boot.js 同一套。
 *
 * ⚠️ 为什么必须单独一个文件：document.write 写进去的 <script src>，要等**当前脚本执行完**
 *    才会被解析执行。早先把这段写在 merge-ui.js 内部、下一行就是 init()，结果 init() 跑的时候
 *    分片还没到，首屏先渲染一遍英文（实测 h1 出来是 "Style effects and bilingual merge"）。
 *    拆成独立文件后顺序才有保证：本文件执行完 → 解析器插入并同步执行分片 → 才轮到 merge-ui.js。
 *
 * ⚠️ 位置：merge-core.js 之后、merge-ui.js 之前。依赖 window.UI_CODES（ui-codes.js）。
 *
 * ⚠️ 语言判定必须与 merge-ui.js 的 pickUiLang() 完全一致（URL > 上次手选 > 浏览器语言），
 *    否则会出现「分片按 A 语言加载、界面按 B 语言渲染」——两边各算一次迟早会不一致，
 *    所以这里算完写进 window.MG_BOOT_LANG，merge-ui.js 直接采用，不重算。
 */
(function () {
  'use strict';

  /* 内置 27 语 —— 必须与 site-i18n.js 的 UI27、merge-ui.js 的 MG_UI27 完全一致。
     这三个地方任意一处走样，同一语言在主页和本页就会出现「一处有分片、一处没有」的错位。 */
  var UI27 = ['zh-CN', 'zh-TW', 'en', 'ja', 'es', 'pt', 'ko', 'de', 'fr', 'id', 'hi', 'th', 'vi',
    'ru', 'it', 'ar', 'tr', 'nl', 'pl', 'sv', 'cs', 'uk', 'da', 'fi', 'el', 'he', 'ro'];
  var VER = '0.9.370';
  window.MG_VER = VER;

  /* 全部 100 个语言代码：优先用 ui-codes.js 的（单一数据源），没加载就用内置 27 语兜底 */
  var CODES = (window.UI_CODES && window.UI_CODES.length) ? window.UI_CODES : UI27;

  /* ---- 1. URL 首段优先：/ms/merge.html 就该是马来语界面 ----
     ⚠️ 必须整段匹配，不能 /^\/[a-z]{2}/ —— 会把 /merge.html 认成语言。 */
  var lang = null;
  var m = String(location.pathname || '').match(/^\/([a-zA-Z]{2,3}(?:-[a-zA-Z]{2,4})?)\/(?:merge|clean)\.html/);
  if (m && CODES.indexOf(m[1]) >= 0) lang = m[1];

  /* ---- 2. 上次手选的语言（下拉里的选择存在 mergeUiLang） ---- */
  if (!lang) {
    try {
      var saved = localStorage.getItem('mergeUiLang');
      if (saved && CODES.indexOf(saved) >= 0) lang = saved;
    } catch (e) { /* 隐私模式禁 localStorage：忽略，继续往下判定 */ }
  }

  /* ---- 3. 浏览器语言 ----
     ⚠️ 判定顺序与 merge-ui.js 的 detectUiLang 逐条对齐：
        zh 变体先单独判（zh-HK 要落到 zh-TW，不能因为 startsWith('zh') 就成 zh-CN），
        再按 CODES 顺序前缀匹配，最后 en 兜底。 */
  if (!lang) {
    var prefs = (navigator.languages && navigator.languages.length)
      ? navigator.languages : [navigator.language || 'zh-CN'];
    for (var i = 0; i < prefs.length && !lang; i++) {
      var l = String(prefs[i]).toLowerCase();
      if (l === 'zh-cn' || l === 'zh-hans' || l === 'zh-sg' || l === 'zh' || l.indexOf('zh-hans') === 0) { lang = 'zh-CN'; break; }
      if (l === 'zh-tw' || l === 'zh-hk' || l === 'zh-mo' || l === 'zh-hant' || l.indexOf('zh-hant') === 0) { lang = 'zh-TW'; break; }
      for (var j = 0; j < CODES.length; j++) {
        if (l.indexOf(String(CODES[j]).toLowerCase()) === 0) { lang = CODES[j]; break; }
      }
      if (!lang && l.indexOf('en') === 0) lang = 'en';
    }
  }
  if (!lang) lang = 'en';

  window.MG_BOOT_LANG = lang;

  /* ---- 4. 内置 27 语到此为止：一个请求都不发（回访 0 字节的老优势不能丢） ---- */
  if (UI27.indexOf(lang) >= 0) return;
  /* 语言代码白名单：防止把 /admin.html 之类的首段当语言去请求分片 */
  if (!/^[a-z]{2,3}(-[A-Za-z]{2,4})?$/.test(lang)) return;

  /* 同步注入：此时解析器正停在本脚本上，写进去的 <script> 会在本脚本结束后立即执行，
     早于后面的 merge-ui.js（init() 就在那里跑）。异步加载会让首屏先闪一遍英文。 */
  document.write('<script src="/i18n/mg-' + lang + '.js?v=' + VER + '"><\/script>');
})();
