/* _shotconv326.js —— 第二批内容页出图（convert 分区截图，v2 带格式变体）
   用途：给 content/convert*.js 提供 img.file 用的四源图（en / zh-CN × png / webp）。
   规矩（MEMORY「图文铁律」）：图上不打任何标注，文字全在图注里。
   跑法：node _shotconv326.js   （起服务+截图+关进程必须同一条命令，不能 run_in_background）
   ⚠️ CDP 探针三件套：Runtime.enable / Page.enable 必调；每次新 user-data-dir；
      clip 超出视口会截出空白 → captureBeyondViewport + 用页面坐标（含 scrollX/Y）。
   出 9 张 × 2 界面语言 = 18 个 PNG，再由 _webp326.py 转 webp。 */
'use strict';
const { spawn } = require('child_process');
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');
const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const OUT = path.join(ROOT, 'img/guides');
const PORT = 3382;
const DEBUG = 9392;
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const UA_DIR = '/tmp/shotconv-' + Date.now();
const NODE = '/Users/jp/.workbuddy/binaries/node/versions/22.22.2-6/bin/node';

/* ── 四种源格式的演示内容（同一段对话，内容中性、不含品牌） ── */
const SRT = [
  '1', '00:00:01,000 --> 00:00:03,500', 'Good morning. Did you sleep well?', '',
  '2', '00:00:04,000 --> 00:00:07,200', 'Not really. The storm kept me up.', '',
  '3', '00:00:08,000 --> 00:00:11,400', 'The forecast said it would pass', 'before midnight.', '',
  '4', '00:00:12,000 --> 00:00:15,800', 'It did stop around eleven.', '',
  '5', '00:00:16,500 --> 00:00:19,000', 'Then the power went out.', '',
  '6', '00:00:19,500 --> 00:00:23,600', 'That explains the cold coffee.', ''
].join('\n');

const VTT = 'WEBVTT\n\n' + [
  '00:00:01.000 --> 00:00:03.500', 'Good morning. Did you sleep well?', '',
  '00:00:04.000 --> 00:00:07.200', 'Not really. The storm kept me up.', '',
  '00:00:08.000 --> 00:00:11.400', 'The forecast said it would pass', 'before midnight.', '',
  '00:00:12.000 --> 00:00:15.800', 'It did stop around eleven.', '',
  '00:00:16.500 --> 00:00:19.000', 'Then the power went out.', ''
].join('\n');

const ASS = [
  '[Script Info]', 'ScriptType: v4.00+', 'PlayResX: 1920', 'PlayResY: 1080', '',
  '[V4+ Styles]',
  'Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding',
  'Style: Default,Arial,54,&H00FFFFFF,&H000000FF,&H00000000,&H80000000,0,0,0,0,100,100,0,0,1,2,0,2,90,90,60,1', '',
  '[Events]',
  'Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text',
  'Dialogue: 0,0:00:01.00,0:00:03.50,Default,,0,0,0,,Good morning. Did you sleep well?',
  'Dialogue: 0,0:00:04.00,0:00:07.20,Default,,0,0,0,,Not really. The storm kept me up.',
  'Dialogue: 0,0:00:08.00,0:00:11.40,Default,,0,0,0,,The forecast said it would pass\\Nbefore midnight.',
  'Dialogue: 0,0:00:12.00,0:00:15.80,Default,,0,0,0,,It did stop around eleven.', ''
].join('\n');

const SBV = [
  '0:00:01.000,0:00:03.500', 'Good morning. Did you sleep well?', '',
  '0:00:04.000,0:00:07.200', 'Not really. The storm kept me up.', '',
  '0:00:08.000,0:00:11.400', 'The forecast said it would pass before midnight.', '',
  '0:00:12.000,0:00:15.800', 'It did stop around eleven.', '',
  '0:00:16.500,0:00:19.000', 'Then the power went out.', ''
].join('\n');

const LRC = [
  '[ar:Demo]', '[ti:Morning talk]', '',
  '[00:01.00]Good morning. Did you sleep well?',
  '[00:04.00]Not really. The storm kept me up.',
  '[00:08.00]The forecast said it would pass before midnight.',
  '[00:12.00]It did stop around eleven.',
  '[00:16.50]Then the power went out.',
  '[00:19.50]That explains the cold coffee.'
].join('\n');

const sleep = ms => new Promise(r => setTimeout(r, ms));
const getJson = url => new Promise((res, rej) => {
  http.get(url, r => { let d = ''; r.on('data', c => d += c); r.on('end', () => res(JSON.parse(d))); }).on('error', rej);
});

(async () => {
  const srv = spawn(NODE, ['server.js'], {
    cwd: ROOT, stdio: 'ignore',
    env: Object.assign({}, process.env, { PORT: String(PORT), PUBLIC_URL: 'http://127.0.0.1:' + PORT })
  });
  await sleep(2500);

  const chrome = spawn(CHROME, [
    '--headless', '--disable-gpu', '--no-first-run',
    '--remote-debugging-port=' + DEBUG, '--user-data-dir=' + UA_DIR, 'about:blank'
  ], { stdio: 'ignore' });

  let list = null;
  for (let i = 0; i < 40 && !list; i++) {
    await sleep(400);
    try { list = await getJson('http://127.0.0.1:' + DEBUG + '/json/list'); } catch (e) { list = null; }
  }
  if (!list) { srv.kill(); chrome.kill(); throw new Error('CDP 起不来'); }
  const tab = list.find(t => t.type === 'page') || list[0];

  const ws = new WebSocket(tab.webSocketDebuggerUrl, { perMessageDeflate: false, maxPayload: 256 * 1024 * 1024 });
  let mid = 0; const pend = {};
  ws.on('message', d => { const m = JSON.parse(d); if (m.id && pend[m.id]) { const f = pend[m.id]; delete pend[m.id]; f(m); } });
  await new Promise(r => ws.on('open', r));
  const send = (method, params) => new Promise(r => {
    const id = ++mid;
    const timer = setTimeout(() => { delete pend[id]; r({ __timeout: true, method }); }, 15000);
    pend[id] = m => { clearTimeout(timer); r(m); };
    ws.send(JSON.stringify({ id, method, params: params || {} }));
  });
  await send('Runtime.enable');
  await send('Page.enable');
  const ev = async (expr) => {
    const r = await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true });
    if (r.__timeout) throw new Error('evaluate 超时: ' + expr.slice(0, 70));
    if (r.result && r.result.exceptionDetails) throw new Error('evaluate 抛错: ' + JSON.stringify(r.result.exceptionDetails).slice(0, 200));
    return r.result && r.result.result ? r.result.result.value : null;
  };
  await send('Emulation.setDeviceMetricsOverride', { width: 1280, height: 900, deviceScaleFactor: 2, mobile: false });

  const RECT = `(sel => { const e = document.querySelector(sel); if (!e) return null;
    const r = e.getBoundingClientRect(); const pad = 14;
    return JSON.stringify({ x: Math.max(0, r.left + window.scrollX - pad), y: Math.max(0, r.top + window.scrollY - pad),
      w: r.width + pad * 2, h: r.height + pad * 2 }); })`;

  async function shot(sel, prefix) {
    const rect = await ev(RECT + '(' + JSON.stringify(sel) + ')');
    if (!rect) throw new Error('取不到区域 ' + sel);
    const box = JSON.parse(rect);
    const s = await send('Page.captureScreenshot', {
      format: 'png', captureBeyondViewport: true,
      clip: { x: box.x, y: box.y, width: box.w, height: box.h, scale: 1 }
    });
    if (s.__timeout || !s.result || !s.result.data) throw new Error('截图失败 ' + sel);
    fs.writeFileSync(path.join(OUT, prefix + '.png'), Buffer.from(s.result.data, 'base64'));
    console.log('    ' + prefix + '.png  ' + Math.round(box.w) + 'x' + Math.round(box.h));
  }

  /* 一张图 = 一次任务：载入某格式的演示内容 → （可选）选目标格式 → 截某区域 */
  const JOBS = [
    /* 上传区（源格式识别）——覆盖 SRT / VTT / ASS / SBV / LRC 五种源 */
    ['convert-upload',      '#upCard',  SRT, 'demo.srt', null, false],
    ['convert-upload-vtt',  '#upCard',  VTT, 'demo.vtt', null, false],
    ['convert-upload-ass',  '#upCard',  ASS, 'demo.ass', null, false],
    ['convert-upload-sbv',  '#upCard',  SBV, 'demo.sbv', null, false],
    ['convert-upload-lrc',  '#upCard',  LRC, 'demo.lrc', null, false],
    /* 输出区（目标格式）——SRT→VTT / →ASS / VTT/SBV/LRC/ASS→SRT */
    ['convert-opt',         '#optCard', SRT, 'demo.srt', 'vtt', false],
    ['convert-opt-ass',     '#optCard', SRT, 'demo.srt', 'ass', false],
    ['convert-opt-srt',     '#optCard', VTT, 'demo.vtt', 'srt', false],
    /* 结果区（转换完成，统计 + 输出文本）——U4 使用说明用 */
    ['convert-result',      '#repCard', SRT, 'demo.srt', 'vtt', true],
    ['convert-result-srt',  '#repCard', VTT, 'demo.vtt', 'srt', true]
  ];

  try {
    for (const [lang, url] of [['zh-CN', '/convert.html'], ['en', '/en/convert.html']]) {
      console.log('== 界面语言 ' + lang + ' ' + url);
      await send('Page.navigate', { url: 'http://127.0.0.1:' + PORT + url });
      for (let i = 0; i < 50; i++) { await sleep(200); if (await ev('document.readyState') === 'complete') break; }
      await sleep(800);
      for (const [name, sel, demo, fname, outFmt, runIt] of JOBS) {
        await ev('window.setSrc(' + JSON.stringify(demo) + ', ' + JSON.stringify(fname) + ')');
        await sleep(250);
        if (outFmt) {
          await ev("(()=>{const s=document.querySelector('#outFmt');s.value=" + JSON.stringify(outFmt) +
            ";s.dispatchEvent(new Event('change'));})()");
          await sleep(200);
        }
        if (runIt) {
          await ev("document.querySelector('#btnGo').click()");
          for (let i = 0; i < 40; i++) {
            await sleep(200);
            if (await ev("getComputedStyle(document.querySelector('#repCard')).display !== 'none' && document.querySelector('#out').value.length > 0")) break;
          }
          await sleep(400);
        }
        await shot(sel, name + '.' + lang);
      }
    }
  } finally {
    try { ws.close(); } catch (e) { }
    chrome.kill(); srv.kill();
    await sleep(300);
  }
  console.log('PNG 全出完');
})().then(() => process.exit(0)).catch(e => { console.error('FATAL', e.message); process.exit(1); });
