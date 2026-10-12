/* v0.9.282：补齐共享词典里 52 条 VTT 面板词条的 23 语译文
   （zh-CN / zh-TW / en / ja 本来就有，其余 23 语缺失 → 回退中文）
   用法：node _tr281.js es        # 试一个语言
        node _tr281.js all       # 跑全部 23 语（已完整的语言自动跳过）
   结果落在 /tmp/_tr281.json（key 从 /tmp/_key279.json 读，不入库）

   ⚠️ 必须分批：52 条一次性让模型吐，西里尔/泰文这类多字节语言会撞 max_tokens 被截断
      （表现是 "Unexpected end of JSON input" / "Unterminated string"，13/23 语栽在这）。
      改成 BATCH 条一批，失败只重跑那一批，比整语言重来省事得多 */
'use strict';
const fs = require('fs');
const https = require('https');

const KEYFILE = '/tmp/_key279.json';
const OUT = '/tmp/_tr281.json';
const LANGS = ['es', 'pt', 'ko', 'de', 'fr', 'id', 'hi', 'th', 'vi', 'ru', 'it',
  'ar', 'tr', 'nl', 'pl', 'sv', 'cs', 'uk', 'da', 'fi', 'el', 'he', 'ro'];
const NAME = { es: '西班牙语 (Spanish)', pt: '葡萄牙语 (Portuguese)', ko: '韩语 (Korean)', de: '德语 (German)',
  fr: '法语 (French)', id: '印尼语 (Indonesian)', hi: '印地语 (Hindi)', th: '泰语 (Thai)', vi: '越南语 (Vietnamese)',
  ru: '俄语 (Russian)', it: '意大利语 (Italian)', ar: '阿拉伯语 (Arabic)', tr: '土耳其语 (Turkish)',
  nl: '荷兰语 (Dutch)', pl: '波兰语 (Polish)', sv: '瑞典语 (Swedish)', cs: '捷克语 (Czech)', uk: '乌克兰语 (Ukrainian)',
  da: '丹麦语 (Danish)', fi: '芬兰语 (Finnish)', el: '希腊语 (Greek)', he: '希伯来语 (Hebrew)', ro: '罗马尼亚语 (Romanian)' };

/* 从 site-i18n.js 里取出 I18N */
const src = fs.readFileSync(__dirname + '/site-i18n.js', 'utf8');
const seg = src.match(/const I18N = \{[\s\S]*?\n\};/)[0];
const I18N = eval('(' + seg.replace('const I18N = ', '').replace(/;\s*$/, '') + ')');
const BASE = Object.keys(I18N['zh-CN']);
const MISS = BASE.filter(k => !(k in I18N.es));
if (!MISS.length) { console.log('没有缺项，退出'); process.exit(0); }

const cfg = JSON.parse(fs.readFileSync(KEYFILE, 'utf8'));

function chat(system, user) {
  return new Promise((res, rej) => {
    const body = JSON.stringify({
      model: cfg.model,
      messages: [{ role: 'system', content: system }, { role: 'user', content: user }],
      temperature: 0.2, max_tokens: 4000
    });
    const u = new URL(cfg.base.replace(/\/$/, '') + '/chat/completions');
    const r = https.request({
      hostname: u.hostname, path: u.pathname, method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + cfg.key, 'Content-Length': Buffer.byteLength(body) }
    }, x => { let d = ''; x.on('data', c => d += c); x.on('end', () => { try { res(JSON.parse(d)); } catch (e) { rej(new Error(d.slice(0, 200))); } }); });
    r.on('error', rej); r.write(body); r.end();
  });
}
function parseJsonArr(txt) {
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
    let done = acc[L] || {};
    const lack = MISS.filter(k => !done[k] || !String(done[k]).trim());
    if (!lack.length) { console.log('  跳过 ' + L + '（已完整）'); continue; }
    /* 源用英文（术语与语序更贴），中文只作兜底；一条一条给 key，避免模型搞错映射 */
    const payloadOf = ks => ks.map(k => ({ key: k, en: I18N.en[k] || I18N['zh-CN'][k] }));
    const sys = 'You are a professional UI localizer for a subtitle-translation web app. ' +
      'Translate each UI string into ' + (NAME[L] || L) + '. Keep it natural and short, as real software UI wording. ' +
      'Keep these tokens EXACTLY as-is: WebVTT, VTT, SRT, ASS, STYLE, JSON, line, position, {0}; keep brand names and file names unchanged. ' +
      'Each value MUST be a single line with no line breaks. Escape any double quote inside a value. ' +
      'Output ONLY a compact JSON object (one line) mapping the same keys to the translated strings. No markdown fences, no explanations.';

    const BATCH = 13;                       // 13 条一批 → 4 批跑完 52 条
    for (let bi = 0; bi * BATCH < lack.length; bi++) {
      const part = lack.slice(bi * BATCH, bi * BATCH + BATCH);
      let got = null;
      for (let tryN = 0; tryN < 4 && !got; tryN++) {
        try {
          const r = await chat(sys, JSON.stringify(payloadOf(part)));
          const txt = r.choices && r.choices[0] && r.choices[0].message && r.choices[0].message.content;
          got = parseJsonArr(txt);
          const n = part.filter(k => typeof got[k] === 'string' && got[k].trim()).length;
          if (n < part.length) { console.log('  ' + L + ' 第' + (bi + 1) + '批 第' + (tryN + 1) + '次 ' + n + '/' + part.length + '，重试'); got = null; }
        } catch (e) { console.log('  ' + L + ' 第' + (bi + 1) + '批 出错: ' + e.message.slice(0, 90)); }
        if (!got) await new Promise(r => setTimeout(r, 1200));
      }
      if (!got) { console.log('  ✗ ' + L + ' 第' + (bi + 1) + '批 放弃（共 ' + lack.length + ' 条里的 ' + part.length + ' 条）'); continue; }
      part.forEach(k => done[k] = String(got[k]).replace(/\s*[\r\n]+\s*/g, ' ').trim());
      acc[L] = done;
      fs.writeFileSync(OUT, JSON.stringify(acc, null, 1));
    }
    const okN = MISS.filter(k => done[k] && String(done[k]).trim()).length;
    console.log((okN >= MISS.length ? '  ✓ ' : '  △ ') + L + ' ' + okN + '/' + MISS.length + (done[MISS[0]] ? '  例: ' + done[MISS[0]].slice(0, 40) : ''));
  }
  console.log('已写入 ' + OUT + '，共 ' + Object.keys(acc).length + ' 个语言');
})();
