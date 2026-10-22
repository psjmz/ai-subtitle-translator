/* 探查脚本（非交付件）：把 fixture 的 EBML/MP4 结构 dump 出来，用来确定 videosub 引擎怎么写 */
const fs = require('fs');
const DIR = '/Users/jp/WorkBuddy/2026-09-04-00-29-54/_vsfx';

function vintInfo(b) {
  // EBML VINT：前导 0 的个数决定长度
  const x = b[0];
  let len = 0, mask = 0x80;
  for (let i = 0; i < 8; i++) { if (x & mask) { len = i + 1; break; } mask >>= 1; }
  if (!len) return null;
  let v = x & (0xff >> len);
  for (let i = 1; i < len; i++) v = (v << 8) | b[i];
  return { len, value: v };
}
function readVint(buf, pos) {
  const vi = vintInfo(buf.subarray(pos, pos + 8));
  if (!vi) return null;
  return { ...vi, bytes: buf.slice(pos, pos + vi.len) };
}
function readSize(buf, pos) {
  const b0 = buf[pos];
  let len = 0, mask = 0x80;
  for (let i = 0; i < 8; i++) { if (b0 & mask) { len = i + 1; break; } mask >>= 1; }
  if (!len) return null;
  let v = b0 & (0xff >> len);
  for (let i = 1; i < len; i++) v = v * 256 + buf[pos + i];
  return { len, value: v, allOnes: v === (Math.pow(2, 7 * len) - 1) };
}

const NAMES = {
  0x1A45DFA3: 'EBML', 0x18538067: 'Segment', 0x114D9B74: 'SeekHead', 0x4DBB: 'Seek',
  0x53AB: 'SeekID', 0x53AC: 'SeekPosition', 0x1549A966: 'Info', 0x2AD7B1: 'TimestampScale',
  0x4D80: 'MuxingApp', 0x5741: 'WritingApp', 0x4489: 'Duration',
  0x1654AE6B: 'Tracks', 0xAE: 'TrackEntry', 0xD7: 'TrackNumber', 0x73C5: 'TrackUID',
  0x83: 'TrackType', 0x86: 'CodecID', 0x63A2: 'CodecPrivate', 0x22B59C: 'Language',
  0x22B59D: 'LanguageBCP47', 0x536E: 'Name', 0x88: 'FlagDefault', 0x55AA: 'FlagForced',
  0x9C: 'FlagLacing', 0x23E383: 'DefaultDuration', 0x537F: 'TrackOffset',
  0x1F43B675: 'Cluster', 0xE7: 'Timestamp', 0xA3: 'SimpleBlock', 0xA0: 'BlockGroup',
  0xA1: 'Block', 0x9B: 'BlockDuration', 0xFA: 'ReferenceBlock',
  0x1C53BB6B: 'Cues', 0xBB: 'CuePoint', 0xB3: 'CueTime', 0xB7: 'CueTrackPositions',
  0xF7: 'CueTrack', 0xF1: 'CueClusterPosition'
};
const HEX = v => '0x' + v.toString(16).toUpperCase();

function dumpMkv(name, path, maxDepth) {
  const buf = fs.readFileSync(path);
  console.log('\n===== ' + name + ' (' + buf.length + ' bytes) =====');
  console.log('前 16 字节:', Array.from(buf.slice(0, 16)).map(b => b.toString(16).padStart(2, '0')).join(' '));
  walk(buf, 0, buf.length, 0, maxDepth);
}
function walk(buf, start, end, depth, maxDepth) {
  let pos = start;
  while (pos < end) {
    const idInfo = readVint(buf, pos);
    if (!idInfo) break;
    pos += idInfo.len;
    const sz = readSize(buf, pos);
    if (!sz) break;
    pos += sz.len;
    // ⚠️ EBML 的元素 ID 不清除 VINT 标记位 —— 0x1A45DFA3 就是四个字节原样读出来的值
    let rid = 0;
    for (let i = 0; i < idInfo.len; i++) rid = rid * 256 + idInfo.bytes[i];
    const nm = NAMES[rid] || '';
    const pad = '  '.repeat(depth);
    const children = (idInfo.len && [0x18538067, 0x1549A966, 0x1654AE6B, 0xAE, 0x1F43B675, 0xA0, 0x114D9B74, 0x4DBB, 0x1C53BB6B, 0xBB, 0xB7].includes(rid));
    console.log(pad + (nm || HEX(rid)) + '  id=' + HEX(rid) + ' size=' + sz.value + (children ? '' : '  @' + pos));
    if (children && depth < maxDepth) {
      walk(buf, pos, pos + sz.value, depth + 1, maxDepth);
    } else if (!children) {
      // 叶子: 打印一点内容
      if (rid === 0x86 || rid === 0x22B59C || rid === 0x536E || rid === 0x4D80 || rid === 0x5741) {
        console.log(pad + '   → "' + buf.slice(pos, pos + Math.min(sz.value, 120)).toString('utf8').replace(/\n/g, '|') + '"');
      } else if (rid === 0x83 || rid === 0xD7 || rid === 0x88 || rid === 0x9C || rid === 0x23E383 || rid === 0x2AD7B1 || rid === 0xE7 || rid === 0x73C5) {
        let v = 0; for (let i = 0; i < sz.value; i++) v = v * 256 + buf[pos + i];
        console.log(pad + '   → ' + v);
      } else if (rid === 0x63A2) {
        const s = buf.slice(pos, pos + Math.min(sz.value, 400)).toString('utf8');
        console.log(pad + '   → private(' + sz.value + '): ' + JSON.stringify(s.slice(0, 300)));
      } else if (rid === 0xA3 || rid === 0xA1) {
        console.log(pad + '   → payload(' + sz.value + '): ' + JSON.stringify(dumpBlock(buf.slice(pos, pos + Math.min(sz.value, 200)))));
      } else if (rid === 0x9B) {
        let v = 0; for (let i = 0; i < sz.value; i++) v = v * 256 + buf[pos + i];
        console.log(pad + '   → ' + v + ' (scaled units)');
      }
    }
    if (sz.allOnes) { console.log(pad + '  (unknown-size element)'); break; }
    pos += sz.value;
  }
}
function dumpBlock(b) {
  const tn = readVint(b, 0);
  if (!tn) return { err: 'no track vint' };
  const rt = ((b[tn.len] << 8) | b[tn.len + 1]) << 16 >> 16;  // 有符号 16 位
  const flags = b[tn.len + 2];
  return { track: tn.value, relTs: rt, flags, text: b.slice(tn.len + 3).toString('utf8').slice(0, 160) };
}

dumpMkv('t_srt_srt.mkv', DIR + '/t_srt_srt.mkv', 4);
dumpMkv('t_ass_ass.mkv', DIR + '/t_ass_ass.mkv', 3);
dumpMkv('t_vtt_vtt.mkv', DIR + '/t_vtt_vtt.mkv', 3);
dumpMkv('t_multi.mkv', DIR + '/t_multi.mkv', 2);
