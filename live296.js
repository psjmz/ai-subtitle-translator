/* v0.9.296 外网实测（走代理 7897 起 headless Chrome 打线上 https://ai-srtsub.com/repair.html）
   重点：① 版号真的上去了 ② 粘贴的乱码在真网速下修得回来 ③ 认出 GBK 并默认另存带 BOM
        ④ 修不回来的时候有实话 ⑤ 控制台干净 ⑥ 移动端不溢出 */
'use strict';
process.on('unhandledRejection', () => { });
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');
const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PORT = 9396, SITE = 'https://ai-srtsub.com';
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
  const dir = '/tmp/live296-' + Date.now();
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

  const DIAG = await goto(SITE + '/repair.html').then(() => ev(`JSON.stringify({href:location.href, ready:document.readyState, core:typeof window.RepairCore, setSrc:typeof setSrc})`)).catch(e => 'ERR ' + e.message);
  console.log('DIAG ' + DIAG);

  console.log('\n─── ① 线上确实是 296 ───');
  const src = await ev(`document.documentElement.innerHTML`);
  ok(/repair-core\.js\?v=0\.9\.296/.test(src), '页面引的是 296 的引擎', (src.match(/repair-core\.js\?v=[0-9.]+/) || [''])[0]);
  ok(/repair-i18n\.js\?v=0\.9\.296/.test(src), '页面引的是 296 的词典', (src.match(/repair-i18n\.js\?v=[0-9.]+/) || [''])[0]);
  ok(await ev(`!!(window.RepairCore && window.RepairCore.repair)`) === true, '引擎带着 repair');
  ok(await ev(`document.querySelectorAll('#navPills .pill').length`) === 7, '导航胶囊 7 个（不含本页）',
    await ev(`document.querySelectorAll('#navPills .pill').length`));
  ok(await ev(`getComputedStyle(document.documentElement).getPropertyValue('--acc').trim()`) === '#B42318',
    '认领砖红色线', await ev(`getComputedStyle(document.documentElement).getPropertyValue('--acc')`));
  ok(await ev(`document.querySelector('.hero h1').innerText`) === '字幕乱码修复', '中文标题两段直接连写',
    await ev(`document.querySelector('.hero h1').innerText`));

  console.log('\n─── ② 粘贴 UTF-8 被当 GBK 读出来的乱码 ───');
  await ev(`(function(){var C=window.RepairCore;setSrc(C.fromBytes(C.toBytes('1\\n00:00:01,000 --> 00:00:03,000\\n你好世界\\n','utf-8'),'gbk'),'moji.srt');})();1`);
  await wait(900);
  ok(/乱码/.test(await ev(`document.getElementById('diagStat').textContent`)), '说「看着像乱码」',
    await ev(`document.getElementById('diagStat').textContent`));
  ok(/你好世界/.test(await ev(`window.S.out`)), '排第一的候选修回了原句', await ev(`window.S.out.slice(0,60)`));
  ok(/00:00:01,000 --> 00:00:03,000/.test(await ev(`window.S.out`)), '时间轴一个字没动',
    await ev(`window.S.out.slice(0,60)`));
  ok(await ev(`document.querySelectorAll('#candList .cand').length`) >= 2, '候选不止一个（含保持原样）',
    await ev(`document.querySelectorAll('#candList .cand').length`));

  console.log('\n─── ③ 「保持原样」能退回去 ───');
  await ev(`document.querySelector('#candList [data-use="-1"]').click();1`); await wait(400);
  ok(await ev(`window.S.out`) === await ev(`window.S.shown`), '退回原样后结果框是乱码本身',
    await ev(`window.S.out.slice(0,30)`));

  console.log('\n─── ④ 传文件：认出它其实是 GBK，另存默认带 BOM ───');
  await ev(`(function(){var C=window.RepairCore;setBytes(C.toBytes('1\\n00:00:01,000 --> 00:00:03,000\\n这是一段正常的中文台词\\n','gbk').buffer,'gbk.srt');})();1`);
  await wait(900);
  ok(await ev(`document.getElementById('srcEnc').textContent`) === 'GBK', '认出来的编码写着 GBK',
    await ev(`document.getElementById('srcEnc').textContent`));
  ok(/没发现乱码/.test(await ev(`document.getElementById('diagStat').textContent`)), '诊断说没发现乱码',
    await ev(`document.getElementById('diagStat').textContent`));
  ok(await ev(`document.getElementById('saveEnc').value`) === '1', '另存默认指到「带 BOM 的 UTF-8」',
    await ev(`document.getElementById('saveEnc').value`));
  ok(await ev(`document.getElementById('saveEnc').options.length`) === 6, '另存有 6 个选项',
    await ev(`document.getElementById('saveEnc').options.length`));

  console.log('\n─── ⑤ 修不回来的时候说实话 ───');
  await ev(`setSrc('浣犲ソ涓€鍙ヤ腑鏂\\uFFFD','lost.txt');1`); await wait(800);
  ok(await ev(`document.getElementById('lostMsg').style.display`) !== 'none', '显示「修不回来」的提示',
    await ev(`document.getElementById('lostMsg').style.display`));

  console.log('\n─── ⑥ 正常字幕不被误判 ───');
  await ev(`setSrc("C'est très bon. À bientôt.",'fr.srt');1`); await wait(800);
  ok(/没发现乱码/.test(await ev(`document.getElementById('diagStat').textContent`)), '法语带音标不算乱码',
    await ev(`document.getElementById('diagStat').textContent`));

  console.log('\n─── ⑦ 控制台干净 ───');
  ok(errs.length === 0, '没有 JS 报错', errs.slice(0, 3).join(' | '));

  console.log('\n─── ⑧ 手机上看不塌 ───');
  await ev(`(function(){var C=window.RepairCore;setSrc(C.fromBytes(C.toBytes('1\\n00:00:01,000 --> 00:00:03,000\\n你好世界\\n','utf-8'),'gbk'),'moji.srt');})();1`);
  await wait(800);
  await metric(390, 844); await wait(700);
  ok(await ev(`document.documentElement.scrollWidth <= window.innerWidth + 1`) === true, '窄屏没有横向滚动',
    await ev(`document.documentElement.scrollWidth + '/' + window.innerWidth`));
  await shot('repair-296-mobile.png');
  await metric(1440, 900); await wait(700);
  await shot('repair-296-desktop.png');

  console.log('\n─── ⑨ 英文版路由也开得起来 ───');
  await goto(SITE + '/en/repair.html');
  ok(/repair-core\.js\?v=0\.9\.296/.test(await ev(`document.documentElement.innerHTML`)), '英文版引的是 296 引擎');
  const h1en = await ev(`document.querySelector('.hero h1').innerText`);
  ok(!/[一-鿿]/.test(h1en), '英文版 h1 里没有中文', h1en);
  /* 标题是两段拼一句 —— 西文中间必须留空格，不然会连成「Fixgarbled subtitles」 */
  ok(h1en === 'Fix garbled subtitles', '英文标题两段之间有空格', h1en);

  console.log('\n== ' + PASS + ' 通过 / ' + FAIL + ' 失败 ==');
  ch.kill('SIGKILL');
  process.exit(FAIL ? 1 : 0);
})();
