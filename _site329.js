/* v0.9.329 全站多语言 + sitemap 体检
   数据源全部取自服务端真实输出（sitemap.xml / robots.txt / 各页 HTTP 响应），不重算规则。
   A  sitemap 结构：条目数 / 每个 <url> 的 alternate 数 / hreflang 合法性 / x-default / 自指 / 对称性
   B  逻辑页分组：每组的语言数（应 27）+ 组内成员互为 alternate（回指闭环）
   C  1620 条 URL 全量 HTTP：200 / html lang / dir=rtl / canonical 自指 / hreflang 数 / og:locale
   D  多语言落地：每种语言版是否真本地化（标题/描述与英文版雷同 = 疑似漏翻；非拉丁语查本语种字符）
   E  27 个指南索引页（不进 sitemap，但必须存在且带语言前缀）
   F  robots.txt：Disallow 规则不得挡住 sitemap 已提交的 URL；必须有 Sitemap: 行
   用法：node _site329.js   （端口随机，不与别的进程撞）
*/
'use strict';
process.on('unhandledRejection', () => { });
const { spawn } = require('child_process');
const http = require('http');

const ROOT = __dirname;
const SRV = Number(process.env.SRV || 3391);
const BASE = 'http://127.0.0.1:' + SRV;
const LANGS = ['zh-CN', 'zh-TW', 'en', 'ja', 'es', 'pt', 'ko', 'de', 'fr', 'id', 'hi', 'th', 'vi', 'ru', 'it', 'ar', 'tr', 'nl', 'pl', 'sv', 'cs', 'uk', 'da', 'fi', 'el', 'he', 'ro'];
const RTL = ['ar', 'he'];
const OG_LOCALE = { 'zh-CN': 'zh_CN', 'zh-TW': 'zh_TW', en: 'en_US', ja: 'ja_JP', es: 'es_ES', pt: 'pt_BR', ko: 'ko_KR', de: 'de_DE', fr: 'fr_FR', id: 'id_ID', hi: 'hi_IN', th: 'th_TH', vi: 'vi_VN', ru: 'ru_RU', it: 'it_IT', ar: 'ar_AR', tr: 'tr_TR', nl: 'nl_NL', pl: 'pl_PL', sv: 'sv_SE', cs: 'cs_CZ', uk: 'uk_UA', da: 'da_DK', fi: 'fi_FI', el: 'el_GR', he: 'he_IL', ro: 'ro_RO' };
/* 本语种专属字符：命中才算真的翻译成该语言（拉丁语系靠「与英文雷同」判定） */
const SCRIPT = {
  'zh-CN': /[\u4e00-\u9fff]/, 'zh-TW': /[\u4e00-\u9fff]/, ja: /[\u3040-\u30ff\u4e00-\u9fff]/, ko: /[\uac00-\ud7af]/,
  ru: /[\u0400-\u04ff]/, uk: /[\u0400-\u04ff]/, ar: /[\u0600-\u06ff]/, he: /[\u0590-\u05ff]/,
  th: /[\u0e00-\u0e7f]/, hi: /[\u0900-\u097f]/, el: /[\u0370-\u03ff]/
};
const out = [];
const push = (sev, where, what) => out.push([sev, where, what]);
const esc = (s) => String(s).replace(/&amp;/g, '&').replace(/&#(\d+);/g, (m, d) => String.fromCharCode(+d));

function get(urlPath) {
  return new Promise((res, rej) => {
    http.get({ host: '127.0.0.1', port: SRV, path: urlPath, headers: { 'Accept-Encoding': 'identity' } }, r => {
      let d = ''; r.setEncoding('utf8');
      r.on('data', c => d += c); r.on('end', () => res({ code: r.statusCode, body: d, hdr: r.headers }));
    }).on('error', rej);
  });
}
async function pool(items, n, fn) {
  let i = 0;
  const workers = new Array(Math.min(n, items.length)).fill(0).map(async () => {
    while (i < items.length) { const k = i++; await fn(items[k], k); }
  });
  await Promise.all(workers);
}
const one = (h, re) => { const m = h.match(re); return m ? esc(m[1]) : ''; };

(async () => {
  const srv = spawn(process.execPath, ['server.js'], { cwd: ROOT, env: Object.assign({}, process.env, { PORT: String(SRV), PUBLIC_URL: BASE }), stdio: 'ignore' });
  for (let i = 0; i < 40; i++) { try { await get('/robots.txt'); break; } catch (e) { await new Promise(r => setTimeout(r, 500)); } }
  console.log('— 服务 :' + SRV + ' —\n');

  /* ---------- F robots.txt ---------- */
  console.log('— F. robots.txt —');
  const rb = (await get('/robots.txt')).body;
  ['Disallow: /content/', 'Disallow: /data/', 'Disallow: /admin.html'].forEach(d => {
    if (!rb.includes(d)) push('ERR', 'robots.txt', '缺 ' + d);
  });
  if (!/^Sitemap: https?:\/\/\S+/m.test(rb)) push('ERR', 'robots.txt', '缺 Sitemap: 行');
  else console.log('  Sitemap 行：' + rb.match(/^Sitemap: (.*)$/m)[1]);
  const disallow = (rb.match(/^Disallow: (.*)$/gm) || []).map(x => x.replace('Disallow: ', '').trim()).filter(x => x && x !== '/');
  let robotHit = 0, robotEx = '';
  console.log('  Disallow 规则：' + disallow.join(' | '));

  /* ---------- A sitemap 结构 ---------- */
  console.log('\n— A. sitemap 结构 —');
  const sm = (await get('/sitemap.xml')).body;
  if (!/^<\?xml/.test(sm)) push('ERR', 'sitemap', '不是 XML');
  const blocks = sm.split('<url>').slice(1).map(b => b.split('</url>')[0]);
  const entries = blocks.map(b => {
    const loc = (b.match(/<loc>([^<]+)<\/loc>/) || [])[1] || '';
    const alts = (b.match(/<xhtml:link[^>]*>/g) || []).map(a => ({
      lang: (a.match(/hreflang="([^"]+)"/) || [])[1] || '',
      href: (a.match(/href="([^"]+)"/) || [])[1] || ''
    }));
    return { loc, alts };
  });
  const locs = entries.map(e => e.loc);
  const dup = locs.length - new Set(locs).size;
  console.log('  <url> 条目：' + locs.length + '（重复 ' + dup + '）');
  if (dup > 0) push('ERR', 'sitemap', 'loc 重复 ' + dup + ' 条');
  if (locs.length !== 1620) push('ERR', 'sitemap', 'loc ' + locs.length + '（应 1620）');
  disallow.forEach(d => locs.forEach(l => {
    const p = new URL(l).pathname;
    if (d.endsWith('/') ? p.indexOf(d) === 0 : p === d) { robotHit++; if (!robotEx) robotEx = l; }
  }));
  if (robotHit) push('ERR', 'sitemap+robots', '有 ' + robotHit + ' 条 sitemap URL 被 Disallow 挡住，例如 ' + robotEx);
  else console.log('  sitemap 里的 URL 没有被 robots 挡住');

  let badSelf = 0, badN = 0, badLang = 0, badX = 0, exRow = {};
  entries.forEach(e => {
    const langsSet = e.alts.filter(a => a.lang !== 'x-default');
    if (e.alts.length !== 28) { badN++; exRow.badN = exRow.badN || e.loc; }
    const set = new Set(langsSet.map(a => a.lang));
    if (set.size !== 27 || LANGS.some(l => !set.has(l))) { badLang++; exRow.badLang = exRow.badLang || e.loc; }
    const x = e.alts.find(a => a.lang === 'x-default');
    const enHref = (langsSet.find(a => a.lang === 'en') || {}).href;
    if (!x || (enHref && x.href !== enHref)) { badX++; exRow.badX = exRow.badX || e.loc; }
    if (!e.alts.some(a => a.href === e.loc)) { badSelf++; exRow.badSelf = exRow.badSelf || e.loc; }
  });
  const report = (cond, label, example) => { if (cond) push('ERR', 'sitemap', label + ' ' + cond + ' 条，例如 ' + example); else console.log('  ' + label + '：0 ✓'); };
  report(badSelf, 'alternate 缺自指', exRow.badSelf);
  report(badN, 'alternate 数不是 28', exRow.badN);
  report(badLang, 'hreflang 不是完整 27 语', exRow.badLang);
  report(badX, 'x-default 不指向英文版', exRow.badX);

  /* ---------- B 逻辑页分组 / 回指闭环 ---------- */
  console.log('\n— B. 逻辑页分组（同一页面的各语言互为 alternate）—');
  const groups = new Map();
  entries.forEach(e => {
    const key = e.alts.map(a => a.href).sort().join('|');
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(e);
  });
  console.log('  逻辑页：' + groups.size + ' 个');
  if (groups.size !== 60) push('ERR', '分组', '逻辑页 ' + groups.size + ' 个（应 60 = 17 工具 + 43 指南）');
  const sizes = {};
  let asym = 0, asymEx = '';
  groups.forEach((members, key) => {
    if (!sizes[members.length]) sizes[members.length] = 0;
    sizes[members.length]++;
    const want = new Set(members[0].alts.map(a => a.href));
    members.forEach(m => {
      const got = new Set(m.alts.map(a => a.href));
      if (got.size !== want.size || [...want].some(h => !got.has(h))) { asym++; if (!asymEx) asymEx = m.loc; }
    });
  });
  console.log('  每组语言数分布：' + Object.entries(sizes).map(([k, v]) => k + ' 语 × ' + v + ' 页').join('，'));
  if (sizes[27] !== 60) push('WARN', '分组', '不是每组都满 27 语');
  if (asym) push('ERR', '分组', '组内 alternate 不对称 ' + asym + ' 处，例如 ' + asymEx);
  else console.log('  组内 alternate 完全对称（回指闭环 ✓）');

  /* ---------- C+D 1620 条全量 HTTP ---------- */
  console.log('\n— C/D. 1620 条 URL 全量 HTTP + 本地化 —');
  const res = new Array(entries.length);
  await pool(entries, 12, async (e, i) => {
    const p = new URL(e.loc).pathname;
    let r;
    try { r = await get(p); } catch (err) { res[i] = { code: 0 }; return; }
    res[i] = {
      code: r.code,
      lang: one(r.body, /<html lang="([^"]+)"/),
      /* ⚠️ 必须限定在 <html> 标签上：页面 CSS 里有 [dir="rtl"] 选择器，全文匹配会假阳性 */
      rtl: /<html[^>]*dir="rtl"/.test(r.body),
      ltrAttr: /<html[^>]*dir="ltr"/.test(r.body),
      canon: one(r.body, /rel="canonical" href="([^"]+)"/),
      og: one(r.body, /property="og:locale" content="([^"]+)"/),
      ogUrl: one(r.body, /property="og:url" content="([^"]+)"/),
      ogImg: one(r.body, /property="og:image" content="([^"]+)"/),
      /* 语言切换控件（option 由 JS 从 UI_LANGS 生成，静态 HTML 里没有 <a> 互链，只能查容器） */
      langSel: /id="(uiLang2|uiLang|langSel|glang)"/.test(r.body),
      nAlt: (r.body.match(/hreflang="/g) || []).length,
      xdef: one(r.body, /hreflang="x-default" href="([^"]+)"/),
      title: esc(one(r.body, /<title>([\s\S]*?)<\/title>/)),
      desc: esc(one(r.body, /<meta name="description" content="([^"]*)"/))
    };
  });
  /* 期望语言：从分组 key 反查 */
  const langOfUrl = new Map();
  entries.forEach(e => e.alts.forEach(a => { if (a.lang !== 'x-default') langOfUrl.set(a.href, a.lang); }));

  let c200 = 0, cLang = 0, cRtl = 0, cLtr = 0, cCanon = 0, cAlt = 0, cX = 0, cOg = 0;
  const sameTitle = [], sameDesc = [], noScript = [], short = [];
  const perLang = {};
  entries.forEach((e, i) => {
    const r = res[i] || {};
    const l = langOfUrl.get(e.loc) || '?';
    perLang[l] = (perLang[l] || 0) + 1;
    if (r.code !== 200) { push('ERR', e.loc, 'HTTP ' + r.code); return; }
    c200++;
    if (r.lang !== l) { cLang++; if (cLang <= 3) push('ERR', e.loc, 'html lang=' + r.lang + ' ≠ ' + l); }
    if (RTL.includes(l) !== !!r.rtl) { cRtl++; if (cRtl <= 3) push('ERR', e.loc, 'dir=rtl 不对'); }
    if (!RTL.includes(l) && r.rtl) { cLtr++; if (cLtr <= 3) push('ERR', e.loc, '非 RTL 语言却带 dir=rtl'); }
    if (r.canon !== e.loc) { cCanon++; if (cCanon <= 3) push('ERR', e.loc, 'canonical=' + r.canon); }
    if (r.nAlt !== 28) { cAlt++; if (cAlt <= 3) push('ERR', e.loc, 'hreflang ' + r.nAlt + ' 条（应 28）'); }
    const enHref = (entries[entries.indexOf(e)].alts.find(a => a.lang === 'en') || {}).href;
    if (!enHref || !r.xdef || !r.xdef.endsWith(new URL(enHref).pathname)) { cX++; if (cX <= 3) push('ERR', e.loc, 'x-default 不对：' + r.xdef); }
    if (OG_LOCALE[l] && r.og !== OG_LOCALE[l]) { cOg++; if (cOg <= 3) push('ERR', e.loc, 'og:locale=' + r.og + ' 应 ' + OG_LOCALE[l]); }
    /* D 本地化 */
    if (l !== 'en') {
      const enIdx = entries.findIndex(x => x.loc === enHref);
      const enR = enIdx >= 0 ? res[enIdx] : null;
      if (enR) {
        if (r.title && r.title === enR.title) sameTitle.push(e.loc);
        if (r.desc && r.desc === enR.desc) sameDesc.push(e.loc);
      }
      const sc = SCRIPT[l];
      if (sc && r.title && !sc.test(r.title)) noScript.push(l + ' ' + e.loc + ' → ' + r.title.slice(0, 40));
    }
    if (!r.title || r.title.length < 8) short.push(e.loc);
  });
  console.log('  200 HTTP：' + c200 + '/' + entries.length);
  console.log('  html lang 错：' + cLang + ' | dir=rtl 错：' + cRtl + ' | canonical 错：' + cCanon +
    ' | hreflang 数错：' + cAlt + ' | x-default 错：' + cX + ' | og:locale 错：' + cOg);
  if (short.length) push('WARN', 'title', '标题过短/缺失 ' + short.length + ' 条，例如 ' + short[0]);

  console.log('\n— D. 本地化落地 —');
  console.log('  标题与英文版完全相同：' + sameTitle.length + ' 条');
  console.log('  描述与英文版完全相同：' + sameDesc.length + ' 条');
  console.log('  非拉丁语标题查不到本语种字符：' + noScript.length + ' 条');
  sameTitle.slice(0, 5).forEach(x => console.log('    [T] ' + x));
  sameDesc.slice(0, 5).forEach(x => console.log('    [D] ' + x));
  noScript.slice(0, 5).forEach(x => console.log('    [S] ' + x));
  if (sameTitle.length) push('WARN', 'i18n', '标题疑似漏翻 ' + sameTitle.length + ' 条');
  if (sameDesc.length) push('WARN', 'i18n', '描述疑似漏翻 ' + sameDesc.length + ' 条');
  if (noScript.length) push('ERR', 'i18n', '标题没用本语种文字 ' + noScript.length + ' 条');

  console.log('\n  每种语言的 URL 数（应各 60）：');
  console.log('    ' + LANGS.map(l => l + ':' + (perLang[l] || 0)).join('  '));
  LANGS.forEach(l => { if ((perLang[l] || 0) !== 60) push('ERR', 'i18n', l + ' 只有 ' + (perLang[l] || 0) + ' 条 URL（应 60）'); });

  /* ---------- E 指南索引页 ---------- */
  console.log('\n— E. 27 个指南索引页（不进 sitemap，但必须存在）—');
  let idxBad = 0, idxMin = 0, idxMax = 0;
  const idxP = LANGS.map(l => [l === 'zh-CN' ? '/guides/' : '/' + l + '/guides/', l]);
  const idxRes = new Array(idxP.length);
  await pool(idxP, 6, async (p, i) => {
    try { idxRes[i] = await get(p[0]); } catch (e) { idxRes[i] = { code: 0 }; }
  });
  idxP.forEach(([p, l], i) => {
    const r = idxRes[i] || {};
    const lang = one(r.body || '', /<html lang="([^"]+)"/);
    const nAlt = ((r.body || '').match(/hreflang="/g) || []).length;
    const okCard = ((r.body || '').match(/href="[^"]*\/guides\/[a-z0-9-]+\.html"/g) || []).length;
    /* ⚠️ 330 补：索引页的 desc 以前漏查过 —— 37/38 字的两条就是这样藏了两周。
       它们不进 sitemap，只能在这段 HTTP 体检里抓，改此处的 Canvas 检查项别忘了它。 */
    const idxDesc = one(r.body || '', /<meta name="description" content="([^"]*)"/);
    const dLen = (idxDesc || '').length;
    let why = '';
    if (r.code !== 200) why += 'HTTP ' + r.code + ' ';
    if (lang !== l) why += 'lang=' + lang + ' ';
    if (nAlt !== 28) why += 'hreflang ' + nAlt + ' ';
    if (okCard < 43) why += '指南链接 ' + okCard + ' ';
    if (dLen < 40 || dLen > 350) why += 'desc 长度 ' + dLen + ' ';
    if (why) {
      idxBad++;
      push('ERR', p, why.trim());
    }
    if (!(dLen < 40 || dLen > 350)) {
      if (!idxMin || dLen < idxMin) idxMin = dLen;
      if (dLen > idxMax) idxMax = dLen;
    }
  });
  if (!idxBad) console.log('  27 个索引页全 200、lang 对、hreflang 28 条、指南链接 ≥43、desc ' + idxMin + '~' + idxMax + ' 字 ✓');
  else console.log('  异常 ' + idxBad + ' 个');

  /* og:image 抽样可达（每逻辑页 en 版） */
  const imgTargets = [];
  groups.forEach(members => {
    const en = members.find(m => langOfUrl.get(m.loc) === 'en') || members[0];
    const i = entries.indexOf(en);
    const og = (res[i] || {}).ogImg;
    if (og) imgTargets.push(og.replace(BASE, ''));
  });
  let imgBad = 0;
  const imgRes = new Array(imgTargets.length);
  await pool(imgTargets, 6, async (p, i) => { try { imgRes[i] = (await get(p)).code; } catch (e) { imgRes[i] = 0; } });
  imgTargets.forEach((p, i) => { if (imgRes[i] !== 200) { imgBad++; if (imgBad <= 3) push('ERR', 'og:image', p + ' HTTP ' + imgRes[i]); } });
  console.log('  og:image 抽样 ' + imgTargets.length + ' 个（每逻辑页一个），打不开 ' + imgBad + ' 个');

  srv.kill();

  /* ---------- G 全站 title / desc 长度 ---------- */
  console.log('\n— G. 全站 title / desc 长度 —');
  const tOver = [], dOver = [], dShort = [], noOgUrl = [], noSel = [];
  entries.forEach((e, i) => {
    const r = res[i] || {};
    const l = langOfUrl.get(e.loc) || '?';
    if (r.title && (r.title.length < 10 || r.title.length > 80)) tOver.push([e.loc, l, r.title.length]);
    if (r.desc && (r.desc.length > 350 || r.desc.length < 40)) {
      (r.desc.length < 40 ? dShort : dOver).push([e.loc, l, r.desc.length]);
    }
    if (!r.desc) dShort.push([e.loc, l, 0]);
    if (r.ogUrl && r.ogUrl !== e.loc) noOgUrl.push([e.loc, r.ogUrl]);
    if (!r.langSel) noSel.push([e.loc, l]);
  });
  console.log('  title 超 80 / 短于 10：' + tOver.length + ' 条');
  tOver.slice(0, 12).forEach(x => console.log('    ' + x[2] + '  ' + x[1] + '  ' + x[0]));
  console.log('  desc 超 350：' + dOver.length + ' 条 | 短于 40 或缺：' + dShort.length + ' 条');
  dOver.slice(0, 6).forEach(x => console.log('    [长] ' + x[2] + '  ' + x[1] + '  ' + x[0]));
  dShort.slice(0, 6).forEach(x => console.log('    [短] ' + x[2] + '  ' + x[1] + '  ' + x[0]));
  console.log('  og:url 不自指：' + noOgUrl.length + ' 条');
  noOgUrl.slice(0, 3).forEach(x => console.log('    ' + x[0] + ' → ' + x[1]));
  console.log('  页面缺少语言切换控件：' + noSel.length + ' 条');
  noSel.slice(0, 3).forEach(x => console.log('    ' + x[1] + '  ' + x[0]));
  if (tOver.length) push('WARN', 'SEO 长度', 'title 超长/过短 ' + tOver.length + ' 条');
  if (dOver.length || dShort.length) push('WARN', 'SEO 长度', 'desc 异常 ' + (dOver.length + dShort.length) + ' 条');
  if (noOgUrl.length) push('ERR', 'og:url', '不自指 ' + noOgUrl.length + ' 条');
  if (noSel.length) push('ERR', 'i18n', noSel.length + ' 个页面没有语言切换控件');
  /* UI_LANGS（site-i18n.js）是否与 SEO 的 27 语一致且自带本地化语言名 */
  try {
    const i18n = require('fs').readFileSync(require('path').join(ROOT, 'site-i18n.js'), 'utf8');
    const mm = i18n.match(/UI_LANGS\s*=\s*\[([\s\S]*?)\]\s*;/);
    const pairs = mm ? (mm[1].match(/\[\s*'([a-zA-Z-]+)'\s*,\s*'([^']*)'/g) || []).map(x => x.match(/'([a-zA-Z-]+)',\s*'([^']*)'/)) : [];
    const got = pairs.map(p => p[1]);
    const miss2 = LANGS.filter(l => got.indexOf(l) < 0);
    /* 只对本来就该用非拉丁文字的语言要求本体字符（拉丁语言名如 Svenska / Suomi 不该被误判） */
    const weird = pairs.filter(p => SCRIPT[p[1]] && !SCRIPT[p[1]].test(p[2] || ''));
    console.log('  UI_LANGS（界面语言下拉）：' + got.length + ' 种，缺 ' + (miss2.join(',') || '无')
      + '，本地化名称异常 ' + weird.length + ' 条');
    if (got.length !== 27 || miss2.length) push('ERR', 'i18n', 'UI_LANGS 不是完整 27 语');
    if (weird.length) push('WARN', 'i18n', 'UI_LANGS 有 ' + weird.length + ' 个语言名不像本地化写法');
  } catch (err) { push('ERR', 'i18n', '读不到 site-i18n.js'); }

  /* ---------- 汇总 ---------- */
  console.log('\n==== 体检汇总 ====');
  if (!out.length) { console.log('全部通过，0 问题'); process.exit(0); }
  out.slice(0, 40).forEach(([s, w, t]) => console.log('[' + s + '] ' + w + '：' + t));
  if (out.length > 40) console.log('（另有 ' + (out.length - 40) + ' 条）');
  const errs = out.filter(o => o[0] === 'ERR').length;
  console.log('\nERR ' + errs + ' / WARN ' + (out.length - errs));
  process.exit(errs ? 1 : 0);
})().catch(e => { console.error('FATAL', e); process.exit(1); });
