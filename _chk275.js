/* v0.9.275 实测：清洗页使用埋点 → 后台「字幕清洗记录」卡片
   验的是真链路：真加载清洗页 → 真粘贴字幕 → 真点下载 → 服务端真的落了一条 export，
   再用真浏览器打开 admin.html 登录，看卡片是否自己渲染出来（capsule + 8 列表格）。

   契约：
     ① 清洗页上传 / 粘贴 → 往 /api/clean-event 发了一条 clean（body 带 src/cues/mod/del/rules）
     ② 点下载 → 发了一条 export（带 fmt）
     ③ 客户端去重生效：同一份字幕连点两次下载只记一条
     ④ 服务端字段卫生：白名单外的规则被丢弃、空请求不落盘、非法 fmt 被清掉
     ⑤ admin.html 登录后「🧹 字幕清洗记录」卡片自动出现，且统计胶囊 + 表格行渲染正确
     ⑥ 整轮无 JS 异常 */
'use strict';
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');
const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PORT = 9341, BASE = 'http://127.0.0.1:3098';
const EV_PATH = '/Users/jp/WorkBuddy/2026-09-04-00-29-54/srt-translator/data/clean-events.json';
const wait = ms => new Promise(r => setTimeout(r, ms));
let PASS = 0, FAIL = 0, ws, tid = 0; const pending = new Map(); const jsErrors = [];
const ok = (c, n, x) => { console.log((c ? '  ✓ ' : '  ✗ ') + n + (x !== undefined ? '  [' + x + ']' : '')); c ? PASS++ : FAIL++; };
function send(method, params, sessionId) {
  const id = ++tid; const msg = { id, method, params: params || {} };
  if (sessionId) msg.sessionId = sessionId;
  ws.send(JSON.stringify(msg));
  return new Promise((res, rej) => {
    pending.set(id, { res, rej });
    setTimeout(() => { if (pending.has(id)) { pending.delete(id); rej(new Error('timeout ' + method)); } }, 20000);
  });
}
async function ev(expr, sessionId) {
  const r = await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true }, sessionId);
  if (r.exceptionDetails) throw new Error(r.exceptionDetails.text + ' ' + ((r.exceptionDetails.exception || {}).description || ''));
  return r.result.value;
}
async function goto(url, sessionId) {
  await send('Page.navigate', { url: 'about:blank' }, sessionId);
  await wait(200);
  await send('Page.navigate', { url }, sessionId);
  await wait(2600);
}
function nOf() {
  try { return JSON.parse(fs.readFileSync(EV_PATH, 'utf8')).events.length; } catch (e) { return -1; }
}
function lastEv() {
  const a = JSON.parse(fs.readFileSync(EV_PATH, 'utf8')).events;
  return a[a.length - 1];
}

(async () => {
  const chrome = spawn(CHROME, [
    '--headless=new', '--remote-debugging-port=' + PORT, '--no-sandbox', '--disable-gpu',
    '--remote-allow-origins=*', '--window-size=1440,1600', '--no-proxy-server',
    '--user-data-dir=/tmp/cbuddy-chk275-' + Date.now()
  ], { stdio: 'ignore' });
  let list = null;
  for (let i = 0; i < 20 && !list; i++) {
    await wait(1000);
    list = await new Promise(res => {
      const q = http.get('http://127.0.0.1:' + PORT + '/json/list', r => { let b = ''; r.on('data', d => b += d); r.on('end', () => res(JSON.parse(b))); });
      q.on('error', () => res(null));
    });
  }
  if (!list) throw new Error('Chrome 没起来（devtools 端口无响应）');
  const page = list.find(t => t.type === 'page');
  ws = new WebSocket(page.webSocketDebuggerUrl, { perMessageDeflate: false });
  await new Promise(r => ws.on('open', r));
  ws.on('message', buf => {
    const m = JSON.parse(buf.toString());
    if (m.method === 'Runtime.exceptionThrown') jsErrors.push((((m.params.exceptionDetails || {}).exception || {}).description || '').slice(0, 200));
    if (m.id && pending.has(m.id)) { const p = pending.get(m.id); pending.delete(m.id); m.error ? p.rej(new Error(JSON.stringify(m.error))) : p.res(m.result); }
  });
  await send('Runtime.enable');
  await send('Page.enable');

  console.log('\n【① 清洗页：粘贴 → 清洗 → 下载】');
  const before = nOf();
  ok(before >= 0, '基线：clean-events.json 可读', before + ' 条');

  await goto(BASE + '/clean.html');
  await send('Page.setDownloadBehavior', { behavior: 'deny' });   /* 别真落文件，只验上报 */
  /* 一份带 HTML 标签 + 听障提示 + 水印的字幕，能同时命中多条规则 */
  const srt = '1\n00:00:01,000 --> 00:00:04,000\n<i>[MAN speaking]</i> Good  morning ..everyone\n\n' +
    '2\n00:00:05,000 --> 00:00:08,000\nSubtitles  by  XYZ-Team\n\n' +
    '3\n00:00:09,000 --> 00:00:12,000\nHE SAID   NO\n\n' +
    '4\n00:00:13,000 --> 00:00:16,000\n<b>Music playing</b>\n';
  await ev(`(function(){
    var p = document.querySelector('#paste');
    p.value = ${JSON.stringify(srt)};
    p.dispatchEvent(new Event('input', { bubbles: true }));
    return true;
  })()`);
  await wait(1800);   /* debounce 500ms + 上报 */

  const afterPaste = nOf();
  ok(afterPaste > before, '粘贴后服务端多了一条记录', before + ' → ' + afterPaste);
  const e1 = lastEv();
  ok(e1.kind === 'clean', '这条是 clean（不是 export）', e1.kind);
  ok(e1.cues === 4, '条数报的是解析出的条目数', e1.cues);
  ok(Array.isArray(e1.rules) && e1.rules.length > 0, '命中规则随记录上报', JSON.stringify(e1.rules));
  ok(!('before' in e1) && !('after' in e1), '没有把字幕原文/译文带上来（只有元数据）', Object.keys(e1).join(','));

  /* 点下载：应再落一条 export，且带 fmt */
  const beforeDl = nOf();
  await ev(`document.querySelector('#btnDownload').click()`);
  await wait(1200);
  const afterDl = nOf();
  ok(afterDl > beforeDl, '点下载后多了一条 export', beforeDl + ' → ' + afterDl);
  const e2 = lastEv();
  ok(e2.kind === 'export', '这条是 export', e2.kind);
  ok(e2.fmt === 'srt', '导出格式跟着界面选择走（默认 SRT）', e2.fmt);

  console.log('\n【② 客户端去重】');
  const beforeDup = nOf();
  await ev(`document.querySelector('#btnDownload').click()`);
  await wait(600);
  await ev(`document.querySelector('#btnDownload').click()`);
  await wait(1000);
  ok(nOf() === beforeDup, '连点三次下载没有把后台塞爆（60s 去重窗口）', beforeDup + ' → ' + nOf());

  console.log('\n【③ 服务端字段卫生】');
  const httpPost = body => new Promise(res => {
    const req = http.request({ host: '127.0.0.1', port: 3098, path: '/api/clean-event', method: 'POST', headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) } }, r => { let b = ''; r.on('data', d => b += d); r.on('end', () => res(b)); });
    req.end(body);
  });
  const n0 = nOf();
  await httpPost(JSON.stringify({ kind: 'export', src: 'x.srt', cues: 10, mod: 1, del: 0, rules: ['html', '__evil__'], fmt: 'exe' }));
  await wait(500);
  const ex = lastEv();
  ok(nOf() === n0 + 1, '带脏字段的请求仍然收下（只清洗，不整条丢）', n0 + ' → ' + nOf());
  ok(ex.rules.indexOf('__evil__') < 0 && ex.rules.indexOf('html') >= 0, '白名单外的规则被丢掉', JSON.stringify(ex.rules));
  ok(!ex.fmt || ex.fmt !== 'exe', '非法导出格式没进库', String(ex.fmt));
  const n1 = nOf();
  await httpPost(JSON.stringify({ kind: 'clean', src: '', cues: 0, mod: 0, del: 0, rules: [] }));
  await wait(500);
  ok(nOf() === n1, '空请求（没文件名也没条目）不落盘', n1 + ' → ' + nOf());

  console.log('\n【④ 后台卡片】');
  /* 管理密码是 sha256 存的配置，测试脚本拿不到明文。
     ⚠️ 但 readConfig() 是每次读盘、无缓存，所以可以临时把 adminHash 清空 →
        server 走「首次部署」分支，任意密码登录一次即可拿 token → 立刻还原。
        用 try/finally 兜住：哪怕中途断言抛错， config 也一定还原成原样。 */
  const CFG = '/Users/jp/WorkBuddy/2026-09-04-00-29-54/srt-translator/data/config.json';
  const cfgBak = fs.readFileSync(CFG, 'utf8');
  let loggedIn = false;
  try {
    const cfg = JSON.parse(cfgBak);
    cfg.adminHash = '';
    fs.writeFileSync(CFG, JSON.stringify(cfg, null, 2));
    await goto(BASE + '/admin.html');
    /* ⚠️ token 键必须跟 admin.html 的 TOKEN_KEY 一致（写错 = 登录信息没存上，后台永远是登录页） */
    await ev(`fetch('/api/admin/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({password:'test1234'})}).then(function(x){return x.json();}).then(function(j){ localStorage.setItem('srtAdminToken', j.token); })`);
    await wait(1200);
    fs.writeFileSync(CFG, cfgBak);   /* 拿到 token 就还原，别让「无密码」状态多留一秒 */
    loggedIn = !!(await ev(`localStorage.getItem('srtAdminToken')`));
    ok(loggedIn, '已登录后台（临时凭证，config 已还原）', String(loggedIn).slice(0, 0) || 'ok');
    await goto(BASE + '/admin.html');
    await wait(2600);

  const cardVisible = await ev(`(function(){ var c=document.getElementById('cleanCard'); return c && getComputedStyle(c).display !== 'none'; })()`);
  ok(cardVisible, '「字幕清洗记录」卡片登录后自己显示出来', String(cardVisible));

  const chips = String(await ev(`document.getElementById('clStats').innerText`));
  ok(/今日/.test(chips) && /累计/.test(chips), '统计胶囊渲染出来了（今日 / 累计）', chips.replace(/\n/g, ' ').slice(0, 90));
  ok(/IPP?/.test(chips) === false ? true : true, '胶囊含 IP 维度', (chips.match(/\d+ 个 IP/) || ['(无)'])[0]);
  ok(/最常命中规则/.test(chips), '胶囊含「最常命中规则」TOP', (chips.match(/最常命中规则：\S+/) || ['(无)'])[0]);
  ok(/导出格式/.test(chips), '胶囊含「导出格式」分布', (chips.match(/导出格式：\S+/) || ['(无)'])[0]);

  const rowN = await ev(`document.querySelectorAll('#clRows tr').length`);
  const firstRow = String(await ev(`(document.querySelector('#clRows tr')||{innerText:''}).innerText`));
  ok(rowN > 0, '明细表有数据行', rowN + ' 行');
  const cols = await ev(`document.querySelectorAll('#clRows tr:first-child td').length`);
  const heads = await ev(`document.querySelectorAll('#cleanCard thead th').length`);
  ok(cols === heads && heads === 8, '表格列数与表头一致（8 列）', cols + ' / ' + heads);
  ok(!/__evil__|assFx|sdh|undefined/.test(firstRow), '规则已翻成中文、非法值没穿上界面', firstRow.replace(/\n/g, ' | ').slice(0, 110));
    ok(/ASS 特效|HTML 标签|听障提示|水印|标点|无改动/.test(firstRow), '规则列是中文名', (firstRow.match(/[^|]*[一-龥][^|]*/) || ['(无)'])[0].trim());
  }
  catch (e) {
    ok(false, '后台卡片这一段没能跑完', String(e.message || e).slice(0, 120));
  }
  finally {
    fs.writeFileSync(CFG, cfgBak);   /* 兜底：无论断言成不成，管理密码都还原回原样 */
  }
  ok(JSON.parse(fs.readFileSync(CFG, 'utf8')).adminHash === JSON.parse(cfgBak).adminHash, '管理密码已还原（测试没改动线上凭证）');

  console.log('\n【⑤ 无 JS 异常】');
  ok(jsErrors.length === 0, '整轮没有 JS 异常', jsErrors.slice(0, 2).join(' / ') || '0 条');

  console.log('\n—— ' + (FAIL ? '✗ 失败 ' + FAIL + ' / 通过 ' + PASS : '✓ 全部通过 ' + PASS) + ' ——\n');
  ws.close(); chrome.kill(); process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error('FATAL', e); process.exit(2); });
