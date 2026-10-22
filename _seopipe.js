/* _seopipe.js —— SEO 表扩写流水线：翻译 17 张表 × 73 种语言
 *
 * ⚠️ 为什么跟 _pipe339.js 分开：那边翻译的是「界面 337 键」，这边是「SEO 102 条」，
 *    源、脚本、产物目录全不一样，混在一起只会互相干扰。
 *
 * 用法：
 *   node _seopipe.js                       # 翻译所有还没译文的语言（默认 2 路并行）
 *   PAR=3 node _seopipe.js                 # 3 路并行
 *   node _seopipe.js ms fil fa             # 只翻这批
 *   node _seopipe.js --retry               # 只补「译文没齐 102 条」的
 *   node _seopipe.js --stat                # 只看进度，不翻译
 *
 * 状态写 _seo/pipe.log；_gemseo 自带断点续跑，中断后重跑自动接着来。
 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { spawn } = require('child_process');

const DIR = __dirname;
const OUT = path.join(DIR, '_seo');
const LOG = path.join(OUT, 'pipe.log');
const SRC = JSON.parse(fs.readFileSync(path.join(OUT, 'src.json'), 'utf8'));
const KEYS = Object.keys(SRC);
const NODE = process.execPath;

const argv = process.argv.slice(2);
const flags = argv.filter(a => a.startsWith('--'));
const want = argv.filter(a => !a.startsWith('--'));
const RETRY = flags.includes('--retry');
const STAT = flags.includes('--stat');
const PAR = Math.max(1, parseInt(process.env.PAR || '2', 10));

const ctx = { window: {} }; ctx.globalThis = ctx; vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(DIR, 'site-i18n.js'), 'utf8') + ';globalThis.__U = UI_LANGS; globalThis.__27 = UI27;', ctx);
const NEW = ctx.__U.filter(x => ctx.__27.indexOf(x[0]) < 0);

function say(s) { console.log(s); try { fs.appendFileSync(LOG, '[' + new Date().toISOString().slice(11, 19) + '] ' + s + '\n'); } catch (e) {} }

function pending() {
  return NEW.filter(x => !fs.existsSync(path.join(OUT, x[0] + '.json'))).map(x => x[0]);
}
function incomplete() {
  return NEW.filter(x => {
    const p = path.join(OUT, x[0] + '.json');
    if (fs.existsSync(p)) return false;
    const pp = path.join(OUT, x[0] + '.part.json');
    if (!fs.existsSync(pp)) return true;
    try { const d = JSON.parse(fs.readFileSync(pp, 'utf8')); return KEYS.some(k => !(k in d)); }
    catch (e) { return true; }
  }).map(x => x[0]);
}
function splitInto(list, n) {
  const out = []; for (let i = 0; i < n; i++) out.push([]);
  list.forEach((x, i) => out[i % n].push(x));
  return out.filter(a => a.length);
}

async function main() {
  const ready = NEW.length - pending().length;
  if (STAT) {
    say('进度：' + ready + '/' + NEW.length + ' 种语言译文齐全');
    pending().forEach(c => say('  待处理 ' + c));
    return;
  }
  const list = want.length ? want.slice() : (RETRY ? incomplete() : pending());
  if (!list.length) { say('没有待处理的语言（已就绪 ' + ready + '/' + NEW.length + '）'); return; }
  say('本批 ' + list.length + ' 种：' + list.join(' ') + '（PAR=' + PAR + '）');

  const workers = splitInto(list, PAR);
  say('翻译阶段：' + workers.length + ' 路并行 → ' + workers.map(w => w.join('+')).join(' | '));
  const jobs = workers.map((grp, i) => new Promise(res => {
    const env = Object.assign({}, process.env, { GEM_SESSION: 'gemseo' + (i + 1) });
    const p = spawn(NODE, ['_gemseo.js'].concat(grp), { cwd: DIR, env, stdio: ['ignore', 'pipe', 'pipe'] });
    let buf = '';
    p.stdout.on('data', d => { buf += d; });
    p.stderr.on('data', d => { buf += d; });
    p.on('close', code => res({ w: i + 1, code, grp, buf }));
  }));
  const rs = await Promise.all(jobs);
  for (const r of rs) {
    say('—— w' + r.w + '（' + r.grp.join(',') + '）退出码 ' + r.code);
    const lines = r.buf.split('\n').filter(x => /^(✓|·|\s*✓|\[)/.test(x));
    lines.slice(-12).forEach(x => say('   ' + x.trim()));
  }
  const done = NEW.length - pending().length;
  say('本批结束。译文齐全 ' + done + '/' + NEW.length);
}
main().catch(e => { console.error('FATAL:', e.message); process.exit(1); });
