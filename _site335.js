/* v0.9.335 全站**新维度**体检（HTML 质量 / 可访问性 / 元信息）
 *
 * ⚠️ 与前几份的关系：_site329（A~G）、_site332/334（H~M）查的是
 *    sitemap / 多语言 / SEO 长度 / JSON-LD / 死链。
 *    本脚本查的是它们**从没碰过**的六项：
 *      N  重复 id：同一页内 id 重名会让 label[for]、锚点、脚本取错元素
 *      O  图片 alt：<img> 缺 alt 或 alt 为空，屏幕阅读器读不出内容
 *      P  可访问名称：<a> / <button> 既无文字又无 aria-label / title = 盲点
 *      Q  head 元信息：canonical / og:* / twitter:card 是否齐全且自指
 *      R  hreflang：须含 x-default，且必须有一条指向本页自身
 *      S  标题层级：不得跳级（h1 之后直接 h3）
 *    另写一份，不动任何老脚本；数据源仍是服务端真实输出。
 *
 * 用法：node _site335.js （端口 3395；**串行，不得与其他脚本并发**）
 */
'use strict';
process.on('unhandledRejection', () => { });
const { spawn } = require('child_process');
const http = require('http');

const ROOT = __dirname;
const SRV = Number(process.env.SRV || 3395);
const LANGS = ['zh-CN', 'zh-TW', 'en', 'ja', 'es', 'pt', 'ko', 'de', 'fr', 'id', 'hi', 'th', 'vi',
  'ru', 'it', 'ar', 'tr', 'nl', 'pl', 'sv', 'cs', 'uk', 'da', 'fi', 'el', 'he', 'ro'];
const out = [];
const push = (sev, where, what) => out.push([sev, where, what]);
const esc = (s) => String(s).replace(/&amp;/g, '&').replace(/&#(\d+);/g, (m, d) => String.fromCharCode(+d));

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
const all = (h, re) => (h.match(re) || []).map(x => x);

/* 去掉标签后的文字长度，用于判断「有没有可见文字」 */
const textOf = (h) => h.replace(/<[^>]+>/g, '').replace(/&[a-z]+;/g, ' ').replace(/\s+/g, ' ').trim();

(async () => {
  const srv = spawn(process.execPath, ['server.js'], { cwd: ROOT, env: Object.assign({}, process.env, { PORT: String(SRV) }), stdio: 'ignore' });
  for (let i = 0; i < 40; i++) { try { await get('/robots.txt'); break; } catch (e) { await new Promise(r => setTimeout(r, 500)); } }
  console.log('— 服务 :' + SRV + '（335：HTML 质量 / 可访问性 / 元信息）—\n');

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

  const R = new Array(entries.length);
  await pool(entries, 16, async (e, i) => {
    const p = new URL(e.loc).pathname;
    let r; try { r = await get(p); } catch (err) { R[i] = { code: 0 }; return; }
    const b = r.body || '';
    const head = b.slice(0, (b.indexOf('</head>') + 7) || b.length);
    /* 正文：剥注释 / script / style，再剥带 data-i18n 与 data-keep-han 的元素 */
    const body = b.replace(/<!--[\s\S]*?-->/g, ' ')
      .replace(/<script[\s\S]*?<\/script>/g, ' ')
      .replace(/<style[\s\S]*?<\/style>/g, ' ')
      .replace(/<([a-zA-Z][a-zA-Z0-9]*)\b[^>]*\bdata-i18n\b[^>]*>[\s\S]*?<\/\1>/g, ' ')
      .replace(/<([a-zA-Z][a-zA-Z0-9]*)\b[^>]*\bdata-keep-han\b[^>]*>[\s\S]*?<\/\1>/g, ' ');

    /* ⚠️ 可访问性检查用 bodyLight（只剥 script/style/注释，不剥 data-i18n）：
       我们要判断的是「元素结构上有没有文字节点」。带 data-i18n 的 span 里
       的中文是占位值，运行时会被本语言文案替换 —— 占位存在即证明结构完整。
       若把 data-i18n 元素剥掉再判，整站会误报成 1100+ 处「无名称控件」。 */
    const bodyLight = b.replace(/<!--[\s\S]*?-->/g, ' ')
      .replace(/<script[\s\S]*?<\/script>/g, ' ')
      .replace(/<style[\s\S]*?<\/style>/g, ' ');

    /* N 重复 id
       ⚠️ 必须从 bodyLight 取（已剥掉 <script>）：页面 JS 注释里常夹着代码示例，
          不剥 script 会把注释里的示例算成真元素，误报「重复 id」。 */
    const ids = all(bodyLight, /\sid="([^"]+)"/g).map(x => x.slice(5, -1));
    const idCount = new Map();
    ids.forEach(v => idCount.set(v, (idCount.get(v) || 0) + 1));
    const dupIds = [...idCount.entries()].filter(([, c]) => c > 1).map(([v, c]) => v + '×' + c);

    /* O 图片 alt */
    const imgs = all(bodyLight, /<img\b[^>]*>/g);
    const imgNoAlt = imgs.filter(t => !/\balt\s*=/.test(t));
    const imgEmptyAlt = imgs.filter(t => /\balt\s*=\s*(""|'')/.test(t));

    /* P a / button 可访问名称
       ⚠️ 两条豁免 —— 都是「文字由运行时注入，静态 HTML 本来就是空的」，
          此前因此误报过 81 处。用自动判据识别，不维护手写清单：
          a) 内部有带 data-i18n / data-i18n-html 的子元素 → 文案由 i18n 机制注入；
          b) 页面脚本里有对该 id 的 textContent / innerText / innerHTML 赋值
             → 如 #biFlip（双语顺序翻转按钮）、#keyLink（申请 Key 链接）。 */
    const scriptSrc = (b.match(/<script[\s\S]*?<\/script>/g) || []).join('\n');
    const filledByJs = (id) => {
      if (!id) return false;
      const q = id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const pats = [
        /* ⚠️ # 必须可选：本页的 $ 是 getElementById 的包装（const $ = id => ...），
           调用既有 $('#biFlip') 也有 $('keyLink') 两种写法 */
        "\\$\\(\\s*['\"]#?" + q + "['\"]\\s*\\)[\\s\\S]{0,240}?\\.(textContent|innerText|innerHTML)\\s*=",
        "getElementById\\(\\s*['\"]" + q + "['\"]\\s*\\)[\\s\\S]{0,240}?\\.(textContent|innerText|innerHTML)\\s*="
      ];
      return pats.some(p => new RegExp(p).test(scriptSrc));
    };
    const inter = all(bodyLight, /<a\b[^>]*>[\s\S]*?<\/a>/g).concat(all(bodyLight, /<button\b[^>]*>[\s\S]*?<\/button>/g));
    const noName = inter.filter(t => {
      if (/\baria-label\s*=\s*("[^"]+"|'[^']+')/.test(t)) return false;
      if (/\baria-labelledby\s*=/.test(t)) return false;
      if (/\btitle\s*=\s*("[^"]+"|'[^']+')/.test(t)) return false;
      /* 豁免 a：内部有 i18n 子元素（可能是空占位，运行时才填） */
      if (/\bdata-i18n(-html)?\s*=/.test(t.replace(/^<[a-zA-Z]+[^>]*>/, ''))) return false;
      /* 豁免 b：脚本里有对该 id 的文本赋值 */
      const idm = (t.match(/^<[a-zA-Z]+[^>]*\sid="([^"]*)"/) || [])[1] || '';
      if (filledByJs(idm)) return false;
      return textOf(t).length === 0;
    }).map(t => {
      const tag = (t.match(/^<([a-zA-Z]+)/) || [])[1] || '?';
      const idm = (t.match(/^<[a-zA-Z]+[^>]*\sid="([^"]*)"/) || [])[1] || '';
      const clsm = (t.match(/^<[a-zA-Z]+[^>]*\sclass="([^"]*)"/) || [])[1] || '';
      return '<' + tag + (idm ? ' id=' + idm : '') + (clsm ? ' class=' + clsm : '') + '>';
    });

    /* Q head 元信息 */
    const meta = {
      canonical: (head.match(/<link[^>]*rel="canonical"[^>]*href="([^"]*)"/) || [])[1] || '',
      ogTitle: (head.match(/<meta[^>]*property="og:title"[^>]*content="([^"]*)"/) || [])[1] || '',
      ogDesc: (head.match(/<meta[^>]*property="og:description"[^>]*content="([^"]*)"/) || [])[1] || '',
      ogImage: (head.match(/<meta[^>]*property="og:image"[^>]*content="([^"]*)"/) || [])[1] || '',
      ogUrl: (head.match(/<meta[^>]*property="og:url"[^>]*content="([^"]*)"/) || [])[1] || '',
      ogType: (head.match(/<meta[^>]*property="og:type"[^>]*content="([^"]*)"/) || [])[1] || '',
      twCard: (head.match(/<meta[^>]*name="twitter:card"[^>]*content="([^"]*)"/) || [])[1] || '',
      viewport: /<meta[^>]*name="viewport"/.test(head),
      favicon: /rel="(shortcut )?icon"/.test(head)
    };

    /* R hreflang */
    const altTags = all(b, /<link[^>]*rel="alternate"[^>]*>/g);
    const hreflangs = altTags.map(t => (t.match(/hreflang="([^"]+)"/) || [])[1] || '').filter(Boolean);
    const hrefs = altTags.map(t => (t.match(/href="([^"]+)"/) || [])[1] || '');
    const hasXDefault = hreflangs.indexOf('x-default') >= 0;
    const selfRef = hrefs.indexOf(e.loc) >= 0;

    /* S 标题层级 */
    const hs = all(body, /<h([1-6])\b[^>]*>/g).map(t => +((t.match(/<h([1-6])/) || [])[1] || 0));
    let jump = -1;
    for (let k = 1; k < hs.length; k++) { if (hs[k] > hs[k - 1] + 1) { jump = hs[k - 1] + '→h' + hs[k]; break; } }

    /* T label[for] 指向的 id 是否存在 */
    const idSet = new Set(ids);
    const forArr = all(b, /<label\b[^>]*\sfor="([^"]*)"/g).map(x => (x.match(/for="([^"]*)"/) || [])[1] || '');
    const forBad = forArr.filter(v => v && !idSet.has(v));

    /* U 重复的 name（同表单内 name 重名会让提交丢字段）
       ⚠️ 自动豁免单选/多选组：HTML 规范里，一组 radio 或 checkbox 本来就该同名，
          同名恰恰是正确写法（本站 workMode×3 / alignMode×3 / biOrder×2 / assLayout×2
          都是这么来的）。所以判据不是「name 出现 >1 次」，而是：
            同名的元素里，只要有任何一个不是 radio/checkbox，才算真重名。
          这样不用维护豁免清单，以后加单选组也不会再报。 */
    const nameEls = all(b, /<[a-zA-Z]+\b[^>]*\sname="[^"]+"[^>]*>/g);
    const nKinds = new Map();
    nameEls.forEach(t => {
      const nm = (t.match(/\sname="([^"]+)"/) || [])[1] || '';
      if (!nm) return;
      const tag = (t.match(/^<([a-zA-Z]+)/) || [])[1] || '';
      const type = ((t.match(/\stype="([^"]+)"/) || [])[1] || '').toLowerCase();
      const kind = (tag === 'input' && (type === 'radio' || type === 'checkbox')) ? 'group' : tag;
      if (!nKinds.has(nm)) nKinds.set(nm, new Map());
      const m = nKinds.get(nm);
      m.set(kind, (m.get(kind) || 0) + 1);
    });
    const dupNames = [...nKinds.entries()]
      .filter(([, m]) => {
        /* ① 出现次数 ≤1 根本不算重复（<meta name="viewport"> 这类只有一个） */
        const total = [...m.values()].reduce((a, c) => a + c, 0);
        if (total < 2) return false;
        /* ② 全是 radio/checkbox 的同名 → 合法的单选/多选组，不是 bug */
        return !(m.size === 1 && m.has('group'));
      })
      .map(([v, m]) => v + '(' + [...m.entries()].map(([k, c]) => k + '×' + c).join('+') + ')');

    /* W 空链接 / 占位 href */
    const aHrefs = all(b, /<a\b[^>]*\shref="([^"]*)"/g).map(x => (x.match(/href="([^"]*)"/) || [])[1] || '');
    const emptyHref = aHrefs.filter(v => v === '' || v === '#' || v === 'javascript:void(0)');

    /* X target=_blank 缺 rel=noopener（安全 + 性能） */
    const blanks = all(b, /<a\b[^>]*>/g).filter(t => /target="_blank"/.test(t));
    const blankNoRel = blanks.filter(t => !/rel="[^"]*noopener/.test(t)).length;

    R[i] = {
      code: r.code, loc: e.loc, path: p, dupIds, imgTotal: imgs.length, imgNoAlt, imgEmptyAlt,
      noName, meta, hreflangs: hreflangs.length, hasXDefault, selfRef, headSeq: hs.join(','), jump,
      forTotal: forArr.length, forBad, dupNames, aTotal: aHrefs.length, emptyHref, blankTotal: blanks.length, blankNoRel
    };
  });

  const live = R.filter(r => r && r.code === 200);
  const bad = R.filter(r => !r || r.code !== 200);
  console.log('取到 200 的页面：' + live.length + ' / ' + entries.length + '\n');

  /* ---------- N 重复 id ---------- */
  console.log('— N. 重复 id —');
  const nDup = live.filter(r => r.dupIds.length);
  console.log('  有重复 id 的页面：' + nDup.length + ' 条');
  nDup.slice(0, 10).forEach(r => console.log('    ' + r.path + '  →  ' + r.dupIds.slice(0, 6).join(', ')));
  if (nDup.length) push('ERR', 'HTML 质量', nDup.length + ' 个页面存在重复 id');

  /* ---------- O 图片 alt ---------- */
  console.log('\n— O. 图片 alt —');
  const totImg = live.reduce((a, r) => a + r.imgTotal, 0);
  const noAlt = live.filter(r => r.imgNoAlt.length);
  const emptyAlt = live.filter(r => r.imgEmptyAlt.length);
  console.log('  <img> 总数：' + totImg);
  console.log('  缺 alt 属性：' + noAlt.length + ' 页 / ' + live.reduce((a, r) => a + r.imgNoAlt.length, 0) + ' 处');
  noAlt.slice(0, 10).forEach(r => console.log('    ' + r.path + '  →  ' + r.imgNoAlt.slice(0, 3).join(' | ').slice(0, 120)));
  console.log('  alt 为空串（装饰图可豁免，但要知道有多少）：' + emptyAlt.length + ' 页 / '
    + live.reduce((a, r) => a + r.imgEmptyAlt.length, 0) + ' 处');
  if (noAlt.length) push('ERR', '可访问性', noAlt.length + ' 个页面的 <img> 缺 alt');

  /* ---------- P 可访问名称 ---------- */
  console.log('\n— P. a / button 可访问名称 —');
  const pBad = live.filter(r => r.noName.length);
  console.log('  无名链接/按钮：' + pBad.length + ' 页 / ' + live.reduce((a, r) => a + r.noName.length, 0) + ' 处');
  /* 按「标签+id+class」归并：同一个控件模板在 27 语里会重复 27 次，看的是有几种 */
  const pKeys = {};
  const pWhere = {};
  pBad.forEach(r => r.noName.forEach(k => {
    pKeys[k] = (pKeys[k] || 0) + 1;
    if (!pWhere[k]) pWhere[k] = r.path;
  }));
  Object.keys(pKeys).sort((a, b) => pKeys[b] - pKeys[a]).slice(0, 15)
    .forEach(k => console.log('    ' + String(pKeys[k]).padStart(3) + ' 页  ' + k + '   例：' + pWhere[k]));
  if (pBad.length) push('ERR', '可访问性', pBad.length + ' 个页面存在无名称的 a/button');

  /* ---------- Q head 元信息 ---------- */
  console.log('\n— Q. head 元信息 —');
  const qFields = ['canonical', 'ogTitle', 'ogDesc', 'ogImage', 'ogUrl', 'ogType', 'twCard'];
  const qMiss = {};
  qFields.forEach(f => {
    const n = live.filter(r => !r.meta[f]).length;
    qMiss[f] = n;
    console.log('  ' + f.padEnd(10) + ' 缺失 ' + n + ' 页');
  });
  const qNoViewport = live.filter(r => !r.meta.viewport).length;
  const qNoFavicon = live.filter(r => !r.meta.favicon).length;
  console.log('  viewport  缺失 ' + qNoViewport + ' 页');
  console.log('  favicon   缺失 ' + qNoFavicon + ' 页');
  /* canonical / og:url 必须自指 */
  const qSelf = live.filter(r => r.meta.canonical && r.meta.canonical !== r.loc).length;
  const qOgSelf = live.filter(r => r.meta.ogUrl && r.meta.ogUrl !== r.loc).length;
  console.log('  canonical 不自指：' + qSelf + ' 页 | og:url 不自指：' + qOgSelf + ' 页');
  qFields.forEach(f => { if (qMiss[f]) push('ERR', '元信息', f + ' 缺失 ' + qMiss[f] + ' 页'); });
  if (qNoViewport) push('ERR', '元信息', 'viewport 缺失 ' + qNoViewport + ' 页');
  if (qSelf) push('ERR', '元信息', 'canonical 不自指 ' + qSelf + ' 页');
  if (qOgSelf) push('ERR', '元信息', 'og:url 不自指 ' + qOgSelf + ' 页');

  /* ---------- R hreflang ---------- */
  console.log('\n— R. hreflang —');
  const rNoX = live.filter(r => !r.hasXDefault).length;
  const rNoSelf = live.filter(r => !r.selfRef).length;
  const cntSet = [...new Set(live.map(r => r.hreflangs))];
  console.log('  每页 hreflang 条数分布：' + cntSet.join(', ') + '（期望 28 = 27 语 + x-default）');
  console.log('  缺 x-default：' + rNoX + ' 页 | 缺自指：' + rNoSelf + ' 页');
  if (rNoX) push('ERR', 'hreflang', rNoX + ' 页缺 x-default');
  if (rNoSelf) push('ERR', 'hreflang', rNoSelf + ' 页缺自指');

  /* ---------- S 标题层级 ---------- */
  console.log('\n— S. 标题层级 —');
  const sJump = live.filter(r => r.jump !== -1);
  console.log('  层级跳跃（如 h1 后直接 h3）：' + sJump.length + ' 页');
  sJump.slice(0, 10).forEach(r => console.log('    ' + r.path + '  →  ' + r.jump + '  [' + r.headSeq + ']'));
  if (sJump.length) push('WARN', 'HTML 质量', sJump.length + ' 页标题层级跳级');

  /* ---------- T label for 关联 ---------- */
  console.log('\n— T. label[for] 指向的 id 是否存在 —');
  const tBad = live.filter(r => r.forBad.length);
  const totFor = live.reduce((a, r) => a + r.forTotal, 0);
  console.log('  <label for> 总数：' + totFor + ' | 指向不存在 id 的页面：' + tBad.length);
  tBad.slice(0, 10).forEach(r => console.log('    ' + r.path + '  →  ' + r.forBad.slice(0, 6).join(', ')));
  if (tBad.length) push('ERR', 'HTML 质量', tBad.length + ' 个页面的 label[for] 指向不存在的 id');

  /* ---------- U 重复 name ---------- */
  console.log('\n— U. 重复 name 属性 —');
  const uBad = live.filter(r => r.dupNames.length);
  console.log('  有重复 name 的页面：' + uBad.length + ' 条');
  uBad.slice(0, 10).forEach(r => console.log('    ' + r.path + '  →  ' + r.dupNames.slice(0, 6).join(', ')));
  /* 只在真的重名且非同名单选组时提示 */
  if (uBad.length) push('WARN', 'HTML 质量', uBad.length + ' 个页面存在重复 name（需人工判断是否同名单选组）');

  /* ---------- W 空链接 ----------
     ⚠️ 已知占位：/translate.html 等 27 个语言版各 1 处，都是 #keyLink 的 href="#"。
        该链接初始 display:none，providerAuxUI() 里会 kl.href = p.keyUrl 赋真实地址
        再显示（translate.html 7530 行）。所以是占位不是死链，本段只输出不告警。 */
  console.log('\n— W. 空链接 / 占位 href —');
  const wBad = live.filter(r => r.emptyHref.length);
  console.log('  含 href="" / href="#" / javascript:void(0) 的页面：' + wBad.length + ' 条（共 '
    + live.reduce((a, r) => a + r.emptyHref.length, 0) + ' 处）');
  wBad.slice(0, 8).forEach(r => console.log('    ' + r.path + '  →  ' + r.emptyHref.length + ' 处'));

  /* ---------- X target=_blank 缺 noopener ---------- */
  console.log('\n— X. target=_blank 缺 rel=noopener —');
  const xBad = live.filter(r => r.blankNoRel > 0);
  console.log('  存在该情况的页面：' + xBad.length + ' 条，共 ' + live.reduce((a, r) => a + r.blankNoRel, 0) + ' 处');
  xBad.slice(0, 10).forEach(r => console.log('    ' + r.path + '  →  ' + r.blankNoRel + ' 处'));
  if (xBad.length) push('WARN', '安全', xBad.length + ' 个页面存在 target=_blank 但缺 rel=noopener');

  srv.kill();

  console.log('\n==== 335 新维度体检汇总 ====');
  if (!out.length) { console.log('全部通过，0 问题'); process.exit(0); }
  out.forEach(([s, w, t]) => console.log('[' + s + '] ' + w + '：' + t));
  const errs = out.filter(o => o[0] === 'ERR').length;
  console.log('\nERR ' + errs + ' / WARN ' + (out.length - errs));
  process.exit(errs ? 1 : 0);
})().catch(e => { console.error('FATAL', e); process.exit(1); });
