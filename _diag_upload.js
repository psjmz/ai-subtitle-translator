/* 诊断：CDP 塞文件到 #file 之后，翻译页 / 清洗页到底吃进去没有？
   （_audit_extra 里两条红要先分清是「探针没塞进去」还是「页面真不认」） */
'use strict';
process.on('unhandledRejection', () => { });
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');
const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PORT = 9372, BASE = 'http://127.0.0.1:3098', SRC = '/tmp/aud-src.srt';
const wait = ms => new Promise(r => setTimeout(r, ms));
let ws, tid = 0; const pending = new Map();
function send(m, p) { const id = ++tid; ws.send(JSON.stringify({ id, method: m, params: p || {} })); return new Promise((res, rej) => { pending.set(id, { res, rej }); setTimeout(() => { if (pending.has(id)) { pending.delete(id); rej(new Error('timeout ' + m)); } }, 20000); }); }
async function ev(e) { const r = await send('Runtime.evaluate', { expression: e, returnByValue: true, awaitPromise: true }); if (r.exceptionDetails) throw new Error(r.exceptionDetails.text); return r.result.value; }
async function goto(u) { await send('Page.navigate', { url: 'about:blank' }); await wait(200); await send('Page.navigate', { url: u }); for (let i = 0; i < 40; i++) { try { if (await ev('document.readyState') === 'complete') break; } catch (e) { } await wait(400); } await wait(1400); }
async function setFile(sel, path) {
  const { root } = await send('DOM.getDocument', { depth: 0 });
  const { nodeId } = await send('DOM.querySelector', { nodeId: root.nodeId, selector: sel });
  console.log('   ' + sel + ' nodeId=' + nodeId);
  await send('DOM.setFileInputFiles', { files: [path], nodeId });
  await wait(1500);
}
(async () => {
  const chrome = spawn(CHROME, ['--headless=new', '--remote-debugging-port=' + PORT, '--no-sandbox', '--disable-gpu', '--remote-allow-origins=*', '--window-size=1280,900', '--no-proxy-server', '--user-data-dir=/tmp/cbuddy-diag-' + Date.now()], { stdio: 'ignore' });
  let list = null;
  for (let i = 0; i < 20 && !list; i++) { await wait(1000); list = await new Promise(res => { const q = http.get('http://127.0.0.1:' + PORT + '/json/list', r => { let b = ''; r.on('data', d => b += d); r.on('end', () => res(JSON.parse(b))); }); q.on('error', () => res(null)); }); }
  ws = new WebSocket(list.find(t => t.type === 'page').webSocketDebuggerUrl, { perMessageDeflate: false });
  ws.on('message', raw => { const o = JSON.parse(raw); if (o.id && pending.has(o.id)) { const p = pending.get(o.id); pending.delete(o.id); (o.error ? p.rej(new Error(o.error.message)) : p.res(o.result)); } });
  await new Promise(r => ws.on('open', r));
  await send('Runtime.enable'); await send('Page.enable'); await send('DOM.enable');
  await send('Emulation.setDeviceMetricsOverride', { width: 1280, height: 900, deviceScaleFactor: 1, mobile: false });

  for (const u of ['/translate.html', '/clean.html']) {
    console.log('=== ' + u + ' ===');
    await goto(BASE + u);
    const before = await ev(`JSON.stringify({files:!!document.querySelector('#file'), val:(document.querySelector('#file')||{}).value||''})`);
    console.log('   上传前: ' + before);
    await setFile('#file', SRC);
    const after = await ev(`JSON.stringify({
      val:(document.querySelector('#file')||{}).value||'',
      fl:(document.querySelector('#file')||{}).files ? document.querySelector('#file').files.length : -1,
      fname:(document.getElementById('fname')||{}).textContent||'(无#fname)',
      body:document.body.innerText.slice(0,300)})`);
    console.log('   上传后: ' + after);
    /* 翻译页的条目容器类名到底是什么 */
    const cls = await ev(`JSON.stringify((function(){
      var out=[];
      Array.prototype.forEach.call(document.querySelectorAll('[class*="cue"],[class*="row"],[class*="item"],[class*="line"]'), function(el){
        var c=el.className; if(typeof c==='string'&&out.indexOf(c)<0&&out.length<14) out.push(c);
      }); return out;})())`);
    console.log('   可能容器类名: ' + cls);
    const rr = await send('Page.captureScreenshot', { format: 'png' });
    const f = '/tmp/diag' + u.replace(/\W/g, '_') + '.png';
    fs.writeFileSync(f, Buffer.from(rr.data, 'base64'));
    console.log('   截图: ' + f);
  }
  ws.close(); chrome.kill(); process.exit(0);
})().catch(e => { console.error('崩了', e.message); process.exit(1); });
