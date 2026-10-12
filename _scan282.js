/* v0.9.282：体检「注入后还有没有阴阳怪气的中文」—— 区分
   ★整句照抄（模型偷懒，必须重翻） / 片段（可能是品牌名 B站 之类，允许） */
'use strict';
const fs = require('fs');
const s = fs.readFileSync(__dirname + '/site-i18n.js', 'utf8');
const seg = s.match(/const I18N = \{[\s\S]*?\n\};/)[0];
/* ⚠️ 'use strict' 下 eval 里的 var 不会漏到外层，必须取返回值 */
const I18N = eval('(' + seg.replace('const I18N = ', '').replace(/;\s*$/, '') + ')');
const CJ = /[\u4e00-\u9fff]+/g;
const copy = [], frag = [];
Object.keys(I18N).forEach(L => {
  if (L === 'zh-CN' || L === 'zh-TW' || L === 'ja') return;
  Object.keys(I18N[L]).forEach(k => {
    const v = String(I18N[L][k] || '');
    const hit = v.match(CJ);
    if (!hit) return;
    const zh = String(I18N['zh-CN'][k] || '');
    const en = String(I18N['en'][k] || '');
    if (v === zh) copy.push([L, k, v]);
    else frag.push([L, k, hit.join(' '), v.slice(0, 70)]);
  });
});
console.log('== 整句照抄中文（必须重翻）' + copy.length + ' 条 ==');
copy.forEach(r => console.log('  ' + r[0] + '.' + r[1] + '  =' + r[2].slice(0, 50)));
console.log('\n== 只掺了片段（可能是品牌名）' + frag.length + ' 条 ==');
frag.forEach(r => console.log('  ' + r[0] + '.' + r[1] + '  汉字=' + r[2] + '  →' + r[3]));
console.log('\n== 整句照抄的 key 清单（给重翻用） ==');
console.log(JSON.stringify(copy.map(r => r[0] + '.' + r[1])));
