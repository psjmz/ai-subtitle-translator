/* v0.9.277 一次性生成脚本：把 index.html 的工作台拆成 translate.html
   用法：node _gen277.js
   ⚠️ 只在 v0.9.277 这次拆家用，验完就删。 */
'use strict';
const fs = require('fs');

const SRC = 'index.html';
const L = fs.readFileSync(SRC, 'utf8').split('\n');
const at = (n) => L[n - 1];
const seg = (a, b) => L.slice(a - 1, b).join('\n');

/* ---------- 先确认每一刀切在哪（写死行号前必须验） ---------- */
const EXPECT = [
  [1, '<!DOCTYPE html>'],
  [1008, '</head>'],
  [1009, '<body>'],
  [1014, '<div id="viewLanding">'],
  [1245, '<div id="viewWorkspace">'],
  [1811, '</div>'],
  [1812, ''],
  [1817, '<script src="srt-core.js'],
  [1818, '<script>'],
  [7807, '</script>'],
  [7808, '<script src="site-nav.js" data-tool="tr"></script>'],
  [7809, '</body>'],
  [7810, '</html>']
];
let bad = 0;
EXPECT.forEach(([n, head]) => {
  const ok = at(n).startsWith(head);
  if (!ok) { bad++; console.log('✗ 第 ' + n + ' 行不是 "' + head + '" → ' + at(n).slice(0, 80)); }
});
if (bad) { console.log('边界不对，中止'); process.exit(1); }
console.log('✓ 12 处边界全部核对通过');

const VER = '0.9.277';
let head = seg(1, 1008);
const ws = seg(1245, 1811);
const foot = seg(1813, 1816);
let script = seg(1819, 7806);

/* ---------- head：补工作台专属的两处 ---------- */
/* 1) 工作台默认是隐藏的（CSS #viewWorkspace{display:none}），原来靠 showView('workspace')
      改成 flex；现在没有首页那一半，直接在这里解锁。 */
head = head.replace('</style>',
  '  /* v0.9.277：本页只有工作台，没有首页那一半 —— 默认就展开。\n' +
  '     原来的 #viewWorkspace{display:none} 是给「上传后自动进工作台」留的初始态。 */\n' +
  '  #viewWorkspace{display:flex}\n' +
  '</style>');
head = head.replace(
  '<!-- 以下 SEO head 区块由 server.js 按语言路由（/ /en/ /zh-TW/ /ja/）注入对应语言版本；直接以文件方式打开时显示简体中文默认版 -->',
  '<!-- 以下 SEO head 区块由 server.js 按语言路由（/translate.html、/en/translate.html …）注入对应语言版本；\n     直接以文件方式打开时显示简体中文默认版。\n     ⚠️ 本页是「字幕翻译工作台」，落地页在 / —— 两页的 title/description 由 server.js 分开给。 -->');
if (!/#viewWorkspace\{display:flex\}/.test(head)) { console.log('✗ head 补丁没落上'); process.exit(1); }

/* ---------- 脚本：把「首页那半边」的引用改成安全写法 ---------- */
const patch = (oldStr, newStr, label) => {
  if (script.indexOf(oldStr) < 0) { console.log('✗ 没找到要改的片段：' + label); process.exit(1); }
  script = script.split(oldStr).join(newStr);
  console.log('✓ ' + label);
};

/* 1) 顶栏「返回首页」：本页已经没有 landing 视图了，直接回首站 */
patch(
  "document.getElementById('btnBackHome').addEventListener('click', function(){ showView('landing'); });",
  "document.getElementById('btnBackHome').addEventListener('click', function(){ location.href='/'; });",
  '返回首页按钮改跳 /');

/* 2) 首页那两个备选入口（粘贴 / 载入示例）本页没有 → 判空跳过 */
patch(
  "document.getElementById('altPaste').addEventListener('click', function(){ showView('workspace'); setTimeout(function(){ $('paste').focus(); }, 60); });\n" +
  "document.getElementById('altDemo').addEventListener('click', function(){ $('btnDemo').click(); });",
  "var ap=$('altPaste'), ad=$('altDemo');\n" +
  "if (ap) ap.addEventListener('click', function(){ showView('workspace'); setTimeout(function(){ $('paste').focus(); }, 60); });\n" +
  "if (ad) ad.addEventListener('click', function(){ $('btnDemo').click(); });",
  '首页备选入口加判空');

/* 3) 语言切换的 URL 改写：原来一律 rewrite 成 /ja/ —— 在工作台会把人踢回首页 */
patch(
  "      const p = UI.lang==='zh-CN' ? '/' : ('/'+UI.lang+'/'+(location.search||'')+(location.hash||''));",
  "      /* v0.9.277：本页自带文件名，别把 /ja/translate.html 改写成 /ja/（会跳回落地页） */\n" +
  "      const p = (UI.lang==='zh-CN' ? '/' : '/'+UI.lang+'/') + SELF_PAGE + (location.search||'') + (location.hash||'');",
  '语言切换保留文件名');

/* 4) 语言路由识别：/ja/ 与 /ja/translate.html 都要认得出来 */
patch(
  "    const m = location.pathname.match(/^\\/(zh-CN|zh-TW|en|ja|es|pt|ko|de|fr|id|hi|th|vi|ru|it|ar|tr|nl|pl|sv|cs|uk|da|fi|el|he|ro)\\/?$/);",
  "    /* v0.9.277：工作台的 URL 是 /ja/translate.html 这种带文件名的，原正则只认 /ja/ */\n" +
  "    const m = location.pathname.match(/^\\/(zh-CN|zh-TW|en|ja|es|pt|ko|de|fr|id|hi|th|vi|ru|it|ar|tr|nl|pl|sv|cs|uk|da|fi|el|he|ro)(?:\\/(?:translate\\.html)?)?$/);",
  '语言路由认带文件名的路径');

/* 5) SELF_PAGE 常量：紧跟 const C = window.SrtCore; 之后 */
patch(
  "const C = window.SrtCore;",
  "const C = window.SrtCore;\n" +
  "/* v0.9.277：本页文件名 —— 切界面语言要改写 URL 用（不能写成 '/'，那是落地页） */\n" +
  "const SELF_PAGE = 'translate.html';",
  '加 SELF_PAGE 常量');

/* 6) 落幕：不再有 landing 可显示，直接展开工作台 */
patch(
  "/* 首屏默认首页；#ws 直达工作台 */\nshowView(location.hash==='#ws' ? 'workspace' : 'landing');",
  "/* v0.9.277：本页就是工作台，没有首页那一半。\n   showView 依赖 viewLanding 存在（不存在时会直接 return），所以这里自己展开。 */\n" +
  "(function(){ var ws=document.getElementById('viewWorkspace'); if(ws) ws.style.display='flex'; })();",
  '首屏直接展开工作台');

/* ---------- 拼装 ---------- */
const out = [
  head,
  '<body>',
  '',
  '<!-- ================================================================',
  '     v0.9.277：字幕翻译工作台。',
  '     原先这一整块挂在 index.html 里，和落地页共存（上传后自动切换视图）；',
  '     现在落地页留在 / ，工作台拆出来独立成 /translate.html。',
  '     ⚠️ 引擎（srt-core.js）与下面的内联脚本一字未改，只是少了首页那半边 DOM。',
  '     ================================================================ -->',
  ws,
  '',
  foot,
  '',
  '<script src="site-i18n.js?v=' + VER + '"></script><!-- v0.9.277：27 语界面字典，与落地页共用一份 -->',
  '<script src="srt-core.js?v=' + VER + '"></script><!-- v0.9.75：URL 带版本参数，发版即换缓存 -->',
  '<script>',
  script,
  '</script>',
  '<script src="site-nav.js" data-tool="tr"></script>',
  '</body>',
  '</html>',
  ''
].join('\n');

fs.writeFileSync('translate.html', out);
console.log('\ntranslate.html 已生成：' + out.length + ' 字节 / ' + out.split('\n').length + ' 行');
const assert = (cond, msg) => { if (!cond) { console.log('✗ ' + msg); process.exit(1); } console.log('✓ ' + msg); };
assert(!/id="viewLanding"/.test(out), '不再含首页视图 DOM');
assert(out.indexOf('srt-core.js?v=' + VER) > out.indexOf('site-i18n.js?v=' + VER), '字典先于引擎加载');
assert(!/const UI_LANGS|const I18N =|function t\(k\)|function detectUiLang/.test(out), '没有与 site-i18n.js 重名的声明');
assert(!/showView\('landing'\)/.test(out), '没有再切回落地页视图的调用');
