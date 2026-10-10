/* v0.9.273 实测（B 版）：首页三大模块分区 + 特效页 / 清洗页 27 语 SEO
   验的是真浏览器：真开三个语言路由，看界面语言有没有跟着 URL 走。
   契约：
     ① 首页「三大模块」版块真的渲染出来（三张卡 / 每张三条能做什么 / 入口指对页）
     ② /en/merge.html：title 是英文、界面语言是英文、静态文案是英文
     ③ /en/clean.html：语言下拉 27 项、选中 en、界面文案是英文
     ④ /ja/clean.html：选中 ja、静态文案是日文
     ⑤ 整轮无 JS 异常 */
'use strict';
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');
const http = require('http');
const { spawn } = require('child_process');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PORT = 9333, BASE = 'http://127.0.0.1:3098';
const wait = ms => new Promise(r => setTimeout(r, ms));
let PASS = 0, FAIL = 0, ws, tid = 0; const pending = new Map(); const events = [];
const ok = (c, n, x) => { console.log((c ? '  ✓ ' : '  ✗ ') + n + (x !== undefined ? '  [' + x + ']' : '')); c ? PASS++ : FAIL++; };
function send(method, params, sessionId) {
  const id = ++tid; const msg = { id, method, params: params || {} };
  if (sessionId) msg.sessionId = sessionId;
  ws.send(JSON.stringify(msg));
  return new Promise((res, rej) => {
    pending.set(id, { res, rej });
    setTimeout(() => { if (pending.has(id)) { pending.delete(id); rej(new Error('timeout ' + method)); } }, 20000);
  });
}
async function ev(expr, sessionId) {
  const r = await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true }, sessionId);
  if (r.exceptionDetails) throw new Error(r.exceptionDetails.text + ' ' + ((r.exceptionDetails.exception || {}).description || ''));
  return r.result.value;
}
async function goto(url, sessionId) {
  await send('Page.navigate', { url: 'about:blank' }, sessionId);   /* 防缓存：先 blank 再真跳 */
  await wait(200);
  await send('Page.navigate', { url }, sessionId);
  await wait(2600);
}

(async () => {
  const chrome = spawn(CHROME, [
    '--headless=new', '--remote-debugging-port=' + PORT, '--no-sandbox', '--disable-gpu',
    '--remote-allow-origins=*', '--window-size=1440,1600', '--no-proxy-server',
    '--user-data-dir=/tmp/cbuddy-chk273-' + Date.now()
  ], { stdio: 'ignore' });
  /* Chrome 起得慢（首次建 profile 更慢）：轮询到 devtools 真的在听为止，别拿固定 sleep 赌 */
  let list = null;
  for (let i = 0; i < 20 && !list; i++) {
    await wait(1000);
    list = await new Promise(res => {
      const q = http.get('http://127.0.0.1:' + PORT + '/json/list', r => { let b = ''; r.on('data', d => b += d); r.on('end', () => res(JSON.parse(b))); });
      q.on('error', () => res(null));
    });
  }
  if (!list) throw new Error('Chrome 没起来（devtools 端口无响应）');
  const page = list.find(t => t.type === 'page');
  ws = new WebSocket(page.webSocketDebuggerUrl, { perMessageDeflate: false });
  await new Promise(r => ws.on('open', r));
  ws.on('message', buf => {
    const m = JSON.parse(buf.toString());
    if (m.id && pending.has(m.id)) { const p = pending.get(m.id); pending.delete(m.id); m.error ? p.rej(new Error(JSON.stringify(m.error))) : p.res(m.result); }
    else if (m.method) events.push(m);
  });
  await send('Page.enable'); await send('Runtime.enable');
  await send('Network.setCacheDisabled', { cacheDisabled: true });
  await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1400, deviceScaleFactor: 1, mobile: false });

  const errs = () => events.filter(e => e.method === 'Runtime.exceptionThrown')
    .map(e => ((e.params.exceptionDetails.exception || {}).description) || e.params.exceptionDetails.text);

  /* ---------- ① 首页三大模块 ---------- */
  console.log('\n【① 首页三大模块分区】');
  await goto(BASE + '/');
  ok(await ev(`document.querySelectorAll('.mod-sec .mod-card').length`) === 3,
    '渲染出 3 张模块卡', await ev(`document.querySelectorAll('.mod-sec .mod-card').length`));
  ok(await ev(`document.querySelectorAll('.mod-sec .mod-card .mod-do li').length`) === 9,
    '每张 3 条「能做什么」= 共 9 条', await ev(`document.querySelectorAll('.mod-sec .mod-card .mod-do li').length`));
  ok(String(await ev(`document.getElementById('modSecTitle').textContent`)).length > 0,
    '分区标题有文案', await ev(`document.getElementById('modSecTitle').textContent`));
  ok(await ev(`[].slice.call(document.querySelectorAll('.mod-go')).map(function(a){return a.getAttribute('href');}).join(',')`) === '/,/clean.html,/merge.html',
    '三个入口指向三个页面', await ev(`[].slice.call(document.querySelectorAll('.mod-go')).map(function(a){return a.getAttribute('href');}).join(',')`));
  ok(await ev(`getComputedStyle(document.querySelector('.mod-sec')).display`) !== 'none', '版块真的可见（不是被 CSS 藏了）');

  /* ---------- ② /en/merge.html ---------- */
  console.log('\n【② /en/merge.html：title / 界面 / 静态文案全英文】');
  await goto(BASE + '/en/merge.html');
  ok(String(await ev(`document.title`)).indexOf('Styled Subtitle Maker') === 0,
    'title 是英文', await ev(`document.title`));
  ok(await ev(`document.documentElement.lang`) === 'en', 'html lang=en', await ev(`document.documentElement.lang`));
  ok(await ev(`(typeof UI!=='undefined') && UI.lang`) === 'en', '界面语言是 en', await ev(`(typeof UI!=='undefined') && UI.lang`));
  ok(String(await ev(`(document.querySelector('section.seo h2')||{}).textContent`)).indexOf('Styled Subtitle Maker') >= 0,
    '静态文案块是英文', String(await ev(`(document.querySelector('section.seo h2')||{}).textContent`)).slice(0, 40));

  /* ---------- ③ /en/clean.html ---------- */
  console.log('\n【③ /en/clean.html：下拉 27 项 / 界面英文】');
  await goto(BASE + '/en/clean.html');
  ok(String(await ev(`document.title`)).indexOf('Subtitle Cleaner') === 0, 'title 是英文', await ev(`document.title`));
  ok(await ev(`document.getElementById('langSel').options.length`) === 27,
    '语言下拉 27 项', await ev(`document.getElementById('langSel').options.length`));
  ok(await ev(`document.getElementById('langSel').value`) === 'en', 'URL 语言优先，选中 en', await ev(`document.getElementById('langSel').value`));
  ok(/Subtitle\s*Cleaner/i.test(String(await ev(`document.querySelector('.hero h1').textContent`))),
    '大标题跟着界面语言走（不是硬编码中文）', await ev(`document.querySelector('.hero h1').textContent`));
  /* 头部 / 页脚三处原本是写死在 HTML 里的中文，最容易漏 */
  const cn = await ev(`[].slice.call(document.querySelectorAll('.hero h1, .hero p, footer span')).map(function(e){return e.textContent;}).join('|')`);
  ok(!/[\u4e00-\u9fa5]/.test(String(cn)), '头部与页脚没有残留中文', String(cn).slice(0, 60).replace(/\n/g, ' '));

  /* ---------- ④ /ja/clean.html ---------- */
  console.log('\n【④ /ja/clean.html：界面与文案跟到日文】');
  await goto(BASE + '/ja/clean.html');
  ok(await ev(`document.documentElement.lang`) === 'ja', 'html lang=ja', await ev(`document.documentElement.lang`));
  ok(await ev(`document.getElementById('langSel').value`) === 'ja', '选中 ja', await ev(`document.getElementById('langSel').value`));
  ok(String(await ev(`(document.querySelector('section.seo h2')||{}).textContent`)).indexOf('字幕クリーニング') >= 0,
    '静态文案是日文', String(await ev(`(document.querySelector('section.seo h2')||{}).textContent`)).slice(0, 40));

  /* ---------- ⑤ 异常 ---------- */
  console.log('\n【⑤ JS 异常】');
  const es = errs();
  ok(es.length === 0, '整轮无 JS 异常', es.slice(0, 3).join(' | '));

  console.log('\n—— ' + PASS + ' 通过 / ' + FAIL + ' 失败 ——');
  ws.close();
  try { chrome.kill(); } catch (e) { /* noop */ }
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error('FATAL', e); process.exit(2); });
