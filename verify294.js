/* v0.9.294 线上核验：版号 + 步骤流水线 + 293 的隐私文案没回潮。
   用法：ROOT=<应用目录> node verify294.js   （不传就用线上目录 /opt/srt-translator） */
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
has('index.html 顶栏版本号 v0.9.294', R('index.html'), /class="ver">v0\.9\.294</);
has('index.html 引 site-i18n.js?v=0.9.294', R('index.html'), /site-i18n\.js\?v=0\.9\.294/);
has('translate.html 页脚 ver-tag v0.9.294', R('translate.html'), /ver-tag">v0\.9\.294</);
has('translate.html 引 srt-core.js?v=0.9.294', R('translate.html'), /srt-core\.js\?v=0\.9\.294/);
has('merge.html 顶栏版本号 v0.9.294', R('merge.html'), /class="ver">v0\.9\.294</);
has('merge.html 引 merge-core.js?v=0.9.294', R('merge.html'), /merge-core\.js\?v=0\.9\.294/);
has('clean.html 引 clean-core.js?v=0.9.294', R('clean.html'), /clean-core\.js\?v=0\.9\.294/);
has('convert.html 引 convert-core.js?v=0.9.294', R('convert.html'), /convert-core\.js\?v=0\.9\.294/);
has('convert.html 引 convert-i18n.js?v=0.9.294', R('convert.html'), /convert-i18n\.js\?v=0\.9\.294/);
has('bilingual.html 引 bilingual-core.js?v=0.9.294', R('bilingual.html'), /bilingual-core\.js\?v=0\.9\.294/);
has('bilingual.html 引 bilingual-i18n.js?v=0.9.294', R('bilingual.html'), /bilingual-i18n\.js\?v=0\.9\.294/);
has('shift.html 引 shift-core.js?v=0.9.294', R('shift.html'), /shift-core\.js\?v=0\.9\.294/);
has('shift.html 引 shift-i18n.js?v=0.9.294', R('shift.html'), /shift-i18n\.js\?v=0\.9\.294/);

/* ---------- 2. 步骤流水线（本版主角） ---------- */
var sh = R('shift.html');
has('有了步骤列表容器', sh, /id="steps"/);
has('有了「添加哪道工序」下拉', sh, /id="addSel"/);
has('有了添加按钮', sh, /data-i18n="btnAddStep"/);
has('有了步骤标题', sh, /data-i18n="lblSteps"/);
has('步骤行的停用/上下移/删除按钮齐全', sh, /data-toggle=/);
has('↑↓ 排序按钮在', sh, /data-up=/);
has('↓ 排序按钮在', sh, /data-dn=/);
has('删除按钮在', sh, /data-del=/);
no('旧的「调整方式」下拉已撤', sh, /id="mode"/);
no('旧的「合并与拆分」下拉已撤', sh, /id="tool"/);
no('旧的合并拆分数值框已撤', sh, /id="toolVal"/);
no('那个叫 ms 却按秒算的输入框已消失', sh, /msVal/);
has('单位后缀样式在（不靠 placeholder 传达单位）', sh, /\.st \.pv \.un/);
has('「与原文件一致」说明还在', sh, /id="outKeep"/);
has('逐条微调列表还在', sh, /id="list"/);

var sc = R('shift-core.js');
has('引擎导出 STEP_DEFS', sc, /STEP_DEFS: STEP_DEFS/);
has('引擎导出 STEP_ORDER 六道工序', sc, /STEP_ORDER: STEP_ORDER/);
has('引擎导出 applySteps', sc, /applySteps: applySteps/);
has('六种工序齐全', sc, /shift: \{ key: 'mShift'/);
has('合并工序进了流水线', sc, /gap: \{ key: 'toolGap'/);
has('按字数拆分工序进了流水线', sc, /char: \{ key: 'toolChar'/);
no('旧的 MODES 表删掉了', sc, /\bMODES: MODES/);
no('旧的 TOOLS 表删掉了', sc, /\bTOOLS: TOOLS/);
no('引擎不再有「不处理」这个假档位', sc, /id: 'none'/);

var dic = R('shift-i18n.js');
['lblSteps', 'btnAddStep', 'hintSteps', 'btnOff', 'btnOn', 'unitX',
  'unitSec', 'unitMs', 'unitChar', 'emptySteps', 'errStep', 'msgNoStep'].forEach(function (k) {
  ck('词典 ' + k + ' 有 27 语',
    (dic.match(new RegExp('(^|[^A-Za-z])' + k + '\\s*:', 'gm')) || []).length, 27);
});
no('词典里 lblMode 死词条已删', dic, /(^|[^A-Za-z])lblMode\s*:/);
no('词典里 toolNone 死词条已删', dic, /(^|[^A-Za-z])toolNone\s*:/);
has('单位后缀是短写法（塞得进输入框）',
  dic.split("    'zh-CN': {")[1].split("    '")[0], /unitSec:\s*'秒'/);

/* ---------- 3. 293 的隐私文案不许回潮（v0.9.221 定案） ---------- */
['clean.html', 'convert.html', 'bilingual.html', 'shift.html'].forEach(function (f) {
  var s = R(f);
  no(f + ' 无「不上传服务器」类文案', s, BAD);
  no(f + ' 无 never uploaded 英文句', s, BADEN);
  no(f + ' 底部 note 行没回来', s, /class="note"/);
});
['convert-i18n.js', 'bilingual-i18n.js', 'shift-i18n.js'].forEach(function (f) {
  no(f + ' 无 noteLocal / 隐私词条', R(f), BAD);
});
no('site-i18n.js 无 tagLocal 死词条', R('site-i18n.js'), /tagLocal/);

var sv = R('server.js');
['SEO_CONVERT', 'SEO_BILINGUAL', 'SEO_SHIFT'].forEach(function (tb) {
  var b = sv.split('const ' + tb + ' = {')[1].split('\n};')[0];
  no(tb + ' 描述里无「不上传服务器」', b, /不上传服务器/);
  ck(tb + ' 仍是 27 语', (b.match(/^\s{2}'[a-zA-Z-]+':\s*\{/gm) || []).length, 27);
});
has('server.js 七页都已登记', sv, /'shift\.html'/);

/* ---------- 4. 别的页面别被带坏 ---------- */
has('convert.html 输出格式下拉还在', R('convert.html'), /id="outFmt"/);
has('bilingual.html 剥离方向下拉还在', R('bilingual.html'), /id="mode"/);
has('clean.html 清洗功能还在', R('clean.html'), /clean-core\.js/);

var bad = 0;
items.forEach(function (it) {
  var ok = it[1] === it[2];
  if (!ok) bad++;
  console.log((ok ? 'OK   ' : 'MISS ') + it[0] + (ok ? '' : '   [实际=' + it[1] + ' 期望=' + it[2] + ']'));
});
console.log('\n== ' + (items.length - bad) + '/' + items.length + ' ==');
process.exit(bad ? 1 : 0);
