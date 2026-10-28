/* ⚠️ 本文件是生成产物，别手改：改 site-i18n.js 后跑 build-i18n-split.py。
   字典分片在 i18n/dict.<lang>.js，首屏只取当前语言那 1~2 片。 */
/* =============================================================================
   i18n/core.js —— 界面字典的骨架（v0.9.407 起由 build-i18n-split.py 从 site-i18n.js 生成）

   为什么抽出来：
   v0.9.277 起首页拆成两块 —— / 是落地页、/translate.html 是字幕翻译工作台。
   两页都要用同一份 27 语界面字典，各留在自己的内联脚本里就会变成两份、改一处忘一处。
   所以把 UI_LANGS / I18N / UI / t() / detectUiLang() 集中到本文件，两个页面共同引用。

   ⚠️ 本文件必须在 srt-core.js 与页面内联脚本**之前**加载：
      顶层 const / function 会进全局词法环境，后面的 classic script 直接可见，
      但加载顺序反了的话，内联脚本执行时会 ReferenceError。
   ⚠️ 引用它的页面里**不许再写** const UI_LANGS / const I18N / const UI / function t ——
      重复声明是 SyntaxError，整段脚本直接失效。
   ============================================================================= */
'use strict';

const UI_LANGS = [['en','English'], ['zh-CN','简体中文'], ['zh-TW','繁體中文'], ['ja','日本語'], ['ko','한국어'], ['fr','Français'], ['de','Deutsch'], ['es','Español'], ['pt','Português'], ['it','Italiano'], ['ru','Русский'], ['ar','العربية'], ['th','ไทย'], ['vi','Tiếng Việt'], ['id','Bahasa Indonesia'], ['hi','हिन्दी'], ['tr','Türkçe'], ['pl','Polski'], ['nl','Nederlands'], ['ms','Bahasa Melayu'], ['fil','Filipino'], ['fa','فارسی'], ['sv','Svenska'], ['da','Dansk'], ['fi','Suomi'], ['nb','Norsk bokmål'], ['cs','Čeština'], ['sk','Slovenčina'], ['hu','Magyar'], ['ro','Română'], ['ca','Català'], ['hr','Hrvatski'], ['el','Ελληνικά'], ['uk','Українська'], ['sr','Српски'], ['bg','Български'], ['he','עברית'], ['ur','اردو'], ['bn','বাংলা'], ['ta','தமிழ்'], ['te','తెలుగు'], ['mr','मराठी'], ['ne','नेपाली'], ['si','සිංහල'], ['my','မြန်မာ'], ['km','ខ្មែរ'], ['lo','ລາວ'], ['sw','Kiswahili'], ['gu','ગુજરાતી'], ['kn','ಕನ್ನಡ'], ['ml','മലയാളം'], ['pa','ਪੰਜਾਬੀ'], ['or','ଓଡ଼ିଆ'], ['as','অসমীয়া'], ['kk','Қазақша'], ['uz','O‘zbekcha'], ['mn','Монгол'], ['az','Azərbaycan'], ['is','Íslenska'], ['et','Eesti'], ['lv','Latviešu'], ['lt','Lietuvių'], ['sl','Slovenščina'], ['sq','Shqip'], ['mk','Македонски'], ['eu','Euskara'], ['gl','Galego'], ['am','አማርኛ'], ['ha','Hausa'], ['yo','Yorùbá'], ['zu','isiZulu'], ['so','Soomaali'], ['ps','پښتو'], ['ku','کوردی'], ['af','Afrikaans'], ['yue','粵語'], ['be','Беларуская'], ['tg','Тоҷикӣ'], ['ky','Кыргызча'], ['tk','Türkmençe'], ['bs','Bosanski'], ['mt','Malti'], ['cy','Cymraeg'], ['ga','Gaeilge'], ['hy','Հայերեն'], ['ka','ქართული'], ['ti','ትግርኛ'], ['bo','བོད་སྐད'], ['ug','ئۇيغۇرچە'], ['sd','سنڌي'], ['yi','ייִדיש'], ['jv','Basa Jawa'], ['su','Basa Sunda'], ['ceb','Cebuano'], ['mg','Malagasy'], ['ig','Igbo'], ['xh','isiXhosa'], ['sn','chiShona'], ['ny','Chichewa'], ['mi','Māori'] ];
/* v0.9.339：内置 27 语的代码表（字典是 735 键全量）。
   不在这个表里的语言走分片，缺键回落英文 —— 见 t()。 */
const UI27 = ['zh-CN','zh-TW','en','ja','es','pt','ko','de','fr','id','hi','th','vi','ru','it','ar','tr','nl','pl','sv','cs','uk','da','fi','el','he','ro'];

/* v0.9.339：只有这 27 种语言有本地化页面（server.js 的 SEO_LANGS 与之路由一一对应）。
   新增的 73 种界面语言目前只做到「界面可切换」，页面 URL 还没有对应版本 → 一律回 /，
   否则点 logo 或切语言时地址栏写成 /ms/ 会直接 404。等 SEO 表补齐、SEO_LANGS 开到 100 后
   把这里的判断换成 SEO 名单即可。 */
function uiHref(lang) {
  return (lang && lang !== 'zh-CN' && UI27.indexOf(lang) >= 0) ? '/' + lang + '/' : '/';
}


const I18N = {};

const UI = { lang:'zh-CN', langManual:false, dstManual:false, autoTermsSet:false };

/* v0.9.339：从右向左书写的界面语言。v0.9.113 起只认 ar / he 两种，
   界面扩到 100 语后还要加上：波斯语 fa、乌尔都语 ur、普什图语 ps、库尔德语 ku、
   维吾尔语 ug、信德语 sd、意第绪语 yi —— 它们都用阿拉伯字母或希伯来字母，整页必须镜像。
   页面里一律用 RTL_UI.indexOf(UI.lang) >= 0 判断，不要再写死 'ar'||'he'。 */
const RTL_UI = ['ar', 'fa', 'he', 'ur', 'ps', 'ku', 'ug', 'sd', 'yi'];

function t(k){
  /* v0.9.339：界面语言要扩到 100 语，新语言按分片补齐，补的过程中一定有缺键。
     缺键的回落顺序很关键：
       · 中文界面 / 老 27 语（字典全量 735 键）→ 行为完全不变，仍回落 zh-CN；
       · 新增语言 → 回落 en（英文），**不能回落 zh-CN** ——
         否则马来语用户会在界面中间突然看到一行中文，比看到英文糟得多。
     判断依据是「该语言是否在 UI27 里」，不看键数（避免以后加语言时漏判）。
     ⚠️ 分片本身没取到（404 / 断网）时也要落英文：原来写成 I18N[UI.lang] || I18N['zh-CN']
        会让整页变成中文——那是最糟的一种降级。 */
  const isNew = UI27.indexOf(UI.lang) < 0;
  /* v0.9.407：字典按语言分片加载，某片没到（切语言的一瞬间 / 断网）时不能抛错，
     一律降级到已加载的 en → zh-CN → 键名。 */
  const d = I18N[UI.lang] || I18N['en'] || I18N['zh-CN'] || {};
  const en = I18N['en'] || {};
  const zh = I18N['zh-CN'] || {};
  let s = (k in d) ? d[k]
    : (isNew && en[k] !== undefined ? en[k]
    : (zh[k] !== undefined ? zh[k] : k));
  for (let i=1; i<arguments.length; i++) s = s.split('{'+(i-1)+'}').join(String(arguments[i]));
  return s;
}

function detectUiLang(){
  const prefs = (navigator.languages && navigator.languages.length) ? navigator.languages : [navigator.language || 'zh-CN'];
  for (const p of prefs){
    const l = String(p).toLowerCase();
    if (l==='zh-cn'||l==='zh-hans'||l==='zh-sg'||l==='zh'||l.startsWith('zh-hans')) return 'zh-CN';
    if (l==='zh-tw'||l==='zh-hk'||l==='zh-mo'||l==='zh-hant'||l.startsWith('zh-hant')) return 'zh-TW';
    if (l.startsWith('en')) return 'en';
    if (l.startsWith('ja')) return 'ja';
    if (l.startsWith('es')) return 'es';
    if (l.startsWith('pt')) return 'pt';
    if (l.startsWith('ko')) return 'ko';
    if (l.startsWith('de')) return 'de';
    if (l.startsWith('fr')) return 'fr';
    if (l.startsWith('id')) return 'id';
    if (l.startsWith('hi')) return 'hi';
    if (l.startsWith('th')) return 'th';
    if (l.startsWith('vi')) return 'vi';
    if (l.startsWith('ru')) return 'ru';
    if (l.startsWith('it')) return 'it';
    if (l.startsWith('ar')) return 'ar';
    if (l.startsWith('tr')) return 'tr';
    if (l.startsWith('nl')) return 'nl';
    if (l.startsWith('pl')) return 'pl';
    if (l.startsWith('sv')) return 'sv';
    if (l.startsWith('cs')) return 'cs';
    if (l.startsWith('uk')) return 'uk';
    if (l.startsWith('da')) return 'da';
    /* v0.9.339：菲律宾语 fil / fil-PH 必须排在芬兰语 fi 之前 —— 否则 fil 永远被认成芬兰语
       （27 语时代就有这个问题，只是 fil 当时不在界面语言里，没人碰到）。 */
    if (l === 'fil' || l.indexOf('fil-') === 0) return 'fil';
    if (l.startsWith('fi')) return 'fi';
    if (l.startsWith('el')) return 'el';
    if (l.startsWith('he')) return 'he';
    if (l.startsWith('he')||l==='iw') return 'he';
    if (l.startsWith('ro')) return 'ro';
    /* v0.9.339：73 种新增界面语言（v0.9.338 起翻译目标语言共 100 种）。
       一律按「语言代码 或 代码-地区」精确前缀匹配，不做 startsWith('ms') 这种宽松判断——
       否则 'ms' 会吃掉 'ms-MY'（正确）也会误伤不存在的 'msa'（不存在的代码本就该落到英文）。
       顺序无关：这些代码与上面 27 个互不为前缀。
       ⚠️ 清单必须内联在函数体内：单测会把 detectUiLang 整段抠出来单独执行，
          依赖外部常量会直接 ReferenceError（v0.9.339 踩过）。 */
    var NEW_UI_CODES = ['ms','fil','fa','nb','sk','hu','ca','hr','sr','bg','ur','bn','ta','te','mr','ne','si','my','km','lo','sw','gu','kn','ml','pa','or','as','kk','uz','mn','az','is','et','lv','lt','sl','sq','mk','eu','gl','am','ha','yo','zu','so','ps','ku','af','yue','be','tg','ky','tk','bs','mt','cy','ga','hy','ka','ti','bo','ug','sd','yi','jv','su','ceb','mg','ig','xh','sn','ny','mi'];
    for (var _i = 0; _i < NEW_UI_CODES.length; _i++) {
      var _c = NEW_UI_CODES[_i];
      if (l === _c || l.indexOf(_c + '-') === 0) return _c;
    }
  }
  /* v0.9.136：浏览器语言不属于上述任何一种时，兜底改为英文（原先是简体中文）。
     面向的是挪威语、匈牙利语、马来语等尚未支持界面本地化的访客——英文比中文更通用。
     注意：这里只改“没匹配上”的兜底；明确写着 zh-CN / zh 的浏览器依旧是简体中文，不受影响。 */
  return 'en';
}

/* 给需要在别的作用域里取用的脚本留个出口（页面内联脚本一般直接用全局 UI / t 即可） */
window.SiteI18N = { UI_LANGS: UI_LANGS, I18N: I18N, UI: UI, t: t, detectUiLang: detectUiLang, uiHref: uiHref };

/* ============================================================================
   v0.9.407：界面字典按语言分片加载（I18NBoot）—— 覆盖全部 100 种界面语言

   两种分片，加载规则不同：
     · 核心 27 语（UI27）→ /i18n/dict.<lang>.js      全量字典，每片 48~98KB
     · 另外 73 语        → /i18n/ui-<lang>.js        只有「与英文不同」的键，几 KB~20KB
   前者回落 zh-CN，后者回落 en —— 与 t() 的既有口径一致。

   为什么拆：整本 27 语字典 1.73MB（gz ≈ 640KB）曾占首屏 67% 的字节，一次却只用一种语言。

   页面用法（在 UI.lang 定下来之后、第一次 applyI18n 之前）：
     I18NBoot.sync(UI.lang);            // 解析期同步取片
   切语言、以及老的 SiteI18N.loadShard(lang, cb) 都走 ensure()（异步补片后回调）。
   ========================================================================== */
(function(){
  var CORE_BASE  = '/i18n/dict.';
  var SHARD_BASE = '/i18n/ui-';
  var VER        = '0.9.406';    /* 核心分片：与 server.js 的 ASSET_VER 一致 */
  var SHARD_VER  = '0.9.341';    /* 73 语分片：沿用既有版号，别动（改了要重生成 73 个文件） */

  function isCore(l){ return UI27.indexOf(l) >= 0; }
  function urlOf(l){
    return isCore(l) ? CORE_BASE + l + '.js?v=' + VER
                     : SHARD_BASE + l + '.js?v=' + SHARD_VER;
  }
  /* 一个语言要哪几片：核心语 → zh-CN 兜底；新语 → en 兜底（分片只带差异键） */
  function need(lang){
    var base = isCore(lang) ? 'zh-CN' : 'en';
    var out = [base];
    if (lang && lang !== base) out.push(lang);
    return out;
  }
  function has(l){ return !!I18N[l]; }

  var pending = {}, waiting = [], reapplied = false;

  var API = {
    isCore: isCore,
    /* 解析期同步取片：只能在页面还在解析时调用（内联脚本里），load 之后调用无效 */
    sync: function(lang){
      need(lang).forEach(function(l){
        if (has(l)) return;
        document.write('<scr' + 'ipt src="' + urlOf(l) + '"><\/scr' + 'ipt>');
      });
      /* 兜底重放：页面在 sync 之后紧接着就会 applyI18n 一次，而 document.write 注入的片
         在个别情况下要等一拍才执行完（也可能页面已过解析期、write 无效）。这里在 DCL
         再重放一次 —— applyI18n 是幂等的，重复调只会把同样的文案再写一遍，代价可忽略。 */
      if (!reapplied){
        reapplied = true;
        document.addEventListener('DOMContentLoaded', function(){
          if (!has(lang)) return;
          if (typeof applyI18n === 'function') applyI18n();
        }, {passive:true});
      }
    },
    /* 运行期异步补片；同一片只发一次请求，多个回调挂同一批 */
    ensure: function(lang, cb){
      var want = need(lang).filter(function(l){ return !has(l) && !pending[l]; });
      if (cb && want.length) waiting.push(cb);
      else if (cb && !want.length && !waiting.length) { try{ cb(); }catch(e){} }
      var left = want.length;
      if (!left) return;
      want.forEach(function(l){
        pending[l] = true;
        var s = document.createElement('script');
        s.src = urlOf(l);
        s.onload = s.onerror = function(){
          pending[l] = false;
          if (--left === 0){
            var q = waiting; waiting = [];
            q.forEach(function(f){ try{ f(); }catch(e){} });
          }
        };
        document.head.appendChild(s);
      });
    }
  };
  window.I18NBoot = API;

  /* 切界面语言：页面自己的 handler 会先 applyI18n 一次（可能还是回落语言），
     补片到齐后再重放一遍，用户看到的就是正确语言。 */
  function onSwitch(e){
    var el = e.target;
    if (!el || (el.id !== 'uiLang' && el.id !== 'uiLang2')) return;
    var lang = el.value;
    if (!lang || has(lang)) return;
    API.ensure(lang, function(){
      if (typeof applyI18n === 'function') applyI18n();
      if (typeof applyTipI18n === 'function') applyTipI18n();
      if (typeof repaintStats === 'function') repaintStats();
    });
  }
  document.addEventListener('change', onSwitch, true);
  document.addEventListener('change', onSwitch, false);

  /* 兼容老接口：三个页面在切语言时仍调 SiteI18N.loadShard(UI.lang, cb)。
     以前由 i18n/ui-boot.js 提供；v0.9.407 起统一到 I18NBoot，页面不必改。 */
  if (window.SiteI18N) window.SiteI18N.loadShard = function(lang, cb){ API.ensure(lang, cb); };
})();
