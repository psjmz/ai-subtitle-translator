/* v0.9.323 内容页（指南）全量审计：第一批 5 篇 × 27 语
   A 静态数据审计（不起服务，直接 require content/*.js）：
     ① slug/kind/tool/date/related 合法；kind ∈ howto/scene/guide
     ② seo[l] 五字段（title/desc/h1/intro/ctaText）27 语全齐、非空
     ③ body[l] 非空；与 zh-CN 节数一致；每节 h2/ps 非空；img 节位置与 zh-CN 一致
     ④ 长度口径（沿 _seo310 用户定案）：title 10~80、desc 40~350
     ⑤ ** 加粗配对（每段偶数个）
     ⑥ [[文字|/路径]] 配对；目标存在（/x.html ∈ 17 页白名单，/guides/s.html ∈ 注册表）
     ⑦ 非中日韩语言不混汉字（老规矩，CJK_OK = zh-CN/zh-TW/ja/ko）
     ⑧ 图片四源齐：img/guides/<file>.{en,zh-CN}.{png,webp}（nolang 时裸文件名）
     ⑨ related 的 slug 已注册且不含自己
   B HTTP 冒烟（起本地服务，PUBLIC_URL 强制本机）：
     ⑩ 43 篇 × 27 语 = 1161 条全 200 + <html lang> 对 + ar/he dir="rtl"
     ⑪ canonical 自指、hreflang 28 条（27 语 + x-default）
     ⑫ og:type=article、og:locale 对、og:image 对应文件真实存在
     ⑬ Article + BreadcrumbList JSON-LD 各一；不出现 HowTo/FAQPage/WebApplication
     ⑭ h1 渲染 = seo.h1、intro 在正文、CTA 链接（带语言前缀的 /shift.html）在
     ⑮ 索引页 /guides/ 与 /en/guides/ 200 且三类分组都在（329：43 卡）
     ⑯ /content/shift.js → 404、/content/ → 404；robots 含 Disallow: /content/
     ⑰ sitemap：<loc> 共 1620（459+1161）、含 /guides/ 的 1161 条、无重复、
        内容页每条带 28 个 xhtml:link alternate
   用法：node _seo323.js   （端口随机取一个空闲的，不与并行进程撞）
*/
'use strict';
process.on('unhandledRejection', () => { });
const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const SRV = Number(process.env.SRV || 3323);
const BASE = 'http://127.0.0.1:' + SRV;
const PAGES = ['index', 'translate', 'merge', 'clean', 'convert', 'bilingual', 'shift', 'repair', 'extract', 'glossary', 'videosub', 'hanconv', 'split', 'table', 'batch', 'lrc', 'qc'];
const LANGS = ['zh-CN', 'zh-TW', 'en', 'ja', 'es', 'pt', 'ko', 'de', 'fr', 'id', 'hi', 'th', 'vi', 'ru', 'it', 'ar', 'tr', 'nl', 'pl', 'sv', 'cs', 'uk', 'da', 'fi', 'el', 'he', 'ro'];
const CJK_OK = ['zh-CN', 'zh-TW', 'ja', 'ko'];
const RTL = ['ar', 'he'];
const OG_LOCALE = { 'zh-CN': 'zh_CN', 'zh-TW': 'zh_TW', en: 'en_US', ja: 'ja_JP', es: 'es_ES', pt: 'pt_BR', ko: 'ko_KR', de: 'de_DE', fr: 'fr_FR', id: 'id_ID', hi: 'hi_IN', th: 'th_TH', vi: 'vi_VN', ru: 'ru_RU', it: 'it_IT', ar: 'ar_AR', tr: 'tr_TR', nl: 'nl_NL', pl: 'pl_PL', sv: 'sv_SE', cs: 'cs_CZ', uk: 'uk_UA', da: 'da_DK', fi: 'fi_FI', el: 'el_GR', he: 'he_IL', ro: 'ro_RO' };
const HAN = /[\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff]/;
const LINK = /\[\[([^\]|]+)\|([^\]]+)\]\]/g;

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

(async () => {
  /* ---------- A 静态数据审计 ---------- */
  console.log('— A. 静态数据审计（content/ 五篇）—');
  const bad = [];
  const push = (sev, where, what) => { bad.push([sev, where, what]); };

  const GUIDE_DIR = path.join(ROOT, 'content');
  const GUIDES = {};
  fs.readdirSync(GUIDE_DIR).sort().forEach(f => {
    if (!/^[a-z0-9][a-z0-9\-]*\.js$/.test(f)) return;
    const d = require(path.join(GUIDE_DIR, f));
    if (d && d.slug) GUIDES[d.slug] = d;
  });
  const slugs = Object.keys(GUIDES).sort();
  console.log('  注册 %d 篇：%s', slugs.length, slugs.join(', '));
  /* 326 起 convert 九篇加入：5 + 9 = 14 */
  if (slugs.length !== 43) push('ERR', 'content/', '应有 43 篇（329 第五批九篇收尾），实际 ' + slugs.length);

  const imgOk = (f) => fs.existsSync(path.join(ROOT, 'img/guides', f));

  slugs.forEach(slug => {
    const g = GUIDES[slug];
    const W = slug;
    if (!['howto', 'scene', 'guide'].includes(g.kind)) push('ERR', W, 'kind 不认识：' + g.kind);
    if (!PAGES.includes(g.tool)) push('ERR', W, 'tool 不在 17 页白名单：' + g.tool);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(g.date || '')) push('ERR', W, 'date 格式不对：' + g.date);
    (g.related || []).forEach(sl => {
      if (!GUIDES[sl]) push('ERR', W, 'related 指向未注册 slug：' + sl);
      if (sl === slug) push('ERR', W, 'related 含自己');
    });

    LANGS.forEach(l => {
      const s = g.seo[l], b = g.body[l], WL = W + '/' + l;
      if (!s) { push('ERR', WL, 'seo 缺整块'); return; }
      ['title', 'desc', 'h1', 'intro', 'ctaText'].forEach(k => {
        if (typeof s[k] !== 'string' || !s[k].trim()) push('ERR', WL, 'seo.' + k + ' 空/缺失');
      });
      if (s.title && (s.title.length < 10 || s.title.length > 80)) push('WARN', WL, 'title 长度 ' + s.title.length + '（10~80）');
      if (s.desc && (s.desc.length < 40 || s.desc.length > 350)) push('WARN', WL, 'desc 长度 ' + s.desc.length + '（40~350）');
      if (!Array.isArray(b) || !b.length) { push('ERR', WL, 'body 空/缺失'); return; }
      const zb = g.body['zh-CN'];
      if (b.length !== zb.length) push('ERR', WL, '节数 ' + b.length + ' ≠ zh-CN 的 ' + zb.length);
      b.forEach((sec, i) => {
        const WS = WL + '#' + (i + 1);
        if (!sec.h2 || !sec.h2.trim()) push('ERR', WS, 'h2 空');
        if (!Array.isArray(sec.ps) || !sec.ps.length || sec.ps.some(p => typeof p !== 'string' || !p.trim())) push('ERR', WS, 'ps 空/坏');
        if (!!sec.img !== !!zb[i].img) push('ERR', WS, 'img 有无与 zh-CN 不一致');
        if (sec.img) {
          if (!sec.img.file || !sec.img.alt || !sec.img.cap) push('ERR', WS, 'img 缺 file/alt/cap');
          if (sec.img.nolang) {
            if (!imgOk(sec.img.file + '.png') || !imgOk(sec.img.file + '.webp')) push('ERR', WS, 'nolang 图缺文件：' + sec.img.file);
          } else {
            ['en', 'zh-CN'].forEach(v => ['.png', '.webp'].forEach(e => {
              if (!imgOk(sec.img.file + '.' + v + e)) push('ERR', WS, '缺图 ' + sec.img.file + '.' + v + e);
            }));
          }
        }
      });
      /* 汉字混入（对 seo+body 全部文本统一查） */
      if (!CJK_OK.includes(l)) {
        const texts = [s.title, s.desc, s.h1, s.intro, s.ctaText].concat(
          b.reduce((a, sec) => a.concat(sec.h2 ? [sec.h2] : [], sec.ps || [], sec.ul || [],
            sec.img ? [sec.img.alt, sec.img.cap] : []), []));
        /* 反引号里的示例原样保留（双语对照示例 `你还在等什么？`），只查正文散文 */
        texts.forEach((t) => { if (typeof t === 'string' && HAN.test(t.replace(/`[^`]*`/g, ''))) push('ERR', WL, '混汉字：' + (t.slice(0, 30))); });
      }
      /* 标记配对 */
      const allTexts = [s.title, s.desc, s.h1, s.intro].concat(
        b.reduce((a, sec) => a.concat(sec.h2 ? [sec.h2] : [], sec.ps || [], sec.ul || [],
          sec.img ? [sec.img.alt, sec.img.cap] : []), []));
      allTexts.forEach(t => {
        if (typeof t !== 'string') return;
        const n = (t.match(/\*\*/g) || []).length;
        if (n % 2) push('ERR', WL, '加粗 ** 不成对：' + t.slice(0, 40));
        const opens = (t.match(/\[\[/g) || []).length, closes = (t.match(/\]\]/g) || []).length;
        if (opens !== closes || opens !== (t.match(LINK) || []).length) push('ERR', WL, '[[]] 标记不成对：' + t.slice(0, 40));
      });
      /* 链接目标 */
      [s.intro].concat(b.reduce((a, sec) => a.concat(sec.ps || [], sec.ul || []), [])).forEach(t => {
        if (typeof t !== 'string') return;
        let m; LINK.lastIndex = 0;
        while ((m = LINK.exec(t))) {
          const href = m[2];
          const gm = href.match(/^\/guides\/([a-z0-9][a-z0-9\-]*)\.html$/);
          if (gm) { if (!GUIDES[gm[1]]) push('ERR', WL, '内链指向未注册指南：' + href); }
          else {
            const pm = href.match(/^\/([a-z]+)\.html$/);
            if (!pm || !PAGES.includes(pm[1])) push('ERR', WL, '内链目标不在 17 页白名单：' + href);
          }
        }
      });
    });
  });

  /* ---------- B HTTP 冒烟 ---------- */
  console.log('— B. HTTP 冒烟（起服务 :' + SRV + '）—');
  const srv = spawn(process.execPath, ['server.js'], { cwd: ROOT, env: Object.assign({}, process.env, { PORT: String(SRV), PUBLIC_URL: BASE }), stdio: 'ignore' });
  /* 就绪轮询（1.5 秒有时不够） */
  for (let i = 0; i < 30; i++) {
    try { await get('/robots.txt'); break; } catch (e) { await new Promise(r => setTimeout(r, 500)); }
  }

  const urlOf = (l, slug) => (l === 'zh-CN' ? '' : '/' + l) + '/guides/' + slug + '.html';

  for (const slug of slugs) {
    for (const l of LANGS) {
      const W = slug + '/' + l;
      const r = await get(urlOf(l, slug));
      if (r.code !== 200) { push('ERR', W, 'HTTP ' + r.code); continue; }
      const h = r.body;
      const lang = tag(h, /<html lang="([^"]+)"/);
      if (lang !== l) push('ERR', W, 'html lang=' + lang);
      if (RTL.includes(l) && !/dir="rtl"/.test(h)) push('ERR', W, 'RTL 语言缺 dir="rtl"');
      const canon = tag(h, /rel="canonical" href="([^"]+)"/);
      if (canon !== BASE + urlOf(l, slug)) push('ERR', W, 'canonical 不自指：' + canon);
      const alts = (h.match(/hreflang="[^"]+"/g) || []).length;
      if (alts !== 28) push('ERR', W, 'hreflang ' + alts + ' 条（应 27+x-default=28）');
      if (tag(h, /property="og:type" content="([^"]+)"/) !== 'article') push('ERR', W, 'og:type 不是 article');
      if (tag(h, /property="og:locale" content="([^"]+)"/) !== OG_LOCALE[l]) push('ERR', W, 'og:locale 不对');
      const ogimg = tag(h, /property="og:image" content="([^"]+)"/);
      const im = ogimg.match(/\/img\/guides\/(.+)$/);
      if (!im || !imgOk(im[1])) push('ERR', W, 'og:image 文件不存在：' + ogimg);
      if ((h.match(/"@type": "Article"/g) || []).length !== 1) push('ERR', W, 'Article JSON-LD 不是恰好 1 条');
      if ((h.match(/"@type": "BreadcrumbList"/g) || []).length !== 1) push('ERR', W, 'BreadcrumbList 不是恰好 1 条');
      if (/HowTo|FAQPage|WebApplication/.test(h)) push('ERR', W, '出现 HowTo/FAQPage/WebApplication');
      const g = GUIDES[slug], s = g.seo[l];
      /* h1 里保留着占位符注释：<h1><!--GUIDE-H1-START-->文字<!--GUIDE-H1-END--></h1> */
      const h1 = tag(h, /<!--GUIDE-H1-START-->([\s\S]*?)<!--GUIDE-H1-END-->/);
      if (h1 !== s.h1) push('ERR', W, 'h1 渲染=' + h1 + ' ≠ seo.h1=' + s.h1);
      if (!h.includes('class="gintro"') || !h.includes(s.intro.slice(0, 15))) push('ERR', W, 'intro 没渲染进正文');
      const cta = (l === 'zh-CN' ? '' : '/' + l) + '/shift.html';
      if (!h.includes('href="' + cta + '"')) push('ERR', W, 'CTA 链接没带语言前缀：' + cta);
      /* v0.9.325 版式（照 Astro Starlight）：左分组导航 3 组 + 当前项唯一 + 深色带 1 条 + 无视觉面包屑。
         ⚠️ 数标签而不是数类名字符串：CSS 里也有 .snav-grp / .gcta / [aria-current="page"] 的字样 */
      const ngrp = (h.match(/<div class="snav-grp">/g) || []).length;
      if (ngrp !== 3) push('ERR', W, '左导航分组 ' + ngrp + ' 个（应 3）');
      const ncur = (h.match(/<a href="[^"]*" aria-current="page"/g) || []).length;
      if (ncur !== 1) push('ERR', W, '当前项 aria-current ' + ncur + ' 个（应 1）');
      if ((h.match(/<div class="gcta">/g) || []).length !== 1) push('ERR', W, '深色行动带不是恰好 1 条');
      if (h.includes('class="gcrumb"')) push('ERR', W, '视觉面包屑回潮（用户定案砍掉）');
      /* 左导航条目必须都是本语言版本（不许指向不存在的语言版） */
      const navHref = (l === 'zh-CN' ? '/' : '/' + l + '/') + 'guides/';
      const bad = (h.match(/<a href="([^"]+)"[^>]*aria-current="page"/g) || [])
        .filter(x => x.indexOf(navHref) < 0);
      if (bad.length) push('ERR', W, '当前项链接没带语言前缀：' + bad.join(','));
    }
  }
  console.log('  内容页文章扫完（1161 条）');

  /* 索引页 */
  for (const [p, l] of [['/guides/', 'zh-CN'], ['/en/guides/', 'en']]) {
    const r = await get(p);
    if (r.code !== 200) { push('ERR', 'index' + p, 'HTTP ' + r.code); continue; }
    /* 三组列表：howto / scene / guide 各一个 ul.glist */
    const nlist = (r.body.match(/class="glist"/g) || []).length;
    if (nlist !== 3) push('ERR', 'index' + p, 'glist 分组 ' + nlist + ' 个（应 3）');
    if ((r.body.match(/"@type": "CollectionPage"/g) || []).length !== 1) push('ERR', 'index' + p, 'CollectionPage 不是 1 条');
    /* v0.9.325：索引页收掉右栏（shell 带 gidx）、左导航同样 3 组、无面包屑 */
    if (!/class="shell gidx"/.test(r.body)) push('ERR', 'index' + p, '索引页没带 gidx（右栏没收掉）');
    if ((r.body.match(/<div class="snav-grp">/g) || []).length !== 3) push('ERR', 'index' + p, '左导航分组不是 3 个');
    if ((r.body.match(/<a href="[^"]*" aria-current="page"/g) || []).length !== 0) push('ERR', 'index' + p, '索引页不该有 aria-current');
  }
  console.log('  索引页 zh-CN/en 200 + 三组列表在');

  /* content 目录封死 + robots */
  for (const p of ['/content/shift.js', '/content/']) {
    const r = await get(p);
    if (r.code !== 404) push('ERR', p, 'HTTP ' + r.code + '（应 404）');
  }
  const rb = (await get('/robots.txt')).body;
  if (!rb.includes('Disallow: /content/')) push('ERR', 'robots.txt', '缺 Disallow: /content/');
  console.log('  /content/ 封死 + robots OK');

  /* sitemap */
  const sm = (await get('/sitemap.xml')).body;
  const locs = (sm.match(/<loc>([^<]+)<\/loc>/g) || []).map(x => x.slice(5, -6));
  /* 326 起 convert 九篇加入：459 + 14×27 = 837；327 起第三批十篇加入：459 + 24×27 = 1107 */
  /* 328 起第四批十篇加入：459 + 34×27 = 1377；329 起第五批九篇收尾：459 + 43×27 = 1620 */
  if (locs.length !== 1620) push('ERR', 'sitemap', 'loc 共 ' + locs.length + '（应 1620 = 459+1161）');
  if (new Set(locs).size !== locs.length) push('ERR', 'sitemap', '有重复 loc');
  const glocs = locs.filter(x => x.includes('/guides/'));
  if (glocs.length !== 1161) push('ERR', 'sitemap', '指南 loc ' + glocs.length + '（应 1161）');
  const altCount = (sm.match(/xhtml:link rel="alternate"/g) || []).length;
  if (altCount !== 1620 * 28) push('ERR', 'sitemap', 'alternate 总数 ' + altCount + '（应 ' + (1620 * 28) + '）');
  if (!/lastmod/.test(sm)) console.log('  （提示：sitemap 无 lastmod —— 用户决策未动）');
  console.log('  sitemap：loc %d 条 / 指南 %d 条 / alternate %d 条', locs.length, glocs.length, altCount);

  srv.kill();

  /* ---------- 汇总 ---------- */
  console.log('\n==== 汇总 ====');
  if (!bad.length) { console.log('全部通过，0 问题'); process.exit(0); }
  bad.forEach(([sev, w, t]) => console.log('[' + sev + '] ' + w + '：' + t));
  const errs = bad.filter(b => b[0] === 'ERR').length;
  console.log('\nERR %d / WARN %d', errs, bad.length - errs);
  process.exit(errs ? 1 : 0);
})().catch(e => { console.error('FATAL', e); process.exit(1); });
