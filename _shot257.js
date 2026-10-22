/* v0.9.257 交付截图：清洗器初始态 + 灌入脏字幕后的结果卡
   用法：先起 3098 server 与 9333 Chrome，再 node _shot257.js */
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');
const http = require('http');
const fs = require('fs');
const PORT = 9333, BASE = 'http://127.0.0.1:3098';
const OUT = '/Users/jp/WorkBuddy/2026-09-04-00-29-54/';
const wait = ms => new Promise(r => setTimeout(r, ms));
function J(p){ return new Promise((res, rej) => { const r = http.request({ host:'127.0.0.1', port:PORT, path:p, method:'PUT', headers:{Host:'127.0.0.1:'+PORT} }, x => { let d=''; x.on('data',c=>d+=c); x.on('end',()=>{ try{ res(JSON.parse(d)); }catch(e){ rej(new Error(d.slice(0,200))); } }); }); r.on('error', rej); r.end(); }); }

const DIRTY = [
  '1', '00:00:01,000 --> 00:00:03,000', '<i>Hello there</i>', '',
  '2', '00:00:04,000 --> 00:00:06,000', '[脚步声] GEORGE: 夏天真热', '',
  '3', '00:00:07,000 --> 00:00:09,000', '{\\an8}本字幕由 XX 字幕组提供，仅供学习交流', '',
  '4', '00:00:10,000 --> 00:00:12,000', 'THIS IS ALL CAPS TEXT', '',
  '5', '00:00:13,000 --> 00:00:15,000', '', '',
  '6', '00:00:16,000 --> 00:00:18,000', 'Visit https://example.com for more', '',
  '7', '00:00:19,000 --> 00:00:21,000', '[电话铃声] 喂？是我。', '',
  '8', '00:00:22,000 --> 00:00:24,000', '正常的一句台词。', '',
  '9', '00:00:22,000 --> 00:00:24,000', '正常的一句台词。', ''
].join('\n');

(async () => {
  const v = await J('/json/new?' + encodeURIComponent(BASE + '/clean.html'));
  const ws = new WebSocket(v.webSocketDebuggerUrl, { perMessageDeflate: false });
  let id = 0; const wt = new Map();
  await new Promise(r => ws.on('open', r));
  ws.on('message', m => { const g = JSON.parse(m);
    if (g.id && wt.has(g.id)) { const q = wt.get(g.id); wt.delete(g.id); g.error ? q.rej(new Error(JSON.stringify(g.error))) : q.res(g.result); } });
  const send = (m, p) => new Promise((res, rej) => { const i = ++id; wt.set(i, { res, rej }); ws.send(JSON.stringify({ id:i, method:m, params:p||{} })); });
  const ev = async e => { const r = await send('Runtime.evaluate', { expression:e, returnByValue:true, awaitPromise:true });
    if (r.exceptionDetails) throw new Error((r.exceptionDetails.exception||{}).description || r.exceptionDetails.text); return r.result.value; };
  await send('Page.enable'); await send('Runtime.enable');
  await send('Network.setCacheDisabled', { cacheDisabled: true });
  await send('Emulation.setDeviceMetricsOverride', { width:1180, height:1000, deviceScaleFactor:1, mobile:false });
  await wait(2200);

  async function shot(file, sel, pad) {
    const rect = await ev(`JSON.stringify((function(){var e=document.querySelector(${JSON.stringify(sel)});if(!e)return null;
      e.scrollIntoView({block:'start'});
      var r=e.getBoundingClientRect();   /* ⚠️ 滚完之后再量；clip 用文档坐标 */
      return {x:Math.max(0,Math.round(r.left+window.scrollX-12)),y:Math.max(0,Math.round(r.top+window.scrollY-12)),
              width:Math.round(r.width+24),height:Math.round(r.height+24+${pad||0})};})())`);
    if (!rect || rect === 'null') { console.log('   跳过 ' + file); return; }
    await wait(500);
    const r = await send('Page.captureScreenshot', { format:'png', clip: Object.assign({ scale:2 }, JSON.parse(rect)) });
    fs.writeFileSync(OUT + file, Buffer.from(r.data, 'base64'));
    console.log('   截图 ' + file);
  }

  await shot('clean257-A-初始.png', '#upCard', 0);
  await shot('clean257-C-清洗项.png', '#optCard', 0);
  await ev(`(function(){var p=document.getElementById('paste');p.value=${JSON.stringify(DIRTY)};
    p.dispatchEvent(new Event('input',{bubbles:true}));return 1})()`);
  await wait(1000);
  await shot('clean257-B-清洗结果.png', '#repCard', 0);
  console.log('完成');
  ws.close(); process.exit(0);
})().catch(e => { console.error('崩了：', e.message); process.exit(1); });
