/* batch-core.js —— 批量字幕转换 + 打包引擎（v0.9.316）
 * 浏览器 <script src> 与 Node (require) 通用。
 * 职责边界：本引擎只管「多文件批量 SRT↔VTT 互转 + 汇成一个 ZIP」；
 * 单文件的精细处理（乱码修复/双语剥离/时间轴）是各自页的事。
 * 口径：
 *  - 转换 = 整文件解析成 items 再重排导出，序号统一重写、时间戳按目标格式规范化
 *    （SRT 逗号毫秒 / VTT 点号毫秒，<1h 省小时位）；
 *  - 单文件没认出任何条目 → convertText 返回 null，由页面汇总报告，绝不含糊成功；
 *  - ZIP 走注入的 JSZip（3.10.1 本地随包，页面在引擎之前引入 jszip.min.js；
 *    Node 测试时 require 后传入）。文件名保持原名只换扩展名，重名自动加序号。
 * 解析器是从 split-core 复制来的精简版（三件套硬隔离：不共用文件、不改老模块）。 */
(function (root, factory) {
  if (typeof module !== 'undefined' && module.exports) module.exports = factory();
  else root.BatchCore = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  /* ---------- 字幕解析（精简版：SRT / VTT） ---------- */
  var RE_SRT_TIME = /^(\d{1,2}):(\d{2}):(\d{2})[,.](\d{1,3})\s*-->\s*(\d{1,2}):(\d{2}):(\d{2})[,.](\d{1,3})/;
  var RE_VTT_TIME = /^(?:(\d{1,2}):)?(\d{2}):(\d{2})[,.](\d{3})\s*-->\s*(?:(\d{1,2}):)?(\d{2}):(\d{2})[,.](\d{3})/;

  function toMs(h, m, s, f) { return ((+h || 0) * 3600 + (+m) * 60 + (+s)) * 1000 + (+f); }

  function parseSrt(text) {
    var out = [];
    String(text || '').replace(/\r\n?/g, '\n').split(/\n{2,}/).forEach(function (blk) {
      var lines = blk.split('\n').filter(function (l) { return l.trim() !== ''; });
      if (!lines.length) return;
      var i = 0;
      if (/^\d+$/.test(lines[0].trim())) i = 1;
      var m = lines[i] && lines[i].match(RE_SRT_TIME);
      if (!m) return;
      out.push({ start: toMs(m[1], m[2], m[3], m[4]), end: toMs(m[5], m[6], m[7], m[8]), text: lines.slice(i + 1).join('\n') });
    });
    return out;
  }

  function parseVtt(text) {
    var out = [], cur = null;
    String(text || '').replace(/\r\n?/g, '\n').split('\n').forEach(function (line) {
      if (/^WEBVTT/i.test(line) || /^NOTE\b/.test(line) || /^STYLE\b/.test(line) || /^REGION\b/.test(line)) { flush(); return; }
      if (line.trim() === '') { flush(); return; }
      var m = line.match(RE_VTT_TIME);
      if (m) { flush(); cur = { start: toMs(m[1] || 0, m[2], m[3], m[4]), end: toMs(m[5] || 0, m[6], m[7], m[8]), text: '' }; return; }
      if (/^\d+$/.test(line.trim()) && !cur) return;
      if (cur) cur.text += (cur.text ? '\n' : '') + line;
    });
    flush();
    function flush() { if (cur && cur.text) { out.push(cur); cur = null; } else cur = null; }
    return out;
  }

  function detectFmt(name, text) {
    var n = String(name || '').toLowerCase();
    if (/\.srt$/.test(n)) return 'srt';
    if (/\.vtt$/.test(n)) return 'vtt';
    var tx = String(text || '');
    if (/^\uFEFF?WEBVTT/.test(tx.slice(0, 100))) return 'vtt';
    if (RE_SRT_TIME.test(tx.split('\n').filter(function (l) { return l.trim(); })[1] || tx.split('\n')[0] || '')) return 'srt';
    return 'srt';
  }

  /* ---------- 导出 ---------- */
  function pad(n, w) { n = String(n); while (n.length < w) n = '0' + n; return n; }
  function fmtTs(ms) {
    ms = Math.max(0, Math.round(+ms || 0));
    return pad(Math.floor(ms / 3600000), 2) + ':' + pad(Math.floor(ms / 60000) % 60, 2) + ':' + pad(Math.floor(ms / 1000) % 60, 2) + ',' + pad(ms % 1000, 3);
  }
  function fmtVttTime(ms) {
    ms = Math.max(0, Math.round(+ms || 0));
    var h = Math.floor(ms / 3600000);
    return (h ? pad(h, 2) + ':' : '') + pad(Math.floor(ms / 60000) % 60, 2) + ':' + pad(Math.floor(ms / 1000) % 60, 2) + '.' + pad(ms % 1000, 3);
  }
  function formatSrt(items) {
    return (items || []).map(function (it, i) {
      return (i + 1) + '\n' + fmtTs(it.start) + ' --> ' + fmtTs(it.end) + '\n' + it.text;
    }).join('\n\n') + '\n';
  }
  function formatVtt(items) {
    return 'WEBVTT\n\n' + (items || []).map(function (it) {
      return fmtVttTime(it.start) + ' --> ' + fmtVttTime(it.end) + '\n' + it.text;
    }).join('\n\n') + '\n';
  }

  /* ---------- 整文件转换：没认出条目返回 null（页面据此报告失败） ---------- */
  function convertText(text, from, to) {
    var items = (from === 'vtt') ? parseVtt(text) : parseSrt(text);
    if (!items.length) return null;
    return (to === 'vtt') ? formatVtt(items) : formatSrt(items);
  }

  /* ---------- 目标文件名：换扩展名，重名加序号 ---------- */
  function targetName(name, to, taken) {
    var base = String(name || 'subtitle').replace(/\.[^.]+$/, '');
    var cand = base + '.' + to, i = 2;
    var has = function (n) { return (taken || []).indexOf(n) >= 0; };
    while (has(cand)) { cand = base + '-' + i + '.' + to; i++; }
    return cand;
  }

  /* ---------- 打 ZIP（注入 JSZip，缺库明说） ---------- */
  function zipLib() {
    var L = (typeof JSZip !== 'undefined') ? JSZip : (typeof root !== 'undefined' && root.JSZip);
    if (!L) throw new Error('JSZip lib not loaded');
    return L;
  }
  /* entries: [{ name, text }] → Promise<ArrayBuffer> */
  function zipFiles(entries, lib) {
    var L = lib || zipLib();
    var z = new L();
    (entries || []).forEach(function (e) { z.file(e.name, e.text); });
    return z.generateAsync({ type: 'array', compression: 'DEFLATE' });
  }

  function statOf(items) {
    var arr = items || [];
    return { count: arr.length, duration: arr.length ? Math.max.apply(null, arr.map(function (it) { return it.end; })) : 0 };
  }

  /* 统一入口：按 detectFmt 结果分派 */
  function parse(text, fmt) {
    return (fmt === 'vtt') ? parseVtt(text) : parseSrt(text);
  }

  return {
    parseSrt: parseSrt, parseVtt: parseVtt, detectFmt: detectFmt, parse: parse,
    formatSrt: formatSrt, formatVtt: formatVtt, convertText: convertText,
    targetName: targetName, zipFiles: zipFiles, statOf: statOf
  };
});
