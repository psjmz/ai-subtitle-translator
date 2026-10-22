/* _chk319txt.js —— v0.9.319 翻译页两处文案改动的真浏览器验收（非交付件）
   ① 任务条那句：因AI算力紧张，请你耐心等几分钟^^（HTML 默认 + zh-CN 词典同文案，
      显示出来不撑破任务条）；② 赞助按钮：🌹工具不错，支持网站运营❤️（按钮默认 + 点开再收起还原，
      emoji 真渲染、不溢出右栏）；③ 回归：切英文界面那句仍是英文（27 语没被改坏）。 */
'use strict';
process.on('unhandledRejection', e => { console.log('UNHANDLED', e && e.message); });
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');
const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const ROOT = '/Users/jp/WorkBuddy/2026-09-04-00-29-54/srt-translator';
const OUT = '/Users/jp/WorkBuddy/2026-09-04-00-29-54/outputs-319';
const SRV = 3700 + Math.floor(Math.random() * 60);
const PORT = 9940 + Math.floor(Math.random() * 60);
const TIP = '因AI算力紧张，请你耐心等几分钟^^';
const DON = '🌹工具不错，支持网站运营❤️';
const wait = ms => new Promise(r => setTimeout(r, ms));
const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8' };
const srv = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  const m = p.match(/^\/[a-zA-Z]{2,3}(?:-[a-zA-Z]{2,4})?\/(.+)$/);
  if (m && fs.existsSync(path.join(ROOT, m[1]))) p = '/' + m[1];
  const f = path.join(ROOT, p === '/' ? 'index.html' : p);
  fs.readFile(f, (e, d) => {
    if (e) { res.writeHead(404); res.end('nf'); return; }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream' });
    res.end(d);
  });
});
let ws, tid = 0; const pending = new Map();
function send(m, p) {
  const id = ++tid; ws.send(JSON.stringify({ id, method: m, params: p || {} }));
  return new Promise((res, rej) => { pending.set(id, { res, rej }); setTimeout(() => { if (pending.has(id)) { pending.delete(id); rej(new Error('timeout ' + m)); } }, 30000); });
}
async function ev(e) {
  const r = await send('Runtime.evaluate', { expression: e, returnByValue: true, awaitPromise: true });
  if (r.exceptionDetails) throw new Error(r.exceptionDetails.text + ' :: ' + (r.exceptionDetails.exception && r.exceptionDetails.exception.description || '').slice(0, 200));
  return r.result.value;
}
let P = 0, F = 0;
const ok = (c, n, x) => { console.log((c ? '  ✓ ' : '  ✗ ') + n + (x !== undefined ? '  [' + String(x).slice(0, 160) + ']' : '')); c ? P++ : F++; };
async function shot(expr, file) {
  const r = await ev(`(()=>{const b=(${expr}).getBoundingClientRect();return {x:Math.max(0,b.x-8+scrollX),y:Math.max(0,b.y-8+scrollY),w:b.width+16,h:b.height+16}})()`);
  const img = await send('Page.captureScreenshot', { format: 'png', clip: { x: r.x, y: r.y, width: r.w, height: r.h, scale: 2 } });
  fs.writeFileSync(file, Buffer.from(img.data, 'base64'));
}
(async () => {
  if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });
  await new Promise(r => srv.listen(SRV, '127.0.0.1', r));
  const chrome = spawn(CHROME, ['--headless=new', '--remote-debugging-port=' + PORT, '--no-sandbox', '--disable-gpu',
    '--host-resolver-rules=MAP * ~NOTFOUND, EXCLUDE 127.0.0.1',
    '--lang=zh-CN', '--user-data-dir=/tmp/crtxt319-' + Date.now(), 'about:blank'], { stdio: 'ignore' });
  await wait(2000);
  let tgt = null;
  for (let i = 0; i < 30 && !tgt; i++) {
    try {
      const r = await new Promise((res, rej) => { const q = http.get({ host: '127.0.0.1', port: PORT, path: '/json/list' }, s => { let d = ''; s.on('data', c => d += c); s.on('end', () => res(JSON.parse(d))); }); q.on('error', rej); q.setTimeout(2000, () => q.destroy(new Error('t'))); });
      tgt = (r || []).find(t => t.type === 'page');
    } catch (e) { await wait(500); }
  }
  if (!tgt) { console.log('浏览器没起来'); srv.close(); chrome.kill(); process.exit(2); }
  ws = new WebSocket(tgt.webSocketDebuggerUrl, { perMessageDeflate: false });
  await new Promise((r, j) => { ws.on('open', r); ws.on('error', j); });
  ws.on('message', d => { const m = JSON.parse(d); if (m.id && pending.has(m.id)) { pending.get(m.id).res(m.result || m); pending.delete(m.id); } });
  await send('Page.enable'); await send('Runtime.enable');
  await send('Emulation.setDeviceMetricsOverride', { width: 1280, height: 900, deviceScaleFactor: 1, mobile: false });
  async function go(url, probe) {
    await send('Page.navigate', { url });
    const tail = url.split('/').pop() || '';
    for (let i = 0; i < 60; i++) {
      try {
        const st = await ev('document.readyState + "|" + location.pathname + "|" + (' + (probe || 'true') + ')');
        if (st.indexOf('complete') === 0 && st.indexOf(tail) > 0) break;
      } catch (e) { }
      await wait(200);
    }
    await wait(1200);
  }

  console.log('== translate.html（zh-CN）==');
  await go('http://127.0.0.1:' + SRV + '/translate.html', '!!document.getElementById("viewWorkspace")');

  /* ① 任务条那句：先把隐藏链解开（pgBusy 的祖先可能也 hidden），再量 */
  /* ⚠️ 量之前必须让任务条真的显示：#progWrap 靠 .show 控制（默认不显示，量出来全是 0，
     溢出判据会假绿）。直接调页面自己的 setProg(42,true) + pgBusy(true)：纯 UI，不烧 API。 */
  await ev(`(()=>{try{setProg(42,true);pgBusy(true);document.getElementById('pgPct').textContent='42%';
    document.getElementById('prText').textContent='第 3/12 批';}catch(e){return String(e)}})()`);
  await wait(400);
  const t1 = await ev(`(()=>{const el=document.getElementById('pgBusy');if(!el)return{e:1};
    const dic=(window.SiteI18N&&window.SiteI18N.I18N&&window.SiteI18N.I18N['zh-CN']||{});
    return {txt:el.textContent, dic: dic.pgBusyTip, vis: getComputedStyle(el).display,
      shown: document.getElementById('progWrap').classList.contains('show')}})()`);
  ok(t1.shown === true, '任务条真的显示了（否则下面量宽全是 0，假绿）', t1.shown);
  ok(t1.txt === TIP, '任务条那句 = 新文案（HTML 默认）', t1.txt);
  ok(t1.dic === TIP, 'zh-CN 词典同文案（切界面语言不跳回旧句）', t1.dic);
  ok(t1.vis !== 'none', '解开 hidden 后真显示（[hidden] 守卫还在）', t1.vis);

  const t2 = await ev(`(()=>{const el=document.getElementById('pgBusy');
    const row=el.parentElement, main=row.parentElement;
    const r=el.getBoundingClientRect(), rr=row.getBoundingClientRect(), mr=main.getBoundingClientRect();
    return {w:Math.round(r.width),h:Math.round(r.height),rowW:Math.round(rr.width),mainW:Math.round(mr.width),
      over:Math.round(r.right-rr.right), rowScroll:row.scrollWidth, rowClient:row.clientWidth,
      mainScroll:main.scrollWidth, mainClient:main.clientWidth}})()`);
  ok(t2.over <= 1 && t2.rowScroll <= t2.rowClient + 1 && t2.mainScroll <= t2.mainClient + 1,
    '这句变长后没撑破任务条（不横向溢出）', JSON.stringify(t2));
  await shot('document.getElementById("pgBusy").parentElement.parentElement', OUT + '/txt319-pgbusy.png');

  /* ② 赞助按钮：文案 + emoji 渲染 + 点开再收起能还原 */
  const d1 = await ev(`(()=>{const t=document.getElementById('donateTxt');return {txt:t.textContent,w:Math.round(t.getBoundingClientRect().width)}})()`);
  ok(d1.txt === DON, '赞助按钮默认文案 = 新文案', d1.txt);
  ok(d1.w > 60, 'emoji 真渲染出来了（不是零宽/缺字形）', d1.w + 'px');
  const d2 = await ev(`(()=>{const b=document.getElementById('btnDonate'),t=document.getElementById('donateTxt');
    const r=b.getBoundingClientRect(),tr=t.getBoundingClientRect();const p=b.parentElement;
    return {btnW:Math.round(r.width),btnH:Math.round(r.height),txtW:Math.round(tr.width),
      over:Math.round(r.right-p.getBoundingClientRect().right),scroll:p.scrollWidth,client:p.clientWidth,
      lines:Math.round(tr.height/parseFloat(getComputedStyle(t).lineHeight||16))}})()`);
  ok(d2.over <= 1 && d2.scroll <= d2.client + 1, '赞助按钮不溢出右栏', JSON.stringify(d2));
  await shot('document.getElementById("btnDonate")', OUT + '/txt319-donate.png');

  const d3 = await ev(`(()=>{const b=document.getElementById('btnDonate');b.click();
    const a=document.getElementById('donateTxt').textContent;b.click();
    return {opened:a,back:document.getElementById('donateTxt').textContent}})()`);
  ok(d3.back === DON, '点开二维码再收起能还原成新文案（TXT_IDLE 跟着改了）', JSON.stringify(d3));

  /* ③ 窄屏（375）：文案变长 12→20 字，手机上不能把任务条撑出去 */
  await send('Emulation.setDeviceMetricsOverride', { width: 375, height: 812, deviceScaleFactor: 2, mobile: true });
  await wait(600);
  /* 先做对照：换成旧文案量一次 —— 好判断「撑破」是这次改文案引入的，还是工作台在 375 下本来如此 */
  const n0 = await ev(`(()=>{const el=document.getElementById('pgBusy');const old=el.textContent;
    el.textContent='AI 算力紧张，等一会就出结果了';
    const r=el.getBoundingClientRect(), row=el.parentElement, rr=row.getBoundingClientRect();
    const card=row.closest('.wt-col')||row.parentElement.parentElement;
    const o={w:Math.round(r.width),over:Math.round(r.right-rr.right),
      cardOver:card.scrollWidth-card.clientWidth,
      docOver:document.documentElement.scrollWidth-document.documentElement.clientWidth};
    el.textContent=old; return o})()`);
  console.log('    · 对照（旧文案）在 375 下：' + JSON.stringify(n0));
  const n1 = await ev(`(()=>{const el=document.getElementById('pgBusy');const row=el.parentElement;
    const r=el.getBoundingClientRect(), rr=row.getBoundingClientRect();
    const card=row.closest('.wt-col')||row.parentElement.parentElement;
    const cr=card.getBoundingClientRect();
    return {w:Math.round(r.width),over:Math.round(r.right-rr.right),
      rowScroll:row.scrollWidth,rowClient:row.clientWidth,
      cardScroll:card.scrollWidth,cardClient:card.clientWidth,
      docOver:document.documentElement.scrollWidth-document.documentElement.clientWidth}})()`);
  /* ⚠️ 别拿「页面不横滚」当判据：工作台是桌面三栏布局，375 宽下本来就横滚 301px（对照实验已证明，
     与本次改文案无关）。要判的是「新文案没有让情况变差」。 */
  ok(n1.rowScroll <= n1.rowClient + 1 && n1.cardScroll <= n1.cardClient + 1 && n1.docOver <= n0.docOver,
    '375 宽：任务条与卡片都不再被顶破（页面横滚与旧文案持平，属工作台本身）',
    JSON.stringify(n1) + ' vs 旧 ' + JSON.stringify(n0));
  /* 窄屏元素常落在横向滚动区外（工作台是三栏桌面布局）→ 先把视口滚到它身上，再拍整视口 */
  await ev(`(()=>{const el=document.getElementById('pgBusy').parentElement.parentElement;
    const r=el.getBoundingClientRect();window.scrollTo(Math.max(0,r.left+scrollX-12),Math.max(0,r.top+scrollY-90));return 1})()`);
  await wait(300);
  let im = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(OUT + '/txt319-pgbusy-375.png', Buffer.from(im.data, 'base64'));
  const n2 = await ev(`(()=>{const b=document.getElementById('btnDonate');const t=document.getElementById('donateTxt');
    const r=b.getBoundingClientRect(),tr=t.getBoundingClientRect(),p=b.parentElement;
    return {btnW:Math.round(r.width),txtW:Math.round(tr.width),over:Math.round(r.right-p.getBoundingClientRect().right),
      h:Math.round(r.height),scroll:p.scrollWidth,client:p.clientWidth,
      lines:Math.round(tr.height/parseFloat(getComputedStyle(t).lineHeight||16))}})()`);
  ok(n2.over <= 1 && n2.scroll <= n2.client + 1, '375 宽：赞助按钮不溢出右栏', JSON.stringify(n2));
  await ev(`(()=>{const el=document.getElementById('btnDonate');const r=el.getBoundingClientRect();
    window.scrollTo(Math.max(0,r.left+scrollX-12),Math.max(0,r.top+scrollY-90));return 1})()`);
  await wait(300);
  im = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(OUT + '/txt319-donate-375.png', Buffer.from(im.data, 'base64'));
  await send('Emulation.setDeviceMetricsOverride', { width: 1280, height: 900, deviceScaleFactor: 1, mobile: false });
  await wait(400);

  /* ④ 回归：切英文界面，那句仍是英文（27 语没被改坏） */
  await ev(`(()=>{const s=document.getElementById('uiLang');if(s){s.value='en';s.dispatchEvent(new Event('change'))}})()`);
  await wait(600);
  const e1 = await ev(`(()=>{const el=document.getElementById('pgBusy');return el?el.textContent:'NOEL'})()`);
  ok(e1.indexOf('capacity') >= 0 || e1.indexOf('AI') === 0, '切英文后那句仍是英文（词典未串味）', e1);

  /* ⑤ 英文版更长（实测比中文长一截）→ 窄屏上要靠 max-width:100% 兜住，这条证明那两行 CSS 不是白改的 */
  await send('Emulation.setDeviceMetricsOverride', { width: 375, height: 812, deviceScaleFactor: 2, mobile: true });
  await wait(500);
  const e2 = await ev(`(()=>{const el=document.getElementById('pgBusy');const row=el.parentElement;
    const r=el.getBoundingClientRect(), rr=row.getBoundingClientRect();
    const card=row.closest('.wt-col')||row.parentElement.parentElement;
    return {txt:el.textContent.slice(0,26),w:Math.round(r.width),h:Math.round(r.height),
      over:Math.round(r.right-rr.right),rowScroll:row.scrollWidth,rowClient:row.clientWidth,
      cardOver:card.scrollWidth-card.clientWidth,
      docOver:document.documentElement.scrollWidth-document.documentElement.clientWidth}})()`);
  ok(e2.over <= 1 && e2.rowScroll <= e2.rowClient + 1 && e2.cardOver <= 0 && e2.docOver <= n0.docOver,
    '375 宽 + 英文长译文：药丸仍没把任务条顶破（max-width 兜住了）', JSON.stringify(e2));
  await send('Emulation.setDeviceMetricsOverride', { width: 1280, height: 900, deviceScaleFactor: 1, mobile: false });
  await wait(400);

  console.log('\n_chk319txt: ' + P + '/' + (P + F) + ' OK, bad=' + F);
  srv.close(); chrome.kill(); process.exit(F ? 1 : 0);
})().catch(e => { console.log('FATAL', e && e.message); srv.close(); process.exit(2); });
