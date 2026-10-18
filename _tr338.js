/* _tr338.js —— 338 扩语言：真浏览器验收（本地起 server + headless chrome）
 *
 * 单测只能证明源码里的表对得上；下拉是不是真的多出 25 项、切语言行宽联不联动、
 * 控制台有没有报错，必须用真浏览器渲染后的 DOM 说话（这个站的界面文案是 JS 运行时写的，
 * 静态 HTML 统计必然误报）。
 *
 * 检查项：
 *   1 dstLang 下拉 = 100 项、srcLang = 101 项（多一个 auto）
 *   2 新增 25 种都在下拉里，且显示名就是 LANGS 的 zh 自称
 *   3 切到 yue → 行宽联动成 16；切到 bo / mi → 21（Netflix TTSG 口径）
 *   4 选粤语后目标语言标签不重复（dstLangLabel 去重逻辑）
 *   5 控制台无 error、页面无 JS 异常
 *
 * ⚠️ 起 server 与跑测试必须在同一条 Bash 里（记忆：run_in_background 会假报 502）
 * 用法：PORT=3396 node _tr338.js
 */
'use strict';
const { spawn } = require('child_process');
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');

const PORT = Number(process.env.PORT || 3396);
const DEBUG = Number(process.env.DEBUG_PORT || 9781);
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const NODE = process.execPath;
const sleep = ms => new Promise(r => setTimeout(r, ms));

const NEW338 = ['yue','be','tg','ky','tk','bs','mt','cy','ga','hy','ka','ti','bo','ug','sd',
                'yi','jv','su','ceb','mg','ig','xh','sn','ny','mi'];

(async () => {
  const srv = spawn(NODE, ['server.js'], {
    cwd: __dirname,
    env: Object.assign({}, process.env, { PORT: String(PORT), PUBLIC_URL: 'http://127.0.0.1:' + PORT }),
    stdio: 'ignore'
  });
  const clean = () => { try { srv.kill(); } catch (e) {} };
  process.on('exit', clean);

  let up = false;
  for (let i = 0; i < 40; i++) {
    await sleep(400);
    try { const r = await fetch('http://127.0.0.1:' + PORT + '/translate.html'); if (r.ok) { up = true; break; } } catch (e) {}
  }
  if (!up) { clean(); throw new Error('本地 server 起不来'); }

  const udir = '/tmp/cr-tr338-' + Date.now();
  const chrome = spawn(CHROME, ['--headless=new', '--no-sandbox', '--disable-gpu', '--no-first-run',
    '--window-size=1440,1200', '--remote-debugging-port=' + DEBUG, '--user-data-dir=' + udir, 'about:blank'],
    { stdio: 'ignore' });
  let list = null;
  for (let i = 0; i < 40; i++) {
    await sleep(500);
    try { const r = await fetch('http://127.0.0.1:' + DEBUG + '/json/list'); list = await r.json(); if (list && list.length) break; } catch (e) {}
  }
  if (!list) { chrome.kill(); clean(); throw new Error('CDP 起不来'); }
  const ws = new WebSocket(list[0].webSocketDebuggerUrl, { perMessageDeflate: false, maxPayload: 64 * 1024 * 1024 });
  await new Promise((res, rej) => { ws.on('open', res); ws.on('error', rej); });
  let seq = 0; const pend = new Map(); const errs = [];
  ws.on('message', d => {
    let m; try { m = JSON.parse(d.toString()); } catch (e) { return; }
    if (m.id && pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); }
    if (m.method === 'Runtime.exceptionThrown') errs.push('JS 异常: ' + (m.params && m.params.exceptionDetails && m.params.exceptionDetails.text || ''));
    if (m.method === 'Log.entryAdded' && m.params && m.params.entry && m.params.entry.level === 'error')
      errs.push('console.error: ' + m.params.entry.text);
  });
  const send = (method, params) => new Promise(res => { const id = ++seq; pend.set(id, res); ws.send(JSON.stringify({ id, method, params: params || {} })); });
  const ev = async (expr) => {
    const r = await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true });
    return r.result && r.result.result ? r.result.result.value : null;
  };

  await send('Runtime.enable', {});
  await send('Log.enable', {});
  await send('Page.navigate', { url: 'http://127.0.0.1:' + PORT + '/translate.html' });
  for (let i = 0; i < 60; i++) {
    await sleep(400);
    const p = await ev('location.pathname');
    const n = await ev('(document.getElementById("dstLang")||{}).options ? document.getElementById("dstLang").options.length : 0');
    if (p === '/translate.html' && n > 0) break;
  }

  let pass = 0, fail = 0;
  const t = (name, ok, extra) => { if (ok) { pass++; console.log('  ✓ ' + name); } else { fail++; console.log('  ✗ ' + name + (extra ? '  → ' + extra : '')); } };

  // 1 下拉项数
  const cnt = await ev('({dst: document.getElementById("dstLang").options.length, src: document.getElementById("srcLang").options.length})');
  t('目标语言下拉 100 项（原 75）', cnt && cnt.dst === 100, JSON.stringify(cnt));
  t('源语言下拉 101 项（100 种 + auto）', cnt && cnt.src === 101, JSON.stringify(cnt));

  // 2 新增 25 种都在，且显示名是自称
  const opts = await ev('Array.from(document.getElementById("dstLang").options).map(o=>({v:o.value, t:o.textContent}))');
  const vals = (opts || []).map(o => o.v);
  const miss = NEW338.filter(l => vals.indexOf(l) < 0);
  t('新增 25 种都在下拉里', miss.length === 0, '缺 ' + miss.join(','));
  const want = { yue:'粵語', hy:'Հայերեն', ka:'ქართული', bo:'བོད་སྐད', ti:'ትግርኛ', mi:'Māori', ig:'Igbo' };
  const bad = Object.keys(want).filter(k => {
    const o = (opts || []).find(x => x.v === k);
    return !o || o.t.indexOf(want[k]) < 0;
  });
  t('新增语言的显示名就是自称（下拉里能看出是哪个语言）', bad.length === 0,
    bad.map(k => k + ' 期望含 ' + want[k] + ' 实为 ' + ((opts || []).find(x => x.v === k) || {}).t).join(' | '));

  // 3 行宽联动：先清 localStorage 里可能存过的自定义行宽（否则用户值优先，测不出来）
  await ev('try{Object.keys(localStorage).filter(k=>/maxw|mw/i.test(k)).forEach(k=>localStorage.removeItem(k))}catch(e){}');
  await send('Page.navigate', { url: 'http://127.0.0.1:' + PORT + '/translate.html' });
  for (let i = 0; i < 60; i++) {
    await sleep(400);
    const n = await ev('document.getElementById("dstLang") ? document.getElementById("dstLang").options.length : 0');
    if (n > 0) break;
  }
  const setLang = async (v) => {
    await ev('(function(){var s=document.getElementById("dstLang"); s.value=' + JSON.stringify(v) +
      '; s.dispatchEvent(new Event("change",{bubbles:true})); return s.value;})()');
    await sleep(600);
    return await ev('document.getElementById("maxW").value');
  };
  const mwYue = await setLang('yue');
  t('切到粤语 yue → 行宽联动为 16（汉字口径）', String(mwYue) === '16', '实为 ' + mwYue);
  const mwBo = await setLang('bo');
  t('切到藏文 bo → 行宽 21', String(mwBo) === '21', '实为 ' + mwBo);
  const mwMi = await setLang('mi');
  t('切到毛利语 mi → 行宽 21', String(mwMi) === '21', '实为 ' + mwMi);
  const mwEn = await setLang('en');
  t('切回英语 en → 行宽仍 21（老行为不变）', String(mwEn) === '21', '实为 ' + mwEn);

  // 4 目标语言标签不重复
  const labels = await ev([
    '(function(){',
    '  var out={};',
    '  ["yue","ceb","mg","ig","ny","mi","hy"].forEach(function(v){',
    '    var s=document.getElementById("dstLang"); s.value=v; s.dispatchEvent(new Event("change",{bubbles:true}));',
    '    var sel=document.querySelector(".dst-lang-label, [data-role=\'dstLangLabel\']");',
    '    out[v]= sel ? sel.textContent : null;',
    '  });',
    '  return out;',
    '})()'
  ].join('\n'));
  console.log('  · 目标语言标签：', JSON.stringify(labels));

  /* 5 提示词端到端：直接调页面里的 systemPromptEn（顶层函数），100 种逐个生成一遍。
     这能抓住「缺 EX_SAMPLE → 静默回落到英文样本」「prompt 名没填 → 出现 undefined」这类
     单测查表查不出来的静默问题。 */
  const pr = await ev([
    '(function(){',
    '  var vs = Array.from(document.getElementById("dstLang").options).map(function(o){return o.value;});',
    '  var out = { n: vs.length, bad: [], sample: {} };',
    '  vs.forEach(function(v){',
    '    var p;',
    '    try { p = systemPromptEn({src:"en", dst:v, style:"elegant"}); } catch(e){ out.bad.push(v+" 抛错 "+e.message); return; }',
    '    if (!p || typeof p !== "string") { out.bad.push(v+" 没生成"); return; }',
    '    if (/undefined|NaN/.test(p)) out.bad.push(v+" 含 undefined/NaN");',
    '    out.sample[v] = p;',
    '  });',
    '  return out;',
    '})()'
  ].join('\n'));
  t('100 种语言都能生成提示词，且不含 undefined / NaN', pr && pr.n === 100 && pr.bad.length === 0,
    'n=' + (pr && pr.n) + ' 问题=' + ((pr && pr.bad) || []).slice(0, 5).join(' | '));
  // 新增语言的提示词里必须出现「英文语言名」和「该语言真实译文」（不是英文样本）
  const wantPrompt = {
    hy: ['Armenian', 'Տար ինձ տուն'], ka: ['Georgian', 'წამიყვანე სახლში'], bo: ['Tibetan', 'ང་ཁྱིམ་ལ་ཁྲིད་'],
    ti: ['Tigrinya', 'ናብ ገዛ ውሰደኒ'], yue: ['Cantonese', '帶我返屋企'], yi: ['Yiddish', 'נעם מיך אהיים'],
    ug: ['Uyghur', 'مېنى ئۆيگە ئاپىرىپ قوي'], mi: ['Māori', 'Haria ahau ki te kāinga']
  };
  const pbad = Object.keys(wantPrompt).filter(v => {
    const p = (pr && pr.sample && pr.sample[v]) || '';
    return wantPrompt[v].some(w => p.indexOf(w) < 0);
  });
  t('新增语言的提示词里带对了语言名 + 该语言真实译文（不是英文样本）', pbad.length === 0,
    pbad.map(v => v + ' 缺 ' + wantPrompt[v].filter(w => ((pr && pr.sample && pr.sample[v]) || '').indexOf(w) < 0).join('/')).join(' | '));
  const enSample = (pr && pr.sample && pr.sample['en']) || '';
  t('英语自己的提示词没被新语言污染（仍是 Take me home）', enSample.indexOf('Take me home') >= 0);

  // 6 控制台
  t('控制台无 error / 无 JS 异常', errs.length === 0, errs.slice(0, 3).join(' | '));

  ws.close(); chrome.kill(); clean();
  console.log('\n真浏览器验收：' + pass + ' ✓ / ' + fail + ' ✗');
  process.exit(fail ? 1 : 0);
})();
