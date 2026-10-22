/* live314.js —— v0.9.314 外网实测：https://ai-srtsub.com
   ⚠️ 不挂代理（阿里云直连）。量：四页 heroA 空格 / convert VTT 无小时位 /
   shift maxCps 分档 / 德语 glossary 压缩后 desc / 版号。 */
'use strict';
process.on('unhandledRejection', e => { console.log('UNHANDLED', e && e.message); });
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');
const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const ROOT = __dirname;
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
    '--lang=zh-CN', '--user-data-dir=/tmp/cr-live314-' + Date.now(), 'about:blank'], { stdio: 'ignore' });
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
  await go(BASE + '/');
  let d = await ev(`({ ver: (document.querySelector('.ver')||{}).textContent, ready: document.readyState })`);
  ok(d.ver === 'v0.9.314', '首页版号 v0.9.314', d.ver);

  /* ② 四页 heroA：/en/ 有空格 */
  for (const pg of ['convert', 'bilingual', 'clean', 'shift']) {
    await go(BASE + '/en/' + pg + '.html');
    const en = await ev(`({ h1: (document.querySelector('.hero h1')||{textContent:''}).textContent })`);
    ok(/[A-Za-z] [A-Za-z]/.test(en.h1), '/en/' + pg + ' h1 两段之间有空格', en.h1);
  }

  /* ③ convert 页 VTT 无小时位（线上引擎） */
  await go(BASE + '/convert.html');
  let diag = await ev(`({ href: location.href, ready: document.readyState, core: typeof window.ConvertCore })`);
  ok(diag.ready === 'complete' && diag.core === 'object', 'DIAG：convert 页 + 引擎加载', JSON.stringify(diag));
  const vtt = await ev(`(function(){
    const V = 'WEBVTT\\n\\n1\\n00:01.000 --> 00:03.400\\nNo hours here\\n\\n00:04.000 --> 01:05.000\\nEnd has hours\\n';
    return window.ConvertCore.parse(V, 'vtt').map(function(x){return [x.start, x.end, x.text];});
  })()`);
  ok(Array.isArray(vtt) && vtt.length === 2 && vtt[0][0] === 1000 && vtt[1][1] === 65000,
    '线上 convert VTT 无小时位解析正确', JSON.stringify(vtt));

  /* ④ shift 页 maxCps 分档（线上引擎） */
  await go(BASE + '/shift.html');
  diag = await ev(`({ ready: document.readyState, core: typeof window.ShiftCore })`);
  ok(diag.ready === 'complete' && diag.core === 'object', 'DIAG：shift 页 + 引擎加载', JSON.stringify(diag));
  const cps = await ev(`(function(){
    const SC = window.ShiftCore;
    const en = SC.checkCues([{start:0, end:1000, text:'12345678901234567890'}]);
    const zh = SC.checkCues([{start:0, end:1000, text:'一二三四五六七八九十'}]);
    return { en: en, zh: zh };
  })()`);
  ok(Array.isArray(cps.en) && cps.en.length === 0, '线上 shift 英文 10 单位/秒不报 fast', JSON.stringify(cps.en));
  ok(Array.isArray(cps.zh) && cps.zh.length === 1 && cps.zh[0].why.indexOf('fast') >= 0, '线上 shift 中文 10 字/秒照报 fast', JSON.stringify(cps.zh));

  /* ⑤ 压缩后 SEO 文案：德语 glossary desc + en convert title */
  await go(BASE + '/de/glossary.html');
  d = await ev(`({ desc: (document.querySelector('meta[name="description"]')||{content:''}).content })`);
  ok(d.desc.indexOf('Begriffe in Untertiteln kostenlos ersetzen') === 0 && d.desc.length <= 160,
    '线上 /de/glossary desc 压缩版生效（' + d.desc.length + ' 字）', d.desc.slice(0, 60) + '…');
  await go(BASE + '/en/convert.html');
  d = await ev(`({ t: document.title, desc: (document.querySelector('meta[name="description"]')||{content:''}).content })`);
  ok(d.desc.length <= 160, '线上 /en/convert desc ≤160（' + d.desc.length + ' 字）', d.desc.slice(0, 60) + '…');

  console.log('\nlive314: ' + P + ' 通过 / ' + F + ' 失败');
  chrome.kill(); process.exit(F ? 1 : 0);
})().catch(e => { console.log('FATAL: ' + (e && e.message)); process.exit(1); });
