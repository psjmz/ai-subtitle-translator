/* _probe329.js —— 第五批 9 篇的口径探针
   目的：把 6 个待写工具页的 zh-CN 界面可见文本抓下来，写内容页时「点哪里、填什么、出什么」
   照界面原文写，不许编流程/因果。起服务 + 抓文本 + 关进程在同一条 Bash。 */
'use strict';
const { spawn } = require('child_process');
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');
const http = require('http');
const fs = require('fs');

const ROOT = __dirname;
const PORT = 3392;
const DEBUG = 9421;
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const UA_DIR = '/tmp/pr329-' + Date.now();
const NODE = '/Users/jp/.workbuddy/binaries/node/versions/22.22.2-6/bin/node';
const OUT = '/tmp/probe329.txt';
const sleep = ms => new Promise(r => setTimeout(r, ms));

const getJson = url => new Promise((res, rej) => {
  http.get(url, r => { let b = ''; r.on('data', d => b += d); r.on('end', () => { try { res(JSON.parse(b)); } catch (e) { rej(e); } }); }).on('error', rej);
});

const PAGES = ['merge', 'extract', 'split', 'lrc', 'videosub', 'glossary'];

(async () => {
  const srv = spawn(NODE, ['server.js'], {
    cwd: ROOT, stdio: 'ignore',
    env: Object.assign({}, process.env, { PORT: String(PORT), PUBLIC_URL: 'http://127.0.0.1:' + PORT })
  });
  await sleep(2500);
  const chrome = spawn(CHROME, [
    '--headless=new', '--no-sandbox', '--disable-gpu', '--no-first-run',
    '--remote-debugging-port=' + DEBUG, '--user-data-dir=' + UA_DIR, 'about:blank'
  ], { stdio: 'ignore' });
  let list = null;
  for (let i = 0; i < 50 && !list; i++) { await sleep(400); try { list = await getJson('http://127.0.0.1:' + DEBUG + '/json/list'); } catch (e) { } }
  if (!list) { srv.kill(); chrome.kill(); throw new Error('CDP 起不来'); }
  const tab = list.find(t => t.type === 'page') || list[0];
  const ws = new WebSocket(tab.webSocketDebuggerUrl, { perMessageDeflate: false, maxPayload: 256 * 1024 * 1024 });
  let mid = 0; const pend = {};
  ws.on('message', d => { const m = JSON.parse(d); if (m.id && pend[m.id]) { const f = pend[m.id]; delete pend[m.id]; f(m); } });
  await new Promise(r => ws.on('open', r));
  const send = (method, params) => new Promise(r => {
    const id = ++mid;
    const t = setTimeout(() => { delete pend[id]; r({ __timeout: true }); }, 20000);
    pend[id] = m => { clearTimeout(t); r(m); };
    ws.send(JSON.stringify({ id, method, params: params || {} }));
  });
  await send('Runtime.enable'); await send('Page.enable');
  const ev = async (expr) => {
    const r = await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true });
    return r.result && r.result.result ? r.result.result.value : null;
  };
  await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false });

  const out = [];
  try {
    for (const p of PAGES) {
      await send('Page.navigate', { url: 'http://127.0.0.1:' + PORT + '/' + p + '.html' });
      for (let i = 0; i < 80; i++) { await sleep(250); try { if (await ev('document.readyState') === 'complete') break; } catch (e) { } }
      await sleep(2000);
      const txt = await ev(`(function(){
        var s=document.body.cloneNode(true);
        s.querySelectorAll('script,style,svg,path').forEach(function(n){n.remove();});
        var seen={}, out=[];
        function push(t){ t=(t||'').replace(/\\s+/g,' ').trim(); if(!t||t.length>90) return;
          if(seen[t]) return; seen[t]=1; out.push(t); }
        s.querySelectorAll('label,button,summary,h1,h2,h3,h4,legend,option,th,dt').forEach(function(n){ push(n.textContent); });
        s.querySelectorAll('.hint,.tip,.note,.desc,.muted,.sub,.small,figcaption,[class*=hint],[class*=tip]').forEach(function(n){ push(n.textContent); });
        s.querySelectorAll('[placeholder]').forEach(function(n){ push('[占位] '+n.getAttribute('placeholder')); });
        return out.join('\\n');
      })()`);
      out.push('===== /' + p + '.html =====\n' + (txt || '(空)'));
    }
  } finally {
    try { ws.close(); } catch (e) { }
    chrome.kill(); srv.kill(); await sleep(300);
  }
  fs.writeFileSync(OUT, out.join('\n\n'), 'utf8');
  console.log(out.join('\n\n'));
  console.log('\n→ ' + OUT);
})().then(() => process.exit(0)).catch(e => { console.error('FATAL', e.message); process.exit(1); });
