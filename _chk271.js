/* v0.9.271 引擎契约验证：双语识别 / 合并 / 水印按行 / 去重保护 / ASS 写回 */
'use strict';
const C = require('./clean-core.js');
let pass = 0, fail = 0;
function ok(c, msg, got) {
  if (c) { pass++; console.log('  ✓ ' + msg); }
  else { fail++; console.log('  ✗ ' + msg + (got !== undefined ? '  → ' + JSON.stringify(got) : '')); }
}

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

/* ---------- ① 双轨双语识别 ---------- */
console.log('\n【① 双轨双语识别】');
{
  const src = HEAD + '\n' + [
    'Dialogue: 0,0:00:01.30,0:00:03.30,Default,,0,0,0,,{\\an8}Hello there, how are you?',
    'Dialogue: 0,0:00:01.30,0:00:03.30,CN,,0,0,0,,{\\an2}你好啊，你怎么样？',
    'Dialogue: 0,0:00:04.00,0:00:06.50,Default,,0,0,0,,{\\i1}I am fine.',
    'Dialogue: 0,0:00:04.00,0:00:06.50,CN,,0,0,0,,我很好。',
    'Dialogue: 0,0:00:07.00,0:00:09.00,Default,,0,0,0,,What time is it?',
    'Dialogue: 0,0:00:07.00,0:00:09.00,CN,,0,0,0,,现在几点了？'
  ].join('\n');
  const r = C.parseAss(src);
  ok(r.items.length === 6, '解析 6 条', r.items.length);
  ok(r.items[0].style === 'Default' && r.items[1].style === 'CN', 'Style 列被保留（判断谁是谁的依据）');
  ok(r.items[0].srcIdx != null && r.items[1].srcIdx > r.items[0].srcIdx, '行号被保留（ASS 写回的前提）');

  const d = C.detectBilingual(r.items);
  ok(d.bi === true, '识别出这是双语文件', d);
  ok(d.pairs.size === 3, '找到 3 对双轨', d.pairs.size);
  ok(d.tgtFirst === false, '默认「原文在上」', d.tgtFirst);

  const m = C.mergeBilingual(r.items, d.pairs, false);
  ok(m.length === 3, '合并后 3 条（不是 6 条）', m.length);
  ok(m[0].text === '{\\an8}Hello there, how are you?\n{\\an2}你好啊，你怎么样？',
     '第 1 条 = 原文在上 + 译文在下', m[0].text);
  ok(m[0].start === 1300 && m[0].end === 3300, '合并后时间轴不变');
  ok(m[0].srcIdx === r.items[0].srcIdx && m[0].srcIdxB === r.items[1].srcIdx,
     '记住了两条轨道的源行号（第二条要整行移除）');
  ok(m[2].text.indexOf('现在几点了？') > 0, '第 3 条也是合并的', m[2].text);

  const fl = C.mergeBilingual(r.items, d.pairs, true)[0].text.split('\n');
  ok(fl[0].indexOf('你好啊') >= 0 && fl[1].indexOf('Hello') >= 0, 'flip 后译文在上', fl);
}

/* ---------- ② 不该误判的 ---------- */
console.log('\n【② 不误判】');
{
  // 单语 SRT 风格的条目，时间轴各不相同
  const a = [{ start:1000, end:2000, text:'Hello' }, { start:3000, end:4000, text:'World' }];
  ok(C.detectBilingual(a).bi === false, '时间轴不同的普通字幕 → 不是双语');
  // 只有一对同时间轴（可能是注释轨，不值得重构整份文件）
  const b = [{ start:1000, end:2000, text:'Hello' }, { start:1000, end:2000, text:'你好' },
             { start:3000, end:4000, text:'World' }];
  ok(C.detectBilingual(b).bi === false, '只有 1 对 → 不判定为双语（宁可漏不能错并）',
     C.detectBilingual(b));
  // 同时间轴但语种相同（中文原文+中文注释）
  const c = [];
  for (let i = 0; i < 4; i++) {
    c.push({ start:1000 + i * 2000, end:2000 + i * 2000, text:'中文一行' });
    c.push({ start:1000 + i * 2000, end:2000 + i * 2000, text:'另一行中文' });
  }
  ok(C.detectBilingual(c).bi === false, '同时间轴但语种相同 → 不判双语', C.detectBilingual(c));
  ok(C.langOf('你好') === 'cjk' && C.langOf('Hello') === 'lat', '语种判断正确');
  ok(C.langOf('2024') === '', '纯数字判不出语种（不趟这浑水）');
}

/* ---------- ③ 水印按行剥，不再整条删 ---------- */
console.log('\n【③ 双语里一行是水印 → 只删那一行】');
{
  const o = { assFx:1, html:1, ctrl:1, sort:1, sdh:1, speaker:0, music:0,
              wm:1, dup:1, empty:1, punct:1, upper:0, merge:0, bi:1 };
  const cases = [
    ['What time is it?\n本字幕由XX字幕组提供', 'What time is it?'],
    ['It is nine o clock.\n微信公众号：abc123', 'It is nine o clock.'],
    ['See you tomorrow.\nwww.example.com', 'See you tomorrow.']
  ];
  cases.forEach(function (cs) {
    const r = C.clean([{ start:1000, end:2000, text:cs[0] }], o);
    const after = r.changes.length ? r.changes[0].after : cs[0];
    ok(after === cs[1], '对白保住了 → ' + JSON.stringify(after), after);
  });
  // 整条就是水印（单行）→ 仍然整条删
  {
    const r = C.clean([{ start:1000, end:2000, text:'www.example.com' }], o);
    ok(r.changes.length && r.changes[0].del, '整条就是水印 → 仍然整条删');
  }
  // 双语两行都是水印 → 整条删
  {
    const r = C.clean([{ start:1000, end:2000, text:'www.a.com\n本字幕由XX提供' }], o);
    ok(r.changes.length && r.changes[0].del, '两行都是水印 → 整条删');
  }
}

/* ---------- ④ 去重保护：原文=译文 ---------- */
console.log('\n【④ 双语模式下去重不误删】');
{
  const o1 = { assFx:0, html:0, ctrl:0, sort:1, sdh:0, speaker:0, music:0,
               wm:0, dup:1, empty:1, punct:0, upper:0, merge:0, bi:1 };
  const raw = [
    { start:1300, end:3300, text:'2024' }, { start:1300, end:3300, text:'2024' },
    { start:5000, end:7000, text:'OK' },   { start:5000, end:7000, text:'OK' }
  ];
  const r1 = C.clean(raw, o1);
  ok(r1.changes.filter(function (c) { return c.del; }).length === 0,
     '双语模式：时间轴相同的两条不再被判重复', r1.changes.map(function (c) { return c.del; }));

  const o2 = Object.assign({}, o1); o2.bi = 0;
  const r2 = C.clean(raw, o2);
  ok(r2.changes.filter(function (c) { return c.del; }).length === 2,
     '非双语模式：真正的重复仍然会被删（没把规则改废）');
}

/* ---------- ⑤ merge 带上时间轴 ---------- */
console.log('\n【⑤ 合并短句后，change 带上了正确的结束时间】');
{
  const o = { assFx:0, html:0, ctrl:0, sort:1, sdh:0, speaker:0, music:0,
              wm:0, dup:0, empty:0, punct:0, upper:0, merge:1 };
  const raw = [{ start:1000, end:1800, text:'Hello there' },
               { start:1900, end:2600, text:'how are you' }];
  const r = C.clean(raw, o);
  const ch = r.changes[0];
  ok(ch.end === 2600, 'change.end = 2600（合并后的尾巴，不是旧的 1800）', ch.end);
  ok(ch.start === 1000, 'change.start = 1000', ch.start);
}

/* ---------- ⑥ ASS 写回 ---------- */
console.log('\n【⑥ ASS 输出：样式段原样，只有文本被换】');
{
  const dlg = [
    'Dialogue: 0,0:00:01.30,0:00:03.30,Default,,0,0,0,,{\\an8}Hello there\N你好啊',
    'Dialogue: 0,0:00:04.00,0:00:06.50,CN,,0,0,0,,我很好',
    'Dialogue: 0,0:00:07.00,0:00:09.00,Default,,0,0,0,,www.spam.com'
  ];
  const src = HEAD + '\n' + dlg.join('\n');
  const r = C.parseAss(src);
  const items = r.items.map(function (it, i) {
    return { no:i + 1, start:it.start, end:it.end, srcIdx:it.srcIdx,
             text: i === 0 ? 'Hello there\n你好啊' : (i === 1 ? '我很好' : '') };
  });
  const drop = new Set([r.items[2].srcIdx]);        /* 第 3 条被清洗删掉 */
  const out = C.rewriteAss(src, items, drop);

  ok(out.indexOf('[Script Info]') === 0, 'Script Info 段在最前面');
  ok(out.indexOf('PlayResX: 1920') > 0, '分辨率原样保留');
  ok(out.indexOf('Style: Default,Arial,54') > 0, '样式行原样保留');
  ok(out.indexOf('Style: CN,Microsoft YaHei,44') > 0, '第二条样式行也保留');
  ok(out.indexOf('Format: Layer, Start, End') > 0, 'Format 行保留');
  ok(out.indexOf('www.spam.com') < 0, '被删的条目整行消失了');
  const lines = out.split('\r\n').filter(function (l) { return /^Dialogue:/i.test(l); });
  ok(lines.length === 2, '只剩 2 条 Dialogue', lines.length);
  ok(lines[0].indexOf('Hello there\\N你好啊') > 0, '换行被还原成 \\N（ASS 的换行记号）', lines[0]);
  ok(lines[0].indexOf('0:00:01.30') > 0 && lines[0].indexOf('Default') > 0,
     '时间轴与 Style 列原样保留', lines[0]);
  ok(/\r\n/.test(out), 'ASS 输出用 CRLF');
  ok(!/\n(?!\r)/.test(out.replace(/\r\n/g, '')), '没有游离的 LF');
}

/* ---------- ⑦ SRT / VTT 行尾 ---------- */
console.log('\n【⑦ SRT / VTT 用 CRLF】');
{
  const srt = C.formatSrt([{ no:1, start:1000, end:2000, text:'a\nb' }]);
  ok(/^1\r\n00:00:01,000 --> 00:00:02,000\r\na\r\nb\r\n$/.test(srt), 'SRT 全 CRLF', JSON.stringify(srt));
  const vtt = C.formatVtt([{ no:1, start:1000, end:2000, text:'a' }]);
  ok(/^WEBVTT\r\n\r\n1\r\n/.test(vtt), 'VTT 全 CRLF', JSON.stringify(vtt.slice(0, 20)));
}

console.log('\n' + '='.repeat(60));
console.log(fail ? '✗ 失败 ' + fail + ' / 通过 ' + pass : '✓ 全部通过 ' + pass);
process.exit(fail ? 1 : 0);
