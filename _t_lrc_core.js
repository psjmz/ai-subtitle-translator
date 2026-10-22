/* _t_lrc_core.js —— lrc-core node 断言（非交付件，可重跑） */
'use strict';
const C = require('./lrc-core.js');
let P = 0, F = 0;
const ok = (c, n, x) => { console.log((c ? '  ✓ ' : '  ✗ ') + n + (x !== undefined ? '  [' + String(x).slice(0, 100) + ']' : '')); c ? P++ : F++; };

/* ① parseLyrics：空行跳过、首尾空白剥离 */
const a = C.parseLyrics('第一句\r\n\r\n  第二句带空白  \n\n\n第三句\n');
ok(a.length === 3 && a[0].text === '第一句' && a[1].text === '第二句带空白' && a[2].t === null, 'parseLyrics 3 行、t=null', JSON.stringify(a));

/* ② fmtLrc */
ok(C.fmtLrc(0) === '[00:00.00]', '0ms', C.fmtLrc(0));
ok(C.fmtLrc(83450) === '[01:23.45]', '83450ms', C.fmtLrc(83450));
ok(C.fmtLrc(600000) === '[10:00.00]', '10 分钟', C.fmtLrc(600000));
ok(C.fmtLrc(-500) === '[00:00.00]', '负数钳 0', C.fmtLrc(-500));

/* ③ parseLrcTs */
ok(C.parseLrcTs('01:23.45') === 83450, '两位百分秒', C.parseLrcTs('01:23.45'));
ok(C.parseLrcTs('01:23.456') === 83456, '三位毫秒', C.parseLrcTs('01:23.456'));
ok(C.parseLrcTs('1:05') === 65000, '无小数位', C.parseLrcTs('1:05'));
ok(C.parseLrcTs('abc') === null, '坏值 null');

/* ④ toLrc：只导已打 */
const lines = [
  { text: '第一句', t: 1500 },
  { text: '没打的', t: null },
  { text: '第二句', t: 62000 }
];
const lrc = C.toLrc(lines);
ok(lrc === '[00:01.50]第一句\r\n[01:02.00]第二句\r\n', 'toLrc 跳过未打行', JSON.stringify(lrc));
ok(C.toLrc([{ text: 'x', t: null }]) === '', '全未打导出空串');

/* ⑤ toSrt：时长到下一句、末句兜底 */
const srt = C.toSrt(lines, 2000);
ok(srt.indexOf('00:00:01,500 --> 00:01:02,000') > 0, '首句到下一句', srt.split('\r\n')[1]);
ok(srt.indexOf('00:01:02,000 --> 00:01:04,000') > 0, '末句兜底 2s', srt.split('\r\n')[5]);
ok(srt.indexOf('没打的') < 0, '未打行不进 SRT');

/* ⑥ parseLrc：导入已有 LRC（多时间标签、元数据行跳过） */
const imp = C.parseLrc('[ti:测试]\n[00:01.50]第一句\n[00:10.00][00:20.00]双时间行\n');
ok(imp.length === 3 && imp[0].t === 1500 && imp[1].t === 10000 && imp[2].t === 20000, '导入 LRC 多时间标签', JSON.stringify(imp));
ok(C.parseLrc('[ti:测试]')[0] === undefined || C.parseLrc('[ti:测试]').length === 0, '纯元数据行跳过', JSON.stringify(C.parseLrc('[ti:测试]')));

/* ⑥b parseLrc 混合文本：无时间的普通行保留为 t=null、排最后 */
const mix = C.parseLrc('[00:01.50]已有时间的一句\n这句没有时间\n[ar:谁唱的]\n');
ok(mix.length === 2 && mix[0].t === 1500 && mix[1].t === null && mix[1].text === '这句没有时间', '混合文本保留无时间行', JSON.stringify(mix));

/* ⑦ 回环：导出 → 导入 → 时间一致 */
const back = C.parseLrc(C.toLrc(lines));
ok(back.length === 2 && back[0].t === 1500 && back[1].t === 62000, 'LRC 导出导入回环', JSON.stringify(back));

/* ⑧ statOf */
const st = C.statOf(lines);
ok(st.total === 3 && st.done === 2, 'statOf 3 总 2 已打', JSON.stringify(st));

/* ⑨ fmtSrtTs */
ok(C.fmtSrtTs(83456) === '00:01:23,456', '毫秒补零', C.fmtSrtTs(83456));
ok(C.fmtSrtTs(3600000) === '01:00:00,000', '1 小时', C.fmtSrtTs(3600000));

console.log('----');
console.log('通过 ' + P + ' / 失败 ' + F);
process.exit(F ? 1 : 0);
