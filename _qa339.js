/* _qa339.js —— 用独立翻译引擎（Google clients5 端点）复核手写分片的准确性
 *
 * 为什么需要它：337 键是手写的，键齐、占位符对只能证明「结构没错」，
 * 证明不了「译文地道/正确」。这里用另一个引擎逐条重译，再与手写译文比对，
 * 把差异最大的条目挑出来人工复核。
 *
 * 用法：node _qa339.js bn ta kn        # 指定语言
 *       node _qa339.js --all           # 全部已有分片
 * 产物：_tr/ref-<lang>.json（引擎译文，可复用，不必重复请求）
 *
 * 注意：clients5 端点需要走代理；本机 127.0.0.1:7897 可用时自动带上。
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const DIR = __dirname;
const CORE = JSON.parse(fs.readFileSync(path.join(DIR, '_core338.json'), 'utf8'));
const KEYS = Object.keys(CORE);
const EN = KEYS.map(k => String(CORE[k].en));
const PROXY = process.env.QA_PROXY || 'http://127.0.0.1:7897';

const args = process.argv.slice(2);
let langs = args.filter(a => !a.startsWith('-'));
if (args.includes('--all') || !langs.length) {
  langs = fs.readdirSync(path.join(DIR, 'i18n'))
    .filter(f => /^ui-[a-z]{2,3}\.js$/.test(f))
    .map(f => f.slice(3, -3));
  if (args.includes('--all')) langs = ['ms', 'fil', 'fa', 'nb', 'sk', 'hu', 'ca', 'hr', 'sr', 'bg',
    'ur', 'bn', 'ta', 'te', 'mr', 'ne', 'si', 'my', 'km', 'lo', 'sw', 'gu', 'kn', 'ml', 'pa', 'or', 'as'];
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

function callGoogle(batch, tl) {
  const qs = batch.map(s => 'q=' + encodeURIComponent(s)).join('&');
  const url = 'https://clients5.google.com/translate_a/t?client=dict-chrome-ex&sl=en&tl=' + tl + '&' + qs;
  const out = execFileSync('curl', ['-s', '-m', '40', '-x', PROXY, url], { encoding: 'utf8', maxBuffer: 8 << 20 });
  let j;
  try { j = JSON.parse(out); } catch (e) { throw new Error('非 JSON 返回：' + out.slice(0, 120)); }
  if (Array.isArray(j) && j.length === 1 && Array.isArray(j[0])) j = j[0];   // 单条时是 ["x"] / [["x"]]
  return j.map(x => (Array.isArray(x) ? x[0] : String(x)));
}

function grams(s, n) {
  s = String(s).toLowerCase().replace(/\s+/g, ' ').trim();
  const g = new Set();
  for (let i = 0; i + n <= s.length; i++) g.add(s.slice(i, i + n));
  return g;
}
function jac(a, b, n) {
  const A = grams(a, n), B = grams(b, n);
  if (!A.size || !B.size) return 0;
  let inter = 0;
  for (const x of A) if (B.has(x)) inter++;
  return inter / (A.size + B.size - inter);
}

(async () => {
  for (const lang of langs) {
    const refPath = path.join(DIR, '_tr', 'ref-' + lang + '.json');
    let ref;
    if (fs.existsSync(refPath)) {
      ref = JSON.parse(fs.readFileSync(refPath, 'utf8'));
      if (ref.length !== EN.length) ref = null;
    }
    if (!ref) {
      ref = [];
      const B = 6;
      for (let i = 0; i < EN.length; i += B) {
        const batch = EN.slice(i, i + B);
        let got = null;
        for (let tryN = 0; tryN < 3 && !got; tryN++) {
          try {
            const r = callGoogle(batch, lang);
            if (r.length === batch.length) got = r;
            else await sleep(500);
          } catch (e) { await sleep(800); }
        }
        if (!got) {
          // 降级：逐条
          got = [];
          for (const s of batch) {
            let one = null;
            for (let t = 0; t < 3 && !one; t++) {
              try { const r = callGoogle([s], lang); one = r[0]; } catch (e) { await sleep(600); }
            }
            got.push(one || '');
          }
        }
        ref.push(...got);
        process.stderr.write('\r  ' + lang + ' ' + Math.min(i + B, EN.length) + '/' + EN.length);
        await sleep(120);
      }
      process.stderr.write('\n');
      fs.writeFileSync(refPath, JSON.stringify(ref, null, 1));
    }

    // 读手写分片
    const vm = require('vm');
    const ctx = { window: {} }; ctx.globalThis = ctx; vm.createContext(ctx);
    vm.runInContext(fs.readFileSync(path.join(DIR, 'site-i18n.js'), 'utf8') + ';globalThis.__I=I18N;', ctx);
    vm.runInContext(fs.readFileSync(path.join(DIR, 'i18n', 'ui-' + lang + '.js'), 'utf8'), ctx);
    const mine = ctx.__I[lang] || {};

    const rows = KEYS.map((k, i) => {
      const m = String(mine[k] === undefined ? '' : mine[k]);
      const g = String(ref[i] || '');
      const len = Math.min(m.length, g.length);
      return {
        i, k, m, g,
        w: len >= 10 ? jac(m, g, 3) : null,      // 短条目不参与相似度排序
        lr: g.length ? m.length / g.length : 1
      };
    });

    const scored = rows.filter(r => r.w !== null).sort((a, b) => a.w - b.w);
    const veryLow = scored.filter(r => r.w < 0.35);
    const low = scored.filter(r => r.w >= 0.35 && r.w < 0.55);
    const emptyish = rows.filter(r => r.m.trim().length === 0 || r.m === String(CORE[r.k].en));
    const suspicious = rows.filter(r => r.g.length > 12 && (r.lr < 0.45 || r.lr > 2.4));

    console.log('\n=== ' + lang + '  条目 ' + rows.length +
      ' | 相似度中位 ' + (scored.length ? scored[Math.floor(scored.length / 2)].w.toFixed(2) : '-') +
      ' | <0.35: ' + veryLow.length + ' | 0.35~0.55: ' + low.length +
      ' | 与英文同形: ' + emptyish.length + ' | 长度异常: ' + suspicious.length);

    const show = veryLow.slice(0, 12).concat(low.slice(0, 6));
    for (const r of show) {
      console.log('  [' + r.w.toFixed(2) + '] ' + r.k);
      console.log('       英: ' + String(CORE[r.k].en).slice(0, 110));
      console.log('       我: ' + r.m.slice(0, 110));
      console.log('       机: ' + r.g.slice(0, 110));
    }
    if (suspicious.length) {
      console.log('  -- 长度异常前 5 条:');
      for (const r of suspicious.slice(0, 5)) {
        console.log('     [' + r.lr.toFixed(2) + '×] ' + r.k + '  我(' + r.m.length + ')：' + r.m.slice(0, 70) + '  |  机(' + r.g.length + ')：' + r.g.slice(0, 70));
      }
    }
  }
})();
