# -*- coding: utf-8 -*-
"""v0.9.292：给 server.js 的 SEO_SHIFT 27 语块追加「合并 / 拆分」与「同格式进出」的文案。
只做追加，不动原有句子 —— 各语言的既有表述都是核对过的，重写风险比收益大。"""
import io, re

KW = {
'zh-CN': '字幕合并,字幕拆分,srt字幕合并,字幕太长拆分,双语字幕合并',
'zh-TW': '字幕合併,字幕拆分,srt字幕合併,字幕太長拆分,雙語字幕合併',
'en': 'merge subtitles,split subtitles,combine srt,split long subtitle',
'ja': '字幕結合,字幕分割,srt結合,長い字幕分割',
'es': 'unir subtítulos,dividir subtítulos,combinar srt,subtítulo largo dividir',
'pt': 'unir legendas,dividir legendas,combinar srt,legenda longa dividir',
'ko': '자막 병합,자막 분할,srt 병합,긴 자막 분할',
'de': 'Untertitel zusammenführen,Untertitel teilen,srt zusammenfügen,lange Untertitel teilen',
'fr': 'fusionner sous-titres,diviser sous-titres,combinaison srt,sous-titre long diviser',
'id': 'gabung subtitle,pisah subtitle,gabung srt,subtitle panjang dipisah',
'hi': 'सबटाइटल मिलाना,सबटाइटल बाँटना,srt मिलाना,लंबी सबटाइटल बाँटें',
'th': 'รวมซับไตเติล,แบ่งซับไตเติล,รวม srt,แบ่งซับไตเติลยาว',
'vi': 'gộp phụ đề,tách phụ đề,gộp srt,tách phụ đề dài',
'ru': 'объединить субтитры,разбить субтитры,склеить srt,длинные субтитры разбить',
'it': 'unire sottotitoli,dividere sottotitoli,unire srt,sottotitolo lungo dividere',
'ar': 'دمج الترجمة,تقسيم الترجمة,دمج srt,تقسيم الترجمة الطويلة',
'tr': 'altyazı birleştirme,altyazı bölme,srt birleştirme,uzun altyazı bölme',
'nl': 'ondertiteling samenvoegen,ondertiteling splitsen,srt samenvoegen,lange ondertitel splitsen',
'pl': 'łączenie napisów,dzielenie napisów,łączenie srt,długie napisy podzielić',
'sv': 'slå ihop undertexter,dela undertexter,slå ihop srt,lång undertext dela',
'cs': 'spojování titulků,dělení titulků,spojení srt,dlouhé titulky rozdělit',
'uk': "об'єднати субтитри,розбити субтитри,склеїти srt,довгі субтитри розбити",
'da': 'flet undertekster,del undertekster,flet srt,lang undertekst del',
'fi': 'yhdistä tekstitykset,jaa tekstitykset,yhdistä srt,pitkä tekstitys jaa',
'el': 'συγχώνευση υποτίτλων,διαχωρισμός υποτίτλων,ένωση srt,μακροσκελής υπότιτλος',
'he': 'מיזוג כתוביות,פיצול כתוביות,מיזוג srt,פיצול כתוביות ארוכות',
'ro': 'îmbinare subtitrări,împărțire subtitrări,îmbinare srt,subtitrare lungă împărți',
}
INTRO = {
'zh-CN': '还能合并碎片、拆分长句。',
'zh-TW': '還能合併碎片、拆分長句。',
'en': ' It can also merge lines that were split apart, and split ones that run too long.',
'ja': ' 細切れになった行をまとめたり、長すぎる行を分割したりもできます。',
'es': ' También une las líneas partidas y divide las demasiado largas.',
'pt': ' Também une as linhas partidas e divide as longas demais.',
'ko': ' 잘게 나뉜 줄을 합치고, 너무 긴 줄을 나눌 수도 있습니다.',
'de': ' Es führt auch zerschnittene Zeilen zusammen und teilt zu lange.',
'fr': ' Il peut aussi fusionner les lignes morcelées et diviser les trop longues.',
'id': ' Juga bisa menggabungkan baris yang terpecah dan memisahkan yang terlalu panjang.',
'hi': ' छोटी-छोटी पंक्तियों को मिलाया और बहुत लंबी पंक्तियों को बाँटा भी जा सकता है।',
'th': ' ยังรวมบรรทัดที่แตกเป็นชิ้นเล็กชิ้นน้อยและแบ่งบรรทัดที่ยาวเกินไปได้',
'vi': ' Cũng có thể gộp các dòng bị vụn và tách những dòng quá dài.',
'ru': ' А ещё объединяет раздробленные строки и разбивает слишком длинные.',
'it': ' Può anche unire le righe spezzate e dividere quelle troppo lunghe.',
'ar': ' كما يمكنه دمج الأسطر المجزأة وتقسيم الأسطر الطويلة جداً.',
'tr': ' Ayrıca parçalanmış satırları birleştirir, çok uzun olanları böler.',
'nl': ' Ook kunnen versnipperde regels worden samengevoegd en te lange gesplitst.',
'pl': ' Może też łączyć poszatkowane linie i dzielić zbyt długie.',
'sv': ' Den kan också slå ihop sönderdelade rader och dela för långa.',
'cs': ' Umí také spojit rozdělené řádky a rozdělit příliš dlouhé.',
'uk': " А ще об'єднує роздрібнені рядки та розбиває занадто довгі.",
'da': ' Den kan også flette opsplittede linjer og dele for lange.',
'fi': ' Se voi myös yhdistää pirstaleiset rivit ja jakaa liian pitkät.',
'el': ' Μπορεί επίσης να ενώνει κομματιασμένες γραμμές και να χωρίζει τις πολύ μεγάλες.',
'he': ' יכול גם לאחד שורות מפוצלות ולפצל שורות ארוכות מדי.',
'ro': ' Poate de asemenea îmbina rândurile fragmentate și împărți cele prea lungi.',
}
FEAT = {
'zh-CN': ' 进来什么格式就出去什么格式，不做格式转换；ASS 的样式表和每条的样式、特效标记都原样保留。双语字幕合并时保持原文一行、译文一行，拆分时整条跳过。',
'zh-TW': ' 進來什麼格式就出去什麼格式，不做格式轉換；ASS 的樣式表和每條的樣式、特效標記都原樣保留。雙語字幕合併時保持原文一行、譯文一行，拆分時整條跳過。',
'en': ' Same format in, same format out - no conversion, and ASS styles, per-line styling and effect tags are kept exactly as they were. Bilingual cues stay on two lines when merged and are skipped when splitting.',
'ja': ' 入れた形式のまま出力します。変換は行わず、ASS のスタイルや各行のスタイル、タグもそのまま残ります。二言語の字幕は結合しても二行のまま、分割時は対象から外れます。',
'es': ' Entra y sale en el mismo formato: no hay conversión y se conservan los estilos, el formato de cada línea y las etiquetas del ASS. Los subtítulos bilingües siguen en dos líneas al unirse y se omiten al dividir.',
'pt': ' Entra e sai no mesmo formato: não há conversão e os estilos, a formatação de cada linha e as tags do ASS são mantidos. As legendas bilíngues continuam em duas linhas ao unir e são ignoradas ao dividir.',
'ko': ' 들어온 형식 그대로 나갑니다. 변환하지 않으며 ASS 스타일과 각 줄의 서식, 태그가 그대로 유지됩니다. 이중 언어 자막은 합쳐도 두 줄을 유지하고 분할할 때는 건너뜁니다.',
'de': ' Gleiches Format rein, gleiches Format raus - es wird nichts konvertiert, und ASS-Stile, Zeilenformatierung und Effekt-Tags bleiben unverändert. Zweisprachige Zeilen bleiben beim Zusammenführen zweizeilig und werden beim Teilen übersprungen.',
'fr': ' Même format en entrée et en sortie : aucune conversion, et les styles ASS, la mise en forme de chaque ligne et les balises restent intactes. Les sous-titres bilingues gardent deux lignes à la fusion et sont ignorés à la division.',
'id': ' Format yang masuk sama dengan yang keluar, tanpa konversi; gaya ASS, format tiap baris, dan tag tetap dipertahankan. Subtitle dwibahasa tetap dua baris saat digabung dan dilewati saat dipisah.',
'hi': ' जैसा फ़ॉर्मैट अंदर जाता है, वैसा ही बाहर आता है — कोई रूपांतरण नहीं, और ASS की स्टाइल, हर पंक्ति की फ़ॉर्मैटिंग और टैग ज्यों के त्यों रहते हैं। द्विभाषी सबटाइटल मिलाने पर दो पंक्तियों में रहते हैं और बाँटते समय छोड़ दिए जाते हैं।',
'th': ' ฟอร์แมตที่เข้าและออกเหมือนกัน ไม่มีการแปลงรูปแบบ สไตล์ ASS การจัดรูปแบบของแต่ละบรรทัดและแท็กยังคงเดิม คำบรรยายสองภาษาเมื่อรวมจะอยู่สองบรรทัด และข้ามเมื่อแบ่ง',
'vi': ' Định dạng đầu ra giống đầu vào, không chuyển đổi; style ASS, định dạng từng dòng và thẻ đều giữ nguyên. Phụ đề song ngữ khi gộp vẫn giữ hai dòng và được bỏ qua khi tách.',
'ru': ' Формат на выходе тот же, что на входе: преобразования нет, стили ASS, оформление каждой строки и теги сохраняются. Двуязычные строки при объединении остаются в две строки, а при разбиении пропускаются.',
'it': ' Stesso formato in ingresso e in uscita: nessuna conversione, e stili ASS, formattazione di ogni riga e tag restano identici. I sottotitoli bilingue restano su due righe quando uniti e vengono saltati quando divisi.',
'ar': ' الصيغة نفسها في الدخول والخروج، بلا أي تحويل، مع الحفاظ على أنماط ASS وتنسيق كل سطر والوسوم كما هي. التراجم ثنائية اللغة تبقى على سطرين عند الدمج ويتم تخطيها عند التقسيم.',
'tr': ' Giriş ve çıkış biçimi aynıdır, dönüştürme yapılmaz; ASS stilleri, her satırın biçimi ve etiketler olduğu gibi korunur. İki dilli satırlar birleştirilirken iki satır olarak kalır, bölmede atlanır.',
'nl': ' Hetzelfde formaat erin en eruit, zonder conversie; ASS-stijlen, de opmaak van elke regel en tags blijven behouden. Tweetalige regels blijven bij samenvoegen twee regels en worden bij splitsen overgeslagen.',
'pl': ' Ten sam format na wejściu i wyjściu, bez konwersji; style ASS, formatowanie każdej linii i tagi zostają zachowane. Dwujęzyczne linie po połączeniu zostają dwiema liniami, a przy dzieleniu są pomijane.',
'sv': ' Samma format in och ut, ingen konvertering; ASS-stilar, varje rads formatering och taggar bevaras. Tvåspråkiga rader förblir två rader vid sammanslagning och hoppas över vid delning.',
'cs': ' Stejný formát na vstupu i výstupu, bez převodu; styly ASS, formátování každého řádku a značky zůstanou zachovány. Dvojjazyčné řádky zůstanou při spojení dva a při dělení se přeskočí.',
'uk': ' Формат на виході той самий, що на вході, без перетворення; стилі ASS, форматування кожного рядка і теги зберігаються. Двомовні рядки при об’єднанні лишаються двома рядками, а при розбитті пропускаються.',
'da': ' Samme format ind og ud, ingen konvertering; ASS-stile, formateringen af hver linje og tags bevares. Tosprogede linjer forbliver to linjer ved sammenfletning og springes over ved deling.',
'fi': ' Sama muoto sisään ja ulos, ei muunnosta; ASS-tyylit, jokaisen rivin muotoilu ja tagit säilyvät. Kaksikieliset rivit pysyvät kahtena rivinä yhdistettäessä ja ohitetaan jaettaessa.',
'el': ' Ίδια μορφή στην είσοδο και στην έξοδο, χωρίς μετατροπή· τα στυλ ASS, η μορφοποίηση κάθε γραμμής και τα tags διατηρούνται. Οι δίγλωσσες γραμμές παραμένουν δύο κατά τη συγχώνευση και παραλείπονται στον διαχωρισμό.',
'he': ' אותו פורמט בכניסה וביציאה, ללא המרה; סגנונות ASS, העיצוב של כל שורה והתגיות נשמרים. שורות דו-לשוניות נשארות שתי שורות במיזוג ומדולגות בפיצול.',
'ro': ' Același format la intrare și ieșire, fără conversie; stilurile ASS, formatarea fiecărui rând și tagurile sunt păstrate. Rândurile bilingve rămân două la îmbinare și sunt omise la împărțire.',
}

f = 'server.js'
s = io.open(f, encoding='utf-8').read()
i = s.index('const SEO_SHIFT = {')
d = 0
for j in range(i, len(s)):
    if s[j] == '{': d += 1
    elif s[j] == '}':
        d -= 1
        if d == 0: break
blk = s[i:j + 1]

codes = re.findall(r"^  '([a-zA-Z-]+)':\s*\{", blk, re.M)
assert len(codes) == 27, len(codes)
missing = [c for c in codes if c not in KW or c not in INTRO or c not in FEAT]
assert not missing, missing

def esc(v):
    return str(v).replace('\\', '\\\\').replace("'", "\\'")

out, done = [], 0
parts = re.split(r"(^  '(?:[a-zA-Z-]+)':\s*\{$)", blk, flags=re.M)
k = 0
while k < len(parts):
    seg = parts[k]
    out.append(seg)
    if re.match(r"^  '[a-zA-Z-]+':", seg) and k + 1 < len(parts):
        code = re.match(r"^  '([a-zA-Z-]+)':", seg).group(1)
        body = parts[k + 1]
        nb = body
        nb = re.sub(r"(kw:\s*'(?:[^'\\]|\\.)*')", lambda m: m.group(1)[:-1] + ',' + esc(KW[code]) + "'", nb, count=1)
        nb = re.sub(r"(intro:\s*'(?:[^'\\]|\\.)*')", lambda m: m.group(1)[:-1] + esc(INTRO[code]) + "'", nb, count=1)
        nb = re.sub(r"(feat:\s*'(?:[^'\\]|\\.)*')", lambda m: m.group(1)[:-1] + esc(FEAT[code]) + "'", nb, count=1)
        assert nb != body, code
        out.append(nb)
        done += 1
        k += 2
        continue
    k += 1
newblk = ''.join(out)
s2 = s[:i] + newblk + s[j + 1:]
io.open(f, 'w', encoding='utf-8').write(s2)
print('SEO_SHIFT 已追加语言块数 =', done)
