/* langs100.js —— 站内 100 种语言的元数据（单一数据源）
 *
 * 为什么单独一份：v0.9.338 起「翻译目标语言」有 100 种，但「网站界面语言」只有 27 种。
 * 要把界面语言、SEO、指南内容、sitemap 都扩到 100 种，四套系统必须共用同一份语言清单，
 * 否则一定会出现「下拉里有、sitemap 里没有」「一个语言两种代码」这类静默不一致。
 *
 * 字段：
 *   v      语言代码（= <html lang> = URL 路径段 = hreflang 值）
 *   zh     语言自称（语言切换器上显示的，永远用本语言写，不翻译成中文）
 *   en     英文名（后台 / 日志 / 校验脚本用）
 *   file   文件名里的中文名（导出文件的命名模板用）
 *   dir    ltr / rtl（阿拉伯字母与希伯来字母系为 rtl，页面要加 dir 属性）
 *   cjk    是否中日韩（行宽、字号、断行规则按这个分流）
 *   prompt 翻译提示词里的语言名（与 translate.html 的 LANGS 保持一致）
 *
 * ⚠️ 这份表不改任何老逻辑：site-i18n / SEO_LANGS / content 仍然各走各的 27 语，
 *    要扩哪一块，从这份表里取语言清单即可（详见 memory 里的分批计划）。
 */
'use strict';

const LANGS100 = [
  {
    v: "en",
    zh: "English",
    en: "English",
    file: "英文",
    dir: "ltr",
    cjk: false,
    prompt: "English"
  },
  {
    v: "zh-CN",
    zh: "简体中文",
    en: "Chinese",
    file: "中文",
    dir: "ltr",
    cjk: true,
    prompt: "简体中文 (Simplified Chinese)"
  },
  {
    v: "zh-TW",
    zh: "繁體中文",
    en: "Chinese (Trad.)",
    file: "繁体中文",
    dir: "ltr",
    cjk: true,
    prompt: "繁體中文 (Traditional Chinese)"
  },
  {
    v: "ja",
    zh: "日本語",
    en: "Japanese",
    file: "日文",
    dir: "ltr",
    cjk: true,
    prompt: "Japanese"
  },
  {
    v: "ko",
    zh: "한국어",
    en: "Korean",
    file: "韩文",
    dir: "ltr",
    cjk: true,
    prompt: "Korean"
  },
  {
    v: "fr",
    zh: "Français",
    en: "French",
    file: "法文",
    dir: "ltr",
    cjk: false,
    prompt: "French"
  },
  {
    v: "de",
    zh: "Deutsch",
    en: "German",
    file: "德文",
    dir: "ltr",
    cjk: false,
    prompt: "German"
  },
  {
    v: "es",
    zh: "Español",
    en: "Spanish",
    file: "西文",
    dir: "ltr",
    cjk: false,
    prompt: "Spanish"
  },
  {
    v: "pt",
    zh: "Português",
    en: "Portuguese",
    file: "葡文",
    dir: "ltr",
    cjk: false,
    prompt: "Portuguese"
  },
  {
    v: "it",
    zh: "Italiano",
    en: "Italian",
    file: "意文",
    dir: "ltr",
    cjk: false,
    prompt: "Italian"
  },
  {
    v: "ru",
    zh: "Русский",
    en: "Russian",
    file: "俄文",
    dir: "ltr",
    cjk: false,
    prompt: "Russian"
  },
  {
    v: "ar",
    zh: "العربية",
    en: "Arabic",
    file: "阿文",
    dir: "rtl",
    cjk: false,
    prompt: "Arabic"
  },
  {
    v: "th",
    zh: "ไทย",
    en: "Thai",
    file: "泰文",
    dir: "ltr",
    cjk: false,
    prompt: "Thai"
  },
  {
    v: "vi",
    zh: "Tiếng Việt",
    en: "Vietnamese",
    file: "越文",
    dir: "ltr",
    cjk: false,
    prompt: "Vietnamese"
  },
  {
    v: "id",
    zh: "Bahasa Indonesia",
    en: "Indonesian",
    file: "印尼文",
    dir: "ltr",
    cjk: false,
    prompt: "Indonesian"
  },
  {
    v: "hi",
    zh: "हिन्दी",
    en: "Hindi",
    file: "印地文",
    dir: "ltr",
    cjk: false,
    prompt: "Hindi"
  },
  {
    v: "tr",
    zh: "Türkçe",
    en: "Turkish",
    file: "土文",
    dir: "ltr",
    cjk: false,
    prompt: "Turkish"
  },
  {
    v: "pl",
    zh: "Polski",
    en: "Polish",
    file: "波兰文",
    dir: "ltr",
    cjk: false,
    prompt: "Polish"
  },
  {
    v: "nl",
    zh: "Nederlands",
    en: "Dutch",
    file: "荷兰文",
    dir: "ltr",
    cjk: false,
    prompt: "Dutch"
  },
  {
    v: "ms",
    zh: "Bahasa Melayu",
    en: "Malay",
    file: "马来文",
    dir: "ltr",
    cjk: false,
    prompt: "Malay"
  },
  {
    v: "fil",
    zh: "Filipino",
    en: "Filipino",
    file: "菲律宾文",
    dir: "ltr",
    cjk: false,
    prompt: "Filipino (Tagalog)"
  },
  {
    v: "fa",
    zh: "فارسی",
    en: "Persian",
    file: "波斯文",
    dir: "rtl",
    cjk: false,
    prompt: "Persian (Farsi)"
  },
  {
    v: "sv",
    zh: "Svenska",
    en: "Swedish",
    file: "瑞典文",
    dir: "ltr",
    cjk: false,
    prompt: "Swedish"
  },
  {
    v: "da",
    zh: "Dansk",
    en: "Danish",
    file: "丹麦文",
    dir: "ltr",
    cjk: false,
    prompt: "Danish"
  },
  {
    v: "fi",
    zh: "Suomi",
    en: "Finnish",
    file: "芬兰文",
    dir: "ltr",
    cjk: false,
    prompt: "Finnish"
  },
  {
    v: "nb",
    zh: "Norsk bokmål",
    en: "Norwegian",
    file: "挪威文",
    dir: "ltr",
    cjk: false,
    prompt: "Norwegian Bokmål"
  },
  {
    v: "cs",
    zh: "Čeština",
    en: "Czech",
    file: "捷克文",
    dir: "ltr",
    cjk: false,
    prompt: "Czech"
  },
  {
    v: "sk",
    zh: "Slovenčina",
    en: "Slovak",
    file: "斯洛伐克文",
    dir: "ltr",
    cjk: false,
    prompt: "Slovak"
  },
  {
    v: "hu",
    zh: "Magyar",
    en: "Hungarian",
    file: "匈牙利文",
    dir: "ltr",
    cjk: false,
    prompt: "Hungarian"
  },
  {
    v: "ro",
    zh: "Română",
    en: "Romanian",
    file: "罗马尼亚文",
    dir: "ltr",
    cjk: false,
    prompt: "Romanian"
  },
  {
    v: "ca",
    zh: "Català",
    en: "Catalan",
    file: "加泰罗尼亚文",
    dir: "ltr",
    cjk: false,
    prompt: "Catalan"
  },
  {
    v: "hr",
    zh: "Hrvatski",
    en: "Croatian",
    file: "克罗地亚文",
    dir: "ltr",
    cjk: false,
    prompt: "Croatian"
  },
  {
    v: "el",
    zh: "Ελληνικά",
    en: "Greek",
    file: "希腊文",
    dir: "ltr",
    cjk: false,
    prompt: "Greek"
  },
  {
    v: "uk",
    zh: "Українська",
    en: "Ukrainian",
    file: "乌克兰文",
    dir: "ltr",
    cjk: false,
    prompt: "Ukrainian"
  },
  {
    v: "sr",
    zh: "Српски",
    en: "Serbian",
    file: "塞尔维亚文",
    dir: "ltr",
    cjk: false,
    prompt: "Serbian"
  },
  {
    v: "bg",
    zh: "Български",
    en: "Bulgarian",
    file: "保加利亚文",
    dir: "ltr",
    cjk: false,
    prompt: "Bulgarian"
  },
  {
    v: "he",
    zh: "עברית",
    en: "Hebrew",
    file: "希伯来文",
    dir: "rtl",
    cjk: false,
    prompt: "Hebrew"
  },
  {
    v: "ur",
    zh: "اردو",
    en: "Urdu",
    file: "乌尔都文",
    dir: "rtl",
    cjk: false,
    prompt: "Urdu"
  },
  {
    v: "bn",
    zh: "বাংলা",
    en: "Bengali",
    file: "孟加拉文",
    dir: "ltr",
    cjk: false,
    prompt: "Bengali"
  },
  {
    v: "ta",
    zh: "தமிழ்",
    en: "Tamil",
    file: "泰米尔文",
    dir: "ltr",
    cjk: false,
    prompt: "Tamil"
  },
  {
    v: "te",
    zh: "తెలుగు",
    en: "Telugu",
    file: "泰卢固文",
    dir: "ltr",
    cjk: false,
    prompt: "Telugu"
  },
  {
    v: "mr",
    zh: "मराठी",
    en: "Marathi",
    file: "马拉地文",
    dir: "ltr",
    cjk: false,
    prompt: "Marathi"
  },
  {
    v: "ne",
    zh: "नेपाली",
    en: "Nepali",
    file: "尼泊尔文",
    dir: "ltr",
    cjk: false,
    prompt: "Nepali"
  },
  {
    v: "si",
    zh: "සිංහල",
    en: "Sinhala",
    file: "僧伽罗文",
    dir: "ltr",
    cjk: false,
    prompt: "Sinhala"
  },
  {
    v: "my",
    zh: "မြန်မာ",
    en: "Burmese",
    file: "缅甸文",
    dir: "ltr",
    cjk: false,
    prompt: "Burmese (Myanmar)"
  },
  {
    v: "km",
    zh: "ខ្មែរ",
    en: "Khmer",
    file: "高棉文",
    dir: "ltr",
    cjk: false,
    prompt: "Khmer (Cambodian)"
  },
  {
    v: "lo",
    zh: "ລາວ",
    en: "Lao",
    file: "老挝文",
    dir: "ltr",
    cjk: false,
    prompt: "Lao"
  },
  {
    v: "sw",
    zh: "Kiswahili",
    en: "Swahili",
    file: "斯瓦希里文",
    dir: "ltr",
    cjk: false,
    prompt: "Swahili"
  },
  {
    v: "gu",
    zh: "ગુજરાતી",
    en: "Gujarati",
    file: "古吉拉特文",
    dir: "ltr",
    cjk: false,
    prompt: "Gujarati"
  },
  {
    v: "kn",
    zh: "ಕನ್ನಡ",
    en: "Kannada",
    file: "卡纳达文",
    dir: "ltr",
    cjk: false,
    prompt: "Kannada"
  },
  {
    v: "ml",
    zh: "മലയാളം",
    en: "Malayalam",
    file: "马拉雅拉姆文",
    dir: "ltr",
    cjk: false,
    prompt: "Malayalam"
  },
  {
    v: "pa",
    zh: "ਪੰਜਾਬੀ",
    en: "Punjabi",
    file: "旁遮普文",
    dir: "ltr",
    cjk: false,
    prompt: "Punjabi (Gurmukhi)"
  },
  {
    v: "or",
    zh: "ଓଡ଼ିଆ",
    en: "Odia",
    file: "奥里亚文",
    dir: "ltr",
    cjk: false,
    prompt: "Odia (Oriya)"
  },
  {
    v: "as",
    zh: "অসমীয়া",
    en: "Assamese",
    file: "阿萨姆文",
    dir: "ltr",
    cjk: false,
    prompt: "Assamese"
  },
  {
    v: "kk",
    zh: "Қазақша",
    en: "Kazakh",
    file: "哈萨克文",
    dir: "ltr",
    cjk: false,
    prompt: "Kazakh"
  },
  {
    v: "uz",
    zh: "O‘zbekcha",
    en: "Uzbek",
    file: "乌兹别克文",
    dir: "ltr",
    cjk: false,
    prompt: "Uzbek"
  },
  {
    v: "mn",
    zh: "Монгол",
    en: "Mongolian",
    file: "蒙古文",
    dir: "ltr",
    cjk: false,
    prompt: "Mongolian"
  },
  {
    v: "az",
    zh: "Azərbaycan",
    en: "Azerbaijani",
    file: "阿塞拜疆文",
    dir: "ltr",
    cjk: false,
    prompt: "Azerbaijani"
  },
  {
    v: "is",
    zh: "Íslenska",
    en: "Icelandic",
    file: "冰岛文",
    dir: "ltr",
    cjk: false,
    prompt: "Icelandic"
  },
  {
    v: "et",
    zh: "Eesti",
    en: "Estonian",
    file: "爱沙尼亚文",
    dir: "ltr",
    cjk: false,
    prompt: "Estonian"
  },
  {
    v: "lv",
    zh: "Latviešu",
    en: "Latvian",
    file: "拉脱维亚文",
    dir: "ltr",
    cjk: false,
    prompt: "Latvian"
  },
  {
    v: "lt",
    zh: "Lietuvių",
    en: "Lithuanian",
    file: "立陶宛文",
    dir: "ltr",
    cjk: false,
    prompt: "Lithuanian"
  },
  {
    v: "sl",
    zh: "Slovenščina",
    en: "Slovenian",
    file: "斯洛文尼亚文",
    dir: "ltr",
    cjk: false,
    prompt: "Slovenian"
  },
  {
    v: "sq",
    zh: "Shqip",
    en: "Albanian",
    file: "阿尔巴尼亚文",
    dir: "ltr",
    cjk: false,
    prompt: "Albanian"
  },
  {
    v: "mk",
    zh: "Македонски",
    en: "Macedonian",
    file: "马其顿文",
    dir: "ltr",
    cjk: false,
    prompt: "Macedonian"
  },
  {
    v: "eu",
    zh: "Euskara",
    en: "Basque",
    file: "巴斯克文",
    dir: "ltr",
    cjk: false,
    prompt: "Basque"
  },
  {
    v: "gl",
    zh: "Galego",
    en: "Galician",
    file: "加利西亚文",
    dir: "ltr",
    cjk: false,
    prompt: "Galician"
  },
  {
    v: "am",
    zh: "አማርኛ",
    en: "Amharic",
    file: "阿姆哈拉文",
    dir: "ltr",
    cjk: false,
    prompt: "Amharic"
  },
  {
    v: "ha",
    zh: "Hausa",
    en: "Hausa",
    file: "豪萨文",
    dir: "ltr",
    cjk: false,
    prompt: "Hausa"
  },
  {
    v: "yo",
    zh: "Yorùbá",
    en: "Yoruba",
    file: "约鲁巴文",
    dir: "ltr",
    cjk: false,
    prompt: "Yoruba"
  },
  {
    v: "zu",
    zh: "isiZulu",
    en: "Zulu",
    file: "祖鲁文",
    dir: "ltr",
    cjk: false,
    prompt: "Zulu"
  },
  {
    v: "so",
    zh: "Soomaali",
    en: "Somali",
    file: "索马里文",
    dir: "ltr",
    cjk: false,
    prompt: "Somali"
  },
  {
    v: "ps",
    zh: "پښتو",
    en: "Pashto",
    file: "普什图文",
    dir: "rtl",
    cjk: false,
    prompt: "Pashto"
  },
  {
    v: "ku",
    zh: "کوردی",
    en: "Kurdish",
    file: "库尔德文",
    dir: "rtl",
    cjk: false,
    prompt: "Kurdish (Sorani)"
  },
  {
    v: "af",
    zh: "Afrikaans",
    en: "Afrikaans",
    file: "南非荷兰文",
    dir: "ltr",
    cjk: false,
    prompt: "Afrikaans"
  },
  {
    v: "yue",
    zh: "粵語",
    en: "Cantonese",
    file: "粤文",
    dir: "ltr",
    cjk: true,
    prompt: "Cantonese (Yue)"
  },
  {
    v: "be",
    zh: "Беларуская",
    en: "Belarusian",
    file: "白俄罗斯文",
    dir: "ltr",
    cjk: false,
    prompt: "Belarusian"
  },
  {
    v: "tg",
    zh: "Тоҷикӣ",
    en: "Tajik",
    file: "塔吉克文",
    dir: "ltr",
    cjk: false,
    prompt: "Tajik"
  },
  {
    v: "ky",
    zh: "Кыргызча",
    en: "Kyrgyz",
    file: "吉尔吉斯文",
    dir: "ltr",
    cjk: false,
    prompt: "Kyrgyz"
  },
  {
    v: "tk",
    zh: "Türkmençe",
    en: "Turkmen",
    file: "土库曼文",
    dir: "ltr",
    cjk: false,
    prompt: "Turkmen"
  },
  {
    v: "bs",
    zh: "Bosanski",
    en: "Bosnian",
    file: "波斯尼亚文",
    dir: "ltr",
    cjk: false,
    prompt: "Bosnian"
  },
  {
    v: "mt",
    zh: "Malti",
    en: "Maltese",
    file: "马耳他文",
    dir: "ltr",
    cjk: false,
    prompt: "Maltese"
  },
  {
    v: "cy",
    zh: "Cymraeg",
    en: "Welsh",
    file: "威尔士文",
    dir: "ltr",
    cjk: false,
    prompt: "Welsh"
  },
  {
    v: "ga",
    zh: "Gaeilge",
    en: "Irish",
    file: "爱尔兰文",
    dir: "ltr",
    cjk: false,
    prompt: "Irish"
  },
  {
    v: "hy",
    zh: "Հայերեն",
    en: "Armenian",
    file: "亚美尼亚文",
    dir: "ltr",
    cjk: false,
    prompt: "Armenian"
  },
  {
    v: "ka",
    zh: "ქართული",
    en: "Georgian",
    file: "格鲁吉亚文",
    dir: "ltr",
    cjk: false,
    prompt: "Georgian"
  },
  {
    v: "ti",
    zh: "ትግርኛ",
    en: "Tigrinya",
    file: "提格利尼亚文",
    dir: "ltr",
    cjk: false,
    prompt: "Tigrinya"
  },
  {
    v: "bo",
    zh: "བོད་སྐད",
    en: "Tibetan",
    file: "藏文",
    dir: "ltr",
    cjk: false,
    prompt: "Tibetan"
  },
  {
    v: "ug",
    zh: "ئۇيغۇرچە",
    en: "Uyghur",
    file: "维吾尔文",
    dir: "rtl",
    cjk: false,
    prompt: "Uyghur"
  },
  {
    v: "sd",
    zh: "سنڌي",
    en: "Sindhi",
    file: "信德文",
    dir: "rtl",
    cjk: false,
    prompt: "Sindhi"
  },
  {
    v: "yi",
    zh: "ייִדיש",
    en: "Yiddish",
    file: "意第绪文",
    dir: "rtl",
    cjk: false,
    prompt: "Yiddish"
  },
  {
    v: "jv",
    zh: "Basa Jawa",
    en: "Javanese",
    file: "爪哇文",
    dir: "ltr",
    cjk: false,
    prompt: "Javanese"
  },
  {
    v: "su",
    zh: "Basa Sunda",
    en: "Sundanese",
    file: "巽他文",
    dir: "ltr",
    cjk: false,
    prompt: "Sundanese"
  },
  {
    v: "ceb",
    zh: "Cebuano",
    en: "Cebuano",
    file: "宿务文",
    dir: "ltr",
    cjk: false,
    prompt: "Cebuano"
  },
  {
    v: "mg",
    zh: "Malagasy",
    en: "Malagasy",
    file: "马达加斯加文",
    dir: "ltr",
    cjk: false,
    prompt: "Malagasy"
  },
  {
    v: "ig",
    zh: "Igbo",
    en: "Igbo",
    file: "伊博文",
    dir: "ltr",
    cjk: false,
    prompt: "Igbo"
  },
  {
    v: "xh",
    zh: "isiXhosa",
    en: "Xhosa",
    file: "科萨文",
    dir: "ltr",
    cjk: false,
    prompt: "Xhosa"
  },
  {
    v: "sn",
    zh: "chiShona",
    en: "Shona",
    file: "绍纳文",
    dir: "ltr",
    cjk: false,
    prompt: "Shona"
  },
  {
    v: "ny",
    zh: "Chichewa",
    en: "Chichewa",
    file: "齐切瓦文",
    dir: "ltr",
    cjk: false,
    prompt: "Chichewa (Nyanja)"
  },
  {
    v: "mi",
    zh: "Māori",
    en: "Maori",
    file: "毛利文",
    dir: "ltr",
    cjk: false,
    prompt: "Māori (Te Reo)"
  }
]
;

/* ---------- 便捷索引 ---------- */
const BY_CODE = {};
LANGS100.forEach(function (l) { BY_CODE[l.v] = l; });

/* 与既有 27 语界面语言的重合部分（扩界面时用来避免重复劳动） */
const UI27 = ['zh-CN', 'zh-TW', 'en', 'ja', 'es', 'pt', 'ko', 'de', 'fr', 'id', 'hi', 'th', 'vi',
  'ru', 'it', 'ar', 'tr', 'nl', 'pl', 'sv', 'cs', 'uk', 'da', 'fi', 'el', 'he', 'ro'];

module.exports = {
  LANGS100: LANGS100,
  BY_CODE: BY_CODE,
  UI27: UI27,
  RTL: LANGS100.filter(function (l) { return l.dir === 'rtl'; }).map(function (l) { return l.v; }),
  CJK: LANGS100.filter(function (l) { return l.cjk; }).map(function (l) { return l.v; }),
  NEW73: LANGS100.map(function (l) { return l.v; }).filter(function (v) { return UI27.indexOf(v) < 0; })
};
