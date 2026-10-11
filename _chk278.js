/* v0.9.278 实测：hero 改版 + 工作台「去特效字幕处理」引导卡
   验的是「真浏览器跑出来是什么样」：
     ① 首页 hero：标题一行读完（不再有 <br>）、强调色是品牌粉、三个 emoji 装饰没了、
        副标题不再被装饰压住
     ② 首页英文：逗号后面有空格（不然会和后文粘一起）
     ③ 工作台：没有顶栏胶囊导航；引导卡默认置灰、说明行是「先翻译」
     ④ 点了（没译文）：不跳页、只在日志里提醒
     ⑤ 注入译文后：卡片激活、说明行换成能力清单、href 指向特效页
     ⑥ 点它（有译文）：payload 落到 localStorage（跨标签页取得到）+ target=_blank
     ⑦ 切日语：href 带语言前缀 /ja/merge.html、说明行是日语
   顺带截图。 */
'use strict';
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');
const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PORT = 9351, BASE = 'http://127.0.0.1:3098';
const wait = ms => new Promise(r => setTimeout(r, ms));
let PASS = 0, FAIL = 0, ws, tid = 0; const pending = new Map(); let jsErrors = [];
const ok = (c, n, x) => { console.log((c ? '  ✓ ' : '  ✗ ') + n + (x !== undefined ? '  [' + x + ']' : '')); c ? PASS++ : FAIL++; };
function send(method, params) {
  const id = ++tid; ws.send(JSON.stringify({ id, method, params: params || {} }));
  return new Promise((res, rej) => {
    pending.set(id, { res, rej });
    setTimeout(() => { if (pending.has(id)) { pending.delete(id); rej(new Error('timeout ' + method)); } }, 25000);
  });
}
async function ev(expr) {
  const r = await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true });
  if (r.exceptionDetails) throw new Error(r.exceptionDetails.text + ' ' + ((r.exceptionDetails.exception || {}).description || ''));
  return r.result.value;
}
async function goto(url) {
  await send('Page.navigate', { url: 'about:blank' });
  await wait(250);
  await send('Page.navigate', { url });
  for (let i = 0; i < 40; i++) { try { if (await ev('document.readyState') === 'complete') break; } catch (e) { } await wait(500); }
  await wait(2000);
}
async function shotHero(file) {
  await ev(`document.querySelector('.hero').scrollIntoView({block:'center'})`);
  await wait(500);
  const r = JSON.parse(await ev(`JSON.stringify((function(){var b=document.querySelector('.hero').getBoundingClientRect();
    return {y:Math.max(0,b.y+window.scrollY-10), h:b.height+20};})())`));
  const rr = await send('Page.captureScreenshot', { format: 'png', clip: { x: 0, y: r.y, width: 1440, height: Math.min(Math.max(r.h, 120), 900), scale: 1 } });
  fs.writeFileSync(file, Buffer.from(rr.data, 'base64'));
  return file;
}
async function shotEl(sel, file, w) {
  await ev(`document.querySelector(${JSON.stringify(sel)}).scrollIntoView({block:'center'})`);
  await wait(500);
  const r = JSON.parse(await ev(`JSON.stringify((function(){var b=document.querySelector(${JSON.stringify(sel)}).getBoundingClientRect();
    return {x:Math.max(0,b.x-16), y:Math.max(0,b.y+window.scrollY-16), w:b.width+32, h:b.height+32};})())`));
  const rr = await send('Page.captureScreenshot', { format: 'png', clip: { x: r.x, y: r.y, width: Math.min(r.w, w || 1440), height: r.h, scale: 2 } });
  fs.writeFileSync(file, Buffer.from(rr.data, 'base64'));
  return file;
}

(async () => {
  const chrome = spawn(CHROME, [
    '--headless=new', '--remote-debugging-port=' + PORT, '--no-sandbox', '--disable-gpu',
    '--remote-allow-origins=*', '--window-size=1440,1200', '--no-proxy-server',
    '--user-data-dir=/tmp/cbuddy-chk278-' + Date.now()
  ], { stdio: 'ignore' });
  let list = null;
  for (let i = 0; i < 20 && !list; i++) {
    await wait(1000);
    list = await new Promise(res => {
      const q = http.get('http://127.0.0.1:' + PORT + '/json/list', r => { let b = ''; r.on('data', d => b += d); r.on('end', () => res(JSON.parse(b))); });
      q.on('error', () => res(null));
    });
  }
  if (!list) { console.log('Chrome 起不来'); process.exit(1); }
  const target = list.find(t => t.type === 'page');
  ws = new WebSocket(target.webSocketDebuggerUrl, { maxPayload: 256 * 1024 * 1024 });
  ws.on('message', m => {
    const o = JSON.parse(m);
    if (o.method === 'Runtime.exceptionThrown') jsErrors.push((o.params.exceptionDetails || {}).text || 'err');
    if (o.id && pending.has(o.id)) { const p = pending.get(o.id); pending.delete(o.id); o.error ? p.rej(new Error(o.error.message)) : p.res(o.result); }
  });
  await new Promise(r => ws.on('open', r));
  await send('Page.enable'); await send('Runtime.enable');

  /* ============ ① 首页 hero ============ */
  console.log('\n【① 首页 hero：一行读完 + 无 emoji 装饰】');
  jsErrors = [];
  await goto(BASE + '/');
  const h = JSON.parse(await ev(`JSON.stringify((function(){
    var h1=document.querySelector('.hero h1');
    var lh=parseFloat(getComputedStyle(h1).lineHeight);
    var em=h1.querySelector('em');
    return { lines: Math.round(h1.getBoundingClientRect().height/lh),
      text: h1.innerText.replace(/\\n/g,'|'), emColor: em?getComputedStyle(em).color:'(无)',
      sparkN: document.querySelectorAll('.hero .spark').length,
      h1W: Math.round(h1.getBoundingClientRect().width),
      html: h1.innerHTML };
  })())`));
  ok(h.lines === 1, '标题是一行（不再折成两行）', h.lines + ' 行 · ' + h.text + ' · 块宽 ' + h.h1W);
  ok(h.html.indexOf('<br>') < 0, 'heroTitle 里不再有 <br>', h.html);
  ok(h.emColor === 'rgb(212, 32, 106)', '强调色是品牌主色粉 #D4206A', h.emColor);
  ok(h.sparkN === 0, '三个 emoji 装饰已撤（✨🎬💜）', h.sparkN + ' 个');
  /* 副标题有没有被绝对定位的东西压住：量 hero 里所有绝对定位元素，看有没有和 <p> 相交 */
  const overlap = JSON.parse(await ev(`JSON.stringify((function(){
    var p=document.querySelector('.hero p'), pr=p.getBoundingClientRect(), bad=[];
    Array.prototype.forEach.call(document.querySelector('.hero').children, function(el){
      if(el===p) return;
      var cs=getComputedStyle(el);
      if(cs.position!=='absolute') return;
      var r=el.getBoundingClientRect();
      if(!(r.bottom<pr.top||r.top>pr.bottom||r.right<pr.left||r.left>pr.right)) bad.push(el.className||el.tagName);
    });
    return bad;
  })())`));
  ok(overlap.length === 0, '没有绝对定位元素压在副标题上', overlap.join(',') || '无');
  ok(jsErrors.length === 0, '首页无 JS 异常', jsErrors.join(' | ') || '无');
  console.log('  → 截图 ' + await shotHero('/tmp/chk278-hero-zh.png'));

  /* ============ ② 首页英文 ============ */
  console.log('\n【② 首页英文：逗号后要有空格】');
  await goto(BASE + '/en/');
  const en = JSON.parse(await ev(`JSON.stringify((function(){
    var h1=document.querySelector('.hero h1');
    var lh=parseFloat(getComputedStyle(h1).lineHeight);
    var em=h1.querySelector('em');
    return { lines: Math.round(h1.getBoundingClientRect().height/lh), text: h1.innerText.replace(/\\n/g,'|'),
      emLines: Math.round(em.getBoundingClientRect().height/lh), bal: getComputedStyle(h1).textWrap || getComputedStyle(h1).textWrapStyle };
  })())`));
  /* 拉丁语系句子长，一行装不下是正常的；要的是「别折出孤儿行」——
     balance 让两行自动匀开，且强调的那半句不许被劈成两行 */
  ok(en.lines <= 2, '英文最多两行（36px 装不下长句是正常的）', en.lines + ' 行 · ' + en.text);
  ok(en.emLines === 1, '强调的那半句没被拦腰折断', en.emLines + ' 行');
  ok(/,\s\S/.test(en.text), '逗号后面有空格（没和后文粘一起）', en.text);
  console.log('  → 截图 ' + await shotHero('/tmp/chk278-hero-en.png'));

  /* ============ ③ 工作台：无胶囊导航 + 卡片默认置灰 ============ */
  console.log('\n【③ /translate.html：顶栏无胶囊导航 + 引导卡置灰】');
  jsErrors = [];
  await goto(BASE + '/translate.html');
  const c = JSON.parse(await ev(`JSON.stringify((function(){
    var el=document.getElementById('btnFxGoto'), sub=document.getElementById('fxGotoSub');
    return { nav: document.querySelectorAll('#siteNav a.snav-pill').length,
      exist: !!el, dis: el?el.classList.contains('dis'):null,
      tag: el?el.tagName:'', target: el?el.target:'', rel: el?el.rel:'',
      aria: el?el.getAttribute('aria-disabled'):'', href: el?el.getAttribute('href'):'',
      sub: sub?sub.textContent:'', ic: el?!!el.querySelector('.fx-ic svg'):false,
      ar: el?!!el.querySelector('.fx-ar svg'):false, title: el?el.querySelector('.fx-n').textContent:'' };
  })())`));
  ok(c.nav === 0, '顶栏没有胶囊导航（v0.9.278 撤掉）', c.nav + ' 个');
  ok(c.exist && c.tag === 'A', '引导卡在，且是链接（整卡可点）', c.tag);
  ok(c.target === '_blank' && c.rel === 'noopener', '新标签页打开 + noopener', c.target + ' / ' + c.rel);
  ok(c.dis === true && c.aria === 'true', '默认置灰（还没译文）', 'dis=' + c.dis + ' aria=' + c.aria);
  ok(c.sub.indexOf('还没有译文') >= 0, '说明行是「先翻译」的提示', c.sub);
  ok(c.title.indexOf('去特效字幕处理') >= 0, '标题文案在', c.title);
  ok(c.ic && c.ar, '图标与箭头都在（不是 emoji）');
  console.log('  → 截图 ' + await shotEl('#btnFxGoto', '/tmp/chk278-fxcard-off.png', 480));

  /* ============ ④ 置灰时点一下 ============ */
  console.log('\n【④ 置灰时点击：不跳页、只在日志里提醒】');
  const before = await ev('location.pathname');
  await ev(`document.getElementById('btnFxGoto').click()`);
  await wait(700);
  const after = await ev('location.pathname');
  ok(before === after, '没有跳走', after);
  ok((await ev(`document.getElementById('log').innerText`)).indexOf('还没有译文') >= 0, '日志里给了提示',
    (await ev(`document.getElementById('log').innerText`)).trim().slice(-24));
  ok((await ev(`localStorage.getItem('srt_fx_in')`)) === null, '没写任何 payload');

  /* ============ ⑤ 注入译文 → 卡片激活 ============ */
  console.log('\n【⑤ 有译文之后：卡片激活 + 说明行换成能力清单】');
  await ev(`(function(){ S.rows.push({id:1,start:0,end:1.5,en:'hello world',zh:'你好世界'}); renderRows(); })()`);
  await wait(500);
  const c2 = JSON.parse(await ev(`JSON.stringify((function(){
    var el=document.getElementById('btnFxGoto'), sub=document.getElementById('fxGotoSub');
    return { dis: el.classList.contains('dis'), aria: el.getAttribute('aria-disabled'),
      href: el.getAttribute('href'), sub: sub.textContent };
  })())`));
  ok(c2.dis === false && c2.aria === null, '置灰解除了', 'dis=' + c2.dis);
  ok(c2.sub.indexOf('字体') >= 0 && c2.sub.indexOf('ASS') >= 0, '说明行换成能力清单', c2.sub);
  ok(c2.href === '/merge.html?from=translate', 'href 指向特效页', c2.href);
  console.log('  → 截图 ' + await shotEl('#btnFxGoto', '/tmp/chk278-fxcard-on.png', 480));

  /* ============ ⑥ 点它：payload 落到 localStorage（跨标签页）============ */
  console.log('\n【⑥ 有译文时点击：payload 落 localStorage（新标签页取得到）】');
  await ev(`document.getElementById('btnFxGoto').click()`);
  await wait(900);
  const pl = await ev(`(function(){ try{ var r=localStorage.getItem('srt_fx_in'); if(!r) return null; var d=JSON.parse(r);
    return JSON.stringify({mode:d.mode, hasText:!!(d.text&&d.text.length), name:d.name, fresh:(Date.now()-d.at)<5000}); }catch(e){ return 'ERR:'+e.message; } })()`);
  ok(!!pl && pl !== 'null', 'localStorage 里落了 payload', String(pl).slice(0, 90));
  ok(/true/.test(String(pl)), 'payload 里有正文、时间戳新鲜');
  ok((await ev('location.pathname')) === '/translate.html', '工作台本体没被换掉（新标签页里开的）');

  /* ============ ⑦ 切日语：href 带语言前缀 ============ */
  console.log('\n【⑦ 切日语：href 跟着语言走 + 说明行是日语】');
  await ev(`(function(){var s=document.getElementById('uiLang'); s.value='ja'; s.dispatchEvent(new Event('change'));})()`);
  await wait(1400);
  const c3 = JSON.parse(await ev(`JSON.stringify((function(){
    var el=document.getElementById('btnFxGoto'), sub=document.getElementById('fxGotoSub');
    return { href: el.getAttribute('href'), sub: sub.textContent, title: el.querySelector('.fx-n').textContent };
  })())`));
  ok(c3.href === '/ja/merge.html?from=translate', 'href 带语言前缀', c3.href);
  ok(/[ぁ-んァ-ヶ]/.test(c3.sub), '说明行跟界面语言（日语）', c3.sub);
  ok(/[ぁ-んァ-ヶ]/.test(c3.title), '标题跟界面语言（日语）', c3.title);
  ok((await ev('location.pathname')) === '/ja/translate.html', '仍停在 /ja/translate.html', await ev('location.pathname'));

  console.log('\n核验：' + PASS + ' 通过 / ' + FAIL + ' 失败');
  ws.close(); chrome.kill();
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.log('炸了：' + e.message); process.exit(1); });
