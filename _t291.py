# -*- coding: utf-8 -*-
"""v0.9.291：把第七页（时间轴调整）的断言插进 test-core.js
   ⚠️ 新段落必须插在尾部汇总行之前 —— 否则 process.exit 先跑，预演假全 OK"""
import io

F = 'test-core.js'
s = io.open(F, encoding='utf-8').read()

NEW = r"""
  /* ==========================================================================
     v0.9.291：第七个页面 —— 字幕时间轴调整（/shift.html）
     同样是三件套硬隔离（shift.html + shift-core.js + shift-i18n.js）。
     这里钉死三件事：三种调整方式算得对、负时间不静默、新页没碰任何老文件。
     ========================================================================== */
  let SH = null;
  try {
    const vm = require('vm');
    const sandbox = { window: {}, console: console };
    sandbox.global = sandbox;
    vm.createContext(sandbox);
    vm.runInContext(readT('shift-core.js'), sandbox, { filename: 'shift-core.js' });
    SH = sandbox.window.ShiftCore;
  } catch (e) { SH = null; }

  const SH_SRT = '1\n00:00:01,000 --> 00:00:03,200\nHello\n\n'
    + '2\n00:00:05,000 --> 00:00:07,000\nWorld\n';

  t('v0.9.291：时间轴引擎能独立加载，三种调整方式都在', () => {
    assert.ok(SH, 'shift-core.js 加载失败');
    assert.deepStrictEqual(HOST(SH.MODES.map(m => m.id)), ['shift', 'rate', 'two'], '三种调整方式变了');
    assert.strictEqual(SH.FORMATS.length, 6, '输出格式数量变了，SEO 文案要跟着改');
    assert.strictEqual(SH.READABLE.length, 7, '读入格式数量变了');
  });

  t('v0.9.291：整体平移只改位置，每条时长一毫秒都不动', () => {
    const g = SH.parse(SH_SRT, 'srt');
    assert.strictEqual(g.length, 2, '样例没解析出 2 条');
    const r = SH.apply(g, 'shift', { ms: 2000 });
    assert.strictEqual(r.ok, true, '平移被当成非法参数');
    assert.strictEqual(r.clamped, 0, '不该有条目被截断');
    assert.deepStrictEqual(HOST(r.cues.map(c => c.start)), [3000, 7000], '平移后起点不对');
    assert.deepStrictEqual(HOST(r.cues.map(c => c.end)), [5200, 9000], '平移后终点不对');
    /* 时长必须逐条相等 —— 平移的定义就是「不动时长」 */
    assert.deepStrictEqual(HOST(r.cues.map((c, i) => c.end - c.start)),
      HOST(g.map(c => c.end - c.start)), '平移把某条字幕的时长改了');
    assert.deepStrictEqual(HOST(r.cues.map(c => c.text)), ['Hello', 'World'], '平移不该动字幕内容');
  });

  t('v0.9.291：提前过头的时间截断到 0，并如实报出条数', () => {
    const g = SH.parse(SH_SRT, 'srt');
    const r = SH.apply(g, 'shift', { ms: -6000 });
    assert.deepStrictEqual(HOST(r.cues.map(c => c.start)), [0, 0], '负数时间没被压到 0');
    assert.strictEqual(r.clamped, 2, '截断条数不对（页面要拿这个数提示用户）');
    /* 压到 0 之后，end 不能跑到 start 前面去 */
    r.cues.forEach(c => { assert.ok(c.end > c.start, '截断后出现了 end 不晚于 start 的条目'); });
    /* 只压掉一部分时，另一部分照常平移 */
    const half = SH.apply(g, 'shift', { ms: -2000 });
    assert.deepStrictEqual(HOST(half.cues.map(c => c.start)), [0, 3000], '部分截断的结果不对');
    assert.strictEqual(half.clamped, 1, '只该报 1 条被截断');
  });

  t('v0.9.291：倍率缩放把时长同步缩放（24/25 帧互转那条路）', () => {
    const g = SH.parse(SH_SRT, 'srt');
    const r = SH.apply(g, 'rate', { rate: 1.5 });
    assert.deepStrictEqual(HOST(r.cues.map(c => c.start)), [1500, 7500], '缩放后起点不对');
    assert.deepStrictEqual(HOST(r.cues.map(c => c.end)), [4800, 10500], '缩放后终点不对');
    assert.deepStrictEqual(HOST(r.cues.map((c, i) => c.end - c.start)), [3300, 3000],
      '缩放后时长没跟着变（2200/2000 × 1.5 = 3300/3000）');
    /* 缩小到 0 以下的时间同样要压住 */
    const back = SH.apply(g, 'rate', { rate: -1 });
    assert.strictEqual(back.ok, false, '负倍率必须被当成非法参数，不能倒着算');
  });

  t('v0.9.291：两点校正让首末条正好落在目标时间上', () => {
    const g = SH.parse(SH_SRT, 'srt');
    const opt = { fromStart: 1000, fromEnd: 7000, toStart: 2000, toEnd: 9000 };
    const r = SH.apply(g, 'two', opt);
    assert.strictEqual(r.cues[0].start, 2000, '首条没对上目标时间');
    assert.strictEqual(r.cues[r.cues.length - 1].end, 9000, '末条没对上目标时间');
    assert.strictEqual(r.clamped, 0, '两点校正不该有截断');
    /* 中间按比例：k = (9000-2000)/(7000-1000) = 7/6 */
    assert.strictEqual(r.cues[0].end, 2000 + Math.round(2200 * 7 / 6), '中间条目的映射不对');
    /* 当前两点重合时退化成平移，不许除出 NaN / Infinity */
    const flat = SH.apply(g, 'two', { fromStart: 1000, fromEnd: 1000, toStart: 3000, toEnd: 3000 });
    assert.ok(flat.cues.every(c => isFinite(c.start) && isFinite(c.end)), '两点重合算出 NaN 了');
    assert.strictEqual(flat.cues[0].start, 3000, '两点重合时应退化为整体平移');
  });

  t('v0.9.291：参数填错不许跑出一份错字幕', () => {
    const g = SH.parse(SH_SRT, 'srt');
    assert.strictEqual(SH.valid('shift', { ms: NaN }), false, '空偏移被当成合法');
    assert.strictEqual(SH.valid('rate', { rate: 0 }), false, '倍率 0 被当成合法');
    assert.strictEqual(SH.valid('rate', { rate: -1 }), false, '负倍率被当成合法');
    assert.strictEqual(SH.valid('two', { fromStart: 0, fromEnd: 0, toStart: 0, toEnd: null }), false,
      '两点校正缺一个时间还被当成合法');
    /* valid 说不行，apply 就必须拒绝（页面靠这两个一起拦） */
    assert.strictEqual(SH.apply(g, 'rate', { rate: 0 }).ok, false, '非法参数还是跑出了结果');
  });

  t('v0.9.291：时间输入框认三种写法', () => {
    assert.strictEqual(SH.parseUserTime('1:02:03,400'), 3723400, '「时:分:秒,毫」读错');
    assert.strictEqual(SH.parseUserTime('02:03.4'), 123400, '「分:秒.厘」读错');
    assert.strictEqual(SH.parseUserTime('90'), 90000, '纯秒数读错');
    assert.strictEqual(SH.parseUserTime('00:00:00,000'), 0, '全零读错');
    assert.strictEqual(SH.parseUserTime('这不是时间'), null, '乱填的内容应该判为无效');
    assert.strictEqual(SH.parseUserTime(''), null, '空值应该判为无效');
  });

  t('v0.9.291：时间轴页三件套硬隔离，没碰任何共用模块', () => {
    const sh = readT('shift.html'), sc = readT('shift-core.js'), si = readT('shift-i18n.js');
    /* 不引共用导航 / 共用词典 / 另外两页的引擎 */
    ['site-nav.js', 'site-i18n.js', 'convert-core.js', 'convert-i18n.js',
     'bilingual-core.js', 'bilingual-i18n.js', 'srt-core.js'].forEach(f => {
      assert.ok(!new RegExp('(src|require\\()[\\s\\S]{0,40}' + f.replace('.', '\\.')).test(sh),
        'shift.html 引了共用模块 ' + f);
    });
    assert.ok(/shift-core\.js/.test(sh) && /shift-i18n\.js/.test(sh), 'shift.html 没引自己的三件套');
    assert.ok(/SHIFT_I18N/.test(sh) && /ShiftCore/.test(sh), 'shift.html 没用自己的全局出口');
    /* 引擎与词典独立成篇，不依赖别人 */
    assert.ok(!/ConvertCore|BilingualCore|require\(/.test(sc), 'shift-core.js 依赖了别的引擎');
    assert.ok(/ShiftCore/.test(sc), 'shift-core.js 没导出 ShiftCore');
    assert.ok(/SHIFT_I18N/.test(si) && !/CONVERT_I18N|BILINGUAL_I18N/.test(si), 'shift-i18n.js 的出口不对');
    /* 老页面不许出现指向新页的链接 —— 首页卡片与老页导航本轮都不动 */
    ['index.html', 'translate.html', 'merge.html', 'clean.html', 'convert.html', 'bilingual.html'].forEach(f => {
      assert.ok(!/shift\.html/.test(readT(f)), f + ' 里出现了 /shift.html（本轮不该动老页）');
    });
  });

  t('v0.9.291：时间轴页词典 27 语齐全且不混汉字', () => {
    const vmS = require('vm');
    const sb = { window: {}, console: console }; sb.global = sb; vmS.createContext(sb);
    vmS.runInContext(readT('shift-i18n.js'), sb, { filename: 'shift-i18n.js' });
    const I = sb.window.SHIFT_I18N;
    assert.strictEqual(I.LANGS.length, 27, '语言数不是 27');
    const keys = Object.keys(I.DICT['zh-CN']);
    const bad = [];
    I.LANGS.forEach(([code]) => {
      const d = I.DICT[code];
      if (!d) { bad.push(code + ':缺整块'); return; }
      keys.forEach(k => {
        const v = d[k];
        if (v === undefined) { bad.push(code + ':' + k + ':缺'); return; }
        /* ⚠️ 中日韩三版本来就该是汉字，别一起判（290 踩过） */
        if (/^(zh|ja|ko)/.test(code)) return;
        if (/[一-鿿]/.test(v)) bad.push(code + ':' + k + ':混汉字');
      });
    });
    assert.deepStrictEqual(bad, [], '词典问题：' + bad.join(' / '));
    /* 带占位符的词条，27 语都得留着 {0} */
    ['statCues', 'statRange', 'msgClamp'].forEach(k => {
      I.LANGS.forEach(([code]) => {
        assert.ok(String(I.DICT[code][k]).indexOf('{0}') >= 0, code + ' 的 ' + k + ' 丢了占位符');
      });
    });
  });

  t('v0.9.291：服务端为时间轴页接了 SEO、路由与 sitemap', () => {
    const sv = readT('server.js');
    const blk = (sv.match(/const SEO_SHIFT = \{[\s\S]*?\n\};/) || [''])[0];
    assert.ok(blk, 'server.js 里没有 SEO_SHIFT 表');
    const codes = (blk.match(/^\s{2}'[a-zA-Z-]+':\s*\{/gm) || []).length;
    assert.strictEqual(codes, 27, 'SEO_SHIFT 语言块数不是 27（实际 ' + codes + '）');
    ['title', 'desc', 'kw', 'intro', 'feat', 'who'].forEach(k => {
      const n = (blk.match(new RegExp('\\s' + k + ':', 'g')) || []).length;
      assert.strictEqual(n, 27, 'SEO_SHIFT 的 ' + k + ' 不是 27 条（实际 ' + n + '）');
    });
    assert.ok(/SHIFT_PATH\[l\] = /.test(sv), 'server 没建 SHIFT_PATH');
    assert.ok(/shift: \{ file: 'shift\.html', table: SEO_SHIFT, path: SHIFT_PATH/.test(sv),
      'SEO_PAGES 里没登记 shift 页');
    /* 路由正则：语言目录 + zh-CN 直连，两处都得带上 shift */
    assert.ok(/\/\(\[a-zA-Z\]\[a-zA-Z\\-\]\*\)\\\/\([^)]*bilingual[^)]*shift[^)]*\)\\\.html\$/.test(sv),
      '语言目录路由没带上 shift');
    assert.ok(/\^\\\/\(merge\|clean\|translate\|convert\|bilingual\|shift\)\\\.html\$/.test(sv),
      'zh-CN 直连路由没带上 shift');
    assert.ok(/七页 × 27 语言 = 189/.test(sv), 'sitemap 注释没改成七页 189 条');
  });

"""

old = "\n  });\n}\n"
assert s.count(old) >= 1, '尾部结构没找到'
s = s[:s.rindex(old)] + NEW + old
io.open(F, 'w', encoding='utf-8').write(s)
print('test-core.js 已插入 291 断言；新行数', s.count('\n'))
