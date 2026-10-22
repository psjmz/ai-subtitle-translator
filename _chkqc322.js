/* _chkqc322.js —— v0.9.322 字幕质检页真浏览器实测（非交付件）
   量三件事，全是上一版跑出来会改坏字幕 / 用户当场提出来的：
     ① 双语 A 形态：应用修复不许把原文与译文串成一行
     ② 单语英文 + 字幕语言选中文：不许按中文的无空格规则把单词腰斩
     ③ 画面方向三档（横屏 42 / 方形 36 / 竖屏 28）：同一句话换个方向结果不一样
   全程盯控制台报错。 */
'use strict';
process.on('unhandledRejection', e => { console.log('UNHANDLED', e && e.message); });
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');
const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const ROOT = '/Users/jp/WorkBuddy/2026-09-04-00-29-54/srt-translator';
const SRV = 3900 + Math.floor(Math.random() * 60);
const PORT = 9970 + Math.floor(Math.random() * 25);
const wait = ms => new Promise(r => setTimeout(r, ms));
/* ⚠️ 用真 server.js：临时静态服没有 /api/tool-event，埋点 404 会被算成页面报错（假红） */
const srv = spawn(process.execPath, ['server.js'], {
  cwd: ROOT,
  env: Object.assign({}, process.env, { PORT: String(SRV), PUBLIC_URL: 'http://127.0.0.1:' + SRV }),
  stdio: 'ignore'
});

let ws, tid = 0; const pending = new Map();
function send(m, p) {
  const id = ++tid; ws.send(JSON.stringify({ id, method: m, params: p || {} }));
  return new Promise((res, rej) => { pending.set(id, { res, rej }); setTimeout(() => { if (pending.has(id)) { pending.delete(id); rej(new Error('timeout ' + m)); } }, 30000); });
}
async function ev(e) {
  const r = await send('Runtime.evaluate', { expression: e, returnByValue: true, awaitPromise: true });
  if (r.exceptionDetails) throw new Error(r.exceptionDetails.text + ' @ ' + e.slice(0, 120));
  return r.result.value;
}
let pass = 0, fail = 0;
const ok = (c, w) => { if (c) { pass++; console.log('  ✓ ' + w); } else { fail++; console.log('  ✗ ' + w); } };

(async () => {
  await wait(1500);
  /* A：双语 A 形态（一行原文一行译文），中文行用半角逗号 */
  const BI = [
    '1', '00:00:01,000 --> 00:00:04,000',
    'This is a very long English line, and it goes past the limit',
    '这是一句同样很长很长很长很长很长的中文,逗号是半角',
    '', ''
  ].join('\n');
  /* B：单语英文长句（够得上 believer 腰斩：definitely 正好在 42 宽附近被切） */
  const EN = [
    '1', '00:00:01,000 --> 00:00:04,000',
    'This is a very long English line that definitely exceeds the limit',
    '', ''
  ].join('\n');
  /* C：中等长度英文（38 字符）—— 横屏 42 装得下，方形 36 / 竖屏 28 装不下。
     ⚠️ 别选正好等于某一档上限的句子（卡边界的用例改一行就翻脸） */
  const MID = [
    '1', '00:00:01,000 --> 00:00:04,000',
    'This line has thirty eight or so chars',
    '', ''
  ].join('\n');
  const fBi = '/tmp/_qc322_bi.srt', fEn = '/tmp/_qc322_en.srt', fMid = '/tmp/_qc322_mid.srt';
  fs.writeFileSync(fBi, BI); fs.writeFileSync(fEn, EN); fs.writeFileSync(fMid, MID);

  const chrome = spawn(CHROME, ['--headless=new', '--remote-debugging-port=' + PORT, '--no-sandbox', '--disable-gpu',
    '--host-resolver-rules=MAP * ~NOTFOUND, EXCLUDE 127.0.0.1',
    '--lang=zh-CN', '--user-data-dir=/tmp/crqc322-' + Date.now(), 'about:blank'], { stdio: 'ignore' });
  await wait(2000);
  let tgt = null;
  for (let i = 0; i < 30 && !tgt; i++) {
    try {
      const r = await new Promise((res, rej) => { const q = http.get({ host: '127.0.0.1', port: PORT, path: '/json/list' }, s => { let d = ''; s.on('data', c => d += c); s.on('end', () => res(JSON.parse(d))); }); q.on('error', rej); q.setTimeout(2000, () => q.destroy(new Error('t'))); });
      tgt = (r || []).find(t => t.type === 'page');
    } catch (e) { await wait(500); }
  }
  if (!tgt) { console.log('浏览器没起来'); process.exit(2); }
  ws = new WebSocket(tgt.webSocketDebuggerUrl, { perMessageDeflate: false });
  await new Promise((r, j) => { ws.on('open', r); ws.on('error', j); });
  ws.on('message', d => { const m = JSON.parse(d); if (m.id && pending.has(m.id)) { pending.get(m.id).res(m.result || m); pending.delete(m.id); } });
  await send('Page.enable'); await send('Runtime.enable'); await send('DOM.enable'); await send('Log.enable');
  const errs = [];
  ws.on('message', d => {
    const m = JSON.parse(d);
    if (m.method === 'Log.entryAdded' && m.params && m.params.entry && /error/i.test(m.params.entry.level)) {
      const e2 = m.params.entry;
      /* ⚠️ 必须拼 url：Log 的 text 只有「Failed to load resource」，
         不带 url 分不出是不是隔离环境的噪音（adsbygoogle / favicon） */
      errs.push(String(e2.text || '').slice(0, 120) + ' @ ' + String(e2.url || '(no url)').slice(0, 120));
    }
    if (m.method === 'Runtime.exceptionThrown' && m.params && m.params.exceptionDetails) {
      errs.push('EXC ' + String((m.params.exceptionDetails.exception && m.params.exceptionDetails.exception.description) || m.params.exceptionDetails.text || '').slice(0, 160));
    }
  });
  await send('Emulation.setDeviceMetricsOverride', { width: 1280, height: 1000, deviceScaleFactor: 1, mobile: false });
  await send('Page.navigate', { url: 'http://127.0.0.1:' + SRV + '/qc.html' });
  for (let i = 0; i < 60; i++) {
    try { const st = await ev('document.readyState + "|" + (!!document.getElementById("btnRun"))'); if (st.indexOf('complete') === 0 && st.indexOf('true') > 0) break; } catch (e) { }
    await wait(200);
  }
  await wait(600);

  const upload = async (file) => {
    await send('Page.reload', { ignoreCache: true });
    await wait(900);
    const { root } = await send('DOM.getDocument', { depth: 0 });
    const { nodeId } = await send('DOM.querySelector', { nodeId: root.nodeId, selector: '#file' });
    await send('DOM.setFileInputFiles', { files: [file], nodeId });
    await wait(800);
  };
  /* 走 UI 真实路径：查 = readTh()+S.on，与 run() 完全同一条 */
  const nRule = async (id) => ev('(function(){var o=readTh();o.on=S.on;return C.check(S.items,o).issues.filter(function(x){return x.r==="' + id + '"}).length})()');
  const setSubLang = async (v) => { await ev('(function(){var s=document.getElementById("subLang");s.value="' + v + '";s.dispatchEvent(new Event("change"))})()'); await wait(300); };
  const setFrame = async (v) => { await ev('(function(){var f=document.getElementById("frameSel");f.value="' + v + '";f.dispatchEvent(new Event("change"))})()'); await wait(500); };
  const clickFix = async () => { await ev('document.getElementById("btnFix").click()'); await wait(700); };

  console.log('\n— ① 页面骨架（含 v0.9.322 新加的画面方向）—');
  ok(await ev('!!document.getElementById("frameSel")'), '画面方向选择框 #frameSel 在');
  const nOpt = await ev('document.querySelectorAll("#frameSel option").length');
  ok(nOpt === 3, '画面方向三档选项（实测 ' + nOpt + ' 个）');
  ok(await ev('document.getElementById("frameSel").value') === 'land', '默认落在横屏');
  ok(await ev('document.querySelectorAll("#thBox input").length') === 5, '五个阈值输入框都生成了');

  console.log('\n— ② 双语 A 形态：折完不许把原文和译文串到一行 —');
  await upload(fBi);
  ok(await ev('C.isBilingualA(S.items[0])') === true, '第一条被认成双语 A 形态');
  await setSubLang('zh-CN');
  const before = await ev('JSON.stringify(S.items[0].tx)');
  console.log('     改前：' + before);
  await ev('(function(){var r=C.check(S.items,Object.assign(readTh(),{on:S.on}));document.getElementById("btnRun").click();})()');
  await wait(700);
  await clickFix();
  const after = await ev('JSON.stringify(S.items[0].tx)');
  console.log('     改后：' + after);
  ok(after !== before, '这一版确实动了内容（否则下面的断言是空转）');
  const lines = JSON.parse(after);
  ok(lines.length === 2, '双语仍是两行（实测 ' + lines.length + ' 行）');
  /* 两行的语言属性必须各自保得住：改前是纯英文/纯中文，改后还得是 */
  const wasEn = JSON.parse(before)[0], wasZh = JSON.parse(before)[1];
  ok(wasEn.indexOf('这') < 0 && lines[0].indexOf('这') < 0, '英文行始终是纯英文');
  ok(wasZh.indexOf('English') < 0 && lines[1].indexOf('English') < 0, '中文行始终不含英文');

  console.log('\n— ③ 双语：语言专属标点只修中文那一行 —');
  await upload(fBi);
  await setSubLang('zh-CN');
  ok((await nRule('rPun')) === 1, 'check 报了 1 条 rPun（中文行半角逗号）');
  await ev('(function(){var b=document.querySelector(\'#fixBox [data-fix="rPun"]\');if(b&&!b.checked)b.click();})()');
  await wait(200);
  await clickFix();
  const bi2 = JSON.parse(await ev('JSON.stringify(S.items[0].tx)'));
  ok(bi2[0].indexOf(',') > 0, '英文行的半角逗号原样保留：' + bi2[0]);
  ok(bi2[1].indexOf('，') > 0, '中文行的半角逗号被改成全角：' + bi2[1]);

  console.log('\n— ④ 单语英文 + 字幕语言选中文：不许把单词腰斩 —');
  await upload(fEn);
  const autoLang = await ev('document.getElementById("sysChip").textContent');
  console.log('     自动识别：' + autoLang);
  await setSubLang('zh-CN');   /* 故意「选错」：内容其实是英文 */
  await clickFix();
  const enLines = JSON.parse(await ev('JSON.stringify(S.items[0].tx)'));
  console.log('     折后：' + JSON.stringify(enLines));
  ok(enLines.length <= 2, '折后不超过两行（实测 ' + enLines.length + ' 行）');
  const allWords = enLines.join(' ').split(/\s+/);
  ok(allWords.indexOf('definitely') >= 0, 'definitely 保持完整，没被切成两半');
  ok(!allWords.some(w => w === 'defi' || w === 'nitely'), '没有折出 defi / nitely 这种半截词');
  ok(enLines.every(l => l.length === 0 || /^[A-Za-z]/.test(l)), '每行都以完整单词开头');

  console.log('\n— ⑤ 画面方向三档：同一句话换个方向结论要变 —');
  await upload(fMid);
  await setSubLang('en');
  const wide = await ev('C.widthOf(S.items[0].tx[0])');
  console.log('     这句话宽度 ' + wide + '（半角单位）');
  ok(wide > 36 && wide < 42, '这句话的宽度得落在方形与横屏之间（这三档差异才看得出：' + wide + '）');
  await ev('document.getElementById("btnRun").click()'); await wait(600);
  await setFrame('land');
  const wL = await ev('document.getElementById("th_maxLineW").value');
  const rL = await nRule('rWid');
  ok(wL === '42' && rL === 0, '横屏 42：' + wide + ' 宽装得下，不报行太长（实测 ' + rL + ' 条）');
  await setFrame('square');
  const wS = await ev('document.getElementById("th_maxLineW").value');
  const rS = await nRule('rWid');
  ok(wS === '36' && rS === 1, '方形 36：装不下，报行太长（实测宽度上限 ' + wS + ' / ' + rS + ' 条）');
  await setFrame('port');
  const wP = await ev('document.getElementById("th_maxLineW").value');
  const rP = await nRule('rWid');
  ok(wP === '28' && rP === 1, '竖屏 28：更装不下（实测宽度上限 ' + wP + ' / ' + rP + ' 条）');
  /* 其余阈值不许跟着画面方向动 */
  await setFrame('land');
  const restLand = await ev('["maxCpsW","minDur","maxDur","maxLines"].map(function(k){return document.getElementById("th_"+k).value}).join("/")');
  await setFrame('port');
  const restPort = await ev('["maxCpsW","minDur","maxDur","maxLines"].map(function(k){return document.getElementById("th_"+k).value}).join("/")');
  ok(restLand === restPort, '换方向只动行宽：读速/停留/行数不变（' + restLand + ' vs ' + restPort + '）');
  /* 切方向后报告自动重算（不清空报告区、也不要求用户手点） */
  const repAlive = await ev('document.getElementById("repCard").style.display !== "none" && (!!S.res)');
  ok(repAlive, '换画面方向后自动按新行宽重算了一遍');

  console.log('\n— ⑥ 双语说明与画面方向说明都在页面上 —');
  await ev('(function(){var s=document.getElementById("langSel");s.value="zh-CN";s.dispatchEvent(new Event("change"))})()');
  await wait(400);
  const hints = await ev('Array.from(document.querySelectorAll(".hint")).map(function(x){return x.textContent}).join("|")');
  ok(hints.indexOf('画面方向') > 0 || hints.indexOf('竖屏') >= 0, '页面上有画面方向的说明文案');
  ok(hints.indexOf('双语') >= 0, '页面上有双语折行的说明文案');

  console.log('\n— ⑦ 控制台 —');
  /* ⚠️ 浏览器是断网的（host-resolver 只放行 127.0.0.1）：
     adsbygoogle 的 ERR_NAME_NOT_RESOLVED 与 favicon 404 是隔离噪音，不算页面问题 */
  const noise = /pagead2\.googlesyndication|adsbygoogle|googletagmanager|gtag|favicon/i;
  const real = errs.filter(x => !noise.test(x));
  if (errs.length) console.log('     全部日志（含噪音）：' + errs.slice(0, 5).join(' | ').slice(0, 300));
  ok(real.length === 0, '控制台零真实报错' + (real.length ? '：' + real.slice(0, 3).join(' | ') : ''));

  console.log('\n结果：' + pass + ' 通过 / ' + fail + ' 失败');
  try { srv.kill(); } catch (e) { }
  chrome.kill();
  process.exit(fail ? 1 : 0);
})();
