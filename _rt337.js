/* v0.9.337 真环境回放：客户端出口 IP 每批轮换（住宅代理池）时，一条任务会不会被拆成多条。
   做法：起本地假上游 → 起被测 server.js（工作目录自带 data/）→ 用 CF-Connecting-IP 头轮换 IP
   连打 5 批 /api/translate（同一 taskId）→ 再换一个 IP 上报 finish → 读 events.json / stats.json。
   改前（旧 server.js）与改后各跑一遍，同一份输入同源对照。
   用法：node _rt337.js <工作目录> <端口> */
'use strict';
const fs = require('fs'), path = require('path'), http = require('http'), cp = require('child_process');

const WORK = process.argv[2];
const PORT = Number(process.argv[3] || 3396);
const MOCK = PORT + 500;
const NODE = process.execPath;

const IPS = ['31.171.100.11', '31.171.101.23', '31.171.100.47', '31.171.101.8', '31.171.100.92'];
const TASK = 'tmv337test01';
const FILE = 'The.SpongeBob.Movie.Sponge.Out.of.Water.2015.1080p.BluRay.x265-RARBG.en.srt';

const sleep = ms => new Promise(r => setTimeout(r, ms));

function startMock(){
  return new Promise(res => {
    const s = http.createServer((req, r2) => {
      req.on('data', () => {});
      req.on('end', () => {
        r2.writeHead(200, { 'Content-Type': 'application/json' });
        r2.end(JSON.stringify({
          choices: [{ message: { role: 'assistant', content: '1\n00:00:01,000 --> 00:00:02,000\nسلام' } }],
          usage: { prompt_tokens: 1000, completion_tokens: 200, prompt_cache_hit_tokens: 800 }
        }));
      });
    });
    s.listen(MOCK, '127.0.0.1', () => res(s));
  });
}
async function waitUp(port){
  for (let i = 0; i < 80; i++) {
    try { const r = await fetch('http://127.0.0.1:' + port + '/api/model-info'); await r.text(); return true; } catch (e) {}
    await sleep(250);
  }
  return false;
}
async function post(port, u, body, ip){
  const r = await fetch('http://127.0.0.1:' + port + u, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'CF-Connecting-IP': ip },
    body: JSON.stringify(body)
  });
  const t = await r.text();
  return { status: r.status, text: t.slice(0, 160) };
}

(async () => {
  const mock = await startMock();
  fs.mkdirSync(path.join(WORK, 'data'), { recursive: true });
  fs.writeFileSync(path.join(WORK, 'data', 'config.json'), JSON.stringify({
    base: 'http://127.0.0.1:' + MOCK + '/v1', model: 'mock-model', key: 'test-key',
    perIpDaily: 20, globalDaily: 300
  }, null, 2));
  ['events.json', 'stats.json', 'usage.json'].forEach(f => { try { fs.unlinkSync(path.join(WORK, 'data', f)); } catch (e) {} });

  const child = cp.spawn(NODE, ['server.js'], {
    cwd: WORK, env: Object.assign({}, process.env, { PORT: String(PORT) }), stdio: ['ignore', 'pipe', 'pipe']
  });
  let log = '';
  child.stdout.on('data', d => log += d);
  child.stderr.on('data', d => log += d);
  const up = await waitUp(PORT);
  if (!up) { console.log('SERVER NOT UP\n' + log.slice(0, 900)); child.kill(); mock.close(); process.exit(1); }

  /* 三个场景：
     rotate  = IP 轮换 + 同一 taskId（本次要修的场景）
     notask  = IP 轮换 + 不带 taskId（老前端口径，必须行为不变：IP 不同就是两个人）
     twotask = 同一 IP + 两个 taskId（同一个人连翻两次，必须仍是两条，不许被并成一条） */
  const SCENE = process.env.SCENE || 'rotate';
  const st5 = [];
  if (SCENE === 'twotask') {
    for (const tk of ['tmv337aaa', 'tmv337bbb']) {
      for (let i = 0; i < 3; i++) {
        const r = await post(PORT, '/api/translate', {
          messages: [{ role: 'user', content: 'translate this' }],
          meta: { file: FILE, lang: 'fa', taskId: tk, cues: 1200, src: 'en' }
        }, '31.171.100.11');
        st5.push(r.status);
      }
    }
  } else {
    for (const ip of IPS) {
      const r = await post(PORT, '/api/translate', {
        messages: [{ role: 'user', content: 'translate this' }],
        meta: SCENE === 'notask'
          ? { file: FILE, lang: 'fa', cues: 1200, src: 'en' }
          : { file: FILE, lang: 'fa', taskId: TASK, cues: 1200, src: 'en' }
      }, ip);
      st5.push(r.status);
    }
  }
  const finMeta = SCENE === 'notask'
    ? { ev: 'finish', file: FILE, lang: 'fa', model: 'mock-model' }
    : { ev: 'finish', file: FILE, lang: 'fa', taskId: SCENE === 'twotask' ? 'tmv337bbb' : TASK, model: 'mock-model' };
  const fin = await post(PORT, '/api/event', finMeta, SCENE === 'twotask' ? '31.171.100.11' : '31.171.101.200');

  await sleep(300);
  let ev = null, st = null;
  try { ev = JSON.parse(fs.readFileSync(path.join(WORK, 'data', 'events.json'), 'utf8')); } catch (e) {}
  try { st = JSON.parse(fs.readFileSync(path.join(WORK, 'data', 'stats.json'), 'utf8')); } catch (e) {}
  const list = (ev && ev.events) || [];
  console.log(JSON.stringify({
    场景: SCENE,
    work: WORK,
    translateStatus: st5,
    finishStatus: fin.status,
    事件条数: list.length,
    任务号: Array.from(new Set(list.map(e => e.taskId || '-'))),
    IP数: Array.from(new Set(list.map(e => e.ip))).length,
    batches: list.map(e => e.batches),
    ipSwap: list.map(e => e.ipSwap || 0),
    tkIn合计: list.reduce((a, e) => a + (e.tkIn || 0), 0),
    tkIn逐条: list.map(e => e.tkIn || 0),
    完成落在几条上: list.filter(e => e.finishedAt).length,
    自带Key记录数: list.filter(e => e.byok).length,
    字幕数subs: st ? st.subs : null
  }, null, 2));
  child.kill(); mock.close();
  process.exit(0);
})();
