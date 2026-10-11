/* v0.9.276 实测：一个颜色 = 一个模块
   验的是「真渲染出来是什么色」，不是「源码里写了什么色」：
     ① 首页三张卡各自认领色线（图标底 / 标签 / 当前页 pill 三处都跟自己那条线走）
     ② 整卡可点（href 挂在 .mod-card 上）、「进入」在右上角、当前页不是虚线框
     ③ 三个子页面各认领一条：导航选中态的实测颜色分别是粉 / 绿 / 紫
     ④ 三页底色一致
     ⑤ 无 JS 异常、无横向溢出
   顺带截三张图（/tmp/shot276-*.png）给人眼复核。 */
'use strict';
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');
const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PORT = 9342, BASE = 'http://127.0.0.1:3098';
const wait = ms => new Promise(r => setTimeout(r, ms));
let PASS = 0, FAIL = 0, ws, tid = 0; const pending = new Map(); const jsErrors = [];
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
async function goto(url) {
  await send('Page.navigate', { url: 'about:blank' });
  await wait(250);
  await send('Page.navigate', { url });
  for (let i = 0; i < 30; i++) { try { if (await ev('document.readyState') === 'complete') break; } catch (e) { } await wait(500); }
  await wait(2200);
}
/* 截图：先定视口 → 再滚到目标 → 再量 rect（改视口会重排，顺序反了坐标就作废） */
async function shot(sel, file, pad) {
  await ev(`document.querySelector(${JSON.stringify(sel)}).scrollIntoView({block:'center'})`);
  await wait(700);
  const r = JSON.parse(await ev(`JSON.stringify((function(){var b=document.querySelector(${JSON.stringify(sel)}).getBoundingClientRect();
    return {x:Math.max(0,b.x-8), y:b.y+window.scrollY-8, w:Math.min(b.width+16, 1440), h:b.height+16};})())`));
  const rr = await send('Page.captureScreenshot', {
    format: 'png',
    clip: { x: r.x, y: r.y, width: r.w, height: Math.min(r.h, 1400), scale: 2 }
  });
  fs.writeFileSync(file, Buffer.from(rr.data, 'base64'));
  return file + ' (' + Math.round(r.w) + '×' + Math.round(Math.min(r.h, 1400)) + ')';
}
const css = (sel, prop) => ev(`getComputedStyle(document.querySelector(${JSON.stringify(sel)})).${prop}`);

(async () => {
  const chrome = spawn(CHROME, [
    '--headless=new', '--remote-debugging-port=' + PORT, '--no-sandbox', '--disable-gpu',
    '--remote-allow-origins=*', '--window-size=1440,1200', '--no-proxy-server',
    '--user-data-dir=/tmp/cbuddy-chk276-' + Date.now()
  ], { stdio: 'ignore' });
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
    if (m.method === 'Runtime.exceptionThrown') jsErrors.push((((m.params.exceptionDetails || {}).exception || {}).description || '').slice(0, 200));
    if (m.id && pending.has(m.id)) { const p = pending.get(m.id); pending.delete(m.id); m.error ? p.rej(new Error(JSON.stringify(m.error))) : p.res(m.result); }
  });
  await send('Runtime.enable');
  await send('Page.enable');
  await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1100, deviceScaleFactor: 2, mobile: false });

  /* ---------- ① 首页三卡 ---------- */
  console.log('\n【① 首页分区介绍 · 三张卡各自认领色线】');
  await goto(BASE + '/');
  const cards = JSON.parse(await ev(`JSON.stringify([].slice.call(document.querySelectorAll('.mod-card')).map(function(c){
    var ic=c.querySelector('.mod-ic'), tg=c.querySelector('.mod-tag'), cr=c.querySelector('.mod-cur');
    return { cls:c.className, href:c.getAttribute('href'),
      icBg:getComputedStyle(ic).backgroundColor, icFg:getComputedStyle(ic).color,
      tagBg:tg?getComputedStyle(tg).backgroundColor:'', tagFg:tg?getComputedStyle(tg).color:'',
      tagTxt:tg?tg.textContent:'', curBg:cr?getComputedStyle(cr).backgroundColor:'' };
  }))`));
  ok(cards.length === 3, '首页有三张模块卡', cards.length);
  const WANT = [
    ['粉', 'rgb(253, 241, 246)', 'rgb(192, 33, 89)'],
    ['绿', 'rgb(230, 246, 239)', 'rgb(11, 122, 92)'],
    ['紫', 'rgb(238, 237, 254)', 'rgb(83, 74, 183)']
  ];
  cards.forEach((c, i) => {
    ok(c.icBg === WANT[i][1], WANT[i][0] + '卡图标底是自己的色线', c.icBg);
    ok(c.icFg === WANT[i][2], WANT[i][0] + '卡图标是自己的色线', c.icFg);
    ok(c.tagBg === WANT[i][1] && c.tagFg === WANT[i][2], WANT[i][0] + '卡标签跟着色线走', c.tagTxt);
  });
  ok(cards[0].curBg === 'rgb(253, 241, 246)', '「当前页」pill 是粉色（跟着翻译卡）', cards[0].curBg);
  ok(cards[0].href === '/' && cards[1].href === '/clean.html' && cards[2].href === '/merge.html',
    '三张卡各自指向正确页面', cards.map(c => c.href).join(' '));

  const layout = JSON.parse(await ev(`JSON.stringify((function(){
    var c=document.querySelector('.mod-card.tr'), ic=c.querySelector('.mod-ic'), go=c.querySelector('.mod-go');
    var a=ic.getBoundingClientRect(), b=go.getBoundingClientRect();
    return { sameRow: Math.abs(a.top-b.top) < 30, goRight: b.left > a.left + 40,
      dashed: getComputedStyle(c).borderStyle, isLink: c.tagName };
  })())`));
  ok(layout.isLink === 'A', '整张卡是链接（点击目标更大）', layout.isLink);
  ok(layout.sameRow && layout.goRight, '「进入」在图标那一行的最右边', '同排=' + layout.sameRow + ' 靠右=' + layout.goRight);
  ok(layout.dashed.indexOf('dashed') < 0, '当前页没有再用虚线框', layout.dashed);
  ok(await ev(`document.querySelectorAll('.mod-k').length`) === 0, '「解决什么 / 适合谁」已从卡片撤掉');
  /* 三张卡等高、标签行水平对齐 —— 要点行数不一样（1 行 / 2 行混着），
     靠 .mod-tags 的 margin-top:auto 收口；不加就一眼看出参差。 */
  const box = JSON.parse(await ev(`JSON.stringify([].slice.call(document.querySelectorAll('.mod-card')).map(function(c){
    var g=c.getBoundingClientRect(), t=c.querySelector('.mod-tags').getBoundingClientRect();
    return { h: Math.round(g.height), tagTop: Math.round(t.top) };
  }))`));
  ok(Math.max.apply(null, box.map(b => b.h)) - Math.min.apply(null, box.map(b => b.h)) <= 1,
    '三张卡等高', box.map(b => b.h).join(' / '));
  ok(Math.max.apply(null, box.map(b => b.tagTop)) - Math.min.apply(null, box.map(b => b.tagTop)) <= 1,
    '三张卡的标签行水平对齐', box.map(b => b.tagTop).join(' / '));
  console.log('  → 截图 ' + await shot('.mod-sec', '/tmp/shot276-home.png'));

  /* ---------- ② 三个子页面各认领一条 ---------- */
  const PAGES = [
    ['翻译页 index.html', '/', '粉', 'rgb(192, 33, 89)'],
    ['清洗页 clean.html', '/clean.html', '绿', 'rgb(11, 122, 92)'],
    ['特效页 merge.html', '/merge.html', '紫', 'rgb(83, 74, 183)']
  ];
  console.log('\n【② 三个子页面各认领一条色线（导航选中态的实测颜色）】');
  for (const [name, path, cn, want] of PAGES) {
    await goto(BASE + path);
    const got = await ev(`(function(){
      var p=document.querySelector('#siteNav a.snav-pill.on');
      return p ? getComputedStyle(p).color : '(没有选中态)';
    })()`);
    ok(got === want, name + ' 的选中态是' + cn + '色', got);
    const bg = await ev(`getComputedStyle(document.body).backgroundColor`);
    ok(bg === 'rgb(246, 246, 248)', name + ' 底色是统一的冷灰 #F6F6F8', bg);
    const ovf = await ev(`document.documentElement.scrollWidth > document.documentElement.clientWidth + 1`);
    ok(!ovf, name + ' 没有横向溢出');
  }
  console.log('  → 截图 ' + await shot('.wrap, body', '/tmp/shot276-merge.png'));
  await goto(BASE + '/clean.html');
  console.log('  → 截图 ' + await shot('#app, .wrap, body', '/tmp/shot276-clean.png'));

  /* ---------- ③ 无 JS 异常 ---------- */
  console.log('\n【③ 整轮无 JS 异常】');
  ok(jsErrors.length === 0, '没有 JS 异常', jsErrors.join(' | ') || '干净');

  console.log('\n' + (FAIL ? '✗ 失败 ' + FAIL + ' / 通过 ' + PASS : '✓ 全部通过 ' + PASS));
  try { ws.close(); chrome.kill(); } catch (e) { }
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error('FATAL', e); try { chrome.kill(); } catch (x) { } process.exit(2); });
