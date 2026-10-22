/* _mkshard.js —— 由「按行对齐的纯文译文」生成界面语言分片（v0.9.339）
 *
 * 为什么这么做：337 个键，每种语言手写键名极易错位（少一行、多一行都看不出来）。
 * 译文只写值、一行一条，顺序与 _core338.json 的键序严格一致；
 * 生成器负责补键名、转义、加文件头，再由 _chkshard.js 逐条校验。
 *
 * 用法：node _mkshard.js hu "Magyar" "Hungarian"
 *   argv[2] 语言码；argv[3] 母语自称（写进文件头注释）；argv[4] 英文名
 * 输入：_tr/<lang>.txt（337 行，UTF-8，无 BOM）
 * 输出：i18n/ui-<lang>.js
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
if (!lang) { console.error('用法：node _mkshard.js <lang> "<母语名>" "<英文名>"'); process.exit(2); }

const src = path.join(DIR, '_tr', lang + '.txt');
if (!fs.existsSync(src)) { console.error('没有译文文件：' + src); process.exit(2); }

let lines = fs.readFileSync(src, 'utf8').replace(/\r/g, '').split('\n');
while (lines.length && lines[lines.length - 1] === '') lines.pop();
if (lines.length !== KEYS.length) {
  console.error('✗ ' + lang + ' 行数 ' + lines.length + ' ≠ 键数 ' + KEYS.length);
  const k = Math.min(lines.length, KEYS.length);
  console.error('  第 ' + (k + 1) + ' 行应为：' + JSON.stringify(CORE[KEYS[k]] && CORE[KEYS[k]].en));
  process.exit(1);
}

const esc = s => String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'");
const body = KEYS.map((k, i) => '    ' + k + ": '" + esc(lines[i]) + "'").join(',\n');

const out = `/* i18n/ui-${lang}.js —— ${native}（${enName}）界面文案，v0.9.339 起。
 *
 * 分片规则：只放「与英文不同」的键；没翻到的键由 t() 回落英文（不影响可用性）。
 * 占位符 {0} {1} {2} {3} 必须原样保留；HTML 标签 <b> 等原样保留。
 *
 * 本文件由 _mkshard.js 依据 _tr/${lang}.txt 生成，键序与 _core338.json 一致。
 * 改译文请改 _tr/${lang}.txt 后重新生成，不要直接手改这里（下次生成会被覆盖）。
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
