/* v0.9.368 —— 中文页（无前缀 URL）的英文正文与标题兜底。
   ============================================================================
   问题：界面语言从 v0.9.136 起按浏览器语言自动切换，不认识的语言落英文；
        但页面底部那段 SEO 正文和 <title> 是**服务端按 URL 语言**注入的。
        无前缀 URL 的 URL 语言恒为 zh-CN，于是一位卢森堡语访客看到的是
        「英文界面 + 中文正文 + 中文标签页标题」。
   做法：服务端只在 zh 路由多塞一份英文进 <template id="seo-alt-en">（不渲染、不进
        正文流、不进可访问性树），界面语言不是中文时把它换上去；切回中文再换回来。
   ⚠️ 判断依据是 <html lang>，不是 navigator.languages：
      20 个页面都在 applyI18n 里写 document.documentElement.lang，这是唯一统一且
      实时的信号。读 navigator 的话，用户在下拉框里手动选回中文就换不回来了。
   ⚠️ 只用 <template>，不要用隐藏 div：隐藏 div 会被当成正文参与索引。
   ============================================================================ */
(function () {
  'use strict';
  var tpl = document.getElementById('seo-alt-en');
  if (!tpl || !tpl.content) return;
  var live = document.querySelector('section.seo');
  var alt = tpl.content.querySelector('section.seo');
  if (!live || !alt) return;

  var titleZh = document.title;
  var titleEn = tpl.getAttribute('data-title') || '';
  var zhOrigin = tpl.getAttribute('data-zh-title') || '';
  /* 标题归谁管：qc/lrc/split/table/batch/translate/index 这 7 页在 applyI18n 里
     自己写 document.title = t('docTitle')，我们到这儿时它已经是界面语言那版，
     与 data-zh-title 对不上 —— 那就别碰，免得跟页面自己的措辞打架。
     剩下 13 页（shift/convert/repair/…）从不改标题，此刻还是服务端那份中文，
     由我们代管：界面语言不是中文时换成英文，切回中文再还原。 */
  var ownTitle = !!titleEn && document.title === zhOrigin;
  var swapped = false;
  var cur = live;

  /* 取不到 lang 时按中文处理：中文页的缺省就是中文，别因为属性缺失把正文换成英文 */
  function isZh() {
    var l = String(document.documentElement.lang || '').toLowerCase();
    return l === '' || l.indexOf('zh') === 0;
  }

  function apply() {
    var want = !isZh();
    if (want === swapped) return;
    var next = want ? alt.cloneNode(true) : live;
    if (want) {
      next.setAttribute('lang', 'en');
      /* 阿拉伯语/希伯来语界面下 <html dir="rtl">，英文段落跟着右对齐会读起来很怪，
         这一段单独标成 ltr（还原时用的是原来那个节点，不带 dir，自然恢复）。 */
      next.setAttribute('dir', 'ltr');
    }
    cur.replaceWith(next);
    cur = next;
    swapped = want;
    if (ownTitle) document.title = want ? titleEn : titleZh;
  }

  apply();
  /* 手动切语言时各页只改 <html lang>，监听它就能跟上，不必改 20 个页面。
     （TP 分片异步加载完会再跑一次 applyI18n，属性被重写同样会触发。） */
  try {
    new MutationObserver(apply).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  } catch (e) { }
  /* 兜底：个别页面在 load 之后才写 lang（或别处 disconnect 了观察器） */
  window.addEventListener('load', apply);
})();
