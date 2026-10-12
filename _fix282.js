/* v0.9.282：打补丁 —— 把体检查出来的「照抄中文 / 掺中文词」的几条重翻成对应语言
   ⚠️ 只动列出来的这几条，其余一律不碰
   用法：node _fix282.js            # 先 dry-run 看翻出来的值
        node _fix282.js --write    # 确认无误后写回 site-i18n.js */
'use strict';
const fs = require('fs');
const https = require('https');

const cfg = JSON.parse(fs.readFileSync('/tmp/_key279.json', 'utf8'));
const FILE = __dirname + '/site-i18n.js';
const s0 = fs.readFileSync(FILE, 'utf8');
const seg = s0.match(/const I18N = \{[\s\S]*?\n\};/)[0];
const I18N = eval('(' + seg.replace('const I18N = ', '').replace(/;\s*$/, '') + ')');

/* 要修的清单：[语言, key]。pl 那批是本次新品香肠；
   ko/th/it 那几条是早期翻译里夹带的中文词（ Ты же ） */
const FIX = [
  ['pl', 'lblFontShort'], ['pl', 'lblOutlineShort'], ['pl', 'lblAlphaShort'],
  ['pl', 'assFontTip'], ['pl', 'assOutlineTip'], ['pl', 'assAlphaTip'],
  ['ko', 'errCors'], ['th', 'modClWho'], ['th', 'wsRkSub'], ['ar', 'wsRkSub'],
  ['it', 'seoIntro']
];
const NAME = { pl: 'Polish', ko: 'Korean', th: 'Thai', ar: 'Arabic', it: 'Italian' };

function chat(system, user) {
  return new Promise((res, rej) => {
    const body = JSON.stringify({
      model: cfg.model,
      messages: [{ role: 'system', content: system }, { role: 'user', content: user }],
      temperature: 0.2, max_tokens: 2000
    });
    const u = new URL(cfg.base.replace(/\/$/, '') + '/chat/completions');
    const r = https.request({
      hostname: u.hostname, path: u.pathname, method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + cfg.key, 'Content-Length': Buffer.byteLength(body) }
    }, x => { let d = ''; x.on('data', c => d += c); x.on('end', () => { try { res(JSON.parse(d)); } catch (e) { rej(new Error(d.slice(0, 200))); } }); });
    r.on('error', rej); r.write(body); r.end();
  });
}
function jsonOf(txt) {
  let t = String(txt || '').trim().replace(/^```(?:json)?/i, '').replace(/```$/, '').trim();
  const i = t.indexOf('{'), j = t.lastIndexOf('}');
  if (i >= 0 && j > i) t = t.slice(i, j + 1);
  return JSON.parse(t);
}

/* 在源码里精确定位 "key:'值'" 并替换（值里可能有转义单引号） */
function repl(src, lang, key, val) {
  const bm = new RegExp("^'" + lang.replace('-', '\\-') + "':\\s*\\{", 'm').exec(src);
  if (!bm) throw new Error('找不到块 ' + lang);
  const kb = src.indexOf(key + ":'", bm.index);
  if (kb < 0) throw new Error('找不到 ' + lang + '.' + key);
  let i = kb + key.length + 2, out = '';
  while (i < src.length) {
    const c = src[i];
    if (c === '\\') { out += src[i] + src[i + 1]; i += 2; continue; }
    if (c === "'") break;
    out += c; i++;
  }
  return src.slice(0, kb + key.length + 2) + val.replace(/\\/g, '\\\\').replace(/'/g, "\\'") + src.slice(i);
}

(async () => {
  const byL = {};
  FIX.forEach(f => (byL[f[0]] = byL[f[0]] || []).push(f[1]));
  let s = s0, changed = 0;
  for (const L of Object.keys(byL)) {
    const payload = byL[L].map(k => ({ key: k, en: I18N.en[k] || I18N['zh-CN'][k], bad: I18N[L][k] }));
    const sys = 'You are a professional UI localizer for a subtitle-translation web app. ' +
      'Translate each UI string into ' + (NAME[L] || L) + '. The current value "bad" is WRONG (it is untranslated Chinese). ' +
      'Keep it natural and short, as real software UI wording. Keep tokens EXACTLY as-is: WebVTT, VTT, SRT, ASS, STYLE, {0}, {1}; ' +
      'render site names in Latin script (write "Bilibili" and "Douyin", never their Chinese names). ' +
      'Keep HTML tags such as <strong> untouched. Each value MUST be on one line. ' +
      'Output ONLY a compact JSON object mapping the same keys to the translated strings. No fences, no explanations.';
    let got = null;
    for (let n = 0; n < 4 && !got; n++) {
      try {
        const r = await chat(sys, JSON.stringify(payload));
        const t = r.choices && r.choices[0] && r.choices[0].message && r.choices[0].message.content;
        got = jsonOf(t);
        const miss = byL[L].filter(k => !got[k] || String(got[k]).trim() === String(I18N[L][k]).trim());
        if (miss.length) { console.log('  ' + L + ' 第' + (n + 1) + '次还有 ' + miss.length + ' 条没换，重试'); got = null; }
      } catch (e) { console.log('  ' + L + ' 出错: ' + e.message.slice(0, 80)); }
      if (!got) await new Promise(r => setTimeout(r, 1000));
    }
    if (!got) { console.log('  ✗ ' + L + ' 放弃'); continue; }
    byL[L].forEach(k => {
      const v = String(got[k]).replace(/\s*[\r\n]+\s*/g, ' ').trim();
      console.log('  ' + L + '.' + k);
      console.log('     旧: ' + String(I18N[L][k]).slice(0, 70));
      console.log('     新: ' + v.slice(0, 70));
      s = repl(s, L, k, v); changed++;
    });
  }
  if (process.argv.includes('--write')) {
    fs.writeFileSync(FILE, s);
    console.log('\n已写回 ' + FILE + '，共改 ' + changed + ' 条');
  } else {
    console.log('\nDRY-RUN：没写盘。确认无误后加 --write');
  }
})();
