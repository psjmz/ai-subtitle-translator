/* _mk_topnav.js —— 生成 site-topnav.js（v0.9.318 大 Mega 下拉版，非交付件）
   词典三路：
   ① 15 个工具名 navXx × 27 语 —— 从 split-i18n.js 收割（全站「同名同译」，真翻 27 语；
      site-i18n.js 的 tcXxN 在 24 语是回退英文，不用它）；
   ② 13 个工具一句话描述 tcXxD × 27 语 —— 从 site-i18n.js 收割（与首页工具卡片同文案，
      真翻 27 语，Mega 菜单直接复用，不再造一轮翻译）；
   ③ 7 个手写键 × 27 语：tnVd 视频下载 / tnMore 更多工具 / tnG1..tnG4 四组名 / tnAll 全部工具。
   视觉（用户 2026-10-15 定案，推倒 317 的「小 pills + 两列纯文字下拉」）：
   · 主项字幕翻译/特效字幕 = 克制文字链，当前页吃页面主题色（--acc-ink/--acc-weak）；
   · 视频下载 = 推广位：品牌渐变实心 pill（#E12D6E→#8B5CF6）+ 下载图标 + 外链箭头，
     用户原话「不用低调，我要推广这个工具」；
   · 更多工具 = Mega 下拉：四列 × 13 工具，每项「主题色图标 + 名称 + 一句话描述」，
     面板底栏一条「全部工具 →」回首页工具区；
   · 主题色用各工具页自己的 --acc/--acc-weak（全站一致，图标不会串色）。
   生成物自包含、零依赖：不引 site-i18n.js / site-nav.js。
   跑法：node _mk_topnav.js  （改词典/配色/图标后重跑本脚本即可再生成） */
'use strict';
const fs = require('fs');
const vm = require('vm');

/* ---------- ① 收割 split-i18n.js 的 navXx × 27 ---------- */
const ctx = {};
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(__dirname + '/split-i18n.js', 'utf8'), ctx);
const DICT = ctx.SPLIT_I18N.DICT;
const LANGS = ctx.SPLIT_I18N.LANGS.map(x => x[0]);
if (LANGS.length !== 27) { console.log('FATAL 语言块数 ' + LANGS.length); process.exit(1); }

/* ⚠️ 后两个是后来加进来的，一度只改了 site-topnav.js 没同步这里：
     navQc —— v0.9.321 第十四个工具「字幕质检」；
     navGuide —— v0.9.323「使用指南」顶栏直出（/guides/）。
     结果 2026-10-19 重跑本脚本把它们整段删掉过一次，现补回。 */
const NAV_KEYS = ['navTr', 'navGuide', 'navFx', 'navCv', 'navTbl', 'navHc', 'navSp', 'navSplt', 'navSh', 'navCl', 'navLrc', 'navEx', 'navVs', 'navRp', 'navGl', 'navBt', 'navQc'];
/* ---------------------------------------------------------------------------
   手定 27 语：这三个键在 split-i18n.js / site-i18n.js 里都收不到，只能写死。
   ⚠️ 教训（2026-10-19）：v0.9.321 加「字幕质检」、v0.9.323 加「使用指南」时
      只改了 site-topnav.js，没同步本生成器。结果十年后重跑一次生成器就把这两项
      连同它们的词典整段删掉 —— 顶栏凭空少两个入口。所以这两个键在这里落定。
   --------------------------------------------------------------------------- */
const HAND = {
  /* 顶栏「使用指南」用复数口径（en 'Guides' / es 'Guías' / ja '使い方ガイド'），
     与 site-i18n.js 里的单数键（en 'Guide' / ja '使い方'）不是一回事，不能从那边收割。
     73 种新语言由 tnav-<lang>.js 分片补翻，口径跟着这里的复数走。 */
  navGuide: {
    'zh-CN': '使用指南', 'zh-TW': '使用指南', 'en': 'Guides', 'ja': '使い方ガイド',
    'es': 'Guías', 'pt': 'Guias', 'ko': '사용 가이드', 'de': 'Anleitungen',
    'fr': 'Guides', 'id': 'Panduan', 'hi': 'गाइड', 'th': 'คู่มือ',
    'vi': 'Hướng dẫn', 'ru': 'Руководства', 'it': 'Guide', 'ar': 'أدلة',
    'tr': 'Kılavuzlar', 'nl': 'Gidsen', 'pl': 'Poradniki', 'sv': 'Guider',
    'cs': 'Návody', 'uk': 'Посібники', 'da': 'Vejledninger', 'fi': 'Oppaat',
    'el': 'Οδηγοί', 'he': 'מדריכים', 'ro': 'Ghiduri'
  },
  navQc: {
    'zh-CN': '字幕质检', 'zh-TW': '字幕質檢', 'en': 'QC', 'ja': '字幕QC',
    'es': 'Control', 'pt': 'Controlo', 'ko': '자막 검수', 'de': 'Prüfung',
    'fr': 'Contrôle', 'id': 'Pemeriksaan', 'hi': 'जाँच', 'th': 'ตรวจสอบ',
    'vi': 'Kiểm tra', 'ru': 'Проверка', 'it': 'Controllo', 'ar': 'فحص',
    'tr': 'Denetim', 'nl': 'Controle', 'pl': 'Kontrola', 'sv': 'Kontroll',
    'cs': 'Kontrola', 'uk': 'Перевірка', 'da': 'Kontrol', 'fi': 'Tarkistus',
    'el': 'Έλεγχος', 'he': 'בדיקה', 'ro': 'Verificare'
  },
  tcQcD: {
    'zh-CN': '按这门语言的规矩查时间轴与排版', 'zh-TW': '依這門語言的規矩檢查時間軸與排版',
    'en': "Check timing and layout by that language's rules",
    'ja': 'その言語の規則でタイミングと組み版を検査',
    'es': 'Comprueba tiempo y maquetación con las reglas del idioma',
    'pt': 'Verifica tempo e formatação com as regras do idioma',
    'ko': '그 언어 규칙으로 타임라인과 줄바꿈 검사',
    'de': 'Timing und Satz nach den Regeln der Sprache prüfen',
    'fr': 'Vérifie timing et mise en page selon les règles de la langue',
    'id': 'Periksa timing dan tata letak sesuai aturan bahasanya',
    'hi': 'उस भाषा के नियमों से समय और लेआउट जाँचें',
    'th': 'ตรวจเวลาและการจัดวางตามกฎของภาษานั้น',
    'vi': 'Kiểm tra thời gian và bố cục theo quy tắc ngôn ngữ',
    'ru': 'Проверит тайминг и вёрстку по правилам языка',
    'it': 'Controlla timing e impaginazione secondo le regole della lingua',
    'ar': 'يفحص التوقيت والتنسيق حسب قواعد اللغة',
    'tr': 'Zamanlama ve dizgiyi dilin kurallarına göre denetler',
    'nl': 'Controleert timing en opmaak volgens de regels van de taal',
    'pl': 'Sprawdza czas i układ według reguł języka',
    'sv': 'Kontrollerar timing och layout enligt språkets regler',
    'cs': 'Zkontroluje timing a sazbu podle pravidel jazyka',
    'uk': 'Перевіряє таймінг і верстку за правилами мови',
    'da': 'Kontrollerer timing og layout efter sprogets regler',
    'fi': 'Tarkistaa ajoituksen ja asettelun kielen sääntöjen mukaan',
    'el': 'Ελέγχει χρονισμό και στοίχιση σύμφωνα με τους κανόνες της γλώσσας',
    'he': 'בודק תזמון ועימוד לפי כללי השפה',
    'ro': 'Verifică timingul și aspectul după regulile limbii'
  }
};
/* 收割校验要排除手定键，否则一定 FATAL */
const NAV_HARVEST = NAV_KEYS.filter(k => !HAND[k]);
for (const l of LANGS) for (const k of NAV_HARVEST) {
  if (!DICT[l] || !DICT[l][k]) { console.log('FATAL 收割缺 ' + l + '.' + k); process.exit(1); }
}
for (const k of Object.keys(HAND)) for (const l of LANGS) {
  if (!HAND[k][l]) { console.log('FATAL 手定键缺 ' + k + '.' + l); process.exit(1); }
}

/* ---------- ② 收割 site-i18n.js 的 tcXxD（首页卡片描述）× 27 ---------- */
const ctx2 = { window: {} };
vm.createContext(ctx2);
/* ⚠️ UI_LANGS 要在脚本尾部显式导出：它是 site-i18n.js 里的 var，
   不挂到 window 上，runInContext 之后从 ctx2 直接读不到（实测 undefined）。 */
vm.runInContext(fs.readFileSync(__dirname + '/site-i18n.js', 'utf8') +
  ';globalThis.__UI = UI_LANGS;', ctx2);
const SI = ctx2.window.SiteI18N.I18N;
/* 100 种界面语言代码：写进生成物，让顶栏的语言判定跟得上 339 的扩容 */
const UI100 = ctx2.__UI.map(x => x[0]);
if (UI100.length !== 100) { console.log('FATAL UI_LANGS 不是 100 语：' + UI100.length); process.exit(1); }
/* qc 与上面 navQc 同批（v0.9.321），同样是「改了产物没改这里」漏掉的 */
const DESC_KEYS = { cv: 'tcCvD', tb: 'tcTbD', hc: 'tcHcD', bi: 'tcBiD', sp: 'tcSpD', sh: 'tcShD', cl: 'tcClD', lr: 'tcLrD', ex: 'tcExD', vs: 'tcVsD', rp: 'tcRpD', gl: 'tcGlD', bt: 'tcBtD', qc: 'tcQcD' };
for (const l of LANGS) for (const id of Object.keys(DESC_KEYS)) {
  const k = DESC_KEYS[id];
  if (!SI[l] || !SI[l][k]) { console.log('FATAL 描述收割缺 ' + l + '.' + k); process.exit(1); }
}

/* ---------- ③ 手写 7 键 × 27 ---------- */
const MY = {
  tnVd: {
    'zh-CN': '视频下载', 'zh-TW': '影片下載', 'en': 'Download Video', 'ja': '動画ダウンロード',
    'es': 'Descargar vídeo', 'pt': 'Baixar vídeo', 'ko': '동영상 다운로드', 'de': 'Video herunterladen',
    'fr': 'Télécharger la vidéo', 'id': 'Unduh Video', 'hi': 'वीडियो डाउनलोड', 'th': 'ดาวน์โหลดวิดีโอ',
    'vi': 'Tải video', 'ru': 'Скачать видео', 'it': 'Scarica video', 'ar': 'تنزيل الفيديو',
    'tr': 'Video İndir', 'nl': 'Video downloaden', 'pl': 'Pobierz wideo', 'sv': 'Hämta video',
    'cs': 'Stáhnout video', 'uk': 'Завантажити відео', 'da': 'Download video', 'fi': 'Lataa video',
    'el': 'Λήψη βίντεο', 'he': 'הורדת וידאו', 'ro': 'Descarcă video'
  },
  tnMore: {
    'zh-CN': '更多工具', 'zh-TW': '更多工具', 'en': 'More Tools', 'ja': 'その他のツール',
    'es': 'Más herramientas', 'pt': 'Mais ferramentas', 'ko': '더 많은 도구', 'de': 'Weitere Tools',
    'fr': "Plus d'outils", 'id': 'Alat Lainnya', 'hi': 'और टूल', 'th': 'เครื่องมืออื่น ๆ',
    'vi': 'Công cụ khác', 'ru': 'Ещё инструменты', 'it': 'Altri strumenti', 'ar': 'المزيد من الأدوات',
    'tr': 'Diğer Araçlar', 'nl': 'Meer tools', 'pl': 'Więcej narzędzi', 'sv': 'Fler verktyg',
    'cs': 'Další nástroje', 'uk': 'Інші інструменти', 'da': 'Flere værktøjer', 'fi': 'Lisää työkaluja',
    'el': 'Περισσότερα εργαλεία', 'he': 'כלים נוספים', 'ro': 'Mai multe instrumente'
  },
  tnG1: {
    'zh-CN': '转换与格式', 'zh-TW': '轉換與格式', 'en': 'Convert & Format', 'ja': '変換・フォーマット',
    'es': 'Conversión y formato', 'pt': 'Conversão e formato', 'ko': '변환 및 형식', 'de': 'Umwandlung & Format',
    'fr': 'Conversion et format', 'id': 'Konversi & Format', 'hi': 'रूपांतरण और प्रारूप', 'th': 'แปลงและรูปแบบ',
    'vi': 'Chuyển đổi và định dạng', 'ru': 'Конвертация и форматы', 'it': 'Conversione e formato',
    'ar': 'التحويل والصيغ', 'tr': 'Dönüştürme ve Biçim', 'nl': 'Conversie & formaat', 'pl': 'Konwersja i formaty',
    'sv': 'Konvertering & format', 'cs': 'Převod a formáty', 'uk': 'Конвертація та формати',
    'da': 'Konvertering & formater', 'fi': 'Muunnos ja muodot', 'el': 'Μετατροπή και μορφές',
    'he': 'המרה ופורמטים', 'ro': 'Conversie și formate'
  },
  tnG2: {
    'zh-CN': '双语与拆合', 'zh-TW': '雙語與拆合', 'en': 'Bilingual & Split', 'ja': '二か国語・分割',
    'es': 'Bilingüe y división', 'pt': 'Bilíngue e divisão', 'ko': '이중 자막 및 분할', 'de': 'Zweisprachig & Aufteilen',
    'fr': 'Bilingue et découpage', 'id': 'Dwibahasa & Pisah', 'hi': 'द्विभाषी और विभाजन', 'th': 'สองภาษาและการแบ่ง',
    'vi': 'Song ngữ và tách gộp', 'ru': 'Двуязычные и разделение', 'it': 'Bilingue e divisione',
    'ar': 'ثنائي اللغة والتجزئة', 'tr': 'İki Dilli ve Bölme', 'nl': 'Tweetalig & splitsen', 'pl': 'Dwujęzyczne i dzielenie',
    'sv': 'Tvåspråkigt & dela', 'cs': 'Dvojjazyčné a dělení', 'uk': 'Двомовні та розділення',
    'da': 'Tosproget & deling', 'fi': 'Kaksikielinen ja jako', 'el': 'Δίγλωσσο και διαχωρισμός',
    'he': 'דו-לשוני ופיצול', 'ro': 'Bilingv și separare'
  },
  tnG3: {
    'zh-CN': '时间轴与清理', 'zh-TW': '時間軸與清理', 'en': 'Timing & Cleanup', 'ja': '時間軸・クリーニング',
    'es': 'Tiempo y limpieza', 'pt': 'Tempo e limpeza', 'ko': '타임라인 및 정리', 'de': 'Zeitachse & Bereinigung',
    'fr': 'Synchronisation et nettoyage', 'id': 'Waktu & Pembersihan', 'hi': 'टाइमिंग और सफ़ाई', 'th': 'ไทม์ไลน์และการทำความสะอาด',
    'vi': 'Thời gian và dọn dẹp', 'ru': 'Тайминг и очистка', 'it': 'Timing e pulizia', 'ar': 'التوقيت والتنظيف',
    'tr': 'Zamanlama ve Temizlik', 'nl': 'Timing & opschonen', 'pl': 'Czas i czyszczenie', 'sv': 'Tidsaxel & städning',
    'cs': 'Časování a čištění', 'uk': 'Таймінг і очищення', 'da': 'Tidslinje & oprydning', 'fi': 'Aikajana ja siivous',
    'el': 'Χρονισμός και καθαρισμός', 'he': 'תזמון וניקוי', 'ro': 'Timp și curățare'
  },
  tnG4: {
    'zh-CN': '提取与批量', 'zh-TW': '擷取與批次', 'en': 'Extract & Batch', 'ja': '抽出・一括',
    'es': 'Extracción y lotes', 'pt': 'Extração e lote', 'ko': '추출 및 일괄', 'de': 'Extraktion & Stapel',
    'fr': 'Extraction et lot', 'id': 'Ekstrak & Batch', 'hi': 'निष्कर्षण और बैच', 'th': 'ดึงข้อมูลและชุดงาน',
    'vi': 'Trích xuất và hàng loạt', 'ru': 'Извлечение и пакет', 'it': 'Estrazione e batch', 'ar': 'الاستخراج والدُفعات',
    'tr': 'Çıkarma ve Toplu', 'nl': 'Extractie & batch', 'pl': 'Ekstrakcja i wsad', 'sv': 'Extraktion & batch',
    'cs': 'Extrakce a dávka', 'uk': 'Витяг і пакет', 'da': 'Udtræk & batch', 'fi': 'Poimi ja eräajo',
    'el': 'Εξαγωγή και δέσμη', 'he': 'חילוץ ואצווה', 'ro': 'Extragere și lot'
  },
  tnAll: {
    'zh-CN': '全部工具', 'zh-TW': '全部工具', 'en': 'All tools', 'ja': 'すべてのツール',
    'es': 'Todas las herramientas', 'pt': 'Todas as ferramentas', 'ko': '모든 도구', 'de': 'Alle Tools',
    'fr': 'Tous les outils', 'id': 'Semua alat', 'hi': 'सभी टूल', 'th': 'เครื่องมือทั้งหมด',
    'vi': 'Tất cả công cụ', 'ru': 'Все инструменты', 'it': 'Tutti gli strumenti', 'ar': 'جميع الأدوات',
    'tr': 'Tüm Araçlar', 'nl': 'Alle tools', 'pl': 'Wszystkie narzędzia', 'sv': 'Alla verktyg',
    'cs': 'Všechny nástroje', 'uk': 'Всі інструменти', 'da': 'Alle værktøjer', 'fi': 'Kaikki työkalut',
    'el': 'Όλα τα εργαλεία', 'he': 'כל הכלים', 'ro': 'Toate instrumentele'
  }
};
for (const k of Object.keys(MY)) for (const l of LANGS) {
  if (!MY[k][l]) { console.log('FATAL 手写缺 ' + k + '.' + l); process.exit(1); }
}

/* ---------- 图标（24 视图，stroke 风格；currentColor 由外层 --tc 控制） ---------- */
const ICONS = {
  cv: '<path d="M4 8h13"/><path d="m14 5 3 3-3 3"/><path d="M20 16H7"/><path d="m10 13-3 3 3 3"/>',
  tb: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 10h18"/><path d="M3 15h18"/><path d="M9 10v10"/>',
  hc: '<path d="m5 8 6 6"/><path d="M4 14l6-6 2-3"/><path d="M2 5h12"/><path d="M7 2h1"/><path d="m22 22-5-10-5 10"/><path d="M14 18h6"/>',
  bi: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M12 4v16"/><path d="M9.5 12H7"/><path d="m9 10-2 2 2 2"/><path d="M14.5 12H17"/><path d="m15 10 2 2-2 2"/>',
  sp: '<circle cx="6" cy="6" r="2.6"/><circle cx="6" cy="18" r="2.6"/><path d="M8.2 7.5 19 19"/><path d="M8.2 16.5 19 5"/>',
  sh: '<path d="M3 12h18"/><path d="M6 8v8"/><path d="M18 8v8"/><circle cx="12" cy="12" r="2.2"/>',
  cl: '<path d="M12 3l1.8 4.7L18.5 9.5 13.8 11.3 12 16l-1.8-4.7L5.5 9.5l4.7-1.8z"/><path d="M19 15l.9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9z"/>',
  lr: '<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',
  ex: '<path d="M4 4h16"/><path d="M4 9h9"/><path d="M4 14h6"/><path d="M14 13v6"/><path d="m11 16 3 3 3-3"/>',
  vs: '<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M10 8.4 15.4 10 10 11.6z" fill="currentColor" stroke="none"/><path d="M8 20h8"/><path d="M12 16v4"/>',
  rp: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
  gl: '<path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>',
  /* v0.9.321 字幕质检：放大镜 + 勾 */
  qc: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.6-3.6"/><path d="m8.4 11.2 2 2 3.6-3.6"/>',
  bt: '<path d="m12 2 9 4.5-9 4.5-9-4.5z"/><path d="m3 11.5 9 4.5 9-4.5"/><path d="m3 16.5 9 4.5 9-4.5"/>',
  dl: '<path d="M12 4v11"/><path d="m7 10 5 5 5-5"/><path d="M4 20h16"/>',
  ext: '<path d="M7 17 17 7"/><path d="M9 7h8v8"/>',
  arr: '<path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>',
  caret: '<path d="m6 9 6 6 6-6"/>'
};

/* ---------- 拼 JS 字面量（单引号风格，转义 ' 与 \） ---------- */
const q = s => "'" + String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'") + "'";
function dictSrc(obj, comment) {
  /* obj 形态：{ 词条键: { 语言: 值 } }；语言块键含 '-'，必须带引号 */
  const out = [];
  for (const l of LANGS) {
    const kv = [];
    for (const k of Object.keys(obj)) kv.push(k + ': ' + q(obj[k][l]));
    out.push('    ' + q(l) + ': { ' + kv.join(', ') + ' }');
  }
  return '  ' + comment + '\n' + out.join(',\n');
}

const names = {};   /* 17 工具名 ×27 → {词条键:{语言:值}} */
for (const k of NAV_KEYS) {
  names[k] = {};
  for (const l of LANGS) names[k][l] = HAND[k] ? HAND[k][l] : DICT[l][k];
}
const descs = {};   /* 14 描述 ×27（键名沿用 site-i18n 的 tcXxD） */
for (const id of Object.keys(DESC_KEYS)) {
  const k = DESC_KEYS[id];
  descs[k] = {};
  for (const l of LANGS) descs[k][l] = HAND[k] ? HAND[k][l] : SI[l][k];
}

/* ---------- 组装生成物（数组 join，避开模板 literal 的转义地狱） ---------- */
const O = [];
O.push(`/* =============================================================================
   site-topnav.js —— 全站统一顶部导航（v0.9.318，大 Mega 下拉版）

   四个主项（从左到右）：字幕翻译 · 特效字幕 · 视频下载 · 更多工具 ▾
   · 视频下载 = RiseKol 外链（新标签），用户定案「推广位」：品牌渐变实心 pill，
     全栏视觉重心，不做低调处理；
   · 更多工具 = Mega 下拉：14 个工具分四列，每项「主题色图标 + 名称 + 一句话描述」，
     底栏一条「全部工具 →」回首页工具区。主题色 = 各工具页自己的 --acc/--acc-weak。

   用户定案沿革：v0.9.317 首版（小 pills + 两列纯文字下拉）被否——「像系统右键菜单」；
   v0.9.318 推倒重做（本版）。标签口径：317「更多字幕工具」→ 318「更多工具」。

   用法（页面侧只需两处）：
     1) 在页头放占位：<span id="topNav"></span>
     2) body 末尾引入：<script src="site-topnav.js?v=0.9.318" data-tool="tr"><\\/script>
        data-tool 填本页 id（tr/fx/gd/cv/tb/hc/bi/sp/sh/cl/lr/ex/vs/rp/gl/bt/qc；首页留空），
        当前页在主项与下拉里都会高亮。

   词典来源：
     · 17 个工具名 navXx × 27 语 —— 收割自 split-i18n.js（全站同名同译，真翻 27 语）；
       其中 navGuide / navQc 两键那边没有，落在本生成器的 HAND 里（见后）；
     · 14 个一句话描述 tcXxD × 27 语 —— 收割自 site-i18n.js（与首页工具卡片同文案）；
       其中 tcQcD 同样落在 HAND 里；
     · 7 个手写键（tnVd/tnMore/tnG1..tnG4/tnAll）× 27 语。
   本文件自包含、零依赖，不引 site-i18n.js / site-nav.js；
   改词典/配色/图标 → 改 _mk_topnav.js → 重跑生成 → 三副本同步。

   v0.9.339：界面语言 27 → 100。上面三张表只有 27 语（这三个键集不在
      ui-<lang>.js 的 337 键核心集里，339 那轮扩容漏了它们，结果 73 种新语言的
      顶栏整栏回落英文）。补翻的 37 个键按语言单独成片 i18n/tnav-<lang>.js，
     由本文件在解析期 document.write 同步注入 —— 27 个内置语言零额外请求。
   ============================================================================= */
(function (w, d) {
  'use strict';

  /* ---------- 工具名 × 27 语（收割自 split-i18n.js） ---------- */
  var N = {
${dictSrc(names, '/* 15 工具名：navTr/navFx 是顶栏主项，其余进 Mega 下拉 */')}
  };

  /* ---------- 工具一句话描述 × 27 语（收割自 site-i18n.js 首页卡片） ---------- */
  var D = {
${dictSrc(descs, '/* 13 描述：与首页工具卡片 tcXxD 同文案，Mega 下拉复用 */')}
  };

  /* ---------- 手写键 × 27 语 ---------- */
  var T = {
${dictSrc(MY, '/* tnVd 视频下载 / tnMore 更多工具 / tnG1..tnG4 分组名 / tnAll 全部工具 */')}
  };

  /* ---------- 工具元数据：id → 链接 / 词条键 / 主题色 / 图标 ---------- */
  var TOOLS = {
    tr: { href: '/translate.html', name: 'navTr' },
    fx: { href: '/merge.html',     name: 'navFx' },
    cv: { href: '/convert.html',   name: 'navCv',   desc: 'tcCvD', c: '#185FA5', bg: '#E6F1FB', ic: 'cv' },
    tb: { href: '/table.html',     name: 'navTbl',  desc: 'tcTbD', c: '#4D7C0F', bg: '#F0F5E6', ic: 'tb' },
    hc: { href: '/hanconv.html',   name: 'navHc',   desc: 'tcHcD', c: '#5B21B6', bg: '#F3EAFE', ic: 'hc' },
    bi: { href: '/bilingual.html', name: 'navSp',   desc: 'tcBiD', c: '#0E7490', bg: '#E3F2F7', ic: 'bi' },
    sp: { href: '/split.html',     name: 'navSplt', desc: 'tcSpD', c: '#C2410C', bg: '#FDEEE5', ic: 'sp' },
    sh: { href: '/shift.html',     name: 'navSh',   desc: 'tcShD', c: '#4F46E5', bg: '#EEF0FE', ic: 'sh' },
    cl: { href: '/clean.html',     name: 'navCl',   desc: 'tcClD', c: '#0B7A5C', bg: '#E6F6EF', ic: 'cl' },
    lr: { href: '/lrc.html',       name: 'navLrc',  desc: 'tcLrD', c: '#9D174D', bg: '#FBF0F5', ic: 'lr' },
    ex: { href: '/extract.html',   name: 'navEx',   desc: 'tcExD', c: '#B45309', bg: '#FEF3E2', ic: 'ex' },
    vs: { href: '/videosub.html',  name: 'navVs',   desc: 'tcVsD', c: '#0F766E', bg: '#E6F4F2', ic: 'vs' },
    rp: { href: '/repair.html',    name: 'navRp',   desc: 'tcRpD', c: '#B42318', bg: '#FEF3F2', ic: 'rp' },
    gl: { href: '/glossary.html',  name: 'navGl',   desc: 'tcGlD', c: '#A21CAF', bg: '#FBE9F7', ic: 'gl' },
    bt: { href: '/batch.html',     name: 'navBt',   desc: 'tcBtD', c: '#334155', bg: '#EEF1F5', ic: 'bt' },
    /* v0.9.321：第十四个工具 —— 字幕质检（深绿，与清洗页的绿松刻意区分） */
    qc: { href: '/qc.html',        name: 'navQc',   desc: 'tcQcD', c: '#166534', bg: '#E9F7EE', ic: 'qc' },
    /* v0.9.323：使用指南 —— 内容页索引（/guides/），顶栏直出，不进 Mega 分组 */
    gd: { href: '/guides/',        name: 'navGuide' }
  };
  /* 下拉分组：转换与格式 / 双语与拆合 / 时间轴与清理 / 提取与批量（14 个工具） */
  var GROUPS = [
    { k: 'tnG1', ids: ['cv', 'tb', 'hc'] },
    { k: 'tnG2', ids: ['bi', 'sp'] },
    { k: 'tnG3', ids: ['sh', 'cl', 'lr', 'qc'] },
    { k: 'tnG4', ids: ['ex', 'vs', 'rp', 'gl', 'bt'] }
  ];
  var MAIN = ['tr', 'fx', 'gd'];                  /* 顶栏直出：翻译 / 特效 / 使用指南（v0.9.323 加） */
  var EXT = { href: 'https://risekol.com/video', key: 'tnVd' };  /* 外链：新标签打开 */
  var ALLHREF = '/#toolsTitle';                   /* 面板底栏「全部工具」→ 首页工具区 */
  var SEL_IDS = ['uiLang2', 'uiLang', 'langSel', 'glang']; /* 四种页面用不同 id 的语言下拉（glang=指南页） */

  var L = 'zh-CN';

  /* ---------- 100 种界面语言代码（v0.9.339 起） ----------
     ⚠️ 与 site-i18n.js 的 UI_LANGS / ui-codes.js 同源，由 _mk_topnav.js 生成时内联。
        为什么不直接读 window.UI_CODES：本文件刻意零依赖（15 个工具页不加载主词典，
        只有部分页面引了 ui-codes.js），内联一份 0.6KB 数组比引入加载顺序约束更稳。 */
  var UI100 = ${JSON.stringify(UI100)};

  /* ---------- 顶栏文案分片（v0.9.339 起） ----------
     三张表只到 27 语；27 语之外的语言从 /i18n/tnav-<lang>.js 取。
     ⚠️ 必须同步注入（document.write）：顶栏是首屏内容，异步加载会先渲染一遍英文再跳成本地语言。
     ⚠️ 位置的两条约束：
        1) 必须在 SEL_IDS / TOOLS 等 var 之后 —— resolveLang() 会读 SEL_IDS，
           放早了它是 undefined，直接 TypeError 炸掉整个顶栏；
        2) 必须在下方取 d.currentScript（CUR）之前 —— document.write 插进来的
           脚本会改变 currentScript，那时再取就取不到 data-tool 了。
        resolveLang 是函数声明，会被提升，所以这里调用没问题。 */
  var SH = w.__TNAV__ || (w.__TNAV__ = {});
  (function () {
    var l0 = resolveLang();                 /* 只依赖 UI100，不依赖分片，可以提前算 */
    if (!l0 || N[l0]) return;               /* 内置 27 语：三张表里已有，不发请求 */
    if (!/^[a-z]{2,3}(-[A-Za-z]{2,4})?$/.test(l0)) return;
    /* ⚠️ 这里的版号要跟整站版号一起升（?v= 是缓存键）。_bumpNNN.py 只改交付文件、
           不改本脚本（_ 开头一律跳过），所以升版时记得顺手改这一行 + 下面第 0 行。 */
    d.write('<script src="/i18n/tnav-' + l0 + '.js?v=0.9.340"><\\/script>');
  })();

  /* ---------- 语言：URL 前缀 → 语言下拉 → html[lang] → navigator，逐级兜底 ----------
     ⚠️ v0.9.339：候选集从「N 表的 27 语」换成 UI100（100 语）。
        不改这里的话，73 种新语言一律判不出来 → 退回 navigator.language，
        于是中文访客进 /ms/ 看到的是中文顶栏（与 339 那轮 pathUiLang 同一个坑）。 */
  function norm(x) {
    if (!x) return null;
    x = String(x).trim();
    if (N[x] || UI100.indexOf(x) >= 0) return x;
    var lo = x.toLowerCase();
    var ks = UI100;
    for (var i = 0; i < ks.length; i++) if (ks[i].toLowerCase() === lo) return ks[i];
    if (/^zh/i.test(x)) return /tw|hk|mo|hant/i.test(x) ? 'zh-TW' : 'zh-CN';
    var p = lo.split('-')[0];
    for (var j = 0; j < ks.length; j++) if (ks[j].split('-')[0] === p) return ks[j];
    return null;
  }
  function resolveLang() {
    var cands = [];
    /* ⚠️ 原来是 {2} —— 三个字母的语言码（yue / fil / ceb）根本匹配不到，
       在 /yue/ 这类路径下顶栏会直接跳过 URL 判定。改成 {2,3}，
       末尾也从「必须有 /」放宽到「/ 或 ? 或 # 或结尾」，覆盖 /ms 与 /ms/index.html。 */
    var m = String(w.location && w.location.pathname || '').match(/^\\/([a-zA-Z]{2,3}(?:-[A-Za-z]{2,4})?)(?:[\\/#?]|$)/);
    if (m) cands.push(m[1]);
    /* 语言下拉排在 html[lang] 前：用户在页内切语言时，有的页不回写 html[lang]
       （如 split 页的 applyI18n 不设），select 的实时值才是用户的选择 */
    SEL_IDS.forEach(function (id) {
      var el = d.getElementById(id);
      if (el && el.value) cands.push(el.value);
    });
    var hl = d.documentElement && d.documentElement.getAttribute('lang');
    if (hl) cands.push(hl);
    cands.push(navigator.language || 'zh-CN');
    for (var i = 0; i < cands.length; i++) {
      var x = norm(cands[i]);
      if (x) return x;
    }
    return 'zh-CN';
  }
  /* 三张表的取值统一走「分片 → 内嵌 27 语 → 英文」三级。
     ⚠️ 顺序不能反：分片键与内嵌键有交集（navGuide / tcClD 两边都有），
        分片里的是该语言真翻的，内嵌 27 语里对 73 种新语言根本不存在该语言的列，
        所以分片必须优先 —— 反过来写就永远取不到新语言译文。 */
  function t(k) {   /* 手写键：T 表 */
    var s = SH[L];
    return (s && s[k]) || (T[L] && T[L][k]) || (T['en'] && T['en'][k]) || k;
  }
  function tn(k) {  /* 工具名：N 表 */
    var s = SH[L], b = N[L] || N['en'];
    return (s && s[k]) || (b && b[k]) || (N['en'] && N['en'][k]) || k;
  }
  function td(k) {  /* 工具描述：D 表 */
    var s = SH[L], b = D[L] || D['en'];
    return (s && s[k]) || (b && b[k]) || (D['en'] && D['en'][k]) || '';
  }
  /* 链接语言前缀跟「当前界面语言」走（与各页 updateLangLinks / 服务端同口径） */
  function lp(href) { return (L === 'zh-CN' ? '' : '/' + L) + href; }
  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function svg(id, size) {
    return '<svg viewBox="0 0 24 24" width="' + (size || 17) + '" height="' + (size || 17) +
      '" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" ' +
      'stroke-linejoin="round" aria-hidden="true">' + ICONS[id] + '</svg>';
  }

  /* ---------- 放不下就收一点（v0.9.339 补） ----------
     100 语里有十几种（卡纳达、亚美尼亚、保加利亚…）单行比 .lnav 的 1080 还宽，
     一折行「更多工具」就掉到第二行左端 —— 视觉上像导航散架。
     这里量一次「单行需要多宽」，放不下就加 .tnav-tight 收字号与内边距；
     收完仍放不下的（极少数）照旧折行，下拉菜单由 placeMenu() 夹在视口内兜底。 */
  function tighten(box) {
    box.className = box.className.replace(/\s*tnav-tight2?/g, '');
    /* ⚠️ 不要用「算一遍可用宽度再比 max-content」：logo 是 flex 子项，会先被压窄
          （德语在 1080 里 logo 从 180 缩到 168），按缩窄后的宽度算就永远「放得下」，
          可实际还是折行 —— 第一次就是这么误判的。
          直接看结果：单行 31px，折行后 63px 以上。
       两级：tight 收字号/内边距；德语实测只差 2px 还折，所以留了第二级。 */
    if (box.getBoundingClientRect().height <= 44) return;
    box.className += ' tnav-tight';
    if (box.getBoundingClientRect().height <= 44) return;
    box.className += ' tnav-tight2';
    /* 收了两级还放不下（卡纳达这种超长文字）：认了，折成两行。
       但要让每行右对齐 —— 否则第二行只剩「更多工具」挂在左边，像散架。 */
    if (box.getBoundingClientRect().height > 44) box.className += ' tnav-wrapped';
  }

  /* ---------- 下拉定位：夹在视口内 ----------
     默认样式是 position:absolute;right:0（对齐按钮右边缘）。折行后按钮在左端，
     菜单宽 700+，right:0 会把左半边推到屏幕外（真机截图复现过）。
     改成打开时按视口算一次 fixed 坐标：优先右对齐按钮，左右各留 8px。 */
  function placeMenu(btn, menu) {
    menu.style.position = 'fixed';
    menu.style.right = 'auto';
    menu.style.left = '0px';
    menu.style.top = '0px';
    var b = btn.getBoundingClientRect();
    var mw = menu.offsetWidth, mh = menu.offsetHeight;
    var vw = w.innerWidth || d.documentElement.clientWidth;
    var vh = w.innerHeight || d.documentElement.clientHeight;
    var left = Math.min(Math.max(8, b.right - mw), Math.max(8, vw - mw - 8));
    var top = b.bottom + 10;
    if (top + mh > vh - 8) top = Math.max(8, b.top - mh - 10);
    menu.style.left = Math.round(left) + 'px';
    menu.style.top = Math.round(top) + 'px';
  }

  /* ---------- 渲染 ---------- */
  function render() {
    L = resolveLang();
    injectCss();
    var box = d.getElementById('topNav');
    if (!box) return;
    var cur = CUR;
    var h = '';
    MAIN.forEach(function (id) {
      var on = (id === cur);
      h += '<a class="tnav-lnk' + (on ? ' on' : '') + '" href="' + lp(TOOLS[id].href) + '"' +
        (on ? ' aria-current="page"' : '') + '>' + esc(tn(TOOLS[id].name)) + '</a>';
    });
    /* 视频下载：推广位 —— 品牌渐变实心 pill + 下载图标 + 外链箭头（用户定案：不低调，要推） */
    h += '<a class="tnav-promo" href="' + EXT.href + '" target="_blank" rel="noopener">' +
      svg('dl', 15) + '<span>' + esc(t(EXT.key)) + '</span>' + svg('ext', 9) + '</a>';
    h += '<div class="tnav-more"><button type="button" class="tnav-btn" id="tnavBtn" aria-haspopup="true" aria-expanded="false">' +
      esc(t('tnMore')) + svg('caret', 10) + '</button>';
    h += '<div class="tnav-menu" id="tnavMenu" role="menu" hidden>';
    GROUPS.forEach(function (g) {
      h += '<div class="tnav-grp"><div class="tnav-gt">' + esc(t(g.k)) + '</div>';
      g.ids.forEach(function (id) {
        var m = TOOLS[id], on = (id === cur);
        h += '<a class="tnav-it' + (on ? ' on' : '') + '" role="menuitem" href="' + lp(m.href) + '"' +
          (on ? ' aria-current="page"' : '') + ' style="--tc:' + m.c + ';--tw:' + m.bg + '">' +
          '<span class="tnav-ic">' + svg(m.ic) + '</span>' +
          '<span class="tnav-tx"><span class="tnav-nm">' + esc(tn(m.name)) + '</span>' +
          '<span class="tnav-ds">' + esc(td(m.desc)) + '</span></span></a>';
      });
      h += '</div>';
    });
    h += '<div class="tnav-foot"><a class="tnav-all" href="' + ALLHREF + '">' + esc(t('tnAll')) +
      svg('arr', 13) + '</a></div>';
    h += '</div></div>';
    box.innerHTML = h;
    tighten(box);

    /* 下拉交互：点按钮开合；点外面 / Esc 收起 */
    var btn = d.getElementById('tnavBtn'), menu = d.getElementById('tnavMenu');
    if (btn && menu) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        var open = menu.hidden;
        /* ⚠️ 必须先显示再量：hidden 时 offsetWidth 是 0，夹取算出来会把菜单
              放到按钮右边（实测 1085 → 1785，整块在屏幕外）。 */
        menu.hidden = !open;
        if (open) placeMenu(btn, menu);
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
      d.addEventListener('click', function (e) {
        if (!menu.hidden && !menu.contains(e.target) && e.target !== btn) {
          menu.hidden = true; btn.setAttribute('aria-expanded', 'false');
        }
      });
      d.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && !menu.hidden) {
          menu.hidden = true; btn.setAttribute('aria-expanded', 'false');
        }
      });
    }
  }

  /* ---------- 样式：主项吃页面主题色（--acc-*），菜单自身是白底通用件 ---------- */
  var CSS = [
    '#topNav{display:inline-flex;align-items:center;gap:2px;flex-wrap:wrap;vertical-align:middle}',
    /* 主项：克制文字链；当前页吃页面主题色 */
    '#topNav .tnav-lnk{display:inline-flex;align-items:center;height:30px;padding:0 10px;border-radius:9px;',
    'color:var(--sub,#5F5C66);font-size:13.5px;font-weight:500;text-decoration:none;white-space:nowrap;',
    'transition:color .15s,background .15s}',
    '#topNav .tnav-lnk:hover{color:var(--acc-ink,#C02159);background:var(--acc-weak,#FDF1F6)}',
    '#topNav .tnav-lnk.on{color:var(--acc-ink,#C02159);background:var(--acc-weak,#FDF1F6);font-weight:600}',
    /* 视频下载：推广位（品牌渐变，全栏视觉重心） */
    '#topNav .tnav-promo{display:inline-flex;align-items:center;gap:6px;height:31px;padding:0 13px 0 11px;',
    'border-radius:999px;background:linear-gradient(100deg,#E12D6E 0%,#BC45CC 55%,#8B5CF6 100%);',
    'color:#fff;font-size:13px;font-weight:600;text-decoration:none;white-space:nowrap;',
    'box-shadow:0 4px 14px -4px rgba(225,45,110,.5);transition:transform .15s,box-shadow .15s,filter .15s}',
    '#topNav .tnav-promo:hover{filter:brightness(1.07);transform:translateY(-1px);',
    'box-shadow:0 8px 20px -6px rgba(225,45,110,.58)}',
    '#topNav .tnav-promo:active{transform:translateY(0)}',
    '#topNav .tnav-promo svg{flex:none}',
    /* 更多工具按钮 */
    '#topNav .tnav-btn{display:inline-flex;align-items:center;gap:5px;height:30px;padding:0 10px;',
    'border:0;background:none;cursor:pointer;font-family:inherit;color:var(--sub,#5F5C66);',
    'font-size:13.5px;font-weight:500;border-radius:9px;transition:color .15s,background .15s}',
    '#topNav .tnav-btn:hover{color:var(--acc-ink,#C02159);background:var(--acc-weak,#FDF1F6)}',
    '#topNav .tnav-btn[aria-expanded="true"]{color:var(--acc-ink,#C02159);background:var(--acc-weak,#FDF1F6)}',
    '#topNav .tnav-btn svg{flex:none;transition:transform .18s}',
    '#topNav .tnav-btn[aria-expanded="true"] svg{transform:rotate(180deg)}',
    /* Mega 面板 */
    '#topNav .tnav-more{position:relative;display:inline-flex}',
    /* 放不下时的紧凑档：只收字号与内边距，配色/层级一律不动（见 tighten） */
    '#topNav.tnav-tight{gap:0}',
    '#topNav.tnav-tight .tnav-lnk{padding:0 7px;font-size:12.8px}',
    '#topNav.tnav-tight .tnav-btn{padding:0 8px;font-size:12.8px}',
    '#topNav.tnav-tight .tnav-promo{padding:0 10px 0 8px;font-size:12.4px;gap:5px}',
    '#topNav.tnav-tight2 .tnav-lnk{padding:0 6px;font-size:12.3px}',
    '#topNav.tnav-tight2 .tnav-btn{padding:0 6px;font-size:12.3px}',
    '#topNav.tnav-tight2 .tnav-promo{padding:0 8px 0 6px;font-size:11.8px;gap:4px}',
    '#topNav.tnav-wrapped{justify-content:flex-end}',
    '#topNav .tnav-menu{position:absolute;top:calc(100% + 10px);right:0;z-index:120;',
    'width:min(700px,calc(100vw - 28px));background:#fff;border:1px solid #EBEBF1;border-radius:18px;',
    'box-shadow:0 28px 64px -20px rgba(22,22,34,.30),0 2px 6px rgba(22,22,34,.05);',
    'padding:14px 12px 0;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:2px 8px;',
    'animation:tnavIn .14s ease-out}',
    /* ⚠️ 给了 display:grid 就必须自己管住 [hidden]（v0.9.309 的教训），否则菜单常开 */
    '#topNav .tnav-menu[hidden]{display:none}',
    '@keyframes tnavIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}',
    '#topNav .tnav-grp{min-width:0}',
    '#topNav .tnav-gt{font-size:11px;font-weight:700;color:#A6A6B2;letter-spacing:.8px;margin:4px 8px 6px}',
    '#topNav .tnav-it{display:flex;align-items:flex-start;gap:9px;padding:7px 8px;border-radius:11px;',
    'text-decoration:none;transition:background .13s}',
    '#topNav .tnav-ic{width:31px;height:31px;border-radius:9px;flex:none;display:flex;align-items:center;',
    'justify-content:center;background:var(--tw,#F4F4F7);color:var(--tc,#55555E);margin-top:1px}',
    '#topNav .tnav-tx{min-width:0}',
    '#topNav .tnav-nm{display:block;font-size:13px;font-weight:600;color:#1B1B22;line-height:1.3}',
    '#topNav .tnav-ds{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;',
    'font-size:11.5px;color:#8B8B97;line-height:1.4;margin-top:2px}',
    '#topNav .tnav-it:hover{background:#F6F6FA}',
    '#topNav .tnav-it:hover .tnav-nm{color:var(--tc,#55555E)}',
    '#topNav .tnav-it.on{background:var(--tw,#F4F4F7)}',
    '#topNav .tnav-it.on .tnav-nm{color:var(--tc,#55555E)}',
    /* 面板底栏：一条「全部工具 →」回首页工具区 */
    '#topNav .tnav-foot{grid-column:1/-1;display:flex;align-items:center;margin:10px -12px 0;',
    'padding:11px 20px;border-top:1px solid #F0F0F4;border-radius:0 0 17px 17px;background:#FAFAFC}',
    '#topNav .tnav-all{display:inline-flex;align-items:center;gap:6px;font-size:12.5px;font-weight:600;',
    'color:var(--acc-ink,#C02159);text-decoration:none}',
    '#topNav .tnav-all:hover{text-decoration:underline}',
    /* 响应式：中屏两列、窄屏一列（高度封顶可滚） */
    '@media (max-width:980px){#topNav .tnav-menu{grid-template-columns:repeat(2,minmax(0,1fr));',
    'width:min(460px,calc(100vw - 28px))}}',
    '@media (max-width:640px){#topNav .tnav-menu{grid-template-columns:1fr;',
    'width:calc(100vw - 24px);max-height:calc(100vh - 76px);overflow-y:auto}}',
    '@media (prefers-reduced-motion:reduce){#topNav .tnav-menu{animation:none}',
    '#topNav .tnav-promo{transition:none}}'
  ].join('');

  function injectCss() {
    if (d.getElementById('tnavCss')) return;
    var s = d.createElement('style');
    s.id = 'tnavCss';
    s.textContent = CSS;
    (d.head || d.body).appendChild(s);
  }

  var CUR = (d.currentScript && d.currentScript.getAttribute('data-tool')) || '';

  function boot() {
    render();
    SEL_IDS.forEach(function (id) {
      var el = d.getElementById(id);
      if (el) el.addEventListener('change', onLangChange);
    });
    /* 菜单是 open 时算一次的 fixed 坐标 —— 滚动/改窗口大小就不对了，直接收起。
       ⚠️ 只在 boot 绑一次：render 每次都会重建 menu，绑在 render 里会越积越多。 */
    function closeMenu() {
      var m = d.getElementById('tnavMenu'), b = d.getElementById('tnavBtn');
      if (m && !m.hidden) { m.hidden = true; if (b) b.setAttribute('aria-expanded', 'false'); }
    }
    w.addEventListener('scroll', closeMenu, { passive: true });
    w.addEventListener('resize', closeMenu);
  }

  /* ---------- 切界面语言后重绘 ----------
     ⚠️ 原来这里直接绑 render：切到 73 种新语言时，tnav 分片还没下载过，
        render 取不到译文就整栏退回英文，而且不会再补一次（用户看到的是「切了语言
        顶栏没反应，还变英文了」）。改成先补片、到位再重绘。
     ⚠️ 27 个内置语言没有分片，直接重绘，不发请求。 */
  function onLangChange() {
    var nl = resolveLang();
    if (!nl || nl === L) return;
    if (N[nl] || SH[nl]) { render(); return; }
    loadShard(nl, render);
  }
  /* 运行时按需补片（只在「切到新语言」这条路上会用到）。
     首次进入的分片是解析期 document.write 同步加载的，不走这里。
     ⚠️ 不能 document.write：那时解析已结束，写了会整页清空。
     ⚠️ 同一语言并发点两次要合并成一次请求，否则会插两个同 src 的 script。
     404（分片还没做出来）时 onerror 也回调，顶栏回落英文但不卡住。 */
  var pendingShard = {};
  function loadShard(lang, cb) {
    var fire = function () { if (typeof cb === 'function') { try { cb(); } catch (e) {} } };
    if (!lang || SH[lang]) { fire(); return; }
    if (!/^[a-z]{2,3}(-[A-Za-z]{2,4})?$/.test(lang)) { fire(); return; }
    if (pendingShard[lang]) { pendingShard[lang].push(fire); return; }
    pendingShard[lang] = [fire];
    var el = d.createElement('script');
    el.src = '/i18n/tnav-' + lang + '.js?v=0.9.340';    /* ⚠️ 整站升版时同步改（缓存键） */
    el.async = false;
    el.onload = el.onerror = function () {
      var q = pendingShard[lang] || [];
      delete pendingShard[lang];
      for (var i = 0; i < q.length; i++) q[i]();
    };
    (d.head || d.documentElement).appendChild(el);
  }

  if (d.readyState === 'loading') d.addEventListener('DOMContentLoaded', boot);
  else boot();

  w.SiteTopNav = { render: render, lang: function () { return L; }, cur: CUR,
    loadShard: loadShard };   /* 供页面在自定义切语言流程里显式调用 */
})(window, document);
`);

/* ICONS 作为生成物的一部分注入（放在 IIFE 内部、svg() 之前） */
O[O.length - 1] = O[O.length - 1].replace(
  "  /* ---------- 渲染 ---------- */",
  "  /* ---------- 图标（24 视图；stroke 走 currentColor，由外层 --tc 控制） ---------- */\n" +
  "  var ICONS = " + JSON.stringify(ICONS, null, 0).replace(/\"/g, "'") + ";\n\n" +
  "  /* ---------- 渲染 ---------- */");

fs.writeFileSync(__dirname + '/site-topnav.js', O.join(''));
console.log('OK site-topnav.js 已生成：' + LANGS.length + ' 语 × (15 名 + 13 描述 + 7 手写) 键');
