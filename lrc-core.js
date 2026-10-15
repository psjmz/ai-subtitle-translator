/* lrc-core.js —— 歌词打轴器引擎（v0.9.316，#449）
   只服务 lrc.html，与其它页面完全分开（三件套硬隔离，复制精简实现、不引共用文件）。
   能力：纯文本歌词解析、LRC 时间格式化/解析、LRC / SRT 导出、行状态推进。 */
(function (root, factory) {
  if (typeof define === 'function' && define.amd) define([], factory);
  else if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.LrcCore = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  /* ---------- 歌词解析：一行一句，空行/纯空白跳过 ---------- */
  function parseLyrics(text) {
    var out = [];
    String(text == null ? '' : text).split(/\r\n|\r|\n/).forEach(function (ln) {
      var s = ln.replace(/^[\s\u3000]+|[\s\u3000]+$/g, '');
      if (s) out.push({ text: s, t: null });
    });
    return out;
  }

  /* ---------- LRC 时间：ms ↔ [mm:ss.xx] ---------- */
  function fmtLrc(ms) {
    ms = Math.max(0, Math.round(+ms || 0));
    var m = Math.floor(ms / 60000), s = Math.floor((ms % 60000) / 1000), cs = Math.floor((ms % 1000) / 10);
    return '[' + pad2(m) + ':' + pad2(s) + '.' + pad2(cs) + ']';
  }
  function parseLrcTs(str) {
    var m = String(str || '').match(/^(\d+):(\d{1,2})(?:[.:](\d{1,3}))?$/);
    if (!m) return null;
    var cs = m[3] || '0';
    /* 两位=百分秒，三位=毫秒 */
    var frac = cs.length === 3 ? +cs : (cs.length === 2 ? +cs * 10 : +cs * 100);
    return (+m[1]) * 60000 + (+m[2]) * 1000 + frac;
  }
  function pad2(n) { return (n < 10 ? '0' : '') + n; }

  /* ---------- 导出 LRC：只导出已打轴的行 ---------- */
  function toLrc(lines) {
    var out = [];
    (lines || []).forEach(function (ln) {
      if (ln && ln.text && ln.t != null) out.push(fmtLrc(ln.t) + ln.text);
    });
    return out.join('\r\n') + (out.length ? '\r\n' : '');
  }

  /* ---------- 导出 SRT：每句时长 = 到下一句（末句兜底 minDur） ---------- */
  function fmtSrtTs(ms) {
    ms = Math.max(0, Math.round(+ms || 0));
    var h = Math.floor(ms / 3600000), m = Math.floor((ms % 3600000) / 60000),
      s = Math.floor((ms % 60000) / 1000), x = ms % 1000;
    return pad2(h) + ':' + pad2(m) + ':' + pad2(s) + ',' + (x < 100 ? (x < 10 ? '00' : '0') : '') + x;
  }
  function toSrt(lines, minDurMs) {
    var minDur = Math.max(500, +minDurMs || 2000);
    var done = (lines || []).filter(function (ln) { return ln && ln.text && ln.t != null; });
    done.sort(function (a, b) { return a.t - b.t; });
    var out = [];
    for (var i = 0; i < done.length; i++) {
      var end = (i + 1 < done.length) ? done[i + 1].t : done[i].t + minDur;
      if (end <= done[i].t) end = done[i].t + minDur;
      out.push((i + 1) + '\r\n' + fmtSrtTs(done[i].t) + ' --> ' + fmtSrtTs(end) + '\r\n' + done[i].text + '\r\n');
    }
    return out.join('\r\n');
  }

  /* ---------- 简易 LRC 文件解析（导入已有 LRC 微调） ----------
     混合文本也认：带 [mm:ss.xx] 的行读时间，不带时间的普通行保留为 t=null
     （打轴流程从第一个 null 行继续）；[ti:..] [ar:..] 等元数据行跳过。 */
  function parseLrc(text) {
    var out = [];
    String(text == null ? '' : text).split(/\r\n|\r|\n/).forEach(function (ln) {
      var s = ln.replace(/^\uFEFF/, '');
      var times = [], m;
      var re = /\[(\d+:\d{1,2}(?:[.:]\d{1,3})?)\]/g;
      var last = 0;
      while ((m = re.exec(s))) { times.push(parseLrcTs(m[1])); last = re.lastIndex; }
      var txt = s.slice(last).replace(/^[\s\u3000]+|[\s\u3000]+$/g, '');
      if (!txt) return;                        /* 纯标签行（元数据/空文本）跳过 */
      if (!times.length) {
        if (/^\[[a-zA-Z]+:/.test(s)) return;   /* [ti:..] [ar:..] 等元数据行 */
        out.push({ text: txt, t: null });      /* 普通行：没打时间，保留 */
        return;
      }
      times.forEach(function (t) { out.push({ text: txt, t: t }); });
    });
    out.sort(function (a, b) { return (a.t == null ? Infinity : a.t) - (b.t == null ? Infinity : b.t); });
    return out;
  }

  /* ---------- 进度统计 ---------- */
  function statOf(lines) {
    var arr = lines || [];
    var done = arr.filter(function (ln) { return ln.t != null; }).length;
    return { total: arr.length, done: done };
  }

  return {
    parseLyrics: parseLyrics,
    parseLrc: parseLrc,
    fmtLrc: fmtLrc, parseLrcTs: parseLrcTs,
    toLrc: toLrc, toSrt: toSrt, fmtSrtTs: fmtSrtTs,
    statOf: statOf
  };
});
