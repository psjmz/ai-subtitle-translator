/* v0.9.256 本地实测：点样式槽（胶囊 / 小铅笔）→ 右侧画面自动切到「这个槽」；
   再点一次取消选中 → 回「成片」。
   用法：先 `PORT=3098 node server.js`，再手动起 9333 的 headless Chrome，然后 node _chk256.js */
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');
const http = require('http');
const fs = require('fs');
const PORT = 9333, BASE = 'http://127.0.0.1:3098';
const OUT = '/Users/jp/WorkBuddy/2026-09-04-00-29-54/';
let P = 0, F = 0;
const ok = (c, m, x) => { c ? P++ : F++; console.log((c ? '  ✓ ' : '  ✗ ') + m + (x !== undefined ? '  → ' + x : '')); };
const wait = ms => new Promise(r => setTimeout(r, ms));
function J(p){ return new Promise((res, rej) => { const r = http.request({ host:'127.0.0.1', port:PORT, path:p, method:'PUT' }, x => { let d=''; x.on('data',c=>d+=c); x.on('end',()=>{ try{ res(JSON.parse(d)); }catch(e){ rej(new Error(d.slice(0,200))); } }); }); r.on('error', rej); r.end(); }); }

(async () => {
  const v = await J('/json/new?' + encodeURIComponent(BASE + '/merge.html'));
  const ws = new WebSocket(v.webSocketDebuggerUrl, { perMessageDeflate: false });
  let id = 0; const wt = new Map(); const errs = [];
  await new Promise(r => ws.on('open', r));
  ws.on('message', m => { const g = JSON.parse(m);
    if (g.id && wt.has(g.id)) { const q = wt.get(g.id); wt.delete(g.id); g.error ? q.rej(new Error(JSON.stringify(g.error))) : q.res(g.result); }
    if (g.method === 'Runtime.exceptionThrown') errs.push(((g.params.exceptionDetails.exception||{}).description) || g.params.exceptionDetails.text); });
  const send = (m, p) => new Promise((res, rej) => { const i = ++id; wt.set(i, { res, rej }); ws.send(JSON.stringify({ id:i, method:m, params:p||{} })); });
  const ev = async e => { const r = await send('Runtime.evaluate', { expression:e, returnByValue:true, awaitPromise:true });
    if (r.exceptionDetails) throw new Error((r.exceptionDetails.exception||{}).description || r.exceptionDetails.text); return r.result.value; };
  await send('Page.enable'); await send('Runtime.enable'); await send('Input.enable').catch(()=>{});
  await send('Network.setCacheDisabled', { cacheDisabled: true });
  await send('Emulation.setDeviceMetricsOverride', { width:1440, height:1000, deviceScaleFactor:1, mobile:false });
  await wait(2500);

  async function shot(file, sel, extraH, scale) {
    const rect = await ev(`JSON.stringify((function(){var e=document.querySelector(${JSON.stringify(sel)});if(!e)return null;
      e.scrollIntoView({block:'center'});
      var r=e.getBoundingClientRect();   /* ⚠️ 滚动之后重新量；clip 用文档坐标 */
      return {x:Math.max(0,Math.round(r.left+window.scrollX-14)),y:Math.max(0,Math.round(r.top+window.scrollY-14)),
              width:Math.round(r.width+28),height:Math.round(r.height+28+${extraH||0})};})())`);
    if (!rect || rect === 'null') { console.log('   （跳过 ' + file + '）'); return; }
    await wait(500);
    const r = await send('Page.captureScreenshot', { format:'png', clip: Object.assign({ scale: scale || 2 }, JSON.parse(rect)) });
    fs.writeFileSync(OUT + file, Buffer.from(r.data, 'base64'));
    console.log('   截图 ' + file);
  }

  /* 读一次「现在画面画的是谁」——视角 + 文本 + 标签 */
  const view = () => ev(`JSON.stringify({视角:pvView(), 槽:pvCtxSlot(),
    原文:document.getElementById('assPvLine1').textContent,
    译文:document.getElementById('assPvLine2').textContent,
    标签:document.getElementById('pvTag').textContent.slice(-14),
    cur:S.style.cur, filter:S.filter.slot,
    亮着:(document.querySelector('#pvSeg .segbtn.on')||{getAttribute:function(){return ''}}).getAttribute('data-pv')})`);

  console.log('\n— ① 版号与起点 —');
  const ver = await ev("document.querySelector('.ver').textContent");
  ok(/v0\.9\.267/.test(String(ver)), '页眉版号已到 v0.9.265', ver);
  const v0 = JSON.parse(await view());
  console.log('   ', JSON.stringify(v0));
  ok(v0.视角 === 'movie', '起点是「成片」视角', v0.视角);
  ok(!/♪/.test(v0.原文), '成片画面是用户/示例自己的字幕', v0.原文);

  console.log('\n— ② 点胶囊（选中）→ 画面自动切到这个槽 —');
  await ev(`(function(){document.querySelector('#slotBar [data-slot="lyric"]').click();return 1})()`); await wait(700);
  const a1 = JSON.parse(await view());
  console.log('   ', JSON.stringify(a1));
  ok(a1.filter === 'lyric' && a1.cur === 'lyric', '胶囊选中（筛选 + 编辑目标都到位，253 的联动没丢）', a1.filter + '/' + a1.cur);
  ok(a1.视角 === 'slot', '⭐ 画面自动切到「这个槽」视角', a1.视角);
  ok(a1.亮着 === 'slot', '视角条上「这个槽」点亮', a1.亮着);
  ok(/♪/.test(a1.原文) && /♪/.test(a1.译文), '⭐ 画面换成歌词槽的示意文本', a1.原文);
  ok(/歌词/.test(a1.标签), '标签标着歌词', a1.标签);
  await shot('merge256-A-点胶囊自动切.png', '#pvCard', 0, 2);

  console.log('\n— ③ 再点一次（取消选中）→ 回「成片」 —');
  await ev(`(function(){document.querySelector('#slotBar [data-slot="lyric"]').click();return 1})()`); await wait(700);
  const a2 = JSON.parse(await view());
  console.log('   ', JSON.stringify(a2));
  ok(a2.filter === '', '再点一下取消筛选', a2.filter);
  ok(a2.cur === 'lyric', '编辑目标仍是歌词（选中没被取消掉）', a2.cur);
  ok(a2.视角 === 'movie', '⭐ 取消选中 → 视角自动回「成片」', a2.视角);
  ok(!/♪/.test(a2.原文), '⭐ 画面还回用户自己的字幕', a2.原文);
  ok(a2.亮着 === 'movie', '视角条上「成片」点亮', a2.亮着);

  console.log('\n— ④ 手动切过「成片」之后，再点别的槽照样跟着切 —');
  await ev(`(function(){setPvView('movie');document.querySelector('#slotBar [data-slot="lyric"]').click();return 1})()`);
  await wait(600);
  const m1 = JSON.parse(await view());
  ok(m1.视角 === 'slot' && /♪/.test(m1.原文), '选了歌词 → 切过去', m1.视角);
  await ev(`(function(){setPvView('movie');return 1})()`); await wait(300);
  await ev(`(function(){document.querySelector('#slotBar [data-slot="sfx"]').click();return 1})()`); await wait(700);
  const m2 = JSON.parse(await view());
  console.log('   ', JSON.stringify(m2));
  ok(m2.视角 === 'slot' && /\[/.test(m2.原文), '⭐ 点「音效」照样切成它的示意文本（不会因为上次手动选过就不动）', m2.原文);
  ok(/音效/.test(m2.标签), '标签跟着变音效', m2.标签);
  await ev(`(function(){document.querySelector('#slotBar [data-slot="sfx"]').click();return 1})()`); await wait(500);

  console.log('\n— ⑤ 小铅笔 → 也切过去，且不碰筛选 —');
  await ev(`(function(){ensureStyle();S.filter.slot='';renderReport();
    document.querySelector('#slotBar [data-slot="narration"]').click();return 1})()`); await wait(600);
  const p0 = JSON.parse(await view());
  ok(p0.filter === 'narration', '先把筛选停在旁白', p0.filter);
  await ev(`(function(){document.querySelector('#slotBar [data-slot-edit="emphasis"]').click();return 1})()`); await wait(700);
  const p1 = JSON.parse(await view());
  console.log('   ', JSON.stringify(p1));
  ok(p1.cur === 'emphasis', '铅笔把编辑目标切到强调', p1.cur);
  ok(p1.视角 === 'slot' && /强调/.test(p1.标签), '⭐ 铅笔也把画面切过去（标签 = 强调）', p1.标签);
  ok(p1.filter === 'narration', '铅笔仍不碰筛选（筛选还停在旁白）', p1.filter);
  ok(await ev("document.getElementById('slotEdit').open") === true, '铅笔照旧展开编辑面板');

  console.log('\n— ⑥ 贴底条的槽按钮**不算**触发点（不该跟着跳视角） —');
  await ev(`(function(){setPvView('movie');document.getElementById('selDock');return 1})()`); await wait(300);
  await ev(`(function(){var cb=document.querySelector('#repRows input[data-ri]');if(cb)cb.click();return 1})()`); await wait(600);
  const dock = await ev(`(function(){var b=document.querySelector('#selDock [data-dock-slot]');return b?b.getAttribute('data-dock-slot'):null})()`);
  console.log('   贴底条槽按钮 →', dock);
  if (dock) {
    await ev(`(function(){document.querySelector('#selDock [data-dock-slot]').click();return 1})()`); await wait(700);
    const d1 = JSON.parse(await view());
    ok(d1.视角 === 'movie', '⭐ 把槽套给选中行时画面不跳（用户没要求看这个槽）', d1.视角);
    await ev(`(function(){var b=document.querySelector('#selDock [data-dock-clr]');if(b)b.click();return 1})()`); await wait(400);
  } else {
    ok(false, '贴底条里没找到槽按钮（勾选后应出现）', dock);
  }

  console.log('\n— ⑦ SRT（没画面可画）下点胶囊：不崩、给说明 —');
  await ev(`(function(){var s=document.getElementById('expFmt');s.value='srt';s.dispatchEvent(new Event('change',{bubbles:true}));return 1})()`);
  await wait(700);
  await ev(`(function(){setPvView('movie');document.querySelector('#slotBar [data-slot="lyric"]').click();return 1})()`); await wait(700);
  const s1 = JSON.parse(await ev(`JSON.stringify({视角:pvView(),
    视角条:getComputedStyle(document.getElementById('pvSeg')).display,
    说明:getComputedStyle(document.getElementById('pvNone')).display})`));
  console.log('   ', JSON.stringify(s1));
  ok(s1.视角 === 'slot', '视角状态照样记成这个槽', s1.视角);
  /* v0.9.265：SRT 档位现在有文本预览，那行「没有画面」的说明不再出现 */
  ok(s1.视角条 === 'none' && s1.说明 === 'none', '但没画面可画 → 视角条收起（265 起由文本预览顶上）', s1.视角条 + '/' + s1.说明);
  await ev(`(function(){var s=document.getElementById('expFmt');s.value='stack';s.dispatchEvent(new Event('change',{bubbles:true}));return 1})()`);
  await wait(700);
  const s2 = JSON.parse(await ev(`JSON.stringify({视角条:getComputedStyle(document.getElementById('pvSeg')).display, 视角:pvView()})`));
  ok(s2.视角条 !== 'none', '切回 ASS → 视角条回来', s2.视角条);

  console.log('\n— ⑧ 无 JS 错误 —');
  ok(errs.length === 0, '整轮没有未捕获异常', errs.slice(0,2).join(' | '));

  console.log('\n合计 ' + P + ' 通过 / ' + F + ' 失败');
  process.exit(F ? 1 : 0);
})().catch(e => { console.error('ERR', e.message); process.exit(1); });
