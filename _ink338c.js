/* _ink338c.js —— 藏文 bo 专项：为什么三组样本中位数差 0.205？
 *
 * _ink338b.js 跑出 bo 三组 0.525 / 0.73 / 0.525，组间差 0.205（阈值 0.02）→ 不采信。
 * 藏文是垂直堆叠文字：一个音节 = 基础字母 + 可选上加字/下加字/元音符号/后加字，
 * 单个码位的墨迹高度差异极大（元音符号 ི ོ ེ 很矮、下加字 ྱ ྲ 很高）。
 * 所以「中位数」高度依赖样本里各类码位的配比，短样本必漂。
 *
 * 本脚本：用 8 组更长、更日常的文本，逐字符输出 (码位, 高度)，看清楚分布与配比，
 * 再决定取哪个值（大概率取多组合并中位数，而不是任一单组）。
 *
 * 用法：node _ink338c.js
 */
'use strict';
const { spawn } = require('child_process');
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');

const DEBUG = Number(process.env.DEBUG_PORT || 9775);
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const sleep = ms => new Promise(r => setTimeout(r, ms));

const BO = [
  'ཟིན་བྲིས་ཡིག་སྒྱུར་ལག་ཆ་བོད་སྐད།',
  'བོད་སྐད་ནི་བོད་ཀྱི་སྐད་ཆ་ཞིག་རེད།',
  'ང་བདེ་པོ་ཡིན་ཁྱེད་རང་ག་རེ་བྱེད་ཀྱི་ཡོད།',
  'དེང་སང་འཛམ་གླིང་ནང་མི་གྲངས་མང་པོ་ཡོད།',
  'ལས་ཀ་དེ་ལེགས་པོ་བྱུང་བ་རེད་ཅེས་བཤད།',
  'ཁོང་ཚོ་སློབ་གྲྭར་འགྲོ་བའི་ལམ་དུ་ཡོད།',
  'རྒྱ་གར་དང་བོད་ཀྱི་རིག་གཞུང་མཉམ་དུ་འཕེལ།',
  'ཉི་མ་ཤར་ནས་མཁའ་དབྱིངས་སྔོན་པོ་མཐོང་ཐུབ།'
];

const JS = `(function(){
  var S = ${JSON.stringify(BO)};
  function med(a){ var s=a.slice().sort(function(p,q){return p-q;}); return s.length? s[Math.floor(s.length/2)] : 0; }
  function p90(a){ var s=a.slice().sort(function(p,q){return p-q;}); return s.length? s[Math.min(s.length-1, Math.floor(s.length*0.9))] : 0; }
  var c=document.createElement('canvas'); c.width=2400; c.height=600;
  var x=c.getContext('2d'); x.textBaseline='alphabetic';
  x.font='100px "PingFang SC", "Helvetica Neue", Arial';
  var P=/[\\p{P}\\p{S}\\p{C}\\p{Z}]/u, N=/\\p{N}/u;
  var out={ per:[], chars:{} };
  var all=[];
  S.forEach(function(txt, gi){
    var arr=Array.from(txt.replace(/\\s+/g,'')), rows=[];
    for (var i=0;i<arr.length;i++){
      var ch=arr[i];
      if (P.test(ch)||N.test(ch)) continue;
      var m=x.measureText(ch);
      var asc=m.actualBoundingBoxAscent, desc=m.actualBoundingBoxDescent;
      if (!(asc||desc)) continue;
      var h=(asc+desc)/100;
      if (asc+desc < 8) continue;
      rows.push({ch:ch, cp:'U+'+ch.codePointAt(0).toString(16).toUpperCase(), r:Math.round(h*1000)/1000, d:Math.round(desc/100*1000)/1000});
      var key=ch;
      if(!out.chars[key]) out.chars[key]={cp:'U+'+ch.codePointAt(0).toString(16).toUpperCase(), r:Math.round(h*1000)/1000, d:Math.round(desc/100*1000)/1000, n:0};
      out.chars[key].n++;
    }
    out.per.push({ g: gi+1, n: rows.length, r: Math.round(med(rows.map(function(o){return o.r;}))*1000)/1000,
                   d: Math.round(p90(rows.map(function(o){return o.d;}))*1000)/1000 });
    all = all.concat(rows);
  });
  out.n = all.length;
  out.ratio = Math.round(med(all.map(function(o){return o.r;}))*1000)/1000;
  out.desc  = Math.round(p90(all.map(function(o){return o.d;}))*1000)/1000;
  // 高度分布直方图（0.05 一档）
  var hist={}; all.forEach(function(o){ var b=Math.round(o.r*20)/20; hist[b]=(hist[b]||0)+1; });
  out.hist = Object.keys(hist).map(function(k){ return {b:+k, n:hist[k]}; }).sort(function(a,b){return a.b-b.b;});
  return out;
})()`;

(async () => {
  const udir = '/tmp/cr-ink338c-' + Date.now();
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
  const v = (r.result && r.result.result && r.result.result.value) || null;
  ws.close(); chrome.kill();
  if (!v) { console.log('测量失败', JSON.stringify(r).slice(0, 600)); process.exit(1); }

  console.log('每组：', v.per.map(p => '#' + p.g + ' n=' + p.n + ' r=' + p.r + ' d=' + p.d).join(' | '));
  console.log('合并：n=' + v.n + '  ratio=' + v.ratio + '  desc=' + v.desc);
  console.log('高度分布（档:个数）：', v.hist.map(h => h.b.toFixed(2) + ':' + h.n).join('  '));
  // 按高度排序的字符唯一表
  const cs = Object.keys(v.chars).map(k => v.chars[k]).sort((a, b) => a.r - b.r);
  console.log('\n码位明细（按墨迹高度升序）：');
  cs.forEach(c => console.log('  ' + c.cp + '\tr=' + c.r + '\td=' + c.d + '\t出现 ' + c.n + ' 次'));
  const evenSize = (ratio) => Math.round((40.992 / ratio) / 2) * 2;
  console.log('\n按合并 ratio ' + v.ratio + ' → REC_ASS_SIZE = ' + evenSize(v.ratio));
})();
