/* _navsrc.js —— 抽取顶栏待翻源（非交付件）
 *
 * 背景：site-topnav.js 里的三张词典 N（工具名）/ D（工具描述）/ T（手写键）只有 27 语。
 * 339 把界面语言扩到 100 语后，剩下 73 种语言的顶栏全部回落英文 —— 本次要补的就是这个。
 *
 * 为什么单独抽源：site-topnav.js 是自包含零依赖的（刻意不引 site-i18n.js，
 * 好让 15 个工具页也能用），不能用 vm 直接 require。这里把源码里的三张表抠出来。
 *
 * 输出：
 *   _navsrc.json —— { keys: [...], en: { key: 'English' }, ref: { 'zh-CN': {...}, ... } }
 *     · en   是翻译源（唯一权威）
 *     · ref  是 27 语既有译文，只作参考 / 校验，不参与生成
 *
 * 跑法：node _navsrc.js
 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const DIR = __dirname;
let src = fs.readFileSync(path.join(DIR, 'site-topnav.js'), 'utf8');

/* 把 IIFE 内部的三个局部变量暴露出来：占位行是文件末尾那句 w.SiteTopNav = {...} */
const MARK = '  w.SiteTopNav = ';
if (src.indexOf(MARK) < 0) throw new Error('找不到暴露点：' + MARK);
src = src.replace(MARK, '  globalThis.__N = N; globalThis.__D = D; globalThis.__T = T;\n' + MARK);

/* 给 IIFE 造一个最小 document/window：顶层的 boot() 会因为 readyState 走 else 分支，
   内部 render() 找不到 #topNav 就直接 return，不会碰真 DOM。 */
const ctx = {
  document: {
    readyState: 'complete', currentScript: null,
    getElementById: () => null, addEventListener: () => {},
    createElement: () => ({ setAttribute() {}, appendChild() {} }),
    /* render() 里 injectCss() 排在 getElementById('topNav') 之前，head 不能是 null */
    head: { appendChild() {} }, body: { appendChild() {} },
    documentElement: { getAttribute: () => null }
  },
  navigator: { language: 'en' },
  location: { pathname: '/' },
  console
};
ctx.window = ctx;
ctx.globalThis = ctx;
vm.createContext(ctx);
vm.runInContext(src, ctx);

const N = ctx.__N, D = ctx.__D, T = ctx.__T;
if (!N || !D || !T) throw new Error('三张表没抠出来');

/* 顶栏实际用到的键（照 site-topnav.js 的 TOOLS / GROUPS / EXT 推出来的全集） */
const NAME_KEYS = ['navTr', 'navGuide', 'navFx', 'navCv', 'navTbl', 'navHc', 'navSp', 'navSplt',
  'navSh', 'navCl', 'navLrc', 'navEx', 'navVs', 'navRp', 'navGl', 'navBt', 'navQc'];
const DESC_KEYS = ['tcCvD', 'tcTbD', 'tcHcD', 'tcBiD', 'tcSpD', 'tcShD', 'tcLrD',
  'tcExD', 'tcVsD', 'tcRpD', 'tcGlD', 'tcBtD', 'tcQcD'];
const MY_KEYS = ['tnVd', 'tnMore', 'tnG1', 'tnG2', 'tnG3', 'tnG4', 'tnAll'];
/* 这个键 ui-<lang>.js 分片里已经有了（337 键核心集内），直接复用它的译文，不重翻：
   重翻一次就会跟页面里其它地方的同一词条对不上（比如首页指南入口）。
   ⚠️ navGuide 原本也在复用名单里，后来移出去了：顶栏用的是复数口径
      （en 'Guides' / es 'Guías'），而 ui 分片里是单数（en 'Guide'），
      两处口径不一致，只能单独翻一遍。 */
const REUSE = ['tcClD'];

const KEYS = NAME_KEYS.concat(DESC_KEYS, MY_KEYS);

const en = {}, ref = {};
for (const k of KEYS) {
  const from = NAME_KEYS.indexOf(k) >= 0 ? N : (DESC_KEYS.indexOf(k) >= 0 ? D : T);
  if (!from.en || !from.en[k]) throw new Error('en 缺 ' + k);
  en[k] = String(from.en[k]);
}
for (const l of Object.keys(N)) {
  ref[l] = {};
  for (const k of KEYS) {
    const from = NAME_KEYS.indexOf(k) >= 0 ? N : (DESC_KEYS.indexOf(k) >= 0 ? D : T);
    if (from[l] && from[l][k]) ref[l][k] = String(from[l][k]);
  }
  for (const k of REUSE) ref[l][k] = '';
}

const out = { keys: KEYS, reuse: REUSE, all: KEYS.concat(REUSE), en, ref };
fs.writeFileSync(path.join(DIR, '_navsrc.json'), JSON.stringify(out, null, 1));

/* 顺手体检：27 语里有多少条还停在英文（漏译），这些不归本次管，但要心里有数 */
let fallback = 0;
for (const l of Object.keys(ref)) {
  if (l === 'en') continue;
  for (const k of KEYS) if (!ref[l][k]) fallback++;
}
console.log('待翻键：' + KEYS.length + '（工具名 ' + NAME_KEYS.length +
  ' / 描述 ' + DESC_KEYS.length + ' / 手写 ' + MY_KEYS.length + '）');
console.log('复用键：' + REUSE.join(',') + '（取 ui-<lang>.js 已有译文）');
console.log('27 语里仍是英文的条数：' + fallback);
for (const k of KEYS) if (fallback && !ref['ja'][k]) console.log('  例：ja.' + k);
console.log('已写 _navsrc.json');
