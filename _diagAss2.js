/* 诊断第二轮：双语场景下，清洗规则会不会误伤 */
'use strict';
const C = require('./clean-core.js');

const o = { assFx:1, html:1, ctrl:1, sort:1, sdh:1, speaker:0, music:0,
            wm:1, dup:1, empty:1, punct:1, upper:0, merge:0 };

function cleanOne(text) {
  const raw = [{ no:1, start:1300, end:3300, text:text }];
  const r = C.clean(raw, o);
  const ch = r.changes[0];
  return { after: ch ? ch.after : text, tags: ch ? ch.tags : [], del: ch ? !!ch.del : false };
}

console.log('='.repeat(74));
console.log('【① 双语条目里「一行是水印、一行是对白」→ 整条连原文一起没了吗】');
console.log('='.repeat(74));
[
  'What time is it?\N本字幕由XX字幕组提供',
  'It is nine o clock.\N微信公众号：abc123',
  'See you tomorrow.\Nwww.example.com'
].forEach(function (t) {
  const r = cleanOne(t);
  console.log('\n  原文: ' + JSON.stringify(t));
  console.log('  结果: ' + JSON.stringify(r.after) + '   tags=' + r.tags.join(',') +
              (r.del ? '  ⚠️整条被删' : ''));
});

console.log('\n' + '='.repeat(74));
console.log('【② 双语条目里「一行是听障提示」→ 会连原文一起删吗】');
console.log('='.repeat(74));
[
  '[脚步声]\N他来了',
  '[MUSIC]\NLet it go',
  'Hello!\N[电话铃]'
].forEach(function (t) {
  const r = cleanOne(t);
  console.log('\n  原文: ' + JSON.stringify(t));
  console.log('  结果: ' + JSON.stringify(r.after) + '   tags=' + r.tags.join(',') +
              (r.del ? '  ⚠️整条被删' : ''));
});

console.log('\n' + '='.repeat(74));
console.log('【③ 去重规则：原文与译文恰好相同时（数字/专有名词）→ 会被当重复删掉吗】');
console.log('='.repeat(74));
{
  const raw = [
    { no:1, start:1300, end:3300, text:'2024' },
    { no:2, start:1300, end:3300, text:'2024' },     // 原文=译文
    { no:3, start:5000, end:7000, text:'OK' },
    { no:4, start:5000, end:7000, text:'OK' }
  ];
  const r = C.clean(raw, o);
  console.log('  4 条进去 → ' + r.changes.length + ' 条改动');
  r.changes.forEach(function (ch) {
    console.log('    #' + (ch.i + 1) + ' ' + JSON.stringify(ch.before) + ' → ' +
                (ch.del ? '【删除】' : JSON.stringify(ch.after)) + '  tags=' + ch.tags.join(','));
  });
}

console.log('\n' + '='.repeat(74));
console.log('【④ 每行自带特效标签的双语（ASS 常见写法）】');
console.log('='.repeat(74));
[
  '{\\an8}Hello{\\i1} there\\N你好啊',
  '{\\i1}I am fine.\\N{\\i1}我很好。',
  '{\\pos(10,20)}Text\\N文本'
].forEach(function (t) {
  const r = cleanOne(t);
  console.log('\n  原文: ' + JSON.stringify(t));
  console.log('  结果: ' + JSON.stringify(r.after) + '   tags=' + r.tags.join(','));
});

console.log('\n' + '='.repeat(74));
console.log('【⑤ 导出格式本身的硬伤】');
console.log('='.repeat(74));
{
  const items = [{ no:1, start:1300, end:3300, text:'Hello\n你好' }];
  const srt = C.formatSrt(items);
  console.log('  SRT 行尾是 CRLF 吗: ' + /\r\n/.test(srt) + '   （SRT 规范要求 CRLF）');
  console.log('  download() 额外写 BOM: 是（clean.html:585）');
  console.log('  导出的 SRT 里带不带样式/位置信息: 不带（ASS 全部被剥 → 用户拿回的不是原来的样子）');
}

console.log('\n' + '='.repeat(74));
console.log('【⑥ 合并规则改了时间轴但导出用回原值（真 bug？）】');
console.log('='.repeat(74));
{
  const raw = [
    { no:1, start:1000, end:1800, text:'Hello there' },
    { no:2, start:1900, end:2600, text:'how are you' }
  ];
  const r = C.clean(raw, { assFx:0, html:0, ctrl:0, sort:1, sdh:0, speaker:0, music:0,
                           wm:0, dup:0, empty:0, punct:0, upper:0, merge:1 });
  const ch = r.changes[0];
  console.log('  合并后 change.after = ' + JSON.stringify(ch.after));
  console.log('  change 里有 end 字段吗: ' + (ch.end !== undefined));
  console.log('  → 页面 resolve() 用 S.raw[i].end（原值 1800），合并实际该到 2600');
  console.log('  → 导出: 1\\n00:00:01,000 --> 00:00:01,800\\nHello there\\nhow are you  ⚠️ 尾巴被截');
}
