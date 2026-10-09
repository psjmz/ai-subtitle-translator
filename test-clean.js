/* test-clean.js — 字幕清洗器（clean-core.js）的独立单测
 *
 * ⚠️ 与主站 test-core.js **分开**：清洗器有自己的一份引擎，就该有自己的回归。
 *    这里只 require clean-core.js，不加载 srt-core.js —— 跑它不会碰主站任何东西。
 *    用法：node test-clean.js
 */
const C = require('./clean-core.js');
let P = 0, F = 0;
const ok = (c, m, x) => { c ? P++ : F++; console.log((c ? '  ✓ ' : '  ✗ ') + m + (x !== undefined ? '  → ' + x : '')); };

const ALL_ON = { assFx:true, html:true, ctrl:true, sort:true, sdh:true, speaker:true, music:true, wm:true, dup:true, empty:true, punct:true, upper:true, merge:true };
const DEF_ON = { assFx:true, html:true, ctrl:true, sort:true, sdh:true, speaker:false, music:false, wm:true, dup:true, empty:true, punct:true, upper:false, merge:false };

function mk(list) {
  return list.map((t, i) => ({ no: i + 1, start: i * 3000, end: i * 3000 + 2000, text: t }));
}
const textsOf = raw => C.clean(raw, ALL_ON).changes;

console.log('\n— 解析与格式化 —');
{
  const r = C.parseSrt('1\n00:00:01,000 --> 00:00:03,000\n你好\n\n2\n00:00:04,500 --> 00:00:06,000\n再见\n');
  ok(r.items.length === 2, 'SRT 解析出 2 条', r.items.length);
  ok(r.items[0].start === 1000 && r.items[0].end === 3000, '时间轴毫秒正确');
  ok(/^1\n00:00:01,000 --> 00:00:03,000\n你好/.test(C.formatSrt(r.items)), '格式化往返一致');
  const back = C.parseSrt(C.formatSrt(r.items));
  ok(C.formatSrt(back.items) === C.formatSrt(r.items), '解析 → 格式化 → 再解析是幂等的');
}
{
  /* 孤儿块的成因：时间轴与正文之间多一个空行，正文成了「无编号无时间轴」的独立块。
     ⚠️ 只有上一条正文是**空的**才回填（上一条有正文时那叫两条字幕，不是孤儿）。 */
  const r = C.parseSrt('1\n00:00:01,000 --> 00:00:03,000\n\n正文被空行切断了\n');
  ok(r.items.length === 1 && /正文被空行切断了/.test(r.items[0].text), '孤儿块回填（内容不丢）', JSON.stringify(r.items[0] && r.items[0].text));
}
{
  const r = C.parseVtt('WEBVTT\n\n1\n00:00:01.000 --> 00:00:03.000\nHello <i>there</i>\n');
  ok(r.items.length === 1 && /Hello <i>there<\/i>/.test(r.items[0].text) && r.items[0].start === 1000,
     'VTT 解析并保留斜体标签', JSON.stringify(r.items[0]));
}
{
  const r = C.parseSrt('1\n00:00:01,000 --> 00:00:03,000\n只有一条\n');
  ok(C.fmtTime(3723000) === '01:02:03,000', 'fmtTime 补零正确', C.fmtTime(3723000));
  ok(C.renumber([{ no: 9 }, { no: 9 }])[1].no === 2, 'renumber 重排编号');
}

console.log('\n— 规则：标签与格式 —');
ok(C.stripAssFx('{\\an8}上方字幕') === '上方字幕', 'ASS 花括号');
ok(C.stripAssFx('{\\f4}粗{\\b1}体') === '粗体', '多个花括号');
ok(C.stripHtml('<i>斜体</i>与<b>粗</b>') === '斜体与粗', 'HTML 标签保留文字');
ok(C.stripHtml('3 < 5') === '3 < 5'.replace(/<[^>]*>/g, ''), '小于号不会被当成标签起点（按 < 开头处理）');
ok(C.stripCtrl('忽\u200b略\u200d零宽') === '忽略零宽', '零宽字符');

console.log('\n— 规则：听障提示 —');
ok(C.stripSdh('[脚步声] 我来了。') === '我来了。', '中文方括号音效');
ok(C.stripSdh('（电话铃声）喂？') === '喂？', '中文全角圆括号音效');
ok(C.stripSdh('Wait (laughing) no more') === 'Wait no more', '英文圆括号音效');
ok(C.stripSdh('(背景音乐继续)') === '', '整条只有提示 → 清空');
ok(C.stripSdh('他说（真的）不会来') === '他说（真的）不会来', '⭐ 普通括号内容不误删', C.stripSdh('他说（真的）不会来'));
ok(C.stripSdh('[重要通知] 明天开会') === '[重要通知] 明天开会', '⭐ 方括号里不是音效词就不动');

console.log('\n— 规则：说话人 / 歌词 / 水印 —');
ok(C.stripSpeaker('GEORGE: 夏天真热') === '夏天真热', '全大写说话人前缀');
ok(C.stripSpeaker('A: 你好') === '你好', '单字母说话人');
ok(C.stripSpeaker('注意：前面有坑') === '注意：前面有坑', '⭐ 中文提示不是说话人');
ok(C.stripSpeaker('他说：我不去') === '他说：我不去', '⭐ 中文冒号不误删');
ok(C.isMusicCue('♪ Never gonna give you up ♪') === true, '整条 ♪ 歌词');
ok(C.isMusicCue('♪ 副歌 ♪\n还记得那天吗') === false, '⭐ 带对白的歌词不算');
ok(C.isWmCue('本字幕由 XX 字幕组提供') === true, '字幕组署名');
ok(C.isWmCue('Visit https://example.com') === true, '网址');
ok(C.isWmCue('联系 abc@mail.com') === true, '邮箱');
ok(C.isWmCue('他被打压了整整三年，从没放弃过自己的理想和坚持。') === false, '⭐ 长台词里的「打压」不误删');
ok(C.stripWmLines('第一行台词\nwww.abc.com') === '第一行台词', '只删水印那一行');

console.log('\n— 规则：文字修正 —');
ok(C.tidyPunct('太多   空格 。  ') === '太多 空格。', '多空格与行尾空格');
ok(C.tidyPunct('嗯........') === '嗯...', '连续句点收敛');
ok(C.fixUpper('THIS IS ALL CAPS TEXT') === 'This is all caps text', '全大写 → 正常大小写');
ok(C.fixUpper('I AM HERE. YOU SEE ME.') === 'I am here. You see me.', '句首大写 + 代词 I');
ok(C.fixUpper('I AM OK') === 'I am OK', '缩写白名单还原');
ok(C.fixUpper('tell us the truth') === 'tell us the truth', '⭐ 有小写的条目一律不动');
ok(C.fixUpper('TELL US THE TRUTH') === 'Tell us the truth', '⭐ us 不在缩写白名单（不会被改成 US）');
ok(C.fixUpper('这是一句中文') === '这是一句中文', '中文条目不动');

console.log('\n— clean() 整体 —');
{
  const raw = mk(['<i>Hello</i>', '[脚步声] GEORGE: 走', '{\\an8}本字幕由 XX 字幕组提供', 'THIS IS ALL CAPS', '', '♪ 啦啦 ♪']);
  const ch = C.clean(raw, ALL_ON).changes;
  const after = {};
  ch.forEach(c => { after[c.i] = c; });
  ok(after[0] && after[0].after === 'Hello', '① 去标签 → Hello', after[0] && after[0].after);
  ok(after[1] && after[1].after === '走', '② 去提示 + 去说话人 → 走', after[1] && after[1].after);
  ok(after[2] && after[2].del === true, '③ 水印整条删除');
  ok(after[2] && after[2].tags.indexOf('empty') < 0, '⭐ 水印删空的不再挂「空条目」');
  ok(after[3] && after[3].after === 'This is all caps', '④ 全大写修复', after[3] && after[3].after);
  ok(after[4] && after[4].del === true, '⑤ 空条目删除');
  ok(after[5] && after[5].del === true, '⑥ 纯歌词删除');
  ok(ch.length === 6, '六处全被记下来', ch.length);
}
{
  /* ⚠️ 重复的判据是「开始 + 结束 + 文本」三者全同，所以这里必须手工造同时间轴的两条
     （mk() 给每条不同的时间，永远测不出 dup）。 */
  const raw = [{ no:1, start:1000, end:2000, text:'A: 你好' }, { no:2, start:1000, end:2000, text:'A: 你好' }];
  const ch = C.clean(raw, ALL_ON).changes;
  const dupCh = ch.filter(c => c.tags.indexOf('dup') >= 0);
  ok(dupCh.length === 1 && dupCh[0].i === 1, '重复条目只删后一条', dupCh.length);
}
{
  const raw = [{ no:1, start:1000, end:1800, text:'前半句' }, { no:2, start:2000, end:4000, text:'后半句' }];
  const ch = C.clean(raw, ALL_ON).changes;
  const a = ch.filter(c => c.i === 0)[0], b = ch.filter(c => c.i === 1)[0];
  ok(a && /前半句\n后半句/.test(a.after), '过短相邻条目合并', a && JSON.stringify(a.after));
  ok(b && b.del === true, '被合并的后一条标记删除');
}
{
  /* ⚠️ 最重要的一条：干净的现代字幕一个字都不许动 */
  const raw = mk(['这是一句完整的台词，没有任何问题。', 'Second line of normal dialogue.', '他说：「注意：前面有坑。」', '第三句，收尾。']);
  const ch = C.clean(raw, ALL_ON).changes;
  ok(ch.length === 0, '⭐ 干净字幕 0 处改动（全规则开启也不误伤）', ch.length ? JSON.stringify(ch.map(c => c.before + '→' + c.after)) : '0');
}
{
  const raw = mk(['第二句先出现', '第一句后出现']);
  const r = C.clean(raw, { sort: true });
  ok(r.order[0] === 0 && r.order[1] === 1, '默认按原顺序');
  const raw2 = [{ no:1, start:9000, end:10000, text:'后' }, { no:2, start:1000, end:2000, text:'先' }];
  const r2 = C.clean(raw2, { sort: true });
  ok(r2.order[0] === 1 && r2.order[1] === 0, '勾排序后按开始时间重排', JSON.stringify(r2.order));
  const r3 = C.clean(raw2, {});
  ok(r3.order[0] === 0, '不勾排序就不动顺序');
}
{
  const raw = mk(['原文']);
  ok(C.clean(raw, {}).changes.length === 0, '一个规则都不勾 → 零改动');
  ok(C.clean([], ALL_ON).changes.length === 0, '空输入不炸');
  ok(C.clean(null, ALL_ON).changes.length === 0, 'null 输入不炸');
}

console.log('\n— 默认口径（保守） —');
{
  const raw = mk(['GEORGE: 台词', 'THIS IS CAPS', '♪ 歌词 ♪']);
  const ch = C.clean(raw, DEF_ON).changes;
  const i = {};
  ch.forEach(c => { i[c.i] = c; });
  ok(!i[0], '默认不动说话人');
  ok(!i[1], '默认不动全大写');
  ok(!i[2], '默认不删歌词');
}

console.log('\n— 默认开启的规则确实生效 —');
{
  /* 同上：默认去重复必须用**同时间轴**的两条才测得出来 */
  const raw = [
    { no:1, start:1000, end:2000, text:'<i>x</i>' },
    { no:2, start:3000, end:4000, text:'[掌声] y' },
    { no:3, start:5000, end:6000, text:'www.ad.com' },
    { no:4, start:7000, end:8000, text:'' },
    { no:5, start:9000, end:10000, text:'z' },
    { no:6, start:9000, end:10000, text:'z' }
  ];
  const ch = C.clean(raw, DEF_ON).changes;
  const i = {};
  ch.forEach(c => { i[c.i] = c; });
  ok(i[0] && i[0].after === 'x', '默认去 HTML 标签');
  ok(i[1] && i[1].after === 'y', '默认去听障提示');
  ok(i[2] && i[2].del, '默认删水印');
  ok(i[3] && i[3].del, '默认删空条目');
  ok(i[5] && i[5].del && i[5].tags.indexOf('dup') >= 0, '默认去重复');
}

console.log('\n— VTT 解析 / 导出（v0.9.258）—');
{
  const vtt = ['WEBVTT', '', 'NOTE 说明行', '', 'STYLE', '::cue { color: yellow }', '',
    '1', '00:00:01.000 --> 00:00:03.000 align:middle', '<i>Hello</i> there', '',
    '00:00:04.500 --> 00:00:06.000', '[脚步声] GEORGE: 你好', ''].join('\n');
  const r = C.parseVtt(vtt);
  ok(r.items.length === 2, 'NOTE / STYLE 块被跳过，解析出 2 条', r.items.length);
  ok(r.items[0].start === 1000 && r.items[0].end === 3000, '时间轴毫秒正确');
  ok(/<i>Hello<\/i> there/.test(r.items[0].text), '<i> 行内标签保留（交给去 HTML 规则）', r.items[0].text);
  const out = C.formatVtt(r.items);
  ok(/^WEBVTT\n\n1\n00:00:01\.000 --> 00:00:03\.000\n/.test(out), '导出带 WEBVTT 头与点号毫秒', out.slice(0, 44));
  const back = C.parseVtt(out);
  ok(back.items.length === 2 && C.formatVtt(back.items) === out, '解析 → 导出 → 再解析是幂等的');
  const noHead = ['1', '00:00:01.000 --> 00:00:02.000', '没有 WEBVTT 头的 VTT', ''].join('\n');
  ok(C.parseVtt(noHead).items.length === 1, '没有 WEBVTT 头也能解析');
}

console.log('\n— ASS / SSA 解析（v0.9.258 新增）—');
{
  const ass = ['[Script Info]', 'ScriptType: v4.00+', 'PlayResY: 1080', '',
    '[V4+ Styles]', 'Format: Name, Fontname, Fontsize', 'Style: Default,Arial,56', '',
    '[Events]', 'Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text',
    'Comment: 0,0:00:00.00,0:00:00.50,Default,,0,0,0,,这是注释行不是字幕',
    'Dialogue: 0,0:00:01.00,0:00:03.50,Default,,0,0,0,,{\\an8}Hello world',
    'Dialogue: 0,0:00:04.00,0:00:06.00,Default,,0,0,0,,第一行\\N第二行',
    'Dialogue: 0,0:00:07.00,0:00:09.00,Default,,0,0,0,,带,逗号的台词', ''].join('\n');
  const r = C.parseAss(ass);
  ok(r.items.length === 3, 'Comment 行跳过，Dialogue 解析出 3 条', r.items.length);
  ok(r.items[0].start === 1000 && r.items[0].end === 3500, '厘秒时间轴换算正确（3.50s → 3500ms）',
    r.items[0].start + '/' + r.items[0].end);
  ok(/^\{\\an8\}Hello world$/.test(r.items[0].text), '{\\an8} 保留给清洗规则（与翻译引擎有意不同）', r.items[0].text);
  ok(/第一行\n第二行/.test(r.items[1].text), '\\N 还原成换行');
  ok(/带,逗号的台词/.test(r.items[2].text), 'Text 列里的逗号不被当列分隔符');
  const ch = C.clean(r.items, DEF_ON).changes;
  const c0 = ch.filter(c => c.i === 0)[0];
  ok(c0 && c0.after === 'Hello world' && c0.tags.indexOf('assFx') >= 0,
    '默认规则把 ASS 特效标签清掉', c0 && (c0.after + ' / ' + c0.tags.join(',')));
  ok(/^1\n00:00:01,000 --> 00:00:03,500\n/.test(C.formatSrt(r.items)), 'ASS 条目走 SRT 导出通道');
  ok(C.parseAss('[Script Info]\n[Events]\n') .items.length === 0, '没有 Dialogue 时返回空（不抛错）');
}

console.log('\n' + (F ? '✗ 失败 ' + F + ' / 通过 ' + P : '✓ 全部通过 ' + P) + '\n');
process.exit(F ? 1 : 0);
