/* 诊断：ASS 双语字幕 → 清洗 → SRT 导出，到底出了什么问题。
   两种典型双语排法各跑一遍：
   A. 单条目 \N 分行（原文在上 / 译文在下）
   B. 双条目（两个 Dialogue 同时间轴，Style 不同）—— ASS 双语最常见的排法 */
'use strict';
const C = require('./clean-core.js');

const HEAD = [
  '[Script Info]',
  'ScriptType: v4.00+',
  'PlayResX: 1920',
  'PlayResY: 1080',
  '',
  '[V4+ Styles]',
  'Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding',
  'Style: Default,Arial,54,&H00FFFFFF,&H000000FF,&H00000000,&H00000000,0,0,0,0,100,100,0,0,1,2,2,2,10,10,60,1',
  'Style: CN,Microsoft YaHei,44,&H00FFFFFF,&H000000FF,&H00000000,&H00000000,0,0,0,0,100,100,0,0,1,2,2,2,10,10,30,1',
  '',
  '[Events]',
  'Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text'
].join('\n');

// A：单条目 \N 分行
const A = HEAD + '\n' + [
  'Dialogue: 0,0:00:01.30,0:00:03.30,Default,,0,0,0,,{\\an8}Hello there, how are you?\\N你好啊，你怎么样？',
  'Dialogue: 0,0:00:04.00,0:00:06.50,Default,,0,0,0,,{\\i1}I am fine.\\N我很好。',
  'Dialogue: 0,0:00:07.00,0:00:09.00,Default,,0,0,0,,[MUSIC]\\N[音乐]',
  'Dialogue: 0,0:00:10.00,0:00:12.00,Default,,0,0,0,,www.example.com\\N本字幕由某某字幕组提供'
].join('\n');

// B：双条目（原文一条 / 译文一条，时间轴完全相同）
const B = HEAD + '\n' + [
  'Dialogue: 0,0:00:01.30,0:00:03.30,Default,,0,0,0,,{\\an8}Hello there, how are you?',
  'Dialogue: 0,0:00:01.30,0:00:03.30,CN,,0,0,0,,{\\an2}你好啊，你怎么样？',
  'Dialogue: 0,0:00:04.00,0:00:06.50,Default,,0,0,0,,{\\i1}I am fine.',
  'Dialogue: 0,0:00:04.00,0:00:06.50,CN,,0,0,0,,我很好。'
].join('\n');

// C：译文在前、原文在后的交错排法（也是常见排法）+ 三行（原文/译文/注释）
const Cc = HEAD + '\n' + [
  'Dialogue: 0,0:00:01.30,0:00:03.30,CN,,0,0,0,,你好啊，你怎么样？',
  'Dialogue: 0,0:00:01.30,0:00:03.30,Default,,0,0,0,,Hello there, how are you?',
  'Dialogue: 0,0:00:04.00,0:00:06.50,CN,,0,0,0,,我很好。',
  'Dialogue: 0,0:00:04.00,0:00:06.50,Default,,0,0,0,,I am fine.'
].join('\n');

function run(tag, src) {
  console.log('\n' + '='.repeat(72));
  console.log('【' + tag + '】');
  console.log('='.repeat(72));
  const p = C.parseAss(src);
  console.log('解析到 ' + p.items.length + ' 条');
  p.items.slice(0, 6).forEach(function (it) {
    console.log('  #' + it.no + ' ' + C.fmtTime(it.start) + '→' + C.fmtTime(it.end) +
      '  ' + JSON.stringify(it.text));
  });

  // 默认选项（跟页面 def 一致）
  const o = { assFx:1, html:1, ctrl:1, sort:1, sdh:1, speaker:0, music:0,
              wm:1, dup:1, empty:1, punct:1, upper:0, merge:0 };
  const r = C.clean(p.items, o);

  // 复刻页面 resolve()
  const map = new Map();
  r.changes.forEach(function (ch) { map.set(ch.i, ch); });
  const out = [];
  r.order.forEach(function (i) {
    const it = p.items[i], ch = map.get(i);
    if (ch && ch.del) return;
    out.push({ no: 0, start: it.start, end: it.end, text: ch ? ch.after : String(it.text) });
  });
  C.renumber(out);
  const srt = C.formatSrt(out);

  console.log('\n--- 清洗后条目 ' + out.length + ' 条，改动 ' + r.changes.length + ' ---');
  console.log('\n--- SRT 导出（前 900 字符）---');
  console.log(JSON.stringify(srt.slice(0, 900)));
  console.log('\n--- SRT 原文 ---');
  console.log(srt.slice(0, 900));

  // 体检
  console.log('\n--- 体检 ---');
  let ov = 0;
  for (let i = 1; i < out.length; i++) if (out[i].start < out[i - 1].end - 1) ov++;
  console.log('  时间轴重叠/相邻的条目对数: ' + ov + ' / ' + Math.max(0, out.length - 1));
  const multi = out.filter(function (x) { return String(x.text).indexOf('\n') >= 0; }).length;
  console.log('  多行条目（含换行）: ' + multi);
  const sameTs = {};
  out.forEach(function (x) { const k = x.start + '|' + x.end; sameTs[k] = (sameTs[k] || 0) + 1; });
  const dupTs = Object.keys(sameTs).filter(function (k) { return sameTs[k] > 1; }).length;
  console.log('  时间轴完全相同的组数: ' + dupTs + '（>0 = 播放器里会叠在一起/只显示一条）');
  const empty = out.filter(function (x) { return !String(x.text).replace(/\s/g, ''); }).length;
  console.log('  导出的空条目: ' + empty);
  return { out: out, srt: srt };
}

run('A 单条目 \\N 分行', A);
run('B 双条目（原文 / 译文各一条，同时间轴）', B);
run('C 交错排法（译文在前）', Cc);

/* ---- 额外：BOM 与换行 ---- */
console.log('\n' + '='.repeat(72));
console.log('【换行 / BOM】');
console.log('='.repeat(72));
const s = run('D 换行检查', B).srt;
console.log('  含 \\r: ' + /\r/.test(s));
console.log('  行尾全部是 \\n（非 \\r\\n）: ' + (s.split('\n').length - 1 === s.split('\n').length - 1));
console.log('  download() 会额外加 BOM: 是（clean.html:585）');
