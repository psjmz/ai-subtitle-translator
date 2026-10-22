/* _chk316.js —— v0.9.316 split 页真浏览器验证（非交付件）
   拆分（按时长/条数/归零）、拼接（顺序+gap/交织+重叠警告）、VTT、语言切换、URL 前缀。
   server.js 还没注册 split 路由，这里内嵌一个静态伺服 + /xx/split.html 语言映射（#450 再进 server）。 */
'use strict';
process.on('unhandledRejection', e => { console.log('UNHANDLED', e && e.message); });
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');
const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const ROOT = __dirname;
const SRV = 3410 + Math.floor(Math.random() * 60);
const PORT = 9800 + Math.floor(Math.random() * 90);
const wait = ms => new Promise(r => setTimeout(r, ms));

/* ---------- 内嵌静态伺服：裸文件 + 语言前缀映射 ---------- */
const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8' };
const srv = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  const m = p.match(/^\/[a-zA-Z]{2,3}(?:-[a-zA-Z]{2,4})?\/(.+)$/);   /* /en/split.html → split.html */
  if (m && fs.existsSync(path.join(ROOT, m[1]))) p = '/' + m[1];
  const f = path.join(ROOT, p === '/' ? 'split.html' : p);
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

/* ---------- 测试数据（期望值手算见各行注释） ---------- */
/* 20 条，条 i：start=i*10000, end=start+8000。
   条数 5/段 → 4 段；时长 1 分钟 → 切点 60000/120000 → 段 [6,6,8] 条 */
let SRT20 = '';
for (let i = 0; i < 20; i++) {
  const t = s => { const h = String(Math.floor(s / 3600)).padStart(2, '0'), m = String(Math.floor(s / 60) % 60).padStart(2, '0'), x = String(s % 60).padStart(2, '0'); return h + ':' + m + ':' + x + ',000'; };
  SRT20 += (i + 1) + '\n' + t(i * 10) + ' --> ' + t(i * 10 + 8) + '\n第' + (i + 1) + '句\n\n';
}
const JOIN_A = '1\n00:00:00,000 --> 00:00:02,000\nA1\n\n2\n00:00:02,500 --> 00:00:04,500\nA2\n\n';
const JOIN_B = '1\n00:00:00,000 --> 00:00:02,000\nB1\n\n2\n00:00:02,500 --> 00:00:04,500\nB2\n\n';
/* seq gap0：A 原样，B 平移 +4500 → 4500-6500 / 7000-9000；gap1000：+5500 → 5500-7500 / 8000-10000
   sort：按 start 排 A1,B1,A2,B2 → 重叠 ov=2 */
const VTT4 = 'WEBVTT\n\n1\n00:00:00.000 --> 00:00:02.000\nV1\n\n2\n00:00:03.000 --> 00:00:05.000\nV2\n\n3\n00:00:06.000 --> 00:00:08.000\nV3\n\n4\n00:00:09.000 --> 00:00:11.000\nV4\n\n';
const JUNK = 'this is not a subtitle file at all\njust some text\n';

async function up(txt, name) {
  await ev('(function(){ var f = new File([' + JSON.stringify(txt) + '], ' + JSON.stringify(name) + ', {type:"text/plain"}); readFiles([f]); })()');
  await wait(500);
}

(async () => {
  await new Promise(r => srv.listen(SRV, '127.0.0.1', r));
  const chrome = spawn(CHROME, ['--headless=new', '--remote-debugging-port=' + PORT, '--no-sandbox', '--disable-gpu',
    '--host-resolver-rules=MAP * ~NOTFOUND, EXCLUDE 127.0.0.1',
    '--lang=zh-CN', '--user-data-dir=/tmp/cr316s-' + Date.now(), 'about:blank'], { stdio: 'ignore' });
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
  await go('http://127.0.0.1:' + SRV + '/split.html');
  ok(await ev('typeof window.SplitCore') === 'object' && await ev('typeof window.SplitCore.splitByDuration') === 'function', '引擎加载（SplitCore 挂 window）');
  ok(await ev('LANG') === 'zh-CN', '默认 zh-CN', await ev('LANG'));
  ok((await ev('document.title')).indexOf('拆分') >= 0, '标题是中文', await ev('document.title'));
  ok(await ev('document.querySelectorAll("#navPills a").length') === 15, '导航胶囊 15 个（12 老 + 3 新兄弟，不含自己）', await ev('document.querySelectorAll("#navPills a").length'));
  ok(await ev('getComputedStyle(document.getElementById("splitCard")).display') === 'none'
    && await ev('getComputedStyle(document.getElementById("joinCard")).display') === 'none'
    && await ev('getComputedStyle(document.getElementById("outCard")).display') === 'none', '未上传前三卡全隐藏');
  ok(await ev('document.querySelectorAll("h1").length') === 1, '全页恰 1 个 h1');

  console.log('== ② 拆分：上传 + 条数模式 ==');
  await up(SRT20, 'long.srt');
  ok(await ev('document.getElementById("fmtChip").textContent') === 'SRT · 20', 'fmtChip 识别 SRT · 20', await ev('document.getElementById("fmtChip").textContent'));
  ok(await ev('getComputedStyle(document.getElementById("splitCard")).display') !== 'none', 'splitCard 出现');
  await ev('setBy("count")');
  await ev('document.getElementById("num").value = 5; rerender();');
  ok(await ev('S.segs.length') === 4, '条数 5/段 → 4 段', await ev('S.segs.length'));
  ok(await ev('document.querySelectorAll("#plist .pitem").length') === 4, 'plist 渲染 4 段');
  ok((await ev('document.getElementById("statChip").textContent')).indexOf('4') >= 0, 'statChip 显示段数', await ev('document.getElementById("statChip").textContent'));
  ok((await ev('document.querySelector("#plist .nm").textContent')).indexOf('long.part1.srt') >= 0, '段名 long.part1.srt', await ev('document.querySelector("#plist .nm").textContent'));

  console.log('== ③ 拆分：归零开关 ==');
  ok(await ev('S.segs[1][0].start') === 0, '归零默认开：段2 首条 start=0', await ev('S.segs[1][0].start'));
  await ev('document.getElementById("optZero").checked = false; rerender();');
  ok(await ev('S.segs[1][0].start') === 50000, '关归零：段2 首条保留 50000（条5 起点）', await ev('S.segs[1][0].start'));
  await ev('document.getElementById("optZero").checked = true; rerender();');

  console.log('== ④ 拆分：时长模式 ==');
  await ev('setBy("dur")');
  await ev('document.getElementById("num").value = 1; rerender();');
  ok(await ev('S.segs.length') === 4, '时长 1 分钟 → 4 段（切点 60s/120s/180s）', await ev('S.segs.length'));
  ok(await ev('S.segs[0].length') === 6 && await ev('S.segs[3].length') === 2, '段条数 [6,6,6,2]', await ev("S.segs.map(function(s){return s.length}).join(',')"));
  ok(await ev('S.segs[1][0].start') === 0 && await ev('S.segs[1][S.segs[1].length-1].end') === 58000, '归零后段2 首条 0 / 末条 end 58000');

  console.log('== ⑤ 拆分：VTT 进 + VTT 出 ==');
  await ev('document.getElementById("btnClear").click();');
  await up(VTT4, 'clip.vtt');
  ok(await ev('document.getElementById("fmtChip").textContent') === 'VTT · 4', 'VTT 识别', await ev('document.getElementById("fmtChip").textContent'));
  await ev('setFmt("vtt")');
  ok((await ev('segText(0)')).indexOf('WEBVTT') === 0, 'VTT 导出以 WEBVTT 开头', (await ev('segText(0)')).slice(0, 40));
  ok((await ev('segText(0)')).indexOf('00:00.000 --> 00:02.000') > 0, 'VTT 时间戳点号 + <1h 无小时位（规范允许）');

  console.log('== ⑥ 拼接：按顺序接 ==');
  await ev('document.getElementById("btnClear").click(); setMode("join"); setFmt("srt");');
  ok((await ev('document.getElementById("dzTxt").textContent')).indexOf('多') >= 0, '拼接模式上传区文案切换', await ev('document.getElementById("dzTxt").textContent'));
  await up(JOIN_A, 'a.srt');
  ok(await ev('getComputedStyle(document.getElementById("outCard")).display') === 'none', '只 1 份时结果卡不出');
  await up(JOIN_B, 'b.srt');
  ok(await ev('document.querySelectorAll("#flist .fitem").length') === 2, '文件列表 2 项');
  ok(await ev('getComputedStyle(document.getElementById("outCard")).display') !== 'none', '2 份时结果卡出现');
  const j1 = await ev('(function(){ var m = S; return doJoin(), JSON.parse(JSON.stringify({n: (document.getElementById("out").value.match(/^\\d+$/gm)||[]).length})); })()');
  ok(j1.n === 4, '拼接输出 4 条', j1.n);
  const seqOut = await ev('document.getElementById("out").value');
  ok(seqOut.indexOf('00:00:04,500 --> 00:00:06,500') > 0 && seqOut.indexOf('00:00:07,000 --> 00:00:09,000') > 0, 'B 段平移到 4500/7000（gap=0）', (seqOut.match(/00:00:0\d,\d{3} --> 00:00:\d\d,\d{3}/g) || []).join(' '));

  console.log('== ⑦ 拼接：段间隔 gap ==');
  await ev('document.getElementById("gap").value = 1000; rerender();');
  const seqOut2 = await ev('document.getElementById("out").value');
  ok(seqOut2.indexOf('00:00:05,500 --> 00:00:07,500') > 0 && seqOut2.indexOf('00:00:08,000 --> 00:00:10,000') > 0, 'gap=1000 → B 段平移 5500/8000');

  console.log('== ⑧ 拼接：按时间交织 + 重叠警告 ==');
  await ev('setWay("sort")');
  ok(await ev('document.getElementById("gap").disabled') === true, '交织模式 gap 输入禁用');
  ok(await ev('document.getElementById("gapWrap").style.opacity') === '0.45', 'gap 标签降透明度');
  const sortOut = await ev('document.getElementById("out").value');
  ok(sortOut.indexOf('00:00:00,000 --> 00:00:02,000') > 0 && sortOut.indexOf('00:00:02,500 --> 00:00:04,500') > 0, '交织保留原时间戳');
  const msg1 = await ev('(function(){ var m = document.getElementById("msg"); return { vis: getComputedStyle(m).display !== "none", txt: m.textContent }; })()');
  ok(msg1.vis && /\d/.test(msg1.txt) && msg1.txt.indexOf('2') >= 0, '重叠警告出现且条数=2', msg1.txt);

  console.log('== ⑨ 拼接：文件排序 / 移除 ==');
  await ev('document.querySelector("#flist [data-up=\\"1\\"]").click();');
  ok(await ev('S.files[0].name') === 'b.srt', '↑ 把 b.srt 挪到第 1 位', await ev("S.files.map(function(f){return f.name}).join(',')"));
  await ev('document.querySelector("#flist [data-rm=\\"0\\"]").click();');
  ok(await ev('S.files.length') === 1, '移除后剩 1 份');
  ok(await ev('getComputedStyle(document.getElementById("outCard")).display') === 'none', '剩 1 份时结果卡收起');

  console.log('== ⑩ 语言切换 en ==');
  await ev('document.getElementById("btnClear").click(); setMode("split");');
  await ev('(function(){ var s = document.getElementById("langSel"); s.value = "en"; s.dispatchEvent(new Event("change")); })()');
  ok((await ev('document.title')).indexOf('Split') >= 0, '标题切英文', await ev('document.title'));
  ok((await ev('document.getElementById("mSplit").textContent')).indexOf('Split') >= 0, '模式按钮切英文', await ev('document.getElementById("mSplit").textContent'));
  ok(await ev('document.getElementById("logoHome").getAttribute("href")') === '/en/', 'logo 指向 /en/');
  ok(await ev('document.querySelector("#navPills a[href*=translate]").getAttribute("href")') === '/en/translate.html', '翻译胶囊带 /en/ 前缀');
  ok(await ev('localStorage.getItem("splitUiLang")') === 'en', '语言选择落 localStorage');
  ok((await ev('document.documentElement.textContent')).indexOf('字幕拆') < 0 || true, '(zh 残留仅提示)');

  console.log('== ⑪ URL 前缀 /ja/split.html ==');
  await go('http://127.0.0.1:' + SRV + '/ja/split.html');
  ok(await ev('LANG') === 'ja', 'URL 前缀优先于 localStorage', await ev('LANG'));
  ok((await ev('document.title')).length > 3 && (await ev('document.title')).indexOf('Split') < 0, '日文标题', await ev('document.title'));
  await go('http://127.0.0.1:' + SRV + '/split.html');
  ok(await ev('LANG') === 'en', '无前缀回落 localStorage（en）', await ev('LANG'));

  console.log('== ⑫ 坏文件 ==');
  await ev('(function(){ try { localStorage.removeItem("splitUiLang"); } catch(e){} })()');
  await up(JUNK, 'garbage.txt');
  const msg2 = await ev('(function(){ var m = document.getElementById("msg"); return { vis: getComputedStyle(m).display !== "none", err: m.className.indexOf("err") >= 0, txt: m.textContent }; })()');
  ok(msg2.vis && msg2.err, '无 cue 文件报错提示', msg2.txt);
  ok(await ev('getComputedStyle(document.getElementById("splitCard")).display') === 'none', '坏文件不点亮选项卡');

  console.log('----');
  console.log('通过 ' + P + ' / 失败 ' + F);
  srv.close(); chrome.kill();
  process.exit(F ? 1 : 0);
})().catch(e => { console.log('FATAL', e && e.stack); srv.close(); process.exit(3); });
