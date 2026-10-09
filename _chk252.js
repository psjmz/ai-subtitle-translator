/* v0.9.252 本地实测：导出区的第二组 SRT/VTT/ASS 键（#tplSeg2）整块删除，
   格式只在「调整设置」里选，导出区靠下载按钮的后缀说明「我会拿到什么文件」。
   判据全部走真实运行态（点格式卡 / 切语言 / 量几何），不看源码文本。
   用法：先 PORT=3098 node server.js，再 node _chk252.js（需 9333 上已有调试 Chrome） */
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
  let id = 0; const wt = new Map();
  await new Promise(r => ws.on('open', r));
  ws.on('message', m => { const g = JSON.parse(m); if (g.id && wt.has(g.id)) { const q = wt.get(g.id); wt.delete(g.id); g.error ? q.rej(new Error(JSON.stringify(g.error))) : q.res(g.result); } });
  const send = (m, p) => new Promise((res, rej) => { const i = ++id; wt.set(i, { res, rej }); ws.send(JSON.stringify({ id: i, method: m, params: p || {} })); });
  const ev = async e => { const r = await send('Runtime.evaluate', { expression: e, returnByValue: true, awaitPromise: true }); if (r.exceptionDetails) throw new Error(r.exceptionDetails.text); return r.result.value; };
  await send('Page.enable'); await send('Runtime.enable');
  await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false });
  await wait(2300);

  /* 截图：先 scrollIntoView（视口内），clip 用**文档坐标** */
  async function shot(file, sel, scale) {
    await ev(`(function(){var e=document.querySelector(${JSON.stringify(sel)}); if(e) e.scrollIntoView({block:'center'}); return 1})()`);
    await wait(420);
    const box = await ev(`(function(){var e=document.querySelector(${JSON.stringify(sel)}); if(!e) return 'null';
      var r=e.getBoundingClientRect();
      var y=Math.max(window.scrollY+8, Math.min(r.top+window.scrollY, window.scrollY+window.innerHeight-r.height-8));
      return JSON.stringify({x:Math.round(r.left+window.scrollX),y:Math.round(y),w:Math.round(r.width),h:Math.round(r.height)});})()`);
    if (box === 'null') { console.log('   （跳过截图 ' + file + '：找不到 ' + sel + '）'); return; }
    const b = JSON.parse(box);
    const r = await send('Page.captureScreenshot', { format: 'png', clip: { x: b.x - 8, y: b.y - 8, width: b.w + 16, height: b.h + 16, scale: scale || 2 } });
    fs.writeFileSync(OUT + file, Buffer.from(r.data, 'base64'));
    console.log('   截图 ' + file);
  }

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
  console.log('JS 错误（应为空）: ' + String(await ev("String(window.__err||'')")));

  console.log('\n— ① 导出区不再有第二组格式键 —');
  const dom = await ev(`JSON.stringify({
    旧键还在: !!document.getElementById('tplSeg2'),
    状态源还在: !!document.getElementById('expFmt2'),
    状态源隐藏: (function(){var e=document.getElementById('expFmt2');return e?getComputedStyle(e).display:'-';})(),
    全页格式卡组: document.querySelectorAll('.fmt-seg').length,
    导出卡里的格式卡组: document.querySelectorAll('#exp .fmt-seg').length,
    格式卡按钮数: document.querySelectorAll('.fmtbtn').length,
    设置区按钮数: document.querySelectorAll('#tplSeg .fmtbtn').length,
    导出区子元素: [...document.querySelectorAll('#exp .exp-row > *')].map(function(e){return e.tagName.toLowerCase()+(e.id?'#'+e.id:'');}).join(',')})`);
  const D = JSON.parse(dom); console.log('   ' + dom);
  ok(D.旧键还在 === false, '导出区的 #tplSeg2 已删');
  ok(D.状态源还在 === true && D.状态源隐藏 === 'none', '#expFmt2（状态源）保留且仍是隐藏的');
  ok(D.全页格式卡组 === 1 && D.导出卡里的格式卡组 === 0, '全页只剩设置区那一组格式卡');
  ok(D.格式卡按钮数 === 3 && D.设置区按钮数 === 3, '格式卡从 6 个减到 3 个（只留设置区）', D.格式卡按钮数);

  console.log('\n— ② 6 档 → 下载按钮的后缀（走隐藏 select + change，与用户点击同一路径）—');
  const want = { srt: '.srt', vtt: '.vtt', vttStyle: '.vtt', split: '.ass', stack: '.ass', custom: '.ass' };
  for (const k of Object.keys(want)) {
    await ev(`(function(){var s=document.getElementById('expFmt');s.value=${JSON.stringify(k)};s.dispatchEvent(new Event('change',{bubbles:true}));})()`);
    await wait(320);
    const got = await ev(`document.getElementById('dlExt').textContent`);
    ok(got === want[k], '模板 ' + k + ' → 后缀 ' + want[k], got);
  }

  console.log('\n— ③ 真点左边的格式卡，后缀跟着走 —');
  await ev("(function(){document.querySelector('#tplSeg .fmtbtn[data-g=\"vtt\"]').click();})()"); await wait(400);
  let g1 = await ev("JSON.stringify({ext:document.getElementById('dlExt').textContent, tpl:tplVal(), 高亮:document.querySelectorAll('#tplSeg .fmtbtn.on').length})");
  ok(/\.vtt/.test(g1), '点「VTT」卡 → 后缀 .vtt', g1);
  await ev("(function(){document.querySelector('#tplSeg .fmtbtn[data-g=\"ass\"]').click();})()"); await wait(400);
  let g2 = await ev("JSON.stringify({ext:document.getElementById('dlExt').textContent, tpl:tplVal()})");
  ok(/\.ass/.test(g2), '点「ASS」卡 → 后缀 .ass', g2);
  await ev("(function(){document.querySelector('#tplSeg .fmtbtn[data-g=\"srt\"]').click();})()"); await wait(400);
  let g3 = await ev("JSON.stringify({ext:document.getElementById('dlExt').textContent, tpl:tplVal()})");
  ok(/\.srt/.test(g3), '点「SRT」卡 → 后缀 .srt', g3);

  console.log('\n— ④ 换界面语言：后缀不许被 applyI18n 冲掉 —');
  for (const L of ['zh-CN', 'zh-TW', 'en', 'ja']) {
    await ev(`(function(){UI.lang=${JSON.stringify(L)};applyI18n();})()`); await wait(260);
    const r = await ev(`JSON.stringify({lang:UI.lang, 后缀:document.getElementById('dlExt').textContent,
      按钮:document.getElementById('btnDownload').textContent, 标签:t('btnDownload')})`);
    const R = JSON.parse(r);
    const fileFmt = g3.indexOf('.srt') >= 0;   /* 当前停在 srt */
    ok(R.后缀 === '.srt', '语言 ' + L + ' 下后缀仍是 .srt（没被 textContent 冲掉）', R.后缀);
    ok(R.按钮 === R.标签 + '.srt', '按钮文案 = 本地化标签 + 后缀', R.按钮);
  }
  await ev("(function(){UI.lang='zh-CN';applyI18n();})()"); await wait(260);

  console.log('\n— ⑤ 导出区排版：按钮回到一行 —');
  await ev("(function(){var s=document.getElementById('expFmt');s.value='stack';s.dispatchEvent(new Event('change',{bubbles:true}));})()"); await wait(500);
  const row = await ev(`JSON.stringify((function(){var a=document.getElementById('btnDownload').getBoundingClientRect(),
    b=document.getElementById('btnCopy').getBoundingClientRect(), r=document.querySelector('#exp .exp-row').getBoundingClientRect();
    return {下载top:Math.round(a.top), 复制top:Math.round(b.top), 同一行:a.top===b.top, 行高:Math.round(r.height),
      导出卡里还有select可见:(function(){var e=document.getElementById('expFmt2');return getComputedStyle(e).display;})()};})())`);
  const RW = JSON.parse(row); console.log('   ' + row);
  ok(RW.同一行 === true, '下载 / 复制在同一行（删掉那排键后不再折行）');

  console.log('\n— ⑥ 预览标签仍然说得出「现在是哪种格式」—');
  const t1 = await ev("document.getElementById('assPvTag').textContent");
  ok(/ASS/i.test(String(t1)), 'ASS 双行下预览标签带格式名', t1);
  await ev("(function(){var s=document.getElementById('expFmt');s.value='vttStyle';s.dispatchEvent(new Event('change',{bubbles:true}));})()"); await wait(500);
  const t2 = await ev("JSON.stringify({tag:document.getElementById('mVttPvTag').textContent, ext:document.getElementById('dlExt').textContent})");
  ok(/VTT|vtt/i.test(t2), 'VTT 下预览标签带格式名', t2);

  console.log('\n— ⑦ SRT 的已知代价（记录下来）：预览整块收起，只剩两个按钮 —');
  await ev("(function(){var s=document.getElementById('expFmt');s.value='srt';s.dispatchEvent(new Event('change',{bubbles:true}));})()"); await wait(500);
  const sr = await ev(`JSON.stringify({assPv:getComputedStyle(document.getElementById('assPv')).display,
    vttPv:getComputedStyle(document.getElementById('mVttPv')).display, ext:document.getElementById('dlExt').textContent,
    导出卡高:Math.round(document.getElementById('exp').getBoundingClientRect().height)})`);
  console.log('   ' + sr);
  const SR = JSON.parse(sr);
  ok(SR.assPv === 'none' && SR.vttPv === 'none', 'SRT 下两块预览都收起（本来就无样式可看）');
  ok(SR.ext === '.srt', '此时后缀仍明确写出 .srt（导出区唯一的说明）');
  await shot('merge252-C-导出卡-SRT.png', '#exp', 2);

  console.log('\n— ⑧ 出图 —');
  await ev("(function(){var s=document.getElementById('expFmt');s.value='stack';s.dispatchEvent(new Event('change',{bubbles:true}));})()"); await wait(600);
  await ev("(function(){ensureStyle();S.style.cur='lyric';document.getElementById('assPanel').open=true;renderSlots();})()"); await wait(500);
  await shot('merge252-A-设置区格式卡.png', '#tplSeg', 2);
  await ev("(function(){document.getElementById('assPanel').open=false;})()"); await wait(300);
  await shot('merge252-B-导出卡-ASS.png', '#exp', 2);

  console.log('\n合计 ' + P + '/' + (P + F) + (F ? '  ✗ 失败 ' + F : '  全部通过'));
  process.exit(F ? 1 : 0);
})().catch(e => { console.error('ERR', e.message); process.exit(1); });
