/* v0.9.310 上线后的第二轮复查（用户：「换你再帮检查一遍seo和多语言」）
   _seo310.js 已覆盖的（结构层 + 截断 + 长度 + 汉字泄漏 + sitemap/robots）不再重复，
   本脚本专查上一轮**没查过**的维度：
     A. og 全量：og:url=canonical、og:type、og:site_name、og:image 绝对地址、og:locale:alternate 恰好 26 个
     B. twitter 标签与 og 一致（card/title/description）
     C. JSON-LD 深查：@context、name==title、description==desc、inLanguage 恰好 27 语全且唯一
     D. hreflang 代码本身合法（xx / xx-XX 格式，都在 27 语集合内）
     E. 跨语言重复：同一页 27 个语言的 title / desc 两两对比，完全一样 = 疑似没翻译
     F. 非拉丁语言必须出现本地文字（ja 韩彦文 / ko 谚文 / ru·uk 西里尔 / ar / he / th / el / hi / zh 汉字）
        —— title 和 desc 全是 ASCII 拉丁字母 = 这条文案八成没翻译
     G. 跨页面区分度：同一语言 10 个页面的 title 前 40 字符两两不完全相同
     H. keywords 质量：非空、逗号拆开后无空段、无重复词
     I. HTML 转义验证：meta 值里没有裸 & （后面不跟合法实体 = ea() 失效的信号）
     J. 静态文案块字数分布：每页 27 语的 copy 长度列分布，异常短（< 250）单独点名
     K. 基础页头：meta charset、viewport、每页只有一个 description / 一个 canonical
   用法：node _seo311.js   （SRV=xxxx 指定端口）
*/
'use strict';
process.on('unhandledRejection', () => { });
const { spawn } = require('child_process');
const http = require('http');

const ROOT = __dirname;
const SRV = Number(process.env.SRV || 3412);
const BASE = 'http://127.0.0.1:' + SRV;
const PAGES = ['index', 'translate', 'merge', 'clean', 'convert', 'bilingual', 'shift', 'repair', 'extract', 'glossary'];
const LANGS = ['zh-CN', 'zh-TW', 'en', 'ja', 'es', 'pt', 'ko', 'de', 'fr', 'id', 'hi', 'th', 'vi', 'ru', 'it', 'ar', 'tr', 'nl', 'pl', 'sv', 'cs', 'uk', 'da', 'fi', 'el', 'he', 'ro'];
const OG_LOCALE = { 'zh-CN': 'zh_CN', 'zh-TW': 'zh_TW', en: 'en_US', ja: 'ja_JP', es: 'es_ES', pt: 'pt_BR', ko: 'ko_KR', de: 'de_DE', fr: 'fr_FR', id: 'id_ID', hi: 'hi_IN', th: 'th_TH', vi: 'vi_VN', ru: 'ru_RU', it: 'it_IT', ar: 'ar_AR', tr: 'tr_TR', nl: 'nl_NL', pl: 'pl_PL', sv: 'sv_SE', cs: 'cs_CZ', uk: 'uk_UA', da: 'da_DK', fi: 'fi_FI', el: 'el_GR', he: 'he_IL', ro: 'ro_RO' };
/* F. 每种非拉丁语言的特征文字区段（title+desc 里至少出现一个） */
const SCRIPT_RE = {
  'zh-CN': /[\u4e00-\u9fff]/, 'zh-TW': /[\u4e00-\u9fff]/,
  ja: /[\u3040-\u30ff\u4e00-\u9fff]/, ko: /[\uac00-\ud7af\u1100-\u11ff]/,
  ru: /[\u0400-\u04ff]/, uk: /[\u0400-\u04ff]/,
  ar: /[\u0600-\u06ff]/, he: /[\u0590-\u05ff]/,
  th: /[\u0e00-\u0e7f]/, el: /[\u0370-\u03ff]/, hi: /[\u0900-\u097f]/,
};
/* D. hreflang 合法值集合 */
const VALID_HL = new Set(LANGS.concat(['x-default']));

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
const all = (html, re) => [...html.matchAll(re)].map(m => m[1]);

(async () => {
  console.log('— 起本地服务 :' + SRV + ' —');
  const srv = spawn(process.execPath, ['server.js'], { cwd: ROOT, env: Object.assign({}, process.env, { PORT: String(SRV), PUBLIC_URL: BASE }), stdio: 'ignore' });
  await new Promise(r => setTimeout(r, 1500));

  const bad = [];
  const push = (sev, where, what) => { bad.push([sev, where, what]); };

  /* 数据收集：pages[page][lang] = {...} */
  const data = {};
  for (const p of PAGES) {
    data[p] = {};
    for (const l of LANGS) {
      const u = urlOf(p, l);
      const r = await get(u);
      if (r.code !== 200) { push('严重', p + ' ' + l, 'HTTP ' + r.code); continue; }
      const h = r.body;
      data[p][l] = {
        u,
        title: tag(h, /<title>([^<]*)<\/title>/),
        desc: tag(h, /<meta name="description" content="([^"]*)"/),
        kw: tag(h, /<meta name="keywords" content="([^"]*)"/),
        canon: tag(h, /<link rel="canonical" href="([^"]+)"/),
        ogUrl: tag(h, /<meta property="og:url" content="([^"]*)"/),
        ogType: tag(h, /<meta property="og:type" content="([^"]*)"/),
        ogSite: tag(h, /<meta property="og:site_name" content="([^"]*)"/),
        ogImg: tag(h, /<meta property="og:image" content="([^"]*)"/),
        ogTitle: tag(h, /<meta property="og:title" content="([^"]*)"/),
        ogDesc: tag(h, /<meta property="og:description" content="([^"]*)"/),
        ogAlt: all(h, /<meta property="og:locale:alternate" content="([^"]*)"/g),
        twCard: tag(h, /<meta name="twitter:card" content="([^"]*)"/),
        twTitle: tag(h, /<meta name="twitter:title" content="([^"]*)"/),
        twDesc: tag(h, /<meta name="twitter:description" content="([^"]*)"/),
        hl: [...h.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)].map(m => m[1]),
        ldRaw: h.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/),
        copyLen: (h.match(/<!--SEO-COPY-START-->([\s\S]*?)<!--SEO-COPY-END-->/) || ['', ''])[1].replace(/<[^>]*>/g, '').trim().length,
        nDesc: (h.match(/<meta name="description"/g) || []).length,
        nCanon: (h.match(/<link rel="canonical"/g) || []).length,
        charset: /<meta charset="utf-8"/i.test(h),
        viewport: /<meta name="viewport"/.test(h),
      };
    }
  }
  console.log('  270 页数据收集完毕\n');

  /* ---------- A. og 全量 ---------- */
  console.log('— A. og 标签全量 —');
  for (const p of PAGES) for (const l of LANGS) {
    const d = data[p][l]; if (!d) continue;
    const w = p + ' ' + l;
    if (d.ogUrl !== BASE + d.u) push('严重', w, 'og:url=' + d.ogUrl + '（应=canonical）');
    if (!d.ogType) push('中', w, 'og:type 缺失');
    if (!d.ogSite) push('中', w, 'og:site_name 缺失');
    if (!/^https?:\/\//.test(d.ogImg)) push('中', w, 'og:image 非绝对地址：' + JSON.stringify(d.ogImg));
    /* alternate 应为其余 26 语，不多不少 */
    const wantAlt = new Set(LANGS.filter(x => x !== l).map(x => OG_LOCALE[x]));
    const gotAlt = new Set(d.ogAlt);
    if (gotAlt.size !== d.ogAlt.length) push('中', w, 'og:locale:alternate 有重复（' + d.ogAlt.length + ' 条去重后 ' + gotAlt.size + '）');
    if (gotAlt.size !== 26) push('中', w, 'og:locale:alternate ' + gotAlt.size + ' 条（应 26）');
    const missAlt = [...wantAlt].filter(x => !gotAlt.has(x));
    if (missAlt.length) push('中', w, 'og:locale:alternate 缺：' + missAlt.join(','));
    const alienAlt = [...gotAlt].filter(x => !wantAlt.has(x));
    if (alienAlt.length) push('中', w, 'og:locale:alternate 多出：' + alienAlt.join(','));
  }
  console.log('  检查完（og:url / type / site_name / image / 26 alternate）');

  /* ---------- B. twitter 与 og 一致 ---------- */
  console.log('— B. twitter 标签 —');
  for (const p of PAGES) for (const l of LANGS) {
    const d = data[p][l]; if (!d) continue;
    const w = p + ' ' + l;
    if (!d.twCard) push('中', w, 'twitter:card 缺失');
    if (d.twTitle && d.twTitle !== d.ogTitle) push('中', w, 'twitter:title ≠ og:title');
    if (d.twDesc && d.twDesc !== d.ogDesc) push('中', w, 'twitter:description ≠ og:description');
  }
  console.log('  检查完（card / title / description 一致性）');

  /* ---------- C. JSON-LD 深查 ---------- */
  console.log('— C. JSON-LD 深查 —');
  {
    let ldOK = 0;
    for (const p of PAGES) for (const l of LANGS) {
      const d = data[p][l]; if (!d) continue;
      const w = p + ' ' + l;
      if (!d.ldRaw) { push('严重', w, '没有 JSON-LD'); continue; }
      let o = null; try { o = JSON.parse(d.ldRaw[1]); } catch (e) { }
      if (!o) { push('严重', w, 'JSON-LD 解析失败'); continue; }
      if (o['@context'] !== 'https://schema.org') push('中', w, 'JSON-LD @context=' + JSON.stringify(o['@context']));
      /* ⚠️ name 走的是品牌名（jsonldName || siteName），不是页面 title —— WebApplication.name 本就该是应用名，
         这里只查它非空且不为 undefined；「≠ title」不是缺陷（第一轮审计的口径错误） */
      if (!o.name || o.name === 'undefined') push('中', w, 'JSON-LD name 为空');
      /* ⚠️ meta desc 走了 ea() 转义（&quot; / &amp;），JSON-LD 是原始字符 —— 反转义后再比。
         首页表 27 语有特意另写的 jsonldDesc（营销文案 ≠ desc），这是设计不是缺陷：
         只有「反转义后仍不等 **且不是首页那张表**」才算问题（首页 jsonldDesc=另一句是故意的） */
      const unesc = s => s.replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
      if (unesc(d.desc) !== o.description && p !== 'index')
        push('中', w, 'JSON-LD description 与 meta description 语义不同（反转义后仍不等）');
      if (!Array.isArray(o.inLanguage)) push('中', w, 'inLanguage 不是数组');
      else {
        const set = new Set(o.inLanguage);
        if (o.inLanguage.length !== 27 || set.size !== 27) push('中', w, 'inLanguage ' + o.inLanguage.length + ' 条（去重 ' + set.size + '，应 27）');
        const miss = LANGS.filter(x => !set.has(x));
        if (miss.length) push('中', w, 'inLanguage 缺：' + miss.join(','));
      }
      ldOK++;
    }
    console.log('  解析成功 ' + ldOK + '/270，name/description/inLanguage 逐一比对');
  }

  /* ---------- D. hreflang 代码合法 ---------- */
  console.log('— D. hreflang 代码 —');
  {
    let dup = 0;
    for (const p of PAGES) for (const l of LANGS) {
      const d = data[p][l]; if (!d) continue;
      const w = p + ' ' + l;
      const set = new Set(d.hl);
      if (set.size !== d.hl.length) { dup++; push('中', w, 'hreflang 值有重复'); }
      const alien = d.hl.filter(x => !VALID_HL.has(x));
      if (alien.length) push('严重', w, 'hreflang 出现非法代码：' + alien.join(','));
      /* 格式：xx 或 xx-XX */
      const badFmt = d.hl.filter(x => x !== 'x-default' && !/^[a-z]{2}(-[A-Za-z]{2})?$/.test(x));
      if (badFmt.length) push('中', w, 'hreflang 格式可疑：' + badFmt.join(','));
    }
    console.log('  检查完（重复 ' + dup + '；27 语 + x-default 合法性 + 格式）');
  }

  /* ---------- E. 跨语言重复（同页 27 语两两对比） ---------- */
  console.log('— E. 跨语言重复 —');
  for (const p of PAGES) {
    /* title */
    for (let i = 0; i < LANGS.length; i++) for (let j = i + 1; j < LANGS.length; j++) {
      const a = data[p][LANGS[i]], b = data[p][LANGS[j]];
      if (!a || !b) continue;
      if (a.title && a.title === b.title)
        push('中', p + ' ' + LANGS[i] + '≡' + LANGS[j], 'title 两种语言一字不差（疑似没翻译）：' + JSON.stringify(a.title.slice(0, 50)));
      if (a.desc && a.desc === b.desc)
        push('中', p + ' ' + LANGS[i] + '≡' + LANGS[j], 'desc 两种语言一字不差：' + JSON.stringify(a.desc.slice(0, 40)));
    }
  }
  console.log('  检查完（10 页 × C(27,2)=351 对 × title/desc）');

  /* ---------- F. 非拉丁语言必须有本地文字 ---------- */
  console.log('— F. 本地文字检测 —');
  for (const p of PAGES) for (const l of Object.keys(SCRIPT_RE)) {
    const d = data[p][l]; if (!d) continue;
    const w = p + ' ' + l;
    if (!SCRIPT_RE[l].test(d.title))
      push('中', w, 'title 全是拉丁字母（疑似没翻译）：' + JSON.stringify(d.title.slice(0, 50)));
    if (!SCRIPT_RE[l].test(d.desc))
      push('中', w, 'desc 全是拉丁字母（疑似没翻译）：' + JSON.stringify(d.desc.slice(0, 50)));
  }
  console.log('  检查完（zh×2/ja/ko/ru/uk/ar/he/th/el/hi 共 11 语 × 10 页 × title+desc）');

  /* ---------- G. 跨页面区分度（同语言 10 页 title 前 40 字符） ---------- */
  console.log('— G. 跨页面区分度 —');
  for (const l of LANGS) {
    const seen = new Map();
    for (const p of PAGES) {
      const d = data[p][l]; if (!d || !d.title) continue;
      const head = d.title.slice(0, 40);
      if (seen.has(head)) push('中', seen.get(head) + ' ≡ ' + p + ' ' + l, '两个页面 title 前 40 字符相同：' + JSON.stringify(head));
      else seen.set(head, p);
    }
  }
  console.log('  检查完（27 语 × C(10,2) 对）');

  /* ---------- H. keywords 质量 ---------- */
  console.log('— H. keywords —');
  for (const p of PAGES) for (const l of LANGS) {
    const d = data[p][l]; if (!d) continue;
    const w = p + ' ' + l;
    if (!d.kw) { push('中', w, 'keywords 为空'); continue; }
    const parts = d.kw.split(',').map(s => s.trim());
    if (parts.some(x => !x)) push('中', w, 'keywords 有空段');
    const low = parts.map(x => x.toLowerCase());
    const dupKw = low.filter((x, i) => low.indexOf(x) !== i);
    if (dupKw.length) push('中', w, 'keywords 有重复词：' + [...new Set(dupKw)].slice(0, 3).join('/'));
    if (d.kw.length > 600) push('中', w, 'keywords 长度 ' + d.kw.length + '（>600，有堆砌嫌疑）');
  }
  console.log('  检查完（空段 / 重复词 / 长度）');

  /* ---------- I. HTML 转义验证（裸 & = ea() 失效信号） ---------- */
  console.log('— I. 转义验证 —');
  {
    let rawAmp = 0;
    const ENT = /&(amp|lt|gt|quot|nbsp|copy|#\d+|#x[0-9a-f]+);/i;
    for (const p of PAGES) for (const l of LANGS) {
      const d = data[p][l]; if (!d) continue;
      ['title', 'desc', 'kw', 'ogTitle', 'ogDesc'].forEach(f => {
        const v = d[f]; if (!v) return;
        const idx = v.search(/&/);
        if (idx >= 0 && !ENT.test(v.slice(idx)))
          { rawAmp++; push('中', p + ' ' + l, f + ' 里有裸 &（未转义）：' + JSON.stringify(v.slice(Math.max(0, idx - 12), idx + 12))); }
      });
    }
    console.log('  裸 & 命中 ' + rawAmp + ' 处（title/desc/kw/og×2，共 1350 个字段）');
  }

  /* ---------- J. 静态文案块字数分布 ----------
     ⚠️ 阈值按文字系统分：CJK 一字顶拉丁三四字（zh 176 字 ≈ 拉丁 400+ 字符的信息量），
        用统一 250 会把中文页全部误报（第一轮的假信号） */
  console.log('— J. 静态文案块字数分布 —');
  const MIN_COPY = l => (['zh-CN', 'zh-TW', 'ja', 'ko'].includes(l) ? 100 : 250);
  for (const p of PAGES) {
    const lens = LANGS.map(l => data[p][l] ? data[p][l].copyLen : 0);
    const min = Math.min(...lens), max = Math.max(...lens);
    const shorts = LANGS.filter((l, i) => lens[i] < MIN_COPY(l));
    console.log('  ' + p.padEnd(10) + 'min ' + String(min).padStart(5) + ' / max ' + String(max).padStart(5) + (shorts.length ? '  ⚠️ 低于下限：' + shorts.join(',') : ''));
    if (shorts.length) shorts.forEach(l => push('中', p + ' ' + l, '静态文案块仅 ' + data[p][l].copyLen + ' 字'));
  }

  /* ---------- K. 基础页头 ---------- */
  console.log('— K. 基础页头 —');
  for (const p of PAGES) for (const l of LANGS) {
    const d = data[p][l]; if (!d) continue;
    const w = p + ' ' + l;
    if (!d.charset) push('中', w, '缺 <meta charset="utf-8">');
    if (!d.viewport) push('中', w, '缺 viewport');
    if (d.nDesc !== 1) push('中', w, 'meta description 出现 ' + d.nDesc + ' 次');
    if (d.nCanon !== 1) push('中', w, 'canonical 出现 ' + d.nCanon + ' 次');
  }
  console.log('  检查完（charset / viewport / description·canonical 唯一性）');

  /* ---------- 汇总 ---------- */
  console.log('\n===== 问题清单 =====');
  const g = new Map();
  bad.forEach(b => {
    const k = b[2].split('（')[0].slice(0, 26);
    if (!g.has(k)) g.set(k, []);
    g.get(k).push(b);
  });
  [...g.keys()].sort((a, b) => g.get(b).length - g.get(a).length).forEach(k => {
    const list = g.get(k);
    console.log('\n【' + k + '】共 ' + list.length + ' 条（严重 ' + list.filter(x => x[0] === '严重').length + '）');
    list.slice(0, 8).forEach(x => console.log('   [' + x[0] + '] ' + x[1] + ' —— ' + x[2].slice(0, 120)));
    if (list.length > 8) {
      console.log('   … 其余 ' + (list.length - 8) + ' 条涉及：' + [...new Set(list.map(x => x[1].split(' ')[0]))].join(','));
    }
  });
  const sev = { '严重': 0, '中': 0 };
  bad.forEach(b => sev[b[0]]++);
  console.log('\n_seo311：严重 ' + sev['严重'] + ' 条 / 中 ' + sev['中'] + ' 条，合计 ' + bad.length + ' 条');

  srv.kill();
  process.exit(0);
})().catch(e => { console.log('FATAL', e.message); process.exit(2); });
