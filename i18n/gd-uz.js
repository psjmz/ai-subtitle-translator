/* i18n/gd-uz.js —— 43 篇指南页的uz译文（由 _mkgd.js 生成，勿手改）
 * 源：_gd/uz.json（Gemini 翻译，_gemgd.js 产出）
 * 结构：{ <slug>: { seo:{title,desc,h1,intro,ctaText}, body:[{h2,ps[],img}] } }
 * ⚠️ server.js 自己 require 它，不被任何 html 引用 —— 部署时必须显式加进传输列表。
 */
module.exports = {
 "ass-to-srt": {
  "seo": {
   "title": "ASS ni SRT ga o‘tkazgich – ASS/SSA subtitrlarni o‘zgartirish – AI-SRTSub",
   "desc": "ASS (va SSA) subtitrlarni oddiy SRT formatiga o‘tkazing: matn va vaqt o‘z holicha olinadi, uslub teglar esa tashlab ketiladi. Faqat SRT ni qabul qiluvchi dasturlar uchun. Brauzeringizda ishlaydi.",
   "h1": "ASS dan SRT ga",
   "intro": "ASS (yoki SSA) subtitrlarni SRT formatiga o‘tkazing: faylni tashlang, SRT ni tanlang va yuklab oling. Matn va",
   "ctaText": "ASS ni SRT ga o‘tkazish"
  },
  "body": [
   {
    "h2": "Qachon SRT talab qilinadi",
    "ps": [
     "Montaj dasturlari, pristavkalar, televizor pleyerlari va tarjima vositalari — keyingi bosqichdagi ko‘plab vositalar faqat **SRT** formatini qabul qiladi. ASS dagi murakkab uslublar va joylashuv bu yerda ahamiyatsiz, shuning uchun oddiy SRT eng xavfsiz tanlovdir."
    ]
   },
   {
    "h2": "Uslub teglari bilan nima sodir bo‘ladi",
    "ps": [
     "Har bir ASS qatori Dialogue deb nomlanib, uning matnida ko‘pincha rang, harakat yoki effektlar uchun `{\\fonts}` kabi qo‘shimcha teglar bo‘ladi. SRT ga o‘tkazilganda **bu teglar uslublar bilan birga olib tashlanadi**, faqat matn va vaqt qoladi; `\\N` qator uzilishlari haqiqiy qator tashlashlarga aylanadi. SSA fayllari ham o‘qiladi."
    ],
    "img": {
     "file": "convert-result-srt",
     "alt": "O‘tkazish natijasi: ASS dan ajratib olingan SRT raqamlari va matni",
     "cap": "Ajratib olingan SRT: har bir replika uchun bitta raqam, toza matn"
    }
   },
   {
    "h2": "Qanday o‘tkaziladi",
    "ps": [
     "[[Konverter|/convert.html]]ni oching, ASS faylini tashlang (.ssa ham ishlaydi), natija sifatida **SRT - SubRip** ni tanlang, so‘ng o‘tkazib, yuklab oling. Aksincha qilish kerakmi? [[SRT dan ASS ga|/guides/srt-to-ass.html]] bo‘limiga qarang."
    ]
   }
  ]
 },
 "batch": {
  "seo": {
   "title": "Subtitrlarni paketli o‘tkazish – Yuzlab fayllarni bitta ZIP ga – AI-SRTSub",
   "desc": "Qo‘llanma: bir nechta SRT/VTT fayllarini tashlang, ularni bitta formatga o‘tkazing va yagona ZIP fayl sifatida yuklab oling. Raqamlar yangilanadi, vaqtlar moslashtiriladi, o‘qib bo‘lmaydigan fayllar arxivga qo‘shilib ketmay, belgilab qo‘yiladi.",
   "h1": "Subtitrlarni paketli o‘tkazish",
   "intro": "Butun bir mavsum subtitrlarini odatda bitta formatga keltirish kerak bo‘ladi va ularni birma-bir yuklash juda ko‘p vaqt oladi. Ularning barchasini shu yerga tashlang, birga o‘tkazing va bitta ZIP faylni yuklab oling — tahlil qilib bo‘lmaydigan fayllar shunchaki qo‘shib yuborilmaydi, balki alohida belgilanadi.",
   "ctaText": "Paketli o‘tkazishni ochish"
  },
  "body": [
   {
    "h2": "Bu vosita nima qiladi",
    "ps": [
     "Butun mavsum yoki serial uchun subtitrlar boshqa ishlov berishdan oldin bir xil formatda bo‘lishi kerak. Paketli sahifa quyidagilarni bajaradi:"
    ]
   },
   {
    "h2": "Fayllarni qo‘shish",
    "ps": [
     "Bir nechta subtitr faylini shtrixli katakchaga birga sudrab tashlang yoki ustiga bosib bir yo‘la tanlang. Fayllar ro‘yxatida har biri ko‘rsatiladi: tahlil qilingan fayllarda replikalar soni chiqadi, tahlil qilib bo‘lmaganlari esa oddiygina tanib bo‘lmadi deb belgilanadi. Yuqori panelda umumiy fayllar va replikalar soni hamda nechta fayl tanib olinmagani ko‘rsatiladi.",
     "⚠️ Bu sahifa faqat UTF-8 formatini o‘qiydi. Kodirovkasi buzilgan (savol belgilari yoki katakchalar bilan to‘la) har qanday fayl avval [[Mojibake ni tuzatish|/repair.html]] vositasidan o‘tkazilishi kerak."
    ],
    "img": {
     "file": "batch-list",
     "alt": "Fayllar ro‘yxati: har bir faylning nomi va replikalar soni, tanib olinmaganlari qizil rangda belgilangan",
     "cap": "Har bir fayl ro‘yxatga kiritilgan, tanib olinmaganlari esa joyida belgilab qo‘yilgan"
    }
   },
   {
    "h2": "Hammasini qaysi formatga o‘tkazish kerak",
    "ps": [
     "\"Hammasini quyidagiga o‘tkazish\" ostidan maqsadli formatni tanlang — SRT yoki VTT. Ro‘yxatdagi har bir fayl shu formatda qaytadan yaratiladi: replika raqamlari boshidan raqamlanadi, vaqt belgilari maqsadli formatga moslashtiriladi (SRT millisekundlarni vergul bilan, VTT nuqta bilan ajratadi).",
     "**Asliy fayl nomlari saqlanib qoladi va faqat kengaytma o‘zgaradi**; bir xil nomlilar ustiga yozilib ketmasligi uchun ularga raqam qo‘shiladi."
    ],
    "img": {
     "file": "batch-up",
     "alt": "Maqsadli formatni tanlash va ro‘yxat holati, statistika panelida fayl va replikalar soni ko‘rsatilgan",
     "cap": "Maqsadli formatni tanlang va har bir fayl qayta yaratiladi; faqat fayl kengaytmasi o‘zgaradi"
    }
   },
   {
    "h2": "Arxivlash va yuklab olish",
    "ps": [
     "\"Bitta ZIP ga to‘plab yuklab olish\" tugmasini bosing va arxiv ichida o‘tkazilgan barcha fayllar bo‘ladi. **Tanib bo‘lmaydigan replikalari bor fayllar arxivga kiritilmaydi** — ular muvaffaqiyatli o‘tgandek aralashtirib yuborilmaydi, balki ro‘yxatda belgilangan holatda qoladi. Arxivlangandan so‘ng, uning ichida nechta fayl borligi ko‘rsatiladi."
    ],
    "img": {
     "file": "batch-zip",
     "alt": "Arxivlash sohasi: ZIP yuklab olish tugmasi va arxivlash natijasi haqida xabar",
     "cap": "Tanib olinmagan fayllar arxivga kiritilmaydi va ro‘yxatda belgilanganicha qoladi"
    }
   },
   {
    "h2": "Fayl nima uchun tanib olinmagan deb belgilanadi",
    "ps": [
     "Fayldan bitta ham replika o‘qib bo‘lmaganda u belgilanadi. Uchta asosiy sabab bor: bu umuman subtitr fayli emas (.txt matnli fayl bo‘lishi mumkin), kodirovka UTF-8 emas (shuning uchun u faqat almashtirish belgilari sifatida o‘qiladi) yoki tarkibi vaqt belgilarisiz bitta blokga birlashtirib yuborilgan.",
     "Belgilangan fayllar bilan alohida shug‘ullanish mumkin: kodirovka muammolari uchun [[Mojibake ni tuzatish|/repair.html]], format muammolari uchun esa ro‘yxatga qaytishdan oldin yakka tartibda o‘tkazish uchun [[Format konverteri|/convert.html]] ishlatiladi."
    ]
   },
   {
    "h2": "Tez-tez beriladigan savollar",
    "ps": [
     "**Nechta fayl qo‘shishim mumkin?** Aniq cheklov yo‘q; bu brauzeringiz xotirasiga bog‘liq bo‘lib, bir necha yuzlab SRT fayllari odatda muammosiz ishlaydi.",
     "**Dialoglarim o‘zgarib ketmaydimi?** Yo‘q. Paketli o‘tkazish faqat konteyner formatini o‘zgartiradi — replikalarni qayta raqamlaydi va vaqt belgilarini moslashtiradi — dialogdagi bitta ham so‘zga teginmaydi.",
     "**Agar tarkibni o‘zgartirish kerak bo‘lsa-chi?** Bu sahifa faqat formatlarni o‘tkazadi. Vaqtni ommaviy o‘zgartirish uchun [[Vaqtni moslashtirish|/shift.html]], so‘zlarni o‘zgartirish uchun esa [[Atamalarni almashtirish|/glossary.html]] dan foydalaning; ikkalasi ham faylma-fayl ishlaydi.",
     "**ASS qo‘llab-quvvatlanadimi?** Bu sahifa faqat SRT va VTT o‘rtasida o‘tkazadi. ASS uslublarni o‘z ichiga oladi — u bilan ishlashda [[Format konverteri|/convert.html]]dan alohida foydalaning."
    ]
   },
   {
    "h2": "Maxfiylik",
    "ps": [
     "O‘tkazish va arxivlash to‘liq brauzeringizda bajariladi. Hech qanday subtitr mazmuni serverga yuborilmaydi."
    ]
   },
   {
    "h2": "Tegishli vositalar va qo‘llanmalar",
    "ps": [
     "Butun mavsum uchun nimalarni va qaysi tartibda o‘zgartirish kerak — [[Butun bir mavsum subtitrlarini paketli tahrirlash|/guides/batch-convert-srt.html]]; bitta fayl uchun qo‘shimcha formatlar — [[Format konverteri|/convert.html]]; jadvalda tahrirlab chiqish — [[Subtitr ⇄ jadval|/table.html]]."
    ]
   }
  ]
 },
 "batch-convert-srt": {
  "seo": {
   "title": "Butun bir mavsum subtitrlarini ommaviy tahrirlash – Nima ishlaydi, nima ishlamaydi – AI-SRTSub",
   "desc": "Mavsum uchun odatda bir xil o‘zgarishlar kerak bo‘ladi: bir xil format, vaqt siljishi, atamalar. Bir o‘tishda nima bajarilishini va nima bajarilmasligini bilib oling.",
   "h1": "Butun bir mavsum subtitrlarini ommaviy tahrirlash",
   "intro": "O‘nlab subtitr fayllarini o‘zgartirish kerak bo‘lganda, qoidaga ko‘ra, har safar bir xil o‘zgarish talab etiladi. Qaysi qismlarini bitta urinishda bajarish mumkinligini bilish ularni bittadan bajarishdan ko‘ra ko‘proq vaqtni tejaydi.",
   "ctaText": "Ommaviy konvertatsiyani ochish"
  },
  "body": [
   {
    "h2": "Odatda hamma joyda bir xil o‘zgarish talab etiladi",
    "ps": [
     "Butun bir mavsum subtitrlari bilan muammo yuzaga kelsa, har bir qismda o‘ziga xos alohida xatolik bo‘lishi kamdan-kam uchraydi — odatda har bir qismga bitta sabab ta’sir qiladi: barchasini bitta reliz guruhi kodlagan (shuning uchun format va suv belgilari mos keladi), ularning barchasi bitta video versiyasiga moslashtirilgan (shuning uchun siljish yo‘nalishi va miqdori mos keladi) yoki transliteratsiya butun mavsum davomida turlicha bo‘lib qolgan.",
     "Biror narsani ommaviy tahrirlashdan oldin ikkita qismni — bittasi boshidan, bittasi oxiridan — tekshirib ko‘ring va bu haqiqatan ham **bir xil muammo** ekanligini tasdiqlang. Agar ikkalasi bir-biriga mos kelmasa, buni ommaviy tarzda tuzatib bo‘lmaydi."
    ]
   },
   {
    "h2": "Bitta urinishda nima qilish mumkin",
    "ps": [
     "**Formatni birlashtirish** — bu chinakamiga bitta urinishda yakunlanadigan yagona narsa: o‘nlab SRT va VTT fayllarini birga [[Ommaviy konvertatsiya|/batch.html]] oynasiga sudrab tashlang, kerakli formatni tanlang va bitta ZIP arxivini yuklab oling. Raqamlash va vaqt tamg‘alarini normallashtirish aynan o‘sha bosqichda sodir bo‘ladi va muloqotning birorta ham so‘zi o‘zgarmaydi."
    ],
    "img": {
     "file": "batch-list",
     "alt": "Ommaviy sahifa fayllar ro‘yxati: har bir fayldagi sub-titrlar soni, tanib bo‘lmaydiganlari qizil rangda belgilangan",
     "cap": "Bir xil format — bu bitta urinishda haqiqatan ham bajariladigan yagona narsa"
    }
   },
   {
    "h2": "Faylma-fayl bajarilishi shart bo‘lgan ishlar",
    "ps": [
     "Bularning ommaviy kirish nuqtasi yo‘q va har bir fayl uchun alohida urinish talab etiladi — garchi odatda **faqat bir marta bajarilib, keyin butun mavsumga tatbiq etiladigan** muqobil usul mavjud bo‘lsa ham:"
    ]
   },
   {
    "h2": "To‘g‘ri tartibga amal qiling",
    "ps": [
     "Bir nechta ishlarni bajarish kerak bo‘lganda, noto‘g‘ri tartib qaytadan bajarishga olib keladi. Quyidagi tartibga amal qiling:",
     "**Kodlashni tuzatish** → **formatni birlashtirish** → **mazmunni o‘zgartirish** (suv belgilari, atamalar, vaqt) → **oxirida sifat nazorati (QC)**. Kodlashni tuzatishdan oldin formatlarni o‘zgartirish shunchaki boshqa konteynerda buzilgan matnni (mojibake) keltirib chiqaradi; formatlar birlashtirilishidan oldin mazmunni o‘zgartirish esa mos kelmaydigan vositalar bilan ishlashni anglatadi."
    ],
    "img": {
     "file": "batch-zip",
     "alt": "Arxivlash maydoni: ZIP yuklab olish tugmasi va natija xabari",
     "cap": "Avval formatlarni birlashtiring, keyin mazmunni o‘zgartiring"
    }
   },
   {
    "h2": "Tanib bo‘linmagan fayllar bilan ishlash",
    "ps": [
     "Ommaviy konvertatsiyada tanib bo‘linmagan deb belgilangan fayllar ZIP arxiviga kiritilmaydi va ro‘yxatda qoladi. Buning uchta odatiy sababi bor: bu subtitr fayli emas (tasodifiy o‘qish fayli), kodlash UTF-8 emas yoki mazmuni vaqt tamg‘alarisiz bitta blokka birlashtirib yuborilgan.",
     "Kodlash muammolari alohida ravishda [[Kodlashni tuzatish|/repair.html]] bo‘limida hal qilinadi; format muammolari esa ularni ro‘yxatga qaytarishdan oldin [[Format konvertori|/convert.html]] orqali to‘g‘rilanadi. **Faqat sonini ko‘paytirish uchun tanib bo‘linmagan fayllarni arxivga majburlab qo‘shmang** — pleyeringizda yetishmayotgan qismni aniqlash bu tejalgan daqiqadan ko‘ra qimmatroqqa tushadi."
    ]
   },
   {
    "h2": "Tegishli vositalar va qo‘llanmalar",
    "ps": [
     "To‘liq ommaviy qo‘llanma — [[Subtitrlarni qanday ommaviy konvertatsiya qilish mumkin|/guides/batch.html]]; bir xil vaqt siljishlari — [[Subtitr vaqtini qanday moslashtirish mumkin|/guides/shift.html]]; yetkazib berishdan oldingi oxirgi bosqich — [[Subtitr sifatini nazorat qilish|/qc.html]]."
    ]
   }
  ]
 },
 "bilingual": {
  "seo": {
   "title": "Ikki tilli subtitrlarni qanday bo‘lish yoki birlashtirish mumkin – AI-SRTSub",
   "desc": "Ikki tilli subtitrlarni tozalashning to‘rt xil usuli: faqat bitta yo‘lakni qoldirish, ikkita faylga ajratish yoki bitta ikki qatorli yozuvga birlashtirish. Ikkala shakl ham brauzeringizda avtomatik ravishda aniqlanadi.",
   "h1": "Ikki tilli subtitrlarni qanday tozalash mumkin",
   "intro": "Ikki tilli subtitrlarni bo‘lishni, birlashtirishni yoki faqat bitta yo‘lakni qoldirmoqchimisiz? Ushbu qo‘llanma to‘rtta rejimning barchasini tushuntiradi: aniqlash qanday ishlashi, qaysi rejimni tanlash kerakligi va eksport paytida nima olishingiz.",
   "ctaText": "Ikki tilli subtitrlarni tozalash vositasini ochish"
  },
  "body": [
   {
    "h2": "Ushbu vosita nima uchun mo‘ljallangan",
    "ps": [
     "Sizda ikki tilli subtitrlar bor, lekin faqat bitta yo‘lakni xohlaysiz — yoki aksincha, ikki yo‘lakni bo‘lish yoki birlashtirmoqchimisiz:"
    ]
   },
   {
    "h2": "Ikki tilli kontentni qanday aniqlaydi",
    "ps": [
     "Ikki yo‘lakli ikki tilli subtitrlar ikkita keng tarqalgan shaklda keladi va vosita ularning har birini **tilni taxmin qilmasdan** taniydi: **A shakli (bitta yozuv, ikkita qator)** yozuv tizimi bo‘yicha yo‘laklarni ajratadi — kana, hangul, xanzi, lotin va boshqa tizimlar, jami o‘nta; ikkita har xil tizim ikki tilli ekanligini bildiradi va birinchi bo‘lib qaysi biri paydo bo‘lsa, u asl nusxasi hisoblanadi. Yagona tizim (masalan, ikkiga o‘ralgan uzun xitoycha qator) bir tilda deb qaraladi va o‘zgacha saqlanadi. **B shakli (vaqt tamg‘asi bir xil bo‘lgan ikkita alohida yozuv)** joylashuvi bo‘yicha yo‘laklarni ajratadi — bir xil vaqt tamg‘asidagi ikkita yozuv juftlik hosil qiladi, birinchisi asl nusxasi hisoblanadi, ingliz-fransuz yoki ingliz-nemis kabi lotin alifbosini bo‘lishadigan birikmalar ham to‘g‘ri ajratiladi. Hech qanday ikki tilli kontent aniqlanmaganda, rejim tanlash tugmasi va \"Boshlash\" tugkasi aniq ogohlantirish bilan birga faolsizlantiriladi, shuning uchun u hech qachon noto‘g‘ri natijalarga majburiy bo‘lmaydi."
    ]
   },
   {
    "h2": "To‘rtta rejim",
    "ps": [
     "\"Qaysi birini xohlaysiz?\" ochiladigan menyusidan to‘rttasidan birini tanlang: **Faqat asl nusxani saqlash** va **Faqat tarjimani saqlash** har biri bitta fayl hosil qiladi; **Ikkitaga bo‘lish** asl fayl va tarjima faylini hosil qiladi, fayl nomlari ustiga yozib yuborishning oldini olish uchun `.orig` / `.dst` bilan avtomatik belgilanadi; **Bitta ikki qatorli yozuvga birlashtirish** har bir juftlikni ikki tilli yozuvga aylantiradi — bir qatorda asl nusxasi, ikkinchi qatorda tarjimasi — bir tildagi juftliklar esa o‘z holicha saqlanadi va ikkinchi qator o‘ylab topilmaydi. Rejimlarni yoki chiqish formatlarini o‘zgartirganingizda, mavjud kontent avtomatik ravishda qayta ishga tushadi — \"Boshlash\" tugmasini qayta bosish shart emas."
    ],
    "img": {
     "file": "bilingual-modes",
     "alt": "Ikki tilli tozalagichda rejimni tanlash: asl nusxani saqlash, tarjimani saqlash, ikkitaga bo‘lish, bitta ikki qatorli yozuvga birlashtirish",
     "cap": "To‘rtta rejim: bitta yo‘lakni saqlash, ikkitaga bo‘lish yoki bitta ikki qatorli yozuvga birlashtirish"
    }
   },
   {
    "h2": "Kirish va chiqish",
    "ps": [
     "Yettita formatni o‘qiydi — SRT, VTT, ASS, SSA, SBV, LRC, TXT (fayl kengaytmasi birinchi, kontentni aniqlash zaxira sifatida) — va to‘rtasini eksport qiladi: SRT, VTT, ASS, TXT. Har qanday kiritish-chiqish kombinatsiyasi ishlaydi, shuning uchun formatlararo konvertatsiya jarayonda sodir bo‘ladi. ASS `\\N` qator uzilishlari haqiqiy qator uzilishlariga tiklanadi va formatlararo eksportda effekt teglari olib tashlanadi."
    ]
   },
   {
    "h2": "Natijalar va eksport",
    "ps": [
     "Natijalar faqat o‘qish uchun mo‘ljallangan matn oynasida to‘liq ko‘rsatiladi, har bir faylda yozuvlar soni va umumiy davomiylik statistikasi mavjud; \"Yuklab olish\" va \"Nusxalash\" tugmalari faylni to‘g‘ridan-to‘g‘ri olib ketadi. Natijalar sohasi – bu dastlabki ko‘rish, bu yerda matn yoki vaqtni tahrirlash amalga oshirilmaydi. O‘zgartirishlar kiritish uchun oldin eksport qiling, so‘ngra mos keladigan vositadan foydalaning."
    ],
    "img": {
     "file": "bilingual-result",
     "alt": "Tozalash natijalari sohasi: faqat o‘qish uchun dastlabki ko‘rish, yozuvlar soni statistikasi va yuklab olish/nusxalash tugmalari",
     "cap": "To‘liq matnni dastlabki ko‘rish + yozuv va davomiylik statistikasi + yuklab olish va nusxalash"
    }
   },
   {
    "h2": "TQSS",
    "ps": [
     "**Bitta yozuvda ingliz tili bir qatorda, fransuz tili esa boshqa qatorda joylashgan — nega u bo‘linmaydi?** A shakli yo‘laklarni yozuv tizimi bo‘yicha ajratadi, shuning uchun bitta yozuv ichida bitta tizimni bo‘lishadigan ikki tilda ajratib bo‘lmaydi. Uni B shakli sifatida qayta tuzing (bir xil vaqt jadvalidagi ikkita yozuv) va pozitsiyaga asoslangan bo‘lish ishlaydi.",
     "**Yuklab olishda faqat bitta faylmi?** \"Faqat asl nusxani saqlash\", \"Faqat tarjimani saqlash\" va \"Bitta ikki qatorli yozuvga birlashtirish\" har biri o‘ziga xos tarzda bitta fayl hosil qiladi; faqat \"Ikkitaga bo‘lish\" sizga `.orig` / `.dst` bilan belgilangan ikkita faylni beradi.",
     "**Paketli ishlov bera olamanmi?** Bir vaqtning o‘zida bitta fayl; navbatlar qo‘llab-quvvatlanmaydi.",
     "**Subtitrlarimni yuklaydimi?** Yo‘q — tahlil qilish va eksport to‘liq brauzeringizda ishlaydi."
    ]
   },
   {
    "h2": "Tegishli qo‘llanmalar",
    "ps": [
     "Ikkita yo‘lakni bo‘lishning tezkor usuli uchun [[Splitting Bilingual Subtitles into Two Tracks|/guides/split-bilingual-subtitles.html]] ga qarang; ikki tilli subtitrlar qanday yaratilishi haqida bilish uchun [[Two Ways to Make Bilingual Subtitles|/guides/make-bilingual-subtitles.html]] ga qarang; mashina tarjimasi uchun [[AI Subtitle Translation|/translate.html]] dan foydalaning."
    ]
   }
  ]
 },
 "clean": {
  "seo": {
   "title": "Subtitrlarni tozalagich – suv belgilari, reklamalar, SDH'ni olib tashlash – AI-SRTSub",
   "desc": "Subtitrlarni tozalagich: 13 qoidalar suv belgilari, reklamalar, SDH yozuvlari, HTML teglari, dublikatlarni olib tashlaydi; har bir o‘zgarish taqqoslashga ega va uni bekor qilish mumkin. SRT/VTT/ASS, barchasi brauzerda.",
   "h1": "Subtitr tozalagichidan qanday foydalanish kerak",
   "intro": "Vebdan yuklab olingan subtitrlarda ko‘pincha suv belgilari, reklamalar va SDH yozuvlari bo‘ladi. Tozalagich bir o‘tishda 13 qoidalarini qo‘llaydi va har bir o‘zgarish taqqoslanadi va qaytarilishi mumkin.",
   "ctaText": "Subtitr tozalagichni ochish"
  },
  "body": [
   {
    "h2": "Ushbu vosita nima qiladi",
    "ps": [
     "Yuklab olingan subtitr fayllarida ko‘pincha bo‘lmasligi kerak bo‘lgan narsalar bo‘ladi. Tozalagich ularni qoidalarga asoslangan bitta o‘tishda olib tashlaydi:"
    ]
   },
   {
    "h2": "Yuklash va aniqlash",
    "ps": [
     "Faylni sudrab keling yoki yuklash uchun bosing — SRT, VTT, ASS, SSA va TXT qo‘llab-quvvatlanadi — yoki subtitr matnini to‘g‘ridan-to‘g‘ri qo‘ying. Kodlash avtomatik ravishda aniqlanadi: agar UTF-8 dekodlash almashtirish belgilarini keltirib chiqarsa, u GBK yoki Big5 ga o‘tadi va sahifada \"Kodlash {encoding} sifatida tuzatildi\" deb ko‘rsatiladi. Agar ikki tilli ikki yo‘lakli subtitrlarni yuklasangiz (ikkita bir xil vaqt jadvali, biri xitoycha va biri inglizcha), ular \"tepada asl nusxasi / tepada tarjimasi\" tugmasi bilan bitta ikki tilli yo‘lakka birlashtiriladi."
    ]
   },
   {
    "h2": "13 qoidalarini sozlash",
    "ps": [
     "Interfeysda 13 katakchalari bo‘lgan to‘rtta guruh mavjud: **Teglar va formatlash** (ASS effektlari, HTML teglari, boshqaruv belgilari, saralashdan keyin qayta raqamlash), **SDH va tovush effektlari** (SDH yozuvlari, spiker yorliqlari, sof qo‘shiq matni qatorlari), **Suv belgilari va keraksiz yozuvlar** (suv belgilari va reklamalar, takroriy yozuvlar, bo‘sh yozuvlar), **Matnni tuzatish** (tinish belgilari va oraliqlar, bosh harflarni tiklash, qisqa qatorlarni birlashtirish). Odatiy bo‘lib faqat \"yo‘qotishsiz va aniq\" elementlar yoqilgan; kontentni yo‘qotishi mumkin bo‘lgan elementlar (qo‘shiq matni qatorlari, bosh harflarni tiklash, qisqa qatorlarni birlashtirish) o‘chirilgan — kerak bo‘lganda ularni belgilang. Har bir elementda ⓘ sichqonchani olib borganda chiqadigan maslahat bor va katakchaning har qanday o‘zgarishi darhol qayta ishga tushadi."
    ],
    "img": {
     "file": "clean-opts",
     "alt": "Tozalash opsiyalari interfeysi: 13 katakchalarining to‘rtta guruhi, faol soni yuqorida ko‘rsatilgan",
     "cap": "To‘rtta guruh, 13 qoidalar; odatiy bo‘lib faqat yo‘qotishsiz elementlar yoqilgan, o‘zgarishlar darhol qo‘llaniladi"
    }
   },
   {
    "h2": "O‘zgarishlarni taqqoslash va bekor qilish",
    "ps": [
     "Natijalar to‘g‘ridan-to‘g‘ri ustiga yozilmaydi: har bir o‘zgarish qoida yorlig‘i (nima uchun bu yozuv tahrirlangan yoki o‘chirilganligi) bilan taqqoslash jadvalida keltirilgan. Birini qaytarishni xohlaysizmi? Ushbu qatorda \"Tiklash\" tugmasini bosing; \"Hammasini tiklash\" bir bosish bilan hamma narsani qaytaradi va uni yana bosish to‘liq tozalashni qaytadan qo‘llaydi. Statistika paneli asl / tozalangan / o‘chirilgan / o‘zgartirilgan / tiklanganlar sonini ko‘rsatadi."
    ],
    "img": {
     "file": "clean-diff",
     "alt": "O‘zgarishlarni taqqoslash jadvali: indeks, vaqt, asl va tozalangan matn, har bir qatorda qoida yorlig‘i",
     "cap": "Har bir o‘zgarish qoida yorlig‘iga ega; bitta qatorlarni yoki hammasini bir vaqtning o‘zida tiklang"
    }
   },
   {
    "h2": "Dastlabki ko‘rish va eksport",
    "ps": [
     "\"Tozalangan / Asl nusxa\" ko‘rinishlari o‘rtasida o‘ting. Asl ko‘rinishda o‘chirilgan yozuvlar ustidan chizilgan va \"O‘chirilgan\" deb belgilangan bo‘ladi, eksport qilingan fayl esa dastlabki ko‘rishga aynan mos keladi. Eksport formatlari: SRT (standart), VTT, ASS (manba ASS bo‘lganda mavjud bo‘lib, uslub bo‘limi o‘z holicha saqlanadi) va vaqt jadvallarisiz oddiy matnli TXT. Fayl nomiga avtomatik ravishda `.clean` belgisi qo‘shiladi."
    ],
    "img": {
     "file": "clean-preview",
     "alt": "To‘liq matnni dastlabki ko‘rish: sonlarni ko‘rsatadigan statistika paneli bilan tozalangan va asl ko‘rinishlar",
     "cap": "Ikkita dastlabki ko‘rinish, ko‘rgan narsangizni olasiz"
    }
   },
   {
    "h2": "TQSS",
    "ps": [
     "**Oddiy muloqotni xatokech o‘chirib yubormaydimi?** Suv belgisi qoidasi oldin suv belgisi qatorlarini olib tashlaydi (ikki tilli yozuvlar ichidagi muloqot qatorlarini saqlab qoladi) va agar izlar qolsa, faqat butun yozuvni o‘chiradi; SDH'ni olib tashlash faqat 40 belgidan qisqaroq bo‘lgan SDH kalit so‘zlari bilan qavs ichidagi kontentingizga tegadi — oddiy qavs ichidagi muloqot saqlanib qoladi.",
     "**Sof qo‘shiq matni qatorlari muloqot ichidagi qo‘shiq matnlaridan qanday farqlanadi?** Faqat har bir qatori ♪ musiqa noutlari yoki [music] kabi belgilar bilan o‘ralgan yozuvlar o‘chiriladi; qo‘shiq matnlarini o‘z ichiga olgan muloqot saqlanadi.",
     "**Spiker yorliqlari xitoycha matnga tegishi mumkinmi?** Qator boshidagi ikki nuqta bilan tugaydigan faqat bosh harflardagi harf-raqamli ism (masalan, `GEORGE:`) mos keladi; xitoycha ikki nuqtali jumla hech qachon mos kelmaydi.",
     "**Bir nechta faylni bir vaqtning o‘zida tozalay olamanmi?** Yo‘q — har bir ishga tushirish uchun bitta fayl. Natijani yuklab oling, so‘ngra keyingisini yuklang."
    ]
   },
   {
    "h2": "Maxfiylik",
    "ps": [
     "Tozalash to‘liq brauzeringizda ishlaydi; hech qanday subtitr kontenti hech qachon serverga yuborilmaydi."
    ]
   },
   {
    "h2": "Tegishli vositalar va qo‘llanmalar",
    "ps": [
     "Suv belgilari va reklamalarni olib tashlashga qaratilgan qisqa qo‘llanma uchun [[remove subtitle ads and watermarks|/guides/remove-subtitle-ads.html]] ga qarang; topshirishdan oldin faylingizni [[subtitle quality check|/guides/subtitle-quality-check.html]] orqali o‘tkazing; formatlarni o‘zgartirish uchun [[format conversion|/convert.html]] dan foydalaning."
    ]
   }
  ]
 },
 "convert": {
  "seo": {
   "title": "Subtitr formatlarini qanday o‘zgartirish mumkin (SRT, VTT, ASS, SBV, LRC, TXT) – AI-SRTSub",
   "desc": "Konverter bo‘yicha tasvirlangan qo‘llanma: faylni tashlang, aniqlangan formatni tekshiring, chiqish formatini tanlang, ikki tilli matnni boshqaring va yuklab oling. Hammasi brauzeringizda ishlaydi.",
   "h1": "Subtitr formati konverteri qo‘llanmasi",
   "intro": "Ushbu qo‘llanma sahifani yuqoridan pastgacha yoritib beradi: subtitrni yuklang, aniqlangan formatni tasdiqlang, chiqish formatini tanlang va yuklab oling. Hammasi brauzeringizda ishlaydi — hech qachon hech qanday fayl qurilmangizni tark etmaydi.",
   "ctaText": "Subtitr konverterini ochish"
  },
  "body": [
   {
    "h2": "Subtitrlaringizni yuklang",
    "ps": [
     "Faylni shtrixli katakchaga sudrab tashlang yoki birini tanlash uchun bosing — shuningdek, **matnni to‘g‘ridan-to‘g‘ri matn oynasiga qo‘yishingiz mumkin**. Format ham kengaytmadan, ham kontentdan aniqlanadi va natija format yorlig‘ida ko‘rsatiladi."
    ],
    "img": {
     "file": "convert-upload",
     "alt": "Yuklash sohasi: namunaviy SRT yuklandi, SRT sifatida aniqlandi",
     "cap": "Aniqlangan format yorlig‘ida ko‘rsatiladi — agar shubhangiz bo‘lsa, birinchi navbatda shu yerni tekshiring"
    }
   },
   {
    "h2": "Chiqish formatini tanlang",
    "ps": [
     "Ochiladigan menyudan maqsad formatni tanlang: oltita variant — srt, vtt, ass, sbv, lrc, txt. Ass ga o‘tkazish belgilangan 1920×1080 standart uslubini (oq matn, qora qirra, pastki markaz) qayta tiklaydi va **asl shriftlar yoki ranglarni saqlamaydi**; txt faqat vaqtsiz matnni eksport qiladi."
    ],
    "img": {
     "file": "convert-opt",
     "alt": "VTT tanlangan holda chiqish formati ochiladigan menyusi",
     "cap": "Chiqish formati kirishga ergashmaydi — uni o‘zingiz tanlaysiz"
    }
   },
   {
    "h2": "Ikki tilli matnni boshqarish",
    "ps": [
     "Agar fayl ikki tilli bo‘lsa (bitta kesmada ikkita qator yoki navbatma-navbat kesmalar), tartib konvertatsiya paytida qanday bo‘lsa, shunday saqlanadi. \"Ikki tilni saqlash\" ni tanlash ikki tilni yuqori va pastki qatorlarga ajratadi, ularning har biri o‘zicha qayta o‘raladi; hech qanday ikki tilli matn aniqlanmaganda boshqaruv elementi o‘chiriladi."
    ]
   },
   {
    "h2": "Konvertatsiya qilish va yuklab olish",
    "ps": [
     "\"Konvertatsiya qilish\" tugmasini bosing: natijalar panelida kesmalar soni va umumiy davomiylik ko‘rsatiladi, matn tekshirishga tayyor bo‘ladi. Faylni saqlash uchun **Yuklab olish** tugmasini yoki matnni to‘g‘ridan-to‘g‘ri olish uchun **Nusxalash** tugmasini bosing. Konvertatsiya hech qachon vaqt qiymatlarini o‘zgartirmaydi — u faqat formatni qayta yozadi. Kesmalar vaqtini o‘zgartirish uchun [[timing tool|/shift.html]] dan foydalaning."
    ],
    "img": {
     "file": "convert-result",
     "alt": "Natija paneli: yuklab olish va nusxalash tugmalari bilan kesmalar soni va umumiy davomiylik",
     "cap": "6 ta kesma, 0:23 umumiy vaqt — yuklab olishdan oldin matnni ko‘zdan kechiring"
    }
   }
  ]
 },
 "extract": {
  "seo": {
   "title": "Subtitrlardan oddiy matnni chiqarib olish – Ikki xil tartib, beshta tozalash – AI-SRTSub",
   "desc": "Subtitrlardan muloqotni toza oddiy matn sifatida ajratib oling: uzluksiz xatboshilar yoki har bir kesma uchun bitta qator va SDH kesmalari, suv belgilari, dublikatlar, prefikslar va qo‘shiq matnlari uchun beshta tugma nimani olib tashlashi.",
   "h1": "Subtitrlardan oddiy matnni qanday chiqarib olish mumkin",
   "intro": "Subtitr faylidan muloqotni toza oddiy matn sifatida tortib oling: kesma raqamlari, vaqt jadvallari va uslub teglari avtomatik ravishda olib tashlanadi, shuning uchun natija maqola sifatida o‘qiladi yoki muloqotlar ro‘yxati sifatida ishlaydi.",
   "ctaText": "Oddiy matn chiqaruvchini ochish"
  },
  "body": [
   {
    "h2": "Ushbu vosita nima qiladi",
    "ps": [
     "Subtitr faylidagi faqat muloqot o‘quvchi uchun muhim; qolganlari pleyer uchun mo‘ljallangan tuzilma — kesma raqamlari, vaqt jadvallari, uslub teglari. Ushbu sahifa tuzilmani olib tashlaydi va so‘zlarni saqlaydi."
    ]
   },
   {
    "h2": "Shunchaki yuklash emas, tashlab yuboring",
    "ps": [
     "Chap tarafdagi \"1 Subtitrlarni qo‘shish\" ustuni yuklangan faylni qabul qiladi va shuningdek, subtitr kontentini to‘g‘ridan-to‘g‘ri matn oynasiga qo‘yishingiz mumkin. Agar noto‘g‘ri faylni tanlagan bo‘lsangiz, \"Tozalash\" tugmasini bosing va qaytadan boshlang.",
     "Ushbu sahifa fayllarni UTF-8 sifatida o‘qiydi. Agar subtitrlar so‘roq belgilari yoki katakchalar devori sifatida ochilsa, kodlash buzilgan — uni oldin [[Garbled text repair|/repair.html]] da UTF-8 ga o‘tkazing, so‘ngra qaytib keling."
    ],
    "img": {
     "file": "extract-up",
     "alt": "Oddiy matn chiqaruvchining subtitrlarni qo‘shish sohasi",
     "cap": "Faylni yuklang yoki subtitr kontentini to‘g‘ridan-to‘g‘ri matn oynasiga qo‘ying"
    }
   },
   {
    "h2": "Ikki xil tartibdan birini tanlash",
    "ps": [
     "\"2 Chiqarib olish opsiyalari\"ning yuqori qismida tartib joylashgan: **Uzluksiz xatboshilar** matnni pauzalar va gap oxiri tinish belgilarida bo‘ladi, shuning uchun u maqola kabi o‘qiladi; **Har bir kesma uchun bitta qator** har bir subtitr yozuvi uchun bitta qatorni beradi, bu asl fayl yozuvlariga birma-bir mos keladi.",
     "Eslatmalar uchun muloqotni nusxalash, tarjimani mashq qilish yoki uni nasr sifatida o‘qish uzluksiz xatboshilarni talab qiladi; muloqot varaqasini tuzish, asl nusxasi bilan qatorma-qator taqqoslash yoki boshqa vositani oziqlantirish har bir kesma uchun bitta qatorni talab qiladi."
    ],
    "img": {
     "file": "extract-opt",
     "alt": "Chiqarib olish opsiyalari ostidagi tartib va tozalash tugmalari",
     "cap": "Bitta tartibni tanlang; quyidagi beshta tugma qanday turdagi kontent o‘chirilishini hal qiladi"
    }
   },
   {
    "h2": "Beshta tozalashning har biri nimani olib tashlaydi",
    "ps": [
     "**SDH kesmalarini olib tashlash**: \"(footsteps)\" yoki \"[music]\" kabi qavs ichidagi tovush tavsiflarini o‘chirib tashlaydi va muloqotni saqlaydi.",
     "**Suv belgilari va reklamalarni olib tashlash**: fan-subtitr mualliflik huquqlari, URL manzillar va kanal nomlari kabi qatorlarni tashlab yuboradi.",
     "**Takroriy qo‘shni qatorlarni olib tashlash**: bir xil gap ketma-ket ikki marta paydo bo‘lganda (ijro xatosi) faqat bitta nusxasi saqlanadi; uzoqroq masofadagi dublikatlar ma'no tashiydi va ularga tegilmaydi.",
     "**Spiker prefikslarini olib tashlash**: \"JOHN: Salom\" degan jumla \"Salom\" ga aylanadi. Odatiy bo‘lib o‘chirilgan — ssenariy uslubidagi matn kim gapirayotganini ko‘rsatishi kerak.",
     "**Qo‘shiq matni qatorlarini o‘tkazib yuborish**: to‘liq \"♪ … ♪\" bo‘lgan qatorlar o‘tkazib yuboriladi. Odatiy bo‘lib o‘chirilgan — qo‘shiq matnlari ham so‘zlar hisoblanadi."
    ],
    "img": {
     "file": "extract-clean",
     "alt": "Chiqarib olish opsiyalari ostidagi beshta tozalash tugmasi va ularning tavsiflari",
     "cap": "Har bir tugma o‘ng tomonida nimani olib tashlashini ko‘rsatadi; keraklilarini belgilang"
    }
   },
   {
    "h2": "Natijani olib ketish",
    "ps": [
     "O‘ng tarafdagi \"3 Natija\" ustuni chiqarilgan matnni jonli ravishda ko‘rsatadi va opsiyani o‘zgartirishingiz bilanoq qayta hisoblaydi.",
     "Agar mamnun bo‘lsangiz, .txt faylini saqlash uchun \"Yuklab olish\" yoki matnni o‘zingiz bilan olib ketish uchun \"Nusxalash\" tugmasini bosing. So‘zlarni bo‘shliqlar bilan ajratmaydigan xitoy va yapon tillari kabi tillar uchun qatorlarni birlashtirish boshqa qoidalarga amal qiladi va vosita buni har bir til uchun avtomatik ravishda bajaradi."
    ],
    "img": {
     "file": "extract-out",
     "alt": "Yuklab olish va nusxalash tugmalari joylashgan natija sohasi",
     "cap": "Natija jonli ravishda yangilanadi; uni txt sifatida yuklab oling yoki to‘g‘ridan-to‘g‘ri nusxalang"
    }
   },
   {
    "h2": "Tegilmagan holda qoladigan narsalar",
    "ps": [
     "Muloqotning o‘zi qayta yozilmaydi. Tozalash tugmalari faqat qaysi butun qatorlar yoki bloklar tashlab yuborilishini hal qiladi; ular hech qachon yozuv so‘zlarini o‘zgartirmaydi.",
     "Vaqt jadvallari va kesma raqamlari shunchaki chiqarilmaydi, o‘zgartirilmaydi va keyin chiqarilmaydi — asl faylga tegilmaydi va bu sahifa vaqt jadvallari bilan eksportni taklif qilmaydi. Bu vazifa [[Format conversion|/convert.html]] ga tegishli."
    ]
   },
   {
    "h2": "Ko‘p beriladigan savollar",
    "ps": [
     "**ASS uslub teglari matnda qoladimi?** Yo‘q. ASS `{}` bekor qilish bloklari olib tashlanadi va faqat muloqot qoladi.",
     "**Ikki tilli fayl ikkita qator yoki bitta qator bo‘lib chiqadimi?** Yozuvda nechta qator bo‘lsa, shuncha; bu sahifa ularni na birlashtiradi, na bo‘ladi — ularni ajratish uchun [[Bilingual split|/bilingual.html]] dan foydalaning.",
     "**Nima uchun spiker prefikslari odatiy bo‘lib saqlanadi?** \"JOHN: Salom\" dagi ism ko‘pincha foydali ma'lumot (ssenariylar, muloqot varaqlari) hisoblanadi va uni olib tashlash kim gapirayotganini aniqlashni qiyinlashtiradi, shuning uchun tanlov sizga qoldiriladi.",
     "**LRC qo‘shiq matni fayllarini ham chiqarib olish mumkinmi?** Ha. LRC vaqt teglari olib tashlanadi va qo‘shiq matni qatorlari qoladi; agar qo‘shiq matnini xohlamasangiz, \"Qo‘shiq matni qatorlarini o‘tkazib yuborish\" ni belgilang."
    ]
   },
   {
    "h2": "Maxfiylik",
    "ps": [
     "Subtitrlar to‘liq brauzerda qayta ishlanadi: hech narsa yuklanmaydi va hech narsa server orqali o‘tmaydi. Matn faqat joriy sahifada qoladi va sahifa yangilanganda tozalanadi."
    ]
   },
   {
    "h2": "Tegishli vositalar va qo‘llanmalar",
    "ps": [
     "Subtitr fayli aslida nimani o‘z ichiga olishini tushunish uchun [[What is inside an SRT file|/guides/srt-file-format.html]] ga qarang; chiqarib olingan muloqotni tarjima qilish uchun [[Subtitle translation|/translate.html]] ga o‘ting; uni jadvalga aylantirish uchun [[Subtitles to Excel/CSV|/guides/srt-to-excel.html]] dan foydalaning va har qanday narsani topshirishdan oldin [[Subtitle QC|/qc.html]] ni bajaring."
    ]
   }
  ]
 },
 "extract-subtitles-from-video": {
  "seo": {
   "title": "Videodan subtitrlarni chiqarib olish – Ichki va tashqi – AI-SRTSub",
   "desc": "MKV / WebM / MP4 / MOV har biri nimani o‘z ichiga oladi, matn, ASS, WebVTT va mov_text yo‘laklari qanday farq qiladi, nima uchun rasm subtitrlari (PGS / DVD) matnga ega emas va chiqarib olingandan keyin nima qilish kerakligi.",
   "h1": "Videodan subtitrlarni chiqarib olish",
   "intro": "Subtitrlar video fayl ichida yashashi yoki uning tashqarisida mustaqil turishi mumkin. Ichkarida ular konteynerdagi yo‘lak hisoblanadi — ularni chiqarib olish transkodlashga hech qanday aloqasi yo‘q.",
   "ctaText": "Video subtitrlarni chiqarib olishni ochish"
  },
  "body": [
   {
    "h2": "Subtitrlar qayerda yashaydi: ichki va tashqi",
    "ps": [
     "Video fayl (MKV, MP4) bir vaqtning o‘zida video yo‘lagi, audio yo‘lagi va subtitr yo‘laklarini ushlab turadigan konteyner hisoblanadi. Ichkarida muhrlangan subtitrlar **ichki** deyiladi; tashqarida turgan alohida .srt / .ass fayli **tashqi** deyiladi va ichki yo‘lak shuningdek **qo‘shilgan (muxed in)** deb ham ataladi.",
     "Tashqi subtitrlardan qanday bo‘lsa, shunday foydalanish mumkin. Muammo ichki subtitrlarda: ularni tahrirlash, tarjima qilish yoki asl nusxadan ikki tilli yo‘lak qurish uchun qo‘lingizda subtitr fayli yo‘q — avval yo‘lakni konteynerdan o‘qib chiqishingiz kerak. Ushbu qadam transkodlash emas: video qayta kodlanmaydi, faqat konteynerda allaqachon saqlangan ma'lumotlar o‘qib chiqiladi."
    ]
   },
   {
    "h2": "Qaysi konteyner nimani o‘z ichiga oladi",
    "ps": [
     "Turli xil konteynerlar turli xil subtitr formatlarini ushlab turadi va chiqarib olish qiyinligi ham farq qiladi:"
    ],
    "img": {
     "file": "videosub-which",
     "alt": "Ichki subtitrlarni chiqarib olish sahifasi tomonidan ko‘rsatilgan subtitr yo‘laklari",
     "cap": "Har bir qator uchun bitta yo‘lak, odatda til va yo‘lak nomi bilan; faqat bitta bo‘lganda u avtomatik ravishda chiqarib olinadi"
    }
   },
   {
    "h2": "Nima uchun rasm subtitrlarini chiqarib olish mumkin emas",
    "ps": [
     "Blu-ray PGS va DVD subtitrlari umuman hech qanday belgini saqlamaydi, faqat alfa kanaliga ega bir qator rasmlarni saqlaydi. Pleyer ularni ko‘rsatganda, u matnni render qilmayapti, balki rasmni yopishtiryapti.",
     "Shuning uchun bunday yo‘lakda o‘qish uchun matn yo‘q — vosita buni qo‘llab-quvvatlamaydi degani emas, balki u yerda hech qanday belgi yo‘q. Sahifa shunday holatga duch kelganda buni ochiq-oydin aytadi.",
     "So‘zlarni olishning yagona yo‘li – birinchi navbatda o‘sha rasmlardagi belgilarni tanib olish (OCR) va shundan subtitrlarni qurish. Bu yo‘lakni chiqarib olishdan alohida jarayon."
    ]
   },
   {
    "h2": "Chiqarib olingandan keyin odatda nima keladi",
    "ps": [
     "Nima chiqsa, o‘sha yo‘lak chiqadi: vosita kodlashlarni taxmin qilmaydi va vaqt jadvallarini tuzatmaydi. Shuning uchun ikkita narsa tez-tez yuzaga keladi:",
     "Biri — **buzilgan matn** — manba yo‘lakdagi kodlash muammosi bo‘lib, baribir buzilgan holda chiqadi; kodlashni aniqlash uchun [[How to repair garbled text|/guides/repair.html]] ga o‘ting. Ikkinchisi — **noto‘g‘ri vaqt** — manbada kirish logotipi bo‘ladimi yoki kadrlar tezligi mos kelmaydimi, natija butunligicha suriladi; uni surish yoki masshtablash uchun [[Timeline adjustment|/shift.html]] dan foydalaning.",
     "Shundan so‘ng, tarjima qilish uchun [[Subtitle translation|/translate.html]] ga o‘ting va uni ikki tilli qilish uchun [[Two ways to make bilingual subtitles|/guides/make-bilingual-subtitles.html]] ga qarang."
    ],
    "img": {
     "file": "videosub-formats",
     "alt": "SRT / VTT / ASS / TXT eksport formatlari joylashgan natija sohasi",
     "cap": "Chiqarib olingan subtitrlar to‘rtta formatda eksport qilinishi mumkin; ASS manbasi o‘zining uslub sarlavhasi va o‘lchamini saqlab qoladi"
    }
   },
   {
    "h2": "Xatoga yo‘l qo‘yish oson bo‘lgan bir nechta narsa",
    "ps": [
     "**Subtitrlarni chiqarib olish ularni video ustiga yopishtirish (burning in) emas.** Video qayta kodlanmaydi, shuning uchun rasm sifati va audio ta'sir qilmaydi.",
     "**Chiqarib olish asl faylga ta'sir qilmaydi.** Faqat o‘qish uchun, hech qachon yozilmaydi va videoning bir bayti ham o‘zgarmaydi.",
     "**Katta faylning sekin ishlashi ulanish muammosi emas.** Vosita yo‘lak ma'lumotlarini bo‘lakma-bo‘lak skanerlaydi va fayl qanchalik katta bo‘lsa, shuncha ko‘p vaqt oladi; bularning barchasi lokal ravishda sodir bo‘ladi.",
     "**Tashqi subtitrlarga ushbu sahifa kerak emas.** Agar .srt / .ass faylingiz bo‘lsa, to‘g‘ridan-to‘g‘ri [[Format conversion|/convert.html]] ga o‘ting; faqat video ichida muhrlangan subtitrlarni oldindan chiqarib olish kerak."
    ]
   },
   {
    "h2": "Tegishli vositalar va qo‘llanmalar",
    "ps": [
     "To‘liq qo‘llanma uchun [[How to extract subtitles embedded in a video|/guides/videosub.html]] ga qarang; chiqargan narsangizni tarjima qilish uchun [[Subtitle translation|/translate.html]] ga o‘ting, uni ikki tilli qilish uchun [[Two ways to make bilingual subtitles|/guides/make-bilingual-subtitles.html]] ga qarang; buzilgan matn uchun [[Garbled text repair|/repair.html]] bilan boshlang."
    ]
   }
  ]
 },
 "fps-23-976-vs-25": {
  "seo": {
   "title": "23.976 / 24 / 25 / 30 kadr/s (fps) aslida nimani anglatadi – Subtitr vaqti – AI-SRTSub",
   "desc": "23.976 bu 24 emas va 29.97 bu 30 emas — yetishmayotgan 0.1% NTSC rangidan kelib chiqadi, PAL esa filmlarni 4% tezlikda ishlatadi. Bular subtitr vaqtingizni qanday o‘zgartirishi va ular o‘rtasida qanday konvertatsiya qilish mumkinligi.",
   "h1": "23.976 / 24 / 25 / 30 kadr/s aslida nimani anglatadi",
   "intro": "23.976 va 24 orasidagi 0.1% bo‘shliq televideniye tarixidan qolgan merosdir. PAL ning 4% bilan birgalikda bu film davom etgani sari subtitrlarning sinxronizatsiyadan yana-da uzoqlashishining sababidir.",
   "ctaText": "Vaqtni sozlashni ochish"
  },
  "body": [
   {
    "h2": "Har bir raqam nimani anglatadi",
    "ps": [
     "Kadrlar tezligi bir sekundda nechta rasm ko‘rsatilishidir. Siz eng ko‘p uchraydigan to‘rttasi:"
    ]
   },
   {
    "h2": "0.1% qayerdan kelib chiqadi",
    "ps": [
     "23.976 = 24 × 1000/1001 va 29.97 = 30 × 1000/1001. Bu 1000/1001 NTSC ga rang qo‘shishdan qolgan merosdir: mavjud oq-qora qabul qilgichlarni buzmasdan rang sub-tashuvchisini sig‘dirish uchun maydon tezligi 60 Gts dan 59.94 Gts gacha (60 × 1000/1001) tushirildi va kadrlar tezligi ham u bilan birga pasaydi.",
     "Natija: filmlar NTSC hududlarida 24 o‘rniga 23.976 tezlikda efirga uzatiladi. Farq 0.1% yoki bir soat ichida 3.6 sekundni tashkil qiladi — o‘z-o‘zidan deyarli sezilmaydi, lekin uni quyidagi 4% bilan adashtirmang va hech qachon ikkalasini bitta hisob-kitobda birlashtirmang."
    ]
   },
   {
    "h2": "4% qayerdan kelib chiqadi",
    "ps": [
     "PAL hududlari ekranga 25 kadr/s tezlikda chiqaradi. Filmlar 24 kadr/s tezlikda tasvirga olinadi va shunchaki 25 tezlikda ijro etiladi — birorta kadr qo‘shilmagan yoki olib tashlanmagan, shuning uchun ijro 4% tezroq ishlaydi (25/24 ≈ 1.0417). 100 daqiqalik film o‘zining PAL versiyasida 96 daqiqa ishlaydi.",
     "Bu **progressiv siljish** ning ildizi hisoblanadi: asl nusxaga nisbatan qilingan subtitrlar va PAL versiyadagi video boshlanishida aynan mos keladi va titrlar paytida to‘rt daqiqa farq qiladi. Hech qanday global siljish buni saqlab qola olmaydi; u nisbat bo‘yicha qayta masshtablanishi kerak."
    ],
    "img": {
     "file": "shift-step-rate",
     "alt": "Vaqt sahifasining tezlik bo‘limi: nisbat kiritish oynasi",
     "cap": "Nisbat bo‘yicha qayta masshtablash — bitta qiymat butun filmni qamrab oladi"
    }
   },
   {
    "h2": "Qanday konvertatsiya qilish kerak",
    "ps": [
     "Konvertatsiya qilish butun film bo‘ylab qo‘llaniladigan bitta nisbatga ko‘paytirishni anglatadi:"
    ]
   },
   {
    "h2": "Qaysi biriga ega ekanligingizni aniqlash",
    "ps": [
     "Nisbatni taxmin qilishdan ko‘ra, to‘g‘ri vaqtiga amin bo‘lgan ikkita momentni toping — odatda muloqotning birinchi va oxirgi qatorlari — va vositaga \"bu qator 00 :00 :12 da va u biri 01 :35 :40 da bo‘lishi kerak\" deb ayting; u butun filmni shu ikki nuqta orasida chiziqli ravishda cho‘zadi. Bu \"ikki nuqtali bog‘lash\" (two-point anchoring) bo‘lib, sizdan hech qanday kadrlar tezligi arifmetikasini talab qilmaydi.",
     "Kadrlar tezligini o‘zingiz tasdiqlash uchun pleyeringizni yoki media ma'lumotlari vositasini tekshiring. Agar `1080p.WEB` kabi fayl nomi hech qanday kadrlar tezligi ishorasini olib yurmasa, ikki nuqtali bog‘lash xavfsizroq yo‘l hisoblanadi."
    ],
    "img": {
     "file": "shift-step-two",
     "alt": "Vaqt sahifasining ikki nuqtali bog‘lash bo‘limi: vaqt tamg‘asi kiritishlarining ikkita qatori",
     "cap": "Ikki nuqtali bog‘lash kadrlar tezligini talab qilmaydi — shunchaki ikkita vaqt tamg‘asi"
    }
   },
   {
    "h2": "Tegishli vositalar va qo‘llanmalar",
    "ps": [
     "Kadrlar tezligini konvertatsiya qilishning o‘zi — [[Subtitle frame rate conversion|/guides/srt-fps-converter.html]]; tezlikni sozlash — [[Subtitle speed conversion|/guides/subtitle-speed-converter.html]]; bu global siljishmi yoki progressiv siljishmi, noma'lum bo‘lsa — [[Subtitles drifting further out of sync|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "glossary": {
  "seo": {
   "title": "Subtitrlarda atamalarni paketli almashtirish – Bitta jadval faylni tuzatadi – AI-SRTSub",
   "desc": "Har bir qator uchun bitta qoida, -> , => , → yoki Tab bilan ajratilgan, izohlar uchun # bilan. To‘q so‘z bo‘yicha mos kelish, registrga sezgirlik, ikki tilli kesmaning birinchi yoki ikkinchi qatori, har bir o‘zgarish ro‘yxatga olingan va qaytarilishi mumkin.",
   "h1": "Subtitrlarda atamalarni qanday qilib paketli almashtirish mumkin",
   "intro": "Bitta atamalar jadvali butun subtitr faylining matnini birato‘la izchil qiladi — vaqt jadvallari, ASS uslublari va VTT NOTE bloklariga bitta belgi ham tegilmaydi.",
   "ctaText": "Atamalarni paketli almashtirishni ochish"
  },
  "body": [
   {
    "h2": "Ushbu vosita nima qiladi",
    "ps": [
     "Xuddi shu so‘z ikki xil tarjima qilingan, mashina tarjimasi bilan siljib ketgan ismlar va joylar, o‘z konvensiyalaringizga mos kelishi kerak bo‘lgan boshqa birovning subtitrlari — bularning barchasi bitta umumiy xususiyatga ega: o‘zgaradigan narsa so‘z, tuzilma emas. Ushbu sahifa faqat so‘zlarni o‘zgartiradi."
    ]
   },
   {
    "h2": "Ikkita kiritish: subtitrlar va atamalar jadvali",
    "ps": [
     "Chap tarafdagi \"1 Subtitrlarni qo‘shish\" ustuni subtitr faylini qabul qiladi yoki kontentni to‘g‘ridan-to‘g‘ri qo‘yishingiz mumkin; agar noto‘g‘ri faylni tanlagan bo‘lsangiz, \"Tozalash\" tugmasini bosing.",
     "O‘ng tarafdagi \"2 Atamalar jadvali\" ustuni qoidalarni saqlaydi. **Har bir qator uchun bitta qoida**, eski atama va yangi atama `->` , `=>` , `→` yoki Tab bilan ajratilgan — barchasi ishlaydi. `#` bilan boshlanadigan qatorlar izohlar hisoblanadi va almashtirishda qatnashmaydi.",
     "Agar format haqida shubhangiz bo‘lsa, \"Namuna bilan to‘ldirish\" tugmasini bosing va uni tahrirlang."
    ],
    "img": {
     "file": "glossary-up",
     "alt": "Atamalarni almashtirish sahifasining subtitrlarni qo‘shish sohasi va atamalar jadvalini kiritish joyi",
     "cap": "Chapda subtitrlar, o‘ngda qoidalar; har bir qator uchun bitta qoida, eski atama va yangi atama -> bilan ajratilgan"
    }
   },
   {
    "h2": "Atamalar jadvalini qanday yozish kerak",
    "ps": [
     "Har bir qator uchun bitta qoida: chap tomonda joriy atama, o‘ng tomonda u nimaga aylanishi kerakligi. Masalan, `Thor -> Donar` fayldagi har bir \"Thor\" ni \"Donar\" ga almashtiradi.",
     "Izohlar `#` bilan boshlanadi va qoidalar guruhini belgilash uchun (masalan, \"# season 1 name fixes\") va qoidani vaqtincha o‘chirib qo‘yish uchun qulay — shunchaki o‘chirish o‘rniga oldiga `#` qo‘ying.",
     "Qoidalar yuqoridan pastga ishlaydi; bitta qoida ishlab chiqqan matn pastdagi qoidalar tomonidan yana skanerlanadi. Tartib muhim bo‘lganda (aytaylik, avval A ni B ga va keyin B ni C ga almashtirish), buni yodda tuting."
    ],
    "img": {
     "file": "glossary-table",
     "alt": "Atamalar jadvali kiritish joyidagi ketma-ket almashtirish qoidalari qatorlari",
     "cap": "Har bir qator uchun bitta qoida; # bilan boshlanadigan qatorlar izohlar hisoblanadi va qoidani vaqtincha o‘chirib qo‘yishi mumkin"
    }
   },
   {
    "h2": "Uchta tugma nima qiladi",
    "ps": [
     "**Qamrov (Scope)**: `all` / `first line only` / `second line only`. Ikki tilli faylda, agar faqat tarjimani o‘zgartirmoqchi bo‘lsangiz, \"faqat ikkinchi qator\" ni tanlang; faqat bitta qatorga ega yozuvlar har qanday bir qatorli sozlama ostida o‘zgacha qoladi — vosita qaysi tomon asl nusxasi ekanligini taxmin qilmaydi.",
     "**Butun so‘z (Whole word)**: faqat mustaqil so‘z sifatida turgan atamalarni almashtiradi, shuning uchun `art` `start` ga tegmaydi. So‘zlarni bo‘shliqlar bilan ajratmaydigan xitoy va yapon tillari kabi tillar uchun bu tugma ta'sir qilmaydi — u yerda almashtirish kenja satrlarda (substrings) ishlaydi.",
     "**Registrga sezgir (Case sensitive)** standart bo‘yicha o‘chirilgan, shuning uchun `CEO` va `ceo` ikkalasi ham almashtiriladi; belgilanganda, faqat aynan bir xil imlo almashtiriladi."
    ],
    "img": {
     "file": "glossary-opt",
     "alt": "Atamalar jadvali ostidagi qamrov, butun so‘z va registrga sezgir tugmalari",
     "cap": "Qamrov qaysi qator o‘zgarishini hal qiladi; butun so‘z va registr atama qanchalik qat'iy mos kelishini belgilaydi"
    }
   },
   {
    "h2": "Har bir o‘zgarish ro‘yxatga olingan, har bir o‘zgarish qaytarilishi mumkin",
    "ps": [
     "\"3 Natija\" almashtirilgan subtitrlarni ko‘rsatadi va shuningdek, **har bir o‘zgarishni ro‘yxatga oladi**: qaysi kesma, qaysi qator, nimadan nimaga.",
     "Ulardan birini xohlamasangiz, faqat o‘sha yozuvni orqaga qaytarish uchun ro‘yxatdagi ustiga bosing — atamalar jadvalini tahrirlash va qayta ishga tushirish shart emas. Agar mamnun bo‘lsangiz, \"Yuklab olish\" yoki \"Nusxalash\" tugmasini bosing."
    ],
    "img": {
     "file": "glossary-out",
     "alt": "Alohida o‘zgarishlar ro‘yxati joylashgan natija sohasi",
     "cap": "Har bir o‘zgarish ro‘yxatga olingan; uni orqaga qaytarishni xohlamagan birortasini bosing"
    }
   },
   {
    "h2": "Tegilmagan holda qoladigan narsalar",
    "ps": [
     "**Vaqt jadvallari, ASS uslubi qatorlari va VTT `NOTE` bloklariga bitta belgi ham tegilmaydi.** Almashtirish faqat muloqot matniga nisbatan qo‘llaniladi, struktura qatorlariga hech qachon qo‘llanilmaydi.",
     "Atamalar jadvali subtitr faylingizni hech qachon avtomatik ravishda o‘zgartirmaydi — natija yangi chiqish bo‘lib, asl nusxasi qanday bo‘lsa, shunday qoladi."
    ]
   },
   {
    "h2": "Ko‘p beriladigan savollar",
    "ps": [
     "**Nima uchun atama almashtirilmadi?** Avval qamrovni tekshiring: \"faqat ikkinchi qator\" tanlangan bo‘lsa, faqat bitta qatorga ega yozuvlar o‘zgacha qoladi. Keyin mustaqil so‘z bo‘lmagan mosliklarni to‘xtatadigan butun so‘z bo‘yicha mos kelishni tekshiring.",
     "**Nima uchun butun so‘z bo‘yicha mos kelish yoqilgan bo‘lsa ham xitoy tili kenja satrlarni almashtirishda davom etmoqda?** Bu kutilgan holat. Xitoy va yapon tillari so‘zlarni bo‘shliqlar bilan ajratmaydi, shuning uchun vosita so‘z chegaralarini aniqlay olmaydi va butun so‘z bo‘yicha mos kelish u yerda ta'sir qilmaydi.",
     "**Xatodan keyin hamma narsani qanday qilib oldingi holatga qaytarishim mumkin?** O‘zgarishlar ro‘yxatida yozuvlarni birma-bir orqaga qaytaring; to‘liq boshidan boshlash uchun atamalar jadvalini tozalang va subtitrlarni yana qo‘shing.",
     "**ASS uslubi qatorlari tasodifan o‘zgartirilishi mumkinmi?** Yo‘q. Uslub qatorlari va `NOTE` bloklari qamrovdan tashqarida; faqat muloqot matni qatnashadi."
    ]
   },
   {
    "h2": "Maxfiylik",
    "ps": [
     "Subtitrlar va atamalar jadvali to‘liq brauzerda qayta ishlanadi: hech narsa yuklanmaydi va hech narsa server orqali o‘tmaydi. Atamalar jadvali saqlanmaydi, shuning uchun sahifani keyingi safar ochganingizda u bo‘sh bo‘ladi."
    ]
   },
   {
    "h2": "Tegishli vositalar va qo‘llanmalar",
    "ps": [
     "Atamalar jadvalini qurish kerakmi va uni mavsum davomida qanday saqlash kerak, [[Term tables: keeping a season consistent|/guides/subtitle-glossary.html]] ga qarang; agar kontent iflos bo‘lsa (suv belgilari, SDH kesmalari) avval [[Subtitle cleaning|/clean.html]] ni bajaring; ismlar hal qilingach va boshqa tillar kerak bo‘lganda [[Subtitle translation|/translate.html]] ga o‘ting; va natijani [[Subtitle QC|/qc.html]] orqali o‘tkazing."
    ]
   }
  ]
 },
 "hanconv": {
  "seo": {
   "title": "Soddalashtirilgan–An'anaviy subtitrlarni konvertatsiya qilish – Tayvan va Gonkong – AI-SRTSub",
   "desc": "To‘qqizta yo‘nalish bo‘yicha qo‘llanma: hududiy lug‘atsiz yoki lug‘atli tayvancha, o‘ziga xos xususiyat sifatida gonkongcha, ularning barchasini soddalashtirilganiga qaytarib konvertatsiya qilish mumkin. Faqat muloqot o‘zgaradi; vaqt jadvallari o‘z joyida qoladi.",
   "h1": "Soddalashtirilgan va an'anaviy xitoycha subtitrlarni qanday konvertatsiya qilish mumkin",
   "intro": "Subtitr Tayvanga, Gonkongga yoki materikka borishidan qat'iy nazar, ham so‘zni, ham belgi shakllarini o‘zgartiradi. Tanlash uchun to‘qqizta yo‘nalish va faqat muloqot konvertatsiya qilinadi — vaqt jadvallari, indeks raqamlari va ASS uslubi qatorlariga hech qachon tegilmaydi.",
   "ctaText": "Konverterni ochish"
  },
  "body": [
   {
    "h2": "Ushbu vosita nima qiladi",
    "ps": [
     "Soddalashtirilgan va an'anaviy o‘rtasida konvertatsiya qilish shunchaki har bir belgini boshqacha yozish emas. Xuddi shu soddalashtirilgan so‘z turli hududlarda turli so‘zlarga mos keladi — \"dasturiy ta'minot\" (software) so‘zi Tayvan va materik o‘rtasida farq qiladi va Gonkongda yana boshqa versiyasi mavjud. Konverter bularni alohida saqlaydi:"
    ]
   },
   {
    "h2": "Yuklash va aniqlash",
    "ps": [
     "Faylni sudrab tashlang yoki birini qidiring — SRT, VTT, ASS va TXT qo‘llab-quvvatlanadi — yoki subtitr kontentini to‘g‘ridan-to‘g‘ri katakchaga qo‘ying. Format avtomatik ravishda aniqlanadi va \"Aniqlangan format\" yonida ko‘rsatiladi."
    ],
    "img": {
     "file": "hanconv-up",
     "alt": "Konverterni yuklash sohasi: tashlab yuborish zonasi va qo‘yish oynasi, yuqorida aniqlangan format bilan",
     "cap": "SRT / VTT / ASS / TXT, format avtomatik ravishda aniqlanadi"
    }
   },
   {
    "h2": "To‘qqizta yo‘nalishdan birini tanlash",
    "ps": [
     "\"Quyidagiga konvertatsiya qilish\" ostidagi to‘qqizta yo‘nalish uchta guruhga bo‘linadi. **Soddalashtirilgan → an'anaviy**: umumiy an'anaviy, tayvancha (so‘zni o‘zgartirish), tayvancha (faqat gliflar), gonkongcha. **An'anaviy → soddalashtirilgan**: umumiy, tayvanchadan, gonkongchadan. **An'anaviydan an'anaviyga**: tayvan shakllari, gonkong shakllari.",
     "\"Tayvancha so‘zlar\" ni tanlash hududiy lug‘atni ham almashtiradi: \"dasturiy ta'minot\" so‘zi tayvancha so‘zga aylanadi va \"ma'lumot\" so‘zi ham shunday bo‘ladi; \"Tayvan gliflari\" faqat belgilar qanday yozilishini o‘zgartiradi va so‘zlaringizni o‘z holicha qoldiradi. Gonkong esa butunlay boshqa holat bo‘lib, \"dasturiy ta'minot\" uchun boshqa so‘zni ishlatadi. Soddalashtirilganiga qaytarib konvertatsiya qilish uchun quyidagi guruhdan foydalaning — qaysi an'anaviy turdan kelayotganingizni aytishingiz kerak, chunki tayvancha va gonkongcha matnlar orqaga qaytish uchun turli yo‘llarni oladi."
    ],
    "img": {
     "file": "hanconv-dir",
     "alt": "\"Soddalashtirilgan → Tayvancha an'anaviy (so‘zni o‘zgartirish)\" tanlanganligini ko‘rsatadigan konvertatsiya qilish kartasi",
     "cap": "Yo‘nalishlar uchta guruhdagi \"Quyidagiga konvertatsiya qilish\" ochiladigan menyusida yashaydi; bu so‘zlarni o‘zgartirish bilan tayvanchadir"
    }
   },
   {
    "h2": "Natija va eksport",
    "ps": [
     "Natija sohasi konvertatsiya qilingan subtitrni darhol ko‘rsatadi, umumiy qatorlar soni va nechta qator o‘zgarganligini ko‘rsatadigan statistika paneli mavjud. Agar mutlaqo hech narsa o‘zgarmagan bo‘lsa, faylda xitoycha belgilar bo‘lmasligi mumkinligi haqida maslahat olasiz — faqat xan belgilari konvertatsiya qilinadi, shuning uchun barchasi lotin yoki raqamli subtitr aynan qanday bo‘lsa, shunday qoladi.",
     "Keyin yuklab oling yoki nusxalang. Fayl nomiga til yorlig‘i kiritiladi — tayvancha an'anaviy uchun `demo.srt` `demo.zh-TW.srt` ga aylanadi, umumiy an'anaviy uchun `.zh-Hant` va soddalashtirilganiga qaytarib konvertatsiya qilinganda `.zh-Hans` ga aylanadi."
    ],
    "img": {
     "file": "hanconv-out",
     "alt": "Natija sohasi: konvertatsiya qilingan subtitr va statistika paneli",
     "cap": "Statistika paneli umumiy va o‘zgargan qatorlar sonini ko‘rsatadi; bu yerdan yuklab oling yoki nusxalang"
    }
   },
   {
    "h2": "Hech qachon tegilmaydigan narsalar",
    "ps": [
     "Faqat muloqot konvertatsiya qilinadi. Vaqt jadvallari, indeks raqamlari va ASS uslubi qatorlariga umuman tegilmaydi — natija hech qanday formatlashni qayta bajarmasdan foydalanishga tayyor."
    ]
   },
   {
    "h2": "Ko‘p beriladigan savollar",
    "ps": [
     "**Nima uchun konverter \"tozalash\" (clean) so‘zini o‘zgartirmadi?** Bir-ko‘p moslashuvlar so‘z bo‘yicha hal qilinadi: \"toza\" ma'nosi va \"quruq\" ma'nosi bitta an'anaviy shaklni baham ko‘radi, \"daraxt tanasi\" ma'nosi esa boshqasini ishlatadi. Jadvallar OpenCC dan kelib chiqib, yagona belgilardan ko‘ra butun iboralarga mos keladi.",
     "**Tayvancha va gonkongcha an'anaviy o‘rtasidagi farq nima?** Lug‘at: \"dasturiy ta'minot\" so‘zi ikkalasi o‘rtasida farq qiladi. Yetkazib berayotgan hududingiz uchun yo‘nalishni tanlang.",
     "**Konvertatsiyadan keyin belchalar soni o‘zgardi?** Faqat xan belgilari almashtiriladi — hech qanday yozuv qo‘shilmaydi yoki olib tashlanmaydi va vaqt siljishmaydi. Agar qatorlar soni o‘zgargan bo‘lsa, format to‘g‘ri aniqlanganligini tekshiring.",
     "**Lug‘at yuklanmadi?** Sahifa sizga yangilashni va qayta urinib ko‘rishni aytadi. U lokal ravishda yuklanadi, shuning uchun subtitrlarni qayerga bo‘lsa ham yuklashga hojat yo‘q."
    ]
   },
   {
    "h2": "Maxfiylik",
    "ps": [
     "Konvertatsiya to‘liq brauzeringizda ishlaydi. Hech qanday subtitr kontenti hech qachon serverga yuborilmaydi."
    ]
   },
   {
    "h2": "Tegishli vositalar va qo‘llanmalar",
    "ps": [
     "Agar sizga faqat soddalashtirilganidan an'anaviyiga kerak bo‘lsa, [[Convert simplified subtitles to traditional|/guides/srt-simplified-to-traditional.html]] ga qarang; nega bu shunchaki belgilarni almashtirishdan ko‘ra ko‘proq narsani anglatishini bilish uchun [[Simplified vs traditional is not a character swap|/guides/simplified-traditional-chinese.html]] ga qarang; boshqa tilga tarjima qilish uchun [[Subtitle translation|/translate.html]] ga qarang."
    ]
   }
  ]
 },
 "how-to-make-lrc-file": {
  "seo": {
   "title": "LRC qo'shiq matnlarini qanday sinxronizatsiya qilish mumkin – Har bir qator uchun bitta matn, ritmga mos ravishda bosing – AI-SRTSub",
   "desc": "Noldan LRC faylini yaratish: har bir qatordan bitta matnni qo'ying, tinglayotganingizda vaqtni bosing, muhim yorliqlar, qachon qatordan o'tkazib yuborish kerak, LRC yoki SRT va vaqt surilganda nima qilish kerak.",
   "h1": "LRC qo'shiq matnlarini qanday sinxronizatsiya qilish mumkin",
   "intro": "LRC fayli shunchaki \"bitta matn qatori va bitta vaqt nuqtasi\" demakdir. Uni yaratish sinxronizatsiya deb ataladi: har bir qator boshlanadigan lahjani aniqlash.",
   "ctaText": "Matnni sinxronizatsiya qilish vositasini ochish"
  },
  "body": [
   {
    "h2": "Vaqt aslini olganda nima ekanligi",
    "ps": [
     "LRC faylining tuzilishi juda sodda bo'lishi mumkin: har bir qatorda bitta matn, ularning har birining oldida `[mm:ss.xx]` vaqt belgisi mavjud. Pleyer qatorga yetib borganda, o'sha lahzada matnni ko'rsatadi.",
     "Demak, \"LRC yaratish\" ning butun vazifasi har bir matn qatoriga vaqt nuqtasini belgilashdan iborat — va buni hech qanday mashina siz uchun qila olmaydi, chunki qator qayerdan boshlanib kuylanishini aniqlash tinglashni talab qiladi."
    ]
   },
   {
    "h2": "Qo'shiqqa qancha urinish kerakligi",
    "ps": [
     "Boshlashdan oldin bir daqiqa o'ylab ko'rishga arziydi; bu ko'p qayta ishlash ishlarini kamaytiradi:"
    ],
    "img": {
     "file": "lrc-tap2",
     "alt": "Ritmga mos bosish sohasidagi ijro etish, ushbu qatorni belgilash, bitta qatorni bekor qilish va ushbu qatordan o'tkazib yuborish boshqaruv elementlari",
     "cap": "Ijro paytida Enter tugmasini bosish eng qulay usul; noto'g'ri qator belgilandimi? Z tugmasini bosing va qaytadan belgilang"
    }
   },
   {
    "h2": "Matnni joylashtirish qolgan jarayonning qanchalik silliq kechishini hal qiladi",
    "ps": [
     "Matnni har bir qatorga bitta taronadan joylashtiring; bo'sh qatorlar o'tkazib yuboriladi. Siz joylashtirgan qator tanaffuslari keyinchalik vaqt belgilaydigan qatorlar bo'ladi — ularni hozir ko'proq qatorlarga bo'lib chiqing va keyinroq ko'proq marta bosasiz.",
     "Mavjud LRCni joylashtirish ham ishlaydi: uning `[mm:ss.xx]` vaqt belgilari tan olinadi va importdan keyin siz **vaqt belgilanmagan birinchi qatordan davom etasiz**, shuning uchun vaqti belgilab bo'lingan qatorlarni qaytadan bajarish shart emas.",
     "Bu shuni anglatadiki, yarim chala qolgan LRC saqlanishi va keyinroq davom etish uchun qayta joylashtirilishi mumkin."
    ],
    "img": {
     "file": "lrc-paste2",
     "alt": "Matnni joylashtirish sohasi va matnni tahlil qilish tugmasi",
     "cap": "Har bir qator uchun bitta matn; butun LRCni joylashtirganingizda mavjud vaqtlar o'qiladi, shuning uchun davom etishingiz mumkin"
    }
   },
   {
    "h2": "LRC yoki SRT ni eksport qilish",
    "ps": [
     "**Musiqa pleyeri uchun LRCni eksport qiling.** foobar2000, har xil turdagi pleyerlar va matn ko'rsatadigan qurilmalar uni o'qiydi.",
     "**Matnni video ustiga qo'yish yoki uni qo'shimcha qayta ishlash uchun SRTni eksport qiling.** Video subtitr treklari, subtitr vositalari va tahrirlash dasturlari SRTni o'qiydi. Eksportda har bir qator keyingisi boshlanguncha davom etadi va oxirgi qator 2 sekundga qaytadi.",
     "Ikkalasi ham faqat vaqti bor qatorlarni eksport qiladi — o'tkazib yuborilgan qatorlar hech qachon faylga kirmaydi."
    ],
    "img": {
     "file": "lrc-export",
     "alt": "Eksport sohasidagi LRC-ni yuklab olish, SRT-ni yuklab olish va nusxalash tugmalari",
     "cap": "Pleyerlar uchun LRC, video uchun SRT; faqat vaqti bor qatorlar eksport qilinadi"
    }
   },
   {
    "h2": "Xato qilish oson bo'lgan ba'zi narsalar",
    "ps": [
     "**Vaqt belgilangandan keyin hamma narsa biroz siljiganmi? Siljishdan foydalaning.** SRTni eksport qiling va uni [[Timeline adjustment|/shift.html]] yordamida butunlay suring; qatorma-qator vaqtni qayta belgilashdan ko'ra ancha tezroq.",
     "**Qo'shiq davom etgan sari siljish o'sib bormoqda muammosi? Bu tezlik muammosi.** Ijro etish tezligi va yozib olish tezligi farq qilganda, xatolik oxiriga qarab o'sib boradi va bu siljishni emas, balki proporsional masshtablashni talab qiladi.",
     "**Yorliqlar faqat ulardan birgalikda foydalangandagina tabiiy tuyuladi.** Probel ijro etadi va to'xtatib turadi, Enter joriy qatorni belgilaydi, Z bitta qatorni bekor qiladi — sichqoncha va klaviatura o'rtasida o'tish o'rniga ijro paytida Enter tugmasini to'g'ridan-to'g'ri bosing.",
     "**Audio sifati aniqlikka ta'sir qiladi.** Aniq vokalga ega manbani kuzatish osonroq; jonli ijrolar va baland fon musiqa treklari bo'lgan manbalar sezilarli darajada qiyinroq."
    ]
   },
   {
    "h2": "Tegishli vositalar va qo'llanmalar",
    "ps": [
     "To'liq ko'rsatma uchun [[How to use the lyric sync tool|/guides/lrc.html]] ga qarang; mavjud LRCni subtitrlarga aylantirish uchun [[LRC to SRT|/guides/lrc-to-srt.html]] ga qarang; agar eksport qilingan SRT vaqti noto'g'ri bo'lsa, [[Timeline adjustment|/shift.html]] dan foydalaning; va natijani [[Subtitle QC|/qc.html]] orqali tekshiring."
    ]
   }
  ]
 },
 "lrc": {
  "seo": {
   "title": "Matnni sinxronizatsiya qilish vositasi – Qo'shiqni yuklang, matnni qo'ying, ritmga mos ravishda bosing – AI-SRTSub",
   "desc": "Qo'shiqni yuklang, matnni qo'ying, tinglayotganingizda har bir qator uchun vaqt belgisini bosing va LRC yoki SRT ni eksport qiling. Probel ijro etadi va to'xtatib turadi, Enter qatorni belgilaydi, Z bekor qiladi, qo'llar klaviaturada qoladi.",
   "h1": "Matnni sinxronizatsiya qilish vositasidan qanday foydalanish kerak",
   "intro": "Qo'shiqni yuklang, matnni qo'ying, tinglayotganingizda har bir qator uchun vaqt belgisini bosing va standart LRC yoki SRT ni eksport qiling. Audio lokal tarzda ijro etiladi va hech qachon yuklab olinmaydi.",
   "ctaText": "Matnni sinxronizatsiya qilish vositasini ochish"
  },
  "body": [
   {
    "h2": "Ushbu vosita nima qiladi",
    "ps": [
     "Qo'shiqqa birga kuylash mumkin bo'lgan matn faylini bering: har bir qatorda bitta matn, har bir qator vaqt nuqtasini o'z ichiga oladi. Pleyerlar LRCni o'qiydi, subtitr treklari SRTni o'qiydi va ikkalasini ham bu yerda eksport qilish mumkin."
    ]
   },
   {
    "h2": "1 Qo'shiqni yuklang",
    "ps": [
     "Chap tarafdagi birinchi ustun audio faylni qabul qiladi: **MP3, M4A, FLAC, WAV va OGG** barchasi ishlaydi. Audio lokal tarzda ijro etiladi va hech qachon yuklab olinmaydi.",
     "Audio sifati vaqt aniqligiga ta'sir qilmaydi, lekin aniq vokalga ega manbani kuzatish osonroq; jonli ijrolar va baland fon musiqa treklari bo'lgan manbalarni sinxronizatsiya qilish sezilarli darajada qiyinroq."
    ],
    "img": {
     "file": "lrc-up",
     "alt": "Matnni sinxronizatsiya qilish vositasining qo'shiqni yuklash sohasi",
     "cap": "MP3 / M4A / FLAC / WAV / OGG barchasi ishlaydi va audio faqat lokal tarzda ijro etiladi"
    }
   },
   {
    "h2": "2 Matnni qo'ying",
    "ps": [
     "Matnni ikkinchi ustunga, **har bir qator uchun bitta matn** qilib qo'ying; bo'sh qatorlar avtomatik ravishda o'tkazib yuboriladi. Keyin \"Matnni tahlil qilish\" tugmasini bosing.",
     "Mavjud LRCni joylashtirish ham ishlaydi — uning `[mm:ss.xx]` vaqt belgilari tan olinadi va importdan keyin vaqt belgilanmagan birinchi qatordan davom etasiz, shuning uchun vaqti allaqachon belgilab qo'yilgan qatorlarni qaytadan bajarish shart emas."
    ],
    "img": {
     "file": "lrc-paste",
     "alt": "Matnni joylashtirish sohasi va matnni tahlil qilish tugmasi",
     "cap": "Har bir qator uchun bitta matnni qo'ying yoki butun LRCni joylashtiring va vositaga mavjud vaqtlarni o'qishiga ruxsat bering"
    }
   },
   {
    "h2": "3 Tinglayotganingizda ritmga mos ravishda bosing",
    "ps": [
     "Qo'shiqni ijro eting va qator boshlangan lahzada Enter tugmasini bosing (yoki \"Ushbu qatorni belgilash\" ni bosing); o'sha qator uchun vaqt yozib olinadi va kursor keyingisiga o'tadi.",
     "Yorliqlar: **probel** ijro etadi va to'xtatib turadi, **Enter** joriy qatorni belgilaydi, **Z** bitta qatorni bekor qiladi. Ijro paytida Enter tugmasini bosish ishlashning eng qulay usuli — sichqoncha va klaviatura o'rtasida u yoqdan-bu yoqqa o'tish shart emas.",
     "Noto'g'ri qator belgilandimi? Uni bekor qilish va qaytadan belgilash uchun Z tugmasini bosing. Agar biron bir qatorni umuman belgilashni xohlamasangiz (cholg'u tanaffusi, sof musiqa qismi), \"Ushbu qatordan o'tkazib yuborish\" tugmasini bosing va u eksportda ko'rinmaydi."
    ],
    "img": {
     "file": "lrc-tap",
     "alt": "Ritmga mos bosish sohasidagi ijro etish, ushbu qatorni belgilash, bitta qatorni bekor qilish va ushbu qatordan o'tkazib yuborish boshqaruv elementlari",
     "cap": "Probel ijro etadi va to'xtatib turadi, Enter joriy qatorni belgilaydi, Z bekor qiladi — qo'llar klaviaturada qoladi"
    }
   },
   {
    "h2": "4 Eksport qilish",
    "ps": [
     "To'rtinchi ustun eksportni amalga oshiradi: pleyerlar uchun **LRCni yuklab olish**, video subtitr treklari uchun **SRTni yuklab olish** yoki matnni to'g'ridan-to'g'ri olish uchun \"Nusxalash\".",
     "Faqat vaqti bor qatorlar eksport qilinadi; o'tkazib yuborilgan qatorlar hech qachon faylga kirmaydi. SRT eksportida har bir qator keyingisi boshlanguncha davom etadi va oxirgi qator 2 sekundga qaytadi."
    ],
    "img": {
     "file": "lrc-out",
     "alt": "Eksport sohasidagi LRC-ni yuklab olish, SRT-ni yuklab olish va nusxalash tugmalari",
     "cap": "Pleyerlar uchun LRC, video uchun SRT; faqat vaqti bor qatorlar eksport qilinadi"
    }
   },
   {
    "h2": "Tegilmaydigan narsalar",
    "ps": [
     "Qo'shiq matni qayta yozilmaydi. Vaqt faqat har bir qatorga bitta vaqt nuqtasini qo'shadi va siz joylashtirgan so'zlarga hech qachon tegilmaydi.",
     "Mavjud LRCni import qilganingizda, vaqt belgisiga ega bo'lgan qatorlar o'zlarining asl vaqtini saqlab qoladi va siz faqat vaqti belgilanmagan birinchi qatordan boshlab belgilaysiz."
    ]
   },
   {
    "h2": "Ko'p beriladigan savollar",
    "ps": [
     "**Nima uchun ba'zi qatorlar eksportda yo'q?** O'tkazib yuborilgan qatorlar va vaqti yo'q qatorlar hech qachon faylga kirmaydi. Uchinchi qadamga qayting va ularni qo'shing yoki ular o'tkazib yuborilishi kerakligini tasdiqlang.",
     "**Vaqtlarni keyinchalik o'zgartirish mumkinmi?** Belgilagandan keyin hamma narsani biroz surmoqchi bo'lsangiz, SRTni eksport qiling va uni butunlay surish yoki masshtablash uchun [[Timeline adjustment|/shift.html]] dan foydalaning.",
     "**LRC yoki SRT — qaysi birini eksport qilishim kerak?** Musiqa pleyerlari uchun LRC (foobar2000, oqim mijozlari, barcha turdagi pleyerlar); matnlar video ustida turishi yoki subtitr vositalari bilan qo'shimcha qayta ishlanishi kerak bo'lganda SRT.",
     "**Bitta qo'shiq qancha vaqt oladi?** Bu qatorlar soniga va qanchalik aniq bo'lishni xohlayotganingizga bog'liq. O'ttiz yoki qirq qatordan iborat qo'shiq uchun, oqimni bilganingizdan so'ng, har bir urinish uchun bir necha daqiqa ketadi; so'z darajasidagi aniqlikka erishish ko'proq vaqt oladi."
    ]
   },
   {
    "h2": "Maxfiylik",
    "ps": [
     "Audio va qo'shiq matnlari to'liq brauzerda qayta ishlanadi: hech narsa yuklab olinmaydi va server orqali o'tmaydi. Audio faqat lokal tarzda dekodlanadi va ijro etiladi."
    ]
   },
   {
    "h2": "Tegishli vositalar va qo'llanmalar",
    "ps": [
     "Agar sizda allaqachon LRC bo'lsa va subtitrlarni xohlasangiz [[LRC to SRT|/guides/lrc-to-srt.html]] ga qarang; vaqt belgilash ortidagi fikrlash va qiyinchiliklar uchun [[How to sync LRC lyrics|/guides/how-to-make-lrc-file.html]] ga qarang; agar eksport qilingan SRT noto'g'ri bo'lsa, [[Timeline adjustment|/shift.html]] dan foydalaning; va natijani [[Subtitle QC|/qc.html]] orqali tekshiring."
    ]
   }
  ]
 },
 "lrc-to-srt": {
  "seo": {
   "title": "LRC dan SRT Konverteriga – Qo'shiq Matnini Subtitrlarga Aylantirish – AI-SRTSub",
   "desc": "LRC qo'shiq matnini SRT subtitrlarga aylantirish: har bir qator keyingisi boshlanguncha davom etadi, oxirgi kadr 3 soniyani oladi. 60 daqiqadan oshgan qo'shiqlar to'g'ri o'qiladi. Brauzeringizda ishlaydi.",
   "h1": "LRC to SRT :: LRC dan SRT ga",
   "intro": "LRC matn fayllarini SRT ga aylantirish: faylni tashlang, SRT ni tanlang, yuklab oling. Tugash vaqtlari keyingi qatordan avtomatik ravishda to'ldiriladi.",
   "ctaText": "Convert LRC → SRT :: LRC → SRT ga aylantirish"
  },
  "body": [
   {
    "h2": "LRC ning SRT dan farqi",
    "ps": [
     "LRC bu qo'shiq matni formati: har bir qatorda faqat `[minutes:seconds.cents]` da \"kuylashni boshlash\" vaqti bor va **tugash vaqti yo'q**; har bir SRT kadriga ham boshlanish, ham tugash vaqti kerak. Shuning uchun konvertatsiyaning asosi tugash vaqtlarini to'ldirishdan iborat."
    ],
    "img": {
     "file": "convert-upload-lrc",
     "alt": "Yuklash maydoni: LRC fayli yuklandi, LRC sifatida aniqlandi",
     "cap": "[00:12.50] vaqt belgilari bo'lgan qo'shiq matni fayli darhol LRC sifatida aniqlanadi"
    }
   },
   {
    "h2": "Tugash vaqtlari qanday to'ldiriladi",
    "ps": [
     "Qoida oddiy: **har bir qator keyingisi boshlanguncha davom etadi**; oxirgi qatorda \"keyingisi\" yo'q, shuning uchun u 3 soniyani oladi. Shuningdek, LRC vaqt belgilari faqat daqiqa va soniyalarni o'z ichiga oladi — soatlar yo'q — va daqiqa maydoni o'tkazib yuborilmaydi (62:05 ma'nosi 1 soat 2 daq 5 s), shuning uchun DJ mikslari kabi o'ta uzun treklar to'g'ri o'qiladi."
    ]
   },
   {
    "h2": "Qanday qilib konvertatsiya qilish kerak",
    "ps": [
     "[[Konverterni|/convert.html]] oching, LRC ni tashlang, natija sifatida **SRT - SubRip** ni tanlang, so'ng aylantiring va yuklab oling. Musiqiy kliplar va matnlarni pleyerlarda subtitr sifatida o'rnatish uchun qulay; eksport qilingan SRT ni veb uchun yana VTT ga aylantirish mumkin."
    ]
   }
  ]
 },
 "make-bilingual-subtitles": {
  "seo": {
   "title": "Ikki Tilli Subtitrlarni Yaratishning Ikki Usuli – AI-SRTSub",
   "desc": "Ikki tilli subtitrlar ikki shaklda keladi: bitta kadrda ikki qator yoki bir xil vaqt jadvalida ikkita kadr. Afzalliklari, kamchiliklari va ular o'rtasida qanday o'tish mumkin. – AI-SRTSub",
   "h1": "Ikki Tilli Subtitrlarni Yaratishning Ikki Usuli",
   "intro": "Bir xil ikki tilli subtitr ortida ikkita mutlaqo boshqa tartib yashirin bo'lishi mumkin. Ularni farqlashni o'rganing, shunda yaratish, bo'lish va aylantirish ishlari sizga qiyinchilik tug'dirmaydi.",
   "ctaText": "Ikki tilli subtitrlar bilan ishlash"
  },
  "body": [
   {
    "h2": "Ikki Shakl Qanday Ko'rinishga Ega",
    "ps": [
     "**B shakli: bir xil vaqt jadvalidagi ikkita kadr.** Bir qator muloqot bir xil vaqtga ega bo'lgan ikkita alohida subtitr kadriga aylanadi — biri inglizcha, biri xitoycha — bir-birining ustiga qo'yilib chiziladi. Bu ikki tilli ASS subtitrlari yaratiladigan eng keng tarqalgan usul."
    ]
   },
   {
    "h2": "Har Birining Kamchiliklari Qayerda",
    "ps": [
     "A shaklining zaif nuqtasi — bu **aniqlash**: treklarni ajratish yozuv tizimiga tayanadi, shuning uchun xitoycha-inglizcha yoki yaponcha-inglizcha juftliklar bir qarashda ajralib turadi, lekin **bitta yozuv tizimini ulashgan kombinatsiyalar** — ingliz va fransuz, yoki xitoy va yapon kanjilari bir-biridan farqlanmaydi. B shaklining zaif nuqtasi — bu **ishlab chiqarish**: ikkita vaqt jadvali aniq mos kelishi kerak va ularni qo'lda moslashtirish charchatadi; ba'zi pleyerlar bir xil vaqt jadvalidagi ikkala kadrni ham chizib, ekranni to'ldirib yuboradi. Asosiy qoida: tomoshabinlar uchun mo'ljallangan tayyor subtitrlar uchun A shaklidan foydalaning; treklarni keyingi ishlar uchun ajratib olish kerak bo'lganda B shaklidan foydalaning."
    ]
   },
   {
    "h2": "The Two Routes :: Ikki Yo'nalish",
    "ps": [
     "**Asl nusxadan ikki tilli subtitrlarni yarating**: [[AI Subtitr Tarjimasi|/translate.html]] dan foydalaning va eksport paytida \"Ikki tilli · asl nusxasi ustida\" yoki \"Ikki tilli · tarjimasi ustida\" ni tanlang — siz to'g'ridan-to'g'ri A shaklini olasiz; ASS ni tanlash, shuningdek, \"yuqori va pastda ustma-ust\" va \"pastda ikki qator\" kabi ikkita tartibni taklif qiladi.",
     "**Ikki trekni birlashtiring yoki shakllar orasida o'tkazing**: [[Ikki Tilli Subtitrlarni Ajratuvchi|/bilingual.html]] dan va uning \"bitta ikki qatorli yozuvga birlashtirish\" rejimidan foydalaning — B shakli kiradi, A shakli chiqadi; aksincha, \"ikkita faylga bo'lish\" A yoki B shaklini qabul qilib, ikkita mustaqil trekni chiqarib beradi."
    ],
    "img": {
     "file": "bilingual-modes",
     "alt": "Ikki tilli ajratuvchining to'rtta rejimi; \"bitta ikki qatorli yozuvga birlashtirish\" bir xil vaqt jadvalidagi ikkita kadrni birlashtiradi",
     "cap": "\"Bitta ikki qatorli yozuvga birlashtirish\": B shakli A shakliga aylanadi"
    }
   },
   {
    "h2": "Qaysi Qurilma Uni Ijro Etadi",
    "ps": [
     "Veb pleyerlar (HTML5 `<track>`) va ko'pchilik mobil pleyerlar A shaklini ishonchliroq bajara oladi; ish stoli pleyerlari (VLC, mpv, PotPlayer) ikkalasini ham qabul qiladi va hatto bir xil vaqt jadvalidagi ikkita kadrga har xil rang va pozitsiyalarni berishi mumkin. Shubhaga tushganingizda, A shaklini SRT sifatida eksport qiling — u eng yaxshi ishlaydi. Formatlarning o'ziga xos farqlari uchun [[SRT, VTT yoki ASS: Qaysi biridan foydalanish kerak|/guides/subtitle-format-comparison.html]] ga qarang."
    ],
    "img": {
     "file": "translate-export",
     "alt": "Tarjima vositasining eksport panelidagi ikki tilli uslub opsiyalari",
     "cap": "Eksport paytida ikki tilli qator tartibini tanlang — bitta qadam va u tayyor"
    }
   },
   {
    "h2": "FAQ :: Ko'p beriladigan savollar",
    "ps": [
     "**Ikki tilli subtitrlar tiqilib qolgandek ko'rinmoqda — nima qila olaman?** Qator kengligini boshqaring: tarjima vositasining eksport panelida “ikki tilli qator kengligi” sozlamasi mavjud; torroq qator har bir kadr uchun kamroq belgilarni va toza ekranni bildiradi.",
     "**Men faqat bitta trekni xohlayman.** Ajratuvchining \"faqat asl nusxasini saqlash / faqat tarjimani saqlash\" funksiyasi buni bir marta bosish bilan bajaradi, [[Ikki Tilli Subtitrlarni Ikkita Trekka Bo'lish|/guides/split-bilingual-subtitles.html]] ga qarang."
    ]
   }
  ]
 },
 "merge": {
  "seo": {
   "title": "Ikki tilli va uslub berilgan subtitrlarni birlashtirish – Birlashtirish, uslub berish, eksport qilish – AI-SRTSub",
   "desc": "Ikki subtitr faylini ikki tilli trekka birlashtiring, mavjud ikki tilli faylga yangi uslub bering yoki bir tilli faylni bezang: juftlashtirish rejimlari, ASS va VTT shablonlari hamda qaysi formatni eksport qilish kerakligi.",
   "h1": "Ikki tilli birlashtirish va maxsus effektli subtitrlardan qanday foydalanish kerak",
   "intro": "Ikki subtitr faylini bitta ikki tilli trekka birlashtiring yoki subtitrlarga to'g'ridan-to'g'ri uslub bering: shrift, rang, kontur va pozitsiya ko'rganingizdek bo'ladi, ko'rib chiqish esa eksportga mos keladi.",
   "ctaText": "Maxsus effektli subtitr vositasini oching"
  },
  "body": [
   {
    "h2": "What this tool does :: Bu vosita nima qiladi",
    "ps": [
     "Bu sahifa aslida uchta vazifani bajaradi: asl va tarjima qilingan subtitr faylini bitta ikki tilli faylga birlashtirish, allaqachon ikki tilli bo'lgan faylning tartibi va uslubini sozlash hamda bir tilli faylga maxsus effektlar qo'shish. Uchalasida ham bir xil uslub parametrlari va bir xil oldindan ko'rib chiqish mavjud."
    ]
   },
   {
    "h2": "Three jobs, one page :: Uchta vazifa, bitta sahifa",
    "ps": [
     "Sahifaning yuqori qismida uchta yorliq bor: **Ikki faylni birlashtirish**, **Ikki tilli faylni sozlash**, **Bir tilli fayl**. Sizning tanlovingiz chap tomonda nechta kiritish ustuni paydo bo'lishini belgilaydi.",
     "Ikki faylni birlashtirganda, chap tomonda ikkita ustun bo'ladi: \"1 Asl subtitrlar\" va \"2 Tarjima qilingan subtitrlar\"; ularning har biri yuklangan faylni yoki to'g'ridan-to'g'ri kiritilgan matnni qabul qiladi. Ikki tilli faylni sozlash va bir tilli faylga uslub berish uchun har biriga faqat bitta ustun kerak bo'ladi."
    ],
    "img": {
     "file": "merge-mode",
     "alt": "Maxsus effektli subtitr vositasining yuqori qismidagi uchta yorliq va chap tarafdagi kiritish maydoni",
     "cap": "Yuqorida uchta yorliq; \"Ikki faylni birlashtirish\" ni tanlash chap tomonda asl va tarjima qilingan ustunni chiqaradi"
    }
   },
   {
    "h2": "Ikki fayl qanday juftlashtiriladi",
    "ps": [
     "\"3 Birlashtirish sozlamalari\" ostidagi birinchi element bu juftlashtirish rejimi: **Tartib bo'yicha juftlashtirish · asl vaqt jadvalidan foydalanish**, **Vaqt jadvali bo'yicha juftlashtirish · asl vaqt jadvalidan foydalanish**, **Tartib bo'yicha juftlashtirish · tarjima qilingan vaqt jadvalidan foydalanish**.",
     "Ikkala faylda bir xil tartibda bir xil miqdordagi yozuvlar bo'lsa, tartib bo'yicha juftlashtirish eng xavfsizidir. Miqdorlar turlicha bo'lganda (bir tomon yozuvlarni birlashtirgan, ikkinchisi bo'lgan), vaqt jadvali bo'yicha juftlashtiring va vositaga yaqinlik bo'yicha moslashtirishiga ruxsat bering. Qaysi vaqt jadvalidan foydalanish qaysi fayl aniqroq ekanligiga bog'liq — odatda asl nusxasi.",
     "Shundan so'ng matn tuzilishi (avtomatik aniqlash / har bir yozuv uchun ikki qator / almashinuvchi juftliklar) va tartib (asl nusxasi ustida / tarjimasi ustida) keladi."
    ],
    "img": {
     "file": "merge-pair",
     "alt": "Birlashtirish sozlamalari ostidagi juftlashtirish rejimi, matn tuzilishi va tartib opsiyalari",
     "cap": "Juftlashtirish rejimi qaysi qator qaysi biri bilan ketishini hal qiladi va qaysi vaqt jadvalidan foydalanish ham shu yerda belgilanadi"
    }
   },
   {
    "h2": "Uslubni har bir element bo'yicha sozlang",
    "ps": [
     "Uslub paneli o'ng tomonda joylashgan. ASS ni eksport qilganingizda, \"ASS ko'rinishi\" bloki qo'llaniladi: tartib (bo'lingan · yuqori va pastda ajratilgan / ustma-ust · pastda ikki qator), o'lcham, rang, shaffoflik, shrift, qalin, yotiq, harflar orasidagi masofa, kontur, kontur rangi, soya/fon (yo'q / soya / fon), chuqurlik, chegara rangi, chegara shaffofligi, gorizontal tekislash (pastki · chap / pastki · markaz / pastki · o'ng) va tarjima (asosiy) qatorining pastki qismidan masofa, shuningdek, asl (ikkilamchi) qatorning shrifti, soya/foni va chap/o'ng maydonlari.",
     "Ikki tilli VTT uslubini eksport qilganingizda, \"WebVTT uslubi\" bloki qo'llaniladi: oltita presets ustiga (standart / ixcham / kinematik / yuqori / foydalanish mumkin / portret) siz vertikal chiziqni, yakuniy nuqtani (pastki / yuqori / markaz), gorizontal pozitsiyani, kenglik o'lchamini, tekislash qiymatini va butun kadrning qator balandligini, shuningdek tarjima qatorining fon rangi, fon shaffofligi va kontur kengligini o'zgartirishingiz mumkin; asl qator asosiy uslubni meros qilib olishi yoki alohida belgilanishi mumkin.",
     "Ishingiz tugagach, natijani presests sifatida saqlab qo'yishingiz va keyinchalik \"Saqlangan presestsdan\" ostidan tanlab, \"Qo'llash\" tugmasini bosish orqali qayta ishlatishingiz mumkin."
    ],
    "img": {
     "file": "merge-style",
     "alt": "O'ng tarafdagi ASS ko'rinish paneli parametrlari",
     "cap": "O'lcham, rang, kontur, soya/fon va tekislash hammasi sozlanishi mumkin va natijani presests sifatida saqlash mumkin"
    }
   },
   {
    "h2": "Eksport qilishdan oldin oldindan ko'rib chiqishni tekshiring",
    "ps": [
     "\"Birlashtirishni ko'rib chiqish\" bu jadval: #, vaqt, asl nusxasi, tarjima, uslub. Yuqoridagi panel shubhali qatorlarni \"ov effektlari bor\", \"so'zlovchi prefiksi bor\", \"1 soniyadan qisqa\", \"ikki qatordan ko'p\" va \"o'qish tezligi oshib ketgan\" bo'yicha yoki siz kiritgan kalit so'z bo'yicha filtrlaydi.",
     "Qatorning uslub uyasini bosish ushbu uyasining muharririni kengaytiradi va faqat undan foydalanadigan qatorlarni ro'yxatga oladi; \"Barcha bekor qilishlarni tozalash\" har bir qo'lda kiritilgan o'zgarishni shablonga qaytaradi. Pastdagi vaqt jadvalini sozlash maydoni global siljishni (berilgan kadrdan) va proporsional masshtablashni boshqaradi.",
     "U to'g'ri ko'ringach, \"4 Eksport\" ga o'ting: subtitr faylini yuklab oling yoki uning tarkibini nusxalang."
    ],
    "img": {
     "file": "merge-preview",
     "alt": "Birlashtirishni ko'rib chiqish jadvali va uning filtrlash paneli",
     "cap": "Oldindan ko'rib chiqish — bu eksport; shubhali qatorlarni turi bo'yicha filtrlang yoki bitta uslub uyasini kengaytiring"
    }
   },
   {
    "h2": "Nima tegilmagan holda qoladi",
    "ps": [
     "Uslub berish faqat ko'rinishni o'zgartiradi, muloqotga sira tegmaydi. Birlashtirish paytida asl nusxa va tarjima matni bitta belgi ham o'zgartirilmaydi; agar siz uni oldindan ko'rib chiqish ostidagi sozlash maydonida ataylab o'zgartirmasangiz, vaqt jadvali siz tanlagan fayldan olinadi.",
     "SRT yoki \"Uslubsiz VTT\" ni eksport qilganingizda, faylga hech qanday uslub ma'lumotlari yozilmaydi — sahifa sizga VTT da STYLE bloki yo'qligini va pleyer o'zining standart ko'rinishidan foydalanishini aytadi. Agar uslub berishni xohlasangiz, ikki tilli VTT uslubini yoki ASS ni tanlang."
    ]
   },
   {
    "h2": "Common questions :: Ko'p beriladigan savollar",
    "ps": [
     "**Agar ikkita faylning yozuvlar soni har xil bo'lsa-chi?** \"Vaqt jadvali bo'yicha juftlashtirish\" dan foydalaning va vosita yaqinlik bo'yicha moslashtiradi; mos kelmaydigan yozuvlar o'ylab topilmaydi.",
     "**Agar pleyer eksport qilingan ASS dagi uslubni e'tiborsiz qoldirsa-chi?** Uslublar fayl ichida saqlanadi, lekin pleyerlarning ASS ni qo'llab-quvvatlashi har xil. Agar sizga universalroq ko'rinish kerak bo'lsa, ikki tilli VTT uslubini eksport qiling.",
     "**Uni buzib qo'ygandan keyin qanday qilib boshlang'ich shablonga qaytish mumkin?** ASS blokidagi \"Standart parametrlarni tiklash\" va VTT blokidagi \"Shablon standartlarini tiklash\" o'z bo'limlarini qayta o'rnatadi.",
     "**Namunadagi yettita qator nima?** Ular o'rnatilgan misol bo'lib, faqat birlashtirish qanday ko'rinishini ko'rishingiz uchun u yerda turibdi; namunani eksport qilib bo'lmaydi. O'z subtitrlaringizni yuklang va birlashtirishni ko'rib chiqish tugmasini bosing, shunda ular avtomatik ravishda almashtiriladi."
    ]
   },
   {
    "h2": "Privacy :: Maxfiylik",
    "ps": [
     "Subtitrlar to'liq brauzerda qayta ishlanadi: hech narsa yuklanmaydi va hech narsa server orqali o'tmaydi. Brauzerni yoping va o'sha sessiyadagi hamma narsa yo'qoladi."
    ]
   },
   {
    "h2": "Tegishli vositalar va qo'llanmalar",
    "ps": [
     "Ikki tilli faylni yana ikkita trekka bo'lish uchun [[Ikki tilli bo'lish|/bilingual.html]] dan foydalaning; aksincha, bitta tilni ikki tilli faylga aylantirish uchun [[Ikki tilli subtitrlarni yaratishning ikki usuli|/guides/make-bilingual-subtitles.html]] ga qarang; natijani [[Subtitrlar QC|/qc.html]] orqali o'tkazing; bir vaqtning o'zida butun mavsum uchun [[Paketli konvertatsiya|/batch.html]] dan foydalaning."
    ]
   }
  ]
 },
 "qc": {
  "seo": {
   "title": "Subtitrlar QC dan Qanday Foydalanish – Vaqt Jadvali va Tartibni Tekshirish – AI-SRTSub",
   "desc": "Subtitrlar QC: 17 ta qoida qoplashishlar, qator kengligi, o'qish tezligi va tinish belgilarini aniqlaydi, 27 ta til uchun chegaralar mavjud. Ularning yarmi bir marta bosish bilan tuzatiladi; hisobotni yuklab oling.",
   "h1": "Subtitrlar QC dan Qanday Foydalanish",
   "intro": "Subtitrlarni topshirishdan oldin, ularni vaqt va tartib bo'yicha QC sahifasidan o'tkazing: nima tekshiriladi, hisobotni qanday o'qish kerak va qaysi muammolarni bir marta bosish bilan tuzatish mumkin — barchasi shu yerda yoritilgan.",
   "ctaText": "Open Subtitle QC :: Subtitrlar QC ni Ochiq"
  },
  "body": [
   {
    "h2": "Bu Vosita Nima Uchun",
    "ps": [
     "Oddiy ko'z bilan qaraganda yaxshi ko'ringan subtitrlar topshirilgandan keyin ko'pincha vaqt jadvali qoplanib ketgani, qatorlar haddan tashqari kengligi yoki o'qish tezligi juda yuqoriligi ma'lum bo'ladi. QC sahifasi bu muammolarni birma-bir sanab o'tadi:"
    ]
   },
   {
    "h2": "Avval Til Qoidalarini Tanlang",
    "ps": [
     "\"Qaysi til qoidalari bo'yicha tekshirish\" ostida siz beshta chegarani belgilaysiz: **maksimal bir qatorli kenglik** (standart landshaft uchun 42 yarim enli birlik, kvadrat uchun 36, portret uchun 28), **o'qish tezligi chegarasi** (xitoy, yapon va koreys tillari uchun soniyasiga 18 en birligi, boshqa tillar uchun 20), **minimum davomiyligi 833 millisekund**, **maksimal davomiyligi 7000 millisekund** va **ko'pi bilan 2 qator**. Subtitr tilini avtomatik aniqlashga sozlang yoki 27 tildan birini qo'lda tanlang; ekran yo'nalishi faqat qator kengligi darajasini o'zgartiradi — o'qish tezligi, davomiyligi va qatorlar soni o'zicha qoladi. Yarim enli birliklar umumiy o'lchovdir: bitta xandzi 2 ta, bitta lotin harfi 1 ta deb hisoblanadi — 42 qator kengligi 21 ta xandzi yoki 42 ta harfga teng."
    ],
    "img": {
     "file": "qc-rules",
     "alt": "QC sozlamalari: beshta chegara kiritish maydoni hamda subtitr tili va ekran yo'nalishi ochiladigan ro'yxatlari",
     "cap": "Beshta chegara + til + yo'nalish; standart qiymatlar umumiy sanoat amaliyotiga mos keladi"
    }
   },
   {
    "h2": "Reading the Report :: Hisobotni O'qish",
    "ps": [
     "17 qoidalar uch darajadagi topilmalarni xabar qiladi: **xatolar** (buzilgan matn, vaqt belgisi formati, boshlanishidan oldin tugashi, buzilgan raqamlanish), **ogohlantirishlar** (bo'sh yozuvlar, qoplanishlar, juda qisqa yoki juda uzun davomiylik, o'qish tezligining chegaradan oshishi, haddan tashqari keng qatorlar, ikkita qatordan ko'p) va **maslahatlar** (qatorni bo'lish pozitsiyasi, boshdagi yoki oxirdagi bo'shliqlar, yo'qolgan bo'shliqlar, tinish belgilari me'yori va boshqalar). Har bir topilma yozuv raqamini va \"o'lchangan X, chegara Y\" tafsilotini o'z ichiga oladi va ro'yxatni daraja bo'yicha filtrlash mumkin. Ikki tilli yozuvlar istisnolarga ega: ikkala shakl ham avtomatik aniqlanadi, qoplanish tekshiruvlari butun juftlikni istisno qiladi va o'qish tezligi faqat maqsadli tilda yozilgan qatorni hisoblaydi."
    ],
    "img": {
     "file": "qc-report",
     "alt": "QC hisoboti maydoni: xato, ogohlantirish va maslahat bo'yicha guruhlangan topilmalar, har biri yozuv raqami va o'lchangan qiymatga ega",
     "cap": "Uch darajali hisobot: har bir topilma o'zining yozuv raqami va o'lchangan/chegara qiymatlarini o'z ichiga oladi"
    }
   },
   {
    "h2": "Fixing and Exporting :: Tuzatish va Eksport Qilish",
    "ps": [
     "\"Tuzatish va eksport\" kartasi faqat **avtomatik tuzatiladigan** elementlarni sanab o'tadi: qayta o'rash, bo'sh yozuvlarni olib tashlash, yo'qolgan bo'shliqlarni qo'shish, til me'yorlari bo'yicha tinish belgilarini almashtirish, qayta raqamlash — vaqtga tegmaydigan hamma narsa sukut bo'yicha belgilangan; **vaqtni o'zgartiradigan elementlar** (boshlanish va tugashni almashtirish, qoplanishlarni siljitish, davomiylikni qisqartirish yoki cho'zish) sukut bo'yicha belgilanmagan — ularning ta'sirini o'zingiz tekshirgandan so'ng belgilang. \"Tuzatishlarni qo'llash\" tugmasini bosing va yangi tekshiruv avtomatik ravishda ishga tushadi; hisoblagich faqat haqiqatan ham tuzatilgan narsalarni sanaydi — qayta o'rab bo'lmaydigan qatorlar raqamlarga qo'shib yuborilmaydi. **Chegaradan oshgan o'qish tezligining avtomatik tuzatilishi yo'q**: mashina qaysi so'zni qisqartirish kerakligini bilmaydi, shuning uchun tarjimani qo'lda qisqartirish yoki vaqtni sozlash kerak bo'ladi. Tuzatgandan so'ng, SRT yoki VTT ni eksport qiling yoki oddiy matnli `.qc.txt` hisobotini saqlash uchun \"Hisobotni yuklab olish\" tugmasini bosing."
    ],
    "img": {
     "file": "qc-fix",
     "alt": "Tuzatish kartasi: avtomatik tuzatiladigan elementlar uchun belgilash katakchalari va Tuzatishlarni qo'llash tugmasi",
     "cap": "Ro'yxatga faqat avtomatik tuzatiladigan elementlar kiritiladi; vaqtni o'zgartiruvchi tuzatishlar sukut bo'yicha belgilanmagan"
    }
   },
   {
    "h2": "FAQ :: Ko'p beriladigan savollar",
    "ps": [
     "**Nima uchun mening ASS faylim eksport qilinmaydi?** QC faqat SRT va VTT ni eksport qiladi; ASS kiradi, lekin chiqmaydi. ASS effektlarini saqlab qolish uchun oldindan [[Format Konverteri|/convert.html]] da o'ylab ko'ring.",
     "**18 o'qish tezligi nimani anglatadi?** Xitoy, yapon va koreys tillari uchun cheklov sekundiga 9 ta to'liq enli belgi (18 ta yarim enli birlik); boshqa tillar uchun sekundiga 20 ta yarim enli birlik beriladi. Bular umumiy qulay darajalar bo'lib, kiritish maydoni ularni o'zgartirishga imkon beradi.",
     "**Faylimning kodirovkasi buzilgan — uni hali ham tekshirish mumkinmi?** QC faqat UTF-8 ni o'qiydi; avval buzilgan matnni tuzatish sahifasida kodirovkani to'g'rilang.",
     "**U mening vaqt jadvalimga tegadimi?** \"Vaqtni o'zgartiradi\" guruhini belgilanmagan holda qoldirsangiz, tegmaydi; hatto belgilangan taqdirda ham, har bir o'zgarish tuzatish qo'llanilishidan oldin batafsil ko'rsatiladi."
    ]
   },
   {
    "h2": "Related Guides :: Tegishli Qo'llanmalar",
    "ps": [
     "O'qib bo'lmaydigan darajada tez o'tib ketadigan subtitrlar — maxsus qo'llanmaga qarang [[Subtitrlar O'qish Uchun Juda Tez|/guides/subtitle-too-fast.html]]. Topshirishdan oldin nimani tekshirish kerak — tekshiruv ro'yxati [[Topshirishdan Oldin Nimani Tekshirish Kerak|/guides/subtitle-quality-check.html]] da joylashgan. Sinxronizatsiyadan chiqib ketadigan vaqt jadvali boshqacha turdagi muammo — [[Subtitrlar Sinxronizatsiyadan Chiqib Ketmoqda|/guides/subtitles-out-of-sync.html]] ga qarang."
    ]
   }
  ]
 },
 "remove-subtitle-ads": {
  "seo": {
   "title": "Subtitrlardan Reklama va Suv Belgilarini Olib Tashlash – AI-SRTSub",
   "desc": "Subtitrlardan suv belgilari va reklamalarni olib tashlang: URL manzillar, fansub mualliflik huquqlari va encoded by teglar bir marta bosish bilan tozalanadi, shuningdek dublikat va bo'sh yozuvlar ham. – AI-SRTSub",
   "h1": "Subtitrlardan Reklama va Suv Belgilarini Olib Tashlash",
   "intro": "Subtitrlaringiz ichiga yashiringan URL manzillar, mualliflik huquqlari va promo yozuvlar tozalagichning suv belgisi qoidalari bo'yicha bir martada tozalanadi — va har qanday xato o'chirishni yozuvma-yozuv bekor qilish mumkin.",
   "ctaText": "Subtitr suv belgilarini tozalash"
  },
  "body": [
   {
    "h2": "Bu suv belgilari nima",
    "ps": [
     "Onlayn yuklab olingan subtitrlarda ko'pincha boshida yoki oxirida (ba'zan o'rtasida ham) qo'shimcha yozuvlar paydo bo'ladi: URL manzillar, elektron pochta manzillari, fansub guruh nomlari, `encoded by` / `translated by` mualliflik huquqlari, opensubtitles kabi sayt nomlari va \"WeChat akkauntimizga obuna bo'ling\" yoki \"faqat o'quv maqsadlarida\" kabi qatorlar. Bular oddiy subtitr yozuvlari hisoblanadi — vaqt jadvaliga ega, bitta qatorni egallaydi, shuning uchun pleyerlar ularni olib tashlay olmaydi; ular kontent bo'yicha aniqlanishi kerak."
    ]
   },
   {
    "h2": "Where to do it :: Buni qayerda qilish kerak",
    "ps": [
     "[[Subtitr Tozalagichni|/clean.html]] oching va subtitringizni tashlang; \"Suv belgilari va keraksiz yozuvlar\" guruhida \"Suv belgilari va reklamalarni olib tashlash\", \"Dublikat yozuvlarni olib tashlash\" va \"Bo'sh yozuvlarni olib tashlash\" sukut bo'yicha belgilangan va tozalash avtomatik ravishda boshlanadi. Aniqlash ikki darajada ishlaydi: URL manzillar, elektron pochta manzillari, fansub guruhlari va sayt nomlari kabi **qattiq signallar** har qanday uzunlikdagi mos kelishda butun yozuvni o'chirib tashlaydi; @handles, \"encoded\" yoki \"proofread\" kabi mualliflik huquqlari kabi **yumshoq signallar** uzun muloqotlarni qirqib yubormaslik uchun faqat 40 ta belgidan oshmaydigan qisqa yozuvlarda baholanadi. Ikki tilli yozuvlarda muloqot qatorlari saqlanib qolgan holda, avval suv belgisi qatorlari qatorma-qator olib tashlanadi; yozuv faqat tozalangandan keyin suv belgisi izlari qolgan taqdirdagina to'liq o'chiriladi."
    ],
    "img": {
     "file": "clean-opts",
     "alt": "Tozalash opsiyalari ekrani: suv belgilari va keraksiz yozuvlar guruhining uchta belgilash katakchasi",
     "cap": "\"Suv belgilari va keraksiz yozuvlar\" guruhi sukut bo'yicha yoqilgan — qo'lda sozlash talab etilmaydi"
    }
   },
   {
    "h2": "Review and export :: Ko'rib chiqish va eksport qilish",
    "ps": [
     "O'zgarishlar ro'yxatida har bir o'chirilgan yozuv \"suv belgisi va reklama\" tegini olib yuradi — hech narsa xato bilan o'chirilmaganligiga ishonch hosil qilish uchun uni ko'zdan kechiring; agar bittasi noto'g'ri ko'rinsa, uni qaytarish uchun \"Tiklash\" tugmasini bosing. Tasdiqlangandan so'ng, yuklab oling: fayl nomiga avtomatik ravishda `.clean` belgisi qo'shiladi. Tozalash brauzeringizda mahalliy darajada ishlaydi; subtitrlaringiz hech qayerga yuborilmaydi."
    ]
   }
  ]
 },
 "repair": {
  "seo": {
   "title": "Buzilgan (Mojibake) Subtitrlarni Qanday Tuzatish Mumkin – Kodirovkani Aniqlash – AI-SRTSub",
   "desc": "Qo'llanma: asl kodirovkani aniqlash (GBK / Big5 / Shift_JIS / EUC-KR), tuzatishlarni ko'proq tilga o'xshab o'qilishiga qarab tartiblash, so'ngra BOM yoki GBK bilan UTF-8 sifatida saqlash. Vaqtlar va indeks raqamlari hech qachon o'zgarmaydi.",
   "h1": "Buzilgan subtitrlarni qanday tuzatish mumkin",
   "intro": "Keraksiz belgilar bilan to'la subtitr fayli kamdan-kam hollarda buzilgan bo'ladi — u shunchaki noto'g'ri kodirovka bilan o'qilgan. Tuzatish vositasi asl kodirovkani aniqlaydi va indeks raqamlari hamda vaqtlarga tegmagan holda to'g'ri belgilarni joyiga qaytaradi.",
   "ctaText": "Buzilgan matnni tuzatish vositasini oching"
  },
  "body": [
   {
    "h2": "What this tool does :: Bu vosita nima qiladi",
    "ps": [
     "UTF-8 sifatida o'qilgan va GBK sifatida o'qilgan bir xil baytlar ikkita mutlaqo boshqa belgilar to'plamini hosil qiladi — fayl shikastlanmagan, u noto'g'ri kodirovka bilan shifrlangan. Tuzatish vositasi nima qilishini ko'ring:"
    ]
   },
   {
    "h2": "Faylni yuklang, nusxalab qo'ymang",
    "ps": [
     "Ikkita kirish nuqtasi har xil miqdordagi zararni tuzatishi mumkin, shuning uchun **imkoningiz bo'lsa faylni yuklang**. Fayl bilan asl baytlar hali ham mavjud bo'ladi: vosita birin-ketin kodirovkalami sinab ko'radi va GBK ni tanigach, uni GBK sifatida shifrdan chiqaradi — hech narsani taxmin qilish kerak emas. Matn nusxalab qo'yish orqali kelsa, u endi xom baytlar bo'lmaydi. Brauzer qatorni topshurguncha xatolik allaqachon sodir bo'lgan bo'ladi, shuning uchun vosita faqat orqaga qarab ishlashi va qo'lidan kelganini olishi mumkin.",
     "Agar nusxalangan matnda allaqachon almashtirish belgisi (o'sha qutichadagi so'roq belgisi `�`) mavjud bo'lsa, asl baytlar allaqachon yo'qolgan va hech narsa ularni qaytara olmaydi. Sahifa buni ochiq-oydin aytadi: yuqoriga qayting va asl nusxani yuklash uchun \"Faylni tanlash\" dan foydalaning."
    ],
    "img": {
     "file": "repair-up",
     "alt": "Tuzatish sahifasining yuklash maydoni: tashlash zonasi va matn kiritish qutisi, yuqorida aniqlangan kodirovka ko'rsatilgan",
     "cap": "Faylni sudrab kiriting yoki uni tanlang; matn qutisi pastda joylashgan va ancha kamroq zararni tuzatishi mumkin"
    }
   },
   {
    "h2": "Tashxis sizga nimani aytmoqda",
    "ps": [
     "Yuklaganingizdan so'ng, tashxis kartasi xulosa beradi. **Buzilgan matn topilmadi**: kontent o'zicha yaxshi o'qiladi; agar pleyeringiz hali ham keraksiz belgilarni ko'rsatsa, pleyer noto'g'ri kodirovkadan foydalangan — \"B sifatida saqlash\" ga pastga tushing, boshqasini tanlang va o'sha faylni unga bering. U **buzilgan matnga o'xshaganda**, karta qaysi izni topganini sanab o'tadi:"
    ],
    "img": {
     "file": "repair-diag",
     "alt": "Tashxis kartasi: xulosa va qatorma-qator sanab o'tilgan har bir buzilgan matn izi",
     "cap": "Tashxis shunchaki \"bu buzilgan matn\" deyish o'rniga izlarni turi bo'yicha sanab o'tadi"
    }
   },
   {
    "h2": "Nomzodlar qanday tartiblanadi va qanday tanlash kerak",
    "ps": [
     "\"Buni tuzatish yo'llari\" ostida nomzodlar **birinchi navbatda real tilga o'xshash** tartibda, 12 tagacha ro'yxatga olinadi, ularning har biri qaysi kodirovkadan va qaysi kodirovkaga o'qilganligi juftligi bilan belgilanadi. Uning qanday ko'rinishini ko'rish uchun birini bosing, tanlang, so'ngra saqlash uchun pastga aylantiring. Yoqmadi mi? Asl holatiga qaytish uchun \"O'zgarishsiz qoldirish\" dan foydalaning.",
     "Tartib ballga asoslanadi: umumiy belgilar ulushi, urg'u qatorlari, belgilar qatorlari, tushunarsiz belgilar devorlari, barchasi hisobga olinadi. **Agar biron bir ball aniq yaxshiroq bo'lmasa, hech narsa tavsiya etilmaydi** — u shunchaki bittasi bo'lishi uchun sizga yarim ishonchli nomzodni majburlamaydi. Ikki marta buzilgan matn (bir marta noto'g'ri saqlangan, keyin bir marta noto'g'ri tuzatilgan) eng yaxshi nomzodlar ustida yana bir qo'shimcha orqaga hal qilish bosqichidan o'tadi, shuning uchun ikki qatlam ichidagi har qanday narsa hali ham qutqarilishi mumkin."
    ],
    "img": {
     "file": "repair-fix",
     "alt": "Haqiqiy tilga qanchalik o'xshab o'qilishiga qarab tartiblangan nomzodlarni tuzatish ro'yxati, har biri o'zining kodirovka juftligi bilan belgilangan",
     "cap": "\"Haqiqiy tilga ko'proq o'xshash\" bo'yicha tartiblangan nomzodlar, ularning har biri o'z ichiga olgan kodirovkalami ko'rsatadi"
    }
   },
   {
    "h2": "To'g'ri saqlash oxirgi qadamdir",
    "ps": [
     "Tuzatilgan natija hali ham to'g'ri saqlanishi kerak. Pleyer UTF-8 ni aniqlay olmaganda, BOM bilan **UTF-8** sifatida (Windows pleyerlari BOM ga tayanadi) yoki **GBK** sifatida saqlash odatda buni hal qiladi. Siz UTF-8, UTF-8 (BOM bilan), GBK, Big5, Shift_JIS yoki EUC-KR sifatida saqlashingiz mumkin; agar biror narsa mos kelmasa, sizga boshqasini tanlash tavsiya etiladi (GBK koreys tilini o'z ichiga ola olmaydi). Yuklab olingan fayllarga nomiga `-fixed` qo'shiladi.",
     "Aniqlangan kodirovka UTF-8 bo'lmaganda, \"B sifatida saqlash\" siz uchun allaqachon BOM bilan UTF-8 ga sozlangan bo'ladi. Ochiladigan ro'yxatga o'zingiz tegsangiz, u sizni boshqa shubha ostiga qo'ymaydi."
    ],
    "img": {
     "file": "repair-out",
     "alt": "Natija maydoni: saqlash turi ochiladigan ro'yxati va yuklab olish tugmasi bo'lgan matn qutisi",
     "cap": "Kodirovkani tanlang, so'ng yuklab oling — fayl nomiga -fixed qo'shiladi"
    }
   },
   {
    "h2": "Hech qachon tegilmaydigan narsalar",
    "ps": [
     "Faqat noto'g'ri o'qilgan belgilar almashtiriladi. Indeks raqamlari, vaqtlar va ASS uslub qatorlari hech qanday tarzda o'zgartirilmaydi."
    ]
   },
   {
    "h2": "FAQ :: Ko'p beriladigan savollar",
    "ps": [
     "**Faylni yukladim, shunday ekan, nima uchun uni yana saqlashim kerak?** Faylning o'zi odatda yaxshi; buzilgan narsa pleyerning uni noto'g'ri kodirovka bilan o'qishidir. Bunday holda matndagi biron bir belgini o'zgartirish shart emas — shunchaki nusxasini BOM yoki GBK bilan UTF-8 sifatida saqlang va buni pleyerga bering.",
     "**Nima uchun nusxalangan matnni tuzatib bo'lmaydi?** Almashtirish belgisi nusxalangan kontentda paydo bo'lgach, asl baytlar yo'qoladi va orqaga qarab asoslash uchun hech narsa qolmaydi. Yuqoriga qayting va asl nusxani yuklash uchun \"Faylni tanlash\" dan foydalaning.",
     "**Men xohlagan nomzod ro'yxatda yo'qmi?** Sizda allaqachon mavjud bo'lganidan aniq yaxshiroq baholanmaguncha hech narsa tavsiya etilmaydi. Aniqlangan kodirovkani boshqasiga o'zgartirib ko'ring va unga qayta tartiblashiga ruxsat bering.",
     "**Bir vaqtning o'zida nechta fayl?** Bir vaqtning o'zida bittadan. Tuzatishni yuklab oling, so'ngra keyingi faylni kiriting."
    ]
   },
   {
    "h2": "Privacy :: Maxfiylik",
    "ps": [
     "Aniqlash va tuzatish to'liq brauzeringizda ishlaydi. Hech qanday subtitr kontenti hech qachon serverga yuborilmaydi."
    ]
   },
   {
    "h2": "Tegishli vositalar va qo'llanmalar",
    "ps": [
     "Buzilgan matn qayerdan kelib chiqishi va nima uchun shunday ko'rinishga kelishi — [[Subtitrlar nima uchun buziladi|/guides/subtitle-garbled-characters.html]] ga qarang; kodirovka yaxshi, lekin kontent iflos — [[Subtitrlarni tozalash|/clean.html]] dan foydalaning; vaqt va o'qish tezligini tekshirish uchun — [[Subtitrlar QC|/qc.html]]."
    ]
   }
  ]
 },
 "sbv-to-srt": {
  "seo": {
   "title": "SBV dan SRT Konverteriga – YouTube Subtitrlarini Aylantirish – AI-SRTSub",
   "desc": "YouTube dan yuklab olingan SBV subtitrlarini CapCut, Premiere va pleyerlar uchun SRT ga aylantiring. Vaqt qiymatlari o'zgarishsiz qoladi — faqat tartib o'zgaradi. Brauzeringizda ishlaydi.",
   "h1": "SBV to SRT :: SBV dan SRT ga",
   "intro": "YouTube SBV subtitrlarini SRT ga aylantiring: faylni tashlang, SRT ni tanlang, yuklab oling. Vaqt qiymatlari o'zgarishsiz qoladi — faqat tuzilma o'zgaradi.",
   "ctaText": "Convert SBV → SRT :: SBV → SRT ga aylantirish"
  },
  "body": [
   {
    "h2": "SBV nima va u qayerdan kelib chiqqan",
    "ps": [
     "SBV bu **YouTube ning subtitr formati**: YouTube dan \"subtitr fayllari\"ni yuklab olish ko'pincha sizga .sbv faylini beradi. Uning tuzilmasi SRT dan soddaroq — boshlanish va tugash vaqtlari vergul bilan ajratilgan holda **bitta qatorda** joylashadi, matn to'g'ridan-to'g'ri uning ostidan keladi va kadr raqamlari yo'q."
    ]
   },
   {
    "h2": "Pleyerlar nima uchun uni rad etadi",
    "ps": [
     "YouTube ning o'zidan tashqari, ko'pchilik tahrirlash dasturlari va pleyerlar SBV ni qo'llab-quvvatlamaydi. Unda raqamlash bloki yo'q va vaqt qatorini SRT dan farqli ravishda yozadi, shuning uchun kengaytmani qayta nomlash hech qanday natija bermaydi — tuzilmani haqiqatdan ham qayta qurish kerak."
    ],
    "img": {
     "file": "convert-upload-sbv",
     "alt": "Yuklash maydoni: SBV fayli yuklandi, SBV sifatida aniqlandi",
     "cap": "SBV qanday bo'lsa shunday aniqlanadi, kengaytmani qayta nomlash talab etilmaydi"
    }
   },
   {
    "h2": "Qanday qilib konvertatsiya qilish kerak",
    "ps": [
     "[[Konverterni|/convert.html]] oching, SBV ni tashlang, natija sifatida **SRT - SubRip** ni tanlang, so'ngra aylantiring va yuklab oling. Kadr raqamlari yangidan tayinlanadi va kadr ichidagi asl qator uzilishlari bitta qatorga birlashtiriladi (SRT ko'p qatorli kadrlarga ruxsat beradi; SBV bu yerda bir qatorli qilib eksport qilinadi)."
    ]
   }
  ]
 },
 "shift": {
  "seo": {
   "title": "Subtitr vaqtini o'zgartirish (Siljish, Masshtab, Ikki tayanch nuqta) – AI-SRTSub",
   "desc": "Vaqt muharririning tasvirlangan qo'llanmasi: subtitrlarni yuklash, tuzatish qadamlarini qo'shish, ikki tayanch nuqta yordamida to'g'rilash, har bir matn uchun alohida sozlamalar va eksport qilish.",
   "h1": "Vaqt muharriri: Bosqichma-bosqich qo'llanma",
   "intro": "Ushbu qo'llanma vositani boshidan oxirigacha tushuntiradi: subtitrlarni yuklash, tuzatish qadamlarini qo'shish, tekshiruvlarni bajarish, har bir matnni nozik sozlash va eksport qilish.",
   "ctaText": "Vaqt muharririni oching"
  },
  "body": [
   {
    "h2": "Subtitrlaringizni yuklang",
    "ps": [
     "Faylni shtrixli qutiga tortib tashlang yoki birini tanlash uchun bosing; shuningdek, matnni to'g'ridan-to'g'ri matn maydoniga **nusxalash** ham mumkin. Format ham kengaytmadan, ham tarkibdan aniqlanadi va natija format belgisida ko'rsatiladi. Qo'llab-quvvatlanadigan kiritishlar: srt, vtt, ass (jumladan ssa), sbv, lrc va txt."
    ],
    "img": {
     "file": "shift-upload",
     "alt": "Yuklash sohasi: namuna subtitr yuklandi, SRT sifatida aniqlandi",
     "cap": "Fayl nomi va aniqlangan format tashlash zonasining ostida ko'rsatiladi; matn maydoni tahrirlanadigan holatda qoladi."
    }
   },
   {
    "h2": "Tuzatish qadamlarini qo'shing",
    "ps": [
     "Tuzatishlar **qadamlar quvurini** tashkil qiladi: har bir qadam bitta vazifani bajaradi va bitta raqamni oladi, uning birligi quti ichida ko'rsatiladi. Qadamlar yuqoridan pastga qarab qo'llaniladi va har qanday qadamning o'zgarishi **hamma narsani asl subtitrlardan qayta hisoblab chiqadi** — shuning uchun siz xatoga yo'l qo'ymasdan istalgan vaqtda orqaga qaytib, raqamni o'zgartirishingiz mumkin."
    ]
   },
   {
    "h2": "Ikki tayanch nuqta yordamida tuzatish",
    "ps": [
     "Sekundlardagi siljishni ham, nisbatni ham bilmaganingizda, ikki tayanch nuqtadan foydalaning: qo'shilgandan so'ng, **ikkita \"joriy\" maydon avtomatik ravishda to'ldiriladi** faylingizning birinchi va oxirgi replikasidan. Siz faqat \"maqsad\" maydonlarini to'ldirasiz — bu replikalar aslida paydo bo'lishi kerak bo'lgan vaqtlar. Ularning orasidagi hamma narsa proporsional ravishda qayta taqsimlanadi."
    ],
    "img": {
     "file": "shift-step-two",
     "alt": "Ikki tayanch nuqtani to'g'rilash: joriy vaqtlar avtomatik to'ldiriladi, kiritilishi kerak bo'lgan maqsadli vaqtlar",
     "cap": "Joriy maydonlar sizning faylingizdan olinadi; maqsadli maydonlar videoda ko'rsatilgan to'g'ri vaqtlardir."
    }
   },
   {
    "h2": "Vaqt jadvalini tekshirish va har bir matn uchun tuzatishlar",
    "ps": [
     "Qadamlarni bajarganingizdan so'ng, **vaqt jadvalini tekshirish** natijasini o'qing: juda qisqa, juda uzun, o'qish uchun juda zich bo'lgan replikalar, juda keng qatorlar yoki bir-birining ustiga chiqadigan replikalar ro'yxatga olinadi. Tekshiruv **faqat muammolarni belgilaydi va hech qachon hech narsani o'zgartirmaydi** o'z-o'zidan. To'rtta standart o'lchov birligi quyidagilardan iborat: 0.833 s minimal davomiylik, 7 s maksimal, sekundiga 9 belgi o'qish tezligi va har bir qator uchun 21 belgi — barchasi sahifada tahrirlanishi mumkin. Uning ostida, har bir matn uchun tuzatishlar ikkita qo'shni replikani birlashtirish, birini bo'lish yoki uning boshlanishi va tugashini to'g'ridan-to'g'ri tahrirlash imkonini beradi; har bir tahrirni bekor qilish mumkin."
    ]
   },
   {
    "h2": "Natijani eksport qilish",
    "ps": [
     "Natijalar paneli osongina tekshirish uchun asl va sozlangan vaqtlarni **yonma-yon** ko'rsatadi. Chiqish formati standart bo'yicha kiritish formatiga o'rnatiladi, lekin yuklab olishdan oldin srt, vtt, ass, sbv, lrc yoki txt formatlaridan biriga o'tishingiz mumkin."
    ],
    "img": {
     "file": "shift-result",
     "alt": "Natijalar paneli: yuklab olish va nusxalash tugmalari bilan birga oldingi va keyingi vaqtlar yonma-yon",
     "cap": "Chap tomonda asl vaqtlar, o'ng tomonda sozlangan vaqtlar; tekshiruv to'g'ri chiqsa, yuklab oling."
    }
   }
  ]
 },
 "shift-subtitle-timing": {
  "seo": {
   "title": "Barcha subtitrlarni qanday qilib oldinga yoki orqaga surish mumkin – AI-SRTSub",
   "desc": "Har bir replika bir xil miqdorda kechikmoqda: vaqt muharririning siljish qadamidan foydalaning — bitta manfiy yoki musbat raqamni kiriting va barcha replikalar birga harakatlanadi.",
   "h1": "Butun subtitr faylini oldinga yoki orqaga suring",
   "intro": "Ovoz boshlanadi, subtitr kechikib chiqadi — va har bir replika bir xil miqdorda kechikmoqda. Bu bir xil siljish: bitta raqam uni tuzatadi.",
   "ctaText": "Vaqt muharririni oching"
  },
  "body": [
   {
    "h2": "Avval har bir replika bir xil miqdorda kechikayotganini tasdiqlang",
    "ps": [
     "Boshiga yaqin, o'rtada va oxirida bittadan replikani tekshirib ko'ring. Agar uchtasi ham taxminan bir xil miqdorda kechikayotgan bo'lsa, bu **bir xil siljish** bo'lib, bitta siljish qadami uni tuzatadi. Agar bosh qism to'g'ri bo'lib, siljish oxiriga qarab o'sib borsa, bu boshqa muammo — qarang [[subtitrlar sinxronizatsiyadan qochib bormoqda|/guides/subtitles-out-of-sync.html]]."
    ]
   },
   {
    "h2": "Nima kiritish kerak: oldinga siljitish uchun manfiy, kechiktirish uchun musbat",
    "ps": [
     "Vaqt muharririda **Hammasini siljitish** qadamini qo'shing va qiymat maydoniga siljishni kiriting: kechikib ishlayotgan subtitrlarni oldinga tortish uchun manfiy raqam talab qilinadi; erta ishlayotganlar ularni keyinga surish uchun musbat raqamni talab qiladi. Agar subtitrlar 1.5 soniya kechiksa, **-1.5** kiriting — birlik soniyalarda."
    ],
    "img": {
     "file": "shift-step-shift",
     "alt": "-1.5 soniya kiritilgan \"Hammasini siljitish\" qadami",
     "cap": "Manfiy raqam butun faylni oldinga suradi; birlik quti ichida, soniyalarda yozilgan."
    }
   },
   {
    "h2": "Uni ishga tushiring va birinchi replikani tekshiring",
    "ps": [
     "Qo'llanilgandan so'ng, natijalar paneli har bir replikaning asl va yangi vaqtlarini **yonma-yon** ro'yxatga kiritadi. Avval birinchi replikani tekshiring: yangi boshlanish vaqti qator aytiladigan kadrga tushadimi? Keyin o'rtadagisini tekshiring. Har bir replika bir xil miqdorda harakatlanadi va o'z davomiyligini saqlab qoladi."
    ]
   },
   {
    "h2": "Eksport qilish",
    "ps": [
     "Tekshiruv to'g'ri ko'ringach, to'g'ridan-to'g'ri yuklab oling. Chiqish formati standart bo'yicha kiritish formatiga o'rnatiladi va boshqasiga o'zgartirilishi mumkin. O'zgarish faqat vaqtlarga tegishli — matnning birorta ham belgisiga emas."
    ]
   }
  ]
 },
 "simplified-traditional-chinese": {
  "seo": {
   "title": "Belgilarni almashtirish emas – Ko'pdan-birga va hududiy so'zlar – AI-SRTSub",
   "desc": "Buni qiyinlashtiradigan uchta narsa bor: so'z bo'yicha hal qilinadigan ko'pdan-birga xaritalar, Tayvan va Gonkongning turli lug'atlari hamda faqat muloqotni tarjima qilish. Uchalasini ham to'g'ri bajaring va hech qanday inson tomonidan qayta ishlash talab etilmaydi.",
   "h1": "Soddalashtirilgan va an'anaviy belgilarni oddiygina almashtirish emas",
   "intro": "Qaysi an'anaviy belgi soddalashtirilganini almashtirishi uning yonidagi belgiga bog'liq. Shuning uchun bu konvertatsiyani har safar bitta belgidan ko'r-ko'rona almashtirish orqali amalga oshirib bo'lmaydi.",
   "ctaText": "Konvertorni oching"
  },
  "body": [
   {
    "h2": "Birinchidan: bitta soddalashtirilgan shakl, bir nechta an'anaviy shakllar",
    "ps": [
     "Soddalashtirish bir nechta an'anaviy belgilarni bitta soddalashtirilgan shaklga keltirdi. Teskari yo'nalishda harakatlanish, bitta soddalashtirilgan belgi bir nechta an'anaviy belgilarga mos kelishini anglatadi va ular orasidan tanlash uning nima bilan juftlashganiga bog'liq:",
     "Belgi bo'yicha almashtirish ularning barchasini bir xil shaklga keltirib qo'yadi va har bir holatni noto'g'ri bajaradi. Ularni ajratib turadigan narsa **so'z bo'yicha** hal qilishdir — jadvallar OpenCC'dan olingan bo'lib, iboralarni bitta belgilardan oldin moslashtiradi. Masalan:"
    ]
   },
   {
    "h2": "Ikkinchidan: Tayvan va Gonkong bir xil narsa emas",
    "ps": [
     "An'anaviy tilga o'tgandan keyin yana bir qatlam bor: xuddi shu so'z Tayvan va Gonkongda har xil yoziladi. \"Dasturiy ta'minot\" so'zi Tayvanda boshqacha, Gonkongda boshqacha, va Tayvan \"ma'lumot\" uchun o'z so'zidan foydalanadi.",
     "Shuning uchun alohida yo'nalishlar mavjud. Tayvancha an'anaviy hatto \"ifodani o'zgartirish\" va \"faqat gliflar\"ga bo'linadi — faqat gliflar mavjud lug'atingizni saqlab qoladi, ifodani o'zgartirish esa hududiy atamalarni ham almashtiradi. Gonkong o'ziga xos yo'nalishga ega."
    ],
    "img": {
     "file": "hanconv-dir",
     "alt": "Kartaga o'tkazish: \"Soddalashtirilgan → Tayvancha an'anaviy (ifodani o'zgartirish)\" ni ko'rsatadigan manzil ochiladigan ro'yxati",
     "cap": "Tayvan ifodalarni o'zgartirish yoki faqat gliflarni taklif qiladi; Gonkongning o'z yo'nalishi bor"
    }
   },
   {
    "h2": "Uchinchidan: faqat muloqotga tegish kerak",
    "ps": [
     "Subtitr fayli faqat muloqotdan iborat emas. Unda tartib raqamlari, vaqtlar va ASS uslubidagi qatorlar ham bor va ularning birorta belgisi ham o'zgartirilmasligi kerak — ayniqsa ASS uslubidagi qatorlar, chunki ular muloqot sifatida ko'rib chiqilishi bilanoq ishlamay qoladigan inglizcha direktiv nomlarini o'z ichiga oladi.",
     "Shuning uchun konvertatsiya format bo'yicha tahlil qilingandan so'ng sodir bo'ladi: SRT, VTT, ASS va TXT har biri qaysi qism muloqot ekanligini aniqlaydi va faqat uning ichidagi belgilar konvertatsiya qilinadi. Vaqtlar va uslublar tegib ketilmasdan saqlanib qoladi, hech qanday formatlashni qayta bajarish talab etilmaydi."
    ],
    "img": {
     "file": "hanconv-out",
     "alt": "Natija sohasi: o'zgartirilgan subtitr va o'zgartirilgan qatorlar sonini ko'rsatadigan statistika paneli",
     "cap": "Statistika paneli qancha qator o'zgarganini ko'rsatadi; formatlash qanday bo'lsa shunday saqlanadi"
    }
   },
   {
    "h2": "Soddalashtirilganga qaytish: ehtiyot bo'ling",
    "ps": [
     "An'anaviydan soddalashtirilganga o'tkazish, shuningdek, **qaysi an'anaviy turdan kelayotganingizni** aytishingizni talab qiladi: umumiy, tayvancha va gonkongcha uch xil yo'nalishdir, chunki konvertatsiya qilinishidan oldin hududiy lug'at umumiy so'zga tiklanishi kerak. Noto'g'ri yo'nalishni tanlang va hududiy lug'at soddalashtirilgan chiqishda ham saqlanib qoladi.",
     "To'qqiz yo'nalishning pastki guruhi orqaga o'tkazadigan guruhdir: an'anaviy → soddalashtirilgan, tayvancha → soddalashtirilgan, gonkongcha → soddalashtirilgan."
    ]
   },
   {
    "h2": "Tegishli vositalar va qo'llanmalar",
    "ps": [
     "To'liq qo'llanma — [[Soddalashtirilgan va an'anaviy subtitrlarni qanday konvertatsiya qilish kerak|/guides/hanconv.html]]; agar sizga faqat soddalashtirilgandan an'anaviylikka o'tkazish kerak bo'lsa — [[Soddalashtirilgan subtitrlarni an'anaviylikka o'tkazish|/guides/srt-simplified-to-traditional.html]]; boshqa tilga tarjima qilish uchun [[Subtitrlarni tarjima qilish|/translate.html]]."
    ]
   }
  ]
 },
 "split": {
  "seo": {
   "title": "Subtitrlarni bo'lish va birlashtirish – Blok bo'yicha kesish, tartib bilan zanjirlash – AI-SRTSub",
   "desc": "Bitta faylni davomiyligi yoki kadrlar soni bo'yicha segmentlarga kesing, har birini noldan qayta boshlang yoki bir nechta faylni tartib bilan zanjirlang yoki vaqt shkalasi bo'yicha aralashtiring. Kadr raqamlari qaytadan raqamlandi, matnga tegilmadi.",
   "h1": "Subtitrlarni qanday bo'lish va birlashtirish mumkin",
   "intro": "Bitta uzun subtitr faylini segmentlarga kesib oling yoki bir nechta tarqoq fayllarni bittaga birlashtiring. Kesish har doim yozuv chegarasiga to'g'ri keladi — jumla hech qachon yarmiga bo'linmaydi.",
   "ctaText": "Open split and join :: Bo'lish va birlashtirishni ochish"
  },
  "body": [
   {
    "h2": "What this tool does :: Bu vosita nima qiladi",
    "ps": [
     "Epizodlarni bo'lish, segmentlarni bo'lish va manbalarni birlashtirish subtitr bloklari va video bloklari orasidagi bir xil mos kelmaslikka olib keladi: yoki bitta faylni kesish kerak, yoki bir nechtasini birlashtirish kerak. Ushbu sahifa ikkalasini ham bajaradi, har biriga bittadan tab."
    ]
   },
   {
    "h2": "Avval kesish yoki birlashtirishni tanlang",
    "ps": [
     "Yuqoridagi ikkita tab: **Bo'lish: bitta faylni segmentlarga** va **Birlashtirish: bir nechta faylni bittaga**. Quyidagi ikkinchi qadam opsiyalari tanlovingizga qarab o'zgaradi.",
     "\"1 Subtitrlarni qo'shish\" bo'limida fayl yuklaysiz yoki matn kiritasiz; agar noto'g'risini tanlagan bo'lsangiz, \"Tozalash\" tugmasini bosing. Bu sahifa faqat UTF-8 ni o'qiydi — agar kodlash buzilgan bo'lsa (savol belgilari yoki katakchalar devori) avval [[Buzilgan matnni tuzatish|/repair.html]] sahifasiga o'ting."
    ],
    "img": {
     "file": "split-mode",
     "alt": "Bo'lish va birlashtirish sahifasining yuqori qismidagi ikkita tab",
     "cap": "Kesish va birlashtirish ikkita tabdan iborat; ikkinchi qadam opsiyalari sizning tanlovingizga ergashadi"
    }
   },
   {
    "h2": "How to cut :: Qanday kesish kerak",
    "ps": [
     "\"2 Qanday kesish kerak\" ostida asosni tanlang: **davomiylik** (har X daqiqada bitta segment) yoki **kadrlar soni** (har X kadrda bitta segment), keyin raqam kiriting.",
     "\"Har bir segmentni 0:00 da qayta boshlash\" belgisini qo'ying va har bir hosil bo'lgan segment noldan boshlab sanaladi — buni epizodlarni yuklaganingizda va har bir segmentni pleyerga alohida berganingizda foydalaning. Asl vaqt belgilarini saqlab qolish uchun uni belgisiz qoldiring, shunda har bir segment manba videodagi o'rniga mos keladi.",
     "Kesish faqat kadr chegaralariga to'g'ri keladi: juda uzun subtitr kesish nuqtasini qoplaganda, butun kadr oldingi segmentda qoladi."
    ],
    "img": {
     "file": "split-cut",
     "alt": "Bo'lish sahifasidagi noldan qayta boshlash tugmasi bilan birga davomiylik va kadrlar soni opsiyalari",
     "cap": "Davomiylik yoki kadrlar soni bo'yicha kesing va ixtiyoriy ravishda har bir segmentni 0:00 da qayta boshlang"
    }
   },
   {
    "h2": "How to join :: Qanday birlashtirish kerak",
    "ps": [
     "\"2 Qanday birlashtirish kerak\" ostida usulni tanlang: **Tartib bilan zanjirlash** keyingi faylni oldingisi tugagandan so'ng boshlanishi uchun siljitadi, segmentlar orasida qoplash bo'lmaydi; **Vaqt shkalasi bo'yicha aralashtirish** har bir faylning asl vaqt belgilarini saqlaydi va boshlanish vaqti bo'yicha saralaydi.",
     "Fayllar bitta epizodning birinchi va ikkinchi yarmi bo'lganda yoki alohida tahrirlangan yarmlar qaytadan birlashtirilishi kerak bo'lganda tartib bilan zanjirlashdan foydalaning; fayllar ekranda birga bo'lishi kerak bo'lganda, masalan, asl trek va tarjima qilingan trek kabi, vaqt shkalasi bo'yicha aralashtirishdan foydalaning.",
     "Birlashtirilgandan so'ng kadr raqamlari avtomatik ravishda qaytadan raqamlanadi va muloqotdan bir so'z ham o'zgarmaydi."
    ],
    "img": {
     "file": "split-join",
     "alt": "Birlashtirish sahifasidagi tartib bilan zanjirlash va vaqt shkalasi bo'yicha aralashtirish opsiyalari",
     "cap": "Tartib bilan zanjirlash bitta epizodning ikki yarmiga mos keladi; vaqt shkalasi bo'yicha aralashtirish asl va tarjima qilingan trekka mos keladi"
    }
   },
   {
    "h2": "Natijani olish",
    "ps": [
     "O'ng tarafdagi \"3 Natija\" **SRT** va **VTT** formatlarini eksport qiladi; \"Yuklab olish\" yoki \"Nusxalash\" tugmasini bosing.",
     "Bo'lish vaqtida har bir segment uchun bittadan bosish o'rniga har bir kesilgan segmentni bir vaqtning o'zida saqlaydigan \"Har bir segmentni yuklab olish\" funksiyasidan foydalanishingiz mumkin."
    ],
    "img": {
     "file": "split-out",
     "alt": "Natija sohasida yuklab olish va har bir segmentni yuklab olish tugmalari bilan SRT/VTT formatini tanlash",
     "cap": "Bo'lish natijalari segmentma-segment yuklab olinishi mumkin; birlashtirilgan fayl to'g'ridan-to'g'ri yuklab olinadi yoki nusxalanadi"
    }
   },
   {
    "h2": "Nimalarga tegilmagan holda qoladi",
    "ps": [
     "Muloqotning birorta belgisi o'zgarmaydi. Bu sahifa faqat qaysi kadrlar qaysi segmentga tegishli ekanligini va ular qanday raqamlanishini o'zgartiradi; yozuvlar mazmuni qanday bo'lsa, shunday qoladi.",
     "\"Tartib bilan zanjirlash\" bilan keyingi fayllarning vaqt belgilari butunlay siljiydi — bu birlashtirish talab qiladigan narsa; \"Vaqt shkalasi bo'yicha aralashtirish\" bilan har bir asl vaqt belgisi saqlanib qoladi."
    ]
   },
   {
    "h2": "Common questions :: Ko'p beriladigan savollar",
    "ps": [
     "**Agar oxirgi segment juda qisqa bo'lib qolsa nima bo'ladi?** Bu odatiy hol. Butun segmentni to'ldirmaydigan qoldiq to'ldirib o'tirilmasdan, o'zining alohida segmentiga aylanadi.",
     "**Kesish nuqtasini qoplagan jumla bo'linadimi?** Yo'q. Kesishlar faqat yozuv chegaralariga to'g'ri keladi va chiziqni kesib o'tgan kadr oldingi segmentda qoladi.",
     "**Aralashtirilgandan so'ng, vaqtlari bir xil bo'lgan ikkita kadr qanday tartiblanadi?** Boshlanish vaqti bo'yicha; boshlanish vaqtlari teng bo'lganda, fayllarni qo'shgan tartibingiz saqlanib qoladi.",
     "**ASS ni bo'lish mumkinmi?** Bu sahifa SRT va VTT bilan ishlaydi. Avval ASS ni [[Formatni o'zgartirish|/convert.html]] yordamida SRT yoki VTT ga o'tkazing."
    ]
   },
   {
    "h2": "Privacy :: Maxfiylik",
    "ps": [
     "Subtitrlar to'liq brauzerda qayta ishlanadi: hech narsa yuklanmaydi va hech narsa server orqali o'tmaydi. Sahifani yoping va kontent yo'qoladi."
    ]
   },
   {
    "h2": "Tegishli vositalar va qo'llanmalar",
    "ps": [
     "Ikkita faylni ikki tilli trekka birlashtirish uchun (bitta epizodga emas) [[Ikki tilli birlashtirish va maxsus effektlar|/guides/merge.html]] dan foydalaning; agar butun vaqt shkalasi noto'g'ri bo'lsa, [[Vaqt shkalasini moslash|/shift.html]] ga o'ting; butun mavsum uchun [[Paketli konvertatsiya|/batch.html]] dan foydalaning; va tugatgach, [[Subtitrlarni sifat nazorati (QC)|/qc.html]] ni ishga tushiring."
    ]
   }
  ]
 },
 "split-bilingual-subtitles": {
  "seo": {
   "title": "Ikki tilli subtitrlarni ikkita trekka bo'lish – AI-SRTSub",
   "desc": "Ikki tilli subtitrlarni ikkita faylga bo'ling: asl va tarjima treklari alohida nomlar bilan alohida yuklab olinadi; ikkala shakl ham tan olinadi. – AI-SRTSub",
   "h1": "Ikki tilli subtitrlarni ikkita trekka bo'lish",
   "intro": "Bitta ikki tilli subtitr ikkita faylga aylanadi — “asl” va “tarjima”: yuklang, ikkiga bo'lishni tanlang, har birini yuklab oling, vaqt shkalasi o'zgarishsiz qoladi.",
   "ctaText": "Ikki tilli subtitrlarni bo'lish"
  },
  "body": [
   {
    "h2": "Qachon bo'lish kerak",
    "ps": [
     "Pleyeringiz faqat bir tilli trekni xohlaydi; yoki qayta tarjima qilish uchun tarjima treki kerak, yoki boshqa tarjima qilingan versiya bilan birlashtirish uchun asl trek kerak. Ikki tilli subtitr yo **ikkita qatorli bitta kadr** (bitta qatorda asl, ikkinchisida tarjima) yoki **bir xil vaqt shkalasini ulashuvchi ikkita alohida kadr** — ikkalasini ham bo'lish mumkin."
    ]
   },
   {
    "h2": "Where to do it :: buni qayerda qilish kerak",
    "ps": [
     "[[Ikki tilli subtitr ajratuvchi|/bilingual.html]] ni oching va subtitringizni tashlang. Vosita ikki tilli shaklni avtomatik ravishda aniqlaydi: ikki qatorli bitta kadr yozuv tizimi bo'yicha bo'linadi, bir xil vaqt shkalasidagi ikkita kadr tartib bo'yicha. Reja ochiladigan ro'yxatidan **Ikkiga bo'lish** ni tanlang va Boshlash tugmasini bosing (yoki uni avtomatik ravishda qayta ishga tushiring). Natija sohasida ikkita qism ko'rsatiladi: `.orig` bilan belgilangani asl trek, `.dst` bilan belgilangani tarjima treki — har biri uchun \"Yuklab olish\" tugmasini bosing; ikkala trek aynan bir xil vaqt shkalasini ulashadi."
    ],
    "img": {
     "file": "bilingual-split",
     "alt": "Bo'lish natijasi: har birida yuklab olish tugmasi bo'lgan ikkita qism sifatidagi asl trek va tarjima treki",
     "cap": "Ikkiga bo'lish: .orig asl trek + .dst tarjima treki, har biri alohida yuklab olinadi"
    }
   },
   {
    "h2": "One common pitfall :: Keng tarqalgan xatolik",
    "ps": [
     "**Bir xil alifboga ega bo'lgan tillardagi ikki qatorli bitta kadrni (masalan, ingliz va fransuz tillari) bo'lib bo'lmaydi.** Treklar yozuv tizimi bo'yicha ajratilganda, ular bitta tizim deb hisoblanadi va bir tilli sifatida ko'rib chiqiladi. Bunday tarkibni avval bir xil vaqt shkalasidagi B shakliga o'tkazing, so'ngra bo'ling; ikki kadrli shakl vaqt shkalasi bo'yicha juftlashadi va tilga ahamiyat bermaydi. Ikkala shaklning nozik jihatlari uchun [[Ikki tilli subtitrlarni yaratishning ikki yo'li|/guides/make-bilingual-subtitles.html]] ga qarang."
    ]
   }
  ]
 },
 "srt-file-format": {
  "seo": {
   "title": "SRT fayli nima? Uni qanday ochish va tahrirlash mumkin – AI-SRTSub",
   "desc": "SRT (SubRip) subtitr fayllarining tuzilishi: raqam, vaqt qatori, matn. Uni matn muharririda qanday ochish mumkin, nima uchun pleyer uni rad etadi va buzilgan matn hamda vaqt belgisi xatolarini qanday tuzatish mumkin.",
   "h1": "SRT fayl formati tushuntirilgan",
   "intro": "SRT eng universal subtitr formati hisoblanadi: oddiy matn, sodda tuzilish, deyarli hamma joyda qabul qilinadi. Ushbu qo'llanma uning tuzilishini, qanday ochilishini va umumiy nosozliklarni qanday tuzatishni tushuntiradi.",
   "ctaText": "Subtitr konvertorini ochish"
  },
  "body": [
   {
    "h2": "SRT fayli qanday ko'rinishga ega",
    "ps": [
     "SRT (SubRip) oddiy matn hisoblanadi — istalgan matn muharriri uni ochadi. Har bir kadr uch qismdan iborat: **raqam qatori**, **vaqt qatori** va **matn**, ular bo'sh qatorlar bilan ajratilgan. Vaqt qatori `00:00:01,000 --> 00:00:03,500` ni ko'rsatadi — millisekundlardan oldin nuqta emas, **vergul** borligiga e'tibor bering."
    ],
    "img": {
     "file": "convert-upload",
     "alt": "Yuklash sohasi: raqamlar va vaqtni ko'rsatib yuklangan SRT fayli",
     "cap": "Standart SRT uch qismli kadr: raqam, vaqt qatori, matn"
    }
   },
   {
    "h2": "How to open it :: Uni qanday ochish kerak",
    "ps": [
     "Tarkibni o'qish uchun: sichqonchaning o'ng tugmasini bosing va istalgan **matn muharriri** bilan oching. Uni video bilan ishlatish uchun: fayl nomini **video fayl nomiga moslang** (kengaytmasidan tashqari), ikkalasini ham bir xil papkaga joylashtiring va VLC, PotPlayer yoki mpv kabi pleyerlar uni avtomatik ravishda yuklaydi; shuningdek, uni ijro etish oynasiga sudrab tashlashingiz mumkin."
    ]
   },
   {
    "h2": "Rad etishlar va buzilgan matnni tuzatish",
    "ps": [
     "**Buzilgan belgilar**: fayl UTF-8 emas — uni muharriringizda UTF-8 sifatida qayta saqlang. **Hech narsa ko'rsatilmayapti**: vaqt qatorida vergul (nuqta emas) ishlatilganligini va kadr raqamlari buzilmaganligini tekshiring (ko'p pleyerlar bo'shliqlarga toqat qiladi, ba'zilari yo'q). **Fayl HTML yoki JSON**: yuklab olish manbasi noto'g'ri edi; uni qaytadan oling."
    ]
   },
   {
    "h2": "SRT nima olib yurishi va nimani olib turolmasligi",
    "ps": [
     "SRT faqat matn va vaqtni tashiydi: **usblar yo'q** (shriftslar, ranglar), **joylashuv yo'q** (ekranning qayerida), **effektlar yo'q**. Bular uchun ASS kerak — [[SRT dan ASS ga|/guides/srt-to-ass.html]] qarang. Barcha formatlarni yonma-yon solishtirish uchun [[subtitr formatlarini solishtirish|/guides/subtitle-format-comparison.html]] ga qarang."
    ]
   }
  ]
 },
 "srt-fps-converter": {
  "seo": {
   "title": "SRT FPS konvertori – Subtitr kadrlar tezligini o'zgartirish – AI-SRTSub",
   "desc": "Film 24 kadr/s, eshittirish 25 kadr/s va subtitrlar har daqiqada ko'proq siljiydi: vaqt shkalasini bir marta 0.96 ga masshtablang va butun fayl maqsadli tezlikka tushadi.",
   "h1": "Subtitrlar kadrlar tezligini konvertatsiya qilish: 24 kadr/s dan 25 kadr/s gacha",
   "intro": "24 kadr/s li film subtitrlarini 25 kadr/s li manbada ijro eting va ular har daqiqada bir sekunddan ko'proq vaqtni yo'qotadi — yakuniy titrlarga kelib ular daqiqalarga qolib ketadi. Bitta masshtablash buni tuzatadi.",
   "ctaText": "Vaqt muharririni ochish"
  },
  "body": [
   {
    "h2": "Nima uchun kadrlar tezligining mos kelmasligi subtitrlarning siljishiga olib keladi",
    "ps": [
     "Kadrlar tezligini konvertatsiya qilish **ikki xil soat ostida bir xil vaqt oralig'ini** qayta o'qiydi. 100 daqiqali 24 kadr/s li film 6000 s × 24 = **144,000 kadrga** ega; 25 kadr/s li manbada bu 144,000 kadr 5760 sekundda o'ynaydi — **96 daqiqa**. Butun film 4 daqiqa qisqaroq ishlaydi, shuning uchun 50-daqiqadagi kadr taxminan 2 daqiqa kechikib paydo bo'ladi va yakuniy titrlarning subtitri hech qachon chiqmaydi."
    ]
   },
   {
    "h2": "Formula va umumiy ko'paytuvchilar",
    "ps": [
     "Maqsadli tezlik ÷ asl tezlik = ko'paytiruvchi. **24 dan 25 ga: 0.96 ga ko'paytiring** (24÷25); aksincha, 25 dan 24 ga: 1.0417. **25 dan 23.976 ga: 0.959 ga ko'paytiring**; aksincha: 1.0427. Vaqt muharririda **Tezlik bo'yicha masshtablash** qadamini qo'shing va qiymat katakchasiga ko'paytiruvchini kiriting."
    ],
    "img": {
     "file": "shift-step-rate",
     "alt": "0.96 kiritilgan holda tezlik bo'yicha masshtablash qadami",
     "cap": "0.96 bu 24÷25; sahifadagi eslatma hatto kadrlar tezligini konvertatsiya qilishni umumiy foydalanish sifatida eslatib o'tadi."
    }
   },
   {
    "h2": "Ikki tezlikni bilmaganingizda",
    "ps": [
     "Agar manbaning kadrlar tezligini topa olmasangiz, ko'paytiruvchini taxmin qilmang — uning o'rniga **ikkita tayanch nuqtadan** foydalaning: birinchi va oxirgi kadrning real paydo bo'lish vaqtini ikkita nuqta sifatida oling va ular orasidagi hamma narsa mutanosib ravishda orqaga cho'ziladi. [[subtitrlar borgan sari sinxronizatsiyadan chiqib ketishi|/guides/subtitles-out-of-sync.html]] ga qarang."
    ]
   },
   {
    "h2": "Shundan keyin nimalarni tekshirish kerak",
    "ps": [
     "Masshtablash har bir boshlanish va tugashni siljitadi; kadr davomiyliklari bir xil ko'paytiruvchi bilan cho'ziladi. Ishga tushirgandan so'ng, ikkita chekka nuqtani tekshiring: birinchi kadr (eng kichik asl xato) va oxirgi kadr (eng kattasi). Agar ikkala uchi mos kelsa, ular orasidagi hamma narsa ham mos keladi."
    ]
   }
  ]
 },
 "srt-simplified-to-traditional": {
  "seo": {
   "title": "Soddalashtirilgan subtitrlarni an'anaviyga o'tkazish – Tayvan yoki Gonkong – AI-SRTSub",
   "desc": "Soddalashtirilgan xitoycha subtitrlarni an'anaviyga aylantiring: Tayvan (hududiy lug'at bilan yoki usiz) yoki Gonkongni tanlang. Bir nechta xaritalash so'z bo'yicha hal qilinadi. Faqat muloqot o'zgaradi; vaqtlar o'z joyida qoladi.",
   "h1": "Soddalashtirilgan subtitrlarni an'anaviyga o'tkazish",
   "intro": "Tayvan yoki Gonkong auditoriyasiga mo'ljallangan soddalashtirilgan xitoycha subtitrni shunchaki konvertatsiya qilish kerak — lekin ikki mintaqa har xil narsalarni xohlaydi va noto'g'ri yo'nalishni tanlash mahalliy aholi ishlatmaydigan so'zlarni beradi.",
   "ctaText": "Bu subtitrni konvertatsiya qilish"
  },
  "body": [
   {
    "h2": "The need :: Ehtiyoj",
    "ps": [
     "Subtitrlaringiz soddalashtirilgan xitoy tilida va Tayvan yoki Gonkongdagi tomoshabinlarga yetib borishi kerak. Belgilarni birma-bir tuzatish real emas — bitta epizodda yuzlab kadrlar bor — va ikki mintaqa bir xil an'anaviy matnni xohlamaydi: lug'at farq qiladi va noto'g'ri yo'nalish birorta ham mahalliy aholi ishlatmaydigan so'zlarni keltirib chiqaradi."
    ]
   },
   {
    "h2": "Where to do it :: buni qayerda qilish kerak",
    "ps": [
     "[[Soddalashtirilgan–an'anaviy konvertatsiya|/hanconv.html]] ni oching, subtitrni sudrab tashlang va \"Konvertatsiya qilish\" ostida soddalashtirilgan → an'anaviy yo'nalishidan birini tanlang: umumiy an'anaviy, Tayvan (so'zlarni o'zgartirish), Tayvan (faqat belgilarni) yoki Gonkong. Konvertatsiya darhol sodir bo'ladi va natija sohasida yuklab olishga tayyor bo'lgan tayyor subtitr ko'rsatiladi.",
     "**Tayvanlik tomoshabinlar uchun**: agar hududiy lug'at ham o'zgarishi kerak bo'lsa, \"Tayvan (so'zlarni o'zgartirish)\" ni tanlang — \"dasturiy ta'minot\" va \"ma'lumot\" o'zlarining Tayvancha ekvivalentlariga aylanadi — yoki asl so'zlaringizni saqlagan holda belgi shakllarini o'zgartirmoqchi bo'lsangiz, \"Tayvan (faqat belgilarni)\" ni tanlang. **Gonkonglik tomoshabinlar uchun**: \"Gonkong\" ni tanlang, bu yerda \"dasturiy ta'minot\" boshqa shaklda yoziladi."
    ],
    "img": {
     "file": "hanconv-dir",
     "alt": "Konvertatsiya qilish kartasi: \"Soddalashtirilgan → Tayvancha an'anaviy (so'zlarni o'zgartirish)\" ni ko'rsatadigan manzil ochiladigan ro'yxati",
     "cap": "Tayvan va Gonkong har xil lug'atga ega bo'lgan alohida yo'nalishlardir"
    }
   },
   {
    "h2": "Common pitfalls :: Keng tarqalgan xatolar",
    "ps": [
     "**Bir nechta xaritalashdan qo'rqmang**: \"toza\", \"quruq\" va \"daraxt tanasi\" so'zlaridagi bir xil soddalashtirilgan belgi turli an'anaviy belgilarga to'g'ri keladi. Jadval buni ibora bo'yicha hal qiladi, shuning uchun hamma narsa bitta belgiga birlashtirib yuborilmaydi.",
     "**Faqat muloqot konvertatsiya qilinadi**: vaqtlar, indeks raqamlari va ASS uslub qatorlariga tegilmaydi, shuning uchun natija foydalanishga tayyor.",
     "**Hech narsa o'zgarmadi? Vahima qilishdan oldin tekshiring**: agar statistika paneli 0 ta o'zgartirilgan qatorni xabar qilsa, yo faylda xitoycha belgilar yo'q yoki format noto'g'ri aniqlangan — \"Aniqlangan format\" yuklaganingizga mos kelishini tekshiring."
    ]
   },
   {
    "h2": "Related :: Tegishli",
    "ps": [
     "Barcha to'qqizta yo'nalishning to'liq tushuntirishi — [[Soddalashtirilgan va an'anaviy subtitrlarni qanday konvertatsiya qilish kerak|/guides/hanconv.html]]; nima uchun bu shunchaki belgilarni almashtirish emas — [[Soddalashtirilgan va an'anaviy belgilarni almashtirish emas|/guides/simplified-traditional-chinese.html]]; an'aviydan soddalashtirilganga qaytish ham [[Soddalashtirilgan–an'anaviy konvertatsiya|/hanconv.html]] da mavjud."
    ]
   }
  ]
 },
 "srt-to-ass": {
  "seo": {
   "title": "SRT dan ASS ga konvertor – Subtitrlarni onlayn konvertatsiya qilish – AI-SRTSub",
   "desc": "1920×1080 tuvali va har qanday pleyerda qo'shib yuklashga tayyor toza standart uslub bilan SRT subtitrlarini ASS (Advanced SubStation Alpha) ga konvertatsiya qiling. Brauzeringizda ishlaydi.",
   "h1": "SRT to ASS :: SRT dan ASS ga",
   "intro": "SRT subtitrlarini ASS ga aylantiring: faylni tashlang, ASS ni tanlang, yuklab oling. Siz uchun 1920×1080 tuvali va toza standart uslub yaratiladi.",
   "ctaText": "Convert SRT → ASS :: SRT → ASS ga konvertatsiya qilish"
  },
  "body": [
   {
    "h2": "When you need ASS :: Qachon ASS kerak bo'ladi",
    "ps": [
     "Qo'shib yuklanadigan subtitrga **yaxshiroq joylashuv va uslubni boshqarish** kerak bo'lganda ASS dan foydalaning: u SRT da yo'q tushunchalarni tashiydi — tuval o'lchami, shrift uslublari, tekislash. mpv, PotPlayer, VLC va ko'p pleyerlar buni to'g'ridan-to'g'ri qo'llab-quvvatlaydi."
    ]
   },
   {
    "h2": "Chiqish qanday ko'rinishga ega",
    "ps": [
     "Vosita standart sarlavhani qayta quradi: **1920×1080 tuvali**, aqlli o'rash (WrapStyle 0) va bitta Standart uslub — Arial 54, qora hoshiyali oq matn, pastki markazda. Har bir kadr bu uslubdan foydalanadi."
    ],
    "img": {
     "file": "convert-opt-ass",
     "alt": "ASS - Advanced SubStation tanlangan chiqish formati ochiladigan ro'yxati",
     "cap": "Chiqish sifatida ASS ni tanlang va konvertatsiya qilgandan keyin yuklab oling"
    }
   },
   {
    "h2": "Uslublar saqlanib qoladimi?",
    "ps": [
     "SRT da boshidan uslub tushunchasi yo'q. Va agar manbangiz allaqachon ASS bo'lsa, konvertatsiya qilish **standart uslubni qayta quradi va asl nusxasini saqlamaydi** — ASS ni qayta uslublash uchun maxsus subtitr muharriridan foydalaning. Vaqt va matnga qaysi yo'l bilan bo'lmasin ta'sir qilmaydi."
    ]
   }
  ]
 },
 "srt-to-excel": {
  "seo": {
   "title": "Subtitrlarni Excel ga o'tkazish – Qatorma-qator tahrirlash – AI-SRTSub",
   "desc": "SRT subtitrlarini Excel ga eksport qiling: to'rt ustun bo'ylab har bir kadr uchun bitta qator — indeks, boshlanish, tugash va matn. Vaqt matn sifatida saqlanadi, qator uzilishlari o'zgarishsiz qoladi va tahrirlangan jadvalni qaytadan subtitrlarga o'tkazish mumkin.",
   "h1": "Subtitrlarni Excel ga o'tkazish",
   "intro": "Matn muharririda yuzlab kadrlarni tahrirlash juda charchatadi. Excel da har bir kadr qator hisoblanadi, shuning uchun filtrlash, izoh qoldirish va topish va almashtirish funksiyalari mavjud bo'ladi — va tahrirlar SRT faylingizga qaytib boradi.",
   "ctaText": "Export to Excel :: Excel ga eksport qilish"
  },
  "body": [
   {
    "h2": "The need :: Ehtiyoj",
    "ps": [
     "Tahrirlash, ommaviy so'zlarni o'zgartirish yoki ishni bir necha kishi o'rtasida bo'lish — bularning barchasi oddiy matnga qaraganda jadvalda ancha tezroq bajariladi. SRT o'zi oddiy matn, lekin uning kadr tuzilishi (indeks, vaqt, muloqot) to'rtta elektron jadval ustuniga aniq mos keladi."
    ]
   },
   {
    "h2": "Where to do it :: buni qayerda qilish kerak",
    "ps": [
     "[[Subtitr ⇄ jadval konvertatsiyasi|/table.html]] ni oching, \"jadvalga\" rejimiga o'ting, SRT ni sudrab tashlang va oldindan ko'rish to'rtta ustun bo'ylab har bir kadr uchun bitta qator bilan to'ldiriladi — indeks, boshlanish, tugash, matn. \"Excel (.xlsx) yuklab olish\" tugmasini bosing va u sizniki. VTT ham xuddi shunday qo'llab-quvvatlanadi.",
     "Tahrirlashni tugatganingizda: rejimni \"subtitrga\" deb o'zgartiring, jadvalni qayta joylashtiring va yana SRT olasiz. Qoida shundan iboratki, boshlanish, tugash va matn uchun uchta ustun (inglizcha Start / End / Text ham ishlaydi) istalgan tartibda bo'lishi kerak."
    ],
    "img": {
     "file": "table-prev",
     "alt": "Jadvalni oldindan ko'rish: statistika paneli bilan birga to'rtta ustun bo'ylab qator sifatida har bir SRT kadr",
     "cap": "To'rtta ustun sifatida joylashtirilgan SRT, xuddi shu tarzda qaytarib konvertatsiya qilinishi mumkin"
    }
   },
   {
    "h2": "Common pitfalls :: Keng tarqalgan xatolar",
    "ps": [
     "**Avval buzilgan kodlashni tuzating**: bu sahifa faqat UTF-8 ni o'qiydi. Ekran to'la savol belgilari yoki katakchalar [[Abrakadabra matnni tuzatish|/repair.html]] sahifasiga borish kerakligini anglatadi.",
     "**CSV yoki xlsx**: fayl Excel ga tushganda .xlsx ni tanlang, shunda vaqt ustuni qayta formatlanmaydi; CSV ko'proq portativ, lekin Excel uni boshqa narsa deb o'qishi mumkin — agar shunday bo'lsa, vaqt ustunini \"Matn\" qilib o'rnating.",
     "**ASS ishlamaydi**: ASS uslub ko'rsatmalarini tashiydi, shuning uchun uni jadvalga qo'yishdan oldin SRT ga o'tkazing."
    ]
   },
   {
    "h2": "Related :: Tegishli",
    "ps": [
     "To'liq ikki tomonlama qo'llanma — [[Subtitrlarni Excel / CSV ga qanday konvertatsiya qilish kerak|/guides/table.html]]; keyinroq tarjima qilish — [[Subtitrlarni tarjima qilish|/translate.html]]; yetkazib berishdan oldingi oxirgi tekshiruv — [[Subtitrlarni sifat nazorati (QC)|/qc.html]]"
    ]
   }
  ]
 },
 "srt-to-vtt": {
  "seo": {
   "title": "SRT dan VTT ga konvertor – Subtitrlarni onlayn konvertatsiya qilish – AI-SRTSub",
   "desc": "HTML5 trek elementlari uchun SRT subtitrlarini VTT (WebVTT) ga konvertatsiya qiling. Vaqt belgisi vergullari avtomatik ravishda nuqtaga aylanadi. Brauzeringizda ishlaydi, hech narsa yuklanmaydi.",
   "h1": "SRT to VTT :: SRT dan VTT ga",
   "intro": "SRT subtitrlarini VTT ga aylantiring: faylni tashlang, VTT ni tanlang, yuklab oling. Vaqt belgilari veb-format uchun qayta yoziladi, barchasi brauzeringizda.",
   "ctaText": "Convert SRT → VTT :: SRT → VTT ga konvertatsiya qilish"
  },
  "body": [
   {
    "h2": "When you need VTT :: Qachon VTT kerak bo'ladi",
    "ps": [
     "Veb pleyerlar (HTML5 `<track>` elementi), YouTube subtitr yuklash va ko'p brauzerga asoslangan pleyerlar faqat **VTT (WebVTT)** ni qabul qiladi — SRT ni emas. Agar sizda faqat SRT bo'lsa, bitta konvertatsiya uni ishga tushiradi."
    ]
   },
   {
    "h2": "Ikki formatning farqi nimada",
    "ps": [
     "Tarkib deyarli bir xil; uchta narsa boshqacha yoziladi: **WEBVTT sarlavha qatori** (VTT da talab qilinadi); vaqt belgilaridagi **millisekund ajratuvchi** — SRT verguldan foydalanadi (00:00:01,000), VTT esa nuqtadan foydalanadi (00:00:01.000); va VTT SRT da yo'q NOTE va STYLE bloklariga ruxsat beradi."
    ],
    "img": {
     "file": "convert-result",
     "alt": "WEBVTT sarlavhasi va nuqtali vaqt belgilarini ko'rsatadigan konvertatsiya natijasi",
     "cap": "Konvertatsiya qilingan VTT: WEBVTT birinchi qatori, nuqtali vaqt belgilari"
    }
   },
   {
    "h2": "Qanday qilib aylantirish kerak",
    "ps": [
     "[[Konvertor|/convert.html]] ni oching, SRT ni tashlang, chiqish sifatida **VTT - WebVTT** ni tanlang, so'ng konvertatsiya qiling va yuklab oling. Kadrlar tartibi, vaqt qiymatlari va ko'p qatorli matn o'z holicha saqlanadi — faqat sintaksis o'zgaradi. Teskari yo'nalishdami? [[VTT dan SRT ga|/guides/vtt-to-srt.html]] qarang."
    ]
   }
  ]
 },
 "subtitle-format-comparison": {
  "seo": {
   "title": "SRT vs VTT vs ASS vs SBV vs LRC – Qaysi subtitr formati – AI-SRTSub",
   "desc": "Beshta umumiy subtitr formatining imkoniyatlarini taqqoslash: matn uslubi, joylashuv, vaqt aniqligi, har biri qayerga tegishli va ular o'rtasida qanday konvertatsiya qilish kerak.",
   "h1": "Subtitr formatini tanlash: SRT / VTT / ASS / SBV / LRC",
   "intro": "Beshta formatda saqlangan bir xil subtitr beshta turli maqsadga xizmat qiladi. Ushbu qo'llanma har bir format nima qila olishini va ular o'rtasida qanday o'tish mumkinligini taqqoslaydi.",
   "ctaText": "Subtitr konvertorini ochish"
  },
  "body": [
   {
    "h2": "Bitta jumlada formatni tanlang",
    "ps": [
     "Pleyerga qo'shib yuklash, maksimal moslik → **SRT**; veb pleyerlar (HTML5 trek) yoki YouTube ga yuklash → **VTT**; shriftslar, ranglar, joylashuv, effektlar → **ASS**; YouTube dan yuklab olingan → **SBV** (qo'llab-quvvatlashni kengaytirish uchun SRT ga o'tkazing); qo'shiq so'zlari, qatorma-qator kuylash → **LRC**."
    ],
    "img": {
     "file": "convert-opt",
     "alt": "Chiqish formati ochiladigan ro'yxati: oltita maqsadli format",
     "cap": "Konvertordagi oltita eksport maqsadi ushbu qo'llanmadagi har bir formatni qamrab oladi"
    }
   },
   {
    "h2": "Imkoniyatlarni taqqoslash",
    "ps": [
     "**SRT**: oddiy matn + vaqt, uslub yoki joylashuv yo'q, moslik chempioni. **VTT**: matn + vaqt, brauzerlar tomonidan tubdan qo'llab-quvvatlanadi, joylashuv va asosiy uslubni tashiye oladi, millisekundlardan oldin nuqta. **ASS**: matn + vaqt + to'liq uslub (shriftslar, ranglar, hoshiyalar, joylashuv, effektlar), santisekundlargacha vaqt aniqligi. **SBV**: YouTube'ning minimal subtitr formati, boshlanish va tugash bitta qatorda. **LRC**: qo'shiq so'zlari formati, faqat boshlanish vaqtlari, tugash vaqtlari yo'q, uslub yo'q."
    ]
   },
   {
    "h2": "Formatlar orasidagi yo'llar",
    "ps": [
     "Bulardan istalgani [[konvertor|/convert.html]] da ikkala yo'nalishda ham konvertatsiya qilinadi: o'qish srt, vtt, ass (shu jumladan ssa), sbv, lrc, txt ni qo'llab-quvvatlaydi; eksport qilish srt, vtt, ass, sbv, lrc, txt ni qo'llab-quvvatlaydi. Umumiy yo'nalishlarning har biri o'z qo'llanmasiga ega: [[SRT dan VTT ga|/guides/srt-to-vtt.html]], [[VTT dan SRT ga|/guides/vtt-to-srt.html]], [[SRT dan ASS ga|/guides/srt-to-ass.html]], [[ASS dan SRT ga|/guides/ass-to-srt.html]], [[SBV dan SRT ga|/guides/sbv-to-srt.html]], [[LRC dan SRT ga|/guides/lrc-to-srt.html]]."
    ]
   },
   {
    "h2": "Konvertatsiyalar nimani yo'qotadi",
    "ps": [
     "SRT ga o'tkazish har doim uslub va joylashuvni tashlab yuboradi (SRT ularni saqlay olmaydi). Ushbu vosita bilan ASS ga o'tkazish **standart uslubni qayta quradi va asl nusxasini saqlamaydi**. LRC dan SRT ga o'tkazish uchun tugash vaqtlarini to'ldirish kerak (har bir qator keyingisigacha davom etadi; oxirgisi 3 sekund oladi). Vaqt qiymatlari va matn har qanday yo'nalishda bir xil bo'lib qoladi."
    ]
   }
  ]
 },
 "subtitle-garbled-characters": {
  "seo": {
   "title": "Subtitr abrakadabralari qayerdan kelib chiqadi – Uni aniqlang, tuzating – AI-SRTSub",
   "desc": "Abrakadabra noto'g'ri o'qishni anglatadi, shikastlangan faylni emas. Almashtirish belgilari, urg'uli harflar devori va tushunarsiz belgilar ketma-ketligi har biri bir sababga ishora qiladi — qaysilari tiklanishi va qaysilari hech qachon tiklanmasligini bilib oling.",
   "h1": "Subtitr abrakadabralari qayerdan kelib chiqadi",
   "intro": "UTF-8 sifatida o'qilgan va GBK sifatida o'qilgan bir xil baytlar butunlay boshqacha ikki xil belgisiz to'plam bo'lib chiqadi. Axlat matnning qanday ko'rinishi qaysi qadam noto'g'ri ketganining bevosita dalilidir.",
   "ctaText": "Abrakadabratni tuzatish vositasini ochish"
  },
  "body": [
   {
    "h2": "Fayl yaxshi — u noto'g'ri o'qilgan",
    "ps": [
     "Subtitr fayli nima saqlashi baytlardir. Baytlarni belgilarga aylantirish ular qaysi kodlashda yozilganligini bilishni talab qiladi — buni noto'g'ri qilsangiz, abrakadabra olasiz. Fayldan birorta ham bayt yo'qolmagan; uni to'g'ri kodlash bilan qaytadan o'qing va belgilar qaytib keladi.",
     "Bu ishni ikkiga bo'ladi: **u qaysi kodlashda boshlanganini aniqlash** va **uni pleyeringiz aniqlay oladigan kodlash sifatida saqlash**. Birinchisi sinovli dekodlash va baholashdan kelib chiqadi, ikkinchisi nusxasini saqlashdan. Ular turli xil muammolarni hal qiladi."
    ]
   },
   {
    "h2": "Beshta ko'rinish, beshta sabab",
    "ps": [
     "Abrakadabra tasodifiy emas — uning qanday ko'rinishi nima sabab bo'lganini oshkor qiladi:"
    ],
    "img": {
     "file": "repair-diag",
     "alt": "Har bir turdagi abrakadabra izlarini sanab o'tadigan tashxis kartasi",
     "cap": "Tashxis abrakadabralarni ularni birlashtirib yubormasdan, sababi bo'yicha saralaydi"
    }
   },
   {
    "h2": "Nima uchun almashtirish belgisini tuzatib bo'lmaydi",
    "ps": [
     "Almashtirish belgisi ajratuvchi chiziqdir. `�` baytlar allaqachon **oldingi bosqichda** (odatda faylni o'qib, uni qayta saqlaydigan qandaydir dastur tomonidan) tashlab yuborilganligini va nima tashlab yuborilganligi haqida hech narsa yozib olinmaganligini anglatadi. Shu nuqtada orqaga qarab fikr yuritish uchun hech narsa yo'q — buni hech kim tuzata olmaydi.",
     "Shuning uchun tuzatish sahifasi ikkita holatni har xil hal qiladi. Faylni yuklang va asl baytlar butun bo'lib, har bir kodlashni sinab ko'rishga imkon beradi; agar kiritilgan matnda allaqachon almashtirish belgisi mavjud bo'lsa, u buni ochiq-oydin aytadi: \"tuzatib bo'lmaydi, iltimos asl faylni yuklang\".",
     "Shuningdek, teskari holat ham mavjud: kontent mukammal o'qiladi, lekin pleyeringiz hali ham axlat ko'rsatadi. Ayb faylda emas — **pleyergina noto'g'ri kodlashni tanlagan**. Matnni tahrirlash yordam bermaydi; nusxasini BOM bilan UTF-8 yoki GBK sifatida saqlang va unga shuni bering."
    ],
    "img": {
     "file": "repair-up",
     "alt": "Yuklash sohasi: ikkita kirish nuqtasi sifatida sudrab tashlash va joylashtirish",
     "cap": "Agar iloji bo'lsa, faylni yuklang — baytlarning butunligi tuzatish uchun nimadir borligini anglatadi"
    }
   },
   {
    "h2": "Tuzatish vaqtida u nimani solishtirmoqda",
    "ps": [
     "Vosita har bir mantiqiy kodlashni sinab ko'radi, so'ngra har bir natijani baholaydi: uning qancha qismi umumiy belgilardan iboratligi, urg'u satrlari, ramzlar satrlari bor-yo'qligi, CJK qatorlari tushunarsiz belgilar devori ekanligi. Eng yaxshi ball olgan natija ro'yxatning boshiga chiqadi.",
     "**Agar biron bir ball aniq yaxshiroq bo'lmasa, hech narsa tavsiya etilmaydi** — sizni faqat tilga o'xshash narsa bilan aldab qo'ygandan ko'ra, \"bu o'zi yaxshi o'qilyapti\" deb aytgani afzal. Ikki marta buzilgan matn (bir marta noto'g'ri saqlangan, keyin bir marta noto'g'ri tuzatilgan) eng yaxshi nomzodlar ustida qo'shimcha bir raund orqaga yechishni oladi."
    ],
    "img": {
     "file": "repair-fix",
     "alt": "Ball bo'yicha saralangan, har biri o'zining kodlash juftligi bilan belgilangan nomzodlar ro'yxati",
     "cap": "Ball bo'yicha tartiblangan nomzodlar — aniq g'olib yo'q, tavsiya yo'q"
    }
   },
   {
    "h2": "To'g'ri kodlashni saqlash ishni yakunlaydi",
    "ps": [
     "Tuzatilgan matn baribir pleyeringiz taniydigan kodlash sifatida saqlanishi kerak. Windows dagi pleyerlar odatda kodlashni aniqlash uchun BOM ga tayanadi, shuning uchun **BOM bilan UTF-8** eng kam tashvish tug'diradi; eski apparatura va ba'zi mintaqaviy pleyerlar GBK ni xohlaydi. Siz UTF-8, UTF-8 (BOM bilan), GBK, Big5, Shift_JIS yoki EUC-KR ni tanlashingiz mumkin va agar biror narsa mos kelmasa, boshqasini tanlash tavsiya etiladi (GBK koreys tilini ushlab turolmaydi)."
    ],
    "img": {
     "file": "repair-out",
     "alt": "Natija sohasi: boshqa nom bilan saqlash kodlash ochiladigan ro'yxati va yuklab olish tugmasi",
     "cap": "Uni pleyer taniydigan narsa sifatida saqlang va abrakadabra haqiqatan ham hal qilinadi"
    }
   },
   {
    "h2": "Tegishli vositalar va qo'llanmalar",
    "ps": [
     "To'liq qo'llanma — [[Buzilgan subtitrlarni qanday tuzatish kerak|/guides/repair.html]]; SRT fayli aslida nimani saqlaydi — [[SRT fayli ichida nima bor|/guides/srt-file-format.html]]; kodlash yaxshi, lekin kontent iflos (suv belgilari, reklamalar, eshitish qobiliyati cheklanganlar teglar) — [[Subtitrlarni tozalash|/clean.html]]."
    ]
   }
  ]
 },
 "subtitle-glossary": {
  "seo": {
   "title": "Atamalar jadvallari: bitta mavsum, bitta lug'at – Uni qachon yaratish kerak – AI-SRTSub",
   "desc": "Atamalar jadvali izchil tarjima qilinmagan bir xil so'zni tuzatadi: uni qachon yaratish kerak, uni mavsum davomida qanday qayta ishlatish kerak, nima uchun butun so'zni moslashtirish xitoy tilida hech qanday ta'sir ko'rsatmasligi va unga nimani bermaslik kerakligi.",
   "h1": "Atamalar jadvallari: mavsumning izchilligini saqlash",
   "intro": "Birinchi epizodda ism A va yettinchi epizodda B bo'lganda, tomoshabinlar ularni ikkita qahramon deb o'ylashadi. Atamalar jadvali aynan shuning oldini oladi — u narsalar nima deb atalishini tuzatadi.",
   "ctaText": "Ommaviy atamalarni almashtirishni ochish"
  },
  "body": [
   {
    "h2": "Atamalar jadvali izchilliksizlikni tuzatadi",
    "ps": [
     "Subtitrlardagi so'zlar bilan bog'liq muammolar ikki xil bo'ladi: \"bu so'z noto'g'ri tarjima qilingan\" va \"bir xil so'z bir joydan boshqasiga turlicha tarjima qilingan\". Birinchisi lug'at muammosi; ikkinchisi atamalar jadvali nima uchun mo'ljallanganligidir.",
     "Ikkinchisi ham keng tarqalgan, ham aniqlash qiyinroq: `Thor` birinchi epizodda \"Tor\"ga va yettinchi epizodda \"Donar\"ga aylanadi va har bir epizod o'zicha yaxshi ko'rinadi, butun serial esa tomoshabinlarda yangi qahramon paydo bo'ldi degan taassurot qoldiradi. Atamalar jadvali \"bu asar uni Tor deb ataydi\" degan qoidani butun subtitr fayliga bir vaqtning o'zida qo'llaniladigan bajariladigan qoidaga aylantiradi."
    ]
   },
   {
    "h2": "Uni yaratish qachon arziydi",
    "ps": [
     "Har bir subtitr fayliga ham atamalar jadvali kerak emas. Unga asos beradigan holatlar odatda quyidagilar:"
    ],
    "img": {
     "file": "glossary-rules",
     "alt": "Atamalar jadvalida toifa bo'yicha guruhlangan almashtirish qoidalari",
     "cap": "Qoidalarni guruhlash uchun va tahrirlash paytida birini vaqtincha o'chirib qo'yish uchun # izohlaridan foydalaning"
    }
   },
   {
    "h2": "Mavsum davomida bitta jadvalni saqlash",
    "ps": [
     "Atamalar jadvali **bosqichma-bosqich** saqlanadi: birinchi epizodda ismlarni hal qiling, so'ngra har safar yangi atama paydo bo'lganda qoida qo'shing va mavsum oxiriga kelib jadval to'liq bo'ladi. Xuddi shu serialning keyingi mavsumi uchun shundan boshlang.",
     "Qoidalarni qat'iy talab qilinganidan biroz kengroq yozing — \"Tor\"ni hal qilganingizdan so'ng, \"Donar -> Tor\"ni ham qo'shing, shunda boshqa birovning subtitrlari ham bir xil o'tishda moslashtirilishi mumkin.",
     "Shundan keyin har doim **o'zgarishlar ro'yxatini** o'qing: u har bir kadrni, har bir qatorni va nima nimaga aylanganini nomlaydi. Bu o'zgarish to'g'ri bo'lganini va haddan tashqari oshirib yuborilmaganini tasdiqlashingiz mumkin bo'lgan yagona joy va sizga yoqmagan har qanday yozuvni bir bosish bilan bekor qilish mumkin."
    ],
    "img": {
     "file": "glossary-diff",
     "alt": "Natija sohasidagi individual o'zgarishlar ro'yxati",
     "cap": "Har bir o'zgarish ro'yxatga kiritilgan; bekor qilishni istamagan bittasini bosing"
    }
   },
   {
    "h2": "Atamalar jadvaliga nima bermaslik kerak",
    "ps": [
     "Atamalar jadvali **so'zlarni** o'zgartiradi. Ushbu uchta narsa uning vazifasidan tashqarida va shunday bo'lishi kerak:",
     "**Grammatika va jumla tuzilishi** — so'zni jumlaga aylantira olmaysiz; jumla darajasidagi ish [[Subtitrlarni tarjima qilish|/translate.html]] ga yoki insonga qaytadi.",
     "**Kontentni tozalash** — suv belgilari, reklamalar va SDH kadrlar kabi butun qatorlarni tashlab yuborish [[Subtitrlarni tozalash|/clean.html]] ga tegishli; atamalar jadvali qoidalari almashtiradi, ular qatorlarni o'chirmaydi.",
     "**Vqt shkalalari** — atamalar jadvali hech qachon vaqtga tegmaydi. Global siljish yoki tezlik muammosi uchun [[Vaqt shkalasini moslash|/shift.html]] ga o'ting."
    ]
   },
   {
    "h2": "Noto'g'ri tushunish oson bo'lgan ba'zi narsalar",
    "ps": [
     "**Butun so'zni moslashtirish belgilangan bo'lsa ham, xitoy tili hali ham pastki satrlarni almashtiradi — bu odatiy hol.** Xitoy va yapon tillari so'zlarni bo'shliqlar bilan ajratmaydi, shuning uchun vosita so'z chegaralarini aniqlay olmaydi va butun so'zni moslashtirish u yerda hech qanday ta'sir ko'rsatmaydi; `art` `start` ga tegmaydi, himoya faqat ingliz tili uchun ishlaydi.",
     "**Tartib natijani o'zgartiradi.** Qoidalar yuqoridan pastga ishlaydi va bitta qoida tomonidan ishlab chiqarilgan matn undan pastdagi qoidalar tomonidan qaytadan skanerlanadi. A ni B bilan va keyin B ni C bilan almashtiring va oxirida C olasiz.",
     "**Faqat tarjimani o'zgartirish uchun qamrovni o'rnating.** Ikki tilli faylda \"faqat ikkinchi qator\"ni tanlang; faqat bitta qatorli yozuvlar har qanday bir qatorli sozlama ostida o'zgarishsiz qoladi — vosita qaysi tomon asl ekanligini taxmin qilmaydi.",
     "**Atamalar jadvali saqlanmaydi.** Sahifani har safar ochganingizda u bo'sh bo'ladi, shuning uchun o'zingizning matnli faylingizni saqlang va uni uzating."
    ]
   },
   {
    "h2": "Tegishli vositalar va qo'llanmalar",
    "ps": [
     "To'liq qo'llanma uchun [[Subtitrlarda atamalarni qanday ommaviy almashtirish kerak|/guides/glossary.html]] ga qarang; agar kontent iflos bo'lsa, avval [[Subtitrlarni tozalash|/clean.html]] ni ishga tushiring; ismlar hal qilingach va boshqa tillar kerak bo'lsa, [[Subtitrlarni tarjima qilish|/translate.html]] ga o'ting; va natijani [[Subtitrlarni sifat nazorati (QC)|/qc.html]] orqali o'tkazing."
    ]
   }
  ]
 },
 "subtitle-quality-check": {
  "seo": {
   "title": "Yetkazib berishdan oldingi subtitrlarni sifat nazorati (QC) nazorat ro'yxati – AI-SRTSub",
   "desc": "Subtitrlarni yetkazib berish nazorat ro'yxati: qoplamalar, o'qish tezligi, qator kengligi va tinish belgilari ko'pincha xato qiladi. 17 QC qoidalarini ishga tushiring — muammolarning yarmi bir bosish bilan tuzatiladi.",
   "h1": "Yetkazib Berishdan Oldin Nimani Tekshirish Kerak",
   "intro": "Tayyor subtitrlar yetkazib berishga tayyor emas: tomoshabinlar bir qarashda sezadigan muammolar yuz marta ko'rganingizdan keyin o'zingiz ko'ra olmaydigan muammolardir. Ushbu nazorat ro'yxati o'sha yakuniy bosqichni qamrab oladi.",
   "ctaText": "Subtitr QC tekshiruvini ishga tushirish"
  },
  "body": [
   {
    "h2": "Nima uchun muammolarni o'zingiz ko'ra olmaysiz",
    "ps": [
     "Subtitr yasaydigan har bir kishi kontentni juda yaxshi biladi — har bir qator keyingi navbatda nima deyishini bilasiz, shuning uchun hech qachon hech narsa juda tez tuyulmaydi; tartibni yuzlab marta ko'rgansiz va ko'zlaringiz kamchiliklarni o'z-o'zidan o'tkazib yuboradi. Shuning uchun yetkazib berishdan oldingi tekshiruv \"uni boshidan yana ko'rishga\" tayanib qolmasligi kerak — u **raqamlarga nisbatan o'lchanishi** kerak: o'qish tezligi, qator kengligi, davomiylik, qoplamalar. Raqamlar hal qilsin."
    ]
   },
   {
    "h2": "Eng ko'p uchraydigan oltita xato",
    "ps": [
     "Yetkazib berishni qanchalik tez barbod qilishiga qarab tartiblangan:"
    ]
   },
   {
    "h2": "How to Check :: Qanday tekshirish kerak",
    "ps": [
     "[[Subtitrlarni sifat nazorati (QC)|/qc.html]] ni oching va subtitrlaringizni tashlang; tilni avtomatik aniqlashga o'rnating (27 ta til, har biri o'z qoidalar darajasiga ega). Hisobot uch darajadagi topilmalarni sanab o'tadi — **xatolar / ogohlantirishlar / maslahatlar** — har biri kadr raqami va o'lchangan qiymat bilan. Xatolar bilan shug'ullanish kerak (buzilgan matn, vaqt belgisi formati, boshlanishidan oldin tugash, buzilgan raqamlar); ogohlantirishlar holatga bog'liq (qoplamalar, o'qish tezligi, qator kengligi, davomiylik); maslahatlar sayqallash hisoblanadi (qatorni uzish joyi, bo'shliqlar, tinish belgilari)."
    ],
    "img": {
     "file": "qc-report",
     "alt": "QC hisoboti: uch darajali muammolar ro'yxati, har bir topilma kadr raqami va o'lchangan va chegara taqqoslashi bilan",
     "cap": "Har bir topilma uchun kadr raqami va o'lchangan qiymatni beradigan uch darajali hisobot"
    }
   },
   {
    "h2": "Bir Bosish Bilan Nima Tuzatilishi Mumkin",
    "ps": [
     "Raqamlar, bo'sh yozuvlar, qayta o'rash, bo'shliqlar va tinish belgilari — **vaqtga tegmaydigan** har qanday narsa — avtomatik ravishda tuzatilishi mumkin; vaqtni o'zgartiradigan tuzatishlar (boshlanish va tugashni almashtirish, qoplamalarni siljitish, davomiyliklarni qisqartirish yoki cho'zish) sukut bo'yicha belgisiz qoldiriladi va faqat ta'sirini tasdiqlaganingizdan keyin belgilanmashi kerak. **Limitdan oshgan o'qish tezligining avtomatik tuzatilishi yo'q** — mashina qaysi so'zni kesish kerakligini bilmaydi, shuning uchun tarjimani o'zingiz qisqartiring yoki vaqtni biroz bo'shashtiring; [[O'qish uchun juda tez subtitrlar|/guides/subtitle-too-fast.html]] ga qarang. Tuzatgandan so'ng, yangi tekshiruv avtomatik ravishda ishga tushadi va hisobot faqat haqiqatan ham tuzatilgan narsalarni sanaydi."
    ]
   },
   {
    "h2": "While You’re At It :: Shu bilan birga",
    "ps": [
     "Hisobot sahifasi to'g'ridan-to'g'ri oddiy matnli `.qc.txt` hisobotini yuklab olishi mumkin — uni yetkazib berishga ilova qiling, shunda boshqa tomon bir qarashda nimalarni tekshirganingizni ko'radi. Yangi tarjima qilingan subtitrlar uchun yetkazib berishdan oldin QC ni ishga tushiring; umumiy vaqt shkalasining siljishi boshqacha turdagi muammo — agar tekshirilgandan keyin ham o'qish tezligi xato bersa, [[Sinxronizatsiyadan chiqib ketayotgan subtitrlar|/guides/subtitles-out-of-sync.html]] ga qarang."
    ]
   }
  ]
 },
 "subtitle-speed-converter": {
  "seo": {
   "title": "Video tezligi o'zgargandan so'ng subtitrlarni sinxronlash – AI-SRTSub",
   "desc": "Video tezlashtirildi yoki sekinlashtirildi va subtitrlar endi mos kelmaydi: tezlik bo'yicha masshtablash qadamiga tezlik koeffitsientini kiriting va butun vaqt shkalasi video bilan birga cho'ziladi.",
   "h1": "Video tezligi o'zgargandan so'ng subtitrlarni moslashtirish",
   "intro": "Video umumiy jihatdan tezroq yoki sekinroq bo'ldi, subtitrlar asl sur'atda qoldi — bir nuqtadan keyingi hamma narsa noto'g'ri. Koeffitsientni kiriting va butun vaqt shkalasi video bilan birga masshtablanadi.",
   "ctaText": "Vaqt muharririni ochish"
  },
  "body": [
   {
    "h2": "Siljish o'rniga tezlikni qachon ishlatish kerak",
    "ps": [
     "Video **butunlay** tezlashtirildi yoki sekinlashtirildi (tahrirlash dasturida masalan 0.9x yoki 1.25x) va har bir kadr o'zining asl maromni saqlab qoldi: boshi mos keladi va qanchalik uzoqlashsangiz, shunchalik yomonlashadi — doimiy nisbat bilan. Bu tezlik muammosi. Agar butun fayl o'smagani holda shunchaki belgilangan miqdorga siljigan bo'lsa, siljishning o'zi yetarli — [[butun subtitr faylini oldinroq yoki keyinroq siljitish|/guides/shift-subtitle-timing.html]] ga qarang."
    ]
   },
   {
    "h2": "Qaysi raqamni kiritish kerak",
    "ps": [
     "Subtitrlar videoga ergashishi kerak, shuning uchun **video haqiqatda o'zgargan koeffitsientni** kiriting: 1.25x tezlashtirish kadr vaqtlari yetib olish uchun 1.25 ga ko'payishini anglatadi; 0.9x sekinlashtirish 0.9 ga ko'paytiradi. Vaqt muharririda **Tezlik bo'yicha masshtablash** qadamini qo'shing va qiymat katakchasiga koeffitsientni kiriting."
    ],
    "img": {
     "file": "shift-step-rate",
     "alt": "Qiymat katakchasida koeffitsient bo'lgan tezlik bo'yicha masshtablash qadami",
     "cap": "1 dan yuqori koeffitsient vaqt shkalasini cho'zadi (tezlashtirilgan video uchun), 1 dan pastrog'i uni siqadi (sekinlashtirilgan video uchun)."
    }
   },
   {
    "h2": "Buning siljishdan farqi nimada",
    "ps": [
     "Siljish har bir kadr vaqtini bir xil belgilangan miqdorga **siljitadi** va kadr davomiyligini saqlaydi; tezlik ham boshlanish, ham tugashni **ko'paytiradi**, shuning uchun davomiyliklar ham masshtablanadi. Tezlik o'zgargandan so'ng davomiyliklarning o'zi o'zgargan — aynan shuning uchun tezlik talab qilinadi."
    ]
   },
   {
    "h2": "Agar koeffitsientga ishonchingiz komil bo'lmasa",
    "ps": [
     "Koeffitsient yo'qolganda, **ikkita tayanch nuqtaga** tayanib boring: birinchi va oxirgi kadrning real video vaqtlarini kiriting va ular orasidagi hamma narsa mutanosib ravishda tarqaladi — bu to'g'ri koeffitsientni topishga teng. [[subtitrlar borgan sari sinxronizatsiyadan chiqib ketishi|/guides/subtitles-out-of-sync.html]] ga qarang."
    ]
   }
  ]
 },
 "subtitle-too-fast": {
  "seo": {
   "title": "O'qish uchun juda tez subtitrlar – O'qish tezligini tuzatish – AI-SRTSub",
   "desc": "Subtitrlar o'qish uchun juda tez — qisqa davomiylikmi yoki uzun matnimi? QC 20 belgidan/sekunddan oshgan yozuvlarni belgilaydi (CJK uchun 9 ta hanzi); davomiyliklar avtomatik tuzatiladi, matnni tahrirlash kerak.",
   "h1": "O'qish uchun juda tez subtitrlar",
   "intro": "Tomoshabinlar pauzani bosishdan charchamayaptimi? Aybdor — o'qish tezligi. Uni qanday o'lchash, qanday tuzatish va qachon matnni vaqtga nisbatan tahrirlash kerak — barchasi bitta qo'llanmada.",
   "ctaText": "Check Reading Speed :: O'qish tezligini tekshirish"
  },
  "body": [
   {
    "h2": "O'qish tezligi nima?",
    "ps": [
     "O'qish tezligi shunchaki **tomoshabinlar subtitr ekranda turgan vaqt ichida uni o'qib tugata olishi yoki ololmasligidir**. Matematika oddiy: matn kengligi ekrandagi sekundlarga bo'linadi. Sanoatning umumiy cheklovlari: xitoy, yapon va koreys tillari uchun sekundiga 9 ta to'liq kenglikdagi belgilar (18 ta yarim kenglikdagi birlik), boshqa tillar uchun sekundiga 20 ta yarim kenglikdagi birlik. 1 sekund davom etadigan 20 hanzilik qator sekundiga 40 kenglik birligini tashkil qiladi — bu cheklovdan ikki baravar ko'p va tomoshabinlar uni hech qachon tugata olmaydi."
    ]
   },
   {
    "h2": "Avval qaysi turdagi tezlik ekanligini farqlang",
    "ps": [
     "\"O'qish uchun juda tez\" aslida ikkita turli xil muammo: **juda qisqa davomiylik** — kadr bir yoki ikki yuz millisekunddan keyin uzilib qoladi, odatda vaqt xatosi yoki tahrirlash qoldig'i; **juda uzun matn** — davomiyligi yaxshi, lekin qatorga 30 ta hanzi tiqishtirilgan va hech qanday tezlik chegarasi uni saqlab qololmaydi. Tuzatishlar bir-biriga qarama-qarshi, shuning uchun avval qaysi biriga ega ekanligingizni aniqlang."
    ],
    "img": {
     "file": "qc-rules",
     "alt": "QC sahifasidagi o'qish tezligi chegarasi sozlamasi, CJK uchun sukut bo'yicha 18 va boshqa tillar uchun 20",
     "cap": "QC o'qish tezligi chegaralari: CJK uchun sekundiga 18 kenglik birligi, boshqa tillar uchun 20"
    }
   },
   {
    "h2": "How to Check :: Qanday tekshirish kerak",
    "ps": [
     "[[Subtitrlarni sifat nazorati (QC)|/qc.html]] ni oching va subtitrlaringizni tashlang. Hisobotda \"juda qisqa davomiylik\" o'lchangan millisekundlarni ko'rsatadigan ogohlantirishdir (chegara: 833 millisekund); \"o'qib bo'lmaydigan tezlik\" sekundiga o'lchangan kenglik birliklarini ko'rsatadigan alohida topilmadir. Ikki tilli subtitrlar uchun faqat maqsadli tilda yozilgan qator hisobga olinadi — ikkala til bir-biriga qo'shilmaydi."
    ]
   },
   {
    "h2": "How to Fix It :: Uni qanday tuzatish kerak",
    "ps": [
     "**Juda qisqa davomiylik**: bitta bosish bilan tuzatiladi — kadr keyingi kadrning boshlanishidan o'tmagan holda avtomatik ravishda 833 millisekundgacha uzaytiriladi (tuzatish yangi qoplamalarni keltirib chiqarmasligi kerak). **Juda uzun matn**: avtomatik tuzatish yo'q — mashina qaysi so'zni kesish kerakligini bilmaydi. Ikki yo'l, sizning tanlovingiz: tarjimani qisqartiring (uni tahrirlash uchun tarjima vositasidagi katakchani bosing) yoki ushbu kadrning davomiyligini cho'zing (faqat keyingi kadr oldidan bo'shliq bo'lsa; umumiy vaqt shkalasi muammosi uchun [[Vaqt shkalasini siljitish|/shift.html]] ga qarang). O'qish tezligi yana chegara ichida ekanligini tasdiqlash uchun shundan keyin QC ni qaytadan ishga tushiring."
    ]
   },
   {
    "h2": "Ortiqcha to'g'rilamang",
    "ps": [
     "Tezlik chegarasiga rioya qilish qulay ko'rishni anglatmaydi: har bir kadrni sekundiga 9 ta belgiga qadar tiqishtirish butun filmni charchatadigan qiladi. Asosiy qoida sifatida, ko'p vaqt davomida chegaraning 70% atrofida qoling va muloqotga boy qismlarga vaqti-vaqti bilan biroz oshib ketishiga ruxsat bering. Juda tez miltillovchi subtitr bloklari o'z-o'zidan muammo hisoblanadi — yetkazib berishdan oldin metrikalarning to'liq to'plamini ishga tushiring, [[Yetkazib Berishdan Oldin Nimani Tekshirish Kerak|/guides/subtitle-quality-check.html]] ga qarang."
    ]
   }
  ]
 },
 "subtitles-out-of-sync": {
  "seo": {
   "title": "Subtitrlar borgan sari sinxronizatsiyadan chiqib ketyaptimi? Uni tuzating – AI-SRTSub",
   "desc": "Boshlanishi yaxshi, film o'rtalariga kelib bir necha soniya orqada, oxirida foydalanib bo'lmaydi: bu progressiv siljish bo'lib, odatda kadrlar tezligining mos kelmasligi yoki video tezligining o'zgarishi hisoblanadi. Ikkita tayanch nuqta buni tuzatadi.",
   "h1": "Subtitrlar sinxronizatsiyadan borgan sari uzoqlashib bormoqda: sabablari va tuzatishlari",
   "intro": "Boshida yaxshi, yarim soatdan keyin bir necha soniya kechikish, oxirida umidsiz. Bunday siljigan nomuvofiqlik ma'lum sabablarga va ma'lum tuzatishga ega.",
   "ctaText": "Fix this file :: Bu faylni tuzatish"
  },
  "body": [
   {
    "h2": "Avval ikki xil nomuvofiqlikni bir-biridan farqlang",
    "ps": [
     "Nomuvofiqlik ikki xil bo'ladi: **bir xil siljish** har bir kadr bir xil belgilangan miqdorga kechikishini (yoki ertaroqligini) anglatadi, boshidan oxirigacha taxminan teng; **progressiv siljish** boshlanishi to'g'ri ekanligini va xato oxiriga qarab o'sib borishini, ehtimol daqiqalarga yetishini anglatadi. Ushbu maqola ikkinchi tur haqida — birinchisi uchun [[butun subtitr faylini oldinroq yoki keyinroq siljitish|/guides/shift-subtitle-timing.html]] ga qarang."
    ]
   },
   {
    "h2": "Nima uchun u borgan sari siljiydi",
    "ps": [
     "Siljish **ikkita turli soatdan** kelib chiqadi: eng keng tarqalgan uchta sabab: (1) kadrlar tezligining mos kelmasligi — 24 kadr/s li film subtitrlari 25 kadr/s li manbada har daqiqada bir sekunddan ko'proq yo'qotadi; (2) subtitrlar o'zlarining asl sur'atlarini saqlab qolgan holda video tezlashtirildi yoki sekinlashtirildi; (3) vaqt shkalasi boshidan notekis bo'lgan VFR (o'zgaruvchan kadrlar tezligi) yozuvi. Ularning umumiy jihati: xato o'yin vaqti bilan taxminan chiziqli ravishda o'sadi."
    ]
   },
   {
    "h2": "Uni ikkita tayanch nuqta bilan tuzating",
    "ps": [
     "Xato chiziqli ravishda o'sganligi sababli, har bir uchida to'g'ri vaqtni belgilash va o'rtasini mutanosib ravishda qayta tarqatish hamma narsani o'rniga qo'yadi. Vaqt muharririda **ikki tayanch nuqtali tuzatishni** qo'shing: ikkita \"joriy\" maydon ushbu faylning asl vaqtlari bilan avtomatik ravishda to'ldiriladi; siz videoni tomosha qilasiz va **birinchi va oxirgi kadr aslida qachon paydo bo'lishini** ikkita \"maqsadli\" maydonga kiritasiz."
    ],
    "img": {
     "file": "shift-step-two",
     "alt": "Ikki tayanch nuqtali tuzatish: joriy vaqtlar avtomatik to'ldirilgan, kiritish uchun maqsadli vaqtlar",
     "cap": "Tayanch nuqtalarni ikki chekkada oling — eng kichik va eng katta asl xato — va ular orasidagi hamma narsa mutanosib ravishda qayta tarqaladi."
    }
   },
   {
    "h2": "Natijani qanday tekshirish kerak",
    "ps": [
     "Ishga tushirgandan so'ng, natijalar paneli har bir kadrning asl va yangi vaqtlarini **yonma-yon** sanab o'tadi. Uchta joyni tekshiring: birinchi kadr, o'rtadagisi va oxirgisi — eng kichik, o'rta va eng katta asl xatoga ega uchta pozitsiya. Agar uchtasi ham joyiga tushsa, butun fayl ham joyiga tushadi."
    ],
    "img": {
     "file": "shift-result",
     "alt": "Natijalar paneli: yuklab olish tugmasi bilan birga oldingi va keyingi vaqtlar yonma-yon",
     "cap": "O'rta kadrlarning yangi vaqtlari ikki uchi orasiga tushishi kerak — bu proporsiya to'g'ri ekanligining belgisidir."
    }
   },
   {
    "h2": "Ikki tayanch nuqta yetarli bo'lmaganda",
    "ps": [
     "Ikki tayanch nuqtali tuzatish xato **chiziqli** deb taxmin qiladi. Agar manba fayl o'rtasida kadrlar tezligi sakrashi bo'lgan VFR ekran yozuvi bo'lsa, chiziqli tortish o'rtani tuzata olmaydi — uchinchi nuqta sifatida ochiq-oydin noto'g'ri bo'lgan o'rta kadrni oling, faylni o'sha yerda bo'ling va har bir yarmida ikki tayanch nuqtali tuzatishni ishga tushiring. Shuningdek, tuzatgandan so'ng, hech qanday mahalliy nomuvofiqlik qolmaganligini tasdiqlash uchun o'rta qismni odatiy tezlikda qaytadan tomosha qiling."
    ]
   }
  ]
 },
 "table": {
  "seo": {
   "title": "Subtitrlarni Excel / CSV formatiga o‘tkazish va aksincha – AI-SRTSub",
   "desc": "Ikki tomonlama qo‘llanma: qatorma-qator tahrirlash uchun SRT/VTT formatini Excel yoki CSV ga eksport qiling, so‘ngra tahrirlangan jadvalni subtitr sifatida qaytadan import qiling. Uchta ustun talab qilinadi, istalgan tartibda; vaqt matn sifatida saqlanadi.",
   "h1": "Subtitrlarni Excel / CSV formatiga qanday o‘tkazish mumkin",
   "intro": "Jadvalda xatolarni tekshirish va tarjima qilish osonroq. Subtitrlarni Excel yoki CSV ga eksport qiling, qatorma-qator tahrirlang, so‘ngra qayta o‘tkazing — vaqt ustunlari matn holatida qoladi va dialog ichidagi qator uzilishlari saqlanib qoladi.",
   "ctaText": "Jadval konverterini ochish"
  },
  "body": [
   {
    "h2": "What this tool does :: Ushbu vosita nima qiladi",
    "ps": [
     "Subtitrlar – kadrlar qatori, jadvallar esa yozuvlar qatori. Jadvalga aylantirilgach, xatolarni tekshirish, izoh qoldirish va ommaviy tarjima qilish ishlarini o‘zingiz yaxshi biladigan vositalar yordamida bajarishingiz mumkin. Ikkala yo‘nalish ham qo‘llab-quvvatlanadi:"
    ]
   },
   {
    "h2": "Yuklang va yo‘nalishni tanlang",
    "ps": [
     "Faylni sudrab tashlang yoki uni ko‘zdan kechirib toping. Har bir yo‘nalish uchun boshqa turdagi fayl kerak: **jadvalga** — subtitr fayllarini (SRT / VTT), **subtitrga** — jadval fayllarini (CSV / Excel, ham .xlsx, ham .xls) qabul qiladi. Noto‘g‘ri rejimni tanlasangiz, sahifa bu rejim qanday turdagi faylni talab qilishini ko‘rsatadi.",
     "⚠️ Ushbu sahifa faqat UTF-8 formatini o‘qiydi. Agar subtitringiz so‘roq belgilari yoki katakchalar bilan ochilsa, uni avval [[Mojibake repair|/repair.html]] orqali o‘tkazing — bu yerda buzilgan kodlash faqat almashtirish belgilari sifatida o‘qiladi."
    ],
    "img": {
     "file": "table-up",
     "alt": "Jadval konverterini yuklash maydoni: tashlash sohasi va ikkita rejim tugmasi",
     "cap": "Har bir rejim boshqa faylni talab qiladi: subtitrlar kiradi, jadval chiqadi — va aksincha"
    }
   },
   {
    "h2": "Subtitrlarni jadvalga eksport qilish",
    "ps": [
     "\"Jadvalga\"ni tanlang, subtitr faylini tashlang va oldindan ko‘rish oynasida har bir kadr ro‘yxati ko‘rsatiladi: indeks, boshlanish, tugash, matn. Statistika paneli kadrlar soni va umumiy davomiyligini ko‘rsatadi. So‘ngra \"Excel (.xlsx) yuklab olish\" yoki \"CSV yuklab olish\" tugmasini bosing.",
     "Ikki formatning farqi: .xlsx haqiqiy jadval fayli bo‘lib, unda Excel vaqt ustuningizni siz sezmagan holda o‘zgartira olmaydi; CSV ko‘chirish uchun qulayroq, lekin Excel uni ochayotganda vaqt ustunini boshqacha tushunishi mumkin. Agar shunday bo‘lsa, vaqt ustunini tanlang va uning formatini \"Matn\" (Text) qilib o‘rnating — yoki shunchaki .xlsx formatidan foydalaning."
    ],
    "img": {
     "file": "table-prev",
     "alt": "Jadvalni oldindan ko‘rish: indeks, boshlanish, tugash va matn ustunlari hamda statistika paneli",
     "cap": "Har bir kadr oldindan ko‘rsatiladi; statistika paneli kadrlar soni va umumiy davomiyligini beradi"
    }
   },
   {
    "h2": "Jadvalni subtitrga qayta import qilish",
    "ps": [
     "\"Subtitrga\"ni tanlang, jadvalni tashlang va ustunlar qoidasi quyidagicha: **boshlanish, tugash va matn** uchun uchta ustun kerak (inglizcha Start / End / Text sarlavhalari ham ishlaydi), **istalgan tartibda** bo‘lishi mumkin. `00:00:01,500` va `00:00:01.500` ikkalasi ham qabul qilinadi; tahlil qilib bo‘lmaydigan qatorlar butun faylni rad etish o‘rniga shunchaki o‘tkazib yuboriladi.",
     "Natija oldindan ko‘rish qismida kadrma-kadr keltiriladi; tasdiqlang, so‘ngra SRT yoki VTT formatida yuklab oling. Agar shu uchta ustun topilmasa, sarlavhalarni tekshirishni so‘rovchi xabar chiqadi — bu odatda eksport qilishda boshqa nomlash qo‘llanilgani yoki sarlavha qatori birinchi qator emasligi sababli yuzaga keladi."
    ],
    "img": {
     "file": "table-back",
     "alt": "Subtitr natijasi maydoni: import qilingan subtitrlar kadrma-kadr ro‘yxatga kiritilgan",
     "cap": "Noma’lum ustunlar haqida xabar beriladi, ular hech qachon jimgina e’tiborsiz qoldirilmaydi"
    }
   },
   {
    "h2": "FAQ :: Tez-tez beriladigan savollar",
    "ps": [
     "**Excel vaqt ustunini noto‘g‘ri ko‘rsatyaptimi?** .xlsx formatidan foydalaning va bu muammo hech qachon yuzaga kelmaydi. Agar CSV dan foydalanishga majbur bo‘lsangiz: ochishdan oldin vaqt ustunini tanlang va katakcha formatini \"Matn\" (Text) qilib o‘rnating.",
     "**Ustun sarlavhalari inglizcha bo‘lishi shartmi?** Yo‘q. Start / End / Text ushbu sahifa qo‘llab-quvvatlaydigan istalgan tilda tanib olinadi va harflarning bosh yoki kichikligi ahamiyatga ega emas.",
     "**Import qilingandan keyin qator uzilishlarim saqlanib qoladimi?** Ha. Dialog ichidagi qator uzilishlari asl holatidek to‘liq saqlanib qoladi.",
     "**ASS formati qo‘llab-quvvatlanadimi?** Ushbu sahifa faqat SRT va VTT formatlari bilan ishlaydi. ASS uslub yo‘riqnomalarini o‘z ichiga oladi — uni avval [[Format converter|/convert.html]] yordamida SRT formatiga o‘tkazing.",
     "**Bir vaqtning o‘zida nechta fayl?** Bitta. O‘nlab yoki yuzlab fayllarni qayta ishlash uchun [[Batch conversion|/batch.html]] (faqat formatlarni o‘zgartiradigan va jadvaldan o‘tmaydigan) vositadan foydalaning."
    ]
   },
   {
    "h2": "Privacy :: Maxfiylik",
    "ps": [
     "Konvertatsiya to‘liq brauzeringizda ishlaydi. Hech qanday subtitr mazmuni hech qachon serverga yuborilmaydi."
    ]
   },
   {
    "h2": "Tegishli vositalar va qo‘llanmalar",
    "ps": [
     "Agar sizga faqat subtitrni Excel ga o‘tkazish kerak bo‘lsa, [[Convert subtitles to Excel|/guides/srt-to-excel.html]] bo‘limiga qarang; keyinchalik boshqa tilga tarjima qilish uchun — [[Subtitle translation|/translate.html]]; bir vaqtning o‘zida o‘nlab fayllar uchun — [[Batch conversion|/batch.html]]."
    ]
   }
  ]
 },
 "translate": {
  "seo": {
   "title": "AI subtitr tarjimasi – yuklashdan ikki tilli eksportgacha – AI-SRTSub",
   "desc": "Subtitrlarni sun’iy intellekt yordamida tarjima qiling: SRT/VTT/ASS yuklang, 100 ta tildan birini tanlang, glossariy yordamida nomlarni birxillashtiring, ikki tilli subtitrlarni eksport qiling. Bepul boshlash mumkin, o‘z API kalitingiz qo‘llab-quvvatlanadi.",
   "h1": "AI subtitr tarjimasidan qanday foydalanish kerak",
   "intro": "Bitta subtitr fayli uchun yuklashdan tortib tarjima qilish va eksport qilishgacha bo‘lgan to‘liq ish jarayoni: ekranda nima bor, nimani bosish kerak va har bir bosqichda nimaga ega bo‘lasiz.",
   "ctaText": "Tarjima vositasini ochish"
  },
  "body": [
   {
    "h2": "What this tool does :: Ushbu vosita nima qiladi",
    "ps": [
     "Subtitrlarni bir tildan boshqa tilga tarjima qiladi va foydalanishga tayyor subtitr faylini eksport qiladi. Odatiy ehtiyojlar:"
    ]
   },
   {
    "h2": "Upload subtitles :: Subtitrlarni yuklash",
    "ps": [
     "\"Subtitr faylini tanlash\" tugmasini bosing yoki subtitr matnini to‘g‘ridan-to‘g‘ri chap kiritish katakchasiga yopishtiring. Oltita format qo‘llab-quvvatlanadi: SRT, VTT, ASS, SSA, SBV va TXT. Faylingiz yo‘qmi? Uning qanday ishlashini ko‘rish uchun \"Namunani yuklash\" tugmasini bosing. Tahlil qilingandan so‘ng, o‘rta ustunda har bir yozuv uchun indeks, vaqt shkalasi va asl matnni o‘z ichiga olgan subtitr jadvali ko‘rsatiladi."
    ],
    "img": {
     "file": "translate-upload",
     "alt": "Tarjima vositasining import sohasi: subtitr faylini tanlash, matn kiritish katakchasi va namuna yuklash tugmasi",
     "cap": "Chap ustun \"Subtitrlarni import qilish\": faylni tanlang, matnni yopishtiring yoki namunani yuklang"
    }
   },
   {
    "h2": "Til va uslubni tanlang",
    "ps": [
     "\"Asl til\" avtomatik aniqlash rejimida qolishi mumkin; \"maqsadli til\" 100 ta tildan tanlanadi. Beshta tarjima uslubi mavjud: Muvozanatli (standart), So‘zlashuv, Rasmiy professional, Dublyaj uslubi va Maxsus. \"Dublyaj uslubi\" kino va TV dialoglariga mos keladi; \"Rasmiy professional\" esa hujjatli filmlar va kurslarga mos keladi."
    ],
    "img": {
     "file": "translate-lang",
     "alt": "Til va tarjima uslubi sozlamalari: asl til, maqsadli til ro‘yxatlari va beshta uslub",
     "cap": "\"Til\" va \"tarjima uslubi\": asl til avtomatik aniqlanishi mumkin, 75 ta maqsadli til tanlovi mavjud"
    }
   },
   {
    "h2": "Glossariy: nomlarni birxilda saqlash",
    "ps": [
     "Sun’iy intellekt qismlarga bo‘lib tarjima qiladi, shuning uchun bir xil nom turli qismlarda ikki xil tarjima qilinishi mumkin. Glossariyga \"asl nusxa → quyidagicha tarjima qilinsin\" qoidalarini yozing; har bir qismdan oldin vosita uni skanerlaydi va har bir mos keluvchi qoidaga amal qiladi. Har bir qatorda bitta qoida; strelkalar `->`, `=>`, `→` yoki Tab bo‘lishi mumkin; yolg‘iz turgan asl atama uni tarjima qilmasdan qoldirishni anglatadi; bir nechta imlo `|` orqali bitta ko‘rinishni bo‘lishishi mumkin. AIga videodagi atoqli otlarni avval jadvalga chiqarib olishi, so‘ngra ularni tahrirlab tarjima qilishi uchun \"✨ AI extract\" tugmasini bosing."
    ],
    "img": {
     "file": "translate-glossary",
     "alt": "Glossariy va atoqli otlar sohasi: AI orqali ajratib olish va saqlash tugmalari bo‘lgan glossariy kiritish katakchasi",
     "cap": "\"Yagona nomlar\" glossariysi: sun’iy intellekt orqali atoqli otlarni ajratib olish, saqlangandan so‘ng yangi videolar uchun avtomatik ravishda yuklanadi"
    }
   },
   {
    "h2": "Tarjima jarayoni",
    "ps": [
     "Yuqori paneldagi \"▶ Tarjimani boshlash\" tugmasini bosing. O‘rta statistika chizig‘i yozuvlarni, tarjima qilinganlarni, tozalangan to‘ldiruvchilarni va yozuvlararo gap guruhlarini real vaqt rejimida ko‘rsatadi; taraqqiyot paneli qolgan taxminiy vaqtni va sarflangan tokenlarni ko‘rsatadi. Tarjima qilinayotganda, matnni tahrirlash uchun jadvaldagi istalgan tarjima katakchasini bosing — o‘zgarishlar kompyuteringizda saqlanadi va sahifa yangilanganda ham yo‘qolmaydi. Jarayon o‘rtasida sahifani yopsangiz, to‘xtagan joyidan davom ettirish taklif qilinadi. Bitta gap bir nechta yozuvni qamrab olsa, guruh birlashtiriladi, tarjima qilinadi va davomiyligi bo‘yicha qayta to‘ldiriladi."
    ],
    "img": {
     "file": "translate-workspace",
     "alt": "Tarjima ish maydoni: statistika chizig‘i, taraqqiyot paneli va tahrirlanadigan subtitr jadvali",
     "cap": "O‘rta ish maydoni: statistika chizig‘i + taraqqiyot paneli + bosib tahrirlanadigan subtitr jadvali"
    }
   },
   {
    "h2": "Export :: Eksport qilish",
    "ps": [
     "O‘ng ustunda avval kontent shaklini tanlang: faqat tarjima (bir tilli), asl matn ustida bo‘lgan ikki tilli yoki tarjima ustida bo‘lgan ikki tilli; shundan so‘ng fayl formatini tanlang: SRT, WebVTT, SBV, ASS yoki TXT. ASS tanlanganda ikkita tartib qo‘shiladi: bo‘lingan yuqori/pastki ekranlar va ustma-ust tushgan pastki qatorlar. Kontent va format 14 ta eksport uslubida erkin birlashadi. Ikki tilli qator kengligi alohida o‘rnatiladi. Faylni saqlash uchun \"Subtitrlarni yuklab olish\" tugmasini bosing yoki uni darhol joylashtirish uchun \"Bunkerga nusxalash\" tugmasini bosing."
    ],
    "img": {
     "file": "translate-export",
     "alt": "Eksport paneli: uchta kontent shakli, beshta fayl formati va ikki tilli qator kengligi sozlamalari",
     "cap": "O‘ng ustun eksporti: avval kontent shaklini, keyin fayl formatini tanlang"
    }
   },
   {
    "h2": "Cost and privacy :: Narx va maxfiylik",
    "ps": [
     "Standart model ro‘yxatdan o‘tishni ham, kalitni ham talab qilmaydi — u so‘rov bo‘yicha kvotalar bilan darhol ishlaydi: har bir IP uchun kunlik limit va sayt bo‘ylab kunlik umumiy miqdor. Katta hajm uchun \"Tarjima mexanizmi\" ostida o‘z API kalitingizni kiriting. Maxfiylik, sahifedagi bildirishnomaga ko‘ra: standart model uchun subtitrlar ushbu sayt serveri orqali provayderga uzatiladi; maxsus API esa siz kiritgan provayder tomonidan to‘g‘ridan-to‘g‘ri boshqariladi va kalit brauzeringizda qoladi. Tahlil qilish, qatorlarni joylashtirish va ikki tilli tartib to‘liq brauzerda mahalliy tarzda ishlaydi."
    ]
   },
   {
    "h2": "FAQ :: Tez-tez beriladigan savollar",
    "ps": [
     "**Tarjimaga boshqa tillar aralashib qoldimi?** Vosita tilning o‘zgarishini aniqlaydi va avtomatik ravishda qayta tarjima qiladi; agar bir nechta yozuv hali ham noto‘g‘ri ko‘rinsa, katakchani bosib ularni qo‘lda tuzating.",
     "**Qo‘shiq matnlari haqida nima deyish mumkin?** \"Kontentni filtrlash\" qo‘shiq matnlari uchun uchta variantni taklif qiladi: matnni tarjima qilish, aslini saqlab qolish yoki o‘chirib tashlash.",
     "**Nomlarning turlicha tarjima qilinishi?** Bir xil bo‘lmagan imlolarni glossariyga qo‘shing va qaytadan tarjima qiling; glossariy global \"atoqli otlarni qayta ishlash\" sozlamasidan ustuvorroq hisoblanadi.",
     "**Inglizcha ustda, xitoycha ostda bo‘lishini xohlaysizmi?** Eksport qilishda \"Ikki tilli · asl nusxa ustda\" variantini tanlang; xitoycha ustda va inglizcha ostda bo‘lishi uchun \"Ikki tilli · tarjima ustda\" variantini tanlang."
    ]
   },
   {
    "h2": "Tegishli vositalar va qo‘llanmalar",
    "ps": [
     "Noto‘g‘ri formatmi? [[format conversion|/convert.html]] bilan boshlang; vaqt shkalasi noto‘g‘rimi? [[timeline adjustment|/shift.html]] dan foydalaning; topshirishdan oldin uni [[subtitle quality check|/guides/subtitle-quality-check.html]] orqali tekshirib o‘ting."
    ]
   }
  ]
 },
 "translate-english-to-chinese": {
  "seo": {
   "title": "Inglizcha subtitrlarni xitoy tiliga tarjima qilish – AI-SRTSub",
   "desc": "Inglizcha subtitrlarni xitoy tiliga tarjima qilish: SRT/VTT/ASS yuklang, soddalashtirilgan yoki an’anaviy xitoy tilini tanlang va faqat xitoycha yoki ikki tilli subtitrlarni eksport qiling. – AI-SRTSub",
   "h1": "Inglizcha subtitrlarni xitoy tiliga tarjima qilish",
   "intro": "Inglizcha SRT kiradi, xitoycha (yoki inglizcha-xitoycha ikki tilli) subtitrlar chiqadi: yuklang, maqsadli tilni tanlang, eksport qiling — hammasi bitta sahifada.",
   "ctaText": "Inglizcha subtitrlarni tarjima qilish"
  },
  "body": [
   {
    "h2": "When you need it :: Bu qachon kerak bo‘ladi",
    "ps": [
     "Siz yuklab olgan subtitr faqat ingliz tilida va siz ularga ulgurmayapsiz; yoki ingliz tilini o‘qiy olmaydigan oila a’zolaringiz uchun xitoycha subtitrlar kerak. Sizga kerak bo‘lgan narsa uchta shakldan birida bo‘ladi — **faqat xitoycha subtitrlar** yoki **xitoycha ustda, inglizcha ostda** yoxud **inglizcha ustda, xitoycha ostda** bo‘lgan ikki tilli subtitrlar — va bu vosita barchasini chiqarib beradi."
    ]
   },
   {
    "h2": "Uni qanday qilish kerak",
    "ps": [
     "[[AI Subtitle Translator|/translate.html]] oynasini oching va inglizcha subtitr faylingizni tashlang (SRT, VTT, ASS, SSA, SBV va TXT formatlari tanib olinadi yoki shunchaki matnni yopishtiring). “Asl til”ni avtomatik aniqlash rejimida qoldiring, “Maqsadli til”ni Soddalashtirilgan yoki An’anaviy xitoy tiliga o‘rnating va “▶ Tarjima qilishni boshlash” tugmasini bosing. Jarayon tugagach, o‘ng tarafdagi eksport panelidan kontent shaklini tanlang: faqat tarjima (bir tilli), ikki tilli · asl nusxa ustda (inglizcha yuqorida, xitoycha pastda) yoki ikki tilli · tarjima ustda (xitoycha yuqorida, inglizcha pastda), so‘ngra fayl formatini tanlab yuklab oling."
    ],
    "img": {
     "file": "translate-export",
     "alt": "Eksport paneli: faqat tarjima, asl nusxa ustda bo‘lgan ikki tilli va tarjima ustda bo‘lgan ikki tilli",
     "cap": "Eksport paytida kontent shaklini tanlang: faqat xitoycha yoki inglizcha yuqorida / xitoycha yuqorida bo‘lgan ikki tilli"
    }
   },
   {
    "h2": "Two common problems :: Ikkita keng tarqalgan muammo",
    "ps": [
     "**Nomlar turlicha tarjima qilindimi?** Sun’iy intellekt qismlarga bo‘lib tarjima qiladi, shuning uchun bir xil nom ikki xil chiqishi mumkin. Hammasi bir xil bo‘lishi uchun glossariyga “asl nusxa → tarjima qilingan nom” juftliklarini (masalan, `Watson → Huasheng`) kiriting.",
     "**Subtitrlar tasvirdan ortda qolyaptimi yoki ilgarilab ketyaptimi?** Avval tarjima qiling, keyin vaqtni to‘g‘rilang: ish stolining yuqori qismidagi vaqt shkalasi asboblar panelida global siljish va masshtabni boshqarish funksiyasi mavjud — [[Subtitles drift out of sync toward the end|/guides/subtitles-out-of-sync.html]] bo‘limiga qarang."
    ]
   }
  ]
 },
 "videosub": {
  "seo": {
   "title": "Videoga o‘rnatilgan subtitrlarni chiqarib olish – MKV / MP4 treklari – AI-SRTSub",
   "desc": "MKV, WebM, MP4 va MOV fayllari ichidagi subtitr treklarini bevosita o‘qing va SRT / VTT / ASS / TXT formatlarida eksport qiling. Yuklash yo‘q, transkodlash yo‘q, har bir til treki ro‘yxatga kiritilgan, rasm ko‘rinishidagi subtitrlar alohida ko‘rsatilgan.",
   "h1": "Videoga o‘rnatilgan subtitrlarni qanday chiqarib olish mumkin",
   "intro": "MKV / MP4 ichiga joylashtirilgan subtitr trekini to‘g‘ridan-to‘g‘ri SRT sifatida o‘qing — video hech qachon yuklanmaydi, hammasi brauzerda o‘qiladi.",
   "ctaText": "Video subtitrlarini chiqarib olishni ochish"
  },
  "body": [
   {
    "h2": "What this tool does :: Ushbu vosita nima qiladi",
    "ps": [
     "Subtitrlar alohida fayl ko‘rinishida emas, balki video fayl ichiga joylashtirilgan bo‘lishi mumkin. Ularni tahrirlash, tarjima qilish yoki ulash uchun avval ularni tashqariga chiqarib olishingiz kerak — bu sahifa aynan shu ishni bajaradi."
    ]
   },
   {
    "h2": "1 Add the video :: 1 Videoni qo‘shish",
    "ps": [
     "Video faylni birinchi ustunga sudrab tashlang yoki tanlash uchun bosing. Faqat **MKV / WebM** va **MP4 / MOV** formatlari tanib olinadi; boshqa konteynerlar hech qanday trek bermaydi.",
     "Fayl hech qachon kompyuteringizni tark etmaydi — yuklash bosqichi yo‘q. Vosita siljish bo‘yicha kichik qismlarda o‘qiydi, shuning uchun ko‘p gigabaytlik film xotirani to‘ldirib yubormaydi, biroq birinchi o‘qish jarayonida trek ma’lumotlari bir marta skanerlanishi kerak."
    ],
    "img": {
     "file": "videosub-up",
     "alt": "O‘rnatilgan subtitrlarni chiqarib olish sahifasining video qo‘shish sohasi",
     "cap": "MKV / WebM va MP4 / MOV qo‘llab-quvvatlanadi va fayl kompyuteringizdan tashqariga chiqmaydi"
    }
   },
   {
    "h2": "2 O‘rnatilgan subtitr treklari",
    "ps": [
     "O‘qish tugagandan so‘ng, ikkinchi ustunda fayldagi subtitr treklari **har bir qatorda bittadan**, odatda tili va trek nomi (masalan, \"Xitoycha\", \"Inglizcha\", \"Majburiy\") bilan ro‘yxatga kiritiladi. Shu trekni chiqarib olish uchun qatorni bosing.",
     "Faylda faqat bitta subtitr treki bo‘lsa, chiqarib olish avtomatik ravishda boshlanadi — hech qanday bosish talab etilmaydi.",
     "**Rasm ko‘rinishidagi subtitrlarni chiqarib bo‘lmaydi**: Blu-ray PGS va DVD subtitrlari oqimga singdirib yuborilgan rasmlar bo‘lib, ularda matn mavjud emas va sahifa buni ochiq-oydin ko‘rsatadi; ular uchun matnni optik aniqlash (OCR) talab qilinadi."
    ],
    "img": {
     "file": "videosub-track",
     "alt": "O‘rnatilgan subtitr treklari ro‘yxati, har bir qatorda bittadan",
     "cap": "Har bir qatorda bitta trek; faqat bitta bo‘lganda, chiqarib olish avtomatik boshlanadi"
    }
   },
   {
    "h2": "3 The result :: 3 Natija",
    "ps": [
     "O‘ng tarafdagi \"3 Result\" chiqarib olingan subtitr matnini, uning ustida esa eksport formatini ko‘rsatadi: **SRT / VTT / ASS / TXT**. \"Yuklab olish\" yoki \"Nusxalash\" tugmasini bosing.",
     "Asl trek ASS formatida bo‘lsa, uning o‘z uslub sarlavhasi va o‘lchami o‘zgarmagan holda qaytadi — ASS sifatida eksport qilish ularni saqlab qoladi, SRT sifatida eksport qilish esa faqat matnni olib o‘tadi."
    ],
    "img": {
     "file": "videosub-out",
     "alt": "SRT / VTT / ASS / TXT formatini tanlash imkoniyati mavjud natija sohasi",
     "cap": "To‘rtta eksport formati; ASS manbasi o‘zining uslub sarlavhasi va o‘lchamini saqlab qoladi"
    }
   },
   {
    "h2": "Tegilmaydigan qism",
    "ps": [
     "Video faylning o‘ziga mutlaqo tegilmaydi — faqat o‘qiladi, yozish, transkodlash yoki remuks qilish amalga oshirilmaydi.",
     "Subtitr mazmuni qanday bo‘lsa, shundayligicha chiqadi: kodlashni taxmin qilish yo‘q, vaqt shkalasini to‘g‘rilash yo‘q. Agar chiqarib olingan subtitrlar buzilgan bo‘lsa, bu asl trekdagi kodlash muammosi hisoblanadi — uni [[Garbled text repair|/repair.html]] yordamida tuzating."
    ]
   },
   {
    "h2": "Common questions :: Ko‘p beriladigan savollar",
    "ps": [
     "**Rasm ko‘rinishidagi subtitrlarni (PGS / DVD) boshqarishning umuman iloji yo‘qmi?** Bu sahifada yo‘q — ular matn qatlami bo‘lmagan rasmlardir. Avval OCR (matnni optik aniqlash) bajarilishi kerak, bu sahifa esa buni bajarmaydi.",
     "**Chiqarib olingan subtitrlarning vaqti noto‘g‘ri — nima uchun?** Bu sahifa vaqt jadvallarini tuzatmaydi; nima bo‘lsa, shuning o‘zi chiqadi. Global siljish yoki tezlik muammosi uchun [[Timeline adjustment|/shift.html]] dan foydalaning.",
     "**Nima uchun biror narsa sodir bo‘lguncha buncha ko‘p vaqt ketadi?** Katta fayl trek ma’lumotlari uchun qismma-qism skanerlanishi kerak va fayl qanchalik katta bo‘lsa, shunchalik ko‘p vaqt ketadi; bu mahalliy tarzda sodir bo‘ladi va internet aloqangizga aloqasi yo‘q.",
     "**Bu sahifadan tashqi subtitr fayllari uchun foydalana olamanmi?** Buning hojati yo‘q — tashqi .srt / .ass fayli to‘g‘ridan-to‘g‘ri [[Format conversion|/convert.html]] yoki boshqa vositaga uzatiladi. Bu sahifa video ichiga joylashtirilgan subtitrlar uchun mo‘ljallangan."
    ]
   },
   {
    "h2": "Privacy :: Maxfiylik",
    "ps": [
     "Video to‘liq brauzerda o‘qiladi: hech narsa yuklanmaydi, hech narsa transkod qilinmaydi, hech narsa server orqali o‘tmaydi. Sahifani yoping va o‘qilgan ma’lumotlar xotiradan tozalanadi."
    ]
   },
   {
    "h2": "Tegishli vositalar va qo‘llanmalar",
    "ps": [
     "Chiqarib olgan narsangizni tarjima qilish uchun [[Subtitle translation|/translate.html]] sahifasiga o‘ting, uni ikki tilli qilish uchun [[Two ways to make bilingual subtitles|/guides/make-bilingual-subtitles.html]] bo‘limini ko‘ring; o‘rnatilgan va tashqi treklar orasidagi farq hamda qaysi birlarini chiqarib olish mumkinligi haqida bilish uchun [[How to get subtitles out of a video|/guides/extract-subtitles-from-video.html]] sahifasiga qarang."
    ]
   }
  ]
 },
 "vtt-to-srt": {
  "seo": {
   "title": "VTT to SRT konverteri – WebVTT subtitrlarini o‘tkazish – AI-SRTSub",
   "desc": "Faqat SRT formatini qabul qiluvchi tahrirchilar va pleyerlar uchun VTT (WebVTT) subtitrlarini SRT formatiga o‘tkazing. WEBVTT sarlavhasi va NOTE bloklari avtomatik ravishda tozalanadi. Brauzeringizda ishlaydi.",
   "h1": "VTT to SRT :: VTT dan SRT ga",
   "intro": "VTT (WebVTT) subtitrlarini SRT formatiga aylantiring: faylni tashlang, SRT ni tanlang, yuklab oling. Sarlavha va eslatma bloklari tozalanadi hamda vaqt belgilari vergul formatiga qaytadi.",
   "ctaText": "Convert VTT → SRT :: VTT → SRT formatiga o‘tkazish"
  },
  "body": [
   {
    "h2": "Qachon SRT formatini qaytarib olish kerak bo‘ladi",
    "ps": [
     "CapCut, Premiere, aksariyat kompyuter pleyerlari va eski subtitr vositalari faqat **SRT** formatini qabul qiladi. Internetdan yoki YouTube dan yuklab olingan subtitrlar odatda VTT formatida bo‘ladi — ularni to‘g‘ridan-to‘g‘ri import qilish uchun SRT ga o‘tkazing."
    ]
   },
   {
    "h2": "VTT dan nimalar tozalanadi",
    "ps": [
     "**WEBVTT sarlavha qatori**, NOTE bloklari, STYLE/REGION bloklari va vaqt satridan keyingi kadr sozlamalari (align:start kabi) subtitr matni emas — ular avtomatik ravishda olib tashlanadi; raqamlanish tiklanadi va millisekund ajratuvchisi nuqtadan vergulga qaytariladi."
    ],
    "img": {
     "file": "convert-upload-vtt",
     "alt": "Yuklash maydoni: VTT fayli yuklandi, VTT sifatida aniqlandi",
     "cap": "WEBVTT sarlavhasiga ega fayl darhol VTT sifatida aniqlanadi"
    }
   },
   {
    "h2": "How to convert :: Qanday o‘tkazish mumkin",
    "ps": [
     "[[converter|/convert.html]] oynasini oching, VTT faylini tashlang, chiqish formati sifatida **SRT - SubRip** ni tanlang, so‘ngra o‘tkazib yuklab oling. Matn va vaqt qiymatlariga teginilmaydi."
    ],
    "img": {
     "file": "convert-result-srt",
     "alt": "Konvertatsiya natijasi: vergul bilan yozilgan vaqt belgilari bo‘lgan SRT raqamlanishi",
     "cap": "O‘tkazilgan SRT: kadr raqamlari + vergul bilan yozilgan vaqt belgilari"
    }
   }
  ]
 }
};
