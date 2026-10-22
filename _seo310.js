/* v0.9.310 多语言 SEO 全量审计：十七页 × 27 语 = 459 条 URL 一条条取回来核对
   （v0.9.313 加 videosub / hanconv，v0.9.316 加 split/table/batch/lrc，v0.9.321 加 qc）
   检查项（凡是爬虫/搜索引擎真会看的）：
     ① HTTP 200 + <html lang> 对得上 + ar/he 整页 dir="rtl"
     ② canonical 自指、hreflang 全集（27 语 + x-default）且**互指完整**（含自己）
     ③ title / description / og:title / og:description / keywords 非空
     ④ og:locale 与语言对得上；JSON-LD 能解析、url == canonical
     ⑤ 非中日韩语言里**不许混汉字**（老规矩）
     ⑥ 文案**不许被截断**（结尾 … / 半句）
     ⑦ 长度：title 10~80、desc 40~350
        ⚠️ 口径（v0.9.310 用户定案）：description 一律「补齐原句」，不为了压到 160 而把句子砍半。
           搜索引擎只按像素截断显示（约 160 字），完整句子对索引和长尾词更有利，不算缺陷。
           350 是各家工具（Yoast / SEMrush）公认的硬上限，超过这个才是真超长。
           同理 title：60 是「显示不截断」的经验值，80 以上才算真的太长。
     ⑧ 爬虫可读的静态文案块在（不执行 JS 也能读到正文）
     ⑨ sitemap.xml：459 条、无重复、每条带 28 个 alternates
     ⑩ robots.txt：有 User-agent / 有 Sitemap 指向
   用法：node _seo309.js          （自带本地服务，端口随机；SRV=xxxx 可指定）
*/
'use strict';
process.on('unhandledRejection', () => { });
const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const SRV = Number(process.env.SRV || 3410);
const BASE = 'http://127.0.0.1:' + SRV;
const PAGES = ['index', 'translate', 'merge', 'clean', 'convert', 'bilingual', 'shift', 'repair', 'extract', 'glossary', 'videosub', 'hanconv', 'split', 'table', 'batch', 'lrc', 'qc']; /* v0.9.321 起十七页 */
const LANGS = ['zh-CN', 'zh-TW', 'en', 'ja', 'es', 'pt', 'ko', 'de', 'fr', 'id', 'hi', 'th', 'vi', 'ru', 'it', 'ar', 'tr', 'nl', 'pl', 'sv', 'cs', 'uk', 'da', 'fi', 'el', 'he', 'ro'];
const CJK_OK = ['zh-CN', 'zh-TW', 'ja', 'ko'];          // 这四种允许出现汉字
const RTL = ['ar', 'he'];
const OG_LOCALE = { 'zh-CN': 'zh_CN', 'zh-TW': 'zh_TW', en: 'en_US', ja: 'ja_JP', es: 'es_ES', pt: 'pt_BR', ko: 'ko_KR', de: 'de_DE', fr: 'fr_FR', id: 'id_ID', hi: 'hi_IN', th: 'th_TH', vi: 'vi_VN', ru: 'ru_RU', it: 'it_IT', ar: 'ar_AR', tr: 'tr_TR', nl: 'nl_NL', pl: 'pl_PL', sv: 'sv_SE', cs: 'cs_CZ', uk: 'uk_UA', da: 'da_DK', fi: 'fi_FI', el: 'el_GR', he: 'he_IL', ro: 'ro_RO' };

function urlOf(page, l) {
  if (l === 'zh-CN') return '/' + (page === 'index' ? '' : page + '.html');
  return '/' + l + '/' + (page === 'index' ? '' : page + '.html');
}
function get(urlPath) {
  return new Promise((res, rej) => {
    http.get({ host: '127.0.0.1', port: SRV, path: urlPath, headers: { 'Accept-Encoding': 'identity' } }, r => {
      let d = ''; r.setEncoding('utf8');
      r.on('data', c => d += c);
      r.on('end', () => res({ code: r.statusCode, body: d }));
    }).on('error', rej);
  });
}
const tag = (html, re) => { const m = html.match(re); return m ? m[1] : ''; };
const HAN = /[\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff]/;

(async () => {
  console.log('— 起本地服务 :' + SRV + ' —');
  /* ⚠️ publicBase() 会读 config.publicUrl（本地副本里是线上域名），所以这里用 PUBLIC_URL 强制成本机地址，
     否则 canonical / hreflang / JSON-LD 全吐 https://ai-srtsub.com，审计的期望值对不上（不是产品问题） */
  const srv = spawn(process.execPath, ['server.js'], { cwd: ROOT, env: Object.assign({}, process.env, { PORT: String(SRV), PUBLIC_URL: BASE }), stdio: 'ignore' });
  await new Promise(r => setTimeout(r, 1500));

  const bad = [];                 // [严重度, 位置, 问题]
  const push = (sev, where, what) => { bad.push([sev, where, what]); };

  /* ---------- ⑨ sitemap ---------- */
  console.log('\n— sitemap.xml —');
  const sm = await get('/sitemap.xml');
  const locs = (sm.body.match(/<loc>([^<]+)<\/loc>/g) || []).map(s => s.replace(/<\/?loc>/g, ''));
  const uniq = [...new Set(locs)];
  console.log('  HTTP ' + sm.code + '  <url> 条目 ' + (sm.body.match(/<url>/g) || []).length + ' 条，去重后 ' + uniq.length + ' 个 loc');
  if (sm.code !== 200) push('严重', 'sitemap.xml', 'HTTP ' + sm.code);
  if (uniq.length !== 459) push('严重', 'sitemap.xml', 'loc 数 ' + uniq.length + '（应为 459）');
  if (uniq.length !== locs.length) push('严重', 'sitemap.xml', '有重复 loc（' + (locs.length - uniq.length) + ' 个重复）');
  const perUrl = (sm.body.match(/<xhtml:link/g) || []).length / (uniq.length || 1);
  console.log('  每条平均 alternates：' + perUrl.toFixed(1) + '（应为 28 = 27 语 + x-default）');
  if (Math.abs(perUrl - 28) > 0.01) push('严重', 'sitemap.xml', '平均 alternates ' + perUrl.toFixed(1) + '（应为 28）');
  /* sitemap 里的 URL 必须都能在期望集合里找到 */
  const expect = new Set();
  PAGES.forEach(p => LANGS.forEach(l => expect.add(BASE + urlOf(p, l))));
  const alien = uniq.filter(u => !expect.has(u));
  if (alien.length) push('严重', 'sitemap.xml', '出现计划外 URL：' + alien.slice(0, 3).join(' , '));
  const missing = [...expect].filter(u => !uniq.includes(u));
  if (missing.length) push('严重', 'sitemap.xml', '缺 ' + missing.length + ' 条 URL，例：' + missing.slice(0, 3).join(' , '));

  /* ---------- ⑩ robots ---------- */
  console.log('\n— robots.txt —');
  const rb = await get('/robots.txt');
  console.log('  HTTP ' + rb.code);
  if (rb.code !== 200) push('严重', 'robots.txt', 'HTTP ' + rb.code);
  if (!/User-agent/i.test(rb.body)) push('严重', 'robots.txt', '没有 User-agent 段');
  if (!/Sitemap:/i.test(rb.body)) push('中', 'robots.txt', '没有 Sitemap: 指向（搜索引擎找不到 sitemap 入口）');
  else console.log('  ' + (rb.body.match(/Sitemap:\s*\S+/i) || [''])[0]);
  if (/Disallow:\s*\/\s*$/m.test(rb.body)) push('严重', 'robots.txt', 'Disallow: / —— 整站禁止抓取');

  /* ---------- ①~⑧ 逐条 ---------- */
  console.log('\n— 459 条 URL 逐项核对 —');
  let okCount = 0, checked = 0;
  for (const p of PAGES) {
    const rowBad = { lang: 0, canon: 0, alt: 0, meta: 0, han: 0, trunc: 0, len: 0, ld: 0, copy: 0 };
    for (const l of LANGS) {
      const u = urlOf(p, l);
      const r = await get(u);
      checked++;
      if (r.code !== 200) { push('严重', p + ' ' + l, 'HTTP ' + r.code); continue; }
      const h = r.body;

      /* ① lang / dir */
      const hl = tag(h, /<html lang="([^"]+)"/);
      const wantLang = (p === 'index') ? (l === 'zh-CN' ? 'zh-CN' : l) : l;
      if (hl !== wantLang) { rowBad.lang++; push('严重', p + ' ' + l, '<html lang="' + hl + '">（应为 ' + wantLang + '）'); }
      const hasDir = /<html[^>]*dir="rtl"/.test(h);
      if (RTL.includes(l) && !hasDir) { rowBad.lang++; push('严重', p + ' ' + l, '缺 dir="rtl"'); }
      if (!RTL.includes(l) && hasDir) { rowBad.lang++; push('中', p + ' ' + l, '多余 dir="rtl"'); }

      /* ② canonical + hreflang */
      const canon = tag(h, /<link rel="canonical" href="([^"]+)"/);
      if (canon !== BASE + u) { rowBad.canon++; push('严重', p + ' ' + l, 'canonical=' + canon + '（应为 ' + BASE + u + '）'); }
      const alts = [...h.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)].map(m => [m[1], m[2]]);
      const altMap = new Map(alts);
      if (altMap.size !== 28) { rowBad.alt++; push('严重', p + ' ' + l, 'alternate 只有 ' + altMap.size + ' 个（应为 28）'); }
      for (const L of LANGS) if (!altMap.has(L)) { rowBad.alt++; push('严重', p + ' ' + l, '缺 hreflang ' + L); }
      if (!altMap.has('x-default')) { rowBad.alt++; push('严重', p + ' ' + l, '缺 hreflang x-default'); }
      /* 互指：每条 alternate 的 href 必须是「该页该语言」的正确地址 */
      for (const [L, href] of alts) {
        if (L === 'x-default') continue;
        if (href !== BASE + urlOf(p, L)) { rowBad.alt++; push('严重', p + ' ' + l, 'hreflang ' + L + ' 指向 ' + href); break; }
      }
      if (altMap.get(l) !== BASE + u) { rowBad.alt++; push('中', p + ' ' + l, '没有自指 hreflang（Google 要求互指）'); }

      /* ③ meta */
      const title = tag(h, /<title>([^<]*)<\/title>/);
      const desc = tag(h, /<meta name="description" content="([^"]*)"/);
      const ogt = tag(h, /<meta property="og:title" content="([^"]*)"/);
      const ogd = tag(h, /<meta property="og:description" content="([^"]*)"/);
      const kw = tag(h, /<meta name="keywords" content="([^"]*)"/);
      const ogl = tag(h, /<meta property="og:locale" content="([^"]*)"/);
      if (!title || !desc || !ogt || !ogd || !kw) { rowBad.meta++; push('严重', p + ' ' + l, 'meta 有空值（title/desc/og/kw）'); }
      if (ogl !== OG_LOCALE[l]) { rowBad.meta++; push('中', p + ' ' + l, 'og:locale=' + ogl + '（应为 ' + OG_LOCALE[l] + '）'); }

      /* ⑤ 汉字泄漏 */
      if (!CJK_OK.includes(l)) {
        const hit = [['title', title], ['desc', desc], ['og:title', ogt], ['og:desc', ogd]].filter(x => HAN.test(x[1]));
        if (hit.length) { rowBad.han++; push('严重', p + ' ' + l, '混了汉字：' + hit.map(x => x[0]).join('/')); }
      }

      /* ⑥ 截断（结尾是 … / ... 或半句） */
      const truncHit = [['title', title], ['desc', desc], ['og:title', ogt], ['og:desc', ogd]]
        .filter(x => /[…]|\.\.\.$/.test(x[1].trim()) || /\.\.\.$/.test(x[1].trim()));
      if (truncHit.length) { rowBad.trunc++; push('严重', p + ' ' + l, '文案被截断：' + truncHit.map(x => x[0] + '=' + JSON.stringify(x[1].slice(-28))).join(' | ')); }

      /* ⑦ 长度 */
      if (title && (title.length < 10 || title.length > 80)) { rowBad.len++; push('中', p + ' ' + l, 'title 长度 ' + title.length); }
      /* 中日韩一个字顶拉丁文好几个字的信息量，40 字的下限是按拉丁文定的 ——
         中文 35 字（如「免费在线字幕时间轴调整：整体提前或延后…」）已经是一句完整话了 */
      const minDesc = ['zh-CN', 'zh-TW', 'ja', 'ko'].includes(l) ? 20 : 40;
      if (desc && (desc.length < minDesc || desc.length > 350)) { rowBad.len++; push('中', p + ' ' + l, 'desc 长度 ' + desc.length); }

      /* ④ JSON-LD */
      const ldm = h.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
      if (!ldm) { rowBad.ld++; push('严重', p + ' ' + l, '没有 JSON-LD'); }
      else {
        let o = null; try { o = JSON.parse(ldm[1]); } catch (e) { }
        if (!o) { rowBad.ld++; push('严重', p + ' ' + l, 'JSON-LD 解析失败'); }
        else {
          if (!o['@type'] || !o.name || !o.description) { rowBad.ld++; push('中', p + ' ' + l, 'JSON-LD 缺 @type/name/description'); }
          if (o.url !== BASE + u) { rowBad.ld++; push('严重', p + ' ' + l, 'JSON-LD url=' + o.url); }
          if (!Array.isArray(o.inLanguage)) { rowBad.ld++; push('中', p + ' ' + l, 'JSON-LD inLanguage 不是数组'); }
        }
      }

      /* ⑧ 静态文案块（爬虫不跑 JS 时唯一的正文） */
      const copy = h.match(/<!--SEO-COPY-START-->([\s\S]*?)<!--SEO-COPY-END-->/);
      const copyTxt = copy ? copy[1].replace(/<[^>]*>/g, '').trim() : '';
      if (copyTxt.length < 80) { rowBad.copy++; push('中', p + ' ' + l, '静态文案块只有 ' + copyTxt.length + ' 字（爬虫读不到正文）'); }
      /* v0.9.310 新增：非中日韩语言的静态文案块里不许有汉字。
         ⚠️ 首页和工作台以前压根没有 SEO-COPY 占位符 —— 26 个非中文版本整段正文都是中文，
            线上 /en/ 的 h1 就是「字幕的活儿，交给 AI」，爬虫读到的正文一个英文字都没有。
            这是那次事故的回归断言：谁把占位符删了、或哪张表的 copy 漏翻，这里立刻红。 */
      if (!CJK_OK.includes(l) && HAN.test(copyTxt)) {
        rowBad.copy++;
        push('严重', p + ' ' + l, '静态文案块里混汉字：' + JSON.stringify((copyTxt.match(HAN.source ? new RegExp(HAN.source, 'g') : /x/g) || []).slice(0, 8).join('')));
      }
      /* h1 恰好一个 */
      const h1 = (h.match(/<h1[\s>]/g) || []).length;
      if (h1 !== 1) push('中', p + ' ' + l, 'h1 有 ' + h1 + ' 个（应为 1）');

      if (Object.values(rowBad).every(v => v === 0)) okCount++;
    }
    const tot = Object.values(rowBad).reduce((a, b) => a + b, 0);
    console.log('  ' + p.padEnd(10) + (tot === 0 ? '全部通过' : '问题 ' + tot + ' 处：' + JSON.stringify(rowBad)));
  }
  console.log('  —— 逐条全绿的：' + okCount + '/' + checked);

  /* ---------- 汇总 ---------- */
  console.log('\n===== 问题清单（按类型归类）=====');
  const kindOf = w => (w.split('：')[0].split('（')[0] || w).slice(0, 24);
  const g = new Map();
  bad.forEach(b => {
    const k = kindOf(b[2]);
    if (!g.has(k)) g.set(k, []);
    g.get(k).push([b[0], b[1], b[2]]);
  });
  [...g.keys()].sort((a, b) => g.get(b).length - g.get(a).length).forEach(k => {
    const list = g.get(k);
    const sevs = list.map(x => x[0]);
    console.log('\n【' + k + '】共 ' + list.length + ' 条（' + sevs.filter(s => s === '严重').length + ' 严重）');
    /* 同一类只列前 6 条样例，其余只报「涉及哪些页 × 哪些语」 */
    list.slice(0, 6).forEach(x => console.log('   [' + x[0] + '] ' + x[1] + ' —— ' + x[2].slice(0, 130)));
    if (list.length > 6) {
      const pages = [...new Set(list.map(x => x[1].split(' ')[0]))];
      const langs = [...new Set(list.map(x => x[1].split(' ')[1]))];
      console.log('   … 其余 ' + (list.length - 6) + ' 条：页=' + pages.join(',') + '；语=' + langs.join(','));
    }
  });
  const sev = { '严重': 0, '中': 0 };
  bad.forEach(b => sev[b[0]]++);
  console.log('\n_seo310：严重 ' + sev['严重'] + ' 条 / 中 ' + sev['中'] + ' 条，合计 ' + bad.length + ' 条');

  srv.kill();
  process.exit(0);
})().catch(e => { console.log('FATAL', e.message); process.exit(2); });
