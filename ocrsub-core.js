/* ocrsub-core.js —— 画面硬字幕提取页的独立引擎（v0.9.356）
 *
 * 干什么：视频里**烧死在画面上的字幕**（抖音、录屏、老片源）没法像内封字幕那样
 * 抽轨道，只能一帧一帧看。这一层负责「看」的部分里所有能算的东西：
 *   ① 该在哪些时间点取帧
 *   ② 字幕区域怎么裁
 *   ③ 裁下来的图怎么做二值化（白字黑底最容易认）
 *   ④ 一帧帧认出来的文字怎么合并成一条字幕（连续相同 → 一条）
 *
 * ⚠️ 识别本身（tesseract）在页面里跑，这一层不引任何外部库，
 *    所以能用 Node 直接跑单测 —— 合并规则是最容易写错的地方。
 *
 * ⚠️ 为什么必须二值化：实测同一张图，整帧丢进去置信度 81、只裁区域 58、
 *    裁完再二值化 94。字幕是「高亮文字 + 深色描边」，把亮度一刀切开，
 *    背景的花花绿绿就全没了，识别器只需要认形状。
 *
 * 浏览器 <script src> 与 Node (require) 通用。
 */
(function (root, factory) {
  if (typeof module !== 'undefined' && module.exports) module.exports = factory();
  else root.OcrSubCore = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  /* ---------------- 抽帧 ---------------- */

  /* 字幕停留通常在 1~3 秒。每秒 2 帧足够抓到每一条，又能把总帧数压住。
     durationMs 是视频总长；返回 [{ ms, i }]，i 是第几帧。 */
  function planFrames(durationMs, fps) {
    var rate = Math.max(0.5, Math.min(6, Number(fps) || 2));
    var step = 1000 / rate;
    var total = Math.max(0, Number(durationMs) || 0);
    var out = [], t = 0, i = 0;
    /* 从半帧处开始：正好 0 秒常常是黑场或片头 */
    for (t = step / 2; t < total; t += step) {
      out.push({ ms: Math.round(t), i: i++ });
    }
    if (!out.length) out.push({ ms: 0, i: 0 });
    return out;
  }

  /* 字幕区按百分比给：默认底部 22%，左右各留 4%。
     返回的是**源视频像素**坐标，调用方直接拿去 drawImage。 */
  function cropRect(videoW, videoH, pct) {
    var p = pct || {};
    var top = clamp01(p.top == null ? 0.78 : p.top);
    var bottom = clamp01(p.bottom == null ? 1 : p.bottom);
    var left = clamp01(p.left == null ? 0.04 : p.left);
    var right = clamp01(p.right == null ? 0.96 : p.right);
    if (bottom <= top) bottom = Math.min(1, top + 0.05);
    if (right <= left) right = Math.min(1, left + 0.05);
    var x = Math.round(videoW * left), y = Math.round(videoH * top);
    var w = Math.round(videoW * (right - left)), h = Math.round(videoH * (bottom - top));
    return {
      x: Math.max(0, x), y: Math.max(0, y),
      w: Math.max(1, Math.min(videoW - x, w)),
      h: Math.max(1, Math.min(videoH - y, h))
    };
  }
  function clamp01(v) { v = Number(v); return isFinite(v) ? Math.max(0, Math.min(1, v)) : 0; }

  /* ---------------- 二值化 ---------------- */

  /* 只留亮部：亮度 > 阈值 → 黑字白底（tesseract 认深色字更稳）。
     返回新的 Uint8ClampedArray（RGBA），不改入参。
     data 是 ImageData.data 那种 RGBA 连续数组。 */
  function binarize(data, threshold) {
    var th = Math.max(0, Math.min(255, Number(threshold) || 200));
    var out = new Uint8ClampedArray(data.length);
    for (var i = 0; i < data.length; i += 4) {
      var lum = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
      var v = lum >= th ? 0 : 255;
      out[i] = out[i + 1] = out[i + 2] = v;
      out[i + 3] = 255;
    }
    return out;
  }

  /* 先估一个阈值：取整幅图亮度的高分位（字幕通常是最亮的那一小撮）。
     用户在页面上还能再手动调。 */
  function guessThreshold(data) {
    var hist = new Array(256);
    for (var k = 0; k < 256; k++) hist[k] = 0;
    var n = 0;
    for (var i = 0; i < data.length; i += 4) {
      var lum = Math.round(0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]);
      hist[lum]++; n++;
    }
    if (!n) return 200;
    /* 从最亮端往下累计 6% 的像素，落到的亮度就是阈值 */
    var want = n * 0.06, acc = 0;
    for (var v = 255; v >= 0; v--) {
      acc += hist[v];
      if (acc >= want) {
        /* 高光噪声多的时候别把阈值压太低 */
        return Math.max(120, Math.min(245, v - 8));
      }
    }
    return 200;
  }

  /* ---------------- 文本清洗 ---------------- */

  function isCJK(ch) {
    if (!ch) return false;
    var c = ch.codePointAt(0);
    return (c >= 0x2e80 && c <= 0x9fff) || (c >= 0x3000 && c <= 0x303f) ||
           (c >= 0xf900 && c <= 0xfaff) || (c >= 0xff00 && c <= 0xff60);
  }

  /* OCR 出来的中文常被插空格（「这 是 测试 字幕」）。只删 CJK 之间那一个空格。
     另外把只有标点/噪声的残片丢掉 —— 那些多半是边框、进度条、台标。 */
  function cleanLine(text, lang) {
    var s = String(text == null ? '' : text);
    s = s.replace(/\r/g, '');
    var CJK = '[\\u2e80-\\u9fff\\u3000-\\u303f\\uf900-\\ufaff]';
    s = s.replace(new RegExp('(' + CJK + ')\\s+(?=' + CJK + ')', 'g'), '$1');
    s = s.replace(/\s+([，。！？；：、）】》」』])/g, '$1');
    s = s.replace(new RegExp('([，。！？；：、])\\s+(?=' + CJK + ')', 'g'), '$1');
    s = s.replace(/[ \t]+/g, ' ').trim();
    return s;
  }

  /* 一帧里可能有多行。逐行清洗，丢掉不像台词的残片。 */
  function cleanFrame(text, lang) {
    var raw = String(text == null ? '' : text).split('\n');
    var out = [];
    for (var i = 0; i < raw.length; i++) {
      var s = cleanLine(raw[i], lang);
      if (!s) continue;
      if (!looksLikeSpeech(s)) continue;
      out.push(s);
    }
    return out.join('\n').trim();
  }

  /* 判「像不像一句话」：纯符号、单字符的拉丁/数字、超长的乱码串都不算。 */
  function looksLikeSpeech(s) {
    var t = String(s || '').trim();
    if (!t) return false;
    var meaningful = 0;
    for (var i = 0; i < t.length; i++) {
      var ch = t[i];
      if (isCJK(ch)) { meaningful += 2; continue; }
      if (/[A-Za-z0-9\u0400-\u04ff\u0600-\u06ff\u0e00-\u0e7f]/.test(ch)) meaningful += 1;
    }
    if (meaningful < 2) return false;
    /* 符号占比过半的直接丢 */
    var sym = (t.match(/[^\w\s\u2e80-\u9fff\u3000-\u303f\uf900-\ufaff]/g) || []).length;
    if (sym / t.length > 0.5) return false;
    return true;
  }

  /* ---------------- 相似度 ---------------- */

  function levenshtein(a, b) {
    a = String(a); b = String(b);
    if (a === b) return 0;
    var n = a.length, m = b.length;
    if (!n) return m;
    if (!m) return n;
    var prev = new Array(m + 1), cur = new Array(m + 1), i, j;
    for (j = 0; j <= m; j++) prev[j] = j;
    for (i = 1; i <= n; i++) {
      cur[0] = i;
      for (j = 1; j <= m; j++) {
        var cost = a[i - 1] === b[j - 1] ? 0 : 1;
        cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + cost);
      }
      for (j = 0; j <= m; j++) prev[j] = cur[j];
    }
    return prev[m];
  }

  /* 同一句字幕在不同帧里常常差一两个字（压缩噪点、描边）。容忍 25%。 */
  function similar(a, b, tol) {
    a = String(a || ''); b = String(b || '');
    if (!a || !b) return false;
    if (a === b) return true;
    var longest = Math.max(a.length, b.length);
    if (longest < 3) return a === b;
    var d = levenshtein(a, b);
    return d / longest <= (tol == null ? 0.25 : tol);
  }

  /* ---------------- 合并 ---------------- */

  /* frames: [{ ms, text }]（按 ms 升序，text 可以是空串）
     返回 [{ start, end, text }]，毫秒。
     opts: { frameDur, tolerance, minDur, maxDur, gap }
       frameDur —— 一帧代表多长时间（1/fps * 1000），用来给最后一条补尾巴
       tolerance —— 相似度阈值 */
  function mergeFrames(frames, opts) {
    var o = opts || {};
    var frameDur = Number(o.frameDur) || 500;
    var tol = o.tolerance == null ? 0.25 : o.tolerance;
    var minDur = o.minDur == null ? 600 : o.minDur;
    var maxDur = o.maxDur == null ? 8000 : o.maxDur;
    var gap = o.gap == null ? 80 : o.gap;

    var list = Array.isArray(frames) ? frames : [];
    var groups = [], cur = null;

    for (var i = 0; i < list.length; i++) {
      var f = list[i] || {};
      var txt = cleanFrame(f.text, o.lang);
      if (!txt) {
        if (cur) { groups.push(cur); cur = null; }
        continue;
      }
      if (cur && similar(cur.text, txt, tol)) {
        cur.votes++;
        cur.last = f.ms;
        /* 取「更长的那一版」当正文：OCR 漏字比多字常见 */
        if (txt.length > cur.text.length) cur.text = txt;
      } else {
        if (cur) groups.push(cur);
        cur = { text: txt, first: f.ms, last: f.ms, votes: 1 };
      }
    }
    if (cur) groups.push(cur);

    var cues = [];
    for (var g = 0; g < groups.length; g++) {
      var it = groups[g];
      var start = it.first;
      var end = it.last + frameDur;
      /* 末帧的尾巴不能盖住下一条的开头 */
      if (g + 1 < groups.length) end = Math.min(end, groups[g + 1].first - gap);
      if (end - start < minDur) end = start + minDur;
      if (end - start > maxDur) end = start + maxDur;
      if (end <= start) end = start + 400;
      cues.push({ start: Math.round(start), end: Math.round(end), text: it.text, votes: it.votes });
    }
    return cues;
  }

  /* ---------------- 导出 ---------------- */

  function pad(n, w) { var s = String(n); while (s.length < w) s = '0' + s; return s; }
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
  function toTxt(cues) {
    var out = [];
    for (var i = 0; i < cues.length; i++) out.push(cues[i].text.replace(/\n/g, ' '));
    return out.join('\n') + (out.length ? '\n' : '');
  }

  /* ---------------- tesseract 语言包对应 ---------------- */

  var OCR_LANG = {
    'zh-CN': 'chi_sim', 'zh-TW': 'chi_tra', ja: 'jpn', ko: 'kor', en: 'eng',
    ru: 'rus', uk: 'ukr', be: 'bel', bg: 'bul', sr: 'srp', mk: 'mkd',
    es: 'spa', pt: 'por', fr: 'fra', de: 'deu', it: 'ita', nl: 'nld',
    da: 'dan', sv: 'swe', nb: 'nor', fi: 'fin', pl: 'pol', cs: 'ces', sk: 'slk',
    hu: 'hun', ro: 'ron', hr: 'hrv', sl: 'slv', et: 'est', lv: 'lav', lt: 'lit',
    el: 'ell', tr: 'tur', ar: 'ara', fa: 'fas', he: 'heb', ur: 'urd',
    hi: 'hin', bn: 'ben', ta: 'tam', te: 'tel', mr: 'mar', gu: 'guj',
    kn: 'kan', ml: 'mal', pa: 'pan', ne: 'nep', si: 'sin',
    th: 'tha', vi: 'vie', id: 'ind', ms: 'msa', tl: 'tgl', fil: 'tgl',
    my: 'mya', km: 'khm', lo: 'lao', ka: 'kat', hy: 'hye', az: 'aze',
    kk: 'kaz', uz: 'uzb', mn: 'mon', sw: 'swa', am: 'amh', af: 'afr',
    ca: 'cat', gl: 'glg', eu: 'eus', sq: 'sqi', is: 'isl', mt: 'mlt',
    cy: 'cym', ga: 'gle', la: 'lat'
  };

  return {
    planFrames: planFrames,
    cropRect: cropRect,
    binarize: binarize,
    guessThreshold: guessThreshold,
    cleanLine: cleanLine,
    cleanFrame: cleanFrame,
    looksLikeSpeech: looksLikeSpeech,
    similar: similar,
    levenshtein: levenshtein,
    mergeFrames: mergeFrames,
    toSrt: toSrt,
    toVtt: toVtt,
    toTxt: toTxt,
    OCR_LANG: OCR_LANG
  };
});
