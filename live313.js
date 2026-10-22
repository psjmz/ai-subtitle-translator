/* live313.js —— v0.9.313 外网实测：https://ai-srtsub.com 两个新页全流程
   ⚠️ 不挂代理（ai-srtsub 在阿里云，直连 200；挂 7897 反而整页 chrome-error）。
   量：videosub 真实 MKV 注入走全流程；hanconv 简转繁；/en/ 语言版；截图存档。 */
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
async function until(expr, n) {
  for (let i = 0; i < (n || 40); i++) { if (await ev(expr)) return true; await wait(250); }
  return false;
}
function b64(f) { return fs.readFileSync(path.join(ROOT, '_vsfx', f)).toString('base64'); }

(async () => {
  const chrome = spawn(CHROME, ['--headless=new', '--remote-debugging-port=' + PORT, '--no-sandbox', '--disable-gpu',
    '--lang=zh-CN', '--user-data-dir=/tmp/cr-live313-' + Date.now(), 'about:blank'], { stdio: 'ignore' });
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

  /* ① 首页：两张新卡 + 版号 */
  await go(BASE + '/');
  console.log('== ① / 首页 ==');
  let d = await ev(`({ ver: (document.querySelector('.ver')||{}).textContent,
    cards: [...document.querySelectorAll('a.tc')].map(a=>a.getAttribute('href')),
    vs: document.querySelector('a.tc.vs') ? getComputedStyle(document.querySelector('a.tc.vs')).getPropertyValue('--k') || '有卡' : '无卡' })`);
  ok(d.ver === 'v0.9.313', '首页版号 v0.9.313', d.ver);
  ok(d.cards.indexOf('/videosub.html') >= 0 && d.cards.indexOf('/hanconv.html') >= 0, '首页有 videosub / hanconv 两张卡', JSON.stringify(d.cards));

  /* ② videosub 全流程 */
  await go(BASE + '/videosub.html');
  console.log('== ② /videosub.html ==');
  let diag = await ev(`({ href: location.href, ready: document.readyState,
    core: typeof window.VideoSubCore, i18n: typeof window.VIDEOSUB_I18N })`);
  ok(diag.ready === 'complete' && diag.core === 'object' && diag.i18n === 'object', 'DIAG：页面 + 引擎 + 词典加载', JSON.stringify(diag));
  await ev(`(async () => {
    const bin = atob('${b64('t_multi.mkv')}');
    const u8 = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) u8[i] = bin.charCodeAt(i);
    setFile(new File([u8], 't_multi.mkv', { type: 'video/x-matroska' }));
  })()`);
  ok(await until('!S.busy && S.meta && S.meta.tracks.length === 2'), '线上 MKV 认出 2 条轨');
  await ev(`document.querySelector('#trks [data-ex="0"]').click()`);
  ok(await until('!S.busy && S.cues && S.cues.cues.length === 4'), '抽出 4 条 cue', await ev('S.cues && S.cues.cues.length'));
  const o = await ev('document.getElementById("out").value');
  ok(o.indexOf('00:00:01,000 --> 00:00:03,400') >= 0 && /[\u4e00-\u9fff]/.test(o), 'SRT 时间码 + 汉字正文', o.split('\n')[1]);

  /* ③ /en/videosub.html */
  await go(BASE + '/en/videosub.html');
  console.log('== ③ /en/videosub.html ==');
  d = await ev(`({ lang: document.documentElement.lang, h1: (document.querySelector('.hero h1')||{}).textContent||'',
    nav: [...document.querySelectorAll('#navPills a')].map(a=>a.getAttribute('href')) })`);
  ok(d.lang === 'en' && /Video/i.test(d.h1), 'en 版渲染', d.h1);
  ok(d.nav.length === 11 && d.nav.every(h => h.startsWith('/en/')), 'NAV 11 个 /en/ 前缀', JSON.stringify(d.nav).slice(0, 100));

  /* ④ hanconv 全流程 */
  await go(BASE + '/hanconv.html');
  console.log('== ④ /hanconv.html ==');
  diag = await ev(`({ ready: document.readyState, core: typeof window.HanConvCore,
    data: typeof window.HanConvData, dictReady: typeof READY !== 'undefined' && READY })`);
  ok(diag.ready === 'complete' && diag.dictReady === true, 'DIAG：340KB 词库加载且 READY', JSON.stringify(diag));
  await ev(`S.mode = 's2twp'; setSrc('1\\n00:00:01,000 --> 00:00:03,400\\n里面的软件要更新\\n\\n', 'a.srt')`);
  const hc = await ev('S.out');
  ok(hc.indexOf('裡面的軟體要更新') >= 0, '线上 s2twp：台湾用词', hc.split('\n')[2]);
  ok(hc.indexOf('00:00:01,000 --> 00:00:03,400') >= 0, '时间码一字不动');

  /* ⑤ /en/hanconv.html + 页脚署名 */
  await go(BASE + '/en/hanconv.html');
  console.log('== ⑤ /en/hanconv.html ==');
  d = await ev(`({ lang: document.documentElement.lang, foot: (document.querySelector('footer')||{}).textContent||'' })`);
  ok(d.lang === 'en' && /OpenCC \\(Apache-2\.0\\)/.test(d.foot) === false ? /OpenCC/.test(d.foot) : true, 'en 版页脚带 OpenCC 署名', d.foot.replace(/\s+/g, ' ').slice(0, 80));

  /* ⑥ 截图存档 */
  for (const [u, f] of [[BASE + '/videosub.html', '_live313-vs.png'], [BASE + '/hanconv.html', '_live313-hc.png']]) {
    await go(u);
    if (f === '_live313-vs.png') { await ev(`(async () => { const bin = atob('${b64('t_multi.mkv')}'); const u8 = new Uint8Array(bin.length); for (let i = 0; i < bin.length; i++) u8[i] = bin.charCodeAt(i); setFile(new File([u8], 't_multi.mkv', {})); })()`); await until('!S.busy && S.meta'); await ev(`document.querySelector('#trks [data-ex="0"]').click()`); await until('!S.busy && S.cues && S.cues.cues.length'); }
    else { await ev(`S.mode = 's2twp'; setSrc('1\\n00:00:01,000 --> 00:00:03,400\\n里面的软件要更新\\n\\n', 'a.srt')`); await until('S.out'); }
    const shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(ROOT, f), Buffer.from(shot.data, 'base64'));
    console.log('  截图 ' + f + ' ' + Math.round(shot.data.length / 1024) + 'KB');
  }

  console.log('\nlive313: ' + P + ' 通过 / ' + F + ' 失败');
  chrome.kill(); process.exit(F ? 1 : 0);
})().catch(e => { console.log('FATAL: ' + (e && e.message)); process.exit(1); });
