/* _chk333_live.js —— 线上版：首页演示区本地化验收（真浏览器，27 语逐页）
 *
 * 与 _chk333.js 的差别只有一处：不起本地 server，直接打生产域名。
 * 其余判据（逐键比对 / 汉字白名单 / 截断检测）一行未改，保证两边口径一致。
 * 用法：node _chk333_live.js [只跑指定语言]
 *
 * 与 _site329.js / _site332.js 平行、互不共用：这两份查的是整站 hreflang / sitemap / JSON-LD，
 * 本脚本只查 v0.9.333 这一件事 —— 演示区样例文案是否真的按语言替换了。
 *
 * 判据（三条，都由浏览器里的真实 DOM 得出）：
 *   ① 每条 data-i18n 的 textContent 必须等于 demo-i18n.js 里对应语言的值（逐键逐语比对）
 *   ② 渲染后正文里残留的汉字，只允许出现在白名单区块（logo 字标 / 语言菜单母语名 /
 *      简繁转换演示 / 乱码修复演示的日文样例）
 *   ③ 演示框不许横向撑破：.mk-p 等元素 scrollWidth > clientWidth 记为截断，列出来供人工判断
 *
 * 用法：node _chk333.js  [只跑指定语言，如 node _chk333.js en de ja]
 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const http = require('http');
const { spawn } = require('child_process');
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');

const ROOT = __dirname;
const PORT = Number(process.env.PORT || 3406);
const DEBUG = Number(process.env.DEBUG_PORT || 9431);
const BASE = process.env.BASE || 'https://ai-srtsub.com';
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const LANGS = ['zh-CN', 'zh-TW', 'en', 'ja', 'es', 'pt', 'ko', 'de', 'fr', 'id', 'hi', 'th', 'vi',
  'ru', 'it', 'ar', 'tr', 'nl', 'pl', 'sv', 'cs', 'uk', 'da', 'fi', 'el', 'he', 'ro'];
const ONLY = process.argv.slice(2).filter(x => LANGS.indexOf(x) >= 0);
const TODO = ONLY.length ? ONLY : ['en', 'de', 'ru', 'ar', 'th', 'hi', 'fr', 'pt'];

const sleep = ms => new Promise(r => setTimeout(r, ms));
const getJson = url => new Promise((res, rej) => {
  http.get(url, r => { let b = ''; r.on('data', d => b += d); r.on('end', () => { try { res(JSON.parse(b)); } catch (e) { rej(e); } }); }).on('error', rej);
});

/* ---------- 读 demo-i18n.js 的 27 语字典 ---------- */
const sandbox = { window: { SiteI18N: { I18N: {} } } };
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync(path.join(ROOT, 'demo-i18n.js'), 'utf8'), sandbox);
const DEMO = sandbox.window.SiteI18N.DEMO;

/* ---------- 统计 index.html 里每个键挂了几个元素 ---------- */
const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const want = {};
(html.match(/data-i18n="([A-Za-z0-9_]+)"/g) || []).forEach(m => {
  const k = m.slice(11, -1);
  if (DEMO['zh-CN'][k] !== undefined) want[k] = (want[k] || 0) + 1;
});

(async () => {
  const udir = '/tmp/cr-chk333-' + Date.now();
  const chrome = spawn(CHROME, ['--headless=new', '--no-sandbox', '--disable-gpu', '--no-first-run',
    '--remote-debugging-port=' + DEBUG, '--user-data-dir=' + udir, 'about:blank'], { stdio: 'ignore' });
  let list = null;
  for (let i = 0; i < 60 && !list; i++) { await sleep(400); try { list = await getJson('http://127.0.0.1:' + DEBUG + '/json/list'); } catch (e) { } }
  if (!list) { chrome.kill(); throw new Error('CDP 起不来'); }
  const tab = list.find(t => t.type === 'page') || list[0];
  const ws = new WebSocket(tab.webSocketDebuggerUrl, { perMessageDeflate: false, maxPayload: 256 * 1024 * 1024 });
  let mid = 0; const pend = {};
  ws.on('message', d => { const m = JSON.parse(d); if (m.id && pend[m.id]) { const f = pend[m.id]; delete pend[m.id]; f(m); } });
  await new Promise(r => ws.on('open', r));
  const send = (method, params) => new Promise(r => {
    const id = ++mid;
    const t = setTimeout(() => { delete pend[id]; r({ __t: 1 }); }, 25000);
    pend[id] = m => { clearTimeout(t); r(m); };
    ws.send(JSON.stringify({ id, method, params: params || {} }));
  });
  await send('Runtime.enable'); await send('Page.enable');
  /* 手机屏 375×812：长文本语言最容易在这里撑破 */
  await send('Emulation.setDeviceMetricsOverride', { width: 375, height: 812, deviceScaleFactor: 2, mobile: true });
  const ev = async expr => {
    const r = await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true });
    return r.result && r.result.result ? r.result.result.value : null;
  };

  const rows = [], problems = [], allTrunc = [];

  for (const L of TODO) {
    const url = BASE + (L === 'zh-CN' ? '/' : '/' + L + '/');
    await send('Page.navigate', { url });
    let ready = '';
    for (let i = 0; i < 100; i++) { await sleep(250); ready = await ev('document.readyState'); if (ready === 'complete') break; }
    await sleep(1200);

    const raw = await ev(`(function(){
      var HAN=/[\\u4e00-\\u9fff]/;
      /* ① 每个键的实际文本 */
      var texts={};
      document.querySelectorAll('[data-i18n]').forEach(function(el){
        var k=el.getAttribute('data-i18n');
        (texts[k]=texts[k]||[]).push((el.textContent||'').trim());
      });
      /* ② 残留汉字（跳过 script/style，记录所属祖先类名） */
      var left=[];
      var w=document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null);
      while(w.nextNode()){
        var n=w.currentNode, t=n.nodeValue||'';
        if(!HAN.test(t)) continue;
        var p=n.parentElement; if(!p) continue;
        var tag=p.tagName.toLowerCase(); if(tag==='script'||tag==='style') continue;
        var chain=[], q=p;
        for(var i=0;i<3&&q;i++){ chain.unshift(q.tagName.toLowerCase()+(q.className?'.'+String(q.className).trim().split(/\\s+/).join('.'):'')); q=q.parentElement; }
        left.push([chain.join('>'), t.trim().slice(0,50), (t.match(/[\\u4e00-\\u9fff]/g)||[]).length]);
      }
      /* ③ 演示框截断检测 */
      var trunc=[];
      document.querySelectorAll('.mk-p,.mk-doc-h .d,.mk-hit,.viz-chip,.mk-play .l2,.mk-play .l1,.mk-screen .l2,.mk-screen .l2.only').forEach(function(el){
        if(el.scrollWidth > el.clientWidth + 1) trunc.push([String(el.className).split(/\\s+/)[0], (el.textContent||'').trim().slice(0,36), el.scrollWidth, el.clientWidth]);
      });
      /* ④ 横向溢出：右边界超出视口、且不属于本身可横滚的演示容器 */
      var over=[];
      document.querySelectorAll('body *').forEach(function(el){
        var r=el.getBoundingClientRect();
        if(r.width>0 && r.right>window.innerWidth+2 && !el.closest('.mk-screen,.mk-play,.tbl-wrap')){
          var tx=(el.textContent||'').trim();
          if(tx.length && tx.length<60) over.push([el.tagName.toLowerCase(), tx.slice(0,30), Math.round(r.right)]);
        }
      });
      return JSON.stringify({texts:texts,left:left,trunc:trunc,over:over.slice(0,8),sw:document.documentElement.scrollWidth,iw:window.innerWidth,lang:document.documentElement.lang,dir:document.documentElement.dir});
    })()`);
    const R = JSON.parse(raw || '{}');

    /* ① 逐键比对 */
    const mism = [];
    Object.keys(want).forEach(k => {
      const arr = (R.texts || {})[k] || [];
      const exp = DEMO[L][k];
      if (arr.length !== want[k]) { mism.push(k + ' 元素数 ' + arr.length + '≠' + want[k]); return; }
      arr.forEach(v => { if (v !== exp) mism.push(k + ' 文本「' + v + '」≠「' + exp + '」'); });
    });
    if (mism.length) problems.push(L + ' 键值不符：' + mism.slice(0, 4).join(' / '));

    /* ② 汉字白名单 */
    const WL = [
      /logo-mark/,                    /* 「字」字标 */
      />select>option/,               /* 语言下拉的母语名（简体中文 / 繁體中文 / 日本語） */
      /hc-fig/,                       /* 简繁转换演示：必须是中文才演示得出来 */
      /rp-fig/                        /* 乱码修复演示：日文样例 */
    ];
    /* 中日韩三种语言的正文本来就该是汉字（日语用汉字），不做「残留」判定 */
    const CJK_UI = (L === 'zh-CN' || L === 'zh-TW' || L === 'ja');
    const leftBad = CJK_UI ? [] : (R.left || []).filter(it => !WL.some(re => re.test(it[0])));
    const leftHan = (R.left || []).reduce((a, b) => a + b[2], 0);
    if (leftBad.length) problems.push(L + ' 残留汉字 ' + leftBad.length + ' 处：' + leftBad.slice(0, 3).map(x => x[1]).join(' / '));

    (R.trunc || []).forEach(t => allTrunc.push([L].concat(t)));
    rows.push({
      L, lang: R.lang, dir: R.dir,
      mism: mism.length,
      leftHan, leftBad: leftBad.length,
      trunc: (R.trunc || []).length,
      over: (R.over || []).length, sw: R.sw, iw: R.iw,
      leftSample: (R.left || []).slice(0, 6)
    });
    console.log('  ' + L.padEnd(6) + ' 键不符=' + String(mism.length).padEnd(2)
      + ' 截断=' + String((R.trunc || []).length).padEnd(2) + ' 溢出元素=' + String((R.over || []).length).padEnd(2)
      + ' 页宽=' + R.sw + '/' + R.iw
      + (R.over && R.over.length ? '  ' + R.over.slice(0, 2).map(function (x) { return x[1]; }).join(' / ') : ''));
    (R.over || []).forEach(function (o, i) {
      if (i < 6) console.log('        over[' + i + '] ' + o[0] + '  right=' + o[2] + '  文字=' + o[1]);
    });
  }

  console.log('\n===== 汇总 =====');
  const bad = rows.filter(r => r.mism || r.leftBad);
  console.log('语言数 ' + rows.length + ' | 键值或残留汉字有问题 ' + bad.length + ' 个');
  problems.forEach(p => console.log('  ✗ ' + p));

  const zh = rows.filter(r => r.L !== 'zh-CN' && r.L !== 'zh-TW' && r.L !== 'ja');
  const maxHan = Math.max.apply(null, zh.map(r => r.leftHan));
  console.log('非中日韩语种：残留汉字最多 ' + maxHan + ' 字');

  /* 白名单内的汉字归属（打印一次 en 的明细，确认只剩该剩的） */
  const en = rows.find(r => r.L === 'en');
  if (en) {
    console.log('\n/en/ 残留汉字明细（应只有 logo「字」/ 语言名 / 简繁演示 / 日文样例）：');
    en.leftSample.forEach(x => console.log('  [' + x[2] + '] ' + x[0].slice(0, 50) + ' → ' + x[1]));
  }

  if (allTrunc.length) {
    console.log('\n演示框截断（scrollWidth > clientWidth）共 ' + allTrunc.length + ' 条，前 12：');
    allTrunc.slice(0, 12).forEach(t => console.log('  ' + t[0].padEnd(5) + ' ' + String(t[1]).padEnd(14) + ' ' + t[2] + '>' + t[3] + '  ' + t[3]));
  } else {
    console.log('\n演示框无截断 ✓');
  }

  ws.close(); chrome.kill();
  process.exit(bad.length ? 1 : 0);
})().catch(e => { console.error('FATAL', e.message); process.exit(2); });
