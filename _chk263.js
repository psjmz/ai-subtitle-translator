/* v0.9.262 任务条下方广告位实测
   ① 初始隐藏、未 push（懒加载，避免 availableWidth=0 的 No slot size 报错）
   ② 任务条出现（setProg(true)）才唤起，且幂等（重复 push 会被 Google 拒）
   ③ 之后常驻，不随任务条收起而消失
   ④ 两块模块（统计卡 / 任务条）确实瘦身
   ⑤ 整个流程无 JS 异常
   起法：先手动起 9333 Chrome + PORT=3098 node server.js（见 skill） */
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');
const http = require('http');
const PORT = 9333, BASE = 'http://127.0.0.1:3098';
const wait = ms => new Promise(r => setTimeout(r, ms));
let PASS = 0, FAIL = 0;
const ok = (c, name, extra) => { console.log((c ? '  ✓ ' : '  ✗ ') + name + (extra !== undefined && !c ? '  [' + extra + ']' : '')); c ? PASS++ : FAIL++; };
function J(p){ return new Promise((res, rej) => { const r = http.request({ host:'127.0.0.1', port:PORT, path:p, method:'PUT' }, x => { let d=''; x.on('data',c=>d+=c); x.on('end',()=>{ try{ res(JSON.parse(d)); }catch(e){ rej(new Error(d.slice(0,200))); } }); }); r.on('error', rej); r.end(); }); }

(async () => {
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
  await send('Page.navigate', { url: BASE + '/' });
  await wait(2800);

  console.log('【v0.9.262 任务条下方广告位】');
  /* ⚠️ showView 的参数是 'workspace'（不是 'ws'）——传错会停在首页，
     所有 offsetHeight/clientWidth 都是 0，瘦身类断言会假绿。 */
  await ev(`showView('workspace')`); await wait(600);
  const wsOn = await ev(`getComputedStyle(document.getElementById('viewWorkspace')).display`);
  console.log('  工作台 display = ' + wsOn);
  ok(wsOn !== 'none', '⓪ 已进入工作台（否则下面尺寸全是 0）', wsOn);

  /* ---------- ① 初始状态 ---------- */
  console.log('\n— ① 初始：隐藏、未推、脚本只引一次 —');
  const s1 = JSON.parse(await ev(`JSON.stringify((function(){
    var box=document.getElementById('adBox'), ins=box&&box.querySelector('ins.adsbygoogle');
    return {
      boxCount: document.querySelectorAll('#adBox').length,
      boxFound: !!box,
      hasShow: box?box.classList.contains('show'):null,
      display: box?getComputedStyle(box).display:null,
      insCount: document.querySelectorAll('#adBox ins.adsbygoogle').length,
      slot: ins?ins.getAttribute('data-ad-slot'):null,
      client: ins?ins.getAttribute('data-ad-client'):null,
      fmt: ins?ins.getAttribute('data-ad-format'):null,
      fullW: ins?ins.getAttribute('data-full-width-responsive'):null,
      status: ins?ins.getAttribute('data-ad-status'):null,
      iframes: ins?ins.querySelectorAll('iframe').length:-1,
      loader: document.querySelectorAll('script[src*="adsbygoogle.js"]').length,
      showAdFn: typeof window.showAd,
      adPushed: typeof window.AD_PUSHED==='boolean' ? window.AD_PUSHED : null
    };
  })())`));
  ok(s1.boxFound && s1.boxCount === 1, '① #adBox 存在且唯一', JSON.stringify(s1.boxCount));
  ok(s1.hasShow === false, '② 初始不带 .show', String(s1.hasShow));
  ok(s1.display === 'none', '③ 初始 display:none（懒加载，不 push）', s1.display);
  ok(s1.insCount === 1, '④ 广告 ins 唯一', String(s1.insCount));
  ok(s1.client === 'ca-pub-8352564748755277', '⑤ data-ad-client 正确', s1.client);
  ok(s1.slot === '2593336254', '⑥ data-ad-slot 正确', s1.slot);
  ok(s1.fmt === 'auto' && s1.fullW === 'true', '⑦ 自适应横屏（auto + full-width-responsive）', s1.fmt + '/' + s1.fullW);
  ok(s1.status === null && s1.iframes === 0, '⑧ 初始未推、无广告 iframe', s1.status + '/' + s1.iframes);
  ok(s1.loader === 1, '⑨ 加载器脚本只引一次（未重复引入）', String(s1.loader));
  ok(s1.showAdFn === 'function' && s1.adPushed === false, '⑩ showAd 存在且未推送过', s1.showAdFn + '/' + s1.adPushed);

  /* ---------- ② 任务条出现 → 唤起（用 spy 顶掉真实 push，避免本地真拉广告） ---------- */
  console.log('\n— ② 任务条出现才唤起、且幂等 —');
  await ev(`window.__push=0; window.adsbygoogle = window.adsbygoogle || []; window.adsbygoogle.push = function(){ window.__push++; };`);
  await ev(`setProg(50, true);`); await wait(400);
  const s2 = JSON.parse(await ev(`JSON.stringify((function(){
    var box=document.getElementById('adBox'), ins=box.querySelector('ins.adsbygoogle');
    var mt=document.querySelector('.metrics'), mp=document.querySelector('.metric'), mi=document.querySelector('.progwrap'), pr=document.querySelector('.prog'), pc=document.querySelector('.pg-pct');
    return {
      push: window.__push,
      hasShow: box.classList.contains('show'),
      display: getComputedStyle(box).display,
      insW: ins.clientWidth,
      progShown: mi.classList.contains('show'),
      metricsH: mt.offsetHeight,
      metricPad: getComputedStyle(mp).padding,
      metricBFont: getComputedStyle(mp.querySelector('b')).fontSize,
      progWrapPad: getComputedStyle(mi).padding,
      progH: pr.offsetHeight,
      pctFont: getComputedStyle(pc).fontSize
    };
  })())`));
  ok(s2.push === 1, '⑪ 任务条出现即 push 一次', String(s2.push));
  ok(s2.hasShow && s2.display === 'block', '⑫ 广告位已显示', s2.display);
  ok(s2.insW > 200, '⑬ 广告 ins 拿到真实宽度（push 时不为 0）', String(s2.insW));

  await ev(`setProg(80, true);`); await wait(250);
  ok((await ev(`window.__push`)) === 1, '⑭ 再调 setProg 不重复 push（幂等）', String(await ev(`window.__push`)));
  await ev(`showAd(); showAd();`); await wait(150);
  ok((await ev(`window.__push`)) === 1, '⑮ 直接连调 showAd 也只 push 一次', String(await ev(`window.__push`)));

  /* ---------- ③ 常驻 ---------- */
  console.log('\n— ③ 任务条收起后广告常驻 —');
  await ev(`setProg(0, false);`); await wait(300);
  const s3 = JSON.parse(await ev(`JSON.stringify((function(){
    var box=document.getElementById('adBox');
    return { progShown: document.querySelector('.progwrap').classList.contains('show'),
             adShown: box.classList.contains('show'), display: getComputedStyle(box).display };
  })())`));
  ok(s3.progShown === false, '⑯ 任务条已收起', String(s3.progShown));
  ok(s3.adShown && s3.display === 'block', '⑰ 广告仍常驻（不随任务条回收）', s3.display);

  /* ---------- ④ 两块模块瘦身 ---------- */
  console.log('\n— ④ 统计卡 / 任务条瘦身 —');
  ok(/^6px/.test(s2.metricPad), '⑱ 统计卡内边距 8→6', s2.metricPad);
  ok(s2.metricBFont === '15px', '⑲ 统计卡数字 16→15px', s2.metricBFont);
  ok(s2.metricsH <= 48, '⑳ 统计卡行高已降（≤48px）', s2.metricsH + 'px');
  ok(/^7px/.test(s2.progWrapPad), '㉑ 任务条内边距 10→7', s2.progWrapPad);
  ok(s2.progH === 12, '㉒ 进度条高 14→12px', String(s2.progH));
  ok(s2.pctFont === '19px', '㉓ 百分比 21→19px', s2.pctFont);

  /* ---------- ⑤ 无异常 ---------- */
  console.log('\n— ⑤ 运行期无 JS 异常 —');
  const real = errs.filter(e => !/adsbygoogle|googlesyndication|net::ERR/i.test(String(e)));
  ok(real.length === 0, '㉔ 无 JS 异常', real.slice(0, 2).join(' | '));

  console.log('\n结果: ' + PASS + '/' + (PASS + FAIL));
  ws.close(); process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error('crash:', e.message); process.exit(1); });
