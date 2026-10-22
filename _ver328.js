/* v0.9.328 第四批终验：27 语 seo+body 结构对照、星号数、内链路径、品牌后缀。
   用法：node _ver328.js  → ALL PASS 才算翻译完成。 */
'use strict';
const path = require('path');
const FILES = ['repair', 'subtitle-garbled-characters',
  'hanconv', 'srt-simplified-to-traditional', 'simplified-traditional-chinese',
  'table', 'srt-to-excel',
  'batch', 'batch-convert-srt',
  'fps-23-976-vs-25'];
const LANGS = ['zh-CN', 'zh-TW', 'en', 'es', 'pt', 'ja', 'ko', 'de', 'fr', 'id', 'hi', 'th', 'vi',
  'ru', 'it', 'ar', 'tr', 'nl', 'pl', 'sv', 'cs', 'uk', 'da', 'fi', 'el', 'he', 'ro'];
const SUFFIX = { 'zh-CN': '随心字幕 AI', 'zh-TW': '隨心字幕 AI' };
let bad = 0;
const err = (m) => { console.log('FAIL ' + m); bad++; };

for (const slug of FILES) {
  const d = require(path.join(__dirname, 'content', slug + '.js'));
  for (const L of LANGS) {
    if (!d.seo[L]) { err(slug + ' seo 缺 ' + L); continue; }
    if (!d.body[L]) { err(slug + ' body 缺 ' + L); continue; }
    const s = d.seo[L];
    for (const k of ['title', 'desc', 'h1', 'intro', 'ctaText']) {
      if (!s[k] || !s[k].trim()) err(slug + ' ' + L + ' seo.' + k + ' 空');
    }
    const want = SUFFIX[L] || 'AI-SRTSub';
    if (!s.title.endsWith(' – ' + want)) err(slug + ' ' + L + ' title 后缀不对: ' + s.title.slice(-24));
    const cjk = (s.desc.match(/[\u4e00-\u9fff\u3040-\u30ff\uac00-\ud7af]/g) || []).length;
    const isCjkLang = cjk > s.desc.length * 0.25;
    if (s.desc.length < (isCjkLang ? 50 : 80) || s.desc.length > 200) err(slug + ' ' + L + ' desc 长度 ' + s.desc.length);
    const z = d.body['zh-CN'], t = d.body[L];
    if (t.length !== z.length) { err(slug + ' ' + L + ' 节数 ' + t.length + '≠' + z.length); continue; }
    for (let i = 0; i < z.length; i++) {
      if (t[i].img && !z[i].img) err(slug + ' ' + L + ' 节' + i + ' 多了 img');
      if (!t[i].img && z[i].img) err(slug + ' ' + L + ' 节' + i + ' 少了 img');
      if (z[i].ul && (t[i].ul || []).length !== z[i].ul.length) err(slug + ' ' + L + ' 节' + i + ' ul 长度不一致');
      const zp = (z[i].ps || []).join('\n'), tp = (t[i].ps || []).join('\n');
      const zStar = (zp.match(/\*\*/g) || []).length, tStar = (tp.match(/\*\*/g) || []).length;
      if (zStar !== tStar) err(slug + ' ' + L + ' 节' + i + ' 星号数 ' + tStar + '≠' + zStar);
      const zLinks = [...zp.matchAll(/\[\[[^\]]*\|([^\]]+)\]\]/g)].map(m => m[1]);
      const tLinks = [...tp.matchAll(/\[\[[^\]]*\|([^\]]+)\]\]/g)].map(m => m[1]);
      if (JSON.stringify(zLinks) !== JSON.stringify(tLinks)) err(slug + ' ' + L + ' 节' + i + ' 内链路径不一致');
      if (L !== 'zh-CN' && L !== 'zh-TW' && L !== 'ja' && /[\u4e00-\u9fff]/.test(tp)) err(slug + ' ' + L + ' 节' + i + ' 混入汉字');
    }
  }
  for (const r of d.related) {
    try { require(path.join(__dirname, 'content', r + '.js')); } catch (e) { err(slug + ' related 失效: ' + r); }
  }
}
console.log(bad === 0 ? 'ALL PASS（' + FILES.length + ' 篇 × 27 语结构对照全过）' : 'BAD=' + bad);
process.exit(bad === 0 ? 0 : 1);
