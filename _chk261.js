/* v0.9.258 本地实测：主站导出面板（按钮面板 + 折行联动 + 去特效页入口 + 落点自动导入）
   用法：先 `PORT=3098 node server.js`，手动起 9333 的 headless Chrome，然后 node _chk261.js */
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');
const http = require('http');
const PORT = 9333, BASE = 'http://127.0.0.1:3098';
let P = 0, F = 0;
const ok = (c, m, x) => { c ? P++ : F++; console.log((c ? '  ✓ ' : '  ✗ ') + m + (x !== undefined ? '  → ' + x : '')); };
const wait = ms => new Promise(r => setTimeout(r, ms));
function J(p){ return new Promise((res, rej) => { const r = http.request({ host:'127.0.0.1', port:PORT, path:p, method:'PUT', headers:{Host:'127.0.0.1:'+PORT} }, x => { let d=''; x.on('data',c=>d+=c); x.on('end',()=>{ try{ res(JSON.parse(d)); }catch(e){ rej(new Error(d.slice(0,200))); } }); }); r.on('error', rej); r.end(); }); }

/* 造两份带译文的行：够真（有 id/时间轴/原文/译文），也够短（一眼能数清） */
const SEED = `(function(){S.rows=[
  {id:0,start:1000,end:3000,en:'Hello there',zh:'你好'},
  {id:1,start:4000,end:6000,en:'Good morning',zh:'早上好'},
  {id:2,start:7000,end:9000,en:'See you soon',zh:'回头见'}
];S.fileBase='demo';renderRows();return 1})()`;

(async () => {
  /* ⚠️ 先开空白页再导航：/json/new 直接带 URL 会在 setCacheDisable 生效**之前**开载，
     Chrome 可能从缓存里端出一份旧页面（今天踩过：CSS 全对却量出 22×16 的假失败）。 */
  const v = await J('/json/new?' + encodeURIComponent('about:blank'));
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
  await send('Page.navigate', { url: BASE + '/index.html' });
  await wait(2200);

  console.log('\n— ① 面板结构：下拉换按钮，状态源还在 —');
  await ev("document.getElementById('btnDemo').click()");
  await wait(1800);
  ok(await ev("!document.getElementById('viewWorkspace').hidden"), '已进入字幕工作台');
  await ev(SEED); await wait(600);
  ok(await ev('S.rows.length') === 3, '测试行已就位', await ev('S.rows.length'));

  ok(await ev("!!document.getElementById('expStyle')"), 'select#expStyle 仍在（唯一状态源）');
  /* ⚠️ 不量尺寸：Chrome 154 对 <select> 有固有最小盒（22×16），1×1 压不进去（内联也无效）。
     隐藏的语义是「看不见 + 点不着 + 不进 Tab 序 + 不占布局」——量这四样才是对的。 */
  const hid = JSON.parse(await ev("(function(){var s=document.getElementById('expStyle'),cs=getComputedStyle(s);return JSON.stringify({op:cs.opacity,pe:cs.pointerEvents,pos:cs.position,clip:cs.clipPath,tab:s.tabIndex,aria:s.getAttribute('aria-hidden')})})()"));
  ok(hid.op === '0' && hid.pe === 'none' && hid.pos === 'absolute' && hid.tab === -1 && hid.aria === 'true',
    '下拉已按「视觉隐藏」处理：透明 + 点不着 + 不进 Tab 序 + 不占布局', JSON.stringify(hid));
  ok(await ev("document.getElementById('expStyle').options.length") === 17, '17 种组合一个不少', await ev("document.getElementById('expStyle').options.length"));
  ok(await ev("document.querySelectorAll('#fmtRowKind .fmt-btn').length") === 3, '第一排 3 个内容按钮', await ev("document.querySelectorAll('#fmtRowKind .fmt-btn').length"));
  ok(await ev("document.querySelectorAll('#fmtRowFile .fmt-btn').length") === 6, '第二排 6 个文件按钮', await ev("document.querySelectorAll('#fmtRowFile .fmt-btn').length"));
  ok(await ev("document.getElementById('fmtPanel').getBoundingClientRect().height") > 40, '面板真的占地方（不是 0 高）',
    await ev("Math.round(document.getElementById('fmtPanel').getBoundingClientRect().height)"));
  ok(await ev("[...document.querySelectorAll('#fmtRowKind .fmt-btn')].map(b=>b.textContent).join('|')") === '仅译文（单语）|双语 · 原文在上|双语 · 译文在上',
    '内容按钮文案', await ev("[...document.querySelectorAll('#fmtRowKind .fmt-btn')].map(b=>b.textContent).join('|')"));

  console.log('\n— ①b v0.9.260 重设计：分组分段 + 两行式标签 + 选中态分级 + focus 接管 —');
  const rd = JSON.parse(await ev(`(function(){
    setFmt('bi-src','ass');
    var rows=document.querySelectorAll('.fmt-row'), kr=document.getElementById('fmtRowKind'), fr=document.getElementById('fmtRowFile');
    var krS=getComputedStyle(kr), frS=getComputedStyle(fr);
    /* 等分：每排按钮宽度极差 */
    function spread(sel){var ws=[...document.querySelectorAll(sel)].map(function(b){return b.getBoundingClientRect().width});return Math.max.apply(null,ws)-Math.min.apply(null,ws);}
    /* 文件按钮两行式结构 + 小注文案 */
    var subs={};
    fr.querySelectorAll('.fmt-btn').forEach(function(b){
      var f=b.getAttribute('data-file'), nm=b.querySelector('.nm'), sub=b.querySelector('.sub');
      subs[f]={nm:nm?nm.textContent:'', sub:sub?sub.textContent:'', twoLine:!!(nm&&sub)};
    });
    /* 选中态分级：内容选中 = 白底 + 粉边 + 阴影；文件选中 = 浅粉底 */
    var kon=kr.querySelector('.fmt-btn.on'), fon=fr.querySelector('.fmt-btn.on');
    var konS=getComputedStyle(kon), fonS=getComputedStyle(fon);
    /* focus 接管：样式表里存在 .fmt-btn:focus-visible 规则 */
    var hasFv=false;
    for(var i=0;i<document.styleSheets.length;i++){var sh=document.styleSheets[i],rs;try{rs=sh.cssRules}catch(e){continue}
      for(var j2=0;j2<rs.length;j2++){if(rs[j2].selectorText&&rs[j2].selectorText.indexOf('.fmt-btn:focus-visible')>=0){hasFv=true;break}}}
    return JSON.stringify({
      grp:{krGrid:krS.display, krBg:krS.backgroundColor, krRad:krS.borderRadius, frGrid:frS.display, frBg:frS.backgroundColor},
      spreadKind:spread('#fmtRowKind .fmt-btn'), spreadFile:spread('#fmtRowFile .fmt-btn:not([hidden])'),
      subs:subs,
      tier:{konBg:konS.backgroundColor, konBorder:konS.borderColor, konShadow:konS.boxShadow!=='none',
            fonBg:fonS.backgroundColor, fonBorder:fonS.borderColor},
      hasFv:hasFv
    });
  })()`));
  ok(rd.grp.krGrid === 'grid' && rd.grp.frGrid === 'grid', '两组都是 grid 等分容器', rd.grp.krGrid + '/' + rd.grp.frGrid);
  ok(rd.grp.krBg !== 'rgba(0, 0, 0, 0)' && rd.grp.frBg !== 'rgba(0, 0, 0, 0)', '两组都有灰底（分组可见）', JSON.stringify(rd.grp));
  ok(rd.spreadKind < 2, '内容排 3 格等宽（极差 <2px）', rd.spreadKind);
  ok(rd.spreadFile < 2, '文件排格子等宽（极差 <2px）', rd.spreadFile);
  ok(rd.subs.ass.nm === 'ASS' && rd.subs['ass-stack'].nm === 'ASS', '两颗 ASS 主名都是 ASS');
  ok(rd.subs.ass.sub === '上下双屏' && rd.subs['ass-stack'].sub === '底部双行', 'ASS 小注 = 上下双屏 / 底部双行', rd.subs.ass.sub + ' / ' + rd.subs['ass-stack'].sub);
  ok(rd.subs.srt.sub === '最通用' && rd.subs.vtt.sub === '网页播放' && rd.subs.sbv.sub === 'YouTube' && rd.subs.txt.sub === '纯文本',
    'SRT/VTT/SBV/TXT 小注各就位', JSON.stringify({s:rd.subs.srt.sub, v:rd.subs.vtt.sub, b:rd.subs.sbv.sub, t:rd.subs.txt.sub}));
  ok(Object.keys(rd.subs).every(function(f){return rd.subs[f].twoLine}), '6 个文件按钮全部两行式（.nm + .sub）');
  ok(rd.tier.konBg !== rd.tier.fonBg, '选中态分级：内容选中 ≠ 文件选中 的底色', JSON.stringify(rd.tier));
  ok(rd.tier.konShadow, '内容选中有浮起阴影');
  ok(rd.hasFv, 'focus-visible 样式接管存在（粉色 focus 环）');
  /* 语言切换：小注跟着走，结构不塌 */
  const enSub = await ev(`(function(){
    var sel=document.getElementById('uiLang2')||document.getElementById('uiLang');
    sel.value='en'; sel.dispatchEvent(new Event('change'));
    var b=document.querySelector('#fmtRowFile .fmt-btn[data-file=ass] .sub');
    var s2=document.querySelector('#fmtRowFile .fmt-btn[data-file=ass-stack] .sub');
    var nm=document.querySelector('#fmtRowFile .fmt-btn[data-file=ass] .nm');
    var back=(b?b.textContent:'')+'|'+(s2?s2.textContent:'')+'|'+(nm?nm.textContent:'');
    sel.value='zh-CN'; sel.dispatchEvent(new Event('change'));
    return back;
  })()`);
  ok(/Top \+ bottom\|Two lines, bottom\|ASS/.test(enSub), '切英语小注跟随（Top + bottom / Two lines, bottom），主名仍是 ASS', enSub);
  const zhBack = await ev("(function(){return document.querySelector('#fmtRowFile .fmt-btn[data-file=ass] .sub').textContent})()");
  ok(zhBack === '上下双屏', '切回中文小注复原', zhBack);

  console.log('\n— ② 17 种组合：点得到、值对得上、高亮跟着走 —');
  const combos = JSON.parse(await ev(`(function(){
    var kinds=['mono','bi-src','bi-dst'], files=['srt','vtt','sbv','ass','ass-stack','txt'], out=[];
    kinds.forEach(function(k){ files.forEach(function(f){
      setFmt(k,f);
      var v=document.getElementById('expStyle').value;
      var exp=(k==='mono'&&f==='ass-stack')?'mono|ass':(k+'|'+f);
      var on1=document.querySelector('#fmtRowKind .fmt-btn.on');
      var on2=document.querySelector('#fmtRowFile .fmt-btn.on');
      out.push({k:k,f:f,v:v,good:v===exp,hi1:on1&&on1.getAttribute('data-kind')===k,
                hi2:on2&&on2.getAttribute('data-file')===(v.split('|')[1])});
    });});
    return JSON.stringify(out);
  })()`));
  ok(combos.length === 18 && new Set(combos.map(c=>c.v)).size === 17, '穷举 18 次点击、落出 17 个不同值（单语双行并入分屏）',
    combos.length + ' 次 / ' + new Set(combos.map(c=>c.v)).size + ' 值');
  const bad = combos.filter(c => !c.good);
  ok(bad.length === 0, '每种都落到正确的值（单语双行降级为分屏）', bad.map(b=>b.k+'|'+b.f+'→'+b.v).join(',') || '全对');
  ok(combos.every(c => c.hi1), '内容排高亮始终跟着选中项');
  ok(combos.every(c => c.hi2), '文件排高亮始终跟着选中项');
  const stackBtn = JSON.parse(await ev("(function(){setFmt('mono','srt');var b=document.querySelector('#fmtRowFile .fmt-btn[data-file=ass-stack]');return JSON.stringify({hidden:b.hidden,w:b.getBoundingClientRect().width})})()"));
  ok(stackBtn.hidden && stackBtn.w === 0, '单语下「ASS · 双行」整块收起（不是假按钮）', JSON.stringify(stackBtn));
  ok(JSON.parse(await ev("(function(){setFmt('bi-src','ass-stack');return JSON.stringify({v:document.getElementById('expStyle').value,st:assStacked(),ff:expFileFmt()})})()")).st === true,
    '双语下双行可选，且 assStacked() 为真');

  console.log('\n— ③ 折行设置：保留，且跟着内容格式联动 —');
  ok(await ev("!!document.getElementById('maxW') && !!document.getElementById('biMaxW')"), '两个行宽输入框都在');
  let w = JSON.parse(await ev("(function(){setFmt('mono','srt');return JSON.stringify({a:document.getElementById('wcellMaxW').hidden,b:document.getElementById('wcellBiMaxW').hidden,tip:document.getElementById('wrapTipEl').dataset.i18n})})()"));
  ok(w.a === false && w.b === true, '单语 → 只显示「单语行宽」', JSON.stringify(w));
  ok(w.tip === 'wrapTip', '说明文案也跟着换成单语口径', w.tip);
  w = JSON.parse(await ev("(function(){setFmt('bi-src','srt');return JSON.stringify({a:document.getElementById('wcellMaxW').hidden,b:document.getElementById('wcellBiMaxW').hidden,tip:document.getElementById('wrapTipEl').dataset.i18n})})()"));
  ok(w.a === true && w.b === false, '双语 → 换成「双语行宽」', JSON.stringify(w));
  ok(w.tip === 'wrapTipBi', '说明文案换成双语口径', w.tip);
  ok(await ev("(function(){setFmt('bi-src','ass-stack');return document.getElementById('wcellBiMaxW').hidden})()") === false, '换成 ASS 双行后折行设置仍在');

  console.log('\n— ④ 复杂 ASS / VTT 面板：本页已收起 —');
  ok(await ev("(function(){setFmt('bi-src','ass');return document.getElementById('assStyleBox').style.display})()") === 'none', '选 ASS 也不弹外观面板');
  ok(await ev("(function(){setFmt('bi-src','vtt');return document.getElementById('vttStyleBox').style.display})()") === 'none', '选 VTT 也不弹外观面板');
  ok(await ev('typeof ADV_EXPORT !== "undefined" && ADV_EXPORT === false'), 'ADV_EXPORT 开关为 false（改回 true 即可复原）');

  console.log('\n— ⑤ 去特效页的入口 —');
  ok(await ev("!!document.getElementById('btnFxGoto')"), '入口按钮存在');
  ok(await ev("document.getElementById('btnFxGoto').getBoundingClientRect().height") > 20, '入口可见');
  ok(/特效/.test(await ev("document.getElementById('btnFxGoto').textContent")), '按钮文案', await ev("document.getElementById('btnFxGoto').textContent"));
  ok(/带过去/.test(await ev("document.querySelector('.fx-goto .hint').textContent")), '提示文案写了「把这份字幕带过去」',
    await ev("document.querySelector('.fx-goto .hint').textContent"));

  console.log('\n— ⑥ 带走的内容：单语 / 双语各带各的 —');
  const monoP = JSON.parse(await ev("(function(){setFmt('mono','srt');return JSON.stringify(buildFxPayload())})()"));
  ok(monoP && monoP.mode === 'mono', '单语模式 → mode=mono', monoP && monoP.mode);
  ok(/你好/.test(monoP.text) && !/Hello/.test(monoP.text), '只带译文，不带原文');
  ok(/00:00:01,000/.test(monoP.text), '走 SRT 格式带时间轴', monoP.text.split('\n')[1]);
  ok(/\.srt$/.test(monoP.name), '文件名带 .srt', monoP.name);

  const biP = JSON.parse(await ev("(function(){setFmt('bi-src','srt');return JSON.stringify(buildFxPayload())})()"));
  ok(biP && biP.mode === 'bi', '双语模式 → mode=bi', biP && biP.mode);
  const firstCue = biP.text.split('\n\n')[0].split('\n');
  ok(firstCue[2] === 'Hello there' && firstCue[3] === '你好', '双语一律「原文在上」（特效页按第 1 行=原文认列）', firstCue.slice(2).join(' / '));
  const biDst = JSON.parse(await ev("(function(){setFmt('bi-dst','srt');return JSON.stringify(buildFxPayload())})()"));
  ok(biDst.text.split('\n\n')[0].split('\n')[2] === 'Hello there', '选了「译文在上」也照样按原文在上带走（否则特效页会拆反）');

  console.log('\n— ⑦ 没译文时的兜底 —');
  await ev("(function(){S.rows.forEach(function(r){r.zh=''});renderRows();return 1})()");
  await wait(400);
  ok(await ev('fxHasZh()') === false, '没有译文时 fxHasZh() 为假');
  ok(await ev('buildFxPayload()') === null, '此时不生成载荷（不会被带过去）');
  /* ⚠️ v0.9.212 起 URL 跟随界面语言（zh-CN → '/'，①b 切过语言后路径已不是 /index.html），
     所以「没跳走」的判据 = 点前后路径不变 + 仍在本页（不是去比对某个写死的路径） */
  const pathBefore = await ev('location.pathname');
  await ev("document.getElementById('btnFxGoto').click()");
  await wait(600);
  ok(await ev("sessionStorage.getItem('srt_fx_in')") === null, '点了也不写暂存');
  ok((await ev('location.pathname')) === pathBefore && await ev("typeof S !== 'undefined' && !!document.getElementById('btnFxGoto')"), '没有跳走（路径未变、仍在翻译页）', pathBefore + ' → ' + await ev('location.pathname'));
  ok(/译文/.test(await ev("document.getElementById('log').textContent.slice(-200)")), '给了「先完成翻译」的提示');

  console.log('\n— ⑧ 真点一下：跳过去并且自动出结果 —');
  await ev(SEED); await wait(500);
  await ev("(function(){setFmt('bi-src','srt');return 1})()");
  await ev("document.getElementById('btnFxGoto').click()");
  await wait(3000);
  ok(await ev('location.pathname') === '/merge.html', '跳到了特效页', await ev('location.pathname'));
  ok(await ev("sessionStorage.getItem('srt_fx_in')") === null, '暂存取完即删（刷新不会重复灌）');
  const m = JSON.parse(await ev(`JSON.stringify({
    mode:(document.querySelector('#modeTabs input[name=workMode]:checked')||{}).value,
    src:S.src&&S.src.length, rows:S.rows&&S.rows.length,
    en:(S.rows&&S.rows[0]&&S.rows[0].en)||'', zh:(S.rows&&S.rows[0]&&S.rows[0].zh)||'',
    tr:document.querySelectorAll('tbody tr').length,
    toast:(document.querySelector('#toast')||{}).textContent||''
  })`));
  ok(m.mode === 'adjust', '落在「调整双语」模式', m.mode);
  ok(m.src === 3, '3 条字幕带了过来', m.src);
  ok(m.rows === 3, '已自动拆好 3 行', m.rows);
  ok(m.en === 'Hello there' && m.zh === '你好', '原文/译文列没拆反', m.en + ' / ' + m.zh);
  ok(m.tr >= 3, '表格已经画出来', m.tr);
  ok(/带入/.test(m.toast) && !/fxImported/.test(m.toast), '提示是正常文案（不是 key 名）', m.toast);

  console.log('\n— ⑨ JS 错误 —');
  ok(errs.length === 0, '全程无 JS 异常', errs.slice(0, 2).join(' | '));

  console.log('\n合计 ' + P + ' ✓ / ' + F + ' ✗');
  ws.close();
  process.exit(F === 0 ? 0 : 1);
})().catch(e => { console.error('crash', e.message); process.exit(1); });
