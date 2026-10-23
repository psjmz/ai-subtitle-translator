/* extract-core.js —— 字幕提取纯文本页的独立引擎（v0.9.299）
 *
 * ⚠️ 三件套硬隔离（用户定案 2026-10-10）：本文件只被 extract.html 加载，
 *    不引入、不修改任何现有引擎。
 *    - 解析（SRT/VTT/ASS/SSA/SBV/LRC/TXT 七种读取 + 格式识别）：从 convert-core.js **复制后另写**
 *    - 文本判据（听障提示词表 / 说话人标签 / 歌词行 / 水印行）：从 clean-core.js **复制后另写**
 *    - 提取布局（逐条一行 / 连续段落）是本页新写的
 *    ⇒ 改这里不会碰到任何原有页面的行为。
 *
 * 浏览器 <script src> 与 Node (require) 通用。
 */
(function (root, factory) {
  if (typeof module !== 'undefined' && module.exports) module.exports = factory();
  else root.ExtractCore = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  /* =====================================================================
     一、解析（复制自 convert-core.js v0.9.299，口径与格式转换页一致）
     中间结构统一为 { start, end, text }（毫秒）。
     ===================================================================== */

  function pad(n, w) { n = String(n); while (n.length < w) n = '0' + n; return n; }
  function hms(ms) {
    ms = Math.max(0, Math.round(ms));
    return { h: Math.floor(ms / 3600000), m: Math.floor(ms % 3600000 / 60000),
      s: Math.floor(ms % 60000 / 1000), ms: ms % 1000 };
  }
  function parseHMS(h, m, s, frac) {
    var v = Number(h) * 3600000 + Number(m) * 60000 + Number(s) * 1000;
    var f = String(frac || '0');
    while (f.length < 3) f += '0';
    return v + Number(f.slice(0, 3));
  }

  /* ASS 的特效标记 {\pos(1,2)\b1} 与 \N 换行 —— 提取文本时都是噪音，先剥掉 */
  function stripAssTags(s) { return String(s).replace(/\{[^}]*\}/g, ''); }
  function normBreaks(s) { return String(s).replace(/\\N/gi, '\n'); }
  function plain(s) { return normBreaks(stripAssTags(s)).replace(/\r\n?/g, '\n').replace(/\n{3,}/g, '\n\n'); }

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
      if (/^WEBVTT/i.test(line)) { flush(); continue; }
      if (/^(NOTE|STYLE|REGION)\b/.test(line)) {
        flush();
        while (i + 1 < lines.length && lines[i + 1].trim() !== '') i++;
        continue;
      }
      var m = line.match(RE_SRT);
      var st, en;
      if (m) {
        st = parseHMS(m[1], m[2], m[3], m[4]); en = parseHMS(m[5], m[6], m[7], m[8]);
      } else {
        /* 两段式：开始端无小时位（结束端可有可无） */
        var m2 = line.match(RE_VTT2);
        if (!m2) { if (cur === null) continue; if (line.trim() === '') { flush(); continue; } cur.text += (cur.text ? '\n' : '') + line; continue; }
        st = parseHMS('0', m2[1], m2[2], m2[3]);
        en = parseHMS(m2[4] || '0', m2[5], m2[6], m2[7]);
      }
      flush();
      cur = { start: st, end: en, text: '' };
    }
    flush();
    return out;
  }

  function parseAss(text) {
    var lines = String(text).replace(/\r\n?/g, '\n').split('\n');
    var out = [], inEvents = false;
    for (var i = 0; i < lines.length; i++) {
      var line = lines[i].trim();
      if (/^\[/.test(line)) { inEvents = /^\[events\]/i.test(line); continue; }
      if (!inEvents || !/^Dialogue:/i.test(line)) continue;
      var body = line.replace(/^Dialogue:/i, '').replace(/^\s+/, '');
      var p = body.split(',');
      if (p.length < 10) continue;
      var sm = p[1].trim().match(/^(\d{1,3}):(\d{2}):(\d{2})[.:](\d{1,3})$/);
      var em = p[2].trim().match(/^(\d{1,3}):(\d{2}):(\d{2})[.:](\d{1,3})$/);
      if (!sm || !em) continue;
      out.push({
        start: parseHMS(sm[1], sm[2], sm[3], (sm[4] + '00').slice(0, 3)),
        end: parseHMS(em[1], em[2], em[3], (em[4] + '00').slice(0, 3)),
        text: p.slice(9).join(',')
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
    var s = String(text || '').replace(/^\uFEFF/, '');
    if (/^WEBVTT/m.test(s)) return 'vtt';
    if (/\[Script Info\]/i.test(s) || /^Dialogue:/im.test(s)) return 'ass';
    if (/^\s*\d{1,3}:\d{2}:\d{2}\.\d{1,3}\s*,/m.test(s)) return 'sbv';
    if (/^\s*\[\d{1,3}:\d{2}[.:]\d{1,3}\]/m.test(s)) return 'lrc';
    if (/\d{1,3}:\d{2}:\d{2}[,.]\d{1,3}\s*-->/.test(s)) return 'srt';
    if (/\d{1,3}:\d{2}:\d{2}\s*-->/.test(s)) return 'srt';
    if (s.trim()) return 'txt';
    return null;
  }

  var READ = { srt: parseSrt, vtt: parseVtt, ass: parseAss, ssa: parseAss, sbv: parseSbv, lrc: parseLrc, txt: parseTxt };
  var READABLE = ['srt', 'vtt', 'ass', 'ssa', 'sbv', 'lrc', 'txt'];

  function parse(text, fmt) {
    var fn = READ[fmt];
    if (!fn) return null;
    return fn(text).map(function (c) {
      return { start: c.start, end: (c.end > c.start ? c.end : c.start + 1), text: String(c.text == null ? '' : c.text) };
    });
  }

  /* =====================================================================
     二、文本判据（复制自 clean-core.js v0.9.299，口径与清洗页一致）
     ===================================================================== */

  function stripHtml(t) { return String(t).replace(/<[^>]*>/g, ''); }
  var RE_CTRL = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u200B-\u200F\u202A-\u202E\uFEFF\u00AD]/g;
  function stripCtrl(t) { return String(t).replace(RE_CTRL, ''); }

  /* 听障提示（SDH）：括号里含提示词才删整个括号，普通括号内容一律保留 */
  var SOUND_HINTS = [
    '脚步声', '脚步', '电话铃', '电话铃声', '敲门声', '敲门', '门铃', '铃声', '闹铃',
    '音乐', '背景音乐', '钢琴', '吉他', '小提琴', '鼓声', '萨克斯', '哼唱', '唱歌', '歌声',
    '掌声', '笑声', '欢呼', '哭声', '抽泣', '叹气', '喘气', '呼吸', '心跳', '打鼾', '喷嚏', '咳嗽',
    '雷声', '雷雨', '雨声', '风声', '水声', '火焰', '玻璃碎', '枪声', '爆炸', '警报', '警笛',
    '汽车', '引擎', '引擎声', '人群', '嘈杂', '嘈杂声', '鸟叫', '狗叫', '猫叫', '婴儿',
    '广播', '电视', '收音机', '尖叫', '呻吟', '嗡嗡', '静默', '沉默', '环境音', '背景音',
    '音效', '噪音', '杂音', '旁白', '画外音', '解说', '说话声', '提示音', '掌声', '呼喊',
    'music', 'applause', 'laugh', 'laughs', 'laughing', 'laughter', 'cheer', 'cheers', 'cheering',
    'sound effect', 'sfx', 'cough', 'coughs', 'coughing', 'sneeze', 'sigh', 'sighs', 'sighing',
    'groan', 'scream', 'screams', 'screaming', 'gunshot', 'gunshots', 'explosion', 'engine',
    'thunder', 'rain', 'wind', 'footsteps', 'footstep', 'knock', 'knocking', 'door', 'doorbell',
    'phone', 'ringing', 'ring', 'barking', 'birds', 'bird', 'whisper', 'whispering', 'breathing',
    'heartbeat', 'alarm', 'siren', 'static', 'silence', 'chatter', 'indistinct', 'noise',
    'narration', 'narrator', 'voiceover', 'voice-over', 'background', 'singing', 'sings'
  ];
  var RE_SOUND_TAG = new RegExp('\\s*[\\[【\\(（][^\\]】\\)）]{0,40}(?:' + SOUND_HINTS.join('|') +
                                  ')[^\\]】\\)）]{0,40}[\\]】\\)）]\\s*', 'gi');
  function stripSdh(t) {
    return String(t).replace(RE_SOUND_TAG, ' ').replace(/[ \t]{2,}/g, ' ').trim();
  }

  /* 说话人标签：行首「GEORGE: 」→ 去掉名字。
     ⚠️ 锚定行首 + 全大写（中文「注意：」不是人名）；名字部分非贪婪，单字母说话人 A: 也要能删 */
  var RE_SPEAKER = /^[ \t\-–—]*([A-Z][A-Z0-9 .'\-]{0,28}?)\s*:\s*/;
  function stripSpeaker(t) {
    return String(t).split('\n').map(function (line) {
      var m = RE_SPEAKER.exec(line);
      if (!m) return line;
      var rest = line.slice(m[0].length).trim();
      return rest || '';
    }).join('\n');
  }

  /* 纯歌词条：整条每行都是 ♪…♪ 才算（带歌词的对白不算） */
  var RE_MUSIC_LINE = /^\s*[♪♫♩♬]{1,3}[\s\S]*[♪♫♩♬]{1,3}\s*$|^\s*[\[\(【（][^\]\)】）]{0,60}(?:music|singing|song|theme\s*song)[^\]\)】）]{0,20}[\]\)】）]\s*$/i;
  function isMusicCue(t) {
    var lines = String(t).split('\n').map(function (x) { return x.trim(); }).filter(Boolean);
    return lines.length > 0 && lines.every(function (l) { return RE_MUSIC_LINE.test(l); });
  }

  /* 水印 / 广告行：RE_WM_SOFT 命中的**行**剔掉；整条只剩水印 → 整条跳过 */
  var RE_WM_SOFT = /(https?:\/\/|www\.)\S*|[\w.+-]+@[\w-]+\.[\w.]+|@[A-Za-z0-9_]{4,}|字幕组|字幕\s*(?:由|制作|提供)|subtitle[s]?\s*(?:by|group|team)|\b(?:encoded|synced|synchro(?:nized)?|translated|corrected|resync(?:ed)?|ripped|created)\s+by\b|opensubtitles|subscene|addic7ed|yify|podnapisi|请关注|微信公众号|QQ\s*群|加群|仅供(?:学习|交流|参考)|(?:24|48)\s*小?时内?删除|下载更多|更多资源|压制|校对|时间轴\s*[:：]|本字幕|advertise/i;
  function isWmCue(t) {
    var lines = String(t).split('\n').map(function (x) { return x.trim(); }).filter(Boolean);
    return lines.length > 0 && lines.every(function (l) { return RE_WM_SOFT.test(l); });
  }
  function stripWmLines(t) {
    return String(t).split('\n').filter(function (line) { return !RE_WM_SOFT.test(line); }).join('\n');
  }

  /* =====================================================================
     三、提取布局（本页新写）
     ===================================================================== */

  /* ⚠️ 多语言判据（v0.9.294 定稿）：不许按「是不是中日韩」分文字，要按「词间写不写空格」分。
     RE_NOSPACE = 中日 / 泰 / 老挝 / 缅甸 / 高棉 / 藏 —— 词间本就不写空格 → 折行直接连
     其余（拉丁、西里尔、希腊、阿拉伯、希伯来、越南字母、谚文）→ 折行连接必须加空格 */
  var RE_NOSPACE = /[\u3040-\u30FF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF\u0E00-\u0E7F\u0E80-\u0EFF\u1000-\u109F\u1780-\u17FF\u0F00-\u0FFF]/;
  /* 一段文本连接时用不用空格：以「无空格字符 vs 空格书写字符」的占比判断（混排取多数） */
  var RE_SPACED = /[A-Za-z\u0400-\u04FF\u0370-\u03FF\u0590-\u05FF\u0600-\u06FF\uAC00-\uD7AF\u1100-\u11FF\u1E00-\u1EFF]/;
  /* v0.9.366：接缝判定改成「看两侧最靠边的那一个**文字字符**」——
     只要有一侧属于「词间要写空格」的文字（拉丁 / 西里尔 / 谚文 …）就补空格，
     两侧都是中日泰这类本来就不断词的文字才直接连。
     旧写法是拿两侧各 4 个字符去比「哪种字符多」：英文那半长一点短一点结论就翻，
     同一份文件里第 1、3 条有空格、第 2、4 条没有（v0.9.365 实测）。
     判定要跳过标点、数字、空格：句末是「。」「%」「）」时都不算数，得往里找到真正的字。 */
  function scriptOf(s, fromEnd) {
    s = String(s == null ? '' : s);
    for (var i = fromEnd ? s.length - 1 : 0; fromEnd ? i >= 0 : i < s.length; fromEnd ? i-- : i++) {
      var c = s.charAt(i);
      if (RE_NOSPACE.test(c)) return 'ns';
      if (RE_SPACED.test(c)) return 'sp';
    }
    return '';
  }
  function nospaceJoin(a, b) {
    /* 返回 true = 直接连（不加空格）。两侧找不到文字字符时按「要空格」处理，
       比把数字串 / 纯标点误判成中文安全。 */
    return scriptOf(a, true) === 'ns' && scriptOf(b, false) === 'ns';
  }
  function joinParts(parts) {
    var out = '';
    parts.forEach(function (p) {
      if (!p) return;
      if (!out) { out = p; return; }
      out = nospaceJoin(out.slice(-4), p.slice(0, 4)) ? out + p : out + ' ' + p;
    });
    return out;
  }

  /* 一条 cue → 一行台词（折行折成一个自然段） */
  function cueToLine(text) {
    var rows = String(text).split('\n').map(function (x) { return x.trim(); }).filter(Boolean);
    return joinParts(rows);
  }

  /* 句末标点：判断要不要在段落里断句 */
  var RE_SENT_END = /[。．！？!?….;；:：]["'”』」）)\]]*$/;

  var LAYOUTS = [
    { id: 'para', key: 'layPara' },
    { id: 'lines', key: 'layLines' }
  ];

  /* 主入口：cues（parse 的产物）+ 选项 → { text, stat }
     opt = {
       layout: 'para' | 'lines',
       sdh: bool      去听障提示（默认 true）
       speaker: bool  去说话人前缀（默认 false —— 剧本式提取要留着说话人）
       music: bool    跳过纯歌词条（默认 false —— 歌词也是词）
       dedupe: bool   相邻重复条去重（默认 true —— 同句闪两次是播放事故不是复读）
       wm: bool       去水印 / 广告行（默认 true）
     } */
  function extract(cues, opt) {
    var o = {
      layout: (opt && opt.layout) === 'lines' ? 'lines' : 'para',
      sdh: opt ? opt.sdh !== false : true,
      speaker: opt ? !!opt.speaker : false,
      music: opt ? !!opt.music : false,
      dedupe: opt ? opt.dedupe !== false : true,
      wm: opt ? opt.wm !== false : true
    };
    var stat = { cues: (cues || []).length, lines: 0, chars: 0, skipped: 0, music: 0, wm: 0 };
    var rows = [];      /* 每条留下的 cue → { start, end, text(一行) } */
    var prev = null;

    (cues || []).forEach(function (c) {
      var t = plain(String(c.text == null ? '' : c.text));
      if (o.music && isMusicCue(t)) { stat.music++; stat.skipped++; return; }
      if (o.wm && isWmCue(t)) { stat.wm++; stat.skipped++; return; }
      if (o.sdh) t = stripSdh(t);
      if (o.speaker) t = stripSpeaker(t);
      if (o.wm) t = stripWmLines(t);
      t = stripHtml(stripCtrl(t));
      t = t.split('\n').map(function (x) { return x.replace(/[ \t]+/g, ' ').trim(); })
        .filter(Boolean).join('\n');
      if (!t.replace(/\s/g, '')) { stat.skipped++; return; }
      var line = cueToLine(t);
      if (!line) { stat.skipped++; return; }
      /* 去重只看紧挨着的下一条（隔了别的台词再重复 = 有语义，不算事故） */
      if (o.dedupe && prev && line === prev.text) { stat.skipped++; return; }
      var row = { start: c.start, end: c.end, text: line };
      rows.push(row);
      prev = row;
    });

    var text;
    if (o.layout === 'lines') {
      text = rows.map(function (r) { return r.text; }).join('\n') + (rows.length ? '\n' : '');
      stat.lines = rows.length;
    } else {
      /* 连续段落：停顿（相邻条间隔 ≥ 1500ms）或上一条句末有标点 → 换段；
         连读的短句并成一句。段落间用空行分隔，读起来才像文章。 */
      var paras = [], buf = [];
      rows.forEach(function (r, i) {
        if (i > 0) {
          var gap = r.start - rows[i - 1].end;
          var prevEnds = RE_SENT_END.test(rows[i - 1].text);
          if (gap >= 1500 || prevEnds) {
            if (buf.length) paras.push(joinParts(buf));
            buf = [];
          }
        }
        buf.push(r.text);
      });
      if (buf.length) paras.push(joinParts(buf));
      text = paras.join('\n\n') + (paras.length ? '\n' : '');
      stat.lines = paras.length;
    }
    stat.chars = String(text).replace(/\s/g, '').length;
    return { text: text, stat: stat };
  }

  return {
    READABLE: READABLE,
    LAYOUTS: LAYOUTS,
    detect: detect,
    parse: parse,
    extract: extract,
    isMusicCue: isMusicCue,
    isWmCue: isWmCue,
    stripSdh: stripSdh,
    stripSpeaker: stripSpeaker,
    nospaceJoin: nospaceJoin,
    joinParts: joinParts
  };
});
