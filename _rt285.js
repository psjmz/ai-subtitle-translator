/* v0.9.285 运行时测试：后台登录限流的真实 HTTP 行为
   ⚠️ 必须在隔离目录里跑 —— server.js 会读写同级的 data/config.json，
      直接跑会污染开发副本的本地配置（首次登录会把当前密码写成 adminHash）。
   流程：复制 server.js 到 /tmp/rt285 → 起服务 → 跑一轮锁定 → 重启验证解锁出口 */
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const NODE = process.execPath;
/* ⚠️ DIR 必须是隔离目录：脚本会在这里 mkdir data 并写入 config.json。
   SRC 指向被测 server.js（线上核验时传 /opt/srt-translator/server.js），
   绝不直接 cd 到线上应用目录跑 —— 那会覆盖线上真实配置。 */
const DIR = process.env.DIR || '/tmp/rt285';
const SRC = process.env.SRC || path.join(__dirname, 'server.js');
const PORT = process.env.PORT || 3099;
const BASE = 'http://127.0.0.1:' + PORT;

let PASS = 0, FAIL = 0;
function ok(cond, name, extra) {
  if (cond) { PASS++; console.log('  ✓ ' + name); }
  else { FAIL++; console.log('  ✗ ' + name + (extra !== undefined ? '  → ' + extra : '')); }
}
const sleep = ms => new Promise(r => setTimeout(r, ms));

function post(p, obj, ip) {
  const body = obj === null ? 'not-json' : JSON.stringify(obj);
  return new Promise((resolve) => {
    const req = require('http').request(BASE + p, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
        'X-Forwarded-For': ip
      }
    }, (res) => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => resolve({
        code: res.statusCode,
        retryAfter: res.headers['retry-after'] || null,
        body: d
      }));
    });
    req.on('error', () => resolve({ code: 0, retryAfter: null, body: '' }));
    req.end(body);
  });
}

async function waitUp() {
  for (let i = 0; i < 40; i++) {
    try {
      const r = await new Promise((resolve) => {
        const req = require('http').get(BASE + '/', (res) => { res.resume(); resolve(res.statusCode); });
        req.on('error', () => resolve(0));
      });
      if (r) return true;
    } catch (e) {}
    await sleep(250);
  }
  return false;
}

let proc = null;
async function start(fresh) {
  if (fresh) fs.rmSync(path.join(DIR, 'data'), { recursive: true, force: true });
  proc = spawn(NODE, [path.join(DIR, 'server.js')], {
    cwd: DIR,
    env: Object.assign({}, process.env, { PORT: String(PORT) }),
    stdio: ['ignore', 'pipe', 'pipe']
  });
  proc.stdout.on('data', () => {});
  proc.stderr.on('data', () => {});
  return waitUp();
}
function stop() { if (proc) { try { proc.kill('SIGKILL'); } catch (e) {} proc = null; } }

(async () => {
  console.log('\n══ v0.9.285 运行时实测：后台登录限流 ══');
  fs.rmSync(DIR, { recursive: true, force: true });
  fs.mkdirSync(DIR, { recursive: true });
  fs.copyFileSync(SRC, path.join(DIR, 'server.js'));

  ok(await start(true), '隔离服务已启动');

  /* ① 首次登录：初始化密码 */
  const r0 = await post('/api/admin/login', { password: 'RightHorse-2026' }, '10.0.0.1');
  ok(r0.code === 200 && /firstRun/.test(r0.body), '首次登录 200 并初始化管理密码', r0.code + ' ' + r0.body.slice(0, 60));

  /* ② 正确密码可登录 */
  const r1 = await post('/api/admin/login', { password: 'RightHorse-2026' }, '10.0.0.1');
  ok(r1.code === 200 && /token/.test(r1.body), '密码正确 → 200 拿到 token', r1.code);

  /* ③ 连续 3 次错误 */
  const codes = [];
  for (let i = 0; i < 3; i++) {
    const r = await post('/api/admin/login', { password: 'wrong-' + i }, '10.0.0.1');
    codes.push(r.code);
  }
  ok(codes.join(',') === '401,401,401', '前 3 次输错都回 401（第 3 次起锁定）', codes.join(','));

  /* ④ 锁定期内，密码正确也拒绝 */
  const r2 = await post('/api/admin/login', { password: 'RightHorse-2026' }, '10.0.0.1');
  ok(r2.code === 429, '锁定后即使密码正确也 429', r2.code + ' ' + r2.body.slice(0, 80));
  ok(r2.retryAfter && +r2.retryAfter > 82800 && +r2.retryAfter <= 86400,
    'Retry-After 落在 24 小时内（秒）', r2.retryAfter);
  ok(/自动解锁/.test(r2.body), '锁定文案说明解锁时间');

  /* ⑤ 换个 IP 仍被拒 —— 账户维度兜底分布式爆破 */
  const r3 = await post('/api/admin/login', { password: 'RightHorse-2026' }, '203.0.113.9');
  ok(r3.code === 429, '换 IP 后仍被拒（账户维度生效）', r3.code);

  /* ⑥ 空密码 / 坏 JSON 不消耗尝试次数（防被随手刷锁） */
  const r4 = await post('/api/admin/login', { password: '' }, '198.51.100.7');
  ok(r4.code === 400, '空密码 → 400（不计数）', r4.code);
  const r5 = await post('/api/admin/login', null, '198.51.100.7');
  ok(r5.code === 400, '坏 JSON → 400（不计数）', r5.code);
  const r6 = await post('/api/admin/login', { password: 'RightHorse-2026' }, '198.51.100.7');
  ok(r6.code === 429, '上述请求没解锁账户（仍是 429，说明仅密码正确才清零）', r6.code);

  /* ⑦ 紧急出口：重启服务即解锁 */
  stop(); await sleep(500);
  ok(await start(false), '重启后服务恢复');
  const r7 = await post('/api/admin/login', { password: 'RightHorse-2026' }, '10.0.0.1');
  ok(r7.code === 200, '重启后正确密码可登录（紧急出口可用）', r7.code);

  /* ⑧ 只错 2 次不该锁 */
  stop(); await sleep(300);
  await start(true);
  await post('/api/admin/login', { password: 'RightHorse-2026' }, '10.0.0.2');
  await post('/api/admin/login', { password: 'bad1' }, '10.0.0.2');
  await post('/api/admin/login', { password: 'bad2' }, '10.0.0.2');
  const r8 = await post('/api/admin/login', { password: 'RightHorse-2026' }, '10.0.0.2');
  ok(r8.code === 200, '错 2 次仍可正常登录（门槛确实是 3）', r8.code);

  /* ⑨ 成功后计数清零：错 2 次 → 成功 → 再错 2 次 → 仍可登录 */
  await post('/api/admin/login', { password: 'bad3' }, '10.0.0.2');
  await post('/api/admin/login', { password: 'bad4' }, '10.0.0.2');
  const r9 = await post('/api/admin/login', { password: 'RightHorse-2026' }, '10.0.0.2');
  ok(r9.code === 200, '错 4 次（中间成功过一次清零）仍未被锁', r9.code);

  stop();
  console.log('\n—— 运行时实测：通过 ' + PASS + ' / 失败 ' + FAIL + ' ——\n');
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error('崩了：', e); stop(); process.exit(1); });
