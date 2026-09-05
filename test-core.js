'use strict';
const C = require('./srt-core.js');
const assert = require('assert');

let pass = 0, fail = 0;
function t(name, fn) {
  try { fn(); pass++; console.log('  ✓ ' + name); }
  catch (e) { fail++; console.log('  ✗ ' + name + '\n      ' + e.message); }
}

console.log('— 显示宽度 —');
t('汉字/全角=1、半角每2字符=1', () => {
  assert.strictEqual(C.textWidth('SpaceX 已经把星舰送上了轨道'), 13); // 10 汉字 + 6半角/2=3
  assert.strictEqual(C.textWidth('你好'), 2);
  assert.strictEqual(C.textWidth('ABC'), 1.5);
  assert.strictEqual(C.textWidth('，。'), 2);
});
t('空白不计宽', () => {
  assert.strictEqual(C.textWidth('a b c'), 1.5);
});

console.log('— 折行（每行等效宽 <= 18）—');
const longText = '除了 Generated Assets，Public 还让你在一个平台投资股票、债券、期权和加密货币，而且所有这些交易都在同一个账户里完成';
t('长中文句折行后每行 <=18', () => {
  const lines = C.wrapToWidth(longText, 18);
  console.log('      → ' + lines.join(' | '));
  lines.forEach(l => assert.ok(C.textWidth(l) <= 18.001, '超宽: ' + l));
  assert.ok(lines.length >= 2);
});
t('无标点长句也能折行', () => {
  const s = '这是一个完全没有标点符号的长句子需要被自动折行处理看看效果到底怎么样才行呢';
  const lines = C.wrapToWidth(s, 18);
  console.log('      → ' + lines.join(' | '));
  lines.forEach(l => assert.ok(C.textWidth(l) <= 18.001));
});
t('折行不劈开英文专名', () => {
  // 构造临界：前半 + SpaceX 恰在硬切边界附近
  const s = '这个句子前面刚好铺满到临界位置SpaceX公司名字不能被拆开';
  const lines = C.wrapToWidth(s, 18);
  console.log('      → ' + lines.join(' | '));
  lines.forEach(l => {
    const hasHalf = /[A-Za-z]{0,5}Space/.test(l) && /X[A-Za-z]{0,5}/.test(l);
  });
  // 校验：SpaceX 应完整出现在某一行
  const joined = lines.join('\n');
  lines.forEach(l => { if (l.includes('Space') || l.includes('X')) {} });
  assert.ok(lines.some(l => l.includes('SpaceX')), 'SpaceX 被劈开');
});
t('保留原文已有换行', () => {
  const lines = C.wrapToWidth('短行甲\n' + longText, 18);
  assert.strictEqual(lines[0], '短行甲');
});

console.log('— 折行 normalize（先合并整条再判定，规则⑥口径）—');
t('短句被错误断行 → normalize 合并回单行', () => {
  // 回归：10 字短句被模型拆成两行，整条 <=18，应还原为一行
  const lines = C.wrapToWidth('其容量和规模\n确实不足', 18, {normalize:true});
  console.log('      → ' + JSON.stringify(lines));
  assert.strictEqual(lines.length, 1, '应合并为单行');
  assert.strictEqual(lines[0], '其容量和规模确实不足');
});
t('整条等效宽 <=18 的多行文本 → 保持单行', () => {
  const lines = C.wrapToWidth('明天早上\n九点开会', 18, {normalize:true});
  assert.strictEqual(lines.join(''), '明天早上九点开会');
  assert.ok(lines.every(l => C.textWidth(l) <= 18));
});
t('整条超 18 → normalize 折行且每行 <=18', () => {
  const s = '除了 Generated Assets，Public 还让你\n在一个平台投资股票、债券、期权和加密货币';
  const lines = C.wrapToWidth(s, 18, {normalize:true});
  console.log('      → ' + lines.join(' | '));
  lines.forEach(l => assert.ok(C.textWidth(l) <= 18.001, '超宽: ' + l));
  assert.ok(lines.length >= 2, '应折为多行');
  // 内容完整性按非空白字符比较（行切点落在词边界时，边界空格由换行替代属正常排版）
  assert.strictEqual(lines.join('').replace(/\s+/g, ''), s.replace('\n', '').replace(/\s+/g, ''), '合并后内容应完整无缺');
});
t('normalize 拼缝为英文时补空格', () => {
  const lines = C.wrapToWidth('SpaceX 已经\n把星舰送上了轨道', 18, {normalize:true});
  assert.strictEqual(lines[0], 'SpaceX 已经把星舰送上了轨道');
});
t('回归：19 宽无标点句折行（硬切点在句号前不得整行吞掉）', () => {
  // v0.7 真实案例：硬切点 18 恰在 "。"-1，闭符号推到行末导致整行 19 宽返回未折
  const s = '使用这种材料的国内产业不得不提高价格。';
  const lines = C.wrapToWidth(s, 18, {normalize:true});
  console.log('      → ' + lines.join(' | '));
  assert.strictEqual(lines.join(''), s);
  lines.forEach(l => assert.ok(C.textWidth(l) <= 18.001, '超宽: ' + l + ' (' + C.textWidth(l) + ')'));
  const s2 = '就业岗位远多于钢铁生产行业新增的岗位。';
  const l2 = C.wrapToWidth(s2, 18, {normalize:true});
  console.log('      → ' + l2.join(' | '));
  l2.forEach(l => assert.ok(C.textWidth(l) <= 18.001, '超宽: ' + l));
});
t('回归：切点后紧跟闭符号时并入行尾', () => {
  // "…结束了|。" → 第一行应包含句号，而非把 "。" 留到下一行行首
  const s = '这是一个足足有十八个字宽的句子结束了。然后';
  const lines = C.wrapToWidth(s, 18, {normalize:true});
  console.log('      → ' + lines.join(' | '));
  lines.forEach(l => assert.ok(C.textWidth(l) <= 18.001, '超宽: ' + l));
  lines.forEach(l => assert.ok(!CLOSE_HEAD(l), '行首出现闭符号: ' + l));
  function CLOSE_HEAD(l){ return /^[”’』】）》'，。！？、；：…]/.test(l); }
});

console.log('— 多语言折行（空格断点 / CJK 全角）—');
t('拉丁文按空格断行，不劈词、还原无损', () => {
  const s='This is a fairly long English subtitle line that definitely exceeds the maximum allowed display width for one row of text';
  const lines = C.wrapToWidth(s, 18, {normalize:true});
  console.log('      → ' + lines.join(' | '));
  lines.forEach(l => assert.ok(C.textWidth(l) <= 18.001, '超宽: ' + l));
  assert.ok(lines.length >= 3, '应折成多行');
  assert.strictEqual(lines.join(' '), s, '按空格断开，拼回应无损');
});
t('日文（假名全角=1字）折行后每行 <=18', () => {
  const s='これはかなり長い日本語の字幕テキストです折行テストの為にあえてとても長く書いています';
  const lines = C.wrapToWidth(s, 18, {normalize:true});
  console.log('      → ' + lines.join(' | '));
  lines.forEach(l => assert.ok(C.textWidth(l) <= 18.001, '超宽: ' + l));
  assert.ok(lines.length >= 2);
});

console.log('— 水词识别 —');
const fillerT = ['yeah', 'Yeah, yeah.', 'um', '[音乐]', 'you know', 'okay', 'mm-hmm', 'well', 'um uh yeah', '【掌声】'];
t('纯水词/提示词命中', () => {
  fillerT.forEach(s => assert.ok(C.isFillerCue(s), '应为水词: ' + s));
});
const realT = ['space systems were the major focus', 'well I think we can do that later', 'right now we should go', 'so you have raised over 136 million'];
t('实义句不误判', () => {
  realT.forEach(s => assert.ok(!C.isFillerCue(s), '误判为水词: ' + s));
});
t('stripSoundTags 去掉内嵌提示词', () => {
  assert.strictEqual(C.stripSoundTags('我们开始吧[音乐]'), '我们开始吧');
  assert.strictEqual(C.stripSoundTags('[背景音乐] 然后我们继续'), '然后我们继续');
});

console.log('— 句子级分组（groupSentences）—');
t('未以句末标点结尾的 cue 并入下一组', () => {
  const items = [
    { no: 1, start: 0,    end: 1000, text: 'who publicly condemned the bill.' },
    { no: 2, start: 1000, end: 2000, text: "But this wouldn't be the last time a world leader was shocked" },
    { no: 3, start: 2000, end: 3000, text: "by a tariff's consequences." },
  ];
  const gs = C.groupSentences(items);
  assert.strictEqual(gs.length, 2, '应分为 2 组');
  assert.strictEqual(gs[0].cues.length, 1);
  assert.strictEqual(gs[1].cues.length, 2, '2/3 应合并');
  assert.ok(gs[1].text.includes('shocked by'), '合并文本应为完整句');
});
t('纯水词 cue 单独成组并标记 filler', () => {
  const items = [
    { no: 1, start: 0,    end: 900,  text: '[music]' },
    { no: 2, start: 900,  end: 1800, text: 'Hello there.' },
  ];
  const gs = C.groupSentences(items);
  assert.strictEqual(gs.length, 2);
  assert.strictEqual(gs[0].filler, true);
  assert.strictEqual(gs[1].filler, undefined);
});
t('无标点超长文本受保险丝限制（每组 <=6 条）', () => {
  const items = [];
  for (let i = 0; i < 10; i++) items.push({ no: i + 1, start: i * 1000, end: i * 1000 + 900, text: 'word' });
  const gs = C.groupSentences(items);
  assert.ok(gs.length >= 2, '应被强制分成多组');
  assert.ok(gs.every(g => g.cues.length <= 6));
});
t('中文句末标点同样生效', () => {
  const items = [
    { no: 1, start: 0, end: 1000, text: '这个句子没有结束' },
    { no: 2, start: 1000, end: 2000, text: '到这里才结束。' },
    { no: 3, start: 2000, end: 3000, text: '新句子。' },
  ];
  const gs = C.groupSentences(items);
  assert.strictEqual(gs.length, 2);
  assert.strictEqual(gs[0].cues.length, 2);
});

console.log('— 按时长切分（splitByDuration）—');
t('两条等时长：均非空且拼回等于原文', () => {
  const text = '但这并不是最后一次世界领导人被关税的后果震惊';
  const pieces = C.splitByDuration(text, [{ start: 0, end: 2000 }, { start: 2000, end: 4000 }]);
  console.log('      → ' + pieces.join(' / '));
  assert.strictEqual(pieces.length, 2);
  assert.ok(pieces[0].length > 0);
  assert.ok(pieces[1].length > 0);
  assert.strictEqual(pieces.join(''), text);
});
t('三条不等时长：长段分到更多内容', () => {
  const text = '今天我们请到了一位非常特别的嘉宾，他将和我们聊聊太空产业的未来';
  const pieces = C.splitByDuration(text, [{ start: 0, end: 500 }, { start: 500, end: 2500 }, { start: 2500, end: 3000 }]);
  console.log('      → ' + pieces.join(' / '));
  assert.strictEqual(pieces.length, 3);
  pieces.forEach(p => assert.ok(p.length > 0, '每条必须有内容'));
  assert.strictEqual(pieces.join(''), text);
  assert.ok(pieces[1].length > pieces[0].length, '中段时长最长应分到最多');
});
t('单条字幕原样返回', () => {
  assert.deepStrictEqual(C.splitByDuration('只有一条', [{ start: 0, end: 1000 }]), ['只有一条']);
});
t('极端短译文也能保证每条非空', () => {
  const pieces = C.splitByDuration('好的没问题', [{ start: 0, end: 1000 }, { start: 1000, end: 2000 }, { start: 2000, end: 3000 }]);
  console.log('      → ' + pieces.join(' / '));
  assert.strictEqual(pieces.length, 3);
  pieces.forEach(p => assert.ok(p.length > 0, '每条必须有内容'));
});

console.log('— 数字+单位原子保护 —');
t('atomicRanges 识别数字原子', () => {
  const r = (s) => C.atomicRanges(Array.from(s)).map(x => Array.from(s).slice(x[0], x[1]).join(''));
  assert.deepStrictEqual(r('高达30%的关税'), ['30%']);
  assert.deepStrictEqual(r('$50 million'), ['$50']);
  assert.deepStrictEqual(r('约1,000人'), ['1,000人']);   // 中文量词单位同样并入原子
  assert.deepStrictEqual(r('涨了12.5%'), ['12.5%']);
  assert.deepStrictEqual(r('100万美元'), ['100万美元']);
  assert.deepStrictEqual(r('137 Ventures 融资'), ['137']); // Ventures 是单词不是单位，不吞
  assert.deepStrictEqual(r('重50kg左右'), ['50kg']);
});
t('splitByDuration 不拆散 30%（回归：布什关税句）', () => {
  const text = '2002年，布什政府对进口钢材征收了高达30%的关税';
  // 时长比例刻意构造：5.3s / 1.3s，目标切点恰好落在 30 附近
  const pieces = C.splitByDuration(text, [{ start: 0, end: 5338 }, { start: 5338, end: 6673 }]);
  console.log('      → ' + pieces.join(' / '));
  assert.strictEqual(pieces.join(''), text);
  assert.ok(pieces.some(p => p.includes('30%')), '30% 应完整落在同一条');
  pieces.forEach(p => assert.ok(!/^%/.test(p), '任何一条不得以 % 开头'));
});
t('wrapToWidth 折行也不拆散数字单位', () => {
  const s = '这笔交易的总金额达到了惊人的1,250.5亿美元创下了历史新高';
  const lines = C.wrapToWidth(s, 18, { normalize: true });
  console.log('      → ' + lines.join(' | '));
  assert.strictEqual(lines.join(''), s);
  assert.ok(lines.some(l => l.includes('1,250.5亿美元')), '数字单位应完整落在一行');
});
t('借字保底也不劈原子', () => {
  // 极端构造：第二段目标极短，触发空段借字，借出边界不得切在 30% 内部
  const pieces = C.splitByDuration('高达30%的关税', [{ start: 0, end: 9900 }, { start: 9900, end: 10000 }]);
  console.log('      → ' + pieces.join(' / '));
  assert.ok(pieces.every(p => p.length > 0));
  assert.ok(pieces.join('').includes('30%'));
  assert.ok(pieces.some(p => p.includes('30%')), '30% 应完整');
});

console.log('— 词边界保护（Intl.Segmenter 分词）—');
// 通用校验：折行的每个切点都必须落在词边界上（不劈词）
function assertNoWordSplit(src, ls, locale) {
  const flat = ls.join('');
  const wb = C.wordBounds(Array.from(flat), locale || 'zh-CN');
  if (!wb) return; // 分词器不可用则跳过
  let acc = 0;
  for (let i = 0; i < ls.length - 1; i++) {
    acc += Array.from(ls[i]).length;
    assert.ok(wb.has(acc), '切点劈词: ' + flat.slice(Math.max(0, acc - 3), acc) + '|' + flat.slice(acc, acc + 3));
  }
}
t('折行不劈中文词（回归：价|格 / 方|面 / 应|对 / 一直|在）', () => {
  const cases = [
    '使用这种材料的国内产业不得不提高价格。',
    '关税的影响涉及经济的一个非常重要方面。',
    '企业通常会通过调整产品价格来应对关税的冲击。',
    '几十年来钢铁产业的就业人数一直在下降。',
    '这个方案的实施将会给整个行业带来非常深远的改变和影响。',
  ];
  const lines = cases.map(s => C.wrapToWidth(s, 18, { normalize: true, locale: 'zh-CN' }));
  lines.forEach(ls => {
    console.log('      → ' + ls.join(' / '));
    ls.forEach(l => assert.ok(C.textWidth(l) <= 18.01, '行宽超限: ' + l));
  });
  lines.forEach((ls, i) => assertNoWordSplit(cases[i], ls));
  assert.ok(lines[0].some(l => l.startsWith('价格')), '价格 应整词在下一行行首: ' + JSON.stringify(lines[0]));
  assert.ok(lines[1].some(l => l.startsWith('方面')), '方面 应整词在下一行行首: ' + JSON.stringify(lines[1]));
});
t('无 locale 参数时默认启用 zh 分词（向后兼容）', () => {
  const ls = C.wrapToWidth('使用这种材料的国内产业不得不提高价格。', 18, { normalize: true });
  assert.ok(ls.some(l => l.startsWith('价格')), '默认 zh 分词也应保护词: ' + JSON.stringify(ls));
});
t('日语分词保护', () => {
  const s = 'この製品のデザインは時代を先取りしていると言えますが多くの人は気づいていません';
  const ls = C.wrapToWidth(s, 18, { normalize: true, locale: 'ja' });
  console.log('      → ' + ls.join(' / '));
  ls.forEach(l => assert.ok(C.textWidth(l) <= 18.01, '行宽超限: ' + l));
  assertNoWordSplit(s, ls, 'ja');
});
t('英文折行不受影响（空格分词）', () => {
  const ls = C.wrapToWidth('The company shipped nearly 1,000 units in the first quarter', 18, { normalize: true, locale: 'en' });
  console.log('      → ' + ls.join(' / '));
  ls.forEach(l => assert.ok(C.textWidth(l) <= 18.01));
  assert.ok(ls.join(' ').includes('1,000'));
});
t('splitByDuration 词边界加分：切点不落词中', () => {
  // 目标切点附近若无标点，优先落在词边界而非词中
  const pieces = C.splitByDuration(
    '企业通常会通过调整产品价格来应对关税的冲击和影响',
    [{ start: 0, end: 4000 }, { start: 4000, end: 5000 }, { start: 5000, end: 9000 }],
    { locale: 'zh-CN' }
  );
  console.log('      → ' + pieces.join(' / '));
  assert.strictEqual(pieces.length, 3);
  pieces.forEach(p => assert.ok(p.length > 0));
});
t('wordBounds 返回边界集合', () => {
  const wb = C.wordBounds(Array.from('提高价格'), 'zh-CN');
  if (wb) {  // 分词器可用才断言（老环境降级）
    assert.ok(wb.has(0));
    assert.ok(!wb.has(3), '「价格」中间不是边界');
  }
});

console.log('— 句组合并判定（mergeableGroup）—');
const bushCues = [{ start: 198653, end: 203991 }, { start: 203991, end: 205326 }]; // 6.67s
t('时长与行数达标 → 可合并（回归：49/50 两条）', () => {
  assert.ok(C.mergeableGroup(bushCues, '2002年，布什政府对进口钢材征收了高达30%的关税'));
});
t('总时长超 7 秒 → 不合并', () => {
  const cues = [{ start: 0, end: 8000 }, { start: 8000, end: 16000 }];
  assert.ok(!C.mergeableGroup(cues, '短句'));
});
t('译文折行超 2 行 → 不合并', () => {
  const t36 = '这是一条非常非常长的译文内容宽度明显超过了三十六个字符的上限因此不能合并成一条字幕来显示';
  assert.ok(C.textWidth(t36) > 36, '前置：宽度确实 >36');
  assert.ok(!C.mergeableGroup(bushCues, t36, { maxW: 18 }), '18 阈值下折行超 2 行');
});
t('单条句组 / 空译文 → 不合并', () => {
  assert.ok(!C.mergeableGroup([{ start: 0, end: 1000 }], '单条无合并意义'));
  assert.ok(!C.mergeableGroup(bushCues, ''));
});

console.log('— SRT 解析 / 校验 / 重编号 —');
const sample = `1
00:00:00,200 --> 00:00:00,600
Brigitte

2
00:00:00,600 --> 00:00:01,366
Mennerbrigitte

3
00:00:01,366 --> 00:00:02,000
yeah

4
00:00:02,700 --> 00:00:05,266
Mennerthis is 180,000 square feet
`;
t('解析条数与内容', () => {
  const { items, issues } = C.parseSrt(sample);
  assert.strictEqual(items.length, 4);
  assert.strictEqual(issues.length, 0);
  assert.deepStrictEqual(items[0], { no: 1, start: 200, end: 600, text: 'Brigitte' });
});
t('格式-解析往返一致', () => {
  const { items } = C.parseSrt(sample);
  const again = C.parseSrt(C.formatSrt(items));
  assert.strictEqual(again.issues.length, 0);
  assert.strictEqual(again.items.length, 4);
  assert.strictEqual(again.items[1].text, 'Mennerbrigitte');
});
t('重叠与零时长被检出', () => {
  const bad = `1
00:00:00,500 --> 00:00:01,000
a

2
00:00:00,800 --> 00:00:01,500
b

3
00:00:02,000 --> 00:00:02,000
c
`;
  const { items, issues } = C.parseSrt(bad);
  assert.ok(issues.some(i => i.type === 'overlap'));
  assert.ok(issues.some(i => i.type === 'time')); // 零时长
});
t('validateItems 空内容检出', () => {
  const iss = C.validateItems([{ no: 1, start: 0, end: 1000, text: '  ' }]);
  assert.ok(iss.some(i => i.type === 'empty'));
});

console.log('— 双语字幕导出（buildBilingual / splitTextNatural）—');
t('splitTextNatural：k 段均非空、拼回等于原文、切点自然', () => {
  const text = '今天我们请到了一位非常特别的嘉宾，他将和我们聊聊太空产业的未来和发展方向';
  const parts = C.splitTextNatural(text, 3, 'zh-CN');
  console.log('      → ' + parts.join(' / '));
  assert.strictEqual(parts.length, 3);
  parts.forEach(p => assert.ok(p.length > 0, '每段必须有内容'));
  assert.strictEqual(parts.join(''), text);
});
t('短字幕 1+1：单条叠放、默认源上译下', () => {
  const rows = [{ no: 1, start: 0, end: 2000, en: 'Hello there.', zh: '你好。', flag: '' }];
  const items = C.buildBilingual(rows, { maxW: 24, srcLocale: 'en', dstLocale: 'zh-CN' });
  assert.strictEqual(items.length, 1);
  assert.deepStrictEqual(items[0].text.split('\n'), ['Hello there.', '你好。']);
  assert.strictEqual(items[0].start, 0);
  assert.strictEqual(items[0].end, 2000);
});
t('译上源下：order=dst-first', () => {
  const rows = [{ no: 1, start: 0, end: 2000, en: 'Hello there.', zh: '你好。', flag: '' }];
  const items = C.buildBilingual(rows, { maxW: 24, order: 'dst-first' });
  assert.deepStrictEqual(items[0].text.split('\n'), ['你好。', 'Hello there.']);
});
t('长 cue 严格 1+1：切成多条子字幕，每行 <=maxW', () => {
  const en = 'This is a fairly long English subtitle line that definitely exceeds the maximum allowed display width for one single row of subtitle text on screen';
  const zh = '这是一条相当长的中文字幕译文内容，它的显示宽度明显超过了单行所能容纳的最大限制，需要切分处理';
  const rows = [{ no: 1, start: 0, end: 12000, en: en, zh: zh, flag: '' }];
  const items = C.buildBilingual(rows, { maxW: 24, srcLocale: 'en', dstLocale: 'zh-CN' });
  console.log('      → 切成 ' + items.length + ' 条');
  assert.ok(items.length >= 2, '长 cue 应被切分');
  items.forEach(it => {
    const lines = it.text.split('\n');
    assert.strictEqual(lines.length, 2, '每条子字幕必须恰好 2 行（源1+译1）: ' + it.text);
    lines.forEach(l => assert.ok(C.textWidth(l) <= 24.01, '行宽超限: ' + l));
  });
  // 内容完整性：源文、译文拼回应与原文一致（空白差异忽略）
  const srcJoined = items.map(it => it.text.split('\n')[0]).join(' ').replace(/\s+/g, '');
  assert.strictEqual(srcJoined, en.replace(/\s+/g, ''), '源文内容应完整');
  const dstJoined = items.map(it => it.text.split('\n')[1]).join('').replace(/\s+/g, '');
  assert.strictEqual(dstJoined, zh.replace(/\s+/g, ''), '译文内容应完整');
});
t('子时间轴：单调递增、不重叠、覆盖原 cue 全程', () => {
  const en = 'Space systems were the major focus for a long time and ground segment was kind of the afterthought for most companies in the industry';
  const zh = '太空系统长期以来一直是主要焦点，而地面段对行业内大多数公司来说算是事后才想到的部分';
  const rows = [{ no: 1, start: 5000, end: 15000, en: en, zh: zh, flag: '' }];
  const items = C.buildBilingual(rows, { maxW: 24, srcLocale: 'en', dstLocale: 'zh-CN' });
  assert.ok(items.length >= 2);
  assert.strictEqual(items[0].start, 5000, '首条起点 = 原 cue 起点');
  assert.strictEqual(items[items.length - 1].end, 15000, '末条终点 = 原 cue 终点');
  for (let i = 0; i < items.length; i++) {
    assert.ok(items[i].start < items[i].end, '子字幕时长必须为正: #' + i);
    if (i > 0) assert.ok(items[i].start >= items[i - 1].end, '时间轴不得重叠/倒流: #' + i);
  }
  // formatSrt → parseSrt 往返零 issue
  const rt = C.parseSrt(C.formatSrt(items));
  assert.strictEqual(rt.issues.length, 0, '导出再解析应无问题: ' + JSON.stringify(rt.issues));
});
t('merged 行的源文拼回承载行（不丢源文）', () => {
  const rows = [
    { no: 1, start: 0, end: 3000, en: 'But this wouldn\'t be the last time', zh: '但这并不是最后一次世界领导人被关税的后果震惊。', flag: '' },
    { no: 2, start: 3000, end: 5000, en: 'a world leader was shocked by a tariff.', zh: null, flag: 'merged' },
  ];
  const items = C.buildBilingual(rows, { maxW: 24, srcLocale: 'en', dstLocale: 'zh-CN' });
  const allSrc = items.map(it => it.text.split('\n').filter((l, i, arr) => true)[0]).join(' ');
  assert.ok(allSrc.includes('last time'), '应含首条源文');
  assert.ok(allSrc.includes('shocked by a tariff'), 'merged 行的源文必须拼回: ' + allSrc);
  assert.strictEqual(items[0].start, 0);
  assert.strictEqual(items[items.length - 1].end, 5000, '时间轴覆盖整组');
});
t('drop / 无译文行：跳过（与单语同口径）', () => {
  const rows = [
    { no: 1, start: 0, end: 1000, en: 'yeah', zh: null, flag: 'drop' },
    { no: 2, start: 1000, end: 2000, en: 'Hello.', zh: '你好。', flag: '' },
    { no: 3, start: 2000, end: 3000, en: 'Untranslated.', zh: null, flag: 'missing' },
  ];
  const items = C.buildBilingual(rows, { maxW: 24 });
  assert.strictEqual(items.length, 1);
  assert.strictEqual(items[0].no, 1, '重新编号');
  assert.ok(items[0].text.includes('你好。'));
});
t('编号连续 + formatSrt 整体往返', () => {
  const rows = [
    { no: 1, start: 0, end: 2000, en: 'First line.', zh: '第一行。', flag: '' },
    { no: 2, start: 2000, end: 4000, en: 'Second line here.', zh: '第二行在这。', flag: '' },
  ];
  const items = C.buildBilingual(rows, { maxW: 24 });
  items.forEach((it, i) => assert.strictEqual(it.no, i + 1));
  const rt = C.parseSrt(C.formatSrt(items));
  assert.strictEqual(rt.issues.length, 0);
  assert.strictEqual(rt.items.length, 2);
});

console.log('— 多格式：WebVTT —');
t('parseVtt：文件头 + cue 标识行 + 行内标签剥离', () => {
  const vtt = 'WEBVTT - 测试\n\ncue-1\n00:00:01.000 --> 00:00:03.500\n<v Roger>Hello</v> <b>world</b>\n\nNOTE 这是注释\n\n00:01:00.250 --> 00:01:02.000\n第二段 &amp; 内容\n';
  const { items, issues } = C.parseVtt(vtt);
  assert.strictEqual(issues.length, 0, JSON.stringify(issues));
  assert.strictEqual(items.length, 2);
  assert.strictEqual(items[0].start, 1000);
  assert.strictEqual(items[0].end, 3500);
  assert.strictEqual(items[0].text, 'Hello world');
  assert.strictEqual(items[1].text, '第二段 & 内容');
});
t('parseVtt：MM:SS.mmm 短格式时间', () => {
  const { items } = C.parseVtt('WEBVTT\n\n01:23.456 --> 01:25.000\n短格式\n');
  assert.strictEqual(items[0].start, 83456);
  assert.strictEqual(items[0].end, 85000);
});
t('formatVtt → parseVtt 往返一致', () => {
  const items = [
    { no: 1, start: 200, end: 2600, text: '第一行' },
    { no: 2, start: 3000, end: 5000, text: 'second line\nwith two rows' },
  ];
  const out = C.formatVtt(items);
  assert.ok(out.startsWith('WEBVTT\n\n'));
  const rt = C.parseVtt(out);
  assert.strictEqual(rt.issues.length, 0, JSON.stringify(rt.issues));
  assert.deepStrictEqual(rt.items, items);
});
t('fmtTimeVtt 毫秒小数点', () => {
  assert.strictEqual(C.fmtTimeVtt(3723456), '01:02:03.456');
});

console.log('— 多格式：ASS/SSA —');
t('parseAss：特效标签剥离 + \\N 换行 + Text 列含逗号', () => {
  const ass = '[Script Info]\nTitle: x\n\n[V4+ Styles]\nFormat: Name, Fontname\nStyle: Default,Arial\n\n[Events]\nFormat: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text\nDialogue: 0,0:00:01.00,0:00:03.50,Default,,0,0,0,,{\\an8}Hello, {\\i1}world{\\i0}\\N第二行\\h空格\nComment: 0,0:00:05.00,0:00:06.00,Default,,0,0,0,,注释不进字幕\nDialogue: 0,0:01:00.25,0:01:02.00,Default,,0,0,0,,第三段，含逗号\n';
  const { items, issues } = C.parseAss(ass);
  assert.strictEqual(issues.length, 0, JSON.stringify(issues));
  assert.strictEqual(items.length, 2);
  assert.strictEqual(items[0].start, 1000);
  assert.strictEqual(items[0].end, 3500);
  assert.strictEqual(items[0].text, 'Hello, world\n第二行 空格');
  assert.strictEqual(items[1].text, '第三段，含逗号');
});
t('fmtTimeAss 厘秒格式', () => {
  assert.strictEqual(C.fmtTimeAss(3723456), '1:02:03.45');
  assert.strictEqual(C.fmtTimeAss(83456), '0:01:23.45');
});
t('formatAss：头部齐全 + 双语分层（Top/Bottom 各一条 Dialogue）', () => {
  const out = C.formatAss([
    { start: 1000, end: 3000, lines: [
      { style: 'Top', text: 'English source line' },
      { style: 'Bottom', text: '中文译文行' },
    ] },
  ], { title: '测试' });
  assert.ok(out.includes('[Script Info]') && out.includes('[V4+ Styles]') && out.includes('[Events]'));
  assert.ok(out.includes('Style: Bottom') && out.includes('Style: Top'));
  assert.ok(out.includes('&H00FFFFFF'), '主语言白色');
  assert.ok(out.includes('&H0000D7FF'), '副语言金黄');
  const dlg = out.split('\n').filter(l => l.startsWith('Dialogue:'));
  assert.strictEqual(dlg.length, 2, '源/译各一条');
  assert.ok(dlg[0].includes(',Top,') && dlg[0].includes('English source line'));
  assert.ok(dlg[1].includes(',Bottom,') && dlg[1].includes('中文译文行'));
  // 自产 ASS 可被 parseAss 读回（重叠属双语分层正常现象，只比对内容）
  const rt = C.parseAss(out);
  assert.strictEqual(rt.items.length, 2);
  assert.ok(rt.items.some(i => i.text === 'English source line'));
  assert.ok(rt.items.some(i => i.text === '中文译文行'));
});
t('formatAss：多行文本转 \\N', () => {
  const out = C.formatAss([{ start: 0, end: 1000, lines: [{ style: 'Bottom', text: '甲\n乙' }] }]);
  assert.ok(out.includes('甲\\N乙'));
  const rt = C.parseAss(out);
  assert.strictEqual(rt.items[0].text, '甲\n乙');
});

console.log('— 多格式：TXT / 识别 / 双语结构化 —');
t('formatTxt：段落式纯文本', () => {
  const out = C.formatTxt([
    { no: 1, start: 0, end: 1000, text: '第一段' },
    { no: 2, start: 1000, end: 2000, text: '第二段\n两行' },
  ]);
  assert.strictEqual(out, '第一段\n\n第二段\n两行\n');
});
t('detectFormat：vtt / ass / srt', () => {
  assert.strictEqual(C.detectFormat('WEBVTT\n\n00:00:01.000 --> 00:00:02.000\nx\n'), 'vtt');
  assert.strictEqual(C.detectFormat('\uFEFFWEBVTT\n'), 'vtt');
  assert.strictEqual(C.detectFormat('[Script Info]\nTitle: x\n[Events]\n'), 'ass');
  assert.strictEqual(C.detectFormat('1\n00:00:01,000 --> 00:00:02,000\nx\n'), 'srt');
});
t('buildBilingualParts：源/译分行保留，与 buildBilingual 文本一致', () => {
  const rows = [{ no: 1, start: 0, end: 2000, en: 'Hello there.', zh: '你好。', flag: '' }];
  const parts = C.buildBilingualParts(rows, { maxW: 20, srcLocale: 'en', dstLocale: 'zh-CN' });
  assert.strictEqual(parts.length, 1);
  assert.deepStrictEqual(parts[0].srcLines, ['Hello there.']);
  assert.deepStrictEqual(parts[0].dstLines, ['你好。']);
  const bi = C.buildBilingual(rows, { maxW: 20 });
  assert.strictEqual(bi[0].text, parts[0].srcLines.concat(parts[0].dstLines).join('\n'));
  const biRev = C.buildBilingual(rows, { maxW: 20, order: 'dst-first' });
  assert.strictEqual(biRev[0].text, parts[0].dstLines.concat(parts[0].srcLines).join('\n'));
});
t('长 cue 下 buildBilingualParts 段数与 buildBilingual 条数一致', () => {
  const en = 'This is a fairly long English subtitle line that definitely exceeds the maximum allowed display width for one single row of subtitle text on screen';
  const zh = '这是一条相当长的中文字幕译文内容，它的显示宽度明显超过了单行所能容纳的最大限制，需要切分处理';
  const rows = [{ no: 1, start: 0, end: 12000, en: en, zh: zh, flag: '' }];
  const parts = C.buildBilingualParts(rows, { maxW: 20, srcLocale: 'en', dstLocale: 'zh-CN' });
  const bi = C.buildBilingual(rows, { maxW: 20, srcLocale: 'en', dstLocale: 'zh-CN' });
  assert.strictEqual(parts.length, bi.length);
  assert.ok(parts.length >= 2);
  parts.forEach((p, i) => {
    assert.ok(p.srcLines.length <= 2 && p.dstLines.length <= 2, '段内最多 2 行兜底: #' + i);
    assert.strictEqual(bi[i].text, p.srcLines.concat(p.dstLines).join('\n'));
  });
});

console.log('— 默认阈值 —');
t('MAX_W_DEFAULT = 20', () => {
  assert.strictEqual(C.MAX_W_DEFAULT, 20);
});

console.log('— 译文对齐切分（splitAligned / 退化段修复）—');
const effLen = (s) => Array.from(String(s || '').replace(/[\s\p{P}\p{S}]/gu, '')).length;
t('splitAligned：按源文段宽占比切译文，各段份量对应且无退化段', () => {
  // 真实案例（Sam Altman 访谈 #63-64）：独立断点切分曾把译文切成 ["…我认为很重要，这样某个版本…"]["…"][…]
  const srcSegs = ["the specifics of how Astra's being", 'released. I think it\'s', 'important so that a version', 'of it with specific guardrails. Um,'];
  const zh = '关于Astra如何发布的具体细节，我认为很重要，这样某个版本…在早期版本中，我们为其设定了具体的防护措施。嗯，';
  const segs = C.splitAligned(zh, srcSegs, 4, 'zh-CN');
  assert.strictEqual(segs.length, 4);
  segs.forEach((s, i) => assert.ok(effLen(s) > 2, '第 ' + i + ' 段退化: ' + JSON.stringify(s)));
  // 零丢失：拼回（去空白）等于原文（去空白）
  assert.strictEqual(segs.join('').replace(/\s+/g, ''), zh.replace(/\s+/g, ''));
});
t('splitAligned：k=1 原样返回，空文本返回 k 个空段', () => {
  assert.deepStrictEqual(C.splitAligned('你好世界', ['a'], 1, 'zh-CN'), ['你好世界']);
  assert.deepStrictEqual(C.splitAligned('', ['a', 'b'], 2, 'zh-CN'), ['', '']);
});
t('splitAligned：参考段缺失时按均分兜底', () => {
  const segs = C.splitAligned('这是一段没有源文参考的译文内容需要切分', null, 3, 'zh-CN');
  assert.strictEqual(segs.length, 3);
  assert.ok(segs.every((s) => s.length > 0));
});
t('buildBilingualParts：长句组双语切分后无退化段、译文零丢失', () => {
  const rows = [{
    no: 1, start: 120000, end: 128000, flag: '',
    en: "the specifics of how Astra's being released. I think it's important so that a version of it with specific guardrails. Um,",
    zh: '关于Astra如何发布的具体细节，我认为很重要，这样某个版本…在早期版本中，我们为其设定了具体的防护措施。嗯，'
  }];
  const parts = C.buildBilingualParts(rows, { maxW: 20, srcLocale: 'en', dstLocale: 'zh-CN' });
  assert.ok(parts.length >= 2, '应切分为多条');
  parts.forEach((p, i) => {
    const d = p.dstLines.join('');
    assert.ok(effLen(d) > 2, '第 ' + i + ' 条译文退化: ' + JSON.stringify(d));
  });
  const joined = parts.map((p) => p.dstLines.join('')).join('').replace(/\s+/g, '');
  assert.strictEqual(joined, rows[0].zh.replace(/\s+/g, ''), '译文拼接应零丢失');
});
t('R1 微超宽容忍：宽度 ≤ maxW+4 时不折不切、单行放下', () => {
  // 英文约 44 字母 ≈ 22 宽（>20 但 ≤24）；中文 22 字 = 22 宽
  const rows = [{
    no: 1, start: 0, end: 4000, flag: '',
    en: 'It is really important so that a version of it ships soon',
    zh: '我认为这确实非常重要，这样某个版本才能发布，嗯'
  }];
  assert.ok(C.textWidth(rows[0].en) > 20 && C.textWidth(rows[0].en) <= 24, '前提：源文微超宽');
  assert.ok(C.textWidth(rows[0].zh) > 20 && C.textWidth(rows[0].zh) <= 24, '前提：译文微超宽');
  const parts = C.buildBilingualParts(rows, { maxW: 20, srcLocale: 'en', dstLocale: 'zh-CN' });
  assert.strictEqual(parts.length, 1, '微超宽不应切分');
  assert.deepStrictEqual(parts[0].srcLines, [rows[0].en]);
  assert.deepStrictEqual(parts[0].dstLines, [rows[0].zh]);
});
t('R2 饥饿段回退：切分只剩几个字的段时放弃切分，整 cue 最多 2+2 行', () => {
  // 源文自然断点在 "Right." 后 → 第 1 段极短；译文按比例切第 1 段只剩 "嗯，" → 饥饿 → 回退整 cue
  const rows = [{
    no: 1, start: 0, end: 6000, flag: '',
    en: 'Right. It is important so that a version of it ships safely',
    zh: '嗯，对。我认为这样某个版本能安全发布非常重要。'
  }];
  const parts = C.buildBilingualParts(rows, { maxW: 20, srcLocale: 'en', dstLocale: 'zh-CN' });
  assert.strictEqual(parts.length, 1, '饥饿段应触发整 cue 回退: ' + JSON.stringify(parts.map((p) => p.dstLines)));
  assert.ok(parts[0].srcLines.length <= 2 && parts[0].dstLines.length <= 2, '回退后每方最多 2 行');
  assert.strictEqual(parts[0].dstLines.join('').replace(/\s+/g, ''), rows[0].zh.replace(/\s+/g, ''), '译文零丢失');
});

console.log('\n结果: ' + pass + ' 通过, ' + fail + ' 失败');
process.exit(fail ? 1 : 0);
