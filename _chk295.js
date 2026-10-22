/* v0.9.295 本地真浏览器冒烟：时间轴体检（只标注不自动改）
    —— 五种病灶能不能查出来、建议点了能不能落地、双语/纯文本/RTL 怎么处理。
   用法：node _chk295.js
   走 file:// 直接打开页面（纯前端页，不需要起服务）。 */
'use strict';
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');
const http = require('http');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawn } = require('child_process');

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PORT = 9950 + Math.floor(Math.random() * 40);
const DIR = '/Users/jp/WorkBuddy/2026-09-04-00-29-54/srt-translator';
const TARGET = 'file://' + DIR + '/shift.html';
const wait = ms => new Promise(r => setTimeout(r, ms));

/* 84 个汉字停 1 秒 —— 一行太宽 + 读不完，两条一起命中 */
const LONGHAN = '一二三四五六七八九十一二三四五六七八九十二二三四五六七八九十三二三四五六七八九十四二三四'
  + '五六七八九十五二三四五六七八九十六二三四五六七八九十七二三四五六七八九十八二三四五六七八九十九';

/* 四种病灶各来一条：太短 / 停留太久 / 挨太近 / 一行太宽加读不完 */
const SICK = '1\n00:00:00,000 --> 00:00:00,300\n太短的一条\n\n'
  + '2\n00:00:01,000 --> 00:00:09,000\n一句话在屏幕上挂了整整九秒钟啊\n\n'
  + '3\n00:00:09,080 --> 00:00:11,000\n紧贴着来的一条字幕\n\n'
  + '4\n00:00:12,000 --> 00:00:13,000\n' + LONGHAN + '\n';

const OKOK = '1\n00:00:01,000 --> 00:00:03,000\n正常的一条字幕\n\n'
  + '2\n00:00:03,200 --> 00:00:05,000\n另一条也正常\n';

/* 双语（原文一行 + 译文一行）：停留 9 秒对双语是正常的，不该被点名 */
const BI = '1\n00:00:01,000 --> 00:00:09,000\n原文一句话停久了也不该被拆开\nThe translation should never be chopped\n\n'
  + '2\n00:00:10,000 --> 00:00:12,000\n尾巴\n';

const TXT = '没有时间轴的纯文本\n第二行\n第三行\n';

let ws, tid = 0; const pending = new Map();
function send(method, params) {
  const id = ++tid;
  ws.send(JSON.stringify({ id, method, params: params || {} }));
  return new Promise((res, rej) => {
    pending.set(id, { res, rej });
    setTimeout(() => { if (pending.has(id)) { pending.delete(id); rej(new Error('timeout ' + method)); } }, 20000);
  });
}
async function ev(expr) {
  const r = await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true });
  if (r.exceptionDetails) throw new Error(String(r.exceptionDetails.exception && r.exceptionDetails.exception.description).slice(0, 300));
  return r.result.value;
}

(async () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'chk295-'));
  /* ⚠️ 别删 MAP * ~NOTFOUND：页面挂着 AdSense / GA 的外链脚本，headless 里没代理时
     这些请求会长时间悬着拖住渲染进程，表现是 Runtime.evaluate 超时、页面「加载不出来」。
     让外部域名立刻解析失败，只放行本机。 */
  const chrome = spawn(CHROME, ['--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check',
    '--host-resolver-rules=MAP * ~NOTFOUND, EXCLUDE 127.0.0.1',
    '--no-proxy-server', '--window-size=1440,1000', '--remote-debugging-port=' + PORT, '--user-data-dir=' + dir, TARGET], { stdio: 'ignore' });

  let tabs = [];
  for (let i = 0; i < 40 && !tabs.length; i++) {
    await wait(400);
    try {
      const l = await new Promise((res, rej) => http.get('http://127.0.0.1:' + PORT + '/json/list', r => { let b = ''; r.on('data', d => b += d); r.on('end', () => res(b)); }).on('error', rej));
      const all = (JSON.parse(l) || []).filter(x => x.type === 'page' && x.webSocketDebuggerUrl);
      const hit = all.filter(x => /shift\.html/.test(x.url || ''));
      tabs = hit.length ? hit : all;
    } catch (e) { }
  }
  if (!tabs.length) { console.log('!! 浏览器起不来 port=' + PORT); process.exit(1); }
  ws = new WebSocket(tabs[0].webSocketDebuggerUrl, { perMessageDeflate: false, maxPayload: 256 * 1024 * 1024 });
  await new Promise((res, rej) => { ws.on('open', res); ws.on('error', rej); });
  ws.on('message', raw => {
    let m; try { m = JSON.parse(raw); } catch (e) { return; }
    if (m.id && pending.has(m.id)) { const p = pending.get(m.id); pending.delete(m.id); m.error ? p.rej(new Error(JSON.stringify(m.error))) : p.res(m.result); return; }
  });

  let ready = false, dbg = '';
  for (let i = 0; i < 25 && !ready; i++) {
    await wait(600);
    try {
      const rs = await ev('document.readyState');
      const has = await ev("typeof setSrc!=='undefined' && typeof window.S!=='undefined'");
      dbg = rs + ' / ready=' + has;
      ready = has === true && (rs === 'complete' || rs === 'interactive');
    } catch (e) { dbg = 'ev 异常: ' + e.message; }
  }
  console.log('[就绪探测] ' + dbg);
  if (!ready) { console.log('!! 页面没加载出来'); chrome.kill('SIGKILL'); process.exit(1); }

  let pass = 0, fail = 0;
  function chk(n, c, x) { if (c) { pass++; console.log('  ✓ ' + n); } else { fail++; console.log('  ✗ ' + n + (x !== undefined ? '  → ' + x : '')); } }
  async function setRule(id, v) {
    await ev("(function(){var el=document.querySelector('[data-rule=\"" + id + "\"]');el.value='" + v + "';el.dispatchEvent(new Event('change',{bubbles:true}));})();1");
    await wait(300);
  }
  async function clickFix(i, k) {
    await ev("document.querySelector('[data-fix=\"" + i + ',' + k + "\"]').click();1");
    await wait(400);
  }
  const issues = () => ev("JSON.stringify(window.S.issues.map(function(x){return x.i+':'+x.why.join('+');}))");
  const workN = () => ev("window.S.work?window.S.work.length:0");

  console.log('--- ① 体检卡的结构 ---');
  chk('体检卡存在', (await ev("!!document.getElementById('chkCard')")) === true);
  chk('体检排在「逐条微调」前面', (await ev("document.getElementById('chkCard').compareDocumentPosition(document.getElementById('listCard')) & 4")) === 4);
  const nums = await ev("JSON.stringify(['chkCard','listCard','repCard'].map(function(id){return document.getElementById(id).querySelector('.n').textContent;}))");
  chk('编号顺延成 3 / 4 / 5', nums === '["3","4","5"]', nums);
  chk('五个阈值框都在', (await ev("document.querySelectorAll('#ruleRow [data-rule]').length")) === 5,
    await ev("document.querySelectorAll('#ruleRow [data-rule]').length"));
  const units = await ev("JSON.stringify(Array.prototype.slice.call(document.querySelectorAll('#ruleRow .un')).map(function(e){return e.textContent;}))");
  chk('每个阈值框都挂了单位后缀', units === '["秒","秒","字/秒","毫秒","字"]', units);

  console.log('--- ② 放进字幕当天就该说话（不用先点「开始」）---');
  await ev("setSrc(" + JSON.stringify(SICK) + ", 'sick.srt');1"); await wait(500);
  chk('体检卡直接显示出来了', (await ev("document.getElementById('chkCard').style.display")) !== 'none',
    await ev("document.getElementById('chkCard').style.display"));
  chk('点了四条：太短 / 太久 / 挨太近 / 太宽', (await issues()) === '["0:short","1:long","2:gap","3:fast+line"]', await issues());
  const tags = await ev("JSON.stringify(Array.prototype.slice.call(document.querySelectorAll('#chkList .chkrow .fx i')).map(function(e){return e.textContent;}))");
  chk('界面上的原因标签说的是人话', tags === '["停留太短","停留太久","挨得太近","读不完","一行太宽"]', tags);
  chk('统计写「4 条需要留意」', /4 条需要留意/.test(await ev("document.getElementById('chkStat').textContent")),
    await ev("document.getElementById('chkStat').textContent"));

  console.log('--- ③ 一个字都不自动改 —— 点之前什么都别动 ---');
  chk('没点任何建议时列表保持原样', (await ev("window.S.work")) === null || (await workN()) === 0,
    await workN());
  chk('ops 里一条操作都没有', (await ev("window.S.ops.length")) === 0, await ev("window.S.ops.length"));

  console.log('--- ④ 点「延长停留」：这条要真的变长 ---');
  const firstBtn = await ev("document.querySelector('#chkList .chkrow .op button').textContent");
  chk('第一条给的建议是「延长停留」', firstBtn === '延长停留', firstBtn);
  await clickFix(0, 'btnLengthen');
  chk('第 1 条补到了 700 毫秒', (await ev("window.S.work[0].end - window.S.work[0].start")) === 700,
    await ev("window.S.work[0].end - window.S.work[0].start"));
  chk('采纳之后「停留太短」这条从清单里消失了',
    (await issues()).indexOf('0:short') < 0, await issues());
  chk('撤一次就回到原样', (await ev("(function(){document.getElementById('btnUndo').click();return JSON.stringify([S.work[0].start,S.work[0].end]);})()")) === '[0,300]',
    await ev("JSON.stringify([window.S.work[0].start,window.S.work[0].end])"));

  console.log('--- ⑤ 阈值是自己定的 —— 改了就按新的算 ---');
  await setRule('minDur', '3');
  chk('最短停留放宽到 3 秒后，第 3 条（1.9 秒）被点名', /2:short/.test(await issues()), await issues());
  await setRule('minDur', '0.7');
  chk('改回来又恢复正常', (await issues()).indexOf('2:short') < 0, await issues());

  console.log('--- ⑥ 点「切分」：长条变几条，字不许丢 ---');
  await clickFix(1, 'btnSplit');
  chk('条目数从 4 条涨到 5 条以上', (await workN()) >= 5, await workN());
  const joined = await ev("(function(){var t=window.S.work[1].text+window.S.work[2].text;return t;})()");
  chk('切出来的两段拼回去还是原句', /一句话在屏幕上挂了整整九秒钟啊/.test(joined.replace(/\s/g, '')), joined);
  chk('切完之后第 2 条不再被点名「停留太久」',
    (await issues()).indexOf('1:long') < 0, await issues());

  console.log('--- ⑦ 导出还是干净的 SRT ---');
  const txt = await ev("window.S.text");
  chk('保留了 SRT 的序号与箭头', /^1\n00:00:0\d,\d{3} --> /.test(txt), JSON.stringify(txt.slice(0, 40)));
  chk('四条时间轴都还在', (txt.match(/-->/g) || []).length >= 5, (txt.match(/-->/g) || []).length);

  console.log('--- ⑧ 双语不该被单语的尺子量 ---');
  await ev("setSrc(" + JSON.stringify(BI) + ", 'bi.srt');1"); await wait(500);
  chk('双语持续 9 秒也没被点名', (await issues()) === '[]', await issues());
  chk('清单区显示「没发现需要留意的地方」',
    /没发现需要留意/.test(await ev("document.getElementById('chkList').textContent")),
    await ev("document.getElementById('chkList').textContent"));

  console.log('--- ⑨ 纯文本没有时间轴 —— 体检直接说跳过 ---');
  await ev("setSrc(" + JSON.stringify(TXT) + ", 'plain.txt');1"); await wait(500);
  chk('显示「这份没有时间轴」', (await ev("document.getElementById('chkNoTime').style.display")) !== 'none',
    await ev("document.getElementById('chkNoTime').style.display"));
  chk('清单是空的', (await ev("document.getElementById('chkList').innerHTML")) === '',
    await ev("document.getElementById('chkList').innerHTML"));

  console.log('--- ⑩ 从右往左写的语言：单位后缀要跟着挪 ---');
  await ev("setSrc(" + JSON.stringify(SICK) + ", 'sick.srt');1"); await wait(400);
  await ev("(function(){var s=document.getElementById('langSel');s.value='ar';s.dispatchEvent(new Event('change',{bubbles:true}));})();1");
  await wait(500);
  chk('整页翻成 rtl', (await ev("document.documentElement.dir")) === 'rtl', await ev("document.documentElement.dir"));
  chk('体检卡的文案跟着变成阿拉伯语', /فحص التوقيت/.test(await ev("document.querySelector('#chkCard h2').textContent")),
    await ev("document.querySelector('#chkCard h2').textContent"));
  chk('单位后缀挪到了左边', (await ev("getComputedStyle(document.querySelector('#ruleRow .un')).left")) === '10px',
    await ev("getComputedStyle(document.querySelector('#ruleRow .un')).left"));
  chk('数字框自己仍从左往右', (await ev("getComputedStyle(document.querySelector('#ruleRow input')).direction")) === 'ltr',
    await ev("getComputedStyle(document.querySelector('#ruleRow input')).direction"));
  chk('切语言后体检结果还在', (await issues()) === '["0:short","1:long","2:gap","3:fast+line"]', await issues());
  await ev("(function(){var s=document.getElementById('langSel');s.value='zh-CN';s.dispatchEvent(new Event('change',{bubbles:true}));})();1");
  await wait(400);

  console.log('--- ⑪ 布局别塌 ---');
  chk('没有横向滚动', (await ev("document.documentElement.scrollWidth <= window.innerWidth + 1")) === true,
    await ev("document.documentElement.scrollWidth + '/' + window.innerWidth"));
  chk('体检卡在最宽的活动区域里没溢出',
    (await ev("document.getElementById('chkCard').scrollWidth <= document.getElementById('chkCard').clientWidth + 1")) === true,
    await ev("document.getElementById('chkCard').scrollWidth + '/' + document.getElementById('chkCard').clientWidth"));

  console.log('\n== ' + pass + ' 通过 / ' + fail + ' 失败 ==');
  chrome.kill('SIGKILL');
  process.exit(fail ? 1 : 0);
})();
