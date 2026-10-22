/* _fixmixtail.js —— 手工收尾最后几处混字
 *
 * 这些是「整句只有一个词混了外文字母」的情况，重译风险比修字大：
 *   重译会把整句换掉，可能与页面上其它位置同一术语不一致；只换那个词更稳。
 * 每处都写明「错在哪、换成什么」，改完由 _mk339.js 重出分片。
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const DIR = __dirname;

const NATIVE = { bo: 'བོད་སྐད', sd: 'سنڌي' };
const EN_NAME = { bo: 'Tibetan', sd: 'Sindhi' };

const FIX = [
  /* བོད (bo) —— 「studio」被写成 ས + 希伯来 טו + དྷི་ཡོ，两处同一词 */
  { lang: 'bo', key: 'altDemo', from: 'སטוདྷི་ཡོ', to: 'སྟུ་ཌི་ཡོ', why: 'studio：希伯来字母 טו → 藏文 ཊུ' },
  { lang: 'bo', key: 'enterHint', from: 'སטוདྷི་ཡོ', to: 'སྟུ་ཌི་ཡོ', why: 'studio：同上' },
  /* 「Thai characters」里的 ိ ု င ် း 是缅甸文（缅语「泰国」一词里抄来的） */
  { lang: 'bo', key: 'lblBiMaxW', from: 'ཐ\u102d\u102f\u1004\u103a\u1038ཡིག', to: 'ཐའི་ཡིག', why: 'Thai：缅文字母 → 藏文 ཐའི་' },
  /* 「ads」被写成 高棉文 ផ្សាយ + 藏文 འཕྲིན */
  { lang: 'bo', key: 'tcClD', from: 'ផ្សាយའཕྲིན', to: 'བརྡ་ཁྱབ', why: 'ads：高棉文 ផ្សាយ + འཕྲིན → བརྡ་ཁྱབ' },
  { lang: 'bo', key: 'detClL', from: 'ផ្សាយའཕྲིན', to: 'བརྡ་ཁྱབ', why: 'ads：同上' },
  /* 信德语 download 里的 ल ो ड 是天城文 */
  { lang: 'sd', key: 'rkTx', from: '\u0932\u094b\u0921', to: 'لوڊ', why: 'download：天城文 लोड → 阿拉伯字母 لوڊ' }
];

let n = 0;
for (const f of FIX) {
  const p = path.join(DIR, '_tr', f.lang + '.json');
  const tr = JSON.parse(fs.readFileSync(p, 'utf8'));
  const v = String(tr[f.key]);
  if (v.indexOf(f.from) < 0) { console.log('· 跳过 ' + f.lang + '.' + f.key + '（已无 ' + f.from + '）'); continue; }
  tr[f.key] = v.split(f.from).join(f.to);
  fs.writeFileSync(p, JSON.stringify(tr, null, 1));
  console.log('✓ ' + f.lang + '.' + f.key + '  ' + f.why);
  n++;
}

/* 改过的语言各自重出界面分片 */
const langs = [...new Set(FIX.map(f => f.lang))];
for (const l of langs) {
  try {
    execFileSync(process.execPath, [path.join(DIR, '_mk339.js'), l, NATIVE[l], EN_NAME[l]], { cwd: DIR, stdio: 'pipe' });
    console.log('✓ 重出 i18n/ui-' + l + '.js');
  } catch (e) {
    console.log('✗ 重出 ' + l + ' 失败：' + String(e.stdout || e.message).slice(0, 200));
  }
}
console.log('\n共修 ' + n + ' 处');
