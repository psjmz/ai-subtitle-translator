# -*- coding: utf-8 -*-
"""v0.9.291：把第七个页面 /shift.html 接进 server.js
   ① SEO_SHIFT 27 语表  ② SHIFT_PATH  ③ SEO_PAGES.shift  ④ 路由正则加 shift  ⑤ sitemap 注释改七页"""
import io, re

F = 'server.js'
s = io.open(F, encoding='utf-8').read()

# 语言顺序与 SEO_LANGS 一致
LANGS = ['zh-CN', 'zh-TW', 'en', 'ja', 'es', 'pt', 'ko', 'de', 'fr', 'id', 'hi',
         'th', 'vi', 'ru', 'it', 'ar', 'tr', 'nl', 'pl', 'sv', 'cs', 'uk',
         'da', 'fi', 'el', 'he', 'ro']

T = {
 'zh-CN': dict(
  title='字幕时间轴调整 - 整体平移 / 倍率缩放 / 两点校正 | 随心字幕 AI',
  desc='免费在线字幕时间轴调整：整体提前或延后、按倍率缩放、两点校正一次对上。支持 SRT、VTT、ASS、SBV、LRC、TXT，纯浏览器本地处理，文件不上传服务器。',
  kw='字幕时间轴调整,字幕时间轴平移,字幕延迟调整,srt时间轴校正,字幕对不上,字幕快慢调整,ass时间轴调整,字幕时间轴缩放,subtitle timing shift',
  intro='字幕和画面对不上时，把时间轴整体提前或延后、按倍率缩放，或者用两点校正一次对上。',
  feat='平移只改位置、不动每条字幕的时长；倍率缩放会把时长同步缩放，适合 24 帧与 25 帧互转这类场景；两点校正针对既有偏移又有速率差的字幕。算出来是负数的时间会截断到 0，并告诉你有几条受影响。',
  who='换了片源、字幕整体快了或慢了、或者拿到别人按不同帧率做的字幕的人。',
  siteName='随心字幕 AI', jsonldName='随心字幕 AI', jsonldAlt='AI-SRTSub'),
 'zh-TW': dict(
  title='字幕時間軸調整 - 整體平移 / 倍率縮放 / 兩點校正 | 隨心字幕 AI',
  desc='免費線上字幕時間軸調整：整體提前或延後、依倍率縮放、兩點校正一次對上。支援 SRT、VTT、ASS、SBV、LRC、TXT，純瀏覽器本地處理，檔案不上傳伺服器。',
  kw='字幕時間軸調整,字幕時間軸平移,字幕延遲調整,srt時間軸校正,字幕對不上,字幕快慢調整,ass時間軸調整,字幕時間軸縮放,subtitle timing shift',
  intro='字幕和畫面對不上時，把時間軸整體提前或延後、依倍率縮放，或用兩點校正一次對上。',
  feat='平移只改位置、不動每條字幕的長度；倍率縮放會讓長度同步縮放，適合 24 幀與 25 幀互轉這類情境；兩點校正針對既有偏移又有速率差的字幕。算出來的時間若為負數會截到 0，並告訴你有幾條受影響。',
  who='換了片源、字幕整體快了或慢了、或拿到別人按不同幀率做的字幕的人。',
  siteName='隨心字幕 AI', jsonldName='隨心字幕 AI', jsonldAlt='AI-SRTSub'),
 'en': dict(
  title='Subtitle Timeline Shift - Move, Rescale or Fix Drift | AI-SRTSub',
  desc='Free online subtitle timing tool: shift everything at once, rescale by a ratio, or fix drift with two anchor points. Works with SRT, VTT, ASS, SBV, LRC and TXT. Runs in your browser - the file is never uploaded.',
  kw='subtitle timing shift,shift srt timing,subtitle sync adjust,rescale subtitle timing,fix subtitle delay,srt time offset,subtitle drift fix',
  intro='When subtitles are out of sync, move the whole timeline, rescale it by a ratio, or fix it with two anchor points.',
  feat='Shifting moves every cue without changing how long each one stays on screen. Rescaling multiplies both ends, so cue length changes with it - handy between 24 and 25 fps. The two-point fix handles files that are both offset and running at the wrong speed. Times that come out negative are clamped to zero, and the tool tells you how many were affected.',
  who='Anyone whose subtitles drift after a source change, run slightly fast or slow, or came from someone working at a different frame rate.',
  siteName='AI-SRTSub', jsonldName='AI-SRTSub', jsonldAlt='Subtitle Timeline Shift'),
 'ja': dict(
  title='字幕タイムライン調整 - 一括移動 / 倍率伸縮 / 2 点補正 | AI-SRTSub',
  desc='無料のオンラインツール：字幕のタイムラインを一括でずらす、倍率で伸縮する、2 点で補正できます。SRT、VTT、ASS、SBV、LRC、TXT に対応し、ブラウザ内だけで処理されます。',
  kw='字幕 タイムライン 調整,字幕 ずらす,srt 時間 調整,字幕 遅れ 修正,字幕 早い 遅い,ass タイムライン,subtitle timing shift',
  intro='字幕が映像とずれるとき、タイムラインを一括で動かす、倍率で伸縮する、2 点で補正できます。',
  feat='一括移動は各字幕の表示時間を変えずに位置だけ動かします。倍率は開始と終了の両方にかかるため表示時間も変わります（24fps と 25fps の違いに最適）。2 点補正はずれと速度差が両方ある字幕に対応します。負の時間になった行は 0 に丸められ、件数が表示されます。',
  who='配信元が変わって字幕がずれた人、字幕全体が速い・遅い人、別のフレームレートで作られた字幕を受け取った人。',
  siteName='AI-SRTSub', jsonldName='AI-SRTSub', jsonldAlt='Subtitle Timeline Shift'),
 'es': dict(
  title='Ajuste de tiempos de subtítulos - desplazar, escalar o corregir | AI-SRTSub',
  desc='Herramienta online gratis: desplaza todos los tiempos, reescala con un factor o corrige con dos puntos. Funciona con SRT, VTT, ASS, SBV, LRC y TXT. Se ejecuta en tu navegador: el archivo nunca se sube.',
  kw='ajustar tiempo subtítulos,desplazar subtítulos srt,sincronizar subtítulos,corregir retraso subtítulos,reescalar subtítulos,srt tiempo desfase',
  intro='Cuando los subtítulos no van sincronizados, desplaza toda la línea de tiempo, reescala con un factor o corrígela con dos puntos.',
  feat='Desplazar mueve cada línea sin cambiar cuánto tiempo se muestra. Reescalar multiplica el inicio y el fin, así que la duración cambia: útil entre 24 y 25 fps. La corrección de dos puntos sirve para archivos con desfase y velocidad distinta. Los tiempos negativos se fijan en cero y se indica cuántas líneas se vieron afectadas.',
  who='Quien cambia de fuente y los subtítulos se desincronizan, van algo rápidos o lentos, o vienen de alguien que trabajó a otro fotogramaje.',
  siteName='AI-SRTSub', jsonldName='AI-SRTSub', jsonldAlt='Subtitle Timeline Shift'),
 'pt': dict(
  title='Ajuste de tempo das legendas - mover, escalar ou corrigir | AI-SRTSub',
  desc='Ferramenta online grátis: desloque tudo de uma vez, reescale com um fator ou corrija com dois pontos. Funciona com SRT, VTT, ASS, SBV, LRC e TXT. Roda no seu navegador: o arquivo nunca é enviado.',
  kw='ajustar tempo legendas,deslocar legenda srt,sincronizar legendas,corrigir atraso legenda,reescalar legenda,srt tempo deslocado',
  intro='Quando as legendas estão fora de sincronia, mova toda a linha do tempo, reescale com um fator ou corrija com dois pontos.',
  feat='Deslocar move cada linha sem mudar quanto tempo ela fica na tela. Reescalar multiplica o início e o fim, então a duração muda: útil entre 24 e 25 fps. A correção de dois pontos atende arquivos com deslocamento e velocidade diferente. Tempos negativos vão a zero e a ferramenta informa quantas linhas foram afetadas.',
  who='Quem troca de fonte e as legendas dessincronizam, ficam rápidas ou lentas, ou vieram de alguém que trabalhou em outra taxa de quadros.',
  siteName='AI-SRTSub', jsonldName='AI-SRTSub', jsonldAlt='Subtitle Timeline Shift'),
 'ko': dict(
  title='자막 타임라인 조정 - 이동 / 배율 / 두 지점 보정 | AI-SRTSub',
  desc='무료 온라인 자막 시간 조정 도구: 한꺼번에 이동, 배율 조정, 두 지점 보정을 지원합니다. SRT, VTT, ASS, SBV, LRC, TXT 를 처리하며 브라우저에서만 실행됩니다.',
  kw='자막 시간 조정,자막 싱크 맞추기,srt 시간 조정,자막 밀림 수정,자막 빠르게 느리게,ass 타임라인,subtitle timing shift',
  intro='자막이 영상과 맞지 않을 때 타임라인을 한꺼번에 옮기거나 배율로 조정하거나 두 지점으로 보정하세요.',
  feat='이동은 각 자막의 표시 시간을 바꾸지 않고 위치만 옮깁니다. 배율은 시작과 끝을 모두 곱하므로 길이도 함께 바뀝니다(24fps와 25fps 사이에 유용). 두 지점 보정은 밀림과 속도 차이가 모두 있는 파일에 적합합니다. 음수가 된 시간은 0으로 처리되고 몇 줄이 영향을 받았는지 알려 줍니다.',
  who='소스를 바꿔 자막이 밀린 사람, 자막이 전반적으로 빠르거나 느린 사람, 다른 프레임레이트로 만든 자막을 받은 사람.',
  siteName='AI-SRTSub', jsonldName='AI-SRTSub', jsonldAlt='Subtitle Timeline Shift'),
 'de': dict(
  title='Zeitachse der Untertitel anpassen - verschieben, skalieren, korrigieren | AI-SRTSub',
  desc='Kostenloses Online-Werkzeug: alles gemeinsam verschieben, mit einem Faktor skalieren oder mit zwei Punkten korrigieren. Für SRT, VTT, ASS, SBV, LRC und TXT. Läuft im Browser - die Datei wird nie hochgeladen.',
  kw='Untertitel Zeitachse anpassen,Untertitel verschieben,srt Zeit korrigieren,Untertitel Versatz,Untertitel zu schnell,ass Zeitachse',
  intro='Wenn die Untertitel nicht passen: ganze Zeitachse verschieben, mit einem Faktor skalieren oder mit zwei Punkten korrigieren.',
  feat='Verschieben bewegt jede Zeile, ohne ihre Anzeigedauer zu ändern. Skalieren multipliziert Anfang und Ende, also ändert sich die Dauer - praktisch zwischen 24 und 25 fps. Die Zwei-Punkt-Korrektur greift bei Versatz und falscher Geschwindigkeit. Negative Zeiten werden auf 0 gesetzt, und es wird angezeigt, wie viele Zeilen betroffen sind.',
  who='Alle, deren Untertitel nach einem Quellwechsel verrutschen, etwas zu schnell oder zu langsam laufen, oder von jemandem mit anderer Bildrate stammen.',
  siteName='AI-SRTSub', jsonldName='AI-SRTSub', jsonldAlt='Subtitle Timeline Shift'),
 'fr': dict(
  title='Décalage des sous-titres - déplacer, mettre à l\'échelle ou corriger | AI-SRTSub',
  desc='Outil en ligne gratuit : décalez tout d\'un coup, redimensionnez avec un facteur ou corrigez avec deux points. Fonctionne avec SRT, VTT, ASS, SBV, LRC et TXT. Tout se passe dans le navigateur : le fichier n\'est jamais envoyé.',
  kw='décaler sous-titres,ajuster temps sous-titres,synchroniser sous-titres,corriger retard sous-titres,srt décalage horaire,sous-titres décalés',
  intro='Quand les sous-titres ne sont pas synchronisés, déplacez toute la ligne de temps, redimensionnez avec un facteur ou corrigez avec deux points.',
  feat='Le décalage déplace chaque ligne sans changer sa durée d\'affichage. La mise à l\'échelle multiplie le début et la fin, la durée change donc aussi - pratique entre 24 et 25 i/s. La correction à deux points traite les fichiers à la fois décalés et à la mauvaise vitesse. Les temps négatifs sont ramenés à zéro, avec le nombre de lignes concernées.',
  who='Ceux dont les sous-titres dérivent après un changement de source, vont un peu trop vite ou trop lentement, ou viennent de quelqu\'un qui a travaillé à une autre cadence.',
  siteName='AI-SRTSub', jsonldName='AI-SRTSub', jsonldAlt='Subtitle Timeline Shift'),
 'id': dict(
  title='Penyesuaian waktu subtitle - geser, skala, atau koreksi | AI-SRTSub',
  desc='Alat online gratis: geser semuanya sekaligus, ubah skala dengan faktor, atau koreksi dengan dua titik. Mendukung SRT, VTT, ASS, SBV, LRC, dan TXT. Berjalan di browser Anda - file tidak pernah diunggah.',
  kw='sesuaikan waktu subtitle,geser subtitle srt,sinkronkan subtitle,perbaiki subtitle telat,ubah skala subtitle,srt waktu bergeser',
  intro='Saat subtitle tidak sinkron, geser seluruh timeline, ubah skalanya dengan faktor, atau koreksi dengan dua titik.',
  feat='Menggeser memindahkan setiap baris tanpa mengubah durasi tayangnya. Mengubah skala mengalikan awal dan akhir, jadi durasinya ikut berubah - berguna antara 24 dan 25 fps. Koreksi dua titik menangani file yang bergeser sekaligus meleset kecepatannya. Waktu yang menjadi negatif dikembalikan ke 0 dan jumlah baris yang terdampak diberitahukan.',
  who='Siapa pun yang subtitle-nya bergeser setelah ganti sumber, terasa lebih cepat atau lambat, atau berasal dari orang yang bekerja di frame rate berbeda.',
  siteName='AI-SRTSub', jsonldName='AI-SRTSub', jsonldAlt='Subtitle Timeline Shift'),
 'hi': dict(
  title='सबटाइटल समय समायोजन - खिसकाएँ, स्केल करें या ठीक करें | AI-SRTSub',
  desc='मुफ़्त ऑनलाइन टूल: सब कुछ एक साथ खिसकाएँ, किसी गुणक से स्केल करें, या दो बिंदुओं से ठीक करें। SRT, VTT, ASS, SBV, LRC और TXT चलता है। आपके ब्राउज़र में चलता है - फ़ाइल अपलोड नहीं होती।',
  kw='सबटाइटल समय समायोजन,सबटाइटल सिंक,srt समय सुधार,सबटाइटल देरी,सबटाइटल स्केल,ass टाइमलाइन',
  intro='जब सबटाइटल मेल न खाएँ, पूरी समय रेखा खिसकाएँ, गुणक से स्केल करें, या दो बिंदुओं से ठीक करें।',
  feat='खिसकाने से हर पंक्ति की प्रदर्शन अवधि बदले बिना समय बदलता है। स्केलिंग से शुरू और अंत दोनों गुणा होते हैं, इसलिए अवधि भी बदलती है - 24 और 25 fps के बीच काम का। दो-बिंदु सुधार उन फ़ाइलों के लिए है जिनमें खिसकाव और गलत गति दोनों हैं। ऋणात्मक समय 0 कर दिया जाता है और बताया जाता है कि कितनी पंक्तियाँ प्रभावित हुईं।',
  who='जिनके सबटाइटल स्रोत बदलने पर खिसक जाते हैं, थोड़े तेज़ या धीमे चलते हैं, या किसी और फ़्रेम दर पर बने हैं।',
  siteName='AI-SRTSub', jsonldName='AI-SRTSub', jsonldAlt='Subtitle Timeline Shift'),
 'th': dict(
  title='ปรับไทม์ไลน์ซับไตเติล - เลื่อน, ปรับสัดส่วน หรือแก้ด้วยสองจุด | AI-SRTSub',
  desc='เครื่องมือออนไลน์ฟรี: เลื่อนทั้งหมดพร้อมกัน ปรับสัดส่วนด้วยอัตรา หรือแก้ด้วยจุดอ้างอิงสองจุด รองรับ SRT, VTT, ASS, SBV, LRC และ TXT ทำงานในเบราว์เซอร์ของคุณ - ไฟล์ไม่ถูกอัปโหลด',
  kw='ปรับเวลาซับไตเติล,เลื่อนซับไตเติล,ซิงค์ซับไตเติล,แก้ซับไตเติลช้า,ปรับสัดส่วนซับไตเติล,srt เวลาเพี้ยน',
  intro='เมื่อซับไตเติลไม่ตรงกับภาพ ให้เลื่อนทั้งไทม์ไลน์ ปรับสัดส่วนด้วยอัตรา หรือแก้ด้วยจุดอ้างอิงสองจุด',
  feat='การเลื่อนจะขยับทุกบรรทัดโดยไม่เปลี่ยนระยะเวลาที่แสดง การปรับสัดส่วนคูณทั้งเวลาเริ่มและจบ จึงเปลี่ยนความยาวด้วย - เหมาะระหว่าง 24 กับ 25 fps การแก้สองจุดจัดการไฟล์ที่ทั้งเพี้ยนและความเร็วไม่ตรง เวลาที่ติดลบจะถูกตั้งเป็น 0 และแจ้งจำนวนบรรทัดที่ได้รับผล',
  who='คนที่ซับไตเติลเพี้ยนหลังเปลี่ยนแหล่งที่มา เร็วหรือช้าไปนิด หรือได้มาจากคนที่ทำงานที่เฟรมเรตต่างกัน',
  siteName='AI-SRTSub', jsonldName='AI-SRTSub', jsonldAlt='Subtitle Timeline Shift'),
 'vi': dict(
  title='Chỉnh thời gian phụ đề - dời, đổi tỷ lệ hoặc sửa hai điểm | AI-SRTSub',
  desc='Công cụ online miễn phí: dời tất cả cùng lúc, đổi tỷ lệ theo hệ số, hoặc sửa bằng hai điểm. Hỗ trợ SRT, VTT, ASS, SBV, LRC và TXT. Chạy trong trình duyệt của bạn - tệp không bao giờ được tải lên.',
  kw='chinh thoi gian phu de,dời phụ đề srt,đồng bộ phụ đề,sửa phụ đề trễ,đổi tỷ lệ phụ đề,srt lệch thời gian',
  intro='Khi phụ đề không khớp hình, hãy dời toàn bộ trục thời gian, đổi tỷ lệ theo hệ số hoặc sửa bằng hai điểm.',
  feat='Dời chuyển từng dòng mà không đổi thời lượng hiển thị. Đổi tỷ lệ nhân cả thời điểm bắt đầu và kết thúc, nên thời lượng cũng đổi - hữu ích giữa 24 và 25 fps. Sửa hai điểm xử lý tệp vừa lệch vừa sai tốc độ. Thời gian âm được đưa về 0 và công cụ cho biết có bao nhiêu dòng bị ảnh hưởng.',
  who='Người có phụ đề bị lệch sau khi đổi nguồn, chạy nhanh hoặc chậm hơn một chút, hoặc nhận từ người làm ở tốc độ khung hình khác.',
  siteName='AI-SRTSub', jsonldName='AI-SRTSub', jsonldAlt='Subtitle Timeline Shift'),
 'ru': dict(
  title='Сдвиг времени субтитров - сдвинуть, масштабировать или исправить | AI-SRTSub',
  desc='Бесплатный онлайн-инструмент: сдвиньте всё сразу, измените масштаб коэффициентом или исправьте по двум точкам. Работает с SRT, VTT, ASS, SBV, LRC и TXT. Всё в вашем браузере - файл никогда не загружается.',
  kw='сдвиг субтитров,синхронизация субтитров,srt сдвиг времени,субтитры отстают,субтитры спешат,масштаб субтитров',
  intro='Когда субтитры не совпадают с видео, сдвиньте всю временную шкалу, измените её коэффициентом или исправьте по двум точкам.',
  feat='Сдвиг перемещает каждую строку, не меняя, сколько она остаётся на экране. Масштабирование умножает и начало, и конец, поэтому меняется и длительность - удобно между 24 и 25 кадр/с. Коррекция по двум точкам подходит для файлов с одновременным сдвигом и неверной скоростью. Отрицательное время обнуляется, и показывается, сколько строк затронуто.',
  who='Те, у кого субтитры поехали после смены источника, идут чуть быстрее или медленнее, или сделаны при другой частоте кадров.',
  siteName='AI-SRTSub', jsonldName='AI-SRTSub', jsonldAlt='Subtitle Timeline Shift'),
 'it': dict(
  title='Regolazione dei tempi dei sottotitoli - sposta, riscala o correggi | AI-SRTSub',
  desc='Strumento online gratuito: sposta tutto insieme, riscala con un fattore o correggi con due punti. Funziona con SRT, VTT, ASS, SBV, LRC e TXT. Gira nel tuo browser: il file non viene mai caricato.',
  kw='regolare tempi sottotitoli,spostare sottotitoli srt,sincronizzare sottotitoli,correggere ritardo sottotitoli,riscalare sottotitoli,srt tempo sfalsato',
  intro='Quando i sottotitoli non sono sincronizzati, sposta tutta la linea temporale, riscala con un fattore o correggi con due punti.',
  feat='Lo spostamento muove ogni riga senza cambiare per quanto resta sullo schermo. Il riscalamento moltiplica inizio e fine, quindi cambia anche la durata: utile tra 24 e 25 fps. La correzione a due punti gestisce i file con sia sfalsamento sia velocità errata. I tempi negativi vengono portati a zero, con l\'indicazione di quante righe sono interessate.',
  who='Chi ha sottotitoli che slittano dopo un cambio di fonte, scorrono un po\' veloci o lenti, o arrivano da chi ha lavorato a un frame rate diverso.',
  siteName='AI-SRTSub', jsonldName='AI-SRTSub', jsonldAlt='Subtitle Timeline Shift'),
 'ar': dict(
  title='ضبط توقيت الترجمة - إزاحة أو تغيير المقياس أو تصحيح بنقطتين | AI-SRTSub',
  desc='أداة مجانية عبر الإنترنت: انقل كل شيء دفعة واحدة، غيّر المقياس بمعامل، أو صحّح بنقطتين. تعمل مع SRT و VTT و ASS و SBV و LRC و TXT. تعمل داخل متصفحك - لا يتم رفع الملف أبداً.',
  kw='ضبط توقيت الترجمة,إزاحة الترجمة,مزامنة الترجمة,تصحيح تأخير الترجمة,تغيير مقياس الترجمة,srt إزاحة الوقت',
  intro='عندما لا تتطابق الترجمة مع الصورة، انقل الخط الزمني كله، أو غيّر مقياسه بمعامل، أو صحّحه بنقطتين.',
  feat='الإزاحة تنقل كل سطر دون تغيير مدة ظهوره. تغيير المقياس يضرب البداية والنهاية معاً فتتغير المدة أيضاً - مفيد بين 24 و25 إطاراً في الثانية. التصحيح بنقطتين يتعامل مع الملفات التي فيها إزاحة وسرعة خاطئة معاً. الأوقات السالبة تُصفَّر، ويُذكر عدد الأسطر المتأثرة.',
  who='من تزحف ترجمته بعد تغيير المصدر، أو تسير أسرع أو أبطأ قليلاً، أو وصلته ممن عمل بمعدل إطارات مختلف.',
  siteName='AI-SRTSub', jsonldName='AI-SRTSub', jsonldAlt='Subtitle Timeline Shift'),
 'tr': dict(
  title='Altyazı zaman ayarı - kaydır, ölçekle veya iki noktayla düzelt | AI-SRTSub',
  desc='Ücretsiz çevrimiçi araç: hepsini birlikte kaydırın, bir katsayıyla ölçekleyin veya iki noktayla düzeltin. SRT, VTT, ASS, SBV, LRC ve TXT ile çalışır. Tarayıcınızda çalışır - dosya asla yüklenmez.',
  kw='altyazı zaman ayarı,altyazı kaydırma,altyazı senkron,srt zaman düzeltme,altyazı gecikme,altyazı ölçekleme',
  intro='Altyazılar görüntüyle uymadığında tüm zaman çizgisini kaydırın, bir katsayıyla ölçekleyin veya iki noktayla düzeltin.',
  feat='Kaydırma her satırı ekranda kalma süresini değiştirmeden taşır. Ölçekleme başlangıcı ve bitişi birlikte çarpar, bu yüzden süre de değişir - 24 ile 25 fps arasında kullanışlı. İki noktayla düzeltme, hem kaymış hem de hızı yanlış dosyaları ele alır. Negatif çıkan süreler 0 yapılır ve kaç satırın etkilendiği belirtilir.',
  who='Kaynak değişince altyazısı kayan, biraz hızlı ya da yavaş akan, ya da farklı kare hızında çalışan birinden gelen altyazıyı kullananlar.',
  siteName='AI-SRTSub', jsonldName='AI-SRTSub', jsonldAlt='Subtitle Timeline Shift'),
 'nl': dict(
  title='Ondertiteltijden bijstellen - verschuiven, schalen of corrigeren | AI-SRTSub',
  desc='Gratis online tool: verschuif alles tegelijk, schaal met een factor of corrigeer met twee punten. Werkt met SRT, VTT, ASS, SBV, LRC en TXT. Draait in je browser - het bestand wordt nooit geüpload.',
  kw='ondertitels timen,ondertitel verschuiven,srt tijd corrigeren,ondertitels synchroniseren,ondertitels schalen,srt tijdverschil',
  intro='Als de ondertitels niet synchroon lopen: verschuif de hele tijdlijn, schaal met een factor of corrigeer met twee punten.',
  feat='Verschuiven verplaatst elke regel zonder de weergaveduur te wijzigen. Schalen vermenigvuldigt begin en eind, dus de duur verandert mee - handig tussen 24 en 25 fps. De correctie met twee punten is voor bestanden die zowel verschoven zijn als een verkeerde snelheid hebben. Negatieve tijden worden op 0 gezet, met het aantal getroffen regels.',
  who='Wie ondertitels ziet verschuiven na een andere bron, die iets te snel of te langzaam lopen, of van iemand met een andere framesnelheid komen.',
  siteName='AI-SRTSub', jsonldName='AI-SRTSub', jsonldAlt='Subtitle Timeline Shift'),
 'pl': dict(
  title='Korekta czasu napisów - przesuń, przeskaluj lub popraw dwoma punktami | AI-SRTSub',
  desc='Darmowe narzędzie online: przesuń wszystko naraz, przeskaluj współczynnikiem albo popraw dwoma punktami. Działa z SRT, VTT, ASS, SBV, LRC i TXT. Wszystko w twojej przeglądarce - plik nigdy nie jest wysyłany.',
  kw='korekta czasu napisów,przesuwanie napisów,srt czas poprawka,synchronizacja napisów,skalowanie napisów,napisy opóźnione',
  intro='Gdy napisy nie pasują do obrazu, przesuń całą oś czasu, przeskaluj współczynnikiem lub popraw dwoma punktami.',
  feat='Przesuwanie przesuwa każdą linię bez zmiany czasu jej wyświetlania. Skalowanie mnoży początek i koniec, więc zmienia się też czas trwania - przydatne między 24 a 25 kl./s. Poprawka dwupunktowa radzi sobie z plikami, które są jednocześnie przesunięte i mają złe tempo. Czasy ujemne są zerowane, z informacją ile linii to dotyczy.',
  who='Osoby, którym napisy rozjechały się po zmianie źródła, idą nieco za szybko lub za wolno, albo powstały przy innej liczbie klatek.',
  siteName='AI-SRTSub', jsonldName='AI-SRTSub', jsonldAlt='Subtitle Timeline Shift'),
 'sv': dict(
  title='Justera undertextens tidslinje - flytta, skala eller korrigera | AI-SRTSub',
  desc='Gratis onlineverktyg: flytta allt på en gång, skala med en faktor eller korrigera med två punkter. Fungerar med SRT, VTT, ASS, SBV, LRC och TXT. Körs i din webbläsare - filen laddas aldrig upp.',
  kw='justera undertextens tid,flytta undertext,srt tidsjustering,synkronisera undertext,skala undertext,undertext fördröjning',
  intro='När undertexten inte stämmer med bilden: flytta hela tidslinjen, skala med en faktor eller korrigera med två punkter.',
  feat='Att flytta ändrar varje rad utan att ändra hur länge den visas. Skalning multiplicerar både start och slut, så längden ändras också - praktiskt mellan 24 och 25 fps. Tvåpunktskorrigeringen hanterar filer som både är förskjutna och har fel hastighet. Negativa tider sätts till 0 och det framgår hur många rader som påverkades.',
  who='Den som får undertexten ur fas efter ett källbyte, där den går lite för fort eller för långsamt, eller som kommer från någon med en annan bildfrekvens.',
  siteName='AI-SRTSub', jsonldName='AI-SRTSub', jsonldAlt='Subtitle Timeline Shift'),
 'cs': dict(
  title='Úprava časové osy titulků - posunout, škálovat nebo opravit dvěma body | AI-SRTSub',
  desc='Zdarma online nástroj: posuňte vše najednou, přeškálujte koeficientem nebo opravte dvěma body. Funguje se SRT, VTT, ASS, SBV, LRC a TXT. Běží v prohlížeči - soubor se nikdy nenahrává.',
  kw='úprava času titulků,posunout titulky,srt oprava času,synchronizace titulků,škálování titulků,titulky zpoždění',
  intro='Když titulky nesedí s obrazem, posuňte celou časovou osu, přeškálujte koeficientem nebo opravte dvěma body.',
  feat='Posun přesune každý řádek, aniž by změnil dobu jeho zobrazení. Škálování násobí začátek i konec, takže se změní i délka - hodí se mezi 24 a 25 fps. Oprava dvěma body zvládne soubory, které jsou zároveň posunuté a běží jinou rychlostí. Záporné časy se nastaví na 0 a nástroj oznámí, kolika řádků se to týká.',
  who='Komu se titulky rozjedou po změně zdroje, běží o něco rychleji nebo pomaleji, nebo pocházejí od někoho s jinou snímkovou frekvencí.',
  siteName='AI-SRTSub', jsonldName='AI-SRTSub', jsonldAlt='Subtitle Timeline Shift'),
 'uk': dict(
  title='Зсув часу субтитрів - зсунути, масштабувати або виправити двома точками | AI-SRTSub',
  desc='Безкоштовний онлайн-інструмент: зсуньте все разом, масштабуйте коефіцієнтом або виправте за двома точками. Працює з SRT, VTT, ASS, SBV, LRC і TXT. Усе у вашому браузері - файл ніколи не завантажується.',
  kw='зсув субтитрів,синхронізація субтитрів,srt зсув часу,субтитри відстають,субтитри поспішають,масштаб субтитрів',
  intro='Коли субтитри не збігаються з відео, зсуньте всю часову шкалу, масштабуйте коефіцієнтом або виправте за двома точками.',
  feat='Зсув переміщує кожен рядок, не змінюючи тривалість його показу. Масштабування множить і початок, і кінець, тому змінюється й тривалість - зручно між 24 і 25 кадр/с. Виправлення за двома точками підходить для файлів з одночасним зсувом і неправильною швидкістю. Від\'ємний час обнуляється й показується, скільки рядків зачеплено.',
  who='Тим, у кого субтитри поїхали після зміни джерела, йдуть трохи швидше або повільніше, або зроблені при іншій частоті кадрів.',
  siteName='AI-SRTSub', jsonldName='AI-SRTSub', jsonldAlt='Subtitle Timeline Shift'),
 'da': dict(
  title='Justering af underteksternes tidslinje - flyt, skaler eller ret | AI-SRTSub',
  desc='Gratis online værktøj: flyt det hele på én gang, skaler med en faktor, eller ret det med to punkter. Virker med SRT, VTT, ASS, SBV, LRC og TXT. Kører i din browser - filen uploades aldrig.',
  kw='justere undertekster,flytte undertekster,srt tidsjustering,synkronisere undertekster,skalere undertekster,undertekster forskudt',
  intro='Når underteksterne ikke passer til billedet: flyt hele tidslinjen, skaler med en faktor, eller ret den med to punkter.',
  feat='Flytning rykker hver linje uden at ændre, hvor længe den vises. Skalering ganger både start og slut, så længden også ændres - nyttigt mellem 24 og 25 fps. Retning med to punkter klarer filer, der både er forskudt og har forkert hastighed. Negative tider sættes til 0, og det oplyses hvor mange linjer der er berørt.',
  who='Alle hvis undertekster rykker sig efter et kildeskift, går lidt for hurtigt eller langsomt, eller kommer fra en med en anden billedfrekvens.',
  siteName='AI-SRTSub', jsonldName='AI-SRTSub', jsonldAlt='Subtitle Timeline Shift'),
 'fi': dict(
  title='Tekstityksen aikajanan säätö - siirrä, skaalaa tai korjaa kahdella pisteellä | AI-SRTSub',
  desc='Ilmainen verkkotyökalu: siirrä kaikki kerralla, skaalaa kertoimella tai korjaa kahdella pisteellä. Toimii SRT-, VTT-, ASS-, SBV-, LRC- ja TXT-tiedostoille. Kaikki tapahtuu selaimessa - tiedostoa ei koskaan ladata palvelimelle.',
  kw='tekstityksen ajan säätö,tekstityksen siirto,srt ajan korjaus,tekstityksen synkronointi,tekstityksen skaalaus,tekstitys jäljessä',
  intro='Kun tekstitys ei täsmää kuvaan, siirrä koko aikajanaa, skaalaa kertoimella tai korjaa kahdella pisteellä.',
  feat='Siirtäminen siirtää jokaisen rivin muuttamatta sen näyttöaikaa. Skaalaus kertoo sekä alun että lopun, joten myös kesto muuttuu - kätevä 24 ja 25 fps välillä. Kahden pisteen korjaus hoitaa tiedostot, joissa on sekä siirtymä että väärä nopeus. Negatiiviset ajat asetetaan nollaan ja kerrotaan, kuinka monta riviä muutettiin.',
  who='Kaikille, joiden tekstitys on siirtynyt lähteen vaihtuessa, kulkee hieman liian nopeasti tai hitaasti, tai on peräisin eri kuvataajuudella työskennelleeltä.',
  siteName='AI-SRTSub', jsonldName='AI-SRTSub', jsonldAlt='Subtitle Timeline Shift'),
 'el': dict(
  title='Ρύθμιση χρονικής γραμμής υποτίτλων - μετακίνηση, κλιμάκωση ή διόρθωση | AI-SRTSub',
  desc='Δωρεάν εργαλείο στο διαδίκτυο: μετακινήστε τα όλα μαζί, κλιμακώστε με συντελεστή ή διορθώστε με δύο σημεία. Λειτουργεί με SRT, VTT, ASS, SBV, LRC και TXT. Τρέχει στον περιηγητή σας - το αρχείο δεν ανεβαίνει ποτέ.',
  kw='ρύθμιση χρόνου υποτίτλων,μετακίνηση υποτίτλων,srt διόρθωση χρόνου,συγχρονισμός υποτίτλων,κλιμάκωση υποτίτλων,υπότιτλοι καθυστέρηση',
  intro='Όταν οι υπότιτλοι δεν ταιριάζουν με την εικόνα, μετακινήστε όλη τη χρονική γραμμή, κλιμακώστε με συντελεστή ή διορθώστε με δύο σημεία.',
  feat='Η μετακίνηση μεταφέρει κάθε γραμμή χωρίς να αλλάζει πόσο μένει στην οθόνη. Η κλιμάκωση πολλαπλασιάζει αρχή και τέλος, οπότε αλλάζει και η διάρκεια - χρήσιμο μεταξύ 24 και 25 fps. Η διόρθωση με δύο σημεία χειρίζεται αρχεία με μετατόπιση και λάθος ταχύτητα. Οι αρνητικοί χρόνοι μηδενίζονται και εμφανίζεται πόσες γραμμές επηρεάστηκαν.',
  who='Όσοι βλέπουν τους υπότιτλους να μετατοπίζονται μετά από αλλαγή πηγής, να τρέχουν λίγο γρήγορα ή αργά, ή προέρχονται από άλλον ρυθμό καρέ.',
  siteName='AI-SRTSub', jsonldName='AI-SRTSub', jsonldAlt='Subtitle Timeline Shift'),
 'he': dict(
  title='הזזת ציר הזמן של הכתוביות - הזזה, שינוי קנה מידה או תיקון בשתי נקודות | AI-SRTSub',
  desc='כלי חינמי ברשת: הזיזו הכול יחד, שנו קנה מידה לפי מקדם, או תקנו בעזרת שתי נקודות. עובד עם SRT, VTT, ASS, SBV, LRC ו־TXT. הכול מתבצע בדפדפן - הקובץ לא מועלה לעולם.',
  kw='הזזת כתוביות,סנכרון כתוביות,srt תיקון זמן,כתוביות מאחרות,שינוי קנה מידה כתוביות,כתוביות פיגור',
  intro='כשהכתוביות לא תואמות לתמונה, הזיזו את כל ציר הזמן, שנו קנה מידה לפי מקדם או תקנו בעזרת שתי נקודות.',
  feat='ההזזה מזיזה כל שורה בלי לשנות את משך ההצגה שלה. שינוי קנה המידה מכפיל גם התחלה וגם סוף, ולכן גם המשך משתנה - שימושי בין 24 ל־25 fps. התיקון בשתי נקודות מטפל בקבצים שיש בהם גם הזזה וגם מהירות שגויה. זמנים שליליים מאופסים ל־0 ומצוין כמה שורות הושפעו.',
  who='מי שהכתוביות שלו זזות אחרי החלפת מקור, רצות מעט מהר או לאט מדי, או שהגיעו ממישהו שעבד בקצב פריימים אחר.',
  siteName='AI-SRTSub', jsonldName='AI-SRTSub', jsonldAlt='Subtitle Timeline Shift'),
 'ro': dict(
  title='Reglajul liniei de timp a subtitrărilor - mută, scalează sau corectează | AI-SRTSub',
  desc='Instrument online gratuit: mută totul deodată, scalează cu un factor sau corectează cu două puncte. Funcționează cu SRT, VTT, ASS, SBV, LRC și TXT. Rulează în browserul tău - fișierul nu este încărcat niciodată.',
  kw='reglaj timp subtitrări,mutare subtitrări,srt corecție timp,sincronizare subtitrări,scalare subtitrări,subtitrări decalate',
  intro='Când subtitrările nu se potrivesc cu imaginea, mută toată linia de timp, scalează cu un factor sau corectează cu două puncte.',
  feat='Mutarea deplasează fiecare linie fără să schimbe cât timp rămâne pe ecran. Scalarea înmulțește și începutul, și sfârșitul, deci se schimbă și durata - util între 24 și 25 fps. Corecția cu două puncte rezolvă fișierele care sunt și decalate, și cu viteză greșită. Timpii negativi sunt aduși la 0 și se arată câte linii au fost afectate.',
  who='Cei cărora li se decalează subtitrările după o schimbare de sursă, merg puțin prea repede sau prea încet, sau vin de la cineva care a lucrat la altă rată de cadre.',
  siteName='AI-SRTSub', jsonldName='AI-SRTSub', jsonldAlt='Subtitle Timeline Shift'),
}


def js(v):
    return "'" + v.replace("\\", "\\\\").replace("'", "\\'") + "'"


rows = []
for L in LANGS:
    d = T[L]
    rows.append("  '%s': {\n    title: %s,\n    desc: %s,\n    kw: %s,\n    intro: %s,\n    feat: %s,\n    who: %s,\n    siteName: %s, jsonldName: %s, jsonldAlt: %s\n  }" % (
        L, js(d['title']), js(d['desc']), js(d['kw']), js(d['intro']),
        js(d['feat']), js(d['who']), js(d['siteName']), js(d['jsonldName']), js(d['jsonldAlt'])))

block = ("/* v0.9.291：第七个页面 —— 字幕时间轴调整（/shift.html）\n"
         "   与双语剥离页同理：纯前端零 API 调用费，是优先抢的搜索词。 */\n"
         "const SEO_SHIFT = {\n" + ",\n".join(rows) + "\n};\n")

assert 'SEO_SHIFT' not in s, 'SEO_SHIFT 已经存在'
anchor = 'const SEO_PAGES = {'
assert s.count(anchor) == 1
s = s.replace(anchor, block + anchor)

# SHIFT_PATH
old = "const MERGE_PATH = {}, CLEAN_PATH = {}, TRANSLATE_PATH = {}, CONVERT_PATH = {}, BILINGUAL_PATH = {};"
assert s.count(old) == 1
s = s.replace(old, "const MERGE_PATH = {}, CLEAN_PATH = {}, TRANSLATE_PATH = {}, CONVERT_PATH = {}, BILINGUAL_PATH = {}, SHIFT_PATH = {};")
old2 = "  /* v0.9.289：双语字幕剥离页 */\n  BILINGUAL_PATH[l] = (l === 'zh-CN') ? '/bilingual.html' : '/' + l + '/bilingual.html';"
assert s.count(old2) == 1
s = s.replace(old2, old2 + "\n  /* v0.9.291：字幕时间轴调整页 */\n  SHIFT_PATH[l] = (l === 'zh-CN') ? '/shift.html' : '/' + l + '/shift.html';")

# SEO_PAGES
old3 = "  /* v0.9.289：第六个页面 —— 双语字幕剥离 */\n  bilingual: { file: 'bilingual.html', table: SEO_BILINGUAL, path: BILINGUAL_PATH, jsonldType: 'WebApplication' }\n};"
assert s.count(old3) == 1
s = s.replace(old3, "  /* v0.9.289：第六个页面 —— 双语字幕剥离 */\n  bilingual: { file: 'bilingual.html', table: SEO_BILINGUAL, path: BILINGUAL_PATH, jsonldType: 'WebApplication' },\n  /* v0.9.291：第七个页面 —— 字幕时间轴调整 */\n  shift: { file: 'shift.html', table: SEO_SHIFT, path: SHIFT_PATH, jsonldType: 'WebApplication' }\n};")

# 路由正则
old4 = "/^\\/([a-zA-Z][a-zA-Z\\-]*)\\/(merge|clean|translate|convert|bilingual)\\.html$/"
assert s.count(old4) == 1, '语言目录路由正则没找到'
s = s.replace(old4, "/^\\/([a-zA-Z][a-zA-Z\\-]*)\\/(merge|clean|translate|convert|bilingual|shift)\\.html$/")
old5 = "p.match(/^\\/(merge|clean|translate|convert|bilingual)\\.html$/)"
assert s.count(old5) == 1, 'zh-CN 直连路由正则没找到'
s = s.replace(old5, "p.match(/^\\/(merge|clean|translate|convert|bilingual|shift)\\.html$/)")

# sitemap 注释
old6 = "/* sitemap：六页 × 27 语言 = 162 条 URL"
assert s.count(old6) == 1, 'sitemap 注释没找到'
s = s.replace(old6, "/* sitemap：七页 × 27 语言 = 189 条 URL")

io.open(F, 'w', encoding='utf-8').write(s)
print('server.js 已接入 shift 页；SEO_SHIFT 语言块数 =', len(rows))
