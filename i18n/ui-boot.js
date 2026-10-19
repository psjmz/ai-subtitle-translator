/* =============================================================================
   ui-boot.js —— 界面语言分片加载器（v0.9.338 起）
 *
 * 背景：site-i18n.js 里是 27 语的完整字典（约 1.6 MB）。界面语言要扩到 100 语，
 * 若把 73 份新语言全塞进同一个文件，首页要下载约 6 MB JS —— 这不是"慢一点"，
 * 是直接把首屏拖垮。所以新语言按语言拆成独立分片 /i18n/ui-<lang>.js，只加载当前这一份。
 *
 * 加载方式：document.write 同步注入。
 *   必须同步 —— 页面内联脚本执行时就要读 I18N[UI.lang]，异步加载会先渲染一遍原文（闪烁）。
 *   代价是老浏览器会有一次解析阻塞，但只影响"新语言页面"，27 个老语言完全不受影响。
 *
 * 位置：必须紧跟 site-i18n.js 之后、页面自己的脚本之前。
 *   这时 const I18N 已存在（同一对象引用），分片直接 mutate 它即可：
 *   I18N['ms'] = {...}  —— 其它脚本拿到的还是同一个对象。
 *
 * ⚠️ 27 个既有语言在 I18N 里已有词条 → 本文件直接返回，不发任何请求。
 * ============================================================================= */
(function () {
  'use strict';
  var S = window.SiteI18N;
  if (!S || !S.I18N) return;

  /* 当前语言：优先 URL 首段（/ms/translate.html），没有语言段时**必须**跟页面用同一套判定，
     也就是 detectUiLang()（浏览器语言 + 用户手选）。
     ⚠️ 不能退回 <html lang="zh-CN"> —— 那是 HTML 里的静态默认值，跟用户真实语言无关，
        早先这么写会让所有非中文访客都拿到中文分片（zh-CN 在字典里，于是干脆不分片）。
     注意 segment 必须整段匹配，不能 /^\/[a-z]{2}/ 这种前缀匹配 —— 会把 /merge.html 认成语言。 */
  var lang = null;
  var m = location.pathname.match(/^\/([a-zA-Z]{2,3}(?:-[A-Za-z]{2,4})?)(?:\/|$)/);
  if (m) lang = m[1];
  if (!lang && typeof S.detectUiLang === 'function') lang = S.detectUiLang();
  if (!lang) lang = 'zh-CN';

  /* ---------------------------------------------------------------------------
     v0.9.339：运行时按需加载（用户在页面里手动切界面语言时用）。
     首次进入只加载「当前语言」这一份；切到另一种新语言时再异步补那一份。
     ⚠️ 必须定义在任何提前返回之前 —— 老 27 语页面会从下面 return，
        定义放在后面的话那些页面根本没有 loadShard，切到新语言就一直是英文。
     ⚠️ 不能只 document.write —— 那时解析已结束，写了会整页清空。
     ⚠️ 同一语言并发点两次要合并成一次请求（pending 队列），否则会插两个同 src 的 script。
     404（分片还没做）时 onerror 也回调：t() 会回落英文，界面不会卡住。
     --------------------------------------------------------------------------- */
  var pending = {};
  S.loadShard = function (lang, cb) {
    var fire = function () { if (typeof cb === 'function') { try { cb(); } catch (e) {} } };
    if (!lang || S.I18N[lang]) { fire(); return; }
    if (!/^[a-z]{2,3}(-[A-Za-z]{2,4})?$/.test(String(lang))) { fire(); return; }
    if (pending[lang]) { pending[lang].push(fire); return; }
    pending[lang] = [fire];
    var el = document.createElement('script');
    el.src = '/i18n/ui-' + lang + '.js?v=0.9.339';
    el.async = false;
    el.onload = el.onerror = function () {
      var q = pending[lang] || [];
      delete pending[lang];
      for (var i = 0; i < q.length; i++) q[i]();
    };
    (document.head || document.documentElement).appendChild(el);
  };

  /* 已经是内置语言（27 语之一）：解析期什么都不用加载 */
  if (S.I18N[lang]) return;
  /* 语言代码白名单校验：防止把 /admin.html 之类的首段当语言去请求分片 */
  if (!/^[a-z]{2,3}(-[A-Za-z]{2,4})?$/.test(lang)) return;

  /* v= 与页面版号绑定；分片本身是 no-cache + Last-Modified，带 v 只是让 CDN 层也换 */
  document.write('<script src="/i18n/ui-' + lang + '.js?v=0.9.339"><\/script>');
})();
