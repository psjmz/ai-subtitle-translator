/* _chk339.js —— 逐键对照「英文源 / 我的译文 / 机器译文」，用于人工裁决疑似错位
 * 用法：node _chk339.js mr lblMaxWShort
 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const DIR = __dirname;
const CORE = JSON.parse(fs.readFileSync(path.join(DIR, '_core338.json'), 'utf8'));
const KEYS = Object.keys(CORE);

const lang = process.argv[2];
const key = process.argv[3];

const ctx = { window: {} }; ctx.globalThis = ctx; vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(DIR, 'site-i18n.js'), 'utf8') + ';globalThis.__I = I18N;', ctx);
vm.runInContext(fs.readFileSync(path.join(DIR, 'i18n', 'ui-' + lang + '.js'), 'utf8'), ctx);
const mine = ctx.__I[lang];

let ref = null;
const rp = path.join(DIR, '_tr', 'ref-' + lang + '.json');
if (fs.existsSync(rp)) ref = JSON.parse(fs.readFileSync(rp, 'utf8'));

const i = KEYS.indexOf(key);
const near = [-2, -1, 0, 1, 2].map(d => i + d).filter(x => x >= 0 && x < KEYS.length);

console.log('本条及相邻 ±2 条：\n');
for (const x of near) {
  const k = KEYS[x];
  const mark = (k === key) ? ' >> ' : '    ';
  console.log(mark + '[' + k + ']');
  console.log('     英: ' + String(CORE[k].en).replace(/\n/g, ' ⏎ '));
  console.log('     我: ' + String(mine[k] === undefined ? '(缺)' : mine[k]).replace(/\n/g, ' ⏎ '));
  if (ref) console.log('     机: ' + String(ref[x] === undefined ? '(缺)' : ref[x]).replace(/\n/g, ' ⏎ '));
  console.log('');
}
