/* clean-core.js — 字幕清洗器的独立引擎（v0.9.257 新增）
 *
 * ⚠️ 与主站 srt-core.js、双语页 merge-core.js **三份硬隔离**：
 *    这里的解析与清洗规则是从 srt-core.js **复制后另写**的，不是引用它。
 *    理由（用户定案 2026-10-10）：清洗器的规则口径和翻译引擎不一样，
 *    共用一份会让「改清洗 = 动翻译」；另写一份，怎么改都不影响原有功能。
 *    ⇒ 改这个文件不会碰到主站与双语页的任何行为。
 *
 * 浏览器 <script src> 与 Node (require) 通用。
 */
(function (root, factory) {
  if (typeof module !== 'undefined' && module.exports) module.exports = factory();
  else root.CleanCore = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  // ---------------- 时间轴 ----------------
  const TIME_RE = /^(\d{1,2}):(\d{2}):(\d{2})[,.](\d{1,3})\s*-->\s*(\d{1,2}):(\d{2}):(\d{2})[,.](\d{1,3})/;
  const VTT_TIME_RE = /^(?:(\d{1,3}):)?(\d{1,2}):(\d{2})\.(\d{3})\s*-->\s*(?:(\d{1,3}):)?(\d{1,2}):(\d{2})\.(\d{3})/;
  function toMs(h, m, s, ms) { return (+h * 3600 + +m * 60 + +s) * 1000 + +ms; }
  function parseTime(str) {
    const m = TIME_RE.exec(String(str || '').trim());
    if (!m) return null;
    return [toMs(m[1], m[2], m[3], m[4].padEnd(3, '0')), toMs(m[5], m[6], m[7], m[8].padEnd(3, '0'))];
  }
  function fmtTime(ms) {
    const t = Math.max(0, Math.round(ms));
    const p = function (x, l) { return String(x).padStart(l, '0'); };
    return p(Math.floor(t / 3600000), 2) + ':' + p(Math.floor(t / 60000) % 60, 2) + ':' +
           p(Math.floor(t / 1000) % 60, 2) + ',' + p(t % 1000, 3);
  }
  function fmtTimeVtt(ms) {
    const t = Math.max(0, Math.round(ms));
    const p = function (x, l) { return String(x).padStart(l, '0'); };
    return p(Math.floor(t / 3600000), 2) + ':' + p(Math.floor(t / 60000) % 60, 2) + ':' +
           p(Math.floor(t / 1000) % 60, 2) + '.' + p(t % 1000, 3);
  }
  function renumber(items) { items.forEach(function (it, i) { it.no = i + 1; }); return items; }

  // ---------------- SRT 解析（从 srt-core.js 复制，含 v0.9.81 孤儿块回填） ----------------
  function parseSrt(src) {
    const items = [], issues = [];
    const text = String(src == null ? '' : src).replace(/^\uFEFF/, '').replace(/\r/g, '');
    const blocks = text.split(/\n\s*\n/);
    let prevNo = 0, fixedN = 0, lastOrphan = false;
    blocks.forEach(function (b, bi) {
      const lines = b.split('\n').map(function (x) { return x.trimEnd(); });
      if (!lines.join('').trim()) return;
      const noM = /^\s*(\d+)\s*$/.exec(lines[0] || '');
      const ti = lines.findIndex(function (l) { return l.indexOf('-->') >= 0; });
      if (!noM && ti < 0) {
        const orphanText = lines.filter(function (l) { return l.trim(); }).join('\n');
        const prev = items[items.length - 1];
        if (orphanText && prev && (prev.text === '' || lastOrphan)) {
          prev.text = lastOrphan ? (prev.text + '\n' + orphanText) : orphanText;
          fixedN++; lastOrphan = true;
          return;
        }
        lastOrphan = false;
      } else { lastOrphan = false; }
      if (!noM || ti < 1) { issues.push({ type: 'fmt', at: bi + 1, code: 'blkNoNumTs' }); return; }
      const t = parseTime(lines[ti]);
      if (!t) { issues.push({ type: 'fmt', at: +noM[1], code: 'badTs' }); return; }
      const no = +noM[1];
      if (no <= prevNo) issues.push({ type: 'num', at: no, code: 'numInc' });
      prevNo = no;
      items.push({ no: no, start: t[0], end: t[1], text: lines.slice(ti + 1).join('\n').trim() });
    });
    if (fixedN) issues.push({ type: 'fixed', at: 0, fixed: fixedN });
    if (!items.length) issues.push({ type: 'empty', at: 0, code: 'noBlocks' });
    return { items: items, issues: issues };
  }
  /* v0.9.271：SRT 用 CRLF。SubRip 的规范行尾就是 \r\n，
     Premiere、剪映、ArcTime 这类桌面软件对纯 LF 的字幕很敏感（轻则时间轴错位，
     重则直接判成无法解析）。浏览器端一直没出问题，是因为它们宽容。 */
  function formatSrt(items) {
    return (items || []).map(function (it) {
      const body = String(it.text == null ? '' : it.text).replace(/\r\n/g, '\n').replace(/\n/g, '\r\n');
      return it.no + '\r\n' + fmtTime(it.start) + ' --> ' + fmtTime(it.end) + '\r\n' + body;
    }).join('\r\n\r\n') + '\r\n';
  }

  // ---------------- VTT 解析（复制 + 简化：清洗器不需要保留 cue 样式） ----------------
  function parseVtt(src) {
    const items = [];
    const text = String(src == null ? '' : src).replace(/^\uFEFF/, '').replace(/\r/g, '');
    const blocks = text.split(/\n\s*\n/);
    blocks.forEach(function (b, bi) {
      let lines = b.split('\n').map(function (x) { return x.trimEnd(); });
      if (bi === 0 && /^WEBVTT/i.test(lines[0] || '')) lines = lines.slice(1);
      if (!lines.join('').trim()) return;
      if (/^(NOTE|STYLE|REGION)/.test(lines[0] || '')) return;
      const ti = lines.findIndex(function (l) { return l.indexOf('-->') >= 0; });
      if (ti < 0) return;
      const m = VTT_TIME_RE.exec(lines[ti].trim());
      if (!m) return;
      const body = lines.slice(ti + 1).join('\n')
        .replace(/<[^>]+>/g, function (tag) { return /^<\/?(i|b|u|em)\s*\/?>$/i.test(tag) ? tag : ''; })
        .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
        .replace(/&nbsp;/g, ' ').trim();
      if (!body) return;
      items.push({ no: items.length + 1, start: toMs(m[1] || 0, m[2], m[3], m[4]),
                   end: toMs(m[5] || 0, m[6], m[7], m[8]), text: body });
    });
    return { items: items, issues: items.length ? [] : [{ type: 'empty', at: 0, code: 'noBlocks' }] };
  }
  /* ---------------- ASS / SSA 解析（v0.9.258 新增）
     ⚠️ 与 srt-core.js 的 parseAss 有一处**有意的差别**：那边把 {\an8} 这类特效标签直接剥掉，
        这里**保留**，交给「去 ASS 特效」这条清洗规则去处理 —— 否则那条规则永远无事可做，
        用户关掉它也没有任何区别（清洗器是一个「给你看每条规则干了什么」的工具）。
     只做解析层面必须的事：\N 还原成换行、\h 还原成空格，坐标与样式一概不管（清洗不产出 ASS）。 */
  const ASS_TIME_RE = /^(\d+):(\d{1,2}):(\d{1,2})[.:](\d{1,2})/;
  function parseAssTime(str) {
    const m = ASS_TIME_RE.exec(String(str || '').trim());
    if (!m) return null;
    return (+m[1] * 3600 + +m[2] * 60 + +m[3]) * 1000 + (+m[4].padEnd(2, '0')) * 10;
  }
  function parseAss(src) {
    const items = [];
    const text = String(src == null ? '' : src).replace(/^\uFEFF/, '').replace(/\r/g, '');
    const DEF_FMT = ['layer', 'start', 'end', 'style', 'name', 'marginl', 'marginr', 'marginv', 'effect', 'text'];
    let inEvents = false, fmt = null;
    /* v0.9.271：额外记下行号与 Style。
       ⚠️ 行号是「导出 ASS」能原样写回的前提（Script Info / Styles 整段不动，
          只替换 Dialogue 的 Text 列，被删的条目整行移除）。
       ⚠️ Style 是判断双轨双语谁是谁的辅助信号（原文轨 / 译文轨通常 Style 不同）。 */
    const srcLines = text.split('\n');
    srcLines.forEach(function (ln, li) {
      const s = ln.trim();
      if (/^\[/.test(s)) { inEvents = /^\[events\]/i.test(s); return; }
      if (!inEvents || !s) return;
      if (/^format\s*:/i.test(s)) {
        fmt = s.slice(s.indexOf(':') + 1).split(',').map(function (x) { return x.trim().toLowerCase(); });
        return;
      }
      if (!/^dialogue\s*:/i.test(s)) return;          /* Comment 行等一律跳过 */
      const cols = fmt || DEF_FMT;
      const raw = s.slice(s.indexOf(':') + 1).trim().split(',');
      const head = raw.slice(0, cols.length - 1);
      const textField = raw.slice(cols.length - 1).join(',');   /* Text 列可含逗号 */
      const col = function (name) {
        const idx = cols.indexOf(name);
        return (idx >= 0 && idx < head.length) ? head[idx].trim() : '';
      };
      const st = parseAssTime(col('start')), en = parseAssTime(col('end'));
      if (st == null || en == null) return;
      const body = textField
        .replace(/\\N/gi, '\n').replace(/\\h/gi, ' ')
        .replace(/[ \t]+\n/g, '\n').trim();
      if (!body) return;
      items.push({ no: items.length + 1, start: st, end: en, text: body,
                   style: col('style'), srcIdx: li });
    });
    return { items: items, issues: items.length ? [] : [{ type: 'empty', at: 0, code: 'noBlocks' }] };
  }

  /* =====================================================================
     v0.9.271：双轨双语识别
     ---------------------------------------------------------------------
     ASS 双语最常见的排法不是「一条里面用 \N 换行」，而是**两条 Dialogue**，
     时间轴完全相同、靠 Style 区分（Default / CN 之类）。直接导出 SRT 会变成
     两条时间轴一模一样的独立字幕 —— 播放器要么叠字，要么只认第一条，
     双语直接变单语。所以必须在解析之后、清洗之前把它们并回一条。

     ⚠️ 判据刻意保守，宁可漏也不能错并：
        · 时间轴**完全相同**（不设容差 —— 相邻对白也可能只差几十毫秒）
        · 且两条的语种不同（一条拉丁为主、一条 CJK 为主）
        · 全文件统计：确认对 ≥3 对，或占同时间轴对的半数以上，才判定「这是双语文件」
          （只出现一两对可能是注释轨或误排，不值得为此重构整份文件）
     ===================================================================== */
  function langOf(s) {
    const str = String(s == null ? '' : s);
    const cjk = (str.match(/[\u3400-\u4DBF\u4E00-\u9FFF\u3040-\u30FF\uAC00-\uD7AF]/g) || []).length;
    const lat = (str.match(/[A-Za-z]/g) || []).length;
    if (!cjk && !lat) return '';          /* 纯数字 / 纯标点，判不出语种 */
    if (cjk > lat) return 'cjk';
    if (lat > cjk * 2) return 'lat';
    return '';                            /* 混排且难分主次，不趟这浑水 */
  }
  function detectBilingual(items) {
    const pairs = new Map();              /* firstIdx -> secondIdx */
    const cand = [];
    for (let i = 0; i < items.length - 1; i++) {
      const a = items[i], b = items[i + 1];
      if (a.start === b.start && a.end === b.end) cand.push(i);
    }
    let confirmed = 0;
    cand.forEach(function (i) {
      const la = langOf(items[i].text), lb = langOf(items[i + 1].text);
      if (la && lb && la !== lb) confirmed++;
    });
    /* ⚠️ 一对都不放过会把「注释轨」「误排的两条」也并掉，所以门槛是：
       确认对 ≥3 对，或「≥2 对且同时间轴的对**全部**都是双语」。
       只出现 1 对时一律不并 —— 那更可能是注释而不是双语。 */
    const bi = confirmed >= 3 || (confirmed >= 2 && confirmed === cand.length);
    if (bi) {
      cand.forEach(function (i) {
        if (!pairs.has(i) && !pairs.has(i - 1)) pairs.set(i, i + 1);
      });
    }
    /* 默认顺序：看第一条是译文还是原文。多数双语 ASS 是「原文在上」，
       但也有先中后英的排法 —— 探测出来后照原样呈现，用户可一键翻转。 */
    let firstIsCjk = 0, n = 0;
    pairs.forEach(function (j, i) {
      if (langOf(items[i].text) === 'cjk') firstIsCjk++;
      n++;
    });
    return { bi: bi, pairs: pairs, confirmed: confirmed, total: cand.length,
             tgtFirst: n > 0 && firstIsCjk / n >= 0.5 };
  }
  /* 把双轨合并成单条双语。flip = 把两条的顺序倒过来。
     ⚠️ 按原顺序遍历，不能「先输出合并对、再输出其余」——那样整份字幕的顺序会乱。 */
  function mergeBilingual(items, pairs, flip) {
    if (!pairs || !pairs.size) return items;
    const out = [], used = new Set();
    for (let i = 0; i < items.length; i++) {
      if (used.has(i)) continue;
      const j = pairs.get(i);
      if (j === undefined) { out.push(items[i]); continue; }
      const a = items[i], b = items[j];
      /* ⚠️ flip 只换文本的上下顺序，**不换两条轨道的行号**。
         理由：ASS 里一条 Dialogue 的显示位置由它自己的 MarginV 决定（Style 管不了位置），
         翻转的语义是「让译文出现在上面」—— 那就得把译文写进**位置在上的那条轨道**。
         行号一动，译文又回到下面去了，flip 等于白点。
         字体跟着语言走，靠 setStyle 解决（见 expandForAss / rewriteAss）。 */
      out.push({
        no: 0, start: a.start, end: a.end,
        text: flip ? (b.text + '\n' + a.text) : (a.text + '\n' + b.text),
        bi: true, flip: !!flip, srcIdx: a.srcIdx, srcIdxB: b.srcIdx
      });
      used.add(i); used.add(j);
    }
    return out;
  }

  function formatTxt(items) {
    return (items || []).map(function (it) { return it.text; }).join('\n') + '\n';
  }
  /* v0.9.258：VTT 导出。清洗不产出样式（STYLE 块 / cue settings 一概不写）——
     样式是特效页的活，这边只把干净的文本按 WebVTT 骨架吐出来。 */
  function formatVtt(items) {
    return 'WEBVTT\r\n\r\n' + (items || []).map(function (it) {
      const body = String(it.text == null ? '' : it.text).replace(/\r\n/g, '\n').replace(/\n/g, '\r\n');
      return it.no + '\r\n' + fmtTimeVtt(it.start) + ' --> ' + fmtTimeVtt(it.end) + '\r\n' + body;
    }).join('\r\n\r\n') + '\r\n';
  }

  /* v0.9.271：ASS 输出 —— 把清洗后的文本写回原来的 Dialogue 行，
     其余段落（Script Info / V4+ Styles / Format）一字不动。
     ⚠️ 这样用户拿回的是**自己的文件**：分辨率、字体、样式、位置全在，只有文本被换掉。
        此前 ASS 进来一律降级成 SRT，样式全丢，等于换了个文件给他。
     ⚠️ 换行必须转回 \N（ASS 的换行记号）。直接写 \n 会把一条 Dialogue 拆成两行，
        ASS 解析器会把第二行当成垃圾，整条字幕错位。
     ⚠️ items 里的 srcIdx 指向源文件里那条 Dialogue 的行号；dropIdx 里的行号整行移除
        （被清洗规则删掉的条目、以及被合并掉的第二条轨道）。 */
  function rewriteAss(src, items, dropIdx) {
    const lines = String(src == null ? '' : src).replace(/^\uFEFF/, '').replace(/\r/g, '').split('\n');
    const DEF_FMT = ['layer', 'start', 'end', 'style', 'name', 'marginl', 'marginr', 'marginv', 'effect', 'text'];
    const keep = new Map();
    (items || []).forEach(function (it) { if (it.srcIdx != null) keep.set(it.srcIdx, it); });
    const drop = dropIdx || new Set();
    const out = [];
    let inEvents = false, fmt = null;
    lines.forEach(function (ln, li) {
      const s = ln.trim();
      if (/^\[/.test(s)) { inEvents = /^\[events\]/i.test(s); out.push(ln); return; }
      if (inEvents && /^format\s*:/i.test(s)) {
        fmt = s.slice(s.indexOf(':') + 1).split(',').map(function (x) { return x.trim().toLowerCase(); });
        out.push(ln); return;
      }
      if (!(inEvents && /^dialogue\s*:/i.test(s))) { out.push(ln); return; }
      if (drop.has(li)) return;                    /* 被清洗掉 / 被合并掉的：整行不输出 */
      const it = keep.get(li);
      if (!it) { out.push(ln); return; }           /* 没被任何规则改到：原样保留 */
      const cols = fmt || DEF_FMT;
      const raw = s.slice(s.indexOf(':') + 1).trim().split(',');
      const head = raw.slice(0, cols.length - 1);
      /* ⚠️ 这里**不改 Style 列**。翻转双轨时只换文本、不换样式，是刻意的选择：
         ASS 里一条 Dialogue 显示在上面还是下面，由它 Style 的 MarginV 决定
         （行内 MarginV 为 0 时样式说了算）。把 Style 也换掉，MarginV 跟着走，
         译文又被送回下面去了 —— 用户点了「译文在上」却什么都没变。
         代价是译文可能用英文字体渲染（系统会回退到默认中文字体，不乱码），
         换位置正确来换字体正确，值。 */
      const txt = String(it.text == null ? '' : it.text).replace(/\r/g, '').replace(/\n/g, '\\N');
      out.push(ln.slice(0, ln.indexOf(':') + 1) + ' ' + head.join(',') + ',' + txt);
    });
    return out.join('\r\n') + '\r\n';
  }

  /* =====================================================================
     清洗规则（清洗器独有，与翻译引擎无关，改这里不影响别处）
     ===================================================================== */

  // ① ASS 花括号特效：{\an8}、{\f4} 之类
  function stripAssFx(t) { return String(t).replace(/\{[^}]*\}/g, ''); }

  // ② HTML 标签：<i>文字</i> → 文字
  function stripHtml(t) { return String(t).replace(/<[^>]*>/g, ''); }

  // ③ 控制符 / 零宽 / 软连字符
  const RE_CTRL = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u200B-\u200F\u202A-\u202E\uFEFF\u00AD]/g;
  function stripCtrl(t) { return String(t).replace(RE_CTRL, ''); }

  /* ④ 听障提示（SDH）
     ⚠️ 这里的词表是**清洗器自己**的：srt-core 的 SOUND_HINTS 只有 12 个中文词
        （没有「脚步声」「电话铃」这些最常见的），且它服务的是翻译场景，
        不适合为了清洗去改它 —— 用户明确要求另写一份，别动原有功能。
     口径：括号里**含**提示词才删整个括号；普通括号内容一律保留。 */
  const SOUND_HINTS = [
    '脚步声', '脚步', '电话铃', '电话铃声', '敲门声', '敲门', '门铃', '铃声', '闹铃',
    '音乐', '背景音乐', '钢琴', '吉他', '小提琴', '鼓声', '萨克斯', '哼唱', '唱歌', '歌声',
    '掌声', '笑声', '欢呼', '哭声', '抽泣', '叹气', '喘气', '呼吸', '心跳', '打鼾', '喷嚏', '咳嗽',
    '雷声', '雷雨', '雨声', '风声', '水声', '火焰', '玻璃碎', '枪声', '爆炸', '警报', '警笛',
    '汽车', '引擎', '引擎声', '人群', '嘈杂', '嘈杂声', '鸟叫', '狗叫', '猫叫', '婴儿',
    '广播', '电视', '收音机', '尖叫', '呻吟', '嗡嗡', '静默', '沉默', '环境音', '背景音',
    '音效', '噪音', '杂音', '旁白', '画外音', '解说', '说话声', '提示音', '掌声', '呼喊',
    'music', 'applause', 'laugh', 'laughs', 'laughing', 'laughter', 'cheer', 'cheers', 'cheering',
    'sound effect', 'sfx', 'cough', 'coughs', 'coughing', 'sneeze', 'sigh', 'sighs', 'sighing',
    'groan', 'scream', 'screams', 'screaming', 'gunshot', 'gunshots', 'explosion', 'engine',
    'thunder', 'rain', 'wind', 'footsteps', 'footstep', 'knock', 'knocking', 'door', 'doorbell',
    'phone', 'ringing', 'ring', 'barking', 'birds', 'bird', 'whisper', 'whispering', 'breathing',
    'heartbeat', 'alarm', 'siren', 'static', 'silence', 'chatter', 'indistinct', 'noise',
    'narration', 'narrator', 'voiceover', 'voice-over', 'background', 'singing', 'sings'
  ];
  const RE_SOUND_TAG = new RegExp('\\s*[\\[【\\(（][^\\]】\\)）]{0,40}(?:' + SOUND_HINTS.join('|') +
                                  ')[^\\]】\\)）]{0,40}[\\]】\\)）]\\s*', 'gi');
  function stripSdh(t) {
    return String(t).replace(RE_SOUND_TAG, ' ').replace(/[ \t]{2,}/g, ' ').trim();
  }

  /* ⑤ 说话人标签：行首「GEORGE: 」→ 去掉名字
     ⚠️ 锚定行首，且要求全大写（中文「注意：」「旁白：」不匹配 —— 那是句子不是人名）。 */
  /* ⚠️ 名字部分用**非贪婪** + 冒号收尾：写 `[A-Z]…[A-Z0-9]`（至少两字符）会漏掉
     「A: 你好」这种单字母说话人（影视字幕里很常见）。 */
  const RE_SPEAKER = /^[ \t\-–—]*([A-Z][A-Z0-9 .'\-]{0,28}?)\s*:\s*/;
  function stripSpeaker(t) {
    return String(t).split('\n').map(function (line) {
      const m = RE_SPEAKER.exec(line);
      if (!m) return line;
      const rest = line.slice(m[0].length).trim();
      return rest || '';
    }).join('\n');
  }

  // ⑥ 纯歌词 / 音乐行：整条每条线都是 ♪…♪ 才算（带歌词的对白不算）
  const RE_MUSIC_LINE = /^\s*[♪♫♩♬]{1,3}[\s\S]*[♪♫♩♬]{1,3}\s*$|^\s*[\[\(【（][^\]\)】）]{0,60}(?:music|singing|song|theme\s*song)[^\]\)】）]{0,20}[\]\)】）]\s*$/i;
  function isMusicCue(t) {
    const lines = String(t).split('\n').map(function (x) { return x.trim(); }).filter(Boolean);
    return lines.length > 0 && lines.every(function (l) { return RE_MUSIC_LINE.test(l); });
  }

  /* ⑦ 水印 / 广告
     - RE_WM_STRICT：出现就是水印（网址、邮箱、字幕组署名、"encoded by" 之类）
     - RE_WM_SOFT：只在**短条目**里才算，避免长台词里提到「压制」被误删 */
  const RE_WM_STRICT = /(https?:\/\/|www\.)\S*|[\w.+-]+@[\w-]+\.[\w.]+|字幕组|字幕\s*(?:由|制作|提供)|subtitle[s]?\s*(?:by|group|team)|\b(?:encoded|synced|synchro(?:nized)?|translated|corrected|resync(?:ed)?|ripped|created|uploaded)\s+by\b|opensubtitles|subscene|addic7ed|yify|podnapisi|请关注|微信公众号|QQ\s*群|仅供(?:学习|交流|参考)|(?:24|48)\s*小?时内?删除|下载更多|更多资源/i;
  const RE_WM_SOFT = /(https?:\/\/|www\.)\S*|[\w.+-]+@[\w-]+\.[\w.]+|@[A-Za-z0-9_]{4,}|字幕组|字幕\s*(?:由|制作|提供)|subtitle[s]?\s*(?:by|group|team)|\b(?:encoded|synced|synchro(?:nized)?|translated|corrected|resync(?:ed)?|ripped|created)\s+by\b|opensubtitles|subscene|addic7ed|yify|podnapisi|请关注|微信公众号|QQ\s*群|加群|仅供(?:学习|交流|参考)|(?:24|48)\s*小?时内?删除|下载更多|更多资源|压制|校对|时间轴\s*[:：]|本字幕|advertise/i;
  function isWmCue(t) {
    const s = String(t);
    if (RE_WM_STRICT.test(s)) return true;
    return s.length <= 40 && RE_WM_SOFT.test(s);
  }
  function stripWmLines(t) {
    return String(t).split('\n').filter(function (line) { return !RE_WM_SOFT.test(line); }).join('\n');
  }

  /* ⑧ 标点 / 空白
     ⚠️ 只做确定性清理：不动全角半角、不重排引号、不改任何标点种类。 */
  function tidyPunct(t) {
    return String(t).split('\n').map(function (line) {
      return line.replace(/[ \t]+/g, ' ').replace(/\s+$/g, '').replace(/^\s+/g, '')
                 .replace(/\.{4,}/g, '...')
                 /* 标点前不留空格：半角与中文标点一起管（中文句号前有空格的稿子很常见） */
                 .replace(/\s+([,.!?;:。，！？；：、])/g, '$1');
    }).join('\n').replace(/\n{3,}/g, '\n\n').trim();
  }

  /* ⑨ 全大写修复
     ⚠️ 只处理整条字母全大写的条目；转小写后做句首大写 + 代词 I + 缩写还原。
        专有名词恢复不了 —— 说明里必须讲清楚，别让用户以为全对。
     ⚠️ 缩写白名单刻意保守：us/am/pm/id/ai/st/jr/sr/vs 这类**日常词**一律不进，
        否则 "tell us" 会被改成 "tell US"。 */
  const ABBR = { ok:'OK', tv:'TV', usa:'USA', uk:'UK', un:'UN', fbi:'FBI', cia:'CIA',
    nasa:'NASA', dvd:'DVD', cd:'CD', pc:'PC', mr:'Mr', mrs:'Mrs', dr:'Dr' };
  function fixUpper(t) {
    const s = String(t);
    const letters = s.replace(/[^A-Za-z\u00C0-\u024F]/g, '');
    if (letters.length < 4) return s;
    if (letters !== letters.toUpperCase()) return s;
    let out = s.toLowerCase();
    out = out.replace(/(^|[.!?…]\s+|\n|")(\s*)([a-z])/g, function (m, p1, p2, p3) { return p1 + p2 + p3.toUpperCase(); });
    out = out.replace(/\bi\b/g, 'I').replace(/\bi'([a-z]{1,3})\b/g, function (m, p1) { return "I'" + p1; });
    out = out.replace(/[A-Za-z']+/g, function (w) {
      const k = w.toLowerCase();
      return ABBR[k] !== undefined ? ABBR[k] : w;
    });
    return out;
  }

  /* =====================================================================
     主流程：clean(raw, opt) → { changes, order }
     ⚠️ 纯函数：不碰任何外部状态，改一条规则不影响别的规则的结果顺序。
        changes 里每个原始条目最多一条（多规则命中累加 tags），
        这样「还原这一条」才有明确语义。
     ===================================================================== */
  function clean(raw, o) {
    const changes = [];
    if (!raw || !raw.length) return { changes: changes, order: [] };
    const cur = raw.map(function (it) {
      return { start: it.start, end: it.end, text: String(it.text == null ? '' : it.text), del: false };
    });
    const idx = new Map();
    function chFor(i) {
      let ch = idx.get(i);
      if (!ch) {
        ch = { i: i, before: String(raw[i].text), after: cur[i].text, tags: [], del: false };
        idx.set(i, ch);
        changes.push(ch);
      }
      return ch;
    }

    /* ---- 阶段一：文本级 ---- */
    for (let i = 0; i < cur.length; i++) {
      const t0 = cur[i].text;
      let t = t0;
      if (o.assFx)   t = stripAssFx(t);
      if (o.html)    t = stripHtml(t);
      if (o.ctrl)    t = stripCtrl(t);
      if (o.sdh)     t = stripSdh(t);
      if (o.speaker) t = stripSpeaker(t);
      if (o.wm) {
        /* v0.9.271：改成「先按行剥，剥完还有水印痕迹才整条删」。
           旧逻辑是整条命中就清空 —— 双语条目里只要译文那行带个署名，
           整条连正片对白一起没了（实测 "What time is it?\N本字幕由XX提供" → 空）。
           按行剥之后：对白那行留下，只有署名行被删。 */
        const n = stripWmLines(t);
        if (n !== t) t = n;
        if (t.replace(/\s/g, '') && isWmCue(t)) t = '';
      }
      if (o.punct) t = tidyPunct(t);
      if (o.upper) t = fixUpper(t);
      if (t !== t0) t = t.replace(/\n{3,}/g, '\n\n').trim();
      if (t !== t0) {
        const ch = chFor(i);
        ch.after = t;
        cur[i].text = t;
      }
    }

    /* ⚠️ tags 单独再判一遍：上面把规则串起来跑只算出了最终文本，
       不重跑就只剩一条规则名，用户看不出这条被改了几次。 */
    const steps = [['assFx', stripAssFx], ['html', stripHtml], ['ctrl', stripCtrl],
                   ['sdh', stripSdh], ['speaker', stripSpeaker]];
    changes.forEach(function (ch) {
      let probe = ch.before, tags = [];
      for (let k = 0; k < steps.length; k++) {
        if (!o[steps[k][0]]) continue;
        const n = steps[k][1](probe);
        if (n !== probe) { tags.push(steps[k][0]); probe = n; }
      }
      if (o.wm) {
        const n = stripWmLines(probe);
        if (n !== probe) { tags.push('wm'); probe = n; }
        else if (isWmCue(probe)) tags.push('wm');
      }
      if (o.punct) { const n = tidyPunct(probe); if (n !== probe) { tags.push('punct'); probe = n; } }
      if (o.upper) { const n = fixUpper(probe); if (n !== probe) { tags.push('upper'); probe = n; } }
      ch.tags = tags.length ? tags : ['punct'];
    });

    /* ---- 阶段二：结构级 ---- */
    if (o.music) {
      for (let i = 0; i < cur.length; i++) {
        if (cur[i].del || !isMusicCue(cur[i].text)) continue;
        const ch = chFor(i);
        ch.del = true;
        if (ch.tags.indexOf('music') < 0) ch.tags.push('music');
        cur[i].del = true;
      }
    }
    if (o.empty) {
      for (let i = 0; i < cur.length; i++) {
        if (cur[i].del || cur[i].text.replace(/\s/g, '')) continue;
        const ch = chFor(i);
        ch.del = true;
        /* ⚠️ 已经被水印规则删空的条目不许再挂「空条目」：用户会以为源文件有空行，
           实际是整条被清理掉了（v0.9.257 实测表格里出现「水印 / 空条目」两个标签）。 */
        if (ch.tags.indexOf('empty') < 0 && ch.tags.indexOf('wm') < 0) ch.tags.push('empty');
        cur[i].del = true;
      }
    }
    if (o.dup) {
      const seen = new Map();
      for (let i = 0; i < cur.length; i++) {
        if (cur[i].del) continue;
        const key = cur[i].start + '|' + cur[i].end + '|' + cur[i].text;
        const prev = seen.get(key);
        if (prev !== undefined) {
          /* v0.9.271：双语文件里，时间轴相同的两条是**两条轨道**，不是重复。
             原文与译文恰好都是「2024」「OK」这类纯数字 / 纯字母时，
             旧逻辑会把译文当重复项删掉 —— 实测 2024/2024 第二条直接消失。 */
          if (o.bi && cur[i].start === cur[prev].start && cur[i].end === cur[prev].end) continue;
          const ch = chFor(i);
          ch.del = true;
          if (ch.tags.indexOf('dup') < 0) ch.tags.push('dup');
          cur[i].del = true;
        } else seen.set(key, i);
      }
    }
    if (o.merge) {
      for (let i = 0; i < cur.length - 1; i++) {
        const a = cur[i], b = cur[i + 1];
        if (a.del || b.del) continue;
        if (a.end - a.start > 1200) continue;
        const gap = b.start - a.end;
        if (gap < 0 || gap > 400) continue;
        if (a.text.split('\n').length > 2 || b.text.split('\n').length > 2) continue;
        const joined = a.text.trim() + '\n' + b.text.trim();
        const ca = chFor(i);
        ca.after = joined;
        /* v0.9.271：change 必须带上合并后的时间轴。此前只改了内部副本 a.end，
           change 里没有这个字段，页面 resolve() 读的是 S.raw[i].end（合并前的旧值）
           → 导出那条字幕的尾巴被生生截掉一截。 */
        ca.start = a.start;
        ca.end = Math.max(a.end, b.end);
        if (ca.tags.indexOf('merge') < 0) ca.tags.push('merge');
        const cb = chFor(i + 1);
        cb.del = true;
        if (cb.tags.indexOf('merge') < 0) cb.tags.push('merge');
        a.text = joined; a.end = Math.max(a.end, b.end); b.del = true; i++;
      }
    }
    /* 文本被清空但还没标删除的（例如整条只剩一个水印）→ 归到 empty。
       ⚠️ 水印删空的不许再挂 empty：用户会以为源文件有空行，实际是整条被干掉了。 */
    changes.forEach(function (ch) {
      if (ch.del || !o.empty) return;
      if (!ch.after.replace(/\s/g, '')) {
        ch.del = true;
        if (ch.tags.indexOf('empty') < 0 && ch.tags.indexOf('wm') < 0) ch.tags.push('empty');
      }
    });

    const kept = changes.filter(function (ch) { return ch.del || ch.after !== ch.before; });
    /* 排序只影响导出顺序：不进表格（会淹掉真正的改动） */
    const order = raw.map(function (it, i) { return i; });
    if (o.sort) {
      order.sort(function (a, b) { return raw[a].start - raw[b].start || raw[a].end - raw[b].end; });
    }
    return { changes: kept, order: order };
  }

  /* ---------------- 编码嗅探：UTF-8 优先，乱码回退 GBK / Big5 ---------------- */
  function decodeBuf(buf) {
    const u8 = new Uint8Array(buf);
    if (u8[0] === 0xEF && u8[1] === 0xBB && u8[2] === 0xBF) {
      return { text: new TextDecoder('utf-8').decode(u8.subarray(3)), enc: 'utf-8 (BOM)' };
    }
    const s = new TextDecoder('utf-8', { fatal: false }).decode(u8);
    if ((s.match(/\uFFFD/g) || []).length > 1) {
      const list = ['gbk', 'big5'];
      for (let i = 0; i < list.length; i++) {
        try {
          const t = new TextDecoder(list[i]).decode(u8);
          if (!/\uFFFD/.test(t)) return { text: t, enc: list[i].toUpperCase() };
        } catch (e) { /* 该浏览器不支持这种旧编码，换下一个 */ }
      }
      return { text: s, enc: 'utf-8?' };
    }
    return { text: s, enc: 'utf-8' };
  }

  return {
    parseTime, fmtTime, fmtTimeVtt, renumber,
    parseSrt, formatSrt, parseVtt, formatVtt, parseAss, formatTxt, rewriteAss,
    stripAssFx, stripHtml, stripCtrl, stripSdh, stripSpeaker,
    isMusicCue, isWmCue, stripWmLines, tidyPunct, fixUpper,
    clean, decodeBuf,
    langOf, detectBilingual, mergeBilingual,
    SOUND_HINTS
  };
});
