/* v0.9.270 实测：主站字幕区就地编辑（原文 / 时间轴）+ 三层存盘 + 时间轴四件套
   验的是真 DOM：真点时间码、真敲回车、真重新导入（模拟刷新）、真点「一键修」。
   契约：
     ① 原文能改 → 进 S.rows → 进导出 → 同步写回 S.srcItems（重跑不丢的根据）
     ② 时间轴能改：绝对时间 / 相对 +1.5s / -500；认不出来的格式拒绝那一格
     ③ 改完与邻居重叠 → 给三选，选「吸到上一条结束」真的吸上去
     ④ 批量：整体偏移 / 从某条起 / 比例缩放（首尾锚定，中间线性）
     ⑤ 体检：造短时长与重叠 → 行内标红 → 一键修修好
     ⑥ 重新导入同一份字幕（= 刷新）编辑还在；「全部还原」真还原成原始值
     ⑦ 27 语词条齐全，整轮无 JS 异常 */
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');
const http = require('http');
const PORT = 9333, BASE = 'http://127.0.0.1:3098';
const wait = ms => new Promise(r => setTimeout(r, ms));
let PASS = 0, FAIL = 0;
const ok = (c, n, x) => { console.log((c ? '  ✓ ' : '  ✗ ') + n + (x !== undefined ? '  [' + x + ']' : '')); c ? PASS++ : FAIL++; };
const J = p => new Promise((res, rej) => { const r = http.request({ host: '127.0.0.1', port: PORT, path: p, method: 'PUT' }, x => { let d = ''; x.on('data', c => d += c); x.on('end', () => { try { res(JSON.parse(d)); } catch (e) { rej(new Error(d.slice(0, 200))); } }); }); r.on('error', rej); r.end(); });
const NL = String.fromCharCode(10);
const b64 = s => Buffer.from(s, 'utf8').toString('base64');
const SRT = ['1', '00:00:01,000 --> 00:00:03,000', 'Hello there', '',
  '2', '00:00:04,000 --> 00:00:06,000', 'How are you', '',
  '3', '00:00:07,000 --> 00:00:09,000', 'Thanks for watching', ''].join(NL);

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
    if (r.exceptionDetails) { console.log('  EXPR>>> ' + String(e).slice(0, 300)); throw new Error((r.exceptionDetails.exception || {}).description || r.exceptionDetails.text); } return r.result.value; };
  await send('Page.enable'); await send('Runtime.enable');
  await send('Network.setCacheDisabled', { cacheDisabled: true });
  await send('Emulation.setDeviceMetricsOverride', { width: 1320, height: 1200, deviceScaleFactor: 1, mobile: false });
  await send('Page.navigate', { url: BASE + '/index.html' });
  await wait(3000);

  const load = async () => {
    await ev(`localStorage.removeItem('srt_edit_v1')`);
    await ev(`setSrc(decodeURIComponent(escape(atob(${JSON.stringify(b64(SRT))}))), 'a.srt');`);
    await ev(`S.rows.forEach(function(r,i){ r.zh='译文'+(i+1); });`);
    await ev(`renderRows();`);
    await wait(300);
  };
  /* 真点第 n 行的时间码格 → 真敲两个值 → 真回车 */
  const editTc = (n, s, e) => `(function(){
    var gs=document.querySelectorAll('#rows .cuegrid');
    var g=gs[${n}]; if(!g) return 'NO_GRID';
    var tc=g.querySelector('.tc'); if(!tc) return 'NO_TC';
    tc.click();
    var ins=document.querySelectorAll('#rows .tc-in input');
    if(ins.length<2) return 'NO_INPUT';
    ins[0].value=${JSON.stringify(s)}; ins[1].value=${JSON.stringify(e)};
    ins[1].dispatchEvent(new KeyboardEvent('keydown',{key:'Enter',bubbles:true}));
    return 'OK';
  })()`;
  const editEn = (n, txt) => `(function(){
    var gs=document.querySelectorAll('#rows .cuegrid');
    var g=gs[${n}]; if(!g) return 'NO_GRID';
    var en=g.querySelector('.en.ed'); if(!en) return 'NO_EN';
    en.focus(); en.innerText=${JSON.stringify(txt)};
    en.dispatchEvent(new Event('input',{bubbles:true}));
    return 'OK';
  })()`;

  console.log('【① 原文可编辑 → 进数据 / 进导出 / 写回源条目】');
  await load();
  ok(await ev(`document.querySelectorAll('#rows .en.ed').length`) === 3, '三行原文都可编辑', await ev(`document.querySelectorAll('#rows .en.ed').length`));
  ok(await ev(editEn(0, '改过的原文')) === 'OK', '原文格真的能敲字');
  await wait(300);
  ok(await ev(`S.rows[0].en`) === '改过的原文', 'S.rows 写回去了', await ev(`S.rows[0].en`));
  ok(await ev(`S.srcItems[0].text`) === '改过的原文', '同步写回 S.srcItems（重跑翻译不丢）', await ev(`S.srcItems[0].text`));
  /* ⚠️ 导出默认是「单语（仅译文）」，那里本来就没有原文行，断言必须显式切双语，
     不能指望上一次运行留在 localStorage 里的导出格式（10-10 外网实测因此误报过一轮）。 */
  await ev(`(function(){var s=document.getElementById('expStyle'); s.value='bi-src|srt';
    s.dispatchEvent(new Event('change',{bubbles:true})); return 1;})()`);
  ok((await ev(`buildExportItems()[0].text`)).indexOf('改过的原文') >= 0, '双语导出里是改过的原文', await ev(`buildExportItems()[0].text`));

  console.log('【② 时间轴：绝对时间 / 相对值 / 非法格式】');
  await load();
  ok(await ev(editTc(0, '00:00:02,500', '00:00:03,500')) === 'OK', '点时间码真的开了两个框');
  await wait(300);
  ok(await ev(`S.rows[0].start`) === 2500 && await ev(`S.rows[0].end`) === 3500, '绝对时间写进去了', await ev(`S.rows[0].start`) + '/' + await ev(`S.rows[0].end`));
  ok(await ev(`S.srcItems[0].start`) === 2500, '时间轴同步写回 S.srcItems', await ev(`S.srcItems[0].start`));
  ok((await ev(`buildExport()`)).indexOf('00:00:02,500') >= 0, '导出里是新的时间码');
  ok(await ev(editTc(1, '+1.5s', '+2s')) === 'OK', '相对值也能改');
  await wait(300);
  ok(await ev(`S.rows[1].start`) === 5500 && await ev(`S.rows[1].end`) === 8000, '相对 +1.5s / +2s 都生效', await ev(`S.rows[1].start`) + '/' + await ev(`S.rows[1].end`));
  ok(await ev(editTc(2, '-500', '-1s')) === 'OK', '负号是提前');
  await wait(300);
  ok(await ev(`S.rows[2].start`) === 6500 && await ev(`S.rows[2].end`) === 8000, '相对 -500 / -1s 都生效', await ev(`S.rows[2].start`) + '/' + await ev(`S.rows[2].end`));
  const before = await ev(`S.rows[2].start`);
  ok(await ev(editTc(2, 'abc', 'xyz')) === 'OK', '非法格式也能提交（不该炸）');
  await wait(300);
  ok(await ev(`S.rows[2].start`) === before, '认不出来的格式拒绝这一格，不动数据', await ev(`S.rows[2].start`));

  console.log('【③ 与邻居重叠 → 三选】');
  await load();
  ok(await ev(editTc(1, '00:00:02,000', '00:00:05,000')) === 'OK', '把第 2 条改到与第 1 条重叠');
  await wait(300);
  ok(await ev(`OV_ROW`) === 1, '挂出了重叠提示', await ev(`OV_ROW`));
  ok(await ev(`document.querySelectorAll('#rows .ov-bar').length`) === 1, '提示条真的画出来了');
  ok(await ev(`(function(){var b=document.querySelector('#rows [data-ov="snap"]'); if(!b) return 'NO'; b.click(); return 'OK';})()`) === 'OK', '点了「吸到上一条结束」');
  await wait(300);
  ok(await ev(`S.rows[1].start`) === 3000, '真的吸到上一条结束（3000）', await ev(`S.rows[1].start`));
  ok(await ev(`OV_ROW`) === null, '提示条收掉了');
  ok(await ev(`document.querySelectorAll('#rows .ed-dot').length`) >= 1, '改过的行有粉点标记', await ev(`document.querySelectorAll('#rows .ed-dot').length`));

  console.log('【④ 批量：整体偏移 / 从某条起 / 比例缩放】');
  await load();
  await ev(`shiftTimes(0, 500)`); await wait(250);
  ok(await ev(`S.rows[0].start`) === 1500 && await ev(`S.rows[2].start`) === 7500, '整体偏移：全片 +500ms', await ev(`S.rows[0].start`) + '/' + await ev(`S.rows[2].start`));
  await load();
  await ev(`shiftTimes(2, 1000)`); await wait(250);
  ok(await ev(`S.rows[0].start`) === 1000 && await ev(`S.rows[1].start`) === 5000 && await ev(`S.rows[2].start`) === 8000,
    '从第 2 条起：只有它和后面动', await ev(`S.rows[0].start`) + '/' + await ev(`S.rows[1].start`) + '/' + await ev(`S.rows[2].start`));
  await load();
  await ev(`scaleTimes(2000, 14000)`); await wait(250);
  ok(await ev(`S.rows[0].start`) === 2000 && await ev(`S.rows[1].start`) === 8000 && await ev(`S.rows[2].start`) === 14000,
    '比例缩放：首尾对准，中间按比例', await ev(`S.rows[0].start`) + '/' + await ev(`S.rows[1].start`) + '/' + await ev(`S.rows[2].start`));
  ok(await ev(`S.rows[1].end - S.rows[1].start`) === 4000, '时长也按比例缩放（不是原样搬）', await ev(`S.rows[1].end - S.rows[1].start`));

  console.log('【⑤ 时长体检：标红 + 一键修】');
  await load();
  await ev(`S.rows[1].end = S.rows[1].start + 400;`);      // 0.4 秒，短于 0.83
  await ev(`S.rows[2].start = S.rows[1].start;`);          // 与上一条重叠
  await ev(`renderRows();`); await wait(200);
  const nIss = await ev(`paintIssues();`);
  await ev(`renderRows();`); await wait(200);
  ok(nIss >= 2, '体检报出问题（短时长 + 重叠）', nIss);
  ok(await ev(`document.querySelectorAll('#rows .b-time').length`) >= 2, '行内标红了', await ev(`document.querySelectorAll('#rows .b-time').length`));
  const fixed = await ev(`fixTimeIssues();`); await wait(300);
  ok(fixed >= 1, '一键修修了东西', fixed);
  ok(await ev(`S.rows[1].end - S.rows[1].start`) >= 833, '短时长被补到 0.83 秒以上', await ev(`S.rows[1].end - S.rows[1].start`));
  ok(await ev(`S.rows[2].start`) >= await ev(`S.rows[1].end`) - 1, '重叠被推开', await ev(`S.rows[2].start`));

  console.log('【⑥ 重新导入（= 刷新）编辑还在 + 全部还原真还原】');
  await load();
  await ev(editTc(0, '00:00:02,500', '00:00:03,500'));
  await ev(editEn(1, '手改的原文'));
  await wait(400);
  ok(await ev(`editedCount()`) === 2, '先改出 2 处', await ev(`editedCount()`));
  await wait(400);   // 等 150ms 防抖落盘
  /* 模拟刷新：重新导航 + 重新导入同一份字幕 */
  await send('Page.navigate', { url: BASE + '/index.html' });
  await wait(2600);
  await ev(`setSrc(decodeURIComponent(escape(atob(${JSON.stringify(b64(SRT))}))), 'a.srt');`);
  await wait(400);
  ok(await ev(`editedCount()`) === 2, '重新导入后编辑认回来了', await ev(`editedCount()`));
  ok(await ev(`S.rows[0].start`) === 2500, '时间轴还是改过的那个值', await ev(`S.rows[0].start`));
  ok(await ev(`S.rows[1].en`) === '手改的原文', '原文还是改过的那个值', await ev(`S.rows[1].en`));
  await ev(`clearEdits(); renderRows();`); await wait(250);
  ok(await ev(`S.rows[0].start`) === 1000 && await ev(`S.rows[1].en`) === 'How are you', '全部还原 = 真还原成原始值',
    await ev(`S.rows[0].start`) + ' / ' + await ev(`S.rows[1].en`));
  ok(await ev(`editedCount()`) === 0, '标记也清掉了');
  ok(await ev(`localStorage.getItem('srt_edit_v1')`) === null, '快照也清掉了');

  console.log('【⑦ 27 语词条 + 无异常】');
  const miss = await ev(`Object.keys(I18N).filter(function(l){ return !(I18N[l] && I18N[l].edBarCount && I18N[l].tcSnapPrev && I18N[l].tcScaleHint); }).join(',')`);
  ok(miss === '', '27 个语块新词条齐全（漏一个界面就整块空白）', miss || 'none');
  ok(await ev(`Object.keys(I18N).length`) === 27, '还是 27 个语块', await ev(`Object.keys(I18N).length`));
  const enVsZh = await ev(`I18N['en'].edBarCount !== I18N['zh-CN'].edBarCount && I18N['ja'].edBarCount !== I18N['zh-CN'].edBarCount`);
  ok(enVsZh, '英文 / 日文确实是另一套词（不是中文原样复制）');
  ok(errs.length === 0, '整轮没抛 JS 异常', errs.slice(0, 2).join(' | ') || 'none');

  console.log('\n通过 ' + PASS + ' / 失败 ' + FAIL);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error('FATAL', e.message); process.exit(2); });
