/* v0.9.296 本地真浏览器冒烟：乱码修复页
   —— 粘贴的能不能倒推回来、传文件的能不能认出编码、修不回来的时候有没有说实话。
   用法：node _chk296.js  （走 file://，纯前端页不用起服务） */
'use strict';
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');
const http = require('http');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawn } = require('child_process');

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PORT = 9960 + Math.floor(Math.random() * 30);
const DIR = '/Users/jp/WorkBuddy/2026-09-04-00-29-54/srt-translator';
const TARGET = 'file://' + DIR + '/repair.html';
const wait = ms => new Promise(r => setTimeout(r, ms));

let ws, tid = 0; const pending = new Map();
function send(method, params) {
  const id = ++tid;
  ws.send(JSON.stringify({ id, method, params: params || {} }));
  return new Promise((res, rej) => {
    pending.set(id, { res, rej });
    setTimeout(() => { if (pending.has(id)) { pending.delete(id); rej(new Error('timeout ' + method)); } }, 20000);
  });
}
async function ev(expr) {
  const r = await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true });
  if (r.exceptionDetails) throw new Error(String(r.exceptionDetails.exception && r.exceptionDetails.exception.description).slice(0, 300));
  return r.result.value;
}

(async () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'chk296-'));
  /* ⚠️ MAP * ~NOTFOUND 别删：页面挂着 AdSense 外链脚本，headless 无代理时请求悬着会拖死渲染进程 */
  const chrome = spawn(CHROME, ['--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check',
    '--host-resolver-rules=MAP * ~NOTFOUND, EXCLUDE 127.0.0.1',
    '--no-proxy-server', '--window-size=1440,1000', '--remote-debugging-port=' + PORT, '--user-data-dir=' + dir, TARGET], { stdio: 'ignore' });

  let tabs = [];
  for (let i = 0; i < 40 && !tabs.length; i++) {
    await wait(400);
    try {
      const l = await new Promise((res, rej) => http.get('http://127.0.0.1:' + PORT + '/json/list', r => { let b = ''; r.on('data', d => b += d); r.on('end', () => res(b)); }).on('error', rej));
      const all = (JSON.parse(l) || []).filter(x => x.type === 'page' && x.webSocketDebuggerUrl);
      const hit = all.filter(x => /repair\.html/.test(x.url || ''));
      tabs = hit.length ? hit : all;
    } catch (e) { }
  }
  if (!tabs.length) {
    /* 把拿到的原始清单打出来，别只报一句「起不来」—— 是没起、还是起了但没 page 目标，两回事 */
    try {
      const l = await new Promise((res, rej) => http.get('http://127.0.0.1:' + PORT + '/json/list', r => { let b = ''; r.on('data', d => b += d); r.on('end', () => res(b)); }).on('error', rej));
      console.log('!! 浏览器起不来 port=' + PORT + '  raw=' + String(l).slice(0, 400));
    } catch (e) { console.log('!! 浏览器起不来 port=' + PORT + '  连不上调试端口: ' + e.message); }
    process.exit(1);
  }
  ws = new WebSocket(tabs[0].webSocketDebuggerUrl, { perMessageDeflate: false, maxPayload: 256 * 1024 * 1024 });
  await new Promise((res, rej) => { ws.on('open', res); ws.on('error', rej); });
  ws.on('message', raw => {
    let m; try { m = JSON.parse(raw); } catch (e) { return; }
    if (m.id && pending.has(m.id)) { const p = pending.get(m.id); pending.delete(m.id); m.error ? p.rej(new Error(JSON.stringify(m.error))) : p.res(m.result); return; }
  });

  let ready = false, dbg = '';
  for (let i = 0; i < 25 && !ready; i++) {
    await wait(600);
    try {
      const rs = await ev('document.readyState');
      const has = await ev("typeof setSrc!=='undefined' && typeof window.S!=='undefined' && !!window.RepairCore");
      dbg = rs + ' / ready=' + has;
      ready = has === true && (rs === 'complete' || rs === 'interactive');
    } catch (e) { dbg = 'ev 异常: ' + e.message; }
  }
  console.log('[就绪探测] ' + dbg);
  if (!ready) { console.log('!! 页面没加载出来'); chrome.kill('SIGKILL'); process.exit(1); }

  let pass = 0, fail = 0;
  function chk(n, c, x) { if (c) { pass++; console.log('  ✓ ' + n); } else { fail++; console.log('  ✗ ' + n + (x !== undefined ? '  → ' + x : '')); } }
  const txt = s => ev("document.getElementById('" + s + "').textContent");
  const vis = s => ev("document.getElementById('" + s + "').style.display");

  console.log('--- ① 页面骨架 ---');
  chk('四张卡都在', (await ev("['upCard','diagCard','fixCard','repCard'].every(function(i){return !!document.getElementById(i);})")) === true);
  const nums = await ev("JSON.stringify(['upCard','diagCard','fixCard','repCard'].map(function(i){return document.getElementById(i).querySelector('.n').textContent;}))");
  chk('编号是 1 / 2 / 3 / 4', nums === '["1","2","3","4"]', nums);
  chk('导航胶囊 7 个（不含本页）', (await ev("document.querySelectorAll('#navPills .pill').length")) === 7,
    await ev("document.querySelectorAll('#navPills .pill').length"));
  chk('认领的是砖红色线', (await ev("getComputedStyle(document.documentElement).getPropertyValue('--acc').trim()")) === '#B42318',
    await ev("getComputedStyle(document.documentElement).getPropertyValue('--acc')"));
  /* 只看真的 <script src=...>，注释里提到那两个文件不算（本页自带导航与词典） */
  chk('没有真的去引 site-nav.js / site-i18n.js',
    (await ev("Array.prototype.slice.call(document.querySelectorAll('script[src]')).filter(function(s){return /site-/.test(s.getAttribute('src'));}).length")) === 0,
    await ev("Array.prototype.slice.call(document.querySelectorAll('script[src]')).map(function(s){return s.getAttribute('src');}).join(' ')"));
  chk('另存编码有 6 个选项（含带 BOM 的 UTF-8）', (await ev("document.getElementById('saveEnc').options.length")) === 6,
    await ev("document.getElementById('saveEnc').options.length"));
  chk('带 BOM 那一项写的是「UTF-8（带 BOM）」',
    /BOM/.test(await ev("document.getElementById('saveEnc').options[1].textContent")),
    await ev("document.getElementById('saveEnc').options[1].textContent"));

  console.log('--- ② 粘贴 UTF-8 被当 GBK 读出来的乱码 ---');
  await ev("(function(){var C=window.RepairCore;var m=C.fromBytes(C.toBytes('1\\n00:00:01,000 --> 00:00:03,000\\n你好世界\\n','utf-8'),'gbk');setSrc(m,'moji.srt');})();1");
  await wait(600);
  chk('诊断卡出来了', (await vis('diagCard')) !== 'none');
  chk('说「看着像乱码」', /乱码/.test(await txt('diagStat')), await txt('diagStat'));
  chk('候选卡出来了', (await vis('fixCard')) !== 'none');
  chk('候选里排第一的修回了原句',
    /你好世界/.test(await ev("window.S.out")), await ev("window.S.out.slice(0,60)"));
  chk('结果框里能读到「你好世界」', /你好世界/.test(await txt('out')) === false && /你好世界/.test(await ev("document.getElementById('out').value")),
    await ev("document.getElementById('out').value.slice(0,60)"));
  chk('时间轴箭头没被碰掉', /00:00:01,000 --> 00:00:03,000/.test(await ev("window.S.out")), await ev("window.S.out.slice(0,60)"));

  console.log('--- ③ 「保持原样」能退回去 ---');
  await ev("document.querySelector('#candList [data-use=\"-1\"]').click();1"); await wait(300);
  chk('退回原样后结果框是乱码本身', (await ev("window.S.out")) === (await ev("window.S.shown")),
    await ev("window.S.out.slice(0,30)"));
  chk('保持原样那行被标成选中', (await ev("document.querySelector('#candList .cand').className")) === 'cand on',
    await ev("document.querySelector('#candList .cand').className"));

  console.log('--- ④ 传文件：认出它其实是 GBK（文件没坏，是播放器读错了）---');
  await ev("(function(){var C=window.RepairCore;var b=C.toBytes('1\\n00:00:01,000 --> 00:00:03,000\\n这是一段正常的中文台词\\n','gbk');setBytes(b.buffer,'gbk.srt');})();1");
  await wait(700);
  chk('认出来的编码写着 GBK', (await txt('srcEnc')) === 'GBK', await txt('srcEnc'));
  chk('诊断说没发现乱码', /没发现乱码/.test(await txt('diagStat')), await txt('diagStat'));
  chk('结果框里是正常中文', /这是一段正常的中文台词/.test(await ev("document.getElementById('out').value")),
    await ev("document.getElementById('out').value.slice(0,60)"));
  chk('提示「是播放器按错了编码」', /播放器/.test(await txt('okMsg')), await txt('okMsg'));
  chk('另存默认指到了「带 BOM 的 UTF-8」', (await ev("document.getElementById('saveEnc').value")) === '1',
    await ev("document.getElementById('saveEnc').value"));

  console.log('--- ⑤ 已经不可逆：必须直说，不能假装修好 ---');
  await ev("setSrc('浣犲ソ涓€鍙ヤ腑鏂\\uFFFD','lost.txt');1"); await wait(600);
  chk('显示「修不回来」的提示', (await vis('lostMsg')) !== 'none', await vis('lostMsg'));
  chk('提示里点明要传文件', /选择文件|文件/.test(await txt('lostMsg')), await txt('lostMsg'));

  console.log('--- ⑥ 正常字幕不该被说成乱码 ---');
  await ev("setSrc('1\\n00:00:01,000 --> 00:00:03,000\\nJust a normal line.\\n','ok.srt');1"); await wait(600);
  chk('英文诊断干净', /没发现乱码/.test(await txt('diagStat')), await txt('diagStat'));
  await ev("setSrc('C\\'est très bon. À bientôt.','fr.srt');1"); await wait(600);
  chk('法语带音标不算乱码', /没发现乱码/.test(await txt('diagStat')), await txt('diagStat'));

  console.log('--- ⑦ 换个语言看看 ---');
  /* 标题是「两段拼一句」：西文中间必须留空格，中文不许留 —— 否则英文会连成 Fixgarbled */
  const h1zh = await ev("document.querySelector('.hero h1').innerText");
  chk('中文标题两段直接连写（中间没空格）', h1zh === '字幕乱码修复', JSON.stringify(h1zh));
  await ev("(function(){var s=document.getElementById('langSel');s.value='en';s.dispatchEvent(new Event('change',{bubbles:true}));})();1");
  await wait(400);
  const h1en = await ev("document.querySelector('.hero h1').innerText");
  chk('英文标题两段之间留了空格', h1en === 'Fix garbled subtitles', JSON.stringify(h1en));
  await ev("(function(){var s=document.getElementById('langSel');s.value='zh-CN';s.dispatchEvent(new Event('change',{bubbles:true}));})();1");
  await wait(400);
  chk('切回中文后空格收回去', (await ev("document.querySelector('.hero h1').innerText")) === '字幕乱码修复',
    JSON.stringify(await ev("document.querySelector('.hero h1').innerText")));

  await ev("setSrc(" + JSON.stringify('浣犲ソ') + ",'m.srt');1"); await wait(500);
  await ev("(function(){var s=document.getElementById('langSel');s.value='ar';s.dispatchEvent(new Event('change',{bubbles:true}));})();1");
  await wait(500);
  chk('整页翻成 rtl', (await ev("document.documentElement.dir")) === 'rtl', await ev("document.documentElement.dir"));
  chk('诊断标题变成阿拉伯语', /[؀-ۿ]/.test(await ev("document.querySelector('#diagCard h2').textContent")),
    await ev("document.querySelector('#diagCard h2').textContent"));
  chk('换语言后诊断结果还在', /[؀-ۿ]/.test(await txt('diagStat')), await txt('diagStat'));
  await ev("(function(){var s=document.getElementById('langSel');s.value='zh-CN';s.dispatchEvent(new Event('change',{bubbles:true}));})();1");
  await wait(400);

  console.log('--- ⑧ 布局别塌 ---');
  chk('没有横向滚动', (await ev("document.documentElement.scrollWidth <= window.innerWidth + 1")) === true,
    await ev("document.documentElement.scrollWidth + '/' + window.innerWidth"));
  chk('候选卡没溢出', (await ev("document.getElementById('fixCard').scrollWidth <= document.getElementById('fixCard').clientWidth + 1")) === true,
    await ev("document.getElementById('fixCard').scrollWidth + '/' + document.getElementById('fixCard').clientWidth"));

  console.log('\n== ' + pass + ' 通过 / ' + fail + ' 失败 ==');
  chrome.kill('SIGKILL');
  process.exit(fail ? 1 : 0);
})();
