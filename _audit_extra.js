/* v0.9.281 补充体检：现成脚本没覆盖的三块
     ① 手机屏（375×800）四页会不会横向溢出 —— 桌面看着没事，手机上左右能拖的那个最伤
     ② 资源层：4xx/5xx 请求、控制台报错
     ③ 真上传冒烟：三个引擎各走一遍「传文件 → 出结果」（点按钮点不出引擎里的错）
   ⚠️ 本地 3098（--no-proxy-server）；每次新 user-data-dir */
'use strict';
process.on('unhandledRejection', e => { console.log('   (忽略导航噪音: ' + (e && e.message) + ')'); });
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');
const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PORT = 9371, BASE = 'http://127.0.0.1:3098';
const SRC = '/tmp/aud-src.srt', DST = '/tmp/aud-zh.srt';
const wait = ms => new Promise(r => setTimeout(r, ms));
let PASS = 0, FAIL = 0, ws, tid = 0; const pending = new Map();
let errs = [], bad = [], reqs = [];
const ok = (c, n, x) => { console.log((c ? '  ✓ ' : '  ✗ ') + n + (x !== undefined ? '  [' + String(x).slice(0, 160) + ']' : '')); c ? PASS++ : FAIL++; };
function send(m, p) {
  const id = ++tid; ws.send(JSON.stringify({ id, method: m, params: p || {} }));
  return new Promise((res, rej) => { pending.set(id, { res, rej }); setTimeout(() => { if (pending.has(id)) { pending.delete(id); rej(new Error('timeout ' + m)); } }, 25000); });
}
async function ev(e) {
  const r = await send('Runtime.evaluate', { expression: e, returnByValue: true, awaitPromise: true });
  if (r.exceptionDetails) throw new Error(r.exceptionDetails.text);
  return r.result.value;
}
async function goto(u) {
  await send('Page.navigate', { url: 'about:blank' }); await wait(200);
  await send('Page.navigate', { url: u });
  for (let i = 0; i < 40; i++) { try { if (await ev('document.readyState') === 'complete') break; } catch (e) { } await wait(400); }
  await wait(1400);
}
async function metric(w, h) { await send('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: 1, mobile: w < 500 }); await wait(500); }
/* 用 CDP 真给 <input type=file> 塞文件（会触发页面的 change） */
async function setFile(sel, path) {
  const { root } = await send('DOM.getDocument', { depth: 0 });
  const { nodeId } = await send('DOM.querySelector', { nodeId: root.nodeId, selector: sel });
  if (!nodeId) throw new Error('找不到 ' + sel);
  await send('DOM.setFileInputFiles', { files: [path], nodeId });
  await wait(1200);
}
/* 横向溢出：谁最宽 */
const OVER = `JSON.stringify((function(){
  var dw=document.documentElement.scrollWidth, cw=document.documentElement.clientWidth;
  var worst=null, list=[];
  Array.prototype.forEach.call(document.querySelectorAll('body *'), function(el){
    var r=el.getBoundingClientRect();
    if(r.width<2||r.height<2) return;
    if(r.right > cw+1){ list.push({t:(el.tagName+'.'+(el.className||'')).slice(0,40), r:Math.round(r.right), w:Math.round(r.width)});
      if(!worst||r.right>worst.r) worst={t:(el.tagName+'.'+(el.className||'')).slice(0,40), r:Math.round(r.right), w:Math.round(r.width)}; }
  });
  list.sort(function(a,b){return b.r-a.r});
  return {docW:dw, cliW:cw, over:dw-cw, worst:worst, top:list.slice(0,3), n:list.length};
})())`;

(async () => {
  const chrome = spawn(CHROME, ['--headless=new', '--remote-debugging-port=' + PORT, '--no-sandbox', '--disable-gpu',
    '--remote-allow-origins=*', '--window-size=1280,900', '--no-proxy-server',
    '--user-data-dir=/tmp/cbuddy-audx-' + Date.now()], { stdio: 'ignore' });
  let list = null;
  for (let i = 0; i < 20 && !list; i++) {
    await wait(1000);
    list = await new Promise(res => { const q = http.get('http://127.0.0.1:' + PORT + '/json/list', r => { let b = ''; r.on('data', d => b += d); r.on('end', () => res(JSON.parse(b))); }); q.on('error', () => res(null)); });
  }
  if (!list) throw new Error('Chrome 没起来');
  ws = new WebSocket(list.find(t => t.type === 'page').webSocketDebuggerUrl, { perMessageDeflate: false });
  ws.on('message', raw => {
    const o = JSON.parse(raw);
    if (o.id && pending.has(o.id)) { const p = pending.get(o.id); pending.delete(o.id); (o.error ? p.rej(new Error(o.error.message)) : p.res(o.result)); return; }
    if (o.method === 'Runtime.exceptionThrown') errs.push((((o.params.exceptionDetails || {}).exception || {}).description || (o.params.exceptionDetails || {}).text || '').slice(0, 160));
    if (o.method === 'Runtime.consoleAPICalled' && o.params.type === 'error') errs.push(String(o.params.args[0] && o.params.args[0].value).slice(0, 160));
    if (o.method === 'Network.responseReceived') { const r = o.params.response; reqs.push({ u: r.url, s: r.status }); if (r.status >= 400) bad.push(r.status + ' ' + r.url.slice(0, 110)); }
  });
  await new Promise(r => ws.on('open', r));
  await send('Runtime.enable'); await send('Page.enable'); await send('DOM.enable'); await send('Network.enable');
  await send('Network.setCacheDisabled', { cacheDisabled: true });

  console.log('━━━ ① 手机屏 375×800：横向溢出 ━━━');
  await metric(375, 800);
  for (const u of ['/', '/translate.html', '/merge.html', '/clean.html']) {
    errs.length = 0; bad.length = 0;
    await goto(BASE + u);
    const m = JSON.parse(await ev(OVER));
    ok(m.over <= 1, u + ' 没有横向滚动条', '超出 ' + m.over + 'px' + (m.worst ? '；最宽 ' + m.worst.t + ' right=' + m.worst.r : ''));
    if (m.over > 1 && m.worst) console.log('      溢出元素 top3: ' + JSON.stringify(m.top));
    ok(errs.length === 0, u + ' 手机屏零 JS 异常', errs[0] || '');
    ok(bad.length === 0, u + ' 无 4xx/5xx 资源', bad.slice(0, 2).join(' | '));
  }

  console.log('━━━ ② 桌面 1280：资源与控制台 ━━━');
  await metric(1280, 900);
  for (const u of ['/', '/translate.html', '/merge.html', '/clean.html']) {
    errs.length = 0; bad.length = 0; reqs.length = 0;
    await goto(BASE + u);
    ok(bad.length === 0, u + ' 无 4xx/5xx 资源（共 ' + reqs.length + ' 个请求）', bad.slice(0, 3).join(' | '));
    ok(errs.length === 0, u + ' 零控制台报错', errs[0] || '');
  }

  console.log('━━━ ③ 真上传冒烟：三个引擎各走一遍 ━━━');
  /* 翻译页：传英文 SRT → 条目渲染出来（不点翻译，翻译要 API key）
     ⚠️ 条目容器是 .cuegrid / .cue（**没有** #cueList 这个 id）；另外页面读完文件会把 input.value 清空，
     不能拿 input.value 判断「进去没有」，要看条目或页面上出现的文件名。 */
  errs.length = 0;
  await goto(BASE + '/translate.html');
  await setFile('#file', SRC);
  await wait(1800);
  let tr = JSON.parse(await ev(`JSON.stringify({rows:document.querySelectorAll('.cuegrid .cue').length,
    named:/aud-src/.test(document.body.innerText), body:document.body.innerText.length})`));
  console.log('   翻译页: ' + JSON.stringify(tr));
  ok(tr.rows >= 5, '翻译页：上传后条目渲染出来', tr.rows + ' 条');
  ok(tr.named, '翻译页：页面上认出了这份文件');
  ok(errs.length === 0, '翻译页上传零异常', errs[0] || '');

  /* 清洗页：传同一份 → 结果区出统计（清洗是自动跑的，不用点按钮）
     ⚠️ #pvWrap 在结果区，可能还没滚到 / 没生成 —— 用「原始 5 / 清洗后 N」这行统计当判据更稳。 */
  errs.length = 0;
  await goto(BASE + '/clean.html');
  await setFile('#file', SRC);
  await wait(2200);
  let cl = JSON.parse(await ev(`JSON.stringify({
    fname:(document.getElementById('fname')||{}).textContent||'',
    stat:(document.body.innerText.match(/原始[\\s\\S]{0,30}/)||[''])[0].replace(/\\n+/g,' '),
    pvLen:((document.getElementById('pvWrap')||{}).innerText||'').length,
    rows:document.querySelectorAll('.out-row,.chk-row,.stat-row').length})`));
  console.log('   清洗页: ' + JSON.stringify(cl));
  ok(cl.fname.indexOf('aud-src') >= 0, '清洗页：文件名上屏', cl.fname);
  ok(/原始\s*5/.test(cl.stat) || cl.pvLen > 20, '清洗页：出了清洗结果', cl.stat || ('pv' + cl.pvLen));
  ok(errs.length === 0, '清洗页上传零异常', errs[0] || '');

  /* 特效页：双语模式传原文 + 译文 → 点合并 → 预览出内容 */
  errs.length = 0;
  await goto(BASE + '/merge.html');
  await setFile('#srcFile', SRC);
  await setFile('#dstFile', DST);
  await wait(1200);
  await ev(`(function(){var b=document.getElementById('btnMerge'); if(b) b.click();})()`);
  await wait(1800);
  let mg = JSON.parse(await ev(`JSON.stringify({pv:(document.querySelector('#pvWrap,#pvCard,.pv-wrap')||{}).innerText||'',
    body:document.body.innerText.length})`));
  console.log('   特效页: pvLen=' + mg.pv.length);
  ok(mg.pv.length > 10, '特效页：双语合并后预览有内容', mg.pv.length + ' 字');
  ok(errs.length === 0, '特效页合并零异常', errs[0] || '');

  console.log('\n—— 补充体检：通过 ' + PASS + ' / 失败 ' + FAIL + ' ——');
  ws.close(); chrome.kill();
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error('崩了: ' + e.message); try { ws.close(); } catch (x) { } process.exit(1); });
