/* _bt339.js —— 回译验证（back-translation）：判断手写译文是否「意思对」
 *
 * 思路：把 _tr/<lang>.txt 的每条译文用独立引擎翻回英文，再与 _core338.json 的
 * 英文源比对。措辞不同不影响（都是英文），语义错、词义错、语法错会直接暴露。
 * 这是翻译行业标准的 QA 手段，比「正向比对两种译文」可靠得多。
 *
 * 用法：node _bt339.js bn ta kn
 * 产物：_tr/bt-<lang>.json
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const vm = require('vm');

const DIR = __dirname;
const CORE = JSON.parse(fs.readFileSync(path.join(DIR, '_core338.json'), 'utf8'));
const KEYS = Object.keys(CORE);
const PROXY = process.env.QA_PROXY || 'http://127.0.0.1:7897';
const langs = process.argv.slice(2);
if (!langs.length) { console.error('用法：node _bt339.js <lang> [lang...]'); process.exit(2); }

const sleep = ms => new Promise(r => setTimeout(r, ms));

function callGoogle(batch, sl, tl) {
  const qs = batch.map(s => 'q=' + encodeURIComponent(s)).join('&');
  const url = 'https://clients5.google.com/translate_a/t?client=dict-chrome-ex&sl=' + sl + '&tl=' + tl + '&' + qs;
  const out = execFileSync('curl', ['-s', '-m', '40', '-x', PROXY, url], { encoding: 'utf8', maxBuffer: 8 << 20 });
  let j;
  try { j = JSON.parse(out); } catch (e) { throw new Error('非 JSON：' + out.slice(0, 100)); }
  if (Array.isArray(j) && j.length === 1 && Array.isArray(j[0])) j = j[0];
  return j.map(x => (Array.isArray(x) ? x[0] : String(x)));
}

const STOP = new Set(('a an the is are was were be been being of to in on at for with and or but if then ' +
  'this that these those it its as by from you your we our they their he she his her not no yes do does did ' +
  'can will may should would could has have had will just only also so than too very more most').split(' '));
function toks(s) {
  return String(s).toLowerCase().replace(/<[^>]+>/g, ' ').replace(/[^\p{L}\p{N}]+/gu, ' ')
    .split(' ').filter(w => w && !STOP.has(w));
}
function overlap(a, b) {
  const A = new Set(toks(a)), B = new Set(toks(b));
  if (!A.size || !B.size) return 0;
  let i = 0; for (const x of A) if (B.has(x)) i++;
  return i / Math.max(A.size, B.size);
}
function norm(s) { return String(s).toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').trim(); }

(async () => {
  for (const lang of langs) {
    const ctx = { window: {} }; ctx.globalThis = ctx; vm.createContext(ctx);
    vm.runInContext(fs.readFileSync(path.join(DIR, 'site-i18n.js'), 'utf8') + ';globalThis.__I=I18N;', ctx);
    vm.runInContext(fs.readFileSync(path.join(DIR, 'i18n', 'ui-' + lang + '.js'), 'utf8'), ctx);
    const mine = ctx.__I[lang] || {};
    const src = KEYS.map(k => String(mine[k] === undefined ? CORE[k].en : mine[k]));

    const btPath = path.join(DIR, '_tr', 'bt-' + lang + '.json');
    let bt = null;
    if (fs.existsSync(btPath)) { bt = JSON.parse(fs.readFileSync(btPath, 'utf8')); if (bt.length !== src.length) bt = null; }
    if (!bt) {
      bt = [];
      const B = 6;
      for (let i = 0; i < src.length; i += B) {
        const batch = src.slice(i, i + B);
        let got = null;
        for (let t = 0; t < 3 && !got; t++) {
          try { const r = callGoogle(batch, lang, 'en'); if (r.length === batch.length) got = r; else await sleep(400); }
          catch (e) { await sleep(700); }
        }
        if (!got) {
          got = [];
          for (const s of batch) {
            let one = null;
            for (let t = 0; t < 3 && !one; t++) {
              try { const r = callGoogle([s], lang, 'en'); one = r[0]; } catch (e) { await sleep(500); }
            }
            got.push(one || '');
          }
        }
        bt.push(...got);
        process.stderr.write('\r  ' + lang + ' 回译 ' + Math.min(i + B, src.length) + '/' + src.length);
        await sleep(110);
      }
      process.stderr.write('\n');
      fs.writeFileSync(btPath, JSON.stringify(bt, null, 1));
    }

    const rows = KEYS.map((k, i) => {
      const en = String(CORE[k].en);
      const back = String(bt[i] || '');
      return { k, en, mine: src[i], back, sc: overlap(en, back), len: norm(back).length };
    });
    // 短条目的回译本来就靠猜（"Size"→"Size" 之外的同义词），只看长一点的
    const judged = rows.filter(r => norm(r.en).length >= 8 || String(CORE[r.k].en).length >= 14);
    const bad = judged.filter(r => r.sc < 0.30).sort((a, b) => a.sc - b.sc);
    const weak = judged.filter(r => r.sc >= 0.30 && r.sc < 0.5);

    console.log('\n=== ' + lang + ' | 可判条目 ' + judged.length +
      ' | 回译偏离大(<0.30): ' + bad.length + ' | 偏弱(0.30~0.50): ' + weak.length +
      ' | 中位重合约 ' + (judged.length ? judged.map(r => r.sc).sort((a, b) => a - b)[Math.floor(judged.length / 2)].toFixed(2) : '-'));
    for (const r of bad.slice(0, 14)) {
      console.log('  [' + r.sc.toFixed(2) + '] ' + r.k);
      console.log('       源: ' + r.en.slice(0, 100));
      console.log('       我: ' + r.mine.slice(0, 100));
      console.log('       回: ' + r.back.slice(0, 100));
    }
  }
})();
