/* v0.9.253 本地实测：槽胶囊的「选中」与「编辑」联动。
   背景（外网实测反馈）：点胶囊只设了 S.filter.slot，S.style.cur 不动 ——
   上面高亮的胶囊变了，下面还写着「编辑槽 · 旧槽」，同一句话里两个答案。
   判据全部走真实运行态（真点 DOM、读面板标题 / 计算样式 / 可见行数），不看源码文本。
   用法：先 PORT=3098 node server.js，再 node _chk253.js（需 9333 上已有调试 Chrome） */
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');
const http = require('http');
const fs = require('fs');
const PORT = 9333, BASE = 'http://127.0.0.1:3098';
const OUT = '/Users/jp/WorkBuddy/2026-09-04-00-29-54/';
function J(p){return new Promise((res,rej)=>{const r=http.request({host:'127.0.0.1',port:PORT,path:p,method:'PUT'},x=>{let d='';x.on('data',c=>d+=c);x.on('end',()=>{try{res(JSON.parse(d))}catch(e){rej(new Error(d.slice(0,200)))}})});r.on('error',rej);r.end();});}
const wait = ms => new Promise(r => setTimeout(r, ms));
let P = 0, F = 0;
const ok = (c, m, extra) => { c ? P++ : F++; console.log((c ? '  ✓ ' : '  ✗ ') + m + (extra !== undefined ? '  → ' + extra : '')); };

(async () => {
  const v = await J('/json/new?' + encodeURIComponent(BASE + '/merge.html'));
  const ws = new WebSocket(v.webSocketDebuggerUrl, { perMessageDeflate: false });
  let id = 0; const wt = new Map(); const errs = [];
  await new Promise(r => ws.on('open', r));
  ws.on('message', m => { const g = JSON.parse(m); if (g.id && wt.has(g.id)) { const q = wt.get(g.id); wt.delete(g.id); g.error ? q.rej(new Error(JSON.stringify(g.error))) : q.res(g.result); }
    if (g.method === 'Runtime.exceptionThrown') errs.push((g.params.exceptionDetails.exception || {}).description || g.params.exceptionDetails.text); });
  const send = (m, p) => new Promise((res, rej) => { const i = ++id; wt.set(i, { res, rej }); ws.send(JSON.stringify({ id: i, method: m, params: p || {} })); });
  const ev = async e => { const r = await send('Runtime.evaluate', { expression: e, returnByValue: true, awaitPromise: true }); if (r.exceptionDetails) throw new Error(r.exceptionDetails.text); return r.result.value; };
  await send('Page.enable'); await send('Runtime.enable');
  await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false });
  await wait(2300);

  /* 截图：多元素**并集**（胶囊条 + 面板标题在同一张里，联动才看得出来）
     ⚠️ clip 用文档坐标（rect+scrollY）：先滚到目标，再**重新量**一次，别拿滚动前的值 */
  async function shotUnion(file, sels, scale) {
    const box = await ev(`(function(){var ss=${JSON.stringify(sels)}.map(function(s){return document.querySelector(s)}).filter(Boolean);
      if(!ss.length) return 'null';
      function union(){ var L=1e9,T=1e9,R=-1e9,B=-1e9;
        ss.forEach(function(e){var r=e.getBoundingClientRect();L=Math.min(L,r.left);T=Math.min(T,r.top);R=Math.max(R,r.right);B=Math.max(B,r.bottom);});
        return {x:L+window.scrollX, y:T+window.scrollY, w:R-L, h:B-T}; }
      var u0=union();
      window.scrollTo(0, Math.max(0, u0.y-30));
      var u=union();
      var y=Math.max(window.scrollY+6, Math.min(u.y, window.scrollY+window.innerHeight-u.h-10));
      return JSON.stringify({x:Math.round(u.x),y:Math.round(y),w:Math.round(u.w),h:Math.round(u.h)});})()`);
    if (box === 'null') { console.log('   （跳过截图 ' + file + '）'); return; }
    await wait(420);
    const b = JSON.parse(box);
    const r = await send('Page.captureScreenshot', { format: 'png', clip: { x: b.x - 10, y: b.y - 10, width: b.w + 20, height: b.h + 20, scale: scale || 2 } });
    fs.writeFileSync(OUT + file, Buffer.from(r.data, 'base64'));
    console.log('   截图 ' + file);
  }

  /* 秒数必须进位到分：00:00:99 会被解析器整条丢弃 */
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

  /* 造槽：0~1 → 歌词，2~3 → 强调，其余留默认 */
  const setup = await ev(`(function(){ensureStyle();
    [0,1].forEach(function(i){setRowSlot(i,'lyric')});
    [2,3].forEach(function(i){setRowSlot(i,'emphasis')});
    S.style.cur='emphasis'; S.filter.slot='';
    document.getElementById('slotEdit').open=true;
    var s=document.getElementById('expFmt'); s.value='stack'; s.dispatchEvent(new Event('change',{bubbles:true}));
    renderReport(); renderAssPv(); renderVttPv();
    return JSON.stringify({行数:S.rows.length, 歌词行:S.rows.filter(function(r,i){return slotOfRow(i)==='lyric'}).length,
      强调行:S.rows.filter(function(r,i){return slotOfRow(i)==='emphasis'}).length});})()`);
  const S0 = JSON.parse(setup); console.log('   造数据 ' + setup);
  await wait(500);
  ok(S0.歌词行 === 2 && S0.强调行 === 2, '两条槽各有 2 行（筛选用得上）');

  const state = async () => JSON.parse(await ev(`JSON.stringify({
    cur: S.style.cur, filt: S.filter.slot,
    面板标题: document.getElementById('slotEditName').textContent,
    面板展开: document.getElementById('slotEdit').open,
    on胶囊: (document.querySelector('#slotBar .slot-chip.on')||{}).getAttribute ? document.querySelector('#slotBar .slot-chip.on').getAttribute('data-slot') : '',
    filt胶囊: (document.querySelector('#slotBar .slot-chip.filt')||{}).getAttribute ? document.querySelector('#slotBar .slot-chip.filt').getAttribute('data-slot') : '',
    可见行: document.querySelectorAll('#repRows tr').length,
    预览标签: document.getElementById('slotPvTag').textContent })`));

  console.log('\n— ① 改前的症状：点胶囊，编辑目标必须跟着切 —');
  const before = await state();
  console.log('   点之前 ' + JSON.stringify(before));
  ok(before.cur === 'emphasis' && /强调/.test(before.面板标题), '起点：正在编辑「强调」');
  await ev(`(function(){document.querySelector('#slotBar [data-slot="lyric"]').click();return 1})()`); await wait(600);
  const after = await state();
  console.log('   点之后 ' + JSON.stringify(after));
  ok(after.filt === 'lyric', '① 筛选态切到被点的槽');
  ok(after.cur === 'lyric', '② 编辑目标也切到被点的槽（本次修复的判据）');
  ok(/歌词/.test(after.面板标题) && !/强调/.test(after.面板标题), '③ 面板标题跟着写「编辑槽 · 歌词」', after.面板标题);
  ok(after.可见行 === 2, '④ 表格只剩该槽的 2 行', after.可见行);
  ok(after.on胶囊 === 'lyric' && after.filt胶囊 === 'lyric', '⑤ 胶囊高亮与筛选态都在同一个胶囊上', after.on胶囊 + '/' + after.filt胶囊);
  ok(after.面板展开 === true, '⑥ 面板原本展开 → 切目标后仍然展开（没被关掉）');
  ok(/歌词/.test(String(after.预览标签)) && !/强调/.test(String(after.预览标签)), '⑦ 面板里的效果预览也切到了新槽', after.预览标签);

  console.log('\n— ② 切目标不许顺手把面板展开 —');
  await ev("(function(){document.getElementById('slotEdit').open=false;})()"); await wait(400);
  await ev(`(function(){document.querySelector('#slotBar [data-slot="emphasis"]').click();return 1})()`); await wait(600);
  const s2 = await state();
  console.log('   ' + JSON.stringify(s2));
  ok(s2.cur === 'emphasis', '收起状态下点胶囊，编辑目标照样切');
  ok(s2.面板展开 === false, '但面板没有自己弹开（用户没要求编辑）');

  console.log('\n— ③ 再点同一个胶囊 = 取消筛选，但不丢选中 —');
  await ev(`(function(){document.querySelector('#slotBar [data-slot="emphasis"]').click();return 1})()`); await wait(600);
  const s3 = await state();
  console.log('   ' + JSON.stringify(s3));
  ok(s3.filt === '', '再点一下取消筛选');
  ok(s3.cur === 'emphasis', '编辑目标仍是它（选中没被取消掉）');
  ok(s3.可见行 === 6, '表格恢复全部行', s3.可见行);
  ok(s3.面板标题 === '编辑槽 · 强调', '面板标题与胶囊状态一致', s3.面板标题);

  console.log('\n— ④ 联动的可见后果：贴底条「整篇套用」文案跟着走 —');
  await ev(`(function(){var cb=document.querySelector('#repRows input[data-ri]');cb.click();return 1})()`); await wait(500);
  const lbl0 = await ev(`(function(){var b=document.querySelector('#selDock [data-dock-all="1"]');return b?b.textContent:'-'})()`);
  ok(/强调|emphasis/i.test(String(lbl0)), '按钮写的是当前编辑的槽（强调）', lbl0);
  await ev(`(function(){document.querySelector('#selDock [data-dock-clr]').click();return 1})()`); await wait(400);
  await ev(`(function(){document.querySelector('#slotBar [data-slot="sfx"]').click();return 1})()`); await wait(600);
  const s4 = await state();
  console.log('   ' + JSON.stringify(s4));
  ok(s4.cur === 'sfx' && s4.面板标题 === '编辑槽 · 音效', '点「音效」胶囊后面板标题同步', s4.面板标题);
  /* 取消筛选（此时表格里没有音效行，勾不到行），再勾一行看按钮文案 */
  await ev(`(function(){document.querySelector('#slotBar [data-slot="sfx"]').click();return 1})()`); await wait(500);
  await ev(`(function(){var cb=document.querySelector('#repRows input[data-ri]');cb.click();return 1})()`); await wait(500);
  const lbl1 = await ev(`(function(){var b=document.querySelector('#selDock [data-dock-all="1"]');return b?b.textContent:'-'})()`);
  ok(/音效|sfx/i.test(String(lbl1)), '「整篇套用」按钮文案同步变音效', lbl1);
  await ev(`(function(){document.querySelector('#selDock [data-dock-clr]').click();return 1})()`); await wait(400);

  console.log('\n— ⑤ 回归护栏：小铅笔仍是「切目标 + 展开」，且不碰筛选 —');
  await ev(`(function(){var c=document.querySelector('#slotBar [data-slot="narration"]');c.click();return 1})()`); await wait(500);
  await ev(`(function(){var b=document.querySelector('#slotBar [data-slot-edit="lyric"]');b.click();return 1})()`); await wait(500);
  const s5 = await state();
  console.log('   ' + JSON.stringify(s5));
  ok(s5.cur === 'lyric' && s5.面板展开 === true && /歌词/.test(s5.面板标题), '铅笔 → 切到歌词并展开');
  ok(s5.filt === 'narration', '铅笔不碰筛选（筛选还停在旁白上）');

  console.log('\n— ⑥ 出图：胶囊与面板标题同框 —');
  await ev(`(function(){ensureStyle();S.style.cur='emphasis';S.filter.slot='emphasis';document.getElementById('slotEdit').open=true;renderReport();return 1})()`);
  await wait(700);
  await shotUnion('merge253-A-槽胶囊联动.png', ['#slotBar', '#slotEditName'], 2);

  console.log('\n— ⑦ JS 异常 —');
  const real = errs.filter(e => !/favicon|404/i.test(e || ''));
  ok(real.length === 0, '无运行时异常（' + real.length + '）' + (real.length ? ' → ' + String(real[0]).slice(0, 140) : ''));

  console.log('\n合计 ' + P + '/' + (P + F) + (F ? '  ✗ 失败 ' + F : '  全部通过'));
  process.exit(F ? 1 : 0);
})().catch(e => { console.error('ERR', e.message); process.exit(1); });
