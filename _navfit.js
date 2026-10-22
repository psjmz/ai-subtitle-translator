/* _navfit.js —— 100 种语言逐页量「顶栏单行需要多宽」
 *
 * 做法：加载真实页面 → 给 #topNav 临时加 flex-wrap:nowrap → 读 scrollWidth
 *（这条路径把所有真实样式都算进去了，比合成 DOM 准）。
 * 同时记录当前是否已经折行（lnav 高度 > 单行）。
 *
 * 用法：node _navfit.js            # 全部 100 种
 *       node _navfit.js de fr ru   # 指定
 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { spawn } = require('child_process');
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');
const PORT = Number(process.env.PORT || 3412);
const DEBUG = Number(process.env.DEBUG_PORT || 9802);
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const sleep = ms => new Promise(r => setTimeout(r, ms));

const ctx = { window: {} }; ctx.globalThis = ctx; vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(__dirname, 'site-i18n.js'), 'utf8') + ';globalThis.__U=UI_LANGS;', ctx);
const ALL = ctx.__U.map(x => x[0]);

(async () => {
  const srv = spawn(process.execPath, ['server.js'], { cwd: __dirname, stdio: 'ignore',
    env: Object.assign({}, process.env, { PORT: String(PORT), PUBLIC_URL: 'http://127.0.0.1:' + PORT }) });
  const kill = () => { try { srv.kill(); } catch (e) {} };
  process.on('exit', kill);
  for (let i = 0; i < 40; i++) { await sleep(400); try { const r = await fetch('http://127.0.0.1:' + PORT + '/index.html'); if (r.ok) break; } catch (e) {} }

  const chrome = spawn(CHROME, ['--headless=new', '--no-sandbox', '--disable-gpu', '--no-first-run',
    '--disable-extensions', '--window-size=1440,900', '--remote-debugging-port=' + DEBUG,
    '--user-data-dir=/tmp/cr-nf-' + Date.now(), 'about:blank'], { stdio: 'ignore' });
  let list = null;
  for (let i = 0; i < 40; i++) { await sleep(500); try { const r = await fetch('http://127.0.0.1:' + DEBUG + '/json/list'); list = await r.json(); if (list && list.length) break; } catch (e) {} }
  const ws = new WebSocket(list.find(x => x.type === 'page').webSocketDebuggerUrl, { perMessageDeflate: false });
  await new Promise((res, rej) => { ws.on('open', res); ws.on('error', rej); });
  let seq = 0; const pend = new Map();
  ws.on('message', d => { let m; try { m = JSON.parse(d.toString()); } catch (e) { return; } if (m.id && pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); } });
  const send = (m, p) => new Promise(res => { const id = ++seq; pend.set(id, res); ws.send(JSON.stringify({ id, method: m, params: p || {} })); });
  const ev = async e => { const r = await send('Runtime.evaluate', { expression: e, returnByValue: true, awaitPromise: true }); const x = r.result && r.result.result; return x ? x.value : null; };
  await send('Page.enable');
  await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });

  const langs = process.argv.slice(2).length ? process.argv.slice(2) : ALL;
  const rows = [];
  for (const L of langs) {
    await send('Page.navigate', { url: 'http://127.0.0.1:' + PORT + '/' + L + '/index.html' });
    await sleep(700);
    for (let i = 0; i < 40; i++) { const n = await ev('(document.getElementById("topNav")||{children:[]}).children.length'); if (n > 0) break; await sleep(250); }
    await sleep(400);
    const d = await ev(`(function(){
      var nav=document.getElementById('topNav'), ln=document.querySelector('.lnav'), lg=document.querySelector('.logo'),
          sel=document.getElementById('uiLang2');
      if(!nav||!ln) return null;
      var h0=Math.round(nav.getBoundingClientRect().height);
      var cls=nav.className||'';
      var avail=Math.floor(ln.clientWidth - (lg?lg.getBoundingClientRect().width:0) - (sel?sel.getBoundingClientRect().width:0) - 8);
      return {h:h0, cls:cls.trim(), avail:avail};
    })()`);
    rows.push({ l: L, ...(d || { h: 0, need: 0, avail: 0 }) });
  }
  rows.sort((a, b) => b.h - a.h);
  console.log("语言   高   class");
  rows.slice(0, 20).forEach(r => console.log("  " + r.l.padEnd(5) + String(r.h).padStart(4) + "   " + r.cls));
  const over = rows.filter(r => r.h > 44);
  console.log('\n折行 ' + over.length + ' / ' + rows.length + ' 种：' + over.map(r => r.l).join(' '));
  fs.writeFileSync(path.join(__dirname, '_navfit.json'), JSON.stringify(rows, null, 1));
  ws.close(); chrome.kill(); kill(); process.exit(0);
})().catch(e => { console.error('FATAL', e.message); process.exit(1); });
