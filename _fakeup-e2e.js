/* 假 OpenAI 上游：记录请求体，回合法翻译响应（E2E 用，不烧钱） */
'use strict';
const http = require('http');
const fs = require('fs');
const LOG = '/tmp/_fakeup_req.jsonl';
let n = 0;
fs.writeFileSync(LOG, '');
http.createServer((req, res) => {
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400'
    });
    return res.end();
  }
  let body = '';
  req.on('data', c => body += c);
  req.on('end', () => {
    let out = { code: 200, body: '' };
    try {
      const j = JSON.parse(body);
      const user = (j.messages || []).map(m => m.role + ':' + m.content).join('\n---\n');
      fs.appendFileSync(LOG, JSON.stringify({ i: ++n, url: req.url, model: j.model, user }) + '\n');
      let content;
      const userMsg = (j.messages || []).filter(m => m.role === 'user').map(m => m.content).join('\n');
      if (/句组（第|Groups \(batch/.test(userMsg)) {
        /* 系统提示词里带 few-shot 示例（也含 {"groups":…}），真正的批数据在 user 消息里
           的**最后一个** {"groups":…} —— 用 lastIndexOf 定位 + 括号配平提取 */
        const gi = userMsg.lastIndexOf('{"groups":');
        let groups = [];
        if (gi >= 0) {
          let depth = 0, inStr = false, esc = false, end = -1;
          for (let i = gi; i < userMsg.length; i++) {
            const c = userMsg[i];
            if (esc) { esc = false; continue; }
            if (c === '\\') { esc = true; continue; }
            if (c === '"') { inStr = !inStr; continue; }
            if (inStr) continue;
            if (c === '{') depth++;
            else if (c === '}') { depth--; if (depth === 0) { end = i; break; } }
          }
          if (end > gi) groups = JSON.parse(userMsg.slice(gi, end + 1)).groups || [];
        }
        const resp = groups.map(g => ({
          gno: g.gno, type: 'text',
          cues: (g.cues || []).map(c => ({ no: c.no, text: '测试译文第' + c.no + '条：' + String(c.src || '').slice(0, 10) }))
        }));
        content = JSON.stringify({ groups: resp, fillers: [] });
      } else if (/synopsis|terms/i.test(userMsg)) {
        content = JSON.stringify({ synopsis: 'A test film about subtitle tools.', terms: [] });
      } else {
        content = JSON.stringify({ groups: [], fillers: [] });
      }
      out.body = JSON.stringify({
        id: 'chatcmpl-fake', object: 'chat.completion', created: Date.now() / 1000 | 0,
        model: j.model || 'fake',
        choices: [{ index: 0, message: { role: 'assistant', content }, finish_reason: 'stop' }],
        usage: { prompt_tokens: 111, completion_tokens: 22, total_tokens: 133 }
      });
    } catch (e) {
      out = { code: 500, body: JSON.stringify({ error: { message: 'fake parse fail: ' + e.message } }) };
    }
    res.writeHead(out.code, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
    res.end(out.body);
  });
}).listen(3211, '127.0.0.1', () => console.log('fake upstream on 3211'));
