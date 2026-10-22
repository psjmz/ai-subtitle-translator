/* v0.9.279：用项目自带的 deepseek 槽位批量补 27 语 UI 词条。
   ⚠️ 只读取 data/config.json 的 key，不改它。 */
const fs = require('fs');
const path = require('path');

/* ⚠️ 凭据放 /tmp（不进仓库）：线上 A 槽 deepseek-flash，只用于本次补词条 */
const CFG = JSON.parse(fs.readFileSync('/tmp/_key279.json', 'utf8'));
const BASE = CFG.base.replace(/\/+$/, '');
const KEY = CFG.key;
const MODEL = CFG.model || 'deepseek-chat';

/* 27 语：取自 site-i18n.js 的 UI_LANGS（顺序一致） */
const LANGS = [
  ['zh-CN', 'Simplified Chinese'], ['zh-TW', 'Traditional Chinese'], ['en', 'English'], ['ja', 'Japanese'],
  ['es', 'Spanish'], ['pt', 'Portuguese'], ['ko', 'Korean'], ['de', 'German'], ['fr', 'French'],
  ['id', 'Indonesian'], ['hi', 'Hindi'], ['th', 'Thai'], ['vi', 'Vietnamese'], ['ru', 'Russian'],
  ['it', 'Italian'], ['ar', 'Arabic'], ['tr', 'Turkish'], ['nl', 'Dutch'], ['pl', 'Polish'],
  ['sv', 'Swedish'], ['cs', 'Czech'], ['uk', 'Ukrainian'], ['da', 'Danish'], ['fi', 'Finnish'],
  ['el', 'Greek'], ['he', 'Hebrew'], ['ro', 'Romanian'],
];

async function chat(messages, maxTokens) {
  const r = await fetch(BASE + '/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + KEY },
    body: JSON.stringify({ model: MODEL, messages, temperature: 0.2, max_tokens: maxTokens || 4000 }),
  });
  if (!r.ok) throw new Error('HTTP ' + r.status + ' ' + (await r.text()).slice(0, 300));
  const j = await r.json();
  return (j.choices && j.choices[0] && j.choices[0].message && j.choices[0].message.content) || '';
}

function parseJsonArr(txt) {
  const s = txt.indexOf('[');
  const e = txt.lastIndexOf(']');
  if (s < 0 || e < 0) return null;
  try { return JSON.parse(txt.slice(s, e + 1)); } catch (err) { return null; }
}

/* 占位符 / 标签：翻译后必须原样保留 */
function slots(s) {
  const a = (String(s).match(/\{\d+\}/g) || []).sort().join(',');
  const b = (String(s).match(/<\/?[a-zA-Z][^>]*>/g) || []).sort().join(',');
  return a + '|' + b;
}

async function translateBatch(langName, langCode, items) {
  const src = items.map((it, i) => ({ i, zh: it.zh, en: it.en || '' }));
  const sys = 'You are a professional UI localizer for a web-based subtitle tool (subtitle translation, subtitle styling/effects, subtitle cleaning). '
    + 'Translate UI strings into ' + langName + ' (' + langCode + '). '
    + 'Rules: (1) Keep it short and natural — this is button/label/tooltip text, not prose. '
    + '(2) Preserve placeholders {0} {1} exactly. (3) Preserve inline HTML tags like <br> <em> <b> exactly. '
    + '(4) Do not add quotes, explanations or punctuation that was not in the source. '
    + '(5) Use the standard subtitle-domain term in ' + langName + ' (e.g. subtitle, cue, timecode, SRT, VTT, ASS, karaoke, style slot). '
    + 'Return ONLY a JSON array of {"i":<index>,"v":<translated string>}, same order, no markdown fence.';
  const usr = JSON.stringify(src, null, 0);
  let txt = await chat([{ role: 'system', content: sys }, { role: 'user', content: usr }], 6000);
  let arr = parseJsonArr(txt);
  if (!arr) { txt = await chat([{ role: 'system', content: sys }, { role: 'user', content: usr }], 6000); arr = parseJsonArr(txt); }
  return arr;
}

module.exports = { LANGS, chat, parseJsonArr, translateBatch, slots };

if (require.main === module) {
  (async () => {
    const ex = JSON.parse(fs.readFileSync('_extract279.json', 'utf8'));
    const gap = JSON.parse(fs.readFileSync('_gap279.json', 'utf8'));
    /* 试跑：特效页 5 条 → 西语 */
    const keys = gap.mergeNew.slice(0, 5);
    const items = keys.map(k => ({ zh: ex.merge['zh-CN'][k], en: ex.merge['en'][k] }));
    console.log('待翻样例：'); items.forEach((it, i) => console.log('  ' + keys[i] + ' | ' + it.zh + ' | ' + it.en));
    const arr = await translateBatch('Spanish', 'es', items);
    console.log('\n返回：'); (arr || []).forEach(o => console.log('  ' + keys[o.i] + ' → ' + o.v));
    console.log('\n占位符一致性：');
    (arr || []).forEach(o => {
      const okk = slots(items[o.i].en || items[o.i].zh) === slots(o.v);
      console.log('  ' + (okk ? '✓' : '✗') + ' ' + keys[o.i]);
    });
  })();
}
