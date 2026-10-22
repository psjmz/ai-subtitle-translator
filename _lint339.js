/* _lint339.js —— 界面语言分片的「内容层」体检（v0.9.339）
 *
 * 为什么需要：_chkshard.js 只验结构（键齐、占位符、标签），验不出
 * 「译错了 / 漏译 / 整段错位 / 数字丢了」。这里补内容层检查。
 *
 * 用法：node _lint339.js            # 全部已有分片
 *       node _lint339.js bn ta      # 指定语言
 *
 * 检查项（ERR = 必须修；WARN = 需人工判断）：
 *   A 漏译：译文与英文完全相同（排除专名/纯符号）
 *   B 长度异常：译文 < 英文 34% 或 > 250%（英文 ≥ 18 字符）
 *   C 数字不一致：英文里的数字在译文里找不到（含阿拉伯-印度数字折算）
 *   D 品牌/技术锚点：macOS/Windows/YouTube/… 缺失或多出
 *   E 句末标点：英文以句号结尾而译文没有
 *   F 括号配对
 *   G 中日韩字符混入（非 zh/ja/ko/yue 语言）
 *   H 错位：与相邻条目的机器译文更像（需 _tr/ref-<lang>.json）
 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const DIR = __dirname;
const CORE = JSON.parse(fs.readFileSync(path.join(DIR, '_core338.json'), 'utf8'));
const KEYS = Object.keys(CORE);
const CJK_OK = new Set(['zh-CN', 'zh-TW', 'yue', 'ja', 'ko']);
const ANCH = ['macOS', 'Windows', 'YouTube', 'Bilibili', 'Douyin', 'RiseKol', 'Netflix',
  'GitHub', 'OpenAI', 'AGPL', 'SRT', 'VTT', 'SBV', 'WebVTT', 'ASR', 'SDH', 'HTML', 'CJK'];
/* 各语言的句末标点。缺哪个语言就会把正确的译文误报成「句末缺标点」
   （am 阿姆哈拉语一次误报 44 条就是漏了 ። 埃塞俄比亚句号）。
   ។ 高棉  ៕ 高棉问号  ። 埃塞俄比亚句号  ፧ 埃塞俄比亚问号  ፥ 埃塞俄比亚分号
   ։ 亚美尼亚句号  ՜ 亚美尼亚感叹号  ៕ 高棉  ។ 高棉 */
const END = /[.!?…।॥។៕።፧፥։՜؍۔]$/;
const NUM_MAP = { '٠': '0', '١': '1', '٢': '2', '٣': '3', '٤': '4', '٥': '5', '٦': '6', '٧': '7', '٨': '8', '٩': '9',
  '۰': '0', '۱': '1', '۲': '2', '۳': '3', '۴': '4', '۵': '5', '۶': '6', '۷': '7', '۸': '8', '۹': '9',
  '०': '0', '१': '1', '२': '2', '३': '3', '४': '4', '५': '5', '६': '6', '७': '7', '८': '8', '९': '9' };

const args = process.argv.slice(2).filter(a => !a.startsWith('-'));
let langs = args.length ? args : fs.readdirSync(path.join(DIR, 'i18n'))
  .filter(f => /^ui-[a-z]{2,3}\.js$/.test(f)).map(f => f.slice(3, -3)).sort();

const nums = s => (String(s).replace(/[٠-٩۰-۹०-९]/g, c => NUM_MAP[c] || c).match(/\d+/g) || []).sort().join(',');
const hasCJK = s => /[\u4e00-\u9fff\u3040-\u30ff\uac00-\ud7af]/.test(s);

let ERR = 0, WARN = 0;
const out = [];

for (const lang of langs) {
  const js = path.join(DIR, 'i18n', 'ui-' + lang + '.js');
  if (!fs.existsSync(js)) { console.log('跳过（无分片）：' + lang); continue; }
  const ctx = { window: {} }; ctx.globalThis = ctx; vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(path.join(DIR, 'site-i18n.js'), 'utf8') + ';globalThis.__I=I18N;', ctx);
  vm.runInContext(fs.readFileSync(js, 'utf8'), ctx);
  const d = ctx.__I[lang] || {};

  const errs = [], warns = [];
  for (const k of KEYS) {
    const en = String(CORE[k].en);
    const v = String(d[k] === undefined ? en : d[k]);
    const tag = lang + ' ' + k;

    /* A 漏译 */
    if (v === en && /[a-z]{4,}/i.test(en) && en.length >= 14) errs.push('A 漏译 ' + tag + ' :: ' + en.slice(0, 50));
    /* B 长度 */
    if (en.length >= 18) {
      if (v.length && v.length < en.length * 0.34) warns.push('B 过短 ' + tag + ' (' + v.length + '/' + en.length + ') :: ' + v.slice(0, 40));
      if (v.length > en.length * 2.5) warns.push('B 过长 ' + tag + ' (' + v.length + '/' + en.length + ')');
    }
    /* C 数字 */
    if (nums(en) !== nums(v)) warns.push('C 数字 ' + tag + ' 英[' + nums(en) + '] 译[' + nums(v) + ']');
    /* D 锚点 */
    const miss = ANCH.filter(a => en.indexOf(a) >= 0 && v.indexOf(a) < 0);
    const extra = ANCH.filter(a => v.indexOf(a) >= 0 && en.indexOf(a) < 0);
    if (miss.length) warns.push('D 缺锚点 ' + tag + ' [' + miss.join(',') + ']');
    if (extra.length) errs.push('D 多锚点（疑似错位）' + tag + ' [' + extra.join(',') + ']');
    /* E 句末 */
    if (en.length > 40 && /[.!?…]$/.test(en) && v.trim() && !END.test(v.trim())) warns.push('E 句末 ' + tag);
    /* F 括号 */
    if ((en.match(/\(/g) || []).length - (en.match(/\)/g) || []).length !==
        (v.match(/\(/g) || []).length - (v.match(/\)/g) || []).length) errs.push('F 括号 ' + tag);
    /* G 中日韩 */
    if (!CJK_OK.has(lang) && hasCJK(v)) errs.push('G 混入中日韩 ' + tag + ' :: ' + v.slice(0, 40));
  }

  /* H 错位检测 */
  const refPath = path.join(DIR, '_tr', 'ref-' + lang + '.json');
  if (fs.existsSync(refPath)) {
    const ref = JSON.parse(fs.readFileSync(refPath, 'utf8'));
    if (ref.length === KEYS.length) {
      const grams = (s, n) => { s = String(s).toLowerCase(); const S = new Set(); for (let i = 0; i + n <= s.length; i++) S.add(s.slice(i, i + n)); return S; };
      const jac = (a, b) => { const A = grams(a, 3), B = grams(b, 3); if (!A.size || !B.size) return 0; let i = 0; for (const x of A) if (B.has(x)) i++; return i / (A.size + B.size - i); };
      for (let i = 0; i < KEYS.length; i++) {
        const mine = String(d[KEYS[i]] === undefined ? CORE[KEYS[i]].en : d[KEYS[i]]);
        /* ⚠️ 门槛按「英文源」长度算，不按译文：短标签（Apply / Top / Delete）
           只有一两个词，字符 trigram 相似度完全是噪声 —— 实测把两条正确译文
           误判成错位。英文 ≥ 25 字符才查。 */
        if (String(CORE[KEYS[i]].en).length < 25) continue;
        const self = jac(mine, ref[i] || '');
        const nb = [];
        if (i > 0) nb.push(jac(mine, ref[i - 1] || ''));
        if (i < KEYS.length - 1) nb.push(jac(mine, ref[i + 1] || ''));
        const best = Math.max(...nb, 0);
        if (best > self + 0.25 && best > 0.45) {
          errs.push('H 疑似错位 ' + lang + ' ' + KEYS[i] + '（与相邻条更吻合 ' + best.toFixed(2) + ' vs ' + self.toFixed(2) + '）');
        }
      }
    }
  }

  ERR += errs.length; WARN += warns.length;
  out.push({ lang, errs, warns });
  if (errs.length || warns.length) {
    console.log('\n[' + lang + '] ERR ' + errs.length + ' / WARN ' + warns.length);
    errs.slice(0, 12).forEach(x => console.log('   ✗ ' + x));
    warns.slice(0, 6).forEach(x => console.log('   ! ' + x));
    if (warns.length > 6) console.log('   … 另有 ' + (warns.length - 6) + ' 条 WARN');
  } else {
    console.log('✓ ' + lang + '  内容检查通过');
  }
}

console.log('\n' + langs.length + ' 份：ERR ' + ERR + ' / WARN ' + WARN);
process.exit(ERR ? 1 : 0);
