/* 夹具生成器（非交付件）：手写一个最小的 Matroska 文件，用来造 ffmpeg 还没覆盖的字幕轨形态。
   ⚠️ 手写的夹具必须自己站得住 —— 生成后一律用 ffmpeg 反向抽取一遍做独立验证。 */
const fs = require('fs');
const DIR = '/Users/jp/WorkBuddy/2026-09-04-00-29-54/_vsfx';

/* ---------- EBML 写入 ---------- */
function vintLen(v) {                      // 值 → 需要几个字节（含标记位）
  let n = 1;
  while (v >= Math.pow(2, 7 * n) - 1 && n < 8) n++;
  return n;
}
function encUint(v, n) {                   // 定长无符号整数
  const out = Buffer.alloc(n);
  let x = v;
  for (let i = n - 1; i >= 0; i--) { out[i] = x % 256; x = Math.floor(x / 256); }
  return out;
}
function encId(id) {                       // 元素 ID：写原样字节（标记位算在 ID 里），宽度由数值本身的字节数决定
  let n = 1;
  while (Math.pow(256, n) <= id && n < 8) n++;
  return encUint(id, n);
}
function encSize(v) {                      // 元素长度：先写标记位，其余是值（标记位不计入值）
  const n = vintLen(v);
  return encUint(v + Math.pow(2, 7 * n), n);
}
function el(id, payload) {
  return Buffer.concat([encId(id), encSize(payload.length), Buffer.isBuffer(payload) ? payload : Buffer.from(payload, 'utf8')]);
}
function elInt(id, v, n) { return el(id, encUint(v, n || vintLen(v))); }
function elStr(id, s) { return el(id, Buffer.from(s, 'utf8')); }

/* ---------- Block 载荷 ---------- */
function encTrackNum(n) {                  // 轨道号是「去掉标记位」的 VINT → 原字节带标记位
  const l = vintLen(n);
  return encUint(n + Math.pow(2, 7 * l), l);
}
function encBlock(track, relMs, flags, data) {
  const body = Buffer.isBuffer(data) ? data : Buffer.from(data, 'utf8');
  const head = Buffer.alloc(2);
  head.writeInt16BE(relMs, 0);
  return Buffer.concat([encTrackNum(track), head, Buffer.from([flags]), body]);
}

/* ---------- 组装 ---------- */
function buildMkv(opts) {
  const scale = opts.timestampScale || 1000000;      // 默认 1 ms
  const toScaled = ms => Math.round(ms * 1000000 / scale);

  const tracks = Buffer.concat(opts.tracks.map(tr => el(0xAE, Buffer.concat([
    elInt(0xD7, tr.number, 1),                       // TrackNumber
    elInt(0x73C5, tr.uid || 1, 4),                   // TrackUID
    elInt(0x83, 17, 1),                              // TrackType = subtitle
    elInt(0x9C, 0, 1),                               // FlagLacing
    elStr(0x22B59C, tr.lang || 'chi'),               // Language
    elInt(0x88, tr.flagDefault === undefined ? 1 : tr.flagDefault, 1),
    elStr(0x86, tr.codecId),                         // CodecID
    tr.name ? elStr(0x536E, tr.name) : Buffer.alloc(0),
    tr.codecPrivate ? el(0x63A2, tr.codecPrivate) : Buffer.alloc(0)
  ]))));

  /* 每个 Cluster 一簇 block；这里给每条 cue 单独一个 cluster，逼一下跨 cluster 的时间换算 */
  const clusters = Buffer.concat(opts.cues.map(c => {
    const clusterTs = toScaled(c.start);
    const body = Buffer.concat([
      elInt(0xE7, clusterTs, Math.max(1, vintLen(clusterTs))),
      el(0xA0, Buffer.concat([
        el(0xA1, encBlock(opts.tracks[0].number, 0, 0, c.text)),
        elInt(0x9B, toScaled(c.end - c.start), Math.max(1, vintLen(toScaled(c.end - c.start))))
      ]))
    ]);
    return el(0x1F43B675, body);
  }));

  const info = el(0x1549A966, Buffer.concat([
    elInt(0x2AD7B1, scale, Math.max(1, vintLen(scale))),
    elStr(0x4D80, 'handWritten'),
    elStr(0x5741, 'handWritten')
  ]));
  const trks = el(0x1654AE6B, tracks);
  const seg = Buffer.concat([info, trks, clusters]);
  const head = el(0x1A45DFA3, Buffer.concat([
    elInt(0x4286, 1, 1), elInt(0x42F7, 1, 1), elInt(0x42F2, 4, 1), elInt(0x42F3, 8, 1),
    elStr(0x4282, 'matroska'), elInt(0x4287, 4, 1), elInt(0x4285, 2, 1)
  ]));
  return Buffer.concat([head, el(0x18538067, seg)]);
}

/* ---------- 三种轨形态各来一份 ---------- */
function p2(n, w) { n = String(n); while (n.length < w) n = '0' + n; return n; }
function tsVtt(ms) {
  const h = Math.floor(ms / 3600000), m = Math.floor(ms % 3600000 / 60000),
    s = Math.floor(ms % 60000 / 1000), f = ms % 1000;
  return p2(h, 2) + ':' + p2(m, 2) + ':' + p2(s, 2) + '.' + p2(f, 3);
}
const CUES = [
  { start: 1000, end: 3400, text: '你好，欢迎收看今天的节目。' },
  { start: 4000, end: 6800, text: '第二行\n换行也要保住。' },
  { start: 7000, end: 10000, text: 'AỞĐÂY CÓ DẤU: 汉字 Test' }
];

/* Matroska 里 WebVTT 轨的 CodecID 有三种写法，现实中都见得到：
   D_WEBVTT/SUBTITLES（现行规范）/ D_WEBVTT/CAPTIONS / S_TEXT/WEBVTT（旧草稿）。
   各来一份 —— 引擎三种都得认。 */
fs.writeFileSync(DIR + '/h_vtt.mkv', buildMkv({
  timestampScale: 1000000,
  tracks: [{ number: 1, codecId: 'D_WEBVTT/SUBTITLES', lang: 'chi', uid: 11 }],
  /* 甲式：载荷里**不带**时间行（时间由容器给）—— 与 ffmpeg / mkvmerge 的写法一致 */
  cues: CUES
}));
fs.writeFileSync(DIR + '/h_vtt_time.mkv', buildMkv({
  timestampScale: 1000000,
  tracks: [{ number: 1, codecId: 'S_TEXT/WEBVTT', lang: 'chi', uid: 14 }],
  /* 乙式：载荷里**带** WebVTT 的时间行（旧草案允许）—— 引擎得先把它剥掉再取正文 */
  cues: CUES.map((c, i) => ({
    start: c.start, end: c.end,
    text: 'cue-' + (i + 1) + '\n' + tsVtt(c.start) + ' --> ' + tsVtt(c.end) + ' line:90%\n' + c.text
  }))
}));
fs.writeFileSync(DIR + '/h_utf8.mkv', buildMkv({
  timestampScale: 1000000,
  tracks: [{ number: 1, codecId: 'S_TEXT/UTF8', lang: 'eng', uid: 12 }],
  cues: CUES
}));
fs.writeFileSync(DIR + '/h_ns.mkv', buildMkv({
  /* TimestampScale = 1 —— 时间戳单位就是纳秒，有些 muxer 真这么写。
     逼引擎拿 TimecodeScale 做换算，不许假设「一个刻度等于一毫秒」 */
  timestampScale: 1,
  tracks: [{ number: 3, codecId: 'S_TEXT/UTF8', lang: 'und', uid: 13 }],
  cues: CUES
}));
console.log('生成完毕');
