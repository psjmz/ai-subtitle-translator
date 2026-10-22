/* v0.9.271 出图：清洗页上传 ASS 双语后的界面（双语提示条 + 导出格式三选 + 预览） */
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');
const http = require('http');
const fs = require('fs');
const PORT = 9333, BASE = 'http://127.0.0.1:3098';
const wait = ms => new Promise(r => setTimeout(r, ms));
const J = p => new Promise((res, rej) => { const r = http.request({ host: '127.0.0.1', port: PORT, path: p, method: 'PUT' }, x => { let d = ''; x.on('data', c => d += c); x.on('end', () => { try { res(JSON.parse(d)); } catch (e) { rej(new Error(d.slice(0, 200))); } }); }); r.on('error', rej); r.end(); });
const NL = String.fromCharCode(10);
const b64 = s => Buffer.from(s, 'utf8').toString('base64');

const HEAD = [
  '[Script Info]', 'ScriptType: v4.00+', 'PlayResX: 1920', 'PlayResY: 1080', '',
  '[V4+ Styles]',
  'Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding',
  'Style: Default,Arial,54,&H00FFFFFF,&H000000FF,&H00000000,&H00000000,0,0,0,0,100,100,0,0,1,2,2,2,10,10,60,1',
  'Style: CN,Microsoft YaHei,44,&H00FFFFFF,&H000000FF,&H00000000,&H00000000,0,0,0,0,100,100,0,0,1,2,2,2,10,10,30,1',
  '', '[Events]',
  'Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text'
].join(NL);
const ASS = HEAD + NL + [
  'Dialogue: 0,0:00:01.30,0:00:03.30,Default,,0,0,0,,{\\an8}Hello there, how are you?',
  'Dialogue: 0,0:00:01.30,0:00:03.30,CN,,0,0,0,,{\\an2}你好啊，你怎么样？',
  'Dialogue: 0,0:00:04.00,0:00:06.50,Default,,0,0,0,,{\\i1}I am fine.',
  'Dialogue: 0,0:00:04.00,0:00:06.50,CN,,0,0,0,,我很好。',
  'Dialogue: 0,0:00:07.00,0:00:09.00,Default,,0,0,0,,What time is it?',
  'Dialogue: 0,0:00:07.00,0:00:09.00,CN,,0,0,0,,现在几点了？',
  'Dialogue: 0,0:00:10.00,0:00:12.00,Default,,0,0,0,,www.example.com',
  'Dialogue: 0,0:00:10.00,0:00:12.00,CN,,0,0,0,,本字幕由某某字幕组提供',
  ''
].join(NL);

(async () => {
  const v = await J('/json/new?' + encodeURIComponent('about:blank'));
  const ws = new WebSocket(v.webSocketDebuggerUrl, { perMessageDeflate: false });
  let id = 0; const wt = new Map();
  await new Promise(r => ws.on('open', r));
  ws.on('message', m => { const g = JSON.parse(m); if (g.id && wt.has(g.id)) { const q = wt.get(g.id); wt.delete(g.id); g.error ? q.rej(new Error(JSON.stringify(g.error))) : q.res(g.result); } });
  const send = (m, p) => new Promise((res, rej) => { const i = ++id; wt.set(i, { res, rej }); ws.send(JSON.stringify({ id: i, method: m, params: p || {} })); });
  const ev = async e => { const r = await send('Runtime.evaluate', { expression: e, returnByValue: true, awaitPromise: true }); if (r.exceptionDetails) throw new Error((r.exceptionDetails.exception || {}).description || r.exceptionDetails.text); return r.result.value; };
  await send('Page.enable'); await send('Runtime.enable');
  await send('Network.setCacheDisabled', { cacheDisabled: true });
  await send('Emulation.setDeviceMetricsOverride', { width: 1180, height: 1500, deviceScaleFactor: 2, mobile: false });
  await send('Page.navigate', { url: BASE + '/clean.html' });
  await wait(2500);

  await ev(`(function(){var p=document.getElementById('paste');p.value=decodeURIComponent(escape(atob(${JSON.stringify(b64(ASS))})));p.dispatchEvent(new Event('input',{bubbles:true}));return 1;})()`);
  await wait(1200);
  await ev(`window.scrollTo(0,0)`);
  await wait(300);

  /* 取景：从上传卡片底部到导出按钮行 */
  const clip = JSON.parse(await ev(`JSON.stringify((function(){
    var a=document.getElementById('upCard'), b=document.querySelector('.btn-row');
    var ra=a.getBoundingClientRect(), rb=b.getBoundingClientRect();
    return {x:Math.max(0,ra.x+window.scrollX-14), y:Math.max(0,ra.y+window.scrollY-14),
            width:ra.width+28, height:Math.min(2400,(rb.bottom-ra.top)+36), scale:2};
  })())`));
  const r = await send('Page.captureScreenshot', { format: 'png', clip: clip });
  const out = '/Users/jp/WorkBuddy/2026-09-04-00-29-54/ui-redesign/v271-bilingual.png';
  fs.writeFileSync(out, Buffer.from(r.data, 'base64'));
  console.log('出图 ' + out + '  ' + fs.statSync(out).size + ' B');
  console.log('clip: ' + JSON.stringify(clip));
  ws.close();
  process.exit(0);
})().catch(e => { console.error('崩了:', e.message); process.exit(1); });
