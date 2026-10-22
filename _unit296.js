/* v0.9.296 引擎自测：乱码能不能认出来、能不能修回来、不该乱修的时候别乱修 */
'use strict';
global.window = {};
require('./repair-core.js');
var C = global.window.RepairCore;

var pass = 0, fail = 0;
function ok(n, c, x) { if (c) { pass++; console.log('  ok   ' + n); } else { fail++; console.log('  FAIL ' + n + '  → ' + JSON.stringify(x)); } }
function enc(s, e) { return C.toBytes(s, e); }
function dec(b, e) { return C.fromBytes(b, e); }

console.log('--- ① 反向表建得起来 ---');
['gbk', 'big5', 'shift_jis', 'euc-kr'].forEach(function (e) {
  var t = C.table(e);
  ok(e + ' 反查表非空', !!t && Object.keys(t).length > 1000, t ? Object.keys(t).length : null);
});
var gbkBytes = enc('你好', 'gbk');
ok('GBK 能把「你好」编成字节', !!gbkBytes && gbkBytes.length === 4, gbkBytes && Array.from(gbkBytes));
ok('GBK 字节解得回「你好」', dec(gbkBytes, 'gbk') === '你好', dec(gbkBytes, 'gbk'));

console.log('--- ② UTF-8 存、GBK 读（中文最常见的乱码）---');
var u8 = enc('你好世界', 'utf-8');
var mojiGbk = dec(u8, 'gbk');
ok('按 GBK 读出来确实是乱的', mojiGbk !== '你好世界', mojiGbk);
var r1 = C.repair({ text: mojiGbk });
ok('诊断说这是乱码', r1.diag.clean === false, r1.diag.reasons);
ok('最佳候选修回了「你好世界」', r1.best && r1.best.text.indexOf('你好世界') >= 0, r1.best && r1.best.text.slice(0, 30));

console.log('--- ③ UTF-8 存、Latin-1 读（ä½ å¥½ / æ—¥æœ¬èªž 那一类）---');
var mojiLat = dec(enc('日本語字幕', 'utf-8'), 'latin1');
ok('按 Latin-1 读出来是那串怪字', /æ|¥|è|ª/.test(mojiLat), mojiLat);
var r2 = C.repair({ text: mojiLat });
ok('修回了「日本語字幕」', r2.best && r2.best.text.indexOf('日本語字幕') >= 0, r2.best && r2.best.text.slice(0, 30));

console.log('--- ④ GBK 存、Latin-1 读 ---');
var mojiLat2 = dec(enc('你好', 'gbk'), 'latin1');
var r3 = C.repair({ text: mojiLat2 });
ok('修回了「你好」', r3.best && r3.best.text.indexOf('你好') >= 0, r3.best && r3.best.text.slice(0, 30));

console.log('--- ⑤ 传文件时：认出它其实是 GBK（文件没坏，是播放器读错了）---');
var gbkFile = enc('这是一段正常的中文台词', 'gbk');
var r4 = C.repair({ bytes: gbkFile, text: dec(gbkFile, 'utf-8') });
ok('认出原编码是 GBK', r4.enc === 'gbk', r4.enc);
ok('展示出来的内容是对的', r4.shown === '这是一段正常的中文台词', r4.shown);
ok('文本本身没坏 → 不给修复候选', r4.best === null, r4.best && r4.best.text);
ok('诊断是干净的', r4.diag.clean === true, r4.diag.reasons);
var r4b = C.repair({ bytes: enc('Hello, how are you', 'utf-8'), text: 'Hello, how are you' });
ok('UTF-8 文件认出是 UTF-8', r4b.enc === 'utf-8', r4b.enc);

console.log('--- ⑥ 本来就没乱码：不许瞎推荐 ---');
var clean = '1\n00:00:01,000 --> 00:00:03,000\n这是一句正常的字幕\n\n2\n00:00:04,000 --> 00:00:06,000\n另一句也正常\n';
var r5 = C.repair({ text: clean });
ok('诊断说没乱码', r5.diag.clean === true, r5.diag.reasons);
var r5b = C.repair({ bytes: enc(clean, 'utf-8'), text: clean });
ok('有字节时也不乱推', r5b.best === null || r5b.best.score <= r5b.baseScore + 0.02, r5b.best && r5b.best.score + ' vs ' + r5b.baseScore);

console.log('--- ⑦ 已经不可逆（出现替换符）要直说 ---');
var lost = dec(enc('你好字幕', 'gbk'), 'utf-8');   /* GBK 字节被当 UTF-8 读 → 一堆替换符 */
ok('确实产生了替换符', lost.indexOf('�') >= 0, lost.slice(0, 20));
var r6 = C.repair({ text: lost });
ok('诊断认出 fffd', r6.diag.reasons.indexOf('fffd') >= 0, r6.diag.reasons);
ok('明确标记为「修不回来」', r6.lost === true, r6.lost);
var r6b = C.repair({ bytes: enc('你好字幕', 'gbk'), text: lost });
ok('但传文件就能救回来（认出是 GBK）', r6b.lost === false && r6b.enc === 'gbk' && r6b.shown === '你好字幕',
  [r6b.lost, r6b.enc, r6b.shown]);

console.log('--- ⑧ 英文字幕不该被当成乱码 ---');
var en = "1\n00:00:01,000 --> 00:00:03,000\nHello there, how are you?\n\n2\n00:00:04,000 --> 00:00:06,000\nI'm fine, thanks.\n";
ok('英文诊断干净', C.repair({ text: en }).diag.clean === true, C.repair({ text: en }).diag.reasons);
var fr = "C'est très bon. À bientôt.";
ok('法语带音标也不算乱码', C.repair({ text: fr }).diag.clean === true, C.repair({ text: fr }).diag.reasons);
var vi = 'Tiếng Việt có dấu';
ok('越南语带音标也不算乱码', C.repair({ text: vi }).diag.clean === true, C.repair({ text: vi }).diag.reasons);

console.log('--- ⑨ BOM ---');
var withBom = new Uint8Array([0xEF, 0xBB, 0xBF].concat(Array.from(enc('你好', 'utf-8'))));
ok('认出 UTF-8 BOM', C.sniffBom(withBom) === 'utf-8', C.sniffBom(withBom));
ok('剥掉 BOM 后解出来是「你好」', dec(C.stripBom(withBom), 'utf-8') === '你好', dec(C.stripBom(withBom), 'utf-8'));

console.log('--- ⑩ UTF-8 当 GBK 读：粘贴的那份常常已经救不回来，必须直说 ---');
var srt = '1\n00:00:01,000 --> 00:00:03,000\n' + dec(enc('这是一句中文', 'utf-8'), 'gbk') + '\n';
var r7 = C.repair({ text: srt });
ok('认出里面已经有替换符', r7.diag.reasons.indexOf('fffd') >= 0, r7.diag.reasons);
ok('明确说「粘贴的这份修不回来」', r7.lost === true, r7.lost);
var r7b = C.repair({ bytes: enc('1\n00:00:01,000 --> 00:00:03,000\n这是一句中文\n', 'utf-8'),
  text: '1\n00:00:01,000 --> 00:00:03,000\n这是一句中文\n' });
ok('传文件：认出是 UTF-8、内容正常、不用修',
  r7b.enc === 'utf-8' && r7b.diag.clean === true && r7b.best === null, [r7b.enc, r7b.diag.reasons]);

console.log('--- ⑪ 字幕结构不许被修坏（这条 UTF-8→GBK 是可逆的）---');
var srt2 = '1\n00:00:01,000 --> 00:00:03,000\n' + dec(enc('你好世界', 'utf-8'), 'gbk') + '\n';
var r8 = C.repair({ text: srt2 });
ok('修完时间轴箭头还在', r8.best && (r8.best.text.match(/-->/g) || []).length === 1, r8.best && r8.best.text);
ok('序号和时间码一个字都没动', r8.best && /^1\n00:00:01,000 --> 00:00:03,000\n/.test(r8.best.text), r8.best && r8.best.text.slice(0, 40));
ok('正文修回来了', r8.best && r8.best.text.indexOf('你好世界') >= 0, r8.best && r8.best.text);

console.log('--- ⑫ 另存为别的编码（播放器读不了 UTF-8 时的正解）---');
ok('能导出 GBK 字节', !!enc('你好', 'gbk'));
ok('GBK 装不下韩文 → 明确返回 null 而不是凑数', enc('안녕하세요', 'gbk') === null, enc('안녕하세요', 'gbk'));
ok('韩文能导出 EUC-KR', !!enc('안녕하세요', 'euc-kr'));
ok('Big5 装得下「你好」', !!enc('你好', 'big5'));
ok('Big5 装不下简体「国」→ null', enc('国', 'big5') === null, enc('国', 'big5'));
ok('GBK 装得下简体「国」', !!enc('国', 'gbk'));

console.log('\n== ' + pass + '/' + (pass + fail) + ' ==');
process.exit(fail ? 1 : 0);
