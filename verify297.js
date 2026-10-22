/* v0.9.297 核验：版号 + 工作台三处界面调整（折行说明收进 ⓘ / 导出面板压高度 / 任务条那句提醒）
   + 老页与安全项没被带坏。
   用法：ROOT=<应用目录> node verify297.js   （不传就用线上目录 /opt/srt-translator）
   上线前先本地预演：ROOT=./ node verify297.js —— 必须全 OK 才上传 */
var fs = require('fs');
var path = require('path');
var ROOT = process.env.ROOT || '/opt/srt-translator';
function R(f) { return fs.readFileSync(path.join(ROOT, f), 'utf8'); }

var items = [];
function ck(name, actual, want) { items.push([name, actual, want]); }
function has(name, src, re) { ck(name, re.test(src), true); }
function no(name, src, re) { ck(name, re.test(src), false); }
/* ⚠️ 老版有个 hasAll（把 N 条 ([\s\S]*x) 前瞻串成一个正则）—— 这里**故意不用**：
   只要其中一条在文件里找不到，引擎就会在每个起始位置一路扫到文末，
   250KB 的 server.js 直接把它拖成 O(n²) 跑到 OOM 被系统 SIGKILL（本次实录：无任何输出、退出 137）。
   要查「一组东西都在」就老老实实逐个 has，报错信息也更看得懂。 */
function eachHas(name, src, list, reOf) {
  list.forEach(function (k) {
    has(name + ' · ' + k, src, reOf(k));
  });
}

/* ---------- 1. 版号（全站同步，八页） ---------- */
has('index.html 顶栏版本号 v0.9.297', R('index.html'), /class="ver">v0\.9\.297</);
has('index.html 引 site-i18n.js?v=0.9.297', R('index.html'), /site-i18n\.js\?v=0\.9\.297/);
has('translate.html 页脚 ver-tag v0.9.297', R('translate.html'), /ver-tag">v0\.9\.297</);
has('translate.html 引 site-i18n.js?v=0.9.297', R('translate.html'), /site-i18n\.js\?v=0\.9\.297/);
has('translate.html 引 srt-core.js?v=0.9.297', R('translate.html'), /srt-core\.js\?v=0\.9\.297/);
has('merge.html 顶栏版本号 v0.9.297', R('merge.html'), /class="ver">v0\.9\.297</);
has('merge.html 引 merge-core.js?v=0.9.297', R('merge.html'), /merge-core\.js\?v=0\.9\.297/);
has('clean.html 引 clean-core.js?v=0.9.297', R('clean.html'), /clean-core\.js\?v=0\.9\.297/);
has('convert.html 引 convert-core.js?v=0.9.297', R('convert.html'), /convert-core\.js\?v=0\.9\.297/);
has('convert.html 引 convert-i18n.js?v=0.9.297', R('convert.html'), /convert-i18n\.js\?v=0\.9\.297/);
has('bilingual.html 引 bilingual-core.js?v=0.9.297', R('bilingual.html'), /bilingual-core\.js\?v=0\.9\.297/);
has('bilingual.html 引 bilingual-i18n.js?v=0.9.297', R('bilingual.html'), /bilingual-i18n\.js\?v=0\.9\.297/);
has('shift.html 引 shift-core.js?v=0.9.297', R('shift.html'), /shift-core\.js\?v=0\.9\.297/);
has('shift.html 引 shift-i18n.js?v=0.9.297', R('shift.html'), /shift-i18n\.js\?v=0\.9\.297/);
has('repair.html 引 repair-core.js?v=0.9.297', R('repair.html'), /repair-core\.js\?v=0\.9\.297/);
has('repair.html 引 repair-i18n.js?v=0.9.297', R('repair.html'), /repair-i18n\.js\?v=0\.9\.297/);
no('全站再无 296 的缓存串', R('index.html') + R('translate.html') + R('repair.html') + R('shift.html'), /v=0\.9\.296/);

/* ---------- 2. 折行说明：从常驻正文收进标题后的 ⓘ ---------- */
var tr = R('translate.html');
has('说明挂到块标题后的 ⓘ（id 与取词口都在）',
  tr, /<div class="blk-title"><span data-i18n="secWrap">折行设置<\/span><i class="info" tabindex="0" id="wrapTipEl" data-tip-i18n="wrapTip">i<\/i><\/div>/);
no('那行常驻说明已经不在了', tr, /class="hint wtip" id="wrapTipEl"/);
has('块标题给了 position:relative（浮层定位基准）', tr, /\.blk-title\{[^}]*position:relative/);
has('ⓘ 键盘 / 触屏可达（tabindex=0）', tr, /id="wrapTipEl" data-tip-i18n="wrapTip">i<\/i>/);
/* 文案没删、模式联动没丢：两个属性一起重设 */
has('说明按单语/双语换口径', tr, /const key = mono \? 'wrapTip' : 'wrapTipBi';/);
has('换完两个属性都重设（取词口 + 现取文案）', tr, /tip\.setAttribute\('data-tip-i18n', key\);[\s\S]{0,120}?tip\.setAttribute\('data-tip', t\(key\)\);/);
/* ⚠️ 长文案必须留在 27 语字典里（收起来 ≠ 删掉） */
var dic = R('site-i18n.js');
['wrapTip', 'wrapTipBi'].forEach(function (k) {
  ck('字典里 ' + k + ' 仍是 27 语', (dic.match(new RegExp('(^|[^A-Za-z0-9_])' + k + '\\s*:', 'g')) || []).length, 27);
});

/* ---------- 3. 导出格式面板：压高度但不许把字挤掉、不许动状态源 ---------- */
has('.fmt-panel 组间距压到 6px', tr, /\.fmt-panel\{[^}]*gap:6px/);
has('.fmt-row 内边距压到 4px', tr, /\.fmt-row\{[^}]*padding:4px/);
has('.fmt-btn 内边距/字号/行距都压了', tr, /\.fmt-btn\{[^}]*font-size:11px;line-height:1\.25;padding:4px 3px/);
has('.fmt-btn .sub 小注压到 9.5px', tr, /\.fmt-btn \.sub\{font-size:9\.5px/);
has('内容组按钮字号 10.5px', tr, /#fmtRowKind \.fmt-btn\{[^}]*font-size:10\.5px/);
/* 状态源与可见性规则一个都不能少（按钮只是 select 的可视层） */
has('隐藏的 select#expStyle 还在（唯一状态源）', tr, /<select id="expStyle" class="vh"/);
has('expStyle 的视觉隐藏样式还在', tr, /#expStyle\.vh\{/);
has('按钮隐藏态规则还在', tr, /\.fmt-btn\[hidden\]\{display:none\}/);
has('focus 环还在（WCAG 2.4.7）', tr, /\.fmt-btn:focus-visible\{outline:2px solid var\(--acc\)/);
has('文件组选中态还在', tr, /#fmtRowFile \.fmt-btn\.on\{background:var\(--acc-weak\)/);
eachHas('文件格式按钮的文案键在', tr,
  ['fmtSubSrt', 'fmtSubVtt', 'fmtSubSbv', 'fmtSubTxt'],
  function (k) { return new RegExp("'" + k + "'"); });
has('ASS 两颗仍复用上下双屏/底部双行的小注', tr, /ass:'assSplit', 'ass-stack':'assStack'/);

/* ---------- 4. 任务条下方那句提醒 ---------- */
has('提醒位挂上了，且默认隐藏', tr, /<div class="pg-busy" id="pgBusy" data-i18n="pgBusyTip" hidden>/);
has('开关函数 pgBusy 在', tr, /function pgBusy\(on\)\{[\s\S]{0,140}?el\.hidden=!on;/);
has('pgStart 里打开', tr, /pgBusy\(true\);/);
has('pgFinish 里关掉', tr, /function pgFinish\(\)\{\s*PG\.ok=true;\s*pgBusy\(false\);/);
has('任务条收起时也关掉', tr, /\$\('prog'\)\.classList\.remove\('run'\); pgBusy\(false\); document\.title=BASE_TITLE/);
has('那句提醒走灰色弱化（不抢进度信息）', tr, /\.pg-busy\{[^}]*color:var\(--mut\)/);
ck('pgBusyTip 27 语齐全', (dic.match(/(?<![A-Za-z0-9_])pgBusyTip\s*:/g) || []).length, 27);
has('中文那条就是用户要的那句', dic, /pgBusyTip:'AI 算力紧张，等一会就出结果了'/);
/* 非中日韩语言不许混汉字（防模型照抄原文） */
var BADHAN = /[\u4e00-\u9fff]/;
var langs = ['en', 'es', 'pt', 'ko', 'de', 'fr', 'id', 'hi', 'th', 'vi', 'ru', 'it', 'ar', 'tr', 'nl',
  'pl', 'sv', 'cs', 'uk', 'da', 'fi', 'el', 'he', 'ro'];
var hanHit = [];
langs.forEach(function (lg) {
  var m = dic.split("'" + lg + "': {")[1];
  if (!m) { hanHit.push(lg + '(块没找到)'); return; }
  var v = (m.match(/pgBusyTip:'((?:[^'\\]|\\.)*)'/) || [])[1];
  if (!v) hanHit.push(lg + '(缺)');
  else if (BADHAN.test(v)) hanHit.push(lg + ':' + v);
});
ck('24 种非中日韩语言的 pgBusyTip 都干净', hanHit.join(' | ') || 'ok', 'ok');

/* ---------- 5. 服务端与安全项：一条都不能退 ---------- */
var sv = R('server.js');
has('第八页的 SEO 表 SEO_REPAIR 在', sv, /const SEO_REPAIR = \{/);
/* ⚠️ 首页在表里的 key 是 index（不是 home），逐个查 —— 别再用前瞻串一条正则 */
var pages = sv.split('const SEO_PAGES = {')[1].split('\n};')[0];
['index', 'translate', 'merge', 'clean', 'convert', 'bilingual', 'shift', 'repair'].forEach(function (k) {
  has('SEO_PAGES 登记了 ' + k, pages, new RegExp('\\b' + k + ':\\s*\\{\\s*file:'));
});
ck('SEO_PAGES 恰好 8 个页面', (pages.match(/\b[a-z][a-z0-9]*:\s*\{\s*file:/g) || []).length, 8);
has('路由正则带上八个页名', sv, /\^\\\/\(merge\|clean\|translate\|convert\|bilingual\|shift\|repair\)\\\.html\$/);
has('sitemap 注释仍是八页 216 条', sv, /八页 × 27 语言 = 216/);
has('serveStatic 仍先把 /data 前缀挡掉', sv, /p === '\/data' \|\| p\.startsWith\('\/data\/'\)/);
has('admin 登录限流仍在（排在校验之前）', sv, /loginLocked\(/);

/* ---------- 6. 293 的隐私文案不许回潮（v0.9.221 定案） ---------- */
var BAD = /不上传服务器|不上傳伺服器|文件不上传|檔案不會上傳|noteLocal|tagLocal/;
var BADEN = /never uploaded|never upload|nothing is uploaded/i;
['clean.html', 'convert.html', 'bilingual.html', 'shift.html', 'repair.html'].forEach(function (f) {
  no(f + ' 无「不上传服务器」类文案', R(f), BAD);
  no(f + ' 无 never uploaded 英文句', R(f), BADEN);
  no(f + ' 底部 note 行没回来', R(f), /class="note"/);
});
/* ⚠️ 只查「界面文案」，把 seo* 那几条正文条目剔掉：落地页的 SEO 正文里那句
   「字幕数据全程不上传服务器（除非你勾选了云端翻译）」是 283 之前就有的落地页文案，
   不在 v0.9.221「删掉工作台那行 note」的范围内 —— 整份字典一起查会误报。 */
var dicNoSeo = dic.replace(/seo[A-Za-z]*:'(?:[^'\\]|\\.)*',/g, '');
no('site-i18n.js 的界面文案里无「不上传服务器」', dicNoSeo, BAD);

/* ---------- 7. 别的页面别被带坏 ---------- */
has('convert.html 输出格式下拉还在', R('convert.html'), /id="outFmt"/);
has('bilingual.html 剥离方向下拉还在', R('bilingual.html'), /id="mode"/);
has('clean.html 清洗功能还在', R('clean.html'), /clean-core\.js/);
has('shift.html 体检卡还在', R('shift.html'), /id="chkCard"/);
has('repair.html 按字节读仍在', R('repair.html'), /readAsArrayBuffer/);
no('repair.html 仍没有 readAsText', R('repair.html'), /\.readAsText\(/);
ck('shift-i18n.js 的 chkTitle 仍是 27 语',
  (R('shift-i18n.js').match(new RegExp('(^|[^A-Za-z_])chkTitle\\s*:', 'gm')) || []).length, 27);
/* 折行那两个输入框与取值一律不许动 */
ck('maxW 仍恰好一处', (tr.match(/id="maxW"/g) || []).length, 1);
ck('biMaxW 仍恰好一处', (tr.match(/id="biMaxW"/g) || []).length, 1);
has('双语行宽仍是默认隐藏', tr, /<div class="wr-cell" id="wcellBiMaxW" hidden>/);
/* 老页本轮不该出现新页链接（首页卡片区不动） */
['index.html', 'translate.html', 'merge.html', 'clean.html', 'convert.html', 'bilingual.html', 'shift.html']
  .forEach(function (f) { no(f + ' 没被塞进 /repair.html', R(f), /repair\.html/); });

var bad = 0;
items.forEach(function (it) {
  var ok = it[1] === it[2];
  if (!ok) bad++;
  console.log((ok ? 'OK   ' : 'MISS ') + it[0] + (ok ? '' : '   [实际=' + it[1] + ' 期望=' + it[2] + ']'));
});
console.log('\n== ' + (items.length - bad) + '/' + items.length + ' ==');
process.exit(bad ? 1 : 0);
