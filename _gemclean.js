/* _gemclean.js —— 修掉「译文里混进别的文字系统」
 *
 * 起因：_mixed.js 报出 13 种语言的译文里夹了外来字母（藏文里一个阿拉伯字母 ف、
 *       阿姆哈拉文里一段希腊文 რԱ… 之类）。母语者一眼就是乱码，
 *       但因为长得也像字，人工核对基本发现不了。
 *
 * 做法：把有问题的那几条连同「正确的文字系统」一起发给 Gemini，要求整条重写成纯主文字。
 *   提示词要点名「不要出现 X 字母」——含糊说「别写错」模型不会改。
 *   收回来先用 _mixed.js 的 audit() 复核，纯了才落盘。
 *
 * 用法：
 *   node _gemclean.js            # 修所有被 _mixed.js 点名的语言
 *   node _gemclean.js bo hy ug   # 指定语种
 *
 * 判据：复用 require('./_mixed.js').scriptsOf —— 检查与修复用同一套标准。
 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { openSession, parseLines, sleep } = require('./_gemcdp.js');
const SCRIPT = require('./_mixed.js').scriptsOf;

const DIR = __dirname;
const NAV = JSON.parse(fs.readFileSync(path.join(DIR, '_navsrc.json'), 'utf8'));
const EN = NAV.en;

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

/* Unicode script 名 → 提示词里用的说法（模型认常见名，Tigalari 这类冷门名要说人话） */
const SAY = {
  Ethiopic: 'Ethiopic (Ge\'ez) script (e.g. ሰላም)',
  Tibetan: 'Tibetan script (e.g. སྒྱུར་བ)',
  Gurmukhi: 'Gurmukhi script (e.g. ਸਤਿ)',
  Devanagari: 'Devanagari script (e.g. नमस्ते)',
  Bengali: 'Bengali script (e.g. নমস্কার)',
  Tamil: 'Tamil script (e.g. வணக்கம்)',
  Telugu: 'Telugu script (e.g. నమస్కారం)',
  Kannada: 'Kannada script',
  Malayalam: 'Malayalam script (e.g. നമസ്കാരം)',
  Sinhala: 'Sinhala script (e.g. ආයුබෝවන්)',
  Gujarati: 'Gujarati script',
  Oriya: 'Odia script',
  Thai: 'Thai script (e.g. สวัสดี)',
  Lao: 'Lao script (e.g. ສະບາຍດີ)',
  Khmer: 'Khmer script (e.g. សួស្តី)',
  Myanmar: 'Burmese script (e.g. မင်္ဂလာပါ)',
  Georgian: 'Georgian script (e.g. გამარჯობა)',
  Armenian: 'Armenian script (e.g. բարև)',
  Greek: 'Greek script',
  Cyrillic: 'Cyrillic script',
  Arabic: 'Arabic script',
  Hebrew: 'Hebrew script',
  Hangul: 'Hangul',
  Hiragana: 'Japanese kana',
  Katakana: 'Japanese kana',
  Han: 'Chinese characters',
  Thaana: 'Thaana script',
  Syriac: 'Syriac script',
  Cherokee: 'Cherokee script',
  Latin: 'Latin script'
};
const say = s => SAY[s] || (s + ' script');

/* 一条译文是否纯净：只允许「主文字 + 拉丁借词」 */
function clean(tr, main, v) {
  const set = SCRIPT(String(v));
  if (set.size === 0) return true;
  for (const s of set) {
    if (s === main) continue;
    if (s === 'Latin' && main !== 'Latin') continue;
    return false;
  }
  return true;
}
function mainScript(tr) {
  const vote = {};
  for (const k of NAV.keys) for (const s of SCRIPT(String(tr[k] || ''))) vote[s] = (vote[s] || 0) + 1;
  return Object.keys(vote).sort((a, b) => vote[b] - vote[a])[0] || 'Latin';
}

function prompt(enName, native, main, rows) {
  return [
    'These are UI labels of AI-SRTSub, a subtitle translator website.',
    `They must be written entirely in ${enName} (${native}).`,
    '',
    `CRITICAL: ${enName} is written in the ${say(main)}.`,
    'The current version below is WRONG — it accidentally contains letters from another writing system',
    '(a copying mistake). Rewrite every line so that it uses ONLY the ' + say(main) + '.',
    'Do not leave a single letter from any other script. Do not leave the wrong part as-is.',
    'Keep the meaning identical. Keep it short (menu labels, not sentences).',
    '',
    'Input:  KEY :: WRONG current version :: original English meaning',
    'Output: KEY :: corrected text',
    '',
    rows.map(r => r.key + ' :: ' + r.val + ' :: ' + String(EN[r.key])).join('\n')
  ].join('\n');
}

/* ⚠️ 不能用通用的 parseLines：本脚本的输入是「KEY :: 错值 :: 英文原意」三段式，
      模型照抄这个格式后，按第一个 ' :: ' 切会把英文也当成译文的一部分
      （实测 bo 那条解析成 "ལག་ཆ་གཞན། :: More Tools"，判脏然后白修一轮）。
      这里先切 KEY，再把末尾的 ' :: <英文]' 剥掉。 */
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
      const suffix = ' :: ' + String(EN[key]);
      if (val.endsWith(suffix)) val = val.slice(0, -suffix.length).trim();
    }
    map[key] = val;
  }
  return map;
}

(async () => {
  const args = process.argv.slice(2).filter(a => !a.startsWith('--'));

  /* 找出待修语言 */
  const work = [];
  for (const f of fs.readdirSync(path.join(DIR, '_trnav'))) {
    if (!/^[a-z]{2,3}(-[A-Za-z]{2,4})?\.json$/.test(f)) continue;
    const lang = f.replace(/\.json$/, '');
    if (args.length && args.indexOf(lang) < 0) continue;
    const tr = JSON.parse(fs.readFileSync(path.join(DIR, '_trnav', f), 'utf8'));
    const main = mainScript(tr);
    const rows = NAV.keys.filter(k => String(tr[k] || '') && !clean(tr, main, tr[k]))
      .map(k => ({ key: k, val: String(tr[k]), mixed: [...SCRIPT(String(tr[k]))].filter(s => s !== main && s !== 'Latin')[0] }));
    if (rows.length) work.push({ lang, tr, main, rows });
  }
  if (!work.length) { console.log('没有混字的译文，收工。'); return; }
  console.log('待修：' + work.length + ' 种语言，共 ' + work.reduce((a, b) => a + b.rows.length, 0) + ' 条\n');

  const S = await openSession(process.env.GEM_SESSION || 'navclean');

  const results = [];
  let chatAge = 0;
  for (const job of work) {
    const { lang, tr, main, rows } = job;
    const enName = EN_NAME[lang] || lang, native = NATIVE[lang] || lang;
    console.log('[' + lang + '] ' + enName + ' / ' + native + '  主文字 ' + main + '，' + rows.length + ' 条待修');

    if (chatAge === 0) await S.newChat();
    chatAge = (chatAge + 1) % 8;

    let todo = rows.slice();
    const got = {};
    for (let round = 1; round <= 3 && todo.length; round++) {
      try {
        const text = await S.ask(prompt(enName, native, main, todo), 40,
          parseInt(process.env.GEM_GAP || '1200', 10));
        if (process.env.GEM_DEBUG) fs.writeFileSync(path.join(DIR, '_trnav', 'dbgc-' + lang + '-r' + round + '.txt'), text);
        const map = parse3(text);
        /* ⚠️ todo 里是对象 {key,val,mixed}，不是裸字符串 —— 当成键迭代的话
              map[[object Object]] 永远是 undefined，got 一直空，改个寂寞。 */
        for (const r of todo) if (map[r.key] && map[r.key].trim()) got[r.key] = map[r.key].trim();
        if (process.env.GEM_DEBUG) for (const k of Object.keys(map)) {
          console.log('    dbg ' + k + ' = ' + JSON.stringify(map[k]) + '  scripts=' + [...SCRIPT(map[k])].join('+'));
        }
        todo = todo.filter(r => !(got[r.key] && clean(tr, main, got[r.key])));
        if (todo.length) console.log('  第 ' + round + ' 轮后仍脏 ' + todo.length + ' 条：' + todo.map(r => r.key).join(','));
      } catch (e) {
        console.log('  ' + lang + ' 第 ' + round + ' 轮异常：' + e.message.slice(0, 100));
        await sleep(3000);
      }
    }

    let changed = 0;
    for (const k of Object.keys(got)) {
      if (process.env.GEM_DEBUG) {
        console.log('    dbg2 ' + k + ' got=' + JSON.stringify(got[k]) + ' cur=' + JSON.stringify(tr[k]) +
          ' clean=' + clean(tr, main, got[k]) + ' diff=' + (got[k] !== tr[k]));
      }
      if (clean(tr, main, got[k]) && got[k] !== tr[k]) {
        console.log('  ' + k + ': ' + tr[k] + '  →  ' + got[k]);
        tr[k] = got[k]; changed++;
      }
    }
    if (changed) fs.writeFileSync(path.join(DIR, '_trnav', lang + '.json'), JSON.stringify(tr, null, 1));
    const left = rows.filter(r => !clean(tr, main, String(tr[r.key] || '')));
    results.push((left.length ? '⚠ ' : '✓ ') + lang + ' 修 ' + changed + ' 条' + (left.length ? '，仍脏 ' + left.length + ' 条：' + left.map(r => r.key).join(',') : ''));
  }

  console.log('\n========== 汇总 ==========');
  results.forEach(r => console.log(r));
  S.close();
  process.exit(0);
})().catch(e => { console.error('FATAL:', e.message); process.exit(1); });
