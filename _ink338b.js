/* _ink338b.js —— 338 扩语言：字形度量交叉验证（多组样本）
 *
 * _ink338.js 单样本跑完发现：同一书写系统换一段文本，中位数会漂（ru 差 0.028、el 差 0.138、
 * ar 差 0.041、ja 差 0.045）——因为它们要么混了两种字符（日=汉字+假名），要么字母带变音符
 * （希腊声调、阿拉伯连写形），样本构成一变中位数就变。既有值是用当初那段文本定的，拿不回来。
 *
 * 结论：新语言**不靠绝对值取信**，而是：
 *   ① 全新书写系统（亚美尼亚 hy / 格鲁吉亚 ka / 藏文 bo）用 3 组不同真实文本各测一遍，
 *      三组之间差 <= 0.02 才采信，取三组中位数的中位数；
 *   ② 与既有语言同字母族的，一律沿用既有值（吉兹字母 ti 沿用 am、阿拉伯字母 ug/sd 沿用 ar、
 *      希伯来字母 yi 沿用 he、汉字 yue 沿用 zh-TW），与 v0.9.112「as 同 bn、ps/ku 同 ar」同惯例；
 *   ③ 拉丁/西里尔（含带变音符的 tk cy ga mt ig）走 _default，不单列（v0.9.109/112 同口径）。
 *
 * 本次只测 ① 的 3 种 + ti 作同族旁证。过滤改用 Unicode 类别 P/S/C（藏文 tsheg 这类分隔符
 * 在 _ink338.js 里没滤掉，把 bo 的最小值拖到 0.114，必须滤）。
 *
 * 用法：node _ink338b.js
 */
'use strict';
const { spawn } = require('child_process');
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');

const DEBUG = Number(process.env.DEBUG_PORT || 9773);
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const sleep = ms => new Promise(r => setTimeout(r, ms));

const SAMPLE = {
  'hy': [
    'Սուբտիտրերի թարգմանության գործիք հայերեն',
    'Բարև ձեզ ինչպես եք ես լավ եմ շնորհակալություն',
    'Երևանը Հայաստանի մայրաքաղաքն է աշխարհում'
  ],
  'ka': [
    'სუბტიტრების თარგმნის ხელსაწყო ქართული',
    'გამარჯობა როგორ ხართ მე კარგად ვარ გმადლობთ',
    'თბილისი საქართველოს დედაქალაქია მსოფლიოში'
  ],
  'bo': [
    'ཟིན་བྲིས་ཡིག་སྒྱུར་ལག་ཆ་བོད་སྐད།',
    'བོད་སྐད་ནི་བོད་ཀྱི་སྐད་ཆ་ཞིག་རེད།',
    'ང་བདེ་པོ་ཡིན་ཁྱེད་རང་ག་རེ་བྱེད་ཀྱི་ཡོད།'
  ],
  'ti': [                                   // 同族旁证：吉兹字母，应落在 am 0.852 附近
    'መሳርያ ትርጉም ትሕቲ ጽሑፍ ትግርኛ',
    'ሰላም ከመይ ኣሎኹም ኣነ ጽቡቕ ኣለኹ',
    'ኤርትራን ትግራይን ብትግርኛ ይዛረቡ'
  ],
  'am': [                                   // 校验：既有 0.852
    'የትርጉም መሣሪያ በአማርኛ',
    'ሰላም እንደምን ናችሁ እኔ ደህና ነኝ',
    'አዲስ አበባ የኢትዮጵያ ዋና ከተማ ናት'
  ],
  'en': [                                   // 校验：既有 0.545 / desc 0.21
    'The quick brown fox jumps over the lazy dog',
    'Subtitle translation tool for everyday use',
    'Please check the second line before export'
  ]
};

const JS = `(function(){
  var S = ${JSON.stringify(SAMPLE)};
  function med(a){ var s=a.slice().sort(function(p,q){return p-q;}); return s.length? s[Math.floor(s.length/2)] : 0; }
  function p90(a){ var s=a.slice().sort(function(p,q){return p-q;}); return s.length? s[Math.min(s.length-1, Math.floor(s.length*0.9))] : 0; }
  var c=document.createElement('canvas'); c.width=2400; c.height=500;
  var x=c.getContext('2d'); x.textBaseline='alphabetic';
  x.font='100px "PingFang SC", "Helvetica Neue", Arial';
  var P=/[\\p{P}\\p{S}\\p{C}\\p{Z}]/u, N=/\\p{N}/u;
  var out={};
  Object.keys(S).forEach(function(k){
    var per=[], all=[];
    S[k].forEach(function(txt){
      var arr=Array.from(txt.replace(/\\s+/g,'')), rows=[];
      for (var i=0;i<arr.length;i++){
        var ch=arr[i];
        if (P.test(ch)) continue;          // 标点 / 符号 / 控制 / 分隔（藏文 tsheg 落在 \\p{Z}? -> 再兜一层）
        if (N.test(ch)) continue;          // 数字
        var m=x.measureText(ch);
        var asc=m.actualBoundingBoxAscent, desc=m.actualBoundingBoxDescent;
        if (!(asc||desc)) continue;
        if (asc+desc < 8) continue;        // 藏文 tsheg 之类的分隔符，墨迹极小，直接滤
        rows.push({ch:ch, r:(asc+desc)/100, d:desc/100, w:Math.round(m.width*100)/100});
      }
      per.push({ n: rows.length, r: Math.round(med(rows.map(function(o){return o.r;}))*1000)/1000,
                 d: Math.round(p90(rows.map(function(o){return o.d;}))*1000)/1000 });
      all = all.concat(rows);
    });
    var ws={}; all.forEach(function(o){ ws[o.w]=1; });
    out[k]={ per: per, n: all.length,
             ratio: Math.round(med(all.map(function(o){return o.r;}))*1000)/1000,
             desc: Math.round(p90(all.map(function(o){return o.d;}))*1000)/1000,
             uq: Object.keys(ws).length };
  });
  return out;
})()`;

(async () => {
  const udir = '/tmp/cr-ink338b-' + Date.now();
  const chrome = spawn(CHROME, ['--headless=new', '--no-sandbox', '--disable-gpu', '--no-first-run',
    '--window-size=1440,900', '--remote-debugging-port=' + DEBUG, '--user-data-dir=' + udir, 'about:blank'],
    { stdio: 'ignore' });
  let list = null;
  for (let i = 0; i < 40; i++) {
    await sleep(500);
    try { const r = await fetch('http://127.0.0.1:' + DEBUG + '/json/list'); list = await r.json(); if (list && list.length) break; } catch (e) {}
  }
  if (!list) { chrome.kill(); throw new Error('CDP 起不来'); }
  const ws = new WebSocket(list[0].webSocketDebuggerUrl, { perMessageDeflate: false, maxPayload: 64 * 1024 * 1024 });
  await new Promise((res, rej) => { ws.on('open', res); ws.on('error', rej); });
  let seq = 0; const pend = new Map();
  ws.on('message', d => { let m; try { m = JSON.parse(d.toString()); } catch (e) { return; } if (m.id && pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); } });
  const send = (method, params) => new Promise(res => { const id = ++seq; pend.set(id, res); ws.send(JSON.stringify({ id, method, params: params || {} })); });

  const r = await send('Runtime.evaluate', { expression: JS, returnByValue: true, awaitPromise: true });
  const val = (r.result && r.result.result && r.result.result.value) || null;
  ws.close(); chrome.kill();
  if (!val) { console.log('测量失败', JSON.stringify(r).slice(0, 600)); process.exit(1); }

  const EXPECT = { 'am': 0.852, 'en': 0.545 };
  console.log('lang\tink(合)\t三组分别\t\tdesc(合)\t三组分别\t\t字符数/宽度唯一值\t结论');
  Object.keys(SAMPLE).forEach(k => {
    const o = val[k];
    const rs = o.per.map(p => p.r), ds = o.per.map(p => p.d);
    const spread = Math.max.apply(null, rs) - Math.min.apply(null, rs);
    let verdict;
    if (EXPECT[k] != null) verdict = (Math.abs(o.ratio - EXPECT[k]) <= 0.015 ? '复现既有 ' + EXPECT[k] + ' ✓' : '✗ 对不上既有 ' + EXPECT[k]);
    else verdict = (spread <= 0.02 ? '三组一致 ✓ 采信' : '✗ 组间差 ' + Math.round(spread * 1000) / 1000 + ' 不采信');
    console.log(k + '\t' + o.ratio + '\t' + rs.join(' / ') + '\t' + o.desc + '\t' + ds.join(' / ') + '\t' + o.n + ' / ' + o.uq + '\t' + verdict);
  });
  console.log('\n参考：_default ratio 0.545 / desc 0.21；am 既有 0.852（吉兹字母同族）');
})();
