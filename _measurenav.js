/* _measurenav.js —— 量顶栏在不同宽度/语言下到底占多少，判断会不会挤爆
 * 输出：视口宽 / .topbar 内宽 / logo 宽 / #topNav 宽 / lnav 高度（两行则 > 单行）
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');
const PORT = Number(process.env.PORT || 3410);
const DEBUG = Number(process.env.DEBUG_PORT || 9800);
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const sleep = ms => new Promise(r => setTimeout(r, ms));

(async () => {
  const srv = spawn(process.execPath, ['server.js'], { cwd: __dirname, stdio: 'ignore',
    env: Object.assign({}, process.env, { PORT: String(PORT), PUBLIC_URL: 'http://127.0.0.1:' + PORT }) });
  const kill = () => { try { srv.kill(); } catch (e) {} };
  process.on('exit', kill);
  for (let i = 0; i < 40; i++) { await sleep(400); try { const r = await fetch('http://127.0.0.1:' + PORT + '/index.html'); if (r.ok) break; } catch (e) {} }

  const chrome = spawn(CHROME, ['--headless=new', '--no-sandbox', '--disable-gpu', '--no-first-run',
    '--disable-extensions', '--remote-debugging-port=' + DEBUG, '--user-data-dir=/tmp/cr-mnav-' + Date.now(), 'about:blank'], { stdio: 'ignore' });
  let list = null;
  for (let i = 0; i < 40; i++) { await sleep(500); try { const r = await fetch('http://127.0.0.1:' + DEBUG + '/json/list'); list = await r.json(); if (list && list.length) break; } catch (e) {} }
  const ws = new WebSocket(list.find(x => x.type === 'page').webSocketDebuggerUrl, { perMessageDeflate: false });
  await new Promise((res, rej) => { ws.on('open', res); ws.on('error', rej); });
  let seq = 0; const pend = new Map();
  ws.on('message', d => { let m; try { m = JSON.parse(d.toString()); } catch (e) { return; } if (m.id && pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); } });
  const send = (m, p) => new Promise(res => { const id = ++seq; pend.set(id, res); ws.send(JSON.stringify({ id, method: m, params: p || {} })); });
  const ev = async e => { const r = await send('Runtime.evaluate', { expression: e, returnByValue: true, awaitPromise: true }); return r.result && r.result.result ? r.result.result.value : null; };
  await send('Page.enable');

  const langs = process.argv.slice(2).length ? process.argv.slice(2) : ['en', 'de', 'ms', 'bo', 'yi', 'ru'];
  const widths = (process.env.WIDTHS || '1280,1440,1600,1920').split(',').map(Number);
  for (const w of widths) {
    await send('Emulation.setDeviceMetricsOverride', { width: w, height: 900, deviceScaleFactor: 1, mobile: false });
    for (const L of langs) {
      await send('Page.navigate', { url: 'http://127.0.0.1:' + PORT + '/' + L + '/index.html' });
      await sleep(900);
      for (let i = 0; i < 40; i++) { const n = await ev('(document.getElementById("topNav")||{children:[]}).children.length'); if (n > 0) break; await sleep(250); }
      await sleep(500);
      const d = await ev(`(function(){
        var nav=document.getElementById('topNav'), ln=document.querySelector('.lnav'), tb=document.querySelector('.topbar'),
            lg=document.querySelector('.logo'), sel=document.getElementById('uiLang2');
        if(!nav||!ln) return null;
        var r=e=>{var b=e.getBoundingClientRect();return Math.round(b.width)+'x'+Math.round(b.height);};
        return {nav:r(nav), lnav:r(ln), bar:tb?Math.round(tb.clientWidth):0, logo:lg?r(lg):'-', sel:sel?r(sel):'-',
                rows:Math.round(ln.getBoundingClientRect().height/34), scroll:nav.scrollWidth+'/'+nav.clientWidth};
      })()`);
      console.log(w + ' ' + L.padEnd(3) + '  ' + (d ? JSON.stringify(d) : 'null'));
    }
  }
  ws.close(); chrome.kill(); kill(); process.exit(0);
})().catch(e => { console.error('FATAL', e.message); process.exit(1); });
