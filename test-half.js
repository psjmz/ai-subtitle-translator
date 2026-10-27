/* 拆半重发的分支测试（v0.9.403）—— 与 test-core.js 互补：
   test-core.js 只做结构断言（正则钉住关键写法），跑不了 async 分支；
   这里把 translate.html 里那段重试代码原样抽出来，用桩 translateBatch 跑真实分支。
   抽取方式依赖实际写法（`let out;` → `out=acc;`），若那段被重构，这里会直接报错，
   提醒同步更新——这是有意的，不是脆弱点。

   覆盖：首批整批 / 两半都成 / 一成一败 / 两半全败 / 一成一败含待救援组 /
         单组批 / 两组批 / 用户点停 / 排队超时。
   跑法：node test-half.js
*/
const fs=require('fs');
const HTML=require('path').join(__dirname,'translate.html');
const lines=fs.readFileSync(HTML,'utf8').split('\n');

// 精确定位改动段：从「let out;」到「out=acc;」后的闭合
let s=-1,e=-1;
for(let i=0;i<lines.length;i++){
  if(/^\s*let out;\s*$/.test(lines[i]) && s<0) { s=i; }
  if(s>=0 && /^\s*out=acc;\s*$/.test(lines[i])) { e=i; break; }
}
if(s<0||e<0){ console.error('未定位到改动段'); process.exit(1); }
// 闭合 if 的大括号
let k=e+1;
while(k<lines.length && !/^\s*\}\s*$/.test(lines[k])) k++;
const body=lines.slice(s,k+1).join('\n');
console.log('提取代码段 行 ' + (s+1) + '~' + (k+1) + '，共 ' + (k-s+1) + ' 行\n');

const runner=new Function(
  'translateBatch','S','res','fillerSet','gBatch','bi','totalB','sysB','ctx',
  'effBase','effKey','effModel','attempt','maxTry','mergeBatchOut',
  `return (async()=>{ ${body} return out; })();`
);

// 从页面里提取真实的 mergeBatchOut
const src=fs.readFileSync(HTML,'utf8');
const mm=src.match(/function mergeBatchOut\(a,b\)\{[\s\S]*?\n\}/);
if(!mm){ console.error('未找到 mergeBatchOut'); process.exit(1); }
const mergeBatchOut=new Function('return '+mm[0])();

const mkGroups=n=>Array.from({length:n},(_,i)=>({gno:i+1, cues:[{no:i+1,text:'src'+i}]}));
const mkOut=gnos=>({byGno:Object.fromEntries(gnos.map(g=>[g,{type:'text',text:'t'+g}]))
  ,fillers:new Set(gnos.filter(g=>g%2===0)),badAnchor:[],musicDropGnos:[],subDropGnos:[],cueBadGnos:[],thinN:gnos.length,thinSample:[]});

let pass=0,fail=0;
function chk(name,cond,detail){
  if(cond){pass++;console.log('  ✓ '+name);}
  else{fail++;console.log('  ✗ '+name+(detail?'  → '+detail:''));}
}

async function run(scenario, fn){
  const res=new Map(), fillerSet=new Set();
  const gBatch=scenario.groups;
  const S=scenario.S || {stop:false};
  const calls=[];
  const mock=async (b,key,model,groups,bno,tb,sys,fb,ctx,rt)=>{
    calls.push({gnos:groups.map(g=>g.gno), rt});
    return fn(groups, rt, calls.length);
  };
  let err=null, out=null;
  try{
    out=await runner(mock,S,res,fillerSet,gBatch,0,1,'sys',[],'b','k','m',
      scenario.attempt, scenario.maxTry||2, mergeBatchOut);
  }catch(e){ err=e; }
  return {out,err,res,fillerSet,calls,S};
}

(async()=>{
  console.log('== A. 第一次就成功（attempt=0）不拆半 ==');
  {
    const r=await run({groups:mkGroups(8),attempt:0},(gs)=>mkOut(gs.map(g=>g.gno)));
    chk('只发 1 个请求', r.calls.length===1, JSON.stringify(r.calls));
    chk('请求带整批 8 组', r.calls[0].gnos.length===8);
    chk('rt=0', r.calls[0].rt===0);
    chk('返回 byGno 8 条', Object.keys(r.out.byGno).length===8);
    chk('res 未被本函数填充（由外层统一填）', r.res.size===0);
  }

  console.log('\n== B. 第二次拆半，两半都成功 ==');
  {
    const r=await run({groups:mkGroups(9),attempt:1},(gs)=>mkOut(gs.map(g=>g.gno)));
    chk('发 2 个请求', r.calls.length===2, JSON.stringify(r.calls));
    chk('切分 5 + 4（ceil(9/2)）', r.calls[0].gnos.length===5 && r.calls[1].gnos.length===4, JSON.stringify(r.calls.map(c=>c.gnos.length)));
    chk('两半都带 rt=6', r.calls.every(c=>c.rt===6));
    chk('两半无重叠且覆盖全批', new Set([...r.calls[0].gnos,...r.calls[1].gnos]).size===9);
    chk('合并后 byGno 全 9 条', Object.keys(r.out.byGno).length===9);
    chk('fillers 合并去重，大小 4', r.out.fillers.size===4, String(r.out.fillers.size));
    chk('thinN 累加 = 9', r.out.thinN===9, String(r.out.thinN));
    chk('未抛错', !r.err);
  }

  console.log('\n== C. 一成一败（第二半失败）==');
  {
    const r=await run({groups:mkGroups(10),attempt:1},(gs,rt,n)=>{
      if(n===2) throw new Error('HTTP 500');
      return mkOut(gs.map(g=>g.gno));
    });
    chk('发 2 个请求', r.calls.length===2);
    chk('抛错（触发逐组补救）', !!r.err && /500/.test(r.err.message), r.err&&r.err.message);
    chk('成功那半已落库 5 条', r.res.size===5, String(r.res.size));
    chk('落库内容属于前半', [...r.res.keys()].every(k=>k<=5));
    chk('fillers 也落了（前半偶数 2,4）', r.fillerSet.size===2, String(r.fillerSet.size));
  }

  console.log('\n== D. 两半都失败 ==');
  {
    const r=await run({groups:mkGroups(6),attempt:1},()=>{ throw new Error('empty'); });
    chk('发 2 个请求', r.calls.length===2);
    chk('抛错', !!r.err);
    chk('res 为空（全批交补救）', r.res.size===0);
  }

  console.log('\n== E. 一成一败 + 前半含待救援组 ==');
  {
    // 12 组：前半 1~6 成功、后半 7~12 失败；把 1~4 各自打成一种待救援类型
    const r=await run({groups:mkGroups(12),attempt:1},(gs,rt,n)=>{
      if(n===2) throw new Error('trunc');
      const o=mkOut(gs.map(g=>g.gno));
      o.badAnchor=[1];                    // 歌词丢词
      o.cueBadGnos=[{gno:2,errs:['E1']}]; // 结构错
      o.musicDropGnos=[3];                // 音乐组被 drop
      o.subDropGnos=[4];                  // 实义组被 drop
      return o;
    });
    chk('抛错', !!r.err);
    chk('待救援的 1/2/3/4 不落库', ![1,2,3,4].some(k=>r.res.has(k)), [...r.res.keys()].join(','));
    chk('无待救援的 5/6 照常落库', r.res.size===2 && r.res.has(5) && r.res.has(6), [...r.res.keys()].join(','));
  }

  console.log('\n== F. 边界：单组批 / 空半批 ==');
  {
    const r=await run({groups:mkGroups(1),attempt:1},(gs)=>{ throw new Error('x'); });
    chk('1 组批只发 1 个请求（不产生空半批）', r.calls.length===1, JSON.stringify(r.calls));
    chk('抛错', !!r.err);
  }
  {
    const r=await run({groups:mkGroups(2),attempt:1},(gs)=>mkOut(gs.map(g=>g.gno)));
    chk('2 组批拆成 1+1', r.calls.length===2 && r.calls.every(c=>c.gnos.length===1));
    chk('合并 2 条', Object.keys(r.out.byGno).length===2);
  }

  console.log('\n== G. 用户中途点停（S.stop）==');
  {
    const S={stop:true};
    const res=new Map(), fillerSet=new Set();
    const calls=[];
    const mock=async(b,k,m,gs)=>{calls.push(gs.length); return mkOut(gs.map(g=>g.gno));};
    let err=null;
    try{ await runner(mock,S,res,fillerSet,mkGroups(8),0,1,'s',[],'b','k','m',1,2,mergeBatchOut); }catch(e){err=e;}
    chk('停止后一个请求都不发', calls.length===0, JSON.stringify(calls));
    chk('抛出可被外层 S.stop 分支吞掉的错误', !!err);
  }

  console.log('\n== H. 半途排队超时（paceGiveUp）==');
  {
    const S={stop:false,paceOut:false};
    const r=await run({groups:mkGroups(10),attempt:1,S},()=>{
      const e=new Error('排队超时'); e.paceGiveUp=true; throw e;
    });
    chk('第一半超时后不再发第二半', r.calls.length===1, JSON.stringify(r.calls));
    chk('就地置了 S.stop（不必等外层 catch）', r.S.stop===true);
    chk('就地置了 S.paceOut', r.S.paceOut===true);
    chk('抛出物仍是 paceGiveUp（外层据此停整片）', r.err && r.err.paceGiveUp===true);
  }

  console.log('\n===== 结果 '+pass+' 通过 / '+fail+' 失败 =====');
  process.exit(fail?1:0);
})();
