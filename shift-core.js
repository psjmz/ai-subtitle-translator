/* shift-core.js —— 时间轴调整页的独立引擎（v0.9.294）
   与 convert-core.js / bilingual-core.js 完全隔离：本文件只被 shift.html 加载，
   不引入、不修改任何现有引擎。解析与导出都在浏览器里跑完。

   ⚠️ v0.9.292 的两条硬规矩仍然有效：
     ① 进来什么格式，出去就是什么格式。本页不做格式转换 —— 那是 /convert.html 的事。
        而且不只是「换后缀」：ASS 的 Script Info、样式表、每条的 Layer / Style / 边距 / Effect
        一列都不能丢，VTT 的 NOTE / STYLE 块和 cue 设置也不能丢。
        所以条目数没变时走 rewriteTimes —— 只改时间那几个字符，其余一字不动。
     ② 双语字幕（原文一行 + 译文一行）不能被合并或拆分压坏。
        同轴 / 同条的两行一旦识别为双语，合并时保持两行、拆分时整条跳过。
    ⚠️ v0.9.294：调整不再单选。「调整方式」和「合并 / 拆分」本来就是同一类东西 —— 对时间轴做
        一个操作 —— 现在合成一条**可叠加、可排序、可单独停用**的步骤流水线 applySteps。
        典型用法：「先整体延后 2 秒」+「再按 1.001 缩放」，两步叠加，不用导两次。

   支持读取：SRT / VTT / ASS / SSA / SBV / LRC / TXT
   中间结构统一为 { start, end, text }（毫秒），_x 里挂着该格式自己的样式信息。

   时间轴三种调整：
     ① 平移   shift：整体提前 / 延后 N 秒（时长不变，输入框单位是「秒」）
     ② 倍速   rate ：整体 ×N（时长同步缩放）—— 24fps ↔ 25fps、片源与字幕速率不一致时用
     ③ 两点校正 two ：给「当前首条→目标」「当前末条→目标」两对时间，中间线性映射
   合并与拆分：
     gap  合并间隙小于 N 毫秒的相邻两条（单位「毫秒」）
     dur  把时长超过 N 秒的长条按字数比例切成几条（单位「秒」）
     char 把字数超过 N 的长条切成几条（单位「字」）
   ⚠️ v0.9.294 起这六种都是「工序」，可以任意组合进一条流水线，见 STEP_DEFS / applySteps。
   ⚠️ 时间轴各家单位的换算全在这里，页面不许再自己 ×1000：
        平移「秒」→ 毫秒、合并「毫秒」直接用、拆分「秒」直接用、字数「字」直接用。
   逐条微调：把「合并 / 切分 / 改时间」记成一组操作，重算时从头依次重放。
   ⚠️ 时间被压到负数会截断到 0，并把受影响条数回报给页面（不许静默改时间）。 */
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
  /* 页面上的输入框让用户自由填：允许 "1:02:03,400"、"02:03.4"、"90"（纯秒） */
  function parseUserTime(v) {
    var s = String(v == null ? '' : v).trim();
    if (!s) return null;
    if (/^-?\d+(?:\.\d+)?$/.test(s)) return Math.round(Number(s) * 1000);
    var m = s.match(/^(?:(\d{1,3}):)?(\d{1,3}):(\d{1,3})(?:[.,](\d{1,3}))?$/);
    if (!m) return null;
    return parseHMS(m[1] || '0', m[2], m[3], m[4]);
  }

  /* ---------------- 文字系统（判断双语用） ---------------- */
  /* 只按字符形态判断，不猜语种：猜错会静默删掉整条字幕，形态判断稳得多。 */
  var RE_HAN = /[㐀-䶿一-鿿豈-﫿]/;
  var RE_KANA = /[぀-ヿㇰ-ㇿ]/;
  var RE_HANGUL = /[가-힯ᄀ-ᇿ]/;
  var RE_ARAB = /[؀-ۿ]/;
  var RE_CYR = /[Ѐ-ӿ]/;
  var RE_THAI = /[฀-๿]/;
  var RE_DEV = /[ऀ-ॿ]/;
  var RE_HEB = /[֐-׿]/;
  var RE_GREEK = /[Ͱ-Ͽ]/;
  var RE_LATIN = /[A-Za-zÀ-ÿĀ-ſ]/;
  /* 一行文字属于哪套书写系统：返回 'han' / 'kana' / 'latin' …，认不出给 'other' */
  function scriptOf(s) {
    var t = String(s || '');
    if (!t.replace(/[0-9\s\p{P}\p{S}]/gu, '')) return 'other';
    if (RE_HAN.test(t)) return 'han';
    if (RE_KANA.test(t)) return 'kana';
    if (RE_HANGUL.test(t)) return 'hangul';
    if (RE_THAI.test(t)) return 'thai';
    if (RE_DEV.test(t)) return 'devanagari';
    if (RE_ARAB.test(t)) return 'arabic';
    if (RE_HEB.test(t)) return 'hebrew';
    if (RE_CYR.test(t)) return 'cyrillic';
    if (RE_GREEK.test(t)) return 'greek';
    if (RE_LATIN.test(t)) return 'latin';
    return 'other';
  }
  /* 一条字幕里出现了两套以上书写系统 = 双语。
     纯英文长句折行成两行只有一套，不会被误判（合并/拆分时靠这条保命）。 */
  function trackScripts(text) {
    var set = {}, n = 0;
    plain(text).split('\n').forEach(function (ln) {
      var s = ln.trim();
      if (!s) return;
      var k = scriptOf(s);
      if (k !== 'other' && !set[k]) { set[k] = 1; n++; }
    });
    return { n: n, keys: Object.keys(set) };
  }
  function isBilingualCue(cue) {
    var lines = plain(cue && cue.text).split('\n').filter(function (x) { return x.trim(); });
    if (lines.length < 2) return false;
    return trackScripts(cue.text).n >= 2;
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
      if (/^(NOTE|STYLE|REGION)\b/.test(line)) {
        while (i + 1 < lines.length && lines[i + 1].trim() !== '') i++;
        continue;
      }
      var m = line.match(RE_SRT);
      if (m) {
        flush();
        var tm = [parseHMS(m[1], m[2], m[3], m[4]), parseHMS(m[5], m[6], m[7], m[8])];
        cur = { start: tm[0], end: tm[1], text: '', _x: { settings: settingsOf(line, m) } };
        continue;
      }
      if (cur === null) continue;
      if (line.trim() === '') { flush(); continue; }
      cur.text += (cur.text ? '\n' : '') + line;
    }
    flush();
    return out;
  }
  /* 时间行尾部 align:middle 这类设置属于样式，不是字幕正文 —— 摘出来原样带回。
     ⚠️ 首尾空白在这里就抹掉：导出时固定补一个空格，不然会拼出两个空格。 */
  function settingsOf(line, m) {
    return line.slice(m[0].length).replace(/^\s+/, '').replace(/\s+$/, '');
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
      /* ASS 的时间是厘秒，前面补成毫秒 */
      var s = parseHMS(sm[1], sm[2], sm[3], (sm[4] + '00').slice(0, 3));
      var e = parseHMS(em[1], em[2], em[3], (em[4] + '00').slice(0, 3));
      out.push({
        start: s, end: e, text: p.slice(9).join(','),
        /* 除时间外每一列都原样带回来，导出时一字不差地写回去 */
        _x: { layer: p[0].trim(), style: p[3], name: p[4], ml: p[5], mr: p[6], mv: p[7], effect: p[8] }
      });
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
      tags.forEach(function (t) { raw.push({ start: t, text: body }); });
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
  /* 纯文本没有时间轴。按行切成条目，顺序排轴：每行 3 秒。 */
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

  /* ---------------- 文件头（样式表 / NOTE 块）—— 导出时原样带回 ---------------- */
  /* 条目数不变时用不上（走 rewriteTimes），但一旦合并 / 拆分就得重新生成整份文件，
     这时候 Script Info、样式表、VTT 的 NOTE 块都必须还在，否则等于把用户的样式删了。 */
  function headOf(src, fmt) {
    var lines = String(src || '').replace(/\r\n?/g, '\n').split('\n');
    var out = [], i;
    if (fmt === 'ass' || fmt === 'ssa') {
      var inEvents = false;
      for (i = 0; i < lines.length; i++) {
        var ln = lines[i];
        if (/^\[/i.test(ln.trim())) inEvents = /^\[events\]/i.test(ln.trim());
        out.push(ln);
        /* Format 行是 Events 段的最后一行头信息，带上它就算收尾 */
        if (inEvents && /^Format:/i.test(ln.trim())) break;
      }
      return out.join('\n').replace(/\n+$/, '') + '\n';
    }
    if (fmt === 'vtt') {
      for (i = 0; i < lines.length; i++) {
        if (RE_SRT.test(lines[i])) break;
        out.push(lines[i]);
      }
      /* 最后一个 cue 的序号混在头部里（SRT 序号写法），别把它带到导出结果里 */
      while (out.length && /^\s*\d+\s*$/.test(out[out.length - 1])) out.pop();
      var h = out.join('\n').replace(/\s+$/, '');
      return h ? h + '\n\n' : 'WEBVTT\n\n';
    }
    return '';
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

  /* v0.9.294 起，MODES / TOOLS 两张旧表被 STEP_DEFS 取代并删掉 —— 页面不再有
     「调整方式」「合并与拆分」两个各选一项的下拉，它们统一成一条步骤流水线。 */
  /* v0.9.294：六种工序的说明书。页面照着这张表渲染步骤行 —— 参数有几个、单位写什么、
     默认值是多少都由这里定，页面上不许再散落这些数字。
       kind:'plain' 一个数值框（unit 是输入框右侧那个固定单位后缀，不靠 placeholder）
       kind:'time'  两点校正的四栏：当前首 / 当前末 / 目标首 / 目标末
     ⚠️ 单位换算只有一处：secMode 标记这一栏是「秒」，applySteps 里乘 1000 变毫秒。 */
  var STEP_DEFS = {
    shift: { key: 'mShift', hint: 'hintMs', kind: 'plain', unit: 'unitSec', ph: 'phMs', def: 0, sec: true },
    rate: { key: 'mRate', hint: 'hintRate', kind: 'plain', unit: 'unitX', ph: 'phRate', def: 1 },
    two: { key: 'mTwo', hint: 'hintTwo', kind: 'time' },
    gap: { key: 'toolGap', hint: 'hintGap', kind: 'plain', unit: 'unitMs', ph: 'phGap', def: 250 },
    dur: { key: 'toolDur', hint: 'hintDur', kind: 'plain', unit: 'unitSec', ph: 'phDur', def: 6, sec: true },
    char: { key: 'toolChar', hint: 'hintChar', kind: 'plain', unit: 'unitChar', ph: 'phChar', def: 42 }
  };
  var STEP_ORDER = ['shift', 'rate', 'two', 'gap', 'dur', 'char'];
  function mkStep(id) {
    var d = STEP_DEFS[id];
    if (!d) return null;
    if (d.kind === 'time') return { id: id, off: false, v: ['', '', '', ''] };
    return { id: id, off: false, v: [d.def] };
  }

  function info(cues) {
    var c = cues || [];
    if (!c.length) return { count: 0, first: 0, last: 0 };
    var first = c[0].start, last = c[0].end, i;
    for (i = 1; i < c.length; i++) {
      if (c[i].start < first) first = c[i].start;
      if (c[i].end > last) last = c[i].end;
    }
    return { count: c.length, first: first, last: last };
  }

  function isNum(x) { return typeof x === 'number' && isFinite(x); }
  /* 一次映射一条时间；mode 决定怎么算 */
  function makeMapper(mode, opt) {
    var o = opt || {};
    if (mode === 'rate') {
      var r = Number(o.rate);
      if (!isFinite(r) || r <= 0) return null;
      return function (t) { return t * r; };
    }
    if (mode === 'two') {
      var a1 = o.fromStart, a2 = o.fromEnd, b1 = o.toStart, b2 = o.toEnd;
      /* ⚠️ 必须是真数字：页面没填时传进来的是 null，而 Number(null) === 0，
         不严格判就会把「没填」当成「0 秒」，整片字幕被拉到 0 */
      if (![a1, a2, b1, b2].every(isNum)) return null;
      /* 两点重合就只剩平移，退化处理，别除以 0 */
      var k = (a2 === a1) ? 1 : (b2 - b1) / (a2 - a1);
      return function (t) { return b1 + (t - a1) * k; };
    }
    var d = Number(o.ms);
    if (!isFinite(d)) return null;
    return function (t) { return t + d; };
  }

  /* 返回 { cues, clamped }：
     clamped = 被从负数截断到 0 的条数（页面据此提示，不许静默改时间） */
  function apply(cues, mode, opt) {
    var list = clone(cues);
    var f = makeMapper(mode, opt);
    if (!f) return { cues: list, clamped: 0, ok: false };
    var clamped = 0;
    var out = list.map(function (c) {
      var s = Math.round(f(c.start)), e = Math.round(f(c.end)), hit = false;
      if (s < 0) { s = 0; hit = true; }
      if (e < 0) { e = 0; hit = true; }
      /* clamped 计数按「条」算（一条的 start、end 都负也只算一条），
         页面文案是「有 N 条」，计数口径必须跟文案一致 */
      if (hit) clamped++;
      /* 缩放 / 映射后不能让 end 跑到 start 前面，至少留 1ms */
      if (e <= s) e = s + 1;
      return { start: s, end: e, text: c.text, _x: c._x };
    });
    return { cues: out, clamped: clamped, ok: true };
  }
  /* 页面用它判断参数填没填对（空参数不许跑出一份错字幕） */
  function valid(mode, opt) {
    return !!makeMapper(mode, opt);
  }

  /* ---------------- v0.9.294：可叠加的步骤流水线 ---------------- */
  /* 一道工序的参数填没填对。空框 / 非数字一律不通过 —— 流水线里只要有一道填错，
     整体拒绝出结果（与其给一份错字幕，不如什么都不给）。 */
  function stepValid(id, v) {
    var a = v || [], n;
    if (id === 'shift') { n = Number(a[0]); return String(a[0]).trim() !== '' && isFinite(n); }
    if (id === 'rate') { n = Number(a[0]); return String(a[0]).trim() !== '' && isFinite(n) && n > 0; }
    if (id === 'two') {
      return [a[0], a[1], a[2], a[3]].every(function (x) {
        var t = parseUserTime(x);
        return typeof t === 'number' && isFinite(t);
      });
    }
    if (id === 'gap') { n = Number(a[0]); return String(a[0]).trim() !== '' && isFinite(n) && n >= 0; }
    if (id === 'dur' || id === 'char') { n = Number(a[0]); return String(a[0]).trim() !== '' && isFinite(n) && n > 0; }
    return false;
  }
  /* 从最原始的条目按顺序过一遍所有步骤。停用（off）的整道跳过；参数不合法立刻停，
     返回 ok:false + bad:<步骤 id>，页面据此提示「哪一步没填」而不是笼统报错。
     计数按工序累加：截断几条、合并几条、拆出几条，各自累计（多次合并会叠加）。 */
  function applySteps(cues, steps) {
    var list = clone(cues);
    var res = { cues: list, clamped: 0, merged: 0, split: 0, ok: true, bad: null };
    (steps || []).forEach(function (s) {
      if (!s || s.off || !res.ok) return;
      var id = s.id, v = s.v || [], r, a;
      if (!STEP_DEFS[id]) return;
      if (!stepValid(id, v)) { res.ok = false; res.bad = id; return; }
      if (id === 'shift' || id === 'rate' || id === 'two') {
        var opt;
        if (id === 'rate') opt = { rate: Number(v[0]) };
        else if (id === 'shift') opt = { ms: Math.round(Number(v[0]) * 1000) };   /* 界面单位是秒 */
        else opt = {
          fromStart: parseUserTime(v[0]), fromEnd: parseUserTime(v[1]),
          toStart: parseUserTime(v[2]), toEnd: parseUserTime(v[3])
        };
        r = apply(list, id, opt);
        if (!r.ok) { res.ok = false; res.bad = id; return; }
        list = r.cues;
        res.clamped += r.clamped;
        return;
      }
      if (id === 'gap') { a = mergeGap(list, Number(v[0])); list = a.cues; res.merged += a.merged; return; }
      if (id === 'dur') { a = splitByDur(list, Number(v[0])); list = a.cues; res.split += a.split; return; }
      if (id === 'char') { a = splitByChars(list, Number(v[0])); list = a.cues; res.split += a.split; }
    });
    res.cues = list;
    return res;
  }
  function clone(cues) {
    return (cues || []).map(function (c) {
      return {
        start: Number(c.start) || 0,
        end: Number(c.end) || 0,
        text: String(c.text == null ? '' : c.text),
        _x: c._x || null
      };
    });
  }

  /* ---------------- 合并与拆分 ---------------- */
  /* 合并：相邻两条之间的空档 ≤ gap 就并成一条，起止取首尾，文本接在后面。
     双语保护：两条内容分属两套书写系统时，合并后仍是「原文一行 / 译文一行」，
     不会挤成一行 —— 挤成一行在播放器里就是叠字。 */
  function mergeGap(cues, gapMs) {
    var gap = Number(gapMs);
    if (!isFinite(gap) || gap < 0) return { cues: clone(cues), merged: 0 };
    var list = clone(cues), out = [], merged = 0, i;
    for (i = 0; i < list.length; i++) {
      var cur = list[i];
      while (i + 1 < list.length) {
        var nx = list[i + 1];
        if (nx.start - cur.end > gap) break;
        var two = (scriptOf(cur.text) !== scriptOf(nx.text))
          && scriptOf(cur.text) !== 'other' && scriptOf(nx.text) !== 'other';
        cur = {
          start: cur.start,
          end: Math.max(cur.end, nx.end),
          text: two ? (cur.text + '\n' + nx.text) : joinText(cur.text, nx.text),
          _x: cur._x || nx._x
        };
        merged++;
        i++;
      }
      out.push(cur);
    }
    return { cues: out, merged: merged };
  }
  function joinText(a, b) {
    var x = String(a == null ? '' : a).replace(/\s+$/, '');
    var y = String(b == null ? '' : b).replace(/^\s+/, '');
    if (!x) return y;
    if (!y) return x;
    return x + '\n' + y;
  }

  /* 拆分：把一条按文本切成 n 段，时间按各段字数比例分。
     段怎么切：优先按现有行数分组（保留原折行），行数不够再按字符切（尽量落在空格 / 标点后）。 */
  function splitCue(cue, n) {
    var lines = plain(cue.text).split('\n').filter(function (x) { return x.trim(); });
    var flat = plain(cue.text).replace(/\n/g, ' ');
    var segs = null, k;
    /* ⚠️ v0.9.294 补：理想段数切不动就往下降档，别整条放弃。
       典型场景：一条 21 秒的长条，用户限定「最长 2 秒」→ 要切 11 段，可整句只有 5 个词，
       拉丁语系又不许劈单词 —— 改之前 splitWords 直接返回 null，整条不拆，
       于是「阈值调小反而切不动」，谁看都像 bug。现在逐级退到切得动为止（至少 2 段）：
       不劈单词这条红线照旧，但不会再出现静默不干活的情况。 */
    for (k = n; k >= 2; k--) {
      var attempt = (lines.length >= k) ? groupLines(lines, k) : splitWords(flat, k);
      if (attempt && attempt.length >= 2) { segs = attempt; break; }
    }
    if (!segs || segs.length <= 1) return null;
    var total = 0, w = segs.map(function (s) { var v = wOf(s); total += v; return v; });
    var dur = Math.max(1, cue.end - cue.start), t = cue.start, out = [];
    for (var i = 0; i < segs.length; i++) {
      var d = Math.round(dur * w[i] / total);
      var e = (i === segs.length - 1) ? cue.end : t + d;
      if (e <= t) e = t + 1;
      out.push({ start: t, end: e, text: segs[i], _x: cue._x || null });
      t = e;
    }
    return out;
  }
  function lenOf(s) { return String(s).replace(/\s/g, '').length || 1; }
  /* ⚠️ v0.9.294：时间按「占多宽的屏幕」分，不是按字符数。
     中文一个字是英文两个半字母的宽度，按字符数分时间，中文那一段会拿到过短的时间。
     计数规则沿用主站口径：全角 / 汉字 = 1，拉丁等半角每 2 个字符 = 1。 */
  function wOf(s) {
    var str = String(s).replace(/\s/g, '');
    if (!str) return 1;
    var n = 0, i, c;
    for (i = 0; i < str.length; i++) {
      c = str.charCodeAt(i);
      n += (c >= 0x1100 && (c <= 0x115f || c === 0x2e80 || (c >= 0x2e80 && c <= 0xa4cf) ||
        (c >= 0xac00 && c <= 0xd7a3) || (c >= 0xf900 && c <= 0xfaff) ||
        (c >= 0xfe30 && c <= 0xfe6f) || (c >= 0xff00 && c <= 0xff60) ||
        (c >= 0xffe0 && c <= 0xffe6))) ? 1 : 0.5;
    }
    return Math.max(0.5, n);
  }
  /* 把 n 行尽量均分成 k 组（每组至少一行） */
  function groupLines(lines, k) {
    var per = Math.ceil(lines.length / k), out = [], i;
    for (i = 0; i < lines.length; i += per) out.push(lines.slice(i, i + per).join('\n'));
    return out;
  }
  /* 单行文本切 k 段：优先在空格或标点后落刀。
     ⚠️ 拉丁语系没有词边界就硬切会把单词劈成 "Hel" / "lo"，这种字幕没人能用 —— 切不动就少切几段，
     实在一段都切不出来就返回 null（调用方据此整条不拆）。中文 / 日文没有词边界问题，允许按字数切。 */
  /* v0.9.294：按「文字之间有没有空格」分成两类，而不是按「是不是中日韩」。
     ① RE_NOSPACE —— 词与词之间本来就不写空格的文字（中日 / 泰 / 老挝 / 缅甸 / 高棉 / 藏）。
        这类语言找不到刀口时可以按字数硬切，切在"字"中间视觉上仍是完整的字符，
        观众读得下去；反倒是找不到刀口就不许切 → 整条字幕永远拆不动。
     ② 其余走词边界优先：拉丁 / 西里尔 / 希腊 / 阿拉伯 / 希伯来 / 越南字母 /
        ⚠️ 谚文（韩语）—— 韩语是有空格分词的，硬切会把一个词劈成两半（한국어 → 한국/어）。
        以前 RE_CJK 把谚文也算成「能硬切」，那是错的。 */
  var RE_NOSPACE = /[㐀-䶿一-鿿぀-ヿ฀-๿຀-໿က-ჿក-៿ༀ-࿿]/;
  function splitWords(text, k) {
    var s = String(text).trim();
    if (!s) return null;
    var per = Math.ceil(lenOf(s) / k);
    if (per <= 0) return null;
    var hard = RE_NOSPACE.test(s);   /* 这类文字允许按字数硬切，其余必须落在词边界 */
    var out = [], i = 0;
    while (i < s.length && out.length < k - 1) {
      var want = Math.min(s.length, i + per), cut = -1, j;
      /* 断点搜索范围往后多给一段（want + per）：只卡在 want 以内的话，
         像 "Hello there my friend" 这种词比平均段长稍长的句子会一段都切不出来。 */
      for (j = Math.min(s.length, want + per); j > i; j--) {
        if (/[\s，。！？、,.!?;；:：]/.test(s.charAt(j - 1))) { cut = j; break; }
      }
      if (cut < 0) {
        if (!hard) break;                 /* 找不到断点就到此为止，剩下的当最后一段 */
        cut = want;
      }
      out.push(s.slice(i, cut).trim());
      i = cut;
    }
    var tail = s.slice(i).trim();
    if (tail) out.push(tail);
    out = out.filter(function (x) { return x; });
    return out.length >= 2 ? out : null;
  }
  /* 按最长时长拆分：单条超过 maxSec 秒就按字数比例切成几条 */
  function splitByDur(cues, maxSec) {
    var mx = Number(maxSec);
    if (!isFinite(mx) || mx <= 0) return { cues: clone(cues), split: 0 };
    var list = clone(cues), out = [], split = 0, i;
    for (i = 0; i < list.length; i++) {
      var c = list[i];
      var dur = (c.end - c.start) / 1000;
      var n = Math.ceil(dur / mx);
      /* 双语那一条不要拆：切开会变成「原文一半 + 译文一半」这种废字幕 */
      if (n > 1 && !isBilingualCue(c)) {
        var segs = splitCue(c, n);
        if (segs) { out = out.concat(segs); split += segs.length - 1; continue; }
      }
      out.push(c);
    }
    return { cues: out, split: split };
  }
  /* 按最多字数拆分：单条字数超过 maxChars 就切成几条 */
  function splitByChars(cues, maxChars) {
    var mx = Number(maxChars);
    if (!isFinite(mx) || mx <= 0) return { cues: clone(cues), split: 0 };
    var list = clone(cues), out = [], split = 0, i;
    for (i = 0; i < list.length; i++) {
      var c = list[i];
      var n = Math.ceil(lenOf(c.text) / mx);
      if (n > 1 && !isBilingualCue(c)) {
        var segs = splitCue(c, n);
        if (segs) { out = out.concat(segs); split += segs.length - 1; continue; }
      }
      out.push(c);
    }
    return { cues: out, split: split };
  }

  /* ---------------- 逐条微调：把操作记下来重放 ---------------- */
  /* ops 按顺序作用在列表上，索引是「当时」的索引：
     {op:'merge', i} 把第 i 条与下一条并成一条
     {op:'split', i} 把第 i 条切成两条（能按行就按行，否则对半）
     {op:'set', i, s, e} 直接改第 i 条的起止 */
  function applyOps(cues, ops) {
    var list = clone(cues);
    (ops || []).forEach(function (o) {
      if (!o || !isNum(o.i)) return;
      var i = Math.round(o.i);
      if (i < 0 || i >= list.length) return;
      if (o.op === 'merge') {
        if (i + 1 >= list.length) return;
        var a = list[i], b = list[i + 1];
        var two = scriptOf(a.text) !== scriptOf(b.text)
          && scriptOf(a.text) !== 'other' && scriptOf(b.text) !== 'other';
        list.splice(i, 2, {
          start: a.start,
          end: Math.max(a.end, b.end),
          text: two ? (a.text + '\n' + b.text) : joinText(a.text, b.text),
          _x: a._x || b._x
        });
        return;
      }
      if (o.op === 'split') {
        var segs = splitCue(list[i], 2);
        if (!segs) return;
        list.splice(i, 1, segs[0], segs[1]);
        return;
      }
      if (o.op === 'set') {
        var s = Number(o.s), e = Number(o.e);
        if (!isFinite(s) || !isFinite(e)) return;
        if (s < 0) s = 0;
        if (e <= s) e = s + 1;
        list[i] = { start: Math.round(s), end: Math.round(e), text: list[i].text, _x: list[i]._x };
      }
    });
    return list;
  }

  /* ---------------- 导出 ---------------- */
  function dumpSrt(cues) {
    return cues.map(function (c, i) {
      return (i + 1) + '\n' + srtTime(c.start) + ' --> ' + srtTime(c.end) + '\n' + plain(c.text) + '\n';
    }).join('\n');
  }
  function dumpVtt(cues, head) {
    return (head || 'WEBVTT\n\n') + cues.map(function (c) {
      return vttTime(c.start) + ' --> ' + vttTime(c.end) + (c._x && c._x.settings ? ' ' + c._x.settings : '') + '\n' + plain(c.text) + '\n';
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
  function dumpAss(cues, head) {
    var h = head;
    if (!h) {
      h = '[Script Info]\n'
        + 'ScriptType: v4.00+\n'
        + 'PlayResX: 1920\n'
        + 'PlayResY: 1080\n'
        + 'WrapStyle: 0\n\n'
        + '[V4+ Styles]\n'
        + 'Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding\n'
        + 'Style: Default,Arial,54,&H00FFFFFF,&H000000FF,&H00000000,&H80000000,0,0,0,0,100,100,0,0,1,2,0,2,90,90,60,1\n\n'
        + '[Events]\n'
        + 'Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text\n';
    }
    var body = cues.map(function (c) {
      var x = c._x || {};
      var txt = normBreaks(c.text).replace(/\r?\n/g, '\\N');
      return 'Dialogue: '
        + [x.layer != null ? x.layer : '0', assTime(c.start), assTime(c.end),
        x.style != null ? x.style : 'Default', x.name != null ? x.name : '',
        x.ml != null ? x.ml : '0', x.mr != null ? x.mr : '0', x.mv != null ? x.mv : '0',
        x.effect != null ? x.effect : '', txt].join(',');
    }).join('\n');
    return h + body + '\n';
  }

  var READ = { srt: parseSrt, vtt: parseVtt, ass: parseAss, ssa: parseAss, sbv: parseSbv, lrc: parseLrc, txt: parseTxt };
  var WRITE = {
    srt: function (c) { return dumpSrt(c); },
    vtt: function (c, h) { return dumpVtt(c, h); },
    ass: function (c, h) { return dumpAss(c, h); },
    sbv: function (c) { return dumpSbv(c); },
    lrc: function (c) { return dumpLrc(c); },
    txt: function (c) { return dumpTxt(c); }
  };

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
      return {
        start: c.start,
        end: (c.end > c.start ? c.end : c.start + 1),
        text: String(c.text == null ? '' : c.text),
        _x: c._x || null
      };
    });
  }
  function head(src, fmt) { return headOf(src, fmt); }
  function dump(cues, fmt, src) {
    var fn = WRITE[fmt];
    if (!fn) return '';
    return fn(cues || [], (fmt === 'ass' || fmt === 'ssa' || fmt === 'vtt') ? headOf(src, fmt) : '');
  }
  /* 换文件名后缀；本页不做格式转换，后缀沿用原文件的（ssa 就还是 ssa） */
  function outName(fname, fmt) {
    var f = String(fname || 'subtitle');
    var m = f.match(/\.([a-z0-9]+)$/i);
    if (m) return f;                    /* 有后缀就原样 —— 同格式进出 */
    return f + '.' + (fmt || 'srt');
  }

  /* ---------------- 保真改写：只动时间那几个字符 ---------------- */
  /* 条目数没变时走这条路：整份文件逐行扫，认出时间就换成新值，别的字符一个都不碰。
     这样 ASS 的样式表、每条的 Style / 边距 / 特效标记，VTT 的 NOTE 块与 cue 设置全都还在。
     返回 null = 这条路走不通（条目数变了、或格式本来就没有时间轴），页面改用 dump。 */
  function rewriteTimes(src, fmt, cues) {
    if (!src || !cues) return null;
    if (fmt === 'txt') return null;
    var lines = String(src).replace(/\r\n?/g, '\n').split('\n');
    var k = 0, out = [], i, ok = true;

    if (fmt === 'ass' || fmt === 'ssa') {
      for (i = 0; i < lines.length; i++) {
        var ln = lines[i];
        if (!/^\s*(Dialogue|Comment):/i.test(ln)) { out.push(ln); continue; }
        if (/^\s*Comment:/i.test(ln)) { out.push(ln); continue; }
        var p = ln.split(',');
        if (p.length < 10) { out.push(ln); continue; }
        if (k >= cues.length) { ok = false; break; }
        p[1] = assTime(cues[k].start);
        p[2] = assTime(cues[k].end);
        out.push(p.join(','));
        k++;
      }
      return (ok && k === cues.length) ? out.join('\n') : null;
    }

    if (fmt === 'lrc') {
      var RE_TAG = /\[(\d{1,3}):(\d{2})(?:[.:](\d{1,3}))?\]/g;
      for (i = 0; i < lines.length; i++) {
        var line = lines[i], m;
        RE_TAG.lastIndex = 0;
        if (!RE_TAG.test(line)) { out.push(line); continue; }
        RE_TAG.lastIndex = 0;
        out.push(line.replace(RE_TAG, function (tag) {
          if (k >= cues.length) { ok = false; return tag; }
          return '[' + lrcTime(cues[k++].start) + ']';
        }));
      }
      return (ok && k === cues.length) ? out.join('\n') : null;
    }

    var re = (fmt === 'sbv') ? RE_SBV : RE_SRT;
    var fmtFn = (fmt === 'sbv') ? sbvTime : (fmt === 'vtt' ? vttTime : srtTime);
    for (i = 0; i < lines.length; i++) {
      var row = lines[i];
      var mm = row.match(re);
      if (!mm) { out.push(row); continue; }
      if (k >= cues.length) { ok = false; break; }
      var c = cues[k];
      if (fmt === 'sbv') {
        out.push(sbvTime(c.start) + ',' + sbvTime(c.end));
      } else {
        /* 保留原文里毫秒那一位用的是逗号还是点号 —— SRT 两种写法都有，别替用户换 */
        var sep1 = /,\d/.test(mm[0]) ? ',' : '.';
        var head2 = row.slice(0, mm.index);
        var tail2 = row.slice(mm.index + mm[0].length);
        var lead = (mm[0].match(/^\s*/) || [''])[0];
        head2 += lead;
        var mid = (mm[0].match(/\s*-->\s*/) || [' --> '])[0];
        out.push(head2 + fmtFn(c.start).replace(',', sep1) + mid + fmtFn(c.end).replace(',', sep1) + tail2);
      }
      k++;
    }
    return (ok && k === cues.length) ? out.join('\n') : null;
  }
  /* 页面决定走哪条路：条目数没变就保真改写，变了就只能重新生成（但仍把样式带回去） */
  function render(src, fmt, cues) {
    var rw = rewriteTimes(src, fmt, cues);
    if (rw != null) return rw;
    return dump(cues, fmt, src);
  }

  root.ShiftCore = {
    FORMATS: FORMATS,
    READABLE: READABLE,
    detect: detect,
    parse: parse,
    head: head,
    dump: dump,
    rewriteTimes: rewriteTimes,
    render: render,
    outName: outName,
    apply: apply,
    valid: valid,
    STEP_DEFS: STEP_DEFS,
    STEP_ORDER: STEP_ORDER,
    mkStep: mkStep,
    stepValid: stepValid,
    applySteps: applySteps,
    info: info,
    mergeGap: mergeGap,
    splitByDur: splitByDur,
    splitByChars: splitByChars,
    applyOps: applyOps,
    scriptOf: scriptOf,
    isBilingualCue: isBilingualCue,
    parseUserTime: parseUserTime,
    time: { srt: srtTime, vtt: vttTime, sbv: sbvTime, lrc: lrcTime, ass: assTime }
  };
})(window);
