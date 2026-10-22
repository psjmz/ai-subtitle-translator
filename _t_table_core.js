/* _t_table_core.js —— table-core node 断言（v0.9.316，非交付件） */
'use strict';
const C = require('./table-core.js');
const XLSX = require('./xlsx.full.min.js'); global.XLSX = XLSX;
let P = 0, F = 0; const ok = (c, n, x) => { console.log((c ? '  ✓ ' : '  ✗ ') + n + (x !== undefined ? '  [' + String(x).slice(0, 100) + ']' : '')); c ? P++ : F++; };

/* ① parseSrt：多行文本 + 无序号行 */
const SRT = '1\n00:00:01,000 --> 00:00:02,500\nhello\nworld\n\n00:00:03,000 --> 00:00:04,000\n无序号行也能解析\n';
let a = C.parseSrt(SRT);
ok(a.length === 2 && a[0].text === 'hello\nworld' && a[1].text === '无序号行也能解析', 'parseSrt 多行+无序号', a.length);

/* ② parseVtt：无小时位 + NOTE 跳过 */
const VTT = 'WEBVTT\n\nNOTE 这行是注释\n\n00:01.000 --> 00:02.500\nv1\n\n00:00:03.000 --> 00:00:04.000\nv2\n';
a = C.parseVtt(VTT);
ok(a.length === 2 && a[0].start === 1000 && a[0].end === 2500 && a[1].text === 'v2', 'parseVtt 无小时位+NOTE', JSON.stringify(a));

/* ③ detectFmt */
ok(C.detectFmt('a.srt') === 'srt' && C.detectFmt('a.csv') === 'csv' && C.detectFmt('a.xlsx') === 'xlsx', 'detectFmt 按扩展名');
ok(C.detectFmt('x.txt', 'WEBVTT\n\n...') === 'vtt', 'detectFmt 内容嗅探 VTT');

/* ④ parseTs 多形态 */
ok(C.parseTs('00:00:01,500') === 1500 && C.parseTs('00:00:01.5') === 1500 && C.parseTs('1500') === 1500 && C.parseTs(2500) === 2500, 'parseTs 逗号/点号/纯数字', '' + [C.parseTs('00:00:01,500'), C.parseTs('00:00:01.5')]);
ok(isNaN(C.parseTs('abc')), 'parseTs 坏值 NaN');

/* ⑤ CSV：引号转义、字段内换行、BOM、分号检测 */
const CSV = '\uFEFF#;Start;End;Text\r\n1;00:00:01,000;00:00:02,500;"说 ""引号"" 和\n换行"\r\n';
let rows = C.parseCsv(CSV);
ok(rows.length === 2 && rows[1][3] === '说 "引号" 和\n换行', 'CSV 分号+引号转义+字段内换行', JSON.stringify(rows[1]));
ok(C.csvSep('a;b;c') === ';' && C.csvSep('a,b,c') === ',', 'csvSep 检测');

/* ⑥ toCsv 回环（时间戳带逗号必须被引号保护） */
const items = [{ start: 1000, end: 2500, text: 'line1\nline2' }, { start: 3000, end: 4000, text: '有,逗号' }];
const csv = C.toCsv(items);
ok(csv.indexOf('"00:00:01,000"') > 0, '时间戳带逗号被引号包', csv.split('\r\n')[1]);
const back = C.fromRows(C.parseCsv(csv));
ok(back.items.length === 2 && back.items[0].text === 'line1\nline2' && back.items[0].start === 1000 && back.items[1].text === '有,逗号', 'toCsv→parseCsv→fromRows 回环', JSON.stringify(back.items));

/* ⑦ fromRows：中文列头 / 无列头 */
let r1 = C.fromRows([['序号', '开始', '结束', '字幕'], ['1', '00:00:01,000', '00:00:02,000', '中文列头']]);
ok(r1.items.length === 1 && r1.items[0].text === '中文列头', 'fromRows 中文列头');
let r2 = C.fromRows([['00:00:01,000', '00:00:02,000', '无列头行']]);
ok(r2.items.length === 1 && r2.items[0].text === '无列头行', 'fromRows 无列头固定序');

/* ⑧ XLSX 回环（fromXlsx 收 ArrayBuffer，别把 toXlsx 的产物直接喂 fromRows） */
const xb = C.toXlsx(items);
const xr = C.fromXlsx(xb);
ok(xr.length === 3 && xr[1][3] === 'line1\nline2', 'toXlsx→fromXlsx 回环', JSON.stringify(xr[1]));
const xrItems = C.fromRows(xr).items;
ok(xrItems.length === 2 && xrItems[0].start === 1000, 'XLSX rows→items', JSON.stringify(xrItems));

/* ⑨ 全链路：SRT → CSV → XLSX → SRT，与原文逐字一致 */
const srt2 = '1\n00:00:00,500 --> 00:00:02,000\n第一句\n第二行\n\n2\n00:00:03,000 --> 00:00:04,500\nsecond\n';
const orig = C.parseSrt(srt2);
const viaCsv = C.fromRows(C.parseCsv(C.toCsv(orig))).items;
const viaXlsx = C.fromRows(C.fromXlsx(C.toXlsx(viaCsv))).items;
ok(viaXlsx.length === 2 && viaXlsx[0].text === '第一句\n第二行', 'SRT→CSV→XLSX→items 全链路', JSON.stringify(viaXlsx[0]));
const final = C.formatSrt(viaXlsx);
ok(final === srt2, '全链路回环与原文逐字一致', JSON.stringify(final.slice(0, 60)));

/* ⑩ formatVtt */
ok(C.formatVtt([{ start: 1500, end: 2500, text: 'x' }]).indexOf('00:01.500 --> 00:02.500') > 0, 'formatVtt 点号无小时位');

/* ⑪ xlsxLib 缺库明说 */
delete global.XLSX;
let threw = false; try { C.toXlsx([]); } catch (e) { threw = /not loaded/.test(e.message); }
ok(threw, 'XLSX 未加载时明说抛错');
global.XLSX = XLSX;

/* ⑫ VTT 进表格：点号时间戳也认 */
const vttItems = C.parseVtt(VTT);
const vttBack = C.fromRows(C.parseCsv(C.toCsv(vttItems))).items;
ok(vttBack.length === 2 && vttBack[0].start === 1000, 'VTT→CSV→items（点号时间戳）', JSON.stringify(vttBack));

console.log('----');
console.log('通过 ' + P + ' / 失败 ' + F);
process.exit(F ? 1 : 0);
