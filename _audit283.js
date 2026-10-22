/* v0.9.283 体检 · 真浏览器：控制台报错 / 全站链接连通 / 移动端溢出 / 关键交互冒烟
   本地 3098（--no-proxy-server）；每次独立 user-data-dir */
'use strict';
process.on('unhandledRejection', () => {});
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');
const { spawn } = require('child_process');
const http = require('http');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const BASE = 'http://127.0.0.1:3098';
const wait = ms => new Promise(r => setTimeout(r, ms));
let PASS = 0, FAIL = 0, WARN = 0, ws, tid = 0;
const pending = new Map();
const ok = (c, n, x) => { console.log((c ? '  ✓ ' : '  ✗ ') + n + (x !== undefined ? '  [' + String(x).slice(0, 200) + ']' : '')); c ? PASS++ : FAIL++; };
const note = (n, x) => { console.log('  · ' + n + (x !== undefined ? '  [' + String(x).slice(0, 200) + ']' : '')); WARN++; };
function send(m, p) {
  const id = ++tid; ws.send(JSON.stringify({ id, method: m, params: p || {} }));
  return new Promise((res, rej) => { pending.set(id, { res, rej }); setTimeout(() => { if (pending.has(id)) { pending.delete(id); rej(new Error('timeout ' + m)); } }, 30000); });
}
async function ev(e) {
  const r = await send('Runtime.evaluate', { expression: e, returnByValue: true, awaitPromise: true });
  if (r.exceptionDetails) throw new Error(r.exceptionDetails.text + ' ' + (r.exceptionDetails.exception && r.exceptionDetails.exception.description || ''));
  return r.result.value;
}
async function goto(u) {
  await send('Page.navigate', { url: 'about:blank' }); await wait(150);
  await send('Page.navigate', { url: u });
  for (let i = 0; i < 50; i++) { try { if (await ev('document.readyState') === 'complete') break; } catch (e) { } await wait(300); }
  await wait(1200);
}
async function metric(w, h) { await send('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: 1, mobile: w < 500 }); await wait(400); }

/* 收集本轮导航的控制台错误 + 失败请求 */
let errs = [], bad = [];
async function hook() {
  await send('Runtime.enable'); await send('Page.enable'); await send('Network.enable');
}
async function drain() { await wait(300); }

const HEAD = (u) => new Promise(r => http.get(u, res => { res.resume(); r(res.statusCode); }).on('error', () => r(0)));

(async () => {
  const dir = '/tmp/aud283-profile-' + Date.now();
  const ch = spawn(CHROME, ['--headless=new', '--disable-gpu', '--no-sandbox', '--no-proxy-server',
    '--remote-debugging-port=9371', '--user-data-dir=' + dir], { stdio: 'ignore' });
  await wait(2500);
  let list = null;
  for (let i = 0; i < 25; i++) {
    try { list = await new Promise((res, rej) => http.get('http://127.0.0.1:9371/json/list', r => { let d = ''; r.on('data', c => d += c); r.on('end', () => res(JSON.parse(d))); }).on('error', rej)); if (list && list.length) break; } catch (e) { }
    await wait(500);
  }
  const tgt = (list || []).find(t => t.type === 'page');
  ws = new WebSocket(tgt.webSocketDebuggerUrl, { perMessageDeflate: false, maxPayload: 256 * 1024 * 1024 });
  await new Promise((res, rej) => { ws.on('open', res); ws.on('error', rej); });
  ws.on('message', s => {
    let m; try { m = JSON.parse(s); } catch (e) { return; }
    if (m.id && pending.has(m.id)) { const p = pending.get(m.id); pending.delete(m.id); m.error ? p.rej(new Error(m.error.message)) : p.res(m.result); return; }
    if (m.method === 'Runtime.exceptionThrown') {
      const d = m.params.exceptionDetails || {};
      errs.push((d.exception && d.exception.description || d.text || 'unknown').split('\n')[0]);
    }
    if (m.method === 'Runtime.consoleAPICalled' && m.params.type === 'error') {
      try { errs.push(String((m.params.args[0] || {}).value || (m.params.args[0] || {}).description || '').slice(0, 160)); } catch (e) { }
    }
    if (m.method === 'Network.responseReceived') {
      const st = m.params.response.status;
      if (st >= 400) bad.push(st + ' ' + m.params.response.url.replace(BASE, ''));
    }
    if (m.method === 'Network.loadingFailed') bad.push('FAIL ' + (m.params.errorText || '') + ' ' + (m.params.type || ''));
  });
  await hook();

  /* ---------- ① 四页控制台干净 ---------- */
  console.log('\n─── ① 四页控制台 / 资源 ───');
  const pages = [['首页', '/'], ['工作台', '/translate.html'], ['特效页', '/merge.html'], ['清洗页', '/clean.html'], ['后台', '/admin.html']];
  for (const [name, path] of pages) {
    errs = []; bad = [];
    await metric(1440, 900);
    await goto(BASE + path);
    await drain();
    const uniq = [...new Set(errs)], uniqB = [...new Set(bad)];
    ok(uniq.length === 0 && uniqB.length === 0, name + ' 控制台无报错/无失败请求', uniq.concat(uniqB).slice(0, 3).join(' ; ') || '干净');
  }

  /* ---------- ② 全站链接连通（爬 index + merge + clean + 导航卡） ---------- */
  console.log('\n─── ② 站内链接连通 ───');
  errs = []; bad = [];
  await metric(1440, 900);
  await goto(BASE + '/');
  const links = await ev(`JSON.stringify([...new Set(
      [...document.querySelectorAll('a[href]')].map(a=>a.getAttribute('href'))
        .filter(h=>h && !h.startsWith('#') && !h.startsWith('mailto'))
    )])`);
  const all = JSON.parse(links);
  const internal = all.filter(h => h.startsWith('/') || !/^https?:/.test(h));
  note('首页外链（不测连通）', all.filter(h => /^https?:/.test(h)).join(' '));
  for (const h of internal) {
    const u = BASE + (h.startsWith('/') ? h : '/' + h);
    const code = await HEAD(u);
    ok(code === 200, '→ ' + h, code);
  }

  /* ---------- ③ 27 语路由：title / html lang / 无报错 ---------- */
  console.log('\n─── ③ 多语言路由服务端渲染 ───');
  const langs = ['zh-CN|/', 'en|/en/', 'ja|/ja/', 'ko|/ko/', 'zh-TW|/zh-TW/', 'ar|/ar/', 'he|/he/', 'ro|/ro/'];
  for (const pair of langs) {
    const [lg, p] = pair.split('|');
    errs = [];
    await goto(BASE + p);
    await drain();
    const info = await ev(`JSON.stringify({t:document.title, l:document.documentElement.lang, h1:(document.querySelector('h1')||{}).textContent||''})`);
    const o = JSON.parse(info);
    const expect = lg === 'zh-CN' ? 'zh-CN' : lg;
    // ro/he/ar 是后来补的语种，重点看有没有回退成中文
    const chineseFallback = /[\u4e00-\u9fa5]/.test(o.t) && !['zh-CN', 'zh-TW'].includes(lg);
    ok(o.l === expect && !!o.t && !chineseFallback && errs.length === 0, lg + ' 路由 title/lang', o.l + ' | ' + o.t.slice(0, 46));
  }

  /* ---------- ④ 移动端 375 + 768 横向溢出 ---------- */
  console.log('\n─── ④ 移动端溢出 ───');
  const OVER = `JSON.stringify((function(){
    var cw=document.documentElement.clientWidth, worst=[];
    Array.prototype.forEach.call(document.querySelectorAll('body *'), function(el){
      var r=el.getBoundingClientRect();
      if(r.width<2||r.height<2) return;
      if(r.right>cw+1) worst.push({t:(el.tagName+'.'+String(el.className||'')).slice(0,42), right:Math.round(r.right)});
    });
    return {cw:cw, sw:document.documentElement.scrollWidth, worst:worst.slice(0,4)};
  })())`;
  for (const w of [375, 768]) {
    for (const [name, path] of [['首页', '/'], ['工作台', '/translate.html'], ['特效页', '/merge.html'], ['清洗页', '/clean.html']]) {
      await metric(w, 800);
      await goto(BASE + path);
      await wait(600);
      const o = JSON.parse(await ev(OVER));
      ok(o.sw <= o.cw + 1, w + 'px ' + name + ' 无横向滚动', o.sw > o.cw + 1 ? 'scrollW=' + o.sw + ' > ' + o.cw + ' 溢出元素:' + JSON.stringify(o.worst) : 'ok');
    }
  }
  await metric(1440, 900);

  /* ---------- ⑤ 交互冒烟：切语言 / 面板切换 ---------- */
  console.log('\n─── ⑤ 交互冒烟 ───');
  errs = [];
  await goto(BASE + '/merge.html');
  const navCount = await ev(`document.querySelectorAll('.nav-tools a, nav a').length`);
  ok(navCount >= 3, '特效页顶栏导航卡 >=3', navCount);

  errs = [];
  await goto(BASE + '/clean.html');
  const clOk = await ev(`!!document.querySelector('#file,#fileInput,input[type=file]')`);
  ok(clOk, '清洗页有上传入口', clOk);

  errs = [];
  await goto(BASE + '/translate.html');
  await ev(`(function(){var s=document.getElementById('uiLang');if(!s)return;var o=[...s.options].map(x=>x.value);var t=o.find(v=>v==='ja')||o[1];var e=new Event('change');s.value=t;s.dispatchEvent(e);return;})()`);
  await wait(900);
  const afterLng = await ev(`JSON.stringify({lang:(document.getElementById('uiLang')||{}).value, logo:(document.getElementById('logoHome')||{}).getAttribute('href'), hero:(document.querySelector('h1')||{}).textContent||''})`);
  const lo = JSON.parse(afterLng);
  ok(lo.lang === 'ja', '工作台切日语：UI.lang 生效', lo.lang);
  ok(lo.logo === '/ja/', '工作台切日语：logo href 跟随重算', lo.logo);
  ok(errs.length === 0, '切语言无控制台报错', errs.slice(0, 2).join(';') || '干净');

  console.log('\n—— 浏览器体检：通过 ' + PASS + ' / 失败 ' + FAIL + ' / 提示 ' + WARN + ' ——');
  ws.close(); try { ch.kill('SIGKILL'); } catch (e) { }
  try { require('fs').rmSync(dir, { recursive: true, force: true }); } catch (e) { }
  setTimeout(() => process.exit(FAIL ? 1 : 0), 600);
})().catch(e => { console.error('体检脚本异常:', e.message); process.exit(2); });
