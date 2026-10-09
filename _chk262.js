/* v0.9.259 预备检查：23 语补翻词条在真实 DOM 里渲染（切 uiLang → 读温度标签/转发开关/提示文案） */
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');
const http = require('http');
const PORT = 9333, BASE = 'http://127.0.0.1:3098';
const wait = ms => new Promise(r => setTimeout(r, ms));
let PASS = 0, FAIL = 0;
const ok = (c, name, extra) => { console.log((c ? '  ✓ ' : '  ✗ ') + name + (extra !== undefined && !c ? '  [' + extra + ']' : '')); c ? PASS++ : FAIL++; };
function J(p){ return new Promise((res, rej) => { const r = http.request({ host:'127.0.0.1', port:PORT, path:p, method:'PUT' }, x => { let d=''; x.on('data',c=>d+=c); x.on('end',()=>{ try{ res(JSON.parse(d)); }catch(e){ rej(new Error(d.slice(0,200))); } }); }); r.on('error', rej); r.end(); }); }
(async () => {
  const v = await J('/json/new?' + encodeURIComponent('about:blank'));
  const ws = new WebSocket(v.webSocketDebuggerUrl, { perMessageDeflate: false });
  let id = 0; const wt = new Map(); const errs = [];
  await new Promise(r => ws.on('open', r));
  ws.on('message', m => { const g = JSON.parse(m);
    if (g.id && wt.has(g.id)) { const q = wt.get(g.id); wt.delete(g.id); g.error ? q.rej(new Error(JSON.stringify(g.error))) : q.res(g.result); }
    if (g.method === 'Runtime.exceptionThrown') errs.push(((g.params.exceptionDetails.exception||{}).description) || g.params.exceptionDetails.text); });
  const send = (m, p) => new Promise((res, rej) => { const i = ++id; wt.set(i, { res, rej }); ws.send(JSON.stringify({ id:i, method:m, params:p||{} })); });
  const ev = async e => { const r = await send('Runtime.evaluate', { expression:e, returnByValue:true, awaitPromise:true });
    if (r.exceptionDetails) throw new Error((r.exceptionDetails.exception||{}).description || r.exceptionDetails.text); return r.result.value; };
  await send('Page.enable'); await send('Runtime.enable');
  await send('Network.setCacheDisabled', { cacheDisabled: true });
  await send('Emulation.setDeviceMetricsOverride', { width:1280, height:1000, deviceScaleFactor:1, mobile:false });
  await send('Page.navigate', { url: BASE + '/index.html' });
  await wait(2600);

  // 逐语言切 uiLang，读温度标签 + 转发开关 + 温度提示
  const CASES = [
    ['es', 'Temperatura', 'Enviar vía el servidor'],
    ['ko', '온도', '이 사이트 서버를 경유'],
    ['de', 'Temperatur', 'Über den Server dieser Seite'],
    ['fr', 'Température', 'Relayer via le serveur'],
    ['ar', 'الحرارة', 'خادم هذا الموقع'],
    ['th', 'อุณหภูมิ', 'ส่งต่อผ่านเซิร์ฟเวอร์'],
    ['hi', 'टेम्परेचर', 'रिले करें'],
    ['ru', 'Температура', 'сервер этого сайта'],
    ['tr', 'Sıcaklık', 'sunucusu üzerinden aktar'],
    ['he', 'טמפרטורה', 'השרת של האתר'],
    ['ro', 'Temperatură', 'serverul site-ului'],
    ['el', 'Θερμοκρασία', 'διακομιστή του ιστότοπου'],
  ];
  for (const [lang, wantTemp, wantVia] of CASES) {
    const r = await ev(`(function(){
      var sel = document.getElementById('uiLang2') || document.getElementById('uiLang');
      sel.value = '${lang}';
      sel.dispatchEvent(new Event('change'));
      var lbl = document.querySelector('[data-i18n="lblTemp"]');
      var via = document.querySelector('[data-i18n="lblViaSrv"]');
      var tip = document.querySelector('[data-tip-i18n="tempTip"]');
      return JSON.stringify({t: lbl ? lbl.textContent : '', v: via ? via.textContent : '', tipLen: tip ? (tip.getAttribute('data-tip')||'').length : -1});
    })()`);
    const d = JSON.parse(r);
    ok(d.t.indexOf(wantTemp) >= 0, `[${lang}] 温度标签 = ${wantTemp}`, d.t);
    ok(d.v.indexOf(wantVia) >= 0, `[${lang}] 转发开关 = ${wantVia}`, d.v);
  }
  // 提示层：主站 ⓘ 是纯 CSS 悬停（content:attr(data-tip)）——验证 data-tip 属性被翻成西语（非中文回退）
  const tip = await ev(`(function(){
    var sel = document.getElementById('uiLang2') || document.getElementById('uiLang');
    sel.value = 'es'; sel.dispatchEvent(new Event('change'));
    var i = document.querySelector('[data-tip-i18n="tempTip"]');
    return (i.getAttribute('data-tip') || '').slice(0, 120);
  })()`);
  ok(/Temperature|administración/.test(tip), '[es] 温度 ⓘ 提示为西语', tip);
  ok(!/越小越稳定/.test(tip), '[es] ⓘ 不再回退中文', tip);

  ok(errs.length === 0, '全程无 JS 异常', errs.slice(0,2).join(' | '));
  console.log(`\n结果: ${PASS}/${PASS+FAIL}`);
  ws.close(); process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error('crash', e.message); process.exit(1); });
