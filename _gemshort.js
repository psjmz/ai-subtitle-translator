/* _gemshort.js —— 把过长的顶栏菜单项改短
 *
 * 为什么要有这一步：site-topnav.js 的「更多工具」下拉是四列定宽布局，
 * 27 个内置语言的菜单名实测最长 28 字符（fr.tnG3），英文源最长只有 17。
 * 机器翻出来的小语种有 22 条顶到 29–32 字符 —— 这种长度会撑破列宽。
 *
 * 做法：把「过长的那几条」连同英文原意一起发给 Gemini，要求压到 ≤ CAP 字符。
 * 修完直接回写 _trnav/<lang>.json（ǀ 不同于 _gemnav.js 的整包重翻），
 * 之后重跑 _mk_tnav.js 重新出分片。
 *
 * 用法：
 *   node _gemshort.js            # 处理所有超长的语种
 *   node _gemshort.js ny sn      # 指定语种
 *   CAP=22 node _gemshort.js     # 调目标长度（默认 22）
 *
 * ⚠️ 幂等：已经够短的条目不动；改完立刻落盘，中断重跑只处理仍超长的。
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const vm = require('vm');

const DIR = __dirname;
const NAV = JSON.parse(fs.readFileSync(path.join(DIR, '_navsrc.json'), 'utf8'));
const EN = NAV.en;
const MENU_KEYS = NAV.keys.filter(k => /^(nav|tn)/.test(k));
const CAP = parseInt(process.env.CAP || '22', 10);

const AB = '/Users/jp/.workbuddy/binaries/node/workspace/node_modules/.bin/agent-browser';
const NODE_BIN = '/Users/jp/.workbuddy/binaries/node/versions/22.22.2-6/bin';
const PROXY = process.env.GEM_PROXY || 'http://127.0.0.1:7897';
const COOKIES = '/Users/jp/WorkBuddy/2026-09-03-09-11-13/cookies_work/cookies_clean.json';
const SESS = process.env.GEM_SESSION || 'navshort';
const GAP = 900;

const ctxEM = { window: {} }; ctxEM.globalThis = ctxEM; vm.createContext(ctxEM);
vm.runInContext(fs.readFileSync(path.join(DIR, 'site-i18n.js'), 'utf8') + ';globalThis.__U = UI_LANGS;', ctxEM);
const UI_LANGS = ctxEM.__U;
const NATIVE = {}; for (const [c, n] of UI_LANGS) NATIVE[c] = n;
const EN_NAME = {};
{
  const tl = fs.readFileSync(path.join(DIR, 'translate.html'), 'utf8');
  const lb = tl.indexOf('const LANGS = [');
  const seg = tl.slice(lb, tl.indexOf('];', lb));
  const re = /\{\s*v\s*:\s*'([^']+)'[\s\S]*?en\s*:\s*'([^']*)'/g;
  let m; while ((m = re.exec(seg))) EN_NAME[m[1]] = m[2];
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

/* ---------------- CDP（与 _gemnav.js 同一套，除输出目录外零改动） ---------------- */
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
    setTimeout(() => { if (pending.has(id)) { pending.delete(id); reject(new Error('timeout: ' + method)); } }, timeoutMs);
  });
}
async function ev(ws, expression, sessionId) {
  const r = await send(ws, 'Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true }, sessionId);
  if (r.exceptionDetails) throw new Error(expression.slice(0, 60) + ' :: ' + (r.exceptionDetails.exception?.description || 'eval error'));
  return r.result.value;
}
function getPage(ws) { return send(ws, 'Target.getTargets', {}).then(t => { const p = t.targetInfos.filter(x => x.type === 'page'); return p.find(x => x.url.includes('gemini.google.com')) || p[0]; }); }
async function waitEditor(ws, sessionId, timeoutMs = 20000) {
  for (let i = 0; i < Math.ceil(timeoutMs / 1500); i++) {
    if (await ev(ws, `!!document.querySelector('.ql-editor[contenteditable="true"]')`, sessionId)) return true;
    await sleep(1500);
  }
  return false;
}
async function newChat(ws, sessionId) {
  const id = Math.random().toString(36).slice(2, 12);
  await send(ws, 'Page.navigate', { url: 'https://gemini.google.com/app/' + id }, sessionId);
  await sleep(3000);
  if (!await waitEditor(ws, sessionId)) throw new Error('新对话里输入框没出现');
  return await ev(ws, `document.querySelectorAll('model-response').length`, sessionId);
}
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
  let len = await ev(ws, `(() => { const ed = document.querySelector('.ql-editor'); return ed ? (ed.innerText||'').length : -1; })()`, sessionId);
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
    len = await ev(ws, `(() => { const ed = document.querySelector('.ql-editor'); return ed ? (ed.innerText||'').length : -1; })()`, sessionId);
  }
  return len;
}
async function ask(ws, sessionId, prompt, maxPoll = 40, gap = GAP) {
  if (!await waitEditor(ws, sessionId)) throw new Error('输入框一直没出现');
  const base = await ev(ws, `document.querySelectorAll('model-response').length`, sessionId);
  const len = await putPrompt(ws, sessionId, prompt);
  if (len < prompt.length * 0.9) throw new Error('提示词没塞进输入框（' + len + '/' + prompt.length + '）');
  await sleep(600);
  await send(ws, 'Input.dispatchKeyEvent', { type: 'keyDown', key: 'Enter', code: 'Enter', windowsVirtualKeyCode: 13 }, sessionId);
  await send(ws, 'Input.dispatchKeyEvent', { type: 'keyUp', key: 'Enter', code: 'Enter', windowsVirtualKeyCode: 13 }, sessionId);
  let prev = -1, same = 0, text = '';
  for (let i = 0; i < maxPoll; i++) {
    await sleep(gap);
    const n = await ev(ws, `document.querySelectorAll('model-response').length`, sessionId);
    if (n <= base) { prev = -1; same = 0; continue; }
    text = await ev(ws, `(() => { const rs=document.querySelectorAll('model-response'); const last=rs[rs.length-1]; return (last.innerText||'').trim(); })()`, sessionId);
    if (text && text.length === prev) same++; else same = 0;
    prev = text.length;
    if (text && same >= 2) break;
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
    map[key] = line.slice(i + 4).replace(/^`+|`+$/g, '').trim();
  }
  return map;
}

/* ---------------- 提示词 ---------------- */
function shortenPrompt(enName, native, code, lines) {
  return [
    'These are labels in the top navigation bar of AI-SRTSub, a subtitle translator website.',
    `They were already translated into ${enName} (${native}), but some are TOO LONG for the menu slot`,
    `and would break the dropdown layout. Shorten them into ${enName}.`,
    '',
    `Hard rule: every result must be at most ${CAP} characters. Shorter is better.`,
    'Keep the meaning identical — this is shortening, not re-translating.',
    'Drop filler words, use a single well-known word instead of a phrase, or use the common short term',
    'native speakers actually use in menus. Never add explanations.',
    'Do NOT switch to another language. Do NOT use English loanwords if a native term exists.',
    '',
    'Input: lines formatted as  KEY :: current label (too long) :: original English meaning',
    'Output: exactly the same number of lines, same order, formatted as  KEY :: shortened label',
    '',
    lines.join('\n')
  ].join('\n');
}

/* ---------------- 主流程 ---------------- */
(async () => {
  const args = process.argv.slice(2).filter(a => !a.startsWith('--'));

  /* 找出每条语言的超长条目 */
  const work = [];
  for (const f of fs.readdirSync(path.join(DIR, '_trnav'))) {
    if (!/^[a-z]{2,3}(-[A-Za-z]{2,4})?\.json$/.test(f)) continue;
    const lang = f.replace(/\.json$/, '');
    if (args.length && args.indexOf(lang) < 0) continue;
    const tr = JSON.parse(fs.readFileSync(path.join(DIR, '_trnav', f), 'utf8'));
    const bad = MENU_KEYS.filter(k => String(tr[k] || '').length > CAP);
    if (bad.length) work.push({ lang, tr, bad });
  }
  if (!work.length) { console.log('没有超 ' + CAP + ' 字符的菜单项，收工。'); return; }
  console.log('待压缩：' + work.length + ' 种语言，共 ' + work.reduce((a, b) => a + b.bad.length, 0) + ' 条（目标 ≤ ' + CAP + ' 字符）');

  const env = Object.assign({}, process.env, { PATH: NODE_BIN + ':' + process.env.PATH, AGENT_BROWSER_PROXY: PROXY });
  const run = (a) => new Promise((res) => {
    let out = '';
    const p = spawn(AB, SESS ? ['--session', SESS].concat(a) : a, { env, stdio: ['ignore', 'pipe', 'pipe'] });
    p.stdout.on('data', d => out += d); p.stderr.on('data', d => out += d);
    p.on('close', () => res(out));
  });

  console.log('启动 agent-browser …');
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
  for (const c of cookies) {
    const p = { name: c.name, value: c.value, domain: c.domain, path: c.path || '/', secure: !!c.secure, httpOnly: !!c.httpOnly };
    if (c.sameSite && ['Strict', 'Lax', 'None'].includes(c.sameSite)) p.sameSite = c.sameSite;
    if (c.expires && c.expires > 0) p.expires = c.expires;
    try { await send(ws, 'Network.setCookie', p, sessionId); } catch (e) { /* 单条失败不致命 */ }
  }
  await newChatRetry(ws, sessionId, 3);
  console.log('登录态就绪\n');

  const results = [];
  let chatAge = 0;
  for (const job of work) {
    const { lang, tr, bad } = job;
    const enName = EN_NAME[lang] || lang, native = NATIVE[lang] || lang;
    console.log('[' + lang + '] ' + enName + ' / ' + native + '  ' + bad.length + ' 条超长');

    if (chatAge === 0) await newChatRetry(ws, sessionId, 3);
    chatAge = (chatAge + 1) % 8;

    let todo = bad.slice();
    const linesFor = (ks) => ks.map(k => k + ' :: ' + String(tr[k]) + ' :: ' + String(EN[k]));

    let got = {};
    for (let round = 1; round <= 2 && todo.length; round++) {
      try {
        const text = await ask(ws, sessionId, shortenPrompt(enName, native, lang, linesFor(todo)), 40, GAP);
        if (process.env.GEM_DEBUG) {
          fs.writeFileSync(path.join(DIR, '_trnav', 'dbgs-' + lang + '-r' + round + '.txt'), text);
        }
        const map = parseLines(text);
        for (const k of todo) {
          const v = map[k];
          if (v && v.trim()) got[k] = v.trim();
        }
        todo = todo.filter(k => !(got[k] && got[k].length <= CAP));
        if (todo.length) console.log('  第 ' + round + ' 轮后仍有 ' + todo.length + ' 条超长：' + todo.join(','));
      } catch (e) {
        console.log('  ' + lang + ' 第 ' + round + ' 轮异常：' + e.message.slice(0, 100));
        await sleep(3000);
      }
    }

    let changed = 0;
    for (const k of Object.keys(got)) {
      if (got[k].length <= CAP && got[k] !== tr[k]) {
        console.log('  ' + k + ': ' + tr[k] + '  →  ' + got[k] + '  (' + got[k].length + ')');
        tr[k] = got[k]; changed++;
      }
    }
    if (changed) {
      fs.writeFileSync(path.join(DIR, '_trnav', lang + '.json'), JSON.stringify(tr, null, 1));
    }
    const left = bad.filter(k => String(tr[k]).length > CAP);
    results.push((left.length ? '⚠ ' : '✓ ') + lang + ' 改 ' + changed + ' 条' + (left.length ? '，仍超长 ' + left.length + ' 条：' + left.join(',') : ''));
  }

  console.log('\n========== 汇总 ==========');
  results.forEach(r => console.log(r));
  process.exit(0);
})().catch(e => { console.error('FATAL:', e.message); process.exit(1); });
