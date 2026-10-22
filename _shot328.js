/* _shot328.js —— 第四批内容页出图（repair / hanconv / table / batch 分区截图）
   规矩：图上不打标注，文字全在图注。跑法：node _shot328.js（起服务+截图+关进程同一条命令）
   13 张 × {zh-CN, en} = 26 PNG，再由 python 转 webp（_webp328.py）。
   ⚠️ CDP：Runtime/Page.enable 必调；新 user-data-dir；clip 页面坐标 + captureBeyondViewport。
   ⚠️ repair / hanconv 走粘贴（setInput 触发 input 事件）；table / batch 走 DOM.setFileInputFiles。
   ⚠️ table 要两张不同模式的图：先 toTable 传 srt，再 toSub 传 csv。 */
'use strict';
const { spawn } = require('child_process');
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');
const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const OUT = path.join(ROOT, 'img/guides');
const PORT = 3385;
const DEBUG = 9395;
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const UA_DIR = '/tmp/shot328-' + Date.now();
const NODE = '/Users/jp/.workbuddy/binaries/node/versions/22.22.2-6/bin/node';

/* 演示字幕：简体中文（hanconv 用） */
const ZH_SRT = [
  '1', '00:00:01,000 --> 00:00:03,500', '早上好。你睡得好吗？', '',
  '2', '00:00:04,000 --> 00:00:07,200', '不太好。暴风雨吵得我睡不着。', '',
  '3', '00:00:08,000 --> 00:00:11,400', '天气预报说它会在午夜前过去。', '',
  '4', '00:00:12,000 --> 00:00:15,800', '它确实在十一点左右停了。', '',
  '5', '00:00:16,500 --> 00:00:19,000', '后来停电了。', '',
  '6', '00:00:19,500 --> 00:00:23,600', '所以咖啡是凉的。', '',
  '7', '00:00:24,000 --> 00:00:27,000', '软件已经装好了，信息我也看过了。', ''
].join('\n');

/* table 用：8 条英文（转表格预览要有多行） */
const TBL_SRT = [
  '1', '00:00:01,000 --> 00:00:03,500', 'Good morning. Did you sleep well?', '',
  '2', '00:00:04,000 --> 00:00:07,200', 'Not really. The storm kept me up.', '',
  '3', '00:00:08,000 --> 00:00:11,400', 'The forecast said it would pass before midnight.', '',
  '4', '00:00:12,000 --> 00:00:15,800', 'It did stop around eleven.', '',
  '5', '00:00:16,500 --> 00:00:19,000', 'Then the power went out.', '',
  '6', '00:00:19,500 --> 00:00:23,600', 'That explains the cold coffee.', '',
  '7', '00:00:24,000 --> 00:00:27,000', 'The software is installed and I read the notes.', '',
  '8', '00:00:28,000 --> 00:00:30,500', 'Then we start over.', ''
].join('\n');

/* table 转字幕用：CSV（开始 / 结束 / 文本 三列）
   ⚠️ 时间列里有逗号（00:00:01,000），必须整体加引号，否则被拆成两列就认不出了 */
const TBL_CSV = [
  'Start,End,Text',
  '"00:00:01,000","00:00:03,500","Good morning. Did you sleep well?"',
  '"00:00:04,000","00:00:07,200","Not really. The storm kept me up."',
  '"00:00:08,000","00:00:11,400","The forecast said it would pass before midnight."',
  '"00:00:12,000","00:00:15,800","It did stop around eleven."',
  '"00:00:16,500","00:00:19,000","Then the power went out."',
  '"00:00:19,500","00:00:23,600","That explains the cold coffee."',
  '"00:00:24,000","00:00:27,000","The software is installed and I read the notes."',
  '"00:00:28,000","00:00:30,500","Then we start over."', ''
].join('\n');

/* batch 用：三份 srt（清单要有多个文件，其中一个故意认不出） */
const BATCH_FILES = [
  { name: 'ep01.srt', text: TBL_SRT },
  { name: 'ep02.srt', text: TBL_SRT.replace(/Good morning/, 'Good evening') },
  { name: 'notes.txt', text: 'These are release notes, not a subtitle file.\nNothing here has a timestamp.\n' }
];

const sleep = ms => new Promise(r => setTimeout(r, ms));
const getJson = url => new Promise((res, rej) => {
  http.get(url, r => { let d = ''; r.on('data', c => d += c); r.on('end', () => res(JSON.parse(d))); }).on('error', rej);
});
/* 临时文件用独立目录 + 原名：截图里显示的就是 ep01.srt，不带临时前缀 */
const TMPDIR = '/tmp/shot328files-' + process.pid;
const tmpFile = (name, text) => {
  fs.mkdirSync(TMPDIR, { recursive: true });
  const p = path.join(TMPDIR, name);
  fs.writeFileSync(p, text); return p;
};

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
  await send('DOM.enable');
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
  async function upload(sel, files) {
    const doc = await send('DOM.getDocument', { depth: 0 });
    const rootId = doc.result && doc.result.root ? doc.result.root.nodeId : doc.root.nodeId;
    const node = await send('DOM.querySelector', { nodeId: rootId, selector: sel });
    const fileNodeId = node.result ? node.result.nodeId : node.nodeId;
    await send('DOM.setFileInputFiles', { files: files, nodeId: fileNodeId });
  }
  async function waitFor(expr, label, times) {
    for (let i = 0; i < (times || 50); i++) {
      await sleep(300);
      try { if (await ev(expr)) return true; } catch (e) { }
    }
    console.log('  ⚠️ 等待超时：' + label);
    return false;
  }

  const ONLY = process.env.ONLY || '';   /* ONLY=repair,table 只跑指定页面，省时间 */
  const want = pg => !ONLY || ONLY.split(',').indexOf(pg) >= 0;

  try {
    for (const lang of ['zh-CN', 'en']) {
      const pre = lang === 'zh-CN' ? '' : '/en';
      console.log('== 界面语言 ' + lang);

      /* ── repair.html：粘贴一段乱码 ──
         zh-CN 用「UTF-8 被当 GBK 读」的汉字串；en 用「UTF-8 被当单字节读」的俄文串。
         ⚠️ 两段都必须是真乱码 —— 粘贴正常文本时诊断说「没发现乱码」，fixCard 是空的。 */
      if (want('repair')) {
      await navigate(pre + '/repair.html');
      const MOJI = lang === 'zh-CN'
        ? '1\n00:00:01,000 --> 00:00:03,500\n' + Buffer.from('早上好。你睡得好吗？', 'utf8').toString('latin1')
        : '1\n00:00:01,000 --> 00:00:03,500\n' + Buffer.from('Доброе утро. Ты хорошо спал?', 'utf8').toString('latin1');
      await setInput('#paste', MOJI);
      await waitFor("document.querySelector('#diagCard') && getComputedStyle(document.querySelector('#diagCard')).display !== 'none'", 'diagCard');
      await sleep(800);
      await shot('#upCard', 'repair-up.' + lang);
      await shot('#diagCard', 'repair-diag.' + lang);
      await shot('#fixCard', 'repair-fix.' + lang);
      await shot('#repCard', 'repair-out.' + lang);
      }

      /* ── hanconv.html：传一份简体字幕文件 ──
         ⚠️ 必须走文件而不是粘贴：粘贴没有扩展名，输出会退化成 TXT，图上就成了「下载 TXT」。 */
      if (want('hanconv')) {
      await navigate(pre + '/hanconv.html');
      await upload('#file', [tmpFile('demo-zh.srt', ZH_SRT)]);
      await waitFor("document.querySelector('#outCard') && getComputedStyle(document.querySelector('#outCard')).display !== 'none'", 'outCard');
      await waitFor("(document.querySelector('#statRow') && document.querySelector('#statRow').textContent.trim().length > 0)", 'statRow');
      await sleep(800);
      await shot('#upCard', 'hanconv-up.' + lang);
      await shot('#dirCard', 'hanconv-dir.' + lang);
      await shot('#outCard', 'hanconv-out.' + lang);
      }

      /* ── table.html：先 toTable 传 srt，再 toSub 传 csv ── */
      if (want('table')) {
      await navigate(pre + '/table.html');
      const srtFile = tmpFile('demo.srt', TBL_SRT);
      await upload('#file', [srtFile]);
      await waitFor("document.querySelector('#ttCard') && getComputedStyle(document.querySelector('#ttCard')).display !== 'none'", 'ttCard');
      await waitFor("(document.querySelector('#prev') && document.querySelector('#prev').textContent.indexOf('Did you sleep') >= 0)", 'prev 有内容');
      await sleep(800);
      await shot('#upCard', 'table-up.' + lang);
      await shot('#ttCard', 'table-prev.' + lang);
      /* 切到转字幕模式，传 CSV */
      await ev("document.querySelector('#mToSub').click()");
      await sleep(500);
      const csvFile = tmpFile('demo.csv', TBL_CSV);
      await upload('#file', [csvFile]);
      await waitFor("document.querySelector('#tsCard') && getComputedStyle(document.querySelector('#tsCard')).display !== 'none'", 'tsCard');
      await waitFor("(document.querySelector('#out') && document.querySelector('#out').value.indexOf('Did you sleep') >= 0)", 'out 有内容');
      await sleep(800);
      await shot('#tsCard', 'table-back.' + lang);
      }

      /* ── batch.html：一次传三个文件 ── */
      if (want('batch')) {
      await navigate(pre + '/batch.html');
      const bf = BATCH_FILES.map(f => tmpFile(f.name, f.text));
      await upload('#file', bf);
      await waitFor("document.querySelector('#listCard') && getComputedStyle(document.querySelector('#listCard')).display !== 'none'", 'listCard');
      await waitFor("(document.querySelector('#flist') && document.querySelector('#flist').children.length >= 3)", 'flist 3 项');
      await sleep(600);
      if (!(await ev("document.querySelector('#zipCard') && getComputedStyle(document.querySelector('#zipCard')).display !== 'none'"))) {
        await ev("document.querySelector('#btnZip').click()");
        await sleep(1200);
      }
      await sleep(400);
      await shot('#listCard', 'batch-list.' + lang);
      await shot('#zipCard', 'batch-zip.' + lang);
      await shot('#upCard', 'batch-up.' + lang);
      }
    }
  } finally {
    try { ws.close(); } catch (e) { }
    chrome.kill(); srv.kill();
    await sleep(300);
  }
  console.log('PNG 全出完');
})().then(() => process.exit(0)).catch(e => { console.error('FATAL', e.message); process.exit(1); });
