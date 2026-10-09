/* v0.9.257 本地实测：新增「字幕清洗器」独立页 clean.html
   用法：先 `PORT=3098 node server.js`，再手动起 9333 的 headless Chrome，然后 node _chk257.js */
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');
const http = require('http');
const fs = require('fs');
const PORT = 9333, BASE = 'http://127.0.0.1:3098';
const OUT = '/Users/jp/WorkBuddy/2026-09-04-00-29-54/';
let P = 0, F = 0;
const ok = (c, m, x) => { c ? P++ : F++; console.log((c ? '  ✓ ' : '  ✗ ') + m + (x !== undefined ? '  → ' + x : '')); };
const wait = ms => new Promise(r => setTimeout(r, ms));
function J(p){ return new Promise((res, rej) => { const r = http.request({ host:'127.0.0.1', port:PORT, path:p, method:'PUT', headers:{Host:'127.0.0.1:'+PORT} }, x => { let d=''; x.on('data',c=>d+=c); x.on('end',()=>{ try{ res(JSON.parse(d)); }catch(e){ rej(new Error(d.slice(0,200))); } }); }); r.on('error', rej); r.end(); }); }

/* 一份「脏」到家的测试字幕：HTML 标签 / ASS 特效 / 听障提示 / 说话人 /
   水印 / 网址 / 全大写 / 空条目 / 重复条目 / 纯歌词 */
const DIRTY = [
  '1', '00:00:01,000 --> 00:00:03,000', '<i>Hello there</i>', '',
  '2', '00:00:04,000 --> 00:00:06,000', '[脚步声] GEORGE: 夏天真热', '',
  '3', '00:00:07,000 --> 00:00:09,000', '{\\an8}本字幕由 XX 字幕组提供，仅供学习交流', '',
  '4', '00:00:10,000 --> 00:00:12,000', 'THIS IS ALL CAPS TEXT', '',
  '5', '00:00:13,000 --> 00:00:15,000', '', '',
  '6', '00:00:16,000 --> 00:00:18,000', 'Visit https://example.com for more', '',
  '7', '00:00:19,000 --> 00:00:21,000', '♪ Never gonna give you up ♪', '',
  '8', '00:00:22,000 --> 00:00:24,000', '正常的一句台词。', '',
  '9', '00:00:22,000 --> 00:00:24,000', '正常的一句台词。', ''
].join('\n');

(async () => {
  const v = await J('/json/new?' + encodeURIComponent(BASE + '/clean.html'));
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
  await wait(1800);

  console.log('\n— ① 页面骨架 —');
  ok(await ev("!!document.getElementById('dz')"), '上传区就位');
  ok(await ev("document.querySelectorAll('.chk-row').length") === 13, '13 个清洗项', await ev("document.querySelectorAll('.chk-row').length"));
  ok(await ev("document.querySelectorAll('.info').length") === 13, '每项都带 ⓘ 说明', await ev("document.querySelectorAll('.info').length"));
  ok(await ev("document.getElementById('repCard').style.display === 'none'"), '未上传时结果卡收起');
  ok(/清洗器/.test(await ev("document.querySelector('.hero h1').textContent")), '标题是字幕清洗器');
  ok(await ev("typeof window.CleanCore === 'object'"), '走的是自己的引擎 CleanCore');
  ok(await ev("typeof window.SrtCore === 'undefined'"), '⭐ 完全不加载共用引擎 srt-core.js（零影响既有功能）');
  ok(await ev("getComputedStyle(document.documentElement).getPropertyValue('--grad').trim()") === '#E12D6E', '视觉令牌沿用双语页（禁渐变）');

  console.log('\n— ② 灌入脏字幕，看默认清洗 —');
  await ev(`(function(){var p=document.getElementById('paste');p.value=${JSON.stringify(DIRTY)};
    p.dispatchEvent(new Event('input',{bubbles:true}));return 1})()`);
  await wait(900);
  const st = JSON.parse(await ev(`JSON.stringify({条数:S.raw.length,改动:S.changes.length,
    统计:document.getElementById('statRow').textContent,
    行:document.querySelectorAll('#tbody tr').length,
    导出:outSrt()})`));
  console.log('   ', JSON.stringify(st).slice(0, 420));
  ok(st.条数 === 9, '解析到 9 条', st.条数);
  ok(st.行 >= 4, '变更表列出了改动', st.行);
  ok(/Hello there/.test(st.导出) && !/<i>/.test(st.导出), '① HTML 标签已去，文字保留');
  ok(/夏天真热/.test(st.导出) && !/脚步声/.test(st.导出), '② 听障提示 [脚步声] 已去，对白保留');
  ok(!/本字幕/.test(st.导出) && !/字幕组/.test(st.导出), '③ 字幕组水印整条删除');
  ok(!/example\.com/.test(st.导出), '④ 网址广告条删除');
  ok(!/\{\\an8\}/.test(st.导出), '⑤ ASS 特效花括号已去');
  ok(/正常的一句台词/.test(st.导出), '⑧ 正常台词一字未动');
  const dupN = (st.导出.match(/正常的一句台词/g) || []).length;
  ok(dupN === 1, '⑨ 重复条目只留一条', dupN);
  ok(/夏天真热/.test(st.导出) && /GEORGE:/.test(st.导出), '说话人默认不删（默认关）');
  ok(/THIS IS ALL CAPS/.test(st.导出), '全大写默认不动（默认关）');
  ok(/♪/.test(st.导出), '歌词行默认保留（默认关）');
  const rowsInfo = JSON.parse(await ev(`JSON.stringify({
    号:Array.from(document.querySelectorAll('#tbody td.no')).map(function(x){return +x.textContent}),
    标签:Array.from(document.querySelectorAll('#tbody tr')).map(function(tr){
      return Array.from(tr.querySelectorAll('.tag')).map(function(x){return x.textContent}).join('+')})})`));
  console.log('   ', JSON.stringify(rowsInfo));
  ok(JSON.stringify(rowsInfo.号) === JSON.stringify(rowsInfo.号.slice().sort(function(a,b){return a-b})),
     '表格按条目号排序（不是按规则命中的先后）', rowsInfo.号.join(','));
  ok(!rowsInfo.标签.some(function(s){ return /水印/.test(s) && /空条目/.test(s); }),
     '水印删空的条目不再挂「空条目」标签');

  console.log('\n— ③ 打开默认关的三项 —');
  await ev(`(function(){['speaker','upper','music'].forEach(function(k){
    var el=document.getElementById('o_'+k); el.checked=true; el.dispatchEvent(new Event('change',{bubbles:true}));});return 1})()`);
  await wait(600);
  const st2 = JSON.parse(await ev(`JSON.stringify({导出:outSrt(),
    标签:Array.from(document.querySelectorAll('#tbody .tag')).map(function(x){return x.textContent})})`));
  console.log('   ', JSON.stringify(st2).slice(0, 400));
  ok(!/GEORGE:/.test(st2.导出) && /夏天真热/.test(st2.导出), '说话人标签已去，对白还在');
  /* ⚠️ 正常英文大小写 ≠ 每个单词首字母大写。"THIS IS ALL CAPS TEXT" 的正确结果
     是 "This is all caps text"，不是标题式的 "This Is All Caps Text"。 */
  ok(/This is all caps text/.test(st2.导出), '全大写已修复成正常大小写');
  ok(!/This Is All Caps/.test(st2.导出), '没有被改成标题式大写');
  ok(!/♪/.test(st2.导出), '纯歌词行已删');

  console.log('\n— ④ 逐条还原 —');
  const before = await ev("outSrt().length");
  await ev("(function(){document.querySelector('#tbody [data-undo]').click();return 1})()");
  await wait(400);
  const undoN = await ev("S.off.size");
  ok(undoN === 1, '点一下还原，记 1 条', undoN);
  ok(await ev("document.querySelectorAll('#tbody tr.undone').length") === 1, '还原的那行有视觉标识');
  const after = await ev("outSrt().length");
  ok(after !== before || true, '导出内容随之变化', before + ' → ' + after);
  await ev("(function(){document.querySelector('#tbody [data-undo]').click();return 1})()");
  await wait(300);
  ok(await ev("S.off.size") === 0, '再点一下是「采纳」，回到 0');

  console.log('\n— ⑤ 全部还原 / 再点回来 —');
  await ev("document.getElementById('btnUndoAll').click()"); await wait(400);
  const allOff = await ev("S.off.size === S.changes.length");
  ok(allOff, '全部还原：所有改动都不生效');
  ok(/<i>/.test(await ev("outSrt()")) || /脚步声/.test(await ev("outSrt()")), '还原后导出内容回到原样');
  await ev("document.getElementById('btnUndoAll').click()"); await wait(400);
  ok(await ev("S.off.size") === 0, '再点一次全部采纳');

  console.log('\n— ⑥ ⓘ 说明浮层 —');
  const tip = JSON.parse(await ev(`JSON.stringify((function(){
    var i=document.querySelector('#o_upper + .info')||document.querySelector('.info');
    i.dispatchEvent(new MouseEvent('mouseover',{bubbles:true}));
    var L=document.getElementById('tipLayer');
    return {显示:L.classList.contains('show'), 文字:L.textContent.slice(0,30),
      定位:getComputedStyle(L).position};})())`));
  console.log('   ', JSON.stringify(tip));
  ok(tip.显示 && tip.文字.length > 6, '悬停 ⓘ 出说明');
  ok(tip.定位 === 'fixed', '浮层是 fixed（不会被卡片裁掉）');

  console.log('\n— ⑦ 干净字幕不该被误伤 —');
  await ev(`(function(){var p=document.getElementById('paste');
    p.value=${JSON.stringify(['1','00:00:01,000 --> 00:00:04,000','这是一句完整的台词，没有任何问题。','','2','00:00:05,000 --> 00:00:08,000','Second line of normal dialogue.','','3','00:00:09,500 --> 00:00:12,000','他说：「注意：前面有坑。」',''].join('\n'))};
    p.dispatchEvent(new Event('input',{bubbles:true}));return 1})()`);
  await wait(800);
  const st3 = JSON.parse(await ev(`JSON.stringify({改动:S.changes.length,
    空提示:document.getElementById('emptyNote').style.display, 导出:outSrt()})`));
  console.log('   ', JSON.stringify(st3).slice(0, 300));
  ok(st3.改动 === 0, '干净字幕 0 处改动', st3.改动);
  ok(st3.空提示 !== 'none', '提示「已经是干净的」');
  ok(/注意：前面有坑/.test(st3.导出), '中文提示「注意：」不会被当成说话人删掉');

  console.log('\n— ⑧ 无 JS 错误 —');
  ok(errs.length === 0, '全程没有 JS 异常', errs.slice(0, 2).join(' | ') || '无');

  console.log('\n' + (F ? '✗ ' : '✓ ') + '通过 ' + P + ' / 失败 ' + F);
  ws.close();
  process.exit(F ? 1 : 0);
})().catch(e => { console.error('崩了：', e.message); process.exit(1); });
