/* v0.9.296 服务端自测：起本地服务，验第八页的四处登记都生效
   用法：node _srv296.js（自己起服务、自己验、自己关） */
'use strict';
const http = require('http');
const { spawn } = require('child_process');
const PORT = 3411;
const wait = ms => new Promise(r => setTimeout(r, ms));

let pass = 0, fail = 0;
const ok = (c, n, x) => { console.log((c ? '  ✓ ' : '  ✗ ') + n + (x !== undefined ? '  → ' + String(x).slice(0, 120) : '')); c ? pass++ : fail++; };

function get(p) {
  return new Promise((res, rej) => {
    http.get({ host: '127.0.0.1', port: PORT, path: p }, r => {
      let b = ''; r.on('data', d => b += d); r.on('end', () => res({ code: r.statusCode, body: b }));
    }).on('error', rej);
  });
}

(async () => {
  const srv = spawn(process.execPath, ['server.js'], {
    cwd: '/Users/jp/WorkBuddy/2026-09-04-00-29-54/srt-translator',
    env: Object.assign({}, process.env, { PORT: String(PORT) }),
    stdio: 'ignore'
  });
  let up = false;
  for (let i = 0; i < 40 && !up; i++) {
    await wait(300);
    try { const r = await get('/'); if (r.code === 200) up = true; } catch (e) { }
  }
  if (!up) { console.log('!! 服务没起来'); srv.kill('SIGKILL'); process.exit(1); }

  console.log('--- ① 第八页能开，且带本语言的 SEO head ---');
  const zh = await get('/repair.html');
  ok(zh.code === 200, '/repair.html 200', zh.code);
  ok(/乱码修复/.test(zh.body) && /锟斤拷/.test(zh.body), '简体中文版把乱码相关的词写进了 head',
    (zh.body.match(/<title>[^<]*<\/title>/) || [''])[0]);
  ok(/repair-i18n\.js\?v=0\.9\.296/.test(zh.body) && /repair-core\.js\?v=0\.9\.296/.test(zh.body), '引的是 296 的脚本');

  console.log('--- ② 语言路由（/en/repair.html）---');
  const en = await get('/en/repair.html');
  ok(en.code === 200, '/en/repair.html 200', en.code);
  ok(/Mojibake|garbled/i.test(en.body), '英文版换成了英文 head',
    (en.body.match(/<title>[^<]*<\/title>/) || [''])[0]);
  ok(!/锟斤拷/.test(en.body), '英文版里没有中文关键词残留');

  console.log('--- ③ 静态文案块（爬虫不执行 JS，这段是它唯一能读到的正文）---');
  ok(/class="seo"/.test(zh.body), '首页式 SEO 正文块在');
  ok(/随心字幕 AI · 字幕乱码修复/.test(zh.body), '页脚品牌名对');

  console.log('--- ④ sitemap 变成八页 × 27 = 216 ---');
  const sm = await get('/sitemap.xml');
  const n = (sm.body.match(/<loc>/g) || []).length;
  ok(n === 216, 'sitemap 216 条', n);
  ok((sm.body.match(/\/repair\.html/g) || []).length >= 27, 'repair.html 进了 sitemap',
    (sm.body.match(/\/repair\.html/g) || []).length);

  console.log('--- ⑤ /data 仍然 404（283 那条不能退）---');
  for (const p of ['/data/config.json', '/data/']) {
    const r = await get(p);
    ok(r.code === 404, p + ' 应为 404', r.code);
  }

  console.log('--- ⑥ 老页面没被带坏 ---');
  for (const p of ['/', '/shift.html', '/convert.html', '/bilingual.html']) {
    const r = await get(p);
    ok(r.code === 200, p + ' 仍然 200', r.code);
  }

  console.log('\n== ' + pass + ' 通过 / ' + fail + ' 失败 ==');
  srv.kill('SIGKILL');
  process.exit(fail ? 1 : 0);
})();
