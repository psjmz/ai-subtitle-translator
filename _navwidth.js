/* _navwidth.js —— 73 种新语言的顶栏在「不换行」时需要多宽
 *
 * 背景：`.lnav` 定宽 1080，顶栏放不下就会折成两行；一折行「更多工具」按钮
 * 跑到第二行左端，下拉菜单 right:0 就顶到屏幕外（真机截图已复现）。
 * 先把每种语言需要多宽量出来，再决定是加宽容器还是别的办法。
 *
 * 用法：node _navwidth.js
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');
const PORT = Number(process.env.PORT || 3411);
const DEBUG = Number(process.env.DEBUG_PORT || 9801);
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const sleep = ms => new Promise(r => setTimeout(r, ms));

(async () => {
  const srv = spawn(process.execPath, ['server.js'], { cwd: __dirname, stdio: 'ignore',
    env: Object.assign({}, process.env, { PORT: String(PORT), PUBLIC_URL: 'http://127.0.0.1:' + PORT }) });
  const kill = () => { try { srv.kill(); } catch (e) {} };
  process.on('exit', kill);
  for (let i = 0; i < 40; i++) { await sleep(400); try { const r = await fetch('http://127.0.0.1:' + PORT + '/index.html'); if (r.ok) break; } catch (e) {} }

  const chrome = spawn(CHROME, ['--headless=new', '--no-sandbox', '--disable-gpu', '--no-first-run',
    '--disable-extensions', '--remote-debugging-port=' + DEBUG, '--user-data-dir=/tmp/cr-nw-' + Date.now(), 'about:blank'], { stdio: 'ignore' });
  let list = null;
  for (let i = 0; i < 40; i++) { await sleep(500); try { const r = await fetch('http://127.0.0.1:' + DEBUG + '/json/list'); list = await r.json(); if (list && list.length) break; } catch (e) {} }
  const ws = new WebSocket(list.find(x => x.type === 'page').webSocketDebuggerUrl, { perMessageDeflate: false });
  await new Promise((res, rej) => { ws.on('open', res); ws.on('error', rej); });
  let seq = 0; const pend = new Map();
  ws.on('message', d => { let m; try { m = JSON.parse(d.toString()); } catch (e) { return; } if (m.id && pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); } });
  const send = (m, p) => new Promise(res => { const id = ++seq; pend.set(id, res); ws.send(JSON.stringify({ id, method: m, params: p || {} })); });
  const ev = async e => { const r = await send('Runtime.evaluate', { expression: e, returnByValue: true, awaitPromise: true }); const x = r.result && r.result.result; return x ? x.value : (r.result && r.result.exceptionDetails ? 'ERR:' + r.result.exceptionDetails.text : null); };
  await send('Page.enable');
  await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
  await send('Page.navigate', { url: 'http://127.0.0.1:' + PORT + '/en/index.html' });
  await sleep(2500);

  const langs = fs.readdirSync(path.join(__dirname, 'i18n'))
    .filter(f => /^tnav-[a-z]{2,3}(-[A-Za-z]{2,4})?\.js$/.test(f))
    .map(f => f.replace(/^tnav-/, '').replace(/\.js$/, '')).sort();

  const srcs = {};
  for (const l of langs) srcs[l] = fs.readFileSync(path.join(__dirname, 'i18n', 'tnav-' + l + '.js'), 'utf8');

  const rows = [];
  for (const l of langs) {
    const r = await ev(`(function(){
      var src = ${JSON.stringify(srcs[l])};
      (0,eval)(src);
      var d = window.__TNAV__[${JSON.stringify(l)}] || {};
      var nav = document.getElementById('topNav');
      if(!nav) return null;
      var host = document.createElement('div');
      /* ⚠️ 必须挂 id=topNav：顶栏所有字号/内边距都写在 #topNav .tnav-* 选择器下，
         用普通 div 量出来会短一大截（第一次就踩了，量出只有 2 种超宽）。 */
      host.id = 'topNav';
      host.style.cssText = 'position:absolute;left:-9999px;top:0;visibility:hidden;white-space:nowrap;display:inline-flex;align-items:center;gap:2px;flex-wrap:nowrap';
      /* 结构与真实顶栏一致：4 个主项 + 推广 pill + 更多工具按钮 */
      var items = ['navTr','navFx','navGuide','navQc'];
      var links = items.map(function(k){ return '<a class="tnav-lnk">'+ (d[k]||'') +'</a>'; }).join('');
      var promo = '<a class="tnav-promo"><span>'+(d.tnVd||'')+'</span></a>';
      var more = '<div class="tnav-more"><button class="tnav-btn" type="button">'+(d.tnMore||'')+'</button></div>';
      host.className = 'topbar';       /* 继承真实字体族 */
      host.innerHTML = links + promo + more;
      document.body.appendChild(host);
      var w = Math.ceil(host.getBoundingClientRect().width);
      var txt = host.innerText.replace(/\\n/g,' ');
      document.body.removeChild(host);
      return {w:w, txt:txt.slice(0,60)};
    })()`);
    rows.push({ l, w: r && r.w || 0, txt: r && r.txt || '' });
  }

  rows.sort((a, b) => b.w - a.w);
  const cap = 1080 - 180 - 133 - 12;   /* lnav - logo - 语言下拉 - 间隙 */
  console.log('可用宽度约 ' + cap + 'px（.lnav 1080 − logo 180 − 下拉 133 − 间隙 12）\n');
  console.log('最宽的 15 种：');
  rows.slice(0, 15).forEach(r => console.log('  ' + String(r.w).padStart(4) + 'px  ' + r.l.padEnd(5) + '  ' + r.txt));
  const over = rows.filter(r => r.w > cap);
  console.log('\n超宽 ' + over.length + ' / ' + rows.length + ' 种（最宽 ' + rows[0].w + 'px）');
  fs.writeFileSync(path.join(__dirname, '_navwidth.json'), JSON.stringify(rows, null, 1));

  ws.close(); chrome.kill(); kill(); process.exit(0);
})().catch(e => { console.error('FATAL', e.message); process.exit(1); });
