/* _gemseo.js —— 用已登录的 Gemini（网页版）翻译 17 张 SEO 表的 101 条文案
 *
 * 为什么单开一份：_gem339.js 是给「界面 337 键」写的，源、提示词、判定规则都不一样。
 *   界面文案是短标签（按钮/提示），SEO 文案是标题+描述+关键词+整段正文，长度差两个量级；
 *   SEO 还多了「title 不超 80 字符」「关键词条数要对齐」这类硬约束。
 *   按项目规矩（新功能复制另写一份、不动老文件），这里是独立脚本。
 *
 * ⚠️ 分块为什么按「页」而不是按条数：同一页的 title/desc/kw/intro/feat/who 放进同一批，
 *   模型能看到整页上下文，术语和说法才统一（比如「字幕条」全页一致）。
 *   copy 那 5 段跟着首页走 —— 它们本来就是同一段落地页正文。
 *
 * 用法：
 *   node _gemseo.js ms            # 翻译一种
 *   node _gemseo.js ms fil fa     # 依次翻译多种
 *   MAXC=1 node _gemseo.js ms     # 只跑第 1 批（调链路用）
 *   GEM_SESSION=gemseo1 node _gemseo.js ms
 *
 * 输入：_seo/src.json（_exseo.js 抽出）
 * 断点：_seo/<lang>.part.json
 * 输出：_seo/<lang>.json（键 → 该语言译文）
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const DIR = __dirname;
const OUT = path.join(DIR, '_seo');
const SRC = JSON.parse(fs.readFileSync(path.join(OUT, 'src.json'), 'utf8'));
const META = JSON.parse(fs.readFileSync(path.join(OUT, 'meta.json'), 'utf8'));
const KEYS = Object.keys(SRC);

/* 每批塞几个页面（同一页的条目不拆开）；另设字符上限兜底，避免大段 copy 撑爆生成长度 */
const PER = parseInt(process.env.PER || '4', 10);
const MAXCH = parseInt(process.env.MAXCH || '3000', 10);
const SESS = process.env.GEM_SESSION || 'gemseo';
/* GEM_WHY=1：补发时把每条被拒的具体原因打出来。
   排查「明明翻对了却一直判缺」这类判据 bug 用 —— 光看「还缺 N 条」什么也看不出来。 */
const GEM_WHY = !!process.env.GEM_WHY;
const GAP = parseInt(process.env.GEM_GAP || '1200', 10);
const STABLE = parseInt(process.env.GEM_STABLE || '2', 10);

const AB = '/Users/jp/.workbuddy/binaries/node/workspace/node_modules/.bin/agent-browser';
const NODE_BIN = '/Users/jp/.workbuddy/binaries/node/versions/22.22.2-6/bin';
const PROXY = process.env.GEM_PROXY || 'http://127.0.0.1:7897';
const COOKIES = '/Users/jp/WorkBuddy/2026-09-03-09-11-13/cookies_work/cookies_clean.json';

const vm = require('vm');
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

/* ⚠️ 为什么要转义：原样喂 <strong> 会被 Gemini 当 HTML 吞掉（界面那批实测丢过 <b>）。
      换成 «strong» 这种不像标签的写法，模型会老老实实当普通字符保留。 */
const TAGS = [
  ['<strong>', '«strong»'], ['</strong>', '«/strong»'],
  ['<b>', '«b»'], ['</b>', '«/b»'],
  ['<em>', '«em»'], ['</em>', '«/em»']
];
function esc(s) { let t = String(s); for (const [a, b] of TAGS) t = t.split(a).join(b); return t; }
function unesc(s) { let t = String(s); for (const [a, b] of TAGS) t = t.split(b).join(a); return t; }

/* ---------------- CDP ---------------- */
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

/* /app/<随机串> = 新建对话入口；直接访问 /app 会恢复上次对话，上一语言的术语会串味 */
async function newChat(ws, sessionId) {
  const id = Math.random().toString(36).slice(2, 12);
  await send(ws, 'Page.navigate', { url: 'https://gemini.google.com/app/' + id }, sessionId);
  await sleep(5000);
  if (!await waitEditor(ws, sessionId)) throw new Error('新对话里输入框没出现');
  return await ev(ws, `document.querySelectorAll('model-response').length`, sessionId);
}
/* 带重试的 newChat：调用点都在 try 块外面，一次超时就会掀掉整条 lane。 */
async function newChatRetry(ws, sessionId, tries) {
  let last;
  for (let i = 1; i <= (tries || 3); i++) {
    try { return await newChat(ws, sessionId); }
    catch (e) { last = e; console.log('  [newChat 第' + i + '次失败] ' + e.message.slice(0, 80) + '，3 秒后重试'); await sleep(3000); }
  }
  throw last;
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
    if (i % 10 === 9) console.log('    … 已等 ' + ((i + 1) * gap / 1000) + 's，收 ' + text.length + ' 字符');
  }
  if (!text) throw new Error('没拿到任何回复文本');
  return text;
}

/* ---------------- 提示词 ---------------- */
const COMMON = [
  'You are localizing the SEO metadata and on-page copy of a web app called AI-SRTSub.',
  'It is a free, privacy-first AI subtitle translator: you upload a subtitle file, pick a',
  'target language and a style, and it translates while keeping the timeline aligned,',
  'wrapping lines at natural points, removing filler cues and keeping proper nouns consistent.',
  '',
  'Input:  lines of the form  KEY :: English text',
  'Output: the same number of lines, in the same order, as  KEY :: Translated text',
  '',
  'Hard rules:',
  '- Keep placeholders exactly as-is: {0} {1} {2} {3}',
  '- Keep these markup markers exactly as-is, in matching pairs:',
  '    «strong» ... «/strong»   «b» ... «/b»   «em» ... «/em»',
  '  These are NOT HTML. Copy them character for character. Never drop them, never add extras.',
  '- Never translate these tokens: AI-SRTSub, RiseKol, OpenAI, GitHub, YouTube, Bilibili,',
  '  Douyin, Netflix, macOS, Windows, SRT, VTT, ASS, SBV, TXT, WebVTT, API, URL',
  '- Keep every number exactly as in the English source (100, 15+, 32, 24, 0.5 …)',
  '- In this product "Cue" means one subtitle entry; "Batch" means handling several files at once',
  '',
  'Per-key rules (the suffix after the last __ tells you which):',
  '- __title      page title. MUST be 10 to 78 characters — search engines truncate past 80,',
  '               so count the characters before you answer. If it runs long, cut filler words',
  '               (marketing adjectives, "easy", "simple", "best"), do not hard-truncate.',
  '               Front-load the product name.',
  '- __desc       meta description. MUST be 40 to 350 characters. One or two sentences, no fluff.',
  '- __ogDesc     social share description. MUST be 40 to 350 characters.',
  '- __kw         comma-separated SEO keywords. REWRITE EVERY TERM into the target language.',
  '               ⚠️ Copying the English terms verbatim is a FAILURE, not a safe choice —',
  '               an English keyword on a Persian page ranks for nobody.',
  '               Keep the exact same number of comma-separated terms, in the same order,',
  '               with no spaces around the commas.',
  '- __intro      opening paragraph. Translate naturally; keep the emphasis markers.',
  '- __feat       feature list. Translate naturally; keep the emphasis markers.',
  '- __who        target-audience sentence. Translate naturally.',
  '- __copy_*     landing-page body copy. Translate naturally, keep the same ending punctuation.',
  '',
  'Output raw lines only: no code fences, no line numbers, no commentary, no blank filler lines.',
];
function buildPrompt(code, native, enName, lines) {
  return COMMON
    .concat(['', `Target language: ${enName} (${native}), code: ${code}.`, '', '---', lines.join('\n')])
    .join('\n');
}
function buildFillPrompt(enName, n, lines) {
  return [
    `The previous reply was missing ${n} line(s). Translate ONLY these ${n} line(s) into ${enName}.`,
    'Same format (KEY :: Translated text), same hard rules, same terminology as before.',
    'Do not repeat lines you already translated. Output exactly ' + n + ' raw lines, no code fences.',
    'Mind the per-key length limits: __title MUST be 10 to 78 characters, __desc and __ogDesc',
    '40 to 350. If your previous attempt ran long, cut filler words — do not hard-truncate.',
    '', '---', lines.join('\n'),
  ].join('\n');
}

/* ---------------- 解析与判定 ---------------- */
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
/* 占位符必须与英文源一一对应 */
function phOk(k, v) {
  const a = (String(SRC[k]).match(/\{\d\}/g) || []).sort().join(',');
  const b = (String(v).match(/\{\d\}/g) || []).sort().join(',');
  return a === b;
}
/* 强调标记必须成对保留。
   ⚠️ 踩过的坑：这里原来查 «strong»（转义后的写法），可 SRC 里存的是原始 <strong>，
      译文经 parseLines 的 unesc 也还原成 <strong> —— 两边都匹配不上，
      比较结果恒为「相等」，这条检查等于从来没生效过。现在两边都按原始 <tag> 比。 */
function tagOk(k, v) {
  const re = /<\/?(strong|b|em)>/g;
  const a = (String(SRC[k]).match(re) || []).sort().join(',');
  const b = (String(v).match(re) || []).sort().join(',');
  return a === b;
}
/* 长度：title 超 80 会被搜索引擎截断，desc 太短等于没写。
   实测：英文源 title 常在 60~70 字符，译成匈牙利语这类会膨胀 1.3 倍 → 轻松破 80。
   所以这里卡 78（留 2 字符余量），超了就地让模型压缩，而不是事后再补。 */
function lenOk(k, v) {
  const f = (META[k] && META[k].field) || '';
  const n = String(v).length;
  if (f === 'title') return n >= 10 && n <= 78;
  if (f === 'desc' || f === 'ogDesc') return n >= 40 && n <= 350;
  return true;
}
/* 关键词条数必须与英文源一致 */
function kwOk(k, v) {
  if (!/__kw$/.test(k)) return true;
  const a = String(SRC[k]).split(',').length;
  const b = String(v).split(',').length;
  return a === b;
}
/* 数字序列必须与英文源一致（100 / 15+ / 32 这些是事实，不能被本地化掉）。
   ⚠️ 踩过的坑：JS 的 \d 只认 ASCII 0-9。波斯语把 100 写成 ۱۰۰、5 写成 ۵，
      一比就「缺数字」，于是 fa 的 index__ogDesc / index__copy_seoIntro / merge__desc
      三轮补发全部判失败，整条流水线直接挂掉 —— 其实三条译文都对。
      所以先按各语种数字块归一化成 ASCII 再比。 */
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
  for (const ch of String(s)) {
    const d = DMAP[ch];
    out += d === undefined ? ch : d;
  }
  return out;
}
function numOk(k, v) {
  /* 不带 \+? ——「15+」的加号是「以上」的语气，波斯语写成 «بیش از ۱۵»、
      别的语言各有各的说法，把 + 也算进数字会让语义正确的译文被判死。 */
  const re = /\d+(?:\.\d+)?/g;
  const a = (asciiDigits(SRC[k]).match(re) || []).join(',');
  const b = (asciiDigits(v).match(re) || []).join(',');
  return a === b;
}

function checkChunk(keys, map) {
  const miss = keys.filter(k => !(k in map));
  const bad = {};
  for (const [name, fn] of Object.entries({ ph: phOk, tag: tagOk, kw: kwOk, num: numOk })) {
    bad[name] = keys.filter(k => (k in map) && String(map[k]).trim() && !fn(k, map[k]));
  }
  const anyBad = Object.values(bad).some(a => a.length);
  return { miss, bad, ok: !miss.length && !anyBad };
}

/* ---------------- 分块：按页，且不把一页的条目拆到两批 ---------------- */
function makeChunks() {
  const byPage = {};
  for (const k of KEYS) {
    const p = k.slice(0, k.indexOf('__'));
    (byPage[p] = byPage[p] || []).push(k);
  }
  const pages = Object.keys(byPage);
  const chunks = [];
  let cur = [], curLen = 0, curPages = 0;
  for (const p of pages) {
    const keys = byPage[p];
    const len = keys.reduce((s, k) => s + String(SRC[k]).length, 0);
    /* ⚠️ 按「页」计数，不是按条目数 —— 每页条目数不等（首页 10 条、翻译页 2 条），
          按条数切会把整批切碎，白白多出好几轮往返。 */
    if (curPages && (curPages >= PER || curLen + len > MAXCH)) {
      chunks.push(cur); cur = []; curLen = 0; curPages = 0;
    }
    cur = cur.concat(keys); curLen += len; curPages++;
  }
  if (cur.length) chunks.push(cur);
  return chunks.map(keys => ({
    keys,
    lines: keys.map(k => k + ' :: ' + esc(String(SRC[k]).replace(/\n/g, '\\n')))
  }));
}

/* ---------------- 主流程 ---------------- */
(async () => {
  const args = process.argv.slice(2);
  const probe = args.includes('--probe');
  /* --dry：只打印分批计划，不开浏览器。调 PER / MAXCH 时用，几秒就能看到批数变化。 */
  if (args.includes('--dry')) {
    const cs = makeChunks();
    console.log('共 ' + cs.length + ' 批，' + KEYS.length + ' 条（PER=' + PER + ' MAXCH=' + MAXCH + '）');
    cs.forEach((c, i) => {
      const ch = c.keys.reduce((s, k) => s + String(SRC[k]).length, 0);
      console.log('  批' + (i + 1) + '：' + c.keys.length + ' 条 / ' + ch + ' 字符  ' + c.keys[0] + ' … ' + c.keys[c.keys.length - 1]);
    });
    return;
  }
  let langs;
  if (args.includes('--all')) {
    langs = NEW.filter(x => !fs.existsSync(path.join(OUT, x[0] + '.json')));
  } else {
    langs = args.filter(a => !a.startsWith('--')).map(code => {
      const hit = NEW.find(x => x[0] === code);
      if (!hit) throw new Error('未知或已内置的语言码：' + code);
      return hit;
    });
  }
  if (!langs.length && !probe) { console.log('没有待翻译的语言'); return; }

  const env = Object.assign({}, process.env, { PATH: NODE_BIN + ':' + process.env.PATH, AGENT_BROWSER_PROXY: PROXY });
  const run = (a) => new Promise((res) => {
    let out = '';
    const p = spawn(AB, ['--session', SESS].concat(a), { env, stdio: ['ignore', 'pipe', 'pipe'] });
    p.stdout.on('data', d => out += d); p.stderr.on('data', d => out += d);
    p.on('close', () => res(out));
  });

  console.log('启动 agent-browser（session=' + SESS + '）…');
  await run(['--proxy', PROXY, 'open', 'https://www.google.com/generate_204']);
  const urlOut = await run(['get', 'cdp-url']);
  const wsUrl = (urlOut.match(/ws:\/\/[^\s"']+/) || [null])[0];
  if (!wsUrl) throw new Error('拿不到 cdp-url：' + urlOut);

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

  await newChatRetry(ws, sessionId, 3);
  const st = JSON.parse(await ev(ws, `(() => {
    const ed = document.querySelector('.ql-editor');
    return JSON.stringify({ editor: !!ed });
  })()`, sessionId));
  if (!st.editor) throw new Error('没有出现输入框 —— cookies 可能过期了。');
  console.log('登录态有效，开始翻译。');
  if (probe) { console.log('探针完成。'); process.exit(0); }

  const chunks = makeChunks();
  console.log('共 ' + chunks.length + ' 批 / 每种语言，' + KEYS.length + ' 条');
  const results = [];

  for (const [code, native] of langs) {
    const enName = EN_NAME[code] || code;
    const partPath = path.join(OUT, code + '.part.json');
    let parts = fs.existsSync(partPath) ? JSON.parse(fs.readFileSync(partPath, 'utf8')) : {};
    console.log('\n[' + code + '] ' + enName + ' / ' + native + '  已有 ' + Object.keys(parts).length + '/' + KEYS.length);

    await newChatRetry(ws, sessionId, 3);
    let firstPrompt = true;
    const maxC = parseInt(process.env.MAXC || '0', 10);
    const list = maxC ? chunks.slice(0, maxC) : chunks;

    for (let ci = 0; ci < list.length; ci++) {
      const c = chunks[ci];
      let todo = c.keys.filter(k => !(k in parts));
      if (!todo.length) continue;

      /* 三轮都过不了时，收下模型最后一次给的候选，别让整门语言卡在待办里烂掉。
         收下的这条仍然带着「不一致」的毛病，交给 _gemfix.js 定点重翻。 */
      const lastCand = {};
      for (let round = 1; round <= 3 && todo.length; round++) {
        const lines = todo.map(k => k + ' :: ' + esc(String(SRC[k]).replace(/\n/g, '\\n')));
        const prompt = firstPrompt ? buildPrompt(code, native, enName, lines) : buildFillPrompt(enName, todo.length, lines);
        firstPrompt = false;
        try {
          const text = await ask(ws, sessionId, prompt);
          if (process.env.GEM_DEBUG) fs.writeFileSync(path.join(OUT, 'dbg-' + code + '-b' + (ci + 1) + '.txt'), text);
          const map = parseLines(text);
          for (const k of todo) {
            if (k in map && String(map[k]).trim()) lastCand[k] = map[k];
            if (!(k in map) || !String(map[k]).trim()) { if (GEM_WHY) console.log('      · ' + k + '：模型没给这条'); continue; }
            const v = map[k];
            const bad = [
              phOk(k, v) ? null : '占位符',
              tagOk(k, v) ? null : '强调标记',
              kwOk(k, v) ? null : '关键词条数',
              numOk(k, v) ? null : '数字',
              lenOk(k, v) ? null : '长度 ' + String(v).length,
            ].filter(Boolean);
            if (bad.length) { if (GEM_WHY) console.log('      · ' + k + '：' + bad.join('+') + ' 不一致'); continue; }
            parts[k] = v;
          }
          fs.writeFileSync(partPath, JSON.stringify(parts, null, 1));
          todo = todo.filter(k => !(k in parts));
          if (todo.length) console.log('  ' + code + ' 批' + (ci + 1) + ' 第' + round + '轮：还缺 ' + todo.length + ' 条(' + todo.slice(0, 6).join(',') + ')，补发');
        } catch (e) {
          console.log('  ' + code + ' 批' + (ci + 1) + ' 第' + round + '轮异常：' + e.message.slice(0, 120));
          await sleep(3000);
        }
      }
      /* ⚠️ 教训：原来这里 throw，结果 fa 一条「波斯数字被误判」就让整批 68 种语言
         全部中断、前功尽弃。一条翻不出来不该拖垮整条流水线 —— 记下来，交给
         _gemfix.js 定点补，其余批继续跑。 */
      if (todo.length) {
        const giveUp = todo.slice();
        let took = 0;
        for (const k of giveUp) if (lastCand[k]) { parts[k] = lastCand[k]; took++; }
        fs.writeFileSync(partPath, JSON.stringify(parts, null, 1));
        console.log('  ⚠ ' + code + ' 批' + (ci + 1) + ' 放弃 ' + giveUp.length + ' 条' +
          (took ? '（收下 ' + took + ' 条待定点修复）' : '（模型压根没给）') + '：' + giveUp.slice(0, 6).join(','));
        todo.length = 0;
      }
      console.log('  ✓ ' + code + ' 批' + (ci + 1) + '（' + c.keys.length + ' 条）');
    }

    if (maxC) {
      results.push('· ' + code + ' 试跑前 ' + maxC + ' 批，' + Object.keys(parts).length + ' 条已存 ' + code + '.part.json');
      continue;
    }
    const miss = KEYS.filter(k => !(k in parts));
    /* 同理：缺条目就留着 .part.json 等下轮 / _gemfix 补，别把整条流水线掀了。 */
    if (miss.length) {
      results.push('⚠ ' + code + ' 还缺 ' + miss.length + ' 条，留在 ' + code + '.part.json：' + miss.slice(0, 8).join(','));
      continue;
    }
    const ordered = {};
    for (const k of KEYS) ordered[k] = parts[k];
    fs.writeFileSync(path.join(OUT, code + '.json'), JSON.stringify(ordered, null, 1));
    fs.unlinkSync(partPath);
    results.push('✓ ' + code + ' 已写入 _seo/' + code + '.json（' + KEYS.length + ' 条）');
  }

  console.log('\n========== 汇总 ==========');
  results.forEach(r => console.log(r));
  process.exit(0);
})().catch(e => { console.error('FATAL:', e.message); process.exit(1); });
