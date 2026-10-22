/* _shots323.js —— v0.9.323 指南页截图（非交付件）
   shift 工具页五个区域，en / zh-CN 两套界面语言：
     shift-upload       上传区（已载入示例字幕）
     shift-step-shift   步骤区 · 整体平移（S7）
     shift-step-rate    步骤区 · 倍率缩放（S8 帧率 / S9 倍速）
     shift-step-two     步骤区 · 两点校正（U2 / B1）
     shift-result       结果区（跑完一次平移后的导出卡）
   铁律：截图里不打一个字 —— 图上零标注，文字全放 HTML 图注（数据文件里翻译）。
   界面语言只出 en + zh-CN 两套，其余 25 语共用 en 版。 */
'use strict';
process.on('unhandledRejection', e => { console.log('UNHANDLED', e && e.message); });
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');
const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const ROOT = '/Users/jp/WorkBuddy/2026-09-04-00-29-54/srt-translator';
const OUT = ROOT + '/img/guides';
const SRV = 3950 + Math.floor(Math.random() * 30);
const PORT = 9985 + Math.floor(Math.random() * 10);
const wait = ms => new Promise(r => setTimeout(r, ms));
try { fs.mkdirSync(OUT, { recursive: true }); } catch (e) { }

const srv = spawn(process.execPath, ['server.js'], {
  cwd: ROOT, env: Object.assign({}, process.env, { PORT: String(SRV), PUBLIC_URL: 'http://127.0.0.1:' + SRV }), stdio: 'ignore'
});
let ws, tid = 0; const pending = new Map();
function send(m, p) {
  const id = ++tid; ws.send(JSON.stringify({ id, method: m, params: p || {} }));
  return new Promise((res, rej) => { pending.set(id, { res, rej }); setTimeout(() => { if (pending.has(id)) { pending.delete(id); rej(new Error('timeout ' + m)); } }, 30000); });
}
async function ev(e) {
  const r = await send('Runtime.evaluate', { expression: e, returnByValue: true, awaitPromise: true });
  if (r.exceptionDetails) throw new Error(r.exceptionDetails.text + ' :: ' + e.slice(0, 80));
  return r.result.value;
}
async function shotEl(name, sel) {
  /* ⚠️ 先滚进视口再量再截：实测 clip 超出视口高度的部分截出来是空白
     （repCard 在折叠线以下时全白图）。滚到中间，等一拍重排稳定。 */
  await ev('(function(){var e=document.querySelector("' + sel + '");if(e)e.scrollIntoView({block:"center"})})()');
  await wait(250);
  const box = await ev('(function(){var e=document.querySelector("' + sel + '");if(!e)return null;var r=e.getBoundingClientRect();return {x:r.x+window.scrollX,y:r.y+window.scrollY,w:r.width,h:r.height}})()');
  if (!box) { console.log('  !! 找不到 ' + sel); return; }
  console.log('  [' + name + '] box=' + JSON.stringify(box));
  const r = await send('Page.captureScreenshot', {
    format: 'png',
    clip: { x: Math.max(0, box.x - 8), y: Math.max(0, box.y - 8), width: box.w + 16, height: box.h + 16, scale: 2 }
  });
  fs.writeFileSync(OUT + '/' + name, Buffer.from(r.data, 'base64'));
  console.log('  写出 ' + name);
}
/* 页面驱动：加工序 → 填参数 → 重渲染（走页面自己的函数，不另造一套） */
async function addStep(id, vals) {
  await ev('(function(){document.getElementById("addSel").value="' + id + '";addStep()})()');
  if (vals && vals.length) {
    await ev('(function(){S.steps[S.steps.length-1].v=[' + vals.map(v => JSON.stringify(v)).join(',') + '];renderSteps()})()');
  }
}
async function clearSteps() {
  await ev('(function(){S.steps=[];S.ops=[];renderSteps()})()');
}

(async () => {
  await wait(1500);
  /* 示例字幕：6 条、跨约 1 分钟（两点校正的「当前首末」要有一头一尾）。
     中文版给 zh-CN 界面、英文版给 en 界面 —— 文本跟着界面语言走，图更像真实使用 */
  const SRT_ZH = [
    '1', '00:00:02,000 --> 00:00:04,500', '这是一份时间轴示例', '',
    '2', '00:00:05,000 --> 00:00:08,000', '整体提前或延后一秒半', '',
    '3', '00:00:12,300 --> 00:00:15,000', '也可以按倍率缩放', '',
    '4', '00:00:20,000 --> 00:00:23,400', '不知道比例就用两点校正', '',
    '5', '00:00:41,000 --> 00:00:44,000', '工序从上往下依次作用', '',
    '6', '00:01:02,000 --> 00:01:04,000', '改任何一步都从原始字幕重算', '', ''
  ].join('\n');
  const SRT_EN = [
    '1', '00:00:02,000 --> 00:00:04,500', 'This is a timing sample', '',
    '2', '00:00:05,000 --> 00:00:08,000', 'Move every cue earlier or later', '',
    '3', '00:00:12,300 --> 00:00:15,000', 'Or scale the whole timeline', '',
    '4', '00:00:20,000 --> 00:00:23,400', 'Two anchors fix unknown drift', '',
    '5', '00:00:41,000 --> 00:00:44,000', 'Steps apply from top to bottom', '',
    '6', '00:01:02,000 --> 00:01:04,000', 'Every edit replays from the source', '', ''
  ].join('\n');

  const chrome = spawn(CHROME, ['--headless=new', '--remote-debugging-port=' + PORT, '--no-sandbox', '--disable-gpu',
    '--host-resolver-rules=MAP * ~NOTFOUND, EXCLUDE 127.0.0.1',
    '--lang=zh-CN', '--user-data-dir=/tmp/crshot323-' + Date.now(), 'about:blank'], { stdio: 'ignore' });
  await wait(2000);
  let tgt = null;
  for (let i = 0; i < 30 && !tgt; i++) {
    try {
      const r = await new Promise((res, rej) => { const q = http.get({ host: '127.0.0.1', port: PORT, path: '/json/list' }, s => { let d = ''; s.on('data', c => d += c); s.on('end', () => res(JSON.parse(d))); }); q.on('error', rej); q.setTimeout(2000, () => q.destroy(new Error('t'))); });
      tgt = (r || []).find(t => t.type === 'page');
    } catch (e) { await wait(500); }
  }
  if (!tgt) { console.log('浏览器没起来'); process.exit(2); }
  ws = new WebSocket(tgt.webSocketDebuggerUrl, { perMessageDeflate: false });
  await new Promise((r, j) => { ws.on('open', r); ws.on('error', j); });
  ws.on('message', d => { const m = JSON.parse(d); if (m.id && pending.has(m.id)) { pending.get(m.id).res(m.result || m); pending.delete(m.id); } });
  await send('Page.enable'); await send('Runtime.enable'); await send('DOM.enable');
  await send('Emulation.setDeviceMetricsOverride', { width: 1180, height: 1500, deviceScaleFactor: 2, mobile: false });

  for (const [ui, srt, prefix] of [['zh-CN', SRT_ZH, ''], ['en', SRT_EN, '/en']]) {
    console.log('— 界面语言 ' + ui + ' —');
    await send('Page.navigate', { url: 'http://127.0.0.1:' + SRV + prefix + '/shift.html' });
    for (let i = 0; i < 60; i++) {
      try { const st = await ev('document.readyState + "|" + (typeof window.setSrc)'); if (st.indexOf('complete') === 0 && st.indexOf('function') > 0) break; } catch (e) { }
      await wait(200);
    }
    await wait(600);
    await ev('window.setSrc(' + JSON.stringify(srt) + ', "demo.srt")');
    await wait(500);

    /* ① 上传区 */
    await shotEl('shift-upload.' + ui + '.png', '#upCard');

    /* ② 平移工序（S7：字幕晚 1.5 秒 → 提前） */
    await clearSteps();
    await addStep('shift', ['-1.5']);
    await wait(300);
    await shotEl('shift-step-shift.' + ui + '.png', '#optCard');

    /* ③ 倍率工序（S8：24fps 片子按 25fps 播 → ×0.96；S9 倍速同理） */
    await clearSteps();
    await addStep('rate', ['0.96']);
    await wait(300);
    await shotEl('shift-step-rate.' + ui + '.png', '#optCard');

    /* ④ 两点校正（当前两栏页面已自动填，目标两栏演示漂移越到后面越大） */
    await clearSteps();
    await addStep('two', []);
    /* addStep 里 fillCurrentTimes 只在 base 有货时填 —— 上面 setSrc 已有货；
       目标首 = 00:00:02,600（晚 0.6s），目标末 = 00:01:04,800（晚 0.8s+漂移） */
    await ev('(function(){var t=S.steps[S.steps.length-1];t.v[2]="00:00:02,600";t.v[3]="00:01:04,800";renderSteps()})()');
    await wait(300);
    await shotEl('shift-step-two.' + ui + '.png', '#optCard');

    /* ⑤ 结果区：换回平移 -1.5s 跑一遍 */
    await clearSteps();
    await addStep('shift', ['-1.5']);
    await ev('window.runShift()');
    await wait(700);
    console.log('  repCard: ' + await ev('(function(){var e=document.getElementById("repCard");var r=e.getBoundingClientRect();return JSON.stringify([r.x+window.scrollX,r.y+window.scrollY,r.width,r.height,getComputedStyle(e).display,document.getElementById("parts").innerHTML.length])})()'));
    await shotEl('shift-result.' + ui + '.png', '#repCard');
    const langChk = await ev('document.documentElement.lang');
    console.log('  html lang = ' + langChk);
  }

  srv.kill(); chrome.kill();
  process.exit(0);
})();
