/* split-core.js —— 字幕文件级拆分与拼接引擎（v0.9.316）
 * 浏览器 <script src> 与 Node (require) 通用。
 * 职责边界（与 shift 页互补，不重叠）：shift 是「单份文件内」的条目级合并/拆分；
 * 本引擎是「文件级」—— 把整份切成多段、把多份拼成一份。
 * 口径：
 *  - 拆分只按 cue 边界切，绝不把一条 cue 切成两半；
 *  - 按时长切时，切点 = 第一条「起点不早于目标累计时长」的 cue 的起点；
 *  - 拼接「按顺序」= 后一份整体平移到前一份结束后（可加间隔），序号重排；
 *  - 拼接「按时间」= 保留各份原时间戳，交织后按 start 排序（重叠如实保留，不做体检——那是别页的事）。
 * 所有函数纯操作 items（{start,end,text}，毫秒），format 端统一编号，不依赖输入里的序号。 */
(function (root, factory) {
  if (typeof module !== 'undefined' && module.exports) module.exports = factory();
  else root.SplitCore = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  /* ---------- 解析（精简版：SRT / VTT，够拆分拼接用；乱码/复杂修复是 repair/convert 页的事） ---------- */
  var RE_SRT_TIME = /^(\d{1,2}):(\d{2}):(\d{2})[,.](\d{1,3})\s*-->\s*(\d{1,2}):(\d{2}):(\d{2})[,.](\d{1,3})/;
  var RE_VTT_TIME = /^(?:(\d{1,2}):)?(\d{2}):(\d{2})\.(\d{3})\s*-->\s*(?:(\d{1,2}):)?(\d{2}):(\d{2})\.(\d{3})/;

  function msOf(h, m, s, f) { return ((+h || 0) * 3600 + (+m) * 60 + (+s)) * 1000 + (+f || 0); }

  /* SRT：序号行可有可无（坏序号是常事，编号本来就在导出端统一重排） */
  function parseSrt(text) {
    var src = String(text == null ? '' : text).replace(/^\uFEFF/, '').replace(/\r/g, '');
    var blocks = src.split(/\n{2,}/), items = [];
    for (var i = 0; i < blocks.length; i++) {
      var b = blocks[i];
      if (!b || !b.trim()) continue;
      var lines = b.split('\n'), j = 0, m;
      /* 跳过纯数字序号行 */
      if (j < lines.length && /^\s*\d+\s*$/.test(lines[j])) j++;
      if (j >= lines.length) continue;
      if ((m = RE_SRT_TIME.exec(lines[j]))) {
        var txt = lines.slice(j + 1).join('\n').replace(/\n+$/, '');
        if (txt) items.push({ start: msOf(m[1], m[2], m[3], m[4]), end: msOf(m[5], m[6], m[7], m[8]), text: txt });
      }
    }
    return items;
  }

  /* VTT：跳过 WEBVTT 头、NOTE/STYLE 块；时间行允许无小时位 */
  function parseVtt(text) {
    var src = String(text == null ? '' : text).replace(/^\uFEFF/, '').replace(/\r/g, '');
    if (!/^WEBVTT/i.test(src.split('\n')[0] || '')) return [];
    var blocks = src.split(/\n{2,}/), items = [];
    for (var i = 1; i < blocks.length; i++) {
      var b = blocks[i];
      if (!b || !b.trim()) continue;
      if (/^(NOTE|STYLE|REGION)\b/i.test(b)) continue;
      var lines = b.split('\n'), m = null, j = 0;
      for (; j < lines.length; j++) { m = RE_VTT_TIME.exec(lines[j]); if (m) break; }
      if (!m) continue;
      var txt = lines.slice(j + 1).join('\n').replace(/\n+$/, '');
      if (txt) items.push({ start: msOf(m[1], m[2], m[3], m[4]), end: msOf(m[5], m[6], m[7], m[8]), text: txt });
    }
    return items;
  }

  function detectFmt(name, text) {
    var s = String(text == null ? '' : text);
    if (/^WEBVTT/i.test(s.split('\n')[0] || '')) return 'vtt';
    if (RE_SRT_TIME.test(s)) return 'srt';
    var n = String(name || '').toLowerCase();
    if (/\.vtt$/.test(n)) return 'vtt';
    return 'srt';
  }

  function parse(text, fmt) { return fmt === 'vtt' ? parseVtt(text) : parseSrt(text); }

  /* ---------- 拆分 ---------- */
  /* 按条数：每 n 条一段（n<=1 视为 1；空输入返回 []） */
  function splitByCount(items, n) {
    var arr = items || [], per = Math.max(1, Math.floor(+n || 1)), out = [];
    for (var i = 0; i < arr.length; i += per) out.push(arr.slice(i, i + per));
    return out;
  }

  /* 按时长（毫秒）：切点 = 第一条「start >= 段目标终点」的 cue 起点，绝不腰斩。
     一条超长 cue 跨过目标线时整条留在前段（它的 end 溢出没关系，段边界以 cue 边界为准）。 */
  function splitByDuration(items, durMs) {
    var arr = items || [], dur = Math.max(1000, +durMs || 0), out = [];
    var seg = [], segStart = arr.length ? arr[0].start : 0;
    for (var i = 0; i < arr.length; i++) {
      var it = arr[i];
      if (seg.length && it.start - segStart >= dur) { out.push(seg); seg = []; segStart = it.start; }
      seg.push(it);
    }
    if (seg.length) out.push(seg);
    return out;
  }

  /* 时间归零：每段减去各自首条 start（导出分段时常用，让每段从 0:00 开始） */
  function zeroBase(seg) {
    if (!seg || !seg.length) return seg || [];
    var d = seg[0].start;
    return seg.map(function (it) { return { start: Math.max(0, it.start - d), end: Math.max(0, it.end - d), text: it.text }; });
  }

  /* ---------- 拼接 ---------- */
  /* 按顺序：后一份平移到前一份最后一条 end 之后 + gapMs。序号在导出端统一重排。
     空段跳过；全部为空返回 []。 */
  function joinSeq(segs, gapMs) {
    var gap = Math.max(0, +gapMs || 0), out = [], cursor = 0;
    (segs || []).forEach(function (seg) {
      var arr = (seg || []).filter(function (it) { return it && it.text; });
      if (!arr.length) return;
      var base = arr[0].start, shift = cursor - base;
      arr.forEach(function (it) { out.push({ start: it.start + shift, end: it.end + shift, text: it.text }); });
      var lastEnd = arr[arr.length - 1].end;
      cursor = Math.max(cursor, lastEnd + shift) + gap;
    });
    return out;
  }

  /* 按时间：保留各份原时间戳，合并后按 start 升序（稳定排序，同 start 按输入先后）。
     重叠/冲突如实保留——要不要处理是用户在别页的事，本引擎不偷偷改。 */
  function joinSorted(segs) {
    var all = [], idx = 0;
    (segs || []).forEach(function (seg) {
      (seg || []).forEach(function (it) { if (it && it.text) { all.push({ start: it.start, end: it.end, text: it.text, _i: idx++ }); } });
    });
    all.sort(function (a, b) { return (a.start - b.start) || (a._i - b._i); });
    return all.map(function (it) { return { start: it.start, end: it.end, text: it.text }; });
  }

  /* ---------- 导出 ---------- */
  function pad(n, w) { n = String(n); while (n.length < w) n = '0' + n; return n; }
  function fmtSrtTime(ms) {
    ms = Math.max(0, Math.round(ms));
    var h = Math.floor(ms / 3600000), m = Math.floor(ms / 60000) % 60, s = Math.floor(ms / 1000) % 60, f = ms % 1000;
    return pad(h, 2) + ':' + pad(m, 2) + ':' + pad(s, 2) + ',' + pad(f, 3);
  }
  function fmtVttTime(ms) {
    var h = Math.floor(ms / 3600000), m = Math.floor(ms / 60000) % 60, s = Math.floor(ms / 1000) % 60, f = ms % 1000;
    return (h ? pad(h, 2) + ':' : '') + pad(m, 2) + ':' + pad(s, 2) + '.' + pad(f, 3);
  }
  function formatSrt(items) {
    return (items || []).map(function (it, i) {
      return (i + 1) + '\n' + fmtSrtTime(it.start) + ' --> ' + fmtSrtTime(it.end) + '\n' + it.text;
    }).join('\n\n') + '\n';
  }
  function formatVtt(items) {
    return 'WEBVTT\n\n' + (items || []).map(function (it) {
      return fmtVttTime(it.start) + ' --> ' + fmtVttTime(it.end) + '\n' + it.text;
    }).join('\n\n') + '\n';
  }

  /* ---------- 汇总信息（页面展示用） ---------- */
  function statOf(items) {
    var arr = items || [];
    var end = arr.length ? Math.max.apply(null, arr.map(function (it) { return it.end; })) : 0;
    return { count: arr.length, duration: end };
  }

  return {
    parseSrt: parseSrt, parseVtt: parseVtt, parse: parse, detectFmt: detectFmt,
    splitByCount: splitByCount, splitByDuration: splitByDuration, zeroBase: zeroBase,
    joinSeq: joinSeq, joinSorted: joinSorted,
    formatSrt: formatSrt, formatVtt: formatVtt, fmtSrtTime: fmtSrtTime, fmtVttTime: fmtVttTime,
    statOf: statOf
  };
});
