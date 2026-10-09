/* v0.9.248 真浏览器验证：上传区瘦身 / 槽胶囊筛选 / 贴底选择条 */
const WebSocket=require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws'),http=require('http');
const PORT=9333,PAGE='http://127.0.0.1:3098/merge.html';
function httpJson(p){return new Promise((res,rej)=>{const r=http.request({host:'127.0.0.1',port:PORT,path:p,method:'PUT'},x=>{let d='';x.on('data',c=>d+=c);x.on('end',()=>{try{res(JSON.parse(d))}catch(e){rej(new Error(d.slice(0,200)))}})});r.on('error',rej);r.end();});}
const wait=ms=>new Promise(r=>setTimeout(r,ms));
let pass=0,fail=0;
const ok=(c,m)=>{ if(c){pass++;console.log('  ✓ '+m);} else {fail++;console.log('  ✗ '+m);} };
(async()=>{
  const v=await httpJson('/json/new?'+encodeURIComponent(PAGE));
  const ws=new WebSocket(v.webSocketDebuggerUrl,{perMessageDeflate:false});let id=0;const wt=new Map();const errs=[];
  await new Promise(r=>ws.on('open',r));
  ws.on('message',m=>{const g=JSON.parse(m);if(g.id&&wt.has(g.id)){const q=wt.get(g.id);wt.delete(g.id);g.error?q.rej(new Error(JSON.stringify(g.error))):q.res(g.result);}
    if(g.method==='Runtime.exceptionThrown') errs.push((g.params.exceptionDetails.exception||{}).description||g.params.exceptionDetails.text);});
  const send=(m,p)=>new Promise((res,rej)=>{const i=++id;wt.set(i,{res,rej});ws.send(JSON.stringify({id:i,method:m,params:p||{}}))});
  const ev=async e=>{const r=await send('Runtime.evaluate',{expression:e,awaitPromise:true,returnByValue:true});
    if(r.exceptionDetails) return 'ERR:'+((r.exceptionDetails.exception||{}).description||r.exceptionDetails.text); return r.result?r.result.value:null;};
  await send('Page.enable');await send('Runtime.enable');
  await send('Emulation.setDeviceMetricsOverride',{width:1440,height:900,deviceScaleFactor:1,mobile:false});
  await wait(2200);

  console.log('\n— 1. 上传区瘦身 —');
  const u=JSON.parse(await ev(`JSON.stringify({
    grid2: Math.round(document.querySelector('.grid2').getBoundingClientRect().height),
    drop: Math.round(document.getElementById('srcDrop').getBoundingClientRect().height),
    taDisp: getComputedStyle(document.getElementById('srcText')).display,
    pasteBtn: !!document.querySelector('[data-paste="src"]'),
    设置卡顶: Math.round(document.querySelector('.opts').getBoundingClientRect().top+window.scrollY)
  })`));
  console.log('   ',JSON.stringify(u));
  ok(u.grid2 < 180, '上传区 233 → '+u.grid2+'px（<180）');
  ok(u.drop < 45, '紧凑条高度 '+u.drop+'px（原 82）');
  ok(u.taDisp === 'none', '粘贴框默认收起');
  ok(u.pasteBtn, '有「粘贴文本」按钮');

  console.log('\n— 2. 粘贴框可展开 —');
  await ev(`document.querySelector('[data-paste="src"]').click();1`); await wait(300);
  ok(await ev(`getComputedStyle(document.getElementById('srcText')).display`) === 'block', '点一下展开');
  await ev(`document.querySelector('[data-paste="src"]').click();1`); await wait(300);
  ok(await ev(`getComputedStyle(document.getElementById('srcText')).display`) === 'none', '再点收起');

  // 造数据合并
  let en='',zh='';
  for(let i=1;i<=40;i++){const a=String(i*3).padStart(2,'0');
    en+=`${i}\n00:00:${a},000 --> 00:00:${String(i*3+2).padStart(2,'0')},000\nHello line number ${i}\n\n`;
    zh+=`${i}\n00:00:${a},000 --> 00:00:${String(i*3+2).padStart(2,'0')},000\n你好第 ${i} 行内容\n\n`;}
  await ev(`(function(){var a=document.getElementById('srcText'),b=document.getElementById('dstText');
    a.value=${JSON.stringify(en)};a.dispatchEvent(new Event('input',{bubbles:true}));
    b.value=${JSON.stringify(zh)};b.dispatchEvent(new Event('input',{bubbles:true}));return 1})()`);
  await wait(700);
  await ev("document.getElementById('btnMerge').click();1"); await wait(1200);
  await ev("document.getElementById('expFmt').value='stack';document.getElementById('expFmt').dispatchEvent(new Event('change',{bubbles:true}));1"); await wait(600);
  console.log('\n— 3. 勾选行 → 贴底选择条 —');
  const d0=await ev(`getComputedStyle(document.getElementById('selDock')).display`);
  ok(d0==='none','没勾选时 dock 隐藏');
  await ev(`(function(){var cb=document.querySelector('#repRows input[data-ri]'); cb.click(); return 1})()`);
  await wait(500);
  const d1=JSON.parse(await ev(`(function(){
    var dk=document.getElementById('selDock'), tb=document.querySelector('.tbl-wrap');
    var dr=dk.getBoundingClientRect(), tr=tb.getBoundingClientRect();
    return JSON.stringify({
      disp:getComputedStyle(dk).display,
      文案:dk.textContent.slice(0,20),
      槽胶囊数:dk.querySelectorAll('[data-dock-slot]').length,
      贴底偏差:Math.round(Math.abs(dr.bottom-tr.bottom)),
      在表格内:dr.top>=tr.top-1&&dr.bottom<=tr.bottom+1
    });})()`));
  console.log('   ',JSON.stringify(d1));
  ok(d1.disp!=='none','勾选后 dock 出现');
  ok(d1.槽胶囊数>=4,'dock 里有 '+d1.槽胶囊数+' 个槽');
  ok(d1.在表格内 && d1.贴底偏差<=2,'dock 贴在表格底部（偏差 '+d1.贴底偏差+'px）');

  console.log('\n— 4. 滚表格时 dock 仍在 —');
  await ev(`document.querySelector('.tbl-wrap').scrollTop=300;1`); await wait(400);
  const d2=JSON.parse(await ev(`(function(){
    var dk=document.getElementById('selDock'), tb=document.querySelector('.tbl-wrap');
    var dr=dk.getBoundingClientRect(), tr=tb.getBoundingClientRect();
    return JSON.stringify({贴底偏差:Math.round(Math.abs(dr.bottom-tr.bottom)), 可见:dr.height>0&&dr.bottom<=tr.bottom+1});})()`));
  console.log('   ',JSON.stringify(d2));
  ok(d2.可见 && d2.贴底偏差<=2,'滚 300px 后仍贴底（偏差 '+d2.贴底偏差+'px）');

  console.log('\n— 5. 点 dock 里的槽 = 直接应用 —');
  await ev(`document.querySelector('.tbl-wrap').scrollTop=0;1`); await wait(300);
  const before=await ev(`JSON.stringify({sel:S.sel.size, assign:Object.keys(S.style.assign).length})`);
  const a0=JSON.parse(before).assign;
  await ev(`(function(){var c=document.querySelector('#selDock [data-dock-slot="lyric"]'); c.click(); return 1})()`);
  await wait(600);
  const after=await ev(`JSON.stringify({sel:S.sel.size, assign:Object.keys(S.style.assign).length, dock:getComputedStyle(document.getElementById('selDock')).display, toast:document.getElementById('toast').textContent})`);
  console.log('   前:',before,'\n   后:',after);
  const A=JSON.parse(after);
  ok(A.assign===a0+1,'槽已落到行上（assign '+a0+' → '+A.assign+'）');
  ok(/歌词|lyric/i.test(A.toast),'提示说的是被点的那个槽：'+A.toast);
  ok(A.dock==='none','应用完 dock 收起');

  console.log('\n— 6. 槽胶囊 = 筛选 —');
  await ev(`(function(){var c=document.querySelector('#slotBar [data-slot="lyric"]'); c.click(); return 1})()`);
  await wait(600);
  const want=await ev(`S.rows.filter((r,i)=>slotOfRow(i)==='lyric').length`);
  const f=JSON.parse(await ev(`JSON.stringify({
    filterSlot:S.filter.slot,
    可见行:document.querySelectorAll('#repRows tr').length,
    胶囊filt:!!document.querySelector('#slotBar .slot-chip.filt'),
    状态条:document.getElementById('filterStat').textContent.slice(0,24)
  })`));
  console.log('   ',JSON.stringify(f));
  ok(f.filterSlot==='lyric','筛选态已设');
  ok(f.可见行===want,'只剩 '+want+' 行（应用了该槽的），实际 '+f.可见行);
  ok(f.胶囊filt,'胶囊显示筛选态');
  await ev(`(function(){var c=document.querySelector('#slotBar [data-slot="lyric"]'); c.click(); return 1})()`); await wait(500);
  ok(await ev(`S.filter.slot`)==='','再点取消筛选');
  ok(await ev(`document.querySelectorAll('#repRows tr').length`)===32,'恢复全部 32 行');

  console.log('\n— 7. 小铅笔 = 编辑槽（不筛选）—');
  await ev(`(function(){var b=document.querySelector('#slotBar [data-slot-edit="sfx"]'); b.click(); return 1})()`); await wait(500);
  const e7=JSON.parse(await ev(`JSON.stringify({cur:S.style.cur, open:document.getElementById('slotEdit').open, filter:S.filter.slot})`));
  console.log('   ',JSON.stringify(e7));
  ok(e7.cur==='sfx' && e7.open,'cur 切到 sfx 且编辑面板展开');
  ok(e7.filter==='','小铅笔不触发筛选');

  console.log('\n— 8. v0.9.250：旧应用条已删，「整篇套用」挪进贴底条 —');
  ok(await ev(`!document.getElementById('applyBar') && !document.getElementById('mApplySlot') && !document.getElementById('mApplyBtn')`)===true,'旧应用条已整块删除');
  /* dock 只在有勾选时出现 —— 先勾一行再找按钮 */
  await ev(`(function(){var cb=document.querySelector('#repRows input[data-ri]');cb.click();return 1})()`); await wait(500);
  ok(await ev(`!!document.querySelector('#selDock [data-dock-all="1"]')`)===true,'贴底条里有「整篇套用」按钮');
  const rowN=await ev(`S.rows.length`);
  /* 按钮套的是「当前编辑的槽」→ 先把 cur 切到旁白，文案必须跟着变（这正是它比旧下拉强的地方） */
  await ev(`(function(){ensureStyle();S.style.cur='sfx';renderSelDock();return 1})()`); await wait(200);
  const lbl0=await ev(`document.querySelector('#selDock [data-dock-all="1"]').textContent`);
  ok(/音效|sfx/i.test(String(lbl0)),'按钮文案跟着 cur 走（参考值：'+lbl0+'）');
  await ev(`(function(){ensureStyle();S.style.cur='narration';renderSelDock();document.querySelector('#selDock [data-dock-all="1"]').click();return 1})()`); await wait(500);
  ok(await ev(`(S.rows||[]).every(function(r,i){return slotOfRow(i)==='narration';})`)===true,'点它 → 全篇都是旁白槽（'+rowN+' 行）');
  ok(await ev(`!!document.getElementById('mSelAll')`)===true,'全选仍可用');

  console.log('\n— 9. JS 异常 —');
  const real=errs.filter(e=>!/favicon|404/i.test(e||''));
  ok(real.length===0,'无运行时异常（'+real.length+'）'+(real.length?' → '+real[0].slice(0,140):''));

  console.log('\n===== '+pass+'/'+(pass+fail)+'，fail='+fail+' =====');
  process.exit(0);
})().catch(e=>{console.error('FATAL',e.message);process.exit(1)});
