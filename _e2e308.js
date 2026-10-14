/* v0.9.308 端到端：真起一个本地 server（独立空 data 目录），
   ① 公网 POST /api/tool-event 写六大 mock 条
   ② 首次登录拿 token
   ③ GET /api/admin/tool-events 校验汇总与明细
   ⚠️ 起服务 + 测试 + 杀进程必须塞在同一条 Bash 里（进程随调用结束被回收） */
'use strict';
const http = require('http');
const PORT = Number(process.env.SRV || 3611);   /* ⚠️ 一定要吃 SRV —— 写死端口会在服务起在别处时假报「服务没起来」 */

function req(method, url, body, headers) {
  return new Promise((res, rej) => {
    const r = http.request({ host: '127.0.0.1', port: PORT, path: url, method, headers: Object.assign({ 'Content-Type': 'application/json' }, headers || {}) }, resp => {
      let d = ''; resp.on('data', c => d += c); resp.on('end', () => res({ code: resp.statusCode, body: d }));
    });
    r.on('error', rej);
    if (body) r.write(JSON.stringify(body));
    r.end();
  });
}
const wait = ms => new Promise(r => setTimeout(r, ms));
let P = 0, F = 0;
const ok = (c, n, x) => { console.log((c ? '  ✓ ' : '  ✗ ') + n + (x !== undefined ? '  [' + String(x).slice(0, 120) + ']' : '')); c ? P++ : F++; };

(async () => {
  /* --- 探活 --- */
  let up = false;
  for (let i = 0; i < 40; i++) { try { await req('GET', '/api/model-info'); up = true; break; } catch (e) { } await wait(250); }
  if (!up) { console.log('服务没起来'); process.exit(1); }
  ok(true, '本地服务已起', PORT);

  /* --- ① 公网写入口 --- */
  const cases = [
    { page: 'shift', act: 'edit', cues: 142, n: 0 },
    { page: 'shift', act: 'export', cues: 142, n: 0, fmt: 'srt' },
    { page: 'convert', act: 'convert', cues: 88, n: 0 },
    { page: 'convert', act: 'export', cues: 88, n: 0, fmt: 'vtt' },
    { page: 'extract', act: 'extract', cues: 210, n: 5120 },
    { page: 'bilingual', act: 'split', cues: 64, n: 2 },
    { page: 'bilingual', act: 'export', cues: 32, n: 0, fmt: 'ass' },
    { page: 'repair', act: 'repair', cues: 0, n: 3 },
    { page: 'glossary', act: 'replace', cues: 300, n: 27 },
    { page: 'glossary', act: 'export', cues: 300, n: 27, fmt: 'srt' }
  ];
  for (const c of cases) {
    const r = await req('POST', '/api/tool-event', c);
    if (r.code !== 200) ok(false, '写入 ' + c.page + '/' + c.act, r.code + ' ' + r.body);
  }
  ok(true, '十条记录全部写入成功（HTTP 200）');

  /* 白名单外的必须被丢弃 */
  await req('POST', '/api/tool-event', { page: 'hack', act: 'steal', cues: 1 });
  await req('POST', '/api/tool-event', { page: 'shift', act: 'steal', cues: 1 });
  await req('POST', '/api/tool-event', { page: 'shift' });          /* 没 act */
  await req('POST', '/api/tool-event', { act: 'export' });          /* 没 page */
  ok(true, '四条非法组合已提交（下一步验总数时应被丢掉）');

  /* --- ② 首次登录拿 token --- */
  const lg = await req('POST', '/api/admin/login', { password: 'testpw1234' });
  ok(lg.code === 200, '首次登录成功', lg.code);
  const tk = JSON.parse(lg.body).token;
  ok(!!tk, '拿到 admin token', tk ? tk.slice(0, 8) + '…' : '无');

  /* --- ③ 后台读 --- */
  const g = await req('GET', '/api/admin/tool-events?page=1&size=5', null, { 'X-Admin-Token': tk });
  ok(g.code === 200, '后台接口 200', g.code);
  const j = JSON.parse(g.body);
  console.log('  ' + JSON.stringify(j).slice(0, 620));
  ok(j.total === 10, '总数 10（四条非法已被丢弃）', j.total);
  ok(j.pages === 2 && Array.isArray(j.events) && j.events.length === 5, '分页：10 条 / 每页 5 → 2 页', j.pages + '页 ' + (j.events || []).length + '条');
  ok(j.events[0].page === 'glossary' && j.events[0].act === 'export', '最新的排在最前（倒序）', j.events[0].page + '/' + j.events[0].act);

  /* 没有 token 不能读 */
  const ng = await req('GET', '/api/admin/tool-events');
  ok(ng.code !== 200 || !JSON.parse(ng.body).total, '未带 token 读不到', ng.code);

  /* byPage 六行齐 + 计数对得上 */
  const bp = j.byPage || [];
  ok(bp.length === 6, 'byPage 六行齐（没人用的页也要出现）', bp.length);
  const sum = bp.reduce((a, r) => a + r.n, 0);
  ok(sum === 10, 'byPage 各行计数之和 = 总数', sum);
  const gRow = bp.find(r => r.page === 'glossary');
  ok(gRow && gRow.n === 2 && gRow.exported === 1, 'glossary：2 条，其中 1 次导出', JSON.stringify(gRow));
  const bRow = bp.find(r => r.page === 'bilingual');
  ok(bRow && bRow.n === 2 && bRow.exported === 1, 'bilingual：2 条，其中 1 次导出', JSON.stringify(bRow));
  const sRow = bp.find(r => r.page === 'shift');
  ok(sRow && sRow.n === 2 && sRow.exported === 1, 'shift：2 条，其中 1 次导出', JSON.stringify(sRow));
  const rRow = bp.find(r => r.page === 'repair');
  ok(rRow && rRow.n === 1 && rRow.exported === 0, 'repair：1 条、0 导出（这正是要盯的「试了没拿走」）', JSON.stringify(rRow));
  ok(bp.every(r => typeof r.ips === 'number'), '每行都有 ip 去重数');
  ok(bp.every(r => typeof r.today === 'number' && r.today === r.n), '今日数 = 全部数（都是刚写的）');

  /* topActs / topFmts */
  ok((j.topActs || [])[0].name === 'export' && j.topActs[0].n === 4, '动作 TOP 第一是 export ×4', JSON.stringify((j.topActs || [])[0]));
  const fm = (j.topFmts || []).map(x => x.name + '×' + x.n).join(' ');
  ok(fm.indexOf('srt×2') >= 0 && fm.indexOf('vtt×1') >= 0 && fm.indexOf('ass×1') >= 0, '导出格式 TOP：srt×2 vtt×1 ass×1', fm);
  ok(!String(fm).match(/\(空\)/), 'TOP 里没有「(空)」（repair 不传 fmt 不该产生空桶）', fm);

  /* 今日汇总 */
  ok(j.today.count === 10 && j.today.exported === 4, '今日：10 条 / 导出 4 次', JSON.stringify(j.today));

  /* 第 2 页 */
  const p2 = await req('GET', '/api/admin/tool-events?page=2&size=5', null, { 'X-Admin-Token': tk });
  const j2 = JSON.parse(p2.body);
  ok((j2.events || []).length === 5 && j2.page === 2, '第 2 页也拿到 5 条', (j2.events || []).length);

  console.log('\n_e2e308: ' + P + ' 通过 / ' + F + ' 失败');
  process.exit(F ? 1 : 0);
})().catch(e => { console.error('崩了', e.message); process.exit(1); });
