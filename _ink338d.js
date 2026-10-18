/* _ink338d.js —— 选定藏文 bo（以及复核 hy/ka）的取法：三种口径对照
 *
 * 背景：藏文是垂直堆叠文字。单码位里有三类东西混在一起：
 *   ① 基础字母（U+0F40~0F6C）墨迹 0.46~0.79
 *   ② 元音符号（U+0F72 ི / 0F7A ེ / 0F7C ོ，Unicode 类别 Mn 组合标记）——单独测时
 *      ascent 0.83 / descent -0.56，也就是「悬浮在 baseline 上方很高处」，
 *      它叠加在基础字母上，不该当独立字符计入中位数，否则把整体压到 0.525
 *   ③ 下加字（U+0FB1 ྱ / 0FB2 ྲ / 0FB3 ླ）0.73~0.88，渲染时挂在基础字母下方
 *
 * 三种口径：
 *   A 逐字符、只滤标点（既有口径，藏文被元音符号拖低）
 *   B 逐字符、再滤组合标记 \p{M}（只留字形主体）
 *   C 整句 measureText 的墨迹高度（最贴近「一行字看起来的高度」，也是 REC_ASS_SIZE 真正要的量）
 *
 * 用既有语言（en hi th ar he te my lo ta kn ja ko zh-CN）同时算 A/B/C，
 * 看 B、C 与既有值的系统性偏差，再决定 bo 取哪个。
 *
 * 用法：node _ink338d.js
 */
'use strict';
const { spawn } = require('child_process');
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');

const DEBUG = Number(process.env.DEBUG_PORT || 9777);
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const sleep = ms => new Promise(r => setTimeout(r, ms));

const S = {
  'en': ['The quick brown fox jumps over the lazy dog', 'Subtitle translation tool for everyday use', 'Please check the second line before export'],
  'ru': ['Съешь же ещё этих мягких французских булок', 'Инструмент перевода субтитров на русский', 'Проверьте вторую строку перед экспортом'],
  'hi': ['सबटाइटल अनुवाद उपकरण हिन्दी', 'दूसरी पंक्ति की जाँच करें', 'यह एक लंबा वाक्य है'],
  'th': ['เครื่องมือแปลซับไตเติลภาษาไทย', 'ตรวจสอบบรรทัดที่สองก่อนส่งออก', 'นี่คือประโยคที่ยาวมาก'],
  'ar': ['أداة ترجمة الترجمة النصية بالعربية', 'تحقق من السطر الثاني قبل التصدير', 'هذه جملة طويلة جدا'],
  'he': ['כלי תרגום כתוביות בעברית', 'בדוק את השורה השנייה לפני הייצוא', 'זהו משפט ארוך מאוד'],
  'te': ['సబ్‌టైటిల్ అనువాద సాధనం తెలుగు', 'ఎగుమతి చేయడానికి ముందు రెండవ పంక్తిని తనిఖీ చేయండి', 'ఇది చాలా పొడవైన వాక్యం'],
  'my': ['စာတန်းထိုး ဘာသာပြန် ကိရိယာ မြန်မာ', 'ဒုတိယစာကြောင်းကို စစ်ဆေးပါ', 'ဒါက အရမ်းရှည်တဲ့ စာကြောင်း'],
  'lo': ['ເຄື່ອງມືແປຄຳບັນຍາຍພາສາລາວ', 'ກວດສອບແຖວທີສອງກ່ອນສົ່ງອອກ', 'ນີ້ແມ່ນປະໂຫຍກທີ່ຍາວຫຼາຍ'],
  'ta': ['வசனங்கள் மொழிபெயர்ப்பு கருவி தமிழ்', 'ஏற்றுமதிக்கு முன் இரண்டாவது வரியை சரிபார்க்கவும்', 'இது மிக நீண்ட வாக்கியம்'],
  'kn': ['ಉಪಶೀರ್ಷಿಕೆ ಅನುವಾದ ಸಾಧನ ಕನ್ನಡ', 'ರಫ್ತು ಮಾಡುವ ಮೊದಲು ಎರಡನೇ ಸಾಲನ್ನು ಪರಿಶೀಲಿಸಿ', 'ಇದು ತುಂಬಾ ಉದ್ದವಾದ ವಾಕ್ಯ'],
  'ja': ['字幕翻訳ツールの日本語の例文です', '書き出す前に二行目を確認してください', 'これはとても長い文です'],
  'ko': ['자막 번역 도구의 한국어 예문입니다', '내보내기 전에 두 번째 줄을 확인하세요', '이것은 매우 긴 문장입니다'],
  'zh-CN': ['字幕翻译工具的简体中文示例文字', '导出之前请先检查第二行内容', '这是一个非常长的句子'],
  'am': ['የትርጉም መሣሪያ በአማርኛ', 'ከመላኩ በፊት ሁለተኛውን መስመር ያረጋግጡ', 'ይህ በጣም ረጅም ዓረፍተ ነገር ነው'],
  // —— 本次要定的新书写系统 ——
  'hy': ['Սուբտիտրերի թարգմանության գործիք հայերեն', 'Բարև ձեզ ինչպես եք ես լավ եմ շնորհակալություն', 'Երևանը Հայաստանի մայրաքաղաքն է աշխարհում'],
  'ka': ['სუბტიტრების თარგმნის ხელსაწყო ქართული', 'გამარჯობა როგორ ხართ მე კარგად ვარ გმადლობთ', 'თბილისი საქართველოს დედაქალაქია მსოფლიოში'],
  'bo': ['ཟིན་བྲིས་ཡིག་སྒྱུར་ལག་ཆ་བོད་སྐད།', 'བོད་སྐད་ནི་བོད་ཀྱི་སྐད་ཆ་ཞིག་རེད།', 'ང་བདེ་པོ་ཡིན་ཁྱེད་རང་ག་རེ་བྱེད་ཀྱི་ཡོད།', 'དེང་སང་འཛམ་གླིང་ནང་མི་གྲངས་མང་པོ་ཡོད།', 'ལས་ཀ་དེ་ལེགས་པོ་བྱུང་བ་རེད་ཅེས་བཤད།'],
  'ti': ['መሳርያ ትርጉም ትሕቲ ጽሑፍ ትግርኛ', 'ሰላም ከመይ ኣሎኹም ኣነ ጽቡቕ ኣለኹ', 'ኤርትራን ትግራይን ብትግርኛ ይዛረቡ', 'ትግርኛ ብሰብ ኤርትራን ትግራይን ዝዝረብ ቋንቋ', 'ንሕና ሎሚ ኣብ ቤት ትምህርቲ ንኸይድ ኣለና']
};
const EXPECT = { 'en':0.545,'ru':0.545,'hi':0.645,'th':0.574,'ar':0.610,'he':0.524,'te':0.774,'my':0.556,'lo':0.531,'ta':0.519,'kn':0.797,'ja':0.861,'ko':0.874,'zh-CN':0.915,'am':0.852 };

const JS = `(function(){
  var S = ${JSON.stringify(S)};
  function med(a){ var s=a.slice().sort(function(p,q){return p-q;}); return s.length? s[Math.floor(s.length/2)] : 0; }
  var c=document.createElement('canvas'); c.width=3000; c.height=600;
  var x=c.getContext('2d'); x.textBaseline='alphabetic';
  x.font='100px "PingFang SC", "Helvetica Neue", Arial';
  var P=/[\\p{P}\\p{S}\\p{C}\\p{Z}\\p{N}]/u, M=/\\p{M}/u;
  var out={};
  Object.keys(S).forEach(function(k){
    var A=[], B=[], C=[];
    S[k].forEach(function(txt){
      var t=txt.replace(/\\s+/g,'');
      // C：整句墨迹
      var m=x.measureText(t);
      if (m.actualBoundingBoxAscent||m.actualBoundingBoxDescent) C.push((m.actualBoundingBoxAscent+m.actualBoundingBoxDescent)/100);
      Array.from(t).forEach(function(ch){
        if (P.test(ch)) return;
        var mm=x.measureText(ch);
        var a=mm.actualBoundingBoxAscent, d=mm.actualBoundingBoxDescent;
        if (!(a||d)) return;
        if (a+d < 8) return;                 // 极小的分隔符
        A.push((a+d)/100);
        if (M.test(ch)) return;              // B：再滤组合标记
        B.push((a+d)/100);
      });
    });
    var f=function(v){ return Math.round(med(v)*1000)/1000; };
    out[k]={ A:f(A), B:f(B), C:f(C), nA:A.length, nB:B.length };
  });
  return out;
})()`;

(async () => {
  const udir = '/tmp/cr-ink338d-' + Date.now();
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

  console.log('lang\tA(只滤标点)\tB(再滤组合标记)\tC(整句)\t既有值\tA-既有\tB-既有\tC-既有\tnA/nB');
  const dA = [], dB = [];
  Object.keys(S).forEach(k => {
    const o = v[k], e = EXPECT[k];
    const s = (x) => (e == null ? '—' : (Math.round((x - e) * 1000) / 1000));
    console.log(k + '\t' + o.A + '\t' + o.B + '\t' + o.C + '\t' + (e == null ? '—' : e) + '\t' + s(o.A) + '\t' + s(o.B) + '\t' + s(o.C) + '\t' + o.nA + '/' + o.nB);
    if (e != null) { dA.push(Math.abs(o.A - e)); dB.push(Math.abs(o.B - e)); }
  });
  const avg = (a) => Math.round(a.reduce((p, q) => p + q, 0) / a.length * 1000) / 1000;
  console.log('\n既有 15 种的平均绝对偏差：A=' + avg(dA) + '  B=' + avg(dB) + '  → 偏差小的口径更贴近既有值');
})();
