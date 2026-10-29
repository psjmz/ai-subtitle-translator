/* =============================================================================
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
     2) body 末尾引入：<script src="site-topnav.js?v=0.9.318" data-tool="tr"><\/script>
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
  /* 15 工具名：navTr/navFx 是顶栏主项，其余进 Mega 下拉 */
    'zh-CN': { navTr: '字幕翻译', navGuide: '使用指南', navFx: '特效字幕', navCv: '格式转换', navTbl: '表格互转', navHc: '简繁转换', navSp: '双语剥离', navSplt: '拆分拼接', navSh: '时间轴调整', navCl: '字幕清洗', navLrc: '歌词打轴', navEx: '提取文本', navVs: '视频字幕', navRp: '乱码修复', navGl: '术语替换', navBt: '批量转换', navQc: '字幕质检', navYt: '油管断句', navAu: '音频转字幕', navOc: '画面字幕识别', navMl: '多语批量', navKtv: 'KTV字幕' },
    'zh-TW': { navTr: '字幕翻譯', navGuide: '使用指南', navFx: '特效字幕', navCv: '格式轉換', navTbl: '表格互轉', navHc: '簡繁轉換', navSp: '雙語剝離', navSplt: '拆分拼接', navSh: '時間軸調整', navCl: '字幕清洗', navLrc: '歌詞打軸', navEx: '擷取文本', navVs: '影片字幕', navRp: '亂碼修復', navGl: '術語替換', navBt: '批次轉換', navQc: '字幕質檢', navYt: '油管斷句', navAu: '音訊轉字幕', navOc: '畫面字幕辨識', navMl: '多語批次', navKtv: 'KTV字幕' },
    'en': { navTr: 'Translate', navGuide: 'Guides', navFx: 'Styled subs', navCv: 'Convert', navTbl: 'Table', navHc: 'Chinese', navSp: 'Split bilingual', navSplt: 'Split', navSh: 'Timing', navCl: 'Clean up', navLrc: 'Lyrics', navEx: 'Text Extractor', navVs: 'Video', navRp: 'Encoding Fix', navGl: 'Glossary', navBt: 'Batch', navQc: 'QC', navYt: 'YT Captions', navAu: 'Audio to Subs', navOc: 'Video OCR', navMl: 'Multi-lang', navKtv: 'Karaoke subs' },
    'ja': { navTr: '字幕翻訳', navGuide: '使い方ガイド', navFx: '装飾字幕', navCv: '形式変換', navTbl: '表変換', navHc: '繁簡変換', navSp: '二か国語分離', navSplt: '分割・結合', navSh: 'タイミング調整', navCl: '字幕クリーニング', navLrc: '歌詞合わせ', navEx: 'テキスト抽出', navVs: '動画字幕', navRp: '文字化け修復', navGl: '用語置換', navBt: '一括変換', navQc: '字幕QC', navYt: 'YT 文分割', navAu: '音声から字幕', navOc: '動画OCR', navMl: '多言語一括', navKtv: 'カラオケ字幕' },
    'es': { navTr: 'Traducir', navGuide: 'Guías', navFx: 'Subtítulos con estilo', navCv: 'Convertir', navTbl: 'Tabla', navHc: 'Chino', navSp: 'Separar bilingüe', navSplt: 'Dividir', navSh: 'Sincronía', navCl: 'Limpiar', navLrc: 'Letra', navEx: 'Extraer texto', navVs: 'Vídeo', navRp: 'Arreglar codificación', navGl: 'Glosario', navBt: 'Lote', navQc: 'Control', navYt: 'Cortes YT', navAu: 'Audio a subtítulos', navOc: 'OCR de vídeo', navMl: 'Multi-idioma', navKtv: 'Subtítulos karaoke' },
    'pt': { navTr: 'Traduzir', navGuide: 'Guias', navFx: 'Legendas estilizadas', navCv: 'Converter', navTbl: 'Tabela', navHc: 'Chinês', navSp: 'Separar bilíngue', navSplt: 'Dividir', navSh: 'Sincronia', navCl: 'Limpar', navLrc: 'Letra', navEx: 'Extrair texto', navVs: 'Vídeo', navRp: 'Corrigir codificação', navGl: 'Glossário', navBt: 'Lote', navQc: 'Controlo', navYt: 'Cortes YT', navAu: 'Áudio em legendas', navOc: 'OCR de vídeo', navMl: 'Multi-idioma', navKtv: 'Legendas karaokê' },
    'ko': { navTr: '자막 번역', navGuide: '사용 가이드', navFx: '효과 자막', navCv: '형식 변환', navTbl: '표 변환', navHc: '한자 변환', navSp: '이중 언어 분리', navSplt: '분할·결합', navSh: '타임라인 조정', navCl: '자막 정리', navLrc: '가사 타이밍', navEx: '텍스트 추출', navVs: '동영상', navRp: '인코딩 복구', navGl: '용어 치환', navBt: '일괄 변환', navQc: '자막 검수', navYt: 'YT 문장 분할', navAu: '음성→자막', navOc: '영상 OCR', navMl: '다국어 일괄', navKtv: 'KTV 자막' },
    'de': { navTr: 'Übersetzen', navGuide: 'Anleitungen', navFx: 'Stilisierte Untertitel', navCv: 'Konvertieren', navTbl: 'Tabelle', navHc: 'Chinesisch', navSp: 'Zweisprachig trennen', navSplt: 'Teilen', navSh: 'Timing', navCl: 'Aufräumen', navLrc: 'Lyrics', navEx: 'Text extrahieren', navVs: 'Video', navRp: 'Kodierung reparieren', navGl: 'Glossar', navBt: 'Stapel', navQc: 'Prüfung', navYt: 'YT-Sätze', navAu: 'Audio zu Untertiteln', navOc: 'Video-OCR', navMl: 'Mehrsprachig', navKtv: 'Karaoke' },
    'fr': { navTr: 'Traduire', navGuide: 'Guides', navFx: 'Sous-titres stylés', navCv: 'Convertir', navTbl: 'Tableau', navHc: 'Chinois', navSp: 'Séparer le bilingue', navSplt: 'Scinder', navSh: 'Synchronisation', navCl: 'Nettoyer', navLrc: 'Paroles', navEx: 'Extraction de texte', navVs: 'Vidéo', navRp: 'Réparer l’encodage', navGl: 'Glossaire', navBt: 'Lot', navQc: 'Contrôle', navYt: 'Phrases YT', navAu: 'Audio en sous-titres', navOc: 'OCR vidéo', navMl: 'Multilingue', navKtv: 'Karaoké' },
    'id': { navTr: 'Terjemahan', navGuide: 'Panduan', navFx: 'Subtitle beraksen', navCv: 'Konversi', navTbl: 'Tabel', navHc: 'Hanzi', navSp: 'Pisahkan dwibahasa', navSplt: 'Pecah', navSh: 'Sinkronisasi', navCl: 'Bersihkan', navLrc: 'Lirik', navEx: 'Ekstrak teks', navVs: 'Video', navRp: 'Perbaiki Encoding', navGl: 'Glosarium', navBt: 'Massal', navQc: 'Pemeriksaan', navYt: 'Potong YT', navAu: 'Audio ke subtitle', navOc: 'OCR video', navMl: 'Multi-bahasa', navKtv: 'Subtitle karaoke' },
    'hi': { navTr: 'अनुवाद', navGuide: 'गाइड', navFx: 'सजावटी सबटाइटल', navCv: 'बदलें', navTbl: 'तालिका', navHc: 'चीनी लिपि', navSp: 'द्विभाषी अलग करें', navSplt: 'विभाजन', navSh: 'समय मिलान', navCl: 'सफाई', navLrc: 'बोल', navEx: 'टेक्स्ट एक्स्ट्रैक्टर', navVs: 'वीडियो', navRp: 'एन्कोडिंग सुधार', navGl: 'शब्दावली', navBt: 'बैच', navQc: 'जाँच', navYt: 'YT वाक्य', navAu: 'ऑडियो से सबटाइटल', navOc: 'वीडियो OCR', navMl: 'बहुभाषी', navKtv: 'कैराओके' },
    'th': { navTr: 'แปล', navGuide: 'คู่มือ', navFx: 'ซับไตเติลใส่เอฟเฟกต์', navCv: 'แปลงรูปแบบ', navTbl: 'ตาราง', navHc: 'อักษรจีน', navSp: 'แยกสองภาษา', navSplt: 'แยก·รวม', navSh: 'ปรับเวลา', navCl: 'ทำความสะอาด', navLrc: 'เนื้อเพลง', navEx: 'สกัดข้อความ', navVs: 'วิดีโอ', navRp: 'แก้รหัสอักขระ', navGl: 'แทนที่คำศัพท์', navBt: 'แบบชุด', navQc: 'ตรวจสอบ', navYt: 'ตัดประโยค YT', navAu: 'เสียงเป็นซับ', navOc: 'OCR วิดีโอ', navMl: 'หลายภาษา', navKtv: 'คาราโอเกะ' },
    'vi': { navTr: 'Dịch', navGuide: 'Hướng dẫn', navFx: 'Phụ đề cách điệu', navCv: 'Chuyển đổi', navTbl: 'Bảng', navHc: 'Chữ Hán', navSp: 'Tách song ngữ', navSplt: 'Tách·nối', navSh: 'Căn thời gian', navCl: 'Làm sạch', navLrc: 'Lời', navEx: 'Trích văn bản', navVs: 'Video', navRp: 'Sửa lỗi mã hóa', navGl: 'Thay thuật ngữ', navBt: 'Hàng loạt', navQc: 'Kiểm tra', navYt: 'Ngắt câu YT', navAu: 'Âm thanh thành phụ đề', navOc: 'OCR video', navMl: 'Đa ngôn ngữ', navKtv: 'Phụ đề karaoke' },
    'ru': { navTr: 'Перевод', navGuide: 'Руководства', navFx: 'Оформленные субтитры', navCv: 'Конвертация', navTbl: 'Таблица', navHc: 'Китайский', navSp: 'Разделить двуязычные', navSplt: 'Разделить', navSh: 'Синхронизация', navCl: 'Очистка', navLrc: 'Текст', navEx: 'Извлечение текста', navVs: 'Видео', navRp: 'Исправление кодировки', navGl: 'Глоссарий', navBt: 'Пакет', navQc: 'Проверка', navYt: 'Фразы YT', navAu: 'Аудио в субтитры', navOc: 'OCR видео', navMl: 'Мультиязык', navKtv: 'Караоке' },
    'it': { navTr: 'Traduci', navGuide: 'Guide', navFx: 'Sottotitoli con stile', navCv: 'Converti', navTbl: 'Tabella', navHc: 'Cinese', navSp: 'Separa bilingue', navSplt: 'Dividi', navSh: 'Sincronizzazione', navCl: 'Pulisci', navLrc: 'Testi', navEx: 'Estrazione testo', navVs: 'Video', navRp: 'Correggi codifica', navGl: 'Glossario', navBt: 'Blocco', navQc: 'Controllo', navYt: 'Frasi YT', navAu: 'Audio in sottotitoli', navOc: 'OCR video', navMl: 'Multilingua', navKtv: 'Sottotitoli karaoke' },
    'ar': { navTr: 'ترجمة', navGuide: 'أدلة', navFx: 'ترجمات منسقة', navCv: 'تحويل', navTbl: 'جدول', navHc: 'الصينية', navSp: 'فصل ثنائي اللغة', navSplt: 'تقسيم', navSh: 'ضبط التوقيت', navCl: 'تنظيف', navLrc: 'كلمات', navEx: 'استخراج النص', navVs: 'فيديو', navRp: 'إصلاح الترميز', navGl: 'المصطلحات', navBt: 'دفعة', navQc: 'فحص', navYt: 'جمل يوتيوب', navAu: 'صوت إلى ترجمة', navOc: 'OCR فيديو', navMl: 'متعدد اللغات', navKtv: 'كاريوكي' },
    'tr': { navTr: 'Çeviri', navGuide: 'Kılavuzlar', navFx: 'Stil altyazı', navCv: 'Dönüştür', navTbl: 'Tablo', navHc: 'Çince', navSp: 'İki dili ayır', navSplt: 'Böl', navSh: 'Zamanlama', navCl: 'Temizle', navLrc: 'Sözler', navEx: 'Metin Çıkarıcı', navVs: 'Video', navRp: 'Kodlama Onarma', navGl: 'Terimler', navBt: 'Toplu', navQc: 'Denetim', navYt: 'YT cümle', navAu: 'Sesten altyazı', navOc: 'Video OCR', navMl: 'Çok dilli', navKtv: 'Karaoke altyazı' },
    'nl': { navTr: 'Vertalen', navGuide: 'Gidsen', navFx: 'Ondertitels met stijl', navCv: 'Converteren', navTbl: 'Tabel', navHc: 'Chinees', navSp: 'Tweetalig splitsen', navSplt: 'Splitsen', navSh: 'Timing', navCl: 'Opschonen', navLrc: 'Lyrics', navEx: 'Tekst extraheren', navVs: 'Video', navRp: 'Codering herstellen', navGl: 'Woordenlijst', navBt: 'Batch', navQc: 'Controle', navYt: 'YT-zinnen', navAu: 'Audio naar ondertitels', navOc: 'Video-OCR', navMl: 'Meertalig', navKtv: 'Karaoke' },
    'pl': { navTr: 'Tłumaczenie', navGuide: 'Poradniki', navFx: 'Napisy z efektami', navCv: 'Konwersja', navTbl: 'Tabela', navHc: 'Chiński', navSp: 'Podział dwujęzyczny', navSplt: 'Podziel', navSh: 'Synchronizacja', navCl: 'Czyszczenie', navLrc: 'Tekst', navEx: 'Ekstrakcja tekstu', navVs: 'Wideo', navRp: 'Naprawa kodowania', navGl: 'Słownik', navBt: 'Partia', navQc: 'Kontrola', navYt: 'Zdania YT', navAu: 'Audio na napisy', navOc: 'OCR wideo', navMl: 'Wiele języków', navKtv: 'Karaoke' },
    'sv': { navTr: 'Översätt', navGuide: 'Guider', navFx: 'Stilade undertexter', navCv: 'Konvertera', navTbl: 'Tabell', navHc: 'Kinesiska', navSp: 'Dela tvåspråkig', navSplt: 'Dela', navSh: 'Synkronisering', navCl: 'Städa', navLrc: 'Text', navEx: 'Textutdrag', navVs: 'Video', navRp: 'Fixa teckenkodning', navGl: 'Ordlista', navBt: 'Batch', navQc: 'Kontroll', navYt: 'YT-meningar', navAu: 'Ljud till undertexter', navOc: 'Video-OCR', navMl: 'Flera språk', navKtv: 'Karaoke' },
    'cs': { navTr: 'Překlad', navGuide: 'Návody', navFx: 'Stylované titulky', navCv: 'Převést', navTbl: 'Tabulka', navHc: 'Čínština', navSp: 'Rozdělit dvojjazyčné', navSplt: 'Rozdělit', navSh: 'Synchronizace', navCl: 'Vyčistit', navLrc: 'Text', navEx: 'Extrakce textu', navVs: 'Video', navRp: 'Oprava kódování', navGl: 'Glosář', navBt: 'Dávka', navQc: 'Kontrola', navYt: 'Věty YT', navAu: 'Zvuk na titulky', navOc: 'OCR videa', navMl: 'Více jazyků', navKtv: 'Karaoke' },
    'uk': { navTr: 'Переклад', navGuide: 'Посібники', navFx: 'Оформлені субтитри', navCv: 'Конвертація', navTbl: 'Таблиця', navHc: 'Китайська', navSp: 'Розділити двомовні', navSplt: 'Розділити', navSh: 'Синхронізація', navCl: 'Очищення', navLrc: 'Текст', navEx: 'Витяг тексту', navVs: 'Відео', navRp: 'Виправлення кодування', navGl: 'Глосарій', navBt: 'Пакет', navQc: 'Перевірка', navYt: 'Фрази YT', navAu: 'Аудіо в субтитри', navOc: 'OCR відео', navMl: 'Багатомовний', navKtv: 'Караоке' },
    'da': { navTr: 'Oversæt', navGuide: 'Vejledninger', navFx: 'Stilede undertekster', navCv: 'Konverter', navTbl: 'Tabel', navHc: 'Kinesisk', navSp: 'Del tosproget', navSplt: 'Opdel', navSh: 'Synkronisering', navCl: 'Ryd op', navLrc: 'Tekst', navEx: 'Tekstudtræk', navVs: 'Video', navRp: 'Ret tegnkodning', navGl: 'Ordliste', navBt: 'Batch', navQc: 'Kontrol', navYt: 'YT-sætninger', navAu: 'Lyd til undertekster', navOc: 'Video-OCR', navMl: 'Flere sprog', navKtv: 'Karaoke' },
    'fi': { navTr: 'Käännä', navGuide: 'Oppaat', navFx: 'Tyylitellyt tekstit', navCv: 'Muunna', navTbl: 'Taulukko', navHc: 'Kiina', navSp: 'Erottele kaksikielinen', navSplt: 'Jaa', navSh: 'Ajoitus', navCl: 'Siivoa', navLrc: 'Sanoitus', navEx: 'Tekstin poiminta', navVs: 'Video', navRp: 'Merkistökoodin korjaus', navGl: 'Sanasto', navBt: 'Erä', navQc: 'Tarkistus', navYt: 'YT-lauseet', navAu: 'Ääni tekstitykseksi', navOc: 'Video-OCR', navMl: 'Monikielinen', navKtv: 'Karaoke' },
    'el': { navTr: 'Μετάφραση', navGuide: 'Οδηγοί', navFx: 'Υπότιτλοι με στυλ', navCv: 'Μετατροπή', navTbl: 'Πίνακας', navHc: 'Κινεζικά', navSp: 'Διαχωρισμός δίγλωσσων', navSplt: 'Διάσπαση', navSh: 'Συγχρονισμός', navCl: 'Καθαρισμός', navLrc: 'Στίχοι', navEx: 'Εξαγωγή κειμένου', navVs: 'Βίντεο', navRp: 'Διόρθωση κωδικοποίησης', navGl: 'Γλωσσάρι', navBt: 'Μαζικά', navQc: 'Έλεγχος', navYt: 'Φράσεις YT', navAu: 'Ήχος σε υπότιτλους', navOc: 'OCR βίντεο', navMl: 'Πολυγλωσσικό', navKtv: 'Καραόκε' },
    'he': { navTr: 'תרגום', navGuide: 'מדריכים', navFx: 'כתוביות מעוצבות', navCv: 'המרה', navTbl: 'טבלה', navHc: 'סינית', navSp: 'הפרדה דו-לשונית', navSplt: 'פיצול', navSh: 'תזמון', navCl: 'ניקוי', navLrc: 'מילים', navEx: 'חילוץ טקסט', navVs: 'וידאו', navRp: 'תיקון קידוד', navGl: 'מונחים', navBt: 'אצווה', navQc: 'בדיקה', navYt: 'משפטי YT', navAu: 'אודיו לכתוביות', navOc: 'OCR וידאו', navMl: 'רב-לשוני', navKtv: 'קריוקי' },
    'ro': { navTr: 'Traducere', navGuide: 'Ghiduri', navFx: 'Subtitrări cu stil', navCv: 'Conversie', navTbl: 'Tabel', navHc: 'Chineză', navSp: 'Separă bilingv', navSplt: 'Împarte', navSh: 'Sincronizare', navCl: 'Curățare', navLrc: 'Versuri', navEx: 'Extragere text', navVs: 'Video', navRp: 'Reparare codare', navGl: 'Glosar', navBt: 'Lot', navQc: 'Verificare', navYt: 'Fraze YT', navAu: 'Audio în subtitrări', navOc: 'OCR video', navMl: 'Multilingv', navKtv: 'Karaoke' },
  };

  /* ---------- 工具一句话描述 × 27 语（收割自 site-i18n.js 首页卡片） ---------- */
  var D = {
  /* 13 描述：与首页工具卡片 tcXxD 同文案，Mega 下拉复用 */
    'zh-CN': { tcCvD: 'SRT / VTT / ASS 等 7 种格式互转', tcTbD: 'Excel 里逐行校对，改完导回', tcHcD: '简繁互转，可选台湾 / 香港用法', tcBiD: '把双语字幕拆成原文轨和译文轨', tcSpD: '按时长条数切开，多份合一', tcShD: '整体偏移、缩放、合并拆分、逐条微调', tcClD: '去广告水印、听障提示，13 条规则可开关', tcLrD: '听歌逐句点时间，导出 LRC', tcExD: '从字幕里提取纯台词，两种排版', tcVsD: '把 MKV / MP4 里的内封字幕轨抽成 SRT', tcRpD: '认出认错的编码，把乱码倒回原样', tcGlD: '按术语表批量改词，逐条可还原', tcBtD: '几百个文件一次转，打包 ZIP', tcQcD: '按这门语言的规矩查时间轴与排版', tcYtD: '把断在半句的自动字幕按句子重新切条', tcAuD: '浏览器里跑语音识别：音频或视频进，SRT 出', tcOcD: '把烧在画面上的字幕逐帧认出来', tcMlD: '整季字幕一次上传，多种语言排队跑完', tcKtvD: '跟着伴奏逐字扫色，导出卡拉OK字幕' },
    'zh-TW': { tcCvD: 'SRT / VTT / ASS 等 7 種格式互轉', tcTbD: 'Excel 裡逐行校對，改完匯回', tcHcD: '簡繁互轉，可選台灣 / 香港用法', tcBiD: '把雙語字幕拆成原文軌和譯文軌', tcSpD: '按時長條數切開，多份合一', tcShD: '整體偏移、縮放、合併拆分、逐條微調', tcClD: '去廣告浮水印、聽障提示，13 條規則可開關', tcLrD: '聽歌逐句點時間，匯出 LRC', tcExD: '從字幕裡擷取純台詞，兩種排版', tcVsD: '把 MKV / MP4 裡的內封字幕軌抽成 SRT', tcRpD: '認出認錯的編碼，把亂碼倒回原樣', tcGlD: '按術語表批次改詞，逐條可還原', tcBtD: '幾百個檔案一次轉，打包 ZIP', tcQcD: '依這門語言的規矩檢查時間軸與排版', tcYtD: '把斷在半句的自動字幕依句子重新切條', tcAuD: '瀏覽器裡跑語音辨識：音訊或影片進，SRT 出', tcOcD: '把燒在畫面中的字幕逐幀認出來', tcMlD: '整季字幕一次上傳，多種語言排隊跑完', tcKtvD: '跟著伴奏逐字掃色，匯出卡拉OK字幕' },
    'en': { tcCvD: 'Convert between 7 formats: SRT / VTT / ASS and more', tcTbD: 'Review line by line in Excel, import back', tcHcD: 'Simplified ⇄ Traditional, Taiwan / Hong Kong aware', tcBiD: 'Split bilingual subtitles into source and translation tracks', tcSpD: 'Cut by duration or count, join many into one', tcShD: 'Global offset, rescale, merge, split, cue-by-cue tweak', tcClD: 'Strip ads, watermarks and SDH cues — 13 switchable rules', tcLrD: 'Tap each line while listening, export LRC', tcExD: 'Pull plain dialogue out of subtitles, two layouts', tcVsD: 'Pull the embedded subtitle track out of MKV / MP4', tcRpD: 'Detect the misread encoding and undo the garble', tcGlD: 'One glossary rewrites the whole file', tcBtD: 'Convert hundreds of files into one ZIP', tcQcD: 'Check timing and layout by that language\'s rules', tcYtD: 'Re-cut auto-captions so cues end on sentences', tcAuD: 'Speech recognition in your browser: audio or video in, SRT out', tcOcD: 'Read subtitles burned into the picture, frame by frame', tcMlD: 'A whole season in, every language out', tcKtvD: 'Colour each word to the beat, export karaoke' },
    'ja': { tcCvD: 'SRT / VTT / ASS など 7 形式を相互変換', tcTbD: 'Excel で行ごとに確認し、書き戻す', tcHcD: '簡体字 ⇄ 繁体字、台湾 / 香港対応', tcBiD: '二か国語字幕を原文と訳文の2トラックに分離', tcSpD: '長さや条数で分割、複数を 1 本に', tcShD: '一括シフト・縮尺・結合分割・個別調整', tcClD: '広告・透かし・聴覚障害者向け字幕を除去、13 ルールを個別に切替', tcLrD: '聴きながら行ごとに、LRC を書き出し', tcExD: '字幕からセリフだけを取り出す、2種類のレイアウト', tcVsD: 'MKV / MP4 の内蔵字幕トラックを SRT に', tcRpD: '誤認識したエンコードを見抜き、文字化けを元に戻す', tcGlD: '用語集ひとつで丸ごと置き換え', tcBtD: '何百ファイルも一括で ZIP に', tcQcD: 'その言語の規則でタイミングと組み版を検査', tcYtD: '文の途中で切れた自動字幕を文単位で切り直す', tcAuD: 'ブラウザ内で音声認識。音声・動画を入れると SRT が出ます', tcOcD: '映像に焼き込まれた字幕をフレームごとに読み取る', tcMlD: 'シーズン全話を一度に、言語ごとに順番で', tcKtvD: '伴奏に合わせて1文字ずつ色を抜く' },
    'es': { tcCvD: 'Convierte entre 7 formatos: SRT / VTT / ASS y más', tcTbD: 'Revisa línea a línea en Excel y vuelve', tcHcD: 'Simplificado ⇄ tradicional, con Taiwán / Hong Kong', tcBiD: 'Divide subtítulos bilingües en pista original y traducida', tcSpD: 'Corta por duración o líneas, une muchos', tcShD: 'Desplazamiento global, escala, fusionar, dividir, ajuste fino', tcClD: 'Strip ads, watermarks and SDH cues — 13 switchable rules', tcLrD: 'Marca cada línea escuchando, exporta LRC', tcExD: 'Saca los diálogos puros de los subtítulos, dos diseños', tcVsD: 'Saca la pista de subtítulos incrustada de MKV / MP4', tcRpD: 'Detecta la codificación mal leída y revierte el daño', tcGlD: 'Un glosario cambia todo el archivo', tcBtD: 'Cientos de archivos en un solo ZIP', tcQcD: 'Comprueba tiempo y maquetación con las reglas del idioma', tcYtD: 'Recorta los subtítulos automáticos por frases completas', tcAuD: 'Reconocimiento de voz en el navegador: entra audio o vídeo, sale SRT', tcOcD: 'Lee los subtítulos incrustados en la imagen, fotograma a fotograma', tcMlD: 'Temporada completa, un idioma tras otro', tcKtvD: 'Colorea letra por letra y exporta karaoke' },
    'pt': { tcCvD: 'Converte entre 7 formatos: SRT / VTT / ASS e mais', tcTbD: 'Revise linha a linha no Excel e volte', tcHcD: 'Simplificado ⇄ tradicional, com Taiwan / Hong Kong', tcBiD: 'Divide legendas bilíngues em faixa original e traduzida', tcSpD: 'Corte por duração ou linhas, una muitos', tcShD: 'Deslocamento global, escala, mesclar, dividir, retoque fino', tcClD: 'Strip ads, watermarks and SDH cues — 13 switchable rules', tcLrD: 'Marque cada linha ouvindo, exporte LRC', tcExD: 'Tira as falas puras das legendas, dois layouts', tcVsD: 'Tire a faixa de legendas embutida de MKV / MP4', tcRpD: 'Detecta a codificação lida errado e desfaz o estrago', tcGlD: 'Um glossário muda o arquivo todo', tcBtD: 'Centenas de arquivos em um ZIP', tcQcD: 'Verifica tempo e formatação com as regras do idioma', tcYtD: 'Recorta as legendas automáticas por frases completas', tcAuD: 'Reconhecimento de fala no navegador: entra áudio ou vídeo, sai SRT', tcOcD: 'Lê as legendas gravadas na imagem, fotograma a fotograma', tcMlD: 'Temporada inteira, um idioma de cada vez', tcKtvD: 'Pinte letra por letra e exporte karaokê' },
    'ko': { tcCvD: 'SRT / VTT / ASS 등 7가지 형식 상호 변환', tcTbD: 'Excel에서 줄별 검수 후 되돌리기', tcHcD: '간체 ⇄ 번체, 대만 / 홍콩 지원', tcBiD: '이중언어 자막을 원어 트랙과 번역 트랙으로 분리', tcSpD: '길이·줄 수로 자르고 여러 개 합치기', tcShD: '전체 이동, 배율, 병합·분할, 항목별 미세 조정', tcClD: 'Strip ads, watermarks and SDH cues — 13 switchable rules', tcLrD: '듣으며 줄마다 찍고 LRC 내보내기', tcExD: '자막에서 대사만 뽑아내는 두 가지 배치', tcVsD: 'MKV / MP4 의 내장 자막 트랙을 SRT 로', tcRpD: '잘못 읽은 인코딩을 찾아내 깨진 글자를 되돌립니다', tcGlD: '용어집 하나로 파일 전체 교체', tcBtD: '수백 개 파일을 ZIP 하나로', tcQcD: '그 언어 규칙으로 타임라인과 줄바꿈 검사', tcYtD: '문장 중간에서 끊긴 자동 자막을 문장 단위로 다시 자릅니다', tcAuD: '브라우저에서 음성 인식: 음성·영상 입력, SRT 출력', tcOcD: '화면에 새겨진 자막을 프레임 단위로 읽기', tcMlD: '시즌 전체를 한 번에, 언어별로 차례로', tcKtvD: '반주에 맞춰 글자마다 색칠해 내보내기' },
    'de': { tcCvD: 'Konvertiert zwischen 7 Formaten: SRT / VTT / ASS und mehr', tcTbD: 'Zeile für Zeile in Excel prüfen, zurückholen', tcHcD: 'Vereinfacht ⇄ Traditionell, mit Taiwan / Hongkong', tcBiD: 'Trennt zweisprachige Untertitel in Original- und Übersetzungsspur', tcSpD: 'Nach Dauer oder Zeilen schneiden, vieles vereinen', tcShD: 'Globaler Versatz, Skalierung, zusammenführen, teilen, Feinjustage', tcClD: 'Strip ads, watermarks and SDH cues — 13 switchable rules', tcLrD: 'Beim Hören jede Zeile timen, LRC exportieren', tcExD: 'Holt reine Dialoge aus Untertiteln, zwei Layouts', tcVsD: 'Eingebettete Untertitelspur aus MKV / MP4 holen', tcRpD: 'Erkennt die falsch gelesene Kodierung und dreht den Salat zurück', tcGlD: 'Ein Glossar ändert die ganze Datei', tcBtD: 'Hunderte Dateien in einem ZIP', tcQcD: 'Timing und Satz nach den Regeln der Sprache prüfen', tcYtD: 'Schneidet automatische Untertitel an Satzgrenzen neu', tcAuD: 'Spracherkennung im Browser: Audio oder Video rein, SRT raus', tcOcD: 'In das Bild eingebrannte Untertitel Bild für Bild lesen', tcMlD: 'Ganze Staffel rein, Sprache für Sprache raus', tcKtvD: 'Zeichen für Zeichen im Takt färben' },
    'fr': { tcCvD: 'Convertit entre 7 formats : SRT / VTT / ASS et plus', tcTbD: 'Relisez ligne à ligne dans Excel, réimportez', tcHcD: 'Simplifié ⇄ traditionnel, avec Taïwan / Hong Kong', tcBiD: 'Sépare les sous-titres bilingues en piste source et piste traduite', tcSpD: 'Coupez par durée ou lignes, fusionnez', tcShD: 'Décalage global, redimensionner, fusionner, diviser, ajustage fin', tcClD: 'Strip ads, watermarks and SDH cues — 13 switchable rules', tcLrD: 'Chronométrez chaque ligne en écoutant, exportez en LRC', tcExD: 'Tire les dialogues purs des sous-titres, deux mises en page', tcVsD: 'Sortez la piste de sous-titres intégrée d’un MKV / MP4', tcRpD: 'Détecte l’encodage mal lu et annule le charabia', tcGlD: 'Un glossaire change tout le fichier', tcBtD: 'Des centaines de fichiers en un ZIP', tcQcD: 'Vérifie timing et mise en page selon les règles de la langue', tcYtD: 'Redécoupe les sous-titres automatiques à la fin des phrases', tcAuD: 'Reconnaissance vocale dans le navigateur : audio ou vidéo en entrée, SRT en sortie', tcOcD: 'Lire les sous-titres incrustés dans l’image, image par image', tcMlD: 'Toute une saison, langue après langue', tcKtvD: 'Colorez au rythme, caractère par caractère' },
    'id': { tcCvD: 'Konversi antar 7 format: SRT / VTT / ASS dan lainnya', tcTbD: 'Tinjau per baris di Excel, impor kembali', tcHcD: 'Sederhana ⇄ Tradisional, dengan Taiwan / Hong Kong', tcBiD: 'Pisahkan subtitle dwibahasa jadi trek asli dan terjemahan', tcSpD: 'Potong per durasi/baris, gabungkan banyak', tcShD: 'Geser global, skala, gabung, pecah, rapikan per baris', tcClD: 'Strip ads, watermarks and SDH cues — 13 switchable rules', tcLrD: 'Tandai tiap baris sambil dengar, ekspor LRC', tcExD: 'Ambil dialog murni dari subtitle, dua tata letak', tcVsD: 'Ambil track subtitle tertanam dari MKV / MP4', tcRpD: 'Deteksi encoding yang salah baca dan balikkan kerusakannya', tcGlD: 'Satu daftar istilah, seluruh berkas', tcBtD: 'Ratusan file jadi satu ZIP', tcQcD: 'Periksa timing dan tata letak sesuai aturan bahasanya', tcYtD: 'Memotong ulang subtitle otomatis per kalimat', tcAuD: 'Pengenalan suara di browser: audio atau video masuk, SRT keluar', tcOcD: 'Membaca subtitle yang menempel di gambar, frame demi frame', tcMlD: 'Satu musim sekaligus, bahasa demi bahasa', tcKtvD: 'Warnai per karakter, ekspor karaoke' },
    'hi': { tcCvD: '7 फ़ॉर्मेट में बदलें: SRT / VTT / ASS और भी', tcTbD: 'Excel में पंक्ति-दर-पंक्ति देखें, वापस लाएँ', tcHcD: 'सरलीकृत ⇄ पारंपरिक, ताइवान / हांगकांग सहित', tcBiD: 'द्विभाषी उपशीर्षक को मूल और अनुवाद ट्रैक में बाँटें', tcSpD: 'अवधि/पंक्तियों से काटें, कई को जोड़ें', tcShD: 'समग्र ऑफ़सेट, स्केल, मर्ज, स्प्लिट, क्यू-दर-क्यू फ़ाइन ट्यून', tcClD: 'Strip ads, watermarks and SDH cues — 13 switchable rules', tcLrD: 'सुनते हुए हर पंक्ति टैप करें, LRC निर्यात करें', tcExD: 'उपशीर्षक से शुद्ध संवाद निकालें, दो लेआउट', tcVsD: 'MKV / MP4 में छिपी सबटाइटल ट्रैक निकालें', tcRpD: 'ग़लत पढ़ी गई एन्कोडिंग पहचान कर गड़बड़ी उलटें', tcGlD: 'एक ग्लॉसरी, पूरी फ़ाइल', tcBtD: 'सैकड़ों फ़ाइलें एक ZIP में', tcQcD: 'उस भाषा के नियमों से समय और लेआउट जाँचें', tcYtD: 'ऑटो सबटाइटल को वाक्य के अंत पर फिर से काटें', tcAuD: 'ब्राउज़र में वाक् पहचान: ऑडियो या वीडियो डालें, SRT पाएं', tcOcD: 'तस्वीर में जड़े सबटाइटल को फ़्रेम-दर-फ़्रेम पढ़ें', tcMlD: 'पूरा सीज़न एक बार में, एक-एक भाषा', tcKtvD: 'ताल पर अक्षर-दर-अक्षर रंग भरें' },
    'th': { tcCvD: 'แปลงระหว่าง 7 ฟอร์แมต: SRT / VTT / ASS และอื่น ๆ', tcTbD: 'ตรวจทีละบรรทัดใน Excel แล้วส่งกลับ', tcHcD: 'ตัวย่อ ⇄ ตัวเต็ม รองรับไต้หวัน / ฮ่องกง', tcBiD: 'แยกซับสองภาษาเป็นแทร็กต้นฉบับและแทร็กแปล', tcSpD: 'ตัดตามความยาวหรือบรรทัด รวมหลายไฟล์', tcShD: 'ขยับทั้งไฟล์ ย่อ-ขยาย รวม แยก ปรับรายคิว', tcClD: 'Strip ads, watermarks and SDH cues — 13 switchable rules', tcLrD: 'ฟังแล้วปักทีละบรรทัด ส่งออก LRC', tcExD: 'ดึงบทพูดล้วน ๆ จากซับ สองแบบจัดวาง', tcVsD: 'ดึงแทร็กซับที่ฝังใน MKV / MP4 ออกมาเป็น SRT', tcRpD: 'จับ encoding ที่อ่านผิดแล้วย้อนความเพี้ยนกลับ', tcGlD: 'รายการเดียว ทั้งไฟล์ก็ตามมา', tcBtD: 'หลายร้อยไฟล์เป็น ZIP เดียว', tcQcD: 'ตรวจเวลาและการจัดวางตามกฎของภาษานั้น', tcYtD: 'ตัดซับอัตโนมัติใหม่ให้จบที่ท้ายประโยค', tcAuD: 'ถอดเสียงในเบราว์เซอร์: ใส่ออดิโอหรือวิดีโอ ได้ SRT', tcOcD: 'อ่านซับที่ฝังในภาพทีละเฟรม', tcMlD: 'ทั้งซีซั่นในครั้งเดียว ทีละภาษา', tcKtvD: 'ระบายสีทีละตัวอักษรตามจังหวะ' },
    'vi': { tcCvD: 'Chuyển đổi giữa 7 định dạng: SRT / VTT / ASS và hơn thế', tcTbD: 'Soát từng dòng trong Excel, nhập lại', tcHcD: 'Giản thể ⇄ Phồn thể, kèm Đài Loan / Hồng Kông', tcBiD: 'Tách phụ đề song ngữ thành track gốc và track dịch', tcSpD: 'Cắt theo thời lượng/dòng, gộp nhiều file', tcShD: 'Dịch chuyển toàn cục, co giãn, gộp tách, chỉnh từng câu', tcClD: 'Strip ads, watermarks and SDH cues — 13 switchable rules', tcLrD: 'Bấm mốc từng dòng khi nghe, xuất LRC', tcExD: 'Lấy đoạn hội thoại thuần từ phụ đề, hai kiểu trình bày', tcVsD: 'Rút track phụ đề gắn trong MKV / MP4 thành SRT', tcRpD: 'Nhận diện encoding bị đọc sai và khôi phục về nguyên bản', tcGlD: 'Một bảng thuật ngữ, cả tệp thay đổi', tcBtD: 'Hàng trăm file thành một ZIP', tcQcD: 'Kiểm tra thời gian và bố cục theo quy tắc ngôn ngữ', tcYtD: 'Cắt lại phụ đề tự động theo từng câu trọn vẹn', tcAuD: 'Nhận dạng giọng nói trong trình duyệt: đưa âm thanh hoặc video vào, nhận SRT', tcOcD: 'Đọc phụ đề gắn cứng trong hình, từng khung hình', tcMlD: 'Cả mùa một lần, lần lượt từng ngôn ngữ', tcKtvD: 'Tô màu từng chữ theo nhịp, xuất karaoke' },
    'ru': { tcCvD: 'Конвертация между 7 форматами: SRT / VTT / ASS и др.', tcTbD: 'Проверяй построчно в Excel, верни назад', tcHcD: 'Упрощённый ⇄ традиционный, с Тайванем / Гонконгом', tcBiD: 'Разделить двуязычные субтитры на оригинал и перевод', tcSpD: 'Режь по длительности или строкам, склеивай', tcShD: 'Общий сдвиг, масштабирование, склейка, разбивка, точная правка', tcClD: 'Strip ads, watermarks and SDH cues — 13 switchable rules', tcLrD: 'Отбивай строки на слух, экспортируй LRC', tcExD: 'Вытащить чистые реплики из субтитров, два формата вывода', tcVsD: 'Достать встроенную дорожку субтитров из MKV / MP4', tcRpD: 'Распознать неверно прочитанную кодировку и всё вернуть', tcGlD: 'Один глоссарий меняет весь файл', tcBtD: 'Сотни файлов в один ZIP', tcQcD: 'Проверит тайминг и вёрстку по правилам языка', tcYtD: 'Перережет автосубтитры по границам фраз', tcAuD: 'Распознавание речи в браузере: аудио или видео на входе, SRT на выходе', tcOcD: 'Читает впечатанные в кадр субтитры покадрово', tcMlD: 'Весь сезон сразу, язык за языком', tcKtvD: 'Раскрасьте по символам в такт музыке' },
    'it': { tcCvD: 'Conversione tra 7 formati: SRT / VTT / ASS e altri', tcTbD: 'Rivedi riga per riga in Excel, reimporta', tcHcD: 'Semplificato ⇄ tradizionale, con Taiwan / Hong Kong', tcBiD: 'Dividi i sottotitoli bilingui in traccia originale e tradotta', tcSpD: 'Taglia per durata o righe, unisci molti', tcShD: 'Offset globale, riscalatura, unione, divisione, ritocco per battuta', tcClD: 'Strip ads, watermarks and SDH cues — 13 switchable rules', tcLrD: 'Timbra ogni riga ascoltando, esporta LRC', tcExD: 'Estrai i dialoghi puri dai sottotitoli, due impaginazioni', tcVsD: 'Tira fuori la traccia di sottotitoli dentro MKV / MP4', tcRpD: 'Rileva la codifica letta male e annulla il guasto', tcGlD: 'Un glossario cambia tutto il file', tcBtD: 'Centinaia di file in un solo ZIP', tcQcD: 'Controlla timing e impaginazione secondo le regole della lingua', tcYtD: 'Ritaglia i sottotitoli automatici a fine frase', tcAuD: 'Riconoscimento vocale nel browser: audio o video in ingresso, SRT in uscita', tcOcD: 'Legge i sottotitoli impressi nell’immagine, fotogramma per fotogramma', tcMlD: 'Una stagione intera, una lingua alla volta', tcKtvD: 'Colora carattere per carattere a tempo' },
    'ar': { tcCvD: 'تحويل بين 7 صيغ: SRT / VTT / ASS وغيرها', tcTbD: 'راجع سطرًا سطرًا في Excel وأعد الاستيراد', tcHcD: 'المبسّطة ⇄ التقليدية، مع تايوان / هونغ كونغ', tcBiD: 'افصل الترجمة ثنائية اللغة إلى مسار أصلي ومسار مترجم', tcSpD: 'اقطع بالمدة أو الأسطر، ادمج الكثير', tcShD: 'إزاحة شاملة، تحجيم، دمج، تقسيم، ضبط سطر بسطر', tcClD: 'Strip ads, watermarks and SDH cues — 13 switchable rules', tcLrD: 'علّم كل سطر أثناء الاستماع، صدّر LRC', tcExD: 'أخرج الحوار الخالص من الترجمة، بطريقتي عرض', tcVsD: 'أخرج مسار الترجمة المدمج من MKV / MP4', tcRpD: 'اكتشف الترميز المقروء خطأً وأعد النص إلى أصله', tcGlD: 'مسرد واحد يغيّر الملف كله', tcBtD: 'مئات الملفات في ZIP واحد', tcQcD: 'يفحص التوقيت والتنسيق حسب قواعد اللغة', tcYtD: 'يعيد تقطيع الترجمات التلقائية عند نهاية الجمل', tcAuD: 'التعرف على الكلام في المتصفح: صوت أو فيديو يدخل، وSRT يخرج', tcOcD: 'قراءة الترجمة المحروقة في الصورة إطاراً بإطار', tcMlD: 'موسم كامل دفعة واحدة، لغة تلو الأخرى', tcKtvD: 'لوّن حرفاً بحرف مع الإيقاع' },
    'tr': { tcCvD: '7 format arasında dönüşüm: SRT / VTT / ASS ve dahası', tcTbD: 'Excel\'de satır satır incele, geri al', tcHcD: 'Basitleştirilmiş ⇄ Geleneksel, Tayvan / Hong Kong dahil', tcBiD: 'İki dilli altyazıyı orijinal ve çeviri parçasına ayır', tcSpD: 'Süreye ya da satıra göre kes, çoğu birleştir', tcShD: 'Genel kaydırma, ölçekleme, birleştirme, bölme, satır satır ayar', tcClD: 'Strip ads, watermarks and SDH cues — 13 switchable rules', tcLrD: 'Dinlerken her satırı damgala, LRC dışa aktar', tcExD: 'Altyazıdan saf diyalog çıkar, iki düzen', tcVsD: 'MKV / MP4 içindeki gömülü altyazı parçasını çıkar', tcRpD: 'Yanlış okunan kodlamayı tespit et, bozulmayı geri al', tcGlD: 'Bir sözlük, tüm dosyayı değiştirir', tcBtD: 'Yüzlerce dosya tek ZIP\'te', tcQcD: 'Zamanlama ve dizgiyi dilin kurallarına göre denetler', tcYtD: 'Otomatik altyazıları cümle sonlarına göre yeniden keser', tcAuD: 'Tarayıcıda konuşma tanıma: ses veya video girer, SRT çıkar', tcOcD: 'Görüntüye gömülü altyazıları kare kare okur', tcMlD: 'Tüm sezon tek seferde, dil dil', tcKtvD: 'Ritme göre harf harf renklendir' },
    'nl': { tcCvD: 'Converteren tussen 7 formaten: SRT / VTT / ASS en meer', tcTbD: 'Controleer regel voor regel in Excel, importeer terug', tcHcD: 'Vereenvoudigd ⇄ traditioneel, met Taiwan / Hongkong', tcBiD: 'Splits tweetalige ondertitels in bron- en vertaalspoor', tcSpD: 'Knip op duur of regels, voeg veel samen', tcShD: 'Globale offset, herschalen, samenvoegen, splitsen, per regel bijschaven', tcClD: 'Strip ads, watermarks and SDH cues — 13 switchable rules', tcLrD: 'Markeer elke regel tijdens het luisteren, exporteer LRC', tcExD: 'Haal zuivere dialogen uit ondertitels, twee lay-outs', tcVsD: 'Haal de ingebedde ondertiteltrack uit MKV / MP4', tcRpD: 'Herken de verkeerd gelezen encoding en zet het terug', tcGlD: 'Eén woordenlijst, heel het bestand', tcBtD: 'Honderden bestanden in één ZIP', tcQcD: 'Controleert timing en opmaak volgens de regels van de taal', tcYtD: 'Knipt automatische ondertitels op zinseinden opnieuw', tcAuD: 'Spraakherkenning in de browser: audio of video erin, SRT eruit', tcOcD: 'Leest ondertitels die in het beeld zijn gebrand, frame voor frame', tcMlD: 'Hele seizoen in één keer, taal voor taal', tcKtvD: 'Kleur teken voor teken op de maat' },
    'pl': { tcCvD: 'Konwersja między 7 formatami: SRT / VTT / ASS i inne', tcTbD: 'Sprawdzaj wiersz po wierszu w Excelu, przywróć', tcHcD: 'Uproszczony ⇄ tradycyjny, z Tajwanem / Hongkongiem', tcBiD: 'Rozdziel napisy dwujęzyczne na ścieżkę oryginału i tłumaczenia', tcSpD: 'Tnij po czasie lub liniach, łącz wiele', tcShD: 'Globalne przesunięcie, skalowanie, scalanie, dzielenie, korekta co do linii', tcClD: 'Strip ads, watermarks and SDH cues — 13 switchable rules', tcLrD: 'Zaznaczaj linie podczas słuchania, eksportuj LRC', tcExD: 'Wyciągnij czysty dialog z napisów, dwa układy', tcVsD: 'Wyjmij wbudowaną ścieżkę napisów z MKV / MP4', tcRpD: 'Wykryj błędnie odczytane kodowanie i cofnij uszkodzenie', tcGlD: 'Jeden glosariusz zmienia cały plik', tcBtD: 'Setki plików w jednym ZIP', tcQcD: 'Sprawdza czas i układ według reguł języka', tcYtD: 'Przecina automatyczne napisy na końcach zdań', tcAuD: 'Rozpoznawanie mowy w przeglądarce: audio lub wideo wchodzi, SRT wychodzi', tcOcD: 'Odczytuje napisy wypalone w obrazie, klatka po klatce', tcMlD: 'Cały sezon naraz, język po języku', tcKtvD: 'Pokoloruj znak po znaku w rytmie' },
    'sv': { tcCvD: 'Konvertera mellan 7 format: SRT / VTT / ASS med flera', tcTbD: 'Granska rad för rad i Excel, importera tillbaka', tcHcD: 'Förenklad ⇄ traditionell, med Taiwan / Hongkong', tcBiD: 'Dela tvåspråkiga undertexter i original- och översättningsspår', tcSpD: 'Klipp efter längd eller rader, foga samman många', tcShD: 'Global förskjutning, omskalning, sammanfoga, dela, finjustera rad för rad', tcClD: 'Strip ads, watermarks and SDH cues — 13 switchable rules', tcLrD: 'Märk varje rad medan du lyssnar, exportera LRC', tcExD: 'Dra ren dialog ur undertexter, två layouter', tcVsD: 'Ta ut det inbäddade textspåret ur MKV / MP4', tcRpD: 'Upptäck felaktigt avläst teckenkodning och ångra förvirringen', tcGlD: 'En ordlista ändrar hela filen', tcBtD: 'Hundratals filer i en enda ZIP', tcQcD: 'Kontrollerar timing och layout enligt språkets regler', tcYtD: 'Klipper om automatiska undertexter vid meningsslut', tcAuD: 'Taligenkänning i webbläsaren: ljud eller video in, SRT ut', tcOcD: 'Läser undertexter inbrända i bilden, ruta för ruta', tcMlD: 'Hela säsongen på en gång, språk för språk', tcKtvD: 'Färglägg tecken för tecken i takt' },
    'cs': { tcCvD: 'Převod mezi 7 formáty: SRT / VTT / ASS a další', tcTbD: 'Kontroluj řádek po řádku v Excelu, vrať zpět', tcHcD: 'Zjednodušená ⇄ tradiční, s Tchaj-wanem / Hongkongem', tcBiD: 'Rozdělte dvojjazyčné titulky na originál a překlad', tcSpD: 'Stříhej podle délky či řádků, slep mnoho', tcShD: 'Globální posun, přeškálování, slučování, dělení, doladění po řádcích', tcClD: 'Strip ads, watermarks and SDH cues — 13 switchable rules', tcLrD: 'Označujte řádky při poslechu, exportujte LRC', tcExD: 'Vytáhnout čistý dialog z titulků, dvě rozvržení', tcVsD: 'Vytáhněte vloženou titulkovou stopu z MKV / MP4', tcRpD: 'Rozpoznat špatně přečtené kódování a vrátit vše zpět', tcGlD: 'Jeden glosář změní celý soubor', tcBtD: 'Stovky souborů do jednoho ZIP', tcQcD: 'Zkontroluje timing a sazbu podle pravidel jazyka', tcYtD: 'Přestřihne automatické titulky na koncích vět', tcAuD: 'Rozpoznávání řeči v prohlížeči: zvuk nebo video dovnitř, SRT ven', tcOcD: 'Čte titulky vypálené v obraze, snímek po snímku', tcMlD: 'Celá sezóna najednou, jazyk po jazyku', tcKtvD: 'Barvěte znak po znaku v rytmu' },
    'uk': { tcCvD: 'Конвертація між 7 форматами: SRT / VTT / ASS та ін.', tcTbD: 'Вичитуй рядок за рядком в Excel, поверни назад', tcHcD: 'Спрощена ⇄ традиційна, з Тайванем / Гонконгом', tcBiD: 'Розділіть двомовні субтитри на оригінал і переклад', tcSpD: 'Ріж за тривалістю чи рядками, клей багато', tcShD: 'Загальний зсув, масштабування, склейка, розбивка, точна правка', tcClD: 'Strip ads, watermarks and SDH cues — 13 switchable rules', tcLrD: 'Позначайте рядки на слух, експортуйте LRC', tcExD: 'Дістати чисті репліки із субтитрів, два формати виводу', tcVsD: 'Витягніть вбудовану доріжку субтитрів з MKV / MP4', tcRpD: 'Розпізнати помилково прочитане кодування і все повернути', tcGlD: 'Один глосарій змінює весь файл', tcBtD: 'Сотні файлів в один ZIP', tcQcD: 'Перевіряє таймінг і верстку за правилами мови', tcYtD: 'Перерізає автосубтитри по межах фраз', tcAuD: 'Розпізнавання мовлення у браузері: аудіо чи відео на вході, SRT на виході', tcOcD: 'Читає вплавлені в кадр субтитри покадрово', tcMlD: 'Увесь сезон одразу, мова за мовою', tcKtvD: 'Розфарбуйте по символах у такт' },
    'da': { tcCvD: 'Konverter mellem 7 formater: SRT / VTT / ASS og flere', tcTbD: 'Gennemgå linje for linje i Excel, importér tilbage', tcHcD: 'Forenklet ⇄ traditionelt, med Taiwan / Hongkong', tcBiD: 'Del tosprogede undertekster i original- og oversættelsesspor', tcSpD: 'Klip efter varighed eller linjer, saml mange', tcShD: 'Global forskydning, omskalering, sammenlægning, opdeling, finjustering pr. linje', tcClD: 'Strip ads, watermarks and SDH cues — 13 switchable rules', tcLrD: 'Markér hver linje, mens du hører, eksportér LRC', tcExD: 'Træk ren dialog ud af undertekster, to layout', tcVsD: 'Træk det indlejrede undertekstspor ud af MKV / MP4', tcRpD: 'Opspor forkert læst tegnkodning og fortryd rodet', tcGlD: 'Én ordliste ændrer hele filen', tcBtD: 'Hundredevis af filer i én ZIP', tcQcD: 'Kontrollerer timing og layout efter sprogets regler', tcYtD: 'Klipper automatiske undertekster om ved sætningsslut', tcAuD: 'Talegenkendelse i browseren: lyd eller video ind, SRT ud', tcOcD: 'Læser undertekster brændt ind i billedet, billede for billede', tcMlD: 'En hel sæson ad gangen, sprog for sprog', tcKtvD: 'Farv tegn for tegn i takt' },
    'fi': { tcCvD: 'Muunna 7 muodon välillä: SRT / VTT / ASS ja muita', tcTbD: 'Tarkista rivi riviltä Excelissä, tuo takaisin', tcHcD: 'Yksinkertaistettu ⇄ perinteinen, Taiwan / Hongkong mukana', tcBiD: 'Erota kaksikieliset tekstitykset alkuperäis- ja käännösrataksi', tcSpD: 'Leikkaa keston tai rivimäärän mukaan, yhdistä paljon', tcShD: 'Kokonaissiirto, skaalaus, yhdistys, jako, rivikohtainen hienosäätö', tcClD: 'Strip ads, watermarks and SDH cues — 13 switchable rules', tcLrD: 'Merkitse jokainen rivi kuunnellessasi, vie LRC', tcExD: 'Poimi puhdas dialogi tekstityksistä, kaksi asettelua', tcVsD: 'Pura MKV / MP4 -tiedostoon upotettu tekstitysraita', tcRpD: 'Tunnista väärin luettu merkistö ja kumoa vahinko', tcGlD: 'Yksi sanasto muuttaa koko tiedoston', tcBtD: 'Satoja tiedostoja yhteen ZIP:iin', tcQcD: 'Tarkistaa ajoituksen ja asettelun kielen sääntöjen mukaan', tcYtD: 'Leikkaa automaattitekstitykset lauseen lopuista', tcAuD: 'Puheentunnistus selaimessa: ääni tai video sisään, SRT ulos', tcOcD: 'Lukee kuvaan poltetut tekstitykset kuva kuvalta', tcMlD: 'Koko kausi kerralla, kieli kerrallaan', tcKtvD: 'Väritä merkki merkiltä tahdissa' },
    'el': { tcCvD: 'Μετατροπή μεταξύ 7 μορφών: SRT / VTT / ASS και άλλων', tcTbD: 'Ελέγξτε γραμμή-γραμμή στο Excel, επανεισάγετε', tcHcD: 'Απλοποιημένα ⇄ παραδοσιακά, με Ταϊβάν / Χονγκ Κονγκ', tcBiD: 'Χώρισε τα δίγλωσσα υπότιτλους σε πρωτότυπο και μετάφραση', tcSpD: 'Κόψιμο ανά διάρκεια ή γραμμές, ένωση πολλών', tcShD: 'Γενική μετατόπιση, κλιμάκωση, συγχώνευση, διαίρεση, διόρθωση ανά γραμμή', tcClD: 'Strip ads, watermarks and SDH cues — 13 switchable rules', tcLrD: 'Σημειώστε κάθε στίχο καθώς ακούτε, εξαγάγετε LRC', tcExD: 'Βγάλε καθαρό διάλογο από υπότιτλους, δύο διατάξεις', tcVsD: 'Βγάλτε το ενσωματωμένο κομμάτι υποτίτλων από MKV / MP4', tcRpD: 'Ανίχνευσε τη λάθος αναγνωσμένη κωδικοποίηση και ανέτρεψέ τη', tcGlD: 'Ένα γλωσσάρι αλλάζει όλο το αρχείο', tcBtD: 'Εκατοντάδες αρχεία σε ένα ZIP', tcQcD: 'Ελέγχει χρονισμό και στοίχιση σύμφωνα με τους κανόνες της γλώσσας', tcYtD: 'Ξανακόβει τους αυτόματους υπότιτλους στο τέλος φράσης', tcAuD: 'Αναγνώριση ομιλίας στον browser: ήχος ή βίντεο μέσα, SRT έξω', tcOcD: 'Διαβάζει υπότιτλους καμένους στην εικόνα, καρέ-καρέ', tcMlD: 'Ολόκληρη σεζόν μεμιάς, γλώσσα τη γλώσσα', tcKtvD: 'Χρωματίστε χαρακτήρα χαρακτήρα στον ρυθμό' },
    'he': { tcCvD: 'המרה בין 7 פורמטים: SRT / VTT / ASS ועוד', tcTbD: 'סקרו שורה-שורה ב-Excel וייבאו בחזרה', tcHcD: 'מפושט ⇄ מסורתי, כולל טאיוואן / הונג קונג', tcBiD: 'פצלו כתוביות דו-לשוניות למסלול מקור ומסלול תרגום', tcSpD: 'חתכו לפי משך או שורות, מזגו הרבה', tcShD: 'הזזה גלובלית, שינוי קנה מידה, מיזוג, פיצול, כוונון שורה-שורה', tcClD: 'Strip ads, watermarks and SDH cues — 13 switchable rules', tcLrD: 'סמנו כל שורה בהאזנה, ייצאו LRC', tcExD: 'חלצו דיאלוג טהור מהכתוביות, שתי פריסות', tcVsD: 'הוציאו את רצועת הכתוביות המובנית מ-MKV / MP4', tcRpD: 'זהו קידוד שנקרא לא נכון ובטלו את הבלגן', tcGlD: 'מילון מונחים אחד משנה את כל הקובץ', tcBtD: 'מאות קבצים ב-ZIP אחד', tcQcD: 'בודק תזמון ועימוד לפי כללי השפה', tcYtD: 'חותך מחדש כתוביות אוטומטיות בסוף המשפט', tcAuD: 'זיהוי דיבור בדפדפן: אודיו או וידאו נכנס, SRT יוצא', tcOcD: 'קורא כתוביות צרובות בתמונה, פריים אחר פריים', tcMlD: 'עונה שלמה בבת אחת, שפה אחר שפה', tcKtvD: 'צבעו תו אחר תו עם הקצב' },
    'ro': { tcCvD: 'Conversie între 7 formate: SRT / VTT / ASS și altele', tcTbD: 'Verifică rând cu rând în Excel, importă înapoi', tcHcD: 'Simplificat ⇄ tradițional, cu Taiwan / Hong Kong', tcBiD: 'Separă subtitrările bilingve în pista originală și pista tradusă', tcSpD: 'Taie după durată sau rânduri, îmbină multe', tcShD: 'Decalare globală, rescalare, îmbinare, împărțire, ajustare rând cu rând', tcClD: 'Strip ads, watermarks and SDH cues — 13 switchable rules', tcLrD: 'Marchează fiecare rând ascultând, exportă LRC', tcExD: 'Extrage dialogul curat din subtitrări, două așezări', tcVsD: 'Scoate pista de subtitrări încorporată din MKV / MP4', tcRpD: 'Detectează codarea citită greșit și anulează stricarea', tcGlD: 'Un glosar schimbă tot fișierul', tcBtD: 'Sute de fișiere într-un singur ZIP', tcQcD: 'Verifică timingul și aspectul după regulile limbii', tcYtD: 'Retaie subtitrările automate la sfârșitul propoziției', tcAuD: 'Recunoaștere vocală în browser: audio sau video intră, SRT iese', tcOcD: 'Citește subtitrările arse în imagine, cadru cu cadru', tcMlD: 'Un sezon întreg deodată, limbă cu limbă', tcKtvD: 'Colorează caracter cu caracter pe ritm' },
  };

  /* ---------- 手写键 × 27 语 ---------- */
  var T = {
  /* tnVd 视频下载 / tnMore 更多工具 / tnG1..tnG4 分组名 / tnAll 全部工具 */
    'zh-CN': { tnVd: '视频下载', tnMore: '更多工具', tnG1: '转换与格式', tnG2: '双语与拆合', tnG3: '时间轴与清理', tnG4: '提取与批量', tnAll: '全部工具' },
    'zh-TW': { tnVd: '影片下載', tnMore: '更多工具', tnG1: '轉換與格式', tnG2: '雙語與拆合', tnG3: '時間軸與清理', tnG4: '擷取與批次', tnAll: '全部工具' },
    'en': { tnVd: 'Download Video', tnMore: 'More Tools', tnG1: 'Convert & Format', tnG2: 'Bilingual & Split', tnG3: 'Timing & Cleanup', tnG4: 'Extract & Batch', tnAll: 'All tools' },
    'ja': { tnVd: '動画ダウンロード', tnMore: 'その他のツール', tnG1: '変換・フォーマット', tnG2: '二か国語・分割', tnG3: '時間軸・クリーニング', tnG4: '抽出・一括', tnAll: 'すべてのツール' },
    'es': { tnVd: 'Descargar vídeo', tnMore: 'Más herramientas', tnG1: 'Conversión y formato', tnG2: 'Bilingüe y división', tnG3: 'Tiempo y limpieza', tnG4: 'Extracción y lotes', tnAll: 'Todas las herramientas' },
    'pt': { tnVd: 'Baixar vídeo', tnMore: 'Mais ferramentas', tnG1: 'Conversão e formato', tnG2: 'Bilíngue e divisão', tnG3: 'Tempo e limpeza', tnG4: 'Extração e lote', tnAll: 'Todas as ferramentas' },
    'ko': { tnVd: '동영상 다운로드', tnMore: '더 많은 도구', tnG1: '변환 및 형식', tnG2: '이중 자막 및 분할', tnG3: '타임라인 및 정리', tnG4: '추출 및 일괄', tnAll: '모든 도구' },
    'de': { tnVd: 'Video herunterladen', tnMore: 'Weitere Tools', tnG1: 'Umwandlung & Format', tnG2: 'Zweisprachig & Aufteilen', tnG3: 'Zeitachse & Bereinigung', tnG4: 'Extraktion & Stapel', tnAll: 'Alle Tools' },
    'fr': { tnVd: 'Télécharger la vidéo', tnMore: 'Plus d\'outils', tnG1: 'Conversion et format', tnG2: 'Bilingue et découpage', tnG3: 'Synchronisation et nettoyage', tnG4: 'Extraction et lot', tnAll: 'Tous les outils' },
    'id': { tnVd: 'Unduh Video', tnMore: 'Alat Lainnya', tnG1: 'Konversi & Format', tnG2: 'Dwibahasa & Pisah', tnG3: 'Waktu & Pembersihan', tnG4: 'Ekstrak & Batch', tnAll: 'Semua alat' },
    'hi': { tnVd: 'वीडियो डाउनलोड', tnMore: 'और टूल', tnG1: 'रूपांतरण और प्रारूप', tnG2: 'द्विभाषी और विभाजन', tnG3: 'टाइमिंग और सफ़ाई', tnG4: 'निष्कर्षण और बैच', tnAll: 'सभी टूल' },
    'th': { tnVd: 'ดาวน์โหลดวิดีโอ', tnMore: 'เครื่องมืออื่น ๆ', tnG1: 'แปลงและรูปแบบ', tnG2: 'สองภาษาและการแบ่ง', tnG3: 'ไทม์ไลน์และการทำความสะอาด', tnG4: 'ดึงข้อมูลและชุดงาน', tnAll: 'เครื่องมือทั้งหมด' },
    'vi': { tnVd: 'Tải video', tnMore: 'Công cụ khác', tnG1: 'Chuyển đổi và định dạng', tnG2: 'Song ngữ và tách gộp', tnG3: 'Thời gian và dọn dẹp', tnG4: 'Trích xuất và hàng loạt', tnAll: 'Tất cả công cụ' },
    'ru': { tnVd: 'Скачать видео', tnMore: 'Ещё инструменты', tnG1: 'Конвертация и форматы', tnG2: 'Двуязычные и разделение', tnG3: 'Тайминг и очистка', tnG4: 'Извлечение и пакет', tnAll: 'Все инструменты' },
    'it': { tnVd: 'Scarica video', tnMore: 'Altri strumenti', tnG1: 'Conversione e formato', tnG2: 'Bilingue e divisione', tnG3: 'Timing e pulizia', tnG4: 'Estrazione e batch', tnAll: 'Tutti gli strumenti' },
    'ar': { tnVd: 'تنزيل الفيديو', tnMore: 'المزيد من الأدوات', tnG1: 'التحويل والصيغ', tnG2: 'ثنائي اللغة والتجزئة', tnG3: 'التوقيت والتنظيف', tnG4: 'الاستخراج والدُفعات', tnAll: 'جميع الأدوات' },
    'tr': { tnVd: 'Video İndir', tnMore: 'Diğer Araçlar', tnG1: 'Dönüştürme ve Biçim', tnG2: 'İki Dilli ve Bölme', tnG3: 'Zamanlama ve Temizlik', tnG4: 'Çıkarma ve Toplu', tnAll: 'Tüm Araçlar' },
    'nl': { tnVd: 'Video downloaden', tnMore: 'Meer tools', tnG1: 'Conversie & formaat', tnG2: 'Tweetalig & splitsen', tnG3: 'Timing & opschonen', tnG4: 'Extractie & batch', tnAll: 'Alle tools' },
    'pl': { tnVd: 'Pobierz wideo', tnMore: 'Więcej narzędzi', tnG1: 'Konwersja i formaty', tnG2: 'Dwujęzyczne i dzielenie', tnG3: 'Czas i czyszczenie', tnG4: 'Ekstrakcja i wsad', tnAll: 'Wszystkie narzędzia' },
    'sv': { tnVd: 'Hämta video', tnMore: 'Fler verktyg', tnG1: 'Konvertering & format', tnG2: 'Tvåspråkigt & dela', tnG3: 'Tidsaxel & städning', tnG4: 'Extraktion & batch', tnAll: 'Alla verktyg' },
    'cs': { tnVd: 'Stáhnout video', tnMore: 'Další nástroje', tnG1: 'Převod a formáty', tnG2: 'Dvojjazyčné a dělení', tnG3: 'Časování a čištění', tnG4: 'Extrakce a dávka', tnAll: 'Všechny nástroje' },
    'uk': { tnVd: 'Завантажити відео', tnMore: 'Інші інструменти', tnG1: 'Конвертація та формати', tnG2: 'Двомовні та розділення', tnG3: 'Таймінг і очищення', tnG4: 'Витяг і пакет', tnAll: 'Всі інструменти' },
    'da': { tnVd: 'Download video', tnMore: 'Flere værktøjer', tnG1: 'Konvertering & formater', tnG2: 'Tosproget & deling', tnG3: 'Tidslinje & oprydning', tnG4: 'Udtræk & batch', tnAll: 'Alle værktøjer' },
    'fi': { tnVd: 'Lataa video', tnMore: 'Lisää työkaluja', tnG1: 'Muunnos ja muodot', tnG2: 'Kaksikielinen ja jako', tnG3: 'Aikajana ja siivous', tnG4: 'Poimi ja eräajo', tnAll: 'Kaikki työkalut' },
    'el': { tnVd: 'Λήψη βίντεο', tnMore: 'Περισσότερα εργαλεία', tnG1: 'Μετατροπή και μορφές', tnG2: 'Δίγλωσσο και διαχωρισμός', tnG3: 'Χρονισμός και καθαρισμός', tnG4: 'Εξαγωγή και δέσμη', tnAll: 'Όλα τα εργαλεία' },
    'he': { tnVd: 'הורדת וידאו', tnMore: 'כלים נוספים', tnG1: 'המרה ופורמטים', tnG2: 'דו-לשוני ופיצול', tnG3: 'תזמון וניקוי', tnG4: 'חילוץ ואצווה', tnAll: 'כל הכלים' },
    'ro': { tnVd: 'Descarcă video', tnMore: 'Mai multe instrumente', tnG1: 'Conversie și formate', tnG2: 'Bilingv și separare', tnG3: 'Timp și curățare', tnG4: 'Extragere și lot', tnAll: 'Toate instrumentele' }
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
    /* v0.9.352：第十五个工具 —— YouTube 字幕优化（油管红 #C4302B，与乱码修复页的砖红 #B42318 区分） */
    yt: { href: '/ytfix.html',     name: 'navYt',   desc: 'tcYtD', c: '#C4302B', bg: '#FDECEA', ic: 'yt' },
    /* v0.9.364：第十六、十七个工具 —— 音频转字幕 / 画面硬字幕识别。
       两页 356 上线时只挂了首页一条入链，顶栏与 Mega 面板都没有入口，等于藏起来了。 */
    au: { href: '/autosub.html',   name: 'navAu',   desc: 'tcAuD', c: '#1E40AF', bg: '#E8EDFB', ic: 'au' },
    oc: { href: '/ocrsub.html',    name: 'navOc',   desc: 'tcOcD', c: '#7C2D12', bg: '#FBEEE8', ic: 'oc' },
    /* v0.9.373：第二十一个工具 —— 一次出多语（靛蓝 #3730A3，与该页自身主色同族，与翻译页的粉刻意分开） */
    ml: { href: '/multilang.html', name: 'navMl',   desc: 'tcMlD', c: '#3730A3', bg: '#EEF0FE', ic: 'ml' },
    /* v0.9.323：使用指南 —— 内容页索引（/guides/），顶栏直出，不进 Mega 分组 */
    gd: { href: '/guides/',        name: 'navGuide' },
    /* v0.9.410：第二十二个工具 —— KTV 字幕制作（霓虹洋红 #DB2777，全站无人使用；
       简繁转换是靛紫 #5B21B6、歌词打轴是酒红 #9D174D，三色拉开距离）。
       注意：302~370 这段历史教训是「只挂首页一条链接 = 把工具藏起来」，
       所以 TOOLS / GROUPS / ICONS 三处必须一次加齐。 */
    ktv: { href: '/ktv.html',       name: 'navKtv',  desc: 'tcKtvD', c: '#DB2777', bg: '#FDECF4', ic: 'ktv' },
  };
  /* 下拉分组：转换与格式 / 双语与拆合 / 时间轴与清理 / 提取与批量（15 个工具） */
  var GROUPS = [
    { k: 'tnG1', ids: ['cv', 'tb', 'hc'] },
    { k: 'tnG2', ids: ['bi', 'sp'] },
    { k: 'tnG3', ids: ['sh', 'cl', 'lr', 'ktv', 'qc', 'yt'] },
    { k: 'tnG4', ids: ['ex', 'vs', 'au', 'oc', 'ml', 'rp', 'gl', 'bt'] }
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
  var UI100 = ["en","zh-CN","zh-TW","ja","ko","fr","de","es","pt","it","ru","ar","th","vi","id","hi","tr","pl","nl","ms","fil","fa","sv","da","fi","nb","cs","sk","hu","ro","ca","hr","el","uk","sr","bg","he","ur","bn","ta","te","mr","ne","si","my","km","lo","sw","gu","kn","ml","pa","or","as","kk","uz","mn","az","is","et","lv","lt","sl","sq","mk","eu","gl","am","ha","yo","zu","so","ps","ku","af","yue","be","tg","ky","tk","bs","mt","cy","ga","hy","ka","ti","bo","ug","sd","yi","jv","su","ceb","mg","ig","xh","sn","ny","mi"];

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
    d.write('<script src="/i18n/tnav-' + l0 + '.js?v=0.9.356"><\/script>');
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
    var m = String(w.location && w.location.pathname || '').match(/^\/([a-zA-Z]{2,3}(?:-[A-Za-z]{2,4})?)(?:[\/#?]|$)/);
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

  /* ---------- 图标（24 视图；stroke 走 currentColor，由外层 --tc 控制） ---------- */
  var ICONS = {'cv':'<path d=\'M4 8h13\'/><path d=\'m14 5 3 3-3 3\'/><path d=\'M20 16H7\'/><path d=\'m10 13-3 3 3 3\'/>','tb':'<rect x=\'3\' y=\'4\' width=\'18\' height=\'16\' rx=\'2\'/><path d=\'M3 10h18\'/><path d=\'M3 15h18\'/><path d=\'M9 10v10\'/>','hc':'<path d=\'m5 8 6 6\'/><path d=\'M4 14l6-6 2-3\'/><path d=\'M2 5h12\'/><path d=\'M7 2h1\'/><path d=\'m22 22-5-10-5 10\'/><path d=\'M14 18h6\'/>','bi':'<rect x=\'3\' y=\'4\' width=\'18\' height=\'16\' rx=\'2\'/><path d=\'M12 4v16\'/><path d=\'M9.5 12H7\'/><path d=\'m9 10-2 2 2 2\'/><path d=\'M14.5 12H17\'/><path d=\'m15 10 2 2-2 2\'/>','sp':'<circle cx=\'6\' cy=\'6\' r=\'2.6\'/><circle cx=\'6\' cy=\'18\' r=\'2.6\'/><path d=\'M8.2 7.5 19 19\'/><path d=\'M8.2 16.5 19 5\'/>','sh':'<path d=\'M3 12h18\'/><path d=\'M6 8v8\'/><path d=\'M18 8v8\'/><circle cx=\'12\' cy=\'12\' r=\'2.2\'/>','cl':'<path d=\'M12 3l1.8 4.7L18.5 9.5 13.8 11.3 12 16l-1.8-4.7L5.5 9.5l4.7-1.8z\'/><path d=\'M19 15l.9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9z\'/>','lr':'<path d=\'M9 18V5l12-2v13\'/><circle cx=\'6\' cy=\'18\' r=\'3\'/><circle cx=\'18\' cy=\'16\' r=\'3\'/>','ex':'<path d=\'M4 4h16\'/><path d=\'M4 9h9\'/><path d=\'M4 14h6\'/><path d=\'M14 13v6\'/><path d=\'m11 16 3 3 3-3\'/>','vs':'<rect x=\'3\' y=\'4\' width=\'18\' height=\'12\' rx=\'2\'/><path d=\'M10 8.4 15.4 10 10 11.6z\' fill=\'currentColor\' stroke=\'none\'/><path d=\'M8 20h8\'/><path d=\'M12 16v4\'/>','rp':'<path d=\'M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z\'/>','gl':'<path d=\'M12 7v14\'/><path d=\'M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z\'/>','qc':'<circle cx=\'11\' cy=\'11\' r=\'7\'/><path d=\'m20 20-3.6-3.6\'/><path d=\'m8.4 11.2 2 2 3.6-3.6\'/>','yt':'<rect x=\'2.5\' y=\'4.5\' width=\'19\' height=\'15\' rx=\'3\'/><path d=\'m10.4 8.8 4.6 3.2-4.6 3.2z\' fill=\'currentColor\' stroke=\'none\'/><path d=\'M6 16.6h4.6\'/><path d=\'M13.4 16.6H18\'/>','bt':'<path d=\'m12 2 9 4.5-9 4.5-9-4.5z\'/><path d=\'m3 11.5 9 4.5 9-4.5\'/><path d=\'m3 16.5 9 4.5 9-4.5\'/>','au':'<path d=\'M4 10v4\'/><path d=\'M8 7v10\'/><path d=\'M12 4v16\'/><path d=\'M16 7v10\'/><path d=\'M20 10v4\'/>','ml':'<circle cx=\'12\' cy=\'12\' r=\'9\'/><path d=\'M3 12h18\'/><path d=\'M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18\'/>','oc':'<path d=\'M4 8V5h3\'/><path d=\'M20 8V5h-3\'/><path d=\'M4 16v3h3\'/><path d=\'M20 16v3h-3\'/><path d=\'M8 12h8\'/>','dl':'<path d=\'M12 4v11\'/><path d=\'m7 10 5 5 5-5\'/><path d=\'M4 20h16\'/>','ext':'<path d=\'M7 17 17 7\'/><path d=\'M9 7h8v8\'/>','arr':'<path d=\'M5 12h14\'/><path d=\'m13 6 6 6-6 6\'/>','caret':'<path d=\'m6 9 6 6 6-6\'/>','ktv':'<path d=\'M12 2a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z\'/><path d=\'M19 11v1a7 7 0 0 1-14 0v-1\'/><path d=\'M12 19v3\'/><path d=\'M8 22h8\'/>'};

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
    /* 品牌块不参与压缩：整行挤满时浏览器先压 flex 子项，logo 从 180 收到 163，
       品牌名就断成「AI- / SRTSub」两行（卡纳达语在 1080 版心上实测 42px 高）。
       各页品牌类名不统一（.logo / .brand / .logo-sm / .gbrand），四种都钉住。 */
    '.lnav>.logo,.lnav>.brand,.lnav>.logo-sm,.hd>.logo,.hd>.brand,.hd>.logo-sm,.hd>.gbrand,',
    '.ghead>.gbrand{flex:0 0 auto;white-space:nowrap}',
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
    /* v0.9.366：窄屏一级导航。以前只靠 flex-wrap 硬折行 —— 390px 下折成 4 行、吃掉
       167px 高，英文站更把 .lnav 撑到 417px、横向溢出 27px，语言选择器被切掉一半
       （v0.9.365 实测）。改成不折行 + 横向滚动：
         · 高度从 4 行压回 1 行，正文不再被顶下去；
         · #topNav 自身 overflow-x:auto → 作为 flex 子项的自动最小尺寸归零，
           父级 .lnav 就不再被它撑出视口，语言选择器也不再被切。
       ⚠️ 横向滚动条本身要藏掉：露出一条灰条比折行还难看。 */
    /* ⚠️ 必须用 flex:1 1 0（不是 max-width:100%）：父级 .lnav 的宽度是 auto，
       百分比最大宽度解析不出来，自己的 min-content 又会一路把 .lnav 顶宽，
       实测撑到 536px / 溢出 276px。flex-basis 归零才能真正让它可压。 */
    /* 导航占满 .lnav 一整行：语言选择器另起一行，别把导航挤成 100px 的窄条 */
    '@media (max-width:640px){.lnav{flex-wrap:wrap}}',
    '@media (max-width:640px){#topNav{flex:1 1 100%;flex-wrap:nowrap;min-width:0;max-width:none;',
    'overflow-x:auto;overflow-y:hidden;scrollbar-width:none;-ms-overflow-style:none}',
    '@media (max-width:640px){.lnav{min-width:0}}',
    '#topNav::-webkit-scrollbar{display:none}',
    '#topNav .tnav-lnk,#topNav .tnav-btn,#topNav .tnav-promo,#topNav .tnav-more{flex:none}}',
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
    el.src = '/i18n/tnav-' + lang + '.js?v=0.9.356';    /* ⚠️ 整站升版时同步改（缓存键） */
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
