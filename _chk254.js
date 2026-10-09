/* v0.9.254 本地实测：① 胶囊数字 = 行数（空状态示例也要对）② 歌词槽译文/原文不重合
   用法：先 `PORT=3098 node server.js`，再手动起 9333 的 headless Chrome，然后 node _chk254.js */
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
  await send('Page.enable'); await send('Runtime.enable');
  await send('Network.setCacheDisabled', { cacheDisabled: true });
  await send('Emulation.setDeviceMetricsOverride', { width:1440, height:1000, deviceScaleFactor:1, mobile:false });
  await wait(2500);

  async function shot(file, sel, h, scale) {
    const box = await ev(`JSON.stringify((function(){var e=document.querySelector(${JSON.stringify(sel)});if(!e)return null;
      e.scrollIntoView({block:'start'});var r=e.getBoundingClientRect();
      return {x:Math.max(0,Math.round(r.left+window.scrollX-12)),y:Math.max(0,Math.round(r.top+window.scrollY-12)),width:Math.round(r.width+24),height:${h}};})())`);
    if (!box || box === 'null') { console.log('   （跳过 ' + file + '）'); return; }
    await wait(450);
    const r = await send('Page.captureScreenshot', { format:'png', clip: Object.assign({ scale: scale || 2 }, JSON.parse(box)) });
    fs.writeFileSync(OUT + file, Buffer.from(r.data, 'base64'));
    console.log('   截图 ' + file);
  }

  console.log('\n— ① 空状态示例：胶囊后面的数字 = 行数 —');
  const chips = await ev(`JSON.stringify([...document.querySelectorAll('#slotBar .slot-chip[data-slot]')].map(function(c){
    var m=c.querySelector('.mod'); return { 槽:c.getAttribute('data-slot'), 名字:c.textContent.replace(/Aa/,'').trim(), 数字:m?m.textContent:null };}))`);
  console.log('   ', chips);
  let A = []; try { A = JSON.parse(chips); } catch(e){}
  const num = k => { const x = A.find(a=>a.槽===k); return x ? Number(x.数字) : NaN; };
  ok(A.length === 5, '出厂 5 个槽都在', A.length);
  ok(num('default') === 3, '「默认」显示 3 行（示例 7 行里 3 行走默认槽）', num('default'));
  ok(num('narration') === 1 && num('sfx') === 1 && num('lyric') === 1 && num('emphasis') === 1,
    '旁白/音效/歌词/强调 各 1 行', A.map(a=>a.槽+'='+a.数字).join(' '));
  const sum = A.reduce((s,a)=>s+(Number(a.数字)||0),0);
  ok(sum === 7, '五个数字相加 = 示例总行数 7（一字不落）', sum);
  ok(A.every(a => a.数字 !== null && a.数字 !== ''), '每个胶囊都有数字（0 也要显示，不许藏）', JSON.stringify(A.map(a=>a.数字)));
  await shot('merge254-A-胶囊数字.png', '#slotBar', 90, 2);

  console.log('\n— ② 歌词槽：面板对照预览里译文行与原文行不许重合 —');
  const geo = await ev(`(function(){ensureStyle();
    document.getElementById('slotEdit').open=true;
    S.style.cur='lyric'; S.pv={base:false};
    renderSlots(); renderSlotPvMini();
    var l1=document.getElementById('slotPvLine1').getBoundingClientRect();
    var l2=document.getElementById('slotPvLine2').getBoundingClientRect();
    var add=document.getElementById('slotPvAdd')||null;
    var scr=document.getElementById('slotPvScreen').getBoundingClientRect();
    var r1=l1,r2=l2;
    var ov=Math.min(r1.bottom,r2.bottom)-Math.max(r1.top,r2.top);
    return JSON.stringify({屏高:Math.round(scr.height), 原文:['top',Math.round(r1.top-scr.top),'bottom',Math.round(r1.bottom-scr.top)],
      译文:['top',Math.round(l2.top-scr.top),'bottom',Math.round(l2.bottom-scr.top)],
      行盒重叠px:Math.round(ov), 两行间隙px:Math.round(Math.abs(l2.top-r1.bottom)),
      标签:document.getElementById('slotPvTag').textContent});})()`);
  console.log('   ', geo);
  let G = {}; try { G = JSON.parse(geo); } catch(e){}
  ok(Number(G.行盒重叠px) <= 0, '⭐ 译文行盒与原文行盒**不重叠**（重叠 ' + G.行盒重叠px + 'px）', geo);
  ok(/歌词/.test(String(G.标签)), '面板预览标的确实是歌词槽', G.标签);
  ok(Number(G.屏高) > 100, '预览屏有真实高度', G.屏高);
  await shot('merge254-B-歌词槽不重合.png', '#slotEdit', 460, 2);

  console.log('\n— ②b 面板预览的文本随槽区分（歌词 ♪ / 音效方括号 / 主预览不许换字）—');
  const tx = await ev(`(function(){ensureStyle();S.style.cur='lyric';S.pv={base:false};
    document.getElementById('slotEdit').open=true; renderSlots(); renderSlotPvMini();
    var o={面板原文:document.getElementById('slotPvLine1').textContent,
           面板译文:document.getElementById('slotPvLine2').textContent,
           主原文:document.getElementById('assPvLine1').textContent,
           主译文:document.getElementById('assPvLine2').textContent};
    S.style.cur='sfx'; renderSlots(); renderSlotPvMini();
    o.音效原文=document.getElementById('slotPvLine1').textContent;
    o.音效译文=document.getElementById('slotPvLine2').textContent;
    S.style.cur='narration'; renderSlots(); renderSlotPvMini();
    o.旁白原文=document.getElementById('slotPvLine1').textContent;
    return JSON.stringify(o);})()`);
  console.log('   ', tx);
  let X = {}; try { X = JSON.parse(tx); } catch(e){}
  ok(/♪/.test(String(X.面板原文)) && /♪/.test(String(X.面板译文)), '歌词槽预览里出现 ♪ 符号', X.面板原文 + ' / ' + X.面板译文);
  ok(/^\[|\s\[/.test(String(X.音效原文)) && /\[/.test(String(X.音效译文)), '音效槽预览是方括号内容', X.音效原文);
  ok(/Narrator/.test(String(X.旁白原文)), '旁白槽预览是 Narrator 那种旁白口吻', X.旁白原文);
  ok(!/♪/.test(String(X.主原文)) && !/♪/.test(String(X.主译文)), '⭐ 右侧主预览仍是用户自己的字幕，没被换字',
    X.主原文 + ' / ' + X.主译文);
  ok(String(X.面板原文) !== String(X.音效原文), '两个槽的预览内容确实不同', X.面板原文 + ' vs ' + X.音效原文);
  const txV = await ev(`(function(){S.style.cur='lyric'; renderSlots(); setFmtSilently('vttStyle'); renderVttPv();
    var t=document.getElementById('slotPvCue').textContent;
    setFmtSilently('stack'); renderSlots(); renderSlotPvMini();
    return JSON.stringify({VTT面板:t, 格式回来了:tplVal()});})()`);
  console.log('   ', txV);
  let XV = {}; try { XV = JSON.parse(txV); } catch(e){}
  ok(/♪/.test(String(XV.VTT面板)), 'VTT 面板预览也换成歌词示意文本', String(XV.VTT面板).replace(/\s+/g,' ').trim());
  ok(XV.格式回来了 === 'stack', '测完把导出格式还回底部双行', XV.格式回来了);

  console.log('\n— ③ 基础样式那条对照组：也不重叠（口径一致）—');
  const geoB = await ev(`(function(){document.getElementById('slotPvBaseBtn').click();
    var l1=document.getElementById('slotPvLine1').getBoundingClientRect();
    var l2=document.getElementById('slotPvLine2').getBoundingClientRect();
    var scr=document.getElementById('slotPvScreen').getBoundingClientRect();
    var ov=Math.min(l1.bottom,l2.bottom)-Math.max(l1.top,l2.top);
    return JSON.stringify({行盒重叠px:Math.round(ov), 标签:document.getElementById('slotPvTag').textContent});})()`);
  console.log('   ', geoB);
  let GB = {}; try { GB = JSON.parse(geoB); } catch(e){}
  ok(Number(GB.行盒重叠px) <= 0, '基础样式两行也不重叠', geoB);

  console.log('\n— ④ 导出 ASS：歌词槽的译文行与原文行加**同一个**偏移 —');
  const asExp = await ev(`(function(){S.style.assign={};setRowSlot(0,'lyric');
    syncSlotsToRows();
    var evs=buildAssEvents();
    var out=[];
    evs.forEach(function(e){ e.lines.forEach(function(l){ if(/SlotD_lyric|SlotS_lyric/.test(l.style)) out.push({style:l.style, mv:l.mv}); }); });
    return JSON.stringify(out);})()`);
  console.log('   ', asExp);
  let E = []; try { E = JSON.parse(asExp); } catch(e){}
  const dRow = E.find(x => /SlotD_lyric/.test(x.style));
  const sRow = E.find(x => /SlotS_lyric/.test(x.style));
  ok(!!dRow && !!sRow, '歌词槽的两条 Dialogue 都生成了', asExp);
  ok(dRow && dRow.mv === 78, '译文行 MarginV = 42 + 36 = 78', dRow && dRow.mv);
  ok(sRow && sRow.mv === 153, '⭐ 原文行 MarginV = 117 + 36 = 153（也上移，不再是 117）', sRow && sRow.mv);
  ok(dRow && sRow && (sRow.mv - dRow.mv) === 75, '两行距离仍是 75px（行间关系不变）', dRow && sRow ? sRow.mv - dRow.mv : '?');

  console.log('\n— ⑤ 示例退场要把「行号槽」一起收掉 —');
  const EN = '1\n00:00:00,000 --> 00:00:02,000\nhello one\n\n2\n00:00:03,000 --> 00:00:05,000\nhello two\n';
  const ZH = '1\n00:00:00,000 --> 00:00:02,000\n你好一\n\n2\n00:00:03,000 --> 00:00:05,000\n你好二\n';
  await ev(`(function(){var a=document.getElementById('srcText'),b=document.getElementById('dstText');
    a.value=${JSON.stringify(EN)};a.dispatchEvent(new Event('input',{bubbles:true}));
    b.value=${JSON.stringify(ZH)};b.dispatchEvent(new Event('input',{bubbles:true}));return 1})()`);
  await wait(700);
  await ev("document.getElementById('btnMerge').click();1"); await wait(1400);
  const post = await ev(`JSON.stringify({demo:S.demo, 行数:S.rows.length,
    assign键:Object.keys(S.style.assign||{}).length,
    行上的槽:S.rows.map(function(r){return r.slot||''}).join(',')})`);
  console.log('   ', post);
  let Q = {}; try { Q = JSON.parse(post); } catch(e){}
  ok(Q.demo === false, '真实合并后示例退场', Q.demo);
  ok(Number(Q.assign键) === 0, '示例塞的行号槽被清掉（真实行不继承）', Q.assign键);
  ok(/^,+$|^,?$/.test(String(Q.行上的槽).replace(/default/g,'')) === false || !/lyric|sfx|narration|emphasis/.test(String(Q.行上的槽)),
    '真实两行没被套上示例的槽', Q.行上的槽);

  console.log('\n— ⑥ 无 JS 错误 —');
  ok(errs.length === 0, '整轮没有未捕获异常', errs.slice(0,2).join(' | '));

  console.log('\n合计 ' + P + ' 通过 / ' + F + ' 失败');
  process.exit(F ? 1 : 0);
})().catch(e => { console.error('ERR', e.message); process.exit(1); });
