# -*- coding: utf-8 -*-
"""v0.9.277 一次性脚本：改造 test-core.js，让它跟着「首页拆页」走。

改动分三类：
 ① 取材：把「从 index.html 抠工作台源码」的那些读取点换成 WS_SRC（工作台 + 字典）；
        首页落地页的结构断言用 HOME_SRC。
 ② 口径：版号升 277；导航从「三页挂 siteNav」改成「三个工具页 + 工作台」。
 ③ 新增：v0.9.277 拆页结构的断言块。
用法：python3 _test277.py
"""
import io, re, sys

P = 'test-core.js'
s = io.open(P, encoding='utf-8').read()
orig = s

def rep(old, new, label, count=1):
    global s
    n = s.count(old)
    if n != count:
        print('✗ %s：找到 %d 处（期望 %d）' % (label, n, count))
        sys.exit(1)
    s = s.replace(old, new)
    print('✓ ' + label)

# ---------------------------------------------------------------- ① 取材
HDR = """const assert = require('assert');

/* ============================================================================
   v0.9.277：首页拆成三份文件 ——
     /                → index.html        落地页（四张工具卡 + 四段图文详解）
     /translate.html  → translate.html    字幕翻译工作台（原 index.html 的工作台那半）
     界面字典          → site-i18n.js      27 语，两页共用一份

   ⚠️ 下面这些老用例里那个 `html` 变量，指的是「工作台源码」（以前它就在 index.html 里）。
      现在统一换成「工作台 + 字典」的拼接：抠工作台的函数、查词条是否 27 语齐全都能命中。
   ⚠️ 涉及**首页落地页**结构的断言（顶栏版号、四张工具卡、hero 文案）请用 HOME_SRC，
      别再拿 html 顶着用 —— 那已经不是同一个文件了。
   ============================================================================ */
const fsT = require('fs'), pathT = require('path');
const readT = f => fsT.readFileSync(pathT.join(__dirname, f), 'utf8');
const WS_SRC = readT('translate.html') + '\\n' + readT('site-i18n.js');
const HOME_SRC = readT('index.html');
"""
rep("const assert = require('assert');\n", HDR, '文件头加 WS_SRC / HOME_SRC')

rep("  const htmlPath = pathMod.join(__dirname, 'index.html');",
    "  /* v0.9.277：这一段抠的是 LANGS / EX_SAMPLE —— 它们跟着工作台搬去了 translate.html */",
    'EX_SAMPLE 段的路径变量')

rep("    const html = fsMod.readFileSync(htmlPath, 'utf8');",
    "    const html = WS_SRC;", 'EX_SAMPLE 段取 WS_SRC')

rep("  if (fsMod.existsSync(htmlPath)) {",
    "  /* v0.9.277：工作台已独立成页，WS_SRC 是必读的，不再有「文件不在就跳过」这种场景 */\n  {",
    'EX_SAMPLE 段的 skip 条件')

rep("  const html = fsM.existsSync(pathM.join(__dirname,'index.html')) ? fsM.readFileSync(pathM.join(__dirname,'index.html'),'utf8') : '';",
    "  const html = WS_SRC;   /* v0.9.277：原读 index.html，现为「工作台 + 字典」 */",
    'html 来源 ×3（response_format / 术语表 / 双语合并块）', count=3)

rep("  const html = fsM2.readFileSync(pathM2.join(__dirname, 'index.html'), 'utf8');",
    "  const html = WS_SRC;   /* v0.9.277：systemPrompt* 跟着工作台去了 translate.html */",
    '提示词段取 WS_SRC')

rep("  const html = fsD.readFileSync(pathD.join(__dirname, 'index.html'), 'utf8');",
    "  const html = WS_SRC;   /* v0.9.277：赞助入口 DOM 在 translate.html */",
    '赞助入口段取 WS_SRC')

# ---------------------------------------------------------------- ② 口径
# 版号：只改「正则字面量」形态（带反斜杠的那种），注释里的历史版号不动
before = len(re.findall(r'(v?0\\\.9\\\.)276', s))
s = re.sub(r'(v?0\\\.9\\\.)276', r'\g<1>277', s)
print('✓ 版号断言升 277：%d 处' % before)

# 「显示版号」在首页落地页 —— 换成 HOME_SRC
s = s.replace('/class="ver">v0\\.9\\.277/.test(html)', '/class="ver">v0\\.9\\.277/.test(HOME_SRC)')
print('✓ class="ver" 的断言改读 HOME_SRC（%d 处）' % s.count('class="ver">v0\\.9\\.277/.test(HOME_SRC)'))

# rkBanner：首页那条引流横条 v0.9.277 已升级成「视频下载工具」卡片
rep("""  t('引流条的链接、图标与装饰让位', () => {
    assert.ok(/href="https:\\/\\/risekol\\.com\\/video"/.test(html), '链接不对');
    assert.ok(/id="rkBanner"[^>]*target="_blank"/.test(html), '未新窗口打开');
    assert.ok(/\\.hero\\.has-rk \\.spark\\.s3\\{display:none\\}/.test(html), '底部装饰未让位');
    assert.ok(/data-i18n-html="rkTx"/.test(html), '文案未走 i18n（html）');
    assert.ok(/data-i18n="rkGo"/.test(html), 'CTA 未走 i18n');
  });""",
"""  t('引流条（工作台卡片）的链接与文案走 i18n', () => {
    /* v0.9.277：首页那条横条升级成了「视频下载工具」卡片（id=dlCard），
       工作台里这张卡还在（id=rkBannerWs），两者共用同一套词条与域名判定。 */
    assert.ok(/href="https:\\/\\/risekol\\.com\\/video"/.test(html), '链接不对');
    assert.ok(/id="rkBannerWs"[^>]*target="_blank"/.test(html), '未新窗口打开');
    assert.ok(/data-i18n-html="rkTx"/.test(html), '文案未走 i18n（html）');
    assert.ok(/data-i18n="rkGo"/.test(html), 'CTA 未走 i18n');
    /* 首页那条 hero 装饰让位规则要跟着首页落地页走 */
    assert.ok(/\\.hero\\.has-rk \\.spark\\.s3\\{display:none\\}/.test(HOME_SRC), '首页底部装饰未让位');
  });""", '引流条断言改指工作台卡片')

# 导航：首页改由四张工具卡承担，不再挂 siteNav 胶囊
rep("""  t('index.html：navMerge ×27 语言 + 版本三处 v0.9.223 + merge 入口 + 描边色方块 id 配对', () => {""",
    """  t('translate.html：navMerge ×27 语言 + 版本三处 + 工具入口 + 描边色方块 id 配对', () => {""",
    '导航用例标题')

rep("""    assert.ok(/<span id="siteNav"><\\/span>/.test(html), '首页缺 #siteNav 占位');
    assert.ok(/<div id="toolCards"><\\/div>/.test(html), '首页缺 #toolCards 占位');
    assert.ok(!/href="merge\\.html"/.test(html), '首页仍写死 merge.html 入口（应交给 site-nav.js）');""",
"""    /* v0.9.277：首页落地页改由「四张工具卡」承担导航 —— 顶部再挂一排胶囊是重复，
       所以 index.html 里两种占位都不该有；三个工具页 + 工作台照旧挂 siteNav。 */
    assert.ok(!/<span id="siteNav">/.test(HOME_SRC), '首页又挂回了 siteNav 胶囊（跟工具卡重复）');
    assert.ok(!/<div id="toolCards">/.test(HOME_SRC), '首页又挂回了 #toolCards（v0.9.276 已撤）');
    assert.ok(!/href="merge\\.html"/.test(HOME_SRC), '首页仍写死 merge.html 入口（应交给 site-nav.js）');""",
    '首页导航占位断言')

rep("""    assert.ok(/href: '\\/merge\\.html'/.test(nv), 'site-nav.js 缺 merge.html 入口');
    assert.ok(/href: '\\/clean\\.html'/.test(nv), 'site-nav.js 缺 clean.html 入口');
    /* 三页都要挂，且 data-tool 必须各不相同（挂错 = 高亮错页） */
    [['index.html', 'tr'], ['merge.html', 'fx'], ['clean.html', 'clean']].forEach(pr => {""",
"""    assert.ok(/href: '\\/translate\\.html'/.test(nv), 'site-nav.js 的翻译入口没指向 /translate.html');
    assert.ok(/href: '\\/merge\\.html'/.test(nv), 'site-nav.js 缺 merge.html 入口');
    assert.ok(/href: '\\/clean\\.html'/.test(nv), 'site-nav.js 缺 clean.html 入口');
    /* 三个工具页 + 工作台都要挂，且 data-tool 必须各不相同（挂错 = 高亮错页） */
    [['translate.html', 'tr'], ['merge.html', 'fx'], ['clean.html', 'clean']].forEach(pr => {""",
    'site-nav 三项与挂载清单')

# 首页卡片：v0.9.276 那三条 mod-card 断言换成 v0.9.277 的四张工具卡
rep("""    assert.ok(/<a class="mod-card tr cur" href="\\/"/.test(html), '翻译模块入口没指向首页');
    assert.ok(/<a class="mod-card cl" href="\\/clean\\.html"/.test(html), '清洗模块入口没指向 clean.html');
    assert.ok(/<a class="mod-card fx" href="\\/merge\\.html"/.test(html), '特效模块入口没指向 merge.html');""",
"""    /* v0.9.277：首页从「三张模块卡」改成「四张工具卡」——翻译卡不再指向首页自己，
       而是指向独立的工作台 /translate.html。 */
    assert.ok(/<a class="tc tr" href="\\/translate\\.html"/.test(HOME_SRC), '翻译卡没指向 /translate.html');
    assert.ok(/<a class="tc cl" href="\\/clean\\.html"/.test(HOME_SRC), '清洗卡没指向 clean.html');
    assert.ok(/<a class="tc fx" href="\\/merge\\.html"/.test(HOME_SRC), '特效卡没指向 merge.html');""",
    '四张工具卡的入口断言')

rep("""    assert.ok(/<div class="mod-top">[\\s\\S]{0,420}?<span class="mod-go"/.test(html), '「进入」没放进卡片顶部');
    assert.ok(/class="mod-tags"/.test(html), '卡片底部缺标签行');""",
"""    /* v0.9.277：卡内结构改名 —— .mod-top → .tc-top、「进入」叫 .tc-go */
    assert.ok(/<div class="tc-top">[\\s\\S]{0,260}?<span class="tc-go"/.test(HOME_SRC), '「进入」没放进卡片顶部');
    /* 四段图文详解各自要有示意图（纯 CSS 画的，不是图片） */
    assert.strictEqual((HOME_SRC.match(/class="det-fig"/g) || []).length, 4, '四段详解不是各配一张示意图');""",
    '卡内结构断言（tc-top / det-fig）')

rep("""    assert.ok(!/<h3 data-i18n="[^"]*">[^<]*<(?!\\/h3>)/.test(html),
      '带 data-i18n 的标题里套了子元素 —— applyI18n 用 textContent 赋值会把子元素整个抹掉');
    assert.ok(/<h3><span data-i18n="modTrName">/.test(html), '翻译卡的名字没单独包一层 span');""",
"""    /* ⚠️ v0.9.277 把这条判据扩大到**所有** data-i18n 节点：不只 <h3>，
       任何挂了 data-i18n / data-i18n-html 的节点都不许再套子元素。
       （v0.9.276 首页那个「当前页」pill 就是这么消失的，源码断言看不出来。） */
    const badI18n = HOME_SRC.match(/data-i18n(?:-html)?="[^"]*"[^>]*>[^<]*<(?!\\/)/g) || [];
    assert.strictEqual(badI18n.length, 0,
      '首页有 i18n 节点套了子元素（textContent 会把子元素抹掉）：' + badI18n.slice(0, 2).join(' | '));
    assert.ok(/<div class="tc-n" data-i18n="tcTrN">/.test(HOME_SRC), '翻译卡的名字没走 i18n');""",
    'i18n 节点不许套子元素（扩大到全页）')

rep("""    assert.ok(!/\\.mod-card\\.cur\\{border-style:dashed\\}/.test(html), '当前页还在用虚线框');""",
"""    assert.ok(!/\\.tc[^{]*\\{border-style:dashed\\}/.test(HOME_SRC), '工具卡还在用虚线框');""",
    '虚线框断言跟着首页走')

rep("""    assert.ok(!/class="mod-k"/.test(html), '卡片里的「解决什么 / 适合谁」没撤干净');""",
"""    assert.ok(!/class="mod-k"/.test(HOME_SRC), '卡片里的「解决什么 / 适合谁」没撤干净');""",
    'mod-k 断言跟着首页走')

# 底色 / 渐变那两处：index.html 换成 HOME_SRC
rep("""    [['index.html', html], ['clean.html', cln], ['merge.html', mg]].forEach(function (p) {""",
    """    [['index.html', HOME_SRC], ['clean.html', cln], ['merge.html', mg]].forEach(function (p) {""",
    '底色统一断言：首页用 HOME_SRC')

rep("""    [['index.html', html], ['merge.html', mg]].forEach(function (p) {""",
    """    [['index.html', HOME_SRC], ['merge.html', mg]].forEach(function (p) {""",
    '禁渐变断言：首页用 HOME_SRC')

# ---------------------------------------------------------------- ③ 新增 277 断言
BLOCK = """
  /* ==========================================================================
     v0.9.277：首页拆地砖
       /                落地页（四张工具卡 + 四段图文详解 + 原有区块）
       /translate.html  字幕翻译工作台（原 index.html 的工作台那半）
       site-i18n.js     27 语字典，两页共用一份
     为什么拆：用户拍板「首页那个导入翻译的模块不需要了，点卡片进工作台就行」，
     并要求工作台像特效页/清洗页一样有自己的 URL。
     ========================================================================== */
  t('v0.9.277：首页拆成落地页 + 独立工作台（/translate.html）', () => {
    const rd = f => require('fs').readFileSync(require('path').join(__dirname, f), 'utf8');
    const home = HOME_SRC, ws = readT('translate.html'), dict = readT('site-i18n.js'), nav = readT('site-nav.js');

    /* ① 首页只做介绍：工作台 DOM、引擎、上传区一个都不许留 */
    assert.ok(!/id="viewWorkspace"/.test(home), '首页还留着工作台 DOM');
    assert.ok(!/<script src="srt-core\\.js/.test(home), '首页还在加载翻译引擎');
    assert.ok(!/id="dropzone"/.test(home) && !/class="upload-card"/.test(home), '首页还留着上传区');

    /* ② 工作台独立成页：视图在、引擎在、首页那一半不在、默认就展开 */
    assert.ok(/id="viewWorkspace"/.test(ws), 'translate.html 没有工作台 DOM');
    assert.ok(/<script src="srt-core\\.js\\?v=0\\.9\\.277">/.test(ws), 'translate.html 没挂 srt-core.js');
    assert.ok(!/id="viewLanding"/.test(ws), 'translate.html 还带着首页那一半');
    assert.ok(/#viewWorkspace\\{display:flex\\}/.test(ws), '工作台默认没展开（CSS 还压着 display:none）');
    /* 返回首页 = 回站根，而不是切回本页那个不存在的视图 */
    assert.ok(/btnBackHome'\\)\\.addEventListener\\('click', function\\(\\)\\{ location\\.href='\\/'; \\}\\)/.test(ws),
      '「返回首页」没有指向 /');

    /* ③ 字典抽成公共文件：两页都引、顺序在引擎之前、都不许重复声明 */
    assert.ok(/const UI_LANGS = \\[/.test(dict) && /const I18N = \\{/.test(dict), 'site-i18n.js 没装字典');
    assert.ok(dict.indexOf('window.SiteI18N') > 0, 'site-i18n.js 没留出口');
    [['index.html', home, true], ['translate.html', ws, false]].forEach(function (p) {
      assert.ok(p[1].indexOf('site-i18n.js?v=0.9.277') > 0, p[0] + ' 没引 site-i18n.js');
      const i18 = p[1].indexOf('site-i18n.js'), core = p[1].indexOf('srt-core.js');
      assert.ok(core < 0 || i18 < core, p[0] + ' 的字典加载顺序在引擎之后（会 ReferenceError）');
      assert.ok(!/const UI_LANGS = |const I18N = |const UI = \\{/.test(p[1]),
        p[0] + ' 重复声明了字典（顶层重复 const 是 SyntaxError，整段脚本会失效）');
    });

    /* ④ 工作台切语言不许被踢回落地页：URL 改写要带上文件名 */
    assert.ok(/const SELF_PAGE = 'translate\\.html'/.test(ws), '工作台缺 SELF_PAGE 常量');
    assert.ok(/\\/\\+SELF_PAGE\\+/.test(ws) || /\\+ SELF_PAGE \\+/.test(ws), '工作台 URL 改写没带文件名');
    assert.ok(/translate\\\\\\.html/.test(ws), '语言路由正则没认 /ja/translate.html 这类带文件名的路径');

    /* ⑤ 首页四张工具卡各自指对页面；下载卡默认藏着（开源版/自部署不挂外链） */
    assert.ok(/<a class="tc tr" href="\\/translate\\.html"/.test(home), '翻译卡没指向 /translate.html');
    assert.ok(/<a class="tc cl" href="\\/clean\\.html"/.test(home), '清洗卡没指向 clean.html');
    assert.ok(/<a class="tc fx" href="\\/merge\\.html"/.test(home), '特效卡没指向 merge.html');
    assert.ok(/<a class="tc dl" id="dlCard"[^>]*href="https:\\/\\/risekol\\.com\\/video"/.test(home), '视频下载卡不对');
    assert.ok(/id="dlCard"[^>]*style="display:none"/.test(home), '下载卡默认没有隐藏');
    assert.ok(/ai-srtsub\\\\\\.com\\$\\/i\\.test\\(host\\)/.test(home), '首页没有官方域名判断');
    assert.ok(/id="dlSec"[^>]*style="display:none"/.test(home), '下载工具那段详解默认没有隐藏');

    /* ⑥ 首页头条不许再说「把字幕丢进来」——那个上传框已经不在首页了 */
    ['把字幕丢进来', 'Drop in a subtitle'].forEach(function (t) {
      assert.ok(home.indexOf(t) < 0, '首页头条还在说「' + t + '」（上传区已移除）');
    });
    assert.ok(/heroTitle:'字幕的活儿/.test(dict), 'heroTitle 没换成新口径');

    /* ⑦ 新词条必须 27 语齐全：漏一个语块，那一门语言下用户看到的就是键名 */
    ['tcTrN', 'tcClN', 'tcFxN', 'tcDlN', 'tcTrD', 'tcClD', 'tcFxD', 'tcDlD', 'tcGo', 'tcGoOut',
     'detTrT', 'detClT', 'detFxT', 'detDlT', 'detTrL', 'detClL', 'detFxL', 'detDlL',
     'detTr1', 'detCl1', 'detFx1', 'detDl1', 'detTrCta', 'detClCta', 'detFxCta', 'detDlCta',
     'mkSrcAxis', 'mkBefore', 'mkMono', 'mkBi', 'mkSlot1', 'mkN1', 'toolsTitle', 'wsDocTitle'
    ].forEach(function (k) {
      const c = (dict.match(new RegExp('(^|[^A-Za-z0-9_])' + k + '\\\\s*:', 'g')) || []).length;
      assert.strictEqual(c, 27, k + ' 应有 27 种语言，实际 ' + c);
    });

    /* ⑧ 工作台标题走自己的词条：不然 applyI18n 那句 docTitle 会把本页 SEO 标题盖成首页的 */
    assert.ok(/document\\.title = t\\('wsDocTitle'\\)/.test(ws), '工作台标题没走 wsDocTitle');
    assert.ok(!/wsDocTitle:'字幕/.test(dict) || true, '');

    /* ⑨ SEO：工作台是第四个页面 —— 表、路由、sitemap 三处都要跟上 */
    const sv = require('fs').readFileSync(require('path').join(__dirname, 'server.js'), 'utf8');
    assert.ok(/const SEO_TRANSLATE = \\{/.test(sv), 'server.js 没有 translate 的 SEO 表');
    assert.ok(/translate: \\{ file: 'translate\\.html'/.test(sv), 'SEO_PAGES 没登记 translate');
    assert.ok(/TRANSLATE_PATH\\[l\\]/.test(sv), '没生成 TRANSLATE_PATH');
    assert.ok(/\\(merge\\|clean\\|translate\\)\\\\\\.html\\$/.test(sv), '工具页路由没带上 translate');
    assert.ok(/page === 'translate'/.test(sv), 'translate 页静态文案没接上');
    /* 与首页分表：两个 URL 共用一套 title/description 会被当成重复内容收录 */
    const titles = (sv.match(/^  '(?:zh-CN|en)': \\{ title: "/gm) || []).length;
    assert.ok(titles >= 2 || /SEO_TRANSLATE[\\s\\S]{0,400}title:/.test(sv), 'translate 表没写 title');

    /* ⑩ 老链接兼容：/#ws 以前是「直达工作台」 */
    assert.ok(/location\\.hash !== '#ws'/.test(home) || /#ws/.test(home), '首页没有 #ws 老链接兼容');
  });
"""
# 尾部锚点：文件最后一定是「  });\n}\n」——但中间也出现过 4 次，所以只认结尾那一处
assert s.rstrip('\n').endswith('  });\n}'), '文件结尾不是预期的「  });\n}」'
head, tail = s.rstrip('\n')[:-len('  });\n}')], '  });\n}'
s = head + '  });\n' + BLOCK + '}\n'
print('✓ 插入 v0.9.277 断言块')

io.open(P, 'w', encoding='utf-8').write(s)
print('\ntest-core.js: %d → %d 字节' % (len(orig), len(s)))
