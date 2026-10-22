/* v0.9.297 本地真浏览器冒烟：工作台三处界面调整
   ① 折行设置那句说明收进标题后的 ⓘ（不再常驻两行，点/悬停才出）
   ② 导出格式面板压高度（更紧凑，但不能把字挤掉）
   ③ 任务条下方「AI 算力紧张…」只在跑的时候出现，且跟着界面语言走

   ⚠️ 高度做改前/改后同源对照：老页面用 srt-translator-github 里那份（尚未同步 297 的副本），
      同一窗口、同一界面语言下量同一批元素 —— 只有这样才能说「省了多少像素」。

   用法：node _chk297.js         （走 file://，两页都是纯前端）
        node _chk297.js --shot  （额外落三张截图，肉眼复核浮层与排版） */
'use strict';
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');
const http = require('http');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawn } = require('child_process');

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PORT = 9975 + Math.floor(Math.random() * 20);
const BASE = '/Users/jp/WorkBuddy/2026-09-04-00-29-54';
const NEW = 'file://' + BASE + '/srt-translator/translate.html';
const OLD = 'file://' + BASE + '/srt-translator-github/translate.html';
const SHOT = process.argv.indexOf('--shot') >= 0;
const wait = ms => new Promise(r => setTimeout(r, ms));

let ws, tid = 0; const pending = new Map();
function send(method, params) {
  const id = ++tid;
  ws.send(JSON.stringify({ id, method, params: params || {} }));
  return new Promise((res, rej) => {
    pending.set(id, { res, rej });
    setTimeout(() => { if (pending.has(id)) { pending.delete(id); rej(new Error('timeout ' + method)); } }, 20000);
  });
}
async function ev(expr) {
  const r = await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true });
  if (r.exceptionDetails) throw new Error(String(r.exceptionDetails.exception && r.exceptionDetails.exception.description).slice(0, 300));
  return r.result.value;
}
async function nav(url) {
  await send('Page.navigate', { url: url });
  for (let i = 0; i < 40; i++) {
    await wait(500);
    try {
      const rs = await ev('document.readyState');
      const ok = await ev("typeof applyI18n==='function' && typeof pgStart==='function' && typeof $==='function'");
      if (ok === true && (rs === 'complete' || rs === 'interactive')) return true;
    } catch (e) { }
  }
  return false;
}
/* 量一批元素的高度；界面语言先钉到中文，两边同条件才可比。
   ⚠️ 页面里有两块 aside.panel（左：翻译设置 / 右：导出），右栏才是这次改的那块 ——
      querySelector('aside.panel') 会拿到左边那块，量出来看着「没变化」纯属量错了对象。 */
const MEASURE = `(function(){
  var u=document.getElementById('uiLang');
  if(u && u.value!=='zh-CN'){ u.value='zh-CN'; u.dispatchEvent(new Event('change')); }
  var wrap = document.getElementById('maxW') ? document.getElementById('maxW').closest('.param-blk') : null;
  var fp = document.getElementById('fmtPanel');
  var pan = document.querySelectorAll('aside.panel')[1];
  var btns = Array.prototype.slice.call(document.querySelectorAll('.fmt-btn'));
  return JSON.stringify({
    wrapBlk: wrap ? wrap.offsetHeight : -1,
    fmtPanel: fp ? fp.offsetHeight : -1,
    fmtBtn: btns.length ? btns[0].offsetHeight : -1,
    fileVis: document.querySelectorAll('#fmtRowFile .fmt-btn:not([hidden])').length,
    kindVis: document.querySelectorAll('#fmtRowKind .fmt-btn:not([hidden])').length,
    panelScroll: pan ? (pan.scrollHeight - pan.clientHeight) : -1,
    btnClipped: btns.filter(function(b){
      return b.scrollWidth > b.clientWidth + 1 || b.scrollHeight > b.clientHeight + 1;
    }).length,
    btnCount: btns.length
  });
})()`;

(async () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'chk297-'));
  /* ⚠️ MAP * ~NOTFOUND 别删：页面挂着 AdSense 外链脚本，headless 无代理时请求悬着会拖死渲染进程 */
  const chrome = spawn(CHROME, ['--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check',
    '--host-resolver-rules=MAP * ~NOTFOUND, EXCLUDE 127.0.0.1',
    '--no-proxy-server', '--window-size=1440,1000', '--remote-debugging-port=' + PORT, '--user-data-dir=' + dir, 'about:blank'], { stdio: 'ignore' });

  let tabs = [];
  for (let i = 0; i < 40 && !tabs.length; i++) {
    await wait(400);
    try {
      const l = await new Promise((res, rej) => http.get('http://127.0.0.1:' + PORT + '/json/list', r => { let b = ''; r.on('data', d => b += d); r.on('end', () => res(b)); }).on('error', rej));
      tabs = (JSON.parse(l) || []).filter(x => x.type === 'page' && x.webSocketDebuggerUrl);
    } catch (e) { }
  }
  if (!tabs.length) { console.log('!! 浏览器起不来 port=' + PORT); process.exit(1); }
  ws = new WebSocket(tabs[0].webSocketDebuggerUrl, { perMessageDeflate: false, maxPayload: 256 * 1024 * 1024 });
  await new Promise((res, rej) => { ws.on('open', res); ws.on('error', rej); });
  ws.on('message', raw => {
    let m; try { m = JSON.parse(raw); } catch (e) { return; }
    if (m.id && pending.has(m.id)) { const p = pending.get(m.id); pending.delete(m.id); m.error ? p.rej(new Error(JSON.stringify(m.error))) : p.res(m.result); return; }
  });

  let pass = 0, fail = 0;
  function chk(n, c, x) { if (c) { pass++; console.log('  ✓ ' + n); } else { fail++; console.log('  ✗ ' + n + (x !== undefined ? '  → ' + x : '')); } }

  /* ---------- 先量老页面（改前） ---------- */
  console.log('--- ① 改前 / 改后高度对照（同窗口 1440×1000、同界面语言 zh-CN）---');
  const okOld = await nav(OLD);
  const before = okOld ? JSON.parse(await ev(MEASURE)) : null;
  console.log('  改前：' + JSON.stringify(before));

  /* ---------- 换到新页面 ---------- */
  if (!(await nav(NEW))) { console.log('!! 新页面没加载出来'); chrome.kill('SIGKILL'); process.exit(1); }
  await wait(400);
  const after = JSON.parse(await ev(MEASURE));
  console.log('  改后：' + JSON.stringify(after));

  chk('折行设置块变矮了', before && after.wrapBlk < before.wrapBlk,
    (before && before.wrapBlk) + ' → ' + after.wrapBlk);
  chk('导出格式面板变矮了', before && after.fmtPanel < before.fmtPanel,
    (before && before.fmtPanel) + ' → ' + after.fmtPanel);
  chk('单个格式按钮变矮了', before && after.fmtBtn < before.fmtBtn,
    (before && before.fmtBtn) + ' → ' + after.fmtBtn);
  chk('右栏仍然不出内滚动条（scrollHeight 不超 clientHeight）', after.panelScroll <= 1, '超出 ' + after.panelScroll + 'px');
  chk('格式按钮文字没被挤掉（scrollWidth/Height 不溢出）', after.btnClipped === 0, after.btnClipped + ' 个按钮被截断');
  chk('文件格式还是 5 个可见（SRT/VTT/SBV/ASS/TXT）', after.fileVis === 5, after.fileVis);
  chk('内容那组 3 个可见（单语 / 双语·原文在上 / 双语·译在上）', after.kindVis === 3, after.kindVis);

  console.log('--- ② 折行说明：从常驻正文收进 ⓘ ---');
  chk('页面上已经没有那段常驻说明',
    (await ev("document.body.innerText.indexOf('无须重新翻译') < 0")) === true);
  chk('.hint#wrapTipEl 那个常驻 div 没了',
    (await ev("document.querySelector('.hint#wrapTipEl')")) === null);
  chk('wrapTipEl 换成了 ⓘ 图标',
    (await ev("(function(){var e=document.getElementById('wrapTipEl');return e?e.tagName+'|'+e.className:'null';})()")) === 'I|info',
    await ev("(function(){var e=document.getElementById('wrapTipEl');return e?e.tagName+'|'+e.className:'null';})()"));
  chk('ⓘ 键盘 / 触屏可达（tabindex=0）',
    (await ev("document.getElementById('wrapTipEl').getAttribute('tabindex')")) === '0');
  chk('说明挂到了 data-tip-i18n（浮层取词口）',
    (await ev("document.getElementById('wrapTipEl').getAttribute('data-tip-i18n')")) === 'wrapTip',
    await ev("document.getElementById('wrapTipEl').getAttribute('data-tip-i18n')"));
  const tipMono = await ev("document.getElementById('wrapTipEl').getAttribute('data-tip')");
  chk('浮层里就是原话（单语口径）', /无须重新翻译/.test(tipMono) && /单语字幕/.test(tipMono), tipMono);

  console.log('--- ③ 双语模式：说明跟着换口径（老逻辑一个字没动）---');
  await ev("setFmt('bi-src','srt');1"); await wait(300);
  const tipBi = await ev("document.getElementById('wrapTipEl').getAttribute('data-tip')");
  chk('双语下 data-tip-i18n 变 wrapTipBi',
    (await ev("document.getElementById('wrapTipEl').getAttribute('data-tip-i18n')")) === 'wrapTipBi');
  chk('双语下浮层文字换成了「双语字幕」', /双语字幕/.test(tipBi), tipBi);
  await ev("setFmt('mono','srt');1"); await wait(300);
  chk('切回单语又变回来',
    (await ev("document.getElementById('wrapTipEl').getAttribute('data-tip')")) === tipMono);

  console.log('--- ④ 任务条下方那句提醒 ---');
  chk('默认是藏着的', (await ev("document.getElementById('pgBusy').hidden")) === true);
  await ev("pgStart();1"); await wait(300);
  chk('开跑后露出来', (await ev("document.getElementById('pgBusy').hidden")) === false);
  const busyZh = await ev("document.getElementById('pgBusy').textContent");
  chk('文案是「AI 算力紧张，等一会就出结果了」', busyZh === 'AI 算力紧张，等一会就出结果了', busyZh);
  chk('任务条这时也是显示状态', (await ev("document.getElementById('progWrap').classList.contains('show')")) === true);
  chk('它不抢进度信息的注意力（灰字，不是强调色）',
    (await ev("getComputedStyle(document.getElementById('pgBusy')).color")) !== (await ev("getComputedStyle(document.getElementById('pgPct')).color")),
    await ev("getComputedStyle(document.getElementById('pgBusy')).color"));

  console.log('--- ⑤ 收工 / 停掉都要摘掉，不能挂着 ---');
  await ev("pgFinish();1"); await wait(200);
  chk('跑完就摘（完成态）', (await ev("document.getElementById('pgBusy').hidden")) === true);
  await ev("pgStart();1"); await wait(100);
  chk('再开一轮又出来', (await ev("document.getElementById('pgBusy').hidden")) === false);
  await ev("setProg(0,false);1"); await wait(200);
  chk('任务条收起时一并摘掉', (await ev("document.getElementById('pgBusy').hidden")) === true);
  await ev("pgStart();1"); await wait(100);
  await ev("(function(){var w=document.getElementById('progWrap');w.classList.add('show');pgFinish();})();1"); await wait(200);
  chk('排队超时那条路也摘（完成态不留半句）', (await ev("document.getElementById('pgBusy').hidden")) === true);

  console.log('--- ⑥ 界面语言：27 语都得有，且不能只剩中文 ---');
  const langs = await ev("JSON.stringify(UI_LANGS.map(function(p){return p[0];}))");
  const langList = JSON.parse(langs);
  let miss = [], han = [];
  for (const lg of langList) {
    await ev("(function(){var u=document.getElementById('uiLang');u.value='" + lg + "';u.dispatchEvent(new Event('change'));})();1");
    await wait(60);
    const tx = await ev("document.getElementById('pgBusy').textContent");
    if (!tx) miss.push(lg);
    else if (lg !== 'zh-CN' && lg !== 'zh-TW' && lg !== 'ja' && /[\u4e00-\u9fff]/.test(tx)) han.push(lg + ':' + tx);
  }
  chk('27 语全都有文案（页面渲染层）', miss.length === 0, miss.join(','));
  chk('非中日韩语言里没有汉字残留', han.length === 0, han.join(' | '));
  await ev("(function(){var u=document.getElementById('uiLang');u.value='en';u.dispatchEvent(new Event('change'));})();1");
  await wait(120);
  chk('英文版那句是英文',
    (await ev("document.getElementById('pgBusy').textContent")) === 'AI capacity is tight right now — your results will be ready in a moment',
    await ev("document.getElementById('pgBusy').textContent"));
  /* 英文界面下也不能把折行说明漏回中文（data-tip 走 applyTipI18n） */
  const tipEn = await ev("document.getElementById('wrapTipEl').getAttribute('data-tip')");
  chk('英文界面下 ⓘ 说明也是英文', !/[\u4e00-\u9fff]/.test(tipEn), tipEn);

  /* ---------- 截图 ---------- */
  if (SHOT) {
    await ev("(function(){var u=document.getElementById('uiLang');u.value='zh-CN';u.dispatchEvent(new Event('change'));})();1");
    await wait(300);
    async function shot(name, expr) {
      const r = await ev(expr);
      const box = JSON.parse(r);
      const img = await send('Page.captureScreenshot', {
        format: 'png',
        clip: { x: Math.max(0, box.x - 10), y: Math.max(0, box.y - 90), width: box.width + 20, height: box.height + 100, scale: 2 }
      });
      fs.writeFileSync(BASE + '/297-' + name + '.png', Buffer.from(img.data, 'base64'));
      console.log('  [截图] 297-' + name + '.png');
    }
    await shot('panel', "JSON.stringify((function(){var a=document.querySelectorAll('aside.panel')[1].getBoundingClientRect();return {x:a.x,y:a.y,width:a.width,height:a.height};})())");
    /* 折行块的 ⓘ 浮层：先把浮层强制显形（headless 里 :hover / :focus 都不一定生效），
       只为看它的内容与位置有没有被面板裁掉 —— 真机上是悬停/聚焦唤出的（与另外 20 个 ⓘ 同一套机制）。 */
    await ev("(function(){var s=document.createElement('style');s.id='_tipForce';"
      + "s.textContent='#wrapTipEl::after{opacity:1!important;transform:translateY(0)!important}'"
      + "+'#wrapTipEl::before{opacity:1!important}';document.head.appendChild(s);})();1");
    await wait(400);
    await shot('wraptip', "JSON.stringify((function(){var e=document.getElementById('maxW').closest('.param-blk').getBoundingClientRect();return {x:e.x,y:e.y,width:e.width,height:e.height};})())");
    await ev("(function(){var s=document.getElementById('_tipForce');if(s)s.remove();})();1");
    /* 任务条（跑起来的样子） */
    await ev("setSrc('1\\n00:00:01,000 --> 00:00:03,000\\nHello\\n','a.srt');1"); await wait(400);
    await ev("pgStart();setProg(37,true);document.getElementById('prText').textContent='Batch 3/12';1"); await wait(400);
    await shot('running', "JSON.stringify((function(){var e=document.getElementById('progWrap').getBoundingClientRect();return {x:e.x,y:e.y,width:e.width,height:e.height};})())");
  }

  console.log('== ' + pass + ' 通过 / ' + fail + ' 失败 ==');
  chrome.kill('SIGKILL');
  process.exit(fail ? 1 : 0);
})();
