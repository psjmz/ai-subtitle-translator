/* v0.9.277 收尾脚本：工作台页的两处补齐
   1) 顶栏加 #siteNav 挂载点（原 index.html 里它是长在首页那一半上的，
      工作台拆出来之后就一直是空的 → 三个工具之间没有导航）
   2) 页面 <title> 走自己的词条 wsDocTitle —— 否则 applyI18n 会用首页那句
      docTitle 把 server 注入的本页 SEO 标题盖掉，等于白写了 27 语 SEO
   用法：node _ws277.js */
'use strict';
const fs = require('fs');
let src = fs.readFileSync('translate.html', 'utf8');
const need = (s, m) => { if (src.indexOf(s) < 0) { console.log('✗ 找不到：' + m); process.exit(1); } };

/* ---------- 1) 顶栏导航挂载点 ---------- */
need('<div class="spacer"></div>', 'appbar 的 spacer');
if (src.indexOf('id="siteNav"') >= 0) { console.log('✗ 已经有 siteNav 了（重复插入）'); process.exit(1); }
src = src.replace(
  '<div class="spacer"></div>',
  '<!-- v0.9.277：三个工具之间的导航。原先它长在首页那一半，工作台独立后这边一直空着 -->\n' +
  '    <span id="siteNav"></span>\n' +
  '    <div class="spacer"></div>'
);

/* ---------- 2) 版号 ---------- */
need('<span class="ver-tag">v0.9.276</span>', '顶栏版号');
src = src.replace('<span class="ver-tag">v0.9.276</span>', '<span class="ver-tag">v0.9.277</span>');

/* ---------- 3) 本页标题 ---------- */
const anchor = "(function(){ var ws=document.getElementById('viewWorkspace'); if(ws) ws.style.display='flex'; })();";
need(anchor, '首屏展开那段');
src = src.replace(anchor, anchor + "\n" +
  '/* v0.9.277：本页 <title> 用 wsDocTitle —— applyI18n 里那句通用的 document.title = t(\'docTitle\')\n' +
  '   会把 server.js 注入的本页 SEO 标题盖成首页那句。这里在它跑完之后补回来。 */\n' +
  "(function(){\n" +
  "  var orig = applyI18n;\n" +
  "  applyI18n = function(){ orig(); document.title = t('wsDocTitle'); };\n" +
  "  applyI18n();\n" +
  "})();");

fs.writeFileSync('translate.html', src);
const out = fs.readFileSync('translate.html', 'utf8');
const A = (c, m) => { if (!c) { console.log('✗ ' + m); process.exit(1); } console.log('✓ ' + m); };
A((out.match(/id="siteNav"/g) || []).length === 1, '顶栏导航挂载点已加上（且只有一处）');
A(/<span class="ver-tag">v0\.9\.277<\/span>/.test(out), '顶栏版号升到 277');
A((out.match(/class="ver-tag">v0\.9\.276/g) || []).length === 0, '没有残留的 276 版号');
A(/wsDocTitle/.test(out), '标题改走 wsDocTitle');
A(/document\.title = t\('wsDocTitle'\)/.test(out), 'applyI18n 跑完会补回本页标题');
console.log('translate.html：' + out.split('\n').length + ' 行');
