/* _chk315.js —— v0.9.315 真浏览器验证（非交付件）
   merge 页导入带斜体的 ASS → assDstItalic / assSrcItalic 勾选框要如实亮/灭（#249） */
'use strict';
process.on('unhandledRejection', e => { console.log('UNHANDLED', e && e.message); });
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');
const { spawn } = require('child_process');
const http = require('http');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const ROOT = __dirname;
const SRV = Number(process.env.SRV || 3431);
const PORT = 9800 + Math.floor(Math.random() * 90);
const wait = ms => new Promise(r => setTimeout(r, ms));

let ws, tid = 0; const pending = new Map();
function send(m, p) {
  const id = ++tid; ws.send(JSON.stringify({ id, method: m, params: p || {} }));
  return new Promise((res, rej) => { pending.set(id, { res, rej }); setTimeout(() => { if (pending.has(id)) { pending.delete(id); rej(new Error('timeout ' + m)); } }, 30000); });
}
async function ev(e) {
  const r = await send('Runtime.evaluate', { expression: e, returnByValue: true, awaitPromise: true });
  if (r.exceptionDetails) throw new Error(r.exceptionDetails.text);
  return r.result.value;
}
let P = 0, F = 0;
const ok = (c, n, x) => { console.log((c ? '  ✓ ' : '  ✗ ') + n + (x !== undefined ? '  [' + String(x).slice(0, 120) + ']' : '')); c ? P++ : F++; };

/* 带斜体的双语 ASS：Bottom（译文侧，italic=-1，位低）/ Top（原文侧，italic=0，位高） */
const ASS = [
  '[Script Info]', 'Title: italic test', 'PlayResY: 1080', '',
  '[V4+ Styles]',
  'Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding',
  'Style: Bottom,PingFang SC,56,&H00FFFFFF,&H000000FF,&H00000000,&H64000000,-1,-1,0,0,100,100,0,0,1,2.5,0,2,60,60,42,1',
  'Style: Top,PingFang SC,50,&H0000D7FF,&H000000FF,&H00000000,&H64000000,0,0,0,0,100,100,0,0,1,2.5,0,2,60,60,117,1',
  '', '[Events]',
  'Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text',
  'Dialogue: 0,0:00:00.00,0:00:02.00,Bottom,,0,0,0,,斜体译文',
  'Dialogue: 0,0:00:00.00,0:00:02.00,Top,,0,0,0,,正常原文',
  ''
].join('\n');

(async () => {
  const srv = spawn(process.execPath, ['server.js'], { cwd: ROOT, env: Object.assign({}, process.env, { PORT: String(SRV), PUBLIC_URL: 'http://127.0.0.1:' + SRV }), stdio: 'ignore' });
  await wait(1500);
  const chrome = spawn(CHROME, ['--headless=new', '--remote-debugging-port=' + PORT, '--no-sandbox', '--disable-gpu',
    '--host-resolver-rules=MAP * ~NOTFOUND, EXCLUDE 127.0.0.1',
    '--lang=zh-CN', '--user-data-dir=/tmp/cr315-' + Date.now(), 'about:blank'], { stdio: 'ignore' });
  await wait(2000);
  let tgt = null;
  for (let i = 0; i < 30 && !tgt; i++) {
    try {
      const r = await new Promise((res, rej) => { const q = http.get({ host: '127.0.0.1', port: PORT, path: '/json/list' }, s => { let d = ''; s.on('data', c => d += c); s.on('end', () => res(JSON.parse(d))); }); q.on('error', rej); q.setTimeout(2000, () => q.destroy(new Error('t'))); });
      tgt = (r || []).find(t => t.type === 'page');
    } catch (e) { await wait(500); }
  }
  if (!tgt) { console.log('浏览器没起来'); srv.kill(); chrome.kill(); process.exit(2); }
  ws = new WebSocket(tgt.webSocketDebuggerUrl, { perMessageDeflate: false });
  await new Promise((r, j) => { ws.on('open', r); ws.on('error', j); });
  ws.on('message', d => { const m = JSON.parse(d); if (m.id && pending.has(m.id)) { pending.get(m.id).res(m.result || m); pending.delete(m.id); } });
  await send('Page.enable'); await send('Runtime.enable');

  async function go(url) {
    await send('Page.navigate', { url });
    for (let i = 0; i < 40; i++) { const st = await ev('document.readyState'); if (st === 'complete') break; await wait(200); }
    await wait(800);
  }

  /* ============ ① adjust 模式导入带斜体的双语 ASS → 勾选框如实亮 ============
     ⚠️ 必须切 adjust（单份双语）模式：merge 模式下 assDominantStyle 只填有样式那侧，
        「srcIt=false」分不清是「如实填了 false」还是「压根没填」，口径会假绿 */
  await go('http://127.0.0.1:' + SRV + '/merge.html');
  await ev(`(function(){
    const r = document.querySelector('#modeTabs input[name=workMode][value="adjust"]');
    if (r && !r.checked){ r.checked = true; r.dispatchEvent(new Event('change', {bubbles:true})); }
    loadSide("src", ` + JSON.stringify(ASS) + `, "italic-test.ass");
  })()`);
  await wait(600);
  const st1 = await ev(`({
    dstIt: !!(document.getElementById('assDstItalic')||{}).checked,
    srcIt: !!(document.getElementById('assSrcItalic')||{}).checked,
    dstBold: !!(document.getElementById('assDstBold')||{}).checked,
    note: (document.getElementById('assImportNote')||{textContent:''}).textContent
  })`);
  ok(st1.dstIt === true, '导入后 assDstItalic 勾选框亮（Bottom italic=-1）', JSON.stringify(st1));
  ok(st1.srcIt === false, '导入后 assSrcItalic 不亮（Top italic=0）');
  ok(st1.dstBold === true, '对照：assDstBold 仍正常亮（Bold 老路径没被带坏）');

  /* ============ ② 反向：两侧都斜的文件（仍走 adjust 双侧填） ============ */
  const ASS2 = ASS
    .replace('Style: Top,PingFang SC,50,&H0000D7FF,&H000000FF,&H00000000,&H64000000,0,0,', 'Style: Top,PingFang SC,50,&H0000D7FF,&H000000FF,&H00000000,&H64000000,0,-1,');
  await ev('loadSide("src", ' + JSON.stringify(ASS2) + ', "both-italic.ass")');
  await wait(600);
  const st2 = await ev(`({
    dstIt: !!(document.getElementById('assDstItalic')||{}).checked,
    srcIt: !!(document.getElementById('assSrcItalic')||{}).checked
  })`);
  ok(st2.dstIt === true && st2.srcIt === true, '两侧都斜 → 两个勾选框都亮', JSON.stringify(st2));

  /* ============ ③ 导出回环：导入→不动→导出，Italic 字段保得住 ============ */
  const rt = await ev(`(function(){
    const C = window.MergeCore;
    const evs = [{ start:0, end:2000, lines:[{ style:'Bottom', text:'斜体译文' }, { style:'Top', text:'正常原文' }] }];
    const out = C.formatAss(evs, { title:'t', assStyle:{ dstItalic:true, srcItalic:false } });
    const p = C.parseAss(out);
    const plan = C.planAssImport(p.items, p.styles, p.playResY);
    return { dst: plan.dst.italic, src: plan.src.italic };
  })()`);
  ok(rt.dst === true && rt.src === false, '浏览器引擎：导入→导出→再导入 italic 保得住', JSON.stringify(rt));

  console.log('----');
  console.log('通过 ' + P + ' / 失败 ' + F);
  srv.kill(); chrome.kill();
  process.exit(F ? 1 : 0);
})().catch(e => { console.log('FATAL', e && e.stack); process.exit(3); });
