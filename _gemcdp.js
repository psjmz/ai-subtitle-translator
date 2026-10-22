/* _gemcdp.js —— Gemini（网页版）自动化的一次封装，供顶栏修复类脚本复用
 *
 * 为什么要抽出来：_gemnav.js / _gemshort.js / _gemclean.js 都要同一套 CDP 操作，
 * 三份复制=三份要改。这里只放「怎么连浏览器、怎么发一句话、怎么收回答」，
 * 业务逻辑（提示词、改写规则）留在各自脚本里。
 *
 * ⚠️ 三大坑（都是实测出来的，别简化掉）：
 *   1 /app/<随机串> 才是新对话；直接访问 /app 会恢复上次对话，术语会串味。
 *   2 长文本必须用 Input.insertText 塞，execCommand 在 Quill 上会丢内容。
 *   3 收答案要轮询「长度连续 STABLE 轮不变」，只取最后一个 model-response。
 *
 * 用法：
 *   const { ask, newChatRetry, openSession } = require('./_gemcdp.js');
 *   const s = await openSession('sessName');     // 起 Chrome + 注入 cookies + 开新对话
 *   const txt = await s.ask(prompt);
 *   s.close();
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const WebSocket = require('/Users/jp/.workbuddy/binaries/node/workspace/node_modules/ws');
const { Agent } = require('https');
const http = require('http');

const AB = '/Users/jp/.workbuddy/binaries/node/workspace/node_modules/.bin/agent-browser';
const NODE_BIN = '/Users/jp/.workbuddy/binaries/node/versions/22.22.2-6/bin';
const PROXY = process.env.GEM_PROXY || 'http://127.0.0.1:7897';
const COOKIES = '/Users/jp/WorkBuddy/2026-09-03-09-11-13/cookies_work/cookies_clean.json';

const sleep = ms => new Promise(r => setTimeout(r, ms));

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
function getPage(ws) {
  return send(ws, 'Target.getTargets', {}).then(t => {
    const p = t.targetInfos.filter(x => x.type === 'page');
    return p.find(x => x.url.includes('gemini.google.com')) || p[0];
  });
}
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
/* 带重试：newChat 是最容易超时的动作（多开 Chrome 抢资源时尤甚）；
   不重试的话一次超时就把整批语言全带走了 —— 这是之前误判「并发不行」的真因。 */
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
    len = await ev(ws, `(() => { const ed = document.querySelector('.ql-editor'); return ed ? (ed.innerText||'').length : -1; })()`, sessionId);
  }
  return len;
}
async function ask(ws, sessionId, prompt, maxPoll = 40, gap = 1200) {
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

/* 起一个带登录态的 Chrome 会话 */
async function openSession(sessName) {
  const env = Object.assign({}, process.env, { PATH: NODE_BIN + ':' + process.env.PATH, AGENT_BROWSER_PROXY: PROXY });
  const run = (a) => new Promise((res) => {
    let out = '';
    const p = spawn(AB, sessName ? ['--session', sessName].concat(a) : a, { env, stdio: ['ignore', 'pipe', 'pipe'] });
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
  let n = 0;
  for (const c of cookies) {
    const p = { name: c.name, value: c.value, domain: c.domain, path: c.path || '/', secure: !!c.secure, httpOnly: !!c.httpOnly };
    if (c.sameSite && ['Strict', 'Lax', 'None'].includes(c.sameSite)) p.sameSite = c.sameSite;
    if (c.expires && c.expires > 0) p.expires = c.expires;
    try { await send(ws, 'Network.setCookie', p, sessionId); n++; } catch (e) { /* 单条失败不致命 */ }
  }
  console.log('注入 cookies ' + n + '/' + cookies.length);
  await newChatRetry(ws, sessionId, 3);
  console.log('登录态就绪\n');

  return {
    ws, sessionId,
    ask: (prompt, maxPoll, gap) => ask(ws, sessionId, prompt, maxPoll, gap),
    newChat: () => newChatRetry(ws, sessionId, 3),
    close: () => { try { ws.close(); } catch (e) {} }
  };
}

module.exports = { openSession, ask, newChatRetry, putPrompt, parseLines, connect, send, ev, waitEditor, getPage, sleep };
