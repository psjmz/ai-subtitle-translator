/* v0.9.268 实测：结果区加「清洗后字幕」全文预览
   由来：用户上传后结果区只显示「没有需要清洗的地方」——因为那块本来只列「改了哪几条」的对照表，
        整篇字幕必须下载才看得到。字幕干净时表格 0 行，看着就像什么都没出来。
   验什么：
     ① 干净字幕（用户场景）也能看到整篇
     ② 预览内容 == 导出内容（同一份 resolve()，逐字比对，不许各画一套）
     ③ 「原文」视图保留被删条目并划掉
     ④ 大文件只渲染前 500 条并交代清楚（几千条 DOM 会拖死页面）
     ⑤ 中英两套词条都齐（漏一个就是 undefined 直接糊在界面上）
     ⑥ 没抛异常 */
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');
const http = require('http');
const PORT = 9333, BASE = 'http://127.0.0.1:3098';
const wait = ms => new Promise(r => setTimeout(r, ms));
let PASS = 0, FAIL = 0;
const ok = (c, n, x) => { console.log((c ? '  ✓ ' : '  ✗ ') + n + (x !== undefined ? '  [' + x + ']' : '')); c ? PASS++ : FAIL++; };
const J = p => new Promise((res, rej) => { const r = http.request({ host: '127.0.0.1', port: PORT, path: p, method: 'PUT' }, x => { let d = ''; x.on('data', c => d += c); x.on('end', () => { try { res(JSON.parse(d)); } catch (e) { rej(new Error(d.slice(0, 200))); } }); }); r.on('error', rej); r.end(); });
const NL = String.fromCharCode(10);
const b64 = s => Buffer.from(s, 'utf8').toString('base64');

const CLEAN = ['1', '00:00:01,000 --> 00:00:03,000', '你好，欢迎收看。', '',
  '2', '00:00:04,000 --> 00:00:07,000', '今天我们来聊聊字幕。', ''].join(NL);
const DIRTY = ['1', '00:00:01,000 --> 00:00:03,000', '{\\i1}Hello there{\\i0}', '',
  '2', '00:00:03,500 --> 00:00:06,000', '[MUSIC PLAYING]', '',
  '3', '00:00:06,500 --> 00:00:09,000', '本字幕由 XX 字幕组 提供', '',
  '4', '00:00:09,500 --> 00:00:12,000', 'Hello there', '',
  '5', '00:00:12,500 --> 00:00:15,000', '', '',
  '6', '00:00:15,500 --> 00:00:18,000', 'How are you ？？', ''].join(NL);
const BIG = (function () {
  const a = [];
  for (let i = 1; i <= 620; i++) {
    a.push(String(i), '00:' + String((i / 60) | 0).padStart(2, '0') + ':' + String(i % 60).padStart(2, '0') + ',000 --> 00:' +
      String((i / 60) | 0).padStart(2, '0') + ':' + String((i + 1) % 60).padStart(2, '0') + ',000', '第 ' + i + ' 条字幕', '');
  }
  return a.join(NL);
})();

(async () => {
  const v = await J('/json/new?' + encodeURIComponent('about:blank'));
  const ws = new WebSocket(v.webSocketDebuggerUrl, { perMessageDeflate: false });
  let id = 0; const wt = new Map(); const errs = [];
  await new Promise(r => ws.on('open', r));
  ws.on('message', m => { const g = JSON.parse(m);
    if (g.id && wt.has(g.id)) { const q = wt.get(g.id); wt.delete(g.id); g.error ? q.rej(new Error(JSON.stringify(g.error))) : q.res(g.result); }
    if (g.method === 'Runtime.exceptionThrown') errs.push(((g.params.exceptionDetails.exception || {}).description) || g.params.exceptionDetails.text); });
  const send = (m, p) => new Promise((res, rej) => { const i = ++id; wt.set(i, { res, rej }); ws.send(JSON.stringify({ id: i, method: m, params: p || {} })); });
  const ev = async e => { const r = await send('Runtime.evaluate', { expression: e, returnByValue: true, awaitPromise: true });
    if (r.exceptionDetails) throw new Error((r.exceptionDetails.exception || {}).description || r.exceptionDetails.text); return r.result.value; };
  await send('Page.enable'); await send('Runtime.enable');
  await send('Network.setCacheDisabled', { cacheDisabled: true });
  await send('Emulation.setDeviceMetricsOverride', { width: 1200, height: 1400, deviceScaleFactor: 1, mobile: false });
  await send('Page.navigate', { url: BASE + '/clean.html' });
  await wait(2600);
  const load = txt => ev(`setSource(decodeURIComponent(escape(atob(${JSON.stringify(b64(txt))}))), 'clip.srt')`);
  const pvLines = () => ev(`[].map.call(document.querySelectorAll('#pvBox .pv-line .x'), function(e){return e.textContent;})`);
  const pvN = () => ev(`document.querySelectorAll('#pvBox .pv-line').length`);
  const clickSeg = vv => ev(`document.querySelector('#pvSeg button[data-v=${JSON.stringify(vv)}]').click()`);
  const onSeg = () => ev(`(document.querySelector('#pvSeg button.on')||{getAttribute:function(){return 'NONE'}}).getAttribute('data-v')`);

  console.log('【① 干净字幕：用户遇到的场景，现在能看到整篇】');
  await load(CLEAN); await wait(400);
  const emptyShown = await ev(`document.getElementById('emptyNote').style.display === '' ? 'SHOWN' : 'hidden'`);
  const c1 = await pvLines();
  console.log('  表格空提示=' + emptyShown + '  预览=' + JSON.stringify(c1));
  ok(emptyShown === 'SHOWN', '改动表仍是 0 行（这份字幕确实干净）', emptyShown);
  ok(c1.length === 2, '预览照样列出整篇 2 条（不再只有一句「已经是干净的」）', c1.length);
  ok(c1[0] === '你好，欢迎收看。' && c1[1] === '今天我们来聊聊字幕。', '预览文案与源文件逐字一致', JSON.stringify(c1));
  ok(String(await ev(`(document.getElementById('pvTitle')||{}).textContent`)).indexOf('2') >= 0, '标题带上条数', await ev(`(document.getElementById('pvTitle')||{}).textContent`));

  console.log('\n【② 预览 == 导出（同一份 resolve()，不许各画一套）】');
  await load(DIRTY); await wait(400);
  const pvOut = await pvLines();
  const expOut = await ev(`(function(){var it=resolve();C.renumber(it);return it.map(function(x){return x.text;});})()`);
  ok(JSON.stringify(pvOut) === JSON.stringify(expOut), '预览每条文本与导出结果逐字相同', JSON.stringify(pvOut) + ' vs ' + JSON.stringify(expOut));
  const dlSame = await ev(`(function(){
    var pv=[].map.call(document.querySelectorAll('#pvBox .pv-line .x'),function(e){return e.textContent;});
    var dl=outMain().split('\\n').filter(function(l){return l && !/^\\d+$/.test(l) && l.indexOf('-->')<0;});
    return JSON.stringify(pv)===JSON.stringify(dl);})()`);
  ok(dlSame, '与「下载字幕」拿到的文本也一致', dlSame);

  console.log('\n【③ 「原文」视图：保留被删条目并划掉】');
  await clickSeg('raw'); await wait(300);
  const rawN = await pvN();
  const gone = await ev(`document.querySelectorAll('#pvBox .pv-line.gone').length`);
  const rawT = await ev(`(document.getElementById('pvTitle')||{}).textContent`);
  ok(await onSeg() === 'raw', '切到「原文」后按钮高亮跟着走', await onSeg());
  ok(rawN === 6, '原文视图是全部 6 条（含被删的）', rawN);
  ok(gone > 0, '被删的条目标出来并划掉', gone + ' 条已移除');
  ok(String(rawT).indexOf('原始字幕') >= 0, '标题跟着切成「原始字幕」', rawT);
  await clickSeg('out'); await wait(300);
  ok(await pvN() === 3, '切回「清洗后」是 3 条（删掉的不算）', await pvN());

  console.log('\n【④ 大文件：只画前 500 条并交代清楚】');
  await load(BIG); await wait(700);
  const bigN = await pvN();
  const more = await ev(`(function(){var e=document.querySelector('#pvBox .pv-more');return e?e.textContent:'NONE';})()`);
  console.log('  渲染 ' + bigN + ' 条 / 提示 -> ' + more);
  ok(bigN === 500, '620 条只渲染前 500 条（否则 DOM 会把页面拖死）', bigN);
  ok(more.indexOf('620') >= 0 && more.indexOf('500') >= 0, '明确告诉用户「只显示前 500 / 共 620」', more);

  console.log('\n【⑤ 中英两套词条】');
  const PVKEYS = ['pvTitle', 'pvTitleRaw', 'pvUnit', 'pvOut', 'pvRaw', 'pvNone', 'pvMore'];
  constzh = await ev(`${JSON.stringify(PVKEYS)}.map(function(k){return t(k);})`);
  ok(constzh.length === 7 && constzh.every(s => typeof s === 'string' && s && s.indexOf('undefined') < 0), '中文七条都在', JSON.stringify(constzh));
  await ev(`document.getElementById('langSel').value='en';document.getElementById('langSel').dispatchEvent(new Event('change'))`);
  await wait(500);
  const zen = await ev(`${JSON.stringify(PVKEYS)}.map(function(k){return t(k);})`);
  ok(zen.length === 7 && zen.every(s => typeof s === 'string' && s && s.indexOf('undefined') < 0), '英文七条都在', JSON.stringify(zen));
  ok(zen.join('|') !== constzh.join('|'), '英文确实换了一套词（不是直接回显 key）', JSON.stringify(zen));
  const segTxt = await ev(`[].map.call(document.querySelectorAll('#pvSeg button'),function(b){return b.textContent;}).join('/')`);
  ok(segTxt === 'Cleaned/Original', '切换按钮文案跟着换英文', segTxt);
  const uiTitle = await ev(`(document.getElementById('pvTitle')||{}).textContent`);
  ok(String(uiTitle).indexOf('Cleaned') >= 0, '标题也是英文', uiTitle);
  await ev(`document.getElementById('langSel').value='zh-CN';document.getElementById('langSel').dispatchEvent(new Event('change'))`);
  await wait(400);

  console.log('\n【⑥ 老行为没被动过】');
  await load(DIRTY); await wait(400);
  ok(await ev(`document.querySelectorAll('#tbody tr').length`) === 5, '改动对照表仍是 5 行', await ev(`document.querySelectorAll('#tbody tr').length`));
  ok(String(await ev(`(document.getElementById('statRow')||{}).textContent`)).indexOf('清洗后') >= 0, '统计胶囊还在', await ev(`(document.getElementById('statRow')||{}).textContent`));
  ok(String(await ev(`outExt()`)) === '.srt', '导出后缀仍是 .srt', await ev(`outExt()`));
  ok(errs.length === 0, '整轮没抛 JS 异常', errs.slice(0, 2).join(' | ') || 'none');

  console.log('\n通过 ' + PASS + ' / 失败 ' + FAIL);
  ws.close(); process.exit(FAIL ? 1 : 0);
})();
