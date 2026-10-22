/* v0.9.286：给新增的第五张外链卡补 26 语译文（zh-CN 已手写）
   词条：tcAsN = 'AI 营销视频'，tcAsD = '跨境投放素材：脚本、商品图、成片、字幕'

   用法：node _tr285.js           # 跑全部 26 语（已齐的自动跳过）
        node _tr285.js es        # 只跑一个语言试试

   ⚠️ 分批：多字节语言（泰/阿/希伯来/西里尔）一次吐太多会撞 max_tokens 被截断
   ⚠️ 注入点 = 各语言块里 tcDlD 那一行之后（沿用 282 的做法：跟在最后一条同类词条后面），
      不用块尾 —— 各语言块收尾形态不统一，插块尾容易插到注释后面去 */
'use strict';
const fs = require('fs');
const https = require('https');

const KEYFILE = '/tmp/_key279.json';
const OUT = '/tmp/_tr285.json';
const FILE = __dirname + '/site-i18n.js';
const KEYS = ['tcAsN', 'tcAsD'];
const LANGS = ['zh-TW', 'en', 'ja', 'es', 'pt', 'ko', 'de', 'fr', 'id', 'hi', 'th',
  'vi', 'ru', 'it', 'ar', 'tr', 'nl', 'pl', 'sv', 'cs', 'uk', 'da', 'fi', 'el', 'he', 'ro'];
const NAME = {
  'zh-TW': '繁體中文 (Traditional Chinese)', en: 'English', ja: '日本語 (Japanese)',
  es: 'Spanish', pt: 'Portuguese', ko: 'Korean', de: 'German', fr: 'French',
  id: 'Indonesian', hi: 'Hindi', th: 'Thai', vi: 'Vietnamese', ru: 'Russian',
  it: 'Italian', ar: 'Arabic', tr: 'Turkish', nl: 'Dutch', pl: 'Polish',
  sv: 'Swedish', cs: 'Czech', uk: 'Ukrainian', da: 'Danish', fi: 'Finnish',
  el: 'Greek', he: 'Hebrew', ro: 'Romanian'
};

const src = fs.readFileSync(FILE, 'utf8');
const seg = src.match(/const I18N = \{[\s\S]*?\n\};/)[0];
const I18N = eval('(' + seg.replace('const I18N = ', '').replace(/;\s*$/, '') + ')');

function chat(system, user) {
  return new Promise((res, rej) => {
    const cfg = JSON.parse(fs.readFileSync(KEYFILE, 'utf8'));
    const body = JSON.stringify({
      model: cfg.model,
      messages: [{ role: 'system', content: system }, { role: 'user', content: user }],
      temperature: 0.2, max_tokens: 4000
    });
    const u = new URL(cfg.base.replace(/\/$/, '') + '/chat/completions');
    const r = https.request({
      hostname: u.hostname, pathname: u.pathname, path: u.pathname, method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + cfg.key,
        'Content-Length': Buffer.byteLength(body)
      }
    }, x => {
      let d = '';
      x.on('data', c => d += c);
      x.on('end', () => { try { res(JSON.parse(d)); } catch (e) { rej(new Error(d.slice(0, 200))); } });
    });
    r.on('error', rej); r.write(body); r.end();
  });
}
function parseObj(txt) {
  let t = String(txt || '').trim().replace(/^```(?:json)?/i, '').replace(/```$/, '').trim();
  const i = t.indexOf('{'), j = t.lastIndexOf('}');
  if (i >= 0 && j > i) t = t.slice(i, j + 1);
  return JSON.parse(t);
}

(async () => {
  const want = process.argv[2] || 'all';
  const list = want === 'all' ? LANGS : [want];
  let acc = {};
  try { acc = JSON.parse(fs.readFileSync(OUT, 'utf8')); } catch (e) { acc = {}; }

  for (const L of list) {
    if (acc[L] && KEYS.every(k => String(acc[L][k] || '').trim())) {
      console.log('  跳过 ' + L + '（已完整）'); continue;
    }
    const sys = 'You are a professional UI localizer for a web-based subtitle tool suite. ' +
      'Translate each UI string into ' + (NAME[L] || L) + '. ' +
      'Style rules: natural, concise, real software UI wording — no marketing fluff, no sentence that describes a workflow or sequence. ' +
      'Keep these tokens EXACTLY as-is: AI, {0}. ' +
      'Each value MUST be a single line with no line breaks. Escape any double quote inside a value. ' +
      'Output ONLY a compact one-line JSON object mapping the same keys to the translated strings. No markdown fences, no explanations.';
    const payload = KEYS.map(k => ({ key: k, zh: I18N['zh-CN'][k] }));

    let got = null;
    for (let tryN = 0; tryN < 4 && !got; tryN++) {
      try {
        const r = await chat(sys, JSON.stringify(payload));
        const txt = r.choices && r.choices[0] && r.choices[0].message && r.choices[0].message.content;
        got = parseObj(txt);
        const n = KEYS.filter(k => typeof got[k] === 'string' && got[k].trim()).length;
        if (n < KEYS.length) { console.log('  ' + L + ' 第' + (tryN + 1) + '次只翻了 ' + n + '/' + KEYS.length + '，重试'); got = null; }
      } catch (e) { console.log('  ' + L + ' 出错: ' + e.message.slice(0, 90)); }
      if (!got) await new Promise(r => setTimeout(r, 1200));
    }
    if (!got) { console.log('  ✗ ' + L + ' 放弃'); continue; }
    acc[L] = { tcAsN: String(got.tcAsN).replace(/\s*[\r\n]+\s*/g, ' ').trim(),
                tcAsD: String(got.tcAsD).replace(/\s*[\r\n]+\s*/g, ' ').trim() };
    fs.writeFileSync(OUT, JSON.stringify(acc, null, 1));
    console.log('  ✓ ' + L + '  ' + acc[L].tcAsN + ' / ' + acc[L].tcAsD);
  }
  console.log('\n已写入 ' + OUT + '，共 ' + Object.keys(acc).length + '/26 语');
})();
