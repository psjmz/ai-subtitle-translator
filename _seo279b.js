/* v0.9.279：压缩四张 SEO 表里超长的 title / desc，写回 server.js。
   ⚠️ 只改超标字段，达标的一字不动；引号风格（单/双）原样保留。 */
const fs = require('fs');
const { chat, parseJsonArr } = require('./_tr279.js');

const WIDE = /[ᄀ-ᇿ㄰-㆏぀-ヿ㐀-䶿一-鿿가-힯豈-﫿︰-﹏＀-｠]/;
function width(s) { return [...String(s)].reduce((a, c) => a + (WIDE.test(c) ? 2 : 1), 0); }

const sv = fs.readFileSync('server.js', 'utf8');

function langRanges(name) {
  const i = sv.indexOf('const ' + name + ' = {');
  if (i < 0) return [];
  const close = sv.indexOf('\n};', i);
  const head = sv.slice(i, close < 0 ? i + 400000 : close + 3);
  const re = /\n[ \t]*'([a-zA-Z\-]{2,10})':\s*\{/g;
  const hits = [];
  let m;
  while ((m = re.exec(head))) hits.push({ lang: m[1], at: i + m.index, bodyAt: i + m.index + m[0].length });
  return hits.map((h, k) => ({ lang: h.lang, start: h.at, bodyStart: h.bodyAt, end: (k + 1 < hits.length ? hits[k + 1].at : i + head.length) }));
}
/* 返回 {value, from, to, quote}（from/to 相对 seg） */
function fieldAt(seg, name) {
  const re = new RegExp("(?:^|[,\\s])(" + name + ":\\s*)(['\"])((?:[^'\"\\\\]|\\\\.)*?)\\2");
  const m = re.exec(seg);
  if (!m) return null;
  return { value: m[3], quote: m[2], from: m.index + m[1].length, to: m.index + m[1].length + m[2].length + m[3].length + m[2].length, nameAt: m.index };
}

const todo = JSON.parse(fs.readFileSync('_seo279-todo.json', 'utf8'));

async function shrink(j) {
  const want = [];
  if (j.overT) want.push(['title', j.title, 'visual width <= 60 (CJK counts as 2)']);
  if (j.overD) want.push(['desc', j.desc, 'length <= 150 characters']);
  const sys = 'You are an SEO copy editor. Shorten the given ' + j.lang + ' meta title/description '
    + 'WITHOUT changing the language, the brand name, or the primary keywords. '
    + 'Keep the single most important selling point; drop redundant phrasing and filler. '
    + 'Never invent new facts. Return ONLY a JSON array of {"f":"<field>","v":"<rewritten string>"}, no markdown fence.';
  const usr = JSON.stringify(want.map(w => ({ f: w[0], v: w[1], target: w[2] })), null, 0);
  let arr = parseJsonArr(await chat([{ role: 'system', content: sys }, { role: 'user', content: usr }], 3000));
  if (!arr) arr = parseJsonArr(await chat([{ role: 'system', content: sys }, { role: 'user', content: usr }], 3000));
  if (!arr) return null;
  const o = {};
  arr.forEach(x => { if (x && x.f && typeof x.v === 'string') o[x.f] = x.v; });
  return o;
}

(async () => {
  /* 先定位每条在原文件里的精确位置 */
  const byTable = {};
  todo.forEach(j => { (byTable[j.table] = byTable[j.table] || []).push(j); });
  const loc = [];
  Object.keys(byTable).forEach(t => {
    const rs = langRanges(t);
    byTable[t].forEach(j => {
      const r = rs.find(x => x.lang === j.lang);
      if (!r) { console.log('  ✗ 定位失败 ' + t + '/' + j.lang); return; }
      const seg = sv.slice(r.bodyStart, r.end);
      const ft = fieldAt(seg, 'title'), fd = fieldAt(seg, 'desc');
      loc.push({ j, base: r.bodyStart, ft, fd });
    });
  });

  const edits = [];
  for (const L of loc) {
    const j = L.j;
    let nt = j.title, nd = j.desc;
    const got = await shrink(j);
    if (got) {
      if (j.overT && got.title) { const c = got.title; if (width(c) <= 60 && width(c) < width(j.title)) nt = c; }
      if (j.overD && got.desc) { const c = got.desc; if (c.length <= 155 && c.length < j.desc.length) nd = c; }
    }
    /* 兜底：仍超标就硬截（desc 按句/词边界切，title 直接压到宽度内） */
    if (j.overD && nd.length > 155) {
      let c = nd.slice(0, 152);
      const sp = Math.max(c.lastIndexOf(' '), c.lastIndexOf('，'), c.lastIndexOf('、'));
      if (sp > 100) c = c.slice(0, sp);
      nd = c.replace(/[\s，、；,;]+$/, '') + '…';
    }
    if (j.overT && width(nt) > 60) {
      let s = [...nt], w = 0, k = 0;
      while (k < s.length && w + (WIDE.test(s[k]) ? 2 : 1) <= 57) { w += WIDE.test(s[k]) ? 2 : 1; k++; }
      nt = s.slice(0, k).join('').replace(/[\s\-—–|,，、]+$/, '');
    }
    if (nt !== j.title || nd !== j.desc) edits.push({ L, nt, nd });
    process.stdout.write('  ' + j.table + '/' + j.lang + ' t' + width(nt) + ' d' + nd.length + '\r');
  }
  console.log('\n需要改写的字段：' + edits.length + ' 条');

  /* 回写：从后往前替换，避免偏移错位 */
  let out = sv;
  edits.sort((a, b) => (b.L.base + (b.L.fd ? b.L.fd.from : 0)) - (a.L.base + (a.L.fd ? a.L.fd.from : 0)));
  edits.forEach(e => {
    const put = (f, nv) => {
      if (!f || nv == null) return;
      const a = e.L.base + f.from, b = e.L.base + f.to;
      /* 只换引号里的内容，引号本身保留 */
      out = out.slice(0, a) + f.quote + nv.replace(new RegExp(f.quote, 'g'), '\\' + f.quote).replace(/\n/g, '\\n') + f.quote + out.slice(b);
    };
    if (e.nt !== e.L.j.title) put(e.L.ft, e.nt);
    if (e.nd !== e.L.j.desc) put(e.L.fd, e.nd);
  });
  fs.writeFileSync('server.js', out);
  console.log('已写回 server.js');
  fs.writeFileSync('_seo279-done.json', JSON.stringify(edits.map(e => ({
    t: e.L.j.table, l: e.L.j.lang,
    oT: e.L.j.title, nT: e.nt, oD: e.L.j.desc, nD: e.nd,
  })), null, 1));
})();
