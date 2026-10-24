/* =============================================================================
   site-feedback.js —— 全站用户反馈入口（v0.9.371）

   只做两套文案，不做界面翻译（10-23 用户定案）：
     中文用户（zh*）看中文，其余语言一律看英文。
   语言判定顺序：站点当前界面语言（SiteI18N.UI.lang）→ <html lang> → URL 语言前缀 → 浏览器语言。
   ⚠️ 不能只看 <html lang>：translate.html 的 lang 是写死的 zh-CN，界面语言却是可切换的，
      只看它会把日语用户判成中文。

   页面侧只需一行：
     <script src="site-feedback.js?v=0.9.372" defer></script>

   只挂首页（10-23 用户定案：不必每页都有，首页一个浮窗就够）：
     · 右下角浮窗入口（桌面胶囊、移动端圆钮），点开是抽屉
     · 额外的按钮可以加 data-fb-open="bug|idea|quality|other" → 打开并预选类型
     · window.SiteFeedback.open(type) / .close()

   ⚠️ 别的页面一律不挂：本文件不会自己判断页面，挂到哪页就在哪页出现。

   ⚠️ 不收集字幕内容。附带信息只有：页面路径、界面语言、版本号、UA、视口宽。
   ============================================================================= */
(function () {
  'use strict';
  if (window.__srtfbLoaded) return;
  window.__srtfbLoaded = true;

  var MAXLEN = 500, MINLEN = 5, COOLDOWN = 60000;

  var TXT = {
    zh: {
      launch: '反馈',
      title: '告诉我们哪里不对',
      sub: '1 分钟，直接到开发者手里',
      typeLabel: '反馈类型',
      types: { bug: '问题报错', idea: '功能建议', quality: '翻译质量', other: '其他' },
      msgLabel: '具体内容',
      msgPh: '哪一步出了问题？看到什么、期望什么——写清页面和操作，我定位得更快。',
      emailLabel: '邮箱（可选）',
      emailPh: '留了才好回复你',
      ctx: '附带页面、语言、版本号、浏览器',
      ctxNote: '不含字幕内容，只用来定位问题',
      submit: '提交反馈',
      sending: '提交中…',
      errMin: '再多写几个字吧（至少 5 个字）',
      errNet: '网络没通，内容已经存在本地，稍后可以直接再提交',
      errRate: '提交太频繁了，过一会儿再试',
      okTitle: '收到，谢谢',
      okBody: '编号 #{no}。每一条我都会看，凭这个编号能查到后续。',
      okNote: '留了邮箱的话，我会直接回你。',
      close: '关闭',
      note: '你的字幕不会上传；反馈只用来改进这个工具。'
    },
    en: {
      launch: 'Feedback',
      title: 'Tell us what went wrong',
      sub: 'One minute, straight to the developer',
      typeLabel: 'Type',
      types: { bug: 'Bug', idea: 'Feature idea', quality: 'Translation quality', other: 'Other' },
      msgLabel: 'Details',
      msgPh: 'What happened, and what did you expect? Mention the page and the steps if you can.',
      emailLabel: 'Email (optional)',
      emailPh: 'Only if you want a reply',
      ctx: 'Include page, language, version, browser',
      ctxNote: 'No subtitle content is included',
      submit: 'Send feedback',
      sending: 'Sending…',
      errMin: 'Please write a little more (at least 5 characters).',
      errNet: 'Network error. Your text is saved locally — try again later.',
      errRate: 'Too many submissions. Please try again later.',
      okTitle: 'Got it — thank you',
      okBody: 'Ticket #{no}. I read every one; quote this number if you follow up.',
      okNote: 'If you left an email, you will get a reply.',
      close: 'Close',
      note: 'Your subtitles are never uploaded. Feedback is only used to improve this tool.'
    }
  };

  /* ---------------- 语言 ---------------- */
  function uiLang() {
    try {
      var s = window.SiteI18N;
      if (s && s.UI && s.UI.lang) return String(s.UI.lang);
    } catch (e) { }
    var l = (document.documentElement.getAttribute('lang') || '').trim();
    if (l) return l;
    var m = location.pathname.match(/^\/([A-Za-z]{2,3}(?:-[A-Za-z]{2,4})?)(\/|$)/);
    if (m) return m[1];
    return navigator.language || 'en';
  }
  function isZh() {
    var l = uiLang().toLowerCase();
    return l.indexOf('zh') === 0 || l === 'yue';
  }
  function L() { return isZh() ? TXT.zh : TXT.en; }

  function scriptVer() {
    try {
      var s = document.currentScript;
      if (!s) {
        var a = document.getElementsByTagName('script');
        for (var i = a.length - 1; i >= 0; i--) {
          if (/site-feedback\.js/.test(a[i].src)) { s = a[i]; break; }
        }
      }
      var m = s && /[?&]v=([0-9.]+)/.exec(s.src);
      return m ? m[1] : '';
    } catch (e) { return ''; }
  }
  var VER = scriptVer();

  /* ---------------- 样式 ---------------- */
  var CSS = [
    '.srtfb-launch{position:fixed;right:18px;bottom:calc(18px + env(safe-area-inset-bottom));z-index:9990;display:flex;align-items:center;gap:6px;height:40px;padding:0 14px;border:0;border-radius:999px;background:var(--acc,#D4206A);color:#fff;font:500 13px/1 -apple-system,BlinkMacSystemFont,"PingFang SC","Microsoft YaHei",sans-serif;letter-spacing:.2px;cursor:pointer;box-shadow:0 6px 20px rgba(20,20,30,.18);transition:transform .16s ease,box-shadow .16s ease,opacity .2s}',
    '.srtfb-launch:hover{transform:translateY(-1px);box-shadow:0 9px 24px rgba(20,20,30,.22)}',
    '.srtfb-launch:focus-visible{outline:2px solid #fff;outline-offset:2px}',
    '.srtfb-launch svg{width:14px;height:14px;flex:0 0 14px}',
    '.srtfb-ov{position:fixed;inset:0;background:rgba(16,30,27,.42);z-index:10060;opacity:0;pointer-events:none;transition:opacity .2s}',
    '.srtfb-ov.on{opacity:1;pointer-events:auto}',
    '.srtfb-panel{position:fixed;top:0;right:0;bottom:0;width:420px;max-width:100%;background:#fff;z-index:10061;display:flex;flex-direction:column;transform:translateX(102%);transition:transform .24s cubic-bezier(.4,0,.2,1);box-shadow:-8px 0 30px rgba(20,20,30,.14);color:#15151A;font:14px/1.6 -apple-system,BlinkMacSystemFont,"PingFang SC","Microsoft YaHei",sans-serif}',
    '.srtfb-panel.on{transform:translateX(0)}',
    '.srtfb-grab{display:none}',
    '.srtfb-head{position:relative;padding:18px 20px 12px;border-bottom:1px solid #E9E9EF}',
    '.srtfb-ht{font-size:16px;font-weight:600;line-height:1.4}',
    '.srtfb-hs{font-size:12px;color:#767680;margin-top:3px}',
    '.srtfb-x{position:absolute;top:14px;right:14px;width:28px;height:28px;border:0;border-radius:8px;background:transparent;color:#A3A3AD;font-size:20px;line-height:1;cursor:pointer}',
    '.srtfb-x:hover{background:#F4F4F7;color:#15151A}',
    '.srtfb-body{flex:1;overflow-y:auto;padding:16px 20px 8px}',
    '.srtfb-lb{font-size:12px;color:#767680;margin:14px 0 7px}',
    '.srtfb-lb:first-child{margin-top:0}',
    '.srtfb-lb em{color:#D4206A;font-style:normal}',
    '.srtfb-types{display:flex;flex-wrap:wrap;gap:7px}',
    '.srtfb-type{font-size:12.5px;padding:5px 11px;border-radius:999px;border:1px solid #DEDEE5;background:#fff;color:#767680;cursor:pointer;line-height:1.4}',
    '.srtfb-type:hover{border-color:#C9C9D1}',
    '.srtfb-type.on{background:var(--acc-weak,#FDF1F6);border-color:var(--acc-line,#F6CADC);color:var(--acc-ink,#C02159)}',
    '.srtfb-ta{width:100%;min-height:118px;padding:10px 12px;border:1px solid #DEDEE5;border-radius:10px;font-family:inherit;font-size:13.5px;line-height:1.65;color:#15151A;background:#fff;resize:vertical;box-sizing:border-box}',
    '.srtfb-ta::placeholder{color:#B4B4BE}',
    '.srtfb-ta:focus{outline:2px solid var(--acc-line,#F6CADC);border-color:var(--acc,#D4206A)}',
    '.srtfb-cnt{text-align:right;font-size:11px;color:#A3A3AD;margin-top:3px}',
    '.srtfb-cnt.full{color:#C62828}',
    '.srtfb-in{width:100%;padding:8px 11px;border:1px solid #DEDEE5;border-radius:9px;font-family:inherit;font-size:13.5px;line-height:1.5;color:#15151A;background:#fff;box-sizing:border-box}',
    '.srtfb-in:focus{outline:2px solid var(--acc-line,#F6CADC);border-color:var(--acc,#D4206A)}',
    '.srtfb-ctx{display:flex;gap:8px;align-items:flex-start;margin-top:14px;padding:9px 11px;background:#FAFAFC;border:1px solid #E9E9EF;border-radius:9px;cursor:pointer}',
    '.srtfb-ctx input{flex:0 0 auto;margin:3px 0 0;accent-color:var(--acc,#D4206A)}',
    '.srtfb-ctxt{font-size:11.5px;color:#767680;line-height:1.5}',
    '.srtfb-ctxt b{display:block;color:#15151A;font-weight:500;word-break:break-all}',
    '.srtfb-err{display:none;margin-top:12px;padding:8px 11px;border-radius:8px;background:#FEF2F2;color:#C62828;font-size:12.5px;line-height:1.5}',
    '.srtfb-err.on{display:block}',
    '.srtfb-foot{padding:12px 20px calc(14px + env(safe-area-inset-bottom));border-top:1px solid #E9E9EF}',
    '.srtfb-sub{width:100%;height:42px;border:0;border-radius:10px;background:var(--acc,#D4206A);color:#fff;font-size:14px;font-weight:500;cursor:pointer}',
    '.srtfb-sub:disabled{opacity:.6;cursor:not-allowed}',
    '.srtfb-note{margin-top:9px;text-align:center;font-size:11px;color:#A3A3AD;line-height:1.5}',
    '.srtfb-ok{padding:26px 4px 18px;text-align:center}',
    '.srtfb-okic{width:44px;height:44px;margin:0 auto 12px;border-radius:50%;background:#E4F5EB;color:#0B7A5C;display:flex;align-items:center;justify-content:center;font-size:22px}',
    '.srtfb-okt{font-size:16px;font-weight:600}',
    '.srtfb-okb{font-size:13px;color:#767680;margin-top:8px;line-height:1.65}',
    '.srtfb-okno{display:inline-block;margin-top:12px;font-family:ui-monospace,Menlo,monospace;font-size:13px;color:#15151A;background:#F4F4F7;border-radius:8px;padding:6px 12px}',
    '@media (max-width:560px){.srtfb-launch{right:14px;width:48px;height:48px;padding:0;justify-content:center;border-radius:50%}.srtfb-launch span{display:none}.srtfb-launch svg{width:20px;height:20px}.srtfb-panel{top:auto;bottom:0;width:100%;height:auto;max-height:92vh;border-radius:16px 16px 0 0;transform:translateY(102%)}.srtfb-panel.on{transform:translateY(0)}.srtfb-grab{display:block;width:38px;height:4px;border-radius:2px;background:#DEDEE5;margin:8px auto 0}.srtfb-head{padding-top:12px}}',
    '@media (prefers-reduced-motion:reduce){.srtfb-panel,.srtfb-ov,.srtfb-launch{transition:none}}'
  ].join('\n');

  var HTML = [
    '<div class="srtfb-ov" data-fb="ov"></div>',
    '<div class="srtfb-panel" role="dialog" aria-modal="true" aria-labelledby="srtfbTitle" data-fb="panel">',
    '  <div class="srtfb-grab"></div>',
    '  <div class="srtfb-head">',
    '    <div class="srtfb-ht" id="srtfbTitle" data-fb="title"></div>',
    '    <div class="srtfb-hs" data-fb="subtitle"></div>',
    '    <button type="button" class="srtfb-x" data-fb="x" aria-label="Close">×</button>',
    '  </div>',
    '  <div class="srtfb-body" data-fb="body">',
    '    <div class="srtfb-lb" data-fb="typeLabel"></div>',
    '    <div class="srtfb-types" data-fb="types"></div>',
    '    <div class="srtfb-lb" data-fb="msgLabel"></div>',
    '    <textarea class="srtfb-ta" data-fb="ta" maxlength="' + MAXLEN + '"></textarea>',
    '    <div class="srtfb-cnt" data-fb="cnt">0 / ' + MAXLEN + '</div>',
    '    <div class="srtfb-lb" data-fb="emailLabel"></div>',
    '    <input class="srtfb-in" type="email" data-fb="email" autocomplete="email">',
    '    <label class="srtfb-ctx"><input type="checkbox" data-fb="ctx" checked><span class="srtfb-ctxt"><b data-fb="ctxline"></b><span data-fb="ctxnote"></span></span></label>',
    '    <div class="srtfb-err" data-fb="err" role="alert"></div>',
    '  </div>',
    '  <div class="srtfb-foot">',
    '    <button type="button" class="srtfb-sub" data-fb="sub"></button>',
    '    <div class="srtfb-note" data-fb="note"></div>',
    '  </div>',
    '</div>'
  ].join('\n');

  var el = {};
  var state = { open: false, type: 'bug', ok: false, busy: false, lastFocus: null };

  function q(k) { return el.root.querySelector('[data-fb="' + k + '"]'); }

  function inject() {
    if (document.getElementById('srtfb-style')) return;
    var st = document.createElement('style');
    st.id = 'srtfb-style';
    st.textContent = CSS;
    document.head.appendChild(st);
  }

  function build() {
    if (el.root) return;
    inject();
    var root = document.createElement('div');
    root.innerHTML = HTML;
    document.body.appendChild(root);
    el.root = root;

    var launcher = document.createElement('button');
    launcher.type = 'button';
    launcher.className = 'srtfb-launch';
    launcher.setAttribute('aria-haspopup', 'dialog');
    launcher.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 11.5a8.4 8.4 0 0 1-9 8.4L4 21l1.2-4.2A8.4 8.4 0 1 1 21 11.5z"/></svg><span></span>';
    launcher.style.display = 'flex';
    document.body.appendChild(launcher);
    el.launch = launcher;

    el.panel = q('panel'); el.ov = q('ov'); el.ta = q('ta'); el.email = q('email');
    el.ctx = q('ctx'); el.err = q('err'); el.sub = q('sub'); el.cnt = q('cnt');
    el.body = q('body'); el.title = q('title'); el.subt = q('subtitle');
    el.types = q('types'); el.foot = el.root.querySelector('.srtfb-foot');

    /* 类型 chips：一次建好，切换只改 class */
    Object.keys(TXT.zh.types).forEach(function (k) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'srtfb-type';
      b.setAttribute('data-type', k);
      b.addEventListener('click', function () { setType(k); });
      el.types.appendChild(b);
    });

    launcher.addEventListener('click', function () { open(); });
    q('x').addEventListener('click', close);
    el.ov.addEventListener('click', close);
    el.sub.addEventListener('click', function () { if (state.ok) return close(); submit(); });

    el.ta.addEventListener('input', function () {
      updateCount(); saveDraft();
    });
    el.email.addEventListener('input', saveDraft);

    el.ctx.addEventListener('change', function () { renderCtx(); });
    el.body.addEventListener('keydown', trapTab);
    document.addEventListener('keydown', function (e) {
      if (!state.open) return;
      if (e.key === 'Escape' || e.keyCode === 27) { e.preventDefault(); close(); }
    });

    /* data-fb-open：任意页面元素都能唤起（按钮、链接都行），省得页面自己写事件 */
    document.addEventListener('click', function (e) {
      var t = e.target;
      while (t && t !== document.body) {
        if (t.getAttribute && t.getAttribute('data-fb-open') !== null) {
          e.preventDefault();
          open(t.getAttribute('data-fb-open'));
          return;
        }
        t = t.parentNode;
      }
    });

    /* 切界面语言后把文案刷新一遍（只认两个语言，不需要监听全部状态） */
    document.addEventListener('change', function (e) {
      var id = (e.target && e.target.id) || '';
      if (/lang/i.test(id)) syncText();
    }, true);

    restoreDraft();
    syncText();
  }

  function setType(k) {
    state.type = TXT.zh.types[k] ? k : 'bug';
    Array.prototype.forEach.call(el.types.children, function (b) {
      b.className = 'srtfb-type' + (b.getAttribute('data-type') === state.type ? ' on' : '');
    });
    saveDraft();
  }

  function updateCount() {
    /* maxlength 只拦「用户输入」，脚本赋值 / 某些输入法的组合事件能绕过去 ——
       这里再兜一刀，保证界面上永远不会出现 600 / 500。 */
    if (el.ta.value.length > MAXLEN) el.ta.value = el.ta.value.slice(0, MAXLEN);
    var n = el.ta.value.length;
    el.cnt.textContent = n + ' / ' + MAXLEN;
    el.cnt.className = 'srtfb-cnt' + (n >= MAXLEN ? ' full' : '');
  }

  function renderCtx() {
    var on = el.ctx.checked;
    q('ctxline').textContent = on ? ctxLine() : L().ctx;
    q('ctxnote').textContent = on ? L().ctxNote : '';
  }

  function ctxLine() {
    var page = location.pathname || '/';
    /* 首页在路径上就是个「/」，写给人看没意义，换成「首页」 */
    if (page === '/' || page === '/index.html') page = isZh() ? '首页' : 'Home';
    var parts = [page, uiLang()];
    if (VER) parts.push('v' + VER);
    try {
      var ua = navigator.userAgent || '';
      var m = /(Chrome|Edg|Firefox|Safari)\/(\d+)/.exec(ua);
      if (m) parts.push(m[1] + ' ' + m[2]);
    } catch (e) { }
    return parts.join(' · ');
  }

  function syncText() {
    if (!el.root) return;
    var t = L();
    el.title.textContent = t.title;
    el.subt.textContent = t.sub;
    el.launch.querySelector('span').textContent = t.launch;
    el.launch.setAttribute('aria-label', t.launch);
    q('x').setAttribute('aria-label', t.close);
    q('typeLabel').textContent = t.typeLabel;
    Array.prototype.forEach.call(el.types.children, function (b) {
      b.textContent = t.types[b.getAttribute('data-type')] || b.getAttribute('data-type');
    });
    q('msgLabel').innerHTML = t.msgLabel + ' <em>*</em>';
    el.ta.setAttribute('placeholder', t.msgPh);
    q('emailLabel').textContent = t.emailLabel;
    el.email.setAttribute('placeholder', t.emailPh);
    el.sub.textContent = t.submit;
    q('note').textContent = t.note;
    renderCtx();
    setType(state.type);
  }

  /* ---------------- 开关 ---------------- */
  function open(type) {
    build();
    if (typeof type === 'string' && TXT.zh.types[type]) state.type = type;
    if (!state.ok) syncText();
    state.lastFocus = document.activeElement;
    state.open = true;
    el.panel.classList.add('on');
    el.ov.classList.add('on');
    document.documentElement.style.overflow = 'hidden';
    setTimeout(function () { try { el.ta.focus({ preventScroll: true }); } catch (e) { } }, 240);
  }

  function close() {
    if (!el.panel) return;
    state.open = false;
    el.panel.classList.remove('on');
    el.ov.classList.remove('on');
    document.documentElement.style.overflow = '';
    if (state.lastFocus && state.lastFocus.focus) { try { state.lastFocus.focus({ preventScroll: true }); } catch (e) { } }
    if (state.ok) setTimeout(reset, 260);
  }

  /* ---------------- 提交 ---------------- */
  function showErr(m) {
    el.err.textContent = m;
    el.err.className = 'srtfb-err on';
  }
  function clearErr() { el.err.className = 'srtfb-err'; el.err.textContent = ''; }

  function payload() {
    var body = {
      type: state.type,
      msg: el.ta.value.trim(),
      contact: el.email.value.trim(),
      page: (location.pathname || '/').slice(0, 80),
      lang: uiLang().slice(0, 12),
      ver: VER,
      vw: window.innerWidth || 0,
      ua: (navigator.userAgent || '').slice(0, 200),
      hp: ''
    };
    if (!el.ctx.checked) { body.page = ''; body.lang = ''; body.ver = ''; body.ua = ''; body.vw = 0; }
    return body;
  }

  function submit() {
    if (state.busy) return;
    clearErr();
    var msg = el.ta.value.trim();
    if (msg.length < MINLEN) return showErr(L().errMin);
    var now = Date.now();
    var last = 0;
    try { last = Number(localStorage.getItem('srtfbLast') || 0) || 0; } catch (e) { }
    if (now - last < COOLDOWN) return showErr(L().errRate);

    state.busy = true;
    el.sub.disabled = true;
    el.sub.textContent = L().sending;

    var ac = null, timer = null;
    try {
      if (window.AbortController) {
        ac = new AbortController();
        timer = setTimeout(function () { ac.abort(); }, 12000);
      }
    } catch (e) { }

    fetch('/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload()),
      signal: ac ? ac.signal : undefined
    }).then(function (r) {
      return r.json().catch(function () { return {}; }).then(function (j) { return { ok: r.ok, status: r.status, j: j }; });
    }).then(function (res) {
      if (timer) clearTimeout(timer);
      state.busy = false;
      el.sub.disabled = false;
      el.sub.textContent = L().submit;
      if (!res.ok) {
        var code = (res.j && res.j.error && res.j.error.code) || '';
        if (res.status === 429 || code === 'rate') return showErr(L().errRate);
        if (code === 'too_short') return showErr(L().errMin);
        return showErr((res.j && res.j.error && res.j.error.message) || L().errNet);
      }
      try {
        localStorage.removeItem('srtfbDraft');
        localStorage.setItem('srtfbLast', String(Date.now()));
      } catch (e) { }
      showOk(res.j && res.j.no);
    }).catch(function () {
      if (timer) clearTimeout(timer);
      state.busy = false;
      el.sub.disabled = false;
      el.sub.textContent = L().submit;
      showErr(L().errNet);
    });
  }

  function showOk(no) {
    var t = L();
    state.ok = true;
    el.body.innerHTML =
      '<div class="srtfb-ok">' +
      '<div class="srtfb-okic">✓</div>' +
      '<div class="srtfb-okt">' + esc(t.okTitle) + '</div>' +
      '<div class="srtfb-okb">' + esc(String(t.okBody).replace('{no}', no ? String(no) : '-')) + '<br>' + esc(t.okNote) + '</div>' +
      (no ? '<div class="srtfb-okno">#F-' + esc(String(no)) + '</div>' : '') +
      '</div>';
    el.foot.innerHTML = '<button type="button" class="srtfb-sub">' + esc(t.close) + '</button><div class="srtfb-note">' + esc(t.note) + '</div>';
    el.foot.querySelector('button').addEventListener('click', close);
  }

  function reset() {
    state.ok = false;
    el.body.innerHTML = '';
    el.foot.innerHTML = '';
    /* 重建表单区：成功态把 body 清空过，这里整块还原 */
    var tmp = document.createElement('div');
    tmp.innerHTML = HTML;
    var fresh = tmp.querySelector('[data-fb="body"]');
    el.body.innerHTML = fresh.innerHTML;
    el.foot.innerHTML = tmp.querySelector('.srtfb-foot').innerHTML;
    el.ta = q('ta'); el.email = q('email'); el.ctx = q('ctx'); el.err = q('err');
    el.sub = q('sub'); el.cnt = q('cnt');
    el.ta.addEventListener('input', function () { updateCount(); saveDraft(); });
    el.email.addEventListener('input', saveDraft);
    el.ctx.addEventListener('change', renderCtx);
    el.sub.addEventListener('click', function () { if (state.ok) return close(); submit(); });
    el.body.addEventListener('keydown', trapTab);
    state.type = 'bug';
    syncText();
    updateCount();
    restoreDraft();
  }

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function trapTab(e) {
    if (e.key !== 'Tab') return;
    var nodes = el.panel.querySelectorAll('button, textarea, input');
    var list = Array.prototype.filter.call(nodes, function (n) {
      return n.offsetParent !== null && !n.disabled;
    });
    if (!list.length) return;
    var first = list[0], last = list[list.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }

  /* ---------------- 草稿 ---------------- */
  var draftTimer = null;
  function saveDraft() {
    if (state.ok) return;
    clearTimeout(draftTimer);
    draftTimer = setTimeout(function () {
      try {
        localStorage.setItem('srtfbDraft', JSON.stringify({
          type: state.type, msg: el.ta.value, contact: el.email.value, t: Date.now()
        }));
      } catch (e) { }
    }, 400);
  }
  function restoreDraft() {
    try {
      var d = JSON.parse(localStorage.getItem('srtfbDraft') || 'null');
      if (!d || !d.msg || !(Date.now() - (d.t || 0) < 7 * 86400000)) return;
      el.ta.value = String(d.msg).slice(0, MAXLEN);
      el.email.value = String(d.contact || '').slice(0, 120);
      if (TXT.zh.types[d.type]) state.type = d.type;
      updateCount();
    } catch (e) { }
  }

  /* ---------------- 启动 ---------------- */
  function boot() { build(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();

  window.SiteFeedback = {
    open: open,
    close: close,
    isOpen: function () { return state.open; },
    lang: function () { return isZh() ? 'zh' : 'en'; }
  };
})();
