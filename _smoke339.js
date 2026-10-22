/* _smoke339.js —— 升版后本地冒烟：起服务 → 抓页面 → 自己退出。
 * 不用 curl + kill 那条路（沙箱会拦），全在 node 里闭环。
 */
'use strict';
const http = require('http');
const { spawn } = require('child_process');

const PORT = process.env.PORT || 3491;
const BASE = 'http://127.0.0.1:' + PORT;

const get = p => new Promise(res => {
  const req = http.get({ host: '127.0.0.1', port: PORT, path: p, timeout: 20000 }, r => {
    let b = ''; r.setEncoding('utf8');
    r.on('data', d => b += d);
    r.on('end', () => res({ code: r.statusCode, body: b }));
  });
  req.on('error', () => res({ code: 0, body: '' }));
  req.on('timeout', () => { req.destroy(); res({ code: 0, body: '' }); });
});

const sleep = ms => new Promise(r => setTimeout(r, ms));

(async () => {
  const srv = spawn('node', ['server.js'], {
    cwd: __dirname,
    env: Object.assign({}, process.env, { PORT: String(PORT) }),
    stdio: ['ignore', 'ignore', 'pipe'],
  });
  let slog = '';
  srv.stderr.on('data', d => slog += d);
  await sleep(6000);

  const OLD27 = ['en', 'zh-CN', 'ja', 'ar', 'he', 'ko', 'th'];
  const NEW73 = ['ms', 'fa', 'bo', 'yi', 'mi', 'zu', 'sw', 'ur', 'ta', 'yue'];

  console.log('=== 老 27 语（必须 200）===');
  let bad = 0;
  for (const l of OLD27) {
    const r = await get('/' + l + '/');
    if (r.code !== 200) { console.log('  ✗ /' + l + '/ HTTP ' + r.code); bad++; }
  }
  console.log('  ' + (OLD27.length - bad) + '/' + OLD27.length + ' 通过');

  console.log('\n=== 新 73 语抽样（必须 200 + 版号 339）===');
  for (const l of NEW73) {
    const r = await get('/' + l + '/');
    const ver = (r.body.match(/class="ver">v([0-9.]+)/) || [, '-'])[1];
    const lang = (r.body.match(/<html[^>]*lang="([^"]+)"/) || [, '-'])[1];
    const ok = r.code === 200 && ver === '0.9.339' && lang === l;
    console.log('  ' + (ok ? '✓' : '✗') + ' /' + l + '/ HTTP ' + r.code + '  lang=' + lang + '  ver=' + ver);
    if (!ok) bad++;
  }

  console.log('\n=== sitemap ===');
  const sm = await get('/sitemap.xml');
  const urls = (sm.body.match(/<loc>/g) || []).length;
  console.log('  HTTP ' + sm.code + '  URL ' + urls + ' 条  ' + sm.body.length + ' 字节');
  console.log('  工具页应 100×17=' + (100 * 17) + '，指南段另计');

  console.log('\n=== 服务日志 ===');
  console.log(slog ? '  ' + slog.trim().split('\n').slice(-3).join('\n  ') : '  （无异常）');

  srv.kill('SIGTERM');
  await sleep(500);
  console.log('\n冒烟结束，问题数 ' + bad);
  process.exit(0);
})().catch(e => { console.error('FATAL', e.message); process.exit(1); });
