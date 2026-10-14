/* v0.9.308 后台真浏览器：三个 tab 切换 + 工具页记录表渲染
   ① 自己先把数据灌进去（直接打 /api/tool-event）
   ② CDP 打开 admin.html，走真实登录流程
   ③ 逐 tab 点，量显隐、量表格行数、量"最忙那页"的主色标记 */
'use strict';
process.on('unhandledRejection', () => { });
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');
const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PORT = 9600 + Math.floor(Math.random() * 90);
const SRV = Number(process.env.SRV || 3612);
const wait = ms => new Promise(r => setTimeout(r, ms));
let ws, tid = 0; const pending = new Map();
function send(m, p) { const id = ++tid; ws.send(JSON.stringify({ id, method: m, params: p || {} })); return new Promise((res, rej) => { pending.set(id, { res, rej }); setTimeout(() => { if (pending.has(m)) { } if (pending.has(id)) { pending.delete(id); rej(new Error('timeout ' + m)); } }, 30000); }); }
async function ev(e) { const r = await send('Runtime.evaluate', { expression: e, returnByValue: true, awaitPromise: true }); if (r.exceptionDetails) throw new Error(r.exceptionDetails.text); return r.result.value; }
let P = 0, F = 0;
const ok = (c, n, x) => { console.log((c ? '  ✓ ' : '  ✗ ') + n + (x !== undefined ? '  [' + String(x).slice(0, 150) + ']' : '')); c ? P++ : F++; };

function httpReq(method, url, body) {
  return new Promise((res, rej) => {
    const r = http.request({ host: '127.0.0.1', port: SRV, path: url, method, headers: { 'Content-Type': 'application/json' } }, resp => {
      let d = ''; resp.on('data', c => d += c); resp.on('end', () => res({ code: resp.statusCode, body: d }));
    });
    r.on('error', rej);
    if (body) r.write(JSON.stringify(body));
    r.end();
  });
}

async function clipShot(file, sel, pad) {
  const info = JSON.parse(await ev(`JSON.stringify((function(){var e=document.querySelector('${sel}');if(!e)return null;e.scrollIntoView({block:'start'});var b=e.getBoundingClientRect();return {x:b.x,y:b.y+window.scrollY,w:b.width,h:b.height};})())`));
  if (!info) { console.log('  找不到 ' + sel); return; }
  await wait(500);
  const r = await send('Page.captureScreenshot', {
    format: 'png',
    clip: { x: Math.max(0, info.x - pad), y: Math.max(0, info.y - pad), width: Math.min(1440, info.w + pad * 2), height: Math.min(900, info.h + pad * 2), scale: 2 }
  });
  fs.writeFileSync(file, Buffer.from(r.data, 'base64'));
  console.log('  ' + file);
}

(async () => {
  /* --- 灌数据 --- */
  const cases = [
    { page: 'shift', act: 'edit', cues: 142 }, { page: 'shift', act: 'export', cues: 142, n: 0, fmt: 'srt' },
    { page: 'shift', act: 'export', cues: 142, n: 0, fmt: 'srt' },
    { page: 'convert', act: 'convert', cues: 88 }, { page: 'convert', act: 'export', cues: 88, fmt: 'vtt' },
    { page: 'extract', act: 'extract', cues: 210, n: 5120 },
    { page: 'bilingual', act: 'split', cues: 64, n: 2 },
    { page: 'repair', act: 'repair', cues: 0, n: 3 },
    { page: 'glossary', act: 'replace', cues: 300, n: 27 },
    { page: 'glossary', act: 'export', cues: 300, n: 27, fmt: 'srt' },
    { page: 'glossary', act: 'replace', cues: 512, n: 41 }
  ];
  for (const c of cases) await httpReq('POST', '/api/tool-event', c);
  ok(true, '已灌入 ' + cases.length + ' 条工具记录');

  const cr = spawn(CHROME, ['--headless=new', '--remote-debugging-port=' + PORT, '--no-sandbox', '--disable-gpu',
    '--host-resolver-rules=MAP * ~NOTFOUND, EXCLUDE 127.0.0.1',
    '--user-data-dir=/tmp/cr-adm308-' + Date.now(), 'about:blank'], { stdio: 'ignore' });
  let list = null;
  for (let i = 0; i < 30; i++) {
    try { list = await new Promise((res, rej) => { http.get({ host: '127.0.0.1', port: PORT, path: '/json/list' }, r => { let d = ''; r.on('data', c => d += c); r.on('end', () => res(d)); }).on('error', rej); }); if (list.includes('webSocketDebuggerUrl')) break; } catch (e) { }
    await wait(300);
  }
  ws = new WebSocket(JSON.parse(list).find(t => t.type === 'page').webSocketDebuggerUrl, { perMessageDeflate: false });
  await new Promise((res, rej) => { ws.on('open', res); ws.on('error', rej); });
  ws.on('message', d => { const m = JSON.parse(d); if (m.id && pending.has(m.id)) { pending.get(m.id).res(m.result || m); pending.delete(m.id); } });
  await send('Page.enable'); await send('Runtime.enable');
  await send('Emulation.setDeviceMetricsOverride', { width: 1000, height: 1400, deviceScaleFactor: 2, mobile: false });
  await send('Page.navigate', { url: 'http://127.0.0.1:' + SRV + '/admin.html' });
  for (let i = 0; i < 60; i++) { try { if ((await ev('document.readyState')) === 'complete') break; } catch (e) { } await wait(400); }
  await wait(1000);

  console.log('— 登录 —');
  await ev("document.getElementById('pw').value = 'e2epass308'");
  await ev("document.getElementById('btnLogin').click()");
  await wait(1800);
  const afterLogin = JSON.parse(await ev(`JSON.stringify({
    loginHidden: getComputedStyle(document.getElementById('loginCard')).display === 'none',
    mainShown: getComputedStyle(document.getElementById('main')).display !== 'none',
    tabs: [].slice.call(document.querySelectorAll('#adminTabs button')).map(function(b){return b.textContent})
  })`));
  ok(afterLogin.loginHidden && afterLogin.mainShown, '登录成功，进入后台', JSON.stringify(afterLogin.loginHidden));
  ok(afterLogin.tabs.join('|') === '模型配置|统计|账户安全', '三个 tab 文案对', afterLogin.tabs.join('|'));

  console.log('— 默认落在「模型配置」—');
  const A = JSON.parse(await ev(`JSON.stringify((function(){
    var vis=function(id){var e=document.getElementById(id);return e?getComputedStyle(e).display!=='none':false};
    var sel=function(t){var b=document.querySelector('#adminTabs button[data-tab="'+t+'"]');return b?b.getAttribute('aria-selected'):''};
    return {model:vis('paneModel'),stats:vis('paneStats'),acct:vis('paneAcct'),
            selModel:sel('model'),selStats:sel('stats'),
            hasProvider: !!document.getElementById('provider')}
  })())`));
  ok(A.model && !A.stats && !A.acct, '默认只显示模型配置', JSON.stringify(A));
  ok(A.selModel === 'true' && A.selStats === 'false', '选中态跟着 tab 走', A.selModel + '/' + A.selStats);
  ok(A.hasProvider, '模型 A 配置还在（没被拆丢）');
  await clipShot('/Users/jp/WorkBuddy/2026-09-04-00-29-54/outputs/308-后台-模型配置.png', '.wrap', 6);

  console.log('— 点「统计」—');
  await ev("document.querySelector('#adminTabs button[data-tab=\"stats\"]').click()");
  await wait(2200);
  const B = JSON.parse(await ev(`JSON.stringify((function(){
    var vis=function(id){var e=document.getElementById(id);return e?getComputedStyle(e).display!=='none':false};
    var rows=function(id){var t=document.getElementById(id);return t?t.querySelectorAll('tr').length:0};
    var statChip=document.getElementById('tlStats');
    return {model:vis('paneModel'),stats:vis('paneStats'),acct:vis('paneAcct'),
            toolCard:vis('toolCard'),
            pageRows:rows('tlPageRows'), detRows:rows('tlRows'),
            chipTxt:statChip?statChip.textContent:'',
            firstRow: (function(){var t=document.getElementById('tlPageRows');return t&&t.rows[0]?[].slice.call(t.rows[0].cells).map(function(c){return c.textContent}).join(' / '):''})(),
            lastRow:(function(){var t=document.getElementById('tlPageRows');return t&&t.rows[t.rows.length-1]?[].slice.call(t.rows[t.rows.length-1].cells).map(function(c){return c.textContent}).join(' / '):''})(),
            det1:(function(){var t=document.getElementById('tlRows');return t&&t.rows[0]?[].slice.call(t.rows[0].cells).map(function(c){return c.textContent}).join(' / '):''})(),
            hash:location.hash}
  })())`));
  ok(!B.model && B.stats && !B.acct, '切到统计：只显示统计那一块', JSON.stringify({ m: B.model, s: B.stats, a: B.acct }));
  ok(B.toolCard, '工具页记录卡显示出来了');
  ok(B.pageRows === 6, '按页汇总 6 行（六页齐，包括没人用的）', B.pageRows);
  ok(B.detRows > 0, '明细表有数据行', B.detRows);
  ok(B.chipTxt.indexOf('累计') >= 0 && B.chipTxt.indexOf('最常做') >= 0, '统计胶囊有累计与动作 TOP', B.chipTxt.slice(0, 80));
  ok(B.firstRow.indexOf('时间轴调整') >= 0 || B.firstRow.indexOf('术语替换') >= 0, '汇总首行是中文页名（没甩 shift 这种内部 id）', B.firstRow);
  console.log('    汇总首行: ' + B.firstRow);
  console.log('    汇总末行: ' + B.lastRow);
  console.log('    明细首行: ' + B.det1);
  ok(B.hash === '#stats', 'tab 记进 hash（刷新还在同一页）', B.hash);
  await clipShot('/Users/jp/WorkBuddy/2026-09-04-00-29-54/outputs/308-后台-统计.png', '.wrap', 6);
  /* 单独一张工具页记录卡近景（它在统计页最下面，整页截图里看不清） */
  await clipShot('/Users/jp/WorkBuddy/2026-09-04-00-29-54/outputs/308-后台-工具记录卡.png', '#toolCard', 8);
  /* 单独一张工具页记录卡近景（它在统计页最下面，整页截图里看不清） */
  await clipShot('/Users/jp/WorkBuddy/2026-09-04-00-29-54/outputs/308-后台-工具记录卡.png', '#toolCard', 8);

  console.log('— 「试了没导出」的那页会被标出来 —');
  const C = JSON.parse(await ev(`JSON.stringify((function(){
    var t=document.getElementById('tlPageRows'), out=[];
    for(var i=0;i<t.rows.length;i++){var cs=t.rows[i].cells;
      var nb=cs[4].querySelector('b');
      out.push({page:cs[0].textContent,n:cs[1].textContent,exp:cs[4].textContent,
                expColor:nb?getComputedStyle(nb).color:'(无b)'});}
    return out;
  })())`));
  const noExp = C.filter(r => r.n !== '0' && r.exp === '0');
  ok(noExp.length >= 2, '有用过但 0 导出的页（extract/repair）', noExp.map(r => r.page).join(','));
  ok(noExp.every(r => r.expColor === 'rgb(154, 103, 0)'), '0 导出那一格用告警色（一眼看见）', noExp[0] && noExp[0].expColor);
  console.log('    ' + JSON.stringify(noExp));

  console.log('— 点「账户安全」—');
  await ev("document.querySelector('#adminTabs button[data-tab=\"acct\"]').click()");
  await wait(900);
  const D = JSON.parse(await ev(`JSON.stringify((function(){
    var vis=function(id){var e=document.getElementById(id);return e?getComputedStyle(e).display!=='none':false};
    return {model:vis('paneModel'),stats:vis('paneStats'),acct:vis('paneAcct'),
            hasNpw:!!document.getElementById('npw'), hasBtnPw:!!document.getElementById('btnPw'),
            hash:location.hash}
  })())`));
  ok(!D.model && !D.stats && D.acct, '切到账户安全：只显示改密码', JSON.stringify(D));
  ok(D.hasNpw && D.hasBtnPw, '改密码表单在位');
  ok(D.hash === '#acct', 'hash 跟着更新', D.hash);

  console.log('— 带着 #stats 重新加载 —');
  /* ⚠️ 同 URL 只差 hash 的 navigate 不重载（同文档跳转）—— 必须先中转 about:blank */
  await send('Page.navigate', { url: 'about:blank' });
  await wait(400);
  await send('Page.navigate', { url: 'http://127.0.0.1:' + SRV + '/admin.html#stats' });
  for (let i = 0; i < 60; i++) { try { if ((await ev('document.readyState')) === 'complete') break; } catch (e) { } await wait(400); }
  await wait(1800);
  const E = JSON.parse(await ev(`JSON.stringify((function(){
    var vis=function(id){var e=document.getElementById(id);return e?getComputedStyle(e).display!=='none':false};
    var t=document.getElementById('tlPageRows');
    return {stats:vis('paneStats'),model:vis('paneModel'),rows:t?t.querySelectorAll('tr').length:0}
  })())`));
  ok(E.stats && !E.model, '刷新后直接落在统计 tab', JSON.stringify(E));
  ok(E.rows === 6, '重新加载后汇总表照样有 6 行', E.rows);

  console.log('\n_admin308: ' + P + ' 通过 / ' + F + ' 失败');
  ws.close(); cr.kill(); process.exit(F ? 1 : 0);
})().catch(e => { console.error('崩了', e.message); process.exit(1); });
