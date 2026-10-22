/* 临时验收脚本（非交付件）：拿 ffmpeg 生成/校验过的真实素材跑 videosub-core */
const fs = require('fs');
const path = require('path');
const V = require('./videosub-core.js');
const DIR = '/Users/jp/WorkBuddy/2026-09-04-00-29-54/_vsfx';

function fsReader(p) {
  const st = fs.statSync(p);
  const fd = fs.openSync(p, 'r');
  return {
    size: st.size,
    read(off, len) {
      const n = Math.max(0, Math.min(len, st.size - off));
      const b = Buffer.alloc(n);
      if (n) fs.readSync(fd, b, 0, n, off);
      return new Uint8Array(b);
    }
  };
}
let pass = 0, fail = 0;
function ck(name, fn) {
  return Promise.resolve().then(fn).then(() => { pass++; console.log('  ✓ ' + name); })
    .catch(e => { fail++; console.log('  ✗ ' + name + '\n      ' + (e && e.message)); });
}
const eq = (a, b, m) => { if (a !== b) throw new Error((m || '') + ' 期望 ' + JSON.stringify(b) + '，实际 ' + JSON.stringify(a)); };

(async function main() {
  const files = ['t_srt_srt.mkv', 'big_vid.mkv', 't_ass_ass.mkv', 't_multi.mkv', 'h_utf8.mkv', 'h_vtt.mkv', 'h_vtt_time.mkv', 'h_ns.mkv', 't_mov_srt.mp4'];

  for (const f of files) {
    const p = path.join(DIR, f);
    if (!fs.existsSync(p)) { console.log('  (跳过 ' + f + '：不存在)'); continue; }
    const rd = fsReader(p);
    let meta;
    await ck(f + '：认容器 + 列出字幕轨', async () => {
      meta = await V.listTracks(rd, { name: f });
      console.log('      → ' + meta.container + ' 轨数=' + meta.tracks.length +
        ' ' + meta.tracks.map(t => '[' + t.format + ' ' + (t.lang || '-') + ']').join(' '));
      if (!meta.tracks.length) throw new Error('一条字幕轨都没认出来');
    });
    if (!meta) continue;
    for (let i = 0; i < meta.tracks.length; i++) {
      const tr = meta.tracks[i];
      await ck(f + ' 轨#' + i + '(' + tr.format + ')：抽出 cue', async () => {
        const r = await V.readCues(rd, tr, meta, {});
        console.log('      → ' + r.cues.length + ' 条：' +
          r.cues.slice(0, 3).map(c => c.start + '-' + c.end + ' ' + JSON.stringify(c.text)).join(' | '));
        if (!r.cues.length) throw new Error('一条都没抽出来');
        r.cues.forEach(c => {
          if (!(c.end > c.start)) throw new Error('时间轴倒挂/等长：' + JSON.stringify(c));
          if (!String(c.text).trim()) throw new Error('出现空正文：' + JSON.stringify(c));
        });
        /* 抽出来的第一条一定是素材里的第一句（时间 1000ms、汉字那句） */
        eq(r.cues[0].start, 1000, '首条起点');
        if (tr.format !== 'mov_text') {
          eq(r.cues[0].end, 3400, '首条终点（BlockDuration=2400）');
        }
      });
    }
  }

  console.log('\n— 不该读的字节就不读 —');
  await ck('1.6MB 带视频轨的 MKV：单次读取不超 1MB、总读取不超 3 倍（内存有上界）', async () => {
    /* big_vid.mkv：ffmpeg 用 ffv1 无损压了一段 1280x720 测试图 + 内封 SRT 字幕，
       字幕块和视频块在同一个 Cluster 里交错 —— 这才是真实电影的样子。 */
    const base = fsReader(path.join(DIR, 'big_vid.mkv'));
    if (base.size < (1 << 20)) throw new Error('素材本身就不够 1MB，测不出上界');
    let maxLen = 0, calls = 0, total = 0;
    const spy = {
      size: base.size,
      read: (o, l) => { calls++; total += l; if (l > maxLen) maxLen = l; return base.read(o, l); }
    };
    const meta = await V.listTracks(spy, {});
    const r = await V.readCues(spy, meta.tracks[0], meta, {});
    console.log('      → ' + calls + ' 次读取，单次最大 ' + maxLen + '，累计 ' + total + '（文件 ' + base.size + '）');
    if (r.cues.length !== 4) throw new Error('条数不对：' + r.cues.length);
    /* ⚠️ 守的是「内存」不是「IO」：不扫过视频块就找不到下一条字幕在哪，
       总读取量必然跟文件大小同量级；能压住的只有两件事 ——
       ① 单次不超过 1MB（4GB 电影也不会一次性撑爆内存）
       ② 不在窗口里来回抖动重复读同一段（以前向前走就裁掉旧窗口，实测多读三四倍） */
    if (maxLen > (1 << 20)) throw new Error('单次读取 ' + maxLen + ' 字节，超过 1MB 窗口');
    if (total > base.size * 3) throw new Error('累计读了 ' + total + '，超过文件 3 倍 —— 窗口在抖动');
  });

  console.log('\n— ASS 原样式头带得回来 —');
  await ck('MKV 里 ASS 轨的 CodecPrivate 直接当导出头用', async () => {
    const rd = fsReader(path.join(DIR, 't_ass_ass.mkv'));
    const meta = await V.listTracks(rd, {});
    const tr = meta.tracks[0];
    if (!tr.private) throw new Error('没取到 CodecPrivate');
    const priv = Buffer.from(tr.private).toString('utf8');
    const s = V.render([{ start: 1000, end: 3400, text: '你好。' }], 'ass', { assHeader: priv });
    if (s.indexOf('PlayResX: 1920') < 0) throw new Error('原轨的 PlayResX 没带回来');
    /* 原头原样用：顶层那几行必须跟 CodecPrivate 一字不差（只搬不改） */
    const privLines = priv.split('\n').filter(x => x.trim()).slice(0, 4);
    privLines.forEach(function (ln) { if (s.indexOf(ln) < 0) throw new Error('原头这行没保住：' + ln); });
    if (s.indexOf('由 AI-SRTSub') >= 0) throw new Error('不该掺自家默认头的注释行');
  });

  console.log('\n— 渲染 —');
  await ck('SRT 时间码格式', () => {
    const s = V.render([{ start: 1000, end: 3400, text: '你好。' }], 'srt');
    eq(s.split('\n')[1], '00:00:01,000 --> 00:00:03,400');
    eq(s.split('\n')[0], '1');
  });
  await ck('VTT 头 + 点号毫秒', () => {
    const s = V.render([{ start: 1000, end: 3400, text: '你好。' }], 'vtt');
    eq(s.split('\n')[0], 'WEBVTT');
    eq(s.indexOf('00:00:01.000 --> 00:00:03.400') >= 0, true);
  });
  await ck('ASS 默认头齐全 + \\N 换行', () => {
    const s = V.render([{ start: 1000, end: 3400, text: '第二行\n换行。' }], 'ass');
    eq(s.indexOf('[Script Info]') >= 0, true);
    eq(s.indexOf('[V4+ Styles]') >= 0, true);
    eq(s.indexOf('[Events]') >= 0, true);
    eq(s.indexOf('Dialogue: 0,0:00:01.00,0:00:03.40,Default,,0,0,0,,第二行\\N换行。') >= 0, true);
  });
  await ck('ASS 优先用原轨自带的样式头', () => {
    const hdr = '[Script Info]\nPlayResX: 3840\n\n[V4+ Styles]\nFormat: Name\n\n[Events]\nFormat: Layer';
    const s = V.render([{ start: 0, end: 1000, text: 'x' }], 'ass', { assHeader: hdr });
    eq(s.indexOf('PlayResX: 3840') >= 0, true);
    eq(s.indexOf('Noto Sans') < 0, true, '不该再掺自家默认样式');
  });
  await ck('TXT 纯台词', () => {
    eq(V.render([{ start: 0, end: 1, text: 'a\nb' }], 'txt'), 'a\nb\n');
  });

  console.log('\n— 载荷解析 —');
  await ck('ASS 载荷剥掉 8 个元数据列（正文里的逗号不动、\\N 变真换行）', () => {
    const got = V._payloadToText(new Uint8Array(Buffer.from('3,0,Default,,0,0,0,,你好，世界。这是测试', 'utf8')), { format: 'ass' });
    eq(got, '你好，世界。这是测试');
    const br = V._payloadToText(new Uint8Array(Buffer.from('3,0,Default,,0,0,0,,第二行\\N换行', 'utf8')), { format: 'ass' });
    eq(br, '第二行\n换行');
    const short = V._payloadToText(new Uint8Array(Buffer.from('只有一列,正文', 'utf8')), { format: 'ass' });
    eq(short, '只有一列,正文', '列数不够时整行照留');
  });
  await ck('WebVTT 载荷带时间行时剥掉（甲式不带则整段保留）', () => {
    const a = V._payloadToText(new Uint8Array(Buffer.from('cue-1\n00:00:01.000 --> 00:00:03.400 line:90%\n正文', 'utf8')), { format: 'vtt' });
    eq(a, '正文');
    const b = V._payloadToText(new Uint8Array(Buffer.from('直接就是正文\n第二行', 'utf8')), { format: 'vtt' });
    eq(b, '直接就是正文\n第二行');
  });
  await ck('mov_text：uint16 长度前缀与裸文本两种', () => {
    const withLen = new Uint8Array(Buffer.concat([Buffer.from([0x00, 0x09]), Buffer.from('abcdefghi', 'utf8')]));
    eq(V._decodeMovText(withLen, withLen.length), 'abcdefghi');
    const bare = new Uint8Array(Buffer.from('裸文本', 'utf8'));
    eq(V._decodeMovText(bare, bare.length), '裸文本');
  });

  console.log('\n— 边界 —');
  await ck('认不出容器要报错（不是静默空结果）', async () => {
    const rd = { size: 64, read: () => new Uint8Array(64) };
    let hit = null;
    try { await V.listTracks(rd, {}); } catch (e) { hit = e.code; }
    eq(hit, 'unknown');
  });
  await ck('位图字幕轨明说抽不了', async () => {
    let hit = null;
    try { await V.readCues({ size: 0, read: () => null }, { bitmap: true }, { container: 'mkv' }, {}); } catch (e) { hit = e.code; }
    eq(hit, 'bitmap');
  });

  console.log('\n通过 ' + pass + ' / 失败 ' + fail);
  process.exit(fail ? 1 : 0);
})();
