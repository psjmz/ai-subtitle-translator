/* 韩语全站零汉字：60 个 /ko/ 页面，剥掉 script/style/带 data-i18n 的元素后统计汉字。
   韩语用谚文，任何汉字残留都是本地化遗漏（首页「2.7亿」就是这么抓到的）。
   用法：PORT=3407 node _chk333_ko.js  （需先起同一端口的 server，或传 BASE） */
'use strict';
const http = require('http');

const PORT = Number(process.env.PORT || 3407);
const BASE = process.env.BASE || ('http://127.0.0.1:' + PORT);

const PAGES = [
  '/ko/', '/ko/translate.html', '/ko/merge.html', '/ko/convert.html', '/ko/clean.html',
  '/ko/styles.html', '/ko/text.html', '/ko/extract.html', '/ko/replace.html', '/ko/video.html',
  '/ko/han.html', '/ko/split.html', '/ko/sheet.html', '/ko/batch.html', '/ko/lyric.html',
  '/ko/qc.html', '/ko/download.html', '/ko/affiliate.html', '/ko/glossary.html', '/ko/guides/'
];
const HAN = /[\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF]/g;

function get(u) {
  return new Promise(res => {
    const req = http.get(BASE + u, { headers: { 'Accept-Encoding': 'identity' } }, r => {
      let b = '';
      r.setEncoding('utf8');
      r.on('data', d => b += d);
      r.on('end', () => res([r.statusCode, b]));
    });
    req.on('error', e => res([0, e.message]));
    req.setTimeout(20000, () => { req.destroy(); res([0, 'timeout']); });
  });
}

(async () => {
  let bad = 0;
  for (const p of PAGES) {
    const [code, body] = await get(p);
    if (code !== 200) { console.log('MISS ' + code + '  ' + p); bad++; continue; }
    const b = body.replace(/<script[\s\S]*?<\/script>/g, ' ')
      .replace(/<style[\s\S]*?<\/style>/g, ' ')
      .replace(/<!--[\s\S]*?-->/g, ' ');
    const s = b.replace(/<([a-zA-Z][a-zA-Z0-9]*)\b[^>]*\bdata-i18n\b[^>]*>[\s\S]*?<\/\1>/g, ' ');
    const txt = s.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
    const hits = txt.match(HAN) || [];
    /* 语言下拉里的「简体中文 / 繁體中文 / 日本語」是母语名，必须保留 */
    const drop = (txt.match(/简体中文|繁體中文|日本語/g) || []).join('').match(HAN) || [];
    const n = hits.length - drop.length;
    if (n > 0) {
      bad++;
      const at = txt.search(HAN);
      console.log('HIT  ' + n + ' 汉字  ' + p + '  …' + txt.slice(Math.max(0, at - 30), at + 30).replace(/\s+/g, ' '));
    } else {
      console.log('OK   0 汉字  ' + p);
    }
  }
  console.log('---- ' + (PAGES.length - bad) + '/' + PAGES.length + ' 页零汉字 ----');
  process.exitCode = bad ? 1 : 0;
})();
