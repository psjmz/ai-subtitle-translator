/* _verify325.js：v0.9.325 指南页重做 —— 真 server + 真浏览器验收（内部脚本，不进部署包）
   验的六件事：① 左分组导航三组且当前篇唯一高亮 ② 右栏目录与正文 h2 锚点一一对应
   ③ 深色行动带恰好一条 ④ 相关指南卡片数 = related 数 ⑤ 单左轴线（h1/正文/行动带/相关）
   ⑥ 索引页收掉右栏、手机 390 零溢出。另存三语截图。 */
'use strict';
const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');

const ROOT = '/Users/jp/WorkBuddy/2026-09-04-00-29-54/srt-translator';
const PORT = 3357;
const OUT = ROOT + '/_design325';
const wait = ms => new Promise(r => setTimeout(r, ms));
let pass = 0, fail = 0;
const ok = (c, m) => { if (c) { pass++; console.log('  ✓ ' + m); } else { fail++; console.log('  ✗ ' + m); } };

const PROBE = `
(() => {
  const g = s => { const e = document.querySelector(s); if (!e) return null;
    const r = e.getBoundingClientRect(); return { l: Math.round(r.left), r: Math.round(r.right), w: Math.round(r.width) }; };
  const n = s => document.querySelectorAll(s).length;
  const ov = [...document.querySelectorAll('body *')].filter(e => e.getBoundingClientRect().right > innerWidth + 1)
    .slice(0, 5).map(e => e.tagName + '.' + (e.className || '').toString().split(' ')[0]);
  const cur = document.querySelector('.snav a[aria-current="page"]');
  return JSON.stringify({
    视口: innerWidth, 文档宽: document.documentElement.scrollWidth, 溢出元素: ov,
    dir: document.documentElement.getAttribute('dir') || 'ltr',
    shell类: (document.querySelector('.shell') || {}).className,
    左栏组数: n('.snav-grp'), 左栏条目: n('.snav a'), 当前项: cur ? cur.getAttribute('href') : null,
    h2数: n('.doc h2[id]'), toc数: n('.toc a'),
    深色带: n('.gcta'), 相关卡: n('.grel a'), 图: n('.gfig'),
    h1: g('h1'), 正文段: g('.doc p'), 行动带: g('.gcta'), 相关标题: g('.grelnav'),
    左栏: g('.snav'), 右栏: g('.rail'), 右栏可见: (() => { const e = document.querySelector('.rail');
      return !!e && e.getBoundingClientRect().width > 0 && getComputedStyle(e).display !== 'none'; })(),
    intro: (document.querySelector('.gintro') || {}).textContent,
    meto: (document.querySelector('.ameta') || {}).textContent,
    cta文案: (document.querySelector('.gcta p') || {}).textContent,
    索引卡片: n('.glist a'),
    索引列: (() => { const e = document.querySelector('.glist');
      return e ? getComputedStyle(e).gridTemplateColumns : null; })(),
    索引卡宽: g('.glist a'),
    文档内容宽: g('.doc'),
    索引表宽: g('.glist'),
    索引组宽: g('.ggrp')
  });
})()`;

(async () => {
  const srv = spawn(process.execPath, [ROOT + '/server.js'],
    { env: Object.assign({}, process.env, { PORT: String(PORT), PUBLIC_URL: 'http://127.0.0.1:' + PORT }), stdio: 'ignore' });
  let up = false;
  for (let i = 0; i < 40 && !up; i++) { await wait(250);
    up = await new Promise(res => http.get('http://127.0.0.1:' + PORT + '/', () => res(true)).on('error', () => res(false))); }
  if (!up) { console.error('server 起不来'); process.exit(1); }

  const chrome = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', [
    '--headless', '--remote-debugging-port=9377', '--no-first-run',
    '--user-data-dir=/tmp/v325-' + Date.now(),
    '--host-resolver-rules=MAP * ~NOTFOUND, EXCLUDE 127.0.0.1', 'about:blank'], { stdio: 'ignore' });
  let list = null;
  for (let i = 0; i < 30 && !list; i++) { await wait(500);
    list = await new Promise(res => http.get('http://127.0.0.1:9377/json/list', r => { let d = ''; r.on('data', c => d += c); r.on('end', () => res(JSON.parse(d))); }).on('error', () => res(null))); }
  const page = list.find(t => t.type === 'page') || list[0];
  const ws = new WebSocket(page.webSocketDebuggerUrl, { perMessageDeflate: false });
  let mid = 0; const pend = {};
  ws.on('message', d => { const m = JSON.parse(d); if (m.id && pend[m.id]) { pend[m.id](m); delete pend[m.id]; } });
  await new Promise(r => ws.on('open', r));
  const send = (method, params) => new Promise(r => {
    const id = ++mid;
    /* ⚠️ 8s 超时兜底：CDP 偶发不响应时不能让整条验收挂死 */
    const t = setTimeout(() => { delete pend[id]; r({ __timeout: true, method: method }); }, 8000);
    pend[id] = m => { clearTimeout(t); r(m); };
    ws.send(JSON.stringify({ id, method, params: params || {} }));
  });
  /* ⚠️ 必须先 enable：漏了 Runtime.enable 时 Runtime.evaluate 会不返回（本轮踩过，卡了 5 分钟） */
  await send('Runtime.enable'); await send('Page.enable');

  const shot = async (file) => {
    const r = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(OUT + '/' + file, Buffer.from(r.result.data, 'base64'));
  };
  const visit = async (url, w, h) => {
    await send('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: 1, mobile: w < 600 });
    await send('Page.navigate', { url });
    for (let i = 0; i < 40; i++) { await wait(200);
      const ev = await send('Runtime.evaluate', { expression: 'document.readyState' });
      if (ev.result.result.value === 'complete') break; }
    await wait(900);
    const st = await send('Runtime.evaluate', { expression: PROBE, returnByValue: true });
    return JSON.parse(st.result.result.value);
  };

  const B = 'http://127.0.0.1:' + PORT;

  console.log('\n[1] zh-CN 文章页 /guides/shift.html @1280');
  let d = await visit(B + '/guides/shift.html', 1280, 900);
  console.log('   ' + JSON.stringify(d).slice(0, 420));
  ok(d.左栏组数 === 3, '左导航三组（实际 ' + d.左栏组数 + '）');
  ok(d.当前项 === '/guides/shift.html', '当前篇唯一高亮 = shift（' + d.当前项 + '）');
  ok(d.h2数 > 0 && d.h2数 === d.toc数, 'h2 锚点数 = 目录项数（' + d.h2数 + ' / ' + d.toc数 + '）');
  ok(d.深色带 === 1, '深色行动带恰好一条（' + d.深色带 + '）');
  ok(d.相关卡 === 4, '相关指南 4 张（' + d.相关卡 + '）');
  ok(d.图 === 3, '正文 3 张图（' + d.图 + '）');
  ok(d.h1.l === d.正文段.l && d.h1.l === d.行动带.l && d.h1.l === d.相关标题.l,
    '单左轴线 h1/正文/行动带/相关 = ' + d.h1.l + '/' + d.正文段.l + '/' + d.行动带.l + '/' + d.相关标题.l);
  ok(d.溢出元素.length === 0, '零溢出元素');
  ok(d.右栏可见 === true, '右栏「本页内容」可见');
  ok(/浏览器/.test(d.cta文案 || ''), '行动带引句已注入（' + (d.cta文案 || '').slice(0, 20) + '）');
  await shot('live325-zh.png');

  console.log('\n[2] zh-CN 索引页 /guides/ @1280');
  d = await visit(B + '/guides/', 1280, 900);
  console.log('   ' + JSON.stringify(d).slice(0, 300));
  ok(/gidx/.test(d.shell类 || ''), 'shell 带 gidx 类（收右栏）');
  ok(d.右栏可见 === false, '索引页右栏已收起');
  ok(d.索引卡片 === 5, '索引页 5 张卡片（' + d.索引卡片 + '）');
  console.log('   索引页列宽：' + d.索引列 + ' ｜ 卡宽 ' + (d.索引卡宽 && d.索引卡宽.w)
    + ' ｜ glist 宽 ' + (d.索引表宽 && d.索引表宽.w) + ' ｜ ggrp 宽 ' + (d.索引组宽 && d.索引组宽.w)
    + ' ｜ doc 宽 ' + (d.文档内容宽 && d.文档内容宽.w));
  ok(d.文档内容宽.w > 850, '索引页正文占满整行（doc 宽 ' + (d.文档内容宽 && d.文档内容宽.w) + '）');
  ok(d.溢出元素.length === 0, '零溢出元素');
  await shot('live325-index.png');

  console.log('\n[3] en 文章页 /en/guides/shift.html @1280');
  d = await visit(B + '/en/guides/shift.html', 1280, 900);
  console.log('   ' + JSON.stringify(d).slice(0, 320));
  ok(d.当前项 === '/en/guides/shift.html', 'en 当前项带语言前缀（' + d.当前项 + '）');
  ok(/Updated/.test(d.meto || ''), 'en meta 用 Updated（' + d.meto + '）');
  ok(/browser/i.test(d.cta文案 || ''), 'en 行动带引句（' + (d.cta文案 || '').slice(0, 30) + '）');
  ok(d.h2数 === d.toc数 && d.深色带 === 1, 'en 目录/行动带同样成立');
  await shot('live325-en.png');

  console.log('\n[4] ar 文章页（RTL）/ar/guides/shift.html @1280');
  d = await visit(B + '/ar/guides/shift.html', 1280, 900);
  console.log('   ' + JSON.stringify(d).slice(0, 320));
  ok(d.dir === 'rtl', 'html dir=rtl');
  ok(d.左栏.l > d.h1.l, 'RTL 下左栏跑到右边（左栏 ' + d.左栏.l + ' > 正文 ' + d.h1.l + '）');
  ok(d.溢出元素.length === 0, '零溢出元素');
  await shot('live325-ar.png');

  console.log('\n[5] 手机 390 @zh-CN 文章页');
  d = await visit(B + '/guides/shift.html', 390, 844);
  console.log('   ' + JSON.stringify(d).slice(0, 300));
  /* ⚠️ 移动端 innerWidth 由 <meta viewport> 决定，不等于 deviceMetricsOverride 的 390；
     要验的是「文档宽 = 视口宽」= 没有横向溢出，别把数字写死 */
  ok(d.文档宽 === d.视口, '无横向溢出：文档宽 = 视口宽（' + d.文档宽 + ' / ' + d.视口 + '）');
  ok(d.溢出元素.length === 0, '零溢出元素');
  ok(d.右栏可见 === false, '窄屏右栏收起');
  ok(d.左栏.w > 300, '左栏折到顶部占满（宽 ' + d.左栏.w + '）');
  await shot('live325-mobile.png');

  console.log('\n===== ' + pass + ' 通过 / ' + fail + ' 失败 =====');
  ws.close(); chrome.kill(); srv.kill(); process.exit(fail ? 1 : 0);
})().catch(e => { console.error('FATAL', e.message); process.exit(1); });
