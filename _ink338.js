/* _ink338.js —— 338 扩语言：headless canvas 实测字形墨迹比
 *
 * 目的：目标语言 75 → 100，新增语言里有 4 个此前没出现过的书写系统
 *       （亚美尼亚 hy / 格鲁吉亚 ka / 吉兹 ti / 藏文 bo），需要实测墨迹比
 *       INK_RATIO 与下伸深度 INK_DESC，其余拉丁·西里尔·阿拉伯·希伯来沿用既有值。
 *
 * 方法（与 v0.9.105/109/112 三批完全一致，保证口径可对照）：
 *   100px 字体栈 "PingFang SC"/"Helvetica Neue"/Arial，逐字符取
 *     measureText(ch).actualBoundingBoxAscent + Descent，滤掉标点与空白后取中位数 → INK_RATIO
 *   baseline 下方墨迹深度 actualBoundingBoxDescent / 100 取 p90 → INK_DESC
 *
 * 取信前提：先复现既有值（en 0.545 / th 0.574 / vi 0.712 / hi 0.645 / ar 0.610；
 *   INK_DESC: te 0.02 / lo 0.02 / ta 0.25 / my 0.47 / he 0.05/ kn 0.144），对不上就不采信新值。
 *
 * 用法：node _ink338.js   → 打印每种语言 ratio / desc / 样本字符数 / 宽度唯一值数（查 tofu）
 */
'use strict';
const { spawn } = require('child_process');
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');

const DEBUG = Number(process.env.DEBUG_PORT || 9771);
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const sleep = ms => new Promise(r => setTimeout(r, ms));

/* 每种语言一段真实文本（取自该语维基/常用句），含常见字母与下伸字母 */
const SAMPLE = {
  // —— 校验组：既有值必须复现 ——
  'en': 'The quick brown fox jumps over the lazy dog',
  'ru': 'Съешь же ещё этих мягких французских булок',
  'zh-CN': '字幕翻译工具的简体中文示例文字',
  'zh-TW': '字幕翻譯工具的繁體中文範例文字',
  'ja': '字幕翻訳ツールの日本語の例文です',
  'ko': '자막 번역 도구의 한국어 예문입니다',
  'th': 'เครื่องมือแปลซับไตเติลภาษาไทย',
  'vi': 'Công cụ dịch phụ đề tiếng Việt',
  'hi': 'सबटाइटल अनुवाद उपकरण हिन्दी',
  'ar': 'أداة ترجمة الترجمة النصية بالعربية',
  'he': 'כלי תרגום כתוביות בעברית',
  'el': 'Εργαλείο μετάφρασης υποτίτλων στα ελληνικά',
  'te': 'సబ్‌టైటిల్ అనువాద సాధనం తెలుగు',
  'lo': 'ເຄື່ອງມືແປຄຳບັນຍາຍພາສາລາວ',
  'ta': 'வசனங்கள் மொழிபெயர்ப்பு கருவி தமிழ்',
  'my': 'စာတန်းထိုး ဘာသာပြန် ကိရိယာ မြန်မာ',
  'kn': 'ಉಪಶೀರ್ಷಿಕೆ ಅನುವಾದ ಸಾಧನ ಕನ್ನಡ',
  'am': 'የትርጉም መሣሪያ በአማርኛ',
  'bn': 'সাবটাইটেল অনুবাদ সরঞ্জাম বাংলা',
  // —— 338 新增 25 种 ——
  'yue': '粵語字幕翻譯工具嘅廣東話例句',
  'be': 'Інструмент перакладу субтытраў беларуская',
  'tg': 'Воситаи тарҷумаи субтитрҳо тоҷикӣ',
  'ky': 'Субтитр котормо куралы кыргызча',
  'tk': 'Subtitrlar terjime guraly türkmen',
  'bs': 'Alat za prijevod titlova bosanski',
  'mt': 'Għodda għat-traduzzjoni tas-sottotitoli Malti',
  'cy': 'Offeryn cyfieithu is-deitlau Cymraeg',
  'ga': 'Uirlis aistrithe fotheidil Gaeilge',
  'hy': 'Սուբտիտրերի թարգմանության գործիք հայերեն',
  'ka': 'სუბტიტრების თარგმნის ხელსაწყო ქართული',
  'ti': 'መሳርያ ትርጉም ትሕቲ ጽሑፍ ትግርኛ',
  'bo': 'ཟིན་བྲིས་ཡིག་སྒྱུར་ལག་ཆ་བོད་སྐད།',
  'ug': 'تېكىست تەرجىمە قورالى ئۇيغۇرچە',
  'sd': 'ذيلي عنوان جو ترجمو اوزار سنڌي',
  'yi': 'געצייג פאר אונטערטיטל איבערזעצונג יידיש',
  'jv': 'Piranti pertalan subtitle basa Jawa',
  'su': 'Pakakas tarjamah subjudul basa Sunda',
  'ceb': 'Himanan sa paghubad sa subculo nga Cebuano',
  'mg': 'Fitaovana fandikana dikanteny malagasy',
  'ig': 'Ngwa ntụgharị ndepụta okwu Igbo',
  'xh': 'Isixhobo soguqulo lwemibhalo isiXhosa',
  'sn': 'Chishandiso chekushandura zvinyorwa chiShona',
  'ny': 'Chida chomasulira mawu a Chichewa',
  'mi': 'Taputapu whakamāori kupu hauraro te reo Māori'
};

const JS = `(function(){
  var S = ${JSON.stringify(SAMPLE)};
  function med(a){ var s=a.slice().sort(function(p,q){return p-q;}); return s.length? s[Math.floor(s.length/2)] : 0; }
  function p90(a){ var s=a.slice().sort(function(p,q){return p-q;}); return s.length? s[Math.min(s.length-1, Math.floor(s.length*0.9))] : 0; }
  var c=document.createElement('canvas'); c.width=2400; c.height=500;
  var x=c.getContext('2d');
  x.textBaseline='alphabetic';
  x.font='100px "PingFang SC", "Helvetica Neue", Arial';
  var out={};
  Object.keys(S).forEach(function(k){
    var txt=S[k].replace(/\\s+/g,'');
    var arr=Array.from(txt), rows=[];
    for (var i=0;i<arr.length;i++){
      var ch=arr[i];
      try { if (/[\\u0020-\\u002F\\u003A-\\u0040\\u005B-\\u0060\\u007B-\\u007E\\u00A0-\\u00BF\\u2000-\\u206F\\u3000-\\u303F]/.test(ch)) continue; } catch(e){}
      var m=x.measureText(ch);
      var asc=m.actualBoundingBoxAscent, desc=m.actualBoundingBoxDescent;
      if (!(asc||desc)) continue;
      rows.push({ch:ch, r:(asc+desc)/100, d:desc/100, w:Math.round(m.width*100)/100});
    }
    var ws={}; rows.forEach(function(o){ ws[o.w]=1; });
    out[k]={ n: rows.length, ratio: Math.round(med(rows.map(function(o){return o.r;}))*1000)/1000,
             desc: Math.round(p90(rows.map(function(o){return o.d;}))*1000)/1000,
             uq: Object.keys(ws).length, min: Math.round(Math.min.apply(null,rows.map(function(o){return o.r;}))*1000)/1000,
             max: Math.round(Math.max.apply(null,rows.map(function(o){return o.r;}))*1000)/1000 };
  });
  return out;
})()`;

(async () => {
  const udir = '/tmp/cr-ink338-' + Date.now();
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
  if (!val) { console.log('测量失败', JSON.stringify(r).slice(0, 500)); process.exit(1); }

  const EXPECT_R = { 'en':0.545,'th':0.574,'vi':0.712,'hi':0.645,'ar':0.610,'he':0.524,'el':0.683,'te':0.774,'lo':0.531,'ta':0.519,'my':0.556,'kn':0.797,'am':0.852,'bn':0.657,'zh-CN':0.915,'zh-TW':0.907,'ja':0.861,'ko':0.874,'ru':0.545 };
  const EXPECT_D = { 'te':0.02,'lo':0.02,'ta':0.25,'my':0.47,'he':0.05,'kn':0.144,'zh-CN':0.08,'ja':0.08,'ko':0.08,'en':0.21 };
  console.log('lang\tn\tink\tink(既有)\tdesc\tdesc(既有)\t宽度唯一值\t区间');
  Object.keys(SAMPLE).forEach(k => {
    const o = val[k] || {};
    const er = EXPECT_R[k], ed = EXPECT_D[k];
    const rflag = er == null ? '' : (Math.abs(o.ratio - er) <= 0.015 ? ' ✓' : ' ✗ 差' + Math.round((o.ratio - er) * 1000) / 1000);
    const dflag = ed == null ? '' : (Math.abs(o.desc - ed) <= 0.015 ? ' ✓' : ' ✗ 差' + Math.round((o.desc - ed) * 1000) / 1000);
    console.log(k + '\t' + o.n + '\t' + o.ratio + '\t' + (er == null ? '—' : er + rflag) + '\t' + o.desc + '\t' + (ed == null ? '—' : ed + dflag) + '\t' + o.uq + '\t' + o.min + '~' + o.max);
  });
})();
