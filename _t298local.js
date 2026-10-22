/* v0.9.298 本地全链路实测：
   ① btnCopy 点击 → reportEvent('copy') 真的发出去（sendBeacon 捕获 body，ev/fmt 对）
   ② 服务端 /api/event 白名单：copy 200、乱值 400；BYOK 轻量记录 copies=1 落盘
   ③ 宽心话挪进 pg-row（prText 之后、eta 之前）、上 --tr-ink、pgBusy 开关照常 */
'use strict';
process.on('unhandledRejection', e => { console.log('UNHANDLED', e && e.message); });
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');
const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PORT = 9400 + Math.floor(Math.random() * 90);
const SRV = 3210;
const wait = ms => new Promise(r => setTimeout(r, ms));
let PASS = 0, FAIL = 0, ws, tid = 0;
const pending = new Map();
const ok = (c, n, x) => { console.log((c ? '  ✓ ' : '  ✗ ') + n + (x !== undefined ? '  [' + String(x).slice(0, 160) + ']' : '')); c ? PASS++ : FAIL++; };
function send(m, p) {
  const id = ++tid; ws.send(JSON.stringify({ id, method: m, params: p || {} }));
  return new Promise((res, rej) => { pending.set(id, { res, rej }); setTimeout(() => { if (pending.has(id)) { pending.delete(id); rej(new Error('timeout ' + m)); } }, 30000); });
}
async function ev(e) {
  const r = await send('Runtime.evaluate', { expression: e, returnByValue: true, awaitPromise: true });
  if (r.exceptionDetails) throw new Error(r.exceptionDetails.text + ' ' + JSON.stringify(r.exceptionDetails.exception || '').slice(0, 120));
  return r.result.value;
}
async function main() {
  /* 起 Chrome（本地直连，外部域名全断：AdSense/GA 秒失败不拖渲染） */
  const cr = spawn(CHROME, ['--headless=new', '--remote-debugging-port=' + PORT, '--no-sandbox', '--disable-gpu',
    '--host-resolver-rules=MAP * ~NOTFOUND, EXCLUDE 127.0.0.1',
    '--user-data-dir=/tmp/cr-298-' + Date.now(), 'about:blank'], { stdio: 'ignore' });
  let list = null;
  for (let i = 0; i < 30; i++) { try { list = await new Promise((res, rej) => { http.get({ host: '127.0.0.1', port: PORT, path: '/json/list' }, r => { let d = ''; r.on('data', c => d += c); r.on('end', () => res(d)); }).on('error', rej); }); if (list.includes('webSocketDebuggerUrl')) break; } catch (e) { } await wait(300); }
  const target = JSON.parse(list).find(t => t.type === 'page');
  ws = new WebSocket(target.webSocketDebuggerUrl, { perMessageDeflate: false });
  await new Promise((res, rej) => { ws.on('open', res); ws.on('error', rej); });
  ws.on('message', d => { const m = JSON.parse(d); if (m.id && pending.has(m.id)) { pending.get(m.id).res(m.result || m); pending.delete(m.id); } });
  await send('Page.enable'); await send('Runtime.enable');
  await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
  await send('Browser.grantPermissions', { permissions: ['clipboardReadWrite', 'clipboardSanitizedWrite'] });

  /* ① DIAG：页面真的加载对了 */
  await send('Page.navigate', { url: 'http://127.0.0.1:' + SRV + '/translate.html' });
  for (let i = 0; i < 60; i++) { try { if (await ev('document.readyState') === 'complete') break; } catch (e) { } await wait(400); }
  await wait(2500);
  const diag = await ev('JSON.stringify({href:location.href,hasSetSrc:typeof setSrc,hasReport:typeof reportEvent,rows:S.rows.length})');
  const D = JSON.parse(diag);
  ok(D.href.includes('translate.html'), '页面在本机服务上', D.href);
  ok(D.hasSetSrc === 'function' && D.hasReport === 'function', '引擎与上报函数在位');

  /* ② 注入字幕 + 手工补 trMeta（等价于「翻译已完成」的时刻） */
  await ev(`setSrc('1\\n00:00:01,000 --> 00:00:03,000\\n你好世界\\n','demo.srt')`);
  await ev(`S.trMeta={file:'demo.srt',lang:'en',model:'',taskId:'t298',src:''};S.taskId='t298'`);
  ok(await ev('S.rows.length') > 0, '字幕已注入');

  /* ③ 捕获 sendBeacon，点复制 */
  await ev(`window.__cap=[];navigator.sendBeacon=(u,b)=>{b.text().then(t=>__cap.push([u,t]));return true;}`);
  await ev(`$('btnCopy').click()`);
  await wait(900);
  const cap = JSON.parse(await ev('JSON.stringify(window.__cap)'));
  const copyEv = cap.find(x => x[0] === '/api/event' && x[1].includes('"copy"'));
  ok(!!copyEv, '点击复制真的发出了 copy 事件', cap.length + ' 条捕获');
  if (copyEv) {
    const b = JSON.parse(copyEv[1]);
    ok(b.ev === 'copy', 'ev=copy', b.ev);
    ok(b.fmt === 'srt', 'fmt 跟着导出格式走', b.fmt);
    ok(b.file === 'demo.srt' && b.taskId === 't298', 'file/taskId 对', b.file + '/' + b.taskId);
  }

  /* ④ 服务端白名单：copy 200 / 乱值 400；BYOK 轻量记录落盘（taskId 用唯一值防上轮残留连账） */
  const TID = 't298x' + Date.now();
  const rc = JSON.parse(await ev(`(async()=>{
    const r1=await fetch('/api/event',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({file:'demo.srt',lang:'en',model:'test-model',ev:'copy',fmt:'srt',taskId:'${TID}'})});
    const r2=await fetch('/api/event',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({file:'x',lang:'en',ev:'bogus'})});
    return JSON.stringify({copy:r1.status,bogus:r2.status});})()`));
  ok(rc.copy === 200, '服务端放行 copy（200）', rc.copy);
  ok(rc.bogus === 400, '乱值仍被拒（400）', rc.bogus);
  const db = JSON.parse(fs.readFileSync('data/events.json', 'utf8'));
  const rec = db.events.reverse().find(e => e.taskId === TID);
  ok(!!rec && rec.copies === 1 && !!rec.copiedAt && rec.byok === true, 'BYOK 轻量记录 copies=1 落盘', rec ? JSON.stringify({ copies: rec.copies, byok: !!rec.byok }) : '无记录');

  /* ⑤ 宽心话：位置 + 颜色 + 开关（先把任务条挂出来，否则整块 display:none 全是 0 矩形；
     prText 填真实批进度文本，还原「跑起来」时的行宽） */
  const vis = JSON.parse(await ev(`(async()=>{
    const q=s=>document.querySelector(s), r=e=>{const b=e.getBoundingClientRect();return {x:b.x,y:b.y,w:b.width,h:b.height}};
    document.querySelector('#progWrap').classList.add('show');
    q('#prText').textContent='第 1/1 批（句组 1–8）…';
    const busy=q('#pgBusy'), pr=q('#prText'), eta=q('#pgEta'), prog=q('#prog');
    const out={hidden0:busy.hidden};
    pgBusy(true); await new Promise(r2=>setTimeout(r2,120));
    const rb=r(busy), rp=r(pr), re=r(eta), rg=r(prog);
    const cs=getComputedStyle(busy);
    Object.assign(out,{hidden1:busy.hidden,color:cs.color,tag:busy.tagName,
      sameRow:Math.abs(rb.y-rp.y)<8, afterPr:rb.x>rp.x, beforeEta:rb.x<re.x,
      aboveProg:rb.y<rg.y, inRow:!!busy.closest('.pg-row'), i18n:busy.getAttribute('data-i18n'),
      txt:busy.textContent.trim()});
    pgBusy(false); await new Promise(r2=>setTimeout(r2,120));
    out.hidden2=busy.hidden;
    return JSON.stringify(out);})()`));
  ok(vis.hidden0 === true && vis.hidden1 === false && vis.hidden2 === true, 'pgBusy 三处开关照常（默认藏/跑时现/收工藏）', vis.hidden0 + '/' + vis.hidden1 + '/' + vis.hidden2);
  ok(vis.tag === 'SPAN' && vis.inRow, '已经是 pg-row 里的行内 span', vis.tag);
  ok(vis.sameRow && vis.afterPr && vis.beforeEta, '跟在「第 x/y 批」后面、ETA 之前、同一行', 'sameRow=' + vis.sameRow + ' afterPr=' + vis.afterPr + ' beforeEta=' + vis.beforeEta);
  ok(vis.aboveProg, '还在进度条上方（不再压在条下面）');
  ok(vis.color === 'rgb(192, 33, 89)', '颜色=品牌粉 --tr-ink #C02159', vis.color);
  ok(vis.i18n === 'pgBusyTip' && vis.txt.length > 0, 'data-i18n 接线没丢', vis.i18n + ' / ' + vis.txt);

  console.log('---- ' + PASS + ' 通过 / ' + FAIL + ' 失败 ----');
  cr.kill();
  process.exit(FAIL ? 1 : 0);
}
main().catch(e => { console.log('FATAL', e.message); process.exit(2); });
