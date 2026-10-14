/* v0.9.307 真浏览器：体检参数行 —— 画面方向在最前、明显；行宽跟着方向联动；依据注释在下面 */
'use strict';
process.on('unhandledRejection', () => { });
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');
const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PORT = 9600 + Math.floor(Math.random() * 90);
const SRV = Number(process.env.SRV || 3517);
const wait = ms => new Promise(r => setTimeout(r, ms));
let ws, tid = 0; const pending = new Map();
function send(m, p) { const id = ++tid; ws.send(JSON.stringify({ id, method: m, params: p || {} })); return new Promise((res, rej) => { pending.set(id, { res, rej }); setTimeout(() => { if (pending.has(id)) { pending.delete(id); rej(new Error('timeout ' + m)); } }, 30000); }); }
async function ev(e) { const r = await send('Runtime.evaluate', { expression: e, returnByValue: true, awaitPromise: true }); if (r.exceptionDetails) throw new Error(r.exceptionDetails.text); return r.result.value; }
let P = 0, F = 0;
const ok = (c, n, x) => { console.log((c ? '  ✓ ' : '  ✗ ') + n + (x !== undefined ? '  [' + String(x).slice(0, 160) + ']' : '')); c ? P++ : F++; };

const SRT = [
  '1', '00:00:01,000 --> 00:00:02,800', 'This is sentence number one.', '',
  '2', '00:00:01,000 --> 00:00:02,800', '这是第一句话。', '',
  '3', '00:00:03,000 --> 00:00:04,800', 'This is sentence number two.', '',
  '4', '00:00:03,000 --> 00:00:04,800', '这是第二句话。', ''
].join('\n');

async function clipShot(file, sel, pad) {
  const info = JSON.parse(await ev(`JSON.stringify((function(){var e=document.querySelector('${sel}');if(!e)return null;e.scrollIntoView({block:'center'});var b=e.getBoundingClientRect();return {x:b.x,y:b.y+window.scrollY,w:b.width,h:b.height};})())`));
  if (!info) { console.log('  找不到 ' + sel); return; }
  await wait(600);
  const r = await send('Page.captureScreenshot', {
    format: 'png',
    clip: { x: Math.max(0, info.x - pad), y: Math.max(0, info.y - pad), width: Math.min(1440, info.w + pad * 2), height: Math.min(760, info.h + pad * 2), scale: 2 }
  });
  fs.writeFileSync(file, Buffer.from(r.data, 'base64'));
  console.log('  ' + file + '  ' + JSON.stringify(info));
}

/* 参数行的实测快照 */
const SNAP = `JSON.stringify((function(){
  var q=function(s){return document.querySelector(s)};
  var f=function(id){return q('[data-rule="'+id+'"]')};
  var segs=[].slice.call(document.querySelectorAll('#ruleRow .seg button'));
  var r0=q('#ruleRow [data-rule]').getBoundingClientRect(), d0=q('#ruleRow [data-dir="land"]').getBoundingClientRect();
  var cur=segs.filter(function(b){return b.getAttribute('aria-pressed')==='true'})[0];
  var note=q('#ruleRow .rnote');
  return {
    segs: segs.length,
    segTxt: segs.map(function(b){return b.textContent}).join('|'),
    segBg: cur?getComputedStyle(cur).backgroundColor:'',
    segColor: cur?getComputedStyle(cur).color:'',
    segH: cur?getComputedStyle(cur).height:'',
    dirFirst: d0.left < r0.left,
    land: f('minDur')?f('minDur').value:'',
    landScroll: f('minDur')?f('minDur').scrollWidth:0,
    landClient: f('minDur')?f('minDur').clientWidth:0,
    landClipped: f('minDur')?f('minDur').scrollWidth > f('minDur').clientWidth + 1:false,
    durMax: f('maxDur')?f('maxDur').value:'',
    cps: f('maxCps')?f('maxCps').value:'',
    line: f('maxLine')?f('maxLine').value:'',
    lk: (q('#ruleRow .lk')||{}).textContent||'',
    lkColor: q('#ruleRow .lk')?getComputedStyle(q('#ruleRow .lk')).color:'',
    note: note?note.textContent:'',
    noteW: note?Math.round(note.getBoundingClientRect().width):0,
    rowW: Math.round(q('#ruleRow').getBoundingClientRect().width),
    portrait: S.portrait, base: S.chkRules.maxLine
  };
})())`;

(async () => {
  const cr = spawn(CHROME, ['--headless=new', '--remote-debugging-port=' + PORT, '--no-sandbox', '--disable-gpu',
    '--host-resolver-rules=MAP * ~NOTFOUND, EXCLUDE 127.0.0.1',
    '--user-data-dir=/tmp/cr-shot307-' + Date.now(), 'about:blank'], { stdio: 'ignore' });
  let list = null;
  for (let i = 0; i < 30; i++) {
    try { list = await new Promise((res, rej) => { http.get({ host: '127.0.0.1', port: PORT, path: '/json/list' }, r => { let d = ''; r.on('data', c => d += c); r.on('end', () => res(d)); }).on('error', rej); }); if (list.includes('webSocketDebuggerUrl')) break; } catch (e) { }
    await wait(300);
  }
  ws = new WebSocket(JSON.parse(list).find(t => t.type === 'page').webSocketDebuggerUrl, { perMessageDeflate: false });
  await new Promise((res, rej) => { ws.on('open', res); ws.on('error', rej); });
  ws.on('message', d => { const m = JSON.parse(d); if (m.id && pending.has(m.id)) { pending.get(m.id).res(m.result || m); pending.delete(m.id); } });
  await send('Page.enable'); await send('Runtime.enable');
  await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1200, deviceScaleFactor: 2, mobile: false });
  await send('Page.navigate', { url: 'http://127.0.0.1:' + SRV + '/shift.html' });
  for (let i = 0; i < 60; i++) { try { if ((await ev('document.readyState')) === 'complete') break; } catch (e) { } await wait(400); }
  await wait(1200);

  await ev('setSrc(' + JSON.stringify(SRT) + ', "bil.srt")');
  await wait(300);
  await ev("$('#btnGo').click()");
  await wait(900);

  console.log('— 横屏（默认）—');
  const A = JSON.parse(await ev(SNAP));
  ok(A.dirFirst, '画面方向排在四个参数前面（左边）', 'dirLeft<paramLeft=' + A.dirFirst);
  ok(A.segs === 2, '做成了两格分段控件', A.segs);
  ok(A.segTxt.indexOf('横屏') >= 0 && A.segTxt.indexOf('竖屏') >= 0, '两格是横屏 / 竖屏', A.segTxt);
  ok(A.segBg === 'rgb(79, 70, 229)', '选中格实心主色（显眼）', A.segBg);
  ok(A.segColor === 'rgb(255, 255, 255)', '选中格文字白色（对比够）', A.segColor);
  ok(A.segH === '30px', '按钮高 30px，跟参数框同高', A.segH);
  ok(A.line === '21', '横屏行宽 = 基线 21', A.line);
  ok(A.lk === '', '横屏不显示 ×0.6 标记', JSON.stringify(A.lk));
  ok(A.note.indexOf('Netflix') >= 0, '参数下面有依据注释（说了从哪来）', A.note.slice(0, 60) + '…');
  ok(A.note.indexOf('21') >= 0 && A.note.indexOf('13') >= 0, '注释里写清换算关系（横屏 21 字 → 竖屏 13 字）');
  ok(A.noteW > A.rowW * 0.8, '注释独占一整行', A.noteW + ' / ' + A.rowW);
  /* 框要装得下「0.833」—— 78px 时被截成「0.8」，用户会以为值就是 0.8 */
  ok(A.landClipped === false, '最短停留框没把 0.833 截断', 'scrollW=' + A.landScroll + ' clientW=' + A.landClient);
  await clipShot('/tmp/s307-land.png', '#ruleRow', 10);

  console.log('— 点「竖屏」—');
  await ev("document.querySelector('#ruleRow [data-dir=\"port\"]').click()");
  await wait(700);
  const B = JSON.parse(await ev(SNAP));
  ok(B.portrait === true && B.land === A.land, '切到竖屏了', B.portrait);
  ok(B.line === '13', '行宽跟着方向联动：21 → 13', B.line);
  ok(B.lk === '×0.6', '框旁边标出 ×0.6（免得以为框自己变了）', B.lk);
  ok(B.note === A.note && B.note.indexOf('13') >= 0, '注释两个方向都成立（讲的是换算关系，不是当前值）');
  ok(B.durMax === A.durMax && B.cps === A.cps && B.land === A.land,
    '停留与读速不动（跟画面横竖无关）', B.land + '/' + B.durMax + '/' + B.cps);
  await clipShot('/tmp/s307-port.png', '#ruleRow', 10);

  console.log('— 竖屏下改行宽：反算回基线 —');
  await ev("(function(){var b=document.querySelector('[data-rule=\"maxLine\"]');b.value='20';b.dispatchEvent(new Event('change',{bubbles:true}));})()");
  await wait(700);
  const C1 = JSON.parse(await ev(SNAP));
  ok(C1.base === '33', '竖屏填 20 → 基线存 33（20 / 0.6）', C1.base);
  ok(C1.line === '20', '框里还是 20（不回跳）', C1.line);
  await ev("document.querySelector('#ruleRow [data-dir=\"land\"]').click()");
  await wait(700);
  const D = JSON.parse(await ev(SNAP));
  ok(D.line === '33', '切回横屏看到的是基线 33', D.line);
  ok(D.lk === '', '横屏没有 ×0.6 标记', JSON.stringify(D.lk));

  console.log('— 语言切换后注释还在（不在 applyI18n 里丢）—');
  await ev("(function(){var s=document.querySelector('#langSel');if(s){s.value='en';s.dispatchEvent(new Event('change',{bubbles:true}));}})()");
  await wait(800);
  const E = JSON.parse(await ev(SNAP));
  ok(E.note.indexOf('Netflix') >= 0, 'en 的注释也带 Netflix');
  ok(/[A-Za-z]/.test(E.note) && E.note.indexOf('默认值') < 0, 'en 注释不是中文（词条真的换了）', E.note.slice(0, 70));
  ok(E.segTxt.indexOf('Portrait') >= 0, 'en 的分段控件是 Portrait / Landscape', E.segTxt);
  await clipShot('/tmp/s307-en.png', '#ruleRow', 10);

  console.log('\n_live307: ' + P + ' 通过 / ' + F + ' 失败');
  ws.close(); cr.kill(); process.exit(F ? 1 : 0);
})().catch(e => { console.error('崩了', e.message); process.exit(1); });
