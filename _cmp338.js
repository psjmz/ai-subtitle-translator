/* _cmp338.js —— 338 扩语言：改前 / 改后同源对照（证明「原有 75 种一个字都没变」）
 *
 * 用户的验收口径：想证明「不影响原有功能」，就要同一份输入改前改后各跑一遍、逐条 diff。
 * 改前基准 = srt-translator-github 副本（还没同步 338，仍是 75 种）。
 *
 * 对照三样东西：
 *   ① srt-core.js 三张字形表（INK_RATIO / REC_ASS_SIZE / INK_DESC）老 75 种的每一个值
 *   ② 75 种老语言生成的 systemPromptEn 全文（逐条 diff）
 *   ③ 75 种老语言的行宽（MAXW_BY_LANG）—— 从页面里读，随 ② 一起取
 *
 * 用法：先 cp 旧版两个文件到本目录，再 PORT=3398 node _cmp338.js
 */
'use strict';
const fs = require('fs'), path = require('path'), cp = require('child_process');
const { spawn } = require('child_process');
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');

const PORT = Number(process.env.PORT || 3398);
const DEBUG = Number(process.env.DEBUG_PORT || 9783);
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const NODE = process.execPath;
const sleep = ms => new Promise(r => setTimeout(r, ms));
const GH = path.join(__dirname, '..', 'srt-translator-github');

const PRE_HTML = path.join(__dirname, '_pre338.html');
const PRE_CORE = path.join(__dirname, '_srtcore.pre338.js');
fs.copyFileSync(path.join(GH, 'translate.html'), PRE_HTML);
fs.copyFileSync(path.join(GH, 'srt-core.js'), PRE_CORE);

let pass = 0, fail = 0;
const t = (name, ok, extra) => { if (ok) { pass++; console.log('  ✓ ' + name); } else { fail++; console.log('  ✗ ' + name + (extra ? '  → ' + extra : '')); } };

(async () => {
  console.log('① srt-core.js 三张字形表：老 75 种逐值对照');
  const OLD = require(PRE_CORE), NEW = require(path.join(__dirname, 'srt-core.js'));
  ['INK_RATIO', 'REC_ASS_SIZE', 'INK_DESC'].forEach(tb => {
    const o = OLD[tb] || {}, n = NEW[tb] || {};
    const keys = Object.keys(o);
    const diff = keys.filter(k => JSON.stringify(o[k]) !== JSON.stringify(n[k]));
    t(tb + ' 老 ' + keys.length + ' 个值全部未变', diff.length === 0,
      diff.map(k => k + ': ' + o[k] + ' → ' + n[k]).join(' | '));
    const added = Object.keys(n).filter(k => !(k in o));
    console.log('     · ' + tb + ' 新增键 ' + added.length + ' 个：' + added.join(','));
  });

  // ② ③ 走浏览器：两个页面各生成 75 种 prompt
  const srv = spawn(NODE, ['server.js'], {
    cwd: __dirname,
    env: Object.assign({}, process.env, { PORT: String(PORT), PUBLIC_URL: 'http://127.0.0.1:' + PORT }),
    stdio: 'ignore'
  });
  const clean = () => { try { srv.kill(); } catch (e) {} };
  process.on('exit', clean);
  let up = false;
  for (let i = 0; i < 40; i++) {
    await sleep(400);
    try { const r = await fetch('http://127.0.0.1:' + PORT + '/_pre338.html'); if (r.ok) { up = true; break; } } catch (e) {}
  }
  if (!up) { clean(); throw new Error('本地 server 起不来（或 _pre338.html 被静态服务挡了）'); }

  const udir = '/tmp/cr-cmp338-' + Date.now();
  const chrome = spawn(CHROME, ['--headless=new', '--no-sandbox', '--disable-gpu', '--no-first-run',
    '--window-size=1440,1200', '--remote-debugging-port=' + DEBUG, '--user-data-dir=' + udir, 'about:blank'],
    { stdio: 'ignore' });
  let list = null;
  for (let i = 0; i < 40; i++) {
    await sleep(500);
    try { const r = await fetch('http://127.0.0.1:' + DEBUG + '/json/list'); list = await r.json(); if (list && list.length) break; } catch (e) {}
  }
  if (!list) { chrome.kill(); clean(); throw new Error('CDP 起不来'); }
  const ws = new WebSocket(list[0].webSocketDebuggerUrl, { perMessageDeflate: false, maxPayload: 64 * 1024 * 1024 });
  await new Promise((res, rej) => { ws.on('open', res); ws.on('error', rej); });
  let seq = 0; const pend = new Map();
  ws.on('message', d => { let m; try { m = JSON.parse(d.toString()); } catch (e) { return; } if (m.id && pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); } });
  const send = (method, params) => new Promise(res => { const id = ++seq; pend.set(id, res); ws.send(JSON.stringify({ id, method, params: params || {} })); });
  const ev = async (expr) => {
    const r = await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true });
    return r.result && r.result.result ? r.result.result.value : null;
  };

  const grab = async (url) => {
    await send('Page.navigate', { url: 'http://127.0.0.1:' + PORT + url });
    for (let i = 0; i < 60; i++) {
      await sleep(400);
      const n = await ev('document.getElementById("dstLang") ? document.getElementById("dstLang").options.length : 0');
      if (n > 0) break;
    }
    return await ev([
      '(function(){',
      '  var out={};',
      '  Array.from(document.getElementById("dstLang").options).forEach(function(o){',
      '    var v=o.value;',
      '    try{ out[v]= systemPromptEn({src:"en", dst:v, style:"elegant"}); }catch(e){ out[v]="ERR:"+e.message; }',
      '  });',
      '  return out;',
      '})()'
    ].join('\n'));
  };

  console.log('\n② 75 种老语言的提示词：改前 vs 改后逐条 diff');
  const pre = await grab('/_pre338.html');
  const post = await grab('/translate.html');
  const oldKeys = Object.keys(pre || {});
  t('改前基准是 75 种、改后是 100 种', oldKeys.length === 75 && Object.keys(post || {}).length === 100,
    oldKeys.length + ' / ' + Object.keys(post || {}).length);
  const diff = oldKeys.filter(k => pre[k] !== (post || {})[k]);
  t('老 75 种的提示词逐字未变（' + oldKeys.length + ' 条全同）', diff.length === 0,
    diff.slice(0, 3).map(k => k + ' 改后 ' + String((post || {})[k]).slice(0, 60)).join(' | '));
  ws.close(); chrome.kill(); clean();

  // 收尾：删掉临时对照文件，别混进部署包
  [PRE_HTML, PRE_CORE].forEach(f => { try { fs.unlinkSync(f); } catch (e) {} });
  console.log('\n同源对照：' + pass + ' ✓ / ' + fail + ' ✗');
  process.exit(fail ? 1 : 0);
})();
