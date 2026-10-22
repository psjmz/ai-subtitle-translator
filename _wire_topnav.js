/* _wire_topnav.js —— 把 site-topnav.js 接入 12 个自带 NAV 胶囊的工具页（v0.9.317，非交付件）
   每页三步：
   ① 占位：<span class="navpills" id="navPills"></span> → <span id="topNav"></span>
   ② 删 NAV 数组 + renderNav 函数（含上方一行注释）+ 全部 renderNav() 调用
   ③ </body> 前插 <script src="site-topnav.js?v=0.9.316" data-tool="xx"></script>
   改完逐页自检：无 renderNav / var NAV / navPills 残留，topNav 与 script 都在。
   跑法：node _wire_topnav.js */
'use strict';
const fs = require('fs');

const PAGES = {
  'convert.html': 'cv', 'table.html': 'tb', 'hanconv.html': 'hc', 'bilingual.html': 'bi',
  'split.html': 'sp', 'shift.html': 'sh', 'lrc.html': 'lr', 'extract.html': 'ex',
  'videosub.html': 'vs', 'repair.html': 'rp', 'glossary.html': 'gl', 'batch.html': 'bt'
};
const NOTE = '/* v0.9.317：顶部胶囊换全站统一导航 site-topnav.js（渲染进 #topNav，本页只留占位）。 */\n';

for (const f of Object.keys(PAGES)) {
  let h = fs.readFileSync(f, 'utf8');
  const lines = h.split('\n');
  const report = [];

  /* ① 占位替换 */
  const pi = lines.findIndex(l => /id="navPills"/.test(l));
  if (pi < 0) { console.log('FATAL ' + f + ' 没找到 navPills'); process.exit(1); }
  lines[pi] = lines[pi].replace(/<span class="navpills" id="navPills"><\/span>/, '<span id="topNav"></span>');
  if (lines[pi].indexOf('id="topNav"') < 0) { console.log('FATAL ' + f + ' 占位替换失败'); process.exit(1); }
  report.push('占位@' + (pi + 1));

  /* ② 删 NAV+renderNav 块：从 var NAV 行（含其上方紧邻注释）到 renderNav 函数闭合 */
  let ni = lines.findIndex(l => /var NAV\s*=/.test(l));
  if (ni < 0) { console.log('FATAL ' + f + ' 没找到 var NAV'); process.exit(1); }
  let start = ni;
  if (start > 0 && /\/\*/.test(lines[start - 1])) start--;   // 上方一行注释一起删
  /* renderNav 函数体：花括号计数 */
  let fi = lines.findIndex(l => /function renderNav\s*\(/.test(l));
  if (fi < 0) { console.log('FATAL ' + f + ' 没找到 renderNav'); process.exit(1); }
  let depth = 0, end = -1, seen = false;
  for (let i = fi; i < lines.length; i++) {
    for (const ch of lines[i]) {
      if (ch === '{') { depth++; seen = true; }
      else if (ch === '}') depth--;
    }
    if (seen && depth === 0) { end = i; break; }
  }
  if (end < 0) { console.log('FATAL ' + f + ' renderNav 花括号不闭合'); process.exit(1); }
  /* renderNav 后若紧跟空行，一并吃掉一行，避免留双空行 */
  let delEnd = end;
  if (lines[end + 1] === '' && lines[end + 2] !== '' && /^function |^\/\*/.test(lines[end + 2])) delEnd = end + 1;
  lines.splice(start, delEnd - start + 1);
  lines.splice(start, 0, NOTE.trimEnd());
  report.push('删 NAV+renderNav @' + (ni + 1) + '-' + (delEnd + 1));

  /* ③ 删调用点 */
  let calls = 0;
  for (let i = 0; i < lines.length; i++) {
    if (/^\s*renderNav\(\);\s*$/.test(lines[i])) { lines.splice(i, 1); calls++; i--; continue; }
    if (/renderNav\(\);\s*/.test(lines[i]) && /applyI18n\(\);/.test(lines[i])) {
      lines[i] = lines[i].replace(/\s*renderNav\(\);/, ''); calls++;
    }
  }
  report.push('删调用×' + calls);

  /* ④ </body> 前插 script 标签 */
  let done = false;
  for (let i = lines.length - 1; i >= 0; i--) {
    if (/<\/body>/.test(lines[i])) {
      lines.splice(i, 0, '<script src="site-topnav.js?v=0.9.316" data-tool="' + PAGES[f] + '"></script>');
      done = true; break;
    }
  }
  if (!done) { console.log('FATAL ' + f + ' 没找到 </body>'); process.exit(1); }
  report.push('script 已插');

  const out = lines.join('\n');
  /* 自检：无残留 */
  for (const bad of ['renderNav', 'var NAV', 'navPills']) {
    if (out.indexOf(bad) >= 0) { console.log('FATAL ' + f + ' 仍有 ' + bad + ' 残留'); process.exit(1); }
  }
  if ((out.match(/id="topNav"/g) || []).length !== 1) { console.log('FATAL ' + f + ' topNav 占位不是 1 个'); process.exit(1); }
  if (out.indexOf('site-topnav.js?v=0.9.316') < 0) { console.log('FATAL ' + f + ' script 没插上'); process.exit(1); }

  fs.writeFileSync(f, out);
  console.log('✓ ' + f.padEnd(16) + report.join('  '));
}
console.log('12 页接入完成');
