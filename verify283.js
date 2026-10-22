/* v0.9.283 线上核验：
     ① 四页版号升到 283
     ② server.js 的 /data 拦截在（这是本版的全部意义）
     ③ HTTP 实测：/data/* 必须 404、正常资源必须 200
   ⚠️ 本地预演：FILE=<工作区>/srt-translator/index.html SRV=<工作区>/srt-translator/server.js node verify283.js
      线上直接：node /tmp/verify283.js —— 默认路径就是线上
   ⚠️ 新段落要插在尾部汇总之前，否则先 exit 了后面根本不跑（预演会假全 OK） */
const fs = require('fs');
const FILE = process.env.FILE || '/opt/srt-translator/index.html';
const SRV = process.env.SRV || '/opt/srt-translator/server.js';
const DIR = FILE.replace(/index\.html$/, '');
const R = [];
const add = (name, got, want) => R.push({ name, got, want });

/* ---------- ① 版号 ---------- */
const home = fs.readFileSync(FILE, 'utf8');
const Rv = (s) => (s.match(/v0\.9\.\d+/) || ['-'])[0];
add('index.html 顶栏版号', (home.match(/class="ver">v0\.9\.\d+/) || ['-'])[0], 'class="ver">v0.9.283');

const rd = (f) => { try { return fs.readFileSync(DIR + f, 'utf8'); } catch (e) { return ''; } };
const ws = rd('translate.html'), mg = rd('merge.html'), cl = rd('clean.html');
add('translate.html 页脚版号', (ws.match(/ver-tag">v0\.9\.\d+/) || ['-'])[0], 'ver-tag">v0.9.283');
add('translate.html 缓存 bust', (ws.match(/srt-core\.js\?v=0\.9\.\d+/) || ['-'])[0], 'srt-core.js?v=0.9.283');
add('merge.html 顶栏版号', (mg.match(/class="ver">v0\.9\.\d+/) || ['-'])[0], 'class="ver">v0.9.283');
add('merge.html 缓存 bust', (mg.match(/merge-core\.js\?v=0\.9\.\d+/) || ['-'])[0], 'merge-core.js?v=0.9.283');
add('clean.html 缓存 bust', (cl.match(/clean-core\.js\?v=0\.9\.\d+/) || ['-'])[0], 'clean-core.js?v=0.9.283');

/* ---------- ② server.js 的 /data 拦截 ---------- */
let sv = '';
try { sv = fs.readFileSync(SRV, 'utf8'); } catch (e) { }
const fn = sv.match(/function serveStatic\(req, res, urlPath\)\{[\s\S]*?\n\}/);
const body = fn ? fn[0] : '';
add('serveStatic 里存在 /data 拦截', /p === '\/data' \|\| p\.startsWith\('\/data\/'\)/.test(body) ? 'yes' : 'MISSING', 'yes');
add('data.bak 一并拦住', /\/data\.bak/.test(body) ? 'yes' : 'MISSING', 'yes');
add('拦截排在 path.join 之前',
  (body.indexOf("p.startsWith('/data/')") > 0 &&
    body.indexOf("p.startsWith('/data/')") < body.indexOf('path.normalize(path.join(ROOT, p))')) ? 'yes' : 'WRONG ORDER', 'yes');
add('判据未退化成宽匹配', /indexOf\(\s*['"]data['"]\s*\)/.test(body) ? 'WIDE MATCH' : 'precise', 'precise');

/* ---------- ③ HTTP 实测（本地预演时跳过，线上跑） ---------- */
const http = require('http');
const PORT = process.env.PORT || 3000;
const probe = (p) => new Promise(r => {
  const q = http.get({ host: '127.0.0.1', port: PORT, path: p, headers: { 'Host': 'ai-srtsub.com' } }, res => { res.resume(); r(res.statusCode); });
  q.on('error', () => r(0));
  q.setTimeout(5000, () => { q.destroy(); r(-1); });
});

(async () => {
  console.log('=== v0.9.283 核验：' + FILE + ' ===');
  let bad = 0;
  R.forEach(x => {
    const ok = String(x.got) === String(x.want);
    if (!ok) bad++;
    console.log((ok ? '  OK   ' : '  MISS ') + x.name + '  [' + x.got + ']' + (ok ? '' : '  期望[' + x.want + ']'));
  });

  console.log('--- HTTP 实测（data 必须 404 / 正常资源必须 200）---');
  const must404 = ['/data/config.json', '/data/events.json', '/data/usage.json',
    '/data/merge-events.json', '/data/clean-events.json', '/data/data.bak/config.json', '/data/'];
  const must200 = ['/', '/translate.html', '/merge.html', '/clean.html',
    '/srt-core.js', '/site-i18n.js', '/favicon.svg', '/robots.txt', '/sitemap.xml'];
  for (const p of must404) {
    const c = await probe(p);
    const ok = (c === 404);
    if (!ok) bad++;
    console.log((ok ? '  OK   ' : '  MISS ') + p + ' → ' + c + (ok ? '' : '  期望 404'));
  }
  for (const p of must200) {
    const c = await probe(p);
    const ok = (c === 200);
    if (!ok) bad++;
    console.log((ok ? '  OK   ' : '  MISS ') + p + ' → ' + c + (ok ? '' : '  期望 200'));
  }

  console.log('\n—— 核验：' + (R.length + must404.length + must200.length) + ' 项，MISS ' + bad + ' ——');
  process.exit(bad ? 1 : 0);
})();
