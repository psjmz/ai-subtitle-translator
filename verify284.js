/* v0.9.284 线上核验：
     ① 四页版号升到 284
     ② 三个无害安全头已上、CSP 确认没误加（HTTP 实测，不看 body）
     ③ robots.txt 含 Disallow: /data/
     ④ admin.html 声明 favicon
     ⑤ 283 的 /data 拦截仍然有效（回归）
   ⚠️ 本地预演：FILE=<工作区>/srt-translator/index.html SRV=<工作区>/srt-translator/server.js PORT=3098 node verify284.js
      线上：node /tmp/verify284.js —— 默认路径就是线上
   ⚠️ 新段落插在尾部汇总之前，否则先 exit 了后面不跑（预演会假全 OK） */
const fs = require('fs');
const http = require('http');
const FILE = process.env.FILE || '/opt/srt-translator/index.html';
const SRV = process.env.SRV || '/opt/srt-translator/server.js';
const DIR = FILE.replace(/index\.html$/, '');
const PORT = process.env.PORT || 3000;
const R = [];
const add = (name, got, want) => R.push({ name, got, want });

/* ---------- ① 版号 ---------- */
const home = fs.readFileSync(FILE, 'utf8');
const rd = (f) => { try { return fs.readFileSync(DIR + f, 'utf8'); } catch (e) { return ''; } };
const ws = rd('translate.html'), mg = rd('merge.html'), cl = rd('clean.html'), ad = rd('admin.html');
add('index.html 顶栏版号', (home.match(/class="ver">v0\.9\.\d+/) || ['-'])[0], 'class="ver">v0.9.284');
add('translate.html 页脚版号', (ws.match(/ver-tag">v0\.9\.\d+/) || ['-'])[0], 'ver-tag">v0.9.284');
add('translate.html 缓存 bust', (ws.match(/srt-core\.js\?v=0\.9\.\d+/) || ['-'])[0], 'srt-core.js?v=0.9.284');
add('merge.html 顶栏版号', (mg.match(/class="ver">v0\.9\.\d+/) || ['-'])[0], 'class="ver">v0.9.284');
add('merge.html 缓存 bust', (mg.match(/merge-core\.js\?v=0\.9\.\d+/) || ['-'])[0], 'merge-core.js?v=0.9.284');
add('clean.html 缓存 bust', (cl.match(/clean-core\.js\?v=0\.9\.\d+/) || ['-'])[0], 'clean-core.js?v=0.9.284');

/* ---------- ② robots / favicon 源码层 ---------- */
let sv = '';
try { sv = fs.readFileSync(SRV, 'utf8'); } catch (e) { }
add('robots 声明 /data/', /Disallow: \/data\//.test(sv) ? 'yes' : 'MISSING', 'yes');
add('robots 仍声明 /admin.html', /Disallow: \/admin\.html/.test(sv) ? 'yes' : 'MISSING', 'yes');
add('admin.html 声明 favicon', /<link rel="icon"[^>]*href="\/favicon\.svg"/.test(ad) ? 'yes' : 'MISSING', 'yes');

/* ---------- ③ HTTP 实测 ---------- */
const probe = (p) => new Promise(r => {
  const q = http.get({ host: '127.0.0.1', port: PORT, path: p, headers: { 'Host': 'ai-srtsub.com', 'Accept-Encoding': 'identity' } }, res => {
    const code = res.statusCode, h = res.headers;
    res.resume();
    r({ code, h });
  });
  q.on('error', () => r({ code: 0, h: {} }));
  q.setTimeout(8000, () => { q.destroy(); r({ code: -1, h: {} }); });
});

(async () => {
  console.log('=== v0.9.284 核验：' + FILE + '（HTTP :' + PORT + '）===');
  let bad = 0;
  R.forEach(x => {
    const ok = String(x.got) === String(x.want);
    if (!ok) bad++;
    console.log((ok ? '  OK   ' : '  MISS ') + x.name + '  [' + x.got + ']' + (ok ? '' : '  期望[' + x.want + ']'));
  });

  console.log('--- 安全响应头（三个应有，CSP 必须没有）---');
  const root = await probe('/');
  const H = Object.keys(root.h).reduce((o, k) => { o[k.toLowerCase()] = root.h[k]; return o; }, {});
  [['x-content-type-options', 'nosniff'], ['referrer-policy', 'strict-origin-when-cross-origin'],
  ['x-frame-options', 'SAMEORIGIN']].forEach(pr => {
    const got = H[pr[0]] || 'MISSING';
    const ok = String(got).toLowerCase() === pr[1].toLowerCase();
    if (!ok) bad++;
    console.log((ok ? '  OK   ' : '  MISS ') + pr[0] + ' = ' + got);
  });
  const csp = H['content-security-policy'];
  const cspOk = !csp;
  if (!cspOk) bad++;
  console.log((cspOk ? '  OK   ' : '  MISS ') + 'content-security-policy 应缺失（内联脚本会挂） → ' + (csp || '(无)'));

  /* API 也要带头 */
  const api = await probe('/api/model-info');
  const AH = Object.keys(api.h).reduce((o, k) => { o[k.toLowerCase()] = api.h[k]; return o; }, {});
  const apiOk = AH['x-content-type-options'] === 'nosniff';
  if (!apiOk) bad++;
  console.log((apiOk ? '  OK   ' : '  MISS ') + 'API 响应同样带 nosniff → ' + (AH['x-content-type-options'] || 'MISSING'));

  console.log('--- 283 回归：/data 仍 404 ---');
  for (const p of ['/data/config.json', '/data/events.json', '/data/data.bak/config.json']) {
    const c = (await probe(p)).code;
    const ok = (c === 404);
    if (!ok) bad++;
    console.log((ok ? '  OK   ' : '  MISS ') + p + ' → ' + c);
  }

  console.log('--- 回归：正常资源 200 ---');
  for (const p of ['/', '/translate.html', '/merge.html', '/clean.html', '/admin.html',
    '/srt-core.js', '/site-i18n.js', '/favicon.svg', '/robots.txt', '/sitemap.xml']) {
    const c = (await probe(p)).code;
    const ok = (c === 200);
    if (!ok) bad++;
    console.log((ok ? '  OK   ' : '  MISS ') + p + ' → ' + c);
  }

  console.log('\n—— 核验：' + (R.length + 3 + 1 + 3 + 10) + ' 项，MISS ' + bad + ' ——');
  process.exit(bad ? 1 : 0);
})();
