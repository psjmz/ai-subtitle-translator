/* 取证：单语模式下 ASS「分屏 / 底部双行」两档到底有没有区别 */
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');
const http = require('http');
const PORT = 9333, BASE = 'http://127.0.0.1:3098';
const wait = ms => new Promise(r => setTimeout(r, ms));
function J(p) { return new Promise((res, rej) => { const r = http.request({ host: '127.0.0.1', port: PORT, path: p, method: 'PUT' }, x => { let d = ''; x.on('data', c => d += c); x.on('end', () => { try { res(JSON.parse(d)); } catch (e) { rej(new Error(d.slice(0, 200))); } }); }); r.on('error', rej); r.end(); }); }
const NL = String.fromCharCode(10);
const ZH = ['1', '00:00:01,000 --> 00:00:04,000', '第一行原文', '', '2', '00:00:05,000 --> 00:00:07,000', '第二行原文', ''].join(NL);
const EN = ['1', '00:00:01,000 --> 00:00:04,000', 'First line', '', '2', '00:00:05,000 --> 00:00:07,000', 'Second line', ''].join(NL);
const b64 = s => Buffer.from(s, 'utf8').toString('base64');

(async () => {
  const v = await J('/json/new?' + encodeURIComponent('about:blank'));
  const ws = new WebSocket(v.webSocketDebuggerUrl, { perMessageDeflate: false });
  let id = 0; const wt = new Map();
  await new Promise(r => ws.on('open', r));
  ws.on('message', m => { const g = JSON.parse(m); if (g.id && wt.has(g.id)) { const q = wt.get(g.id); wt.delete(g.id); g.error ? q.rej(new Error(JSON.stringify(g.error))) : q.res(g.result); } });
  const send = (m, p) => new Promise((res, rej) => { const i = ++id; wt.set(i, { res, rej }); ws.send(JSON.stringify({ id: i, method: m, params: p || {} })); });
  const ev = async e => { const r = await send('Runtime.evaluate', { expression: e, returnByValue: true, awaitPromise: true }); if (r.exceptionDetails) throw new Error((r.exceptionDetails.exception || {}).description); return r.result.value; };
  await send('Page.enable'); await send('Runtime.enable');
  await send('Network.setCacheDisabled', { cacheDisabled: true });
  await send('Emulation.setDeviceMetricsOverride', { width: 1320, height: 1200, deviceScaleFactor: 1, mobile: false });
  await send('Page.navigate', { url: BASE + '/merge.html' });
  await wait(2600);
  const step = s => ev(s);
  const load = (side, text, name) => `loadSide('${side}', decodeURIComponent(escape(atob(${JSON.stringify(b64(text))}))), ${JSON.stringify(name)});`;
  const setMode = m => `document.querySelector('#modeTabs input[name=workMode][value=${JSON.stringify(m)}]').click();`;

  const grab = `(function(){
    var out = buildExport();
    var styles = (out.match(/^Style:.*$/gm) || []).map(function(s){ var c=s.split(','); return c[0].replace('Style: ','')+'[字'+c[2]+']'; });
    var dialg  = (out.match(/^Dialogue:.*$/gm) || []).map(function(d){ var c=d.split(','); return 'style='+c[3].trim()+' MV='+c[8].trim(); });
    return JSON.stringify({styles:styles, dialg:dialg, bytes:out.length, pgוון:''});
  })()`;

  for (const mode of ['mono', 'merge']) {
    console.log('\n===== ' + (mode === 'mono' ? '单语模式' : '双语模式') + ' =====');
    await step('endDemo();');
    if (mode === 'mono') await step(load('src', ZH, 'clip.srt'));
    else { await step(load('src', ZH, 'zh.srt')); await step(load('dst', EN, 'en.srt')); }
    await step(setMode(mode));
    await step(mode === 'mono' ? 'doMono();' : 'doMerge();');
    for (const f of ['split', 'stack']) {
      await step(`setFmtSilently(${JSON.stringify(f)});`);
      const r = JSON.parse(await ev(grab));
      console.log(('  ' + f).padEnd(10) + ' Style: ' + r.styles.join(' | '));
      console.log('             Dialogue: ' + r.dialg.join(' | '));
    }
  }
  console.log('\n— 单语下 srcText 是否恒为空 —');
  await step('endDemo();'); await step(load('src', ZH, 'clip.srt')); await step(setMode('mono')); await step('doMono();');
  console.log('  monoParts().srcLines 全空: ' + await ev(`monoParts().every(function(p){ return (p.srcLines||[]).length === 0; })`));
  console.log('  ASS 顶部三档 v 单语下可见文案: ' + await ev(`Array.prototype.map.call(document.querySelectorAll('.seg button'), function(b){ return b.textContent.trim(); }).join(' / ')`));
  console.log('  custom 档那组 radio 文案: ' + await ev(`Array.prototype.map.call(document.querySelectorAll('input[name=assLayout]'), function(b){ return b.closest('label').textContent.trim(); }).join(' / ')`));
  process.exit(0);
})().catch(e => { console.error('出错：', e.message); process.exit(2); });
