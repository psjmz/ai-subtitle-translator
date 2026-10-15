/* table-core.js —— 字幕 ↔ 表格（CSV / Excel）互转引擎（v0.9.316）
 * 浏览器 <script src> 与 Node (require) 通用。
 * 职责边界：本引擎只管「字幕 ↔ 表格」的格式互转；时间轴调整是 shift 页、
 * 拆分拼接是 split 页的事，这里不碰。
 * 口径：
 *  - 表格列固定四列：# / Start / End / Text（导出必有列头，导入按列头认列）；
 *  - 时间列用 SRT 风格字符串 HH:MM:SS,mmm（Excel 里可直接改文本），解析同时认
 *    逗号 / 点号毫秒分隔与纯数字毫秒；
 *  - CSV 手写解析（引号、"" 转义、字段内换行、CRLF、BOM、分号分隔自动检测——
 *    部分 Excel 区域版本存 CSV 用分号）；XLSX 走全局 XLSX（SheetJS 0.20.3 本地随包，
 *    页面在引擎之前引入 xlsx.full.min.js；Node 测试时自行挂 global）。
 * 所有函数纯操作 items（{start,end,text}，毫秒），不依赖输入里的序号。 */
(function (root, factory) {
  if (typeof module !== 'undefined' && module.exports) module.exports = factory();
  else root.TableCore = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  /* ---------- 字幕解析（精简版：SRT / VTT。乱码修复/格式细节是 repair/convert 页的事） ---------- */
  var RE_SRT_TIME = /^(\d{1,2}):(\d{2}):(\d{2})[,.](\d{1,3})\s*-->\s*(\d{1,2}):(\d{2}):(\d{2})[,.](\d{1,3})/;
  var RE_VTT_TIME = /^(?:(\d{1,2}):)?(\d{2}):(\d{2})[,.](\d{3})\s*-->\s*(?:(\d{1,2}):)?(\d{2}):(\d{2})[,.](\d{3})/;

  function toMs(h, m, s, f) { return ((+h || 0) * 3600 + (+m) * 60 + (+s)) * 1000 + (+f); }

  function parseSrt(text) {
    var out = [];
    String(text || '').replace(/\r\n?/g, '\n').split(/\n{2,}/).forEach(function (blk) {
      var lines = blk.split('\n').filter(function (l) { return l.trim() !== ''; });
      if (!lines.length) return;
      var i = 0;
      if (/^\d+$/.test(lines[0].trim())) i = 1;                    /* 序号行可有可无 */
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
      if (/^\d+$/.test(line.trim()) && !cur) return;                /* cue identifier（纯数字序号）跳过 */
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
    if (/\.csv$/.test(n)) return 'csv';
    if (/\.xlsx$/.test(n) || /\.xls$/.test(n)) return 'xlsx';
    var tx = String(text || '');
    if (/^\uFEFF?WEBVTT/.test(tx.slice(0, 100))) return 'vtt';
    if (RE_SRT_TIME.test(tx.split('\n').filter(function (l) { return l.trim(); })[1] || tx.split('\n')[0] || '')) return 'srt';
    return 'srt';                                                   /* 兜底按 SRT 试 */
  }
  function parse(text, fmt) { return (fmt === 'vtt') ? parseVtt(text) : parseSrt(text); }

  /* ---------- 时间列 ---------- */
  var RE_TS = /^(?:(\d{1,2}):)?(\d{1,2}):(\d{2})[,.](\d{1,3})$/;
  function parseTs(s) {
    if (s == null) return NaN;
    if (typeof s === 'number' && isFinite(s)) return Math.round(s); /* 纯数字 = 毫秒 */
    var t = String(s).trim();
    if (/^\d+$/.test(t)) return +t;                                 /* 数字字符串 = 毫秒 */
    var m = t.match(RE_TS);
    if (!m) return NaN;
    return toMs(m[1] || 0, m[2], m[3], m[4].length === 3 ? m[4] : (m[4] + '00').slice(0, 3));
  }
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

  /* ---------- CSV ---------- */
  function csvSep(text) {
    /* 首行引号外的分号 vs 逗号计数（部分 Excel 区域版本用分号存 CSV） */
    var first = String(text || '').split(/\r?\n/)[0] || '', inQ = false, c = 0, sc = 0;
    for (var i = 0; i < first.length; i++) {
      var ch = first[i];
      if (ch === '"') inQ = !inQ;
      else if (!inQ && ch === ',') c++;
      else if (!inQ && ch === ';') sc++;
    }
    return (sc > c) ? ';' : ',';
  }
  function parseCsv(text) {
    var tx = String(text || '').replace(/^\uFEFF/, '');
    var sep = csvSep(tx), rows = [], row = [], field = '', inQ = false, i = 0;
    if (!tx) return rows;
    while (i < tx.length) {
      var ch = tx[i];
      if (inQ) {
        if (ch === '"') { if (tx[i + 1] === '"') { field += '"'; i += 2; continue; } inQ = false; i++; continue; }
        field += ch; i++; continue;
      }
      if (ch === '"') { inQ = true; i++; continue; }
      if (ch === sep) { row.push(field); field = ''; i++; continue; }
      if (ch === '\n' || ch === '\r') {
        if (ch === '\r' && tx[i + 1] === '\n') i++;
        row.push(field); rows.push(row); row = []; field = ''; i++; continue;
      }
      field += ch; i++;
    }
    if (field !== '' || row.length) { row.push(field); rows.push(row); }
    /* 尾部空行丢掉 */
    while (rows.length && rows[rows.length - 1].every(function (c) { return String(c).trim() === ''; })) rows.pop();
    return rows;
  }
  function csvCell(s) {
    var t = String(s == null ? '' : s);
    return /[",;\n\r]/.test(t) ? '"' + t.replace(/"/g, '""') + '"' : t;
  }
  function toCsv(items) {
    var out = ['#', 'Start', 'End', 'Text'].join(',') + '\r\n';
    (items || []).forEach(function (it, i) {
      /* ⚠️ 时间戳本身带逗号（00:00:01,000），不包引号会把字段切坏 */
      out += [i + 1, csvCell(fmtTs(it.start)), csvCell(fmtTs(it.end)), csvCell(it.text)].join(',') + '\r\n';
    });
    return out;
  }

  /* ---------- 列头识别 → items ---------- */
  function normHead(s) { return String(s || '').trim().toLowerCase(); }
  function fromRows(rows) {
    var arr = (rows || []).filter(function (r) { return r && r.length; });
    if (!arr.length) return { items: [], header: null };
    var head = arr[0].map(normHead);
    var iS = -1, iE = -1, iT = -1;
    head.forEach(function (h, i) {
      if (iS < 0 && (/^start/.test(h) || h === '开始' || h === '起点')) iS = i;
      else if (iE < 0 && (/^end/.test(h) || h === '结束' || h === '终点')) iE = i;
      else if (iT < 0 && (/^text/.test(h) || /^content/.test(h) || h === '文本' || h === '字幕' || h === '内容')) iT = i;
    });
    var data;
    if (iS >= 0 && iE >= 0 && iT >= 0) data = arr.slice(1);
    else { iS = 0; iE = 1; iT = 2; data = arr; }                   /* 无列头：固定 start,end,text */
    var items = [];
    data.forEach(function (r) {
      var st = parseTs(r[iS]), en = parseTs(r[iE]);
      if (!isFinite(st) || !isFinite(en)) return;                   /* 空行 / 坏行直接跳过 */
      var tx = String(r[iT] == null ? '' : r[iT]).replace(/\r\n?/g, '\n').trim();
      if (!tx) return;
      items.push({ start: st, end: en, text: tx });
    });
    return { items: items, header: (iS === 0 && iE === 1 && iT === 2 && arr.length === data.length) ? null : head };
  }

  /* ---------- XLSX（全局 SheetJS；没有就明说，不静默降级） ---------- */
  function xlsxLib() {
    var L = (typeof XLSX !== 'undefined') ? XLSX : (typeof root !== 'undefined' && root.XLSX);
    if (!L) throw new Error('XLSX lib not loaded');
    return L;
  }
  function toXlsx(items) {
    var X = xlsxLib();
    var aoa = [['#', 'Start', 'End', 'Text']];
    (items || []).forEach(function (it, i) { aoa.push([i + 1, fmtTs(it.start), fmtTs(it.end), String(it.text || '').replace(/\r\n?/g, '\n')]); });
    var ws = X.utils.aoa_to_sheet(aoa);
    ws['!cols'] = [{ wch: 6 }, { wch: 14 }, { wch: 14 }, { wch: 60 }];
    var wb = X.utils.book_new();
    X.utils.book_append_sheet(wb, ws, 'Subtitles');
    return X.write(wb, { type: 'array', bookType: 'xlsx' });        /* ArrayBuffer */
  }
  function fromXlsx(arrayBuffer) {
    var X = xlsxLib();
    var wb = X.read(arrayBuffer, { type: 'array' });
    var ws = wb.Sheets[wb.SheetNames[0]];                            /* 只认第一个工作表 */
    return X.utils.sheet_to_json(ws, { header: 1, raw: false, defval: '' });
  }

  /* ---------- 字幕导出 ---------- */
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

  /* ---------- 汇总 ---------- */
  function statOf(items) {
    var arr = items || [];
    return { count: arr.length, duration: arr.length ? Math.max.apply(null, arr.map(function (it) { return it.end; })) : 0 };
  }

  return {
    parseSrt: parseSrt, parseVtt: parseVtt, parse: parse, detectFmt: detectFmt,
    parseTs: parseTs, fmtTs: fmtTs, fmtVttTime: fmtVttTime,
    parseCsv: parseCsv, toCsv: toCsv, csvSep: csvSep,
    fromRows: fromRows, toXlsx: toXlsx, fromXlsx: fromXlsx,
    formatSrt: formatSrt, formatVtt: formatVtt, statOf: statOf
  };
});
