/* _t_batch_core.js —— batch-core node 断言（v0.9.316，非交付件）
   ⚠️ 整体包在函数作用域里跑：node -e 顶层 const 会进全局词法作用域，
   batch-core 的 zipLib 沿作用域链能查到 JSZip，「缺库」场景就测不出来了。 */
'use strict';
(async function () {
  const C = require('./batch-core.js');
  const JSZip = require('./jszip.min.js');

  let P = 0, F = 0;
  const ok = (c, n, x) => { console.log((c ? '  ✓ ' : '  ✗ ') + n + (x !== undefined ? '  [' + String(x).slice(0, 100) + ']' : '')); c ? P++ : F++; };

  /* 数据：第二条 1h1m3s（验证 VTT 小时位分界） */
  const SRT = '1\n00:00:01,000 --> 00:00:02,500\nhello\n\n2\n01:01:03,000 --> 01:01:04,500\nworld\n';
  const VTT = 'WEBVTT\n\n00:01.000 --> 00:02.500\nhello\n\n01:01:03.000 --> 01:01:04.500\nworld\n';

  /* ① SRT→VTT：<1h 无小时位、≥1h 带 */
  let v = C.convertText(SRT, 'srt', 'vtt');
  ok(v.indexOf('WEBVTT') === 0 && v.indexOf('00:01.000 --> 00:02.500') > 0 && v.indexOf('01:01:03.000 --> 01:01:04.500') > 0, 'SRT→VTT 小时位分界', v.split('\n').slice(1, 5).join(' | '));

  /* ② VTT→SRT */
  let s = C.convertText(VTT, 'vtt', 'srt');
  ok(s.indexOf('00:00:01,000 --> 00:00:02,500') > 0 && s.indexOf('01:01:03,000 --> 01:01:04,500') > 0, 'VTT→SRT', s.split('\n').slice(1, 3).join(' | '));

  /* ③ 同格式重排（序号重写） */
  const messy = '7\n00:00:01,000 --> 00:00:02,000\na\n\n3\n00:00:03,000 --> 00:00:04,000\nb\n';
  const re = C.convertText(messy, 'srt', 'srt');
  ok(re.indexOf('1\n00:00:01') === 0 && re.indexOf('2\n00:00:03') > 0, '乱序号重排为 1/2', re.split('\n\n')[0].split('\n')[0]);

  /* ④ 没条目 → null */
  ok(C.convertText('garbage', 'srt', 'vtt') === null, '空文件返回 null');

  /* ⑤ detectFmt */
  ok(C.detectFmt('a.srt') === 'srt' && C.detectFmt('a.vtt') === 'vtt' && C.detectFmt('b.txt', 'WEBVTT') === 'vtt', 'detectFmt');

  /* ⑥ targetName 重名加序号 */
  const taken = ['sub.srt'];
  ok(C.targetName('sub.vtt', 'srt', taken) === 'sub-2.srt', '重名 → sub-2.srt', C.targetName('sub.vtt', 'srt', taken));
  ok(C.targetName('sub.vtt', 'srt', taken.concat(['sub-2.srt'])) === 'sub-3.srt', '三连重名 → sub-3.srt');
  ok(C.targetName('a.b.srt', 'vtt', []) === 'a.b.vtt', '只换最后扩展名', C.targetName('a.b.srt', 'vtt', []));

  /* ⑦ zipFiles 回环 */
  const buf = await C.zipFiles([{ name: 'a/1.srt', text: 'c1' }, { name: 'a/2.srt', text: 'c2' }], JSZip);
  const z2 = await JSZip.loadAsync(buf);
  const t1 = await z2.file('a/1.srt').async('string');
  ok(t1 === 'c1' && z2.file('a/2.srt'), 'zipFiles 回环（注入 JSZip）');

  /* ⑧ 缺库明说（函数作用域里 const，全局词法环境查不到） */
  let threw = false;
  try { await C.zipFiles([{ name: 'x', text: 'y' }]); } catch (e) { threw = /not loaded/.test(e.message); }
  ok(threw, 'JSZip 未注入时明说抛错');

  /* ⑨ 转换回环逐字一致：SRT→VTT→SRT */
  const rt = C.convertText(C.convertText(SRT, 'srt', 'vtt'), 'vtt', 'srt');
  ok(rt === SRT, 'SRT→VTT→SRT 逐字一致', JSON.stringify(rt.slice(0, 40)));

  console.log('----');
  console.log('通过 ' + P + ' / 失败 ' + F);
  process.exit(F ? 1 : 0);
})().catch(e => { console.log('FATAL', e && e.stack); process.exit(3); });
