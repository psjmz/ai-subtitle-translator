/* v0.9.286 浏览器实测：首页第五张外链卡
   - 默认（非官方域名）应隐藏；带 ?rkbanner=1 应显示
   - 点击应开新窗口，且 rel=noopener 在
   - 5 张卡在 1440 / 768 / 375 三个宽度下都不横向溢出
   - 切到日语后卡片文案跟着变（词典 27 语齐）
   用法：PORT=3098 node _chk286.js */
'use strict';
const fs = require('fs');
const { spawn } = require('child_process');
const WebSocket = require('ws');

const PORT = process.env.PORT || 3098;
const BASE = 'http://127.0.0.1:' + PORT;
const CDP = 9400 + Math.floor(Math.random() * 90);   // ⚠️ 固定端口会撞上上一次没退干净的 Chrome，导致连到旧 tab（状态污染）
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const dir = '/tmp/cr-286-' + Date.now();

let PASS = 0, FAIL = 0;
const ok = (c, n, e) => { if (c) { PASS++; console.log('  ✓ ' + n); } else { FAIL++; console.log('  ✗ ' + n + (e !== undefined ? '  → ' + e : '')); } };
const sleep = ms => new Promise(r => setTimeout(r, ms));

(async () => {
  const ch = spawn(CHROME, ['--headless=new', '--remote-debugging-port=' + CDP, '--no-sandbox',
    '--disable-gpu', '--no-proxy-server', '--user-data-dir=' + dir, 'about:blank'],
    { stdio: ['ignore', 'pipe', 'pipe'] });
  ch.stderr.on('data', () => { });
  await sleep(2500);

  let list = null;
  for (let i = 0; i < 30; i++) {
    try {
      const r = await fetch('http://127.0.0.1:' + CDP + '/json/list');
      list = await r.json();
      if (list && list.length) break;
    } catch (e) { }
    await sleep(400);
  }
  if (!list || !list.length) { console.log('起不来 Chrome'); ch.kill('SIGKILL'); process.exit(2); }

  const t = list.find(x => x.type === 'page') || list[0];
  const ws = new WebSocket(t.webSocketDebuggerUrl, { perMessageDeflate: false });
  let id = 0; const pend = new Map(); let errs = [];
  await new Promise(r => ws.on('open', r));
  ws.on('message', (raw) => {
    let m; try { m = JSON.parse(raw); } catch (e) { return; }
    if (m.id && pend.has(m.id)) { const f = pend.get(m.id); pend.delete(m.id); f(m); return; }
    if (m.method === 'Runtime.exceptionThrown') errs.push('EXC ' + JSON.stringify(m.params.exceptionDetails.text || ''));
    if (m.method === 'Runtime.consoleAPICalled' && m.params.type === 'error') {
      errs.push('CONSOLE ' + String((m.params.args || []).map(a => a.value).join(' ')).slice(0, 120));
    }
    if (m.method === 'Log.entryAdded' && m.params.entry && m.params.entry.level === 'error') {
      const u = m.params.entry.url || '';
      if (!/favicon/.test(u)) errs.push('LOG ' + String(m.params.entry.text || '').slice(0, 120));
    }
  });
  const send = (method, params) => new Promise((res, rej) => {
    const i = ++id; pend.set(i, m => m.error ? rej(new Error(method + ': ' + m.error.message)) : res(m.result));
    ws.send(JSON.stringify({ id: i, method, params: params || {} }));
  });

  async function goto(u) {
    errs = [];
    await send('Page.enable'); await send('Runtime.enable'); await send('Log.enable');
    await send('Network.enable'); await send('Network.setCacheDisabled', { cacheDisabled: true });
    await send('Page.navigate', { url: u });
    for (let i = 0; i < 60; i++) {
      const st = await ev('document.readyState');
      if (st === 'complete') break;
      await sleep(300);
    }
    await sleep(1500);
  }
  /* ⚠️ 直接求值、不再在外层 JSON.stringify —— 否则字符串会变成带引号的 '"none"'，
      比较时假红一片。需要对象的调用方自己在表达式里 JSON.stringify */
  async function ev(expr) {
    const r = await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true });
    if (r.exceptionDetails) return 'EVAL_ERR';
    return r.result.value;
  }
  async function metric(w, h) {
    await send('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: 1, mobile: false });
    await sleep(300);
  }

  console.log('\n══ v0.9.286 浏览器实测：第五张外链卡 ══');

  /* ① 默认隐藏（当前访问的是 127.0.0.1，不是官方域名） */
  await metric(1440, 900);
  await goto(BASE + '/');
  console.log('  DIAG href=' + await ev('location.href'));
  const diag = JSON.parse(await ev(`JSON.stringify({
    href: location.href,
    search: location.search,
    rkForce: (function(){ try { return String(sessionStorage.getItem('rkForce')); } catch (e) { return 'ERR'; } })(),
    inline: (document.getElementById('asCard') || {}).getAttribute('style'),
    disp: (function(){ var e = document.getElementById('asCard'); return e ? getComputedStyle(e).display : 'NOEL'; })()
  })`));
  ok(diag.disp === 'none', '默认（非官方域名）第五张卡隐藏', JSON.stringify(diag));

  /* ② 带 ?rkbanner=1 显示，且链接/新窗口属性正确 */
  await goto(BASE + '/?rkbanner=1');
  const info = JSON.parse(await ev(`(function(){var e=document.getElementById('asCard');if(!e)return JSON.stringify({});return JSON.stringify({d:getComputedStyle(e).display,href:e.getAttribute('href'),t:e.getAttribute('target'),rel:e.getAttribute('rel'),n:(e.querySelector('.tc-n')||{}).textContent,desc:(e.querySelector('.tc-d')||{}).textContent});})()`));
  ok(info.d && info.d !== 'none', '?rkbanner=1 时第五张卡显示', info.d);
  ok(info.href === 'https://astrospark.cn/', 'href 指向 astrospark.cn', info.href);
  ok(info.t === '_blank', 'target=_blank（开新页面）', info.t);
  ok(info.rel === 'noopener', 'rel=noopener 已带', info.rel);
  console.log('    卡片文案: ' + info.n + ' / ' + info.desc);
  ok(errs.length === 0, '控制台干净', errs.slice(0, 2).join(';') || '干净');

  /* ③ 卡片数量与横向溢出 */
  for (const w of [1440, 768, 375]) {
    await metric(w, 900);
    await goto(BASE + '/?rkbanner=1');
    const o = JSON.parse(await ev(`JSON.stringify({n:document.querySelectorAll('.tools-row .tc').length,cw:document.documentElement.clientWidth,sw:document.documentElement.scrollWidth})`));
    ok(o.n === 5, w + 'px 卡片数为 5', o.n);
    ok(o.sw <= o.cw + 1, w + 'px 无横向溢出', o.sw + ' vs ' + o.cw);
  }

  /* ④ 日语路由下卡片文案跟着变 */
  await metric(1440, 900);
  await goto(BASE + '/ja/?rkbanner=1');
  const ja = JSON.parse(await ev(`(function(){var e=document.getElementById('asCard');if(!e)return '{}';return JSON.stringify({n:(e.querySelector('.tc-n')||{}).textContent,desc:(e.querySelector('.tc-d')||{}).textContent});})()`));
  console.log('    日语卡片文案: ' + ja.n + ' / ' + ja.desc);
  ok(/マーケティング|動画|動画/.test(ja.n + ja.desc) && !/AI 营销视频|跨境投放素材/.test(ja.n + ja.desc),
    '日语路由下卡片文案已本地化（无中文回退）', ja.n + ' / ' + ja.desc);

  /* ⑤ 截图 */
  await metric(1440, 1000);
  await goto(BASE + '/?rkbanner=1');
  /* ⚠️ clip 必须是整数且带 scale，否则 CDP 报 "Invalid parameters" */
  const clip = JSON.parse(await ev(`(function(){var e=document.querySelector('.tools-row');var r=e.getBoundingClientRect();
    return JSON.stringify({x:Math.round(r.x+window.scrollX-10),y:Math.round(r.y+window.scrollY-10),
    width:Math.round(r.width+20),height:Math.round(r.height+20),scale:1});})()`));
  const shot = await send('Page.captureScreenshot', { format: 'png', clip });
  fs.writeFileSync(__dirname + '/../chk286-cards.png', Buffer.from(shot.data, 'base64'));
  console.log('  已存 chk286-cards.png');

  ws.close(); try { ch.kill('SIGKILL'); } catch (e) { }
  try { fs.rmSync(dir, { recursive: true, force: true }); } catch (e) { }
  console.log('\n—— 浏览器实测：通过 ' + PASS + ' / 失败 ' + FAIL + ' ——\n');
  setTimeout(() => process.exit(FAIL ? 1 : 0), 500);
})().catch(e => { console.error('崩了:', e.message); process.exit(2); });
