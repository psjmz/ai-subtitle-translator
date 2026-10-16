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
        data-tool 填本页 id（tr/fx/cv/tb/hc/bi/sp/sh/cl/lr/ex/vs/rp/gl/bt/qc；首页留空），
        当前页在主项与下拉里都会高亮。

   词典来源：
     · 16 个工具名 navXx × 27 语 —— 收割自 split-i18n.js（全站同名同译，真翻 27 语）；
     · 13 个一句话描述 tcXxD × 27 语 —— 收割自 site-i18n.js（与首页工具卡片同文案）；
     · 7 个手写键（tnVd/tnMore/tnG1..tnG4/tnAll）× 27 语。
   本文件自包含、零依赖，不引 site-i18n.js / site-nav.js；
   改词典/配色/图标 → 改 _mk_topnav.js → 重跑生成 → 三副本同步。
   ============================================================================= */
(function (w, d) {
  'use strict';

  /* ---------- 工具名 × 27 语（收割自 split-i18n.js） ---------- */
  var N = {
  /* 15 工具名：navTr/navFx 是顶栏主项，其余进 Mega 下拉 */
    'zh-CN': { navTr: '字幕翻译', navFx: '特效字幕', navCv: '格式转换', navTbl: '表格互转', navHc: '简繁转换', navSp: '双语剥离', navSplt: '拆分拼接', navSh: '时间轴调整', navCl: '字幕清洗', navLrc: '歌词打轴', navEx: '提取文本', navVs: '视频字幕', navRp: '乱码修复', navGl: '术语替换', navBt: '批量转换', navQc: '字幕质检' },
    'zh-TW': { navTr: '字幕翻譯', navFx: '特效字幕', navCv: '格式轉換', navTbl: '表格互轉', navHc: '簡繁轉換', navSp: '雙語剝離', navSplt: '拆分拼接', navSh: '時間軸調整', navCl: '字幕清洗', navLrc: '歌詞打軸', navEx: '擷取文本', navVs: '影片字幕', navRp: '亂碼修復', navGl: '術語替換', navBt: '批次轉換', navQc: '字幕質檢' },
    'en': { navTr: 'Translate', navFx: 'Styled subs', navCv: 'Convert', navTbl: 'Table', navHc: 'Chinese', navSp: 'Split bilingual', navSplt: 'Split', navSh: 'Timing', navCl: 'Clean up', navLrc: 'Lyrics', navEx: 'Text Extractor', navVs: 'Video', navRp: 'Encoding Fix', navGl: 'Glossary', navBt: 'Batch', navQc: 'QC' },
    'ja': { navTr: '字幕翻訳', navFx: '装飾字幕', navCv: '形式変換', navTbl: '表変換', navHc: '繁簡変換', navSp: '二か国語分離', navSplt: '分割・結合', navSh: 'タイミング調整', navCl: '字幕クリーニング', navLrc: '歌詞合わせ', navEx: 'テキスト抽出', navVs: '動画字幕', navRp: '文字化け修復', navGl: '用語置換', navBt: '一括変換', navQc: '字幕QC' },
    'es': { navTr: 'Traducir', navFx: 'Subtítulos con estilo', navCv: 'Convertir', navTbl: 'Tabla', navHc: 'Chino', navSp: 'Separar bilingüe', navSplt: 'Dividir', navSh: 'Sincronía', navCl: 'Limpiar', navLrc: 'Letra', navEx: 'Extraer texto', navVs: 'Vídeo', navRp: 'Arreglar codificación', navGl: 'Glosario', navBt: 'Lote', navQc: 'Control' },
    'pt': { navTr: 'Traduzir', navFx: 'Legendas estilizadas', navCv: 'Converter', navTbl: 'Tabela', navHc: 'Chinês', navSp: 'Separar bilíngue', navSplt: 'Dividir', navSh: 'Sincronia', navCl: 'Limpar', navLrc: 'Letra', navEx: 'Extrair texto', navVs: 'Vídeo', navRp: 'Corrigir codificação', navGl: 'Glossário', navBt: 'Lote', navQc: 'Controlo' },
    'ko': { navTr: '자막 번역', navFx: '효과 자막', navCv: '형식 변환', navTbl: '표 변환', navHc: '한자 변환', navSp: '이중 언어 분리', navSplt: '분할·결합', navSh: '타임라인 조정', navCl: '자막 정리', navLrc: '가사 타이밍', navEx: '텍스트 추출', navVs: '동영상', navRp: '인코딩 복구', navGl: '용어 치환', navBt: '일괄 변환', navQc: '자막 검수' },
    'de': { navTr: 'Übersetzen', navFx: 'Stilisierte Untertitel', navCv: 'Konvertieren', navTbl: 'Tabelle', navHc: 'Chinesisch', navSp: 'Zweisprachig trennen', navSplt: 'Teilen', navSh: 'Timing', navCl: 'Aufräumen', navLrc: 'Lyrics', navEx: 'Text extrahieren', navVs: 'Video', navRp: 'Kodierung reparieren', navGl: 'Glossar', navBt: 'Stapel', navQc: 'Prüfung' },
    'fr': { navTr: 'Traduire', navFx: 'Sous-titres stylés', navCv: 'Convertir', navTbl: 'Tableau', navHc: 'Chinois', navSp: 'Séparer le bilingue', navSplt: 'Scinder', navSh: 'Synchronisation', navCl: 'Nettoyer', navLrc: 'Paroles', navEx: 'Extraction de texte', navVs: 'Vidéo', navRp: 'Réparer l’encodage', navGl: 'Glossaire', navBt: 'Lot', navQc: 'Contrôle' },
    'id': { navTr: 'Terjemahan', navFx: 'Subtitle beraksen', navCv: 'Konversi', navTbl: 'Tabel', navHc: 'Hanzi', navSp: 'Pisahkan dwibahasa', navSplt: 'Pecah', navSh: 'Sinkronisasi', navCl: 'Bersihkan', navLrc: 'Lirik', navEx: 'Ekstrak teks', navVs: 'Video', navRp: 'Perbaiki Encoding', navGl: 'Glosarium', navBt: 'Massal', navQc: 'Pemeriksaan' },
    'hi': { navTr: 'अनुवाद', navFx: 'सजावटी सबटाइटल', navCv: 'बदलें', navTbl: 'तालिका', navHc: 'चीनी लिपि', navSp: 'द्विभाषी अलग करें', navSplt: 'विभाजन', navSh: 'समय मिलान', navCl: 'सफाई', navLrc: 'बोल', navEx: 'टेक्स्ट एक्स्ट्रैक्टर', navVs: 'वीडियो', navRp: 'एन्कोडिंग सुधार', navGl: 'शब्दावली', navBt: 'बैच', navQc: 'जाँच' },
    'th': { navTr: 'แปล', navFx: 'ซับไตเติลใส่เอฟเฟกต์', navCv: 'แปลงรูปแบบ', navTbl: 'ตาราง', navHc: 'อักษรจีน', navSp: 'แยกสองภาษา', navSplt: 'แยก·รวม', navSh: 'ปรับเวลา', navCl: 'ทำความสะอาด', navLrc: 'เนื้อเพลง', navEx: 'สกัดข้อความ', navVs: 'วิดีโอ', navRp: 'แก้รหัสอักขระ', navGl: 'แทนที่คำศัพท์', navBt: 'แบบชุด', navQc: 'ตรวจสอบ' },
    'vi': { navTr: 'Dịch', navFx: 'Phụ đề cách điệu', navCv: 'Chuyển đổi', navTbl: 'Bảng', navHc: 'Chữ Hán', navSp: 'Tách song ngữ', navSplt: 'Tách·nối', navSh: 'Căn thời gian', navCl: 'Làm sạch', navLrc: 'Lời', navEx: 'Trích văn bản', navVs: 'Video', navRp: 'Sửa lỗi mã hóa', navGl: 'Thay thuật ngữ', navBt: 'Hàng loạt', navQc: 'Kiểm tra' },
    'ru': { navTr: 'Перевод', navFx: 'Оформленные субтитры', navCv: 'Конвертация', navTbl: 'Таблица', navHc: 'Китайский', navSp: 'Разделить двуязычные', navSplt: 'Разделить', navSh: 'Синхронизация', navCl: 'Очистка', navLrc: 'Текст', navEx: 'Извлечение текста', navVs: 'Видео', navRp: 'Исправление кодировки', navGl: 'Глоссарий', navBt: 'Пакет', navQc: 'Проверка' },
    'it': { navTr: 'Traduci', navFx: 'Sottotitoli con stile', navCv: 'Converti', navTbl: 'Tabella', navHc: 'Cinese', navSp: 'Separa bilingue', navSplt: 'Dividi', navSh: 'Sincronizzazione', navCl: 'Pulisci', navLrc: 'Testi', navEx: 'Estrazione testo', navVs: 'Video', navRp: 'Correggi codifica', navGl: 'Glossario', navBt: 'Blocco', navQc: 'Controllo' },
    'ar': { navTr: 'ترجمة', navFx: 'ترجمات منسقة', navCv: 'تحويل', navTbl: 'جدول', navHc: 'الصينية', navSp: 'فصل ثنائي اللغة', navSplt: 'تقسيم', navSh: 'ضبط التوقيت', navCl: 'تنظيف', navLrc: 'كلمات', navEx: 'استخراج النص', navVs: 'فيديو', navRp: 'إصلاح الترميز', navGl: 'المصطلحات', navBt: 'دفعة', navQc: 'فحص' },
    'tr': { navTr: 'Çeviri', navFx: 'Stil altyazı', navCv: 'Dönüştür', navTbl: 'Tablo', navHc: 'Çince', navSp: 'İki dili ayır', navSplt: 'Böl', navSh: 'Zamanlama', navCl: 'Temizle', navLrc: 'Sözler', navEx: 'Metin Çıkarıcı', navVs: 'Video', navRp: 'Kodlama Onarma', navGl: 'Terimler', navBt: 'Toplu', navQc: 'Denetim' },
    'nl': { navTr: 'Vertalen', navFx: 'Ondertitels met stijl', navCv: 'Converteren', navTbl: 'Tabel', navHc: 'Chinees', navSp: 'Tweetalig splitsen', navSplt: 'Splitsen', navSh: 'Timing', navCl: 'Opschonen', navLrc: 'Lyrics', navEx: 'Tekst extraheren', navVs: 'Video', navRp: 'Codering herstellen', navGl: 'Woordenlijst', navBt: 'Batch', navQc: 'Controle' },
    'pl': { navTr: 'Tłumaczenie', navFx: 'Napisy z efektami', navCv: 'Konwersja', navTbl: 'Tabela', navHc: 'Chiński', navSp: 'Podział dwujęzyczny', navSplt: 'Podziel', navSh: 'Synchronizacja', navCl: 'Czyszczenie', navLrc: 'Tekst', navEx: 'Ekstrakcja tekstu', navVs: 'Wideo', navRp: 'Naprawa kodowania', navGl: 'Słownik', navBt: 'Partia', navQc: 'Kontrola' },
    'sv': { navTr: 'Översätt', navFx: 'Stilade undertexter', navCv: 'Konvertera', navTbl: 'Tabell', navHc: 'Kinesiska', navSp: 'Dela tvåspråkig', navSplt: 'Dela', navSh: 'Synkronisering', navCl: 'Städa', navLrc: 'Text', navEx: 'Textutdrag', navVs: 'Video', navRp: 'Fixa teckenkodning', navGl: 'Ordlista', navBt: 'Batch', navQc: 'Kontroll' },
    'cs': { navTr: 'Překlad', navFx: 'Stylované titulky', navCv: 'Převést', navTbl: 'Tabulka', navHc: 'Čínština', navSp: 'Rozdělit dvojjazyčné', navSplt: 'Rozdělit', navSh: 'Synchronizace', navCl: 'Vyčistit', navLrc: 'Text', navEx: 'Extrakce textu', navVs: 'Video', navRp: 'Oprava kódování', navGl: 'Glosář', navBt: 'Dávka', navQc: 'Kontrola' },
    'uk': { navTr: 'Переклад', navFx: 'Оформлені субтитри', navCv: 'Конвертація', navTbl: 'Таблиця', navHc: 'Китайська', navSp: 'Розділити двомовні', navSplt: 'Розділити', navSh: 'Синхронізація', navCl: 'Очищення', navLrc: 'Текст', navEx: 'Витяг тексту', navVs: 'Відео', navRp: 'Виправлення кодування', navGl: 'Глосарій', navBt: 'Пакет', navQc: 'Перевірка' },
    'da': { navTr: 'Oversæt', navFx: 'Stilede undertekster', navCv: 'Konverter', navTbl: 'Tabel', navHc: 'Kinesisk', navSp: 'Del tosproget', navSplt: 'Opdel', navSh: 'Synkronisering', navCl: 'Ryd op', navLrc: 'Tekst', navEx: 'Tekstudtræk', navVs: 'Video', navRp: 'Ret tegnkodning', navGl: 'Ordliste', navBt: 'Batch', navQc: 'Kontrol' },
    'fi': { navTr: 'Käännä', navFx: 'Tyylitellyt tekstit', navCv: 'Muunna', navTbl: 'Taulukko', navHc: 'Kiina', navSp: 'Erottele kaksikielinen', navSplt: 'Jaa', navSh: 'Ajoitus', navCl: 'Siivoa', navLrc: 'Sanoitus', navEx: 'Tekstin poiminta', navVs: 'Video', navRp: 'Merkistökoodin korjaus', navGl: 'Sanasto', navBt: 'Erä', navQc: 'Tarkistus' },
    'el': { navTr: 'Μετάφραση', navFx: 'Υπότιτλοι με στυλ', navCv: 'Μετατροπή', navTbl: 'Πίνακας', navHc: 'Κινεζικά', navSp: 'Διαχωρισμός δίγλωσσων', navSplt: 'Διάσπαση', navSh: 'Συγχρονισμός', navCl: 'Καθαρισμός', navLrc: 'Στίχοι', navEx: 'Εξαγωγή κειμένου', navVs: 'Βίντεο', navRp: 'Διόρθωση κωδικοποίησης', navGl: 'Γλωσσάρι', navBt: 'Μαζικά', navQc: 'Έλεγχος' },
    'he': { navTr: 'תרגום', navFx: 'כתוביות מעוצבות', navCv: 'המרה', navTbl: 'טבלה', navHc: 'סינית', navSp: 'הפרדה דו-לשונית', navSplt: 'פיצול', navSh: 'תזמון', navCl: 'ניקוי', navLrc: 'מילים', navEx: 'חילוץ טקסט', navVs: 'וידאו', navRp: 'תיקון קידוד', navGl: 'מונחים', navBt: 'אצווה', navQc: 'בדיקה' },
    'ro': { navTr: 'Traducere', navFx: 'Subtitrări cu stil', navCv: 'Conversie', navTbl: 'Tabel', navHc: 'Chineză', navSp: 'Separă bilingv', navSplt: 'Împarte', navSh: 'Sincronizare', navCl: 'Curățare', navLrc: 'Versuri', navEx: 'Extragere text', navVs: 'Video', navRp: 'Reparare codare', navGl: 'Glosar', navBt: 'Lot', navQc: 'Verificare' }
  };

  /* ---------- 工具一句话描述 × 27 语（收割自 site-i18n.js 首页卡片） ---------- */
  var D = {
  /* 13 描述：与首页工具卡片 tcXxD 同文案，Mega 下拉复用 */
    'zh-CN': { tcCvD: 'SRT / VTT / ASS 等 7 种格式互转', tcTbD: 'Excel 里逐行校对，改完导回', tcHcD: '简繁互转，可选台湾 / 香港用法', tcBiD: '把双语字幕拆成原文轨和译文轨', tcSpD: '按时长条数切开，多份合一', tcShD: '整体偏移、缩放、合并拆分、逐条微调', tcClD: '去广告水印、听障提示，13 条规则可开关', tcLrD: '听歌逐句点时间，导出 LRC', tcExD: '从字幕里提取纯台词，两种排版', tcVsD: '把 MKV / MP4 里的内封字幕轨抽成 SRT', tcRpD: '认出认错的编码，把乱码倒回原样', tcGlD: '按术语表批量改词，逐条可还原', tcBtD: '几百个文件一次转，打包 ZIP', tcQcD: '按这门语言的规矩查时间轴与排版' },
    'zh-TW': { tcCvD: 'SRT / VTT / ASS 等 7 種格式互轉', tcTbD: 'Excel 裡逐行校對，改完匯回', tcHcD: '簡繁互轉，可選台灣 / 香港用法', tcBiD: '把雙語字幕拆成原文軌和譯文軌', tcSpD: '按時長條數切開，多份合一', tcShD: '整體偏移、縮放、合併拆分、逐條微調', tcClD: '去廣告浮水印、聽障提示，13 條規則可開關', tcLrD: '聽歌逐句點時間，匯出 LRC', tcExD: '從字幕裡擷取純台詞，兩種排版', tcVsD: '把 MKV / MP4 裡的內封字幕軌抽成 SRT', tcRpD: '認出認錯的編碼，把亂碼倒回原樣', tcGlD: '按術語表批次改詞，逐條可還原', tcBtD: '幾百個檔案一次轉，打包 ZIP', tcQcD: '依這門語言的規矩檢查時間軸與排版' },
    'en': { tcCvD: 'Convert between 7 formats: SRT / VTT / ASS and more', tcTbD: 'Review line by line in Excel, import back', tcHcD: 'Simplified ⇄ Traditional, Taiwan / Hong Kong aware', tcBiD: 'Split bilingual subtitles into source and translation tracks', tcSpD: 'Cut by duration or count, join many into one', tcShD: 'Global offset, rescale, merge, split, cue-by-cue tweak', tcClD: 'Strip ads, watermarks and SDH cues — 13 switchable rules', tcLrD: 'Tap each line while listening, export LRC', tcExD: 'Pull plain dialogue out of subtitles, two layouts', tcVsD: 'Pull the embedded subtitle track out of MKV / MP4', tcRpD: 'Detect the misread encoding and undo the garble', tcGlD: 'One glossary rewrites the whole file', tcBtD: 'Convert hundreds of files into one ZIP', tcQcD: 'Check timing and layout by that language\'s rules' },
    'ja': { tcCvD: 'SRT / VTT / ASS など 7 形式を相互変換', tcTbD: 'Excel で行ごとに確認し、書き戻す', tcHcD: '簡体字 ⇄ 繁体字、台湾 / 香港対応', tcBiD: '二か国語字幕を原文と訳文の2トラックに分離', tcSpD: '長さや条数で分割、複数を 1 本に', tcShD: '一括シフト・縮尺・結合分割・個別調整', tcClD: '広告・透かし・聴覚障害者向け字幕を除去、13 ルールを個別に切替', tcLrD: '聴きながら行ごとに、LRC を書き出し', tcExD: '字幕からセリフだけを取り出す、2種類のレイアウト', tcVsD: 'MKV / MP4 の内蔵字幕トラックを SRT に', tcRpD: '誤認識したエンコードを見抜き、文字化けを元に戻す', tcGlD: '用語集ひとつで丸ごと置き換え', tcBtD: '何百ファイルも一括で ZIP に', tcQcD: 'その言語の規則でタイミングと組み版を検査' },
    'es': { tcCvD: 'Convierte entre 7 formatos: SRT / VTT / ASS y más', tcTbD: 'Revisa línea a línea en Excel y vuelve', tcHcD: 'Simplificado ⇄ tradicional, con Taiwán / Hong Kong', tcBiD: 'Divide subtítulos bilingües en pista original y traducida', tcSpD: 'Corta por duración o líneas, une muchos', tcShD: 'Desplazamiento global, escala, fusionar, dividir, ajuste fino', tcClD: 'Strip ads, watermarks and SDH cues — 13 switchable rules', tcLrD: 'Marca cada línea escuchando, exporta LRC', tcExD: 'Saca los diálogos puros de los subtítulos, dos diseños', tcVsD: 'Saca la pista de subtítulos incrustada de MKV / MP4', tcRpD: 'Detecta la codificación mal leída y revierte el daño', tcGlD: 'Un glosario cambia todo el archivo', tcBtD: 'Cientos de archivos en un solo ZIP', tcQcD: 'Comprueba tiempo y maquetación con las reglas del idioma' },
    'pt': { tcCvD: 'Converte entre 7 formatos: SRT / VTT / ASS e mais', tcTbD: 'Revise linha a linha no Excel e volte', tcHcD: 'Simplificado ⇄ tradicional, com Taiwan / Hong Kong', tcBiD: 'Divide legendas bilíngues em faixa original e traduzida', tcSpD: 'Corte por duração ou linhas, una muitos', tcShD: 'Deslocamento global, escala, mesclar, dividir, retoque fino', tcClD: 'Strip ads, watermarks and SDH cues — 13 switchable rules', tcLrD: 'Marque cada linha ouvindo, exporte LRC', tcExD: 'Tira as falas puras das legendas, dois layouts', tcVsD: 'Tire a faixa de legendas embutida de MKV / MP4', tcRpD: 'Detecta a codificação lida errado e desfaz o estrago', tcGlD: 'Um glossário muda o arquivo todo', tcBtD: 'Centenas de arquivos em um ZIP', tcQcD: 'Verifica tempo e formatação com as regras do idioma' },
    'ko': { tcCvD: 'SRT / VTT / ASS 등 7가지 형식 상호 변환', tcTbD: 'Excel에서 줄별 검수 후 되돌리기', tcHcD: '간체 ⇄ 번체, 대만 / 홍콩 지원', tcBiD: '이중언어 자막을 원어 트랙과 번역 트랙으로 분리', tcSpD: '길이·줄 수로 자르고 여러 개 합치기', tcShD: '전체 이동, 배율, 병합·분할, 항목별 미세 조정', tcClD: 'Strip ads, watermarks and SDH cues — 13 switchable rules', tcLrD: '듣으며 줄마다 찍고 LRC 내보내기', tcExD: '자막에서 대사만 뽑아내는 두 가지 배치', tcVsD: 'MKV / MP4 의 내장 자막 트랙을 SRT 로', tcRpD: '잘못 읽은 인코딩을 찾아내 깨진 글자를 되돌립니다', tcGlD: '용어집 하나로 파일 전체 교체', tcBtD: '수백 개 파일을 ZIP 하나로', tcQcD: '그 언어 규칙으로 타임라인과 줄바꿈 검사' },
    'de': { tcCvD: 'Konvertiert zwischen 7 Formaten: SRT / VTT / ASS und mehr', tcTbD: 'Zeile für Zeile in Excel prüfen, zurückholen', tcHcD: 'Vereinfacht ⇄ Traditionell, mit Taiwan / Hongkong', tcBiD: 'Trennt zweisprachige Untertitel in Original- und Übersetzungsspur', tcSpD: 'Nach Dauer oder Zeilen schneiden, vieles vereinen', tcShD: 'Globaler Versatz, Skalierung, zusammenführen, teilen, Feinjustage', tcClD: 'Strip ads, watermarks and SDH cues — 13 switchable rules', tcLrD: 'Beim Hören jede Zeile timen, LRC exportieren', tcExD: 'Holt reine Dialoge aus Untertiteln, zwei Layouts', tcVsD: 'Eingebettete Untertitelspur aus MKV / MP4 holen', tcRpD: 'Erkennt die falsch gelesene Kodierung und dreht den Salat zurück', tcGlD: 'Ein Glossar ändert die ganze Datei', tcBtD: 'Hunderte Dateien in einem ZIP', tcQcD: 'Timing und Satz nach den Regeln der Sprache prüfen' },
    'fr': { tcCvD: 'Convertit entre 7 formats : SRT / VTT / ASS et plus', tcTbD: 'Relisez ligne à ligne dans Excel, réimportez', tcHcD: 'Simplifié ⇄ traditionnel, avec Taïwan / Hong Kong', tcBiD: 'Sépare les sous-titres bilingues en piste source et piste traduite', tcSpD: 'Coupez par durée ou lignes, fusionnez', tcShD: 'Décalage global, redimensionner, fusionner, diviser, ajustage fin', tcClD: 'Strip ads, watermarks and SDH cues — 13 switchable rules', tcLrD: 'Chronométrez chaque ligne en écoutant, exportez en LRC', tcExD: 'Tire les dialogues purs des sous-titres, deux mises en page', tcVsD: 'Sortez la piste de sous-titres intégrée d’un MKV / MP4', tcRpD: 'Détecte l’encodage mal lu et annule le charabia', tcGlD: 'Un glossaire change tout le fichier', tcBtD: 'Des centaines de fichiers en un ZIP', tcQcD: 'Vérifie timing et mise en page selon les règles de la langue' },
    'id': { tcCvD: 'Konversi antar 7 format: SRT / VTT / ASS dan lainnya', tcTbD: 'Tinjau per baris di Excel, impor kembali', tcHcD: 'Sederhana ⇄ Tradisional, dengan Taiwan / Hong Kong', tcBiD: 'Pisahkan subtitle dwibahasa jadi trek asli dan terjemahan', tcSpD: 'Potong per durasi/baris, gabungkan banyak', tcShD: 'Geser global, skala, gabung, pecah, rapikan per baris', tcClD: 'Strip ads, watermarks and SDH cues — 13 switchable rules', tcLrD: 'Tandai tiap baris sambil dengar, ekspor LRC', tcExD: 'Ambil dialog murni dari subtitle, dua tata letak', tcVsD: 'Ambil track subtitle tertanam dari MKV / MP4', tcRpD: 'Deteksi encoding yang salah baca dan balikkan kerusakannya', tcGlD: 'Satu daftar istilah, seluruh berkas', tcBtD: 'Ratusan file jadi satu ZIP', tcQcD: 'Periksa timing dan tata letak sesuai aturan bahasanya' },
    'hi': { tcCvD: '7 फ़ॉर्मेट में बदलें: SRT / VTT / ASS और भी', tcTbD: 'Excel में पंक्ति-दर-पंक्ति देखें, वापस लाएँ', tcHcD: 'सरलीकृत ⇄ पारंपरिक, ताइवान / हांगकांग सहित', tcBiD: 'द्विभाषी उपशीर्षक को मूल और अनुवाद ट्रैक में बाँटें', tcSpD: 'अवधि/पंक्तियों से काटें, कई को जोड़ें', tcShD: 'समग्र ऑफ़सेट, स्केल, मर्ज, स्प्लिट, क्यू-दर-क्यू फ़ाइन ट्यून', tcClD: 'Strip ads, watermarks and SDH cues — 13 switchable rules', tcLrD: 'सुनते हुए हर पंक्ति टैप करें, LRC निर्यात करें', tcExD: 'उपशीर्षक से शुद्ध संवाद निकालें, दो लेआउट', tcVsD: 'MKV / MP4 में छिपी सबटाइटल ट्रैक निकालें', tcRpD: 'ग़लत पढ़ी गई एन्कोडिंग पहचान कर गड़बड़ी उलटें', tcGlD: 'एक ग्लॉसरी, पूरी फ़ाइल', tcBtD: 'सैकड़ों फ़ाइलें एक ZIP में', tcQcD: 'उस भाषा के नियमों से समय और लेआउट जाँचें' },
    'th': { tcCvD: 'แปลงระหว่าง 7 ฟอร์แมต: SRT / VTT / ASS และอื่น ๆ', tcTbD: 'ตรวจทีละบรรทัดใน Excel แล้วส่งกลับ', tcHcD: 'ตัวย่อ ⇄ ตัวเต็ม รองรับไต้หวัน / ฮ่องกง', tcBiD: 'แยกซับสองภาษาเป็นแทร็กต้นฉบับและแทร็กแปล', tcSpD: 'ตัดตามความยาวหรือบรรทัด รวมหลายไฟล์', tcShD: 'ขยับทั้งไฟล์ ย่อ-ขยาย รวม แยก ปรับรายคิว', tcClD: 'Strip ads, watermarks and SDH cues — 13 switchable rules', tcLrD: 'ฟังแล้วปักทีละบรรทัด ส่งออก LRC', tcExD: 'ดึงบทพูดล้วน ๆ จากซับ สองแบบจัดวาง', tcVsD: 'ดึงแทร็กซับที่ฝังใน MKV / MP4 ออกมาเป็น SRT', tcRpD: 'จับ encoding ที่อ่านผิดแล้วย้อนความเพี้ยนกลับ', tcGlD: 'รายการเดียว ทั้งไฟล์ก็ตามมา', tcBtD: 'หลายร้อยไฟล์เป็น ZIP เดียว', tcQcD: 'ตรวจเวลาและการจัดวางตามกฎของภาษานั้น' },
    'vi': { tcCvD: 'Chuyển đổi giữa 7 định dạng: SRT / VTT / ASS và hơn thế', tcTbD: 'Soát từng dòng trong Excel, nhập lại', tcHcD: 'Giản thể ⇄ Phồn thể, kèm Đài Loan / Hồng Kông', tcBiD: 'Tách phụ đề song ngữ thành track gốc và track dịch', tcSpD: 'Cắt theo thời lượng/dòng, gộp nhiều file', tcShD: 'Dịch chuyển toàn cục, co giãn, gộp tách, chỉnh từng câu', tcClD: 'Strip ads, watermarks and SDH cues — 13 switchable rules', tcLrD: 'Bấm mốc từng dòng khi nghe, xuất LRC', tcExD: 'Lấy đoạn hội thoại thuần từ phụ đề, hai kiểu trình bày', tcVsD: 'Rút track phụ đề gắn trong MKV / MP4 thành SRT', tcRpD: 'Nhận diện encoding bị đọc sai và khôi phục về nguyên bản', tcGlD: 'Một bảng thuật ngữ, cả tệp thay đổi', tcBtD: 'Hàng trăm file thành một ZIP', tcQcD: 'Kiểm tra thời gian và bố cục theo quy tắc ngôn ngữ' },
    'ru': { tcCvD: 'Конвертация между 7 форматами: SRT / VTT / ASS и др.', tcTbD: 'Проверяй построчно в Excel, верни назад', tcHcD: 'Упрощённый ⇄ традиционный, с Тайванем / Гонконгом', tcBiD: 'Разделить двуязычные субтитры на оригинал и перевод', tcSpD: 'Режь по длительности или строкам, склеивай', tcShD: 'Общий сдвиг, масштабирование, склейка, разбивка, точная правка', tcClD: 'Strip ads, watermarks and SDH cues — 13 switchable rules', tcLrD: 'Отбивай строки на слух, экспортируй LRC', tcExD: 'Вытащить чистые реплики из субтитров, два формата вывода', tcVsD: 'Достать встроенную дорожку субтитров из MKV / MP4', tcRpD: 'Распознать неверно прочитанную кодировку и всё вернуть', tcGlD: 'Один глоссарий меняет весь файл', tcBtD: 'Сотни файлов в один ZIP', tcQcD: 'Проверит тайминг и вёрстку по правилам языка' },
    'it': { tcCvD: 'Conversione tra 7 formati: SRT / VTT / ASS e altri', tcTbD: 'Rivedi riga per riga in Excel, reimporta', tcHcD: 'Semplificato ⇄ tradizionale, con Taiwan / Hong Kong', tcBiD: 'Dividi i sottotitoli bilingui in traccia originale e tradotta', tcSpD: 'Taglia per durata o righe, unisci molti', tcShD: 'Offset globale, riscalatura, unione, divisione, ritocco per battuta', tcClD: 'Strip ads, watermarks and SDH cues — 13 switchable rules', tcLrD: 'Timbra ogni riga ascoltando, esporta LRC', tcExD: 'Estrai i dialoghi puri dai sottotitoli, due impaginazioni', tcVsD: 'Tira fuori la traccia di sottotitoli dentro MKV / MP4', tcRpD: 'Rileva la codifica letta male e annulla il guasto', tcGlD: 'Un glossario cambia tutto il file', tcBtD: 'Centinaia di file in un solo ZIP', tcQcD: 'Controlla timing e impaginazione secondo le regole della lingua' },
    'ar': { tcCvD: 'تحويل بين 7 صيغ: SRT / VTT / ASS وغيرها', tcTbD: 'راجع سطرًا سطرًا في Excel وأعد الاستيراد', tcHcD: 'المبسّطة ⇄ التقليدية، مع تايوان / هونغ كونغ', tcBiD: 'افصل الترجمة ثنائية اللغة إلى مسار أصلي ومسار مترجم', tcSpD: 'اقطع بالمدة أو الأسطر، ادمج الكثير', tcShD: 'إزاحة شاملة، تحجيم، دمج، تقسيم، ضبط سطر بسطر', tcClD: 'Strip ads, watermarks and SDH cues — 13 switchable rules', tcLrD: 'علّم كل سطر أثناء الاستماع، صدّر LRC', tcExD: 'أخرج الحوار الخالص من الترجمة، بطريقتي عرض', tcVsD: 'أخرج مسار الترجمة المدمج من MKV / MP4', tcRpD: 'اكتشف الترميز المقروء خطأً وأعد النص إلى أصله', tcGlD: 'مسرد واحد يغيّر الملف كله', tcBtD: 'مئات الملفات في ZIP واحد', tcQcD: 'يفحص التوقيت والتنسيق حسب قواعد اللغة' },
    'tr': { tcCvD: '7 format arasında dönüşüm: SRT / VTT / ASS ve dahası', tcTbD: 'Excel\'de satır satır incele, geri al', tcHcD: 'Basitleştirilmiş ⇄ Geleneksel, Tayvan / Hong Kong dahil', tcBiD: 'İki dilli altyazıyı orijinal ve çeviri parçasına ayır', tcSpD: 'Süreye ya da satıra göre kes, çoğu birleştir', tcShD: 'Genel kaydırma, ölçekleme, birleştirme, bölme, satır satır ayar', tcClD: 'Strip ads, watermarks and SDH cues — 13 switchable rules', tcLrD: 'Dinlerken her satırı damgala, LRC dışa aktar', tcExD: 'Altyazıdan saf diyalog çıkar, iki düzen', tcVsD: 'MKV / MP4 içindeki gömülü altyazı parçasını çıkar', tcRpD: 'Yanlış okunan kodlamayı tespit et, bozulmayı geri al', tcGlD: 'Bir sözlük, tüm dosyayı değiştirir', tcBtD: 'Yüzlerce dosya tek ZIP\'te', tcQcD: 'Zamanlama ve dizgiyi dilin kurallarına göre denetler' },
    'nl': { tcCvD: 'Converteren tussen 7 formaten: SRT / VTT / ASS en meer', tcTbD: 'Controleer regel voor regel in Excel, importeer terug', tcHcD: 'Vereenvoudigd ⇄ traditioneel, met Taiwan / Hongkong', tcBiD: 'Splits tweetalige ondertitels in bron- en vertaalspoor', tcSpD: 'Knip op duur of regels, voeg veel samen', tcShD: 'Globale offset, herschalen, samenvoegen, splitsen, per regel bijschaven', tcClD: 'Strip ads, watermarks and SDH cues — 13 switchable rules', tcLrD: 'Markeer elke regel tijdens het luisteren, exporteer LRC', tcExD: 'Haal zuivere dialogen uit ondertitels, twee lay-outs', tcVsD: 'Haal de ingebedde ondertiteltrack uit MKV / MP4', tcRpD: 'Herken de verkeerd gelezen encoding en zet het terug', tcGlD: 'Eén woordenlijst, heel het bestand', tcBtD: 'Honderden bestanden in één ZIP', tcQcD: 'Controleert timing en opmaak volgens de regels van de taal' },
    'pl': { tcCvD: 'Konwersja między 7 formatami: SRT / VTT / ASS i inne', tcTbD: 'Sprawdzaj wiersz po wierszu w Excelu, przywróć', tcHcD: 'Uproszczony ⇄ tradycyjny, z Tajwanem / Hongkongiem', tcBiD: 'Rozdziel napisy dwujęzyczne na ścieżkę oryginału i tłumaczenia', tcSpD: 'Tnij po czasie lub liniach, łącz wiele', tcShD: 'Globalne przesunięcie, skalowanie, scalanie, dzielenie, korekta co do linii', tcClD: 'Strip ads, watermarks and SDH cues — 13 switchable rules', tcLrD: 'Zaznaczaj linie podczas słuchania, eksportuj LRC', tcExD: 'Wyciągnij czysty dialog z napisów, dwa układy', tcVsD: 'Wyjmij wbudowaną ścieżkę napisów z MKV / MP4', tcRpD: 'Wykryj błędnie odczytane kodowanie i cofnij uszkodzenie', tcGlD: 'Jeden glosariusz zmienia cały plik', tcBtD: 'Setki plików w jednym ZIP', tcQcD: 'Sprawdza czas i układ według reguł języka' },
    'sv': { tcCvD: 'Konvertera mellan 7 format: SRT / VTT / ASS med flera', tcTbD: 'Granska rad för rad i Excel, importera tillbaka', tcHcD: 'Förenklad ⇄ traditionell, med Taiwan / Hongkong', tcBiD: 'Dela tvåspråkiga undertexter i original- och översättningsspår', tcSpD: 'Klipp efter längd eller rader, foga samman många', tcShD: 'Global förskjutning, omskalning, sammanfoga, dela, finjustera rad för rad', tcClD: 'Strip ads, watermarks and SDH cues — 13 switchable rules', tcLrD: 'Märk varje rad medan du lyssnar, exportera LRC', tcExD: 'Dra ren dialog ur undertexter, två layouter', tcVsD: 'Ta ut det inbäddade textspåret ur MKV / MP4', tcRpD: 'Upptäck felaktigt avläst teckenkodning och ångra förvirringen', tcGlD: 'En ordlista ändrar hela filen', tcBtD: 'Hundratals filer i en enda ZIP', tcQcD: 'Kontrollerar timing och layout enligt språkets regler' },
    'cs': { tcCvD: 'Převod mezi 7 formáty: SRT / VTT / ASS a další', tcTbD: 'Kontroluj řádek po řádku v Excelu, vrať zpět', tcHcD: 'Zjednodušená ⇄ tradiční, s Tchaj-wanem / Hongkongem', tcBiD: 'Rozdělte dvojjazyčné titulky na originál a překlad', tcSpD: 'Stříhej podle délky či řádků, slep mnoho', tcShD: 'Globální posun, přeškálování, slučování, dělení, doladění po řádcích', tcClD: 'Strip ads, watermarks and SDH cues — 13 switchable rules', tcLrD: 'Označujte řádky při poslechu, exportujte LRC', tcExD: 'Vytáhnout čistý dialog z titulků, dvě rozvržení', tcVsD: 'Vytáhněte vloženou titulkovou stopu z MKV / MP4', tcRpD: 'Rozpoznat špatně přečtené kódování a vrátit vše zpět', tcGlD: 'Jeden glosář změní celý soubor', tcBtD: 'Stovky souborů do jednoho ZIP', tcQcD: 'Zkontroluje timing a sazbu podle pravidel jazyka' },
    'uk': { tcCvD: 'Конвертація між 7 форматами: SRT / VTT / ASS та ін.', tcTbD: 'Вичитуй рядок за рядком в Excel, поверни назад', tcHcD: 'Спрощена ⇄ традиційна, з Тайванем / Гонконгом', tcBiD: 'Розділіть двомовні субтитри на оригінал і переклад', tcSpD: 'Ріж за тривалістю чи рядками, клей багато', tcShD: 'Загальний зсув, масштабування, склейка, розбивка, точна правка', tcClD: 'Strip ads, watermarks and SDH cues — 13 switchable rules', tcLrD: 'Позначайте рядки на слух, експортуйте LRC', tcExD: 'Дістати чисті репліки із субтитрів, два формати виводу', tcVsD: 'Витягніть вбудовану доріжку субтитрів з MKV / MP4', tcRpD: 'Розпізнати помилково прочитане кодування і все повернути', tcGlD: 'Один глосарій змінює весь файл', tcBtD: 'Сотні файлів в один ZIP', tcQcD: 'Перевіряє таймінг і верстку за правилами мови' },
    'da': { tcCvD: 'Konverter mellem 7 formater: SRT / VTT / ASS og flere', tcTbD: 'Gennemgå linje for linje i Excel, importér tilbage', tcHcD: 'Forenklet ⇄ traditionelt, med Taiwan / Hongkong', tcBiD: 'Del tosprogede undertekster i original- og oversættelsesspor', tcSpD: 'Klip efter varighed eller linjer, saml mange', tcShD: 'Global forskydning, omskalering, sammenlægning, opdeling, finjustering pr. linje', tcClD: 'Strip ads, watermarks and SDH cues — 13 switchable rules', tcLrD: 'Markér hver linje, mens du hører, eksportér LRC', tcExD: 'Træk ren dialog ud af undertekster, to layout', tcVsD: 'Træk det indlejrede undertekstspor ud af MKV / MP4', tcRpD: 'Opspor forkert læst tegnkodning og fortryd rodet', tcGlD: 'Én ordliste ændrer hele filen', tcBtD: 'Hundredevis af filer i én ZIP', tcQcD: 'Kontrollerer timing og layout efter sprogets regler' },
    'fi': { tcCvD: 'Muunna 7 muodon välillä: SRT / VTT / ASS ja muita', tcTbD: 'Tarkista rivi riviltä Excelissä, tuo takaisin', tcHcD: 'Yksinkertaistettu ⇄ perinteinen, Taiwan / Hongkong mukana', tcBiD: 'Erota kaksikieliset tekstitykset alkuperäis- ja käännösrataksi', tcSpD: 'Leikkaa keston tai rivimäärän mukaan, yhdistä paljon', tcShD: 'Kokonaissiirto, skaalaus, yhdistys, jako, rivikohtainen hienosäätö', tcClD: 'Strip ads, watermarks and SDH cues — 13 switchable rules', tcLrD: 'Merkitse jokainen rivi kuunnellessasi, vie LRC', tcExD: 'Poimi puhdas dialogi tekstityksistä, kaksi asettelua', tcVsD: 'Pura MKV / MP4 -tiedostoon upotettu tekstitysraita', tcRpD: 'Tunnista väärin luettu merkistö ja kumoa vahinko', tcGlD: 'Yksi sanasto muuttaa koko tiedoston', tcBtD: 'Satoja tiedostoja yhteen ZIP:iin', tcQcD: 'Tarkistaa ajoituksen ja asettelun kielen sääntöjen mukaan' },
    'el': { tcCvD: 'Μετατροπή μεταξύ 7 μορφών: SRT / VTT / ASS και άλλων', tcTbD: 'Ελέγξτε γραμμή-γραμμή στο Excel, επανεισάγετε', tcHcD: 'Απλοποιημένα ⇄ παραδοσιακά, με Ταϊβάν / Χονγκ Κονγκ', tcBiD: 'Χώρισε τα δίγλωσσα υπότιτλους σε πρωτότυπο και μετάφραση', tcSpD: 'Κόψιμο ανά διάρκεια ή γραμμές, ένωση πολλών', tcShD: 'Γενική μετατόπιση, κλιμάκωση, συγχώνευση, διαίρεση, διόρθωση ανά γραμμή', tcClD: 'Strip ads, watermarks and SDH cues — 13 switchable rules', tcLrD: 'Σημειώστε κάθε στίχο καθώς ακούτε, εξαγάγετε LRC', tcExD: 'Βγάλε καθαρό διάλογο από υπότιτλους, δύο διατάξεις', tcVsD: 'Βγάλτε το ενσωματωμένο κομμάτι υποτίτλων από MKV / MP4', tcRpD: 'Ανίχνευσε τη λάθος αναγνωσμένη κωδικοποίηση και ανέτρεψέ τη', tcGlD: 'Ένα γλωσσάρι αλλάζει όλο το αρχείο', tcBtD: 'Εκατοντάδες αρχεία σε ένα ZIP', tcQcD: 'Ελέγχει χρονισμό και στοίχιση σύμφωνα με τους κανόνες της γλώσσας' },
    'he': { tcCvD: 'המרה בין 7 פורמטים: SRT / VTT / ASS ועוד', tcTbD: 'סקרו שורה-שורה ב-Excel וייבאו בחזרה', tcHcD: 'מפושט ⇄ מסורתי, כולל טאיוואן / הונג קונג', tcBiD: 'פצלו כתוביות דו-לשוניות למסלול מקור ומסלול תרגום', tcSpD: 'חתכו לפי משך או שורות, מזגו הרבה', tcShD: 'הזזה גלובלית, שינוי קנה מידה, מיזוג, פיצול, כוונון שורה-שורה', tcClD: 'Strip ads, watermarks and SDH cues — 13 switchable rules', tcLrD: 'סמנו כל שורה בהאזנה, ייצאו LRC', tcExD: 'חלצו דיאלוג טהור מהכתוביות, שתי פריסות', tcVsD: 'הוציאו את רצועת הכתוביות המובנית מ-MKV / MP4', tcRpD: 'זהו קידוד שנקרא לא נכון ובטלו את הבלגן', tcGlD: 'מילון מונחים אחד משנה את כל הקובץ', tcBtD: 'מאות קבצים ב-ZIP אחד', tcQcD: 'בודק תזמון ועימוד לפי כללי השפה' },
    'ro': { tcCvD: 'Conversie între 7 formate: SRT / VTT / ASS și altele', tcTbD: 'Verifică rând cu rând în Excel, importă înapoi', tcHcD: 'Simplificat ⇄ tradițional, cu Taiwan / Hong Kong', tcBiD: 'Separă subtitrările bilingve în pista originală și pista tradusă', tcSpD: 'Taie după durată sau rânduri, îmbină multe', tcShD: 'Decalare globală, rescalare, îmbinare, împărțire, ajustare rând cu rând', tcClD: 'Strip ads, watermarks and SDH cues — 13 switchable rules', tcLrD: 'Marchează fiecare rând ascultând, exportă LRC', tcExD: 'Extrage dialogul curat din subtitrări, două așezări', tcVsD: 'Scoate pista de subtitrări încorporată din MKV / MP4', tcRpD: 'Detectează codarea citită greșit și anulează stricarea', tcGlD: 'Un glosar schimbă tot fișierul', tcBtD: 'Sute de fișiere într-un singur ZIP', tcQcD: 'Verifică timingul și aspectul după regulile limbii' }
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
    qc: { href: '/qc.html',        name: 'navQc',   desc: 'tcQcD', c: '#166534', bg: '#E9F7EE', ic: 'qc' }
  };
  /* 下拉分组：转换与格式 / 双语与拆合 / 时间轴与清理 / 提取与批量（14 个工具） */
  var GROUPS = [
    { k: 'tnG1', ids: ['cv', 'tb', 'hc'] },
    { k: 'tnG2', ids: ['bi', 'sp'] },
    { k: 'tnG3', ids: ['sh', 'cl', 'lr', 'qc'] },
    { k: 'tnG4', ids: ['ex', 'vs', 'rp', 'gl', 'bt'] }
  ];
  var MAIN = ['tr', 'fx'];                        /* 顶栏直接放出的两个站内主项 */
  var EXT = { href: 'https://risekol.com/video', key: 'tnVd' };  /* 外链：新标签打开 */
  var ALLHREF = '/#toolsTitle';                   /* 面板底栏「全部工具」→ 首页工具区 */
  var SEL_IDS = ['uiLang2', 'uiLang', 'langSel']; /* 三种页面用不同 id 的语言下拉 */

  var L = 'zh-CN';

  /* ---------- 语言：URL 前缀 → 语言下拉 → html[lang] → navigator，逐级兜底 ---------- */
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
  function t(k) {   /* 手写键：T 表 */
    return (T[L] && T[L][k]) || (T['en'] && T['en'][k]) || k;
  }
  function tn(k) {  /* 工具名：N 表 */
    var b = N[L] || N['en'];
    return (b && b[k]) || (N['en'] && N['en'][k]) || k;
  }
  function td(k) {  /* 工具描述：D 表 */
    var b = D[L] || D['en'];
    return (b && b[k]) || (D['en'] && D['en'][k]) || '';
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

  /* ---------- 图标（24 视图；stroke 走 currentColor，由外层 --tc 控制） ---------- */
  var ICONS = {'cv':'<path d=\'M4 8h13\'/><path d=\'m14 5 3 3-3 3\'/><path d=\'M20 16H7\'/><path d=\'m10 13-3 3 3 3\'/>','tb':'<rect x=\'3\' y=\'4\' width=\'18\' height=\'16\' rx=\'2\'/><path d=\'M3 10h18\'/><path d=\'M3 15h18\'/><path d=\'M9 10v10\'/>','hc':'<path d=\'m5 8 6 6\'/><path d=\'M4 14l6-6 2-3\'/><path d=\'M2 5h12\'/><path d=\'M7 2h1\'/><path d=\'m22 22-5-10-5 10\'/><path d=\'M14 18h6\'/>','bi':'<rect x=\'3\' y=\'4\' width=\'18\' height=\'16\' rx=\'2\'/><path d=\'M12 4v16\'/><path d=\'M9.5 12H7\'/><path d=\'m9 10-2 2 2 2\'/><path d=\'M14.5 12H17\'/><path d=\'m15 10 2 2-2 2\'/>','sp':'<circle cx=\'6\' cy=\'6\' r=\'2.6\'/><circle cx=\'6\' cy=\'18\' r=\'2.6\'/><path d=\'M8.2 7.5 19 19\'/><path d=\'M8.2 16.5 19 5\'/>','sh':'<path d=\'M3 12h18\'/><path d=\'M6 8v8\'/><path d=\'M18 8v8\'/><circle cx=\'12\' cy=\'12\' r=\'2.2\'/>','cl':'<path d=\'M12 3l1.8 4.7L18.5 9.5 13.8 11.3 12 16l-1.8-4.7L5.5 9.5l4.7-1.8z\'/><path d=\'M19 15l.9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9z\'/>','lr':'<path d=\'M9 18V5l12-2v13\'/><circle cx=\'6\' cy=\'18\' r=\'3\'/><circle cx=\'18\' cy=\'16\' r=\'3\'/>','ex':'<path d=\'M4 4h16\'/><path d=\'M4 9h9\'/><path d=\'M4 14h6\'/><path d=\'M14 13v6\'/><path d=\'m11 16 3 3 3-3\'/>','vs':'<rect x=\'3\' y=\'4\' width=\'18\' height=\'12\' rx=\'2\'/><path d=\'M10 8.4 15.4 10 10 11.6z\' fill=\'currentColor\' stroke=\'none\'/><path d=\'M8 20h8\'/><path d=\'M12 16v4\'/>','rp':'<path d=\'M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z\'/>','gl':'<path d=\'M12 7v14\'/><path d=\'M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z\'/>','qc':'<circle cx=\'11\' cy=\'11\' r=\'7\'/><path d=\'m20 20-3.6-3.6\'/><path d=\'m8.4 11.2 2 2 3.6-3.6\'/>','bt':'<path d=\'m12 2 9 4.5-9 4.5-9-4.5z\'/><path d=\'m3 11.5 9 4.5 9-4.5\'/><path d=\'m3 16.5 9 4.5 9-4.5\'/>','dl':'<path d=\'M12 4v11\'/><path d=\'m7 10 5 5 5-5\'/><path d=\'M4 20h16\'/>','ext':'<path d=\'M7 17 17 7\'/><path d=\'M9 7h8v8\'/>','arr':'<path d=\'M5 12h14\'/><path d=\'m13 6 6 6-6 6\'/>','caret':'<path d=\'m6 9 6 6 6-6\'/>'};

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
      if (el) el.addEventListener('change', render);   /* 切界面语言时导航跟着换 */
    });
  }

  if (d.readyState === 'loading') d.addEventListener('DOMContentLoaded', boot);
  else boot();

  w.SiteTopNav = { render: render, lang: function () { return L; }, cur: CUR };
})(window, document);
