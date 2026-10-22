/* _left339.js —— 列出还没分片的语言，顺带核对英文名是否可取到（分片头部要用） */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const DIR = __dirname;

const ctx = { window: {} }; ctx.globalThis = ctx; vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(DIR, 'site-i18n.js'), 'utf8') + ';globalThis.__U = UI_LANGS; globalThis.__27 = UI27;', ctx);
const U = ctx.__U, B = ctx.__27;
const nw = U.filter(x => B.indexOf(x[0]) < 0);
const left = nw.filter(x => !fs.existsSync(path.join(DIR, 'i18n', 'ui-' + x[0] + '.js')));

const tl = fs.readFileSync(path.join(DIR, 'translate.html'), 'utf8');
const lb = tl.indexOf('const LANGS = [');
const seg = tl.slice(lb, tl.indexOf('];', lb));
const EN = {};
{
  const re = /\{\s*v\s*:\s*'([^']+)'[\s\S]*?en\s*:\s*'([^']*)'/g;
  let m; while ((m = re.exec(seg))) EN[m[1]] = m[2];
}

console.log('进度：' + (nw.length - left.length) + '/' + nw.length + '，剩余 ' + left.length + ' 种\n');
const bad = left.filter(x => !EN[x[0]]);
console.log('缺英文名的（分片头部会退化成语言码）：' + (bad.length ? bad.map(x => x[0] + '/' + x[1]).join(', ') : '无'));
console.log('\n剩余对照表（代码 | 母语自称 | 英文名）:');
left.forEach(x => console.log('  ' + x[0] + ' | ' + x[1] + ' | ' + (EN[x[0]] || '(缺)')));
