/* _shotnav.js —— 顶栏截图（真浏览器，看版式而不是看字符串）
 *
 * 为什么要截图：分片加载、取词优先级这些已由 _trnav339.js 用字符串验过了，
 * 但「有没有挤爆 / 换行 / 溢出 / RTL 反了」只有看像素才知道。
 *
 * 用法：node _shotnav.js ms bo yi de
 * 产物：_shots/nav-<lang>.png（收起）、_shots/nav-<lang>-open.png（展开更多工具）
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');

const PORT = Number(process.env.PORT || 3409);
const DEBUG = Number(process.env.DEBUG_PORT || 9799);
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const NODE = process.execPath;
const sleep = ms => new Promise(r => setTimeout(r, ms));
const OUT = path.join(__dirname, '_shots');
const LANGS = process.argv.slice(2).length ? process.argv.slice(2) : ['ms', 'bo', 'yi', 'de'];
const PAGE = process.env.PAGE || 'index.html';

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const srv = spawn(NODE, ['server.js'], {
    cwd: __dirname, stdio: 'ignore',
    env: Object.assign({}, process.env, { PORT: String(PORT), PUBLIC_URL: 'http://127.0.0.1:' + PORT })
  });
  const kill = () => { try { srv.kill(); } catch (e) {} };
  process.on('exit', kill);

  let up = false;
  for (let i = 0; i < 40; i++) {
    await sleep(400);
    try { const r = await fetch('http://127.0.0.1:' + PORT + '/index.html'); if (r.ok) { up = true; break; } } catch (e) {}
  }
  if (!up) { kill(); throw new Error('server 起不来'); }

  const chrome = spawn(CHROME, ['--headless=new', '--no-sandbox', '--disable-gpu', '--no-first-run',
    '--disable-extensions', '--force-device-scale-factor=2', '--window-size=1440,1000',
    '--remote-debugging-port=' + DEBUG, '--user-data-dir=/tmp/cr-shotnav-' + Date.now(), 'about:blank'], { stdio: 'ignore' });

  let list = null;
  for (let i = 0; i < 40; i++) {
    await sleep(500);
    try { const r = await fetch('http://127.0.0.1:' + DEBUG + '/json/list'); list = await r.json(); if (list && list.length) break; } catch (e) {}
  }
  if (!list) { chrome.kill(); kill(); throw new Error('CDP 起不来'); }
  const target = list.find(x => x.type === 'page');
  const ws = new WebSocket(target.webSocketDebuggerUrl, { perMessageDeflate: false });
  await new Promise((res, rej) => { ws.on('open', res); ws.on('error', rej); });
  let seq = 0; const pend = new Map();
  ws.on('message', d => { let m; try { m = JSON.parse(d.toString()); } catch (e) { return; } if (m.id && pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); } });
  const send = (method, params) => new Promise(res => { const id = ++seq; pend.set(id, res); ws.send(JSON.stringify({ id, method, params: params || {} })); });
  const ev = async e => { const r = await send('Runtime.evaluate', { expression: e, returnByValue: true, awaitPromise: true }); return r.result && r.result.result ? r.result.result.value : null; };

  await send('Page.enable');
  const VW = Number(process.env.WIDTH || 1440);
  await send('Emulation.setDeviceMetricsOverride', { width: VW, height: 1000, deviceScaleFactor: 2, mobile: VW < 700 });

  const shot = async (file, clip) => {
    const r = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false, ...(clip ? { clip: Object.assign({ scale: 1 }, clip) } : {}) });
    if (!r.result || !r.result.data) { console.log('  ✗ 截图失败 ' + file); return; }
    fs.writeFileSync(path.join(OUT, file), Buffer.from(r.result.data, 'base64'));
    console.log('  → _shots/' + file);
  };

  for (const lang of LANGS) {
    console.log('[' + lang + ']');
    await send('Page.navigate', { url: 'http://127.0.0.1:' + PORT + '/' + lang + '/' + PAGE });
    await sleep(1200);
    for (let i = 0; i < 50; i++) { const n = await ev('(document.getElementById("topNav")||{children:[]}).children.length'); if (n > 0) break; await sleep(300); }
    await sleep(800);
    /* 顶栏区域：整宽 × 110 高（含 header 上沿） */
    const box = await ev(`(function(){var e=document.getElementById('topNav');if(!e)return null;var r=e.getBoundingClientRect();var top=Math.max(0, r.top-140);return {x:0,y:top,width:document.documentElement.clientWidth,height:Math.min(420, r.bottom-top+24)};})()`);
    await shot((PAGE==='index.html'?'nav-':'navpg-') + lang + (VW < 700 ? '-m' : '') + '.png', box ? { x: box.x, y: box.y, width: box.width, height: box.height } : null);

    /* 展开「更多工具」再截：看四列有没有溢出、描述有没有被切 */
    const opened = await ev(`(function(){var b=document.getElementById('tnavBtn');if(!b)return false;b.click();var m=document.getElementById('tnavMenu');return m?!m.hidden:false;})()`);
    if (opened) {
      await sleep(400);
      const mb = await ev(`(function(){var m=document.getElementById('tnavMenu');var r=m.getBoundingClientRect();return {x:0,y:Math.max(0,r.top-16),width:document.documentElement.clientWidth,height:Math.min(760,r.height+32)};})()`);
      await shot('nav-' + lang + (VW < 700 ? '-m' : '') + '-open.png', mb);
      await ev(`(function(){var b=document.getElementById('tnavBtn');if(b)b.click();})()`);
    } else {
      console.log('  （没有 tnavBtn，跳过展开图）');
    }
  }

  ws.close(); chrome.kill(); kill();
  process.exit(0);
})().catch(e => { console.error('FATAL', e.message); process.exit(1); });
