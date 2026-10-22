/* _gem339.js —— 用已登录的 Gemini（网页版）小批量翻译 337 条界面文案
 *
 * 为什么用它：337 条 × 41 种语言，纯手写量太大且小语种质量不稳。
 * 本机 Chrome 里已有 Google 登录态，把 cookies 解密后注入 agent-browser 即可免登录调用。
 *
 * ⚠️ 分块的原因（实测）：一次性让 Gemini 吐 337 行 → 输出过长，生成不完，
 *    轮询 75 轮后 Runtime.evaluate 超时。每批 40 条是实测稳定的量。
 *
 * ⚠️ 同一对话连续发批：第一批给完整规则，后续只说「继续第 N 批」。
 *    好处是术语前后天然一致（比如「字幕条」全篇统一），这是质量里最值钱的一项。
 *
 * 用法：
 *   node _gem339.js lt sl              # 翻译指定语言
 *   node _gem339.js --all              # 翻译所有还没分片的语言
 *   node _gem339.js --probe            # 只验证登录态，不翻译
 *   CHUNK=30 node _gem339.js lt        # 调小每批条数（默认 40）
 *
 * 输入：_core338.json（337 键的英文源）
 * 断点：_tr/<lang>.part.json（每批完成即落盘，中断后重跑自动续）
 * 输出：_tr/<lang>.json（键 → 该语言译文）
 * 之后跑 node _mk339.js <lang> "<母语名>" "<English>" 生成 i18n/ui-<lang>.js
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const DIR = __dirname;
const CORE = JSON.parse(fs.readFileSync(path.join(DIR, '_core338.json'), 'utf8'));
const KEYS = Object.keys(CORE);
const CHUNK = parseInt(process.env.CHUNK || '55', 10);
/* 会话名：并行时每个进程用不同的 --session，各自一套 Chrome + profile，互不干扰。
   ⚠️ 不指定的话两个进程会抢同一个浏览器实例，后开的直接连不上。 */
const SESS = process.env.GEM_SESSION || '';
/* 轮询参数：gap 是间隔，STABLE 是「长度连续不变几轮」判定生成结束。
   原值 3500/3 太保守——每批白等约 14 秒；1200/2 已足够稳，检测延迟降到约 2.4 秒。 */
const GAP = parseInt(process.env.GEM_GAP || '1200', 10);
const STABLE = parseInt(process.env.GEM_STABLE || '2', 10);

const AB = '/Users/jp/.workbuddy/binaries/node/workspace/node_modules/.bin/agent-browser';
const NODE_BIN = '/Users/jp/.workbuddy/binaries/node/versions/22.22.2-6/bin';
const PROXY = process.env.GEM_PROXY || 'http://127.0.0.1:7897';
const COOKIES = '/Users/jp/WorkBuddy/2026-09-03-09-11-13/cookies_work/cookies_clean.json';

/* 语言码 → 母语自称，取自 site-i18n.js 的 UI_LANGS（条目形如 [code, native]） */
const vm = require('vm');
const ctx = { window: {} }; ctx.globalThis = ctx; vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(DIR, 'site-i18n.js'), 'utf8') + ';globalThis.__U = UI_LANGS; globalThis.__27 = UI27;', ctx);
const UI_LANGS = ctx.__U, UI27 = ctx.__27;
const NEW = UI_LANGS.filter(x => UI27.indexOf(x[0]) < 0);

/* 英文名取自 translate.html 的 LANGS（{ v, zh, en, file, prompt }） */
const tl = fs.readFileSync(path.join(DIR, 'translate.html'), 'utf8');
const lb = tl.indexOf('const LANGS = [');
const tlSeg = tl.slice(lb, tl.indexOf('];', lb));
const EN_NAME = {};
{
  const re = /\{\s*v\s*:\s*'([^']+)'[\s\S]*?en\s*:\s*'([^']*)'/g;
  let m; while ((m = re.exec(tlSeg))) EN_NAME[m[1]] = m[2];
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

/* ⚠️ 为什么要转义：把 <b> 原样喂给 Gemini，它会当成 HTML 直接吞掉（实测丢了 2 条标签）。
      换成 «b» 这种「不像标签」的标记后，模型会老老实实当普通字符保留。
      发送前 esc()，译回来后 unesc()。 */
const TAGS = [['<b>', '«b»'], ['</b>', '«/b»'], ['<em>', '«em»'], ['</em>', '«/em»']];
function esc(s) { let t = String(s); for (const [a, b] of TAGS) t = t.split(a).join(b); return t; }
function unesc(s) { let t = String(s); for (const [a, b] of TAGS) t = t.split(b).join(a); return t; }

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
/* 带重试的 newChat。
   ⚠️ 为什么要包一层：newChat 的调用点都在 try 块外面，一旦多开 Chrome 抢资源、
      导航后输入框迟迟不出现，这个 throw 会一路冒到顶层 → 进程退出码 1
      → 这一路剩下的几十种语言全军覆没。重试几次通常就能恢复。 */
async function newChatRetry(ws, sessionId, tries) {
  let last;
  for (let i = 1; i <= (tries || 3); i++) {
    try { return await newChat(ws, sessionId); }
    catch (e) { last = e; console.log('  [newChat 第' + i + '次失败] ' + e.message.slice(0, 80) + '，3 秒后重试'); await sleep(3000); }
  }
  throw last;
}

/* ---------------- 提示词 ----------------
   第一批给完整规则；后续批次只续，靠对话上下文保持一致。 */
function buildPrompt(code, native, enName, lines) {
  return [
    'You are localizing the user interface of a web app called AI-SRTSub.',
    'It is a free, privacy-first AI subtitle translator: you upload a subtitle file,',
    'pick a target language and a style, and it translates while keeping the timeline aligned,',
    'wrapping lines at natural points, removing filler cues and keeping names consistent.',
    '',
    `Translate the interface text into ${enName} (${native}), language code: ${code}.`,
    'Input: lines formatted as  KEY :: English text',
    'Output: exactly the same number of lines, in the same order, formatted as  KEY :: Translated text',
    '',
    'Hard rules:',
    '- Keep placeholders exactly as-is: {0} {1} {2} {3}',
    '- Keep these markup markers exactly as-is and in matching pairs:',
    '    «b» ... «/b»   marks bold text',
    '    «em» ... «/em» marks emphasized text',
    '  These are NOT HTML. Copy them character for character. Never drop them, never add extra ones.',
    '- Keep leading symbols, numbering and emoji unchanged: ① ② ③ ④ ⑤ ⑥ ▶ ✦ ✅ 🎬 📂 ⚡ ↻ · → ↗ …',
    '- Never translate these tokens: AI-SRTSub, RiseKol, OpenAI, GitHub, YouTube, Bilibili, Douyin,',
    '  Netflix, macOS, Windows, SRT, VTT, ASS, SBV, TXT, WebVTT, API, URL, /chat/completions, zh/ko, ja',
    '- In this product, "Cue" means one subtitle entry, and "Batch" means translating several files at once',
    '- Keep the sentence-ending period only when the English has one; UI labels stay short and natural',
    '- If the English is a single word or short label, give the natural short equivalent, not a dictionary gloss',
    '- Use register-neutral phrasing: no honorific overload, no overly formal bureaucratic wording',
    '- Output raw lines only: no code fences, no line numbers, no commentary, no blank filler lines',
    '',
    '---',
    lines.join('\n'),
  ].join('\n');
}

function buildContinuePrompt(from, to, lines) {
  return [
    `Continue. Translate lines ${from} to ${to}.`,
    'Same output format (KEY :: Translated text), same rules, same terminology as above.',
    'Output raw lines only.',
    '',
    '---',
    lines.join('\n'),
  ].join('\n');
}

/* 补齐请求：只把上一轮漏掉的那几条再发一遍 */
function buildFillPrompt(enName, n, lines) {
  return [
    `The previous reply was missing ${n} line(s). Translate ONLY these ${n} line(s) into ${enName}.`,
    'Same format (KEY :: Translated text), same hard rules, same terminology as before.',
    'Do not repeat lines you already translated. Output exactly ' + n + ' raw lines, no code fences.',
    '',
    '---',
    lines.join('\n'),
  ].join('\n');
}

/* 单键合格判定：占位符 / 标签都要与英文源一致 */
function phOk(k, v) {
  const a = (String(CORE[k].en).match(/\{\d\}/g) || []).sort().join(',');
  const b = (String(v).match(/\{\d\}/g) || []).sort().join(',');
  return a === b;
}
function tagOk(k, v) {
  const a = (String(CORE[k].en).match(/<\/?(b|em)>/g) || []).sort().join(',');
  const b = (String(v).match(/<\/?(b|em)>/g) || []).sort().join(',');
  return a === b;
}

/* ---------------- 解析 ---------------- */
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

/* 校验一批译文：键齐 + 占位符一致 + HTML 标签一致 */
function checkChunk(keys, map) {
  const miss = keys.filter(k => !(k in map));
  const phBad = keys.filter(k => {
    if (!(k in map)) return false;
    const a = (String(CORE[k].en).match(/\{\d\}/g) || []).sort().join(',');
    const b = (String(map[k]).match(/\{\d\}/g) || []).sort().join(',');
    return a !== b;
  });
  const tagBad = keys.filter(k => {
    if (!(k in map)) return false;
    const a = (String(CORE[k].en).match(/<\/?(b|em)>/g) || []).sort().join(',');
    const b = (String(map[k]).match(/<\/?(b|em)>/g) || []).sort().join(',');
    return a !== b;
  });
  return { miss, phBad, tagBad, ok: !miss.length && !phBad.length && !tagBad.length };
}

/* ---------------- 主流程 ---------------- */
(async () => {
  const args = process.argv.slice(2);
  const probe = args.includes('--probe');
  let langs;
  if (args.includes('--all')) {
    langs = NEW.filter(x => !fs.existsSync(path.join(DIR, 'i18n', 'ui-' + x[0] + '.js')));
  } else {
    langs = args.filter(a => !a.startsWith('--')).map(code => {
      const hit = NEW.find(x => x[0] === code);
      if (!hit) throw new Error('未知或已内置的语言码：' + code);
      return hit;
    });
  }
  if (!langs.length && !probe) { console.log('没有待翻译的语言'); return; }

  const env = Object.assign({}, process.env, { PATH: NODE_BIN + ':' + process.env.PATH, AGENT_BROWSER_PROXY: PROXY });
  /* 并行时靠 --session 隔离：同名 session 会复用同一个浏览器实例 */
  const run = (a) => new Promise((res) => {
    let out = '';
    const p = spawn(AB, SESS ? ['--session', SESS].concat(a) : a, { env, stdio: ['ignore', 'pipe', 'pipe'] });
    p.stdout.on('data', d => out += d); p.stderr.on('data', d => out += d);
    p.on('close', () => res(out));
  });

  console.log('启动 agent-browser …');
  await run(['--proxy', PROXY, 'open', 'https://www.google.com/generate_204']);
  const urlOut = await run(['get', 'cdp-url']);
  const wsUrl = (urlOut.match(/ws:\/\/[^\s"']+/) || [null])[0];
  if (!wsUrl) throw new Error('拿不到 cdp-url：' + urlOut);
  console.log('CDP:', wsUrl);

  const ws = await connect(wsUrl);
  const page = await getPage(ws);
  const { sessionId } = await send(ws, 'Target.attachToTarget', { targetId: page.targetId, flatten: true });
  console.log('sessionId: ' + (sessionId ? 'ok' : '(browser 级)'));

  await send(ws, 'Network.enable', {}, sessionId);
  await send(ws, 'Page.enable', {}, sessionId);
  await send(ws, 'Runtime.enable', {}, sessionId);

  console.log('注入 Google 登录 cookies …');
  const cookies = JSON.parse(fs.readFileSync(COOKIES, 'utf8'));
  let n = 0;
  for (const c of cookies) {
    const p = { name: c.name, value: c.value, domain: c.domain, path: c.path || '/', secure: !!c.secure, httpOnly: !!c.httpOnly };
    if (c.sameSite && ['Strict', 'Lax', 'None'].includes(c.sameSite)) p.sameSite = c.sameSite;
    if (c.expires && c.expires > 0) p.expires = c.expires;
    try { await send(ws, 'Network.setCookie', p, sessionId); n++; } catch (e) { /* 单条失败不致命 */ }
  }
  console.log('注入 ' + n + '/' + cookies.length + ' 条');

  console.log('打开 Gemini（新对话）…');
  await newChatRetry(ws, sessionId, 3);

  const probeExpr = `(() => {
    const ed = document.querySelector('.ql-editor');
    const loggedIn = !!ed && !/Sign in/i.test(document.body.innerText.slice(0, 2000));
    return JSON.stringify({ url: location.href, editor: !!ed, loggedIn });
  })()`;
  const st = JSON.parse(await ev(ws, probeExpr, sessionId));
  console.log('状态:', JSON.stringify(st));
  if (!st.editor) throw new Error('没有出现输入框 —— 登录态可能已失效（cookies 过期）。请确认。');
  if (probe) { console.log('探针完成，登录态有效。'); process.exit(0); }

  /* 源行：换行统一转成字面 \n，保证一行一条 */
  const srcLines = KEYS.map(k => k + ' :: ' + esc(String(CORE[k].en).replace(/\n/g, '\\n')));
  const chunks = [];
  for (let i = 0; i < KEYS.length; i += CHUNK) chunks.push({ from: i + 1, to: Math.min(i + CHUNK, KEYS.length), keys: KEYS.slice(i, i + CHUNK), lines: srcLines.slice(i, i + CHUNK) });

  const results = [];
  for (const [code, native] of langs) {
    const enName = EN_NAME[code] || code;
    const partPath = path.join(DIR, '_tr', code + '.part.json');
    let parts = fs.existsSync(partPath) ? JSON.parse(fs.readFileSync(partPath, 'utf8')) : {};
    console.log('\n[' + code + '] ' + enName + ' / ' + native + '  已有 ' + Object.keys(parts).length + '/' + KEYS.length + ' 条');

    /* 每种语言都开一个干净的新对话：避免上一种语言的术语串味。
       ⚠️ 续跑也要开新的 —— 旧进程没了，页面上的对话跟当前语言对不上，
          这时发 "Continue" 会让 Gemini 不知所云。 */
    await newChatRetry(ws, sessionId, 3);
    let firstPrompt = true;

    /* 每批：最多 3 次尝试；成功后立即落盘（断点可续）
       MAXC=n 只跑前 n 批，调链路时用，避免一跑就是几分钟。 */
    const maxC = parseInt(process.env.MAXC || '0', 10);
    /* 三轮都过不了时收下模型最后一次给的候选（见下方「放弃」分支），
       保证一种语言卡住不会拖垮整条流水线。 */
    const lastCand = {};
    const list = maxC ? chunks.slice(0, maxC) : chunks;
    for (let ci = 0; ci < list.length; ci++) {
      const c = chunks[ci];
      let todo = c.keys.filter(k => !(k in parts));
      if (!todo.length) continue;

      /* 最多 3 轮：第一轮发整批，之后只补「还缺的那几条」。
         ⚠️ 别整批重发 —— 40 条要等约 40 秒生成，只补 2 条几秒就回来了。
         ⚠️ 逐键判定：合格的先收下，不合格的下一轮再补，别一条坏掉拖整批。 */
      for (let round = 1; round <= 3 && todo.length; round++) {
        const lines = todo.map(k => k + ' :: ' + esc(String(CORE[k].en).replace(/\n/g, '\\n')));
        /* 本语言的第 1 条消息带完整规则；之后是续批或补缺 */
        const prompt = firstPrompt ? buildPrompt(code, native, enName, lines) : buildFillPrompt(enName, todo.length, lines);
        firstPrompt = false;
        try {
          const text = await ask(ws, sessionId, prompt, 60, GAP);
          /* GEM_DEBUG=1 时把原始回复落盘，方便看 Gemini 到底吐了什么格式 */
          if (process.env.GEM_DEBUG) {
            fs.writeFileSync(path.join(DIR, '_tr', 'dbg-' + code + '-' + c.from + '.txt'), text);
          }
          const map = parseLines(text);
          for (const k of todo) {
            if (k in map && String(map[k]).trim()) lastCand[k] = map[k];
            if (k in map && String(map[k]).trim() && phOk(k, map[k]) && tagOk(k, map[k])) parts[k] = map[k];
          }
          fs.writeFileSync(partPath, JSON.stringify(parts, null, 1));
          todo = todo.filter(k => !(k in parts));
          if (todo.length) {
            console.log('  ' + code + ' 第 ' + c.from + '–' + c.to + ' 条 第 ' + round + ' 轮：还缺 ' + todo.length + ' 条(' + todo.slice(0, 6).join(',') + ')，补发');
          }
        } catch (e) {
          console.log('  ' + code + ' 第 ' + c.from + '–' + c.to + ' 条 第 ' + round + ' 轮异常：' + e.message.slice(0, 120));
          await sleep(3000);
        }
      }
      /* ⚠️ 教训：这里原来是 throw —— 一条翻不出来就把整条流水线连根拔起。
         界面语言那批剩 7 种没做完，真因就是这个，不是所谓的「Chrome 并发」。
         现在改成收下候选 + 记警告，交给 _gemfix.js 定点补。 */
      if (todo.length) {
        const giveUp = todo.slice();
        let took = 0;
        for (const k of giveUp) if (lastCand[k]) { parts[k] = lastCand[k]; took++; }
        fs.writeFileSync(partPath, JSON.stringify(parts, null, 1));
        console.log('  ⚠ ' + code + ' 第 ' + c.from + '–' + c.to + ' 条 放弃 ' + giveUp.length + ' 条' +
          (took ? '（收下 ' + took + ' 条待定点修复）' : '（模型压根没给）') + '：' + giveUp.slice(0, 6).join(','));
        todo.length = 0;
      }
      console.log('  ✓ ' + code + ' ' + c.from + '–' + c.to);
    }

    if (maxC) {                       /* 只跑前几批：落盘 part 就收工 */
      results.push('· ' + code + ' 试跑前 ' + maxC + ' 批，' + Object.keys(parts).length + ' 条已存 ' + code + '.part.json');
      continue;
    }

    /* 全部齐了：写正式文件，删断点文件。
       不齐就留着 .part.json 等下轮 / _gemfix 补 —— 同样不 throw，理由见上。 */
    const miss = KEYS.filter(k => !(k in parts));
    if (miss.length) {
      results.push('⚠ ' + code + ' 还缺 ' + miss.length + ' 条，留在 ' + code + '.part.json：' + miss.slice(0, 8).join(','));
      continue;
    }
    const ordered = {};
    for (const k of KEYS) ordered[k] = parts[k];
    fs.writeFileSync(path.join(DIR, '_tr', code + '.json'), JSON.stringify(ordered, null, 1));
    fs.unlinkSync(partPath);
    results.push('✓ ' + code + ' 已写入 _tr/' + code + '.json（' + KEYS.length + ' 条）');
  }

  console.log('\n========== 汇总 ==========');
  results.forEach(r => console.log(r));
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
