/* =============================================================================
   首页（落地页）脚本 —— v0.9.277
   ⚠️ 本页**不加载** srt-core.js：翻译引擎全在 /translate.html，首页只做介绍。
      这里只负责四件事：
       1) 老链接兼容（/#ws 以前是「直达工作台」）
       2) 界面语言：识路径 → 读偏好 → 跟浏览器；切换时改写 URL 并回填 bookkeeping
       3) 数字带的实时统计（/api/stats）
       4) 视频下载卡的显示条件（只官方域名，开源版/自部署不挂外链）
   ⚠️ UI_LANGS / I18N / UI / t / detectUiLang 来自 site-i18n.js（本文件之前加载），
      这里不许再声明同名符号 —— 重复顶层声明是 SyntaxError。
   ============================================================================= */
'use strict';

/* ----------------------------------------------------------------
   ① 老链接兼容：/#ws 与 /index.html#ws 以前是「跳过首页直接进工作台」。
      工作台现在在 /translate.html，把老书签送过去，
      语言目录带上一起走（/ja/#ws → /ja/translate.html）。
   ---------------------------------------------------------------- */
(function () {
  if (location.hash !== '#ws') return;
  var m = location.pathname.match(/^\/([A-Za-z]{2}(?:-[A-Za-z]{2})?)\//);
  var pre = (m && UI_LANGS.some(function (x) { return x[0] === m[1]; })) ? '/' + m[1] + '/' : '/';
  try { location.replace(pre + 'translate.html'); } catch (e) { location.href = pre + 'translate.html'; }
})();

/* ----------------------------------------------------------------
   ② 界面语言
   ---------------------------------------------------------------- */
var SV_KEY = 'srtTool';   /* 与工作台同一个存档键：后台挑的语言，到工作台还是那一种 */

function readSv() {
  try { return JSON.parse(localStorage.getItem(SV_KEY) || '{}') || {}; } catch (e) { return {}; }
}
function writeSv(patch) {
  try {
    var o = readSv();
    for (var k in patch) o[k] = patch[k];
    localStorage.setItem(SV_KEY, JSON.stringify(o));
  } catch (e) { /* 隐私模式写不了就算了，不影响看页面 */ }
}
/* 语言路由：/ja/ 与 /ja/index.html 都算（zh-CN 走站点根 /） */
function pathUiLang() {
  try {
    var m = location.pathname.match(/^\/(zh-CN|zh-TW|en|ja|es|pt|ko|de|fr|id|hi|th|vi|ru|it|ar|tr|nl|pl|sv|cs|uk|da|fi|el|he|ro)(?:\/(?:index\.html)?)?$/);
    if (m && UI_LANGS.some(function (x) { return x[0] === m[1]; })) return m[1];
  } catch (e) {}
  return null;
}

function applyI18n() {
  document.documentElement.lang = UI.lang;
  document.documentElement.dir = (UI.lang === 'ar' || UI.lang === 'he') ? 'rtl' : 'ltr';
  document.title = t('docTitle');
  Array.prototype.forEach.call(document.querySelectorAll('[data-i18n]'), function (el) {
    el.textContent = t(el.getAttribute('data-i18n'));
  });
  Array.prototype.forEach.call(document.querySelectorAll('[data-i18n-html]'), function (el) {
    el.innerHTML = t(el.getAttribute('data-i18n-html'));
  });
  Array.prototype.forEach.call(document.querySelectorAll('[data-i18n-ph]'), function (el) {
    el.placeholder = t(el.getAttribute('data-i18n-ph'));
  });
  Array.prototype.forEach.call(document.querySelectorAll('[data-i18n-aria]'), function (el) {
    el.setAttribute('aria-label', t(el.getAttribute('data-i18n-aria')));
  });
  var u2 = document.getElementById('uiLang2');
  if (u2) u2.value = UI.lang;
  if (typeof repaintStats === 'function') repaintStats();
}

(function initLang() {
  var sv = readSv();
  UI.lang = pathUiLang() || (sv.langManual && UI_LANGS.some(function (x) { return x[0] === sv.uiLang; }) ? sv.uiLang : detectUiLang());
  UI.langManual = !!sv.langManual;

  var sel = document.getElementById('uiLang2');
  if (sel) {
    UI_LANGS.forEach(function (pair) {
      var o = document.createElement('option');
      o.value = pair[0]; o.textContent = pair[1];
      sel.appendChild(o);
    });
    sel.value = UI.lang;
    sel.addEventListener('change', function () {
      UI.lang = sel.value;
      UI.langManual = true;
      writeSv({ uiLang: UI.lang, langManual: 1 });   /* 与工作台共用一份存档 */
      applyI18n();
      /* URL 与界面语言保持一致（可分享、可被搜索引擎按语言收录） */
      if (location.protocol.indexOf('http') === 0) {
        try {
          history.replaceState(null, '', UI.lang === 'zh-CN' ? '/' : '/' + UI.lang + '/' + (location.search || '') + (location.hash || ''));
        } catch (e) {}
      }
    });
  }
  applyI18n();
})();

/* ----------------------------------------------------------------
   ③ 数字带的实时统计（这三个数是「服务用户 / 字幕数 / Token」）
      接口拿不到就保持占位符 ——，不清零、不报错
   ---------------------------------------------------------------- */
var statsRaw = null;
function fmtCount(n, lang) {
  n = Number(n) || 0;
  var zh = /^zh|^ja$|^ko$/.test(lang || 'zh-CN');
  if (n < 10000) return n.toLocaleString(lang || 'zh-CN');
  if (zh) {
    if (n < 100000000) return (n / 10000).toFixed(n < 100000 ? 1 : 0).replace(/\.0$/, '') + '万';
    return (n / 100000000).toFixed(1).replace(/\.0$/, '') + '亿';
  }
  if (n < 1000000) return (n / 1000).toFixed(n < 10000 ? 1 : 0).replace(/\.0$/, '') + 'K';
  if (n < 1000000000) return (n / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  return (n / 1000000000).toFixed(1).replace(/\.0$/, '') + 'B';
}
function paintStats(s) {
  statsRaw = s;
  var lang = (typeof UI !== 'undefined' && UI && UI.lang) ? UI.lang : 'zh-CN';
  var vals = { ldUsers: fmtCount(s.users, lang), ldSubs: fmtCount(s.subs, lang), ldTok: fmtCount(s.tokens, lang) };
  for (var id in vals) {
    var el = document.getElementById(id);
    if (el) el.textContent = vals[id];
  }
}
function repaintStats() { if (statsRaw) paintStats(statsRaw); }
(function startStats() {
  try {
    fetch('/api/stats', { cache: 'no-store' })
      .then(function (r) { return r && r.ok ? r.json() : null; })
      .then(function (s) { if (s) paintStats(s); })
      .catch(function () { /* 拿不到就保持 —，不清零 */ });
  } catch (e) {}
  /* 与工作台同一节奏：30 分钟一次 */
  setInterval(function () {
    try {
      fetch('/api/stats', { cache: 'no-store' }).then(function (r) { return r && r.ok ? r.json() : null; })
        .then(function (s) { if (s) paintStats(s); }).catch(function () {});
    } catch (e) {}
  }, 30 * 60 * 1000);
})();

/* ----------------------------------------------------------------
   ④ 视频下载工具：只在官方域名显示
      开源版 / 自部署实例挂这张卡等于给别人白送外链，所以默认藏着。
      本地预览要看的话：?rkbanner=1（落 sessionStorage，之后换语言也不掉）
   ---------------------------------------------------------------- */
(function () {
  var force = false;
  try {
    if (/[?&]rkbanner=1/.test(String(location.search || ''))) sessionStorage.setItem('rkForce', '1');
    force = sessionStorage.getItem('rkForce') === '1';
  } catch (e) {}
  var host = String(location.hostname || '');
  var on = /(^|\.)ai-srtsub\.com$/i.test(host) || force;
  if (!on) return;
  var card = document.getElementById('dlCard'), sec = document.getElementById('dlSec');
  if (card) card.style.display = '';
  if (sec) sec.style.display = '';
})();
