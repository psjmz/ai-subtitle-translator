/* ytfix-core.js — YouTube 字幕优化引擎（v0.9.352 新增）
 *
 * 解决的问题
 * ----------
 * YouTube 自动字幕按「固定时长窗口」切条：一条 cue 约 3~4 秒，不看句子在哪结束。
 * 于是绝大多数 cue 从句子中间开始，「上一句的尾巴」被挂到「下一条的开头」，
 * 读起来像被硬生生剪断。识别本身没错，错的是分条位置。
 *
 * 做法（不改一个字，只搬边界）
 * --------------------------
 *   1. 把所有 cue 文本摊平成一条词流，cue 的 start/end 作为「锚点」；
 *   2. 锚点之间按字符/发音权重插值，得到每个词的毫秒时间（锚点处零误差）；
 *   3. 按语言的句末标点做句子切分（防 Mr. / 1.77 / U.S. 误判）；
 *   4. 动态规划重定界：句界代价 0，逗号 0.45，连词开头 1.4，句中硬切 2.4，
 *      弱词甩在末尾 4.0；硬约束 ≤2 行 / ≤行宽 / ≤最长时长 / ≥最短时长 / ≤CPS；
 *   5. 时间收尾：条间留 gap、句末轻微延长、不足最短时长往后补、强制单调不重叠。
 *
 * 100 种语言
 * ----------
 * 断句规则不逐语言写 100 份，而是按**文字系统**分组（LATIN / CYRILLIC / CJK /
 * ARABIC / DEVANAGARI / THAI …），每组定义：句末标点集、次级停顿集、是否以空格
 * 分词、是否有大小写、是否 RTL。100 个语言代码各自映射到一组规则。
 *
 * 诚实边界：词级「弱尾词/连词」表只有英文（以及少数大语种）是完整的；其余语言
 * 主要依靠「标点 + 原锚点吸附 + 长度均衡」这三条通用信号，效果仍显著好于原始
 * 固定窗口硬切，但不如英文精细。这一点在页面上也对用户写明。
 *
 * ⚠️ 与 srt-core.js / clean-core.js / merge-core.js 硬隔离：本文件是独立引擎，
 *    不引用它们，改这里不会影响任何现有工具。
 * 浏览器 <script src> 与 Node (require) 通用。
 */
(function (root, factory) {
  if (typeof module !== 'undefined' && module.exports) module.exports = factory();
  else root.YtfixCore = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  /* ==========================================================================
     一、语言规则表（按文字系统分组）
     ========================================================================== */

  /* 每组字段：
       sent  句末标点（一个字符串，逐字符判断即集合）
       comma 次级停顿标点
       trail 允许跟在句末标点之后的收尾符号（引号/括号）
       space 是否以空格分词（false = 逐字符切分，中日韩泰老高棉缅藏）
       upper 是否有大小写（决定「句号后接小写 ⇒ 不是句末」这条规则是否适用）
       cjk   是否按 CJK 行宽（更窄的行宽上限）
       wrapBy 折行单位：'word' 按空格 | 'char' 按字符
       weak  弱尾词（断在它后面很难看）—— 只有部分语言提供，其余为空
       conj  连词（新的一条以它开头是自然的）—— 同上
   */
  var SCRIPT = {
    LATIN: {
      sent: '.!?\u2026', comma: ',;:', trail: '"\'\u201d\u2019)]}\u300b\u300d\u300f',
      space: true, upper: true, cjk: false, wrapBy: 'word',
      weak: ['the', 'a', 'an', 'of', 'to', 'in', 'on', 'at', 'for', 'with', 'from',
        'by', 'into', 'about', 'as', 'than', 'and', 'or', 'but', 'that', 'this',
        'these', 'those', 'is', 'was', 'are', 'were', 'be', 'been', 'will',
        'would', 'can', 'could', 'should', 'has', 'have', 'had', 'do', 'does',
        'did', 'it', 'its', 'i', 'we', 'you', 'he', 'she', 'they', 'my', 'our',
        'very', 'really', 'quite', 'just', 'only', 'more', 'most', 'much',
        'such', 'no', 'not', 'also', 'both', 'all', 'some', 'any', 'every'],
      conj: ['and', 'but', 'so', 'because', 'which', 'that', 'when', 'while', 'if',
        'or', 'then', 'though', 'although', 'since', 'as', 'where', 'who', 'whom',
        'whose', 'yet', 'plus', 'also']
    },
    /* 日耳曼/罗曼以外的拉丁字母语言（德法西葡意荷等）共用 LATIN 的标点，
       但词表不同。下面按语言补语种专用词表，未列出的回退 LATIN 的英文表
       （英文词表对这些语言基本无效，但有总比没有强 —— 见文件头「诚实边界」）。 */
    CYRILLIC: {
      sent: '.!?\u2026', comma: ',;:', trail: '"\'\u201d\u2019)]}\u00bb',
      space: true, upper: true, cjk: false, wrapBy: 'word',
      weak: [], conj: []
    },
    GREEK: {
      sent: '.!?\u2026;', comma: ',:', trail: '"\'\u201d\u2019)]}\u00bb',
      space: true, upper: true, cjk: false, wrapBy: 'word',
      weak: [], conj: []
    },
    CJK: {
      sent: '\u3002\uff01\uff1f\u2026\uFF0E.!?', comma: '\uFF0C\u3001\uFF1B\uFF1A,;:',
      trail: '"\'\u201d\u2019\u300d\u300f\u300b\uff09)]}',
      space: false, upper: false, cjk: true, wrapBy: 'char',
      weak: [], conj: []
    },
    /* 韩语：句读与中文同（。？！在韩文里少用，主用 .!?），但**有空格分写**，
       所以 space:true、wrapBy:'char'（断行仍按字符更稳，避免长词溢行）。 */
    KOREAN: {
      sent: '.!?\u2026\u3002\uff01\uff1f', comma: ',;:\uff0c\u3001',
      trail: '"\'\u201d\u2019)]}\u300d',
      space: true, upper: false, cjk: true, wrapBy: 'char',
      weak: [], conj: []
    },
    ARABIC: {
      sent: '.!?\u061F\u06D4\u2026', comma: '\u060C\u061B,;:',
      trail: '"\'\u201d\u2019)]}\u00bb',
      space: true, upper: false, cjk: false, wrapBy: 'word',
      weak: [], conj: []
    },
    HEBREW: {
      sent: '.!?\u2026', comma: ',;:', trail: '"\'\u201d\u2019)]}',
      space: true, upper: false, cjk: false, wrapBy: 'word',
      weak: [], conj: []
    },
    DEVANAGARI: {
      sent: '.!?\u0964\u0965\u2026', comma: ',;:', trail: '"\'\u201d\u2019)]}',
      space: true, upper: false, cjk: false, wrapBy: 'word',
      weak: [], conj: []
    },
    BENGALI: {
      sent: '.!?\u0964\u0965\u2026', comma: ',;:', trail: '"\'\u201d\u2019)]}',
      space: true, upper: false, cjk: false, wrapBy: 'word',
      weak: [], conj: []
    },
    /* 南亚其余文字（泰米尔/泰卢固/卡纳达/马拉雅拉姆/古吉拉特/旁遮普/僧伽罗/奥里亚）
       同样用 danda 断句 */
    INDIC: {
      sent: '.!?\u0964\u0965\u2026', comma: ',;:', trail: '"\'\u201d\u2019)]}',
      space: true, upper: false, cjk: false, wrapBy: 'word',
      weak: [], conj: []
    },
    THAI: {
      sent: '.!?\u2026', comma: ',;:', trail: '"\'\u201d\u2019)]}',
      space: false, upper: false, cjk: false, wrapBy: 'char',
      weak: [], conj: []
    },
    LAO: {
      sent: '.!?\u2026', comma: ',;:', trail: '"\'\u201d\u2019)]}',
      space: false, upper: false, cjk: false, wrapBy: 'char',
      weak: [], conj: []
    },
    KHMER: {
      sent: '.!?\u2026\u17D4\u17D5', comma: ',;:', trail: '"\'\u201d\u2019)]}',
      space: false, upper: false, cjk: false, wrapBy: 'char',
      weak: [], conj: []
    },
    MYANMAR: {
      sent: '.!?\u2026\u104A\u104B', comma: ',;:', trail: '"\'\u201d\u2019)]}',
      space: false, upper: false, cjk: false, wrapBy: 'char',
      weak: [], conj: []
    },
    TIBETAN: {
      sent: '.!?\u2026\u0F0D', comma: '\u0F0C,;:', trail: '"\'\u201d\u2019)]}',
      space: false, upper: false, cjk: false, wrapBy: 'char',
      weak: [], conj: []
    },
    ARMENIAN: {
      sent: '.!?\u2026\u0589\u055E', comma: ',;:', trail: '"\'\u201d\u2019)]}',
      space: true, upper: true, cjk: false, wrapBy: 'word',
      weak: [], conj: []
    },
    GEORGIAN: {
      sent: '.!?\u2026', comma: ',;:', trail: '"\'\u201d\u2019)]}',
      space: true, upper: false, cjk: false, wrapBy: 'word',
      weak: [], conj: []
    },
    ETHIOPIC: {
      sent: '.!?\u2026\u1362', comma: ',;:', trail: '"\'\u201d\u2019)]}',
      space: true, upper: false, cjk: false, wrapBy: 'word',
      weak: [], conj: []
    }
  };

  /* 语种专用弱尾词/连词补充（只补差异，其余继承所在文字系统的表）。
     目前只覆盖用户素材最常遇到的几种；未列出的语言用文字系统的默认表。 */
  var LANG_WORDS = {
    de: {
      weak: ['der', 'die', 'das', 'den', 'dem', 'des', 'ein', 'eine', 'einen', 'einem',
        'einer', 'eines', 'und', 'oder', 'aber', 'dass', 'wenn', 'weil', 'von', 'zu',
        'mit', 'für', 'auf', 'bei', 'aus', 'nach', 'über', 'unter', 'ist', 'sind',
        'war', 'waren', 'wird', 'werden', 'hat', 'haben', 'ich', 'wir', 'sie', 'es',
        'sich', 'nicht', 'auch', 'noch', 'nur', 'sehr'],
      conj: ['und', 'aber', 'oder', 'denn', 'weil', 'dass', 'wenn', 'als', 'obwohl',
        'während', 'sondern', 'doch', 'also']
    },
    fr: {
      weak: ['le', 'la', 'les', 'un', 'une', 'des', 'du', 'de', 'et', 'ou', 'mais',
        'que', 'qui', 'à', 'au', 'aux', 'en', 'dans', 'sur', 'pour', 'par', 'avec',
        'sans', 'est', 'sont', 'était', 'sera', 'a', 'ont', 'il', 'elle', 'ils',
        'elles', 'nous', 'vous', 'je', 'ce', 'cette', 'ces', 'se', 'ne', 'pas',
        'plus', 'très', 'aussi', 'comme'],
      conj: ['et', 'mais', 'ou', 'donc', 'or', 'ni', 'car', 'que', 'parce', 'quand',
        'comme', 'si', 'lorsque', 'puisque']
    },
    es: {
      weak: ['el', 'la', 'los', 'las', 'un', 'una', 'unos', 'unas', 'de', 'del', 'y',
        'o', 'pero', 'que', 'quien', 'a', 'al', 'en', 'sobre', 'para', 'por', 'con',
        'sin', 'es', 'son', 'era', 'será', 'ha', 'han', 'él', 'ella', 'ellos',
        'nosotros', 'yo', 'este', 'esta', 'estos', 'se', 'no', 'más', 'muy',
        'también', 'como'],
      conj: ['y', 'e', 'pero', 'o', 'u', 'porque', 'que', 'cuando', 'como', 'si',
        'aunque', 'mientras', 'pues', 'entonces']
    },
    pt: {
      weak: ['o', 'a', 'os', 'as', 'um', 'uma', 'uns', 'umas', 'de', 'do', 'da', 'e',
        'ou', 'mas', 'que', 'quem', 'em', 'no', 'na', 'sobre', 'para', 'por', 'com',
        'sem', 'é', 'são', 'era', 'será', 'tem', 'têm', 'ele', 'ela', 'eles',
        'nós', 'eu', 'este', 'esta', 'se', 'não', 'mais', 'muito', 'também',
        'como'],
      conj: ['e', 'mas', 'ou', 'porque', 'que', 'quando', 'como', 'se', 'embora',
        'enquanto', 'pois', 'então']
    },
    it: {
      weak: ['il', 'lo', 'la', 'i', 'gli', 'le', 'un', 'uno', 'una', 'di', 'del',
        'della', 'e', 'o', 'ma', 'che', 'chi', 'a', 'al', 'in', 'nel', 'su', 'per',
        'con', 'senza', 'è', 'sono', 'era', 'sarà', 'ha', 'hanno', 'lui', 'lei',
        'loro', 'noi', 'io', 'questo', 'questa', 'si', 'non', 'più', 'molto',
        'anche', 'come'],
      conj: ['e', 'ma', 'o', 'perché', 'che', 'quando', 'come', 'se', 'anche se',
        'mentre', 'quindi', 'allora']
    },
    nl: {
      weak: ['de', 'het', 'een', 'van', 'en', 'of', 'maar', 'dat', 'die', 'in', 'op',
        'aan', 'voor', 'met', 'zonder', 'is', 'zijn', 'was', 'waren', 'wordt',
        'heeft', 'hebben', 'hij', 'zij', 'ze', 'wij', 'ik', 'dit', 'deze', 'zich',
        'niet', 'meer', 'zeer', 'ook', 'als'],
      conj: ['en', 'maar', 'of', 'want', 'omdat', 'dat', 'toen', 'als', 'hoewel',
        'terwijl', 'dus']
    },
    ru: {
      weak: ['и', 'в', 'во', 'не', 'что', 'он', 'на', 'я', 'с', 'со', 'как', 'а',
        'то', 'все', 'она', 'так', 'его', 'но', 'да', 'ты', 'к', 'у', 'же', 'вы',
        'за', 'бы', 'по', 'только', 'ее', 'мне', 'было', 'вот', 'от', 'меня',
        'еще', 'нет', 'о', 'из', 'ему', 'теперь', 'когда', 'даже', 'ну', 'вдруг',
        'ли', 'если', 'уже', 'или', 'ни', 'быть', 'был', 'него', 'до', 'вас'],
      conj: ['и', 'но', 'или', 'а', 'что', 'чтобы', 'потому', 'когда', 'если',
        'хотя', 'пока', 'поэтому']
    },
    ja: { weak: [], conj: [] },
    ko: { weak: [], conj: [] },
    zh: { weak: [], conj: [] }
  };

  /* 100 个语言代码 → 文字系统。顺序与 langs100.js 一致，便于对照。 */
  var LANG_SCRIPT = {
    en: 'LATIN', 'zh-CN': 'CJK', 'zh-TW': 'CJK', ja: 'CJK', ko: 'KOREAN',
    fr: 'LATIN', de: 'LATIN', es: 'LATIN', pt: 'LATIN', it: 'LATIN',
    ru: 'CYRILLIC', ar: 'ARABIC', th: 'THAI', vi: 'LATIN', id: 'LATIN',
    hi: 'DEVANAGARI', tr: 'LATIN', pl: 'LATIN', nl: 'LATIN', ms: 'LATIN',
    fil: 'LATIN', fa: 'ARABIC', sv: 'LATIN', da: 'LATIN', fi: 'LATIN',
    nb: 'LATIN', cs: 'LATIN', sk: 'LATIN', hu: 'LATIN', ro: 'LATIN',
    ca: 'LATIN', hr: 'LATIN', el: 'GREEK', uk: 'CYRILLIC', sr: 'CYRILLIC',
    bg: 'CYRILLIC', he: 'HEBREW', ur: 'ARABIC', bn: 'BENGALI', ta: 'INDIC',
    te: 'INDIC', mr: 'DEVANAGARI', ne: 'DEVANAGARI', si: 'INDIC', my: 'MYANMAR',
    km: 'KHMER', lo: 'LAO', sw: 'LATIN', gu: 'INDIC', kn: 'INDIC', ml: 'INDIC',
    pa: 'INDIC', or: 'INDIC', as: 'BENGALI', kk: 'CYRILLIC', uz: 'LATIN',
    mn: 'CYRILLIC', az: 'LATIN', is: 'LATIN', et: 'LATIN', lv: 'LATIN',
    lt: 'LATIN', sl: 'LATIN', sq: 'LATIN', mk: 'CYRILLIC', eu: 'LATIN',
    gl: 'LATIN', am: 'ETHIOPIC', ha: 'LATIN', yo: 'LATIN', zu: 'LATIN',
    so: 'LATIN', ps: 'ARABIC', ku: 'ARABIC', af: 'LATIN', yue: 'CJK',
    be: 'CYRILLIC', tg: 'CYRILLIC', ky: 'CYRILLIC', tk: 'LATIN', bs: 'LATIN',
    mt: 'LATIN', cy: 'LATIN', ga: 'LATIN', hy: 'ARMENIAN', ka: 'GEORGIAN',
    ti: 'ETHIOPIC', bo: 'TIBETAN', ug: 'ARABIC', sd: 'ARABIC', yi: 'HEBREW',
    jv: 'LATIN', su: 'LATIN', ceb: 'LATIN', mg: 'LATIN', ig: 'LATIN',
    xh: 'LATIN', sn: 'LATIN', ny: 'LATIN', mi: 'LATIN'
  };

  var LANG_EN = {
    en: 'English', 'zh-CN': 'Simplified Chinese', 'zh-TW': 'Traditional Chinese',
    ja: 'Japanese', ko: 'Korean', fr: 'French', de: 'German', es: 'Spanish',
    pt: 'Portuguese', it: 'Italian', ru: 'Russian', ar: 'Arabic', th: 'Thai',
    vi: 'Vietnamese', id: 'Indonesian', hi: 'Hindi', tr: 'Turkish', pl: 'Polish',
    nl: 'Dutch', ms: 'Malay', fil: 'Filipino', fa: 'Persian', sv: 'Swedish',
    da: 'Danish', fi: 'Finnish', nb: 'Norwegian', cs: 'Czech', sk: 'Slovak',
    hu: 'Hungarian', ro: 'Romanian', ca: 'Catalan', hr: 'Croatian', el: 'Greek',
    uk: 'Ukrainian', sr: 'Serbian', bg: 'Bulgarian', he: 'Hebrew', ur: 'Urdu',
    bn: 'Bengali', ta: 'Tamil', te: 'Telugu', mr: 'Marathi', ne: 'Nepali',
    si: 'Sinhala', my: 'Burmese', km: 'Khmer', lo: 'Lao', sw: 'Swahili',
    gu: 'Gujarati', kn: 'Kannada', ml: 'Malayalam', pa: 'Punjabi', or: 'Odia',
    as: 'Assamese', kk: 'Kazakh', uz: 'Uzbek', mn: 'Mongolian', az: 'Azerbaijani',
    is: 'Icelandic', et: 'Estonian', lv: 'Latvian', lt: 'Lithuanian',
    sl: 'Slovenian', sq: 'Albanian', mk: 'Macedonian', eu: 'Basque',
    gl: 'Galician', am: 'Amharic', ha: 'Hausa', yo: 'Yoruba', zu: 'Zulu',
    so: 'Somali', ps: 'Pashto', ku: 'Kurdish', af: 'Afrikaans', yue: 'Cantonese',
    be: 'Belarusian', tg: 'Tajik', ky: 'Kyrgyz', tk: 'Turkmen', bs: 'Bosnian',
    mt: 'Maltese', cy: 'Welsh', ga: 'Irish', hy: 'Armenian', ka: 'Georgian',
    ti: 'Tigrinya', bo: 'Tibetan', ug: 'Uyghur', sd: 'Sindhi', yi: 'Yiddish',
    jv: 'Javanese', su: 'Sundanese', ceb: 'Cebuano', mg: 'Malagasy', ig: 'Igbo',
    xh: 'Xhosa', sn: 'Shona', ny: 'Chichewa', mi: 'Maori'
  };

  /* 语言自称（下拉里显示，用本语言写） */
  var LANG_SELF = {
    'zh-CN': '简体中文', 'zh-TW': '繁體中文', ja: '日本語', ko: '한국어',
    fr: 'Français', de: 'Deutsch', es: 'Español', pt: 'Português', it: 'Italiano',
    ru: 'Русский', ar: 'العربية', th: 'ไทย', vi: 'Tiếng Việt',
    id: 'Bahasa Indonesia', hi: 'हिन्दी', tr: 'Türkçe', pl: 'Polski',
    nl: 'Nederlands', ms: 'Bahasa Melayu', fil: 'Filipino', fa: 'فارسی',
    sv: 'Svenska', da: 'Dansk', fi: 'Suomi', nb: 'Norsk bokmål', cs: 'Čeština',
    sk: 'Slovenčina', hu: 'Magyar', ro: 'Română', ca: 'Català', hr: 'Hrvatski',
    el: 'Ελληνικά', uk: 'Українська', sr: 'Српски', bg: 'Български',
    he: 'עברית', ur: 'اردو', bn: 'বাংলা', ta: 'தமிழ்', te: 'తెలుగు',
    mr: 'मराठी', ne: 'नेपाली', si: 'සිංහල', my: 'မြန်မာ', km: 'ខ្មែរ',
    lo: 'ລາວ', sw: 'Kiswahili', gu: 'ગુજરાતી', kn: 'ಕನ್ನಡ', ml: 'മലയാളം',
    pa: 'ਪੰਜਾਬੀ', or: 'ଓଡ଼ିଆ', as: 'অসমীয়া', kk: 'Қазақ', uz: 'Oʻzbek',
    mn: 'Монгол', az: 'Azərbaycan', is: 'Íslenska', et: 'Eesti',
    lv: 'Latviešu', lt: 'Lietuvių', sl: 'Slovenščina', sq: 'Shqip',
    mk: 'Македонски', eu: 'Euskara', gl: 'Galego', am: 'አማርኛ', ha: 'Hausa',
    yo: 'Yorùbá', zu: 'isiZulu', so: 'Soomaali', ps: 'پښتو', ku: 'Kurdî',
    af: 'Afrikaans', yue: '粵語', be: 'Беларуская', tg: 'Тоҷикӣ', ky: 'Кыргызча',
    tk: 'Türkmen', bs: 'Bosanski', mt: 'Malti', cy: 'Cymraeg', ga: 'Gaeilge',
    hy: 'Հայերեն', ka: 'ქართული', ti: 'ትግርኛ', bo: 'བོད་སྐད', ug: 'ئۇيغۇرچە',
    sd: 'سنڌي', yi: 'ייִדיש', jv: 'Basa Jawa', su: 'Basa Sunda',
    ceb: 'Cebuano', mg: 'Malagasy', ig: 'Igbo', xh: 'isiXhosa', sn: 'chiShona',
    ny: 'Chichewa', mi: 'Te Reo Māori'
  };

  var RTL_LANGS = ['ar', 'fa', 'he', 'ur', 'ps', 'ku', 'ug', 'sd', 'yi'];

  /* 语言代码 → 有序列表（下拉用） */
  var LANG_ORDER = ['en', 'zh-CN', 'zh-TW', 'ja', 'ko', 'fr', 'de', 'es', 'pt', 'it',
    'ru', 'ar', 'th', 'vi', 'id', 'hi', 'tr', 'pl', 'nl', 'ms', 'fil', 'fa', 'sv',
    'da', 'fi', 'nb', 'cs', 'sk', 'hu', 'ro', 'ca', 'hr', 'el', 'uk', 'sr', 'bg',
    'he', 'ur', 'bn', 'ta', 'te', 'mr', 'ne', 'si', 'my', 'km', 'lo', 'sw', 'gu',
    'kn', 'ml', 'pa', 'or', 'as', 'kk', 'uz', 'mn', 'az', 'is', 'et', 'lv', 'lt',
    'sl', 'sq', 'mk', 'eu', 'gl', 'am', 'ha', 'yo', 'zu', 'so', 'ps', 'ku', 'af',
    'yue', 'be', 'tg', 'ky', 'tk', 'bs', 'mt', 'cy', 'ga', 'hy', 'ka', 'ti', 'bo',
    'ug', 'sd', 'yi', 'jv', 'su', 'ceb', 'mg', 'ig', 'xh', 'sn', 'ny', 'mi'];

  /* 取某语言的规则；未知语言回退到「拉丁 + 无词表」的通用形态 */
  function ruleFor(code) {
    var c = String(code || '').trim();
    if (c === 'auto' || !c) c = 'en';
    var script = LANG_SCRIPT[c] || 'LATIN';
    var base = SCRIPT[script] || SCRIPT.LATIN;
    var over = LANG_WORDS[c] || LANG_WORDS[String(c).split('-')[0]] || null;
    if (!over) return base;
    var r = {};
    for (var k in base) if (Object.prototype.hasOwnProperty.call(base, k)) r[k] = base[k];
    if (over.weak) r.weak = over.weak;
    if (over.conj) r.conj = over.conj;
    return r;
  }

  function langLabel(code) {
    return LANG_SELF[code] || LANG_EN[code] || code;
  }

  /* 界面下拉用的完整清单：[{v, name, self, script, rtl}] */
  function listLangs() {
    return LANG_ORDER.map(function (c) {
      return {
        v: c,
        name: LANG_EN[c] || c,
        self: LANG_SELF[c] || LANG_EN[c] || c,
        script: LANG_SCRIPT[c] || 'LATIN',
        rtl: RTL_LANGS.indexOf(c) >= 0
      };
    });
  }

  /* ---------- 语言自动检测：按 Unicode 文字系统字符占比投票 ---------- */
  var DETECT = [
    [/[\u3040-\u30ff]/, 'ja', 1.0],      /* 假名 → 日文（最强信号） */
    [/[\uac00-\ud7af\u1100-\u11ff]/, 'ko', 1.0],
    [/[\u0e00-\u0e7f]/, 'th', 1.0],
    [/[\u0e80-\u0eff]/, 'lo', 1.0],
    [/[\u1780-\u17ff]/, 'km', 1.0],
    [/[\u1000-\u109f]/, 'my', 1.0],
    [/[\u0f00-\u0fff]/, 'bo', 1.0],
    [/[\u0900-\u097f]/, 'hi', 1.0],
    [/[\u0980-\u09ff]/, 'bn', 1.0],
    [/[\u0b80-\u0bff]/, 'ta', 1.0],
    [/[\u0c00-\u0c7f]/, 'te', 1.0],
    [/[\u0c80-\u0cff]/, 'kn', 1.0],
    [/[\u0d00-\u0d7f]/, 'ml', 1.0],
    [/[\u0a80-\u0aff]/, 'gu', 1.0],
    [/[\u0a00-\u0a7f]/, 'pa', 1.0],
    [/[\u0d80-\u0dff]/, 'si', 1.0],
    [/[\u0530-\u058f]/, 'hy', 1.0],
    [/[\u10a0-\u10ff]/, 'ka', 1.0],
    [/[\u1200-\u137f]/, 'am', 1.0],
    [/[\u0590-\u05ff]/, 'he', 1.0],
    [/[\u0600-\u06ff\u0750-\u077f]/, 'ar', 1.0],
    [/[\u0400-\u04ff]/, 'ru', 1.0],
    [/[\u0370-\u03ff]/, 'el', 1.0],
    [/[\u4e00-\u9fff\u3400-\u4dbf]/, 'zh-CN', 1.0]
  ];

  /* 「专属字符」表：命中即定语言，优先级高于停用词投票。
     只收**在该语言里高频、在别的语言里基本不出现**的字符，否则会互相误伤
     （踩过的坑：捷克语 á 撞了西班牙语的 á，把 cs 判成 es）。
     顺序 = 优先级，越专属越靠前。 */
  var STRONG_CHARS = [
    [/[ß]/i, 'de'],
    [/[œ]/i, 'fr'],
    [/[ñ¿¡]/i, 'es'],
    [/[ãõ]/i, 'pt'],
    [/[őű]/i, 'hu'],
    [/[șț]/i, 'ro'],
    [/[ğış]/i, 'tr'],
    [/[řěů]/i, 'cs'],
    [/[łśźż]/i, 'pl'],
    [/[ėųū]/i, 'lt'],
    /* 越南语的 ơ/ư 与声调字母是专属的；đ 不算（克罗地亚语也用 đ） */
    [/[ơưạảấầẩẫậắằẳẵặẹẻẽếềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ]/i, 'vi']
  ];

  /* 注：曾经这里有一张 LATIN_HINTS（按 ä/ö/á 猜语种）的表，已删除。
     实测芬兰语、瑞典语、丹麦语都会命中 ä/ö，猜出来的语种经常是错的，
     而猜错的代价（用错词表）比「老实回退英文」更大。真正可靠的信号只有
     STRONG_CHARS（ß/œ/ñ/ő/ș/ğ/ơ…）和停用词投票，两者都在上面。 */

  /* 拉丁字母语言的「功能词」表 —— 比变音符号可靠得多：
     一句正式的德语未必带 ä/ö/ü，但几乎一定出现 der/die/das/und/ist。
     每个语言 20 个左右，按命中数 / 词数投票。 */
  var STOPWORDS = {
    en: ['the', 'and', 'is', 'are', 'was', 'were', 'of', 'to', 'in', 'that', 'it',
      'for', 'on', 'with', 'as', 'at', 'this', 'be', 'have', 'has', 'but', 'not',
      'you', 'we', 'they', 'from', 'by', 'or', 'an', 'their'],
    de: ['der', 'die', 'das', 'und', 'ist', 'nicht', 'mit', 'sich', 'auf', 'für',
      'von', 'den', 'dem', 'des', 'ein', 'eine', 'auch', 'werden', 'wird', 'sind',
      'war', 'wir', 'sie', 'aber', 'oder', 'bei', 'aus', 'noch', 'nur', 'wie'],
    fr: ['le', 'la', 'les', 'des', 'et', 'est', 'une', 'un', 'du', 'que', 'qui',
      'dans', 'pour', 'pas', 'sur', 'avec', 'plus', 'au', 'aux', 'ce', 'cette',
      'sont', 'nous', 'vous', 'ils', 'elles', 'mais', 'ou', 'comme', 'leur'],
    es: ['el', 'la', 'los', 'las', 'que', 'y', 'en', 'un', 'una', 'es', 'por',
      'con', 'para', 'no', 'se', 'su', 'al', 'del', 'como', 'más', 'pero', 'sus',
      'ya', 'fue', 'este', 'esta', 'son', 'muy', 'también', 'hay'],
    pt: ['que', 'não', 'do', 'da', 'em', 'um', 'uma', 'para', 'com', 'se', 'na',
      'no', 'por', 'mais', 'como', 'mas', 'foi', 'ao', 'dos', 'das', 'os', 'as',
      'é', 'são', 'este', 'esta', 'muito', 'também', 'pelo', 'isso'],
    it: ['il', 'lo', 'gli', 'che', 'di', 'un', 'una', 'per', 'con', 'non', 'si',
      'da', 'del', 'della', 'sono', 'come', 'più', 'anche', 'questo', 'questa',
      'ma', 'è', 'ha', 'hanno', 'nel', 'alla', 'dei', 'delle', 'molto', 'perché'],
    nl: ['het', 'een', 'van', 'en', 'dat', 'die', 'op', 'te', 'zijn', 'is', 'met',
      'voor', 'niet', 'aan', 'er', 'ook', 'als', 'maar', 'om', 'dan', 'je', 'we',
      'hij', 'zij', 'dit', 'deze', 'wordt', 'heeft', 'nog', 'wel'],
    pl: ['nie', 'się', 'jest', 'że', 'na', 'do', 'to', 'ale', 'jak', 'po', 'tak',
      'już', 'czy', 'tylko', 'przez', 'dla', 'od', 'oraz', 'być', 'są', 'ten',
      'tego', 'który', 'które', 'bardzo', 'może', 'jeszcze'],
    tr: ['bir', 've', 'bu', 'da', 'de', 'için', 'ile', 'çok', 'daha', 'olarak',
      'gibi', 'ama', 'ancak', 'kadar', 'sonra', 'olan', 'var', 'yok', 'değil',
      'her', 'ne', 'o', 'şu', 'ki'],
    id: ['yang', 'dan', 'di', 'ini', 'itu', 'dengan', 'untuk', 'dari', 'tidak',
      'akan', 'juga', 'ada', 'bisa', 'pada', 'dalam', 'karena', 'atau', 'sudah',
      'saya', 'kita', 'mereka', 'lebih', 'saat', 'tapi', 'meskipun', 'namun',
      'para', 'secara', 'sebagai', 'terhadap', 'hanya', 'masih', 'banyak', 'setelah'],
    vi: ['và', 'của', 'là', 'có', 'không', 'được', 'trong', 'cho', 'một', 'này',
      'với', 'để', 'khi', 'những', 'các', 'đã', 'sẽ', 'thì', 'rất', 'nhưng',
      'cũng', 'đó', 'tôi', 'chúng'],
    sv: ['och', 'att', 'det', 'som', 'på', 'är', 'av', 'för', 'med', 'till',
      'den', 'har', 'inte', 'om', 'ett', 'var', 'sig', 'men', 'så', 'kan'],
    da: ['og', 'at', 'det', 'som', 'på', 'er', 'af', 'for', 'med', 'til', 'den',
      'har', 'ikke', 'om', 'et', 'var', 'sig', 'men', 'så', 'kan', 'der', 'os',
      'fra', 'ved', 'blev', 'skal', 'være', 'hvad', 'når', 'mellem', 'også', 'kun'],
    nb: ['og', 'at', 'det', 'som', 'på', 'er', 'av', 'for', 'med', 'til', 'den',
      'har', 'ikke', 'om', 'et', 'var', 'seg', 'men', 'så', 'kan', 'der', 'vi',
      'fra', 'ved', 'ble', 'skal', 'være', 'hva', 'når', 'mellom', 'også', 'bare'],
    fi: ['ja', 'on', 'ei', 'että', 'se', 'oli', 'hän', 'mutta', 'kun', 'niin',
      'myös', 'joka', 'tai', 'jos', 'vain', 'nyt', 'sitten', 'olla', 'ole',
      'ovat', 'tämä', 'josta', 'kuin', 'vielä', 'jo', 'sen', 'sitä', 'mukaan'],
    cs: ['je', 'se', 'na', 'to', 'že', 'v', 's', 'z', 'do', 'ale', 'jak', 'po',
      'tak', 'už', 'jen', 'jsou', 'byl', 'bude', 'který', 'které', 'velmi'],
    hu: ['a', 'az', 'és', 'hogy', 'nem', 'is', 'egy', 'van', 'már', 'csak',
      'mint', 'meg', 'de', 'ha', 'még', 'volt', 'lesz', 'ezt', 'arra', 'nagyon'],
    ro: ['și', 'de', 'la', 'a', 'în', 'care', 'este', 'un', 'o', 'cu', 'pe',
      'nu', 'mai', 'dar', 'din', 'să', 'se', 'fost', 'pentru', 'foarte'],
    ca: ['el', 'la', 'els', 'les', 'de', 'que', 'i', 'en', 'un', 'una', 'és',
      'per', 'amb', 'no', 'es', 'són', 'com', 'més', 'però', 'aquest'],
    hr: ['je', 'se', 'na', 'da', 'to', 'u', 's', 'za', 'od', 'ali', 'kako',
      'po', 'su', 'bio', 'biti', 'koji', 'koje', 'vrlo', 'još', 'samo'],
    sl: ['je', 'se', 'na', 'da', 'to', 'v', 'z', 'za', 'od', 'ali', 'kot',
      'po', 'so', 'bil', 'biti', 'ki', 'ki', 'zelo', 'še', 'samo'],
    sk: ['je', 'sa', 'na', 'že', 'to', 'v', 's', 'z', 'do', 'ale', 'ako', 'po',
      'tak', 'už', 'len', 'sú', 'bol', 'bude', 'ktorý', 'veľmi'],
    sq: ['dhe', 'të', 'në', 'e', 'i', 'që', 'për', 'me', 'nga', 'një', 'nuk',
      'është', 'janë', 'kjo', 'ky', 'si', 'por', 'shumë', 'edhe'],
    af: ['die', 'en', 'van', 'het', 'nie', 'is', 'om', 'te', 'wat', 'met',
      'vir', 'op', 'sal', 'kan', 'hierdie', 'maar', 'ook', 'was', 'word'],
    sw: ['na', 'ya', 'wa', 'kwa', 'ni', 'za', 'la', 'kwamba', 'hii', 'hiyo',
      'katika', 'kama', 'lakini', 'pia', 'sana', 'hawa', 'wetu'],
    fil: ['ang', 'ng', 'sa', 'na', 'ay', 'mga', 'para', 'hindi', 'ito', 'si',
      'ko', 'niya', 'kung', 'din', 'rin', 'pero', 'dahil', 'may'],
    ms: ['yang', 'dan', 'di', 'ini', 'itu', 'dengan', 'untuk', 'dari', 'tidak',
      'akan', 'juga', 'ada', 'boleh', 'pada', 'dalam', 'kerana', 'atau', 'sudah'],
    et: ['ja', 'on', 'ei', 'et', 'see', 'oli', 'ta', 'aga', 'kui', 'siis',
      'ka', 'või', 'kui', 'veel', 'juba', 'seda', 'oma'],
    lv: ['un', 'ir', 'ka', 'uz', 'ar', 'no', 'tas', 'bija', 'bet', 'kā',
      'tad', 'vēl', 'jau', 'ļoti', 'šis', 'tā'],
    lt: ['ir', 'kad', 'yra', 'su', 'į', 'iš', 'ne', 'bet', 'kai', 'tai',
      'dar', 'jau', 'labai', 'šis', 'tas', 'buvo', 'bus']
  };

  /* 繁体特征字（只用于在 zh-CN / zh-TW 之间选，规则相同、只影响提示文案） */
  var HANT_CHARS = '們個這說時會來對開關樣點麼產資報價國產業動務華萬與並為條電腦網路';
  var HANS_CHARS = '们个这说时会对开关样点么产资报价国产业动务华万与并为条电脑网路';

  /* 停用词投票：命中数 / 该语言词表大小，取最高者。
     用一个「最少需要几次命中」门槛，避免一两个巧合词（de / la / no）误判。 */
  function voteByStopwords(s) {
    /* 词字符范围要够宽：越南语声调在 \u1ea0-\u1ef9，波罗的/中欧在 \u0100-\u017f。
       范围窄了会把 "phiếu" 切成 "phi"+"u"，让整个词表失效。 */
    var words = String(s).toLowerCase()
      .replace(/[^\w\u00c0-\u024f\u1e00-\u1eff\u0400-\u04ff'\u2019]+/g, ' ')
      .split(/\s+/).filter(Boolean);
    if (words.length < 3) return null;
    var bag = {};
    for (var i = 0; i < words.length; i++) bag[words[i]] = (bag[words[i]] || 0) + 1;
    var best = null, bestScore = 0, bestHits = 0;
    for (var code in STOPWORDS) {
      var list = STOPWORDS[code], hits = 0;
      for (var k = 0; k < list.length; k++) {
        if (bag[list[k]]) hits += Math.min(bag[list[k]], 3);   /* 单个词最多计 3 次 */
      }
      /* 归一化：命中数开方，避免长词表占便宜 */
      var score = hits / Math.sqrt(list.length);
      if (hits > bestHits && score > bestScore) {
        bestScore = score; bestHits = hits; best = code;
      }
    }
    if (!best || bestHits < 2) return null;
    return { lang: best, hits: bestHits, score: bestScore, words: words.length };
  }

  /* 返回 {lang, confidence, scores}。只做「够用」的判断，用户可随时手选覆盖。 */
  function detectLang(text) {
    var s = String(text || '');
    var total = 0;
    for (var i = 0; i < s.length; i++) if (/\S/.test(s[i])) total++;
    if (!total) return { lang: 'en', confidence: 0, scores: {} };

    var scores = {};
    for (var k = 0; k < DETECT.length; k++) {
      var re = DETECT[k][0], code = DETECT[k][1], w = DETECT[k][2];
      var m = s.match(new RegExp(re.source, 'g'));
      if (m) scores[code] = (scores[code] || 0) + m.length * w;
    }
    /* 汉字存在但不是日文（无假名）→ 中文；再按繁简特征字分流 */
    var han = s.match(/[\u4e00-\u9fff\u3400-\u4dbf]/g);
    var kana = s.match(/[\u3040-\u30ff]/g);
    if (han && han.length) {
      if (kana && kana.length > han.length * 0.05) scores.ja = (scores.ja || 0) + han.length;
      else {
        var trad = 0, simp = 0;
        for (var t = 0; t < s.length; t++) {
          if (HANT_CHARS.indexOf(s[t]) >= 0) trad++;
          if (HANS_CHARS.indexOf(s[t]) >= 0) simp++;
        }
        scores.tradHint = trad;
        scores.simpHint = simp;
        scores['zh-CN'] = (scores['zh-CN'] || 0) + han.length;
      }
    }
    var best = null, bestN = 0;
    for (var c in scores) {
      if (c === 'tradHint' || c === 'simpHint') continue;
      if (scores[c] > bestN) { bestN = scores[c]; best = c; }
    }
    if (best) {
      /* 阿拉伯字母可能被判断成 ar，但波斯语用 پ/چ/ژ/گ，乌尔都语用 ے/ں/ھ/ٹ */
      if (best === 'ar') {
        if (/[\u06d2\u06ba\u06be\u0679\u0688\u0691]/.test(s)) best = 'ur';
        else if (/[\u067e\u0686\u0698\u06af]/.test(s)) best = 'fa';
      }
      /* 西里尔：乌克兰/塞尔维亚/保加利亚特征字母 */
      if (best === 'ru') {
        if (/[\u0456\u0457\u0454\u0491]/i.test(s)) best = 'uk';
        else if (/[\u0452\u045b\u045f\u0459\u045a\u0458]/i.test(s)) best = 'sr';
        else {
          /* 保加利亚语 ъ 很常见，俄语 ъ 是罕见的硬音符号；再看有无 ы/э/ё */
          var yer = (s.match(/\u044a/g) || []).length;
          var ruOnly = /[\u044b\u044d\u0451]/.test(s);
          if (yer >= 2 && !ruOnly) best = 'bg';
        }
      }
      /* 汉字繁简：两个代码规则相同，只影响界面提示语言名 */
      if (best === 'zh-CN' && scores.tradHint > scores.simpHint) best = 'zh-TW';
      return { lang: best, confidence: Math.min(1, bestN / total), scores: scores };
    }

    /* 纯拉丁字母：先查「专属字符」（最硬），再停用词投票，最后看一般变音符号 */
    var strong = null;
    for (var si = 0; si < STRONG_CHARS.length; si++) {
      if (STRONG_CHARS[si][0].test(s)) { strong = STRONG_CHARS[si][1]; break; }
    }
    var vote = voteByStopwords(s);
    if (strong) {
      /* 专属字符命中：若投票结果也是这么语言，置信度给足；否则以字符为准 */
      var agree = vote && vote.lang === strong;
      return {
        lang: strong,
        confidence: agree ? 0.85 : 0.7,
        scores: scores
      };
    }
    if (vote) {
      return {
        lang: vote.lang,
        confidence: Math.min(0.9, 0.35 + vote.hits / Math.max(vote.words, 1)),
        scores: scores
      };
    }
    /* 没有专属字符、停用词也没凑够：**不要**拿 ä/ö/á 这类通用变音符号硬猜
       （芬兰语的 ä 和德语的 ä 一模一样，猜错会让词表整体失效）。
       直接给低置信度的英文，让用户在界面上改 —— 拉丁字母之间断句规则本来就相同，
       猜错的代价只是词表，不是规则。 */
    return { lang: 'en', confidence: 0.2, scores: scores };
  }

  /* ==========================================================================
     二、时间轴与解析
     ========================================================================== */

  var TIME_RE = /^(\d{1,3}):(\d{2}):(\d{2})[,.](\d{1,3})\s*-->\s*(\d{1,3}):(\d{2}):(\d{2})[,.](\d{1,3})/;
  var VTT_TIME_RE = /^(?:(\d{1,3}):)?(\d{1,2}):(\d{2})[.,](\d{3})\s*-->\s*(?:(\d{1,3}):)?(\d{1,2}):(\d{2})[.,](\d{3})/;

  function toMs(h, m, s, ms) {
    return ((+h * 60 + +m) * 60 + +s) * 1000 + +(String(ms).padEnd(3, '0').slice(0, 3));
  }
  function pad(x, l) { return String(x).padStart(l, '0'); }
  function fmtTime(ms) {
    var t = Math.max(0, Math.round(ms));
    return pad(Math.floor(t / 3600000), 2) + ':' + pad(Math.floor(t / 60000) % 60, 2) +
      ':' + pad(Math.floor(t / 1000) % 60, 2) + ',' + pad(t % 1000, 3);
  }
  function fmtTimeVtt(ms) {
    var t = Math.max(0, Math.round(ms));
    return pad(Math.floor(t / 3600000), 2) + ':' + pad(Math.floor(t / 60000) % 60, 2) +
      ':' + pad(Math.floor(t / 1000) % 60, 2) + '.' + pad(t % 1000, 3);
  }

  /* 解析 SRT：容忍序号缺失、时间轴用点号、块间多空行 */
  function parseSrt(src) {
    var text = String(src == null ? '' : src).replace(/^\uFEFF/, '').replace(/\r\n?/g, '\n');
    var blocks = text.split(/\n[ \t]*\n/);
    var cues = [];
    for (var b = 0; b < blocks.length; b++) {
      var lines = blocks[b].split('\n');
      var ti = -1;
      for (var i = 0; i < Math.min(lines.length, 4); i++) {
        if (lines[i].indexOf('-->') >= 0) { ti = i; break; }
      }
      if (ti < 0) continue;
      var m = TIME_RE.exec(lines[ti].trim()) || VTT_TIME_RE.exec(lines[ti].trim());
      if (!m) continue;
      var st, en;
      if (m.length === 9) {
        st = toMs(m[1], m[2], m[3], m[4]);
        en = toMs(m[5], m[6], m[7], m[8]);
      } else {
        st = toMs(m[1] || 0, m[2], m[3], m[4]);
        en = toMs(m[5] || 0, m[6], m[7], m[8]);
      }
      if (en <= st) continue;
      var tx = lines.slice(ti + 1).join('\n').trim();
      /* 去掉 ASS 位置标签（{\an8} 这类），否则会被当成文本参与断句 */
      tx = tx.replace(/\{\\[^}]*\}/g, '').trim();
      if (!tx) continue;
      cues.push({ idx: cues.length + 1, start: st, end: en, text: tx });
    }
    return cues;
  }

  /* 解析 VTT：跳过 WEBVTT 头与 NOTE/STYLE 块，去掉行内 <c>/<v> 标签 */
  function parseVtt(src) {
    var text = String(src == null ? '' : src).replace(/^\uFEFF/, '').replace(/\r\n?/g, '\n');
    var blocks = text.split(/\n[ \t]*\n/);
    var cues = [];
    for (var b = 0; b < blocks.length; b++) {
      var blk = blocks[b].trim();
      if (!blk) continue;
      if (/^WEBVTT/i.test(blk) || /^NOTE\b/i.test(blk) || /^STYLE\b/i.test(blk)) continue;
      var lines = blk.split('\n');
      var ti = -1;
      for (var i = 0; i < Math.min(lines.length, 3); i++) {
        if (lines[i].indexOf('-->') >= 0) { ti = i; break; }
      }
      if (ti < 0) continue;
      var m = VTT_TIME_RE.exec(lines[ti].trim()) || TIME_RE.exec(lines[ti].trim());
      if (!m) continue;
      var st, en;
      if (m.length === 9) {
        st = toMs(m[1] || 0, m[2], m[3], m[4]);
        en = toMs(m[5] || 0, m[6], m[7], m[8]);
      } else {
        st = toMs(m[1], m[2], m[3], m[4]);
        en = toMs(m[5], m[6], m[7], m[8]);
      }
      if (en <= st) continue;
      var tx = lines.slice(ti + 1).join('\n')
        .replace(/<[^>]+>/g, '')
        .replace(/\{\\[^}]*\}/g, '')
        .trim();
      if (!tx) continue;
      cues.push({ idx: cues.length + 1, start: st, end: en, text: tx });
    }
    return cues;
  }

  /* 纯文本（无时间轴）：按行当 cue，给等长时长，仅用于「只有文字也想排一遍」的场景 */
  function parseTxt(src) {
    var lines = String(src || '').replace(/\r\n?/g, '\n').split('\n');
    var cues = [], t = 0;
    for (var i = 0; i < lines.length; i++) {
      var s = lines[i].trim();
      if (!s) continue;
      cues.push({ idx: cues.length + 1, start: t, end: t + 3000, text: s });
      t += 3000;
    }
    return cues;
  }

  function formatSrt(cues) {
    var out = [];
    for (var i = 0; i < cues.length; i++) {
      out.push((i + 1) + '\n' + fmtTime(cues[i].start) + ' --> ' + fmtTime(cues[i].end) +
        '\n' + cues[i].text + '\n');
    }
    return out.join('\n');
  }
  function formatVtt(cues) {
    var out = ['WEBVTT\n'];
    for (var i = 0; i < cues.length; i++) {
      out.push((i + 1) + '\n' + fmtTimeVtt(cues[i].start) + ' --> ' + fmtTimeVtt(cues[i].end) +
        '\n' + cues[i].text + '\n');
    }
    return out.join('\n');
  }
  function formatTxt(cues) {
    return cues.map(function (c) {
      return c.text.replace(/\n/g, ' ');
    }).join('\n');
  }

  /* ==========================================================================
     三、词流构建（含 100 语的切分与时间插值）
     ========================================================================== */

  /* 把一段文本切成 token 数组。按语言决定「按空格」还是「按字符」。 */
  function tokenize(text, rule) {
    if (rule.space) return text.split(/\s+/).filter(Boolean);
    /* 无空格分词的语言（中日泰老高棉缅藏）：逐字符。
       ⚠️ 但**连续的拉丁字母/数字必须整体保留**：CJK 字幕里常夹着
          SpaceX / iPhone / 1.77 / xAI 这类词，逐字符切会变成 "S p a c e X"
          ——文本被拆散、时间轴也被拆散。这是实测踩到的真实 bug。 */
    var out = [], buf = '';
    var LATIN = /[A-Za-z0-9]/;
    var JOINER = /['\u2019.\-]/;   /* 词内允许的连字符号：don't / 1.77 / state-of */
    for (var i = 0; i < text.length; i++) {
      var ch = text[i];
      if (LATIN.test(ch)) {
        buf += ch;
        continue;
      }
      /* 词内连接符：前后都是拉丁字符时并入当前词 */
      if (buf && JOINER.test(ch) && i + 1 < text.length && LATIN.test(text[i + 1])) {
        buf += ch;
        continue;
      }
      if (buf) { out.push(buf); buf = ''; }
      if (/\s/.test(ch)) continue;
      out.push(ch);
    }
    if (buf) out.push(buf);
    return out;
  }

  function joinTokens(toks, rule) {
    var parts = [];
    for (var i = 0; i < toks.length; i++) parts.push(toks[i].text);
    if (rule.space) return parts.join(' ');
    /* 字符型语言：直接拼接；但两个拉丁/数字 token 之间补空格（混排常见） */
    var s = '';
    for (var k = 0; k < parts.length; k++) {
      var p = parts[k];
      if (k > 0 && /[A-Za-z0-9]$/.test(parts[k - 1]) && /^[A-Za-z0-9]/.test(p)) s += ' ';
      s += p;
    }
    return s;
  }

  function stripTrail(w, rule) {
    var t = String(w);
    var guard = 0;
    while (t && rule.trail.indexOf(t[t.length - 1]) >= 0 && guard++ < 8) t = t.slice(0, -1);
    return t;
  }

  function lastChar(w, rule) {
    var c = stripTrail(w, rule);
    return c ? c[c.length - 1] : '';
  }

  /* 词权重：按「发声长度」而不是字符数。
     $15 读作 fifteen dollars、1.77 读作 one point seven seven、AI 读作 A-I，
     按字符算会严重低估这些词，后面所有词的时间就被系统性推前。 */
  var DIGIT_LEN = { '0': 4, '1': 3, '2': 3, '3': 5, '4': 4, '5': 4, '6': 3, '7': 5, '8': 5, '9': 4 };

  function spokenLen(w, rule) {
    var core = String(w).replace(/^[^\w\u00c0-\uffff$%]+|[^\w\u00c0-\uffff%]+$/g, '');
    if (!core) return 2;
    var punct = lastChar(w, rule);
    var bonus = 0;
    if (rule.comma.indexOf(punct) >= 0) bonus = 2;
    else if (rule.sent.indexOf(punct) >= 0) bonus = 3;
    /* 数字逐位展开 */
    if (/\d/.test(core)) {
      var extra = 0;
      if (core.charAt(0) === '$') extra += 7;
      if (/%$/.test(core)) extra += 7;
      var body = core.replace(/[^\d.]/g, '');
      var n = 0;
      for (var i = 0; i < body.length; i++) n += body[i] === '.' ? 5 : (DIGIT_LEN[body[i]] || 4);
      return Math.max(n + extra, 3) + bonus;
    }
    /* 无空格语言：单字权重就是 1 个字符 */
    if (!rule.space) return 1 + (bonus ? 0 : 0);
    /* 全大写短缩写按逐字母念 */
    if (core.length <= 4 && core === core.toUpperCase() && /^[A-Z]+$/.test(core)) {
      return core.length * 2.2 + bonus;
    }
    return Math.max(core.length, 2) + 1 + bonus;
  }

  /* 把 cue 文本摊平成 token；cue 的 start/end 作为锚点做插值 */
  function buildTokens(cues, rule) {
    var toks = [];
    for (var ci = 0; ci < cues.length; ci++) {
      var c = cues[ci];
      var joined = c.text.split('\n').map(function (l) { return l.trim(); })
        .filter(Boolean).join(' ');
      var words = tokenize(joined, rule);
      if (!words.length) continue;
      var w = [], total = 0, i;
      for (i = 0; i < words.length; i++) {
        var ww = spokenLen(words[i], rule);
        w.push(ww);
        total += ww;
      }
      var dur = Math.max(c.end - c.start, words.length * 60);
      var acc = 0, starts = [];
      for (i = 0; i < words.length; i++) {
        starts.push(c.start + dur * acc / total);
        acc += w[i];
      }
      for (i = 0; i < words.length; i++) {
        var st = Math.round(starts[i]);
        var en = (i + 1 < words.length) ? Math.round(starts[i + 1]) : c.end;
        toks.push({
          text: words[i], start: st, end: Math.max(en, st + 40),
          srcCue: c.idx
        });
      }
    }
    /* 保证严格单调（原始字幕偶有交叠/乱序） */
    for (var k = 1; k < toks.length; k++) {
      if (toks[k].start < toks[k - 1].start) toks[k].start = toks[k - 1].start;
    }
    for (var j = 0; j < toks.length - 1; j++) {
      toks[j].end = Math.max(Math.min(toks[j].end, toks[j + 1].start), toks[j].start + 40);
    }
    return toks;
  }

  /* 折叠紧邻的完全相同重复词（ASR 常见 And And / I I I）。
     默认关闭：这会改动原文，除非用户显式要求。 */
  function dedupeTokens(toks) {
    var out = [], dropped = 0;
    for (var i = 0; i < toks.length; i++) {
      var t = toks[i];
      if (out.length) {
        var p = out[out.length - 1];
        if (p.text === t.text && t.text.length > 2) {
          p.end = Math.max(p.end, t.end);
          dropped++;
          continue;
        }
      }
      out.push({ text: t.text, start: t.start, end: t.end, srcCue: t.srcCue });
    }
    return { toks: out, dropped: dropped };
  }

  /* ==========================================================================
     四、句子切分
     ========================================================================== */

  /* 英文缩写（只有拉丁字母系且启用大小写判断时才用） */
  var ABBREV = ('mr mrs ms dr prof sr jr st mt vs etc inc co corp ltd llc no vol fig ' +
    'al approx dept est gov sen rep gen col lt sgt capt u.s u.k e.u a.m p.m b.c a.d ' +
    'ph.d jan feb mar apr jun jul aug sep sept oct nov dec').split(' ');

  var NUMDOT_RE = /^\$?\d[\d,]*\.\d+\.?$/;

  /* tok 是否真的结束了一个句子 */
  function isSentenceEnd(tok, nextText, rule) {
    var core = stripTrail(tok, rule);
    if (!core) return false;
    var ch = core[core.length - 1];
    if (rule.sent.indexOf(ch) < 0) return false;
    /* 只有「点号」需要防误判；问号/感叹号/句号（CJK）没有缩写问题 */
    if (ch !== '.') return true;
    if (!rule.upper) return true;   /* 无大小写语言：点号基本就是句末 */
    var key = normKey(core);
    if (ABBREV.indexOf(key) >= 0) return false;
    if (NUMDOT_RE.test(core)) return false;          /* 1.77 / $15.5 */
    if (/^[A-Za-z]\.$/.test(core)) return false;      /* 单字母缩写 A. */
    /* 后面接小写开头 → ASR 认为还没说完 */
    if (nextText) {
      var n0 = String(nextText).replace(/^["'\u201c\u2018(\uff08]+/, '');
      if (n0 && /^[a-z\u00df-\u00ff]/.test(n0)) return false;
    }
    return true;
  }

  function normKey(w) {
    return String(w).replace(/^[^\w$]+/, '').replace(/[^\w]+$/, '').toLowerCase();
  }

  function splitSentences(toks, rule) {
    var out = [], cur = [];
    for (var i = 0; i < toks.length; i++) {
      var t = toks[i];
      /* 说话人切换标记 >> 视作硬断句点 */
      if (t.text.indexOf('>>') === 0 && cur.length) {
        out.push(cur);
        cur = [];
      }
      cur.push(t);
      var nxt = (i + 1 < toks.length) ? toks[i + 1].text : null;
      if (isSentenceEnd(t.text, nxt, rule) || (nxt && nxt.indexOf('>>') === 0)) {
        out.push(cur);
        cur = [];
      }
    }
    if (cur.length) out.push(cur);
    return out;
  }

  /* ==========================================================================
     五、折行
     ========================================================================== */

  /* 这段文本能不能在 maxLine 内折成两行、且**不切断拉丁单词**。
     segCost 用它做硬约束：放不下就让 splitParts 在句内再切，
     而不是硬切一刀把 SpaceX 变成 "Spac" / "eX"。 */
  function canWrap(text, maxLine, rule) {
    text = String(text);
    if (text.length <= maxLine) return true;
    var i;
    if (rule.wrapBy === 'char') {
      var lo = Math.max(4, text.length - maxLine), hi = Math.min(text.length, maxLine);
      for (i = lo; i <= hi; i++) {
        var lc = text[i - 1], rc = text[i];
        if (lc === undefined || rc === undefined) continue;
        if (/[A-Za-z0-9]/.test(lc) && /[A-Za-z0-9]/.test(rc)) continue;   /* 词内断点 */
        return true;
      }
      return false;
    }
    var words = text.split(' ');
    for (i = 1; i < words.length; i++) {
      var L = words.slice(0, i).join(' '), R = words.slice(i).join(' ');
      if (L.length <= maxLine && R.length <= maxLine) return true;
    }
    return false;
  }

  function wrapTwoLines(text, maxLine, rule) {
    text = String(text);
    if (text.length <= maxLine) return [text];
    if (rule.wrapBy === 'char') {
      /* 两轮：第一轮禁止切在拉丁单词内部（SpaceX 不能变 "Spac" / "eX"），
         实在没有别的落点才放开。 */
      var pass, best = -1;
      for (pass = 0; pass < 2 && best < 0; pass++) {
        var bestScore = 1e18, cand = -1;
        var lo = Math.max(4, text.length - maxLine), hi = Math.min(text.length, maxLine);
        for (var i = lo; i <= hi; i++) {
          var left = text.slice(0, i), right = text.slice(i);
          if (!left || !right) continue;
          var lc = left[left.length - 1], rc = right[0];
          if (pass === 0 && /[A-Za-z0-9]/.test(lc) && /[A-Za-z0-9]/.test(rc)) continue;
          var score = Math.abs(left.length - right.length);
          if (rule.comma.indexOf(lc) >= 0 || rule.sent.indexOf(lc) >= 0) score -= 6;
          /* 下一行以标点开头 = 标点悬在行首，最难看 */
          if (rule.comma.indexOf(rc) >= 0 || rule.sent.indexOf(rc) >= 0 ||
            rule.trail.indexOf(rc) >= 0) score += 30;
          if (score < bestScore) { bestScore = score; cand = i; }
        }
        if (cand > 0) best = cand;
      }
      if (best < 0) best = Math.min(maxLine, text.length - 1);
      return [text.slice(0, best).trim(), text.slice(best).trim()];
    }
    var words = text.split(' ');
    if (words.length === 1) return [text];
    var bi = 1, bs = 1e18;
    for (var k = 1; k < words.length; k++) {
      var L = words.slice(0, k).join(' '), R = words.slice(k).join(' ');
      if (L.length > maxLine || R.length > maxLine) continue;
      var sc = Math.abs(L.length - R.length);
      var lastWord = words[k - 1], firstWord = words[k];
      if (rule.comma.indexOf(lastChar(lastWord, rule)) >= 0) sc -= 8;
      if (rule.weak.indexOf(normKey(lastWord)) >= 0) sc += 12;
      if (rule.conj.indexOf(normKey(firstWord)) >= 0) sc -= 4;
      if (words.length - k === 1) sc += 20;
      if (sc < bs) { bi = k; bs = sc; }
    }
    if (bs > 1e17) {
      var cut = text.lastIndexOf(' ', maxLine);
      if (cut <= 0) cut = maxLine;
      return [text.slice(0, cut).trim(), text.slice(cut).trim()];
    }
    return [words.slice(0, bi).join(' '), words.slice(bi).join(' ')];
  }

  /* ==========================================================================
     六、DP 重定界
     ========================================================================== */

  function segText(toks, rule) { return joinTokens(toks, rule); }

  /* 在 prev 与 nxt 之间开新一条的代价 */
  function boundaryCost(prev, nxt, endOfSentence, rule) {
    if (endOfSentence) return 0;
    var core = stripTrail(prev.text, rule);
    var lastPunct = core ? core[core.length - 1] : '';
    var nk = normKey(nxt.text);
    var c;
    if (rule.comma.indexOf(lastPunct) >= 0) c = 0.45;
    else if (rule.sent.indexOf(lastPunct) >= 0) c = 0.6;   /* 句末标点但被判定非句末（缩写等） */
    else if (lastPunct === '-' || lastPunct === '\u2014') c = 0.8;
    else if (rule.conj.indexOf(nk) >= 0) c = 1.4;
    else if (rule.weak.indexOf(normKey(prev.text)) >= 0) c = 4.0;
    else c = 2.4;
    if (nxt.text.indexOf('>>') === 0) c = 0;
    /* 新一条以介词/冠词开头 → 碎片（连词除外，连词开头是自然的） */
    if (rule.weak.indexOf(nk) >= 0 && rule.conj.indexOf(nk) < 0) c += 2.5;
    return c;
  }

  /* 单条 cue 的代价；不合法返回 null */
  function segCost(toks, opts, rule) {
    var text = segText(toks, rule);
    var n = text.length;
    if (!n) return null;
    var dur = toks[toks.length - 1].end - toks[0].start;
    if (dur > opts.maxDur) return null;
    /* 折行硬约束：必须在 maxLine 内成 2 行，且不切断拉丁单词 */
    if (!canWrap(text, opts.maxLine, rule)) return null;
    var lines = wrapTwoLines(text, opts.maxLine, rule);
    if (lines.length > 2) return null;
    if (lines[0].length > opts.maxLine || (lines[1] && lines[1].length > opts.maxLine)) return null;
    var cost = 0.35;
    if (dur < opts.minDur) cost += (opts.minDur - dur) / 300 * 0.9;
    var cps = n / Math.max(dur / 1000, 0.2);
    if (cps > opts.maxCps) cost += (cps - opts.maxCps) * 0.35;
    if (lines.length === 2) {
      cost += Math.abs(lines[0].length - lines[1].length) / 45;
      if (lines[1].split(/\s+/).length <= 1 && lines[1].length <= 2) cost += 2.0;
    }
    if (n < 10) cost += 1.2;
    return cost;
  }

  /* 一句话太长，在句内再切 */
  function splitParts(toks, opts, rule) {
    var n = toks.length;
    var INF = Infinity;
    var dp = new Array(n + 1).fill(INF);
    var back = new Array(n + 1).fill(-1);
    dp[0] = 0;
    var MAXSPAN = 80;   /* 单条最多装多少 token（防 DP 退化） */
    for (var i = 0; i < n; i++) {
      if (dp[i] === INF) continue;
      var bc = i > 0 ? boundaryCost(toks[i - 1], toks[i], false, rule) : 0;
      /* 切在原 cue 边界上：那里是 ASR 的真实词边界 + 真实停顿，时间零误差 */
      if (i > 0 && toks[i].srcCue !== toks[i - 1].srcCue) bc -= 1.2;
      var span = 0;
      for (var j = i + 1; j <= n; j++) {
        span++;
        if (span > MAXSPAN) break;
        var sc = segCost(toks.slice(i, j), opts, rule);
        if (sc === null) {
          /* 单个 token 都放不下（超长专有名词、maxLine 调得过窄）：
             强制接纳并记高代价，否则 DP 会无解、整段丢失 */
          if (j === i + 1) sc = 3.0;
          else break;
        }
        var cand = dp[i] + bc + sc;
        if (cand < dp[j]) { dp[j] = cand; back[j] = i; }
      }
    }
    var segs = [], k = n;
    while (k > 0) {
      var p = back[k];
      if (p < 0) p = Math.max(0, k - 1);
      segs.push(toks.slice(p, k));
      k = p;
    }
    segs.reverse();
    return segs;
  }

  /* 一句一条 → 放不下的句内切 → 相邻太短的合并 */
  function pack(sents, opts, rule) {
    var segs = [], i;
    for (i = 0; i < sents.length; i++) {
      var one = segCost(sents[i], opts, rule);
      if (one !== null) segs.push(sents[i]);
      else segs = segs.concat(splitParts(sents[i], opts, rule));
    }

    function span(sg) { return sg[sg.length - 1].end - sg[0].start; }
    function txt(sg) { return segText(sg, rule); }
    function isShort(sg) { return span(sg) < opts.minDur || txt(sg).length < 22; }
    function fits(a, b) {
      var t = txt(a) + (rule.space ? ' ' : '') + txt(b);
      if (t.length > opts.maxLine * 2) return false;
      if (b[b.length - 1].end - a[0].start > opts.maxDur * 1.1) return false;
      return canWrap(t, opts.maxLine, rule);
    }

    var merged = [];
    i = 0;
    while (i < segs.length) {
      var sg = segs[i];
      if (merged.length && isShort(merged[merged.length - 1]) && fits(merged[merged.length - 1], sg)) {
        merged[merged.length - 1] = merged[merged.length - 1].concat(sg);
        i++;
        continue;
      }
      if (isShort(sg) && i + 1 < segs.length && fits(sg, segs[i + 1])) {
        merged.push(sg.concat(segs[i + 1]));
        i += 2;
        continue;
      }
      merged.push(sg);
      i++;
    }
    return merged;
  }

  /* 末尾碎片（短于最短时长）从下一条借几个词，避免闪一下 */
  function fixSlivers(segs, opts, rule) {
    var k = 0;
    while (k < segs.length - 1) {
      var sg = segs[k], nx = segs[k + 1], moved = 0;
      while (span(sg) < opts.minDur && moved < 8 && nx.length > 2) {
        var cand = sg.concat([nx[0]]), rest = nx.slice(1);
        var ct = segText(cand, rule);
        if (ct.length > opts.maxLine * 2) break;
        if (cand[cand.length - 1].end - cand[0].start > opts.maxDur) break;
        if (!canWrap(ct, opts.maxLine, rule)) break;
        if (!canWrap(segText(rest, rule), opts.maxLine, rule)) break;
        sg = cand; nx = rest; moved++;
      }
      segs[k] = sg; segs[k + 1] = nx;
      k++;
    }
    return segs.filter(function (s) { return s.length; });

    function span(s) { return s[s.length - 1].end - s[0].start; }
  }

  /* 时间收尾：句末轻延、不足最短时长往后补、强制单调且不重叠 */
  function smoothTimes(segs, opts) {
    var times = segs.map(function (s) {
      return [s[0].start, s[s.length - 1].end];
    });
    var k;
    for (k = 0; k < times.length - 1; k++) {
      var nxt = times[k + 1][0];
      if (nxt - times[k][1] > 0) {
        times[k][1] = Math.min(nxt - opts.gap, times[k][1] + 180);
      }
    }
    for (k = 0; k < times.length; k++) {
      if (times[k][1] - times[k][0] > opts.maxDur) times[k][1] = times[k][0] + opts.maxDur;
    }
    for (k = 0; k < times.length; k++) {
      if (times[k][1] - times[k][0] < opts.minDur) {
        var limit = (k + 1 < times.length) ? times[k + 1][0] - opts.gap : times[k][0] + opts.minDur;
        times[k][1] = Math.max(times[k][1], Math.min(times[k][0] + opts.minDur, Math.max(limit, times[k][0] + 500)));
      }
    }
    for (k = 1; k < times.length; k++) {
      if (times[k][0] < times[k - 1][1] + opts.gap) times[k][0] = times[k - 1][1] + opts.gap;
      if (times[k][1] <= times[k][0]) times[k][1] = times[k][0] + 400;
    }
    return times;
  }

  /* ==========================================================================
     七、体检
     ========================================================================== */

  function analyze(cues, rule, label) {
    var durs = [], noEnd = 0, lowerStart = 0, chars = 0, i;
    for (i = 0; i < cues.length; i++) {
      var c = cues[i];
      durs.push(c.end - c.start);
      chars += c.text.length;
      var core = stripTrail(String(c.text).trim(), rule);
      var lc = core ? core[core.length - 1] : '';
      if (rule.sent.indexOf(lc) < 0) noEnd++;
      var first = String(c.text).trim().charAt(0);
      if (first && first === first.toLowerCase() && first !== first.toUpperCase()) lowerStart++;
    }
    var durSum = durs.reduce(function (a, b) { return a + b; }, 0);
    var overlaps = 0, gaps = 0;
    for (i = 1; i < cues.length; i++) {
      if (cues[i].start < cues[i - 1].end) overlaps++;
      if (cues[i].start > cues[i - 1].end) gaps++;
    }
    return {
      label: label || '', cues: cues.length, noEndPunct: noEnd,
      startsLowercase: lowerStart, chars: chars,
      avgDur: cues.length ? +(durSum / cues.length / 1000).toFixed(2) : 0,
      minDur: durs.length ? +(Math.min.apply(null, durs) / 1000).toFixed(2) : 0,
      maxDur: durs.length ? +(Math.max.apply(null, durs) / 1000).toFixed(2) : 0,
      overlaps: overlaps, gaps: gaps
    };
  }

  /* 逐条统计断点类型：句末 / 逗号 / 句中硬切 —— 用来量化质量 */
  function breakStats(cues, rule) {
    var endP = 0, comma = 0, hard = 0;
    for (var i = 0; i < cues.length; i++) {
      var core = stripTrail(String(cues[i].text).trim(), rule);
      var lc = core ? core[core.length - 1] : '';
      if (rule.sent.indexOf(lc) >= 0) endP++;
      else if (rule.comma.indexOf(lc) >= 0) endP += 0, comma++;
      else hard++;
    }
    return { sentenceEnd: endP, comma: comma, hard: hard, total: cues.length };
  }

  /* ==========================================================================
     八、主入口
     ========================================================================== */

  var DEFAULTS = {
    lang: 'auto',
    maxLine: 42,
    maxDur: 6000,
    minDur: 1000,
    maxCps: 19,
    gap: 60,
    dedupe: false
  };

  /* 按语言给出默认参数：CJK 行宽要窄（同样宽度下汉字信息密度高 2 倍） */
  function defaultsFor(lang) {
    var rule = ruleFor(lang);
    var o = {};
    for (var k in DEFAULTS) o[k] = DEFAULTS[k];
    /* 中文/日文规范：每行 16 个全角字、最多 2 行（Netflix 简中/繁中/日文口径）。
       韩语虽也按 CJK 行宽，但词间有空格，16 字偏窄，给 18。 */
    if (rule.cjk) { o.maxLine = 16; o.maxCps = 10; }
    if (rule.script === 'KOREAN') { o.maxLine = 18; o.maxCps = 12; }
    return o;
  }

  /**
   * 主入口。
   * @param {string} src  字幕文本（SRT / VTT / 纯文本，自动判断）
   * @param {object} user 选项，见 DEFAULTS
   * @returns {{cues, stats, lang, rule, opts, warn}}
   */
  function realign(src, user) {
    var opts = {}, k;
    for (k in DEFAULTS) opts[k] = DEFAULTS[k];
    if (user) for (k in user) if (user[k] !== undefined) opts[k] = user[k];

    var raw = String(src == null ? '' : src);
    if (!/\S/.test(raw)) return { error: 'empty' };

    /* 自动判断格式 */
    var cues, fmt = 'srt';
    if (/^WEBVTT/i.test(raw.trim())) { cues = parseVtt(raw); fmt = 'vtt'; }
    else cues = parseSrt(raw);
    if (!cues.length) { cues = parseVtt(raw); if (cues.length) fmt = 'vtt'; }
    if (!cues.length) { cues = parseTxt(raw); fmt = 'txt'; }
    if (!cues.length) return { error: 'nosubs' };

    /* 语言：auto 就按内容检测 */
    var lang = opts.lang, detected = null;
    if (!lang || lang === 'auto') {
      detected = detectLang(cues.map(function (c) { return c.text; }).join(' '));
      lang = detected.lang;
    }
    var rule = ruleFor(lang);
    /* 用户在 auto 模式下没有显式改参数时，行宽/CPS 跟随语言默认 */
    if (!user || user.maxLine === undefined) {
      if (rule.cjk) opts.maxLine = 16;
    }
    if (!user || user.maxCps === undefined) {
      if (rule.cjk) opts.maxCps = 10;
    }

    var toks = buildTokens(cues, rule);
    if (!toks.length) return { error: 'nosubs' };
    var dropped = 0;
    if (opts.dedupe) {
      var d = dedupeTokens(toks);
      toks = d.toks; dropped = d.dropped;
    }

    var sents = splitSentences(toks, rule);
    var segs = pack(sents, opts, rule);
    segs = fixSlivers(segs, opts, rule);
    var times = smoothTimes(segs, opts);

    var out = [];
    for (var i = 0; i < segs.length; i++) {
      var text = segText(segs[i], rule);
      out.push({
        idx: i + 1, start: times[i][0], end: times[i][1],
        text: wrapTwoLines(text, opts.maxLine, rule).join('\n')
      });
    }

    /* 文本守恒自检：拼回去的字符必须与原 cue 内容一致（忽略空白差异） */
    var srcChars = cues.map(function (c) { return c.text.replace(/\s+/g, ''); }).join('');
    var outChars = segs.map(function (s) { return segText(s, rule).replace(/\s+/g, ''); }).join('');
    var sameText = srcChars === outChars;

    return {
      cues: out, format: fmt, lang: lang, rule: rule, opts: opts,
      detected: detected,
      stats: {
        before: analyze(cues, rule, 'before'),
        after: analyze(out, rule, 'after'),
        breaksBefore: breakStats(cues, rule),
        breaksAfter: breakStats(out, rule),
        sentences: sents.length,
        deduped: dropped,
        textIntact: sameText,
        /* 文本不守恒时给出第一个不同的位置，方便定位是哪种标点没被认出来 */
        firstDiffAt: sameText ? -1 : firstDiff(srcChars, outChars)
      }
    };
  }

  function firstDiff(a, b) {
    var n = Math.min(a.length, b.length);
    for (var i = 0; i < n; i++) if (a[i] !== b[i]) return i;
    return n;
  }

  /* 只体检不改文本（给「先看看问题有多严重」用） */
  function inspect(src, lang) {
    var raw = String(src || '');
    var cues = parseSrt(raw);
    if (!cues.length) cues = parseVtt(raw);
    if (!cues.length) cues = parseTxt(raw);
    if (!cues.length) return { error: 'nosubs' };
    var L = lang;
    if (!L || L === 'auto') L = detectLang(cues.map(function (c) { return c.text; }).join(' ')).lang;
    var rule = ruleFor(L);
    return {
      cues: cues.length, lang: L, rule: rule,
      metrics: analyze(cues, rule, 'before'),
      breaks: breakStats(cues, rule),
      /* 「跨句」= 一条里含句末标点但不在结尾 ⇒ 一条里塞了两句 */
      crossSentence: cues.filter(function (c) {
        var core = String(c.text).trim();
        for (var i = 0; i < core.length - 1; i++) {
          if (rule.sent.indexOf(core[i]) >= 0) {
            var rest = core.slice(i + 1).replace(/^["'\u201d\u2019)\]]*/, '');
            if (rest && (rule.upper ? /[A-Z\u00c0-\u00de]/.test(rest[0]) : true)) return true;
          }
        }
        return false;
      }).length
    };
  }

  /* ---------- 对外接口 ---------- */
  return {
    /* 语言 */
    LANGS: LANG_ORDER, LANG_EN: LANG_EN, LANG_SELF: LANG_SELF,
    LANG_SCRIPT: LANG_SCRIPT, RTL: RTL_LANGS,
    listLangs: listLangs, langLabel: langLabel, ruleFor: ruleFor,
    detectLang: detectLang, defaultsFor: defaultsFor,
    /* 解析与输出 */
    parseSrt: parseSrt, parseVtt: parseVtt, parseTxt: parseTxt,
    formatSrt: formatSrt, formatVtt: formatVtt, formatTxt: formatTxt,
    fmtTime: fmtTime, fmtTimeVtt: fmtTimeVtt,
    /* 核心步骤（单测可直接调） */
    tokenize: tokenize, joinTokens: joinTokens, spokenLen: spokenLen,
    buildTokens: buildTokens, dedupeTokens: dedupeTokens,
    splitSentences: splitSentences, wrapTwoLines: wrapTwoLines, canWrap: canWrap,
    segCost: segCost, splitParts: splitParts, pack: pack,
    smoothTimes: smoothTimes, analyze: analyze, breakStats: breakStats,
    /* 主入口 */
    realign: realign, inspect: inspect,
    DEFAULTS: DEFAULTS
  };
});
