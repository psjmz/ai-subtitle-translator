/* ktv-core.js —— KTV 卡拉OK字幕引擎（v0.9.406）
   只服务 ktv.html，与其它页面完全分开（三件套硬隔离，复制精简实现、不引共用文件）。

   能力：歌词解析、切成「字/词」单位、按字宽加权均分、逐字连打、边界拖动、导出 ASS(\kf) / 增强LRC / SRT。

   ------------------------------------------------------------------
   数据模型（重要）
   ------------------------------------------------------------------
   一句字幕 = {
     text:  '我手一杯 品尝你的美',
     units: ['我','手','一','杯','品尝','你的','美'],   ← 中文按字、英文按词
     t:     12300,        ← 句首（毫秒），没打过轴就是 null
     end:   16070,        ← 句尾（= 下一句句首，末句兜底）
     edges: [12300, 12630, 12930, ... 15720]
                          ← 长度 = units.length + 1
                            第 i 个单位的区间 = [edges[i], edges[i+1]]
   }
   用 edges 而不是给每个单位存 start/end，好处有三个：
     ① 相邻单位天然共享边界 —— 拖动一次只改一个数，不可能出现裂缝或重叠；
     ② 句尾留白可以直接表达：最后一个 edge 不必等于 line.end，
        留出的那一段就是「唱完了、字还停着」的静止时间；
     ③ 导出时按相邻求差得到每个字的时长，不会因为四舍五入累加出漂移。

   ------------------------------------------------------------------
   两个容易写错的地方（已在内部封装，调用方不要自己拼）
   ------------------------------------------------------------------
   ① ASS 的 \kf 单位是**百分秒**：\kf33 = 330 毫秒，不是 33 毫秒。
   ② ASS 的颜色是 &HAABBGGRR —— 十六进制要**倒着写**：
      #FFD54A（金黄）→ R=FF G=D5 B=4A → &H004AD5FF。写成 &H00FFD54A 会变成蓝色。

   浏览器 <script src> 与 Node (require) 通用。所有函数纯操作数据，不碰 DOM。 */
(function (root, factory) {
  if (typeof define === 'function' && define.amd) define([], factory);
  else if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.KtvCore = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  /* ================= 文字系统 ================= */

  /* 拆成完整 Unicode 字符（ emoji / 部分生僻字是代理对，按 .length 遍历会劈成两半） */
  function cps(s) {
    var out = [], str = String(s == null ? '' : s), i = 0;
    while (i < str.length) {
      var cp = str.codePointAt(i);
      out.push(String.fromCodePoint(cp));
      i += (cp > 0xffff) ? 2 : 1;
    }
    return out;
  }

  /* CJK：汉字、假名、谚文、全角标点。判断单个字符（已按码点拆好） */
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
  function isSpace(ch) { return /\s/.test(String(ch || '')); }
  function isWordChar(ch) { return /[0-9A-Za-z'’\-]/.test(String(ch || '')); }

  /* 标点：一律贴到前一个单位上。单独成一块会出现「标点自己闪一下」的怪效果。
     ⚠️ 全角标点（，。！？这些）的码点落在 CJK 区间里，所以必须在判断 CJK **之前**拦一道，
        否则「你好，世界」会被切成 [你, 好, ，, 世, 界]，逗号自己变成一个扫色单位。 */
  var PUNCT = ',.!?;:…，。！？、；：·—～~《》「」『』【】〔〕（）()[]{}<>';
  function isPunct(ch) {
    var c = String(ch || '');
    return c.length === 1 && PUNCT.indexOf(c) >= 0;
  }

  /* ---------------- 切成「字幕单位」----------------
     中文/日文假名：一个字一个单位（这才是中文卡拉OK的粒度）
     拉丁/数字：整个单词一个单位（英文卡拉OK本来就按词扫，劈成字母会很可笑）
     标点、空格：贴到前一个单位上（单独成一块会出现「标点自己闪一下」很怪） */
  function splitUnits(text) {
    var chars = cps(String(text == null ? '' : text));
    var out = [], i = 0;
    while (i < chars.length) {
      var ch = chars[i];
      if (isSpace(ch)) {
        i++;
        if (out.length) out[out.length - 1] += ch;   /* 空格贴前一个词尾 */
        continue;
      }
      if (isWordChar(ch)) {
        var w = ch; i++;
        while (i < chars.length && isWordChar(chars[i])) { w += chars[i]; i++; }
        out.push(w);
        continue;
      }
      if (isPunct(ch)) {
        i++;
        if (out.length) out[out.length - 1] += ch;
        else out.push(ch);
        continue;
      }
      if (isCJK(ch)) { out.push(ch); i++; continue; }
      /* 剩下的符号（emoji 等）：也贴前一个单位，至少不会被代理对劈成两半 */
      i++;
      if (out.length) out[out.length - 1] += ch;
      else out.push(ch);
    }
    /* 行尾不留游离空格：最后一块如果以空白结尾，剥掉 */
    if (out.length) out[out.length - 1] = out[out.length - 1].replace(/[\s\u3000]+$/g, '');
    return out.filter(function (x) { return x !== ''; });
  }

  /* 视觉宽度近似：全角 2、半角 1、空格 0.5。用于加权分配时长 */
  function widthOfUnit(s) {
    var w = 0, a = cps(s);
    for (var i = 0; i < a.length; i++) {
      if (isSpace(a[i])) w += 0.5;
      else if (isCJK(a[i])) w += 2;
      else w += 1;
    }
    return Math.max(0.3, w);   /* 保底：纯空格的单位不能是 0 宽，否则一个字会被排得很短 */
  }

  /* ================= 歌词解析 ================= */

  function parseLyrics(text) {
    var out = [];
    String(text == null ? '' : text).split(/\r\n|\r|\n/).forEach(function (ln) {
      var s = ln.replace(/^[\s\u3000]+|[\s\u3000]+$/g, '');
      if (s) out.push({ text: s, t: null });
    });
    return out;
  }

  function pad2(n) { return (n < 10 ? '0' : '') + n; }
  function parseLrcTs(str) {
    var m = String(str || '').match(/^(\d+):(\d{1,2})(?:[.:](\d{1,3}))?$/);
    if (!m) return null;
    var cs = m[3] || '0';
    var frac = cs.length === 3 ? +cs : (cs.length === 2 ? +cs * 10 : +cs * 100);
    return (+m[1]) * 60000 + (+m[2]) * 1000 + frac;
  }

  /* 简易 LRC 解析：带 [mm:ss.xx] 的读时间，普通行保留为 t=null，元数据行跳过 */
  function parseLrc(text) {
    var out = [];
    String(text == null ? '' : text).split(/\r\n|\r|\n/).forEach(function (ln) {
      var s = ln.replace(/^\uFEFF/, '');
      var times = [], m, re = /\[(\d+:\d{1,2}(?:[.:]\d{1,3})?)\]/g, last = 0;
      while ((m = re.exec(s))) { times.push(parseLrcTs(m[1])); last = re.lastIndex; }
      var txt = s.slice(last).replace(/^[\s\u3000]+|[\s\u3000]+$/g, '');
      if (!txt) return;
      if (!times.length) {
        if (/^\[[a-zA-Z]+:/.test(s)) return;
        out.push({ text: txt, t: null });
        return;
      }
      times.forEach(function (t) { out.push({ text: txt, t: t }); });
    });
    out.sort(function (a, b) {
      return (a.t == null ? Infinity : a.t) - (b.t == null ? Infinity : b.t);
    });
    return out;
  }

  /* 简易 SRT 解析：只要每句的首时间和文本，用来把现成字幕当歌词底稿 */
  function parseSrt(text) {
    var out = [];
    var blocks = String(text == null ? '' : text).replace(/\r\n/g, '\n').split(/\n{2,}/);
    for (var i = 0; i < blocks.length; i++) {
      var lines = blocks[i].split('\n').filter(function (x) { return x.trim(); });
      if (lines.length < 2) continue;
      var m = lines[1].match(/(\d+):(\d{2}):(\d{2})[,.](\d{1,3})\s*-->/);
      if (!m) continue;
      var t = (+m[1]) * 3600000 + (+m[2]) * 60000 + (+m[3]) * 1000 + +(m[4] + '00').slice(0, 3);
      var tx = lines.slice(2).join(' ').replace(/<[^>]+>/g, '').trim();
      if (tx) out.push({ text: tx, t: t });
    }
    return out;
  }

  /* 根据各句句首算出句尾：每句唱到下一句开始；末句用 minDur 兜底。
     ⚠️ 这句破坏了 ٹائم的话（手工改过 end 的句子）会被重算，所以只在打轴后调用一次。 */
  function computeEnds(lines, minDurMs) {
    var minDur = Math.max(500, +minDurMs || 3000);
    var done = (lines || []).filter(function (l) { return l && l.t != null; });
    done.sort(function (a, b) { return a.t - b.t; });
    for (var i = 0; i < done.length; i++) {
      var nxt = (i + 1 < done.length) ? done[i + 1].t : done[i].t + minDur;
      done[i].end = (nxt > done[i].t) ? nxt : done[i].t + minDur;
    }
    return lines;
  }

  /* ================= 逐字时长的三种生成方式 ================= */

  /* ① 按字宽加权均分
     tailRatio：句尾留白占比。最后一个字唱完到本句消失之间留一段，
     是因为人唱完一句总有停顿/尾音，让最后一个字吃到 line.end 会显得「永远追不上」。
     ⚠️ 留白体现在最后一个 edge 上 —— edges 末项 = t + 可用时长，不必等于 line.end。 */
  function distribute(line, opt) {
    opt = opt || {};
    var tailRatio = (opt.tailRatio == null) ? 0.10 : opt.tailRatio;
    var units = line.units && line.units.length ? line.units : splitUnits(line.text);
    var t = line.t == null ? 0 : line.t;
    var total = Math.max(0, (line.end == null ? t + 3000 : line.end) - t);
    var usable = total * (1 - Math.max(0, Math.min(0.5, tailRatio)));

    var wsum = 0;
    for (var k = 0; k < units.length; k++) wsum += widthOfUnit(units[k]);
    if (wsum <= 0) wsum = 1;

    var edges = [Math.round(t)], acc = t;
    for (var i = 0; i < units.length; i++) {
      acc += usable * (widthOfUnit(units[i]) / wsum);
      edges.push(Math.round(acc));
    }
    /* 单调化：四舍五入可能让某个边界比前一个还小 */
    for (var j = 1; j < edges.length; j++) if (edges[j] < edges[j - 1]) edges[j] = edges[j - 1];
    return { units: units, edges: edges };
  }

  /* ② 逐字连打：taps 是用户敲下的时间点（毫秒），第 i 个对应第 i 个单位。
     没敲到的位置在前后两个已知点之间按 index 线性插值 —— 这样「打了一半不想打」
     也能出完整结果，不会出现半句没字。 */
  function fromTaps(line, taps, opt) {
    var units = line.units && line.units.length ? line.units : splitUnits(line.text);
    var t = line.t == null ? 0 : line.t;
    var end = line.end == null ? t + 3000 : line.end;
    var tailRatio = (opt && opt.tailRatio != null) ? opt.tailRatio : 0;
    var usableEnd = Math.round(t + (end - t) * (1 - Math.max(0, Math.min(0.5, tailRatio))));

    var raw = (taps || []).slice();
    /* 一次都没敲：直接退化成按字宽均分。
       ⚠️ 不能走下面的插值 —— 前后都找不到锚点时 (next-prev) 会是 0，算出 NaN 边界。 */
    var anyTap = false;
    for (var k0 = 0; k0 < raw.length; k0++) {
      if (raw[k0] != null && isFinite(raw[k0])) { anyTap = true; break; }
    }
    if (!anyTap) return distribute(line, { tailRatio: tailRatio });

    function val(i) {
      var v = raw[i];
      return (v == null || !isFinite(v)) ? null : Math.round(v);
    }

    var edges = [];
    for (var i = 0; i < units.length; i++) {
      var v = val(i);
      if (v != null) { edges.push(v); continue; }
      /* 没敲到的位置：在前后两个已知点之间按位置线性插值。
         把「句首」当作 index -1 的锚点，句首到第一个字之间也能插出值。 */
      var prev = -1, next = -1, p, q;
      for (p = i - 1; p >= 0; p--) { if (val(p) != null) { prev = p; break; } }
      for (q = i + 1; q <= units.length; q++) { if (val(q) != null) { next = q; break; } }
      var a = prev >= 0 ? val(prev) : Math.round(t);
      var b = next >= 0 ? val(next) : usableEnd;
      edges.push(Math.round(a + (b - a) * (i - prev) / (next - prev)));
    }

    /* 最后一个单位的下边界：用户在句尾多敲了一下就用它，否则落到「可用句尾」。
       ⚠️ 不能退化成等于前一个值 —— 那会让最后一个字的时长变成 0，扫色直接跳过它。 */
    var lastTap = val(units.length);
    edges.push(lastTap != null ? Math.max(lastTap, edges[edges.length - 1]) : usableEnd);

    if (edges[0] < t) edges[0] = Math.round(t);
    for (var z = 1; z < edges.length; z++) if (edges[z] < edges[z - 1]) edges[z] = edges[z - 1];
    return { units: units, edges: edges };
  }

  /* ③ 手动微调：拖动第 idx 条边界（1 .. units.length-1），clamp 在相邻两条之间 */
  function setEdge(geo, idx, ms) {
    if (!geo || !geo.edges) return geo;
    var e = geo.edges.slice();
    if (idx <= 0 || idx >= e.length - 1) return geo;
    var lo = e[idx - 1], hi = e[idx + 1];
    var v = Math.round(Math.max(lo, Math.min(hi, ms)));
    e[idx] = v;
    return { units: geo.units, edges: e };
  }

  /* 整句缩放：以句首为原点，把每个字的时长乘 k（用于「整体偏快/偏慢」的一键修正） */
  function scaleLine(geo, line, k) {
    if (!geo || !geo.edges) return geo;
    var base = (line && line.t != null) ? line.t : geo.edges[0];
    var e = geo.edges.map(function (v, i) {
      return i === 0 ? geo.edges[0] : Math.round(base + (v - base) * k);
    });
    for (var i = 1; i < e.length; i++) if (e[i] < e[i - 1]) e[i] = e[i - 1];
    return { units: geo.units, edges: e };
  }

  /* ================= 时间格式 ================= */

  /* LRC：[mm:ss.xx] 百分秒 */
  function fmtLrc(ms) {
    ms = Math.max(0, Math.round(+ms || 0));
    var m = Math.floor(ms / 60000), s = Math.floor((ms % 60000) / 1000), cs = Math.floor((ms % 1000) / 10);
    return '[' + pad2(m) + ':' + pad2(s) + '.' + pad2(cs) + ']';
  }
  /* SRT：HH:MM:SS,mmm */
  function fmtSrtTs(ms) {
    ms = Math.max(0, Math.round(+ms || 0));
    var h = Math.floor(ms / 3600000), m = Math.floor((ms % 3600000) / 60000),
      s = Math.floor((ms % 60000) / 1000), x = ms % 1000;
    return pad2(h) + ':' + pad2(m) + ':' + pad2(s) + ',' + (x < 100 ? (x < 10 ? '00' : '0') : '') + x;
  }
  /* ASS：H:MM:SS.cc —— 注意小时只有一位，秒钟是百分秒 */
  function fmtAssTime(ms) {
    ms = Math.max(0, Math.round(+ms || 0));
    var h = Math.floor(ms / 3600000), m = Math.floor((ms % 3600000) / 60000),
      s = Math.floor((ms % 60000) / 1000), cs = Math.floor((ms % 1000) / 10);
    return h + ':' + pad2(m) + ':' + pad2(s) + '.' + pad2(cs);
  }

  /* 颜色：#RRGGBB → &H00BBGGRR（ASS 是 BBGGRR 倒序 + 前两位 alpha）
     #FFD54A → &H004AD5FF。这一步错了整个字幕颜色会串，所以单独封起来好测。 */
  function assColor(hex, alpha) {
    var s = String(hex || '').replace(/^#/, '').trim();
    var a, rgb;
    if (s.length === 8) { a = s.slice(0, 2).toUpperCase(); rgb = s.slice(2); }
    else {
      /* alpha 是 0-255 的十进制，必须转两位十六进制 ——
         直接用字符串拼会得到 '128' 这种三位数，整串颜色就错位了 */
      var n = (alpha == null) ? 0 : Math.round(+alpha);
      n = isFinite(n) ? Math.max(0, Math.min(255, n)) : 0;
      a = s.length === 0 ? '00' : (n < 16 ? '0' : '') + n.toString(16).toUpperCase();
      rgb = s;
    }
    if (!/^[0-9a-fA-F]{6}$/.test(rgb)) return '&H00FFFFFF';
    var r = rgb.slice(0, 2), g = rgb.slice(2, 4), b = rgb.slice(4, 6);
    return '&H' + a + b.toUpperCase() + g.toUpperCase() + r.toUpperCase();
  }

  /* ================= 导出 ================= */

  var ASS_STYLE_ORDER = 'Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, ' +
    'Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, ' +
    'Alignment, MarginL, MarginR, MarginV, Encoding';

  function styleDefault(st) {
    st = st || {};
    return {
      font: st.font || 'Source Han Sans SC',
      size: st.size || 72,
      /* PrimaryColour = 未唱部分的颜色；SecondaryColour = 已唱部分（\kf 填色用） */
      unsung: st.unsung || '#FFFFFF',
      sung: st.sung || '#FFD54A',
      outline: st.outline || '#000000',
      back: st.back || '#80000000',
      outlinePx: st.outlinePx == null ? 4 : st.outlinePx,
      marginV: st.marginV == null ? 90 : st.marginV,
      playResX: st.playResX || 1920,
      playResY: st.playResY || 1080,
      align: st.align || 2
    };
  }

  /* 一句的 Dialogue 文本：{\kf<n>}字{\kf<n>}字…
     ⚠️ \kf 的单位是百分秒（1 = 10ms），这里做除法。 */
  /* ⚠️ 这里必须按「取整后的百分秒边界」做差，不能对每个字的时长各自取整：
       3500ms ÷ 4 字 = 87.5 百分秒，各自 round 成 88 → 累加 3520ms，比整句多 20ms。
       字一多就一路累积（10 个字最坏差 50ms），扫色会比 Dialogue 结束晚一截。
       用望远镜式做法（prev/cur 都是取整后的边界）累加天然等于 round(end)-round(start)。 */
  function assBody(line, geo) {
    var units = geo.units, edges = geo.edges, s = '';
    var prev = Math.round(edges[0] / 10);
    for (var i = 0; i < units.length; i++) {
      var cur = Math.round(edges[i + 1] / 10);
      s += '{\\kf' + Math.max(0, cur - prev) + '}' + units[i];
      prev = cur;
    }
    return s;
  }

  function toAss(lines, st) {
    var o = styleDefault(st);
    var head = [
      '[Script Info]',
      'ScriptType: v4.00+',
      'PlayResX: ' + o.playResX,
      'PlayResY: ' + o.playResY,
      'WrapStyle: 2',
      'ScaledBorderAndShadow: yes',
      'YCbCr Matrix: TV.709',
      '',
      '[V4+ Styles]',
      'Format: ' + ASS_STYLE_ORDER,
      /* ⚠️ 必须是 'Style: ' 开头 —— ASS 靠这个前缀认样式行，漏了整个字幕会被当无效文件丢掉 */
      'Style: ' + ['Karaoke', o.font, o.size, assColor(o.unsung), assColor(o.sung), assColor(o.outline), assColor(o.back),
        '0', '0', '0', '0', '100', '100', '0', '0', '1', o.outlinePx, '0', o.align, '60', '60', o.marginV, '1'].join(','),
      '',
      '[Events]',
      'Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text'
    ].join('\n') + '\n';

    var body = [];
    for (var i = 0; i < (lines || []).length; i++) {
      var ln = lines[i];
      if (!ln || ln.t == null || !ln.geo || !ln.geo.units.length) continue;
      body.push('Dialogue: 0,' + fmtAssTime(ln.t) + ',' + fmtAssTime(ln.end == null ? ln.t + 3000 : ln.end) +
        ',Karaoke,,0,0,0,,' + assBody(ln, ln.geo));
    }
    return head + body.join('\n') + (body.length ? '\n' : '');
  }

  /* 增强 LRC：句首一个时间标签，之后每个单位前再挂一个 ——
     [00:12.30]我[00:12.63]手[00:12.93]一…（网易/QQ音乐那种逐字歌词） */
  function toEnhLrc(lines) {
    var out = [];
    for (var i = 0; i < (lines || []).length; i++) {
      var ln = lines[i];
      if (!ln || ln.t == null || !ln.geo || !ln.geo.units.length) continue;
      var s = fmtLrc(ln.t);
      for (var j = 0; j < ln.geo.units.length; j++) {
        if (j > 0) s += fmtLrc(ln.geo.edges[j]);
        s += ln.geo.units[j];
      }
      out.push(s);
    }
    return out.join('\n') + (out.length ? '\n' : '');
  }

  /* 普通 SRT：句级，逐字信息在这个格式里没法表达 */
  function toSrt(lines) {
    var out = [];
    for (var i = 0; i < (lines || []).length; i++) {
      var ln = lines[i];
      if (!ln || ln.t == null) continue;
      var end = ln.end == null ? ln.t + 3000 : ln.end;
      out.push((out.length + 1) + '\n' + fmtSrtTs(ln.t) + ' --> ' + fmtSrtTs(end) + '\n' + ln.text + '\n');
    }
    return out.join('\n');
  }

  /* 普通 LRC：句级（给不支持逐字的老播放器用） */
  function toLrc(lines) {
    var out = [];
    for (var i = 0; i < (lines || []).length; i++) {
      var ln = lines[i];
      if (!ln || ln.t == null) continue;
      out.push(fmtLrc(ln.t) + ln.text);
    }
    return out.join('\n') + (out.length ? '\n' : '');
  }

  /* 已打好轴 / 已切好字的进度 */
  function statOf(lines) {
    var arr = lines || [], timed = 0, cut = 0;
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] && arr[i].t != null) timed++;
      if (arr[i] && arr[i].geo && arr[i].geo.units && arr[i].geo.units.length) cut++;
    }
    return { total: arr.length, timed: timed, cut: cut };
  }

  return {
    /* 文字 */
    cps: cps, isCJK: isCJK, splitUnits: splitUnits, widthOfUnit: widthOfUnit,
    /* 解析 */
    parseLyrics: parseLyrics, parseLrc: parseLrc, parseSrt: parseSrt,
    computeEnds: computeEnds,
    /* 生成逐字时间 */
    distribute: distribute, fromTaps: fromTaps, setEdge: setEdge, scaleLine: scaleLine,
    /* 时间/颜色 */
    fmtLrc: fmtLrc, fmtSrtTs: fmtSrtTs, fmtAssTime: fmtAssTime, assColor: assColor,
    /* 导出 */
    assBody: assBody, toAss: toAss, toEnhLrc: toEnhLrc, toSrt: toSrt, toLrc: toLrc,
    styleDefault: styleDefault,
    statOf: statOf
  };
});
