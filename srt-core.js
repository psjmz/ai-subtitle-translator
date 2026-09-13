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
    return (c >= 0x2e80 && c <= 0x9fff) ||   // CJK 汉字 / 部首 / 假名
           (c >= 0x3000 && c <= 0x303f) ||   // CJK 标点（含全角空格）
           (c >= 0x1100 && c <= 0x11ff) ||   // 谚文字母 Jamo
           (c >= 0x3130 && c <= 0x318f) ||   // 谚文兼容字母
           (c >= 0xac00 && c <= 0xd7af) ||   // 谚文音节（v0.9.65：此前误并入 0x2e80-0x9fff 注释从未命中——音节实在此区间，全宽方块字）
           (c >= 0xff00 && c <= 0xffef) ||   // 全角字符
           c === 0x2018 || c === 0x2019 || c === 0x201c || c === 0x201d ||
           c === 0x2026 || c === 0x2014 || c === 0x00b7;
  }
  // v0.9.65：零宽字符——组合标记（\p{M}：泰文/天城文的元音符/声调/连接符，阿语哈拉克）
  // 与零宽连接符（ZWNJ/ZWJ）、软连字符均不占显示宽度，计 0（此前按 0.5 计导致 th 虚增 23%、hi 虚增 56%）。
  const RE_ZEROWIDTH = /[\p{M}\u200c\u200d\u00ad]/u;
  function charW(ch) {
    if (RE_ZEROWIDTH.test(ch)) return 0;
    return isFull(ch) ? 1 : 0.5;
  }
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
  // v0.9.65：断点/禁则标点表补非拉丁标点——阿语问号 ؟（U+061F）、天城文 danda ।॥（U+0964/0965）
  // 入 SENT_END；阿语逗号 ،（U+060C）、阿语分号 ؛（U+061B）入 CLAUSE；法/阿引号 » 入收尾符集。
  // 此前 v0.9.24 注释声称已含 ؟/।，实际字符串从未包含（文档与代码不符，本次实证补齐）。
  const SENT_END = '。！？…!?؟।॥';       // 5
  const CLAUSE   = '，、；;：:،؛';         // 4
  const CONJ_WORDS = ['换句话说', '也就是说', '然后', '但是', '不过', '所以', '因为', '而且',
    '还有', '其实', '如果', '并且', '以及', '因此', '另外', '此外', '甚至', '虽然', '尽管',
    '由于', '于是', '接着', '毕竟', '总之'];
  const CONJ_SINGLE = ['但', '而', '并', '却', '就', '才', '也', '又', '更', '再', '还', '只', '都', '则'];
  const PREP_WORDS = ['关于', '对于', '随着', '作为', '为了'];
  const PREP_SINGLE = ['在', '从', '把', '被', '让', '对', '跟', '与', '向', '为', '由', '将', '当'];
  const CLOSE_SET = '”’』】）》"\'»';      // v0.9.65：补法/阿语闭引号 »
  const CLOSE_FIRST = '”’』】）》\'，。！？、；：…»،؟।॥'; // 行首禁用的收尾符号（v0.9.65 补 »،؟।॥）
  // v0.9.50 行首禁则（kinsoku）：切点使下一段以这些字符开头时软惩罚（-260，低于标点断点优先级差、
  // 高于词边界加分），仅在同分择优时改变切点位置，不影响任何硬规则。
  // NS_HARD：任何情况下都不得作为段首——CJK 标点、日文小假名/长音符（正字法上不起词首）
  // NS_SOFT：独立成词（助词）时不得作为段首——「的」在「的确」中是词首不罚（Segmenter 整词判定），
  //          日文格助词は/が/を/に等同理（にほん 不罚、あなた|に 罚）
  const NS_HARD = '，。、；！？：…”’」』）)]}》»' + '،؟؛।॥' + 'っゃゅょぁぃぅぇぉゎ' + 'ー';
  const NS_SOFT = '的了着么呢吗吧啊呀哦啦嘛呗地得' + '里中内间旁' + 'はがをにでとへも';
  // v0.9.63：方位词「里/中/内/间/旁」补入 NS_SOFT——独立成块（开孔|里|嵌入）时不作段首，
  // 切点被推向方位词之前（「…开孔里 / 嵌入…」，里随其宿主词走）；「里面/中间/中国」等
  // 复合词整词成块不受影响（wb 整词判定，词首不罚）。

  function isAlnum(c) { return !!c && /[A-Za-z0-9]/.test(c); }

  // v0.9.51：跨行/跨 cue 拼接的空格判定（Unicode 感知）。
  // 旧判定仅认 ASCII 字母：西里尔等非拉丁字母跨行拼回直接粘连（实测俄语源 "тысячи\nчасов"
  // → "тысячичасов"，双语 ASS 原文行 15 处丢空格；groupSentences 的 joinSrc 同样中招，
  // 拼接结果就是送进模型的 prompt 文本）；标点后接词的接缝（"естественно,\nпрочитал"）
  // 连英语也中招（"interesting,\nright" → "interesting,right"）。规则（a 末字符 la、b 首字符 fb）：
  //   · 任一侧属无空格书写系统（CJK/假名/泰文）→ 不加空格；
  //   · la 是开括号/开引号/连字符/撇号/斜杠 → 粘附不加空格（"«Книга" "well-known" "don’t" "km/h"）；
  //   · 字母|字母（空格书写系统）→ 加空格；字母|闭标点 → 粘附（"словами»."）；字母|开标点 → 加空格；
  //   · 完成性标点（.,;:!?…— 等）|字母 → 加空格；标点|标点 → 不加。
  const RE_UNSPACED_SCRIPT = /[\u3000-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uff66-\uff9f\u0e00-\u0e7f]/;
  const RE_LETNUM_U = /[\p{L}\p{N}]/u;
  const RE_ATTACH_AFTER = /[([{«"'‘“„\u2019\/\-]/;
  const RE_OPEN_PUNCT = /[([{«"'‘“]/;
  function needJoinSpace(a, b) {
    if (!a || !b) return false;
    const la = a[a.length - 1], fb = b[0];
    if (RE_UNSPACED_SCRIPT.test(la) || RE_UNSPACED_SCRIPT.test(fb)) return false;
    if (RE_ATTACH_AFTER.test(la)) return false;
    // v0.9.51：法语省音判定——直撇号打头的段，前段以单字母省音词（l' d' j' n' s' c' m' t'）或 qu' 结尾时
    // 属缩合词被 cue 边界切开（l|'école），不加空格；英语 "get 'em" 不受影响（t 前是字母，非单字母省音）。
    if (fb === "'" && RE_LETNUM_U.test(la)) {
      const p2 = a[a.length - 2];
      if ('ldjncsmtLDJNCSMT'.includes(la) && (!p2 || !RE_LETNUM_U.test(p2))) return false;
      if (la === 'u' && p2 === 'q' && (!a[a.length - 3] || !RE_LETNUM_U.test(a[a.length - 3]))) return false;
    }
    if (RE_LETNUM_U.test(la)) return RE_LETNUM_U.test(fb) || RE_OPEN_PUNCT.test(fb);
    return RE_LETNUM_U.test(fb) || RE_OPEN_PUNCT.test(fb);   // 完成性标点|字母/开标点（":«" → ": «"）
  }
  // 空格书写系统的字母/数字（硬切劈词保护用）：CJK/泰文等无空格文字不算——它们允许任意位置切
  function isSpacedLetnum(c) { return !!c && RE_LETNUM_U.test(c) && !RE_UNSPACED_SCRIPT.test(c); }

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
    // v0.9.64：指示词「这/那」之后不给连接词断点——「这就是/那就是」是指示短语而非连接词，
    // 在其后断行必腰斩（实测：价格之上。这 / 就是他们弥补…）；PREP 同理一并豁免。
    if (ch === '这' || ch === '那') return 0;
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
    // 2) 避免劈开英文/数字词（v0.9.51：扩到全部空格书写系统——西里尔/希腊/阿拉伯等字母词
    //    同样不可劈；CJK/泰文仍允许任意切）
    if (c > 0 && c < n && isSpacedLetnum(pos[c - 1]) && isSpacedLetnum(pos[c])) {
      let j = c - 1;
      while (j > 0 && isSpacedLetnum(pos[j - 1])) j--;
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
    maxW = (maxW > 0) ? maxW : 21;
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
      const needSpace = needJoinSpace(out, ln);   // v0.9.51：Unicode/书写系统感知（西里尔丢空格修复）
      out += (needSpace ? ' ' : '') + ln;
    }
    return out;
  }

  // v0.9.52：LLM 偶发把闭引号放在单独一行（译文 "他说：...\n”"）。仅由闭标点（”’"»）等）组成的行
  // 并入前一行——闭标点永远贴前词，直接相接不加空格。省略号/♪ 等独立符号行不在此列（可能是刻意的停顿行）。
  function mergePunctOnlyLines(src) {
    const lines = String(src == null ? '' : src).replace(/\r/g, '').split('\n');
    const out = [];
    for (const ln of lines) {
      const core = ln.trim();
      if (out.length && core && /^["'”’»）)】\]」』》]+$/u.test(core)) {
        out[out.length - 1] = out[out.length - 1].trimEnd() + core;
      } else out.push(ln);
    }
    return out.join('\n');
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
  // events：[{start,end,lines:[{style,text,mv?}]}]
  // 样式按「角色 × 位置」正交（v0.9.35：字号跟角色走，位置跟模式走——译文恒为主阅读样式）：
  //   主语言（译文）：白色 56pt —— Bottom（底部居中 an2，主阅读位）/ TopMain（顶部居中 an8，译文在上时用）
  //   副语言（原文）：金黄 50pt —— Top（顶部居中 an8）/ Sub（底部居中 an2，MarginV 可逐条动态指定）
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
      'Style: Top,PingFang SC,50,&H0000D7FF,&H000000FF,&H00000000,&H64000000,0,0,0,0,100,100,0,0,1,2.5,0,8,60,60,42,1',
      // TopMain（v0.9.35）：主语言顶部样式——外观与 Bottom 一致（白 56pt），仅对齐方式为顶部居中（an8）。
      // 「译文在上」分屏模式下译文用本样式，保证译文无论在哪都保持主阅读字号。
      'Style: TopMain,PingFang SC,56,&H00FFFFFF,&H000000FF,&H00000000,&H64000000,-1,0,0,0,100,100,0,0,1,2.5,0,8,60,60,42,1',
      // Sub：底部双行 / 副语言落底样式（v0.9.17，v0.9.35 提号到 50pt）——外观与 Top 一致（金黄）但对齐方式为底部居中，
      // 实际纵向位置由每条 Dialogue 的 MarginV（ln.mv）动态指定；mv=0 时回退样式默认 MarginV=42。
      'Style: Sub,PingFang SC,50,&H0000D7FF,&H000000FF,&H00000000,&H64000000,0,0,0,0,100,100,0,0,1,2.5,0,2,60,60,42,1',
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
        const st = ['Top', 'TopMain', 'Sub'].includes(ln.style) ? ln.style : 'Bottom';
        // v0.9.41 歌词斜体：含 ♪/♫ 的行按行业惯例（Netflix TTSG：italicize lyrics）加内联斜体标记，
        // 不新增样式（{\i1}/{\i0} 内联覆盖对所有现有样式生效；SRT/VTT/TXT 纯文本路径不受影响）。
        const musicLine = /[♪♫]/.test(tx);
        evLines.push('Dialogue: ' + i + ',' + fmtTimeAss(ev.start) + ',' + fmtTimeAss(ev.end) + ',' +
          st + ',,0,0,' + (ln.mv > 0 ? Math.round(ln.mv) : 0) + ',,' + (musicLine ? '{\\i1}' + tx + '{\\i0}' : tx));
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

  // speaker 行独立折行：每行 ≤ maxW+10 直放（v0.9.69 放宽，用户方案——双说话人单行
  // 逻辑上不长，超宽才在该行内部折行）；speaker 边界神圣——绝不跨行重分配、绝不切分时间轴。
  function foldSpeakerLines(text, maxW, locale) {
    const out = [];
    for (const ln of String(text == null ? '' : text).replace(/\r/g, '').split('\n')
      .map((s) => s.trim()).filter(Boolean)) {
      if (textWidth(stripSoundTags(ln)) <= maxW + 10) { out.push(ln); continue; }
      out.push.apply(out, wrapToWidth(ln, maxW, { normalize: true, locale: locale }));
    }
    return out;
  }

  // v0.9.69：speaker 单行合并（用户方案，仅双语导出使用）——多行 dash 结构压成单行
  // "- A - B"（说话人之间空格分隔），dash 间距顺手归一（源文 "-No" 型无空格统一为 "- "，
  // 一并修复 cue 18 型间距不一致）。单行输入原样返回（行内 dash 已是目标形态）；
  // 多行但非全 dash 开头 → 返回 null（结构不适合合并，由调用方回退 2+2 布局）。
  function mergeSpeakerLine(text) {
    const raw = String(text == null ? '' : text).replace(/\r/g, '').trim();
    if (!raw) return '';
    const lines = raw.split('\n').map((s) => s.trim()).filter(Boolean);
    if (lines.length <= 1) return lines[0] || raw;
    if (!lines.every((l) => SP_DASH_RE.test(l))) return null;
    return lines.map((l) => l.replace(/^([-–—])\s*/, '$1 ')).join(' ');
  }

  // v0.9.38：模型偶发丢掉 speaker 换行（把 "\n- " 压成行内 "- "，规则 6 例外失守），
  // 折行会把第二个说话人的 dash 折进行尾。修复窄门：源是 K 行 dash 对话、译文无换行、
  // 按行内 dash 切出的段数恰好 = K → 机械补回换行；段数对不上原样返回（宁错放不错改）。
  // v0.9.42：切分改两阶段。严格阶段 = 原句读/空白白名单；宽松阶段补拉丁字母边界
  // （cue 10 型「艾莉·M- 对」，三语言复现）：字母/间隔号 · 后紧跟半角连字符 -、
  // 且 dash 后跟空白才放行——数字区间 "20-30"（前是数字）、"U.S.-style"（后无空白）、
  // 行文破折号 "wait— what"（— 不在放宽范围）均不受影响；仍受段数守卫约束。
  function splitFlatSpeakerParts(s, expected, strictRe) {
    let parts = s.split(strictRe).filter((x) => x.trim());
    if (parts.length === expected) return parts;
    // 宽松阶段 lookbehind 含 ^：消费行首 dash（与严格阶段一致），避免「- - 甲」双前缀
    parts = s.split(/(?<=[A-Za-z·]|^)-(?=\s+)/).filter((x) => x.trim());
    if (parts.length === expected) return parts;
    return null;
  }
  function repairSpeakerLines(dst, src) {
    const raw = String(dst == null ? '' : dst).replace(/\r/g, '').trim();
    if (!raw) return raw;
    const srcLines = String(src == null ? '' : src).replace(/\r/g, '').split('\n')
      .map((x) => x.trim()).filter(Boolean);
    if (srcLines.length < 2 || !srcLines.every((l) => SP_DASH_RE.test(l))) return raw;
    // v0.9.42：模型手动折行（违反规则 6 的 \n）不再短路修复——此前「有 \n 就跳过」让折行混过
    // （实测 zh-TW 13 条 speaker 有 11 条带折行 \n 全部漏修）。已是正确 dash 结构的才跳过；
    // 否则压平 \n 后走两阶段切分；切不出段数吻合的边界按原样返回（宁错放不错改）。
    if (isSpeakerText(raw)) return raw;
    // 折行 \n 压平（squashLines 语言感知拼缝：字母数字间补空格、CJK 标点后不补）
    const s = squashLines(raw);
    // 行内 dash 分隔：dash 前是句读/空白/行首（lookbehind 保留句读，防误伤 "20-30" 等无空格连字符）
    const parts = splitFlatSpeakerParts(s, srcLines.length, /(?<=[\s。．，,！？!?…；;）)】」』"”]|^)\s*[-–—]\s+/);
    if (!parts) return raw;
    const dash = (srcLines[0].match(/^[-–—]/) || ['-'])[0];
    return parts.map((p) => dash + ' ' + p.trim()).join('\n');
  }

  // v0.9.39（仅 mono 导出镜像，cue 57 案例）：源 cue 为 K≥2 行 dash 结构、译文被模型压成单行时，
  // 按行内 dash 边界切回 K 段，镜像源的多行结构。与回填侧 repairSpeakerLines 的差别：
  //   ①dash 后允许无空格（模型偶发输出「-♪」，回填侧 \s+ 匹配不上而放行）；
  //   ②只改导出副本——不动 S.rows 数据、不影响双语/ASS 路径。
  // 段数不匹配则原样返回（宁错放不错改）。v0.9.42 起与回填侧共用两阶段切分（拉丁字母边界放宽）
  // 与同款守卫修正：模型手动折行的 \n 不再短路镜像（cue 10「…- 有，\n我們…」实测曾漏修）。
  function mirrorSpeakerLines(dst, src) {
    const raw = String(dst == null ? '' : dst).replace(/\r/g, '').trim();
    if (!raw) return raw;
    const srcLines = String(src == null ? '' : src).replace(/\r/g, '').split('\n')
      .map((x) => x.trim()).filter(Boolean);
    if (srcLines.length < 2 || !srcLines.every((l) => SP_DASH_RE.test(l))) return raw;
    if (isSpeakerText(raw)) return raw;   // 已是正确 dash 结构 → 不动
    const s = squashLines(raw);           // 折行 \n 压平后重试（语言感知拼缝）
    // dash 前须句读/空白/行首（lookbehind 防误伤 "20-30" 等无空格连字符），dash 后容忍零空格；
    // ♪♫ 放行（「♪- 哦」音乐行+对白边界，cue 15 案例）；
    // 半角句点 . 与印地 danda ।॥、阿语 ，؟؛ 放行——对白边界的 21 语言覆盖（cue 10 型，18 语言曾因缺 . 切不开）
    const parts = splitFlatSpeakerParts(s, srcLines.length, /(?<=[\s.。．，,！？!?…；;）)】」』"”♪♫।॥،؟؛]|^)\s*[-–—]\s*/);
    if (!parts) return raw;
    const dash = (srcLines[0].match(/^[-–—]/) || ['-'])[0];
    return parts.map((p) => dash + ' ' + p.trim()).join('\n');
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
    const needSpace = needJoinSpace(a, b);   // v0.9.51：Unicode/书写系统感知（拼接结果即 prompt 文本）
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
      // v0.9.38：音乐符号行不与对白互并——歌词行结尾常无句末标点（"…believe in ♪"），
      // endsSentence 判"句子未完"会把下一条对白吸进同一句组，译文错位到错误时间窗（实测：歌词行吸进对白 "Yo, yo."）
      const mus = RE_MUSIC.test(String(it.text || ''));
      if (mus) {
        if (effChars(String(it.text || '')) > 0) {
          // 歌词行：可与相邻歌词行同组（保留歌曲上下文），与对白互斥
          if (cur && !cur.music) flush();
        } else {
          // 纯标记行（只有 ♪ 无歌词）：独立成组，不与任何相邻 cue 合并
          flush();
          groups.push({ gno: groups.length + 1, cues: [it], text: String(it.text), music: true });
          continue;
        }
      } else if (cur && cur.music) {
        flush();
      }
      const txt = String(it.text || '').trim();
      if (!txt) continue;
      if (cur && (cur.cues.length >= maxCues || textWidth(joinSrc(cur.text, txt)) > maxWidth)) flush();
      if (!cur) cur = { cues: [], text: '', music: mus };
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
    // v0.9.50 行首禁则惩罚：候选切点 i 使下一段以 NS_HARD/NS_SOFT（独立成词的助词）开头时减 260 分。
    // NS_SOFT 的独立成词判定：i 是词边界且下一词边界就在 i+1（助词自成一个分词块）；「的确」「了解」
    // 「得到」「にほん」等词首场景整词成块、不罚。wb 不可用时（无分词器）保守罚全部 NS_SOFT。
    const noStartPenalty = (i) => {
      const c = pos[i] || '';
      if (NS_HARD.includes(c)) return 260;
      if (!NS_SOFT.includes(c)) return 0;
      if (!wb) return 260;
      if (!wb.has(i)) return 0;               // 词内部：本就不会被选（eff=0 已挡）
      let j = i + 1;
      while (j < pos.length && !wb.has(j)) j++;
      return j === i + 1 ? 260 : 0;            // 助词独立成块 → 罚
    };
    // v0.9.64 悬尾/碎块惩罚（Gurman 折叠屏二代实测）：
    //  a) 1|1 单字块：切口两侧均为单字词块（「嵌|件」「开|孔」）——技术词（陶瓷嵌件/开孔）不在
    //     分词词典里，词典边界保护对它失效，两侧皆单字块几乎必是复合词腰斩，直接罚；
    //  b) 指示词悬尾：切口左侧是独立成块的单字「这/那」（「这|一切」「这|就是」「这|是」）——
    //     指示词必须与其右邻成分连读，悬在段尾等价于腰斩，重罚（可压过连接词前切的 +300 加分）。
    const hangEndPenalty = (i) => {
      if (!wb || !wb.has(i) || i <= 0) return 0;
      let a = i - 1; while (a > 0 && !wb.has(a)) a--;
      const lenL = i - a;
      let b = i + 1; while (b < pos.length && !wb.has(b)) b++;
      const lenR = b - i;
      const isW = (c) => /[\p{L}\p{N}]/u.test(c || '');
      if (lenL === 1 && isW(pos[i - 1])) {
        if (pos[i - 1] === '这' || pos[i - 1] === '那') return 220;      // b) 指示词悬尾
        if (lenR === 1 && isW(pos[i])) return 30;                        // a) 1|1 单字块
      }
      return 0;
    };
    // v0.9.68 多词专名腰斩惩罚（Mayday 21 语言实测：ja/fil 的 "Cabbage | Patch dolls" 被劈两半）：
    // 切点落在两个首字母大写的拉丁词之间（Cabbage|Patch、Red|Hook）几乎必是劈开了多词专名
    // （人名/地名/品牌/作品名）。罚 110 分——足以让位给窗口内相邻词边界（宽度项通常 ≤6），
    // 但不覆盖词边界加分（150）与句子级断点，切点仍可落回词边界；左侧为小写词
    // （of those|Cabbage，专名起点前）或句读（insane.|You）不受罚。
    const properMidPenalty = (i) => {
      if (i <= 0 || i >= pos.length) return 0;
      if (!/[A-Z]/.test(pos[i])) return 0;                 // 右侧须为小写字母前的 Titlecase 词首
      const prev = pos[i - 1];
      if (prev !== ' ' && prev !== '\u3000') return 0;      // 切点须在词间空格处
      let j = i - 2;
      while (j >= 0 && /[A-Za-z'’]/.test(pos[j])) j--;
      if (j === i - 2) return 0;                           // 左侧无词（连续空格/句读）
      return /[A-Z]/.test(pos[j + 1]) ? 110 : 0;           // 左侧词同样大写开头 → 专名内部，罚
    };
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
          + (i > 0 && CLOSE_SET.includes(pos[i - 1]) ? 40 : 0)  // v0.9.51：闭引号/闭括号归前段（破平局：...friend?|" she → ...friend?"|she）
          - Math.abs(pref[i] - target)
          - noStartPenalty(i)             // v0.9.50：行首禁则（的地得/助词/小假名不起行）
          - hangEndPenalty(i)             // v0.9.64：悬尾/碎块（这/那悬尾、1|1 单字块复合词腰斩）
          - properMidPenalty(i);          // v0.9.68：多词专名内部（Cabbage|Patch）
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
    // v0.9.49：纯标点/饥饿段修复（复用 R3 路径的 repairThinSegs）——实测事故：句组末尾闭引号 ”
    // 被切点单独成段（0.4s 镜头只挂一个引号），段"非空"逃过上方空段保底。修复：无实词（≤2 有效字）
    // 的段向最长的邻段整词借字（连同附着标点），与前述保底互补；全组皆短时无 ≥6 有效字的施主、不借。
    return repairThinSegs(out, opts.locale);
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
    const maxW = (opts.maxW > 0) ? opts.maxW : 21;
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
    const maxW = (opts.maxW > 0) ? opts.maxW : 21;
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

  // ---------------- 音乐符号行（v0.9.37）----------------
  // 唱歌行首尾的 ♪/♫ 只是「正在唱歌」的标记，不是内容。评测发现模型两类偶发事故：
  //  a) 只回 ♪♪ 丢掉整句歌词（纯符号能通过 anchorOk，静默漏网）；
  //  b) 首尾符号丢失或叠成 ♪♪。以下两个纯函数在回填前统一纠正。
  const RE_MUSIC = /[♪♫♬♩]/;

  // 纯哼唱判别（v0.9.76）：音乐组被模型判 drop 后，若源文每个词都是感叹词（oh/la/na/mm/啦/哦…），
  // 判纯哼唱 → 直接接受 drop，跳过单组救援（v0.9.47 实测纯哼唱救援必失败，白付一次 API 往返）。
  // 设计原则（fail-safe）：①词表外一律返回 false（走原救援通道），宁可多救不误删；
  // ②实词（love/Jude/tonight…）必返回 false；③仅作用于「模型已判 drop 的音乐组」这条小径。
  // 词表按源语言组织（判别发生在译文产出前），目前覆盖拉丁系通用感叹词 + 中日韩常见哼唱字，
  // 未覆盖语言自然退回救援行为，不会出错
  const HUM_WORDS = new Set((
    'm,oh,ah,la,na,ha,eh,uh,hm,mm,wo,ay,ho,hey,yeah,yay,hum,mhm,' +
    '啦,哦,喔,噢,嗯,呃,嘿,呜,咦,啊,呀,诶,唔,哈,哟,噜,嘟,' +
    'あ,え,う,ん,お,ら,り,る,れ,ろ,ラ,リ,ル,レ,ロ,ワ,' +
    '라,아,오,에,우,음,허'
  ).split(','));
  function isPureHumming(text) {
    let s = String(text == null ? '' : text)
      .replace(/[♪♫♬♩]/g, ' ')   // 音乐符号不是词
      .replace(/[\u30FC\uFF70]/g, ' ') // 日文长音符（あー 的 ー）是发音延长标记，不是字
      .replace(/\[\d+\]/g, ' ')   // [N] 歌词编号标记不是词
      .toLowerCase();
    // CJK/假名无空格分词，按单字成词
    s = s.replace(/([\u3040-\u30FF\u4E00-\u9FFF\uAC00-\uD7AF])/g, ' $1 ');
    const words = s.split(/[^a-z\u00C0-\u024F\u3040-\u30FF\u4E00-\u9FFF\uAC00-\uD7AF]+/).filter(Boolean);
    if (!words.length) return false;  // 无 token：交回原判定（纯符号已由 effChars 过滤）
    return words.every((w) =>
      HUM_WORDS.has(w) ||
      HUM_WORDS.has(w.replace(/(.)\1+/g, '$1')) ||          // ohhh→oh, mmmm→m
      HUM_WORDS.has(w.replace(/(.{1,3}?)\1+/g, '$1'))       // lalala→la, ohohoh→oh
    );
  }
  // 丢词判定：译文剥离音乐符号/标点/空白后无实词，而源仍有实词 → 判丢词（触发重试/missing）
  function musicLost(dst, src) {
    const d = String(dst == null ? '' : dst).replace(/[♪♫♬♩\s\p{P}\p{S}]/gu, '');
    if (d) return false; // 译文还有实词，没丢
    const s = String(src == null ? '' : src).replace(/[♪♫♬♩\s\p{P}\p{S}]/gu, '');
    return s.length > 0;  // 源有实词、译文没有 → 丢词
  }
  // 归一化：①折叠紧邻重复符号（♪♪ / ♪ ♪ → ♪）②源首尾有符号而译文丢失 → 用源符号补回。
  // 只动首尾锚定与紧邻重复，行中间的单个符号不碰；源本身无符号的行零影响。
  // v0.9.45b：单行修复——dash 行首（"- ♪ xxx"）的 ♪ 在整串逻辑里恢复不到（串首是 '-'），
  // 行首符号感知可选 dash 前缀，行尾照旧；折叠重复符号每行独立做
  function normalizeMusicLine(dl, sl) {
    let s = String(dl == null ? '' : dl).trim();
    if (!s) return s;
    s = s.replace(/([♪♫♬♩])(\s*\1)+/g, '$1');
    const srcS = String(sl == null ? '' : sl).trim();
    const mh = srcS.match(/^(-\s*)?([♪♫♬♩])\s*/);
    const mt = srcS.match(/\s*([♪♫♬♩])\s*$/);
    if (mh) {
      const dm = s.match(/^(-\s*)/);
      const afterDash = dm ? s.slice(dm[1].length) : s;
      if (!RE_MUSIC.test(afterDash[0] || '')) s = (dm ? dm[1] : '') + mh[2] + ' ' + afterDash;
    }
    if (mt && !RE_MUSIC.test(s[s.length - 1] || '')) s = s + ' ' + mt[1];
    return s;
  }

  function normalizeMusic(dst, src) {
    const d = String(dst == null ? '' : dst);
    const srcS0 = String(src == null ? '' : src);
    // 多行结构（speaker dash 行等）且行数对齐 → 逐行修复（整串只补首尾，行中行的行首行尾恢复不到）
    if (/\n/.test(srcS0) && /\n/.test(d) && d.split('\n').length === srcS0.split('\n').length) {
      return d.split('\n').map((x, i) => normalizeMusicLine(x, srcS0.split('\n')[i])).join('\n');
    }
    return normalizeMusicLine(d, srcS0);
  }

  // v0.9.42：音乐组歌词行对齐切分。音乐句组（多条歌词 cue 合并翻译）按时长比例回填会把
  // ♪ 边界切开——实测 zh-TW 出现只剩「♪」的孤行（歌词被挪到下一条）、18/21 语言行中夹 ♪、
  // fr 歌词被切在词中间。译文里的 ♪…♪ 天然是歌词行边界，本函数把整组译文切回 n 条歌词行：
  //   形态 A（配对）：模型按行输出「♪ A' ♪ ♪ B' ♪」——2n 个符号配 n 对，配对之外须无实词残余；
  //   形态 B（折叠）：normalizeMusic 把相邻「♪ ♪」折叠后只剩 n+1 个符号（首尾各一），
  //                  相邻符号间的文本即该行歌词，行首尾符号复用边界符号；
  //   其余情形（段数不符 / 空段 / 混入对白）→ 返回 null，调用方回落时长切分（宁回落不冒险）。
  function splitMusicLines(text, n) {
    const s = String(text == null ? '' : text).replace(/\r/g, '').replace(/\n/g, ' ').trim();
    if (!s || !(n >= 2)) return null;
    const PAIR = /[♪♫♬♩][^♪♫♬♩]*[♪♫♬♩]/g;
    // 形态 A：n 个完整配对段，且剥离配对后无实词残余（防歌词外夹对白被丢）
    const pairs = s.match(PAIR) || [];
    if (pairs.length === n) {
      const rest = s.replace(PAIR, '');
      if (!effChars(rest) && pairs.every((x) => effChars(x) > 0)) return pairs.map((x) => x.trim());
    }
    // 形态 B：恰好 n+1 个符号、首尾皆为符号 → 折叠形态
    const arr = Array.from(s);
    const idx = [];
    for (let i = 0; i < arr.length; i++) if (RE_MUSIC.test(arr[i])) idx.push(i);
    if (idx.length === n + 1 && idx[0] === 0 && idx[idx.length - 1] === arr.length - 1) {
      const out = [];
      for (let k = 0; k < n; k++) {
        const mid = arr.slice(idx[k] + 1, idx[k + 1]).join('').trim();
        if (!effChars(mid)) return null;
        out.push(arr[idx[k]] + ' ' + mid + ' ' + arr[idx[k + 1]]);
      }
      return out;
    }
    return null;
  }

  // ---------------- 音乐帧：符号不进模型（v0.9.45）----------------
  // 设计：♪/♫/♬/♩ 完全不发给模型。发送前把源文拆成「符号序列 + 正文段」，正文段用
  // [1][2]… 编号发给模型；译文回来后按编号映射回填、符号按源文顺序原样复原。
  // 模型从此见不到 ♪，从根上杜绝「丢符号/叠符号/符号错位」整类事故
  // （v0.9.37 musicLost / v0.9.42 splitMusicLines 系列修补的共同根因：模型不可靠地搬运符号）。
  // 含换行（dash 多行 speaker 结构）的文本不适用，返回 null 走旧路径。

  // 拆帧：无音乐符号 → null；否则
  // { items: [{mark:'♪'} | {text:' Love '}],           // 源文按符号/正文切开的完整序列
  //   segs:  [{itemIdx, text}],                        // 有实词的正文段（发给模型的部分）
  //   plainText: '[1] Love is in the air [2] ...' }    // 模型实际看到的 merged
  // v0.9.45b：cue 内部换行不再拒收（歌词 cue 几乎都是多行，\n 当空白归一化）——
  // 此前含 \n 的组整组跳回旧路径，♪ 照发模型，新机制对真实歌词组基本失效
  function extractMusicFrames(src) {
    const s = String(src == null ? '' : src).replace(/\r/g, '');
    if (!RE_MUSIC.test(s)) return null;
    const items = [];
    const re = /([♪♫♬♩]+)|([^♪♫♬♩]+)/g;
    let m;
    while ((m = re.exec(s)) !== null) {
      if (m[1]) { for (const ch of m[1]) items.push({ mark: ch }); }
      else items.push({ text: m[2] });
    }
    const segs = [];
    items.forEach((it, i) => {
      if (it.text != null && it.text.trim()) segs.push({ itemIdx: i, text: it.text.trim() });
    });
    const plainText = segs.map((sg, n) => '[' + (n + 1) + '] ' + sg.text.replace(/\s+/g, ' ').trim()).join(' ');
    return { items, segs, plainText };
  }

  // v0.9.45b：清洗译文中残留的分段编号 [N]（含全角变体）——模型偶发把规则 5.5 的编号
  // 带进「无编号输入」的输出（实测：单 cue 歌词组凭空出现 [7]/[9]），旧路径切分会把标记切成两半
  // v0.9.46：空白归一化保留换行——此前调用方用 \s+ 压平会把多行 speaker 结构压成单行，
  // normalizeMusic 的逐行修复（要求行数对齐）失效 → 第二行行首 ♪ 丢失（实测 fr 等 14 语言）
  function stripSegMarkers(s) {
    return String(s == null ? '' : s)
      .replace(/[［【[]\s*[0-9０-９]+\s*[\]】］]/g, ' ')
      .replace(/[^\S\n]+/g, ' ')
      .replace(/ *\n */g, '\n')
      .replace(/\n{2,}/g, '\n')
      .trim();
  }

  // 源文是否含 [N] 分段编号（决定 stripSegMarkers 是否安全：源文本就有编号时不能清）
  function hasSegMarkers(s) {
    return /[［【[]\s*[0-9０-９]+\s*[\]】］]/.test(String(s == null ? '' : s));
  }

  // 解析模型输出的分段编号：容忍 [1] / 【１】 / ［1］ 等变体；返回 {1:'…',2:'…'}，无编号返回 null
  function parseSegMarkers(out) {
    const s = String(out == null ? '' : out);
    const half = (d) => d.replace(/[０-９]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xFEE0));
    const re = /[［【[]\s*([0-9０-９]+)\s*[\]】］]/g;
    const marks = [];
    let m;
    while ((m = re.exec(s)) !== null) {
      const n = parseInt(half(m[1]), 10);
      if (n) marks.push({ n, start: m.index, end: m.index + m[0].length });
    }
    if (!marks.length) return null;
    const res = {};
    for (let i = 0; i < marks.length; i++) {
      const from = marks[i].end;
      const to = (i + 1 < marks.length) ? marks[i + 1].start : s.length;
      const piece = s.slice(from, to).replace(/\s+/g, ' ').trim();
      if (res[marks[i].n] == null) res[marks[i].n] = piece; // 首个优先（模型偶发重复编号）
    }
    return res;
  }

  // 按源文段权重把整段译文切成 n 段（[N] 解析失败时的兜底）：按显示宽度比例定位，
  // 在 ±25% 范围内优先找标点/空格边界，找不到就地硬切（宁切口正不丢内容）
  function splitByWeights(text, weights) {
    const s = String(text == null ? '' : text).trim();
    const n = weights.length;
    if (n <= 1 || !s) return Array.from({ length: n }, (_, i) => (i === 0 ? s : ''));
    const total = weights.reduce((a, b) => a + b, 0) || 1;
    const BOUND = /[\s，。、！？；：…·,.!?;:]/;
    const cuts = [];
    let cum = 0;
    for (let i = 0; i < n - 1; i++) {
      cum += weights[i];
      const t = Math.round(s.length * cum / total);
      const lo = Math.max(1, Math.floor(t * 0.75)), hi = Math.min(s.length - 1, Math.ceil(t * 1.25));
      let cut = Math.min(Math.max(t, lo), hi);
      outer:
      for (let d = 0; d <= Math.max(t - lo, hi - t); d++) {
        if (t - d >= lo && BOUND.test(s[t - d])) { cut = t - d + 1; break outer; } // 标点归左段
        if (t + d <= hi && BOUND.test(s[t + d])) { cut = t + d + 1; break outer; }
      }
      cuts.push(Math.min(Math.max(cut, 1), s.length - 1));
    }
    const out = [];
    let prev = 0;
    for (const c of cuts) { out.push(s.slice(prev, c).trim()); prev = c; }
    out.push(s.slice(prev).trim());
    return out;
  }

  // 复原：translated 为模型输出（[N] 分段或整段），frames 为 extractMusicFrames 的返回。
  // 成功 → 符号按源文序列原样复原的完整译文；失败 → null（上层回落 normalizeMusic 旧路径）。
  // 注意：复原结果不要再过 normalizeMusic——相邻帧的「♪ ♪」是正确结构，会被折叠破坏。
  function reassembleMusic(translated, frames) {
    if (!frames || !frames.segs || !frames.segs.length) return null;
    const raw = String(translated == null ? '' : translated).trim();
    if (!raw) return null;
    const n = frames.segs.length;
    const map = parseSegMarkers(raw);
    let pieces = null;
    if (map) {
      const cand = frames.segs.map((sg, i) => {
        const v = map[i + 1];
        return (v != null && String(v).trim()) ? String(v).trim() : null;
      });
      if (cand.every((p) => p != null)) pieces = cand; // 编号齐全，精确映射
    }
    if (!pieces) {
      // 兜底：剥掉所有编号标记，整段译文按源文段权重切分（模型漏编号/格式跑偏时不丢内容）
      const stripped = raw.replace(/[［【[]\s*[0-9０-９]+\s*[\]】］]/g, ' ').replace(/\s+/g, ' ').trim();
      if (!stripped) return null;
      pieces = splitByWeights(stripped, frames.segs.map((sg) => textWidth(sg.text) || sg.text.length || 1));
    }
    let segNo = 0, out = '';
    for (const it of frames.items) {
      if (it.mark) out += it.mark;
      else if (it.text != null && it.text.trim()) out += ' ' + pieces[segNo++] + ' ';
      else out += ' ';
    }
    return out.replace(/\s+/g, ' ').trim();
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
    const maxW = opts.maxW > 0 ? opts.maxW : 21;
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
          // v0.9.64：附着助词不作借出单位——「的/了…」右依附左侧宿主，随借字移动会让受段以助词开头
          // （实测：借走「溢价，」后循环继续 pop 出「的」→ 受段「的溢价，加在…」行首悬着「的」）。
          // 推回施主、终止借词（受段宁可薄一点也不以助词开头）。
          const plainL = unit.replace(/[^\p{L}\p{N}]/gu, '');
          if (plainL.length === 1 && (NS_SOFT.indexOf(plainL) >= 0 || NS_HARD.indexOf(plainL) >= 0)) {
            chunks.push(unit);
            break;
          }
          moved.unshift(unit);
        } else {     // 借头：头部的词连同其后紧邻标点一起移动
          // v0.9.50 修复：旧断点条件「字母块后跟字母块」在空格语言永不成立（词间总有空格块），
          // 导致整个邻段被一次性搬空（西语实测 38 字符挤进 1s 短 cue）。改为：吃到词后，
          // 只继续吞紧邻标点，遇空格/下一词即止。CJK 无空格块，行为不变（词+紧邻标点）。
          let unit = '', sawWord = false;
          while (chunks.length) {
            const c = chunks[0];
            const isW = /[\p{L}\p{N}]/u.test(c);
            if (isW && sawWord) break;                       // 下一词：停
            if (!isW && sawWord && /^\s+$/.test(c)) break;   // 词后空格：词结束（空格语言的边界）
            if (isW) sawWord = true;
            unit += chunks.shift();
          }
          if (!unit) break;
          // v0.9.64：指示词不作借出单位——「这/那」必须与其右邻成分连读（这|一切、这|就是），
          // 从施主头部借走会让受段以悬尾「这」收接、施主以「就是…」开头，制造腰斩。推回、终止。
          const plainR = unit.replace(/[^\p{L}\p{N}]/gu, '');
          if ((plainR === '这' || plainR === '那') && chunks.length) {
            chunks.unshift(unit);
            break;
          }
          moved.push(unit);
        }
      }
      // v0.9.63 孤儿短词收编（借尾向）：借词后若施主尾巴仍悬着 ≤2 有效字的非附着短词
      // （实测事故：借走「一件事，」后施主剩「他们做的另」，词典把「另/一件事」切成两个词，
      // 意群被腰斩），把它随借字一并移走。附着性助词（NS_SOFT，右依附）不收编；最多收 2 块；
      // 施主至少保留 3 个有效字；收编后受段不得以助词开头。
      if (j < i) {
        let ext = 0;
        while (chunks.length && ext < 2) {
          const tail = chunks[chunks.length - 1];
          if (!/[\p{L}\p{N}]/u.test(tail)) break;             // 标点/空白块：已到句读，停
          if (eff(tail) > 2) break;                           // 只收编 ≤2 有效字的短词
          if (NS_SOFT.indexOf(tail) >= 0 || NS_HARD.indexOf(tail) >= 0) break;
          if (eff(chunks.slice(0, -1).join('')) < 3) break;   // 施主保底
          if (moved.length && NS_SOFT.indexOf(String(moved[0]).charAt(0)) >= 0) break;
          chunks.pop();
          moved.unshift(tail);
          ext++;
        }
      }
      if (!moved.length) continue;
      // v0.9.51：借词与原段的拼接统一走 needJoinSpace（v0.9.50 的 glue 只补「字母|字母」接缝，
      // 「借出词带尾逗号 + 饥饿段字母开头」类接缝仍会粘连；CJK/泰文不受影响）
      const glue = (a, b) => needJoinSpace(a, b) ? a + ' ' + b : a + b;
      if (j < i) { segs[j] = chunks.join('').trim(); segs[i] = glue(moved.join(''), segs[i]).trim(); }
      else { segs[j] = chunks.join('').trim(); segs[i] = glue(segs[i], moved.join('')).trim(); }
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
  // v0.9.68 sliver 子 cue 保护（Mayday ja 实测：R3 细切产生 0.063s 子 cue，CPS 爆表无法阅读）。
  // 根因：按 basis 宽度占比瓜分 [st,en] 时，basis 严重偏斜（饥饿段被 0.5 兜底抬高后仍极小）
  // 会让相邻计算边界贴近到几十毫秒。修复：边界生成后做间距收敛——
  //   a) 与前一保留边界距离 < 200ms 的边界删除（该段并入前段，文本拼接）；
  //   b) 收敛后末段仍 < 200ms 则回删最后一个边界（并入前段）。
  // 各段均 ≥200ms 的正常切分，边界与旧算法逐一致（零影响）；只有病态比例被收敛。
  // 拼接规则：两侧均为拉丁/数字时补一个空格（for her + birthday. → for her birthday.），
  // 其余（CJK 之间等）直接相连（誕生日 + プレゼントに買って → 誕生日プレゼントに買って）。
  const MIN_SUB_CUE_MS = 200;
  function subCuePlan(st, en, ss, dd, basis) {
    const k = basis.length;
    const W = basis.reduce((a, b) => a + b, 0) || 1;
    const total = Math.max(0, en - st);
    const cuts = [{ i: 0, t: st }];
    let cum = 0;
    for (let i = 1; i < k; i++) {
      cum += basis[i - 1];
      cuts.push({ i, t: Math.round(st + total * cum / W) });
    }
    const kept = [cuts[0]];
    for (let c = 1; c < cuts.length; c++) {
      if (cuts[c].t - kept[kept.length - 1].t >= MIN_SUB_CUE_MS) kept.push(cuts[c]);
    }
    if (kept.length > 1 && en - kept[kept.length - 1].t < MIN_SUB_CUE_MS) kept.pop();
    kept.push({ i: k, t: en });
    const joinTxt = (a, b) => {
      a = String(a || ''); b = String(b || '');
      if (!a) return b;
      if (!b) return a;
      const latA = /[A-Za-z0-9]/.test(a[a.length - 1]), latB = /[A-Za-z0-9]/.test(b[0]);
      return (latA && latB) ? a + ' ' + b : a + b;
    };
    const out = [];
    for (let c = 0; c + 1 < kept.length; c++) {
      let sTxt = '', dTxt = '';
      for (let j = kept[c].i; j < kept[c + 1].i; j++) {
        sTxt = joinTxt(sTxt, ss ? (ss[j] || '') : '');
        dTxt = joinTxt(dTxt, dd ? (dd[j] || '') : '');
      }
      out.push({ s: sTxt, d: dTxt, start: kept[c].t, end: kept[c + 1].t });
    }
    return out;
  }

  function buildBilingualParts(rows, opts) {
    opts = opts || {};
    const maxW = (opts.maxW > 0) ? opts.maxW : 21;
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
        if (last) last.times.push({ start: r.start || 0, end: r.end || 0 }); // v0.9.48：保留原 cue 边界
        continue;
      }
      if (!r.zh || !String(r.zh).trim()) { last = null; continue; }
      // 双 speaker 对话（v0.9.25）：src/dst 都保留原始多行（不 squash），
      // 后续走 SP 分支每行独立折行；模型降级返回单行时 isSpeakerText 为 false，自然落回旧路径
      if (isSpeakerText(String(r.zh))) {
        last = { start: r.start || 0, end: r.end || 0, speaker: true,
                 times: [{ start: r.start || 0, end: r.end || 0 }],
                 srcParts: srcOne ? [String(r.en == null ? '' : r.en).replace(/\r/g, '').trim()] : [],
                 dst: String(r.zh).replace(/\r/g, '').trim() };
        entries.push(last);
        continue;
      }
      last = { start: r.start || 0, end: r.end || 0,
               times: [{ start: r.start || 0, end: r.end || 0 }],
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
      // v0.9.48 段级发射器：原 cue 边界切出的一个段（时间已定），只管"怎么放下"——
      // R1 微超宽单行 → R2 折 2 行 → R3 段内细切（等宽自然断点 + 段时间按宽度占比瓜分，兜底折 2 行）
      const emitPart = (st, en, sTxt, dTxt) => {
        const sw = sTxt ? textWidth(sTxt) : 0;
        const dw = textWidth(dTxt || '');
        if (sw <= maxW + 4 && dw <= maxW + 4) { // R1
          pushItem(st, en, sTxt ? [sTxt] : [], [dTxt || '']);
          return;
        }
        if (sw <= 2 * maxW && dw <= 2 * maxW) { // R2：两边折行都 ≤2 行 → 整段折行放下
          const sL = sTxt ? wrapToWidth(sTxt, maxW, { normalize: true, locale: opts.srcLocale }) : [];
          const dL = wrapToWidth(dTxt || '', maxW, { normalize: true, locale: opts.dstLocale });
          if (sL.length <= 2 && dL.length <= 2) { pushItem(st, en, sL, dL); return; }
        }
        // R3：段内仍超容量 → 细切（k 从宽度需求起步递增；时间按各片宽度占比瓜分段时长）
        const fitsW = (segs) => segs.every((s) => !s || textWidth(s) <= maxW + 1e-9);
        let kk = Math.max(1, Math.ceil(Math.max(sw, dw) / maxW));
        let ss = [], dd = [];
        const kCap2 = kk + 10;
        for (;; kk++) {
          ss = sTxt ? splitTextNatural(sTxt, kk, opts.srcLocale) : new Array(kk).fill('');
          dd = splitAligned(dTxt || '', sTxt ? ss : null, kk, opts.dstLocale);
          if ((fitsW(ss) && fitsW(dd)) || kk >= kCap2) break;
        }
        const basis = (sTxt ? ss : dd).map((s) => Math.max(0.5, textWidth(s || '')));
        // v0.9.68：subCuePlan 含 sliver 保护（<200ms 子段并入邻段），正常切分与旧算法一致
        for (const g of subCuePlan(st, en, ss, dd, basis)) {
          const sL = g.s ? wrapToWidth(g.s, maxW, { normalize: true, locale: opts.srcLocale }) : [];
          const dL = wrapToWidth(g.d || '', maxW, { normalize: true, locale: opts.dstLocale });
          pushItem(g.start, g.end, sL, dL);
        }
      };
      // SP 双 speaker（v0.9.25；v0.9.69 用户方案重写）：双语导出 src/dst 各合并为单行
      // "- A - B"（dash 归一、说话人间空格），合并行 ≤ maxW+10 直放——正好落进标准
      // 2 行框架（1 行源文 + 1 行译文），不再需要 4 行豁免；任一侧合并结果为 null
      // （非全 dash 结构）或超宽 → 双侧回退现行按 dash 行独立折行的 2+2 布局
      // （不硬折行，保 dash 可读性）。时间轴依然神圣不可切分。
      if (e.speaker) {
        const srcRaw = e.srcParts.length ? e.srcParts[0] : '';
        const srcM = srcRaw ? mergeSpeakerLine(srcRaw) : '';
        const dstM = mergeSpeakerLine(e.dst);
        const srcOk = !srcRaw || (srcM !== null && textWidth(stripSoundTags(srcM)) <= maxW + 10);
        const dstOk = dstM !== null && textWidth(stripSoundTags(dstM)) <= maxW + 10;
        if (srcOk && dstOk) {
          pushItem(e.start, e.end, (srcRaw && srcM) ? [srcM] : [], [dstM]);
          continue;
        }
        const sLines = (srcRaw && isSpeakerText(srcRaw))
          ? foldSpeakerLines(srcRaw, maxW, opts.srcLocale)
          : (srcRaw ? wrapToWidth(srcRaw, maxW, { normalize: true, locale: opts.srcLocale }) : []);
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
      // v0.9.48：合并句组（entry.times > 1）——译文/源文先按各原 cue 时长比例切回（时间跟着语音走，
      // splitByDuration 内含词边界/语义停顿/原子保护），原 cue 边界即子时间轴；段内仍超容量才段内细切。
      // 背景：旧路径把整组当一个超长 cue 等宽重切（时间按文本宽度瓜分），实测把 3 条原文切出
      // 5 条全新边界，源文语音边界全丢、译文被英文宽度绑架产生劈词/悬空收尾，观感不可接受。
      if (e.times && e.times.length > 1) {
        const times = e.times;
        const sSegs = srcText ? splitByDuration(srcText, times, { locale: opts.srcLocale }) : null;
        const dSegs = splitByDuration(dstText, times, { locale: opts.dstLocale });
        for (let i = 0; i < times.length; i++) {
          emitPart(times[i].start, times[i].end, sSegs ? (sSegs[i] || '') : '', dSegs[i] || '');
        }
        continue;
      }
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
      // v0.9.68：subCuePlan 含 sliver 保护（<200ms 子段并入邻段），正常切分与旧算法一致
      for (const g of subCuePlan(e.start, e.end, srcSegs, dstSegs, basis)) {
        // 段内仍超宽（罕见：长不可断 stretch）则折行兜底，接受该段 2 行
        const sL = g.s ? wrapToWidth(g.s, maxW, { normalize: true, locale: opts.srcLocale }) : [];
        const dL = wrapToWidth(g.d || '', maxW, { normalize: true, locale: opts.dstLocale });
        pushItem(g.start, g.end, sL, dL);
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
    const maxW = (opts.maxW > 0) ? opts.maxW : 21;
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
        if (last) last.times.push({ start: r.start || 0, end: r.end || 0 }); // v0.9.48：保留原 cue 边界
        continue;
      }
      // v0.9.39：镜像源 speaker 多行结构（仅 mono 导出生效，不动 S.rows 数据/双语/ASS 路径）
      // v0.9.52：先并掉「仅闭标点」的孤行（LLM 偶发 \n”），否则 R0 会原样放行
      const rawZh = mirrorSpeakerLines(mergePunctOnlyLines(String(r.zh == null ? '' : r.zh)), r.en);
      if (!rawZh.trim()) { last = null; continue; }
      last = { start: r.start || 0, end: r.end || 0, times: [{ start: r.start || 0, end: r.end || 0 }], rawZh: rawZh, dst: squashLines(rawZh) };
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
      // v0.9.48：合并句组（entry.times > 1）整句优先——装得下（单行/折 maxLines 行）就整句一条常驻全组时间窗，
      // 保持阅读连贯（用户决策：单语装得下不切碎）；超容量才按各原 cue 时长比例切回（原边界即子时间轴），
      // 段内超容量再段内细切。旧路径整组等宽重切会造出全新边界，源文语音节奏全丢（与双语路径同源 bug）。
      if (e.times && e.times.length > 1) {
        if (w <= maxW + 4) { emit(e.start, e.end, dst); continue; }                  // 整句单行
        const lW = wrapToWidth(dst, maxW, { normalize: true, locale: locale });
        if (lW.length <= maxLines) { emit(e.start, e.end, lW.join('\n')); continue; } // 整句折行
        const segs0 = splitByDuration(dst, e.times, { locale: locale });
        for (let i = 0; i < e.times.length; i++) {
          const t = e.times[i];
          const seg = segs0[i] || '';
          const sw = textWidth(stripSoundTags(seg));
          if (sw <= maxW + 4) { emit(t.start, t.end, seg); continue; }            // R1 单行
          const l0 = wrapToWidth(seg, maxW, { normalize: true, locale: locale });
          if (l0.length <= maxLines) { emit(t.start, t.end, l0.join('\n')); continue; } // R2 折行
          // R3 段内细切：k 片 + 饥饿段修复，段时间按宽度占比瓜分
          const k0 = Math.max(2, Math.ceil(sw / (maxW * maxLines)));
          const fitsAll0 = (ss) => ss.every((s) => !s || wrapToWidth(s, maxW, { normalize: true, locale: locale }).length <= maxLines);
          let segs = [];
          const cap = k0 + 10;
          for (let k = k0; k <= cap; k++) {
            segs = repairThinSegs(splitTextNatural(seg, k, locale), locale);
            if (fitsAll0(segs)) break;
          }
          const basis0 = segs.map((s) => Math.max(0.5, textWidth(stripSoundTags(String(s || '')))));
          // v0.9.68：subCuePlan 含 sliver 保护（<200ms 子段并入邻段），正常切分与旧算法一致
          for (const g of subCuePlan(t.start, t.end, null, segs, basis0)) {
            emit(g.start, g.end, wrapToWidth(g.d, maxW, { normalize: true, locale: locale }).join('\n'));
          }
        }
        continue;
      }
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
      // v0.9.68：subCuePlan 含 sliver 保护（<200ms 子段并入邻段），正常切分与旧算法一致
      for (const g of subCuePlan(e.start, e.end, null, segs, basis)) {
        emit(g.start, g.end, wrapToWidth(g.d, maxW, { normalize: true, locale: locale }).join('\n'));
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

  // ---------------- 阅读速度（CPS）检测（v0.9.41，只读 QC，不改动任何输出） ----------------
  // 口径对齐 Netflix TTSG 的 CJK 计法：全角=1、半角=0.5（即 textWidth 等效宽度），除以显示秒数。
  // 阈值（等效字/秒，成人档，来源 Netflix 各语言 TTSG）：
  //   ja 4（日文汉字信息密度最高，Netflix 最严） / ko 9（v0.9.65：谚文补入 isFull 后音节按全宽计，
  //   原 12 是半宽时代的口径——与 zh 同密度级别，取 9）/ zh-CN·zh-TW 9（官方允许上浮至 11，取标称值）
  //   其余语言 8：Netflix 拉丁语系按含空格字符计 17 CPS，等效宽度口径约 8。
  // 纯水词/声音标签条目不参与 CPS；时长 <0.5s 的条目 CPS 无意义，跳过（过短另行报 shortDur）。
  const CPS_LIMITS = { 'ja': 4, 'ko': 9, 'zh-CN': 9, 'zh-TW': 9 };
  const MIN_DUR_MS = 833; // Netflix 最短显示时长 5/6 秒
  function cpsLimitOf(dst) { return CPS_LIMITS[dst] || 8; }
  function cpsOf(text, durMs) {
    const d = +durMs;
    if (!text || !(d > 0)) return 0;
    return textWidth(String(text)) / (d / 1000);
  }
  // 阅读速度与最短时长检查：返回 issue 数组（type:'cps'/'dur'），供导出前报告（只读提示）。
  // items 口径同 validateItems（[{no,start,end,text}]）；dst 为目标语言码（BCP47）。
  // cps issue 带 args:[cps, limit] 供 i18n 占位符渲染。
  function readingSpeedIssues(items, dst) {
    const issues = [];
    const lim = cpsLimitOf(dst);
    (items || []).forEach((it) => {
      if (!it || !it.text) return;
      const dur = (it.end || 0) - (it.start || 0);
      if (dur <= 0) return; // 时长问题交给 validateItems
      if (dur < MIN_DUR_MS) issues.push({ type: 'dur', at: it.no, code: 'shortDur', msg: '显示时长不足 0.83 秒', args: [(dur / 1000).toFixed(2)] });
      if (isFillerCue(String(it.text))) return; // 纯水词/声音标签不参与 CPS
      const cps = cpsOf(stripSoundTags(String(it.text)), dur);
      if (cps > lim + 1e-9) issues.push({ type: 'cps', at: it.no, code: 'cps', msg: '阅读速度过快', cps: Math.round(cps * 10) / 10, args: [Math.round(cps * 10) / 10, lim] });
    });
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
  // v0.9.73：中文特征标记（简体+繁体）——这些字/词日语里不用（日语对应 の／た／私／この 等），
  // 一旦出现在日语目标译文中，几乎可以断定是中文跑偏，而非合法的日语汉字词。
  const RE_ZH_MARK = /[的了嗎吗呢吧這这那很]|我們|我们|你們|你们|他們|他们|什麼|什么/;
  // v0.9.73：日语纯汉字无假名的长度闸（字符宽，复用 textWidth：汉字 1、拉丁 0.5）。
  // 合法日语纯汉字名词（東京／首相／市場／技術／総理大臣）都很短，超过此宽度基本是中文长句跑偏。
  const JA_HAN_SHORT_W = 6;
  function anchorOk(text, dst) {
    const s = String(text == null ? '' : text);
    if (!s.trim()) return true;
    const han = RE_HAN.test(s), kana = RE_KANA.test(s), hangul = RE_HANGUL.test(s);
    if (dst === 'zh-CN' || dst === 'zh-TW') return !kana && !hangul;
    if (dst === 'ja') {
      if (hangul) return false;
      if (kana) return true;          // 含假名 → 一定是日语（或至少不是纯汉字中文）
      if (!han) return true;          // 纯拉丁/符号 → 沿用既有策略（防专名误伤），不拦
      // 纯汉字无假名：
      if (RE_ZH_MARK.test(s)) return false;             // ① 含中文虚词 → 中文跑偏
      return textWidth(s) <= JA_HAN_SHORT_W;            // ② 短名词放行，长句判跑偏
    }
    if (dst === 'ko') return !han && !kana;
    return !han && !kana && !hangul;
  }

  // 已知混字词表（按目标语言隔离）：实测 DeepSeek 偶发在个别术语上写出汉字字面
  // （如泰文"ล้ำหน้า/前沿"被写成汉字"前沿"混在泰文里），锚定重试后仍不改的顽固组，
  // 在回填阶段做机械替换。只按 dst 命中本语言的表，其他语言零影响（中日韩译文里的
  // 合法汉字永远不会被碰）。发现新的混字案例往对应语言数组里追加即可。
  const MIXED_FIX = {
    // v0.9.57 追加：DeepSeek 译泰文时整句漂进中文的前半句（Qualcomm CFO 访谈实测案例：
    // 「所以我们非常兴奋，这 เอ่อ จะเป็น…」——前几个 token 中文、被泰语语气词拉回）
    th: [ ['前沿', 'ล้ำหน้า'], ['所以我们非常兴奋，这', 'ดังนั้นเราจึงตื่นเต้นมากที่'] ]
  };
  function fixMixedChars(text, dst) {
    const s = String(text == null ? '' : text);
    const rules = MIXED_FIX[dst];
    if (!rules || !s) return s;
    let out = s;
    for (let i = 0; i < rules.length; i++) out = out.split(rules[i][0]).join(rules[i][1]);
    return out;
  }

  // v0.9.64：盘古之白——汉字与拉丁字母/数字紧贴处补一个空格（「普通iPhone」→「普通 iPhone」）。
  // 模型输出时有时无（同片 16 行带空格、5 行紧贴），确定性归一；已有空格不动（不重复加），
  // 标点接缝不动（「iPhone，」不加）。只按字面处理，不区分术语（「AI构建」→「AI 构建」同规）。
  // 调用方按目标语言决定是否启用（zh 系惯例加；ja 等不加，函数本身无语言判断）。
  function panguSpace(text) {
    const s = String(text == null ? '' : text);
    if (!s) return s;
    return s
      .replace(/([\u4e00-\u9fff])([A-Za-z0-9])/g, '$1 $2')
      .replace(/([A-Za-z0-9])([\u4e00-\u9fff])/g, '$1 $2');
  }

  // v0.9.66：cue 对齐校验——模型按 cue 编号逐条返回译文时的结构校验（纯函数）。
  // 硬校验（不过则该组降级旧路径/重发）：cue 编号集合精确匹配（缺号/多号/重号）、非空文本（filler 豁免）。
  // 软校验（只收集不拦截——CPS/行宽由 QC 层报警，折行由 wrapToWidth 兜底）：
  //   cpsWarns: [{no, cps}] 超过限值；wideWarns: [{no, w}] 超过 2 行物理容量。
  // cues: 组的源 cue 数组 [{no,start,end}]；outCues: 模型输出 [{no,text}]；
  // opts: {maxW, cpsLimit, locale, fillerSet}。
  // 实测依据（cue-exp 实验，11 语言 1400+ cue）：结构错是概率性的且重试可修复
  //（hi 一次带反馈重试结构清零）；CPS 违规全轻度（超限 ≤2）且重跑即消失——不做硬拦截。
  function validateCueAlign(cues, outCues, opts) {
    opts = opts || {};
    const errs = [];
    const texts = new Map();
    const cpsWarns = [], wideWarns = [];
    const fillerSet = opts.fillerSet || new Set();
    const maxW = opts.maxW || 21;
    if (!Array.isArray(outCues)) return { ok: false, errs: ['NO_CUES_ARRAY'], texts, cpsWarns, wideWarns };
    const known = new Set(cues.map(c => c.no));
    const seen = new Set();
    const byNo = new Map(cues.map(c => [c.no, c]));
    for (const oc of outCues) {
      if (!oc || oc.no == null) { errs.push('BAD_ENTRY'); continue; }
      const no = Number(oc.no);
      if (!known.has(no)) { errs.push('UNKNOWN_' + no); continue; }   // 模型发明了不存在的编号
      if (seen.has(no)) { errs.push('DUP_' + no); continue; }
      seen.add(no);
      const text = String(oc.text == null ? '' : oc.text).trim();
      if (!text) {
        if (!fillerSet.has(no)) errs.push('EMPTY_' + no); // 纯水词 cue 允许空（fillers 数组另行清空）
        continue;
      }
      texts.set(no, text);
      const src = byNo.get(no);
      if (src) {
        const dur = (src.end - src.start) / 1000;
        if (dur > 0 && opts.cpsLimit) {
          const cps = textWidth(text) / dur;
          if (cps > opts.cpsLimit) cpsWarns.push({ no, cps: +cps.toFixed(1) });
        }
        const w = textWidth(text);
        if (w > maxW * 2) wideWarns.push({ no, w: +w.toFixed(1) });
      }
    }
    const missing = [];
    for (const c of cues) if (!seen.has(c.no) && !fillerSet.has(c.no)) missing.push(c.no);
    if (missing.length) errs.push('MISSING_' + missing.join(','));
    return { ok: errs.length === 0, errs, texts, cpsWarns, wideWarns };
  }

  return {
    isFull, textWidth, wrapToWidth, atomicRanges, wordBounds,
    parseSrt, formatSrt, fmtTime, parseTime, renumber,
    parseVtt, formatVtt, fmtTimeVtt,
    parseAss, formatAss, fmtTimeAss, parseAssTime,
    formatTxt, detectFormat,
    isFillerCue, stripSoundTags, squashLines, joinSrc, needJoinSpace, mergePunctOnlyLines,
    groupSentences, splitByDuration, mergeableGroup,
    splitTextNatural, splitAligned, splitCues, buildBilingual, buildBilingualParts, isSpeakerText,
    buildMonoParts, collapseThinTail, joinSeg, effChars, foldSpeakerLines,
    validateItems, anchorOk, fixMixedChars, panguSpace, validateCueAlign,
    cpsOf, cpsLimitOf, readingSpeedIssues, CPS_LIMITS, MIN_DUR_MS,
    musicLost, isPureHumming, normalizeMusic, splitMusicLines, RE_MUSIC, repairSpeakerLines, mirrorSpeakerLines,
    extractMusicFrames, parseSegMarkers, splitByWeights, reassembleMusic, stripSegMarkers, hasSegMarkers,
    MAX_W_DEFAULT: 20
  };
});
