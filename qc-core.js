/* qc-core.js —— 字幕质检引擎（v0.9.321 新增，纯前端自包含）
 *
 * 设计要点：
 *  1) **多语言是第一位的**——每条规则的阈值按「字幕语言」所属的文字系统分档，不是一套
 *     42 字符/25CPS 的西方口径套全球。中英日韩泰阿希伯来各有自己的宽度与阅读速度算法。
 *  2) 统一计量单位「半角宽度」：ASCII/拉丁=1，汉字·假名·谚文·全角标点=2；
 *     组合记号（泰文元音、阿拉伯语音符、天城体符号）计 0 —— 否则泰语/阿拉伯语会被严重高估。
 *     这样 42 宽度 = 拉丁 42 字符 = 中文 21 全角字，与本站既有体检口径（maxLine 21）对齐。
 *  3) 阅读速度同样按宽度/秒：中文 18（=9 全角字/秒，与既有 maxCps 9 对齐），拉丁等 20。
 *  4) 双语条目（形态 A：一条两行分属两种文字；形态 B：两条同轴）识别出来，
 *     阅读速度只算「与字幕语言一致的那一行」，重叠检查整对豁免 —— 否则每条双语都误报。
 *
 * 只输出数据，不碰 DOM、不引 site-i18n；文案全部由调用方（qc.html）按界面语言渲染。
 * ⚠️ 所有字符类一律写 \uXXXX 转义：组合记号/零宽字符直接进源码会被终端与编辑器吃掉，
 *    实测整段正则当场报废（缺结尾斜杠）—— 这是本文件唯一的硬约束，改正则时别图省事贴原字。
 */
(function (g) {
  'use strict';

  /* ---------- 27 种界面语言 → 文字系统 ---------- */
  var SYS = {
    'zh-CN': 'cjk', 'zh-TW': 'cjk', 'ja': 'cjk',
    'ko': 'hangul',
    'th': 'nospc',
    'en': 'lat', 'es': 'lat', 'pt': 'lat', 'de': 'lat', 'fr': 'lat', 'id': 'lat',
    'vi': 'lat', 'it': 'lat', 'tr': 'lat', 'nl': 'lat', 'pl': 'lat', 'sv': 'lat',
    'cs': 'lat', 'da': 'lat', 'fi': 'lat', 'ro': 'lat',
    'ru': 'cyr', 'uk': 'cyr',
    'el': 'gre',
    'ar': 'arab',
    'he': 'hebr',
    'hi': 'deva'
  };

  /* ---------- 各文字系统的默认阈值（页面上可改；不是任何机构的认证值） ----------
     maxLineW 单行最大宽度（半角单位）
     maxCpsW  阅读速度上限（半角宽度/秒）
     minDur / maxDur 单条停留时长（毫秒） */
  var DEF = {
    cjk:    { maxLineW: 42, maxCpsW: 18, minDur: 833,  maxDur: 7000, maxLines: 2 },
    hangul: { maxLineW: 42, maxCpsW: 18, minDur: 833,  maxDur: 7000, maxLines: 2 },
    nospc:  { maxLineW: 42, maxCpsW: 20, minDur: 833,  maxDur: 7000, maxLines: 2 },
    lat:    { maxLineW: 42, maxCpsW: 20, minDur: 833,  maxDur: 7000, maxLines: 2 },
    cyr:    { maxLineW: 42, maxCpsW: 20, minDur: 833,  maxDur: 7000, maxLines: 2 },
    gre:    { maxLineW: 42, maxCpsW: 20, minDur: 833,  maxDur: 7000, maxLines: 2 },
    arab:   { maxLineW: 42, maxCpsW: 20, minDur: 833,  maxDur: 7000, maxLines: 2 },
    hebr:   { maxLineW: 42, maxCpsW: 20, minDur: 833,  maxDur: 7000, maxLines: 2 },
    deva:   { maxLineW: 42, maxCpsW: 20, minDur: 833,  maxDur: 7000, maxLines: 2 }
  };

  /* 规则表：id → 级别 / 是否可修 / 修的时候动不动时间轴 */
  var RULES = [
    { id: 'rMoj',   lv: 'err',  fix: 0, time: 0 },  /* 乱码字符 / 控制字符 */
    { id: 'rTs',    lv: 'err',  fix: 0, time: 0 },  /* 时间戳格式错 */
    { id: 'rRev',   lv: 'err',  fix: 1, time: 1 },  /* 结束早于开始 */
    { id: 'rIdx',   lv: 'err',  fix: 1, time: 0 },  /* 序号缺失/重复/乱序 */
    { id: 'rEmp',   lv: 'warn', fix: 1, time: 0 },  /* 空条目 */
    { id: 'rOvl',   lv: 'warn', fix: 1, time: 1 },  /* 相邻重叠 */
    { id: 'rShort', lv: 'warn', fix: 1, time: 1 },  /* 停留过短 */
    { id: 'rLong',  lv: 'warn', fix: 1, time: 1 },  /* 停留过长 */
    { id: 'rCps',   lv: 'warn', fix: 0, time: 0 },  /* 阅读速度过快 */
    { id: 'rWid',   lv: 'warn', fix: 1, time: 0 },  /* 单行过宽 */
    { id: 'rLin',   lv: 'warn', fix: 1, time: 0 },  /* 超过两行 */
    { id: 'rBrk',   lv: 'info', fix: 1, time: 0 },  /* 断行不当 */
    { id: 'rTrim',  lv: 'info', fix: 1, time: 0 },  /* 首尾多余空白 */
    { id: 'rSpc',   lv: 'info', fix: 1, time: 0 },  /* 中西文之间缺空格（CJK 专属） */
    { id: 'rBil',   lv: 'info', fix: 0, time: 0 },  /* 双语形态混用 */
    { id: 'rPun',   lv: 'info', fix: 1, time: 0 },  /* 标点不合这门语言的规范（语言专属） */
    { id: 'rDir',   lv: 'info', fix: 0, time: 0 }   /* 书写方向（RTL 语言专属） */
  ];

  /* ---------- 宽度计算 ---------- */
  /* 零宽度 / 组合记号：泰文声调与元音、阿拉伯语音符、天城体与孟加拉等印度系符号、
     希伯来元音、西里尔古音符、通用组合符、零宽空格、BOM */
  var RE_ZERO = /[\u0300-\u036F\u0483-\u0489\u0591-\u05BD\u05BF\u05C1-\u05C2\u05C4-\u05C5\u05C7\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7-\u06E8\u06EA-\u06ED\u0711\u0730-\u074A\u07A6-\u07B0\u0900-\u0903\u093A-\u093C\u0941-\u0948\u094D\u0951-\u0957\u0962-\u0963\u0981-\u0983\u09BC-\u09C4\u0A01-\u0A03\u0A3C\u0A41-\u0A42\u0ABC\u0AC1-\u0AC5\u0B01-\u0B03\u0B3C-\u0B44\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u200B-\u200F\u2028-\u202E\uFEFF]/;
  /* 全角 / 汉字 / 假名 / 谚文 → 2 个半角宽度 */
  var RE_WIDE = /[\u1100-\u115F\u2E80-\u303E\u3041-\u33FF\u3400-\u4DBF\u4E00-\u9FFF\uA000-\uA4CF\uAC00-\uD7A3\uF900-\uFAFF\uFE10-\uFE19\uFE30-\uFE6F\uFF01-\uFF60\uFFE0-\uFFE6]/;

  function widthOf(s) {
    var n = 0;
    for (var i = 0; i < s.length; i++) {
      var ch = s.charAt(i);
      if (RE_ZERO.test(ch)) continue;
      n += RE_WIDE.test(ch) ? 2 : 1;
    }
    return n;
  }

  /* ---------- 文字系统识别（双语判断用，按字符） ---------- */
  var SCRIPTS = [
    ['kana',    /[\u3040-\u30FF]/],
    ['hangul',  /[\u1100-\u11FF\uAC00-\uD7AF]/],
    ['han',     /[\u3400-\u4DBF\u4E00-\u9FFF]/],
    ['thai',    /[\u0E00-\u0E7F]/],
    ['arab',    /[\u0600-\u06FF]/],
    ['hebr',    /[\u0590-\u05FF]/],
    ['cyr',     /[\u0400-\u04FF]/],
    ['gre',     /[\u0370-\u03FF]/],
    ['deva',    /[\u0900-\u097F]/],
    ['lat',     /[A-Za-z]/]
  ];
  function scriptOf(ch) {
    for (var i = 0; i < SCRIPTS.length; i++) if (SCRIPTS[i][1].test(ch)) return SCRIPTS[i][0];
    return '';
  }
  /* 一段文本里占比最高的文字系统（忽略标点/数字/空白） */
  function mainScript(s) {
    var cnt = {}, best = '', bn = 0, k;
    for (var i = 0; i < s.length; i++) {
      var k2 = scriptOf(s.charAt(i));
      if (!k2) continue;
      cnt[k2] = (cnt[k2] || 0) + 1;
    }
    for (k in cnt) if (cnt[k] > bn) { bn = cnt[k]; best = k; }
    return best;
  }

  /* ---------- 参数 ---------- */
  function sysOf(lang) { return SYS[lang] || 'lat'; }
  function paramsFor(lang) {
    var s = sysOf(lang), d = DEF[s] || DEF.lat, o = {};
    for (var k in d) o[k] = d[k];
    o.sys = s;
    return o;
  }
  /* 数值兜底：页面上的输入可能被清空或填了非数字 */
  function num(v, d) { v = parseInt(v, 10); return isFinite(v) && v > 0 ? v : d; }

  /* ---------- 解析 ---------- */
  function detectFmt(name, text) {
    var t = String(text || '');
    if (/^WEBVTT/m.test(t)) return 'vtt';
    if (/^\[Script Info\]/m.test(t) || /^Dialogue:/m.test(t)) return 'ass';
    if (/-->/.test(t) && /\d{1,2}:\d{2}:\d{2}[,.]\d{1,3}/.test(t)) return 'srt';
    var n = String(name || '').toLowerCase();
    if (/\.vtt$/.test(n)) return 'vtt';
    if (/\.(ass|ssa)$/.test(n)) return 'ass';
    if (/-->/.test(t) && /\d{1,2}:\d{2}[:.]\d{2}/.test(t)) return 'vtt';
    return 'srt';
  }
  function ms(h, m, s, frac) {
    var f = String(frac || '0');
    while (f.length < 3) f += '0';
    return (+h) * 3600000 + (+m) * 60000 + (+s) * 1000 + parseInt(f.slice(0, 3), 10);
  }
  /* 时间戳 → 毫秒。SRT 用逗号，VTT 用点；VTT 允许省略小时位 */
  function parseTs(line) {
    var m = String(line).match(/(\d{1,3}):(\d{1,2}):(\d{1,2})[.,](\d{1,3})/g);
    if (m && m.length >= 2) {
      var a = m[0].match(/(\d{1,3}):(\d{1,2}):(\d{1,2})[.,](\d{1,3})/);
      var b = m[1].match(/(\d{1,3}):(\d{1,2}):(\d{1,2})[.,](\d{1,3})/);
      return { st: ms(a[1], a[2], a[3], a[4]), en: ms(b[1], b[2], b[3], b[4]) };
    }
    var m2 = String(line).match(/(\d{1,3}):(\d{1,2})[.](\d{1,3})/g);
    if (m2 && m2.length >= 2) {
      var a2 = m2[0].match(/(\d{1,3}):(\d{1,2})[.](\d{1,3})/);
      var b2 = m2[1].match(/(\d{1,3}):(\d{1,2})[.](\d{1,3})/);
      return { st: ms(0, a2[1], a2[2], a2[3]), en: ms(0, b2[1], b2[2], b2[3]) };
    }
    return null;
  }
  /* ASS：0:00:01.23（百分秒） */
  function assMs(t) {
    var m = String(t).match(/(\d{1,2}):(\d{2}):(\d{2})[.](\d{1,3})/);
    if (!m) return null;
    var cs = String(m[4]); while (cs.length < 3) cs += '0';
    return (+m[1]) * 3600000 + (+m[2]) * 60000 + (+m[3]) * 1000 + parseInt(cs.slice(0, 3), 10);
  }
  function parse(text, fmt) {
    var raw = String(text || '').replace(/^﻿/, '').replace(/\r\n?/g, '\n');
    var out = [];
    if (fmt === 'ass') {
      var lines = raw.split('\n'), inEv = false, i;
      for (i = 0; i < lines.length; i++) {
        var ln = lines[i];
        if (/^\[/.test(ln)) { inEv = /^\[Events\]/i.test(ln); continue; }
        if (!inEv || !/^Dialogue:/i.test(ln)) continue;
        var p = ln.indexOf(':');
        var f = ln.slice(p + 1).split(',');
        if (f.length < 10) continue;
        var st = assMs(f[1]), en = assMs(f[2]);
        if (st == null || en == null) continue;
        /* 正文从第 10 段起（自带逗号要拼回去）；剥掉特效块，\N 视为折行 */
        var tx = f.slice(9).join(',').replace(/\{[^}]*\}/g, '').replace(/\\[Nn]/g, '\n');
        out.push({ i: out.length + 1, st: st, en: en, tx: tx.split('\n') });
      }
      return out;
    }
    var blocks = raw.split(/\n{2,}/);
    for (var b = 0; b < blocks.length; b++) {
      if (!/-->/.test(blocks[b])) continue;
      var seg = blocks[b].split('\n'), k = 0, idx = -1;
      if (/^\s*\d+\s*$/.test(seg[k])) { idx = parseInt(seg[k], 10); k++; }
      while (k < seg.length && !/-->/.test(seg[k])) k++;
      if (k >= seg.length) continue;
      var ts = parseTs(seg[k]);
      if (!ts) continue;
      k++;
      var tx2 = seg.slice(k).join('\n').replace(/\n+$/, '');
      out.push({ i: idx >= 0 ? idx : out.length + 1, st: ts.st, en: ts.en, tx: tx2.split('\n') });
    }
    return out;
  }

  /* ---------- 输出 ---------- */
  function pad(n, w) { n = String(n); while (n.length < w) n = '0' + n; return n; }
  function tsSrt(v) {
    v = Math.max(0, Math.round(v));
    return pad(Math.floor(v / 3600000), 2) + ':' + pad(Math.floor(v / 60000) % 60, 2) + ':' +
      pad(Math.floor(v / 1000) % 60, 2) + ',' + pad(v % 1000, 3);
  }
  function tsVtt(v) {
    v = Math.max(0, Math.round(v));
    return pad(Math.floor(v / 3600000), 2) + ':' + pad(Math.floor(v / 60000) % 60, 2) + ':' +
      pad(Math.floor(v / 1000) % 60, 2) + '.' + pad(v % 1000, 3);
  }
  function formatSrt(items) {
    return items.map(function (c, n) {
      return (n + 1) + '\n' + tsSrt(c.st) + ' --> ' + tsSrt(c.en) + '\n' + c.tx.join('\n') + '\n';
    }).join('\n');
  }
  function formatVtt(items) {
    return 'WEBVTT\n\n' + items.map(function (c, n) {
      return (n + 1) + '\n' + tsVtt(c.st) + ' --> ' + tsVtt(c.en) + '\n' + c.tx.join('\n') + '\n';
    }).join('\n');
  }
  function statOf(items) {
    var dur = 0, chars = 0;
    items.forEach(function (c) { dur += Math.max(0, c.en - c.st); chars += widthOf(c.tx.join('')); });
    return { n: items.length, duration: dur, chars: chars };
  }

  /* ---------- 双语形态 ---------- */
  /* 形态 A：一条两行、两行主文字系统不同 */
  function isBilingualA(c) {
    if (c.tx.length !== 2) return false;
    var a = mainScript(c.tx[0]), b = mainScript(c.tx[1]);
    return !!a && !!b && a !== b;
  }
  /* 形态 B：相邻两条时间轴完全相同 */
  function isBilingualB(prev, cur) {
    return !!prev && prev.st === cur.st && prev.en === cur.en;
  }

  /* ---------- 断行禁则 ---------- */
  var RE_NO_END = /[([{\uFF08\u3010\u300A\u300C\u300E\u201C\u2018]$/;
  var RE_NO_START = /^[,.;:!?\u3001\u3002\uFF0C\uFF1A\uFF1B\uFF01\uFF1F\uFF09\u3011\u300B\u300D\u300F\u201D\u2019\u2026\uFF5E\u00B7]/;
  var RE_BAD_TAIL = /[,;:\uFF0C\uFF1A\uFF1B]$/;
  var RE_CJK_TAIL = /[\u3002\uFF0E\uFF0C\u3001\uFF1B\uFF1A\uFF01\uFF1F\u2026]$/;
  var RE_CTRL = /[\u0000-\u0008\u000B\u000C\u000E-\u001F]/;

  /* ---------- 语言专属规范：不是「同一套阈值换个数字」，而是这门语言才有这条规矩 ----------
     es   西班牙语：疑问句/感叹句要有开头的 ¿ ¡
     fr   法语：? ! ; : 之前用不破空格（U+00A0），不是普通空格
     el   希腊语：问号是 ;（U+037E），不是 ?
     ar   阿拉伯语：؟（U+061F）与 ،（U+060C）
     zh/ja 中日：汉字/假名旁边的半角 , . ? ! 应该用全角（日语逗号是 、不是 ，）
     ⚠️ 没有进这张表的语言就压根不显示这条规则 —— 不给英语查「¿ 开头」这种笑话。 */
  var PUNCT = {
    'es': { mode: 'open', open: { '?': '\u00BF', '!': '\u00A1' } },
    'fr': { mode: 'nbsp' },
    'el': { mode: 'map', map: [['?', '\u037E']] },
    'ar': { mode: 'map', map: [['?', '\u061F'], [',', '\u060C']] },
    'zh-CN': { mode: 'ctx', near: '\\u4E00-\\u9FFF', map: [[',', '\uFF0C'], ['.', '\u3002'], ['?', '\uFF1F'], ['!', '\uFF01']] },
    'zh-TW': { mode: 'ctx', near: '\\u4E00-\\u9FFF', map: [[',', '\uFF0C'], ['.', '\u3002'], ['?', '\uFF1F'], ['!', '\uFF01']] },
    'ja':    { mode: 'ctx', near: '\\u4E00-\\u9FFF\\u3040-\\u30FF', map: [[',', '\u3001'], ['.', '\u3002'], ['?', '\uFF1F'], ['!', '\uFF01']] }
  };
  function reEsc(ch) { return /[.^$*+?()\[\]{}|\\]/.test(ch) ? '\\' + ch : ch; }
  function hasPunct(lang) { return !!PUNCT[lang]; }
  function hasDir(lang) { return lang === 'ar' || lang === 'he'; }

  function punctIssue(text, lang) {
    var p = PUNCT[lang];
    if (!p) return 0;
    var i, k;
    if (p.mode === 'open') {
      for (k in p.open) { if (text.indexOf(k) >= 0 && text.indexOf(p.open[k]) < 0) return 1; }
      return 0;
    }
    if (p.mode === 'nbsp') return /[ \t]([?!;:])/.test(text) ? 1 : 0;
    if (p.mode === 'map') {
      for (i = 0; i < p.map.length; i++) if (text.indexOf(p.map[i][0]) >= 0) return 1;
      return 0;
    }
    /* ctx：半角标点必须紧挨着汉字/假名才算（3.5 这种小数点不能误伤） */
    for (i = 0; i < p.map.length; i++) {
      var ch = reEsc(p.map[i][0]);
      if (new RegExp('[' + p.near + ']' + ch).test(text)) return 1;
      if (new RegExp(ch + '[' + p.near + ']').test(text)) return 1;
    }
    return 0;
  }
  function punctFix(text, lang) {
    var p = PUNCT[lang];
    if (!p) return text;
    var s = text, i, k;
    if (p.mode === 'open') {
      for (k in p.open) { if (s.indexOf(k) >= 0 && s.indexOf(p.open[k]) < 0) s = p.open[k] + s; }
      return s;
    }
    if (p.mode === 'nbsp') return s.replace(/[ \t]([?!;:])/g, '\u00A0$1');
    if (p.mode === 'map') {
      for (i = 0; i < p.map.length; i++) s = s.split(p.map[i][0]).join(p.map[i][1]);
      return s;
    }
    for (i = 0; i < p.map.length; i++) {
      var ch = reEsc(p.map[i][0]), to = p.map[i][1];
      s = s.replace(new RegExp('([' + p.near + '])' + ch, 'g'), '$1' + to);
      s = s.replace(new RegExp(ch + '([' + p.near + '])', 'g'), to + '$1');
    }
    return s;
  }
  /* 书写方向：阿拉伯语/希伯来语条目应以本方向的字母开头（以拉丁字母开头会让整句方向翻转） */
  function dirIssue(text, lang) {
    if (!hasDir(lang)) return 0;
    var want = (lang === 'ar') ? 'arab' : 'hebr';
    for (var i = 0; i < text.length; i++) {
      var sc = scriptOf(text.charAt(i));
      if (!sc) continue;
      return sc === want ? 0 : 1;
    }
    return 0;
  }

  function badBreak(c, sys) {
    var L = c.tx;
    if (L.length < 2) return 0;
    for (var i = 0; i < L.length; i++) {
      var isLast = (i === L.length - 1);
      if (!isLast) {
        if (RE_NO_END.test(L[i])) return 1;
        if (sys === 'cjk' || sys === 'hangul' || sys === 'nospc') {
          if (RE_CJK_TAIL.test(L[i])) return 1;
        } else if (RE_BAD_TAIL.test(L[i])) return 1;
      }
      if (i > 0 && RE_NO_START.test(L[i])) return 1;
    }
    return 0;
  }

  /* ---------- 折行（修 rWid / rLin / rBrk） ---------- */
  function hardWrap(sys) { return sys === 'cjk' || sys === 'hangul' || sys === 'nospc'; }
  function rewrap(text, sys, maxW) {
    var flat = String(text).replace(/\s*\n\s*/g, ' ').replace(/\s+/g, ' ').trim();
    if (!flat) return [''];
    var out = [], cur = '', i;
    if (hardWrap(sys)) {
      /* 无词间空格（中/日/韩/泰）：按字符硬切，切点只躲开禁则标点。
         想按词切需要分词词典，本页不做 —— 硬切是这类文字系统的常规做法。 */
      var chs = Array.from(flat), cw = '';
      for (i = 0; i < chs.length; i++) {
        var ch = chs[i];
        /* 闭标点不另起行，跟着上一行走 */
        if (RE_NO_START.test(ch) && cw) { cw += ch; continue; }
        if (cw && widthOf(cw + ch) > maxW) { out.push(cw); cw = ch; }
        else cw += ch;
      }
      if (cw) out.push(cw);
    } else {
      var words = flat.split(' ');
      for (i = 0; i < words.length; i++) {
        var w = words[i];
        if (!cur) { cur = w; continue; }
        if (widthOf(cur + ' ' + w) > maxW) { out.push(cur); cur = w; }
        else cur += ' ' + w;
      }
      if (cur) out.push(cur);
    }
    /* 折完超过两行就把余下的并回第二行（不造第三行） */
    if (out.length > 2) {
      var head = out.slice(0, 2), glue = hardWrap(sys) ? '' : ' ';
      head[1] = head[1] + glue + out.slice(2).join(glue);
      out = head;
    }
    return out.length ? out : [''];
  }

  /* 中西文之间补空格：汉字/假名/谚文与紧邻的拉丁字母或数字之间插一个半角空格 */
  var CJK = '\\u4E00-\\u9FFF\\u3400-\\u4DBF\\u3040-\\u30FF\\uAC00-\\uD7AF';
  var RE_CJK_LAT = new RegExp('([' + CJK + '])([A-Za-z0-9])', 'g');
  var RE_LAT_CJK = new RegExp('([A-Za-z0-9])([' + CJK + '])', 'g');
  var RE_CJK_LAT1 = new RegExp('([' + CJK + '])([A-Za-z0-9])');
  var RE_LAT_CJK1 = new RegExp('([A-Za-z0-9])([' + CJK + '])');
  function addSpace(text) {
    return String(text).replace(RE_CJK_LAT, '$1 $2').replace(RE_LAT_CJK, '$1 $2');
  }
  function needSpace(text) { return RE_CJK_LAT1.test(text) || RE_LAT_CJK1.test(text); }

  /* ---------- 主检查 ---------- */
  /* opt: { lang, maxLineW, maxCpsW, minDur, maxDur, maxLines, on:{ruleId:false} } */
  function check(items, opt) {
    opt = opt || {};
    var lang = opt.lang || 'zh-CN';
    var sys = sysOf(lang);
    var p = paramsFor(lang);
    var maxW = num(opt.maxLineW, p.maxLineW);
    var maxC = num(opt.maxCpsW, p.maxCpsW);
    var minD = num(opt.minDur, p.minDur);
    var maxD = num(opt.maxDur, p.maxDur);
    var maxL = num(opt.maxLines, p.maxLines);
    var on = opt.on || {};
    function enabled(id) { return on[id] !== false; }

    var issues = [], nA = 0, nB = 0, i;
    var isA = items.map(isBilingualA);
    var isB = items.map(function (c, k) { return k > 0 && isBilingualB(items[k - 1], c); });
    for (i = 0; i < items.length; i++) { if (isA[i]) nA++; if (isB[i]) nB++; }

    if (enabled('rBil') && nA > 0 && nB > 0) issues.push({ r: 'rBil', lv: 'info', i: -1, v: nA + nB });

    var prevIdx = 0, seen = {};
    for (i = 0; i < items.length; i++) {
      var c = items[i], n = i + 1;

      if (enabled('rMoj')) {
        var joined = c.tx.join('\n');
        if (joined.indexOf('�') >= 0 || RE_CTRL.test(joined)) issues.push({ r: 'rMoj', lv: 'err', i: n, v: 0 });
      }
      if (enabled('rTs') && (!isFinite(c.st) || !isFinite(c.en) || c.st < 0 || c.en < 0)) {
        issues.push({ r: 'rTs', lv: 'err', i: n, v: 0 });
      } else if (enabled('rRev') && c.en <= c.st) {
        issues.push({ r: 'rRev', lv: 'err', i: n, v: 0 });
      }
      if (enabled('rIdx')) {
        var iv = parseInt(c.i, 10);
        if (!isFinite(iv) || iv !== prevIdx + 1 || seen[iv]) issues.push({ r: 'rIdx', lv: 'err', i: n, v: 0 });
        if (isFinite(iv)) seen[iv] = 1;
        prevIdx = isFinite(iv) ? iv : prevIdx + 1;
      }
      var flat = c.tx.join('').replace(/\s+/g, '');
      if (enabled('rEmp') && !flat) { issues.push({ r: 'rEmp', lv: 'warn', i: n, v: 0 }); continue; }
      if (!flat) continue;

      var dur = c.en - c.st;
      if (enabled('rShort') && dur > 0 && dur < minD) issues.push({ r: 'rShort', lv: 'warn', i: n, v: dur });
      if (enabled('rLong') && dur > maxD) issues.push({ r: 'rLong', lv: 'warn', i: n, v: dur });
      if (enabled('rOvl') && i > 0 && !isB[i] && !isA[i] && !isA[i - 1]) {
        if (c.st < items[i - 1].en - 1) issues.push({ r: 'rOvl', lv: 'warn', i: n, v: items[i - 1].en - c.st });
      }
      /* 阅读速度：形态 A 只算与字幕语言一致的那一行 */
      if (enabled('rCps') && dur > 0) {
        var lines = c.tx, wsum = 0, j;
        if (isA[i]) {
          var want = (sys === 'cjk') ? 'han' : (sys === 'hangul' ? 'hangul' : (sys === 'nospc' ? 'thai' : 'lat'));
          var pick = -1;
          for (j = 0; j < lines.length; j++) { if (mainScript(lines[j]) === want) { pick = j; break; } }
          wsum = widthOf(pick >= 0 ? lines[pick] : lines[0]);
        } else {
          for (j = 0; j < lines.length; j++) wsum += widthOf(lines[j]);
        }
        var cps = wsum / (dur / 1000);
        if (cps > maxC) issues.push({ r: 'rCps', lv: 'warn', i: n, v: Math.round(cps * 10) / 10 });
      }
      if (enabled('rWid')) {
        var over = 0;
        for (var k2 = 0; k2 < c.tx.length; k2++) if (widthOf(c.tx[k2]) > maxW) over = widthOf(c.tx[k2]);
        if (over) issues.push({ r: 'rWid', lv: 'warn', i: n, v: over });
      }
      if (enabled('rLin') && c.tx.length > maxL) issues.push({ r: 'rLin', lv: 'warn', i: n, v: c.tx.length });
      if (enabled('rBrk') && c.tx.length >= 2 && badBreak(c, sys)) issues.push({ r: 'rBrk', lv: 'info', i: n, v: 0 });
      if (enabled('rTrim')) {
        if (c.tx.some(function (x) { return x !== x.replace(/^\s+|\s+$/g, ''); })) {
          issues.push({ r: 'rTrim', lv: 'info', i: n, v: 0 });
        }
      }
      if (enabled('rSpc') && (sys === 'cjk' || sys === 'hangul')) {
        if (c.tx.some(needSpace)) issues.push({ r: 'rSpc', lv: 'info', i: n, v: 0 });
      }
      if (enabled('rPun') && hasPunct(lang)) {
        if (c.tx.some(function (x) { return punctIssue(x, lang); })) issues.push({ r: 'rPun', lv: 'info', i: n, v: 0 });
      }
      if (enabled('rDir') && hasDir(lang)) {
        if (c.tx.some(function (x) { return dirIssue(x, lang); })) issues.push({ r: 'rDir', lv: 'info', i: n, v: 0 });
      }
    }
    return {
      issues: issues, sys: sys,
      p: { maxLineW: maxW, maxCpsW: maxC, minDur: minD, maxDur: maxD, maxLines: maxL },
      nA: nA, nB: nB
    };
  }

  /* ---------- 修复 ---------- */
  /* fixIds: 要修的规则 id 集合。返回 {items, done:{id:count}} */
  function applyFix(items, opt, fixIds) {
    fixIds = fixIds || {};
    opt = opt || {};
    var out = items.map(function (c) { return { i: c.i, st: c.st, en: c.en, tx: c.tx.slice() }; });
    var lang = opt.lang || 'zh-CN', sys = sysOf(lang), p = paramsFor(lang);
    var maxW = num(opt.maxLineW, p.maxLineW);
    var maxL = num(opt.maxLines, p.maxLines);
    var minD = num(opt.minDur, p.minDur);
    var maxD = num(opt.maxDur, p.maxDur);
    var done = {}, i;
    function hit(id) { done[id] = (done[id] || 0) + 1; }

    if (fixIds.rEmp) {
      var keep = out.filter(function (c) { return c.tx.join('').replace(/\s+/g, '') !== ''; });
      done.rEmp = out.length - keep.length;
      out = keep;
    }
    if (fixIds.rRev) {
      out.forEach(function (c) { if (c.en <= c.st) { var t = c.st; c.st = c.en; c.en = t; hit('rRev'); } });
    }
    if (fixIds.rLong || fixIds.rShort) {
      for (i = 0; i < out.length; i++) {
        var c = out[i];
        if (fixIds.rLong && c.en - c.st > maxD) { c.en = c.st + maxD; hit('rLong'); }
        if (fixIds.rShort && c.en - c.st < minD) {
          var nx = out[i + 1];
          var room = nx ? nx.st - c.st : minD;
          var want = Math.max(0, Math.min(minD, room));
          if (want > c.en - c.st) { c.en = c.st + want; hit('rShort'); }
        }
      }
    }
    if (fixIds.rOvl) {
      for (i = 1; i < out.length; i++) {
        var pb = out[i - 1];
        if (isBilingualB(pb, out[i])) continue;
        if (isBilingualA(pb) || isBilingualA(out[i])) continue;
        if (out[i].st < pb.en) {
          /* 整体后移、保住时长：只把 st 推到前一条结束会把短条目压成 0 长（实测退化） */
          var push = pb.en - out[i].st;
          out[i].st = pb.en; out[i].en += push; hit('rOvl');
        }
      }
    }
    var needWrap = !!(fixIds.rWid || fixIds.rLin || fixIds.rBrk);
    out.forEach(function (c) {
      var j;
      if (fixIds.rTrim) {
        var dirt = false;
        for (j = 0; j < c.tx.length; j++) {
          var nv = c.tx[j].replace(/^\s+|\s+$/g, '');
          if (nv !== c.tx[j]) dirt = true;
          c.tx[j] = nv;
        }
        if (dirt) hit('rTrim');
      }
      if (fixIds.rSpc) {
        var sp = false;
        for (j = 0; j < c.tx.length; j++) {
          if (needSpace(c.tx[j])) { c.tx[j] = addSpace(c.tx[j]); sp = true; }
        }
        if (sp) hit('rSpc');
      }
      if (fixIds.rPun && hasPunct(lang)) {
        var pf = false;
        for (j = 0; j < c.tx.length; j++) {
          if (punctIssue(c.tx[j], lang)) { c.tx[j] = punctFix(c.tx[j], lang); pf = true; }
        }
        if (pf) hit('rPun');
      }
      if (needWrap) {
        var flat = c.tx.join('\n');
        var tooWide = c.tx.some(function (x) { return widthOf(x) > maxW; });
        var tooMany = c.tx.length > maxL;
        var badBrk = badBreak(c, sys);
        if (tooWide || tooMany || badBrk) {
          if (tooWide) hit('rWid');
          if (tooMany) hit('rLin');
          if (badBrk) hit('rBrk');
          c.tx = rewrap(flat, sys, maxW);
        }
      }
    });
    if (fixIds.rIdx) {
      out.forEach(function (c, k) { if (c.i !== k + 1) { c.i = k + 1; hit('rIdx'); } });
    }
    return { items: out, done: done };
  }

  g.QCCore = {
    SYS: SYS, DEF: DEF, RULES: RULES,
    sysOf: sysOf, paramsFor: paramsFor, widthOf: widthOf, mainScript: mainScript,
    detectFmt: detectFmt, parse: parse, formatSrt: formatSrt, formatVtt: formatVtt,
    statOf: statOf, check: check, applyFix: applyFix, rewrap: rewrap, addSpace: addSpace,
    isBilingualA: isBilingualA, isBilingualB: isBilingualB, badBreak: badBreak,
    PUNCT: PUNCT, hasPunct: hasPunct, hasDir: hasDir, punctIssue: punctIssue, punctFix: punctFix, dirIssue: dirIssue,
    pad: pad, tsSrt: tsSrt, tsVtt: tsVtt
  };
})(typeof window !== 'undefined' ? window : this);
