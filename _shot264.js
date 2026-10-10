/* v0.9.264：赞助收款码替换 + 文案改版 —— 渲染实测 + 截图
   要点：headless Chrome 默认 en-US，而赞助入口只在 zh-CN 渲染（否则整块从 DOM 移除），
        必须用 Emulation.setUserAgentOverride 的 acceptLanguage 伪造简中，否则永远看不到元素。 */
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');
const http = require('http'), fs = require('fs'), path = require('path');
const PORT = 9333, BASE = 'http://127.0.0.1:3098';
const OUT = '/Users/jp/WorkBuddy/2026-09-04-00-29-54/ui-redesign';
const wait = ms => new Promise(r => setTimeout(r, ms));

function J(p) {
  return new Promise((res, rej) => {
    const r = http.request({ host: '127.0.0.1', port: PORT, path: p, method: 'PUT' }, x => {
      let d = ''; x.on('data', c => d += c);
      x.on('end', () => { try { res(JSON.parse(d)); } catch (e) { rej(new Error(d.slice(0, 200))); } });
    });
    r.on('error', rej); r.end();
  });
}

(async () => {
  const v = await J('/json/new?' + encodeURIComponent('about:blank'));
  const ws = new WebSocket(v.webSocketDebuggerUrl, { perMessageDeflate: false });
  let id = 0; const wt = new Map();
  await new Promise(r => ws.on('open', r));
  ws.on('message', m => {
    const g = JSON.parse(m);
    if (g.id && wt.has(g.id)) { const q = wt.get(g.id); wt.delete(g.id); g.error ? q.rej(new Error(JSON.stringify(g.error))) : q.res(g.result); }
  });
  const send = (m, p) => new Promise((res, rej) => { const i = ++id; wt.set(i, { res, rej }); ws.send(JSON.stringify({ id: i, method: m, params: p || {} })); });
  const ev = async e => {
    const r = await send('Runtime.evaluate', { expression: e, returnByValue: true, awaitPromise: true });
    if (r.exceptionDetails) throw new Error((r.exceptionDetails.exception || {}).description || r.exceptionDetails.text);
    return r.result.value;
  };

  await send('Page.enable'); await send('Runtime.enable');
  await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1000, deviceScaleFactor: 2, mobile: false });
  await send('Emulation.setUserAgentOverride', {
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36',
    acceptLanguage: 'zh-CN,zh;q=0.9'
  });
  await send('Network.enable');
  await send('Network.setCacheDisabled', { cacheDisabled: true });
  await send('Page.navigate', { url: BASE + '/' });
  for (let i = 0; i < 40; i++) { if (await ev(`document.readyState`) === 'complete') break; await wait(400); }
  await wait(1200);

  /* ⚠️ 赞助入口只在 zh-CN 渲染，而界面语言是持久化的：前面跑过多语言测试（_chk262）
     会把 UI.lang 存进 localStorage，同一 user-data-dir 的新标签页会读到别的语言，
     于是 donateBox 被 JS 整块移除、后面全量不到。这里先清干净再重载，让它回落到
     setUserAgentOverride 指定的 zh-CN。 */
  if (await ev(`(typeof UI!=='undefined'&&UI.lang)||''`) !== 'zh-CN') {
    await ev(`try{ localStorage.clear(); }catch(e){}; try{ sessionStorage.clear(); }catch(e){}`);
    await send('Page.navigate', { url: BASE + '/' });
    for (let i = 0; i < 40; i++) { if (await ev(`document.readyState`) === 'complete') break; await wait(400); }
    await wait(1200);
  }
  console.log('UI.lang =', await ev(`(typeof UI!=='undefined'&&UI.lang)||'(无)'`));
  await ev(`showView('workspace')`); await wait(500);

  const box = await ev(`(function(){
    var b=document.getElementById('donateBox');
    if(!b) return '(donateBox 不在 DOM)';
    var btn=document.getElementById('btnDonate');
    var side=document.querySelector('.main>aside.panel:last-child');
    return JSON.stringify({
      hidden: b.hidden,
      txt: document.getElementById('donateTxt').textContent,
      btnW: Math.round(btn.getBoundingClientRect().width),
      btnH: Math.round(btn.getBoundingClientRect().height),
      btnOverflow: btn.scrollWidth > btn.clientWidth + 1,
      sideW: side ? Math.round(side.getBoundingClientRect().width) : null,
      imgSrcNow: document.getElementById('donateImg').getAttribute('src')
    });
  })()`);
  console.log('收起态:', box);

  // 展开
  await ev(`document.getElementById('btnDonate').click()`);
  await wait(1500);
  const open = await ev(`(function(){
    var qr=document.getElementById('donateQr'), img=document.getElementById('donateImg');
    var b=document.getElementById('donateBox');
    return JSON.stringify({
      txt: document.getElementById('donateTxt').textContent,
      qrHidden: qr.hidden,
      imgSrc: img.getAttribute('src'),
      imgNatural: img.naturalWidth + 'x' + img.naturalHeight,
      imgShown: Math.round(img.getBoundingClientRect().width) + 'x' + Math.round(img.getBoundingClientRect().height),
      boxH: Math.round(b.getBoundingClientRect().height),
      qrBg: getComputedStyle(qr).backgroundColor
    });
  })()`);
  console.log('展开态:', open);

  // 截图（视口内 clip：先 scrollTo 再取文档坐标换算）
  const rect = JSON.parse(await ev(`JSON.stringify((function(){
    var b=document.getElementById('donateBox').getBoundingClientRect();
    return { x:b.left, y:b.top+window.scrollY, w:b.width, h:b.height, vh:window.innerHeight };
  })())`));
  await ev(`window.scrollTo(0, Math.max(0, ${rect.y} - 200))`); await wait(400);
  const r2 = JSON.parse(await ev(`JSON.stringify((function(){
    var b=document.getElementById('donateBox').getBoundingClientRect();
    return { x:b.left, y:b.top, w:b.width, h:b.height };
  })())`));
  const clip = {
    x: Math.max(0, r2.x - 14),
    y: Math.max(0, r2.y - 14),
    width: Math.min(1440, r2.w + 28),
    height: Math.min(1000, r2.h + 28),
    scale: 2
  };
  const shot = await send('Page.captureScreenshot', { format: 'png', clip });
  const p1 = path.join(OUT, 'shot-264-donate-open.png');
  fs.mkdirSync(OUT, { recursive: true });
  fs.writeFileSync(p1, Buffer.from(shot.data, 'base64'));
  console.log('已存', p1);

  // 收起态截图
  await ev(`document.getElementById('btnDonate').click()`); await wait(600);
  const r3 = JSON.parse(await ev(`JSON.stringify((function(){
    var b=document.getElementById('donateBox').getBoundingClientRect();
    return { x:b.left, y:b.top, w:b.width, h:b.height };
  })())`));
  const shot2 = await send('Page.captureScreenshot', { format: 'png', clip: {
    x: Math.max(0, r3.x - 14), y: Math.max(0, r3.y - 14),
    width: Math.min(1440, r3.w + 28), height: Math.min(1000, r3.h + 28), scale: 3
  }});
  const p2 = path.join(OUT, 'shot-264-donate-closed.png');
  fs.writeFileSync(p2, Buffer.from(shot2.data, 'base64'));
  console.log('已存', p2);

  ws.close(); process.exit(0);
})().catch(e => { console.error('crash:', e.message); process.exit(1); });
