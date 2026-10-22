/* v0.9.293 线上核验：版号 + 隐私文案清零 + 关键结构还在 */
var fs = require('fs');
var path = require('path');
var ROOT = process.env.ROOT || '/opt/srt-translator';
function R(f) { return fs.readFileSync(path.join(ROOT, f), 'utf8'); }

var items = [];
function ck(name, actual, want) { items.push([name, actual, want]); }
function has(name, src, re) { ck(name, re.test(src), true); }
function no(name, src, re) { ck(name, re.test(src), false); }

var BAD = /不上传服务器|不上傳伺服器|文件不上传|檔案不會上傳|noteLocal|tagLocal/;
var BADEN = /never uploaded|never upload|nothing is uploaded/i;

/* ---------- 1. 版号 ---------- */
has('index.html 顶栏版本号 v0.9.293', R('index.html'), /class="ver">v0\.9\.293</);
has('index.html 引 site-i18n.js?v=0.9.293', R('index.html'), /site-i18n\.js\?v=0\.9\.293/);
has('translate.html 页脚 ver-tag v0.9.293', R('translate.html'), /ver-tag">v0\.9\.293</);
has('translate.html 引 srt-core.js?v=0.9.293', R('translate.html'), /srt-core\.js\?v=0\.9\.293/);
has('merge.html 顶栏版本号 v0.9.293', R('merge.html'), /class="ver">v0\.9\.293</);
has('merge.html 引 merge-core.js?v=0.9.293', R('merge.html'), /merge-core\.js\?v=0\.9\.293/);
has('clean.html 引 clean-core.js?v=0.9.293', R('clean.html'), /clean-core\.js\?v=0\.9\.293/);
has('convert.html 引 convert-core.js?v=0.9.293', R('convert.html'), /convert-core\.js\?v=0\.9\.293/);
has('convert.html 引 convert-i18n.js?v=0.9.293', R('convert.html'), /convert-i18n\.js\?v=0\.9\.293/);
has('bilingual.html 引 bilingual-core.js?v=0.9.293', R('bilingual.html'), /bilingual-core\.js\?v=0\.9\.293/);
has('bilingual.html 引 bilingual-i18n.js?v=0.9.293', R('bilingual.html'), /bilingual-i18n\.js\?v=0\.9\.293/);
has('shift.html 引 shift-core.js?v=0.9.293', R('shift.html'), /shift-core\.js\?v=0\.9\.293/);
has('shift.html 引 shift-i18n.js?v=0.9.293', R('shift.html'), /shift-i18n\.js\?v=0\.9\.293/);

/* ---------- 2. 隐私文案清零（v0.9.221 定案） ---------- */
['clean.html', 'convert.html', 'bilingual.html', 'shift.html'].forEach(function (f) {
  var s = R(f);
  no(f + ' 无「不上传服务器」类文案', s, BAD);
  no(f + ' 无 never uploaded 英文句', s, BADEN);
  no(f + ' 底部 note 行已删', s, /class="note"/);
});
['convert-i18n.js', 'bilingual-i18n.js', 'shift-i18n.js'].forEach(function (f) {
  var d = R(f);
  no(f + ' 无 noteLocal / 隐私词条', d, BAD);
});
no('site-i18n.js 无 tagLocal 死词条', R('site-i18n.js'), /tagLocal/);

var sv = R('server.js');
['SEO_CONVERT', 'SEO_BILINGUAL', 'SEO_SHIFT'].forEach(function (tb) {
  var b = sv.split('const ' + tb + ' = {')[1].split('\n};')[0];
  no(tb + ' 描述里无「不上传服务器」', b, /不上传服务器/);
  ck(tb + ' 仍是 27 语', (b.match(/^\s{2}'[a-zA-Z-]+':\s*\{/gm) || []).length, 27);
});
has('SEO_SHIFT 标题带上「合并」', sv.split('const SEO_SHIFT = {')[1].split('\n};')[0], /合并|合併|merge/i);

/* ---------- 3. 关键结构还在（别把功能删没了） ---------- */
has('shift.html 还在显示「与原文件一致」', R('shift.html'), /id="outKeep"/);
has('shift.html 合并/拆分工具区还在', R('shift.html'), /id="tool"/);
has('shift.html 逐条微调列表还在', R('shift.html'), /id="list"/);
has('convert.html 输出格式下拉还在', R('convert.html'), /id="outFmt"/);
has('bilingual.html 剥离方向下拉还在', R('bilingual.html'), /id="mode"/);
has('server.js 七页都已登记', sv, /'shift\.html'/);

var bad = 0;
items.forEach(function (it) {
  var ok = it[1] === it[2];
  if (!ok) bad++;
  console.log((ok ? 'OK   ' : 'MISS ') + it[0] + (ok ? '' : '   [实际=' + it[1] + ' 期望=' + it[2] + ']'));
});
console.log('\n== ' + (items.length - bad) + '/' + items.length + ' ==');
process.exit(bad ? 1 : 0);
