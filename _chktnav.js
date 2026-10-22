/* _chktnav.js —— 顶栏 100 语自检（跑真实 site-topnav.js + 真实 tnav 分片）
 *
 * 为什么用假 DOM 而不是浏览器：这批断言全是「解析期逻辑」（注入哪个分片、
 * 取词走哪一级），headless 里反而看不见 document.write 的内容。
 * vm 里能直接抓到 write 出来的字符串，判据最硬。
 *
 * 覆盖：
 *   ① 27 个内置语言：不发任何分片请求
 *   ② 73 种新语言：document.write 注入 /i18n/tnav-<lang>.js，且语言码合法
 *   ③ 分片加载后 tn/td/t 取到的是该语言译文，不是英文、也不是中文
 *   ④ 分片缺失时回落英文（不能崩、不能出 undefined）
 *   ⑤ 三字母语言码（yue / fil）能被 URL 判定认出来（旧版 {2} 认不出）
 *   ⑥ 切语言时按需补片（loadShard）+ 重绘
 *
 * 跑法：node _chktnav.js
 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const DIR = __dirname;
const SRC = fs.readFileSync(path.join(DIR, 'site-topnav.js'), 'utf8');

const NAV = JSON.parse(fs.readFileSync(path.join(DIR, '_navsrc.json'), 'utf8'));
const KEYS = NAV.all.slice();          /* 38 键（37 待翻 + tcClD 复用） */

/* 100 语列表：从生成物里读，保证与实现同源 */
const UI100 = JSON.parse('[' + (SRC.match(/var UI100 = \[([^\]]*)\]/)[1]) + ']');

let pass = 0, fail = 0;
const fails = [];
function ok(cond, name, extra) {
  if (cond) pass++;
  else { fail++; fails.push('✗ ' + name + (extra ? ' —— ' + extra : '')); }
}

/* 造一次运行：给定 pathname / html lang / navigator / 预置分片，返回渲染结果 */
function run(opts) {
  const writes = [];
  const scripts = [];
  /* 假顶栏节点：tighten() 会读 className / getBoundingClientRect，
     boot() 会往 window 绑 scroll/resize —— 都给个空实现，判据才跑得下去。
     单行高度写 31（真实值）：这样 tighten 直接判定「放得下」，不会去改 className。 */
  const box = {
    innerHTML: '', className: '',
    getBoundingClientRect: () => ({ height: 31, width: 620, top: 0, bottom: 31, left: 300, right: 920 }),
    parentNode: null
  };
  const els = {};
  if (opts.selectId) els[opts.selectId] = { id: opts.selectId, value: opts.selectValue, addEventListener: () => {} };
  const d = {
    readyState: 'complete',
    currentScript: { getAttribute: (k) => (k === 'data-tool' ? (opts.tool || '') : null) },
    getElementById: (id) => (id === 'topNav' ? box : (els[id] || null)),
    addEventListener: () => {},
    createElement: (t) => {
      const el = { tag: t, setAttribute() {}, _handlers: {} };
      el.addEventListener = () => {};
      scripts.push(el);
      return el;
    },
    write: (s) => { writes.push(s); },
    head: { appendChild: (el) => { scripts.push(el); } },
    body: { appendChild: () => {} },
    documentElement: { getAttribute: () => (opts.htmlLang || null), appendChild: () => {} }
  };
  const w = {
    location: { pathname: opts.pathname },
    navigator: { language: opts.navLang || 'en' },
    __TNAV__: opts.shards || {},
    addEventListener: () => {}
  };
  w.window = w;
  const ctx = { window: w, document: d, navigator: w.navigator, location: w.location, console };
  ctx.globalThis = ctx;
  vm.createContext(ctx);
  /* 分片文件是 (function(){ var T = window.__TNAV__; ... })()，
     在 vm 里 window 就是我们的假 w，能直接跑 */
  vm.runInContext(SRC, ctx);
  return { writes, scripts, box, nav: ctx.window.SiteTopNav, TNAV: w.__TNAV__ };
}

/* ---------- ① 内置 27 语不发请求 ---------- */
for (const l of ['zh-CN', 'en', 'ja', 'ar', 'he']) {
  const r = run({ pathname: '/' + l + '/translate.html', navLang: 'zh-CN' });
  ok(r.writes.length === 0, '① ' + l + ' 不发分片请求', JSON.stringify(r.writes));
  ok(r.box.innerHTML.length > 0, '① ' + l + ' 顶栏有渲染内容');
}

/* ---------- ② 新语言注入分片 ---------- */
const shards = {};
function shardFor(lang) {
  const f = path.join(DIR, 'i18n', 'tnav-' + lang + '.js');
  if (!fs.existsSync(f)) return null;
  const ctx = { window: { __TNAV__: shards } };
  ctx.globalThis = ctx;
  vm.createContext(ctx);
  try { vm.runInContext(fs.readFileSync(f, 'utf8'), ctx); } catch (e) { return null; }
  return shards[lang] || null;
}
const avail = fs.readdirSync(path.join(DIR, 'i18n'))
  .filter(f => /^tnav-.*\.js$/.test(f)).map(f => f.replace(/^tnav-/, '').replace(/\.js$/, ''));
ok(avail.length > 0, '② 已有 tnav 分片：' + avail.length + ' 个');

const sample = avail.slice(0, 5).concat(['yue', 'fil', 'ceb'].filter(x => avail.indexOf(x) >= 0));
for (const l of sample) {
  const r = run({ pathname: '/' + l + '/translate.html', navLang: 'zh-CN' });
  ok(r.writes.length === 1, '② ' + l + ' 注入一个分片', JSON.stringify(r.writes));
  ok(r.writes[0] && r.writes[0].indexOf('/i18n/tnav-' + l + '.js') > 0, '② ' + l + ' 注入的是自己的分片', r.writes[0]);
  /* 版号从生成物里反查，别写死：升版后这里不该红 */
    const VER = (SRC.match(/tnav-. \+ l0 \+ .\.js\?v=([0-9.]+)/) || [])[1] || '';
    ok(r.writes[0] && VER && r.writes[0].indexOf('?v=' + VER) > 0, '② ' + l + ' 分片带版号', VER);
}

/* ---------- ⑤ 三字母语言码 ---------- */
for (const l of ['yue', 'fil', 'ceb']) {
  const r = run({ pathname: '/' + l + '/index.html', navLang: 'zh-CN' });
  ok(r.writes.length === 1 && r.writes[0].indexOf('tnav-' + l + '.js') > 0,
    '⑤ 三字母 ' + l + ' 能被 URL 判定认出（旧版 {2} 认不出）', JSON.stringify(r.writes));
}
/* 无尾斜杠 / 首页形态 */
for (const p of ['/ms', '/ms/', '/ms/index.html']) {
  const r = run({ pathname: p, navLang: 'zh-CN' });
  ok(r.writes.length === 1 && r.writes[0].indexOf('tnav-ms.js') > 0,
    '⑤ 路径形态 ' + p + ' 也能认出语言', JSON.stringify(r.writes));
}
/* 非语言路径不能被误认 */
for (const p of ['/translate.html', '/guides/', '/qc.html']) {
  const r = run({ pathname: p, navLang: 'en' });
  ok(r.writes.length === 0, '⑤ ' + p + ' 不被误认成语言', JSON.stringify(r.writes));
}

/* ---------- ③ 分片到位后取到真译文 ---------- */
const CJK = /[\u4e00-\u9fff\u3040-\u30ff\uac00-\ud7af]/;
let checked = 0;
for (const l of avail) {
  const sh = shardFor(l);
  if (!sh) { fail++; fails.push('✗ ' + l + ' 分片跑不起来'); continue; }
  const pre = {}; pre[l] = sh;
  const r = run({ pathname: '/' + l + '/translate.html', navLang: 'zh-CN', shards: pre });
  const html = r.box.innerHTML;

  /* 顶栏必须出现该语言的「更多工具」译文 */
  const more = sh.tnMore;
  ok(html.indexOf(more) >= 0, '③ ' + l + ' 顶栏出现 tnMore 译文', more);

  /* 不能是英文回落（除非该语言译文恰好等于英文，如 navBt/tnG4 的 Batch） */
  if (String(sh.tnMore).toLowerCase() !== String(NAV.en.tnMore).toLowerCase()) {
    ok(html.indexOf('>' + NAV.en.tnMore + '<') < 0, '③ ' + l + ' tnMore 没退回英文');
  }
  /* 非中日韩语言不能混进中文 */
  if (!/^(zh|ja|ko|yue|wuu|nan|hak|lzh)/.test(l)) {
    ok(!CJK.test(html), '③ ' + l + ' 顶栏没混入中日韩汉字');
  }
  /* 工具名与描述都要在 */
  const nm = sh.navTr;
  ok(html.indexOf(nm) >= 0, '③ ' + l + ' 顶栏出现 navTr 译文', nm);
  checked++;
}

/* ---------- ④ 分片缺失 → 回落英文，不崩 ---------- */
{
  let crashed = null;
  try {
    const r = run({ pathname: '/mi/translate.html', navLang: 'zh-CN', shards: {} });
    if (r.box.innerHTML.indexOf('More Tools') < 0) crashed = '没回落英文';
    if (r.box.innerHTML.indexOf('undefined') >= 0) crashed = '出现 undefined';
  } catch (e) { crashed = e.message; }
  ok(!crashed, '④ 分片缺失时回落英文且不崩', crashed);
}

/* ---------- ⑥ 语言下拉切换：先补片再重绘 ---------- */
{
  const els = {};
  const box = {
    innerHTML: '', className: '',
    getBoundingClientRect: () => ({ height: 31, width: 620, top: 0, bottom: 31, left: 300, right: 920 }),
    parentNode: null
  };
  let appended = null;
  const d = {
    readyState: 'complete',
    currentScript: { getAttribute: () => '' },
    getElementById: (id) => (id === 'topNav' ? box : (els[id] || null)),
    addEventListener: () => {},
    createElement: () => {
      const el = { setAttribute() {}, addEventListener() {} };
      return el;
    },
    write: () => {},
    /* ⚠️ 只记录带 src 的（script）：injectCss 也会往 head 塞一个 <style>，
        不区分的话 appended 会被 style 覆盖，src 断言必然失败。
       ⚠️ 回调前先把该语言的译文塞进 __TNAV__ —— 真实浏览器里脚本下载完就是这效果，
        不模拟这一步，onload → render 时分片还是空的，量到的是「闪一遍英文」。 */
    head: {
      appendChild: (el) => {
        if (!el.src) return;
        appended = el;
        const m = String(el.src).match(/tnav-([a-z]{2,3}(?:-[A-Za-z]{2,4})?)\.js/);
        if (m) { const s = shardFor(m[1]); if (s) w.__TNAV__[m[1]] = s; }
        if (el.onload) el.onload();
      }
    },
    body: { appendChild: () => {} },
    documentElement: { getAttribute: () => 'en', appendChild: () => {} }
  };
  const sel = { id: 'uiLang', value: 'en', _h: null, addEventListener: (t, f) => { sel._h = f; } };
  els.uiLang = sel;
  const w = { location: { pathname: '/translate.html' }, navigator: { language: 'en' }, __TNAV__: {}, addEventListener: () => {} };
  w.window = w;
  const ctx = { window: w, document: d, navigator: w.navigator, location: w.location, console };
  ctx.globalThis = ctx;
  vm.createContext(ctx);
  vm.runInContext(SRC, ctx);
  ok(typeof sel._h === 'function', '⑥ 语言下拉挂上了 change 处理');
  /* 切到 ms：应当先补片（head.appendChild 一个 script），再重绘 */
  const sh = shardFor(avail[0]);
  const before = box.innerHTML;
  sel.value = avail[0];
  if (sel._h) sel._h();
  ok(appended !== null, '⑥ 切到新语言触发补片', String(appended && appended.src));
  ok(appended && /\/i18n\/tnav-/.test(appended.src || ''), '⑥ 补的是 tnav 分片', appended && appended.src);
  /* 分片 onload 里把译文塞进 __TNAV__，再触发 render —— 这里模拟这一点 */
  if (sh && avail[0]) { w.__TNAV__[avail[0]] = sh; if (sel._h) sel._h(); }
  ok(box.innerHTML.indexOf(sh ? sh.tnMore : '@@') >= 0,
    '⑥ 补片后重绘出现该语言译文', sh ? sh.tnMore : '(无分片可测)');
}

console.log('\n========== 顶栏 100 语自检 ==========');
console.log('分片数：' + avail.length + ' / 73   逐语言校验：' + checked + ' 种');
console.log('pass ' + pass + '  fail ' + fail);
if (fails.length) { console.log('\n--- 失败 ---'); fails.slice(0, 40).forEach(f => console.log(f)); }
process.exit(fail ? 1 : 0);
