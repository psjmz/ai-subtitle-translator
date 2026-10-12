/* bilingual-core.js —— 双语字幕剥离页的独立引擎（v0.9.289 建 / v0.9.290 改分轨）
   与 srt-core.js / merge-core.js / clean-core.js / convert-core.js 完全隔离：
   本文件只被 bilingual.html 加载，不引入、不修改任何现有引擎。
   解析与导出都在浏览器里跑完，不上传、不调模型 —— 这个页面一分钱调用费都不烧。

   双语字幕有两种长相，两种都要能处理：
     形态 A：一条字幕里两行（原文一行、译文一行）
     形态 B：两条独立字幕、时间轴完全相同（双语 ASS 最常见的做法）
   ⚠️ 谁算原文、谁算译文**不靠语种猜**：同轴多条按先后（先=原文），一条多行按文字系统。
      译文是英文 / 日文 / 法文都成立，不写死中文。

   支持读取：SRT / VTT / ASS / SSA / SBV / LRC / TXT
   支持导出：SRT / VTT / ASS / TXT
   中间结构统一为 { start, end, text }（毫秒）。 */
(function (root) {
  'use strict';

  /* ---------------- 时间码 ---------------- */
  function pad(n, w) { n = String(n); while (n.length < w) n = '0' + n; return n; }
  function hms(ms) {
    ms = Math.max(0, Math.round(ms));
    var h = Math.floor(ms / 3600000), m = Math.floor(ms % 3600000 / 60000),
      s = Math.floor(ms % 60000 / 1000), f = ms % 1000;
    return { h: h, m: m, s: s, ms: f };
  }
  function srtTime(ms) { var t = hms(ms); return pad(t.h, 2) + ':' + pad(t.m, 2) + ':' + pad(t.s, 2) + ',' + pad(t.ms, 3); }
  function vttTime(ms) { var t = hms(ms); return pad(t.h, 2) + ':' + pad(t.m, 2) + ':' + pad(t.s, 2) + '.' + pad(t.ms, 3); }
  function assTime(ms) { var t = hms(ms); return t.h + ':' + pad(t.m, 2) + ':' + pad(t.s, 2) + '.' + pad(Math.floor(t.ms / 10), 2); }

  function parseHMS(h, m, s, frac) {
    var v = Number(h) * 3600000 + Number(m) * 60000 + Number(s) * 1000;
    var f = String(frac || '0');
    while (f.length < 3) f += '0';
    return v + Number(f.slice(0, 3));
  }

  /* ---------------- 文本清洗 ---------------- */
  /* ASS 的特效标记 {\pos(1,2)\b1} 只在 ASS 里有效，导出成别的格式时读出来就是噪音。
     \N / \n 是 ASS 与 SRT 各自的强制换行，统一还原成真换行。 */
  function stripAssTags(s) { return String(s).replace(/\{[^}]*\}/g, ''); }
  function normBreaks(s) { return String(s).replace(/\\N/gi, '\n'); }
  function plain(s) { return normBreaks(stripAssTags(s)).replace(/\r\n?/g, '\n').replace(/\n{3,}/g, '\n\n'); }

  /* ---------------- 读取：SRT / SBV 通用块解析 ---------------- */
  var RE_SRT = /^\s*(\d{1,3}):(\d{2}):(\d{2})(?:[,.](\d{1,3}))?\s*-->\s*(\d{1,3}):(\d{2}):(\d{2})(?:[,.](\d{1,3}))?/;
  var RE_SBV = /^\s*(\d{1,3}):(\d{2}):(\d{2})\.(\d{1,3})\s*,\s*(\d{1,3}):(\d{2}):(\d{2})\.(\d{1,3})\s*$/;

  function parseBlocks(text, re, mapTime) {
    var lines = String(text).replace(/\r\n?/g, '\n').split('\n');
    var out = [], cur = null, i;
    function flush() {
      if (cur && cur.text.replace(/\s/g, '') !== '') out.push(cur);
      cur = null;
    }
    for (i = 0; i < lines.length; i++) {
      var m = lines[i].match(re);
      if (m) {
        flush();
        var tm = mapTime(m);
        cur = { start: tm[0], end: tm[1], text: '' };
        continue;
      }
      if (cur === null) continue;
      if (lines[i].trim() === '') { flush(); continue; }
      cur.text += (cur.text ? '\n' : '') + lines[i];
    }
    flush();
    return out;
  }
  function parseSrt(text) {
    return parseBlocks(text, RE_SRT, function (m) {
      return [parseHMS(m[1], m[2], m[3], m[4]), parseHMS(m[5], m[6], m[7], m[8])];
    });
  }
  function parseSbv(text) {
    return parseBlocks(text, RE_SBV, function (m) {
      return [parseHMS(m[1], m[2], m[3], m[4]), parseHMS(m[5], m[6], m[7], m[8])];
    });
  }

  /* ---------------- 读取：VTT ---------------- */
  /* 比 SRT 多了 WEBVTT 头、NOTE / STYLE / REGION 块，以及时间行后面的 cue 设置 */
  function parseVtt(text) {
    var lines = String(text).replace(/\r\n?/g, '\n').split('\n');
    var out = [], cur = null, i;
    function flush() {
      if (cur && cur.text.replace(/\s/g, '') !== '') out.push(cur);
      cur = null;
    }
    for (i = 0; i < lines.length; i++) {
      var line = lines[i];
      if (/^(NOTE|STYLE|REGION)\b/.test(line)) {
        flush();
        while (i + 1 < lines.length && lines[i + 1].trim() !== '') i++;
        continue;
      }
      if (/^WEBVTT/i.test(line)) { flush(); continue; }
      var m = line.match(RE_SRT);
      if (m) {
        flush();
        cur = { start: parseHMS(m[1], m[2], m[3], m[4]), end: parseHMS(m[5], m[6], m[7], m[8]), text: '' };
        continue;
      }
      if (cur === null) continue;
      if (line.trim() === '') { flush(); continue; }
      cur.text += (cur.text ? '\n' : '') + line;
    }
    flush();
    return out;
  }

  /* ---------------- 读取：ASS / SSA ---------------- */
  /* Dialogue: Layer,Start,End,Style,Name,MarginL,MarginR,MarginV,Effect,Text
     前 9 段固定，正文是第 10 段（里面可以有逗号） */
  function parseAss(text) {
    var lines = String(text).replace(/\r\n?/g, '\n').split('\n');
    var out = [], inEvents = false;
    for (var i = 0; i < lines.length; i++) {
      var line = lines[i].trim();
      if (/^\[/.test(line)) { inEvents = /^\[events\]/i.test(line); continue; }
      if (!inEvents || !/^(Dialogue|Comment):/i.test(line)) continue;
      if (/^Comment:/i.test(line)) continue;
      var body = line.replace(/^(Dialogue|Comment):/i, '').replace(/^\s+/, '');
      var p = body.split(',');
      if (p.length < 10) continue;
      var sm = p[1].trim().match(/^(\d{1,3}):(\d{2}):(\d{2})[.:](\d{1,3})$/);
      var em = p[2].trim().match(/^(\d{1,3}):(\d{2}):(\d{2})[.:](\d{1,3})$/);
      if (!sm || !em) continue;
      var s = parseHMS(sm[1], sm[2], sm[3], (sm[4] + '00').slice(0, 3));
      var e = parseHMS(em[1], em[2], em[3], (em[4] + '00').slice(0, 3));
      out.push({ start: s, end: e, text: p.slice(9).join(',') });
    }
    return out;
  }

  /* ---------------- 读取：LRC / 纯文本 ---------------- */
  function parseLrc(text) {
    var lines = String(text).replace(/\r\n?/g, '\n').split('\n');
    var raw = [], i;
    var RE_TAG = /\[(\d{1,3}):(\d{2})(?:[.:](\d{1,3}))?\]/g;
    for (i = 0; i < lines.length; i++) {
      var line = lines[i], tags = [], m;
      RE_TAG.lastIndex = 0;
      while ((m = RE_TAG.exec(line))) tags.push(parseHMS('0', m[1], m[2], m[3] || '0'));
      if (!tags.length) continue;
      var body = line.replace(RE_TAG, '').trim();
      tags.forEach(function (t) { raw.push({ start: t, text: body }); });
    }
    raw.sort(function (a, b) { return a.start - b.start; });
    return raw.map(function (c, i) {
      var next = raw[i + 1];
      var end = next ? next.start : c.start + 3000;
      if (end <= c.start) end = c.start + 3000;
      return { start: c.start, end: end, text: c.text };
    });
  }
  function parseTxt(text) {
    var lines = String(text).replace(/\r\n?/g, '\n').split('\n');
    var out = [], t = 0;
    for (var i = 0; i < lines.length; i++) {
      var s = lines[i].trim();
      if (!s) continue;
      out.push({ start: t, end: t + 3000, text: s });
      t += 3000;
    }
    return out;
  }

  /* ---------------- 格式识别 ---------------- */
  function detect(text, fname) {
    var ext = (String(fname || '').match(/\.([a-z0-9]+)$/i) || [])[1];
    if (ext) {
      ext = ext.toLowerCase();
      if (ext === 'srt') return 'srt';
      if (ext === 'vtt') return 'vtt';
      if (ext === 'ass' || ext === 'ssa') return 'ass';
      if (ext === 'sbv') return 'sbv';
      if (ext === 'lrc') return 'lrc';
      if (ext === 'txt') return 'txt';
    }
    var s = String(text || '').replace(/^﻿/, '');
    if (/^WEBVTT/m.test(s)) return 'vtt';
    if (/\[Script Info\]/i.test(s) || /^Dialogue:/im.test(s)) return 'ass';
    if (/^\s*\d{1,3}:\d{2}:\d{2}\.\d{1,3}\s*,/m.test(s)) return 'sbv';
    if (/^\s*\[\d{1,3}:\d{2}[.:]\d{1,3}\]/m.test(s)) return 'lrc';
    if (/\d{1,3}:\d{2}:\d{2}[,.]\d{1,3}\s*-->/.test(s)) return 'srt';
    if (/\d{1,3}:\d{2}:\d{2}\s*-->/.test(s)) return 'srt';
    if (s.trim()) return 'txt';
    return null;
  }

  /* ---------------- 双语分轨 ---------------- */
  /* v0.9.290：不再假设「译文就是中文」，改成按「位置 + 文字系统」分轨。
       ① 同一时间轴上有 ≥2 条独立字幕（双语 ASS 最常见的做法）→ 就是双轨：
          **先出现的那条算原文轨，其余算译文轨**。不猜语种 —— 英法、英德这种
          两条都用拉丁字母的字幕也分得开。
       ② 一条里有多行（两种语言写在同一句里）→ 看文字系统：出现 2 种以上才算双语，
          先出现的系统算原文轨；只有 1 种（英文长句折行 / 中文长句折行）→ 视为单语，原样不动。
     ⚠️ 两种长相必须分开判：折行也是「一条里两行」，只看行数会把折行劈成两轨。
     ⚠️ 不做语种识别：猜错会静默删掉整条字幕，位置 + 文字系统稳得多。 */
  var SCRIPTS = [
    ['kana', /[\u3040-\u30FF\u31F0-\u31FF]/],        /* ⚠️ 必须排在 han 前：日文里也带汉字 */
    ['hangul', /[\u1100-\u11FF\uAC00-\uD7AF]/],      /* 韩文同理 */
    ['cyrillic', /[\u0400-\u04FF]/],
    ['greek', /[\u0370-\u03FF]/],
    ['hebrew', /[\u0590-\u05FF]/],
    ['arabic', /[\u0600-\u06FF\u0750-\u077F]/],
    ['thai', /[\u0E00-\u0E7F]/],
    ['devanagari', /[\u0900-\u097F]/],
    ['han', /[\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF]/],
    ['latin', /[A-Za-z]/]
  ];
  function scriptOf(s) {
    var t = String(s || ''), i;
    for (i = 0; i < SCRIPTS.length; i++) if (SCRIPTS[i][1].test(t)) return SCRIPTS[i][0];
    return '';
  }
  /* 一组（同时间轴的若干条）→ 两轨；bi=false 表示这组没看出双语，内容原样保留 */
  function groupTracks(g) {
    var i, a = [], b = [];
    if (g.length >= 2) {
      for (i = 0; i < g.length; i++) {
        var tx = plain(g[i].text).trim();
        if (!tx) continue;
        (i === 0 ? a : b).push(tx);
      }
      if (!a.length || !b.length) return { src: a.concat(b), dst: [], bi: false };
      return { src: a, dst: b, bi: true };
    }
    var rows = plain(g[0].text).split('\n').map(function (x) { return x.trim(); })
      .filter(function (x) { return !!x; });
    var sys = [];
    rows.forEach(function (ln) {
      var sc = scriptOf(ln);
      if (sc && sys.indexOf(sc) < 0) sys.push(sc);
    });
    if (sys.length < 2) return { src: rows, dst: [], bi: false };
    var s = [], d = [];
    rows.forEach(function (ln) { (scriptOf(ln) === sys[0] ? s : d).push(ln); });
    return { src: s, dst: d, bi: true };
  }
  /* 相邻且时间轴完全相同的条目归为一组（形态 B 的双轨） */
  function groupByTime(cues) {
    var groups = [];
    (cues || []).forEach(function (c) {
      var last = groups[groups.length - 1];
      if (last && last[0].start === c.start && last[0].end === c.end) last.push(c);
      else groups.push([c]);
    });
    return groups;
  }
  /* 拆成两轨：返回 { src: [...], dst: [...], merged: [...] }，时间轴与分组保持一致 */
  function split(cues) {
    var src = [], dst = [], merged = [];
    groupByTime(cues).forEach(function (g) {
      var tr = groupTracks(g);
      var start = g[0].start, end = g[g.length - 1].end;
      if (tr.src.length) src.push({ start: start, end: end, text: tr.src.join('\n') });
      if (tr.dst.length) dst.push({ start: start, end: end, text: tr.dst.join('\n') });
      /* 合并档：两种都有就合成「原文一行 / 译文一行」；只有一种就原样保留，不凭空造第二行 */
      var txt;
      if (tr.bi && tr.src.length && tr.dst.length) txt = tr.src.join(' ') + '\n' + tr.dst.join(' ');
      else txt = g.map(function (c) { return plain(c.text).trim(); }).join('\n');
      merged.push({ start: start, end: end, text: txt });
    });
    return { src: src, dst: dst, merged: merged };
  }
  /* 页面用它决定「模式」下拉是可用还是置灰 —— 免得用户以为工具坏了 */
  function hasBilingual(cues) {
    var n = 0;
    groupByTime(cues || []).forEach(function (g) { if (groupTracks(g).bi) n++; });
    return n > 0;
  }
  /* 一次算完交给页面：拆成几份由 mode 决定 */
  var MODES = [
    { id: 'src', key: 'mSrc' },
    { id: 'dst', key: 'mDst' },
    { id: 'split', key: 'mSplit' },
    { id: 'merge', key: 'mMerge' }
  ];
  function transform(cues, mode) {
    var r = split(cues || []);
    if (mode === 'src') return [{ key: 'partSrc', cues: r.src }];
    if (mode === 'dst') return [{ key: 'partDst', cues: r.dst }];
    if (mode === 'merge') return [{ key: 'partMerged', cues: r.merged }];
    return [{ key: 'partSrc', cues: r.src }, { key: 'partDst', cues: r.dst }];
  }

  /* ---------------- 导出 ---------------- */
  function dumpSrt(cues) {
    return cues.map(function (c, i) {
      return (i + 1) + '\n' + srtTime(c.start) + ' --> ' + srtTime(c.end) + '\n' + plain(c.text) + '\n';
    }).join('\n');
  }
  function dumpVtt(cues) {
    return 'WEBVTT\n\n' + cues.map(function (c) {
      return vttTime(c.start) + ' --> ' + vttTime(c.end) + '\n' + plain(c.text) + '\n';
    }).join('\n');
  }
  function dumpTxt(cues) {
    return cues.map(function (c) { return plain(c.text); }).join('\n') + '\n';
  }
  function dumpAss(cues) {
    var head = '[Script Info]\n'
      + 'ScriptType: v4.00+\n'
      + 'PlayResX: 1920\n'
      + 'PlayResY: 1080\n'
      + 'WrapStyle: 0\n\n'
      + '[V4+ Styles]\n'
      + 'Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding\n'
      + 'Style: Default,Arial,54,&H00FFFFFF,&H000000FF,&H00000000,&H80000000,0,0,0,0,100,100,0,0,1,2,0,2,90,90,60,1\n\n'
      + '[Events]\n'
      + 'Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text\n';
    var body = cues.map(function (c) {
      return 'Dialogue: 0,' + assTime(c.start) + ',' + assTime(c.end) + ',Default,,0,0,0,,'
        + normBreaks(c.text).replace(/\r?\n/g, '\\N');
    }).join('\n');
    return head + body + '\n';
  }

  var READ = { srt: parseSrt, vtt: parseVtt, ass: parseAss, ssa: parseAss, sbv: parseSbv, lrc: parseLrc, txt: parseTxt };
  var WRITE = { srt: dumpSrt, vtt: dumpVtt, ass: dumpAss, txt: dumpTxt };

  var FORMATS = [
    { id: 'srt', ext: 'srt', name: 'SRT', note: 'SubRip · 通用字幕' },
    { id: 'vtt', ext: 'vtt', name: 'VTT', note: 'WebVTT · 网页播放器' },
    { id: 'ass', ext: 'ass', name: 'ASS', note: 'Advanced SubStation · 特效' },
    { id: 'txt', ext: 'txt', name: 'TXT', note: '纯文本 · 不带时间轴' }
  ];
  var READABLE = ['srt', 'vtt', 'ass', 'ssa', 'sbv', 'lrc', 'txt'];

  function parse(text, fmt) {
    var fn = READ[fmt];
    if (!fn) return null;
    return fn(text).map(function (c) {
      return { start: c.start, end: (c.end > c.start ? c.end : c.start + 1), text: String(c.text == null ? '' : c.text) };
    });
  }
  function dump(cues, fmt) {
    var fn = WRITE[fmt];
    if (!fn) return '';
    return fn(cues || []);
  }
  /* 换文件名后缀；拆成两份时中间加一段标记，免得两份同名互相覆盖 */
  function outName(fname, fmt, tag) {
    var f = String(fname || 'subtitle').replace(/\.[a-z0-9]+$/i, '') || 'subtitle';
    return f + (tag ? '.' + tag : '') + '.' + fmt;
  }

  root.BilingualCore = {
    FORMATS: FORMATS,
    READABLE: READABLE,
    MODES: MODES,
    detect: detect,
    parse: parse,
    dump: dump,
    split: split,
    transform: transform,
    hasBilingual: hasBilingual,
    outName: outName
  };
})(window);
