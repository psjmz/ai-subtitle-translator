/* v0.9.279：补翻上一轮「模型照抄英文」的条目。
   成因：这些词（Custom / Normal / Layout / Social…）模型当成专有名词原样返回了。
   这轮把规则写死「除非是品牌名或 SRT/VTT/ASS 这类格式标识，否则必须译出目标语言」。 */
const fs = require('fs');
const { LANGS, chat, parseJsonArr } = require('./_tr279.js');

const ex = JSON.parse(fs.readFileSync('_extract279.json', 'utf8'));
const redo = JSON.parse(fs.readFileSync('_redo279.json', 'utf8'));
const NAME = {};
LANGS.forEach(l => { NAME[l[0]] = l[1]; });

const KEEP = /^[A-Z0-9 ··\-\/&.]+$/;

async function redoLang(page, lang) {
  const keys = redo[page + '/' + lang];
  if (!keys || !keys.length) return null;
  const items = keys.map(k => ({ k, zh: ex[page]['zh-CN'][k], en: ex[page]['en'][k] }));
  const sys = 'You are a UI localizer for a subtitle tool. Translate each string into ' + NAME[lang] + ' (' + lang + '). '
    + 'IMPORTANT: these were left untranslated in a previous pass — you MUST actually translate them. '
    + 'Only keep the English verbatim if it is a brand name (AI-SRTSub) or a file-format token (SRT / VTT / ASS / SBV / HTML). '
    + 'Preserve placeholders {0} {1} and inline HTML tags exactly. Keep it short. '
    + 'Return ONLY a JSON array of {"k":<key>,"v":<translated>}, no markdown fence.';
  const usr = JSON.stringify(items, null, 0);
  let arr = parseJsonArr(await chat([{ role: 'system', content: sys }, { role: 'user', content: usr }], 4000));
  if (!arr) arr = parseJsonArr(await chat([{ role: 'system', content: sys }, { role: 'user', content: usr }], 4000));
  if (!arr) return null;
  const o = {};
  arr.forEach(x => { if (x && x.k && typeof x.v === 'string' && x.v.length) o[x.k] = x.v; });
  return o;
}

function jsStr(v) {
  return "'" + String(v).replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n') + "'";
}

/* 在指定文件的指定语言块里，把 key 的值替换掉 */
function patchFile(file, page, fixes) {
  let src = fs.readFileSync(file, 'utf8');
  let n = 0;
  Object.keys(fixes).forEach(lang => {
    const i = src.indexOf('const I18N = {');
    const re = new RegExp("\\n[ \\t]*'" + lang + "':\\s*\\{");
    const m = re.exec(src.slice(i));
    if (!m) { console.log('  ✗ ' + file + ' 找不到块 ' + lang); return; }
    const start = i + m.index + m[0].length;
    /* 块结束：找下一个同缩进的语言块，或 I18N 闭合 */
    const nx = /\n[ \t]*'[a-zA-Z\-]{2,10}':\s*\{/.exec(src.slice(start));
    const end = start + (nx ? nx.index : src.indexOf('\n};', start));
    let seg = src.slice(start, end);
    Object.keys(fixes[lang]).forEach(k => {
      const v = fixes[lang][k];
      const re2 = new RegExp("(\\n([ \\t]*)" + k + ":\\s*)'(?:[^'\\\\]|\\\\.)*'");
      if (re2.test(seg)) { seg = seg.replace(re2, '$1' + jsStr(v)); n++; }
      else console.log('  ✗ ' + file + '/' + lang + ' 找不到 key ' + k);
    });
    src = src.slice(0, start) + seg + src.slice(end);
  });
  fs.writeFileSync(file, src);
  return n;
}

(async () => {
  const jobs = [];
  Object.keys(redo).forEach(tk => {
    const [page, lang] = tk.split('/');
    jobs.push([page, lang]);
  });
  console.log('待补翻的语言组：' + jobs.length);
  const all = { merge: {}, clean: {} };
  for (const [page, lang] of jobs) {
    const o = await redoLang(page, lang);
    if (o) { all[page][lang] = o; console.log('  ✓ ' + page + '/' + lang + ' 补回 ' + Object.keys(o).length + ' 条'); }
    else console.log('  ✗ ' + page + '/' + lang + ' 仍然失败');
  }
  const nm = patchFile('merge.html', 'merge', all.merge);
  const nc = patchFile('clean.html', 'clean', all.clean);
  console.log('\n回补：merge ' + nm + ' 条，clean ' + nc + ' 条');
  fs.writeFileSync('_redo279-done.json', JSON.stringify(all, null, 1));
})();
