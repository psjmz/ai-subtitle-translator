/* v0.9.285 线上核验：
     ① 四页版号升到 285
     ② 登录限流逻辑已就位（源码层：常量 / 双计数 / 顺序 / 429 / 清零）
     ③ 284 的三个安全头仍在（回归）
     ④ 283 的 /data 拦截仍有效（回归）
     ⑤ 正常资源仍 200（回归）

   ⚠️⚠️ 线上**不跑真实失败登录**（本脚本刻意没有）：
     在公网连错 3 次会把线上账户和来源 IP 一起锁 24 小时 ——
     核验脚本自己把自己锁在门外，且线上真管理员也进不去。
     真实行为由 _rt285.js 在 /tmp 隔离目录里跑（改的是副本，不动线上配置）。

   ⚠️ 本地预演：FILE=<工作区>/srt-translator/index.html SRV=<工作区>/srt-translator/server.js PORT=3098 node verify285.js
      线上：node /tmp/verify285.js —— 默认路径就是线上
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
const ws = rd('translate.html'), mg = rd('merge.html'), cl = rd('clean.html');
add('index.html 顶栏版号', (home.match(/class="ver">v0\.9\.\d+/) || ['-'])[0], 'class="ver">v0.9.285');
add('index.html 词典缓存 bust', (home.match(/site-i18n\.js\?v=0\.9\.\d+/) || ['-'])[0], 'site-i18n.js?v=0.9.285');
add('translate.html 页脚版号', (ws.match(/ver-tag">v0\.9\.\d+/) || ['-'])[0], 'ver-tag">v0.9.285');
add('translate.html 缓存 bust', (ws.match(/srt-core\.js\?v=0\.9\.\d+/) || ['-'])[0], 'srt-core.js?v=0.9.285');
add('merge.html 顶栏版号', (mg.match(/class="ver">v0\.9\.\d+/) || ['-'])[0], 'class="ver">v0.9.285');
add('merge.html 缓存 bust', (mg.match(/merge-core\.js\?v=0\.9\.\d+/) || ['-'])[0], 'merge-core.js?v=0.9.285');
add('clean.html 缓存 bust', (cl.match(/clean-core\.js\?v=0\.9\.\d+/) || ['-'])[0], 'clean-core.js?v=0.9.285');

/* ---------- ② 限流逻辑（源码层） ---------- */
let sv = '';
try { sv = fs.readFileSync(SRV, 'utf8'); } catch (e) { }
const yes = (re) => (re.test(sv) ? 'yes' : 'MISSING');
add('限流门槛 = 3 次', yes(/const LOGIN_MAX_FAIL = 3;/), 'yes');
add('锁定时长 = 24 小时', yes(/const LOGIN_LOCK_MS = 24 \* 60 \* 60 \* 1000;/), 'yes');
add('IP 维度计数', yes(/const loginIp = new Map\(\);/), 'yes');
add('账户维度计数', yes(/let loginAcct = \{ n: 0, until: 0 \};/), 'yes');
add('锁定检查函数', yes(/function loginLocked\(/), 'yes');
add('成功清零函数', yes(/function loginReset\(/), 'yes');
add('失败累加函数', yes(/function loginBump\(/), 'yes');
add('过期清理函数', yes(/function loginSweep\(/), 'yes');
add('锁定响应 429', yes(/429/), 'yes');
add('锁定响应带 Retry-After', yes(/Retry-After/), 'yes');

/* 顺序：loginLocked 必须早于密码校验 —— 这是整个限流的命门 */
(() => {
  const from = sv.indexOf("u === '/api/admin/login'");
  const to = sv.indexOf('/* 以下管理接口需 token */', from);
  if (from < 0 || to < from) { add('登录分支结构', 'MISSING', 'yes'); return; }
  const h = sv.slice(from, to);
  const iLock = h.indexOf('loginLocked(now, ip)');
  const iPass = h.indexOf('sha256(pw) === cfg.adminHash');
  add('锁定检查排在密码校验之前', (iLock > 0 && iPass > 0 && iLock < iPass) ? 'yes' : 'MISSING', 'yes');
  add('登录成功清零', /loginReset\(ip\)/.test(h) ? 'yes' : 'MISSING', 'yes');
  add('登录失败累加', /loginBump\(now, ip\)/.test(h) ? 'yes' : 'MISSING', 'yes');
})();

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
  console.log('=== v0.9.285 核验：' + FILE + '（HTTP :' + PORT + '）===');
  let bad = 0;
  const line = (ok, name, got) => { if (!ok) bad++; console.log((ok ? '  OK   ' : '  MISS ') + name + '  → ' + got); };

  R.forEach(x => {
    const ok = String(x.got) === String(x.want);
    line(ok, x.name, x.got + (ok ? '' : '  期望[' + x.want + ']'));
  });

  console.log('--- 284 回归：三个安全头仍在、CSP 仍无 ---');
  const root = await probe('/');
  const H = Object.keys(root.h).reduce((o, k) => { o[k.toLowerCase()] = root.h[k]; return o; }, {});
  [['x-content-type-options', 'nosniff'], ['referrer-policy', 'strict-origin-when-cross-origin'],
  ['x-frame-options', 'SAMEORIGIN']].forEach(pr => {
    const got = H[pr[0]] || 'MISSING';
    line(String(got).toLowerCase() === pr[1].toLowerCase(), pr[0], got);
  });
  line(!H['content-security-policy'], 'content-security-policy 应缺失', H['content-security-policy'] || '(无)');

  console.log('--- 283 回归：/data 仍 404 ---');
  for (const p of ['/data/config.json', '/data/events.json', '/data/data.bak/config.json']) {
    line((await probe(p)).code === 404, p, (await probe(p)).code);
  }

  console.log('--- 回归：正常资源 200 ---');
  for (const p of ['/', '/translate.html', '/merge.html', '/clean.html', '/admin.html',
    '/srt-core.js', '/site-i18n.js', '/favicon.svg', '/robots.txt', '/sitemap.xml']) {
    line((await probe(p)).code === 200, p, (await probe(p)).code);
  }

  console.log('\n—— 核验：' + (R.length + 3 + 1 + 3 + 10) + ' 项，MISS ' + bad + ' ——');
  process.exit(bad ? 1 : 0);
})();
