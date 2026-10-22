/* _pipe339.js —— 界面语言分片流水线：翻译 → 生成 → 校验，一条命令跑完一批语言
 *
 * 为什么要有它：_gem339.js 只产出 _tr/<lang>.json（译文），_mkall339.js 才把它转成
 * i18n/ui-<lang>.js（页面能加载的分片），之后还要跑 _chkshard（结构）+ _lint339（内容）。
 * 手工一步步敲，一种语言要敲 4 条命令；37 种就是 148 条，而且中途断了要人工判断续哪里。
 *
 * 用法：
 *   node _pipe339.js gl am ha yo zu so     # 依次翻译这一批，全部译完后统一生成+校验
 *   PAR=3 node _pipe339.js gl am ha yo zu  # 3 路并行（每路一个 Chrome 实例，靠 --session 隔离）
 *   node _pipe339.js --no-tr gl am         # 跳过翻译，只做生成+校验（译文已就绪时）
 *   node _pipe339.js --retry               # 只重试「译文没齐 337 条」的语言
 *
 * 设计要点：
 *   · 翻译阶段并行（N 个 Chrome 实例），生成/校验阶段串行 —— 后者是纯本地文件操作，
 *     几秒就完，并行反而容易写冲突。
 *   · 任一种语言失败 → 记录原因并继续，不会卡死整批。
 *   · 状态写 _tr/pipe.log；_gem339 自带断点续跑，中断后重跑自动接着来。
 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { spawn, spawnSync } = require('child_process');

const DIR = __dirname;
const TR = path.join(DIR, '_tr');
const LOG = path.join(TR, 'pipe.log');
const CORE = JSON.parse(fs.readFileSync(path.join(DIR, '_core338.json'), 'utf8'));
const KEYS = Object.keys(CORE);
const NODE = process.execPath;

const argv = process.argv.slice(2);
const flags = argv.filter(a => a.startsWith('--'));
const want = argv.filter(a => !a.startsWith('--'));
const NO_TR = flags.includes('--no-tr');
const RETRY = flags.includes('--retry');
const PAR = Math.max(1, parseInt(process.env.PAR || '2', 10));

/* —— 语言元数据：母语自称 + 英文名 —— */
const ctx = { window: {} }; ctx.globalThis = ctx; vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(DIR, 'site-i18n.js'), 'utf8') + ';globalThis.__U = UI_LANGS; globalThis.__27 = UI27;', ctx);
const NATIVE = {};
for (const [code, nat] of ctx.__U) NATIVE[code] = nat;
const tl = fs.readFileSync(path.join(DIR, 'translate.html'), 'utf8');
const lb = tl.indexOf('const LANGS = [');
const seg = tl.slice(lb, tl.indexOf('];', lb));
const EN_NAME = {};
{ const re = /\{\s*v\s*:\s*'([^']+)'[\s\S]*?en\s*:\s*'([^']*)'/g; let m; while ((m = re.exec(seg))) EN_NAME[m[1]] = m[2]; }

function say(s) { console.log(s); try { fs.appendFileSync(LOG, '[' + new Date().toISOString().slice(11, 19) + '] ' + s + '\n'); } catch (e) {} }

/* 待办：所有「新增语言里还没有 i18n/ui-<lang>.js」的 */
function pending() {
  const built = new Set(fs.readdirSync(path.join(DIR, 'i18n')).filter(f => /^ui-[a-z]{2,3}\.js$/.test(f)).map(f => f.slice(3, -3)));
  return ctx.__U.filter(x => ctx.__27.indexOf(x[0]) < 0).map(x => x[0]).filter(c => !built.has(c));
}
/* 译文没齐的（断点续跑对象） */
function incomplete() {
  return pending().filter(c => {
    const p = path.join(TR, c + '.json');
    if (!fs.existsSync(p)) return true;
    try { const d = JSON.parse(fs.readFileSync(p, 'utf8')); return KEYS.some(k => !(k in d)); }
    catch (e) { return true; }
  });
}
/* 轮询分配：保证每路语言数尽量均衡 */
function splitInto(list, n) {
  const out = []; for (let i = 0; i < n; i++) out.push([]);
  list.forEach((x, i) => out[i % n].push(x));
  return out.filter(a => a.length);
}
function runSync(args) {
  const r = spawnSync(NODE, args, { cwd: DIR, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
  return { code: r.status, out: (r.stdout || '') + (r.stderr || '') };
}

async function main() {
  let list = want.length ? want.slice() : (RETRY ? incomplete() : pending());
  if (!list.length) { say('没有待处理的语言'); return; }
  say('本批 ' + list.length + ' 种：' + list.join(' ') + '（PAR=' + PAR + '）');

  if (!NO_TR) {
    const workers = splitInto(list, PAR);
    say('翻译阶段：' + workers.length + ' 路并行 → ' + workers.map(w => w.join('+')).join(' | '));
    const jobs = workers.map((grp, i) => new Promise(res => {
      const env = Object.assign({}, process.env, { GEM_SESSION: 'gem' + (i + 1) });
      const p = spawn(NODE, ['_gem339.js'].concat(grp), { cwd: DIR, env, stdio: ['ignore', 'pipe', 'pipe'] });
      let buf = '';
      p.stdout.on('data', d => { buf += d; process.stdout.write('  [w' + (i + 1) + '] ' + d); });
      p.stderr.on('data', d => { buf += d; });
      p.on('close', code => res({ w: i + 1, code, grp, buf }));
    }));
    const rs = await Promise.all(jobs);
    for (const r of rs) {
      if (r.code !== 0) say('  ✗ w' + r.w + ' 翻译失败（' + r.grp.join(',') + '），退出码 ' + r.code);
    }
  }

  /* 生成 + 校验：串行，跑所有译文已就绪的 */
  say('生成分片 …');
  const g = runSync(['_mkall339.js']);
  console.log(g.out.trim());
  say('结构校验 …');
  const c = runSync(['_chkshard.js']);
  const cline = (c.out.match(/^\s*\d+ ✓ \/ \d+ ✗.*$/m) || [''])[0].trim();
  say('  ' + cline);
  say('内容校验 …');
  const l = runSync(['_lint339.js']);
  const lline = (l.out.match(/ERR \d+ \/ WARN \d+.*$/m) || [''])[0].trim();
  say('  ' + lline);
  say('本批结束。');
}
main().catch(e => { console.error('FATAL:', e.message); process.exit(1); });
