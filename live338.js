/* live338.js —— 338 扩语言：外网实测 https://ai-srtsub.com
   ⚠️ 不挂代理（阿里云直连，模板沿用 live315）。
   量：下拉 100 项 / 25 种新语言在位 / 行宽联动 / 缓存参数 / 100 语言文案 / 无异常。 */
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
const ok = (c, n, x) => { console.log((c ? '  ✓ ' : '  ✗ ') + n + (x !== undefined ? '  [' + String(x).slice(0, 140) + ']' : '')); c ? P++ : F++; };

const NEW25 = ['yue','be','tg','ky','tk','bs','mt','cy','ga','hy','ka','ti','bo','ug','sd','yi','jv','su','ceb','mg','ig','xh','sn','ny','mi'];

(async () => {
  const chrome = spawn(CHROME, ['--headless=new', '--remote-debugging-port=' + PORT, '--no-sandbox', '--disable-gpu',
    '--lang=zh-CN', '--user-data-dir=/tmp/cr-live338-' + Date.now(), 'about:blank'], { stdio: 'ignore' });
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
  await send('Page.enable'); await send('Runtime.enable'); await send('Log.enable');
  await send('Network.setCacheDisabled', { cacheDisabled: true });

  const errs = [];
  ws.on('message', d => {
    const m = JSON.parse(d);
    if (m.method === 'Runtime.exceptionThrown') errs.push('JS 异常: ' + ((m.params || {}).exceptionDetails || {}).text);
    if (m.method === 'Log.entryAdded' && ((((m.params || {}).entry) || {}).level) === 'error') errs.push('console.error: ' + m.params.entry.text);
  });

  async function go(url) {
    await send('Page.navigate', { url });
    for (let i = 0; i < 50; i++) { const st = await ev('document.readyState'); if (st === 'complete') break; await wait(300); }
    await wait(1500);
  }

  console.log('— ① 翻译页：下拉 100 项 —');
  await go(BASE + '/translate.html?_=' + Date.now());
  let d = await ev(`({ href: location.href, ready: document.readyState,
    core: typeof window.SrtCore,
    bust: (document.querySelector('script[src^="srt-core.js"]')||{src:''}).src,
    dst: (document.getElementById('dstLang')||{options:[]}).options.length,
    src: (document.getElementById('srcLang')||{options:[]}).options.length })`);
  ok(d.ready === 'complete' && d.core === 'object' && d.dst > 0, 'DIAG：页面 + 引擎就位', JSON.stringify(d));
  ok(d.dst === 100, '目标语言下拉 100 项（原 75）', d.dst);
  ok(d.src === 101, '源语言下拉 101 项（100 种 + auto）', d.src);
  ok(/\?v=0\.9\.325/.test(d.bust), 'srt-core 缓存参数仍是 325（本批不占版号）', d.bust);

  console.log('— ② 25 种新语言在位，显示名是自称 —');
  d = await ev(`(() => {
    const sel = document.getElementById('dstLang');
    const m = {}; Array.prototype.forEach.call(sel.options, o => m[o.value] = o.textContent.trim());
    return { miss: ${JSON.stringify(NEW25)}.filter(c => !(c in m)),
             thin: ${JSON.stringify(NEW25)}.filter(c => (c in m) && !m[c]),
             names: ['yue','hy','ka','bo','ti','ug','sd','yi','mi'].map(c => c + '=' + (m[c]||'')) };
  })()`);
  ok(d.miss.length === 0, '新增 25 种全部出现在下拉里', d.miss.join(','));
  ok(d.thin.length === 0, '新增 25 种都有非空显示名', d.thin.join(','));
  ok(true, '抽样自称（yue/hy/ka/bo/ti/ug/sd/yi/mi）', d.names.join(' '));

  console.log('— ③ 行宽联动：粤语 16 / 其余 21 —');
  d = await ev(`(() => {
    const sel = document.getElementById('dstLang');
    const out = {};
    ['yue','bo','mi','en','zh-CN'].forEach(c => {
      for (let i=0;i<sel.options.length;i++) if (sel.options[i].value === c) { sel.selectedIndex = i; break; }
      sel.dispatchEvent(new Event('change', {bubbles:true}));
      const inp = document.getElementById('maxW') || document.querySelector('input[name=maxW]') || document.querySelector('#maxw');
      out[c] = inp ? inp.value : null;
    });
    return out;
  })()`);
  ok(d.yue === '16' || d.yue === 16, '切到粤语 → 行宽联动成 16（汉字口径）', JSON.stringify(d));
  ok(d.bo === '21' || d.bo === 21, '切到藏文 → 行宽 21（非 CJK 口径）', JSON.stringify(d));

  console.log('— ④ 100 语言文案（SEO 由 server.js 渲染，重启生效）—');
  await go(BASE + '/en/translate.html?_=' + Date.now());
  d = await ev(`(() => {
    const md = (document.querySelector('meta[name=description]')||{content:''}).content;
    const og = (document.querySelector('meta[property="og:description"]')||{content:''}).content;
    const txt = document.body.innerText;
    return { has100: md.indexOf('100 languages') >= 0 || og.indexOf('100 languages') >= 0 || txt.indexOf('100 languages') >= 0,
             has75: md.indexOf('75 languages') >= 0 || og.indexOf('75 languages') >= 0 || txt.indexOf('75 languages') >= 0,
             desc: md.slice(0, 120) };
  })()`);
  ok(d.has100 && !d.has75, '英文翻译页 SEO 描述已是 100 languages、无 75', JSON.stringify(d));

  await go(BASE + '/?_=' + Date.now());
  d = await ev(`({ ver: (document.querySelector('.ver')||{}).textContent,
                    has75zh: document.body.innerText.indexOf('75 种语言') >= 0,
                    has100zh: document.body.innerText.indexOf('100 种语言') >= 0 })`);
  ok(d.ver === 'v0.9.325', '首页版号仍是 v0.9.325', d.ver);
  ok(!d.has75zh, '首页已无「75 种语言」', JSON.stringify(d));

  ok(errs.length === 0, '全程无 JS 异常 / console.error', errs.slice(0, 3).join(' | '));

  console.log('\n' + P + ' ✓ / ' + F + ' ✗');
  chrome.kill();
  process.exit(F ? 1 : 0);
})();
