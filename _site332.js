/* v0.9.332 全站多语言 / SEO / sitemap **增强**体检
   ⚠️ 与 _site329.js 的关系：另写一份，不改动老脚本、不共用文件。
   老脚本已覆盖 A~G：sitemap 结构 / 分组闭环 / 1620 条 HTTP / 本地化 / 索引页 / robots / 长度。
   本脚本补老脚本没查的项：
     H  JSON-LD 结构化数据：能 parse、类型非空、name/headline 非空、url 自指、
                            inLanguage 对得上页面语言、description 与 meta 同步
     I  title / desc 重复度：同语言跨页重复（撞车）+ 同页跨语言重复（漏译）
     J  h1：每页有且仅有 1 个、非空、不与 title 悬空
     K  正文漏译残留：非 zh-CN/zh-TW/ja/ko 的页面，正文里出现成片汉字 = 疑似未译
     L  站内链接：正文里的站内 href 去重后抽样请求，抓 404 死链
     M  URL 形态统一：scheme / host / 尾斜杠 / www 混用
   用法：node _site332.js （端口默认 3392；**不得与 _site329.js 或 test-core 并发跑**）
*/
'use strict';
process.on('unhandledRejection', () => { });
const { spawn } = require('child_process');
const http = require('http');

const ROOT = __dirname;
const SRV = Number(process.env.SRV || 3392);
const BASE = 'http://127.0.0.1:' + SRV;
const LANGS = ['zh-CN', 'zh-TW', 'en', 'ja', 'es', 'pt', 'ko', 'de', 'fr', 'id', 'hi', 'th', 'vi', 'ru', 'it', 'ar', 'tr', 'nl', 'pl', 'sv', 'cs', 'uk', 'da', 'fi', 'el', 'he', 'ro'];
const out = [];
const push = (sev, where, what) => out.push([sev, where, what]);
const esc = (s) => String(s).replace(/&amp;/g, '&').replace(/&#(\d+);/g, (m, d) => String.fromCharCode(+d));
const HAN = /[\u4e00-\u9fff]/g;

function get(urlPath) {
  return new Promise((res, rej) => {
    http.get({ host: '127.0.0.1', port: SRV, path: urlPath, headers: { 'Accept-Encoding': 'identity' } }, r => {
      let d = ''; r.setEncoding('utf8');
      r.on('data', c => d += c); r.on('end', () => res({ code: r.statusCode, body: d }));
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
const all = (h, re) => (h.match(re) || []).map(x => x);

(async () => {
  const srv = spawn(process.execPath, ['server.js'], { cwd: ROOT, env: Object.assign({}, process.env, { PORT: String(SRV), PUBLIC_URL: BASE }), stdio: 'ignore' });
  for (let i = 0; i < 40; i++) { try { await get('/robots.txt'); break; } catch (e) { await new Promise(r => setTimeout(r, 500)); } }
  console.log('— 服务 :' + SRV + '（增强体检，补 _site329.js 未覆盖项）—\n');

  /* sitemap 入口与语言映射 */
  const sm = (await get('/sitemap.xml')).body;
  const blocks = sm.split('<url>').slice(1).map(b => b.split('</url>')[0]);
  const entries = blocks.map(b => ({
    loc: (b.match(/<loc>([^<]+)<\/loc>/) || [])[1] || '',
    alts: (b.match(/<xhtml:link[^>]*>/g) || []).map(a => ({
      lang: (a.match(/hreflang="([^"]+)"/) || [])[1] || '',
      href: (a.match(/href="([^"]+)"/) || [])[1] || ''
    }))
  })).filter(e => e.loc);
  const langOfUrl = new Map();
  entries.forEach(e => e.alts.forEach(a => { if (a.lang !== 'x-default') langOfUrl.set(a.href, a.lang); }));
  console.log('sitemap 条目：' + entries.length + '\n');

  /* ---------- 全量取页（1620），顺带收集这些东西 ---------- */
  const R = new Array(entries.length);
  await pool(entries, 16, async (e, i) => {
    const p = new URL(e.loc).pathname;
    let r; try { r = await get(p); } catch (err) { R[i] = { code: 0 }; return; }
    const b = r.body || '';
    const strip = b.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<style[\s\S]*?<\/style>/g, ' ');
    /* ⚠️ K 段必须剔除带 data-i18n 的元素：那些中文是静态模板默认值，
       页面 JS 跑完会替换成本语言文案（真浏览器实测：渲染后英文首页汉字占比仅 1.3%）。
       不剔除会把整站 391 个页面误报成「漏译」。 */
    const strip2 = strip.replace(/<([a-zA-Z][a-zA-Z0-9]*)\b[^>]*\bdata-i18n\b[^>]*>[\s\S]*?<\/\1>/g, ' ');
    const h1s = all(strip, /<h1[^>]*>([\s\S]*?)<\/h1>/g).map(x => esc(x.replace(/<[^>]+>/g, '').trim()));
    const ldRaw = all(b, /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)
      .map(x => x.slice(x.indexOf('>') + 1).replace(/<\/script>\s*$/, ''));
    const lds = ldRaw.map(s => { try { return JSON.parse(s); } catch (err) { return { __bad: err.message }; } });
    const links = [...new Set(all(b, /href="(\/[^"#?]*)"/g).map(x => x.slice(6, -1)))]
      .filter(u => !/\.(css|js|png|webp|jpg|jpeg|svg|ico|woff2?|ttf|txt|xml|json)$/i.test(u));
    const text = strip2.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
    R[i] = {
      code: r.code, loc: e.loc,
      title: esc(one(b, /<title>([\s\S]*?)<\/title>/)),
      desc: esc(one(b, /<meta name="description" content="([^"]*)"/)),
      h1s, lds, links,
      han: (text.match(HAN) || []).length,
      chars: text.replace(/\s/g, '').length
    };
  });

  /* ---------- H JSON-LD ---------- */
  console.log('— H. JSON-LD 结构化数据 —');
  let hNo = 0, hBad = 0, hNoName = 0, hUrl = 0, hDesc = 0, hLang = 0, hNoType = 0;
  const hEx = {};
  entries.forEach((e, i) => {
    const r = R[i] || {};
    const l = langOfUrl.get(e.loc) || '?';
    if (r.code !== 200) return;
    if (!r.lds || !r.lds.length) { hNo++; hEx.no = hEx.no || e.loc; return; }
    r.lds.forEach(o => {
      if (o.__bad) { hBad++; hEx.bad = hEx.bad || (e.loc + ' → ' + o.__bad); return; }
      const list = Array.isArray(o) ? o : [o];
      list.forEach(x => {
        const t = String(x['@type'] || x.type || '?');
        if (!x['@type'] && !x.type) { hNoType++; hEx.noType = hEx.noType || e.loc; }
        /* BreadcrumbList / ItemList 用 itemListElement 表达内容，本来就没有 name/headline */
        const needsName = !/^(BreadcrumbList|ItemList)$/i.test(t);
        const nm = x.name || x.headline;
        if (needsName && (!nm || !String(nm).trim())) { hNoName++; hEx.noName = hEx.noName || (e.loc + ' [' + t + ']'); }
        if (x.url && String(x.url) !== e.loc) { hUrl++; hEx.url = hEx.url || (e.loc + ' → ' + x.url); }
        if (x.description && r.desc && String(x.description) !== r.desc) { hDesc++; hEx.desc = hEx.desc || (e.loc + ' [' + t + ']'); }
        /* inLanguage 允许是数组 —— 那是「站点支持的语言清单」，不是页面语言 */
        const il = x.inLanguage;
        if (il && !Array.isArray(il)) {
          const a = String(il).replace('_', '-').toLowerCase(), z = l.toLowerCase();
          if (a.indexOf(z) !== 0 && a.split(/[-_]/)[0] !== z.split('-')[0]) {
            hLang++; hEx.lang = hEx.lang || (e.loc + ' → ' + il);
          }
        }
      });
    });
  });
  const hRep = (n, label, ex) => { if (n) push('ERR', 'JSON-LD', label + ' ' + n + ' 处，例如 ' + ex); else console.log('  ' + label + '：0 ✓'); };
  hRep(hNo, '页面没有任何 JSON-LD', hEx.no);
  hRep(hBad, 'JSON-LD 无法解析', hEx.bad);
  hRep(hNoType, '缺少 @type', hEx.noType);
  hRep(hNoName, 'name/headline 为空（BreadcrumbList 豁免）', hEx.noName);
  hRep(hUrl, 'url 不自指', hEx.url);
  hRep(hLang, 'inLanguage 与页面语言不符（数组豁免）', hEx.lang);
  /* description：server.js 里 部分页面写了显式 jsonldDesc（结构化数据用更长的一版），
     属有意设计，不判错，但要列出来让人知道有多少、是哪些类型 */
  console.log('  JSON-LD description 与 meta 不同步：' + hDesc + ' 处（server.js 显式 jsonldDesc 属设计，不判错）');
  if (hDesc && hEx.desc) console.log('    例如 ' + hEx.desc);

  /* ---------- I title / desc 重复度 ---------- */
  console.log('\n— I. title / desc 重复度 —');
  const byLangT = {}, byLangD = {}, byGroupT = {}, byGroupD = {};
  const gKey = new Map();
  entries.forEach((e, i) => {
    const key = e.alts.map(a => a.href).sort().join('|');
    gKey.set(e.loc, key);
    const r = R[i] || {};
    if (r.code !== 200) return;
    const l = langOfUrl.get(e.loc) || '?';
    (byLangT[l] = byLangT[l] || []).push([r.title, e.loc]);
    (byLangD[l] = byLangD[l] || []).push([r.desc, e.loc]);
    (byGroupT[key] = byGroupT[key] || []).push([r.title, l]);
    (byGroupD[key] = byGroupD[key] || []).push([r.desc, l]);
  });
  const dupBy = (m) => {
    let n = 0; const ex = [];
    Object.keys(m).forEach(k => {
      const seen = new Map();
      m[k].forEach(([v, who]) => {
        if (!v) return;
        if (seen.has(v)) { n++; if (ex.length < 6) ex.push(k + '：' + seen.get(v) + ' = ' + who); }
        else seen.set(v, who);
      });
    });
    return [n, ex];
  };
  const [dT, exT] = dupBy(byLangT);
  const [dD, exD] = dupBy(byLangD);
  const [dGT, exGT] = dupBy(byGroupT);
  const [dGD, exGD] = dupBy(byGroupD);
  console.log('  同一语言内 title 撞车（不同页同标题）：' + dT + ' 条');
  exT.forEach(x => console.log('    [T] ' + x));
  console.log('  同一语言内 desc 撞车：' + dD + ' 条');
  exD.forEach(x => console.log('    [D] ' + x));
  console.log('  同一逻辑页内跨语言 title 相同（漏译）：' + dGT + ' 条');
  exGT.forEach(x => console.log('    [跨语T] ' + x));
  console.log('  同一逻辑页内跨语言 desc 相同（漏译）：' + dGD + ' 条');
  exGD.forEach(x => console.log('    [跨语D] ' + x));
  if (dT) push('ERR', 'SEO 重复', '同语言 title 撞车 ' + dT + ' 条');
  if (dD) push('ERR', 'SEO 重复', '同语言 desc 撞车 ' + dD + ' 条');
  if (dGT) push('WARN', 'i18n', '跨语言 title 相同 ' + dGT + ' 条');
  if (dGD) push('WARN', 'i18n', '跨语言 desc 相同 ' + dGD + ' 条');

  /* ---------- J h1 ---------- */
  console.log('\n— J. h1 —');
  let jNone = 0, jMulti = 0, jEmpty = 0, jSameAsTitle = 0;
  const jEx = {};
  entries.forEach((e, i) => {
    const r = R[i] || {};
    if (r.code !== 200) return;
    const hs = (r.h1s || []).filter(x => x);
    if (!hs.length) { jNone++; jEx.none = jEx.none || e.loc; return; }
    if (hs.length > 1) { jMulti++; jEx.multi = jEx.multi || (e.loc + ' → ' + hs.length + ' 个'); }
    const h = hs[0];
    if (!h.trim()) { jEmpty++; jEx.empty = jEx.empty || e.loc; }
    if (h === r.title) { jSameAsTitle++; jEx.same = jEx.same || e.loc; }
  });
  console.log('  没有 h1：' + jNone + ' 条' + (jEx.none ? '（例如 ' + jEx.none + '）' : ''));
  console.log('  h1 多于 1 个：' + jMulti + ' 条' + (jEx.multi ? '（例如 ' + jEx.multi + '）' : ''));
  console.log('  h1 为空：' + jEmpty + ' 条' + (jEx.empty ? '（例如 ' + jEx.empty + '）' : ''));
  console.log('  h1 与 title 完全相同：' + jSameAsTitle + ' 条（属可接受，仅提示）'
    + (jEx.same ? '，例如 ' + jEx.same : ''));
  if (jNone) push('ERR', 'SEO h1', jNone + ' 个页面没有 h1');
  if (jMulti) push('WARN', 'SEO h1', jMulti + ' 个页面 h1 不唯一');
  if (jEmpty) push('ERR', 'SEO h1', jEmpty + ' 个页面 h1 为空');

  /* ---------- K 正文漏译残留 ---------- */
  console.log('\n— K. 正文漏译残留（非 CJK 语种的页面里不应有成片汉字）—');
  const EXEMPT = ['zh-CN', 'zh-TW', 'ja', 'ko'];
  const kHits = [];
  entries.forEach((e, i) => {
    const r = R[i] || {};
    if (r.code !== 200) return;
    const l = langOfUrl.get(e.loc) || '?';
    if (EXEMPT.includes(l)) return;
    const ratio = r.chars ? r.han / r.chars : 0;
    /* 阈值：汉字 ≥ 20 个且占正文 ≥ 4% —— 少量专名不算，成片才算 */
    if (r.han >= 20 && ratio >= 0.04) kHits.push([l, e.loc, r.han, (ratio * 100).toFixed(1)]);
  });
  console.log('  疑似未译页面：' + kHits.length + ' 条');
  kHits.slice(0, 12).forEach(x => console.log('    ' + x[0] + '  ' + x[2] + ' 汉字 / ' + x[3] + '%  ' + x[1]));
  if (kHits.length) push('WARN', 'i18n', '正文疑似残留中文 ' + kHits.length + ' 条');

  /* ---------- L 站内链接 ---------- */
  console.log('\n— L. 站内链接（抓死链）—');
  const allLinks = new Set();
  entries.forEach((e, i) => { const r = R[i] || {}; (r.links || []).forEach(u => allLinks.add(u)); });
  const list = [...allLinks].sort();
  console.log('  去重后站内 href：' + list.length + ' 条，全部请求');
  const codes = new Array(list.length);
  await pool(list, 16, async (u, i) => { try { codes[i] = (await get(u)).code; } catch (err) { codes[i] = 0; } });
  const dead = list.filter((u, i) => codes[i] !== 200);
  const redirectish = list.filter((u, i) => codes[i] >= 300 && codes[i] < 400);
  console.log('  非 200：' + dead.length + ' 条（其中 3xx ' + redirectish.length + ' 条）');
  dead.slice(0, 15).forEach(u => console.log('    [' + codes[list.indexOf(u)] + '] ' + u));
  if (dead.length) push('ERR', '站内链接', dead.length + ' 条 href 打不开');

  /* ---------- M URL 形态统一 ---------- */
  console.log('\n— M. URL 形态 —');
  const paths = entries.map(e => new URL(e.loc).pathname);
  const badPath = paths.filter(p => !(/\.html$/.test(p)              /* 详情页 */
    || p === '/'                                                      /* 首页 */
    || /^\/[a-zA-Z]{2}(-[A-Z]{2})?\/$/.test(p)                        /* 语言首页 /en/ */
    || /^(\/[a-zA-Z]{2}(-[A-Z]{2})?)?\/guides\/$/.test(p)));          /* 指南索引页 /xx/guides/ */
  const hosts = [...new Set(entries.map(e => new URL(e.loc).host))];
  const isLocal = hosts.length === 1 && /127\.0\.0\.1|localhost/.test(hosts[0]);
  console.log('  host：' + hosts.join(', ') + (isLocal ? '（本地测试环境，scheme/host 不参与判定）' : ''));
  console.log('  path 形态异常：' + badPath.length + ' 条');
  badPath.slice(0, 8).forEach(p => console.log('    ' + p));
  if (hosts.length !== 1) push('ERR', 'URL 形态', 'host 不统一：' + hosts.join(', '));
  if (!isLocal && !entries.every(e => e.loc.startsWith('https://'))) push('ERR', 'URL 形态', '存在非 https 的 loc');
  if (badPath.length) push('ERR', 'URL 形态', badPath.length + ' 条 path 形态异常');

  srv.kill();

  /* ---------- 汇总 ---------- */
  console.log('\n==== 增强体检汇总 ====');
  if (!out.length) { console.log('全部通过，0 问题'); process.exit(0); }
  out.forEach(([s, w, t]) => console.log('[' + s + '] ' + w + '：' + t));
  const errs = out.filter(o => o[0] === 'ERR').length;
  console.log('\nERR ' + errs + ' / WARN ' + (out.length - errs));
  process.exit(errs ? 1 : 0);
})().catch(e => { console.error('FATAL', e); process.exit(1); });
