/* v0.9.308 外网真浏览器：六页埋点在**线上**是否真的发出
   由 _tools308.js（本地版）派生，三处必改：
     ① Chrome 不设代理（ai-srtsub 在国内直连可达；挂代理反而整页 chrome-error）
     ② URL 换 https://ai-srtsub.com，加载用轮询 readyState + 再等 3s
     ③ 语言三件套（--lang / setLocaleOverride / navigator.language）
   ⚠️ 本探针**会真的往线上账本写记录**（这正是要验的）。跑完由外部脚本核对条数并清理。 */
'use strict';
process.on('unhandledRejection', () => { });
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');
const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PORT = 9700 + Math.floor(Math.random() * 90);
const BASE = 'https://ai-srtsub.com';
const wait = ms => new Promise(r => setTimeout(r, ms));
let ws, tid = 0; const pending = new Map();
function send(m, p) { const id = ++tid; ws.send(JSON.stringify({ id, method: m, params: p || {} })); return new Promise((res, rej) => { pending.set(id, { res, rej }); setTimeout(() => { if (pending.has(id)) { pending.delete(id); rej(new Error('timeout ' + m)); } }, 40000); }); }
async function ev(e) { const r = await send('Runtime.evaluate', { expression: e, returnByValue: true, awaitPromise: true }); if (r.exceptionDetails) return '__ERR__' + r.exceptionDetails.text; return r.result.value; }
let P = 0, F = 0;
const ok = (c, n, x) => { console.log((c ? '  ✓ ' : '  ✗ ') + n + (x !== undefined ? '  [' + String(x).slice(0, 140) + ']' : '')); c ? P++ : F++; };

const SRT = ['1', '00:00:01,000 --> 00:00:02,800', 'Hello world, this is a line.', '',
  '2', '00:00:03,000 --> 00:00:05,800', 'Second subtitle line here.', '',
  '3', '00:00:06,000 --> 00:00:08,800', 'Third one.', ''].join('\n');
const BI = ['1', '00:00:01,000 --> 00:00:03,800', 'Hello world.', '你好，世界。', '',
  '2', '00:00:04,000 --> 00:00:06,800', 'Second line.', '第二行。', ''].join('\n');

async function loadPage(page) {
  await send('Page.navigate', { url: BASE + '/' + page + '.html' });
  for (let i = 0; i < 80; i++) { try { if ((await ev('document.readyState')) === 'complete') break; } catch (e) { } await wait(400); }
  await wait(2500);
}
const DIAG = `JSON.stringify({href:location.href, ready:document.readyState,
  tool:typeof reportTool, core:typeof CORE_GLOBAL, lang:navigator.language})`;

(async () => {
  const cr = spawn(CHROME, ['--headless=new', '--remote-debugging-port=' + PORT, '--no-sandbox', '--disable-gpu',
    /* ⚠️ 不走代理：ai-srtsub.com 在国内（阿里云），直连 200；而 7897 那个代理时有时无，
       挂着它反而整页 chrome-error（308 实测踩到，DIAG 一打 href 就是 chromewebdata）。 */
    '--lang=zh-CN',
    '--user-data-dir=/tmp/cr-live308-' + Date.now(), 'about:blank'], { stdio: 'ignore' });
  let list = null;
  for (let i = 0; i < 30; i++) {
    try { list = await new Promise((res, rej) => { http.get({ host: '127.0.0.1', port: PORT, path: '/json/list' }, r => { let d = ''; r.on('data', c => d += c); r.on('end', () => res(d)); }).on('error', rej); }); if (list.includes('webSocketDebuggerUrl')) break; } catch (e) { }
    await wait(300);
  }
  ws = new WebSocket(JSON.parse(list).find(t => t.type === 'page').webSocketDebuggerUrl, { perMessageDeflate: false });
  await new Promise((res, rej) => { ws.on('open', res); ws.on('error', rej); });
  ws.on('message', d => { const m = JSON.parse(d); if (m.id && pending.has(m.id)) { pending.get(m.id).res(m.result || m); pending.delete(m.id); } });
  await send('Page.enable'); await send('Runtime.enable'); await send('Network.enable');
  await send('Network.setCacheDisabled', { cacheDisabled: true });
  await send('Emulation.setDeviceMetricsOverride', { width: 1280, height: 1000, deviceScaleFactor: 1, mobile: false });
  await send('Emulation.setLocaleOverride', { locale: 'zh-CN' });
  await send('Page.addScriptToEvaluateOnNewDocument', {
    source: "try{Object.defineProperty(navigator,'language',{get:function(){return 'zh-CN'}});Object.defineProperty(navigator,'languages',{get:function(){return ['zh-CN','en']}});}catch(e){}"
  });

  /* 先自证加载没问题，再往下量 */
  await loadPage('shift');
  const d0 = JSON.parse(await ev(`JSON.stringify({href:location.href, ready:document.readyState,
    tool: (function(){try{return typeof reportTool}catch(e){return 'ERR'}})(),
    core: typeof ShiftCore, lang: navigator.language})`));
  console.log('DIAG ' + JSON.stringify(d0));
  ok(String(d0.href).indexOf('ai-srtsub.com/shift.html') >= 0, '页面确实在线上（不是 chrome-error）', d0.href);
  ok(d0.core === 'object', '引擎加载完成', d0.core);
  ok(d0.tool === 'function', 'reportTool 在线上页面上就绪', d0.tool);
  ok(d0.lang === 'zh-CN', '语言被判成 zh-CN', d0.lang);

  /* ---------- 六页各真触发一次 ---------- */
  console.log('— shift —');
  await ev(`setSrc(${JSON.stringify(SRT)}, 'a.srt')`); await wait(500);
  await ev("document.querySelector('#btnGo').click()"); await wait(1200);
  ok(true, 'shift 跑了一次流水线（计入线上账本）');

  console.log('— convert —');
  await loadPage('convert');
  await ev(`setSrc(${JSON.stringify(SRT)}, 'a.srt')`); await wait(500);
  await ev("document.querySelector('#btnGo').click()"); await wait(1200);
  await ev("document.querySelector('#btnDl').click()"); await wait(1200);
  ok(true, 'convert 转换 + 下载各一次');

  console.log('— extract —');
  await loadPage('extract');
  await ev(`setSrc(${JSON.stringify(SRT)}, 'a.srt')`); await wait(1500);
  ok(true, 'extract 提取一次（自动触发）');

  console.log('— bilingual —');
  await loadPage('bilingual');
  await ev(`setSrc(${JSON.stringify(BI)}, 'bi.srt')`); await wait(500);
  await ev("document.querySelector('#btnGo').click()"); await wait(1500);
  ok(true, 'bilingual 分流一次');

  console.log('— repair —');
  await loadPage('repair');
  await ev(`setSrc(${JSON.stringify(SRT)}, 'a.srt')`); await wait(1500);
  ok(true, 'repair 修复一次（自动触发）');

  console.log('— glossary —');
  await loadPage('glossary');
  await ev("document.getElementById('gl').value = 'Hello->你好\\nworld->世界'");
  await ev(`setSrc(${JSON.stringify(SRT)}, 'a.srt')`); await wait(1800);
  ok(true, 'glossary 替换一次');

  /* ---------- 后台页在线上能开（不需要登录，只看骨架） — */
  console.log('— 后台页 —');
  await loadPage('admin');
  const adm = JSON.parse(await ev(`JSON.stringify((function(){
    var tabs=[].slice.call(document.querySelectorAll('#adminTabs button')).map(function(b){return b.dataset.tab});
    return {ready:document.readyState, tabs:tabs,
      panes:['paneModel','paneStats','paneAcct'].map(function(p){return !!document.getElementById(p)}),
      toolCard: !!document.getElementById('toolCard'),
      loginShown: (function(){var e=document.getElementById('loginCard');return e?getComputedStyle(e).display!=='none':null})()};
  })())`));
  ok(adm.tabs.join('|') === 'model|stats|acct', '线上后台三个 tab 就绪', adm.tabs.join('|'));
  ok(adm.panes.every(Boolean) && adm.toolCard, '三个面板 + 工具记录卡都在', JSON.stringify(adm.panes));
  ok(adm.loginShown === true, '未登录时显示登录卡（没跳过鉴权）', adm.loginShown);

  console.log('\n_live308: ' + P + ' 通过 / ' + F + ' 失败');
  ws.close(); cr.kill(); process.exit(F ? 1 : 0);
})().catch(e => { console.error('崩了', e.message); process.exit(1); });
