/* qc-core.js —— 字幕质检引擎（v0.9.321 新增，v0.9.322 双语与画面方向修正）
 *
 * 设计要点：
 *  1) **多语言是第一位的**——每条规则的阈值按「字幕语言」所属的文字系统分档，不是一套
 *     42 字符/25CPS 的西方口径套全球。中英日韩泰阿希伯来各有自己的宽度与阅读速度算法。
 *  2) 统一计量单位「半角宽度」：ASCII/拉丁=1，汉字·假名·谚文·全角标点=2；
 *     组合记号（泰文元音、阿拉伯语音符、天城体符号）计 0 —— 否则泰语/阿拉伯语会被严重高估。
 *     这样 42 宽度 = 拉丁 42 字符 = 中文 21 全角字，与本站既有体检口径（maxLine 21）对齐。
 *  3) 阅读速度同样按宽度/秒，数值来自 Netflix TTSG 各语言阅读速度表（见 DEF 上方注释）：
 *     中文 18（=9 全角字/秒）· 日文 8（=4 全角字/秒）· 韩文 22（≈12 音节/秒）· 英/阿 20 ·
 *     印地 18 · 德/芬/西/葡等在册未单列的按 17。与翻译页 srt-core.js 的 CPS_LIMITS 同一标准。
 *  4) 双语条目（形态 A：一条两行分属两种文字；形态 B：两条同轴）识别出来，
 *     阅读速度只算写着这门语言的那一行，重叠检查整对豁免 —— 否则每条双语都误报。
 *
 * v0.9.322 修正（都是真跑出来改坏字幕才发现的，别退化回去）：
 *  5) **折行按每行自己的文字决定，不看「字幕语言」**。以前拿字幕语言的折法去折内容，
 *     英文被按中文的无空格规则腰斩成 "defi / nitely"；现在统一走 lineSys() 每行自判。
 *  6) **双语 A 形态逐行各自重排**，不许 join 成一坨 —— 以前会把原文与译文糊进同一行，
 *     折完再也分不开。双语每行只占 1 行，某地单独超宽的宁可原样留下也不做成第 3 行。
 *  7) **check 与 applyFix 共用 ownLines() 判据**：语言专属规则（rPun/rSpc/rDir）只看属于
 *     这门语言的行。分开写过一次就出现「报得出来却修不动」，两边必须是同一批行号。
 *  8) **画面方向**（land/square/port）三档行宽 42/36/28，只改行宽这一项；
 *     读速与时长不随画面方向变 —— 竖屏不会因为画面窄就读得更慢。
 *  9) **修不动就不要报「已修 N 处」**：折行前后文本一样时不计数，否则用户看到的
 *     修复数字和素材实际内容对不上。
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

  /* ---------- 各文字系统的默认阈值（页面上可改） ----------
     maxLineW 单行最大宽度（半角单位）
     maxCpsW  阅读速度上限（半角宽度/秒）
     minDur / maxDur 单条停留时长（毫秒）

     v0.9.394：读速按 Netflix TTSG 各语言阅读速度表收口（成人档、非 SDH）——
     以前是「英语 20 套所有语言」，日文因此松了 2.2 倍、韩文反倒严了 25%，和翻译页
     srt-core.js 的 CPS_LIMITS 给出的结论对不上。TTSG 值 → 本页半角宽度：
       en 20 · ar 20（原样，拉丁/阿拉伯一字一宽）
       ja 4 全角字/秒 → 8        zh-TW/zh-CN 9 → 18        ko 12 音节/秒 → 22
       hi 22 → 18（天城文组合记号计 0，实测 0.83 宽/字符）
       未单列的语言按 TTSG「其他 17」→ 17（德/芬/西/葡在 TTSG 里正是 17，对得上）
     ⚠️ 数值来源是 TTSG 原文，页面上的输入框仍可改；改的是默认值，不是上限。 */
  var DEF = {
    cjk:    { maxLineW: 42, maxCpsW: 18, minDur: 833,  maxDur: 7000, maxLines: 2 },
    hangul: { maxLineW: 42, maxCpsW: 22, minDur: 833,  maxDur: 7000, maxLines: 2 },
    nospc:  { maxLineW: 42, maxCpsW: 17, minDur: 833,  maxDur: 7000, maxLines: 2 },
    lat:    { maxLineW: 42, maxCpsW: 17, minDur: 833,  maxDur: 7000, maxLines: 2 },
    cyr:    { maxLineW: 42, maxCpsW: 17, minDur: 833,  maxDur: 7000, maxLines: 2 },
    gre:    { maxLineW: 42, maxCpsW: 17, minDur: 833,  maxDur: 7000, maxLines: 2 },
    arab:   { maxLineW: 42, maxCpsW: 20, minDur: 833,  maxDur: 7000, maxLines: 2 },
    hebr:   { maxLineW: 42, maxCpsW: 17, minDur: 833,  maxDur: 7000, maxLines: 2 },
    deva:   { maxLineW: 42, maxCpsW: 18, minDur: 833,  maxDur: 7000, maxLines: 2 }
  };
  /* 与所属文字系统不同档的语言（TTSG 有单独规定的那几个）。
     en 在 lat 档里要抬到 20；ja 写汉字但按 4 全角字/秒；yue 没有 SYS 映射会落到 lat，
     但它写的是汉字，读速跟中文同档。 */
  var CPS_LANG = {
    'en': 20, 'ja': 8, 'yue': 18,
    /* 这 6 种被 sysOf 当成拉丁（一字一宽），实际每字符只有 0.81~0.86 宽（孟加拉/奥里亚/
       尼泊尔/马拉地/阿萨姆的元音符与连写多），按 17 字符/秒 × 实测宽度写 */
    'or': 14.0, 'mr': 14.6, 'ne': 14.3, 'bn': 14.5, 'as': 14.4, 'th': 13.8
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

  /* ---------- 一行文本属于哪一族 ----------
    SCRIPT return 的是字符层面的名（han/kana/thai…），DEF 用的是阈值分档名（cjk/nospc…）；
    双语条目里每一行是各判各的，所以要有这层映射。日文的 mainScript 可能是 kana 也可能是 han，
    两者都得落到 cjk —— 早先按「等于 han 才算中文」判过，结果日语自己被当成外语漏掉。 */
  var SYS_OF_SCRIPT = {
    han: 'cjk', kana: 'cjk', hangul: 'hangul', thai: 'nospc',
    lat: 'lat', cyr: 'cyr', gre: 'gre', arab: 'arab', hebr: 'hebr', deva: 'deva'
  };
  function scriptSys(sc) { return SYS_OF_SCRIPT[sc] || 'lat'; }
  /* 一行自己的判断，不看「字幕语言」—— v0.9.322 的核心修正，详见 ownLines / applyFix */
  function lineSys(line) { return scriptSys(mainScript(line)); }

  /* ---------- 参数 ---------- */
  function sysOf(lang) { return SYS[lang] || 'lat'; }

  /* 画面方向 → 行宽系数。DEF 里的 42 是按 16:9 横屏推的（= 中文 21 全角字 / 英文 42 字符）；
     方形与竖屏的画面本身就窄，竖屏还要避开平台自己的标题栏、按钮、进度条，可用行宽更短。
     ⚠️ 这三个系数是本页的推荐口径，不是哪家的认证标准 —— 实际能压到多少取决于播放器 UI，
     页面上给的就是起点，用户可以自己在输入框里改。 */
  var FRAME = {
    land:   { k: 1,    maxLineW: 42 },
    square: { k: 0.86, maxLineW: 36 },
    port:   { k: 0.67, maxLineW: 28 }
  };
  function frameOf(f) { return FRAME[f] ? f : 'land'; }
  /* 某一族的某个画面方向下推荐的行宽（半角单位） */
  function lineWFor(sys, frame) {
    var d = DEF[sys] || DEF.lat, fr = FRAME[frameOf(frame)];
    return Math.round(d.maxLineW * fr.k);
  }
  /* opt.frame: 'land' | 'square' | 'port'；不给就按横屏。
     ⚠️ 其余阈值（读速/时长/行数）不随画面方向变 —— 竖屏不会因为窄就读得更慢。 */
  function paramsFor(lang, frame) {
    var s = sysOf(lang), d = DEF[s] || DEF.lat, o = {};
    for (var k in d) o[k] = d[k];
    if (CPS_LANG[lang]) o.maxCpsW = CPS_LANG[lang];   /* v0.9.394：TTSG 单列语种覆盖文字系统默认档 */
    o.maxLineW = (FRAME[frame] && frame !== 'land') ? lineWFor(s, frame) : d.maxLineW;
    o.sys = s;
    o.frame = frameOf(frame);
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

  /* 哪些行归「字幕语言」管 —— check 与 applyFix 共用这一个判据。
     单语条目：每行都是。
     形态 A（一行外文 + 一行母语）：只挑写着这门语言的那一行 ——
       英文行不该被按中文规矩换成全角逗号，中文行也不该被按法语规矩插不换行空格。
     返回空数组表示这条里没有属于这门语言的行（纯外语条目），语言专属规则整条跳过。 */
  function ownLines(tx, lang, isA, out) {
    var want = sysOf(lang), k;
    out = out || [];
    if (!isA) { for (k = 0; k < tx.length; k++) out.push(k); return out; }
    for (k = 0; k < tx.length; k++) if (lineSys(tx[k]) === want) out.push(k);
    /* 这一条里压根没有这门语言的行（自动识别没认准，或用户选错了语言）→ 退回全行。
       不这样兜底的话这类条目连读速都不查，整条从体检里消失。 */
    if (!out.length) for (k = 0; k < tx.length; k++) out.push(k);
    return out;
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
  /* v0.9.339：从右向左书写的语言扩到 9 种（阿拉伯字母系 + 希伯来字母系） */
  var RTL_LANGS = ['ar', 'fa', 'he', 'ur', 'ps', 'ku', 'ug', 'sd', 'yi'];
  function hasDir(lang) { return RTL_LANGS.indexOf(lang) >= 0; }

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

  /* 断行禁则：每一行按它自己的文字判定 —— 双语里中文行结尾带「。」是正常的，
     英文行结尾逗号才是别扭。v0.9.322 起第 2 参 sys 作废（留着只为兼容老调用）。 */
  function badBreak(c) {
    var L = c.tx;
    if (L.length < 2) return 0;
    for (var i = 0; i < L.length; i++) {
      var isLast = (i === L.length - 1);
      if (!isLast) {
        if (RE_NO_END.test(L[i])) return 1;
        if (hardWrap(lineSys(L[i]))) {
          if (RE_CJK_TAIL.test(L[i])) return 1;
        } else if (RE_BAD_TAIL.test(L[i])) return 1;
      }
      if (i > 0 && RE_NO_START.test(L[i])) return 1;
    }
    return 0;
  }

  /* ---------- 折行（修 rWid / rLin / rBrk） ---------- */
  function hardWrap(sys) { return sys === 'cjk' || sys === 'hangul' || sys === 'nospc'; }
  /* maxRows：折完最多留几行。双语条目每一行只能占 1 行（两行已经给两种语言占满了），
     所以那里传 1；单语传 maxLines（默认 2）。
     sys 不给或给 'auto' → 按这段文字自己的语言决定折法。 */
  function rewrap(text, sys, maxW, maxRows) {
    var flat = String(text).replace(/\s*\n\s*/g, ' ').replace(/\s+/g, ' ').trim();
    if (!flat) return [''];
    if (!sys || sys === 'auto') sys = lineSys(flat);
    var lim = maxRows > 0 ? maxRows : 2;
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
    /* 折完超过允许行数就把余下的并回最后一行（不造第三行）。
       ⚠️ lim=1 时 head 只有 head[0]，下标必须用 lim-1 —— 写死 [1] 会在双语场景越界。 */
    if (out.length > lim) {
      var head = out.slice(0, lim), glue = hardWrap(sys) ? '' : ' ';
      head[lim - 1] = head[lim - 1] + glue + out.slice(lim).join(glue);
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

      /* 属于这门语言的行号 —— 必须在 rCps 之前算出来，rSpc/rPun/rDir 也用它 */
      var own = ownLines(c.tx, lang, isA[i]);
      var dur = c.en - c.st;
      if (enabled('rShort') && dur > 0 && dur < minD) issues.push({ r: 'rShort', lv: 'warn', i: n, v: dur });
      if (enabled('rLong') && dur > maxD) issues.push({ r: 'rLong', lv: 'warn', i: n, v: dur });
      if (enabled('rOvl') && i > 0 && !isB[i] && !isA[i] && !isA[i - 1]) {
        if (c.st < items[i - 1].en - 1) issues.push({ r: 'rOvl', lv: 'warn', i: n, v: items[i - 1].en - c.st });
      }
      /* 阅读速度：形态 A 只算写着这门语言的那一行（两种语言不叠加读） */
      if (enabled('rCps') && dur > 0) {
        var lines = c.tx, wsum = 0, j;
        if (isA[i]) {
          for (j = 0; j < own.length; j++) wsum += widthOf(lines[own[j]]);
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
      /* 语言专属规则只看属于这门语言的行 —— own 已在上面算好，别再算一遍 */
      if (enabled('rSpc') && (sys === 'cjk' || sys === 'hangul')) {
        if (own.some(function (j) { return needSpace(c.tx[j]); })) issues.push({ r: 'rSpc', lv: 'info', i: n, v: 0 });
      }
      if (enabled('rPun') && hasPunct(lang)) {
        if (own.some(function (j) { return punctIssue(c.tx[j], lang); })) issues.push({ r: 'rPun', lv: 'info', i: n, v: 0 });
      }
      if (enabled('rDir') && hasDir(lang)) {
        if (own.some(function (j) { return dirIssue(c.tx[j], lang); })) issues.push({ r: 'rDir', lv: 'info', i: n, v: 0 });
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
      /* 语言专属修复：行号判据必须和 check 里的 ownLines 一模一样，
         否则会出现「报告说这条有错、点修复却纹丝不动」——两边要做到同一批行。 */
      var own = ownLines(c.tx, lang, isBilingualA(c));
      if (fixIds.rSpc) {
        var sp = false;
        for (j = 0; j < own.length; j++) {
          if (needSpace(c.tx[own[j]])) { c.tx[own[j]] = addSpace(c.tx[own[j]]); sp = true; }
        }
        if (sp) hit('rSpc');
      }
      if (fixIds.rPun && hasPunct(lang)) {
        var pf = false;
        for (j = 0; j < own.length; j++) {
          var op = own[j];
          if (punctIssue(c.tx[op], lang)) { c.tx[op] = punctFix(c.tx[op], lang); pf = true; }
        }
        if (pf) hit('rPun');
      }
      if (needWrap) {
        var tooWide = c.tx.some(function (x) { return widthOf(x) > maxW; });
        var tooMany = c.tx.length > maxL;
        var badBrk = badBreak(c);
        if (tooWide || tooMany || badBrk) {
          /* ⚠️ 折行是这一步最容易改坏字幕的地方，两条铁律：
             ① 折法按每行自己的文字决定 —— 拿「字幕语言」的折法去折另一门语言，
                英文会被按中文的无空格规则腰斩成 "defi / nitely"（v0.9.321 实测 bug）。
             ② 双语 A 形态逐行各自重排 —— 把两行 join 成一坨会把中英文串进同一行，
                折完之后外语和母语就再也分不开了（同版实测 bug）。 */
          var before = c.tx.join('\n');
          if (isBilingualA(c)) {
            c.tx = c.tx.map(function (ln) {
              /* 双语每行只许占 1 行：重排到 1 行还超宽的宁原样留下，也不做成 3 行 ——
                 那得靠改译文或拆时间轴，不是折行能解决的 */
              return rewrap(ln, lineSys(ln), maxW, 1).join('\n');
            });
          } else {
            var whole = c.tx.join('\n');
            c.tx = rewrap(whole, lineSys(whole), maxW, maxL);
          }
          /* ⚠️ 只在真解决掉的时候才计数 —— 双语超宽折不动，就不能报「已修 N 处」，
             否则用户看到的修复数字与文件实际内容对不上 */
          if (c.tx.join('\n') !== before) {
            var nowWide = c.tx.some(function (x) { return widthOf(x) > maxW; });
            if (tooWide && !nowWide) hit('rWid');
            if (tooMany && c.tx.length <= maxL) hit('rLin');
            if (badBrk && !badBreak(c)) hit('rBrk');
          }
        }
      }
    });
    if (fixIds.rIdx) {
      out.forEach(function (c, k) { if (c.i !== k + 1) { c.i = k + 1; hit('rIdx'); } });
    }
    return { items: out, done: done };
  }

  g.QCCore = {
    SYS: SYS, DEF: DEF, CPS_LANG: CPS_LANG, RULES: RULES, PUNCT: PUNCT, FRAME: FRAME,
    sysOf: sysOf, paramsFor: paramsFor, widthOf: widthOf, mainScript: mainScript,
    scriptSys: scriptSys, lineSys: lineSys, lineWFor: lineWFor, frameOf: frameOf,
    detectFmt: detectFmt, parse: parse, formatSrt: formatSrt, formatVtt: formatVtt,
    statOf: statOf, check: check, applyFix: applyFix, rewrap: rewrap, addSpace: addSpace,
    isBilingualA: isBilingualA, isBilingualB: isBilingualB, ownLines: ownLines, badBreak: badBreak,
    hasPunct: hasPunct, hasDir: hasDir, punctIssue: punctIssue, punctFix: punctFix, dirIssue: dirIssue,
    pad: pad, tsSrt: tsSrt, tsVtt: tsVtt
  };
})(typeof window !== 'undefined' ? window : this);
