/* =============================================================================
   site-nav.js —— 全站「工具导航」的唯一数据源（v0.9.257）

   为什么单独一个文件：
   三个页面（index 翻译 / clean 清洗 / merge 特效）原先各写各的顶部导航，
   加一个工具要改三处 HTML、还容易漏。这里把工具清单集中成一份 TOOLS 数组，
   页面只留两个占位（#siteNav 顶部胶囊 / #toolCards 主页卡片），
   由本文件渲染。以后上新工具 = 数组加一项，三页同时出现。

   用法（页面侧只需两处）：
     1) 在想要的位置放占位：<span id="siteNav"></span>       （顶部胶囊）
                            <div id="toolCards"></div>       （主页三卡，只有首页放）
     2) body 末尾引入：<script src="site-nav.js" data-tool="tr"></script>
        data-tool 填本页 id（tr / clean / fx），当前页会自动高亮。

   ⚠️ 本文件只做「导航与导览卡片」的渲染，不碰任何页面自己的解析、样式、
      状态逻辑；三个页面各有各的视觉变量，样式一律用 var(--x, 兜底色) 读取。
   ⚠️ 词条只有 4 语（zh-CN / zh-TW / en / ja），与 merge.html 的 I18N 同口径；
      界面语言选了别的（如德语）时回退英文。
   ============================================================================= */
(function (w, d) {
  'use strict';

  /* ---------- 工具清单：加新工具就在这里加一项 ---------- */
  var TOOLS = [
    {
      id: 'tr',
      href: '/',
      icon: '<path d="M3 7h18M3 12h18M3 17h11"/>',
      c: { bg: '#FDF1F6', fg: '#C02159' },
      name: { 'zh-CN': '字幕翻译', 'zh-TW': '字幕翻譯', 'en': 'Translate', 'ja': '字幕翻訳' },
      desc: {
        'zh-CN': '75 种语言互译，自动配轴对齐，导出 SRT / VTT / ASS / SBV / TXT。',
        'zh-TW': '75 種語言互譯，自動對軸對齊，匯出 SRT / VTT / ASS / SBV / TXT。',
        'en': 'Translate between 75 languages, auto-align the timeline, export SRT / VTT / ASS / SBV / TXT.',
        'ja': '75 言語を相互翻訳、タイムライン自動調整、SRT / VTT / ASS / SBV / TXT で書き出し。'
      },
      tags: ['SRT', 'VTT', 'ASS']
    },
    {
      id: 'clean',
      href: '/clean.html',
      icon: '<path d="M3 6h18l-7 8v6l-4-2v-4z"/>',
      c: { bg: '#E6F6EF', fg: '#0B7A5C' },
      name: { 'zh-CN': '字幕清洗', 'zh-TW': '字幕清洗', 'en': 'Clean Up', 'ja': '字幕クリーニング' },
      desc: {
        'zh-CN': '去水印广告、听障提示、HTML 标签，修好全大写与乱码，逐条可还原。',
        'zh-TW': '去浮水印廣告、聽障提示、HTML 標籤，修好全大寫與亂碼，逐條可還原。',
        'en': 'Strip watermarks, SDH cues and HTML tags, fix all-caps and mojibake — every change is revertible.',
        'ja': 'ウォーターマーク、聴覚障害者向け字幕、HTML タグを除去。全角大文字や文字化けも修正、変更は個別に取り消せます。'
      },
      tags: [
        { 'zh-CN': '13 条规则', 'zh-TW': '13 條規則', 'en': '13 rules', 'ja': '13 ルール' },
        { 'zh-CN': '不改时间轴', 'zh-TW': '不改時間軸', 'en': 'Timing untouched', 'ja': '時間軸は不変更' }
      ]
    },
    {
      id: 'fx',
      href: '/merge.html',
      icon: '<rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="M7 15h10M7 11.5h10"/>',
      c: { bg: '#EEEDFE', fg: '#534AB7' },
      name: { 'zh-CN': '特效字幕', 'zh-TW': '特效字幕', 'en': 'Styled Subtitles', 'ja': '装飾字幕' },
      desc: {
        'zh-CN': '双语合并、样式槽、ASS / VTT 特效，实时预览所见即所得。',
        'zh-TW': '雙語合併、樣式槽、ASS / VTT 特效，即時預覽所見即所得。',
        'en': 'Merge bilingual tracks, apply style slots and ASS / VTT effects with live preview.',
        'ja': '二か国語字幕の結合、スタイルスロット、ASS / VTT の装飾をライブプレビューで。'
      },
      tags: [
        { 'zh-CN': '双语', 'zh-TW': '雙語', 'en': 'Bilingual', 'ja': '二か国語' },
        { 'zh-CN': '样式槽', 'zh-TW': '樣式槽', 'en': 'Style slots', 'ja': 'スタイルスロット' }
      ]
    }
  ];

  var T = {
    cur: { 'zh-CN': '当前页', 'zh-TW': '目前頁面', 'en': 'You are here', 'ja': '現在のページ' },
    go: { 'zh-CN': '进入', 'zh-TW': '進入', 'en': 'Open', 'ja': '開く' }
  };

  /* ---------- 语言：读页面自己的界面语言下拉，读不到就回退 ---------- */
  var L = 'zh-CN';
  var SEL_IDS = ['uiLang2', 'uiLang', 'langSel'];

  function readLang() {
    for (var i = 0; i < SEL_IDS.length; i++) {
      var el = d.getElementById(SEL_IDS[i]);
      if (el && el.value) return el.value;
    }
    try {
      var s = localStorage.getItem('srtUiLang') || localStorage.getItem('mergeUiLang') || localStorage.getItem('srt_clean_lang');
      if (s) return s;
    } catch (e) { /* 隐私模式读不了，忽略 */ }
    return (navigator.language || 'zh-CN');
  }
  function pick(o) {
    if (o == null) return '';
    if (typeof o === 'string') return o;              /* 格式名之类的专有名词不翻译 */
    return o[L] || o['en'] || o['zh-CN'] || '';
  }
  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function svg(path, size) {
    return '<svg viewBox="0 0 24 24" width="' + size + '" height="' + size + '" fill="none" stroke="currentColor" ' +
      'stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + path + '</svg>';
  }

  /* ---------- 渲染 ---------- */
  function renderNav(cur) {
    var box = d.getElementById('siteNav');
    if (!box) return 0;
    box.innerHTML = TOOLS.map(function (t) {
      var on = (t.id === cur);
      return '<a class="snav-pill' + (on ? ' on' : '') + '" href="' + t.href + '"' +
        (on ? ' aria-current="page"' : '') + '>' + svg(t.icon, 13) +
        '<span>' + esc(pick(t.name)) + '</span></a>';
    }).join('');
    return TOOLS.length;
  }

  function renderCards(cur) {
    var box = d.getElementById('toolCards');
    if (!box) return 0;
    box.innerHTML = TOOLS.map(function (t) {
      var on = (t.id === cur);
      /* 标签跟着本卡的主色走（清洗是青、特效是紫），不然三张卡都一片粉、跟图标打架 */
      var tagStyle = t.c ? ' style="color:' + t.c.fg + ';background:' + t.c.bg + '"' : '';
      var tags = (t.tags || []).map(function (x) {
        return '<span class="snav-tag"' + tagStyle + '>' + esc(pick(x)) + '</span>';
      }).join('');
      var inner =
        '<div class="snav-ic"' + (t.c ? ' style="background:' + t.c.bg + ';color:' + t.c.fg + '"' : '') + '>' +
        svg(t.icon, 17) + '</div>' +
        '<div class="snav-n">' + esc(pick(t.name)) +
        (on ? '<span class="snav-cur">' + esc(pick(T.cur)) + '</span>' : '') + '</div>' +
        '<p class="snav-d">' + esc(pick(t.desc)) + '</p>' +
        '<div class="snav-tags">' + tags + '</div>';
      return on
        ? '<div class="snav-card cur">' + inner + '</div>'
        : '<a class="snav-card" href="' + t.href + '"><span class="snav-go">' + esc(pick(T.go)) + ' →</span>' + inner + '</a>';
    }).join('');
    return TOOLS.length;
  }

  /* ---------- 样式：三页视觉变量不同，一律带兜底色 ---------- */
  var CSS =
    '#siteNav{display:inline-flex;align-items:center;gap:8px;flex-wrap:wrap;vertical-align:middle}' +
    '#siteNav a.snav-pill{display:inline-flex;align-items:center;gap:6px;height:29px;padding:0 12px;' +
    'border-radius:999px;border:1px solid var(--line-strong,#DEDEE5);background:var(--card,#fff);' +
    'color:var(--sub,#6F6C72);font-size:12.5px;line-height:1;text-decoration:none;white-space:nowrap;' +
    'transition:border-color .15s,color .15s,background .15s}' +
    '#siteNav a.snav-pill svg{width:13px;height:13px;flex:none}' +
    '#siteNav a.snav-pill:hover{border-color:var(--acc,#E12D6E);color:var(--acc-ink,#C02159)}' +
    '#siteNav a.snav-pill.on{background:var(--acc-weak,#FDF1F6);border-color:var(--acc-line,#F6CADC);' +
    'color:var(--acc-ink,#C02159);font-weight:600}' +
    '#toolCards{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;margin:26px 0 4px}' +
    '@media (max-width:860px){#toolCards{grid-template-columns:1fr}}' +
    '#toolCards .snav-card{position:relative;display:block;background:var(--card,#fff);' +
    'border:1px solid var(--line,#E9E9EF);border-radius:14px;padding:16px 17px 15px;' +
    'text-decoration:none;color:inherit;box-shadow:var(--sh-card,0 1px 2px rgba(18,18,24,.04));' +
    'transition:border-color .15s,box-shadow .15s,transform .15s}' +
    '#toolCards a.snav-card:hover{border-color:var(--acc-line,#F6CADC);' +
    'box-shadow:0 6px 18px -12px rgba(18,18,24,.35);transform:translateY(-1px)}' +
    '#toolCards .snav-card.cur{border-style:dashed}' +
    '#toolCards .snav-ic{width:34px;height:34px;border-radius:10px;background:var(--acc-weak,#FDF1F6);' +
    'color:var(--acc-ink,#C02159);display:flex;align-items:center;justify-content:center;margin-bottom:11px}' +
    '#toolCards .snav-ic svg{width:17px;height:17px}' +
    '#toolCards .snav-n{display:flex;align-items:center;gap:8px;font-size:14.5px;font-weight:650;' +
    'letter-spacing:-.1px;color:var(--ink,#15151A)}' +
    '#toolCards .snav-cur{font-size:11px;font-weight:500;color:var(--acc-ink,#C02159);' +
    'background:var(--acc-weak,#FDF1F6);border-radius:99px;padding:2px 8px}' +
    '#toolCards .snav-d{margin:7px 0 11px;font-size:12.8px;line-height:1.7;color:var(--sub,#767680)}' +
    '#toolCards .snav-tags{display:flex;gap:6px;flex-wrap:wrap}' +
    '#toolCards .snav-tag{font-size:11px;color:var(--acc-ink,#C02159);background:var(--acc-weak,#FDF1F6);' +
    'border-radius:6px;padding:2px 7px}' +
    '#toolCards .snav-go{position:absolute;right:15px;top:16px;font-size:11.5px;color:var(--mut,#A3A3AD)}' +
    '#toolCards a.snav-card:hover .snav-go{color:var(--acc-ink,#C02159)}';

  function injectCss() {
    if (d.getElementById('snavCss')) return;
    var s = d.createElement('style');
    s.id = 'snavCss';
    s.textContent = CSS;
    (d.head || d.body).appendChild(s);
  }

  var CUR = (d.currentScript && d.currentScript.getAttribute('data-tool')) || '';

  function render() {
    L = readLang();
    injectCss();
    renderNav(CUR);
    renderCards(CUR);
  }

  function boot() {
    render();
    SEL_IDS.forEach(function (id) {
      var el = d.getElementById(id);
      if (el) el.addEventListener('change', render);   /* 切界面语言时导航跟着换 */
    });
  }

  if (d.readyState === 'loading') d.addEventListener('DOMContentLoaded', boot);
  else boot();

  w.SiteNav = { render: render, tools: TOOLS, lang: function () { return L; }, cur: CUR };
})(window, document);
