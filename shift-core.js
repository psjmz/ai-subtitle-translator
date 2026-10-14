/* shift-core.js —— 时间轴调整页的独立引擎（v0.9.295）
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

    ⚠️ v0.9.295：多了「时间轴体检」。checkCues 按常见字幕规范扫一遍（停留太短 / 太长 / 读不完 /
        一行太宽 / 挨太近 / 重叠），只把「哪一条值得看一眼」列出来；suggest 给每一条「可以这样改」，
        落到 op 上一看就懂。**一个字都不自动改** —— 自动修会动到用户刻意保留的地方。

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

  /* 形态 B 的双语：原文一条、译文一条，两条**同轴**（起止几乎相同）。
     这是双语字幕的正常写法 —— 播放器把两条各排一行，看着是「上下两行」，不是「叠在一起」。
     ⚠️ v0.9.303：体检原来只看时间关系，把这种一对当成「重叠」逐条报错。
        更糟的是建议里给的「往后挪开」会把译文挪到原文之后 100ms —— 那才是真把双语毁了。
        所以判据要落在「是不是一对」上，不是「时间有没有重合」上。 */
  var ALIGN_TOL = 120;   /* 同轴容差：比 OVERLAP_TOL 宽，吸收帧率换算与手工微调的几十毫秒 */
  function isBilingualPair(a, b) {
    if (!a || !b) return false;
    /* 起止各自对得上才算同轴 —— 只起点相同、终点差一大截的，是时间轴没对齐，照报 */
    if (Math.abs(a.start - b.start) > ALIGN_TOL) return false;
    if (Math.abs(a.end - b.end) > ALIGN_TOL) return false;
    /* 分属两套书写系统。一方认不出（纯数字、纯标点、空行）就不认这一对 ——
       宁可报出来让人看一眼，也不替用户把可疑的重复条目悄悄放过 */
    var sa = scriptOf(a.text), sb = scriptOf(b.text);
    return sa !== sb && sa !== 'other' && sb !== 'other';
  }
  /* 沿列表往前/往后找「时间上真正的邻居」—— 跳过同轴的双语伙伴。
     形态 B 里 list[i-1] 是同一句的另一种语言，不是「上一条」，
     拿它算「最晚能撑到哪」「跟谁合并」会给出荒谬的答案。 */
  function prevTemporal(list, i) {
    for (var j = i - 1; j >= 0; j--) if (!isBilingualPair(list[j], list[i])) return list[j];
    return null;
  }
  function nextTemporal(list, i) {
    for (var j = i + 1; j < list.length; j++) if (!isBilingualPair(list[j], list[i])) return list[j];
    return null;
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
     {op:'split', i, n} v0.9.295：切成 n 段（体检建议「太长」时用，n 由规则算出）
     {op:'set', i, s, e} 直接改第 i 条的起止
     ⚠️ n 缺省是 2 —— 292/294 记下的老 ops 没有这个字段，行为必须一模一样
     ⚠️ v0.9.303：ops 的元素也可以是**一组**操作（数组）。形态 B 的「成对延长」就是一组 ——
        两条必须一起改，只改一条会让它们错开、下一轮体检又报重叠。
        分组只是记账单位：撤销时 pop 一次正好撤掉一整组，不会出现「撤一半」的中间态。 */
  function flattenOps(ops) {
    var out = [];
    (ops || []).forEach(function (o) {
      if (!o) return;
      if (Array.isArray(o)) { o.forEach(function (x) { if (x) out.push(x); }); return; }
      out.push(o);
    });
    return out;
  }
  function applyOps(cues, ops) {
    var list = clone(cues);
    flattenOps(ops).forEach(function (o) {
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
        /* ⚠️ 双语条目不许拆（splitCue 不认这条，得在这里拦）：
           切开就变成「原文半句 + 译文半句」这种谁都看不懂的东西 */
        var src = list[i];
        if (isBilingualCue(src)) return;
        var want = Math.max(2, Math.round(isNum(o.n) ? o.n : 2));
        var segs = splitCue(src, want);
        if (!segs) return;
        var repl = segs.slice();
        list.splice.apply(list, [i, 1].concat(repl));
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

  /* ================= v0.9.295：时间轴体检 ================= */
  /* ⚠️ 只标注，不自动改。用户决定哪一条要动 —— 自动修会动到他刻意保留的地方
     （一句歌词跨两行显示、人名后故意留的空档，都是「不合规但故意的」）。
     本模块的输出只有两种：「这里有 N 条值得看一眼」和「这几条可以这样改」。
     改不改仍是一次 pushOp，和手工按钮走同一条路（能撤销，能重放）。 */
  var CHECK_RULES = {
    /* v0.9.300：四把尺子对齐行业通行规范（Netflix Timed Text Style Guide 为主）。
       宽度单位 = 全角字（汉字/假名/谚文记 1，两个拉丁字母记 1），wOf 的口径。 */
    minDur: 833,      /* 一条最短要停多久（毫秒）—— Netflix：5/6 秒（24fps 下 20 帧） */
    maxDur: 7000,     /* 一条最长停多久（毫秒）—— Netflix：7 秒 */
    maxCps: 9,        /* 每秒最多读多少宽度单位 —— Netflix 简中指南 9 字/秒；拉丁半宽即 18 字符/秒，落在 17~20 区间 */
    maxLine: 21       /* 一行最多多少宽度单位 —— 拉丁 42 字符（Netflix 最常引用的那条）；中文按简中指南可收紧到 16 */
  };
  /* v0.9.301：「两条之间留多大空档」不再当病灶查。
     真实素材里绝大多数相邻对是首尾正好相接（歌词一句接一句唱、听写自动切分都是这个长相），
     拿它当问题查，一份 81 条的字幕能报出 72 条 —— 整份全红等于没说。用户的原话：
     「其实只要字幕没重叠就行」。所以这一版只把「叠在一起」当问题。
     SNAP_GAP 这个数没被删干净，它还剩一个用途：改的时候别贴到邻居身上（挪位 / 补长要留出来）。 */
  var SNAP_GAP = 100;
  /* 几毫秒的「重叠」当作首尾相接：帧率换算（23.976 ↔ 25）会引入这种舍入误差，肉眼看不见 */
  var OVERLAP_TOL = 20;
  /* 体检面板上那四个框怎么排、人读的单位是什么。
     ⚠️ 单位换算只在这一处（raw ↔ 引擎内部的毫秒），页面不许自己 ×1000 —— v0.9.294 的规矩。
     v0.9.301：删掉「最小间隔」那一栏 —— 它已经不参与任何体检，留着只会让人以为调它能消掉红点。 */
  var CHECK_FIELDS = [
    { id: 'minDur', key: 'rlDurMin', unit: 'unitSec', mul: 1000, def: 0.833 },
    { id: 'maxDur', key: 'rlDurMax', unit: 'unitSec', mul: 1000, def: 7 },
    { id: 'maxCps', key: 'rlSpeed', unit: 'unitCps', mul: 1, def: 9 },
    { id: 'maxLine', key: 'rlLine', unit: 'unitChar', mul: 1, def: 21 }
  ];
  /* 页面上那四个框的值（人读单位）→ 引擎内部的规则表。空值 / 非数字退回默认，
     不因为用户把框清了就整份体检跑歪。
     portrait：竖屏（手机 9:16）画面窄 —— 每行字数按行业惯例收到横屏的 60%
     （中文 16→10、拉丁 42→25），时长 / 读速不随方向变。 */
  function uiRules(vals, fmt, portrait) {
    var r = {}, i, f, v;
    for (i = 0; i < CHECK_FIELDS.length; i++) {
      f = CHECK_FIELDS[i];
      v = Number((vals || {})[f.id]);
      r[f.id] = isFinite(v) && v > 0 ? v * f.mul : CHECK_RULES[f.id];
    }
    /* v0.9.300：竖屏开关。maxLine × 0.6 后四舍五入，但别低于 4（一行的最低可读宽度） */
    if (portrait) r.maxLine = Math.max(4, Math.round(r.maxLine * 0.6));
    /* 短规则不能反过来比长规则还宽，用户拖错了按错处理 */
    if (r.minDur > r.maxDur) r.minDur = CHECK_RULES.minDur;
    return r;
  }
  /* 哪些格式值得体检：纯文本压根没有时间轴（每行 3 秒是临时排的），查出来全是噪音 */
  function checkable(fmt) { return !!fmt && fmt !== 'txt'; }

  function cueLines(cue) {
    return plain(cue && cue.text).split('\n').filter(function (x) { return x.trim(); });
  }
  /* 一行占多宽：取最宽的那一行 —— 决定字幕宽度的永远是那一行 */
  function cueWidth(cue) {
    var ls = cueLines(cue), mx = 0, i;
    for (i = 0; i < ls.length; i++) mx = Math.max(mx, wOf(ls[i]));
    return mx;
  }
  /* 一条平均每秒要读多少 —— 按宽度算，中英混排也算得平 */
  function cueCps(cue) {
    var d = cue.end - cue.start;
    if (d <= 0) return Infinity;
    return cueWidth(cue) / (d / 1000);
  }

  /* 扫一遍当前时间轴，返回问题清单 [{ i, why:['short','fast',…] }]。
     ⚠️ i 是当下这张列表的下标；用户动过任何一条之后下标就变了 ——
        所以页面每次重算都整份重扫，不许缓存上一次的结果。
     short   停留比 minDur 还短，观众来不及读完
     long    停留比 maxDur 还长，这句在屏幕上挂太久
     fast    读速超过 maxCps，字多时间少
     line    单行宽度超过 maxLine，会折行占屏
     rows    一条超过两行 —— Netflix「每条最多 2 行」，两大最常触发的规则之一
     overlap 开始于上一条还没结束 —— 两条会叠在屏幕上同一个位置（v0.9.301 起只留这一条时间关系判据）

     ⚠️ v0.9.301：原来还有一条 gap（两条之间的空档不足）。它被删掉了，原因是实测：
        一份 81 条的真实字幕里 68 处是「上一条的终点 = 下一条的起点」，占相邻对的 90% ——
        逐条报出来就是 72 条全红。这是素材本身的切法（歌词一句接一句、听写自动切分都这样），
        不是错误。用户的原话：「其实只要字幕没重叠就行」。
     ⚠️ 双语条目（原文一行 + 译文一行）只查它与相邻两条的时间关系，不查停留时长、行宽和行数：
        一条双语顶两条的信息量，拿单语的尺子量它不公平（8 秒停留对双语是正常的），
        而「切分」这类动作作用在它身上会把原文和译文劈成两半。
     ⚠️ 检测阈值只留 2% 的小余量（v0.9.300 收紧：原来 short 也吃 maxDur 的 2%=140ms，
        700 的尺子实际 560 才响，比规范松了一大截）。「采纳建议后还是红的」那类余量
        由 suggest 侧自己兜底 —— 延长按 want 精确给、切分有最宽段复核的 guard 循环。 */
  function checkCues(cues, rules) {
    var r = rules || CHECK_RULES, list = cues || [], out = [], i;
    var tolShort = Math.max(20, r.minDur * 0.02), tolLong = Math.max(50, r.maxDur * 0.02);
    for (i = 0; i < list.length; i++) {
      var c = list[i], why = [], dur = c.end - c.start, w = cueWidth(c);
      if (!isBilingualCue(c)) {
        if (dur < r.minDur - tolShort) why.push('short');
        if (dur > r.maxDur + tolLong) why.push('long');
        if (isFinite(cueCps(c)) && cueCps(c) > r.maxCps * 1.02) why.push('fast');
        /* 行宽只留 0.25 的浮点余量：42 个拉丁字母 = 21.0 正好压线放行，43 个 = 21.5 必须报 */
        if (w > r.maxLine + 0.25) why.push('line');
        if (cueLines(c).length > 2) why.push('rows');
      }
      /* 「首尾相接」不算问题（end == 下一条的 start 是真实素材最常见的切法），
         只有真的叠在同一段时间里才报 —— 几毫秒的舍入误差仍按相接处理。
         ⚠️ v0.9.303：形态 B 的双语对（原文一条 + 译文一条，起止对得上）不报。
            它们本来就该同轴，报出来就是每对必红一条；而「往后挪开」的建议会把译文
            挪到原文之后，那才是真把双语毁了。判据见 isBilingualPair。 */
      if (i > 0 && list[i - 1].end - c.start > OVERLAP_TOL
        && !isBilingualPair(list[i - 1], c)) why.push('overlap');
      if (why.length) out.push({ i: i, why: why });
    }
    return out;
  }

  /* 一条问题「可以怎么办」。返回 [{ k: 文案键, op }]，op 直接就是 applyOps 认识的形状
     —— 页面点一下就 pushOp，不再翻译一层，也不会出现「建议和实际动作不一致」。
     ⚠️ 任何改动都不许压到相邻那条身上：顺着把下一条挤走只是把问题搬了个地方。 */
  function suggest(list, issue, rules) {
    var r = rules || CHECK_RULES, i = issue.i, c = list[i], out = [], seen = {};
    if (!c) return out;
    var why = issue.why || [], dur = c.end - c.start, w = cueWidth(c);
    /* 「邻居」要跳过同轴的双语伙伴：形态 B 里 list[i-1] 是同一句的另一种语言，
       拿它算「最晚能撑到哪」会得出 c.start - 100 这种荒谬的上限，延长建议直接被吞掉。 */
    var prev = prevTemporal(list, i), next = nextTemporal(list, i);
    /* 同轴伙伴的下标（形态 B）。找着了就意味着：动这一条必须连伙伴一起动，
       否则两条错开、下一次体检就把它们当重叠报出来 —— 从一个 bug 滚成另一个。 */
    var mate = -1;
    if (isBilingualPair(list[i - 1], c)) mate = i - 1;
    else if (isBilingualPair(c, list[i + 1])) mate = i + 1;
    function add(k, op) {
      var key = JSON.stringify(op);
      if (seen[key]) return;
      seen[key] = 1;
      out.push({ k: k, op: op });
    }
    var ceilEnd = next ? next.start - SNAP_GAP : Infinity;   /* 这一条最晚能撑到哪 */

    /* 双语条目（原文一行 + 译文一行）不给任何「切开」的建议：切开会变成
       「半句原文 + 半句译文」，谁都看不懂。这一刀之所以放在这里而不是只依赖
       checkCues —— 万一将来别的 pathways 也给双语报了 long，这里仍拦得住。 */
    if (isBilingualCue(c)) {
      why = why.filter(function (x) { return x !== 'long' && x !== 'line' && x !== 'fast' && x !== 'short' && x !== 'rows'; });
    }
    if (!why.length) return out;

    if (why.indexOf('overlap') >= 0) {
      if (prev) {
        add('btnMergePrev', { op: 'merge', i: i - 1 });
        var ns = prev.end + SNAP_GAP;
        add('btnPush', { op: 'set', i: i, s: ns, e: Math.max(c.end, ns + Math.min(dur, r.minDur)) });
      }
    }
    /* 时长类：短了就补到「最短停留」和「读得完」里更宽的那个，补齐一条整的要多久 */
    var want = 0;
    if (why.indexOf('short') >= 0) want = Math.max(want, r.minDur);
    if (why.indexOf('fast') >= 0) want = Math.max(want, Math.round(w / r.maxCps * 1000));
    if (want > dur) {
      var e2 = Math.min(c.start + want, ceilEnd);
      if (e2 > c.end) {
        /* 形态 B：两条一起延，并且保留它们之间原来那点起止偏差
           —— 有的字幕是故意让译文晚几十毫秒出现的，顺手抹平等于替用户改了主意 */
        if (mate >= 0) {
          add('btnLengthen', [
            { op: 'set', i: i, s: c.start, e: e2 },
            { op: 'set', i: mate, s: list[mate].start, e: e2 + (list[mate].end - c.end) }
          ]);
        } else {
          add('btnLengthen', { op: 'set', i: i, s: c.start, e: e2 });
        }
      }
    }
    /* 太长 / 一行太宽 / 行数超两条的切开：段数按「最长停留」「最宽行」「行数÷2」三把尺子取最大的那个。
       ⚠️ 算出来还得按「最宽那一段能占多少时间」复核一遍：各段字数不可能一模一样，
          21 秒 ÷ 7 秒 = 3 段是纸面上的答案，可占字数最多的那段实际是 7.2 秒 ——
          采纳完往下看还是红的，用户只会觉得工具没干活。这里按最宽段反推补几段。 */
    /* 形态 B 不给切开建议：切开一条，原文与译文的条数就对不上了，
       剩下那半句会孤零零挂在屏幕上（跟形态 A 不给切开建议同一个道理） */
    if ((why.indexOf('long') >= 0 || why.indexOf('line') >= 0 || why.indexOf('rows') >= 0) && mate < 0) {
      var n = 2;
      if (why.indexOf('long') >= 0) n = Math.max(n, Math.ceil(dur / r.maxDur));
      if (why.indexOf('line') >= 0) n = Math.max(n, Math.ceil(w / r.maxLine));
      /* rows：3 行切 2 条（2+1）、5 行切 3 条（2+2+1）—— splitCue 优先按现有行分组 */
      if (why.indexOf('rows') >= 0) n = Math.max(n, Math.ceil(cueLines(c).length / 2));
      var ceil1 = Math.min(dur, ceilEnd - c.start);
      for (var guard = 0; guard < 4; guard++) {
        /* 切 n 段时最宽那段大约是这个宽度 —— 也是它将分到的时间 */
        var widest = Math.ceil(w / n);
        if (widest * ceil1 / w <= r.maxDur) break;
        n++;
      }
      add('btnSplit', { op: 'split', i: i, n: n });
    }
    /* 形态 B 不给合并建议：把原文和译文并成一条，等于替用户改了字幕的形态 */
    if (why.indexOf('short') >= 0 && mate < 0) {
      if (prev) add('btnMergePrev', { op: 'merge', i: i - 1 });
      else if (next) add('btnMergeNext', { op: 'merge', i: i });
    }
    return out;
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
    isBilingualPair: isBilingualPair,
    ALIGN_TOL: ALIGN_TOL,
    parseUserTime: parseUserTime,
    CHECK_RULES: CHECK_RULES,
    CHECK_FIELDS: CHECK_FIELDS,
    SNAP_GAP: SNAP_GAP,
    OVERLAP_TOL: OVERLAP_TOL,
    uiRules: uiRules,
    checkable: checkable,
    checkCues: checkCues,
    suggest: suggest,
    cueWidth: cueWidth,
    cueCps: cueCps,
    time: { srt: srtTime, vtt: vttTime, sbv: sbvTime, lrc: lrcTime, ass: assTime }
  };
})(window);
