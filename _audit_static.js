/* v0.9.278 体检 · 静态扫描：多语言词条 / SEO 表 / 页面 key 覆盖 / 版号一致性 */
const fs = require('fs');
const P = (f) => fs.readFileSync(__dirname + '/' + f, 'utf8');

const dict = P('site-i18n.js');
const sv = P('server.js');
const home = P('index.html');
const ws = P('translate.html');
const mg = P('merge.html');
const cl = P('clean.html');
const nav = P('site-nav.js');

const R = [];
const add = (sec, level, msg, extra) => R.push({ sec, level, msg, extra: extra || '' });

/* ---------- 工具：按大括号配平取出一个对象字面量 ---------- */
function grabObj(src, name) {
  const i = src.indexOf('const ' + name + ' = ');
  if (i < 0) return null;
  let j = src.indexOf('{', i);
  let d = 0, inS = null, esc = false;
  for (let k = j; k < src.length; k++) {
    const c = src[k];
    if (esc) { esc = false; continue; }
    if (inS) {
      if (c === '\\') esc = true;
      else if (c === inS) inS = null;
      continue;
    }
    if (c === '"' || c === "'" || c === '`') { inS = c; continue; }
    if (c === '{') d++;
    else if (c === '}') { d--; if (d === 0) return src.slice(j, k + 1); }
  }
  return null;
}
function evalObj(lit) {
  try { return new Function('return (' + lit + ')')(); } catch (e) { return null; }
}

/* ---------- 1. UI 语言表 ---------- */
function grabArr(src, name) {
  const i = src.indexOf('const ' + name + ' = [');
  if (i < 0) return null;
  let j = src.indexOf('[', i);
  let d = 0, inS = null, esc = false;
  for (let k = j; k < src.length; k++) {
    const c = src[k];
    if (esc) { esc = false; continue; }
    if (inS) { if (c === '\\') esc = true; else if (c === inS) inS = null; continue; }
    if (c === '"' || c === "'" || c === '`') { inS = c; continue; }
    if (c === '[') d++;
    else if (c === ']') { d--; if (d === 0) return src.slice(j, k + 1); }
  }
  return null;
}
function uiLangs(src, name) {
  const lit = grabArr(src, name);
  if (!lit) return [];
  const v = evalObj(lit);
  return Array.isArray(v) ? v.map(x => Array.isArray(x) ? x[0] : x) : [];
}
const UI_LANGS = uiLangs(dict, 'UI_LANGS');
add('多语言', UI_LANGS.length === 27 ? 'ok' : 'bad', 'site-i18n 的 UI_LANGS = ' + UI_LANGS.length + ' 种');
const MERGE_UI = uiLangs(mg, 'UI_LANGS');
const CLEAN_UI = uiLangs(cl, 'CLEAN_UI_LANGS');
add('多语言', MERGE_UI.length === 27 ? 'ok' : 'bad', 'merge.html 界面语言 = ' + MERGE_UI.length + ' 种');
add('多语言', CLEAN_UI.length === 27 ? 'ok' : 'bad', 'clean.html 界面语言 = ' + CLEAN_UI.length + ' 种');
add('多语言', JSON.stringify(MERGE_UI) === JSON.stringify(UI_LANGS) ? 'ok' : 'bad',
  'merge 的语言表与共享表一致',
  MERGE_UI.filter((x, i) => x !== UI_LANGS[i]).join(','));
add('多语言', JSON.stringify(CLEAN_UI) === JSON.stringify(UI_LANGS) ? 'ok' : 'bad',
  'clean 的语言表与共享表一致',
  CLEAN_UI.filter((x, i) => x !== UI_LANGS[i]).join(','));

/* ---------- 2. 各页词典的 key 覆盖 ---------- */
function blockKeys(src, name) {
  const lit = grabObj(src, name);
  if (!lit) return null;
  const o = evalObj(lit);
  if (!o) return null;
  const out = {};
  Object.keys(o).forEach(l => out[l] = new Set(Object.keys(o[l] || {})));
  return out;
}
function reportDict(label, src, name, langs) {
  const dm = blockKeys(src, name);
  if (!dm) { add('多语言', 'bad', label + ' 词典解析失败'); return null; }
  const base = dm['zh-CN'] || new Set();
  add('多语言', 'info', label + ' 词典：' + Object.keys(dm).length + ' 个语言块，基准(zh-CN) ' + base.size + ' 条');

  const miss = [];
  langs.forEach(l => {
    const d = dm[l];
    if (!d) { miss.push({ l, n: base.size, sample: ['整块缺失'] }); return; }
    const lack = [...base].filter(k => !d.has(k));
    if (lack.length) miss.push({ l, n: lack.length, sample: lack.slice(0, 8) });
  });
  if (!miss.length) add('多语言', 'ok', label + '：' + langs.length + ' 语词条全覆盖');
  else miss.slice(0, 6).forEach(m => add('多语言', m.n > 60 ? 'bad' : 'warn',
    label + ' · ' + m.l + ' 缺 ' + m.n + ' 条（靠基准语回退）', m.sample.join(',')));
  if (miss.length > 6) add('多语言', 'warn', label + ' 另有 ' + (miss.length - 6) + ' 个语言也有缺词条');

  /* 空值 */
  const empt = [];
  langs.forEach(l => {
    const o = evalObj(grabObj(src, name))[l];
    if (!o) return;
    const e = Object.keys(o).filter(k => o[k] === '' || (typeof o[k] === 'string' && !o[k].trim()));
    if (e.length) empt.push(l + ':' + e.length);
  });
  add('多语言', empt.length ? 'warn' : 'ok', label + ' 空值词条 ' + (empt.length ? empt.join(' ') : '0'));
  return dm;
}
const DICT = reportDict('共享词典', dict, 'I18N', UI_LANGS);
const MDICT = reportDict('特效页词典', mg, 'I18N', MERGE_UI);
const CDICT = reportDict('清洗页词典', cl, 'I18N', CLEAN_UI);

/* ---------- 3. 页面用到的 key 是否都在自己的词典 ---------- */
function usedKeys(src) {
  const s = new Set();
  const re = /data-i18n(?:-html|-title|-aria|-ph)?="([^"]+)"/g;
  let m;
  while ((m = re.exec(src))) {
    m[1].split(/[,\s]+/).forEach(k => { if (/^[A-Za-z0-9_]+$/.test(k)) s.add(k); });
  }
  const re2 = /\bt\(\s*'([A-Za-z0-9_]+)'/g;
  while ((m = re2.exec(src))) s.add(m[1]);
  const re3 = /setI18nKey\([^,)]+,\s*'([A-Za-z0-9_]+)'/g;
  while ((m = re3.exec(src))) s.add(m[1]);
  return s;
}
function checkKeys(file, src, dm) {
  const used = usedKeys(src);
  const base = dm['zh-CN'] || new Set();
  const lacking = [...used].filter(k => !base.has(k));
  add('多语言', lacking.length ? 'bad' : 'ok',
    file + ' 用到 ' + used.size + ' 个界面 key，词典缺失 ' + lacking.length,
    lacking.slice(0, 10).join(','));
  /* 非基准语里缺失的（会显示 key 原文） */
  const perLang = [];
  UI_LANGS.forEach(l => {
    if (l === 'zh-CN') return;
    const d = dm[l]; if (!d) return;
    const lack = [...used].filter(k => !d.has(k));
    if (lack.length) perLang.push(l + ':' + lack.length);
  });
  if (perLang.length) add('多语言', perLang[0] && parseInt(perLang[0].split(':')[1]) > 30 ? 'warn' : 'info',
    file + ' 非中文界面下靠回退的词条数（按语言）', perLang.slice(0, 8).join(' '));
}
checkKeys('index.html', home, DICT);
checkKeys('translate.html', ws, DICT);
checkKeys('merge.html', mg, MDICT);
checkKeys('clean.html', cl, CDICT);

/* ---------- 4. SEO 表 ---------- */
const seoM = /const SEO_LANGS\s*=\s*\[([\s\S]*?)\];/.exec(sv);
const SEO_LANGS = seoM ? seoM[1].match(/'[^']+'/g).map(s => s.slice(1, -1)) : [];
add('SEO', SEO_LANGS.length === 27 ? 'ok' : 'bad', 'SEO_LANGS = ' + SEO_LANGS.length + ' 种');
add('SEO', JSON.stringify(SEO_LANGS) === JSON.stringify(UI_LANGS) ? 'ok' : 'bad',
  'SEO_LANGS 与界面语言表一致', SEO_LANGS.filter((x, i) => x !== UI_LANGS[i]).join(','));

['SEO', 'SEO_MERGE', 'SEO_CLEAN', 'SEO_TRANSLATE'].forEach(tb => {
  const lit = grabObj(sv, tb);
  if (!lit) { add('SEO', 'bad', 'server.js 缺表 ' + tb); return; }
  const o = evalObj(lit);
  if (!o) { add('SEO', 'bad', tb + ' 解析失败'); return; }
  const got = Object.keys(o);
  const lack = SEO_LANGS.filter(l => got.indexOf(l) < 0);
  add('SEO', lack.length ? 'bad' : 'ok', tb + ' 覆盖 ' + got.length + '/27 语', lack.join(','));

  const longT = [], longD = [], shortD = [], noT = [];
  const cjk = /[\u4e00-\u9fff\u3040-\u30ff\uac00-\ud7af]/;
  SEO_LANGS.forEach(l => {
    const e = o[l]; if (!e) return;
    const tv = e.title || '', dv = e.desc || '';
    if (!tv) { noT.push(l); return; }
    const tl = [...tv].length, dl = [...dv].length;
    /* 中文一字顶两字符，按视觉宽度折算 */
    const w = (s) => [...s].reduce((a, c) => a + (cjk.test(c) ? 2 : 1), 0);
    if (w(tv) > 62) longT.push(l + ' ' + tl + '字/宽' + w(tv));
    if (w(dv) > 170) longD.push(l + ' ' + dl + '字/宽' + w(dv));
    if (w(dv) < 70) shortD.push(l + ' ' + dl + '字');
  });
  if (noT.length) add('SEO', 'bad', tb + ' 无 title', noT.join(','));
  if (longT.length) add('SEO', 'warn', tb + ' title 偏长（搜索结果会截断）', longT.slice(0, 6).join(' | '));
  if (longD.length) add('SEO', 'warn', tb + ' desc 偏长（搜索结果会截断）', longD.slice(0, 6).join(' | '));
  if (shortD.length) add('SEO', 'warn', tb + ' desc 偏短', shortD.slice(0, 6).join(' | '));
});

/* ---------- 5. 路由 / head 注入 ---------- */
add('SEO', /p === '\/robots\.txt'/.test(sv) ? 'ok' : 'bad', 'robots.txt 路由存在');
add('SEO', /p === '\/sitemap\.xml'/.test(sv) ? 'ok' : 'bad', 'sitemap.xml 路由存在');
add('SEO', /Sitemap:\s*['"]?\s*\+?\s*baseUrl/.test(sv) ? 'ok' : 'bad', 'robots.txt 里声明了 sitemap 地址');
add('SEO', /hreflang="\$\{l\}"|hreflang="'\s*\+\s*l|hreflang=/.test(sv) ? 'ok' : 'bad', '注入 hreflang');
add('SEO', /x-default/.test(sv) ? 'ok' : 'warn', 'hreflang 有 x-default 兜底');
add('SEO', /rel="canonical"/.test(sv) ? 'ok' : 'bad', '注入 canonical');
add('SEO', /application\/ld\+json/.test(sv) ? 'ok' : 'bad', '注入 JSON-LD');
add('SEO', /og:title/.test(sv) ? 'ok' : 'warn', '注入 OG 标签');
add('SEO', /twitter:/.test(sv) ? 'ok' : 'warn', '注入 Twitter card');
add('SEO', /og:image/.test(sv) ? 'ok' : 'warn', 'OG 有配图');

/* SEO_PAGES 里有外部引用，不能 eval —— 按行静态解析 */
const spm = grabObj(sv, 'SEO_PAGES');
if (spm) {
  const names = [...spm.matchAll(/\n\s{2}([a-z]+):\s*\{/g)].map(m => m[1]);
  add('SEO', names.length === 4 ? 'ok' : 'bad', 'SEO_PAGES = ' + names.join(','));
  names.forEach(n => {
    const seg = spm.slice(spm.indexOf('\n  ' + n + ':'));
    const end = /\n\s{2}[a-z]+:\s*\{/.exec(seg.slice(3));
    const body = seg.slice(0, end ? end.index + 3 : seg.length);
    const ok = /file:\s*'/.test(body) && /table:\s*[A-Z]/.test(body) && /path:\s*[A-Z]/.test(body);
    add('SEO', ok ? 'ok' : 'bad', 'SEO_PAGES.' + n + ' 字段完整（file/table/path）',
      (/file:\s*'([^']+)'/.exec(body) || [])[1] + ' · ' + (/jsonldType:\s*'([^']+)'/.exec(body) || [])[1]);
  });
} else add('SEO', 'bad', 'SEO_PAGES 找不到');
/* 语言目录路由 */
add('SEO', /SEO_ROUTE/.test(sv) ? 'ok' : 'info', '有 SEO_ROUTE 语言目录路由表');
const langDirRe = /pm\s*=\s*p\.match\([^)]*\)/g;
const langDirHits = (sv.match(langDirRe) || []).slice(0, 6);
add('SEO', 'info', '语言目录路由匹配式：' + langDirHits.map(s => s.replace(/\s+/g, ' ')).join(' ｜ '));
const routeBody = /SEO_ROUTE\[[^\]]*\]\s*=|if\s*\(SEO_ROUTE/.test(sv) ? 'ok' : 'warn';

/* ---------- 6. 版号一致性 ---------- */
const verOf = (src, re) => { const m = re.exec(src); return m ? m[1] : null; };
const v = {
  'index.ver': verOf(home, /<span class="ver">v(0\.9\.\d+)<\/span>/),
  'index.dict': verOf(home, /site-i18n\.js\?v=(0\.9\.\d+)/),
  'ws.ver': verOf(ws, /<span class="ver-tag">v(0\.9\.\d+)<\/span>/),
  'ws.dict': verOf(ws, /site-i18n\.js\?v=(0\.9\.\d+)/),
  'ws.core': verOf(ws, /srt-core\.js\?v=(0\.9\.\d+)/),
  'merge.ver': verOf(mg, /<span class="ver">v(0\.9\.\d+)<\/span>/),
  'merge.core': verOf(mg, /merge-core\.js\?v=(0\.9\.\d+)/),
  'clean.core': verOf(cl, /clean-core\.js\?v=(0\.9\.\d+)/),
};
const uniq = [...new Set(Object.values(v).filter(Boolean))];
add('版号', uniq.length === 1 && Object.values(v).filter(Boolean).length === 8 ? 'ok' : 'bad',
  '各页版号统一 = ' + uniq.join(' / '),
  Object.entries(v).map(([k, x]) => k + ':' + x).join('  '));

/* ---------- 7. 落地页 ---------- */
const cards = [...home.matchAll(/<a class="tc ([a-z]+)"([^>]*)href="([^"]+)"/g)];
add('落地页', cards.length === 4 ? 'ok' : 'bad',
  '工具卡 = ' + cards.length + ' 张：' + cards.map(c => c[1] + '→' + c[3]).join(' | '));
add('落地页', /id="dlCard"/.test(home) && /id="dlSec"/.test(home) ? 'ok' : 'warn', '下载卡/下载详解段有 id（域名门控）');
add('落地页', /<script src="srt-core/.test(home) ? 'bad' : 'ok', '落地页未加载翻译引擎（首屏轻）');
add('落地页', /id="viewWorkspace"/.test(home) ? 'bad' : 'ok', '落地页无工作台 DOM');
add('落地页', /#viewWorkspace\{/.test(home) ? 'warn' : 'ok', '落地页残留无主的 #viewWorkspace CSS（死样式）');
const dets = (home.match(/<section class="det/g) || []).length;
add('落地页', dets === 4 ? 'ok' : 'warn', '图文详解段 = ' + dets);

/* ---------- 8. 导航 ---------- */
const tools = [...nav.matchAll(/href:\s*'([^']+)'/g)].map(m => m[1]);
add('导航', 'info', 'site-nav 入口 = ' + tools.join(' | '));
add('导航', tools.indexOf('/translate.html') >= 0 ? 'ok' : 'bad', '翻译入口指向 /translate.html');
add('导航', /<span id="siteNav">/.test(ws) ? 'bad' : 'ok', '工作台未挂顶栏导航（278 定案）');
add('导航', /<span id="siteNav">/.test(mg) ? 'ok' : 'warn', '特效页挂了顶栏导航');
add('导航', /<span id="siteNav">/.test(cl) ? 'ok' : 'warn', '清洗页挂了顶栏导航');

/* ---------- 输出 ---------- */
const order = { bad: 0, warn: 1, ok: 2, info: 3 };
R.sort((a, b) => order[a.level] - order[b.level]);
let bad = 0, warn = 0;
console.log('');
R.forEach(r => {
  if (r.level === 'bad') bad++;
  if (r.level === 'warn') warn++;
  const tag = { bad: '✗', warn: '!', ok: '✓', info: '·' }[r.level];
  console.log(tag + ' [' + r.sec + '] ' + r.msg + (r.extra ? '\n      ' + r.extra : ''));
});
console.log('\n—— 静态扫描：严重 ' + bad + ' / 提醒 ' + warn + ' / 通过 ' + R.filter(x => x.level === 'ok').length + ' ——');
