/* v0.9.278：27 语 heroTitle 从两行改一行 —— 去掉 <br>。
   ⚠️ 中日韩标点（，、；：）后面不加空格；拉丁/其他语系的逗号后面必须补一个空格，
      否则会和后文粘成 "subtitles,let AI handle it"。
   ⚠️ 写成独立脚本文件，别再用 node -e + 双引号——含 \' 转义的那几条（法语/意大利语/土耳其语）
      在 shell 里被吃掉了正则，上一版就漏了 3 条。 */
const fs = require('fs');
const F = __dirname + '/site-i18n.js';
let s = fs.readFileSync(F, 'utf8');
let n = 0;
const samples = [];
s = s.replace(/heroTitle:'((?:[^'\\]|\\.)*)'/g, function (full, val) {
  if (val.indexOf('<br>') < 0) return full;
  const parts = val.split('<br>');
  const head = parts[0];
  const tail = parts.slice(1).join('');
  const needSpace = !/[，、；：]\s*$/.test(head);
  const merged = head + (needSpace ? ' ' : '') + tail;
  n++;
  samples.push(merged);
  return "heroTitle:'" + merged + "'";
});
fs.writeFileSync(F, s);
console.log('本次改写', n, '条；剩余带 <br> 的', (s.match(/heroTitle:'[^']*<br>/g) || []).length,
  '；heroTitle 总数', (s.match(/heroTitle:/g) || []).length);
samples.forEach(x => console.log('  ' + x));
