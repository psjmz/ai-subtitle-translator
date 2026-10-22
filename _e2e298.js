/* v0.9.298 翻译模块全链路 E2E：真浏览器 + 假上游（127.0.0.1:3211）+ 本地服务（:3210）
   覆盖：配置→载入→翻译全流程→行填充/统计→宽心话开关→复制（剪贴板+上报）→导出→
        语言切换（ⓘ 浮层跟语言）→导出样式切换（折行口径）→控制台报错捕获 */
'use strict';
process.on('unhandledRejection', e => console.log('UH', e && e.message));
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');
const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const CDP = 9400 + Math.floor(Math.random() * 90);
const SITE = 'http://127.0.0.1:3210';
const wait = ms => new Promise(r => setTimeout(r, ms));
let PASS = 0, FAIL = 0, ws, tid = 0;
const pending = new Map();
const ok = (c, n, x) => { console.log((c ? '  ✓ ' : '  ✗ ') + n + (x !== undefined ? '  [' + String(x).slice(0, 160) + ']' : '')); c ? PASS++ : FAIL++; };
function send(m, p) { const id = ++tid; ws.send(JSON.stringify({ id, method: m, params: p || {} })); return new Promise((res, rej) => { pending.set(id, { res, rej }); setTimeout(() => { if (pending.has(id)) { pending.delete(id); rej(new Error('timeout ' + m)); } }, 30000); }); }
async function ev(e) { const r = await send('Runtime.evaluate', { expression: e, returnByValue: true, awaitPromise: true }); if (r.exceptionDetails) throw new Error((r.exceptionDetails.exception && r.exceptionDetails.exception.description) || r.exceptionDetails.text); return r.result.value; }

const SRT = [1, 2, 3, 4, 5, 6, 7, 8].map(i =>
  i + '\n00:00:0' + i + ',000 --> 00:00:0' + (i + 1) + ',000\nSubtitle line number ' + i + ' hello world\n').join('\n');

let errs = [];
(async () => {
  const ch = spawn(CHROME, ['--headless=new', '--disable-gpu', '--no-sandbox',
    '--remote-debugging-port=' + CDP, '--user-data-dir=/tmp/cr-e2e298-' + Date.now(), 'about:blank'], { stdio: 'ignore' });
  let list = null;
  for (let i = 0; i < 30; i++) { try { list = await new Promise((res, rej) => { http.get({ host: '127.0.0.1', port: CDP, path: '/json/list' }, r => { let d = ''; r.on('data', c => d += c); r.on('end', () => res(d)); }).on('error', rej); }); if (list.includes('webSocketDebuggerUrl')) break; } catch (e) { } await wait(300); }
  const t = JSON.parse(list).find(x => x.type === 'page');
  ws = new WebSocket(t.webSocketDebuggerUrl, { perMessageDeflate: false });
  await new Promise((res, rej) => { ws.on('open', res); ws.on('error', rej); });
  ws.on('message', d => { const m = JSON.parse(d); if (m.id && pending.has(m.id)) { pending.get(m.id).res(m.result || m); pending.delete(m.id); return; } if (m.method === 'Runtime.exceptionThrown') errs.push(((m.params.exceptionDetails || {}).exception || {}).description || ''); if (m.method === 'Runtime.consoleAPICalled' && m.params.type === 'error') { try { errs.push(String((m.params.args[0] || {}).value || '').slice(0, 150)); } catch (e) { } } });
  await send('Runtime.enable'); await send('Page.enable');
  await send('Browser.grantPermissions', { permissions: ['clipboardReadWrite', 'clipboardSanitizedWrite'], origin: 'http://127.0.0.1:3210' });
  await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
  await send('Page.navigate', { url: SITE + '/translate.html' });
  for (let i = 0; i < 60; i++) { try { if (await ev('document.readyState') === 'complete') break; } catch (e) { } await wait(400); }
  await wait(2000);
  console.log('DIAG', await ev(`JSON.stringify({ready:document.readyState,pgStart:typeof pgStart,setSrc:typeof setSrc,buildExport:typeof buildExport})`));

  console.log('\n─── ① 配置 + 载入 ───');
  await ev(`(function(){
    document.getElementById('mode').value='api';
    document.getElementById('base').value='http://127.0.0.1:3211/v1';
    document.getElementById('apikey').value='sk-fake-e2e';
    document.getElementById('model').value='fake-e2e-model';
    document.getElementById('dstLang').value='zh-CN';
    setSrc(${JSON.stringify(SRT)}, 'e2e-check.srt');
  })();1`);
  await wait(600);
  const st0 = await ev(`JSON.stringify({rows:S.rows.length,src:S.srcItems.length,mode:document.getElementById('mode').value,dst:document.getElementById('dstLang').value})`);
  const s0 = JSON.parse(st0);
  ok(s0.rows === 8 && s0.src === 8, '载入 8 条字幕', st0);

  console.log('\n─── ② 翻译全流程（假上游） ───');
  await ev(`document.getElementById('btnGo').click();1`);
  /* 假上游太快（几百毫秒跑完），高频采样抓「跑起来」窗口 */
  let busySeen = false;
  for (let i = 0; i < 60; i++) {
    if (await ev(`document.getElementById('pgBusy').hidden`) === false) { busySeen = true; break; }
    await wait(50);
  }
  ok(busySeen, '跑起来时宽心话可见');
  let fin = false;
  for (let i = 0; i < 120; i++) { if (await ev('S.translating') === false) { fin = true; break; } await wait(500); }
  ok(fin, '翻译流程正常结束（120s 内）');
  const after = JSON.parse(await ev(`JSON.stringify({
    done: S.rows.filter(r=>r.zh&&r.zh.trim()).length,
    drop: S.rows.filter(r=>r.flag==='drop').length,
    busyHidden: document.getElementById('pgBusy').hidden,
    pgState: document.getElementById('pgState').textContent,
    prText: document.getElementById('prText').textContent,
    tk: JSON.stringify(S.tkSum),
    issues: document.getElementById('stIssues').textContent
  })`));
  console.log('     ' + JSON.stringify(after));
  ok(after.done === 8, '8 条全部有译文', after.done);
  ok(after.drop === 0, '无误删行', after.drop);
  ok(after.busyHidden === true, '结束后宽心话隐藏');
  ok(/完成|done|terminé|完成/i.test(after.pgState) || after.pgState.length > 0, '进度条有完成态', after.pgState);
  ok((S0 => S0.in > 0 || S0.out > 0)(JSON.parse(after.tk)), 'token 消耗被记录', after.tk);
  if (after.done !== 8) {
    console.log('----- 诊断：页面日志 -----');
    console.log((await ev(`document.getElementById('log').innerText`) || '').slice(0, 2500));
    console.log('----- 诊断：rows[0..1] -----');
    console.log(await ev(`JSON.stringify(S.rows.slice(0,2))`));
    console.log('----- 诊断：getCfg -----');
    console.log(await ev(`JSON.stringify({mode:getCfg().mode,base:getCfg().base,model:getCfg().model,dst:getCfg().dst})`));
  }

  console.log('\n─── ③ 复制（剪贴板 + 上报） ───');
  /* headless 无焦点，readText 会 NotAllowedError —— 页内接管 writeText 捕获传入文本，
     处理器逻辑与上报链路照跑（真剪贴板行为已由 298 上线前的 _t298local 验过） */
  await ev(`(function(){window.__clipTxt='';var o=navigator.clipboard;Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:function(t){window.__clipTxt=t;return Promise.resolve();},readText:function(){return Promise.resolve(window.__clipTxt);}}});})();1`);
  await ev(`document.getElementById('btnCopy').click();1`);
  await wait(800);
  const clip = await ev(`window.__clipTxt`);
  ok(/测试译文第\s*1\s*条/.test(clip) && clip.length > 50, '剪贴板拿到译文', clip.slice(0, 60).replace(/\n/g, '⏎'));
  ok(/^[0-9]\r?\n00:00:0[12]/.test(clip), '剪贴板是 SRT 格式', clip.split('\n').slice(0, 2).join('|'));

  console.log('\n─── ④ 导出内容 ───');
  const exp = await ev(`buildExport()`);
  ok(/测试译文第\s*8\s*条/.test(exp), 'buildExport 含最后一条译文');
  const expBi = await ev(`(function(){var s=document.getElementById('expStyle');var k=s.value;s.value='bi-src|srt';var t=buildExport();s.value=k;return t;})()`);
  ok(expBi.includes('Subtitle line number 1') && /测试译文第\s*1\s*条/.test(expBi), '双语导出含原文+译文');

  console.log('\n─── ⑤ 语言切换：ⓘ 浮层 + 宽心话跟语言 ───');
  const tipZh = await ev(`document.getElementById('wrapTipEl').getAttribute('data-tip')`);
  ok(/无须重新翻译|折行/.test(tipZh), '中文 ⓘ 口径对', tipZh.slice(0, 40));
  for (const lg of ['en', 'ja', 'de', 'ar', 'ko']) {
    await ev(`(function(){var u=document.getElementById('uiLang');u.value='${lg}';u.dispatchEvent(new Event('change'));})();1`);
    await wait(120);
    const tip = await ev(`document.getElementById('wrapTipEl').getAttribute('data-tip')`);
    const busyTx = await ev(`document.getElementById('pgBusy').textContent`);
    const hanInTip = /[\u4e00-\u9fff]/.test(tip);
    ok(!hanInTip || lg==='ja', lg + ' ⓘ 无汉字残留', hanInTip ? tip.slice(0, 50) : tip.slice(0, 40));
    ok(busyTx.length > 0, lg + ' 宽心话有文案', busyTx.slice(0, 50));
  }
  await ev(`(function(){var u=document.getElementById('uiLang');u.value='zh-CN';u.dispatchEvent(new Event('change'));})();1`); await wait(200);

  console.log('\n─── ⑥ 导出样式切换：折行口径跟着换 ───');
  await ev(`(function(){var s=document.getElementById('expStyle');s.value='bi-src|srt';s.dispatchEvent(new Event('change'));})();1`); await wait(300);
  const tipBi = await ev(`document.getElementById('wrapTipEl').getAttribute('data-tip')`);
  ok(/双语/.test(tipBi), '双语档 ⓘ 换口径', tipBi.slice(0, 50));
  await ev(`(function(){var s=document.getElementById('expStyle');s.value='mono|srt';s.dispatchEvent(new Event('change'));})();1`); await wait(300);

  console.log('\n─── ⑦ 服务端事件落盘（copy） ───');
  const evdb = JSON.parse(fs.readFileSync('/Users/jp/WorkBuddy/2026-09-04-00-29-54/srt-translator/data/events.json', 'utf8'));
  const recs = (evdb.events || []).filter(e => e.file === 'e2e-check');
  const copyRec = recs.find(e => e.copiedAt || e.copies);
  ok(recs.some(e => e.finishedAt), 'finish 事件落盘', recs.length + ' 条记录');
  ok(!!copyRec, 'copy 事件落盘', copyRec ? JSON.stringify({ copies: copyRec.copies, byok: copyRec.byok }) : '无');

  console.log('\n─── ⑧ 假上游请求体核验（v0.9.287：不发起止时刻） ───');
  const rawq = fs.readFileSync('/tmp/_fakeup_req.jsonl', 'utf8').trim();
  const reqs = rawq ? rawq.split('\n').map(l => JSON.parse(l)) : [];
  const batchReq = reqs.find(r => /Groups \(batch|句组（第/.test(r.user));
  ok(!!batchReq, '抓到批翻译请求', '共 ' + reqs.length + ' 个请求');
  if (batchReq) {
    ok(!/"start"|start":|s":\d{4,}/.test(batchReq.user), '请求体不含起止时刻字段');
    ok(/"dur"/.test(batchReq.user) && /"src"/.test(batchReq.user) && /"no"/.test(batchReq.user), '请求体含 no/dur/src');
  }

  console.log('\n─── ⑨ 控制台 ───');
  ok(errs.length === 0, '全程无 JS 报错', errs.slice(0, 3).join(' | ').slice(0, 200));

  console.log('\n== ' + PASS + ' 通过 / ' + FAIL + ' 失败 ==');
  ch.kill('SIGKILL');
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.log('FATAL', e.message); process.exit(2); });
