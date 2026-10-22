/* _mk339.js —— 由「键→值 JSON」生成界面语言分片（v0.9.339 起，与 _mkshard.js 并存）
 *
 * 为什么再写一份：_mkshard.js 按「行序」对齐，一旦译文里出现空行或漏行就会整列错位
 * （339 第一批 ms 的 detDl2/detDl3 就是这样错开的）。这份改成按**键名**对齐：
 * 多写、少写、顺序错都立刻报出来，不会静默错位。
 *
 * 用法：node _mk339.js hu "Magyar" "Hungarian"
 *   argv[2] 语言码；argv[3] 母语自称；argv[4] 英文名
 * 输入：_tr/<lang>.json  形如 { "docTitle": "...", ... }
 * 输出：i18n/ui-<lang>.js
 * 校验：键集必须与 _core338.json 完全一致（不缺、不多）
 */
'use strict';
const fs = require('fs');
const path = require('path');

const DIR = __dirname;
const CORE = JSON.parse(fs.readFileSync(path.join(DIR, '_core338.json'), 'utf8'));
const KEYS = Object.keys(CORE);

const lang = process.argv[2];
const native = process.argv[3] || lang;
const enName = process.argv[4] || lang;
if (!lang) { console.error('用法：node _mk339.js <lang> "<母语名>" "<英文名>"'); process.exit(2); }

const src = path.join(DIR, '_tr', lang + '.json');
if (!fs.existsSync(src)) { console.error('没有译文文件：' + src); process.exit(2); }

let D;
try { D = JSON.parse(fs.readFileSync(src, 'utf8')); }
catch (e) { console.error('✗ ' + lang + '.json 解析失败：' + e.message); process.exit(1); }

const miss = KEYS.filter(k => !(k in D));
const extra = Object.keys(D).filter(k => KEYS.indexOf(k) < 0);
if (miss.length || extra.length) {
  if (miss.length) console.error('✗ ' + lang + ' 缺 ' + miss.length + ' 条：' + miss.join(','));
  if (extra.length) console.error('✗ ' + lang + ' 多 ' + extra.length + ' 条（键名不存在）：' + extra.join(','));
  process.exit(1);
}

const esc = s => String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'");
const body = KEYS.map(k => '    ' + k + ": '" + esc(D[k]) + "'").join(',\n');

const out = `/* i18n/ui-${lang}.js —— ${native}（${enName}）界面文案，v0.9.339 起。
 *
 * 分片规则：只放「与英文不同」的键；没翻到的键由 t() 回落英文（不影响可用性）。
 * 占位符 {0} {1} {2} {3} 必须原样保留；HTML 标签 <b> 等原样保留。
 *
 * 本文件由 _mk339.js 依据 _tr/${lang}.json 生成，键序与 _core338.json 一致。
 * 改译文请改 _tr/${lang}.json 后重新生成，不要直接手改这里（下次生成会被覆盖）。
 */
(function () {
  var I = window.SiteI18N && window.SiteI18N.I18N;
  if (!I) return;
  I['${lang}'] = {
${body}
  };
})();
`;

fs.writeFileSync(path.join(DIR, 'i18n', 'ui-' + lang + '.js'), out);
console.log('✓ 生成 i18n/ui-' + lang + '.js（' + KEYS.length + ' 键，' + Buffer.byteLength(out) + ' 字节）');
