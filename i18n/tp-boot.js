/* i18n/tp-boot.js —— 工具页 100 语词典的加载器（v0.9.341 起，构建产物）
 *
 * 由 _mktp.js 生成，别手改。
 *
 * 怎么用（13 个工具页，每页两处）：
 *   1) <script src="/i18n/tp-boot.js?v=0.9.353"></script> 放在页面 *-i18n.js 之后
 *   2) initLang() 第一行 TP_ADD_LANGS(LANGS)（语言下拉补到 100）；
 *      LANG 算完后 if (!I18N[LANG]) I18N[LANG] = TP_LOAD(LANG, '<page>')。
 *
 * ⚠️ 分片必须由本文件在**自己这一段**document.write 出去，再等解析到那里执行。
 *    在 TP_LOAD 里现写现取是不行的：write 出去的 <script> 要等当前脚本跑完
 *    才会被解析器取到，同一段代码里立刻读 T[lang] 永远是空的。
 *
 * ⚠️ 路径前缀就是语言（/ms/convert.html）。27 个内置语言走页面自带词典，
 *    本文件一个请求都不发，行为与 340 完全一致。
 */
(function () {
  var T = window.__TP__ || (window.__TP__ = {});
  var META = [["ms","Bahasa Melayu"],["fil","Filipino"],["fa","فارسی"],["nb","Norsk bokmål"],["sk","Slovenčina"],["hu","Magyar"],["ca","Català"],["hr","Hrvatski"],["sr","Српски"],["bg","Български"],["ur","اردو"],["bn","বাংলা"],["ta","தமிழ்"],["te","తెలుగు"],["mr","मराठी"],["ne","नेपाली"],["si","සිංහල"],["my","မြန်မာ"],["km","ខ្មែរ"],["lo","ລາວ"],["sw","Kiswahili"],["gu","ગુજરાતી"],["kn","ಕನ್ನಡ"],["ml","മലയാളം"],["pa","ਪੰਜਾਬੀ"],["or","ଓଡ଼ିଆ"],["as","অসমীয়া"],["kk","Қазақша"],["uz","O‘zbekcha"],["mn","Монгол"],["az","Azərbaycan"],["is","Íslenska"],["et","Eesti"],["lv","Latviešu"],["lt","Lietuvių"],["sl","Slovenščina"],["sq","Shqip"],["mk","Македонски"],["eu","Euskara"],["gl","Galego"],["am","አማርኛ"],["ha","Hausa"],["yo","Yorùbá"],["zu","isiZulu"],["so","Soomaali"],["ps","پښتو"],["ku","کوردی"],["af","Afrikaans"],["yue","粵語"],["be","Беларуская"],["tg","Тоҷикӣ"],["ky","Кыргызча"],["tk","Türkmençe"],["bs","Bosanski"],["mt","Malti"],["cy","Cymraeg"],["ga","Gaeilge"],["hy","Հայերեն"],["ka","ქართული"],["ti","ትግርኛ"],["bo","བོད་སྐད"],["ug","ئۇيغۇرچە"],["sd","سنڌي"],["yi","ייִדיש"],["jv","Basa Jawa"],["su","Basa Sunda"],["ceb","Cebuano"],["mg","Malagasy"],["ig","Igbo"],["xh","isiXhosa"],["sn","chiShona"],["ny","Chichewa"],["mi","Māori"]];
  var OLD = ["zh-CN","zh-TW","en","ja","es","pt","ko","de","fr","id","hi","th","vi","ru","it","ar","tr","nl","pl","sv","cs","uk","da","fi","el","he","ro"];

  var NEWCODE = {}, OLDCODE = {};
  for (var i = 0; i < META.length; i++) NEWCODE[META[i][0]] = 1;
  for (var i2 = 0; i2 < OLD.length; i2++) OLDCODE[OLD[i2]] = 1;

  window.TP_LANGS = META;

  /* 当前路径上的语言码：/ms/convert.html → 'ms'；只有 73 种新语言才算 */
  var code = '';
  var pm = String(location.pathname || '').match(/^\/([A-Za-z]{2,3}(?:-[A-Za-z]{2,4})?)\//);
  if (pm && NEWCODE[pm[1]]) code = pm[1];
  window.TP_PAGE_LANG = code;

  /* 解析期同步取分片：27 个内置语言不发请求，缺片（还没翻）自然回落英文 */
  if (code) {
    document.write('<script src="/i18n/tp-' + code + '.js?v=0.9.353"><\/script>');
  }

  /* 把 73 种新语言补进页面自己的 LANGS（27 语数组），
     下拉框与 detectUiLang() 都直接读它。幂等，重复调用不会翻倍。 */
  window.TP_ADD_LANGS = function (arr) {
    if (!arr || !arr.length) return arr;
    for (var i = 0; i < META.length; i++) {
      var c = META[i][0], n = META[i][1], has = false;
      for (var j = 0; j < arr.length; j++) { if (arr[j][0] === c) { has = true; break; } }
      if (has) continue;
      /* fil 必须排在 fi 前面，否则 fil-PH 会被芬兰语抢匹配（27 语时代就有的坑） */
      if (c === 'fil') {
        var fi = -1;
        for (var k = 0; k < arr.length; k++) { if (arr[k][0] === 'fi') { fi = k; break; } }
        if (fi >= 0) arr.splice(fi, 0, [c, n]); else arr.push([c, n]);
      } else {
        arr.push([c, n]);
      }
    }
    return arr;
  };

  /* 取已加载的分片：返回该页面的词条对象，或 null（调用方保持英文回落） */
  window.TP_LOAD = function (lang, page) {
    if (!lang || !page) return null;
    return (T[lang] && T[lang][page]) || null;
  };

  /* 语言切换：内置 27 语照旧走页面自带词典（不发请求、不跳转）；
     新语言如果当前页没有词条，就跳到该语言的同名页面重新加载。 */
  window.TP_SWITCH = function (lang, page) {
    if (OLDCODE[lang]) return false;
    if (T[lang] && T[lang][page]) return false;
    var pre = (lang === 'zh-CN') ? '' : '/' + lang;
    location.href = pre + '/' + page + '.html';
    return true;
  };
})();
