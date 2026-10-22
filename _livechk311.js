/* 线上抽查：/en/ /ar/ /th/glossary /hi/convert 四页 */
'use strict';
const fs = require('fs');
const HAN = /[\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff]/;
const read = f => fs.readFileSync('/tmp/_p' + f + '.html', 'utf8');

/* /en/ 首页 */
{
  const h = read(1);
  const blk = (h.match(/<!--SEO-COPY-START-->([\s\S]*?)<!--SEO-COPY-END-->/) || ['', ''])[0];
  const txt = blk.replace(/<[^>]*>/g, '').trim();
  console.log('/en/          文案块 ' + txt.length + ' 字 / 汉字 ' + (HAN.test(txt) ? '有!' : '无') + ' / data-i18n 残留 ' + (/\sdata-i18n/.test(blk) ? '有!' : '无') + ' / 键名泄漏 ' + (/seoTitle|seoIntro/.test(txt) ? '有!' : '无'));
  console.log('              x-default → ' + ((h.match(/hreflang="x-default" href="([^"]+)"/) || [])[1]));
  console.log('              lang=' + ((h.match(/<html lang="([^"]+)"/) || [])[1]) + ' / canonical=' + ((h.match(/rel="canonical" href="([^"]+)"/) || [])[1]));
  console.log('              h1 数 ' + (h.match(/<h1[\s>]/g) || []).length);
}
/* /ar/ RTL */
{
  const h = read(2);
  console.log('/ar/          ' + ((h.match(/<html[^>]*>/) || [''])[0]));
}
/* /th/glossary desc */
{
  const h = read(3);
  const d = (h.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '';
  console.log('/th/glossary  desc ' + d.length + ' 字 / 结尾 ' + JSON.stringify(d.slice(-20)));
}
/* /hi/convert 文案块 */
{
  const h = read(4);
  const txt = ((h.match(/<!--SEO-COPY-START-->([\s\S]*?)<!--SEO-COPY-END-->/) || ['', ''])[1]).replace(/<[^>]*>/g, '').trim();
  console.log('/hi/convert   文案块 ' + txt.length + ' 字 / 开头 ' + JSON.stringify(txt.slice(0, 40)));
}
