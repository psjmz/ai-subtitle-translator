'use strict';
/* ============================================================================
   snap-store.js 单测（v0.9.404）

   测的是「本机能不能同时存多部片的进度」这件新事，以及它有没有把老行为改坏：
     · 分槽互不覆盖 —— 翻 A 到一半去翻 B，A 的进度还在（本次的核心诉求）
     · fp 不一致只不复用、不删槽（与 v0.9.403 行为一致，改回参数还能续）
     · 空译文 / 过期快照一律作废删除（多语页 v0.9.397 那道闸，翻译页此前没有）
     · 老单键 srt_resume_v1 能迁移到新槽，正在续跑的任务不因换键丢进度
     · 容量：超预算按「最久没动的已完成 → 最久没动的未完成」淘汰，且不淘汰正在写的那一份
     · 写不下时先清场重试，仍失败才认输（以前是直接放弃本次运行）
   ============================================================================ */
const assert = require('assert');
const SnapStore = require('./snap-store.js');

let pass = 0, fail = 0;
function it(name, fn){
  try{ fn(); pass++; }
  catch(e){ fail++; console.log('  ✗ ' + name + '\n    ' + (e && e.message ? e.message : e)); }
}

/* ---- 存储桩：带可选配额，能精确模拟「写满」 ---- */
function makeLS(quota){
  const m = new Map();
  const used = () => { let n = 0; m.forEach((v,k)=>{ n += (k.length + v.length) * 2; }); return n; };
  return {
    getItem: k => (m.has(k) ? m.get(k) : null),
    setItem: (k, v) => {
      if(quota && used() + (k.length + v.length) * 2 > quota){
        const e = new Error('QuotaExceededError'); e.name = 'QuotaExceededError'; throw e;
      }
      m.set(k, v);
    },
    removeItem: k => { m.delete(k); },
    _has: k => m.has(k), _size: () => m.size, _keys: () => Array.from(m.keys()),
    _raw: k => m.get(k)
  };
}
function reset(ls){ SnapStore.setStore(null); SnapStore.setStore(ls); }
/* 一份「有真译文」的快照载荷 */
function payload(bi, totalB, n){
  const done = {};
  for(let i=1;i<=(n||20);i++) done[i] = { type:'text', text:'译文' + i, cueTexts:null };
  return { fp:'FP', file:'Movie.srt', bi:bi, totalB:totalB, done:done, fillers:[], ctx:[], durs:[40,42] };
}
const META = { src:'en', dst:'zh-CN', lines:1200 };
/* 把某个槽的时间戳拨回去，用来测过期与 LRU（快照本身不能造，只能改时间） */
function backdate(ls, k, ms){
  const o = JSON.parse(ls._raw(k));
  o.ts = Date.now() - ms;
  ls.setItem(k, JSON.stringify(o));
  return o;
}
const DAY = 24*3600*1000;

/* ---------------- 1. 键格式 ---------------- */
it('槽键 = 内容哈希 + 目标语言，与多语页现行格式完全一致', function(){
  assert.strictEqual(SnapStore.keyFor('abc123', 'ja'), 'srt_resume_v1:abc123:ja');
  assert.strictEqual(SnapStore.K_LEGACY, 'srt_resume_v1');
});

/* ---------------- 2. 写入 / 读回 ---------------- */
it('写进去的能原样读回来（done / fillers / ctx / durs 都不丢）', function(){
  reset(makeLS());
  const k = SnapStore.keyFor('fkA', 'zh-CN');
  assert.strictEqual(SnapStore.write(k, 'FP', payload(3, 10), META), true);
  const o = SnapStore.read(k, 'FP');
  assert.ok(o, '应能读回');
  assert.strictEqual(o.bi, 3); assert.strictEqual(o.totalB, 10);
  assert.strictEqual(o.done['7'].text, '译文7');
  assert.deepStrictEqual(o.durs, [40, 42]);
  assert.strictEqual(o.file, 'Movie.srt');
});

/* ---------------- 3. 核心：多槽互不覆盖 ---------------- */
it('翻 A 到一半去翻 B，A 的进度还在（单槽时代的头号问题）', function(){
  reset(makeLS());
  const kA = SnapStore.keyFor('fkA', 'zh-CN'), kB = SnapStore.keyFor('fkB', 'ja');
  assert.strictEqual(SnapStore.write(kA, 'FPA', payload(5, 10), META), true);
  for(let i=0;i<8;i++) SnapStore.write(kB, 'FPB', payload(i+1, 8), META);   // B 连写 8 批
  const a = SnapStore.read(kA, 'FPA');
  assert.ok(a, 'A 不该被 B 挤掉');
  assert.strictEqual(a.bi, 5, 'A 的进度必须停在原来的批');
  assert.strictEqual(SnapStore.read(kB, 'FPB').bi, 8);
});
it('同一部片不同目标语言各占一格，互不干扰', function(){
  reset(makeLS());
  const kJ = SnapStore.keyFor('fkA', 'ja'), kE = SnapStore.keyFor('fkA', 'en');
  SnapStore.write(kJ, 'FPJ', payload(2, 6), META);
  SnapStore.write(kE, 'FPE', payload(4, 6), META);
  assert.strictEqual(SnapStore.read(kJ, 'FPJ').bi, 2);
  assert.strictEqual(SnapStore.read(kE, 'FPE').bi, 4);
});

/* ---------------- 4. 参数变了：不复用，但不删 ---------------- */
it('fp 不一致（改了风格/行宽/术语表）→ 不复用，但槽保留，改回来还能续', function(){
  reset(makeLS());
  const k = SnapStore.keyFor('fkA', 'zh-CN');
  SnapStore.write(k, 'FP1', payload(4, 10), META);
  assert.strictEqual(SnapStore.read(k, 'FP2'), null, '参数变了不该复用');
  const o = SnapStore.read(k, 'FP1');
  assert.ok(o && o.bi === 4, '改回原参数后旧进度必须还在');
});

/* ---------------- 5. 坏快照一律作废 ---------------- */
it('空译文快照（v0.9.394 那种）一律作废删除，不能被取回成空白字幕', function(){
  reset(makeLS());
  const k = SnapStore.keyFor('fkA', 'zh-CN');
  const p = payload(10, 10, 5);
  Object.keys(p.done).forEach(i => { p.done[i] = { type:'text', text:'', cueTexts:[[+i, '']] }; });
  SnapStore.write(k, 'FP', p, META);
  assert.strictEqual(SnapStore.read(k, 'FP'), null, '空译文快照必须作废');
});
it('cueTexts 里有真译文的算有效（不能只看 text）', function(){
  reset(makeLS());
  const k = SnapStore.keyFor('fkA', 'zh-CN');
  const p = payload(2, 10, 3);
  Object.keys(p.done).forEach(i => { p.done[i] = { type:'', text:'', cueTexts:[[+i, '逐条译文']] }; });
  SnapStore.write(k, 'FP', p, META);
  assert.ok(SnapStore.read(k, 'FP'), 'cueTexts 有内容就该认');
});
it('计数越界（bi>totalB）的快照作废', function(){
  reset(makeLS());
  const k = SnapStore.keyFor('fkA', 'zh-CN');
  SnapStore.write(k, 'FP', payload(12, 10), META);
  assert.strictEqual(SnapStore.read(k, 'FP'), null);
});
it('过期即作废：未完成的过 30 天、已完成的过 14 天', function(){
  const ls = makeLS(); reset(ls);
  const k1 = SnapStore.keyFor('fkOld1', 'zh-CN');
  SnapStore.write(k1, 'FP', payload(3, 10), META);
  backdate(ls, k1, 31*DAY);
  assert.strictEqual(SnapStore.read(k1, 'FP'), null, '未完成过 30 天应作废');
  assert.strictEqual(ls._has(k1), false, '作废即删除，不留脏数据');

  const k2 = SnapStore.keyFor('fkOld2', 'zh-CN');
  SnapStore.write(k2, 'FP', payload(10, 10), META);
  SnapStore.finish(k2);
  backdate(ls, k2, 15*DAY);
  assert.strictEqual(SnapStore.read(k2, 'FP'), null, '已完成过 14 天应作废');
});
it('保留期内不作废：未完成 29 天、已完成 13 天都还能用', function(){
  const ls = makeLS(); reset(ls);
  const k1 = SnapStore.keyFor('fkA1', 'zh-CN');
  SnapStore.write(k1, 'FP1', payload(3, 10), META);
  backdate(ls, k1, 29*DAY);
  assert.ok(SnapStore.read(k1, 'FP1'), '未完成 29 天内仍可续跑（旧值只有 7 天）');

  const k2 = SnapStore.keyFor('fkA2', 'zh-CN');
  SnapStore.write(k2, 'FP2', payload(10, 10), META);
  SnapStore.finish(k2);
  backdate(ls, k2, 13*DAY);
  assert.ok(SnapStore.read(k2, 'FP2'), '已完成 13 天内仍可取回（旧值只有 24 小时）');
});

/* ---------------- 6. 老单键迁移 ---------------- */
it('v0.9.403 及以前的老单键，fp 对得上时迁移到新槽并删掉老键', function(){
  const ls = makeLS(); reset(ls);
  const legacy = SnapStore.K_LEGACY;
  const old = payload(6, 12); old.fp = 'FPOLD';
  ls.setItem(legacy, JSON.stringify(Object.assign({ v:1, ts:Date.now() }, old)));
  const k = SnapStore.keyFor('fkA', 'zh-CN');
  const o = SnapStore.read(k, 'FPOLD', legacy);
  assert.ok(o && o.bi === 6, '老进度必须接得上');
  assert.strictEqual(ls._has(legacy), false, '搬完要删掉老键');
  assert.strictEqual(ls._has(k), true, '新槽要写上');
});
it('老单键 fp 对不上时不迁移（不是同一部片，不能串）', function(){
  const ls = makeLS(); reset(ls);
  const old = payload(6, 12); old.fp = 'FPOTHER';
  ls.setItem(SnapStore.K_LEGACY, JSON.stringify(Object.assign({ v:1, ts:Date.now() }, old)));
  assert.strictEqual(SnapStore.read(SnapStore.keyFor('fkA','zh-CN'), 'FPNOW', SnapStore.K_LEGACY), null);
  assert.strictEqual(ls._has(SnapStore.K_LEGACY), true, '不该动老键');
});

/* ---------------- 7. 索引 ---------------- */
it('索引记录文件名/条数/语言/进度/占用，按最近时间倒序', function(){
  reset(makeLS());
  const kA = SnapStore.keyFor('fkA', 'zh-CN'), kB = SnapStore.keyFor('fkB', 'ja');
  SnapStore.write(kA, 'FPA', payload(2, 10), { src:'en', dst:'zh-CN', lines:1200 });
  SnapStore.write(kB, 'FPB', payload(1, 4), { src:'en', dst:'ja', lines:600 });
  const l = SnapStore.list();
  assert.strictEqual(l.length, 2, '两条都要在索引里');
  assert.strictEqual(l[0].k, kB, '最近写过的排前面');
  assert.strictEqual(l[0].dst, 'ja');
  assert.strictEqual(l[1].lines, 1200);
  assert.ok(l[1].sz > 0, '要记占用字节');
});
it('删槽同时从索引移除', function(){
  reset(makeLS());
  const k = SnapStore.keyFor('fkA', 'zh-CN');
  SnapStore.write(k, 'FP', payload(1, 5), META);
  SnapStore.remove(k);
  assert.strictEqual(SnapStore.list().length, 0);
});
it('list() 自动剔除已被清掉的槽（用户手动清过缓存）', function(){
  const ls = makeLS(); reset(ls);
  const k = SnapStore.keyFor('fkA', 'zh-CN');
  SnapStore.write(k, 'FP', payload(1, 5), META);
  ls.removeItem(k);                       // 模拟用户清缓存
  assert.strictEqual(SnapStore.list().length, 0);
});

/* ---------------- 8. 整片跑完 ---------------- */
it('finish 标 fin=1 且不删除槽（保留「免二次翻译」的能力）', function(){
  reset(makeLS());
  const k = SnapStore.keyFor('fkA', 'zh-CN');
  SnapStore.write(k, 'FP', payload(10, 10), META);
  assert.strictEqual(SnapStore.finish(k), true);
  const o = SnapStore.read(k, 'FP');
  assert.ok(o && o.fin === 1);
  assert.strictEqual(SnapStore.list()[0].fin, 1);
});

/* ---------------- 9. 容量治理 ---------------- */
it('超预算时先淘汰「已完成且最久没动」的，未完成的留着', function(){
  const ls = makeLS(); reset(ls);
  const kDone = SnapStore.keyFor('fkDone', 'zh-CN');
  const kPart = SnapStore.keyFor('fkPart', 'ja');
  SnapStore.write(kDone, 'FP1', payload(5, 5), META);
  SnapStore.finish(kDone);
  backdate(ls, kDone, 5*DAY);       // 已完成 + 很久没动
  SnapStore.write(kPart, 'FP2', payload(2, 9), META);   // 未完成 + 最新
  SnapStore.evict(1, kPart);        // 预算压到 1 字节，必然触发淘汰
  assert.strictEqual(ls._has(kDone), false, '已完成且最久没动的应先被清掉');
  assert.ok(SnapStore.read(kPart, 'FP2'), '翻到一半的进度必须保住');
});
it('两份都已完成时，淘汰更久没动的那份', function(){
  const ls = makeLS(); reset(ls);
  const kNewer = SnapStore.keyFor('fkNewer', 'zh-CN');
  const kOlder = SnapStore.keyFor('fkOlder', 'ja');
  SnapStore.write(kNewer, 'FP1', payload(5, 5), META); SnapStore.finish(kNewer);
  SnapStore.write(kOlder, 'FP2', payload(3, 3), META); SnapStore.finish(kOlder);
  backdate(ls, kOlder, 6*DAY);
  SnapStore.evict(1, kNewer);
  assert.strictEqual(ls._has(kOlder), false, '更久没动的先走');
  assert.ok(ls._has(kNewer), 'keep 的那份必须留着');
});
it('evict 永不淘汰 keep 指定的那一份（正在写的进度不能被自己清掉）', function(){
  reset(makeLS());
  const k = SnapStore.keyFor('fkA', 'zh-CN');
  SnapStore.write(k, 'FP', payload(3, 9), META);
  SnapStore.evict(1, k);
  assert.ok(SnapStore.read(k, 'FP'), 'keep 的那份必须还在');
});
it('写不下时先清场再重试，仍失败才返回 false', function(){
  const ls = makeLS(200000);   // 200KB 配额
  reset(ls);
  const kOld = SnapStore.keyFor('fkOld', 'zh-CN');
  const kNew = SnapStore.keyFor('fkNew', 'ja');
  let ok = true;
  for(let i=0;i<6;i++) ok = ok && SnapStore.write(kOld, 'FP', payload(1, 5, 400), META);
  assert.strictEqual(ok, true, '先写满老槽');
  const before = SnapStore.list().length;
  const r = SnapStore.write(kNew, 'FP', payload(1, 5, 400), META);
  assert.strictEqual(r, true, '清场后应该能写进去');
  assert.ok(SnapStore.list().length >= 1);
});

/* ---------------- 10. 绝不抛异常 ---------------- */
it('存储不可用（隐私模式）时全部返回 null/false，不抛异常', function(){
  SnapStore.setStore(null);   // 没有 localStorage
  assert.strictEqual(SnapStore.write('k', 'FP', payload(1,2), META), false);
  assert.strictEqual(SnapStore.read('k', 'FP'), null);
  assert.deepStrictEqual(SnapStore.list(), []);
  assert.strictEqual(SnapStore.bytes(), 0);
  SnapStore.setStore(null);
});

console.log('\nsnap-store: ' + pass + ' 通过 / ' + fail + ' 失败');
process.exit(fail ? 1 : 0);
