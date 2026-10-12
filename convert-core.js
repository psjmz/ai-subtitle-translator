/* convert-core.js —— 字幕格式转换页的独立引擎（v0.9.289）
   与 srt-core.js / merge-core.js / clean-core.js 完全隔离：本文件只被 convert.html 加载，
   不引入、不修改任何现有引擎。解析与导出都在浏览器里跑完，不上传、不调模型。
   v0.9.289：新增双语处理（保留双语 / 只留原文 / 只留译文 / 合并成一条两行），
   顺带修掉「两条同轴的双语 ASS 转成 SRT 后叠字」这个 bug。
   v0.9.290：分轨不再假设「译文就是中文」，改为按「位置 + 文字系统」判（见下方分轨段注释）。

   支持读取：SRT / VTT / ASS / SSA / SBV / LRC / TXT
   支持导出：SRT / VTT / ASS / SBV / LRC / TXT
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
  function sbvTime(ms) { var t = hms(ms); return t.h + ':' + pad(t.m, 2) + ':' + pad(t.s, 2) + '.' + pad(t.ms, 3); }
  /* LRC 只有「分:秒」，没有小时位 —— 分钟位不回绕（62:05 就是 1 小时 2 分），
     否则超过一小时的字幕会被压成「02:05」，时间全错。 */
  function lrcTime(ms) {
    ms = Math.max(0, Math.round(ms));
    return pad(Math.floor(ms / 60000), 2) + ':' + pad(Math.floor(ms % 60000 / 1000), 2) + '.' + pad(Math.floor(ms % 1000 / 10), 2);
  }
  function assTime(ms) { var t = hms(ms); return t.h + ':' + pad(t.m, 2) + ':' + pad(t.s, 2) + '.' + pad(Math.floor(t.ms / 10), 2); }

  /* 把 "时:分:秒.毫" 这类字符串读成毫秒；时、分、秒都可缺位（VTT 允许 MM:SS.mmm） */
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
  /* 两者都是「时间行 + 随后的文本行 + 空行」结构，只有时间码写法不同 */
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
  /* 比 SRT 多了 WEBVTT 头、NOTE / STYLE / REGION 块，以及时间行后面的 cue 设置（align:…） */
  function parseVtt(text) {
    var src = String(text).replace(/\r\n?/g, '\n');
    var lines = src.split('\n');
    var out = [], cur = null, i;
    function flush() {
      if (cur && cur.text.replace(/\s/g, '') !== '') out.push(cur);
      cur = null;
    }
    for (i = 0; i < lines.length; i++) {
      var line = lines[i];
      if (/^WEBVTT/i.test(line) || /^(NOTE|STYLE|REGION)\b/.test(line)) { flush(); cur = null; }
      /* 跳过块头后面的内容，直到出现空行 */
      if (/^(NOTE|STYLE|REGION)\b/.test(line)) {
        while (i + 1 < lines.length && lines[i + 1].trim() !== '') i++;
        continue;
      }
      var m = line.match(RE_SRT);
      if (m) {
        flush();
        var tm = [parseHMS(m[1], m[2], m[3], m[4]), parseHMS(m[5], m[6], m[7], m[8])];
        cur = { start: tm[0], end: tm[1], text: '' };
        /* 时间行尾部的 cue 设置属于样式，不是字幕正文 */
        var rest = line.slice(m[0].length).trim();
        if (rest) continue;
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
      var st = p[1].trim(), et = p[2].trim();
      var sm = st.match(/^(\d{1,3}):(\d{2}):(\d{2})[.:](\d{1,3})$/);
      var em = et.match(/^(\d{1,3}):(\d{2}):(\d{2})[.:](\d{1,3})$/);
      if (!sm || !em) continue;
      /* ASS 的时间是厘秒，前面补成毫秒 */
      var s = parseHMS(sm[1], sm[2], sm[3], (sm[4] + '00').slice(0, 3));
      var e = parseHMS(em[1], em[2], em[3], (em[4] + '00').slice(0, 3));
      out.push({ start: s, end: e, text: p.slice(9).join(',') });
    }
    return out;
  }

  /* ---------------- 读取：LRC ---------------- */
  /* [mm:ss.xx]歌词 —— 行内可能有多个时间戳（同一句重复唱），全部展开成独立条目 */
  function parseLrc(text) {
    var lines = String(text).replace(/\r\n?/g, '\n').split('\n');
    var raw = [], i;
    var RE_TAG = /\[(\d{1,3}):(\d{2})(?:[.:](\d{1,3}))?\]/g;
    for (i = 0; i < lines.length; i++) {
      var line = lines[i];
      var tags = [], m;
      RE_TAG.lastIndex = 0;
      /* LRC 的时间戳是 [分:秒.厘]，没有小时位 —— 别把「分」当「时」读 */
      while ((m = RE_TAG.exec(line))) tags.push(parseHMS('0', m[1], m[2], m[3] || '0'));
      if (!tags.length) continue;
      var body = line.replace(RE_TAG, '').trim();
      tags.forEach(function (t) {
        raw.push({ start: t, text: body });
      });
    }
    raw.sort(function (a, b) { return a.start - b.start; });
    /* LRC 没有结束时间：接到下一句为止，末句给 3 秒 */
    return raw.map(function (c, i) {
      var next = raw[i + 1];
      var end = next ? next.start : c.start + 3000;
      if (end <= c.start) end = c.start + 3000;
      return { start: c.start, end: end, text: c.text };
    });
  }

  /* ---------------- 读取：纯文本 ---------------- */
  /* 纯文本没有时间轴。按行切成条目，顺序排轴：每行 3 秒，空行当段落间隔。
     这样「文本 → 字幕」才有意义，而不是导出一个空壳。 */
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
    /* SRT 也可能用点号分隔毫秒，或时间行前面的序号被去掉了 */
    if (/\d{1,3}:\d{2}:\d{2}\s*-->/.test(s)) return 'srt';
    if (s.trim()) return 'txt';
    return null;
  }

  /* ---------------- 双语处理（v0.9.289） ---------------- */
  /* 双语字幕有两种长相，之前对它们一视同仁，所以形态 B 必然出错：
       形态 A：一条字幕里两行（原文一行、译文一行）—— 转出来一直是正常的
       形态 B：两条独立字幕、时间轴完全相同（双语 ASS 最常见的做法）—— 转 SRT 变成
               两条同轴的独立字幕，播放器叠字闪一下
     所以这里按「时间轴相同」把相邻条目归成一组，再决定留哪一行。 */
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
  var BI_MODES = [
    { id: 'keep', key: 'biKeep' },
    { id: 'src', key: 'biSrc' },
    { id: 'dst', key: 'biDst' },
    { id: 'merge', key: 'biMerge' }
  ];
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
  function applyBilingual(cues, mode) {
    var list = (cues || []).map(function (c) {
      return { start: c.start, end: c.end, text: String(c.text == null ? '' : c.text) };
    });
    if (!mode || mode === 'keep') return list;
    var out = [];
    groupByTime(list).forEach(function (g) {
      var tr = groupTracks(g);
      var end = g[g.length - 1].end;
      if (mode === 'merge') {
        /* 确实两种都有才合并成两行；单语条目原样保留，不凭空造第二行 */
        var txt;
        if (tr.bi && tr.src.length && tr.dst.length) txt = tr.src.join(' ') + '\n' + tr.dst.join(' ');
        else txt = g.map(function (c) { return plain(c.text).trim(); }).join('\n');
        out.push({ start: g[0].start, end: end, text: txt });
        return;
      }
      var keep = (mode === 'dst') ? tr.dst : tr.src;
      if (!keep.length) return;   /* 这一组里没有目标那一轨，整组丢掉 */
      out.push({ start: g[0].start, end: end, text: keep.join('\n') });
    });
    return out;
  }
  /* 页面用它决定「双语处理」这一行是可用还是置灰 */
  function hasBilingual(cues) {
    var n = 0;
    groupByTime(cues || []).forEach(function (g) { if (groupTracks(g).bi) n++; });
    return n > 0;
  }

  /* ---------------- 导出 ---------------- */
  function dumpSrt(cues) {
    return cues.map(function (c, i) {
      return (i + 1) + '\n' + srtTime(c.start) + ' --> ' + srtTime(c.end) + '\n' + plain(c.text) + '\n';
    }).join('\n');
  }
  function dumpVtt(cues) {
    return 'WEBVTT\n\n' + cues.map(function (c) {
      return vttTime(c.start) + ' --> ' + vttTime(c.end) + '\n' + plain(c.text).replace(/\n/g, '\n') + '\n';
    }).join('\n');
  }
  function dumpSbv(cues) {
    return cues.map(function (c) {
      return sbvTime(c.start) + ',' + sbvTime(c.end) + '\n' + plain(c.text).replace(/\n/g, ' ') + '\n';
    }).join('\n');
  }
  /* 歌词文件按时间递增读才有意义，导出前排一次序 */
  function dumpLrc(cues) {
    return cues.slice().sort(function (a, b) { return a.start - b.start; })
      .map(function (c) { return '[' + lrcTime(c.start) + ']' + plain(c.text).replace(/\n/g, ' '); }).join('\n') + '\n';
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
      var txt = normBreaks(c.text).replace(/\r?\n/g, '\\N');
      return 'Dialogue: 0,' + assTime(c.start) + ',' + assTime(c.end) + ',Default,,0,0,0,,' + txt;
    }).join('\n');
    return head + body + '\n';
  }

  var READ = { srt: parseSrt, vtt: parseVtt, ass: parseAss, ssa: parseAss, sbv: parseSbv, lrc: parseLrc, txt: parseTxt };
  var WRITE = { srt: dumpSrt, vtt: dumpVtt, ass: dumpAss, sbv: dumpSbv, lrc: dumpLrc, txt: dumpTxt };

  var FORMATS = [
    { id: 'srt', ext: 'srt', name: 'SRT', note: 'SubRip · 通用字幕' },
    { id: 'vtt', ext: 'vtt', name: 'VTT', note: 'WebVTT · 网页播放器' },
    { id: 'ass', ext: 'ass', name: 'ASS', note: 'Advanced SubStation · 特效' },
    { id: 'sbv', ext: 'sbv', name: 'SBV', note: 'YouTube 字幕' },
    { id: 'lrc', ext: 'lrc', name: 'LRC', note: '歌词' },
    { id: 'txt', ext: 'txt', name: 'TXT', note: '纯文本 · 不带时间轴' }
  ];
  var READABLE = ['srt', 'vtt', 'ass', 'ssa', 'sbv', 'lrc', 'txt'];

  function parse(text, fmt) {
    var fn = READ[fmt];
    if (!fn) return null;
    var cues = fn(text);
    /* 时间轴倒置（常见于手改坏的 SRT）不自动纠正，但保证 end 不早于 start，免得下游算出负时长 */
    return cues.map(function (c) {
      return { start: c.start, end: (c.end > c.start ? c.end : c.start + 1), text: String(c.text == null ? '' : c.text) };
    });
  }
  function dump(cues, fmt) {
    var fn = WRITE[fmt];
    if (!fn) return '';
    return fn(cues || []);
  }
  /* 换文件名后缀；原文件没有后缀就补一个 */
  function outName(fname, fmt) {
    var f = String(fname || 'subtitle');
    var f2 = f.replace(/\.[a-z0-9]+$/i, '') || 'subtitle';
    return f2 + '.' + fmt;
  }

  root.ConvertCore = {
    FORMATS: FORMATS,
    READABLE: READABLE,
    BI_MODES: BI_MODES,
    applyBilingual: applyBilingual,
    hasBilingual: hasBilingual,
    detect: detect,
    parse: parse,
    dump: dump,
    outName: outName,
    time: { srt: srtTime, vtt: vttTime, sbv: sbvTime, lrc: lrcTime, ass: assTime }
  };
})(window);
