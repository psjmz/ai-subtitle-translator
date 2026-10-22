/* _chkqc321.js —— v0.9.321 字幕质检页真浏览器实测（非交付件）
   量：上传 → 识别格式/语言 → 阈值随语言变 → 语言专属规则只对有规范的语言显示
       → 跑检查出报告 → 应用修复 → 切界面语言。全程盯控制台报错。 */
'use strict';
process.on('unhandledRejection', e => { console.log('UNHANDLED', e && e.message); });
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');
const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const ROOT = '/Users/jp/WorkBuddy/2026-09-04-00-29-54/srt-translator';
const SRV = 3900 + Math.floor(Math.random() * 60);
const PORT = 9970 + Math.floor(Math.random() * 25);
const wait = ms => new Promise(r => setTimeout(r, ms));
/* ⚠️ 用真 server.js，不用临时静态服：拿不到 /api/tool-event 会 404，
   把埋点 404 当页面报错属于假红（上一轮就踩过）。 */
const srv = spawn(process.execPath, ['server.js'], {
  cwd: ROOT,
  env: Object.assign({}, process.env, { PORT: String(SRV), PUBLIC_URL: 'http://127.0.0.1:' + SRV }),
  stdio: 'ignore'
});
const killSrv = () => { try { srv.kill(); } catch (e) { } };

let ws, tid = 0; const pending = new Map();
function send(m, p) {
  const id = ++tid; ws.send(JSON.stringify({ id, method: m, params: p || {} }));
  return new Promise((res, rej) => { pending.set(id, { res, rej }); setTimeout(() => { if (pending.has(id)) { pending.delete(id); rej(new Error('timeout ' + m)); } }, 30000); });
}
async function ev(e) {
  const r = await send('Runtime.evaluate', { expression: e, returnByValue: true, awaitPromise: true });
  if (r.exceptionDetails) throw new Error(r.exceptionDetails.text + ' @ ' + e.slice(0, 80));
  return r.result.value;
}

let pass = 0, fail = 0;
const ok = (c, w) => { if (c) { pass++; console.log('  ✓ ' + w); } else { fail++; console.log('  ✗ ' + w); } };

(async () => {
  await wait(1500);
  /* 测试字幕：中文，故意埋 5 种问题 —— 行太长 / 太快 / 与上一条重叠 / 半角逗号紧邻汉字 /
     第 3 条时间轴倒挂（err 级，用来验「错误」计数不是摆设） */
  const SRT = [
    '1', '00:00:01,000 --> 00:00:02,000',
    '这一句话很长很长很长很长很长很长很长很长很长很长很长很长很长很长',
    '', '2', '00:00:01,500 --> 00:00:03,000',
    '与上一条重叠了,而且逗号是半角',
    '', '3', '00:00:05,000 --> 00:00:04,000',
    '这条时间轴倒挂了', '', ''
  ].join('\n');
  const tmp = '/tmp/_qc321_zh.srt';
  fs.writeFileSync(tmp, SRT);

  const chrome = spawn(CHROME, ['--headless=new', '--remote-debugging-port=' + PORT, '--no-sandbox', '--disable-gpu',
    '--host-resolver-rules=MAP * ~NOTFOUND, EXCLUDE 127.0.0.1',
    '--lang=zh-CN', '--user-data-dir=/tmp/crqc321-' + Date.now(), 'about:blank'], { stdio: 'ignore' });
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
  await send('Page.enable'); await send('Runtime.enable'); await send('DOM.enable'); await send('Log.enable');
  const errs = [];
  ws.on('message', d => {
    const m = JSON.parse(d);
    if (m.method === 'Log.entryAdded' && m.params && m.params.entry && /error/i.test(m.params.entry.level)) {
      const e2 = m.params.entry;
      /* ⚠️ 一定要带上 url：Log 的 text 只有「Failed to load resource」，
         不带 url 就没法判断是不是隔离环境的噪音（adsbygoogle / favicon） */
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

  console.log('\n— ① 页面骨架 —');
  ok(await ev('!!document.getElementById("dz") && !!document.getElementById("subLang") && !!document.getElementById("ruleBox")'), '上传区/语言/规则清单都在');
  const nRule0 = await ev('document.querySelectorAll("#ruleBox [data-on]").length');
  ok(nRule0 > 10, '规则清单渲染出来了（' + nRule0 + ' 条）');
  ok(await ev('document.querySelectorAll("#thBox input").length') === 5, '五个阈值输入框都生成了');

  console.log('\n— ② 上传中文 SRT（DOM.setFileInputFiles 走真实 change 分支）—');
  const nodeId = await ev('(function(){var e=document.getElementById("file");return e?1:0})()');
  ok(nodeId === 1, '#file 存在');
  const { root } = await send('DOM.getDocument', { depth: 0 });
  const { nodeId: fid } = await send('DOM.querySelector', { nodeId: root.nodeId, selector: '#file' });
  await send('DOM.setFileInputFiles', { files: [tmp], nodeId: fid });
  await wait(700);
  const chip = await ev('document.getElementById("fmtChip").textContent');
  ok(/SRT/.test(chip) && /3/.test(chip), '格式芯片：' + chip);
  const sysChip = await ev('document.getElementById("sysChip").textContent');
  ok(/zh-CN/.test(sysChip), '自动识别语言：' + sysChip);
  const thW = await ev('document.getElementById("th_maxLineW").value');
  ok(thW === '42', '中文行宽阈值 = 42（半角宽度口径，实际 ' + thW + '）');
  const thC = await ev('document.getElementById("th_maxCpsW").value');
  ok(thC === '18', '中文速度阈值 = 18（实际 ' + thC + '）');
  const spec = await ev('document.getElementById("specNote").textContent');
  ok(spec.length > 0, '语言专属说明：' + spec.slice(0, 40));

  console.log('\n— ③ 语言专属规则：中文有 / 英文没有 —');
  const hasPunZh = await ev('!!document.querySelector(\'#ruleBox [data-on="rPun"]\')');
  ok(hasPunZh, '中文：标点规则 rPun 显示');
  await ev('(function(){var s=document.getElementById("subLang");s.value="en";s.dispatchEvent(new Event("change"))})()');
  await wait(300);
  const hasPunEn = await ev('!!document.querySelector(\'#ruleBox [data-on="rPun"]\')');
  ok(!hasPunEn, '英文：标点规则 rPun 不显示（不给英语查中文标点）');
  const wEn = await ev('document.getElementById("th_maxLineW").value');
  const cEn = await ev('document.getElementById("th_maxCpsW").value');
  ok(wEn === '42' && cEn === '20', '英文阈值：行宽 ' + wEn + ' / 速度 ' + cEn + '（速度比中文宽一档）');
  await ev('(function(){var s=document.getElementById("subLang");s.value="ar";s.dispatchEvent(new Event("change"))})()');
  await wait(300);
  const hasDirAr = await ev('!!document.querySelector(\'#ruleBox [data-on="rDir"]\')');
  ok(hasDirAr, '阿拉伯语：书写方向规则 rDir 显示');
  await ev('(function(){var s=document.getElementById("subLang");s.value="zh-CN";s.dispatchEvent(new Event("change"))})()');
  await wait(300);

  console.log('\n— ④ 跑检查 —');
  await ev('document.getElementById("btnRun").click()');
  await wait(600);
  ok(await ev('document.getElementById("repCard").style.display !== "none"'), '报告卡显示出来了');
  const sumErr = await ev('document.getElementById("sumErr").textContent');
  const sumWarn = await ev('document.getElementById("sumWarn").textContent');
  console.log('     ' + sumErr + ' / ' + sumWarn);
  const nIss = await ev('document.querySelectorAll("#issBox .iss").length');
  ok(nIss >= 4, '列出 ' + nIss + ' 条问题（预期 ≥4：太长/太快/重叠/半角标点/倒挂）');
  const kinds = await ev('JSON.stringify(Array.from(document.querySelectorAll("#issBox .iss")).map(function(x){return x.className}))');
  console.log('     问题条目：' + String(kinds).slice(0, 200));
  /* ⚠️ 级别色条是 .iss 里的 .lv.err 子元素，不是 .iss 自己的 className */
  const nErr = await ev('document.querySelectorAll("#issBox .iss .lv.err").length');
  ok(nErr > 0, '有 err 级问题（倒挂这类硬伤），实测 ' + nErr + ' 条');

  console.log('\n— ⑤ 应用修复 —');
  const fixN = await ev('document.querySelectorAll("#fixBox [data-fix]").length');
  ok(fixN > 0, '可修清单有 ' + fixN + ' 项');
  const timeOn = await ev('(function(){var b=document.querySelector(\'#fixBox [data-fix="rOvl"]\');return b?b.checked:null})()');
  ok(timeOn === false, '会动时间轴的「重叠」默认不勾（实测 ' + timeOn + '）');
  await ev('document.getElementById("btnFix").click()');
  await wait(600);
  const out = await ev('document.getElementById("out").value');
  ok(out.indexOf('00:00:') === 0 || /\d\d:\d\d:\d\d/.test(out), '导出框有内容');
  const msg = await ev('document.getElementById("msg").textContent');
  console.log('     提示：' + msg.slice(0, 60));
  const stillN = await ev('(function(){var t=document.getElementById("out").value;var a=t.match(/(\\d\\d:\\d\\d:\\d\\d,\\d\\d\\d) --> (\\d\\d:\\d\\d:\\d\\d,\\d\\d\\d)/g)||[];return a.length})()');
  ok(stillN === 3, '导出仍是 3 条（修复没有吞条目）');

  console.log('\n— ⑥ 切界面语言（27 语词典接线）—');
  await ev('(function(){var s=document.getElementById("langSel");s.value="ja";s.dispatchEvent(new Event("change"))})()');
  await wait(400);
  const jaRule = await ev('(function(){var n=document.querySelector("#ruleBox .nm");return n?n.textContent:""})()');
  ok(jaRule.length > 0, '日语界面下规则名：' + jaRule);
  await ev('(function(){var s=document.getElementById("langSel");s.value="ar";s.dispatchEvent(new Event("change"))})()');
  await wait(400);
  const dirAr = await ev('document.documentElement.getAttribute("dir")');
  ok(dirAr === 'rtl', '阿拉伯语界面整页 dir=rtl（实测 ' + dirAr + '）');

  console.log('\n— ⑦ 控制台 —');
  /* ⚠️ 这个浏览器是断网的（host-resolver 只放行 127.0.0.1）：
     adsbygoogle 的 ERR_NAME_NOT_RESOLVED 与 favicon 404 是隔离环境自带的噪音，不算页面问题。 */
  const noise = /pagead2\.googlesyndication|adsbygoogle|googletagmanager|gtag|favicon/i;
  const real = errs.filter(x => !noise.test(x));
  if (errs.length) console.log('     全部日志（含隔离噪音）：' + errs.slice(0, 5).join(' | ').slice(0, 300));
  ok(real.length === 0, '控制台零真实报错' + (real.length ? '：' + real.slice(0, 3).join(' | ') : ''));

  console.log('\n结果：' + pass + ' 通过 / ' + fail + ' 失败');
  killSrv(); chrome.kill();
  process.exit(fail ? 1 : 0);
})();
