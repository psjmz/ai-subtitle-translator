/* _shot327.js —— 第三批内容页出图（translate / clean / qc / bilingual 分区截图）
   规矩：图上不打标注，文字全在图注。跑法：node _shot327.js（起服务+截图+关进程同一条命令）
   14 张 × {zh-CN, en} = 28 PNG，再由 python 转 webp（_webp327.py）。
   ⚠️ CDP：Runtime/Page.enable 必调；新 user-data-dir；clip 页面坐标 + captureBeyondViewport。
   ⚠️ translate 用「载入示例」；clean/qc 走 setFileInputFiles（无 setSrc）；bilingual 用全局 setSrc。 */
'use strict';
const { spawn } = require('child_process');
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');
const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const OUT = path.join(ROOT, 'img/guides');
const PORT = 3384;
const DEBUG = 9394;
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const UA_DIR = '/tmp/shot327-' + Date.now();
const NODE = '/Users/jp/.workbuddy/binaries/node/versions/22.22.2-6/bin/node';

/* 演示内容 */
const CLEAN_SRT = [
  '1', '00:00:01,000 --> 00:00:03,500', 'Good morning. Did you sleep well?', '',
  '2', '00:00:04,000 --> 00:00:07,200', '[phone ringing]', '',
  '3', '00:00:08,000 --> 00:00:11,400', 'Not really. The storm kept me up.', '',
  '4', '00:00:12,000 --> 00:00:15,800', 'www.subtitle-site.example.org', '',
  '5', '00:00:12,000 --> 00:00:15,800', 'www.subtitle-site.example.org', '',
  '6', '00:00:16,500 --> 00:00:19,000', 'Then the power went out.', '',
  '7', '00:00:19,500 --> 00:00:23,600', 'Follow us on WeChat for more subtitles', '',
  '8', '00:00:24,000 --> 00:00:27,000', 'That explains the cold coffee.', ''
].join('\n');

const QC_SRT = [
  '1', '00:00:01,000 --> 00:00:01,500', 'Hi.', '',
  '2', '00:00:01,300 --> 00:00:05,000', 'This line overlaps with the previous one badly', '',
  '3', '00:00:06,000 --> 00:00:07,000', 'This is a very long English line that surely exceeds the forty two half width limit', '',
  '4', '00:00:08,000 --> 00:00:14,000', 'This one stays on screen for far too long, way beyond seven seconds of maximum dwell', '',
  '5', '00:00:15,000 --> 00:00:18,000', 'That explains the cold coffee.', ''
].join('\n');

/* 形态 B 双语：两条同轴（英文在前、中文在后） */
const BI_SRT = [
  '1', '00:00:01,000 --> 00:00:03,500', 'Good morning. Did you sleep well?', '',
  '2', '00:00:01,000 --> 00:00:03,500', '早上好。你睡得好吗？', '',
  '3', '00:00:04,000 --> 00:00:07,200', 'Not really. The storm kept me up.', '',
  '4', '00:00:04,000 --> 00:00:07,200', '不太好。暴风雨吵得我睡不着。', '',
  '5', '00:00:08,000 --> 00:00:11,400', 'The forecast said it would pass before midnight.', '',
  '6', '00:00:08,000 --> 00:00:11,400', '天气预报说它会在午夜前过去。', '',
  '7', '00:00:12,000 --> 00:00:15,800', 'It did stop around eleven.', '',
  '8', '00:00:12,000 --> 00:00:15,800', '它确实在十一点左右停了。', ''
].join('\n');

const sleep = ms => new Promise(r => setTimeout(r, ms));
const getJson = url => new Promise((res, rej) => {
  http.get(url, r => { let d = ''; r.on('data', c => d += c); r.on('end', () => res(JSON.parse(d))); }).on('error', rej);
});
const tmpFile = (name, text) => { const p = '/tmp/shot327-' + name; fs.writeFileSync(p, text); return p; };

(async () => {
  const srv = spawn(NODE, ['server.js'], {
    cwd: ROOT, stdio: 'ignore',
    env: Object.assign({}, process.env, { PORT: String(PORT), PUBLIC_URL: 'http://127.0.0.1:' + PORT })
  });
  await sleep(2500);
  const chrome = spawn(CHROME, [
    '--headless', '--no-sandbox', '--disable-gpu', '--no-first-run',
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
    const timer = setTimeout(() => { delete pend[id]; r({ __timeout: true, method }); }, 20000);
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
  await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1000, deviceScaleFactor: 2, mobile: false });

  const RECT = `(sel => { const e = document.querySelector(sel); if (!e) return null;
    const r = e.getBoundingClientRect(); const pad = 14;
    return JSON.stringify({ x: Math.max(0, r.left + window.scrollX - pad), y: Math.max(0, r.top + window.scrollY - pad),
      w: r.width + pad * 2, h: r.height + pad * 2 }); })`;
  /* sec-title 键对键的纵向范围：A 节顶到 B 节顶，宽度取栏容器 */
  const SECRANGE = `((ka, kb, ws) => { const titles = Array.from(document.querySelectorAll('.sec-title'));
    const A = titles.find(t => t.querySelector('[data-i18n="' + ka + '"]'));
    const B = titles.find(t => t.querySelector('[data-i18n="' + kb + '"]'));
    const W = document.querySelector(ws);
    if (!A || !B || !W) return null;
    const ra = A.getBoundingClientRect(), rb = B.getBoundingClientRect(), rw = W.getBoundingClientRect();
    const pad = 14;
    const x = rw.left + window.scrollX, y = ra.top + window.scrollY;
    const w = rw.width, h = rb.top - ra.top;
    if (h <= 0) return null;
    return JSON.stringify({ x: Math.max(0, x - pad), y: Math.max(0, y - pad), w: w + pad * 2, h: h + pad }); })`;
  /* 任意两元素：A 顶到 B 底，宽度取第三个选择器 */
  const RANGEDOWN = `((a, b, ws) => { const A = document.querySelector(a), B = document.querySelector(b), W = document.querySelector(ws);
    if (!A || !B || !W) return null;
    const ra = A.getBoundingClientRect(), rb = B.getBoundingClientRect(), rw = W.getBoundingClientRect();
    const pad = 14;
    const x = rw.left + window.scrollX, y = ra.top + window.scrollY;
    const w = rw.width, h = rb.bottom - ra.top;
    if (h <= 0) return null;
    return JSON.stringify({ x: Math.max(0, x - pad), y: Math.max(0, y - pad), w: w + pad * 2, h: h + pad }); })`;

  async function shotBox(box, prefix) {
    const s = await send('Page.captureScreenshot', {
      format: 'png', captureBeyondViewport: true,
      clip: { x: box.x, y: box.y, width: box.w, height: box.h, scale: 1 }
    });
    if (s.__timeout || !s.result || !s.result.data) throw new Error('截图失败 ' + prefix);
    fs.writeFileSync(path.join(OUT, prefix + '.png'), Buffer.from(s.result.data, 'base64'));
    console.log('    ' + prefix + '.png  ' + Math.round(box.w) + 'x' + Math.round(box.h));
  }
  async function shot(sel, prefix) {
    const rect = await ev(RECT + '(' + JSON.stringify(sel) + ')');
    if (!rect) throw new Error('取不到区域 ' + sel);
    await shotBox(JSON.parse(rect), prefix);
  }
  async function shotSec(ka, kb, ws, prefix) {
    const rect = await ev(SECRANGE + '(' + JSON.stringify(ka) + ',' + JSON.stringify(kb) + ',' + JSON.stringify(ws) + ')');
    if (!rect) throw new Error('取不到范围 sec:' + ka + ' ~ sec:' + kb);
    await shotBox(JSON.parse(rect), prefix);
  }
  async function shotDown(a, b, ws, prefix) {
    const rect = await ev(RANGEDOWN + '(' + JSON.stringify(a) + ',' + JSON.stringify(b) + ',' + JSON.stringify(ws) + ')');
    if (!rect) throw new Error('取不到范围 ' + a + ' ~ ' + b + ' (down)');
    await shotBox(JSON.parse(rect), prefix);
  }
  async function navigate(url) {
    await send('Page.navigate', { url: 'http://127.0.0.1:' + PORT + url });
    for (let i = 0; i < 60; i++) { await sleep(200); try { if (await ev('document.readyState') === 'complete') break; } catch (e) { } }
    await sleep(900);
    console.log('  loaded ' + url);
  }
  async function setInput(sel, val) {
    await ev(`(()=>{const e=document.querySelector(${JSON.stringify(sel)});e.value=${JSON.stringify(val)};
      e.dispatchEvent(new Event('input',{bubbles:true}));e.dispatchEvent(new Event('change',{bubbles:true}));})()`);
  }

  try {
    for (const lang of ['zh-CN', 'en']) {
      const pre = lang === 'zh-CN' ? '' : '/en';
      console.log('== 界面语言 ' + lang);

      /* ── translate.html：载入示例 → 工作台 ── */
      await navigate(pre + '/translate.html');
      await ev("document.querySelector('#btnDemo').click()");
      for (let i = 0; i < 50; i++) {
        await sleep(300);
        const ok = await ev("(document.querySelector('#rows') && document.querySelector('#rows').children.length > 0) || (document.querySelector('#stTotal') && document.querySelector('#stTotal').textContent !== '0')");
        if (i % 10 === 9) console.log('  rows 轮询 ' + (i + 1));
        if (ok) break;
      }
      await sleep(1000);
      console.log('  step translate-upload');
      await shotSec('secImport', 'secLang', '.main .panel:first-child', 'translate-upload.' + lang);
      console.log('  step translate-lang');
      await shotSec('secLang', 'secTerms', '.main .panel:first-child', 'translate-lang.' + lang);
      console.log('  step translate-glossary');
      await shotSec('secTerms', 'secFilter', '.main .panel:first-child', 'translate-glossary.' + lang);
      console.log('  step translate-workspace');
      await shotDown('#stWrap', '#rows', '#rows', 'translate-workspace.' + lang);
      console.log('  step translate-export');
      await shotDown('.sec-title [data-i18n="stepExport"]', '#fmtPanel', '.main .panel:last-child', 'translate-export.' + lang);

      /* ── clean.html：粘贴带水印 SRT ── */
      await navigate(pre + '/clean.html');
      await setInput('#paste', CLEAN_SRT);
      for (let i = 0; i < 50; i++) {
        await sleep(300);
        const ok = await ev("document.querySelector('#repCard') && getComputedStyle(document.querySelector('#repCard')).display !== 'none'");
        if (i % 10 === 9) console.log('  repCard 轮询 ' + (i + 1));
        if (ok) break;
      }
      await sleep(800);
      await shot('#optCard', 'clean-opts.' + lang);
      await shot('#repCard', 'clean-diff.' + lang);
      await shot('#pvBox', 'clean-preview.' + lang);

      /* ── qc.html：文件注入问题 SRT ── */
      await navigate(pre + '/qc.html');
      const qcFile = tmpFile('qc.srt', QC_SRT);
      await send('DOM.enable');
      const doc = await send('DOM.getDocument', { depth: 0 });
      const rootId = doc.result && doc.result.root ? doc.result.root.nodeId : doc.root.nodeId;
      const node = await send('DOM.querySelector', { nodeId: rootId, selector: '#file' });
      const fileNodeId = node.result ? node.result.nodeId : node.nodeId;
      await send('DOM.setFileInputFiles', { files: [qcFile], nodeId: fileNodeId });
      for (let i = 0; i < 50; i++) {
        await sleep(300);
        const ok = await ev("document.querySelector('#issBox') && document.querySelector('#issBox').children.length > 0");
        if (i % 10 === 9) console.log('  issBox 轮询 ' + (i + 1));
        if (ok) break;
      }
      if (!(await ev("document.querySelector('#issBox') && document.querySelector('#issBox').children.length > 0"))) {
        await ev("document.querySelector('#btnRun').click()");
        await sleep(1500);
      }
      await sleep(600);
      await shot('#thBox', 'qc-rules.' + lang);
      await shot('#repCard', 'qc-report.' + lang);
      await shot('#fixCard', 'qc-fix.' + lang);

      /* ── bilingual.html：形态 B 双语 → 默认模式 + split ── */
      await navigate(pre + '/bilingual.html');
      await ev('window.setSrc(' + JSON.stringify(BI_SRT) + ', "demo.srt")');
      await sleep(600);
      await shot('#optCard', 'bilingual-modes.' + lang);
      await ev("document.querySelector('#btnGo').click()");
      for (let i = 0; i < 50; i++) {
        await sleep(300);
        const ok = await ev("document.querySelector('#repCard') && getComputedStyle(document.querySelector('#repCard')).display !== 'none'");
        if (i % 10 === 9) console.log('  repCard 轮询 ' + (i + 1));
        if (ok) break;
      }
      await sleep(600);
      await shot('#repCard', 'bilingual-result.' + lang);
      await setInput('#mode', 'split');
      for (let i = 0; i < 50; i++) {
        await sleep(300);
        const ok = await ev("document.querySelector('#parts') && document.querySelector('#parts').children.length >= 2");
        if (i % 10 === 9) console.log('  parts 轮询 ' + (i + 1));
        if (ok) break;
      }
      await sleep(600);
      await shot('#repCard', 'bilingual-split.' + lang);
    }
  } finally {
    try { ws.close(); } catch (e) { }
    chrome.kill(); srv.kill();
    await sleep(300);
  }
  console.log('PNG 全出完');
})().then(() => process.exit(0)).catch(e => { console.error('FATAL', e.message); process.exit(1); });
