/* v0.9.297 外网实测（走代理 7897 起 headless Chrome 打线上 https://ai-srtsub.com/translate.html）
   重点：① 版号真的上去了 ② 折行那句说明确实收进了 ⓘ（页面正文里再也搜不到）
        ③ 导出格式面板真的矮了 ④ 任务条那句提醒只在跑的时候在、且跟着语言走
        ⑤ 控制台干净 ⑥ 移动端不塌 */
'use strict';
process.on('unhandledRejection', () => { });
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');
const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
/* ⚠️ 端口不能写死：上一轮没退干净的 Chrome 还占着同一个端口时，
   新起的那个根本绑不上，/json/list 会把**旧浏览器**的目标列表给我 ——
   表现就是「页面里全是我没写过的语言」（实测撞过一次：拿到的是别人家一个罗马尼亚语标签页），
   而所有断言会以一种完全看不懂的方式红掉。 */
const PORT = 9400 + Math.floor(Math.random() * 90), SITE = 'https://ai-srtsub.com';
const OUT = '/Users/jp/WorkBuddy/2026-09-04-00-29-54';
const wait = ms => new Promise(r => setTimeout(r, ms));
let PASS = 0, FAIL = 0, ws, tid = 0;
const pending = new Map();
const ok = (c, n, x) => { console.log((c ? '  ✓ ' : '  ✗ ') + n + (x !== undefined ? '  [' + String(x).slice(0, 140) + ']' : '')); c ? PASS++ : FAIL++; };
function send(m, p) {
  const id = ++tid; ws.send(JSON.stringify({ id, method: m, params: p || {} }));
  return new Promise((res, rej) => { pending.set(id, { res, rej }); setTimeout(() => { if (pending.has(id)) { pending.delete(id); rej(new Error('timeout ' + m)); } }, 40000); });
}
async function ev(e) {
  const r = await send('Runtime.evaluate', { expression: e, returnByValue: true, awaitPromise: true });
  if (r.exceptionDetails) throw new Error(r.exceptionDetails.text);
  return r.result.value;
}
async function goto(u) {
  await send('Page.navigate', { url: 'about:blank' }); await wait(200);
  await send('Page.navigate', { url: u });
  for (let i = 0; i < 60; i++) { try { if (await ev('document.readyState') === 'complete') break; } catch (e) { } await wait(400); }
  await wait(2500);
}
async function metric(w, h) { await send('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: 1, mobile: w < 500 }); await wait(400); }
async function shot(name) {
  const r = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(OUT + '/' + name, Buffer.from(r.data, 'base64'));
}

let errs = [];
(async () => {
  const dir = '/tmp/live297-' + Date.now();
  const ch = spawn(CHROME, ['--headless=new', '--disable-gpu', '--no-sandbox',
    '--proxy-server=http://127.0.0.1:7897', '--remote-debugging-port=' + PORT,
    '--user-data-dir=' + dir, 'about:blank'], { stdio: 'ignore' });
  await wait(3000);
  let list = null;
  for (let i = 0; i < 30; i++) {
    try { list = await new Promise((res, rej) => http.get({ host: '127.0.0.1', port: PORT, path: '/json/list' }, r => { let d = ''; r.on('data', c => d += c); r.on('end', () => res(JSON.parse(d))); }).on('error', rej)); if (list && list.length) break; } catch (e) { }
    await wait(600);
  }
  const tgt = (list || []).find(t => t.type === 'page');
  ws = new WebSocket(tgt.webSocketDebuggerUrl, { perMessageDeflate: false, maxPayload: 256 * 1024 * 1024 });
  await new Promise((res, rej) => { ws.on('open', res); ws.on('error', rej); });
  ws.on('message', s => {
    let m; try { m = JSON.parse(s); } catch (e) { return; }
    if (m.id && pending.has(m.id)) { const p = pending.get(m.id); pending.delete(m.id); m.error ? p.rej(new Error(m.error.message)) : p.res(m.result); return; }
    if (m.method === 'Runtime.exceptionThrown') errs.push(((m.params.exceptionDetails || {}).exception || {}).description || '');
    if (m.method === 'Runtime.consoleAPICalled' && m.params.type === 'error') { try { errs.push(String((m.params.args[0] || {}).value || '').slice(0, 120)); } catch (e) { } }
  });
  await send('Runtime.enable'); await send('Page.enable'); await send('Network.enable');
  await metric(1440, 900);

  const DIAG = await goto(SITE + '/translate.html').then(() => ev(`JSON.stringify({href:location.href, ready:document.readyState, pgStart:typeof pgStart, setFmt:typeof setFmt, uiLang:(typeof UI!=='undefined'?UI.lang:'?'), nav:JSON.stringify(navigator.languages)})`)).catch(e => 'ERR ' + e.message);
  console.log('DIAG ' + DIAG);
  /* 界面语言钉到简体中文：本地量的那些像素数（124 / 23）是中文口径的，
     不钉的话西文标签更长、按钮会折成两行，量出来的高度天然不一样，等于白对照。
     （② ③ ④ 三段都依赖「当前是中文」这个前提） */
  await ev(`(function(){var u=document.getElementById('uiLang');u.value='zh-CN';u.dispatchEvent(new Event('change'));window.scrollTo(0,0);})();1`);
  await wait(500);

  console.log('\n─── ① 线上确实是 297 ───');
  const src = await ev(`document.documentElement.innerHTML`);
  ok(/site-i18n\.js\?v=0\.9\.297/.test(src), '页面引的是 297 的词典', (src.match(/site-i18n\.js\?v=[0-9.]+/) || [''])[0]);
  ok(/srt-core\.js\?v=0\.9\.297/.test(src), '页面引的是 297 的引擎', (src.match(/srt-core\.js\?v=[0-9.]+/) || [''])[0]);
  ok(await ev(`document.querySelector('.ver-tag').textContent`) === 'v0.9.297', '页脚版号 v0.9.297',
    await ev(`document.querySelector('.ver-tag').textContent`));

  console.log('\n─── ② 折行那句说明收进了 ⓘ ───');
  ok(await ev(`document.body.innerText.indexOf('无须重新翻译') < 0`) === true, '正文里再也搜不到那句常驻说明');
  ok(await ev(`document.querySelector('.hint#wrapTipEl') === null`) === true, '那个常驻 div 已经不在了');
  ok(await ev(`(function(){var e=document.getElementById('wrapTipEl');return e?e.tagName+'|'+e.className+'|'+e.getAttribute('tabindex'):'null';})()`) === 'I|info|0',
    '换成了可聚焦的 ⓘ',
    await ev(`(function(){var e=document.getElementById('wrapTipEl');return e?e.tagName+'|'+e.className+'|'+e.getAttribute('tabindex'):'null';})()`));
  const tip = await ev(`document.getElementById('wrapTipEl').getAttribute('data-tip')`);
  ok(/无须重新翻译/.test(tip) && /单语字幕/.test(tip), '点开 ⓘ 能看到原话', tip);
  await ev(`setFmt('bi-src','srt');1`); await wait(400);
  ok(/双语字幕/.test(await ev(`document.getElementById('wrapTipEl').getAttribute('data-tip')`)), '双语下换口径',
    await ev(`document.getElementById('wrapTipEl').getAttribute('data-tip')`));
  await ev(`setFmt('mono','srt');1`); await wait(400);

  console.log('\n─── ③ 导出格式面板真的矮了 ───');
  const h = JSON.parse(await ev(`JSON.stringify({
    panel: document.getElementById('fmtPanel').offsetHeight,
    btn: document.querySelector('.fmt-btn').offsetHeight,
    fileVis: document.querySelectorAll('#fmtRowFile .fmt-btn:not([hidden])').length,
    kindVis: document.querySelectorAll('#fmtRowKind .fmt-btn:not([hidden])').length,
    clipped: Array.prototype.slice.call(document.querySelectorAll('.fmt-btn')).filter(function(b){return b.scrollWidth>b.clientWidth+1||b.scrollHeight>b.clientHeight+1;}).length,
    scroll: document.querySelectorAll('aside.panel')[1].scrollHeight - document.querySelectorAll('aside.panel')[1].clientHeight
  })`));
  console.log('     ' + JSON.stringify(h));
  ok(h.panel <= 150, '格式面板高度压到了 150px 以内（本地改前 149 → 改后 124）', h.panel);
  ok(h.btn <= 26, '单个按钮压到了 26px 以内（本地改前 28 → 改后 23）', h.btn);
  ok(h.fileVis === 5 && h.kindVis === 3, '按钮一颗没少（文件 5 / 内容 3）', h.fileVis + '/' + h.kindVis);
  ok(h.clipped === 0, '没有按钮的文字被挤掉', h.clipped);
  ok(h.scroll <= 1, '右栏没出内滚动条', h.scroll);

  console.log('\n─── ④ 任务条那句提醒 ───');
  ok(await ev(`document.getElementById('pgBusy').hidden`) === true, '没开跑时是藏着的');
  await ev(`pgStart();1`); await wait(400);
  ok(await ev(`document.getElementById('pgBusy').hidden`) === false, '开跑后露出来');
  ok(await ev(`document.getElementById('pgBusy').textContent`) === 'AI 算力紧张，等一会就出结果了', '中文文案对',
    await ev(`document.getElementById('pgBusy').textContent`));
  ok(await ev(`document.getElementById('progWrap').classList.contains('show')`) === true, '任务条也出来了');
  await ev(`pgFinish();1`); await wait(300);
  ok(await ev(`document.getElementById('pgBusy').hidden`) === true, '跑完立刻摘掉');

  console.log('\n─── ⑤ 界面语言：27 语都有，且不是中文占位 ───');
  const langs = JSON.parse(await ev(`JSON.stringify(UI_LANGS.map(function(p){return p[0];}))`));
  let miss = [], han = [];
  for (const lg of langs) {
    await ev(`(function(){var u=document.getElementById('uiLang');u.value='${lg}';u.dispatchEvent(new Event('change'));})();1`);
    await wait(60);
    const tx = await ev(`document.getElementById('pgBusy').textContent`);
    if (!tx) miss.push(lg);
    else if (lg !== 'zh-CN' && lg !== 'zh-TW' && lg !== 'ja' && /[\u4e00-\u9fff]/.test(tx)) han.push(lg + ':' + tx);
  }
  ok(miss.length === 0, '27 语全都有文案', miss.join(','));
  ok(han.length === 0, '非中日韩语言无汉字残留', han.join(' | '));
  /* 切回中文再往下走：这一圈的副作用（UI 留在最后一种语言）会带进后面的截图 */
  await ev(`(function(){var u=document.getElementById('uiLang');u.value='zh-CN';u.dispatchEvent(new Event('change'));})();1`);
  await wait(300);

  console.log('\n─── ⑥ 控制台干净 ───');
  ok(errs.length === 0, '没有 JS 报错', errs.slice(0, 3).join(' | '));

  console.log('\n─── ⑦ 英文版路由 ───');
  await goto(SITE + '/en/translate.html');
  ok(/site-i18n\.js\?v=0\.9\.297/.test(await ev(`document.documentElement.innerHTML`)), '英文版引的是 297 词典');
  await ev(`pgStart();1`); await wait(400);
  const en = await ev(`document.getElementById('pgBusy').textContent`);
  ok(!/[\u4e00-\u9fff]/.test(en) && /AI/.test(en), '英文版那句是英文', en);
  const tipEn = await ev(`document.getElementById('wrapTipEl').getAttribute('data-tip')`);
  ok(!/[\u4e00-\u9fff]/.test(tipEn), '英文版 ⓘ 说明也是英文', tipEn);
  ok(await ev(`document.body.innerText.indexOf('无须重新翻译') < 0`) === true, '英文版也没有那句常驻说明');
  await ev(`pgFinish();1`); await wait(200);

  console.log('\n─── ⑧ 老页没被带坏 ───');
  for (const u of ['/shift.html', '/clean.html', '/merge.html', '/repair.html', '/convert.html', '/bilingual.html']) {
    await goto(SITE + u);
    const ver = await ev(`(function(){var e=document.querySelector('.ver')||document.querySelector('.ver-tag');return e?e.textContent:'(无版号角标)';})()`);
    const okPage = await ev(`document.readyState === 'complete'`);
    ok(okPage === true, u + ' 正常打开', ver);
  }

  console.log('\n─── ⑨ 手机上看不塌 ───');
  /* ⚠️ ⑧ 跑完页面还停在最后一个老页上，这里必须先回工作台 ——
     否则下面 pgStart() 在 bilingual.html 上是 undefined，异常被
     unhandledRejection 吞掉，进程无声挂死（实测撞过一次）。 */
  await goto(SITE + '/translate.html');
  await metric(390, 844); await wait(700);
  await ev(`(function(){var a=document.querySelectorAll('aside.panel');a[1].scrollIntoView();})();1`); await wait(400);
  ok(await ev(`document.documentElement.scrollWidth <= window.innerWidth + 1`) === true, '窄屏没有横向滚动',
    await ev(`document.documentElement.scrollWidth + '/' + window.innerWidth`));
  await shot('workbench-297-mobile.png');
  await metric(1440, 900); await wait(700);
  await ev(`(function(){window.scrollTo(0,0);})();1`); await wait(300);
  await shot('workbench-297-desktop.png');
  await ev(`pgStart();setProg(37,true);document.getElementById('prText').textContent='Batch 3/12';1`); await wait(500);
  await shot('workbench-297-running.png');

  console.log('\n== ' + PASS + ' 通过 / ' + FAIL + ' 失败 ==');
  ch.kill('SIGKILL');
  process.exit(FAIL ? 1 : 0);
})();
