/* ================= snap-store.js · v0.9.404 =================
   断点快照存储层：翻译页（translate.html）与多语页（multilang.html）共用一份，
   目的是让两页的「存几份、存多久、怎么清理」完全同构，不再各写各的、跑偏了都不知道。

   背景（为什么要单独抽一个文件）：
   v0.9.77 起的断点续传只用一个固定键 srt_resume_v1 —— 翻译页至今仍是单槽。
   后果是「翻 A 到一半去翻 B，A 的进度就没了」，以及「A 翻完没导出，去翻 B 后取不回来」。
   多语页 v0.9.3xx 为连跑多语改成按 内容哈希:目标语言 分槽，本质已经是多份，
   但没有索引、没有容量上限、用户也看不见，存满了直接静默失败（snapOff=true 后永不重试）。
   本次把多语页的分槽方式推广到翻译页，并补上索引 / LRU / 过期放宽 / 老单键迁移。

   设计红线（改这里之前先读）：
   1. 只存译文与进度，不存原文、不存任何 Key —— 所以「取回」必须重新选同一份文件才能对上号。
      这是有意的取舍：原文不落在别人浏览器里，且单份体积只有成品的三分之一。
   2. 槽的键 = 内容哈希 + 目标语言，参数（风格/行宽/术语表/歌词设置/切批）只进指纹 fp
      由 read() 校验，不进键。参数变了 → 同一槽内的旧快照作废，但别的片子不受影响。
   3. 任何异常都吞掉并返回 null/false —— 存储层绝不能把正在跑的翻译搞崩。
      最坏结果永远是「下次照常重翻」，不是报错。
   4. 本文件不依赖页面里的任何函数（log / t / S 都不认），需要提示的由调用方自己打。
   ============================================================ */
var SnapStore = (function(){
  var K_IDX   = 'srt_resume_idx_v1';        // 索引：只存摘要，不存译文
  var K_BASE  = 'srt_resume_v1';            // 槽键前缀；不带后缀的那个是 v0.9.403 及以前的老单键
  /* v0.9.404：保留期放宽。老值（未完成 7 天 / 已完成 24 小时）是按「只有一个槽、
     槽位随时会被下一部片挤掉」设计的，槽位不再紧张后，这两个数只用来防「串片」和
     「无限堆积」，可以大幅放宽：
       未完成 30 天 —— 用户可能隔很久才回来接着翻，那才是断点存在的意义；
       已完成 14 天 —— 翻完的片子常要隔几天回来重新导出，24 小时实测不够用
       （9/25 全站 189 组重复任务里有 100 组从未下载，多数是回来晚了一步）。 */
  var SNAP_TTL     = 30*24*3600*1000;
  var FIN_SNAP_TTL = 14*24*3600*1000;
  /* 容量软上限。localStorage 一个源一般 5MB（按 UTF-16 字节算），
     这里只给快照留 3MB，剩下的留给 srtTool 设置、术语库、手工改行等其它键。
     达到上限后按 LRU 淘汰，而不是像以前那样写失败就永久放弃。 */
  var BUDGET       = 3*1024*1024;

  var LS = null;   // 存储适配器；默认取 localStorage，单测可用 setStore() 换桩

  function store(){
    if(LS) return LS;
    try{
      if(typeof localStorage !== 'undefined' && localStorage){ LS = localStorage; return LS; }
    }catch(e){}
    return null;
  }
  function setStore(o){ LS = o || null; }

  function now(){ return Date.now(); }

  /* ---------- 索引 ---------- */
  function loadIdx(){
    var s = store();
    if(!s) return { v:1, items:[] };
    try{
      var o = JSON.parse(s.getItem(K_IDX) || 'null');
      if(!o || !Array.isArray(o.items)) return { v:1, items:[] };
      return o;
    }catch(e){ return { v:1, items:[] }; }
  }
  function saveIdx(idx){
    var s = store();
    if(!s) return false;
    try{ s.setItem(K_IDX, JSON.stringify(idx)); return true; }
    catch(e){ return false; }
  }
  /* 索引里更新（或插入）一条摘要。k 相同即覆盖，不产生重复项。
     ⚠️ seq 是单调自增的写入序号：同一毫秒内连写两条（单测里会这样）ts 会完全相同，
        只按 ts 排序时「谁在前」就取决于数组的原始顺序，索引列表会抖。
        带上 seq 后，ts 相同时后写的一定排在前面，与「最近用过的排前面」一致。 */
  function idxUpsert(it){
    var idx = loadIdx(), hit = false;
    idx.seq = (idx.seq || 0) + 1;
    it.seq = idx.seq;
    for(var i=0;i<idx.items.length;i++){
      if(idx.items[i].k === it.k){ idx.items[i] = it; hit = true; break; }
    }
    if(!hit) idx.items.push(it);
    saveIdx(idx);
    return idx;
  }
  function idxDrop(k){
    var idx = loadIdx(), out = [];
    for(var i=0;i<idx.items.length;i++){ if(idx.items[i].k !== k) out.push(idx.items[i]); }
    idx.items = out;
    saveIdx(idx);
    return idx;
  }

  /* ---------- 槽 ---------- */
  /* 槽键。fk = 源文内容哈希（两页都已有 srcFingerprint），lang = 目标语言。
     与多语页现行格式完全一致（srt_resume_v1:<fk>:<lang>），多语页改走本文件后键不变，
     老进度自然接得上，不需要任何迁移。 */
  function keyFor(fk, lang){ return K_BASE + ':' + fk + ':' + lang; }

  function getObj(k){
    var s = store();
    if(!s || !k) return null;
    try{
      var raw = s.getItem(k);
      if(!raw) return null;
      return JSON.parse(raw);
    }catch(e){ return null; }
  }
  function setObj(k, o){
    var s = store();
    if(!s || !k) return false;
    try{ s.setItem(k, JSON.stringify(o)); return true; }
    catch(e){ return false; }
  }
  function dropKey(k){
    var s = store();
    if(!s || !k) return;
    try{ s.removeItem(k); }catch(e){}
    try{ idxDrop(k); }catch(e){}
  }

  /* 一份快照里到底有没有「真译文」。
     ⚠️ 判据必须逐条看内容，不能只看条目数：v0.9.394 事故留下的坏快照长这样 ——
        done:{1:{type:'text',text:'',cueTexts:[[1,''],[2,'']]}, …}
        编号齐全、结构完整、cueTexts.length 也 ≥1，唯独译文全是空串。
     早期只判 length，于是把它当成有效结果复用，用户下载到空白字幕。
     本函数自 v0.9.397 起在多语页使用；v0.9.404 起翻译页也走同一份 ——
     此前翻译页缺这道校验，空快照会被 askReuse 当成「上次的结果」摆给用户。 */
  function snapHasText(o){
    try{
      if(!o || !o.done || typeof o.done !== 'object') return false;
      var ks = Object.keys(o.done);
      for(var i=0;i<ks.length;i++){
        var v = o.done[ks[i]];
        if(!v || typeof v !== 'object') continue;
        if(String(v.text == null ? '' : v.text).trim()) return true;
        if(!Array.isArray(v.cueTexts)) continue;
        for(var j=0;j<v.cueTexts.length;j++){
          var p = v.cueTexts[j];
          if(Array.isArray(p) && String(p[1] == null ? '' : p[1]).trim()) return true;
        }
      }
    }catch(e){}
    return false;
  }
  function expired(o){
    var ttl = o && o.fin ? FIN_SNAP_TTL : SNAP_TTL;
    return !o || !o.ts || (now() - o.ts) > ttl;
  }
  /* 结构与内容能不能用（不含参数比对）。 */
  function usable(o){
    if(!o || typeof o !== 'object') return false;
    if(!o.done || typeof o.done !== 'object') return false;
    /* v0.9.167：已跑满（bi===totalB）的快照不再作废（它是「整片译完」的那份，用来免二次翻译），
       未跑完的走断点续传；两者都要求计数自洽，越界的一律作废。 */
    if(!(o.bi > 0) || !(o.totalB > 0) || o.bi > o.totalB) return false;
    if(expired(o)) return false;
    if(!snapHasText(o)) return false;
    return true;
  }
  /* 校验一份快照能不能用。fp 传 null 表示不校验参数（仅供 list() 之外的场景）。 */
  function valid(o, fp){
    if(!usable(o)) return false;
    if(fp != null && o.fp !== fp) return false;
    return true;
  }

  /* 读一份快照。legacyKey 传老单键时，若新槽还没有、老槽的 fp 又正好对得上，
     就把老槽搬到新槽并删掉老键 —— 让 v0.9.403 及以前「正在续跑」的任务不至于因为换键丢进度。
     ⚠️ 只在 fp 完全一致时才搬：fp 里含文件名/条数/语言对/全部译文参数+内容哈希，
        对不上说明不是同一部片（或参数变了），那就该作废，不能搬。 */
  function read(key, fp, legacyKey){
    var o = getObj(key);
    if((!o || o.fp !== fp) && legacyKey){
      var lo = getObj(legacyKey);
      if(lo && lo.fp === fp){
        if(setObj(key, lo)){
          var s = store();
          try{ if(s) s.removeItem(legacyKey); }catch(e){}
        }
        o = lo;
      }
    }
    if(!o) return null;
    /* ⚠️ 参数变了（fp 不一致）只「不复用」，不删槽 —— 与 v0.9.403 及以前的行为保持一致：
       用户改了翻译风格想看新译文，改回来之后旧进度还能接着用。
       键是按内容哈希分的，参数不同不会串片，留着没有副作用。 */
    if(fp != null && o.fp !== fp) return null;
    /* 过期 / 结构坏 / 空译文：删掉重跑才是唯一正确的结果，留着只会让人复用出空字幕 */
    if(!usable(o)){ dropKey(key); return null; }
    return o;
  }

  /* 写一份快照。payload = {fp,file,bi,totalB,done,fillers,ctx,durs,tl,gs}（页面里已序列化好的那一份），
     meta = {src,dst,lines}（进索引的展示信息）。返回 true/false —— false 表示确实存不下。
     v0.9.406：payload 多了 tl / gs 两项时间轴快照 —— 有了它，用户才能从「本机记录」里
     直接把译文下载成成品 srt，不必再重选一次字幕文件。
       tl = { 字幕编号: [起始毫秒, 结束毫秒] }，逐条；
       gs = [ 每个句组各含几条字幕 ]，按 gno 顺序 —— 用它把 gno 还原成编号区间。
       ⚠️ 仍然不存原文。要双语就得重选文件，那是另一条路（见页面里的说明）。
     写不下的处理与以前不同：先按 LRU 清出空间再试一次，仍失败才认输（以前是直接放弃本次运行）。 */
  function write(key, fp, payload, meta){
    var s = store();
    if(!s || !key) return false;
    var o = { v:1, ts:now(), fp:fp, file:(payload&&payload.file)||'',
              bi:(payload&&payload.bi)||0, totalB:(payload&&payload.totalB)||0,
              done:(payload&&payload.done)||{}, fillers:(payload&&payload.fillers)||[],
              ctx:(payload&&payload.ctx)||[], durs:(payload&&payload.durs)||[],
              tl:(payload&&payload.tl)||null, gs:(payload&&payload.gs)||null };
    var raw = '';
    try{ raw = JSON.stringify(o); }catch(e){ return false; }
    var ok = false;
    try{ s.setItem(key, raw); ok = true; }
    catch(e){
      /* 写满：先清场再试一次。keep=key 保证正在写的这一份永远不会被自己淘汰掉。 */
      evict(BUDGET, key);
      try{ s.setItem(key, raw); ok = true; }catch(e2){ ok = false; }
    }
    if(!ok) return false;
    idxUpsert({ k:key, file:o.file, lines:((meta&&meta.lines)||0)|0,
                src:(meta&&meta.src)||'', dst:(meta&&meta.dst)||'',
                bi:o.bi, totalB:o.totalB, fin:0, ts:o.ts, sz:raw.length*2,
                /* v0.9.406：有没有时间轴决定「能不能直接下载」。v0.9.404 及以前存的快照没有，
                   面板上对它们要把下载按钮置灰，并说明原因，而不是点了没反应。 */
                hasTl:(o.tl && o.gs) ? 1 : 0 });
    evict(BUDGET, key);
    return true;
  }

  /* 整片跑完：只标 fin=1 并刷新时间戳，不删除（v0.9.167 起的行为，保留）。 */
  function finish(key){
    var o = getObj(key);
    if(!o) return false;
    o.fin = 1; o.ts = now();
    if(!setObj(key, o)) return false;
    var idx = loadIdx();
    for(var i=0;i<idx.items.length;i++){
      if(idx.items[i].k === key){ idx.items[i].fin = 1; idx.items[i].ts = o.ts; idx.items[i].bi = o.bi; break; }
    }
    saveIdx(idx);
    return true;
  }

  function remove(key){ dropKey(key); }

  /* ---------- v0.9.406：把快照导出成成品字幕 ---------- */
  /* 读原始快照，**不做任何校验也不删槽** —— 导出与「参数对不对得上」无关，
     用户要的就是他翻出来的那些译文。走 read() 反而会因为参数变了 / 过期而把槽删掉。 */
  function peek(key){ return getObj(key); }

  function pad2(n){ return (n < 10 ? '0' : '') + n; }
  function pad3(n){ return (n < 100 ? '0' : '') + (n < 10 ? '0' : '') + n; }
  /* 毫秒 → SRT 时间码 00:00:00,000 */
  function fmtMs(ms){
    var t = Math.max(0, Math.round(Number(ms) || 0));
    return pad2(Math.floor(t/3600000)) + ':' + pad2(Math.floor(t/60000) % 60) + ':'
         + pad2(Math.floor(t/1000) % 60) + ',' + pad3(t % 1000);
  }
  /* 快照 → 目标语言成品 srt 文本。
     ⚠️ 只出译文，不出原文：本机本来就没存原文，硬要双语只能让用户重选字幕文件。
     两种译文形态都要认（与页面回填逻辑同源，别只顾一种）：
       · m.text      —— 整组一条译文：时间轴取该组首条的 start 到末条的 end（与正常导出的合并一致）
       · m.cueTexts  —— 模型按 cue 逐条对齐：每条各用自己的时间轴，一条一行
     跳过：type==='drop' 的、被判水词（fillers）的、译文为空的、时间轴缺失的。
     返回 null 表示这份快照导不出（老快照没存时间轴）。 */
  function toSrt(o){
    if(!o || !o.done || !o.tl || !o.gs) return null;
    /* tl 是扁平数组：第 n 条字幕的时间轴在 tl[(n-1)*2] 与 tl[(n-1)*2+1]。
       用扁平数组而不是 {编号:[起,止]} 的映射，纯为省字节 —— 键名"1234": 在 1200 条时
       要白占 7 个字符，扁平数组直接省掉约 45% 的时间轴体积（实测 1200 条：132KB → 113KB）。 */
    var tl = o.tl, gs = o.gs, fill = {};
    var tc = function(no){                        // 取第 no 条的 [起, 止]，缺则 null
      var i = (Number(no) - 1) * 2;
      if(!(i >= 0)) return null;
      var a = tl[i], b = tl[i + 1];
      if(a == null || b == null) return null;
      return [a, b];
    };
    (o.fillers || []).forEach(function(n){ fill[Number(n)] = 1; });
    /* gno → 编号区间。groupSentences 按字幕顺序切组、每条恰好属于一组，
       所以组是连续编号块：gs 里存每组条数，累加即可还原首末编号。编号从 1 起（解析时重排过）。 */
    var gb = {}, cum = 1, i;
    for(i = 0; i < gs.length; i++){
      var c = Math.max(1, Number(gs[i]) || 1);
      gb[i + 1] = [cum, cum + c - 1];
      cum += c;
    }
    var rows = [];
    var keys = Object.keys(o.done);
    for(i = 0; i < keys.length; i++){
      var m = o.done[keys[i]];
      if(!m || m.type === 'drop') continue;
      if(Array.isArray(m.cueTexts) && m.cueTexts.length){
        for(var j = 0; j < m.cueTexts.length; j++){
          var p = m.cueTexts[j];
          if(!Array.isArray(p)) continue;
          var no = Number(p[0]), tx = String(p[1] == null ? '' : p[1]).trim();
          if(!tx || fill[no]) continue;
          var tc1 = tc(no); if(!tc1) continue;
          rows.push({ s:tc1[0], e:tc1[1], text:tx });
        }
        continue;
      }
      var txt = String(m.text == null ? '' : m.text).trim();
      if(!txt) continue;
      var b = gb[Number(keys[i])];
      if(!b || fill[b[0]]) continue;
      var t1 = tc(b[0]), t2 = tc(b[1]);
      if(!t1 || !t2) continue;
      rows.push({ s:t1[0], e:t2[1], text:txt });
    }
    if(!rows.length) return null;
    rows.sort(function(a, b2){ return (a.s - b2.s) || (a.e - b2.e); });
    var out = [];
    for(i = 0; i < rows.length; i++){
      out.push(String(i + 1));
      out.push(fmtMs(rows[i].s) + ' --> ' + fmtMs(rows[i].e));
      out.push(String(rows[i].text).replace(/\r/g, ''));
      out.push('');
    }
    return out.join('\n');
  }

  /* ---------- 容量治理 ---------- */
  function bytes(){
    var idx = loadIdx(), n = 0;
    for(var i=0;i<idx.items.length;i++) n += (idx.items[i].sz||0);
    return n;
  }
  /* 淘汰到总占用 <= budget。keep 指定的槽永不淘汰（通常是当前正在写的那一份）。
     顺序：先删「最久没动的已完成」，再删「最久没动的未完成」——
     翻完的片子价值低于翻到一半的：前者最多是多花一次钱重翻，后者是几十分钟的进度白跑。 */
  function evict(budget, keep){
    var idx = loadIdx(), s = store();
    if(!s) return idx;
    var live = [], changed = false;
    for(var i=0;i<idx.items.length;i++){
      var it = idx.items[i];
      var has = false;
      try{ has = !!s.getItem(it.k); }catch(e){}
      if(has) live.push(it); else changed = true;   // 用户手动清过缓存 → 索引里顺手剔掉
    }
    var total = 0;
    for(i=0;i<live.length;i++) total += (live[i].sz||0);
    while(total > budget && live.length > 1){
      var cand = null, ci = -1;
      for(i=0;i<live.length;i++){
        if(live[i].k === keep) continue;
        if(!cand ||
           (live[i].fin ? 0 : 1) < (cand.fin ? 0 : 1) ||
           ((live[i].fin ? 0 : 1) === (cand.fin ? 0 : 1) && live[i].ts < cand.ts)){ cand = live[i]; ci = i; }
      }
      if(!cand) break;                     // 只剩 keep 一条，不能再删
      try{ s.removeItem(cand.k); }catch(e){}
      total -= (cand.sz||0);
      live.splice(ci, 1);
      changed = true;
    }
    if(changed){ idx.items = live; saveIdx(idx); }
    return idx;
  }

  /* ---------- 列表（给「本机记录」面板用） ----------
     只读索引、不解析任何译文 —— 一部长片的快照上百 KB，逐条 JSON.parse 会把面板打开卡住。 */
  function list(){
    var idx = loadIdx(), s = store(), out = [];
    var changed = false;
    for(var i=0;i<idx.items.length;i++){
      var it = idx.items[i], has = false;
      try{ has = !!(s && s.getItem(it.k)); }catch(e){}
      if(!has){ changed = true; continue; }
      out.push({ k:it.k, file:it.file||'', lines:it.lines||0, src:it.src||'', dst:it.dst||'',
                 bi:it.bi||0, totalB:it.totalB||0, fin:it.fin?1:0, ts:it.ts||0, seq:it.seq||0,
                 /* v0.9.406：面板据此决定「能不能直接下载」。老索引没有这个字段 → 0，
                    正好对应「v0.9.404 及以前存的快照没有时间轴」的事实。 */
                 hasTl:it.hasTl?1:0, sz:it.sz||0, expired: expired(it) });
    }
    if(changed){ idx.items = out.map(function(x){ return { k:x.k, file:x.file, lines:x.lines, src:x.src,
                 dst:x.dst, bi:x.bi, totalB:x.totalB, fin:x.fin, ts:x.ts, sz:x.sz, seq:x.seq,
                 hasTl:x.hasTl }; }); saveIdx(idx); }
    /* ts 相同时用 seq 兜底：同一毫秒内连写两条也要让「最近写过」的排在最前 */
    out.sort(function(a,b){ return (b.ts - a.ts) || ((b.seq||0) - (a.seq||0)); });
    return out;
  }

  /* 清理：过期的、索引里残留的槽一并删掉（页面空闲时调一次即可）。 */
  function gc(){
    var items = list(), s = store(), n = 0;
    for(var i=0;i<items.length;i++){
      var o = getObj(items[i].k);
      if(!o || expired(o)){ dropKey(items[i].k); n++; }
    }
    return n;
  }

  return {
    K_IDX: K_IDX, K_BASE: K_BASE, K_LEGACY: K_BASE,   // K_LEGACY：v0.9.403 及以前的老单键
    SNAP_TTL: SNAP_TTL, FIN_SNAP_TTL: FIN_SNAP_TTL, BUDGET: BUDGET,
    setStore: setStore, keyFor: keyFor,
    read: read, write: write, finish: finish, remove: remove, peek: peek, toSrt: toSrt, fmtMs: fmtMs,
    list: list, gc: gc, bytes: bytes, evict: evict,
    snapHasText: snapHasText, valid: valid, usable: usable, expired: expired
  };
})();
if(typeof module !== 'undefined' && module.exports){ module.exports = SnapStore; }
