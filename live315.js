/* live315.js —— v0.9.315 外网实测：https://ai-srtsub.com
   ⚠️ 不挂代理（阿里云直连）。量：版号 / merge-core 缓存参数 / 线上引擎 italic 继承 /
   FX 带入链路源码在位 / 上版回归（convert VTT 无小时位、shift maxCps）。 */
'use strict';
process.on('unhandledRejection', e => { console.log('UNHANDLED', e && e.message); });
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');
const { spawn } = require('child_process');
const http = require('http');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const BASE = 'https://ai-srtsub.com';
const PORT = 9900 + Math.floor(Math.random() * 80);
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

(async () => {
  const chrome = spawn(CHROME, ['--headless=new', '--remote-debugging-port=' + PORT, '--no-sandbox', '--disable-gpu',
    '--lang=zh-CN', '--user-data-dir=/tmp/cr-live315-' + Date.now(), 'about:blank'], { stdio: 'ignore' });
  await wait(2000);
  let tgt = null;
  for (let i = 0; i < 30 && !tgt; i++) {
    try {
      const r = await new Promise((res, rej) => { const q = http.get({ host: '127.0.0.1', port: PORT, path: '/json/list' }, s => { let d = ''; s.on('data', c => d += c); s.on('end', () => res(JSON.parse(d))); }); q.on('error', rej); q.setTimeout(2000, () => q.destroy(new Error('t'))); });
      tgt = (r || []).find(t => t.type === 'page');
    } catch (e) { await wait(500); }
  }
  if (!tgt) { console.log('浏览器没起来'); chrome.kill(); process.exit(2); }
  ws = new WebSocket(tgt.webSocketDebuggerUrl, { perMessageDeflate: false });
  await new Promise((r, j) => { ws.on('open', r); ws.on('error', j); });
  ws.on('message', d => { const m = JSON.parse(d); if (m.id && pending.has(m.id)) { pending.get(m.id).res(m.result || m); pending.delete(m.id); } });
  await send('Page.enable'); await send('Runtime.enable');
  await send('Network.setCacheDisabled', { cacheDisabled: true });

  async function go(url) {
    await send('Page.navigate', { url });
    for (let i = 0; i < 50; i++) { const st = await ev('document.readyState'); if (st === 'complete') break; await wait(300); }
    await wait(1000);
  }

  /* ① 首页版号 */
  await go(BASE + '/?_=' + Date.now());
  let d = await ev(`({ ver: (document.querySelector('.ver')||{}).textContent, ready: document.readyState })`);
  ok(d.ver === 'v0.9.315', '首页版号 v0.9.315', d.ver);

  /* ② merge 页：缓存参数 + 线上引擎 italic 继承（#249 本体） */
  await go(BASE + '/merge.html?_=' + Date.now());
  d = await ev(`({ href: location.href, ready: document.readyState, core: typeof window.MergeCore, bust: (document.querySelector('script[src^="merge-core.js"]')||{src:''}).src })`);
  ok(d.ready === 'complete' && d.core === 'object', 'DIAG：merge 页 + 引擎加载', JSON.stringify(d));
  ok(/merge-core\.js\?v=0\.9\.315/.test(d.bust), 'merge-core 缓存参数已到 315', d.bust);
  const it = await ev(`(function(){
    var M = window.MergeCore;
    var src = ['[Script Info]','PlayResY: 1080','[V4+ Styles]',
      'Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding',
      'Style: Bot,PingFang SC,56,&H00FFFFFF,&H000000FF,&H00000000,&H64000000,-1,-1,0,0,100,100,0,0,1,2.5,0,2,60,60,42,1',
      'Style: Top,PingFang SC,50,&H0000D7FF,&H000000FF,&H00000000,&H64000000,0,0,0,0,100,100,0,0,1,2.5,0,2,60,60,117,1',
      '[Events]','Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text',
      'Dialogue: 0,0:00:00.00,0:00:02.00,Bot,,0,0,0,,斜',
      'Dialogue: 0,0:00:00.00,0:00:02.00,Top,,0,0,0,,正'].join('\\n');
    var p = M.parseAss(src);
    var plan = M.planAssImport(p.items, p.styles, p.playResY);
    return { dst: plan.dst.italic, src: plan.src.italic, bold: plan.dst.bold };
  })()`);
  ok(it.dst === true && it.src === false && it.bold === true, '线上引擎 italic 继承（dst 斜 / src 正 / bold 对照）', JSON.stringify(it));

  /* ③ 线上真实交互：adjust 模式导入带斜体 ASS → 勾选框亮 */
  await ev(`(function(){
    var r = document.querySelector('#modeTabs input[name=workMode][value="adjust"]');
    if (r && !r.checked){ r.checked = true; r.dispatchEvent(new Event('change', {bubbles:true})); }
  })()`);
  const ASS = ['[Script Info]', 'PlayResY: 1080', '[V4+ Styles]',
    'Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding',
    'Style: Bottom,PingFang SC,56,&H00FFFFFF,&H000000FF,&H00000000,&H64000000,-1,-1,0,0,100,100,0,0,1,2.5,0,2,60,60,42,1',
    'Style: Top,PingFang SC,50,&H0000D7FF,&H000000FF,&H00000000,&H64000000,0,0,0,0,100,100,0,0,1,2.5,0,2,60,60,117,1',
    '[Events]', 'Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text',
    'Dialogue: 0,0:00:00.00,0:00:02.00,Bottom,,0,0,0,,斜体译文',
    'Dialogue: 0,0:00:00.00,0:00:02.00,Top,,0,0,0,,正常原文', ''].join('\n');
  await ev('loadSide("src", ' + JSON.stringify(ASS) + ', "live315.ass")');
  await wait(800);
  const st = await ev(`({
    dstIt: !!(document.getElementById('assDstItalic')||{}).checked,
    srcIt: !!(document.getElementById('assSrcItalic')||{}).checked
  })`);
  ok(st.dstIt === true && st.srcIt === false, '线上导入：assDstItalic 亮 / assSrcItalic 灭', JSON.stringify(st));

  /* ④ translate 页 FX 带入链路源码在位（#291，静态断言线上版）
     ⚠️ 上一个探针版本漏了 go()，在 merge 页抓 DOM 假红过一次 */
  await go(BASE + '/translate.html?_=' + Date.now());
  const fx = await ev('(function(){ var s = document.documentElement.outerHTML; return { key: s.indexOf("srt_fx_in") >= 0, href: s.indexOf("merge.html?from=translate") >= 0, fn: typeof window.fxHref, ret: (typeof window.fxHref === "function") ? window.fxHref() : null }; })()');
  ok(fx.key && fx.href && fx.fn === 'function' && fx.ret === '/merge.html?from=translate',
    'translate 页 FX_KEY / from=translate / fxHref 在位', JSON.stringify(fx));

  /* ⑤ 上版回归：convert VTT 无小时位 + shift maxCps */
  await go(BASE + '/convert.html?_=' + Date.now());
  const vtt = await ev(`(function(){
    var V = 'WEBVTT\\n\\n1\\n00:01.000 --> 00:03.400\\nNo hours here\\n\\n00:04.000 --> 01:05.000\\nEnd has hours\\n';
    return window.ConvertCore.parse(V, 'vtt').map(function(x){return [x.start, x.end, x.text];});
  })()`);
  ok(Array.isArray(vtt) && vtt.length === 2 && vtt[0][0] === 1000 && vtt[1][1] === 65000, '回归：convert VTT 无小时位', JSON.stringify(vtt));
  await go(BASE + '/shift.html?_=' + Date.now());
  const cps = await ev(`(function(){
    var SC = window.ShiftCore;
    return { en: SC.checkCues([{start:0, end:1000, text:'12345678901234567890'}]),
             zh: SC.checkCues([{start:0, end:1000, text:'一二三四五六七八九十'}]) };
  })()`);
  ok(Array.isArray(cps.en) && cps.en.length === 0, '回归：shift 英文 10 单位/秒不报 fast', JSON.stringify(cps.en));
  ok(Array.isArray(cps.zh) && cps.zh.length === 1, '回归：shift 中文 10 字/秒照报 fast', JSON.stringify(cps.zh));

  console.log('\nlive315: ' + P + ' 通过 / ' + F + ' 失败');
  chrome.kill(); process.exit(F ? 1 : 0);
})().catch(e => { console.log('FATAL: ' + (e && e.message)); process.exit(1); });
