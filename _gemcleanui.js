/* _gemcleanui.js —— 修掉界面分片（i18n/ui-<lang>.js）里的「混字」
 *
 * 与 _gemclean.js 的关系：同一类错误（Gemini 把别的文字系统的字母夹进译文），
 * 不同的数据源。这里动的是 _tr/<lang>.json（337 键界面词典，339 那轮的产物），
 * 改完还要重跑 _mk339.js 重新出分片 —— 所以另写一份，不去动 _gemclean.js。
 *
 * 为什么值得修：这批已经在线上。bo（藏语）一个就有 31 条里夹格鲁吉亚/希腊/梵文字母，
 * sd（信德语）13 条、ug（维吾尔语）7 条 …… 母语者打开就是乱码，
 * 而且因为长得也像字，肉眼复查基本发现不了（就是 _bo_ 那次才暴露的）。
 *
 * 用法：
 *   node _gemcleanui.js            # 修所有查出混字的语言
 *   node _gemcleanui.js bo sd      # 指定语种
 *
 * 判据：与 _mixed.js 同源（scriptsOf 主文字投票）。拉丁借词放行。
 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { execFileSync } = require('child_process');
const { openSession, parseLines, sleep } = require('./_gemcdp.js');
const SCRIPT = require('./_mixed.js').scriptsOf;

const DIR = __dirname;
const CORE = JSON.parse(fs.readFileSync(path.join(DIR, '_core338.json'), 'utf8'));
const KEYS = Object.keys(CORE);
const EN = {};
for (const k of KEYS) EN[k] = CORE[k].en;

const NODE = process.execPath;

/* 语言码 → [母语自称, 英文名] */
const NATIVE = {}, EN_NAME = {};
{
  const ctx = { window: {} }; ctx.globalThis = ctx; vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(path.join(DIR, 'site-i18n.js'), 'utf8') + ';globalThis.__U = UI_LANGS;', ctx);
  for (const [c, n] of ctx.__U) NATIVE[c] = n;
  const tl = fs.readFileSync(path.join(DIR, 'translate.html'), 'utf8');
  const lb = tl.indexOf('const LANGS = [');
  const seg = tl.slice(lb, tl.indexOf('];', lb));
  const re = /\{\s*v\s*:\s*'([^']+)'[\s\S]*?en\s*:\s*'([^']*)'/g;
  let m; while ((m = re.exec(seg))) EN_NAME[m[1]] = m[2];
}

const SAY = {
  Ethiopic: 'Ethiopic (Ge\'ez) script', Tibetan: 'Tibetan script', Gurmukhi: 'Gurmukhi script',
  Devanagari: 'Devanagari script', Bengali: 'Bengali script', Tamil: 'Tamil script',
  Telugu: 'Telugu script', Kannada: 'Kannada script', Malayalam: 'Malayalam script',
  Sinhala: 'Sinhala script', Gujarati: 'Gujarati script', Oriya: 'Odia script',
  Thai: 'Thai script', Lao: 'Lao script', Khmer: 'Khmer script', Myanmar: 'Burmese script',
  Georgian: 'Georgian script', Armenian: 'Armenian script', Greek: 'Greek script',
  Cyrillic: 'Cyrillic script', Arabic: 'Arabic script', Hebrew: 'Hebrew script',
  Hangul: 'Hangul', Hiragana: 'Japanese kana', Katakana: 'Japanese kana',
  Han: 'Chinese characters', Thaana: 'Thaana script', Syriac: 'Syriac script',
  Cherokee: 'Cherokee script', Latin: 'Latin script'
};
const say = s => SAY[s] || (s + ' script');

function mainScript(tr) {
  const vote = {};
  for (const k of KEYS) for (const s of SCRIPT(String(tr[k] || ''))) vote[s] = (vote[s] || 0) + 1;
  return Object.keys(vote).sort((a, b) => vote[b] - vote[a])[0] || 'Latin';
}
function clean(main, v) {
  const set = SCRIPT(String(v));
  if (!set.size) return true;
  for (const s of set) {
    if (s === main) continue;
    if (s === 'Latin' && main !== 'Latin') continue;   /* Batch / MP4 之类借词正常 */
    return false;
  }
  return true;
}

/* ⚠️ 输入是「KEY :: 错值 :: 英文原意」三段式，输出也是这个格式（模型会照抄），
      所以不能按第一个 ' :: ' 就直接取值，必须把末尾的英文剥掉。 */
function parse3(text) {
  const map = {};
  for (const raw of text.split('\n')) {
    const line = raw.replace(/\r$/, '');
    if (!line.trim()) continue;
    const i = line.indexOf(' :: ');
    if (i <= 0) continue;
    const key = line.slice(0, i).trim();
    if (!/^[A-Za-z0-9_]+$/.test(key)) continue;
    let val = line.slice(i + 4).replace(/^`+|`+$/g, '').trim();
    if (EN[key] !== undefined) {
      const suf = ' :: ' + String(EN[key]);
      if (val.endsWith(suf)) val = val.slice(0, -suf.length).trim();
    }
    map[key] = val;
  }
  return map;
}

/* 两种问法：
 *   A 带错值（默认）—— 模型有对照，改动小，但会把错值里的外文字母照抄回来，bo 连试 3 轮都不干净。
 *   B 不带错值（NOECHO=1）—— 只给英文原意重新译。少了「照抄」这条捷径，实测更稳。
 *     代价：可能与页面别处的同一词条用词不一致，所以只在 A 失败时兜底用。 */
function prompt(enName, native, main, rows, warn) {
  const head = NOECHO
    ? [
        'These are user-interface strings of AI-SRTSub, a subtitle translator website.',
        `Translate each English line into ${enName} (${native}).`,
        `Write ONLY in the ${say(main)} — not a single letter from any other script.`,
        'Keep the {n} placeholders and any <b>/<em> tags exactly as they are, unchanged.',
        '',
        'Input:  KEY :: English text',
        'Output: KEY :: translation   (same order, same number of lines, no extra text)',
        ''
      ]
    : [
        'These are user-interface strings of AI-SRTSub, a subtitle translator website.',
        `They must be written entirely in ${enName} (${native}), which uses the ${say(main)}.`,
        '',
        `Every line below is WRONG: ${warn}`,
        'Rewrite each line using ONLY the ' + say(main) + '. Not a single letter from another script.',
        'Keep the meaning identical; keep the {n} placeholders and any <b>/<em> tags exactly as they are.',
        '',
        'Input:  KEY :: wrong text :: English meaning',
        'Output: KEY :: corrected text   (same order, same number of lines)',
        ''
      ];
  const body = NOECHO
    ? rows.map(r => r.key + ' :: ' + String(EN[r.key])).join('\n')
    : rows.map(r => r.key + ' :: ' + String(tr0[r.key]) + ' :: ' + String(EN[r.key])).join('\n');
  return head.concat([body]).join('\n');
}
let tr0 = {};   /* prompt() 里要读当前值，用模块级变量传进去（避免改函数签名） */
const NOECHO = !!process.env.NOECHO;   /* 1 = 只给英文原意重译（见 prompt 注释） */

(async () => {
  const args = process.argv.slice(2).filter(a => !a.startsWith('--'));
  const BATCH = parseInt(process.env.BATCH || '12', 10);   /* 每次请求最多几条：长串容易吐不完 */

  const work = [];
  for (const f of fs.readdirSync(path.join(DIR, '_tr'))) {
    if (!/^[a-z]{2,3}(-[A-Za-z]{2,4})?\.json$/.test(f)) continue;
    const lang = f.replace(/\.json$/, '');
    if (args.length && args.indexOf(lang) < 0) continue;
    if (/^(zh|ja|ko|yue)/.test(lang)) continue;
    const tr = JSON.parse(fs.readFileSync(path.join(DIR, '_tr', f), 'utf8'));
    const main = mainScript(tr);
    const rows = KEYS.filter(k => String(tr[k] || '') && !clean(main, tr[k]))
      .map(k => ({ key: k, mixed: [...SCRIPT(String(tr[k]))].filter(s => s !== main && s !== 'Latin')[0] }));
    if (rows.length) work.push({ lang, tr, main, rows });
  }
  if (!work.length) { console.log('没有混字的界面译文，收工。'); return; }
  console.log('待修：' + work.length + ' 种语言，共 ' + work.reduce((a, b) => a + b.rows.length, 0) + ' 条\n');

  const S = await openSession(process.env.GEM_SESSION || 'uiclean');
  const results = [];
  let chatAge = 0;

  for (const job of work) {
    const { lang, tr, main, rows } = job;
    tr0 = tr;
    const enName = EN_NAME[lang] || lang, native = NATIVE[lang] || lang;
    const seen = [...new Set(rows.map(r => r.mixed))].join(' / ');
    console.log('[' + lang + '] ' + enName + ' / ' + native + '  主文字 ' + main + '，' + rows.length + ' 条待修（混入 ' + seen + '）');

    if (chatAge === 0) await S.newChat();
    chatAge = (chatAge + 1) % 6;

    const got = {};
    for (let bi = 0; bi < rows.length; bi += BATCH) {
      const part = rows.slice(bi, bi + BATCH);
      let todo = part.slice();
      for (let round = 1; round <= 2 && todo.length; round++) {
        try {
          const warn = 'it contains ' + todo.map(r => r.mixed).filter((v, i, a) => a.indexOf(v) === i).map(say).join(' and ') + ' letters that do not belong to ' + say(main) + '.';
          const text = await S.ask(prompt(enName, native, main, todo, warn), 60, 1200);
          if (process.env.GEM_DEBUG) fs.writeFileSync(path.join(DIR, '_trnav', 'dbgu-' + lang + '-b' + bi + '-r' + round + '.txt'), text);
          const map = parse3(text);
          /* ⚠️ todo 里是对象 {key,mixed}，按字符串迭代会拿到 map[[object Object]] = undefined */
          for (const r of todo) if (map[r.key] && map[r.key].trim()) got[r.key] = map[r.key].trim();
          todo = todo.filter(r => !(got[r.key] && clean(main, got[r.key])));
          if (todo.length) console.log('  批 ' + bi + ' 第 ' + round + ' 轮后仍脏 ' + todo.length + ' 条');
        } catch (e) {
          console.log('  ' + lang + ' 批 ' + bi + ' 第 ' + round + ' 轮异常：' + e.message.slice(0, 100));
          await sleep(3000);
        }
      }
      if (bi + BATCH < rows.length) await sleep(500);
    }

    /* 占位符/标签必须照旧 —— 只接受「除了文字系统之外没动其它东西」的结果 */
    let changed = 0;
    for (const k of Object.keys(got)) {
      const v = String(got[k]);
      const aPh = (String(EN[k]).match(/\{\d\}/g) || []).sort().join(',');
      const bPh = (v.match(/\{\d\}/g) || []).sort().join(',');
      const aTg = (String(EN[k]).match(/<\/?(b|em)>/g) || []).sort().join(',');
      const bTg = (v.match(/<\/?(b|em)>/g) || []).sort().join(',');
      if (aPh !== bPh || aTg !== bTg) { console.log('  ⚠ ' + k + ' 占位符/标签对不上，跳过'); continue; }
      if (clean(main, v) && v !== tr[k]) { tr[k] = v; changed++; }
    }
    if (changed) {
      fs.writeFileSync(path.join(DIR, '_tr', lang + '.json'), JSON.stringify(tr, null, 1));
      /* 重出分片：_mk339.js 会校验键集与 _core338.json 完全一致 */
      try {
        execFileSync(NODE, [path.join(DIR, '_mk339.js'), lang, native, enName], { cwd: DIR, stdio: 'pipe' });
      } catch (e) {
        console.log('  ✗ 重新生成分片失败：' + String(e.stdout || e.message).slice(0, 200));
      }
    }
    const left = rows.filter(r => !clean(main, String(tr[r.key] || '')));
    results.push((left.length ? '⚠ ' : '✓ ') + lang + ' 修 ' + changed + '/' + rows.length + ' 条' +
      (left.length ? '，仍脏 ' + left.length + ' 条：' + left.map(r => r.key).slice(0, 6).join(',') : ''));
  }

  console.log('\n========== 汇总 ==========');
  results.forEach(r => console.log(r));
  S.close();
  process.exit(0);
})().catch(e => { console.error('FATAL:', e.message); process.exit(1); });
