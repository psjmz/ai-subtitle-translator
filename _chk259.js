/* v0.9.258 本地实测：清洗页对 VTT / ASS 的导入与导出
   用法：先 `PORT=3098 node server.js`，再起 9333 的 headless Chrome，然后 node _chk259.js */
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');
const http = require('http');
const PORT = 9333, BASE = 'http://127.0.0.1:3098';
let P = 0, F = 0;
const ok = (c, m, x) => { c ? P++ : F++; console.log((c ? '  ✓ ' : '  ✗ ') + m + (x !== undefined ? '  → ' + x : '')); };
const wait = ms => new Promise(r => setTimeout(r, ms));
function J(p){ return new Promise((res, rej) => { const r = http.request({ host:'127.0.0.1', port:PORT, path:p, method:'PUT', headers:{Host:'127.0.0.1:'+PORT} }, x => { let d=''; x.on('data',c=>d+=c); x.on('end',()=>{ try{ res(JSON.parse(d)); }catch(e){ rej(new Error(d.slice(0,200))); } }); }); r.on('error', rej); r.end(); }); }

const VTT = ['WEBVTT', '', 'NOTE 说明', '', 'STYLE', '::cue { color: yellow }', '',
  '1', '00:00:01.000 --> 00:00:03.000 align:middle', '<i>Hello there</i>', '',
  '2', '00:00:04.000 --> 00:00:06.000', '[脚步声] GEORGE: 夏天真热', '',
  '3', '00:00:07.000 --> 00:00:09.000', '本字幕由 XX 字幕组提供', '',
  '4', '00:00:10.000 --> 00:00:12.000', 'Visit https://example.com for more', ''].join('\n');

const ASS = ['[Script Info]', 'Title: t', 'ScriptType: v4.00+', 'PlayResY: 1080', '',
  '[V4+ Styles]', 'Format: Name, Fontname, Fontsize', 'Style: Default,Arial,56', '',
  '[Events]', 'Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text',
  'Comment: 0,0:00:00.00,0:00:00.50,Default,,0,0,0,,注释行',
  'Dialogue: 0,0:00:01.00,0:00:03.00,Default,,0,0,0,,{\\an8}Hello world',
  'Dialogue: 0,0:00:04.00,0:00:06.00,Default,,0,0,0,,[脚步声] GEORGE: 夏天真热',
  'Dialogue: 0,0:00:07.00,0:00:09.00,Default,,0,0,0,,Visit https://example.com for more', ''].join('\n');

(async () => {
  const v = await J('/json/new?' + encodeURIComponent(BASE + '/clean.html'));
  const ws = new WebSocket(v.webSocketDebuggerUrl, { perMessageDeflate: false });
  let id = 0; const wt = new Map(); const errs = [];
  await new Promise(r => ws.on('open', r));
  ws.on('message', m => { const g = JSON.parse(m);
    if (g.id && wt.has(g.id)) { const q = wt.get(g.id); wt.delete(g.id); g.error ? q.rej(new Error(JSON.stringify(g.error))) : q.res(g.result); }
    if (g.method === 'Runtime.exceptionThrown') errs.push(((g.params.exceptionDetails.exception||{}).description) || g.params.exceptionDetails.text); });
  const send = (m, p) => new Promise((res, rej) => { const i = ++id; wt.set(i, { res, rej }); ws.send(JSON.stringify({ id:i, method:m, params:p||{} })); });
  const ev = async e => { const r = await send('Runtime.evaluate', { expression:e, returnByValue:true, awaitPromise:true });
    if (r.exceptionDetails) throw new Error((r.exceptionDetails.exception||{}).description || r.exceptionDetails.text); return r.result.value; };
  await send('Page.enable'); await send('Runtime.enable');
  await send('Network.setCacheDisabled', { cacheDisabled: true });
  await send('Emulation.setDeviceMetricsOverride', { width:1280, height:1000, deviceScaleFactor:1, mobile:false });
  await wait(1800);

  const paste = async (txt) => {
    await ev(`(function(){document.getElementById('btnClear').click();
      var p=document.getElementById('paste');p.value=${JSON.stringify(txt)};
      p.dispatchEvent(new Event('input',{bubbles:true}));return 1})()`);
    await wait(900);
  };
  const state = async () => JSON.parse(await ev(`JSON.stringify({
    条数:S.raw.length, fmt:S.fmt, outFmt:S.outFmt,
    okTxt:document.getElementById('ok').textContent, okShow:document.getElementById('ok').style.display,
    badShow:document.getElementById('bad').style.display,
    dlExt:document.getElementById('dlExt').textContent,
    导出:(typeof outMain==='function')?outMain():'' })`));

  console.log('\n— ① 上传区声明 —');
  const acc = await ev("document.getElementById('file').getAttribute('accept')");
  ok(/\.ass/.test(acc) && /\.ssa/.test(acc), 'accept 已放开 .ass / .ssa', acc);
  ok(/\.ass/.test(await ev("document.querySelector('.dz-fmt').textContent")), '文案写明了 .ass',
    await ev("document.querySelector('.dz-fmt').textContent"));
  ok((await ev("typeof CleanCore.parseAss")) === 'function', '引擎已具备 parseAss');
  ok((await ev("typeof CleanCore.formatVtt")) === 'function', '引擎已具备 formatVtt');

  console.log('\n— ② VTT：进得来，出得去 —');
  await paste(VTT);
  let s = await state();
  ok(s.条数 === 4, 'VTT 解析出 4 条', s.条数);
  ok(s.badShow === 'none', '不报错');
  ok(s.outFmt === 'vtt' && s.dlExt === '.vtt', '导出格式跟随源 → .vtt', s.dlExt);
  ok(/^WEBVTT\n/.test(s.导出), '导出内容带 WEBVTT 头', s.导出.slice(0, 20).replace(/\n/g, '\\n'));
  ok(/00:00:01\.000 --> 00:00:03\.000/.test(s.导出), '时间轴是 VTT 的点号毫秒');
  ok(/Hello there/.test(s.导出) && !/<i>/.test(s.导出), '行内 <i> 已被默认去 HTML 规则清掉');
  ok(!/字幕组/.test(s.导出) && !/https:\/\//.test(s.导出), '水印与网址被清掉');

  console.log('\n— ③ ASS：不再拒收，且清洗有效 —');
  await paste(ASS);
  s = await state();
  ok(s.条数 === 3, 'ASS 解析出 3 条（Comment 行不算）', s.条数);
  ok(s.fmt === 'ass', '识别为 ASS', s.fmt);
  ok(s.badShow === 'none', '不再弹「请先导出成 SRT」的拦截', 'bad=' + s.badShow);
  ok(/ASS/.test(s.okTxt) && /SRT/.test(s.okTxt), '提示说明了源格式与导出格式', s.okTxt);
  ok(s.dlExt === '.srt', 'ASS 导出降级为 SRT（清洗剥掉了样式）', s.dlExt);
  ok(!/\{\\an8\}/.test(s.导出), '{\\an8} 特效标签已被清掉');
  ok(/Hello world/.test(s.导出), '正文保留');

  console.log('\n— ④ 清除后回到初始态 —');
  await ev("document.getElementById('btnClear').click()");
  await wait(400);
  ok((await ev("document.getElementById('dlExt').textContent")) === '.srt', '导出扩展名复位 .srt');
  ok((await ev('S.raw.length')) === 0, '内容已清空');

  console.log('\n— ⑤ JS 错误 —');
  ok(errs.length === 0, '全程无 JS 异常', errs.slice(0, 2).join(' | '));

  console.log('\n合计 ' + P + ' ✓ / ' + F + ' ✗');
  ws.close();
})().catch(e => { console.error('crash', e.message); process.exit(1); });
