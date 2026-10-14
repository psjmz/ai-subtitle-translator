/* v0.9.308 六个垂直工具页：**真的会发出上报吗**
   光有 reportTool 定义不算数（305 的教训：属性都在、单测照绿，用户一个都没看见）。
   这里逐页真操作一遍，然后**直接读服务端账本**看收到了什么 ——
   比在浏览器里抓请求硬：证明的是「服务端真的落账了」，而不是「浏览器发了点什么」。
   （sendBeacon 的 body 在 CDP 的 requestWillBeSent 里拿不到，抓包这条路本来也走不通。） */
'use strict';
process.on('unhandledRejection', () => { });
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');
const { spawn } = require('child_process');
const http = require('http');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PORT = 9700 + Math.floor(Math.random() * 90);
const SRV = Number(process.env.SRV || 3615);
const wait = ms => new Promise(r => setTimeout(r, ms));
let ws, tid = 0; const pending = new Map();
function send(m, p) { const id = ++tid; ws.send(JSON.stringify({ id, method: m, params: p || {} })); return new Promise((res, rej) => { pending.set(id, { res, rej }); setTimeout(() => { if (pending.has(id)) { pending.delete(id); rej(new Error('timeout ' + m)); } }, 30000); }); }
async function ev(e) { const r = await send('Runtime.evaluate', { expression: e, returnByValue: true, awaitPromise: true }); if (r.exceptionDetails) return '__ERR__' + r.exceptionDetails.text; return r.result.value; }
let P = 0, F = 0;
const ok = (c, n, x) => { console.log((c ? '  ✓ ' : '  ✗ ') + n + (x !== undefined ? '  [' + String(x).slice(0, 130) + ']' : '')); c ? P++ : F++; };

function httpReq(method, url, body, headers) {
  return new Promise((res, rej) => {
    const r = http.request({ host: '127.0.0.1', port: SRV, path: url, method, headers: Object.assign({ 'Content-Type': 'application/json' }, headers || {}) }, resp => {
      let d = ''; resp.on('data', c => d += c); resp.on('end', () => res({ code: resp.statusCode, body: d }));
    });
    r.on('error', rej);
    if (body) r.write(JSON.stringify(body));
    r.end();
  });
}
let TOKEN = '';
async function ledger() { const g = await httpReq('GET', '/api/admin/tool-events?limit=200', null, { 'X-Admin-Token': TOKEN }); return JSON.parse(g.body); }
/* 跑一段操作，返回这段时间**新增**的记录（服务端倒序，新增的在前） */
async function delta(fn) {
  const before = (await ledger()).total;
  await fn();
  await wait(1100);
  const j = await ledger();
  return { added: j.total - before, fresh: (j.events || []).slice(0, Math.max(0, j.total - before)) };
}

const SRT = ['1', '00:00:01,000 --> 00:00:02,800', 'Hello world, this is a line.', '',
  '2', '00:00:03,000 --> 00:00:05,800', 'Second subtitle line here.', '',
  '3', '00:00:06,000 --> 00:00:08,800', 'Third one.', ''].join('\n');
/* 双语素材：一条两行（中英）—— 形态 A */
const BI = ['1', '00:00:01,000 --> 00:00:03,800', 'Hello world.', '你好，世界。', '',
  '2', '00:00:04,000 --> 00:00:06,800', 'Second line.', '第二行。', ''].join('\n');

async function loadPage(page) {
  await send('Page.navigate', { url: 'http://127.0.0.1:' + SRV + '/' + page + '.html' });
  for (let i = 0; i < 60; i++) { try { if ((await ev('document.readyState')) === 'complete') break; } catch (e) { } await wait(300); }
  await wait(900);
}

(async () => {
  /* 拿 admin token（服务是新的，首次登录即初始化） */
  const lg = await httpReq('POST', '/api/admin/login', { password: 'tools308pw' });
  TOKEN = (JSON.parse(lg.body) || {}).token || '';
  if (!TOKEN) { console.log('拿不到 token，服务没起来？'); process.exit(1); }
  ok(true, '本地服务已起，拿到 admin token');

  const cr = spawn(CHROME, ['--headless=new', '--remote-debugging-port=' + PORT, '--no-sandbox', '--disable-gpu',
    '--host-resolver-rules=MAP * ~NOTFOUND, EXCLUDE 127.0.0.1',
    '--user-data-dir=/tmp/cr-tools308-' + Date.now(), 'about:blank'], { stdio: 'ignore' });
  let list = null;
  for (let i = 0; i < 30; i++) {
    try { list = await new Promise((res, rej) => { http.get({ host: '127.0.0.1', port: PORT, path: '/json/list' }, r => { let d = ''; r.on('data', c => d += c); r.on('end', () => res(d)); }).on('error', rej); }); if (list.includes('webSocketDebuggerUrl')) break; } catch (e) { }
    await wait(300);
  }
  ws = new WebSocket(JSON.parse(list).find(t => t.type === 'page').webSocketDebuggerUrl, { perMessageDeflate: false });
  await new Promise((res, rej) => { ws.on('open', res); ws.on('error', rej); });
  ws.on('message', d => { const m = JSON.parse(d); if (m.id && pending.has(m.id)) { pending.get(m.id).res(m.result || m); pending.delete(m.id); } });
  await send('Page.enable'); await send('Runtime.enable');
  await send('Emulation.setDeviceMetricsOverride', { width: 1280, height: 1000, deviceScaleFactor: 1, mobile: false });

  /* ---------- shift：跑流水线 + 下载 ---------- */
  console.log('— shift 时间轴调整 —');
  await loadPage('shift');
  let d = await delta(async () => {
    await ev(`setSrc(${JSON.stringify(SRT)}, 'a.srt')`);
    await wait(400);
    await ev("document.querySelector('#btnGo').click()");
  });
  ok(d.added === 1 && d.fresh[0] && d.fresh[0].page === 'shift' && d.fresh[0].act === 'edit',
    '跑流水线 → 服务端收到 shift/edit', JSON.stringify(d.fresh[0] || {}));
  ok(d.fresh[0] && d.fresh[0].cues === 3, '条数对（3 条）', d.fresh[0] && d.fresh[0].cues);
  d = await delta(async () => { await ev("download()"); });   /* shift 的下载按钮是动态创建的，没有 id */
  ok(d.added === 1 && d.fresh[0] && d.fresh[0].act === 'export' && d.fresh[0].fmt === 'srt',
    '下载 → 服务端收到 shift/export + srt', JSON.stringify(d.fresh[0] || {}));

  /* ---------- convert ---------- */
  console.log('— convert 格式转换 —');
  await loadPage('convert');
  d = await delta(async () => {
    await ev(`setSrc(${JSON.stringify(SRT)}, 'a.srt')`);
    await wait(400);
    await ev("document.querySelector('#btnGo').click()");
  });
  ok(d.added === 1 && d.fresh[0] && d.fresh[0].page === 'convert' && d.fresh[0].act === 'convert',
    '完成转换 → convert/convert', JSON.stringify(d.fresh[0] || {}));
  d = await delta(async () => { await ev("document.querySelector('#btnDl').click()"); });
  ok(d.added === 1 && d.fresh[0] && d.fresh[0].act === 'export' && !!d.fresh[0].fmt,
    '下载 → convert/export 带格式', JSON.stringify(d.fresh[0] || {}));

  /* ---------- extract ---------- */
  console.log('— extract 字幕提取 —');
  await loadPage('extract');
  d = await delta(async () => { await ev(`setSrc(${JSON.stringify(SRT)}, 'a.srt')`); });
  ok(d.added === 1 && d.fresh[0] && d.fresh[0].page === 'extract' && d.fresh[0].act === 'extract',
    '提取（自动触发）→ extract/extract', JSON.stringify(d.fresh[0] || {}));
  ok(d.fresh[0] && d.fresh[0].n > 0, '带上了抽出的字符数', d.fresh[0] && d.fresh[0].n);

  /* ---------- bilingual ---------- */
  console.log('— bilingual 双语处理 —');
  await loadPage('bilingual');
  d = await delta(async () => {
    await ev(`setSrc(${JSON.stringify(BI)}, 'bi.srt')`);
    await wait(400);
    await ev("document.querySelector('#btnGo').click()");
  });
  ok(d.added === 1 && d.fresh[0] && d.fresh[0].page === 'bilingual'
    && (d.fresh[0].act === 'merge' || d.fresh[0].act === 'split'),
    '双语处理 → bilingual/merge 或 split', JSON.stringify(d.fresh[0] || {}));

  /* ---------- repair ---------- */
  console.log('— repair 乱码修复 —');
  await loadPage('repair');
  d = await delta(async () => { await ev(`setSrc(${JSON.stringify(SRT)}, 'a.srt')`); });
  ok(d.added === 1 && d.fresh[0] && d.fresh[0].page === 'repair' && d.fresh[0].act === 'repair',
    '修复（自动触发）→ repair/repair', JSON.stringify(d.fresh[0] || {}));

  /* ---------- glossary ---------- */
  console.log('— glossary 术语替换 —');
  await loadPage('glossary');
  d = await delta(async () => {
    await ev("document.getElementById('gl').value = 'Hello->你好\\nworld->世界'");
    await ev(`setSrc(${JSON.stringify(SRT)}, 'a.srt')`);
  });
  ok(d.added === 1 && d.fresh[0] && d.fresh[0].page === 'glossary' && d.fresh[0].act === 'replace',
    '执行替换 → glossary/replace', JSON.stringify(d.fresh[0] || {}));
  ok(d.fresh[0] && d.fresh[0].n >= 2, '带上实际替换处数', d.fresh[0] && d.fresh[0].n);
  d = await delta(async () => { await ev("document.querySelector('#btnDl').click()"); });
  ok(d.added === 1 && d.fresh[0] && d.fresh[0].act === 'export', '下载 → glossary/export', JSON.stringify(d.fresh[0] || {}));

  /* ---------- 去重 ---------- */
  console.log('— 去重窗口 —');
  await loadPage('extract');
  await delta(async () => { await ev(`setSrc(${JSON.stringify(SRT)}, 'a.srt')`); });
  const again = await delta(async () => {
    await ev("document.querySelector('#btnClear').click()");
    await wait(400);
    await ev(`setSrc(${JSON.stringify(SRT)}, 'a.srt')`);
  });
  ok(again.added === 0, '同一份内容再跑一遍不重复上报（去重窗口生效）', 'new=' + again.added);

  /* ---------- 六页都有记录 ---------- */
  console.log('— 服务端账本总览 —');
  const j = await ledger();
  const has = p => (j.byPage || []).find(r => r.page === p);
  ['shift', 'convert', 'extract', 'bilingual', 'repair', 'glossary'].forEach(p => {
    ok(has(p) && has(p).n > 0, '账本里有 ' + p + ' 的记录', has(p) && has(p).n);
  });
  ok((j.byPage || []).length === 6, 'byPage 仍是六行', (j.byPage || []).length);

  console.log('\n_tools308: ' + P + ' 通过 / ' + F + ' 失败');
  ws.close(); cr.kill(); process.exit(F ? 1 : 0);
})().catch(e => { console.error('崩了', e.message); process.exit(1); });
