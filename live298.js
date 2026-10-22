/* v0.9.298 外网实测（走代理 7897 起 headless Chrome 打线上 https://ai-srtsub.com/translate.html）
   重点：① 版号真的上去了 ② 宽心话挪进了进度行、跟在「第 x/y 批」后面、上了品牌粉
        ③ 复制统计的静态链路在（真打事件已由本地探针 16/16 验过，线上只做静态核，不污染账本）
        ④ 控制台干净 ⑤ 老页没被带坏 ⑥ 移动端不塌 */
'use strict';
process.on('unhandledRejection', () => { });
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');
const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
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
  const dir = '/tmp/live298-' + Date.now();
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
  /* 界面语言钉到简体中文（几何口径按中文量） */
  await ev(`(function(){var u=document.getElementById('uiLang');u.value='zh-CN';u.dispatchEvent(new Event('change'));window.scrollTo(0,0);})();1`);
  await wait(500);

  console.log('\n─── ① 线上确实是 298 ───');
  const src = await ev(`document.documentElement.innerHTML`);
  ok(/site-i18n\.js\?v=0\.9\.298/.test(src), '页面引的是 298 的词典', (src.match(/site-i18n\.js\?v=[0-9.]+/) || [''])[0]);
  ok(/srt-core\.js\?v=0\.9\.298/.test(src), '页面引的是 298 的引擎', (src.match(/srt-core\.js\?v=[0-9.]+/) || [''])[0]);
  ok(await ev(`document.querySelector('.ver-tag').textContent`) === 'v0.9.298', '页脚版号 v0.9.298',
    await ev(`document.querySelector('.ver-tag').textContent`));

  console.log('\n─── ② 宽心话：挪进进度行 + 上色 ───');
  ok(await ev(`document.getElementById('pgBusy').tagName`) === 'SPAN', '现在是 span 不是 div',
    await ev(`document.getElementById('pgBusy').tagName`));
  ok(await ev(`document.getElementById('pgBusy').hidden`) === true, '没开跑时是藏着的');
  await ev(`pgStart();setProg(37,true);document.getElementById('prText').textContent='第 3/12 批';1`); await wait(400);
  ok(await ev(`document.getElementById('pgBusy').hidden`) === false, '开跑后露出来');
  const geo = JSON.parse(await ev(`JSON.stringify({
    row: (function(){var e=document.querySelector('.pg-row');var b=e.getBoundingClientRect();return {y:Math.round(b.y),h:Math.round(b.height)};})(),
    pr: (function(){var e=document.getElementById('prText');var b=e.getBoundingClientRect();return {y:Math.round(b.y),h:Math.round(b.height)};})(),
    busy: (function(){var e=document.getElementById('pgBusy');var b=e.getBoundingClientRect();return {y:Math.round(b.y),h:Math.round(b.height)};})(),
    eta: (function(){var e=document.getElementById('pgEta');var b=e.getBoundingClientRect();return {y:Math.round(b.y)};})(),
    color: getComputedStyle(document.getElementById('pgBusy')).color,
    wrap: getComputedStyle(document.getElementById('pgBusy')).whiteSpace
  })`));
  console.log('     ' + JSON.stringify(geo));
  ok(geo.busy.y === geo.row.y, '跟「第 3/12 批」同一行（y 相同）', geo.busy.y + ' vs ' + geo.row.y);
  ok(geo.busy.h <= geo.row.h + 2, '没有把进度行撑高', geo.busy.h + ' vs ' + geo.row.h);
  const rowHTML = await ev(`document.querySelector('.pg-row').innerHTML`);
  ok(rowHTML.indexOf('prText') < rowHTML.indexOf('pgBusy') && rowHTML.indexOf('pgBusy') < rowHTML.indexOf('pgEta'),
    '顺序：批次 → 宽心话 → ETA');
  ok(/rgb\(192,\s*33,\s*89\)/.test(geo.color), '上了品牌粉 --tr-ink', geo.color);
  ok(geo.wrap === 'nowrap', '整条不折行', geo.wrap);
  ok(await ev(`document.getElementById('pgBusy').textContent`) === 'AI 算力紧张，等一会就出结果了', '中文文案对',
    await ev(`document.getElementById('pgBusy').textContent`));
  await ev(`pgFinish();1`); await wait(300);
  ok(await ev(`document.getElementById('pgBusy').hidden`) === true, '跑完立刻摘掉');

  console.log('\n─── ③ 复制统计链路（静态核验，不真发事件） ───');
  ok(/reportEvent\('copy', '', expFileFmt\(\)\)/.test(src), '页面里有 btnCopy 的 copy 上报');
  ok(/reportEvent\('download', '', expFileFmt\(\)\)/.test(src), '下载上报原样还在');
  const adm = await ev(`(function(){var x=new XMLHttpRequest();x.open('GET','/admin.html',false);x.send();return x.responseText;})()`);
  ok(/j\.today\.copied/.test(adm), '后台卡片有「复制 N 次」');
  ok(/复制 <b>' \+ j\.today\.copied/.test(adm), '后台 chip 文案对');

  console.log('\n─── ④ 界面语言：27 语都有宽心话，且不是中文占位 ───');
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
  await ev(`(function(){var u=document.getElementById('uiLang');u.value='zh-CN';u.dispatchEvent(new Event('change'));})();1`);
  await wait(300);

  console.log('\n─── ⑤ 控制台干净 ───');
  ok(errs.length === 0, '没有 JS 报错', errs.slice(0, 3).join(' | '));

  console.log('\n─── ⑥ 英文版路由 ───');
  await goto(SITE + '/en/translate.html');
  ok(/site-i18n\.js\?v=0\.9\.298/.test(await ev(`document.documentElement.innerHTML`)), '英文版引的是 298 词典');
  await ev(`pgStart();1`); await wait(400);
  const en = await ev(`document.getElementById('pgBusy').textContent`);
  ok(!/[\u4e00-\u9fff]/.test(en) && /AI/.test(en), '英文版那句是英文', en);
  const enGeo = await ev(`(function(){var b=document.getElementById('pgBusy').getBoundingClientRect();var p=document.getElementById('prText').getBoundingClientRect();return Math.round(b.y-p.y);})()`);
  ok(Math.abs(enGeo) <= 2, '英文版也在批次同一行', enGeo);
  await ev(`pgFinish();1`); await wait(200);

  console.log('\n─── ⑦ 老页没被带坏 ───');
  for (const u of ['/shift.html', '/clean.html', '/merge.html', '/repair.html', '/convert.html', '/bilingual.html']) {
    await goto(SITE + u);
    const ver = await ev(`(function(){var e=document.querySelector('.ver')||document.querySelector('.ver-tag');return e?e.textContent:'(无版号角标)';})()`);
    const okPage = await ev(`document.readyState === 'complete'`);
    ok(okPage === true, u + ' 正常打开', ver);
  }

  console.log('\n─── ⑧ 手机上看不塌 ───');
  await goto(SITE + '/translate.html');
  await metric(390, 844); await wait(700);
  await ev(`(function(){var a=document.querySelectorAll('aside.panel');a[1].scrollIntoView();})();1`); await wait(400);
  ok(await ev(`document.documentElement.scrollWidth <= window.innerWidth + 1`) === true, '窄屏没有横向滚动',
    await ev(`document.documentElement.scrollWidth + '/' + window.innerWidth`));
  /* 窄屏跑起来：宽心话整条折到第二行也行，但不能截断 */
  await ev(`pgStart();setProg(37,true);document.getElementById('prText').textContent='第 3/12 批';1`); await wait(400);
  ok(await ev(`(function(){var e=document.getElementById('pgBusy');return e.hidden===false && e.scrollWidth<=e.clientWidth+1;})()`) === true, '窄屏下宽心话完整可见不截断');
  await ev(`pgFinish();1`); await wait(200);
  await shot('workbench-298-mobile.png');
  await metric(1440, 900); await wait(700);
  await ev(`(function(){window.scrollTo(0,0);})();1`); await wait(300);
  await shot('workbench-298-desktop.png');
  await ev(`pgStart();setProg(37,true);document.getElementById('prText').textContent='第 3/12 批';1`); await wait(500);
  await shot('workbench-298-running.png');

  console.log('\n== ' + PASS + ' 通过 / ' + FAIL + ' 失败 ==');
  ch.kill('SIGKILL');
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.log('FATAL', e.message); process.exit(2); });
