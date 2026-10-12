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
      heroSub: 'SRT、VTT、ASS、SBV、LRC、TXT 互相转换，时间轴原样保留。全程在你浏览器里完成，文件不上传服务器。',
      upTitle: '放入字幕', dzTxt: '把文件拖到这里，或点击选择文件', pastePh: '也可以直接把字幕内容粘贴到这里',
      btnClear: '清除', lblSrc: '识别到的格式', lblOut: '输出格式', btnGo: '转换',
      repTitle: '转换结果', btnDl: '下载', btnCopy: '复制', statCues: '{0} 条', statDur: '总时长 {0}',
      msgDone: '转换完成', errEmpty: '先放入字幕内容', errFmt: '没能识别出字幕格式',
      noteLocal: '文件只在你的浏览器里处理，不上传服务器', footBrand: '随心字幕 AI · 字幕格式转换'
    },
    'zh-TW': {
      brandName: '隨心字幕 AI', navHome: '首頁', navTr: '字幕翻譯', navFx: '特效字幕', navCl: '字幕清洗',
      heroA: '字幕', heroEm: '格式轉換',
      heroSub: 'SRT、VTT、ASS、SBV、LRC、TXT 互相轉換，時間軸原樣保留。全程在你的瀏覽器裡完成，檔案不會上傳伺服器。',
      upTitle: '放入字幕', dzTxt: '把檔案拖到這裡，或點擊選擇檔案', pastePh: '也可以直接把字幕內容貼到這裡',
      btnClear: '清除', lblSrc: '辨識到的格式', lblOut: '輸出格式', btnGo: '轉換',
      repTitle: '轉換結果', btnDl: '下載', btnCopy: '複製', statCues: '{0} 條', statDur: '總長度 {0}',
      msgDone: '轉換完成', errEmpty: '請先放入字幕內容', errFmt: '辨識不出字幕格式',
      noteLocal: '檔案只在你的瀏覽器裡處理，不會上傳伺服器', footBrand: '隨心字幕 AI · 字幕格式轉換'
    },
    'en': {
      brandName: 'AI-SRTSub', navHome: 'Home', navTr: 'Translate', navFx: 'Effects', navCl: 'Cleaner',
      heroA: 'Subtitle', heroEm: 'Converter',
      heroSub: 'Convert between SRT, VTT, ASS, SBV, LRC and TXT with the timeline kept intact. Everything runs in your browser - the file is never uploaded.',
      upTitle: 'Add subtitles', dzTxt: 'Drop a file here, or click to choose', pastePh: 'Or paste your subtitle text here',
      btnClear: 'Clear', lblSrc: 'Detected format', lblOut: 'Output format', btnGo: 'Convert',
      repTitle: 'Result', btnDl: 'Download', btnCopy: 'Copy', statCues: '{0} cues', statDur: 'Length {0}',
      msgDone: 'Done', errEmpty: 'Add some subtitle text first', errFmt: 'Could not recognise the subtitle format',
      noteLocal: 'Your file is processed in the browser only - it is never uploaded', footBrand: 'AI-SRTSub · Subtitle Converter'
    },
    'ja': {
      brandName: 'AI-SRTSub', navHome: 'ホーム', navTr: '字幕翻訳', navFx: '字幕エフェクト', navCl: '字幕クリーナー',
      heroA: '字幕', heroEm: 'フォーマット変換',
      heroSub: 'SRT、VTT、ASS、SBV、LRC、TXT を相互に変換します。タイムラインはそのまま保たれます。すべてブラウザ内で完結し、ファイルはアップロードされません。',
      upTitle: '字幕を読み込む', dzTxt: 'ここにファイルをドロップ、またはクリックして選択', pastePh: '字幕のテキストをここに貼り付けても構いません',
      btnClear: 'クリア', lblSrc: '検出された形式', lblOut: '出力形式', btnGo: '変換',
      repTitle: '変換結果', btnDl: 'ダウンロード', btnCopy: 'コピー', statCues: '{0} 件', statDur: '長さ {0}',
      msgDone: '変換が完了しました', errEmpty: '先に字幕の内容を入力してください', errFmt: '字幕形式を判別できませんでした',
      noteLocal: 'ファイルはブラウザ内だけで処理され、アップロードされません', footBrand: 'AI-SRTSub · 字幕フォーマット変換'
    },
    'es': {
      brandName: 'AI-SRTSub', navHome: 'Inicio', navTr: 'Traducir', navFx: 'Efectos', navCl: 'Limpiador',
      heroA: 'Conversor de', heroEm: 'subtítulos',
      heroSub: 'Convierte entre SRT, VTT, ASS, SBV, LRC y TXT conservando la línea de tiempo. Todo ocurre en tu navegador: el archivo nunca se sube.',
      upTitle: 'Añadir subtítulos', dzTxt: 'Suelta un archivo aquí o haz clic para elegir', pastePh: 'O pega aquí el texto de los subtítulos',
      btnClear: 'Limpiar', lblSrc: 'Formato detectado', lblOut: 'Formato de salida', btnGo: 'Convertir',
      repTitle: 'Resultado', btnDl: 'Descargar', btnCopy: 'Copiar', statCues: '{0} líneas', statDur: 'Duración {0}',
      msgDone: 'Listo', errEmpty: 'Añade primero el texto de los subtítulos', errFmt: 'No se pudo reconocer el formato de subtítulos',
      noteLocal: 'El archivo se procesa solo en tu navegador y nunca se sube', footBrand: 'AI-SRTSub · Conversor de subtítulos'
    },
    'pt': {
      brandName: 'AI-SRTSub', navHome: 'Início', navTr: 'Traduzir', navFx: 'Efeitos', navCl: 'Limpeza',
      heroA: 'Conversor de', heroEm: 'legendas',
      heroSub: 'Converta entre SRT, VTT, ASS, SBV, LRC e TXT mantendo a linha do tempo. Tudo acontece no seu navegador: o arquivo nunca é enviado.',
      upTitle: 'Adicionar legendas', dzTxt: 'Solte um arquivo aqui ou clique para escolher', pastePh: 'Ou cole aqui o texto das legendas',
      btnClear: 'Limpar', lblSrc: 'Formato detectado', lblOut: 'Formato de saída', btnGo: 'Converter',
      repTitle: 'Resultado', btnDl: 'Baixar', btnCopy: 'Copiar', statCues: '{0} linhas', statDur: 'Duração {0}',
      msgDone: 'Concluído', errEmpty: 'Adicione primeiro o texto das legendas', errFmt: 'Não foi possível reconhecer o formato das legendas',
      noteLocal: 'O arquivo é processado apenas no seu navegador e nunca é enviado', footBrand: 'AI-SRTSub · Conversor de legendas'
    },
    'ko': {
      brandName: 'AI-SRTSub', navHome: '홈', navTr: '자막 번역', navFx: '자막 효과', navCl: '자막 정리',
      heroA: '자막', heroEm: '포맷 변환',
      heroSub: 'SRT, VTT, ASS, SBV, LRC, TXT 를 서로 변환하고 타임라인은 그대로 유지합니다. 모든 작업은 브라우저에서 처리되며 파일은 업로드되지 않습니다.',
      upTitle: '자막 넣기', dzTxt: '파일을 여기에 끌어다 놓거나 클릭해서 선택', pastePh: '자막 내용을 여기에 붙여넣어도 됩니다',
      btnClear: '지우기', lblSrc: '감지된 형식', lblOut: '출력 형식', btnGo: '변환',
      repTitle: '변환 결과', btnDl: '다운로드', btnCopy: '복사', statCues: '{0}개', statDur: '길이 {0}',
      msgDone: '완료', errEmpty: '먼저 자막 내용을 넣어 주세요', errFmt: '자막 형식을 인식할 수 없습니다',
      noteLocal: '파일은 브라우저에서만 처리되며 업로드되지 않습니다', footBrand: 'AI-SRTSub · 자막 포맷 변환'
    },
    'de': {
      brandName: 'AI-SRTSub', navHome: 'Start', navTr: 'Übersetzen', navFx: 'Effekte', navCl: 'Reinigung',
      heroA: 'Untertitel', heroEm: 'Konverter',
      heroSub: 'Konvertiere zwischen SRT, VTT, ASS, SBV, LRC und TXT - die Zeitachse bleibt erhalten. Alles läuft in deinem Browser, die Datei wird nie hochgeladen.',
      upTitle: 'Untertitel laden', dzTxt: 'Datei hierher ziehen oder klicken zum Auswählen', pastePh: 'Oder füge den Untertiteltext hier ein',
      btnClear: 'Leeren', lblSrc: 'Erkanntes Format', lblOut: 'Ausgabeformat', btnGo: 'Konvertieren',
      repTitle: 'Ergebnis', btnDl: 'Herunterladen', btnCopy: 'Kopieren', statCues: '{0} Zeilen', statDur: 'Länge {0}',
      msgDone: 'Fertig', errEmpty: 'Füge zuerst Untertiteltext ein', errFmt: 'Das Untertitelformat konnte nicht erkannt werden',
      noteLocal: 'Die Datei wird nur in deinem Browser verarbeitet und nie hochgeladen', footBrand: 'AI-SRTSub · Untertitel-Konverter'
    },
    'fr': {
      brandName: 'AI-SRTSub', navHome: 'Accueil', navTr: 'Traduire', navFx: 'Effets', navCl: 'Nettoyage',
      heroA: 'Convertisseur de', heroEm: 'sous-titres',
      heroSub: 'Convertissez entre SRT, VTT, ASS, SBV, LRC et TXT en conservant la ligne de temps. Tout se passe dans votre navigateur : le fichier n\'est jamais envoyé.',
      upTitle: 'Ajouter les sous-titres', dzTxt: 'Déposez un fichier ici ou cliquez pour choisir', pastePh: 'Ou collez ici le texte des sous-titres',
      btnClear: 'Effacer', lblSrc: 'Format détecté', lblOut: 'Format de sortie', btnGo: 'Convertir',
      repTitle: 'Résultat', btnDl: 'Télécharger', btnCopy: 'Copier', statCues: '{0} lignes', statDur: 'Durée {0}',
      msgDone: 'Terminé', errEmpty: 'Ajoutez d\'abord le texte des sous-titres', errFmt: 'Format de sous-titres non reconnu',
      noteLocal: 'Le fichier est traité uniquement dans votre navigateur et n\'est jamais envoyé', footBrand: 'AI-SRTSub · Convertisseur de sous-titres'
    },
    'id': {
      brandName: 'AI-SRTSub', navHome: 'Beranda', navTr: 'Terjemahan', navFx: 'Efek', navCl: 'Pembersih',
      heroA: 'Konverter', heroEm: 'subtitle',
      heroSub: 'Konversi antara SRT, VTT, ASS, SBV, LRC, dan TXT dengan timeline tetap utuh. Semua berjalan di browser Anda - file tidak pernah diunggah.',
      upTitle: 'Masukkan subtitle', dzTxt: 'Seret file ke sini, atau klik untuk memilih', pastePh: 'Atau tempel teks subtitle di sini',
      btnClear: 'Bersihkan', lblSrc: 'Format terdeteksi', lblOut: 'Format keluaran', btnGo: 'Konversi',
      repTitle: 'Hasil', btnDl: 'Unduh', btnCopy: 'Salin', statCues: '{0} baris', statDur: 'Durasi {0}',
      msgDone: 'Selesai', errEmpty: 'Masukkan teks subtitle terlebih dahulu', errFmt: 'Format subtitle tidak dikenali',
      noteLocal: 'File diproses hanya di browser Anda dan tidak pernah diunggah', footBrand: 'AI-SRTSub · Konverter Subtitle'
    },
    'hi': {
      brandName: 'AI-SRTSub', navHome: 'होम', navTr: 'अनुवाद', navFx: 'इफ़ेक्ट', navCl: 'क्लीनर',
      heroA: 'सबटाइटल', heroEm: 'कनवर्टर',
      heroSub: 'SRT, VTT, ASS, SBV, LRC और TXT के बीच बदलें, टाइमलाइन ज्यों की त्यों रहती है। सब कुछ आपके ब्राउज़र में होता है - फ़ाइल अपलोड नहीं होती।',
      upTitle: 'सबटाइटल डालें', dzTxt: 'फ़ाइल यहाँ खींचें, या चुनने के लिए क्लिक करें', pastePh: 'या सबटाइटल का текст यहाँ पेस्ट करें',
      btnClear: 'साफ़ करें', lblSrc: 'पहचाना गया फ़ॉर्मैट', lblOut: 'आउटपुट फ़ॉर्मैट', btnGo: 'कनवर्ट करें',
      repTitle: 'परिणाम', btnDl: 'डाउनलोड', btnCopy: 'कॉपी', statCues: '{0} पंक्तियाँ', statDur: 'लंबाई {0}',
      msgDone: 'हो गया', errEmpty: 'पहले सबटाइटल का टेक्स्ट डालें', errFmt: 'सबटाइटल फ़ॉर्मैट पहचाना नहीं जा सका',
      noteLocal: 'फ़ाइल केवल आपके ब्राउज़र में संसाधित होती है, अपलोड नहीं होती', footBrand: 'AI-SRTSub · सबटाइटल कनवर्टर'
    },
    'th': {
      brandName: 'AI-SRTSub', navHome: 'หน้าแรก', navTr: 'แปล subtitle', navFx: 'เอฟเฟกต์', navCl: 'คลีนเนอร์',
      heroA: 'ตัวแปลง', heroEm: 'ซับไตเติล',
      heroSub: 'แปลงระหว่าง SRT, VTT, ASS, SBV, LRC และ TXT โดยไทม์ไลน์ยังคงเดิม ทุกอย่างทำงานในเบราว์เซอร์ของคุณ - ไฟล์ไม่ถูกอัปโหลด',
      upTitle: 'ใส่ซับไตเติล', dzTxt: 'ลากไฟล์มาวางที่นี่ หรือคลิกเพื่อเลือก', pastePh: 'หรือวางข้อความซับไตเติลที่นี่',
      btnClear: 'ล้าง', lblSrc: 'รูปแบบที่ตรวจพบ', lblOut: 'รูปแบบเอาต์พุต', btnGo: 'แปลง',
      repTitle: 'ผลลัพธ์', btnDl: 'ดาวน์โหลด', btnCopy: 'คัดลอก', statCues: '{0} บรรทัด', statDur: 'ความยาว {0}',
      msgDone: 'เสร็จแล้ว', errEmpty: 'ใส่ข้อความซับไตเติลก่อน', errFmt: 'ไม่สามารถรู้จักรูปแบบซับไตเติลได้',
      noteLocal: 'ไฟล์ถูกประมวลผลในเบราว์เซอร์ของคุณเท่านั้น และไม่ถูกอัปโหลด', footBrand: 'AI-SRTSub · ตัวแปลงซับไตเติล'
    },
    'vi': {
      brandName: 'AI-SRTSub', navHome: 'Trang chủ', navTr: 'Dịch', navFx: 'Hiệu ứng', navCl: 'Làm sạch',
      heroA: 'Bộ chuyển đổi', heroEm: 'phụ đề',
      heroSub: 'Chuyển đổi giữa SRT, VTT, ASS, SBV, LRC và TXT, giữ nguyên trục thời gian. Mọi thứ chạy trong trình duyệt của bạn - tệp không bao giờ được tải lên.',
      upTitle: 'Thêm phụ đề', dzTxt: 'Kéo tệp vào đây, hoặc nhấn để chọn', pastePh: 'Hoặc dán nội dung phụ đề vào đây',
      btnClear: 'Xóa', lblSrc: 'Định dạng phát hiện', lblOut: 'Định dạng đầu ra', btnGo: 'Chuyển đổi',
      repTitle: 'Kết quả', btnDl: 'Tải xuống', btnCopy: 'Sao chép', statCues: '{0} dòng', statDur: 'Độ dài {0}',
      msgDone: 'Xong', errEmpty: 'Hãy thêm nội dung phụ đề trước', errFmt: 'Không nhận ra định dạng phụ đề',
      noteLocal: 'Tệp chỉ được xử lý trong trình duyệt của bạn, không tải lên', footBrand: 'AI-SRTSub · Bộ chuyển đổi phụ đề'
    },
    'ru': {
      brandName: 'AI-SRTSub', navHome: 'Главная', navTr: 'Перевод', navFx: 'Эффекты', navCl: 'Очистка',
      heroA: 'Конвертер', heroEm: 'субтитров',
      heroSub: 'Преобразуйте SRT, VTT, ASS, SBV, LRC и TXT друг в друга, сохраняя таймлайн. Всё работает в вашем браузере - файл никогда не загружается.',
      upTitle: 'Добавить субтитры', dzTxt: 'Перетащите файл сюда или нажмите для выбора', pastePh: 'Или вставьте текст субтитров сюда',
      btnClear: 'Очистить', lblSrc: 'Определённый формат', lblOut: 'Формат вывода', btnGo: 'Конвертировать',
      repTitle: 'Результат', btnDl: 'Скачать', btnCopy: 'Копировать', statCues: '{0} строк', statDur: 'Длина {0}',
      msgDone: 'Готово', errEmpty: 'Сначала добавьте текст субтитров', errFmt: 'Не удалось распознать формат субтитров',
      noteLocal: 'Файл обрабатывается только в вашем браузере и никогда не загружается', footBrand: 'AI-SRTSub · Конвертер субтитров'
    },
    'it': {
      brandName: 'AI-SRTSub', navHome: 'Home', navTr: 'Traduci', navFx: 'Effetti', navCl: 'Pulizia',
      heroA: 'Convertitore di', heroEm: 'sottotitoli',
      heroSub: 'Converti tra SRT, VTT, ASS, SBV, LRC e TXT mantenendo la linea temporale. Tutto avviene nel tuo browser: il file non viene mai caricato.',
      upTitle: 'Aggiungi sottotitoli', dzTxt: 'Trascina un file qui o fai clic per scegliere', pastePh: 'Oppure incolla qui il testo dei sottotitoli',
      btnClear: 'Svuota', lblSrc: 'Formato rilevato', lblOut: 'Formato di output', btnGo: 'Converti',
      repTitle: 'Risultato', btnDl: 'Scarica', btnCopy: 'Copia', statCues: '{0} righe', statDur: 'Durata {0}',
      msgDone: 'Fatto', errEmpty: 'Aggiungi prima il testo dei sottotitoli', errFmt: 'Formato dei sottotitoli non riconosciuto',
      noteLocal: 'Il file viene elaborato solo nel tuo browser e non viene mai caricato', footBrand: 'AI-SRTSub · Convertitore di sottotitoli'
    },
    'ar': {
      brandName: 'AI-SRTSub', navHome: 'الرئيسية', navTr: 'ترجمة', navFx: 'تأثيرات', navCl: 'تنظيف',
      heroA: 'محوّل', heroEm: 'الترجمة النصية',
      heroSub: 'حوّل بين SRT و VTT و ASS و SBV و LRC و TXT مع الحفاظ على الخط الزمني كما هو. كل شيء يعمل داخل متصفحك - لا يتم رفع الملف أبداً.',
      upTitle: 'أضف الترجمة', dzTxt: 'اسحب الملف إلى هنا، أو انقر للاختيار', pastePh: 'أو الصق نص الترجمة هنا',
      btnClear: 'مسح', lblSrc: 'الصيغة المكتشفة', lblOut: 'صيغة الإخراج', btnGo: 'تحويل',
      repTitle: 'النتيجة', btnDl: 'تنزيل', btnCopy: 'نسخ', statCues: '{0} سطراً', statDur: 'المدة {0}',
      msgDone: 'تم', errEmpty: 'أضف نص الترجمة أولاً', errFmt: 'تعذّر التعرف على صيغة الترجمة',
      noteLocal: 'تتم معالجة الملف داخل متصفحك فقط ولا يتم رفعه أبداً', footBrand: 'AI-SRTSub · محوّل الترجمة النصية'
    },
    'tr': {
      brandName: 'AI-SRTSub', navHome: 'Ana sayfa', navTr: 'Çeviri', navFx: 'Efektler', navCl: 'Temizleyici',
      heroA: 'Altyazı', heroEm: 'dönüştürücü',
      heroSub: 'SRT, VTT, ASS, SBV, LRC ve TXT arasında dönüştürün, zaman çizgisi olduğu gibi kalır. Her şey tarayıcınızda çalışır - dosya asla yüklenmez.',
      upTitle: 'Altyazı ekle', dzTxt: 'Dosyayı buraya sürükleyin veya seçmek için tıklayın', pastePh: 'Ya da altyazı metnini buraya yapıştırın',
      btnClear: 'Temizle', lblSrc: 'Algılanan biçim', lblOut: 'Çıktı biçimi', btnGo: 'Dönüştür',
      repTitle: 'Sonuç', btnDl: 'İndir', btnCopy: 'Kopyala', statCues: '{0} satır', statDur: 'Süre {0}',
      msgDone: 'Tamam', errEmpty: 'Önce altyazı metnini ekleyin', errFmt: 'Altyazı biçimi tanınamadı',
      noteLocal: 'Dosya yalnızca tarayıcınızda işlenir, asla yüklenmez', footBrand: 'AI-SRTSub · Altyazı Dönüştürücü'
    },
    'nl': {
      brandName: 'AI-SRTSub', navHome: 'Home', navTr: 'Vertalen', navFx: 'Effecten', navCl: 'Opschonen',
      heroA: 'Ondertitel', heroEm: 'converter',
      heroSub: 'Converteer tussen SRT, VTT, ASS, SBV, LRC en TXT met behoud van de tijdlijn. Alles draait in je browser - het bestand wordt nooit geüpload.',
      upTitle: 'Ondertitels toevoegen', dzTxt: 'Sleep een bestand hierheen of klik om te kiezen', pastePh: 'Of plak de ondertiteltekst hier',
      btnClear: 'Wissen', lblSrc: 'Gedetecteerd formaat', lblOut: 'Uitvoerformaat', btnGo: 'Converteren',
      repTitle: 'Resultaat', btnDl: 'Downloaden', btnCopy: 'Kopiëren', statCues: '{0} regels', statDur: 'Lengte {0}',
      msgDone: 'Klaar', errEmpty: 'Voeg eerst ondertiteltekst toe', errFmt: 'Kon het ondertitelformaat niet herkennen',
      noteLocal: 'Het bestand wordt alleen in je browser verwerkt en nooit geüpload', footBrand: 'AI-SRTSub · Ondertitelconverter'
    },
    'pl': {
      brandName: 'AI-SRTSub', navHome: 'Główna', navTr: 'Tłumaczenie', navFx: 'Efekty', navCl: 'Czyszczenie',
      heroA: 'Konwerter', heroEm: 'napisów',
      heroSub: 'Konwertuj między SRT, VTT, ASS, SBV, LRC i TXT, zachowując oś czasu. Wszystko działa w twojej przeglądarce - plik nigdy nie jest wysyłany.',
      upTitle: 'Dodaj napisy', dzTxt: 'Przeciągnij plik tutaj lub kliknij, aby wybrać', pastePh: 'Albo wklej tutaj tekst napisów',
      btnClear: 'Wyczyść', lblSrc: 'Wykryty format', lblOut: 'Format wyjściowy', btnGo: 'Konwertuj',
      repTitle: 'Wynik', btnDl: 'Pobierz', btnCopy: 'Kopiuj', statCues: '{0} linii', statDur: 'Długość {0}',
      msgDone: 'Gotowe', errEmpty: 'Najpierw dodaj tekst napisów', errFmt: 'Nie rozpoznano formatu napisów',
      noteLocal: 'Plik jest przetwarzany tylko w twojej przeglądarce i nigdy nie jest wysyłany', footBrand: 'AI-SRTSub · Konwerter napisów'
    },
    'sv': {
      brandName: 'AI-SRTSub', navHome: 'Start', navTr: 'Översätt', navFx: 'Effekter', navCl: 'Städning',
      heroA: 'Undertext', heroEm: 'konverterare',
      heroSub: 'Konvertera mellan SRT, VTT, ASS, SBV, LRC och TXT med tidslinjen intakt. Allt körs i din webbläsare - filen laddas aldrig upp.',
      upTitle: 'Lägg till undertexter', dzTxt: 'Dra en fil hit eller klicka för att välja', pastePh: 'Eller klistra in undertexten här',
      btnClear: 'Rensa', lblSrc: 'Identifierat format', lblOut: 'Utdataformat', btnGo: 'Konvertera',
      repTitle: 'Resultat', btnDl: 'Ladda ner', btnCopy: 'Kopiera', statCues: '{0} rader', statDur: 'Längd {0}',
      msgDone: 'Klart', errEmpty: 'Lägg först till undertexten', errFmt: 'Kunde inte känna igen undertextformatet',
      noteLocal: 'Filen behandlas bara i din webbläsare och laddas aldrig upp', footBrand: 'AI-SRTSub · Undertextkonverterare'
    },
    'cs': {
      brandName: 'AI-SRTSub', navHome: 'Domů', navTr: 'Překlad', navFx: 'Efekty', navCl: 'Čištění',
      heroA: 'Převod', heroEm: 'titulků',
      heroSub: 'Převáděj mezi SRT, VTT, ASS, SBV, LRC a TXT, časová osa zůstává zachována. Vše běží ve tvém prohlížeči - soubor se nikdy nenahrává.',
      upTitle: 'Vložit titulky', dzTxt: 'Přetáhni soubor sem nebo klikni pro výběr', pastePh: 'Nebo sem vlož text titulků',
      btnClear: 'Vymazat', lblSrc: 'Rozpoznaný formát', lblOut: 'Výstupní formát', btnGo: 'Převést',
      repTitle: 'Výsledek', btnDl: 'Stáhnout', btnCopy: 'Kopírovat', statCues: '{0} řádků', statDur: 'Délka {0}',
      msgDone: 'Hotovo', errEmpty: 'Nejprve vlož text titulků', errFmt: 'Formát titulků nebyl rozpoznán',
      noteLocal: 'Soubor se zpracovává jen ve tvém prohlížeči a nikdy se nenahrává', footBrand: 'AI-SRTSub · Převod titulků'
    },
    'uk': {
      brandName: 'AI-SRTSub', navHome: 'Головна', navTr: 'Переклад', navFx: 'Ефекти', navCl: 'Очищення',
      heroA: 'Конвертер', heroEm: 'субтитрів',
      heroSub: 'Перетворюйте SRT, VTT, ASS, SBV, LRC і TXT один в один, зберігаючи таймлайн. Усе працює у вашому браузері - файл ніколи не завантажується.',
      upTitle: 'Додати субтитри', dzTxt: 'Перетягніть файл сюди або натисніть для вибору', pastePh: 'Або вставте текст субтитрів сюди',
      btnClear: 'Очистити', lblSrc: 'Визначений формат', lblOut: 'Формат виводу', btnGo: 'Конвертувати',
      repTitle: 'Результат', btnDl: 'Завантажити', btnCopy: 'Копіювати', statCues: '{0} рядків', statDur: 'Тривалість {0}',
      msgDone: 'Готово', errEmpty: 'Спочатку додайте текст субтитрів', errFmt: 'Не вдалося розпізнати формат субтитрів',
      noteLocal: 'Файл обробляється лише у вашому браузері і ніколи не завантажується', footBrand: 'AI-SRTSub · Конвертер субтитрів'
    },
    'da': {
      brandName: 'AI-SRTSub', navHome: 'Forside', navTr: 'Oversæt', navFx: 'Effekter', navCl: 'Rensning',
      heroA: 'Undertekst', heroEm: 'konverter',
      heroSub: 'Konverter mellem SRT, VTT, ASS, SBV, LRC og TXT med tidslinjen intakt. Det hele kører i din browser - filen uploades aldrig.',
      upTitle: 'Tilføj undertekster', dzTxt: 'Træk en fil hertil, eller klik for at vælge', pastePh: 'Eller indsæt undertekstteksten her',
      btnClear: 'Ryd', lblSrc: 'Registreret format', lblOut: 'Outputformat', btnGo: 'Konverter',
      repTitle: 'Resultat', btnDl: 'Download', btnCopy: 'Kopier', statCues: '{0} linjer', statDur: 'Længde {0}',
      msgDone: 'Færdig', errEmpty: 'Tilføj undertekstteksten først', errFmt: 'Kunne ikke genkende undertekstformatet',
      noteLocal: 'Filen behandles kun i din browser og uploades aldrig', footBrand: 'AI-SRTSub · Undertekstkonverter'
    },
    'fi': {
      brandName: 'AI-SRTSub', navHome: 'Etusivu', navTr: 'Käännä', navFx: 'Tehosteet', navCl: 'Siivous',
      heroA: 'Tekstitys', heroEm: 'muunnin',
      heroSub: 'Muunna SRT-, VTT-, ASS-, SBV-, LRC- ja TXT-muotojen välillä aikajanan säilyessä. Kaikki tapahtuu selaimessasi - tiedostoa ei koskaan ladata palvelimelle.',
      upTitle: 'Lisää tekstitys', dzTxt: 'Raahaa tiedosto tähän tai klikkaa valitaksesi', pastePh: 'Tai liitä tekstityksen teksti tähän',
      btnClear: 'Tyhjennä', lblSrc: 'Tunnistettu muoto', lblOut: 'Tulostusmuoto', btnGo: 'Muunna',
      repTitle: 'Tulos', btnDl: 'Lataa', btnCopy: 'Kopioi', statCues: '{0} riviä', statDur: 'Kesto {0}',
      msgDone: 'Valmis', errEmpty: 'Lisää ensin tekstityksen teksti', errFmt: 'Tekstitysmuotoa ei tunnistettu',
      noteLocal: 'Tiedosto käsitellään vain selaimessasi, eikä sitä koskaan ladata palvelimelle', footBrand: 'AI-SRTSub · Tekstitysmuunnin'
    },
    'el': {
      brandName: 'AI-SRTSub', navHome: 'Αρχική', navTr: 'Μετάφραση', navFx: 'Εφέ', navCl: 'Καθαρισμός',
      heroA: 'Μετατροπέας', heroEm: 'υποτίτλων',
      heroSub: 'Μετατρέψτε μεταξύ SRT, VTT, ASS, SBV, LRC και TXT διατηρώντας τη χρονική γραμμή. Όλα γίνονται στον περιηγητή σας - το αρχείο δεν ανεβαίνει ποτέ.',
      upTitle: 'Προσθήκη υποτίτλων', dzTxt: 'Σύρετε ένα αρχείο εδώ ή κάντε κλικ για επιλογή', pastePh: 'Ή επικολλήστε το κείμενο των υποτίτλων εδώ',
      btnClear: 'Εκκαθάριση', lblSrc: 'Μορφή που εντοπίστηκε', lblOut: 'Μορφή εξόδου', btnGo: 'Μετατροπή',
      repTitle: 'Αποτέλεσμα', btnDl: 'Λήψη', btnCopy: 'Αντιγραφή', statCues: '{0} γραμμές', statDur: 'Διάρκεια {0}',
      msgDone: 'Έτοιμο', errEmpty: 'Προσθέστε πρώτα το κείμενο των υποτίτλων', errFmt: 'Δεν ήταν δυνατή η αναγνώριση της μορφής υποτίτλων',
      noteLocal: 'Το αρχείο επεξεργάζεται μόνο στον περιηγητή σας και δεν ανεβαίνει ποτέ', footBrand: 'AI-SRTSub · Μετατροπέας υποτίτλων'
    },
    'he': {
      brandName: 'AI-SRTSub', navHome: 'בית', navTr: 'תרגום', navFx: 'אפקטים', navCl: 'ניקוי',
      heroA: 'ממיר', heroEm: 'כתוביות',
      heroSub: 'המרה בין SRT, VTT, ASS, SBV, LRC ו־TXT תוך שמירה על ציר הזמן. הכול מתבצע בדפדפן שלך - הקובץ לעולם לא מועלה.',
      upTitle: 'הוספת כתוביות', dzTxt: 'גרור קובץ לכאן, או לחץ לבחירה', pastePh: 'או הדבק כאן את טקסט הכתוביות',
      btnClear: 'נקה', lblSrc: 'פורמט שזוהה', lblOut: 'פורמט פלט', btnGo: 'המר',
      repTitle: 'תוצאה', btnDl: 'הורדה', btnCopy: 'העתקה', statCues: '{0} שורות', statDur: 'אורך {0}',
      msgDone: 'בוצע', errEmpty: 'קודם הוסף את טקסט הכתוביות', errFmt: 'לא ניתן לזהות את פורמט הכתוביות',
      noteLocal: 'הקובץ מעובד רק בדפדפן שלך ולעולם לא מועלה', footBrand: 'AI-SRTSub · ממיר כתוביות'
    },
    'ro': {
      brandName: 'AI-SRTSub', navHome: 'Acasă', navTr: 'Traducere', navFx: 'Efecte', navCl: 'Curățare',
      heroA: 'Convertor de', heroEm: 'subtitrări',
      heroSub: 'Convertește între SRT, VTT, ASS, SBV, LRC și TXT păstrând linia de timp. Totul rulează în browserul tău - fișierul nu este încărcat niciodată.',
      upTitle: 'Adaugă subtitrări', dzTxt: 'Trage un fișier aici sau apasă pentru a alege', pastePh: 'Sau lipește aici textul subtitrărilor',
      btnClear: 'Șterge', lblSrc: 'Format detectat', lblOut: 'Format de ieșire', btnGo: 'Convertește',
      repTitle: 'Rezultat', btnDl: 'Descarcă', btnCopy: 'Copiază', statCues: '{0} linii', statDur: 'Durată {0}',
      msgDone: 'Gata', errEmpty: 'Adaugă mai întâi textul subtitrărilor', errFmt: 'Nu s-a putut recunoaște formatul subtitrărilor',
      noteLocal: 'Fișierul este procesat doar în browserul tău și nu este încărcat niciodată', footBrand: 'AI-SRTSub · Convertor de subtitrări'
    }
  };

  root.CONVERT_I18N = { LANGS: LANGS, DICT: DICT };
})(window);
