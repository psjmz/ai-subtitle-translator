/* _chk316l.js —— v0.9.316 lrc 页真浏览器验证（非交付件）
   纯文本/LRC 双路解析、音频加载、tap 打轴/撤销/点行、键盘、导出使能、语言切换。 */
'use strict';
process.on('unhandledRejection', e => { console.log('UNHANDLED', e && e.message); });
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');
const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const ROOT = __dirname;
const SRV = 3670 + Math.floor(Math.random() * 60);
const PORT = 9970 + Math.floor(Math.random() * 25);
const wait = ms => new Promise(r => setTimeout(r, ms));

const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8' };
const srv = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  const m = p.match(/^\/[a-zA-Z]{2,3}(?:-[a-zA-Z]{2,4})?\/(.+)$/);
  if (m && fs.existsSync(path.join(ROOT, m[1]))) p = '/' + m[1];
  const f = path.join(ROOT, p === '/' ? 'lrc.html' : p);
  fs.readFile(f, (e, d) => {
    if (e) { res.writeHead(404); res.end('nf'); return; }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream' });
    res.end(d);
  });
});

let ws, tid = 0; const pending = new Map();
function send(m, p) {
  const id = ++tid; ws.send(JSON.stringify({ id, method: m, params: p || {} }));
  return new Promise((res, rej) => { pending.set(id, { res, rej }); setTimeout(() => { if (pending.has(id)) { pending.delete(id); rej(new Error('timeout ' + m)); } }, 30000); });
}
async function ev(e) {
  const r = await send('Runtime.evaluate', { expression: e, returnByValue: true, awaitPromise: true });
  if (r.exceptionDetails) throw new Error(r.exceptionDetails.text + ' :: ' + (r.exceptionDetails.exception && r.exceptionDetails.exception.description || '').slice(0, 200));
  return r.result.value;
}
let P = 0, F = 0;
const ok = (c, n, x) => { console.log((c ? '  ✓ ' : '  ✗ ') + n + (x !== undefined ? '  [' + String(x).slice(0, 140) + ']' : '')); c ? P++ : F++; };

const LY3 = '第一句歌词\n\n第二句歌词\n第三句歌词\n';
const LRC_IN = '[00:01.50]已有时间的一句\n这句没有时间\n';

/* 最小 WAV：8000Hz 8bit mono 30 秒静音 → audio 可真加载、currentTime 设 12s 不被钳 */
const WAV_B64 = (function () {
  const n = 240000;                      /* 30s @ 8kHz */
  const buf = Buffer.alloc(44 + n);
  buf.write('RIFF', 0); buf.writeUInt32LE(36 + n, 4); buf.write('WAVE', 8);
  buf.write('fmt ', 12); buf.writeUInt32LE(16, 16); buf.writeUInt16LE(1, 20);
  buf.writeUInt16LE(1, 22); buf.writeUInt32LE(8000, 24); buf.writeUInt32LE(8000, 28);
  buf.writeUInt16LE(1, 32); buf.writeUInt16LE(8, 34);
  buf.write('data', 36); buf.writeUInt32LE(n, 40);
  buf.fill(128, 44);                     /* 静音 */
  return buf.toString('base64');
})();

async function upAudio() {
  await ev('(function(){ var bin = atob("' + WAV_B64 + '"); var u8 = new Uint8Array(bin.length); for (var i = 0; i < bin.length; i++) u8[i] = bin.charCodeAt(i); loadAudio(new File([u8], "song.wav", {type:"audio/wav"})); })()');
  await wait(800);
}
async function setLy(txt) {
  await ev('document.getElementById("lyText").value = ' + JSON.stringify(txt) + ';');
}
async function tapAt(sec) {
  await ev('document.getElementById("au").currentTime = ' + sec + ';');
  await ev('tapLine()');
}

(async () => {
  await new Promise(r => srv.listen(SRV, '127.0.0.1', r));
  const chrome = spawn(CHROME, ['--headless=new', '--remote-debugging-port=' + PORT, '--no-sandbox', '--disable-gpu',
    '--host-resolver-rules=MAP * ~NOTFOUND, EXCLUDE 127.0.0.1',
    '--lang=zh-CN', '--autoplay-policy=no-user-gesture-required', '--user-data-dir=/tmp/cr316l-' + Date.now(), 'about:blank'], { stdio: 'ignore' });
  await wait(2000);
  let tgt = null;
  for (let i = 0; i < 30 && !tgt; i++) {
    try {
      const r = await new Promise((res, rej) => { const q = http.get({ host: '127.0.0.1', port: PORT, path: '/json/list' }, s => { let d = ''; s.on('data', c => d += c); s.on('end', () => res(JSON.parse(d))); }); q.on('error', rej); q.setTimeout(2000, () => q.destroy(new Error('t'))); });
      tgt = (r || []).find(t => t.type === 'page');
    } catch (e) { await wait(500); }
  }
  if (!tgt) { console.log('浏览器没起来'); srv.close(); chrome.kill(); process.exit(2); }
  ws = new WebSocket(tgt.webSocketDebuggerUrl, { perMessageDeflate: false });
  await new Promise((r, j) => { ws.on('open', r); ws.on('error', j); });
  ws.on('message', d => { const m = JSON.parse(d); if (m.id && pending.has(m.id)) { pending.get(m.id).res(m.result || m); pending.delete(m.id); } });
  await send('Page.enable'); await send('Runtime.enable');

  async function go(url) {
    await send('Page.navigate', { url });
    for (let i = 0; i < 40; i++) { const st = await ev('document.readyState'); if (st === 'complete') break; await wait(200); }
    await wait(900);
  }

  console.log('== ① 页面加载 ==');
  await go('http://127.0.0.1:' + SRV + '/lrc.html');
  ok(await ev('typeof window.LrcCore') === 'object' && await ev('typeof window.LrcCore.toLrc') === 'function', '引擎加载（LrcCore）');
  ok(await ev('LANG') === 'zh-CN', '默认 zh-CN');
  ok((await ev('document.title')).indexOf('打轴') >= 0, '标题', await ev('document.title'));
  ok(await ev('document.querySelectorAll("#navPills a").length') === 15, '导航胶囊 15 个（12 老 + 3 新兄弟，不含自己）', await ev('document.querySelectorAll("#navPills a").length'));
  ok(await ev('document.querySelectorAll("h1").length') === 1, '全页恰 1 个 h1');
  ok(await ev('getComputedStyle(document.getElementById("tapCard")).display') === 'none'
    && await ev('getComputedStyle(document.getElementById("outCard")).display') === 'none', '未解析时打轴/导出卡隐藏');

  console.log('== ② 空歌词报错 ==');
  await setLy('   ');
  await ev('document.getElementById("btnParse").click();');
  const m1 = await ev('(function(){ var m = document.getElementById("msg"); return { vis: getComputedStyle(m).display !== "none", err: m.className.indexOf("err") >= 0, txt: m.textContent }; })()');
  ok(m1.vis && m1.err, '空歌词 msgNoLy 报错', m1.txt);

  console.log('== ③ 纯文本解析 ==');
  await setLy(LY3);
  await ev('document.getElementById("btnParse").click();');
  ok(await ev('S.lines.length') === 3, '空行跳过 3 句', await ev('S.lines.length'));
  ok(await ev('S.cur') === 0 && await ev('S.lines[0].t') === null, 'cur=0 全未打');
  ok(await ev('getComputedStyle(document.getElementById("tapCard")).display') !== 'none'
    && await ev('getComputedStyle(document.getElementById("outCard")).display') !== 'none', '打轴/导出卡出现');
  ok(await ev('document.querySelectorAll("#llist .lline").length') === 3, '列表 3 行');
  ok(await ev('document.querySelectorAll("#llist .lline.cur").length') === 1, '当前句高亮 1 个');
  ok((await ev('document.getElementById("lyChip").textContent')).indexOf('3') >= 0, '歌词 chip', await ev('document.getElementById("lyChip").textContent'));
  ok(await ev('document.getElementById("btnLrc").disabled') === true, '没打的行 → 导出禁用');

  console.log('== ④ 音频加载 ==');
  await upAudio();
  ok((await ev('document.getElementById("aname").textContent')) === 'song.wav', '音频文件名显示', await ev('document.getElementById("aname").textContent'));
  ok((await ev('document.getElementById("au").src')).indexOf('blob:') === 0, 'audio.src 是 blob');

  console.log('== ⑤ tap 打轴 ==');
  await tapAt(3.5);
  ok(await ev('S.lines[0].t') === 3500, '第一句 t=3500', await ev('S.lines[0].t'));
  ok(await ev('S.cur') === 1, 'cur 前进到 1');
  ok(await ev('document.querySelectorAll("#llist .lline.done").length') === 1, '已打样式 1 个');
  await tapAt(7.25);
  ok(await ev('S.lines[1].t') === 7250, '第二句 t=7250（含小数秒取整）', await ev('S.lines[1].t'));
  ok((await ev('document.getElementById("tapChip").textContent')).indexOf('2') >= 0, '统计条更新', await ev('document.getElementById("tapChip").textContent'));
  ok(await ev('document.getElementById("btnLrc").disabled') === false, '有打的行 → 导出可用');

  console.log('== ⑥ 撤销 ==');
  await ev('undoLine()');
  ok(await ev('S.lines[1].t') === null && await ev('S.cur') === 1, '撤销第二句：t 清空 cur 回退');

  console.log('== ⑦ 点击行打轴 ==');
  await ev('document.getElementById("au").currentTime = 12;');
  await ev('document.querySelector("#llist [data-ln=\'2\']").click();');
  ok(await ev('S.lines[2].t') === 12000, '点第 3 行打 12s', await ev('S.lines[2].t'));
  ok(await ev('S.cur') === 3, 'cur=3（越界安全）');

  console.log('== ⑧ 键盘：Enter 打轴 / textarea 不抢 ==');
  await ev('S.cur = 1;');  /* 回到未打的第 2 句 */
  await ev('document.getElementById("au").currentTime = 9;');
  await ev('document.body.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", code: "Enter", bubbles: true }));');
  ok(await ev('S.lines[1].t') === 9000, 'body 上 Enter 打当前句', await ev('S.lines[1].t'));
  await ev('S.cur = 0; S.lines[0].t = null;');
  await ev('(function(){ var ta = document.getElementById("lyText"); ta.focus(); document.getElementById("au").currentTime = 1; })()');
  await ev('document.getElementById("lyText").dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", code: "Enter", bubbles: true }));');
  ok(await ev('S.lines[0].t') === null, 'textarea 聚焦时 Enter 不打轴');

  console.log('== ⑨ 引擎同源对照（导出内容） ==');
  await ev('S.lines[0].t = 1500; S.lines[1].t = 9000; S.lines[2].t = 12000; rerender();');
  const lrcOut = await ev('C.toLrc(S.lines)');
  ok(lrcOut.indexOf('[00:01.50]第一句歌词') === 0, 'LRC 首行', lrcOut.split('\r\n')[0]);
  ok(lrcOut.indexOf('[00:09.00]第二句歌词') > 0 && lrcOut.indexOf('[00:12.00]第三句歌词') > 0, 'LRC 全 3 句');
  const srtOut = await ev('C.toSrt(S.lines, 2000)');
  ok(srtOut.indexOf('00:00:01,500 --> 00:00:09,000') > 0 && srtOut.indexOf('00:00:12,000 --> 00:00:14,000') > 0, 'SRT 时长到下一句、末句兜底 2s');

  console.log('== ⑩ LRC 导入（已有时间） ==');
  await setLy(LRC_IN);
  await ev('document.getElementById("btnParse").click();');
  ok(await ev('S.lines.length') === 2 && await ev('S.lines[0].t') === 1500, 'LRC 时间被读出', await ev('JSON.stringify(S.lines)'));
  ok(await ev('S.cur') === 1, 'cur 从第一句没时间的行开始', await ev('S.cur'));

  console.log('== ⑪ 语言切换 en ==');
  await setLy(LY3);
  await ev('document.getElementById("btnParse").click();');
  await ev('(function(){ var s = document.getElementById("langSel"); s.value = "en"; s.dispatchEvent(new Event("change")); })()');
  ok((await ev('document.title')).indexOf('Lyrics') >= 0, '英文标题', await ev('document.title'));
  ok((await ev('document.getElementById("btnTap").textContent')).indexOf('Stamp') >= 0, '打轴按钮英文', await ev('document.getElementById("btnTap").textContent'));
  ok(await ev('document.getElementById("logoHome").getAttribute("href")') === '/en/', 'logo /en/');
  ok(await ev('localStorage.getItem("lrcUiLang")') === 'en', 'localStorage lrcUiLang');

  console.log('== ⑫ URL 前缀 /ja/lrc.html ==');
  await go('http://127.0.0.1:' + SRV + '/ja/lrc.html');
  ok(await ev('LANG') === 'ja', 'URL 前缀优先', await ev('LANG'));
  ok((await ev('document.title')).indexOf('タイマー') >= 0, '日文标题', await ev('document.title'));

  console.log('----');
  console.log('通过 ' + P + ' / 失败 ' + F);
  srv.close(); chrome.kill();
  process.exit(F ? 1 : 0);
})().catch(e => { console.log('FATAL', e && e.stack); srv.close(); process.exit(3); });
