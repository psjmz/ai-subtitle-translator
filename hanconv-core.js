/* hanconv-core.js —— 简繁转换引擎（v0.9.313）
   只服务 hanconv.html，与 srt-core.js / videosub-core.js 等完全分开（新功能复制另写一份）。

   三条硬规矩：
   ① 词库在 hanconv-data.js（window.HanConvData），本文件只有逻辑，方便单独升词库；
   ② 「只换正文」—— 序号、时间码、ASS 的十个字段与 {样式}、VTT 的 NOTE/STYLE 块一律不动；
   ③ 转换用 OpenCC 的口径：**一张表里长词优先**（最长匹配），多张表按链顺序依次过。

   词库来自 OpenCC / opencc-data（Apache-2.0），见 hanconv-data.js 头注释。 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.HanConvCore = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  /* ---------------------------------------------------------------
     一、词库与模式
     --------------------------------------------------------------- */

  var DATA = null;          // setData() 灌进来
  var CACHE = {};           // 模式 → 建好的转换链（懒建，建一次）

  /* 每个模式 = 一串「词组表组」，每组里的表合成一张（长词优先），组与组之间按顺序依次过一遍。
     顺序照抄 OpenCC 官方 preset 的 conversionChain（cn2t / t2cn 那套）：
     ① 先过一遍 CJK 兼容表（OpenCC 叫 normalizationChain，把 U+F9xx 那批兼容汉字归一）；
     ② 简→繁是「地区词组表 + 逐字表」合成一组；繁→简是「地区词组反表 + 通用繁简表」两组。

     ⚠️ 唯一没照抄的是**分词保护（segmentation）**：官方在 s2tw/s2twp/s2hk/tw2s/hk2s 上
     还拿整份 STPhrases 当分词表先把句子切开再逐段转换，要复刻就得把 1MB 的词组表整个带上。
     实测 4400 行中文语料（整站中英文案 + 真实字幕台词）里只有 2 行与官方不同，
     且都是官方被分词切开导致漏转（「屏幕后面」官方 屏幕後面 / 本引擎 螢幕後面）——
     少转不如多转，字幕场景下宁可要后者，所以这里不套分词。 */
  var NORM = 'CJK_Compatibility_Ideographs';
  var CHAINS = {
    s2t: [['STPhrases', 'STPhrases_GeneratedFromRegionalPhrases', 'STCharacters']],
    s2tw: [['STPhrases', 'STPhrases_GeneratedFromRegionalPhrases', 'STCharacters'], ['TWVariantsPhrases', 'TWVariants']],
    s2twp: [['STPhrases', 'STPhrases_GeneratedFromRegionalPhrases', 'STCharacters'], ['TWPhrases'], ['TWVariantsPhrases', 'TWVariants']],
    s2hk: [['STPhrases', 'STPhrases_GeneratedFromRegionalPhrases', 'STCharacters'], ['HKVariantsPhrases', 'HKVariants']],
    t2s: [['TSPhrases', 'TSCharacters']],
    tw2s: [['TWPhrasesRev', 'TWVariantsRevPhrases', 'TWVariantsRev'], ['TSPhrases', 'TSCharacters']],
    hk2s: [['HKVariantsRevPhrases', 'HKVariantsRev'], ['TSPhrases', 'TSCharacters']],
    t2tw: [['TWVariantsPhrases', 'TWVariants']],
    t2hk: [['HKVariantsPhrases', 'HKVariants']]
  };
  /* 界面上的排列顺序（i18n 里对应 m_<id> 一组词条）：简→繁 / 繁→简 / 繁→繁（换地区字形） */
  var MODES = ['s2t', 's2twp', 's2tw', 's2hk', 't2s', 'tw2s', 'hk2s', 't2tw', 't2hk'];

  function setData(d) { DATA = d || null; CACHE = {}; }

  /** "源 目标|源2 目标2" → Map */
  function parseTable(str) {
    var m = new Map(), i = 0, parts = String(str || '').split('|');
    for (; i < parts.length; i++) {
      var line = parts[i];
      if (!line) continue;
      var p = line.indexOf(' ');
      if (p <= 0) continue;
      m.set(line.slice(0, p), line.slice(p + 1));
    }
    return m;
  }

  /** 一组表合成一张：长词优先靠「匹配时从长到短试」实现，不靠插入顺序。
      ⚠️ 同 key 撞车时**靠前的表赢** —— OpenCC 的 loadDictGroup 是倒着灌的，
      所以 [STPhrases, STCharacters] 里 STPhrases 说了算；这里倒序遍历复刻同一口径。 */
  function mergeGroup(names) {
    var m = new Map(), max = 1;
    for (var i = names.length - 1; i >= 0; i--) {
      var t = DATA && DATA[names[i]];
      if (!t) continue;
      parseTable(t).forEach(function (v, k) {
        m.set(k, v);
        if (k.length > max) max = k.length;
      });
    }
    return { map: m, max: max };
  }

  /** 单张表过一遍：从最长往下试，命中就整段替换（OpenCC 的 Trie 也是这个口径） */
  function applyOne(g, s) {
    var out = '', i = 0, n = s.length;
    while (i < n) {
      var hit = null, len = 0, top = Math.min(g.max, n - i);
      for (var L = top; L >= 1; L--) {
        var v = g.map.get(s.substr(i, L));
        if (v !== undefined) { hit = v; len = L; break; }
      }
      if (hit === null) { out += s[i]; i++; }
      else { out += hit; i += len; }
    }
    return out;
  }

  function build(mode) {
    if (CACHE[mode]) return CACHE[mode];
    var chain = CHAINS[mode];
    if (!chain) throw new Error('没有这个转换方向：' + mode);
    if (!DATA) throw new Error('词库还没加载（HanConvData 为空）');
    var gs = [];
    for (var i = 0; i < chain.length; i++) gs.push(mergeGroup(chain[i]));
    CACHE[mode] = { gs: gs, norm: DATA[NORM] ? mergeGroup([NORM]) : null };
    return CACHE[mode];
  }

  /** 纯文本转换 */
  function convert(text, mode) {
    var b = build(mode), s = String(text == null ? '' : text);
    if (b.norm) s = applyOne(b.norm, s);
    for (var i = 0; i < b.gs.length; i++) s = applyOne(b.gs[i], s);
    return s;
  }

  /* ---------------------------------------------------------------
     二、只换正文：按格式认出「哪几行是台词」
     --------------------------------------------------------------- */

  /* SRT 用逗号毫秒、VTT 用点号毫秒、VTT 允许省略小时位 */
  var RE_TIME = /^\s*(?:\d{1,3}:)?\d{1,2}:\d{2}[,.]\d{1,3}\s*-->\s*(?:\d{1,3}:)?\d{1,2}:\d{2}[,.]\d{1,3}/;
  var RE_TAG = /(\{[^}]*\})/g;

  function splitLines(text) {
    var s = String(text == null ? '' : text);
    var eol = s.indexOf('\r\n') >= 0 ? '\r\n' : '\n';
    return { lines: s.split(/\r\n|\r|\n/), eol: eol };
  }
  function joinLines(lines, eol) { return lines.join(eol); }

  /** 时间行之后、空行之前的都算台词；序号行与时间行原样保留 */
  function convByTimeLine(lines, cv, skipBlock) {
    var out = lines.slice(), i = 0, changed = 0;
    while (i < lines.length) {
      if (skipBlock && skipBlock(lines[i])) {           // VTT 的 NOTE / STYLE / REGION 整块跳过
        var k = i;
        while (k < lines.length && lines[k].trim() !== '') k++;
        i = k;
        continue;
      }
      if (RE_TIME.test(lines[i])) {
        var j = i + 1;
        while (j < lines.length && lines[j].trim() !== '') {
          var nv = cv(lines[j]);
          if (nv !== lines[j]) changed++;
          out[j] = nv;
          j++;
        }
        i = j;
      } else i++;
    }
    return { out: out, changed: changed };
  }

  /** ASS：只动 Dialogue/Comment 的最后一个字段（Text），且 {} 里的样式指令不动 */
  function convAss(lines, cv) {
    var out = lines.slice(), changed = 0, textAt = -1;
    for (var i = 0; i < lines.length; i++) {
      var ln = lines[i];
      /* [Events] 段里的 Format: 行写明字段顺序，按它找 Text 是几号字段（对不上就按 9 个逗号的老写法） */
      var mf = /^\s*Format\s*:\s*(.+)$/i.exec(ln);
      if (mf) {
        var names = mf[1].split(',').map(function (x) { return x.trim().toLowerCase(); });
        textAt = names.indexOf('text');
        continue;
      }
      var md = /^\s*(Dialogue|Comment)\s*:/i.exec(ln);
      if (!md) continue;
      var head = md[0], rest = ln.slice(head.length);
      var at = -1, c = 0;
      for (var p = 0; p < rest.length; p++) {
        if (rest.charAt(p) === ',') { c++; if (c === (textAt >= 0 ? textAt : 9)) { at = p; break; } }
      }
      if (at < 0) continue;                       // 字段数不对 → 整行不动，宁可漏转也别转坏
      var pre = rest.slice(0, at + 1), body = rest.slice(at + 1);
      /* 样式指令 {…} 里可能有中文字体名，转了就渲染不出来 —— 只转偶数段（正文） */
      var parts = body.split(RE_TAG), touched = false;
      for (var q = 0; q < parts.length; q += 2) {
        var nv = cv(parts[q]);
        if (nv !== parts[q]) touched = true;
        parts[q] = nv;
      }
      if (!touched) continue;
      changed++;
      out[i] = head + pre + parts.join('');
    }
    return { out: out, changed: changed };
  }

  function convTxt(lines, cv) {
    var out = lines.slice(), changed = 0;
    for (var i = 0; i < lines.length; i++) {
      var nv = cv(lines[i]);
      if (nv !== lines[i]) changed++;
      out[i] = nv;
    }
    return { out: out, changed: changed };
  }

  /** 认格式：先看扩展名，再看内容特征 */
  function detectFmt(text, fname) {
    var s = String(text || '');
    var n = String(fname || '').toLowerCase();
    if (/\.(srt)$/.test(n)) return 'srt';
    if (/\.(vtt)$/.test(n)) return 'vtt';
    if (/\.(ass|ssa)$/.test(n)) return 'ass';
    if (/\.(txt)$/.test(n)) return 'txt';
    if (/^WEBVTT/m.test(s.slice(0, 4096))) return 'vtt';
    if (/^\s*(Dialogue|Comment)\s*:/m.test(s)) return 'ass';
    if (RE_TIME.test(s)) return 'srt';
    return 'txt';
  }

  /** 整份文件转换：只换台词正文，其余字节原样带回 */
  function convertFile(text, mode, fmt) {
    var f = fmt || detectFmt(text, '');
    var sp = splitLines(text), cv = function (s) { return convert(s, mode); };
    var r;
    if (f === 'ass') r = convAss(sp.lines, cv);
    else if (f === 'vtt') {
      r = convByTimeLine(sp.lines, cv, function (ln) { return /^\s*(NOTE|STYLE|REGION)\b/i.test(ln); });
    } else if (f === 'srt') r = convByTimeLine(sp.lines, cv, null);
    else r = convTxt(sp.lines, cv);
    return { text: joinLines(r.out, sp.eol), fmt: f, changed: r.changed, lines: sp.lines.length };
  }

  /* ---------------------------------------------------------------
     三、导出名
     --------------------------------------------------------------- */

  /** out.srt → out.zh-TW.srt（把方向写进文件名，避免覆盖原稿） */
  function outName(fname, mode) {
    var tag = { s2t: 'zh-Hant', s2tw: 'zh-TW', s2twp: 'zh-TW', s2hk: 'zh-HK', t2s: 'zh-Hans', tw2s: 'zh-Hans', hk2s: 'zh-Hans' }[mode] || 'zh';
    var n = String(fname || 'subtitle');
    var i = n.lastIndexOf('.');
    if (i > 0) return n.slice(0, i) + '.' + tag + n.slice(i);
    return n + '.' + tag;
  }

  return {
    MODES: MODES, CHAINS: CHAINS, FORMATS: ['srt', 'vtt', 'ass', 'txt'],
    setData: setData, parseTable: parseTable, build: build,
    convert: convert, convertFile: convertFile, detectFmt: detectFmt, outName: outName,
    /* 下划线开头的是给单测直量的内部件 */
    _applyOne: applyOne, _mergeGroup: mergeGroup, _convAss: convAss, _splitLines: splitLines, _RE_TIME: RE_TIME
  };
});
