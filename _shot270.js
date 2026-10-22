/* v0.9.270 出图：主站字幕区编辑态（时间轴工具栏 + 正在编辑的时间码 + 重叠提示 + 状态条） */
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');
const http = require('http'), fs = require('fs');
const PORT = 9333, BASE = 'http://127.0.0.1:3098';
const OUT = '/Users/jp/WorkBuddy/2026-09-04-00-29-54/ui-redesign/v270-edit-inline.png';
const wait = ms => new Promise(r => setTimeout(r, ms));
const J = p => new Promise((res, rej) => { const r = http.request({ host: '127.0.0.1', port: PORT, path: p, method: 'PUT' }, x => { let d = ''; x.on('data', c => d += c); x.on('end', () => { try { res(JSON.parse(d)); } catch (e) { rej(new Error(d.slice(0, 200))); } }); }); r.on('error', rej); r.end(); });
const NL = String.fromCharCode(10);
const b64 = s => Buffer.from(s, 'utf8').toString('base64');
const SRT = ['1', '00:00:01,000 --> 00:00:03,000', 'Good morning, everyone.', '',
  '2', '00:00:04,000 --> 00:00:06,000', 'Today we are going to talk about something important.', '',
  '3', '00:00:07,000 --> 00:00:09,000', 'Wait, really?', '',
  '4', '00:00:10,000 --> 00:00:13,000', 'Thanks for watching.', ''].join(NL);

(async () => {
  const v = await J('/json/new?' + encodeURIComponent('about:blank'));
  const ws = new WebSocket(v.webSocketDebuggerUrl, { perMessageDeflate: false });
  let id = 0; const wt = new Map();
  await new Promise(r => ws.on('open', r));
  ws.on('message', m => { const g = JSON.parse(m); if (g.id && wt.has(g.id)) { const q = wt.get(g.id); wt.delete(g.id); g.error ? q.rej(new Error(JSON.stringify(g.error))) : q.res(g.result); } });
  const send = (m, p) => new Promise((res, rej) => { const i = ++id; wt.set(i, { res, rej }); ws.send(JSON.stringify({ id: i, method: m, params: p || {} })); });
  const ev = async e => { const r = await send('Runtime.evaluate', { expression: e, returnByValue: true, awaitPromise: true });
    if (r.exceptionDetails) throw new Error((r.exceptionDetails.exception || {}).description || r.exceptionDetails.text); return r.result.value; };
  await send('Page.enable'); await send('Runtime.enable');
  await send('Network.setCacheDisabled', { cacheDisabled: true });
  await send('Emulation.setDeviceMetricsOverride', { width: 1360, height: 1000, deviceScaleFactor: 2, mobile: false });
  await send('Page.navigate', { url: BASE + '/index.html' });
  await wait(3000);

  await ev(`localStorage.removeItem('srt_edit_v1')`);
  await ev(`setSrc(decodeURIComponent(escape(atob(${JSON.stringify(b64(SRT))}))), 'demo.srt');`);
  await ev(`S.rows.forEach(function(r,i){ r.zh=['大家早上好。','今天我们要聊一件重要的事。','真的吗？','感谢观看。'][i]; });`);
  await ev(`UI.lang='zh-CN'; applyI18n();`);
  await wait(300);
  /* 第 1 行：改过的时间轴（粉点） */
  await ev(`(function(){var g=document.querySelectorAll('#rows .cuegrid')[0];var tc=g.querySelector('.tc');tc.click();
    var ins=document.querySelectorAll('#rows .tc-in input');ins[0].value='00:00:01,400';ins[1].value='00:00:03,200';
    ins[1].dispatchEvent(new KeyboardEvent('keydown',{key:'Enter',bubbles:true}));})()`);
  await wait(300);
  /* 第 3 行：与第 2 行重叠 → 挂提示条 */
  await ev(`(function(){var g=document.querySelectorAll('#rows .cuegrid')[2];var tc=g.querySelector('.tc');tc.click();
    var ins=document.querySelectorAll('#rows .tc-in input');ins[0].value='00:00:05,000';ins[1].value='00:00:08,000';
    ins[1].dispatchEvent(new KeyboardEvent('keydown',{key:'Enter',bubbles:true}));})()`);
  await wait(400);
  /* 第 2 行：正开着时间码编辑框（OV_ROW 挂在它下面，两个状态一眼看全） */
  await ev(`(function(){var g=document.querySelectorAll('#rows .cuegrid')[1];var tc=g.querySelector('.tc');if(tc) tc.click();})()`);
  await wait(400);
  /* ⚠️ 不能用 block:'start'：顶部 appbar（含公告条 #ticker）会盖住工具栏，
     对齐到视口顶部后截出来只剩顶部状态条。居中即可，clip 仍用文档坐标。 */
  /* ⚠️ 别滚动：这一版页面短，滚下去工具栏正好停在视口顶部被 sticky appbar 压住（纯取景问题）。
     停在页面顶部、让 clip 用文档坐标去取，才是干净的一张。 */
  await ev(`window.scrollTo(0,0)`);
  await wait(400);

  console.log('scrollY =', await ev(`window.scrollY`));
  console.log('tcBar display =', await ev(`getComputedStyle(document.getElementById('tcBar')).display`));
  const rect = await ev(`JSON.stringify((function(){
    var e=document.querySelector('.tc-bar'); if(!e) return null;
    var b=e.getBoundingClientRect();
    var l=document.querySelector('.lst');
    var lb=l.getBoundingClientRect();
    return {x:Math.max(0,Math.min(b.x,lb.x)+window.scrollX-8),
            y:Math.max(0,Math.min(b.y,lb.y)+window.scrollY-8),
            w:Math.min(780, Math.max(b.width,lb.width)+16),
            h:(lb.bottom-b.top)+56};   /* 让底部的编辑状态条（ed-bar）也进画面 */
  })())`);
  const r = JSON.parse(rect);
  console.log('clip =', JSON.stringify(r));
  const shot = await send('Page.captureScreenshot', { format: 'png', clip: { x: r.x, y: r.y, width: r.w, height: r.h, scale: 1 } });
  fs.writeFileSync(OUT, Buffer.from(shot.data, 'base64'));
  console.log('已出图:', OUT, fs.statSync(OUT).size + 'B');
  process.exit(0);
})().catch(e => { console.error('FATAL', e.message); process.exit(2); });
