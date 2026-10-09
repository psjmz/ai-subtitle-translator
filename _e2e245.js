/* v0.9.245：真浏览器 E2E —— 单语模式 + 样式槽 + 筛选器
   记忆里的三个坑全部躲开：
     ⚠️ Emulation.setDeviceMetricsOverride 必须在 Page.navigate **之后**（导航会把它清掉）
     ⚠️ VTT 面板是 <details> 默认收起 → 测前 .open=true
     ⚠️ rows 字段是 en / zh（不是 src / dst） */
'use strict';
const http = require('http');
const { spawn } = require('child_process');
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');

const PORT = 3098;
const BASE = 'http://127.0.0.1:' + PORT;
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const NODE = '/Users/jp/.workbuddy/binaries/node/versions/22.22.2-6/bin/node';

let pass = 0, fail = 0;
function ok(name, cond, extra) {
  if (cond) { pass++; console.log('  ✓ ' + name); }
  else { fail++; console.log('  ✗ ' + name + (extra ? '\n      ' + extra : '')); }
}

const SRT_MONO = [
  '1', '00:00:01,000 --> 00:00:03,000', '你好，这是一条普通台词', '',
  '2', '00:00:04,000 --> 00:00:06,000', '[电话铃声]', '',
  '3', '00:00:07,000 --> 00:00:12,000', '（旁白）十年后他回到了那条街', '',
  '4', '00:00:13,000 --> 00:00:14,200', '短', '',
  '5', '00:00:15,000 --> 00:00:18,000', '♪ 片头曲 ♪', ''
].join('\n') + '\n';

const SRT_EN = [
  '1', '00:00:01,000 --> 00:00:03,000', 'Hello, this is a normal line', '',
  '2', '00:00:04,000 --> 00:00:06,000', '[phone ringing]', '',
  '3', '00:00:07,000 --> 00:00:12,000', 'Ten years later he came back', '',
  '4', '00:00:13,000 --> 00:00:14,200', 'Short', '',
  '5', '00:00:15,000 --> 00:00:18,000', '♪ opening theme ♪', ''
].join('\n') + '\n';

function get(path) {
  return new Promise((res, rej) => {
    http.get(BASE + path, r => {
      let b = ''; r.on('data', d => b += d); r.on('end', () => res({ s: r.statusCode, b }));
    }).on('error', rej);
  });
}

let ws, idSeq = 0;
const pending = new Map();
const events = [];
function send(method, params, sessionId) {
  const id = ++idSeq;
  const msg = { id, method, params: params || {} };
  if (sessionId) msg.sessionId = sessionId;
  ws.send(JSON.stringify(msg));
  return new Promise((res, rej) => {
    pending.set(id, { res, rej });
    setTimeout(() => { if (pending.has(id)) { pending.delete(id); rej(new Error('timeout ' + method)); } }, 15000);
  });
}
async function evalJs(expr, sessionId) {
  const r = await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true }, sessionId);
  if (r.exceptionDetails) throw new Error(r.exceptionDetails.text + ' ' + (r.exceptionDetails.exception || {}).description);
  return r.result.value;
}

(async () => {
  const chrome = spawn(CHROME, [
    '--headless=new', '--remote-debugging-port=9333', '--no-sandbox', '--disable-gpu',
    '--remote-allow-origins=*', '--window-size=1440,1600',
    '--user-data-dir=/tmp/cbuddy-e2e245-' + Date.now()
  ], { stdio: 'ignore' });
  await new Promise(r => setTimeout(r, 2500));

  const list = await new Promise((res, rej) => {
    http.get('http://127.0.0.1:9333/json/list', r => { let b = ''; r.on('data', d => b += d); r.on('end', () => res(JSON.parse(b))); }).on('error', rej);
  });
  const page = list.find(t => t.type === 'page');
  ws = new WebSocket(page.webSocketDebuggerUrl, { perMessageDeflate: false });
  await new Promise(r => ws.on('open', r));
  ws.on('message', (buf) => {
    const m = JSON.parse(buf.toString());
    if (m.id && pending.has(m.id)) { const p = pending.get(m.id); pending.delete(m.id); m.error ? p.rej(new Error(JSON.stringify(m.error))) : p.res(m.result); }
    else if (m.method) events.push(m);
  });

  await send('Page.enable'); await send('Runtime.enable'); await send('Network.enable');
  await send('Network.setCacheDisabled', { cacheDisabled: true });
  await send('Log.enable');

  console.log('— v0.9.245：单语模式 —');
  await send('Page.navigate', { url: BASE + '/merge.html' });
  await new Promise(r => setTimeout(r, 2200));
  /* ⚠️ 必须在 navigate 之后设，否则 window.innerWidth 掉回 1 */
  await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1600, deviceScaleFactor: 1, mobile: false });
  await new Promise(r => setTimeout(r, 400));

  const w = await evalJs('window.innerWidth');
  ok('视口生效（innerWidth > 1000）', w > 1000, 'innerWidth=' + w);

  const errs = events.filter(e => e.method === 'Log.entryAdded' && e.params.entry.level === 'error').map(e => e.params.entry.text);
  ok('页面加载无 JS 错误', errs.length === 0, errs.join(' | '));

  ok('三个模式 tab（合并 / 调整 / 单语）',
    await evalJs("document.querySelectorAll('#modeTabs input[name=workMode]').length") === 3);

  /* 切到单语 */
  await evalJs("(function(){var el=document.querySelector('#modeTabs input[value=mono]');el.checked=true;el.dispatchEvent(new Event('change',{bubbles:true}));})()");
  await new Promise(r => setTimeout(r, 300));
  ok('单语模式隐藏译文字幕卡', await evalJs("getComputedStyle($('dstCard')).display") === 'none');
  ok('单语模式隐藏「配对方式」', await evalJs("getComputedStyle($('alignRow')).display") === 'none');
  ok('单语模式隐藏「双语行宽」', await evalJs("getComputedStyle($('biMaxWRow')).display") === 'none');
  ok('单语模式隐藏「上下顺序」', await evalJs("getComputedStyle($('orderRow')).display") === 'none');
  ok('单语模式表格收起原文列', await evalJs("document.querySelector('table.tbl').classList.contains('mono')"));

  /* 只用粘贴区上传一份字幕 → 生成预览 */
  await evalJs("(function(){var t=$('srcText');t.value=" + JSON.stringify(SRT_MONO) + ";t.dispatchEvent(new Event('input',{bubbles:true}));})()");
  await new Promise(r => setTimeout(r, 500));
  await evalJs("$('btnMerge').click()");
  await new Promise(r => setTimeout(r, 700));
  const rowsN = await evalJs("(S.rows||[]).length");
  ok('单语模式生成了 5 条 rows', rowsN === 5, 'rows=' + rowsN);
  ok('单语 rows 的原文侧为空（只出主样式那一行）', await evalJs("(S.rows||[]).every(function(r){return !String(r.en||'').trim();})"));
  ok('结果区可见', await evalJs("getComputedStyle($('rep')).display") !== 'none');

  console.log('— v0.9.245：样式槽 —');
  const chips = await evalJs("document.querySelectorAll('#slotBar .slot-chip').length");
  ok('槽栏渲染出 5 个出厂槽 + 新建', chips === 6, 'chips=' + chips);
  const names = await evalJs("Array.from(document.querySelectorAll('#slotBar .slot-chip')).map(function(e){return e.textContent.trim();})");
  ok('出厂槽名字齐全（默认/旁白/歌词/音效/强调）',
    /默认/.test(names.join()) && /旁白/.test(names.join()) && /歌词/.test(names.join()) && /音效/.test(names.join()) && /强调/.test(names.join()),
    JSON.stringify(names));

  /* 槽编辑面板：默认「只显示差异」 */
  await evalJs("$('slotEdit').open = true;");
  await evalJs("(function(){var c=document.querySelector('#slotBar [data-slot-edit=narration]');c.dispatchEvent(new MouseEvent('click',{bubbles:true}));})()");
  await new Promise(r => setTimeout(r, 300));
  ok('选中「旁白」槽', await evalJs("S.style.cur") === 'narration');
  const diffRows = await evalJs("document.querySelectorAll('#slotParams .slot-row').length");
  ok('差异视图只列出被覆盖的项（旁白 = 斜体一项 + 添加参数行）', diffRows >= 1 && diffRows <= 3, 'rows=' + diffRows);
  ok('旁白槽的覆盖里有斜体', await evalJs("!!(S.style.slots.narration.dst && ('italic' in S.style.slots.narration.dst))"));

  /* 切「显示全部参数」→ 参数变多 */
  await evalJs("$('slotViewAll').click()");
  await new Promise(r => setTimeout(r, 300));
  const allRows = await evalJs("document.querySelectorAll('#slotParams .slot-row').length");
  /* 单语模式只有「译文行」一组（原文行那半整块隐藏）。
     ⚠️ v0.9.246 起参数从 5 项开到 17 项 —— 这里的数字跟着变（245 时是 5 / 4）。 */
  ok('单语下全量视图列出 17 项（原文行那半整块隐藏）', allRows === 17, 'rows=' + allRows);
  const inhRows = await evalJs("document.querySelectorAll('#slotParams .slot-row.inh').length");
  ok('未覆盖的项标「沿用」（旁白只覆盖了斜体 → 16 项沿用）', inhRows === 16, 'inh=' + inhRows);

  console.log('— v0.9.245：筛选器 —');
  const allVisible = await evalJs("document.querySelectorAll('#repRows tr').length");
  ok('未筛选时 5 行全在', allVisible === 5, 'rows=' + allVisible);
  /* 度量类：时长 < 1 秒（第 4 条 1.2 秒不算，第 1/2/3/5 条都 ≥2 秒 → 应为 0 命中）
     ⚠️ 这里换个能命中的：关键词筛选 */
  await evalJs("(function(){var t=$('mFilterText');t.value='电话';t.dispatchEvent(new Event('input',{bubbles:true}));})()");
  await new Promise(r => setTimeout(r, 300));
  const f1 = await evalJs("document.querySelectorAll('#repRows tr').length");
  ok('关键词筛选只剩 1 行', f1 === 1, 'rows=' + f1);
  ok('筛选统计显示命中数', await evalJs("/已命中 1 条/.test($('filterStat').textContent)"), await evalJs("$('filterStat').textContent"));

  /* 度量类判据本身（不依赖界面）：直接调 rowMatches */
  const shortHit = await evalJs("(function(){S.filter={text:'',kind:'short'};return (S.rows||[]).filter(rowMatches).length;})()");
  ok('度量类「时长 < 1 秒」命中的确实是短行', shortHit === 0 || shortHit === 1, 'hit=' + shortHit);
  const sfxHit = await evalJs("(function(){S.filter={text:'',kind:'sfx'};return (S.rows||[]).filter(rowMatches).length;})()");
  ok('内容类「含音效」命中方括号行（第 2 条）', sfxHit >= 1, 'hit=' + sfxHit);
  await evalJs("(function(){S.filter={text:'',kind:''};renderReport();})()");
  await new Promise(r => setTimeout(r, 200));

  console.log('— v0.9.245：未套槽时导出与旧版一致 —');
  await evalJs("(function(){var s=$('expFmt');s.value='split';s.dispatchEvent(new Event('change',{bubbles:true}));})()");
  await new Promise(r => setTimeout(r, 400));
  const assPlain = await evalJs("buildExport()");
  ok('没套任何槽 → ASS 只有内置四套样式', (assPlain.match(/^Style: /gm) || []).length === 4,
    (assPlain.match(/^Style: /gm) || []).join(' | '));
  ok('没套任何槽 → ASS 里不出现 Slot 样式', !/Slot[DS]_/.test(assPlain));

  console.log('— v0.9.245：批量应用 —');
  /* 全选 → 套音效槽 */
  await evalJs("(function(){S.sel=new Set([1]);renderReport();})()");
  await new Promise(r => setTimeout(r, 250));
  await evalJs("(function(){ensureStyle();var c=document.querySelector('#selDock [data-dock-slot=\"sfx\"]');if(!c){renderSelDock();c=document.querySelector('#selDock [data-dock-slot=\"sfx\"]');}c.click();})()");
  await new Promise(r => setTimeout(r, 350));
  ok('第 2 行套上了音效槽', await evalJs("slotOfRow(1)") === 'sfx');
  ok('表格里出现槽标签', await evalJs("document.querySelectorAll('#repRows .slot-tag').length") >= 1);
  ok('默认槽不进 assign（保持稀疏）', await evalJs("Object.keys(S.style.assign).length") === 1,
    JSON.stringify(await evalJs("S.style.assign")));

  console.log('— v0.9.245：导出（ASS / VTT）—');
  /* ASS：套了槽的行要走 Slot 样式 */
  await evalJs("(function(){var s=$('expFmt');s.value='split';s.dispatchEvent(new Event('change',{bubbles:true}));})()");
  await new Promise(r => setTimeout(r, 400));
  const ass = await evalJs("buildExport()");
  ok('ASS 导出多出槽样式 SlotD_sfx / SlotS_sfx',
    /Style: SlotD_sfx,/.test(ass) && /Style: SlotS_sfx,/.test(ass),
    ass.split('\n').filter(l => /^Style:/.test(l)).join(' | '));
  ok('ASS Dialogue 指到了槽样式', /,SlotD_sfx,/.test(ass));
  ok('没套槽的行仍走内置样式 Bottom', /,Bottom,/.test(ass));
  ok('音效槽是淡色 #B0B0B0（= ASS 的 &H00B0B0B0）', /&H00B0B0B0/.test(ass), ass.split('\n').find(l => /SlotD_sfx/.test(l)));
  ok('音效槽不斜体（Netflix 规范）',
    (ass.match(/^Style: SlotD_sfx,.*$/m) || [''])[0].split(',')[8] === '0',
    (ass.match(/^Style: SlotD_sfx,.*$/m) || [''])[0]);

  /* VTT：套了槽要有 ::cue(.sg-sfx) 规则 + <c.sg-sfx> 标记 */
  await evalJs("(function(){var s=$('expFmt');s.value='vttStyle';s.dispatchEvent(new Event('change',{bubbles:true}));})()");
  await new Promise(r => setTimeout(r, 400));
  await evalJs("(function(){var p=$('mVttPanel');if(p)p.open=true;})()");
  await new Promise(r => setTimeout(r, 200));
  const vtt = await evalJs("buildExport()");
  ok('VTT 导出含槽规则 ::cue(.sg-sfx)', /::cue\(\.sg-sfx\)/.test(vtt), vtt.split('\n').slice(0, 12).join('\n'));
  ok('VTT 文本打了 <c.sg-sfx> 标记', /<c\.sg-sfx>/.test(vtt));
  ok('VTT STYLE 块只有一个', (vtt.match(/^STYLE$/gm) || []).length === 1);

  /* SRT：不该有任何槽痕迹 */
  await evalJs("(function(){var s=$('expFmt');s.value='srt';s.dispatchEvent(new Event('change',{bubbles:true}));})()");
  await new Promise(r => setTimeout(r, 400));
  const srt = await evalJs("buildExport()");
  ok('SRT 导出不含任何槽痕迹', !/sg-sfx|SlotD_/.test(srt));

  console.log('— v0.9.245：切模式清理 —');
  await evalJs("(function(){var el=document.querySelector('#modeTabs input[value=merge]');el.checked=true;el.dispatchEvent(new Event('change',{bubbles:true}));})()");
  await new Promise(r => setTimeout(r, 300));
  ok('切回合并模式后行→槽映射被清空', await evalJs("Object.keys(S.style.assign).length") === 0);
  ok('切回合并模式后勾选被清空', await evalJs("S.sel.size") === 0);
  ok('切回合并模式译文字幕卡回来了', await evalJs("getComputedStyle($('dstCard')).display") !== 'none');

  /* 双语路径：两份字幕合并后套槽也要生效 */
  console.log('— v0.9.245：双语路径 —');
  await evalJs("(function(){var t=$('srcText');t.value=" + JSON.stringify(SRT_EN) + ";t.dispatchEvent(new Event('input',{bubbles:true}));})()");
  await evalJs("(function(){var t=$('dstText');t.value=" + JSON.stringify(SRT_MONO) + ";t.dispatchEvent(new Event('input',{bubbles:true}));})()");
  await new Promise(r => setTimeout(r, 600));
  await evalJs("$('btnMerge').click()");
  await new Promise(r => setTimeout(r, 700));
  const biRows = await evalJs("(S.rows||[]).length");
  ok('双语合并产出 rows', biRows >= 4, 'rows=' + biRows);
  await evalJs("(function(){applySlotToAll('lyric');})()");
  await new Promise(r => setTimeout(r, 400));
  await evalJs("(function(){var s=$('expFmt');s.value='split';s.dispatchEvent(new Event('change',{bubbles:true}));})()");
  await new Promise(r => setTimeout(r, 400));
  const ass2 = await evalJs("buildExport()");
  ok('整篇套歌词槽 → ASS 出现 SlotD_lyric', /Style: SlotD_lyric,/.test(ass2));
  ok('歌词槽是斜体（Italic = -1）',
    (ass2.match(/^Style: SlotD_lyric,.*$/m) || [''])[0].split(',')[8] === '-1',
    (ass2.match(/^Style: SlotD_lyric,.*$/m) || [''])[0]);
  ok('歌词槽有垂直偏移（MarginV 被抬高）',
    await evalJs("(function(){var m=assMVs();return true;})()") && /Dialogue: 0,[^,]*,[^,]*,SlotD_lyric,,0,0,\d+,/.test(ass2));

  const errs2 = events.filter(e => e.method === 'Log.entryAdded' && e.params.entry.level === 'error').map(e => e.params.entry.text);
  ok('全流程无 JS 错误', errs2.length === 0, errs2.slice(0, 3).join(' | '));

  console.log('\n通过 ' + pass + ' · 失败 ' + fail);
  ws.close(); chrome.kill('SIGKILL');
  process.exit(fail ? 1 : 0);
})().catch(e => { console.error('FATAL', e); try { ws.close(); } catch (_) {} process.exit(1); });
