/* v0.9.271 实测：清洗页 ASS 双轨双语 + 导出格式三选
   验的是真 DOM：真粘贴 ASS 双语 → 真点格式切换 → 真点翻转 → 真取导出内容。
   契约：
     ① 双轨双语被认出来并合并（6 条 → 3 条），提示条真的显示
     ② 导出的 SRT 是「一条两行」，不是两条时间轴相同的独立字幕
     ③ 双语里一行是水印 → 只删那一行，正片对白保住
     ④ 导出三选：SRT / VTT / ASS 都能出，ASS 保留原文件的样式段
     ⑤ ASS 通道里双轨会拆回两条，各自沿用自己轨道的 Style
     ⑥ 翻转「译文在上」真的翻转，且 ASS 里两条轨道的 Style 对调正确
     ⑦ 全流程无 JS 异常 */
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');
const http = require('http');
const PORT = 9333, BASE = 'http://127.0.0.1:3098';
const wait = ms => new Promise(r => setTimeout(r, ms));
let PASS = 0, FAIL = 0;
const ok = (c, n, x) => { console.log((c ? '  ✓ ' : '  ✗ ') + n + (x !== undefined ? '  [' + String(x).slice(0, 160) + ']' : '')); c ? PASS++ : FAIL++; };
const J = p => new Promise((res, rej) => { const r = http.request({ host: '127.0.0.1', port: PORT, path: p, method: 'PUT' }, x => { let d = ''; x.on('data', c => d += c); x.on('end', () => { try { res(JSON.parse(d)); } catch (e) { rej(new Error(d.slice(0, 200))); } }); }); r.on('error', rej); r.end(); });
const NL = String.fromCharCode(10);
const b64 = s => Buffer.from(s, 'utf8').toString('base64');

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
];

/* 双语 ASS：3 组双轨 + 1 条纯水印（应被整条删） */
const ASS_BI = HEAD.concat([
  'Dialogue: 0,0:00:01.30,0:00:03.30,Default,,0,0,0,,{\\an8}Hello there, how are you?',
  'Dialogue: 0,0:00:01.30,0:00:03.30,CN,,0,0,0,,{\\an2}你好啊，你怎么样？',
  'Dialogue: 0,0:00:04.00,0:00:06.50,Default,,0,0,0,,{\\i1}I am fine.',
  'Dialogue: 0,0:00:04.00,0:00:06.50,CN,,0,0,0,,我很好。',
  'Dialogue: 0,0:00:07.00,0:00:09.00,Default,,0,0,0,,What time is it?',
  'Dialogue: 0,0:00:07.00,0:00:09.00,CN,,0,0,0,,现在几点了？',
  'Dialogue: 0,0:00:10.00,0:00:12.00,Default,,0,0,0,,www.example.com',
  'Dialogue: 0,0:00:10.00,0:00:12.00,CN,,0,0,0,,本字幕由某某字幕组提供'
]).join(NL);

/* 一行是水印的双语：对白必须保住 */
const ASS_WM = HEAD.concat([
  'Dialogue: 0,0:00:01.30,0:00:03.30,Default,,0,0,0,,What time is it?',
  'Dialogue: 0,0:00:01.30,0:00:03.30,CN,,0,0,0,,现在几点了？',
  'Dialogue: 0,0:00:04.00,0:00:06.50,Default,,0,0,0,,I am fine.',
  'Dialogue: 0,0:00:04.00,0:00:06.50,CN,,0,0,0,,我很好。',
  'Dialogue: 0,0:00:07.00,0:00:09.00,Default,,0,0,0,,See you tomorrow.',
  'Dialogue: 0,0:00:07.00,0:00:09.00,CN,,0,0,0,,www.example.com',
  'Dialogue: 0,0:00:10.00,0:00:12.00,Default,,0,0,0,,Good night.',
  'Dialogue: 0,0:00:10.00,0:00:12.00,CN,,0,0,0,,晚安。'
]).join(NL);

(async () => {
  const v = await J('/json/new?' + encodeURIComponent('about:blank'));
  const ws = new WebSocket(v.webSocketDebuggerUrl, { perMessageDeflate: false });
  let id = 0; const wt = new Map(); const errs = [];
  await new Promise(r => ws.on('open', r));
  ws.on('message', m => { const g = JSON.parse(m);
    if (g.id && wt.has(g.id)) { const q = wt.get(g.id); wt.delete(g.id); g.error ? q.rej(new Error(JSON.stringify(g.error))) : q.res(g.result); }
    if (g.method === 'Runtime.exceptionThrown') errs.push(((g.params.exceptionDetails.exception || {}).description) || g.params.exceptionDetails.text); });
  const send = (m, p) => new Promise((res, rej) => { const i = ++id; wt.set(i, { res, rej }); ws.send(JSON.stringify({ id: i, method: m, params: p || {} })); });
  const ev = async e => { const r = await send('Runtime.evaluate', { expression: e, returnByValue: true, awaitPromise: true });
    if (r.exceptionDetails) { console.log('  EXPR>>> ' + String(e).slice(0, 300)); throw new Error((r.exceptionDetails.exception || {}).description || r.exceptionDetails.text); } return r.result.value; };
  await send('Page.enable'); await send('Runtime.enable');
  await send('Network.setCacheDisabled', { cacheDisabled: true });
  await send('Emulation.setDeviceMetricsOverride', { width: 1320, height: 1400, deviceScaleFactor: 1, mobile: false });
  await send('Page.navigate', { url: BASE + '/clean.html' });
  await wait(2500);

  /* 真走 UI：把内容塞进粘贴框并派发 input（页面是 debounce 500ms） */
  const paste = async (txt) => {
    await ev(`(function(){var p=document.getElementById('paste');p.value=decodeURIComponent(escape(atob(${JSON.stringify(b64(txt))})));p.dispatchEvent(new Event('input',{bubbles:true}));return 1;})()`);
    await wait(900);
  };
  const clickSeg = async (f) => {
    await ev(`(function(){var b=document.querySelector('#outSeg button[data-f="${f}"]');if(!b)return 'NO';b.click();return 'OK';})()`);
    await wait(250);
  };

  console.log('\n【① 双轨双语被认出来并合并】');
  await paste(ASS_BI);
  ok(await ev(`S.fmt`) === 'ass', '识别为 ASS', await ev(`S.fmt`));
  ok(await ev(`!!(S.bi && S.bi.bi)`) === true, '判定为双轨双语');
  ok(await ev(`S.bi.pairs.size`) === 4, '找到 4 组双轨', await ev(`S.bi.pairs.size`));
  ok(await ev(`S.raw.length`) === 4, '合并后 4 条（8 条 → 4 条）', await ev(`S.raw.length`));
  ok(await ev(`getComputedStyle(document.getElementById('biBar')).display`) !== 'none',
     '双语提示条真的显示出来了');
  ok(String(await ev(`document.getElementById('biTxt').textContent`)).indexOf('4') >= 0,
     '提示条里写了组数', await ev(`document.getElementById('biTxt').textContent`));

  console.log('\n【② 导出的 SRT 是「一条两行」，不是两条同时间轴】');
  const srt = await ev(`outMain()`);
  ok(/\r\n/.test(srt), 'SRT 行尾是 CRLF');
  const blocks = srt.split('\r\n\r\n').filter(b => b.trim());
  ok(blocks.length === 3, '3 个条目（第 4 组是纯水印，整条被删）', blocks.length);
  ok(blocks[0].indexOf('Hello there, how are you?\r\n你好啊，你怎么样？') > 0,
     '第 1 条 = 原文在上 + 译文在下（同一条，不是两条）', JSON.stringify(blocks[0]));
  /* 关键：不应存在两条时间轴相同的独立条目 */
  const tsList = blocks.map(b => { const m = b.split('\r\n')[1]; return m || ''; });
  ok(new Set(tsList).size === tsList.length, '没有两条时间轴完全相同的条目（旧实现的致命伤）', tsList.join(' | '));
  ok(srt.indexOf('www.example.com') < 0, '纯水印条目被删掉了');

  console.log('\n【③ 双语里一行是水印 → 只删那一行】');
  await paste(ASS_WM);
  const srt2 = await ev(`outMain()`);
  ok(srt2.indexOf('See you tomorrow.') > 0, '对白保住了（旧实现会连整条一起删）');
  ok(srt2.indexOf('www.example.com') < 0, '水印那一行被删掉了');
  ok(srt2.indexOf('Good night.') > 0 && srt2.indexOf('晚安。') > 0, '其它双语条目不受影响');

  console.log('\n【④ 导出三选：SRT / VTT / ASS】');
  await paste(ASS_BI);
  await clickSeg('vtt');
  ok(await ev(`S.outFmt`) === 'vtt', '切到 VTT');
  const vtt = await ev(`outMain()`);
  ok(/^WEBVTT\r\n/.test(vtt), 'VTT 有 WEBVTT 头', JSON.stringify(vtt.slice(0, 12)));
  ok(await ev(`outExt()`) === '.vtt', '扩展名跟着变 .vtt');

  await clickSeg('ass');
  ok(await ev(`S.outFmt`) === 'ass', 'ASS 按钮在源是 ASS 时可点');
  const ass = await ev(`outMain()`);
  ok(ass.indexOf('[Script Info]') === 0, 'ASS 输出保留 Script Info');
  ok(ass.indexOf('PlayResX: 1920') > 0, '分辨率原样保留');
  ok(ass.indexOf('Style: Default,Arial,54') > 0, 'Default 样式行保留');
  ok(ass.indexOf('Style: CN,Microsoft YaHei,44') > 0, 'CN 样式行保留');
  ok(ass.indexOf('www.example.com') < 0, '被删除的条目整行消失');

  console.log('\n【⑤ ASS 通道把双轨拆回两条，各自沿用自己轨道的 Style】');
  {
    const dls = ass.split('\r\n').filter(l => /^Dialogue:/i.test(l));
    ok(dls.length === 6, '拆回 6 条 Dialogue（3 组 × 2 轨）', dls.length);
    ok(dls[0].indexOf(',Default,') > 0 && dls[0].indexOf('Hello there, how are you?') > 0,
       '第 1 条 = Default 轨 + 原文', dls[0]);
    ok(dls[1].indexOf(',CN,') > 0 && dls[1].indexOf('你好啊，你怎么样？') > 0,
       '第 2 条 = CN 轨 + 译文', dls[1]);
    ok(dls[0].indexOf('\\N') < 0 && dls[1].indexOf('\\N') < 0, '拆开后各自是单行（没有 \N）');
    ok(ass.indexOf('{\\an8}') < 0 && ass.indexOf('{\\i1}') < 0, 'ASS 特效标记被清掉了');
  }

  console.log('\n【⑥ 翻转「译文在上」】');
  await clickSeg('srt');
  const before = await ev(`outMain()`);
  ok(before.indexOf('Hello there, how are you?\r\n你好啊') > 0, '翻转前：原文在上');
  await ev(`(function(){document.getElementById('biFlip').click();return 1;})()`);
  await wait(500);
  const after = await ev(`outMain()`);
  ok(after.indexOf('你好啊，你怎么样？\r\nHello there, how are you?') > 0, '翻转后：译文在上',
     JSON.stringify(after.split('\r\n\r\n')[0]));
  /* ASS 通道里两条轨道的 Style 也要跟着对调 */
  await clickSeg('ass');
  const assF = await ev(`outMain()`);
  const dlsF = assF.split('\r\n').filter(l => /^Dialogue:/i.test(l));
  /* 位置由 Style 的 MarginV 决定（Default 在上 / CN 在下），所以翻转的落点是：
     上面那条轨道写译文、下面那条写原文，Style 保持不变 —— 换 Style 会把 MarginV
     一起换走，译文又被送回下面。 */
  ok(dlsF[0].indexOf(',Default,') > 0 && dlsF[0].indexOf('你好啊') > 0,
     '翻转后：上方轨道（Default）写的是译文', dlsF[0]);
  ok(dlsF[1].indexOf(',CN,') > 0 && dlsF[1].indexOf('Hello there') > 0,
     '翻转后：下方轨道（CN）写的是原文', dlsF[1]);

  console.log('\n【⑦ 单语 ASS 不受影响 + 无异常】');
  {
    const mono = HEAD.concat([
      'Dialogue: 0,0:00:01.30,0:00:03.30,Default,,0,0,0,,{\\an8}Hello there',
      'Dialogue: 0,0:00:04.00,0:00:06.50,Default,,0,0,0,,I am fine.'
    ]).join(NL);
    await paste(mono);
    ok(await ev(`!!(S.bi && S.bi.bi)`) === false, '单语 ASS 不判双语');
    ok(await ev(`getComputedStyle(document.getElementById('biBar')).display`) === 'none',
       '提示条不显示');
    ok(await ev(`S.raw.length`) === 2, '条目数不变', await ev(`S.raw.length`));
  }
  ok(errs.length === 0, '整轮无 JS 异常', errs.slice(0, 2).join(' ; '));

  console.log('\n' + (FAIL ? '✗ 失败 ' + FAIL + ' / 通过 ' + PASS : '✓ 全部通过 ' + PASS));
  ws.close();
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error('E2E 崩了:', e.message); process.exit(1); });
