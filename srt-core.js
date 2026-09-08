/* srt-core.js — SRT 字幕规则引擎
 * 浏览器 <script src> 与 Node (require) 通用。
 *
 * 编码的翻译规范（用户定稿）：
 *  - 字数口径：显示宽度折算。汉字/全角标点 = 1 字；半角非空白字符每 2 个 = 1 字。
 *  - 折行规则：整条文本等效宽度 > 20 时（默认阈值，可调），在同一时间轴内折成多行，每行等效宽度 <= 20。
 *    断点优先级：句末(。！？…) > 逗点类(，、；：) > 连接词前 > 介词/助词前 > 词边界硬切。
 *  - 水词识别：um/yeah/well 等纯填充独立条目、[音乐] 类纯提示词条目，供上层删除或合并。
 */
(function (root, factory) {
  if (typeof module !== 'undefined' && module.exports) module.exports = factory();
  else root.SrtCore = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  // ---------------- 显示宽度 ----------------
  function isFull(ch) {
    const c = ch.codePointAt(0);
    return (c >= 0x2e80 && c <= 0x9fff) ||   // CJK 汉字 / 部首 / 假名 / 谚文
           (c >= 0x3000 && c <= 0x303f) ||   // CJK 标点（含全角空格）
           (c >= 0xff00 && c <= 0xffef) ||   // 全角字符
           c === 0x2018 || c === 0x2019 || c === 0x201c || c === 0x201d ||
           c === 0x2026 || c === 0x2014 || c === 0x00b7;
  }
  function charW(ch) { return isFull(ch) ? 1 : 0.5; }
  function textWidth(s) {
    if (!s) return 0;
    let w = 0;
    for (const ch of s) {
      if (ch === ' ' || ch === '\t' || ch === '\n' || ch === '\r') continue;
      w += charW(ch);
    }
    return w;
  }

  // ---------------- 折行 ----------------
  const SENT_END = '。！？…!?';         // 5
  const CLAUSE   = '，、；;：:';         // 4
  const CONJ_WORDS = ['换句话说', '也就是说', '然后', '但是', '不过', '所以', '因为', '而且',
    '还有', '其实', '如果', '并且', '以及', '因此', '另外', '此外', '甚至', '虽然', '尽管',
    '由于', '于是', '接着', '毕竟', '总之'];
  const CONJ_SINGLE = ['但', '而', '并', '却', '就', '才', '也', '又', '更', '再', '还', '只', '都', '则'];
  const PREP_WORDS = ['关于', '对于', '随着', '作为', '为了'];
  const PREP_SINGLE = ['在', '从', '把', '被', '让', '对', '跟', '与', '向', '为', '由', '将', '当'];
  const CLOSE_SET = '”’』】）》"\'';
  const CLOSE_FIRST = '”’』】）》\'，。！？、；：…'; // 行首禁用的收尾符号

  function isAlnum(c) { return !!c && /[A-Za-z0-9]/.test(c); }

  // ---------------- 数字+单位原子保护 ----------------
  // 「30%」「$50」「1,000」「12.5」「100万」等数字与其单位/符号是不可拆散的整体，
  // 折行（findCut）与按时长切分（splitByDuration）都不允许把切点落在其内部。
  const CURR_PREFIX = '$¥€£';
  const UNIT_CJK = '万个亿千百美元元年月日时分秒人次倍钟';

  // 返回 pos（字符数组）中所有原子区间 [start, end)（end 不含；区间内部禁止切分）
  function atomicRanges(pos) {
    const n = pos.length, ranges = [];
    const isD = (c) => c >= '0' && c <= '9';
    const isLat = (c) => /[A-Za-z]/.test(c);
    let i = 0;
    while (i < n) {
      let j = i;
      if (CURR_PREFIX.indexOf(pos[j]) >= 0) j++;           // 可选货币前缀
      if (j < n && isD(pos[j])) {
        const numStart = j;
        while (j < n && isD(pos[j])) j++;                  // 整数部分
        // 小数 / 千分位（可重复，如 1,234.56）
        while (j + 1 < n && (pos[j] === '.' || pos[j] === ',') && isD(pos[j + 1])) {
          j += 2;
          while (j < n && isD(pos[j])) j++;
        }
        if (j < n && (pos[j] === '%' || pos[j] === '°')) j++;   // 百分比 / 度数
        else if (j < n && UNIT_CJK.indexOf(pos[j]) >= 0) {     // 中文量词单位（连续吞并：万/美元/元年…）
          while (j < n && UNIT_CJK.indexOf(pos[j]) >= 0) j++;
        } else {
          // 拉丁单位 1~3 字母（kg / mm / mph / rd…）；若后面还有字母则视为普通单词，不吞
          let k = j, cnt = 0;
          while (k < n && cnt < 4 && isLat(pos[k])) { k++; cnt++; }
          if (cnt >= 1 && cnt <= 3 && (k >= n || !isLat(pos[k]))) j = k;
        }
        if (j > numStart) ranges.push([i, j]);
        i = j;
      } else i++;
    }
    return ranges;
  }

  // ---------------- 词边界保护（Intl.Segmenter 分词） ----------------
  // 中文/日文等无空格语言：折行硬切可能把一个词劈到两行（如「产|品」「价|格」「应|对」）。
  // Intl.Segmenter 是浏览器与现代 Node 内置的词典级分词器（零依赖），
  // 用它标记词边界；不可用时自动降级为旧行为（仅按标点/宽度切）。
  const SEG_CACHE = {};
  function getSegmenter(locale) {
    if (typeof Intl === 'undefined' || typeof Intl.Segmenter !== 'function') return null;
    const key = String(locale || 'zh');
    if (!(key in SEG_CACHE)) {
      try { SEG_CACHE[key] = new Intl.Segmenter(key, { granularity: 'word' }); }
      catch (e) {
        try { SEG_CACHE[key] = new Intl.Segmenter('zh', { granularity: 'word' }); }
        catch (e2) { SEG_CACHE[key] = null; }
      }
    }
    return SEG_CACHE[key];
  }
  // 返回 pos（字符数组）中所有「词边界下标」的集合：在边界下标处切分不会劈词。
  // 分词器不可用或出错时返回 null（调用方降级为旧行为）。
  function wordBounds(pos, locale) {
    const seg = getSegmenter(locale);
    if (!seg || !pos.length) return null;
    try {
      const bounds = new Set();
      let idx = 0;
      for (const s of seg.segment(pos.join(''))) {
        bounds.add(idx);
        idx += Array.from(s.segment).length;
      }
      bounds.add(idx);
      return bounds;
    } catch (e) { return null; }
  }

  // 判断在 pos[cut-1] 之后断行的自然度（>=2 视为自然断点）
  function breakPrio(pos, cut) {
    const n = pos.length;
    if (cut <= 0 || cut >= n) return 0;
    const ch = pos[cut - 1];
    // 行尾是闭引号/闭括号：继承其前一字符的等级
    if (CLOSE_SET.includes(ch)) {
      const prev = cut - 2 >= 0 ? pos[cut - 2] : '';
      if (SENT_END.includes(prev)) return 5;
      if (CLAUSE.includes(prev)) return 4;
      return 3;
    }
    if (SENT_END.includes(ch)) return 5;
    if (ch === ' ' || ch === '\u3000') return 4;  // 空格/全角空格处断行（多语言词边界）
    if (CLAUSE.includes(ch)) return 4;
    // 下一字符以连接词开头 → 在连接词前断开
    const rest = pos.slice(cut).join('');
    for (const w of CONJ_WORDS) if (rest.startsWith(w)) return 3;
    if (rest && CONJ_SINGLE.includes(rest[0])) return 3;
    // 下一字符为介词/助词 → 低优先
    if (rest) {
      if (PREP_SINGLE.includes(rest[0])) return 2;
      for (const w of PREP_WORDS) if (rest.startsWith(w)) return 2;
      // 数字/货币/单位开头（原子前断点，如 "高达|30%的关税"）→ 低优先自然断点
      if (/[0-9$¥€£%°]/.test(rest[0])) return 2;
    }
    return 0;
  }

  // 找 segment（单行文本）的第一个切点（返回切点下标，slice(0,cut) 为第一行）
  // locale：目标语言（BCP47，如 zh-CN / ja），用于词典分词保护词边界；缺省按 zh。
  function findCut(s, maxW, locale) {
    const pos = Array.from(s);
    const n = pos.length;
    // 原子保护：切点不得落在数字+单位内部（如 30%、$50、1,000）
    const atom = atomicRanges(pos);
    const inAtom = (i) => { for (let k = 0; k < atom.length; k++) if (i > atom[k][0] && i < atom[k][1]) return true; return false; };
    // 词边界（无空格语言的劈词保护）；分词器不可用时为 null → 降级
    const bounds = wordBounds(pos, locale);
    // 1) 硬切候选：最长前缀（宽度不超过 maxW）
    let acc = 0, c = n;
    for (let i = 0; i < n; i++) {
      const w = charW(pos[i]);
      if (acc + w > maxW + 1e-9) { c = i; break; }
      acc += w;
    }
    if (c >= n) return n;
    // 2) 避免劈开英文/数字词
    if (c > 0 && c < n && isAlnum(pos[c - 1]) && isAlnum(pos[c])) {
      let j = c - 1;
      while (j > 0 && isAlnum(pos[j - 1])) j--;
      c = Math.max(1, j);
    }
    // 3) 在硬切位置向前最多 10 字范围内，找最近的自然断点（保证第一行尽量满行）。
    //    伪断点（介词/连接词前断开）必须落在词边界上才有效 —— 否则「应对」的「对」
    //    会被误判为介词，把动词劈成两半。
    const effPrio = (cut) => {
      const p = breakPrio(pos, cut);
      if (p >= 4) return p;                        // 标点/空格：天然边界，不受影响
      if (bounds && !bounds.has(cut)) return 0;    // 伪断点落在词内部 → 无效
      return p;
    };
    // v0.9.24 句末软偏好：窗口内若存在句末标点切点（prio 5，含阿语 ؟/天城文 । 经 breakPrio 的
    // SENT_END 口径），优先折在句末——短句聚首行（各自闭合、结束感强）、让步从句整段下行，
    // 避免行尾挂连接词残段（「…但我不是。不过|如果我要排队」→「…但我不是。|不过如果我要排队」）。
    // 守卫：句末切点离硬切位置 ≤10 字（原窗口）且首行宽 ≥ maxW/2（不为贴句末牺牲可读性），
    // 剩余 ≤ maxW（不折出第 3 行）；无句末切点或守卫不过 → 维持原「最近合法切点」行为。
    const lo = Math.max(1, c - 10);
    let near = -1, sentCut = -1;
    for (let cut = c; cut >= lo; cut--) {
      if (inAtom(cut)) continue;
      const p = effPrio(cut);
      if (textWidth(s.slice(cut)) > maxW + 1e-9) continue; // 跳过会产生额外行的切点
      if (p >= 2 && near < 0) near = cut;     // 最近合法切点（原行为）
      // 句末切点后跟空格（拉丁 "Stop!| Don't"）→ 不取，交给空格切点（near 已覆盖）
      if (p === 5 && sentCut < 0 && pos[cut] !== ' ' && pos[cut] !== '\u3000') sentCut = cut;
      if (near >= 0 && sentCut >= 0) break;
    }
    if (sentCut >= 0 && textWidth(pos.slice(0, sentCut).join('')) >= maxW / 2) return sentCut;
    if (near >= 0) return near;
    // 4) 兜底：若附近没有，在 [1, c]（不超硬切宽度）范围内找最高优先级断点（同级取更靠后的，行尽量满）。
    //    约束：剩余文本 ≤ maxW，否则会折出孤儿行+第 3 行（24 宽文本断在「，」处只剩 2 字第一行+ 22 字剩余）。
    let best = -1, bestP = 0;
    for (let cut = c; cut >= 1; cut--) {
      if (inAtom(cut)) continue;
      const p = effPrio(cut);
      if (textWidth(s.slice(cut)) > maxW + 1e-9) continue; // 跳过会产生额外行的切点
      if (p > bestP) { bestP = p; best = cut; if (p >= 4) break; }
    }
    if (best >= 1 && bestP >= 2) return best;
    // 5) 最后手段：纯硬切（不劈原子；行首不得是闭符号）
    if (inAtom(c)) {
      const r = atom.filter((x) => c > x[0] && c < x[1])[0];
      if (r) c = (r[0] >= 1) ? r[0] : Math.min(r[1], n - 1); // 回退到原子开头；原子在行首则推到原子末尾
    }
    if (c < n && CLOSE_FIRST.includes(pos[c])) {
      // 切点落在闭符号前：把切点前移，让闭符号连同其前一字符一起去下一行
      // （既不超宽、下一行行首也不是闭符号；连续闭符号一并处理）
      let k = c;
      while (k > 1 && CLOSE_FIRST.includes(pos[k])) k--;
      c = Math.max(1, k);
    }
    // 5b) 词保护：切点若落在词内部（含上面闭符号回退造成的情况）→ 整词下移到下一行。
    // 该词一行内放得下才移动；词本身超过一行宽则保持硬切（无解）。
    if (bounds && c > 1 && !bounds.has(c) && !inAtom(c)) {
      let ws = c - 1;
      while (ws > 1 && !bounds.has(ws)) ws--;
      let we = c;
      while (we < n && !bounds.has(we)) we++;
      const wordW = pos.slice(ws, we).reduce((a, ch) => a + charW(ch), 0);
      if (ws >= 1 && bounds.has(ws) && !inAtom(ws) && wordW <= maxW) c = ws;
    }
    // 5c) 行首助词回避：下一行以助词（的了着过…）开头时，切点再往前挪一个词，
    //     让助词跟它的中心词待在一起（如「…应对 / 的冲击」→「…应对 / 关税的冲击」的兜底路径）。
    const ASP_FIRST = '的了着过地得吗呢吧啊呀嘛么';
    if (bounds && c > 1 && ASP_FIRST.includes(pos[c]) && bounds.has(c) && !inAtom(c)) {
      let ws2 = c - 1;
      while (ws2 > 1 && !bounds.has(ws2)) ws2--;
      if (ws2 >= 1 && bounds.has(ws2) && !inAtom(ws2)) c = ws2;
    }
    // 5d) 后移补偿（v0.9.20）：若切点导致剩余超宽（词保护把长词/长合成词整体下移后常见，
    //     如 "de waardering op een koers-|winstverhouding van 170 …" 剩 22.5 > 20 折出第 3 行，
    //     而在合成词后的空格处切可 2 行装下），尝试把切点后移到下一个空格词边界之后，
    //     让第一行更长、剩余能装进下一行。仅当第一行仍 ≤ maxW 时采用；第一行超宽即停。
    //     中日等无空格语言无空格边界，循环自然终止，行为不变。
    if (c > 0 && c < n && textWidth(s.slice(c)) > maxW + 1e-9) {
      let nc = c;
      while (nc < n) {
        while (nc < n && pos[nc] !== ' ' && pos[nc] !== '\u3000') nc++;
        if (nc >= n) break;
        nc++; // 跳过空格
        if (textWidth(pos.slice(0, nc).join('')) > maxW + 1e-9) break; // 第一行已超宽，继续后移只会更宽
        if (textWidth(pos.slice(nc).join('')) <= maxW + 1e-9) { c = nc; break; }
      }
    }
    return c;
  }

  // 将文本按 maxW 折行，返回行数组。
  // opts.normalize=true 时（规则⑥标准口径）：先把文本内已有换行合并为单行，
  // 再判定“整条等效宽”是否超 maxW —— 未超则保持单行（修复短句被错误断行），
  // 超了才折，且折后每行 <= maxW。
  // opts.locale：目标语言（BCP47），启用词典分词保护（中文/日文等无空格语言不劈词）。
  function wrapToWidth(s, maxW, opts) {
    maxW = (maxW > 0) ? maxW : 20;
    opts = opts || {};
    const src = String(s == null ? '' : s).replace(/\r/g, '');
    if (opts.normalize) {
      const one = squashLines(src);
      return (one && textWidth(one) > maxW) ? foldSeg(one, maxW, opts.locale) : [one];
    }
    const out = [];
    for (const ln of src.split('\n')) {
      if (textWidth(ln) <= maxW) { out.push(ln); continue; }
      out.push.apply(out, foldSeg(ln, maxW, opts.locale));
    }
    return out;
  }

  // 把多行文本合并为单行：行首尾空白去掉再拼接；
  // 若拼缝两侧都是字母数字（英文被换行拆断的场景），补一个空格。
  function squashLines(src) {
    const lines = src.split('\n').map((x) => x.trim()).filter((x) => x !== '');
    let out = '';
    for (const ln of lines) {
      if (!out) { out = ln; continue; }
      const needSpace = isAlnum(out[out.length - 1]) && isAlnum(ln[0]);
      out += (needSpace ? ' ' : '') + ln;
    }
    return out;
  }

  // 将已确认超宽的连续文本折为多行，每行 <= maxW
  function foldSeg(seg, maxW, locale) {
    const out = [];
    while (seg && textWidth(seg) > maxW) {
      const cut = findCut(seg, maxW, locale);
      const f = seg.slice(0, cut).trimEnd(); // 行尾空白不进输出行（避免拼接残留空格）
      if (!f || cut <= 0) break; // 防御：切不动就放弃本行，避免死循环
      out.push(f);
      seg = seg.slice(cut);
    }
    if (seg) { const tail = seg.trimEnd(); if (tail) out.push(tail); }
    return out;
  }

  // ---------------- SRT 解析 / 格式化 ----------------
  const TIME_RE = /^(\d{1,2}):(\d{2}):(\d{2})[,.](\d{1,3})\s*-->\s*(\d{1,2}):(\d{2}):(\d{2})[,.](\d{1,3})/;
  function toMs(h, m, s, ms) { return (+h * 3600 + +m * 60 + +s) * 1000 + +ms; }
  function parseTime(str) {
    const m = TIME_RE.exec(String(str || '').trim());
    if (!m) return null;
    return [toMs(m[1], m[2], m[3], m[4].padEnd(3, '0')), toMs(m[5], m[6], m[7], m[8].padEnd(3, '0'))];
  }
  function fmtTime(ms) {
    const t = Math.max(0, Math.round(ms));
    const p = (x, l) => String(x).padStart(l, '0');
    return p(Math.floor(t / 3600000), 2) + ':' + p(Math.floor(t / 60000) % 60, 2) + ':' +
           p(Math.floor(t / 1000) % 60, 2) + ',' + p(t % 1000, 3);
  }

  // 解析 SRT 文本 → { items:[{no,start,end,text}], issues:[] }
  function parseSrt(src) {
    const items = [], issues = [];
    const text = String(src == null ? '' : src).replace(/^\uFEFF/, '').replace(/\r/g, '');
    const blocks = text.split(/\n\s*\n/);
    let prevEnd = -1, prevNo = 0;
    blocks.forEach((b, bi) => {
      const lines = b.split('\n').map((x) => x.trimEnd());
      if (!lines.join('').trim()) return;
      const noM = /^\s*(\d+)\s*$/.exec(lines[0] || '');
      const ti = lines.findIndex((l) => l.indexOf('-->') >= 0);
      if (!noM || ti < 1) { issues.push({ type: 'fmt', at: bi + 1, msg: '无法解析该块（缺编号或时间轴）', code: 'blkNoNumTs' }); return; }
      const t = parseTime(lines[ti]);
      if (!t) { issues.push({ type: 'fmt', at: +noM[1], msg: '时间轴格式不正确', code: 'badTs' }); return; }
      const no = +noM[1];
      const body = lines.slice(ti + 1).join('\n').trim();
      if (no <= prevNo) issues.push({ type: 'num', at: no, msg: '编号未递增', code: 'numInc' });
      if (t[1] <= t[0]) issues.push({ type: 'time', at: no, msg: '结束时间早于开始时间', code: 'endLtStart' });
      if (t[0] < prevEnd - 1) issues.push({ type: 'overlap', at: no, msg: '与上一条时间轴重叠', code: 'overlap' });
      prevEnd = t[1]; prevNo = no;
      items.push({ no, start: t[0], end: t[1], text: body });
    });
    if (!items.length) issues.push({ type: 'empty', at: 0, msg: '没有解析到任何字幕块', code: 'noBlocks' });
    return { items, issues };
  }

  function fmtItem(it) {
    return it.no + '\n' + fmtTime(it.start) + ' --> ' + fmtTime(it.end) + '\n' + it.text;
  }
  function formatSrt(items) {
    return items.map(fmtItem).join('\n\n') + '\n';
  }
  function renumber(items) { items.forEach((it, i) => { it.no = i + 1; }); return items; }

  // ---------------- WebVTT 解析 / 格式化 ----------------
  // VTT 时间：MM:SS.mmm 或 HH:MM:SS.mmm（毫秒用小数点）；支持 cue 标识行、NOTE/STYLE/REGION 块跳过。
  const VTT_TIME_RE = /^(?:(\d{1,3}):)?(\d{1,2}):(\d{2})\.(\d{3})\s*-->\s*(?:(\d{1,3}):)?(\d{1,2}):(\d{2})\.(\d{3})/;
  function fmtTimeVtt(ms) {
    const t = Math.max(0, Math.round(ms));
    const p = (x, l) => String(x).padStart(l, '0');
    return p(Math.floor(t / 3600000), 2) + ':' + p(Math.floor(t / 60000) % 60, 2) + ':' +
           p(Math.floor(t / 1000) % 60, 2) + '.' + p(t % 1000, 3);
  }
  function parseVtt(src) {
    const items = [], issues = [];
    const text = String(src == null ? '' : src).replace(/^\uFEFF/, '').replace(/\r/g, '');
    const blocks = text.split(/\n\s*\n/);
    let prevEnd = -1;
    blocks.forEach((b, bi) => {
      let lines = b.split('\n').map((x) => x.trimEnd());
      if (bi === 0 && /^WEBVTT/i.test(lines[0] || '')) lines = lines.slice(1); // 文件头
      if (!lines.join('').trim()) return;
      if (/^(NOTE|STYLE|REGION)/.test(lines[0] || '')) return;                 // 注释/样式/区域块
      const ti = lines.findIndex((l) => l.indexOf('-->') >= 0);                 // 允许 cue 标识行
      if (ti < 0) { issues.push({ type: 'fmt', at: bi + 1, msg: '无法解析该块（缺时间轴）', code: 'blkNoTs' }); return; }
      const m = VTT_TIME_RE.exec(lines[ti].trim());
      if (!m) { issues.push({ type: 'fmt', at: bi + 1, msg: '时间轴格式不正确', code: 'badTs' }); return; }
      const st = toMs(m[1] || 0, m[2], m[3], m[4]);
      const en = toMs(m[5] || 0, m[6], m[7], m[8]);
      const body = lines.slice(ti + 1).join('\n')
        .replace(/<[^>]+>/g, '')                       // <c>/<v>/<b> 等行内标签
        .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
        .replace(/&nbsp;/g, ' ').trim();
      if (!body) return;
      if (en <= st) issues.push({ type: 'time', at: items.length + 1, msg: '结束时间早于开始时间', code: 'endLtStart' });
      if (st < prevEnd - 1) issues.push({ type: 'overlap', at: items.length + 1, msg: '与上一条时间轴重叠', code: 'overlap' });
      prevEnd = en;
      items.push({ no: items.length + 1, start: st, end: en, text: body });
    });
    if (!items.length) issues.push({ type: 'empty', at: 0, msg: '没有解析到任何字幕块', code: 'noBlocks' });
    return { items, issues };
  }
  function formatVtt(items) {
    return 'WEBVTT\n\n' + items.map((it) =>
      it.no + '\n' + fmtTimeVtt(it.start) + ' --> ' + fmtTimeVtt(it.end) + '\n' + it.text
    ).join('\n\n') + '\n';
  }

  // ---------------- ASS/SSA 解析 / 格式化 ----------------
  // ASS 时间：H:MM:SS.cc（厘秒）。解析 [Events] 的 Dialogue 行，按 Format 行定位列；
  // 文本剥离 {\...} 特效标签，\N→换行，\h→空格。Comment 行跳过。
  const ASS_TIME_RE = /^(\d+):(\d{1,2}):(\d{1,2})[.:](\d{1,2})/;
  function parseAssTime(str) {
    const m = ASS_TIME_RE.exec(String(str || '').trim());
    if (!m) return null;
    return (+m[1] * 3600 + +m[2] * 60 + +m[3]) * 1000 + (+m[4].padEnd(2, '0')) * 10;
  }
  function fmtTimeAss(ms) {
    const t = Math.max(0, Math.round(ms));
    const p = (x) => String(x).padStart(2, '0');
    return Math.floor(t / 3600000) + ':' + p(Math.floor(t / 60000) % 60) + ':' +
           p(Math.floor(t / 1000) % 60) + '.' + p(Math.floor(t / 10) % 100);
  }
  function parseAss(src) {
    const items = [], issues = [];
    const text = String(src == null ? '' : src).replace(/^\uFEFF/, '').replace(/\r/g, '');
    const DEF_FMT = ['layer', 'start', 'end', 'style', 'name', 'marginl', 'marginr', 'marginv', 'effect', 'text'];
    let inEvents = false, fmt = null, prevEnd = -1;
    text.split('\n').forEach((ln, li) => {
      const s = ln.trim();
      if (/^\[/.test(s)) { inEvents = /^\[events\]/i.test(s); return; }
      if (!inEvents || !s) return;
      if (/^format\s*:/i.test(s)) {
        fmt = s.slice(s.indexOf(':') + 1).split(',').map((x) => x.trim().toLowerCase());
        return;
      }
      if (!/^dialogue\s*:/i.test(s)) return;              // Comment 行等跳过
      const cols = fmt || DEF_FMT;
      const raw = s.slice(s.indexOf(':') + 1).trim().split(',');
      const head = raw.slice(0, cols.length - 1);
      const textField = raw.slice(cols.length - 1).join(','); // Text 列可含逗号
      const col = (name) => {
        const idx = cols.indexOf(name);
        return (idx >= 0 && idx < head.length) ? head[idx].trim() : '';
      };
      const st = parseAssTime(col('start'));
      const en = parseAssTime(col('end'));
      if (st == null || en == null) { issues.push({ type: 'fmt', at: li + 1, msg: '时间轴格式不正确', code: 'badTs' }); return; }
      const body = textField
        .replace(/\{[^}]*\}/g, '')                        // {\an8}{\pos(...)} 等特效标签
        .replace(/\\N/gi, '\n').replace(/\\h/gi, ' ')
        .replace(/[ \t]+\n/g, '\n').trim();
      if (!body) return;
      if (en <= st) issues.push({ type: 'time', at: li + 1, msg: '结束时间早于开始时间', code: 'endLtStart' });
      if (st < prevEnd - 1) issues.push({ type: 'overlap', at: li + 1, msg: '与上一条时间轴重叠', code: 'overlap' });
      if (en > prevEnd) prevEnd = en;
      items.push({ no: items.length + 1, start: st, end: en, text: body });
    });
    if (!items.length) issues.push({ type: 'empty', at: 0, msg: '没有解析到任何字幕块', code: 'noBlocks' });
    return { items, issues };
  }

  // 生成带样式分层的 ASS 文件（1080p 基准，可直压视频 / 进 Aegisub 二次编辑）。
  // events：[{start,end,lines:[{style:'Top'|'Bottom',text}]}]
  //   Bottom 主语言：白色 100% 大小，底部居中（an2）——主要阅读位置；
  //   Top    副语言：金黄约 75% 大小，顶部居中（an8）——行业双语分层惯例；
  // 双语时源/译各占一条 Dialogue（时间相同、位置分离），不挤在两行里。
  function formatAss(events, opts) {
    opts = opts || {};
    const STYLE_FMT = 'Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding';
    const header = [
      '[Script Info]',
      'Title: ' + (opts.title || 'Translated Subtitles'),
      'ScriptType: v4.00+',
      'PlayResX: 1920',
      'PlayResY: 1080',
      'ScaledBorderAndShadow: yes',
      'WrapStyle: 0',
      'YCbCr Matrix: TV.709',
      '',
      '[V4+ Styles]',
      STYLE_FMT,
      'Style: Bottom,PingFang SC,56,&H00FFFFFF,&H000000FF,&H00000000,&H64000000,-1,0,0,0,100,100,0,0,1,2.5,0,2,60,60,42,1',
      'Style: Top,PingFang SC,42,&H0000D7FF,&H000000FF,&H00000000,&H64000000,0,0,0,0,100,100,0,0,1,2.5,0,8,60,60,42,1',
      // Sub：底部双行样式（v0.9.17）——外观与 Top 一致（42pt 金黄）但对齐方式为底部居中，
      // 实际纵向位置由每条 Dialogue 的 MarginV（ln.mv）动态指定，实现“紧贴译文上方、整体锚在底部”。
      'Style: Sub,PingFang SC,42,&H0000D7FF,&H000000FF,&H00000000,&H64000000,0,0,0,0,100,100,0,0,1,2.5,0,2,60,60,42,1',
      '',
      '[Events]',
      'Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text'
    ];
    const evLines = [];
    for (const ev of (events || [])) {
      if (!ev) continue;
      (ev.lines || []).forEach((ln, i) => {
        if (!ln || !ln.text || !String(ln.text).trim()) return;
        const tx = String(ln.text).replace(/\r/g, '').replace(/\n/g, '\\N');
        const st = ln.style === 'Top' ? 'Top' : (ln.style === 'Sub' ? 'Sub' : 'Bottom');
        evLines.push('Dialogue: ' + i + ',' + fmtTimeAss(ev.start) + ',' + fmtTimeAss(ev.end) + ',' +
          st + ',,0,0,' + (ln.mv > 0 ? Math.round(ln.mv) : 0) + ',,' + tx);
      });
    }
    return header.join('\n') + '\n' + evLines.join('\n') + '\n';
  }

  // ---------------- 纯文本导出 ----------------
  // 每条字幕的文本作为一个段落（保留条内换行），段落间空行分隔；无时间轴。
  function formatTxt(items) {
    return items.map((it) => it.text).join('\n\n') + '\n';
  }

  // 按内容识别字幕格式：'vtt' | 'ass' | 'srt'
  function detectFormat(src) {
    const text = String(src == null ? '' : src).replace(/^\uFEFF/, '');
    if (/^\s*WEBVTT/i.test(text)) return 'vtt';
    if (/\[Script Info\]/i.test(text)) return 'ass';
    return 'srt';
  }

  // ---------------- 水词 / 提示词识别 ----------------
  const FILLERS = new Set(['um', 'uh', 'er', 'ah', 'oh', 'mm', 'mmm', 'mhmm', 'hmm', 'hm',
    'yeah', 'yep', 'yup', 'nope', 'nah', 'ok', 'okay', 'alright', 'right', 'well', 'so', 'like',
    'uhh', 'uhuh', 'uh-uh', 'ha', 'heh', 'huh', 'ahh', 'ahem', 'yeahyeah', 'yeahyeahyeah', 'uhhuh']);
  const FILLER_PHRASES = new Set(['you know', 'i mean', 'you know what', 'i guess', 'oh yeah',
    'oh ok', 'oh okay', 'all right', 'no no', 'yeah yeah', 'right right']);
  const SOUND_HINTS = ['音乐', '背景音乐', '掌声', '笑声', '欢呼', '音效', '噪音', '旁白', '画外音',
    '解说', '说话声', '鸟叫', '咳嗽', '车声', '电话铃', '提示音',
    'music', 'applause', 'laugh', 'cheer', 'sound effect', 'coughing', 'phone ringing',
    'narration', 'voiceover', 'background noise', 'sigh', 'groan'];

  function soundOnlyRe() {
    return new RegExp('^\\s*[\\[【\\(（][^\\]】\\)）]*(?:' + SOUND_HINTS.join('|') + ')[^\\[【\\(（]*[\\]】\\)）]\\s*$');
  }
  function normFill(s) {
    return String(s == null ? '' : s).toLowerCase()
      .replace(/[\u2018\u2019\u201c\u201d"'`]/g, '')
      .replace(/[^a-z0-9\s]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  // 整条是否属于「纯水词 / 纯提示词」（上层据此 drop 或 merge）
  function isFillerCue(text) {
    if (!text || !text.trim()) return false;
    const t = text.trim();
    if (soundOnlyRe().test(t)) return true;
    const n = normFill(t);
    if (!n) return false;
    if (n.length > 12) return false;
    if (FILLER_PHRASES.has(n)) return true;
    const compact = n.replace(/[^a-z0-9]/g, '');
    if (FILLERS.has(compact)) return true;              // "Yeah, yeah." → yeahyeah 之类
    const words = n.split(' ');
    if (words.every((w) => FILLERS.has(w))) return true;
    return false;
  }

  // 去掉文本内嵌的 [音乐] 等提示词
  function stripSoundTags(text) {
    const re = new RegExp('\\s*[\\[【\\(（][^\\]】\\)）]*(?:' + SOUND_HINTS.join('|') + ')[^\\[【\\(（]*[\\]】\\)）]\\s*', 'g');
    return String(text == null ? '' : text)
      .replace(re, '')
      .replace(/\s{2,}/g, ' ')
      .trim();
  }

  // ---------------- 双 speaker 对话（v0.9.25）----------------
  // 电影字幕常见格式：同一条 cue 内两个说话人各占一行、以 - 开头（Netflix/BBC 惯例）。
  // 窄门检测（宁窄勿宽，单行 dash 的普通字幕不进此轨道）：
  //   ≥2 个非空行，且【全部】行以 -/–/— 开头（行首 dash 后可有可无空格）。
  const SP_DASH_RE = /^[-–—]\s?/;
  function isSpeakerText(text) {
    const lines = String(text == null ? '' : text).replace(/\r/g, '').split('\n')
      .map((s) => s.trim()).filter(Boolean);
    return lines.length >= 2 && lines.every((l) => SP_DASH_RE.test(l));
  }

  // speaker 行独立折行：每行 ≤ maxW+4 直放（与 R1 微超宽同口径），
  // 超宽才在该行内部折行；speaker 边界神圣——绝不跨行重分配、绝不切分时间轴。
  function foldSpeakerLines(text, maxW, locale) {
    const out = [];
    for (const ln of String(text == null ? '' : text).replace(/\r/g, '').split('\n')
      .map((s) => s.trim()).filter(Boolean)) {
      if (textWidth(stripSoundTags(ln)) <= maxW + 4) { out.push(ln); continue; }
      out.push.apply(out, wrapToWidth(ln, maxW, { normalize: true, locale: locale }));
    }
    return out;
  }

  // ---------------- 句子级分组与时长分配 ----------------
  // 场景：源 SRT 常把一个完整句子拆在相邻多条字幕里（如 "…was shocked" / "by a tariff's consequences."）。
  // 翻译以句组为单位进行，译回时按各条字幕的时长比例切分回填（时间轴不动）。
  const SENT_FINAL = '.!?…。！？…';
  const CLOSE_BRKS = '”’』】》）)]"\'';

  function endsSentence(text) {
    const t = stripSoundTags(text).trim();
    if (!t) return false;
    for (let i = t.length - 1; i >= 0; i--) {
      const ch = t[i];
      if (CLOSE_BRKS.includes(ch)) continue;
      if (ch === ' ' || ch === '\t' || ch === '\n') continue;
      return SENT_FINAL.includes(ch);
    }
    return false;
  }

  function joinSrc(a, b) {
    const needSpace = isAlnum(a[a.length - 1]) && isAlnum(b[0]);
    return a + (needSpace ? ' ' : '') + b;
  }

  // 把相邻 cue 合并为「句组」：文本未以句末标点结尾的 cue 与下一条同组；
  // 纯水词/纯提示词 cue 单独成组并标记 filler:true（上层直接清空该条）。
  // opts.maxCues / opts.maxWidth 为保险丝：防听写文本全程无标点导致超长合并。
  function groupSentences(items, opts) {
    opts = opts || {};
    const maxCues = opts.maxCues || 6;
    const maxWidth = opts.maxWidth || 200;
    const groups = [];
    let cur = null;
    const flush = () => {
      if (cur && cur.cues.length) groups.push({ gno: groups.length + 1, cues: cur.cues, text: cur.text });
      cur = null;
    };
    for (const it of items) {
      if (isFillerCue(it.text)) {
        flush();
        groups.push({ gno: groups.length + 1, cues: [it], text: it.text, filler: true });
        continue;
      }
      // 双 speaker 对话 cue（v0.9.25）：独立成组、不与相邻 cue 合并——
      // 两个说话人的对白是自洽单元，跨 cue 合并/切分都会把 A 的话混进 B 的行
      if (isSpeakerText(it.text)) {
        flush();
        groups.push({ gno: groups.length + 1, cues: [it], text: String(it.text), speaker: true });
        continue;
      }
      const txt = String(it.text || '').trim();
      if (!txt) continue;
      if (cur && (cur.cues.length >= maxCues || textWidth(joinSrc(cur.text, txt)) > maxWidth)) flush();
      if (!cur) cur = { cues: [], text: '' };
      cur.text = cur.text ? joinSrc(cur.text, txt) : txt;
      cur.cues.push(it);
      if (endsSentence(txt)) flush();
    }
    flush();
    return groups;
  }

  // 前缀宽度数组中，第一个 >= w 的下标（找不到返回末下标）
  function idxAtWidth(pref, w) {
    let lo = 0, hi = pref.length - 1, ans = pref.length - 1;
    while (lo <= hi) {
      const mid = (lo + hi) >> 1;
      if (pref[mid] >= w) { ans = mid; hi = mid - 1; } else lo = mid + 1;
    }
    return ans;
  }

  // 把整句译文按各 cue 的时长比例切分，返回与 times 等长的字符串数组，每项非空。
  // 切分点优先取语义停顿（复用 breakPrio 优先级），并在时长占比的目标位置附近（±6 宽度）择优；
  // 切点禁止落在数字+单位原子内部（如 30%、$50、1,000）；词边界加分（不劈词，如 价|格）。
  // opts.locale：目标语言（BCP47），启用词典分词。
  function splitByDuration(text, times, opts) {
    opts = opts || {};
    const pos = Array.from(String(text == null ? '' : text).replace(/\r/g, '').replace(/\n/g, ' ').trim());
    const n = times.length;
    if (n <= 1) return [pos.join('')];
    if (!pos.length) return times.map(() => '');
    const atom = atomicRanges(pos);
    const inAtom = (i) => { for (let k = 0; k < atom.length; k++) if (i > atom[k][0] && i < atom[k][1]) return true; return false; };
    const wb = wordBounds(pos, opts.locale);
    const dur = times.map((x) => Math.max(1, (x.end || 0) - (x.start || 0)));
    const total = dur.reduce((a, b) => a + b, 0);
    // 前缀显示宽度（与 textWidth 同口径：跳过空白）
    const pref = new Array(pos.length + 1).fill(0);
    for (let i = 0; i < pos.length; i++) pref[i + 1] = pref[i] + (/\s/.test(pos[i]) ? 0 : charW(pos[i]));
    const W = pref[pos.length] || 1;
    const cuts = [0];
    for (let k = 1; k < n; k++) {
      const target = (dur.slice(0, k).reduce((a, b) => a + b, 0) / total) * W;
      const prevCut = cuts[cuts.length - 1];
      const lo = Math.max(prevCut + 1, idxAtWidth(pref, target - 6));
      const hi = Math.min(pos.length - 1, idxAtWidth(pref, target + 6));
      let best = -1, bestScore = -Infinity;
      for (let i = lo; i <= hi; i++) {
        if (inAtom(i)) continue;
        const p = breakPrio(pos, i);
        const eff = (p >= 4 || !wb || wb.has(i)) ? p : 0;  // 伪断点（介词/连接词）落词内部 → 无效
        const score = eff * 100
          + (wb && wb.has(i) ? 150 : 0)   // 词边界加分：语义同级时优先不劈词
          - Math.abs(pref[i] - target);
        if (score > bestScore) { bestScore = score; best = i; }
      }
      if (best < 0 || best <= prevCut) {
        // 窗口内无合法点（全被原子挡住等）：从目标位置起向两侧找最近的非原子点
        let c0 = Math.min(Math.max(prevCut + 1, idxAtWidth(pref, target)), pos.length - 1);
        if (inAtom(c0)) {
          let f = c0;
          while (f > prevCut + 1 && inAtom(f)) f--;
          if (inAtom(f)) { f = c0; while (f < pos.length - 1 && inAtom(f)) f++; }
          c0 = f;
        }
        best = c0;
      }
      cuts.push(best);
    }
    cuts.push(pos.length);
    const out = [];
    for (let k = 0; k < n; k++) out.push(pos.slice(cuts[k], cuts[k + 1]).join('').trim());
    // 保底：某段为空时，从最长的相邻段借字符，保证每条字幕都有内容（借出边界不劈数字原子）
    for (let k = 0; k < n; k++) {
      if (out[k]) continue;
      const nb = out.map((x, i) => ({ i, len: x.length })).filter((x) => x.i !== k && x.len > 2)
        .sort((a, b) => b.len - a.len)[0];
      if (!nb) continue;
      const arr = Array.from(out[nb.i]);
      const aa = atomicRanges(arr);
      const bad = (p) => { for (let r = 0; r < aa.length; r++) if (p > aa[r][0] && p < aa[r][1]) return true; return false; };
      if (nb.i < k) {
        let cut = arr.length - 2;
        while (cut > 1 && bad(cut)) cut--;
        out[k] = arr.slice(cut).join('');
        out[nb.i] = arr.slice(0, cut).join('');
      } else {
        let cut = 2;
        while (cut < arr.length - 1 && bad(cut)) cut++;
        out[k] = arr.slice(0, cut).join('');
        out[nb.i] = arr.slice(cut).join('');
      }
    }
    return out;
  }

  // 判定跨条句组是否适合直接合并为一条字幕：
  // ① 合并后总时长 <= maxDur（默认 7000ms，单条字幕行业安全上限）
  // ② 译文折行后 <= maxLines 行（默认 2 行；分词保护上线后折行质量稳定，改用真实行数判定）
  // opts.locale：目标语言（BCP47），传给折行分词。
  // 满足则合并（时间轴取首条 start ~ 末条 end，译文整条回填），否则回退按时长切分。
  function mergeableGroup(cues, text, opts) {
    opts = opts || {};
    if (!cues || cues.length < 2) return false;
    const txt = String(text == null ? '' : text).trim();
    if (!txt) return false;
    const maxDur = opts.maxDur || 7000;
    const maxW = (opts.maxW > 0) ? opts.maxW : 20;
    const maxLines = opts.maxLines || 2;
    const dur = (cues[cues.length - 1].end || 0) - (cues[0].start || 0);
    if (dur > maxDur) return false;
    if (textWidth(txt) > maxW * maxLines) return false;   // 宽度预判：超容量直接否
    return wrapToWidth(txt, maxW, { normalize: true, locale: opts.locale }).length <= maxLines;
  }

  // ---------------- 双语字幕导出 ----------------
  // 把文本在自然断点处切成 k 段（宽度尽量均衡）。
  // 复用 splitByDuration：喂入 k 段等长的合成时间轴，等价于"按宽度均分 + 自然断点择优"，
  // 同时继承其全部保护：数字+单位原子不劈、词边界加分、空段借字保底（保证 k 段均非空）。
  function splitTextNatural(text, k, locale) {
    k = Math.max(1, k | 0);
    const times = [];
    for (let i = 0; i < k; i++) times.push({ start: i * 1000, end: (i + 1) * 1000 });
    return splitByDuration(text, times, { locale: locale });
  }

  // 对齐切分（译文专用）：以参考各段（源文段）的宽度占比为切分目标，在自然断点择优。
  // 双语切时间轴时，源/译若各自独立找断点，"第 i 段对第 i 段"的假设会被语序差、
  // 语言密度差打破，出现源文一长串译文只剩"…/呃，"的错位段。按比例对齐后，
  // 译文每段都能分到与源文段份量相当的内容；再经 repairThinSegs 兜底。
  function splitAligned(text, refSegs, k, locale) {
    k = Math.max(1, k | 0);
    const s = String(text == null ? '' : text);
    if (k <= 1) return [squashLines(s)];
    if (!s.trim()) return new Array(k).fill('');
    const ws = (refSegs || []).map((x) => Math.max(0.5, textWidth(x || '')));
    while (ws.length < k) ws.push(0.5);
    let cum = 0;
    const times = ws.slice(0, k).map((w) => { const t = { start: cum * 100, end: (cum + w) * 100 }; cum += w; return t; });
    return repairThinSegs(splitByDuration(s, times, { locale: locale }), locale);
  }

  // 单语导出分片（v0.9.13）：优先按时长占比切分（文本随语音出现），
  // 但校验每片折行 ≤ maxLines；句组内时长严重不均时（如 4.4s vs 1.3s），
  // 按时长分片会让长 cue 分到超 2 行的量，观感不可接受——此时退回按宽度均分
  // （splitTextNatural 等宽分段，天然最小化"最大行数"）。译文总宽超出
  // k×maxW×maxLines 容量时均分也无法全 ≤2 行，等宽分段仍是最优解，照常返回。
  function splitCues(text, times, opts) {
    opts = opts || {};
    const maxW = (opts.maxW > 0) ? opts.maxW : 20;
    const maxLines = (opts.maxLines > 0) ? opts.maxLines : 2;
    const locale = opts.locale;
    // 双 speaker 对话（v0.9.25）：单 cue 透传保留行结构（splitByDuration 会把 \n 压成空格）；
    // 多 cue 防御性走旧路径（句组隔离保证 speaker 组必为单 cue，此处仅兜底）
    if (isSpeakerText(text) && times.length <= 1) {
      return [String(text == null ? '' : text).replace(/\r/g, '').trim()];
    }
    const pieces = splitByDuration(text, times, { locale: locale });
    if (times.length <= 1) return pieces;
    const fits = (ps) => ps.every((p) => wrapToWidth(p, maxW, { normalize: true, locale: locale }).length <= maxLines);
    if (fits(pieces)) return pieces;
    return splitTextNatural(String(text == null ? '' : text), times.length, locale);
  }

  // 有效字符数（去空白/标点/符号）：判定「饥饿段 / 孤儿尾巴」的统一口径（v0.9.23 从 repairThinSegs 提升复用）
  function effChars(s) {
    return Array.from(String(s == null ? '' : s).replace(/[\s\p{P}\p{S}]/gu, '')).length;
  }

  // 语言感知拼接（v0.9.23 孤儿收并用）：汉字/假名与泰、老、高棉、缅文等无空格文字直接拼接；
  // 韩文谚文书写上词间用空格（切分必发生在空格处，助词从不跨空格附着）→ 补空格还原；
  // 拉丁等其余语言补一个空格。与 joinSrc（源文用）不同，本函数面向任意目标语言的收并拼缝。
  const RE_NO_SPACE_EDGE = /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Thai}\p{Script=Lao}\p{Script=Khmer}\p{Script=Myanmar}]/u;
  function joinSeg(a, b) {
    const A = String(a == null ? '' : a).trim();
    const B = String(b == null ? '' : b).trim();
    if (!A) return B;
    if (!B) return A;
    if (RE_NO_SPACE_EDGE.test(A[A.length - 1]) || RE_NO_SPACE_EDGE.test(B[0])) return A + B;
    return A + ' ' + B;
  }

  // 句末判定（宽口径，供跨句守卫）：比 groupSentences 的 SENT_FINAL 多含阿语 ؟ 与天城文 ।，
  // 并跳过句尾闭合引号/空白。跨句守卫宁严勿松——多拦一次合并只是少修一处，误并一次就是语义错误。
  const TAIL_SENT_FINAL = '.!?…。！？…؟।';
  function endsSentenceLoose(text) {
    const t = stripSoundTags(text).trim();
    if (!t) return false;
    for (let i = t.length - 1; i >= 0; i--) {
      const ch = t[i];
      if (CLOSE_BRKS.includes(ch)) continue;
      if (ch === ' ' || ch === '\t' || ch === '\n') continue;
      return TAIL_SENT_FINAL.includes(ch);
    }
    return false;
  }

  // B1 孤儿尾巴收并（v0.9.23，纯函数）：splitCues 按时长比例切分后，末条 cue 极短
  // （< 700ms，低于行业 ~0.8s 最短可读时长）且译文只剩尾巴（≤2 有效字或整片 ≤1 词）时，
  // 把尾巴并回前一片。这是"撤销一次坏切分"（尾巴本出自同一句组译文被机械切薄），
  // 不是合并两个独立句子——后者由守卫③拦截。
  // 四重守卫（全部命中才动）：
  //   ① 末条 cue 时长 < minDur（默认 700ms）
  //   ② 尾巴有效字 ≤ thinChars（默认 2，去标点空白）或整片 ≤1 词（拉丁 "world." 类）
  //   ③ 前片非句末结尾（。！？.!?…؟।）——前句已完结则尾巴是「嗯。」类独立应答，不并
  //   ④ 收并后前片折行 ≤ maxLines（默认 2；放不下保持原切分）
  // 返回 {pieces, collapsed}：命中时 pieces 为新数组（倒数第二片 = joinSeg(前,尾)，末片 = ''），
  // 未命中时原样返回（pieces 为入参的字符串化副本）。pieces 与 cues 等长对齐。
  function collapseThinTail(pieces, cues, opts) {
    opts = opts || {};
    const minDur = opts.minDur > 0 ? opts.minDur : 700;
    const thinChars = opts.thinChars > 0 ? opts.thinChars : 2;
    const maxW = opts.maxW > 0 ? opts.maxW : 20;
    const maxLines = opts.maxLines > 0 ? opts.maxLines : 2;
    const locale = opts.locale;
    const ps = (pieces || []).map((p) => String(p == null ? '' : p));
    const cs = cues || [];
    const no = { pieces: ps, collapsed: false };
    if (ps.length < 2 || cs.length < 2 || ps.length !== cs.length) return no;
    const dur = (cs[cs.length - 1].end || 0) - (cs[cs.length - 1].start || 0);
    if (dur >= minDur) return no;
    const tail = ps[ps.length - 1].trim();
    const prev = ps[ps.length - 2].trim();
    if (!tail || !prev) return no;
    const tailPlain = stripSoundTags(tail);
    const effTail = effChars(tailPlain);
    const wordsTail = tailPlain.split(/\s+/).filter(Boolean).length;
    if (effTail > thinChars && wordsTail > 1) return no;
    if (endsSentenceLoose(prev)) return no;
    const joined = joinSeg(prev, tail);
    if (wrapToWidth(stripSoundTags(joined), maxW, { normalize: true, locale: locale }).length > maxLines) return no;
    const np = ps.slice();
    np[np.length - 2] = joined;
    np[np.length - 1] = '';
    return { pieces: np, collapsed: true };
  }

  // 退化段修复：有效字符（去标点/空白/符号）<= 2 的段，从相邻最肥的段按词借字，
  // 避免「源文一整句，译文只有标点/语气词」的观感。借字以词为单位整借（含其附着标点），不劈词。
  function repairThinSegs(segs, locale) {
    const eff = effChars;   // v0.9.23：提升为模块级 effChars，行为不变
    const chunksOf = (s) => {
      try {
        const seg = new Intl.Segmenter(locale || 'zh', { granularity: 'word' });
        return Array.from(seg.segment(String(s))).map((x) => x.segment);
      } catch (e) { return [String(s)]; }
    };
    for (let i = 0; i < segs.length; i++) {
      if (eff(segs[i]) > 2) continue;
      const cands = [i - 1, i + 1].filter((j) => j >= 0 && j < segs.length && eff(segs[j]) >= 6)
        .sort((a, b) => eff(segs[b]) - eff(segs[a]));
      if (!cands.length) continue;
      const j = cands[0];
      const chunks = chunksOf(segs[j]);
      const moved = [];
      // 从邻段靠界一侧借字：左邻借尾、右邻借头；一次借一词连同其附着标点
      while (eff(moved.join('')) < 3 && chunks.length && eff(chunks.join('')) > 3) {
        if (j < i) { // 借尾：尾部标点连同前面的词一起移动
          let unit = '';
          while (chunks.length) {
            const c = chunks.pop();
            unit = c + unit;
            if (/[\p{L}\p{N}]/u.test(c)) break;   // 吃到含字母/数字的块为止
          }
          if (!unit) break;
          moved.unshift(unit);
        } else {     // 借头：头部的词连同其后标点一起移动
          let unit = '';
          while (chunks.length) {
            const c = chunks.shift();
            unit += c;
            if (/[\p{L}\p{N}]/u.test(c) && (!chunks.length || /[\p{L}\p{N}]/u.test(chunks[0]))) break;
          }
          if (!unit) break;
          moved.push(unit);
        }
      }
      if (!moved.length) continue;
      if (j < i) { segs[j] = chunks.join('').trim(); segs[i] = (moved.join('') + segs[i]).trim(); }
      else { segs[j] = chunks.join('').trim(); segs[i] = (segs[i] + moved.join('')).trim(); }
    }
    return segs;
  }

  // 由工作行生成双语字幕条目（结构化版：源文/译文分行保留，供 ASS 分层导出使用）。
  // rows：[{no,start,end,en,zh,flag}]（与前端 S.rows 同构；en=源文，zh=译文）
  // opts：
  //   maxW       每行等效宽度上限（默认 20，与折行同口径）
  //   srcLocale  源语言 BCP47（分词保护；英文等空格语言影响很小）
  //   dstLocale  目标语言 BCP47
  //   order      'src-first'（源文为主，默认）| 'dst-first'（译文为主）——结构化版仅透传，由调用方决定摆放
  // 规则（可读性优先，详见函数内 R1/R2/R3）：
  //   - 目标形态仍是 源文 1 行 + 译文 1 行；但微超宽（≤maxW+4）直接单行放下，
  //     切分会产生饥饿段（≤2 有效字）时回退为整 cue（源/译各最多 2 行），
  //     只有超 2+2 容量的长 cue 才真正切时间轴（源文自然断点切、译文按源文段宽占比对齐切）；
  //   - 子时间轴按源文各段显示宽度占比瓜分原 cue 时长（时间跟着说话内容走）；
  //   - flag='merged' 的行（句组合并被跳过的行）：其源文拼回承载行，避免源文丢失；
  //   - flag='drop'、无译文的行：跳过（与单语导出同口径）。
  // 返回 [{no,start,end,srcLines:[],dstLines:[]}]。
  function buildBilingualParts(rows, opts) {
    opts = opts || {};
    const maxW = (opts.maxW > 0) ? opts.maxW : 20;
    // 1) 汇集成对条目：活跃行 + 其后 merged 行的源文
    const entries = [];
    let last = null;
    for (const r of (rows || [])) {
      if (!r) continue;
      if (r.flag === 'drop') { last = null; continue; }
      const srcOne = squashLines(String(r.en == null ? '' : r.en));
      if (r.flag === 'merged') {
        if (last && srcOne) last.srcParts.push(srcOne);
        if (last && (r.end || 0) > last.end) last.end = r.end; // 防御：merged 行的时间覆盖并入承载行
        continue;
      }
      if (!r.zh || !String(r.zh).trim()) { last = null; continue; }
      // 双 speaker 对话（v0.9.25）：src/dst 都保留原始多行（不 squash），
      // 后续走 SP 分支每行独立折行；模型降级返回单行时 isSpeakerText 为 false，自然落回旧路径
      if (isSpeakerText(String(r.zh))) {
        last = { start: r.start || 0, end: r.end || 0, speaker: true,
                 srcParts: srcOne ? [String(r.en == null ? '' : r.en).replace(/\r/g, '').trim()] : [],
                 dst: String(r.zh).replace(/\r/g, '').trim() };
        entries.push(last);
        continue;
      }
      last = { start: r.start || 0, end: r.end || 0,
               srcParts: srcOne ? [srcOne] : [],
               dst: squashLines(String(r.zh)) };
      entries.push(last);
    }
    // 2) 逐条目叠放 / 切分
    const out = [];
    for (const e of entries) {
      let srcText = '';
      for (const p of e.srcParts) srcText = srcText ? joinSrc(srcText, p) : p;
      const dstText = e.dst;
      if (!dstText) continue;
      const pushItem = (st, en, sLines, dLines) => {
        out.push({ no: out.length + 1, start: st, end: en, srcLines: sLines, dstLines: dLines });
      };
      // SP 双 speaker（v0.9.25）：src 块 + dst 块各自按 dash 行独立折行，
      // 不跨 speaker 切分、不折 2+2 容量框架（4 行上限天然满足）
      if (e.speaker) {
        const sLines = (e.srcParts.length && isSpeakerText(e.srcParts[0]))
          ? foldSpeakerLines(e.srcParts[0], maxW, opts.srcLocale)
          : (e.srcParts.length ? wrapToWidth(e.srcParts[0], maxW, { normalize: true, locale: opts.srcLocale }) : []);
        pushItem(e.start, e.end, sLines, foldSpeakerLines(e.dst, maxW, opts.dstLocale));
        continue;
      }
      // 规则（可读性优先，三层兜底）：
      //  R1 微超宽容忍：两边宽度都 ≤ maxW+4 时不折不切，直接单行放下（字幕适当长点观感更好）；
      //  R2 饥饿段回退：切分后任一段只剩 <=2 个有效字（如 "…"/"呃，"）时放弃切分，
      //     整 cue 显示，源/译各自最多折 2 行（2+2 封顶）——废字幕比满屏更糟；
      //  R3 强制切分：超出 2+2 容量的长 cue 才切时间轴（源文自然断点切、译文按比例对齐切 + 段内修复）。
      const effOf = (s) => Array.from(String(s || '').replace(/[\s\p{P}\p{S}]/gu, '')).length;
      const srcW = srcText ? textWidth(srcText) : 0;
      const dstW = textWidth(dstText);
      if (srcW <= maxW + 4 && dstW <= maxW + 4) {
        pushItem(e.start, e.end, srcText ? [srcText] : [], [dstText]);
        continue;
      }
      const srcLines = srcText ? wrapToWidth(srcText, maxW, { normalize: true, locale: opts.srcLocale }) : [];
      const dstLines = wrapToWidth(dstText, maxW, { normalize: true, locale: opts.dstLocale });
      let k = Math.max(srcLines.length, dstLines.length);
      if (k <= 1) { pushItem(e.start, e.end, srcLines, dstLines); continue; }
      // 切 k 条子字幕。源文按自然断点切；译文按源文各段宽度占比对齐切（splitAligned 内含段内退化修复），
      // 保证段对段份量对应。任一段仍超宽则递增 k 重切（上限兜底：极端长词/原子切不动才接受段内折行）。
      const fits = (segs) => segs.every((s) => !s || textWidth(s) <= maxW + 1e-9);
      let srcSegs = [], dstSegs = [];
      const kCap = k + 10;
      for (;; k++) {
        srcSegs = srcText ? splitTextNatural(srcText, k, opts.srcLocale) : new Array(k).fill('');
        dstSegs = splitAligned(dstText, srcText ? srcSegs : null, k, opts.dstLocale);
        if ((fits(srcSegs) && fits(dstSegs)) || k >= kCap) break;
      }
      // R2：切分产生了饥饿段（空段不算——无源文行的译段独自成条属正常），
      // 且整 cue 放得下 2+2 → 放弃切分，整 cue 折行显示
      const starved = (segs) => segs.some((s) => s && effOf(s) <= 2);
      if ((starved(srcSegs) || starved(dstSegs)) && srcW <= 2 * maxW && dstW <= 2 * maxW) {
        pushItem(e.start, e.end, srcLines, dstLines);
        continue;
      }
      // 子时间轴：按源文各段宽度占比分配（无源文时按译文段宽）
      const basis = (srcText ? srcSegs : dstSegs).map((s) => Math.max(0.5, textWidth(s)));
      const W = basis.reduce((a, b) => a + b, 0);
      const total = Math.max(0, e.end - e.start);
      let cum = 0;
      for (let i = 0; i < k; i++) {
        cum += basis[i];
        const subStart = i === 0 ? e.start : Math.round(e.start + total * (cum - basis[i]) / W);
        const subEnd = i === k - 1 ? e.end : Math.round(e.start + total * cum / W);
        // 段内仍超宽（罕见：长不可断 stretch）则折行兜底，接受该段 2 行
        const sL = srcSegs[i] ? wrapToWidth(srcSegs[i], maxW, { normalize: true, locale: opts.srcLocale }) : [];
        const dL = wrapToWidth(dstSegs[i], maxW, { normalize: true, locale: opts.dstLocale });
        pushItem(subStart, subEnd, sL, dL);
      }
    }
    return out;
  }

  // 双语字幕条目（纯文本版：源/译行叠放为单个 text，可直接交给 formatSrt / formatVtt / formatTxt）。
  // 规则与 buildBilingualParts 相同；opts.order：'src-first'（源文在上，默认）| 'dst-first'（译文在上）。
  function buildBilingual(rows, opts) {
    const srcFirst = !opts || opts.order !== 'dst-first';
    return buildBilingualParts(rows, opts).map((p) => ({
      no: p.no, start: p.start, end: p.end,
      text: (srcFirst ? p.srcLines.concat(p.dstLines) : p.dstLines.concat(p.srcLines)).join('\n')
    }));
  }

  // 单语字幕条目（v0.9.23）：替代此前 filter+map 直透 S.rows 的零处理路径——
  // 旧路径把回填存的原始文本原样导出（未折行超宽单行、>2 行、merged 尾行时间丢失全放行）。
  // 四层规则（与 buildBilingualParts 同框架，无源文参照）：
  //   R0 尊重已有折行：已含换行、≤maxLines 行且每行宽 ≤maxW+4 → 原样输出（保留用户手工折行）
  //   R1 微超宽单行：整段宽 ≤maxW+4 → 单行放下（避免折出 1-3 字寡行，与双语 R1 同口径）
  //   R2 常态折行：折后 ≤maxLines 行 → 直接输出
  //   R3 超容量切分：超出 maxW×maxLines 容量 → 按自然断点切 k 片 + repairThinSegs 修复饥饿段，
  //      子时间轴按各片宽度占比瓜分（时间跟着内容走）；段内仍超宽递增 k 重切（上限 k+10）
  // rows 口径与 buildBilingualParts 相同：'merged' 行并入承载行（end 延展），'drop'/空译文跳过。
  // 返回 [{no,start,end,text}]（text 可含 \n，与旧 mono 输出同构）。
  function buildMonoParts(rows, opts) {
    opts = opts || {};
    const maxW = (opts.maxW > 0) ? opts.maxW : 20;
    const maxLines = (opts.maxLines > 0) ? opts.maxLines : 2;
    const locale = opts.dstLocale || opts.locale;
    // 1) 汇集条目（与 buildBilingualParts 第 1 步同构）
    const entries = [];
    let last = null;
    for (const r of (rows || [])) {
      if (!r) continue;
      if (r.flag === 'drop') { last = null; continue; }
      if (r.flag === 'merged') {
        if (last && (r.end || 0) > last.end) last.end = r.end;   // 尾行时间并入承载行
        continue;
      }
      const rawZh = String(r.zh == null ? '' : r.zh);
      if (!rawZh.trim()) { last = null; continue; }
      last = { start: r.start || 0, end: r.end || 0, rawZh: rawZh, dst: squashLines(rawZh) };
      entries.push(last);
    }
    // 2) 逐条目 R0-R3
    const out = [];
    const emit = (st, en, text) => { out.push({ no: out.length + 1, start: st, end: en, text: text }); };
    for (const e of entries) {
      // SP 双 speaker（v0.9.25）：每行独立折行、绝不跨 speaker 切分/重分配时间轴
      if (isSpeakerText(e.rawZh)) {
        emit(e.start, e.end, foldSpeakerLines(e.rawZh, maxW, locale).join('\n'));
        continue;
      }
      // R0：已有折行合规 → 原样尊重（含用户在表格里手工调过的折行）
      const rawLines = e.rawZh.split('\n').map((s) => s.trim()).filter(Boolean);
      if (rawLines.length >= 1 && rawLines.length <= maxLines
          && rawLines.every((l) => textWidth(stripSoundTags(l)) <= maxW + 4)) {
        emit(e.start, e.end, rawLines.join('\n'));
        continue;
      }
      const dst = e.dst;
      const w = textWidth(stripSoundTags(dst));
      // R1：微超宽单行
      if (w <= maxW + 4) { emit(e.start, e.end, dst); continue; }
      // R2：常态折行
      const lines = wrapToWidth(dst, maxW, { normalize: true, locale: locale });
      if (lines.length <= maxLines) { emit(e.start, e.end, lines.join('\n')); continue; }
      // R3：超容量切分（k 片，饥饿段借字修复，段内超宽递增 k）
      const k0 = Math.max(2, Math.ceil(w / (maxW * maxLines)));
      const fitsAll = (ss) => ss.every((s) => !s || wrapToWidth(s, maxW, { normalize: true, locale: locale }).length <= maxLines);
      let segs = [];
      const kCap = k0 + 10;
      for (let k = k0; k <= kCap; k++) {
        segs = repairThinSegs(splitTextNatural(dst, k, locale), locale);
        if (fitsAll(segs)) break;
      }
      // 子时间轴按各片宽度占比瓜分（时间跟着内容走）
      const basis = segs.map((s) => Math.max(0.5, textWidth(stripSoundTags(String(s || '')))));
      const Wsum = basis.reduce((a, b) => a + b, 0) || 1;
      const total = Math.max(0, e.end - e.start);
      let cum = 0;
      for (let i = 0; i < segs.length; i++) {
        cum += basis[i];
        const subStart = i === 0 ? e.start : Math.round(e.start + total * (cum - basis[i]) / Wsum);
        const subEnd = i === segs.length - 1 ? e.end : Math.round(e.start + total * cum / Wsum);
        const dL = wrapToWidth(segs[i], maxW, { normalize: true, locale: locale });
        emit(subStart, subEnd, dL.join('\n'));
      }
    }
    return out;
  }

  // ---------------- 校验 ----------------
  function validateItems(items) {
    const issues = [];
    let prevEnd = -1, prevNo = 0;
    items.forEach((it) => {
      if (it.start > it.end) issues.push({ type: 'time', at: it.no, msg: '结束时间早于开始时间', code: 'endLtStart' });
      else if (it.start === it.end) issues.push({ type: 'time', at: it.no, msg: '零时长', code: 'zeroDur' });
      if (it.start < prevEnd - 1) issues.push({ type: 'overlap', at: it.no, msg: '与上一条时间轴重叠', code: 'overlap' });
      if (it.no <= prevNo) issues.push({ type: 'num', at: it.no, msg: '编号未递增', code: 'numInc' });
      if (!it.text || !it.text.trim()) issues.push({ type: 'empty', at: it.no, msg: '空内容', code: 'emptyCue' });
      prevEnd = it.end; prevNo = it.no;
    });
    if (!items.length) issues.push({ type: 'empty', at: 0, msg: '没有可用的字幕块', code: 'noUsable' });
    return issues;
  }

  // 语言锚定校验：判断译文文本是否符合目标语言的文种（纯函数，供批后校验调用）。
  // 背景：实测 DeepSeek 会间歇性地把整批日文译成中文（同 prompt 重发即恢复），
  // 批后用本函数校验、失败整批重试即可挡住这类事故。
  // 规则（保守，宁漏不误伤——专名/数字/外来语保留原文是合法译文）：
  //   zh-CN / zh-TW : 不得含日文假名或韩文谚文；
  //   ja            : 不得含谚文；含汉字时必须同时含假名（有汉字无假名 = 中文）；
  //   ko            : 不得含汉字或假名；
  //   其余目标语言   : 不得含 CJK（汉字/假名/谚文）。
  // 空文本视为通过（交给完整性校验处理）。
  const RE_HAN = /[\u3400-\u4dbf\u4e00-\u9fff]/;
  const RE_KANA = /[\u3040-\u30ff\u31f0-\u31ff]/;
  const RE_HANGUL = /[\u1100-\u11ff\uac00-\ud7af]/;
  function anchorOk(text, dst) {
    const s = String(text == null ? '' : text);
    if (!s.trim()) return true;
    const han = RE_HAN.test(s), kana = RE_KANA.test(s), hangul = RE_HANGUL.test(s);
    if (dst === 'zh-CN' || dst === 'zh-TW') return !kana && !hangul;
    if (dst === 'ja') return !hangul && !(han && !kana);
    if (dst === 'ko') return !han && !kana;
    return !han && !kana && !hangul;
  }

  // 已知混字词表（按目标语言隔离）：实测 DeepSeek 偶发在个别术语上写出汉字字面
  // （如泰文"ล้ำหน้า/前沿"被写成汉字"前沿"混在泰文里），锚定重试后仍不改的顽固组，
  // 在回填阶段做机械替换。只按 dst 命中本语言的表，其他语言零影响（中日韩译文里的
  // 合法汉字永远不会被碰）。发现新的混字案例往对应语言数组里追加即可。
  const MIXED_FIX = {
    th: [ ['前沿', 'ล้ำหน้า'] ]
  };
  function fixMixedChars(text, dst) {
    const s = String(text == null ? '' : text);
    const rules = MIXED_FIX[dst];
    if (!rules || !s) return s;
    let out = s;
    for (let i = 0; i < rules.length; i++) out = out.split(rules[i][0]).join(rules[i][1]);
    return out;
  }

  return {
    isFull, textWidth, wrapToWidth, atomicRanges, wordBounds,
    parseSrt, formatSrt, fmtTime, parseTime, renumber,
    parseVtt, formatVtt, fmtTimeVtt,
    parseAss, formatAss, fmtTimeAss, parseAssTime,
    formatTxt, detectFormat,
    isFillerCue, stripSoundTags,
    groupSentences, splitByDuration, mergeableGroup,
    splitTextNatural, splitAligned, splitCues, buildBilingual, buildBilingualParts, isSpeakerText,
    buildMonoParts, collapseThinTail, joinSeg, effChars,
    validateItems, anchorOk, fixMixedChars,
    MAX_W_DEFAULT: 20
  };
});
