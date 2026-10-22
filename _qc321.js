/* _qc321.js —— qc-core 引擎逐语言实测（321 验收用，可重跑）
 * 跑法：node _qc321.js
 */
'use strict';
const fs = require('fs');
const vm = require('vm');
const src = fs.readFileSync(__dirname + '/qc-core.js', 'utf8');
const sb = { window: {}, console: console, Array: Array, isFinite: isFinite, parseInt: parseInt };
sb.window.window = sb.window;
vm.createContext(sb);
vm.runInContext(src, sb);
const C = sb.window.QCCore;

let ok = 0, bad = 0;
function is(name, got, want) {
  if (got === want) { ok++; }
  else { bad++; console.log('FAIL ' + name + '  got=' + JSON.stringify(got) + ' want=' + JSON.stringify(want)); }
}
function okk(name, cond) { if (cond) ok++; else { bad++; console.log('FAIL ' + name); } }

/* ---------- 1. 宽度：多语言 ---------- */
console.log('--- 宽度实测（半角单位） ---');
const wcases = [
  ['abc', 3], ['hello world', 11],
  ['中文', 4], ['中文字幕', 8], ['，。！', 6],
  ['ひらがな', 8], ['カタカナ', 8],
  ['한국어', 6], ['안녕하세요', 10],
  ['Привет', 6], ['Ελλάδα', 6],
  ['مرحبا', 5], ['שלום', 4],
  ['नमस्ते', 4]   /* न म स ् त े —— 两个组合记号不占宽，5 个字符里只算 4 */
];
wcases.forEach(c => { console.log('  width(' + c[0] + ') = ' + C.widthOf(c[0])); is('width ' + c[0], C.widthOf(c[0]), c[1]); });
/* 泰文：元音/声调是组合记号，不占宽度 —— นี้ (น + ี + ้) 只算 1 */
const th = 'นี้';
console.log('  width(นี้[泰文 ni+"i"+声调]) = ' + C.widthOf(th));
okk('泰文组合记号不占宽', C.widthOf(th) <= 2);
/* 阿拉伯语音符 */
console.log('  width(مُحَمَّد) = ' + C.widthOf('مُحَمَّد'));
okk('阿拉伯语音符不占宽', C.widthOf('مُحَمَّد') <= 5);

/* ---------- 2. 文字系统 ---------- */
console.log('--- 主文字系统识别 ---');
[['这是中文', 'han'], ['한국어', 'hangul'], ['日本語', 'han'], ['ひらがな', 'kana'],
 ['Hello', 'lat'], ['Привет', 'cyr'], ['นี่', 'thai'], ['مرحبا', 'arab'], ['שלום', 'hebr'],
 ['नमस्ते', 'deva'], ['Ελλάδα', 'gre']].forEach(c => {
  const got = C.mainScript(c[0]);
  console.log('  mainScript(' + c[0] + ') = ' + got);
  is('script ' + c[0], got, c[1]);
});

/* ---------- 3. 解析 ---------- */
console.log('--- 解析 ---');
const srt = '1\n00:00:01,000 --> 00:00:04,000\n你好，世界\n\n2\n00:00:05,000 --> 00:00:07,000\n第二行\n';
is('detectFmt srt', C.detectFmt('a.srt', srt), 'srt');
let it = C.parse(srt, 'srt');
is('srt 条数', it.length, 2);
is('srt st', it[0].st, 1000);
is('srt en', it[0].en, 4000);
is('srt tx', it[0].tx.join('|'), '你好，世界');

const vtt = 'WEBVTT\n\n00:01.500 --> 00:04.000\nno hours\n';
is('detectFmt vtt(无小时位)', C.detectFmt('a.vtt', vtt), 'vtt');
it = C.parse(vtt, 'vtt');
is('vtt 无小时位 st', it[0].st, 1500);
is('vtt 无小时位 en', it[0].en, 4000);

const ass = '[Script Info]\nScriptType: v4.00+\n\n[Events]\nDialogue: 0,0:00:01.50,0:00:04.00,Default,,0,0,0,,第一行\\N第二行\n';
is('detectFmt ass', C.detectFmt('a.ass', ass), 'ass');
it = C.parse(ass, 'ass');
is('ass 条数', it.length, 1);
is('ass st', it[0].st, 1500);
is('ass 折行', it[0].tx.length, 2);

/* ---------- 4. 中文检测 ---------- */
console.log('--- 中文：过宽/过快/断行/中英空格 ---');
const zhBad = [
  { i: 1, st: 0, en: 1000, tx: ['这是一行特别特别特别特别特别长的中文字幕内容超过限制'] },
  { i: 2, st: 1000, en: 1300, tx: ['这一句话太快了根本读不完'] },
  { i: 3, st: 2000, en: 4000, tx: ['前一句，', '后一句'] },
  { i: 4, st: 5000, en: 7000, tx: ['价格是100元'] },
  { i: 5, st: 8000, en: 9000, tx: [' 两边有空格 '] }
];
let r = C.check(zhBad, { lang: 'zh-CN' });
console.log('  zh 问题：' + r.issues.map(x => x.r + '@' + x.i).join(', '));
okk('zh 检出过宽', r.issues.some(x => x.r === 'rWid' && x.i === 1));
okk('zh 检出过快', r.issues.some(x => x.r === 'rCps' && x.i === 2));
okk('zh 检出断行', r.issues.some(x => x.r === 'rBrk' && x.i === 3));
okk('zh 检出中英空格', r.issues.some(x => x.r === 'rSpc' && x.i === 4));
okk('zh 检出首尾空格', r.issues.some(x => x.r === 'rTrim' && x.i === 5));
console.log('  zh 阈值：maxLineW=' + r.p.maxLineW + ' maxCpsW=' + r.p.maxCpsW);
is('zh 默认 maxCpsW', r.p.maxCpsW, 18);

/* ---------- 5. 英文：同一份文本换语言，判定要变 ---------- */
console.log('--- 英文：42 宽度 = 42 字符，20 cps ---');
const enBad = [
  { i: 1, st: 0, en: 1000, tx: ['This is a very long English subtitle line that goes past forty-two characters'] },
  { i: 2, st: 1000, en: 1500, tx: ['way too fast for the eye'] },
  { i: 3, st: 2000, en: 4000, tx: ['first half,', 'second half'] }
];
r = C.check(enBad, { lang: 'en' });
console.log('  en 问题：' + r.issues.map(x => x.r + '@' + x.i).join(', '));
okk('en 检出过宽', r.issues.some(x => x.r === 'rWid' && x.i === 1));
okk('en 检出过快', r.issues.some(x => x.r === 'rCps' && x.i === 2));
okk('en 逗号结尾断行', r.issues.some(x => x.r === 'rBrk' && x.i === 3));
okk('en 不检中英空格（非 CJK 专属规则不触发）', !r.issues.some(x => x.r === 'rSpc'));
is('en 默认 maxCpsW', r.p.maxCpsW, 20);
/* 同一条中文文案按「英文」口径量宽度不会误报（中文 10 字 = 20 宽度 < 42） */
const zhShort = [{ i: 1, st: 0, en: 2000, tx: ['这是一句话'] }];
okk('中文按宽度量不会误报过宽', !C.check(zhShort, { lang: 'zh-CN' }).issues.some(x => x.r === 'rWid'));

/* ---------- 6. 双语 ---------- */
console.log('--- 双语形态 ---');
okk('形态A 识别', C.isBilingualA({ tx: ['Hello', '你好'] }));
okk('形态A 同种文字不算', !C.isBilingualA({ tx: ['你好', '世界'] }));
okk('形态B 识别', C.isBilingualB({ st: 0, en: 1000 }, { st: 0, en: 1000 }));
/* 双语对不该报重叠 */
const bil = [
  { i: 1, st: 0, en: 2000, tx: ['Hello'] },
  { i: 2, st: 0, en: 2000, tx: ['你好'] }
];
okk('同轴双语对不报重叠', !C.check(bil, { lang: 'zh-CN' }).issues.some(x => x.r === 'rOvl'));
/* 阅读速度只算中文那一行 */
const bilA = [{ i: 1, st: 0, en: 1000, tx: ['This is a fairly long English original sentence here', '这是译文'] }];
const ra = C.check(bilA, { lang: 'zh-CN' });
console.log('  形态A 速度问题：' + JSON.stringify(ra.issues.filter(x => x.r === 'rCps')));
okk('形态A 按中文行算速度（不报）', !ra.issues.some(x => x.r === 'rCps'));
okk('形态A 标记 nA', ra.nA === 1);
/* 混用（既有 A 又有 B）要提示 */
const mix = [
  { i: 1, st: 0, en: 2000, tx: ['Hello', '你好'] },
  { i: 2, st: 3000, en: 5000, tx: ['Hi'] },
  { i: 3, st: 3000, en: 5000, tx: ['嗨'] }
];
okk('双语形态混用提示', C.check(mix, { lang: 'zh-CN' }).issues.some(x => x.r === 'rBil'));

/* ---------- 7. 时间轴 ---------- */
console.log('--- 时间轴 ---');
const tl = [
  { i: 1, st: 0, en: 9000, tx: ['停留太长'] },
  { i: 2, st: 100, en: 500, tx: ['停留太短'] },
  { i: 3, st: 9000, en: 8000, tx: ['结束早于开始'] },
  { i: 5, st: 10000, en: 11000, tx: ['序号跳号'] },
  { i: 6, st: 10500, en: 12000, tx: ['和上一重叠'] }
];
r = C.check(tl, { lang: 'zh-CN' });
console.log('  时间轴问题：' + r.issues.map(x => x.r + '@' + x.i).join(', '));
okk('检出过长', r.issues.some(x => x.r === 'rLong' && x.i === 1));
okk('检出过短', r.issues.some(x => x.r === 'rShort' && x.i === 2));
okk('检出倒挂', r.issues.some(x => x.r === 'rRev' && x.i === 3));
okk('检出序号', r.issues.some(x => x.r === 'rIdx' && x.i === 4));
okk('检出重叠', r.issues.some(x => x.r === 'rOvl' && x.i === 5));

/* ---------- 8. 修复 ---------- */
console.log('--- 修复 ---');
const fixSrc = [
  { i: 1, st: 0, en: 1000, tx: ['价格是100元左右大概'] },
  { i: 2, st: 1000, en: 2000, tx: ['  两边有空格  '] },
  { i: 3, st: 2000, en: 3000, tx: [''] },
  { i: 7, st: 4000, en: 9000, tx: ['序号乱了'] }
];
let f = C.applyFix(fixSrc, { lang: 'zh-CN' }, { rSpc: 1, rTrim: 1, rEmp: 1, rIdx: 1 });
console.log('  done=' + JSON.stringify(f.done));
is('修完条数（删掉空条）', f.items.length, 3);
is('补了空格', f.items[0].tx[0], '价格是 100 元左右大概');
is('去了空格', f.items[1].tx[0], '两边有空格');
is('序号重排', f.items[2].i, 3);
/* 重新折行 */
let fw = C.applyFix([{ i: 1, st: 0, en: 5000, tx: ['这是一行特别特别特别特别特别特别长的中文字幕需要重新折行处理'] }],
  { lang: 'zh-CN' }, { rWid: 1 });
console.log('  折行结果：' + JSON.stringify(fw.items[0].tx));
okk('折成两行', fw.items[0].tx.length === 2);
okk('每行不超 42 宽', fw.items[0].tx.every(x => C.widthOf(x) <= 42));
/* 时间轴修复：不勾选就不动 */
const noT = C.applyFix(tl.map(x => ({ i: x.i, st: x.st, en: x.en, tx: x.tx.slice() })), { lang: 'zh-CN' }, { rIdx: 1 });
is('不勾时间轴规则就不动时间', noT.items[0].en, 9000);
const yesT = C.applyFix(tl.map(x => ({ i: x.i, st: x.st, en: x.en, tx: x.tx.slice() })), { lang: 'zh-CN' }, { rLong: 1, rOvl: 1 });
console.log('  修时间后：' + JSON.stringify(yesT.items.map(x => [x.st, x.en])));
okk('过长被截到 7000', yesT.items[0].en === 7000);
okk('重叠被推开', yesT.items[4].st >= yesT.items[3].en);

/* ---------- 9. 折行各语言 ---------- */
console.log('--- 折行：按文字系统分 ---');
const enLong = 'This is a fairly long English sentence that has to be wrapped somewhere sensible';
const w1 = C.rewrap(enLong, 'lat', 42);
console.log('  en: ' + JSON.stringify(w1));
okk('英文按空格折', w1.length === 2 && w1.every(x => C.widthOf(x) <= 42));
const zhLong = '这是一段相当长的中文字幕需要在合适的位置断开不能把词拆开因为中文没有空格所以按字符切';
const w2 = C.rewrap(zhLong, 'cjk', 42);
console.log('  zh: ' + JSON.stringify(w2));
okk('中文按字符折', w2.length === 2 && w2.every(x => C.widthOf(x) <= 42));
const thLong = 'นี่คือประโยคภาษาไทยที่ยาวมากและต้องตัดบรรทัดให้เหมาะสมกับการอ่าน';
const w3 = C.rewrap(thLong, 'nospc', 42);
console.log('  th: ' + JSON.stringify(w3));
okk('泰文按字符折', w3.length <= 2 && w3.every(x => C.widthOf(x) <= 42));

/* ---------- 10. 导出 ---------- */
console.log('--- 导出 ---');
const s = C.formatSrt([{ i: 1, st: 0, en: 1500, tx: ['a', 'b'] }]);
okk('SRT 带分隔符', s.indexOf('00:00:00,000 --> 00:00:01,500') >= 0);
const v = C.formatVtt([{ i: 1, st: 0, en: 1500, tx: ['a'] }]);
okk('VTT 头', v.indexOf('WEBVTT') === 0);
okk('VTT 用点号', v.indexOf('00:00:00.000') >= 0);


/* ---------- 11. 语言专属标点规范（321：规范本身按语言变，不只是阈值） ---------- */
console.log('--- 语言专属标点 ---');
function pun(lang, txt) {
  const it2 = [{ i: 1, st: 0, en: 3000, tx: [txt] }];
  const hit = C.check(it2, { lang: lang }).issues.some(x => x.r === 'rPun');
  const fixed = C.applyFix([{ i: 1, st: 0, en: 3000, tx: [txt] }], { lang: lang }, { rPun: 1 }).items[0].tx[0];
  console.log('  [' + lang + '] ' + JSON.stringify(txt) + ' → 命中=' + hit + ' 修后=' + JSON.stringify(fixed));
  return { hit: hit, fixed: fixed };
}
let q;
q = pun('es', '\u00BFC\u00F3mo est\u00E1s?'); okk('西语：有 ¿ 不报', !q.hit);
q = pun('es', 'C\u00F3mo est\u00E1s?');        okk('西语：缺 ¿ 报', q.hit);
is('西语修成 ¿ 开头', q.fixed, '\u00BFC\u00F3mo est\u00E1s?');
q = pun('fr', 'Comment \u00E7a va\u00A0?');     okk('法语：不破空格不报', !q.hit);
q = pun('fr', 'Comment \u00E7a va ?');          okk('法语：普通空格报', q.hit);
is('法语修成不破空格', q.fixed, 'Comment \u00E7a va\u00A0?');
q = pun('el', '\u03A4\u03B9 \u03BA\u03AC\u03BD\u03B5\u03B9\u03C2\u037E'); okk('希腊语：用 ; 不报', !q.hit);
q = pun('el', '\u03A4\u03B9 \u03BA\u03AC\u03BD\u03B5\u03B9\u03C2?');      okk('希腊语：用 ? 报', q.hit);
is('希腊语修成 U+037E', q.fixed, '\u03A4\u03B9 \u03BA\u03AC\u03BD\u03B5\u03B9\u03C2\u037E');
q = pun('ar', '\u0645\u0631\u062D\u0628\u0627\u061F'); okk('阿拉伯语：؟ 不报', !q.hit);
q = pun('ar', '\u0645\u0631\u062D\u0628\u0627?');      okk('阿拉伯语：? 报', q.hit);
is('阿拉伯语修成 ؟', q.fixed, '\u0645\u0631\u062D\u0628\u0627\u061F');
q = pun('zh-CN', '你好，世界');  okk('中文：全角不报', !q.hit);
q = pun('zh-CN', '你好,世界');   okk('中文：半角逗号报', q.hit);
is('中文修成全角', q.fixed, '你好，世界');
q = pun('zh-CN', '价格是3.5元'); okk('中文：小数点不误伤', !q.hit);
q = pun('ja', '\u3053\u3093\u306B\u3061\u306F\u3001\u4E16\u754C'); okk('日语：、不报', !q.hit);
q = pun('ja', '\u3053\u3093\u306B\u3061\u306F,\u4E16\u754C');      okk('日语：半角逗号报', q.hit);
is('日语逗号修成 、', q.fixed, '\u3053\u3093\u306B\u3061\u306F\u3001\u4E16\u754C');
okk('英语不挂标点专属规则', !C.hasPunct('en'));
okk('德语不挂标点专属规则', !C.hasPunct('de'));

console.log('--- 书写方向（RTL） ---');
okk('阿拉伯语挂方向规则', C.hasDir('ar'));
okk('英语不挂方向规则', !C.hasDir('en'));
okk('阿语以阿文字母开头 → 不报', !C.dirIssue('\u0645\u0631\u062D\u0628\u0627', 'ar'));
okk('阿语以拉丁字母开头 → 报', C.dirIssue('iPhone \u062C\u062F\u064A\u062F', 'ar') === 1);
okk('希伯来语以拉丁开头 → 报', C.dirIssue('OK \u05E9\u05DC\u05D5\u05DD', 'he') === 1);

console.log('\n结果：' + ok + ' 通过 / ' + bad + ' 失败');
process.exit(bad ? 1 : 0);
