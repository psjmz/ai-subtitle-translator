/* convert-i18n.js —— 字幕格式转换页自己的 27 语词典（v0.9.288）
   只服务 convert.html，与 site-i18n.js 完全分开：本页新增词条不会碰到另外三页。
   ⚠️ 三条硬规矩（加词条时照着做）：
     1) 每个 key 在 27 个语言块里都必须存在（缺了会静默回退中文）；
     2) 非中日韩语言块里不许混进汉字（模型/读者会当成没翻译）；
     3) 占位符 {0} 必须原样保留。 */
(function (root) {
  'use strict';
  var LANGS = [['zh-CN', '简体中文'], ['zh-TW', '繁體中文'], ['en', 'English'], ['ja', '日本語'], ['es', 'Español'], ['pt', 'Português'], ['ko', '한국어'], ['de', 'Deutsch'], ['fr', 'Français'], ['id', 'Bahasa Indonesia'], ['hi', 'हिन्दी'], ['th', 'ไทย'], ['vi', 'Tiếng Việt'], ['ru', 'Русский'], ['it', 'Italiano'], ['ar', 'العربية'], ['tr', 'Türkçe'], ['nl', 'Nederlands'], ['pl', 'Polski'], ['sv', 'Svenska'], ['cs', 'Čeština'], ['uk', 'Українська'], ['da', 'Dansk'], ['fi', 'Suomi'], ['el', 'Ελληνικά'], ['he', 'עברית'], ['ro', 'Română']];

  var DICT = {
    'zh-CN': {
      brandName: '随心字幕 AI', navHome: '首页', navTr: '字幕翻译', navFx: '特效字幕', navCl: '字幕清洗',
      heroA: '字幕', heroEm: '格式转换',
      heroSub: 'SRT、VTT、ASS、SBV、LRC、TXT 互相转换，时间轴原样保留。',
      upTitle: '放入字幕', dzTxt: '把文件拖到这里，或点击选择文件', pastePh: '也可以直接把字幕内容粘贴到这里',
      btnClear: '清除', lblSrc: '识别到的格式', lblOut: '输出格式', btnGo: '转换',
      repTitle: '转换结果', btnDl: '下载', btnCopy: '复制', statCues: '{0} 条', statDur: '总时长 {0}',
      msgDone: '转换完成', errEmpty: '先放入字幕内容', errFmt: '没能识别出字幕格式', footBrand: '随心字幕 AI · 字幕格式转换',
      lblBi: '双语处理', biKeep: '保留双语', biSrc: '只留原文', biDst: '只留译文', biMerge: '合并成一条两行', biHint: '检测到双语字幕', biNone: '未检测到双语字幕'
    },
    'zh-TW': {
      brandName: '隨心字幕 AI', navHome: '首頁', navTr: '字幕翻譯', navFx: '特效字幕', navCl: '字幕清洗',
      heroA: '字幕', heroEm: '格式轉換',
      heroSub: 'SRT、VTT、ASS、SBV、LRC、TXT 互相轉換，時間軸原樣保留。',
      upTitle: '放入字幕', dzTxt: '把檔案拖到這裡，或點擊選擇檔案', pastePh: '也可以直接把字幕內容貼到這裡',
      btnClear: '清除', lblSrc: '辨識到的格式', lblOut: '輸出格式', btnGo: '轉換',
      repTitle: '轉換結果', btnDl: '下載', btnCopy: '複製', statCues: '{0} 條', statDur: '總長度 {0}',
      msgDone: '轉換完成', errEmpty: '請先放入字幕內容', errFmt: '辨識不出字幕格式', footBrand: '隨心字幕 AI · 字幕格式轉換',
      lblBi: '雙語處理', biKeep: '保留雙語', biSrc: '只留原文', biDst: '只留譯文', biMerge: '合併成一條兩行', biHint: '偵測到雙語字幕', biNone: '未偵測到雙語字幕'
    },
    'en': {
      brandName: 'AI-SRTSub', navHome: 'Home', navTr: 'Translate', navFx: 'Effects', navCl: 'Cleaner',
      heroA: 'Subtitle', heroEm: 'Converter',
      heroSub: 'Convert between SRT, VTT, ASS, SBV, LRC and TXT with the timeline kept intact.',
      upTitle: 'Add subtitles', dzTxt: 'Drop a file here, or click to choose', pastePh: 'Or paste your subtitle text here',
      btnClear: 'Clear', lblSrc: 'Detected format', lblOut: 'Output format', btnGo: 'Convert',
      repTitle: 'Result', btnDl: 'Download', btnCopy: 'Copy', statCues: '{0} cues', statDur: 'Length {0}',
      msgDone: 'Done', errEmpty: 'Add some subtitle text first', errFmt: 'Could not recognise the subtitle format', footBrand: 'AI-SRTSub · Subtitle Converter',
      lblBi: 'Bilingual handling', biKeep: 'Keep both languages', biSrc: 'Keep original only', biDst: 'Keep translation only', biMerge: 'Merge into one two-line cue', biHint: 'Bilingual subtitles detected', biNone: 'No bilingual subtitles detected'
    },
    'ja': {
      brandName: 'AI-SRTSub', navHome: 'ホーム', navTr: '字幕翻訳', navFx: '字幕エフェクト', navCl: '字幕クリーナー',
      heroA: '字幕', heroEm: 'フォーマット変換',
      heroSub: 'SRT、VTT、ASS、SBV、LRC、TXT を相互に変換します。タイムラインはそのまま保たれます。',
      upTitle: '字幕を読み込む', dzTxt: 'ここにファイルをドロップ、またはクリックして選択', pastePh: '字幕のテキストをここに貼り付けても構いません',
      btnClear: 'クリア', lblSrc: '検出された形式', lblOut: '出力形式', btnGo: '変換',
      repTitle: '変換結果', btnDl: 'ダウンロード', btnCopy: 'コピー', statCues: '{0} 件', statDur: '長さ {0}',
      msgDone: '変換が完了しました', errEmpty: '先に字幕の内容を入力してください', errFmt: '字幕形式を判別できませんでした', footBrand: 'AI-SRTSub · 字幕フォーマット変換',
      lblBi: 'バイリンガル処理', biKeep: '両方の言語を保持', biSrc: '原文のみ残す', biDst: '訳文のみ残す', biMerge: '2 行の 1 件にまとめる', biHint: 'バイリンガル字幕を検出', biNone: '二言語字幕が見つかりません'
    },
    'es': {
      brandName: 'AI-SRTSub', navHome: 'Inicio', navTr: 'Traducir', navFx: 'Efectos', navCl: 'Limpiador',
      heroA: 'Conversor de', heroEm: 'subtítulos',
      heroSub: 'Convierte entre SRT, VTT, ASS, SBV, LRC y TXT conservando la línea de tiempo.',
      upTitle: 'Añadir subtítulos', dzTxt: 'Suelta un archivo aquí o haz clic para elegir', pastePh: 'O pega aquí el texto de los subtítulos',
      btnClear: 'Limpiar', lblSrc: 'Formato detectado', lblOut: 'Formato de salida', btnGo: 'Convertir',
      repTitle: 'Resultado', btnDl: 'Descargar', btnCopy: 'Copiar', statCues: '{0} líneas', statDur: 'Duración {0}',
      msgDone: 'Listo', errEmpty: 'Añade primero el texto de los subtítulos', errFmt: 'No se pudo reconocer el formato de subtítulos', footBrand: 'AI-SRTSub · Conversor de subtítulos',
      lblBi: 'Texto bilingüe', biKeep: 'Mantener ambos idiomas', biSrc: 'Solo el original', biDst: 'Solo la traducción', biMerge: 'Unir en una entrada de dos líneas', biHint: 'Subtítulos bilingües detectados', biNone: 'No se detectaron subtítulos bilingües'
    },
    'pt': {
      brandName: 'AI-SRTSub', navHome: 'Início', navTr: 'Traduzir', navFx: 'Efeitos', navCl: 'Limpeza',
      heroA: 'Conversor de', heroEm: 'legendas',
      heroSub: 'Converta entre SRT, VTT, ASS, SBV, LRC e TXT mantendo a linha do tempo.',
      upTitle: 'Adicionar legendas', dzTxt: 'Solte um arquivo aqui ou clique para escolher', pastePh: 'Ou cole aqui o texto das legendas',
      btnClear: 'Limpar', lblSrc: 'Formato detectado', lblOut: 'Formato de saída', btnGo: 'Converter',
      repTitle: 'Resultado', btnDl: 'Baixar', btnCopy: 'Copiar', statCues: '{0} linhas', statDur: 'Duração {0}',
      msgDone: 'Concluído', errEmpty: 'Adicione primeiro o texto das legendas', errFmt: 'Não foi possível reconhecer o formato das legendas', footBrand: 'AI-SRTSub · Conversor de legendas',
      lblBi: 'Texto bilíngue', biKeep: 'Manter os dois idiomas', biSrc: 'Só o original', biDst: 'Só a tradução', biMerge: 'Unir numa entrada de duas linhas', biHint: 'Legendas bilíngues detectadas', biNone: 'Nenhuma legenda bilíngue detectada'
    },
    'ko': {
      brandName: 'AI-SRTSub', navHome: '홈', navTr: '자막 번역', navFx: '자막 효과', navCl: '자막 정리',
      heroA: '자막', heroEm: '포맷 변환',
      heroSub: 'SRT, VTT, ASS, SBV, LRC, TXT 를 서로 변환하고 타임라인은 그대로 유지합니다.',
      upTitle: '자막 넣기', dzTxt: '파일을 여기에 끌어다 놓거나 클릭해서 선택', pastePh: '자막 내용을 여기에 붙여넣어도 됩니다',
      btnClear: '지우기', lblSrc: '감지된 형식', lblOut: '출력 형식', btnGo: '변환',
      repTitle: '변환 결과', btnDl: '다운로드', btnCopy: '복사', statCues: '{0}개', statDur: '길이 {0}',
      msgDone: '완료', errEmpty: '먼저 자막 내용을 넣어 주세요', errFmt: '자막 형식을 인식할 수 없습니다', footBrand: 'AI-SRTSub · 자막 포맷 변환',
      lblBi: '이중 언어 처리', biKeep: '두 언어 모두 유지', biSrc: '원문만 남기기', biDst: '번역문만 남기기', biMerge: '두 줄 한 개로 합치기', biHint: '이중 언어 자막이 감지됨', biNone: '이중 언어 자막이 없습니다'
    },
    'de': {
      brandName: 'AI-SRTSub', navHome: 'Start', navTr: 'Übersetzen', navFx: 'Effekte', navCl: 'Reinigung',
      heroA: 'Untertitel', heroEm: 'Konverter',
      heroSub: 'Konvertiere zwischen SRT, VTT, ASS, SBV, LRC und TXT - die Zeitachse bleibt erhalten.',
      upTitle: 'Untertitel laden', dzTxt: 'Datei hierher ziehen oder klicken zum Auswählen', pastePh: 'Oder füge den Untertiteltext hier ein',
      btnClear: 'Leeren', lblSrc: 'Erkanntes Format', lblOut: 'Ausgabeformat', btnGo: 'Konvertieren',
      repTitle: 'Ergebnis', btnDl: 'Herunterladen', btnCopy: 'Kopieren', statCues: '{0} Zeilen', statDur: 'Länge {0}',
      msgDone: 'Fertig', errEmpty: 'Füge zuerst Untertiteltext ein', errFmt: 'Das Untertitelformat konnte nicht erkannt werden', footBrand: 'AI-SRTSub · Untertitel-Konverter',
      lblBi: 'Zweisprachiger Text', biKeep: 'Beide Sprachen behalten', biSrc: 'Nur Original', biDst: 'Nur Übersetzung', biMerge: 'Zu einer zweizeiligen Zeile zusammenfassen', biHint: 'Zweisprachige Untertitel erkannt', biNone: 'Keine zweisprachigen Untertitel erkannt'
    },
    'fr': {
      brandName: 'AI-SRTSub', navHome: 'Accueil', navTr: 'Traduire', navFx: 'Effets', navCl: 'Nettoyage',
      heroA: 'Convertisseur de', heroEm: 'sous-titres',
      heroSub: 'Convertissez entre SRT, VTT, ASS, SBV, LRC et TXT en conservant la ligne de temps.',
      upTitle: 'Ajouter les sous-titres', dzTxt: 'Déposez un fichier ici ou cliquez pour choisir', pastePh: 'Ou collez ici le texte des sous-titres',
      btnClear: 'Effacer', lblSrc: 'Format détecté', lblOut: 'Format de sortie', btnGo: 'Convertir',
      repTitle: 'Résultat', btnDl: 'Télécharger', btnCopy: 'Copier', statCues: '{0} lignes', statDur: 'Durée {0}',
      msgDone: 'Terminé', errEmpty: 'Ajoutez d\'abord le texte des sous-titres', errFmt: 'Format de sous-titres non reconnu', footBrand: 'AI-SRTSub · Convertisseur de sous-titres',
      lblBi: 'Texte bilingue', biKeep: 'Garder les deux langues', biSrc: 'Original seulement', biDst: 'Traduction seulement', biMerge: 'Fusionner en une entrée de deux lignes', biHint: 'Sous-titres bilingues détectés', biNone: 'Aucun sous-titre bilingue détecté'
    },
    'id': {
      brandName: 'AI-SRTSub', navHome: 'Beranda', navTr: 'Terjemahan', navFx: 'Efek', navCl: 'Pembersih',
      heroA: 'Konverter', heroEm: 'subtitle',
      heroSub: 'Konversi antara SRT, VTT, ASS, SBV, LRC, dan TXT dengan timeline tetap utuh.',
      upTitle: 'Masukkan subtitle', dzTxt: 'Seret file ke sini, atau klik untuk memilih', pastePh: 'Atau tempel teks subtitle di sini',
      btnClear: 'Bersihkan', lblSrc: 'Format terdeteksi', lblOut: 'Format keluaran', btnGo: 'Konversi',
      repTitle: 'Hasil', btnDl: 'Unduh', btnCopy: 'Salin', statCues: '{0} baris', statDur: 'Durasi {0}',
      msgDone: 'Selesai', errEmpty: 'Masukkan teks subtitle terlebih dahulu', errFmt: 'Format subtitle tidak dikenali', footBrand: 'AI-SRTSub · Konverter Subtitle',
      lblBi: 'Teks dwibahasa', biKeep: 'Pertahankan kedua bahasa', biSrc: 'Hanya teks asli', biDst: 'Hanya terjemahan', biMerge: 'Gabung jadi satu entri dua baris', biHint: 'Subtitle dwibahasa terdeteksi', biNone: 'Tidak ada subtitle dua bahasa'
    },
    'hi': {
      brandName: 'AI-SRTSub', navHome: 'होम', navTr: 'अनुवाद', navFx: 'इफ़ेक्ट', navCl: 'क्लीनर',
      heroA: 'सबटाइटल', heroEm: 'कनवर्टर',
      heroSub: 'SRT, VTT, ASS, SBV, LRC और TXT के बीच बदलें, टाइमलाइन जस की तस रहती है',
      upTitle: 'सबटाइटल डालें', dzTxt: 'फ़ाइल यहाँ खींचें, या चुनने के लिए क्लिक करें', pastePh: 'या सबटाइटल का टेक्स्ट यहाँ पेस्ट करें',
      btnClear: 'साफ़ करें', lblSrc: 'पहचाना गया फ़ॉर्मैट', lblOut: 'आउटपुट फ़ॉर्मैट', btnGo: 'कनवर्ट करें',
      repTitle: 'परिणाम', btnDl: 'डाउनलोड', btnCopy: 'कॉपी', statCues: '{0} पंक्तियाँ', statDur: 'लंबाई {0}',
      msgDone: 'हो गया', errEmpty: 'पहले सबटाइटल का टेक्स्ट डालें', errFmt: 'सबटाइटल फ़ॉर्मैट पहचाना नहीं जा सका', footBrand: 'AI-SRTSub · सबटाइटल कनवर्टर',
      lblBi: 'द्विभाषी टेक्स्ट', biKeep: 'दोनों भाषाएँ रखें', biSrc: 'केवल मूल', biDst: 'केवल अनुवाद', biMerge: 'एक दो-पंक्ति प्रविष्टि में मिलाएँ', biHint: 'द्विभाषी सबटाइटल मिलीं', biNone: 'द्विभाषी सबटाइटल नहीं मिले'
    },
    'th': {
      brandName: 'AI-SRTSub', navHome: 'หน้าแรก', navTr: 'แปล subtitle', navFx: 'เอฟเฟกต์', navCl: 'คลีนเนอร์',
      heroA: 'ตัวแปลง', heroEm: 'ซับไตเติล',
      heroSub: 'แปลงระหว่าง SRT, VTT, ASS, SBV, LRC และ TXT โดยไทม์ไลน์คงเดิม',
      upTitle: 'ใส่ซับไตเติล', dzTxt: 'ลากไฟล์มาวางที่นี่ หรือคลิกเพื่อเลือก', pastePh: 'หรือวางข้อความซับไตเติลที่นี่',
      btnClear: 'ล้าง', lblSrc: 'รูปแบบที่ตรวจพบ', lblOut: 'รูปแบบเอาต์พุต', btnGo: 'แปลง',
      repTitle: 'ผลลัพธ์', btnDl: 'ดาวน์โหลด', btnCopy: 'คัดลอก', statCues: '{0} บรรทัด', statDur: 'ความยาว {0}',
      msgDone: 'เสร็จแล้ว', errEmpty: 'ใส่ข้อความซับไตเติลก่อน', errFmt: 'ไม่สามารถรู้จักรูปแบบซับไตเติลได้', footBrand: 'AI-SRTSub · ตัวแปลงซับไตเติล',
      lblBi: 'ข้อความสองภาษา', biKeep: 'เก็บทั้งสองภาษา', biSrc: 'เหลือเฉพาะต้นฉบับ', biDst: 'เหลือเฉพาะคำแปล', biMerge: 'รวมเป็นรายการเดียวสองบรรทัด', biHint: 'พบซับไตเติลสองภาษา', biNone: 'ไม่พบคำบรรยายสองภาษา'
    },
    'vi': {
      brandName: 'AI-SRTSub', navHome: 'Trang chủ', navTr: 'Dịch', navFx: 'Hiệu ứng', navCl: 'Làm sạch',
      heroA: 'Bộ chuyển đổi', heroEm: 'phụ đề',
      heroSub: 'Chuyển đổi giữa SRT, VTT, ASS, SBV, LRC và TXT, giữ nguyên trục thời gian.',
      upTitle: 'Thêm phụ đề', dzTxt: 'Kéo tệp vào đây, hoặc nhấn để chọn', pastePh: 'Hoặc dán nội dung phụ đề vào đây',
      btnClear: 'Xóa', lblSrc: 'Định dạng phát hiện', lblOut: 'Định dạng đầu ra', btnGo: 'Chuyển đổi',
      repTitle: 'Kết quả', btnDl: 'Tải xuống', btnCopy: 'Sao chép', statCues: '{0} dòng', statDur: 'Độ dài {0}',
      msgDone: 'Xong', errEmpty: 'Hãy thêm nội dung phụ đề trước', errFmt: 'Không nhận ra định dạng phụ đề', footBrand: 'AI-SRTSub · Bộ chuyển đổi phụ đề',
      lblBi: 'Văn bản song ngữ', biKeep: 'Giữ cả hai ngôn ngữ', biSrc: 'Chỉ giữ bản gốc', biDst: 'Chỉ giữ bản dịch', biMerge: 'Gộp thành một mục hai dòng', biHint: 'Phát hiện phụ đề song ngữ', biNone: 'Không tìm thấy phụ đề song ngữ'
    },
    'ru': {
      brandName: 'AI-SRTSub', navHome: 'Главная', navTr: 'Перевод', navFx: 'Эффекты', navCl: 'Очистка',
      heroA: 'Конвертер', heroEm: 'субтитров',
      heroSub: 'Преобразуйте SRT, VTT, ASS, SBV, LRC и TXT друг в друга, сохраняя таймлайн.',
      upTitle: 'Добавить субтитры', dzTxt: 'Перетащите файл сюда или нажмите для выбора', pastePh: 'Или вставьте текст субтитров сюда',
      btnClear: 'Очистить', lblSrc: 'Определённый формат', lblOut: 'Формат вывода', btnGo: 'Конвертировать',
      repTitle: 'Результат', btnDl: 'Скачать', btnCopy: 'Копировать', statCues: '{0} строк', statDur: 'Длина {0}',
      msgDone: 'Готово', errEmpty: 'Сначала добавьте текст субтитров', errFmt: 'Не удалось распознать формат субтитров', footBrand: 'AI-SRTSub · Конвертер субтитров',
      lblBi: 'Двуязычный текст', biKeep: 'Оставить оба языка', biSrc: 'Только оригинал', biDst: 'Только перевод', biMerge: 'Объединить в одну запись из двух строк', biHint: 'Обнаружены двуязычные субтитры', biNone: 'Двуязычные субтитры не найдены'
    },
    'it': {
      brandName: 'AI-SRTSub', navHome: 'Home', navTr: 'Traduci', navFx: 'Effetti', navCl: 'Pulizia',
      heroA: 'Convertitore di', heroEm: 'sottotitoli',
      heroSub: 'Converti tra SRT, VTT, ASS, SBV, LRC e TXT mantenendo la linea temporale.',
      upTitle: 'Aggiungi sottotitoli', dzTxt: 'Trascina un file qui o fai clic per scegliere', pastePh: 'Oppure incolla qui il testo dei sottotitoli',
      btnClear: 'Svuota', lblSrc: 'Formato rilevato', lblOut: 'Formato di output', btnGo: 'Converti',
      repTitle: 'Risultato', btnDl: 'Scarica', btnCopy: 'Copia', statCues: '{0} righe', statDur: 'Durata {0}',
      msgDone: 'Fatto', errEmpty: 'Aggiungi prima il testo dei sottotitoli', errFmt: 'Formato dei sottotitoli non riconosciuto', footBrand: 'AI-SRTSub · Convertitore di sottotitoli',
      lblBi: 'Testo bilingue', biKeep: 'Mantieni entrambe le lingue', biSrc: 'Solo originale', biDst: 'Solo traduzione', biMerge: 'Unisci in una voce di due righe', biHint: 'Rilevati sottotitoli bilingue', biNone: 'Nessun sottotitolo bilingue rilevato'
    },
    'ar': {
      brandName: 'AI-SRTSub', navHome: 'الرئيسية', navTr: 'ترجمة', navFx: 'تأثيرات', navCl: 'تنظيف',
      heroA: 'محوّل', heroEm: 'الترجمة النصية',
      heroSub: 'حوّل بين SRT و VTT و ASS و SBV و LRC و TXT مع الحفاظ على الخط الزمني كما هو.',
      upTitle: 'أضف الترجمة', dzTxt: 'اسحب الملف إلى هنا، أو انقر للاختيار', pastePh: 'أو الصق نص الترجمة هنا',
      btnClear: 'مسح', lblSrc: 'الصيغة المكتشفة', lblOut: 'صيغة الإخراج', btnGo: 'تحويل',
      repTitle: 'النتيجة', btnDl: 'تنزيل', btnCopy: 'نسخ', statCues: '{0} سطراً', statDur: 'المدة {0}',
      msgDone: 'تم', errEmpty: 'أضف نص الترجمة أولاً', errFmt: 'تعذّر التعرف على صيغة الترجمة', footBrand: 'AI-SRTSub · محوّل الترجمة النصية',
      lblBi: 'نص بلغتين', biKeep: 'الإبقاء على اللغتين', biSrc: 'النص الأصلي فقط', biDst: 'الترجمة فقط', biMerge: 'دمج في مدخل من سطرين', biHint: 'تم اكتشاف ترجمة بلغتين', biNone: 'لم يتم العثور على ترجمات ثنائية اللغة'
    },
    'tr': {
      brandName: 'AI-SRTSub', navHome: 'Ana sayfa', navTr: 'Çeviri', navFx: 'Efektler', navCl: 'Temizleyici',
      heroA: 'Altyazı', heroEm: 'dönüştürücü',
      heroSub: 'SRT, VTT, ASS, SBV, LRC ve TXT arasında dönüştürün, zaman çizgisi olduğu gibi kalır.',
      upTitle: 'Altyazı ekle', dzTxt: 'Dosyayı buraya sürükleyin veya seçmek için tıklayın', pastePh: 'Ya da altyazı metnini buraya yapıştırın',
      btnClear: 'Temizle', lblSrc: 'Algılanan biçim', lblOut: 'Çıktı biçimi', btnGo: 'Dönüştür',
      repTitle: 'Sonuç', btnDl: 'İndir', btnCopy: 'Kopyala', statCues: '{0} satır', statDur: 'Süre {0}',
      msgDone: 'Tamam', errEmpty: 'Önce altyazı metnini ekleyin', errFmt: 'Altyazı biçimi tanınamadı', footBrand: 'AI-SRTSub · Altyazı Dönüştürücü',
      lblBi: 'İki dilli metin', biKeep: 'İki dili de koru', biSrc: 'Yalnızca orijinal', biDst: 'Yalnızca çeviri', biMerge: 'Tek iki satırlık girdiye birleştir', biHint: 'İki dilli altyazı algılandı', biNone: 'İki dilli altyazı bulunamadı'
    },
    'nl': {
      brandName: 'AI-SRTSub', navHome: 'Home', navTr: 'Vertalen', navFx: 'Effecten', navCl: 'Opschonen',
      heroA: 'Ondertitel', heroEm: 'converter',
      heroSub: 'Converteer tussen SRT, VTT, ASS, SBV, LRC en TXT met behoud van de tijdlijn.',
      upTitle: 'Ondertitels toevoegen', dzTxt: 'Sleep een bestand hierheen of klik om te kiezen', pastePh: 'Of plak de ondertiteltekst hier',
      btnClear: 'Wissen', lblSrc: 'Gedetecteerd formaat', lblOut: 'Uitvoerformaat', btnGo: 'Converteren',
      repTitle: 'Resultaat', btnDl: 'Downloaden', btnCopy: 'Kopiëren', statCues: '{0} regels', statDur: 'Lengte {0}',
      msgDone: 'Klaar', errEmpty: 'Voeg eerst ondertiteltekst toe', errFmt: 'Kon het ondertitelformaat niet herkennen', footBrand: 'AI-SRTSub · Ondertitelconverter',
      lblBi: 'Tweetalige tekst', biKeep: 'Beide talen behouden', biSrc: 'Alleen origineel', biDst: 'Alleen vertaling', biMerge: 'Samenvoegen tot één invoer van twee regels', biHint: 'Tweetalige ondertiteling gevonden', biNone: 'Geen tweetalige ondertitels gevonden'
    },
    'pl': {
      brandName: 'AI-SRTSub', navHome: 'Główna', navTr: 'Tłumaczenie', navFx: 'Efekty', navCl: 'Czyszczenie',
      heroA: 'Konwerter', heroEm: 'napisów',
      heroSub: 'Konwertuj między SRT, VTT, ASS, SBV, LRC i TXT, zachowując oś czasu.',
      upTitle: 'Dodaj napisy', dzTxt: 'Przeciągnij plik tutaj lub kliknij, aby wybrać', pastePh: 'Albo wklej tutaj tekst napisów',
      btnClear: 'Wyczyść', lblSrc: 'Wykryty format', lblOut: 'Format wyjściowy', btnGo: 'Konwertuj',
      repTitle: 'Wynik', btnDl: 'Pobierz', btnCopy: 'Kopiuj', statCues: '{0} linii', statDur: 'Długość {0}',
      msgDone: 'Gotowe', errEmpty: 'Najpierw dodaj tekst napisów', errFmt: 'Nie rozpoznano formatu napisów', footBrand: 'AI-SRTSub · Konwerter napisów',
      lblBi: 'Tekst dwujęzyczny', biKeep: 'Zachowaj oba języki', biSrc: 'Tylko oryginał', biDst: 'Tylko tłumaczenie', biMerge: 'Połącz w jedną dwuwierszową pozycję', biHint: 'Wykryto napisy dwujęzyczne', biNone: 'Nie wykryto napisów dwujęzycznych'
    },
    'sv': {
      brandName: 'AI-SRTSub', navHome: 'Start', navTr: 'Översätt', navFx: 'Effekter', navCl: 'Städning',
      heroA: 'Undertext', heroEm: 'konverterare',
      heroSub: 'Konvertera mellan SRT, VTT, ASS, SBV, LRC och TXT med tidslinjen intakt.',
      upTitle: 'Lägg till undertexter', dzTxt: 'Dra en fil hit eller klicka för att välja', pastePh: 'Eller klistra in undertexten här',
      btnClear: 'Rensa', lblSrc: 'Identifierat format', lblOut: 'Utdataformat', btnGo: 'Konvertera',
      repTitle: 'Resultat', btnDl: 'Ladda ner', btnCopy: 'Kopiera', statCues: '{0} rader', statDur: 'Längd {0}',
      msgDone: 'Klart', errEmpty: 'Lägg först till undertexten', errFmt: 'Kunde inte känna igen undertextformatet', footBrand: 'AI-SRTSub · Undertextkonverterare',
      lblBi: 'Tvåspråkig text', biKeep: 'Behåll båda språken', biSrc: 'Bara originalet', biDst: 'Bara översättningen', biMerge: 'Slå ihop till en post med två rader', biHint: 'Tvåspråkig undertext hittades', biNone: 'Inga tvåspråkiga undertexter hittades'
    },
    'cs': {
      brandName: 'AI-SRTSub', navHome: 'Domů', navTr: 'Překlad', navFx: 'Efekty', navCl: 'Čištění',
      heroA: 'Převod', heroEm: 'titulků',
      heroSub: 'Převáděj mezi SRT, VTT, ASS, SBV, LRC a TXT, časová osa zůstává zachována.',
      upTitle: 'Vložit titulky', dzTxt: 'Přetáhni soubor sem nebo klikni pro výběr', pastePh: 'Nebo sem vlož text titulků',
      btnClear: 'Vymazat', lblSrc: 'Rozpoznaný formát', lblOut: 'Výstupní formát', btnGo: 'Převést',
      repTitle: 'Výsledek', btnDl: 'Stáhnout', btnCopy: 'Kopírovat', statCues: '{0} řádků', statDur: 'Délka {0}',
      msgDone: 'Hotovo', errEmpty: 'Nejprve vlož text titulků', errFmt: 'Formát titulků nebyl rozpoznán', footBrand: 'AI-SRTSub · Převod titulků',
      lblBi: 'Dvojjazyčný text', biKeep: 'Ponechat oba jazyky', biSrc: 'Jen originál', biDst: 'Jen překlad', biMerge: 'Sloučit do jedné položky o dvou řádcích', biHint: 'Zjištěny dvojjazyčné titulky', biNone: 'Nebyly nalezeny dvojjazyčné titulky'
    },
    'uk': {
      brandName: 'AI-SRTSub', navHome: 'Головна', navTr: 'Переклад', navFx: 'Ефекти', navCl: 'Очищення',
      heroA: 'Конвертер', heroEm: 'субтитрів',
      heroSub: 'Перетворюйте SRT, VTT, ASS, SBV, LRC і TXT один в один, зберігаючи таймлайн.',
      upTitle: 'Додати субтитри', dzTxt: 'Перетягніть файл сюди або натисніть для вибору', pastePh: 'Або вставте текст субтитрів сюди',
      btnClear: 'Очистити', lblSrc: 'Визначений формат', lblOut: 'Формат виводу', btnGo: 'Конвертувати',
      repTitle: 'Результат', btnDl: 'Завантажити', btnCopy: 'Копіювати', statCues: '{0} рядків', statDur: 'Тривалість {0}',
      msgDone: 'Готово', errEmpty: 'Спочатку додайте текст субтитрів', errFmt: 'Не вдалося розпізнати формат субтитрів', footBrand: 'AI-SRTSub · Конвертер субтитрів',
      lblBi: 'Двомовний текст', biKeep: 'Залишити обидві мови', biSrc: 'Лише оригінал', biDst: 'Лише переклад', biMerge: 'Об’єднати в один запис із двох рядків', biHint: 'Виявлено двомовні субтитри', biNone: 'Двомовних субтитрів не знайдено'
    },
    'da': {
      brandName: 'AI-SRTSub', navHome: 'Forside', navTr: 'Oversæt', navFx: 'Effekter', navCl: 'Rensning',
      heroA: 'Undertekst', heroEm: 'konverter',
      heroSub: 'Konverter mellem SRT, VTT, ASS, SBV, LRC og TXT med tidslinjen intakt.',
      upTitle: 'Tilføj undertekster', dzTxt: 'Træk en fil hertil, eller klik for at vælge', pastePh: 'Eller indsæt undertekstteksten her',
      btnClear: 'Ryd', lblSrc: 'Registreret format', lblOut: 'Outputformat', btnGo: 'Konverter',
      repTitle: 'Resultat', btnDl: 'Download', btnCopy: 'Kopier', statCues: '{0} linjer', statDur: 'Længde {0}',
      msgDone: 'Færdig', errEmpty: 'Tilføj undertekstteksten først', errFmt: 'Kunne ikke genkende undertekstformatet', footBrand: 'AI-SRTSub · Undertekstkonverter',
      lblBi: 'Tosproget tekst', biKeep: 'Behold begge sprog', biSrc: 'Kun original', biDst: 'Kun oversættelse', biMerge: 'Slå sammen til én post på to linjer', biHint: 'Tosprogede undertekster fundet', biNone: 'Ingen tosprogede undertekster fundet'
    },
    'fi': {
      brandName: 'AI-SRTSub', navHome: 'Etusivu', navTr: 'Käännä', navFx: 'Tehosteet', navCl: 'Siivous',
      heroA: 'Tekstitys', heroEm: 'muunnin',
      heroSub: 'Muunna SRT-, VTT-, ASS-, SBV-, LRC- ja TXT-muotojen välillä aikajanan säilyessä.',
      upTitle: 'Lisää tekstitys', dzTxt: 'Raahaa tiedosto tähän tai klikkaa valitaksesi', pastePh: 'Tai liitä tekstityksen teksti tähän',
      btnClear: 'Tyhjennä', lblSrc: 'Tunnistettu muoto', lblOut: 'Tulostusmuoto', btnGo: 'Muunna',
      repTitle: 'Tulos', btnDl: 'Lataa', btnCopy: 'Kopioi', statCues: '{0} riviä', statDur: 'Kesto {0}',
      msgDone: 'Valmis', errEmpty: 'Lisää ensin tekstityksen teksti', errFmt: 'Tekstitysmuotoa ei tunnistettu', footBrand: 'AI-SRTSub · Tekstitysmuunnin',
      lblBi: 'Kaksikielinen teksti', biKeep: 'Säilytä molemmat kielet', biSrc: 'Vain alkuperäinen', biDst: 'Vain käännös', biMerge: 'Yhdistä yhdeksi kaksiriviseksi merkinnäksi', biHint: 'Kaksikieliset tekstitykset havaittu', biNone: 'Kaksikielisiä tekstityksiä ei löytynyt'
    },
    'el': {
      brandName: 'AI-SRTSub', navHome: 'Αρχική', navTr: 'Μετάφραση', navFx: 'Εφέ', navCl: 'Καθαρισμός',
      heroA: 'Μετατροπέας', heroEm: 'υποτίτλων',
      heroSub: 'Μετατρέψτε μεταξύ SRT, VTT, ASS, SBV, LRC και TXT διατηρώντας τη χρονική γραμμή.',
      upTitle: 'Προσθήκη υποτίτλων', dzTxt: 'Σύρετε ένα αρχείο εδώ ή κάντε κλικ για επιλογή', pastePh: 'Ή επικολλήστε το κείμενο των υποτίτλων εδώ',
      btnClear: 'Εκκαθάριση', lblSrc: 'Μορφή που εντοπίστηκε', lblOut: 'Μορφή εξόδου', btnGo: 'Μετατροπή',
      repTitle: 'Αποτέλεσμα', btnDl: 'Λήψη', btnCopy: 'Αντιγραφή', statCues: '{0} γραμμές', statDur: 'Διάρκεια {0}',
      msgDone: 'Έτοιμο', errEmpty: 'Προσθέστε πρώτα το κείμενο των υποτίτλων', errFmt: 'Δεν ήταν δυνατή η αναγνώριση της μορφής υποτίτλων', footBrand: 'AI-SRTSub · Μετατροπέας υποτίτλων',
      lblBi: 'Δίγλωσσο κείμενο', biKeep: 'Κράτησε και τις δύο γλώσσες', biSrc: 'Μόνο το πρωτότυπο', biDst: 'Μόνο τη μετάφραση', biMerge: 'Ενοποίησε σε μία καταχώρηση δύο γραμμών', biHint: 'Εντοπίστηκαν δίγλωσσοι υπότιτλοι', biNone: 'Δεν βρέθηκαν δίγλωσσοι υπότιτλοι'
    },
    'he': {
      brandName: 'AI-SRTSub', navHome: 'בית', navTr: 'תרגום', navFx: 'אפקטים', navCl: 'ניקוי',
      heroA: 'ממיר', heroEm: 'כתוביות',
      heroSub: 'המרה בין SRT, VTT, ASS, SBV, LRC ו־TXT תוך שמירה על ציר הזמן.',
      upTitle: 'הוספת כתוביות', dzTxt: 'גרור קובץ לכאן, או לחץ לבחירה', pastePh: 'או הדבק כאן את טקסט הכתוביות',
      btnClear: 'נקה', lblSrc: 'פורמט שזוהה', lblOut: 'פורמט פלט', btnGo: 'המר',
      repTitle: 'תוצאה', btnDl: 'הורדה', btnCopy: 'העתקה', statCues: '{0} שורות', statDur: 'אורך {0}',
      msgDone: 'בוצע', errEmpty: 'קודם הוסף את טקסט הכתוביות', errFmt: 'לא ניתן לזהות את פורמט הכתוביות', footBrand: 'AI-SRTSub · ממיר כתוביות',
      lblBi: 'טקסט דו-לשוני', biKeep: 'שמור את שתי השפות', biSrc: 'רק המקור', biDst: 'רק התרגום', biMerge: 'מזג לרשומה אחת של שתי שורות', biHint: 'זוהו כתוביות דו-לשוניות', biNone: 'לא נמצאו כתוביות דו-לשוניות'
    },
    'ro': {
      brandName: 'AI-SRTSub', navHome: 'Acasă', navTr: 'Traducere', navFx: 'Efecte', navCl: 'Curățare',
      heroA: 'Convertor de', heroEm: 'subtitrări',
      heroSub: 'Convertește între SRT, VTT, ASS, SBV, LRC și TXT păstrând linia de timp.',
      upTitle: 'Adaugă subtitrări', dzTxt: 'Trage un fișier aici sau apasă pentru a alege', pastePh: 'Sau lipește aici textul subtitrărilor',
      btnClear: 'Șterge', lblSrc: 'Format detectat', lblOut: 'Format de ieșire', btnGo: 'Convertește',
      repTitle: 'Rezultat', btnDl: 'Descarcă', btnCopy: 'Copiază', statCues: '{0} linii', statDur: 'Durată {0}',
      msgDone: 'Gata', errEmpty: 'Adaugă mai întâi textul subtitrărilor', errFmt: 'Nu s-a putut recunoaște formatul subtitrărilor', footBrand: 'AI-SRTSub · Convertor de subtitrări',
      lblBi: 'Text bilingv', biKeep: 'Păstrează ambele limbi', biSrc: 'Doar originalul', biDst: 'Doar traducerea', biMerge: 'Unește într-o singură intrare cu două rânduri', biHint: 'Detectate subtitrări bilingve', biNone: 'Nu s-au găsit subtitrări bilingve'
    }
  };

  root.CONVERT_I18N = { LANGS: LANGS, DICT: DICT };
})(window);
