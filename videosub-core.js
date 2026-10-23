/* videosub-core.js —— 视频内封字幕提取页的独立引擎（v0.9.313）
 *
 * ⚠️ 三件套硬隔离（沿用用户定案的做法）：本文件只被 videosub.html 加载，
 *    不引入、不修改任何现有引擎（srt-core / convert-core / extract-core / shift-core 都不碰）。
 *    SRT/VTT/ASS/TXT 的渲染在这里另写一份精简版 —— 老页的代码一行不动。
 *
 * 干什么：把 MKV / WebM（Matroska）与 MP4 / MOV（ISO BMFF）里**内封的字幕轨**单独抽出来，
 *    导出成 SRT / VTT / ASS / TXT。视频轨、音频轨一个字节都不取。
 *
 * ⚠️⚠️ 为什么不能用「把整个文件读进内存」：
 *    这一页面对的是动辄 1GB 起步的视频，全量读进浏览器必崩，FileReader.readAsArrayBuffer(整个文件)
 *    更是直接爆。所以引擎只认一个「随机读取器」接口：
 *        { size:number, read(off,len) -> Uint8Array | Promise<Uint8Array> }
 *    跳转全靠容器自带的长度字段 —— 不关心的元素（视频/音频的 Block、MP4 的 mdat）
 *    **按 size 直接跳过去，连读都不读**。真正进入内存的只有字幕轨的那些文字。
 *
 * ⚠️ 坐标纪律：本文件里所有位置一律是**文件绝对坐标**。
 *    （第一版把「窗口内下标」和「文件坐标」混着用，Cluster 里一 seek 就全错位 —— 现版本
 *     只有一个入口 cover(abs,len) 换回窗口内下标，别的地方不许再算 base/off。）
 *
 * ⚠️ 三种 text 轨的载荷长得完全不同，别混着写：
 *    S_TEXT/UTF8   —— 就是纯文本（可能带换行），时间全在容器里
 *    S_TEXT/ASS    —— 一行 ASS Dialogue 的**后半段**（9 个元数据列 + 正文），没有时间列
 *    S_TEXT/WEBVTT —— 一个 WebVTT cue；多数 muxer 不写时间行，旧草案允许写 —— 两种都要认
 *    mov_text/tx3g —— sample = [uint16 长度][正文]；长度 0 的空 sample 表示「上一条到此结束」
 *
 * 浏览器 <script src> 与 Node (require) 通用。
 */
(function (root, factory) {
  if (typeof module !== 'undefined' && module.exports) module.exports = factory();
  else root.VideoSubCore = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  /* =====================================================================
     零、公共小工具
     ===================================================================== */

  function fail(code, msg) { var e = new Error(msg || code); e.code = code; throw e; }

  function u8ToStr(b) {
    if (typeof TextDecoder === 'function') {
      try { return new TextDecoder('utf-8').decode(b); } catch (e) { /* 老环境走下面的手写字 */ }
    }
    var s = '', i = 0, n = b.length, c, c2, c3;
    while (i < n) {
      c = b[i++];
      if (c < 0x80) s += String.fromCharCode(c);
      else if (c < 0xE0) { c2 = b[i++] || 0; s += String.fromCharCode((c & 0x1F) << 6 | (c2 & 0x3F)); }
      else if (c < 0xF0) { c2 = b[i++] || 0; c3 = b[i++] || 0; s += String.fromCharCode((c & 0x0F) << 12 | (c2 & 0x3F) << 6 | (c3 & 0x3F)); }
      else {
        var cp = ((c & 0x07) << 18 | ((b[i] || 0) & 0x3F) << 12 | ((b[i + 1] || 0) & 0x3F) << 6 | ((b[i + 2] || 0) & 0x3F)) - 0x10000;
        i += 3;
        s += String.fromCharCode(0xD800 + (cp >> 10), 0xDC00 + (cp & 0x3FF));
      }
    }
    return s;
  }
  /* 换行归一：SRT 出身的带 \r\n，ASS 出身的带 \N —— 统一成 \n */
  function nl(s) { return String(s == null ? '' : s).replace(/\r\n?/g, '\n'); }
  function tidyText(s) { return nl(s).replace(/\n+$/, ''); }

  function be(b, p, n) { var v = 0; for (var i = 0; i < n; i++) v = v * 256 + (b[p + i] || 0); return v; }
  function beSigned(b, p, n) { var v = be(b, p, n), half = Math.pow(2, n * 8 - 1); return v >= half ? v - Math.pow(2, n * 8) : v; }
  function pad(n, w) { n = String(n); while (n.length < w) n = '0' + n; return n; }
  function msClock(ms) {
    ms = Math.max(0, Math.round(ms));
    return { h: Math.floor(ms / 3600000), m: Math.floor(ms % 3600000 / 60000), s: Math.floor(ms % 60000 / 1000), ms: ms % 1000 };
  }
  function cat(a, b) {
    var nb = new Uint8Array(a.length + b.length);
    nb.set(a, 0); nb.set(b, a.length);
    return nb;
  }

  /* =====================================================================
     一、读取游标
        唯一对外能力：cover(abs,len) —— 保证 [abs,abs+len) 这一段在内存里，
        返回它在 buf 里的下标。其余情况一律用绝对坐标推进，不读就跳过。
     ===================================================================== */
  var CHUNK = 1 << 20;      // 每次最多补 1MB
  var MAX_INBUF = 8 << 20;  // 单次最多把 8MB 装进窗口（更大的元素只解析头部）
  var KEEP = 4 << 20;       // 向前跳不超过 4MB 就继续在旧窗口上追加（省得重新读一遍）

  function Cursor(reader) {
    this.r = reader;
    this.size = reader.size;
    this.buf = new Uint8Array(0);
    this.bufAbs = 0;        // buf[0] 对应的文件绝对坐标
    this.reads = 0;         // 读了多少次 —— 单测拿它证明「没把整份文件读进来」
    this.bytes = 0;
  }
  Cursor.prototype.pull = async function (abs, len) {
    var n = Math.max(0, Math.min(len, this.size - abs));
    if (n <= 0) return new Uint8Array(0);
    var got = this.r.read(abs, n);
    if (got && typeof got.then === 'function') got = await got;
    this.reads++; this.bytes += got.length;
    return got;
  };
  /** 保证 [abs, abs+len) 在窗口里；返回窗口内下标，装不下（>MAX_INBUF）返回 -1 */
  Cursor.prototype.cover = async function (abs, len) {
    if (abs < 0 || len <= 0) return -1;
    if (len > MAX_INBUF) return -1;
    var bufEnd = this.bufAbs + this.buf.length;
    if (abs >= this.bufAbs && abs + len <= bufEnd) return abs - this.bufAbs;
    /* ⚠️ 只有「回头看已丢掉的字节」才重建窗口。向前走一律只追加不裁剪 ——
       扫 Cluster 时会来回看（刚跳到下一个 Cluster，又要回头取上一条的 BlockDuration），
       一裁剪就必然再读一遍，实测同一份文件会多读三四倍。 */
    if (abs < this.bufAbs || abs - bufEnd > KEEP) {
      this.buf = new Uint8Array(0); this.bufAbs = abs;
    }
    var want = (abs - this.bufAbs) + len;
    while (this.buf.length < want) {
      var need = Math.max(CHUNK, want - this.buf.length);
      var from = this.bufAbs + this.buf.length;
      var got = await this.pull(from, need);
      if (!got.length) return -1;
      this.buf = cat(this.buf, got);
      /* 窗口有上界：追加后超 MAX_INBUF 就从头部裁掉多余部分，但绝不裁到 abs 之后 */
      if (this.buf.length > MAX_INBUF) {
        var cut = Math.min(this.buf.length - MAX_INBUF, abs - this.bufAbs);
        if (cut > 0) { this.buf = this.buf.subarray(cut); this.bufAbs += cut; }
      }
    }
    return abs - this.bufAbs;
  };
  Cursor.prototype.u8 = function (i) { return this.buf[i]; };
  Cursor.prototype.slice = function (i, j) { return this.buf.subarray(i, j); };
  /** 读一段并直接返回副本（脱离窗口，给调用方长期持有） */
  Cursor.prototype.grab = async function (abs, len) {
    var i = await this.cover(abs, len);
    if (i < 0) return null;
    return this.buf.slice(i, i + len);
  };

  /* =====================================================================
     二、Matroska / WebM
     ===================================================================== */

  var M = {
    Ebml: 0x1A45DFA3, Segment: 0x18538067,
    Info: 0x1549A966, TimestampScale: 0x2AD7B1, Duration: 0x4489,
    Tracks: 0x1654AE6B, TrackEntry: 0xAE, TrackNumber: 0xD7, TrackUID: 0x73C5,
    TrackType: 0x83, FlagLacing: 0x9C, Language: 0x22B59C, LanguageBCP47: 0x22B59D,
    Name: 0x536E, FlagDefault: 0x88, FlagForced: 0x55AA, CodecID: 0x86,
    CodecPrivate: 0x63A2, DefaultDuration: 0x23E383, ContentEncodings: 0x6D80,
    Cluster: 0x1F43B675, ClusterTs: 0xE7, SimpleBlock: 0xA3, BlockGroup: 0xA0,
    Block: 0xA1, BlockDuration: 0x9B
  };

  /* EBML 的变长整数（VINT）：前导 0 的个数决定占几个字节。
     ⚠️ 元素 ID **保留**标记位（0x1A45DFA3 就是四个字节原样读作一个数）；
     ⚠️ 元素长度与 Block 里的轨道号 **去掉**标记位 —— 混着用必然错位。 */
  function vintLenAt(b, p) {
    var x = b[p], mask = 0x80;
    for (var i = 0; i < 8; i++) { if (x & mask) return i + 1; mask >>= 1; }
    return 0;
  }
  function readId(b, p) {
    var l = vintLenAt(b, p);
    if (!l || p + l > b.length) return null;
    var v = 0;
    for (var i = 0; i < l; i++) v = v * 256 + b[p + i];
    return { value: v, len: l };
  }
  function readSize(b, p) {
    var l = vintLenAt(b, p);
    if (!l || p + l > b.length) return null;
    var v = b[p] & (0xff >> l);
    for (var i = 1; i < l; i++) v = v * 256 + b[p + i];
    return { value: v, len: l, unknown: v === Math.pow(2, 7 * l) - 1 };
  }

  var MKV_CODEC = {
    'S_TEXT/UTF8': 'plain',
    'S_TEXT/SSA': 'ass', 'S_TEXT/ASS': 'ass', 'S_SSA': 'ass', 'S_ASS': 'ass',
    'S_TEXT/WEBVTT': 'vtt', 'D_WEBVTT/SUBTITLES': 'vtt', 'D_WEBVTT/CAPTIONS': 'vtt',
    'S_TEXT/USF': 'xml',
    'S_VOBSUB': 'bitmap', 'D_VOBSUB': 'bitmap', 'S_HDMV/PGS': 'bitmap', 'S_DVBSUB': 'bitmap'
  };

  function trackLabel(tr) {
    var bits = [];
    if (tr.name) bits.push(tr.name);
    if (tr.lang && tr.lang !== 'und') bits.push(String(tr.lang).toUpperCase());
    if (tr.forced) bits.push('forced');
    return bits.join(' · ');
  }

  /* 顺序扫某一层：每段元素给 handler(id, bodyAbs, size, nextAbs)，返回 'stop' 停 */
  async function scanLevel(cur, from, to, handler) {
    var p = from, guard = 0;
    while (p < to && guard++ < 5000000) {
      var i = await cur.cover(p, Math.min(12, to - p));
      if (i < 0) return;
      var id = readId(cur.buf, i);
      if (!id) return;
      var sz = readSize(cur.buf, i + id.len);
      if (!sz) return;
      var bodyAbs = p + id.len + sz.len;
      var nextAbs = sz.unknown ? to : bodyAbs + sz.value;
      var r = handler(id.value, bodyAbs, sz, nextAbs);
      if (r === 'stop') return;
      if (sz.unknown) return;
      if (nextAbs <= p) return;
      p = nextAbs;
    }
  }

  async function findSegment(cur) {
    var box = { start: 0, end: cur.size };
    await scanLevel(cur, 0, cur.size, function (id, bodyAbs, sz, nextAbs) {
      if (id === M.Ebml) return;
      if (id === M.Segment) {
        box.start = bodyAbs;
        box.end = sz.unknown ? cur.size : Math.min(cur.size, bodyAbs + sz.value);
        return 'stop';
      }
      void nextAbs;
    });
    if (!box.start && !box.end) fail('notMkv', '没找到 Segment —— 这不是（完整的）Matroska 文件');
    return box;
  }

  /* ---------- 表头：TimecodeScale + 字幕轨清单 ----------
     除了 Info 与 Tracks，其它全部按 size 跳过去（一个字节都不读）。 */
  async function mkvMeta(reader, opt) {
    opt = opt || {};
    var cur = new Cursor(reader);
    var seg = await findSegment(cur);
    var scale = 1000000, durationTicks = 0;
    var allTracks = [];

    await scanLevel(cur, seg.start, seg.end, function (id, bodyAbs, sz, nextAbs) {
      if (id === M.Cluster) return 'stop';              // 出数据了：表头到此为止
      if (id !== M.Info && id !== M.Tracks) return;
      var todo = { id: id, bodyAbs: bodyAbs, endAbs: sz.unknown ? seg.end : bodyAbs + sz.value };
      pending.push(todo);
      void nextAbs;
    });
    var pending2 = pending.slice(); pending.length = 0;
    for (var k = 0; k < pending2.length; k++) {
      var job = pending2[k];
      if (job.id === M.Info) {
        await scanLevel(cur, job.bodyAbs, job.endAbs, function (cid, cBody, csz) {
          if (cid === M.TimestampScale) todoInts.push({ kind: 'scale', body: cBody, size: csz.value });
          if (cid === M.Duration) todoInts.push({ kind: 'dur', body: cBody, size: csz.value });
        });
      } else {
        await scanLevel(cur, job.bodyAbs, job.endAbs, function (cid, cBody, csz) {
          if (cid === M.TrackEntry) entries.push({ body: cBody, endAbs: csz.unknown ? job.endAbs : cBody + csz.value });
        });
      }
    }
    /* 顺序读 Info 的两个整数（窗口已经覆盖过，这里再 cover 一次很便宜） */
    for (var q = 0; q < todoInts.length; q++) {
      var it = todoInts[q];
      var g = await cur.cover(it.body, Math.min(it.size, 8));
      if (g < 0) continue;
      var v = 0;
      for (var z = 0; z < it.size && z < 8; z++) v = v * 256 + cur.buf[g + z];
      if (it.kind === 'scale') scale = v || 1000000;
      else durationTicks = v;
    }
    todoInts.length = 0;

    /* TrackEntry 一个个拆 */
    for (var e = 0; e < entries.length; e++) {
      var tr = {
        kind: 'mkv', type: 0, number: 0, codec: '', lang: '', name: '', bcp47: '',
        def: false, forced: false, private: null, enc: false, defaultDurNs: 0
      };
      await scanTrackEntry(cur, entries[e].body, entries[e].endAbs, tr);
      allTracks.push(tr);
    }
    entries.length = 0;

    var durationMs = durationTicks ? Math.round(durationTicks * scale / 1e6) : 0;
    var subs = allTracks.filter(function (t) { return t.type === 17; });
    subs.forEach(function (t, i) {
      t.idx = i;
      t.label = trackLabel(t);
      t.format = MKV_CODEC[t.codec] || 'other';
      t.bitmap = (t.format === 'bitmap');
      t.xml = (t.format === 'xml');
    });
    return {
      container: 'mkv', kind: 'mkv', scale: scale, tracks: subs,
      allTracks: allTracks, durationMs: durationMs, warnings: []
    };
  }
  var pending = [], todoInts = [], entries = [];   // ⚠️ 同步 handler 里只能记账，真读要等 handler 外

  async function scanTrackEntry(cur, bodyAbs, endAbs, tr) {
    await scanLevel(cur, bodyAbs, endAbs, function (id, b, sz) {
      fields.push({ id: id, body: b, size: sz.value });
    });
    for (var i = 0; i < fields.length; i++) {
      var f = fields[i];
      if (f.size > MAX_INBUF) continue;
      var g = await cur.cover(f.body, Math.max(1, Math.min(f.size, MAX_INBUF)));
      if (g < 0) continue;
      switch (f.id) {
        case M.TrackNumber: tr.number = be(cur.buf, g, f.size); break;
        case M.TrackType: tr.type = be(cur.buf, g, f.size); break;
        case M.FlagDefault: tr.def = !!be(cur.buf, g, f.size); break;
        case M.FlagForced: tr.forced = !!be(cur.buf, g, f.size); break;
        case M.DefaultDuration: tr.defaultDurNs = be(cur.buf, g, f.size); break;
        case M.CodecID: tr.codec = u8ToStr(cur.slice(g, g + f.size)).replace(/\0+$/, ''); break;
        case M.Language: tr.lang = u8ToStr(cur.slice(g, g + f.size)).replace(/\0+$/, ''); break;
        case M.LanguageBCP47: tr.bcp47 = u8ToStr(cur.slice(g, g + f.size)).replace(/\0+$/, ''); break;
        case M.Name: tr.name = u8ToStr(cur.slice(g, g + f.size)).replace(/\0+$/, ''); break;
        case M.ContentEncodings: tr.enc = true; break;
        case M.CodecPrivate:
          /* ASS 轨的 [Script Info] + 样式全在这里 —— 导出 ASS 要原样带回去 */
          tr.private = cur.slice(g, g + f.size).slice();
          break;
        default: break;
      }
    }
    fields.length = 0;
  }
  var fields = [];

  /* ---------- 取某条轨的全部 cue ----------
     ⚠️ 视频/音频的 Block 只解析 4~6 字节的头部就按 size 走过去，正文一次都不读。 */
  async function mkvCues(reader, track, meta, opt) {
    opt = opt || {};
    var onProgress = opt.onProgress || null;
    var scale = (meta && meta.scale) || 1000000;
    var toMs = function (ticks) { return ticks * scale / 1e6; };
    var cur = new Cursor(reader);
    var seg = await findSegment(cur);
    var cues = [];

    var pend = null;   // { start, text } —— 还差一个结束时刻
    function pushCue(endMs, guessed) {
      if (!pend) return;
      var s = pend.start;
      var e = (endMs == null) ? s + ((track.defaultDurNs ? track.defaultDurNs / 1e6 : 0) || 2000) : endMs;
      if (e <= s) e = s + 1;
      cues.push({ start: Math.round(s), end: Math.round(e), text: tidyText(pend.text), endGuessed: !!guessed });
      pend = null;
    }

    var seen = 0;
    var clusters = [];
    await scanLevel(cur, seg.start, seg.end, function (id, bodyAbs, sz, nextAbs) {
      if (id === M.Cluster) clusters.push({ body: bodyAbs, end: sz.unknown ? seg.end : nextAbs });
    });
    for (var ci = 0; ci < clusters.length; ci++) {
      await readCluster(cur, clusters[ci], track, toMs, {
        onText: function (startMs, text) {
          /* 上一条没等到 BlockDuration：它的结束就是这一条的开始 */
          pushCue(startMs, false);
          pend = { start: startMs, text: text };
          seen++;
        },
        onDur: function (startMs, durMs) {
          if (pend && Math.abs(pend.start - startMs) < 2) pushCue(startMs + durMs, false);
        }
      });
      if (onProgress) onProgress(clusters[ci].end, seg.end);
    }
    pushCue(null, true);
    return { cues: cues, seen: seen, warnings: [] };
  }

  async function readCluster(cur, box, track, toMs, cb) {
    var clusterTs = 0;
    var blocks = [];
    await scanLevel(cur, box.body, box.end, function (id, bodyAbs, sz, nextAbs) {
      if (id === M.ClusterTs) tsAt.push({ body: bodyAbs, size: sz.value });
      else if (id === M.SimpleBlock || id === M.Block) blocks.push({ kind: 'b', body: bodyAbs, size: sz.value });
      else if (id === M.BlockGroup) blocks.push({ kind: 'g', body: bodyAbs, end: sz.unknown ? box.end : nextAbs });
    });
    for (var i = 0; i < tsAt.length; i++) {
      var g = await cur.cover(tsAt[i].body, Math.min(tsAt[i].size, 8));
      if (g >= 0) {
        var v = 0;
        for (var z = 0; z < tsAt[i].size && z < 8; z++) v = v * 256 + cur.buf[g + z];
        clusterTs = toMs(v);
      }
    }
    tsAt.length = 0;

    for (var b = 0; b < blocks.length; b++) {
      var it = blocks[b];
      if (it.kind === 'b') {
        var got = await readBlock(cur, it.body, it.size, track, clusterTs, toMs);
        if (got) cb.onText(got.startMs, got.text);
      } else {
        await readBlockGroup(cur, it.body, it.end, track, clusterTs, toMs, cb);
      }
    }
  }
  var tsAt = [];

  async function readBlockGroup(cur, bodyAbs, endAbs, track, clusterTs, toMs, cb) {
    var blk = null, durMs = null;
    await scanLevel(cur, bodyAbs, endAbs, function (id, b, sz, nextAbs) {
      if (id === M.Block) blk = { body: b, size: sz.value };
      else if (id === M.BlockDuration) durAt.push({ body: b, size: sz.value, end: sz.unknown ? endAbs : nextAbs });
    });
    for (var i = 0; i < durAt.length; i++) {
      var g = await cur.cover(durAt[i].body, Math.min(durAt[i].size, 8));
      if (g >= 0) {
        var d = 0;
        for (var z = 0; z < durAt[i].size && z < 8; z++) d = d * 256 + cur.buf[g + z];
        durMs = toMs(d);
      }
    }
    durAt.length = 0;
    if (!blk) return;
    var got = await readBlock(cur, blk.body, blk.size, track, clusterTs, toMs);
    if (!got) return;
    cb.onText(got.startMs, got.text);
    if (durMs != null) cb.onDur(got.startMs, durMs);
  }
  var durAt = [];

  /* Block 载荷 = [轨道号 VINT][int16 相对时间戳][1 字节 flags][可选 lace 表][数据] */
  async function readBlock(cur, bodyAbs, size, track, clusterTs, toMs) {
    var i = await cur.cover(bodyAbs, Math.min(size, 16));   // 只读头部就够了：不是目标轨直接走
    if (i < 0) return null;
    var tn = readSize(cur.buf, i);
    if (!tn) return null;
    if (tn.value !== track.number) return null;
    var hp = i + tn.len;
    if (await cur.cover(bodyAbs, Math.min(size, tn.len + 3 + 1)) === -1) return null;
    i = await cur.cover(bodyAbs, Math.min(size, tn.len + 4));
    if (i < 0) return null;
    var rel = beSigned(cur.buf, i + tn.len, 2);
    var flags = cur.buf[i + tn.len + 2];
    var startMs = clusterTs + toMs(rel);
    var dataAbs = bodyAbs + tn.len + 3;
    var dataLen = size - tn.len - 3;
    var lacing = (flags & 0x06) >> 1;
    if (dataLen <= 0) return { startMs: startMs, text: '' };

    if (lacing === 0) {
      var u8 = await cur.grab(dataAbs, dataLen);
      if (!u8) return { startMs: startMs, text: '' };
      return { startMs: startMs, text: payloadToText(u8, track) };
    }
    /* lace（一 Block 装多帧）：文本轨极罕见，按「每帧各一行」处理 */
    var head = await cur.grab(dataAbs, Math.min(dataLen, 1 + 8 * 8));
    if (!head) return { startMs: startMs, text: '' };
    var numFrames = head[0] + 1;
    var pos = 1, sizes = [], k;
    if (lacing === 2) {
      var each = Math.floor((dataLen - 1) / numFrames);
      for (k = 0; k < numFrames; k++) sizes.push(each);
    } else {
      function xiph() { var v = 0, b1; while (pos < head.length) { b1 = head[pos++]; v = v * 128 + (b1 & 0x7f); if (!(b1 & 0x80)) break; } return v; }
      for (k = 0; k < numFrames - 1; k++) sizes.push(xiph());
      var sofar = 0;
      for (k = 0; k < sizes.length; k++) sofar += sizes[k];
      sizes.push(Math.max(0, dataLen - 1 - (pos - 1) - sofar));
    }
    var body = await cur.grab(dataAbs, dataLen);
    if (!body) return { startMs: startMs, text: '' };
    var parts = [], off = sizes.length ? (pos) : 1;
    for (k = 0; k < numFrames && k < sizes.length; k++) {
      var from = Math.min(body.length, off), to = Math.min(body.length, off + sizes[k]);
      if (to > from) parts.push(payloadToText(body.subarray(from, to), track));
      off += sizes[k];
    }
    return { startMs: startMs, text: parts.join('\n') };
  }

  /* 载荷 → 正文：三种 text 轨各走一路 */
  function payloadToText(u8, track) {
    var raw = u8ToStr(u8);
    if (track.format === 'ass') {
      /* 容器里的 ASS Dialogue 被剥掉了前缀，只剩 8 个元数据列 + 正文：
         ReadOrder,Layer,Style,Actor,MarginL,MarginR,MarginV,Effect,文本
         ⚠️ 正文里允许有逗号（台词很常见）—— 只能数到第 8 个逗号为止，不能 full-split
         ⚠️ \N 是 ASS 的换行：内部统一成 \n，导出 ASS 时再换回去 */
      return nl(raw).split('\n').map(stripAssMeta).join('\n').replace(/\\N/gi, '\n');
    }
    if (track.format === 'vtt') {
      /* 甲式（ffmpeg / mkvmerge）：不带时间行，整段就是正文；
         乙式（旧草案）：带 cue 编号 + 「00:00:01.000 --> 00:00:03.400」—— 先剥掉再取正文 */
      var ls = nl(raw).split('\n');
      for (var i = 0; i < ls.length; i++) if (ls[i].indexOf('-->') >= 0) return ls.slice(i + 1).join('\n');
      return ls.join('\n');
    }
    return nl(raw);
  }
  /* ASS Dialogue 在容器里是「8 个元数据列 + 正文」：数到第 8 个逗号，后面全算正文。
     ⚠️ 逗号数不够就整行照留 —— 宁可多留几个字，也不能把正文切掉半句。 */
  var ASS_META_COLS = 8;
  function stripAssMeta(line) {
    var idx = -1, k;
    for (k = 0; k < ASS_META_COLS; k++) { idx = line.indexOf(',', idx + 1); if (idx < 0) break; }
    return (k === ASS_META_COLS && idx >= 0) ? line.slice(idx + 1) : line;
  }

  /* =====================================================================
     三、MP4 / MOV（ISO BMFF）
     ===================================================================== */

  function boxType(u8, p) { return String.fromCharCode(u8[p], u8[p + 1], u8[p + 2], u8[p + 3]); }

  async function mp4Meta(reader, opt) {
    opt = opt || {};
    var cur = new Cursor(reader);
    var warns = [];
    var top = [];
    var p = 0, guard = 0;
    while (p + 8 <= cur.size && guard++ < 65536) {
      var i = await cur.cover(p, 16);
      if (i < 0) break;
      var size = be(cur.buf, i, 4), type = boxType(cur.buf, i + 4), hdr = 8;
      if (size === 1) { size = be(cur.buf, i + 12, 4) * Math.pow(2, 32) + be(cur.buf, i + 16, 4); hdr = 16; }
      if (size === 0) size = cur.size - p;
      if (size < hdr) break;
      if (p + size > cur.size + 1) size = cur.size - p;
      top.push({ type: type, start: p, size: size, hdr: hdr });
      p += size;
    }
    var moov = null;
    for (var t = 0; t < top.length; t++) if (top[t].type === 'moov') moov = top[t];
    if (!moov) {
      var hasMoof = top.some(function (b) { return b.type === 'moof'; });
      if (hasMoof) fail('fragMp4', '这是分片的 MP4（moof + mdat），样本不在 moov 表里');
      fail('notMp4', '没找到 moov —— 这不是（完整的）MP4 文件');
    }
    if (moov.size - moov.hdr > MAX_INBUF) fail('moovTooBig', 'moov 超过 8MB，本页读不动');
    var buf = await cur.grab(moov.start + moov.hdr, moov.size - moov.hdr);
    if (!buf) fail('notMp4', 'moov 读不出来');

    var tracks = [];
    var state = { mvTimescale: 1000 };
    var stack = [{ s: 0, e: buf.length }];
    var g2 = 0;
    while (stack.length && g2++ < 20000) {
      var fr = stack.pop();
      var q = fr.s;
      while (q + 8 <= fr.e) {
        var bsz = be(buf, q, 4), bty = boxType(buf, q + 4), bhdr = 8;
        if (bsz === 1) { bsz = be(buf, q + 12, 4); bhdr = 16; }
        if (bsz === 0) bsz = fr.e - q;
        if (bsz < bhdr || q + bsz > fr.e + 1) break;
        var bs = q + bhdr, beEnd = q + bsz;
        if (bty === 'mvhd') {
          var mv = buf[bs];
          state.mvTimescale = (mv === 1) ? be(buf, bs + 20, 4) : be(buf, bs + 12, 4);
        } else if (bty === 'trak') {
          var tr = parseTrak(buf, bs, beEnd);
          if (tr && tr.isText) tracks.push(tr);
        } else if (bty === 'moov' || bty === 'mdia' || bty === 'minf' || bty === 'stbl' ||
          bty === 'edts' || bty === 'dinf' || bty === 'udta') {
          stack.push({ s: bs, e: beEnd });
        }
        q = beEnd;
      }
    }
    tracks.forEach(function (tr, i) {
      tr.idx = i;
      tr.kind = 'mp4';
      tr.label = trackLabel(tr);
      tr.bitmap = false; tr.xml = false;
    });
    return { container: 'mp4', kind: 'mp4', tracks: tracks, warnings: warns, movieTimescale: state.mvTimescale };
  }

  function parseTrak(buf, start, end) {
    var t = {
      kind: 'mp4', number: 0, timescale: 1000, durTicks: 0, handler: '', codec: '', format: '',
      stsd: null, stts: null, stsz: null, stsc: null, stco: null, co64: false,
      lang: '', name: '', def: false, forced: false, isText: false
    };
    var stack = [{ s: start, e: end }];
    var guard = 0;
    while (stack.length && guard++ < 4096) {
      var fr = stack.pop();
      var p = fr.s;
      while (p + 8 <= fr.e) {
        var size = be(buf, p, 4), type = boxType(buf, p + 4), hdr = 8;
        if (size === 1) { size = be(buf, p + 12, 4); hdr = 16; }
        if (size === 0) size = fr.e - p;
        if (size < hdr || p + size > fr.e + 1) break;
        var bs = p + hdr, bEnd = p + size;
        switch (type) {
          case 'mdia': case 'minf': case 'stbl': case 'edts': case 'dinf':
            stack.push({ s: bs, e: bEnd }); break;
          case 'mdhd': {
            var v2 = buf[bs];
            if (v2 === 1) { t.timescale = be(buf, bs + 20, 4); t.durTicks = be(buf, bs + 24, 4) * Math.pow(2, 32) + be(buf, bs + 28, 4); }
            else { t.timescale = be(buf, bs + 12, 4); t.durTicks = be(buf, bs + 16, 4); }
            var langCode = be(buf, bs + (v2 === 1 ? 32 : 20), 2);
            if (langCode) {
              t.lang = String.fromCharCode(((langCode >> 10) & 0x1f) + 0x60, ((langCode >> 5) & 0x1f) + 0x60, (langCode & 0x1f) + 0x60);
            }
            break;
          }
          case 'hdlr': t.handler = boxType(buf, bs + 8); break;
          case 'stsd': t.stsd = parseStsd(buf, bs, bEnd); break;
          case 'stts': t.stts = parseTts(buf, bs, bEnd); break;
          case 'stsz': t.stsz = parseSz(buf, bs, bEnd); break;
          case 'stsc': t.stsc = parseSc(buf, bs, bEnd); break;
          case 'stco': t.stco = parseCo(buf, bs, bEnd, false); t.co64 = false; break;
          case 'co64': t.stco = parseCo(buf, bs, bEnd, true); t.co64 = true; break;
          default: break;
        }
        p = bEnd;
      }
    }
    var isSub = (t.handler === 'sbtl' || t.handler === 'subt' || t.handler === 'text' || t.handler === 'clcp');
    var fmt = t.stsd && t.stsd.fmt;
    if (isSub && fmt) {
      t.isText = true;
      t.codec = fmt;
      /* tx3g / mp4s / text 装的都是纯文本（带长度前缀），跟 S_TEXT/UTF8 同一路处理 */
      t.format = 'plain';
    }
    return t;
  }

  function parseStsd(buf, s, e) {
    var n = be(buf, s + 4, 4);
    if (!n) return null;
    var p = s + 8;
    for (var i = 0; i < n; i++) {
      if (p + 8 > e) break;
      var sz = be(buf, p, 4), fmt = boxType(buf, p + 4);
      if (sz < 8) break;
      return { fmt: fmt, size: sz, start: p };
    }
    return null;
  }
  function parseTts(buf, s, e) {
    var n = be(buf, s + 4, 4), out = [], p = s + 8, i;
    if (n > 2000000) n = 2000000;
    for (i = 0; i < n && p + 8 <= e; i++) { out.push({ c: be(buf, p, 4), d: be(buf, p + 4, 4) }); p += 8; }
    return out;
  }
  function parseSz(buf, s, e) {
    var ss = be(buf, s + 4, 4), n = be(buf, s + 8, 4), arr = [], p = s + 12, i;
    if (n > 4000000) n = 4000000;
    if (ss !== 0) return { fixed: ss, count: n, arr: null };
    for (i = 0; i < n && p + 4 <= e; i++) { arr.push(be(buf, p, 4)); p += 4; }
    return { fixed: 0, count: n, arr: arr };
  }
  function parseSc(buf, s, e) {
    var n = be(buf, s + 4, 4), out = [], p = s + 8, i;
    if (n > 2000000) n = 2000000;
    for (i = 0; i < n && p + 12 <= e; i++) { out.push({ first: be(buf, p, 4), per: be(buf, p + 4, 4), sdi: be(buf, p + 8, 4) }); p += 12; }
    return out;
  }
  function parseCo(buf, s, e, big) {
    var n = be(buf, s + 4, 4), out = [], p = s + 8, i;
    if (n > 2000000) n = 2000000;
    for (i = 0; i < n && p + (big ? 8 : 4) <= e; i++) {
      out.push(big ? (be(buf, p, 4) * Math.pow(2, 32) + be(buf, p + 4, 4)) : be(buf, p, 4));
      p += big ? 8 : 4;
    }
    return out;
  }

  /* MP4 取 cue：先排好每个 sample 的（偏移、长度、起止时间），再只读这些小段 */
  async function mp4Cues(reader, track, meta, opt) {
    opt = opt || {};
    var onProgress = opt.onProgress || null;
    var cur = new Cursor(reader);
    var ts = track.timescale || 1000;
    var n = track.stsz ? track.stsz.count : 0;
    if (!n) return { cues: [], seen: 0, warnings: [] };
    if (!track.stco || !track.stco.length || !track.stsc || !track.stsc.length) {
      fail('noTable', '这一轨缺样本表（stco / stsc），读不出来');
    }
    /* stsc → 每个 sample 属于哪个 chunk
       ⚠️ 一条 stsc 记录管的是「从第 first 号 chunk 起、到下一条的 first 号之前的这一段」，
          记录序号 ≠ chunk 序号 —— 第一版就是按序号取的，结果指到了视频轨的数据上。 */
    var chunkOf = new Array(n), sizes = new Array(n), i;
    var ent = track.stsc, s = 0;
    for (var j = 0; j < ent.length && s < n; j++) {
      var firstChunk = ent[j].first - 1;
      var nextFirst = (j + 1 < ent.length) ? (ent[j + 1].first - 1) : track.stco.length;
      for (var c = firstChunk; c < nextFirst && s < n; c++) {
        for (var m = 0; m < ent[j].per && s < n; m++) chunkOf[s++] = c;
      }
    }
    for (i = s; i < n; i++) chunkOf[i] = chunkOf[s - 1] || 0;

    var offsets = new Array(n);
    var lastChunk = -1, cursor = 0, acc = 0;
    for (i = 0; i < n; i++) {
      sizes[i] = track.stsz.fixed || (track.stsz.arr ? track.stsz.arr[i] : 0);
      if (chunkOf[i] !== lastChunk) { lastChunk = chunkOf[i]; cursor = track.stco[lastChunk] || 0; acc = 0; }
      offsets[i] = cursor + acc;
      acc += sizes[i];
    }
    /* stts → 起点与时长 */
    var times = new Array(n), durs = new Array(n), t0 = 0, idx = 0, ei = 0, left = 0, dv = 0;
    while (idx < n && ei < (track.stts ? track.stts.length : 0)) {
      if (left === 0) { left = track.stts[ei].c; dv = track.stts[ei].d; ei++; }
      if (left === 0) continue;
      times[idx] = t0; durs[idx] = dv; t0 += dv; left--; idx++;
    }
    for (i = idx; i < n; i++) { times[i] = t0; durs[i] = 0; }

    var cues = [], open = null;
    for (i = 0; i < n; i++) {
      var startMs = Math.round(times[i] * 1000 / ts);
      if (!sizes[i]) {
        /* 空 sample = 上一条到此结束（mov_text 的常规收尾手法） */
        if (open) { open.end = Math.max(startMs, open.start + 1); open = null; }
        continue;
      }
      var raw = await cur.grab(offsets[i], Math.min(sizes[i], 1 << 20));
      if (!raw) continue;
      var txt = decodeMovText(raw, sizes[i]);
      if (txt == null) continue;
      if (open) { open.end = Math.max(startMs, open.start + 1); open = null; }
      var cue = { start: startMs, end: Math.round((times[i] + durs[i]) * 1000 / ts), text: tidyText(txt) };
      if (cue.end <= cue.start) cue.end = cue.start + 1;
      if (String(cue.text).trim() === '') continue;      // 纯占位不留
      cues.push(cue);
      open = cue;
      /* 每 200 条报一次进度：MP4 的字幕 sample 很小很多，逐条报太吵 */
      if (onProgress && (i % 200) === 0) onProgress(i, n);
    }
    if (onProgress) onProgress(n, n);
    if (open && track.durTicks) open.end = Math.max(open.end, Math.round(track.durTicks * 1000 / ts));
    void meta;
    return { cues: cues, seen: n, warnings: [] };
  }

  /* mov_text sample = [uint16 长度][正文 UTF-8][可选样式盒]
     ⚠️ 有些 muxer 干脆不写长度前缀。判据很保守：只有「前两字节正好等于 总长-2」
        或「总长就是 2 且两字节都是 0」时才认它是长度 —— 否则整段当正文，
        不然会把台词的前两个汉字吞掉。 */
  function decodeMovText(u8, size) {
    if (!u8 || size <= 0) return null;
    if (size >= 2) {
      var l = (u8[0] << 8) | u8[1];
      if (l === size - 2) return l === 0 ? '' : u8ToStr(u8.subarray(2, 2 + l));
      if (l === 0 && size === 2) return '';
    }
    return u8ToStr(u8.subarray(0, size));
  }

  /* =====================================================================
     四、渲染（SRT / VTT / ASS / TXT）
     ===================================================================== */
  /* v0.9.366：ASS 正文里带覆写标签（{\i1}斜体{\i0}、{\b1}、{\pos(…)} …）。
     导出 ASS 时原样保留（那是原片作者定的版式，本页铁律：只搬不改）；
     但导出 SRT / VTT / TXT 时播放器不认花括号，会把 {\i1} 当正文显示出来
     （v0.9.365 实测：抽出来的 SRT 正文中夹着 {\i1}）。
     这里做一次映射：斜体 → <i>、粗体 → <b>、下划线 → <u>（SRT/VTT 认这套），其余标签丢弃。 */
  var RE_ASS_TAG = /\{\\[^}]*\}/g;
  var RE_ASS_STYLE = /\\(i|b|u)(\d+)/g;
  function assTagsToPlain(s) {
    var t = nl(s);
    if (t.indexOf('{') < 0) return t;
    t = t.replace(RE_ASS_TAG, function (m) {
      /* 一个 {\…} 里可能同时写好几个开关（{\i1\b1}），也可能混着 \pos / \fn 这类
         没有对应 HTML 标签的参数 —— 只挑能映射的那几个，其余整段丢掉。 */
      var out = '', mm;
      RE_ASS_STYLE.lastIndex = 0;
      while ((mm = RE_ASS_STYLE.exec(m))) {
        var tag = mm[1] === 'i' ? 'i' : (mm[1] === 'b' ? 'b' : 'u');
        out += (mm[2] === '0') ? ('</' + tag + '>') : ('<' + tag + '>');
      }
      return out;
    });
    /* \h = ASS 的不换行空格，\N = 换行：这两种在纯文本里也留着反斜杠，一并还原 */
    return t.replace(/\\h/g, ' ').replace(/\\N/gi, '\n');
  }
  function plainCues(cues) {
    return (cues || []).map(function (c) {
      var t = assTagsToPlain(c.text);
      return (t === String(c.text)) ? c : { start: c.start, end: c.end, text: t };
    });
  }
  function renderSrt(cues) {
    var out = [];
    plainCues(cues).forEach(function (c, i) {
      var a = msClock(c.start), b = msClock(Math.max(c.end, c.start + 1));
      out.push(String(i + 1));
      out.push(pad(a.h, 2) + ':' + pad(a.m, 2) + ':' + pad(a.s, 2) + ',' + pad(a.ms, 3) + ' --> ' +
        pad(b.h, 2) + ':' + pad(b.m, 2) + ':' + pad(b.s, 2) + ',' + pad(b.ms, 3));
      out.push(c.text);
      out.push('');
    });
    return out.join('\n');
  }
  function renderVtt(cues) {
    var out = ['WEBVTT', ''];
    plainCues(cues).forEach(function (c) {
      var a = msClock(c.start), b = msClock(Math.max(c.end, c.start + 1));
      out.push(pad(a.h, 2) + ':' + pad(a.m, 2) + ':' + pad(a.s, 2) + '.' + pad(a.ms, 3) + ' --> ' +
        pad(b.h, 2) + ':' + pad(b.m, 2) + ':' + pad(b.s, 2) + '.' + pad(b.ms, 3));
      out.push(c.text);
      out.push('');
    });
    return out.join('\n');
  }
  var ASS_DEFAULT = [
    '[Script Info]',
    '; 由 AI-SRTSub 从视频内封字幕抽出',
    'ScriptType: v4.00+',
    'PlayResX: 1920',
    'PlayResY: 1080',
    'WrapStyle: 0',
    '',
    '[V4+ Styles]',
    'Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding',
    'Style: Default,Noto Sans,54,&H00FFFFFF,&H000000FF,&H00000000,&H80000000,0,0,0,0,100,100,0,0,1,2,0,2,60,60,45,1',
    '',
    '[Events]',
    'Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text'
  ].join('\n') + '\n';
  function assTime(ms) {
    var c = msClock(Math.max(0, ms));
    return c.h + ':' + pad(c.m, 2) + ':' + pad(c.s, 2) + '.' + pad(Math.floor(c.ms / 10), 2);
  }
  function renderAss(cues, opt) {
    opt = opt || {};
    /* 原轨自带的 [Script Info] / 样式优先：那是这片字幕作者定好的版式，
       换成自家默认头会把字号、边距、站位全改掉（本页铁律：只搬不改）。 */
    var head = (opt.assHeader && String(opt.assHeader).trim()) ? (nl(opt.assHeader).replace(/\n+$/, '') + '\n') : ASS_DEFAULT;
    var body = cues.map(function (c) {
      return 'Dialogue: 0,' + assTime(c.start) + ',' + assTime(Math.max(c.end, c.start + 1)) +
        ',Default,,0,0,0,,' + nl(c.text).split('\n').join('\\N');
    });
    return head + body.join('\n') + (body.length ? '\n' : '');
  }
  function renderTxt(cues) {
    /* v0.9.366：纯文本同样不该留 {\i1} */
    return plainCues(cues).map(function (c) { return c.text; }).join('\n') + (cues.length ? '\n' : '');
  }
  function render(cues, fmt, opt) {
    opt = opt || {};
    if (fmt === 'vtt') return renderVtt(cues);
    if (fmt === 'ass') return renderAss(cues, opt);
    if (fmt === 'txt') return renderTxt(cues);
    return renderSrt(cues);
  }
  function outName(fname, fmt, suffix) {
    var base = String(fname || 'subtitle').replace(/\.[^./\\]+$/, '');
    if (suffix) base += suffix;
    return base + '.' + (fmt || 'srt');
  }

  /* =====================================================================
     五、对外接口
     ===================================================================== */

  function detect(head, fname) {
    if (head && head.length >= 4 &&
      head[0] === 0x1A && head[1] === 0x45 && head[2] === 0xDF && head[3] === 0xA3) return 'mkv';
    if (head && head.length >= 12 && boxType(head, 4) === 'ftyp') return 'mp4';
    var ext = String(fname || '').toLowerCase().replace(/^.*\./, '');
    if (ext === 'mkv' || ext === 'webm' || ext === 'mka') return 'mkv';
    if (ext === 'mp4' || ext === 'm4v' || ext === 'mov') return 'mp4';
    return null;
  }

  async function listTracks(reader, opt) {
    opt = opt || {};
    var head = await (async function () {
      var c = new Cursor(reader);
      return await c.grab(0, Math.min(64, c.size));
    })();
    var kind = detect(head, opt.name);
    if (!kind) fail('unknown', '认不出容器（只支持 MKV/WebM 与 MP4/MOV）');
    return (kind === 'mkv') ? await mkvMeta(reader, opt) : await mp4Meta(reader, opt);
  }

  async function readCues(reader, track, meta, opt) {
    opt = opt || {};
    if (track.bitmap) fail('bitmap', '这一轨是图形字幕（位图），里面没有文字可抽');
    if (track.xml) fail('xml', '这一轨是 USF XML 字幕，本页不处理');
    if (track.enc) fail('encoded', '这一轨被容器二次编码过，抽出来会是乱码');
    var k = (meta && meta.container) || track.kind;
    return (k === 'mkv') ? await mkvCues(reader, track, meta, opt) : await mp4Cues(reader, track, meta, opt);
  }

  /* 给页面用：把 File 包成读取器
     ⚠️ 不用 FileReader.readAsArrayBuffer(整个文件) —— 那会把整份视频读进内存。
        这里按偏移取「一小段」。 */
  function fileReader(file) {
    return {
      size: file.size,
      read: function (off, len) {
        var end = Math.min(file.size, off + len);
        if (end <= off) return Promise.resolve(new Uint8Array(0));
        var part = file.slice(off, end);
        if (typeof Blob !== 'undefined' && part.arrayBuffer) {
          return part.arrayBuffer().then(function (ab) { return new Uint8Array(ab); });
        }
        return new Promise(function (resolve, reject) {
          var fr = new FileReader();
          fr.onload = function () { resolve(new Uint8Array(fr.result)); };
          fr.onerror = reject;
          fr.readAsArrayBuffer(part);
        });
      }
    };
  }

  return {
    detect: detect,
    listTracks: listTracks,
    readCues: readCues,
    render: render,
    outName: outName,
    fileReader: fileReader,
    /* 内部件（单测直接量）： */
    _u8ToStr: u8ToStr, _nl: nl, _stripAssMeta: stripAssMeta,
    _renderSrt: renderSrt, _renderVtt: renderVtt, _renderAss: renderAss, _renderTxt: renderTxt,
    _decodeMovText: decodeMovText, _payloadToText: payloadToText,
    _readSize: readSize, _readId: readId,
    _mkvMeta: mkvMeta, _mkvCues: mkvCues, _mp4Meta: mp4Meta, _mp4Cues: mp4Cues,
    FORMATS: ['srt', 'vtt', 'ass', 'txt']
  };
});
