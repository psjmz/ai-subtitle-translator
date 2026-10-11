/* v0.9.280 实测：左上 logo 是不是真的「可点 + 回到对应语言的首页」
   静态断言只能证明源码里写了 <a>，证明不了：
     ① 浏览器里它真的是 A 元素、cursor 是手型（没被别的 CSS 盖掉）
     ② href 在 /ja/merge.html 下是 /ja/ 而不是 /（这条错了用户就掉语言）
     ③ 页内切语言（es）之后 href 跟着变（applyI18n 里那行调用删了就会停在中文本）
     ④ 真点一下，地址栏真的去了首页
     ⑤ logo 排布没被改坏（图标与文字还在同一行）+ 零 JS 异常
   ⚠️ 每次用新的 --user-data-dir：语言选择存 localStorage，复用 profile 会带上上一轮的语言。 */
'use strict';
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');
const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PORT = 9356, BASE = 'http://127.0.0.1:3098';
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
  if (r.exceptionDetails) throw new Error(r.exceptionDetails.text);
  return r.result.value;
}
async function goto(url) {
  await send('Page.navigate', { url: 'about:blank' }); await wait(250);
  await send('Page.navigate', { url });
  for (let i = 0; i < 40; i++) { try { if (await ev('document.readyState') === 'complete') break; } catch (e) { } await wait(400); }
  await wait(1500);
}
async function shot(sel, file) {
  await ev(`document.querySelector(${JSON.stringify(sel)}).scrollIntoView({block:'start'})`); await wait(500);
  const r = JSON.parse(await ev(`JSON.stringify((function(){var b=document.querySelector(${JSON.stringify(sel)}).getBoundingClientRect();
    return {x:0,y:Math.max(0,b.y+window.scrollY-6),w:1000,h:b.height+12};})())`));
  const rr = await send('Page.captureScreenshot', { format: 'png', clip: { x: r.x, y: r.y, width: r.w, height: Math.min(r.h, 1200), scale: 1 } });
  fs.writeFileSync(file, Buffer.from(rr.data, 'base64'));
  return file;
}
/* 一页的探针：logo 是什么元素 / href / 手型 / 图标与文字是否同一行 */
const P = `JSON.stringify((function(){
  var a=document.querySelector('#logoHome');
  if(!a) return {none:true};
  var mk=a.querySelector('.logo-mark,.mark,.dot');
  var tx=a.querySelector('[data-i18n="brandName"]');
  var cs=getComputedStyle(a);
  var sel=document.querySelector('#uiLang,#uiLang2,#langSel');
  return {tag:a.tagName, href:a.getAttribute('href'), abs:a.href, cursor:cs.cursor,
          inner:a.querySelector('div')?true:false,
          rowOK: (mk&&tx)? Math.abs((mk.getBoundingClientRect().top+mk.getBoundingClientRect().height/2)-(tx.getBoundingClientRect().top+tx.getBoundingClientRect().height/2)) : -1,
          h:Math.round(a.getBoundingClientRect().height),
          hasSel: !!sel, selId: sel?sel.id:null};
})())`;

(async () => {
  const chrome = spawn(CHROME, [
    '--headless=new', '--remote-debugging-port=' + PORT, '--no-sandbox', '--disable-gpu',
    '--remote-allow-origins=*', '--window-size=1440,1200', '--no-proxy-server',
    '--user-data-dir=/tmp/cbuddy-chk280-' + Date.now()
  ], { stdio: 'ignore' });
  let list = null;
  for (let i = 0; i < 20 && !list; i++) {
    await wait(1000);
    list = await new Promise(res => {
      const q = http.get('http://127.0.0.1:' + PORT + '/json/list', r => { let b = ''; r.on('data', d => b += d); r.on('end', () => res(JSON.parse(b))); });
      q.on('error', () => res(null));
    });
  }
  if (!list) throw new Error('Chrome 没起来');
  ws = new WebSocket(list.find(t => t.type === 'page').webSocketDebuggerUrl, { perMessageDeflate: false });
  await new Promise(r => ws.on('open', r));
  ws.on('message', m => {
    const o = JSON.parse(m);
    if (o.id && pending.has(o.id)) { const p = pending.get(o.id); pending.delete(o.id); o.error ? p.rej(new Error(JSON.stringify(o.error))) : p.res(o.result); return; }
    if (o.method === 'Runtime.exceptionThrown') jsErrors.push((((o.params.exceptionDetails || {}).exception || {}).description || '').split('\n')[0]);
    if (o.method === 'Runtime.consoleAPICalled' && o.params.type === 'error') jsErrors.push((o.params.args[0] || {}).value || '');
  });
  await send('Page.enable'); await send('Runtime.enable');

  /* [URL, 期望 getAttribute('href'), 语言下拉 id] */
  const CASES = [
    ['/', '/', 'uiLang2'],
    ['/ja/', '/ja/', 'uiLang2'],
    ['/translate.html', '/', 'uiLang'],
    ['/ja/translate.html', '/ja/', 'uiLang'],
    ['/merge.html', '/', 'uiLang'],
    ['/ja/merge.html', '/ja/', 'uiLang'],
    ['/clean.html', '/', 'langSel'],
    ['/en/clean.html', '/en/', 'langSel'],
  ];
  console.log('— ① logo 元素 / href / 手型 —');
  const seen = {};
  for (const c of CASES) {
    jsErrors = [];
    await goto(BASE + c[0]);
    const p = JSON.parse(await ev(P));
    if (p.none) { ok(false, c[0] + ' 找不到 #logoHome'); continue; }
    ok(p.tag === 'A', c[0] + ' · logo 是个链接（A 元素）', p.tag);
    ok(p.href === c[1], c[0] + ' · href 是 ' + c[1], p.href);
    ok(p.cursor === 'pointer', c[0] + ' · 鼠标是手型', p.cursor);
    ok(!p.inner, c[0] + ' · logo 链接里没有块级 <div>');
    ok(p.rowOK >= 0 && p.rowOK < 6, c[0] + ' · 图标与文字仍在一行', '中心差 ' + p.rowOK.toFixed(1) + 'px');
    ok(jsErrors.length === 0, c[0] + ' · 零 JS 异常', jsErrors[0] || '');
    seen[c[0]] = p;
  }

  console.log('\n— ② 页内切语言后 href 跟着变（applyI18n 里那行不能漏） —');
  for (const c of [['/translate.html', 'uiLang', '/es/'], ['/merge.html', 'uiLang', '/es/'],
                   ['/clean.html', 'langSel', '/es/'], ['/', 'uiLang2', '/es/']]) {
    await goto(BASE + c[0]);
    await ev(`(function(){var s=document.getElementById('${c[1]}');s.value='es';s.dispatchEvent(new Event('change'));return 1;})()`);
    await wait(700);
    const h = await ev(`document.getElementById('logoHome').getAttribute('href')`);
    ok(h === c[2], c[0] + ' 切成西语后 logo 指向 ' + c[2], h);
    /* 切回中文，别把 "上次选择" 留在 localStorage 里影响后面几步 */
    await ev(`(function(){var s=document.getElementById('${c[1]}');s.value='zh-CN';s.dispatchEvent(new Event('change'));return 1;})()`);
    await wait(400);
  }

  console.log('\n— ③ 真点一下（日语特效页 → /ja/） —');
  await goto(BASE + '/ja/merge.html');
  const before = await ev('location.pathname');
  await ev(`document.getElementById('logoHome').click()`);
  for (let i = 0; i < 20; i++) { try { if (await ev('location.pathname') !== before) break; } catch (e) { } await wait(400); }
  await wait(1200);
  const after = await ev('location.pathname');
  ok(after === '/ja/', '在 /ja/merge.html 点 logo 落到 /ja/', before + ' → ' + after);

  console.log('\n— ④ 英文清洗页 → /en/ —');
  await goto(BASE + '/en/clean.html');
  const b2 = await ev('location.pathname');
  await ev(`document.getElementById('logoHome').click()`);
  for (let i = 0; i < 20; i++) { try { if (await ev('location.pathname') !== b2) break; } catch (e) { } await wait(400); }
  await wait(1200);
  const a2 = await ev('location.pathname');
  ok(a2 === '/en/', '在 /en/clean.html 点 logo 落到 /en/', b2 + ' → ' + a2);
  ok(await ev('document.querySelectorAll("h1").length') === 1, '回首页后 h1 仍只有 1 个');

  console.log('\n— 截图 —');
  await goto(BASE + '/');
  console.log('  ' + await shot('.lnav', '/tmp/chk280-home-zh.png'));
  await goto(BASE + '/ja/merge.html');
  console.log('  ' + await shot('.lnav', '/tmp/chk280-merge-ja.png'));
  await goto(BASE + '/translate.html');
  console.log('  ' + await shot('.appbar', '/tmp/chk280-ws-zh.png'));

  console.log('\n核验：通过 ' + PASS + ' / 失败 ' + FAIL);
  ws.close(); chrome.kill('SIGKILL');
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error('崩了：' + e.message); process.exit(2); });
