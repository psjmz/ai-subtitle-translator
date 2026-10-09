/* v0.9.251 本地实测：出厂「歌词」槽 dMV 由 70 降到 36 之后，
   默认模板（底部双行 dst42 / src117）下译文行不再压在原文行上。
   判据走真实运行态：① 导出 Dialogue 的 MarginV 字面值 ② 主预览两行的实测像素间距。
   用法：先 PORT=3098 node server.js，再 node _chk251.js（需 9333 上已有调试 Chrome） */
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');
const http = require('http');
const PORT = 9333, BASE = 'http://127.0.0.1:3098';
function J(p){return new Promise((res,rej)=>{const r=http.request({host:'127.0.0.1',port:PORT,path:p,method:'PUT'},x=>{let d='';x.on('data',c=>d+=c);x.on('end',()=>{try{res(JSON.parse(d))}catch(e){rej(new Error(d.slice(0,200)))}})});r.on('error',rej);r.end();});}
const wait = ms => new Promise(r => setTimeout(r, ms));
let P = 0, F = 0;
const ok = (c, m, extra) => { c ? P++ : F++; console.log((c ? '  ✓ ' : '  ✗ ') + m + (extra !== undefined ? '  → ' + extra : '')); };

(async () => {
  const v = await J('/json/new?' + encodeURIComponent(BASE + '/merge.html'));
  const ws = new WebSocket(v.webSocketDebuggerUrl, { perMessageDeflate: false });
  let id = 0; const wt = new Map();
  await new Promise(r => ws.on('open', r));
  ws.on('message', m => { const g = JSON.parse(m); if (g.id && wt.has(g.id)) { const q = wt.get(g.id); wt.delete(g.id); g.error ? q.rej(new Error(JSON.stringify(g.error))) : q.res(g.result); } });
  const send = (m, p) => new Promise((res, rej) => { const i = ++id; wt.set(i, { res, rej }); ws.send(JSON.stringify({ id: i, method: m, params: p || {} })); });
  const ev = async e => { const r = await send('Runtime.evaluate', { expression: e, returnByValue: true, awaitPromise: true }); if (r.exceptionDetails) throw new Error(r.exceptionDetails.text); return r.result.value; };
  await send('Page.enable'); await send('Runtime.enable');
  await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false });
  await wait(2300);

  const ts = s => String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0');
  let en = '', zh = '';
  for (let i = 1; i <= 6; i++) { const a = i * 2, b = i * 2 + 1;
    en += `${i}\n00:${ts(a)},000 --> 00:${ts(b)},000\nHello line ${i}\n\n`;
    zh += `${i}\n00:${ts(a)},000 --> 00:${ts(b)},000\n你好第 ${i} 行\n\n`; }
  await ev(`(function(){var a=document.getElementById('srcText'),b=document.getElementById('dstText');
    a.value=${JSON.stringify(en)};a.dispatchEvent(new Event('input',{bubbles:true}));
    b.value=${JSON.stringify(zh)};b.dispatchEvent(new Event('input',{bubbles:true}));return 1})()`);
  await wait(700);
  await ev("document.getElementById('btnMerge').click();1"); await wait(1300);

  console.log('\n— ① 出厂值本身 —');
  const fac = await ev(`JSON.stringify({lyric:SLOT_FACTORY.filter(function(f){return f.id==='lyric';})[0].dst,
    双行预设:(function(){var s=document.getElementById('assDstMV'),t=document.getElementById('assSrcMV');return [s.value,t.value];})(),
    模板:tplVal()})`);
  const F1 = JSON.parse(fac);
  ok(F1.lyric.dMV >= 30 && F1.lyric.dMV <= 40, '出厂 dMV 在用户拍板的 30~40 内', F1.lyric.dMV);
  ok(F1.lyric.dMV !== 70, '不是旧的 70', F1.lyric.dMV);
  console.log('   模板=' + F1.模板 + '  双行预设 dst/src=' + F1.双行预设.join('/'));

  console.log('\n— ② 底部双行 + 歌词槽：导出的 MarginV 字面值 —');
  await ev("(function(){var s=document.getElementById('expFmt');s.value='stack';s.dispatchEvent(new Event('change',{bubbles:true}));})()"); await wait(600);
  await ev("(function(){ensureStyle();S.style.cur='lyric';applySlotToAll('lyric');syncSlotsToRows();renderAssPv();})()"); await wait(700);
  const mv = await ev(`(function(){var L=buildExport().split('\\n').filter(function(l){return /^Dialogue:/.test(l);});
    return JSON.stringify(L.slice(0,2).map(function(l){return l.split(',').slice(0,8).join('|');}));})()`);
  const M = JSON.parse(mv);
  /* ⚠️ ASS Dialogue 字段序：Layer,Start,End,Style,Name,MarginL,MarginR,MarginV
     → MarginV 是第 8 列（index 7），不是 index 6（那是 MarginR，恒为 0，会假失败） */
  const mvOf = s => { const p = s.split('|'); return { style: p[3], mv: parseInt(p[7], 10) }; };
  const rows = M.map(mvOf);
  console.log('   ' + JSON.stringify(rows));
  const dstRow = rows.find(r => /SlotD_lyric/.test(r.style)) || rows.find(r => /Bottom|TopMain|Sub/.test(r.style));
  const srcRow = rows.find(r => r !== dstRow);
  ok(!!dstRow && dstRow.mv === 42 + F1.lyric.dMV, '译文行 MarginV = 42 + ' + F1.lyric.dMV + ' = 78', dstRow && dstRow.mv);
  ok(!!srcRow && srcRow.mv === 117, '原文行 MarginV 仍是 117（槽只挪承载行）', srcRow && srcRow.mv);
  const gap = 117 - (42 + F1.lyric.dMV);
  ok(gap >= 20, '两行间隙 ' + gap + 'px（旧值 70 时只有 5px，几乎贴住）', gap);

  console.log('\n— ③ 主预览实测像素（预览 = 等比缩略图，量的是相对位置）—');
  const geo = await ev(`(function(){var e1=document.getElementById('assPvLine1'),e2=document.getElementById('assPvLine2');
    var r1=e1.getBoundingClientRect(),r2=e2.getBoundingClientRect(),s=document.querySelector('.pv-screen')||e1.parentElement;
    var rs=s.getBoundingClientRect();
    var f=function(e){var cs=getComputedStyle(e);return {bottom:cs.bottom,italic:cs.fontStyle,txt:e.textContent.slice(0,10)};};
    return JSON.stringify({l1:f(e1),l2:f(e2),间距px:Math.round(Math.abs(r1.top-r2.bottom)),屏高:Math.round(rs.height)});})()`);
  const G = JSON.parse(geo);
  console.log('   ' + JSON.stringify(G));
  ok(G.l1.italic === 'italic' || G.l2.italic === 'italic', '歌词槽仍是斜体（降位移没把斜体弄丢）', G.l1.italic + '/' + G.l2.italic);
  ok(Number(G.间距px) > 0, '预览里两行之间真的有间隙（不是叠在一起）：' + G.间距px + 'px', G.间距px);

  console.log('\n— ④ 分屏模板下也别出格 —');
  await ev("(function(){var s=document.getElementById('expFmt');s.value='split';s.dispatchEvent(new Event('change',{bubbles:true}));})()"); await wait(600);
  await ev("(function(){renderAssPv();})()"); await wait(500);
  const sp = await ev(`(function(){var L=buildExport().split('\\n').filter(function(l){return /^Dialogue:/.test(l);});
    return JSON.stringify(L.slice(0,1).map(function(l){return l.split(',').slice(0,8).join('|');}));})()`);
  console.log('   ' + sp);
  ok(!/NaN|undefined/.test(String(sp)), '分屏下 Dialogue 行没有 NaN', sp);

  console.log('\n— ⑤ 界面提示与实现一致 —');
  const tip = await ev(`JSON.stringify(['zh-CN','en'].map(function(L){UI.lang=L;applyI18n();return L+':'+t('slotTipLyric');}))`);
  console.log('   ' + tip);
  ok(!/一行|one line/.test(String(tip)), '提示不再写「上移一行」', tip);

  console.log('\n合计 ' + P + '/' + (P + F) + (F ? '  ✗ 失败 ' + F : '  全部通过'));
  process.exit(F ? 1 : 0);
})().catch(e => { console.error('ERR', e.message); process.exit(1); });
