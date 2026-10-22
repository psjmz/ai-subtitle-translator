/* v0.9.295 核验：版号 + 时间轴体检（只标注，不自动改）+ 294 的流水线没被带坏。
   用法：ROOT=<应用目录> node verify295.js   （不传就用线上目录 /opt/srt-translator）
   上线前先本地预演：ROOT=./ node verify295.js —— 必须全 OK 才上传 */
var fs = require('fs');
var path = require('path');
var ROOT = process.env.ROOT || '/opt/srt-translator';
function R(f) { return fs.readFileSync(path.join(ROOT, f), 'utf8'); }

var items = [];
function ck(name, actual, want) { items.push([name, actual, want]); }
function has(name, src, re) { ck(name, re.test(src), true); }
function no(name, src, re) { ck(name, re.test(src), false); }
function hasAll(name, src, res) { has(name, src, new RegExp(res.map(function (r) { return '(?=[\\s\\S]*' + r + ')'; }).join(''))); }

/* ---------- 1. 版号（全站同步） ---------- */
has('index.html 顶栏版本号 v0.9.295', R('index.html'), /class="ver">v0\.9\.295</);
has('index.html 引 site-i18n.js?v=0.9.295', R('index.html'), /site-i18n\.js\?v=0\.9\.295/);
has('translate.html 页脚 ver-tag v0.9.295', R('translate.html'), /ver-tag">v0\.9\.295</);
has('translate.html 引 srt-core.js?v=0.9.295', R('translate.html'), /srt-core\.js\?v=0\.9\.295/);
has('merge.html 顶栏版本号 v0.9.295', R('merge.html'), /class="ver">v0\.9\.295</);
has('merge.html 引 merge-core.js?v=0.9.295', R('merge.html'), /merge-core\.js\?v=0\.9\.295/);
has('clean.html 引 clean-core.js?v=0.9.295', R('clean.html'), /clean-core\.js\?v=0\.9\.295/);
has('convert.html 引 convert-core.js?v=0.9.295', R('convert.html'), /convert-core\.js\?v=0\.9\.295/);
has('convert.html 引 convert-i18n.js?v=0.9.295', R('convert.html'), /convert-i18n\.js\?v=0\.9\.295/);
has('bilingual.html 引 bilingual-core.js?v=0.9.295', R('bilingual.html'), /bilingual-core\.js\?v=0\.9\.295/);
has('bilingual.html 引 bilingual-i18n.js?v=0.9.295', R('bilingual.html'), /bilingual-i18n\.js\?v=0\.9\.295/);
has('shift.html 引 shift-core.js?v=0.9.295', R('shift.html'), /shift-core\.js\?v=0\.9\.295/);
has('shift.html 引 shift-i18n.js?v=0.9.295', R('shift.html'), /shift-i18n\.js\?v=0\.9\.295/);
no('全站再无 294 的缓存串', R('index.html') + R('shift.html') + R('convert.html'), /v=0\.9\.294/);

/* ---------- 2. 体检（本版主角） ---------- */
var sh = R('shift.html');
has('有了体检卡容器', sh, /id="chkCard"/);
has('体检卡标题走词典', sh, /data-i18n="chkTitle"/);
has('体检卡的说明走词典', sh, /data-i18n="chkHint"/);
has('「没有时间轴，体检跳过」走词典', sh, /data-i18n="chkNoTime"/);
has('统计行在', sh, /id="chkStat"/);
has('五个阈值的行容器在', sh, /id="ruleRow"/);
/* 五个阈值的 id 由引擎 CHECK_FIELDS 决定，页面上只有一处循环渲染 —— 两边都得对
   （字段表那条断言在下面 sc 定义之后，别挪到前面去：那时 sc 还是 undefined） */
has('阈值逐个渲染且与字段表对齐', sh, /CHECK_FIELDS\.forEach|CHECK_FIELDS\.map/);
has('每个阈值框都挂着单位后缀', sh, /<span class="un">' \+ esc\(t\(f\.unit\)\)/);
has('问题清单容器在', sh, /id="chkList"/);
has('采纳建议的按钮在（data-fix）', sh, /data-fix=/);
no('没有「一键修复全部」这种替用户做决定的入口', sh, /fixAll|btnFixAll|chkFixAll|一键修复全部/);

var sc = R('shift-core.js');
has('引擎导出 CHECK_RULES', sc, /CHECK_RULES: CHECK_RULES/);
has('引擎导出 checkCues', sc, /checkCues: checkCues/);
has('引擎导出 suggest', sc, /suggest: suggest/);
has('引擎导出 uiRules（单位换算只此一处）', sc, /uiRules: uiRules/);
hasAll('六种病灶齐全', sc, ["'short'", "'long'", "'fast'", "'line'", "'overlap'", "'gap'"]);
hasAll('引擎五个字段：最短 / 最长 / 读速 / 间隙 / 行宽', sc,
  ["id: 'minDur'", "id: 'maxDur'", "id: 'maxCps'", "id: 'minGap'", "id: 'maxLine'"]);
has('checkCues 只标注、不写回原数组', sc, /function checkCues\(cues, rules\)/);
no('checkCues 里没有 splice/sort 之类的改动动作',
  sc.split('function checkCues(cues, rules)')[1].split('\n  function ')[0], /\.(splice|sort|reverse)\(/);
has('双语条目整条跳过（切开就是半句原文 + 半句译文）', sc, /isBilingualCue\(c\)/);
has('拆分会逐级降档重试（阈值调小也切得动）', sc, /for \(k = n; k >= 2; k--\)/);
has('时间按显示宽度分（全角=1，半角 2 个=1）', sc, /⚠️ v0\.9\.294：时间按「占多宽的屏幕」分/);

var dic = R('shift-i18n.js');
['chkTitle', 'chkHint', 'chkStat', 'chkNone', 'chkNoTime', 'unitCps',
  'rlDurMin', 'rlDurMax', 'rlSpeed', 'rlGap', 'rlLine',
  'chkWhy_short', 'chkWhy_long', 'chkWhy_fast', 'chkWhy_line', 'chkWhy_gap', 'chkWhy_overlap',
  'btnLengthen', 'btnSplit', 'btnMergePrev', 'btnMergeNext', 'btnPush'].forEach(function (k) {
    ck('词典 ' + k + ' 有 27 语',
      (dic.match(new RegExp('(^|[^A-Za-z_])' + k + '\\s*:', 'gm')) || []).length, 27);
  });

/* ---------- 3. 294 的流水线没被带坏 ---------- */
has('步骤列表容器还在', sh, /id="steps"/);
has('添加工序的下拉还在', sh, /id="addSel"/);
has('步骤行的停用按钮还在', sh, /data-toggle=/);
has('单位后缀样式还在（不靠 placeholder 传达单位）', sh, /\.pv \.un/);
has('「与原文件一致」说明还在', sh, /id="outKeep"/);
has('逐条微调列表还在', sh, /id="list"/);
no('旧的「调整方式」下拉没回来', sh, /id="mode"/);
no('旧的 msVal 输入框没回来', sh, /msVal/);
has('引擎导出 STEP_ORDER', sc, /STEP_ORDER: STEP_ORDER/);
has('引擎导出 applySteps', sc, /applySteps: applySteps/);
ck('词典 lblSteps 仍是 27 语',
  (dic.match(new RegExp('(^|[^A-Za-z])lblSteps\\s*:', 'gm')) || []).length, 27);

/* ---------- 4. 293 的隐私文案不许回潮（v0.9.221 定案） ---------- */
var BAD = /不上传服务器|不上傳伺服器|文件不上传|檔案不會上傳|noteLocal|tagLocal/;
var BADEN = /never uploaded|never upload|nothing is uploaded/i;
['clean.html', 'convert.html', 'bilingual.html', 'shift.html'].forEach(function (f) {
  var s = R(f);
  no(f + ' 无「不上传服务器」类文案', s, BAD);
  no(f + ' 无 never uploaded 英文句', s, BADEN);
  no(f + ' 底部 note 行没回来', s, /class="note"/);
});
no('shift-i18n.js 无 noteLocal', R('shift-i18n.js'), BAD);
no('site-i18n.js 无 tagLocal 死词条', R('site-i18n.js'), /tagLocal/);

var sv = R('server.js');
['SEO_CONVERT', 'SEO_BILINGUAL', 'SEO_SHIFT'].forEach(function (tb) {
  var b = sv.split('const ' + tb + ' = {')[1].split('\n};')[0];
  no(tb + ' 描述里无「不上传服务器」', b, /不上传服务器/);
  ck(tb + ' 仍是 27 语', (b.match(/^\s{2}'[a-zA-Z-]+':\s*\{/gm) || []).length, 27);
});
has('server.js 七页都已登记', sv, /'shift\.html'/);

/* ---------- 5. 别的页面别被带坏 ---------- */
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
