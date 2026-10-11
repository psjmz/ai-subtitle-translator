/* v0.9.281 实测：赞助文案换成了「如果这个工具有帮到你，欢迎赞助几块钱算力费」
   静态断言只能证明源码里有这句，证明不了：
     ① 新文案比旧的长（22 字 vs 旧 20 字符），右栏只有 320px —— 按钮会不会撑破卡片 / 溢出屏幕
     ② 点一下变「收起」，再点一下能不能原样回到新文案（TXT_IDLE 那份没同步改就会回旧文案）
     ③ 真出现在 zh-CN 界面（非简中被整块移除，这条别被改坏）
     ④ 零 JS 异常、二维码还是懒加载
   ⚠️ 每次用新的 --user-data-dir：语言选择存 localStorage，复用 profile 会带上上一轮的语言。 */
'use strict';
/* ⚠️ 导航时在途的 CDP 请求会被浏览器 reject 成「Inspected target navigated or closed」，
   若那一刻 promise 正好没人接着就会变成 unhandledRejection 把进程干掉 —— 这是导航的正常噪音。 */
process.on('unhandledRejection', e => { console.log('   (忽略一个导航噪音: ' + (e && e.message) + ')'); });
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');
const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PORT = 9361, BASE = 'http://127.0.0.1:3098';
const NEW = '如果这个工具有帮到你，欢迎赞助几块钱算力费';
const wait = ms => new Promise(r => setTimeout(r, ms));
let PASS = 0, FAIL = 0, ws, tid = 0; const pending = new Map(); let jsErrors = [];
const ok = (c, n, x) => { console.log((c ? '  ✓ ' : '  ✗ ') + n + (x !== undefined ? '  [' + x + ']' : '')); c ? PASS++ : FAIL++; };
function send(method, params) {
  const id = ++tid; ws.send(JSON.stringify({ id, method, params: params || {} }));
  return new Promise((res, rej) => {
    pending.set(id, { res, rej });
    setTimeout(() => { if (pending.has(id)) { pending.delete(id); rej(new Error('timeout ' + method)); } }, 25000);
  });
}
async function ev(expr) {
  const r = await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true });
  if (r.exceptionDetails) throw new Error(r.exceptionDetails.text);
  return r.result.value;
}
async function goto(url) {
  await send('Page.navigate', { url: 'about:blank' }); await wait(250);
  await send('Page.navigate', { url });
  for (let i = 0; i < 40; i++) { try { if (await ev('document.readyState') === 'complete') break; } catch (e) { } await wait(400); }
  await wait(1600);
}
async function shot(file) {
  /* ⚠️ 先滚、再截整屏（视口内），不要「先量再滚 + clip 文档坐标」——坐标会作废 */
  await ev(`document.querySelector('#donateBox').scrollIntoView({block:'center'})`); await wait(600);
  const rr = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(file, Buffer.from(rr.data, 'base64'));
  return file;
}
/* 量：按钮盒 / 文案盒 / 卡片可用宽 / 是否溢出右边界 / 是否折行 */
const M = `JSON.stringify((function(){
  var box=document.querySelector('#donateBox'); if(!box) return {none:true};
  var btn=document.querySelector('#btnDonate'), tx=document.querySelector('#donateTxt');
  if(!btn||!tx) return {noBtn:true};
  var b=btn.getBoundingClientRect(), t=tx.getBoundingClientRect(), p=box.getBoundingClientRect();
  var panel=btn.closest('.panel')||box.parentNode; var pr=panel.getBoundingClientRect();
  var cs=getComputedStyle(btn);
  return {txt:tx.textContent, w:Math.round(b.width), h:Math.round(b.height),
          txtW:Math.round(t.width), txtH:Math.round(t.height),
          avail:Math.round(p.width), panelW:Math.round(pr.width),
          overRight: Math.round(b.right - pr.right), overLeft: Math.round(pr.left - b.left),
          docOver: Math.round(b.right - document.documentElement.clientWidth),
          lines: Math.round(t.height / parseFloat(getComputedStyle(tx).lineHeight||16)),
          centered: Math.abs((b.left+b.right)/2 - (p.left+p.right)/2) < 2,
          radius: cs.borderRadius, bg: cs.backgroundColor, cur: cs.cursor};
})())`;

(async () => {
  const chrome = spawn(CHROME, [
    '--headless=new', '--remote-debugging-port=' + PORT, '--no-sandbox', '--disable-gpu',
    '--remote-allow-origins=*', '--window-size=1440,1200', '--no-proxy-server',
    '--user-data-dir=/tmp/cbuddy-chk281-' + Date.now()
  ], { stdio: 'ignore' });
  let list = null;
  for (let i = 0; i < 20 && !list; i++) {
    await wait(1000);
    list = await new Promise(res => {
      const q = http.get('http://127.0.0.1:' + PORT + '/json/list', r => { let b = ''; r.on('data', d => b += d); r.on('end', () => res(JSON.parse(b))); });
      q.on('error', () => res(null));
    });
  }
  if (!list) throw new Error('Chrome 没起来');
  ws = new WebSocket(list.find(t => t.type === 'page').webSocketDebuggerUrl, { perMessageDeflate: false });
  ws.on('message', raw => {
    const o = JSON.parse(raw);
    if (o.id && pending.has(o.id)) { const p = pending.get(o.id); pending.delete(o.id); (o.error ? p.rej(new Error(o.error.message)) : p.res(o.result)); return; }
    if (o.method === 'Runtime.exceptionThrown') jsErrors.push((o.params.exceptionDetails || {}).text || '?');
    if (o.method === 'Log.entryAdded' && o.params.entry.level === 'error') jsErrors.push(o.params.entry.text);
    if (o.method === 'Runtime.consoleAPICalled' && o.params.type === 'error') jsErrors.push(String(o.params.args[0] && o.params.args[0].value));
  });
  await new Promise(r => ws.on('open', r));
  await send('Runtime.enable'); await send('Page.enable'); await send('Log.enable');
  await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false });

  console.log('— ① 1440 宽：zh-CN 工作台，赞助文案与盒宽 —');
  await goto(BASE + '/translate.html');
  await ev(`(function(){var k='srtTool',o={};try{o=JSON.parse(localStorage.getItem(k)||'{}')||{}}catch(e){o={}}
    o.uiLang='zh-CN';o.langManual=1;localStorage.setItem(k,JSON.stringify(o));return o.uiLang;})()`);
  await goto(BASE + '/translate.html');
  ok(await ev(`document.documentElement.lang`) === 'zh-CN', '界面语言是简体中文');
  let m = JSON.parse(await ev(M));
  console.log('   ' + JSON.stringify(m));
  ok(m.txt === NEW, '按钮文案已换成新文案', m.txt);
  ok(m.overRight <= 0 && m.docOver < 0, '按钮没有撑破右栏 / 溢出视口', 'right+' + m.overRight + ' doc+' + m.docOver);
  ok(m.w <= m.panelW, '按钮宽度不超过卡片可用宽', m.w + ' ≤ ' + m.panelW);
  ok(m.h <= 56 && m.lines <= 2, '按钮最多折两行、没被撑成一坨', m.h + 'px / ' + m.lines + ' 行');
  ok(m.centered, '赞助入口仍居中');
  ok(m.cur === 'pointer', '手型光标还在', m.cur);
  shot('/tmp/chk281-donate-1440.png');

  console.log('— ② 窄屏 1000 宽（右栏仍在）—');
  await send('Emulation.setDeviceMetricsOverride', { width: 1000, height: 1000, deviceScaleFactor: 1, mobile: false });
  await wait(600);
  m = JSON.parse(await ev(M));
  console.log('   ' + JSON.stringify(m));
  ok(m.overRight <= 0 && m.docOver < 0, '1000 宽下也没溢出', 'right+' + m.overRight);
  ok(m.lines === 1, '窄屏右栏变全宽后回到单行', m.lines + ' 行 / ' + m.w + 'px');
  shot('/tmp/chk281-donate-1000.png');

  console.log('— ③ 点击展开 → 再点收起，文案要原样回来 —');
  await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false });
  await wait(400);
  await ev(`document.querySelector('#btnDonate').click()`); await wait(500);
  let t1 = await ev(`document.querySelector('#donateTxt').textContent`);
  let qrShown = await ev(`!document.querySelector('#donateQr').hidden`);
  let imgSrc = await ev(`document.querySelector('#donateImg').getAttribute('src')||''`);
  ok(t1 === '收起', '展开后按钮变「收起」', t1);
  ok(qrShown, '二维码展开');
  ok(/donate-qr-square\.png/.test(imgSrc), '二维码懒加载已赋 src', imgSrc);
  await ev(`document.querySelector('#btnDonate').click()`); await wait(400);
  let t2 = await ev(`document.querySelector('#donateTxt').textContent`);
  ok(t2 === NEW, '收起后回到新文案（不是旧的 Token 那句）', t2);
  shot('/tmp/chk281-donate-open.png');

  console.log('— ④ 英文界面：赞助块整块移除 —');
  /* ⚠️ 界面语言存在 srtTool 存档里（uiLang + langManual），不是顶层 localStorage['uiLang']。
     设错了页面照样是中文，断言会假红。 */
  await goto(BASE + '/translate.html');
  await ev(`(function(){var k='srtTool',o={};try{o=JSON.parse(localStorage.getItem(k)||'{}')||{}}catch(e){o={}}
    o.uiLang='en';o.langManual=1;localStorage.setItem(k,JSON.stringify(o));return o.uiLang;})()`);
  await goto(BASE + '/translate.html');
  let langNow = await ev(`document.documentElement.lang`);
  let gone = await ev(`!document.querySelector('#donateBox')`);
  ok(langNow === 'en', '界面语言确实切到 en', langNow);
  ok(gone, '非简中界面里赞助块被移除');

  console.log('— ⑤ 零 JS 异常 —');
  ok(jsErrors.length === 0, '无 JS 报错', jsErrors.slice(0, 3).join(' | '));

  console.log('\n核验: ' + PASS + ' 通过 / ' + FAIL + ' 失败');
  ws.close(); chrome.kill();
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error('崩了:', e.message); try { ws.close(); } catch (x) { } process.exit(1); });
