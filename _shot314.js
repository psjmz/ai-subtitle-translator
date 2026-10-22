/* _shot314.js —— v0.9.314 真浏览器验证（非交付件）
   ① convert/bilingual/clean/shift 四页 heroA 连写修复：/en/ 版 h1 有空格、zh-CN 版没有
   ② convert 页 VTT 无小时位解析（浏览器侧引擎）
   ③ shift 页 maxCps 分档（英文 18.4 不误报 fast） */
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

(async () => {
  const srv = spawn(process.execPath, ['server.js'], { cwd: ROOT, env: Object.assign({}, process.env, { PORT: String(SRV), PUBLIC_URL: 'http://127.0.0.1:' + SRV }), stdio: 'ignore' });
  await wait(1500);
  const chrome = spawn(CHROME, ['--headless=new', '--remote-debugging-port=' + PORT, '--no-sandbox', '--disable-gpu',
    '--host-resolver-rules=MAP * ~NOTFOUND, EXCLUDE 127.0.0.1',
    '--lang=zh-CN', '--user-data-dir=/tmp/cr314-' + Date.now(), 'about:blank'], { stdio: 'ignore' });
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

  /* ============ ① 四页 heroA 连写 ============ */
  for (const pg of ['convert', 'bilingual', 'clean', 'shift']) {
    await go('http://127.0.0.1:' + SRV + '/en/' + pg + '.html');
    const en = await ev(`({ h1: (document.querySelector('.hero h1')||{textContent:''}).textContent,
      ha: (document.querySelector('.hero h1 [data-i18n="heroA"]')||{textContent:''}).textContent })`);
    ok(/[A-Za-z] [A-Za-z]/.test(en.h1), pg + ' /en/ h1 两段之间有空格', en.h1);
    ok(/ $/.test(en.ha), pg + ' /en/ heroA 尾部带空格', JSON.stringify(en.ha));

    await go('http://127.0.0.1:' + SRV + '/' + pg + '.html');
    const zh = await ev(`({ h1: (document.querySelector('.hero h1')||{textContent:''}).textContent })`);
    ok(!/ $/.test(zh.h1) && !/[\u4e00-\u9fff] [\u4e00-\u9fff]/.test(zh.h1), pg + ' zh-CN h1 无多余空格', zh.h1);
  }

  /* ============ ② convert 页 VTT 无小时位（浏览器引擎） ============ */
  await go('http://127.0.0.1:' + SRV + '/convert.html');
  const vtt = await ev(`(function(){
    const V = 'WEBVTT\\n\\n1\\n00:01.000 --> 00:03.400\\nNo hours here\\n\\n00:04.000 --> 01:05.000\\nEnd has hours\\n';
    const c = window.ConvertCore.parse(V, 'vtt');
    return c.map(function(x){return [x.start, x.end, x.text];});
  })()`);
  ok(Array.isArray(vtt) && vtt.length === 2 && vtt[0][0] === 1000 && vtt[0][1] === 3400 && vtt[1][0] === 4000 && vtt[1][1] === 65000,
    'convert 页 VTT 无小时位解析正确', JSON.stringify(vtt));

  /* ============ ③ shift 页 maxCps 分档 ============ */
  await go('http://127.0.0.1:' + SRV + '/shift.html');
  const cps = await ev(`(function(){
    const SC = window.ShiftCore;
    /* 英文 20 字符 1.00s = 10 宽度单位/秒 —— 旧口径 9*1.02 会误报，新分档纯半角上限 10 放行 */
    const en = SC.checkCues([{start:0, end:1000, text:'12345678901234567890'}]);
    /* 中文 10 汉字 1.00s = 10 宽度单位/秒 —— 含全角，上限维持 9，照报 fast */
    const zh = SC.checkCues([{start:0, end:1000, text:'一二三四五六七八九十'}]);
    return { en: en, zh: zh };
  })()`);
  ok(cps && Array.isArray(cps.en) && cps.en.length === 0, 'shift 英文 10 单位/秒不再误报 fast（分档上限 10）', JSON.stringify(cps && cps.en));
  ok(cps && Array.isArray(cps.zh) && cps.zh.length === 1 && cps.zh[0].why.indexOf('fast') >= 0, 'shift 中文 10 字/秒照报 fast（上限维持 9）', JSON.stringify(cps && cps.zh));

  console.log('----');
  console.log('通过 ' + P + ' / 失败 ' + F);
  srv.kill(); chrome.kill();
  process.exit(F ? 1 : 0);
})().catch(e => { console.log('FATAL', e && e.stack); process.exit(3); });
