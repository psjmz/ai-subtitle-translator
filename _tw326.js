/* v0.9.323 补课：五篇内容 body 都漏了 zh-TW —— 从 zh-CN 用 OpenCC s2twp 转出（台湾用词），
   以「每节一行」的格式插到 body 块的 'zh-CN' 之前（与 seo 块里 zh-TW 紧跟 zh-CN 同序）。
   转完人工抽查词汇（軟體/預設/影片/滑鼠…），OpenCC 不动 ** 与 [[..]] 标记（纯 ASCII）。 */
'use strict';
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const PY = '/Users/jp/.workbuddy/binaries/python/envs/default/bin/python3';

const FILES = ['convert', 'srt-to-vtt', 'vtt-to-srt', 'srt-to-ass', 'ass-to-srt', 'sbv-to-srt', 'lrc-to-srt', 'srt-file-format', 'subtitle-format-comparison'];
const ROOT = __dirname;

/* JS 字面量序列化：字符串单引号、section 每行一个 */
function jsStr(v) { return "'" + String(v).replace(/\\/g, '\\\\').replace(/'/g, "\\'") + "'"; }
function jsVal(v, depth) {
  if (typeof v === 'string') return jsStr(v);
  if (Array.isArray(v)) return '[' + v.map(x => jsVal(x, depth + 1)).join(', ') + ']';
  if (v && typeof v === 'object') {
    return '{ ' + Object.keys(v).map(k => k + ': ' + jsVal(v[k], depth + 1)).join(', ') + ' }';
  }
  return JSON.stringify(v);
}
function jsBody(sections) {
  const pad = '      ';
  return '[\n' + pad + sections.map(s => jsVal(s, 1)).join(',\n' + pad) + '\n    ]';
}

const twConv = `
import json, sys
from opencc import OpenCC
cc = OpenCC('s2twp')
def conv(v):
    if isinstance(v, str): return cc.convert(v)
    if isinstance(v, list): return [conv(x) for x in v]
    if isinstance(v, dict): return {k: conv(x) for k, x in v.items()}
    return v
d = json.load(open(sys.argv[1], encoding='utf-8'))
json.dump(conv(d), open(sys.argv[2], 'w', encoding='utf-8'), ensure_ascii=False)
`;

FILES.forEach(slug => {
  const f = path.join(ROOT, 'content', slug + '.js');
  const src = require(f);
  if (src.body['zh-TW']) { console.log(slug + '：已有 zh-TW body，跳过'); return; }
  /* ① zh-CN body → 临时 JSON */
  const tmpA = '/tmp/tw-src-' + slug + '.json', tmpB = '/tmp/tw-dst-' + slug + '.json';
  fs.writeFileSync(tmpA, JSON.stringify(src.body['zh-CN']), 'utf8');
  /* ② python OpenCC s2twp */
  fs.writeFileSync('/tmp/tw-conv.py', twConv, 'utf8');
  execFileSync(PY, ['/tmp/tw-conv.py', tmpA, tmpB]);
  const tw = JSON.parse(fs.readFileSync(tmpB, 'utf8'));
  /* ③ 插回源文件：body: { 之后、'zh-CN' 之前 */
  let text = fs.readFileSync(f, 'utf8');
  const anchor = /(  body: \{\n)(    'zh-CN': \[)/;
  if (!anchor.test(text)) throw new Error(slug + '：找不到 body 块锚点');
  text = text.replace(anchor, (m, a, b) => a + "    'zh-TW': " + jsBody(tw) + ',\n' + b);
  fs.writeFileSync(f, text, 'utf8');
  /* 自检：重新 require 能读回、节数一致 */
  delete require.cache[require.resolve(f)];
  const re = require(f);
  const n = re.body['zh-TW'].length;
  if (n !== re.body['zh-CN'].length) throw new Error(slug + '：zh-TW 节数 ' + n + ' ≠ zh-CN ' + re.body['zh-CN'].length);
  console.log(slug + '：zh-TW body ' + n + ' 节已插入');
});
console.log('五篇 zh-TW body 补齐');
