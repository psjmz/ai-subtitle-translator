/* _fixseo.js —— 定点重翻 _seo/<lang>.json 里不合格的条目
 *
 * 为什么需要它：_gemseo.js 一轮翻 102 条，偶尔会有几条不守规矩 ——
 *   ① title 译完超过 80 字符（搜索引擎会截断，白写）
 *   ② kw 原样照抄英文（小语种尤其容易，模型偷懒直接留英文）
 * 全批重翻太浪费，这里只把「不合格的那几条」拎出来单独再发一次，要求更严。
 *
 * 判定口径：
 *   · title 长度必须落在 10~80；desc / ogDesc 落在 40~350 → 超了判 ERR
 *   · kw 与英文源逐字相同 → 判 ERR（关键词没本地化就等于没做）
 *     理由是：关键词就是给目标语言用户搜的，照抄英文等于放弃这一语种的搜索入口。
 *
 * 用法：
 *   node _fixseo.js --dry        # 只看哪些条目不合格，不改文件
 *   node _fixseo.js              # 重翻所有语言的不合格条目
 *   node _fixseo.js ms fil       # 只修指定语言
 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { spawn } = require('child_process');

const DIR = __dirname;
const OUT = path.join(DIR, '_seo');
const SRC = JSON.parse(fs.readFileSync(path.join(OUT, 'src.json'), 'utf8'));
const META = JSON.parse(fs.readFileSync(path.join(OUT, 'meta.json'), 'utf8'));
const KEYS = Object.keys(SRC);
const DRY = process.argv.includes('--dry');
const ONLY = process.argv.slice(2).filter(a => !a.startsWith('--'));

const SESS = process.env.GEM_SESSION || 'gemfix';
const AB = '/Users/jp/.workbuddy/binaries/node/workspace/node_modules/.bin/agent-browser';
const NODE_BIN = '/Users/jp/.workbuddy/binaries/node/versions/22.22.2-6/bin';
const PROXY = process.env.GEM_PROXY || 'http://127.0.0.1:7897';
const COOKIES = '/Users/jp/WorkBuddy/2026-09-03-09-11-13/cookies_work/cookies_clean.json';
const GAP = parseInt(process.env.GEM_GAP || '1200', 10);
const STABLE = parseInt(process.env.GEM_STABLE || '2', 10);

const ctx = { window: {} }; ctx.globalThis = ctx; vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(DIR, 'site-i18n.js'), 'utf8') + ';globalThis.__U = UI_LANGS; globalThis.__27 = UI27;', ctx);
const UI_LANGS = ctx.__U, UI27 = ctx.__27;

const tl = fs.readFileSync(path.join(DIR, 'translate.html'), 'utf8');
const lb = tl.indexOf('const LANGS = [');
const tlSeg = tl.slice(lb, tl.indexOf('];', lb));
const EN_NAME = {};
{
  const re = /\{\s*v\s*:\s*'([^']+)'[\s\S]*?en\s*:\s*'([^']*)'/g;
  let m; while ((m = re.exec(tlSeg))) EN_NAME[m[1]] = m[2];
}

const sleep = ms => new Promise(r => setTimeout(r, ms));
const TAGS = [
  ['<strong>', '«strong»'], ['</strong>', '«/strong»'],
  ['<b>', '«b»'], ['</b>', '«/b»'], ['<em>', '«em»'], ['</em>', '«/em»']
];
function esc(s) { let t = String(s); for (const [a, b] of TAGS) t = t.split(a).join(b); return t; }
function unesc(s) { let t = String(s); for (const [a, b] of TAGS) t = t.split(b).join(a); return t; }

let msgId = 0;
const pend = new Map();
function connect(wsUrl) {
  return new Promise((res, rej) => {
    const ws = new WebSocket(wsUrl);
    ws.onopen = () => res(ws);
    ws.onerror = rej;
    ws.onmessage = ev => {
      const m = JSON.parse(ev.data);
      if (m.id && pend.has(m.id)) {
        const p = pend.get(m.id); pend.delete(m.id);
        m.error ? p.reject(new Error(JSON.stringify(m.error))) : p.resolve(m.result);
      }
    };
  });
}
function send(ws, method, params, sessionId, timeoutMs = 120000) {
  return new Promise((resolve, reject) => {
    const id = ++msgId;
    const t = setTimeout(() => { pend.delete(id); reject(new Error(method + ' 超时')); }, timeoutMs);
    pend.set(id, { resolve: v => { clearTimeout(t); resolve(v); }, reject: e => { clearTimeout(t); reject(e); } });
    ws.send(JSON.stringify({ id, method, params, sessionId }));
  });
}
async function ev(ws, expression, sessionId) {
  const r = await send(ws, 'Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true }, sessionId);
  if (r.exceptionDetails) throw new Error(expression.slice(0, 60) + ' :: ' + (r.exceptionDetails.exception?.description || 'eval error'));
  return r.result.value;
}
function getPage(ws) { return send(ws, 'Target.getTargets', {}).then(t => { const p = t.targetInfos.filter(x => x.type === 'page'); return p.find(x => x.url.includes('gemini.google.com')) || p[0]; }); }

async function waitEditor(ws, sessionId, timeoutMs = 40000) {
  for (let i = 0; i < Math.ceil(timeoutMs / 1500); i++) {
    if (await ev(ws, `!!document.querySelector('.ql-editor[contenteditable="true"]')`, sessionId)) return true;
    await sleep(1500);
  }
  return false;
}
async function newChat(ws, sessionId) {
  const id = Math.random().toString(36).slice(2, 12);
  await send(ws, 'Page.navigate', { url: 'https://gemini.google.com/app/' + id }, sessionId);
  await sleep(5000);
  if (!await waitEditor(ws, sessionId)) throw new Error('新对话里输入框没出现');
  return await ev(ws, `document.querySelectorAll('model-response').length`, sessionId);
}
async function putPrompt(ws, sessionId, prompt) {
  await ev(ws, `(() => {
    const ed = document.querySelector('.ql-editor');
    if (!ed) return 'no-editor';
    ed.focus();
    document.execCommand('selectAll');
    document.execCommand('delete');
    return 'ok';
  })()`, sessionId);
  await sleep(300);
  await send(ws, 'Input.insertText', { text: prompt }, sessionId);
  await sleep(400);
  let len = await ev(ws, `(() => {
    const ed = document.querySelector('.ql-editor');
    return ed ? (ed.innerText || '').length : -1;
  })()`, sessionId);
  if (len < prompt.length * 0.9) {
    await ev(ws, `(() => {
      const ed = document.querySelector('.ql-editor');
      if (!ed) return 'no-editor';
      ed.focus();
      document.execCommand('selectAll');
      document.execCommand('delete');
      document.execCommand('insertText', false, ${JSON.stringify(prompt)});
      ed.dispatchEvent(new InputEvent('input', { bubbles: true, inputType: 'insertText', data: ${JSON.stringify(prompt)} }));
      return 'ok';
    })()`, sessionId);
    await sleep(400);
    len = await ev(ws, `(() => {
      const ed = document.querySelector('.ql-editor');
      return ed ? (ed.innerText || '').length : -1;
    })()`, sessionId);
  }
  return len;
}
async function ask(ws, sessionId, prompt, maxPoll = 60, gap = 1200) {
  if (!await waitEditor(ws, sessionId)) throw new Error('输入框一直没出现');
  const base = await ev(ws, `document.querySelectorAll('model-response').length`, sessionId);
  const len = await putPrompt(ws, sessionId, prompt);
  if (len < prompt.length * 0.9) throw new Error('提示词没塞进输入框（' + len + '/' + prompt.length + ' 字符）');
  await sleep(600);
  await send(ws, 'Input.dispatchKeyEvent', { type: 'keyDown', key: 'Enter', code: 'Enter', windowsVirtualKeyCode: 13 }, sessionId);
  await send(ws, 'Input.dispatchKeyEvent', { type: 'keyUp', key: 'Enter', code: 'Enter', windowsVirtualKeyCode: 13 }, sessionId);
  let prev = -1, same = 0, text = '';
  for (let i = 0; i < maxPoll; i++) {
    await sleep(gap);
    const n = await ev(ws, `document.querySelectorAll('model-response').length`, sessionId);
    if (n <= base) { prev = -1; same = 0; continue; }
    text = await ev(ws, `(() => {
      const rs = document.querySelectorAll('model-response');
      const last = rs[rs.length - 1];
      return (last.innerText || '').trim();
    })()`, sessionId);
    if (text && text.length === prev) same++; else same = 0;
    prev = text.length;
    if (text && same >= STABLE) break;
  }
  if (!text) throw new Error('没拿到任何回复文本');
  return text;
}

function parseLines(text) {
  const map = {};
  for (const raw of text.split('\n')) {
    const line = raw.replace(/\r$/, '');
    if (!line.trim()) continue;
    const i = line.indexOf(' :: ');
    if (i <= 0) continue;
    const key = line.slice(0, i).trim();
    if (!/^[A-Za-z0-9_]+$/.test(key)) continue;
    let val = line.slice(i + 4).replace(/^`+|`+$/g, '').trim();
    map[key] = unesc(val.replace(/\\n/g, '\n'));
  }
  return map;
}

/* 不合格判定：长度越界，或关键词照抄英文 */
function badKeys(lang, tr) {
  const out = [];
  for (const k of KEYS) {
    const en = String(SRC[k]);
    if (!(k in tr) || !String(tr[k]).trim()) { out.push([k, '缺/空']); continue; }
    const v = String(tr[k]);
    const f = META[k].field, n = v.length;
    if (f === 'title' && (n < 10 || n > 80)) { out.push([k, 'title ' + n + ' 字符']); continue; }
    if ((f === 'desc' || f === 'ogDesc') && (n < 40 || n > 350)) { out.push([k, f + ' ' + n + ' 字符']); continue; }
    if (f === 'kw' && v.trim() === en.trim()) { out.push([k, 'kw 未本地化']); continue; }
    if ((v.match(/\{\d\}/g) || []).sort().join(',') !== (en.match(/\{\d\}/g) || []).sort().join(',')) { out.push([k, '占位符']); continue; }
    if ((v.match(/«\/?(strong|b|em)»/g) || []).sort().join(',') !== (en.match(/«\/?(strong|b|em)»/g) || []).sort().join(',')) { out.push([k, '标记']); continue; }
  if ((v.match(/\d+(?:\.\d+)?\+?/g) || []).join(',') !== (en.match(/\d+(?:\.\d+)?\+?/g) || []).join(',')) { out.push([k, '数字']); continue; }
  if (['yue', 'ja', 'ko'].indexOf(lang) < 0 && /[\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF]/.test(v)) { out.push([k, '混入汉字']); continue; }
  return out;
}

(async () => {
  const targets = UI_LANGS.filter(x => UI27.indexOf(x[0]) < 0)
    .filter(x => !ONLY.length || ONLY.indexOf(x[0]) >= 0)
    .filter(x => fs.existsSync(path.join(OUT, x[0] + '.json')));

  const plan = [];
  for (const [code, native] of targets) {
    const tr = JSON.parse(fs.readFileSync(path.join(OUT, code + '.json'), 'utf8'));
    const bad = badKeys(code, tr);
    if (bad.length) plan.push([code, native, tr, bad]);
  }

  if (!plan.length) { console.log('没有不合格的条目'); return; }
  console.log('待修语言 ' + plan.length + ' 种：');
  plan.forEach(([c, n, , bad]) => console.log('  ' + c + ' ' + n + '：' + bad.length + ' 条 ' + bad.map(x => x[0]).join(',')));
  if (DRY) return;

  const env = Object.assign({}, process.env, { PATH: NODE_BIN + ':' + process.env.PATH, AGENT_BROWSER_PROXY: PROXY });
  const run = (a) => new Promise((res) => {
    let out = '';
    const p = spawn(AB, ['--session', SESS].concat(a), { env, stdio: ['ignore', 'pipe', 'pipe'] });
    p.stdout.on('data', d => out += d); p.stderr.on('data', d => out += d);
    p.on('close', () => res(out));
  });

  await run(['--proxy', PROXY, 'open', 'https://www.google.com/generate_204']);
  const wsUrl = ((await run(['get', 'cdp-url'])).match(/ws:\/\/[^\s"']+/) || [null])[0];
  if (!wsUrl) throw new Error('拿不到 cdp-url');
  const ws = await connect(wsUrl);
  const page = await getPage(ws);
  const { sessionId } = await send(ws, 'Target.attachToTarget', { targetId: page.targetId, flatten: true });
  await send(ws, 'Network.enable', {}, sessionId);
  await send(ws, 'Page.enable', {}, sessionId);
  await send(ws, 'Runtime.enable', {}, sessionId);

  const cookies = JSON.parse(fs.readFileSync(COOKIES, 'utf8'));
  let n = 0;
  for (const c of cookies) {
    const p = { name: c.name, value: c.value, domain: c.domain, path: c.path || '/', secure: !!c.secure, httpOnly: !!c.httpOnly };
    if (c.sameSite && ['Strict', 'Lax', 'None'].includes(c.sameSite)) p.sameSite = c.sameSite;
    if (c.expires && c.expires > 0) p.expires = c.expires;
    try { await send(ws, 'Network.setCookie', p, sessionId); n++; } catch (e) {}
  }

  for (const [code, native, tr, bad] of plan) {
    const enName = EN_NAME[code] || code;
    console.log('\n[' + code + '] 修 ' + bad.length + ' 条');
    await newChat(ws, sessionId);
    const keys = bad.map(x => x[0]);
    const lines = keys.map(k => k + ' :: ' + esc(String(SRC[k])));
    const prompt = [
      'You are localizing SEO metadata for AI-SRTSub, a free AI subtitle translator',
      '(upload SRT/VTT/ASS, pick a language, get a timeline-aligned translation).',
      '',
      `The lines below were translated into ${enName} (${native}), but each one broke a rule.`,
      'Re-translate them. Output  KEY :: Translated text  for each, same order, raw lines only.',
      '',
      'Rules that were broken (fix these):',
      ...keys.map(k => {
        const f = META[k].field;
        if (f === 'title') return '  - ' + k + '：title 必须 10~78 字符，超了就删掉修饰词压短，别硬截断';
        if (f === 'kw') return '  - ' + k + '：关键词必须用 ' + enName + ' 重写，照抄英文等于没做；词条数保持 ' + String(SRC[k]).split(',').length + ' 个，逗号分隔不带空格';
        if (f === 'desc' || f === 'ogDesc') return '  - ' + k + '：长度必须 40~350 字符';
        return '  - ' + k + '：占位符 / 强调标记 / 数字必须与英文源一致';
      }),
      '',
      'Also keep: «strong» «/strong» «b» «/b» «em» «/em» markers in pairs, placeholders {0} {1},',
      'and never translate AI-SRTSub / SRT / VTT / ASS / SBV / TXT / WebVTT / API / URL.',
      '',
      '---',
      lines.join('\n'),
    ].join('\n');

    const text = await ask(ws, sessionId, prompt);
    const map = parseLines(text);
    let fixed = 0;
    for (const k of keys) {
      if (!(k in map) || !String(map[k]).trim()) continue;
      const f = META[k].field;
      const v = String(map[k]);
      if (f === 'title' && (v.length < 10 || v.length > 80)) continue;
      if ((f === 'desc' || f === 'ogDesc') && (v.length < 40 || v.length > 350)) continue;
      if (f === 'kw' && (v.trim() === String(SRC[k]).trim() || v.split(',').length !== String(SRC[k]).split(',').length)) continue;
      tr[k] = v; fixed++;
    }
    fs.writeFileSync(path.join(OUT, code + '.json'), JSON.stringify(tr, null, 1), 'utf8');
    console.log('  已修 ' + fixed + '/' + keys.length);
  }
  console.log('\n修复完成。');
  process.exit(0);
})().catch(e => { console.error('FATAL:', e.message); process.exit(1); });
