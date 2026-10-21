/* autosub-core.js —— 自动生成字幕页的独立引擎（v0.9.356）
 *
 * 只做一件事：把语音识别给出的**词级时间戳**整理成能直接用的字幕条目。
 * 与 srt-core.js / ytfix-core.js / shift-core.js 硬隔离 —— 本文件只被 autosub.html
 * 与 autosub-worker.js 加载，不引入也不修改任何现有引擎（新功能复制另写一份）。
 *
 * 为什么不能直接把识别结果当字幕用
 * ------------------------------
 * 识别引擎（whisper）给的是「一串词 + 每个词的真实起止时间」。它不知道什么叫
 * 「一条字幕」：句号后面不会自动断开，长句也不会自己折行。直接按 30 秒一块导出，
 * 用户拿到的是一条条读不完的长条。所以这一层要做三件事：
 *   ① 按句子切开（每种语言的句末标点不一样，泰文甚至没有句号）
 *   ② 一条放不下就按逗号/词边界再切，保证每行不超宽、整条不超时长
 *   ③ 按阅读速度补最短停留时间，条与条之间留出间隙，时间不许倒退、不许重叠
 *
 * ⚠️ 中文/日文词之间**不加空格**：whisper 的中文输出是一个字或一个词一个 token，
 *    如果按英文习惯 join(' ') 会变成「今 天 天 气 很 好」。判断依据是相邻字符的
 *    文字系统，不是「语言」字段 —— 因为一条中英混排的字幕里两种都要成立。
 * ⚠️ 标点常常单独成一个 token（'，' / '.'），它前面绝对不能补空格。
 *
 * 浏览器 <script src> 与 Node (require) 通用。所有函数纯操作数据，不碰 DOM。
 */
(function (root, factory) {
  if (typeof module !== 'undefined' && module.exports) module.exports = factory();
  else root.AutoSubCore = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  /* ---------------- 文字系统 ---------------- */

  /* CJK：汉字、假名、谚文、全角标点。这些字符之间不加空格。 */
  function isCJK(ch) {
    if (!ch) return false;
    var c = ch.codePointAt(0);
    return (c >= 0x2e80 && c <= 0x9fff) ||
           (c >= 0x3000 && c <= 0x303f) ||
           (c >= 0x1100 && c <= 0x11ff) ||
           (c >= 0xac00 && c <= 0xd7af) ||
           (c >= 0xf900 && c <= 0xfaff) ||
           (c >= 0xff00 && c <= 0xff60) ||
           (c >= 0x20000 && c <= 0x2fa1f);
  }

  /* 半角标点上不能前置空格的那批 */
  var NO_SPACE_BEFORE = ',.!?;:%)]}，。！？；：、）】》」』”’…·';
  var NO_SPACE_AFTER = '([{（【《「『“‘';

  /* 显示宽度：CJK 算 2，其余算 1（组合记号算 0，避免泰文/天城文被高估） */
  function widthOf(text) {
    var w = 0, s = String(text == null ? '' : text);
    for (var i = 0; i < s.length; i++) {
      var c = s.codePointAt(i);
      if (c > 0xffff) i++;
      if (c >= 0x0300 && c <= 0x036f) continue;          /* 组合记号 */
      if (c >= 0x0e31 && c <= 0x0e3a) continue;          /* 泰文元音/声调 */
      if (c >= 0x0e47 && c <= 0x0e4e) continue;
      if (c >= 0x0900 && c <= 0x0903) continue;          /* 天城文符号 */
      if (c >= 0x093a && c <= 0x094f) continue;
      w += isCJK(s[i]) ? 2 : 1;
    }
    return w;
  }

  /* ---------------- 句末与句内标点 ---------------- */

  /* 句末标点：各语言自己的那一套。
     ⚠️ 英文句点最容易误判（Mr. / No. / 3.14 / U.S.），所以单独处理。 */
  var END_PUNCT = '。！？!?…';
  var END_PUNCT_EXTRA = { hi: '।', ar: '؟', fa: '؟', ur: '؟', hy: '։', am: '።', th: '', ja: '。', 'zh-CN': '。', 'zh-TW': '。' };
  var CLAUSE_PUNCT = '，,、；;：:—–';

  /* 常见缩写：以它结尾的句点不算句末 */
  var ABBR = {};
  ('mr mrs ms dr prof sr jr st vs etc inc ltd co no fig vol al approx dept univ assn bros ' +
   'jan feb mar apr jun jul aug sep sept oct nov dec mon tue wed thu fri sat sun')
    .split(' ').forEach(function (k) { ABBR[k] = 1; });

  function endsSentence(text, lang) {
    var s = String(text || '').trim();
    /* 先剥尾部成对的引号/括号：「他说：»好。「」 这类 */
    s = s.replace(/[”’"'）)\]】》」』]+$/g, '');
    if (!s) return false;
    var last = s[s.length - 1];
    if (END_PUNCT.indexOf(last) >= 0) return true;
    var extra = END_PUNCT_EXTRA[lang];
    if (extra && last === extra) return true;
    /* 拉丁句点 */
    if (last === '.') {
      /* 数字小数点：3.14 / 1.2.3 */
      if (/\d\.$/.test(s) && /\d/.test(s.replace(/\.$/, '').slice(-1))) return false;
      var m = /([A-Za-z]{1,5})\.$/.exec(s);
      if (m && ABBR[m[1].toLowerCase()]) return false;
      /* 单个大写字母 + 句点：缩写（U.S. 的第二个点会被上面剥成 S.） */
      if (/^[A-Z]\.$/.test(s.slice(-2))) return false;
      return true;
    }
    return false;
  }

  function isPunctOnly(text) {
    return /^[\s，。！？、；：,.!?;:…·\-–—'"“”‘’（）()\[\]【】《》「」『』]+$/.test(String(text || ''));
  }

  /* ---------------- 词的拼接 ---------------- */

  function needSpace(prevText, nextText) {
    if (!prevText || !nextText) return false;
    var a = prevText[prevText.length - 1], b = nextText[0];
    if (isCJK(a) || isCJK(b)) return false;
    if (NO_SPACE_BEFORE.indexOf(b) >= 0) return false;
    if (NO_SPACE_AFTER.indexOf(a) >= 0) return false;
    return true;
  }

  /* 把一组词拼成一行文本 */
  function joinTokens(tokens) {
    var out = '';
    for (var i = 0; i < tokens.length; i++) {
      var t = String(tokens[i].text == null ? '' : tokens[i].text);
      if (!t) continue;
      if (out && needSpace(out, t)) out += ' ';
      out += t;
    }
    return out.replace(/\s+/g, ' ').trim();
  }

  /* ---------------- 输入清洗 ---------------- */

  /* whisper 的 words 会长这样：{ text:' 你好', start:120, end:340 }
     - 有些词是纯空白或纯标点
     - 最后一两个词的 end 可能是 null
     - 分块重叠处可能出现重复词（stride） */
  function normalizeWords(words, totalMs) {
    var src = Array.isArray(words) ? words : [];
    var out = [], i, w, prevEnd = 0;
    for (i = 0; i < src.length; i++) {
      w = src[i] || {};
      var text = String(w.text == null ? '' : w.text).replace(/\s+/g, ' ');
      if (!text.trim()) continue;
      var start = Number(w.start), end = Number(w.end);
      if (!isFinite(start) || start < 0) start = prevEnd;
      if (!isFinite(end) || end <= start) end = start + Math.max(120, text.trim().length * 60);
      /* 分块接缝：同一文本、时间几乎相同 → 丢掉后一个 */
      var last = out[out.length - 1];
      if (last && last.text === text.trim() && Math.abs(last.start - start) < 60) continue;
      out.push({ text: text.trim(), start: Math.round(start), end: Math.round(end) });
      prevEnd = Math.round(end);
    }
    /* 单调化：后面不许跑到前面去 */
    for (i = 1; i < out.length; i++) {
      if (out[i].start < out[i - 1].start) out[i].start = out[i - 1].start;
      if (out[i].end <= out[i].start) out[i].end = out[i].start + 120;
    }
    if (out.length && isFinite(totalMs) && totalMs > 0) {
      var lastCue = out[out.length - 1];
      if (lastCue.end > totalMs) lastCue.end = Math.round(totalMs);
      if (lastCue.end <= lastCue.start) lastCue.end = lastCue.start + 120;
    }
    return out;
  }

  /* ---------------- 切句 ---------------- */

  function splitSentences(tokens, lang) {
    var out = [], cur = [];
    for (var i = 0; i < tokens.length; i++) {
      cur.push(tokens[i]);
      if (endsSentence(tokens[i].text, lang)) {
        out.push(cur); cur = [];
      }
    }
    if (cur.length) out.push(cur);
    return out;
  }

  /* 句内按逗号等切成子句（用于「一句太长」时找落点） */
  function splitClauses(tokens) {
    var out = [], cur = [];
    for (var i = 0; i < tokens.length; i++) {
      cur.push(tokens[i]);
      var t = tokens[i].text;
      if (t && CLAUSE_PUNCT.indexOf(t[t.length - 1]) >= 0) { out.push(cur); cur = []; }
    }
    if (cur.length) out.push(cur);
    return out;
  }

  /* ---------------- 切条 ---------------- */

  var DEFAULTS = {
    maxWidth: 42,      /* 单行半角宽度：拉丁 42，CJK 32（=16 全角字） */
    maxLines: 2,
    maxDur: 7000,
    minDur: 800,
    maxCps: 20,        /* 半角宽度/秒 */
    gap: 60            /* 条间间隙（毫秒） */
  };

  /* 按语言给一套默认值。lang 用站点那套代码（zh-CN / zh-TW / ja / ar …）。 */
  function optsForLang(lang, extra) {
    var o = {};
    for (var k in DEFAULTS) o[k] = DEFAULTS[k];
    var cjk = /^(zh|ja|ko|yue)/.test(lang || '');
    if (cjk) { o.maxWidth = 32; o.maxCps = 18; }
    if (lang === 'th' || lang === 'lo' || lang === 'my' || lang === 'km') { o.maxWidth = 40; o.maxCps = 16; }
    if (lang === 'ar' || lang === 'fa' || lang === 'ur' || lang === 'he') { o.maxWidth = 40; }
    if (extra) for (var j in extra) if (extra[j] != null) o[j] = extra[j];
    return o;
  }

  function tokensSpan(tokens) {
    if (!tokens || !tokens.length) return 0;
    return tokens[tokens.length - 1].end - tokens[0].start;
  }

  /* 把一句（可能很长）切成若干条，每条最多 maxLines 行 */
  function cutSentence(tokens, o) {
    var pieces = [], cur = [], curW = 0;
    var limitW = o.maxWidth * o.maxLines;

    function pushCur() {
      if (cur.length) { pieces.push(cur); cur = []; curW = 0; }
    }

    for (var i = 0; i < tokens.length; i++) {
      var tok = tokens[i];
      var w = widthOf(tok.text);
      var wouldW = curW + w + (cur.length ? 1 : 0);
      var wouldDur = cur.length ? (tok.end - cur[0].start) : 0;

      /* 主动断点：一行已经写满，且上一个词正好收在逗号上 → 在这里切。
         不这么切的话，一条会一路吃到「两行满 / 7 秒」才断，
         结果就是「第2句，」被挂在上一句尾巴上，下一条从正文中间开始。
         ⚠️ 切点只能落在词与词之间 —— 识别器的中文 token 是 BPE 子词，
            按字符切会把「第2/句」劈成两条。 */
      if (cur.length && curW >= o.maxWidth) {
        var tail = cur[cur.length - 1].text;
        if (CLAUSE_PUNCT.indexOf(tail.slice(-1)) >= 0) pushCur();
      }

      /* 已经装不下：先尝试在最近一个逗号处回退切（避免把子句劈开） */
      if (cur.length && (wouldW > limitW || wouldDur > o.maxDur)) {
        var cutAt = -1;
        for (var b = cur.length - 1; b >= Math.max(0, cur.length - 6); b--) {
          if (CLAUSE_PUNCT.indexOf(cur[b].text.slice(-1)) >= 0) { cutAt = b + 1; break; }
        }
        if (cutAt > 0 && cutAt < cur.length) {
          var carry = cur.slice(cutAt);
          cur = cur.slice(0, cutAt);
          pushCur();
          cur = carry;
          curW = widthOf(joinTokens(cur));
        } else {
          pushCur();
          cur = [tok];
          curW = w;
        }
        continue;
      }
      cur.push(tok);
      curW = widthOf(joinTokens(cur));
    }
    pushCur();
    return pieces;
  }

  /* 折行：不超 maxWidth 的前提下，优先在逗号/空格处断 */
  function wrapLines(text, o) {
    var txt = String(text || '').trim();
    if (widthOf(txt) <= o.maxWidth) return txt;

    /* 候选断点：标点后、空格处、中文与拉丁/数字的交界处 */
    var best = -1, bestScore = 1e9, n = txt.length;
    for (var i = 1; i < n; i++) {
      var a = txt[i - 1], b = txt[i];
      /* 不许把一个拉丁词或一串数字劈成两半（『字9字10』不能切成『字9字1 / 0字』） */
      if (/[0-9A-Za-z]/.test(a) && /[0-9A-Za-z]/.test(b)) continue;
      var score = 1e9;
      if (CLAUSE_PUNCT.indexOf(a) >= 0) score = 0;
      else if (a === ' ') score = 1;
      else if (isCJK(a) !== isCJK(b)) score = 2;
      else if (isCJK(a) && isCJK(b)) score = 3;
      if (score < bestScore) {
        var left = txt.slice(0, i).trim(), right = txt.slice(i).trim();
        if (!left || !right) continue;
        /* 两行都要放得下才考虑 */
        if (widthOf(left) > o.maxWidth || widthOf(right) > o.maxWidth) continue;
        bestScore = score; best = i;
      }
    }
    if (best < 0) {
      /* 找不到合规落点：按宽度硬切（宁可两行都满，也不留一条超宽） */
      var acc = 0, cut = n;
      for (var k = 0; k < n; k++) {
        acc += isCJK(txt[k]) ? 2 : 1;
        if (acc > o.maxWidth) { cut = k; break; }
      }
      if (cut <= 0 || cut >= n) return txt;
      return txt.slice(0, cut).trim() + '\n' + txt.slice(cut).trim();
    }
    return txt.slice(0, best).trim() + '\n' + txt.slice(best).trim();
  }

  /* 时间收尾：最短停留、条间间隙、不许重叠 */
  function finalizeTimes(cues, o) {
    var i, c;
    for (i = 0; i < cues.length; i++) {
      c = cues[i];
      var w = widthOf(c.text.replace(/\n/g, ''));
      var need = Math.max(o.minDur, Math.round(w / o.maxCps * 1000));
      if (c.end - c.start < need) c.end = c.start + need;
      if (c.end - c.start > o.maxDur) c.end = c.start + o.maxDur;
    }
    for (i = 0; i < cues.length - 1; i++) {
      var next = cues[i + 1];
      var room = next.start - o.gap;
      if (cues[i].end > room) cues[i].end = Math.max(cues[i].start + 200, room);
    }
    return cues;
  }

  /* ---------------- 主流程 ---------------- */

  function buildCues(words, opts) {
    var o = optsForLang(opts && opts.lang, opts);
    var tokens = normalizeWords(words, opts && opts.totalMs);
    if (!tokens.length) return { cues: [], stats: { cues: 0, chars: 0, maxCps: 0 } };

    var sentences = splitSentences(tokens, (opts && opts.lang) || '');
    var cues = [];

    for (var i = 0; i < sentences.length; i++) {
      var s = sentences[i];
      var pieces = cutSentence(s, o);
      for (var j = 0; j < pieces.length; j++) {
        var p = pieces[j];
        if (!p.length) continue;
        var text = joinTokens(p);
        if (!text) continue;
        cues.push({
          start: p[0].start,
          end: p[p.length - 1].end,
          text: wrapLines(text, o)
        });
      }
    }

    cues = finalizeTimes(cues, o);

    var maxCps = 0, chars = 0;
    for (var k = 0; k < cues.length; k++) {
      var w = widthOf(cues[k].text.replace(/\n/g, ''));
      chars += w;
      var d = (cues[k].end - cues[k].start) / 1000;
      if (d > 0) maxCps = Math.max(maxCps, Math.round(w / d));
    }
    return {
      cues: cues,
      stats: { cues: cues.length, chars: chars, maxCps: maxCps, lastEnd: cues.length ? cues[cues.length - 1].end : 0 }
    };
  }

  /* ---------------- 导出 ---------------- */

  function pad(n, w) {
    var s = String(n);
    while (s.length < w) s = '0' + s;
    return s;
  }
  function srtTime(ms) {
    ms = Math.max(0, Math.round(ms));
    return pad(Math.floor(ms / 3600000), 2) + ':' + pad(Math.floor(ms / 60000) % 60, 2) + ':' +
      pad(Math.floor(ms / 1000) % 60, 2) + ',' + pad(ms % 1000, 3);
  }
  function vttTime(ms) {
    ms = Math.max(0, Math.round(ms));
    return pad(Math.floor(ms / 3600000), 2) + ':' + pad(Math.floor(ms / 60000) % 60, 2) + ':' +
      pad(Math.floor(ms / 1000) % 60, 2) + '.' + pad(ms % 1000, 3);
  }

  function toSrt(cues) {
    var out = [];
    for (var i = 0; i < cues.length; i++) {
      out.push((i + 1) + '\n' + srtTime(cues[i].start) + ' --> ' + srtTime(cues[i].end) + '\n' + cues[i].text);
    }
    return out.join('\n\n') + (out.length ? '\n' : '');
  }

  function toVtt(cues) {
    var out = ['WEBVTT', ''];
    for (var i = 0; i < cues.length; i++) {
      out.push(vttTime(cues[i].start) + ' --> ' + vttTime(cues[i].end) + '\n' + cues[i].text);
      out.push('');
    }
    return out.join('\n');
  }

  function toTxt(cues, withTime) {
    var out = [];
    for (var i = 0; i < cues.length; i++) {
      var t = cues[i].text.replace(/\n/g, ' ');
      out.push(withTime ? ('[' + srtTime(cues[i].start) + '] ' + t) : t);
    }
    return out.join('\n') + (out.length ? '\n' : '');
  }

  /* ---------------- 中文输出整理 ---------------- */

  /* whisper 的中文输出有两个固定毛病，导出前必须过一遍：
     ① 字与字之间被插了空格（「今 天 天 气」）—— 只删 CJK 之间那一个空格
     ② 全角标点前后多出空格
     ⚠️ 中英混排里英文单词之间的空格要留着，所以按「相邻字符是否 CJK」判断。 */
  function tidyCJK(text) {
    var s = String(text == null ? '' : text);
    var CJK = '[\\u2e80-\\u9fff\\u3000-\\u303f\\uf900-\\ufaff]';
    s = s.replace(new RegExp('(' + CJK + ')\\s+(?=' + CJK + ')', 'g'), '$1');
    s = s.replace(/\s+([，。！？；：、）】》」』])/g, '$1');
    /* 中文标点后面若紧跟中文，那个空格也是识别器插的；后面是英文则保留 */
    s = s.replace(new RegExp('([，。！？；：、])\\s+(?=' + CJK + ')', 'g'), '$1');
    s = s.replace(/([（【《「『])\s+/g, '$1');
    /* whisper 的中文标点常是半角（"文字,第2句"）。只在**两侧都是中文**时换成全角，
       英文句子里的逗号句点一个都不动。 */
    s = s.replace(new RegExp('(' + CJK + ')\\s*,\\s*(?=' + CJK + ')', 'g'), '$1，');
    s = s.replace(new RegExp('(' + CJK + ')\\s*\\.\\s*(?=' + CJK + ')', 'g'), '$1。');
    s = s.replace(new RegExp('(' + CJK + ')\\s*!\\s*(?=' + CJK + '|$)', 'g'), '$1！');
    s = s.replace(new RegExp('(' + CJK + ')\\s*\\?\\s*(?=' + CJK + '|$)', 'g'), '$1？');
    /* 冒号分号同理：中文对白里「他说:」这种半角冒号很扎眼。
       ⚠️ 同样只在两侧都是中文时换 —— 「3:14」「a:b」这类一个都不许动。 */
    s = s.replace(new RegExp('(' + CJK + ')\\s*:\\s*(?=' + CJK + ')', 'g'), '$1：');
    s = s.replace(new RegExp('(' + CJK + ')\\s*;\\s*(?=' + CJK + ')', 'g'), '$1；');
    /* 条尾那一个标点也归一：中文条目以半角 , . 收尾时换成全角 */
    s = s.replace(new RegExp('(' + CJK + ')\\s*([,.!?])$'), function (m, a, b) {
      return a + ({ ',': '，', '.': '。', '!': '！', '?': '？' })[b];
    });
    return s;
  }

  function tidyCues(cues) {
    var out = [];
    for (var i = 0; i < cues.length; i++) {
      out.push({ start: cues[i].start, end: cues[i].end, text: tidyCJK(cues[i].text) });
    }
    return out;
  }

  /* ---------------- 语言表（whisper 用的是语言名，站点用的是代码） ---------------- */

  /* whisper 的 language 参数收 'chinese' / 'english' 这种英文名。
     这张表把站点的语言代码映射过去；没有对应值的语言返回空串（表示让模型自己判断）。 */
  var WHISPER_LANG = {
    'zh-CN': 'chinese', 'zh-TW': 'chinese', yue: 'chinese', ja: 'japanese', ko: 'korean',
    en: 'english', es: 'spanish', pt: 'portuguese', fr: 'french', de: 'german', it: 'italian',
    ru: 'russian', uk: 'ukrainian', pl: 'polish', cs: 'czech', sk: 'slovak', hu: 'hungarian',
    ro: 'romanian', bg: 'bulgarian', hr: 'croatian', sr: 'serbian', sl: 'slovenian',
    nl: 'dutch', da: 'danish', sv: 'swedish', nb: 'norwegian', fi: 'finnish', is: 'icelandic',
    et: 'estonian', lv: 'latvian', lt: 'lithuanian', el: 'greek', tr: 'turkish',
    ar: 'arabic', fa: 'persian', he: 'hebrew', ur: 'urdu', hi: 'hindi', bn: 'bengali',
    ta: 'tamil', te: 'telugu', mr: 'marathi', gu: 'gujarati', kn: 'kannada', ml: 'malayalam',
    pa: 'punjabi', ne: 'nepali', si: 'sinhala', th: 'thai', vi: 'vietnamese', id: 'indonesian',
    ms: 'malay', tl: 'tagalog', fil: 'tagalog', my: 'burmese', km: 'khmer', lo: 'lao',
    ka: 'georgian', hy: 'armenian', az: 'azerbaijani', kk: 'kazakh', uz: 'uzbek', mn: 'mongolian',
    sw: 'swahili', am: 'amharic', af: 'afrikaans', ca: 'catalan', gl: 'galician', eu: 'basque',
    sq: 'albanian', mk: 'macedonian', bs: 'bosnian', be: 'belarusian', cy: 'welsh', ga: 'irish',
    mt: 'maltese', la: 'latin', eo: 'esperanto'
  };

  return {
    buildCues: buildCues,
    normalizeWords: normalizeWords,
    splitSentences: splitSentences,
    joinTokens: joinTokens,
    wrapLines: wrapLines,
    finalizeTimes: finalizeTimes,
    optsForLang: optsForLang,
    toSrt: toSrt,
    toVtt: toVtt,
    toTxt: toTxt,
    tidyCJK: tidyCJK,
    tidyCues: tidyCues,
    widthOf: widthOf,
    isCJK: isCJK,
    endsSentence: endsSentence,
    WHISPER_LANG: WHISPER_LANG,
    DEFAULTS: DEFAULTS
  };
});
