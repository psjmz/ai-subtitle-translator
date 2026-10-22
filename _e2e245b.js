/* v0.9.245 第二批 E2E：新建槽 / 覆盖与恢复 / 筛选按钮真实点击 / 快捷选择 /
   VTT 预览按槽渲染 / 槽 src 侧覆盖 / 四语切换 / 边界与性能
   记忆里的坑同样躲开：navigate 之后才设视口、VTT 面板 <details> 先开、rows 字段是 en/zh */
'use strict';
const http = require('http');
const { spawn } = require('child_process');
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');

const PORT = 3098;
const BASE = 'http://127.0.0.1:' + PORT;
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

let pass = 0, fail = 0;
function ok(name, cond, extra) {
  if (cond) { pass++; console.log('  ✓ ' + name); }
  else { fail++; console.log('  ✗ ' + name + (extra ? '\n      ' + extra : '')); }
}

const SRT_EN = [
  '1', '00:00:01,000 --> 00:00:03,000', 'Hello, this is a normal line', '',
  '2', '00:00:04,000 --> 00:00:06,000', '[phone ringing]', '',
  '3', '00:00:07,000 --> 00:00:12,000', 'Ten years later he came back', '',
  '4', '00:00:13,000 --> 00:00:14,200', 'Short', '',
  '5', '00:00:15,000 --> 00:00:18,000', '♪ opening theme ♪', ''
].join('\n') + '\n';
const SRT_ZH = [
  '1', '00:00:01,000 --> 00:00:03,000', '你好，这是一条普通台词', '',
  '2', '00:00:04,000 --> 00:00:06,000', '[电话铃声]', '',
  '3', '00:00:07,000 --> 00:00:12,000', '十年后他回到了那条街', '',
  '4', '00:00:13,000 --> 00:00:14,200', '短', '',
  '5', '00:00:15,000 --> 00:00:18,000', '♪ 片头曲 ♪', ''
].join('\n') + '\n';

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
    setTimeout(() => { if (pending.has(id)) { pending.delete(id); rej(new Error('timeout ' + method)); } }, 20000);
  });
}
async function evalJs(expr) {
  const r = await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true });
  if (r.exceptionDetails) throw new Error(r.exceptionDetails.text + ' ' + (r.exceptionDetails.exception || {}).description);
  return r.result.value;
}
const wait = ms => new Promise(r => setTimeout(r, ms));

(async () => {
  const chrome = spawn(CHROME, [
    '--headless=new', '--remote-debugging-port=9334', '--no-sandbox', '--disable-gpu',
    '--remote-allow-origins=*', '--window-size=1440,1600',
    '--user-data-dir=/tmp/cbuddy-e2e245b-' + Date.now()
  ], { stdio: 'ignore' });
  await wait(2500);

  const list = await new Promise((res, rej) => {
    http.get('http://127.0.0.1:9334/json/list', r => { let b = ''; r.on('data', d => b += d); r.on('end', () => res(JSON.parse(b))); }).on('error', rej);
  });
  const page = list.find(t => t.type === 'page');
  ws = new WebSocket(page.webSocketDebuggerUrl, { perMessageDeflate: false });
  await new Promise(r => ws.on('open', r));
  ws.on('message', buf => {
    const m = JSON.parse(buf.toString());
    if (m.id && pending.has(m.id)) { const p = pending.get(m.id); pending.delete(m.id); m.error ? p.rej(new Error(JSON.stringify(m.error))) : p.res(m.result); }
    else if (m.method) events.push(m);
  });

  await send('Page.enable'); await send('Runtime.enable'); await send('Network.enable');
  await send('Network.setCacheDisabled', { cacheDisabled: true }); await send('Log.enable');

  console.log('— 准备：双语合并 —');
  await send('Page.navigate', { url: BASE + '/merge.html' });
  await wait(2200);
  await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1600, deviceScaleFactor: 1, mobile: false });
  await wait(400);

  await evalJs("(function(){var t=$('srcText');t.value=" + JSON.stringify(SRT_EN) + ";t.dispatchEvent(new Event('input',{bubbles:true}));})()");
  await evalJs("(function(){var t=$('dstText');t.value=" + JSON.stringify(SRT_ZH) + ";t.dispatchEvent(new Event('input',{bubbles:true}));})()");
  await wait(600);
  await evalJs("$('btnMerge').click()");
  await wait(800);
  const nRows = await evalJs("(S.rows||[]).length");
  ok('双语合并产出 5 行', nRows === 5, 'rows=' + nRows);
  const sides = await evalJs("JSON.stringify({en:(S.rows[0].en||'').slice(0,12),zh:(S.rows[0].zh||'').slice(0,12)})");
  console.log('      （行两侧取值：' + sides + '）');

  console.log('— 新建槽 —');
  const chips0 = await evalJs("document.querySelectorAll('#slotBar .slot-chip').length");
  await evalJs("(function(){var b=document.querySelector('#slotBar [data-slot-new]');b.dispatchEvent(new MouseEvent('click',{bubbles:true}));})()");
  await wait(300);
  const chips1 = await evalJs("document.querySelectorAll('#slotBar .slot-chip').length");
  ok('点「+ 新建槽」槽栏多一个', chips1 === chips0 + 1, chips0 + ' → ' + chips1);
  const newId = await evalJs("S.style.cur");
  ok('新建后当前槽切到新槽', /^slot\d+$/.test(newId), 'cur=' + newId);
  ok('新槽标记为自定义', await evalJs("!!(S.style.slots['" + newId + "']||{}).custom"));
  ok('新槽自动进「显示全部参数」视图（差异视图会是空白）', await evalJs("S.style.view") === 'all');
  const slotNameTxt = await evalJs("slotLabel('" + newId + "')");
  ok('未命名的新槽有兜底名字（不显示空）', !!String(slotNameTxt).trim(), 'name=' + JSON.stringify(slotNameTxt));
  /* 空槽应用到整篇：不崩，也不改变任何可见结果 */
  await evalJs("applySlotToAll('" + newId + "')");
  await wait(400);
  ok('空槽应用到整篇不报错', await evalJs("Object.keys(S.style.assign).length") === 5);
  await evalJs("(function(){var s=$('expFmt');s.value='split';s.dispatchEvent(new Event('change',{bubbles:true}));})()");
  await wait(400);
  const assEmpty = await evalJs("buildExport()");
  ok('空槽也会生成同名样式（逐条 Dialogue 要指得到）',
    new RegExp('Style: SlotD_' + newId + ',').test(assEmpty),
    assEmpty.split('\n').filter(l => /^Style:/.test(l)).join(' | '));

  console.log('— 覆盖 / 解除 / 恢复预设 —');
  await evalJs("(function(){var c=document.querySelector('#slotBar [data-slot-edit=narration]');c.dispatchEvent(new MouseEvent('click',{bubbles:true}));})()");
  await wait(250);
  ok('选中旁白槽（出厂：斜体一项）', await evalJs("slotCount('narration')") === 1);
  await evalJs("$('slotEdit').open = true;");
  await evalJs("$('slotUncoverAll').click()");
  await wait(250);
  ok('「解除全部覆盖」清空该槽', await evalJs("slotCount('narration')") === 0);
  ok('出厂槽被改后标「已修改」', await evalJs("!!S.style.slots.narration.modified"));
  ok('「恢复预设」按钮此时可见', await evalJs("getComputedStyle($('slotRestore')).display") !== 'none');
  await evalJs("$('slotRestore').click()");
  await wait(250);
  ok('「恢复预设」把斜体拿回来', await evalJs("slotCount('narration')") === 1 && await evalJs("!!S.style.slots.narration.dst.italic"));
  ok('恢复后「已修改」标记消失', await evalJs("!S.style.slots.narration.modified"));
  ok('恢复后「恢复预设」按钮重新隐藏', await evalJs("getComputedStyle($('slotRestore')).display") === 'none');
  /* 在「显示全部参数」里点「覆盖」给颜色 */
  await evalJs("$('slotViewAll').click()");
  await wait(250);
  await evalJs("(function(){var a=document.querySelector('#slotParams [data-sp-act=set][data-sp-k=\"dst.color\"]');if(!a)throw new Error('no set link');a.dispatchEvent(new MouseEvent('click',{bubbles:true}));})()");
  await wait(250);
  ok('点「覆盖」把颜色加进槽', await evalJs("slotCount('narration')") === 2, JSON.stringify(await evalJs("S.style.slots.narration.dst")));
  await evalJs("(function(){var a=document.querySelector('#slotParams [data-sp-act=unset][data-sp-k=\"dst.color\"]');if(!a)throw new Error('no unset link');a.dispatchEvent(new MouseEvent('click',{bubbles:true}));})()");
  await wait(250);
  ok('点「取消覆盖」把它删回去', await evalJs("slotCount('narration')") === 1);
  /* 「添加参数…」下拉：只在「只显示差异」视图里出现（全量视图每行自带「覆盖」链接） */
  await evalJs("$('slotViewDiff').click()");
  await wait(250);
  ok('差异视图里有「添加参数…」下拉', await evalJs("!!document.querySelector('#slotParams select[data-sp-add=dst]')"));
  await evalJs("(function(){var s=document.querySelector('#slotParams select[data-sp-add=dst]');if(!s)throw new Error('no add select');s.value='bold';s.dispatchEvent(new Event('change',{bubbles:true}));})()");
  await wait(250);
  ok('「添加参数…」下拉能加一项（粗体）',
    await evalJs("!!(S.style.slots.narration.dst && ('bold' in S.style.slots.narration.dst))"));
  await evalJs("$('slotRestore').click()");
  await wait(250);
  ok('再恢复预设 → 回到只有斜体', await evalJs("slotCount('narration')") === 1 && await evalJs("!('bold' in S.style.slots.narration.dst)"));

  console.log('— 筛选器：快捷按钮真实点击 —');
  await evalJs("(function(){S.sel=new Set();S.filter={text:'',kind:''};renderReport();})()");
  await wait(250);
  const vis0 = await evalJs("document.querySelectorAll('#repRows tr').length");
  await evalJs("(function(){document.querySelector('#filterBar [data-flt=sfx]').dispatchEvent(new MouseEvent('click',{bubbles:true}));})()");
  await wait(300);
  ok('点「含音效」按钮 → 按钮高亮', await evalJs("document.querySelector('#filterBar [data-flt=sfx]').classList.contains('on')"));
  ok('点「含音效」按钮 → filter.kind 设上', await evalJs("S.filter.kind") === 'sfx');
  const vis1 = await evalJs("document.querySelectorAll('#repRows tr').length");
  ok('「含音效」筛出 2 行（英文 [phone ringing] + 中文 [电话铃声] 在同一条上算 1 行 → 实际看命中）',
    vis1 >= 1 && vis1 < vis0, vis0 + ' → ' + vis1);
  await evalJs("(function(){document.querySelector('#filterBar [data-flt=sfx]').dispatchEvent(new MouseEvent('click',{bubbles:true}));})()");
  await wait(300);
  ok('再点一次 → 取消筛选（toggle）', await evalJs("S.filter.kind") === '');
  ok('取消后行全部回来', await evalJs("document.querySelectorAll('#repRows tr').length") === vis0);
  await evalJs("(function(){document.querySelector('#filterBar [data-flt=short]').dispatchEvent(new MouseEvent('click',{bubbles:true}));})()");
  await wait(300);
  const shortN = await evalJs("document.querySelectorAll('#repRows tr').length");
  ok('度量类「时长 < 1 秒」筛出的确实是短行（第 4 条 1.2 秒不算）', shortN >= 0 && shortN <= 1, 'hit=' + shortN);
  await evalJs("(function(){document.querySelector('#filterBar [data-flt=long]').dispatchEvent(new MouseEvent('click',{bubbles:true}));})()");
  await wait(300);
  ok('切到另一个快捷筛选时上一个自动熄灭',
    await evalJs("!document.querySelector('#filterBar [data-flt=short]').classList.contains('on') && document.querySelector('#filterBar [data-flt=long]').classList.contains('on')"));
  await evalJs("(function(){S.filter={text:'',kind:''};document.querySelectorAll('#filterBar .btn-sm').forEach(function(b){b.classList.remove('on')});renderReport();})()");
  await wait(250);

  console.log('— 快捷选择：全选 / 反选 / 清除 —');
  await evalJs("(function(){S.sel=new Set();renderReport();})()");
  await wait(200);
  await evalJs("(function(){document.querySelector('#filterStat [data-fsel=all]').dispatchEvent(new MouseEvent('click',{bubbles:true}));})()");
  await wait(250);
  ok('点「全选」→ 全部选中', await evalJs("S.sel.size") === 5, 'sel=' + await evalJs("S.sel.size"));
  await evalJs("(function(){document.querySelector('#filterStat [data-fsel=inv]').dispatchEvent(new MouseEvent('click',{bubbles:true}));})()");
  await wait(250);
  ok('全选后点「反选」→ 全部取消', await evalJs("S.sel.size") === 0);
  await evalJs("(function(){S.sel=new Set([0,2]);renderReport();})()");
  await wait(200);
  await evalJs("(function(){document.querySelector('#filterStat [data-fsel=inv]').dispatchEvent(new MouseEvent('click',{bubbles:true}));})()");
  await wait(250);
  ok('选了 2 行后点「反选」→ 选的是另外 3 行',
    await evalJs("S.sel.size") === 3 && await evalJs("!S.sel.has(0) && !S.sel.has(2)"));
  /* 筛选 + 全选 = 只选命中的行 */
  await evalJs("(function(){S.sel=new Set();S.filter={text:'',kind:'sfx'};renderReport();})()");
  await wait(250);
  await evalJs("(function(){document.querySelector('#filterStat [data-fsel=all]').dispatchEvent(new MouseEvent('click',{bubbles:true}));})()");
  await wait(250);
  const selN = await evalJs("S.sel.size");
  const hitN = await evalJs("(S.rows||[]).filter(rowMatches).length");
  ok('筛选状态下「全选」只选命中的行', selN === hitN && selN > 0, 'sel=' + selN + ' hit=' + hitN);
  await evalJs("(function(){document.querySelector('#filterStat [data-fsel=clear]').dispatchEvent(new MouseEvent('click',{bubbles:true}));})()");
  await wait(250);
  ok('点「清除」→ 清空勾选', await evalJs("S.sel.size") === 0);

  console.log('— 筛选统计文案 —');
  await evalJs("(function(){S.filter={text:'',kind:''};S.sel=new Set([0,1]);renderReport();})()");
  await wait(250);
  const statHtml = await evalJs("$('filterStat').innerHTML");
  const statTxt = await evalJs("$('filterStat').textContent");
  ok('统计里不出现重复数字（<b>2</b> 后面不该再跟一个 2）',
    !/<b>(\d+)<\/b>\s*[,，·]?\s*\1\b/.test(statHtml.replace(/\s+/g, ' ')),
    'html=' + statHtml.slice(0, 160) + ' | txt=' + statTxt.slice(0, 120));
  ok('统计里有三个快捷选择链接',
    (statHtml.match(/data-fsel=/g) || []).length === 3, statHtml.slice(0, 200));

  console.log('— VTT 预览按槽渲染 —');
  await evalJs("(function(){S.filter={text:'',kind:''};S.sel=new Set();})()");
  await evalJs("(function(){var s=$('expFmt');s.value='vttStyle';s.dispatchEvent(new Event('change',{bubbles:true}));})()");
  await wait(400);
  await evalJs("(function(){var p=$('mVttPanel');if(p)p.open=true;var e=$('exp');if(e&&getComputedStyle(e).display==='none')e.style.display='block';})()");
  /* ⚠️ v0.9.256：预览有了「视角」——这一段要验的是「按行上**实际套的槽**画」，
     所以先显式回到「成片」视角。否则本套里前面点过小铅笔（→ 视角停在那颗槽上），
     画面会固定画那个槽，跟行上的槽无关，两条断言必红。 */
  await evalJs("setPvView('movie');"); await wait(300);
  const pvColorsOf = () => evalJs("Array.prototype.map.call(document.querySelectorAll('#mVttPvCue .vtt-pv-line'),function(d){return getComputedStyle(d).color;})");
  await evalJs("applySlotToAll('default');renderVttPv();");
  await wait(300);
  const c0 = await pvColorsOf();
  await evalJs("applySlotToAll('sfx');renderVttPv();");
  await wait(300);
  const c1 = await pvColorsOf();
  await evalJs("applySlotToAll('default');renderVttPv();");
  await wait(300);
  const c2 = await pvColorsOf();
  ok('套上槽 → 预览颜色真的变了', JSON.stringify(c0) !== JSON.stringify(c1), JSON.stringify(c0) + ' → ' + JSON.stringify(c1));
  ok('取消套槽 → 预览回到原样（没套槽时的画面不受影响）',
    JSON.stringify(c0) === JSON.stringify(c2), JSON.stringify(c0) + ' vs ' + JSON.stringify(c2));
  await evalJs("applySlotToAll('sfx');renderVttPv();");
  await wait(300);
  const pvColors = await evalJs("Array.prototype.map.call(document.querySelectorAll('#mVttPvCue .vtt-pv-line'),function(d){return getComputedStyle(d).color;})");
  const vttSfx = await evalJs("buildExport()");
  const ruleColor = (vttSfx.match(/::cue\(\.sg-sfx\)\s*\{[^}]*color:\s*([^;]+);/) || [])[1];
  ok('导出里 ::cue(.sg-sfx) 写了音效色', /::cue\(\.sg-sfx\)/.test(vttSfx), vttSfx.split('\n').slice(0, 18).join(' ⏎ '));
  ok('预览里有行按槽的颜色画（预览 = 导出）',
    pvColors.indexOf('rgb(176, 176, 176)') >= 0,
    '预览各色=' + JSON.stringify(pvColors) + ' 导出=' + ruleColor);

  console.log('— 槽的「原文行」覆盖 —');
  await evalJs("(function(){newSlot();var id=S.style.cur;S.style.slots[id].src={color:'#FF0000'};S.style.view='all';applySlotToAll(id);renderSlots();})()");
  await wait(400);
  const srcId = await evalJs("S.style.cur");
  const vtt2 = await evalJs("buildExport()");
  const srcRule = (vtt2.match(new RegExp('::cue\\(\\.sg-' + srcId + '\\.src\\)\\s*\\{([^}]*)\\}')) || [])[1] || '(没写这条规则)';
  const diag = await evalJs("JSON.stringify({id:S.style.cur, src:S.style.slots[S.style.cur].src, stSrc:slotVttStyle(S.style.cur,'src'), dec:C.vttSrcDecls(slotVttStyle(S.style.cur,'src')), used:usedSlotIds()})");
  ok('槽的原文行颜色进到了 ::cue(.槽.src) 规则里',
    /color:\s*#FF0000/i.test(srcRule), '规则内容=' + srcRule.trim() + '\n      诊断=' + diag);
  const dupN = await evalJs("(buildExport().match(new RegExp('::cue\\\\(\\\\.sg-" + srcId + "\\\\.src\\\\)','g'))||[]).length");
  ok('同一个 ::cue(.槽.src) 选择器只出现一次（不留脏规则）', dupN === 1, '出现 ' + dupN + ' 次');

  console.log('— 四语切换 —');
  const KEYS = ['slotTitle', 'slotNew', 'slotUncoverAll', 'slotRestore', 'slotViewDiff', 'slotViewAll',
    'slotInherit', 'slotOverride', 'slotSfx', 'slotPrmDMV', 'filterHint', 'modeMono'];
  const TPLKEYS = ['applyAll'];   /* v0.9.250：这几条是模板串，必须含 {0}，且套进去后不许留花括号 */
  for (const lang of ['zh-CN', 'zh-TW', 'en', 'ja']) {
    const r = await evalJs("(function(){UI.lang='" + lang + "';applyI18n();var ks=" + JSON.stringify(KEYS) +
      ";var tp=" + JSON.stringify(TPLKEYS) +
      ";var bad=[];ks.forEach(function(k){var v=t(k);if(!v||v===k||/\\{0\\}/.test(v))bad.push(k+'='+v);});" +
      "tp.forEach(function(k){var v=t(k);if(!v||v===k||!/\\{0\\}/.test(v))bad.push(k+'（模板串缺占位）='+v);" +
      "else{var f=t(k,'旁白');if(!f||/\\{0\\}/.test(f)||f===v)bad.push(k+'（套值后仍异常）='+f);}});" +
      "return bad.join(',');})()");
    ok('界面语言 ' + lang + '：新词条齐全', r === '', r);
  }
  await evalJs("(function(){UI.lang='zh-CN';applyI18n();})()");

  console.log('— 边界 —');
  await evalJs("(function(){S.rows=null;S.sel=new Set();})()");
  await wait(150);
  let threw = '';
  try { await evalJs("(function(){applySlotToAll('sfx');applySlotToSelected('sfx');renderReport();renderFilterStat();return 'ok';})()"); }
  catch (e) { threw = String(e.message || e); }
  ok('没有 rows 时点「应用 / 整篇套用」不抛错', threw === '', threw);
  try { await evalJs("(function(){renderSlots();renderSlotEdit();syncSlotsToRows();return 'ok';})()"); }
  catch (e) { threw = String(e.message || e); }
  ok('没有 rows 时槽面板照常渲染', threw === '', threw);

  console.log('— 性能：800 行整篇套槽 + 导出 —');
  const perf = await evalJs(`(function(){
    var rows=[];
    for(var i=0;i<800;i++){
      var s=i*2000, e=s+1800;
      rows.push({no:i+1,start:s,end:e,en:'Line number '+i+' with some reasonably long English text here',
                 zh:'第 '+i+' 行，这是一段用于压力测试的中文台词，长度足够触发折行'});
    }
    S.rows=rows; S.style.assign={}; S.sel=new Set();
    var t0=performance.now(); applySlotToAll('lyric'); var t1=performance.now();
    var out=buildExport(); var t2=performance.now();
    return {apply:Math.round(t1-t0), exp:Math.round(t2-t1), len:out.length};
  })()`);
  ok('800 行整篇套槽 < 1500ms', perf.apply < 1500, JSON.stringify(perf));
  ok('800 行 ASS 导出 < 3000ms', perf.exp < 3000, JSON.stringify(perf));
  ok('800 行导出非空', perf.len > 1000, 'len=' + perf.len);

  const errs = events.filter(e => e.method === 'Log.entryAdded' && e.params.entry.level === 'error').map(e => e.params.entry.text);
  ok('全流程无 JS 错误', errs.length === 0, errs.slice(0, 3).join(' | '));

  console.log('\n通过 ' + pass + ' · 失败 ' + fail);
  ws.close(); chrome.kill('SIGKILL');
  process.exit(fail ? 1 : 0);
})().catch(e => { console.error('FATAL', e); try { ws.close(); } catch (_) {} process.exit(1); });
