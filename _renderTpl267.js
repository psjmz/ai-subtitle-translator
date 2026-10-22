/* 用真实预览引擎渲染「单语字幕样式模板」候选稿（v0.9.267）
   —— 不是 mock：套真实字段值 → renderPv() → 截 #assPv / #mVttPv 画布。
   数值依据：Netflix Timed Text Style Guide / BBC Subtitle Guidelines / WCAG 2.1 */
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');
const http = require('http'), fs = require('fs');
const PORT = 9333, BASE = 'http://127.0.0.1:3098';
const OUT = '/Users/jp/WorkBuddy/2026-09-04-00-29-54/ui-redesign';
const wait = ms => new Promise(r => setTimeout(r, ms));
function J(p) { return new Promise((res, rej) => { const r = http.request({ host: '127.0.0.1', port: PORT, path: p, method: 'PUT' }, x => { let d = ''; x.on('data', c => d += c); x.on('end', () => { try { res(JSON.parse(d)); } catch (e) { rej(new Error(d.slice(0, 200))); } }); }); r.on('error', rej); r.end(); }); }
const NL = String.fromCharCode(10);
const b64 = s => Buffer.from(s, 'utf8').toString('base64');

/* 单语字幕样本：够长，能看出折行与两行叠加的效果 */
const SRT = [
  '1', '00:00:01,000 --> 00:00:04,500',
  '这是我们在这座城市里度过的最后一个夏天，天亮之前必须离开。', '',
  '2', '00:00:05,000 --> 00:00:08,000',
  '别忘了把窗台上那盏灯关掉。', ''
].join(NL);

/* ============ 候选模板（ASS，1080p 基准） ============ */
const ASS_TPLS = [
  { k: 'stream', name: '流媒体标准', spec: 'Netflix · 42 字符/行 · 白字黑描边 ≈ 12:1',
    v: { assDstSize:'56', assDstColor:'#FFFFFF', assDstBold:true, assDstItalic:false,
         assDstOutline:'2.5', assDstOutlineColor:'#000000', assDstAlpha:'100',
         assDstFont:'PingFang SC', assDstSpacing:'0',
         assDstEdge:'none', assDstEdgeSize:'0', assDstEdgeColor:'#000000', assDstEdgeAlpha:'60',
         assDstAlign:'2', assMarginL:'60', assMarginR:'60', assDstMV:'42' } },
  { k: 'a11y', name: '无障碍高对比', spec: 'WCAG AAA · 白字黑底衬 21:1 · SDH/听障',
    v: { assDstSize:'60', assDstColor:'#FFFFFF', assDstBold:true, assDstItalic:false,
         assDstOutline:'3', assDstOutlineColor:'#000000', assDstAlpha:'100',
         assDstFont:'PingFang SC', assDstSpacing:'0.5',
         assDstEdge:'box', assDstEdgeSize:'0', assDstEdgeColor:'#000000', assDstEdgeAlpha:'85',
         assDstAlign:'2', assMarginL:'60', assMarginR:'60', assDstMV:'50' } },
  { k: 'cinema', name: '影院质感', spec: 'DCP 惯例 · 无底衬 · 暖白小字更贴底',
    v: { assDstSize:'48', assDstColor:'#FFF6E5', assDstBold:false, assDstItalic:false,
         assDstOutline:'2', assDstOutlineColor:'#000000', assDstAlpha:'100',
         assDstFont:'PingFang SC', assDstSpacing:'0',
         assDstEdge:'none', assDstEdgeSize:'0', assDstEdgeColor:'#000000', assDstEdgeAlpha:'60',
         assDstAlign:'2', assMarginL:'80', assMarginR:'80', assDstMV:'30' } },
  { k: 'social', name: '社媒竖屏', spec: '避开底部 UI 区 · 大字粗描边',
    v: { assDstSize:'64', assDstColor:'#FFFFFF', assDstBold:true, assDstItalic:false,
         assDstOutline:'3.5', assDstOutlineColor:'#000000', assDstAlpha:'100',
         assDstFont:'PingFang SC', assDstSpacing:'0',
         assDstEdge:'box', assDstEdgeSize:'0', assDstEdgeColor:'#000000', assDstEdgeAlpha:'45',
         assDstAlign:'2', assMarginL:'60', assMarginR:'60', assDstMV:'240' } }
];

/* ============ 候选模板（VTT，百分比制） ============ */
const VTT_TPLS = [
  { k: 'stream', name: '流媒体标准', spec: 'Netflix · 居中 · 半透明底衬',
    v: { mVttLine:'90', mVttLineAlign:'end', mVttPos:'50', mVttWidth:'80', mVttAlign:'center',
         mVttSize:'100', mVttColor:'#FFFFFF', mVttFont:'PingFang SC', mVttLH:'1.4',
         mVttBold:true, mVttItalic:false,
         mVttBgOn:true, mVttBgColor:'#000000', mVttBgAlpha:'55',
         mVttShadowOn:true, mVttShadowW:'2', mVttShadowColor:'#000000' } },
  { k: 'a11y', name: '无障碍高对比', spec: 'WCAG AAA · 底衬 85% 不透明',
    v: { mVttLine:'88', mVttLineAlign:'end', mVttPos:'50', mVttWidth:'78', mVttAlign:'center',
         mVttSize:'108', mVttColor:'#FFFFFF', mVttFont:'PingFang SC', mVttLH:'1.45',
         mVttBold:true, mVttItalic:false,
         mVttBgOn:true, mVttBgColor:'#000000', mVttBgAlpha:'85',
         mVttShadowOn:false, mVttShadowW:'2', mVttShadowColor:'#000000' } },
  { k: 'cinema', name: '影院质感', spec: 'DCP 惯例 · 无底衬 · 暖白',
    v: { mVttLine:'88', mVttLineAlign:'end', mVttPos:'50', mVttWidth:'84', mVttAlign:'center',
         mVttSize:'92', mVttColor:'#FFF6E5', mVttFont:'PingFang SC', mVttLH:'1.4',
         mVttBold:false, mVttItalic:false,
         mVttBgOn:false, mVttBgColor:'#000000', mVttBgAlpha:'55',
         mVttShadowOn:true, mVttShadowW:'3', mVttShadowColor:'#000000' } },
  { k: 'social', name: '社媒竖屏', spec: '上移到 72% · 避开底部 UI',
    v: { mVttLine:'72', mVttLineAlign:'end', mVttPos:'50', mVttWidth:'72', mVttAlign:'center',
         mVttSize:'115', mVttColor:'#FFFFFF', mVttFont:'PingFang SC', mVttLH:'1.3',
         mVttBold:true, mVttItalic:false,
         mVttBgOn:true, mVttBgColor:'#000000', mVttBgAlpha:'45',
         mVttShadowOn:true, mVttShadowW:'3', mVttShadowColor:'#000000' } }
];

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
  await send('Emulation.setDeviceMetricsOverride', { width: 1320, height: 1400, deviceScaleFactor: 1, mobile: false });
  await send('Page.navigate', { url: BASE + '/merge.html' });
  await wait(2600);
  const load = (side, text, name) => `loadSide('${side}', decodeURIComponent(escape(atob(${JSON.stringify(b64(text))}))), ${JSON.stringify(name)});`;

  await ev('endDemo();');
  await ev(load('src', SRT, 'clip.srt'));
  await ev(`document.querySelector('#modeTabs input[name=workMode][value="mono"]').click();`);
  await ev('doMono();');
  await wait(300);

  const shot = async (name, sel) => {
    await ev(`document.querySelector(${JSON.stringify(sel)}).scrollIntoView({block:'center'});`);
    await wait(350);
    const b = await ev(`(function(){ var e=document.querySelector(${JSON.stringify(sel)}); var r=e.getBoundingClientRect();
      return {x:Math.round(r.x+window.scrollX), y:Math.round(r.y+window.scrollY), vy:Math.round(r.y), w:Math.round(r.width), h:Math.round(r.height), vh:window.innerHeight}; })()`);
    /* 画布只有 438px 宽 → 放大 2.6 倍截，才看得清描边粗细与底衬密度 */
    const clip = { x: b.x, y: b.y, width: b.w, height: Math.min(b.h, b.vh - Math.max(0, b.vy) - 4), scale: 2.6 };
    const r = await send('Page.captureScreenshot', { format: 'png', clip: Object.assign({ captureBeyondViewport: false }, clip) });
    fs.writeFileSync(OUT + '/' + name, Buffer.from(r.data, 'base64'));
    return b;
  };

  /* ---------- ASS ---------- */
  console.log('— ASS 预览（单语）—');
  await ev(`setFmtSilently('split');`);
  await wait(300);
  for (const t of ASS_TPLS) {
    const js = `ASS_FILL.active = true; try { var d = ${JSON.stringify(t.v)};
      Object.keys(d).forEach(function(k){ setAssVal(k, d[k]); });
      ['assDstColor','assDstOutlineColor','assDstEdgeColor'].forEach(syncColorSw);
      ALPHA_PAIRS.forEach(function(p){ var o=$(p[1]); if(o) o.textContent=$(p[0]).value+'%'; });
      syncAssEdge(); } finally { ASS_FILL.active = false; }
      renderPv(); 1;`;
    await ev(js);
    await wait(350);
    const b = await shot('tpl267-ass-' + t.k + '.png', '#assPv');
    console.log('  ' + t.k.padEnd(7) + ' ' + t.name + '  ' + JSON.stringify(b));
  }

  /* ---------- VTT ---------- */
  console.log('— VTT 预览（单语）—');
  await ev(`setFmtSilently('vttStyle');`);
  await ev(`document.getElementById('mVttPanel').open = true;`);
  await wait(300);
  for (const t of VTT_TPLS) {
    const js = `var d = ${JSON.stringify(t.v)};
      Object.keys(d).forEach(function(k){ vttSetVal(k, d[k]); });
      MVTT_COLOR_IDS.forEach(syncColorSw); vttAlphaOut(); renderPv(); 1;`;
    await ev(js);
    await wait(350);
    const b = await shot('tpl267-vtt-' + t.k + '.png', '#mVttPv');
    console.log('  ' + t.k.padEnd(7) + ' ' + t.name + '  ' + JSON.stringify(b));
  }
  process.exit(0);
})().catch(e => { console.error('出错：', e.message); process.exit(2); });
