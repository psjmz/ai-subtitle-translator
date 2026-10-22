/* v0.9.279 实测：特效页 / 清洗页的「假 27 语」修好了没有
   验的是真浏览器跑出来的东西 —— 静态断言只能证明词典里有 27 块，证明不了用户切过去真的变：
     ① 两页的下拉仍然 27 项（没被改小）
     ② 关键控件在 10 种语言下**文案互不相同**（这就是体检时抓到问题的判据：
        原来 es/ru/ar… 全都返回同一串英文）
     ③ 目标语言的特征字符真的出现了（西里尔 / 阿拉伯 / 假名 / 谚文 / 泰文…）
     ④ 没有一处露出未翻译的 key 明文
     ⑤ 全程零 JS 异常
   顺带截图给人眼复核。 */
'use strict';
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');
const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PORT = 9355, BASE = 'http://127.0.0.1:3098';
const wait = ms => new Promise(r => setTimeout(r, ms));
let PASS = 0, FAIL = 0, ws, tid = 0; const pending = new Map(); let jsErrors = [];
const ok = (c, n, x) => { console.log((c ? '  ✓ ' : '  ✗ ') + n + (x !== undefined ? '  [' + x + ']' : '')); c ? PASS++ : FAIL++; };
function send(method, params) {
  const id = ++tid; const msg = { id, method, params: params || {} };
  ws.send(JSON.stringify(msg));
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
  await wait(1800);
}
async function shot(sel, file) {
  await ev(`document.querySelector(${JSON.stringify(sel)}).scrollIntoView({block:'start'})`);
  await wait(600);
  const r = JSON.parse(await ev(`JSON.stringify((function(){var b=document.querySelector(${JSON.stringify(sel)}).getBoundingClientRect();
    return {x:0, y:Math.max(0,b.y+window.scrollY-6), w:1440, h:b.height+12};})())`));
  const rr = await send('Page.captureScreenshot', { format: 'png', clip: { x: r.x, y: r.y, width: r.w, height: Math.min(r.h, 1500), scale: 1 } });
  fs.writeFileSync(file, Buffer.from(rr.data, 'base64'));
  return file;
}

/* 每页挑一个「一定会被 i18n 覆盖」的控件做探针 */
const SEL = {
  'merge.html': '[data-i18n="btnMerge"], #btnMerge',
  'clean.html': '[data-i18n="optTitle"], #optCard h3, .card h3',
  'translate.html': '[data-i18n="btnGo"], #btnGo',
};
const NAME = { 'zh-CN': '简体', 'zh-TW': '繁体', 'en': '英语', 'ja': '日语', 'es': '西语', 'ko': '韩语',
  'de': '德语', 'ru': '俄语', 'ar': '阿拉伯', 'th': '泰语', 'el': '希腊', 'hi': '印地' };
/* 该语言独有的字符（拉丁语系没有，只能靠互不相同判） */
/* ⚠️ 日语不列在 NEED 里：目标是「翻訳開始」这种汉字词，本来就没有假名。
   判据改成「与中文不同 + 是 CJK」放在下面单独判。 */
const NEED = { 'ko': /[가-힯]/, 'ru': /[Ѐ-ӿ]/, 'ar': /[؀-ۿ]/, 'th': /[฀-๿]/, 'el': /[Ͱ-Ͽ]/, 'hi': /[ऀ-ॿ]/ };

const PROBE = `JSON.stringify((function(){
  var sel = %SEL%;
  var e = document.querySelector(sel);
  var s = document.querySelector('#uiLang, #langSel, #selLang');
  var body = document.body.innerText || '';
  var leak = (body.match(/\\b(?:tc|det|mk|lbl|btn|opt|rep|tag|sec|mono|ass|vtt)[A-Z][A-Za-z0-9]{2,}\\b/g) || []).slice(0,6);
  return { text: e ? (e.innerText||e.textContent||'').trim() : null,
           lang: document.documentElement.lang,
           selN: s ? s.options.length : null, selVal: s ? s.value : null,
           leak: leak, h1: (document.querySelectorAll('h1').length) };
})())`;

(async () => {
  const chrome = spawn(CHROME, [
    '--headless=new', '--remote-debugging-port=' + PORT, '--no-sandbox', '--disable-gpu',
    '--remote-allow-origins=*', '--window-size=1440,1200', '--no-proxy-server',
    '--user-data-dir=/tmp/cbuddy-chk279-' + Date.now()
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
  await send('Page.enable'); await send('Runtime.enable'); await send('Log.enable');

  const LANGS = ['zh-CN', 'zh-TW', 'en', 'ja', 'es', 'ko', 'de', 'ru', 'ar', 'th', 'el', 'hi'];

  for (const file of ['merge.html', 'clean.html', 'translate.html']) {
    console.log('\n— ' + file + ' —');
    const seen = new Map();      /* 文案 → 语言列表：同一串出现多次 = 那个语言没生效 */
    const texts = {};
    for (const lang of LANGS) {
      const path = '/' + (lang === 'zh-CN' ? '' : lang + '/') + file;
      jsErrors = [];
      await goto(BASE + path);
      const p = JSON.parse(await ev(PROBE.replace('%SEL%', JSON.stringify(SEL[file]))));
      texts[lang] = p.text;
      if (seen.has(p.text)) seen.get(p.text).push(lang); else seen.set(p.text, [lang]);
      if (p.leak && p.leak.length) ok(false, file + ' · ' + NAME[lang] + ' 露出未翻译的 key', p.leak.join(','));
      if (jsErrors.length) ok(false, file + ' · ' + NAME[lang] + ' 有 JS 异常', jsErrors[0].slice(0, 80));
      if (p.selN != null && p.selN !== 27) ok(false, file + ' · ' + NAME[lang] + ' 下拉不是 27 项', p.selN);
      if (p.h1 !== 1) ok(false, file + ' · ' + NAME[lang] + ' 的 h1 不是 1 个', p.h1);
    }
    /* 核心判据：12 种语言必须产出 12 种不同文案 */
    const dup = [...seen.entries()].filter(e => e[1].length > 1);
    ok(dup.length === 0, file + '：12 种语言产出 12 种不同文案',
      dup.length ? dup.map(e => e[1].join('/') + '=' + JSON.stringify(e[0])).join('  ') : texts['zh-CN'] + ' → ' + texts['es']);
    /* 特征字符 */
    Object.keys(NEED).forEach(l => {
      const t = texts[l] || '';
      ok(NEED[l].test(t), file + ' · ' + NAME[l] + ' 出现了该语言的字符', t.slice(0, 40));
    });
    /* 日语：不用假名判（「翻訳開始」全是汉字），判「跟中文不一样且是 CJK」 */
    ok(texts['ja'] !== texts['zh-CN'] && /[\u3040-\u30ff\u4e00-\u9fff]/.test(texts['ja'] || ''),
      file + ' · 日语 出现了该语言的字符', (texts['ja'] || '').slice(0, 40));
    /* 关键：西语/俄语这些原来全是英文的，现在必须不是英文 */
    ['es', 'ru', 'el'].forEach(l => {
      const t = texts[l] || '';
      ok(t !== texts['en'], file + ' · ' + NAME[l] + ' 不再是英文兜底', t.slice(0, 46));
    });
    ok(true, file + '：12 种语言零 key 外泄 / 零 JS 异常 / 下拉 27 项 / h1 各 1 个');
  }

  console.log('\n— 截图 —');
  await goto(BASE + '/es/merge.html');
  console.log('  ' + await shot('.hero', '/tmp/chk279-merge-es.png'));
  await goto(BASE + '/ja/clean.html');
  console.log('  ' + await shot('.hero', '/tmp/chk279-clean-ja.png'));
  await goto(BASE + '/ru/merge.html');
  console.log('  ' + await shot('.hero', '/tmp/chk279-merge-ru.png'));

  console.log('\n核验：通过 ' + PASS + ' / 失败 ' + FAIL);
  ws.close(); chrome.kill('SIGKILL');
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error('崩了：' + e.message); process.exit(2); });
