/* glossary-core.js —— 术语批量替换页的独立引擎（v0.9.302）
 *
 * ⚠️ 三件套硬隔离（用户定案 2026-10-10）：本文件只被 glossary.html 加载，
 *    不引入、不修改任何现有引擎。
 *    - 解析与导出（SRT / VTT / ASS / SSA / SBV / LRC / TXT）：从 shift-core.js v0.9.301
 *      **复制后另写**，含 ASS 的 _x（Layer/Style/边距/Effect）与 VTT 的 cue settings。
 *      ⚠️ VTT 的「无小时位」写法（MM:SS.mmm）带上了 extract-core 那版修正 RE_VTT2 ——
 *        shift-core / convert-core 的同名 bug 别带过来。
 *    - 保真改写 rewriteTexts：本页改的是**文字**不是时间，所以这条路是新写的
 *      （shift-core 的 rewriteTimes 同理：只动该动的那些字符，其余一字不动）
 *    - 术语替换：本页新写
 *    ⇒ 改这里不会碰到任何原有页面的行为。
 *
 * 浏览器 <script src> 直接加载；Node 里用 vm + window 桩（与 shift-core.js 同款）。
 */
(function (root) {
  'use strict';

  /* =====================================================================
     一、时间码
     ===================================================================== */
  function pad(n, w) { n = String(n); while (n.length < w) n = '0' + n; return n; }
  function hms(ms) {
    ms = Math.max(0, Math.round(ms));
    return { h: Math.floor(ms / 3600000), m: Math.floor(ms % 3600000 / 60000),
      s: Math.floor(ms % 60000 / 1000), ms: ms % 1000 };
  }
  function srtTime(ms) { var t = hms(ms); return pad(t.h, 2) + ':' + pad(t.m, 2) + ':' + pad(t.s, 2) + ',' + pad(t.ms, 3); }
  function vttTime(ms) { var t = hms(ms); return pad(t.h, 2) + ':' + pad(t.m, 2) + ':' + pad(t.s, 2) + '.' + pad(t.ms, 3); }
  function sbvTime(ms) { var t = hms(ms); return t.h + ':' + pad(t.m, 2) + ':' + pad(t.s, 2) + '.' + pad(t.ms, 3); }
  /* LRC 的时间戳是 [分:秒.厘]，没有小时位 —— 别把「分」当「时」读 */
  function lrcTime(ms) {
    var t = hms(ms);
    return pad(t.h * 60 + t.m, 2) + ':' + pad(t.s, 2) + '.' + pad(Math.floor(t.ms / 10), 2);
  }
  function assTime(ms) { var t = hms(ms); return t.h + ':' + pad(t.m, 2) + ':' + pad(t.s, 2) + '.' + pad(Math.floor(t.ms / 10), 2); }
  function parseHMS(h, m, s, frac) {
    var v = Number(h) * 3600000 + Number(m) * 60000 + Number(s) * 1000;
    var f = String(frac || '0');
    while (f.length < 3) f += '0';
    return v + Number(f.slice(0, 3));
  }

  /* =====================================================================
     二、文字系统（判断双语用）
     ===================================================================== */
  /* 只按字符形态判断，不猜语种：猜错会静默改掉不该改的字幕，形态判断稳得多。 */
  var RE_HAN = /[㐀-䶿一-鿿豈-﫿]/;
  var RE_KANA = /[぀-ヿㇰ-ㇿ]/;
  var RE_HANGUL = /[가-힯ᄀ-ᇿ]/;
  var RE_ARAB = /[؀-ۿ]/;
  var RE_CYR = /[Ѐ-ӿ]/;
  var RE_THAI = /[฀-๿]/;
  var RE_DEV = /[ऀ-ॿ]/;
  var RE_HEB = /[֐-׿]/;
  var RE_GREEK = /[Ͱ-Ͽ]/;
  var RE_LATIN = /[A-Za-zÀ-ÿĀ-ſ]/;
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
  /* 一条里出现两套以上书写系统 = 双语。纯英文长句折行成两行只有一套，不会误判。 */
  function isBilingualCue(cue) {
    var lines = plain(cue && cue.text).split('\n').filter(function (x) { return x.trim(); });
    if (lines.length < 2) return false;
    return trackScripts(cue.text).n >= 2;
  }

  /* =====================================================================
     三、文本清洗（去 ASS 特效标记 / 统一换行，预览与统计时用）
     ===================================================================== */
  function stripAssTags(s) { return String(s).replace(/\{[^}]*\}/g, ''); }
  function normBreaks(s) { return String(s).replace(/\\N/gi, '\n'); }
  function plain(s) { return normBreaks(stripAssTags(s)).replace(/\r\n?/g, '\n').replace(/\n{3,}/g, '\n\n'); }

  /* =====================================================================
     四、读取
     ===================================================================== */
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

  /* VTT 允许无小时位（MM:SS.mmm）—— 三段式 RE_SRT 罩不住，单独给一条两段式 */
  var RE_VTT2 = /^\s*(\d{1,2}):(\d{2})\.(\d{1,3})\s*-->\s*(?:(\d{1,3}):)?(\d{1,2}):(\d{2})\.(\d{1,3})/;
  /* 时间行尾部 align:middle 这类设置属于样式不是正文 —— 摘出来原样带回。
     ⚠️ 首尾空白在这里就抹掉：导出时固定补一个空格，不然会拼出两个空格。 */
  function settingsOf(line, m) {
    return line.slice(m[0].length).replace(/^\s+/, '').replace(/\s+$/, '');
  }
  function parseVtt(text) {
    var lines = String(text).replace(/\r\n?/g, '\n').split('\n');
    var out = [], cur = null, i;
    function flush() {
      if (cur && cur.text.replace(/\s/g, '') !== '') out.push(cur);
      cur = null;
    }
    for (i = 0; i < lines.length; i++) {
      var line = lines[i];
      if (/^WEBVTT/i.test(line)) { flush(); continue; }
      if (/^(NOTE|STYLE|REGION)\b/.test(line)) {
        flush();
        while (i + 1 < lines.length && lines[i + 1].trim() !== '') i++;
        continue;
      }
      var m = line.match(RE_SRT), st, en, sg;
      if (m) {
        st = parseHMS(m[1], m[2], m[3], m[4]); en = parseHMS(m[5], m[6], m[7], m[8]); sg = settingsOf(line, m);
      } else {
        var m2 = line.match(RE_VTT2);
        if (!m2) {
          if (cur === null) continue;
          if (line.trim() === '') { flush(); continue; }
          cur.text += (cur.text ? '\n' : '') + line;
          continue;
        }
        st = parseHMS('0', m2[1], m2[2], m2[3]);
        en = parseHMS(m2[4] || '0', m2[5], m2[6], m2[7]);
        sg = settingsOf(line, m2);
      }
      flush();
      cur = { start: st, end: en, text: '', _x: { settings: sg } };
    }
    flush();
    return out;
  }

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
      out.push({
        start: parseHMS(sm[1], sm[2], sm[3], (sm[4] + '00').slice(0, 3)),
        end: parseHMS(em[1], em[2], em[3], (em[4] + '00').slice(0, 3)),
        text: p.slice(9).join(','),
        /* 除时间外每一列都原样带回来，导出时一字不差地写回去 */
        _x: { layer: p[0].trim(), style: p[3], name: p[4], ml: p[5], mr: p[6], mv: p[7], effect: p[8] }
      });
    }
    return out;
  }

  function parseLrc(text) {
    var lines = String(text).replace(/\r\n?/g, '\n').split('\n');
    var raw = [], i;
    var RE_TAG = /\[(\d{1,3}):(\d{2})(?:[.:](\d{1,3}))?\]/g;
    for (i = 0; i < lines.length; i++) {
      var m, tags = [];
      RE_TAG.lastIndex = 0;
      while ((m = RE_TAG.exec(lines[i]))) tags.push(parseHMS('0', m[1], m[2], m[3] || '0'));
      if (!tags.length) continue;
      var body = lines[i].replace(RE_TAG, '').trim();
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

  /* 文件头（ASS 的 Script Info / 样式表，VTT 的 WEBVTT 与 NOTE 块）—— 导出时原样带回 */
  function headOf(src, fmt) {
    var lines = String(src || '').replace(/\r\n?/g, '\n').split('\n');
    var out = [], i;
    if (fmt === 'ass' || fmt === 'ssa') {
      var inEvents = false;
      for (i = 0; i < lines.length; i++) {
        var ln = lines[i];
        if (/^\[/i.test(ln.trim())) inEvents = /^\[events\]/i.test(ln.trim());
        out.push(ln);
        if (inEvents && /^Format:/i.test(ln.trim())) break;
      }
      return out.join('\n').replace(/\n+$/, '') + '\n';
    }
    if (fmt === 'vtt') {
      for (i = 0; i < lines.length; i++) {
        if (RE_SRT.test(lines[i]) || RE_VTT2.test(lines[i])) break;
        out.push(lines[i]);
      }
      while (out.length && /^\s*\d+\s*$/.test(out[out.length - 1])) out.pop();
      var h = out.join('\n').replace(/\s+$/, '');
      return h ? h + '\n\n' : 'WEBVTT\n\n';
    }
    return '';
  }

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
    if (/^\s*\d{1,2}:\d{2}\.\d{1,3}\s*-->/.test(s)) return 'vtt';
    if (s.trim()) return 'txt';
    return null;
  }

  var READ = { srt: parseSrt, vtt: parseVtt, ass: parseAss, ssa: parseAss, sbv: parseSbv, lrc: parseLrc, txt: parseTxt };
  var READABLE = ['srt', 'vtt', 'ass', 'ssa', 'sbv', 'lrc', 'txt'];

  function parse(text, fmt) {
    var fn = READ[fmt];
    if (!fn) return null;
    return fn(text).map(function (c) {
      return {
        start: c.start,
        end: (c.end > c.start ? c.end : c.start + 1),
        text: String(c.text == null ? '' : c.text),
        _x: c._x || null
      };
    });
  }

  /* =====================================================================
     五、导出
     ===================================================================== */
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

  var WRITE = {
    srt: function (c) { return dumpSrt(c); },
    vtt: function (c, h) { return dumpVtt(c, h); },
    ass: function (c, h) { return dumpAss(c, h); },
    ssa: function (c, h) { return dumpAss(c, h); },
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
    if (m) return f;
    return f + '.' + (fmt || 'srt');
  }

  /* =====================================================================
     六、保真改写：只动正文那几个字符
     ---------------------------------------------------------------------
     本页改的是文字不是时间，条目数没变时走这条路：整份文件逐行扫，认出某条的正文就换成新文字，
     序号 / 时间 / ASS 的 Layer / Style / 边距 / Effect / VTT 的 NOTE 块与 cue 设置，一个字符都不动。
     返回 null = 这条路走不通（条目数对不上、新的正文变成了空），页面改用 dump。
     ===================================================================== */
  function rewriteTexts(src, fmt, cues) {
    if (!src || !cues || !cues.length) return null;
    /* 歌词一个时间戳可能对应多句话（parseLrc 会展开），原样改写会串行 —— 走 dump 更稳 */
    if (fmt === 'lrc') return null;
    if (!READ[fmt]) return null;

    /* 新正文必须是「有内容的一行或多行」。空掉一条会让后面的行对不上号，直接退回 dump */
    var i, txt;
    for (i = 0; i < cues.length; i++) {
      txt = String(cues[i].text == null ? '' : cues[i].text);
      if (!txt.replace(/\s/g, '')) return null;
      if (/\n{3,}/.test(txt)) return null;
    }

    var lines = String(src).replace(/\r\n?/g, '\n').split('\n');
    var out = [], k = 0;

    if (fmt === 'ass' || fmt === 'ssa') {
      for (i = 0; i < lines.length; i++) {
        var ln = lines[i];
        /* Comment 行不是正文（parseAss 也跳过），保持原样 */
        if (!/^\s*Dialogue:/i.test(ln)) { out.push(ln); continue; }
        var p = ln.split(',');
        if (p.length < 10) { out.push(ln); continue; }
        if (k >= cues.length) return null;
        out.push(p.slice(0, 9).join(',') + ',' + String(cues[k].text));
        k++;
      }
      return (k === cues.length) ? out.join('\n') : null;
    }

    if (fmt === 'txt') {
      for (i = 0; i < lines.length; i++) {
        if (!lines[i].trim()) { out.push(lines[i]); continue; }
        if (k >= cues.length) return null;
        out.push(String(cues[k].text).split('\n').join('\n'));
        k++;
      }
      return (k === cues.length) ? out.join('\n') : null;
    }

    var re = (fmt === 'sbv') ? RE_SBV : RE_SRT;
    var isTimeLine = function (ln) {
      if (re.test(ln)) return true;
      return (fmt === 'vtt') && RE_VTT2.test(ln);
    };
    for (i = 0; i < lines.length; i++) {
      var row = lines[i];
      if (fmt === 'vtt' && /^WEBVTT/i.test(row)) { out.push(row); continue; }
      if (fmt === 'vtt' && /^(NOTE|STYLE|REGION)\b/.test(row)) {
        out.push(row);
        while (i + 1 < lines.length && lines[i + 1].trim() !== '') { i++; out.push(lines[i]); }
        continue;
      }
      if (!isTimeLine(row)) { out.push(row); continue; }
      if (k >= cues.length) return null;
      out.push(row);
      /* 跳过这一条原来的正文行。⚠️ 判据是「下一行的开头是不是下一条」，不是「有没有空行」——
         缺空行的 SRT（下一行就是序号 2）在这里会被整份吃掉的写法在上面 20 行处见过一次。 */
      var guard = i + 1;
      while (guard < lines.length && lines[guard].trim() !== '' && !isTimeLine(lines[guard])) {
        /* 纯数字 + 下一行是时间行 = 下一条的序号，不是本条的正文 */
        if (/^\s*\d+\s*$/.test(lines[guard]) && guard + 1 < lines.length && isTimeLine(lines[guard + 1])) break;
        guard++;
      }
      String(cues[k].text).split('\n').forEach(function (ln2) { out.push(ln2); });
      i = guard - 1;
      k++;
    }
    return (k === cues.length) ? out.join('\n') : null;
  }
  /* 页面决定走哪条路：能对上号就保真改写，对不上就重新生成（但仍把样式带回去） */
  function render(src, fmt, cues) {
    var rw = rewriteTexts(src, fmt, cues);
    if (rw != null) return rw;
    return dump(cues, fmt, src);
  }

  /* =====================================================================
     七、v0.9.302：术语批量替换
     ---------------------------------------------------------------------
     一份术语表（原词 -> 新词）套到整份字幕上。纯文本替换，不碰时间轴、不碰样式。
     ⚠️ 三条定案（写代码时别绕开）：
       ① 分隔符只认这四种：`->` / `=>` / `→` / Tab。逗号不当分隔符 —— 英文句子里的逗号太多，
          拿它当分隔符会把半句话吃成术语。
       ② 「整词匹配」只对**用空格分词**的文字系统有意义（294 判据）：原词首尾是拉丁字母/数字
          才判词边界；中文 / 日文 / 泰文这类按子串处理（「大模型」不该因为前后是汉字就不替换）。
       ③ 「替换哪一轨」不猜语言。双语条目是「一条两行」还是「两条同轴」千差万别，
          谁是译文并不固定（290 定案），所以让用户直接选「第 1 行 / 第 2 行」，单行条目不动。
     ===================================================================== */

  /* 术语表里的一行：`原词 -> 新词`。# 开头的当注释跳过；认不出的行进 bad 列表回报，不静默吞掉 */
  function parseTerms(text) {
    var out = [], bad = [], i, raw, m;
    var lines = String(text == null ? '' : text).replace(/\r\n?/g, '\n').split('\n');
    for (i = 0; i < lines.length; i++) {
      raw = lines[i].trim();
      if (!raw || raw.charAt(0) === '#') continue;
      m = raw.match(/^(.*?)\s*(?:=>|->|→|\t)\s*(.*)$/);
      if (!m || !m[1].trim()) { bad.push({ line: i + 1, text: raw.slice(0, 60) }); continue; }
      out.push({ from: m[1].trim(), to: m[2].trim(), line: i + 1 });
    }
    return { terms: out, bad: bad };
  }

  function escRe(s) { return String(s).replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
  function isWordChar(ch) { return !!ch && /[A-Za-z0-9_]/.test(ch); }

  /* 在一行文本里替换一个术语。
     ⚠️ 词边界靠「手工检查前后各一个字符」，不用 lookbehind（(?<!…) 在老 Safari 上直接抛语法错，
        整页就废了）。也因此不能用「吃掉分隔符再吐回来」的写法 —— 那样连着的两个词只会换掉头一个。 */
  function replaceTerm(text, from, to, opts) {
    var o = opts || {};
    if (!from) return { text: text, n: 0 };
    var needLead = !!o.whole && isWordChar(from.charAt(0));
    var needTail = !!o.whole && isWordChar(from.charAt(from.length - 1));
    var re = new RegExp(escRe(from), o.caseSensitive ? 'g' : 'gi');
    var out = '', last = 0, m, n = 0, after;
    while ((m = re.exec(text))) {
      after = m.index + m[0].length;
      if (m[0] === '') { re.lastIndex++; continue; }          /* 空匹配保护（原词不该为空，保险） */
      if ((needLead && m.index > 0 && isWordChar(text.charAt(m.index - 1))) ||
          (needTail && after < text.length && isWordChar(text.charAt(after)))) {
        re.lastIndex = m.index + 1;                            /* 不在词边界上：挪一位继续找 */
        continue;
      }
      out += text.slice(last, m.index) + to;
      last = after;
      n++;
    }
    return { text: out + text.slice(last), n: n };
  }

  /* 把一条字幕拆成 [行, 分隔符, 行, 分隔符, …] —— 偶数位是内容，奇数位是换行符本身。
     这样拼回去时 `\n` 与 ASS 的 `\N` 都保持原样，不会被统一成一种。 */
  function splitKeepBreaks(text) {
    return String(text == null ? '' : text).split(/(\\N|\n|\r\n?)/i);
  }

  /* ⚠️ 排版指令本身不参与替换：ASS 的 {\fnArial\fs54} 整块是效果指令，VTT / SRT 的 <font color=…>
     标签本体也是排版 —— 术语要是恰好是其中一个片段（\pos 里的 pos、字体名里的单词）会被误伤，
     换掉了等于改坏了样式。偶数位是正文（含被 <i> 斜体包住的那段话），奇数位是排版指令本身。 */
  var RE_TAG_BLOCK = /(\{[^}]*\}|<[^>]*>)/g;
  function replaceInText(s, terms, o) {
    var parts = String(s).split(RE_TAG_BLOCK);
    var n = 0, i, k;
    for (i = 0; i < parts.length; i += 2) {
      for (k = 0; k < terms.length; k++) {
        var r = replaceTerm(parts[i], terms[k].from, terms[k].to, o);
        if (r.n) { parts[i] = r.text; n += r.n; terms[k]._used = true; }
      }
    }
    return { text: parts.join(''), n: n };
  }

  /* 套用术语表。纯函数：不写回传进来的那份，返回新的一份 + 统计。
     opts = { whole, caseSensitive, scope: 'all'|'first'|'second', skip: { 第几条: true } } */
  function applyTerms(cues, terms, opts) {
    var o = opts || {}, scope = o.scope || 'all', skip = o.skip || {};
    var list = [], i, k;
    for (k = 0; k < terms.length; k++) list.push({ from: terms[k].from, to: terms[k].to, _used: false });
    var out = [], hits = [], stat = { repl: 0, cues: 0, terms: list.length, unused: [] };
    for (i = 0; i < (cues || []).length; i++) {
      var c = cues[i];
      if (skip[i]) { out.push(c); continue; }
      var parts = splitKeepBreaks(c.text), contentIdx = [], li;
      for (li = 0; li < parts.length; li += 2) contentIdx.push(li);
      var multi = contentIdx.length > 1;
      var n0 = 0, changed = false;
      for (var ci = 0; ci < contentIdx.length; ci++) {
        var at = contentIdx[ci];
        /* 只有「多行条目」才谈得上第 1 行 / 第 2 行；单行条目在两档下都不动（别猜谁是原文） */
        if (scope === 'first' && !(multi && ci === 0)) continue;
        if (scope === 'second' && !(multi && ci === 1)) continue;
        var r = replaceInText(parts[at], list, o);
        if (r.n) {
          parts[at] = r.text;
          n0 += r.n;
          stat.repl += r.n;
          changed = true;
        }
      }
      if (changed) {
        stat.cues++;
        var nc = {}; for (var kk in c) if (Object.prototype.hasOwnProperty.call(c, kk)) nc[kk] = c[kk];
        nc.text = parts.join('');
        out.push(nc);
        hits.push({ i: i, n: n0, before: plain(c.text), after: plain(nc.text) });
      } else {
        out.push(c);
      }
    }
    for (i = 0; i < list.length; i++) if (!list[i]._used) stat.unused.push(list[i].from);
    return { cues: out, stat: stat, hits: hits };
  }

  /* 「填个示例」按钮用：三条就够说明格式 */
  var SAMPLE = 'New York -> 纽约\nCEO -> 首席执行官\nOK -> 好的';
  /* 术语表导出/导入用的小工具：把 [{from,to}] 拼回文本 */
  function dumpTerms(terms) {
    return (terms || []).map(function (t) { return t.from + ' -> ' + t.to; }).join('\n') + ((terms || []).length ? '\n' : '');
  }

  root.GlossaryCore = {
    FORMATS: FORMATS,
    READABLE: READABLE,
    detect: detect,
    parse: parse,
    head: head,
    dump: dump,
    rewriteTexts: rewriteTexts,
    render: render,
    outName: outName,
    plain: plain,
    scriptOf: scriptOf,
    isBilingualCue: isBilingualCue,
    parseTerms: parseTerms,
    applyTerms: applyTerms,
    replaceTerm: replaceTerm,
    dumpTerms: dumpTerms,
    SAMPLE: SAMPLE,
    time: { srt: srtTime, vtt: vttTime, sbv: sbvTime, lrc: lrcTime, ass: assTime }
  };
})(window);
