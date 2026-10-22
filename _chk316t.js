/* _chk316t.js —— v0.9.316 table 页真浏览器验证（非交付件）
   转表格（SRT→预览/CSV/XLSX 引擎）、转字幕（CSV/XLSX→SRT/VTT）、坏文件、语言切换、URL 前缀。 */
'use strict';
process.on('unhandledRejection', e => { console.log('UNHANDLED', e && e.message); });
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');
const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const ROOT = __dirname;
const SRV = 3470 + Math.floor(Math.random() * 60);
const PORT = 9800 + Math.floor(Math.random() * 90);
const wait = ms => new Promise(r => setTimeout(r, ms));

const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8' };
const srv = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  const m = p.match(/^\/[a-zA-Z]{2,3}(?:-[a-zA-Z]{2,4})?\/(.+)$/);
  if (m && fs.existsSync(path.join(ROOT, m[1]))) p = '/' + m[1];
  const f = path.join(ROOT, p === '/' ? 'table.html' : p);
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

/* 6 条 SRT，0-12s */
let SRT6 = '';
for (let i = 0; i < 6; i++) {
  const t = s => { const m = Math.floor(s / 60), sec = Math.floor(s % 60), ms = Math.round((s % 1) * 1000); return '00:' + String(m).padStart(2, '0') + ':' + String(sec).padStart(2, '0') + ',' + String(ms).padStart(3, '0'); };
  SRT6 += (i + 1) + '\n' + t(i * 2) + ' --> ' + t(i * 2 + 1.5) + '\n第' + (i + 1) + '句台词\n\n';
}
/* CSV：引号包时间（模拟我们自己的导出） */
const CSV3 = '#,Start,End,Text\r\n1,"00:00:01,000","00:00:02,500","line one"\r\n2,"00:00:03,000","00:00:04,500","line two"\r\n3,"00:00:05,000","00:00:06,500","line three"\r\n';
const JUNK = 'just some text, not anything usable\n1,2,3\n';

async function up(txt, name, type) {
  await ev('(function(){ var f = new File([' + JSON.stringify(txt) + '], ' + JSON.stringify(name) + ', {type:' + JSON.stringify(type || 'text/plain') + '}); readFile(f); })()');
  await wait(500);
}
/* XLSX 上传：页面里用引擎生成 ArrayBuffer 再包成 File（FileReader readAsArrayBuffer 路径） */
async function upXlsx() {
  await ev('(function(){ var items = C.parseSrt(' + JSON.stringify(SRT6) + '); var buf = C.toXlsx(items); var f = new File([buf], "made.xlsx", {type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"}); readFile(f); })()');
  await wait(700);
}

(async () => {
  await new Promise(r => srv.listen(SRV, '127.0.0.1', r));
  const chrome = spawn(CHROME, ['--headless=new', '--remote-debugging-port=' + PORT, '--no-sandbox', '--disable-gpu',
    '--host-resolver-rules=MAP * ~NOTFOUND, EXCLUDE 127.0.0.1',
    '--lang=zh-CN', '--user-data-dir=/tmp/cr316t-' + Date.now(), 'about:blank'], { stdio: 'ignore' });
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
  await go('http://127.0.0.1:' + SRV + '/table.html');
  ok(await ev('typeof window.TableCore') === 'object' && await ev('typeof window.TableCore.toXlsx') === 'function', '引擎加载（TableCore）');
  ok(await ev('typeof window.XLSX') === 'object' && await ev('window.XLSX.version') === '0.20.3', 'SheetJS 本地库加载 0.20.3', await ev('typeof window.XLSX === "object" ? window.XLSX.version : "missing"'));
  ok(await ev('LANG') === 'zh-CN', '默认 zh-CN');
  ok((await ev('document.title')).indexOf('Excel') >= 0, '标题', await ev('document.title'));
  ok(await ev('document.querySelectorAll("#navPills a").length') === 15, '导航胶囊 15 个（12 老 + 3 新兄弟，不含自己）');
  ok(await ev('getComputedStyle(document.getElementById("ttCard")).display') === 'none'
    && await ev('getComputedStyle(document.getElementById("tsCard")).display') === 'none', '未上传时两卡隐藏');
  ok(await ev('document.querySelectorAll("h1").length') === 1, '全页恰 1 个 h1');
  ok((await ev('document.querySelector(\'[data-i18n="lblFmt"]\').textContent')) === '认出来的格式', 'lblFmt 词典就位（zh）', await ev('document.querySelector(\'[data-i18n="lblFmt"]\').textContent'));

  console.log('== ② 转表格：上传 SRT → 预览 ==');
  await up(SRT6, 'sub.srt');
  ok(await ev('document.getElementById("fmtChip").textContent') === 'SRT · 6', 'fmtChip 识别 SRT · 6', await ev('document.getElementById("fmtChip").textContent'));
  ok(await ev('getComputedStyle(document.getElementById("ttCard")).display') !== 'none', 'ttCard 出现');
  ok(await ev('document.querySelectorAll("#prev tr").length') === 7, '预览表 1 表头 + 6 行', await ev('document.querySelectorAll("#prev tr").length'));
  ok((await ev('document.querySelector("#prev .ttx").textContent')).indexOf('第1句台词') >= 0, '首行文本在预览');
  ok((await ev('document.querySelector("#prev .ttime").textContent')).indexOf('00:00:00,000') >= 0, '时间列 SRT 风格', await ev('document.querySelector("#prev .ttime").textContent'));

  console.log('== ③ 引擎同源对照（CSV/XLSX 内容） ==');
  const csvOut = await ev('C.toCsv(S.sub)');
  ok(csvOut.indexOf('"00:00:00,000","00:00:01,500"') > 0, 'CSV 时间戳引号保护', csvOut.split('\r\n')[1]);
  const xlsxRound = await ev('(function(){ var rows = C.fromRows(C.fromXlsx(C.toXlsx(S.sub))); return rows.items.length; })()');
  ok(xlsxRound === 6, '页面内 XLSX 写读回环 6 条', xlsxRound);

  console.log('== ④ 切转字幕模式 ==');
  await ev('setMode("toSub")');
  ok(await ev('document.getElementById("file").accept') === '.csv,.xlsx,.xls', 'accept 切表格类', await ev('document.getElementById("file").accept'));
  ok((await ev('document.getElementById("dzTxt").textContent')).indexOf('表格') >= 0, '上传区文案切换');
  ok(await ev('getComputedStyle(document.getElementById("ttCard")).display') === 'none', '切模式清空后 ttCard 收起');
  ok(await ev('S.sub') === null && await ev('S.items') === null, '切模式清空状态');

  console.log('== ⑤ CSV → SRT ==');
  await up(CSV3, 'table.csv', 'text/csv');
  ok(await ev('document.getElementById("fmtChip").textContent') === 'CSV · 3', 'fmtChip CSV · 3', await ev('document.getElementById("fmtChip").textContent'));
  ok(await ev('getComputedStyle(document.getElementById("tsCard")).display') !== 'none', 'tsCard 出现');
  const out1 = await ev('document.getElementById("out").value');
  ok(out1.indexOf('00:00:01,000 --> 00:00:02,500') > 0 && out1.indexOf('line one') > 0, 'CSV→SRT 时间/文本正确', out1.split('\n').slice(0, 3).join(' | '));

  console.log('== ⑥ XLSX → SRT（FileReader ArrayBuffer 路径） ==');
  await ev('document.getElementById("btnClear").click();');
  await upXlsx();
  ok(await ev('document.getElementById("fmtChip").textContent') === 'XLSX · 6', 'fmtChip XLSX · 6', await ev('document.getElementById("fmtChip").textContent'));
  const out2 = await ev('document.getElementById("out").value');
  ok(out2.indexOf('第3句台词') > 0 && out2.indexOf('00:00:04,000 --> 00:00:05,500') > 0, 'XLSX→SRT 内容正确');

  console.log('== ⑦ VTT 导出 ==');
  await ev('setFmt("vtt")');
  ok((await ev('document.getElementById("out").value')).indexOf('WEBVTT') === 0, 'VTT 头在位');
  ok((await ev('document.getElementById("out").value')).indexOf('00:00.000 --> 00:01.500') > 0, 'VTT 点号时间戳');

  console.log('== ⑧ 坏文件 ==');
  await ev('setMode("toTable");');
  await up(JUNK, 'garbage.txt');
  const m1 = await ev('(function(){ var m = document.getElementById("msg"); return { vis: getComputedStyle(m).display !== "none", err: m.className.indexOf("err") >= 0, txt: m.textContent }; })()');
  ok(m1.vis && m1.err, '垃圾文件报错', m1.txt);
  await ev('setMode("toSub");');
  await up(JUNK, 'garbage2.txt');
  const m2 = await ev('(function(){ var m = document.getElementById("msg"); return { vis: getComputedStyle(m).display !== "none", err: m.className.indexOf("err") >= 0, txt: m.textContent }; })()');
  ok(m2.vis && m2.err, '转字幕方向坏文件报错', m2.txt);

  console.log('== ⑨ 语言切换 en ==');
  await ev('document.getElementById("btnClear").click(); setMode("toTable");');
  await ev('(function(){ var s = document.getElementById("langSel"); s.value = "en"; s.dispatchEvent(new Event("change")); })()');
  ok((await ev('document.querySelector(\'[data-i18n="lblFmt"]\').textContent')) === 'Recognized format', 'lblFmt 切英文（修复验证）', await ev('document.querySelector(\'[data-i18n="lblFmt"]\').textContent'));
  ok((await ev('document.title')).indexOf('Excel') >= 0, '英文标题', await ev('document.title'));
  ok(await ev('document.getElementById("logoHome").getAttribute("href")') === '/en/', 'logo /en/');
  ok(await ev('localStorage.getItem("tableUiLang")') === 'en', 'localStorage tableUiLang');

  console.log('== ⑩ URL 前缀 /ja/table.html ==');
  await go('http://127.0.0.1:' + SRV + '/ja/table.html');
  ok(await ev('LANG') === 'ja', 'URL 前缀优先', await ev('LANG'));
  ok((await ev('document.title')).indexOf('Excel') >= 0, '日文标题', await ev('document.title'));

  console.log('----');
  console.log('通过 ' + P + ' / 失败 ' + F);
  srv.close(); chrome.kill();
  process.exit(F ? 1 : 0);
})().catch(e => { console.log('FATAL', e && e.stack); srv.close(); process.exit(3); });
