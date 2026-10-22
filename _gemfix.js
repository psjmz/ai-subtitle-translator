/* _gemfix.js —— 定点重翻不合格条目（界面 337 键 / SEO 102 条 通用）
 *
 * 为什么需要它：_gem339.js 与 _gemseo.js 一次翻整批，偶尔有几条不守规矩 ——
 *   ① 非中日韩语言的译文里残留汉字（模型没翻干净，提格利尼亚语里冒出「分组」）
 *   ② SEO 的 title 译完超过 80 字符（搜索引擎会截断）
 *   ③ SEO 的 kw 原样照抄英文（关键词没本地化 = 这一语种等于没做）
 * 全批重翻太浪费，这里只把不合格的那几条拎出来再翻一次，要求写得更死。
 *
 * ❗CDP 那段是从 _gem339.js 原样搬过来的，不要手写改写 —— 手抄括号必错。
 *
 * 用法：
 *   MODE=ui  node _gemfix.js --dry     # 只列界面语言的不合格条目
 *   MODE=ui  node _gemfix.js ti        # 重翻 ti 的不合格条目
 *   MODE=seo node _gemfix.js fil       # 重翻 fil 的 SEO 不合格条目
 *   MODE=seo node _gemfix.js --all     # 重翻所有 SEO 语言的不合格条目
 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { spawn } = require('child_process');

const DIR = __dirname;
const MODE = (process.env.MODE || 'ui').toLowerCase();
const SEO = MODE === 'seo';
const OUT = SEO ? path.join(DIR, '_seo') : path.join(DIR, '_tr');

const SRC = JSON.parse(fs.readFileSync(SEO ? path.join(OUT, 'src.json') : path.join(DIR, '_core338.json'), 'utf8'));
const META = SEO ? JSON.parse(fs.readFileSync(path.join(OUT, 'meta.json'), 'utf8')) : null;
const KEYS = Object.keys(SRC);

const SESS = process.env.GEM_SESSION || 'gemfix';
const GAP = parseInt(process.env.GEM_GAP || '1200', 10);
const STABLE = parseInt(process.env.GEM_STABLE || '2', 10);
const AB = '/Users/jp/.workbuddy/binaries/node/workspace/node_modules/.bin/agent-browser';
const NODE_BIN = '/Users/jp/.workbuddy/binaries/node/versions/22.22.2-6/bin';
const PROXY = process.env.GEM_PROXY || 'http://127.0.0.1:7897';
const COOKIES = '/Users/jp/WorkBuddy/2026-09-03-09-11-13/cookies_work/cookies_clean.json';

const ctx = { window: {} }; ctx.globalThis = ctx; vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(DIR, 'site-i18n.js'), 'utf8') + ';globalThis.__U = UI_LANGS; globalThis.__27 = UI27;', ctx);
const UI_LANGS = ctx.__U, UI27 = ctx.__27;
const NEW = UI_LANGS.filter(x => UI27.indexOf(x[0]) < 0);

const tl = fs.readFileSync(path.join(DIR, 'translate.html'), 'utf8');
const lb = tl.indexOf('const LANGS = [');
const tlSeg = tl.slice(lb, tl.indexOf('];', lb));
const EN_NAME = {};
{
  const re = /\{\s*v\s*:\s*'([^']+)'[\s\S]*?en\s*:\s*'([^']*)'/g;
  let m; while ((m = re.exec(tlSeg))) EN_NAME[m[1]] = m[2];
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

/* ⚠️ 原样喂 <strong> 会被 Gemini 当 HTML 吞掉，换成 «strong» 这种不像标签的写法。 */
const TAGS = [
  ['<strong>', '«strong»'], ['</strong>', '«/strong»'],
  ['<b>', '«b»'], ['</b>', '«/b»'],
  ['<em>', '«em»'], ['</em>', '«/em»']
];
function esc(s) { let t = String(s); for (const [a, b] of TAGS) t = t.split(a).join(b); return t; }
function unesc(s) { let t = String(s); for (const [a, b] of TAGS) t = t.split(b).join(a); return t; }

const HAN = /[\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF]/;
const CJK_OK = ['yue', 'ja', 'ko'];
function norm(v) { return String(v); }
function ph(s) { return (s.match(/\{\d\}/g) || []).sort().join(','); }
/* 两边都按原始 <tag> 比：SRC 存的是原始标签，译文经 parseLines 的 unesc 也已还原。
   ⚠️ 原来查 «tag»，两边都匹配不上 → 恒相等 → 这条检查形同虚设。 */
function tg(s) { return (s.match(/<\/?(strong|b|em)>/g) || []).sort().join(','); }
/* 数字要先归一化：波斯语 ۱۰۰ / 阿拉伯语 ١٠٠ / 梵文 १०० 都是合法写法，
   不归一化会把「翻对了」误判成「数字丢了」（fa 三条卡死流水线就是这个原因）。 */
const DIGIT_BASES = [
  0x0660, 0x06F0, 0x07C0, 0x0966, 0x09E6, 0x0A66, 0x0AE6, 0x0B66, 0x0BE6,
  0x0C66, 0x0CE6, 0x0D66, 0x0E50, 0x0ED0, 0x0F20, 0x1040, 0x17E0, 0x1810,
  0x1A80, 0x1A90, 0x1B50, 0x1BB0, 0x1C40, 0x1C50, 0xA620, 0xA8D0, 0xA900,
  0xA9D0, 0xA9F0, 0xAA50, 0xABF0, 0xFF10, 0x10E60, 0x11066, 0x110F0, 0x11136,
  0x111D0, 0x112F0, 0x11450, 0x114D0, 0x11650, 0x116C0, 0x11730, 0x118E0,
  0x11950, 0x11C50, 0x11D50, 0x11DA0, 0x16A60, 0x16B50, 0x1D7CE, 0x1E950
];
const DMAP = {};
for (const b of DIGIT_BASES) for (let d = 0; d < 10; d++) DMAP[String.fromCodePoint(b + d)] = String(d);
function asciiDigits(s) {
  let out = '';
  for (const ch of String(s)) { const d = DMAP[ch]; out += d === undefined ? ch : d; }
  return out;
}
/* 同样不带 \+?，理由见 _gemseo.js 的 numOk */
function nm(s) { return (asciiDigits(s).match(/\d+(?:\.\d+)?/g) || []).join(','); }

/* 解析 Gemini 的回复：一行一条 KEY :: 译文。
   ⚠️ 当初拼装本文件时，提取的 CDP 尾段是从「等输入框就绪」起，把 parseLines
      落在了区间外 —— 于是本文件压根没有这个函数，一跑到解析就崩。
      这里按 _gem339.js 的原实现补齐（含去掉 markdown 包裹 / 还原 «tag» / \n）。 */
function parseLines(text) {
  const map = {};
  for (const raw of text.split('\n')) {
    const line = raw.replace(/\r$/, '');
    if (!line.trim()) continue;
    const i = line.indexOf(' :: ');
    if (i <= 0) continue;
    const key = line.slice(0, i).trim();
    if (!/^[A-Za-z0-9_]+$/.test(key)) continue;
    let val = line.slice(i + 4);
    /* 去掉 markdown 行内包裹与列表符号 */
    val = val.replace(/^`+|`+$/g, '').trim();
    map[key] = unesc(val.replace(/\\n/g, '\n'));
  }
  return map;
}

/* 每条英文源：界面那份是 {en: ...}，SEO 那份是纯字符串 */
function enOf(k) { const v = SRC[k]; return String(v && v.en !== undefined ? v.en : v); }
/* 键名最后一个 __ 之后的部分 = 字段名（SEO 用） */
function fieldOf(k) { return SEO ? META[k].field : ''; }

/* 判定一条译文是否合格，返回原因（合格返回 null） */
function why(lang, k, tr) {
  if (!(k in tr) || !String(tr[k]).trim()) return '缺/空';
  const en = enOf(k), v = String(tr[k]);
  if (CJK_OK.indexOf(lang) < 0 && HAN.test(v)) return '残留汉字：' + (v.match(HAN) || []).join('');
  if (ph(en) !== ph(v)) return '占位符 ' + ph(en) + '→' + ph(v);
  if (tg(en) !== tg(v)) return '强调标记 ' + tg(en) + '→' + tg(v);
  if (nm(en) !== nm(v)) return '数字 [' + nm(en) + ']→[' + nm(v) + ']';
  /* 漏译：整条与英文源一模一样。
     只在「这段英文确实有可译内容」时才判：4 个连续字母以上 且 长度 ≥14，
     这样 "SRT / VTT"、"AI-SRTSub"、"GitHub" 这类不会被误伤。 */
  if (v.trim() === en.trim() && /[a-z]{4,}/i.test(en) && en.length >= 14) return '漏译（与英文完全相同）';
  if (SEO) {
    const f = fieldOf(k), n = v.length;
    if (f === 'title' && (n < 10 || n > 78)) return 'title 长度 ' + n;
    if ((f === 'desc' || f === 'ogDesc') && (n < 40 || n > 350)) return f + ' 长度 ' + n;
    if (f === 'kw') {
      if (v.trim() === en.trim()) return 'kw 未本地化';
      if (v.split(',').length !== en.split(',').length) return 'kw 词条数 ' + en.split(',').length + '→' + v.split(',').length;
    }
  } else {
    /* 界面（UI）模式：__title 之外的长度约束不适用，
       但「整条照抄英文」必须拦 —— 界面文案留英文 = 这语言白做。 */
  }
  return null;
}

const HARD = [
  'Hard rules:',
  '- Output raw lines only, in the same order, formatted as  KEY :: Translated text.',
  '- No CJK ideographs anywhere. Translate every single word into the target language.',
  '- Keep placeholders exactly as-is: {0} {1} {2} {3}',
  '- Keep markup markers exactly as-is and in matching pairs: «b» «/b» «em» «/em» «strong» «/strong»',
  '  These are NOT HTML. Copy them character for character.',
  '- Keep all numbers exactly as in the English source.',
  '- Never translate: AI-SRTSub, RiseKol, OpenAI, GitHub, YouTube, Bilibili, Douyin,',
  '  Netflix, macOS, Windows, SRT, VTT, ASS, SBV, TXT, WebVTT, API, URL',
];

function buildFixPrompt(code, native, enName, keys, reasons) {
  const lines = keys.map(k => k + ' :: ' + esc(enOf(k).replace(/\n/g, '\\n')));
  const rules = keys.map((k, i) => {
    const f = SEO ? fieldOf(k) : '';
    if (/残留汉字/.test(reasons[i])) return '  - ' + k + '：中文没翻干净，把每个汉字都译成目标语言，一个都别留';
    if (f === 'title') return '  - ' + k + '：title 必须 10~78 字符，超了就删修饰词压短，别硬截断';
    if (f === 'kw') return '  - ' + k + '：关键词必须用目标语言重写（照抄英文等于没做），词条数保持 ' + enOf(k).split(',').length + ' 个，逗号分隔不带空格';
    if (f === 'desc' || f === 'ogDesc') return '  - ' + k + '：长度必须 40~350 字符';
    return '  - ' + k + '：占位符 / 强调标记 / 数字必须与英文源一致';
  });
  return [
    'You are localizing text for AI-SRTSub, a free AI subtitle translator',
    '(upload an SRT/VTT/ASS file, pick a target language, get a timeline-aligned translation).',
    '',
    `The line(s) below were translated into ${enName} (${native}), code: ${code},`,
    'but each one broke a rule listed under it. Re-translate them correctly.',
    '',
    ...rules,
    '',
    ...HARD,
    '',
    '---',
    lines.join('\n'),
  ].join('\n');
}

/* ---------------- CDP ---------------- */
let msgId = 0;
const pending = new Map();
function connect(wsUrl) {
  return new Promise((res, rej) => {
    const ws = new WebSocket(wsUrl);
    ws.onopen = () => res(ws);
    ws.onerror = rej;
    ws.onmessage = ev => {
      const m = JSON.parse(ev.data);
      if (m.id && pending.has(m.id)) {
        const p = pending.get(m.id); pending.delete(m.id);
        m.error ? p.reject(new Error(JSON.stringify(m.error))) : p.resolve(m.result);
    }
    };
  });
}
function send(ws, method, params, sessionId, timeoutMs = 120000) {
  return new Promise((resolve, reject) => {
    const id = ++msgId;
    pending.set(id, { resolve, reject });
    const payload = { id, method, params: params || {} };
    if (sessionId) payload.sessionId = sessionId;
    ws.send(JSON.stringify(payload));
    setTimeout(() => {
      if (pending.has(id)) { pending.delete(id); reject(new Error('timeout: ' + method)); }
    }, timeoutMs);
  });
}
async function ev(ws, expression, sessionId) {
  const r = await send(ws, 'Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true }, sessionId);
  if (r.exceptionDetails) throw new Error(expression.slice(0, 60) + ' :: ' + (r.exceptionDetails.exception?.description || 'eval error'));
  return r.result.value;
}
function getPage(ws) { return send(ws, 'Target.getTargets', {}).then(t => { const p = t.targetInfos.filter(x => x.type === 'page'); return p.find(x => x.url.includes('gemini.google.com')) || p[0]; }); }

/* 开一个全新的对话。
   ⚠️ 直接访问 /app 会「恢复上次对话」——那样上一种语言的术语会串味，
      而且 model-response 基线不为 0，等待逻辑会认错新回复。
   /app/<随机串> 是 Gemini 创建新对话的入口，访问不存在的 id 就开新的。 */
async function newChat(ws, sessionId) {
  const id = Math.random().toString(36).slice(2, 12);
  await send(ws, 'Page.navigate', { url: 'https://gemini.google.com/app/' + id }, sessionId);
  await sleep(5000);
  if (!await waitEditor(ws, sessionId)) throw new Error('新对话里输入框没出现');
  return await ev(ws, `document.querySelectorAll('model-response').length`, sessionId);
}


(async () => {
  const args = process.argv.slice(2);
  const DRY = args.includes('--dry');
  const ALL = args.includes('--all');
  const list = (ALL ? NEW.map(x => x[0]) : args.filter(a => !a.startsWith('--')));
  if (!list.length) { console.log('用法：MODE=ui|seo node _gemfix.js <lang> [lang2 …] | --all [--dry]'); return; }

  /* 先扫一遍，挑出不合格条目 */
  const plan = [];
  for (const code of list) {
    const p = path.join(OUT, code + '.json');
    if (!fs.existsSync(p)) { console.log('· ' + code + ' 没有译文，跳过'); continue; }
    const tr = JSON.parse(fs.readFileSync(p, 'utf8'));
    const bad = [];
    for (const k of KEYS) { const r = why(code, k, tr); if (r) bad.push([k, r]); }
    if (bad.length) plan.push([code, tr, bad]);
  }
  if (!plan.length) { console.log('全部合格，无需修复'); return; }
  console.log('待修 ' + plan.length + ' 种语言：');
  plan.forEach(([c, , bad]) => console.log('  ' + c + '：' + bad.length + ' 条 → ' + bad.map(x => x[0]).join(', ')));
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
  console.log('登录 cookies 注入 ' + n + '/' + cookies.length);

  for (const [code, tr, bad] of plan) {
    const native = (NEW.find(x => x[0] === code) || [code, code])[1];
    const enName = EN_NAME[code] || code;
    console.log('\n[' + code + '] ' + enName + ' 修 ' + bad.length + ' 条');
    await newChat(ws, sessionId);
    /* 分块：一次最多 6 条 / 2600 字符。
       老提示词翻出来的语言可能一次有 15~16 条缺陷，全塞进一条 prompt
       会把回复撑到截断，末尾几条直接消失。 */
    const groups = [];
    let cur = [], curLen = 0;
    for (const b of bad) {
      const len = String(SRC[b[0]]).length;
      if (cur.length && (cur.length >= 6 || curLen + len > 2600)) { groups.push(cur); cur = []; curLen = 0; }
      cur.push(b); curLen += len;
    }
    if (cur.length) groups.push(cur);

    let fixed = 0;
    for (let gi = 0; gi < groups.length; gi++) {
      const keys = groups[gi].map(x => x[0]);
      const reasons = groups[gi].map(x => x[1]);
      const prompt = buildFixPrompt(code, native, enName, keys, reasons);
      const text = await ask(ws, sessionId, prompt);
      if (process.env.GEM_DEBUG) fs.writeFileSync(path.join(OUT, 'fixdbg-' + code + '-' + gi + '.txt'), text);
      const map = parseLines(text);
      for (const k of keys) {
        const cand = map[k];
        if (cand === undefined || !String(cand).trim()) continue;
        const probe = Object.assign({}, tr);
        probe[k] = cand;
        if (why(code, k, probe)) continue;
        tr[k] = cand; fixed++;
      }
      fs.writeFileSync(path.join(OUT, code + '.json'), JSON.stringify(tr, null, 1), 'utf8');
      console.log('  第' + (gi + 1) + '/' + groups.length + ' 组：累计已修 ' + fixed + '/' + bad.length);
    }
  }
  console.log('\n修复完成。');
  process.exit(0);
})().catch(e => { console.error('FATAL:', e.message); process.exit(1); });

/* 等输入框就绪 */
async function waitEditor(ws, sessionId, timeoutMs = 40000) {
  for (let i = 0; i < Math.ceil(timeoutMs / 1500); i++) {
    const ok = await ev(ws, `!!document.querySelector('.ql-editor[contenteditable="true"]')`, sessionId);
    if (ok) return true;
    await sleep(1500);
  }
  return false;
}

/* 往 Quill 输入框里塞文本。
   ⚠️ 三条路都试，因为各有各的坑：
     ① CDP Input.insertText（首选）—— 能处理长文本 + 换行，不触发 TrustedHTML 报错
     ② execCommand insertText —— 老办法，Quill 对超长多行文本会丢内容（实测）
     ③ innerHTML —— 新版 Chrome 强制 TrustedHTML，直接抛错，仅兜底 */
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

  if (len < prompt.length * 0.9) {           /* 没塞进去：换老办法 */
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

/* 发一条消息等生成结束，返回本轮新增的那条 model-response 的文本 */
async function ask(ws, sessionId, prompt, maxPoll = 40, gap = 4000) {
  if (!await waitEditor(ws, sessionId)) throw new Error('输入框一直没出现');

  const base = await ev(ws, `document.querySelectorAll('model-response').length`, sessionId);

  const len = await putPrompt(ws, sessionId, prompt);
  if (len < prompt.length * 0.9) {
    throw new Error('提示词没塞进输入框（' + len + '/' + prompt.length + ' 字符）');
  }

  await sleep(600);
  await send(ws, 'Input.dispatchKeyEvent', { type: 'keyDown', key: 'Enter', code: 'Enter', windowsVirtualKeyCode: 13 }, sessionId);
  await send(ws, 'Input.dispatchKeyEvent', { type: 'keyUp', key: 'Enter', code: 'Enter', windowsVirtualKeyCode: 13 }, sessionId);

  let prev = -1, same = 0, text = '';
  for (let i = 0; i < maxPoll; i++) {
    await sleep(gap);
    const n = await ev(ws, `document.querySelectorAll('model-response').length`, sessionId);
    if (n <= base) { prev = -1; same = 0; continue; }   /* 回复还没挂上来 */
    text = await ev(ws, `(() => {
      const rs = document.querySelectorAll('model-response');
      const last = rs[rs.length - 1];
      return (last.innerText || '').trim();
    })()`, sessionId);
    if (text && text.length === prev) same++; else same = 0;
    prev = text.length;
    if (text && same >= STABLE) break;                  /* 连续 STABLE+1 轮长度不变才算生成完 */
    if (i % 6 === 5) console.log('    … 已等 ' + ((i + 1) * gap / 1000) + 's，收 ' + text.length + ' 字符');
  }
  if (!text) throw new Error('没拿到任何回复文本');
  return text;
}
