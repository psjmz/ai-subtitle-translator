# -*- coding: utf-8 -*-
"""v0.9.279：① 版号 278 → 279（只改真版号形态，功能出处注释一律不动）
                ② 在尾部追加 279 的回归断言块"""
import re, io, os

# ---------- ① 版号 ----------
BUMP = [
    ('index.html',      [('<span class="ver">v0.9.278</span>', '<span class="ver">v0.9.279</span>'),
                         ('site-i18n.js?v=0.9.278', 'site-i18n.js?v=0.9.279')]),
    ('translate.html',  [('<span class="ver-tag">v0.9.278</span>', '<span class="ver-tag">v0.9.279</span>'),
                         ('site-i18n.js?v=0.9.278', 'site-i18n.js?v=0.9.279'),
                         ('srt-core.js?v=0.9.278', 'srt-core.js?v=0.9.279')]),
    ('merge.html',      [('<span class="ver">v0.9.278</span>', '<span class="ver">v0.9.279</span>'),
                         ('merge-core.js?v=0.9.278', 'merge-core.js?v=0.9.279')]),
    ('clean.html',      [('clean-core.js?v=0.9.278', 'clean-core.js?v=0.9.279')]),
    ('test-core.js',    [('0\\.9\\.278', '0\\.9\\.279'),
                         ('site-i18n.js?v=0.9.278', 'site-i18n.js?v=0.9.278'.replace('278', '279'))]),
    ('test-clean.js',   [('0\\.9\\.278', '0\\.9\\.279'),
                         ('clean-core\\.js\\?v=0\\.9\\.278', 'clean-core\\.js\\?v=0\\.9\\.279')]),
]
for f, pairs in BUMP:
    s = open(f, encoding='utf-8').read()
    tot = 0
    for a, b in pairs:
        n = s.count(a)
        s = s.replace(a, b)
        tot += n
        print('  %-16s %-42s x%d' % (f, a[:42], n))
    open(f, 'w', encoding='utf-8').write(s)

# ---------- ② 追加 279 断言块 ----------
BLOCK = r"""
  t('v0.9.279：特效页 / 清洗页补齐真 27 语（下拉不再骗人）', () => {
    const rd = f => require('fs').readFileSync(require('path').join(__dirname, f), 'utf8');
    const mg = rd('merge.html'), cln = rd('clean.html'), sv = rd('server.js');
    const ws = rd('translate.html'), home = HOME_SRC;
    /* 体检发现的头号问题：两页下拉都列 27 项，词典却只有 4 / 2 块，
       选西语、俄语…界面纹丝不动，同时给爬虫产出 46 条「西语标题 + 英文正文」的重复页面。
       ⚠️ 判据必须是「语言块数 == 下拉项数」，逐个 key 判不够 —— 缺的是整块。 */
    const LANGS = ['zh-CN','zh-TW','en','ja','es','pt','ko','de','fr','id','hi','th','vi',
                   'ru','it','ar','tr','nl','pl','sv','cs','uk','da','fi','el','he','ro'];
    const blockN = (src) => {
      const i = src.indexOf('const I18N = {');
      if (i < 0) return 0;
      const close = src.indexOf('\n};', i);
      const seg = src.slice(i, close < 0 ? i + 800000 : close);
      return (seg.match(/\n[ \t]*'[a-zA-Z\-]{2,10}':\s*\{/g) || []).length;
    };
    const mN = blockN(mg), cN = blockN(cln);
    assert.strictEqual(mN, 27, 'merge.html 词典语言块应为 27，实际 ' + mN);
    assert.strictEqual(cN, 27, 'clean.html 词典语言块应为 27，实际 ' + cN);

    /* 块数对了还不够：每块必须把 zh-CN 的全部词条都翻出来，漏一条就露原文 */
    const keysOf = (src, lang) => {
      const i = src.indexOf('const I18N = {');
      const re = new RegExp("\\n[ \\t]*'" + lang + "':\\s*\\{");
      const m = re.exec(src.slice(i));
      if (!m) return [];
      const start = i + m.index + m[0].length;
      let d = 1, p = start, st = null;
      while (d > 0 && p < src.length) {
        const c = src[p];
        if (st === c) { st = null; p++; continue; }
        if (st) { if (c === '\\') p += 2; else p++; continue; }
        if (c === "'" || c === '"' || c === '`') st = c;
        else if (c === '{') d++; else if (c === '}') d--;
        p++;
      }
      const body = src.slice(start, p - 1);
      const out = []; const re2 = /(?:^|[\s,{])([A-Za-z_$][\w$]*)\s*:/g; let mm;
      while ((mm = re2.exec(body))) out.push(mm[1]);
      return out;
    };
    [['merge.html', mg], ['clean.html', cln]].forEach(function (pr) {
      const base = keysOf(pr[1], 'zh-CN');
      assert.ok(base.length > 50, pr[0] + ' zh-CN 词条太少（解析失败？）' + base.length);
      LANGS.forEach(function (l) {
        const ks = keysOf(pr[1], l);
        assert.strictEqual(ks.length, base.length,
          pr[0] + ' 的 ' + l + ' 只有 ' + ks.length + ' 条，zh-CN 有 ' + base.length + ' 条');
      });
    });

    /* 拉丁语系里不该残留汉字（残留 = 那条其实没翻） */
    ['es','pt','de','fr','ru','it','tr','nl','pl','ro'].forEach(function (l) {
      const m = new RegExp("\\n[ \\t]*'" + l + "':\\s*\\{").exec(mg.slice(mg.indexOf('const I18N = {')));
      assert.ok(m, 'merge.html 缺 ' + l + ' 块');
      const seg = mg.slice(m.index, m.index + 30000);
      const han = (seg.match(/[一-鿿]/g) || []).length;
      assert.ok(han < 30, 'merge.html 的 ' + l + ' 块里残留 ' + han + ' 个汉字（有词条没翻）');
    });
  });

  t('v0.9.279：SEO 文案压进 Google 展示宽度（title ≤ 60 宽 / desc ≤ 155 字符）', () => {
    const sv = require('fs').readFileSync(require('path').join(__dirname, 'server.js'), 'utf8');
    /* 超长部分会被截成「…」，等于白写；而且 description 太长会稀释关键词密度。 */
    const WIDE = /[ᄀ-ᇿ㄰-㆏぀-ヿ㐀-䶿一-鿿가-힯]/;
    const width = (s) => [...String(s)].reduce((a, c) => a + (WIDE.test(c) ? 2 : 1), 0);
    ['SEO', 'SEO_MERGE', 'SEO_CLEAN', 'SEO_TRANSLATE'].forEach(function (name) {
      const i = sv.indexOf('const ' + name + ' = {');
      assert.ok(i > 0, 'server.js 缺 ' + name + ' 表');
      const close = sv.indexOf('\n};', i);
      const seg = sv.slice(i, close < 0 ? i + 400000 : close);
      let n = 0;
      const re = /title:\s*(['"])((?:[^'"\\]|\\.)*?)\1/g; let m;
      while ((m = re.exec(seg))) {
        n++;
        assert.ok(width(m[2]) <= 60, name + ' 第 ' + n + ' 条 title 超宽（' + width(m[2]) + '）：' + m[2].slice(0, 40));
      }
      assert.ok(n >= 27, name + ' 只解析到 ' + n + ' 条 title');
      const re2 = /desc:\s*(['"])((?:[^'"\\]|\\.)*?)\1/g; let k = 0;
      while ((m = re2.exec(seg))) {
        k++;
        assert.ok(m[2].length <= 155, name + ' 第 ' + k + ' 条 desc 超长（' + m[2].length + ' 字符）');
      }
      assert.ok(k >= 27, name + ' 只解析到 ' + k + ' 条 desc');
    });
  });

  t('v0.9.279：四页各有且只有 1 个 h1（工作台用视觉隐藏的方式补）', () => {
    const rd = f => require('fs').readFileSync(require('path').join(__dirname, f), 'utf8');
    const home = HOME_SRC, ws = rd('translate.html'), mg = rd('merge.html'), cln = rd('clean.html');
    /* 工作台没有 hero 区，硬塞一行标题会破坏三栏布局 —— 用 .sr-only 补，
       爬虫和读屏能拿到，视觉不变。 */
    [['index.html', home], ['translate.html', ws], ['merge.html', mg], ['clean.html', cln]].forEach(function (pr) {
      const c = (pr[1].match(/<h1[\s>]/g) || []).length;
      assert.strictEqual(c, 1, pr[0] + ' 有 ' + c + ' 个 h1（应为 1）');
    });
    /* 工作台那个必须是视觉隐藏的，不能真显示出来 */
    assert.ok(/<h1 class="sr-only"[^>]*>/.test(ws), '工作台的 h1 没有 sr-only（会破坏顶栏布局）');
    assert.ok(/\.sr-only\{[^}]*clip:rect\(0,0,0,0\)/.test(ws), 'sr-only 样式缺失（h1 会露出来）');
  });
"""

p = 'test-core.js'
s = open(p, encoding='utf-8').read()
assert s.rstrip('\n').endswith('  });\n}'), '尾部结构变了，锚点失效'
head = s.rstrip('\n')[:-len('  });\n}')]
open(p, 'w', encoding='utf-8').write(head + BLOCK + '\n  });\n}\n')
print('\n已追加 279 断言块')
