/* _mkall339.js —— 把所有「译文已就绪但还没生成分片」的语言一次性生成 i18n/ui-<lang>.js
 *
 * 配套 _gem339.js：那个只产出 _tr/<lang>.json（译文），本脚本把译文转成页面能加载的分片。
 *
 * 用法：
 *   node _mkall339.js              # 生成所有缺分片的语言
 *   node _mkall339.js lt sl        # 只生成指定语言（即使已有分片，强制覆盖）
 *   node _mkall339.js --dry        # 只列出待生成清单，不写文件
 *
 * ⚠️ 已存在的 i18n/ui-<lang>.js 不会被覆盖，除非在参数里显式点名。
 *    这是为了保护早期手写那 5 份（ms/fil/fa/nb/sk）—— 它们没走 _tr/*.json 中间层，
 *    被自动覆盖会丢掉手改过的措辞。
 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const DIR = __dirname;
const TR = path.join(DIR, '_tr');
const I18N = path.join(DIR, 'i18n');

/* 语言码 → 母语自称（来自 site-i18n.js 的 UI_LANGS） */
const ctx = { window: {} }; ctx.globalThis = ctx; vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(DIR, 'site-i18n.js'), 'utf8') + ';globalThis.__U = UI_LANGS; globalThis.__27 = UI27;', ctx);
const NATIVE = {};
for (const [code, nat] of ctx.__U) NATIVE[code] = nat;

/* 语言码 → 英文名（来自 translate.html 的 LANGS） */
const tl = fs.readFileSync(path.join(DIR, 'translate.html'), 'utf8');
const lb = tl.indexOf('const LANGS = [');
const seg = tl.slice(lb, tl.indexOf('];', lb));
const EN_NAME = {};
{
  const re = /\{\s*v\s*:\s*'([^']+)'[\s\S]*?en\s*:\s*'([^']*)'/g;
  let m; while ((m = re.exec(seg))) EN_NAME[m[1]] = m[2];
}

const args = process.argv.slice(2);
const dry = args.includes('--dry');
const named = args.filter(a => !a.startsWith('--'));

const outs = [];
for (const f of fs.readdirSync(TR)) {
  const m = /^([a-z]{2,3})\.json$/.exec(f);
  if (!m) continue;
  const code = m[1];
  if (named.length && named.indexOf(code) < 0) continue;
  const dst = path.join(I18N, 'ui-' + code + '.js');
  if (fs.existsSync(dst) && named.indexOf(code) < 0) continue;   /* 已存在且没被点名 → 跳过 */
  outs.push({ code, native: NATIVE[code] || code, en: EN_NAME[code] || code, json: path.join(TR, f), dst });
}

if (!outs.length) { console.log('没有待生成的分片'); process.exit(0); }

console.log('待生成 ' + outs.length + ' 份：' + outs.map(o => o.code).join(', '));
if (dry) process.exit(0);

const { execFileSync } = require('child_process');
let ok = 0, bad = 0;
for (const o of outs) {
  try {
    const r = execFileSync(process.execPath, [path.join(DIR, '_mk339.js'), o.code, o.native, o.en], { encoding: 'utf8' });
    console.log('  ' + String(r).trim());
    ok++;
  } catch (e) {
    console.log('  ✗ ' + o.code + ' 生成失败：' + String(e.stdout || e.message).slice(0, 200));
    bad++;
  }
}
console.log('\n生成 ' + ok + ' 份，失败 ' + bad + ' 份。接着跑 node _chkshard.js 与 node _lint339.js');
