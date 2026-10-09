/* v0.9.257 本地实测：三页接入 site-nav.js（顶部工具导航 + 主页三卡）
   用法：先 `PORT=3098 node server.js`，手动起 9333 的 headless Chrome，然后 node _chk258.js */
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');
const http = require('http');
const PORT = 9333, BASE = 'http://127.0.0.1:3098';
let P = 0, F = 0;
const ok = (c, m, x) => { c ? P++ : F++; console.log((c ? '  ✓ ' : '  ✗ ') + m + (x !== undefined ? '  → ' + x : '')); };
const wait = ms => new Promise(r => setTimeout(r, ms));
function J(p){ return new Promise((res, rej) => { const r = http.request({ host:'127.0.0.1', port:PORT, path:p, method:'PUT', headers:{Host:'127.0.0.1:'+PORT} }, x => { let d=''; x.on('data',c=>d+=c); x.on('end',()=>{ try{ res(JSON.parse(d)); }catch(e){ rej(new Error(d.slice(0,200))); } }); }); r.on('error', rej); r.end(); }); }

const DIRTY = [
  '1', '00:00:01,000 --> 00:00:03,000', '<i>Hello there</i>', '',
  '2', '00:00:04,000 --> 00:00:06,000', '[脚步声] GEORGE: 夏天真热', '',
  '3', '00:00:07,000 --> 00:00:09,000', '本字幕由 XX 字幕组提供，仅供学习交流', '',
  '4', '00:00:10,000 --> 00:00:12,000', 'THIS IS ALL CAPS TEXT', '',
  '5', '00:00:13,000 --> 00:00:15,000', '', ''
].join('\n');

async function open(path) {
  const v = await J('/json/new?' + encodeURIComponent(BASE + path));
  const ws = new WebSocket(v.webSocketDebuggerUrl, { perMessageDeflate: false });
  let id = 0; const wt = new Map(); const errs = [];
  await new Promise(r => ws.on('open', r));
  ws.on('message', m => { const g = JSON.parse(m);
    if (g.id && wt.has(g.id)) { const q = wt.get(g.id); wt.delete(g.id); g.error ? q.rej(new Error(JSON.stringify(g.error))) : q.res(g.result); }
    if (g.method === 'Runtime.exceptionThrown') errs.push(((g.params.exceptionDetails.exception||{}).description) || g.params.exceptionDetails.text); });
  const send = (m, p) => new Promise((res, rej) => { const i = ++id; wt.set(i, { res, rej }); ws.send(JSON.stringify({ id:i, method:m, params:p||{} })); });
  const ev = async e => { const r = await send('Runtime.evaluate', { expression:e, returnByValue:true, awaitPromise:true });
    if (r.exceptionDetails) throw new Error((r.exceptionDetails.exception||{}).description || r.exceptionDetails.text); return r.result.value; };
  await send('Page.enable'); await send('Runtime.enable');
  await send('Network.setCacheDisabled', { cacheDisabled: true });
  await send('Emulation.setDeviceMetricsOverride', { width:1280, height:1000, deviceScaleFactor:1, mobile:false });
  await wait(2000);
  return { ws, ev, errs, close: () => ws.close() };
}

(async () => {
  /* ============ ① index.html（字幕翻译） ============ */
  console.log('\n— ① index.html 顶部导航 —');
  let t = await open('/index.html');
  ok(t.errs.length === 0, '无 JS 错误', t.errs[0] || '0');
  ok(await t.ev("document.querySelectorAll('#siteNav a.snav-pill').length") === 3, '顶部三个工具胶囊', await t.ev("document.querySelectorAll('#siteNav a.snav-pill').length"));
  ok(await t.ev("[...document.querySelectorAll('#siteNav a.snav-pill')].map(a=>a.textContent.trim()).join('|')") === '字幕翻译|字幕清洗|特效字幕',
     '胶囊文案 = 字幕翻译 / 字幕清洗 / 特效字幕', await t.ev("[...document.querySelectorAll('#siteNav a.snav-pill')].map(a=>a.textContent.trim()).join('|')"));
  ok(await t.ev("document.querySelector('#siteNav a.snav-pill.on').textContent.trim()") === '字幕翻译', '当前页高亮「字幕翻译」');
  ok(await t.ev("document.querySelectorAll('#siteNav a[aria-current=page]').length") === 1, '只有一个 aria-current');
  ok(await t.ev("!/使用指南|开源仓库/.test(document.querySelector('.lnav').textContent)"), '顶部已去掉「使用指南 / 开源仓库」（页脚那条保留）',
     await t.ev("document.querySelector('.lnav').textContent.replace(/\\s+/g,' ').trim()"));
  ok(await t.ev("!!document.getElementById('uiLang2')"), '语言选择器保留');

  console.log('\n— ② index.html 主页三卡 —');
  ok(await t.ev("document.querySelectorAll('#toolCards .snav-card').length") === 3, '主页三张工具卡', await t.ev("document.querySelectorAll('#toolCards .snav-card').length"));
  ok(await t.ev("[...document.querySelectorAll('#toolCards .snav-n')].map(e=>e.firstChild.textContent.trim()).join('|')") === '字幕翻译|字幕清洗|特效字幕', '卡片顺序与导航一致');
  ok(await t.ev("document.querySelectorAll('#toolCards .snav-card.cur').length") === 1 &&
     /当前页/.test(await t.ev("document.querySelector('#toolCards .snav-card.cur').textContent")), '当前页卡标「当前页」且不可点');
  ok(await t.ev("document.querySelector('#toolCards .snav-card.cur').tagName") === 'DIV', '当前页卡不是链接（点了不会跳走）');
  ok(await t.ev("[...document.querySelectorAll('#toolCards a.snav-card')].map(a=>a.getAttribute('href')).join('|')") === '/clean.html|/merge.html',
     '另两张卡指向清洗页与特效页', await t.ev("[...document.querySelectorAll('#toolCards a.snav-card')].map(a=>a.getAttribute('href')).join('|')"));
  ok(await t.ev("document.getElementById('toolCards').getBoundingClientRect().top < document.querySelector('.stats-band').getBoundingClientRect().top"),
     '三卡在数字带之前（首屏可见）');

  console.log('\n— ③ index.html 切英文 —');
  await t.ev("(function(){var u=document.getElementById('uiLang2');u.value='en';u.dispatchEvent(new Event('change'));return 1})()");
  await wait(600);
  ok(await t.ev("[...document.querySelectorAll('#siteNav a.snav-pill')].map(a=>a.textContent.trim()).join('|')") === 'Translate|Clean Up|Styled Subtitles',
     '导航随界面语言变英文', await t.ev("[...document.querySelectorAll('#siteNav a.snav-pill')].map(a=>a.textContent.trim()).join('|')"));
  ok(/You are here/.test(await t.ev("document.querySelector('#toolCards .snav-card.cur').textContent")), '卡片「当前页」标记也变英文');
  await t.ev("(function(){var u=document.getElementById('uiLang2');u.value='zh-CN';u.dispatchEvent(new Event('change'));return 1})()");
  await wait(500);

  console.log('\n— ④ index.html 原有功能没坏 —');
  ok(await t.ev("!!document.getElementById('dropzone')"), '上传区仍在');
  ok(await t.ev("!!document.getElementById('altDemo')"), '示例入口仍在');
  await t.ev("document.getElementById('altDemo').click()");
  await wait(1500);
  ok(await t.ev("!document.getElementById('viewWorkspace').hidden"), '载入示例仍能进入工作台');
  ok(t.errs.length === 0, '走完一遍仍无 JS 错误', t.errs[0] || '0');
  t.close(); await wait(300);

  /* ============ ⑤ merge.html（特效字幕） ============ */
  console.log('\n— ⑤ merge.html —');
  t = await open('/merge.html');
  ok(t.errs.length === 0, '无 JS 错误', t.errs[0] || '0');
  ok(await t.ev("document.querySelectorAll('#siteNav a.snav-pill').length") === 3, '顶部三个工具胶囊');
  ok(await t.ev("document.querySelector('#siteNav a.snav-pill.on').textContent.trim()") === '特效字幕', '当前页高亮「特效字幕」');
  ok(await t.ev("!/返回翻译工具/.test(document.querySelector('.lnav').textContent)"), '旧的「返回翻译工具」已移除');
  ok(/加特效/.test(await t.ev("document.querySelector('.hero h1').textContent")), '页面标题改成特效口径', await t.ev("document.querySelector('.hero h1').textContent"));
  ok(await t.ev("!!window.MergeCore"), 'MergeCore 正常加载');
  ok(await t.ev("!!document.getElementById('dz')||!!document.getElementById('drop')||document.querySelectorAll('input[type=file]').length>0"), '上传控件仍在');
  ok(t.errs.length === 0, '走完一遍无 JS 错误', t.errs[0] || '0');
  t.close(); await wait(300);

  /* ============ ⑥ clean.html（字幕清洗） ============ */
  console.log('\n— ⑥ clean.html —');
  t = await open('/clean.html');
  ok(t.errs.length === 0, '无 JS 错误', t.errs[0] || '0');
  ok(await t.ev("document.querySelectorAll('#siteNav a.snav-pill').length") === 3, '顶部三个工具胶囊');
  ok(await t.ev("document.querySelector('#siteNav a.snav-pill.on').textContent.trim()") === '字幕清洗', '当前页高亮「字幕清洗」');
  await t.ev(`(function(){var p=document.getElementById('paste');p.value=${JSON.stringify(DIRTY)};
    p.dispatchEvent(new Event('input',{bubbles:true}));return 1})()`);
  await wait(900);
  ok(await t.ev("document.querySelectorAll('tbody tr').length") > 0, '清洗功能仍正常（有结果行）', await t.ev("document.querySelectorAll('tbody tr').length"));
  ok(t.errs.length === 0, '走完一遍无 JS 错误', t.errs[0] || '0');
  t.close();

  console.log('\n' + (F === 0 ? '✅ 全绿' : '❌ 有红') + '  ' + P + '/' + F);
  process.exit(F === 0 ? 0 : 1);
})().catch(e => { console.error('crash', e.message || e); process.exit(1); });
