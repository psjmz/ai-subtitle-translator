/* _mk_tnav.js —— 生成顶栏分片 i18n/tnav-<lang>.js（v0.9.339 起，非交付件）
 *
 * 为什么单独一套分片：site-topnav.js 刻意做成「自包含零依赖」（不引 site-i18n.js），
 * 好让 15 个工具页在没有 1.6MB 主词典的情况下也能出顶栏。它的三张词典（工具名 /
 * 一句话描述 / 手写键）不在 ui-<lang>.js 的 337 键核心集里，所以 339 扩 100 语时漏了。
 * 补翻的 36 个键按语言单独成片，文件名 tnav-<lang>.js，由 site-topnav.js 同步注入。
 *
 * 复用键：navGuide / tcClD 在 ui-<lang>.js 里已经有译文（同一英文源），
 *   直接从那个分片里抠出来用 —— 重翻一次就会跟页面里其它位置的同一词条对不上。
 *
 * 用法：
 *   node _mk_tnav.js            # 生成所有 _trnav/*.json 对应的分片
 *   node _mk_tnav.js ms         # 只生成指定语言
 *
 * 输入：_trnav/<lang>.json（36 键，由 _gemnav.js 产出）
 * 输出：i18n/tnav-<lang>.js
 * 跑完接着：node _chktnav.js
 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const DIR = __dirname;
const NAV = JSON.parse(fs.readFileSync(path.join(DIR, '_navsrc.json'), 'utf8'));
const KEYS = NAV.keys.slice();          /* 36 个待翻键 */
const REUSE = NAV.reuse.slice();        /* ['navGuide','tcClD'] —— 从 ui 分片抠 */
const ALL = NAV.all.slice();            /* 38 键 = 36 + 2 */

/* 语言名（母语自称 / 英文名）：与 _gem339.js 同一套来源 */
const ctx = { window: {} };
ctx.globalThis = ctx;
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(DIR, 'site-i18n.js'), 'utf8') +
  ';globalThis.__U = UI_LANGS; globalThis.__27 = UI27;', ctx);
const UI_LANGS = ctx.__U, UI27 = ctx.__27;
const NATIVE = {};
for (const x of UI_LANGS) NATIVE[x[0]] = x[1];

const tl = fs.readFileSync(path.join(DIR, 'translate.html'), 'utf8');
const lb = tl.indexOf('const LANGS = [');
const tlSeg = tl.slice(lb, tl.indexOf('];', lb));
const EN_NAME = {};
{
  const re = /\{\s*v\s*:\s*'([^']+)'[\s\S]*?en\s*:\s*'([^']*)'/g;
  let m; while ((m = re.exec(tlSeg))) EN_NAME[m[1]] = m[2];
}

/* 从 ui-<lang>.js 里抠出复用键的译文。
   为什么用 vm 而不是正则：译文里可能有转义引号，正则容易切错。 */
function reuseFrom(lang) {
  const f = path.join(DIR, 'i18n', 'ui-' + lang + '.js');
  if (!fs.existsSync(f)) return null;
  /* ⚠️ 必须先造好 SiteI18N：ui-<lang>.js 的开头是
       var I = window.SiteI18N && window.SiteI18N.I18N; if (!I) return;
     不预置这个对象，分片会静默 return，复用键一条都取不到（实测 75 种全军覆没）。 */
  const c = { window: { SiteI18N: { I18N: {} } } };
  c.globalThis = c;
  vm.createContext(c);
  vm.runInContext(fs.readFileSync(f, 'utf8'), c);
  const I = c.window.SiteI18N && c.window.SiteI18N.I18N;
  const blk = I && I[lang];
  if (!blk) return null;
  const out = {};
  for (const k of REUSE) {
    if (!blk[k]) return null;           /* 缺一个就整片不做，宁可回落英文也不半吊子 */
    out[k] = String(blk[k]);
  }
  return out;
}

const esc = s => String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'");

/* 单条译文体检：空 / 占位符 / 标签 / 汉字混入 */
const CJK = /[\u4e00-\u9fff\u3040-\u30ff\uac00-\ud7af]/;
function bad(lang, k, v) {  if (!v || !String(v).trim()) return '空值';
  const s = String(v);
  const a = (String(NAV.en[k]).match(/\{\d\}/g) || []).sort().join(',');
  const b = (s.match(/\{\d\}/g) || []).sort().join(',');
  if (a !== b) return '占位符不一致（源 ' + (a || '无') + ' / 译文 ' + (b || '无') + '）';
  const ta = (String(NAV.en[k]).match(/<\/?(b|em)>/g) || []).sort().join(',');
  const tb = (s.match(/<\/?(b|em)>/g) || []).sort().join(',');
  if (ta !== tb) return '标签不一致';
  /* 非中日韩语言不该出现汉字（模型偷懒直接抄中文是常见失败模式） */
  if (!/^(zh|ja|ko|yue|wuu|nan|hak|lzh)/.test(lang) && CJK.test(s)) return '混入汉字';
  return null;
}

/* 混字检查：一条译文里同时出现两种文字系统的字母就是本机翻坏了的信号
   （藏文里一个阿拉伯字母 ف、阿姆哈拉文里一个格鲁吉亚词 მთელ …… 肉眼几乎看不出来，
     母语者一眼就是乱码）。判据与 _mixed.js / _gemclean.js 同源。 */
const scriptsOf = require('./_mixed.js').scriptsOf;
function mixed(lang, block) {
  const vote = {};
  for (const k of ALL) for (const s of scriptsOf(String(block[k] || ''))) vote[s] = (vote[s] || 0) + 1;
  const main = Object.keys(vote).sort((a, b) => vote[b] - vote[a])[0];
  if (!main) return { main: 'Latin', rows: [] };
  if (/^(zh|ja|ko|yue)/.test(lang)) return { main, rows: [] };   /* 中日韩本就混用假名/汉字，不查 */
  const rows = [];
  for (const k of ALL) {
    const v = String(block[k] || '');
    if (!v) continue;
    for (const s of scriptsOf(v)) {
      if (s === main) continue;
      if (s === 'Latin' && main !== 'Latin') continue;   /* Batch / MP4 这类借词正常 */
      rows.push(k + ' 混入 ' + s + '：' + v);
      break;
    }
  }
  return { main, rows };
}

const only = process.argv[2];
const langs = only ? [only] :
  fs.readdirSync(path.join(DIR, '_trnav'))
    .filter(f => /\.json$/.test(f))
    /* 排除辅助文件（_fix / _groups 这类），否则会被当成一种语言去翻译 */
    .filter(f => !/^_/.test(f))
    .map(f => f.replace(/\.json$/, ''))
    .sort();

let ok = 0, fail = 0;
const problems = [], warn = [];
for (const lang of langs) {
  const src = path.join(DIR, '_trnav', lang + '.json');
  if (!fs.existsSync(src)) { console.log('· ' + lang + ' 没有 _trnav/' + lang + '.json，跳过'); continue; }
  const tr = JSON.parse(fs.readFileSync(src, 'utf8'));

  /* 27 内置语言不需要分片（site-topnav.js 里已有三张表） */
  if (UI27.indexOf(lang) >= 0) { console.log('· ' + lang + ' 是内置 27 语，不需要分片'); continue; }

  const block = {};
  let bads = [];
  for (const k of KEYS) {
    const v = tr[k];
    if (v === undefined) { bads.push(k + ' 缺条'); continue; }
    const why = bad(lang, k, String(v));
    if (why) { bads.push(k + '：' + why); continue; }
    block[k] = String(v);
  }
  const rz = reuseFrom(lang);
  if (!rz) bads.push('复用键取不到（ui-' + lang + '.js 缺失或不含 ' + REUSE.join('/') + '）');
  else for (const k of REUSE) block[k] = rz[k];

  /* 混字必须硬失败：这是唯一一条「错的比漏翻还难发现」的判据 */
  const mx = mixed(lang, block);
  for (const r of mx.rows) bads.push(r);

  /* 软检查（不阻断，只提示）：菜单名过长、或整条照抄英文。
     照抄英文在小语种里是正常现象（Batch / Table 这类词本来就借自英语），
     所以只统计不判失败 —— 一条语言里超过一半照抄才值得怀疑。 */
  let sameAsEn = 0;
  for (const k of KEYS) {
    const v = String(block[k] || tr[k] || '');
    if (NAV.en[k] && v.trim() === String(NAV.en[k]).trim()) sameAsEn++;
  }
  if (sameAsEn > KEYS.length / 2) warn.push('⚠ ' + lang + '：' + sameAsEn + '/' + KEYS.length + ' 条与英文完全相同，疑似没翻');
  for (const k of KEYS) {
    if (!/^(nav|tn)/.test(k)) continue;
    const v = String(block[k] || '');
    if (v.length > 28) warn.push('⚠ ' + lang + '.' + k + ' 菜单名偏长（' + v.length + ' 字符）：' + v.slice(0, 40));
  }

  if (bads.length) {
    fail++;
    problems.push('✗ ' + lang + '：' + bads.join('；'));
    continue;
  }

  const body = ALL.map(k => '    ' + k + ": '" + esc(block[k]) + "'").join(',\n');
  const out = `/* i18n/tnav-${lang}.js —— 顶栏文案（${NATIVE[lang] || lang} / ${EN_NAME[lang] || lang}），v0.9.339 起。
 *
 * 为什么单独一份：site-topnav.js 的三张词典（工具名 / 一句话描述 / 手写键）
 * 不在 ui-${lang}.js 的 337 键核心集里，只能单独补翻。本片由 site-topnav.js
 * 用 document.write 同步注入（27 个内置语言不发这个请求）。
 *
 * 本文件由 _mk_tnav.js 依据 _trnav/${lang}.json 生成，键序与 _navsrc.json 一致。
 * 其中 ${REUSE.join(' / ')} 直接取 ui-${lang}.js 的既有译文（同一英文源，不重翻）。
 * 改译文请改 _trnav/${lang}.json 后重新生成，不要直接手改这里（下次生成会被覆盖）。
 */
(function () {
  var T = window.__TNAV__;
  if (!T) return;
  T['${lang}'] = {
${body}
  };
})();
`;
  fs.writeFileSync(path.join(DIR, 'i18n', 'tnav-' + lang + '.js'), out);
  ok++;
  console.log('✓ tnav-' + lang + '.js（' + ALL.length + ' 键，' + Buffer.byteLength(out) + ' 字节）');
}

console.log('\n生成 ' + ok + ' 个，失败 ' + fail + ' 个');
if (problems.length) { console.log('\n--- 问题 ---'); problems.forEach(p => console.log(p)); }
if (warn.length) { console.log('\n--- 提示 ---'); warn.slice(0, 30).forEach(p => console.log(p)); }
