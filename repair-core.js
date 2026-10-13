/* repair-core.js —— 字幕乱码修复的引擎（v0.9.296，只服务 repair.html）
   ⚠️ 硬隔离：不引 srt-core / shift-core / site-i18n，本页自己一份。

   ────────── 乱码到底是怎么来的 ──────────
   字幕文件是一串字节。写字的人用 A 编码存，读的人用 B 编码解，就乱了。
   例：一个 UTF-8 的「你好」字节是 E4 BD A0 E5 A5 BD，
       被当成 GBK 读 → 浣犲ソ；被当成 Latin-1 读 → ä½ å¥½。
   修法就是「把读错的再倒回去」：用 B 编码把现在这串字还原成字节，再用 A 编码读一遍。

   ⚠️ 两条路必须分开走（这是本文件最重要的设计）：
     ① 上传文件 → 手里有**原始字节** → 直接挨个编码试解码，这条信息没丢，能修干净。
     ② 粘贴文本 → 浏览器已经把字节按 UTF-8 解过了，**字节没了**，只能做编码往返还原。
        而且如果粘贴的内容里已经出现 U+FFFD（�），原始字节被替换符吃掉，
        **任何办法都修不回来** —— 这时候必须直说，不能假装修好了。
 */
(function (root) {
  'use strict';

  var TE = (typeof TextEncoder !== 'undefined') ? new TextEncoder() : null;

  /* ---------------- 编码表：谁跟谁容易搞混 ---------------- */
  /* 只收真正会碰上的：简体中文 GBK、繁体 Big5、日文 Shift_JIS、韩文 EUC-KR，
     外加 Latin-1（老播放器最爱按它读）。别的地方用不着，多了只会让候选列表变噪音。 */
  var ENCS = [
    { id: 'utf-8', label: 'UTF-8' },
    { id: 'gbk', label: 'GBK', ranges: [[0x81, 0xFE, 0x40, 0xFE]] },
    { id: 'big5', label: 'Big5', ranges: [[0xA1, 0xF9, 0x40, 0x7E], [0xA1, 0xF9, 0xA1, 0xFE]] },
    { id: 'shift_jis', label: 'Shift_JIS', ranges: [[0x81, 0x9F, 0x40, 0x7E], [0x81, 0x9F, 0x80, 0xFC], [0xE0, 0xEF, 0x40, 0x7E], [0xE0, 0xEF, 0x80, 0xFC]] },
    { id: 'euc-kr', label: 'EUC-KR', ranges: [[0xA1, 0xFE, 0xA1, 0xFE]] },
    { id: 'latin1', label: 'Latin-1' }
  ];
  var ENC_IDS = ENCS.map(function (e) { return e.id; });

  /* ---------------- 反向表：字符 → 字节 ----------------
     浏览器只有 TextDecoder（字节→字），没有 legacy 的 TextEncoder（字→字节）。
     所以自己建一张反查表：把每种编码的双字节区间整个解一遍，记下「哪个字是哪两个字节」。
     ⚠️ 按「前导字节」成行批量解（一次解一行的所有尾字节），不是逐个字节解 ——
        逐个解 GBK 要调两万多次 TextDecoder，页面会卡住；成行只要一百多次。 */
  var TABLES = {};
  function table(enc) {
    if (TABLES[enc]) return TABLES[enc];
    var def = null, i;
    for (i = 0; i < ENCS.length; i++) if (ENCS[i].id === enc) def = ENCS[i];
    if (!def || !def.ranges) { TABLES[enc] = null; return null; }
    var dec = null;
    try { dec = new TextDecoder(enc); } catch (e) { TABLES[enc] = null; return null; }
    var map = Object.create(null), k;
    for (k = 0; k < 0x80; k++) map[k] = [k];                      /* ASCII 直通 */
    for (i = 0; i < def.ranges.length; i++) {
      var r = def.ranges[i], hi, lo;
      for (hi = r[0]; hi <= r[1]; hi++) {
        var trails = [];
        for (lo = r[2]; lo <= r[3]; lo++) { if (lo === 0x7F) continue; trails.push(lo); }
        var buf = new Uint8Array(trails.length * 2), j;
        for (j = 0; j < trails.length; j++) { buf[2 * j] = hi; buf[2 * j + 1] = trails[j]; }
        var s = dec.decode(buf);
        if (s.length === trails.length) {
          /* 一行里每个双字节都解成了一个字 → 位置对得上，直接按索引记 */
          for (j = 0; j < trails.length; j++) {
            var c = s.charCodeAt(j);
            if (c !== 0xFFFD && map[c] === undefined) map[c] = [hi, trails[j]];
          }
        } else {
          /* 有解不动的（会变成替换符，长度对不上）→ 退化成逐个解，慢但准 */
          for (j = 0; j < trails.length; j++) {
            var one = dec.decode(new Uint8Array([hi, trails[j]]));
            if (one.length === 1) {
              var c2 = one.charCodeAt(0);
              if (c2 !== 0xFFFD && map[c2] === undefined) map[c2] = [hi, trails[j]];
            }
          }
        }
      }
    }
    TABLES[enc] = map;
    return map;
  }

  /* 用指定编码把字串还原成字节。
     ⚠️ 有一个字在这个编码里不存在就返回 null —— 说明「这段字当初不可能是这么存的」，
        直接掐掉这个候选，比硬塞个问号凑出一个假结果强。 */
  /* ⚠️ latin1 这一档真正说的是 **windows-1252**，不是纯粹的 ISO-8859-1：
     字节 0x80–0x9F 是 € ‚ ƒ „ … † ‡ ˆ ‰ Š ‹ Œ Ž ' ' " " • – — ˜ ™ š › œ ž Ÿ
     这一批「智能引号 / 破折号 / 省略号」，不是控制字符。
     所以反过来编码时必须把它们认回去 —— 不然「â€™ → '」「æ—¥ → 日」这类最常见的乱码
     会因为「这个字在 latin1 里没有」而被整个候选掐掉，页面上一个候选都不出。 */
  /* 0x80~0x9F 共 32 个位置；其中 0x81/0x8D/0x8F/0x90/0x9D 在 windows-1252 里没有定义，
     解码后仍是 C1 控制字符 —— 按「原样」认回同一个字节即可 */
  var W1252_SEQ = [0x20AC, 0x0081, 0x201A, 0x0192, 0x201E, 0x2026, 0x2020, 0x2021, 0x02C6, 0x2030,
    0x0160, 0x2039, 0x0152, 0x008D, 0x017D, 0x008F, 0x0090, 0x2018, 0x2019, 0x201C,
    0x201D, 0x2022, 0x2013, 0x2014, 0x02DC, 0x2122, 0x0161, 0x203A, 0x0153, 0x009D,
    0x017E, 0x0178];
  var W1252 = (function () {
    var m = {}, i;
    for (i = 0; i < W1252_SEQ.length; i++) m[W1252_SEQ[i]] = 0x80 + i;
    return m;
  })();

  /* ⚠️ latin1 这一档**不交给 TextDecoder**，自己解。
     原因：同一个标签在不同运行时里不是一个东西 ——
       浏览器 / Node 21+ 按 WHATWG 把它当 windows-1252（0x99 → ™、0x80 → €）；
       Node 20 及更早走 ICU，把它当真正的 ISO-8859-1（0x99 → U+0099 控制字符）。
     交给运行时的话「同一份乱码在不同环境修出不同结果」，测试也会在服务器上红。
     自己解就一份答案：**一律按 windows-1252**，这也是各家浏览器与实际老播放器的行为。 */
  function decodeLatin1(bytes) {
    var out = '', i, b;
    for (i = 0; i < bytes.length; i++) {
      b = bytes[i];
      out += String.fromCharCode((b >= 0x80 && b <= 0x9F) ? W1252_SEQ[b - 0x80] : b);
    }
    return out;
  }

  function toBytes(str, enc) {
    if (enc === 'utf-8') { return TE ? TE.encode(str) : null; }
    var out = [], i, c, p;
    if (enc === 'latin1') {
      for (i = 0; i < str.length; i++) {
        c = str.charCodeAt(i);
        if (c <= 0xFF) { out.push(c); continue; }
        if (W1252[c] !== undefined) { out.push(W1252[c]); continue; }
        return null;
      }
      return new Uint8Array(out);
    }
    var map = table(enc);
    if (!map) return null;
    for (i = 0; i < str.length; i++) {
      c = str.charCodeAt(i);
      p = map[c];
      if (!p) return null;
      if (p.length === 1) out.push(p[0]);
      else { out.push(p[0]); out.push(p[1]); }
    }
    return new Uint8Array(out);
  }

  function fromBytes(bytes, enc) {
    if (enc === 'latin1') { return decodeLatin1(bytes); }
    try { return new TextDecoder(enc).decode(bytes); } catch (e) { return null; }
  }

  /* ---------------- 打分：这串字像不像人话 ----------------
     思路不是「认出它是哪国话」，而是「数一数里面有多少不像话的东西」：
       替换符 / 控制字符 / 私用区 / 货币数学符号（¥ ¬ ª « » ° × ÷ 那一堆）
       —— 乱码最典型的样子就是字母里夹着一堆这种符号。
     再加一条：汉字成片出现却一个常用字都没有（的/了/我/是/在…），
       八成是 UTF-8 被当 GBK 读出来的「浣犲ソ」，不是真中文。 */
  var SYM = /[¥¬ªº«»°±×÷§µ¶¢£¤¦¨¯´¸¼½¾¿¡†‡•…‰‹›€™]/;
  var COMMON_CJK = '的一是不了在人有我他这个们来到时大地为子中你说生国年着就那和要她出也得里后自以会家可下而过天去能对小多然于心学么之都好看起发当没成只如事把还用第样道想作种开美总从无情己面最女但现前些所同日手又行意动方期它头经长儿回位分爱老因很给名法间斯知世什两次使身者被高已亲其进此话常与活正感';

  function isLetterLike(c) {
    return (c >= 0x41 && c <= 0x5A) || (c >= 0x61 && c <= 0x7A)
      || (c >= 0x30 && c <= 0x39)
      || (c >= 0x00C0 && c <= 0x024F)      /* 拉丁字母带音标：法语越南语波兰语都正常 */
      || (c >= 0x0370 && c <= 0x03FF)      /* 希腊 */
      || (c >= 0x0400 && c <= 0x04FF)      /* 西里尔 */
      || (c >= 0x0590 && c <= 0x05FF)      /* 希伯来 */
      || (c >= 0x0600 && c <= 0x06FF)      /* 阿拉伯 */
      || (c >= 0x0900 && c <= 0x097F)      /* 天城体 */
      || (c >= 0x0E00 && c <= 0x0E7F)      /* 泰文 */
      || (c >= 0x1100 && c <= 0x11FF)      /* 谚文 */
      || (c >= 0x1E00 && c <= 0x1EFF)      /* 越南语 */
      || (c >= 0x3040 && c <= 0x30FF)      /* 假名 */
      || (c >= 0x3400 && c <= 0x4DBF) || (c >= 0x4E00 && c <= 0x9FFF) || (c >= 0xF900 && c <= 0xFAFF);
  }
  /* 连续出现一串带音标的拉丁字母，而且两边都不是普通英文字母
     —— 法语的 très、波兰语的 Polski 里，音标字母都是夹在普通字母中间的；
     乱码（ÄãºÃ、èªž）才是一串接一串。
     ⚠️ 还要再要求它**挨着一个同类**（另一个带音标的字母，或一个货币/数学符号）：
        波兰语教材里那种把字母逐个列出来的写法「ą ć ę ł ń ó ś ź ż」也满足「两边不是普通字母」，
        可它是一个一个隔开的 —— 逐个隔开恰恰说明那是人敲出来的，不是读错读出来的。
        乱码里的带音标字母是紧贴着符号出现的（â€™、èªª），这条能把两者分开。 */
  function accentRun(s) {
    var n = 0, i, c, p, q;
    var plain = function (x) { return (x >= 0x41 && x <= 0x5A) || (x >= 0x61 && x <= 0x7A); };
    var acc = function (x) { return x >= 0x00C0 && x <= 0x024F; };
    var sym = function (x) { return x > 0 && SYM.test(String.fromCharCode(x)); };
    for (i = 0; i < s.length; i++) {
      c = s.charCodeAt(i);
      if (!(c >= 0x00C0 && c <= 0x024F)) continue;
      p = i > 0 ? s.charCodeAt(i - 1) : 0;
      q = i < s.length - 1 ? s.charCodeAt(i + 1) : 0;
      if (plain(p) || plain(q)) continue;                     /* 夹在普通字母里 → 正常语言 */
      if (!(acc(p) || acc(q) || sym(p) || sym(q))) continue;  /* 孤零零一个 → 也不算 */
      n++;
    }
    return n;
  }
  /* 汉字成片却没有一个常用字，而且里面没有假名（有假名说明是日语，用字生僻是正常的） */
  function rareCjk(s) {
    var cjk = 0, com = 0, kana = 0, i, c, ch;
    for (i = 0; i < s.length; i++) {
      c = s.charCodeAt(i); ch = s.charAt(i);
      if (c >= 0x3400 && c <= 0x9FFF) { cjk++; if (COMMON_CJK.indexOf(ch) >= 0) com++; }
      else if (c >= 0x3040 && c <= 0x30FF) kana++;
    }
    return (cjk >= 3 && com === 0 && kana < 2) ? cjk : 0;
  }

  function scoreText(s, ref) {
    if (!s) return -999;
    var n = s.length || 1, good = 0, bad = 0, i, c, ch;
    for (i = 0; i < s.length; i++) {
      c = s.charCodeAt(i); ch = s.charAt(i);
      if (c === 0xFFFD) { bad += 6; continue; }
      if (c >= 0x80 && c <= 0x9F) { bad += 4; continue; }          /* C1 控制字符 */
      if (c >= 0xE000 && c <= 0xF8FF) { bad += 4; continue; }      /* 私用区 */
      if (SYM.test(ch)) { bad += 3; continue; }
      good++;
    }
    bad += rareCjk(s);                       /* 看着像中文、读不通 */
    bad += accentRun(s) * 1.5;               /* 一串串带音标的字母 */
    /* 字幕的骨架不能丢：原来有几个时间轴箭头，修完至少还得有那么多个 */
    if (ref) {
      var a = (ref.match(/-->/g) || []).length, b = (s.match(/-->/g) || []).length;
      if (a > b) bad += (a - b) * 2;
    }
    return (good - bad * 2) / n;
  }

  /* ---------------- 诊断：这份到底是不是乱码 ---------------- */
  /* 只回答「是不是 / 是哪一类」，不猜它是哪国话 —— 猜错了会把正常字幕说成乱码。 */
  function diagnose(s) {
    var r = [], i, c, n = s.length || 1, fffd = 0, c1 = 0, sym = 0, accent = 0;
    for (i = 0; i < s.length; i++) {
      c = s.charCodeAt(i);
      if (c === 0xFFFD) fffd++;
      else if (c >= 0x80 && c <= 0x9F) c1++;
      else if (SYM.test(s.charAt(i))) sym++;
      else if ((c >= 0x00C0 && c <= 0x00FF) || (c >= 0x0100 && c <= 0x017F)) accent++;
    }
    if (fffd) r.push('fffd');                            /* 已经不可逆 */
    if (c1 / n > 0.005) r.push('c1');
    if (sym / n > 0.01) r.push('sym');
    /* 带音标的拉丁字母成片出现，而且夹在符号里 —— 典型的「UTF-8 当单字节读了」 */
    if (accent / n > 0.06 && sym / n > 0.005) r.push('latin');
    /* 一串串带音标的字母，两边都不是普通英文字母（ÄãºÃ 那种） */
    if (accentRun(s) >= 2 && accentRun(s) / n > 0.2) r.push('run');
    /* 汉字成片却没一个常用字 */
    if (rareCjk(s)) r.push('cjk');
    return { reasons: r, clean: r.length === 0 };
  }

  /* ---------------- BOM ---------------- */
  function sniffBom(bytes) {
    if (bytes.length >= 3 && bytes[0] === 0xEF && bytes[1] === 0xBB && bytes[2] === 0xBF) return 'utf-8';
    if (bytes.length >= 2 && bytes[0] === 0xFF && bytes[1] === 0xFE) return 'utf-16le';
    if (bytes.length >= 2 && bytes[0] === 0xFE && bytes[1] === 0xFF) return 'utf-16be';
    return null;
  }
  function stripBom(bytes) {
    var b = sniffBom(bytes);
    if (!b) return bytes;
    return bytes.subarray(b === 'utf-8' ? 3 : 2);
  }

  /* ---------------- 候选一：手里有原始字节 ---------------- */
  /* 挨个编码解一遍，谁解出来最像人话就排前面。信息一个字节都没丢，这条路最干净。 */
  function fromBytesAll(bytes) {
    var raw = stripBom(bytes), out = [], i, txt;
    var tryList = ENC_IDS.concat(['utf-16le', 'utf-16be']);
    for (i = 0; i < tryList.length; i++) {
      txt = fromBytes(raw, tryList[i]);
      if (txt == null) continue;
      out.push({ from: tryList[i], to: null, text: txt, score: scoreText(txt, null), depth: 1 });
    }
    /* ⚠️ 必须按分数排 —— 页面拿第 0 项当「这份文件到底是什么编码」，
       不排就会永远说是 UTF-8（它在列表最前面），GBK 文件也会被认成 UTF-8 */
    return sortCands(dedup(out));
  }

  /* ---------------- 候选二：只剩字串（粘贴进来的） ---------------- */
  /* 把现在这串字按「当初被误读成的编码」还原成字节，再用「真正的编码」读回来。 */
  function fromTextAll(str, depth) {
    var out = [], i, j, bytes, txt;
    var srcs = ['latin1', 'gbk', 'big5', 'shift_jis', 'euc-kr'];
    var tgts = ['utf-8', 'gbk', 'big5', 'shift_jis', 'euc-kr'];
    for (i = 0; i < srcs.length; i++) {
      bytes = toBytes(str, srcs[i]);
      if (!bytes) continue;
      for (j = 0; j < tgts.length; j++) {
        if (srcs[i] === tgts[j]) continue;
        txt = fromBytes(bytes, tgts[j]);
        if (txt == null || txt === str) continue;
        out.push({ from: srcs[i], to: tgts[j], text: txt, score: scoreText(txt, str), depth: depth || 1 });
      }
    }
    return dedup(out);
  }

  /* 双重乱码：被人连错两次（存错一次、又修错一次）。对头几个候选再跑一轮。 */
  function deep(str, top) {
    var out = [], i;
    for (i = 0; i < top.length && i < 4; i++) {
      var more = fromTextAll(top[i].text, 2);
      for (var j = 0; j < more.length; j++) out.push(more[j]);
    }
    return out;
  }

  function dedup(list) {
    var seen = Object.create(null), out = [], i;
    for (i = 0; i < list.length; i++) {
      var k = list[i].text.slice(0, 200);
      if (seen[k]) continue;
      seen[k] = 1; out.push(list[i]);
    }
    return out;
  }

  function sortCands(list) {
    return list.slice().sort(function (a, b) { return b.score - a.score; });
  }

  /* ---------------- 对外：给一份输入，回一份诊断 + 候选 ----------------
     ⚠️ 两类用户的处境不一样，别混为一谈：
       A. 传文件 —— 文件多半**没坏**，是他的播放器按错编码读了。
          这时候页面该做的是「认出它其实是 GBK，然后帮你另存一份 UTF-8（带 BOM）」，
          不是去改文本里任何一个字。
       B. 粘贴乱码 —— 字节已经没了，只能倒推，能修多少算多少。 */
  function repair(input) {
    var bytes = input.bytes || null;
    var decoded = bytes ? fromBytesAll(bytes) : [];
    /* shown = 页面里当「原文」展示的那份：有字节就用解得最像人话的那份，没有就用粘贴的 */
    var shown = decoded.length ? decoded[0].text : (input.text || '');
    var diag = diagnose(shown);
    var list, base = scoreText(shown, null);
    if (bytes) {
      list = decoded.slice(1);                                   /* 其它编码的解法 */
      if (!diag.clean) list = list.concat(fromTextAll(shown, 1)); /* 还像乱码就再倒推一层 */
    } else {
      list = fromTextAll(shown, 1);
      list = list.concat(deep(shown, sortCands(list).slice(0, 4)));
    }
    list = sortCands(dedup(list));
    var best = list[0] || null;
    /* 分数明显更好的才值得推荐；跟现在这份差不多就别瞎推 */
    if (best && best.score < base + 0.02) best = null;
    return {
      shown: shown,
      enc: decoded.length ? decoded[0].from : null,   /* 传文件时认出来的编码 */
      diag: diag,
      /* 字节没了 + 已经出现替换符 = 谁也修不回来，必须直说 */
      lost: diag.reasons.indexOf('fffd') >= 0 && !bytes,
      baseScore: base,
      best: best,
      list: list.slice(0, 12)
    };
  }

  root.RepairCore = {
    ENCS: ENCS,
    repair: repair,
    diagnose: diagnose,
    scoreText: scoreText,
    accentRun: accentRun,
    rareCjk: rareCjk,
    toBytes: toBytes,
    fromBytes: fromBytes,
    table: table,
    sniffBom: sniffBom,
    stripBom: stripBom,
    /* 给页面用的一句人话标签：候选是从哪个编码读到哪个编码 */
    label: function (c) {
      if (!c.to) return c.from;
      return c.from + ' → ' + c.to;
    }
  };
})(typeof window !== 'undefined' ? window : this);
