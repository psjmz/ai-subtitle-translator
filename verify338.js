/* 338 核验：目标语言 75 → 100 是否真的落到线上。
   本地预演：DIR=<工作区>/srt-translator node verify338.js
   线上：默认读 /opt/srt-translator/ */
var fs = require('fs');
var DIR = process.env.DIR || '/opt/srt-translator';
function rd(f) { return fs.readFileSync(DIR + '/' + f, 'utf8'); }

var OLD75 = ('en zh-CN zh-TW ja ko fr de es pt it ru ar th vi id hi tr pl nl ms fil fa sv da fi nb ' +
  'cs sk hu ro ca hr el uk sr bg he ur bn ta te mr ne si my km lo sw gu kn ml pa or as kk uz mn az ' +
  'is et lv lt sl sq mk eu gl am ha yo zu so ps ku af').split(' ');
var NEW25 = ('yue be tg ky tk bs mt cy ga hy ka ti bo ug sd yi jv su ceb mg ig xh sn ny mi').split(' ');

var th = rd('translate.html');
var sc = rd('srt-core.js');
var ad = rd('admin.html');
var sv = rd('server.js');
var i18n = rd('site-i18n.js');
var ctr = rd('content/translate.js');

/* LANGS 条目：{ v:'xx', zh:'..', en:'..', file:'..', prompt:'..' } */
var L_RE = /\{\s*v:'([a-zA-Z-]+)',\s*zh:'([^']*)',\s*en:'([^']*)',\s*file:'([^']*)',\s*prompt:'([^']*)'\s*\}/g;
var L = [], m;
while ((m = L_RE.exec(th))) L.push({ v: m[1], zh: m[2], en: m[3], file: m[4], prompt: m[5] });
var codes = L.map(function (x) { return x.v; });
var dup = codes.filter(function (c, i) { return codes.indexOf(c) !== i; });
var missOld = OLD75.filter(function (c) { return codes.indexOf(c) < 0; });
var missNew = NEW25.filter(function (c) { return codes.indexOf(c) < 0; });
var thin = L.filter(function (x) { return !x.zh || !x.en || !x.file || !x.prompt; }).map(function (x) { return x.v; });

/* EX_SAMPLE：'xx':{dash:'..', lyric:'..', plain:'..'} */
var EX = {};
var E_RE = /'([a-zA-Z-]+)':\s*\{dash:'((?:[^'\\]|\\.)*)',\s*lyric:'((?:[^'\\]|\\.)*)',\s*plain:'((?:[^'\\]|\\.)*)'\}/g;
while ((m = E_RE.exec(th))) EX[m[1]] = { dash: m[2], lyric: m[3], plain: m[4] };
var exMiss = codes.filter(function (c) { return !EX[c]; });
var exThin = Object.keys(EX).filter(function (c) { var e = EX[c]; return !e.dash || !e.lyric || !e.plain; });

/* MAXW_BY_LANG */
/* 注意：每个 while 用独立正则实例——复用 /g 正则会带着上一次的 lastIndex 串位，静默 0 命中 */
var MW = {};
var mwSrc = (th.match(/MAXW_BY_LANG\s*=\s*\{([\s\S]*?)\};/) || [])[1] || '';
var M_RE1 = /'([a-zA-Z-]+)':\s*(\d+)/g;
while ((m = M_RE1.exec(mwSrc))) MW[m[1]] = +m[2];
var mwMiss = codes.filter(function (c) { return typeof MW[c] !== 'number'; });

/* REC_ASS_SIZE（srt-core.js） */
var RS = {};
var rsSrc = (sc.match(/const REC_ASS_SIZE\s*=\s*\{([\s\S]*?)\n\s*\};/) || [])[1] || '';
var M_RE2 = /'([a-zA-Z-]+)':\s*(\d+)/g;
while ((m = M_RE2.exec(rsSrc))) RS[m[1]] = +m[2];
var rsMiss = codes.filter(function (c) { return typeof RS[c] !== 'number'; });

/* INK_RATIO */
var IR = {};
var irSrc = (sc.match(/const INK_RATIO\s*=\s*\{([\s\S]*?)\n\s*\};/) || [])[1] || '';
var I_RE = /'([a-zA-Z-]+)':\s*([\d.]+)/g;
while ((m = I_RE.exec(irSrc))) IR[m[1]] = +m[2];
var WANT_IR = { hy: 0.738, ka: 0.724, bo: 0.525, ti: 0.852, yue: 0.907, ug: 0.610, sd: 0.610, yi: 0.524 };
var irBad = Object.keys(WANT_IR).filter(function (c) { return IR[c] !== WANT_IR[c]; });
var WANT_RS = { hy: 56, ka: 56, bo: 78, ti: 48, yue: 56, ug: 68, sd: 68, yi: 78 };
var rsBad = Object.keys(WANT_RS).filter(function (c) { return RS[c] !== WANT_RS[c]; });
/* 老语言的字形值一个都不许变 */
var OLD_IR = { 'zh-CN': 0.915, 'zh-TW': 0.907, ja: 0.861, ko: 0.874, vi: 0.712, hi: 0.645, ar: 0.610,
  th: 0.574, fa: 0.521, el: 0.683, he: 0.524, ur: 0.569, bn: 0.657, ta: 0.519, te: 0.774, mr: 0.643,
  ne: 0.653, si: 0.519, my: 0.556, km: 0.660, lo: 0.531, gu: 0.594, kn: 0.797, ml: 0.524, pa: 0.584,
  or: 0.677, as: 0.657, am: 0.852, ps: 0.610, ku: 0.610 };
var irOldBad = Object.keys(OLD_IR).filter(function (c) { return IR[c] !== OLD_IR[c]; });

/* admin.html 清单 */
var A_RE = /\{\s*v:'([a-zA-Z-]+)',\s*zh:'[^']*',\s*en:'[^']*',\s*g:'([^']*)'\s*\}/g;
var AC = {}, n;
while ((n = A_RE.exec(ad))) AC[n[1]] = n[2];
var aMiss = codes.filter(function (c) { return !(c in AC); });
var hasCjk = function (c) { return (AC[c] || '').indexOf('cjk') >= 0; };
var hasNL = function (c) { return (AC[c] || '').indexOf('nonlatin') >= 0; };
var gBad = ['yue'].filter(function (c) { return !hasCjk(c); })
  .concat(['hy', 'ka', 'bo', 'ti', 'ug', 'sd', 'yi', 'am', 'ar', 'he', 'fa', 'ur', 'ps', 'ku', 'th', 'hi', 'bn', 'ta', 'te', 'mr', 'ne', 'si', 'my', 'km', 'lo', 'gu', 'kn', 'ml', 'pa', 'or', 'as', 'be', 'tg', 'ky'].filter(function (c) { return !hasNL(c); }));

var items = [
  ['translate.html LANGS 共 100 种', codes.length === 100, codes.length + ' 种'],
  ['新增 25 种全部落地', missNew.length === 0, missNew.join(',')],
  ['原有 75 种零丢失', missOld.length === 0, missOld.join(',')],
  ['无重复语言代码', dup.length === 0, dup.join(',')],
  ['100 种五字段齐全（自称/英文名/文件名/提示名）', thin.length === 0, thin.join(',')],
  ['EX_SAMPLE 覆盖 100 种', exMiss.length === 0, exMiss.join(',')],
  ['EX_SAMPLE 三种句式都不为空', exThin.length === 0, exThin.join(',')],
  ['MAXW_BY_LANG 覆盖 100 种', mwMiss.length === 0, mwMiss.join(',')],
  ['粤语 yue 折行阈值 16（汉字口径）', MW.yue === 16, String(MW.yue)],
  ['新增拉丁/西里尔语种折行阈值 21', NEW25.filter(function (c) { return c !== 'yue'; }).every(function (c) { return MW[c] === 21; }), ''],
  ['REC_ASS_SIZE 覆盖 100 种', rsMiss.length === 0, rsMiss.join(',')],
  ['新增 8 种特殊字号正确', rsBad.length === 0, rsBad.join(',')],
  ['新增 8 种墨迹比正确', irBad.length === 0, irBad.join(',')],
  ['既有 31 种墨迹比一字未改', irOldBad.length === 0, irOldBad.join(',')],
  ['admin.html 清单同步 100 种', aMiss.length === 0, aMiss.join(',')],
  ['admin.html 分组标记正确（cjk/nonlatin）', gBad.length === 0, gBad.join(',')],
  ['server.js SEO 表已改 100 languages', sv.indexOf('100 languages') > 0, ''],
  ['server.js 已无 75 languages', sv.indexOf('75 languages') < 0, ''],
  ['site-i18n.js 已无 75 languages', i18n.indexOf('75 languages') < 0, ''],
  ['content/translate.js 已无 75 种语言', ctr.indexOf('75 种语言') < 0, ''],
  ['页面版号仍是 v0.9.325（本批不占版号）', th.indexOf('v0.9.325') > 0, '']
];

var bad = 0;
items.forEach(function (it) {
  var ok = !!it[1];
  if (!ok) bad++;
  console.log((ok ? 'OK   ' : 'MISS ') + it[0] + (ok ? '' : '  → ' + it[2]));
});
console.log('\n' + (items.length - bad) + '/' + items.length + (bad ? '  ← 有 ' + bad + ' 项没落地' : '  全部通过'));
process.exit(bad ? 1 : 0);
