/* _shot329.js —— 第五批内容页出图（merge / extract / split / lrc / glossary / videosub）
   规矩：图上不打标注，文字全在图注。跑法：node _shot329.js（起服务+截图+关进程同一条命令）
   30 张 × {zh-CN, en} = 60 PNG，再由 python 转 webp（_webp329.py）。
   ⚠️ CDP：Runtime/Page/DOM.enable 必调；新 user-data-dir；clip 用页面坐标 + captureBeyondViewport。
   ⚠️ ONLY=merge,extract 只跑指定页，省时间。videosub 需要带内封字幕轨的视频，见 VIDEO 环境变量。 */
'use strict';
const { spawn } = require('child_process');
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');
const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const OUT = path.join(ROOT, 'img/guides');
const PORT = 3386;
const DEBUG = 9397;
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const UA_DIR = '/tmp/shot329-' + Date.now();
const NODE = '/Users/jp/.workbuddy/binaries/node/versions/22.22.2-6/bin/node';
const VS = path.join(ROOT, '_vsfx');        /* videosub 引擎自带的测试样本，不用现造 */
const VIDEO = process.env.VIDEO || path.join(VS, 't_multi.mkv');    /* 多轨：出「一条轨一行」 */
const VIDEO1 = process.env.VIDEO1 || path.join(VS, 't_srt_srt.mkv'); /* 单轨：自动抽，出结果区 */

/* ── 演示数据 ───────────────────────────────────────────── */
const srt = (rows) => rows.map((r, i) =>
  [String(i + 1), r[0] + ' --> ' + r[1], r[2], ''].join('\n')).join('\n');

const T = [
  ['00:00:01,000', '00:00:03,500', 'Good morning. Did you sleep well?'],
  ['00:00:04,000', '00:00:07,200', 'Not really. The storm kept me up.'],
  ['00:00:08,000', '00:00:11,400', 'The forecast said it would pass before midnight.'],
  ['00:00:12,000', '00:00:15,800', 'It did stop around eleven.'],
  ['00:00:16,500', '00:00:19,000', 'Then the power went out.'],
  ['00:00:19,500', '00:00:23,600', 'That explains the cold coffee.'],
  ['00:00:24,000', '00:00:27,000', 'The software is installed and I read the notes.'],
  ['00:00:28,000', '00:00:30,500', 'Then we start over.']
];
const EN_SRT = srt(T);
/* 与 EN_SRT 逐条对得上的中文译文（双语合并用） */
const ZH_SRT = srt([
  ['00:00:01,000', '00:00:03,500', '早上好。你睡得好吗？'],
  ['00:00:04,000', '00:00:07,200', '不太好。暴风雨吵得我睡不着。'],
  ['00:00:08,000', '00:00:11,400', '天气预报说它会在午夜前过去。'],
  ['00:00:12,000', '00:00:15,800', '它确实在十一点左右停了。'],
  ['00:00:16,500', '00:00:19,000', '后来停电了。'],
  ['00:00:19,500', '00:00:23,600', '所以咖啡是凉的。'],
  ['00:00:24,000', '00:00:27,000', '软件已经装好了，信息我也看过了。'],
  ['00:00:28,000', '00:00:30,500', '那我们重新开始。']
]);
/* 提取纯文本 / 术语替换用的中文稿：带听障提示、水印、说话人前缀各一行 */
const ZH_DIRTY = [
  '1', '00:00:01,000 --> 00:00:03,500', 'JOHN: 早上好。你睡得好吗？', '',
  '2', '00:00:04,000 --> 00:00:07,200', '(雷声) 不太好。暴风雨吵得我睡不着。', '',
  '3', '00:00:08,000 --> 00:00:11,400', '天气预报说它会在午夜前过去。', '',
  '4', '00:00:12,000 --> 00:00:15,800', '字幕组某某制作 欢迎关注公众号', '',
  '5', '00:00:16,500 --> 00:00:19,000', '后来停电了。', '',
  '6', '00:00:19,500 --> 00:00:23,600', '后来停电了。', '',
  '7', '00:00:24,000 --> 00:00:27,000', '♪ 夜色渐浓 ♪', ''
].join('\n');
const EN_DIRTY = [
  '1', '00:00:01,000 --> 00:00:03,500', 'JOHN: Good morning. Did you sleep well?', '',
  '2', '00:00:04,000 --> 00:00:07,200', '(thunder) Not really. The storm kept me up.', '',
  '3', '00:00:08,000 --> 00:00:11,400', 'The forecast said it would pass before midnight.', '',
  '4', '00:00:12,000 --> 00:00:15,800', 'Subtitles by SomeGroup - visit our site', '',
  '5', '00:00:16,500 --> 00:00:19,000', 'Then the power went out.', '',
  '6', '00:00:19,500 --> 00:00:23,600', 'Then the power went out.', '',
  '7', '00:00:24,000 --> 00:00:27,000', '♪ night is falling ♪', ''
].join('\n');

const LYRIC_EN = ['Morning light on the window frame',
  'Coffee cold but the view is the same',
  'Storm passed over before the dawn',
  'Power lines humming a quiet song',
  'We start again where the road bends',
  'Nothing broken that time cannot mend'].join('\n');
const LYRIC_ZH = ['晨光落在窗框上',
  '咖啡凉了，窗外的景没变',
  '风暴在天亮前掠过',
  '电线低哼着一首安静的歌',
  '我们在路转弯的地方重新开始',
  '没有什么是时间修不好的'].join('\n');

/* 30 秒 440Hz 单声道 wav（lrc 页只要求能解码播放，够出图） */
function makeWav(p, seconds) {
  fs.mkdirSync(path.dirname(p), { recursive: true });
  const rate = 8000, n = rate * seconds;
  const buf = Buffer.alloc(44 + n * 2);
  buf.write('RIFF', 0); buf.writeUInt32LE(36 + n * 2, 4); buf.write('WAVE', 8);
  buf.write('fmt ', 12); buf.writeUInt32LE(16, 16); buf.writeUInt16LE(1, 20);
  buf.writeUInt16LE(1, 22); buf.writeUInt32LE(rate, 24); buf.writeUInt32LE(rate * 2, 28);
  buf.writeUInt16LE(2, 32); buf.writeUInt16LE(16, 34);
  buf.write('data', 36); buf.writeUInt32LE(n * 2, 40);
  for (let i = 0; i < n; i++) buf.writeInt16LE(Math.round(6000 * Math.sin(2 * Math.PI * 220 * i / rate)), 44 + i * 2);
  fs.writeFileSync(p, buf);
  return p;
}

const sleep = ms => new Promise(r => setTimeout(r, ms));
const getJson = url => new Promise((res, rej) => {
  http.get(url, r => { let d = ''; r.on('data', c => d += c); r.on('end', () => res(JSON.parse(d))); }).on('error', rej);
});
const TMPDIR = '/tmp/shot329files-' + process.pid;
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
    '--autoplay-policy=no-user-gesture-required',
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
    const timer = setTimeout(() => { delete pend[id]; r({ __timeout: true, method }); }, 25000);
    pend[id] = m => { clearTimeout(timer); r(m); };
    ws.send(JSON.stringify({ id, method, params: params || {} }));
  });
  await send('Runtime.enable'); await send('Page.enable'); await send('DOM.enable');
  const ev = async (expr) => {
    const r = await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true });
    if (r.__timeout) throw new Error('evaluate 超时: ' + expr.slice(0, 70));
    if (r.result && r.result.exceptionDetails) throw new Error('evaluate 抛错: ' + JSON.stringify(r.result.exceptionDetails).slice(0, 200));
    return r.result && r.result.result ? r.result.result.value : null;
  };
  await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1000, deviceScaleFactor: 2, mobile: false });

  async function shotBox(box, prefix) {
    const s = await send('Page.captureScreenshot', {
      format: 'png', captureBeyondViewport: true,
      clip: { x: box.x, y: box.y, width: box.w, height: box.h, scale: 1 }
    });
    if (s.__timeout || !s.result || !s.result.data) throw new Error('截图失败 ' + prefix);
    fs.writeFileSync(path.join(OUT, prefix + '.png'), Buffer.from(s.result.data, 'base64'));
    console.log('    ' + prefix + '.png  ' + Math.round(box.w) + 'x' + Math.round(box.h));
  }
  async function shot(sel, prefix, padTop, padBottom) {
    const j = JSON.stringify(sel);
    const rect = await ev(`(() => { const e = document.querySelector(${j}); if (!e) return null;
      const r = e.getBoundingClientRect(); const pad = 14, pt = ${padTop || 0}, pb = ${padBottom || 0};
      return JSON.stringify({ x: Math.max(0, r.left + window.scrollX - pad),
        y: Math.max(0, r.top + window.scrollY - pad - pt),
        w: r.width + pad * 2, h: r.height + pad * 2 + pt + pb }); })()`);
    if (!rect) throw new Error('取不到区域 ' + sel);
    await shotBox(JSON.parse(rect), prefix);
  }
  /* 从 a 的顶部截到 b 的底部（用于「标题 + 若干行」这种没有单一容器的区块） */
  async function shotRange(aSel, bSel, prefix, padTop, padBottom, widthSel) {
    const rect = await ev(`(() => { const a = document.querySelector(${JSON.stringify(aSel)}), b = document.querySelector(${JSON.stringify(bSel)});
      if (!a || !b) return null;
      const ra = a.getBoundingClientRect(), rb = b.getBoundingClientRect();
      const pad = 14, pt = ${padTop || 0}, pb = ${padBottom || 0};
      const top = Math.min(ra.top, rb.top) + window.scrollY - pad - pt;
      const bot = Math.max(ra.bottom, rb.bottom) + window.scrollY + pad + pb;
      ${widthSel ? `const w = document.querySelector(${JSON.stringify(widthSel)});` : 'const w = null;'}
      const ww = w ? w.getBoundingClientRect().width : ra.width;
      return JSON.stringify({ x: Math.max(0, ra.left + window.scrollX - pad), y: Math.max(0, top),
        w: ww + pad * 2, h: bot - top }); })()`);
    if (!rect) throw new Error('取不到区间 ' + aSel + ' → ' + bSel);
    await shotBox(JSON.parse(rect), prefix);
  }
  /* 任意 JS 表达式取元素（用于父容器、没有 id 的区块） */
  async function shotJs(expr, prefix, padTop, padBottom) {
    const rect = await ev(`(() => { const e = (${expr}); if (!e) return null;
      const r = e.getBoundingClientRect(); const pad = 14, pt = ${padTop || 0}, pb = ${padBottom || 0};
      return JSON.stringify({ x: Math.max(0, r.left + window.scrollX - pad),
        y: Math.max(0, r.top + window.scrollY - pad - pt),
        w: r.width + pad * 2, h: r.height + pad * 2 + pt + pb }); })()`);
    if (!rect) throw new Error('取不到区域 ' + expr);
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
    const nid = node.result ? node.result.nodeId : node.nodeId;
    await send('DOM.setFileInputFiles', { files: files, nodeId: nid });
  }
  async function waitFor(expr, label, times) {
    for (let i = 0; i < (times || 50); i++) {
      await sleep(300);
      try { if (await ev(expr)) return true; } catch (e) { }
    }
    console.log('  ⚠️ 等待超时：' + label);
    return false;
  }
  const shown = sel => `(()=>{const e=document.querySelector(${JSON.stringify(sel)});
    return !!(e && e.offsetParent !== null);})()`;

  const ONLY = process.env.ONLY || '';
  const want = pg => !ONLY || ONLY.split(',').indexOf(pg) >= 0;

  try {
    for (const lang of ['zh-CN', 'en']) {
      const pre = lang === 'zh-CN' ? '' : '/en';
      const zh = lang === 'zh-CN';
      const SUB = zh ? ZH_SRT : EN_SRT;          /* 该语演示字幕 */
      const DIRTY = zh ? ZH_DIRTY : EN_DIRTY;    /* 带脏数据的演示字幕 */
      const OTHER = zh ? EN_SRT : ZH_SRT;        /* 双语的另一侧 */
      const LYRIC = zh ? LYRIC_ZH : LYRIC_EN;
      console.log('== 界面语言 ' + lang);

      /* ── merge.html：原文 + 译文各传一份，点合并预览 ── */
      if (want('merge')) {
        await navigate(pre + '/merge.html');
        await upload('#srcFile', [tmpFile(zh ? 'ep01.zh.srt' : 'ep01.en.srt', SUB)]);
        await upload('#dstFile', [tmpFile(zh ? 'ep01.trans.srt' : 'ep01.trans.srt', OTHER)]);
        /* ⚠️ 上传后填的是 #srcOk / #dstOk（「✓ 已解析 N 条」），不是 #srcText —— 那是粘贴模式才显示的 */
        await waitFor("(document.querySelector('#srcOk') && document.querySelector('#srcOk').textContent.trim().length > 0)", 'srcOk');
        await waitFor("(document.querySelector('#dstOk') && document.querySelector('#dstOk').textContent.trim().length > 0)", 'dstOk');
        await ev("document.querySelector('#btnMerge').click()");
        /* ⚠️ pvCard 里没有 <tr>；且预览画面区永远显示页内置示例，判据要用「我传进去的那句台词」 */
        const first = SUB.split('\n')[2].slice(0, 5);
        await waitFor(`(()=>{const e=document.querySelector('#pvCard');
          return !!(e && e.textContent.indexOf(${JSON.stringify(first)}) >= 0);})()`, 'pvCard 出现我传的台词');
        await sleep(900);
        await shot('#modeTabs', 'merge-mode.' + lang);
        await shot('#alignRow', 'merge-pair.' + lang, 34);
        /* ASS 外观面板：要先选 ASS 模板，且它是 <details> —— 默认折叠，必须手动 open */
        await setInput('#expFmt', 'split');
        await sleep(500);
        await ev("(()=>{const d=document.querySelector('#assPanel'); if(d && d.tagName==='DETAILS') d.open=true;})()");
        await sleep(700);
        await shot('#assPanel', 'merge-style.' + lang);
        await shot('#pvCard', 'merge-preview.' + lang);
      }

      /* ── extract.html：传一份带脏数据的字幕 ── */
      if (want('extract')) {
        await navigate(pre + '/extract.html');
        await upload('#file', [tmpFile('demo.srt', DIRTY)]);
        await waitFor("(document.querySelector('#out') && document.querySelector('#out').value.length > 20)", 'out 有内容');
        await sleep(800);
        await shot('#upCard', 'extract-up.' + lang);
        await shotJs("document.querySelector('#layoutSeg').parentElement", 'extract-opt.' + lang, 26);
        await shot('#optCard', 'extract-clean.' + lang);
        await shot('#repCard', 'extract-out.' + lang);
      }

      /* ── split.html：拆分页签一次，拼接页签一次 ── */
      if (want('split')) {
        await navigate(pre + '/split.html');
        await shotJs("document.querySelector('#mSplit').closest('.seg') || document.querySelector('#mSplit').parentElement", 'split-mode.' + lang);
        await upload('#file', [tmpFile('demo.srt', SUB)]);
        await waitFor("(document.querySelector('#splitOut') && document.querySelector('#splitOut').textContent.trim().length > 0)", 'splitOut 有内容');
        await sleep(700);
        await shot('#splitCard', 'split-cut.' + lang);
        /* 切到拼接：多份一起传 */
        await ev("document.querySelector('#mJoin').click()");
        await sleep(500);
        await upload('#fileMany', [
          tmpFile('part1.srt', srt(T.slice(0, 4))),
          tmpFile('part2.srt', srt(T.slice(4)))
        ]);
        await waitFor("(document.querySelector('#joinOut') && document.querySelector('#joinOut').textContent.trim().length > 0)", 'joinOut 有内容');
        await sleep(700);
        await shot('#joinCard', 'split-join.' + lang);
        await shot('#outCard', 'split-out.' + lang);
      }

      /* ── lrc.html：音频 + 歌词，解析后出打轴区 ── */
      if (want('lrc')) {
        await navigate(pre + '/lrc.html');
        await upload('#afile', [makeWav(path.join(TMPDIR, 'demo.wav'), 30)]);
        await setInput('#lyText', LYRIC);
        await ev("document.querySelector('#btnParse').click()");
        await waitFor("(document.querySelector('#llist') && document.querySelector('#llist').children.length >= 3)", 'llist 有行');
        await sleep(800);
        await shot('#audCard', 'lrc-up.' + lang);
        await shot('#lyCard', 'lrc-paste.' + lang);
        await shot('#tapCard', 'lrc-tap.' + lang);
        await shot('#outCard', 'lrc-out.' + lang);
        /* 指南篇：贴词区、打轴按钮、导出区各来一张（不同裁剪） */
        await shotJs("document.querySelector('#lyText')", 'lrc-paste2.' + lang, 26);
        await shotJs("document.querySelector('#btnTap').parentElement", 'lrc-tap2.' + lang, 20);
        await shotJs("document.querySelector('#btnLrc').parentElement", 'lrc-export.' + lang, 20);
      }

      /* ── glossary.html：字幕 + 术语表，等改动明细出来 ── */
      if (want('glossary')) {
        await navigate(pre + '/glossary.html');
        await upload('#file', [tmpFile('demo.srt', SUB)]);
        /* ⚠️ 规则必须真能命中演示字幕，否则 #hits 是空的、改动明细那张图出不来 */
        await setInput('#gl', zh
          ? '# 第一季用词统一\n暴风雨 -> 风暴\n早上好 -> 早安\n咖啡 -> 热咖啡'
          : '# season 1 wording fixes\nstorm -> thunderstorm\nGood morning -> Morning\ncoffee -> hot coffee');
        await waitFor("(document.querySelector('#hits') && document.querySelector('#hits').textContent.trim().length > 0)", 'hits 有内容');
        await sleep(800);
        await shot('#upCard', 'glossary-up.' + lang);
        await shot('#glCard', 'glossary-table.' + lang);
        await shotRange('#scopeSeg', '#optCase', 'glossary-opt.' + lang, 24, 0, '#glCard');
        await shot('#repCard', 'glossary-out.' + lang);
        /* 指南篇：规则区与改动明细 */
        await shotJs("document.querySelector('#gl')", 'glossary-rules.' + lang, 26);
        await shotJs("document.querySelector('#hits')", 'glossary-diff.' + lang, 20);
      }

      /* ── videosub.html：需要带内封字幕轨的样本（VIDEO=绝对路径） ── */
      if (want('videosub')) {
        if (!VIDEO) { console.log('  ⚠️ 跳过 videosub：未给 VIDEO（_vsfx/t_multi.mkv）'); }
        else {
          /* ⚠️ 跑两遍：多轨样本出「一条轨一行」的列表；单轨样本会自动开始抽，才有结果区与格式条。
             多轨不点某一条就不会抽，#outCard / #fmtSeg 一直是隐藏的，截出来只有 28x28。 */
          await navigate(pre + '/videosub.html');
          await upload('#file', [VIDEO]);
          await waitFor("(document.querySelector('#trks') && document.querySelector('#trks').children.length >= 1)", 'trks 有轨');
          await sleep(900);
          await shot('#trkCard', 'videosub-track.' + lang);
          await shotJs("document.querySelector('#trks')", 'videosub-which.' + lang, 26);
          /* 第二遍：单轨自动抽 */
          await navigate(pre + '/videosub.html');
          await upload('#file', [VIDEO1]);
          await waitFor("(document.querySelector('#out') && document.querySelector('#out').value.length > 20)", 'out 有内容');
          await sleep(900);
          await shot('#upCard', 'videosub-up.' + lang);
          await shot('#outCard', 'videosub-out.' + lang);
          await shotJs("document.querySelector('#fmtSeg')", 'videosub-formats.' + lang, 24);
        }
      }
    }
  } finally {
    try { ws.close(); } catch (e) { }
    chrome.kill(); srv.kill();
    await sleep(300);
  }
  console.log('出图完 → ' + OUT);
  process.exit(0);
})().catch(e => { console.error('FATAL', e.message); process.exit(1); });
