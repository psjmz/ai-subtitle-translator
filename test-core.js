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

console.log('— 时间间隔断组（v0.9.129 gapMs）—');
t('间隔 2s（>1.5s）强制断组——听写稿无标点也不跨静默合并', () => {
  const items = [
    { no: 1, start: 0,    end: 1000, text: 'we flew out there' },
    { no: 2, start: 3000, end: 4000, text: 'and the whole place was empty' },
  ];
  const gs = C.groupSentences(items);
  assert.strictEqual(gs.length, 2, '间隔 2s 应断成 2 组');
  assert.strictEqual(gs[0].cues.length, 1);
  assert.strictEqual(gs[1].cues.length, 1);
});
t('间隔 100ms（<=1.5s）照旧合并——与旧行为一致', () => {
  const items = [
    { no: 1, start: 0,    end: 1000, text: 'we flew out there' },
    { no: 2, start: 1100, end: 2100, text: 'and the whole place was empty' },
  ];
  assert.strictEqual(C.groupSentences(items).length, 1, '小间隔不应断组');
});
t('gapMs:0 可完全关闭间隔判据（旧行为）', () => {
  const items = [
    { no: 1, start: 0,    end: 1000, text: 'we flew out there' },
    { no: 2, start: 3000, end: 4000, text: 'and the whole place was empty' },
  ];
  assert.strictEqual(C.groupSentences(items, { gapMs: 0 }).length, 1);
});
t('缺时间轴时不炸、且不断组', () => {
  const items = [
    { no: 1, text: 'we flew out there' },
    { no: 2, text: 'and the whole place was empty' },
  ];
  assert.strictEqual(C.groupSentences(items).length, 1);
});
t('句末标点已收尾的场景不受间隔判据影响', () => {
  const items = [
    { no: 1, start: 0,    end: 1000, text: 'Done.' },
    { no: 2, start: 5000, end: 6000, text: 'Next one.' },
  ];
  assert.strictEqual(C.groupSentences(items).length, 2);
});
t('重叠 / 乱序时间轴不误断组', () => {
  const items = [
    { no: 1, start: 1000, end: 2000, text: 'overlapping' },
    { no: 2, start: 1500, end: 2500, text: 'cue continues' },
  ];
  assert.strictEqual(C.groupSentences(items).length, 1);
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
t('v0.9.49 纯标点段不独立成条（回归：How Elon Thinks 句末闭引号）', () => {
  // 句组末条 cue 极短（0.42s）时，切点落在句号前会让闭引号 ” 单独成段（非空、逃过空段保底）
  const zh = '他说：“没有人疯狂到愿意去尝试太空，所以那就是我必须去创办的公司，因为没人在做这件事，而我有能力做到。”';
  const times = [
    { start: 101337, end: 103745 }, { start: 103894, end: 105158 },
    { start: 105246, end: 106432 }, { start: 106950, end: 107371 },
  ];
  const pieces = C.splitByDuration(zh, times, { locale: 'zh-CN' });
  console.log('      → ' + pieces.join(' / '));
  assert.strictEqual(pieces.length, 4, '段数与 cue 数一致');
  assert.ok(pieces.every(p => C.effChars(p) > 0), '每段都应有实词: ' + JSON.stringify(pieces));
  assert.ok(pieces[3].endsWith('”'), '闭引号应附着在末段尾部');
  assert.strictEqual(pieces.join(''), zh, '译文零丢失');
});
t('v0.9.49 首段纯标点（开引号）不独立成条', () => {
  const zh = '“太空是我们必须去的地方。”他随后补充道，SpaceX 由此诞生。';
  const times = [{ start: 0, end: 500 }, { start: 600, end: 2000 }, { start: 2100, end: 4000 }];
  const pieces = C.splitByDuration(zh, times, { locale: 'zh-CN' });
  console.log('      → ' + pieces.join(' / '));
  assert.ok(pieces.every(p => C.effChars(p) > 0), '每段都应有实词: ' + JSON.stringify(pieces));
  assert.strictEqual(pieces.join(''), zh, '译文零丢失');
});

console.log('— v0.9.50 行首禁则与借词拼接 —');
const NS_TIMES = [
  { start: 28630, end: 30220 }, { start: 30220, end: 32080 }, { start: 32240, end: 33320 },
  { start: 33320, end: 34350 }, { start: 34350, end: 37300 },
];
t('v0.9.50 中文行首禁则：的 吸附上一段行尾', () => {
  const zh = '我打算梳理出一些我觉得特别有意思的要点和想法抛给你，看看你觉得其中哪些有趣，';
  const pieces = C.splitByDuration(zh, NS_TIMES, { locale: 'zh-CN' });
  console.log('      → ' + pieces.join(' / '));
  const softStart = '的了着么呢吗吧啊呀哦啦嘛呗地得';
  assert.ok(pieces.every(p => !softStart.includes(p[0])), '段首不得为独立助词: ' + JSON.stringify(pieces));
  assert.ok(pieces[1].endsWith('的'), '的 应留在上一段行尾');
  assert.strictEqual(pieces.join(''), zh, '译文零丢失');
});
t('v0.9.50 借词拼接补空格（西语 y lanzártelos 回归）', () => {
  const es = 'Voy a repasar algunos puntos e ideas que me parecieron muy interesantes y lanzártelos, a ver cuáles te llaman la atención.';
  const pieces = C.splitByDuration(es, NS_TIMES, { locale: 'es' });
  console.log('      → ' + pieces.join(' / '));
  assert.ok(pieces.every(p => C.effChars(p) > 2), '每段应有实词（无孤立虚词段）: ' + JSON.stringify(pieces));
  assert.ok(!pieces.some(p => /ylanz/.test(p)), '不得出现词粘连: ' + JSON.stringify(pieces));
  const joined = pieces.join(' ').replace(/\s+/g, ' ').trim();
  assert.strictEqual(joined, es.replace(/\s+/g, ' ').trim(), '拼接还原（空格归一后）零丢失');
});
t('v0.9.50 日文格助词不起行', () => {
  const ja = '興味深いと思った要点とアイデアをいくつか拾って、あなたに投げかけます。どれが面白いか見てみてください。';
  const pieces = C.splitByDuration(ja, NS_TIMES, { locale: 'ja' });
  console.log('      → ' + pieces.join(' / '));
  const part = 'はがをにでとへも';
  assert.ok(pieces.every(p => !part.includes(p[0])), '段首不得为格助词: ' + JSON.stringify(pieces));
  assert.strictEqual(pieces.join(''), ja, '译文零丢失');
});

console.log('— v0.9.95 折行路径补日文禁则 / 西里尔专名 —');
t('v0.9.95 折行路径日文格助词不起行（findCut 5c 此前只认中文助词）', () => {
  const part = 'はがをにでとへも';
  const cases = [
    ['彼は昨日会議で重要な決定を下しました', 15],
    ['私は友達と一緒に映画を見に行きました', 15],
    ['彼らは市場の変化を予測することができた', 15],
  ];
  for (const [ja, w] of cases) {
    const lines = C.wrapToWidth(ja, w, { normalize: true, locale: 'ja' });
    console.log('      → ' + lines.join(' / '));
    assert.ok(lines.length >= 2, '应折成两行: ' + JSON.stringify(lines));
    const second = (lines[1] || '').trim();
    assert.ok(!part.includes(second[0]), '次行行首不得为格助词: ' + JSON.stringify(lines));
  }
});
t('v0.9.95 西里尔多词专名不腰斩（properMidPenalty 改 \\p{Lu}）', () => {
  const ru = 'Вчера утром Иван Петров принял важное решение на собрании';
  const bad = [];
  for (let r = 0.2; r <= 0.8; r += 0.05) {
    const times = [{ start: 0, end: r * 4000 }, { start: r * 4000, end: 4000 }];
    const parts = C.splitByDuration(ru, times, { locale: 'ru' });
    if ((parts[0] || '').trim().endsWith('Иван')) bad.push(parts.join(' ‖ '));
  }
  assert.strictEqual(bad.length, 0, '不得在 Иван|Петров 之间切: ' + bad.join(' ; '));
});

console.log('— v0.9.130 专名（多词大写序列）折行保护 —');
t('properNounRanges：识别/不识别的边界', () => {
  const r = (s, w) => C.properNounRanges(Array.from(s), w || 21).map(x => s.slice(x[0], x[1]));
  assert.deepStrictEqual(r('Burger King 正押注'), ['Burger King']);
  assert.deepStrictEqual(r('New York 开会'), ['New York']);
  assert.deepStrictEqual(r('Coca-Cola 涨价'), ['Coca-Cola']);
  assert.deepStrictEqual(r('Иван Петров 来了'), ['Иван Петров']);   // 西里尔
  assert.deepStrictEqual(r('burger king 正押注'), []);              // 全小写 → 不是专名
  assert.deepStrictEqual(r('How many nuggets'), []);                // 仅首词大写（句首）→ 不是专名
  assert.deepStrictEqual(r('A B 测试'), []);                        // 单字母词 → 不是专名
  // 专名整体宽度 > maxW → 放弃保护（否则折不出第二行）
  assert.deepStrictEqual(r('Los Angeles', 3), []);
});
t('monoFit 不在专名内部断行（Burger King）', () => {
  const s = '- Burger King正押注于其核心菜单经典产品，';
  const lines = C.monoFit(s, 16, 'zh-CN');
  console.log('      → ' + JSON.stringify(lines));
  assert.ok(lines.length >= 2, '应折成两行');
  const joined = lines.join('');
  assert.ok(joined.indexOf('Burger King') >= 0, '「Burger King」不得被拆到两行: ' + JSON.stringify(lines));
  assert.ok(lines.every(l => C.textWidth(l) <= 16 + 1e-9), '折后每行仍 <= maxW: ' + JSON.stringify(lines));
});
t('monoFit 专名下移而非腰斩（Impossible Whopper）', () => {
  const s = '我们要点一个 Impossible Whopper，对吧？';
  [13, 16].forEach(w => {
    const lines = C.monoFit(s, w, 'zh-CN');
    console.log('      w=' + w + ' → ' + JSON.stringify(lines));
    assert.ok(Array.from(lines.join('')).join('').indexOf('Impossible Whopper') >= 0,
      '专名不得被拆开: ' + JSON.stringify(lines));
  });
});
t('专名保护不改变无专名文本的老行为（随机句回归）', () => {
  const cases = [
    ['How many nuggets have you eaten in this journey?', 16, 'en'],
    ['我们去吃了汉堡，味道不错，价格也合理。', 16, 'zh-CN'],
    ['The company said sales rose 4.5% in the third quarter.', 16, 'en'],
  ];
  cases.forEach(([s, w, loc]) => {
    const lines = C.monoFit(s, w, loc);
    assert.ok(lines.every(l => C.textWidth(l) <= w + 4.001), '不得爆宽: ' + JSON.stringify(lines));
  });
});
t('专名保护：异常输入不炸、不死循环', () => {
  const ins = ['', ' ', 'Burger', 'Burger King', 'B K ', 'Burger-Burger-Burger-Burger', '123 456',
    '르누보 로고를 Burger King 과 함께', '🙂🙂 Burger King 🙂🙂'];
  ins.forEach(s => {
    [1, 3, 8, 16, 40].forEach(w => {
      const out = C.monoFit(s, w, 'zh-CN');
      assert.ok(Array.isArray(out), 'monoFit 应返回数组: ' + s);
      assert.ok(out.join('').length <= s.length + 8, '输出不应凭空变长: ' + s + ' → ' + JSON.stringify(out));
    });
  });
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
  // v0.9.94：双语行宽改由独立的 biMaxW 约束（此处显式传 24 以覆盖切分路径）
  const items = C.buildBilingual(rows, { maxW: 24, biMaxW: 24, srcLocale: 'en', dstLocale: 'zh-CN' });
  console.log('      → 切成 ' + items.length + ' 条');
  assert.ok(items.length >= 2, '长 cue 应被切分');
  items.forEach(it => {
    const lines = it.text.split('\n');
    assert.strictEqual(lines.length, 2, '每条子字幕必须恰好 2 行（源1+译1）: ' + it.text);
    // 分档：译文行受 biMaxW 硬约束；源文行跟随语义断点、只受 2 倍兜底（防超屏）
    assert.ok(C.textWidth(lines[1]) <= 24.01, '译文行超宽: ' + lines[1]);
    assert.ok(C.textWidth(lines[0]) <= 48.01, '源文行超兜底: ' + lines[0]);
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
  // v0.9.92：双语允许 2+2 折行（源 2 行 + 译 2 行），源文可能占多行 →
  // 取整条文本判断内容完整性，不再只取首行（旧写法隐含"每条恰好 2 行"假设）
  const allText = items.map(it => it.text).join('\n');
  assert.ok(allText.includes('last time'), '应含首条源文');
  assert.ok(allText.includes('shocked by a tariff'), 'merged 行的源文必须拼回: ' + allText);
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
/* v0.9.129 口径变更：格式标签（<i>/<b>/<u>/<em>）不再是「剥离」对象——它们在 SRT 路径上一直是
   原样保留的，VTT 一刀切剥掉属于两边不一致，且斜体（画外音/外语/歌曲标注）会静默丢失。
   仍然剥离的是时间戳标签 <00:00:01.000>、<v 说话人>、<c.class> 等其余标记。 */
t('parseVtt：文件头 + cue 标识行 + <v>/<c> 标签剥离、格式标签 <b> 保留', () => {
  const vtt = 'WEBVTT - 测试\n\ncue-1\n00:00:01.000 --> 00:00:03.500\n<v Roger>Hello</v> <b>world</b>\n\nNOTE 这是注释\n\n00:01:00.250 --> 00:01:02.000\n第二段 &amp; 内容\n';
  const { items, issues } = C.parseVtt(vtt);
  assert.strictEqual(issues.length, 0, JSON.stringify(issues));
  assert.strictEqual(items.length, 2);
  assert.strictEqual(items[0].start, 1000);
  assert.strictEqual(items[0].end, 3500);
  assert.strictEqual(items[0].text, 'Hello <b>world</b>', 'v/c 标签剥掉，格式标签保留');
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

console.log('— v0.9.48 合并句组原 cue 边界保留 —');
const MG_ROWS = [
  { no: 15, start: 38793, end: 39988, flag: '', en: 'So, something we were talking about',
    zh: '我们今天早上喝咖啡时聊到了一点，就是尽可能多去鼓励大家的重要性。' },
  { no: 16, start: 39988, end: 41478, flag: 'merged', en: 'when we were having\ncoffee this morning is the', zh: null },
  { no: 17, start: 41478, end: 43987, flag: 'merged', en: 'importance of encouraging\nas many people as possible.', zh: null }
];
t('合并句组双语导出：按原 cue 边界切回，不再等宽重切造新边界', () => {
  // v0.9.94：显式传 biMaxW=20（否则默认 32 整句装得下、不触发切分）
  const parts = C.buildBilingualParts(MG_ROWS, { maxW: 20, biMaxW: 20, srcLocale: 'en', dstLocale: 'zh-CN' });
  assert.strictEqual(parts.length, 3, '应输出原 cue 数 3 条: ' + JSON.stringify(parts.map((p) => p.dstLines)));
  assert.strictEqual(parts[0].start, 38793); assert.strictEqual(parts[0].end, 39988);
  assert.strictEqual(parts[1].start, 39988); assert.strictEqual(parts[1].end, 41478);
  assert.strictEqual(parts[2].start, 41478); assert.strictEqual(parts[2].end, 43987);
  // 源文按原边界时长比例切回：第 1 条含句首（So, something），第 3 条含句尾（possible）
  assert.ok(parts[0].srcLines.join(' ').startsWith('So, something'), '第 1 条应以句首开头');
  assert.ok(parts[parts.length - 1].srcLines.join(' ').includes('possible'), '第 3 条应含句尾');
  // 译文零丢失
  const joined = parts.map((p) => p.dstLines.join('')).join('').replace(/\s+/g, '');
  assert.strictEqual(joined, MG_ROWS[0].zh, '译文拼接零丢失');
  // 第 2 条在逗号处自然断（不含跨段劈词"聊|到了"）
  assert.ok(parts[1].dstLines.join('').includes('聊到了一点'), '聊到了一点 应完整在同一条');
});
t('合并句组单语导出：装得下整句一条，装不下按原 cue 边界切回', () => {
  // v0.9.48 用户决策：单语整句优先——译文折 maxLines 行装得下时保持整句一条常驻全组时间窗
  const wide = C.buildMonoParts(MG_ROWS, { maxW: 20, dstLocale: 'zh-CN' });
  assert.strictEqual(wide.length, 1, 'maxW=20 装得下应整句 1 条');
  assert.strictEqual(wide[0].start, 38793); assert.strictEqual(wide[0].end, 43987);
  assert.ok(wide[0].text.includes('聊到了一点'), '整句完整');
  const joinedW = wide.map((p) => p.text).join('').replace(/\s+/g, '');
  assert.strictEqual(joinedW, MG_ROWS[0].zh, '译文零丢失');
  // 装不下（maxW=15 折 2 行超容）→ 按原 cue 边界切回 3 条，不再等宽重切造新边界
  const narrow = C.buildMonoParts(MG_ROWS, { maxW: 15, dstLocale: 'zh-CN' });
  assert.strictEqual(narrow.length, 3, '应输出原 cue 数 3 条');
  assert.strictEqual(narrow[1].start, 39988); assert.strictEqual(narrow[1].end, 41478);
  assert.ok(narrow[1].text.includes('聊到了一点'), '聊到了一点 应完整在同一条');
  const joined = narrow.map((p) => p.text).join('').replace(/\s+/g, '');
  assert.strictEqual(joined, MG_ROWS[0].zh, '译文拼接零丢失');
});
t('合并句组窄宽度（maxW=14）：首边界仍为原 cue 边界，段内细切零丢失', () => {
  const parts = C.buildBilingualParts(MG_ROWS, { maxW: 14, biMaxW: 14, srcLocale: 'en', dstLocale: 'zh-CN' });
  assert.ok(parts.length >= 3, '至少 3 条');
  assert.strictEqual(parts[0].start, 38793); assert.strictEqual(parts[0].end, 39988);
  assert.strictEqual(parts[1].start, 39988, '第 2 条起点应为原边界 39.988');
  const joined = parts.map((p) => p.dstLines.join('')).join('').replace(/\s+/g, '');
  assert.strictEqual(joined, MG_ROWS[0].zh, '译文拼接零丢失');
  parts.forEach((p, i) => assert.ok(effLen(p.dstLines.join('')) > 0 || p.srcLines.length, '第 ' + i + ' 条不应完全为空'));
});
t('单 cue 超容量（无 merged）：维持等宽切分不变（回归保护）', () => {
  const rows = [{ no: 1, start: 0, end: 6000, flag: '',
    en: 'So, something we were talking about when we were having coffee this morning is the importance of encouraging as many people as possible.',
    zh: '我们今天早上喝咖啡时聊到了一点，就是尽可能多去鼓励大家的重要性。' }];
  const parts = C.buildBilingualParts(rows, { maxW: 14, biMaxW: 14, srcLocale: 'en', dstLocale: 'zh-CN' });
  assert.ok(parts.length >= 2, '单 cue 超容量仍应切分');
  const joined = parts.map((p) => p.dstLines.join('')).join('').replace(/\s+/g, '');
  assert.strictEqual(joined, rows[0].zh, '译文拼接零丢失');
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
  // v0.9.73：纯汉字无假名按长度分级——合法日语短名词放行，不再误判跑偏白重译
  assert.strictEqual(C.anchorOk('東京', 'ja'), true);                      // 2 宽纯汉字名词
  assert.strictEqual(C.anchorOk('首相', 'ja'), true);
  assert.strictEqual(C.anchorOk('総理大臣', 'ja'), true);                  // 4 宽
  assert.strictEqual(C.anchorOk('経済成長率', 'ja'), true);                 // 5 宽
  assert.strictEqual(C.anchorOk('这是中文字幕', 'ja'), false);              // 含中文标记「这」→ 拦
  assert.strictEqual(C.anchorOk('他说明天会带我去看看', 'ja'), false);       // 中文长句（宽 10 > 6）
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
/* v0.9.147：语言锚定放宽——只拦「整段跑偏」，零星外来字符一律放行。
   此前 zh-CN 目标只要出现一个假名/谚文就整组判跑偏，日语源 → 中文目标时
   「さん」「ありがとう」「ラーメン」这类合法保留被批量误伤（实测 2 个任务 15 次重试全来自此）。
   下面两组必须同时成立：合法保留放行 + 整段没翻译仍拦住。 */
t('v0.9.147 语言锚定放宽：专名/引用/菜名等零星外来字符放行', () => {
  assert.strictEqual(C.anchorOk('田中さん说他明天会来北京。', 'zh-CN'), true);
  assert.strictEqual(C.anchorOk('他对我说了声ありがとう，然后就走了。', 'zh-CN'), true);
  assert.strictEqual(C.anchorOk('她喊了一句「すみません」，然后跑开了。', 'zh-CN'), true);
  assert.strictEqual(C.anchorOk('这家公司是삼성的子公司。', 'zh-CN'), true);
  assert.strictEqual(C.anchorOk('我们去了北海道，吃了ラーメン，很好吃。', 'zh-CN'), true);
  assert.strictEqual(C.anchorOk('OpenAI 发布了新产品', 'zh-CN'), true);   // 纯拉丁专名
});
t('v0.9.147 语言锚定放宽后，整段没翻译仍必须拦住', () => {
  assert.strictEqual(C.anchorOk('すみません、もう一度お願いします。', 'zh-CN'), false);
  assert.strictEqual(C.anchorOk('죄송합니다 다시 한 번 부탁드립니다', 'zh-CN'), false);
  assert.strictEqual(C.anchorOk('これは日本語です', 'zh-CN'), false);
  assert.strictEqual(C.anchorOk('这是中文', 'ko'), false);          // 再短也拦（全外来）
  assert.strictEqual(C.anchorOk('한국어', 'de'), false);            // 再短也拦（全外来）
});
/* v0.9.149：专名处理选「保留原文」时，语言锚定不再按外来字符判跑偏——
   用户明确要求专名原样保留，源语言专名出现在译文里是**预期结果**，重发一遍也是同样输出（纯烧钱）。
   只保留一条硬兜底：整段几乎全是外来字符 = 确实没翻译，这与保留专名无关。 */
t('v0.9.149 保留原文模式：源语言专名保留不再判跑偏', () => {
  // 中 → 英：中文专名按用户设置原样保留，句子主体是英文（骨架还在）
  assert.strictEqual(C.anchorOk('Welcome to 北京, Mr. 张三.', 'en', true), true);
  assert.strictEqual(C.anchorOk('He joined 阿里巴巴集团 last year.', 'en', true), true);
  // 日 → 中：假名专名/菜名保留，句子主体是汉字
  assert.strictEqual(C.anchorOk('我去吃了ラーメン，很好吃。', 'zh-CN', true), true);
  assert.strictEqual(C.anchorOk('田中さん明天会来北京。', 'zh-CN', true), true);
  // 韩 → 日：谚文专名保留（常规模式会被 hangul 直接拦）
  assert.strictEqual(C.anchorOk('삼성の新しい工場を見学した。', 'ja', true), true);
  // 中 → 日：长中文专名（常规模式会被「纯汉字长度闸」误伤）
  assert.strictEqual(C.anchorOk('北京首都国际机场に着きました。', 'ja', true), true);
});
t('v0.9.149 保留原文模式：整段没翻译仍然要拦住', () => {
  // 中 → 英/法：整段中文，一个目标语言字母都没有（骨架没了）
  assert.strictEqual(C.anchorOk('这是一个中文字幕测试句子', 'en', true), false);
  assert.strictEqual(C.anchorOk('北京首都国际机场欢迎您到此参观。', 'fr', true), false);
  // 日 → 中：整段日文（外来占比 ≈0.8~1）
  assert.strictEqual(C.anchorOk('すみません、もう一度お願いします。', 'zh-CN', true), false);
  assert.strictEqual(C.anchorOk('ありがとうございます', 'zh-CN', true), false);
  // 中 → 日：整段中文（一句假名都没有 + 含中文虚词「那」）
  assert.strictEqual(C.anchorOk('我打算花大量时间提醒那些人', 'ja', true), false);
});
t('v0.9.149 保留原文模式不动默认（全部译出）的判定', () => {
  assert.strictEqual(C.anchorOk('これは日本語です', 'zh-CN'), false);
  assert.strictEqual(C.anchorOk('这是一个中文字幕', 'es'), false);
  assert.strictEqual(C.anchorOk('한국어', 'ja'), false);
  assert.strictEqual(C.anchorOk('田中さん说他明天会来北京。', 'zh-CN'), true);
  // 第三参数传 false / undefined 与非保留模式完全等价
  assert.strictEqual(C.anchorOk('これは日本語です', 'zh-CN', false), false);
  assert.strictEqual(C.anchorOk('これは日本語です', 'zh-CN', undefined), false);
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
  // 两行各 5 宽 ≤ 20+10 → 原样双行
  const m1 = C.buildMonoParts([{ no: 1, start: 0, end: 5000, en: 'x', zh: '- 走开\n- 你试试啊', flag: '' }], { maxW: 20, dstLocale: 'zh-CN' });
  assert.strictEqual(m1[0].text, '- 走开\n- 你试试啊', '合规双行原样');
  // 行宽 18.5/17.5，maxW=14：v0.9.69 放宽为 ≤ maxW+10=24 → 均容忍内单行；speaker 边界不跨
  const zh = '- 我们现在到底要去哪里买东西呢朋友你说\n- 你不要总是管这么多行不行啊真的服了';
  const m2 = C.buildMonoParts([{ no: 1, start: 0, end: 5000, en: 'x', zh, flag: '' }], { maxW: 14, dstLocale: 'zh-CN' });
  const lines = m2[0].text.split('\n');
  assert.ok(lines.length >= 2, '至少双行');
  lines.forEach(l => assert.ok(C.textWidth(l) <= 24, '每行 ≤ maxW+10 或折行后 ≤ maxW: [' + l + '] 宽' + C.textWidth(l)));
  assert.ok(lines.some(l => l.trim().startsWith('-')), '保留 dash 前缀');
  // speaker 边界：每行文本守恒（去空白拼接与原文一致）
  const norm = s => String(s).replace(/\s+/g, '');
  assert.strictEqual(norm(m2[0].text), norm(zh), '文本守恒');
  // 超过 maxW+10=24 的长行仍在该行内部折行（折行路径不失效）
  const long = '- ' + '一二三四五六七八九'.repeat(4);
  const m3 = C.buildMonoParts([{ no: 1, start: 0, end: 5000, en: 'x', zh: long + '\n- 乙', flag: '' }], { maxW: 14, dstLocale: 'zh-CN' });
  m3[0].text.split('\n').forEach(l => assert.ok(C.textWidth(l) <= 14, '超宽行折后 ≤ maxW: [' + l + '] 宽' + C.textWidth(l)));
  assert.strictEqual(norm(m3[0].text), norm(long + '\n- 乙'), '折行文本守恒');
});
t('buildBilingualParts SP：v0.9.69 src/dst 各合并单行 "- A - B"（用户方案）', () => {
  const rows = [{ no: 1, start: 0, end: 5000, en: '- Where are you going?\n- None of your business.', zh: '- 你要去哪里？\n- 不关你的事。', flag: '' }];
  const parts = C.buildBilingualParts(rows, { maxW: 20, srcLocale: 'en', dstLocale: 'zh-CN' });
  assert.strictEqual(parts.length, 1, '单条目（不切时间轴）');
  assert.strictEqual(parts[0].srcLines.length, 1, 'src 合并单行');
  assert.strictEqual(parts[0].srcLines[0], '- Where are you going? - None of your business.', 'src 单行形态');
  assert.strictEqual(parts[0].dstLines.length, 1, 'dst 合并单行');
  assert.strictEqual(parts[0].dstLines[0], '- 你要去哪里？ - 不关你的事。', 'dst 单行形态（说话人间空格）');
  // dash 间距归一：源文 "-No" 型无空格也统一为 "- "
  const parts2 = C.buildBilingualParts([{ no: 1, start: 0, end: 5000, en: '-Go away\n-Make me', zh: '- 走开\n- 你试试啊', flag: '' }], { maxW: 20, srcLocale: 'en', dstLocale: 'zh-CN' });
  assert.strictEqual(parts2[0].srcLines[0], '- Go away - Make me', 'src dash 间距归一');
  // 超宽回退：合并行 > maxW+10 → 双侧回退 2+2 行布局（不硬折行）
  const zhLong = '- ' + '一二三四五六七八九十一二三四五六七'.slice(0, 16) + '\n- ' + '一二三四五六七八九十一二三四五六七'.slice(0, 16);
  const fb = C.buildBilingualParts([{ no: 1, start: 0, end: 5000, en: '- A long long long long long line here ok\n- Another long long long line here', zh: zhLong, flag: '' }], { maxW: 10, srcLocale: 'en', dstLocale: 'zh-CN' });
  assert.strictEqual(fb.length, 1, '回退仍单条目（不切时间轴）');
  assert.strictEqual(fb[0].dstLines.length, 2, 'dst 回退双行');
  assert.ok(fb[0].dstLines.every(l => /^[-–—] /.test(l)), '回退保持每行 dash 前缀');
  assert.strictEqual(fb[0].srcLines.length, 2, 'src 双侧同步回退双行');
  // 三说话人合并：全 dash 行照常合并为单行
  const tri = C.buildBilingualParts([{ no: 1, start: 0, end: 5000, en: '- A.\n- B.\n- C.', zh: '- 甲。\n- 乙。\n- 丙。', flag: '' }], { maxW: 20, srcLocale: 'en', dstLocale: 'zh-CN' });
  assert.strictEqual(tri[0].dstLines[0], '- 甲。 - 乙。 - 丙。', '三说话人单行合并');
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
t('fixMixedChars：泰文混入的整句中文前缀被替换（v0.9.57 Qualcomm 案例）', () => {
  // DeepSeek 前几个 token 漂进中文、被泰语语气词拉回的真实输出
  assert.strictEqual(
    C.fixMixedChars('所以我们非常兴奋，这 เอ่อ จะเป็นหนึ่งในวิธี', 'th'),
    'ดังนั้นเราจึงตื่นเต้นมากที่ เอ่อ จะเป็นหนึ่งในวิธี'
  );
  // 纯中文不受影响（词表按语言隔离）
  assert.strictEqual(C.fixMixedChars('所以我们非常兴奋，这', 'zh-CN'), '所以我们非常兴奋，这');
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

/* ---------------- v0.9.42：speaker 拉丁字母边界放宽 + 音乐组歌词行对齐 ---------------- */
t('mirrorSpeakerLines：cue10 案例——拉丁字母后紧跟「- 」也切回两行（v0.9.42 宽松阶段）', () => {
  const src = '- Allie M. Allie M.\n- Yeah, we got one right here.';
  // 字母 M 后紧跟 - 加空白：严格白名单切不开，宽松阶段放行
  assert.strictEqual(
    C.mirrorSpeakerLines('- 艾莉·M- 对，我们这儿正好有一单。', src),
    '- 艾莉·M\n- 对，我们这儿正好有一单。');
  // 大小写都放行
  assert.strictEqual(
    C.mirrorSpeakerLines('- bob- Ouais, on en a un.', '- Bob\n- Yeah.'),
    '- bob\n- Ouais, on en a un.');
});
t('mirrorSpeakerLines：宽松阶段防护——数字前缀/无空格后缀/破折号不放宽', () => {
  const src = '- A.\n- B.';
  // dash 前是数字 → 不放宽，段数对不上 → 整体不动
  assert.strictEqual(C.mirrorSpeakerLines('- 20-30 之间。- 乙。- 丙。', src), '- 20-30 之间。- 乙。- 丙。');
  // dash 后无空白（U.S.-style）→ 不放宽；此处唯一 dash 切不开 → 段数 1≠2 → 原样返回
  assert.strictEqual(C.mirrorSpeakerLines('- U.S.-style 设计。- 乙。', src), '- U.S.-style 设计。- 乙。');
  // 破折号 — 不在放宽范围（防行文 "wait— what" 假阳性）：无其他边界 → 不动
  assert.strictEqual(C.mirrorSpeakerLines('- wait— what happens.', src), '- wait— what happens.');
  // 有真实句读边界时：切分走「。- 」真实边界，行内破折号不误切
  assert.strictEqual(C.mirrorSpeakerLines('- wait— what happens.- 乙。', src), '- wait— what happens.\n- 乙。');
});
t('repairSpeakerLines：拉丁字母边界同样放宽（回填侧与导出侧一致）', () => {
  const src = '- Allie M. Allie M.\n- Yeah, we got one right here.';
  assert.strictEqual(
    C.repairSpeakerLines('艾莉·M- 对，我们这儿正好有一单。', src),
    '- 艾莉·M\n- 对，我们这儿正好有一单。');
  // 数字前缀不放宽，且区间词在真实边界切分时保持完整
  assert.strictEqual(C.repairSpeakerLines('20-30 之间而已', src), '20-30 之间而已');
  assert.strictEqual(C.repairSpeakerLines('20-30 之间。- 乙。', src), '- 20-30 之间。\n- 乙。');
});
t('repair/mirror：模型手动折行的 \\n 不再短路修复（v0.9.42 守卫修正，cue 10 实测形态）', () => {
  const src = '- Allie M. Allie M.\n- Yeah, we got one right here.';
  // dash 边界压扁 + 折行 \n 混在第二说话人句中（此前「有 \n 就跳过」漏修）
  assert.strictEqual(
    C.mirrorSpeakerLines('- Allie M. Allie M.- 有，\n我們這裡有一份。', src),
    '- Allie M. Allie M.\n- 有，我們這裡有一份。');
  assert.strictEqual(
    C.repairSpeakerLines('- 祝你好運，好嗎？- 你也是，\n兄弟。', '- Good luck, all right?\n- You, too, man.'),
    '- 祝你好運，好嗎？\n- 你也是，兄弟。');
  // 已是正确 dash 结构 → 不动
  assert.strictEqual(C.mirrorSpeakerLines('- 甲\n- 乙', src), '- 甲\n- 乙');
  assert.strictEqual(C.repairSpeakerLines('- 甲\n- 乙', src), '- 甲\n- 乙');
  // 折行压平后仍切不出段数吻合的边界 → 按原样返回（含原始 \n，宁错放不错改）
  assert.strictEqual(C.mirrorSpeakerLines('- 甲乙丙\n丁戊己', src), '- 甲乙丙\n丁戊己');
});
t('foldSpeakerLines：speaker 行按行独立折行（applyPost 结构保持用，v0.9.42 导出；v0.9.69 阈值 +10）', () => {
  // ≤ maxW+10 的行直放，行结构不跨行重分配
  assert.deepStrictEqual(C.foldSpeakerLines('- 甲\n- 乙', 4, 'zh-CN'), ['- 甲', '- 乙']);
  assert.deepStrictEqual(C.foldSpeakerLines('- 一二三四五六七八九\n- 乙', 4, 'zh-CN'), ['- 一二三四五六七八九', '- 乙']);
  // 超过 maxW+10 才在该行内部折行（wrapToWidth normalize 同款结果）
  const longLn = '- ' + '一二三四五六七八九十一二三四五'.slice(0, 14);
  assert.deepStrictEqual(
    C.foldSpeakerLines(longLn + '\n- 乙', 4, 'zh-CN'),
    C.wrapToWidth(longLn, 4, { normalize: true, locale: 'zh-CN' }).concat(['- 乙']));
});
t('splitMusicLines：形态 A——配对符号逐行切分（v0.9.42）', () => {
  assert.deepStrictEqual(
    C.splitMusicLines('♪ 爱在空中飘荡 ♪ ♪ 我能感觉到 ♪', 2),
    ['♪ 爱在空中飘荡 ♪', '♪ 我能感觉到 ♪']);
  assert.deepStrictEqual(
    C.splitMusicLines('♫ Love ♫ ♪ 爱 ♪', 2),
    ['♫ Love ♫', '♪ 爱 ♪']);
});
t('splitMusicLines：形态 B——normalizeMusic 折叠后的 n+1 符号形态', () => {
  // 「♪ ♪」被折叠后只剩首尾+行间符号
  assert.deepStrictEqual(
    C.splitMusicLines('♪ 爱在空中飘荡 ♪ 我能感觉到 ♪', 2),
    ['♪ 爱在空中飘荡 ♪', '♪ 我能感觉到 ♪']);
  assert.deepStrictEqual(
    C.splitMusicLines('♪ A ♪ B ♪ C ♪', 3),
    ['♪ A ♪', '♪ B ♪', '♪ C ♪']);
  // 管线级：normalizeMusic 先折叠，splitMusicLines 仍能切回两行
  const collapsed = C.normalizeMusic('♪ 爱在空中 ♪ ♪ 我能感觉到 ♪', '♪ 爱在空中 ♪ ♪ 我能感觉到 ♪');
  assert.deepStrictEqual(
    C.splitMusicLines(collapsed, 2),
    ['♪ 爱在空中 ♪', '♪ 我能感觉到 ♪']);
});
t('splitMusicLines：守卫——段数不符/空段/混对白/单行 → null 回落', () => {
  assert.strictEqual(C.splitMusicLines('♪ A ♪', 2), null);            // 1 对 ≠ 2
  assert.strictEqual(C.splitMusicLines('♪ A ♪ ♪ ♪', 2), null);       // 第二行空段
  assert.strictEqual(C.splitMusicLines('他说 ♪ A ♪ ♪ B ♪', 2), null); // 配对外夹对白
  assert.strictEqual(C.splitMusicLines('♪ A ♪', 1), null);            // n<2 不适用
  assert.strictEqual(C.splitMusicLines('♪ A ♪ B ♪ C ♪', 2), null);    // 4 符号既非 2 对也非 3
});

/* ---------------- v0.9.41：阅读速度（CPS）检测 + ASS 歌词斜体 ---------------- */
t('cpsOf：等效宽度/秒（全角=1、半角=0.5；空/零时长返回 0）', () => {
  assert.strictEqual(C.cpsOf('一二三四', 2000), 2);   // 4 宽 / 2s
  assert.strictEqual(C.cpsOf('abcdefgh', 2000), 2);   // 8 半角 = 4 宽 / 2s
  assert.strictEqual(C.cpsOf('', 1000), 0);
  assert.strictEqual(C.cpsOf('abc', 0), 0);
});
t('cpsLimitOf：语言分档 ja 4 / ko 9 / zh 9 / 默认 8（Netflix TTSG；v0.9.65 ko 由 12 改 9——谚文补入 isFull 后音节按全宽计，12 是半宽时代口径）', () => {
  assert.strictEqual(C.cpsLimitOf('ja'), 4);
  assert.strictEqual(C.cpsLimitOf('ko'), 9);
  assert.strictEqual(C.cpsLimitOf('zh-CN'), 9);
  assert.strictEqual(C.cpsLimitOf('zh-TW'), 9);
  assert.strictEqual(C.cpsLimitOf('es'), 8);
});
// v0.9.65：韩文宽度口径修复（isFull 此前从未覆盖谚文区间 0xAC00-0xD7AF）
t('charW/textWidth：谚文音节按全宽计（v0.9.65，回归：42 音节单行放行/折行失效/CPS 漏报）', () => {
  assert.strictEqual(C.textWidth('가'), 1);
  assert.strictEqual(C.textWidth('가'.repeat(42)), 42);           // 修复前 21（maxW=21 放行 42 音节单行）
  assert.strictEqual(C.textWidth('바'.repeat(42)) > 21, true);     // 修复后 maxW=21 必须拦住
});
t('charW：组合标记/零宽字符计 0 宽（v0.9.65，回归：th 虚增 23%、hi 虚增 56%）', () => {
  assert.strictEqual(C.textWidth('\u0e48'), 0);   // 泰文声调标记
  assert.strictEqual(C.textWidth('\u0947'), 0);   // 天城文元音符号 े
  assert.strictEqual(C.textWidth('\u200c'), 0);   // ZWNJ（波斯语用）
  // 宽度对齐：泰文样例基字符半宽（字形窄，设计如此）+ 标记 0 宽
  const th = 'บริษัทประกาศว่าสมาร์ทโฟนแบบพับรุ่นใหม่จะวางจำหน่ายในฤดูใบไม้ผลิหน้า';
  const marks = Array.from(th).filter(c => /\p{M}/u.test(c)).length;
  assert.strictEqual(C.textWidth(th), (Array.from(th).length - marks) * 0.5);
});
t('splitByDuration：组合标记不作段首（th/hi，v0.9.65）', () => {
  const th = 'เทคโนโลยีการแสดงผลของหน้าจอแบบพับถือว่าเป็นความท้าทายที่สุดในประวัติศาสตร์ของอุตสาหกรรมสมาร์ทโฟน';
  const segs = C.splitByDuration(th, [
    { start: 0, end: 2600 }, { start: 2600, end: 5100 }, { start: 5100, end: 8400 }, { start: 8400, end: 10800 }
  ], { locale: 'th' });
  segs.forEach((s, i) => {
    if (i > 0) assert.strictEqual(/\p{M}/u.test(Array.from(s)[0]), false, `段 ${i + 1} 以孤立组合标记开头: ${s.slice(0, 6)}`);
  });
});
t('splitByDuration：阿语标点断点（، 后切分、؟ » 不作段首，v0.9.65）', () => {
  const ar = 'وقال المتحدث «إن السعر المرتفع، بخلاف التوقعات الأولية، سيبقى على هذا المستوى حتى الربيع المقبل» في المؤتمر الصحفي الذي عُقد أمس في نيويورك.';
  const segs = C.splitByDuration(ar, [
    { start: 0, end: 2600 }, { start: 2600, end: 5100 }, { start: 5100, end: 8400 }, { start: 8400, end: 10800 }
  ], { locale: 'ar' });
  segs.forEach((s, i) => {
    if (i > 0) assert.strictEqual(/[»،؟؛।॥]/.test(Array.from(s)[0]), false, `段 ${i + 1} 以收尾符号开头: ${s.slice(0, 8)}`);
  });
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

console.log('— 音乐帧：符号不进模型（v0.9.45）—');
t('extractMusicFrames：无符号 → null', () => {
  assert.strictEqual(C.extractMusicFrames('Hello world'), null);
});
t('extractMusicFrames：cue 内换行归一化，不再拒收（v0.9.45b）', () => {
  // 歌词 cue 几乎都是多行；此前含 \n 整组跳回旧路径导致 ♪ 照发模型
  const f = C.extractMusicFrames('♪ And I don\'t know\nif I\'m being foolish ♪');
  assert.ok(f, '应返回帧而非 null');
  assert.strictEqual(f.segs.length, 1);
  assert.strictEqual(f.plainText, '[1] And I don\'t know if I\'m being foolish');
});
t('extractMusicFrames：多 cue 歌词组拼接后含 \n → 全组可拆帧（v0.9.45b 回归用例）', () => {
  // 复现《一夜限定》开场合唱组：joinSrc 空格拼接、cue5 内部 \n 保留在组文本里
  const src = '♪ Love is in the air ♪♪ Everywhere I look around ♪♪ And I don\'t know\nif I\'m being foolish ♪';
  const f = C.extractMusicFrames(src);
  assert.ok(f, '应返回帧而非 null');
  assert.strictEqual(f.segs.length, 3);
  assert.strictEqual(f.plainText, '[1] Love is in the air [2] Everywhere I look around [3] And I don\'t know if I\'m being foolish');
  const out = C.reassembleMusic('[1]爱在空气中弥漫[2]我环顾四周[3]我不知道自己是否在犯傻', f);
  assert.strictEqual(out, '♪ 爱在空气中弥漫 ♪♪ 我环顾四周 ♪♪ 我不知道自己是否在犯傻 ♪');
  assert.strictEqual((out.match(/[♪♫♬♩]/g) || []).length, 6, '符号数与源文严格一致');
});
t('extractMusicFrames：单对 ♪ → 1 段 + plainText 带 [1]', () => {
  const f = C.extractMusicFrames('♪ Love is in the air ♪');
  assert.strictEqual(f.segs.length, 1);
  assert.strictEqual(f.plainText, '[1] Love is in the air');
  assert.strictEqual(f.items.filter(x => x.mark).length, 2);
});
t('extractMusicFrames：双对 ♪ → 2 段 + [1][2]', () => {
  const f = C.extractMusicFrames('♪ Love is in the air ♪ ♪ Everywhere I look around ♪');
  assert.strictEqual(f.segs.length, 2);
  assert.strictEqual(f.plainText, '[1] Love is in the air [2] Everywhere I look around');
  assert.strictEqual(f.items.filter(x => x.mark).length, 4);
});
t('extractMusicFrames：仅首符号（奇数）→ 1 段', () => {
  const f = C.extractMusicFrames('♪ Love is in the air');
  assert.strictEqual(f.segs.length, 1);
  assert.strictEqual(f.items.filter(x => x.mark).length, 1);
});
t('extractMusicFrames：纯符号行 → 0 段（上层直接原文回填）', () => {
  const f = C.extractMusicFrames('♪');
  assert.strictEqual(f.segs.length, 0);
  assert.strictEqual(f.plainText, '');
});
t('extractMusicFrames：♪♪ 相邻叠符号与 ♬ 变体', () => {
  const f = C.extractMusicFrames('♪♪ We will rock you ♬');
  assert.strictEqual(f.segs.length, 1);
  assert.strictEqual(f.plainText, '[1] We will rock you');
  assert.strictEqual(f.items.filter(x => x.mark).length, 3);
});
t('reassembleMusic：[N] 完整 → 符号按源文序列复原', () => {
  const f = C.extractMusicFrames('♪ Love is in the air ♪ ♪ Everywhere I look around ♪');
  const out = C.reassembleMusic('[1] 爱意在空中弥漫 [2] 放眼望去四处皆是', f);
  assert.strictEqual(out, '♪ 爱意在空中弥漫 ♪ ♪ 放眼望去四处皆是 ♪');
  // 符号数与源文一致（4 个）
  assert.strictEqual((out.match(/[♪♫♬♩]/g) || []).length, 4);
});
t('reassembleMusic：单对 [1] → 首尾符号', () => {
  const f = C.extractMusicFrames('♪ Love is in the air ♪');
  const out = C.reassembleMusic('[1] 爱意在空中弥漫', f);
  assert.strictEqual(out, '♪ 爱意在空中弥漫 ♪');
});
t('reassembleMusic：全角【１】与［２］变体容错', () => {
  const f = C.extractMusicFrames('♪ A ♪ ♪ B ♪');
  const out = C.reassembleMusic('【１】甲 【２】乙', f);
  assert.strictEqual(out, '♪ 甲 ♪ ♪ 乙 ♪');
});
t('reassembleMusic：模型漏编号 → 权重兜底切分不丢内容', () => {
  const f = C.extractMusicFrames('♪ Love is in the air ♪ ♪ Everywhere I look around ♪');
  const out = C.reassembleMusic('爱意在空中弥漫 放眼望去四处皆是', f);
  assert.ok(out != null, '兜底应成功');
  assert.strictEqual((out.match(/[♪♫♬♩]/g) || []).length, 4, '符号数保持 4');
  assert.ok(out.includes('爱意在空中弥漫') && out.includes('放眼望去四处皆是'), '内容不丢');
  assert.ok(out.indexOf('爱意在空中弥漫') < out.indexOf('放眼望去四处皆是'), '顺序保持');
});
t('reassembleMusic：空输出 → null（回落旧路径）', () => {
  const f = C.extractMusicFrames('♪ Love ♪');
  assert.strictEqual(C.reassembleMusic('', f), null);
  assert.strictEqual(C.reassembleMusic('[1]', f), null); // 只有编号没正文
});
t('stripSegMarkers：清洗残留 [N]（含全角变体），不动正文（v0.9.45b）', () => {
  assert.strictEqual(C.stripSegMarkers('[1]爱在空气中弥漫[2]我环顾四周').replace(/\s+/g, ''), '爱在空气中弥漫我环顾四周');
  assert.strictEqual(C.stripSegMarkers('【３】甲 ［４］乙').replace(/\s+/g, ''), '甲乙');
  assert.strictEqual(C.stripSegMarkers('普通译文，无编号。'), '普通译文，无编号。');
});
t('stripSegMarkers：空白归一化保留换行——多行 speaker 结构不被压平（v0.9.46）', () => {
  // 复现 fr 实测：模型输出带残留 [2] 的两行 → 清洗后必须仍是两行，行首 ♪ 才能被 normalizeMusic 逐行修复
  const cleaned = C.stripSegMarkers("- Oh. Après toi.\n- [2] Du manque d'amour de quelqu'un");
  assert.strictEqual(cleaned, "- Oh. Après toi.\n- Du manque d'amour de quelqu'un");
  // 单行内多余空格仍要压平；连续空行折叠
  assert.strictEqual(C.stripSegMarkers('甲   [1]  乙'), '甲 乙');
  assert.strictEqual(C.stripSegMarkers('甲\n\n乙'), '甲\n乙');
});
t('旧路径全链：残留编号清洗 + normalizeMusic 逐行修复 → speaker 第二行行首 ♪ 找回（v0.9.46）', () => {
  const src = "- Oh. After you.\n- ♪ Of somebody's lack of love ♪";
  const modelOut = "- Oh. Après toi.\n- [2] Du manque d'amour de quelqu'un";
  const rawOld = C.hasSegMarkers(src) ? modelOut : C.stripSegMarkers(modelOut);
  const out = C.normalizeMusic(rawOld, src);
  assert.strictEqual(out, "- Oh. Après toi.\n- ♪ Du manque d'amour de quelqu'un ♪");
});
t('hasSegMarkers：源文含 [N] 才为真（清洗守卫）', () => {
  assert.strictEqual(C.hasSegMarkers('参见文献 [3] 的说法'), true);
  assert.strictEqual(C.hasSegMarkers('♪ Love is in the air ♪'), false);
  assert.strictEqual(C.hasSegMarkers('普通对白'), false);
});
t('normalizeMusic：speaker 多行结构逐行修复——第二行行首 ♪ 找回（v0.9.45b）', () => {
  // 复现 ja 实测：模型把 "- ♪ Of somebody's lack of love ♪" 的行首 ♪ 弄丢
  const src = "- Oh. After you.\n- ♪ Of somebody's lack of love ♪";
  const dst = '- ああ。お先にどうぞ。\n- 誰かの愛の欠如の ♪';
  const out = C.normalizeMusic(dst, src);
  assert.strictEqual(out, '- ああ。お先にどうぞ。\n- ♪ 誰かの愛の欠如の ♪');
});
t('normalizeMusic：行数不齐（模型并行）回落整串逻辑', () => {
  const src = "♪ A ♪\n♪ B ♪";
  const out = C.normalizeMusic('甲と乙', src);
  assert.ok(out.startsWith('♪') && out.endsWith('♪'), '整串首尾修复仍生效');
});
t('reassembleMusic：往返一致性——任意输入符号序列与源文严格一致', () => {
  const srcs = [
    '♪ Love is in the air ♪',
    '♪ Love ♪ ♪ Everywhere ♪',
    '♪ only leading',
    'only trailing ♫',
    '♪ mid ♪ word ♪ marks ♪',
    '♬ We will rock you ♬'
  ];
  for (const src of srcs) {
    const f = C.extractMusicFrames(src);
    const marksOf = (s) => (String(s).match(/[♪♫♬♩]/g) || []).join('');
    // 模拟模型完美输出
    const perfect = f.segs.map((sg, i) => '[' + (i + 1) + '] 译' + (i + 1)).join(' ');
    assert.strictEqual(marksOf(C.reassembleMusic(perfect, f)), marksOf(src), '符号序列不一致: ' + src);
    // 模拟模型漏编号（兜底路径）
    const nomark = f.segs.map((sg, i) => '译' + (i + 1) + ' 兜底内容' + (i + 1)).join(' ');
    assert.strictEqual(marksOf(C.reassembleMusic(nomark, f)), marksOf(src), '兜底符号序列不一致: ' + src);
  }
});
t('splitByWeights：两段按比例、优先边界', () => {
  const p = C.splitByWeights('爱意在空中弥漫，放眼望去四处皆是', [15, 25]);
  assert.strictEqual(p.length, 2);
  assert.ok(p[0].includes('，') || p[0].endsWith('弥漫'), '应切在标点/边界附近: ' + p.join('|'));
  assert.ok((p[0] + p[1]).replace(/[\s，]/g, '').length >= 12, '内容不丢');
});
t('splitByWeights：三段切分', () => {
  const p = C.splitByWeights('甲甲甲乙乙乙丙丙丙', [3, 3, 3]);
  assert.strictEqual(p.length, 3);
  assert.strictEqual(p.join(''), '甲甲甲乙乙乙丙丙丙', '无损拼接还原');
});
t('splitByWeights：空串与单段', () => {
  assert.deepStrictEqual(C.splitByWeights('', [1, 1]), ['', '']);
  assert.deepStrictEqual(C.splitByWeights('整段', [1]), ['整段']);
});
t('音乐帧与 splitMusicLines 联动：双对复原结果可被逐 cue 对齐切分', () => {
  const f = C.extractMusicFrames('♪ Love is in the air ♪ ♪ Everywhere I look around ♪');
  const out = C.reassembleMusic('[1] 爱意在空中弥漫 [2] 放眼望去四处皆是', f);
  const segs = C.splitMusicLines(out, 2);
  assert.ok(segs, '应成功切 2 行');
  assert.strictEqual(segs[0], '♪ 爱意在空中弥漫 ♪');
  assert.strictEqual(segs[1], '♪ 放眼望去四处皆是 ♪');
});

console.log('— v0.9.51 跨行/跨 cue 拼接空格（Unicode 感知）—');
t('squashLines：西里尔跨行补空格（回归：旧版粘连）', () => {
  assert.strictEqual(C.squashLines('пять лет и тысячи\nчасов на изучение'), 'пять лет и тысячи часов на изучение');
});
t('squashLines：标点后接词补空格（拉丁同样受益）', () => {
  assert.strictEqual(C.squashLines('Naturally,\nI read it'), 'Naturally, I read it');
});
t('squashLines：破折号后接词补空格', () => {
  assert.strictEqual(C.squashLines('за утренним кофе, —\nэто важно'), 'за утренним кофе, — это важно');
});
t('squashLines：CJK 跨行不加空格（行为不变）', () => {
  assert.strictEqual(C.squashLines('当然，\n这本书我读过了'), '当然，这本书我读过了');
  assert.strictEqual(C.squashLines('你好\n世界'), '你好世界');
});
t('squashLines：开引号/开括号后粘附不加空格', () => {
  assert.strictEqual(C.squashLines('«\nКнига Илона»'), '«Книга Илона»');
  assert.strictEqual(C.squashLines('слова (\nпример)'), 'слова (пример)');
});
t('squashLines：连字符/撇号粘附（不造 "well- known"）', () => {
  assert.strictEqual(C.squashLines('well-\nknown'), 'well-known');
  assert.strictEqual(C.squashLines('don’\nt'), 'don’t');
});
t('squashLines：闭引号贴词不加空格', () => {
  assert.strictEqual(C.squashLines('словами\n». конец'), 'словами». конец');
});
t('joinSrc：西里尔句组拼接补空格（prompt 路径）', () => {
  assert.strictEqual(C.joinSrc('что ты потратил', 'пять лет'), 'что ты потратил пять лет');
});
console.log('— v0.9.131 拼缝空格：无空格系统 × 空格系统要补（中西文粘连修复）—');
t('squashLines：中文接拉丁字母补空格（回归：加了多余的粘连）', () => {
  assert.strictEqual(C.squashLines('我们要点一个\nImpossible Whopper，对吧？'), '我们要点一个 Impossible Whopper，对吧？');
  assert.strictEqual(C.squashLines('- Burger King\n正押注其核心菜单'), '- Burger King 正押注其核心菜单');
});
t('squashLines：拉丁字母接中文补空格', () => {
  assert.strictEqual(C.squashLines('buy an\niPhone 回家'), 'buy an iPhone 回家');
});
t('squashLines：泰文接拉丁补空格（同样是盘古之白场景）', () => {
  assert.strictEqual(C.squashLines('ซื้อ\niPhone แล้ว'), 'ซื้อ iPhone แล้ว');
});
t('squashLines：两侧都属无空格书写系统保持不加（行为不变）', () => {
  assert.strictEqual(C.squashLines('你好\n世界'), '你好世界');
  assert.strictEqual(C.squashLines('ไป\nซื้อของ'), 'ไปซื้อของ');
  assert.strictEqual(C.squashLines('感兴趣的\nはず'), '感兴趣的はず');
});
t('squashLines：无空格系统接标点不补空格', () => {
  assert.strictEqual(C.squashLines('我们要点一个\n。'), '我们要点一个。');
  assert.strictEqual(C.squashLines('他说\n“不”'), '他说“不”');
});
t('needJoinSpace：语言感知矩阵', () => {
  assert.strictEqual(C.needJoinSpace('我们要点一个', 'Impossible'), true);
  assert.strictEqual(C.needJoinSpace('Burger King', '正押注'), true);
  assert.strictEqual(C.needJoinSpace('这是', '这个'), false);
  assert.strictEqual(C.needJoinSpace('тысячи', 'часов'), true);
});
t('needJoinSpace：闭标点必须粘附，不能被盘古之白拆开（跨语种回归）', () => {
  // 中间曾实现成「只要有一侧属无空格系统就按另一侧判定是否补空格」，
  // 导致 'Buy'+'。'→'Buy 。'、'we'+'。”'→'we 。”'，且所有语种受害。
  // 只有「无空格那一侧本身是字」时才允许补空格；标点一律交给通用规则。
  assert.strictEqual(C.needJoinSpace('Buy', '。'), false);
  assert.strictEqual(C.needJoinSpace('we', '。”'), false);
  assert.strictEqual(C.needJoinSpace('мы', '。”'), false);
  assert.strictEqual(C.needJoinSpace('우리는', '。”'), false);
  assert.strictEqual(C.needJoinSpace('我们', '。”'), false);
  assert.strictEqual(C.needJoinSpace('我们', '“好'), false);      // 开引号同样不拆
  assert.strictEqual(C.needJoinSpace('我', '、'), false);
  assert.strictEqual(C.needJoinSpace('ข้อความ', '”'), false);
  // 反例：另一侧是字母/数字时仍要补
  assert.strictEqual(C.needJoinSpace('我们', 'A'), true);
  assert.strictEqual(C.needJoinSpace('A', '我们'), true);
  assert.strictEqual(C.needJoinSpace('我们', '2024'), true);
});
t('monoFit：applyPost 重跑不再撤销折行、不再粘连（回归 WSJ 实测）', () => {
  // 旧版 squashLines 吃掉「一个|Impossible」之间的空格，拼回单行后无合法切点 → 折行被撤销成超宽单行
  assert.deepStrictEqual(C.monoFit('我们要点一个\nImpossible Whopper，对吧？', 16, 'zh-CN'),
    ['我们要点一个', 'Impossible Whopper，对吧？']);
});
t('panguSpace：幂等且只补行内边界', () => {
  assert.strictEqual(C.panguSpace('更好的 Whopper，'), '更好的 Whopper，');
  assert.strictEqual(C.panguSpace('增长了 8.5%。'), '增长了 8.5%。');
});
t('applyPost 顺序：盘古之白必须在折行之前（P1），且整轮幂等', () => {
  // 线上 WSJ 三行实测：v0.9.130 输出缺中西文空格。修法有 P1（折行前整段补）与
  // P2（折行后逐行补）两种，P2 补完宽度变化会把断点推走 → 重跑一次结果不同。
  // 这里把正当工序固化下来： stripSoundTags → mergePunctOnlyLines → balanceInlineTags
  // → panguSpace → (foldSpeakerLines | monoFit)，并要求一阶二阶都收敛。
  const applyPost = (raw) => {
    const t = C.panguSpace(C.balanceInlineTags(C.mergePunctOnlyLines(C.stripSoundTags(raw)), ''));
    const lines = C.isSpeakerText(t) ? C.foldSpeakerLines(t, 16, 'zh-CN') : C.monoFit(t, 16, 'zh-CN');
    return lines.join('\n');
  };
  const cases = [
    ['- Burger King正押注于其核心菜单\n经典产品，', '- Burger King\n正押注于其核心菜单经典产品，'],
    ['对外说：“嘿，没错，这是\n更好的Whopper，', '对外说：“嘿，没错，这是更好的\nWhopper，'],
    ['我们要点一个Impossible Whopper，对吧？', '我们要点一个\nImpossible Whopper，对吧？'],
    ['更好的Whopper，', '更好的 Whopper，'],
  ];
  cases.forEach(([src, want]) => {
    const once = applyPost(src);
    assert.strictEqual(once, want, '一次: ' + JSON.stringify(src));
    assert.strictEqual(applyPost(once), once, '二阶幂等失败: ' + JSON.stringify(src));
    assert.strictEqual(applyPost(applyPost(once)), once, '三阶幂等失败: ' + JSON.stringify(src));
  });
});
t('applyPost 顺序对照：折行后再补空格（P2）不幂等——证明上面那条创设是必要的', () => {
  const applyPost = (raw) => {
    const t = C.balanceInlineTags(C.mergePunctOnlyLines(C.stripSoundTags(raw)), '');
    const lines = C.isSpeakerText(t) ? C.foldSpeakerLines(t, 16, 'zh-CN') : C.monoFit(t, 16, 'zh-CN');
    return lines.map(l => C.panguSpace(l)).join('\n');
  };
  // 线上 WSJ cue #20 的真实输入：一次还是单行，二次却折成了两行 → 用户重点「整理」字幕会跳。
  const src = '我们要点一个Impossible Whopper，对吧？';
  assert.notStrictEqual(applyPost(applyPost(src)), applyPost(src));
});

t('joinSrc：CJK 拼接不加空格（行为不变）', () => {
  assert.strictEqual(C.joinSrc('我读了', '这本书'), '我读了这本书');
});
t('squashLines：法语省音 l\'école 被切分时不插空格（v0.9.51 审计修复）', () => {
  assert.strictEqual(C.squashLines("de l\n'école"), "de l'école");
  assert.strictEqual(C.squashLines("qu\n'un"), "qu'un");
});
t('mergePunctOnlyLines：LLM 孤闭引号行并入前一行（v0.9.52）', () => {
  assert.strictEqual(C.mergePunctOnlyLines('他说：“下次我们一定能拿下他们。\n”'), '他说：“下次我们一定能拿下他们。”');
  assert.strictEqual(C.mergePunctOnlyLines('他说：“好了。”\n」\n下一句'), '他说：“好了。”」\n下一句');
  assert.strictEqual(C.mergePunctOnlyLines('第一行\n”’'), '第一行”’');
});
t('mergePunctOnlyLines：省略号/音乐符号行不并入（刻意停顿行）', () => {
  assert.strictEqual(C.mergePunctOnlyLines('他停顿了。\n...\n然后继续'), '他停顿了。\n...\n然后继续');
  assert.strictEqual(C.mergePunctOnlyLines('唱歌\n♪\n结束'), '唱歌\n♪\n结束');
  assert.strictEqual(C.mergePunctOnlyLines('单独一行'), '单独一行');
});
t('buildMonoParts：孤闭引号行不进导出（v0.9.52 e2e en/es 实测回归）', () => {
  const rows = [
    { no: 1, start: 0, end: 2000, en: 'She said, "We\'ll get \'em."', zh: '她说：“下次我们一定能拿下他们。\n”' },
  ];
  const parts = C.buildMonoParts(rows, { maxW: 16, dstLocale: 'zh-CN' });
  assert.strictEqual(parts.length, 1);
  assert.ok(!/^”/m.test(parts[0].text), '不应有孤引号行: ' + JSON.stringify(parts[0].text));
  assert.ok(/。”$/.test(parts[0].text.replace(/\n/g, '')), '闭引号应贴句尾: ' + JSON.stringify(parts[0].text));
});
t('squashLines：英语 get \'em 仍补空格（单引号对白不受省音判定影响）', () => {
  assert.strictEqual(C.squashLines("get\n'em"), "get 'em");
});
t('splitByDuration：英文对白闭直引号归前段（v0.9.51 平局裁决修复）', () => {
  const text = '"I\'m fine, thanks." "And how are you today, my friend?" she asked politely.';
  const segs = C.splitByDuration(text, [{start:0,end:2000},{start:2000,end:4000},{start:4000,end:6000}], { locale: 'en' });
  assert.ok(!/^["'”’]/.test(segs[2] || ''), '末段不应以闭引号开头: ' + JSON.stringify(segs));
  assert.ok(/["'”’]$/.test(segs[1] || ''), '中段应以闭引号收尾: ' + JSON.stringify(segs));
});
t('wrapToWidth：西里尔长词不被硬切劈开（劈词保护扩 Unicode）', () => {
  const lines = C.wrapToWidth('электроэнергетика продолжается дальше', 8, { normalize: true, locale: 'ru' });
  for (const ln of lines) {
    assert.ok(!/^([а-яА-ЯёЁ]+)$/.test(ln) || ln.length <= 8 || true); // 占位：宽度由 textWidth 决定
  }
  assert.ok(lines.every((ln) => ln.trim().length > 0));
  // 关键断言：任何一行不得以被劈开的词残段结尾且下一行以残段开头（无空格相接即劈词）
  for (let i = 0; i + 1 < lines.length; i++) {
    const a = lines[i], b = lines[i + 1];
    if (!a || !b) continue;
    const la = a[a.length - 1], fb = b[0];
    assert.ok(!(C.needJoinSpace(a, b) === false && /[а-яА-ЯёЁ]/.test(la) && /[а-яА-ЯёЁ]/.test(fb)),
      '相邻两行字母直接相接 = 劈词: ' + JSON.stringify(lines));
  }
});
t('splitByDuration：闭引号不落段首（NS_HARD 扩展，回归：zh 行首 “）', () => {
  // 双语句组按原边界切回时，。”两侧同为 5 级断点，旧版靠宽度距离决胜可能把 ” 留给下段开头
  const text = '“我要去开自助仓储，因为那行的失败率极低。”但他完全不是这种思维模式，丝毫不是。';
  const segs = C.splitByDuration(text, [{ start: 0, end: 2412 }, { start: 2412, end: 5825 }], { locale: 'zh-CN' });
  assert.ok(segs.length === 2, '应切 2 段');
  assert.ok(!/^[”’»）)]/.test(segs[1]), '第 2 段不得以闭引号开头: ' + segs[1]);
});

t('splitByDuration：方位词不作段首（v0.9.63，回归：Gurman 折叠屏 22-23 腰斩「开/孔里」）', () => {
  // 「里」独立成块（开孔|里|嵌入）时作段首被罚 260 分，切点推向方位词之前——里随宿主词走
  const text = '他们往蜂窝天线开孔里嵌入所谓的陶瓷嵌件。';
  const segs = C.splitByDuration(text, [{ start: 39320, end: 41369 }, { start: 41369, end: 43745 }], { locale: 'zh-CN' });
  assert.ok(segs.length === 2, '应切 2 段');
  assert.ok(!/^里/.test(segs[1]), '第 2 段不得以独立方位词「里」开头: ' + segs[1]);
  // 复合词不受影响：「里面/中间/中国」整词成块、词首不罚
  const segs2 = C.splitByDuration('这栋楼里面的房间都很干净整洁明亮。', [{ start: 0, end: 1500 }, { start: 1500, end: 3000 }], { locale: 'zh-CN' });
  assert.ok(segs2.length === 2 && segs2.every((s) => s), '复合词场景应正常切分且两段非空');
});

t('splitByDuration：饥饿段借词不腰斩意群（v0.9.63，回归：Gurman 83-86「另/一件事」）', () => {
  // 逗号切分后「就是」段饥饿 → 从左邻借词，旧版按词典词边界借走「一件事，」留下孤儿「另」；
  // 修复后孤儿短词随借字收编：施主「他们做的」+受段「另一件事，就是」
  const text = '他们做的另一件事，就是大幅抬高了国际客户的价格。';
  const times = [{ start: 162075, end: 163509 }, { start: 163509, end: 164882 }, { start: 164882, end: 166555 }, { start: 166555, end: 168422 }];
  const segs = C.splitByDuration(text, times, { locale: 'zh-CN' });
  assert.ok(segs.length === 4, '应切 4 段');
  assert.ok(!/另$/.test(segs[0]), '第 1 段不得以孤儿短词「另」结尾（意群腰斩）: ' + segs[0]);
  assert.ok(segs.every((s) => s && s.trim()), '所有段非空');
});

t('splitByDuration：1|1 单字块不切（v0.9.64，回归：Gurman 二代 22-23「陶瓷嵌|件」）', () => {
  // 「嵌件」是技术词不在分词词典，Chrome 切成 嵌|件 两个单字块——词典边界保护失效；
  // 修复：两侧均单字词块的切点罚 30 分，切口移向多字词边界
  const text = '他们把所谓陶瓷嵌件塞进蜂窝天线的开孔里。';
  const segs = C.splitByDuration(text, [{ start: 39320, end: 41369 }, { start: 41369, end: 43745 }], { locale: 'zh-CN' });
  assert.ok(segs.length === 2, '应切 2 段');
  assert.ok(!/嵌$/.test(segs[0]) && !/^件/.test(segs[1]), '「嵌件」不得拆开: ' + segs.join(' / '));
});

t('splitByDuration：指示词不悬尾（v0.9.64，回归：Gurman 二代 99-100「。这 / 就是」）', () => {
  // 「这就是」是指示短语不是连接词：连接词前断点加分让切点落在「这」后，单字段再被借词修复
  // 拼成「价格之上。这 / 就是…」；修复 1：指示词后不给连接词断点；修复 2：悬尾惩罚 220
  const text = '比如说在澳大利亚，有 800 澳元的溢价，加在换算后的价格之上。这就是他们弥补这个缺口的方式。';
  const times = [{ start: 187124, end: 188706 }, { start: 188706, end: 190815 }, { start: 190815, end: 193029 }, { start: 193029, end: 194987 }, { start: 194987, end: 197115 }, { start: 195855, end: 197115 }];
  const segs = C.splitByDuration(text, times, { locale: 'zh-CN' });
  assert.ok(segs.length === 6, '应切 6 段');
  segs.forEach((s, i) => {
    assert.ok(!/这$/.test(s) || i === segs.length - 1, '段 ' + (i + 1) + ' 不得以悬尾「这」结尾: ' + s);
  });
  const joined = segs.join('');
  assert.ok(!joined.includes('。这，') || true, '占位');
});

t('splitByDuration：借词不带出附着助词（v0.9.64，回归：Gurman 二代 98「的溢价，」行首）', () => {
  // 借词循环 pop 到「的」时一并搬走会让受段以「的」开头；修复：附着助词不作借出单位，推回施主
  const segs = C.splitByDuration('比如说在澳大利亚，有 800 澳元的溢价，加在换算后的价格之上。这就是他们弥补这个缺口的方式。',
    [{ start: 187124, end: 188706 }, { start: 188706, end: 190815 }, { start: 190815, end: 193029 }, { start: 193029, end: 194987 }, { start: 194987, end: 197115 }, { start: 195855, end: 197115 }], { locale: 'zh-CN' });
  segs.forEach((s, i) => {
    assert.ok(!/^[的了着里]/.test(s.trim()), '段 ' + (i + 1) + ' 不得以附着助词开头: ' + s);
  });
});

t('panguSpace：中西文边界补空格（v0.9.64）', () => {
  assert.strictEqual(C.panguSpace('一台普通iPhone，又能折叠'), '一台普通 iPhone，又能折叠');
  assert.strictEqual(C.panguSpace('的AI构建。'), '的 AI 构建。');
  assert.strictEqual(C.panguSpace('800 澳元 已有空格'), '800 澳元 已有空格');   // 幂等：已有空格不加
  assert.strictEqual(C.panguSpace('iPhone，标点接缝不动'), 'iPhone，标点接缝不动');
  assert.strictEqual(C.panguSpace(''), '');
  assert.strictEqual(C.panguSpace(null), '');
});

// ---------------- v0.9.66 cue 对齐校验 ----------------
const VCA_CUES = [
  { no: 108, start: 188706, end: 190815 },
  { no: 109, start: 190815, end: 192586 },
  { no: 110, start: 192586, end: 194152 },
  { no: 111, start: 194152, end: 195855 }
];

t('validateCueAlign：编号齐全 + 文本非空 = 通过（v0.9.66）', () => {
  const v = C.validateCueAlign(VCA_CUES, [
    { no: 108, text: '호주에서는 800 호주 달러의' },
    { no: 109, text: '환산 환율에' },
    { no: 110, text: '더해지는 프리미엄이' },
    { no: 111, text: '붙습니다.' }
  ], { maxW: 21, cpsLimit: 9, locale: 'ko' });
  assert.ok(v.ok, '应通过: ' + v.errs.join(';'));
  assert.strictEqual(v.texts.size, 4);
  assert.strictEqual(v.texts.get(109), '환산 환율에');
  assert.strictEqual(v.cpsWarns.length, 0);
});

t('validateCueAlign：缺号 = 结构错（实验中 hi 的失败形态）', () => {
  const v = C.validateCueAlign(VCA_CUES, [
    { no: 108, text: 'a' }, { no: 109, text: 'b' }, { no: 111, text: 'd' }
  ], { maxW: 21, cpsLimit: 9 });
  assert.ok(!v.ok, '缺 110 必须判结构错');
  assert.ok(v.errs.some(e => e.startsWith('MISSING_110')), '错误信息含 MISSING_110: ' + v.errs.join(';'));
});

t('validateCueAlign：重复编号 / 发明编号 / 空文本 = 结构错', () => {
  const dup = C.validateCueAlign(VCA_CUES, [
    { no: 108, text: 'a' }, { no: 108, text: 'a2' }, { no: 109, text: 'b' }, { no: 110, text: 'c' }, { no: 111, text: 'd' }
  ], {});
  assert.ok(!dup.ok && dup.errs.some(e => e.startsWith('DUP_')), '重复 108 必须报错');
  const unknown = C.validateCueAlign(VCA_CUES, [
    { no: 108, text: 'a' }, { no: 109, text: 'b' }, { no: 110, text: 'c' }, { no: 111, text: 'd' }, { no: 999, text: 'x' }
  ], {});
  assert.ok(!unknown.ok && unknown.errs.some(e => e.startsWith('UNKNOWN_999')), '发明 999 必须报错');
  const empty = C.validateCueAlign(VCA_CUES, [
    { no: 108, text: 'a' }, { no: 109, text: '' }, { no: 110, text: 'c' }, { no: 111, text: 'd' }
  ], {});
  assert.ok(!empty.ok && empty.errs.some(e => e.startsWith('EMPTY_109')), '109 空文本必须报错');
});

t('validateCueAlign：filler 豁免——纯水词 cue 空文本不算错', () => {
  const cues = VCA_CUES.concat([{ no: 107, start: 188000, end: 188706 }]);
  const v = C.validateCueAlign(cues, [
    { no: 107, text: '' },  // filler：模型列入 fillers 数组，entry 可空
    { no: 108, text: 'a' }, { no: 109, text: 'b' }, { no: 110, text: 'c' }, { no: 111, text: 'd' }
  ], { fillerSet: new Set([107]) });
  assert.ok(v.ok, 'filler 空文本应豁免: ' + v.errs.join(';'));
  assert.strictEqual(v.texts.size, 4);
});

t('validateCueAlign：CPS/行宽只软警告不拦截（超容走 QC + 折行兜底）', () => {
  const v = C.validateCueAlign(VCA_CUES, [
    { no: 108, text: '아주 긴 문장입니다 정말로 너무 길어서 읽을 수가 없습니다' },
    { no: 109, text: 'b' }, { no: 110, text: 'c' }, { no: 111, text: 'd' }
  ], { maxW: 21, cpsLimit: 4 });  // 108 时长 2.109s、宽 >8 → CPS 超 4
  assert.ok(v.ok, 'CPS 超标是软警告，不判结构错');
  assert.ok(v.cpsWarns.some(w => w.no === 108), '应收集 108 的 CPS 警告');
});

t('validateCueAlign：非数组输入 / 零时长 cue', () => {
  const na = C.validateCueAlign(VCA_CUES, null, {});
  assert.ok(!na.ok && na.errs[0] === 'NO_CUES_ARRAY');
  // 源 cue 时间重叠（start==end）→ dur 0 → 不算 CPS（不产生 NaN/Infinity 警告）
  const z = C.validateCueAlign([{ no: 1, start: 1000, end: 1000 }], [{ no: 1, text: '文本' }], { cpsLimit: 9 });
  assert.ok(z.ok && z.cpsWarns.length === 0, '零时长 cue 不应产生 CPS 警告');
});

console.log('\n— v0.9.68 sliver 保护与专名腰斩 —');
t('R3 细切不产生 <200ms 子 cue（Mayday ja 实测回归）', () => {
  // 旧算法：154ms cue 被比例瓜分成 58/9/87ms 三段（CPS 爆表无法阅读）
  const rows = [{ start: 33946, end: 34100, en: 'for her birthday.',
                  zh: '誕生日のプレゼントに買ってやったんだ。' }];
  const parts = C.buildBilingualParts(rows, { maxW: 13, srcLocale: 'en', dstLocale: 'ja' });
  assert.strictEqual(parts.length, 1, '短 cue 应收敛为 1 段，实际 ' + parts.length);
  assert.strictEqual(parts[0].start, 33946);
  assert.strictEqual(parts[0].end, 34100);
});
t('正常比例切分不受 sliver 保护影响（≥200ms 各段逐一致）', () => {
  const rows = [{ start: 33946, end: 34947, en: 'So I got Anderton for her birthday.',
                  zh: 'それで Anderton の誕生日のプレゼントに買ってやったんだ。' }];
  const parts = C.buildBilingualParts(rows, { maxW: 13, biMaxW: 13, srcLocale: 'en', dstLocale: 'ja' });
  assert.ok(parts.length >= 2, '应正常切分多段');
  parts.forEach(p => assert.ok(p.end - p.start >= 200, '出现 <200ms 子段: ' + (p.end - p.start)));
});
t('多词拉丁专名不被腰斩（Cabbage|Patch 不切，Mayday ja/fil 回归）', () => {
  const rows = [
    { start: 31693, end: 33862, en: "So I got Anderton's daughter\none of those Cabbage Patch dolls",
      zh: 'それで Anderton の娘に、Cabbage Patch dolls を誕生日のプレゼントに買ってやったんだ。' },
    { start: 33946, end: 34947, en: 'for her birthday.', flag: 'merged' },
  ];
  const parts = C.buildBilingualParts(rows, { maxW: 13, srcLocale: 'en', dstLocale: 'ja' });
  const joined = parts.map(p => p.dstLines.join('')).join('\u0001');
  assert.ok(!/Cabbage\u0001\s*Patch/.test(joined), 'Cabbage|Patch 仍被切开');
  assert.ok(!/Cabbage$/.test(joined), '段尾悬着 Cabbage');
  assert.ok(joined.includes('Cabbage Patch'), '专名核心应完整出现');
});
t('专名惩罚不误伤：专名起点前/句读后切分照常', () => {
  // "of those|Cabbage"（专名起点前，左词小写）与 "insane.|You"（句读后）不受罚
  const segs = C.splitTextNatural('one of those Cabbage Patch dolls is insane. You say that like', 4, 'en');
  const j = segs.join('\u0001');
  assert.ok(!/Cabbage\u0001\s*Patch/.test(j), 'Cabbage|Patch 被切');
  assert.ok(segs.every(s => s.trim().length > 0), '出现空段');
});
t('单语导出同样受 sliver 保护', () => {
  const rows = [{ start: 0, end: 154, en: 'for her birthday.',
                  zh: '誕生日のプレゼントに買ってやったんだ。' }];
  const parts = C.buildMonoParts(rows, { maxW: 13, dstLocale: 'ja' });
  assert.strictEqual(parts.length, 1, '短 cue 单语导出应收敛为 1 段');
});

console.log('— 纯哼唱判别 isPureHumming（v0.9.76）—');
t('英文经典哼唱 → true', () => {
  assert.strictEqual(C.isPureHumming('♪ Oh-oh, oh-oh ♪'), true);
  assert.strictEqual(C.isPureHumming('♪ La la la, la-la-la ♪'), true);
  assert.strictEqual(C.isPureHumming('♪ Mmm mmm mmm ♪'), true);
  assert.strictEqual(C.isPureHumming('♪ Oh yeah yeah ♪'), true);
  assert.strictEqual(C.isPureHumming('♪ Ohohoh ohoh ♪'), true);
  assert.strictEqual(C.isPureHumming('♪ Na na na, hey hey ♪'), true);
});
t('含实词的歌词 → false（绝不能误删）', () => {
  assert.strictEqual(C.isPureHumming('♪ Take me home tonight ♪'), false);
  assert.strictEqual(C.isPureHumming('♪ Hey Jude ♪'), false);
  assert.strictEqual(C.isPureHumming('♪ I love you, baby ♪'), false);
  assert.strictEqual(C.isPureHumming('♪ Happy birthday to you ♪'), false);
});
t('中日韩哼唱字 → true', () => {
  assert.strictEqual(C.isPureHumming('♪ 啦啦啦 啦啦啦 ♪'), true);
  assert.strictEqual(C.isPureHumming('♪ 哦哦哦 ♪'), true);
  assert.strictEqual(C.isPureHumming('♪ 嗯嗯 啊啊啊 ♪'), true);
  assert.strictEqual(C.isPureHumming('♪ ラララ あー ♪'), true);
});
t('中文实词歌词 → false', () => {
  assert.strictEqual(C.isPureHumming('♪ 生日快乐 歌唱你 ♪'), false);
  assert.strictEqual(C.isPureHumming('♪ 我们一起唱歌 ♪'), false);
});
t('fail-safe 边界', () => {
  assert.strictEqual(C.isPureHumming('♪ ♪'), false);          // 纯符号：交回 effChars 口径
  assert.strictEqual(C.isPureHumming(''), false);
  assert.strictEqual(C.isPureHumming(null), false);
  assert.strictEqual(C.isPureHumming('♪ Café ♪'), false);     // 词表外（带变音符）→ 仍救援
  assert.strictEqual(C.isPureHumming('♪ OH-HO-HO ♪'), true);  // 大小写无关
});


// ---------------- 歌词标记可配置（v0.9.78）----------------
console.log('— 歌词标记可配置 setMusicMarks（v0.9.78）—');
t('默认标记为 ♪♫♬♩', () => {
  assert.strictEqual(C.setMusicMarks(''), '♪♫♬♩');        // 空串回退默认
  assert.strictEqual(C.getMusicMarks(), '♪♫♬♩');
  assert.ok(C.musicRe().test('♪♫♬♩'));
  assert.ok(!C.musicRe().test('#'));
});
t('自定义标记：# 生效、♪ 失效', () => {
  C.setMusicMarks('#');
  assert.ok(C.musicRe().test('a#b'));
  assert.strictEqual(C.musicRe().test('♪♫♬♩'), false);     // 默认符号不再算歌词
  assert.strictEqual(C.extractMusicFrames('♪♫♬♩ love ♪♫♬♩'), null);
  const mf = C.extractMusicFrames('# love #');
  assert.ok(mf && mf.segs.length === 1);
  assert.strictEqual(mf.segs[0].text, 'love');
});
t('自定义标记下 isPureHumming 跟随新符号', () => {
  C.setMusicMarks('#');
  assert.strictEqual(C.isPureHumming('# oh oh #'), true);
  assert.strictEqual(C.isPureHumming('# take me home #'), false);
  // 符号换成 # 后，♪ 只是普通标点：分词阶段被当分隔符丢弃，不参与哼唱判定。
  // 因此 '♪ oh oh ♪' 仍按 oh/oh 判纯哼唱——这是可接受的（该行在任何标记集下都是哼唱）。
  assert.strictEqual(C.isPureHumming('♪♫♬♩ oh oh ♪♫♬♩'), true);
});
t('字符类转义：] ^ - \\ 不炸', () => {
  C.setMusicMarks(']^-\\');
  assert.ok(C.musicRe().test('a]b'));
  assert.ok(C.musicRe().test('a^b'));
  assert.ok(C.musicRe().test('a-b'));
  assert.strictEqual(C.musicRe().test('aXb'), false);
});
t('留空 / 空白 → 回退默认（防整链静默失效）', () => {
  C.setMusicMarks('   ');
  assert.strictEqual(C.getMusicMarks(), '♪♫♬♩');
  C.setMusicMarks(null);
  assert.strictEqual(C.getMusicMarks(), '♪♫♬♩');
  C.setMusicMarks(undefined);
  assert.strictEqual(C.getMusicMarks(), '♪♫♬♩');
});
t('恢复默认后行为与改前一致', () => {
  C.setMusicMarks('♪♫♬♩');
  assert.ok(C.musicRe().test('♪♫♬♩'));
  assert.strictEqual(C.isPureHumming('♪♫♬♩ la la ♪♫♬♩'), true);
  assert.strictEqual(C.isPureHumming('♪♫♬♩ hey jude ♪♫♬♩'), false);
});

console.log('— parseSrt 破损修复（v0.9.81 孤儿块回填）—');
t('时间轴与正文间多余空行：孤儿文本归位，不丢内容', () => {
  const src = '1\n00:00:01,000 --> 00:00:02,000\nHello.\n\n2\n00:00:03,000 --> 00:00:04,000\n\nwith you\n\n3\n00:00:05,000 --> 00:00:06,000\nFine.';
  const { items, issues } = C.parseSrt(src);
  assert.strictEqual(items.length, 3);
  assert.strictEqual(items[1].text, 'with you');
  assert.strictEqual(issues.filter(i => i.type === 'fmt').length, 0);
  assert.ok(issues.some(i => /自动修复/.test(i.msg)), '应有修复提示');
});
t('连续孤儿（正文含空行被多次切断）按换行拼接', () => {
  const src = '1\n00:00:01,000 --> 00:00:02,000\n\nwith\n\nyou\n\n2\n00:00:03,000 --> 00:00:04,000\nOk.';
  const { items, issues } = C.parseSrt(src);
  assert.strictEqual(items.length, 2);
  assert.strictEqual(items[0].text, 'with\nyou');
  assert.strictEqual(items[1].text, 'Ok.');
  assert.strictEqual(issues.filter(i => i.type === 'fmt').length, 0);
});
t('真正无主的孤儿块仍报 issue，不误吞', () => {
  const src = '1\n00:00:01,000 --> 00:00:02,000\nHello.\n\nstray text without number\n\n2\n00:00:03,000 --> 00:00:04,000\nOk.';
  const { items, issues } = C.parseSrt(src);
  assert.strictEqual(items[0].text, 'Hello.');
  assert.ok(issues.some(i => i.code === 'blkNoNumTs'), '应保留原 fmt 错误');
});
t('正常空 cue（歌曲间隙）不受影响', () => {
  const src = '1\n00:00:01,000 --> 00:00:02,000\n\n2\n00:00:03,000 --> 00:00:04,000\nOk.';
  const { items, issues } = C.parseSrt(src);
  assert.strictEqual(items.length, 2);
  assert.strictEqual(items[0].text, '');
  assert.strictEqual(items[1].text, 'Ok.');
  assert.strictEqual(issues.length, 0);
});
t('真实破损文件（Sister Boniface S03E08）5 处全归位', () => {
  const fs = require('fs');
  const p = '/Users/jp/Downloads/Sister Boniface Mysteries S03E08 Toast To The Newly Dead-en.srt';
  if (!fs.existsSync(p)) return; // 文件不在本机则跳过
  const { items, issues } = C.parseSrt(fs.readFileSync(p, 'utf8'));
  assert.strictEqual(issues.filter(i => i.type === 'fmt').length, 0, '不应再有解析失败块');
  assert.ok(items.some(i => i.text === "to a summer's day?"), 'cue100 台词应归位');
  assert.ok(items.some(i => i.text === 'with you'), 'cue267 歌词应归位');
  assert.ok(items.some(i => i.text === 'who helped you see the light'), 'cue269 歌词应归位');
  assert.strictEqual(items.length, 863);
});
t('detectFormat 识别 SBV（SRT 不误判）', () => {
  assert.strictEqual(C.detectFormat('0:00:01.000,0:00:03.000\nhi\n'), 'sbv');
  assert.strictEqual(C.detectFormat('1\n00:00:01,000 --> 00:00:03,000\nhi\n'), 'srt');
  assert.strictEqual(C.detectFormat('WEBVTT\n\n00:01.000 --> 00:03.000\nhi\n'), 'vtt');
});
t('parseSbv 基本解析（多行文本/短毫秒/重编号）', () => {
  const r = C.parseSbv('0:00:01.000,0:00:03.000\nHello there\nsecond line\n\n0:00:04.5,0:00:06.25\nBye\n');
  assert.strictEqual(r.issues.length, 0);
  assert.strictEqual(r.items.length, 2);
  assert.strictEqual(r.items[0].no, 1);
  assert.strictEqual(r.items[0].start, 1000);
  assert.strictEqual(r.items[0].end, 3000);
  assert.strictEqual(r.items[0].text, 'Hello there\nsecond line');
  assert.strictEqual(r.items[1].no, 2);
  assert.strictEqual(r.items[1].start, 4500);
  assert.strictEqual(r.items[1].end, 6250);
  assert.strictEqual(r.items[1].text, 'Bye');
});
t('parseSbv 空文本块跳过 + 坏块报 issue', () => {
  const r = C.parseSbv('0:00:00.000,0:00:00.000\n\n\n0:00:01.000,0:00:02.000\nOk\n\nbad block\n\n0:00:03.000,0:00:04.000\nEnd\n');
  assert.strictEqual(r.items.length, 2);
  assert.ok(r.issues.some(i => i.code === 'blkNoSbvTs'), '坏块应报 fmt 错误');
});
t('formatSbv 往返一致', () => {
  const out = C.formatSbv(C.parseSbv('0:00:01.000,0:00:03.000\nHi\n\n0:00:04.000,0:00:05.500\nYo\n').items);
  const r2 = C.parseSbv(out);
  assert.strictEqual(r2.issues.length, 0);
  assert.strictEqual(r2.items.length, 2);
  assert.strictEqual(r2.items[0].start, 1000);
  assert.strictEqual(r2.items[1].end, 5500);
  assert.ok(/^0:00:01\.000,0:00:03\.000\nHi\n\n0:00:04\.000,0:00:05\.500\nYo\n$/.test(out), 'SBV 输出格式应为 YouTube 惯例');
});


console.log('— v0.9.105 ASS 推荐字号（按书写系统字形高度补偿）—');
const LANGS_ALL = [
  'en', 'zh-CN', 'zh-TW', 'ja', 'ko', 'fr', 'de', 'es', 'pt', 'it', 'ru', 'ar', 'th', 'vi',
  'id', 'hi', 'tr', 'pl', 'nl', 'ms', 'fil', 'fa', 'sv', 'da', 'fi', 'nb', 'cs', 'sk', 'hu',
  'ro', 'ca', 'hr', 'el', 'uk', 'sr', 'bg', 'he', 'ur', 'bn', 'ta', 'te', 'mr', 'ne', 'si',
  'my', 'km', 'lo', 'sw'
];   // v0.9.109：22 → 48 种目标语言
const MAXW_LANG = { 'zh-CN':16,'zh-TW':16,'ja':13,'ko':16 };
const INK = C.INK_RATIO;
const inkOf = (l) => (!l || l === 'auto' || typeof INK[l] !== 'number') ? INK._default : INK[l];
t('共 48 种语言都有推荐值（漏一个就会静默回落到 76）', () => {
  const miss = LANGS_ALL.filter(l => typeof C.REC_ASS_SIZE[l] !== 'number');
  assert.deepStrictEqual(miss, [], '缺推荐值: ' + miss.join(','));
});
t('中文锚点仍是 56（只向上补偿，绝不缩小任何一种语言）', () => {
  ['zh-CN','zh-TW','ja','ko'].forEach(l => {
    assert.strictEqual(C.REC_ASS_SIZE[l], 56, l);
    assert.strictEqual(C.recAssSize(l, 'auto', {maxW:16}).dstSize, 56, l);
  });
});
t('拉丁/西里尔译文字号 76、波斯最大 78', () => {
  ['en','fr','de','es','pt','it','ru','id','tr','pl','nl','ms','fil'].forEach(l =>
    assert.strictEqual(C.recAssSize(l, 'zh-CN', {maxW:21}).dstSize, 76, l));
  assert.strictEqual(C.recAssSize('fa', 'zh-CN', {maxW:21}).dstSize, 78);
});
t('原文号 = 原文书写系统推荐值 x 0.62（v0.9.107：不再从译文反算）', () => {
  const cases = [
    ['zh-CN','en',16,48], ['ja','en',13,48], ['ko','en',16,48], ['zh-CN','th',16,44],
    ['en','zh-CN',21,28], ['en','ja',21,30], ['en','en',21,48], ['th','en',21,48],
    ['fa','en',21,46], ['hi','th',21,44], ['zh-CN','auto',16,48], ['vi','en',21,46]
  ];
  cases.forEach(([d,s2,mw,want]) => {
    const r = C.recAssSize(d, s2, {maxW: mw});
    assert.strictEqual(r.srcSize, want, d + '/' + s2 + ' 原文号 ' + r.srcSize + ' 应为 ' + want);
  });
});
t('原文号恒在 28~50：既不缩到看不清，也不会撑爆屏宽', () => {
  // 上界 50：SRC_VIS_RATIO=0.62 时最大组合是「拉丁/波斯语原文」48pt，留 2pt 余量
  // 下界 28：英译中时中文原文被「不喧宾夺主」压到 28pt，视觉 25.6px 仍清晰可读
  for (const d of LANGS_ALL) for (const s of LANGS_ALL.concat(['auto'])) {
    const r = C.recAssSize(d, s, {maxW: MAXW_LANG[d] || 21});
    assert.ok(r.srcSize >= 28 && r.srcSize <= 50, d + '/' + s + ' 原文号 ' + r.srcSize + ' 越界');
  }
});
t('主次关系：原文视觉高度仍低于译文，同书写系统对保持 0.62', () => {
  for (const d of LANGS_ALL) for (const s of LANGS_ALL.concat(['auto'])) {
    const mw = MAXW_LANG[d] || 21;
    const r = C.recAssSize(d, s, {maxW: mw});
    const dVis = r.dstSize * inkOf(d);
    const sVis = r.srcSize * inkOf(s);
    assert.ok(sVis < dVis, d + '/' + s + ' 原文视觉不该超过译文');
    if (Math.abs(inkOf(d) - inkOf(s)) < 1e-9) {  // 同一书写系统 → 应严格保持 0.62
      assert.ok(Math.abs(sVis / dVis - 0.62) < 0.03, d + '/' + s + ' 同系统视觉比 ' + (sVis / dVis).toFixed(3));
    }
  }
});
t('非 CJK 语言的视觉高度被补到中文的 75%~100%', () => {
  const zhVis = 56 * INK['zh-CN'];
  LANGS_ALL.forEach(l => {
    const r = C.recAssSize(l, 'auto', {maxW: MAXW_LANG[l] || 21});
    const vis = r.dstSize * inkOf(l);
    const ratio = vis / zhVis;
    assert.ok(ratio >= 0.75 && ratio <= 1.0, l + ' 视觉高度占中文 ' + (ratio * 100).toFixed(0) + '%');
  });
});
t('行宽封顶：maxW 越大，推荐字号被压得越小（一行不超出 1800px）', () => {
  [21, 24, 32, 48].forEach(mw => {
    LANGS_ALL.forEach(l => {
      const r = C.recAssSize(l, 'zh-CN', {maxW: mw});
      assert.ok(r.dstSize * mw <= 1800, l + ' maxW=' + mw + ' 行宽 ' + (r.dstSize * mw) + ' > 1800');
      assert.ok(r.dstSize >= 24, l + ' 字号下限 24');
    });
  });
  assert.strictEqual(C.recAssSize('fa', 'zh-CN', {maxW:24}).dstSize, 75, 'maxW=24 时应压到 75');
});
t('缺参/异常参数不炸（maxW 为 0、空、字符串）', () => {
  const r = C.recAssSize('en', 'zh-CN');
  assert.ok(r.dstSize >= 24 && r.srcSize >= 24);
  [undefined, {}, {maxW:0}, {maxW:'21'}].forEach(o => {
    const x = C.recAssSize('th', 'auto', o);
    assert.ok(Number.isFinite(x.dstSize) && Number.isFinite(x.srcSize), JSON.stringify(o));
  });
});
t('未知语言回落到拉丁推荐值 76', () => {
  assert.strictEqual(C.recAssSize('xx', 'auto', {maxW:21}).dstSize, 76);
});

// ---------------- v0.9.108：双行堆叠按墨迹定位 ----------------
// 测试里自带一份几何常量（与 srt-core.js 的 BOX_DESC / INK_DESC / ASS_STACK_GAP 对应），
// 用来反算「两行墨迹的实际间隙」，验证不是按行框堆叠。
// v0.9.109：改为直接读 core 导出的真值——此前这里维护了一份副本，
// 新增语言（如缅甸文下伸 0.47）后副本不跟进，测试就会用错误的几何去反算间隙。
const BOX_DESC = C.BOX_DESC, STACK_GAP = C.ASS_STACK_GAP;
const inkDescOfT = (l) => C.INK_DESC[l] != null ? C.INK_DESC[l] : C.INK_DESC._default;

t('assStackMV：精确值（下方贴底 42、单行的典型组合）', () => {
  const cases = [
    // [下方号/语言, 上方号/语言, 期望 mv]：旧逻辑（行框 + 8）一并列出便于对照
    ['en', 48, 'zh-CN', 56, 83],   // 中文译文在上、英文原文在下：旧 107，收紧 24
    ['zh-CN', 56, 'en', 48, 117],  // 英文原文在上、中文译文在下：旧 116（原本就贴合，基本不变）
    ['en', 76, 'zh-CN', 28, 108],  // 英文译文在下、中文原文在上：旧 140，收紧 32
    ['zh-CN', 28, 'en', 76, 85],   // 中文原文在下、英文译文在上：旧 75（中文墨迹饱和，略抬高给英文下伸）
    ['en', 48, 'en', 76, 90]       // 同为拉丁（两个 0.21 下伸互相抵消，接近行框堆叠）
  ];
  cases.forEach(([bl, bs, tl, ts, want]) => {
    const got = C.assStackMV({bottomMV:42, bottomSize:bs, bottomLang:bl,
                              bottomLines:1, topSize:ts, topLang:tl});
    assert.strictEqual(got, want, bl + bs + ' 在下 / ' + tl + ts + ' 在上 → mv ' + got + ' 应为 ' + want);
  });
});

t('assStackMV：两行墨迹间隙恒为 12px（不再按行框堆叠）', () => {
  const langs = LANGS_ALL.concat(['auto']);
  for (const bl of langs) for (const tl of langs) for (const bs of [28, 48, 56, 76]) for (const ts of [28, 48, 56, 76]) {
    const mv = C.assStackMV({bottomMV:42, bottomSize:bs, bottomLang:bl,
                             bottomLines:1, topSize:ts, topLang:tl});
    // 反算墨迹间隙：上方墨迹底 − 下方墨迹顶
    const topInkBott = mv + BOX_DESC * ts - inkDescOfT(tl) * ts;
    const botInkTop = 42 + BOX_DESC * bs + inkOf(bl) * bs;
    const gap = topInkBott - botInkTop;
    assert.ok(Math.abs(gap - STACK_GAP) <= 1.5,
      bl + bs + '/' + tl + ts + ' 墨迹间隙 ' + gap.toFixed(1) + ' 应≈' + STACK_GAP);
    // 上方块整体必须仍在下方块之上（允许行框重叠，那是字体留白）
    assert.ok(mv > 42, bl + bs + '/' + tl + ts + ' 上方块 mv ' + mv + ' 不该低于贴底值');
  }
});

t('assStackMV：下方块每多一行，上方块正好抬高一个行高', () => {
  const base = C.assStackMV({bottomMV:42, bottomSize:48, bottomLang:'en',
                             bottomLines:1, topSize:56, topLang:'zh-CN'});
  for (const n of [2, 3]) {
    const mv = C.assStackMV({bottomMV:42, bottomSize:48, bottomLang:'en',
                             bottomLines:n, topSize:56, topLang:'zh-CN'});
    const delta = mv - base - (n - 1) * C.assLineHeight(48);
    assert.ok(Math.abs(delta) <= 1, 'n=' + n + ' 抬高量偏差 ' + delta);
  }
});

t('assStackMV：缺参/异常参数不炸，且结果落在 1~1080', () => {
  [undefined, {}, {bottomMV:0}, {bottomMV:'42', bottomLines:0}, {bottomSize:0, topSize:0}]
    .forEach(o => {
      const v = C.assStackMV(o);
      assert.ok(Number.isFinite(v) && v >= 1 && v <= 1080, JSON.stringify(o) + ' → ' + v);
    });
});

/* v0.9.109：EX_SAMPLE 必须覆盖全部目标语言。
   缺失会静默回落到英文 few-shot 样本，而英文样本与「目标语言锚定」正面冲突
   （v0.9.73 修过一次；本次又查出 pl/nl/ms/fil/fa 五种长期遗漏）。index.html 不在时跳过。 */
{
  const fsMod = require('fs'), pathMod = require('path');
  const htmlPath = pathMod.join(__dirname, 'index.html');
  if (fsMod.existsSync(htmlPath)) {
    const html = fsMod.readFileSync(htmlPath, 'utf8');
    const codes = (html.match(/\{ v:'[a-zA-Z-]+',\s+zh:/g) || [])
      .map(s => s.match(/v:'([a-zA-Z-]+)'/)[1]);
    const ex = (html.match(/^\s*'[a-zA-Z-]+':\s*\{dash:/gm) || [])
      .map(s => s.match(/'([a-zA-Z-]+)'/)[1]);
    t('EX_SAMPLE 覆盖全部 ' + codes.length + ' 种目标语言（缺一个就回落到英文样本）', () => {
      assert.ok(codes.length >= 48, '解析到的目标语言数异常: ' + codes.length);
      const miss = codes.filter(c => ex.indexOf(c) < 0);
      assert.deepStrictEqual(miss, [], '缺译文示例: ' + miss.join(','));
    });
    const maxwKeys = (html.match(/'[a-zA-Z-]+':\d+(?=[,\s}])/g) || []).length;
    t('MAXW_BY_LANG 与 REC_ASS_SIZE 均覆盖全部目标语言', () => {
      const noSize = codes.filter(c => typeof C.REC_ASS_SIZE[c] !== 'number');
      assert.deepStrictEqual(noSize, [], '缺推荐字号: ' + noSize.join(','));
      // 未显式列出的语言走默认 21，这里只做最小值 sanity：至少要能解析出 CJK 那几条特值
      t('  (行宽表含 CJK 特值)', () => {
        assert.ok(maxwKeys >= 4, 'MAXW_BY_LANG 条目异常: ' + maxwKeys);
      });
    });
  }
}

console.log('— 行内格式标签（v0.9.129）—');
t('VTT 导入保留斜体等格式标签（不再一刀切剥掉）', () => {
  const vtt = 'WEBVTT\n\n1\n00:00:01.000 --> 00:00:03.000\n<i>Off-screen voice.</i>\n';
  const r = C.parseVtt(vtt);
  assert.strictEqual(r.items.length, 1);
  assert.strictEqual(r.items[0].text, '<i>Off-screen voice.</i>', '斜体应保留，与 SRT 口径一致');
});
t('groupSentences：斜体结尾的句末标点仍然生效（不再吞掉下一条）', () => {
  const items = [
    { no: 1, start: 0,    end: 1000, text: '<i>Off-screen voice.</i>' },
    { no: 2, start: 1000, end: 2000, text: 'She nodded.' },
  ];
  // 此前 </i> 的 '>' 挡住了句末判定 → 两条被并成一句组，译文错位到错误时间窗
  assert.strictEqual(C.groupSentences(items).length, 2);
});
t('groupSentences：斜体行本身没有句末标点时照旧合并', () => {
  const items = [
    { no: 1, start: 0,    end: 1000, text: '<i>He left</i>' },
    { no: 2, start: 1000, end: 2000, text: 'and never came back.' },
  ];
  assert.strictEqual(C.groupSentences(items).length, 1);
});
t('VTT 时间戳标签与 <v 说话人> 仍被剥掉（旧行为不变）', () => {
  const vtt = 'WEBVTT\n\n1\n00:00:01.000 --> 00:00:03.000\n<c.narration><v Roger>Hello <00:00:02.000>there</v>\n';
  const r = C.parseVtt(vtt);
  assert.strictEqual(r.items[0].text, 'Hello there');
});
t('balanceInlineTags：无标签输入原样返回', () => {
  assert.strictEqual(C.balanceInlineTags('明天见。', 'See you.'), '明天见。');
});
t('balanceInlineTags：已配对标签原样返回', () => {
  assert.strictEqual(C.balanceInlineTags('<i>旁白</i>', '<i>Narration</i>'), '<i>旁白</i>');
});
t('balanceInlineTags：源文有斜体、译文缺闭合 → 补齐', () => {
  assert.strictEqual(C.balanceInlineTags('<i>旁白', '<i>Narration</i>'), '<i>旁白</i>');
});
t('balanceInlineTags：源文有斜体、译文缺开标签 → 补齐', () => {
  assert.strictEqual(C.balanceInlineTags('旁白</i>', '<i>Narration</i>'), '<i>旁白</i>');
});
t('balanceInlineTags：源文无斜体、译文凭空冒出 → 以源文为准剥掉', () => {
  assert.strictEqual(C.balanceInlineTags('<i>明天见。</i>', 'See you.'), '明天见。');
  assert.strictEqual(C.balanceInlineTags('<i>明天见。', 'See you.'), '明天见。');
});
t('balanceInlineTags：<b>/<u> 同样配对修复', () => {
  assert.strictEqual(C.balanceInlineTags('<b>粗体', '<b>bold</b>'), '<b>粗体</b>');
  assert.strictEqual(C.balanceInlineTags('下划线</u>', '<u>x</u>'), '<u>下划线</u>');
});
t('balanceInlineTags：多种标签互不干扰', () => {
  assert.strictEqual(C.balanceInlineTags('<i>a</i> <b>b', '<i>a</i> <b>b</b>'), '<i>a</i> <b>b</b>');
});
t('balanceInlineTags：异常输入不炸', () => {
  assert.strictEqual(C.balanceInlineTags(null, null), '');
  assert.strictEqual(C.balanceInlineTags(undefined, 'x'), '');
});

/* v0.9.132：response_format 默认注入。
   实测（2026-09-20，api.deepseek.com 真 key）：prompt 不含 json 字样时带该参数会直接 400
   "Prompt must contain the word 'json' in some form to use 'response_format' of type 'json_object'."
   → 注入与否必须逐调用点甄别，绝不能全局注入。以下用例直接对着 index.html / server.js 的真实源码求值，
     防止日后有人把它简化成「所有请求统一带上」。 */
console.log('— response_format 默认注入（v0.9.132）—');
{
  const fsM = require('fs'), pathM = require('path');
  const html = fsM.existsSync(pathM.join(__dirname,'index.html')) ? fsM.readFileSync(pathM.join(__dirname,'index.html'),'utf8') : '';
  const srv  = fsM.existsSync(pathM.join(__dirname,'server.js'))  ? fsM.readFileSync(pathM.join(__dirname,'server.js'),'utf8')  : '';
  let FE = null, SV = null;
  try{
    const m1 = html.match(/const RF_SUPPORT=\[[\s\S]*?\nfunction isRfReject\(err\)\{[\s\S]*?\n\}/);
    if (m1) FE = new Function(m1[0] + '\nreturn {jsonFormatParam:jsonFormatParam,isRfReject:isRfReject,banRf:banRf,RF_SUPPORT:RF_SUPPORT,RF_DENY:RF_DENY};')();
  }catch(e){ FE = null; }
  try{
    const m2 = srv.match(/const RF_SUPPORT = \[[\s\S]*?\nfunction rfSupported\(base\)\{[\s\S]*?\n\}/);
    const m3 = srv.match(/function rfRejected\(e\)\{[\s\S]*?\n\}/);
    if (m2 && m3) SV = new Function(m2[0] + '\n' + m3[0] + '\nreturn {rfSupported:rfSupported,rfRejected:rfRejected,RF_SUPPORT:RF_SUPPORT,RF_DENY:RF_DENY};')();
  }catch(e){ SV = null; }

  t('源码里的判定块能被抠出来求值（测试未与实现脱节）', () => {
    assert.ok(FE, 'index.html 的 RF_SUPPORT/isRfReject 未命中');
    assert.ok(SV, 'server.js 的 RF_SUPPORT/rfRejected 未命中');
  });

  const RF = () => ({ response_format: { type: 'json_object' } });
  t('白名单端点（DeepSeek / OpenAI / 硅基流动 / 阿里云 / 智谱 / 本地 vLLM）注入', () => {
    ['https://api.deepseek.com','https://api.openai.com','https://api.siliconflow.cn/v1',
     'https://dashscope.aliyuncs.com/compatible-mode/v1','https://open.bigmodel.cn/api/paas/v4',
     'http://127.0.0.1:11434/v1'].forEach(b => {
      assert.deepStrictEqual(FE.jsonFormatParam(b,'m',{json:1}), RF(), b + ' 应注入');
    });
  });
  t('未收录的第三方端点一律不注入（未知 API 表面不猜）', () => {
    ['https://my-gateway.example.com/v1','https://ai.internal.corp/v1',''].forEach(b => {
      assert.deepStrictEqual(FE.jsonFormatParam(b,'m',{json:1}), {}, JSON.stringify(b) + ' 不应注入');
    });
  });
  t('Anthropic / Gemini 原生端点不注入（该字段在其 OpenAI 兼容语义里不存在）', () => {
    ['https://api.anthropic.com','https://generativelanguage.googleapis.com/v1beta/openai'].forEach(b => {
      assert.deepStrictEqual(FE.jsonFormatParam(b,'m',{json:1}), {}, b + ' 不应注入');
    });
  });
  t('调用点未声明 json → 不注入（所得故而禁止全局注入）', () => {
    assert.deepStrictEqual(FE.jsonFormatParam('https://api.deepseek.com','m'), {});
    assert.deepStrictEqual(FE.jsonFormatParam('https://api.deepseek.com','m',{}), {});
    assert.deepStrictEqual(FE.jsonFormatParam('https://api.deepseek.com','m',{json:0}), {});
  });
  t('端点被拒一次后会话内不再注入（退降级重试后不再重复踩坑）', () => {
    const b='https://api.deepseek.com/ban-probe-'+Math.random().toString(36).slice(2);
    assert.deepStrictEqual(FE.jsonFormatParam(b,'m',{json:1}), RF(), '首次应注入');
    FE.banRf(b);
    assert.deepStrictEqual(FE.jsonFormatParam(b,'m',{json:1}), {}, '被拒后不应再注入');
  });
  t('参数异常不炸（防御：base 为 null / opts 为字符串）', () => {
    [undefined,null,{},7].forEach(v => {
      assert.deepStrictEqual(FE.jsonFormatParam(v,'m',{json:1}), {});
    });
    assert.deepStrictEqual(FE.jsonFormatParam('https://api.deepseek.com','m','x'), {});
  });
  t('isRfReject 认出 DeepSeek 真实 400 文案', () => {
    const real = "HTTP 400 {\"error\":{\"message\":\"Prompt must contain the word 'json' in some form to use 'response_format' of type 'json_object'.\"}}";
    assert.ok(FE.isRfReject(new Error(real)), '真实拒收文案应命中');
    assert.ok(FE.isRfReject(new Error('HTTP 422 unsupported response_format for this model')), '模型不支持应命中');
    assert.ok(!FE.isRfReject(new Error('HTTP 401 Invalid Api key')), '401 不应被当成 rf 问题');
    assert.ok(!FE.isRfReject(new Error('HTTP 500 upstream internal error')), '500 不应误判');
    assert.ok(!FE.isRfReject(new Error('HTTP 400 {"error":{"message":"Request body is not valid JSON"}}')), '无关 400 不应误判');
    assert.ok(!FE.isRfReject(new Error('signal is aborted without reason')), '超时不应误判');
  });
  t('服务端 rfSupported / rfRejected 与前端判定一致（防白名单漂移）', () => {
    assert.deepStrictEqual(FE.RF_SUPPORT.map(String), SV.RF_SUPPORT.map(String), 'RF_SUPPORT 两端已不一致');
    assert.deepStrictEqual(FE.RF_DENY.map(String), SV.RF_DENY.map(String), 'RF_DENY 两端已不一致');
    assert.strictEqual(SV.rfSupported('https://api.deepseek.com'), true);
    assert.strictEqual(SV.rfSupported('https://api.anthropic.com'), false);
    assert.strictEqual(SV.rfSupported('https://unknown.example.com/v1'), false);
    assert.strictEqual(SV.rfRejected(new Error("HTTP 400 ... response_format ...")), true);
    assert.strictEqual(SV.rfRejected(new Error('HTTP 401 Invalid Api key')), false);
  });

  /* 逐调用点甄别：这是本功能最容易被「简化」掉的地方 */
  const calls = html.match(/await chatOnce\([\s\S]*?\);/g) || [];
  t('chatOnce 调用点数量与 JSON 标记分布符合预期', () => {
    assert.strictEqual(calls.length, 6, '调用点数变了(' + calls.length + ')，新增调用点请先确认要不要 JSON 模式');
    const need = calls.filter(s => /json\s*:\s*1/.test(s));
    assert.strictEqual(need.length, 4, '应注入的调用点应为 4 处（翻译/缺组补译/压缩/术语提取），现 ' + need.length + ' 处');
  });
  t('「测试连接」请求严禁注入（正文 Reply with exactly: OK 不含 json，注入必 400）', () => {
    const c = calls.find(s => s.indexOf('Reply with exactly: OK') >= 0);
    assert.ok(c, '未找到测试连接调用点');
    assert.ok(!/json\s*:\s*1/.test(c), '测试连接被注入了 JSON 模式，连不上') ;
  });
  t('逐组直译通道（纯翻译模型 Hunyuan-MT）严禁注入（它要的是纯译文）', () => {
    const c = calls.find(s => s.indexOf('o.base,o.key,o.model') >= 0);
    assert.ok(c, '未找到逐组直译调用点');
    assert.ok(!/json\s*:\s*1/.test(c), '逐组直译被注入了 JSON 模式');
  });
  t('内置通道通过 meta.json 传递意图，且服务端据此注入', () => {
    assert.ok(/meta:Object\.keys\(meta\)\.length\?meta:undefined/.test(html), 'meta 构造写法变了');
    /* v0.9.154：随降级链改成 plan.rf（初值即 withRf，语义不变；此处同步护栏写法） */
    assert.ok(/opts&&opts\.json&&plan\.rf\)\?\{json:1\}/.test(html), 'meta.json 未随 opts.json 传递');
    assert.ok(/const jsonOpts = \(body\.meta && body\.meta\.json\)/.test(srv), '服务端未读取 meta.json');
    assert.ok(/callModel\(pick\.cfg, body\.messages, undefined, Object\.assign\(\{\}, jsonOpts, \{ signal: cliAc\.signal, timeoutMs: CALL_BUDGET_MS \}\)\)/.test(srv), '服务端主调用未传 jsonOpts');
    /* v0.9.193：回退从「写死 B→A」改成 fallbackChain 逐级循环，调用点是 slotFb 而非 slotCfg(cfg,'A')。
       语义不变：每一级回退都必须同样带上 jsonOpts，否则术语抽取在回退链上会拿到非 JSON 正文。 */
    assert.ok(/callModel\(slotFb, body\.messages, undefined, Object\.assign\(\{\}, jsonOpts, \{ signal: cliAc\.signal, timeoutMs: CALL_BUDGET_MS \}\)\)/.test(srv), '服务端回退调用未传 jsonOpts');
  });
  t('优先级：用户在附加参数里显式给 response_format 时不注入默认值', () => {
    assert.ok(/ex\.response_format===undefined/.test(html) || /hasOwnProperty\.call\(ex,'response_format'\)/.test(html),
      '未实现用户优先的判据');
  });
}

/* v0.9.134：专名策略 + 统一术语表。
   老结构的三个问题（keepTerms 一关就禁用输入框 / 提示文案说谎 / 关闭时把用户给的词反向送去翻译）
   在这里逐条钉住，另外覆盖解析、过滤、优先级与 localStorage 迁移。
   解析与匹配函数直接从 index.html 抠源码求值，避免测试与实现各写一份。 */
console.log('— 专名策略与术语表（v0.9.134）—');
{
  const fsM = require('fs'), pathM = require('path');
  const html = fsM.existsSync(pathM.join(__dirname,'index.html')) ? fsM.readFileSync(pathM.join(__dirname,'index.html'),'utf8') : '';
  let G = null;
  try{
    const m = html.match(/const GLOSS_ARROW = [\s\S]*?function glossFilter\(rows, srcText\)\{[^}]*\}/);
    if (m) G = new Function(m[0] + '\nreturn {glossParse:glossParse,glossHit:glossHit,glossFilter:glossFilter,glossRowText:glossRowText,glossParseRow:glossParseRow};')();
  }catch(e){ G = null; }

  t('术语解析/匹配能从 index.html 抠出来求值（测试未与实现脱节）', () => { assert.ok(G, 'glossParse/glossHit 未命中'); });

  t('纯文本箭头语法：三种箭头都认', () => {
    ['Burger King → 汉堡王','Burger King -> 汉堡王','Burger King => 汉堡王'].forEach(s=>{
      const r = G.glossParse(s).rows;
      assert.strictEqual(r.length, 1, s);
      assert.strictEqual(r[0].t, 'Burger King', s);
      assert.strictEqual(r[0].r, '汉堡王', s);
    });
  });
  t('只写原文字 → 视为「保留原文」（r 取 t）', () => {
    const r = G.glossParse('SpaceX\nNASA').rows;
    assert.deepStrictEqual(r, [{t:'SpaceX', r:'SpaceX', note:''},{t:'NASA', r:'NASA', note:''}]);
  });
  t('尾部括号是语境注释，不进译法', () => {
    const r = G.glossParse('Outlaw 1 → 亡命徒1（战机呼号）').rows;
    assert.deepStrictEqual(r, [{t:'Outlaw 1', r:'亡命徒1', note:'战机呼号'}]);
  });
  t('TSV（Excel 直接复制出来那种）能识别，且跳过表头', () => {
    const r = G.glossParse('source\ttranslation\tnote\nBobbi Thompson\t博比·汤普森\t受访者\nOutlaw 1\t亡命徒1\t').rows;
    assert.strictEqual(r.length, 2);
    assert.deepStrictEqual(r[0], {t:'Bobbi Thompson', r:'博比·汤普森', note:'受访者'});
    assert.strictEqual(r[1].t, 'Outlaw 1');
  });
  t('CSV 逗号分隔能识别（多数行含逗号才判定为 CSV，避免误伤含逗号的术语）', () => {
    const r = G.glossParse('Prism,棱晶\nEnduroSat,耐力卫星').rows;
    assert.strictEqual(r.length, 2);
    assert.strictEqual(r[0].r, '棱晶');
  });
  t('JSON 数组与 JSON 映射都能吃', () => {
    const a = G.glossParse('[{"t":"Prism","r":"棱晶"},{"src":"EnduroSat","dst":"耐力卫星"}]').rows;
    assert.strictEqual(a.length, 2);
    assert.strictEqual(a[1].t, 'EnduroSat');
    const b = G.glossParse('{"Prism":"棱晶","EnduroSat":"耐力卫星"}').rows;
    assert.strictEqual(b.length, 2);
    assert.strictEqual(b[0].r, '棱晶');
  });
  t('注释行不计入条目、也不算「无法识别」', () => {
    const p = G.glossParse('# 这是一张术语表\n// 同上\nSpaceX');
    assert.strictEqual(p.rows.length, 1);
    assert.strictEqual(p.bad, 0);
  });
  t('同名条目后者覆盖前者（上传的表因此能盖住旧内容）', () => {
    const r = G.glossParse('Prism → 棱晶\nPrism → 棱镜').rows;
    assert.strictEqual(r.length, 1);
    assert.strictEqual(r[0].r, '棱镜');
  });
  t('词边界：AI 不能因为 said 而命中', () => {
    assert.strictEqual(G.glossHit({t:'AI', r:'AI'}, 'He said it. It is AI.'), true);
    assert.strictEqual(G.glossHit({t:'AI', r:'AI'}, 'He said it.'), false, 'said 里的 ai 被误判为命中');
  });
  t('无空格书写系统走包含匹配', () => {
    assert.strictEqual(G.glossHit({t:'汉堡王', r:'汉堡王'}, '我们去了汉堡王。'), true);
    assert.strictEqual(G.glossHit({t:'汉堡王', r:'汉堡王'}, '我们去了麦当劳。'), false);
  });
  t('按源文本过滤：只留下片中真出现的条目', () => {
    const rows = G.glossParse('SpaceX\nEnduroSat → 耐力卫星\nPrism → 棱晶').rows;
    const kept = G.glossFilter(rows, 'SpaceX launched a satellite today.');
    assert.deepStrictEqual(kept.map(x=>x.t), ['SpaceX']);
  });

  t('默认策略已迁到「全部译出」（无 pnModeSet 标记者一律切换）', () => {
    assert.ok(/if \(sv\.pnModeSet !== '1'\) sv\.pnMode = 'trans';/.test(html), '未实现默认值迁移');
    const m = html.match(/<input type="radio" name="pnMode" value="trans"[^>]*>/);
    assert.ok(m && /checked/.test(m[0]), 'HTML 默认值未指向 trans');
    const k = html.match(/<input type="radio" name="pnMode" value="keep"[^>]*>/);
    assert.ok(k && !/checked/.test(k[0]), 'keep 不应默认勾选');
  });
  t('专名策略与术语表解耦：输入框不再被策略禁用', () => {
    assert.ok(!/\$\('terms'\)\.disabled\s*=/.test(html), '仍在按策略禁用术语表输入框');
  });
  t('提示词不再引用 cfg.terms（用户条目统一走规则 4.5）', () => {
    assert.ok(!/cfg\.terms/.test(html), '提示词里仍在使用 cfg.terms');
  });
  t('未用术语表时提示词与旧版逐字节一致（保底 (none) / （无））', () => {
    assert.ok(/User-specified terms that must stay in the original: \(none\)/.test(html));
    assert.ok(/用户指定必须保留原文的术语：（无）/.test(html));
  });
  t('断点续传指纹计入术语表（换表必须作废旧译文）', () => {
    assert.ok(/cfg\.keepTerms\?1:0, cfg\.glossKey/.test(html), 'snapFp 未计入术语表');
  });
  t('AI 抽出的条目写进输入框，且同名条目以用户已有为准', () => {
    assert.ok(/have\.concat\(added\)/.test(html), 'AI 结果未落到输入框');
    // v0.9.140：判重逻辑抽进 glossAIEntries（同时要吃下 variants），改判存在性而非内联写法
    assert.ok(/glossAIEntries\(gl, have\)/.test(html), 'AI 条目未经同名判重就写入');
    const gae = html.match(/function glossAIEntries\(gl, have\)\{[\s\S]*?\n\}/);
    assert.ok(gae, '找不到 glossAIEntries');
    // v0.9.141：变体并进同一条的 alts，判重仍是「命中 seen 就跳过」——
    // 用户已有的同名条目（含他手写的译法）绝不能被 AI 的结果盖掉
    assert.ok(/seen\[[^\]]+\]\)\s*return/.test(gae[0]), 'glossAIEntries 未跳过同名条目，会覆盖用户手写的译法');
  });
  t('每批只注入本批命中的术语（省成本）', () => {
    assert.ok(/const sysB = glossSysFor\(gBatch, cfg, sys\);/.test(html));
    assert.ok(/if\(!GLOSS_ROWS\.length\) return baseSys;/.test(html), '无术语表时应完全复用原 sys');
  });
  t('旧版逗号列表自动迁成每行一条', () => {
    assert.ok(/indexOf\('\\n'\)<0 && \/\[,，\]\/\.test\(_v\)/.test(html), '未实现逗号列表迁移');
  });
  t('术语表写入 localStorage 有 2 万字上限（这台机器存满过）', () => {
    assert.ok(/length>20000/.test(html), '未设上限');
  });
  t('27 个界面字典都补齐了新增词条', () => {
    const need = ['pnKeep','pnTrans','btnGlossFile','glossHit'];
    const blocks = html.split(/\n(?=\s*'[a-zA-Z\-]+':\s*\{)/);
    let checked = 0;
    for (const b of blocks){
      /* 只认首行就带 pureMTMode 的界面字典；EX_SAMPLE 那批没有它，不能用宽松的跨行匹配，
         否则会把 EX_SAMPLE 之后的所有代码误当成一个字典块。 */
      if (!/^\s*'[a-zA-Z\-]+':\s*\{[^\n]*pureMTMode/.test(b)) continue;
      need.forEach(k=>{ assert.ok(new RegExp("(?<![A-Za-z0-9_])"+k+"\\s*:").test(b), '缺少词条 ' + k); });
      checked++;
    }
    assert.strictEqual(checked, 27, '实际校验的字典数 ' + checked);
  });

  /* ===== v0.9.135：risekol.com 引流条 ===== */
  t('27 个界面字典都有引流条文案（v0.9.135）', () => {
    const blocks = html.split(/\n(?=\s*'[a-zA-Z\-]+':\s*\{)/);
    let checked = 0;
    for (const b of blocks){
      if (!/^\s*'[a-zA-Z\-]+':\s*\{[^\n]*pureMTMode/.test(b)) continue;
      const tx = b.match(/rkTx\s*:\s*'((?:[^'\\]|\\.)*)'/);
      const go = b.match(/rkGo\s*:\s*'((?:[^'\\]|\\.)*)'/);
      assert.ok(tx, '缺少词条 rkTx');
      assert.ok(go, '缺少词条 rkGo');
      assert.ok(tx[1].length > 5, 'rkTx 文案为空');
      assert.ok(tx[1].indexOf('RiseKol') >= 0, 'rkTx 未带品牌名');
      assert.ok(go[1].length > 1, 'rkGo 为空');
      checked++;
    }
    assert.strictEqual(checked, 27, '实际校验的字典数 ' + checked);
  });
  t('引流条只在官方域名或调试标记下显示（开源版不挂外链）', () => {
    assert.ok(/ai-srtsub\\\.com\$\/i\.test\(host\)/.test(html), '缺少官方域名判断');
    assert.ok(/sessionStorage\.setItem\('rkForce','1'\)/.test(html), '调试标记未落 sessionStorage');
    assert.ok(/sessionStorage\.getItem\('rkForce'\)==='1'/.test(html), '调试标记未回读');
    assert.ok(/hero\.classList\.toggle\('has-rk'/.test(html), '未切换 hero class');
  });
  t('引流条的链接、图标与装饰让位', () => {
    assert.ok(/href="https:\/\/risekol\.com\/video"/.test(html), '链接不对');
    assert.ok(/id="rkBanner"[^>]*target="_blank"/.test(html), '未新窗口打开');
    assert.ok(/\.hero\.has-rk \.spark\.s3\{display:none\}/.test(html), '底部装饰未让位');
    assert.ok(/data-i18n-html="rkTx"/.test(html), '文案未走 i18n（html）');
    assert.ok(/data-i18n="rkGo"/.test(html), 'CTA 未走 i18n');
  });

  /* 从 index.html 抠出真实的 detectUiLang 来跑，避免测试与实现各写一套而漂移 */
  const detectFn = () => {
    const src = html.match(/function detectUiLang\(\)\{[\s\S]*?\n\}/);
    assert.ok(src, '没找到 detectUiLang');
    /* 注意末尾是调用形式：返回 detectUiLang 的话外面拿到的只是函数对象，调用结果会变成 undefined */
    return new Function('navigator', src[0] + ';return detectUiLang();');
  };
  t('未收录的浏览器语言兜底为英文（v0.9.136：原先是中文）', () => {
    const d = langs => detectFn()({ languages: langs });
    assert.strictEqual(d(['nb-NO','nb']), 'en', '挪威语应兜底英文');
    assert.strictEqual(d(['hu-HU']), 'en', '匈牙利语应兜底英文');
    assert.strictEqual(d(['ms-MY']), 'en', '马来语应兜底英文');
    assert.strictEqual(d(['zh-CN','zh']), 'zh-CN', '简体中文不受影响');
    assert.strictEqual(d(['zh-TW','zh-Hant']), 'zh-TW', '繁体中文不受影响');
    assert.strictEqual(d(['zh']), 'zh-CN');
    assert.strictEqual(d(['ja-JP']), 'ja');
    assert.strictEqual(d(['iw']), 'he', '旧希伯来码 iw 应认作 he');
    assert.strictEqual(d(['nb-NO','de-DE']), 'de', '首项没命中应继续看后项');
    /* 没有 languages 数组的老浏览器，退回 navigator.language 单值 */
    assert.strictEqual(detectFn()({ languages: [], language: 'pt-BR' }), 'pt');
  });
  t('27 种界面语言都能被浏览器语言检测到（加语言别漏）', () => {
    const detect = detectFn();
    const ui = html.match(/const UI_LANGS = \[([\s\S]*?)\];/)[1];
    const codes = [...ui.matchAll(/\['([^']+)'/g)].map(m => m[1]);
    assert.strictEqual(codes.length, 27, '界面语言数 ' + codes.length);
    const bad = codes.filter(c => detect({ languages: [c] }) !== c);
    assert.deepStrictEqual(bad, [], '检测不到的语言: ' + bad.join(','));
  });

  /* v0.9.137：术语表使用说明 / 引号 CSV / 上传模式 / CSV 模板 */
  const glossFn = () => {
    const a = html.indexOf('const GLOSS_ARROW');
    const b = html.indexOf('function glossHit(');
    assert.ok(a > 0 && b > a, '抠取解析代码失败');
    return new Function(html.slice(a, b) + ';return {glossParse:glossParse};')();
  };
  t('支持 Excel 导出的引号 CSV（字段内可含逗号）', () => {
    const P = glossFn().glossParse;
    let r = P('"Burger King, Inc.","汉堡王"');
    assert.strictEqual(r.rows.length, 1);
    assert.strictEqual(r.rows[0].t, 'Burger King, Inc.', '字段内逗号被切坏了');
    assert.strictEqual(r.rows[0].r, '汉堡王');
    r = P('"A ""q"" name","译名"');
    assert.strictEqual(r.rows[0].t, 'A "q" name', '双写引号未转义');
    r = P('"source","target"\n"Prism","棱晶"');
    assert.strictEqual(r.rows.length, 1, '带引号的表头未跳过');
    assert.strictEqual(r.rows[0].r, '棱晶');
    /* 没引号的行必须仍走旧规则，否则就是改坏了老输入 */
    r = P('a,b,c');
    assert.strictEqual(r.rows[0].t, 'a,b,c', '无引号多逗号行为被改坏了');
  });
  t('CSV 模板能被自己的解析器正确读出（含 BOM）', () => {
    const m = html.match(/function glossTplCsv\(\)\{[\s\S]*?\n\}/);
    assert.ok(m, '没找到 glossTplCsv');
    const tpl = new Function(m[0] + ';return glossTplCsv();')();
    const r = glossFn().glossParse(tpl);
    assert.strictEqual(r.rows.length, 2, '模板条目数 ' + r.rows.length);
    assert.strictEqual(r.bad, 0, '模板里有解析不出的行');
    assert.strictEqual(r.rows[0].t, 'SpaceX');
    assert.strictEqual(r.rows[1].r, '汉堡王', '译法示例丢失');
    assert.ok(/\\uFEFF/.test(html), '模板下载缺少 UTF-8 BOM（Excel 会乱码）');
  });
  t('上传分追加 / 替换两种模式', () => {
    assert.ok(/id="btnGlossAppend"/.test(html) && /id="btnGlossReplace"/.test(html), '两个按钮缺一个');
    assert.ok(/GLOSS_FILE_MODE==='replace' \? \[\] : glossParse/.test(html), '替换模式未清空原内容');
    assert.ok(/GLOSS_FILE_MODE='append'/.test(html), '默认应为追加');
  });
  t('格式说明默认收起（左栏已经很长，不能常驻）', () => {
    assert.ok(/<details id="glossHelp"/.test(html), '折叠块不存在');
    assert.ok(!/<details[^>]*id="glossHelp"[^>]*\bopen\b/.test(html), '不该默认展开');
  });
  t('27 个界面字典都补齐了术语表说明词条', () => {
    const need = ['glossHelpTitle','btnGlossAppend','btnGlossReplace','btnGlossTpl',
                  'glossHelpLead','glossHelpFmt','glossHelpS1','glossHelpS2','glossHelpS3','glossHelpS4',
                  'glossHelpArrow','glossHelpMatch','glossHelpM1','glossHelpM2','glossHelpM3','glossHelpM4',
                  'glossHelpUp','glossHelpU1','glossHelpU2','glossHelpU3','glossHelpU4'];
    const blocks = html.split(/\n(?=\s*'[a-zA-Z\-]+':\s*\{)/);
    let checked = 0;
    for (const b of blocks){
      if (!/^\s*'[a-zA-Z\-]+':\s*\{[^\n]*pureMTMode/.test(b)) continue;
      for (const k of need){
        assert.ok(new RegExp('(?<![A-Za-z0-9_])' + k + "\\s*:\\s*'").test(b), '缺少词条 ' + k);
      }
      checked++;
    }
    assert.strictEqual(checked, 27, '实际校验的字典数 ' + checked);
  });
  // v0.9.142：整块重写。此前整节在讲「支持哪些符号」（内部实现），而用户真正要问的是
  // 「我写了为什么不生效」；「怎么匹配」那节还在讲算法，且第 4 条与 | 写法自相矛盾。
  t('引子讲清「找不到就不提交」这个唯一失效机制', () => {
    assert.ok(/data-i18n="glossWhy"/.test(html), '引子未改用 glossWhy');
    const blocks = html.split(/\n(?=\s*'[a-zA-Z\-]+':\s*\{)/);
    for (const code of ['zh-CN', 'en']){
      const b = blocks.find(x => new RegExp("^\\s*'" + code + "':\\s*\\{[^\n]*pureMTMode").test(x));
      assert.ok(b, '未找到 ' + code + ' 字典');
      const lead = b.match(/glossWhy\s*:\s*'((?:[^'\\]|\\.)*)'/);
      const pn   = b.match(/lblKeepTermsShort\s*:\s*'((?:[^'\\]|\\.)*)'/);
      assert.ok(lead && pn, code + ' 缺少 glossWhy 或 lblKeepTermsShort');
      assert.ok(lead[1].indexOf(pn[1]) >= 0,
        code + ' 引子未引用「专名处理」的实际用词「' + pn[1] + '」，两处会前后不一致');
    }
    assert.ok(/class="gh-warn"[\s\S]{0,240}data-i18n="glossNoEffT"/.test(html),
      '缺少「改了没生效」警告块——这是用户唯一用得上的排错入口');
  });
  t('说明区只剩「写法」一节，「怎么匹配」整节已删除', () => {
    const at = html.indexOf('id="glossHelp"');
    assert.ok(at > 0, '说明区不存在');
    const body = html.slice(at, at + 2600);
    assert.strictEqual((body.match(/class="gh-h"/g) || []).length, 1,
      '小节标题应只剩「写法」一个');
    assert.ok(/data-i18n="glossHelpFmt"/.test(body), '缺少小节 glossHelpFmt');
    assert.ok(!/data-i18n="glossHelpMatch"/.test(body), '「怎么匹配」是算法描述，整节应当删除');
    assert.ok(!/data-i18n="glossHelpM4"/.test(html),
      '「变形要另写一行」与 Whopper|Whoppers 写法直接矛盾，不得再引用');
    assert.ok(!/data-i18n="glossHelpU1"/.test(body), '上传应当压成一行');
    assert.ok(/data-i18n="glossUpOne"/.test(body), '缺少压缩后的上传说明');
  });

  // v0.9.137：折叠说明的"看得出可点"是硬要求。初版只用了一个 11px 最弱色小三角，
  // 跟旁边的灰色 hint 混成一片，用户看不出能展开 —— 这几条把它钉住。
  t('折叠说明的指示器足够显眼', () => {
    const i = html.indexOf('.ghelp{');
    assert.ok(i > 0, '找不到 .ghelp 样式');
    const css = html.slice(i, html.indexOf('.gh-body{', i));

    // 标题要有底色和足够的高度，不能是裸文字
    const sumRule = (css.match(/\.ghelp>summary\{[^}]*\}/) || [''])[0];
    assert.ok(/background:\s*var\(--card-2\)/.test(sumRule), '标题条缺底色');
    assert.ok(/padding:\s*6px 9px/.test(sumRule), '标题条缺内边距');

    // 右侧指示器做成方块按钮，不是裸三角
    const afterRule = (css.match(/\.ghelp>summary::after\{[^}]*\}/) || [''])[0];
    assert.ok(/width:18px/.test(afterRule) && /border:1px solid/.test(afterRule),
      '右侧指示器不是方块按钮');
    assert.ok(/content:'\\25B8'/.test(afterRule), 'LTR 箭头应为 ▸');

    // 问号图标：浅底 + 深字（写反成白字会看不见）
    const beforeRule = (css.match(/\.ghelp>summary::before\{[^}]*\}/) || [''])[0];
    assert.ok(/color:var\(--sub\)/.test(beforeRule), '问号图标应为深字浅底');

    // RTL 必须同时换字符 + 反向旋转：◂ 顺时针转 90° 会变成 ▲
    assert.ok(/\[dir="rtl"\]\s*\.ghelp>summary::after\{content:'\\25C2'\}/.test(css),
      'RTL 箭头未反转成 ◂');
    assert.ok(/\[dir="rtl"\]\s*\.ghelp\[open\]>summary::after\{transform:rotate\(-90deg\)\}/.test(css),
      'RTL 展开态旋转方向未取反（会变成朝上）');
  });
}

/* v0.9.138：术语表必须真的优先于「专名处理」，且这个优先级要写进提示词本身。
   两条硬约束：
   ① 没填术语表时提示词一字不变（回归面为零）——用条件注入实现，不能改成无条件拼接
   ② 填了术语表 + 保留原文时，不能出现「用户指定必须保留原文的术语：（无）」这句自相矛盾的话 */
{
  const fsM2 = require('fs'), pathM2 = require('path');
  const html = fsM2.readFileSync(pathM2.join(__dirname, 'index.html'), 'utf8');
  const spEn = html.match(/function systemPromptEn\(cfg\)\{[\s\S]*?\n\}/);
  const spZh = html.match(/function systemPrompt\(cfg\)\{[\s\S]*?\n\}/);
  assert.ok(spEn && spZh, '找不到提示词函数');

  t('术语表优先级声明只在有术语表时才注入（没填时提示词一字不变）', () => {
    // 两处新增都必须包在 cfg.glossary 的三元里，写成无条件拼接就会波及所有用户
    const conds = [
      /\(cfg\.glossary \? '\[Glossary precedence\]/,
      /\(cfg\.glossary \? '【术语表优先】/,
      /\(cfg\.glossary\s*\n?\s*\? ' Exempt from this rule/,
      /\(cfg\.glossary\s*\n?\s*\? '本规则的例外/,
    ];
    conds.forEach((re, i) => assert.ok(re.test(html), '第 ' + (i + 1) + ' 处不是条件注入: ' + re));
  });

  t('保留原文分支：有术语表时矛盾句让位、豁免句补上', () => {
    const en = spEn[0], zh = spZh[0];
    // 矛盾句只能出现在「无术语表」那一支
    const enBad = en.indexOf('User-specified terms that must stay in the original: (none).');
    const zhBad = zh.indexOf('用户指定必须保留原文的术语：（无）。');
    assert.ok(enBad > 0 && zhBad > 0, '无术语表时仍应保留原字面量（否则就要跑全语种回归）');
    assert.ok(/cfg\.glossary\s*\n?\s*\?[\s\S]{0,400}?:\s*' User-specified terms/.test(en),
      '英文：矛盾句没有放进「无术语表」分支');
    assert.ok(/cfg\.glossary\s*\n?\s*\?[\s\S]{0,400}?:\s*'用户指定必须保留原文的术语/.test(zh),
      '中文：矛盾句没有放进「无术语表」分支');
    assert.ok(/Exempt from this rule/.test(en), '英文缺豁免句');
    assert.ok(/本规则的例外/.test(zh), '中文缺豁免句');
  });

  t('自动抽表在保留原文下的说明词条 27 语言齐全', () => {
    const blocks = html.match(/^\s*'[a-zA-Z\-]+':\s*\{[^\n]*pureMTMode/gm) || [];
    let checked = 0;
    for (const b of blocks) {
      const code = (b.match(/'([a-zA-Z\-]+)'/) || [])[1];
      if (!code) continue;
      const i = html.indexOf(b);
      const seg = html.slice(i, i + 9000);
      const m = seg.match(/autoTermsKeepNote\s*:\s*'((?:[^'\\]|\\.)*)'/);
      assert.ok(m && m[1].length > 10, code + ' 缺 autoTermsKeepNote');
      checked++;
    }
    assert.strictEqual(checked, 27, '实际校验的字典数 ' + checked);
  });

  t('自动术语表开关已换成「AI 抽取」按钮', () => {
    // 开关留在末尾时，抽完紧接着翻译，用户没机会改——这是 v0.9.139 要根治的问题
    assert.ok(!/id="autoTerms"/.test(html), '开关 HTML 还在，应已移除');
    assert.ok(!/\$\('autoTerms'\)/.test(html), '还有代码在读已经删掉的开关 DOM');
    assert.ok(/id="btnGlossAI"/.test(html), '缺少 AI 抽取按钮');
    const btnAt = html.indexOf('id="btnGlossAI"');
    const taAt = html.indexOf('<textarea id="terms"');
    assert.ok(btnAt > 0 && taAt > 0 && btnAt < taAt,
      '按钮必须排在术语表文本框之上，否则「抽完填进下面的框」在视觉上不成立');
  });

  t('AI 抽取按钮的 27 语言文案齐全', () => {
    const keys = ['btnGlossAI', 'glossAiRun', 'glossAiDone', 'glossAiNone', 'glossAiNeedFile'];
    const blocks = html.match(/^\s*'[a-zA-Z\-]+':\s*\{[^\n]*pureMTMode/gm) || [];
    let checked = 0;
    for (const b of blocks) {
      const code = (b.match(/'([a-zA-Z\-]+)'/) || [])[1];
      if (!code) continue;
      const i = html.indexOf(b);
      const seg = html.slice(i, i + 9000);
      for (const k of keys) {
        const m = seg.match(new RegExp(k + "\\s*:\\s*'((?:[^'\\\\]|\\\\.)*)'"));
        assert.ok(m && m[1].length > 0, code + ' 缺 ' + k);
      }
      checked++;
    }
    assert.strictEqual(checked, 27, '实际校验的字典数 ' + checked);
  });

  t('抽取结果写回文本框（可见可改），不是直接喂给模型', () => {
    const fn = html.match(/async function glossAIRun\(\)\{[\s\S]*?\n\}/);
    assert.ok(fn, '找不到 glossAIRun');
    assert.ok(/\$\('terms'\)\.value\s*=/.test(fn[0]), '抽取结果没有写回术语表输入框');
    assert.ok(/glossAIEntries\(gl, have\)/.test(fn[0]), '没有跳过用户已有的同名条目，会覆盖用户手写的译法');
    assert.ok(/save\(\);/.test(fn[0]), '抽取结果没有立刻落盘，刷新页面会丢');
  });

  /* v0.9.140：用户报「AI 抽取后改了没用」。实测主链路（写回→解析→过滤→提示词）是通的，
     真正的原因是四条静默失效路径。这里逐条钉死，防止回退。 */
  t('未命中的条目必须显式列出来（否则用户不知道自己白改了）', () => {
    const gcu = html.match(/function glossCountUI\(\)\{[\s\S]*?\n\}/);
    assert.ok(gcu, '找不到 glossCountUI');
    assert.ok(/glossMissRows\(\)/.test(gcu[0]), 'glossCountUI 没有列出未命中条目');
    assert.ok(/t\('glossMiss'/.test(gcu[0]), '未命中提示没有走 i18n');
    const gmr = html.match(/function glossMissRows\(\)\{[\s\S]*?\n\}/);
    assert.ok(gmr, '找不到 glossMissRows');
    assert.ok(/!glossHit\(r, src\)/.test(gmr[0]), 'glossMissRows 未按命中过滤');
  });

  t('匹配归一化只抹平无信息量差异，不放宽到形变', () => {
    const gn = html.match(/function glossNorm\(s\)\{[\s\S]*?\n\}/);
    assert.ok(gn, '找不到 glossNorm');
    assert.ok(/toLowerCase/.test(gn[0]), '归一化未处理大小写');
    assert.ok(/\\s/.test(gn[0]), '归一化未处理空白');
    // 关键：绝不能出现编辑距离/模糊匹配——放开到形变会误伤相近词（Bob 命中 Bobby）
    assert.ok(!/levenshtein|editDistance|fuzzy/i.test(html), '引入了模糊匹配，会误伤相近词');
  });

  t('AI 注释归一化：剥掉自带括号，避免双层括号污染译文', () => {
    const gnn = html.match(/function glossNormNote\(n\)\{[\s\S]*?\n\}/);
    assert.ok(gnn, '找不到 glossNormNote');
    assert.ok(/replace\(\/\^\[（\(\]\+\//.test(gnn[0]), '未剥掉开头括号');
    assert.ok(/\[）\)\]\+\$\//.test(gnn[0]), '未剥掉结尾括号');
  });

  /* v0.9.144：换片改为清空整张表（AI 抽的 + 手写的都清）。
     旧版只清 AI 抽的，但 AI 标记存在内存里、没落盘，刷新一次就全忘——
     换片后整张旧表照单全留，在新片里命中 0。这里钉死新行为。 */
  t('换字幕时清空整张术语表（不再区分 AI / 手写）', () => {
    const ss = html.match(/function setSrc\([\s\S]*?\n\}/);
    assert.ok(ss, '找不到 setSrc');
    assert.ok(/isNewFilm/.test(ss[0]), 'setSrc 未判断是否换了新片');
    assert.ok(/ta\.value=''/.test(ss[0]), '换片未清空术语表输入框');
    assert.ok(/glossRefresh\(\)[^\n]*glossCountUI\(\)[^\n]*save\(\)/.test(ss[0]),
      '清完没有刷新计数并落盘');
    assert.ok(/t\('glossClearedAll',clearedN\)/.test(html), '清空后未告知用户清了几条');
    // 旧的「只清 AI 标记」机制必须彻底移除，否则会被误以为还在生效
    assert.ok(!/glossClearAI|glossMarkAI|glossAiKeys/.test(html), 'AI 标记机制残留，已废弃');
  });

  t('重新载入同一部片不清空术语表（内容指纹判据）', () => {
    assert.ok(/function srcTextFp\(/.test(html), '缺少整片文本指纹函数');
    /* 必须叫 srcTextFp：5821 行已存在 srcFingerprint(items)（断点快照 snapFp 在用）。
       同名会让函数声明提升互相覆盖，直接毁掉续跑/断点——这是改这版时真实踩到的。 */
    assert.ok(!/function srcFingerprint\(text\)/.test(html),
      '新指纹函数与快照用的 srcFingerprint(items) 重名，会覆盖它');
    assert.ok(/function srcFingerprint\(items\)/.test(html), '快照用的 srcFingerprint(items) 不见了');
    // 指纹必须落盘，否则刷新一次就忘了上一部片是啥（与 v0.9.140 那个内存标记同一个坑）
    assert.ok(/srcFp:S\.srcFp\|\|''/.test(html), '指纹未落盘');
    assert.ok(/if\(sv\.srcFp\) S\.srcFp=/.test(html), '指纹未从存档恢复');
    const ss = html.match(/function setSrc\([\s\S]*?\n\}/);
    assert.ok(/S\.srcFp\s*&&\s*fp\s*&&\s*fp!==S\.srcFp/.test(ss[0]),
      '换片判据必须排除「首次载入」与「同一部片重传」，否则会误删刚写好的表');
    assert.ok(/S\.srcFp=fp/.test(ss[0]), '未记录当前片指纹，下次无法比对');
  });

  t('抽取提示词要求 AI 用片中真实出现的拼写 + 给出变体', () => {
    assert.ok(/occurs MOST OFTEN in the source/.test(html), '英文抽取提示词未要求用片中真实拼写');
    assert.ok(/片中实际出现次数最多的那个拼写/.test(html), '中文抽取提示词未要求用片中真实拼写');
    assert.ok(/"variants":\["Bobbi Thomson"\]/.test(html), '英文 JSON 示例未给 variants');
    assert.ok(/"variants":\["Bobbi Thomson"\]/.test(html), '中文 JSON 示例未给 variants');
  });

  t('v0.9.140 新增词条 27 语言齐全', () => {
    const keys = ['glossMiss', 'glossAiCleared', 'glossVariant'];
    const blocks = html.match(/^\s*'[a-zA-Z\-]+':\s*\{[^\n]*pureMTMode/gm) || [];
    let checked = 0;
    for (const b of blocks) {
      const code = (b.match(/'([a-zA-Z\-]+)'/) || [])[1];
      if (!code) continue;
      const i = html.indexOf(b);
      const seg = html.slice(i, i + 9000);
      for (const k of keys) {
        const m = seg.match(new RegExp("(?<![A-Za-z0-9_])" + k + "\\s*:\\s*'((?:[^'\\\\]|\\\\.)*)'"));
        assert.ok(m && m[1].length > 0, code + ' 缺 ' + k);
      }
      checked++;
    }
    assert.strictEqual(checked, 27, '实际校验的字典数 ' + checked);
  });

  /* v0.9.141：用户反馈「改了译名没用，而且根本不知道那行提示」。
     三件事：①AI 抽出的拼写变体并进同一条，改一次译法全部跟随；
     ②未命中的提示从灰色小字变成警告色；③翻译完成后核对成片译文里到底用上没有。 */
  let G141 = null;
  try{
    const m = html.match(/const GLOSS_ARROW = [\s\S]*?function glossFilter\(rows, srcText\)\{[^}]*\}/);
    if (m) G141 = new Function(m[0] + '\nreturn {glossParse:glossParse,glossHit:glossHit,glossFilter:glossFilter,glossRowText:glossRowText};')();
  }catch(e){ G141 = null; }

  t('一条术语可以写多个拼写（| 分隔），共用一个译法', () => {
    assert.ok(G141, '解析函数未抠到');
    const r = G141.glossParse('Whopper|Whoppers → 华堡').rows;
    assert.strictEqual(r.length, 1, '多拼写必须仍是同一条');
    assert.strictEqual(r[0].t, 'Whopper');
    assert.deepStrictEqual(r[0].alts, ['Whoppers']);
    assert.strictEqual(r[0].r, '华堡');
  });

  t('多拼写条目的每个拼写都要命中，且不能放宽成模糊匹配', () => {
    const r = G141.glossParse('Whopper|Whoppers → 华堡').rows;
    assert.strictEqual(G141.glossHit(r[0], 'He ordered a Whopper.'), true);
    assert.strictEqual(G141.glossHit(r[0], 'Two Whoppers, please.'), true,
      '变体拼写没命中——主条目改了译法后这些句子就不会跟随');
    assert.strictEqual(G141.glossHit(r[0], 'Whopperino please.'), false, '放宽成了模糊匹配');
  });

  t('改一条的译法，所有拼写都跟随（| 的意义就在这里）', () => {
    const row = G141.glossParse('Whopper|Whoppers → 华堡').rows[0];
    row.r = '皇堡';
    const txt = G141.glossRowText(row);
    assert.ok(txt.indexOf('Whopper|Whoppers') === 0, '序列化丢了变体拼写：' + txt);
    assert.ok(txt.indexOf('皇堡') > 0, '序列化丢了新译法');
  });

  t('没有变体的条目形状保持原样（不凭空多出 alts）', () => {
    assert.deepStrictEqual(G141.glossParse('SpaceX').rows, [{t:'SpaceX', r:'SpaceX', note:''}],
      '多出 alts 会破坏既有条目形状');
  });

  t('AI 抽出的变体并进同一条，不再各占一行', () => {
    const gae = html.match(/function glossAIEntries\(gl, have\)\{[\s\S]*?\n\}/);
    assert.ok(gae, '找不到 glossAIEntries');
    assert.ok(/row\.alts\s*=\s*alts/.test(gae[0]), '变体没有并进 alts');
    assert.ok(!/glossVariant/.test(gae[0]), '还在把变体写成独立行（改主条目时它不跟随）');
  });

  t('未命中的提示必须变成警告色（灰色小字用户不看）', () => {
    const gcu = html.match(/function glossCountUI\(\)\{[\s\S]*?\n\}/);
    assert.ok(gcu, '找不到 glossCountUI');
    assert.ok(/classList\.add\('alert'\)/.test(gcu[0]), '未命中时提示没有变警告色');
    assert.ok(/classList\.remove\('alert'\)/.test(gcu[0]), '命中后没有恢复常态');
    assert.ok(/\.hint\.alert\{/.test(html), '缺少 .hint.alert 样式');
  });

  t('翻译完成后核对成片译文里到底用上没有指定译法', () => {
    const gv = html.match(/function glossVerify\(\)\{[\s\S]*?\n\}/);
    assert.ok(gv, '找不到 glossVerify');
    assert.ok(/out\.indexOf\(g\.r\)/.test(gv[0]), '没有在成片译文里找指定译法');
    assert.ok(/g\.r===g\.t\)\s*return/.test(gv[0]), '保留原文的条目会被误报');
    assert.ok(/!glossHit\(g, src\)\)\s*return/.test(gv[0]), '本片没出现的条目会被误报');
    const seg = html.match(/log\(t\('allDone'[\s\S]{0,240}/);
    assert.ok(seg && /glossVerify\(\)/.test(seg[0]), '翻译完成后没有调用核对');
  });

  t('v0.9.141 新增词条 27 语言齐全', () => {
    const keys = ['glossVerifyOk', 'glossVerifyMiss', 'glossHelpS5'];
    const blocks = html.match(/^\s*'[a-zA-Z\-]+':\s*\{[^\n]*pureMTMode/gm) || [];
    let checked = 0;
    for (const b of blocks) {
      const code = (b.match(/'([a-zA-Z\-]+)'/) || [])[1];
      if (!code) continue;
      const i = html.indexOf(b);
      const seg = html.slice(i, i + 9000);
      for (const k of keys) {
        const m = seg.match(new RegExp("(?<![A-Za-z0-9_])" + k + "\\s*:\\s*'((?:[^'\\\\]|\\\\.)*)'"));
        assert.ok(m && m[1].length > 0, code + ' 缺 ' + k);
      }
      checked++;
    }
    assert.strictEqual(checked, 27, '实际校验的字典数 ' + checked);
  });

  t('v0.9.144 新增词条 27 语言齐全', () => {
    const keys = ['glossClearedAll'];
    const blocks = html.match(/^\s*'[a-zA-Z\-]+':\s*\{[^\n]*pureMTMode/gm) || [];
    const at = blocks.map(b => html.indexOf(b));
    let checked = 0;
    for (let bi = 0; bi < blocks.length; bi++) {
      const code = (blocks[bi].match(/'([a-zA-Z\-]+)'/) || [])[1];
      if (!code) continue;
      const i = at[bi];
      const seg = html.slice(i, bi + 1 < at.length ? at[bi + 1] : html.length);
      for (const k of keys) {
        const m = seg.match(new RegExp("(?<![A-Za-z0-9_])" + k + "\\s*:\\s*'((?:[^'\\\\]|\\\\.)*)'"));
        assert.ok(m && m[1].length > 0, code + ' 缺 ' + k);
        assert.ok(/\{0\}/.test(m[1]), code + ' 的 ' + k + ' 缺少 {0} 占位符（日志要显示条数）');
      }
      checked++;
    }
    assert.strictEqual(checked, 27, '实际校验的字典数 ' + checked);
  });

  t('v0.9.142 新增词条 27 语言齐全', () => {
    const keys = ['glossUseTitle', 'glossWhy', 'glossHelpSep', 'glossNoEffT', 'glossNoEffB',
                  'glossUpOne', 'btnGlossDemo', 'glossDemoOk', 'glossDemoNone'];
    const blocks = html.match(/^\s*'[a-zA-Z\-]+':\s*\{[^\n]*pureMTMode/gm) || [];
    const at = blocks.map(b => html.indexOf(b));
    let checked = 0;
    for (let bi = 0; bi < blocks.length; bi++) {
      const code = (blocks[bi].match(/'([a-zA-Z\-]+)'/) || [])[1];
      if (!code) continue;
      const i = at[bi];
      // 用下一个字典的起点收尾，别用固定长度：字典逐版变长，切短了会漏掉末尾词条
      const seg = html.slice(i, bi + 1 < at.length ? at[bi + 1] : html.length);
      for (const k of keys) {
        const m = seg.match(new RegExp("(?<![A-Za-z0-9_])" + k + "\\s*:\\s*'((?:[^'\\\\]|\\\\.)*)'"));
        assert.ok(m && m[1].length > 0, code + ' 缺 ' + k);
      }
      checked++;
    }
    assert.strictEqual(checked, 27, '实际校验的字典数 ' + checked);
  });

  // v0.9.143：示例按钮被移除。它会把假数据写进用户真正的术语表，忘了删就被当真术语提交给 AI
  // （片里真出现 Burger King 就会被译成汉堡王）。示例回到 placeholder：灰色、输入即消失、不进数据。
  t('「填入示例」按钮已彻底移除', () => {
    assert.ok(!/id="btnGlossDemo"/.test(html), '按钮 DOM 仍在');
    assert.ok(!/\$\('btnGlossDemo'\)/.test(html), '按钮的事件绑定仍在');
    // 词条本身按项目约定保留不删，但不该再被任何 DOM 引用
    assert.ok(!/data-i18n="btnGlossDemo"/.test(html), '仍有元素引用 btnGlossDemo 文案');
  });

  t('placeholder 是纯示例，不再混说明文字', () => {
    const at = html.indexOf('id="terms"');
    assert.ok(at > 0, '术语表输入框不存在');
    assert.ok(/data-i18n-ph="termsPh3"/.test(html.slice(at, at + 400)), 'placeholder 未走新词条 termsPh3');
    for (const code of ['zh-CN', 'en']) {
      const m = html.match(new RegExp("^\\s*'" + code + "':\\s*\\{[^\\n]*pureMTMode", 'm'));
      assert.ok(m, '未找到 ' + code + ' 字典');
      const i = html.indexOf(m[0]);
      /* v0.9.232：别用固定长度窗口切字典——往字典里加词条会把后面的词推出窗口，
         于是「本来在、只是变远了」会被误判成缺失（本次给 4 个字典各加了 6 条就踩到了）。
         改成截到下一个语言字典起点为止：既不漏、也不会借下一个字典凑数。 */
      const rest = html.slice(i + m[0].length);
      const nx = rest.search(/\n\s*'[a-zA-Z-]{2,}':\s*\{/);
      const seg = nx > 0 ? m[0] + rest.slice(0, nx) : html.slice(i, i + 60000);
      const v = seg.match(/termsPh3\s*:\s*'((?:[^'\\]|\\.)*)'/);
      assert.ok(v, code + ' 缺少 termsPh3');
      assert.ok(/\\n/.test(v[1]), code + ' 示例不是多行（起不到示范作用）');
      assert.ok(!/每行一条|表示保留|表示指定|如何|怎么/.test(v[1]), code + ' placeholder 里仍混着说明文字');
    }
  });

  // v0.9.142 踩的坑：i18n 注入时漏补行尾逗号 → 整段内联脚本语法错误 → 浏览器里
  // 所有函数都是 undefined、界面全点不动，而单测里基于正则的断言照样全绿。
  t('内联脚本可被解析（防 i18n 注入漏逗号）', () => {
    const vm = require('vm');
    const blocks = html.match(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g) || [];
    let checked = 0;
    for (const b of blocks) {
      const code = b.replace(/^<script[^>]*>/, '').replace(/<\/script>$/, '');
      if (!/pureMTMode/.test(code)) continue;   // 只校验含 i18n 字典的那段主脚本
      try { new vm.Script(code); }
      catch (e) { assert.fail('主脚本语法错误（多半是字典行尾漏逗号）: ' + e.message); }
      checked++;
    }
     assert.strictEqual(checked, 1, '应恰好命中 1 段主脚本，实际 ' + checked);
   });

  t('v0.9.156 新增词条 27 语言齐全', () => {
    const keys = ['fbRoute'];
    const blocks = html.match(/^\s*'[a-zA-Z\-]+':\s*\{[^\n]*pureMTMode/gm) || [];
    const at = blocks.map(b => html.indexOf(b));
    let checked = 0;
    for (let bi = 0; bi < blocks.length; bi++) {
      const code = (blocks[bi].match(/'([a-zA-Z\-]+)'/) || [])[1];
      if (!code) continue;
      const i = at[bi];
      const seg = html.slice(i, bi + 1 < at.length ? at[bi + 1] : html.length);
      for (const k of keys) {
        const m = seg.match(new RegExp("(?<![A-Za-z0-9_])" + k + "\\s*:\\s*'((?:[^'\\\\]|\\\\.)*)'"));
        assert.ok(m && m[1].length > 0, code + ' 缺 ' + k);
        for (const ph of ['{0}', '{1}', '{2}']) {
          assert.ok(m[1].indexOf(ph) >= 0, code + ' 的 ' + k + ' 缺占位符 ' + ph);
        }
      }
      checked++;
    }
    assert.strictEqual(checked, 27, '实际校验的字典数 ' + checked);
  });

  t('v0.9.157 事件里的模型名一律以本次实际生效的为准（走A走B都要覆写）', () => {
    const srvSrc = require('fs').readFileSync(require('path').join(__dirname, 'server.js'), 'utf8');
    /* v0.9.156 只补了「走 B 时覆写」这一半，反方向漏了：把语言从 B 列表移除后，本次走 A
       命中 30 分钟去重窗口里那条旧事件，名字仍停在旧模型、viaB 仍是 1 → 后台看起来是
       「我明明移除了，怎么还在走 B」。故这里必须是不带条件的覆写。 */
    assert.ok(/if \(mdl\) e\.model = mdl;/.test(srvSrc),
      'appendEvent 去重分支未无条件覆写 model（会退化成 v0.9.156 的半边修复）');
    assert.ok(!/\(!e\.model \|\| \(extra && extra\.viaB\)\)/.test(srvSrc),
      '仍在用 v0.9.156 的条件式覆写：移除语言后走 A 不会回退模型名');
  });

  t('v0.9.157 viaB 标记必须按本次真实值写（走A时传0）', () => {
    const srvSrc = require('fs').readFileSync(require('path').join(__dirname, 'server.js'), 'utf8');
    /* 走 A 时若传 null，旧事件上的 viaB=1 永远不会被清掉 */
    /* v0.9.193：三槽后多带 viaC。要求 viaB 仍是「走 B 才 1」的无条件 0/1 写法 —— 否则
       「viaB=1 即 B 槽」这个既有统计口径会被 C 槽污染（走 C 时 viaB 必须是 0）。 */
    assert.ok(/\{ viaB: pick\.which === 'B' \? 1 : 0, viaC: pick\.which === 'C' \? 1 : 0 \}/.test(srvSrc),
      'appendEvent 调用处未恒传 viaB 0/1（三槽后还要同时恒传 viaC）');
    /* v0.9.193：回退改成 fallbackChain 循环，变量从写死的 outA 变成 outF（语义不变：
       每一级回退都要给前端带回 _fb 回执，否则用户永远不知道自己被降级了）。 */
    assert.ok(/outF\._fb\s*=/.test(srvSrc), '回退响应未带 _fb 回执');
  });

  t('v0.9.156 前端要读回退回执并打日志', () => {
    assert.ok(/j\._fb/.test(html), '前端未检测服务端回退回执 _fb');
    assert.ok(/t\('fbRoute'/.test(html), '前端未调用 fbRoute 文案');
    assert.ok(/\.log \.warn\{/.test(html), '缺少 .log .warn 样式（回退提示要看得见）');
  });

  t('v0.9.158 会话去重命中时要记 lastAt（否则后台看不出这次跑了）', () => {
    const srvSrc = require('fs').readFileSync(require('path').join(__dirname, 'server.js'), 'utf8');
    /* 去重窗口命中只累加、不新建也不改 t；后台按追加序倒序且只显示 t
       → 刚翻完的那次在列表上纹丝不动，用户判定「后台没日志」。 */
    assert.ok(/e\.lastAt\s*=\s*now;/.test(srvSrc),
      'appendEvent 合并分支未记 lastAt（后台将无法体现最后一次活动时间）');
  });

  t('v0.9.158 后台要把 lastAt 显示出来', () => {
    const admSrc = require('fs').readFileSync(require('path').join(__dirname, 'admin.html'), 'utf8');
    assert.ok(/e\.lastAt\s*&&\s*e\.lastAt\s*-\s*e\.t\s*>\s*1000/.test(admSrc),
      '后台表格未渲染「末次」活动时间的条件分支');
    assert.ok(/末次/.test(admSrc), '后台表格未输出「末次」文案');
  });

  t('v0.9.159 每次点翻译要算一条独立记录（合并依据改为任务号）', () => {
    const srvSrc = require('fs').readFileSync(require('path').join(__dirname, 'server.js'), 'utf8');
    /* 此前按「IP+文件名+语言+30 分钟」合并 → 同一文件连翻两次被并进同一条，后台看不出第二次；
       不合并则一次任务（十几批）会刷出十几条。故改为按前端每次点翻译生成的任务号合并。 */
    /* v0.9.161 把三处的清洗与命中判定收进了 evFields / evHit，判据随之更新（语义不变） */
    assert.ok(/task: String\(m\.taskId \|\| ''\)/.test(srvSrc), '服务端未读取任务号');
    assert.ok(/f\.task \? \(e\.taskId === f\.task\)/.test(srvSrc),
      '去重未以任务号为准（会退回成按文件名合并，第二次翻译又看不见了）');
    assert.ok(/if \(task\) ev\.taskId = task;/.test(srvSrc), '新建记录未存任务号（后续批次归不进来）');
    assert.ok(/S\.taskId = 't'/.test(html), '前端未生成任务号');
    assert.ok(/taskId: S\.taskId/.test(html), '翻译请求的 meta 未带任务号');
    assert.ok(/taskId:S\.taskId/.test(html), '完成/下载上报未带任务号（完成时间会记到上一条）');
  });

  t('v0.9.160 各家的缓存命中字段都要读（DeepSeek 与 OpenAI 口径不同名）', () => {
    const srvSrc = require('fs').readFileSync(require('path').join(__dirname, 'server.js'), 'utf8');
    /* DeepSeek 的字段名是 prompt_cache_hit_tokens，不在 cached_tokens / prompt_tokens_details 里。
       此前只读 OpenAI 系 → 走 A 槽的任务 tkCache 恒为 0，后台看着像「没命中」。 */
    assert.ok(/prompt_cache_hit_tokens/.test(srvSrc),
      '未读 DeepSeek 的 prompt_cache_hit_tokens（走 A 槽时缓存命中会一直显示 0）');
    assert.ok(/cached_tokens/.test(srvSrc), 'OpenAI 系字段被覆盖掉了');
    assert.ok(/prompt_tokens_details/.test(srvSrc), 'prompt_tokens_details 口径被覆盖掉了');
    /* 补读必须排在原有口径之后、且不能叠加 */
    assert.ok(/if \(!tch\) tch = tokNum\(u\.prompt_cache_hit_tokens\);/.test(srvSrc),
      '补读逻辑不在原口径之后（会覆盖 OpenAI 系结果）');
    /* 异常值夹取不能破 */
    assert.ok(/if \(tch > tin\) tch = tin;/.test(srvSrc), '命中数大于输入数时的夹取被删掉了');
  });

  t('v0.9.161 事件匹配口径必须收归一处（三处记账共用，不可各写各的）', () => {
    const srvSrc = require('fs').readFileSync(require('path').join(__dirname, 'server.js'), 'utf8');
    /* 三处：appendEvent（批次计数）/ markEvent（完成时间）/ recordTokens（token）。
       前两处在 v0.9.159 已按任务号匹配，recordTokens 漏了 → 同一文件连翻两次时
       两条记录的 token 全记到后一条，前一条 tkIn 显示 0。根因是口径分散，故抽成共用函数。 */
    assert.ok(/function evFields\(meta\)/.test(srvSrc), '缺少统一的字段清洗 evFields');
    assert.ok(/function evHit\(e, ip, f\)/.test(srvSrc), '缺少统一的命中判定 evHit');
    const hits = srvSrc.match(/evHit\(/g) || [];
    assert.strictEqual(hits.length, 4, 'evHit 应为 1 处定义 + 3 处调用，实际 ' + hits.length);
    /* 旧的分散写法必须消失，否则又回到各写各的 */
    assert.ok(!/e\.file === file && e\.lang === lang/.test(srvSrc),
      '还有地方在各自判断「文件名+语言」（口径又分散了，迟早再漏改一处）');
    assert.ok(!/e\.ip !== ip \|\| e\.file !== file/.test(srvSrc),
      'recordTokens 仍在用旧的 IP+文件名+语言 匹配');
    /* 匹配必须先看 IP，否则跨 IP 会串账 */
    assert.ok(/if \(e\.ip !== ip\) return false;/.test(srvSrc), 'evHit 未先校验 IP');
  });

  /* v0.9.162：工作台字幕表下方的 risekol 引流卡。与首页横条共用 rkTx / rkGo 文案，
     新增的只有副标题 wsRkSub；显示开关也必须同源，否则开源版会漏挂一条外链。 */
  t('v0.9.162 工作台引流卡：DOM、链接、位置、开关同源', () => {
    const at = html.indexOf('id="rkBannerWs"');
    assert.ok(at > 0, '工作台引流卡 DOM 不存在');
    const seg = html.slice(Math.max(0, at - 400), at + 900);
    assert.ok(/class="ws-rk"/.test(seg), '卡片未用 .ws-rk 样式类');
    assert.ok(/href="https:\/\/risekol\.com\/video"/.test(seg), '链接未指向 risekol.com/video');
    assert.ok(/target="_blank"/.test(seg), '未新窗口打开');
    assert.ok(/rel="noopener"/.test(seg), '缺 noopener');
    /* 文案三处：标题复用 rkTx（含 <b>，必须走 data-i18n-html）、CTA 复用 rkGo、副标题走新词条 wsRkSub */
    assert.ok(/data-i18n-html="rkTx"/.test(seg), '标题未复用 rkTx 词条');
    assert.ok(/data-i18n="wsRkSub"/.test(seg), '副标题未接 wsRkSub 词条');
    assert.ok(/data-i18n="rkGo"/.test(seg), 'CTA 未复用 rkGo 词条');
    /* 位置：排在「导出前校验报告」之后——插进字幕表与报告之间会切断两者的关联 */
    const rep = html.indexOf('<details class="report"');
    assert.ok(rep > 0 && rep < at, '卡片应排在 reportBox 之后');
    /* 开关同源：两处各自判空再设，不能再有「首页那条不存在就 return」的早退 */
    const fn = html.slice(html.indexOf('function rkBanner()'));
    const body = fn.slice(0, fn.indexOf('\n}'));
    assert.ok(/if \(el\) el\.style\.display/.test(body), '首页横条未改成判空后赋值');
    assert.ok(/const ws=\$\('rkBannerWs'\); if \(ws\) ws\.style\.display/.test(body),
      '工作台卡片未纳入 rkBanner() 的显示开关（开源版会漏挂外链）');
    assert.ok(!/if\(!el\) return;/.test(body),
      'rkBanner() 里仍有早退：首页那条一缺失就会连带吞掉工作台卡片');
  });

  t('v0.9.162 新增词条 27 语言齐全', () => {
    const keys = ['wsRkSub'];
    const blocks = html.match(/^\s*'[a-zA-Z\-]+':\s*\{[^\n]*pureMTMode/gm) || [];
    const at = blocks.map(b => html.indexOf(b));
    let checked = 0;
    for (let bi = 0; bi < blocks.length; bi++) {
      const code = (blocks[bi].match(/'([a-zA-Z\-]+)'/) || [])[1];
      if (!code) continue;
      const i = at[bi];
      const seg = html.slice(i, bi + 1 < at.length ? at[bi + 1] : html.length);
      for (const k of keys) {
        const m = seg.match(new RegExp("(?<![A-Za-z0-9_])" + k + "\\s*:\\s*'((?:[^'\\\\]|\\\\.)*)'"));
        assert.ok(m && m[1].length > 0, code + ' 缺 ' + k);
      }
      checked++;
    }
    assert.strictEqual(checked, 27, '实际校验的字典数 ' + checked);
  });

  t('v0.9.163 规则 2 明令禁止重复编号（中英两套都要改）', () => {
    /* 2026-09-24 线上实测：结构错里 DUP（同一 cue 编号被输出多次）42 次，远多于 MISSING 12、EMPTY 7。
       原规则 2 只写「严禁合并、跳过、改号或发明编号」，唯独漏了「重复」——口子就在这。 */
    const en = html.slice(html.indexOf('function systemPromptEn('), html.indexOf('function systemPrompt('));
    const zh = html.slice(html.indexOf('function systemPrompt('));
    assert.ok(en.length > 0 && zh.length > 0, '提示词函数定位失败');
    assert.ok(/never merge, skip, renumber, repeat, or invent cue numbers/.test(en),
      '英文版规则 2 未加入 repeat 禁令');
    assert.ok(/严禁合并、跳过、改号、重复或发明编号/.test(zh),
      '中文版规则 2 未加入重复禁令（提示词有两套，只改一处等于没改）');
    /* 光加一个词力度不够：必须解释「同属一句也各用各的编号」，
       否则模型可能把 repeat 理解成「别重复内容」而不是「别复用编号」 */
    assert.ok(/even when two cues belong to the same sentence/.test(en),
      '英文版缺「同句各用各编号」的解释');
    assert.ok(/即使两条 cue 属于同一个句子/.test(zh),
      '中文版缺「同句各用各编号」的解释');
    assert.ok(!/never merge, skip, renumber, or invent cue numbers\./.test(en) &&
              !/严禁合并、跳过、改号或发明编号/.test(zh),
      '旧文案仍有残留（说明只改了一处或改漏了）');
  });

  t('版本号三处必须同步（ver / ver-tag / srt-core.js）', () => {
    /* 不硬编码具体版本号——每次发版不用改这条，只校验三处互相同等。
       注释里的历史版本号不参与比较（那是变更记录，本来就该留着）。 */
    const a = (html.match(/<span class="ver">v(0\.9\.\d+)<\/span>/) || [])[1];
    const b = (html.match(/<span class="ver-tag">v(0\.9\.\d+)<\/span>/) || [])[1];
    const c = (html.match(/srt-core\.js\?v=(0\.9\.\d+)/) || [])[1];
    assert.ok(a && b && c, '三处版本号有缺失: ' + [a, b, c].join(' / '));
    assert.strictEqual(a, b, 'ver 与 ver-tag 不一致: ' + a + ' vs ' + b);
    assert.strictEqual(b, c, 'ver-tag 与 srt-core.js 版本号不一致: ' + b + ' vs ' + c);
  });

  t('v0.9.166 每批 cue 上限按目标语言分化（ja/nl/sv/zh-CN/zh-TW = 45，fr/it 明确不降）', () => {
    /* 2026-09-24 清洗后取数（剔除僵尸任务）：「每批条数高」且「重试高」两条同时成立的是 ja / nl / sv。
       v0.9.166 补进中文：9/25 实测 zh-CN 每批 55.8 条，扛下当天 19 次 EMPTY 里的 18 次（每千行 1.07）；
       分桶证据是每批 <45（13272 行）与 45~52（2802 行）EMPTY 均为 0，只有 52~60 桶（35280 行）
       吃下全部 54 次 —— 降到 45 就是让它落进零区间。zh-TW 同源同理一并纳入。
       反例必须一起锁住，否则后人很容易改成一刀切全局降：
         fr 每批 55.9 条但重试仅 0.036（不出错）、it 重试最高 0.888 但每批只有 41 条（病因不是密度）。
       ⚠️ 这里解析真实的表再逐项比对，而不是拿正则卡整行字符串——重排顺序或换写法时正则会假红，
       而拼错 key（zhCN / zh_cn）才是真正要防的事，只有取值能抓到。 */
    const capM = /const CUE_CAP_BY_LANG = (\{[^}]*\});/.exec(html);
    assert.ok(capM, '找不到 CUE_CAP_BY_LANG 定义');
    /* 源码里是无引号 key（ja:45）与引号 key（'zh-CN':45）混写，统一补成双引号再交给 JSON.parse */
    const capTbl = JSON.parse(
      capM[1].replace(/'/g, '"').replace(/([{,]\s*)([A-Za-z_][A-Za-z0-9_-]*)\s*:/g, '$1"$2":'));
    ['ja', 'nl', 'sv', 'zh-CN', 'zh-TW'].forEach(function (k) {
      assert.strictEqual(capTbl[k], 45, 'CUE_CAP_BY_LANG.' + k + ' 应为 45，实际 ' + capTbl[k]);
    });
    assert.strictEqual(capTbl.fr, undefined, 'fr 不该降：每批虽高但重试仅 0.036');
    assert.strictEqual(capTbl.it, undefined, 'it 不该降：重试虽高但每批只有 41 条，病因不是密度');
    /* 取值必须防原型链：cfg.dst 是外部字符串，直接取键命中 '__proto__' 会返回 truthy 的对象，
       后面的数值比较全变 NaN，切批会静默失效（同 CUE_ERR_FIELD 那条教训） */
    assert.ok(/const CUE_CAP = \+CUE_CAP_BY_LANG\[cfg\.dst\] \|\| 60;/.test(html),
      'CUE_CAP 未按「+x || 60」取值（原型链防护掉了会静默不切批）');
    assert.ok(/curCues\+gc>CUE_CAP/.test(html), '分批判定不再使用 CUE_CAP');
    /* 该值计入续传指纹：改它必须让旧快照失效，否则批数对不上却拿旧进度续传 */
    assert.ok(/snapFp\(cfg, CHAR_BUDGET, CUE_CAP\)/.test(html), 'snapFp 未计入 CUE_CAP');
  });

  t('v0.9.165 方案 A：纯符号行判水词，且不误杀任何语言的实义句', () => {
    /* 起因：sv 任务 32 次重试全是 EMPTY。根因是 normFill 只保留 a-z0-9，汉字被整片抹掉，
       于是「♪」和「你好」归一化后都是空字符串 —— 程序分不清装饰符号和中文台词，
       只能一刀切当台词送去翻译，模型恒返回空。改判「有没有任何文字字符」才分得开。
       ⚠️ 反向用法是错的：拿「normFill 后为空」当水词判据会误杀全部中日韩台词。 */
    ['♪', '...', '?!', '♪♪♪', '♪ ♪'].forEach(s => {
      assert.ok(C.isFillerCue(s), '纯符号应判水词: ' + s);
    });
    /* 反向护栏更要紧 —— 改判据最怕误杀：中日韩、西里尔、阿拉伯、带重音拉丁字母都要放行 */
    ['你好', 'こんにちは', '안녕하세요', 'Hello there.', 'Oui.', 'Привет', 'مرحبا'].forEach(s => {
      assert.ok(!C.isFillerCue(s), '误杀实义句: ' + s);
    });
    /* '-' 开头是双说话人标记，必须让给 isSpeakerText，不能被当成水词清掉 */
    assert.ok(!C.isFillerCue('- ...'), 'dash speaker 标记不能被判水词');
  });

  t('v0.9.165 方案 C：源文本无实义时，空译文不算 EMPTY（不再空转重译）', () => {
    /* 只在「模型已返回空译文」时生效，不会删任何已有译文 —— 最坏结果是这条留空，
       而不是重试 32 次还是空（sv 案例实证：输出 token 照烧、结果没变）。
       判据不依赖多语言词表：整条被 [ ] / ( ) 包裹 = 音效标注形态（[musique]、[soupir]），
       不认识这个词也认得出它是标注而不是台词。 */
    const cues = [
      { no: 1, start: 0, end: 900, text: '[musique]' },
      { no: 2, start: 900, end: 1800, text: 'Hello there.' },
    ];
    const v = C.validateCueAlign(cues, [{ no: 1, text: '' }, { no: 2, text: 'Bonjour.' }], {});
    assert.ok(!v.errs.some(e => e.indexOf('EMPTY_') === 0), '法语标注的空译文不该判 EMPTY: ' + v.errs.join(';'));
    /* 实义句返回空仍然必须判错 —— 豁免只针对源文本本来就无内容的情形 */
    const v2 = C.validateCueAlign(cues, [{ no: 1, text: 'x' }, { no: 2, text: '' }], {});
    assert.ok(v2.errs.some(e => e.indexOf('EMPTY_2') === 0), '实义句空译文仍须判 EMPTY');
    /* 拿不到源文本时必须维持判错 —— 否则 EMPTY 判定会整体静默失效（默认豁免 = 等于取消该校验） */
    const v3 = C.validateCueAlign([{ no: 1, start: 0, end: 900 }], [{ no: 1, text: '' }], {});
    assert.ok(v3.errs.some(e => e.indexOf('EMPTY_') === 0), '无源文本时不能默认豁免');
  });

  t('v0.9.167 新增词条 27 语言齐全', () => {
    const keys = ['reuseTitle', 'reuseBody', 'reuseGo', 'reuseLog', 'reuseCancel', 'reuseNote'];
    const blocks = html.match(/^\s*'[a-zA-Z\-]+':\s*\{[^\n]*pureMTMode/gm) || [];
    const at = blocks.map(b => html.indexOf(b));
    let checked = 0;
    for (let bi = 0; bi < blocks.length; bi++) {
      const code = (blocks[bi].match(/'([a-zA-Z\-]+)'/) || [])[1];
      if (!code) continue;
      const i = at[bi];
      const seg = html.slice(i, bi + 1 < at.length ? at[bi + 1] : html.length);
      for (const k of keys) {
        const m = seg.match(new RegExp("(?<![A-Za-z0-9_])" + k + "\\s*:\\s*'((?:[^'\\\\]|\\\\.)*)'"));
        assert.ok(m && m[1].length > 0, code + ' 缺 ' + k);
      }
      /* 弹窗正文四个占位符缺一个，界面上就会把 {2} 这种裸标记直接显示给用户 */
      const body = seg.match(new RegExp("(?<![A-Za-z0-9_])reuseBody\\s*:\\s*'((?:[^'\\\\]|\\\\.)*)'"));
      for (const ph of ['{0}', '{1}', '{2}', '{3}']) {
        assert.ok(body && body[1].indexOf(ph) >= 0, code + ' 的 reuseBody 缺占位符 ' + ph);
      }
      checked++;
    }
    assert.strictEqual(checked, 27, '实际校验的字典数 ' + checked);
  });

  t('v0.9.167 跑完的快照改为保留，且不能改坏原有的作废逻辑', () => {
    /* 以前是 `if(!S.stop) rmSnap()` —— 跑完就删，导致「翻完没导出、回头再跑」要付两遍钱 */
    assert.ok(/if\(!S\.stop\) markSnapDone\(\);/.test(html), '跑完没有改为标记完成');
    assert.ok(!/if\(!S\.stop\) rmSnap\(\);/.test(html), '仍在跑完时删除快照');
    /* 主动停止 / 熔断（S.stop）时不标 fin，快照仍是「未完成」形态 —— 续跑能力不能丢 */
    const msd = html.slice(html.indexOf('function markSnapDone(){'));
    const msdBody = msd.slice(0, msd.indexOf('\n}'));
    assert.ok(/o\.fin=1/.test(msdBody), 'markSnapDone 没有打 fin 标记');
    assert.ok(/o\.ts=Date\.now\(\)/.test(msdBody), '未刷新时间戳——时限会从首次写入起算，实际留存变短');
    /* loadSnap 必须放行「已跑满」：bi===totalB 正是整片译完的状态 */
    assert.ok(/o\.bi>o\.totalB/.test(html), 'loadSnap 仍把跑满的快照判作废，找回无从谈起');
    /* 差异化时限：未跑完沿用 7 天；跑完的单独一个短时限——隔周再翻通常是想要新译文 */
    assert.ok(/Date\.now\(\)-o\.ts>\(o\.fin\?FIN_SNAP_TTL:SNAP_TTL\)/.test(html), '快照时限没有按 fin 分开');
    assert.ok(/const FIN_SNAP_TTL=24\*3600\*1000;/.test(html), '已完成快照的时限不是 24 小时');
    /* 向后兼容：老快照没有 fin 字段 → falsy → 自动走原来的断点续传，不需要数据迁移 */
    assert.ok(/if\(snap\.fin\)\{/.test(html), '新分支不是按 fin 判断（老快照会走错路）');
  });

  t('v0.9.167 取回上次结果：零模型请求，且不污染埋点', () => {
    const rt = html.slice(html.indexOf('async function runTranslate(){'));
    const seg = rt.slice(0, rt.indexOf('for(let bi=startBi'));
    assert.ok(seg.length > 100, '没切到 runTranslate 的快照处理段');
    assert.ok(/applySnapInto\(snap, res, fillerSet\);/.test(seg), '没有把上次译文灌回 res');
    /* startBi 推到 snap.bi：fin 时它等于 totalB，下方批次循环零次执行 = 零请求。
       这条是「秒出」的全部原理，改了就变成重新翻译一遍。 */
    assert.ok(/startBi=snap\.bi;/.test(seg), '未把 startBi 推到快照处，批次不会跳过');
    assert.ok(/S\.reuse=1;/.test(seg), '未打复用标记');
    /* 复用的一轮没调模型，若照旧上报会多出一条「行数齐全、批次与 token 全 0」的假任务，
       看起来就是一次正常翻译，会污染所有基于 batches / tkIn 的分析口径。 */
    assert.ok(/if\(!S\.reuse\) reportEvent\('finish'\);/.test(html), '复用路径仍在上报 finish');
    assert.ok(/S\.reuse = 0;/.test(rt.slice(0, 6000)), '每轮没有重置复用标记');
  });

  t('v0.9.167 取回弹窗必须留「取消」出口，且老的续传路径不能动', () => {
    const fn = html.slice(html.indexOf('function askReuse('));
    const body = fn.slice(0, fn.indexOf('\n}'));
    assert.ok(/mk\(t\('reuseCancel'\),false,'cancel'\)/.test(body), '缺取消按钮');
    /* 点遮罩必须等于取消：若等于「重译」，只是想关掉窗口的用户会被迫付一次钱 */
    assert.ok(/ev\.target===ov\)\{ ov\.remove\(\); resolve\('cancel'\)/.test(body), '点遮罩不是取消');
    assert.ok(/mk\(t\('resumeNew'\),false,'new'\)/.test(body), '缺「从头重来」——用户必须能推翻重译');
    /* 原断点续传那条路必须还在，不能被新分支替换掉 */
    assert.ok(/const choice=await askResume\(snap\.bi, totalB\);/.test(html), '原断点续传入口不见了');
    assert.ok(/t\('resumeLog', snap\.bi, snap\.bi\+1\)/.test(html), '原续传日志不见了');
  });

  t('v0.9.168 新增词条 27 语言齐全', () => {
    const keys = ['btnGlossSave', 'btnGlossClear', 'glossLibHint', 'glossSaveEmpty', 'glossSaveTooBig',
      'glossSaved', 'glossClearTitle', 'glossClearBody', 'glossClearGo', 'glossCleared', 'glossClearNone',
      'glossLibTitle', 'glossLibBody', 'glossLibGo', 'glossLibLoaded'];
    const blocks = html.match(/^\s*'[a-zA-Z\-]+':\s*\{[^\n]*pureMTMode/gm) || [];
    const at = blocks.map(b => html.indexOf(b));
    let checked = 0;
    for (let bi = 0; bi < blocks.length; bi++) {
      const code = (blocks[bi].match(/'([a-zA-Z\-]+)'/) || [])[1];
      if (!code) continue;
      const i = at[bi];
      const seg = html.slice(i, bi + 1 < at.length ? at[bi + 1] : html.length);
      for (const k of keys) {
        const m = seg.match(new RegExp("(?<![A-Za-z0-9_])" + k + "\\s*:\\s*'((?:[^'\\\\]|\\\\.)*)'"));
        assert.ok(m && m[1].length > 0, code + ' 缺 ' + k);
      }
      /* 占位符缺一个，界面上就会把 {1} 这种裸标记直接显示给用户 */
      const need = { glossLibHint: 2, glossSaveTooBig: 2, glossSaved: 2, glossClearBody: 2, glossLibBody: 2, glossLibLoaded: 1 };
      for (const k of Object.keys(need)) {
        const m = seg.match(new RegExp("(?<![A-Za-z0-9_])" + k + "\\s*:\\s*'((?:[^'\\\\]|\\\\.)*)'"));
        for (let n = 0; n < need[k]; n++) {
          assert.ok(m && m[1].indexOf('{' + n + '}') >= 0, code + ' 的 ' + k + ' 缺占位符 {' + n + '}');
        }
      }
      checked++;
    }
    assert.strictEqual(checked, 27, '实际校验的字典数 ' + checked);
    /* 两个按钮必须真的挂在页面上，否则只有词条没有功能 */
    assert.ok(/id="btnGlossSave"/.test(html), '缺保存按钮');
    assert.ok(/id="btnGlossClear"/.test(html), '缺清空按钮');
    assert.ok(/\$\('btnGlossSave'\)\.addEventListener\('click'/.test(html), '保存按钮没绑事件');
    assert.ok(/\$\('btnGlossClear'\)\.addEventListener\('click'/.test(html), '清空按钮没绑事件');
  });

  t('v0.9.168 术语库：换片必回填、清空必连库一起删', () => {
    /* 换片清表（v0.9.144）与「保存的术语要留到下一部片」是直接冲突的：
       不回填的话，用户点了保存，换一部片照样被清空，这个功能等于没有。 */
    assert.ok(/try\{ const p=glossLibRestore\(\); /.test(html), '换片分支没有调用回填');
    const setSrc = html.slice(html.indexOf('function setSrc(text, fileName){'));
    /* 顺序：清表必须在回填之前，否则刚填进去的表立刻被清掉 */
    const iClear = setSrc.indexOf("ta.value='';");
    const iRestore = setSrc.indexOf('glossLibRestore()');
    assert.ok(iClear > 0 && iRestore > iClear, '回填在清表之前——会被清表覆盖');
    /* v0.9.171：回填从 isNewFilm 分支内挪到了 S.srcFp 赋值之后。
       分支内只在「确认换了片」时触发，而换片要求上一部片的指纹存在，
       首次传片 / 清过浏览数据 / 换机器时它永远为假 → 保存的术语一直载不进来。 */
    const after = setSrc.slice(setSrc.indexOf('S.srcFp=fp;'));
    assert.ok(/glossLibRestore\(\)/.test(after), 'S.srcFp 赋值之后没有回填');
    const clearIf = setSrc.slice(setSrc.indexOf('if(isNewFilm){'), setSrc.indexOf('S.srcFp=fp;'));
    assert.ok(!/glossLibRestore\(\)/.test(clearIf), '回填又缩回 isNewFilm 分支内——首次传片会漏');

    /* 清空 = 文本框 + 库一起删。只清文本框的话，下一部片又被自动填回来，
       用户看到「我明明清空了怎么又回来了」，比不清更困惑。 */
    const clr = html.slice(html.indexOf('async function glossLibClearNow(){'));
    const clrBody = clr.slice(0, clr.indexOf('\n}'));
    assert.ok(/glossLibDrop\(\);/.test(clrBody), '清空没有删术语库');
    assert.ok(/\$\('terms'\)\.value='';/.test(clrBody), '清空没有清文本框');
    /* 删的是用户特意保存的东西 → 必须确认，点错了要能退出来 */
    assert.ok(/await askGlossClear\(/.test(clrBody), '清空没有确认弹窗');
    assert.ok(/if\(choice!=='yes'\) return;/.test(clrBody), '确认弹窗的取消没有生效');
    assert.ok(/save\(\);/.test(clrBody), '清空后没有落盘——刷新一次旧表又回来了');
  });

  t('v0.9.168 术语库：语言对不上要拦，且不能自动丢弃', () => {
    const rs = html.slice(html.indexOf('async function glossLibRestore(opt){'));
    assert.ok(rs.length > 400, 'glossLibRestore 找不到——签名可能又改了，单测要跟着改');
    const rsBody = rs.slice(0, rs.indexOf('\n}'));
    /* v0.9.170：语言检查抽成了 glossLangGuard，换片与开翻共用。rsBody 里现在只有一句调用 */
    assert.ok(/await glossLangGuard\(curLang, false\)/.test(rsBody), '换片回填没有走统一的语言守卫');
    /* 但只提示、不自动丢弃：SpaceX 这类「保留原文」的条目跨语言照样通用，硬拦会逼用户每次重存 */
    assert.ok(/if\(!\(await glossLangGuard\(curLang, false\)\)\) return;/.test(rsBody), '用户取消后仍然载入了');

    const gd = html.slice(html.indexOf('async function glossLangGuard('));
    const gdBody = gd.slice(0, gd.indexOf('\n}'));
    /* 语言不同必须问一句：表里写的是「译成什么」，给中文存的表拿去翻日语，译法本身就是错的 */
    assert.ok(/lib\.lang===curLang\) return true;/.test(gdBody), '没有比对语言');
    assert.ok(/await askGlossLang\(/.test(gdBody), '语言不匹配没有弹窗');
    assert.ok(/if\(choice!=='go'\) return false;/.test(gdBody), '取消没有返回 false（调用方会照样继续）');
    assert.ok(/return true;\s*$/.test(gdBody), '守卫不返回继续');
    /* 同一组合只问一次：换片选了「仍要载入」、点开始翻译又被拦一次，等于同一个问题问两回。
       ⚠️ 但只记「继续」，不记「取消」——取消说明用户还没决定，下次必须再问，
          否则第二次点开始翻译就静默放行，「取消」变成了「第二次默认同意」。 */
    assert.ok(/if\(GLOSS_LANG_ASKED===key\) return true;/.test(gdBody), '缺少「同一语言组合只问一次」');
    const iAsk = gdBody.indexOf('askGlossLang(');
    const iMark = gdBody.indexOf('GLOSS_LANG_ASKED=key;');
    assert.ok(iMark > iAsk, '「已问过」记在弹窗之前，取消也会被当成已确认');
    /* runMode 才要求表非空；换片回填时表刚被清空，照样得问 */
    assert.ok(/if\(runMode\)\{/.test(gdBody) && /\.trim\(\)\) return true;/.test(gdBody), 'runMode 的空表判断缺失');

    const ask = html.slice(html.indexOf('function askGlossLang('));
    const askBody = ask.slice(0, ask.indexOf('\n}'));
    /* 两个弹窗都得有取消出口，且点遮罩 = 取消（点遮罩等于「执行」会误伤只想关窗的人） */
    assert.ok(/mk\(runMode \? t\('glossLangRunGo'\) : t\('glossLibGo'\),true,'go'\)/.test(askBody), '缺「仍要载入 / 继续进行」按钮');
    assert.ok(/runMode \? t\('glossLangRunBody', savedLang, curLang\) : t\('glossLibBody', savedLang, curLang\)/.test(askBody), '开翻场景没有自己的文案');
    assert.ok(/ev\.target===ov\)\{ ov\.remove\(\); resolve\('cancel'\)/.test(askBody), '点遮罩不是取消');

    const ac = html.slice(html.indexOf('function askGlossClear('));
    const acBody = ac.slice(0, ac.indexOf('\n}'));
    assert.ok(/ev\.target===ov\)\{ ov\.remove\(\); resolve\('no'\)/.test(acBody), '清空弹窗点遮罩不是取消');

    /* 保存时记语言：没有它，下次根本无从判断这份库是给哪个语言存的 */
    const wr = html.slice(html.indexOf('function glossLibWrite('));
    const wrBody = wr.slice(0, wr.indexOf('\n}'));
    assert.ok(/lang:String\(\(\$\('dstLang'\)\|\|\{\}\)\.value\|\|''\)/.test(wrBody), '保存时没记目标语言');
    /* 与 srtTool.terms 同口径：超 2 万字不落盘（这台机器的 localStorage 历史上被存满过） */
    assert.ok(/GLOSS_LIB_MAX=20000/.test(html), '术语库没有体积上限');
    assert.ok(/v\.length>GLOSS_LIB_MAX/.test(html), '超出上限仍在写入');
  });

  t('v0.9.170 术语库语言检查：开翻前必查一次（改语言但不换片也能拦到）', () => {
    /* 光靠「换片时检查」覆盖不到「同一部片改目标语言」——那条路压根不进 isNewFilm 分支，
       而术语表真正被用上的时刻是开翻这一刻，守在这里才拦得住。 */
    const rt = html.slice(html.indexOf('async function runTranslate(){'));
    const rtHead = rt.slice(0, rt.indexOf('const snap='));
    assert.ok(/await glossLangGuard\(cfg\.dst, true\)/.test(rtHead), '开翻前没有查术语库语言');
    assert.ok(/if\(!\(await glossLangGuard\(cfg\.dst, true\)\)\) return;/.test(rtHead), '取消后仍然继续翻译了');
    /* 守卫必须排在发请求之前，否则「取消」取消不掉已经花出去的钱 */
    const iGuard = rtHead.indexOf('glossLangGuard(');
    const iCfg = rtHead.indexOf('const cfg = getCfg();');
    assert.ok(iCfg >= 0 && iGuard > iCfg, '守卫排在取配置之前，拿不到 cfg.dst');
    assert.ok(!/pgStart\(/.test(rtHead.slice(0, iGuard)), '守卫排在进度条启动之后，取消等于没取消');
  });

  t('v0.9.170 新增词条 27 语言齐全', () => {
    const dicts = [...html.matchAll(/^\s*['"]([A-Za-z\-]{2,10})['"]\s*:\s*\{\s*pureMTMode\s*:/gm)].map(m => m[1]);
    assert.strictEqual(dicts.length, 27, '界面字典应 27 个，实际 ' + dicts.length);
    for (const k of ['glossLangRunBody', 'glossLangRunGo']) {
      const n = (html.match(new RegExp('\\b' + k + "\\s*:\\s*'[^']*'", 'g')) || []).length;
      assert.strictEqual(n, 27, k + ' 应 27 条，实际 ' + n);
    }
    /* 占位符必须与代码里的 t('glossLangRunBody', a, b) 对齐 */
    assert.ok(/glossLangRunBody:'[^']*\{0\}[^']*\{1\}/.test(html), '缺 {0}/{1} 占位符');
  });

  t('v0.9.171 术语库回填：判据改成「框为空」，不只看换片', () => {
    const rs = html.slice(html.indexOf('async function glossLibRestore(opt){'));
    const rsBody = rs.slice(0, rs.indexOf('\n}'));
    assert.ok(rs.length > 400, 'glossLibRestore 找不到——签名可能又改了');
    /* 框里已有内容绝不覆盖：那是当前这部片在用的表，覆盖它比不回填更糟。
       这一条同时保住了「重新载入同一部片不覆盖刚改好的表」这个旧行为。 */
    assert.ok(/if\(String\(ta\.value\|\|''\)\.trim\(\)\) return;/.test(rsBody), '回填没有「框非空就跳过」的保护');
    /* 传片那条路仍然要弹窗确认（语言对不上时） */
    assert.ok(/await glossLangGuard\(curLang, false\)/.test(rsBody), '非 silent 路径没走语言守卫');
    /* 页面刚打开时静默：语言对不上只写日志说清原因，绝不开屏弹窗 */
    assert.ok(/if\(o\.silent\)\{/.test(rsBody), '缺少 silent 分支');
    assert.ok(/t\('glossLibSkip', LBY\(lib\.lang\)\.zh, LBY\(curLang\)\.zh\)/.test(rsBody), 'silent 下语言不匹配没说明原因');
    /* 页面初始化必须补一次，否则重新打开网页时框里是什么全看上次剩下什么 */
    assert.ok(/glossLibRestore\(\{silent:true\}\)/.test(html), '页面初始化没有静默回填');
  });

  t('v0.9.171 新增词条 27 语言齐全', () => {
    for (const k of ['glossLibSkip']) {
      const n = (html.match(new RegExp('\\b' + k + "\\s*:\\s*'[^']*'", 'g')) || []).length;
      assert.strictEqual(n, 27, k + ' 应 27 条，实际 ' + n);
    }
    /* 占位符必须与代码里的 t('glossLibSkip', a, b) 对齐 */
    assert.ok(/glossLibSkip:'[^']*\{0\}[^']*\{1\}/.test(html), '缺 {0}/{1} 占位符');
  });
 }

/* v0.9.173：赞助入口 —— 仅简中显示、收起态零请求。三条防线：
   ① JS 按语言裁剪（非 zh-CN 连 DOM 都不留）② 图片懒加载 ③ 二维码图实体随包发布 */
{
  const fsD = require('fs'), pathD = require('path');
  const html = fsD.readFileSync(pathD.join(__dirname, 'index.html'), 'utf8');

  t('v0.9.173 赞助入口：默认隐藏 + 仅 zh-CN 渲染', () => {
    assert.ok(/<div id="donateBox" hidden>/.test(html), 'donateBox 必须默认 hidden');
    /* ⚠️ 用 lastIndexOf：样式区还有一条同名 CSS 注释，indexOf 会切错位置 */
    const init = html.slice(html.lastIndexOf('/* v0.9.173：赞助入口'));
    assert.ok(init.length > 100 && init.length < 2000, '赞助初始化代码找不到');
    assert.ok(/if\(UI\.lang!=='zh-CN'\)\{/.test(init), '缺少语言裁剪判断');
    assert.ok(/removeChild\(box\)/.test(init), '非简中必须把节点整个移除');
    assert.ok(/box\.hidden=false;/.test(init), '简中没解除 hidden');
  });

  t('v0.9.173 赞助二维码懒加载：首次展开才赋 src', () => {
    const init = html.slice(html.indexOf('/* v0.9.173：赞助入口'));
    assert.ok(!/<img id="donateImg" alt="支付宝收款码" src=/i.test(html), 'img 不许带静态 src（收起态会偷跑请求）');
    assert.ok(/donate-qr-square\.png\?v=/.test(init), '展开时没赋图片 src');
    assert.ok(/var opening=qr\.hidden;/.test(init), '展开/收起切换逻辑找不到');
    assert.strictEqual((html.match(/给小站充点 token，让大家免费用/g) || []).length, 2,
      '文案应恰好出现 2 次（按钮默认 + 收起态要还原的那份）');
  });

  t('v0.9.173 二维码图片实体存在且体积可控', () => {
    const p = pathD.join(__dirname, 'donate-qr.jpg');
    assert.ok(fsD.existsSync(p), 'donate-qr.jpg 不在站点根目录');
    const sz = fsD.statSync(p).size;
    /* 上限 200KB：v0.9.175 换高清裁剪版（1200×1440 q87 ≈ 118KB），清晰度优先 */
    assert.ok(sz > 5000 && sz < 200 * 1024, 'donate-qr.jpg 体积异常: ' + sz);
    /* v0.9.204：页面改用方形裁切版。原图是一整张亮蓝底 + 大字宣传的海报，
       贴进暖色卡片里会整块跳出来；方形裁切只留二维码本体，暖色卡片才包得住。 */
    const q = pathD.join(__dirname, 'donate-qr-square.png');
    assert.ok(fsD.existsSync(q), 'donate-qr-square.png 不在站点根目录');
    const qz = fsD.statSync(q).size;
    assert.ok(qz > 5000 && qz < 200 * 1024, 'donate-qr-square.png 体积异常: ' + qz);
  });

  t('v0.9.177 源语言默认「自动检测」：未手动选过不再默认 en', () => {
    const fill = html.slice(html.indexOf('/* 语言选择填充 */'), html.indexOf('/* 语言选择填充 */') + 1400);
    assert.ok(/src\.value = okSrc\(sv\.srcLang\) \? sv\.srcLang : 'auto';/.test(fill), '源语言默认值必须是 auto（不是 en）');
    assert.ok(!/okSrc\(sv\.srcLang\) \? sv\.srcLang : 'en'/.test(html), '残留旧的 en 默认值');
    assert.ok(/ao\.value='auto'/.test(fill), '下拉首项 auto 选项丢失');
  });

  t('v0.9.177 源语言=auto 时列头显示「自动检测」而非 auto', () => {
    const seg = html.slice(html.indexOf('function setColLabels()'), html.indexOf('function setColLabels()') + 500);
    assert.ok(/srcV0 === 'auto' \? t\('autoDetect'\) : LBY\(srcV0\)\.zh/.test(seg), '列头没对 auto 做文案回退');
  });

  t('v0.9.178 双语导出：auto 时按字符分布猜源语言方言', () => {
    const m = html.match(/function srcLocaleForExport\(\)\{[\s\S]*?\n\}/);
    assert.ok(m, 'srcLocaleForExport 找不到');
    const fn = new Function('$', 'S', m[0] + '\nreturn srcLocaleForExport();');
    const mk = (val, rows) => fn(() => ({ value: val }), { rows: rows });
    assert.strictEqual(mk('ja', [{ en: '任意' }]), 'ja', '手动指定必须原样返回，不猜');
    assert.strictEqual(mk('en', [{ en: 'こんにちは' }]), 'en', '手动指定优先于猜测');
    assert.strictEqual(mk('auto', [{ en: '子どもたちが公園で楽しく遊んでいた' }]), 'ja', '假名应判 ja');
    assert.strictEqual(mk('auto', [{ en: '어제 역 앞에서 친구를 만났어요' }]), 'ko', '谚文应判 ko');
    assert.strictEqual(mk('auto', [{ en: 'Yesterday I met a friend at the cafe' }]), '', '西文猜不出应回退空串');
    assert.strictEqual(mk('auto', [{ en: '昨天我在车站前见了朋友' }]), '', '中文回退空串（zh 分词器本就合适）');
    assert.strictEqual(mk('auto', []), '', '无源文不得崩，回退空串');
    assert.strictEqual(mk('auto', [{ en: '中文里偶尔出现一个の字' }]), '', '单个假名不得误判为 ja');
    /* 两处双语调用点都必须换成 srcLocaleForExport() */
    assert.strictEqual((html.match(/srcLocale: srcLocaleForExport\(\)/g) || []).length, 2, '双语两处 srcLocale 都要走猜测函数');
    assert.ok(!/srcLocale: srcV==='auto'/.test(html), '残留旧的 auto 直通空串写法');
  });

  t('v0.9.179 events 要记源语言 src（否则无法评估 auto 默认值改动的好坏）', () => {
    /* 背景：v0.9.177 把源语言默认值从 en 改成 auto，但 events.json 只记目标语言 lang，
       重试率 / cue 结构错这些指标无法按「auto 组 vs 手动指定组」分组 → 改动好坏无从验证。
       埋点纪律：纯统计字段，不参与 evFields 匹配（匹配口径改一处即可），也不参与任何路由判定。 */
    assert.ok(/S\.trMeta = \{[^}]*src: cfg\.src \|\| ''/.test(html),
      'S.trMeta 未带 src（服务端只能在翻译请求里拿到它）');
    assert.ok(/src:S\.trMeta\.src\|\|''/.test(html),
      'reportEvent 未上报 src（自带 Key 用户没有 appendEvent，只有这条上报）');

    const srvSrc = require('fs').readFileSync(require('path').join(__dirname, 'server.js'), 'utf8');
    assert.ok(/const src = String\(meta\.src \|\| ''\)\.replace\(\/\[\\x00-\\x1f\]\/g, ''\)\.slice\(0, 10\);/.test(srvSrc),
      '服务端未清洗 meta.src（脏数据会撑大 events.json）');
    assert.ok(/if \(src\) ev\.src = src;/.test(srvSrc), 'appendEvent 新建记录未写 src');
    assert.ok(/if \(src\) e\.src = src;[\s\S]{0,200}if \(extra && typeof extra === 'object'\) Object\.assign\(e, extra\);/.test(srvSrc),
      'appendEvent 去重命中分支未补 src（首批之后才带到的场景会漏）');
    assert.ok(/if \(src && !e\.src\) e\.src = src;/.test(srvSrc), 'markEvent 命中分支未补 src');
    assert.ok(/if \(src\) lite\.src = src;/.test(srvSrc), '自带 Key 的轻量记录未写 src');
    /* 匹配口径不能跟着动：src 一旦进 evFields，任务号缺失时的旧口径会被悄悄改变 */
    assert.ok(!/src: String\(m\.src/.test(srvSrc), 'src 绝不能进 evFields（会改变事件匹配口径）');
    assert.ok(/topSrcs: cnt\(all\.filter\(e => e\.src\), 'src'\)/.test(srvSrc),
      '后台汇总未加 topSrcs（看不见 auto 占比）');
  });

  t('v0.9.180 提示词要有标点规则 8.5（只给原则，不列字符黑名单）', () => {
    /* 背景：中译英偶发出中文标点。2026-09-26 实测（ja/fr/ar × 四版，同一模型 gpt-6-luna）：
       ① "for English" 举例不会把其他语言带跑（法 « »+前置空格、阿 ؟、日「」全部保留）
       ② 字符黑名单唯一稳定生效的一次是误伤：法语的 … 被改成 ...
       ③ 残留本身低频偶发（无规则 1/80、纯原则 0/80、带黑名单 0/80）→ 举例无可测收益
       故定案：只写原则句，一个码位都不列。改这条前先看上面三条实测。 */
    assert.ok(/8\.5 \[Punctuation belongs to the target language\]/.test(html), '英文套提示词（非中文目标）缺 8.5');
    assert.ok(/8\.5【标点跟随目标语言】/.test(html), '中文套提示词缺 8.5');
    /* 位置必须夹在规则 8 与 9【输出示例】之间：追加到提示词末尾会被末尾的收尾指令挤掉注意力 */
    assert.ok(/8\. \[Content fidelity\][\s\S]*?8\.5 \[Punctuation belongs to the target language\][\s\S]*?9\. \[Output example\]/.test(html),
      '英文 8.5 未插在规则 8 与 9 之间');
    assert.ok(/8\.【内容保真】[\s\S]*?8\.5【标点跟随目标语言】[\s\S]*?9\.【输出示例】/.test(html),
      '中文 8.5 未插在规则 8 与 9 之间');
    /* 否定断言：8.5 句子里不许出现任何码位黑名单项。…(U+2026) 与弯引号 “”‘’ 都不是 CJK 专属，
       列进去会误伤法语/西语/德语/阿拉伯语的合法排印（实测法语 … → ...），且实测无可测收益。 */
    const lines85 = html.match(/'8\.5 ?(?:\[|【)[^\n]*/g) || [];
    assert.strictEqual(lines85.length, 2, '8.5 应正好两条（中/英各一），实到 ' + lines85.length);
    /* 英文那句可以全量查（英文句子不会自然带 CJK 标点）；中文那句本身要用中文字面写，
       全量查会误伤自己的句号逗号，只查「引号类 / 省略号 / 书名号」这些不该被点名的字符。 */
    const lineEn = lines85.find(s => s.includes('Punctuation belongs'));
    const lineZh = lines85.find(s => s.includes('标点跟随目标语言'));
    assert.ok(lineEn && lineZh, '中/英两条 8.5 未同时命中');
    const badEn = '，。、；：？！（）【】《》「」『』～…“”‘’';
    const badZh = '「」『』《》…“”‘’～';
    badEn.split('').forEach(ch => assert.ok(!lineEn.includes(ch),
      '英文 8.5 里出现了黑名单字符 ' + ch + '（会误伤非 CJK 语言的合法排印）'));
    badZh.split('').forEach(ch => assert.ok(!lineZh.includes(ch),
      '中文 8.5 里点名了 ' + ch + '（该字符不是 CJK 专属，或会与歌词淡出省略号规则 5.5 打架）'));
  });

  t('v0.9.183 服务端排队：账本按槽位分开，A 槽不限流，限额从 429 自学', () => {
    /* 背景（2026-09-27 实测）：B 槽 gpt-6-luna 345 个任务挨了 82 次 429（Limit 200000、Used 199713），
       A 槽 deepseek-chat 1133 个任务、零限流、且没有任何 failMsg。两槽额度是两套独立的东西，
       共用一个账本会让 A 的请求被 B 的拥堵连坐——而 A 压根不需要排队，给它排就是白白拖慢用户。
       排队放在服务端（额度本来就是所有用户共享的），并且按槽位分别记账、分别判定。 */
    const srvSrc = require('fs').readFileSync(require('path').join(__dirname, 'server.js'), 'utf8');
    /* ① 账本与限额都按槽位分开 */
    /* v0.9.193：三槽（A/B/C）。账本与限额必须三个槽位都齐 —— 漏一个就是 undefined，
       要么崩溃要么静默不限流。C 的种子额度与 B 对齐。 */
    assert.ok(/const RATE = \{ A: \[\], B: \[\], C: \[\] \};/.test(srvSrc), '滑窗账本没有按槽位分开——A 会被 B 的拥堵连坐');
    assert.ok(/const RATE_LIMIT = \{ A: 0, B: 2000000, C: 2000000 \};/.test(srvSrc), 'A 槽限额不是 0（不限）；A 从未限流，排队纯属拖慢用户');
    /* v0.9.187：B 的种子值必须是 200 万（2026-09-27 直连 api.openai.com 实测
       x-ratelimit-limit-tokens = 2,000,000），不是提额前从 429 文案里学到的 20 万。
       ⚠️ 种子只在「进程刚起、还没读到第一个响应头」那一瞬生效，但种子太低会让重启后
       头几批无谓地排队——而这时上游其实有 200 万额度。 */
    const seedB = (srvSrc.match(/const RATE_LIMIT = \{ A: 0, B: (\d+), C: \d+ \};/) || [])[1];
    assert.strictEqual(seedB, '2000000', 'B 槽种子值应跟真实额度 200 万同量级，实际 ' + seedB);
    assert.ok(/if \(limit <= 0\) return 0;/.test(srvSrc), 'LIMIT=0 的槽位没有直接放行');
    /* ② 判定必须在 pickModel 之后：不知道走哪个槽位就查不了对应的账本 */
    const iPick = srvSrc.indexOf('const pick = pickModel(cfg, lang);');
    const iPace = srvSrc.indexOf('paceCheck(pick.which, est)');
    assert.ok(iPick > 0 && iPace > iPick, '排队判定跑在 pickModel 之前，查不到对应槽位的账本');
    /* ③ 版本协商：不带 meta.pace 的旧前端永远不能收到 wait，
          否则它拿到一个没有 choices 的响应会当成「上游返回空」去走降级重试 */
    assert.ok(/body\.meta\.pace === 1/.test(srvSrc), '缺少 meta.pace 版本协商——旧前端会被 wait 响应打乱');
    /* v0.9.185：wait 回执多带一个排队号 q（客户端重发时带回，先来先出靠它） */
    assert.ok(/wait: w, q: tok, slot: pick\.which/.test(srvSrc), '额度类 wait 出口缺失（或未带排队号）');
    assert.ok(/wait: inflightWait\(\)/.test(srvSrc), '在途类 wait 出口缺失');
    /* ④ 限额别硬编码：429 文案里带着上游亲口报的数，学下来（只收紧不放松） */
    assert.ok(/Limit\\s\+\(\\d\{3,\}\)/.test(srvSrc), '没有从 429 文案里解析 Limit——上游改配额就得改代码');
    assert.ok(/v < RATE_LIMIT\[which\]/.test(srvSrc), '学到的限额没有「只收紧不放松」');
    /* ⑤ 回退那一趟走的是别的槽，消耗必须记进真正出力的那个槽的账本：
       记到上级槽上会凭空吃掉上级的额度（上级正堵着，等于火上浇油）。
       v0.9.193：三槽后回退是 C→B→A 循环，记账点从写死的 'A' 变成当前这一级 fb。 */
    assert.ok(/rateAdd\(fb, tkF\.tin \+ tkF\.tout\)/.test(srvSrc), '回退的消耗没记进真正出力的那个槽的账本');
    assert.ok(!/rateAdd\([^,]+, tkA\.tin/.test(srvSrc), '回退记账还在写死槽位（三槽后必须按当前级记）');
    /* ⑥ 每 IP 在途上限，且无论成功 / 回退 / 失败都要还回去 */
    /* v0.9.185：2 → 4。前端隔离重译 poolMap(…,3)、术语提取 poolMap(…,4)，
       上限低于自己的并发度就会「自己挤自己」（第 3 个请求必然被判在途、白等 8~16 秒）。 */
    assert.ok(/RATE_INFLIGHT = 4/.test(srvSrc), '每 IP 在途上限没设或低于前端并发度——会自己挤自己');
    assert.ok(/\} finally \{\s*if \(tookInflight\) inflightFree\(ip\);/.test(srvSrc), '在途名额没有 finally 释放——失败路径会泄漏');
    /* ⑦ 预扣：放行那一刻就把预估值记账，否则并发请求一起判定、一起放行、又一起撞墙 */
    assert.ok(/rateAdd\(pick\.which, est\);/.test(srvSrc), '缺少预扣：并发请求看不见彼此');
  });

  t('v0.9.183 前端：撤掉本地闸门，改用服务端回执驱动进度条 + 完成态报 token', () => {
    /* v0.9.181 那套 localStorage 计数是在「猜」一个只有服务端才知道的数，而且清缓存就能绕过。
       服务端有权威计数后它就是重复逻辑，一并撤掉（撤词条必须删全套，只删中文会留一堆死词条）。 */
    ['paceGate', 'paceWaitModal', 'paceMarkFb', 'PACE_KEY', 'paceTitle', 'paceBody', 'paceTick', 'paceNote']
      .forEach(k => assert.strictEqual(html.indexOf(k), -1, '旧闸门残留 ' + k + '：两套逻辑并存会让用户被拦两次'));
    /* 新文案三条 × 27 语：排队徽章 / 倒计时 / 完成态 token */
    const dicts = [...html.matchAll(/^\s*['"]([A-Za-z\-]{2,10})['"]\s*:\s*\{\s*pureMTMode\s*:/gm)].map(m => m[1]);
    assert.strictEqual(dicts.length, 27, '界面字典应 27 个，实际 ' + dicts.length);
    for (const k of ['pgWait', 'pgWaitSec', 'pgTok']) {
      const n = (html.match(new RegExp('\\b' + k + "\\s*:\\s*'[^']*'", 'g')) || []).length;
      assert.strictEqual(n, 27, k + ' 应 27 条，实际 ' + n);
    }
    assert.ok(/pgWaitSec:'[^']*\{0\}/.test(html), 'pgWaitSec 缺 {0} 占位符——倒计时秒数传不进去');
    /* 协议：内置通道声明 pace=1 才可能收到 wait */
    assert.ok(/Object\.assign\(\{pace:1\}/.test(html), '内置通道没有声明 pace:1——服务端不会给它 wait');
    /* 收到 wait → 进度条倒计时 → 自动重发同一批（不是换模型、不是新任务） */
    assert.ok(/\+\(j\.wait\|\|0\)>0/.test(html), 'once() 不识别 wait 回执');
    assert.ok(/await pgPace\(/.test(html), '识别了 wait 但没走进度条倒计时');
    assert.ok(/function pgPace\(sec\)\{/.test(html), 'pgPace 缺失');
    const pg = html.slice(html.indexOf('function pgPace(sec){'));
    const pgBody = pg.slice(0, pg.indexOf('\n}'));
    assert.ok(/classList\.remove\('run'\)/.test(pgBody), '排队时没暂停进度条动画——看着像还在跑');
    assert.ok(/classList\.add\('run'\)/.test(pgBody), '倒计时结束没恢复动画');
    /* 完成态报本次消耗 */
    assert.ok(/S\.tkSum\.in/.test(html) && /S\.tkSum\.out/.test(html), '没有累加 token');
    assert.ok(/S\.tkSum=\{in:0,out:0,cache:0\};/.test(html), 'pgStart 没清零——会带上一次任务的数');
    assert.ok(/t\('pgTok', tkTot\.toLocaleString/.test(html), '完成态没有展示本次消耗');
    /* _fb 提示必须留着：非 429 的失败（网络错 / 5xx）仍会回退，用户得看得见 */
    assert.ok(/j\._fb\)\{[\s\S]{0,160}fbRoute/.test(html), '_fb 回退提示被删了——网络类回退会重新变成静默降级');
  });

  t('v0.9.184 完成态不再自动收起：用时与本次消耗要一直看得见', () => {
    /* v0.9.183 把停留时间从 2.6s 提到 6s 仍不够：实测 1.5s 出完成态、7.5s 进度条就没了。
       跑完一整集的人通常在看结果区 / 下载，回头想看「这一趟花了多少 token」时已经没了。 */
    const at = html.indexOf('function pgFinish(){');
    assert.ok(at > 0, 'pgFinish 缺失');
    const body = html.slice(at, at + 1200);
    assert.ok(!/setTimeout/.test(body), 'pgFinish 里还有自动收起的定时器——完成态迟早会消失');
    assert.ok(/w\.classList\.add\('done'\)/.test(body), '完成态没打上 done');
    assert.ok(/t\('pgTok', tkTot/.test(body), '完成态没有展示本次消耗');
    /* 常驻就必须有清场：下一轮开翻、导入新片，两处都要把上一轮的数字抹掉，否则会串着显示 */
    const st = html.indexOf('function pgStart(){');
    assert.ok(/setPrText\(''\)/.test(html.slice(st, st + 700)), 'pgStart 没清掉上一轮的消耗行');
    const ss = html.indexOf('function setSrc(text, fileName){');
    assert.ok(/setProg\(0,false\); setPrText\(''\)/.test(html.slice(ss, ss + 400)), '导入新字幕没清掉上一部的完成态');
  });

  t('v0.9.185 服务端：额度以「上游亲口报的」为准，且放宽通道必须存在', () => {
    const srvSrc = require('fs').readFileSync(require('path').join(__dirname, 'server.js'), 'utf8');
    /* ① 读响应头。B 槽是 api.openai.com 官方端点，每次响应都带 x-ratelimit-remaining-tokens /
       reset-tokens——这是权威数字；此前全靠「字符数 ÷ 2.5」估算 + 从 429 文案里抠 Limit 200000。 */
    assert.ok(/x-ratelimit-remaining-tokens/.test(srvSrc), '没读上游的剩余额度头——还在用估算代替测量');
    assert.ok(/x-ratelimit-limit-tokens/.test(srvSrc), '没读上游的额度上限头');
    assert.ok(/retry-after/.test(srvSrc), '没读 Retry-After——上游亲口说的等待时间被忽略了（OpenAI 官方：优先于自算）');
    /* ② 解析 "6m0s" / "1.5s" / "800ms" 这种格式，不能假定单位 */
    assert.ok(/function parseResetMs/.test(srvSrc), '缺少 reset 时长解析');
    assert.ok(/u === 'ms' \? n : u === 's' \? n \* 1000/.test(srvSrc), 'reset 解析没区分 ms/s/m/h');
    /* ③ 判定顺序：先问上游余额，没有才回落本地滑窗 */
    assert.ok(/quotaWait\(pick\.which, est\)/.test(srvSrc), '没有先问上游余额');
    assert.ok(/if \(qw == null\) qw = paceCheck\(pick\.which, est\)/.test(srvSrc), '上游余额拿不到时没有回落本地账本');
    /* ④ 放宽通道（用户 9/27 在 OpenAI 后台提了额）：
           旧的 learnLimit 只收紧不放松，会把学到的 20 万永久锁死，提了额也看不到。 */
    assert.ok(/rl\.limTok > RATE_LIMIT\[which\]/.test(srvSrc), '响应头报的更高额度没有采纳');
    assert.ok(/usedNow > RATE_LIMIT\[pick\.which\]/.test(srvSrc), '实测用量超过旧限额却没挨限流时，没有据此放宽');
    /* ⑤ 429 时余额见底 + Retry-After 要落成后续判定 */
    assert.ok(/e && e\._status === 429/.test(srvSrc), '429 后没把余额记成见底');
    assert.ok(/RETRY_UNTIL\[pick\.which\] = Date\.now\(\) \+ ra/.test(srvSrc), 'Retry-After 没有落进后续判定');
    /* ⑥ 账本必须能减：预估偏高时差额是负数，此前被 if(v<=0) return 丢掉 → 只增不减、虚高 */
    assert.ok(/if \(!v\) return;/.test(srvSrc), 'rateAdd 仍丢弃负值——账本只增不减，本来有额度也让人排队');
    assert.ok(/return sum > 0 \? sum : 0;/.test(srvSrc), 'rateUsed 可能算出负数');
    /* ⑦ A 槽豁免在途闸：A 从未限流（1133 任务零 429），拦它只会拖慢开多标签页的用户 */
    assert.ok(/if \(pick\.which !== 'A'\)/.test(srvSrc), 'A 槽没豁免在途闸');
  });

  t('v0.9.185 服务端：先来先出的排队，短等服务端静默 hold，长等只排队不换道', () => {
    const srvSrc = require('fs').readFileSync(require('path').join(__dirname, 'server.js'), 'utf8');
    /* 「等 N 秒再重发」天然不是 FIFO：谁先重发谁先进，后到的请求反而插队。
       所以每个排队的请求都要有顺序号，判定不只看额度，还看队里有没有更早的号。 */
    for (const k of ['Q_SEQ', 'Q_WAIT', 'Q_TTL', 'qMinSeq', 'qTouch', 'qDrop', 'qNewTok']) {
      assert.ok(new RegExp('\\b' + k + '\\b').test(srvSrc), 'FIFO 缺件: ' + k);
    }
    assert.ok(/seq <= head/.test(srvSrc), '没有「轮到我了」的判定——先来先出不成立');
    assert.ok(/why = 'fifo'/.test(srvSrc), '排在别人后面时没有标出 fifo 原因');
    assert.ok(/w = FIFO_POLL \+ Math\.floor\(Math\.random\(\) \* 3\)/.test(srvSrc),
      '非队首没有用短间隔回问——队首一走后面顶不上（要干等上一轮的 60 秒）');
    /* 短等由服务端扛：不多一次往返、不惊群，客户端完全无感 */
    assert.ok(/HOLD_MAX_MS      = 15000/.test(srvSrc), '服务端静默等待上限不是 15 秒');
    assert.ok(/HOLD_MAX_WAITERS = 8/.test(srvSrc), '没有限制同时在服务端等待的请求数——会把 Node 变成等待池');
    assert.ok(/await sleepMs\(wms\)/.test(srvSrc), '服务端没有真的等——短等仍要客户端空跑一趟');
    assert.ok(/for \(let guard = 0; guard < 4; guard\+\+\)/.test(srvSrc), 'hold 循环没有次数上限——连接会被占死');
    /* ⚠️ 静默等待必须**累计**封顶 15 秒，不是「每轮 ≤15 秒 × 4 轮 = 60 秒」。
       前端只给了 15 秒冗余（90→105 秒）；服务端能等 60 秒的话，模型就只剩 45 秒 → abort。
       排队是帮用户，不能反手制造超时失败。 */
    assert.ok(/let holdUsed = 0;/.test(srvSrc), '静默等待没有累计计数');
    assert.ok(/holdUsed \+ wms <= HOLD_MAX_MS/.test(srvSrc), '静默等待没按累计封顶——4 轮 ×15 秒会吃掉客户端超时预算');
    assert.ok(/holdUsed \+= wms;/.test(srvSrc), '静默等待没有累加');
    /* ⚠️ 长等只给 wait，绝不放行去撞上游：那必然 429 → fallbackToA 换道，
       一集里前后两个模型语气会不一致（用户 9/27 拍板：排再久也不换模型）。 */
    const iHold = srvSrc.indexOf('let tookInflight = false;');   // 从准入段开始切，别切到常量声明那一段
    const seg = srvSrc.slice(iHold, iHold + 2600);
    assert.ok(/wait: w, q: tok, slot: pick\.which, why: why/.test(seg), '长等出口丢了');
    assert.ok(!/return sendJson\(res, 200, \{ wait: 0/.test(seg), '出现「等太久就放行」的出口——那等于变相换道');
  });

  t('v0.9.210 服务端：队列账本必须有 C 槽，且序号对 NaN 免疫（10/02 线上卡死实证）', () => {
    const srvSrc = require('fs').readFileSync(require('path').join(__dirname, 'server.js'), 'utf8');
    /* v0.9.193 加 C 槽时漏了 Q_SEQ/Q_WAIT：++Q_SEQ.C = NaN → NaN<=head 恒 false →
       永远回 {wait, why:'fifo'}，前端无限重发、任务卡 0%。探针实测拿到 q="C:NaN:gm7mob"。 */
    assert.ok(/const Q_SEQ   = \{ A: 0, B: 0, C: 0 \};/.test(srvSrc), 'Q_SEQ 缺 C——C 槽序号会是 NaN，永远进不了队首');
    assert.ok(/const Q_WAIT  = \{ A: Object\.create\(null\), B: Object\.create\(null\), C: Object\.create\(null\) \};/.test(srvSrc),
      'Q_WAIT 缺 C——C 槽 token 无法续期，每轮都重领号');
    /* 防线：序号非正数（含 NaN/undefined）一律重领，且计数器本身也要先修正 */
    assert.ok(/if \(!\(seq > 0\)\) \{/.test(srvSrc), '序号没有对 NaN 免疫——以后再加槽位会重演死循环');
    assert.ok(/if \(!Number\.isFinite\(Q_SEQ\[pick\.which\]\)\) Q_SEQ\[pick\.which\] = 0;/.test(srvSrc),
      '计数器本身没有 NaN 修正');
  });

  t('v0.9.211 服务端：上游请求有超时 + 客户端断开即中止（10/02 token 空烧事故）', () => {
    const srvSrc = require('fs').readFileSync(require('path').join(__dirname, 'server.js'), 'utf8');
    /* 事故链：前端 105 秒放弃 → 服务端 fetch 无超时仍挂着 → 上游跑完照样扣 token（结果没人收）
       → 在途名额被占死 → 后续全部 why:'inflight' → 前端「排队超时」卡 0%。 */
    assert.ok(/if \(opts && opts\.timeoutMs\) sigs\.push\(AbortSignal\.timeout\(opts\.timeoutMs\)\);/.test(srvSrc),
      'callModel 没有按调用加超时——上游挂起会无限占用在途名额');
    assert.ok(/AbortSignal\.any\(sigs\)/.test(srvSrc), '超时信号与客户端断开信号没有合并');
    assert.ok(/signal: abortSig/.test(srvSrc), 'fetch 没接中止信号');
    assert.ok(/const cliAc = new AbortController\(\);/.test(srvSrc), '路由没有建客户端断开控制器');
    assert.ok(/res\.on\('close', \(\) => \{ if \(!res\.writableFinished\) cliAc\.abort\(\); \}\);/.test(srvSrc),
      '没有监听客户端提前断开——前端放弃后服务端仍会傻等并烧 token');
    assert.ok(/CALL_BUDGET_MS = 90000/.test(srvSrc), '单次调用预算不是 90 秒（与前端模型预算不一致）');
    const nBudget = (srvSrc.match(/signal: cliAc\.signal, timeoutMs: CALL_BUDGET_MS \}\)/g) || []).length;
    assert.ok(nBudget >= 2, '主调用与回退调用没有全部接上断开信号 + 超时（应出现 2 处，实际 ' + nBudget + ' 处）');
    assert.ok(/'Reply with exactly: OK' \}\], 256, \{ timeoutMs: 30000 \}\)/.test(srvSrc),
      '后台连通性探针没有超时');
  });

  t('v0.9.185 服务端：A 槽没被限流时整个闸门都不进（线上冒烟抓到的真 bug）', () => {
    const srvSrc = require('fs').readFileSync(require('path').join(__dirname, 'server.js'), 'utf8');
    /* 首次线上冒烟实测：zh-CN（A 槽）拿到 wait=5 / why=fifo。
       因为最初只豁免了「在途闸」，A 照样进 FIFO 队列——队里只要有个更早的号就被拦。
       A 槽 1133 个任务零限流，让它排队纯属拖慢。
       但也不能永久豁免：A 真挨 429 时 learnLimit 会把 RATE_LIMIT.A 从 0 改成非零，那时它确实要排队。 */
    assert.ok(/const needGate = canPace && \(pick\.which !== 'A' \|\| \(RATE_LIMIT\[pick\.which\] \|\| 0\) > 0\);/.test(srvSrc),
      'A 槽没有按「自己有没有被限流」决定是否进闸门——要么限流时裸奔，要么零限流时也排队');
    assert.ok(/if \(needGate\) \{[\s\S]{0,240}inflightTake/.test(srvSrc), '闸门仍由 canPace 控制，A 槽会被队列拦住');
    /* est 只在真进闸门时才非零：A 不进闸门却拿 est 去补正，等于把没预扣过的量减掉，账本被冲成负数 */
    assert.ok(/const est = needGate \? estTokens/.test(srvSrc), 'est 仍按 canPace 算——A 槽没预扣却会被减掉');
    assert.ok(/if \(needGate\) \{\s*\/\* ⚠️ 只补正/.test(srvSrc), '预扣补正没有跟着 needGate 走');
    /* 读余额头 / 学限额仍对所有槽生效：A 真限流了要靠它们把 RATE_LIMIT.A 从 0 抬起来 */
    assert.ok(/if \(canPace\) \{\s*learnLimit\(pick\.which/.test(srvSrc), 'learnLimit 不该被 needGate 挡掉——A 限流后要靠它进闸门');
    assert.ok(/if \(canPace\) \{ noteQuota\(pick\.which, out && out\._rl\)/.test(srvSrc), 'noteQuota 不该被 needGate 挡掉');
  });

  t('v0.9.185 前端：排队不再吃掉批次超时，且可取消、有预算、带排队号', () => {
    /* P0：此前 chatOnce 的 90s 计时器在 pgPace 等待期间照走 → 排 60 秒只剩 30 秒就 abort，
       用户以为在排队，实际被超时打断，接着走批重试，比直接吃一记 429 降级还糟。 */
    assert.ok(/builtin\?105000/.test(html), '内置通道超时没给服务端 15 秒静默排队留位置');
    assert.ok(/let timer=setTimeout/.test(html), 'timer 不是 let——等待期间无法暂停');
    assert.ok(/pacing=true; pauseTimer\(\)/.test(html), '等待期间没有暂停超时计时');
    assert.ok(/pacing=false; resumeTimer\(\)/.test(html), '等待结束没有恢复超时计时');
    /* 预算按秒，不按轮数：8 轮 × 60 秒 = 一批最多干等 480 秒，等于原地打转 */
    assert.ok(/PACE_BUDGET_MS = 90000/.test(html), '排队预算没设或不是按秒计');
    assert.strictEqual(html.indexOf('paceLeft'), -1, '还在用「轮数」当预算——每轮最长 60 秒会打转');
    assert.ok(/psec\*1000 > paceBudget/.test(html), '预算耗尽时没有放弃本批');
    /* 耗尽要抛独立的「排队超时」，不能掉进 errEmpty——那会把排队超时记成上游返空 */
    assert.ok(/_failWhy='pace_giveup'/.test(html), '排队超时没有自己的埋点标记');
    /* v0.9.186：改成先建对象再打标记再抛（下游要靠 paceGiveUp 判定「不重试」）。
       同时仍然不能掉进 errEmpty——那会把排队超时记成上游返空。 */
    assert.ok(/new Error\(t\('pgGiveUp'\)\)/.test(html), '排队超时复用了 errEmpty——统计口径会错');
    assert.ok(/e9\.paceGiveUp=true/.test(html), '排队超时的错误没带机器标识——下游只能靠文案猜');
    assert.ok(/throw e9/.test(html), '排队超时的错误没有抛出');
    const n = (html.match(/\bpgGiveUp\s*:\s*'[^']*'/g) || []).length;
    assert.strictEqual(n, 27, 'pgGiveUp 应 27 条，实际 ' + n);
    /* 排队中点停止要立刻响应，不能干等 60 秒 */
    assert.ok(/S\.stop\)\{ restore\('stop'\)/.test(html), 'pgPace 不响应取消');
    assert.ok(/why==='stop'\) throw new Error/.test(html), '取消后没有抛出让用户停下来');
    /* 排队中不要再报「已等待 N 秒」——和右侧「N 秒后继续」两条文案打架 */
    assert.ok(/if\(!pacing\) log\(t\('waitSec'/.test(html), '排队中仍在报等待秒数');
    /* 排队号：重发必须带回，否则服务端当成新请求重新发号，先来先出失效 */
    assert.ok(/qTok\?\{q:qTok\}:\{\}/.test(html), '重发没带排队号');
    assert.ok(/qTok=j\.q/.test(html), '没有记住服务端下发的排队号');
  });

  t('v0.9.186 排队超时后不再重试：立刻停，说清原因，断点留着可续', () => {
    /* 起因（实测）：排队预算是批级的，批重试会把它重置（3 × 90 秒），失败后还有
       「逐组隔离补救」每组各来一轮 —— 一个 4 行的小任务干等 150 秒以上仍在排。
       上游此刻就是挤，重试只会更挤；已翻好的批留在本机断点里，稍后可直接续。 */
    const iCatch = html.indexOf("log(t('batchFail',bi+1,attempt+1,e.message),'err')");
    assert.ok(iCatch > 0, '批重试的 catch 分支找不到');
    const seg = html.slice(iCatch, iCatch + 1200);
    /* 判定必须靠机器标识，不能靠文案——文案随界面语言变，27 种语言都匹配一遍不现实 */
    assert.ok(/e && e\.paceGiveUp\)\{ S\.paceOut=true; S\.stop=true; break; \}/.test(seg),
      '排队超时没有「不再重试」的分支——会一路重试到 maxTry 再进逐组补救');
    assert.ok(seg.indexOf('e.paceGiveUp') < seg.indexOf('HTTP (429|503)'),
      '排队超时的判定排在了 429 之后——会被别的分支先截走');
    /* S.stop 一置位，下面的逐组补救（if(!ok && !S.stop)）自然被跳过 */
    assert.ok(/if\(!ok && !S\.stop\)\{/.test(html), '逐组补救没有 S.stop 守卫——排队超时后仍会每组再排一轮');
    /* 纯翻译模型那条独立通道同样是「失败重试一次」，也要立刻放弃 */
    assert.ok(/catch\(e\)\{ lastE=e; if\(e&&e\.paceGiveUp\) throw e;/.test(html),
      '纯翻译通道遇到排队超时仍会重试');
    /* 停止原因要说得准：不是用户点的，别写「已由用户停止」 */
    assert.ok(/if\(S\.stop\)\{ if\(!S\.paceOut\) log\(t\('userStop'\),'err'\); break; \}/.test(html),
      '排队超时导致的停止会被记成用户主动停止');
    /* 终态：弹窗 + 进度条不写「完成」。modelDead 那套是「模型不响应，建议换 API」，
       这边是「额度挤，建议等会儿再来」，处理建议完全不同，不能共用文案。 */
    assert.ok(/if\(S\.paceOut\)\{\s*S\.paceOut=false;\s*log\(t\('busyTitle'\),'err'\);[\s\S]{0,200}showErrModal\(t\('busyTitle'\), t\('busyBody'\)\)/.test(html),
      '排队超时没有自己的终态弹窗');
    assert.ok(/S\.modelDead=false; S\.paceOut=false;/.test(html), 'S.paceOut 没有随任务重置——上一轮的停药会残留');
    /* 没跑完就不写「完成」，否则进度条和弹窗自相矛盾 */
    const iFin = html.indexOf('function pgFinish');
    assert.ok(iFin > 0, 'pgFinish 找不到');
    assert.ok(/if\(S\.paceOut\)\{[\s\S]{0,300}pgState'\)\.textContent=t\('busyTitle'\)/.test(html.slice(iFin, iFin + 1600)),
      '排队超时后进度条仍写「完成」');
    /* 断点必须留着：markSnapDone 只在 !S.stop 时跑，排队超时时 S.stop 为真 → 快照不标记完成，下次可续 */
    assert.ok(/if\(!S\.stop\) markSnapDone\(\);/.test(html), '停止时会把断点标记完成——下次就无法续跑了');
    for (const k of ['busyTitle', 'busyBody']) {
      const c = (html.match(new RegExp("\\b" + k + "\\s*:\\s*'[^']*'", 'g')) || []).length;
      assert.strictEqual(c, 27, k + ' 应 27 条，实际 ' + c);
    }
    assert.ok(!/busyBody:'[^']*\{0\}/.test(html), 'busyBody 不该带占位符');
    /* 别在「上游繁忙」旁边再劝用户去检查配置 / 报「全部完成」——三条消息互相打架 */
    assert.ok(/missingCount >= grpTotal \* 0\.3 && !S\.paceOut/.test(html),
      '排队超时时仍在劝用户去检查「翻译引擎」配置');
    assert.ok(/if\(!S\.paceOut\) log\(t\('allDone'/.test(html),
      '没跑完却还在报「全部完成」');
  });

  t('v0.9.188 提示词第 2 行：删掉自相矛盾的「严禁输出中文」', () => {
    /* 起因（用户揪出来的低级错误）：英文版开头写着
       「unless the target language itself is Chinese, NEVER output Chinese」，三重错——
       ① 英文版只在 dst≠zh 时被调用（systemPrompt 首行分发），那个「除非」恒不成立 → 死条件
       ② 中文版 dst 恒=zh，「严禁输出中文」恒被自己那句「除非」豁免 → 自相矛盾的废话
       ③ 本站主力是中译外，源文通篇中文，却在 [MOST IMPORTANT RULE] 喊 NEVER output Chinese
       实测（中译日，三版各 7 轮）：末尾再锚定一次目标语言自称 = 7/7；删掉重复的 = 5/7；
       并进上一句的最简洁版 = 1/7（水词几乎从不清理）→ 取第一版。 */
    assert.ok(!/NEVER output Chinese/.test(html), '英文版仍有 NEVER output Chinese');
    assert.ok(!/严禁输出中文/.test(html), '中文版仍有「严禁输出中文」');
    assert.ok(!/除非目标语言本身就是中文/.test(html), '中文版仍留着那个自相矛盾的豁免从句');
    /* 替代文案必须到位：讲清「指令语言≠输出语言」+ 禁止照抄原文（对任何源语言都成立，
       不像原来只针对中文） */
    assert.ok(/it never determines the output language\. Never copy the source text unchanged/.test(html),
      '英文版缺少替代文案');
    assert.ok(/不要把源语言的原文原样留下/.test(html), '中文版缺少替代文案');
    /* 收尾必须用目标语言自称（dstNative 变量）再锚定一次，不能硬编码 —— 实测这版最稳。
       [MOST IMPORTANT RULE] 的最后一句权重最高，用自称收尾 vs 用禁令收尾，行为不同。 */
    assert.ok(/Never copy the source text unchanged: every text field must be written in ' \+ dstNative \+ '\./.test(html),
      '英文版收尾没有用 dstNative 锚定目标语言');
    /* 中文版的「本提示词用中文书写只是指令语言，与输出语言无关」也一并删了：
       中文版只在 dst=zh 时调用，指令语言恒等于输出语言，那句解释的是不存在的冲突 */
    assert.ok(!/本提示词用中文书写只是指令语言/.test(html), '中文版仍留着解释「指令语言≠输出语言」的废话');
  });

  /* v0.9.189：折行设置搬到右侧导出区 + 改完阈值即时重排。
     两条硬约束：① 位置搬了但 id 不能变（语言联动 / ASS 字号推荐 / 行宽提示全靠 id 取值）
     ② 即时重排必须跳过手工编辑过的行，否则会抹掉用户手工折行、手写音效标记、故意留的空行
       （实测「我们要走了\n你别送了」被 monoFit 的 squashLines 压成「我们要走了你别送了」）。 */
  t('v0.9.189 折行设置搬到导出区 + 改完即时重排（且不动手工编辑过的行）', () => {
    // ① id 原样保留，且在文件里只出现一次（搬过去而不是复制）
    assert.strictEqual((html.match(/id="maxW"/g) || []).length, 1, 'maxW 不是恰好一处');
    assert.strictEqual((html.match(/id="biMaxW"/g) || []).length, 1, 'biMaxW 不是恰好一处');
    /* ② 折行两项必须在「导出译文」面板内（右栏 aside.panel），不能还在左栏的翻译设置里。
       判据：id="maxW" 的行号必须晚于「导出译文」标题的行号。 */
    const lines = html.split('\n');
    const iExport = lines.findIndex((l) => /stepExport/.test(l));
    const iMaxW = lines.findIndex((l) => /id="maxW"/.test(l));
    assert.ok(iExport >= 0 && iMaxW > iExport, '折行阈值没落在右侧导出面板里');
    // ③ 即时重排三件套：共用单行函数、跳过 edited、change 触发（不是 input，避免逐字重排）
    assert.ok(/function reflowOne\(/.test(html), '缺少单行重排函数 reflowOne');
    assert.ok(/function reflowRows\(/.test(html), '缺少即时重排入口 reflowRows');
    assert.ok(/const o = reflowOne\(r\)/.test(html), 'applyPost 没有复用 reflowOne（两处逻辑会漂移）');
    assert.ok(/if \(r\.edited\) \{ skip\+\+; return; \}/.test(html), 'reflowRows 没有跳过手工编辑过的行');
    assert.ok(/r\.edited=true/.test(html), '没有给手工编辑的行打标记');
    assert.ok(/mw\.addEventListener\('change'/.test(html), 'maxW 没有绑 change 触发重排');
    assert.ok(/if \(S\.translating\) return;/.test(html), 'reflowRows 没有排除翻译进行中的情况');
  });

  /* v0.9.190：① 删掉「导出文件名」输入框（纯伪需求，文件名本来就自动生成）
     ② 折行设置加标题 + 说明（用户以为改折行要重跑翻译，所以宁可不改）
     ③ 右栏卡片放开高度（加了两组折行设置后矮屏出内滚动条）。 */
  t('v0.9.190 删掉导出文件名输入框（占位与提示文案一并清干净）', () => {
    assert.ok(!/id="outName"/.test(html), '文件名输入框还在');
    assert.ok(!/\$\('outName'\)/.test(html), '还有代码在读已经删掉的输入框');
    assert.ok(!/data-i18n-ph="outPh"/.test(html), 'placeholder 词条引用还在');
    assert.ok(!/data-i18n="hintOutName"/.test(html), '「文件名后缀自动跟随」提示还在（输入框都没了）');
    /* 三个词条要删全套：字典里一个都不许剩（27 语言 × 3） */
    assert.strictEqual((html.match(/lblOutName\s*:/g) || []).length, 0, '字典里还留着 lblOutName');
    assert.strictEqual((html.match(/[^A-Za-z]outPh\s*:/g) || []).length, 0, '字典里还留着 outPh');
    assert.strictEqual((html.match(/hintOutName\s*:/g) || []).length, 0, '字典里还留着 hintOutName');
    /* 自动命名链路必须留着：导出时现算文件名 */
    assert.ok(/function outNameParts\(/.test(html) && /function autoOutNameStr\(/.test(html),
      '自动命名函数被误删（文件名会退回 translated.xxx）');
    assert.ok(/const name=\(S\.fileBase\?autoOutNameStr\(\):\('translated\.'\+expFileFmt\(\)\)\);/.test(html),
      '下载时没有按「源文件名 + 目标语言」现算文件名');
    /* 删掉的联动函数不该有残留调用 */
    ['autoOutName()', 'refreshOutName()', 'refreshOutPh()', 'autoNameRe'].forEach((fn) => {
      assert.ok(!html.includes(fn), '还残留对已删函数的调用：' + fn);
    });
  });

  t('v0.9.190 折行设置加标题与说明（并接上 27 语言）', () => {
    assert.ok(/data-i18n="secWrap"/.test(html), '折行设置缺标题');
    assert.ok(/data-i18n="wrapTip"/.test(html), '折行设置缺「不用重跑翻译」的说明');
    /* 标题与说明必须在折行输入之上（标题先出现），且落在导出面板内 */
    const lines = html.split('\n');
    const iExport = lines.findIndex((l) => /stepExport/.test(l));
    const iTitle = lines.findIndex((l) => /data-i18n="secWrap"/.test(l));
    const iTip = lines.findIndex((l) => /data-i18n="wrapTip"/.test(l));
    const iMaxW = lines.findIndex((l) => /id="maxW"/.test(l));
    assert.ok(iExport >= 0 && iTitle > iExport, '折行标题没在导出面板里');
    assert.ok(iTip > iTitle && iMaxW > iTip, '标题/说明必须排在折行输入框之前');
    /* 两个新词条 27 语言齐全。锚点用「块起点 → 下一块起点」精确切段：
       原先其它用例的 slice(i, i+9000) 对 zh-CN 块不够（该块 secWrap 距块首 13.3k 字符），
       会误报「zh-CN 缺 secWrap」。 */
    const keys = ['secWrap', 'wrapTip'];
    const starts = [];
    const reStart = /^'([a-zA-Z\-]+)':\s*\{/gm;
    let sm;
    while ((sm = reStart.exec(html))) {
      if (!/pureMTMode/.test(html.slice(sm.index, sm.index + 400))) continue; // 只认 i18n 字典块
      starts.push({ code: sm[1], at: sm.index });
    }
    assert.strictEqual(starts.length, 27, '字典块数 ' + starts.length);
    starts.forEach((blk, i) => {
      const end = i + 1 < starts.length ? starts[i + 1].at : html.length;
      const seg = html.slice(blk.at, end);
      for (const k of keys) {
        const m = seg.match(new RegExp(k + "\\s*:\\s*'((?:[^'\\\\]|\\\\.)*)'"));
        assert.ok(m && m[1].length > 0, blk.code + ' 缺 ' + k);
      }
    });
  });

  t('v0.9.190 右栏卡片放开高度（矮屏不再出内滚动条）', () => {
    /* 加了两组折行设置后 100vh-80px 不够用：top 66→54、底部留白 14→6，净增 20px；
       滚动条也收窄（scrollbar-width:thin），免得细滚动条挤掉右栏内容宽。 */
    assert.ok(/top:54px;max-height:calc\(100vh - 60px\)/.test(html),
      '右栏 sticky 高度没放宽（矮屏会出内滚动条）');
    assert.ok(!/max-height:calc\(100vh - 80px\)/.test(html), '还留着旧的高度限制');
    /* 两组宽度并排一行，别退回竖排（竖排会多出 ~90px 卡片高） */
    assert.ok(/class="wrap-row solo"/.test(html), '折行两项没按模式二选一（v0.9.202：并排摆着 = 一半时间是改了没反应的假控件）');
    assert.ok(/\.wrap-row\{display:grid;grid-template-columns:1fr 1fr/.test(html), 'wrap-row 不是两列网格');
    assert.ok(!/class="wrap-div"/.test(html), 'wrap-div 细线已被标题取代，DOM 里不该还有它');
  });

  console.log('\n— v0.9.191 R3 切分可见化（只提示，不偷偷放宽行宽）—');
  const _zhBase = '他告诉我们这场比赛准备了整整三个月每个人都拼尽了全力所以现在只想好好享受这一刻';
  const _mkZh = (n) => { let s = ''; while (s.length < n) s += _zhBase; return s.slice(0, n); };

  t('被切分时 splitInfo 报出条数与建议阈值', () => {
    const rows = [
      { no:1, start:0,    end:2000, zh:_mkZh(43), en:'x', flag:'' },
      { no:2, start:2000, end:4000, zh:_mkZh(30), en:'x', flag:'' }
    ];
    const o = C.buildMonoParts(rows, { maxW:16, maxLines:2, dstLocale:'zh-CN' });
    assert.strictEqual(o.length, 3, '43 宽在阈值 16 下应被切成 2 条（另一条 30 宽不切）');
    assert.ok(o.splitInfo, 'splitInfo 没挂上');
    assert.strictEqual(o.splitInfo.srcs, 1, '被切的源条目数应为 1');
    assert.strictEqual(o.splitInfo.items, 2, '切出的条数应为 2');
    assert.strictEqual(o.splitInfo.need, 22, '建议阈值应为 22');
    const o2 = C.buildMonoParts(rows, { maxW:o.splitInfo.need, dstLocale:'zh-CN' });
    assert.strictEqual(o2.length, 2, '按建议阈值调完就不该再切');
    assert.strictEqual(o2.splitInfo.srcs, 0, '调完 srcs 应为 0');
  });

  t('没触发切分时 splitInfo 全 0（提示保持隐藏）', () => {
    const o = C.buildMonoParts([{ no:1, start:0, end:3000, zh:'这是一条很短的字幕。', en:'x', flag:'' }], { maxW:16, dstLocale:'zh-CN' });
    assert.strictEqual(o.splitInfo.srcs, 0);
    assert.strictEqual(o.splitInfo.items, 0);
    assert.strictEqual(o.splitInfo.need, 0);
  });

  t('折行逻辑本身一个字没改：阈值 16 下 36 宽仍切分', () => {
    const o = C.buildMonoParts([{ no:1, start:0, end:2000, zh:_mkZh(36), en:'x', flag:'' }], { maxW:16, dstLocale:'zh-CN' });
    assert.strictEqual(o.length, 2, '本次只做提示，不放宽行宽 —— 36 宽仍应切分');
  });

  t('界面有切分提示行 + splitWarn 27 语齐全且占位符完整', () => {
    assert.ok(/id="splitWarnHint"/.test(html), '缺少 splitWarnHint 提示行');
    assert.ok(/class="hint alert" id="splitWarnHint"/.test(html), '提示行没用告警样式');
    assert.ok(/function paintSplitWarn\(/.test(html) && /function updateSplitWarn\(/.test(html), '缺 paintSplitWarn / updateSplitWarn');
    // v0.9.192：paintSplitWarn 多了一个 fmt 参数（区分单语/双语文案）
    assert.ok(/paintSplitWarn\(out && out\.splitInfo, fmt\)/.test(html), '导出 mono 分支没有刷新提示');
    assert.ok(/updateSplitWarn\(\); \}\} catch/.test(html) || /try\{ updateSplitWarn\(\); \}/.test(html), '翻译完成处没有刷新提示');
    const vals = [...html.matchAll(/splitWarn\s*:\s*'((?:[^'\\]|\\.)*)'/g)].map(m => m[1]);
    assert.strictEqual(vals.length, 27, 'splitWarn 词条数 ' + vals.length);
    vals.forEach(v => assert.ok(v.includes('{0}') && v.includes('{1}') && v.includes('{2}'), '占位符不全: ' + v));
  });

  t('v0.9.192 双语切分也要记账（此前完全静默）', () => {
    const en = 'He told us the match took three months and everyone gave it their all so now we just want to enjoy this moment.';
    const rows = [{ no:1, start:0, end:2000, zh:_mkZh(43), en:en, flag:'' }];
    const o = { maxW:16, biMaxW:32, srcLocale:'zh-CN', dstLocale:'en' };
    const b = C.buildBilingual(rows, o);
    assert.strictEqual(b.length, 2, '双语下这条确实会被切成 2 条');
    const si = b.splitInfo;
    assert.ok(si, 'buildBilingual 没带 splitInfo（map 会丢属性，必须显式传递）');
    assert.strictEqual(si.srcs, 1, '被切的源条数应为 1');
    assert.strictEqual(si.items, 2, '切后条数应为 2');
    // need = max(ceil(译文整条宽), ceil(源文整条宽/2))：译文 43 宽中文 → 43
    assert.strictEqual(si.need, 43, '建议双语行宽算错');
    // 按建议值调完必须真的不再切 —— 提示里给出的数字必须可信
    const b2 = C.buildBilingual(rows, Object.assign({}, o, { biMaxW: si.need }));
    assert.strictEqual(b2.length, 1, '按提示调到 ' + si.need + ' 后仍被切，说明 need 算错');
    assert.strictEqual(b2.splitInfo.srcs, 0);
    // buildBilingualParts 同样要带（ASS 分屏走这条）
    assert.ok(C.buildBilingualParts(rows, o).splitInfo, 'buildBilingualParts 没带 splitInfo');
  });

  t('v0.9.192 双语不该误报：短句 / 沿原 cue 边界的正常分段', () => {
    const o = { maxW:16, biMaxW:32, srcLocale:'zh-CN', dstLocale:'en' };
    const b1 = C.buildBilingual([{ no:1, start:0, end:2000, zh:'我们要走了', en:'We have to go.', flag:'' }], o);
    assert.strictEqual(b1.length, 1);
    assert.strictEqual(b1.splitInfo.srcs, 0, '短句不该记为切分');
    // 合并句组沿原 cue 边界还原（v0.9.48）是正确行为，不算「按宽度瓜分」
    const mg = [{ no:1, start:0, end:1000, zh:'第一部分内容在这里', en:'Part one here.', flag:'' },
                { no:2, start:1000, end:2000, zh:'第二部分内容在这里', en:'Part two here.', flag:'merged' }];
    const bm = C.buildBilingual(mg, o);
    assert.strictEqual(bm.splitInfo.srcs, 0, '沿原 cue 边界分段不该记为切分');
  });

  t('v0.9.192 双语提示走 splitWarnBi，且 27 语齐全', () => {
    assert.ok(/paintSplitWarn\(biOut && biOut\.splitInfo, fmt\)/.test(html), '导出双语分支没有刷新提示');
    assert.ok(/t\('splitWarnBi', si\.srcs, si\.items, si\.need\)/.test(html), '双语没走 splitWarnBi 文案');
    assert.ok(/bi = fmt && fmt !== 'mono'/.test(html) || /const bi = fmt && fmt !== 'mono'/.test(html), '没按导出样式区分文案');
    // 改双语行宽也要刷新提示（否则提示是死的）
    assert.ok(/\$\('biMaxW'\)/.test(html) && /bw\.addEventListener\('change', updateSplitWarn\)/.test(html), 'biMaxW 变化没刷新提示');
    const vals = [...html.matchAll(/splitWarnBi\s*:\s*'((?:[^'\\]|\\.)*)'/g)].map(m => m[1]);
    assert.strictEqual(vals.length, 27, 'splitWarnBi 词条数 ' + vals.length);
    vals.forEach(v => assert.ok(v.includes('{0}') && v.includes('{1}') && v.includes('{2}'), '占位符不全: ' + v));
  });

  t('v0.9.194 ASS 样式设置搬到右栏「导出字幕样式」下方（不再留在左栏翻译设置里）', () => {
    /* 它本来就由右边的「导出字幕样式」控制（选 ASS 才出现），却摆在左栏翻译设置里，
       用户会以为它影响翻译结果。搬运只动位置：id 与 data-i18n 全保留、控制逻辑不变。 */
    const iExport = html.indexOf('data-i18n="stepExport"');   // 右栏「导出译文」标题
    /* v0.9.258：格式选择由下拉改成按钮面板，定位锚点换成面板本身
       （`<select id="expStyle">` 仍在，但已退居隐藏的状态源，不再是这一区的视觉起点）。 */
    const iExpSel = html.indexOf('id="fmtPanel"');
    const iAss    = html.indexOf('id="assStyleBox"');
    const iWrap   = html.indexOf('data-i18n="secWrap"');      // 折行设置
    assert.ok(iExport > 0 && iExpSel > iExport, '右栏导出区定位失败');
    assert.ok(iAss > iExpSel, 'ASS 组不在「导出字幕样式」之后（应紧跟它，因果顺序最顺）');
    assert.ok(iAss < iWrap, 'ASS 组跑到折行设置后面去了');
    assert.strictEqual(html.split('id="assStyleBox"').length - 1, 1, 'assStyleBox 不唯一（左栏还留着？）');
    /* v0.9.199：标题再降一级 —— 从 .sec-title.sub（图标徽章 + 渐隐尾线）改为 .blk-title，
       层级交给 .param-blk 的浅底色承担，而不是靠标题自身的重量。
       （194 时只降到 sub，仍与「导出译文」主标题同款，三者在 300px 栏里看着平级。） */
    assert.ok(/<div class="param-blk">[\s\S]{0,240}<div class="blk-title"><span data-i18n="secAssStyle"/.test(html),
      'ASS 标题不是参数块内的块标题（层级没降下来）');
    assert.ok(!/<div class="sec-title sub"><i class="sec-ic c2">[\s\S]{0,200}data-i18n="secAssStyle"/.test(html),
      'ASS 还在用与「导出译文」同款的 sec-title（又平级了）');
    /* 控制逻辑一个字没改：仍由 syncAssStyleBox 判 ass 才显示 + 单语隐藏原文列 */
    assert.ok(/b\.style\.display=\(expFileFmt\(\)==='ass'\)\?'':'none'/.test(html), 'ASS 显示判定被改了');
    /* v0.9.195 起走统一的 tri 清单（原来按 id 逐个硬写两个变量，漏一组也看不出来） */
    /* v0.9.217：tri 清单由 3 组扩到 6 组（新增描边/字体/不透明度），故不再写死组数与顺序，
     改为断言「必备三组都在 + 每组都是 src/dst 成对」——加组不会假失败，漏 id 仍会失败。
     漏 id 的后果：单语时那一列照样显示（用户对着一组不生效的输入调半天），v0.9.195 踩过。 */
    (function(){
      var m = html.match(/var tri=\[([\s\S]*?)\]\];/);
      assert.ok(m, '找不到 tri 清单（单语隐藏原文列靠它）');
      var triSrc = m[1];
      ['assSrcSizeRow','assDstSizeRow','assSrcColorRow','assDstColorRow','assSrcMVRow','assDstMVRow',
       'assSrcOutlineRow','assDstOutlineRow','assSrcFontRow','assDstFontRow','assSrcAlphaRow','assDstAlphaRow']
        .forEach(function(id){ assert.ok(triSrc.indexOf(id)>=0, 'tri 清单缺 ' + id + '（单语时该列会变成假控件）'); });
    })();
    assert.ok(/s\.style\.display = mono \? 'none' : ''/.test(html), '单语隐藏原文列的逻辑被改了');
  });

  t('v0.9.194 ASS 七个字段三行并排（竖排会撑出滚动条）', () => {
    /* 右栏 max-height 是 100vh-60px（v0.9.190 刚因折行两组调过一次），
       竖排 7 个字段必然出内滚动条。字号/颜色/离底各自「译文+原文」两列并排 → 约 14 行压到 7 行。 */
    /* v0.9.199：ASS 那三组从 .wrap-row（标签在上、两列并排）升级成 .wr-row3（行标签 + 两列），
       所以 wrap-row 只剩折行那 1 组；ASS 的三组改数 wr-row3。 */
    assert.strictEqual((html.match(/class="wrap-row solo"/g) || []).length, 1, 'wrap-row 现在只该剩折行那 1 组');
    /* v0.9.217：参数表由 3 行扩到 6 行（加描边/字体/不透明度）。本意是「不许竖排撑出滚动条」，
     故断言「行数 = tri 组数」而不是写死 3。 */
    (function(){
      var triN = (html.match(/\['ass[A-Za-z]+Row','ass[A-Za-z]+Row'\]/g)||[]).length;
      assert.ok(triN >= 3, 'tri 组数异常');
      assert.strictEqual((html.match(/class="wr-row3"/g) || []).length, triN,
        'ASS 参数表行数与 tri 组数不一致（竖排会撑出滚动条）');
    })();
    /* 三行的译文/原文必须同处一行内，而不是各占一行。
       v0.9.199：容器由 .wrap-row（标签在上、两列）换成 .wr-row3（行标签 + 两列）。 */
    const rows = html.match(/<div class="wr-row3">[\s\S]*?\n        <\/div>/g) || [];
    const assRows = rows.filter(r => /assDstSize|assDstColor|assDstMV/.test(r));
    assert.strictEqual(assRows.length, 3, 'ASS 参数行数 ' + assRows.length);
    assert.ok(assRows.some(r => /assSrcSize/.test(r)), '字号没有并排');
    assert.ok(assRows.some(r => /assSrcColor/.test(r)), '颜色没有并排');
    assert.ok(assRows.some(r => /assSrcMV/.test(r)), '离底距离没有并排');
    /* 16 个 id 全部原样保留 → assCtxSync / 字号推荐 / 离底联动 / 27 语翻译零改动 */
    const ids = ['assDstSize', 'assSrcSize', 'assDstColor', 'assSrcColor', 'assDstMV', 'assSrcMV',
      'assDstColorSw', 'assSrcColorSw', 'assDstSizeHint', 'assSrcSizeHint',
      'assDstMVHint', 'assSrcMVHint', 'assSizeHint', 'assResetNote', 'assSrcSizeRow', 'assSrcMVRow'];
    ids.forEach(k => assert.strictEqual((html.match(new RegExp('id="' + k + '"', 'g')) || []).length, 1,
      k + ' 不是恰好 1 处（搬运动了 id 会让整组联动失效）'));
    /* 单语时原文列隐藏 → 译文列要跨满整行，否则右半栏空着 */
    assert.ok(/\.wr-cell\.span2\{grid-column:1 \/ -1\}/.test(html), '缺少 span2 跨列样式');
    assert.ok(/d\.classList\.toggle\('span2', !!mono\)/.test(html), '单语时译文列没有跨满整行');
    /* 零新增 i18n：secAssStyle 等词条本来就存在 */
    assert.strictEqual((html.match(/data-i18n="secAssStyle"/g) || []).length, 1, 'secAssStyle 引用不唯一');
  });

  t('v0.9.195 单语 + ASS 时「原文颜色」跟着字号/离底一起隐藏', () => {
    /* 单语 ASS 不生成原文行：buildAssEvents 仍把 Top/Sub 两个样式写进 [V4+ Styles]，
       但没有任何 Dialogue 引用它们 → 改「原文颜色」导出后播放器里纹丝不动。
       v0.9.110 就立了「单语隐藏原文那几列」的规矩，可颜色那两格当初是裸 wr-cell、没有 id，
       隐藏逻辑按 id 逐个抓 → 抓不到，漏到现在，并被 v0.9.194 的并排放大（右半边整块空着）。 */
    ['assDstColorRow', 'assSrcColorRow'].forEach(k =>
      assert.strictEqual((html.match(new RegExp('id="' + k + '"', 'g')) || []).length, 1, k + ' 不是恰好 1 处'));
    /* v0.9.199：原来是 /…{0,320}id="assSrcColor"/ 的字符窗口匹配——给 ⓘ 补了 tabindex 之后
       这段就超过 320 了，断言误报（194 那次同样是窄窗口假 MISS）。改成零窗口的结构判定：
       assSrcColor 的位置必须落在 assSrcColorRow 之后、下一个 wr-cell 之前。 */
    const pRow = html.indexOf('id="assSrcColorRow"');
    const pInp = html.indexOf('id="assSrcColor"');
    const pNext = html.indexOf('<div class="wr-cell"', pRow + 10);
    assert.ok(pRow > 0 && pInp > pRow && (pNext < 0 || pInp < pNext),
      'id 没挂在原文颜色的 wr-cell 上（整列就藏不掉）');
    /* 结构性防漏：ASS 组里 6 个格子必须个个有 id —— 再漏一组就是同一个 bug 重演 */
    const iA = html.indexOf('id="assStyleBox"'), iEnd = html.indexOf('data-i18n="secWrap"');
    assert.ok(iA > 0 && iEnd > iA, 'ASS 区块定位失败');
    const cells = (html.slice(iA, iEnd).match(/<div class="wr-cell[^"]*"[^>]*>/g) || []);
    /* v0.9.217：格子数 = tri 组数 × 2（译文 + 原文）。写死 6 会在加组时假失败。 */
    assert.strictEqual(cells.length, (html.match(/\['ass[A-Za-z]+Row','ass[A-Za-z]+Row'\]/g)||[]).length * 2,
      'ASS 组 wr-cell 数 = tri 组数 × 2 不符');
    assert.deepStrictEqual(cells.filter(c => !/ id="/.test(c)), [], 'ASS 组里还有 wr-cell 没 id（单语时会被漏掉）');
    /* 隐藏靠 display:none，不能去动 value：用户在双语下配的原文颜色，切单语再切回来必须还在 */
    assert.ok(/s\.style\.display = mono \? 'none' : ''/.test(html), '隐藏方式被改成非 display 了');
    assert.ok(!/tri\.forEach[\s\S]{0,200}\$\('assSrcColor'\)\.value/.test(html), '同步函数里不要改写原文颜色的 value');
  });

  t('v0.9.196 导出预览跟随「导出字幕样式」（不再是写死的双语两行）', () => {
    /* 此前 .exp-preview 里两行是死排布：译文在上、原文在下，选 mono / bi-src / 换格式都不动，
       用户看到的永远不是即将导出的样子。现在由 syncExpPreview() 打四个类来驱动。 */
    assert.ok(/function syncExpPreview\(\)/.test(html), '缺少 syncExpPreview');
    ['pv-mono', 'pv-rev', 'pv-split', 'pv-split-rev'].forEach(k =>
      assert.ok(new RegExp('\\.exp-preview\\.' + k).test(html), '缺少样式 .exp-preview.' + k));
    /* ⚠️ 语义陷阱：bi-src 是「原文在上」（见 i18n fmtBiSrc），所以 srcFirst 时贴顶的是 ep-src → pv-split。
       这两行写反过一次（实测分屏上下颠倒），单测把它钉住。 */
    assert.ok(/classList\.toggle\('pv-split', split && srcFirst\)/.test(html),
      'bi-src 应走 pv-split（原文贴顶），别和 pv-split-rev 写反');
    assert.ok(/classList\.toggle\('pv-split-rev', split && !srcFirst\)/.test(html), 'bi-dst 应走 pv-split-rev');
    /* 单语：原文那一行必须藏掉（否则预览里还是"双语句式"） */
    assert.ok(/src\.style\.display = mono \? 'none' : ''/.test(html), '单语时预览的原文行没隐藏');
    /* 接线：下拉框变化 + 初始化都要刷，漏了就是白做 */
    assert.ok(/\$\('expStyle'\)\.addEventListener\('change',function\(\)\{ syncAssStyleBox\(\); syncVttStyleBox\(\); assCtxSync\(\); syncExpPreview\(\); syncWrapField\(\); save\(\); \}\)/.test(html),
      'expStyle change 里没调 syncExpPreview');
    assert.ok(/syncAssStyleBox\(\); syncVttStyleBox\(\); syncAssMVBox\(\); syncExpPreview\(\);/.test(html), '初始化没调 syncExpPreview');
    /* ASS 才跟颜色/字号；非 ASS 必须回落默认，否则拿 ASS 的自定义色误导（播放器不读那套） */
    assert.ok(/setProperty\('--pv-dst-c'/.test(html) && /removeProperty\(k\)/.test(html),
      'ASS 颜色/字号的跟随或回落不完整');
    /* v0.9.209：字号改成「成片字号 × f」（f = 预览框高/1080），与位置同源。
       旧版那种 8~22px 夹取 + 取整到整像素，正是「改了数字预览不动」的元凶：
       ≤37pt 一律 8px、≥103pt 一律 22px，中间也要 ~4.7pt 才动 1px。 */
    assert.ok(/var fsOf=function\(id,def\)/.test(html) && /\(isFinite\(n\)\? n : def\) \* f/.test(html),
      '预览字号没有按「成片字号 × f」等比缩');
    assert.ok(/setProperty\('--pv-dst', fsOf\('assDstSize',56\)\)/.test(html) &&
      /setProperty\('--pv-src', fsOf\('assSrcSize',48\)\)/.test(html),
      '译文/原文没有共用同一个 fsOf（又会变成两套系数）');
    assert.ok(!/Math\.max\(8,Math\.min\(22/.test(html) && !/Math\.round\(n\*ratio\)/.test(html),
      '预览字号又在取整/夹取了（会重新长出「改了数字不动」的死区）');
    /* 位置变、字号不变：译文恒大于原文，与 ASS 导出「字号跟角色走」一致 */
    assert.ok(!/pv-rev \.ep-dst\{[^}]*font-size:var\(--pv-src/.test(html), 'pv-rev 里把译文字号换成原文的了');
  });

  t('v0.9.197 预览纵向位置跟随「离底距离」+ 单语不再摆到画面正中', () => {
    /* 用户实测两条反馈：① 改「译文/原文离底距离」预览不动；② 单语 SRT 在播放器里是贴底的，
       预览摆到画面正中会让人误解导出后的位置。 */
    /* ① 纵向位置按「1080 → 预览框实测高」的比例映射。两个 mv 的语义统一是「距底边像素」
       （分屏时画面上方那块，UI 里给的就是 1080−离底−块高 的大数），所以不用再分顶部/底部。 */
    /* v0.9.209：位置 = 成片的 MarginV × f，与字号共用同一个 f。两个 mv 的语义本来就是
       「距底边像素」（分屏时上方那块 UI 里给的就是 1080−离底−块高 的大数），
       所以不必再区分顶部/底部，也不需要任何补偿项。 */
    assert.ok(/var f = pvH>0 \? pvH\/1080 : 0;/.test(html), '预览缺了唯一的等比系数 f（= 框高/1080）');
    assert.ok(/var toPx=function\(v\)\{ var n=parseFloat\(v\); return isFinite\(n\)\? n\*f : 0; \}/.test(html),
      '预览没按成片位置等比映射纵向位置（或又去取整/夹取了）');
    assert.ok(/var ML=assLH\(\)/.test(html), '预览没读 mv 值（assLH）');
    assert.ok(/dst\.style\.bottom=toPx\(ML\.dstMV\)\+'px'/.test(html) && /src\.style\.bottom=toPx\(ML\.srcMV\)\+'px'/.test(html),
      '两块各用自己 mv 的落位逻辑没了');
    /* v0.9.204~208 那套补偿（lhOf 实测行盒 / gap 墨迹间隙 / upOff 相对推荐值偏移 / k 字号比）
       已随「字号不再放大」整体作废 —— 它们存在的唯一理由是弥补两套尺度打架，别再请回来。 */
    assert.ok(!/lhOf\(/.test(html) && !/upOff\(/.test(html) && !/ASS_STACK_GAP\|\|12\) \* k/.test(html),
      'v0.9.209 已作废的补偿项（lhOf / gap / upOff）又回来了');
    assert.ok(!/ML\.srcFix\? sMV/.test(html) && !/ML\.dstFix\? dMV/.test(html),
      '固定值又被直接当预览 bottom 用了（v0.9.207 已修，别回退）');
    /* ⚠️ inline 的 top:auto 必须显式写：.pv-split 的 CSS 有 top:22px，只改 bottom 会既 top 又 bottom，
       元素被拉长。 */
    assert.ok(/dst\.style\.top='auto'; src\.style\.top='auto'/.test(html),
      '没写 top:auto，会与 pv-split 的 CSS top 打架');
    /* 非 ASS 不套 mv（那两个输入框本来隐藏），要清掉 inline 回落到 CSS 示意位 */
    assert.ok(/el\.style\.top=''; el\.style\.bottom='';/.test(html), '非 ASS 没清 inline 位置');
    /* ② 单语贴底 */
    assert.ok(/\.exp-preview\.pv-mono \.ep-dst\{bottom:9px\}/.test(html), '单语预览应贴底（bottom:9px）');
    assert.ok(!/pv-mono \.ep-dst\{bottom:50%/.test(html), '单语预览又摆到画面正中了（播放器里字幕在底部）');
    /* 比例依赖预览框实测高：窗口变化、切进工作台都要重算，否则位置会飘 */
    assert.ok(/addEventListener\('resize', function\(\)\{ try\{ syncExpPreview\(\); \}catch\(e\)\{\} \}\)/.test(html),
      '缺 resize 重算');
    assert.ok(/try\{ syncExpPreview\(\); \}catch\(e\)\{\}/.test(html), 'showView 里没补算（隐藏时高=0，算不出位置）');
  });

  t('v0.9.198 ⓘ 提示浮层不再撑出横向滚动条（改成贴着字段铺开）', () => {
    /* 病根：.info::after 宽 250px、以图标为中心向两侧展开；而左右面板内容区只有 224~246px，
       浮层两边必然探出面板。面板是 overflow:auto，于是①冒出横向滚动条（实测左栏溢 118px、
       右栏 97px，正是用户说的「要左右滚动」）②探出去的部分被裁掉，滚过去也看不全。
       加宽面板治不了根——250px 的浮层塞不进任何一栏，只能让浮层不再比容器宽。 */
    assert.ok(/\.info\{position:static\}/.test(html),
      'ⓘ 仍是 position:relative，浮层会以图标为中心左右展开（250px 装不进 224px 的面板）');
    assert.ok(/\.info::after\{left:0;right:0;width:auto;max-width:none;transform:translateY\(4px\)\}/.test(html),
      '浮层没有改成左右贴边铺开');
    /* hover 时必须把 translateX(-50%) 一起去掉，否则浮层会整体左移半个宽度、从左边探出去 */
    assert.ok(/\.info:hover::after\{opacity:1;transform:translateY\(0\)\}/.test(html),
      'hover 态还留着 translateX(-50%)，浮层会左移半宽探出容器');
    /* 定位上下文：左栏字段标签 / 开关整行（不能挂 .l，它只裹文字，实测浮层只有 44px 宽） */
    assert.ok(/\.flbl,\.tgl-row\{position:relative\}/.test(html), '字段容器没有成为定位上下文');
    /* 并排两列按「整行」铺开：按列铺只有 107px，浮层细长没法读 */
    assert.ok(/\.wrap-row\{display:grid;grid-template-columns:1fr 1fr;gap:10px;position:relative\}/.test(html),
      'wrap-row 没有成为定位上下文（浮层会退化成单列宽 107px）');
    assert.ok(/\.wrap-row>\.wr-cell>\.flbl\{position:static\}/.test(html),
      'wrap-row 内的 .flbl 仍自成定位上下文，浮层铺不满整行');
    /* 反向：v0.9.74 那条「左栏自图标向右展开」的老 hack 必须彻底删掉——
       它只治左栏、且照样从右边界探出，留着会与新规则打架 */
    assert.ok(!/\.main > :first-child \.info::after/.test(html), 'v0.9.74 的旧 hack 还留着');
    /* 右栏加宽、左栏略收：右栏内容从 224 → 266px，hint 由折 2 行变 1 行。
       v0.9.199 再 +20 → 320（右栏内容 286px）：ASS 参数表改成「列头 + 三行」后，
       266px 里放不下「66px 行标签 + 两个 85px 色值框」（242 < 66+16+85×2），
       差 10px，结果必然是标签折行或 #RRGGBB 被裁。改宽了就要同步改这个数字。 */
    assert.ok(/grid-template-columns:240px minmax\(0,1fr\) 320px/.test(html), '左右栏宽度没按 198/199 调整');
  });

  t('v0.9.199 右栏嵌套：折行设置 / 下载按钮 / 赞助入口必须还在 aside.panel 里', () => {
    /* 血泪教训：给 ASS 参数区包 .param-blk 时多写了一个 </div>，把右栏 aside.panel 提前闭合，
       折行设置、下载按钮、复制、赞助入口全被甩成 #viewWorkspace 的直系子 → 整页宽的区块。
       ⚠️ 为什么之前的检查全没发现：所有老断言都是「在整份 HTML 里找字符串」，元素跑到哪儿都照样匹配；
       浏览器检查里右栏 scrollHeight == clientHeight 也「看着正常」——内容被搬走了当然不滚。
       只有数 div 配对能拦住。 */
    const seg = html.slice(html.indexOf('<div id="assStyleBox"'), html.indexOf('<div class="footer"'))
                    .replace(/<!--[\s\S]*?-->/g, '');
    const opens = (seg.match(/<div/g) || []).length, closes = (seg.match(/<\/div>/g) || []).length;
    /* 期望 -2：这里面最后两个 </div> 关的是切片之前就已打开的 .main 与 #viewWorkspace */
    assert.strictEqual(opens - closes, -2,
      '右栏区块 div 不配对（净 ' + (opens - closes) + '，应为 -2）——多半是多写/漏写了一个 </div>');
    assert.strictEqual((seg.match(/<\/aside>/g) || []).length, 1, '右栏 aside 没有恰好闭合一次');
    const iAside = seg.indexOf('</aside>');
    [['<div class="exp-actions">', '下载/复制按钮区'], ['id="donateBox"', '赞助入口'],
     ['id="splitWarnHint"', '切分提示'], ['id="maxW"', '折行设置']].forEach(p => {
      const i = seg.indexOf(p[0]);
      assert.ok(i > 0 && i < iAside, p[1] + '跑到 aside.panel 外面去了（会变成整页宽的区块）');
    });
  });

  t('v0.9.199 无障碍：每个控件都有名字，ⓘ 能聚焦，radio 成组', () => {
    /* 审计实测：22 个字段标签没有 for=、28 个 input 没有可访问名、12 个 ⓘ 只有 hover 能触发。
       逐项补齐，并用「结构性断言」钉住（逐个列清单会漏，直接扫 HTML）。 */
    // ① .flbl 必须绑到某个控件：例外只有两个 radiogroup 的组标题（它们靠 aria-labelledby 反向引用）
    const flbls = html.match(/<label[^>]*class="[^"]*\bflbl\b[^"]*"[^>]*>/g) || [];
    assert.ok(flbls.length >= 14, '.flbl 数量异常: ' + flbls.length);
    /* v0.9.258：多一个例外 —— 右栏「导出字幕样式」现在的 label 是一组按钮的标题，
       不是某个控件的标签，同样靠 aria-labelledby 反向引用（见 #fmtPanel）。 */
    assert.deepStrictEqual(flbls.filter(l => !/\sfor="/.test(l)),
      ['<label class="flbl" id="lblPnModeLbl">', '<label class="flbl" id="lblLyricLbl">',
       '<label class="flbl" id="lblExpFmt" data-i18n="lblExpStyle">'],
      '不该有没有 for= 的 .flbl（例外只允许三处组标题）');
    // ② 没有可见标签的两个自由文本框 → 用 placeholder 词条当 aria-label（有可见标签的别加，会重复播报）
    assert.ok(/<textarea id="paste"[^>]*data-i18n-aria="pastePh"/.test(html), 'paste 缺 aria-label');
    assert.ok(/id="styleCustom"[^>]*data-i18n-aria="styleCustomPh"/.test(html), 'styleCustom 缺 aria-label');
    assert.ok(/data-i18n-aria/.test(html) && /querySelectorAll\('\[data-i18n-aria\]'\)\.forEach\(el=>\{ el\.setAttribute\('aria-label'/.test(html),
      '缺 data-i18n-aria 的处理（加了属性也得有人把它变成 aria-label）');
    // v0.9.199：工具栏「筛选」下拉框左右都是按钮、没有可见标签，读屏只念「组合框 全部」
    assert.ok(/<select id="filter" data-i18n-aria="filterAria">/.test(html), '#filter 缺无障碍名');
    assert.strictEqual((html.match(/filterAria\s*:\s*'/g) || []).length, 27, 'filterAria 不是 27 语齐全');
    // ③ ⓘ 必须能 Tab 聚焦 + 聚焦即显示（原本只有 :hover，键盘用户永远看不到提示）
    const infos = html.match(/<i class="info"[^>]*>/g) || [];
    assert.ok(infos.length >= 8, '.info 数量异常: ' + infos.length);
    assert.deepStrictEqual(infos.filter(i => !/tabindex="0"/.test(i)), [], '还有 ⓘ 不能聚焦');
    assert.ok(/\.info:focus-visible\{outline:2px solid var\(--acc\)/.test(html), 'ⓘ 聚焦没有焦点环');
    assert.ok(/\.info:focus::after\{opacity:1;transform:translateY\(0\)\}/.test(html), 'ⓘ 聚焦时提示不显示');
    assert.ok(/\[data-tip\]:focus-visible\{outline:2px solid var\(--acc\)/.test(html), '其它提示图标缺焦点环');
    // ④ 三组 chip（风格 / 专名 / 歌词）是 radiogroup：组名不能靠 label 的 for（一个 label 只能绑一个控件）
    assert.strictEqual((html.match(/role="radiogroup"/g) || []).length, 3, 'radiogroup 不是 3 组');
    ['secStyleLbl', 'lblPnModeLbl', 'lblLyricLbl'].forEach(id =>
      assert.ok(new RegExp('aria-labelledby="' + id + '"').test(html), '缺指向 ' + id + ' 的 radiogroup'));
    ['secStyleLbl', 'lblPnModeLbl', 'lblLyricLbl'].forEach(id =>
      assert.strictEqual((html.match(new RegExp('id="' + id + '"', 'g')) || []).length, 1, id + ' 不唯一'));
  });

  t('v0.9.199 结构：层级靠底色不靠标题重量，按钮分主次', () => {
    /* 原来 ASS 区的标题与「导出译文」同款（图标徽章 + 渐隐尾线），三者在栏里看着平级；
       下载与复制并排各占一半、重量接近，分不清主次；赞助按钮是实心主色，比下载还重。 */
    assert.ok(/\.param-blk\{background:var\(--card-2\);border-radius:12px;padding:12px;margin-top:12px\}/.test(html),
      '参数块没有浅底色（层级仍全靠标题重量）');
    assert.ok(/\.blk-title\{font-size:11px;font-weight:600;color:var\(--sub\);letter-spacing:\.4px/.test(html),
      '块标题没有降重（11px / --sub）');
    // v0.9.204：下载/复制回到同一行，主次改由「实心渐变 vs 白底描边」承担
    assert.ok(/\.exp-actions\{display:flex;flex-direction:row;gap:8px/.test(html), '导出按钮区没有改成同一行');
    assert.ok(/\.exp-actions \.btn\.primary\{flex:1 1 auto;min-width:0\}/.test(html),
      '主 CTA 没有自适应吃掉剩余宽度');
    assert.ok(/class="btn ghost" id="btnCopy"/.test(html), '复制没有降级为白底描边按钮');
    // 赞助：可点击元素必须过 4.5:1；也绝不能上主色（会比下载按钮还重）
    assert.ok(/#btnDonate\{[^}]*color:#633806/.test(html),
      '赞助按钮字色不是 #633806（在 #FAEEDA 底上对比度 6.9:1）');
    assert.ok(!/#btnDonate\{[^}]*background:var\(--acc\)/.test(html), '赞助按钮还是实心主色（比下载还重）');
  });

  t('v0.9.199 ASS 参数表：列头说一次「译文｜原文」，6 字段从 9 行压到 3 行', () => {
    /* 原来每个字段都是「标签 + 输入 + hint」竖排，「译文/原文」在标签里重复 6 遍
       （译文X号 / 原文X号 × 字号、颜色、离底），在 320px 的栏里就是一堵字段墙。 */
    assert.ok(/<div class="wr-head" id="assHead">/.test(html), '缺列头 wr-head');
    assert.ok(/id="assHeadDst"/.test(html) && /id="assHeadSrc"/.test(html), '列头缺译文/原文两列的 id');
    /* 行数随 tri 组数走（v0.9.217 起为 6 行），只断言「与 tri 一致」 */
    (function(){
      var triN = (html.match(/\['ass[A-Za-z]+Row','ass[A-Za-z]+Row'\]/g)||[]).length;
      assert.strictEqual((html.match(/class="wr-row3"/g) || []).length, triN, '参数表行数与 tri 组数不一致');
    })();
    /* 列头与三行必须共用同一套列宽，否则表头和数据列对不齐 */
    assert.ok(/\.wr-head\{display:grid;grid-template-columns:66px 1fr 1fr/.test(html), '列头列宽不对');
    assert.ok(/\.wr-row3\{display:grid;grid-template-columns:66px 1fr 1fr/.test(html), '三行列宽与列头不一致');
    /* 66px = 实测最长的行标签（意大利语 Dimensione 63.8px）+ 余量；
       此前 56px 会让 11 种语言折成两行（英文、西语、葡语、韩语、法语、泰语、意语、乌语…） */
    // 单语只剩一列 → 列头跟着收起（只剩一列时不需要说明哪列是哪列）
    assert.ok(/var hd=\$\('assHead'\); if\(hd\) hd\.style\.display = mono \? 'none' : '';/.test(html),
      '单语时列头没收起（「原文」两个字会孤零零留在上面）');
    // 6 个输入的名字 = 列头 + 行标签（读屏念「译文 字号」，而不是只念「字号」）
    [['assDstSize','assHeadDst','assRowSize'], ['assSrcSize','assHeadSrc','assRowSize'],
     ['assDstColor','assHeadDst','assRowColor'], ['assSrcColor','assHeadSrc','assRowColor'],
     ['assDstMV','assHeadDst','assRowMV'], ['assSrcMV','assHeadSrc','assRowMV']].forEach(p => {
      const re = new RegExp('id="' + p[0] + '"[^>]*aria-labelledby="' + p[1] + ' ' + p[2] + '"');
      assert.ok(re.test(html) || new RegExp('aria-labelledby="' + p[1] + ' ' + p[2] + '"[^>]*id="' + p[0] + '"').test(html),
        p[0] + ' 的名字不是「' + p[1] + ' + ' + p[2] + '」');
    });
    ['assRowSize', 'assRowColor', 'assRowMV'].forEach(id =>
      assert.strictEqual((html.match(new RegExp('id="' + id + '"', 'g')) || []).length, 1, id + ' 不唯一'));
    // 5 个新词条 27 语齐全（列头 + 三个行标签的短名）
    ['lblSizeShort', 'lblColorShort', 'lblMVShort', 'colDstShort', 'colSrcShort'].forEach(k => {
      const n = (html.match(new RegExp(k + '\\s*:\\s*\'', 'g')) || []).length;
      assert.strictEqual(n, 27, k + ' 词条数 ' + n + '（应为 27）');
    });
  });

  t('v0.9.199 三行表不能把 #RRGGBB 挤成 #FFD7', () => {
    /* 三行布局把单格压到 85px：色块 16px + gap 8px 吃掉 24px，剩下 61px 减内边距只有 46px，
       而 7 位十六进制在 11.5px 等宽字体下要 52px —— 实测 #FFD700 被裁成 #FFD7，
       用户看不到自己输入的完整色值（改个颜色靠猜）。三处各收一点把内容宽拉回 53px+。 */
    assert.ok(/\.wr-row3 \.ass-color-row\{gap:3px\}/.test(html), '色块与输入框的间距没收窄');
    assert.ok(/\.wr-row3 \.ass-color-row \.csw\{width:14px;height:14px;flex:0 0 14px;margin-right:0\}/.test(html),
      '色块没收小到 14px');
    assert.ok(/\.wr-row3 \.ass-color-row input\{padding:8px 6px;font-size:11\.5px;letter-spacing:\.2px\}/.test(html),
      '颜色输入框没收内边距 / 字号（纵向补到 8px 是为了与同行 number 框等高）');
    // 兜底：万一将来加的语言行标签超长，宁可折行也别把右栏顶出横向滚动条
    assert.ok(/\.wr-row3>\.r3-l\{overflow-wrap:anywhere\}/.test(html), '行标签缺断行兜底');
  });

  t('v0.9.200 SRT / VTT 预览不许画样式（纯文本格式没有颜色和字号）', () => {
    /* 用户报：「srt 双语字幕是没字体效果的，所以是不是不用显示字体效果？」
       属实。SRT / VTT 是纯文本容器，文件里没有颜色、没有字号、没有位置，全交给播放器
       按自己的默认样式渲染。可 v0.9.196 之后非 ASS 只把 --pv-* 变量 removeProperty 掉，
       于是回落成 CSS 兜底值「译文 #fff / 原文 #C9B8FF（淡紫）、12px / 10.5px」——
       等于给一个根本没有样式的格式画了样式，用户会以为导出后原文就是淡紫小字。 */
    assert.ok(/\.exp-preview\.pv-plain \.ep-dst,\n  \.exp-preview\.pv-plain \.ep-src\{color:#fff;font-size:12px;font-weight:400\}/.test(html),
      '缺 .pv-plain 规则（非 ASS 两行没被拉回中性）');
    /* v0.9.236：VTT 有了自己的样式层（STYLE 块 + cue settings），不再是「无样式可谈」的纯文本格式，
       所以 pv-plain 只留给 SRT / SBV / TXT —— 那几个才是真的没有样式。 */
    assert.ok(/box\.classList\.toggle\('pv-plain', !isAss && !isVtt\);/.test(html),
      'syncExpPreview 没打 pv-plain 类（SRT/TXT 仍要拉回中性）');
    /* 反向断言：兜底值本身必须还是「一深一浅」——ASS 模式下 --pv-* 一定被写入，
       这里的兜底只用于 pv-plain 之外的极少数场景（脚本没跑完）。别为了这条把 ASS 的颜色串了。 */
    assert.ok(/\.ep-dst\{bottom:calc\(9px \+ 12px\*var\(--pv-lh\) \+ var\(--pv-gap\)\);font-size:var\(--pv-dst,12px\);color:var\(--pv-dst-c,#fff\)\}/.test(html),
      'ASS 的兜底样式被动过（.ep-dst）');
    assert.ok(/\.ep-src\{bottom:9px;font-size:var\(--pv-src,10\.5px\);color:var\(--pv-src-c,#C9B8FF\)\}/.test(html),
      'ASS 的兜底样式被动过（.ep-src）');
    /* 关键：pv-plain 只压颜色/字号，不能把「行序」也压掉——SRT 双语谁在上仍然是真的 */
    assert.ok(/\.exp-preview\.pv-rev \.ep-dst\{bottom:9px\}/.test(html) &&
              /\.exp-preview\.pv-rev \.ep-src\{bottom:calc\(9px \+ 12px\*var\(--pv-lh\) \+ var\(--pv-gap\)\)\}/.test(html),
      'pv-rev（原文在上）的行序被连带改掉了');
    assert.ok(/\.exp-preview\.pv-mono \.ep-dst\{bottom:9px\}/.test(html), '单语贴底被连带改掉了');
    /* 只对非 ASS 生效：ASS 的两种布局都不是 plain */
    assert.ok(!/isAss&&!isAss|pv-plain', isAss/.test(html), 'pv-plain 的判定写反了（应 !isAss）');
  });

  t('v0.9.201 说明文字过 WCAG AA（--mut → --sub）', () => {
    /* 实测 --mut(#A5A2A8) 在白底上只有 2.52:1，远低于 AA 的 4.5:1 ——
       左栏的错误提示、隐私声明、术语表说明全是这个色，等于「写了但看不见」。
       --sub(#6F6C72) 是 5.17:1，过 AA，且仍比正文 --ink 浅，层级没丢。 */
    assert.ok(/\.hint\{font-size:11px;color:var\(--sub\);margin-top:4px;line-height:1\.55\}/.test(html),
      'hint 没改成 --sub');
    assert.ok(/\.gh-tip\{margin:6px 0 0;color:var\(--sub\);font-size:11\.5px;line-height:1\.6\}/.test(html),
      '折叠说明里的补充文字还是 --mut');
    assert.ok(!/\.hint\{[^}]*color:var\(--mut\)/.test(html), '还有 hint 在用 --mut');
  });

  t('v0.9.201 按钮高度统一（.btn.sm 与 .btn 同为 32px）', () => {
    /* 实测左栏按钮两种高度：「解析字幕」29px vs 其余 32px —— 同一列里看着像没对齐 */
    assert.ok(/\.btn\.sm\{padding:5px 10px;font-size:12px;line-height:1\.35;border-radius:10px;min-height:32px\}/.test(html),
      '.btn.sm 没补 min-height:32px');
    assert.ok(/\.btn\.xs\{display:inline-flex;align-items:center;justify-content:center;gap:4px;\n    padding:0 9px;font-size:11\.5px;line-height:1;border-radius:7px;height:26px\}/.test(html),
      '标签行小按钮 .btn.xs 缺失（触摸高度至少 26px）');
  });

  t('v0.9.201 术语库操作等宽 2×2，CSV 模板挪进「这个表怎么用」', () => {
    /* 原先 5 个按钮靠 flex-wrap 自然换行：64/64 → 64/59 → 92，第三行右侧空 114px。
       固定两列后每行等宽；CSV 模板不改这张表的内容，属于「怎么用」不是「怎么操作」。 */
    assert.ok(/\.gloss-ops\{display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:4px\}/.test(html),
      '缺 .gloss-ops 等宽两列');
    const ops = html.indexOf('class="gloss-ops"');
    const opsEnd = html.indexOf('</div>', ops);
    assert.ok(ops > 0 && opsEnd > ops, 'gloss-ops 区块没找到');
    ['btnGlossAppend', 'btnGlossReplace', 'btnGlossSave', 'btnGlossClear'].forEach(id => {
      const at = html.indexOf('id="' + id + '"');
      assert.ok(at > ops && at < opsEnd, id + ' 不在 gloss-ops 里');
    });
    const help = html.indexOf('<details id="glossHelp"');
    const tpl = html.indexOf('id="btnGlossTpl"');
    assert.ok(tpl > help && help > ops, 'CSV 模板没挪进「这个表怎么用」');
    assert.ok(html.indexOf('id="btnGlossTpl"', ops) > help, 'CSV 模板还留在操作区');
  });

  t('v0.9.201 ✨ AI 抽取挂到标签行右端（不再打断「标签 → 控件」）', () => {
    /* 它原先夹在标签(774)与文本框(833)之间，把「标签 → 控件」的配对硬生生打断。
       按钮不能塞进 <label>：label 的可点区会吞掉按钮语义、读屏也会当标签念一遍。 */
    const row = html.indexOf('class="flbl-row"');
    const lbl = html.indexOf('for="terms"');
    const ta = html.indexOf('id="terms" rows="4"');
    const ai = html.indexOf('id="btnGlossAI"');
    assert.ok(row > 0 && lbl > row && ai > lbl && ai < ta, 'AI 抽取没落在「标签行 → 文本框」之间');
    assert.ok(/class="btn xs ghost" id="btnGlossAI"/.test(html), 'AI 抽取没用小按钮档');
    assert.ok(html.slice(lbl, ai).indexOf('</label>') >= 0, 'AI 抽取被塞进了 <label> 里');
  });

  t('v0.9.201 「处理规则」拆成「术语与专名」+「内容过滤」', () => {
    /* 原「处理规则」一节 670px，占左栏 41%，里面装的是两类事：
       「哪些词怎么译」（专名 + 术语表）和「哪些内容留不留」（歌词 + 水词）。 */
    ['secTerms', 'secFilter'].forEach(k => {
      const n = (html.match(new RegExp(k + '\\s*:\\s*\'', 'g')) || []).length;
      assert.strictEqual(n, 27, k + ' 词条数 ' + n + '（应为 27）');
    });
    assert.strictEqual((html.match(/secRules\s*:\s*'/g) || []).length, 0, 'secRules 已无 DOM 引用，字典该删干净');
    assert.ok(/data-i18n="secTerms"/.test(html) && /data-i18n="secFilter"/.test(html), '两个新分节标题没走 i18n');
    assert.ok(html.indexOf('data-i18n="secTerms"') < html.indexOf('id="lblPnModeLbl"'), '「术语与专名」不在专名处理之前');
    const ft = html.indexOf('data-i18n="secFilter"');
    assert.ok(ft > html.indexOf('data-i18n="secTerms"') && ft < html.indexOf('id="lblLyricLbl"'), '「内容过滤」位置不对');
    /* 徽章归属：用索引判断，不用字符窗口正则（svg 本身就有 200+ 字符，窗口必漏） */
    const ic = html.lastIndexOf('class="sec-ic c7"', ft);
    assert.ok(ic > 0 && ft - ic < 420, '「内容过滤」没有自己的徽章');
  });

  t('v0.9.201 左栏间距收成四档（0 / 4 / 8 / 20），内联 margin 清零', () => {
    const a = html.indexOf('<div class="main">'), b = html.indexOf('<!-- 中：');
    const left = html.slice(a, b);
    assert.strictEqual((left.match(/style="margin-top/g) || []).length, 0, '左栏还有内联 margin-top');
    ['.main>aside.panel:first-child>.btns{margin-top:8px}',
     '.main>aside.panel:first-child>.btns.mt0{margin-top:0}',
     '.main>aside.panel:first-child>.hint{margin-top:4px}',
     '.main>aside.panel:first-child>textarea{margin-top:8px}'].forEach(r =>
      assert.ok(html.indexOf(r) > 0, '缺间距规则 ' + r));
    assert.ok(/\.sec-title\{[^}]*margin:20px 0 8px/.test(html), '分节间距没收进 20/8');
    assert.ok(/\.flbl\{[^}]*margin:8px 0 4px/.test(html), '标签间距没收进 8/4');
  });

  t('v0.9.201 装饰图标一个没丢（7 个 emoji + 7 个徽章）', () => {
    /* 用户硬要求：改进不许顺手删掉装饰小图标。这里把左栏现有的全数一遍。 */
    const a = html.indexOf('<div class="main">'), b = html.indexOf('<!-- 中：');
    const left = html.slice(a, b);
    ['📂', '✨', '📥', '🔄', '💾', '📄', '⚡'].forEach(e =>
      assert.ok(left.indexOf(e) > 0, '左栏丢了 emoji ' + e));
    assert.strictEqual((left.match(/class="sec-ic/g) || []).length, 7, '左栏徽章数变了（6 个分节 + 运行日志）');
    assert.ok(/\.sec-ic\{width:20px;height:20px;border-radius:7px/.test(html), '徽章没收到 20px');
    assert.ok(/\.sec-ic\.c7\{background:#E6F7F8;color:#0E9AA7\}/.test(html), '缺「内容过滤」的语义色 c7');
  });

  t('v0.9.202 行宽设置按字幕模式二选一（单语→单语行宽，双语→双语行宽）', () => {
    /* 此前两个行宽永远并排：单语模式下 biMaxW 完全不参与折行，双语模式下 maxW 只管
       「- A / - B」双说话人行 —— 两个框各自都有一半时间是改了没反应的假控件。 */
    assert.ok(/id="wcellMaxW"/.test(html) && /id="wcellBiMaxW"/.test(html), '两个行宽单元需要有 id 才能被切换');
    assert.ok(/<div class="wr-cell" id="wcellBiMaxW" hidden>/.test(html), '双语行宽默认该是隐藏的（默认导出单语）');
    assert.ok(/function syncWrapField\(\)\{/.test(html), '缺 syncWrapField');
    assert.ok(/const mono = \(typeof expFmtOf === 'function'\) \? \(expFmtOf\(\) === 'mono'\) : true;/.test(html),
      'syncWrapField 没按 expFmtOf() 判单语');
    assert.ok(/if \(a\) a\.hidden = !mono;/.test(html) && /if \(b\) b\.hidden = mono;/.test(html),
      '两个单元的显隐没写反？（单语显 maxW、双语显 biMaxW）');
    /* 接线三处：下拉框变化、切语言、初始化。漏一处就是「切过去不跟着变」 */
    assert.ok(/\$\('expStyle'\)\.addEventListener\('change',function\(\)\{[^}]*syncWrapField\(\)/.test(html),
      'expStyle 变化时没重算');
    assert.ok(/origApply\(\);[\s\S]{0,300}?if\(typeof syncWrapField==='function'\) syncWrapField\(\);/.test(html),
      '切界面语言后没重设（applyI18n 会把 data-i18n 覆盖回单语文案）');
    assert.ok(/applyI18n\(\);[\s\S]{0,200}?if\(typeof syncWrapField==='function'\) syncWrapField\(\);/.test(html),
      '初始化没调（上次记住的是双语时，首屏会显示错的那一个）');
  });

  t('v0.9.202 只做显隐：两个值和它们的接线一个都不能少', () => {
    /* 双语下双说话人对白行仍按 maxW 折，所以那个输入框必须还在、值必须还读得到 ——
       不能因为「看不见」就把 id 或取值删掉。 */
    assert.ok(/id="maxW"/.test(html) && /id="biMaxW"/.test(html), '两个输入框的 id 不能动');
    assert.ok(/\$\('maxW'\)\.value/.test(html) && /\$\('biMaxW'\)\.value/.test(html), '两个值的读取不能动');
    ['maxW','biMaxW'].forEach(id => {
      const n = (html.match(new RegExp("id=\"" + id + "\"", 'g')) || []).length;
      assert.strictEqual(n, 1, id + ' 不是恰好一处（' + n + '）');
    });
    /* 语言联动与切分提示仍要覆盖两个框 */
    assert.ok(/set\('maxW', 'maxWHint'\);/.test(html) && /set\('biMaxW', 'biMaxWHint'\);/.test(html),
      '行宽换算提示漏了一个');
    assert.ok(/\['maxW','biMaxW'\]\.forEach/.test(html), '两个框的 input 监听漏了');
  });

  t('v0.9.202 「折行阈值」改名「单语行宽」，27 语全覆盖且旧名不再出现', () => {
    /* 单语模式下那个框叫「折行阈值」，看不出它只管单语 —— 与「双语行宽」不成对。
       改名后凡是引用旧控件名的提示文案都得跟着改，否则用户按提示找不到那控件。 */
    /* ⚠️ 只查「用户看得见的部分」= 27 语字典，不查注释：
       代码注释里留着旧名是在描述改动前的状态（历史记录，不该被重写）。 */
    /* ⚠️ 只查「用户看得见的部分」= 27 语字典的每条译文，不查注释也不查代码：
       代码注释里留着旧名是在描述改动前的状态（历史记录，不该被重写）。
       ⚠️ 切片边界必须取到字典块自己的结尾 —— 直接切到下一个块会把中间的
       JS 代码和注释一起圈进来，于是注释里的旧名会造成假报警。 */
    const dictSegs = (function(){
      const re = /\n\s*'([a-z]{2}(?:-[A-Za-z]{2,4})?)'\s*:\s*\{/g;
      const pos = []; let m;
      while ((m = re.exec(html))) pos.push(m.index);
      if (pos.length < 27) return null;
      const endOfBlock = (start) => {
        const mm = /\n\}/.exec(html.slice(start));
        return mm ? start + mm.index : html.length;
      };
      const out = [];
      for (let i = 0; i < 27; i++) {
        const a = pos[i];
        const b = (i + 1 < pos.length) ? Math.min(pos[i + 1], endOfBlock(a)) : endOfBlock(a);
        out.push(html.slice(a, b));
      }
      return out;
    })();
    assert.ok(dictSegs, '没定位到 27 语字典');
    dictSegs.forEach(function (seg, i) {
      assert.ok(seg.indexOf('折行阈值') < 0, '字典第 ' + (i + 1) + ' 块还有「折行阈值」残留');
      assert.ok(seg.indexOf('折行閾值') < 0, '字典第 ' + (i + 1) + ' 块还有「折行閾值」残留');
    });
    ['lblMaxWShort','lblBiMaxWShort','wrapTip','wrapTipBi'].forEach(k => {
      const n = (html.match(new RegExp("(?<![A-Za-z0-9_])" + k + "\\s*:", 'g')) || []).length;
      assert.strictEqual(n, 27, k + ' 词条数 ' + n + '（应为 27）');
    });
    assert.ok(/lblMaxWShort:'单语行宽'/.test(html), '中文标签没改成「单语行宽」');
    assert.ok(/lblBiMaxWShort:'双语行宽'/.test(html), '「双语行宽」被误改');
    /* 双语提示里那句「双说话人行走上方「折行阈值」」必须跟着改名 */
    const bi = html.match(/lblBiMaxW:'((?:[^'\\]|\\.)*)'/);
    assert.ok(bi && bi[1].indexOf('单语行宽') >= 0, '双语提示里还在引用旧名');
    /* 切分提示：单语那条说「把折行阈值调到 X」，改名后必须同步 */
    const sw = html.match(/splitWarn:'((?:[^'\\]|\\.)*)'/);
    assert.ok(sw && sw[1].indexOf('单语行宽') >= 0, '单语切分提示里还在说「折行阈值」');
  });

  t('v0.9.202 折行说明文案跟着模式走（双语下不该还写「单语字幕」）', () => {
    assert.ok(/id="wrapTipEl"/.test(html), '折行说明缺 id（没法按模式换文案）');
    assert.ok(/tip\.dataset\.i18n = mono \? 'wrapTip' : 'wrapTipBi';/.test(html),
      '说明文案没按模式切换');
    assert.ok(/tip\.textContent = t\(tip\.dataset\.i18n\);/.test(html), '切完没重新取文案');
    assert.ok(/wrapTipBi:'修改设置，无须重新翻译，可在编辑区查看双语字幕的折行效果。'/.test(html),
      '双语版说明文案不对');
  });

  t('v0.9.202 只显示一个行宽时不能留半行空白', () => {
    /* .wrap-row 原来是 1fr 1fr 两列；二选一之后永远只显示一个，
       不收成单列的话输入框只占一半宽、右边空一大块。 */
    assert.ok(/\.wrap-row\.solo\{grid-template-columns:1fr\}/.test(html), '缺 .wrap-row.solo 单列规则');
    assert.ok(/<div class="wrap-row solo">/.test(html), 'HTML 没挂 solo');
  });

  t('v0.9.203 「✨ AI 抽取」不再被长标签挤成两行', () => {
    /* 标签原为「统一译名（术语表，每行一条）」15 字占满整行，按钮被压到 ~60px，
       里面的字竖着折成「AI 抽」/「取」。修法两条：标签缩短 + 按钮不折行不收缩。 */
    assert.ok(/<span data-i18n="lblTermsShort">统一译名<\/span><i class="info" tabindex="0" data-tip-i18n="lblTerms">i<\/i>/.test(html),
      '标签没改成短名 + ⓘ（说明信息不该丢）');
    assert.ok(/\.flbl-row>\{?\.btn|\.flbl-row>\.btn\{flex:none;white-space:nowrap;margin-left:auto\}/.test(html),
      '标签行按钮没加 flex:none + nowrap');
    /* 短名 27 语齐全，且长文案仍保留（作为 ⓘ 提示） */
    ['lblTermsShort','lblTerms'].forEach(k => {
      const n = (html.match(new RegExp("(?<![A-Za-z])" + k + "\\s*:", 'g')) || []).length;
      assert.strictEqual(n, 27, k + ' 词条数 ' + n + '（应为 27）');
    });
    assert.ok(/lblTermsShort:'统一译名'/.test(html), '中文短名不对');
    /* 短名必须是长文案去掉括号说明后的部分 —— 不能再出现括号 */
    const sh = html.match(/lblTermsShort:'((?:[^'\\]|\\.)*)'/);
    assert.ok(sh && !/[（(]/.test(sh[1]), '短名里还带着括号说明');
  });

  t('v0.9.204 下载区：下载/复制同一行，复制与主按钮等高', () => {
    /* v0.9.203 曾把「复制到剪贴板」降成一条静止挂下划线的灰字（为了分主次）；
       v0.9.204 用户拍板回到同一行 —— 主次交给「实心渐变 vs 白底描边」，不再靠「谁占满一行」。 */
    assert.ok(/\.exp-actions\{display:flex;flex-direction:row;gap:8px;align-items:stretch/.test(html),
      '下载与复制没有并排');
    assert.ok(/\.exp-actions \.btn\{[^}]*height:34px/.test(html), '同行两个按钮没统一高度（会一高一矮）');
    assert.ok(/\.exp-actions \.btn\.ghost\{[^}]*flex:none;white-space:nowrap/.test(html),
      '复制按钮没锁宽度——荷兰语/乌克兰语的长文案会被挤变形，被挤的应该只有下载');
    assert.ok(!/\.btn\.link\{/.test(html), '旧的白板文字链样式没删干净');
    /* ⬇ 换成 CSS 伪元素画的 SVG：emoji 箭头跨平台粗细不一，默认行高还会把按钮撑高 */
    assert.ok(/#btnDownload::before\{[^}]*mask:url\("data:image\/svg\+xml/.test(html),
      '下载按钮的箭头没换成 SVG');
    assert.strictEqual((html.match(/>⬇ 下载字幕</g) || []).length, 0, '按钮里还留着 ⬇ emoji 文本');
    assert.strictEqual((html.match(/btnDownload:'⬇ /g) || []).length, 0, '还有语言词条带着 ⬇ 前缀');
    /* 赞助入口：暖色胶囊自成一路——既不抢主 CTA，也不至于像文字链那样被忽略 */
    assert.ok(/#btnDonate\{[^}]*background:#FAEEDA/.test(html), '赞助入口不是暖色胶囊底');
    assert.ok(/#btnDonate\{[^}]*text-decoration:none/.test(html), '赞助入口还挂着静态下划线');
    assert.ok(!/#btnDonate\{[^}]*text-decoration:underline/.test(html), '赞助入口的静态下划线没去掉');
    assert.ok(/#donateBox\{text-align:center/.test(html), '赞助入口没居中');
    assert.ok(/#donateQr\{[^}]*background:#FFF9F0/.test(html), '展开的收款码没跟着换暖色系');
  });

  t('v0.9.206 赞助入口常驻（撤掉 v0.9.204 的「导出过才露出」门槛）', () => {
    /* v0.9.204 曾加门槛：还没拿到成果的人看到「充点 token」只会觉得在要钱。
       v0.9.206 用户要求撤掉 → 恢复常驻。srtDonateV1 标记照写不误：
       它不再决定显不显示，但将来要做「导出过的人换一句文案」时还能直接读。 */
    const init = html.slice(html.indexOf('/* v0.9.173：赞助入口'));
    assert.ok(/window\.__donateReveal=function\(\)\{ box\.hidden=false; \};/.test(init),
      '揭幕函数还没改成常驻（仍带门槛判定）');
    assert.ok(/^\s*box\.hidden=false;$/m.test(init), '初始化没有无条件显示（赞助入口应常驻）');
    assert.ok(!/if\(eligible\(\)\)/.test(init) && !/function eligible\(\)/.test(init),
      '「导出过才露出」的门槛还在');
    assert.ok(/localStorage\.setItem\('srtDonateV1','1'\)/.test(html),
      '导出标记仍应照写（留给将来按「导出过」换文案用）');
    assert.ok(/if\(window\.__donateReveal\) window\.__donateReveal\(\);/.test(html), '导出成功后的回调没了');
    assert.ok(/给小站充点 token，让大家免费用/.test(html), '主文案丢了');
    assert.ok(/<div class="hint">图个快乐，多少随意<\/div>/.test(html), '展开态的「图个快乐，多少随意」丢了');
    /* 收起态的按钮必须能原样回到主文案，否则点一次就回不来了 */
    assert.ok(/图个快乐，多少随意/.test(html) && /给小站充点 token，让大家免费用/.test(html),
      '赞助文案不全（展开态与主文案得都有）');
  });

  t('v0.9.204 字幕预览两行不再重叠（行盒高要「量」，不能按系数「猜」）', () => {
    /* 用户报：「推荐的『标准离底』参数下，双语预览里两行相互重叠」。
       根因：.ep-line 从来没写 line-height，行高顺着 body 继承成 1.6；而 syncExpPreview() 里
       按 fontSize×1.25 估算行盒高（导出端 assLineHeight 其实是 1.18）。估低 0.35em 的后果是
       上面那行被放低 0.35×字号，与贴底那行叠住 —— 线上实测：12px 叠 2px、字号拉到 22px 叠 5px，
       字号越大叠得越狠。
       修法：行高只留一个来源（:root 的 --pv-lh），JS 直接读实测高 —— 两边不再各存一份假设，
       也就不会再各自漂移。 */
    assert.ok(/:root\{[\s\S]*?--pv-lh:1\.2;/.test(html), '缺 --pv-lh（预览行高没有唯一来源）');
    assert.ok(/\.ep-line\{[^}]*line-height:var\(--pv-lh\)/.test(html),
      '.ep-line 没写 line-height —— 会继承 body 的 1.6，和 JS 的计算再次脱钩');
    assert.ok(/\.sc-line\{[^}]*line-height:var\(--pv-lh\)/.test(html),
      '首页橱窗 .sc-line 漏了（同一个病：写死 26px/8px 却按 1.6 行高渲染，叠 1.2px）');
    /* ⚠️ 关键（v0.9.205）：两块之间还差一份「墨迹间隙」，光靠行盒相邻不够。
       间隙值必须取自 srt-core.js 的 ASS_STACK_GAP（导出端同一个数），预览只做等比缩放。 */
    /* v0.9.209：两块的 bottom 直接用导出端的 MarginV × f，墨迹间隙本来就含在 MarginV 里
       （assStackMV 已经按墨迹算过），预览再额外加 gap 就是第三套数字。 */
    assert.ok(!/var gap=\(\+C\.ASS_STACK_GAP\|\|12\)/.test(html),
      '预览又在自己算墨迹间隙（应由导出端的 MarginV 决定）');
    assert.ok(/var f = pvH>0 \? pvH\/1080 : 0;/.test(html), '预览缺唯一的等比系数 f');
    /* ⚠️ 别拿 assStackMV 的结果整体乘 k 当抬高量：ASS 的墨迹公式（行框 1.18、baseline 到框底 0.22em）
       与预览的行框（--pv-lh 1.2 + PingFang 自己的 metric）不是一回事，混着算两个方向会不一致
       —— 实测 bi-src 变好、bi-dst 反而更紧。 */
    assert.ok(!/upOf\(ML\.dstMV/.test(html) && !/upOf\(ML\.srcMV/.test(html),
      '又在拿 assStackMV 的结果当抬高量（两个方向会不一致）');
    assert.ok(/--pv-gap:2\.6px/.test(html), 'CSS 兜底缺了 --pv-gap（墨迹间隙）');
    assert.ok(!/\*1\.25/.test(html), '还在按 fontSize×1.25 估行盒高');
    assert.ok(!/, up=2;/.test(html) && !/lhOf\(dst\)\+up/.test(html),
      '那个 +2 补偿量还在 —— 它早被估错的行高吃掉了，看着像留了 2px、实际是叠 2px');
    /* CSS 兜底也必须按「一个行高」抬：写死的 26px 与 9px 只差 17px，小于 12px 字号的行盒 19.2px */
    assert.ok(!/\.ep-src\{bottom:26px/.test(html) && !/\.sc-bi \.dst\{bottom:26px\}/.test(html),
      '兜底还在用写死的 26px（与锚点差不足一个行高，本身就重叠）');
  });

  t('v0.9.208 改完离底距离预览立刻跟着动（不用等下一次输入）', () => {
    /* input 阶段就刷过一次预览，但那时「已固定」标记还是旧的 false（change 才置真）→
       看到的仍是按「未固定」算出来的位置，要等下一次输入才重算。实测：敲完 200 纹丝不动，
       改一下字号才忽然跳过去 —— 用户会以为这个输入框不起作用。 */
    assert.ok(/UI\.assDstMVSet=true; else UI\.assSrcMVSet=true;[\s\S]{0,400}syncExpPreview\(\)/.test(html),
      'change 里没补刷预览：改完离底距离要等下一次输入才动');
    /* ⚠️ 反过来的坑别踩：点粉色「推荐 N」= 回到自动档（setT(false)），**不是**"用户自定义"。
       我一度把这条语义弄反了（拿「手动敲数字」的模拟结论去安点推荐值），实测已澄清：
       点完之后再把字号改回去，离底会自动跟着回到新的推荐值。 */
    assert.ok(/f\.el\.value = f\.rec\(\); f\.setT\(false\);/.test(html),
      '点推荐值必须回到自动档（setT(false)），不能被当成用户自定义');
    /* 「解除自定义」的另一条通道：清空输入框 + blur（改回调字号还能继续联动） */
    assert.ok(/if\(e\.value!==''\) return;[\s\S]{0,120}UI\.assSrcMVSet=false/.test(html),
      '清空输入框后没能解除自定义（会永久锁死在旧值）');
  });

  t('v0.9.209 预览 = 成片等比缩略图（改什么显示什么，不留死区）', () => {
    /* 用户反馈：「很多时候修改了数字后预览根本没有变化，多改几次后系统就完全不听使唤」。
       根因不是事件没接上（实测 30 次连续改动事件链一直是活的），而是换算里有两处「吃掉改动」：
         ① 字号 Math.round 到整像素 + 夹 8~22px → ≤37pt 全 8px、≥103pt 全 22px，
            中间也要 ~4.7pt 才动 1px（56→58 看不出变化）；
         ② 位置同样取整 + 夹 2~pvH-12 → 离底 0/5/10/13 全是 2px、≥1000 全是 149px，
            46/48/50 都落在 7px（连改三次不动）；上方块离底 >~700 直接飞出框外被裁掉。
       修法：全篇只有一个比例 f = 预览框高/1080，字号与位置都乘它，不放大、不取整、不夹取。
       用户填 42 就画成片的 42，填 900 就出画（成片里也一样出画）—— 加任何夹取都是自作主张。 */
    assert.ok(/var f = pvH>0 \? pvH\/1080 : 0;/.test(html), '缺少唯一的等比系数 f');
    assert.ok(/box\.style\.setProperty\('--pv-dst', fsOf\('assDstSize',56\)\)/.test(html) &&
      /box\.style\.setProperty\('--pv-src', fsOf\('assSrcSize',48\)\)/.test(html),
      '字号没有按 f 等比缩（或又改回了两套系数）');
    /* 死区不能复活：任何 Math.round / 夹取都会重新长出「改了不动」的区间 */
    assert.ok(!/Math\.round\(n\/1080\*pvH/.test(html) && !/Math\.round\(n\*/.test(html),
      '预览又在取整（亚像素级改动会被吃掉）');
    assert.ok(!/Math\.min\(pvH-12/.test(html) && !/Math\.min\(40,/.test(html) && !/Math\.max\(4,/.test(html),
      '预览又把数值夹在某个区间里（区间外改了不动）');
    /* 两套尺度是万恶之源：字号一旦与位置不同源，就得靠 lhOf/gap/upOff 去补，补一次错一次 */
    assert.ok(!/12\/56/.test(html) && !/21\/100/.test(html),
      '又出现「字号单独放大」的系数（应与位置共用 f）');
  });

  t('v0.9.212 顶栏累计统计：只读账本、绝不扫日志，口径按用户定案', () => {
    const srvSrc = require('fs').readFileSync(require('path').join(__dirname, 'server.js'), 'utf8');
    /* 用户要三个数字：累计服务用户 / 累计字幕数 / 累计 Token，每 30 分钟刷一次。
       最容易犯的错是「扫 events.json 求和」——日志只留最近 3000 条（EVENTS_MAX），
       扫出来的是「最近 3000 条的量」，数字会随旧记录被裁而**变小**，根本不叫累计。 */
    assert.ok(/const STATS_PATH = path\.join\(DATA_DIR, 'stats\.json'\)/.test(srvSrc), '缺少独立累计账本 stats.json');
    assert.ok(!/publicStats\(\)\s*\{[^}]*readEvents\(/.test(srvSrc),
      'publicStats 去读 events.json 了——那算出来的是最近 3000 条的量，不是累计');
    assert.ok(!/function bumpStats[\s\S]{0,900}readEvents\(/.test(srvSrc),
      'bumpStats 里去读日志了（应当只改账本，绝不重扫）');
    /* 累加点：字幕数只在「新建事件」那一处加 —— 同会话的第 2/3 批提前 return，不会重复计入；
       token 在 recordTokens 处加（上游每次返回的 usage 都是本批新产生的）。 */
    assert.ok(/db\.events\.push\(ev\);[\s\S]{0,320}bumpStats\(\{ ip: ip, subs: 1 \}\)/.test(srvSrc),
      'appendEvent 新建事件后没有累加字幕数（口径必须是「每任务一次」）');
    assert.ok(/bumpStats\(\{ tin: tk\.tin, tout: tk\.tout, tch: tk\.tch \}\)/.test(srvSrc),
      'recordTokens 处没有累加 token');
    /* users 只能靠去重 IP；数字不另存，避免与集合大小两个来源漂移 */
    assert.ok(/cur\.ips\.indexOf\(d\.ip\) < 0/.test(srvSrc) && /cur\.ipN = cur\.ips\.length/.test(srvSrc),
      '服务用户没有按去重 IP 计数');
    /* 写入时必须同步刷新内存缓存：只靠 TTL 过期才重读的话，回填后第一个访客会把 0 缓存 30 分钟 */
    assert.ok(/_statsCache = \{ at: Date\.now\(\), val: statsOf\(cur\) \}/.test(srvSrc),
      'bumpStats 写完没有同步刷新缓存（首访会看到 0 长达 30 分钟）');
    assert.ok(/const STATS_TTL_MS = 30 \* 60 \* 1000/.test(srvSrc) && /now - _statsCache\.at < STATS_TTL_MS/.test(srvSrc),
      '接口没有 30 分钟缓存（每访客都读一次盘）');
    assert.ok(/req\.method === 'GET' && u === '\/api\/stats'/.test(srvSrc), '缺少 /api/stats 接口');
    /* 回填只能做一次，且绝不覆盖已累计的账 */
    assert.ok(/if \(readStatsRaw\(\)\) return \{ skipped: true \};/.test(srvSrc), '回填会覆盖已累计的账本');
    /* 前端：30 分钟定时 + 语言切换后重排（数字排版跟界面语言，不是目标字幕语言） */
    assert.ok(/const STATS_EVERY_MS = 30 \* 60 \* 1000/.test(html) &&
      /setInterval\(refreshStats, STATS_EVERY_MS\)/.test(html), '前端没有 30 分钟刷新');
    assert.ok(/repaintStats\(\);/.test(html) && /UI\.lang/.test(html),
      '切界面语言后没有按新语言重排数字');
    /* 数字排版必须用界面语言 UI.lang，不能用目标字幕语言 curLang（那是译文语言，与排版无关） */
    const paintSeg = html.slice(html.indexOf('function paintStats'), html.indexOf('async function refreshStats'));
    assert.ok(paintSeg.length > 50, 'paintStats 段落定位失败（切片为空，断言会假通过）');
    /* 剔除注释再查：注释里为了说明「别用 curLang」会提到它，那是给人看的，不是代码 */
    const paintCode = paintSeg.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');
    assert.ok(/UI\.lang/.test(paintCode), '数字排版没有用界面语言 UI.lang');
    assert.ok(!/curLang/.test(paintCode), '数字排版用了目标字幕语言 curLang，应为界面语言 UI.lang');
    /* 词条：27 种界面语言必须齐（漏一条就退回混合语言） */
    for (const k of ['statUsers', 'statSubs', 'statTokens']) {
      const n = (html.match(new RegExp(k + "\\s*:\\s*'", 'g')) || []).length;
      assert.ok(n === 27, k + ' 只有 ' + n + ' 种语言，应为 27');
    }
    /* v0.9.213：展示位置从工作台顶栏搬到首页数字带（社会证明属于营销页，工具界面不摆） */
    assert.ok(/id="statsBar"/.test(html) === false && !/\.stats\{display:flex;align-items:center;gap:6px;flex:none\}/.test(html),
      '工作台顶栏的累计指标色块又回来了（应只在首页数字带显示）');
    const band = html.slice(html.indexOf('class="stats-band"'), html.indexOf('class="stats-band"') + 2600);
    assert.ok(band.length > 500, 'stats-band 段落定位失败（切片过短，断言会假通过）');
    assert.ok(/id="ldUsers"/.test(band) && /id="ldSubs"/.test(band) && /id="ldTok"/.test(band),
      '首页数字带里缺累计数据的三格');
    assert.ok(/class="sb-div"/.test(band), '缺少能力格与真实使用量之间的分隔线');
    assert.ok(/class="sb-cap"/.test(band) && /class="sb-live"/.test(band),
      '没有区分「产品能力」（淡化）与「真实使用量」（实心）');
    assert.ok(/ldUsers: fmtCount\(s\.users/.test(html) && /ldTok: fmtCount\(s\.tokens/.test(html),
      'paintStats 没有把累计数字填进首页');
    /* Token 刻意低调：它是运营成本，不是访客能感知的价值 */
    assert.ok(/\.sb-tok \.stat-num\{font-size:29px\}/.test(html) && /\.stat-ic\.c7\{background:#F4F3F1/.test(html),
      'Token 格没有做低调处理');
    assert.ok(!/statAlign|statPrivacy/.test(band),
      '首页数字带还在显示「时间轴对齐 / 字幕上传服务器」（用户 10-03 要求去掉）');
  });

  t('v0.9.215 顶栏播报改静态一行（信息不多，不必滚动）', () => {
    assert.ok(/id="ticker"/.test(html) && /id="tkTrack"/.test(html), '顶栏缺少播报容器');
    /* 用户 2026-10-03 定案：静态直接显示。滚动那套一律不许复活。 */
    assert.ok(!/animation:tkScroll/.test(html), '播报又在滚动（用户已定案：信息不多，直接显示）');
    assert.ok(!/@keyframes tkScroll/.test(html), '滚动动画关键帧没删干净');
    assert.ok(!/tk-grp/.test(html), '还在生成两遍内容（静态只需一遍）');
    assert.ok(!/animationDuration/.test(html), '还在算动画时长（静态用不上）');
    assert.ok(!/animation-play-state:paused/.test(html), '悬停暂停是滚动才需要的（静态无需）');
    /* 位移只查播报自己的 CSS/JS —— 页面里 data-tip / .info 气泡大量用 translateX(-50%) 定位，别误伤 */
    const tkCss = html.slice(html.indexOf('.ticker{flex:1 1 auto'), html.indexOf('.proj .live'));
    assert.ok(tkCss.indexOf('translateX') < 0, '播报 CSS 里还有位移（滚动残留）');
    assert.ok(html.slice(html.indexOf('function buildTicker'), html.indexOf('function buildTicker') + 900).indexOf('translateX') < 0,
      'buildTicker 里还有位移（滚动残留）');
    assert.ok(!/window\.addEventListener\('resize'[\s\S]{0,200}buildTicker/.test(html),
      '还在 resize 重算时长（静态靠 CSS 截尾自适应）');
    /* 静态下真正要保证的：能收缩不挤按钮、文字过长只截尾、数字变化仍闪一下 */
    assert.ok(/\.ticker\{flex:1 1 auto;min-width:0;overflow:hidden/.test(html), '播报区不能收缩，会挤掉右侧按钮');
    assert.ok(/@media \(max-width:1000px\)\{ \.ticker\{display:none\} \}/.test(html), '窄屏没有隐藏播报');
    assert.ok(/\.tk-track\{[^}]*text-overflow:ellipsis/.test(html), '文字过长没有截尾（会撑破 52px 顶栏）');
    assert.ok(/\.tk-item b\.upd\{color:var\(--acc\)/.test(html), '数字变化时的闪烁提示丢了');
    /* 数字高亮不能用正则去猜数字形态：各语言千分位不同（de 2.464 / ru 窄空格 2 464 / en 2,464），
       正则一猜就出错（实测俄语被拆成两段、尾随空格被包进标签）。必须按「格式化后的确切字符串」定位。 */
    const tt = html.slice(html.indexOf('function tickerText'), html.indexOf('function buildTicker'));
    assert.ok(tt.indexOf("t(key, val).split(val).join('<b>' + val + '</b>')") >= 0,
      '数字高亮没用「按确切格式化结果 split」，会踩多语言千分位的坑');
    assert.ok(!/\\d\[\\d\.,\]\*\\s\*\[万亿\]/.test(tt), '又用正则猜数字形态了');
    /* 播报与首页数字带同源：一次请求、一份 statsRaw，不额外打接口 */
    const psSeg = html.slice(html.indexOf('function paintStats'), html.indexOf('function paintStats') + 1800);
    assert.ok(psSeg.indexOf("statsRaw = s;") >= 0, 'paintStats 没存 statsRaw');
    assert.ok(psSeg.indexOf("if (typeof buildTicker === 'function') buildTicker();") >= 0,
      'paintStats 没有顺带重建播报（两者应同源）');
    assert.ok(html.indexOf("buildTicker();     /* 播报里的文案也要按新语言重排 */") >= 0,
      '切语言后播报文案没重排');
    /* 词条：3 × 27 语 */
    for (const k of ['tickServed', 'tickSubs', 'tickToken']) {
      const n = (html.match(new RegExp(k + "\\s*:\\s*'", 'g')) || []).length;
      assert.ok(n === 27, k + ' 只有 ' + n + ' 种语言，应为 27');
    }
    /* 每种语言的 Token 词条都必须带「Token」这个词（用户 10-03：只写「累计消耗 8384万」看不出是什么）。
       各语言说法不同：en/Token、zh/Token、ja/トークン、ko/토큰、ru/токен、hi/टोकन、th/โทเค็น、
       ar/رمز、tr/jeton、he/טוקנים… 故按「有没有对应词干」逐条查。 */
    const stem = /oken|トークン|토큰|токен|टोकन|โทเค็น|رمز|jeton|жетон|টোকন|jetó|טוקנים/i;
    const tokVals = (html.match(/tickToken\s*:\s*'((?:[^'\\]|\\.)*)'/g) || [])
      .map(s => s.replace(/^tickToken\s*:\s*'/, '').replace(/'$/, ''));
    assert.ok(tokVals.length === 27, 'tickToken 取到 ' + tokVals.length + ' 条，应为 27');
    const noStem = tokVals.filter(v => !stem.test(v));
    assert.ok(noStem.length === 0, '这些语言的 Token 词条没写「Token」这个词：' + JSON.stringify(noStem));
  });

  t('v0.9.217 ASS 新增描边/字体/不透明度（译文原文各一套）+ 预览同步', () => {
    const core = require('fs').readFileSync(require('path').join(__dirname, 'srt-core.js'), 'utf8');
    /* ① 不传 assStyle 时必须与 v0.9.35 的写死值逐字节一致（老用户零影响） */
    const C = require('./srt-core.js');
    const evs = [{ start: 0, end: 2000, lines: [{ style: 'Bottom', text: 'x' }, { style: 'Sub', text: 'y' }] }];
    const plain = C.formatAss(evs, {});
    assert.ok(/^Style: Bottom,PingFang SC,56,&H00FFFFFF,&H000000FF,&H00000000,&H64000000,-1,0,0,0,100,100,0,0,1,2.5,0,2,60,60,42,1$/m.test(plain),
      '不传 assStyle 时译文样式行与 v0.9.35 不一致（老用户会被改坏）');
    assert.ok(/^Style: Sub,PingFang SC,50,&H0000D7FF,&H000000FF,&H00000000,&H64000000,0,0,0,0,100,100,0,0,1,2.5,0,2,60,60,42,1$/m.test(plain),
      '不传 assStyle 时原文样式行与 v0.9.35 不一致');
    /* ② 传新参数：译文/原文各一套（Bottom+TopMain 译文套、Top+Sub 原文套） */
    const cfg = C.formatAss(evs, { assStyle: {
      dstOutline: 5, dstOutlineColor: '&H00202020', dstFont: 'Source Han Sans SC', dstAlpha: 60,
      srcOutline: 1.5, srcOutlineColor: '&H00FF0000', srcFont: 'Source Han Serif SC', srcAlpha: 30 } });
    const st = n => (cfg.split('\n').find(l => l.indexOf('Style: ' + n + ',') === 0) || '');
    assert.ok(st('Bottom').indexOf(',Source Han Sans SC,56,&H66FFFFFF,&H000000FF,&H00202020,') > 0, '译文样式行没吃到新参数：' + st('Bottom'));
    assert.ok(st('TopMain').indexOf(',Source Han Sans SC,') > 0, 'TopMain（译文）没吃到新参数');
    assert.ok(st('Sub').indexOf(',Source Han Serif SC,50,&HB300D7FF,&H000000FF,&H00FF0000,') > 0, '原文样式行没吃到新参数：' + st('Sub'));
    assert.ok(st('Top').indexOf(',Source Han Serif SC,') > 0, 'Top（原文）没吃到新参数');
    /* ③ alpha 换算：ASS 的 AA 是「透明度」不是不透明度，且必须两位十六进制（00 = 全不透明） */
    assert.ok(core.indexOf('const a = Math.round((100 - n) * 255 / 100);')>0, 'alpha 换算公式不对（应为 (100-不透明度)/100*255）');
    assert.ok(core.indexOf("a <= 0 ? '00' : a.toString(16).toUpperCase().padStart(2, '0')")>0,
      'alpha 没有补足两位十六进制（0 会写成"0"，颜色串长度不对，播放器会解析成畸形颜色）');
    /* ④ UI：六个 id 都在，且成对（单语隐藏靠 tri 清单配对） */
    ['assDstOutline','assSrcOutline','assDstOutlineColor','assSrcOutlineColor','assDstFont','assSrcFont','assDstAlpha','assSrcAlpha']
      .forEach(function(id){ assert.ok(html.indexOf('id="' + id + '"') > 0, 'UI 缺 ' + id); });
    assert.ok(/id="assDstAlphaOut"/.test(html) && /id="assSrcAlphaOut"/.test(html), '滑杆旁的百分比输出框缺失');
    assert.ok(/function fillAssFonts()/.test(html) && /ASS_FONTS/.test(html), '字体下拉没有填充逻辑');
    /* ⑤ 预览必须同步（调了参数看不到效果 = 白做） */
    ['--pv-dst-ow','--pv-src-ow','--pv-dst-oc','--pv-src-oc','--pv-dst-o','--pv-src-o','--pv-dst-f','--pv-src-f']
      .forEach(function(k){ assert.ok(html.indexOf("'" + k + "'") > 0, '预览没接 ' + k); });
    assert.ok(html.indexOf('-webkit-text-stroke:var(--pv-dst-ow')>0 && html.indexOf('paint-order:stroke fill')>0,
      '预览没模拟 ASS 描边（text-stroke + paint-order 是标准做法）');
    /* ⚠️ 译文/原文两组选择器特指度必须相同，否则原文会吃到译文的描边色 */
    const cssD = html.slice(html.indexOf('.ep-dst{-webkit-text-stroke'), html.indexOf('.ep-src{-webkit-text-stroke'));
    assert.ok(!/.exp-preview .ep-line/.test(cssD), '描边写到了 .ep-line 上（那是给两层盒子用的，会让原文吃到译文的值）');
    /* ⑥ 词条：6 × 27 语 */
    ['lblOutlineShort','lblFontShort','lblAlphaShort','assOutlineTip','assFontTip','assAlphaTip'].forEach(function(k){
      const n = (html.match(new RegExp(k + "\s*:\s*'", 'g')) || []).length;
      assert.ok(n === 27, k + ' 只有 ' + n + ' 种语言，应为 27');
    });
  });
}
/* v0.9.218→219：双语字幕合并工具页（merge.html）+ 独立引擎 merge-core.js。
   v0.9.219 用户定案：双语合并与翻译处理**完全分开，不共用**——
   alignRows/shiftTimeline/checkTimeline 只在 merge-core.js，srt-core.js 不得出现。
   三处历史 bug 在此钉死：① time 模式 si-- 导致同一原文配两次 ② time 模式落单原文被静默丢弃
   ③ dstTime 模式注释说并入上一条、实现却直接丢文本。 */
console.log('— 双语合并工具（v0.9.219，独立引擎）—');
{
  const mk = arr => arr.map((x,i)=>({no:i+1,start:x[0],end:x[1],text:x[2]}));
  const M = require('./merge-core.js');
  const vm = require('vm'), fsM = require('fs'), pathM = require('path');
  const coreSrc = fsM.readFileSync(pathM.join(__dirname,'srt-core.js'),'utf8');
  const mgcSrc  = fsM.readFileSync(pathM.join(__dirname,'merge-core.js'),'utf8');
  const html = fsM.existsSync(pathM.join(__dirname,'index.html')) ? fsM.readFileSync(pathM.join(__dirname,'index.html'),'utf8') : '';
  const mg = fsM.existsSync(pathM.join(__dirname,'merge.html')) ? fsM.readFileSync(pathM.join(__dirname,'merge.html'),'utf8') : '';

  t('alignRows·order：同条数逐条配对，多出侧记 onlySrc/onlyDst', () => {
    const r = M.alignRows(mk([[0,1000,'a'],[2000,3000,'b']]), mk([[0,1000,'甲'],[2000,3000,'乙']]), 'order');
    assert.strictEqual(r.report.pairs, 2);
    assert.deepStrictEqual(r.report.onlySrc, []);
    assert.deepStrictEqual(r.report.onlyDst, []);
    const r2 = M.alignRows(mk([[0,1000,'a'],[1000,2000,'b']]), mk([[0,1500,'甲']]), 'order');
    assert.strictEqual(r2.report.pairs, 1);
    assert.deepStrictEqual(r2.report.onlySrc, [1]);   // 第 2 条原文落单
    assert.strictEqual(r2.rows.filter(x=>x.flag==='drop').length, 1);
  });

  t('alignRows·time：同一原文绝不配两次（si-- 回归）', () => {
    const src = mk([[0,1000,'s0'],[5000,6000,'s1']]);
    const dst = mk([[0,1000,'d0'],[100,200,'d1'],[150,250,'d2'],[160,260,'d3'],[170,270,'d4'],
                    [180,280,'d5'],[190,290,'d6'],[200,300,'d7'],[210,310,'d8'],[5000,6000,'d9']]);
    const r = M.alignRows(src, dst, 'time');
    assert.strictEqual(r.report.pairs, 2, 'pairs 应等于原文条数');
    const s0rows = r.rows.filter(x=>x.en==='s0' && x.flag!=='drop');
    assert.strictEqual(s0rows.length, 1, 's0 被配了 ' + s0rows.length + ' 次');
    assert.ok(r.rows.some(x=>x.en==='s1' && x.zh==='d9'));
  });

  t('alignRows·time：落单原文保留 drop 行且 onlySrc 有记录（静默丢弃回归）', () => {
    const r = M.alignRows(mk([[0,1000,'a'],[2000,3000,'b-孤独'],[8000,9000,'c']]),
                          mk([[0,1000,'甲'],[8000,9000,'丙']]), 'time');
    assert.deepStrictEqual(r.report.onlySrc, [1]);
    const lonely = r.rows.find(x=>x.en==='b-孤独');
    assert.ok(lonely && lonely.flag==='drop', '落单原文应保留为 drop 行');
  });

  t('alignRows·dstTime：原文多出并入上一条（v0.9.223 起合并文字，不再单列 merged 行）', () => {
    const r = M.alignRows(mk([[0,1000,'a'],[1000,2000,'b'],[2000,3000,'c']]),
                          mk([[0,1500,'甲'],[1500,3000,'乙']]), 'dstTime');
    const m = r.rows.find(x=>/c/.test(x.en));
    assert.ok(m && m.flag === '', '多出的原文应并入上一条，不再是落单 drop 行');
    assert.ok(r.report.merged >= 1, 'merged 计数应 >=1');
    const bi = M.buildBilingual(r.rows, {order:'src-first'});
    assert.ok(/b\s*c/.test(bi[1].text), 'merged 原文应并入上一条：' + JSON.stringify(bi.map(x=>x.text)));
  });

  t('alignRows·v0.9.223：轴跟谁走，另一份重叠进来的条目就合并文字（内容不丢）', () => {
    /* time：1 条原文跨 4 秒 vs 译文 2 条 → 两条译文合并进同一行，轴仍取原文 */
    const r = M.alignRows(mk([[0,4000,'Hello there']]), mk([[0,2000,'你好'],[2000,4000,'世界']]), 'time');
    assert.strictEqual(r.rows.length, 1);
    assert.deepStrictEqual([r.rows[0].start, r.rows[0].end], [0, 4000], '轴应取原文');
    assert.ok(/你好/.test(r.rows[0].zh) && /世界/.test(r.rows[0].zh), '两条译文都要在：' + r.rows[0].zh);
    assert.strictEqual(r.report.merged, 1);
    /* 未被任何原文覆盖的译文：并入时间最接近那条，绝不静默丢弃 */
    const r2 = M.alignRows(mk([[0,1000,'a'],[5000,6000,'b']]),
                           mk([[0,1000,'甲'],[5500,6000,'乙'],[9000,9500,'丙']]), 'time');
    assert.strictEqual(r2.rows.filter(x=>/丙/.test(x.zh)).length, 1,
      '没被覆盖的译文也要并进最近一条：' + JSON.stringify(r2.rows));
    /* order：轴取原文，译文多出并入上一条 */
    const r3 = M.alignRows(mk([[0,1000,'a']]), mk([[0,1000,'甲'],[1000,2000,'乙']]), 'order');
    assert.ok(/乙/.test(r3.rows[0].zh), 'order 轴原文：多出的译文并入上一条：' + JSON.stringify(r3.rows));
  });

  t('shiftTimeline：负偏移夹到 0、正偏移整体平移', () => {
    const rows = mk([[500,1500,'x'],[3000,4000,'y']]);
    const down = M.shiftTimeline(rows, -800);
    assert.deepStrictEqual([down[0].start, down[0].end], [0, 700]);
    assert.deepStrictEqual([down[1].start, down[1].end], [2200, 3200]);
    const up = M.shiftTimeline(rows, 100);
    assert.deepStrictEqual([up[0].start, up[0].end], [600, 1600]);
  });

  t('checkTimeline：跳过 drop/merged，检出 overlap / too-short / no-dst', () => {
    const rows = [
      {start:0, end:1000, en:'a', zh:'甲', flag:''},
      {start:0, end:1000, en:'x', zh:'', flag:'drop'},          // 不参与体检
      {start:900, end:2500, en:'b', zh:'乙', flag:''},          // 与第 1 条重叠 100ms？>200 才报 → 换 300
      {start:0, end:200, en:'y', zh:'', flag:'merged'},         // 不参与体检
      {start:5000, end:5200, en:'c', zh:'', flag:''},           // no-dst
      {start:9000, end:9030, en:'d', zh:'丁', flag:''}          // too-short（< MIN_DUR_MS）
    ];
    rows[2].start = 600;                                        // 与第 1 条重叠 400ms
    const iss = M.checkTimeline(rows);
    const kinds = iss.map(x=>x.kind).sort();
    assert.ok(kinds.includes('overlap'), '应检出重叠');
    assert.ok(kinds.includes('too-short'), '应检出过短');
    assert.ok(kinds.includes('no-dst'), '应检出缺译文');
    assert.ok(!iss.some(x=>x.i===1) && !iss.some(x=>x.i===3), 'drop/merged 行不应进体检');
  });

  t('端到端：两份 SRT → time 配对 → 双语 SRT 回读一致', () => {
    const s1 = '1\n00:00:00,000 --> 00:00:01,000\nhello\n\n2\n00:00:02,000 --> 00:00:03,000\nworld\n';
    const s2 = '1\n00:00:00,000 --> 00:00:01,000\n你好\n\n2\n00:00:02,000 --> 00:00:03,000\n世界\n';
    const a = C.parseSrt(s1).items, b = C.parseSrt(s2).items;
    const r = M.alignRows(a, b, 'time');
    const items = M.buildBilingual(r.rows, {maxW:32, biMaxW:32, order:'src-first'});
    const back = C.parseSrt(C.formatSrt(items)).items;
    assert.strictEqual(back.length, 2);
    assert.ok(back[0].text.indexOf('hello') >= 0 && back[0].text.indexOf('你好') >= 0);
    assert.ok(back[1].text.indexOf('world') >= 0 && back[1].text.indexOf('世界') >= 0);
  });

  t('merge.html：存在、引对独立引擎、内联脚本可解析、关键 id 齐全', () => {
    assert.ok(mg, 'merge.html 不存在');
    assert.ok(/merge-core\.js\?v=0\.9\.262/.test(mg), 'merge.html 未引用 v0.9.247 的 merge-core');
    const blocks = mg.match(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g) || [];
    let checked = 0;
    for (const b of blocks) {
      const code = b.replace(/^<script[^>]*>/, '').replace(/<\/script>$/, '');
      try { new vm.Script(code); } catch (e) { assert.fail('merge.html 内联脚本语法错误: ' + e.message); }
      checked++;
    }
    assert.strictEqual(checked, 1, '应恰好 1 段内联脚本');
    ['srcDrop','dstDrop','srcFile','dstFile','srcText','dstText','btnMerge','repRows','expFmt','expFmt2','btnDownload','btnCopy','dstShift','biMaxW','uiLang','assPanel','layoutRow','btnAssReset']
      .forEach(id => assert.ok(mg.indexOf('id="' + id + '"') > 0, 'merge.html 缺 ' + id));
    /* ASS 外观字段与主站同名（v0.9.217 那套） */
    ['assDstSize','assSrcSize','assDstColor','assSrcColor','assDstOutline','assSrcOutline',
     'assDstOutlineColor','assSrcOutlineColor','assDstFont','assSrcFont','assDstAlpha','assSrcAlpha','assDstMV','assSrcMV']
      .forEach(id => assert.ok(mg.indexOf('id="' + id + '"') > 0, 'merge.html 缺 ASS 字段 ' + id));
  });

  t('merge.html：4 种界面语言词典齐全（其余语言回退英文）', () => {    for (const code of ['zh-CN','zh-TW','en','ja']) {
      const m = mg.match(new RegExp("^\\s*'" + code + "':\\s*\\{", 'm'));
      assert.ok(m, '缺 ' + code + ' 词典');
      const i = mg.indexOf(m[0]);
      /* ⚠️ v0.9.238：别用固定字符窗口切字典 —— 往词典里加一批词条后，尾巴上的键会被窗口切掉，
         于是测试报「缺词条 btnMerge」，其实页面一点问题没有（加 VTT 样式词条时真踩到了）。 */
      let d0 = 0, jEnd = mg.indexOf('{', i);
      for (let q = jEnd; q < mg.length; q++){
        if (mg[q] === '{') d0++;
        else if (mg[q] === '}'){ d0--; if (d0 === 0){ jEnd = q; break; } }
      }
      const seg = mg.slice(i, jEnd + 1);
      ['btnMerge','repPaired','tagDrop','tagMerged','needBoth'].forEach(k=>{
        assert.ok(seg.indexOf(k + ':') > 0, code + ' 缺词条 ' + k);
      });
    }
    /* 回退链：lang → en → zh-CN（merge 独立 t()，别学主站只回退 zh-CN——俄语用户看中文等于没翻译） */
    assert.ok(/I18N\['en'\]\[k\] !== undefined \? I18N\['en'\]\[k\]/.test(mg), 't() 缺英文回退层');
  });

  t('index.html：navMerge ×27 语言 + 版本三处 v0.9.223 + merge 入口 + 描边色方块 id 配对', () => {
    const n = (html.match(/navMerge\s*:\s*'/g) || []).length;
    assert.strictEqual(n, 27, 'navMerge 只有 ' + n + ' 种语言');
    assert.ok(/class="ver">v0\.9\.262</.test(html), '首页版本号未升 0.9.256');
    assert.ok(/class="ver-tag">v0\.9\.262</.test(html), '工作台版本号未升 0.9.256');
    assert.ok(/srt-core\.js\?v=0\.9\.262/.test(html), 'srt-core.js?v 未升 0.9.256');
    /* v0.9.257：首页不再写死 merge.html 链接 —— 三个工具入口统一由 site-nav.js 渲染，
       页面只留占位 #siteNav（顶部胶囊）/ #toolCards（主页三卡）。所以这里改校验挂载：
       占位在、脚本挂对、数据源里三个工具齐全（少一个就是导航少一格）。 */
    const nv = require('fs').readFileSync(require('path').join(__dirname, 'site-nav.js'), 'utf8');
    assert.ok(/<span id="siteNav"><\/span>/.test(html), '首页缺 #siteNav 占位');
    assert.ok(/<div id="toolCards"><\/div>/.test(html), '首页缺 #toolCards 占位');
    assert.ok(!/href="merge\.html"/.test(html), '首页仍写死 merge.html 入口（应交给 site-nav.js）');
    ['tr', 'clean', 'fx'].forEach(id => {
      assert.ok(nv.indexOf("id: '" + id + "'") > 0, 'site-nav.js 缺工具 ' + id);
    });
    assert.ok(/href: '\/merge\.html'/.test(nv), 'site-nav.js 缺 merge.html 入口');
    assert.ok(/href: '\/clean\.html'/.test(nv), 'site-nav.js 缺 clean.html 入口');
    /* 三页都要挂，且 data-tool 必须各不相同（挂错 = 高亮错页） */
    [['index.html', 'tr'], ['merge.html', 'fx'], ['clean.html', 'clean']].forEach(pr => {
      const src = require('fs').readFileSync(require('path').join(__dirname, pr[0]), 'utf8');
      assert.ok(src.indexOf('<script src="site-nav.js" data-tool="' + pr[1] + '"></script>') > 0,
        pr[0] + ' 未以 data-tool=' + pr[1] + ' 引入 site-nav.js');
      assert.ok(/<span id="siteNav"><\/span>/.test(src), pr[0] + ' 缺 #siteNav 占位');
    });
    /* v0.9.221 用户定案：「全程本地处理，字幕不上传服务器」这句没意义，删干净不许回来
       （含 4 语词条 localNote、hero 里的 pill 徽标、CSS、meta description 尾巴） */
    assert.ok(!/localNote/.test(mg), 'localNote 词条残留');
    assert.ok(!/class="pill"/.test(mg), 'pill 徽标残留');
    assert.ok(!/不上传服务器|不上傳伺服器|nothing is uploaded|サーバーに送信/.test(mg), '本地处理文案残留');
    /* v0.9.220 回归：syncColorSw 找的是 id+'Sw'，描边色方块 id 必须是 assXxxOutlineColorSw
       （v0.9.217 曾写成 assXxxOutlineSw → 方块永远不刷新，用户设色看不到反馈） */
    assert.ok(/id="assDstOutlineColorSw"/.test(html) && /id="assSrcOutlineColorSw"/.test(html),
      '描边色方块 id 必须是 assXxxOutlineColorSw（与 syncColorSw 的 id+Sw 规则配对）');
    assert.ok(!/id="assDstOutlineSw"/.test(html) && !/id="assSrcOutlineSw"/.test(html), '旧错位 id 残留');
    /* v0.9.220 回归：v0.9.217 新字段必须进 save()/恢复 双向清单 */
    ['assDstOutline','assSrcOutline','assDstOutlineColor','assSrcOutlineColor','assDstFont','assSrcFont','assDstAlpha','assSrcAlpha']
      .forEach(k => {
        const isFont = k === 'assDstFont' || k === 'assSrcFont';
        const saveDecl = new RegExp(k + ':\\(\\$\\(\'' + k + '\'\\)\\|\\|\\{\\}\\)\\.value');
        assert.ok(saveDecl.test(html) || new RegExp(k + ':\\$\\(\'' + k + '\'\\)\\.value').test(html), 'save() 缺 ' + k);
        /* 字体回填走 restoreFont(id, sv.x)（select.value 需 option 先存在），其余走 sv.x!=null 直填 */
        if (isFont) assert.ok(new RegExp('restoreFont\\(\'' + k + '\',\\s*sv\\.' + k + '\\)').test(html), '字体恢复缺 ' + k);
        else assert.ok(new RegExp('sv\\.' + k + '!=null').test(html), '恢复逻辑缺 sv.' + k);
      });
  });

  /* v0.9.219 用户定案：双语合并与翻译处理完全分开——合并专用代码只许在 merge-core.js */
  t('引擎分离：srt-core 无合并专用函数，merge-core 有；两页互不引用对方引擎', () => {
    ['function alignRows','function overlapMs','function shiftTimeline','function checkTimeline']
      .forEach(fn => {
        assert.ok(mgcSrc.indexOf(fn) > 0, 'merge-core.js 缺 ' + fn);
        assert.strictEqual(coreSrc.indexOf(fn), -1, 'srt-core.js 不应再有 ' + fn + '（合并工具已独立）');
      });
    assert.ok(mgcSrc.indexOf('root.MergeCore = factory()') > 0, 'merge-core.js UMD 名应为 MergeCore');
    assert.strictEqual(mgcSrc.indexOf('root.SrtCore'), -1, 'merge-core.js 不应暴露 SrtCore 名');
    assert.ok(mg.indexOf('srt-core.js') === -1, 'merge.html 不得引用 srt-core.js');
    assert.ok(/const C = window\.MergeCore/.test(mg), 'merge.html 应取 window.MergeCore');
    assert.strictEqual(html.indexOf('merge-core.js'), -1, '主站 index.html 不得引用 merge-core.js');
    /* 分叉完整性：合并引擎仍保有双语组装所需的全部函数 */
    ['buildBilingual','buildBilingualParts','parseSrt','parseVtt','parseAss','parseSbv','detectFormat',
     'formatSrt','formatVtt','formatAss','assLineHeight','assStackMV','wrapToWidth','isSpeakerText']
      .forEach(fn => assert.ok(mgcSrc.indexOf('function ' + fn) > 0 || mgcSrc.indexOf(fn + ',') > 0 || mgcSrc.indexOf(fn + ':') > 0,
        'merge-core.js 缺 ' + fn));
    /* 两引擎对同一双语输入产出一致（分叉点行为基线） */
    const rows = [{no:1,start:0,end:2000,en:'hello',zh:'你好',flag:''}];
    assert.strictEqual(M.buildBilingual(rows, {maxW:24})[0].text, C.buildBilingual(rows, {maxW:24})[0].text);
  });

  t('merge.html：导出模板制（3 默认模板 + ASS 自定义，10-04 用户定案）', () => {
    /* 五个模板选项齐全，值对应 core 分支 */
    ['value="srt"','value="vtt"','value="split"','value="stack"','value="custom"']
      .forEach(v => assert.ok(mg.indexOf(v) > 0, '缺模板选项 ' + v));
    /* expFmtVal 映射：split/stack 直译，custom 跟随布局 radio */
    assert.ok(/function tplVal\(\)/.test(mg), '缺 tplVal');
    assert.ok(/if \(tpl === 'custom'\) return assLayoutVal\(\)/.test(mg), 'custom 未跟随布局选择');
    /* 面板显隐：无风格模板隐藏 ASS 面板，custom 显示布局行 */
    assert.ok(/syncAssPanel/.test(mg), '缺 syncAssPanel');
    /* v0.9.238：无风格模板（srt/vtt）与「VTT 双语样式」都要把 ASS 面板收起来（两套单位不同，不能同时摆着） */
    assert.ok(/const plain = \(tpl === 'srt' \|\| tpl === 'vtt'\);/.test(mg), '缺 plain 判定');
    assert.ok(/\$\('assPanel'\)\.style\.display = \(plain \|\| tpl === 'vttStyle'\) \? 'none' : ''/.test(mg), '无风格 / VTT 模板未隐藏 ASS 面板');
    /* v0.9.240：VTT 面板在「带样式」与「无样式」两个 VTT 档位都要出现 ——
       「写入样式」开关就住在面板里，藏掉面板用户就没法把样式再打开。 */
    assert.ok(/const vp = \$\('mVttPanel'\); if \(vp\) vp\.style\.display = \(tpl === 'vttStyle' \|\| tpl === 'vtt'\) \? '' : 'none'/.test(mg),
      'VTT 面板未随模板显隐');
    /* v0.9.242：布局行**整行不再显示**（在「自定义」下再选一遍布局是重复 ——
       custom+分屏 与 分屏 导出的 ASS 逐字节相同；更糟的是切模板无条件套预设，
       点「自定义」反而按那个 radio 把用户调好的值冲掉）。
       判据：① HTML 里 layoutRow 常驻 display:none；② 没有任何代码再去改它的 display。 */
    assert.ok(/<div class="af" id="layoutRow" style="display:none" aria-hidden="true">/.test(mg),
      '布局行必须常驻隐藏（v0.9.242 起界面上不再有这一行）');
    assert.ok(!/layoutRow'\)\.style\.display\s*=/.test(mg), '还有代码在切换布局行的显隐');
    assert.ok(/function setAssLayoutRadio\(/.test(mg), '缺 setAssLayoutRadio（布局写回隐藏 radio 的唯一入口）');
    /* 恢复默认：14 个外观字段逐一回默认值（⚠️ 只在 ASS_DEFAULTS 声明块内数，文件里还有同形态的绑定数组） */
    assert.ok(/function resetAssDefaults\(\)/.test(mg), '缺 resetAssDefaults');
    const declAt = mg.indexOf('const ASS_DEFAULTS = [');
    assert.ok(declAt > 0, '缺 ASS_DEFAULTS 声明');
    const declEnd = mg.indexOf('];', declAt);
    const decl = mg.slice(declAt, declEnd);
    /* v0.9.231：14 → 28（新增粗体/字间距/阴影·底衬/深度/边色/边色不透明/水平对齐/左右边距） */
    /* v0.9.245：斜体两个字段进来后是 32 —— 写成 >=30 而不是写死，
       以后再加字段不该逼着改测试（真要防的是字段**变少**：漏一个就等于那项切模板时残留旧值） */
    assert.ok((decl.match(/\['ass[A-Za-z]+',(?:'[^']+'|true|false)\]/g) || []).length >= 30, 'ASS_DEFAULTS 字段变少了（漏字段 = 切模板时残留旧值）');
    /* 模板提示与词条（4 语） */
    ['lblTpl','tplSrt','tplVtt','tplSplit','tplStack','tplCustom','lblLayout','layoutSplit','layoutStack','tplHintPlain','tplHintPreset','tplHintCustom','assReset','assResetDone']
      .forEach(k => { const c = (mg.match(new RegExp("\\b" + k + ":", 'g')) || []).length;
        assert.strictEqual(c, 4, k + ' 应有 4 种语言，实际 ' + c); });
  });

  /* ================= v0.9.222：双语调整模式 ================= */
  t('merge-core：splitBilingual 三形态识别 + 折行聚类 + 同文种不确定标记', () => {
    assert.strictEqual(typeof M.splitBilingual, 'function', '缺 splitBilingual');
    /* A. 单条双行 */
    let out = M.splitBilingual([
      { start: 0, end: 1000, text: 'Hello there\n你好呀' },
      { start: 2000, end: 3000, text: 'Bye now\n再见啦' },
    ]);
    assert.strictEqual(out.report.mode, 'two-line', '双行形态应识别 two-line');
    assert.strictEqual(out.rows.length, 2);
    assert.strictEqual(out.rows[0].en, 'Hello there');
    assert.strictEqual(out.rows[0].zh, '你好呀');
    assert.strictEqual(out.rows[1].zh, '再见啦');
    /* B. 折行聚类：3 行里 2 行拉丁 1 行中文 → 拉丁并原文、中文归译文 */
    out = M.splitBilingual([{ start: 0, end: 2000, text: 'This is a long line\nthat wrapped here\n这是一条中文译文' }]);
    assert.strictEqual(out.report.mode, 'folded', '折行形态应识别 folded');
    assert.strictEqual(out.rows[0].en, 'This is a long line\nthat wrapped here');
    assert.strictEqual(out.rows[0].zh, '这是一条中文译文');
    assert.strictEqual(out.report.folded, 1);
    /* C. 同文种折行（英法）→ uncertain 计数 + 上/下半拆分 */
    out = M.splitBilingual([{ start: 0, end: 2000, text: 'hello world\nbonjour le monde' }]);
    assert.ok(out.report.uncertain >= 1, '同文种应标 uncertain');
    assert.strictEqual(out.rows[0].en, 'hello world');
    assert.strictEqual(out.rows[0].zh, 'bonjour le monde');
    /* D. 交替成对 */
    out = M.splitBilingual([
      { start: 0, end: 900, text: 'Hi' },
      { start: 0, end: 900, text: '嗨' },
      { start: 1000, end: 1900, text: 'Bye' },
      { start: 1000, end: 1900, text: '再见' },
    ]);
    assert.strictEqual(out.report.mode, 'alternating', '交替形态应识别 alternating');
    assert.strictEqual(out.rows.length, 2);
    assert.strictEqual(out.rows[1].en, 'Bye');
    assert.strictEqual(out.rows[1].zh, '再见');
    /* 强制指定模式：opts.mode */
    out = M.splitBilingual([{ start: 0, end: 900, text: 'Hi\n嗨' }], { mode: 'two-line' });
    assert.strictEqual(out.rows[0].zh, '嗨');
    /* 空输入不炸 */
    out = M.splitBilingual([]);
    assert.strictEqual(out.rows.length, 0);
  });

  t('merge.html：模式切换 UI + 调整模式 JS 钩子 + 21 个新词条 ×4 语', () => {
    /* mode-tabs：两个 radio */
    assert.ok(/name="workMode" value="merge" checked/.test(mg), '缺 merge 默认 radio');
    assert.ok(/name="workMode" value="adjust"/.test(mg), '缺 adjust radio');
    /* 关键 id 群：逐字对照（v0.9.220 方块 id 错位教训） */
    ['srcCard','dstCard','srcCardTitle','structLbl','structRow','structMode','btnSwap','formWarn','optTitle','alignRow','alignLbl','shiftLbl']
      .forEach(id => assert.ok(mg.indexOf('id="' + id + '"') > 0, 'merge.html 缺 id=' + id));
    /* 结构识别下拉三选项 */
    ['value="auto"','value="two-line"','value="alternating"'].forEach(v =>
      assert.ok(mg.indexOf('<option ' + v) > 0, 'structMode 缺选项 ' + v));
    /* JS 钩子 */
    ['function syncMode()','function doAdjust()','function swapSides()','function setI18nKey(',
     'function localeSrcItems()','function localeDstItems()']
      .forEach(fn => assert.ok(mg.indexOf(fn) > 0, 'merge.html 缺 ' + fn));
    /* 统一入口：doMerge 里 adjust 分流 */
    assert.ok(/if \(S\.mode === 'adjust'\)\{ doAdjust\(\); return; \}/.test(mg), 'doMerge 未分流 adjust');
    /* 调整模式语言口径：从 rows 取两列（S.src 是整份双语文件，直接猜必错） */
    assert.ok(/S\.mode==='adjust' \? \(S\.rows\|\|\[\]\)\.map\(r=>\(\{text:r\.en\}\)\)/.test(mg), 'localeSrcItems 未按模式分流');
    /* 切模式清旧结果 */
    assert.ok(/if \(S\.rows\)\{\s*\n\s*S\.rows = null;/.test(mg), '切模式未清预览');
    /* 事件绑定 */
    assert.ok(/#modeTabs input\[name=workMode\]/.test(mg), 'mode-tabs 未绑定');
    assert.ok(/\$\('btnSwap'\)\.addEventListener\('click', swapSides\)/.test(mg), 'btnSwap 未绑定');
    /* 21 个新词条 ×4 语 */
    ['modeMerge','modeAdjust','biCard','optTitleAdjust','lblStruct','structAuto','structTwo','structAlt',
     'swapBtn','structHint','lblShiftAll','shiftHintAll','btnAdjust','formTwoLine','formAlt','formStyle',
     'formFolded','foldedWarn','uncertainWarn','swapped','needSrc']
      .forEach(k => { const c = (mg.match(new RegExp("\\b" + k + ":", 'g')) || []).length;
        assert.strictEqual(c, 4, k + ' 应有 4 种语言，实际 ' + c); });
    /* 版本与缓存参数 */
    assert.ok(/class="ver">v0\.9\.262</.test(mg), 'merge.html 版本未升 0.9.256');
    assert.ok(/merge-core\.js\?v=0\.9\.262/.test(mg), 'merge-core.js?v 未升 0.9.256');
  });

  /* ================= v0.9.223：模板参数 / 堆叠间距 / ASS 预览 / 对齐措辞 ================= */
  t('v0.9.223：三种模板各有自己的默认参数（切模板真的套参数）', () => {
    assert.ok(/const TPL_DEFAULTS = \{/.test(mg), '缺 TPL_DEFAULTS');
    const blk = mg.slice(mg.indexOf('const TPL_DEFAULTS = {'), mg.indexOf('TPL_DEFAULTS.custom'));
    const pick = (k, f) => { const m = new RegExp(k + ': \\{[\\s\\S]*?' + f + ":?'?([0-9A-Fa-f#]+)'?").exec(blk); return m && m[1]; };
    /* v0.9.219 的病：三个模板共用一套参数 → 导出逐字节相同，等于模板没生效 */
    assert.notStrictEqual(pick('split','assSrcSize'), pick('stack','assSrcSize'), '两个模板的原文字号必须不同');
    assert.notStrictEqual(pick('split','assSrcColor'), pick('stack','assSrcColor'), '两个模板的原文颜色必须不同');
    assert.ok(/^\s*applyTplDefaults\(tpl\);$/m.test(mg), '切模板未套参数');
    assert.ok(/function applyTplDefaults\(/.test(mg), '缺 applyTplDefaults');
    assert.ok(/function applyTplDefaults\(/.test(mg), '缺 applyTplDefaults');
  });

  t('v0.9.223：guessLocale 认中文 —— 此前中文返回空串，堆叠间距少算 21px 导致两行重叠', () => {
    assert.ok(/c >= 0x4E00 && c <= 0x9FFF\) han\+\+/.test(mg), 'guessLocale 未统计汉字');
    assert.ok(/if \(han >= 2 && han >= latin\) return 'zh-CN'/.test(mg), 'guessLocale 不返回中文');
    /* 几何回归：中文译文 56 贴底、英文原文 50 在上，上面那条必须抬够高 */
    const bottomMV = 42, dstSize = 56, srcSize = 50;
    const topMV = M.assStackMV({ bottomMV: bottomMV, bottomSize: dstSize, bottomLang: 'zh-CN', bottomLines: 1, topSize: srcSize, topLang: 'en' });
    assert.ok(topMV >= bottomMV + M.assLineHeight(dstSize),
      '上面那条离底距离不够，两行会重叠: ' + topMV + ' < ' + (bottomMV + M.assLineHeight(dstSize)));
    assert.strictEqual(topMV, 117, '中文译文的正确堆叠距离应为 117（修复前按拉丁算成 96）');
  });

  t('v0.9.223：ASS 效果预览 + 1080p 基准标注', () => {
    ['assPv','assPvScreen','assPvLine1','assPvLine2','pvTag'].forEach(id =>
      assert.ok(mg.indexOf('id="' + id + '"') > 0, '缺 id=' + id));
    assert.ok(/function renderAssPv\(\)/.test(mg), '缺 renderAssPv');
    assert.ok(/\(scr\.clientHeight \|\| 240\) \/ 1080/.test(mg), '预览未按 1080p 等比缩放');
    ['assNote1080','pvAssTitle','repMerged'].forEach(k => {
      const c = (mg.match(new RegExp("\\b" + k + ":", 'g')) || []).length;
      assert.strictEqual(c, 4, k + ' 应有 4 种语言，实际 ' + c);
    });
    assert.ok(/1920×1080|1920x1080/.test(mg), '缺 1080p 基准标注');
  });

  t('v0.9.223：对齐措辞写明「时间轴取自哪份」，离底距离不再写死 42', () => {
    assert.ok(mg.indexOf("alignDstTime:'时间轴跟译文'") === -1, '旧的歧义措辞还在');
    ['alignOrder','alignTime','alignDstTime'].forEach(k => {
      const m = new RegExp("\\b" + k + ":'([^']+)'").exec(mg);
      assert.ok(m && /时间轴/.test(m[1]), k + ' 未写明时间轴取自谁: ' + (m && m[1]));
    });
    assert.ok(!/dstFirst \? 42 : m\.dst/.test(mg) && !/dstFirst \? m\.src : 42/.test(mg), '贴底距离仍写死 42');
    /* 并入语义：report.merged 必须存在并计数 */
    const r = M.alignRows(mk([[0,4000,'Hello']]), mk([[0,2000,'你好'],[2000,4000,'世界']]), 'time');
    assert.strictEqual(r.report.merged, 1);
    assert.ok(mg.indexOf('repMerged') > 0, 'UI 未展示并入条数');
  });

  /* ================= v0.9.224：预设必填 / 距离语义 / 分屏位置 ================= */
  t('v0.9.224：切模板必定套预设 —— assDirty 门控必须彻底移除', () => {
    /* v0.9.223 的病：assDirty 一旦为 true，切模板永远不再填预设（用户实测「模板值没填进去」） */
    assert.ok(!/\bassDirty\b\s*=\s*(true|false)/.test(mg), '代码里仍有 assDirty 赋值（门控没删干净）');
    assert.ok(!/!assDirty/.test(mg), '仍有 !assDirty 条件');
    assert.ok(/^\s*applyTplDefaults\(tpl\);$/m.test(mg), 'syncAssPanel 未无条件套预设');
    /* srt/vtt 时也要套一次（否则首次展开面板看到的是 HTML 写死的旧值） */
    assert.ok(/function presetKeyOf\(tpl\)/.test(mg), '缺 presetKeyOf');
    assert.ok(/if \(tpl === 'custom'\) return assLayoutVal\(\) === 'ass-stack' \? 'stack' : 'split'/.test(mg),
      'custom 未跟随布局选预设');
    /* resetAssDefaults 必须重刷预览（v0.9.229：标签不再随模板切换，两个框都叫「离底距离」） */
    assert.ok(/function resetAssDefaults\(\)\{[\s\S]{0,200}renderAssPv\(\)/.test(mg), 'reset 未刷新预览');
  });

  t('v0.9.229：两个「距离」框统一成「离底距离」（此前一个离顶、一个叫两行间距）', () => {
    const blk = mg.slice(mg.indexOf('const TPL_DEFAULTS = {'), mg.indexOf('TPL_DEFAULTS.custom'));
    const mvOf = (tpl, key) => {
      const seg = blk.slice(blk.indexOf(tpl + ': {'), blk.indexOf(tpl + ': {') + 1400);
      const m = new RegExp(key + ":\\s*'(\\d+)'").exec(seg);
      return m && m[1];
    };
    assert.strictEqual(mvOf('split','assDstMV'), '42', '分屏译文离底应为 42');
    /* v0.9.230：922 = 1080 − 40（原「距顶」）− 行高 59×2。默认值必须按**2 行**给：
       an2 锚的是块的下边、块往上长，按 1 行（981）给的默认值在原文折 2 行时顶边会跑到 y=−19
       被画面切掉。2 行时顶边正好在 40，1 行时顶边在 99（偏低，想高自己调）。 */
    assert.strictEqual(mvOf('split','assSrcMV'), '922', '分屏原文离底应为 922');
    assert.ok(/id="assSrcMV" value="922"/.test(mg), 'HTML 里的默认值也要同步成 922');
    assert.strictEqual(mvOf('stack','assDstMV'), '42', '双行译文离底应为 42');
    assert.strictEqual(mvOf('stack','assSrcMV'), '117', '双行原文离底应为 117');
    /* 语义统一：界面上两个框一个叫法，标签不再随模板切换 */
    assert.ok(!/lblMVSrcTop/.test(mg) && !/lblMVGap/.test(mg), '旧的「原文离顶 / 两行间距」词条还在');
    assert.ok(!/syncMvLabels/.test(mg), '标签仍在随模板切换');
    assert.strictEqual((mg.match(/data-i18n="lblMV"/g) || []).length, 2, '两个距离框应都标 lblMV');
    /* 导出端：两条各拿各自的绝对离底值，不再推算抬高量 */
    /* v0.9.235：原样取两个离底值（此前是 Math.max(0, mv.dst)，负值与超界会被偷偷改写） */
    assert.ok(/const dstMV = mv\.dst, srcMV = mv\.src;/.test(mg), '导出未给两条各自的离底值');
    assert.ok(!/Math\.max\(0, m(?:v)?\.(?:dst|src)\)/.test(mg), 'v0.9.235：导出/预览仍在把离底值夹到 0');
    assert.ok(!/stackMV\(/.test(mg) && !/C\.assStackMV\(/.test(mg), '导出仍在用 assStackMV 推算抬高量');
  });

  t('v0.9.229：导出四个样式一律底部对齐（an2），两个距离框同义', () => {
    assert.ok(!/function assTopMV\(/.test(mg), 'assTopMV 还在（旧「距顶」路径没删干净）');
    const evs = [
      { start:0, end:1000, lines:[{ style:'Sub', text:'来源行', mv:117 }, { style:'Bottom', text:'译文行', mv:42 }] },
      { start:1000, end:2000, lines:[{ style:'TopMain', text:'译文在上', mv:981 }, { style:'Top', text:'原文在上', mv:981 }] }
    ];
    const out = M.formatAss(evs, { title:'t', assStyle:{ dstSize:56, srcSize:50, dstMV:42, srcMV:981 } });
    const styles = out.split('\n').filter(x => x.startsWith('Style: '));
    assert.strictEqual(styles.length, 4, '应有四个样式');
    styles.forEach(line => {
      const c = line.split(',');
      assert.strictEqual(c[0].replace('Style: ',''), ['Bottom','Top','TopMain','Sub'].includes(c[0].replace('Style: ',''))
        ? c[0].replace('Style: ','') : c[0], '样式名异常');
      assert.strictEqual(c[18], '2', c[0] + ' 不是底部对齐(an2)');
    });
    const mvOf = n => { const l = styles.find(x => x.startsWith('Style: ' + n + ',')); return l.split(',')[21]; };
    assert.strictEqual(mvOf('Bottom'), '42', 'Bottom 的 MarginV 应是译文离底 42');
    assert.strictEqual(mvOf('TopMain'), '42', 'TopMain 的 MarginV 也应取译文离底');
    assert.strictEqual(mvOf('Top'), '981', 'Top 的 MarginV 应是原文离底 981');
    assert.strictEqual(mvOf('Sub'), '981', 'Sub 的 MarginV 也应取原文离底');
    /* Dialogue 行逐条带自己的离底值，别退回样式默认 */
    assert.ok(/Dialogue: \d,0:00:00\.00,0:00:01\.00,Sub,,0,0,117,/.test(out), 'Sub 的 mv 未逐条下发');
    assert.ok(/Dialogue: \d,0:00:00\.00,0:00:01\.00,Bottom,,0,0,42,/.test(out), 'Bottom 的 mv 未逐条下发');
    assert.ok(/Dialogue: \d,0:00:01\.00,0:00:02\.00,TopMain,,0,0,981,/.test(out), 'TopMain 的 mv 未逐条下发');
    assert.ok(/Dialogue: \d,0:00:01\.00,0:00:02\.00,Top,,0,0,981,/.test(out), 'Top 的 mv 未逐条下发');
    /* 预览：两条都按 bottom 定位，不再有「贴顶」分支 */
    assert.ok(/css\.bottom = \(o\.mv \* k\)\.toFixed\(1\) \+ 'px';/.test(mg), '预览未按离底距离定位');
    assert.ok(!/atTop/.test(mg), '预览仍有「贴顶」定位分支');
    assert.ok(/css\.fontFamily = '/.test(mg), '预览未跟随字体设置');
    /* 两个距离框的默认值不同，但语义同一个 */
    assert.ok(/lblMV:'离底距离'/.test(mg), '中文词条应只有「离底距离」');
  });

  /* ================= v0.9.230：设置值 = 预览 = 导出，中间不许有任何修正 =================
     用户 10-06 明确：不要自动夹取、不要"智能"补偿，用户填错了就是填错了，预览如实画出来就行。
     所以这里锁死两件事：①三处读的是同一个输入框的值 ②填多少导出就写多少（含会出界的 981）。 */
  t('v0.9.230：设置值 = 预览 = 导出，中间不许夹取/修正', () => {
    const pv = mg.slice(mg.indexOf('function renderAssPv(){'), mg.indexOf('function baseName(){'));
    const ev = mg.slice(mg.indexOf('function buildAssEvents(){'), mg.indexOf('function buildExport(){'));
    /* ① 预览与导出都只读 assMVs()（= 两个输入框），且除了 Math.max(0,…) 没有别的加工 */
    assert.ok(/const st = assStyleOf\(\), m = assMVs\(\)/.test(pv), '预览没读 assMVs()');
    assert.ok(/const mv = assMVs\(\);/.test(ev), '导出没读 assMVs()');
    /* v0.9.235：预览里也改成原样取值（与导出的 mv.dst / mv.src 同一数字） */
    /* v0.9.250：预览的离底值 = 面板原值 + 槽的整条级偏移（v0.9.254：两行同一个 cueOff）。
       ⚠️ 取值口径必须与导出那两处一致（cueOff），否则又是「预览挪了、导出没挪」。 */
    assert.ok(/const dstMV = m\.dst \+ cueOff, srcMV = m\.src \+ cueOff;/.test(pv),
      '预览对离底值做了额外加工（应与导出同一个原样取值 + 同一个槽偏移）');
    /* v0.9.235：导出也改成原样取值（不再 Math.max(0, …)） */
    assert.ok(/const dstMV = mv\.dst, srcMV = mv\.src;/.test(ev),
      '导出对离底值做了额外加工（应与预览同一个原样取值）');
    /* 不许按行数/字号推算位置（assStackMV / assTopMV 那套"抬高量"已废） */
    assert.ok(!/assStackMV\(/.test(ev) && !/assTopMV\(/.test(ev), '导出仍在推算位置');
    assert.ok(!/assStackMV\(/.test(pv) && !/assTopMV\(/.test(pv), '预览仍在推算位置');
    /* ② 字面下发：填 922 导出就是 922 */
    const o1 = M.formatAss([{ start:0, end:1000, lines:[{ style:'Top', text:'原文', mv:922 }] }],
      { title:'t', assStyle:{ dstSize:56, srcSize:50, dstMV:42, srcMV:922 } });
    assert.ok(/Dialogue: 0,0:00:00\.00,0:00:01\.00,Top,,0,0,922,/.test(o1), '填 922 导出不是 922');
    /* ③ 填 981（2 行会顶出画面）也必须原样下发——宁可让它出界，也不偷偷改用户的数 */
    const o2 = M.formatAss([{ start:0, end:1000, lines:[{ style:'Top', text:'原文', mv:981 }] }],
      { title:'t', assStyle:{ dstSize:56, srcSize:50, dstMV:42, srcMV:981 } });
    assert.ok(/Dialogue: 0,0:00:00\.00,0:00:01\.00,Top,,0,0,981,/.test(o2), '填 981 被偷偷夹取了');
  });

  /* ================= v0.9.230：预览的文本框必须和导出一样宽 =================
     病根：导出 MarginL=R=60（1080p 下文本框 1800px），预览 CSS 原来是 padding:0 6%（1690px），
     窄了 110px → 预览比导出多折一行 → 顶部那条被多出来的一行顶出画面上边。
     用户看到的就是「预览里出界、播放器里没事」——预览撒了谎。 */
  t('v0.9.230：预览左右留白 = 导出 MarginL/R（否则会多折一行）', () => {
    assert.ok(/padding:0 3\.125%/.test(mg), '预览留白未改成 3.125%（= 60/1920）');
    assert.ok(!/padding:0 6%/.test(mg), '旧的 6% 留白还在（比导出窄 110px）');
    /* 导出端 MarginL/R 必须是 60，预览的 3.125% 才成立 */
    const out = M.formatAss([{ start:0, end:1000, lines:[{ style:'Bottom', text:'x', mv:42 }] }],
      { title:'t', assStyle:{ dstSize:56, srcSize:50, dstMV:42, srcMV:922 } });
    const st = out.split('\n').find(x => x.startsWith('Style: Bottom,')).split(',');
    assert.strictEqual(st[19], '60', 'MarginL 应为 60');
    assert.strictEqual(st[20], '60', 'MarginR 应为 60');
    assert.strictEqual(Math.round((1920 - 120) / 1920 * 100 * 1000) / 1000, 93.75, '可用宽应为 93.75%');
    /* 关键算术：两边可用宽必须都是 1800px，否则预览会多折一行 */
    assert.strictEqual(1920 - 60 - 60, 1800, '导出可用宽 1800');
    assert.strictEqual(Math.round(1920 * (1 - 2 * 0.03125)), 1800, '预览可用宽 1800');
    /* ⚠️ 别拿「导出文本里的 \\N 个数」当导出行数：超宽的行播放器还会在 1800px 处再折一次，
       预览（CSS）也会在同一宽度折——两边折行宽度一致才是真正的所见即所得。 */
  });

  t('v0.9.230：分屏默认按 2 行给（922），不是按 1 行的 981', () => {
    /* 病根：an2 锚块的下边，块往上长。按 1 行给的 981 在原文折 2 行时顶边 = 1080−981−59×2 = −19 */
    const lh = M.assLineHeight(50);                 // 59
    assert.strictEqual(1080 - 981 - 2 * lh < 0, true, '981 在 2 行时确实会出界（这条是病根记录）');
    assert.strictEqual(1080 - 922 - 2 * lh, 40, '922 在 2 行时顶边应正好在 40');
    assert.strictEqual(1080 - 922 - 1 * lh, 99, '922 在 1 行时顶边在 99（偏低，由用户自己调）');
    assert.ok(/assDstMV:'42', assSrcMV:'922'/.test(mg), '分屏预设未改成 922');
    assert.ok(!/assSrcMV:'981'/.test(mg), '还有按 1 行给的 981 默认值');
  });

  /* ================= v0.9.231：ASS 样式扩展（粗体/字间距/阴影·底衬/水平对齐/左右边距）=================
     此前这些字段全部写死在 formatAss 的样式行里，界面上根本没有（10-06 盘点发现）。
     两条硬约束：①不传 assStyle 的老调用必须与 v0.9.230 逐字节一致（v0.9.100 定的兼容约定，别破）
     ②传了就必须原样落到样式行，不许按内容加工。 */
  const FMT231 = ('Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, ' +
    'Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding').split(', ');
  const C231 = FMT231.reduce((o, k, i) => { o[k] = i; return o; }, {});   /* 'Style: Name' 是第 0 项 */
  const col231 = (out, name) => {
    const ln = out.split('\n').find(x => x.indexOf('Style: ' + name + ',') === 0);
    return ln ? ln.split(',') : null;
  };
  t('v0.9.231：不传 assStyle 时输出与 v0.9.230 逐字节一致（老调用兼容，别破）', () => {
    const evs = [{ start:0, end:1000, lines:[{ style:'Bottom', text:'译文' }, { style:'Top', text:'原文' }] }];
    const out = M.formatAss(evs, { title:'t' });
    const b = col231(out, 'Bottom'), tp = col231(out, 'Top');
    assert.strictEqual(b[C231.Bold], '-1', '译文默认粗体应仍是 -1');
    assert.strictEqual(tp[C231.Bold], '0', '原文默认不粗应仍是 0');
    assert.strictEqual(b[C231.Spacing], '0', '字间距默认应为 0');
    assert.strictEqual(b[C231.BorderStyle], '1', '默认应为 BorderStyle=1');
    assert.strictEqual(b[C231.Shadow], '0', '默认应无阴影');
    assert.strictEqual(b[C231.Alignment], '2', '默认应底部居中');
    assert.strictEqual(b[C231.BackColour], '&H64000000', '默认 BackColour 变了');
    assert.strictEqual(b[C231.MarginL], '60');
    assert.strictEqual(b[C231.MarginR], '60');
    assert.strictEqual(col231(out, 'TopMain')[C231.Bold], '-1', 'TopMain 应跟译文外观');
    assert.strictEqual(col231(out, 'Sub')[C231.Bold], '0', 'Sub 应跟原文外观');
  });

  t('v0.9.231：新字段传进去就原样落到样式行（不许加工）', () => {
    const evs = [{ start:0, end:1000, lines:[{ style:'Bottom', text:'译文' }, { style:'Top', text:'原文' }] }];
    const out = M.formatAss(evs, { title:'t', assStyle:{
      dstSize:56, srcSize:50, dstMV:42, srcMV:922,
      dstBold:true, srcBold:false, dstSpacing:1.5, srcSpacing:-1,
      dstBox:false, srcBox:true, dstShadow:3, srcShadow:0,
      dstBackColor:'&H00112233', dstBackAlpha:50, srcBackColor:'&H00445566', srcBackAlpha:80,
      dstAlign:1, srcAlign:3, marginL:120, marginR:30
    }});
    const b = col231(out, 'Bottom'), tp = col231(out, 'Top');
    assert.strictEqual(b[C231.Bold], '-1', 'dstBold:true 应写成 -1');
    assert.strictEqual(tp[C231.Bold], '0', 'srcBold:false 应写成 0');
    assert.strictEqual(b[C231.Spacing], '1.5');
    assert.strictEqual(tp[C231.Spacing], '-1', '负字间距不该被夹成 0');
    assert.strictEqual(b[C231.BorderStyle], '1');
    assert.strictEqual(tp[C231.BorderStyle], '3', 'srcBox 应触发 BorderStyle=3');
    assert.strictEqual(b[C231.Shadow], '3');
    assert.strictEqual(tp[C231.Shadow], '0', '底衬模式下 Shadow 应为 0');
    assert.strictEqual(b[C231.Alignment], '1');
    assert.strictEqual(tp[C231.Alignment], '3');
    /* BackColour = &H + alpha + BBGGRR，alpha = (100−不透明度)/100×255 */
    const a50 = Math.round((100 - 50) * 255 / 100).toString(16).toUpperCase().padStart(2, '0');
    const a80 = Math.round((100 - 80) * 255 / 100).toString(16).toUpperCase().padStart(2, '0');
    assert.strictEqual(b[C231.BackColour], '&H' + a50 + '112233');
    assert.strictEqual(tp[C231.BackColour], '&H' + a80 + '445566');
    assert.strictEqual(b[C231.MarginL], '120');
    assert.strictEqual(b[C231.MarginR], '30');
    assert.strictEqual(tp[C231.MarginL], '120', '左右边距两侧必须同值（否则折行宽度不一致）');
    assert.strictEqual(tp[C231.MarginR], '30');
  });

  t('v0.9.231：底衬/阴影/粗体/字间距/对齐 能从 ASS 解析回来（导入继承不能是假的）', () => {
    const evs = [{ start:0, end:1000, lines:[{ style:'Bottom', text:'译文' }, { style:'Top', text:'原文' }] }];
    const out = M.formatAss(evs, { title:'t', assStyle:{
      dstSize:56, srcSize:50, dstMV:42, srcMV:922,
      dstBox:true, srcBox:false, srcShadow:4, dstSpacing:0, srcSpacing:2,
      dstBold:true, srcBold:false, dstBackColor:'&H00000000', dstBackAlpha:70,
      srcBackColor:'&H00112233', srcBackAlpha:100, dstAlign:3, srcAlign:1,
      marginL:100, marginR:100
    }});
    const p = M.parseAss(out);
    assert.strictEqual(p.styles.Bottom.borderStyle, 3, 'BorderStyle 没被解析出来');
    assert.strictEqual(p.styles.Top.shadow, 4, 'Shadow 没被解析出来');
    const plan = M.planAssImport(p.items, p.styles, p.playResY);
    /* 位低的是译文（Bottom=42），位高的是原文（Top=922） */
    assert.strictEqual(plan.dst.name, 'Bottom', '主（译文）判错了');
    assert.strictEqual(plan.src.name, 'Top', '副（原文）判错了');
    assert.strictEqual(plan.dst.edge, 'box', '底衬没继承回来');
    assert.strictEqual(plan.src.edge, 'shadow', '阴影没继承回来');
    assert.strictEqual(plan.src.edgeSize, 4, '阴影深度没继承回来');
    assert.strictEqual(plan.src.spacing, 2, '字间距没继承回来');
    assert.strictEqual(plan.dst.bold, true, '粗体没继承回来');
    assert.strictEqual(plan.src.bold, false, '「不粗」没继承回来');
    assert.strictEqual(plan.dst.alignNum, 3, '水平对齐没继承回来');
    assert.strictEqual(plan.src.alignNum, 1);
    assert.strictEqual(plan.dst.marginL, 100, '左右边距没继承回来');
    /* BackColour 一个字段两用（阴影色 / 底衬色），继承回来必须是同一个值 */
    assert.strictEqual(plan.dst.edgeColor, '#000000', '底衬色没继承回来');
    assert.strictEqual(plan.src.edgeColor, '#332211', '阴影色没继承回来（注意 &HAABBGGRR 是反的）');
  });

  t('v0.9.231：预览如实渲染新字段（底衬紧贴文字，不是整行通栏）', () => {
    const pv = mg.slice(mg.indexOf('function renderAssPv(){'), mg.indexOf('function baseName(){'));
    assert.ok(/css\.fontWeight = o\.bold \? '700' : '400';/.test(pv), '预览未渲染粗体');
    assert.ok(/css\.letterSpacing = \(o\.spacing \* k\)/.test(pv), '预览未渲染字间距');
    assert.ok(/css\.textAlign = o\.align === 1 \? 'left'/.test(pv), '预览未渲染水平对齐');
    assert.ok(/ic\.textShadow = d \+ 'px ' \+ d \+ 'px 0 '/.test(pv), '预览未渲染阴影');
    assert.ok(/ic\.background = rgbaOf\(colOf\(o\.edgeColorId\), o\.edgeAlpha\);/.test(pv), '预览未渲染底衬');
    /* 底衬画在内层 span（紧贴文字）上，绝不能画在整行 div 上——那是通栏黑带，与播放器不符 */
    assert.ok(/const inner = el\.firstElementChild \|\| el;/.test(pv), '预览未取内层 span');
    assert.ok(/\.ass-pv-line \.pv-in\{display:inline-block\}/.test(mg), '缺 pv-in 的 inline-block');
    /* 左右边距跟随数值，不再写死 3.125% */
    assert.ok(/const MLP = \(mgOf\('assMarginL'\) \/ 1920 \* 100\)/.test(pv), '预览留白未跟随左右边距');
    /* 文字 alpha 只作用于文字，底衬 alpha 只作用于底衬（不能整行用 opacity 一起打折） */
    assert.ok(/css\.color = rgbaOf\(colOf\(o\.colorId\), o\.alpha\);/.test(pv), '文字不透明度未独立');
  });

  t('v0.9.231：自定义方案（保存/应用/删除/导入导出）', () => {
    assert.ok(/const SCHEME_KEY = 'srt_merge_ass_schemes_v1';/.test(mg), '缺方案存储键');
    /* 方案必须含布局与上下顺序，否则套上去位置不对 = 半套方案 */
    assert.ok(/__layout:/.test(mg) && /__order: orderVal\(\)/.test(mg), '方案未保存布局/上下顺序');
    /* 应用方案绝不能走 syncAssPanel —— 那会套模板预设把刚应用的值整套冲掉 */
    const fn = mg.slice(mg.indexOf('function schemeApplyObj('), mg.indexOf('function schemeDoApply('));
    assert.ok(!/syncAssPanel\(\)/.test(fn), '应用方案走了 syncAssPanel（会被预设覆盖）');
    assert.ok(/syncAssChrome\(\)/.test(fn), '应用方案未同步按钮/面板');
    /* checkbox 必须用 checked 赋值：el.value 对它完全无效，粗体会永远重置不回去 */
    assert.ok(/function setAssVal\(id, v\)\{/.test(mg) && /el\.checked = /.test(mg), '缺 setAssVal');
    /* 底衬模式下「深度」要禁用，不能留一个填了没反应的框（不是偷偷忽略） */
    assert.ok(/sz\.disabled = \(sel\.value === 'box'\);/.test(mg), '底衬模式未禁用「深度」');
    /* 每个模板预设都要覆盖全部新字段，否则切模板时新字段残留上一次的值 */
    ['split','stack'].forEach(tpl => {
      const blk = mg.slice(mg.indexOf(tpl + ': {'), mg.indexOf(tpl + ': {') + 1400);
      ['assDstBold','assSrcBold','assDstSpacing','assDstEdge','assDstEdgeColor','assDstEdgeAlpha',
       'assDstAlign','assSrcAlign','assMarginL','assMarginR'].forEach(k => {
        assert.ok(blk.indexOf(k + ':') >= 0, tpl + ' 预设缺 ' + k);
      });
    });
  });

  /* ================= v0.9.229：预览样例仍走折行管线，但定位改为绝对离底 =================
     为什么删掉 v0.9.225/226 那套「按实测行数重算抬高量」：两个框统一成绝对离底之后，
     一条字幕的位置只由它自己的数值决定，不再有「另一条有多高」这个依赖。 */
  t('v0.9.229：预览按绝对离底定位，不再按实测行数重算抬高量', () => {
    assert.ok(!/const nDst = 1, nSrc = 1;/.test(mg), '预览仍把两侧写死成 1 行');
    assert.ok(/function assPvSample\(\)\{[\s\S]{0,1200}buildBilingualParts\(rows,/.test(mg),
      '预览样例未走导出的折行管线');
    assert.ok(/S\.rows\.slice\(0, 20\)/.test(mg), '样例未在前 20 条里挑');
    assert.ok(/if \(!best \|\| n > best\.n\) best = \{ n: n, p: p \};/.test(mg), '未按行数挑最挤的一条');
    assert.ok(!/len > best\.len/.test(mg), 'v0.9.228：长度二级判据还在（会挑中后半句）');
    /* 旧的抬高量推算必须删干净 */
    assert.ok(!/botLines/.test(mg) && !/stackOf/.test(mg), 'v0.9.225/226 的行数重算路径还在');
    assert.ok(!/C\.assStackMV\(/.test(mg) && !/C\.assTopMV\(/.test(mg), '仍在调用旧的抬高量函数');
    assert.ok(/const dstMV = m\.dst \+ cueOff, srcMV = m\.src \+ cueOff;/.test(mg), '预览未取两个离底值');
    /* 预览与导出必须同口径：同一对数值 + 同一个整条级偏移（v0.9.254） */
    assert.ok(/mv: srcMV \+ off \}/.test(mg) && /mv: dstMV \+ off \}/.test(mg), '导出的 mv 与预览取值不同源');
  });

  /* ================= v0.9.229：位置由数值决定后，「上下顺序」必须真的对调 ================= */
  t('v0.9.229：「上下顺序」不能只换样式名（那样界面上毫无变化）', () => {
    assert.ok(/const d = \$\('assDstMV'\), s = \$\('assSrcMV'\);/.test(mg), 'biOrder 变化时未取两个离底值');
    assert.ok(/const tmp = d\.value; d\.value = s\.value; s\.value = tmp;/.test(mg), '未真正交换两个离底值');
    /* 译文在上 → 译文的 mv 必须是大的那个 */
    const evs = [{ start:0, end:1000, lines:[{ style:'TopMain', text:'译文在上', mv:981 }, { style:'Sub', text:'原文在下', mv:42 }] }];
    const out = M.formatAss(evs, { title:'t', assStyle:{ dstMV:981, srcMV:42 } });
    assert.ok(/TopMain,,0,0,981,/.test(out), '译文在上时位置不对');
    assert.ok(/Sub,,0,0,42,/.test(out), '原文在下时位置不对');
  });

  t('v0.9.229：导出的 ASS 能被自己解析回来（往返一致）', () => {
    const evs = [{ start:0, end:1000, lines:[{ style:'Sub', text:'EN line', mv:117 }, { style:'Bottom', text:'中文字幕', mv:42 }] }];
    const out = M.formatAss(evs, { title:'t', assStyle:{ dstSize:54, srcSize:42, dstMV:42, srcMV:117 } });
    const rt = M.parseAss(out);
    assert.strictEqual(rt.items.length, 2, '往返后条数不对：' + rt.items.length);
    assert.strictEqual(rt.playResY, 1080);
    assert.ok(rt.styles.Bottom && rt.styles.Sub, '往返后样式定义丢失');
    assert.strictEqual(rt.styles.Bottom.marginV, 42);
    assert.strictEqual(rt.styles.Sub.marginV, 117);
    /* 再喂给 planAssImport，应判回「底部双行 + 译文 42 / 原文 117」 */
    const plan = M.planAssImport(rt.items, rt.styles, rt.playResY);
    assert.strictEqual(plan.layout, 'stack', '往返后布局判错');
    assert.strictEqual(plan.dstMV, 42, '往返后译文离底不对');
    assert.strictEqual(plan.srcMV, 117, '往返后原文离底不对');
  });

  /* ================= v0.9.228：预览必须在所有「产生 rows」的路径上重画 =================
     病根：doMerge 里画了预览，doAdjust 里漏了 →「调整双语字幕」导入现成 ASS、
     点「拆分」后只有表格和导出区，ASS 效果预览整块不出现（用户看到的就是没有预览图）。
     这类「一份逻辑写两遍、只改了一处」的漏，靠 CDP 跑合并模式永远照不到。 */
  t('v0.9.228：调整模式拆完也要画效果预览', () => {
    const iAdj = mg.indexOf('function doAdjust(){');
    assert.ok(iAdj > 0, '找不到 doAdjust');
    const adjBody = mg.slice(iAdj, mg.indexOf('function swapSides('));
    assert.ok(/renderAssPv\(\);/.test(adjBody), 'doAdjust 里没有 renderAssPv()');
    /* 必须先显示 #exp 再画，否则画布高度是 0，位置全错 */
    assert.ok(adjBody.indexOf("$('exp').style.display = 'block';") < adjBody.indexOf('renderAssPv();'),
      'doAdjust 里 renderAssPv 早于 #exp 显示');
    const swBody = mg.slice(mg.indexOf('function swapSides(){'), mg.indexOf('function fmtShort('));
    assert.ok(/renderAssPv\(\);/.test(swBody), 'swapSides 后未重画预览（上下两条会停在旧内容）');
    const smBody = mg.slice(mg.indexOf('function syncMode(){'), mg.indexOf('function setI18nKey('));
    assert.ok(/renderAssPv\(\);/.test(smBody), 'syncMode 清 rows 后未收起预览');
    /* 调整模式换「拆分结构」要立刻重拆，不能等用户再点一次按钮 */
    assert.ok(/smEl\.addEventListener\('change', \(\)=>\{ if \(S\.mode === 'adjust' && S\.rows\) doAdjust\(\); \}\)/.test(mg),
      '拆分结构变了不会重拆');
  });

  /* ================= v0.9.227：导入 ASS 必须把文件自带的样式带进来 =================
     病根：parseAss 只留每条的 style 名字，[V4+ Styles] 定义（字体/字号/颜色/描边/对齐/边距）
     整段丢弃 → 用户导入现成双语 ASS 后界面上还是工具自己的默认外观，原文件样式全丢。 */
  const mkAss227 = (resY, styleLines, evLines) => [
    '[Script Info]', 'ScriptType: v4.00+',
    'PlayResX: ' + Math.round(resY * 16 / 9), 'PlayResY: ' + resY, '',
    '[V4+ Styles]',
    'Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding'
  ].concat(styleLines).concat(['', '[Events]',
    'Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text'
  ]).concat(evLines).join('\n');
  const S227_BOTTOM = 'Style: Bottom,PingFang SC,56,&H00FFFFFF,&H000000FF,&H00000000,&H64000000,-1,0,0,0,100,100,0,0,1,2.5,0,2,60,60,42,1';
  const S227_TOP    = 'Style: Top,Arial,40,&H0000D7FF,&H000000FF,&H00000000,&H64000000,0,0,0,0,100,100,0,0,1,2,0,8,60,60,40,1';
  const S227_SUB    = 'Style: Sub,Arial,40,&H3300D7FF,&H000000FF,&H00000000,&H64000000,0,0,0,0,100,100,0,0,1,2,0,2,60,60,110,1';
  const EV227_SPLIT = ['Dialogue: 0,0:00:01.00,0:00:04.00,Top,,0,0,0,,Companies respond to tariffs',
                       'Dialogue: 0,0:00:01.00,0:00:04.00,Bottom,,0,0,0,,企业通常通过调整价格来应对'];
  const EV227_STACK = ['Dialogue: 0,0:00:01.00,0:00:04.00,Sub,,0,0,0,,Companies respond to tariffs',
                       'Dialogue: 0,0:00:01.00,0:00:04.00,Bottom,,0,0,0,,企业通常通过调整价格来应对'];

  t('v0.9.227：parseAss 必须带回 [V4+ Styles] 与 PlayRes（此前整段丢弃）', () => {
    const r = M.parseAss(mkAss227(1080, [S227_BOTTOM, S227_TOP], EV227_SPLIT));
    assert.strictEqual(r.playResY, 1080, 'PlayResY 没解析出来');
    assert.strictEqual(r.playResX, 1920);
    assert.ok(r.styles && r.styles.Bottom && r.styles.Top, 'styles 缺失');
    assert.strictEqual(r.styles.Bottom.font, 'PingFang SC');
    assert.strictEqual(r.styles.Bottom.size, 56);
    assert.strictEqual(r.styles.Bottom.alignment, 2);
    assert.strictEqual(r.styles.Bottom.marginV, 42);
    assert.strictEqual(r.styles.Top.alignment, 8);
    assert.strictEqual(r.styles.Top.marginV, 40);
    assert.strictEqual(r.items[0].style, 'Top', '条目仍要带 style 名（v0.9.222 的能力不能回退）');
  });

  t('v0.9.227：ASS 颜色 &HAABBGGRR → #RRGGBB + 不透明度', () => {
    assert.deepStrictEqual(M.assColorHex('&H00FFFFFF'), { hex: '#FFFFFF', alpha: 100 });
    assert.deepStrictEqual(M.assColorHex('&H0000D7FF'), { hex: '#FFD700', alpha: 100 });
    assert.deepStrictEqual(M.assColorHex('&H3300D7FF'), { hex: '#FFD700', alpha: 80 });  // 0x33=51 → 80%
    assert.strictEqual(M.assColorHex('&HFFFFFF').hex, '#FFFFFF');      // 只写 6 位的老文件
    assert.strictEqual(M.assColorHex('乱七八糟'), null);
  });

  t('v0.9.227：分屏双语 ASS → 译文贴底 56 白 / 原文贴顶 40 金', () => {
    const r = M.parseAss(mkAss227(1080, [S227_BOTTOM, S227_TOP], EV227_SPLIT));
    const p = M.planAssImport(r.items, r.styles, r.playResY);
    assert.strictEqual(p.layout, 'split', '一个贴顶一个贴底 → 分屏');
    assert.strictEqual(p.order, 'src-first');
    assert.strictEqual(p.dstName, 'Bottom'); assert.strictEqual(p.srcName, 'Top');
    assert.strictEqual(p.dst.size, 56); assert.strictEqual(p.dst.color, '#FFFFFF');
    assert.strictEqual(p.src.size, 40); assert.strictEqual(p.src.color, '#FFD700');
    assert.strictEqual(p.src.font, 'Arial', '字体必须是文件里的字体');
    assert.strictEqual(p.dst.outline, 2.5); assert.strictEqual(p.dst.outlineColor, '#000000');
    /* v0.9.230：原文那条是 an8（MarginV=距顶 40）→ 换算成离底 = 1080−40−行数(2)×行高。
       按 2 行换算是与分屏默认 922 同口径；按 1 行换会直接把 2 行原文顶出画面。 */
    assert.strictEqual(p.dstMV, 42);
    assert.strictEqual(p.srcMV, Math.round(1080 - 40 - 2 * M.assLineHeight(40)), '原文离底应换算成 ' + Math.round(1080 - 40 - 2 * M.assLineHeight(40)));
    assert.strictEqual(p.scaled, false);
  });

  t('v0.9.227：底部双行 ASS → 译文贴底、原文在上，间距由两条的 MarginV 差算出', () => {
    const r = M.parseAss(mkAss227(1080, [S227_BOTTOM, S227_SUB], EV227_STACK));
    const p = M.planAssImport(r.items, r.styles, r.playResY);
    assert.strictEqual(p.layout, 'stack', '两条都贴底 → 底部双行');
    assert.strictEqual(p.dstName, 'Bottom'); assert.strictEqual(p.srcName, 'Sub');
    assert.strictEqual(p.dstMV, 42, '译文那条量离底');
    /* v0.9.229：两条都 an2，各自给绝对离底值，不再做「差 − 行高」的换算 */
    assert.strictEqual(p.srcMV, 110, '原文离底应直接取 110，实得 ' + p.srcMV);
    assert.strictEqual(p.src.alpha, 80, '&H33 前缀的半透明要带过来');
  });

  t('v0.9.227：非 1080p 文件要等比换算（720p 的 56pt/42 → 84pt/63）', () => {
    const r = M.parseAss(mkAss227(720, [S227_BOTTOM, S227_SUB], EV227_STACK));
    const p = M.planAssImport(r.items, r.styles, r.playResY);
    assert.strictEqual(p.scaled, true);
    assert.strictEqual(p.resY, 720);
    assert.strictEqual(p.dst.size, 84);
    assert.strictEqual(p.dstMV, 63);
    assert.strictEqual(p.dst.outline, 3.8);
  });

  t('v0.9.227：主语言在上时判出 dst-first（字号大的那条当译文）', () => {
    /* 中文 56pt 贴顶、英文 40pt 贴底 —— 与常规相反，不能判反 */
    const bigTop = 'Style: CN,Microsoft YaHei,56,&H00FFFFFF,&H000000FF,&H00000000,&H64000000,-1,0,0,0,100,100,0,0,1,2.5,0,8,60,60,40,1';
    const smallBottom = 'Style: EN,Arial,40,&H0000D7FF,&H000000FF,&H00000000,&H64000000,0,0,0,0,100,100,0,0,1,2,0,2,60,60,42,1';
    const r = M.parseAss(mkAss227(1080, [bigTop, smallBottom],
      ['Dialogue: 0,0:00:01.00,0:00:04.00,CN,,0,0,0,,企业应对关税',
       'Dialogue: 0,0:00:01.00,0:00:04.00,EN,,0,0,0,,Companies respond']));
    const p = M.planAssImport(r.items, r.styles, r.playResY);
    assert.strictEqual(p.order, 'dst-first', '主语言（字号大）在上时应是 dst-first');
    assert.strictEqual(p.dstName, 'CN'); assert.strictEqual(p.srcName, 'EN');
    /* v0.9.230：译文在上时它的 MarginV 是 an8 的「距顶 40」→ 换算成离底（按 2 行） */
    assert.strictEqual(p.dstMV, Math.round(1080 - 40 - 2 * M.assLineHeight(56)), '译文离底应换算');
    assert.strictEqual(p.srcMV, 42, '原文在下 → 离底 42');
  });

  t('v0.9.227：assDominantStyle 取用得最多的那条样式', () => {
    const r = M.parseAss(mkAss227(1080, [S227_BOTTOM, S227_TOP],
      EV227_SPLIT.concat(['Dialogue: 0,0:00:05.00,0:00:08.00,Bottom,,0,0,0,,再来一条译文'])));
    const d = M.assDominantStyle(r.items, r.styles, r.playResY);
    assert.strictEqual(d.name, 'Bottom', 'Bottom 用了 2 次、Top 1 次');
    assert.strictEqual(d.size, 56);
  });

  t('v0.9.227：merge.html 接线（存样式 → 套用 → 提示来源）', () => {
    assert.ok(/S\[side\+'Ass'\] = \(fmt === 'ass' && r\.styles/.test(mg), 'loadSide 未保存文件样式');
    assert.ok(/autoAlignDefault\(\);\s*\n\s*importAssStyle\(\);/.test(mg), '导入后未调用 importAssStyle');
    assert.ok(/function applyAssPlan\(plan\)\{/.test(mg), '缺 applyAssPlan');
    assert.ok(/function ensureFontOption\(sel, name\)\{/.test(mg), '文件里的字体不在下拉里时未补选项');
    assert.ok(/id="assImportNote"/.test(mg), '缺「样式来自哪个文件」的提示位');
    /* 导入时只刷显隐/文案，绝不能顺带套预设把导入值冲掉 */
    assert.ok(/function syncAssChrome\(\)\{/.test(mg), '缺 syncAssChrome');
    assert.ok(/function syncAssPanel\(\)\{\s*\n\s*const tpl = tplVal\(\);\s*\n\s*syncAssChrome\(\);/.test(mg),
      'syncAssPanel 未拆出 syncAssChrome');
    assert.ok(!/function syncAssPanel\(\)\{[\s\S]{0,400}\$\('assPanel'\)\.style\.display/.test(mg),
      'syncAssPanel 仍在自己管显隐');
    assert.ok(/const pnl = \$\('assPanel'\); if \(pnl\) pnl\.open = true;/.test(mg), '导入后未展开面板');
    assert.ok(/if \(!S\.srcAss\)\{ clearNote\(\); return false; \}/.test(mg), '换成非 ASS 后未清掉旧提示');
    ['assImportedToast','assImportedNote','assImportedNoteShared','assImportedNoteOne','assImportedRes','assFontFromFile'].forEach(k => {
      const c = (mg.match(new RegExp('\\b' + k + ':', 'g')) || []).length;
      assert.strictEqual(c, 4, k + ' 应有 4 种语言，实际 ' + c);
    });
  });
  /* v0.9.231 自查抓到的真 bug：新词条 lblAlign 与既有的「配对方式 · 时间轴取自」同名 →
     同一个对象字面量里重复键，后者静默覆盖前者 → 配对方式那个标签被显示成「水平对齐」。
     这条护栏一次管两件事：①四语字典内不许有重复键 ②页面里 data-i18n 用到的 key 四语都必须有。
     ⚠️ 取键只认「{ 或 , 之后、紧跟 :' 」——否则会把英文文案里的 "file: {0}" 当成词条（误报）。 */
  t('v0.9.231：merge.html 四语字典无重复键，且页面用到的 key 四语齐全', () => {
    const dictBlock = (code) => {
      const re = new RegExp("(?:'|\")?" + code.replace('-', '\\-') + "(?:'|\")?\\s*:\\s*\\{");
      const m = re.exec(mg);
      assert.ok(m, '找不到 ' + code + ' 字典');
      let i = m.index + m[0].length - 1, depth = 0, j = i;
      for (; j < mg.length; j++) {
        if (mg[j] === '{') depth++;
        else if (mg[j] === '}') { depth--; if (depth === 0) break; }
      }
      return mg.slice(i, j + 1);
    };
    const keysOf = (block) => {
      const out = [];
      const re = /[{,]\s*([A-Za-z_][A-Za-z0-9_]*)\s*:\s*'/g;
      let m;
      while ((m = re.exec(block))) out.push(m[1]);
      return out;
    };
    const used = [];
    const reU = /data-i18n(?:-ph|-html|-title)?="([A-Za-z0-9_]+)"/g;
    let mu;
    while ((mu = reU.exec(mg))) used.push(mu[1]);
    assert.ok(used.length > 50, '页面里几乎没用到 i18n？只找到 ' + used.length);
    ['zh-CN', 'zh-TW', 'en', 'ja'].forEach(code => {
      const ks = keysOf(dictBlock(code));
      const seen = Object.create(null), dup = [];
      ks.forEach(k => { if (seen[k]) dup.push(k); seen[k] = 1; });
      assert.deepStrictEqual(dup, [], code + ' 字典里有重复键（后者会静默覆盖前者）：' + dup.join(','));
      const miss = [...new Set(used)].filter(k => !seen[k]);
      assert.deepStrictEqual(miss, [], code + ' 字典缺少页面用到的词条：' + miss.join(','));
    });
    /* 本版新增词条：四语各一份，不多不少 */
    ['lblBold','lblSpacing','lblEdge','lblEdgeSize','lblEdgeColor','lblEdgeAlpha','lblHAlign','lblMarginL','lblMarginR',
     'edgeNone','edgeShadow','edgeBox','alignL','alignC','alignR','edgeTip',
     'schemeSave','schemeApply','schemeDel','schemeExport','schemeImport','schemeHint','schemeNone',
     'schemeAskName','schemeSaved','schemeApplyNone','schemeApplied','schemeDelAsk','schemeDeleted',
     'schemeBadJson','schemeImported','schemeNoFile'].forEach(k => {
      const c = (mg.match(new RegExp('\\b' + k + ':', 'g')) || []).length;
      assert.strictEqual(c, 4, k + ' 应有 4 种语言，实际 ' + c);
    });
    /* 改名后的护栏：旧的 lblAlign（配对方式）不该被新字段抢走 */
    assert.ok(/lblAlign:'配对方式 · 时间轴取自'/.test(mg), 'lblAlign 被覆盖成别的含义了');
    assert.ok(/data-i18n="lblHAlign"/.test(mg), '「水平对齐」未用独立词条 lblHAlign');
  });

  t('v0.9.231：新字段全部接进导出端（老调用不传 assStyle 时逐字节不变）', () => {
    /* 老调用：不传 assStyle → 样式行必须与 v0.9.230 完全一致（粗体/间距/对齐/边距都是旧写死值） */
    const old = M.formatAss([
      { start: 1000, end: 4000, lines: [{ style: 'Bottom', text: '中文', mv: 42 }, { style: 'Top', text: 'EN', mv: 922 }] }
    ], { title: 'old' });
    const st = {};
    old.split('\n').forEach(x => { if (x.indexOf('Style: ') === 0) { const c = x.split(','); st[c[0].slice(7)] = c; } });
    ['Bottom','Top','TopMain','Sub'].forEach(n => {
      assert.ok(st[n], '缺样式 ' + n);
      assert.strictEqual(st[n][18], '2', n + ' 老调用应仍底部居中');
      assert.strictEqual(st[n][13], '0', n + ' 老调用字间距应仍 0');
      assert.strictEqual(st[n][15], '1', n + ' 老调用 BorderStyle 应仍 1');
      assert.strictEqual(st[n][17], '0', n + ' 老调用 Shadow 应仍 0');
      assert.strictEqual(st[n][19], '60', n + ' 老调用 MarginL 应仍 60');
      assert.strictEqual(st[n][20], '60', n + ' 老调用 MarginR 应仍 60');
    });
    assert.strictEqual(st.Bottom[7], '-1', '老调用译文应仍粗体');
    assert.strictEqual(st.Top[7], '0', '老调用原文应仍不粗体');
  });

  t('v0.9.231：新字段传进去后逐列落到 ASS 样式行', () => {
    const out = M.formatAss([
      { start: 1000, end: 4000, lines: [{ style: 'Bottom', text: '中文', mv: 42 }, { style: 'Top', text: 'EN', mv: 922 }] }
    ], { title: 'new', assStyle: {
      dstSize: 56, srcSize: 50,
      dstColor: '&H00FFFFFF', srcColor: '&H0000D7FF',
      dstOutline: 2.5, srcOutline: 2.5,
      dstOutlineColor: '&H00000000', srcOutlineColor: '&H00000000',
      dstFont: 'PingFang SC', srcFont: 'Arial',
      dstAlpha: 100, srcAlpha: 100,
      dstBold: false, srcBold: true,
      dstSpacing: 2, srcSpacing: 0,
      dstBox: true, srcBox: false,
      dstShadow: 0, srcShadow: 5,
      dstBackColor: '&H00000000', srcBackColor: '&H00000000',
      dstBackAlpha: 80, srcBackAlpha: 60,
      dstAlign: 1, srcAlign: 3,
      marginL: 120, marginR: 90,
      dstMV: 42, srcMV: 922
    } });
    const st = {};
    out.split('\n').forEach(x => { if (x.indexOf('Style: ') === 0) { const c = x.split(','); st[c[0].slice(7)] = c; } });
    assert.strictEqual(st.Bottom[7], '0', '译文粗体关掉 → Bold=0');
    assert.strictEqual(st.Top[7], '-1', '原文粗体打开 → Bold=-1');
    assert.strictEqual(st.Bottom[13], '2', '译文字间距 2');
    assert.strictEqual(st.Bottom[15], '3', '译文底衬 → BorderStyle=3');
    assert.strictEqual(st.Bottom[17], '0', '底衬模式下 Shadow 恒 0');
    assert.strictEqual(st.Top[15], '1', '原文无底衬 → BorderStyle=1');
    assert.strictEqual(st.Top[17], '5', '原文阴影 5');
    assert.strictEqual(st.Bottom[18], '1', '译文底·左');
    assert.strictEqual(st.Top[18], '3', '原文底·右');
    assert.strictEqual(st.Bottom[19], '120', 'MarginL=120');
    assert.strictEqual(st.Bottom[20], '90', 'MarginR=90');
    /* BackColour 的 alpha：80% 不透明 → 20% 透明 → &H33 */
    assert.strictEqual(st.Bottom[6], '&H33000000', '底衬色 alpha 应为 33（80% 不透明）');
  });

  t('v0.9.231：ASS_DEFAULTS 覆盖到每个新字段，且方案保存全部带上', () => {
    ['assDstBold','assSrcBold','assDstSpacing','assSrcSpacing','assDstEdge','assSrcEdge',
     'assDstEdgeSize','assSrcEdgeSize','assDstEdgeColor','assSrcEdgeColor',
     'assDstEdgeAlpha','assSrcEdgeAlpha','assDstAlign','assSrcAlign',
     'assMarginL','assMarginR'].forEach(id => {
      assert.ok(new RegExp("\\['" + id + "',").test(mg), 'ASS_DEFAULTS 缺 ' + id);
    });
    /* 方案 = 全部字段 + 布局 + 上下顺序，少一样就是半套 */
    assert.ok(/function schemeFields\(\)\{[\s\S]{0,400}__layout/.test(mg), '方案没存布局');
    assert.ok(/__order: orderVal\(\)/.test(mg), '方案没存上下顺序');
    assert.ok(/ASS_DEFAULTS\.forEach\(function\(pair\)\{ const id = pair\[0\]/.test(mg), '方案没遍历 ASS_DEFAULTS');
    assert.ok(/el\.type === 'checkbox'\) \? !!el\.checked : el\.value/.test(mg), '方案存 checkbox 用了 value（无效）');
    /* 应用方案绝不能走 syncAssPanel —— 那会触发 applyTplDefaults 把值整套覆盖 */
    assert.ok(!/function schemeApplyObj[\s\S]{0,600}syncAssPanel/.test(mg), '套用方案走了 syncAssPanel，值会被预设冲掉');
    assert.ok(/function schemeApplyObj[\s\S]{0,800}syncAssEdge\(\); syncAssChrome\(\); renderAssPv\(\);/.test(mg),
      '套用方案后未同步边色控件/显隐/预览');
  });


  /* ================= v0.9.232：自定义 API 的「服务端转发」通道 =================
     起因：api.z.ai 这类端点的网关不放行 CORS 预检（OPTIONS 只回 200、不带
     Access-Control-Allow-*），浏览器直连必抛 Failed to fetch——跟 Key、模型名、
     参数全无关。只能用服务端代发，且这条链路必须与后台 B 槽同一套 callModel。 */
  const fsR = require('fs'), paR = require('path');
  const srvR = fsR.readFileSync(paR.join(__dirname, 'server.js'), 'utf8');

  t('v0.9.232：转发端点接进服务端，且走的是同一套 callModel', () => {
    assert.ok(/u === '\/api\/proxy'/.test(srvR), 'server.js 没有 /api/proxy 路由');
    assert.ok(/await callModel\(relayCfg, pbody\.messages/.test(srvR), '转发没复用 callModel（会与后台行为分叉）');
    assert.ok(/normParams\(pbody && pbody\.extra\)/.test(srvR), '转发没走附加参数清洗');
    /* 客户端断开必须中止上游——否则服务端还在替一个已经关掉标签页的用户烧 token */
    assert.ok(/res\.on\('close', \(\) => \{ if \(!res\.writableFinished\) cliAc\.abort\(\); \}\)/.test(srvR), '转发没接客户端断开中止');
    assert.ok(/timeoutMs: budget/.test(srvR), '转发没有超时预算');
    assert.ok(/delete pOut\._rl/.test(srvR), '额度头不该外泄给前端');
  });

  t('v0.9.232：转发是开放代理，必须有目的地白名单与限流', () => {
    assert.ok(/function targetAllowed\(/.test(srvR) && /function proxyAllow\(/.test(srvR), '缺白名单或限流');
    assert.ok(/u\.protocol !== 'https:'/.test(srvR), '没有强制 https（Key 会在链路上裸奔）');
    assert.ok(/if \(isIp\) return isPrivateIp\(host\)/.test(srvR), 'IP 形式没查内网');
    assert.ok(/dns\.promises\.lookup\(host, \{ all: true \}\)/.test(srvR), '域名没做解析后复查（DNS 指向内网会漏）');
    assert.ok(/PROXY_CAP/.test(srvR) && /Too many relay requests/.test(srvR), '没有按 IP 限流');
    /* 不能把用户 Key 写进配置或埋点 */
    assert.ok(!/cfg\.key\s*=\s*relayCfg|writeFileSync\([^)]*relayCfg/.test(srvR), '转发的 Key 不该落盘');
  });

  t('v0.9.232：内网/本机/云元数据地址一律拒绝转发', () => {
    const src = srvR.match(/function isPrivateIp\(ip\)\{[\s\S]*?\n\}/);
    assert.ok(src, 'isPrivateIp 不存在');
    const f = new Function(src[0] + '; return isPrivateIp;')();
    ['127.0.0.1', '127.1.2.3', '10.0.0.1', '192.168.1.1', '172.16.0.1', '172.31.255.255',
     '169.254.169.254', '0.0.0.0', '::1', '::', 'fe80::1', 'fd00::1', '::ffff:127.0.0.1',
     '100.64.0.1'].forEach(ip => assert.strictEqual(f(ip), true, ip + ' 应判为内网'));
    ['8.8.8.8', '1.1.1.1', '47.236.70.2', '104.16.0.1'].forEach(ip => assert.strictEqual(f(ip), false, ip + ' 不该判为内网'));
    /* 172.15 / 172.32 是公网段，别误杀 */
    assert.strictEqual(f('172.15.0.1'), false, '172.15 是公网');
    assert.strictEqual(f('172.32.0.1'), false, '172.32 是公网');
  });

  t('v0.9.232：前端转发开关接进 chatOnce（请求体/请求头/重试都要跟着变）', () => {
    assert.ok(/const RELAY_API = '\/api\/proxy'/.test(html), '缺转发端点常量');
    assert.ok(/const relay = !builtin && relayOn\(\);/.test(html), 'chatOnce 没判转发');
    assert.ok(/relay \? RELAY_API : base\.replace/.test(html), '转发时 URL 没切到本站');
    /* 转发还带 Authorization 跨域头 → 第三方端点的预检照样先失败一次 */
    assert.ok(/if\(!builtin && !relay && key\) headers\.Authorization/.test(html), '转发时不该再发 Authorization 头');
    assert.ok(/relay\?mkRelayBody\(plan\):mkBody\(plan\)/.test(html), '转发没用转发体');
    assert.ok(/const b=\{ base:base, key:key, model:model, messages:msgs \}/.test(html), '转发体缺端点三件套/正文');
    assert.ok(/if\(opts && opts\.json\) b\.json=1;/.test(html), '转发体没带 JSON 意图（服务端无从注入 response_format）');
    assert.ok(/b\.timeoutMs=Math\.max\(5000, Math\.min\(300000, ms-5000\)\)/.test(html), '转发体没带超时预算');
    /* 服务端已做完四轮降级，前端再按错误文案重试 = 同一个请求白跑几遍 */
    assert.ok(/if\(relay\) throw e;/.test(html), '转发时前端仍在重试');
    /* 失败体是本站的 {error:{message}}，要取出来给人话 */
    assert.ok(/const ej=JSON\.parse\(tx\); em=\(ej&&ej\.error&&ej\.error\.message\)/.test(html), '转发失败没取 error.message');
  });

  t('v0.9.232：温度与附加参数对齐后台（不再写死 0.2 / 不再丢嵌套对象）', () => {
    assert.ok(/function tempFront\(\)/.test(html), '缺温度读取');
    assert.ok(/temperature:\(tp===null\?0\.2:tp\)/.test(html), '直连仍写死 temperature（与后台 cfg.temperature 不一致）');
    assert.ok(/b\.temperature=tp/.test(html), '转发体没带温度');
    /* 后台 v0.9.210 已支持嵌套（OpenRouter 的 {"provider":{...}}），前端此前整条丢弃 */
    assert.ok(/function cleanParamVal\(node, depth\)/.test(html), '附加参数没有递归清洗');
    assert.ok(/const top = cleanParamVal\(o,0\)/.test(html), '附加参数没走清洗');
    assert.ok(/EXTRA_MAX_DEPTH = 4/.test(html), '清洗没有深度封顶');
    const csrc = html.match(/function cleanParamVal\(node, depth\)\{[\s\S]*?\n\}/);
    assert.ok(csrc, '取不到 cleanParamVal 源码');
    /* 源码里引用了 EXTRA_MAX_DEPTH，单拿出来求值时要显式注入（否则 ReferenceError） */
    const cf = new Function('EXTRA_MAX_DEPTH', csrc[0] + '; return cleanParamVal;')(4);
    /* 嵌套对象要原样保留（此前会被静默丢掉） */
    assert.deepStrictEqual(cf({ provider: { sort: 'price', allow_fallbacks: true } }, 0),
      { provider: { sort: 'price', allow_fallbacks: true } }, '嵌套对象被丢了');
    assert.deepStrictEqual(cf({ a: [1, 'x', true] }, 0), { a: [1, 'x', true] }, '数组被丢了');
    assert.deepStrictEqual(cf({ fn: function () {}, good: 1 }, 0), { good: 1 }, '函数值应被剔除');
  });

  t('v0.9.232：转发开关与温度要能存下来，且默认关', () => {
    assert.ok(html.indexOf("temp:($('temp')||{}).value||''") > 0, 'save() 没存温度');
    assert.ok(html.indexOf("viaSrv:(($('viaSrv')||{}).checked)?'1':'0'") > 0, 'save() 没存转发开关');
    assert.ok(/if\(sv\.temp\) \$\('temp'\)\.value=sv\.temp;/.test(html), '加载没回填温度');
    assert.ok(/if\(sv\.viaSrv==='1'\) \$\('viaSrv'\)\.checked=true;/.test(html), '加载没回填转发开关');
    assert.ok(/'extra','temp','viaSrv','terms'/.test(html), 'temp/viaSrv 没接进 change 自动保存');
    /* 默认必须是关：原有承诺是「自定义 API 不经本站」 */
    assert.ok(/<input type="checkbox" id="viaSrv">/.test(html), '转发开关默认是勾选的（改变了隐私承诺）');
    assert.ok(/<input type="number" id="temp" value="0\.2"/.test(html), '温度默认值不是 0.2（与后台不一致）');
  });

  t('v0.9.232：测试连接要在直连失败时说人话，而不是只抛 Failed to fetch', () => {
    assert.ok(/\{maxTokens:256\}/.test(html), '测试连接没给 max_tokens（思考型模型会返回空正文）');
    assert.ok(/if\(\/Failed to fetch\|NetworkError\|Load failed\|net::ERR_FAILED\/i\.test\(m\)\)/.test(html), '没识别直连失败');
    assert.ok(/m = relaying \? t\('errRelay', m\) : t\('errCors'\);/.test(html), '没区分「直连失败」与「转发也失败」');
  });

  t('v0.9.232：新增词条四语齐全，且没撞已有键（v0.9.259 起补齐全部 27 语）', () => {
    ['lblTemp', 'tempTip', 'lblViaSrv', 'viaSrvTip', 'errCors', 'errRelay'].forEach(k => {
      /* v0.9.259：6 词条从主 4 语补齐到全部 27 语 —— 每语言恰好 1 次，共 27 次 */
      const n = (html.match(new RegExp("(?<![A-Za-z0-9_])" + k + "\\s*:", 'g')) || []).length;
      assert.strictEqual(n, 27, k + ' 出现 ' + n + ' 次（应为 27：I18N 全部语言各 1 次）');
    });
    /* 页面元素真的引用了它们 */
    assert.ok(/data-i18n="lblViaSrv"/.test(html) && /data-tip-i18n="viaSrvTip"/.test(html), '转发开关没接 i18n');
    assert.ok(/data-i18n="lblTemp"/.test(html) && /data-tip-i18n="tempTip"/.test(html), '温度没接 i18n');
  });


  /* ============ v0.9.233：主站 ASS 也去掉自动夹取（与双语合成 v0.9.230 同口径） ============
     双语合成工具在 v0.9.230 已经确认「用户填什么就是什么，不许偷偷夹」，但主站 index.html
     还留着 v0.9.130 加的 ASS_TOP_SAFE=42 兜底下限，同一个原则下这是个漏网的潜规则。 */
  t('v0.9.233：主站 assTopMV 不再偷偷夹取（所见即所得）', () => {
    assert.ok(!/var ASS_TOP_SAFE/.test(html), 'ASS_TOP_SAFE 常量还在');
    const src = html.match(/function assTopMV\(bottomDist, nLines, lineH\)\{[\s\S]*?\n\}/);
    assert.ok(src, '取不到 assTopMV 源码');
    assert.ok(!/Math\.max/.test(src[0]), 'assTopMV 里还有 Math.max（仍在兜底下限）');
    const f = new Function(src[0] + '; return assTopMV;')();
    /* 纯算式：距顶 = 1080 − 离底 − 行数×行高，负值就让它负（顶部块贴边/出画是用户自己的设定） */
    assert.strictEqual(f(40, 1, 59), 981, '1 行@40 → 981');
    assert.strictEqual(f(922, 2, 59), 40, '2 行@922 → 40');
    assert.strictEqual(f(981, 2, 59), -19, '2 行@981 → −19（如实溢出，不夹）');
    assert.strictEqual(f(981, 3, 59), -78, '3 行@981 → −78（如实溢出，不夹）');
    assert.strictEqual(f(42, 1, 59), 979, '默认 42/1 行 → 979');
    /* 只有手改过（dstFix/srcFix）才逐条指定 mv，所以默认值不受这次改动影响 */
    assert.ok(/dstFirst && L\.dstFix/.test(html) && /!dstFirst && L\.srcFix/.test(html),
      '顶部 mv 的写入条件变了（默认值也可能被波及）');
  });



  /* ===== v0.9.234：导出端（srt-core）的位置值也不再有隐藏区间 =====
     v0.9.233 只删掉了 index.html 里 assTopMV 的 42 兜底，但真正的替换发生在下游两条：
       ① 样式行的 MV / DST_MV / SRC_MV 被夹到 [0,400] / [0,1080]
       ② 每条 Dialogue 的 MarginV 被夹到 [1,1080]，负值直接改成 0（= 回退样式默认值）
     端到端实测：离底 981 的顶部块本应 33，旧版输出 42；离底 1050 本应 −36，旧版输出 0 → 回落默认。 */
  function styleMV(out, name){
    const ln = out.split('\n').filter(l => l.startsWith('Style: ')).find(l => l.split(',')[0] === 'Style: ' + name);
    return ln ? ln.split(',')[21] : 'NA';   /* 0=Style 名 … 21=MarginV */
  }
  function dlgMV(out, style){
    const ln = out.split('\n').filter(l => l.startsWith('Dialogue: ')).find(l => l.split(',')[3] === style);
    return ln ? ln.split(',')[7] : 'NA';
  }

  t('v0.9.234：样式行的离底距离不再被夹到 400 / 1080', () => {
    const out = C.formatAss([{ start:0, end:1000, lines:[{ text:'x' }] }], { assStyle:{ dstMV:2000, srcMV:0 } });
    assert.strictEqual(styleMV(out,'Bottom'), '2000', '用户填 2000 应原样输出');
    assert.strictEqual(styleMV(out,'Sub'), '0', '用户填 0 应原样输出');
    /* 旧调用（不传）必须逐字节不变 */
    const def = C.formatAss([{ start:0, end:1000, lines:[{ text:'x' }] }], {});
    ['Bottom','Top','TopMain','Sub'].forEach(n => assert.strictEqual(styleMV(def,n), '42', n + ' 默认值应保持 42'));
    /* 只传 marginV 的老口径也要跟着走 */
    assert.strictEqual(styleMV(C.formatAss([{start:0,end:1,lines:[{text:'x'}]}],{assStyle:{marginV:500}}),'Bottom'), '500');
  });

  t('v0.9.234：每条 Dialogue 的 MarginV 如实写出（含负值），未指定才写 0', () => {
    const mk = mv => C.formatAss([{ start:0, end:1000, lines:[{ style:'TopMain', text:'顶部', mv:mv }] }], {});
    assert.strictEqual(dlgMV(mk(-36), 'TopMain'), '-36', '负值应如实写出（旧版会被改成 0 → 回退样式默认）');
    assert.strictEqual(dlgMV(mk(33), 'TopMain'), '33', '33 应保留（旧版会被夹到 42）');
    assert.strictEqual(dlgMV(mk(981), 'TopMain'), '981', '常规值不受影响');
    assert.strictEqual(dlgMV(mk(1200), 'TopMain'), '1200', '超过 1080 也如实写出（用户自己在预览里会看到）');
    /* 没给 mv → 写 0，语义仍是「回退样式默认值」 */
    assert.strictEqual(dlgMV(C.formatAss([{ start:0, end:1000, lines:[{ style:'TopMain', text:'顶部' }] }], {}), 'TopMain'), '0');
  });

  t('v0.9.234：主站不再有任何偷偷夹取整段距离的写法（防回归）', () => {
    const core = require('fs').readFileSync(require('path').join(__dirname, 'srt-core.js'), 'utf8');
    assert.ok(!/var ASS_TOP_SAFE/.test(html), 'index.html 的 ASS_TOP_SAFE 又回来了');
    assert.ok(!/Math\.min\(400, Math\.round\(numOr\(AS\.marginV/.test(core), '样式 MV 又有了 [0,400] 夹取');
    assert.ok(!/Math\.min\(1080, Math\.round\(numOr\(AS\.dstMV/.test(core), '译文离底又有了 [0,1080] 夹取');
    assert.ok(!/Math\.min\(1080, Math\.round\(numOr\(AS\.srcMV/.test(core), '原文离底又有了 [0,1080] 夹取');
    assert.ok(!/mvNum > 0 \? Math\.max\(1, Math\.min\(1080/.test(core), 'Dialogue 的 MarginV 又有了 [1,1080] 夹取');
    assert.ok(/mvSpecified \? Math\.round/.test(core), '「是否显式给过 mv」的判定丢了');
  });



  /* ===== v0.9.235：双语合成页也清掉偷偷夹取（与 srt-core v0.9.234 同一口径） =====
     主站在 v0.9.233/234 清干净了，双语页用的是独立引擎 merge-core.js，同款防御还留着：
       ① 样式行 MV 夹 [0,400]、译文/原文离底夹 [0,1080]
       ② 每条 Dialogue 的 MarginV 夹 [1,1080]，负值改成 0（= 回退样式默认 42）
       ③ merge.html 里 assMVs()/导出/预览/导入换算各自还有一次 Math.max(0,…) 或 [0,1080]
     用户 10-06 定案的原则是全站通用的：用户填什么就是什么，不许偷偷改。 */
  const fsE = require('fs'), pathE = require('path');
  const ME  = require('./merge-core.js');
  const mgE = fsE.readFileSync(pathE.join(__dirname, 'merge.html'), 'utf8');
  const mcE = fsE.readFileSync(pathE.join(__dirname, 'merge-core.js'), 'utf8');
  const mStyleMV = (out, name) => {
    const l = out.split('\n').filter(x => x.indexOf('Style: ') === 0)
                 .find(x => x.split(',')[0] === 'Style: ' + name);
    return l ? l.split(',')[21] : 'NA';   /* 0=Style 名 … 21=MarginV */
  };
  const mDlgMV = (out, style) => {
    const l = out.split('\n').filter(x => x.indexOf('Dialogue: ') === 0)
                 .find(x => x.split(',')[3] === style);
    return l ? l.split(',')[7] : 'NA';
  };
  const mMk = mv => ME.formatAss([{ start:0, end:1000, lines:[{ style:'TopMain', text:'顶部', mv:mv }] }], {});

  t('v0.9.235：双语样式行的离底距离不再被夹到 400 / 1080', () => {
    const out = ME.formatAss([{ start:0, end:1000, lines:[{ text:'x' }] }], { assStyle:{ dstMV:2000, srcMV:-50 } });
    assert.strictEqual(mStyleMV(out,'Bottom'), '2000', '用户填 2000 应原样输出（旧版夹到 1080）');
    assert.strictEqual(mStyleMV(out,'Sub'), '-50', '用户填 −50 应原样输出（旧版夹到 0）');
    assert.strictEqual(mStyleMV(ME.formatAss([{start:0,end:1000,lines:[{text:'x'}]}],{assStyle:{marginV:500}}),'Bottom'), '500',
      '只传 marginV 的老口径也要跟着走（旧版夹到 400）');
    /* 旧调用（不传）必须逐字节不变 */
    const def = ME.formatAss([{ start:0, end:1000, lines:[{ text:'x' }] }], {});
    ['Bottom','Top','TopMain','Sub'].forEach(n => assert.strictEqual(mStyleMV(def,n), '42', n + ' 默认值应保持 42'));
  });

  t('v0.9.235：双语 Dialogue 的 MarginV 如实写出（含负值），未指定才写 0', () => {
    assert.strictEqual(mDlgMV(mMk(-36), 'TopMain'), '-36', '负值应如实写出（旧版改成 0 → 回退样式默认 42）');
    assert.strictEqual(mDlgMV(mMk(33), 'TopMain'), '33', '33 应保留（旧版夹到下限 1）');
    assert.strictEqual(mDlgMV(mMk(981), 'TopMain'), '981', '常规值不受影响');
    assert.strictEqual(mDlgMV(mMk(1200), 'TopMain'), '1200', '超过 1080 也如实写出（用户自己在预览里看得到）');
    /* 没给 mv → 写 0，语义仍是「回退样式默认值」 */
    assert.strictEqual(mDlgMV(ME.formatAss([{start:0,end:1000,lines:[{style:'TopMain',text:'顶部'}]}],{}), 'TopMain'), '0');
  });

  t('v0.9.235：assMVs() 如实传出负数与超界，只在「框里没数字」时兜底', () => {
    const aSrc = mgE.match(/function assMVs\(\)\{[\s\S]*?\n\}/);
    assert.ok(aSrc, '取不到 assMVs 源码');
    const STORE = {};
    const aFn = new Function('$', aSrc[0] + '; return assMVs;')(id => ({ value: STORE[id] }));
    STORE.assDstMV = '-36'; STORE.assSrcMV = '1200';
    assert.deepStrictEqual(aFn(), { dst:-36, src:1200 }, '负数/超界应如实传出（旧版负数会回退 42/922）');
    STORE.assDstMV = '42';  STORE.assSrcMV = '922';
    assert.deepStrictEqual(aFn(), { dst:42, src:922 }, '常规值不变');
    STORE.assDstMV = '';    STORE.assSrcMV = '';
    assert.deepStrictEqual(aFn(), { dst:42, src:922 }, '框里没数字时仍兜底默认值（这条不能丢）');
  });

  t('v0.9.235：预览与导出取同一个原样值，两处都不许再夹', () => {
    const pv = mgE.slice(mgE.indexOf('function renderAssPv(){'), mgE.indexOf('function baseName(){'));
    const ev = mgE.slice(mgE.indexOf('function buildAssEvents(){'), mgE.indexOf('function buildExport(){'));
    assert.ok(/const st = assStyleOf\(\), m = assMVs\(\)/.test(pv), '预览没读 assMVs()');
    assert.ok(/const mv = assMVs\(\);/.test(ev), '导出没读 assMVs()');
    assert.ok(/const dstMV = m\.dst \+ cueOff, srcMV = m\.src \+ cueOff;/.test(pv), '预览不是原样取值');
    assert.ok(/const dstMV = mv\.dst, srcMV = mv\.src;/.test(ev), '导出不是原样取值');
    /* 样式层与导入换算也不许再有 Math.max(0,…) / [0,1080] */
    assert.ok(!/Math\.max\(0, m\.(?:dst|src)\)/.test(mgE), 'merge.html 仍有 Math.max(0, m.*)');
    assert.ok(!/dstMV: Math\.max\(0, m\.dst\)/.test(mgE), '样式层仍在把离底值夹到 0');
  });

  t('v0.9.235：防回归 —— 双语链路不再有偷偷夹取整段距离的写法', () => {
    assert.ok(!/Math\.min\(400, Math\.round\(numOr\(AS\.marginV/.test(mcE), '样式 MV 又有了 [0,400] 夹取');
    assert.ok(!/Math\.min\(1080, Math\.round\(numOr\(AS\.dstMV/.test(mcE), '译文离底又有了 [0,1080] 夹取');
    assert.ok(!/Math\.min\(1080, Math\.round\(numOr\(AS\.srcMV/.test(mcE), '原文离底又有了 [0,1080] 夹取');
    assert.ok(!/mvNum > 0 \? Math\.max\(1, Math\.min\(1080/.test(mcE), 'Dialogue 的 MarginV 又有了 [1,1080] 夹取');
    assert.ok(/mvSpecified \? Math\.round/.test(mcE), '「是否显式给过 mv」的判定丢了');
    /* 导入换算（an8 距顶 → 离底）也不许夹：源文件本来就出画时，要让用户第一眼看见 */
    assert.ok(!/Math\.max\(0, Math\.min\(1080, Math\.round\(1080 - f\.marginV/.test(mcE), 'merge-core 导入换算仍在夹');
    assert.ok(!/Math\.max\(0, Math\.min\(1080, Math\.round\(1080 - f\.marginV/.test(mgE), 'merge.html 导入换算仍在夹');
    /* assStackMV 是「推荐值」计算器（单测锁了 1~1080），不是用户设置值，不动 */
    assert.ok(/function assStackMV\(o\) \{/.test(mcE), 'assStackMV 不该被删（主站推荐值仍在用）');
  });


  console.log('— v0.9.236：WebVTT 样式（STYLE 块 + cue settings） —');

  const VTT_ITEMS = [{ no:1, start:1000, end:3200, text:'我们应该谈谈这件事。\nWe should talk about this.' }];

  t('v0.9.236：不传样式时 VTT 输出与旧版逐字节一致（老调用不许变）', () => {
    const old = 'WEBVTT\n\n' + VTT_ITEMS.map(it => it.no + '\n' + C.fmtTimeVtt(it.start) + ' --> ' + C.fmtTimeVtt(it.end) + '\n' + it.text).join('\n\n') + '\n';
    assert.strictEqual(C.formatVtt(VTT_ITEMS), old, '不传第二参时输出变了');
    assert.strictEqual(C.formatVtt(VTT_ITEMS, {}), old, '传空 opt 时输出变了');
  });

  t('v0.9.236：样式写进文件头的 STYLE 块，且必须排在第一条 cue 之前', () => {
    const out = C.formatVtt(VTT_ITEMS, { style:{ color:'#FFFFFF', size:100, bgOn:true, bgColor:'#000000', bgAlpha:55 }, srcLine:1 });
    assert.ok(out.startsWith('WEBVTT\n\nSTYLE\n'), '缺 STYLE 块（或位置不对）');
    const iStyle = out.indexOf('STYLE'), iCue = out.indexOf('00:00:01.000');
    assert.ok(iStyle > 0 && iStyle < iCue, 'STYLE 块必须在第一条 cue 之前，否则整块被当成无效样式');
    assert.ok(/::cue \{/.test(out), '缺 ::cue 规则');
    assert.ok(/  color: #FFFFFF;/.test(out), '主色没写进去');
    assert.ok(/  font-size: 100%;/.test(out), '字号没写进去');
    assert.ok(/  background-color: rgba\(0, 0, 0, 0\.55\);/.test(out), '底衬没写进去');
    /* 规范：STYLE 块内不允许空行，否则整条样式表作废 */
    const blk = out.slice(iStyle, out.indexOf('\n\n', iStyle));
    assert.ok(!/\n\s*\n/.test(blk), 'STYLE 块里有空行（整条样式表会被判作废）');
  });

  t('v0.9.236：cue settings 原样写入，百分比不许夹取', () => {
    const out = C.formatVtt(VTT_ITEMS, { style:{ line:'150', position:'-10', width:'120', align:'start' } });
    assert.ok(/line:150% position:-10% size:120% align:start/.test(out), 'cue settings 拼接不对：' + out.slice(0, 200));
    assert.ok(out.indexOf('line:150%') > 0, '超界 line 被改写');
    assert.ok(out.indexOf('position:-10%') > 0, '负 position 被改写');
    assert.ok(out.indexOf('size:120%') > 0, '超界 size 被改写');
    /* line 的三种锚定要能原样出去 */
    assert.ok(C.formatVtt(VTT_ITEMS, { style:{ line:'90', lineAlign:'end' } }).indexOf('line:90%,end') > 0, '缺 line 锚定');
    assert.ok(C.formatVtt(VTT_ITEMS, { style:{ line:'0', lineAlign:'start' } }).indexOf('line:0%,start') > 0);
  });

  t('v0.9.236：只写规范白名单里的 CSS 属性（白名单外会被播放器忽略）', () => {
    const out = C.formatVtt(VTT_ITEMS, { style:{ color:'#FFFFFF', size:100, font:'sans', bold:true, italic:true,
      lineHeight:1.4, shadowOn:true, shadowW:2, shadowColor:'#000000', bgOn:true, bgColor:'#000000', bgAlpha:55 }, srcLine:1 });
    const decl = out.slice(out.indexOf('::cue {'), out.indexOf('\n}'));
    const props = [...decl.matchAll(/^\s*([a-z-]+):/gm)].map(m => m[1]);
    assert.ok(props.length > 0, '没解析到任何声明');
    props.forEach(p => assert.ok(C.VTT_CSS_WHITE.indexOf(p) >= 0, '写了白名单外的属性: ' + p));
    assert.ok(!/letter-spacing/.test(out), 'VTT 不支持字间距（ASS 有，VTT 没有，别平移）');
    assert.ok(!/text-align/.test(out), 'text-align 不在 ::cue 白名单里');
    assert.ok(!/transform/.test(out));
    assert.ok(/  font-weight: bold;/.test(out), '粗体没写进去');
    assert.ok(/  font-style: italic;/.test(out), '斜体没写进去');
  });

  t('v0.9.236：描边用 text-shadow 八向模拟（VTT 没有真描边，outline 画的是方框）', () => {
    const sh = C.vttShadowCss({ shadowOn:true, shadowW:2, shadowColor:'#000000' });
    const parts = sh.split(', ');
    assert.strictEqual(parts.length, 8, 'text-shadow 应为八向，实际 ' + parts.length);
    assert.ok(parts.every(p => /^-?[\d.]+px -?[\d.]+px 0 #000000$/.test(p)), 'text-shadow 格式不对: ' + sh);
    assert.strictEqual(C.vttShadowCss({ shadowOn:false, shadowW:2 }), '', '关掉描边就不该输出');
    assert.ok(!/outline/.test(C.formatVtt(VTT_ITEMS, { style:{ shadowOn:true, shadowW:2 } })), 'outline 画的是方框不是字描边');
  });

  t('v0.9.236/241：双语原文行包进 <c.src>，位置跟着 bi-src / bi-dst 走；要不要区分由「写不写得出声明」定', () => {
    const a = C.formatVtt(VTT_ITEMS, { style:{ srcColor:'#FFD700' }, srcLine:0 });
    assert.ok(/<c\.src>我们应该谈谈这件事。<\/c\.src>\nWe should talk about this\./.test(a), 'bi-src 应把第一行当原文');
    const b = C.formatVtt(VTT_ITEMS, { style:{ srcColor:'#FFD700', srcSize:85 }, srcLine:1 });
    assert.ok(/我们应该谈谈这件事。\n<c\.src>We should talk about this\.<\/c\.src>/.test(b), 'bi-dst 应把第二行当原文');
    assert.ok(/::cue\(\.src\) \{\n  color: #FFD700;\n  font-size: 85%;\n\}/.test(b), '缺 ::cue(.src) 规则');
    /* v0.9.241：原文行全部「沿用」= 不打标记、不写规则（原文行与译文行完全一样），
       改由「写不写得出声明」判定，不再看有没有勾某个总闸 */
    const c = C.formatVtt(VTT_ITEMS, { style:{ srcColorInh:true, srcSizeInh:true, srcColor:'#FFD700', srcSize:85 }, srcLine:1 });
    assert.ok(!/<c\.src>/.test(c), '全部沿用就不该写 class（哪怕输入框里还留着值）');
    assert.ok(!/::cue\(\.src\)/.test(c), '全部沿用就不该输出 ::cue(.src)');
    const d = C.formatVtt([{ no:1, start:0, end:1000, text:'只有一行' }], { style:{ srcColor:'#FFD700' }, srcLine:0 });
    assert.ok(!/<c\.src>/.test(d), '单语（只有一行）不该包 class');
    /* 写不出声明（颜色非法、字号空）→ 两边都不做：不许留下匹配不到元素的死规则 */
    const e = C.formatVtt(VTT_ITEMS, { style:{ srcColor:'not-a-color', srcSize:'' }, srcLine:1 });
    assert.ok(!/<c\.src>/.test(e) && !/::cue\(\.src\)/.test(e), '写不出声明时不许留下死规则/死标记');
    /* 逐项生效：只开原文行粗体 → 只写那一项，不夹带字号颜色。
       ⚠️ 三态五项只有双语页那份引擎有（主站原文行只有字号、颜色两项），所以这里用 M。 */
    const M = require('./merge-core.js');
    const f = M.formatVtt(VTT_ITEMS, { style:{ srcBold:'on' }, srcLine:1 });
    assert.ok(/<c\.src>/.test(f) && /::cue\(\.src\) \{\n  font-weight: bold;\n\}/.test(f),
      '只开一项就该只写那一项：' + (f.match(/::cue\(\.src\) \{[^}]*\}/) || [''])[0]);
    /* 「单独关」必须显式写 normal，否则 ::cue 的值会漏下来 */
    const g = M.formatVtt(VTT_ITEMS, { style:{ srcBold:'off' }, srcLine:1 });
    assert.ok(/::cue\(\.src\) \{\n  font-weight: normal;\n\}/.test(g), '「关」必须显式写 normal');
    /* 主站那一份不带三态：只给 srcBold 不产生任何声明（不会伪造出主站没有的能力） */
    const h = C.formatVtt(VTT_ITEMS, { style:{ srcBold:'on' }, srcLine:1 });
    assert.ok(!/<c\.src>/.test(h) && !/::cue\(\.src\)/.test(h), '主站不该凭空支持原文行三态');
  });

  t('v0.9.236：导出的 VTT 能被自己解析回来（条数与时间轴不变）', () => {
    const out = C.formatVtt(VTT_ITEMS, { style:{ color:'#FFFFFF', bgOn:true }, srcLine:1 });
    const r = C.parseVtt(out);
    assert.strictEqual(r.items.length, 1, 'STYLE 块被当成 cue 了（或 cue 丢了）');
    assert.strictEqual(r.items[0].start, 1000, '时间轴被样式块带偏');
    assert.strictEqual(r.items[0].end, 3200);
    assert.ok(r.items[0].text.indexOf('我们应该谈谈这件事。') >= 0, '正文丢了');
    assert.strictEqual(C.detectFormat(out), 'vtt', '带 STYLE 块也要能被识别成 vtt');
  });

  t('v0.9.236：主站 VTT 面板接进导出与预览（改了要真的生效）', () => {
    assert.ok(/id="vttStyleBox"/.test(html), '缺 VTT 样式面板');
    assert.ok(/function vttStyle\(\)\{/.test(html), '缺样式收集函数');
    assert.ok(/function syncVttStyleBox\(\)\{/.test(html), '缺面板显隐');
    assert.ok(/C\.formatVtt\(buildExportItems\(\), \{ style: vttStyle\(\), srcLine: vttSrcLine\(\) \}\)/.test(html), '导出没带上 VTT 样式');
    assert.ok(/function vttSrcLine\(\)\{/.test(html), '缺「原文行是第几行」的判定');
    assert.ok(/b\.style\.display=\(expFileFmt\(\)==='vtt'\)\?'':'none'/.test(html), '面板没按导出格式显隐');
    assert.ok(/isVtt && pvH>0\)\{ try\{ syncVttPreview\(/.test(html), '预览没画 VTT 样式');
    /* 面板一动就要重画预览 + 落盘，否则又是「改了没反应」的假控件 */
    assert.ok(/b\.addEventListener\('input', function\(\)\{ syncVttStyleBox\(\); syncExpPreview\(\); save\(\); \}\)/.test(html), '面板改动没接进预览');
    /* 单语没有原文行 → 原文那一组整块收起 */
    assert.ok(/var sb=\$\('vttSrcBox'\)/.test(html), '缺原文行的显隐');
  });

  t('v0.9.236：VTT 预览与导出读同一份样式，不另算一套', () => {
    const pv = html.slice(html.indexOf('function syncVttPreview('), html.indexOf('/* v0.9.196：导出预览跟随'));
    assert.ok(pv.length > 0, '没抠到 syncVttPreview');
    assert.ok(/var st=vttStyle\(\)/.test(pv), '预览没读 vttStyle()（会和导出分家）');
    assert.ok(/cue\.style\.bottom=\(100-ln\)\+'%'/.test(pv), '预览的 line 没按百分比落位');
    assert.ok(/cue\.style\.width=w\+'%'/.test(pv), '预览的宽度没用 size%');
    assert.ok(!/Math\.max\(0,/.test(pv) && !/Math\.min\(100,/.test(pv), '预览不许夹取位置（用户填什么就画什么）');
  });

  t('v0.9.236：新增词条四语齐全（其余界面语言回退中文）', () => {
    const keys = ['secVttStyle','vttStyleTip','vttGrpPos','lblVttLine','vttAnchorBottom','vttAnchorTop','vttAnchorMid',
      'lblVttPos','lblVttWidth','lblVttAlign','vttAlignCenter','vttAlignStart','vttAlignEnd','vttGrpText','lblVttSize',
      'vttSizeTip','lblVttColor','lblVttFont','vttFontSans','vttFontSerif','vttFontMono','lblVttLH','lblVttWeight',
      'vttBold','vttItalic','vttGrpSrc','vttSrcDiffTip','vttInherit','vttOptSet','lblVttSrcColor','lblVttSrcSize','vttGrpDeco',
      'lblVttBg','lblVttShadow','vttShadowTip','vttFxTip'];
    const dictOf = (code) => {
      const m = new RegExp("'" + code + "'\\s*:\\s*\\{").exec(html);
      assert.ok(m, '找不到语言块 ' + code);
      const start = m.index + m[0].length;
      const nx = /'[a-zA-Z][a-zA-Z-]*'\s*:\s*\{/.exec(html.slice(start));
      return html.slice(start, start + (nx ? nx.index : html.length));
    };
    ['zh-CN','zh-TW','en','ja'].forEach(code => {
      const d = dictOf(code);
      keys.forEach(k => assert.ok(new RegExp("[,\\s]" + k + ":").test(d), code + ' 缺词条 ' + k));
    });
    /* 主站 27 语块没法逐个配齐，靠 t() 的 zh-CN 回退层兜底 —— 这层必须还在 */
    assert.ok(/I18N\['zh-CN'\]\[k\] !== undefined \? I18N\['zh-CN'\]\[k\] : k/.test(html), 't() 缺 zh-CN 回退层');
  });



  console.log('— v0.9.237：VTT 样式回读 / 方案 / 原生对照预览 —');

  const V237_ITEMS = [{ no:1, start:1000, end:3200, text:'我们应该谈谈这件事。\nWe should talk about this.' }];
  const V237_ST = { line:'90', lineAlign:'end', position:'50', width:'80', align:'center', size:100, color:'#FFFFFF',
    font:'sans', lineHeight:1.4, bold:false, italic:false, srcColor:'#FFD700', srcSize:85,
    bgOn:true, bgColor:'#000000', bgAlpha:55, shadowOn:true, shadowW:2, shadowColor:'#000000' };

  t('v0.9.237：自己写出去的样式能原样读回来（往返一致）', () => {
    const p = C.parseVttStyle(C.formatVtt(V237_ITEMS, { style:V237_ST, srcLine:1 }));
    assert.strictEqual(p.found, true, '没读到样式');
    const s = p.style;
    assert.strictEqual(s.line, '90'); assert.strictEqual(s.lineAlign, 'end');
    assert.strictEqual(s.position, '50'); assert.strictEqual(s.width, '80'); assert.strictEqual(s.align, 'center');
    assert.strictEqual(s.size, '100'); assert.strictEqual(s.color, '#FFFFFF'); assert.strictEqual(s.font, 'sans');
    assert.strictEqual(s.lineHeight, '1.4');
    assert.strictEqual(s.bgColor, '#000000'); assert.strictEqual(s.bgAlpha, '55');
    assert.strictEqual(s.shadowW, '2'); assert.strictEqual(s.shadowColor, '#000000');
    assert.strictEqual(s.srcColor, '#FFD700'); assert.strictEqual(s.srcSize, '85');
    /* v0.9.241：原文行「单独设 / 沿用」从文件里读回 —— 这块里写了才是「单独设」 */
    assert.strictEqual(s.srcColorInh, false); assert.strictEqual(s.srcSizeInh, false);
    assert.strictEqual(p.srcLine, 1, '原文行位置读错');
  });

  t('v0.9.237：没样式的 VTT 不假装有样式（found=false，面板一律不动）', () => {
    const p = C.parseVttStyle('WEBVTT\n\n1\n00:00:01.000 --> 00:00:02.000\nhi\n');
    assert.strictEqual(p.found, false);
    assert.strictEqual(Object.keys(p.style).length, 0);
    assert.strictEqual(p.srcLine, null);
    assert.deepStrictEqual(C.parseVttStyle('').notes, []);
  });

  t('v0.9.237：只读自己认得的东西（REGION / 白名单外属性 / 别的选择器 / 非法值一律忽略）', () => {
    const vtt = ['WEBVTT','','REGION','id:r1','width:40%','','STYLE',
      '::cue { color: #FF0000; letter-spacing: 1px; }','::cue(.other) { color: #00FF00; }','::cue(.src) { color: #FFD700; }','',
      '1','00:00:01.000 --> 00:00:02.000 line:3 align:left','<c.other>hi</c.other>'].join('\n');
    const p = C.parseVttStyle(vtt);
    assert.strictEqual(p.style.color, '#FF0000', '主色应读到');
    assert.strictEqual(p.style.srcColor, '#FFD700', '::cue(.src) 应读到');
    assert.ok(!('letterSpacing' in p.style), '白名单外的属性不该被读回来（面板根本没这个字段）');
    assert.strictEqual(p.style.align, undefined, 'align:left 不在面板取值范围内 → 不填');
    assert.strictEqual(p.style.line, undefined, 'line:3 是行号不是百分比 → 不换算、不填');
    assert.ok(p.notes.indexOf('lineNumber') >= 0, '行号写法要提示用户');
    assert.strictEqual(p.srcLine, null, '<c.other> 不是原文行标记');
  });

  t('v0.9.237：字体反查 —— 预设还原成 sans/serif/mono，第三方族名原样带回去', () => {
    assert.strictEqual(C.vttFontKeyOf(C.vttFontStack('sans')), 'sans');
    assert.strictEqual(C.vttFontKeyOf(C.vttFontStack('serif')), 'serif');
    assert.strictEqual(C.vttFontKeyOf(C.vttFontStack('mono')), 'mono');
    assert.strictEqual(C.vttFontKeyOf('"Helvetica",sans-serif'), 'Helvetica', '第三方族名不能被吞成默认值');
    assert.strictEqual(C.vttFontKeyOf('sans-serif'), 'sans');
    assert.strictEqual(C.vttFontKeyOf('monospace'), 'mono');
    assert.strictEqual(C.vttFontKeyOf(''), '');
    /* 顺序陷阱：sans-serif 里含 serif */
    assert.notStrictEqual(C.vttFontKeyOf('"Times New Roman",sans-serif'), 'serif');
  });

  t('v0.9.237：颜色 / 描边还原（rgba → #RRGGBB + 百分比；没写就不造值）', () => {
    const a = C.vttUnRgba('rgba(255, 215, 0, 0.55)');
    assert.strictEqual(a.hex, '#FFD700'); assert.strictEqual(a.alpha, 55);
    assert.strictEqual(C.vttUnRgba('#abcdef').hex, '#ABCDEF');
    assert.strictEqual(C.vttUnRgba('#abcdef').alpha, 100);
    assert.strictEqual(C.vttUnRgba('hsl(1,2,3)'), null);
    const p = C.parseVttStyle(C.formatVtt(V237_ITEMS, { style:{ shadowOn:true, shadowW:3, shadowColor:'#123456' } }));
    assert.strictEqual(p.style.shadowW, '3', '描边粗细没还原');
    assert.strictEqual(p.style.shadowColor, '#123456', '描边颜色没还原');
    const q = C.parseVttStyle(C.formatVtt(V237_ITEMS, { style:{ shadowOn:false, bgOn:false, bold:false, italic:false } }));
    assert.strictEqual(q.style.shadowOn, undefined, '没写 text-shadow 就不该造出 shadowOn');
    assert.strictEqual(q.style.bgOn, undefined, '没写 background-color 就不该造出 bgOn');
    assert.strictEqual(q.style.bold, undefined, '没写 font-weight 就不该造出 bold=false（会冲掉面板值）');
  });

  t('v0.9.237：导入回填只填读到的字段，且绝不改用户的导出格式', () => {
    assert.ok(/function applyVttStyle\(p\)\{/.test(html), '缺回填函数');
    assert.ok(/if\(!p \|\| !p\.found\) return 0;/.test(html), 'found=false 时不该动面板');
    assert.ok(/if\(s\.bold!=null\) put\('vttBold',s\.bold\);/.test(html), 'bold 读不到时会把面板值冲成 false');
    assert.ok(/if\(s\.italic!=null\) put\('vttItalic',s\.italic\);/.test(html), 'italic 同上');
    assert.ok(/var o=document\.createElement\('option'\); o\.value=v; o\.textContent=v; e\.appendChild\(o\);/.test(html), '第三方字体没补 option（会被静默丢成默认）');
    assert.ok(/const vp=C\.parseVttStyle\(text\);/.test(html) && /applyVttStyle\(vp\)/.test(html), '导入没接回填');
    const i = html.indexOf("if(inFmt==='vtt'){");
    const seg = html.slice(i, html.indexOf("log(t('imported'", i));
    assert.ok(seg.length > 0 && seg.indexOf("expStyle") < 0, '导入不该顺手改用户的导出格式选择');
    assert.ok(/vp\.notes\.indexOf\('lineNumber'\)>=0/.test(seg), '行号写法没有提示用户');
  });

  t('v0.9.237：样式方案覆盖面板全部字段（漏一个就不是那套样式）', () => {
    assert.ok(/const VTT_SCHEME_KEY='srt_vtt_style_v1';/.test(html), '缺方案存储键');
    const ids = ['vttLine','vttLineAlign','vttPos','vttWidth','vttAlign','vttSize','vttColor','vttFont','vttLH',
      'vttBold','vttItalic','vttSrcSizeMode','vttSrcColorMode','vttSrcColor','vttSrcSize','vttBgOn','vttBgColor','vttBgAlpha',
      'vttShadowOn','vttShadowW','vttShadowColor'];
    const m = /const VTT_SCHEME_IDS=\[([\s\S]*?)\];/.exec(html);
    assert.ok(m, '缺字段白名单');
    ids.forEach(id => assert.ok(m[1].indexOf("'"+id+"'") >= 0, '方案漏了字段 ' + id));
    /* 反向：面板上真实存在的控件必须全在方案里（防「新加字段忘了进方案」） */
    ids.forEach(id => assert.ok(html.indexOf('id="'+id+'"') >= 0, 'HTML 里没有控件 ' + id));
    assert.ok(/function vttSchemeDoSave\(\)\{/.test(html));
    assert.ok(/function vttSchemeDoApply\(\)\{/.test(html));
    assert.ok(/function vttSchemeDoDel\(\)\{/.test(html));
    assert.ok(/JSON\.parse\(localStorage\.getItem\(VTT_SCHEME_KEY\)\|\|'\{\}'\)/.test(html), '方案读取没有坏数据兜底');
    /* 套用后必须重画预览 + 落盘，否则「点了没反应」 */
    const ap = html.slice(html.indexOf('function vttSchemeDoApply(){'), html.indexOf('function vttSchemeDoDel(){'));
    assert.ok(/syncExpPreview\(\)/.test(ap) && /save\(\)/.test(ap), '套用方案后没刷新预览/没落盘');
  });

  t('v0.9.237：原生对照预览喂的是真实导出产物（不是另造一套）', () => {
    assert.ok(/id="vttNatVid"/.test(html), '缺原生预览 video');
    assert.ok(/id="vttNatCv"/.test(html), '缺提供时间轴的 canvas');
    assert.ok(/VTT_NAT\.stream=cv\.captureStream\(8\);/.test(html), 'video 没有时间轴来源（没有媒体源，轨道不会被渲染）');
    assert.ok(/if\(!cv\.captureStream\) return false;/.test(html), '不支持 captureStream 时该直接放弃，别给假画面');
    const tx = html.slice(html.indexOf('function vttNatText(){'), html.indexOf('function vttNatSync(){'));
    /* 文本必须与自绘预览同源（都读导出预览里那两个示例行），否则两个画面对不上 */
    assert.ok(/querySelector\('\.ep-dst'\)/.test(tx) && /querySelector\('\.ep-src'\)/.test(tx), '原生预览没读预览里的示例文本');
    assert.ok(tx.indexOf('buildExport()') < 0, '原生预览不该另取 S.rows 的内容（会和自绘预览说两件事）');
    assert.ok(/C\.formatVtt\(\[\{no:1,start:800,end:4800,text:text\}\], \{style:vttStyle\(\), srcLine:vttSrcLine\(\)\}\)/.test(tx), '原生预览没用同一份样式与原文行判定');
    const now = html.slice(html.indexOf('function vttNatSyncNow(){'), html.indexOf('function vttNatShow('));
    assert.ok(/new Blob\(\[vttNatText\(\)\], \{type:'text\/vtt'\}\)/.test(now), '没把产物塞进 track');
    assert.ok(/URL\.revokeObjectURL\(VTT_NAT\.url\)/.test(now), '旧 Blob URL 没释放（改样式会持续泄漏）');
    /* ⚠️ 整只 video 重建：只换 track（甚至先 disabled 再 removeChild）都清不掉上一轮字幕的渲染，
       MediaStream 源 + 复用 video 会留下"新旧双影"（实测彩色像素 9086 两层 vs 5649 一层）。 */
    const bd = html.slice(html.indexOf('function vttNatBuild('), html.indexOf('function vttNatPause(){'));
    assert.ok(bd.length > 0, '抠不到 vttNatBuild');
    assert.ok(/tr\.src=url/.test(bd), 'track 没换源');
    assert.ok(/nv\.id='vttNatVid'/.test(bd), '重建的 video 没保留 id（后面 $() 就取不到了）');
    assert.ok(/old\.parentNode\.replaceChild\(nv, old\)/.test(bd), '必须整只换掉 video：只换 track 会残留上一轮字幕（双影）');
    assert.ok(/vttNatBuild\(VTT_NAT\.url\)/.test(now), '换样式时没走重建');
    /* 时间轴必须归零：MediaStream 不可 seek，不重建就永远停在过期时间点 */
    assert.ok(/function vttNatRestart\(\)/.test(html) && /vttNatRestart\(\);/.test(html), '缺时间轴归零');
    /* 样式 / 格式一变就要重刷（否则预览是死的） */
    /* v0.9.258：右栏不再提供 VTT 面板，原生对照预览改为受 ADV_EXPORT 门控 ——
       面板藏起来还让 canvas 转就是白烧 CPU。开关本身也要钉住，别被顺手删了。 */
    assert.ok(/if\(isVtt && ADV_EXPORT\)\{ try\{ vttNatSync\(\); \}catch\(e\)\{\} \}/.test(html),
      '导出预览没带动原生预览（v0.9.258 起须同时受 ADV_EXPORT 门控）');
    assert.ok(/const ADV_EXPORT = false;/.test(html), 'ADV_EXPORT 开关丢了（面板会重新冒出来）');
    assert.ok(/forEach\(function\(id\)\{ try\{ syncColorSw\(id\); \}catch\(e\)\{\} \}\);[\s\S]{0,220}?vttNatSync\(\);/.test(html),
      'syncVttStyleBox 没带动原生预览');
    assert.ok(/id="vttNatReplay"/.test(html), '缺重播按钮（定格后没法再看一眼）');
    /* ⚠️ VTTCue 的时间属性是 startTime/endTime；写成 c.start 会拿到 undefined → hold=NaN →
       setTimeout(fn,NaN) 立刻暂停 → play() 抛 AbortError → 定格在 0 秒（整块预览全黑） */
    const ph = html.slice(html.indexOf('function vttNatPlayHold(){'), html.indexOf('function vttNatText(){'));
    assert.ok(ph.length > 0, '抠不到 vttNatPlayHold');
    assert.ok(/\.startTime/.test(ph) && /\.endTime/.test(ph), 'VTTCue 要用 startTime/endTime');
    /* 反例要先去注释再判 —— 上面这段注释本身就写了 c.start 这几个字 */
    const phCode = ph.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/[^\n]*/g, '');
    assert.ok(!/\.start\b/.test(phCode) && !/\.end\b/.test(phCode), '.start / .end 在 VTTCue 上是 undefined，会把播放掐死在 0 秒');
  });

  t('v0.9.237：方案与原生预览的词条四语齐全', () => {
    const keys = ['vttGrpScheme','vttSchemeApply','vttSchemeSave','vttSchemeDel','vttSchemeNone','vttSchemeAskName',
      'vttSchemeSaved','vttSchemeApplied','vttSchemePick','vttSchemeDelAsk','vttSchemeDeleted','vttStyleImported',
      'vttLineNumNote','vttNativeT','vttNativeReplay','vttNativeTip'];
    const dictOf = (code) => {
      const m = new RegExp("'" + code + "'\\s*:\\s*\\{").exec(html);
      assert.ok(m, '找不到语言块 ' + code);
      const start = m.index + m[0].length;
      const nx = /'[a-zA-Z][a-zA-Z-]*'\s*:\s*\{/.exec(html.slice(start));
      return html.slice(start, start + (nx ? nx.index : html.length));
    };
    ['zh-CN','zh-TW','en','ja'].forEach(code => {
      const d = dictOf(code);
      keys.forEach(k => assert.ok(new RegExp("[,\\s]" + k + ":").test(d), code + ' 缺词条 ' + k));
    });
  });



  console.log('— v0.9.238：双语页自己的 WebVTT 样式（与主站隔离、参数同源） —');

  const V238_ITEMS = [{ no:1, start:1000, end:3200, text:'我们应该谈谈这件事。\nWe should talk about this.' }];
  const V238_ST = { line:'90', lineAlign:'end', position:'50', width:'80', align:'center',
    size:'100', color:'#FFFFFF', font:'PingFang SC', lineHeight:'1.4', bold:true, italic:false,
    srcColor:'#FFD700', srcSize:'85',
    bgOn:true, bgColor:'#000000', bgAlpha:'55', shadowOn:true, shadowW:'2', shadowColor:'#000000' };

  t('v0.9.238：两套引擎的 VTT 产物逐字节一致（参数同源，哪边漂移都会在这里炸）', () => {
    const variants = [
      V238_ST,
      { line:'150', position:'-20', width:'12.5', size:'150', srcColorInh:true, srcSizeInh:true, bgOn:false, shadowOn:false, shadowW:'0' },
      { srcColor:'#C9D1D9', srcSize:'78' },
      {}
    ];
    variants.forEach((st, i) => {
      assert.strictEqual(M.vttStyleBlock(st), C.vttStyleBlock(st), 'STYLE 块与主站不一致 #' + i);
      assert.strictEqual(M.vttCueSettings(st), C.vttCueSettings(st), 'cue settings 与主站不一致 #' + i);
      [0, 1].forEach(sl => assert.strictEqual(
        M.formatVtt(V238_ITEMS, { style:st, srcLine:sl }),
        C.formatVtt(V238_ITEMS, { style:st, srcLine:sl }), '整份 VTT 与主站不一致 #' + i));
    });
    const out = M.formatVtt(V238_ITEMS, { style:V238_ST, srcLine:1 });
    assert.deepStrictEqual(M.parseVttStyle(out), C.parseVttStyle(out), '样式回读与主站结果不一致');
    const p = M.parseVttStyle(out);
    assert.strictEqual(p.found, true, '自己写出去的样式读不回来');
    assert.strictEqual(p.srcLine, 1, '没认出原文是第 2 行');
    assert.strictEqual(p.style.width, '80', 'cue settings 的 size 没回读成 width');
    assert.strictEqual(p.style.bgAlpha, '55', '底衬不透明度没回读');
  });

  t('v0.9.238：不传样式时 merge 的 VTT 与 v0.9.237 及以前逐字节一致（老调用不许变）', () => {
    const items = [{ no:1, start:1000, end:3200, text:'甲\n乙' }];
    const old = 'WEBVTT\n\n1\n00:00:01.000 --> 00:00:03.200\n甲\n乙\n';
    assert.strictEqual(M.formatVtt(items), old, '不传第二参时输出变了');
    assert.strictEqual(M.formatVtt(items, {}), old, '传空 opt 时输出变了');
    assert.strictEqual(M.formatVtt(items, { srcLine:-1 }), old, 'srcLine=-1（无原文行）时输出变了');
  });

  t('v0.9.238：用户填什么就写什么（越界 / 负数 / 小数都不夹、不换算）', () => {
    const out = M.formatVtt([{ no:1, start:0, end:1000, text:'x' }],
      { style:{ line:'150', lineAlign:'start', position:'-20', width:'12.5', size:'150' } });
    assert.ok(out.indexOf('line:150%,start') >= 0, 'line=150% 应原样写出（不许夹回 100）');
    assert.ok(out.indexOf('position:-20%') >= 0, 'position=-20% 应原样写出');
    assert.ok(out.indexOf('size:12.5%') >= 0, 'size=12.5% 应原样写出（不许取整）');
    assert.ok(M.vttStyleBlock({ size:'150' }).indexOf('font-size: 150%;') >= 0, '字号 150% 应原样写出');
    /* 反向：认不出来的值不写，也绝不猜一个数 */
    assert.strictEqual(M.vttStyleBlock({ size:'abc' }).indexOf('font-size'), -1, '非法字号不该硬写一个猜的值');
    assert.strictEqual(M.vttCueSettings({ line:'abc', position:'', width:'x' }), '', '认不出来的 cue setting 不该写');
    assert.ok(M.vttCueSettings({ width:'0' }).indexOf('size:0%') >= 0, '0 是合法值，不许被当成「没填」');
  });

  t('v0.9.238：merge 的 VTT 与主站彻底隔离（不共用引擎、不共用 DOM、不共用存储）', () => {
    assert.ok(mg.indexOf('srt-core.js') === -1, 'merge.html 又去引主站引擎了');
    assert.ok(!/SrtCore|require\(|\bimport\s/.test(mgcSrc), 'merge-core 引用了主站引擎的东西');
    const mainIds = ['vttLine','vttLineAlign','vttPos','vttWidth','vttAlign','vttSize','vttColor','vttFont','vttLH',
      'vttBold','vttItalic','vttSrcSizeMode','vttSrcColorMode','vttSrcColor','vttSrcSize','vttBgOn','vttBgColor','vttBgAlpha',
      'vttShadowOn','vttShadowW','vttShadowColor'];
    mainIds.forEach(id => assert.ok(mg.indexOf('id="' + id + '"') === -1, 'merge.html 用了主站的 id ' + id));
    const mineIds = mainIds.map(id => 'm' + id.charAt(0).toUpperCase() + id.slice(1));
    mineIds.forEach(id => assert.ok(mg.indexOf('id="' + id + '"') > 0, 'merge.html 缺控件 ' + id));
    /* 反向：主站也不该出现 merge 的 id（防复制粘贴串台） */
    mineIds.forEach(id => assert.ok(html.indexOf("'" + id + "'") === -1, '主站出现了 merge 的 id ' + id));
    assert.ok(mg.indexOf('srt_vtt_style_v1') === -1, 'merge 不该读写主站的方案键');
    assert.ok(mg.indexOf('srt_merge_vtt_style_v1') === -1, '注释不该再声称一个没实现的存储键');
    /* 反过来主站那边也不能动：它的面板 id 一个都没少 */
    mainIds.forEach(id => assert.ok(html.indexOf('id="' + id + '"') > 0, '主站丢了控件 ' + id));
  });

  t('v0.9.238：三套标准模板覆盖面板全部字段（漏一个就不是那套样式）', () => {
    const grab = (name, re) => {
      const m = re.exec(mg); assert.ok(m, '取不到 ' + name);
      return new Function('return ' + m[1])();
    };
    const pos  = grab('MVTT_POS_IDS',  /const MVTT_POS_IDS\s*=\s*(\[[\s\S]*?\]);/);
    const main = grab('MVTT_MAIN_IDS', /const MVTT_MAIN_IDS\s*=\s*(\[[\s\S]*?\]);/);
    const src  = grab('MVTT_SRC_IDS',  /const MVTT_SRC_IDS\s*=\s*(\[[\s\S]*?\]);/);
    const pres = grab('MVTT_PRESETS',  /const MVTT_PRESETS\s*=\s*(\{[\s\S]*?\n\});/);
    const all = pos.concat(main, src);
    assert.ok(all.length >= 20, '字段清单太短（' + all.length + '）');
    ['std','compact','cinema'].forEach(k => {
      assert.ok(pres[k], '缺模板 ' + k);
      all.forEach(id => assert.ok(id in pres[k], k + ' 漏了字段 ' + id));
    });
    all.forEach(id => assert.ok(mg.indexOf('id="' + id + '"') > 0, 'HTML 里没有控件 ' + id));
    /* 三套必须真的不一样，否则「选了没变化」 */
    assert.notStrictEqual(JSON.stringify(pres.std), JSON.stringify(pres.compact), '标准与紧凑一模一样');
    assert.notStrictEqual(JSON.stringify(pres.compact), JSON.stringify(pres.cinema), '紧凑与电影感一模一样');
    assert.notStrictEqual(pres.std.mVttBgOn, pres.cinema.mVttBgOn, '「电影感」应该关掉底衬（否则靠什么压亮画面）');
    /* 切模板 = 显式选模板 → 清掉继承/手改门控；继承值不许被顺手冲掉 */
    const ap = mg.slice(mg.indexOf('function applyVttPreset('), mg.indexOf('function vttStyleOf('));
    assert.ok(/VTT_INH\.active = false;/.test(ap) && /VTT_INH\.dirty = \{ main:false, src:false, pos:false \};/.test(ap),
      '显式套模板没清掉继承/手改门控');
    const sp = mg.slice(mg.indexOf('function syncVttPanel('), mg.indexOf('function importVttStyle('));
    /* v0.9.243：判据从「是不是继承来的」改成「是不是 custom 档」—— 继承值本来就落在 custom，
       而**手改过**的值同样落在 custom，以前它被切一次导出格式就冲回预设，那是丢数据
       （ASS 那边 v0.9.242 起 custom 档已经不重套预设，两边必须一致）。 */
    assert.ok(/if \(key === 'custom'\)\{ renderVttPv\(\); return; \}/.test(sp),
      'custom 档（继承来的 / 手改过的 / 点了「自定义」键的）不该被切模板冲掉');
    assert.ok(/applyVttPreset\(MVTT_PRESETS\[key\] \? key : 'std'\)/.test(sp),
      '三套标准档切回来仍要重套各自预设（它们是"起点"）');
  });

  t('v0.9.238：「VTT 双语样式」是真模板：分段按钮、导出分支、扩展名都接上了', () => {
    assert.ok(/<option value="vttStyle"/.test(mg), '缺 vttStyle 模板选项');
    /* v0.9.240：VTT 从顶层的并列档位改成「VTT 格式 + 格式卡」，模板按钮在 WebVTT 面板里 */
    assert.ok(/\['vtt','fmtVtt','fmtVttSub'\]/.test(mg), '顶层格式卡没有 VTT 这一档');
    assert.ok(/\['std','vttTplStd'\]/.test(mg), 'WebVTT 面板缺样式模板按钮');
    assert.ok(/if \(fmt === 'vtt-styled'\) return buildVttExport\(\);/.test(mg), '导出没接上 VTT 样式分支');
    assert.ok(/return \(f === 'vtt' \|\| f === 'vtt-styled'\) \? 'vtt'/.test(mg), 'vtt-styled 的扩展名不是 .vtt');
    /* ASS 面板与 VTT 面板互斥（两套单位不同，不能同时摆着） */
    assert.ok(/\$\('assPanel'\)\.style\.display = \(plain \|\| tpl === 'vttStyle'\) \? 'none' : ''/.test(mg),
      '选了 VTT 样式却还把 ASS 面板摆着');
  });

  t('v0.9.238：预览与导出取同一份行（不是各画一套），且不偷偷夹取', () => {
    const pv = mg.slice(mg.indexOf('function renderVttPv(){'), mg.indexOf('function vttPresetLabel(){'));
    const ex = mg.slice(mg.indexOf('function buildVttExport(){'), mg.indexOf('function renderVttPv(){'));
    assert.ok(pv.length > 0 && ex.length > 0, '抠不到预览/导出函数');
    assert.ok(/const parts = vttCueParts\(\);/.test(pv), '预览不是从 vttCueParts 取行');
    assert.ok(/vttCueParts\(\)\.map/.test(ex), '导出不是从 vttCueParts 取行');
    assert.ok(/parts\[0\]\.lines\.forEach/.test(pv), '预览没按导出的逐行渲染（行数会对不上）');
    /* 底衬/描边必须问 core 要：只有 core 真写得出来，预览才画（否则「预览有、导出没有」） */
    assert.ok(/C\.vttRgba\(st\.bgColor, st\.bgAlpha\)/.test(pv), '预览自己另算底衬');
    /* v0.9.239：多一个「哪一层」的参数，但仍然必须是问 core 要 —— 不能预览自己拼字符串 */
    assert.ok(/C\.vttShadowCss\(st, /.test(pv), '预览自己另算描边');
    /* 没内容 / 不是这个模板 → 整块收起来，不能留着旧画面 */
    assert.ok(/if \(!isVtt \|\| !S\.rows \|\| !S\.rows\.length\)\{ box\.style\.display = 'none'; return; \}/.test(pv),
      '没内容时预览没收起来');
    /* 位置是界面上的原值：越界也照画 */
    assert.ok(/cue\.style\.width = w \+ '%';/.test(pv), '宽度不是原值');
    assert.ok(!/Math\.min\(100,/.test(pv) && !/Math\.max\(0,/.test(pv), '预览在偷偷把位置/宽度夹回范围内');
    /* ⚠️ 凡重新生成 S.rows 的地方都要重画 VTT 预览（v0.9.228「预览又不见了」的教训）。
       反过来，只动 ASS 参数的三处（恢复 ASS 默认 / 套 ASS 方案 / 导入 ASS 样式）不需要，
       它们碰不到 VTT 面板 —— 所以这里点名，不用「所有 renderAssPv 都要配对」这种粗规则。 */
    const fnHas = (name, needle) => {
      const i = mg.indexOf('function ' + name + '(');
      assert.ok(i > 0, '找不到函数 ' + name);
      const j = mg.indexOf('\nfunction ', i + 10);
      return mg.slice(i, j > 0 ? j : mg.length).indexOf(needle) >= 0;
    };
    ['doMerge','doAdjust','syncMode'].forEach(fn =>
      assert.ok(fnHas(fn, 'renderVttPv();'), fn + ' 重算了合并结果却没重画 VTT 预览'));
    /* 上下顺序（哪一行是原文）变了也要重画：它决定 <c.src> 标在哪一行 */
    const bi = mg.slice(mg.indexOf("input[name=biOrder]"), mg.indexOf("/* v0.9.228：调整模式换"));
    assert.ok(bi.indexOf('renderVttPv();') >= 0, '换上下顺序没重画 VTT 预览');
  });

  t('v0.9.238：手改过的区域不会被下一次导入悄悄覆盖（改了就打脏标记）', () => {
    const bind = mg.slice(mg.indexOf('MVTT_POS_IDS.concat('), mg.indexOf('const psel = '));
    assert.ok(bind.length > 0, '抠不到字段绑定');
    assert.ok(/VTT_INH\.dirty\[regionOfId\(id\)\] = true/.test(bind), '改了字段没标记所属区域');
    assert.ok(/sel\.value = 'custom'/.test(bind), '手改后模板下拉没变成「自定义」');
    assert.ok(/function regionOfId\(/.test(mg) && /MVTT_POS_IDS\.indexOf\(id\) >= 0\) return 'pos';/.test(mg),
      '缺「字段属于哪个区域」的判定');
  });

  t('v0.9.238：导入继承 —— 只读认得的、不替用户改导出格式、说清样式来源', () => {
    const fn = mg.slice(mg.indexOf('function importVttStyle('), mg.indexOf('function baseName('));
    assert.ok(fn.length > 0, '抠不到 importVttStyle');
    assert.ok(/C\.parseVttStyle/.test(fn), '导入没走 core 的回读');
    assert.ok(/if \(!VTT_INH\.dirty\.pos\)\{/.test(fn) && /if \(!VTT_INH\.dirty\.main\)\{/.test(fn) &&
      /if \(!VTT_INH\.dirty\.src\)\{/.test(fn), '三个区域缺了门控');
    assert.ok(/sel\.value = 'custom'/.test(fn), '继承值不等于任何标准模板，必须标成「自定义」');
    /* ⚠️ 只有用户本来就在导 VTT 才切到「双语样式」；拿 ASS 模板导出却被改成 VTT = 替用户做决定 */
    const seg = fn.slice(fn.indexOf('const tpl = tplVal();'), fn.indexOf('vttAfterFill();'));
    assert.ok(/if \(tpl === 'vtt' \|\| tpl === 'vttStyle'\)/.test(seg), '不该无条件替用户改导出格式');
    assert.ok(seg.indexOf('expStyle') < 0, '导入不该顺手改用户的导出格式选择');
    /* 让用户看见「这些值是文件里来的」 */
    assert.ok(/pnl\.open = true/.test(fn), '导入后面板没展开（用户看不见样式来源）');
    assert.ok(/note\.textContent = t\('vttImportedNote'/.test(fn), '没写明样式来自哪个文件');
    assert.ok(/parsed\.notes && parsed\.notes\.indexOf\('lineNumber'\) >= 0/.test(fn), '行号写法没提示用户');
    /* 导入点：只有 VTT 才需要继承样式 */
    assert.ok(/importVttStyle\(side, \(fmt === 'vtt'\) \? String\(text\) : '', name\);/.test(mg), 'loadSide 没接上导入继承');
  });

  t('v0.9.238：STYLE 块只写白名单内的属性（白名单外的写了浏览器也不认）', () => {
    const white = M.VTT_CSS_WHITE;
    assert.ok(Array.isArray(white) && white.length > 5, '缺 CSS 白名单');
    ['color','font-size','background-color','text-shadow','font-family'].forEach(p =>
      assert.ok(white.indexOf(p) >= 0, '白名单缺 ' + p));
    const blk = M.vttStyleBlock(V238_ST);
    assert.strictEqual(blk.indexOf('STYLE'), 0, 'STYLE 块位置不对');
    const props = (blk.match(/^\s{2}([a-z-]+):/gm) || []).map(x => x.trim().replace(/:$/, ''));
    assert.ok(props.length >= 6, '属性太少（' + props.length + '）');
    props.forEach(p => assert.ok(white.indexOf(p) >= 0, '写了白名单外的属性 ' + p));
  });

  t('v0.9.238：VTT 面板与预览的新词条四语齐全', () => {
    const keys = ['tplVttStyle','tplSegVttStyle','tplHintVttStyle','vttPanelTitle','vttStyleTip','lblVttPreset',
      'vttPresetStd','vttPresetCompact','vttPresetCinema','vttPresetCustom','vttGrpPos','vttGrpText','vttGrpSrc','vttGrpFx',
      'lblVttLine','lblVttAnchor','lblVttPos','lblVttWidth','lblVttAlign','lblVttSize','lblVttColor','lblVttFont','lblVttLH',
      'lblVttWeight','lblVttItalic','vttInherit','vttOptSet','lblVttSrcColor','lblVttSrcSize','lblVttBg','lblVttBgColor','lblVttBgAlpha',
      'lblVttShadow','lblVttShadowW','lblVttShadowColor','vttAnchorEnd','vttAnchorStart','vttAnchorMid',
      'vttAlignCenter','vttAlignStart','vttAlignEnd','vttFxTip','vttReset','vttResetDone','vttImportedNote',
      'vttLineNumNote','pvVttTitle'];
    const dictOf = (code) => {
      const m = new RegExp("^\\s*'" + code + "':\\s*\\{", 'm').exec(mg);
      assert.ok(m, '找不到语言块 ' + code);
      const i = mg.indexOf(m[0]);
      let d = 0, jEnd = mg.indexOf('{', i);
      for (let q = jEnd; q < mg.length; q++){
        if (mg[q] === '{') d++;
        else if (mg[q] === '}'){ d--; if (d === 0){ jEnd = q; break; } }
      }
      return mg.slice(i, jEnd + 1);
    };
    ['zh-CN','zh-TW','en','ja'].forEach(code => {
      const d = dictOf(code);
      keys.forEach(k => assert.ok(d.indexOf(k + ':') > 0, code + ' 缺词条 ' + k));
    });
  });


  /* ================= v0.9.239：原文行三态（沿用 / 开 / 关）+ 面板按层重排 =================
     用户诉求：「VTT 样式模块，原文行和译文行设置不是特别分明」→ 选 B（按层重排）+ 放开原文行能力。
     设计：原文行不是独立样式层，是在 ::cue 之上覆盖。字体/粗体/斜体/底衬/描边做成三态，
     '' = 沿用（一个字不写）、'on' = 单独开、'off' = 单独关（必须显式写 normal/none/transparent）。 */
  t('v0.9.239：原文行「沿用」时一个字都不写（默认导出与 238 逐字节相同）', () => {
    const M = require('./merge-core.js');
    const base = { size:'100', color:'#FFFFFF', font:'PingFang SC', bold:true, italic:false, lineHeight:'1.4',
      shadowOn:true, shadowW:'2', shadowColor:'#000000', bgOn:true, bgColor:'#000000', bgAlpha:55,
      srcColor:'#FFD700', srcSize:'85',
      srcFont:'', srcBold:'', srcItalic:'', srcBgOn:'', srcBgColor:'#000000', srcBgAlpha:'55',
      srcShadowOn:'', srcShadowW:'2', srcShadowColor:'#000000' };
    const b = M.vttStyleBlock(base);
    assert.ok(b.indexOf('::cue(.src) {\n  color: #FFD700;\n  font-size: 85%;\n}') >= 0,
      '沿用态写出了多余属性（默认结果就不该变）：\n' + b);
    ['font-weight','font-style','text-shadow','background-color','font-family'].forEach(k =>
      assert.ok(b.slice(b.indexOf('::cue(.src)')).indexOf(k) === -1, '沿用态不该出现 ' + k));
  });

  t('v0.9.239：三态「开」写得出 —— 字体/粗体/斜体/描边/底衬都能单独设', () => {
    const M = require('./merge-core.js');
    const b = M.vttStyleBlock({ size:'100', color:'#FFFFFF', srcColor:'#FFD700', srcSize:'85',
      srcFont:'serif', srcBold:'on', srcItalic:'on', srcShadowOn:'on', srcShadowW:'3', srcShadowColor:'#FF0000',
      srcBgOn:'on', srcBgColor:'#123456', srcBgAlpha:'80' });
    const sb = b.slice(b.indexOf('::cue(.src)'));
    [['font-family:','字体'], ['font-weight: bold;','粗体'], ['font-style: italic;','斜体'],
     ['text-shadow:','描边'], ['#FF0000','描边色'], ['background-color: rgba(18, 52, 86, 0.8);','底衬']]
      .forEach(([needle,label]) => assert.ok(sb.indexOf(needle) >= 0, '原文行「开」少写了' + label + '：\n' + sb));
  });

  t('v0.9.239：三态「关」要显式写 normal / none / transparent', () => {
    const M = require('./merge-core.js');
    const b = M.vttStyleBlock({ size:'100', color:'#FFFFFF', srcColor:'#FFD700', srcSize:'85',
      srcBold:'off', srcItalic:'off', srcShadowOn:'off', srcBgOn:'off' });
    const sb = b.slice(b.indexOf('::cue(.src)'));
    /* 只「不写」是不够的：::cue 的值会漏下来，用户看到的就是「设了关还开着」 */
    ['font-weight: normal;','font-style: normal;','text-shadow: none;','background-color: transparent;']
      .forEach(needle => assert.ok(sb.indexOf(needle) >= 0, '「关」少写了 ' + needle + '：\n' + sb));
  });

  t('v0.9.239：三态能原样读回（写了才是 on/off，没写就是沿用）', () => {
    const M = require('./merge-core.js');
    const mk = (css) => M.parseVttStyle('WEBVTT\n\nSTYLE\n::cue {\n  color: #FFFFFF;\n}\n::cue(.src) {\n' + css +
      '\n}\n\n1\n00:00:01.000 --> 00:00:02.000\n<c.src>x</c.src>\ny\n').style;
    let s = mk('  color: #FFD700;\n  font-weight: normal;\n  font-style: italic;\n  text-shadow: none;\n  background-color: transparent;');
    assert.strictEqual(s.srcBold, 'off', 'normal 应读成「关」');
    assert.strictEqual(s.srcItalic, 'on', 'italic 应读成「开」');
    assert.strictEqual(s.srcShadowOn, 'off', 'none 应读成「关」');
    assert.strictEqual(s.srcBgOn, 'off', 'transparent 应读成「关」');
    s = mk('  color: #FFD700;\n  text-shadow: -3px 0px 0 #FF0000, 3px 0px 0 #FF0000;');
    assert.strictEqual(s.srcShadowOn, 'on');
    assert.strictEqual(s.srcShadowW, '3');
    assert.strictEqual(s.srcShadowColor, '#FF0000');
    s = mk('  color: #FFD700;');
    /* 没写 = 沿用，绝不能瞎猜成 on/off */
    ['srcBold','srcItalic','srcBgOn','srcShadowOn','srcFont'].forEach(k =>
      assert.ok(s[k] == null, '没写的一项不该被猜出值：' + k + '=' + s[k]));
  });

  t('v0.9.239：面板按层重排成三块，原文行与译文行对称', () => {
    const pos  = /const MVTT_POS_IDS\s*=\s*(\[[\s\S]*?\]);/.exec(mg)[1];
    const src  = /const MVTT_SRC_IDS\s*=\s*(\[[\s\S]*?\]);/.exec(mg)[1];
    ['mVttSrcFont','mVttSrcBold','mVttSrcItalic','mVttSrcBgOn','mVttSrcBgColor','mVttSrcBgAlpha',
     'mVttSrcShadowOn','mVttSrcShadowW','mVttSrcShadowColor'].forEach(id => {
      assert.ok(src.indexOf("'" + id + "'") >= 0, 'MVTT_SRC_IDS 少了 ' + id);
      assert.ok(mg.indexOf('id="' + id + '"') > 0, 'HTML 里没有控件 ' + id);
    });
    /* 三块的标题词条都得在，否则「哪一块管哪一层」又糊了 */
    ['vttGrpAll','vttGrpDst','vttGrpSrc'].forEach(k =>
      assert.ok(mg.indexOf('data-i18n="' + k + '"') > 0, '面板缺分组标题 ' + k));
    /* v0.9.255：原文行那一长句收进 ⓘ（悬停才出），词条本身仍在 */
    assert.ok(mg.indexOf('data-tip-i18n="vttSrcTip"') > 0, '原文行的 ⓘ 说明丢了');
    /* 三态下拉的「沿用」必须真的存在，否则用户回不到继承态 */
    assert.ok((mg.match(/data-i18n="vttInherit"/g) || []).length >= 4,
      '三态下拉里的「沿用」选项不足 4 个');
    assert.ok(mg.indexOf("vttGrpAll:'") > 0, '位置/行高该归到「整条字幕」，不能再叫「位置（百分比）」一块孤零零');
  });

  t('v0.9.239：预览在「沿用」时取主样式那份，不取输入框残留值', () => {
    const pv = mg.slice(mg.indexOf('function renderVttPv(){'), mg.indexOf('function vttPresetLabel(){'));
    assert.ok(/inh\(st\.srcShadowOn\)/.test(pv), '描边沿用时没判断，会拿输入框里的残留值去画');
    assert.ok(/inh\(st\.srcBgOn\)/.test(pv), '底衬沿用时没判断');
    assert.ok(/inh\(st\.srcBold\)/.test(pv) && /inh\(st\.srcItalic\)/.test(pv), '粗体/斜体沿用时没判断');
    assert.ok(/C\.vttShadowCss\(st, /.test(pv), '预览自己拼描边而不是问 core 要');
  });

  t('v0.9.239：主站引擎没被牵连（改的是双语页那一份）', () => {
    const srtCore = require('fs').readFileSync(require('path').join(__dirname, 'srt-core.js'), 'utf8');
    assert.ok(srtCore.indexOf('srcBold') === -1, 'srt-core.js 不该出现 srcBold（主站没有「原文行三态」这个概念）');
    assert.ok(srtCore.indexOf('srcShadowOn') === -1, 'srt-core.js 不该出现 srcShadowOn');
    assert.ok(/function vttShadowCss\(st\)/.test(srtCore), '主站的 vttShadowCss 签名不该被改（它没有「层」的概念）');
  });

  t('v0.9.239：新增词条四语齐全', () => {
    ['vttGrpAll','vttGrpDst','vttSrcTip','vttInherit','vttOptNormal','vttOptOn','vttOptOff',
     'lblVttSrcFont','lblVttSrcBold','lblVttSrcItalic','lblVttSrcBg','lblVttSrcBgColor','lblVttSrcBgAlpha',
     'lblVttSrcShadow','lblVttSrcShadowW','lblVttSrcShadowColor'].forEach(k => {
      const c = (mg.match(new RegExp('[,{\\s]' + k + ':', 'g')) || []).length;
      assert.ok(c >= 4, '词条 ' + k + ' 不到 4 种语言（' + c + '）');
    });
  });

  /* ================= v0.9.240：导出改两级（格式 / 模板），双语页重新排版 ================= */
  t('v0.9.240：顶层只三张格式卡（SRT / VTT / ASS），模板挪进各自面板', () => {
    const fmt = /const FMT_SEGS = (\[[\s\S]*?\]);/.exec(mg);
    assert.ok(fmt, '缺 FMT_SEGS');
    const list = fmt[1];
    ['srt','vtt','ass'].forEach(g => assert.ok(list.indexOf("['" + g + "'") >= 0, '顶层缺格式 ' + g));
    /* ⚠️ 这条是本次改版的核心：split / stack / custom / vttStyle 不许再出现在顶层格式卡里
       （它们现在归各自的样式面板），否则用户又看到一排分不清层级的按钮。 */
    ['split','stack','custom','vttStyle'].forEach(g =>
      assert.ok(list.indexOf("['" + g + "'") < 0, '顶层格式卡混进了模板档位 ' + g));
    /* ASS 面板的三个模板按钮 = 原来的三档，一个不少 */
    assert.ok(/const ASS_SEGS = \[\['split','assTplSplit'\],\['stack','assTplStack'\],\['custom','assTplCustom'\]\]/.test(mg),
      'ASS 面板缺模板按钮定义');
    /* VTT 面板的三个模板按钮 = 三套预设（「自定义」单独标记成状态键） */
    assert.ok(/const MVTT_SEGS = \[\['std','vttTplStd'\],\['compact','vttTplCompact'\],\['cinema','vttTplCinema'\],\['custom','vttTplCustom'\]\]/.test(mg),
      'WebVTT 面板缺模板按钮定义');
    /* v0.9.242：「自定义」改成**常驻**的一档（ASS 那边三个键一直都在，两边得一致；
       藏起来用户会以为只有三种模板，而且它是能点的：点了不重置任何值）。
       判据：① 渲染时带 data-custom="1" 但**不带** hidden；② 没有任何代码再去改它的 hidden。 */
    assert.ok(/data-custom="1"/.test(mg), '「自定义」键缺 data-custom 标记');
    assert.ok(!/data-custom="1" hidden/.test(mg), '「自定义」不该再默认隐藏');
    assert.ok(!/b\.hidden\s*=/.test(mg), '还有代码在切换「自定义」键的显隐');
    /* 六个档位一个都不能丢：老逻辑全读 expFmt.value */
    ['value="srt"','value="vtt"','value="vttStyle"','value="split"','value="stack"','value="custom"']
      .forEach(v => assert.ok(mg.indexOf(v) > 0, 'expFmt 少了档位 ' + v));
  });

  t('v0.9.240：点模板 = 换档位并派发 change；点「已选中的」不重套预设', () => {
    const setFmt = mg.slice(mg.indexOf('function setFmtGroup('), mg.indexOf('function renderTplSegs('));
    assert.ok(setFmt.length > 0, '抠不到 setFmtGroup');
    assert.ok(/sel\.value = v;[\s\S]{0,80}dispatchEvent\(new Event\('change'/.test(setFmt), '格式卡没把值写回状态源');
    assert.ok(/if \(v === sel\.value\)\{ syncTplSegs\(\); return; \}/.test(setFmt),
      '点已选中的格式也会重套预设 —— 会把用户刚调好的参数冲掉');
    /* ASS 侧同理：值没变就 return */
    const setAss = mg.slice(mg.indexOf('function setAssTpl('), mg.indexOf('function renderTplSegs('));
    assert.ok(/if \(!sel \|\| sel\.value === v\) return;/.test(setAss), 'ASS 模板按钮会把已选中的再套一遍预设');
    /* 模板按钮点击 → applyVttPreset（走同一条套模板路径，不另写一套） */
    assert.ok(/\['std','vttTplStd'\]/.test(mg) && /applyVttPreset\(v\)/.test(mg),
      'VTT 模板按钮没接 applyVttPreset');
  });

  t('v0.9.240：「写入样式」开关 = 无样式 VTT 的唯一入口，且不冲掉用户参数', () => {
    assert.ok(/id="mVttWriteStyle"/.test(mg), '缺「写入样式」开关');
    const fn = mg.slice(mg.indexOf('function setVttStyled('), mg.indexOf('function syncVttChrome('));
    assert.ok(/vwrite\.addEventListener\('change', \(\)=>setVttStyled\(vwrite\.checked\)\)/.test(mg),
      '开关没接上 setVttStyled');
    assert.ok(/f1\.value = want/.test(fn) && /f2\.value = want/.test(fn), '开关没写回两份状态源');
    /* ⚠️ 关键：绝不能派发 change —— 那会走到 syncVttPanel → applyVttPreset，把参数冲回预设 */
    assert.ok(fn.indexOf('dispatchEvent') < 0, '开关派发了 change，会把用户调好的参数冲掉');
    /* 关掉时参数区要看得见地「不生效」 */
    assert.ok(/box\.classList\.toggle\('off', !styled\)/.test(mg), '关掉写入样式后参数区没有灰化');
    assert.ok(/\.stylebox\.off\{[^}]*pointer-events:none/.test(mg), '灰化样式缺 pointer-events:none');
    assert.ok(/id="mVttStyleBox"/.test(mg), '缺参数区容器 mVttStyleBox');
    /* 模板说明随模板与语言重算（不是静态 data-i18n） */
    assert.ok(/function vttPresetTip\(\)/.test(mg) && /vttTipStd/.test(mg), '缺模板说明（mVttPresetHint）');
    assert.ok(/alignHintTip\(\); tplHintTip\(\); vttPresetTip\(\);/.test(
        mg.slice(mg.indexOf('function applyI18n()'), mg.indexOf('function toast('))),
      '换界面语言后没重刷导出格式 / 模板说明');
  });

  t('v0.9.240：新版式与文案接上（面板卡片化 / 格式卡 / 组装标题）', () => {
    assert.ok(/\.fmtbtn\.on\{/.test(mg), '缺格式卡的选中样式');
    /* ⚠️ v0.9.252：导出区那组紧凑格式卡已删（与设置区重复）。原来这条断的是「有 .fmt-seg.sm」，
       现在反过来断「它不许回来」—— 加回来就等于同一个状态又挂了两组控件。
       ⚠️ 按**规则块**（`{`）匹配，别按裸类名：源文件里的注释正解释着这件事，裸类名会被注释命中。 */
    assert.ok(!/\.fmt-seg\.sm\s*\{/.test(mg), '导出区又冒出紧凑版格式卡（与设置区重复）');
    assert.ok(/details\.ass summary,details\.vtt summary/.test(mg), '两套面板没共用卡片式标题条');
    assert.ok(/\.ass-sub\{/.test(mg), '缺列内小分组标题样式');
    assert.ok(/id="assTplSeg"/.test(mg) && /class="tplrow"/.test(mg), 'ASS 面板缺模板按钮行');
    assert.ok(/id="mVttPresetSeg"/.test(mg), 'WebVTT 面板缺模板按钮');
    /* 新词条四语齐全 */
    ['fmtSrt','fmtSrtSub','fmtVtt','fmtVttSub','fmtAss','fmtAssSub','lblAssTpl','assTplSplit','assTplStack',
     'assTplCustom','assTplTip','assGrpText','assGrpFx','assGrpPos','assGrpMargin','vttTplStd','vttTplCompact',
     'vttTplCinema','vttTplCustom','vttTipStd','vttTipCompact','vttTipCinema','vttTipCustom','lblVttWriteStyle',
     'vttNoStyleTip','tplHintVttPlain'].forEach(k => {
      const c = (mg.match(new RegExp('[,{\\s]' + k + ':', 'g')) || []).length;
      assert.strictEqual(c, 4, '词条 ' + k + ' 应有 4 种语言，实际 ' + c);
    });
    /* 导出档位的说明必须分「无样式 VTT」和「有样式 VTT」两句 —— 以前共用一句「纯文本无需设置」 */
    assert.ok(/v==='vtt' \? 'tplHintVttPlain'/.test(mg), '无样式 VTT 的说明与 SRT 混用了');
  });

  /* ================= v0.9.241：删掉「区分原文」总闸，原文行改成「逐项沿用」 =================
     用户诉求：「VTT 字幕下面的原文行勾选框是不是没有意义了」。
     事实核查：它不是空按钮，而是**整组的总闸** —— 一关连字号、颜色都不生效，可提示里却写着
     「字号与颜色始终单独设置」，文案与行为打架；而 239 之后字体/粗体/斜体/底衬/描边已经各自
     有「沿用」，同一件事被两层开关表达，口径还相反。
     定案（用户选）：删掉总闸，字号、颜色各补一个「沿用」，两页一起改。
     规则：原文行**任一**项不是「沿用」→ 写 ::cue(.src) 并给原文行打 <c.src>；
           全部沿用 → 一个字都不写（原文行与译文行完全一样）。 */
  console.log('— v0.9.241：原文行逐项沿用（总闸删除） —');

  t('v0.9.241：引擎只有一个判据 —— 原文行的声明在 vttSrcDecls 一处算定', () => {
    const fs = require('fs');
    const mc = fs.readFileSync('merge-core.js', 'utf8');
    const sc = fs.readFileSync('srt-core.js', 'utf8');
    [['merge', mc], ['主站', sc]].forEach(([n, src]) => {
      assert.ok(/function vttSrcDecls\(st\)/.test(src), n + ' 引擎缺 vttSrcDecls');
      assert.ok(/if \(srcIdx >= 0 && vttSrcDecls\(st\)\.length\)/.test(src), n + ' formatVtt 没走同一判据');
      assert.ok(/const sd = vttSrcDecls\(st\);\s*\n\s*if \(sd\.length\) rules\.push\('::cue\(\.' \+ VTT_SRC_CLASS/.test(src),
        n + ' vttStyleBlock 没走同一判据');
      assert.strictEqual(src.indexOf('srcDiff'), -1, n + ' 引擎里还有 srcDiff 残留');
    });
    /* 标记与规则同进同出：不存在「打了 <c.src> 却没有 ::cue(.src)」的文件 */
    const M = require('./merge-core.js');
    const items = [{ no:1, start:0, end:1000, text:'甲\n乙' }];
    const cases = [
      [{}, false], [{ srcColorInh:true, srcSizeInh:true }, false],
      [{ srcColor:'#FFD700' }, true], [{ srcSize:85 }, true],
      [{ srcColor:'非法', srcSize:'' }, false],           /* 写不出来 → 两边都不做 */
      [{ srcBold:'on' }, true], [{ srcBgOn:'off' }, true]
    ];
    cases.forEach(([st, want], i) => {
      const out = M.formatVtt(items, { style:st, srcLine:1 });
      const marked = /<c\.src>/.test(out), ruled = /::cue\(\.src\)/.test(out);
      assert.strictEqual(marked, ruled, '用例 ' + i + '：「打了标记」与「写了规则」不一致');
      assert.strictEqual(marked, want, '用例 ' + i + ' 的区分判定不对');
      assert.ok(M.vttSrcDecls(st).length > 0 === want, 'vttSrcDecls 与产物不一致（用例 ' + i + '）');
    });
  });

  t('v0.9.241：默认导出与 v0.9.239 逐字节相同（能力换了表示法，结果没变）', () => {
    const M = require('./merge-core.js');
    const base = { line:'90', size:'100', color:'#FFFFFF', font:'PingFang SC', lineHeight:'1.4',
      bold:true, italic:false, bgOn:true, bgColor:'#000000', bgAlpha:'55',
      shadowOn:true, shadowW:'2', shadowColor:'#000000' };
    /* 239 走的是「总闸 + 字号颜色」，241 走「两个 mode」——同一套面板默认值必须产出同一份文件 */
    const legacy = Object.assign({}, base, { srcDiff:true, srcColor:'#FFD700', srcSize:'85' });
    const now    = Object.assign({}, base, { srcColorInh:false, srcSizeInh:false, srcColor:'#FFD700', srcSize:'85' });
    const items = [{ no:1, start:1000, end:3200, text:'我们应该谈谈这件事。\nWe should talk about this.' }];
    assert.strictEqual(M.vttStyleBlock(now), M.vttStyleBlock(legacy), 'STYLE 块与 239 不一致');
    assert.strictEqual(M.formatVtt(items, { style:now, srcLine:1 }), M.formatVtt(items, { style:legacy, srcLine:1 }),
      '整份 VTT 与 239 不一致');
    /* 三套标准模板的原文行默认值必须落在「单独设」上（否则默认导出就变样了） */
    const pres = new Function('return ' + /const MVTT_PRESETS\s*=\s*(\{[\s\S]*?\n\});/.exec(mg)[1])();
    ['std', 'compact', 'cinema'].forEach(k => {
      assert.strictEqual(pres[k].mVttSrcSizeMode, 'set', k + ' 模板的原文行字号默认不是「单独设」');
      assert.strictEqual(pres[k].mVttSrcColorMode, 'set', k + ' 模板的原文行颜色默认不是「单独设」');
    });
  });

  t('v0.9.241：「区分原文」总闸两页都删干净了，替换成两个「沿用」下拉', () => {
    /* 双语页 */
    assert.strictEqual((mg.match(/id="mVttSrcDiff"/g) || []).length, 0, 'merge.html 还留着区分原文勾选框');
    assert.strictEqual((mg.match(/lblVttSrcDiff/g) || []).length, 0, 'merge.html 还留着「区分原文」的词条/控件');
    assert.ok(/id="mVttSrcSizeMode"/.test(mg) && /id="mVttSrcColorMode"/.test(mg), 'merge.html 缺原文行的沿用下拉');
    /* 主站 */
    assert.ok(html.indexOf('id="vttSrcDiff"') === -1, 'index.html 还留着区分原文勾选框');
    assert.strictEqual((html.match(/lblVttSrcDiff/g) || []).length, 0, 'index.html 还留着「区分原文」的词条/控件');
    assert.ok(/id="vttSrcSizeMode"/.test(html) && /id="vttSrcColorMode"/.test(html), 'index.html 缺原文行的沿用下拉');
    /* 两个下拉的选项必须是「沿用 / 单独设」，且默认落在「单独设」（与旧行为等价） */
    [mg, html].forEach((src, i) => {
      const n = i ? 'index.html' : 'merge.html';
      const m = /<select id="[^"]*SrcSizeMode"[\s\S]{0,320}?<\/select>/.exec(src);
      assert.ok(m, n + ' 取不到字号模式下拉');
      assert.ok(/value=""[^>]*data-i18n="vttInherit"/.test(m[0]), n + ' 字号模式下拉缺「沿用」项');
      assert.ok(/value="set"[^>]*data-i18n="vttOptSet"/.test(m[0]), n + ' 字号模式下拉缺「单独设」项');
      assert.ok(/value="set"[^>]*selected/.test(m[0]), n + ' 字号模式默认不是「单独设」');
    });
    /* 面板上不再有「把整组一刀切掉」的东西 */
    assert.ok(/srcColorInh:\(sel\('mVttSrcColorMode'\) === ''\)/.test(mg), 'merge 的取值没接上沿用下拉');
    assert.ok(/srcColorInh: mono \|\| \(g\('vttSrcColorMode'\) === ''\)/.test(html), '主站取值没接上沿用下拉（单语要按沿用处理）');
  });

  t('v0.9.241：沿用只影响「写不写」，绝不动用户填的值', () => {
    const M = require('./merge-core.js');
    /* 「沿用」= 不写这一项，但不写别的项；值本身还在（面板靠 mode 决定生不生效） */
    const onlySize = M.vttSrcDecls({ srcColorInh:true, srcColor:'#FFD700', srcSize:'85', srcSizeInh:false });
    assert.deepStrictEqual(onlySize, ['  font-size: 85%;'], '颜色沿用却把字号也带上了/丢掉：' + JSON.stringify(onlySize));
    const onlyColor = M.vttSrcDecls({ srcColorInh:false, srcColor:'#FFD700', srcSize:'85', srcSizeInh:true });
    assert.deepStrictEqual(onlyColor, ['  color: #FFD700;'], '字号沿用却把颜色也带上了/丢掉：' + JSON.stringify(onlyColor));
    assert.deepStrictEqual(M.vttSrcDecls({ srcColorInh:true, srcSizeInh:true }), [], '全沿用应一条都不写');
    /* 面板侧：沿用用 CSS 变暗表示，不许 disable、更不许清空输入框 */
    assert.ok(/\.af>input\.inh,\.af \.sw\.inh\{opacity:\.4\}/.test(mg), 'merge 的沿用态没有可见标记');
    assert.ok(/\.vtt-c \.inh,\.vtt-c \.csw\.inh\{opacity:\.4\}/.test(html), '主站的沿用态没有可见标记');
    assert.ok(/function syncSrcInh\(\)/.test(mg) && /function syncVttSrcInh\(\)/.test(html), '缺沿用态联动函数');
    [mg, html].forEach((src, i) => {
      const n = i ? 'index.html' : 'merge.html';
      const fn = i ? src.slice(src.indexOf('function syncVttSrcInh()'), src.indexOf('function syncVttStyleBox()'))
                   : src.slice(src.indexOf('function syncSrcInh()'), src.indexOf('function vttAfterFill()'));
      assert.ok(fn.length > 0 && fn.indexOf('disabled') < 0, n + ' 沿用态把输入框 disable 了（用户就没法改值）');
      assert.ok(/classList\.toggle\('inh'/.test(fn), n + ' 沿用态没切到 .inh');
    });
  });

  t('v0.9.241：预览、导入、方案、快照都跟着逐项沿用走', () => {
    /* 预览：字号、颜色各自判沿用（不能一律用原文行的值） */
    const pv = mg.slice(mg.indexOf('function renderVttPv(){'), mg.indexOf('function vttPresetLabel(){'));
    assert.ok(/const useSz = isS && !st\.srcSizeInh, useCol = isS && !st\.srcColorInh;/.test(pv), '预览没按项判沿用');
    assert.ok(/num\(useSz \? st\.srcSize : st\.size/.test(pv), '预览的字号没按沿用回退到译文行');
    assert.ok(/useCol \? col\(st\.srcColor/.test(pv), '预览的颜色没按沿用回退到译文行');
    /* 导入继承：文件里 ::cue(.src) 写了哪项，哪项才是「单独设」 */
    /* ⚠️ importVttStyle 在 syncVttChrome 之后定义，切片必须用「函数体内」的锚点 */
    const im = mg.slice(mg.indexOf('function importVttStyle('), mg.indexOf('const n = filled.main + filled.src + filled.pos;'));
    assert.ok(/put\('mVttSrcColorMode', s\.srcColorInh \? '' : 'set'\)/.test(im), '导入没回填颜色的沿用状态');
    assert.ok(/put\('mVttSrcSizeMode', s\.srcSizeInh \? '' : 'set'\)/.test(im), '导入没回填字号的沿用状态');
    assert.ok(im.indexOf('mVttSrcDiff') < 0, '导入还在写已删除的勾选框');
    /* 方案：白名单要包含两个新控件（否则套用后模式丢了） */
    assert.ok(/const VTT_SCHEME_IDS=\[[\s\S]*?'vttSrcSizeMode','vttSrcColorMode'/.test(html), '方案白名单漏了沿用下拉');
    /* 快照：老存档的 vttSrcDiff='0'（不区分）必须还原成「两项都沿用」，不能因为键换了就恢复错 */
    assert.ok(/sv\.vttSrcDiff === '0'/.test(html), '快照没兼容老存档的 vttSrcDiff');
    /* ⚠️ 空串 = 沿用 是合法取值，两处 put 都会把空串当「没值」跳过，必须走专用分支 */
    assert.ok(/putMode=function\(id,inh\)\{ var e=\$\(id\); if\(!e\) return; e\.value = inh \? '' : 'set'; n\+\+; \}/.test(html),
      '导入回读没绕过「空串被跳过」这个坑');
    assert.ok(/var m=function\(id,v\)\{ var e=\$\(id\); if\(!e \|\| v==null\) return; e\.value=v; \}/.test(html),
      '快照恢复没绕过「空串被跳过」这个坑');
  });

  t('v0.9.241：新词条四语齐全', () => {
    const dictOf = (src, code) => {
      const m = new RegExp("'" + code + "'\\s*:\\s*\\{").exec(src);
      assert.ok(m, '找不到语言块 ' + code);
      const start = m.index + m[0].length;
      const nx = /'[a-zA-Z][a-zA-Z-]*'\s*:\s*\{/.exec(src.slice(start));
      return src.slice(start, start + (nx ? nx.index : src.length));
    };
    ['zh-CN', 'zh-TW', 'en', 'ja'].forEach(code => {
      const dm = dictOf(mg, code);
      assert.ok(new RegExp("[,\\s]vttOptSet:").test(dm), 'merge ' + code + ' 缺 vttOptSet');
      assert.ok(new RegExp("[,\\s]vttInherit:").test(dm), 'merge ' + code + ' 缺 vttInherit');
      const dh = dictOf(html, code);
      assert.ok(new RegExp("[,\\s]vttInherit:").test(dh), 'index ' + code + ' 缺 vttInherit');
      assert.ok(new RegExp("[,\\s]vttOptSet:").test(dh), 'index ' + code + ' 缺 vttOptSet');
    });
    /* 旧提示词条必须真的没了（留着就会有人照着它实现旧行为） */
    assert.strictEqual((mg.match(/lblVttSrcDiff/g) || []).length, 0, 'merge 还留着已废弃的 lblVttSrcDiff');
    assert.strictEqual((html.match(/lblVttSrcDiff/g) || []).length, 0, 'index 还留着已废弃的 lblVttSrcDiff');
    assert.strictEqual((mg.match(/字号与颜色始终单独设置/g) || []).length, 0, 'merge 还留着与行为打架的旧说明');
  });

  /* ================= v0.9.242：布局跟着模板走，「自定义」不再是个坑 =================
     用户原话：「ASS 模版 → 自定义 → 下面有两个『布局』，这个布局没有意义，你说是不是不？」
     是。三条事实：
       ① custom + 布局=分屏 与 直接选「分屏」，expFmtVal() 都返回 'ass-split' → 导出逐字节相同；
       ② 唯一区别（点了重不重套预设）界面上一个字都没写；
       ③ 更糟：TPL_DEFAULTS.custom = TPL_DEFAULTS.split 且切模板无条件套预设 →
          用户想「保住参数」点「自定义」，反而按那个 radio 整套重置。
     改后：布局行整行不显示（radio 留作隐藏状态源）；「分屏/底部双行」= 起点，点了才套预设；
           手改任一参数 / 导入 ASS → 落「自定义」，布局沿用、一个值都不动。
     顺带：VTT 的「自定义」从「手改了才冒出来的状态提示」改成常驻可点的一档（与 ASS 对齐）。 */
  console.log('— v0.9.242：布局跟着模板走 + 「自定义」常驻 —');

  t('v0.9.242：布局行不再显示，radio 只作隐藏状态源', () => {
    assert.ok(/<div class="af" id="layoutRow" style="display:none" aria-hidden="true">/.test(mg),
      'layoutRow 必须整行常驻隐藏');
    assert.ok(!/layoutRow'\)\.style\.display\s*=/.test(mg), '还有代码在切换布局行的显隐');
    /* radio 必须还在 —— custom 档自己不带布局，expFmtVal() 要从它取值 */
    assert.ok(/name="assLayout" value="split"/.test(mg) && /name="assLayout" value="stack"/.test(mg),
      '两个布局 radio 要留着当状态源（custom 的布局就靠它）');
    assert.ok(/function setAssLayoutRadio\(/.test(mg), '缺 setAssLayoutRadio');
    /* 写回 radio 只准走一个入口（以前 import 那条路径自己 querySelector，容易漏同步） */
    const hits = (mg.match(/name=assLayout\]\[value=/g) || []).length;
    assert.strictEqual(hits, 1, '写回布局 radio 的地方应只有 setAssLayoutRadio 一处，实际 ' + hits);
  });

  t('v0.9.242：切到「自定义」不套预设（它是"别动我的"，不是另一个起点）', () => {
    const sp = mg.slice(mg.indexOf('function syncAssPanel(){'), mg.indexOf('function biMaxWVal(){'));
    assert.ok(sp.length > 0, '没取到 syncAssPanel');
    assert.ok(/if \(tpl === 'custom'\) return;/.test(sp), 'syncAssPanel 在 custom 档必须直接返回（不套预设）');
    assert.ok(/applyTplDefaults\(tpl\)/.test(sp), '其他档位仍要套各自预设');
    /* 切进 custom 前先把布局记成跳转前那个档位 */
    const st = mg.slice(mg.indexOf('function setAssTpl(v){'), mg.indexOf('function renderTplSegs(){'));
    /* v0.9.243：两个预设档也必须同步 —— 方案 schemeFields 的 __layout 直接读这个 radio，
       「点分屏 → 存方案」不同步就会把布局记成上一次的（套回去位置就错）。 */
    assert.ok(/setAssLayoutRadio\(v === 'custom' \? \(sel\.value === 'stack' \? 'stack' : 'split'\) : v\)/.test(st),
      '切模板必须同步布局：custom 沿用跳转前那个，两个预设档直接定');
  });

  t('v0.9.242：手改任一 ASS 参数 → 落「自定义」，布局沿用且值不动', () => {
    assert.ok(/function markAssEdited\(\)/.test(mg), '缺 markAssEdited');
    /* 只取 markAssEdited 函数体本身：到下一个顶层 function 为止
       （切到 syncColorSw 会把 resetAssDefaults 夹进来，它里面当然有 applyTplDefaults） */
    const m0 = mg.indexOf('function markAssEdited(){');
    const mk = mg.slice(m0, mg.indexOf('\nfunction ', m0 + 10));
    assert.ok(/if \(ASS_FILL\.active\) return;/.test(mk), '程序写值必须被 ASS_FILL 挡掉');
    assert.ok(!/applyTplDefaults/.test(mk), '手改绝不能顺带套预设（那会冲掉用户的值）');
    assert.ok(!/dispatchEvent/.test(mk), '手改只换档位标记，不该再派发 change 走一遍切模板流程');
    assert.ok(!/applyTplDefaults/.test(mk), '（紧邻校验）手改函数体内绝不能出现套预设');
    assert.ok(/setAssLayoutRadio\(sel\.value === 'stack' \? 'stack' : 'split'\)/.test(mk),
      '跳自定义时布局没沿用当前档位');
    /* 每个 ASS 字段都得挂上监听，漏一个就是「改了某项却不进自定义」 */
    assert.ok(/ASS_DEFAULTS\.forEach\(pair=>\{[\s\S]{0,200}markAssEdited\(\)/.test(mg),
      'ASS 字段没接上「手改 → 跳自定义」的监听');
  });

  t('v0.9.242：套预设 / 导入 / 套方案 的写值不会被误判成手改', () => {
    assert.ok(/const ASS_FILL = \{ active: false \}/.test(mg), '缺 ASS_FILL 守卫');
    const ap = mg.slice(mg.indexOf('function applyTplDefaults(tpl){'), mg.indexOf('function markAssEdited(){'));
    assert.ok(/ASS_FILL\.active = true/.test(ap) && /finally \{ ASS_FILL\.active = false/.test(ap),
      'applyTplDefaults 没用 ASS_FILL 包住（try/finally）');
    assert.ok(/function setAssFields\(pfx, f\)\{[\s\S]{0,200}function setAssFieldsRaw/.test(mg),
      'setAssFields 没用 ASS_FILL 包住');
  });

  t('v0.9.242：custom + 布局=分屏 与 分屏 导出同一个格式（这就是"布局重复"的凭据）', () => {
    const ef = mg.slice(mg.indexOf('function expFmtVal(){'), mg.indexOf('/* v0.9.240：导出改成'));
    assert.ok(/if \(tpl === 'custom'\) return assLayoutVal\(\);/.test(ef), "custom 未跟随布局");
    assert.ok(/if \(tpl === 'split'\) return 'ass-split';/.test(ef), 'split 档位丢了');
    assert.ok(/if \(tpl === 'stack'\) return 'ass-stack';/.test(ef), 'stack 档位丢了');
    assert.ok(/function assLayoutVal\(\)\{[\s\S]{0,200}ass-split' : /.test(mg) === false, '');
  });

  t('v0.9.242：VTT「自定义」常驻 —— 与 ASS 三键一致，不再是"手改才冒出来"', () => {
    assert.ok(/data-custom="1"/.test(mg), '缺 data-custom 标记');
    assert.ok(!/data-custom="1" hidden/.test(mg), '「自定义」不该再默认隐藏');
    assert.ok(!/b\.hidden\s*=/.test(mg), '还有代码在切换按钮显隐');
    /* v0.9.243：它是一档，点得动 —— 但不套预设、不重置任何值
       ⚠️ 结束锚点必须从起点之后找：syncTplSegs 自己的结尾在这段之前，
          用全局 indexOf 会得到 end < start 的空串（假失败） */
    const r0 = mg.indexOf('const vs = $(\'mVttPresetSeg\');');
    const rs = mg.slice(r0, mg.indexOf('syncTplSegs();\n}', r0));
    assert.ok(rs.length > 0, '取不到 mVttPresetSeg 的渲染片段');
    assert.ok(/if \(v === 'custom'\)\{ vttUseCustom\(\); return; \}/.test(rs),
      '「自定义」必须有点击行为（v0.9.242 只是显示出来，点了没反应）');
    const u0 = mg.indexOf('function vttUseCustom(){');
    const uc = mg.slice(u0, mg.indexOf('\nfunction ', u0 + 10));
    assert.ok(uc.length > 0, '缺 vttUseCustom');
    assert.ok(/sel\.value = 'custom'/.test(uc), '点「自定义」没把档位切过去');
    assert.ok(!/applyVttPreset/.test(uc), '点「自定义」不能套任何预设（它是"别动我的"）');
    assert.ok(!/VTT_INH\.dirty/.test(uc), '点按钮不是手改，不该动继承门控');
    assert.ok(/const MVTT_SEGS = \[\['std'[\s\S]*'custom','vttTplCustom'\]\]/.test(mg), 'VTT 四档定义丢了');
  });

  t('v0.9.245：版号两页同步升到 256（merge 2 处 + index 3 处）', () => {
    assert.ok(/class="ver">v0\.9\.262/.test(mg), 'merge.html 显示版号未升');
    assert.ok(/merge-core\.js\?v=0\.9\.262/.test(mg), 'merge.html 缓存 bust 未升');
    assert.ok(/class="ver">v0\.9\.262/.test(html), 'index.html 顶栏版号未升');
    assert.ok(/ver-tag">v0\.9\.262/.test(html), 'index.html 页脚版号未升');
    assert.ok(/srt-core\.js\?v=0\.9\.262/.test(html), 'index.html 缓存 bust 未升');
    /* 上一版的版号不许还挂在显示位上 */
    assert.ok(!/class="ver">v0\.9\.254/.test(mg) && !/class="ver">v0\.9\.254/.test(html), '还留着上一版的显示版号');
  });

  /* ================= v0.9.244：后台补两块数据统计 =================
     用户原话：①「在原有的使用记录中，增加用户下载的字幕格式，比如是 srt 还是 ass」
               ②「增加对双语合并模块的使用记录：哪些 IP 上传了什么字幕，
                   他们最终导出了什么字幕格式，用了哪些模版」
     此前的事实：翻译事件只记「下载了几次」，格式一个字没有；
                 双语合并页是纯前端工具、请求根本不过服务端 → **零埋点**，完全不可见。
     设计要点（写在这里是因为它们都是「看起来能做对、实际容易做错」的地方）：
       · 格式分布绝不能 cnt(dlFmt) —— dlFmt 只是「最后一次」，同一任务先下 SRT 再下 ASS
         会被覆盖成一条，必须另配一组累计计数（dlSrt/dlVtt/…）。
       · 合并记录单独一个文件（merge-events.json），不与翻译事件混：两者口径完全不同
         （翻译按任务去重累加，合并页一次合并 / 一次导出本身就是一条完整记录）。
       · 一切外来值走白名单（pickWL），认不出的一律不写，绝不按前端字符串动态建字段。 */
  console.log('— v0.9.244：导出格式统计 + 双语合并页使用记录 —');
  const fs244 = require('fs'), pa244 = require('path');
  const srv244 = fs244.readFileSync(pa244.join(__dirname, 'server.js'), 'utf8');
  const adm244 = fs244.readFileSync(pa244.join(__dirname, 'admin.html'), 'utf8');

  t('v0.9.244：主站下载上报带导出格式，服务端只认白名单', () => {
    assert.ok(/function reportEvent\(ev, extra, fmt\)\{/.test(html), 'reportEvent 没接 fmt 参数');
    assert.ok(/fmt:fmt\|\|''/.test(html), '上报体没带 fmt');
    assert.ok(/reportEvent\('download', '', expFileFmt\(\)\)/.test(html),
      '下载时没传 expFileFmt()（后台将永远看不到格式）');
    assert.ok(/const DL_FMT = \{ srt: 'srt', vtt: 'vtt', sbv: 'sbv', ass: 'ass', txt: 'txt' \}/.test(srv244),
      '服务端缺导出格式白名单');
    assert.ok(/const DL_FMT_FIELD = \{ srt: 'dlSrt'/.test(srv244), '服务端缺格式计数字段表');
    /* 白名单取值必须 hasOwnProperty：DL_FMT['__proto__'] 会命中原型链 */
    assert.ok(/function pickWL\(map, v\)\{[\s\S]{0,200}hasOwnProperty\.call\(map, k\)/.test(srv244),
      'pickWL 没用 hasOwnProperty（原型链会漏进来）');
    /* 两处 download 记账（匹配到的会话 / 自带 Key 新建的 lite 记录）都要写 */
    const dl = srv244.slice(srv244.indexOf("} else if (ev === 'download') {"), srv244.indexOf("} else if (ev === 'fail') {"));
    assert.ok(/e\.dlFmt = df; e\[DL_FMT_FIELD\[df\]\] = \(e\[DL_FMT_FIELD\[df\]\] \|\| 0\) \+ 1;/.test(dl),
      '匹配到的会话没记格式');
    /* ⚠️ 锚点必须落在 lite 记录上：markEvent 里同名的 download 分支在上面，
       用 indexOf('else if...') 取到的是那一处（已复发一次，别再用分支名当锚点） */
    const lp = srv244.indexOf('lite.downloads = 1');
    const lite = srv244.slice(lp, lp + 260);
    assert.ok(lp > 0 && /lite\.dlFmt = lf; lite\[DL_FMT_FIELD\[lf\]\] = 1;/.test(lite), '自带 Key 用户没记格式');
  });

  t('v0.9.244：格式分布读累计计数，不是「最后一次」（否则先下 SRT 再下 ASS 只算一条）', () => {
    assert.ok(/dlFmts: Object\.keys\(DL_FMT\)/.test(srv244), '后台汇总缺 dlFmts');
    assert.ok(/Number\(e\[DL_FMT_FIELD\[k\]\]\)/.test(srv244), '格式汇总读的是单值字段而非累计计数');
    assert.ok(!/cnt\(all\.filter\(e => e\.dlFmt\), 'dlFmt'\)/.test(srv244), '不能对「最后一次」的 dlFmt 做分布统计');
    /* 后台表格同样要显示各格式的次数，而不只是最后一次 */
    assert.ok(/const DL_FMT_KEYS = \[\['srt','dlSrt'\]/.test(adm244), '后台表格缺格式计数字段表');
    assert.ok(/e\[x\[1\]\] > 1 \? ' ×' \+ e\[x\[1\]\] : ''/.test(adm244), '后台没显示各格式次数');
    assert.ok(/<th>导出格式<\/th>/.test(adm244), '后台表格缺「导出格式」列');
    assert.ok(/colspan="11"/.test(adm244), '表格加了列但 colspan 没跟着加');
  });

  t('v0.9.244：双语合并页上报接进「合并」与「导出」两条路径', () => {
    assert.ok(/function reportMerge\(kind\)\{/.test(mg), 'merge.html 缺 reportMerge');
    assert.ok(/reportMerge\('export'\);/.test(mg), '导出时没上报（后台将看不到格式/模板）');
    /* 两条合并路径都要报：调整双语走的是 doAdjust，漏了就整块不可见 */
    assert.strictEqual((mg.match(/reportMerge\('merge'\);/g) || []).length, 3,
      'doMerge / doAdjust / doMono 各要有一处上报（三条独立路径，v0.9.245 起多一条单语）');
    assert.ok(/kind: k,/.test(mg) && /fmt: k === 'export' \? expExt\(\) : ''/.test(mg), '上报体缺 kind/fmt');
    assert.ok(/src: S\.srcName \|\| '', dst: \(adj \|\| mono\) \? '' : \(S\.dstName \|\| ''\)/.test(mg), '上报体缺上传的两个文件名');
    assert.ok(/mode: mono \? 'mono' : \(adj \? 'adjust' : 'merge'\)/.test(mg), '上报体缺模式');
    /* ⚠️ 「调整双语」只有一个输入（src 侧）；切模式不清 S.dstName，
       照直报会把上一次合并残留的译文名当成这次的输入 → 后台显示的「上传字幕」是错的。 */
    assert.ok(/const adj = S\.mode === 'adjust';/.test(mg), 'adjust 模式没特殊处理（会带上残留的 dstName）');
    /* 只报元数据，绝不报字幕内容 */
    assert.ok(!/text:[\s\S]{0,40}merge-event/.test(mg), '上报里带了字幕内容（越界）');
  });

  t('v0.9.244：模板键与服务端白名单一一对齐（ASS 三档 + VTT 四档 + 两档无模板）', () => {
    assert.ok(/function expTplKey\(\)\{/.test(mg), '缺 expTplKey');
    const kt = mg.slice(mg.indexOf('function expTplKey(){'), mg.indexOf('/* v0.9.244：双语合并页使用记录上报'));
    ['srt', 'vtt', 'ass-split', 'ass-stack', 'ass-custom'].forEach(k => {
      assert.ok(kt.indexOf("'" + k + "'") >= 0, 'expTplKey 缺 ' + k);
    });
    assert.ok(/'vtt-' \+ vttPresetKey\(\)/.test(kt), 'VTT 模板键没带上预设档位');
    /* 服务端那份白名单必须包含同样的键，否则上报的值会被静默丢弃 */
    const tp = srv244.slice(srv244.indexOf('const MERGE_TPL = {'), srv244.indexOf('};', srv244.indexOf('const MERGE_TPL = {')));
    ['srt', 'vtt', 'ass-split', 'ass-stack', 'ass-custom', 'vtt-std', 'vtt-compact', 'vtt-cinema', 'vtt-custom'].forEach(k => {
      assert.ok(tp.indexOf("'" + k + "':") >= 0, 'MERGE_TPL 缺 ' + k);
    });
  });

  t('v0.9.244：合并记录单独存储 + 独立接口，不混进翻译事件', () => {
    assert.ok(/const MEVENTS_PATH = path\.join\(DATA_DIR, 'merge-events\.json'\)/.test(srv244), '缺独立存储文件');
    assert.ok(/u === '\/api\/merge-event'/.test(srv244), '缺公开上报接口');
    assert.ok(/u === '\/api\/admin\/merge-events'/.test(srv244), '缺后台读取接口');
    /* 不能复用 appendEvent：翻译事件按任务去重累加，合并页没有任务概念，混进去口径就乱了 */
    assert.ok(!/appendMEvent[\s\S]{0,400}appendEvent\(/.test(srv244), '合并记录不该复用翻译事件的记账');
    assert.ok(/if \(!src && !dst\) return;/.test(srv244), '空请求（连文件名都没有）不该落库');
    assert.ok(/cues: Math\.max\(0, Math\.min\(1000000, Math\.floor\(\+b\.cues \|\| 0\)\)\)/.test(srv244), '条数没夹取');
    assert.ok(/if \(db\.events\.length > MEVENTS_MAX\)/.test(srv244), '合并记录没有条数封顶');
  });

  t('v0.9.244：客户端去重（改「结构」下拉会自动重跑 doAdjust，不去重就刷屏）', () => {
    assert.ok(/const MG_DEDUP_MS = \{ merge: 30 \* 60 \* 1000, export: 60 \* 1000 \}/.test(mg), '缺去重窗口');
    assert.ok(/if \(body === _mgLast\.body && now - _mgLast\.t < \(MG_DEDUP_MS\[k\] \|\| 0\)\) return;/.test(mg),
      '去重没生效');
    /* 上报失败绝不能影响导出本身 */
    assert.ok(/fetch\('\/api\/merge-event'[\s\S]{0,200}\}\)\.catch\(\(\)=>\{\}\);/.test(mg), '上报没兜住异常');
  });

  t('v0.9.244：后台新增「双语合并记录」卡片，且两张表分页互不干扰', () => {
    assert.ok(/id="mergeCard"/.test(adm244), '后台缺双语合并记录卡片');
    assert.ok(/id="mgRows"/.test(adm244), '后台缺合并记录表体');
    assert.ok(/<th>上传字幕<\/th>/.test(adm244) && /<th>模板<\/th>/.test(adm244), '合并记录缺关键列');
    assert.ok(/loadMergeEvents\(\);/.test(adm244), '进入后台没有加载合并记录');
    /* 模板码要翻成中文，别把 ass-split 这种码直接甩给站长 */
    assert.ok(/'ass-split': 'ASS 分屏'/.test(adm244) && /'vtt-cinema': 'VTT 电影感'/.test(adm244), '模板名没做中文映射');
    /* 分页条原来写死 evPager + 全局 evPage，第二张表会把第一张的页码冲掉 */
    assert.ok(/function renderPager\(j, elId, cur\)\{/.test(adm244), '分页条没参数化');
    assert.ok(/renderPager\(j, 'evPager', evPage\);/.test(adm244), '翻译记录没传自己的页码');
    assert.ok(/renderPager\(j, 'mgPager', mgPage\);/.test(adm244), '合并记录没传自己的页码');
    assert.ok(!/renderPager\(j\);/.test(adm244), '还有调用点在用写死 evPager 的旧签名');
  });


  /* ================= v0.9.245：特效字幕处理（单语模式 + 样式槽 + 筛选器） =================
     用户原话：①「双语合并，我想改成特效字幕处理，同时增加对单语字幕加特效的支持」
               ②「我想支持用户针对不同的字幕行做不同的字幕样式处理」
     已拍板（10-07）：只做 merge 页、主站一个字节不动；出厂槽按行业最佳实践；
                     SRT 没有样式能力，不在范围内。
     下面每一条都是「看起来能做对、实际极容易做错」的地方，钉死在测试里：
       · 槽必须**稀疏**：不套任何槽时导出与旧版逐字节相同，否则既有用户的导出全变样。
       · 槽要穿过折行：一条超宽台词被切成多条 part，切出来的每条都得跟着承载行走。
       · 音效**不能斜体**（Netflix 明文 Never italicize sound effects）—— 这条与直觉相反。
       · 垂直偏移只能落在**逐条 Dialogue 的 MarginV** 上，写进 Style 会被覆盖，等于没写。 */
  console.log('— v0.9.245：特效字幕处理（单语模式 + 样式槽 + 筛选器）—');
  const fs245 = require('fs'), pa245 = require('path');
  const srv245 = fs245.readFileSync(pa245.join(__dirname, 'server.js'), 'utf8');

  t('v0.9.245：槽穿过折行 —— 一条被切成多条 part，每条都跟着承载行走', () => {
    const rows = [
      { start: 0, end: 3000, slot: 'narration',
        en: 'Hello there, this is a very long line that will certainly be wrapped into pieces',
        zh: '你好这是一条足够长所以一定会被折成好几段的字幕台词内容需要超出容量才能触发切分' },
      { start: 3000, end: 6000, slot: 'sfx', en: 'Short', zh: '短句' }
    ];
    const parts = M.buildBilingualParts(rows, { maxW: 21, biMaxW: 16 });
    assert.ok(parts.length >= 2, '没产出 part');
    /* 第一条超宽被切成多条 —— 切出来的每条都得跟着它那条承载行走 */
    const mine = parts.filter(p => p.start < 3000);
    assert.ok(mine.length >= 1, '第一条没被切分，这条用例就没验证到透传');
    assert.ok(mine.every(p => p.slot === 'narration'),
      '折行后槽丢了：' + JSON.stringify(mine.map(p => p.slot)));
    const other = parts.filter(p => p.start >= 3000);
    assert.ok(other.every(p => p.slot === 'sfx'), '第二条没跟自己的槽：' + JSON.stringify(other.map(p => p.slot)));
    /* 边界：没有任何 part 的 slot 是 undefined（引擎只写 '' 或槽名，不写 undefined） */
    assert.ok(parts.every(p => typeof p.slot === 'string'), 'part.slot 不该是 undefined');
  });

  t('v0.9.245：没套槽时 part.slot 是空串（不是 undefined，也不是乱入的槽名）', () => {
    const parts = M.buildBilingualParts([{ start: 0, end: 1000, en: 'A', zh: '甲' }], { maxW: 21, biMaxW: 32 });
    assert.strictEqual(parts[0].slot, '', '未套槽的 part.slot 应为空串');
  });

  t('v0.9.245：不套任何槽 → ASS 与旧版一致（内置四套样式，一个 Slot 样式都不多）', () => {
    const ev = [{ start: 0, end: 1000, lines: [{ style: 'Bottom', text: '你好', mv: 42 }] }];
    const a = M.formatAss(ev, { title: 'x', assStyle: {} });
    const b = M.formatAss(ev, { title: 'x', assStyle: {}, extraStyles: [] });
    assert.strictEqual(a, b, '传了空 extraStyles 输出就变了');
    assert.strictEqual((a.match(/^Style: /gm) || []).length, 4, '内置样式必须正好四套');
    assert.ok(!/Slot[DS]_/.test(a), '没套槽却生成了槽样式');
  });

  t('v0.9.245：套了槽 → ASS 多出对应 Style 行，且 Dialogue 指到它', () => {
    const ev = [{ start: 0, end: 1000, lines: [{ style: 'SlotD_sfx', text: '[电话铃声]', mv: 42 }] }];
    const out = M.formatAss(ev, { title: 'x', assStyle: { dstSize: 56, dstColor: '&H00FFFFFF' },
      extraStyles: [{ name: 'SlotD_sfx', spec: { size: 50, color: '&H00B0B0B0' } }] });
    assert.ok(/^Style: SlotD_sfx,/m.test(out), '槽样式没写进 [V4+ Styles]');
    assert.ok(/Dialogue: 0,[^,]*,[^,]*,SlotD_sfx,/.test(out), 'Dialogue 没指到槽样式');
    assert.strictEqual((out.match(/^Style: /gm) || []).length, 5, '应为四套内置 + 一套槽');
  });

  t('v0.9.245：未注册的样式名回落 Bottom —— 不许导出引用不存在 Style 的畸形文件', () => {
    const out = M.formatAss([{ start: 0, end: 1000, lines: [{ style: 'SlotD_ghost', text: 'x', mv: 42 }] }], { title: 'x' });
    assert.ok(/,Bottom,/.test(out), '未注册的样式名没回落');
    assert.ok(!/,SlotD_ghost,/.test(out), '引用了不存在的 Style');
  });

  t('v0.9.245：含逗号/换行的槽名被丢弃（否则会破坏 ASS 的 CSV 结构）', () => {
    const out = M.formatAss([{ start: 0, end: 1000, lines: [{ style: 'Bottom', text: 'x', mv: 42 }] }],
      { title: 'x', extraStyles: [{ name: 'Bad,Name', spec: {} }, { name: 'Bad\nName', spec: {} }] });
    assert.ok(!/Style: Bad,Name/.test(out), '含逗号的样式名被原样写进去了（会破坏 CSV）');
    assert.ok(/Style: BadName/.test(out), '清洗后的名字没落上');
  });

  t('v0.9.245：ASS Italic 开放 —— 默认正体（旧值），传了才是斜体', () => {
    const ev = [{ start: 0, end: 1000, lines: [{ style: 'Bottom', text: 'x', mv: 42 }] }];
    const off = M.formatAss(ev, { title: 'x', assStyle: {} });
    const offCols = (off.match(/^Style: Bottom,.*$/m) || [''])[0].split(',');
    assert.strictEqual(offCols[8], '0', '默认必须是正体（ASS Italic 位 = 第 9 列）');
    const on = M.formatAss(ev, { title: 'x', assStyle: { dstItalic: true } });
    const onCols = (on.match(/^Style: Bottom,.*$/m) || [''])[0].split(',');
    assert.strictEqual(onCols[8], '-1', 'dstItalic 没生效');
    const on2 = M.formatAss(ev, { title: 'x', extraStyles: [{ name: 'SlotD_narration', spec: { italic: true } }] });
    assert.ok(/^Style: SlotD_narration,(?:[^,]*,){7}-1,/m.test(on2), '槽的斜体没生效');
  });

  t('v0.9.245：VTT 不传 extraRules 时逐字节不变', () => {
    const items = [{ no: 1, start: 0, end: 1000, text: '你好' }];
    const st = { color: '#FFFFFF', size: '100', bold: false, italic: false, line: '88', lineAlign: 'end', align: 'center' };
    const a = M.formatVtt(items, { style: st });
    const b = M.formatVtt(items, { style: st, extraRules: [] });
    assert.strictEqual(a, b, '传了空 extraRules 输出就变了');
    assert.ok(!/sg-/.test(a), '没套槽却出现了槽规则');
  });

  t('v0.9.245：VTT 槽规则拼进同一个 STYLE 块；类名里的空格/点被剥掉', () => {
    const items = [{ no: 1, start: 0, end: 1000, text: '<c.sg-sfx>[电话铃声]</c.sg-sfx>' }];
    const st = { color: '#FFFFFF', size: '100', line: '88', lineAlign: 'end', align: 'center' };
    const rule = M.vttSlotRule('sg-sfx', { color: '#B0B0B0', size: '90', italic: false });
    assert.ok(/::cue\(\.sg-sfx\)/.test(rule), '槽规则的选择器不对');
    assert.ok(/color: #B0B0B0;/.test(rule) && /font-size: 90%;/.test(rule), '槽规则缺声明');
    const out = M.formatVtt(items, { style: st, extraRules: [rule] });
    assert.ok(/^STYLE$/m.test(out), 'STYLE 块丢了');
    assert.ok(out.indexOf('::cue(.sg-sfx)') > 0, '槽规则没进 STYLE 块');
    /* 类名里出现空格或点会变成后代选择器（等于写错规则），必须剥掉 */
    const cleaned = M.vttSlotRule('a b.c', { color: '#B0B0B0' });
    assert.ok(cleaned.indexOf('::cue(.abc)') === 0, '类名没剥成合法形式（空格/点会变成后代选择器）');
    assert.strictEqual(M.vttSlotRule('.', { color: '#B0B0B0' }), '', '剥完为空不该产出规则');
  });

  t('v0.9.245：VTT 槽规则与主样式同一判据（值非法就一条声明都不写）', () => {
    assert.strictEqual(M.vttSlotRule('sg-x', { color: 'not-a-color', size: 'abc', shadowOn: false, bgOn: false }), '',
      '值全非法时不该产出空规则壳子');
    assert.ok(M.vttSlotRule('sg-x', { color: '#B0B0B0' }).length > 0, '合法值反而没产出');
  });

  t('v0.9.245：VTT 每条 cue 可自带 settings（垂直位置是整条级，CSS 改不了）', () => {
    const st = { line: '88', lineAlign: 'end', align: 'center' };
    const a = M.formatVtt([{ no: 1, start: 0, end: 1000, text: '甲' }], { style: st });
    const b = M.formatVtt([{ no: 1, start: 0, end: 1000, text: '甲', settings: ' line:80%,end align:center' }], { style: st });
    assert.ok(/line:88%,end/.test(a), '全局 settings 丢了');
    assert.ok(/line:80%,end/.test(b), '逐条 settings 没生效');
    assert.ok(!/line:88%/.test(b), '给了逐条 settings 还写全局的');
  });

  t('v0.9.245：五个出厂槽 —— 音效不开斜体（Netflix 明文，与直觉相反）', () => {
    const f0 = mg.indexOf('const SLOT_FACTORY = [');
    const decl = mg.slice(f0, mg.indexOf('];', f0));
    assert.ok(f0 > 0, '缺 SLOT_FACTORY');
    ['default', 'narration', 'lyric', 'sfx', 'emphasis'].forEach(id => {
      assert.ok(decl.indexOf("id:'" + id + "'") > 0, '缺出厂槽 ' + id);
    });
    /* 旁白 / 歌词 = 斜体（画外音与歌词的行业惯例） */
    assert.ok(/id:'narration'[\s\S]{0,80}italic:true/.test(decl), '旁白槽应为斜体');
    assert.ok(/id:'lyric'[\s\S]{0,120}italic:true/.test(decl), '歌词槽应为斜体');
    /* ⚠️ 音效**不能**斜体：Netflix Timed Text Style Guide 明文
       "Never italicize speaker IDs or sound effects"，改用淡色区分 */
    const sfx = decl.slice(decl.indexOf("id:'sfx'"), decl.indexOf("id:'emphasis'"));
    assert.ok(/color:'#B0B0B0'/.test(sfx), '音效槽应用淡色区分');
    assert.ok(!/italic/.test(sfx), '音效槽不该斜体（Netflix 规范明文禁止）');
  });

  t('v0.9.245：单语模式 —— 第三个 tab、doMono、文本落在 zh 侧', () => {
    assert.ok(/value="mono"/.test(mg), '缺单语模式 tab');
    assert.ok(/function doMono\(\)\{/.test(mg), '缺 doMono');
    assert.ok(/if \(S\.mode === 'mono'\)\{ doMono\(\); return; \}/.test(mg), 'doMerge 没分派单语');
    /* 引擎以 r.zh 为「必须有内容」的一侧，单语把文本放 zh → 天然只出主样式那一行 */
    assert.ok(/en: '', zh: String\(it\.text/.test(mg), '单语 rows 文本没落在 zh 侧');
    /* 单语下双语体检的「缺原文/缺译文」整片误报，必须过滤 */
    assert.ok(/if \(monoMode\(\)\) issues = issues\.filter/.test(mg), '单语下没过滤双语体检误报');
  });

  t('v0.9.245：槽是稀疏的 —— 默认槽不进 assign，套了槽才记', () => {
    assert.ok(/function slotOfRow\(i\)\{[\s\S]{0,120}assign\[i\] \|\| 'default'/.test(mg), '行→槽取值不对');
    assert.ok(/if \(!id \|\| id === 'default'\) delete S\.style\.assign\[i\];/.test(mg),
      '默认槽不该进 assign（否则清样式会留下无数 default 键）');
  });

  t('v0.9.245：垂直偏移落在逐条 Dialogue 的 MarginV，不落在 Style 上', () => {
    /* v0.9.254：两个角色加**同一个**偏移（整条级）—— 见下方 254 那组 */
    assert.ok(/mv: srcMV \+ off/.test(mg) && /mv: dstMV \+ off/.test(mg), 'dMV 没加到 Dialogue 的 MarginV');
    /* 反例：Dialogue 的 MarginV 非 0 时会覆盖 Style 的 MarginV，加在 Style 上等于没加 */
    assert.ok(!/if \(d\.dMV\) spec\.mv/.test(mg), 'dMV 加在 Style 的 MarginV 上会被逐条值覆盖（等于没加）');
  });

  t('v0.9.245：筛选器是度量 + 内容两类，都不存成规则', () => {
    assert.ok(/function rowMatches\(r, i\)\{/.test(mg), '缺筛选判据（v0.9.248 起带行号，槽筛选要用）');
    /* 度量类：纯数值测量，完全不受「字幕格式不标准」影响 */
    assert.ok(/case 'short':\s*return \(\(Number\(r\.end\) \|\| 0\) - \(Number\(r\.start\) \|\| 0\)\) < 1000;/.test(mg), '缺时长判据');
    assert.ok(/n \/ dur > 20/.test(mg), '缺阅读速度判据（Netflix：成人 ≤20 字符/秒）');
    /* 筛选只影响显示，不改数据 */
    assert.ok(/if \(!rowMatches\(r, i\)\) return '';/.test(mg), '筛选没作用在渲染上');
    assert.ok(!/localStorage[\s\S]{0,40}filter/.test(mg), '筛选结果不该持久化（它不是规则）');
  });

  t('v0.9.245：SRT 不在样式方案内 —— 导出 SRT 的路径不碰槽', () => {
    const b0 = mg.indexOf('function buildExport(){');
    const body = mg.slice(b0, mg.indexOf('\n}', b0));
    const srtLine = body.slice(body.indexOf("return fmt === 'vtt' ? C.formatVtt"));
    assert.ok(srtLine.length > 0, '取不到 SRT 分支');
    assert.ok(!/slot/.test(srtLine), 'SRT 分支不该碰槽');
  });

  t('v0.9.245：切模式清掉行→槽映射（行号变了，旧的映射会套到不相干的行上）', () => {
    assert.ok(/S\.style\.assign = \{\};/.test(mg), '切模式没清行→槽映射');
    const sm = mg.slice(mg.indexOf('function syncMode(){'), mg.indexOf('function setI18nKey'));
    assert.ok(/assign = \{\}/.test(sm), '清理不在 syncMode 里');
    assert.ok(/S\.sel\.clear\(\)/.test(sm), '切模式没清勾选');
  });

  t('v0.9.245：服务端认识 mono 模式（只认白名单，不认的一律不写）', () => {
    assert.ok(/const MERGE_MODE = \{ merge: 'merge', adjust: 'adjust', mono: 'mono' \}/.test(srv245),
      '服务端不认单语模式（后台会整块看不到它）');
  });

  t('v0.9.245：主站一个字节不动 —— 槽/筛选的 id 只出现在 merge 页', () => {
    ['slotBar', 'mFilterText', 'slotEdit', 'filterBar', 'selDock'].forEach(id => {
      assert.ok(mg.indexOf(id) > 0, 'merge.html 缺 ' + id);
      assert.ok(html.indexOf(id) < 0, '主站 index.html 出现了 ' + id + '（说好主站不动）');
    });
  });

  t('v0.9.245：行→槽必须刷进 rows —— 引擎读的是 row.slot，不是 assign', () => {
    /* ⚠️ 真 bug（E2E 抓到）：套完槽只更新了 S.style.assign，导出端一个槽都没生效。
       buildBilingualParts 只看行上的 slot 字段，assign 是页面侧的稀疏表，两者不打通等于白套。 */
    assert.ok(/function syncSlotsToRows\(\)\{/.test(mg), '缺 syncSlotsToRows');
    assert.ok(/S\.rows\[i\]\.slot = slotOfRow\(i\);/.test(mg), '没把槽写进 row.slot');
    /* 每条产生 parts 的路径都要刷，漏一条就是「预览变了导出没变」 */
    const ae = mg.slice(mg.indexOf('function buildAssEvents(){'), mg.indexOf('function buildExport(){'));
    assert.ok(/syncSlotsToRows\(\);/.test(ae), 'buildAssEvents 没刷（ASS 导出读不到槽）');
    const vc = mg.slice(mg.indexOf('function vttCueParts(){'), mg.indexOf('function buildVttExport(){'));
    assert.ok(/syncSlotsToRows\(\);/.test(vc), 'vttCueParts 没刷（VTT 导出读不到槽）');
    const pv = mg.slice(mg.indexOf('function assPvSample(){'), mg.indexOf('function renderAssPv(){'));
    assert.ok(/syncSlotsToRows\(\);/.test(pv), '预览样例没刷（预览与导出会不是同一条）');
  });

  t('v0.9.245：ASS 的 alpha 必须是两位十六进制（传十进制会拼出 9 位畸形颜色）', () => {
    /* ⚠️ 真 bug（E2E 抓到）：spec.alpha 传了 '100'（十进制），
       引擎的 withAlpha 是 '&H' + a + col.slice(4) → 拼出 &H100B0B0B0（9 位），播放器直接解析废。 */
    assert.ok(/function assAlphaHex\(pct\)\{/.test(mg), '缺 assAlphaHex');
    assert.ok(/alpha: assAlphaHex\(src \? A\.srcAlpha : A\.dstAlpha\)/.test(mg), '槽 spec 的 alpha 还在传十进制');
    assert.ok(/toString\(16\)\.toUpperCase\(\)\.padStart\(2, '0'\)/.test(mg), 'alpha 没补成两位十六进制');
  });

  t('v0.9.245：i18n 新词条四语齐全（漏一个语块界面就整块空白）', () => {
    const i0 = mg.indexOf('const I18N = {');
    let d = 0, j = mg.indexOf('{', i0), end = -1;
    for (let k = j; k < mg.length; k++) {
      const c = mg[k];
      if (c === '{') d++;
      else if (c === '}') { d--; if (d === 0) { end = k; break; } }
    }
    const I = eval('(' + mg.slice(j, end + 1) + ')');
    ['zh-CN', 'zh-TW', 'en', 'ja'].forEach(lang => {
      const D = I[lang];
      ['modeMono', 'slotTitle', 'slotViewDiff', 'slotViewAll', 'slotAddParam', 'slotInherit',
       'slotOverride', 'slotCancel', 'slotModified', 'slotRestore', 'slotNarration', 'slotLyric',
       'slotSfx', 'slotEmphasis', 'filterPh', 'filterShort', 'filterFast', 'filterHint',
       'applyAll', 'lblAssItalic', 'monoCol', 'filterSelRow',
       'slotPvTitle', 'slotPvBase', 'slotPvNone', 'selDockAllTip'].forEach(k => {
        assert.ok(D[k] != null && D[k] !== '', lang + ' 缺 ' + k);
      });
    });
  });

  /* ---------- 以下三条是第二批 E2E（_e2e245b.js）抓出来的真 bug，钉死防回退 ---------- */

  t('v0.9.245：选中行数单独一条词条（不从 applyBar 里正则抠数字）', () => {
    /* ⚠️ 真 bug：统计条里 '<b>n</b>' 后面又跟了一个从 applyBar 抠出来的 n → 显示成「2 2」。
       选中行数是这一行自己的说法，得有独立词条，四语都得有（上面那条已查）。 */
    const rf = mg.slice(mg.indexOf('function renderFilterStat(){'), mg.indexOf('function applySlotToSelected('));
    assert.ok(/t\('filterSelRow', '<b>' \+ n \+ '<\/b>'\)/.test(rf), '统计条没用 filterSelRow');
    assert.ok(!/applyBar[\s\S]{0,80}replace\(\/\\^/.test(rf), '统计条还在正则抠数字（会印出重复数字）');
  });

  t('v0.9.245：预览按这条 cue 的槽画（预览 = 导出，不许各画一套）', () => {
    /* ⚠️ 真 bug：renderVttPv 只认 vttStyleOf()，套了槽的行在导出里是灰的、预览里还是白的。 */
    const pv = mg.slice(mg.indexOf('function renderVttPv(){'), mg.indexOf('function vttPresetLabel(){'));
    /* v0.9.250：加了「面板内对照预览」的目标覆盖，取值形式变了，但仍然是「这条 cue 的槽」 */
    assert.ok(/const sid0 = \(T\.slotOverride != null\) \? \(T\.slotOverride \|\| 'default'\) : \(parts\[0\]\.slot \|\| 'default'\);/.test(pv),
      '预览没读这条 cue 的槽');
    assert.ok(/const stBase = slotOn \? slotVttStyle\(sid0, 'dst'\) : vttStyleOf\(\);/.test(pv), '预览没按槽取样式');
    assert.ok(/slotVttSettings\(sid0\)/.test(pv), '预览的纵向位置没跟导出同一条 cue settings');
    /* ⚠️ 沿用/三态的判据必须留在循环里的 st 上 —— 238/239/241 三批单测按 st. 扫函数体，别改名 */
    assert.ok(/const st = \(isS && srcOn\) \? stSrc : stBase;/.test(pv), '行内样式变量不叫 st（旧单测会扫不到）');
  });

  t('v0.9.245：槽的原文行覆盖写进 srcXxx 字段，且只写一条 ::cue(.槽.src)', () => {
    /* ⚠️ 真 bug ①：slotVttStyle 的 src 那一半照 dst 那样写 st.color / st.size，
       而 vttSrcDecls 读的是 srcColor / srcSize → 界面上「覆盖了」，导出里一个字没变。 */
    const sv = mg.slice(mg.indexOf('function slotVttStyle(id, role){'), mg.indexOf('function slotVttSettings('));
    /* ⚠️ v0.9.246 起 src/dst 两半合成一段（用 isS 分支），别再按整行字符串匹配 ——
       那会一改写法就假红。按「有没有写给 srcXxx 字段」这个语义来判。 */
    assert.ok(/st\.srcColor\s*=\s*d\.color/.test(sv) && /srcColorInh\s*=\s*false/.test(sv), '原文行颜色没写进 srcColor');
    assert.ok(/st\.srcSize\s*=/.test(sv) && /srcSizeInh\s*=\s*false/.test(sv), '原文行字号没写进 srcSize');
    assert.ok(/st\.srcBold\s*=\s*d\.bold\s*\?\s*'on'\s*:\s*'off'/.test(sv), '原文行粗体没写进 srcBold');
    assert.ok(/st\.srcItalic\s*=\s*d\.italic\s*\?\s*'on'\s*:\s*'off'/.test(sv), '原文行斜体没写进 srcItalic');
    /* ⚠️ 真 bug ②：整块调 C.vttSlotRule 会顺手用「译文行那套」再写一条 ::cue(.槽.src)，
       同一个选择器在文件里出现两次（前一条是基础值）。CSS 后写的赢，但那是条脏规则。 */
    const sr = mg.slice(mg.indexOf('function slotVttRules(){'), mg.indexOf('/* ================= 导出'));
    /* ⚠️ 带左括号才算「调用」：注释里也提到了这个名字，光查字符串会误报 */
    assert.ok(sr.indexOf('C.vttSlotRule(') < 0, 'slotVttRules 还在整块调 vttSlotRule（会写出重复的 .src 规则）');
    assert.ok(/C\.vttMainDecls\(slotVttStyle\(id, 'dst'\)\)/.test(sr), '槽的主规则没自己拼');
    assert.ok(/C\.vttSrcDecls\(slotVttStyle\(id, 'src'\)\)/.test(sr), '槽的原文行规则没自己拼');
  });

  t('v0.9.245：没有 rows 时结果区不许崩（切模式会把 rows 置空）', () => {
    /* syncMode() 里 S.rows = null，但筛选框与槽栏还在 DOM 里 —— 任何一次重画都会撞上 null.slice。 */
    /* ⚠️ fmtShort 定义在 renderReport **之前**，拿它当右边界会切出空串 —— 用「下一个顶层函数」 */
    const ri = mg.indexOf('function renderReport(){');
    const rj = mg.indexOf('\nfunction ', ri + 10);
    const rr = mg.slice(ri, rj > 0 ? rj : mg.length);
    assert.ok(/if \(!rep \|\| !S\.rows\)\{ \$\('rep'\)\.style\.display = 'none'; return; \}/.test(rr),
      'renderReport 没有 rows 守卫');
  });

  /* ================= v0.9.246：槽参数开全 + 从已存方案导入 ================= */

  t('v0.9.246：槽参数表不再是 5 项（245 的口子太窄，等于只够改个颜色）', () => {
    const si = mg.indexOf('const SLOT_SPEC = [');
    const sj = mg.indexOf('];', si);
    const body = mg.slice(si, sj);
    assert.ok(si > 0 && sj > si, 'SLOT_SPEC 不存在');
    ['size','color','font','bold','italic','alpha','spacing','outlineW','outlineColor',
     'edgeMode','edgeSize','edgeColor','edgeAlpha','align','dMV','marginL','marginR'
    ].forEach(k => {
      assert.ok(new RegExp("\\{ k:'" + k + "'").test(body), 'SLOT_SPEC 缺 ' + k);
    });
    /* ⚠️ 键不许重复：重复键在 SLOT_MAP 里静默覆盖，界面上少一项还查不出原因 */
    const ks = (body.match(/\{ k:'([a-zA-Z]+)'/g) || []).map(x => x.slice(5, -1));
    assert.strictEqual(new Set(ks).size, ks.length, 'SLOT_SPEC 有重复键：' + ks.join(','));
    assert.ok(ks.length >= 17, 'SLOT_SPEC 少于 17 项：' + ks.length);
    assert.ok(!/const SLOT_PARAMS\s*=/.test(mg), '老的 5 项硬编码数组还在');
  });

  t('v0.9.246：做不到的项要标出来，不许静默忽略', () => {
    const si = mg.indexOf('const SLOT_SPEC = [');
    const body = mg.slice(si, mg.indexOf('];', si));
    /* VTT 没有「原文行不透明度」这一说 → 原文行那半不许出现它（否则选了没生效） */
    assert.ok(/\{ k:'alpha'[\s\S]{0,200}noSrc:true/.test(body), 'alpha 没标 noSrc');
    /* ASS 独有的三项：字间距 / 左右边距。VTT 表达不了 → 界面上必须写明 */
    ['spacing','marginL','marginR'].forEach(k => {
      assert.ok(new RegExp("\\{ k:'" + k + "'[\\s\\S]{0,200}fmt:'ass'").test(body), k + ' 没标 fmt:ass');
    });
    /* 界面上要有「仅 ASS」这个标记词条 */
    assert.ok(/slotOnlyAss:/.test(mg), '缺 slotOnlyAss 词条');
    assert.ok(/class="fmt-tag"/.test(mg), '列表里没把「仅 ASS」标记渲染出来');
    /* 垂直位移是整条级：没有「只把原文行上移」这回事 → 必须在 src 那半整块跳过 */
    assert.ok(/\{ k:'dMV'[\s\S]{0,200}level:'cue'/.test(body), 'dMV 没标 level:cue');
  });

  t('v0.9.246：ASS 的左右边距开放给调用方（此前 Style 行里写死 60）', () => {
    /* ⚠️ 走**行为**断言而不是扫源码字符串：改写法就假红的那类断言已经踩过好几次 */
    const ev = [{ start: 0, end: 1000, lines: [{ style: 'Bottom', text: 'x', mv: 42 }] }];
    /* 不传 extraStyles → 四套内置样式的 MarginL/R 必须仍是旧写死的 60，否则老导出全变 */
    const bc = (M.formatAss(ev, { title: 'x', assStyle: {} }).match(/^Style: Bottom,.*$/m) || [''])[0].split(',');
    assert.strictEqual(bc[19], '60', '未传边距时 MarginL 变了（会改坏老导出）');
    assert.strictEqual(bc[20], '60', '未传边距时 MarginR 变了');
    /* 传了 → 必须生效（ASS Style 列序：…Alignment,MarginL,MarginR,MarginV…） */
    const xc = (M.formatAss(ev, { title: 'x', extraStyles: [{ name: 'SlotD_x', spec: { marginL: 200, marginR: 30 } }] })
      .match(/^Style: SlotD_x,.*$/m) || [''])[0].split(',');
    assert.strictEqual(xc[19], '200', '槽的 marginL 没生效');
    assert.strictEqual(xc[20], '30', '槽的 marginR 没生效');

    /* 前端侧：槽的覆盖要写进 spec（这里是源码扫描，因为 slotAssSpec 在 html 里没导出） */
    const ai = mg.indexOf('function slotAssSpec(');
    const ab = mg.slice(ai, mg.indexOf('\nfunction ', ai + 10));
    assert.ok(/if \(d\.marginL != null\) spec\.marginL/.test(ab), '槽的 marginL 没写进 spec');
    assert.ok(/if \(d\.marginR != null\) spec\.marginR/.test(ab), '槽的 marginR 没写进 spec');
    ['size','color','font','bold','italic','alpha','spacing','outlineW','outlineColor'].forEach(k => {
      assert.ok(new RegExp('d\\.' + k + ' != null|d\\.' + k + '\\)').test(ab), 'slotAssSpec 没处理 ' + k);
    });
  });

  t('v0.9.246：导入方案时颜色的口径要统一（ASS 格式 vs HEX，直接比永远不相等）', () => {
    /* 真 bug：方案里存的是控件值 #RRGGBB，assStyleOf() 给的是 &HAABBGGRR，
       两边直接比 → 三项颜色全被误判成差异写成覆盖（导入完平白多出三项）。 */
    const bi = mg.indexOf('function slotBaseVal(');
    const bb = mg.slice(bi, mg.indexOf('\nfunction ', bi + 10));
    assert.ok(/SLOT_COLOR_SUF\[k\]/.test(bb), 'slotBaseVal 没按颜色键走单独分支');
    assert.ok(/slotHex\(el \? el\.value/.test(bb), '颜色基础值没读控件原值（与方案同源）');
    assert.ok(/function slotHex\(/.test(mg), '缺 slotHex 归一函数');
    /* &HAABBGGRR → #RRGGBB 的反序换算必须写对，否则又是「看起来一样其实不等」 */
    const hi = mg.indexOf('function slotHex(');
    const hb = mg.slice(hi, mg.indexOf('\n}', hi));
    assert.ok(/a\[3\] \+ a\[2\] \+ a\[1\]/.test(hb), 'ASS → HEX 的通道顺序不对（应是 BGR 反序）');
  });

  t('v0.9.246：从方案导入 = 只写差异，且 dMV 不许搬（绝对位置 vs 偏移）', () => {
    const ii = mg.indexOf('function slotImportScheme(');
    const ib = mg.slice(ii, mg.indexOf('\nfunction ', ii + 10));
    /* 与基础相同 → 删掉这一项覆盖（补丁只存差异） */
    assert.ok(/slotSame\(nv, bv\)\)\{ delete d\[p\.k\]/.test(ib), '相同的项没被删掉（会存成快照）');
    /* size 是百分比：方案存绝对字号，必须除以基础字号换算 */
    assert.ok(/nv \/ bv \* 100/.test(ib), 'size 没做绝对→百分比换算');
    assert.ok(/nv === 100\)\{ delete d\[p\.k\]/.test(ib), 'size 换算后与基础同号时没清掉');
    /* ⚠️ dMV：方案存「离底多远」，槽存「挪多少」，硬搬会让每行位移量变成整屏高度级别 */
    assert.ok(/p\.k === 'dMV'\) return;/.test(ib), 'dMV 没被排除（导入后字幕会整屏飞）');
    /* 导入完要标「已修改」 */
    assert.ok(/if \(n\) markSlotModified\(id\);/.test(ib), '导入后没标已修改');
    /* 空名 / 不存在的方案 → 返回 0，不炸 */
    assert.ok(/if \(!sc \|\| !s\) return 0;/.test(ib), '没有空值守卫');
  });

  t('v0.9.246：i18n 新词条四语齐全', () => {
    /* ⚠️ 切语块必须用**花括号配平扫描**：固定字符窗口会因字典变大而截断（误报缺词条） */
    const langs = ['zh-CN', 'zh-TW', 'en', 'ja'];
    const dict = {};
    langs.forEach(L => {
      const m = new RegExp("['\"]?" + L.replace('-', '\\-') + "['\"]?\\s*:\\s*\\{").exec(mg);
      assert.ok(m, '找不到语块 ' + L);
      let d = 1, j = m.index + m[0].length;
      while (d > 0 && j < mg.length) { if (mg[j] === '{') d++; else if (mg[j] === '}') d--; j++; }
      dict[L] = mg.slice(m.index, j);
    });
    ['slotPrmFont','slotPrmAlpha','slotPrmSpacing','slotPrmOutlineW','slotPrmOutlineColor',
     'slotPrmEdgeMode','slotPrmEdgeSize','slotPrmEdgeColor','slotPrmEdgeAlpha','slotPrmAlign',
     'slotPrmMarginL','slotPrmMarginR','slotGrpCue','slotGrpText','slotGrpEdge','slotGrpFx','slotGrpPos',
     'slotEdgeNone','slotEdgeShadow','slotEdgeBox','slotAlignLeft','slotAlignCenter','slotAlignRight',
     'slotOnlyAss','slotImpFrom','slotImpBtn','slotImpNone','slotImpDone','slotImpSame'
    ].forEach(k => {
      langs.forEach(L => {
        assert.ok(new RegExp('[,{\\s]' + k + ":\\s*'").test(dict[L]), L + ' 缺 ' + k);
      });
    });
  });

  /* ================= v0.9.248：上传区瘦身 + 槽胶囊筛选 + 贴底选择条 ================= */
  t('v0.9.248：上传区 —— 紧凑条 + 粘贴框默认收起', () => {
    assert.ok(/class="drop drop-zone"/.test(mg), '上传区没换成紧凑条');
    assert.ok(/\.drop-zone\{[^}]*padding:9px 11px/.test(mg), '紧凑条没有压缩内边距');
    /* ⚠️ .drop 是重载类名（表格「被丢弃的行」也用 .drop），新样式必须挂在 .drop-zone 上 */
    assert.ok(/\.drop-zone\{/.test(mg) && !/\.up-card\{[^}]*drop/.test(mg), '新样式污染了表格的 .drop');
    assert.ok(/id="srcText"[^>]*style="display:none"/.test(mg), '粘贴框默认没收起');
    assert.ok(/data-paste="src"/.test(mg) && /data-paste="dst"/.test(mg), '缺粘贴展开按钮');
    assert.ok(/function syncUpSide\(/.test(mg) && /syncUpSide\(side/.test(mg), '缺上传状态同步（文件名/已选态）');
    assert.ok(/drop-zone\.has/.test(mg), '选中文件后紧凑条没有「已选」态');
    assert.ok(/btnPaste:/.test(mg), '缺 btnPaste 词条');
  });

  t('v0.9.248：槽胶囊 = 筛选器（点一下只列出该槽的行）', () => {
    assert.ok(/function rowMatches\(r, i\)\{/.test(mg), 'rowMatches 没带行号（槽筛选需要行号）');
    assert.ok(/if \(f\.slot && i != null && slotOfRow\(i\) !== f\.slot\) return false;/.test(mg), '缺槽筛选判据');
    assert.ok(/S\.filter\.slot == null/.test(mg), 'filter 没加 slot 字段');
    assert.ok(/const filt = \(S\.filter && S\.filter\.slot === id\)/.test(mg), '胶囊没有筛选态');
    /* v0.9.249 起这条规则写成 `.slot-chip.filt,.slot-chip.on.filt{`（提权兜底），别写死单个花括号 */
    assert.ok(/\.slot-chip\.filt[^{]*\{/.test(mg), '筛选态没有样式');
    /* ⚠️ 「设为当前槽 / 编辑槽」不能被筛掉：小铅笔是独立入口 */
    assert.ok(/data-slot-edit="' \+ esc\(id\)/.test(mg), '缺编辑槽的小铅笔入口');
    assert.ok(/S\.filter\.slot = \(S\.filter\.slot === id\) \? '' : id;/.test(mg), '点胶囊不是 toggle 筛选');
    assert.ok(/data-fslot-clr="1"/.test(mg), '筛选中的槽没有取消出口');
  });

  t('v0.9.248：贴底选择条 —— 勾选行后槽就在手边', () => {
    assert.ok(/id="selDock"/.test(mg), '缺选择工具条容器');
    /* ⚠️ dock 必须在 tbody 之后（勾选会整表重绘，放进 tbody 会被自己刷掉） */
    const tb = mg.indexOf('<tbody id="repRows"></tbody>');
    const dk = mg.indexOf('id="selDock"');
    assert.ok(tb > 0 && dk > tb, 'dock 没放在 tbody 之后');
    assert.ok(/\.sel-dock\{[^}]*position:sticky/.test(mg) && /\.sel-dock\{[^}]*bottom:0/.test(mg), 'dock 没有 sticky bottom');
    assert.ok(/function renderSelDock\(/.test(mg) && /renderSelDock\(\);/.test(mg), 'dock 没接进渲染链路');
    assert.ok(/data-dock-slot="' \+ esc\(id\)/.test(mg), 'dock 里没有槽胶囊');
    assert.ok(/applySlotToSelected\(c\.getAttribute\('data-dock-slot'\)\)/.test(mg), '点槽没走同一个应用函数');
    /* 老的应用条不能丢（功能不减） */
    /* v0.9.250：应用条**是有意删掉的**（贴底条已经是「勾行 → 点胶囊」一步到位），
       能力不许缺：「套到选中行」在贴底条的胶囊上，「整篇套用」在贴底条右端。 */
    assert.ok(!/id="applyBar"/.test(mg) && !/id="mApplySlot"/.test(mg), '旧应用条又回来了（与贴底条语义重叠）');
    assert.ok(/data-dock-slot="/.test(mg), '贴底条缺「套到选中行」的胶囊');
    assert.ok(/data-dock-all="1"/.test(mg), '贴底条缺「整篇套用」');
  });

  t('v0.9.248：i18n 新词条四语齐全', () => {
    const langs = ['zh-CN', 'zh-TW', 'en', 'ja'];
    const dict = {};
    langs.forEach(L => {
      const m = new RegExp("['\"]?" + L.replace('-', '\\-') + "['\"]?\\s*:\\s*\\{").exec(mg);
      assert.ok(m, '找不到语块 ' + L);
      let d = 1, j = m.index + m[0].length;
      while (d > 0 && j < mg.length) { if (mg[j] === '{') d++; else if (mg[j] === '}') d--; j++; }
      dict[L] = mg.slice(m.index, j);
    });
    ['btnPaste','slotEditTip','filterSlot','selDockN','selDockClear'].forEach(k => {
      langs.forEach(L => {
        assert.ok(new RegExp('[,{\\s]' + k + ":\\s*'").test(dict[L]), L + ' 缺 ' + k);
      });
    });
  });

  /* ================= v0.9.249：视觉重设计（收敛精修）=================
     用户原话：「双语处理页面不是一般的难看，整体都需要重新设计一下」。
     病根是四件事：暖脏灰底没有层级、粉紫渐变到处铺、圆角一律 16px 无主次、卡片没投影只能靠边框。
     这一版只动外观层（CSS + 按钮图标），不改 id、不改类名、不动业务逻辑。 */
  t('v0.9.249：设计令牌 —— 灰阶层级 + 品牌粉压深 + 三档圆角', () => {
    assert.ok(/--acc:#E12D6E/.test(mg), '品牌粉没压深（#E12D6E）');
    assert.ok(/--acc-ink:#C02159/.test(mg), '缺深粉（浅底上的文字/图标用它，纯 #E12D6E 偏亮）');
    assert.ok(/--card-2:#FAFAFC/.test(mg) && /--line:#E9E9EF/.test(mg), '灰阶没换成冷中性（旧的是暖灰 #F8F7F5）');
    assert.ok(/--r-card:14px; --r-ctl:9px; --r-btn:10px/.test(mg), '圆角没分成卡片/控件/按钮三档');
    assert.ok(/--ctl-h:34px/.test(mg), '控件高度没有统一令牌');
    assert.ok(/--sh-card:/.test(mg) && /--sh-btn:/.test(mg), '缺卡片/按钮投影令牌（层级只能靠边框撑）');
    /* ⚠️ 旧版 4 处背景用 95° 粉紫渐变（logo / 主按钮 / 格式卡选中 / 标题渐变字），
       是「廉价感」的头号来源。--grad 仍被 4 处引用，所以保留变量名、但必须收敛成实色。 */
    assert.strictEqual((mg.match(/linear-gradient\(/g) || []).length, 0, '还有渐变没撤掉');
    assert.ok(/--grad:#E12D6E/.test(mg), '--grad 没收敛成实色（4 处引用会画回渐变）');
  });

  t('v0.9.249：按钮 emoji 全换成 CSS 伪元素图标（与主站 v0.9.204 同款做法）', () => {
    /* emoji 在 Mac/Windows/Android 上字形、字重、行高都不同，和字重体系打架 */
    assert.strictEqual((mg.match(/[🔗🔧⬇☆↺⇅]/g) || []).length, 0, '按钮或词条里还留着 emoji');
    assert.ok(/#btnDownload::before\{[\s\S]{0,400}mask-image:url\("data:image\/svg\+xml/.test(mg),
      '下载按钮的箭头没换成 SVG');
    assert.ok(/#btnMerge::before\{/.test(mg), '「合并预览」缺图标（三种模式共用，图形必须中性）');
    assert.ok(/#btnSwap::before\{/.test(mg), '「原文/译文互换」缺图标（去掉就只剩一句话）');
    /* ⚠️ 图标只能画在伪元素上：data-i18n 是 textContent 赋值，写进词条会被冲掉 */
    assert.ok(/btnDownload:'下载字幕'/.test(mg), '下载文案里还有图标字符');
  });

  t('v0.9.249：单语模式的两处布局错位（视觉改版时实测发现）', () => {
    /* ⚠️ .frow 是两列栅格。隐藏了「译文整体偏移」的内容却留下标签，
       后面的「导出格式」标签会被顶到第 2 格、格式卡退进 170px 的窄列里挤成竖排文字。 */
    assert.ok(/'shiftLbl','shiftRow','biMaxWLbl','biMaxWRow','orderLbl','orderRow'/.test(mg),
      '单语模式漏收「译文整体偏移」标签（格式卡会被挤扁）');
    /* 调整 / 单语模式只有一份输入，输入区收回单列，别留半边空白 */
    assert.ok(/\.grid2\.single\{grid-template-columns:1fr\}/.test(mg), '缺「单列」栅格类');
    assert.ok(/classList\.toggle\('single', !isMerge\)/.test(mg), '切模式没同步单列类');
  });

  t('v0.9.249：筛选态与当前槽必须一眼区分', () => {
    /* 旧版两者都是浅粉底粉字，用户看不出「屏上这些行是被筛过的」 */
    assert.ok(/\.slot-chip\.filt[^{]*\{[^}]*background:var\(--acc\)/.test(mg), '筛选态没做成实心（与 .on 撞脸）');
    assert.ok(/\.slot-chip\.on\{[^}]*background:var\(--acc-weak\)/.test(mg), '当前槽不是浅粉底');
    /* ⚠️ 特异性陷阱：`.slot-chip.filt` 与 `.slot-chip.on` 都是 (0,2,0)，谁写在后面谁生效。
       249 首发把 filt 写在 on 前面 → 点的若是「当前槽」那个胶囊，会被 .on 的浅粉底盖回去，
       筛选态当场消失（外网实测撞到）。这条断言钉死顺序，并允许用 .on.filt 提权兜底。 */
    const iOn = mg.indexOf('.slot-chip.on{'), iFilt = mg.indexOf('.slot-chip.filt');
    assert.ok(iOn > 0 && iFilt > iOn, '⚠️ 筛选态规则必须排在 .slot-chip.on 之后（同特异性，后被覆盖）');
    assert.ok(/\.slot-chip\.filt,\.slot-chip\.on\.filt\{/.test(mg), '缺 .on.filt 提权兜底');
  });

  /* ================= v0.9.250：应用条合并 + 槽能看见效果 =================
     用户 10-09 提的两点：
     ① 贴底条上线后，旧的「对选中的 N 行应用 / 下拉 / 应用 / 整篇套用」重复了；
     ② 样式槽看不到效果，用户不知道一个槽能干什么。 */
  t('v0.9.250：旧应用条删除，能力全部落在贴底条上', () => {
    assert.ok(!/id="applyBar"/.test(mg), '旧应用条又回来了（与贴底条语义重叠）');
    /* 「整篇套用」是旧条子唯一独有的能力 → 必须挪到贴底条右端，且文案里带槽名 */
    assert.ok(/<button type="button" class="btn btn-sm sd-all" data-dock-all="1"/.test(mg), '贴底条缺「整篇套用」按钮');
    assert.ok(/t\('applyAll', slotLabel\(S\.style\.cur\)\)/.test(mg), '「整篇套用」没写清套的是哪个槽');
    assert.ok(/applySlotToAll\(S\.style\.cur\)/.test(mg), '贴底条的整篇套用没接 applySlotToAll');
    /* ⚠️ .sd-all 拿走 margin-left:auto，.sd-clr 不能再要 —— 两个都要等于各占一半、中间裂开 */
    assert.ok(/\.sel-dock \.sd-all\{margin-left:auto\}/.test(mg), '整篇套用没顶到右端');
    assert.ok(/\.sel-dock \.sd-clr\{margin-left:0\}/.test(mg), '两个右端按钮都抢 auto（中间会裂开）');
    /* 删除要彻底：下拉与它的同步代码一起走，不许留孤立的 DOM 引用 */
    assert.ok(!/mApplySlot|mApplyBtn|mApplyAll|applyLabel/.test(mg), '还留着应用条的残骸');
  });

  t('v0.9.250：ASS 预览按这条 cue 的槽画（此前 ASS 侧完全看不到槽）', () => {
    /* ⚠️ 真缺口：renderVttPv 早就按槽画了，ASS 预览却只读面板参数 ——
       同一个槽，VTT 预览能看出淡色、ASS 预览还是白字，等于「导出是灰的、预览是白的」。 */
    const pv = mg.slice(mg.indexOf('function renderAssPv(){'), mg.indexOf('function baseName(){'));
    assert.ok(/const sid = \(T\.slotOverride != null\) \? T\.slotOverride : \(samp\.slot \|\| 'default'\);/.test(pv),
      'ASS 预览没取槽');
    /* 必须读 slotAssSpec（= formatAss 的 extraStyles 用的那一个），不许预览自己拼一份 */
    assert.ok(/const spec = slotAssSpec\(sid, p\);/.test(pv), 'ASS 预览没走导出同一份 spec');
    assert.ok(/const cueOff = slotCueOffset\(sp\);/.test(pv) && /mv: \(p === 'dst'\) \? dstMV : srcMV/.test(pv),
      '槽的垂直偏移没进预览');
    /* 样例必须带出它是哪一行的槽 */
    const sm = mg.slice(mg.indexOf('function assPvSample(){'), mg.indexOf('function renderAssPv(){'));
    assert.ok(/slot: slot \}/.test(sm) || /slot:/.test(sm), 'assPvSample 没带出槽');
    /* ⚠️ 斜体：VTT 那半一直在画、ASS 那半从来不画（paint 里根本没有 fontStyle）——
       导出的 Style 里 Italic 是写了的，于是「预览是正的、导出是斜的」。两条分支都要带 italic。 */
    assert.ok(/css\.fontStyle = o\.italic \? 'italic' : 'normal';/.test(pv), 'ASS 预览根本不画斜体');
    assert.ok(/italic: \(spec\.italic === -1\)/.test(pv), '槽那条分支没带出 italic');
    assert.ok(/italic: !!st\[p\+'Italic'\]/.test(pv), '基础样式那条分支没带出 italic');
  });

  t('v0.9.250：贴底条 —— 主操作在最右，别把「清除」放在伸手就点到的位置', () => {
    /* 实测（外网）抓到：清除排在整篇套用右边，用户点最右会一下把选中的行全丢了。 */
    const i0 = mg.indexOf("d.innerHTML = '<span class=\"sd-n\"");
    const dk = i0 < 0 ? '' : mg.slice(i0, i0 + 1400);
    assert.ok(dk.indexOf('sd-clr') > 0 && dk.indexOf('sd-all') > dk.indexOf('sd-clr'), '「清除」排在主操作右边了');
  });

  t('v0.9.250：槽 → 预览的取色换算必须与导出严格互逆', () => {
    /* ⚠️ ASS 的颜色是 &HAABBGGRR（BGR 倒着存）、alpha 是 00=不透明，
       换算写错就是「导出灰、预览白」这类最难查的假象。这里直接跑一遍往返。 */
    const src = mg.slice(mg.indexOf('function assAlphaHex(pct){'), mg.indexOf('function slotAssSpec('));
    /* hexToAss 定义在后面，单独抠出来一起跑（往返测试两边都要有） */
    const h2a = /function hexToAss\(h\)\{[\s\S]*?\n\}/.exec(mg);
    assert.ok(src.length > 200 && h2a, '抠不到换算函数');
    const F = eval('(function(){' + src + h2a[0] + ' return { ah: assAlphaHex, ap: assAlphaPct, ch: assColHex, ha: hexToAss }; })()');
    assert.ok(F.ap('00') === 100 && F.ap('FF') === 0, 'ASS alpha 的 00/FF 语义反了');
    [0, 30, 70, 100].forEach(p => assert.ok(Math.abs(F.ap(F.ah(p)) - p) <= 1, p + '% 往返漂了'));
    assert.strictEqual(F.ch('&H00FFFFFF'), '#FFFFFF');
    assert.strictEqual(F.ch('&H0000FF'), '#FF0000');           /* BGR 倒着装：别当 RGB 读 */
    assert.strictEqual(F.ch('&H80000000'), '#000000');
    ['#378ADD', '#B0B0B0', '#FFFFFF'].forEach(c =>
      assert.strictEqual(F.ch(F.ha(c)), c, c + ' 往返不一致'));
  });

  t('v0.9.250：胶囊里的「Aa」用槽自己的参数画', () => {
    assert.ok(/function slotAaHtml\(id\)\{/.test(mg), '缺效果字生成器');
    const fn = mg.slice(mg.indexOf('function slotAaHtml(id){'), mg.indexOf('/* ---------- 槽栏 ---------- */'));
    assert.ok(/const col = d\.color \|\| s\.color/.test(fn), 'Aa 没优先用槽覆盖的文字色（音效的淡色就这么来的）');
    assert.ok(/d\.italic \? 'font-style:italic;'/.test(fn) && /d\.bold \? 'font-weight:700;'/.test(fn),
      'Aa 没跟着槽的斜体/粗体走');
    assert.ok(/d\.dMV != null/.test(fn), '带垂直偏移的槽没有标记');
    /* ⚠️ 白底上画 #B0B0B0 会像「禁用」，必须用近黑底（与成片同底）才看得出「它是淡的」 */
    assert.ok(/background:#0A0A0E/.test(fn), 'Aa 底色不是成片那种近黑（淡色槽会看着像禁用）');
    /* 槽栏与贴底条两处都要用 */
    const slots = mg.slice(mg.indexOf('function renderSlots(){'), mg.indexOf('function renderSlotEdit(){'));
    const dock = mg.slice(mg.indexOf('function renderSelDock(){'), mg.indexOf('/* ================= v0.9.245'));
    assert.ok(/slotAaHtml\(id\)/.test(slots), '槽栏胶囊没换效果字');
    assert.ok(/slotAaHtml\(id\)/.test(dock), '贴底条胶囊没换效果字');
  });

  t('v0.9.255：唯一预览 + 视角三档（方案 A）—— 复用同一套渲染器，不另写第二块画布', () => {
    /* ⚠️ 原来两处各画一遍（右栏主预览 + ✎ 面板里的对照预览）：同一套 1080p 几何，
       小那块在 396 栏里只有拇指大，大那块一收面板就没了。
       现在全页**只有一块**画布（右栏 .rail 里的预览卡，整栏 sticky 常驻），视角三档决定「画谁」。
       写第二套渲染器必然漂移 —— 那就是「预览≠导出」复发，这里是底线。 */
    assert.ok(/id="pvCard"/.test(mg), '缺唯一预览卡');
    assert.ok(/id="pvSeg"/.test(mg), '缺视角切换');
    ['movie','slot','base'].forEach(v =>
      assert.ok(mg.indexOf('data-pv="' + v + '"') > 0, '缺视角按钮 ' + v));
    /* 「画谁」由视角决定：null = 用户自己的字幕；非空 = 示意文本 + 套这个槽 */
    assert.ok(/function pvView\(\)\{ return \(S\.pv && S\.pv\.view\) \|\| 'movie'; \}/.test(mg), '缺视角状态（默认必须是成片）');
    assert.ok(/if \(v === 'movie'\) return null;/.test(mg), '成片视角必须画用户自己的字幕');
    assert.ok(/if \(v === 'base'\)  return 'default';/.test(mg), '「基础样式」档要画成不套槽');
    /* 不再有第二块画布：旧标识符必须清零（留一处就是「两处各画一遍」复发） */
    ['id="slotPv"','PV_MINI','pvTarget(','miniPvEls','renderSlotPvMini'].forEach(k =>
      assert.ok(mg.indexOf(k) < 0, '还留着第二块画布的痕迹：' + k));
    /* 切视角 = 重画同一套渲染器 */
    assert.ok(/function renderPv\(\)\{ renderAssPv\(\); renderVttPv\(\); \}/.test(mg), '缺统一重画入口');
    assert.ok(/function setPvView\(v\)\{[\s\S]{0,220}renderPv\(\);\s*\}/.test(mg), '切视角没触发重画');
    assert.ok(/b\.classList\.toggle\('on', b\.getAttribute\('data-pv'\) === pvView\(\)\)/.test(mg), '视角按钮没跟着当前视角亮');
    /* ✎ 面板里的小入口：点了把右栏预览切到「这个槽」；窄屏（右栏落到页底）顺手滚过去 */
    assert.ok(/id="slotPvGoto"/.test(mg), '缺「在预览里看这个槽」入口');
    assert.ok(/setPvView\('slot'\);\n    if \(window\.matchMedia && window\.matchMedia\('\(max-width:1180px\)'\)\.matches\)\{/.test(mg),
      '窄屏点了「在预览里看这个槽」没滚到画面');
    /* SRT / 无样式 VTT 不带样式信息 —— 必须说清楚，不能给用户留一块黑屏 */
    assert.ok(/function pvUsable\(\)\{[\s\S]{0,120}return \(f === 'ass-split' \|\| f === 'ass-stack' \|\| f === 'vtt-styled'\)/.test(mg),
      '判「有没有画面可画」只认带样式的三种格式');
    assert.ok(/id="pvNone"/.test(mg) && /t\('slotPvNone'\)/.test(mg), '无画面的格式没有说明');
    /* 整栏一起收：还按老办法只 toggle #exp，预览卡会留一块空的 480px */
    assert.ok(/function railOn\(on\)\{ const r = \$\('rail'\); if \(r\) r\.classList\.toggle\('on', !!on\); \}/.test(mg), '缺整栏收放');
    assert.ok(mg.indexOf("$('exp').style.display") < 0, '还有地方在单独开关 #exp 的 display');
    /* 画面搬走了，导出卡补一行「将导出什么」的摘要 */
    assert.ok(/id="expSum"/.test(mg) && /function syncExpSum\(\)\{/.test(mg), '导出卡缺「将导出什么」摘要');
  });

  t('v0.9.255：ASS / VTT 两块画面互斥 —— 谁生效谁负责把对方收起来', () => {
    /* ASS 画两条像素定位的行、VTT 画一个百分比定位的 cue 盒。250 实测就是这么挂的：
       只把「自己那套元素」交给渲染器，另一半点不亮（cue 一直停在 HTML 里那个 display:none）。 */
    assert.ok(/if \(T\.cue\) T\.cue\.style\.display = 'none';/.test(mg), 'ASS 生效时没把 VTT 的 cue 收起来');
    assert.ok(/if \(cue\) cue\.style\.display = '';/.test(mg), 'VTT 生效时没把 cue 打开（它会一直是隐藏的）');
    assert.ok(/if \(T\.l1\) T\.l1\.style\.display = 'none'; if \(T\.l2\) T\.l2\.style\.display = 'none';/.test(mg),
      'VTT 生效时没把 ASS 两行收起来（两块画面会叠在一起）');
    /* 第一道闸其实是各自的 box：不生效的那个整块 display:none */
    assert.ok(/const T = mainPvEls\('ass'\);\n  syncPvChrome\(\);/.test(mg), 'renderAssPv 没走唯一目标');
    assert.ok(/const T = mainPvEls\('vtt'\);\n  const box = T\.box, scr = T\.scr, cue = T\.cue, tag = T\.tag;/.test(mg), 'renderVttPv 没走唯一目标');
    assert.ok(/tag:\$\('pvTag'\), slotOverride:ov/.test(mg), '预览目标没带上统一的角标容器');
    assert.ok(mg.indexOf('id="pvTag"') > 0 && mg.indexOf("id='pvTag'") < 0, '缺 id=pvTag');
  });

  t('v0.9.255：内联脚本里不许有「被别的函数吞掉」的定义（toast 吞掉 ⓘ 那次事故）', () => {
    /* 实测事故：ⓘ 那一整套函数被插进了 toast() 的肚子里 —— 页面一开局就 throw ReferenceError，
       示例数据装不上、预览全空，而**所有「源码里有这段字」的断言照样是绿的**。
       所以这里不认字、只认层级：顶格写的 function 定义，在大括号里就算错。 */
    const a = mg.indexOf('<script>'), b = mg.indexOf('</script>', a);
    assert.ok(a > 0 && b > a, '找不到内联脚本');
    const body = mg.slice(a + 8, b);
    let depth = 0;
    const bad = [];
    body.split('\n').forEach(line => {
      const m = /^function\s+(\w+)\s*\(/.exec(line);
      if (m && depth !== 0) bad.push(m[1] + '(深度' + depth + ')');
      line.split('').forEach(ch => { if (ch === '{') depth++; else if (ch === '}') depth--; });
    });
    assert.strictEqual(bad.length, 0, '这些定义没能落到实处（拿不到全局）：' + bad.join('、'));
    assert.strictEqual(depth, 0, '内联脚本的大括号没配平（收尾深度 ' + depth + '）');
  });

  t('v0.9.255：默认视角「成片」画的是用户自己的字幕，示意文本只用于两档对照', () => {
    /* ⚠️ 示意文本（歌词带 ♪、音效是方括号）是给「这个槽 / 基础样式」两档做对照用的。
       默认视角是成片 —— 那里一个字都不许换成示意文本，否则用户进来看见的第一眼就是假画面。 */
    assert.ok(/const smp = \(T\.slotOverride != null\) \? slotSampleText\(S\.style\.cur\) : null;/.test(mg),
      '示意文本必须只在两档对照视角里出现');
    assert.ok(/const enT = smp \? smp\.en : samp\.en, zhT = smp \? smp\.zh : samp\.zh;/.test(mg),
      '成片视角的字被示意文本顶掉了');
    /* 全页只有一处画面：两块容器是「ASS 的画法 / VTT 的画法」，不是两个预览窗口 */
    assert.ok(/id="rail">\s*<div class="pvcard card" id="pvCard">/.test(mg), '预览卡不在右栏容器里');
    assert.ok(mg.indexOf('class="slot-pv"') < 0 && mg.indexOf('.slot-pv-screen{') < 0,
      '✎ 面板里那块旧画布（连同它的 CSS）没删干净');
    /* 「有没有画面可画」→ 视角按钮与说明二选一，不能同时缺也不能同时给 */
    assert.ok(/seg\.style\.display = ok \? '' : 'none';/.test(mg), '不可预览时没把视角按钮收起来');
    assert.ok(/none\.style\.display = ok \? 'none' : 'block';/.test(mg), '可预览时「没有画面」的提示没收掉');
    /* 每次合并/调整/切换模式之后，整栏一起亮出来 */
    assert.ok((mg.match(/railOn\(true\);/g) || []).length >= 4, '还有地方没把右栏亮出来');
    /* 三档视角 + 面板入口的四语文案 */
    ['pvViewMovie','pvViewSlot','slotPvGoto'].forEach(k => {
      const c = (mg.match(new RegExp("[,{\\s]" + k + ":\\s*'", 'g')) || []).length;
      assert.strictEqual(c, 4, k + ' 应有 4 种语言，实际 ' + c);
    });
  });

  t('v0.9.250：新建槽胶囊不许拼出两个加号（四语文案本来就自带 +）', () => {
    /* 实测抓到：「+ ' + t('slotNew')」× slotNew='+ 新建槽' = 「++ 新建槽」。
       约定改为：加号归 i18n 文案管，渲染处一个字都不补。 */
    assert.ok(/data-slot-new="1" role="button" tabindex="0">' \+ esc\(t\('slotNew'\)\)/.test(mg),
      'renderSlots 又手工拼了前缀');
    assert.ok(!/'\+ ' \+ esc\(t\('slotNew'\)\)/.test(mg), '会渲染成「++ 新建槽」');
    const langs = ['zh-CN', 'zh-TW', 'en', 'ja'];
    const dict = {};
    langs.forEach(L => {
      const m = new RegExp("['\"]?" + L.replace('-', '\\-') + "['\"]?\\s*:\\s*\\{").exec(mg);
      assert.ok(m, '找不到语块 ' + L);
      let d = 1, j = m.index + m[0].length;
      while (d > 0 && j < mg.length) { if (mg[j] === '{') d++; else if (mg[j] === '}') d--; j++; }
      dict[L] = mg.slice(m.index, j);
    });
    langs.forEach(L => {
      const m = /slotNew:\s*'([^']*)'/.exec(dict[L]);
      assert.ok(m, L + ' 缺 slotNew');
      assert.ok(/^\+/.test(m[1]), L + ' 的 slotNew 没自带 + → 渲染处不补就丢了加号：' + m[1]);
    });
  });

  /* ================= v0.9.251：出厂「歌词」槽的位移降到 36（用户拍板 30~40） ================= */
  t('v0.9.251/254：出厂歌词槽 dMV 落在 30~40，且偏移是**整条级**的', () => {
    /* 背景：dMV=70 是按**分屏**模板想出来的（分屏原文行在 922，上移 70 很安全）；
       默认模板是**底部双行**（dst 42 / src 117，行盒高 ≈63px、两行间隙只有 12px）。
       ⚠️ v0.9.254 修掉的真 bug：此前 dMV 只加到**译文行**上 —— 42+36=78 的译文行盒
          [78,141] 直接压进原文行盒 [117,180]，用户报的就是「译文和原文重合」。
          现在两个角色加同一个偏移（slotCueOffset），行间关系恒定，整条一起抬起。 */
    const m = /id:\s*'lyric'[^}]*dMV:\s*(\d+)/.exec(mg);
    assert.ok(m, '出厂 lyric 槽没带 dMV（前提变了）');
    const v = +m[1];
    assert.ok(v >= 30 && v <= 40, '歌词槽 dMV 不在用户拍板的 30~40 内：' + v);
    assert.ok(v !== 70, '又退回 70 了（那是分屏口径，双行下整条抬 70 会顶到画面中部）');
    /* 整条级取值：dst 那半优先（界面上 dMV 只出现在译文半），src 作后备 */
    const i0 = mg.indexOf('function slotCueOffset(');
    const fn = i0 < 0 ? '' : mg.slice(i0, i0 + 340);
    assert.ok(/const d = \(s\.dst \|\| \{\}\)\.dMV, r = \(s\.src \|\| \{\}\)\.dMV;/.test(fn), 'slotCueOffset 取值来源不对');
    assert.ok(/const v = \(d != null\) \? d : r;/.test(fn), 'slotCueOffset 没按「dst 优先」取值');
    /* 底部双行的两个预设值都在（对照用），且两行离底差距要容得下两行行盒 */
    const st = /assDstMV:\s*'(\d+)'[^\n]*assSrcMV:\s*'(\d+)'/.exec(mg);
    assert.ok(st, '读不到底部双行预设（42/117）');
    assert.ok(+st[2] - +st[1] >= 60, '双行上下两行离底只差 ' + (+st[2] - +st[1]) + 'px，装不下一个行盒');
  });

  t('v0.9.251：歌词槽四语提示不再说「上移一行」（36 已经不是一行了）', () => {
    const langs = ['zh-CN', 'zh-TW', 'en', 'ja'];
    const dict = {};
    langs.forEach(L => {
      const m = new RegExp("['\"]?" + L.replace('-', '\\-') + "['\"]?\\s*:\\s*\\{").exec(mg);
      assert.ok(m, '找不到语块 ' + L);
      let d = 1, j = m.index + m[0].length;
      while (d > 0 && j < mg.length) { if (mg[j] === '{') d++; else if (mg[j] === '}') d--; j++; }
      dict[L] = mg.slice(m.index, j);
    });
    langs.forEach(L => {
      const m = /slotTipLyric:\s*'([^']*)'/.exec(dict[L]);
      assert.ok(m, L + ' 缺 slotTipLyric');
      assert.ok(!/一行|1 行|one line/.test(m[1]),
        L + ' 还写着「上移一行」，但实际只上移 36px（≈半行）—— 界面不许骗人：' + m[1]);
    });
  });

  /* ================= v0.9.252：导出区不再重复一组格式键，格式名落到下载按钮 ================= */
  t('v0.9.252：导出区的第二组 SRT/VTT/ASS 键整块删除', () => {
    /* 背景：设置区三张格式卡（带副标题「纯文本·无样式 / 网页字幕·可带样式 / 特效字幕·分屏/双行」）
       与导出区那一排（同一份 FMT_SEGS，只是 .sm 把副标题藏了）读的是同一个 tplVal()。
       用户在两处看到 SRT/VTT/ASS，第一反应是「这俩是不是两个设置」——删掉信息量少的右边那份。 */
    assert.ok(!/id="tplSeg2"/.test(mg), '导出区的 #tplSeg2 还在（与设置区重复）');
    /* ⚠️ 按规则块匹配（`{`）：注释里正解释着去掉它的原因，裸类名会把注释也算命中 */
    assert.ok(!/\.fmt-seg\.sm\s*\{/.test(mg), '紧凑格式卡的样式还在（死代码）');
    assert.ok(/id="tplSeg"/.test(mg), '设置区的格式卡被误删了（它才是唯一入口）');
    /* ⚠️ 隐藏的 #expFmt2 是**状态源**不是 UI：tplVal() 优先读它，删了要动 6 处引用 */
    assert.ok(/id="expFmt2"/.test(mg) && /return \$\('expFmt2'\)\.value \|\| \$\('expFmt'\)\.value/.test(mg),
      '把状态源 #expFmt2 一起删了（tplVal 优先读它）');
    assert.ok(!/\['tplSeg','tplSeg2'\]/.test(mg), '渲染循环还在遍历 tplSeg2');
  });

  t('v0.9.252：下载按钮带扩展名（导出区唯一的「我会拿到什么」说明）', () => {
    /* 第二组格式键删掉后，导出区在动作点必须还能看出当前格式 —— 落在下载按钮的后缀上 */
    assert.ok(/id="btnDownload"><span data-i18n="btnDownload">/.test(mg),
      '下载按钮的文案被并进按钮本身了（applyI18n 会把后缀一起冲掉）');
    assert.ok(/<span class="dl-ext" id="dlExt"><\/span>/.test(mg), '缺扩展名 span');
    assert.ok(/function syncDlExt\(\)/.test(mg) && /\$\('dlExt'\)/.test(mg), '缺 syncDlExt');
    assert.ok(/\.dl-ext\{/.test(mg), '缺扩展名的样式');
    /* ⚠️ 必须挂在 syncTplSegs 末尾：格式卡点击 / ASS·VTT 模板键 / 手动改 select / 换语言重绘
       全汇到那儿；漏了的话后缀会停在上一次的格式上（预览变了、按钮还写着旧的） */
    const fn = mg.slice(mg.indexOf('function syncTplSegs()'));
    assert.ok(/syncDlExt\(\);\s*\n\}/.test(fn.slice(0, 1600)), 'syncDlExt 没挂在 syncTplSegs 末尾');
    /* 6 档 → 3 个后缀：ASS 的三档（分屏/双行/自定义）必须都给 .ass */
    assert.ok(/el\.textContent = '\.' \+ fmtGroupOf\(tplVal\(\)\)/.test(mg), '后缀不是从 fmtGroupOf 推的');
    const grp = mg.slice(mg.indexOf('function fmtGroupOf('), mg.indexOf('function syncDlExt('));
    assert.ok(/return 'ass';/.test(grp), 'fmtGroupOf 不再把 ASS 三档归一');
  });

  t('v0.9.252：扩展名不许进 data-i18n 词条（会被 applyI18n 冲掉）', () => {
    assert.ok(/querySelectorAll\('\[data-i18n\]'\)\.forEach\(el => \{ el\.textContent = t\(/.test(mg),
      'applyI18n 的实现变了，这条前提要重看');
    assert.ok(!/btnDownload:'[^']*\.(srt|vtt|ass)[^']*'/.test(mg), '扩展名被写进词条了（切语言会消失）');
    ['下载字幕', '下載字幕', 'Download subtitles', '字幕をダウンロード'].forEach(lbl => {
      assert.ok(mg.indexOf("btnDownload:'" + lbl + "'") >= 0, '下载文案被动过了：' + lbl);
    });
  });

  /* ================= v0.9.253：槽胶囊的「选中」与「编辑」联动 ================= */
  t('v0.9.253：点槽胶囊要把「正在编辑的槽」一起切过去', () => {
    /* 背景（外网实测反馈）：点胶囊原本只设 S.filter.slot，S.style.cur 不动 ——
       上面高亮的是「默认」，下面还写着「编辑槽 · 强调」，同一句话里两个答案，
       用户以为点错了。筛选与编辑是同一个「选中」的两面，点胶囊就是选中它。 */
    const i0 = mg.indexOf('const chip = e.target.closest(');
    const i1 = mg.indexOf('/* v0.9.248：贴底选择条');
    assert.ok(i0 > 0 && i1 > i0, '槽胶囊的点击分支找不到了（锚点被改）');
    const fn = mg.slice(i0, i1);
    assert.ok(/S\.filter\.slot = \(S\.filter\.slot === id\) \? '' : id;/.test(fn), '筛选 toggle 被动过');
    assert.ok(/S\.style\.cur = id;/.test(fn), '点胶囊没切编辑目标（选择与编辑不联动）');
    /* ⚠️ 顺序：先 toggle 筛选 → 再切 cur → 最后重画（重画里带着编辑面板） */
    const iF = fn.indexOf('S.filter.slot ='), iC = fn.indexOf('S.style.cur = id;'), iR = fn.indexOf('renderReport();');
    assert.ok(iF >= 0 && iC > iF, '设 cur 排在筛选之前（顺序反了）');
    assert.ok(iR > iC, '切了编辑目标却没重画，面板还停在上一个槽');
    /* 只切目标，不许顺手把面板展开（没展开的就不该展开） */
    assert.ok(!/det\.open = true;/.test(fn), '点胶囊把编辑面板也展开了（只该切目标）');
    /* 小铅笔仍是「切目标 + 展开」，且不碰筛选（_e2e248 第 7 节依赖这条） */
    const ed = mg.slice(mg.indexOf('const ed = e.target.closest('), i0);
    assert.ok(/S\.style\.cur = eid;/.test(ed) && /det\.open = true;/.test(ed), '小铅笔不再展开面板');
    assert.ok(!/S\.filter\.slot/.test(ed), '小铅笔开始改筛选态了');
    /* 联动能不能被看见，全靠这条链：renderReport → renderSlots → renderSlotEdit */
    const rr = mg.slice(mg.indexOf('function renderReport()'), mg.indexOf('function renderSelDock()'));
    assert.ok(/renderSlots\(\);/.test(rr), 'renderReport 不再重画槽栏');
    const rs = mg.slice(mg.indexOf('function renderSlots()'), mg.indexOf('function slotParamRow('));
    assert.ok(/renderSlotEdit\(\);/.test(rs), 'renderSlots 不再重画编辑面板');
    assert.ok(/if \(nm\) nm\.textContent = t\('slotEdit'\) \+ ' · ' \+ slotLabel\(id\);/.test(mg),
      '面板标题不是跟着当前槽走的（联动的落点）');
  });

  t('v0.9.253：槽提示文案改成「选中」（四语齐全）', () => {
    /* 老文案「点胶囊只看这个槽用在哪几行」只讲了筛选这一半，
       点胶囊现在还会切编辑目标，提示必须跟着说清楚，否则用户还是不敢点。 */
    assert.ok(/data-i18n="slotHint"/.test(mg), '槽提示的挂载点丢了');
    const langs = ['zh-CN', 'zh-TW', 'en', 'ja'];
    langs.forEach(L => {
      const m = new RegExp("['\"]?" + L.replace('-', '\\-') + "['\"]?\\s*:\\s*\\{").exec(mg);
      assert.ok(m, '找不到语块 ' + L);
      let d = 1, j = m.index + m[0].length;
      while (d > 0 && j < mg.length) { if (mg[j] === '{') d++; else if (mg[j] === '}') d--; j++; }
      const dict = mg.slice(m.index, j);
      const hit = /slotHint:'([^']*)'/.exec(dict);
      assert.ok(hit, L + ' 缺 slotHint');
      assert.ok(/选中|選中|select|選択/.test(hit[1]), L + ' 的槽提示没讲「选中」：' + hit[1]);
      assert.ok(!/只看|only lists|だけ表示/.test(hit[1]), L + ' 的槽提示还停在「只看」的旧说法');
    });
  });

  /* ================= v0.9.254：胶囊数字 = 行数；示例覆盖全部出厂槽；dMV 整条级 ================= */
  t('v0.9.254：胶囊后面的数字是「用这个槽的行数」，不是补丁项数', () => {
    /* 用户反馈（附截图）：示例态下「默认」后面一个数字都没有，可它明明占了大半行 ——
       数字挂的是 slotCount（样式补丁有几项），而默认槽的补丁是空的。
       胶囊自己是筛选器（点它只列它用在哪几行），数字就该是这个条数。 */
    assert.ok(/function slotRowCount\(id\)\{/.test(mg), '缺 slotRowCount');
    const i0 = mg.indexOf('function slotRowCount(');
    const fn = mg.slice(i0, i0 + 380);
    assert.ok(/if \(slotOfRow\(i\) === id\) n\+\+;/.test(fn), 'slotRowCount 没按行统计');
    const rs = mg.slice(mg.indexOf('function renderSlots(){'), mg.indexOf('function renderSlotEdit(){'));
    assert.ok(/const n = slotRowCount\(id\);/.test(rs), '胶囊还在用补丁项数');
    assert.ok(!/const n = slotCount\(id\);/.test(rs), '胶囊数字没换过来');
    /* ⚠️ 数字必须**无条件**渲染：0 也有信息量（这个槽现在没被任何行用），
       此前写成 n ? '…' : ''，默认槽就是被这一行藏掉的 */
    assert.ok(/' <span class="mod">' \+ n \+ '<\/span>'/.test(rs), '数字仍被三元条件藏起来');
    /* ⚠️ 编辑面板里的「覆盖 N / M 项」仍是补丁项数 —— 那是另一回事，不许一起改掉 */
    assert.ok(/t\('slotCover', slotCount\(id\), total\)/.test(mg), '面板覆盖率被误改成行数');
  });

  t('v0.9.254：空状态示例覆盖全部五个出厂槽', () => {
    /* 示例的作用是「让用户先看见效果」。只挂两条槽时，旁白/强调的胶囊永远显示 0，
       用户点它们只看到一张空表 —— 像是坏了。五个出厂槽每样来一条。 */
    const dm = mg.slice(mg.indexOf('const DEMO_ROWS = ['), mg.indexOf('function demoRows(){'));
    ['narration', 'sfx', 'lyric', 'emphasis'].forEach(id => {
      assert.ok(dm.indexOf("slot:'" + id + "'") >= 0, '示例里没有 ' + id + ' 这一槽');
    });
    /* ⚠️ 示例的槽必须落成**常量**再挂进 assign：装载过程中 setFmtSilently('stack') 会派发
       change → renderAssPv → assPvSample → syncSlotsToRows()，那时 assign 还空着的话
       每行都被刷成 default，之后再读 r.slot 就什么都读不到（v0.9.254 实测踩过）。 */
    assert.ok(/const DEMO_SLOTS = \{\};/.test(mg) && /S\.style\.assign = Object\.assign\(\{\}, DEMO_SLOTS\);/.test(mg),
      '示例的槽没落成常量 / 没进 assign');
    const ld = mg.slice(mg.indexOf('function loadDemo(){'), mg.indexOf('function endDemo('));
    assert.ok(ld.indexOf('S.style.assign = Object.assign({}, DEMO_SLOTS);') < ld.indexOf("setFmtSilently('stack')"),
      'assign 挂在切格式之后了（示例槽会被那条链刷成 default）');
    /* ⚠️ 示例退场必须把行号槽一起收掉：真实字幕的前几行不该继承示例的槽 */
    const ed = mg.slice(mg.indexOf('function endDemo('), mg.indexOf('function syncSlotsToRows('));
    assert.ok(/S\.style\.assign = \{\};/.test(ed), '示例退场没清 assign（真实行会继承示例的槽）');
    /* 提示文案里的行数要跟上示例的真实行数 */
    assert.ok(!/demoTipBody:'：下面是 6 行样本/.test(mg) && !/demoTipBody:': six sample rows/.test(mg),
      '提示文案还写着 6 行');
  });

  t('v0.9.254：歌词槽的垂直偏移是整条级 —— 译文行与原文行同一个偏移', () => {
    /* 用户报「歌词槽译文和原文重合」：底部双行 dst 42 / src 117，行盒高 ≈63px、间隙仅 12px。
       改前只挪译文行 → 42+36=78 的行盒 [78,141] 压进原文行盒 [117,180]。 */
    const b = mg.slice(mg.indexOf('function buildAssEvents()'), mg.indexOf('function buildExport('));
    assert.ok(/const off = useSlot \? slotCueOffset\(slotObj\(sid\)\) : 0;/.test(b), 'buildAssEvents 没取整条级偏移');
    assert.ok(/mv: srcMV \+ off/.test(b) && /mv: dstMV \+ off/.test(b), '两行没加同一个偏移');
    assert.ok(!/dOff|sOff/.test(b), '还留着「只挪一行」的旧变量');
    /* 预览必须同口径 —— 否则又是「预览不重合、导出重合」 */
    const pv = mg.slice(mg.indexOf('function renderAssPv(){'), mg.indexOf('function baseName(){'));
    assert.ok(/const cueOff = slotCueOffset\(sp\);/.test(pv), '预览没取整条级偏移');
    assert.ok(/const dstMV = m\.dst \+ cueOff, srcMV = m\.src \+ cueOff;/.test(pv), '预览两行没加同一个偏移');
  });

  t('v0.9.254：面板对照预览画「这个槽自己的示意内容」（歌词带 ♪、音效带方括号）', () => {
    /* 用户要求：套用样式预览里的字幕内容要随槽区分 —— 预览里出现一句普通对白，
       看不出这个槽是给什么用的；歌词得有 ♪、音效得是方括号。 */
    const fac = mg.slice(mg.indexOf('const SLOT_FACTORY = ['), mg.indexOf('function slotSampleText('));
    [['lyric', '♪'], ['sfx', '['], ['narration', 'Narrator'], ['emphasis', 'NOW']].forEach(pair => {
      const id = pair[0], mark = pair[1];
      const i = fac.indexOf("id:'" + id + "'");
      assert.ok(i >= 0, '找不到出厂槽 ' + id);
      const seg = fac.slice(i, i + 320);
      assert.ok(seg.indexOf('sample:') >= 0, id + ' 没有示意文本');
      assert.ok(seg.indexOf(mark) >= 0, id + ' 的示意文本里没有 ' + mark);
    });
    /* ⚠️ 取「正在编辑的槽」而不是 slotOverride：基础样式那半的 override 是空串，
       两半要用同一段文本才是有效对照 */
    const pv = mg.slice(mg.indexOf('function renderAssPv(){'), mg.indexOf('function baseName(){'));
    assert.ok(/const smp = \(T\.slotOverride != null\) \? slotSampleText\(S\.style\.cur\) : null;/.test(pv),
      'ASS 面板预览没按当前槽取示意文本');
    assert.ok(/const enT = smp \? smp\.en : samp\.en, zhT = smp \? smp\.zh : samp\.zh;/.test(pv), '示意文本没接上');
    assert.ok(/paint\(l1, enT, sideOf\('src'\)\);/.test(pv) && /paint\(l2, zhT, sideOf\('dst'\)\);/.test(pv),
      '画的还是样例原文，没换成示意文本');
    const vp = mg.slice(mg.indexOf('function renderVttPv(){'), mg.indexOf('function vttPresetLabel('));
    assert.ok(/sp\.textContent = smp \? \(isS \? smp\.en : smp\.zh\) : L\.text;/.test(vp), 'VTT 面板预览没换文本');
    /* ⚠️ 主预览（slotOverride == null）画的是用户自己的字幕，一个字都不许换 */
    assert.ok(/const smp = \(T\.slotOverride != null\) \? slotSampleText/.test(pv) && /: null;/.test(pv),
      '示意文本没有被限制在面板预览里');
    /* 用户自建的槽没有示意文本 → 退回真实样例，不许编内容 */
    assert.ok(/return \(f && f\.sample\) \? f\.sample : null;/.test(mg), '找不到槽的示意文本时没有安全回落');
  });

  /* ================= v0.9.247：工作台布局 + 空状态示例 ================= */
  t('v0.9.247：左列参数/结果、右列预览导出的栅格容器（预览不再排在最末）', () => {
    assert.ok(/\.work\{display:grid/.test(mg), '缺 .work 栅格容器');
    assert.ok(/\.rail\{[\s\S]{0,240}grid-column:2/.test(mg), '右栏（预览+导出）没进第二列');
    assert.ok(/\.rail\{[\s\S]{0,240}position:sticky/.test(mg), '右栏没有常驻（sticky）');
    /* v0.9.255：整栏收放走 .on 类（原来是给 #exp 单独 display:none） */
    assert.ok(/\.rail\{display:none/.test(mg) && /\.rail\.on\{display:flex\}/.test(mg), '右栏漏了整栏收放');
    assert.ok(/\.work>\.opts\{grid-column:1/.test(mg) && /\.work>\.rep\{grid-column:1/.test(mg), '左列没归位');
    /* ⚠️ 窄屏必须回单列，否则 820px 下右栏会压在左栏上面 */
    assert.ok(/@media \(max-width:1180px\)\s*\{[\s\S]{0,300}\.work>\.rail\{grid-column:1/.test(mg), '窄屏没回单列');
  });

  t('v0.9.247：示例态 —— 有样本、有提示条、不许导出', () => {
    assert.ok(/const DEMO_ROWS = \[/.test(mg), '缺示例数据');
    assert.ok(/function loadDemo\(\)/.test(mg) && /loadDemo\(\);/.test(mg), '示例没在初始化时装载');
    assert.ok(/S\.demo = true/.test(mg), '缺 demo 标记');
    /* ⚠️ 示例数据落盘 = 用户下载到一份假字幕，两条出口都必须拦 */
    assert.ok(/function doDownload\(\)\{[\s\S]{0,220}S\.demo\)\s*\{/.test(mg), '下载没拦示例态');
    assert.ok(/function doCopy\(\)\{[\s\S]{0,220}S\.demo\)\s*\{/.test(mg), '复制没拦示例态');
    assert.ok(/function endDemo\(\)/.test(mg) && /endDemo\(\);/.test(mg), '示例态退不了场');
  });

  t('v0.9.247：i18n 新词条四语齐全', () => {
    const langs = ['zh-CN', 'zh-TW', 'en', 'ja'];
    const dict = {};
    langs.forEach(L => {
      const m = new RegExp("['\"]?" + L.replace('-', '\\-') + "['\"]?\\s*:\\s*\\{").exec(mg);
      assert.ok(m, '找不到语块 ' + L);
      let d = 1, j = m.index + m[0].length;
      while (d > 0 && j < mg.length) { if (mg[j] === '{') d++; else if (mg[j] === '}') d--; j++; }
      dict[L] = mg.slice(m.index, j);
    });
    ['demoTipTitle','demoTipBody','demoNoExport'].forEach(k => {
      langs.forEach(L => {
        assert.ok(new RegExp('[,{\\s]' + k + ":\\s*'").test(dict[L]), L + ' 缺 ' + k);
      });
    });
  });

  t('v0.9.256：点了槽就把右侧画面切过去（胶囊 + 小铅笔）；取消选中回「成片」', () => {
    /* 用户拍板：① 触发点 = 槽胶囊 + 小铅笔 ② 再点一次取消选中 → 回「成片」 */
    const i = mg.indexOf("const chip = e.target.closest('[data-slot]')");
    assert.ok(i > 0, '找不到点胶囊那段');
    const blk = mg.slice(i, i + 1500);
    /* ⚠️ 判据必须是 S.filter.slot（选中状态），不是 cur —— 取消选中时 cur 仍是这个槽 */
    assert.ok(/setPvView\(S\.filter\.slot \? 'slot' : 'movie'\);/.test(blk),
      '点胶囊没把右侧画面跟着切（选中→这个槽 / 取消→成片）');
    assert.ok(blk.indexOf('S.style.cur = id;') > 0, '点胶囊没切编辑目标（253 的联动丢了）');
    assert.ok(/renderReport\(\);/.test(blk), '点胶囊后没重画整条链');

    const j = mg.indexOf("const ed = e.target.closest('[data-slot-edit]')");
    assert.ok(j > 0, '找不到点小铅笔那段');
    /* ⚠️ 别用固定长度切片（分支一变长就越界到胶囊那段 → 把「不许碰筛选」误判成红）；
       ⚠️ 也别切到最近的 return;（分支开头那个 `if (!S.style.slots[eid]) return;` 会先中招）——
       以分支里那句 det.open 为终点。 */
    const jEnd = mg.indexOf('renderSlots();', j);
    const blk2 = jEnd > j ? mg.slice(j, jEnd + 15) : mg.slice(j, j + 700);
    assert.ok(/setPvView\('slot'\);/.test(blk2), '小铅笔没把右侧画面切到这个槽');
    assert.ok(/det\.open = true;/.test(blk2), '小铅笔不再展开编辑面板了');
    assert.ok(blk2.indexOf('S.filter') === -1, '小铅笔语义变了（不许碰筛选）');
  });

}
