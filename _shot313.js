/* _shot313.js —— v0.9.313 真浏览器验证：videosub / hanconv 两个新工具页
   量：真实 MKV / MP4 注入（File 构造）走完「放视频→列轨→抽出→切格式」全流程；
      hanconv 走「粘贴→认格式→简转繁（台湾用词）→繁转简」；
      /en/ 语言版渲染 + NAV 前缀；埋点进服务端账本；截图两张存档。 */
'use strict';
process.on('unhandledRejection', e => { console.log('UNHANDLED', e && e.message); });
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');
const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const ROOT = __dirname;
const SRV = Number(process.env.SRV || 3423);
const PORT = 9800 + Math.floor(Math.random() * 90);
const wait = ms => new Promise(r => setTimeout(r, ms));

let ws, tid = 0; const pending = new Map();
function send(m, p) {
  const id = ++tid; ws.send(JSON.stringify({ id, method: m, params: p || {} }));
  return new Promise((res, rej) => { pending.set(id, { res, rej }); setTimeout(() => { if (pending.has(id)) { pending.delete(id); rej(new Error('timeout ' + m)); } }, 30000); });
}
async function ev(e) {
  const r = await send('Runtime.evaluate', { expression: e, returnByValue: true, awaitPromise: true });
  if (r.exceptionDetails) throw new Error(r.exceptionDetails.text);
  return r.result.value;
}
let P = 0, F = 0;
const ok = (c, n, x) => { console.log((c ? '  ✓ ' : '  ✗ ') + n + (x !== undefined ? '  [' + String(x).slice(0, 120) + ']' : '')); c ? P++ : F++; };
/* 轮询等页面状态（busy 收尾是异步的） */
async function until(expr, n) {
  for (let i = 0; i < (n || 40); i++) { if (await ev(expr)) return true; await wait(250); }
  return false;
}
function b64(f) { return fs.readFileSync(path.join(ROOT, '_vsfx', f)).toString('base64'); }

(async () => {
  const srv = spawn(process.execPath, ['server.js'], { cwd: ROOT, env: Object.assign({}, process.env, { PORT: String(SRV), PUBLIC_URL: 'http://127.0.0.1:' + SRV }), stdio: 'ignore' });
  await wait(1500);
  const chrome = spawn(CHROME, ['--headless=new', '--remote-debugging-port=' + PORT, '--no-sandbox', '--disable-gpu',
    '--host-resolver-rules=MAP * ~NOTFOUND, EXCLUDE 127.0.0.1',
    '--lang=zh-CN', '--user-data-dir=/tmp/cr313-' + Date.now(), 'about:blank'], { stdio: 'ignore' });
  await wait(2000);
  let tgt = null;
  for (let i = 0; i < 30 && !tgt; i++) {
    try {
      const r = await new Promise((res, rej) => { const q = http.get({ host: '127.0.0.1', port: PORT, path: '/json/list' }, s => { let d = ''; s.on('data', c => d += c); s.on('end', () => res(JSON.parse(d))); }); q.on('error', rej); q.setTimeout(2000, () => q.destroy(new Error('t'))); });
      tgt = (r || []).find(t => t.type === 'page');
    } catch (e) { await wait(500); }
  }
  if (!tgt) { console.log('浏览器没起来'); srv.kill(); chrome.kill(); process.exit(2); }
  ws = new WebSocket(tgt.webSocketDebuggerUrl, { perMessageDeflate: false });
  await new Promise((r, j) => { ws.on('open', r); ws.on('error', j); });
  ws.on('message', d => { const m = JSON.parse(d); if (m.id && pending.has(m.id)) { pending.get(m.id).res(m.result || m); pending.delete(m.id); } });
  await send('Page.enable'); await send('Runtime.enable');

  async function go(url) {
    await send('Page.navigate', { url });
    for (let i = 0; i < 40; i++) { const st = await ev('document.readyState'); if (st === 'complete') break; await wait(200); }
    await wait(800);
  }
  async function inject(f, name) {
    return ev(`(async () => {
      const bin = atob('${b64(f)}');
      const u8 = new Uint8Array(bin.length);
      for (let i = 0; i < bin.length; i++) u8[i] = bin.charCodeAt(i);
      setFile(new File([u8], '${name}', { type: 'video/x-matroska' }));
      return u8.length;
    })()`);
  }

  /* ============ A. videosub：MKV 双轨全流程 ============ */
  await go('http://127.0.0.1:' + SRV + '/videosub.html');
  console.log('== A. /videosub.html（zh-CN，MKV 双轨）==');
  const diagA = await ev(`({ href: location.href, ready: document.readyState,
    core: typeof window.VideoSubCore, i18n: typeof window.VIDEOSUB_I18N,
    h1: (document.querySelector('.hero h1')||{}).textContent||'' })`);
  ok(diagA.ready === 'complete' && diagA.core === 'object' && diagA.i18n === 'object', 'DIAG：页面 + 引擎 + 词典都加载了', JSON.stringify(diagA).slice(0, 150));

  const n = await inject('t_multi.mkv', 't_multi.mkv');
  ok(await until('!S.busy && S.meta && S.meta.tracks.length === 2'), 'MKV 认出 2 条字幕轨（不自动抽，等你挑）',
    await ev('JSON.stringify(S.meta && S.meta.tracks.map(t=>t.format))'));
  ok(await until(`document.querySelectorAll('#trks .trk').length === 2`), '轨列表铺了两行');
  ok(await ev(`document.querySelector('#outCard').style.display === 'none'`), '双轨没自动出结果');

  await ev(`document.querySelector('#trks [data-ex="0"]').click()`);
  ok(await until('!S.busy && S.cues && S.cues.cues.length === 4'), '轨#0 抽出 4 条 cue', await ev('S.cues && S.cues.cues.length'));
  let outTxt = await ev('document.getElementById("out").value');
  ok(outTxt.indexOf('00:00:01,000 --> 00:00:03,400') >= 0, 'SRT 时间码正确', outTxt.split('\n')[1]);
  ok(/[\u4e00-\u9fff]/.test(outTxt), '正文是汉字台词', outTxt.split('\n')[2]);

  await ev(`document.querySelector('#fmtSeg [data-fmt="vtt"]').click()`);
  outTxt = await ev('document.getElementById("out").value');
  ok(outTxt.indexOf('WEBVTT') === 0 && outTxt.indexOf('00:00:01.000 --> 00:00:03.400') >= 0, '切 VTT：头 + 点号毫秒', outTxt.split('\n')[0]);
  await ev(`document.querySelector('#fmtSeg [data-fmt="ass"]').click()`);
  outTxt = await ev('document.getElementById("out").value');
  ok(outTxt.indexOf('[Script Info]') >= 0 && outTxt.indexOf('[Events]') >= 0, '切 ASS：样式头齐全');

  /* ============ B. videosub：MP4 单轨自动抽 ============ */
  console.log('== B. MP4（mov_text，单轨自动抽）==');
  await inject('t_mov_srt.mp4', 't_mov_srt.mp4');
  ok(await until('!S.busy && S.cues && S.cues.cues.length === 4'), 'MP4 自动抽出 4 条 cue', await ev('S.cues && S.cues.cues.length'));
  ok(await until(`document.querySelector('#outCard').style.display === ''`), '结果卡自动打开');

  /* ============ C. /en/videosub.html：语言版渲染 ============ */
  console.log('== C. /en/videosub.html ==');
  await go('http://127.0.0.1:' + SRV + '/en/videosub.html');
  const diagC = await ev(`({ lang: document.documentElement.lang, h1: (document.querySelector('.hero h1')||{}).textContent||'',
    nav: [...document.querySelectorAll('#navPills a')].map(a=>a.getAttribute('href')),
    title: document.title })`);
  ok(diagC.lang === 'en' && /Video|video|MKV|MP4/i.test(diagC.h1), 'en 版 html lang + h1 英文', JSON.stringify(diagC).slice(0, 140));
  ok(diagC.nav.length === 11 && diagC.nav.every(h => h.startsWith('/en/')), 'NAV 胶囊 11 个全带 /en/ 前缀', JSON.stringify(diagC.nav).slice(0, 140));

  /* ============ D. hanconv：简↔繁全流程 ============ */
  console.log('== D. /hanconv.html（zh-CN）==');
  await go('http://127.0.0.1:' + SRV + '/hanconv.html');
  const diagD = await ev(`({ ready: document.readyState, core: typeof window.HanConvCore,
    data: typeof window.HanConvData, dictReady: typeof READY !== 'undefined' && READY,
    foot: (document.querySelector('footer')||{}).textContent||'' })`);
  ok(diagD.core === 'object' && diagD.data === 'object' && diagD.dictReady === true, '引擎 + 340KB 词库都加载且 READY', JSON.stringify(diagD).slice(0, 120));
  ok(/OpenCC/.test(diagD.foot) && /Apache-2\.0/.test(diagD.foot), '页脚带 OpenCC (Apache-2.0) 署名', diagD.foot);

  const SRT_IN = '1\n00:00:01,000 --> 00:00:03,400\n你好，里面的软件要更新\n\n2\n00:00:04,000 --> 00:00:06,800\nThis line stays in English.\n\n';
  await ev(`S.mode = 's2t'; setSrc(${JSON.stringify(SRT_IN)}, 'a.srt')`);
  let hc = await ev(`({ fmt: S.fmt, out: S.out, chip: document.getElementById('fmtChip').textContent,
    vis: document.querySelector('#outCard').style.display })`);
  ok(hc.chip === 'SRT' && hc.fmt === 'srt', '认出 SRT 格式', hc.chip);
  ok(hc.out.indexOf('你好，裏面的軟件要更新') >= 0, 's2t 通用繁体：字形转（裏）、用词不换（軟件）', (hc.out.split('\n')[2] || ''));
  ok(hc.out.indexOf('00:00:01,000 --> 00:00:03,400') >= 0 && hc.out.indexOf('This line stays in English.') >= 0, '时间码与英文行一字不动');
  ok(hc.vis === '', '结果卡打开');

  await ev(`S.mode = 's2twp'; convertNow()`);
  hc = await ev('S.out');
  ok(hc.indexOf('裡面的軟體要更新') >= 0, '切 s2twp：台湾用词（軟體）', (hc.match(/[\u4e00-\u9fff，]+/) || [''])[0]);

  await ev(`S.mode = 't2s'; setSrc('我的軟體和網路資訊都有問題', 'b.txt')`);
  hc = await ev('S.out');
  ok(hc.trim() === '我的软体和网路资讯都有问题', 't2s 通用回简：字形回、台湾用词不换（OpenCC 口径）', hc);
  await ev(`S.mode = 'tw2s'; setSrc('我的軟體和網路資訊都有問題', 'b.txt')`);
  hc = await ev('S.out');
  ok(hc.trim() === '我的软件和网络信息都有问题', 'tw2s：用词也一起回简体', hc);

  /* ============ E. /en/hanconv.html ============ */
  console.log('== E. /en/hanconv.html ==');
  await go('http://127.0.0.1:' + SRV + '/en/hanconv.html');
  const diagE = await ev(`({ lang: document.documentElement.lang, h1: (document.querySelector('.hero h1')||{}).textContent||'',
    nav: [...document.querySelectorAll('#navPills a')].map(a=>a.getAttribute('href')),
    opts: document.querySelectorAll('#dir option').length })`);
  ok(diagE.lang === 'en' && /Chinese/i.test(diagE.h1), 'en 版 h1 英文', diagE.h1);
  ok(diagE.nav.length === 11 && diagE.nav.every(h => h.startsWith('/en/')), 'NAV 11 个 /en/ 前缀');
  ok(diagE.opts === 9, '方向下拉 9 个模式', diagE.opts);

  /* ============ F. 埋点进服务端账本 ============ */
  console.log('== F. 埋点（读服务端账本，不抓包）==');
  await wait(1200);
  const tev = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'tool-events.json'), 'utf8')).events;
  const vsRec = tev.filter(x => x.page === 'videosub').length;
  const hcRec = tev.filter(x => x.page === 'hanconv').length;
  ok(vsRec >= 1, 'videosub 的 extract/export 记录进账本（' + vsRec + ' 条）');
  ok(hcRec >= 1, 'hanconv 的 convert 记录进账本（' + hcRec + ' 条）');

  /* ============ G. 截图存档 ============ */
  for (const [u, f] of [['http://127.0.0.1:' + SRV + '/videosub.html', '_shot313-vs.png'],
                        ['http://127.0.0.1:' + SRV + '/hanconv.html', '_shot313-hc.png']]) {
    await go(u);
    if (f === '_shot313-vs.png') { await inject('t_multi.mkv', 't_multi.mkv'); await until('!S.busy && S.cues'); await ev(`document.querySelector('#trks [data-ex="0"]').click()`); await until('!S.busy && S.cues && S.cues.cues.length'); }
    else { await ev(`setSrc(${JSON.stringify(SRT_IN)}, 'a.srt')`); await until('S.out'); }
    const shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(ROOT, f), Buffer.from(shot.data, 'base64'));
    console.log('  截图 ' + f + ' ' + Math.round(shot.data.length / 1024) + 'KB');
  }

  console.log('\n_shot313: ' + P + ' 通过 / ' + F + ' 失败');
  chrome.kill(); srv.kill(); process.exit(F ? 1 : 0);
})().catch(e => { console.log('FATAL: ' + (e && e.message)); process.exit(1); });
