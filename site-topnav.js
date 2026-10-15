/* =============================================================================
   site-topnav.js —— 全站统一顶部导航（v0.9.317）

   四个主项（从左到右）：字幕翻译 · 特效字幕 · 视频下载（RiseKol 外链，新标签）
   · 更多字幕工具 ▾（下拉菜单：13 个工具分四组）。
   用户定案（v0.9.317）：全站 16 页统一换上这条导航，替换各页旧的胶囊清单。

   用法（页面侧只需两处）：
     1) 在页头放占位：<span id="topNav"></span>
     2) body 末尾引入：<script src="site-topnav.js?v=0.9.316" data-tool="tr"><\/script>
        data-tool 填本页 id（tr/fx/cv/tb/hc/bi/sp/sh/cl/lr/ex/vs/rp/gl/bt；首页留空），
        当前页在下拉里会高亮。

   词典来源：
     · 15 个工具名 navXx × 27 语 —— 收割自 split-i18n.js（四新页定下的「全站同名同译」，
       真翻 27 语；site-i18n.js 的 tcXxN 在 24 语是回退英文，不用它）；
     · 6 个新键（tnVd/tnMore/tnG1..tnG4）× 27 语 —— 手写。
   本文件自包含、零依赖，不引 site-i18n.js / site-nav.js；改词典用 _mk_topnav.js 重新生成。
   ============================================================================= */
(function (w, d) {
  'use strict';

  /* ---------- 工具名 × 27 语（收割自 split-i18n.js） ---------- */
  var N = {
  /* 15 工具名：navTr/navFx 主项，其余进下拉 */
    'zh-CN': { navTr: '字幕翻译', navFx: '特效字幕', navCv: '格式转换', navTbl: '表格互转', navHc: '简繁转换', navSp: '双语剥离', navSplt: '拆分拼接', navSh: '时间轴调整', navCl: '字幕清洗', navLrc: '歌词打轴', navEx: '提取文本', navVs: '视频字幕', navRp: '乱码修复', navGl: '术语替换', navBt: '批量转换' },
    'zh-TW': { navTr: '字幕翻譯', navFx: '特效字幕', navCv: '格式轉換', navTbl: '表格互轉', navHc: '簡繁轉換', navSp: '雙語剝離', navSplt: '拆分拼接', navSh: '時間軸調整', navCl: '字幕清洗', navLrc: '歌詞打軸', navEx: '擷取文本', navVs: '影片字幕', navRp: '亂碼修復', navGl: '術語替換', navBt: '批次轉換' },
    'en': { navTr: 'Translate', navFx: 'Styled subs', navCv: 'Convert', navTbl: 'Table', navHc: 'Chinese', navSp: 'Split bilingual', navSplt: 'Split', navSh: 'Timing', navCl: 'Clean up', navLrc: 'Lyrics', navEx: 'Text Extractor', navVs: 'Video', navRp: 'Encoding Fix', navGl: 'Glossary', navBt: 'Batch' },
    'ja': { navTr: '字幕翻訳', navFx: '装飾字幕', navCv: '形式変換', navTbl: '表変換', navHc: '繁簡変換', navSp: '二か国語分離', navSplt: '分割・結合', navSh: 'タイミング調整', navCl: '字幕クリーニング', navLrc: '歌詞合わせ', navEx: 'テキスト抽出', navVs: '動画字幕', navRp: '文字化け修復', navGl: '用語置換', navBt: '一括変換' },
    'es': { navTr: 'Traducir', navFx: 'Subtítulos con estilo', navCv: 'Convertir', navTbl: 'Tabla', navHc: 'Chino', navSp: 'Separar bilingüe', navSplt: 'Dividir', navSh: 'Sincronía', navCl: 'Limpiar', navLrc: 'Letra', navEx: 'Extraer texto', navVs: 'Vídeo', navRp: 'Arreglar codificación', navGl: 'Glosario', navBt: 'Lote' },
    'pt': { navTr: 'Traduzir', navFx: 'Legendas estilizadas', navCv: 'Converter', navTbl: 'Tabela', navHc: 'Chinês', navSp: 'Separar bilíngue', navSplt: 'Dividir', navSh: 'Sincronia', navCl: 'Limpar', navLrc: 'Letra', navEx: 'Extrair texto', navVs: 'Vídeo', navRp: 'Corrigir codificação', navGl: 'Glossário', navBt: 'Lote' },
    'ko': { navTr: '자막 번역', navFx: '효과 자막', navCv: '형식 변환', navTbl: '표 변환', navHc: '한자 변환', navSp: '이중 언어 분리', navSplt: '분할·결합', navSh: '타임라인 조정', navCl: '자막 정리', navLrc: '가사 타이밍', navEx: '텍스트 추출', navVs: '동영상', navRp: '인코딩 복구', navGl: '용어 치환', navBt: '일괄 변환' },
    'de': { navTr: 'Übersetzen', navFx: 'Stilisierte Untertitel', navCv: 'Konvertieren', navTbl: 'Tabelle', navHc: 'Chinesisch', navSp: 'Zweisprachig trennen', navSplt: 'Teilen', navSh: 'Timing', navCl: 'Aufräumen', navLrc: 'Lyrics', navEx: 'Text extrahieren', navVs: 'Video', navRp: 'Kodierung reparieren', navGl: 'Glossar', navBt: 'Stapel' },
    'fr': { navTr: 'Traduire', navFx: 'Sous-titres stylés', navCv: 'Convertir', navTbl: 'Tableau', navHc: 'Chinois', navSp: 'Séparer le bilingue', navSplt: 'Scinder', navSh: 'Synchronisation', navCl: 'Nettoyer', navLrc: 'Paroles', navEx: 'Extraction de texte', navVs: 'Vidéo', navRp: 'Réparer l’encodage', navGl: 'Glossaire', navBt: 'Lot' },
    'id': { navTr: 'Terjemahan', navFx: 'Subtitle beraksen', navCv: 'Konversi', navTbl: 'Tabel', navHc: 'Hanzi', navSp: 'Pisahkan dwibahasa', navSplt: 'Pecah', navSh: 'Sinkronisasi', navCl: 'Bersihkan', navLrc: 'Lirik', navEx: 'Ekstrak teks', navVs: 'Video', navRp: 'Perbaiki Encoding', navGl: 'Glosarium', navBt: 'Massal' },
    'hi': { navTr: 'अनुवाद', navFx: 'सजावटी सबटाइटल', navCv: 'बदलें', navTbl: 'तालिका', navHc: 'चीनी लिपि', navSp: 'द्विभाषी अलग करें', navSplt: 'विभाजन', navSh: 'समय मिलान', navCl: 'सफाई', navLrc: 'बोल', navEx: 'टेक्स्ट एक्स्ट्रैक्टर', navVs: 'वीडियो', navRp: 'एन्कोडिंग सुधार', navGl: 'शब्दावली', navBt: 'बैच' },
    'th': { navTr: 'แปล', navFx: 'ซับไตเติลใส่เอฟเฟกต์', navCv: 'แปลงรูปแบบ', navTbl: 'ตาราง', navHc: 'อักษรจีน', navSp: 'แยกสองภาษา', navSplt: 'แยก·รวม', navSh: 'ปรับเวลา', navCl: 'ทำความสะอาด', navLrc: 'เนื้อเพลง', navEx: 'สกัดข้อความ', navVs: 'วิดีโอ', navRp: 'แก้รหัสอักขระ', navGl: 'แทนที่คำศัพท์', navBt: 'แบบชุด' },
    'vi': { navTr: 'Dịch', navFx: 'Phụ đề cách điệu', navCv: 'Chuyển đổi', navTbl: 'Bảng', navHc: 'Chữ Hán', navSp: 'Tách song ngữ', navSplt: 'Tách·nối', navSh: 'Căn thời gian', navCl: 'Làm sạch', navLrc: 'Lời', navEx: 'Trích văn bản', navVs: 'Video', navRp: 'Sửa lỗi mã hóa', navGl: 'Thay thuật ngữ', navBt: 'Hàng loạt' },
    'ru': { navTr: 'Перевод', navFx: 'Оформленные субтитры', navCv: 'Конвертация', navTbl: 'Таблица', navHc: 'Китайский', navSp: 'Разделить двуязычные', navSplt: 'Разделить', navSh: 'Синхронизация', navCl: 'Очистка', navLrc: 'Текст', navEx: 'Извлечение текста', navVs: 'Видео', navRp: 'Исправление кодировки', navGl: 'Глоссарий', navBt: 'Пакет' },
    'it': { navTr: 'Traduci', navFx: 'Sottotitoli con stile', navCv: 'Converti', navTbl: 'Tabella', navHc: 'Cinese', navSp: 'Separa bilingue', navSplt: 'Dividi', navSh: 'Sincronizzazione', navCl: 'Pulisci', navLrc: 'Testi', navEx: 'Estrazione testo', navVs: 'Video', navRp: 'Correggi codifica', navGl: 'Glossario', navBt: 'Blocco' },
    'ar': { navTr: 'ترجمة', navFx: 'ترجمات منسقة', navCv: 'تحويل', navTbl: 'جدول', navHc: 'الصينية', navSp: 'فصل ثنائي اللغة', navSplt: 'تقسيم', navSh: 'ضبط التوقيت', navCl: 'تنظيف', navLrc: 'كلمات', navEx: 'استخراج النص', navVs: 'فيديو', navRp: 'إصلاح الترميز', navGl: 'المصطلحات', navBt: 'دفعة' },
    'tr': { navTr: 'Çeviri', navFx: 'Stil altyazı', navCv: 'Dönüştür', navTbl: 'Tablo', navHc: 'Çince', navSp: 'İki dili ayır', navSplt: 'Böl', navSh: 'Zamanlama', navCl: 'Temizle', navLrc: 'Sözler', navEx: 'Metin Çıkarıcı', navVs: 'Video', navRp: 'Kodlama Onarma', navGl: 'Terimler', navBt: 'Toplu' },
    'nl': { navTr: 'Vertalen', navFx: 'Ondertitels met stijl', navCv: 'Converteren', navTbl: 'Tabel', navHc: 'Chinees', navSp: 'Tweetalig splitsen', navSplt: 'Splitsen', navSh: 'Timing', navCl: 'Opschonen', navLrc: 'Lyrics', navEx: 'Tekst extraheren', navVs: 'Video', navRp: 'Codering herstellen', navGl: 'Woordenlijst', navBt: 'Batch' },
    'pl': { navTr: 'Tłumaczenie', navFx: 'Napisy z efektami', navCv: 'Konwersja', navTbl: 'Tabela', navHc: 'Chiński', navSp: 'Podział dwujęzyczny', navSplt: 'Podziel', navSh: 'Synchronizacja', navCl: 'Czyszczenie', navLrc: 'Tekst', navEx: 'Ekstrakcja tekstu', navVs: 'Wideo', navRp: 'Naprawa kodowania', navGl: 'Słownik', navBt: 'Partia' },
    'sv': { navTr: 'Översätt', navFx: 'Stilade undertexter', navCv: 'Konvertera', navTbl: 'Tabell', navHc: 'Kinesiska', navSp: 'Dela tvåspråkig', navSplt: 'Dela', navSh: 'Synkronisering', navCl: 'Städa', navLrc: 'Text', navEx: 'Textutdrag', navVs: 'Video', navRp: 'Fixa teckenkodning', navGl: 'Ordlista', navBt: 'Batch' },
    'cs': { navTr: 'Překlad', navFx: 'Stylované titulky', navCv: 'Převést', navTbl: 'Tabulka', navHc: 'Čínština', navSp: 'Rozdělit dvojjazyčné', navSplt: 'Rozdělit', navSh: 'Synchronizace', navCl: 'Vyčistit', navLrc: 'Text', navEx: 'Extrakce textu', navVs: 'Video', navRp: 'Oprava kódování', navGl: 'Glosář', navBt: 'Dávka' },
    'uk': { navTr: 'Переклад', navFx: 'Оформлені субтитри', navCv: 'Конвертація', navTbl: 'Таблиця', navHc: 'Китайська', navSp: 'Розділити двомовні', navSplt: 'Розділити', navSh: 'Синхронізація', navCl: 'Очищення', navLrc: 'Текст', navEx: 'Витяг тексту', navVs: 'Відео', navRp: 'Виправлення кодування', navGl: 'Глосарій', navBt: 'Пакет' },
    'da': { navTr: 'Oversæt', navFx: 'Stilede undertekster', navCv: 'Konverter', navTbl: 'Tabel', navHc: 'Kinesisk', navSp: 'Del tosproget', navSplt: 'Opdel', navSh: 'Synkronisering', navCl: 'Ryd op', navLrc: 'Tekst', navEx: 'Tekstudtræk', navVs: 'Video', navRp: 'Ret tegnkodning', navGl: 'Ordliste', navBt: 'Batch' },
    'fi': { navTr: 'Käännä', navFx: 'Tyylitellyt tekstit', navCv: 'Muunna', navTbl: 'Taulukko', navHc: 'Kiina', navSp: 'Erottele kaksikielinen', navSplt: 'Jaa', navSh: 'Ajoitus', navCl: 'Siivoa', navLrc: 'Sanoitus', navEx: 'Tekstin poiminta', navVs: 'Video', navRp: 'Merkistökoodin korjaus', navGl: 'Sanasto', navBt: 'Erä' },
    'el': { navTr: 'Μετάφραση', navFx: 'Υπότιτλοι με στυλ', navCv: 'Μετατροπή', navTbl: 'Πίνακας', navHc: 'Κινεζικά', navSp: 'Διαχωρισμός δίγλωσσων', navSplt: 'Διάσπαση', navSh: 'Συγχρονισμός', navCl: 'Καθαρισμός', navLrc: 'Στίχοι', navEx: 'Εξαγωγή κειμένου', navVs: 'Βίντεο', navRp: 'Διόρθωση κωδικοποίησης', navGl: 'Γλωσσάρι', navBt: 'Μαζικά' },
    'he': { navTr: 'תרגום', navFx: 'כתוביות מעוצבות', navCv: 'המרה', navTbl: 'טבלה', navHc: 'סינית', navSp: 'הפרדה דו-לשונית', navSplt: 'פיצול', navSh: 'תזמון', navCl: 'ניקוי', navLrc: 'מילים', navEx: 'חילוץ טקסט', navVs: 'וידאו', navRp: 'תיקון קידוד', navGl: 'מונחים', navBt: 'אצווה' },
    'ro': { navTr: 'Traducere', navFx: 'Subtitrări cu stil', navCv: 'Conversie', navTbl: 'Tabel', navHc: 'Chineză', navSp: 'Separă bilingv', navSplt: 'Împarte', navSh: 'Sincronizare', navCl: 'Curățare', navLrc: 'Versuri', navEx: 'Extragere text', navVs: 'Video', navRp: 'Reparare codare', navGl: 'Glosar', navBt: 'Lot' }
  };

  /* ---------- 新键 × 27 语（手写） ---------- */
  var T = {
  /* tnVd 视频下载 / tnMore 更多字幕工具 / tnG1..tnG4 分组名 */
    'zh-CN': { tnVd: '视频下载', tnMore: '更多字幕工具', tnG1: '转换与格式', tnG2: '双语与拆合', tnG3: '时间轴与清理', tnG4: '提取与批量' },
    'zh-TW': { tnVd: '影片下載', tnMore: '更多字幕工具', tnG1: '轉換與格式', tnG2: '雙語與拆合', tnG3: '時間軸與清理', tnG4: '擷取與批次' },
    'en': { tnVd: 'Download Video', tnMore: 'More Tools', tnG1: 'Convert & Format', tnG2: 'Bilingual & Split', tnG3: 'Timing & Cleanup', tnG4: 'Extract & Batch' },
    'ja': { tnVd: '動画ダウンロード', tnMore: 'その他のツール', tnG1: '変換・フォーマット', tnG2: '二か国語・分割', tnG3: '時間軸・クリーニング', tnG4: '抽出・一括' },
    'es': { tnVd: 'Descargar vídeo', tnMore: 'Más herramientas', tnG1: 'Conversión y formato', tnG2: 'Bilingüe y división', tnG3: 'Tiempo y limpieza', tnG4: 'Extracción y lotes' },
    'pt': { tnVd: 'Baixar vídeo', tnMore: 'Mais ferramentas', tnG1: 'Conversão e formato', tnG2: 'Bilíngue e divisão', tnG3: 'Tempo e limpeza', tnG4: 'Extração e lote' },
    'ko': { tnVd: '동영상 다운로드', tnMore: '더 많은 도구', tnG1: '변환 및 형식', tnG2: '이중 자막 및 분할', tnG3: '타임라인 및 정리', tnG4: '추출 및 일괄' },
    'de': { tnVd: 'Video herunterladen', tnMore: 'Weitere Tools', tnG1: 'Umwandlung & Format', tnG2: 'Zweisprachig & Aufteilen', tnG3: 'Zeitachse & Bereinigung', tnG4: 'Extraktion & Stapel' },
    'fr': { tnVd: 'Télécharger la vidéo', tnMore: 'Plus d\'outils', tnG1: 'Conversion et format', tnG2: 'Bilingue et découpage', tnG3: 'Synchronisation et nettoyage', tnG4: 'Extraction et lot' },
    'id': { tnVd: 'Unduh Video', tnMore: 'Alat Lainnya', tnG1: 'Konversi & Format', tnG2: 'Dwibahasa & Pisah', tnG3: 'Waktu & Pembersihan', tnG4: 'Ekstrak & Batch' },
    'hi': { tnVd: 'वीडियो डाउनलोड', tnMore: 'और टूल', tnG1: 'रूपांतरण और प्रारूप', tnG2: 'द्विभाषी और विभाजन', tnG3: 'टाइमिंग और सफ़ाई', tnG4: 'निष्कर्षण और बैच' },
    'th': { tnVd: 'ดาวน์โหลดวิดีโอ', tnMore: 'เครื่องมืออื่น ๆ', tnG1: 'แปลงและรูปแบบ', tnG2: 'สองภาษาและการแบ่ง', tnG3: 'ไทม์ไลน์และการทำความสะอาด', tnG4: 'ดึงข้อมูลและชุดงาน' },
    'vi': { tnVd: 'Tải video', tnMore: 'Công cụ khác', tnG1: 'Chuyển đổi và định dạng', tnG2: 'Song ngữ và tách gộp', tnG3: 'Thời gian và dọn dẹp', tnG4: 'Trích xuất và hàng loạt' },
    'ru': { tnVd: 'Скачать видео', tnMore: 'Ещё инструменты', tnG1: 'Конвертация и форматы', tnG2: 'Двуязычные и разделение', tnG3: 'Тайминг и очистка', tnG4: 'Извлечение и пакет' },
    'it': { tnVd: 'Scarica video', tnMore: 'Altri strumenti', tnG1: 'Conversione e formato', tnG2: 'Bilingue e divisione', tnG3: 'Timing e pulizia', tnG4: 'Estrazione e batch' },
    'ar': { tnVd: 'تنزيل الفيديو', tnMore: 'المزيد من الأدوات', tnG1: 'التحويل والصيغ', tnG2: 'ثنائي اللغة والتجزئة', tnG3: 'التوقيت والتنظيف', tnG4: 'الاستخراج والدُفعات' },
    'tr': { tnVd: 'Video İndir', tnMore: 'Diğer Araçlar', tnG1: 'Dönüştürme ve Biçim', tnG2: 'İki Dilli ve Bölme', tnG3: 'Zamanlama ve Temizlik', tnG4: 'Çıkarma ve Toplu' },
    'nl': { tnVd: 'Video downloaden', tnMore: 'Meer tools', tnG1: 'Conversie & formaat', tnG2: 'Tweetalig & splitsen', tnG3: 'Timing & opschonen', tnG4: 'Extractie & batch' },
    'pl': { tnVd: 'Pobierz wideo', tnMore: 'Więcej narzędzi', tnG1: 'Konwersja i formaty', tnG2: 'Dwujęzyczne i dzielenie', tnG3: 'Czas i czyszczenie', tnG4: 'Ekstrakcja i wsad' },
    'sv': { tnVd: 'Hämta video', tnMore: 'Fler verktyg', tnG1: 'Konvertering & format', tnG2: 'Tvåspråkigt & dela', tnG3: 'Tidsaxel & städning', tnG4: 'Extraktion & batch' },
    'cs': { tnVd: 'Stáhnout video', tnMore: 'Další nástroje', tnG1: 'Převod a formáty', tnG2: 'Dvojjazyčné a dělení', tnG3: 'Časování a čištění', tnG4: 'Extrakce a dávka' },
    'uk': { tnVd: 'Завантажити відео', tnMore: 'Інші інструменти', tnG1: 'Конвертація та формати', tnG2: 'Двомовні та розділення', tnG3: 'Таймінг і очищення', tnG4: 'Витяг і пакет' },
    'da': { tnVd: 'Download video', tnMore: 'Flere værktøjer', tnG1: 'Konvertering & formater', tnG2: 'Tosproget & deling', tnG3: 'Tidslinje & oprydning', tnG4: 'Udtræk & batch' },
    'fi': { tnVd: 'Lataa video', tnMore: 'Lisää työkaluja', tnG1: 'Muunnos ja muodot', tnG2: 'Kaksikielinen ja jako', tnG3: 'Aikajana ja siivous', tnG4: 'Poimi ja eräajo' },
    'el': { tnVd: 'Λήψη βίντεο', tnMore: 'Περισσότερα εργαλεία', tnG1: 'Μετατροπή και μορφές', tnG2: 'Δίγλωσσο και διαχωρισμός', tnG3: 'Χρονισμός και καθαρισμός', tnG4: 'Εξαγωγή και δέσμη' },
    'he': { tnVd: 'הורדת וידאו', tnMore: 'כלים נוספים', tnG1: 'המרה ופורמטים', tnG2: 'דו-לשוני ופיצול', tnG3: 'תזמון וניקוי', tnG4: 'חילוץ ואצווה' },
    'ro': { tnVd: 'Descarcă video', tnMore: 'Mai multe instrumente', tnG1: 'Conversie și formate', tnG2: 'Bilingv și separare', tnG3: 'Timp și curățare', tnG4: 'Extragere și lot' }
  };

  /* ---------- 工具清单：id → href / 词条键 ---------- */
  var TOOLS = {
    tr: { href: '/translate.html', name: 'navTr' },
    fx: { href: '/merge.html',     name: 'navFx' },
    cv: { href: '/convert.html',   name: 'navCv' },
    tb: { href: '/table.html',     name: 'navTbl' },
    hc: { href: '/hanconv.html',   name: 'navHc' },
    bi: { href: '/bilingual.html', name: 'navSp' },
    sp: { href: '/split.html',     name: 'navSplt' },
    sh: { href: '/shift.html',     name: 'navSh' },
    cl: { href: '/clean.html',     name: 'navCl' },
    lr: { href: '/lrc.html',       name: 'navLrc' },
    ex: { href: '/extract.html',   name: 'navEx' },
    vs: { href: '/videosub.html',  name: 'navVs' },
    rp: { href: '/repair.html',    name: 'navRp' },
    gl: { href: '/glossary.html',  name: 'navGl' },
    bt: { href: '/batch.html',     name: 'navBt' }
  };
  /* 下拉分组：转换与格式 / 双语与拆合 / 时间轴与清理 / 提取与批量（13 个工具） */
  var GROUPS = [
    { k: 'tnG1', ids: ['cv', 'tb', 'hc'] },
    { k: 'tnG2', ids: ['bi', 'sp'] },
    { k: 'tnG3', ids: ['sh', 'cl', 'lr'] },
    { k: 'tnG4', ids: ['ex', 'vs', 'rp', 'gl', 'bt'] }
  ];
  var MAIN = ['tr', 'fx'];                       /* 顶栏直接放出的两个站内主项 */
  var EXT = { href: 'https://risekol.com/video', key: 'tnVd' };  /* 外链：新标签打开 */
  var SEL_IDS = ['uiLang2', 'uiLang', 'langSel']; /* 三种页面用不同 id 的语言下拉 */

  var L = 'zh-CN';

  /* ---------- 语言：URL 前缀 → html[lang] → 语言下拉 → navigator，逐级兜底 ---------- */
  function norm(x) {
    if (!x) return null;
    x = String(x).trim();
    if (N[x]) return x;
    var lo = x.toLowerCase();
    var ks = Object.keys(N);
    for (var i = 0; i < ks.length; i++) if (ks[i].toLowerCase() === lo) return ks[i];
    if (/^zh/i.test(x)) return /tw|hk|mo|hant/i.test(x) ? 'zh-TW' : 'zh-CN';
    var p = lo.split('-')[0];
    for (var j = 0; j < ks.length; j++) if (ks[j].split('-')[0] === p) return ks[j];
    return null;
  }
  function resolveLang() {
    var cands = [];
    var m = String(w.location && w.location.pathname || '').match(/^\/([a-zA-Z]{2}(?:-[A-Za-z]{2,4})?)\//);
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
  function t(k) {   /* 新键：T 表 */
    return (T[L] && T[L][k]) || (T['en'] && T['en'][k]) || k;
  }
  function tn(k) {  /* 工具名：N 表 */
    var b = N[L] || N['en'];
    return (b && b[k]) || (N['en'] && N['en'][k]) || k;
  }
  /* 链接语言前缀跟「当前界面语言」走（与各页 updateLangLinks / 服务端同口径） */
  function lp(href) { return (L === 'zh-CN' ? '' : '/' + L) + href; }
  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  var CARET = '<svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>';
  var EXTIC = '<svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8"/></svg>';

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
    h += '<a class="tnav-lnk tnav-ext" href="' + EXT.href + '" target="_blank" rel="noopener">' +
      esc(t(EXT.key)) + EXTIC + '</a>';
    h += '<div class="tnav-more"><button type="button" class="tnav-btn" id="tnavBtn" aria-haspopup="true" aria-expanded="false">' +
      esc(t('tnMore')) + CARET + '</button>';
    h += '<div class="tnav-menu" id="tnavMenu" hidden>';
    GROUPS.forEach(function (g) {
      h += '<div class="tnav-grp"><div class="tnav-gt">' + esc(t(g.k)) + '</div>';
      g.ids.forEach(function (id) {
        var on = (id === cur);
        h += '<a href="' + lp(TOOLS[id].href) + '"' + (on ? ' class="on" aria-current="page"' : '') + '>' +
          esc(tn(TOOLS[id].name)) + '</a>';
      });
      h += '</div>';
    });
    h += '</div></div>';
    box.innerHTML = h;

    /* 下拉交互：点按钮开合；点外面 / Esc 收起 */
    var btn = d.getElementById('tnavBtn'), menu = d.getElementById('tnavMenu');
    if (btn && menu) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        var open = menu.hidden;
        menu.hidden = !open;
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

  /* ---------- 样式：各页视觉变量不同，一律 var(--x, 兜底色) ---------- */
  var CSS =
    '#topNav{display:inline-flex;align-items:center;gap:6px;flex-wrap:wrap;vertical-align:middle}' +
    '#topNav .tnav-lnk,#topNav .tnav-btn{display:inline-flex;align-items:center;gap:5px;height:29px;padding:0 11px;' +
    'border-radius:999px;border:1px solid var(--line-strong,#DEDEE5);background:var(--card,#fff);' +
    'color:var(--sub,#6F6C72);font-size:12.5px;line-height:1;text-decoration:none;white-space:nowrap;' +
    'transition:border-color .15s,color .15s,background .15s}' +
    '#topNav .tnav-btn{cursor:pointer;font-family:inherit}' +
    '#topNav .tnav-lnk svg,#topNav .tnav-btn svg{flex:none}' +
    '#topNav .tnav-lnk:hover,#topNav .tnav-btn:hover{border-color:var(--acc,#E12D6E);color:var(--acc-ink,#C02159)}' +
    '#topNav .tnav-lnk.on{background:var(--acc-weak,#FDF1F6);border-color:var(--acc-line,#F6CADC);' +
    'color:var(--acc-ink,#C02159);font-weight:600}' +
    '#topNav .tnav-more{position:relative;display:inline-flex}' +
    '#topNav .tnav-menu{position:absolute;top:calc(100% + 8px);right:0;z-index:96;' +
    'background:var(--card,#fff);border:1px solid var(--line,#E9E9EF);border-radius:14px;' +
    'box-shadow:0 14px 38px -14px rgba(18,18,24,.35);padding:10px;display:grid;' +
    'grid-template-columns:1fr 1fr;gap:2px 18px;min-width:300px;max-width:calc(100vw - 24px)}' +
    '#topNav .tnav-grp{min-width:128px}' +
    '#topNav .tnav-gt{font-size:10.5px;font-weight:600;color:var(--mut,#A3A3AD);letter-spacing:.4px;margin:5px 8px 3px}' +
    '#topNav .tnav-grp a{display:block;padding:6px 8px;border-radius:8px;font-size:12.8px;' +
    'color:var(--ink,#15151A);text-decoration:none;white-space:nowrap}' +
    '#topNav .tnav-grp a:hover{background:var(--acc-weak,#FDF1F6);color:var(--acc-ink,#C02159)}' +
    '#topNav .tnav-grp a.on{background:var(--acc-weak,#FDF1F6);color:var(--acc-ink,#C02159);font-weight:600}';

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
      if (el) el.addEventListener('change', render);   /* 切界面语言时导航跟着换 */
    });
  }

  if (d.readyState === 'loading') d.addEventListener('DOMContentLoaded', boot);
  else boot();

  w.SiteTopNav = { render: render, lang: function () { return L; }, cur: CUR };
})(window, document);
