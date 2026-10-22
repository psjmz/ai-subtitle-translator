/* _seolint.js —— 校验 _seo/<lang>.json 的译文质量（10 项检查）
 *
 * 为什么单开一份：SEO 文案跟界面文案的失败模式不同。界面看的是「标签短不短、术语一不一致」，
 * SEO 看的是「title 会不会被搜索引擎截断」「关键词条数有没有少」「数字有没有被本地化掉」。
 * 判据不同，就别硬塞进 _lint339.js。
 *
 * 用法：
 *   node _seolint.js            # 校验所有译文齐全的语言
 *   node _seolint.js ms         # 只校验指定语言
 *
 * 退出码：0 = 没有 ERR；1 = 有 ERR
 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const DIR = __dirname;
const OUT = path.join(DIR, '_seo');
const SRC = JSON.parse(fs.readFileSync(path.join(OUT, 'src.json'), 'utf8'));
const META = JSON.parse(fs.readFileSync(path.join(OUT, 'meta.json'), 'utf8'));
const KEYS = Object.keys(SRC);

const ctx = { window: {} }; ctx.globalThis = ctx; vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(DIR, 'site-i18n.js'), 'utf8') + ';globalThis.__U = UI_LANGS; globalThis.__27 = UI27;', ctx);
const NEW = ctx.__U.filter(x => ctx.__27.indexOf(x[0]) < 0);

/* 只有粤语用汉字；其余新语言出现汉字就是音译/串台 */
const CJK_OK = ['yue', 'ja', 'ko'];
const HAN = /[\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF]/;
/* 绝不能被翻译掉的品牌与工具名 */
const BRAND = ['AI-SRTSub', 'RiseKol', 'OpenAI', 'GitHub', 'YouTube', 'Bilibili', 'Douyin', 'Netflix', 'SRT', 'VTT', 'ASS', 'SBV', 'TXT', 'WebVTT', 'API', 'URL'];
/* 数字（含 15+、0.5 这种），必须与英文源一致。
   ⚠️ JS 的 \d 只认 ASCII 0-9。波斯语 ۱۰۰、阿拉伯语 ١٠٠、梵文 १०० 都是合法本地写法，
      不归一化就会误报「数字不一致」，之前 fa 三条卡死整条流水线就是这么来的。
      所以比较前先按各语种数字块归一化成 ASCII。 */
const NUM = /\d+(?:\.\d+)?/g;   /* 不带 \+?，理由见 _gemseo.js 的 numOk */
const DIGIT_BASES = [
  0x0660, 0x06F0, 0x07C0, 0x0966, 0x09E6, 0x0A66, 0x0AE6, 0x0B66, 0x0BE6,
  0x0C66, 0x0CE6, 0x0D66, 0x0E50, 0x0ED0, 0x0F20, 0x1040, 0x17E0, 0x1810,
  0x1A80, 0x1A90, 0x1B50, 0x1BB0, 0x1C40, 0x1C50, 0xA620, 0xA8D0, 0xA900,
  0xA9D0, 0xA9F0, 0xAA50, 0xABF0, 0xFF10, 0x10E60, 0x11066, 0x110F0, 0x11136,
  0x111D0, 0x112F0, 0x11450, 0x114D0, 0x11650, 0x116C0, 0x11730, 0x118E0,
  0x11950, 0x11C50, 0x11D50, 0x11DA0, 0x16A60, 0x16B50, 0x1D7CE, 0x1E950
];
const DMAP = {};
for (const b of DIGIT_BASES) for (let d = 0; d < 10; d++) DMAP[String.fromCodePoint(b + d)] = String(d);
function asciiDigits(s) {
  let out = '';
  for (const ch of String(s)) { const d = DMAP[ch]; out += d === undefined ? ch : d; }
  return out;
}

let ERR = 0, WARN = 0;
const errs = [], warns = [];

function check(lang, tr) {
  const L = [];
  const e = (k, msg) => { L.push('  ERR ' + k + '：' + msg); errs.push(lang + ' ' + k + '：' + msg); ERR++; };
  const w = (k, msg) => { L.push('  WARN ' + k + '：' + msg); warns.push(lang + ' ' + k + '：' + msg); WARN++; };

  for (const k of KEYS) {
    const en = String(SRC[k]);
    if (!(k in tr)) { e(k, '缺条目'); continue; }
    const v = String(tr[k]);
    if (!v.trim()) { e(k, '译文为空'); continue; }

    /* A 漏译：整条与英文源一模一样（小语种照抄就是没翻） */
    if (v.trim() === en.trim() && !/^[\d\s\W]+$/.test(en)) w(k, '与英文源完全相同（疑似漏译）');

    /* B 占位符 */
    const pa = (en.match(/\{\d\}/g) || []).sort().join(',');
    const pb = (v.match(/\{\d\}/g) || []).sort().join(',');
    if (pa !== pb) e(k, '占位符不一致 ' + pa + ' → ' + pb);

    /* C 强调标记配对。两边都是原始 <tag>（译文入库前已 unesc），
       所以这里也必须查 <tag>；查 «tag» 会两边都 0 命中、检查失效。 */
    const TRE = /<\/?(strong|b|em)>/g;
    const ta = (en.match(TRE) || []).sort().join(',');
    const tb = (v.match(TRE) || []).sort().join(',');
    if (ta !== tb) e(k, '强调标记不一致 ' + ta + ' → ' + tb);

    /* D 数字必须对得上（100 种语言、15+、32 这类是事实） */
    const na = (asciiDigits(en).match(NUM) || []).join(','), nb = (asciiDigits(v).match(NUM) || []).join(',');
    if (na !== nb) e(k, '数字不一致 [' + na + '] → [' + nb + ']');

    /* E 品牌词保留 */
    for (const b of BRAND) {
      const re = new RegExp('\\b' + b.replace(/[-]/g, '\\-') + '\\b');
      if (re.test(en) && !re.test(v)) {
        /* 允许译文中出现本地化的等价说法，只提示不判死 */
        w(k, '品牌词 ' + b + ' 未在译文中出现');
      }
    }

    /* F 长度约束：按键名后缀判定 */
    const f = META[k].field;
    const n = v.length;
    if (f === 'title' && (n < 10 || n > 80)) e(k, 'title 长度 ' + n + ' 超出 10~80');
    if ((f === 'desc' || f === 'ogDesc') && (n < 40 || n > 350)) e(k, f + ' 长度 ' + n + ' 超出 40~350');

    /* G 关键词条数必须与英文源一致 */
    if (f === 'kw') {
      const a = en.split(',').length, b = v.split(',').length;
      if (a !== b) e(k, '关键词条数 ' + a + ' → ' + b);
      if (/\s*,\s+|\s+,\s*/.test(v)) w(k, '关键词逗号周围有多余空格');
    }

    /* H 非中日韩语言不得混入汉字 */
    if (CJK_OK.indexOf(lang) < 0 && HAN.test(v)) e(k, '译文混入汉字：' + (v.match(HAN) || []).join(''));

    /* I 句末标点：正文段落要有收尾，别被模型截断 */
    if (/__(intro|feat|who)$/.test(k) || /__copy_(seoIntro|seoFeatures|seoWho|seoNoscript)$/.test(k)) {
      if (!/[.。!?！？：:؛?]\s*$/.test(v)) w(k, '句末没有收尾标点（疑似被截断）');
    }

    /* J 残留英文提示词污染 */
    if (/^(KEY ::|Translated text|---)/i.test(v)) e(k, '译文里混进了提示词格式');
  }
  return L;
}

function main() {
  const args = process.argv.slice(2);
  const only = args.filter(a => !a.startsWith('--'));
  let n = 0;
  for (const [code, native] of NEW) {
    if (only.length && only.indexOf(code) < 0) continue;
    const p = path.join(OUT, code + '.json');
    if (!fs.existsSync(p)) continue;
    const tr = JSON.parse(fs.readFileSync(p, 'utf8'));
    const lines = check(code, tr);
    n++;
    if (lines.length) { console.log('\n[' + code + '] ' + native); lines.forEach(x => console.log(x)); }
  }
  console.log('\n========== 汇总 ==========');
  console.log('已校验语言：' + n);
  console.log('ERR ' + ERR + ' / WARN ' + WARN);
  if (errs.length) { console.log('\n--- ERR 明细（前 40 条）---'); errs.slice(0, 40).forEach(x => console.log('  ' + x)); }
  process.exit(ERR ? 1 : 0);
}
main();
