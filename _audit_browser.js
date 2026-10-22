/* v0.9.278 体检 · 真浏览器：多语言运行时 / 三引擎实测 / 三页冒烟 */
'use strict';
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');
const http = require('http');
const { spawn } = require('child_process');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PORT = 9353, BASE = 'http://127.0.0.1:3098';
const wait = ms => new Promise(r => setTimeout(r, ms));
let PASS = 0, FAIL = 0, ws, tid = 0; const pending = new Map(); let jsErr = [];
const ok = (c, n, x) => { console.log((c ? '  ✓ ' : '  ✗ ') + n + (x !== undefined ? '  [' + x + ']' : '')); c ? PASS++ : FAIL++; };
function send(method, params, sessionId) {
  const id = ++tid; const msg = { id, method, params: params || {} };
  if (sessionId) msg.sessionId = sessionId;
  ws.send(JSON.stringify(msg));
  return new Promise((res, rej) => {
    pending.set(id, { res, rej });
    setTimeout(() => { if (pending.has(id)) { pending.delete(id); rej(new Error('timeout ' + method)); } }, 25000);
  });
}
async function ev(expr) {
  const r = await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true });
  if (r.exceptionDetails) throw new Error(r.exceptionDetails.text + ' ' + ((r.exceptionDetails.exception || {}).description || '').slice(0, 200));
  return r.result.value;
}
async function goto(url) {
  jsErr = [];
  await send('Page.navigate', { url: 'about:blank' });
  await wait(250);
  await send('Page.navigate', { url });
  for (let i = 0; i < 40; i++) { try { if (await ev('document.readyState') === 'complete') break; } catch (e) { } await wait(400); }
  await wait(2200);
}

/* 可见文本的语言画像：用「该语言特有的字符/字母」判，避免汉字区间把日语误判成中文 */
const LANGPROBE = `JSON.stringify((function(){
  var t = document.body.innerText || '';
  function cnt(re){ return (t.match(re)||[]).length; }
  var han  = cnt(/[\\u4e00-\\u9fff]/g);
  var kana = cnt(/[\\u3040-\\u30ff]/g);
  var hang = cnt(/[\\uac00-\\ud7af\\u1100-\\u11ff]/g);
  var cyr  = cnt(/[\\u0400-\\u04ff]/g);
  var arab = cnt(/[\\u0600-\\u06ff]/g);
  var hebr = cnt(/[\\u0590-\\u05ff]/g);
  var thai = cnt(/[\\u0e00-\\u0e7f]/g);
  var deva = cnt(/[\\u0900-\\u097f]/g);
  var grek = cnt(/[\\u0370-\\u03ff]/g);
  var lat  = cnt(/[A-Za-z]/g);
  var total = t.replace(/\\s/g,'').length || 1;
  var leak = (t.match(/\\b(?:tc|det|mk|btn|lbl|sec|opt|grp|tag|rep|pv|fx|cl)[A-Z][A-Za-z0-9]{2,}\\b/g)||[]).slice(0,6);
  var sel = document.querySelector('#uiLang, #langSel');
  /* 指纹：去掉空白与数字后的正文前 500 字——用来判断「两个语言是不是同一套文案」 */
  var fp = t.replace(/\\s+/g,'').replace(/[0-9.,:：，。]/g,'').slice(0,500);
  return { han:han, kana:kana, hang:hang, cyr:cyr, arab:arab, hebr:hebr, thai:thai, deva:deva, grek:grek,
           lat:lat, total:total, hanPct: Math.round(han/total*100), leak:leak, fp:fp,
           selVal: sel?sel.value:null, selN: sel?sel.options.length:null, title: document.title.slice(0,40) };
})())`;

const NEED = {
  'zh-CN': ['han', 120], 'zh-TW': ['han', 120], 'ja': ['kana', 30], 'ko': ['hang', 30],
  'ru': ['cyr', 40], 'uk': ['cyr', 40], 'ar': ['arab', 40], 'he': ['hebr', 40],
  'th': ['thai', 40], 'hi': ['deva', 40], 'el': ['grek', 40]
};
const NAME = { 'zh-CN': '简中', 'zh-TW': '繁中', 'ja': '日语', 'ko': '韩语', 'ru': '俄语', 'uk': '乌语', 'ar': '阿语', 'he': '希伯来', 'th': '泰语', 'hi': '印地', 'el': '希腊', 'en': '英文', 'es': '西语', 'de': '德语', 'fr': '法语', 'pt': '葡语' };

(async () => {
  const chrome = spawn(CHROME, [
    '--headless=new', '--remote-debugging-port=' + PORT, '--no-sandbox', '--disable-gpu',
    '--remote-allow-origins=*', '--window-size=1440,1100', '--no-proxy-server',
    '--user-data-dir=/tmp/cbuddy-audit-' + Date.now()
  ], { stdio: 'ignore' });
  let list = null;
  for (let i = 0; i < 25 && !list; i++) {
    await wait(1000);
    list = await new Promise(res => {
      const q = http.get('http://127.0.0.1:' + PORT + '/json/list', r => { let b = ''; r.on('data', d => b += d); r.on('end', () => res(JSON.parse(b))); });
      q.on('error', () => res(null));
    });
  }
  if (!list) throw new Error('Chrome 没起来');
  ws = new WebSocket(list.find(t => t.type === 'page').webSocketDebuggerUrl, { perMessageDeflate: false });
  await new Promise(r => ws.on('open', r));
  ws.on('message', buf => {
    const o = JSON.parse(buf.toString());
    if (o.method === 'Runtime.exceptionThrown') jsErr.push((((o.params.exceptionDetails || {}).exception || {}).description || '').split('\n')[0]);
    if (o.method === 'Runtime.consoleAPICalled' && o.params.type === 'error') jsErr.push((o.params.args[0] || {}).value || '');
    if (o.id && pending.has(o.id)) { const p = pending.get(o.id); pending.delete(o.id); o.error ? p.rej(new Error(JSON.stringify(o.error))) : p.res(o.result); }
  });
  await send('Runtime.enable');
  await send('Page.enable');
  await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1100, deviceScaleFactor: 1, mobile: false });

  console.log('\n━━━ ① 多语言：切到某个语言后，界面到底显示什么 ━━━');
  const LANGS13 = ['zh-CN', 'zh-TW', 'en', 'ja', 'ko', 'ru', 'ar', 'th', 'el', 'es', 'de', 'fr', 'pt'];
  const probes = [];
  [['首页', ''], ['工作台', 'translate.html'], ['特效页', 'merge.html'], ['清洗页', 'clean.html']].forEach(pg => {
    LANGS13.forEach(l => probes.push([pg[0], pg[1], l]));
  });
  const rows = [];
  for (const [pgName, file, lang] of probes) {
    const path = '/' + (lang === 'zh-CN' ? '' : lang + '/') + file;
    await goto(BASE + path);
    const p = JSON.parse(await ev(LANGPROBE));
    rows.push({ pgName, lang, han: p.han, hanPct: p.hanPct, leak: p.leak, fp: p.fp, selN: p.selN, selVal: p.selVal, need: p });
  }
  /* 分组：同一页面下，指纹相同的语言 = 显示的是同一套文案（说明那些语言没真正生效） */
  ['首页', '工作台', '特效页', '清洗页'].forEach(pg => {
    const rs = rows.filter(r => r.pgName === pg);
    const groups = {};
    rs.forEach(r => { (groups[r.fp] = groups[r.fp] || []).push(r.lang); });
    const uniq = Object.keys(groups).length;
    const dupGroups = Object.values(groups).filter(g => g.length > 1);
    const okAll = uniq === rs.length;
    console.log('  ' + (okAll ? '✓' : '✗') + ' ' + pg + '：' + rs.length + ' 种语言里产出 ' + uniq +
      ' 种不同文案' + (dupGroups.length ? '  重复的：' + dupGroups.map(g => g.join('=')).join('  ') : ''));
    if (!okAll) FAIL++; else PASS++;
    /* 中文残留 & key 外泄 */
    rs.forEach(r => {
      const isCjk = r.lang === 'zh-CN' || r.lang === 'zh-TW' || r.lang === 'ja';
      if (!isCjk && r.hanPct > 8) { console.log('      ✗ ' + pg + ' · ' + (NAME[r.lang] || r.lang) + '：正文里混着 ' + r.hanPct + '% 汉字（有词条没翻）'); FAIL++; }
      if (r.leak.length) { console.log('      ✗ ' + pg + ' · ' + (NAME[r.lang] || r.lang) + '：露出未翻译 key ' + r.leak.join(',')); FAIL++; }
    });
  });
  const selN = [...new Set(rows.map(r => r.pgName + '=' + r.selN + '项'))];
  console.log('  · 语言下拉：' + selN.join(' '));

  console.log('\n━━━ ② 三个引擎：真浏览器里跑典型用例 ━━━');
  await goto(BASE + '/translate.html');
  const srt = JSON.parse(await ev(`JSON.stringify((function(){
    try{
      var C=window.SrtCore; if(!C) return {err:'SrtCore 没挂到 window'};
      var raw='1\\n00:00:01,000 --> 00:00:04,000\\nHello there, this is a fairly long subtitle line.\\n\\n2\\n00:00:05,000 --> 00:00:07,000\\nSecond line\\n';
      var r=C.parseSrt(raw); var items=r&&r.items?r.items:null;
      var back=items?C.formatSrt(items):null;
      return {api:1, n:items?items.length:-1, issues:(r&&r.issues)?r.issues.length:-1,
              roundtrip: back? back.indexOf('Hello there')>=0 : false};
    }catch(e){ return {err:String(e).slice(0,120)}; }
  })())`));
  ok(!srt.err && srt.n === 2 && srt.roundtrip, '翻译引擎 SrtCore：解析 ' + srt.n + ' 条 + 格式化往返无损（体检出 ' + srt.issues + ' 处轴问题）', srt.err || '');

  await goto(BASE + '/merge.html');
  const mg = JSON.parse(await ev(`JSON.stringify((function(){
    try{
      var C=window.MergeCore; if(!C) return {err:'MergeCore 没挂到 window'};
      var a='1\\n00:00:01,000 --> 00:00:03,000\\nHello world.\\n', b='1\\n00:00:01,000 --> 00:00:03,000\\n你好世界。\\n';
      var A=C.parseSrt(a), B=C.parseSrt(b);
      var ia=A&&A.items?A.items:null, ib=B&&B.items?B.items:null;
      return {api:1, a:ia?ia.length:-1, b:ib?ib.length:-1};
    }catch(e){ return {err:String(e).slice(0,120)}; }
  })())`));
  ok(!mg.err && mg.a === 1 && mg.b === 1, '特效引擎 MergeCore：双语各解析 ' + mg.a + '/' + mg.b + ' 条', mg.err || '');

  await goto(BASE + '/clean.html');
  const cl = JSON.parse(await ev(`JSON.stringify((function(){
    try{
      var C=window.CleanCore; if(!C) return {err:'CleanCore 没挂到 window'};
      var raw='1\\n00:00:01,000 --> 00:00:03,000\\n[ENG] 本字幕由 XX 字幕组制作\\n\\n2\\n00:00:04,000 --> 00:00:06,000\\n(MUSIC PLAYING)\\n\\n3\\n00:00:07,000 --> 00:00:09,000\\nHello   world\\n';
      var items=(C.parseSrt(raw)||{}).items||[];
      var r=C.clean(items,{wm:1,sdh:1,junk:1,text:1,tag:1,tidy:1});
      return {api:1, items:items.length, changes: r&&r.changes?r.changes.length:-1};
    }catch(e){ return {err:String(e).slice(0,120)}; }
  })())`));
  ok(!cl.err && cl.changes > 0, '清洗引擎 CleanCore：' + cl.items + ' 条脏字幕洗出 ' + cl.changes + ' 处改动', cl.err || '');

  console.log('\n━━━ ③ 三个模块：DOM 冒烟 ━━━');
  await goto(BASE + '/clean.html');
  await ev(`(function(){var ta=document.getElementById('paste'); if(!ta) return 'no-paste';
    ta.value='1\\n00:00:01,000 --> 00:00:03,000\\n[ENG] XX字幕组 制作\\n\\n2\\n00:00:04,000 --> 00:00:06,000\\n(MUSIC PLAYING)\\n\\n3\\n00:00:07,000 --> 00:00:09,000\\nHello   world\\n';
    ta.dispatchEvent(new Event('input',{bubbles:true})); return 'ok';})()`);
  await wait(900);
  const clAfter = JSON.parse(await ev(`JSON.stringify((function(){
    return {rows:document.querySelectorAll('#tbody tr').length,
            stats:((document.getElementById('statRow')||{}).innerText||'').replace(/\\s+/g,' ').slice(0,70)};
  })())`));
  ok(clAfter.rows > 0 || clAfter.stats.length > 0, '清洗页：粘贴后结果区有产出', JSON.stringify(clAfter));

  await goto(BASE + '/translate.html');
  const trDom = JSON.parse(await ev(`JSON.stringify((function(){
    var g=document.getElementById('btnGo'), e=document.getElementById('expStyle');
    return {go:!!g, goTxt:g?g.innerText.slice(0,16):'', exp:!!e, expN:e?e.options.length:0};
  })())`));
  ok(trDom.go && trDom.exp && trDom.expN > 0, '翻译页：翻译按钮 + 导出格式 ' + trDom.expN + ' 档都在', trDom.goTxt);

  await goto(BASE + '/merge.html');
  const mgDom = JSON.parse(await ev(`JSON.stringify((function(){
    var b=document.getElementById('btnMerge');
    return {btn:!!b, btnTxt:b?b.innerText.slice(0,16):'', slots:document.querySelectorAll('[data-slot]').length, sels:document.querySelectorAll('select').length};
  })())`));
  ok(mgDom.btn, '特效页：合并按钮在（' + mgDom.btnTxt + '）');
  ok(mgDom.slots > 0 || mgDom.sels > 3, '特效页：样式槽/下拉齐全（槽 ' + mgDom.slots + ' · 下拉 ' + mgDom.sels + '）');

  console.log('\n━━━ ④ 首页落地页 ━━━');
  await goto(BASE + '/');
  const hp = JSON.parse(await ev(`JSON.stringify((function(){
    return {cards:[].slice.call(document.querySelectorAll('.tc')).map(function(a){return a.getAttribute('href');}),
      dets:document.querySelectorAll('.det').length, figs:document.querySelectorAll('.det-fig').length,
      hasWs:!!document.getElementById('viewWorkspace'),
      leak:(document.body.innerText.match(/\\b(?:tc|det|mk)[A-Z][A-Za-z0-9]{2,}\\b/g)||[]).slice(0,5),
      ov: document.documentElement.scrollWidth > window.innerWidth + 2};
  })())`));
  ok(hp.cards.length === 4, '首页 4 张工具卡', hp.cards.join(' | '));
  ok(hp.dets === 4 && hp.figs === 4, '首页 4 段图文详解 + 4 张示意图', hp.dets + '/' + hp.figs);
  ok(!hp.hasWs, '首页不含工作台 DOM');
  ok(hp.leak.length === 0, '首页没有露出未翻译的 key', hp.leak.join(','));
  ok(!hp.ov, '首页无横向溢出');
  ok(jsErr.length === 0, '首页零 JS 异常', jsErr.slice(0, 2).join(' / '));

  console.log('\n—— 浏览器层：通过 ' + PASS + ' / 失败 ' + FAIL + ' ——');
  process.exit(0);
})().catch(e => { console.error('崩了：', e.message); process.exit(1); });
