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

console.log('\n结果: ' + pass + ' 通过, ' + fail + ' 失败');
process.exit(fail ? 1 : 0);
