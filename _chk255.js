/* v0.9.255 本地实测：① 唯一预览 + 视角三档 ② ⓘ 悬停浮层（含 ASS 面板里不被裁）③ 整栏收放 ④ 窄屏回单列
   用法：先 `PORT=3098 node server.js`，再手动起 9333 的 headless Chrome，然后 node _chk255.js */
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

  async function shot(file, sel, h, scale) {
    const box = await ev(`JSON.stringify((function(){var e=document.querySelector(${JSON.stringify(sel)});if(!e)return null;
      window.scrollTo(0,0); e.scrollIntoView({block:'center'}); var r=e.getBoundingClientRect();
      return {x:Math.max(0,Math.round(r.left+window.scrollX-14)),y:Math.max(0,Math.round(r.top+window.scrollY-14)),width:Math.round(r.width+28),height:${h}};})())`);
    if (!box || box === 'null') { console.log('   （跳过 ' + file + '）'); return; }
    await wait(500);
    const rect = await ev(`JSON.stringify((function(){var e=document.querySelector(${JSON.stringify(sel)});var r=e.getBoundingClientRect();
      return {x:Math.max(0,Math.round(r.left-14)),y:Math.max(0,Math.round(r.top-14)),width:Math.round(r.width+28),height:${h}};})())`);
    const r = await send('Page.captureScreenshot', { format:'png', clip: Object.assign({ scale: scale || 2 }, JSON.parse(rect)) });
    fs.writeFileSync(OUT + file, Buffer.from(r.data, 'base64'));
    console.log('   截图 ' + file);
  }

  console.log('\n— ① 版号与「全页只有一处预览」—');
  const ver = await ev("document.querySelector('.ver').textContent");
  ok(/v0\.9\.263/.test(String(ver)), '页眉版号已到 v0.9.263', ver);
  const struct = await ev(`JSON.stringify({
    预览卡:document.querySelectorAll('#pvCard').length,
    旧面板画布:document.querySelectorAll('#slotPv').length,
    视角按钮:[...document.querySelectorAll('#pvSeg [data-pv]')].map(function(b){return b.getAttribute('data-pv');}).join(','),
    亮着的:(document.querySelector('#pvSeg .segbtn.on')||{getAttribute:function(){return ''}}).getAttribute('data-pv'),
    当前视角:pvView(), 槽取到:pvCtxSlot(),
    面板入口:!!document.getElementById('slotPvGoto')})`);
  console.log('   ', struct);
  const ST = JSON.parse(struct);
  ok(ST.预览卡 === 1, '全页只有一张预览卡', ST.预览卡);
  ok(ST.旧面板画布 === 0, '✎ 面板里那块画布已经不在了', ST.旧面板画布);
  ok(ST.视角按钮 === 'movie,slot,base', '视角三档：成片 / 这个槽 / 基础样式', ST.视角按钮);
  ok(ST.当前视角 === 'movie', '⭐ 默认视角是「成片」', ST.当前视角);
  ok(ST.槽取到 === null, '成片视角不套槽（pvCtxSlot 返回 null）', ST.槽取到);
  ok(ST.面板入口 === true, '✎ 面板里有「在预览里看这个槽」入口');

  console.log('\n— ② 示例态：右栏已亮，「成片」画用户自己的字幕 —');
  const demo = await ev(`JSON.stringify({行:S.rows.length, 示例:S.demo,
    栏开:document.getElementById('rail').classList.contains('on'),
    栏显:getComputedStyle(document.getElementById('rail')).display,
    栏宽:Math.round(document.getElementById('rail').getBoundingClientRect().width),
    常驻:getComputedStyle(document.getElementById('rail')).position,
    原文:document.getElementById('assPvLine1').textContent,
    译文:document.getElementById('assPvLine2').textContent})`);
  console.log('   ', demo);
  const D = JSON.parse(demo);
  ok(D.行 === 7 && D.示例 === true, '示例数据 7 行在位', D.行);
  ok(D.栏显 === 'flex' && D.栏开 === true, '合并前/示例态右栏整栏亮着', D.栏显);
  ok(D.常驻 === 'sticky', '右栏 sticky 常驻（收起面板也看得见）', D.常驻);
  ok(D.栏宽 >= 470 && D.栏宽 <= 490, '右栏 480px', D.栏宽);
  ok(!/♪/.test(D.原文 + D.译文), '⭐ 默认视角画的是示例自己的字幕（不是示意文本）', D.原文);
  await shot('merge255-A-成片视角.png', '#pvCard', 400, 2);

  console.log('\n— ③ 视角切换：这个槽 / 基础样式 互不串味 —');
  const sw = await ev(`(function(){ensureStyle();S.style.cur='lyric';setPvView('slot');
    var a={原文:document.getElementById('assPvLine1').textContent, 译文:document.getElementById('assPvLine2').textContent,
           译文离底:Math.round(document.getElementById('assPvScreen').getBoundingClientRect().bottom-document.getElementById('assPvLine2').getBoundingClientRect().bottom),
           标签:document.getElementById('pvTag').textContent,
           藏着表情:document.getElementById('pvNone').style.display};
    setPvView('base');
    var b={译文离底:Math.round(document.getElementById('assPvScreen').getBoundingClientRect().bottom-document.getElementById('assPvLine2').getBoundingClientRect().bottom),
           标签:document.getElementById('pvTag').textContent};
    setPvView('movie');
    var c={原文:document.getElementById('assPvLine1').textContent, 标签:document.getElementById('pvTag').textContent};
    return JSON.stringify({槽:a, 基础:b, 成片:c});})()`);
  console.log('   ', sw);
  const SW = JSON.parse(sw);
  ok(/♪/.test(SW.槽.原文 + SW.槽.译文), '视角「这个槽」= 歌词示意文本（♪）', SW.槽.原文);
  ok(/歌词/.test(SW.槽.标签), '标签标着当前是哪个槽', SW.槽.标签);
  ok(/基础样式/.test(SW.基础.标签), '标签标着「基础样式」', SW.基础.标签);
  ok(SW.槽.译文离底 > SW.基础.译文离底, '⭐ 歌词槽比基础样式上移了（36 的整条级偏移看得见）',
    '歌词 ' + SW.槽.译文离底 + ' vs 基础 ' + SW.基础.译文离底);
  ok(!/♪/.test(SW.成片.原文), '切回「成片」又变回用户自己的字幕', SW.成片.原文);
  await wait(300);
  await ev("setPvView('slot');1"); await wait(400);
  await shot('merge255-B-这个槽视角.png', '#pvCard', 400, 2);
  await ev("setPvView('movie');1"); await wait(300);

  console.log('\n— ④ ⓘ 悬停浮层：ASS 面板里也不被 overflow 裁掉 —');
  await ev("(function(){document.getElementById('assPanel').open=true;return 1})()"); await wait(500);
  /* ⚠️ 先滚到位、再量坐标。反过来的话（量完再滚）鼠标会落在别的元素上 —— 就这么假失败过一次。 */
  await ev("(function(){var el=document.querySelector('.info[data-tip-i18n=\"assTplTip\"]');if(el)el.scrollIntoView({block:'center'});return 1})()"); await wait(700);
  const tip = await ev(`(function(){
    var el = document.querySelector('.info[data-tip-i18n="assTplTip"]');
    if(!el) return JSON.stringify({err:'找不到 ASS 模板的 ⓘ'});
    var r = el.getBoundingClientRect();
    return JSON.stringify({x:Math.round(r.left+r.width/2), y:Math.round(r.top+r.height/2),
      滚动位置:Math.round(window.scrollY),
      在面板里:!!el.closest('#assPanel'), 面板裁切:getComputedStyle(document.getElementById('assPanel')).overflow});})()`);
  console.log('   ', tip);
  const TI = JSON.parse(tip);
  ok(TI.在面板里 === true, '这条 ⓘ 确实长在 ASS 面板里', TI.在面板里);
  await send('Input.dispatchMouseEvent', { type:'mouseMoved', x:2, y:2 });
  await wait(150);
  await send('Input.dispatchMouseEvent', { type:'mouseMoved', x:TI.x, y:TI.y });
  await wait(600);
  const layer = await ev(`(function(){var L=document.getElementById('tipLayer'); if(!L) return JSON.stringify({err:'浮层没被建出来'});
    var r=L.getBoundingClientRect(); var sr=document.getElementById('assPvScreen').getBoundingClientRect();
    return JSON.stringify({显示:getComputedStyle(L).display, 文字:(L.textContent||'').slice(0,26),
      宽:Math.round(r.width), 高:Math.round(r.height),
      挂在body:L.parentNode===document.body, 定位:getComputedStyle(L).position,
      在视口内:(r.top>=0 && r.left>=0 && r.right<=window.innerWidth && r.bottom<=window.innerHeight)});})()`);
  console.log('   ', layer);
  const LY = JSON.parse(layer);
  ok(LY.显示 === 'block', '悬停后浮层显示', LY.显示);
  ok(LY.宽 > 100 && LY.高 > 10, '⭐ 浮层有真实尺寸（没被父级裁成 0）', LY.宽 + '×' + LY.高);
  ok(LY.挂在body === true && LY.定位 === 'fixed', '浮层挂 body + fixed（这才是面板里不被裁的原因）', LY.定位);
  ok(LY.在视口内 === true, '浮层完整落在视口内');
  await shot('merge255-C-悬停说明.png', '.opts', 900, 2);
  await ev("window.__tipHide();1"); await wait(200);
  const hid = await ev("(function(){var L=document.getElementById('tipLayer');return L?getComputedStyle(L).display:'已移除';})()");
  ok(hid === 'none', 'Esc / 收起后浮层隐藏', hid);

  console.log('\n— ⑤ ⓘ 的动态说明：跟着当前选择走，改过要点亮 —');
  const dyn = await ev(`(function(){var o={};
    var s=document.getElementById('expFmt'); s.value='srt'; s.dispatchEvent(new Event('change',{bubbles:true}));
    o.SRT说明=document.getElementById('tplHint').getAttribute('data-tip');
    o.SRT点亮=document.getElementById('tplHint').classList.contains('note');
    s.value='custom'; s.dispatchEvent(new Event('change',{bubbles:true}));
    o.自定义说明=document.getElementById('tplHint').getAttribute('data-tip');
    o.自定义点亮=document.getElementById('tplHint').classList.contains('note');
    return JSON.stringify(o);})()`);
  console.log('   ', dyn);
  const DY = JSON.parse(dyn);
  ok(/纯文本|不需/.test(DY.SRT说明), 'SRT 档的 ⓘ 说的是「纯文本、无样式」', String(DY.SRT说明).slice(0,24));
  ok(DY.SRT点亮 === false, '出厂默认档不点亮（只在被改过时提示）', DY.SRT点亮);
  ok(DY.自定义点亮 === true, '「自定义」档点亮 ⓘ（已经不是默认说法了）', DY.自定义点亮);

  console.log('\n— ⑥ 没有画面可看时：视角收起 + 说明顶上 —');
  await ev("(function(){var s=document.getElementById('expFmt');s.value='srt';s.dispatchEvent(new Event('change',{bubbles:true}));})()"); await wait(500);
  const none = await ev(`JSON.stringify({视角:getComputedStyle(document.getElementById('pvSeg')).display,
    说明:getComputedStyle(document.getElementById('pvNone')).display,
    说明文字:(document.getElementById('pvNone').textContent||'').slice(0,20),
    ass:getComputedStyle(document.getElementById('assPv')).display,
    vtt:getComputedStyle(document.getElementById('mVttPv')).display,
    摘要:document.getElementById('expSum').textContent, 后缀:document.getElementById('dlExt').textContent})`);
  console.log('   ', none);
  const NN = JSON.parse(none);
  ok(NN.视角 === 'none', 'SRT 下视角按钮收起（无可比较的东西）', NN.视角);
  ok(NN.说明 === 'block' && NN.说明文字.length > 5, 'SRT 下给出「这个格式没有画面」的说明', NN.说明文字);
  ok(NN.ass === 'none' && NN.vtt === 'none', '两块画布都收着', NN.ass + '/' + NN.vtt);
  ok(/SRT/.test(NN.摘要), '导出卡摘要写清当前格式', NN.摘要);
  ok(NN.后缀 === '.srt', '下载按钮后缀仍是 .srt', NN.后缀);
  await ev("(function(){var s=document.getElementById('expFmt');s.value='stack';s.dispatchEvent(new Event('change',{bubbles:true}));})()"); await wait(600);
  const back = await ev(`JSON.stringify({视角:getComputedStyle(document.getElementById('pvSeg')).display,
    说明:getComputedStyle(document.getElementById('pvNone')).display, ass:getComputedStyle(document.getElementById('assPv')).display,
    摘要:document.getElementById('expSum').textContent})`);
  console.log('   ', back);
  const BK = JSON.parse(back);
  ok(BK.视角 === 'flex' && BK.说明 === 'none' && BK.ass === 'block', '切回 ASS：视角回来、说明收起、画面回来', back);
  ok(/双行/.test(BK.摘要), '摘要跟着换成「底部双行」', BK.摘要);

  console.log('\n— ⑦ 真实合并：右栏该亮就亮；面板入口能把视角切过去 —');
  const EN = '1\n00:00:01,000 --> 00:00:03,000\nhello one\n\n2\n00:00:05,000 --> 00:00:08,000\nhello two\n';
  const ZH = '1\n00:00:01,000 --> 00:00:03,000\n你好一\n\n2\n00:00:05,000 --> 00:00:08,000\n你好二\n';
  await ev(`(function(){var a=document.getElementById('srcText'),b=document.getElementById('dstText');
    a.value=${JSON.stringify(EN)};a.dispatchEvent(new Event('input',{bubbles:true}));
    b.value=${JSON.stringify(ZH)};b.dispatchEvent(new Event('input',{bubbles:true}));return 1})()`);
  await wait(600);
  await ev("document.getElementById('btnMerge').click();1"); await wait(1400);
  const mg = await ev(`JSON.stringify({行:S.rows.length, 示例:S.demo, 格式:tplVal(),
    栏开:document.getElementById('rail').classList.contains('on')})`);
  console.log('   ', mg);
  const MG = JSON.parse(mg);
  ok(MG.行 === 2 && MG.示例 === false, '真实合并 2 行、示例退场', mg);
  ok(MG.栏开 === true, '合并后右栏整栏亮出（预览 + 导出一起）', MG.栏开);
  /* ⚠️ 真实合并会把导出格式自动派到 SRT（用户没动过格式就去认输入法），那时预览本就该空着。
     所以先显式选回「底部双行」，再验「预览跟着新数据走」—— 这条能挡住「预览停在旧内容」。 */
  await ev("(function(){document.getElementById('slotEdit').open=true;renderSlots();})()"); await wait(400);
  await ev("(function(){var s=document.getElementById('expFmt');s.value='stack';s.dispatchEvent(new Event('change',{bubbles:true}));})()"); await wait(700);
  const pvNew = await ev(`JSON.stringify({视角:pvView(),
    原文:document.getElementById('assPvLine1').textContent, 译文:document.getElementById('assPvLine2').textContent})`);
  console.log('   ', pvNew);
  const PN = JSON.parse(pvNew);
  ok(/hello one/.test(PN.原文) && /你好一/.test(PN.译文), '⭐ 合并后预览换成了用户自己的新数据（不是停在上一次的示例）', pvNew);
  await ev("(function(){document.getElementById('slotPvGoto').click();})()"); await wait(600);
  const goto = await ev(`JSON.stringify({视角:pvView(), 槽取到:pvCtxSlot()})`);
  console.log('   ', goto);
  const GO = JSON.parse(goto);
  ok(GO.视角 === 'slot', '点「在预览里看这个槽」把视角切过去', GO.视角);

  console.log('\n— ⑧ 窄屏（900px）：右栏落到页底一列 —');
  await send('Emulation.setDeviceMetricsOverride', { width:900, height:1000, deviceScaleFactor:1, mobile:false });
  await wait(900);
  /* ⚠️ 量之前先回到「有画面」的视角：停在「这个槽」或 SRT 格式上的话画面也可能是收着的 */
  await ev("(function(){setPvView('movie');var s=document.getElementById('expFmt');if(tplVal()!=='stack'){s.value='stack';s.dispatchEvent(new Event('change',{bubbles:true}));}})()"); await wait(700);
  const narrow = await ev(`(function(){var r=document.getElementById('rail'), s=getComputedStyle(r), b=r.getBoundingClientRect();
    var sc=document.getElementById('assPvScreen').getBoundingClientRect();
    document.getElementById('slotPvGoto').click();
    return JSON.stringify({列:s.gridColumnStart, 常驻:s.position, 宽:Math.round(b.width),
      屏宽:Math.round(sc.width), 屏居中偏移:Math.round(Math.abs((sc.left+sc.width/2)-(b.left+b.width/2)))});})()`);
  console.log('   ', narrow);
  const NW = JSON.parse(narrow);
  ok(NW.列 === '1', '窄屏回到单列（grid-column:1）', NW.列);
  ok(NW.常驻 === 'static', '窄屏不再 sticky', NW.常驻);
  ok(NW.宽 < 900 && NW.宽 > 700, '右栏跟着整宽铺开', NW.宽);
  ok(NW.屏宽 <= 560 && NW.屏居中偏移 <= 2, '⭐ 预览屏限宽 560 居中（不白占一屏）', NW.屏宽 + ' / 偏移 ' + NW.屏居中偏移);
  await send('Emulation.setDeviceMetricsOverride', { width:1440, height:1000, deviceScaleFactor:1, mobile:false });
  await wait(700);

  console.log('\n— ⑨ 无 JS 错误 —');
  ok(errs.length === 0, '整轮没有未捕获异常', errs.slice(0,2).join(' | '));

  console.log('\n合计 ' + P + ' 通过 / ' + F + ' 失败');
  process.exit(F ? 1 : 0);
})().catch(e => { console.error('ERR', e.message); process.exit(1); });
