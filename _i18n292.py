# -*- coding: utf-8 -*-
"""v0.9.292：给 shift-i18n.js 每个语言块补上「合并 / 拆分 / 逐条微调」这批新键。
锚点 = 每个块最后一行的 footBrand，插在它后面（各块收尾形态统一，不必猜）。"""
import io, re

NEW = {
'zh-CN': dict(
 lblTools='合并与拆分', toolNone='不处理', toolGap='合并相邻的短间隙', toolDur='拆分过长的条目', toolChar='拆分字数过多的条目',
 phGap='毫秒', hintGap='两条之间空档小于这个值就并成一条', phDur='秒', hintDur='单条超过这个时长就按字数比例切成几条',
 phChar='字', hintChar='单条超过这个字数就切成几条',
 lblList='逐条微调', hintList='可以合并相邻两条、切分某一条，或者直接改它的起止时间',
 btnMergeNext='合并下一条', btnSplit='切分', btnUndo='撤销', btnMore='显示更多', statEdit='已手动调整 {0} 处',
 lblOutKeep='输出格式', outSame='与原文件一致（{0}）',
 msgMerged='合并了 {0} 条', msgSplit='拆出了 {0} 条', msgUndo='已撤销一步', msgNoEdit='没有可撤销的调整'),
'zh-TW': dict(
 lblTools='合併與拆分', toolNone='不處理', toolGap='合併相鄰的短間隙', toolDur='拆分過長的條目', toolChar='拆分字數過多的條目',
 phGap='毫秒', hintGap='兩條之間空檔小於這個值就併成一條', phDur='秒', hintDur='單條超過這個長度就按字數比例切成幾條',
 phChar='字', hintChar='單條超過這個字數就切成幾條',
 lblList='逐條微調', hintList='可以合併相鄰兩條、切分某一條，或者直接改它的起止時間',
 btnMergeNext='合併下一條', btnSplit='切分', btnUndo='復原', btnMore='顯示更多', statEdit='已手動調整 {0} 處',
 lblOutKeep='輸出格式', outSame='與原檔案一致（{0}）',
 msgMerged='合併了 {0} 條', msgSplit='拆出了 {0} 條', msgUndo='已復原一步', msgNoEdit='沒有可復原的調整'),
'en': dict(
 lblTools='Merge and split', toolNone='Do nothing', toolGap='Merge cues with short gaps',
 toolDur='Split cues that run too long', toolChar='Split cues with too many characters',
 phGap='milliseconds', hintGap='Cues closer together than this are joined into one',
 phDur='seconds', hintDur='Cues longer than this are split in proportion to their text',
 phChar='characters', hintChar='Cues with more characters than this are split',
 lblList='Adjust line by line', hintList='Join a cue with the next one, split one in two, or edit its start and end times',
 btnMergeNext='Join with next', btnSplit='Split', btnUndo='Undo', btnMore='Show more', statEdit='{0} manual edits',
 lblOutKeep='Output format', outSame='Same as the original ({0})',
 msgMerged='Merged {0} cues', msgSplit='Split into {0} cues', msgUndo='Undone', msgNoEdit='Nothing to undo'),
'ja': dict(
 lblTools='結合と分割', toolNone='何もしない', toolGap='間隔の短い行を結合', toolDur='長すぎる行を分割', toolChar='文字数が多すぎる行を分割',
 phGap='ミリ秒', hintGap='この値より間隔が狭い行はひとつにまとめます', phDur='秒', hintDur='この長さを超える行は文字数に応じて分割します',
 phChar='文字', hintChar='この文字数を超える行は分割します',
 lblList='行ごとに調整', hintList='次の行と結合、行の分割、開始と終了時刻の直接編集ができます',
 btnMergeNext='次の行と結合', btnSplit='分割', btnUndo='元に戻す', btnMore='さらに表示', statEdit='{0} 件を手動調整',
 lblOutKeep='出力形式', outSame='元ファイルと同じ（{0}）',
 msgMerged='{0} 行を結合しました', msgSplit='{0} 行に分割しました', msgUndo='元に戻しました', msgNoEdit='元に戻す調整はありません'),
'es': dict(
 lblTools='Unir y dividir', toolNone='No hacer nada', toolGap='Unir lineas con poco espacio entre ellas',
 toolDur='Dividir lineas demasiado largas', toolChar='Dividir lineas con demasiados caracteres',
 phGap='milisegundos', hintGap='Las lineas mas juntas que este valor se unen en una sola',
 phDur='segundos', hintDur='Las lineas mas largas que esto se dividen segun su texto',
 phChar='caracteres', hintChar='Las lineas con mas caracteres que esto se dividen',
 lblList='Ajustar linea por linea', hintList='Une una linea con la siguiente, dividela o edita sus horas de inicio y fin',
 btnMergeNext='Unir con la siguiente', btnSplit='Dividir', btnUndo='Deshacer', btnMore='Mostrar mas', statEdit='{0} ajustes manuales',
 lblOutKeep='Formato de salida', outSame='Igual que el original ({0})',
 msgMerged='Se unieron {0} lineas', msgSplit='Se dividio en {0} lineas', msgUndo='Deshecho', msgNoEdit='No hay nada que deshacer'),
'pt': dict(
 lblTools='Unir e dividir', toolNone='Nao fazer nada', toolGap='Unir linhas com intervalos curtos',
 toolDur='Dividir linhas longas demais', toolChar='Dividir linhas com caracteres demais',
 phGap='milissegundos', hintGap='Linhas mais proximas que este valor viram uma so',
 phDur='segundos', hintDur='Linhas mais longas que isso sao divididas conforme o texto',
 phChar='caracteres', hintChar='Linhas com mais caracteres que isso sao divididas',
 lblList='Ajustar linha por linha', hintList='Junte uma linha com a seguinte, divida-a ou edite seus horarios',
 btnMergeNext='Unir com a proxima', btnSplit='Dividir', btnUndo='Desfazer', btnMore='Mostrar mais', statEdit='{0} ajustes manuais',
 lblOutKeep='Formato de saida', outSame='Igual ao original ({0})',
 msgMerged='{0} linhas unidas', msgSplit='Dividido em {0} linhas', msgUndo='Desfeito', msgNoEdit='Nada a desfazer'),
'ko': dict(
 lblTools='병합과 분할', toolNone='처리하지 않음', toolGap='간격이 짧은 자막 병합', toolDur='너무 긴 자막 분할', toolChar='글자 수가 너무 많은 자막 분할',
 phGap='밀리초', hintGap='간격이 이 값보다 좁은 자막은 하나로 합칩니다', phDur='초', hintDur='이 길이를 넘는 자막은 글자 수에 맞춰 나눕니다',
 phChar='글자', hintChar='이 글자 수를 넘는 자막은 나눕니다',
 lblList='줄별로 조정', hintList='다음 줄과 합치기, 줄 나누기, 시작과 끝 시간 직접 수정이 가능합니다',
 btnMergeNext='다음 줄과 합치기', btnSplit='분할', btnUndo='되돌리기', btnMore='더 보기', statEdit='{0}곳 수동 조정',
 lblOutKeep='출력 형식', outSame='원본과 동일 ({0})',
 msgMerged='{0}개 줄을 합쳤습니다', msgSplit='{0}개 줄로 나눴습니다', msgUndo='되돌렸습니다', msgNoEdit='되돌릴 조정이 없습니다'),
'de': dict(
 lblTools='Zusammenfuhren und Teilen', toolNone='Nichts tun', toolGap='Zeilen mit kurzen Lucken zusammenfuhren',
 toolDur='Zu lange Zeilen teilen', toolChar='Zeilen mit zu vielen Zeichen teilen',
 phGap='Millisekunden', hintGap='Zeilen, die naher beieinander liegen, werden zu einer zusammengefasst',
 phDur='Sekunden', hintDur='Langere Zeilen werden passend zum Text aufgeteilt',
 phChar='Zeichen', hintChar='Zeilen mit mehr Zeichen als diesem Wert werden geteilt',
 lblList='Zeile fur Zeile anpassen', hintList='Zeile mit der nachsten verbinden, teilen oder Start- und Endzeit direkt andern',
 btnMergeNext='Mit nachster verbinden', btnSplit='Teilen', btnUndo='Ruckgangig', btnMore='Mehr anzeigen', statEdit='{0} manuelle Anderungen',
 lblOutKeep='Ausgabeformat', outSame='Wie die Originaldatei ({0})',
 msgMerged='{0} Zeilen zusammengefuhrt', msgSplit='In {0} Zeilen geteilt', msgUndo='Ruckgangig gemacht', msgNoEdit='Nichts zum Ruckgangigmachen'),
'fr': dict(
 lblTools='Fusionner et diviser', toolNone='Ne rien faire', toolGap='Fusionner les sous-titres tres rapproches',
 toolDur='Diviser les sous-titres trop longs', toolChar='Diviser les sous-titres trop longs en caracteres',
 phGap='millisecondes', hintGap='Les sous-titres plus rapproches que cette valeur sont reunis en un seul',
 phDur='secondes', hintDur='Les sous-titres plus longs sont divises selon leur texte',
 phChar='caracteres', hintChar='Les sous-titres avec plus de caracteres que cette valeur sont divises',
 lblList='Ajuster ligne par ligne', hintList='Joindre une ligne a la suivante, la couper en deux, ou modifier ses heures de debut et de fin',
 btnMergeNext='Joindre a la suivante', btnSplit='Diviser', btnUndo='Annuler', btnMore='Afficher plus', statEdit='{0} ajustements manuels',
 lblOutKeep='Format de sortie', outSame="Identique a l'original ({0})",
 msgMerged='{0} sous-titres fusionnes', msgSplit='Divise en {0} sous-titres', msgUndo='Annule', msgNoEdit='Rien a annuler'),
'id': dict(
 lblTools='Gabung dan pisah', toolNone='Tidak diproses', toolGap='Gabung baris dengan jeda pendek',
 toolDur='Pisah baris yang terlalu panjang', toolChar='Pisah baris dengan terlalu banyak karakter',
 phGap='milidetik', hintGap='Baris yang jaraknya lebih dekat dari nilai ini digabung jadi satu',
 phDur='detik', hintDur='Baris yang lebih panjang dari ini dipisah sesuai teksnya',
 phChar='karakter', hintChar='Baris dengan karakter lebih banyak dari ini dipisah',
 lblList='Sesuaikan per baris', hintList='Gabung dengan baris berikutnya, pisah satu baris, atau ubah waktu mulai dan selesainya',
 btnMergeNext='Gabung dgn berikutnya', btnSplit='Pisah', btnUndo='Urungkan', btnMore='Tampilkan lagi', statEdit='{0} penyesuaian manual',
 lblOutKeep='Format keluaran', outSame='Sama seperti aslinya ({0})',
 msgMerged='{0} baris digabung', msgSplit='Dipisah jadi {0} baris', msgUndo='Diurungkan', msgNoEdit='Tidak ada yang diurungkan'),
'hi': dict(
 lblTools='मिलाना और बाँटना', toolNone='कुछ नहीं करें', toolGap='पास-पास की पंक्तियाँ मिलाएँ',
 toolDur='बहुत लंबी पंक्तियों को बाँटें', toolChar='बहुत अधिक अक्षरों वाली पंक्तियाँ बाँटें',
 phGap='मिलीसेकंड', hintGap='इससे कम दूरी वाली पंक्तियाँ एक हो जाएँगी', phDur='सेकंड', hintDur='इससे लंबी पंक्तियाँ उनके शब्दों के अनुसार बाँटी जाएँगी',
 phChar='अक्षर', hintChar='इससे अधिक अक्षरों वाली पंक्तियाँ बाँटी जाएँगी',
 lblList='हर पंक्ति अलग से ठीक करें', hintList='अगली पंक्ति से मिलाएँ, पंक्ति बाँटें, या शुरू और खत्म का समय बदलें',
 btnMergeNext='अगली से मिलाएँ', btnSplit='बाँटें', btnUndo='पूर्ववत', btnMore='और दिखाएँ', statEdit='{0} हाथ से बदले',
 lblOutKeep='आउटपुट फ़ॉर्मैट', outSame='मूल फ़ाइल जैसा ({0})',
 msgMerged='{0} पंक्तियाँ मिलाईं', msgSplit='{0} पंक्तियों में बाँटा', msgUndo='पूर्ववत कर दिया', msgNoEdit='पूर्ववत करने के लिए कुछ नहीं'),
'th': dict(
 lblTools='รวมและแบ่ง', toolNone='ไม่ทำอะไร', toolGap='รวมบรรทัดที่มีช่องว่างสั้น',
 toolDur='แบ่งบรรทัดที่ยาวเกินไป', toolChar='แบ่งบรรทัดที่มีตัวอักษรมากเกินไป',
 phGap='มิลลิวินาที', hintGap='บรรทัดที่ห่างกันน้อยกว่านี้จะถูกรวมเป็นหนึ่งเดียว', phDur='วินาที', hintDur='บรรทัดที่ยาวกว่านี้จะถูกแบ่งตามสัดส่วนข้อความ',
 phChar='ตัวอักษร', hintChar='บรรทัดที่มีตัวอักษรมากกว่านี้จะถูกแบ่ง',
 lblList='ปรับทีละบรรทัด', hintList='รวมกับบรรทัดถัดไป แบ่งบรรทัด หรือแก้เวลาเริ่มและจบเอง',
 btnMergeNext='รวมกับถัดไป', btnSplit='แบ่ง', btnUndo='ย้อนกลับ', btnMore='แสดงเพิ่ม', statEdit='แก้เอง {0} จุด',
 lblOutKeep='รูปแบบไฟล์ออก', outSame='เหมือนไฟล์ต้นฉบับ ({0})',
 msgMerged='รวม {0} บรรทัด', msgSplit='แบ่งเป็น {0} บรรทัด', msgUndo='ย้อนกลับแล้ว', msgNoEdit='ไม่มีอะไรให้ย้อนกลับ'),
'vi': dict(
 lblTools='Gộp và tách', toolNone='Không xử lý', toolGap='Gộp dòng có khoảng nghỉ ngắn',
 toolDur='Tách dòng quá dài', toolChar='Tách dòng có quá nhiều ký tự',
 phGap='mili-giây', hintGap='Hai dòng gần nhau hơn giá trị này sẽ gộp thành một', phDur='giây', hintDur='Dòng dài hơn giá trị này sẽ được tách theo độ dài chữ',
 phChar='ký tự', hintChar='Dòng có nhiều ký tự hơn giá trị này sẽ được tách',
 lblList='Chỉnh từng dòng', hintList='Gộp với dòng kế, tách một dòng, hoặc sửa trực tiếp thời gian bắt đầu và kết thúc',
 btnMergeNext='Gộp với dòng kế', btnSplit='Tách', btnUndo='Hoàn tác', btnMore='Xem thêm', statEdit='{0} chỗ chỉnh tay',
 lblOutKeep='Định dạng đầu ra', outSame='Giống file gốc ({0})',
 msgMerged='Đã gộp {0} dòng', msgSplit='Đã tách thành {0} dòng', msgUndo='Đã hoàn tác', msgNoEdit='Không có gì để hoàn tác'),
'ru': dict(
 lblTools='Объединение и разбиение', toolNone='Ничего не делать', toolGap='Объединить строки с короткой паузой',
 toolDur='Разбить слишком длинные строки', toolChar='Разбить строки с большим числом символов',
 phGap='миллисекунды', hintGap='Строки, между которыми пауза меньше этого значения, объединяются в одну',
 phDur='секунды', hintDur='Строки длиннее этого значения делятся пропорционально тексту',
 phChar='символов', hintChar='Строки с числом символов больше этого делятся на части',
 lblList='Править построчно', hintList='Объединить со следующей, разбить одну или изменить время начала и конца',
 btnMergeNext='Объединить со след.', btnSplit='Разбить', btnUndo='Отменить', btnMore='Показать ещё', statEdit='{0} правок вручную',
 lblOutKeep='Формат вывода', outSame='Как у исходного файла ({0})',
 msgMerged='Объединено строк: {0}', msgSplit='Разбито на строк: {0}', msgUndo='Отменено', msgNoEdit='Отменять нечего'),
'it': dict(
 lblTools='Unisci e dividi', toolNone='Non fare nulla', toolGap='Unisci le righe con pause brevi',
 toolDur='Dividi le righe troppo lunghe', toolChar='Dividi le righe con troppi caratteri',
 phGap='millisecondi', hintGap='Le righe piu vicine di questo valore vengono unite in una sola',
 phDur='secondi', hintDur='Le righe piu lunghe vengono divise in base al testo',
 phChar='caratteri', hintChar='Le righe con piu caratteri di questo valore vengono divise',
 lblList='Regola riga per riga', hintList='Unisci con la successiva, dividi una riga o modifica direttamente inizio e fine',
 btnMergeNext='Unisci alla succ.', btnSplit='Dividi', btnUndo='Annulla', btnMore='Mostra altro', statEdit='{0} modifiche manuali',
 lblOutKeep='Formato di output', outSame="Uguale all'originale ({0})",
 msgMerged='Unite {0} righe', msgSplit='Diviso in {0} righe', msgUndo='Annullato', msgNoEdit='Nulla da annullare'),
'ar': dict(
 lblTools='الدمج والتقسيم', toolNone='بدون تغيير', toolGap='دمج الأسطر المتقاربة',
 toolDur='تقسيم الأسطر الطويلة جداً', toolChar='تقسيم الأسطر ذات الحروف الكثيرة',
 phGap='ميلي ثانية', hintGap='الأسطر التي تقل المسافة بينها عن هذه القيمة تُدمج في سطر واحد',
 phDur='ثانية', hintDur='الأسطر الأطول من هذه المدة تُقسَّم بما يناسب نصها',
 phChar='حرفاً', hintChar='الأسطر التي تتجاوز هذا العدد من الحروف تُقسَّم',
 lblList='تعديل سطر بسطر', hintList='ادمج سطراً مع الذي يليه، أو قسّمه، أو غيّر وقت البداية والنهاية مباشرة',
 btnMergeNext='دمج مع التالي', btnSplit='تقسيم', btnUndo='تراجع', btnMore='عرض المزيد', statEdit='{0} تعديلات يدوية',
 lblOutKeep='صيغة الإخراج', outSame='نفس صيغة الملف الأصلي ({0})',
 msgMerged='تم دمج {0} سطراً', msgSplit='تم التقسيم إلى {0} سطراً', msgUndo='تم التراجع', msgNoEdit='لا يوجد شيء للتراجع عنه'),
'tr': dict(
 lblTools='Birleştir ve böl', toolNone='Bir şey yapma', toolGap='Kısa boşluklu satırları birleştir',
 toolDur='Çok uzun satırları böl', toolChar='Çok karakterli satırları böl',
 phGap='milisaniye', hintGap='Bu değerden kısa aralıkla gelen satırlar tek satırda birleşir',
 phDur='saniye', hintDur='Bu süreden uzun satırlar metnine göre bölünür',
 phChar='karakter', hintChar='Bu değerden fazla karakteri olan satırlar bölünür',
 lblList='Satır satır ayarla', hintList='Sonraki satırla birleştir, satırı böl veya başlangıç ve bitiş zamanını doğrudan değiştir',
 btnMergeNext='Sonrakini birleştir', btnSplit='Böl', btnUndo='Geri al', btnMore='Daha fazla göster', statEdit='{0} elle değişiklik',
 lblOutKeep='Çıktı biçimi', outSame='Orijinalle aynı ({0})',
 msgMerged='{0} satır birleştirildi', msgSplit='{0} satıra bölündü', msgUndo='Geri alındı', msgNoEdit='Geri alınacak değişiklik yok'),
'nl': dict(
 lblTools='Samenvoegen en splitsen', toolNone='Niets doen', toolGap='Regels met korte pauzes samenvoegen',
 toolDur='Te lange regels splitsen', toolChar='Regels met te veel tekens splitsen',
 phGap='milliseconden', hintGap='Regels die dichter bij elkaar liggen worden samengevoegd',
 phDur='seconden', hintDur='Langere regels worden naar verhouding van de tekst gesplitst',
 phChar='tekens', hintChar='Regels met meer tekens dan dit worden gesplitst',
 lblList='Per regel aanpassen', hintList='Voeg samen met de volgende, splits een regel of pas begin- en eindtijd aan',
 btnMergeNext='Samenvoegen met volg.', btnSplit='Splitsen', btnUndo='Ongedaan maken', btnMore='Meer weergeven', statEdit='{0} handmatige wijzigingen',
 lblOutKeep='Uitvoerformaat', outSame='Hetzelfde als het origineel ({0})',
 msgMerged='{0} regels samengevoegd', msgSplit='Gesplitst in {0} regels', msgUndo='Ongedaan gemaakt', msgNoEdit='Niets om ongedaan te maken'),
'pl': dict(
 lblTools='Łączenie i dzielenie', toolNone='Nic nie rób', toolGap='Połącz linie z krótką przerwą',
 toolDur='Podziel zbyt długie linie', toolChar='Podziel linie zbyt długie znakami',
 phGap='milisekundy', hintGap='Linie bliższe niż ta wartość zostaną połączone w jedną',
 phDur='sekundy', hintDur='Dłuższe linie zostaną podzielone proporcjonalnie do tekstu',
 phChar='znaki', hintChar='Linie z większą liczbą znaków zostaną podzielone',
 lblList='Dostosuj linia po linii', hintList='Połącz z następną, podziel lub zmień czas początku i końca',
 btnMergeNext='Połącz z następną', btnSplit='Podziel', btnUndo='Cofnij', btnMore='Pokaż więcej', statEdit='{0} ręcznych zmian',
 lblOutKeep='Format wyjściowy', outSame='Taki sam jak oryginał ({0})',
 msgMerged='Połączono {0} linii', msgSplit='Podzielono na {0} linii', msgUndo='Cofnięto', msgNoEdit='Nie ma czego cofać'),
'sv': dict(
 lblTools='Slå ihop och dela', toolNone='Gör inget', toolGap='Slå ihop rader med kort lucka',
 toolDur='Dela för långa rader', toolChar='Dela rader med för många tecken',
 phGap='millisekunder', hintGap='Rader som ligger närmare än detta slås ihop till en',
 phDur='sekunder', hintDur='Längre rader delas i förhållande till texten',
 phChar='tecken', hintChar='Rader med fler tecken än detta delas',
 lblList='Justera rad för rad', hintList='Slå ihop med nästa, dela en rad eller ändra start- och sluttid direkt',
 btnMergeNext='Slå ihop med nästa', btnSplit='Dela', btnUndo='Ångra', btnMore='Visa fler', statEdit='{0} manuella ändringar',
 lblOutKeep='Utdataformat', outSame='Samma som originalet ({0})',
 msgMerged='{0} rader slogs ihop', msgSplit='Delades i {0} rader', msgUndo='Ångrad', msgNoEdit='Inget att ångra'),
'cs': dict(
 lblTools='Spojování a dělení', toolNone='Nedělat nic', toolGap='Spojit řádky s krátkou mezerou',
 toolDur='Rozdělit příliš dlouhé řádky', toolChar='Rozdělit řádky s příliš mnoha znaky',
 phGap='milisekundy', hintGap='Řádky bližší než tato hodnota se spojí do jedné',
 phDur='sekundy', hintDur='Delší řádky se rozdělí podle délky textu',
 phChar='znaků', hintChar='Řádky s více znaky než tato hodnota se rozdělí',
 lblList='Upravit po řádcích', hintList='Spojte s dalším, rozdělte nebo upravte čas začátku a konce',
 btnMergeNext='Spojit s další', btnSplit='Rozdělit', btnUndo='Zpět', btnMore='Zobrazit další', statEdit='{0} ručních úprav',
 lblOutKeep='Výstupní formát', outSame='Stejný jako originál ({0})',
 msgMerged='Spojeno {0} řádků', msgSplit='Rozděleno na {0} řádků', msgUndo='Vráceno zpět', msgNoEdit='Není co vracet'),
'uk': dict(
 lblTools="Об'єднання і розбиття", toolNone='Нічого не робити', toolGap="Об'єднати рядки з короткою паузою",
 toolDur='Розбити занадто довгі рядки', toolChar='Розбити рядки з великою кількістю символів',
 phGap='мілісекунди', hintGap="Рядки з паузою менше цього значення об'єднуються в один",
 phDur='секунди', hintDur='Довші рядки розбиваються пропорційно до тексту',
 phChar='символів', hintChar='Рядки з більшою кількістю символів розбиваються на частини',
 lblList='Правити порядково', hintList="Об'єднати з наступним, розбити один або змінити час початку і кінця",
 btnMergeNext="Об'єднати з наст.", btnSplit='Розбити', btnUndo='Скасувати', btnMore='Показати ще', statEdit='{0} ручних правок',
 lblOutKeep='Формат виводу', outSame='Як у вихідного файлу ({0})',
 msgMerged="Об'єднано рядків: {0}", msgSplit='Розбито на рядків: {0}', msgUndo='Скасовано', msgNoEdit='Нічого скасовувати'),
'da': dict(
 lblTools='Flet og del', toolNone='Gør ingenting', toolGap='Flet linjer med kort pause',
 toolDur='Del for lange linjer', toolChar='Del linjer med for mange tegn',
 phGap='millisekunder', hintGap='Linjer tættere på end denne værdi flettes til én',
 phDur='sekunder', hintDur='Længere linjer deles i forhold til teksten',
 phChar='tegn', hintChar='Linjer med flere tegn end dette deles',
 lblList='Juster linje for linje', hintList='Flet med den næste, del en linje, eller ret start- og sluttidspunkt',
 btnMergeNext='Flet med næste', btnSplit='Del', btnUndo='Fortryd', btnMore='Vis flere', statEdit='{0} manuelle rettelser',
 lblOutKeep='Outputformat', outSame='Samme som originalen ({0})',
 msgMerged='{0} linjer flettet', msgSplit='Delt i {0} linjer', msgUndo='Fortrudt', msgNoEdit='Intet at fortryde'),
'fi': dict(
 lblTools='Yhdistä ja jaa', toolNone='Älä tee mitään', toolGap='Yhdistä rivit, joiden väli on lyhyt',
 toolDur='Jaa liian pitkät rivit', toolChar='Jaa rivit, joissa on liikaa merkkejä',
 phGap='millisekuntia', hintGap='Rivit, joiden väli on tätä pienempi, yhdistetään yhdeksi',
 phDur='sekuntia', hintDur='Tätä pidemmät rivit jaetaan tekstin mukaan',
 phChar='merkkiä', hintChar='Rivit, joissa on enemmän merkkejä kuin tämä, jaetaan',
 lblList='Säädä rivi kerrallaan', hintList='Yhdistä seuraavaan, jaa rivi tai muuta alku- ja loppuaikaa suoraan',
 btnMergeNext='Yhdistä seuraavaan', btnSplit='Jaa', btnUndo='Kumoa', btnMore='Näytä lisää', statEdit='{0} käsin tehtyä muutosta',
 lblOutKeep='Tulostusmuoto', outSame='Sama kuin alkuperäisessä ({0})',
 msgMerged='{0} riviä yhdistetty', msgSplit='Jaettu {0} riviin', msgUndo='Kumottu', msgNoEdit='Ei kumottavaa'),
'el': dict(
 lblTools='Συγχώνευση και διαχωρισμός', toolNone='Καμία ενέργεια', toolGap='Συγχώνευση γραμμών με μικρό κενό',
 toolDur='Διαχωρισμός πολύ μεγάλων γραμμών', toolChar='Διαχωρισμός γραμμών με πολλούς χαρακτήρες',
 phGap='χιλιοστά δευτ.', hintGap='Γραμμές με μικρότερο κενό από αυτό γίνονται μία',
 phDur='δευτ.', hintDur='Οι μεγαλύτερες γραμμές χωρίζονται ανάλογα με το κείμενο',
 phChar='χαρακτήρες', hintChar='Γραμμές με περισσότερους χαρακτήρες από αυτό χωρίζονται',
 lblList='Ρύθμιση γραμμή προς γραμμή', hintList='Ενώστε με την επόμενη, χωρίστε μία ή αλλάξτε την ώρα έναρξης και λήξης',
 btnMergeNext='Ένωση με επόμενη', btnSplit='Διαχωρισμός', btnUndo='Αναίρεση', btnMore='Εμφάνιση περισσότερων', statEdit='{0} χειροκίνητες αλλαγές',
 lblOutKeep='Μορφή εξόδου', outSame='Ίδια με το αρχικό ({0})',
 msgMerged='Συγχωνεύτηκαν {0} γραμμές', msgSplit='Διαχωρίστηκε σε {0} γραμμές', msgUndo='Αναιρέθηκε', msgNoEdit='Δεν υπάρχει κάτι για αναίρεση'),
'he': dict(
 lblTools='מיזוג ופיצול', toolNone='ללא שינוי', toolGap='מיזוג שורות עם רווח קצר',
 toolDur='פיצול שורות ארוכות מדי', toolChar='פיצול שורות עם יותר מדי תווים',
 phGap='מילישניות', hintGap='שורות שהמרווח ביניהן קטן מהערך הזה יאוחדו לאחת',
 phDur='שניות', hintDur='שורות ארוכות מהערך הזה יפוצלו לפי הטקסט',
 phChar='תווים', hintChar='שורות עם יותר תווים מהערך הזה יפוצלו',
 lblList='התאמה שורה אחר שורה', hintList='מזגו עם השורה הבאה, פצלו שורה, או שנו את זמני ההתחלה והסיום',
 btnMergeNext='מזג עם הבאה', btnSplit='פצל', btnUndo='ביטול', btnMore='הצג עוד', statEdit='{0} שינויים ידניים',
 lblOutKeep='פורמט הפלט', outSame='כמו בקובץ המקורי ({0})',
 msgMerged='מוזגו {0} שורות', msgSplit='פוצל ל-{0} שורות', msgUndo='בוטל', msgNoEdit='אין מה לבטל'),
'ro': dict(
 lblTools='Îmbinare și împărțire', toolNone='Nu face nimic', toolGap='Îmbina rândurile cu pauză scurtă',
 toolDur='Împarte rândurile prea lungi', toolChar='Împarte rândurile cu prea multe caractere',
 phGap='milisecunde', hintGap='Rândurile mai apropiate de această valoare devin unul singur',
 phDur='secunde', hintDur='Rândurile mai lungi sunt împărțite proporțional cu textul',
 phChar='caractere', hintChar='Rândurile cu mai multe caractere decât aceasta sunt împărțite',
 lblList='Ajustare rând cu rând', hintList='Îmbinați cu următorul, împărțiți un rând sau modificați ora de început și de sfârșit',
 btnMergeNext='Îmbina cu următorul', btnSplit='Împarte', btnUndo='Anulare', btnMore='Afișați mai multe', statEdit='{0} modificări manuale',
 lblOutKeep='Format de ieșire', outSame='La fel ca originalul ({0})',
 msgMerged='{0} rânduri îmbinate', msgSplit='Împărțit în {0} rânduri', msgUndo='Anulat', msgNoEdit='Nimic de anulat'),
}

ORDER = ['lblTools', 'toolNone', 'toolGap', 'toolDur', 'toolChar', 'phGap', 'hintGap',
         'phDur', 'hintDur', 'phChar', 'hintChar', 'lblList', 'hintList',
         'btnMergeNext', 'btnSplit', 'btnUndo', 'btnMore', 'statEdit',
         'lblOutKeep', 'outSame', 'msgMerged', 'msgSplit', 'msgUndo', 'msgNoEdit']

f = 'shift-i18n.js'
s = io.open(f, encoding='utf-8').read()
assert len(NEW) == 27, len(NEW)
hit = [0]


def esc(v):
    return str(v).replace('\\', '\\\\').replace("'", "\\'")


def repl(m):
    code = hit[0] and None  # placeholder, code comes from block scan below
    return m.group(0)


# 按块逐个替换：定位每个语言块的 footBrand 行
blocks = re.split(r"(^    '(?:[a-zA-Z-]+)': \{$)", s, flags=re.M)
out = []
i = 0
while i < len(blocks):
    out.append(blocks[i])
    if blocks[i].startswith("    '"):
        code = re.match(r"^    '([a-zA-Z-]+)': \{$", blocks[i]).group(1)
        body = blocks[i + 1]
        d = NEW[code]
        add = ",\n      " + ", ".join(k + ": '" + esc(d[k]) + "'" for k in ORDER)
        body2 = re.sub(r"(footBrand:\s*'(?:[^'\\]|\\.)*')", r"\1" + add, body, count=1)
        assert body2 != body, code
        out.append(body2)
        i += 2
        continue
    i += 1
s2 = ''.join(out)

# 头部注释里的版本号跟着走
s2 = s2.replace('（v0.9.291）', '（v0.9.292）')
io.open(f, 'w', encoding='utf-8').write(s2)
print('已写入；新增语言块数 =', len(NEW))
