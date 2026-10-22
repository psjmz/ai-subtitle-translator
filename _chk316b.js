/* _chk316b.js —— v0.9.316 batch 页真浏览器验证（非交付件）
   多文件上传（好坏混合）、清单渲染、移除、目标格式切换、ZIP 打包、语言切换、URL 前缀。 */
'use strict';
process.on('unhandledRejection', e => { console.log('UNHANDLED', e && e.message); });
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');
const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const ROOT = __dirname;
const SRV = 3530 + Math.floor(Math.random() * 60);
const PORT = 9900 + Math.floor(Math.random() * 90);
const wait = ms => new Promise(r => setTimeout(r, ms));

const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8' };
const srv = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  const m = p.match(/^\/[a-zA-Z]{2,3}(?:-[a-zA-Z]{2,4})?\/(.+)$/);
  if (m && fs.existsSync(path.join(ROOT, m[1]))) p = '/' + m[1];
  const f = path.join(ROOT, p === '/' ? 'batch.html' : p);
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

/* 两条 SRT（一条 2 cue，一条 1 cue 带 1 小时位）+ 一条 VTT + 垃圾 */
const SRT_A = '1\n00:00:01,000 --> 00:00:02,500\nhello\n\n2\n00:00:03,000 --> 00:00:04,500\nworld\n';
const SRT_B = '1\n01:02:03,000 --> 01:02:05,000\nlong one\n';
const VTT_C = 'WEBVTT\n\n00:01.000 --> 00:02.000\nvtt line\n';
const JUNK = 'not a subtitle at all\n###\n';
/* 与 SRT_A 同名（测重名加序号） */
const SRT_A2 = '1\n00:00:10,000 --> 00:00:11,000\nsecond file same name\n';

async function up(files) {
  /* files: [[txt, name], ...] 一次 readFiles 多文件 */
  const arr = files.map(f => 'new File([' + JSON.stringify(f[0]) + '], ' + JSON.stringify(f[1]) + ', {type:"text/plain"})').join(',');
  await ev('(function(){ readFiles([' + arr + ']); })()');
  await wait(600);
}

(async () => {
  await new Promise(r => srv.listen(SRV, '127.0.0.1', r));
  const chrome = spawn(CHROME, ['--headless=new', '--remote-debugging-port=' + PORT, '--no-sandbox', '--disable-gpu',
    '--host-resolver-rules=MAP * ~NOTFOUND, EXCLUDE 127.0.0.1',
    '--lang=zh-CN', '--user-data-dir=/tmp/cr316b-' + Date.now(), 'about:blank'], { stdio: 'ignore' });
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
  await go('http://127.0.0.1:' + SRV + '/batch.html');
  ok(await ev('typeof window.BatchCore') === 'object' && await ev('typeof window.BatchCore.zipFiles') === 'function', '引擎加载（BatchCore）');
  ok(await ev('typeof window.JSZip') === 'function', 'JSZip 本地库加载（UMD 挂全局）', await ev('typeof window.JSZip'));
  ok(await ev('LANG') === 'zh-CN', '默认 zh-CN');
  ok((await ev('document.title')).indexOf('批量转换') >= 0, '标题', await ev('document.title'));
  ok(await ev('document.querySelectorAll("#navPills a").length') === 15, '导航胶囊 15 个（12 老 + 3 新兄弟，不含自己）', await ev('document.querySelectorAll("#navPills a").length'));
  ok(await ev('document.querySelectorAll("h1").length') === 1, '全页恰 1 个 h1');
  ok((await ev('document.querySelector(\'[data-i18n="lblFmt"]\').textContent')) === '认出来的格式', 'lblFmt 词典就位（zh）', await ev('document.querySelector(\'[data-i18n="lblFmt"]\').textContent'));
  ok(await ev('getComputedStyle(document.getElementById("listCard")).display') === 'none'
    && await ev('getComputedStyle(document.getElementById("zipCard")).display') === 'none', '未上传时清单/打包卡隐藏');

  console.log('== ② 多文件上传：好坏混合 ==');
  await up([[SRT_A, 'a.srt'], [SRT_B, 'b.srt'], [VTT_C, 'c.vtt'], [JUNK, 'junk.txt']]);
  ok(await ev('document.getElementById("fmtChip").textContent') === '3 / 4', 'fmtChip 3 / 4', await ev('document.getElementById("fmtChip").textContent'));
  ok(await ev('S.files.length') === 4 && await ev('S.files.filter(function(x){return x.ok}).length') === 3, '状态 4 文件 3 好');
  ok(await ev('document.querySelectorAll("#flist .fitem").length') === 4, '清单 4 行');
  ok(await ev('document.querySelectorAll("#flist .st.bad").length') === 1, '坏文件标红 1 个');
  ok((await ev('document.querySelector("#flist .st.bad").textContent')) === '没认出', '坏文件文案', await ev('document.querySelector("#flist .st.bad").textContent'));
  ok((await ev('document.getElementById("statChip").textContent')).indexOf('3 个文件') === 0 && (await ev('document.getElementById("statChip").textContent')).indexOf('4 个没认出') < 0, '统计条', await ev('document.getElementById("statChip").textContent'));
  ok(await ev('document.getElementById("btnZip").disabled') === false, '有好文件 → 可打包');

  console.log('== ③ 引擎同源对照（页面内转换） ==');
  const vttOut = await ev('(function(){ return C.formatVtt(S.files[0].items); })()');
  ok(vttOut.indexOf('WEBVTT') === 0 && vttOut.indexOf('00:01.000 --> 00:02.500') > 0, 'SRT→VTT 无小时位点号', vttOut.split('\n')[2]);
  const srtOut = await ev('(function(){ return C.formatSrt(S.files[1].items); })()');
  ok(srtOut.indexOf('01:02:03,000 --> 01:02:05,000') > 0, '≥1h SRT 保小时位', srtOut.split('\n')[1]);
  const vttFromVtt = await ev('(function(){ return C.formatVtt(S.files[2].items); })()');
  ok(vttFromVtt.indexOf('00:01.000 --> 00:02.000') > 0, 'VTT 进 VTT 出时间一致');

  console.log('== ④ 移除坏文件 ==');
  await ev('document.querySelector("#flist [data-rm=\'3\']").click()');
  ok(await ev('S.files.length') === 3 && await ev('document.querySelectorAll("#flist .st.bad").length') === 0, '移除后 3 行全好');
  ok(await ev('document.getElementById("fmtChip").textContent') === '3 / 3', 'fmtChip 3 / 3', await ev('document.getElementById("fmtChip").textContent'));

  console.log('== ⑤ 重名加序号 + ZIP 打包 ==');
  await up([[SRT_A2, 'a.srt']]);
  ok(await ev('S.files.length') === 4, '同名第二份进来（共 4）');
  await ev('setTo("vtt")');
  ok((await ev('document.querySelector("#flist .meta").textContent')) === 'SRT → VTT', '目标格式切 VTT', await ev('document.querySelector("#flist .meta").textContent'));
  /* 引擎侧验证重名（页面打包用同一函数） */
  const dup = await ev('(function(){ var taken = []; var names = []; S.files.forEach(function(f){ if (!f.ok) return; var nm = C.targetName(f.name, "vtt", taken); taken.push(nm); names.push(nm); }); return names.join(","); })()');
  ok(dup === 'a.vtt,b.vtt,c.vtt,a-2.vtt', '重名自动加序号', dup);
  /* 真点打包按钮：msgZipDone 出现（下载动作在 headless 里无妨，只验链路） */
  await ev('document.getElementById("btnZip").click()');
  await wait(1200);
  const zm = await ev('(function(){ var m = document.getElementById("msg"); return { vis: getComputedStyle(m).display !== "none", err: m.className.indexOf("err") >= 0, txt: m.textContent }; })()');
  ok(zm.vis && !zm.err && zm.txt.indexOf('4') >= 0, 'ZIP 打包成功提示', zm.txt);

  console.log('== ⑥ 清空 ==');
  await ev('document.getElementById("btnClear").click()');
  ok(await ev('S.files.length') === 0 && await ev('getComputedStyle(document.getElementById("listCard")).display') === 'none', '清除后状态空、卡收起');
  ok(await ev('document.getElementById("fmtChip").textContent') === '—', 'fmtChip 复位 —', await ev('document.getElementById("fmtChip").textContent'));

  console.log('== ⑦ 语言切换 en ==');
  await ev('(function(){ var s = document.getElementById("langSel"); s.value = "en"; s.dispatchEvent(new Event("change")); })()');
  ok((await ev('document.querySelector(\'[data-i18n="lblFmt"]\').textContent')) === 'Recognized format', 'lblFmt 切英文', await ev('document.querySelector(\'[data-i18n="lblFmt"]\').textContent'));
  ok((await ev('document.title')).indexOf('Batch') >= 0, '英文标题', await ev('document.title'));
  ok(await ev('document.getElementById("logoHome").getAttribute("href")') === '/en/', 'logo /en/');
  ok(await ev('localStorage.getItem("batchUiLang")') === 'en', 'localStorage batchUiLang');
  ok(await ev('document.querySelector("#navPills a[href*=table]").getAttribute("href")') === '/en/table.html', '兄弟胶囊 table 带 /en/ 前缀', await ev('document.querySelector("#navPills a[href*=table]").getAttribute("href")'));

  console.log('== ⑧ URL 前缀 /ja/batch.html ==');
  await go('http://127.0.0.1:' + SRV + '/ja/batch.html');
  ok(await ev('LANG') === 'ja', 'URL 前缀优先', await ev('LANG'));
  ok((await ev('document.title')).indexOf('一括変換') >= 0, '日文标题', await ev('document.title'));

  console.log('----');
  console.log('通过 ' + P + ' / 失败 ' + F);
  srv.close(); chrome.kill();
  process.exit(F ? 1 : 0);
})().catch(e => { console.log('FATAL', e && e.stack); srv.close(); process.exit(3); });
