/* v0.9.296 核验：版号 + 第八页乱码修复（认编码 / 倒推 / 修不回来就直说）+ 老页没被带坏。
   用法：ROOT=<应用目录> node verify296.js   （不传就用线上目录 /opt/srt-translator）
   上线前先本地预演：ROOT=./ node verify296.js —— 必须全 OK 才上传 */
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
has('index.html 顶栏版本号 v0.9.296', R('index.html'), /class="ver">v0\.9\.296</);
has('index.html 引 site-i18n.js?v=0.9.296', R('index.html'), /site-i18n\.js\?v=0\.9\.296/);
has('translate.html 页脚 ver-tag v0.9.296', R('translate.html'), /ver-tag">v0\.9\.296</);
has('translate.html 引 srt-core.js?v=0.9.296', R('translate.html'), /srt-core\.js\?v=0\.9\.296/);
has('merge.html 顶栏版本号 v0.9.296', R('merge.html'), /class="ver">v0\.9\.296</);
has('merge.html 引 merge-core.js?v=0.9.296', R('merge.html'), /merge-core\.js\?v=0\.9\.296/);
has('clean.html 引 clean-core.js?v=0.9.296', R('clean.html'), /clean-core\.js\?v=0\.9\.296/);
has('convert.html 引 convert-core.js?v=0.9.296', R('convert.html'), /convert-core\.js\?v=0\.9\.296/);
has('convert.html 引 convert-i18n.js?v=0.9.296', R('convert.html'), /convert-i18n\.js\?v=0\.9\.296/);
has('bilingual.html 引 bilingual-core.js?v=0.9.296', R('bilingual.html'), /bilingual-core\.js\?v=0\.9\.296/);
has('bilingual.html 引 bilingual-i18n.js?v=0.9.296', R('bilingual.html'), /bilingual-i18n\.js\?v=0\.9\.296/);
has('shift.html 引 shift-core.js?v=0.9.296', R('shift.html'), /shift-core\.js\?v=0\.9\.296/);
has('shift.html 引 shift-i18n.js?v=0.9.296', R('shift.html'), /shift-i18n\.js\?v=0\.9\.296/);
has('repair.html 引 repair-core.js?v=0.9.296', R('repair.html'), /repair-core\.js\?v=0\.9\.296/);
has('repair.html 引 repair-i18n.js?v=0.9.296', R('repair.html'), /repair-i18n\.js\?v=0\.9\.296/);
no('全站再无 295 的缓存串', R('index.html') + R('shift.html') + R('repair.html'), /v=0\.9\.295/);

/* ---------- 2. 乱码修复页（本版主角） ---------- */
var rp = R('repair.html');
hasAll('四张卡齐：放入 / 诊断 / 可以这样修 / 结果',
  rp, ['id="upCard"', 'id="diagCard"', 'id="fixCard"', 'id="repCard"']);
/* ⚠️ 本页最要紧的一处：必须按字节读。readAsText 会先把字节按 UTF-8 解一遍，
   解不动的字节永久变成替换符，后面再聪明的算法也修不回来 */
has('文件按字节读（readAsArrayBuffer）', rp, /readAsArrayBuffer/);
no('没有真的去调 readAsText', rp, /\.readAsText\(/);
has('认出来的编码有展示位', rp, /id="srcEnc"/);
has('粘贴入口在', rp, /id="paste"/);
has('诊断结果位在', rp, /id="diagStat"/);
has('「修不回来」的提示位在', rp, /id="lostMsg"/);
has('候选列表在', rp, /id="candList"/);
has('第一行是「保持原样」', rp, /data-use="-1"/);
has('结果框在', rp, /id="out"/);
has('另存编码下拉在', rp, /id="saveEnc"/);
no('没有「一键修复全部」这种替用户做决定的入口', rp, /fixAll|btnFixAll|一键修复全部/);
has('留了 GA4 注入位', rp, /<!--ANALYTICS-->/);
/* 标题是 heroA + heroEm 两个紧挨着的 span：中文连写没问题，西文中间必须留空格，
   不留的话英文 h1 会连成「Fixgarbled subtitles」 */
has('标题补空格的逻辑在（英文不会连成 Fixgarbled）', rp, /hero h1 \[data-i18n="heroA"\]/);
has('补空格时把中日韩三种语言排除掉', rp, /zh-CN\|zh-TW\|ja/);
has('静态 SEO 正文块在（爬虫不执行 JS）', rp, /<!--SEO-COPY-START-->[\s\S]+<!--SEO-COPY-END-->/);
has('SEO head 占位块在', rp, /<!--SEO-HEAD-START-->[\s\S]+<!--SEO-HEAD-END-->/);
ck('每页 1 个 h1', (rp.match(/<h1[\s>]/g) || []).length, 1);
has('认领砖红色线', rp, /--acc:#B42318/);
no('没用别的页的主色', rp, /--acc:\s*#(D4206A|6D5BD0|0B7A5C|185FA5|0E7490|4F46E5)/);
/* 硬隔离：本页自带导航与词典，不许引 site- 那两个共享件 */
no('repair.html 没引 site-nav.js / site-i18n.js', rp, /<script[^>]+src="[^"]*site-/);

var rc = R('repair-core.js');
['repair', 'diagnose', 'scoreText', 'toBytes', 'fromBytes', 'sniffBom', 'stripBom']
  .forEach(function (k) { has('引擎导出 ' + k, rc, new RegExp(k + ': ' + k)); });
/* label 是就地写的函数（给页面用的一句人话标签），不是 k: k 那种简写 */
has('引擎导出 label（候选从哪个编码读到哪个编码）', rc, /label: function \(c\)/);
hasAll('六种编码都在', rc, ["id: 'utf-8'", "id: 'gbk'", "id: 'big5'", "id: 'shift_jis'", "id: 'euc-kr'", "id: 'latin1'"]);
/* windows-1252 那个坑：0x80–0x9F 解出来是智能引号 / 破折号 / 省略号，反查表必须认回去，
   否则「â€™ → ’」这种最常见的乱码会因为「这个字 latin1 里没有」被整个候选掐掉 */
has('有 windows-1252 的反向映射', rc, /var W1252 = /);
has('装不下的字直接返回 null，不凑问号', rc, /if \(!p\) return null;/);
/* 有原始字节时，候选必须按分数排 —— 不排的话第 0 项永远是 utf-8，GBK 文件会被认成 UTF-8 */
has('候选按分数排序', rc, /return sortCands\(dedup\(out\)\);/);
/* 字节没了 + 出现替换符 = 谁也修不回来，必须直说 */
has('明确标记「修不回来」', rc, /lost: diag\.reasons\.indexOf\('fffd'\) >= 0 && !bytes/);
/* 带音标的字母要「挨着同类」才算乱码 —— 波兰语那种逐个隔开的写法不该被误判 */
has('accentRun 要求挨着同类', rc, /if \(!\(acc\(p\) \|\| acc\(q\) \|\| sym\(p\) \|\| sym\(q\)\)\) continue;/);

var dic = R('repair-i18n.js');
['heroA', 'heroEm', 'heroSub', 'upTitle', 'dzTxt', 'pastePh', 'lblSrc', 'btnClear',
  'hintPaste', 'lblDiag', 'dgClean', 'dgMoji', 'msgLost', 'msgOk',
  'dg_fffd', 'dg_c1', 'dg_sym', 'dg_latin', 'dg_run', 'dg_cjk',
  'lblFix', 'hintFix', 'btnUse', 'btnKeep', 'repTitle', 'lblSave', 'btnDl', 'btnCopy',
  'hintSave', 'msgDone', 'msgCopy', 'msgEncFail', 'msgEmpty', 'encUtf8bom', 'footBrand']
  .forEach(function (k) {
    ck('词典 ' + k + ' 有 27 语',
      (dic.match(new RegExp('(^|[^A-Za-z_])' + k + '\\s*:', 'gm')) || []).length, 27);
  });

/* ---------- 3. 服务端登记 ---------- */
var sv = R('server.js');
has('server.js 有 SEO_REPAIR 表', sv, /const SEO_REPAIR = \{/);
ck('SEO_REPAIR 是 27 语',
  (sv.split('const SEO_REPAIR = {')[1].split('\n};')[0].match(/^\s{2}'[a-zA-Z-]+':\s*\{/gm) || []).length, 27);
has('server 建了 REPAIR_PATH', sv, /REPAIR_PATH\[l\] = /);
has('SEO_PAGES 登记了 repair 页', sv, /repair: \{ file: 'repair\.html', table: SEO_REPAIR, path: REPAIR_PATH/);
has('语言目录路由带 repair', sv, /\/\(\[a-zA-Z\]\[a-zA-Z\\-\]\*\)\\\/\([^)]*bilingual[^)]*shift[^)]*repair[^)]*\)\\\.html\$/);
has('zh-CN 直连路由带 repair', sv, /\^\\\/\(merge\|clean\|translate\|convert\|bilingual\|shift\|repair\)\\\.html\$/);
has('sitemap 注释已改成八页 216 条', sv, /八页 × 27 语言 = 216/);
/* 283 那条不能退 */
has('serveStatic 先把 /data 前缀挡掉', sv, /p === '\/data' \|\| p\.startsWith\('\/data\/'\)/);

/* ---------- 4. 293 的隐私文案不许回潮（v0.9.221 定案） ---------- */
var BAD = /不上传服务器|不上傳伺服器|文件不上传|檔案不會上傳|noteLocal|tagLocal/;
var BADEN = /never uploaded|never upload|nothing is uploaded/i;
['clean.html', 'convert.html', 'bilingual.html', 'shift.html', 'repair.html'].forEach(function (f) {
  var s = R(f);
  no(f + ' 无「不上传服务器」类文案', s, BAD);
  no(f + ' 无 never uploaded 英文句', s, BADEN);
  no(f + ' 底部 note 行没回来', s, /class="note"/);
});
no('repair-i18n.js 无 noteLocal', dic, BAD);
['SEO_CONVERT', 'SEO_BILINGUAL', 'SEO_SHIFT', 'SEO_REPAIR'].forEach(function (tb) {
  var b = sv.split('const ' + tb + ' = {')[1].split('\n};')[0];
  no(tb + ' 描述里无「不上传服务器」', b, /不上传服务器/);
});

/* ---------- 5. 别的页面别被带坏 ---------- */
has('convert.html 输出格式下拉还在', R('convert.html'), /id="outFmt"/);
has('bilingual.html 剥离方向下拉还在', R('bilingual.html'), /id="mode"/);
has('clean.html 清洗功能还在', R('clean.html'), /clean-core\.js/);
has('shift.html 体检卡还在', R('shift.html'), /id="chkCard"/);
has('shift.html 步骤流水线还在', R('shift.html'), /id="steps"/);
ck('shift-i18n.js 的 chkTitle 仍是 27 语',
  (R('shift-i18n.js').match(new RegExp('(^|[^A-Za-z_])chkTitle\\s*:', 'gm')) || []).length, 27);
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
