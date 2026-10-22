/* v0.9.279：给特效页 / 清洗页补齐 27 语 UI 词条。
   策略：① 共享词典里有「key 同名 + 中文原文相同」的直接复用；② 其余调 A 槽批量翻译；
        ③ 占位符/标签不一致的重试一次，仍失败回退英文；④ 结果增量落盘，可断点续跑。 */
const fs = require('fs');
const { LANGS, chat, parseJsonArr, slots } = require('./_tr279.js');

const OUT = '_fill279.json';
const BATCH = 40;
const CONC = 5;

const ex = JSON.parse(fs.readFileSync('_extract279.json', 'utf8'));
const gap = JSON.parse(fs.readFileSync('_gap279.json', 'utf8'));

const out = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, 'utf8')) : { merge: {}, clean: {} };

/* ---- 复用：key 同名且中文原文完全一致才敢复用（否则是同名不同义） ---- */
function reuse(page, lang, keys) {
  const got = {};
  keys.forEach(k => {
    const zh = ex[page]['zh-CN'][k];
    if (ex.dict['zh-CN'] && ex.dict['zh-CN'][k] === zh && ex.dict[lang] && ex.dict[lang][k] != null) {
      got[k] = ex.dict[lang][k];
    }
  });
  return got;
}

async function translateBatch(langName, langCode, keys, page) {
  const items = keys.map(k => ({ k, zh: ex[page]['zh-CN'][k], en: ex[page]['en'][k] || '' }));
  const sys = 'You are a professional UI localizer for a web-based subtitle tool (subtitle translation, subtitle styling/effects, subtitle cleaning). '
    + 'Translate UI strings into ' + langName + ' (' + langCode + '). '
    + 'Rules: (1) Keep it short and natural — button/label/tooltip text, not prose. '
    + '(2) Preserve placeholders {0} {1} exactly. (3) Preserve inline HTML tags like <br> <em> <b> exactly. '
    + '(4) Do not add quotes, explanations, or trailing punctuation absent from the source. '
    + '(5) Use the standard subtitle-domain term in ' + langName + ' (subtitle, cue, timecode, SRT, VTT, ASS, karaoke, style slot). '
    + 'Return ONLY a JSON array of {"k":<key>,"v":<translated string>}, no markdown fence.';
  const usr = JSON.stringify(items.map(x => ({ k: x.k, zh: x.zh, en: x.en })), null, 0);
  let txt = await chat([{ role: 'system', content: sys }, { role: 'user', content: usr }], 8000);
  let arr = parseJsonArr(txt);
  if (!arr) { txt = await chat([{ role: 'system', content: sys }, { role: 'user', content: usr }], 8000); arr = parseJsonArr(txt); }
  if (!arr) return null;
  const map = {};
  arr.forEach(o => { if (o && o.k != null && typeof o.v === 'string') map[o.k] = o.v; });
  return map;
}

async function runPage(page, have) {
  const allKeys = gap[page + 'Keys'];
  const todoLangs = LANGS.filter(l => have.indexOf(l[0]) < 0);
  console.log('\n===== ' + page + '：' + allKeys.length + ' 条 × ' + todoLangs.length + ' 语 =====');
  for (const [code, name] of todoLangs) {
    if (out[page][code]) { console.log('  ' + code + ' 已有，跳过'); continue; }
    const reused = reuse(page, code, allKeys);
    const need = allKeys.filter(k => !(k in reused));
    const res = Object.assign({}, reused);
    const batches = [];
    for (let i = 0; i < need.length; i += BATCH) batches.push(need.slice(i, i + BATCH));
    let bad = 0;
    for (let i = 0; i < batches.length; i += CONC) {
      const grp = batches.slice(i, i + CONC);
      const rs = await Promise.all(grp.map(b => translateBatch(name, code, b, page).catch(() => null)));
      rs.forEach((m, gi) => {
        const b = grp[gi];
        if (!m) { b.forEach(k => { res[k] = ex[page]['en'][k]; bad++; }); return; }
        b.forEach(k => {
          const v = m[k];
          const okv = typeof v === 'string' && v.length > 0
            && slots(ex[page]['en'][k] || ex[page]['zh-CN'][k]) === slots(v);
          res[k] = okv ? v : ex[page]['en'][k];
          if (!okv) bad++;
        });
      });
      process.stdout.write('    ' + code + ' 批次 ' + Math.min(i + CONC, batches.length) + '/' + batches.length + '\r');
    }
    const miss = allKeys.filter(k => !(k in res));
    console.log('  ✓ ' + code + ' ' + Object.keys(res).length + '/' + allKeys.length +
      '（复用 ' + Object.keys(reused).length + '，降级英文 ' + bad + '，缺失 ' + miss.length + '）');
    out[page][code] = res;
    fs.writeFileSync(OUT, JSON.stringify(out, null, 1));
  }
}

(async () => {
  await runPage('clean', ['zh-CN', 'en']);
  await runPage('merge', ['zh-CN', 'zh-TW', 'en', 'ja']);
  console.log('\n全部完成 → ' + OUT);
})();
