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

console.log('— 语言锚定校验 anchorOk —');
t('anchorOk：中文目标拒绝假名/谚文', () => {
  assert.strictEqual(C.anchorOk('这是一个中文字幕。', 'zh-CN'), true);
  assert.strictEqual(C.anchorOk('OpenAI 发布了新产品', 'zh-CN'), true);   // 专名保留原文合法
  assert.strictEqual(C.anchorOk('これは日本語です', 'zh-CN'), false);     // 日文混入
  assert.strictEqual(C.anchorOk('한국어 번역', 'zh-TW'), false);          // 韩文混入
});
t('anchorOk：日文目标拒绝中文/谚文，放行正常日文与纯专名', () => {
  assert.strictEqual(C.anchorOk('これは日本語の字幕です。', 'ja'), true);
  assert.strictEqual(C.anchorOk('アストラ', 'ja'), true);                  // 全片假名外来语合法
  assert.strictEqual(C.anchorOk('OpenAI', 'ja'), true);                    // 纯拉丁专名合法
  assert.strictEqual(C.anchorOk('日本語の漢字とかな', 'ja'), true);        // 汉字+假名 = 正常日文
  assert.strictEqual(C.anchorOk('这是中文字幕', 'ja'), false);             // 有汉字无假名 = 中文
  assert.strictEqual(C.anchorOk('我打算花大量时间提醒那些人', 'ja'), false);
  assert.strictEqual(C.anchorOk('한국어', 'ja'), false);                   // 谚文混入
});
t('anchorOk：韩文目标拒绝汉字/假名', () => {
  assert.strictEqual(C.anchorOk('이것은 한국어 자막입니다.', 'ko'), true);
  assert.strictEqual(C.anchorOk('OpenAI', 'ko'), true);
  assert.strictEqual(C.anchorOk('这是中文', 'ko'), false);
  assert.strictEqual(C.anchorOk('これは日本語です', 'ko'), false);
});
t('anchorOk：拉丁/西里尔等目标拒绝 CJK', () => {
  assert.strictEqual(C.anchorOk('Esto es un subtítulo en español.', 'es'), true);
  assert.strictEqual(C.anchorOk("C'est un sous-titre français.", 'fr'), true);
  assert.strictEqual(C.anchorOk('Это русский перевод.', 'ru'), true);
  assert.strictEqual(C.anchorOk('这是一个中文字幕', 'es'), false);
  assert.strictEqual(C.anchorOk('これは日本語です', 'fr'), false);
  assert.strictEqual(C.anchorOk('한국어', 'de'), false);
});
t('anchorOk：空文本与未知语言放行', () => {
  assert.strictEqual(C.anchorOk('', 'ja'), true);
  assert.strictEqual(C.anchorOk('   ', 'ko'), true);
});

console.log('— 单 cue 行数上限 splitCues（v0.9.13）—');
t('splitCues：时长均衡时不介入，结果与 splitByDuration 一致', () => {
  const times=[{start:0,end:2000},{start:2000,end:4000}];
  const text='这是一条测试字幕内容长度适中的句子';
  assert.deepStrictEqual(C.splitCues(text,times,{maxW:20,locale:'zh-CN'}), C.splitByDuration(text,times,{locale:'zh-CN'}));
});
t('splitCues：时长严重不均时退回宽度均分，每片折行 ≤2 行且零丢失', () => {
  const times=[{start:0,end:9500},{start:9500,end:10000}];   // 95/5 时长占比
  const text='这是一条非常长的测试字幕句子当句组内时长严重不均时长分片会让长的那条字幕分到超过两行的量需要兜底机制退回按宽度均分';
  assert.strictEqual(C.textWidth(text) > 40, true, '前提：总宽超过单 cue 2 行容量');
  const raw=C.splitByDuration(text,times,{locale:'zh-CN'});
  assert.ok(C.wrapToWidth(raw[0],20,{normalize:true,locale:'zh-CN'}).length>2, '前提：复现时长分片 3 行 bug');
  const ps=C.splitCues(text,times,{maxW:20,locale:'zh-CN'});
  ps.forEach(p=>assert.ok(C.wrapToWidth(p,20,{normalize:true,locale:'zh-CN'}).length<=2,'每片折行 ≤2 行'));
  assert.strictEqual(ps.join(''), text, '零丢失');
});
t('splitCues：译文总宽超出容量时等宽分片仍最优（≤3 行兜底）', () => {
  const times=[{start:0,end:3000},{start:3000,end:6000}];
  const text='容量不足的极端情况译文总宽度远超两条字幕四行的显示容量此时按宽度均分仍然是最小化最大行数的最优解每条三行兜底并且在数字与单位整体出现的场景下比如百分之三十和一千也不允许被拆散';
  const ps=C.splitCues(text,times,{maxW:20,locale:'zh-CN'});
  assert.strictEqual(C.textWidth(text) > 80, true, '前提：总宽超 2 cue × 2 行容量');
  ps.forEach(p=>assert.ok(C.wrapToWidth(p,20,{normalize:true,locale:'zh-CN'}).length<=3,'每片 ≤3 行兜底'));
  assert.strictEqual(ps.join(''), text, '零丢失');
});
t('splitCues：单 cue 句组直接透传不切分', () => {
  const times=[{start:0,end:2000}];
  const text='单条字幕的句子不参与切分';
  assert.deepStrictEqual(C.splitCues(text,times,{maxW:20,locale:'zh-CN'}), [text]);
});
t('wrapToWidth：24 宽中文文本不断在标点出孤儿行（v0.9.14）', () => {
  // 线上 Nvidia #48：24 宽文本断在「，」（优先级 4）会导致首行只剩 2 字+剩余 22 宽强制再折一次
  const text='嗯，我们会为这款模型提供不同级别的网络访问权限，';
  const lines=C.wrapToWidth(text,20,{normalize:true,locale:'zh-CN'});
  assert.strictEqual(lines.length, 2, '24 宽文本 maxW=20 必须折成 2 行而非 3 行');
  lines.forEach(l=>assert.ok(C.textWidth(l)<=20,'每行宽度 ≤ maxW'));
  assert.strictEqual(lines.join(''), text, '零字符丢失');
});
t('wrapToWidth：回归 - 双标点断点优先级仍生效', () => {
  // 反向用例：剩余 ≤ maxW 时标点优先级仍优先
  const text='你好，世界，明天要下雨了。';
  const lines=C.wrapToWidth(text,10,{normalize:true,locale:'zh-CN'});
  assert.strictEqual(lines.length, 2);
  assert.strictEqual(lines[0], '你好，世界，'); // 标点断点仍胜出
});

console.log('— ASS 底部双行（v0.9.17）—');
t('formatAss：Sub 样式进头部（金黄 50pt 底部对齐）', () => {
  const out = C.formatAss([{ start: 0, end: 1000, lines: [{ style: 'Bottom', text: 'x' }] }]);
  const sub = out.split('\n').find(l => l.startsWith('Style: Sub,'));
  assert.ok(sub, '头部含 Sub 样式');
  assert.ok(sub.includes('&H0000D7FF'), 'Sub 副语言金黄');
  const cols = sub.split(',');
  assert.strictEqual(cols[18], '2', 'Sub 底部居中对齐（Alignment=2）');
  assert.strictEqual(cols[2], '50', 'Sub 50pt（v0.9.35 副字号提号）');
});
t('formatAss：TopMain 样式进头部（白 56pt 顶部对齐，v0.9.35 译文在上主字号）', () => {
  const out = C.formatAss([{ start: 0, end: 1000, lines: [{ style: 'TopMain', text: 'x' }] }]);
  const tm = out.split('\n').find(l => l.startsWith('Style: TopMain,'));
  assert.ok(tm, '头部含 TopMain 样式');
  assert.ok(tm.includes('&H00FFFFFF'), 'TopMain 主语言白色');
  const cols = tm.split(',');
  assert.strictEqual(cols[18], '8', 'TopMain 顶部居中对齐（Alignment=8）');
  assert.strictEqual(cols[2], '56', 'TopMain 56pt 主字号');
  const top = out.split('\n').find(l => l.startsWith('Style: Top,'));
  assert.strictEqual(top.split(',')[2], '50', 'Top 副字号同步提为 50pt');
  // TopMain Dialogue 正常输出
  assert.ok(out.split('\n').some(l => l.startsWith('Dialogue:') && l.includes(',TopMain,')), 'TopMain Dialogue 写入');
});
t('formatAss：per-line MarginV 写入 Dialogue（Sub 动态抬升）', () => {
  const out = C.formatAss([{ start: 0, end: 2000, lines: [
    { style: 'Sub', text: 'English above', mv: 116 },
    { style: 'Bottom', text: '中文译文\n两行' },
  ] }]);
  const dlg = out.split('\n').filter(l => l.startsWith('Dialogue:'));
  assert.strictEqual(dlg.length, 2);
  // Dialogue 字段：Layer,Start,End,Style,Name,MarginL,MarginR,MarginV,Effect,Text
  const subDlg = dlg.find(l => l.includes(',Sub,'));
  const botDlg = dlg.find(l => l.includes(',Bottom,'));
  assert.ok(subDlg, 'Sub 行存在');
  assert.ok(subDlg.includes(',,0,0,116,,'), 'Sub MarginV=116 写入');
  assert.ok(botDlg.includes(',,0,0,0,,'), '无 mv 时 MarginV=0（用样式默认）');
  assert.ok(botDlg.includes('中文译文\\N两行'));
  // 读回校验
  const rt = C.parseAss(out);
  assert.ok(rt.items.some(i => i.text === 'English above'));
});
t('formatAss：mv 为 0/负值时回退样式默认（防御）', () => {
  const out = C.formatAss([{ start: 0, end: 1000, lines: [
    { style: 'Sub', text: 'zero', mv: 0 },
  ] }]);
  assert.ok(out.includes(',,0,0,0,,'), 'mv=0 不写入覆盖值');
});

// ---------- v0.9.20 findCut 后移补偿 ----------
t('findCut 后移补偿：连字复合词断在词首导致剩余超宽时，后移到词后空格 2 行装下（nl 实例）', () => {
  const t1 = 'de waardering op een koers-winstverhouding van 170 is zeker geen waardeaandeel.';
  const w = C.wrapToWidth(t1, 20, { normalize: true, locale: 'nl' });
  assert.strictEqual(w.length, 2, '34.5 宽 ≤ 40，应 2 行');
  assert.ok(C.textWidth(w[0]) <= 20 && C.textWidth(w[1]) <= 20, '每行 ≤ 20');
  assert.ok(w[0].endsWith('koers-winstverhouding'), '合成词完整保留在第一行');
});
t('findCut 后移补偿：物理超容（总宽 > 2×maxW）时保持多行不死循环', () => {
  const t2 = 'Saya tidak semestinya mahu mengambil kedudukan S1 dan kedudukan hiper-menurun, tetapi kebimbangan';
  const w = C.wrapToWidth(t2, 20, { normalize: true, locale: 'ms' });
  assert.ok(w.length >= 3, '超容文本正常多行');
  w.forEach(l => assert.ok(C.textWidth(l) <= 20, '每行仍 ≤ 20: ' + l));
});
t('findCut 后移补偿：中文（无空格）行为不变', () => {
  const w = C.wrapToWidth('这是一个比较长的中文句子用来验证修复不会影响中文折行行为逻辑', 20, { normalize: true, locale: 'zh-CN' });
  assert.ok(w.length >= 2 && w.every(l => C.textWidth(l) <= 20));
  assert.ok(!/^[”’』】）》。，！？、；：…]/.test(w[1] || ''), '行首无禁则符号');
});

// ---------- v0.9.24 findCut 句末软偏好 ----------
t('句末软偏好：三短句聚首行，让步从句整段下行（用户截图场景）', () => {
  // 旧行为：切在「不过|如果」（prio 3 连接词切点更近）→「…但我不是。不过 / 如果我要排队」
  // 新行为：窗口内句末切点（prio 5）优先 →「等一下。给你。但我不是。 / 不过如果我要排队」
  const t1 = '等一下。给你。但我不是。不过如果我要排队';
  for (const maxW of [13, 14, 16, 19]) {
    const w = C.wrapToWidth(t1, maxW, { normalize: true, locale: 'zh-CN' });
    assert.strictEqual(w.length, 2, 'maxW=' + maxW + ' 总宽 20 应 2 行');
    assert.strictEqual(w[0], '等一下。给你。但我不是。', 'maxW=' + maxW + ' 首行折在句末');
    assert.strictEqual(w[1], '不过如果我要排队', 'maxW=' + maxW + ' 让步从句整段下行');
  }
});
t('句末软偏好：句末切点恰在窗口边界（c-10）也生效', () => {
  // 「…举起手来！」距硬切位置恰好 10 字，闭区间纳入
  const w = C.wrapToWidth('不要动放下武器举起手来！警察马上就到了别做傻事', 22, { normalize: true, locale: 'zh-CN' });
  assert.strictEqual(w[0], '不要动放下武器举起手来！');
  assert.strictEqual(w[1], '警察马上就到了别做傻事');
});
t('句末软偏好守卫：句末过早（首行 < maxW/2）不升级，维持最近合法切点', () => {
  // 「好的。」在 maxW=10 时首行仅 3 宽 < 5，不采纳句末切点
  const w = C.wrapToWidth('好的。我们走吧大家快点跟上啊', 10, { normalize: true, locale: 'zh-CN' });
  assert.strictEqual(w.length, 2);
  assert.ok(C.textWidth(w[0]) >= 5, '首行不因句末偏好而过短: ' + w[0]);
});
t('句末软偏好守卫：句末切点导致剩余超宽（折第 3 行）时跳过', () => {
  // 「真的吗。」后剩 17 宽 > 14，句末切点无效，退回正常折行
  const t1 = '真的吗。好的没问题我这就过去帮你处理一下下';
  const w = C.wrapToWidth(t1, 14, { normalize: true, locale: 'zh-CN' });
  assert.strictEqual(w.length, 2, '2 行装下不折第 3 行');
  w.forEach(l => assert.ok(C.textWidth(l) <= 14, '每行 ≤ 14'));
});
t('句末软偏好守卫：拉丁 "!" 后跟空格不切在 ! 与空格之间', () => {
  // ASCII "!" 属 SENT_END，但切在 "!|" 会把空格留到行首 —— 空格守卫交还给空格切点
  const t1 = 'Stop! Do not move or I will shoot you right now immediately';
  const w = C.wrapToWidth(t1, 20, { normalize: true, locale: 'en' });
  assert.ok(w.length >= 2);
  w.forEach(l => assert.ok(!l.startsWith(' '), '行首不得为空格: [' + l + ']'));
});
t('句末软偏好：无句末标点文本行为不变', () => {
  const t1 = '这是一段没有任何句末标点的长文本需要折行处理一下';
  const w = C.wrapToWidth(t1, 14, { normalize: true, locale: 'zh-CN' });
  assert.ok(w.length >= 2 && w.every(l => C.textWidth(l) <= 14));
  assert.strictEqual(w[0], '这是一段没有任何句末标点的长');
});

// ---------- v0.9.25 双 speaker 对话 ----------
t('isSpeakerText 检测门：双行 dash 命中，单行/混合/空不命中', () => {
  assert.strictEqual(C.isSpeakerText('- aa的对话\n- bb的对话'), true, '双行 dash');
  assert.strictEqual(C.isSpeakerText('- 你要去哪里？\n- 不关你的事。'), true, '带标点双行');
  assert.strictEqual(C.isSpeakerText('– en dash\n— em dash'), true, 'en/em 破折号');
  assert.strictEqual(C.isSpeakerText('- yeah right'), false, '单行 dash 不进新轨道');
  assert.strictEqual(C.isSpeakerText('- aa的对话\nbb的续行'), false, 'dash+普通行不进');
  assert.strictEqual(C.isSpeakerText('普通文本\n第二行'), false, '无 dash 不进');
  assert.strictEqual(C.isSpeakerText(''), false, '空文本');
  assert.strictEqual(C.isSpeakerText(null), false, 'null 安全');
});
t('groupSentences：双 speaker cue 独立成组、不与相邻 cue 合并', () => {
  const items = [
    { no: 1, start: 0, end: 2000, text: 'And then he said' },
    { no: 2, start: 2000, end: 5000, text: '- Go away\n- Make me' },
    { no: 3, start: 5000, end: 8000, text: 'and walked off' },
  ];
  const groups = C.groupSentences(items, {});
  const sp = groups.filter(g => g.speaker);
  assert.strictEqual(sp.length, 1, '恰好一个 speaker 组');
  assert.strictEqual(sp[0].cues.length, 1, '单 cue 组');
  assert.strictEqual(sp[0].cues[0].no, 2);
  assert.ok(!groups.some(g => g.cues.length > 1 && g.cues.some(c => c.no === 2)), 'dash cue 未混入任何多 cue 组');
});
t('splitCues：双 speaker 单 cue 透传保留行结构（不被 squash）', () => {
  const pieces = C.splitCues('- 走开\n- 你试试', [{ start: 2000, end: 5000 }], { maxW: 20, locale: 'zh-CN' });
  assert.strictEqual(pieces.length, 1);
  assert.strictEqual(pieces[0], '- 走开\n- 你试试');
});
t('buildMonoParts SP：每行独立、行级容忍、绝不跨 speaker 折行', () => {
  // 两行各 5 宽 ≤ 20+4 → 原样双行
  const m1 = C.buildMonoParts([{ no: 1, start: 0, end: 5000, en: 'x', zh: '- 走开\n- 你试试啊', flag: '' }], { maxW: 20, dstLocale: 'zh-CN' });
  assert.strictEqual(m1[0].text, '- 走开\n- 你试试啊', '合规双行原样');
  // 行宽 18.5/17.5，maxW=14：一行超容忍(>18)行内折叠、一行容忍内单行；speaker 边界不跨
  const zh = '- 我们现在到底要去哪里买东西呢朋友你说\n- 你不要总是管这么多行不行啊真的服了';
  const m2 = C.buildMonoParts([{ no: 1, start: 0, end: 5000, en: 'x', zh, flag: '' }], { maxW: 14, dstLocale: 'zh-CN' });
  const lines = m2[0].text.split('\n');
  assert.ok(lines.length >= 2, '至少双行');
  lines.forEach(l => assert.ok(C.textWidth(l) <= 18, '每行 ≤ maxW+4 或折行后 ≤ maxW: [' + l + '] 宽' + C.textWidth(l)));
  assert.ok(lines.some(l => l.trim().startsWith('-')), '保留 dash 前缀');
  // speaker 边界：每行文本守恒（去空白拼接与原文一致）
  const norm = s => String(s).replace(/\s+/g, '');
  assert.strictEqual(norm(m2[0].text), norm(zh), '文本守恒');
});
t('buildBilingualParts SP：src 块 + dst 块各按 dash 行独立，不被 squash 内联', () => {
  const rows = [{ no: 1, start: 0, end: 5000, en: '- Where are you going?\n- None of your business.', zh: '- 你要去哪里？\n- 不关你的事。', flag: '' }];
  const parts = C.buildBilingualParts(rows, { maxW: 20, srcLocale: 'en', dstLocale: 'zh-CN' });
  assert.strictEqual(parts.length, 1, '单条目（不切时间轴）');
  assert.strictEqual(parts[0].srcLines.join('\n'), '- Where are you going?\n- None of your business.', 'src 保留双行');
  assert.strictEqual(parts[0].dstLines.join('\n'), '- 你要去哪里？\n- 不关你的事。', 'dst 保留双行');
});
t('降级：模型无视豁免返回单行 → isSpeakerText 不命中 → 走旧路径不崩', () => {
  const zhDegraded = '- 走开。- 你试试啊。';   // 单行内联（模型把两行并一行）
  const m = C.buildMonoParts([{ no: 1, start: 0, end: 5000, en: '- Go away\n- Make me', zh: zhDegraded, flag: '' }], { maxW: 20, dstLocale: 'zh-CN' });
  assert.ok(m[0].text.includes('- 走开。'), '单行原样导出（不比现状差）');
  const bi = C.buildBilingualParts([{ no: 1, start: 0, end: 5000, en: '- Go away\n- Make me', zh: zhDegraded, flag: '' }], { maxW: 20, srcLocale: 'en', dstLocale: 'zh-CN' });
  assert.ok(bi.length >= 1 && bi[0].dstLines.length >= 1, '双语降级路径正常出条目');
});
t('兼容性：非 dash 多行文本仍走旧路径（squash + R0-R3）', () => {
  // 手工折行的普通译文（非 dash）→ R0 尊重
  const m = C.buildMonoParts([{ no: 1, start: 0, end: 5000, en: 'x', zh: '这是一行\n这是第二行', flag: '' }], { maxW: 20, dstLocale: 'zh-CN' });
  assert.strictEqual(m[0].text, '这是一行\n这是第二行', 'R0 原样（旧路径未受影响）');
  // 普通超宽单行 → R2 折行（旧路径）；宽度 > maxW+4 才触发
  let longZh = '这是一段'; while (C.textWidth(longZh) < 28) longZh += '超宽译文内容';
  const m2 = C.buildMonoParts([{ no: 1, start: 0, end: 5000, en: 'x', zh: longZh, flag: '' }], { maxW: 20, dstLocale: 'zh-CN' });
  assert.ok(m2[0].text.includes('\n'), 'R2 正常折行');
});

// ---------- v0.9.21 混字词表 ----------
t('fixMixedChars：泰文混入的汉字术语被替换为正确泰文', () => {
  assert.strictEqual(C.fixMixedChars('มันลงทุนในโมเดล前沿ด้วย', 'th'), 'มันลงทุนในโมเดลล้ำหน้าด้วย');
  assert.strictEqual(C.fixMixedChars('ไม่ว่าจะเป็นกับห้องปฏิบัติการ前沿', 'th'), 'ไม่ว่าจะเป็นกับห้องปฏิบัติการล้ำหน้า');
});
t('fixMixedChars：非泰文目标语言零影响（词表按语言隔离）', () => {
  // 中文/日文译文里「前沿」是合法词汇，绝不替换
  assert.strictEqual(C.fixMixedChars('我们站在技术的前沿', 'zh-CN'), '我们站在技术的前沿');
  assert.strictEqual(C.fixMixedChars('最前線の技術', 'ja'), '最前線の技術');
  // 无词表的语言原样返回
  assert.strictEqual(C.fixMixedChars('edge of frontier', 'fr'), 'edge of frontier');
  // 空值安全（null/undefined 归一为空串）
  assert.strictEqual(C.fixMixedChars(null, 'th'), '');
  assert.strictEqual(C.fixMixedChars(undefined, 'th'), '');
});

// ---------- v0.9.23 B1 孤儿尾巴收并 ----------
const THIN_CUES = [{ start: 5920, end: 11120 }, { start: 11120, end: 11680 }];   // 5.2s + 0.56s（截图场景）
t('collapseThinTail：截图场景（0.56s 尾 cue + 2 字尾巴）→ 收并', () => {
  const r = C.collapseThinTail(
    ['并巩固了其作为全球最具主导地位的科技公司之一的', '地位。'],
    THIN_CUES, { maxW: 20, locale: 'zh-CN' });
  assert.ok(r.collapsed, '应触发收并');
  assert.strictEqual(r.pieces[0], '并巩固了其作为全球最具主导地位的科技公司之一的地位。', '尾巴无空格拼回前片');
  assert.strictEqual(r.pieces[1], '', '末片清空（调用方转 merged）');
});
t('collapseThinTail：守卫① 尾 cue ≥700ms 不收', () => {
  const cues = [{ start: 0, end: 5000 }, { start: 5000, end: 7000 }];   // 尾 2s
  const r = C.collapseThinTail(['前面一段正常内容', '尾巴'], cues, { maxW: 20, locale: 'zh-CN' });
  assert.ok(!r.collapsed, '长尾 cue 不应收并');
});
t('collapseThinTail：守卫② 多词多字尾巴不收', () => {
  const r = C.collapseThinTail(['some content here', 'the end.'], THIN_CUES, { maxW: 20, locale: 'en' });
  assert.ok(!r.collapsed, '2 词 6 有效字的尾巴有实质内容');
});
t('collapseThinTail：守卫② 拉丁 1 词尾巴（world.）→ 收并补空格', () => {
  const r = C.collapseThinTail(['in the most dominant tech', 'world.'], THIN_CUES, { maxW: 20, locale: 'en' });
  assert.ok(r.collapsed, '1 词尾巴应收并');
  assert.strictEqual(r.pieces[0], 'in the most dominant tech world.', '拉丁拼缝补空格');
});
t('collapseThinTail：守卫③ 前片句末标点（跨句）不收——独立短应答保留', () => {
  for (const prev of ['你觉得呢？', '好的。', 'Done.', '完了！', 'هل أنت بخير؟', 'आप कैसे हैं?']) {
    const r = C.collapseThinTail([prev, '嗯。'], THIN_CUES, { maxW: 20, locale: 'zh-CN' });
    assert.ok(!r.collapsed, '前片已句末（' + prev + '）→ 尾巴是独立新句');
  }
});
t('collapseThinTail：守卫④ 收并后超 2 行容量不收', () => {
  let prev = '';
  while (C.textWidth(prev) < 40) prev += '前';   // 恰 40 宽
  const r = C.collapseThinTail([prev, '好'], THIN_CUES, { maxW: 20, locale: 'zh-CN' });
  assert.ok(!r.collapsed, '40+1 超容量应保持原切分');
  const r2 = C.collapseThinTail([prev.slice(1), '好'], THIN_CUES, { maxW: 20, locale: 'zh-CN' });
  assert.ok(r2.collapsed, '39+1 恰好 2 行应放行');
});
t('collapseThinTail：韩文拼缝补空格（谚文词间空格还原）', () => {
  const r = C.collapseThinTail(['합니다', '다음은'], THIN_CUES, { maxW: 20, locale: 'ko' });
  assert.ok(r.collapsed);
  assert.strictEqual(r.pieces[0], '합니다 다음은', '韩文收并补空格（切分发生在空格处）');
});
t('collapseThinTail：单 cue / 长度不齐 / 空片 防御性不收', () => {
  assert.ok(!C.collapseThinTail(['只有一片'], [{ start: 0, end: 600 }], {}).collapsed, '单 cue 无收并对象');
  assert.ok(!C.collapseThinTail(['前片', '尾巴', '多余'], THIN_CUES, {}).collapsed, 'pieces 与 cues 长度不齐');
  assert.ok(!C.collapseThinTail(['前片', ''], THIN_CUES, {}).collapsed, '空尾巴不触发');
  assert.ok(!C.collapseThinTail(['', '尾巴'], THIN_CUES, {}).collapsed, '空前片不触发');
});

// ---------- v0.9.23 A 单语导出四层规则 ----------
t('buildMonoParts：R0 合规已有折行原样尊重（保留手工折行）', () => {
  const rows = [{ no: 1, start: 0, end: 3000, en: 'x', zh: '并巩固了其\n作为全球主导科技公司之一的', flag: '' }];
  const m = C.buildMonoParts(rows, { maxW: 20, dstLocale: 'zh-CN' });
  assert.strictEqual(m.length, 1);
  assert.strictEqual(m[0].text, '并巩固了其\n作为全球主导科技公司之一的', '折行原样保留');
});
t('buildMonoParts：R1 微超宽（≤maxW+4）单行放下，不折寡行', () => {
  let zh = '';
  while (C.textWidth(zh) < 23) zh += '字';   // 恰 23 宽（>20 且 ≤24）
  assert.ok(C.textWidth(zh) > 20 && C.textWidth(zh) <= 24, '前提：微超宽');
  const m = C.buildMonoParts([{ no: 1, start: 0, end: 3000, en: 'x', zh, flag: '' }], { maxW: 20, dstLocale: 'zh-CN' });
  assert.ok(!m[0].text.includes('\n'), '微超宽单行直放');
});
t('buildMonoParts：R2 超宽单行（回填存的原始未折行文本）重折为 2 行', () => {
  const zh = '并巩固了其作为全球最具主导地位的科技公司之一的地位。';   // 26 宽
  const m = C.buildMonoParts([{ no: 1, start: 5920, end: 11120, en: 'x', zh, flag: '' }], { maxW: 20, dstLocale: 'zh-CN' });
  const lines = m[0].text.split('\n');
  assert.strictEqual(lines.length, 2, '折为 2 行');
  lines.forEach(l => assert.ok(C.textWidth(l) <= 20, '每行 ≤20: ' + l));
});
t('buildMonoParts：R3 超容量（>2 行）切分，子时间轴按宽度占比、每片 ≤2 行', () => {
  let zh = '';
  while (C.textWidth(zh) < 60) zh += '超长内容';   // ~60 宽
  const m = C.buildMonoParts([{ no: 1, start: 0, end: 8000, en: 'x', zh, flag: '' }], { maxW: 20, dstLocale: 'zh-CN' });
  assert.ok(m.length >= 2, '切为多条子 cue');
  let prevEnd = -1;
  m.forEach(it => {
    assert.ok(it.start >= prevEnd, '时间轴单调不重叠');
    prevEnd = it.end;
    it.text.split('\n').forEach(l => assert.ok(C.textWidth(l) <= 20, '每行 ≤20: ' + l));
    assert.ok(it.text.split('\n').length <= 2, '每片 ≤2 行');
  });
  assert.strictEqual(m[0].start, 0);
  assert.strictEqual(m[m.length - 1].end, 8000, '子 cue 瓜分完整时长');
});
t('buildMonoParts：merged 行并入承载行（end 延展）、drop/空译文跳过', () => {
  const rows = [
    { no: 1, start: 5920, end: 11120, en: 'long', zh: '并巩固了其地位', flag: '' },
    { no: 2, start: 11120, end: 11680, en: 'world.', zh: null, flag: 'merged' },
    { no: 3, start: 12000, end: 13000, en: 'drop me', zh: null, flag: 'drop' },
    { no: 4, start: 13000, end: 14000, en: 'empty', zh: '', flag: '' },
    { no: 5, start: 14000, end: 15000, en: 'ok', zh: '正常一条', flag: '' }
  ];
  const m = C.buildMonoParts(rows, { maxW: 20, dstLocale: 'zh-CN' });
  assert.strictEqual(m.length, 2, 'merged/drop/空行均不出条目');
  assert.strictEqual(m[0].end, 11680, 'merged 尾行时间并入承载行');
  assert.strictEqual(m[1].text, '正常一条');
});
t('buildMonoParts：文本守恒（所有译文零丢失）', () => {
  const rows = [
    { no: 1, start: 0, end: 2000, en: 'a', zh: '第一句完整译文', flag: '' },
    { no: 2, start: 2000, end: 2600, en: 'b', zh: '尾巴', flag: '' },
    { no: 3, start: 3000, end: 6000, en: 'c', zh: '这是较长的一段译文需要折行处理一下才可以', flag: '' }
  ];
  const m = C.buildMonoParts(rows, { maxW: 20, dstLocale: 'zh-CN' });
  const joined = m.map(it => it.text.replace(/\n/g, '')).join('');
  assert.ok(joined.includes('第一句完整译文尾巴'), '前两条文本齐备');
  assert.ok(joined.includes('这是较长的一段译文需要折行处理一下才可以'), '第三条文本齐备');
});

console.log('— 音乐符号行（v0.9.37）—');
t('musicLost：译文只剩 ♪ 符号而源有歌词 → 判丢词', () => {
  assert.strictEqual(C.musicLost('♪♪', '♪ Love is in the air ♪'), true);
  assert.strictEqual(C.musicLost('♪ ♪', '♪ Love is in the air ♪'), true);
  assert.strictEqual(C.musicLost('♪ 爱在空中飘荡 ♪', '♪ Love is in the air ♪'), false);
  assert.strictEqual(C.musicLost('♪', '♪'), false);           // 纯音乐行（源本无歌词）不算丢词
  assert.strictEqual(C.musicLost('♪', '♪♪'), false);          // 源纯符号，译文纯符号，正常
  assert.strictEqual(C.musicLost('♪ 사랑이 공중에 ♪', '♪ Love is in the air ♪'), false); // 韩文歌词
});
t('normalizeMusic：折叠紧邻重复符号（♪♪ → ♪）', () => {
  assert.strictEqual(C.normalizeMusic('♪♪ 爱在空中飘荡 ♪♪', '♪ Love is in the air ♪'), '♪ 爱在空中飘荡 ♪');
  assert.strictEqual(C.normalizeMusic('♪ ♪ 爱在空中 ♪ ♪', '♪ Love is in the air ♪'), '♪ 爱在空中 ♪');
});
t('normalizeMusic：源首尾有符号而译文丢失 → 补回', () => {
  assert.strictEqual(C.normalizeMusic('爱在空中飘荡', '♪ Love is in the air ♪'), '♪ 爱在空中飘荡 ♪');
  assert.strictEqual(C.normalizeMusic('♪ 爱在空中飘荡', '♪ Love is in the air ♪'), '♪ 爱在空中飘荡 ♪'); // 尾符补回
  assert.strictEqual(C.normalizeMusic('爱在空中飘荡 ♪', '♪ Love is in the air ♪'), '♪ 爱在空中飘荡 ♪');   // 首符补回
});
t('normalizeMusic：源无符号的普通行 → 零影响', () => {
  assert.strictEqual(C.normalizeMusic('普通译文一句', 'An ordinary line.'), '普通译文一句');
  assert.strictEqual(C.normalizeMusic('♪ 纯音乐行 ♪', '♪'), '♪ 纯音乐行 ♪'); // 源单符号，译文首尾已齐 → 不动
});
t('normalizeMusic：行中间单个符号不碰', () => {
  assert.strictEqual(C.normalizeMusic('一句 ♪ 中间有符号的歌词', 'A line ♪ with mid symbol'), '一句 ♪ 中间有符号的歌词');
});
t('normalizeMusic：无歌词纯符号行（源 ♪♪ 译文 ♪♪）→ 折叠为 ♪', () => {
  assert.strictEqual(C.normalizeMusic('♪♪', '♪♪'), '♪');
});

console.log('— 音乐行句组边界 + speaker 换行修复（v0.9.38）—');
t('groupSentences：歌词行不吸对白（♪ 结尾无句末标点）', () => {
  const items = [
    { no: 1, start: 0, end: 2600, text: "♪ But it's something\nthat I must believe in ♪" },
    { no: 2, start: 2600, end: 4100, text: 'Yo, yo. What do we got?' },
    { no: 3, start: 4100, end: 6100, text: "♪ And it's there\nwhen I look in your eyes ♪" }
  ];
  const gs = C.groupSentences(items);
  const g1 = gs.find(g => g.cues.some(c => c.no === 1)), g2 = gs.find(g => g.cues.some(c => c.no === 2));
  assert.notStrictEqual(g1, g2, '歌词行与对白行必须分属不同句组');
});
t('groupSentences：连续歌词行可同组（保留歌曲上下文）', () => {
  const items = [
    { no: 1, start: 0, end: 2000, text: '♪ first half of the verse ♪' },
    { no: 2, start: 2000, end: 4000, text: '♪ second half of the verse ♪' }
  ];
  const gs = C.groupSentences(items);
  const g1 = gs.find(g => g.cues.some(c => c.no === 1)), g2 = gs.find(g => g.cues.some(c => c.no === 2));
  assert.strictEqual(g1, g2, '相邻歌词行应同组');
});
t('groupSentences：纯 ♪ 标记行独立成组', () => {
  const items = [
    { no: 1, start: 0, end: 1000, text: 'Hello there.' },
    { no: 2, start: 1000, end: 2000, text: '♪' },
    { no: 3, start: 2000, end: 3000, text: 'How are you?' }
  ];
  const gs = C.groupSentences(items);
  assert.ok(gs.some(g => g.cues.length === 1 && g.cues[0].no === 2), '纯 ♪ 行应独立成组');
});
t('repairSpeakerLines：模型压掉换行 → 机械补回', () => {
  const src = '- Allie M. Allie M.\n- Yeah, we got one right here.';
  const dst = '- 艾莉·M。艾莉·M。- 对，我们这儿正好有一单。';
  assert.strictEqual(C.repairSpeakerLines(dst, src), '- 艾莉·M。艾莉·M。\n- 对，我们这儿正好有一单。');
});
t('repairSpeakerLines：模型丢首 dash 但保留中间 dash → 段数对上仍可补', () => {
  const src = '- A.\n- B.';
  assert.strictEqual(C.repairSpeakerLines('甲的台词。- 乙的台词。', src), '- 甲的台词。\n- 乙的台词。');
});
t('repairSpeakerLines：译文无任何 dash → 无从切分，原样返回', () => {
  const src = '- A.\n- B.';
  assert.strictEqual(C.repairSpeakerLines('甲说乙说连成一片', src), '甲说乙说连成一片');
});
t('repairSpeakerLines：dash 段数对不上 → 原样返回', () => {
  const src = '- A.\n- B.';
  assert.strictEqual(C.repairSpeakerLines('一句话没有分隔', src), '一句话没有分隔');
  assert.strictEqual(C.repairSpeakerLines('甲说。乙说。丙也说。', src), '甲说。乙说。丙也说。');
});
t('repairSpeakerLines：已有换行/源非多行 dash → 不动', () => {
  assert.strictEqual(C.repairSpeakerLines('- 甲\n- 乙', '- A.\n- B.'), '- 甲\n- 乙');
  assert.strictEqual(C.repairSpeakerLines('普通译文', '- 单行 dash 源。'), '普通译文');
});

t('mirrorSpeakerLines：cue57 案例——「-♪」无空格也能切回两行（mono 镜像）', () => {
  const src = '- Oh. After you.\n- ♪ Of somebody\'s lack of love ♪';
  const dst = '- 哦，你先请。-♪ 因某人缺乏爱 ♪';
  assert.strictEqual(C.mirrorSpeakerLines(dst, src), '- 哦，你先请。\n- ♪ 因某人缺乏爱 ♪');
});
t('mirrorSpeakerLines：源非 dash 多行 / 段数不符 / 已多行 → 原样返回', () => {
  assert.strictEqual(C.mirrorSpeakerLines('一行译文', '普通多行\n没有dash'), '一行译文');
  assert.strictEqual(C.mirrorSpeakerLines('- 甲。- 乙。- 丙。', '- A.\n- B.'), '- 甲。- 乙。- 丙。');
  assert.strictEqual(C.mirrorSpeakerLines('- 甲。\n- 乙。', '- A.\n- B.'), '- 甲。\n- 乙。');
});
t('mirrorSpeakerLines：「20-30」类连字符不受影响', () => {
  assert.strictEqual(
    C.mirrorSpeakerLines('- 20-30 之间。-♪ 歌词 ♪', '- A.\n- ♪ B ♪'),
    '- 20-30 之间。\n- ♪ 歌词 ♪');
});
t('buildMonoParts：单行译文镜像源 speaker 两行结构（mono 全格式生效）', () => {
  const rows = [{ start: 0, end: 2000, en: '- Oh. After you.\n- ♪ Of somebody\'s lack of love ♪', zh: '- 哦，你先请。-♪ 因某人缺乏爱 ♪' }];
  const out = C.buildMonoParts(rows, { maxW: 20, dstLocale: 'zh-CN' });
  assert.strictEqual(out.length, 1);
  assert.strictEqual(out[0].text, '- 哦，你先请。\n- ♪ 因某人缺乏爱 ♪');
});

t('mirrorSpeakerLines：cue15 案例——「♪-」音符后紧跟 dash 也能切回两行', () => {
  const src = '- ♪ Love is in the air... ♪\n- Oh, oh.';
  const dst = '- ♪ 爱在空中飘荡…… ♪- 哦，哦。';
  assert.strictEqual(C.mirrorSpeakerLines(dst, src), '- ♪ 爱在空中飘荡…… ♪\n- 哦，哦。');
});
t('mirrorSpeakerLines：对白边界 21 语言标点覆盖（半角./印地।/阿语，/韩语.）', () => {
  const src = '- Allie M. Allie M.\n- Yeah, we got one right here.';
  // 半角句点紧贴 dash（拉丁/西里尔/韩语等 18 语言曾切不开）
  assert.strictEqual(
    C.mirrorSpeakerLines('- Allie M. Allie M.- Ouais, on en a un juste ici.', src),
    '- Allie M. Allie M.\n- Ouais, on en a un juste ici.');
  // 韩语：句点后无空格
  assert.strictEqual(
    C.mirrorSpeakerLines('- 앨리 M. 앨리 M.- 그래, 여기 딱 한 명 있어.', src),
    '- 앨리 M. 앨리 M.\n- 그래, 여기 딱 한 명 있어.');
  // 印地语 danda ।
  assert.strictEqual(
    C.mirrorSpeakerLines('- एली एम। एली एम।- हाँ, हमारे पास एक यहीं है।', src),
    '- एली एम। एली एम।\n- हाँ, हमारे पास एक यहीं है।');
  // 阿语逗号 ，（RTL 逻辑序纯字符串切分，无重排）
  assert.strictEqual(
    C.mirrorSpeakerLines('- أوه،- أوه، لدينا واحد هنا.', '- Oh, oh.\n- Yeah, we got one.'),
    '- أوه،\n- أوه، لدينا واحد هنا.');
});
t('mirrorSpeakerLines：半角句点防护——「3.5-8」范围连字符不切开，走真实边界成两行', () => {
  const src = '- A.\n- B.';
  // dash 前是数字（5）不在白名单 → 「3.5-8」整体保留在第一段内，切分走「。- 」真实边界
  assert.strictEqual(C.mirrorSpeakerLines('- 3.5-8 之间。- 乙。', src), '- 3.5-8 之间。\n- 乙。');
  // 连字词产生多余切点 → 段数 3≠2 → 整体不动（宁错放不错改）
  assert.strictEqual(C.mirrorSpeakerLines('- U.S.-style 设计。- 乙。', src), '- U.S.-style 设计。- 乙。');
});

/* ---------------- v0.9.41：阅读速度（CPS）检测 + ASS 歌词斜体 ---------------- */
t('cpsOf：等效宽度/秒（全角=1、半角=0.5；空/零时长返回 0）', () => {
  assert.strictEqual(C.cpsOf('一二三四', 2000), 2);   // 4 宽 / 2s
  assert.strictEqual(C.cpsOf('abcdefgh', 2000), 2);   // 8 半角 = 4 宽 / 2s
  assert.strictEqual(C.cpsOf('', 1000), 0);
  assert.strictEqual(C.cpsOf('abc', 0), 0);
});
t('cpsLimitOf：语言分档 ja 4 / ko 12 / zh 9 / 默认 8（Netflix TTSG）', () => {
  assert.strictEqual(C.cpsLimitOf('ja'), 4);
  assert.strictEqual(C.cpsLimitOf('ko'), 12);
  assert.strictEqual(C.cpsLimitOf('zh-CN'), 9);
  assert.strictEqual(C.cpsLimitOf('zh-TW'), 9);
  assert.strictEqual(C.cpsLimitOf('es'), 8);
});
t('readingSpeedIssues：超速 / 过短 / 纯符号豁免（zh-CN 档 9）', () => {
  const items = [
    { no: 1, start: 0, end: 1000, text: '一二三四五六七八九十' }, // 10 宽/1s = 10 > 9 → 超速
    { no: 2, start: 2000, end: 2500, text: '短' },                // 0.5s < 0.83s → 过短（CPS 2/s 不超）
    { no: 3, start: 3000, end: 5000, text: '♪ 音乐 ♪' },         // 实义词 → 参与但不超速
    { no: 4, start: 4000, end: 6000, text: '♪' },                 // 纯符号 → CPS 豁免
  ];
  const iss = C.readingSpeedIssues(items, 'zh-CN');
  const cps = iss.filter(i => i.type === 'cps'), dur = iss.filter(i => i.type === 'dur');
  assert.strictEqual(cps.length, 1);
  assert.strictEqual(cps[0].at, 1);
  assert.strictEqual(cps[0].args[1], 9);   // i18n 占位：limit
  assert.strictEqual(dur.length, 1);
  assert.strictEqual(dur[0].at, 2);
});
t('readingSpeedIssues：ja 档 4（6 字/秒超速）', () => {
  const iss = C.readingSpeedIssues([{ no: 1, start: 0, end: 1000, text: 'これはテスト' }], 'ja');
  assert.strictEqual(iss.length, 1);
  assert.strictEqual(iss[0].type, 'cps');
  assert.strictEqual(iss[0].args[1], 4);
});
t('readingSpeedIssues：时长 ≤0 不产生 issue（交给 validateItems）', () => {
  assert.strictEqual(C.readingSpeedIssues([{ no: 1, start: 1000, end: 1000, text: 'x' }], 'zh-CN').length, 0);
});
t('formatAss：含 ♪/♫ 的行加内联斜体，普通行不加（v0.9.41）', () => {
  const out = C.formatAss([{ start: 0, end: 1000, lines: [
    { style: 'Bottom', text: '♪ 爱在空中飘荡 ♪' },
    { style: 'Top', text: '普通对白' }
  ] }], { title: 'T' });
  assert.ok(out.includes('{\\i1}♪ 爱在空中飘荡 ♪{\\i0}'), '歌词行应有斜体标记');
  assert.ok(!out.includes('{\\i1}普通对白'), '普通行不应有斜体标记');
});

console.log('\n结果: ' + pass + ' 通过, ' + fail + ' 失败');
process.exit(fail ? 1 : 0);
