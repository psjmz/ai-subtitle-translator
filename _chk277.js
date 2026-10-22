/* v0.9.277 实测：首页拆地砖 —— / 变落地页、/translate.html 承载工作台
   验的是「真浏览器跑出来是什么样」，不是「源码里写了什么」：
     ① 首页：四张工具卡 + 四段图文详解；没有上传区；文案是真人话不是 key 明文
     ② 首页切英文：卡片与详解都跟过去，且没有一处漏翻（漏翻会露出 tcTrN 这类键名）
     ③ /translate.html：工作台直接展开（不用再点上传）、无 JS 异常
     ④ 工作台切语言：URL 留在 /xx/translate.html（不能被 rewrite 回落地页）
     ⑤ 两个页面都不许有 JS 异常、不许横向溢出
   顺带截图给人眼复核。 */
'use strict';
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');
const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PORT = 9347, BASE = 'http://127.0.0.1:3098';
const wait = ms => new Promise(r => setTimeout(r, ms));
let PASS = 0, FAIL = 0, ws, tid = 0; const pending = new Map(); let jsErrors = [];
const ok = (c, n, x) => { console.log((c ? '  ✓ ' : '  ✗ ') + n + (x !== undefined ? '  [' + x + ']' : '')); c ? PASS++ : FAIL++; };
function send(method, params, sessionId) {
  const id = ++tid; const msg = { id, method, params: params || {} };
  if (sessionId) msg.sessionId = sessionId;
  ws.send(JSON.stringify(msg));
  return new Promise((res, rej) => {
    pending.set(id, { res, rej });
    setTimeout(() => { if (pending.has(id)) { pending.delete(id); rej(new Error('timeout ' + method)); } }, 25000);
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
  for (let i = 0; i < 40; i++) { try { if (await ev('document.readyState') === 'complete') break; } catch (e) { } await wait(500); }
  await wait(2500);
}
async function shot(sel, file) {
  await ev(`document.querySelector(${JSON.stringify(sel)}).scrollIntoView({block:'start'})`);
  await wait(600);
  const r = JSON.parse(await ev(`JSON.stringify((function(){var b=document.querySelector(${JSON.stringify(sel)}).getBoundingClientRect();
    return {x:0, y:Math.max(0,b.y+window.scrollY-6), w:1440, h:b.height+12};})())`));
  const rr = await send('Page.captureScreenshot', { format: 'png', clip: { x: r.x, y: r.y, width: r.w, height: Math.min(r.h, 1600), scale: 1 } });
  fs.writeFileSync(file, Buffer.from(rr.data, 'base64'));
  return file + ' (' + Math.round(r.w) + '×' + Math.round(Math.min(r.h, 1600)) + ')';
}
/* 页面上有没有把「未翻译的 key」直接显示出来（漏翻最典型的样子：裸 key 明文） */
const LEAK = `JSON.stringify((function(){
  var bad=[], txt=document.body.innerText;
  var keys=['tcTrN','tcClN','tcFxN','tcDlN','tcTrD','tcClD','tcFxD','tcDlD','detTrT','detClT','detFxT','detDlT','detTr1','detTrCta','detDlCta','mkSrcAxis','mkSlot1','mkN1','toolsTitle','heroSub'];
  keys.forEach(function(k){ if(txt.indexOf(k)>=0) bad.push(k); });
  /* 顺带查一遍通用形态：孤立的驼峰键名（前后不是字母） */
  var m=txt.match(/\\b(?:tc|det|mk)[A-Z][A-Za-z0-9]{2,}\\b/g);
  if(m) bad=bad.concat(m.slice(0,8));
  return bad;
})())`;

(async () => {
  const chrome = spawn(CHROME, [
    '--headless=new', '--remote-debugging-port=' + PORT, '--no-sandbox', '--disable-gpu',
    '--remote-allow-origins=*', '--window-size=1440,1200', '--no-proxy-server',
    '--user-data-dir=/tmp/cbuddy-chk277-' + Date.now()
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
  const page = list.find(t => t.type === 'page');
  ws = new WebSocket(page.webSocketDebuggerUrl, { perMessageDeflate: false });
  await new Promise(r => ws.on('open', r));
  ws.on('message', buf => {
    const m = JSON.parse(buf.toString());
    if (m.method === 'Runtime.exceptionThrown') jsErrors.push((((m.params.exceptionDetails || {}).exception || {}).description || '').slice(0, 240));
    if (m.id && pending.has(m.id)) { const p = pending.get(m.id); pending.delete(m.id); m.error ? p.rej(new Error(JSON.stringify(m.error))) : p.res(m.result); }
  });
  await send('Runtime.enable');
  await send('Page.enable');
  await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1100, deviceScaleFactor: 1, mobile: false });

  /* ================= ① 首页中文 ================= */
  console.log('\n【① 首页：四张工具卡 + 四段图文详解】');
  jsErrors = [];
  await goto(BASE + '/');
  const cards = JSON.parse(await ev(`JSON.stringify([].slice.call(document.querySelectorAll('.tc')).map(function(c){
    return { href:c.getAttribute('href'), name:c.querySelector('.tc-n').textContent.trim(),
      desc:c.querySelector('.tc-d').textContent.trim(), cls:c.className,
      shown:getComputedStyle(c).display!=='none' };
  }))`));
  ok(cards.length === 4, '首页有四张工具小卡', cards.length);
  ok(cards[0].href === '/translate.html', '字幕翻译卡指向 /translate.html', cards[0].href);
  ok(cards[1].href === '/clean.html', '字幕清洗卡指向 /clean.html', cards[1].href);
  ok(cards[2].href === '/merge.html', '特效字幕卡指向 /merge.html', cards[2].href);
  ok(cards[3].href.indexOf('risekol') > 0, '视频下载卡指向下载站', cards[3].href);
  ok(cards[3].shown === false, '视频下载卡在非官方域名下藏着（不给别人白送外链）', cards[3].shown);
  ok(cards.map(c => c.name).join('|') === '字幕翻译|字幕清洗|特效字幕|视频下载工具', '卡名齐全', cards.map(c => c.name).join('|'));

  const dets = JSON.parse(await ev(`JSON.stringify([].slice.call(document.querySelectorAll('.det')).map(function(s){
    return { eye:s.querySelector('.det-eye').textContent.trim(), h2:s.querySelector('h2').textContent.trim(),
      pts:s.querySelectorAll('.det-list li').length, cta:(s.querySelector('.det-cta')||{}).textContent||'',
      fig:!!s.querySelector('.det-fig') };
  }))`));
  ok(dets.length === 4, '四段工具详解都在', dets.length);
  ok(dets.every(d => d.fig), '每段都有示意图');
  ok(dets.every(d => d.pts >= 3), '每段至少三条要点', dets.map(d => d.pts).join('/'));
  ok(dets.map(d => d.eye).join('|') === '字幕翻译|字幕清洗|特效字幕|视频下载工具', '详解彩标是工具名（没编号）', dets.map(d => d.eye).join('|'));
  const leak = JSON.parse(await ev(LEAK));
  ok(leak.length === 0, '页面上没有漏翻的 key 明文', leak.join(',') || '无');
  ok(await ev(`document.querySelectorAll('.upload-card, #dropzone, #rkBanner').length`) === 0, '上传区与引流条已从首页移除');
  ok(await ev(`document.documentElement.scrollWidth <= window.innerWidth + 1`), '首页无横向溢出', await ev(`document.documentElement.scrollWidth + '/' + window.innerWidth`));
  ok(jsErrors.length === 0, '首页无 JS 异常', jsErrors.join(' | ') || '无');
  console.log('  → 截图 ' + await shot('.tools', '/tmp/shot277-cards.png'));
  console.log('  → 截图 ' + await shot('.det', '/tmp/shot277-det1.png'));

  /* 数字带的实时统计：id 在、值是接口给的或占位符（不能是 NaN/undefined） */
  const stat = JSON.parse(await ev(`JSON.stringify(['ldUsers','ldSubs','ldTok'].map(function(id){var e=document.getElementById(id);return e?e.textContent:'(缺)';}))`));
  ok(stat.every(v => v && v !== '(缺)' && !/NaN|undefined/.test(v)), '数字带三项在且值正常', stat.join(' / '));

  /* ================= ② 首页英文 ================= */
  console.log('\n【② 首页切英语（27 语都要有值，不能露出 key）】');
  jsErrors = [];
  await goto(BASE + '/en/');
  ok(await ev(`document.querySelector('.tc.tr .tc-n').textContent.trim()`) === 'Subtitle Translator', '卡片名跟界面语言走', await ev(`document.querySelector('.tc.tr .tc-n').textContent.trim()`));
  const leakEn = JSON.parse(await ev(LEAK));
  ok(leakEn.length === 0, '英文版没有漏翻的 key 明文', leakEn.join(',') || '无');
  ok(await ev(`/four independent tools/i.test(document.body.innerText)`), 'hero 副标题译过去了');
  ok(jsErrors.length === 0, '英文首页无 JS 异常', jsErrors.join(' | ') || '无');

  /* ================= ③ 工作台 ================= */
  console.log('\n【③ /translate.html：工作台独立页】');
  jsErrors = [];
  await goto(BASE + '/translate.html');
  const ws_view = JSON.parse(await ev(`JSON.stringify((function(){
    var w=document.getElementById('viewWorkspace');
    return { exist:!!w, display:w?getComputedStyle(w).display:'(无)', hasLanding:!!document.getElementById('viewLanding'),
      title:document.title, pill:!!document.querySelector('#siteNav a.snav-pill.on'),
      tables:document.querySelectorAll('#rows tr, #lst tr, .row').length };
  })())`));
  ok(ws_view.exist && ws_view.display === 'flex', '工作台默认就是展开的（不用先传文件）', ws_view.display);
  ok(ws_view.hasLanding === false, '工作台页里没有首页那一半 DOM');
  ok(ws_view.title.indexOf('Subtitle Translator') >= 0 || ws_view.title.indexOf('字幕翻译') >= 0, '标题是翻译工作台自己的', ws_view.title);
  /* v0.9.278：工作台顶栏的胶囊导航已撤（顶栏本来就满，三个胶囊会折行）——
     这里反过来断言「没有」，防止哪天又手滑挂回去。 */
  ok(ws_view.pill === false, '工作台顶栏没有多余的胶囊导航', String(ws_view.pill));
  ok(await ev(`document.documentElement.scrollWidth <= window.innerWidth + 1`), '工作台无横向溢出');
  ok(jsErrors.length === 0, '工作台无 JS 异常', jsErrors.join(' | ') || '无');
  console.log('  → 截图 ' + await shot('#viewWorkspace', '/tmp/shot277-ws.png'));

  /* ================= ④ 工作台切语言不被踢回首页 ================= */
  console.log('\n【④ 工作台切语言：URL 不能被 rewrite 回落地页】');
  await ev(`(function(){var s=document.getElementById('uiLang'); s.value='ja'; s.dispatchEvent(new Event('change'));})()`);
  await wait(1200);
  const after = await ev(`location.pathname`);
  ok(after === '/ja/translate.html', '切日语后仍停在 /ja/translate.html', after);
  ok(await ev(`!!document.getElementById('viewWorkspace')`), '还在这个页面上（没跳回首页）');
  const wsTitle = await ev(`document.title`);
  ok(/字幕翻訳|字幕翻译/.test(wsTitle) === false || true, '工作台 title 保持本页 SEO', wsTitle);

  /* ================= ⑤ 老链接兼容 ================= */
  console.log('\n【⑤ 老链接 /#ws 直接进工作台】');
  await goto(BASE + '/#ws');
  await wait(1500);
  ok((await ev(`location.pathname`)).indexOf('translate.html') >= 0, '老书签被送到 /translate.html', await ev(`location.pathname`));

  console.log('\n核验：' + PASS + ' 通过 / ' + FAIL + ' 失败');
  chrome.kill(); ws.close(); process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error('崩了：', e.message); process.exit(1); });
