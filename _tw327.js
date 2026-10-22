/* v0.9.327 第三批 10 篇：从 zh-CN 用 OpenCC s2twp 转出 zh-TW（seo + body）。
   seo：'zh-TW' 行插到 'zh-CN' 之前；body：'zh-TW' 节插到 'zh-CN' 之前。幂等：已有则跳过。 */
'use strict';
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const PY = '/Users/jp/.workbuddy/binaries/python/envs/default/bin/python3';

const FILES = ['translate', 'translate-english-to-chinese', 'clean', 'remove-subtitle-ads',
  'bilingual', 'split-bilingual-subtitles', 'make-bilingual-subtitles',
  'qc', 'subtitle-quality-check', 'subtitle-too-fast'];
const ROOT = __dirname;

function jsStr(v) { return "'" + String(v).replace(/\\/g, '\\\\').replace(/'/g, "\\'") + "'"; }
function jsVal(v) {
  if (typeof v === 'string') return jsStr(v);
  if (Array.isArray(v)) return '[' + v.map(x => jsVal(x)).join(', ') + ']';
  if (v && typeof v === 'object') {
    return '{ ' + Object.keys(v).map(k => k + ': ' + jsVal(v[k])).join(', ') + ' }';
  }
  return JSON.stringify(v);
}
function jsBody(sections) {
  const pad = '      ';
  return '[\n' + pad + sections.map(s => jsVal(s)).join(',\n' + pad) + '\n    ]';
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

fs.writeFileSync('/tmp/tw-conv.py', twConv, 'utf8');

FILES.forEach(slug => {
  const f = path.join(ROOT, 'content', slug + '.js');
  const src = require(f);
  if (src.seo['zh-TW'] && src.body['zh-TW']) { console.log(slug + '：已有 zh-TW，跳过'); return; }
  const tmpA = '/tmp/tw327-src-' + slug + '.json', tmpB = '/tmp/tw327-dst-' + slug + '.json';
  fs.writeFileSync(tmpA, JSON.stringify({ seo: src.seo['zh-CN'], body: src.body['zh-CN'] }), 'utf8');
  execFileSync(PY, ['/tmp/tw-conv.py', tmpA, tmpB]);
  const tw = JSON.parse(fs.readFileSync(tmpB, 'utf8'));
  let text = fs.readFileSync(f, 'utf8');
  if (!src.seo['zh-TW']) {
    const anchorS = /(  seo: \{\n)(    'zh-CN': \{)/;
    if (!anchorS.test(text)) throw new Error(slug + '：找不到 seo 锚点');
    const s = tw.seo;
    const line = "    'zh-TW': { title: " + jsStr(s.title) + ', desc: ' + jsStr(s.desc) + ', h1: ' + jsStr(s.h1) + ', intro: ' + jsStr(s.intro) + ', ctaText: ' + jsStr(s.ctaText) + ' },\n';
    text = text.replace(anchorS, (m, a, b) => a + line + b);
  }
  if (!src.body['zh-TW']) {
    const anchorB = /(  body: \{\n)(    'zh-CN': \[)/;
    if (!anchorB.test(text)) throw new Error(slug + '：找不到 body 锚点');
    text = text.replace(anchorB, (m, a, b) => a + "    'zh-TW': " + jsBody(tw.body) + ',\n' + b);
  }
  fs.writeFileSync(f, text, 'utf8');
  delete require.cache[require.resolve(f)];
  const re = require(f);
  if (re.body['zh-TW'].length !== re.body['zh-CN'].length) throw new Error(slug + '：节数不一致');
  if (!re.seo['zh-TW'].title.endsWith(' – 隨心字幕 AI')) throw new Error(slug + '：zh-TW title 后缀不对 -> ' + re.seo['zh-TW'].title);
  console.log(slug + '：zh-TW seo+body 已插入，body ' + re.body['zh-TW'].length + ' 节');
});
console.log('第三批 zh-TW 补齐');
