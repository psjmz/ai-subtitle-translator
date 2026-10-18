/* _chk336_live.js —— **线上版**：merge.html 标题层级修复验收（真浏览器）
 *
 * 背景：全站体检 _site335.js 的 S 段报 merge.html 标题序列 h1 → h2 → h4，
 *       跳过 h3。那 5 个 h4 是 ASS / VTT 样式分组小标题（「译文（主）」「原文行」等）。
 *       336 批次把标签 h4 → h3，并同步改了 CSS 选择器。
 *
 * ⚠️ 真正的风险不是「改了标签」，而是「改了标签但选择器没跟上」：
 *   .ass-col h4 定义的是 12px / 700 / flex + ::before 那根 4×12 紫色竖条。
 *   只改标签不改选择器 = 分组标题退回浏览器默认样式（变大、竖条消失）。
 *   所以本脚本不数标签，而是直接读浏览器算出来的样式值。
 *
 * 判据：
 *   ① 栏标题 5 个，标签全为 h3
 *   ② 每个 computed font-size = 12px、font-weight = 700、display = flex
 *   ③ 每个 ::before 仍在：width 4px / height 12px / 背景非透明
 *   ④ 层级序列 h1 → h2 → h3 → h2，无跳跃
 *
 * 用法：node _chk336_live.js
 *
 * ⚠️ 与 _chk336.js 的差别只有一处：不起本地 server，直接打生产域名。
 *    其余判据（computed style / 竖条尺寸 / 层级序列）一行未改，保证两边口径一致。
 */
'use strict';
const { spawn } = require('child_process');
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');

const ROOT = __dirname;
const BASE = process.env.BASE || 'https://ai-srtsub.com';
const PORT = Number(process.env.PORT || 3452);
const DEBUG = Number(process.env.DEBUG_PORT || 9511);
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const sleep = ms => new Promise(r => setTimeout(r, ms));

let seq = 0;
const pend = new Map();

/* 在浏览器里取每个 h3/h4 的真实计算样式 */
const PROBE = `(function(){
  var out = [];
  Array.prototype.slice.call(document.querySelectorAll('h3,h4')).forEach(function(h){
    var s = getComputedStyle(h);
    var b = getComputedStyle(h, '::before');
    var p = h.parentElement;
    out.push({
      tag: h.tagName.toLowerCase(),
      id: h.id || '',
      parent: (p ? p.tagName.toLowerCase() + (p.className ? '.' + String(p.className).trim().split(/\\s+/).join('.') : '') : ''),
      text: (h.textContent||'').trim().slice(0,18),
      fs: s.fontSize, fw: s.fontWeight, disp: s.display,
      bw: b.width, bh: b.height, bbg: b.backgroundColor
    });
  });
  var seqAll = Array.prototype.slice.call(document.querySelectorAll('h1,h2,h3,h4,h5,h6'))
    .map(function(h){ return h.tagName.toLowerCase(); });
  return JSON.stringify({ titles: out, seq: seqAll });
})()`;

(async () => {
  const udir = '/tmp/cr-chk336-' + Date.now();
  const chrome = spawn(CHROME, ['--headless=new', '--no-sandbox', '--disable-gpu', '--no-first-run',
    '--remote-debugging-port=' + DEBUG, '--user-data-dir=' + udir, 'about:blank'],
    { stdio: 'ignore' });

  let list = null;
  for (let i = 0; i < 40; i++) {
    await sleep(500);
    try {
      const r = await fetch('http://127.0.0.1:' + DEBUG + '/json/list');
      list = await r.json();
      if (list && list.length) break;
    } catch (e) { /* 还没起来 */ }
  }
  if (!list) { chrome.kill(); throw new Error('CDP 起不来'); }

  const ws = new WebSocket(list[0].webSocketDebuggerUrl, { perMessageDeflate: false, maxPayload: 64 * 1024 * 1024 });
  await new Promise((res, rej) => { ws.on('open', res); ws.on('error', rej); });
  ws.on('message', d => {
    let m; try { m = JSON.parse(d.toString()); } catch (e) { return; }
    if (m.id && pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); }
  });
  const send = (method, params) => new Promise(res => {
    const id = ++seq; pend.set(id, res);
    ws.send(JSON.stringify({ id, method, params: params || {} }));
  });
  const ev = async (expr) => {
    const r = await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true });
    return r.result && r.result.result ? r.result.result.value : null;
  };

  let fail = 0;
  const ok = (c, msg, extra) => {
    console.log('  ' + (c ? '✓' : '✗') + ' ' + msg + (extra ? '  ' + extra : ''));
    if (!c) fail++;
  };

  for (const path of ['/merge.html', '/en/merge.html']) {
    console.log('\n===== ' + path + ' =====');
    await send('Page.navigate', { url: BASE + path });

    /* 轮询到标题节点出现为止（固定 sleep 偶发抓空） */
    let R = { titles: [], seq: [] };
    const deadline = Date.now() + 25000;
    while (Date.now() < deadline) {
      await sleep(700);
      const s = await ev(PROBE);
      try {
        const j = JSON.parse(s);
        if (j.titles && j.titles.length) { R = j; break; }
      } catch (e) { /* 还没渲染完 */ }
    }

    ok(R.titles.length === 5, '栏标题数量 = 5', '实际 ' + R.titles.length);
    ok(R.titles.every(t => t.tag === 'h3'), '栏标题标签全部为 h3',
      '标签集合：' + Array.from(new Set(R.titles.map(t => t.tag))).join('/'));
    ok(R.titles.every(t => t.fs === '12px'), 'font-size 全部为 12px',
      '实际：' + Array.from(new Set(R.titles.map(t => t.fs))).join('/'));
    ok(R.titles.every(t => t.fw === '700'), 'font-weight 全部为 700',
      '实际：' + Array.from(new Set(R.titles.map(t => t.fw))).join('/'));
    ok(R.titles.every(t => t.disp === 'flex'), 'display 全部为 flex（竖条靠它排）',
      '实际：' + Array.from(new Set(R.titles.map(t => t.disp))).join('/'));
    ok(R.titles.every(t => t.bw === '4px' && t.bh === '12px'), '::before 尺寸全部 4×12px',
      '实际：' + Array.from(new Set(R.titles.map(t => t.bw + 'x' + t.bh))).join('/'));
    ok(R.titles.every(t => t.bbg !== 'rgba(0, 0, 0, 0)' && t.bbg !== 'transparent'),
      '::before 背景色全部仍在（竖条没消失）',
      '实际：' + Array.from(new Set(R.titles.map(t => t.bbg))).join('/'));

    const jump = (() => {
      let prev = 0, bad = [];
      R.seq.forEach(t => {
        const n = Number(t[1]);
        if (prev && n > prev + 1) bad.push(prev + '→' + n);
        prev = n;
      });
      return bad;
    })();
    ok(jump.length === 0, '标题层级无跳跃', jump.length ? '跳跃：' + jump.join(', ') : '序列 ' + R.seq.join('→'));

    R.titles.forEach(t => console.log('       <' + t.tag + '> ' + t.text + '  [' + t.fs + '/' + t.fw + '/' + t.disp
      + ' ::before ' + t.bw + '×' + t.bh + ']'));
  }

  ws.close(); chrome.kill();
  console.log('\n===== 汇总 =====');
  console.log(fail ? '失败 ' + fail + ' 项' : '全部通过，0 问题');
  process.exit(fail ? 1 : 0);
})();
