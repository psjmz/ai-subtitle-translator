/* i18n/gd-az.js —— 43 篇指南页的az译文（由 _mkgd.js 生成，勿手改）
 * 源：_gd/az.json（Gemini 翻译，_gemgd.js 产出）
 * 结构：{ <slug>: { seo:{title,desc,h1,intro,ctaText}, body:[{h2,ps[],img}] } }
 * ⚠️ server.js 自己 require 它，不被任何 html 引用 —— 部署时必须显式加进传输列表。
 */
module.exports = {
 "ass-to-srt": {
  "seo": {
   "title": "ASS-dən SRT-yə Çevirici – ASS/SSA Altitrlerini Çevirin – AI-SRTSub",
   "desc": "ASS (və SSA) altitrələrini sadə SRT formatına çevirin: mətn və vaxt göstəriciləri olduğu kimi çıxarılır, üslub teqləri isə kənarda qalır. Yalnız SRT qəbul edən proqramlar üçündür. Brauzerinizdə işləyir.",
   "h1": "ASS to SRT :: ASS-dən SRT-yə",
   "intro": "ASS (və ya SSA) altitrələrini SRT formatına çevirin: faylı atın, SRT seçin və endirin. Mətn və vaxt göstəriciləri olduğu kimi çıxarılır; üslub teqləri ötürülmür.",
   "ctaText": "Convert ASS → SRT :: ASS → SRT çevrilməsi"
  },
  "body": [
   {
    "h2": "SRT-ni yenidən əldə etməli olduğunuz zaman",
    "ps": [
     "Montaj proqramları, televiziya qutuları (set-top box), TV pleyerlər, tərcümə alətləri — sonrakı mərhələdə bir çox vasitə yalnız **SRT** formatını qəbul edir. ASS formatındakı mürəkkəb üslub və yerləşdirmə orada heç bir məna kəsb etmir, buna görə də sadə SRT ən təhlükəsiz seçimdir."
    ]
   },
   {
    "h2": "Üslub teqlərinə nə olur?",
    "ps": [
     "Hər bir ASS fraqmenti mətni tez-tez rəng, hərəkət və ya effektlər üçün `{\\fonts}` kimi xüsusi teqlər daşıyan Dialoq sətridir. SRT formatına çevrilmə **bu teqləri üslubla birlikdə silir**, yalnız mətni və vaxtı saxlayır; `\\N` sətir sonları əsl sətir sonlarına çevrilir. SSA faylları da oxuna biləndir."
    ],
    "img": {
     "file": "convert-result-srt",
     "alt": "Çevrilmə nəticəsi: SRT nömrələnməsi və ASS-dən çıxarılmış mətn",
     "cap": "Çıxarılmış SRT: hər fraqment üçün bir nömrə, təmiz mətn"
    }
   },
   {
    "h2": "How to convert :: Necə çevirmək olar?",
    "ps": [
     "[[Çeviricini|/convert.html]] açın, ASS faylını əlavə edin (.ssa da işləyir), nəticə olaraq **SRT - SubRip** seçin, sonra çevirin və endirin. Əks istiqamətdə etmək istəyirsiniz? [[SRT-dən ASS-yə|/guides/srt-to-ass.html]] bölməsinə baxın."
    ]
   }
  ]
 },
 "batch": {
  "seo": {
   "title": "Altitr toplu şəkildə necə çevrilir – Yüzlərlə fayl bir ZIP-də – AI-SRTSub",
   "desc": "İrəliləyiş: onlarla SRT/VTT faylını atın, onları bir saziş formatına çevirin, tək bir ZIP faylı endirin. Yenidən nömrələnmiş, zaman damğaları normallaşdırılmış, təhlil edilməyən fayllar isə arxiyoxa gizlicə düşmək əvəzinə işarələnmişdir.",
   "h1": "Altitrri toplu şəkildə necə çevirmək olar",
   "intro": "Bütöv bir mövsümün altitrləri adətən eyni formatda olmalıdır və onları bir-bir yükləmək çox vaxt aparır. Hamısını bura atın, birlikdə çevirin və tək bir ZIP faylı endirin — təhlil edilə bilməyən fayllar işarələnir, işləmiş kimi səssizcə arxiyoxa daxil edilmir.",
   "ctaText": "Toplu çevrilməni açın"
  },
  "body": [
   {
    "h2": "What this tool does :: Bu alət nə edir?",
    "ps": [
     "Bütöv bir mövsüm və ya serial dəsti üçün altitrlər onlarla hər hansı digər iş görülməmişdən əvvəl adətən eyni formatda olmalıdır. Toplu səhifənin gördüyü işlər bunlardır:"
    ]
   },
   {
    "h2": "Faylların əlavə edilməsi",
    "ps": [
     "Bir neçə altitr faylını birlikdə qırıq-qırıq xətlərlə işarələnmiş qutuya sürüyün və ya klikləyərək birdəfəyə çoxlu seçin. Fayl siyahısı hər birini göstərir: təhlil edilən fayllar öz fraqment sayını göstərir, təhlil edilməyənlər isə sadəcə tanınmayan kimi işarələnir. Üst panel fayl sayını, fraqment sayını və neçə faylın tanınmadığını cəmləyir.",
     "⚠️ Bu səhifə yalnız UTF-8 oxuyur. Kodlaması pozulmuş hər şey (ekranı dolduran suallı işarələr və ya qutular) əvvəlcə [[Mojibake təmiri|/repair.html]] vasitəsilə düzəldilməlidir."
    ],
    "img": {
     "file": "batch-list",
     "alt": "Fayl siyahısı: hər faylın adı və fraqment sayı, tanınmayanlar qırmızı ilə işarələnib",
     "cap": "Hər bir fayl siyahıya alınır və tanınmayanlar dərhal işarələnir"
    }
   },
   {
    "h2": "Hər şeyi nəyə çevirməli",
    "ps": [
     "\"Hamısını buna çevir\" altında hədəf formatı seçin — SRT və ya VTT. Siyahıdakı hər bir fayl həmin formatda yenidən yaradılır: fraqment nömrələri yuxarıdan başlayaraq yenidən nömrələnir, zaman damğaları hədəfə uyğun normallaşdırılır (SRT millisaniyələri vergüllə, VTT nöqtə ilə ayırır).",
     "**Orijinal fayl adları saxlanılır və yalnız uzantı dəyişir**; eyni adların qarşısını almaq üçün təkrar adlara nömrə əlavə edilir ki, heç nə başqasının üzərinə yazılmasın."
    ],
    "img": {
     "file": "batch-up",
     "alt": "Hədəf format seçicisi və siyahı vəziyyəti, fayl və fraqment sayını göstərən statistika paneli ilə",
     "cap": "Hədəf formatı seçin və hər fayl yenidən yaradılsın; fayl adlarının yalnız uzantısı dəyişir"
    }
   },
   {
    "h2": "Paketləmə və endirmə",
    "ps": [
     "\"Bir ZIP-ə paketlə və endir\" düyməsini klikləyin və arxivdə hər bir çevrilmiş fayl olacaq. **Tanınan fraqmentləri olmayan fayllar arxivdən kənarda qalır** — onlar uğurlu olmuş kimi qarışdırılmaq əvəzinə, işarələnmiş şəkildə siyahıda qalır. Paketləndikdən sonra içəridə neçə fayl olduğunu görə bilərsiniz."
    ],
    "img": {
     "file": "batch-zip",
     "alt": "Paketləmə sahəsi: ZIP endirmə düyməsi və paketləmə nəticəsi mesajı",
     "cap": "Tanınmayan fayllar arxivdən kənarda qalır və siyahıda işarələnmiş olaraq qalır"
    }
   },
   {
    "h2": "Fayl niyə tanınmayan kimi işarələnir?",
    "ps": [
     "Fayldan heç bir fraqment oxuna bilmədikdə o, işarələnir. Üç əsas səbəb: ümumiyyətlə altitr deyil (məsələn, kənar .txt oxu məni faylı), kodlama UTF-8 deyil (buna görə də yalnız əvəzedici simvollar kimi oxunur) və ya məzmun vaxt damğaları olmadan tək bir bloka birləşdirilib.",
     "İşarələnmiş fayllarla fərdi şəkildə məşğul olmaq olar: kodlaşdırma problemləri üçün [[Mojibake təmiri|/repair.html]], format problemləri üçün isə siyahıya qayıtmazdan əvvəl təkbaşına çevrilmə üçün [[Format çeviricisi|/convert.html]] istifadə olunur."
    ]
   },
   {
    "h2": "FAQ :: Tez-tez verilən suallar",
    "ps": [
     "**Nə qədər fayl əlavə edə bilərəm?** Sərt limit yoxdur; bu, brauzerinizin yaddaşından asılıdır və bir neçə yüz SRT faylı adətən problem yaratmır.",
     "**Dialoqlarımı dəyişdirirmi?** Xeyr. Toplu çevrilmə yalnız konteyner formatını dəyişdirir — fraqmentləri yenidən nömrələyir və zaman damğalarını normallaşdırır — dialoqdan heç vaxt bir söz də dəyişdirmir.",
     "**Məzmunu dəyişdirmək lazımdırsa nə etməli?** Bu səhifə yalnız formatları çevrir. Vaxtı toplu şəkildə dəyişdirmək üçün [[Vaxt tənzimləməsi|/shift.html]]; sözləri dəyişdirmək üçün isə [[Termin əvəzləməsi|/glossary.html]] istifadə edin; hər ikisi fayl-fayl işləyir.",
     "**ASS dəstəklənirmi?** Bu səhifə yalnız SRT və VTT arasında çevrilmə edir. ASS üslub daşıyır — onun üçün fərdi şəkildə [[Format çeviricisi|/convert.html]] alətindən istifadə edin."
    ]
   },
   {
    "h2": "Privacy :: Məxfilik",
    "ps": [
     "Çevrilmə və paketləmə tamamilə brauzerinizdə həyata keçirilir. Heç bir altitr məzmunu heç vaxt serverə göndərilmir."
    ]
   },
   {
    "h2": "Əlaqədar alətlər və bələdçilər",
    "ps": [
     "Bütöv bir mövsüm üçün nəyi və hansı ardıcıllıqla dəyişdirməli — [[Bütöv bir mövsümün altitrlərinin toplu redaktəsi|/guides/batch-convert-srt.html]]; tək fayl üçün daha çox format — [[Format çeviricisi|/convert.html]]; cədvəldə yoxlama — [[Altitr ⇄ cədvəl|/table.html]]."
    ]
   }
  ]
 },
 "batch-convert-srt": {
  "seo": {
   "title": "Bütöv Bir Mövsümün Toplu Redaktəsi – Nə miqyaslanır, nə miqyaslanmır – AI-SRTSub",
   "desc": "Bir mövsüm adətən hər yerdə eyni dəyişikliyə ehtiyac duyur: vahid format, vaxt sürüşməsi, terminologiya. Bir keçiddə nəyin bitdiyini, nəyin bitmədiyini və təhlil edilə bilməyən fayllarla necə davranılacağını burada öyrənə bilərsiniz.",
   "h1": "Bütöv bir mövsümün altitrlərinin toplu redaktəsi",
   "intro": "Onlarla altitr faylının dəyişdirilməsi lazım olduqda, bu, adətən hər dəfə eyni dəyişiklik olur. Hansı hissələrin bir keçidlə edilə biləcəyini bilmək onları bir-bir etməkdən qat-qat çox vaxta qənaət edir.",
   "ctaText": "Toplu çevrilməni açın"
  },
  "body": [
   {
    "h2": "Bu, adətən hər yerdə eyni dəyişiklikdir",
    "ps": [
     "Bütöv bir mövsüm üçün altitrlərdə səhv baş verdikdə, hər epizodun nadir hallarda özünəməxsus fərdi problemi olur — bu, adətən hər epizoda təsir edən tək bir səbəb olur: eyni buraxılış qrupu hamısını kodlaşdırıb (ona görə də format və su nişanları uyğundur), hamısı eyni video versiyasına vaxtlandırılıb (ona görə də sürüşmə istiqaməti və miqdarı üst-üstə düşür) və ya transliterasiyalar mövsüm boyunca bir-indən uzaqlaşıb.",
     "Əvvəlcə iki epizodu – biri əvvəldən, biri sondan – yoxlayın və hər hansı toplu əməliyyatdan əvvəl həqiqətən **eyni problem** olduğundan əmin olun. Əgər ikisi fərqlidirsə, bunu toplu əməliyyatla düzəltmək mümkün deyil."
    ]
   },
   {
    "h2": "Bir keçidlə nə etmək olar?",
    "ps": [
     "**Formatı vahid hala gətirmək** həqiqətən də bir keçiddə bitən yeganə şeydir: onlarla SRT və VTT faylını birlikdə [[Toplu çevrilməyə|/batch.html]] sürüyün, hədəf formatı seçin və bir ZIP faylı endirin. Yenidən nömrələnmə və zaman damğasının normallaşdırılması həmin addımda baş verir və dialoqdan bir söz belə dəyişmir."
    ],
    "img": {
     "file": "batch-list",
     "alt": "Toplu səhifənin fayl siyahısı: hər faylın fraqment sayı, tanınmayanlar qırmızı ilə işarələnib",
     "cap": "Vahid format həqiqətən də tək bir keçiddə bitən yeganə şeydir"
    }
   },
   {
    "h2": "Hansı işlər fayl-fayl görülməlidir?",
    "ps": [
     "Bunların toplu giriş nöqtəsi yoxdur və hər fayl üçün ayrıca keçid tələb olunur — baxmayaraq ki, adətən **yalnız bir dəfə edilib bütün mövsümə tətbiq olunan** ekvivalent mövcuddur:"
    ]
   },
   {
    "h2": "Get the order right :: Ardıcıllığı düzgün qurun",
    "ps": [
     "Bir neçə işin görülməsi lazım olduqda, səhv ardıcıllıq yenidən işləmək deməkdir. Bu ardıcıllığa əməl edin:",
     "**Kodlaşdırmanı düzəlt** → **formatı vahidləşdir** → **məzmunu dəyişdir** (su nişanları, terminologiya, vaxt) → **sonda keyfiyyətə nəzarət (QC)**. Kodlaşdırmanı düzəltmədən formatları çevirmək sadəcə fərqli konteynerdə mojibake verəcək; formatlar vahidləşdirilmədən əvvəl məzmunu dəyişdirmək isə uyğunsuz alət dəstəyi ilə işləmək deməkdir."
    ],
    "img": {
     "file": "batch-zip",
     "alt": "Paketləmə sahəsi: ZIP endirmə düyməsi və nəticə mesajı",
     "cap": "Əvvəlcə formatları vahidləşdirin, sonra məzmunu dəyişdirin"
    }
   },
   {
    "h2": "Tanınmayan faylların idarə edilməsi",
    "ps": [
     "Toplu çevrilmədə tanınmayan kimi işarələnmiş fayllar ZIP-dən kənarda qalır və siyahıda qalır. Üç adi səbəb: altitr faylı deyil (kənar readme faylı), kodlama UTF-8 deyil və ya məzmun vaxt damğaları olmadan tək bir bloka birləşdirilib.",
     "Kodlaşdırma problemləri fərdi şəkildə [[Mojibake təmiri|/repair.html]] alətinə göndərilir; format problemləri isə siyahıya qaytarmazdan əvvəl [[Format çeviricisinə|/convert.html]] göndərilir. **Sadəcə sayı artırmaq üçün tanınmayan faylları məcburən arxiyoxa daxil etməyin** — pleyerinizdə əskik epizod tapmağın dəyəri bundan qənaət edilən dəqiqədən qat-qat çoxdur."
    ]
   },
   {
    "h2": "Əlaqədar alətlər və bələdçilər",
    "ps": [
     "Tam toplu bələdçi — [[Altitrri toplu şəkildə necə çevirmək olar|/guides/batch.html]]; vahid vaxt sürüşmələri — [[Altitr vaxtını necə tənzimləmək olar|/guides/shift.html]]; təslim etməzdən əvvəl son keçid — [[Altitr QC (keyfiyyətə nəzarət)|/qc.html]]."
    ]
   }
  ]
 },
 "bilingual": {
  "seo": {
   "title": "İkidilli Altitrləri Necə Bölmək və ya Birləşdirmək Olar – AI-SRTSub",
   "desc": "İkidilli altitrləri təmizləməyin dörd yolu: yalnız bir treki saxlamaq, iki fayla bölmək və ya bir iki sətirli daxiletmədə birləşdirmək. Hər iki forma brauzerinizdə avtomatik olaraq aşkar edilir.",
   "h1": "İkidilli Altitrləri Necə Təmizləmək Olar",
   "intro": "İkidilli altitrləri bölmək, birləşdirmək və ya yalnız bir treki saxlamaq istəyirsiniz? Bu bələdçi dörd rejimin hamısını nəzərdən keçirir: aşkarlamanın necə işlədiyini, hansı rejimi seçməli olduğunuzu və ixrac zamanı nə əldə edəcəyinizi izah edir.",
   "ctaText": "İkidilli Altitr Təmizləyicisini Açın"
  },
  "body": [
   {
    "h2": "Bu Alət Nə Üçündür?",
    "ps": [
     "İkidilli altitrləriniz var, lakin yalnız treklərdən birini istəyirsiniz — və ya əksinə, iki treki bölmək və ya birləşdirmək istəyirsiniz:"
    ]
   },
   {
    "h2": "İkidilli Məzmunu Necə Aşkarlayır?",
    "ps": [
     "İki trekli ikidilli altitrlər iki ümumi formada olur və alət hər birini **dili təxmin etmədən** tanıyır: **Forma A (bir daxiletmə, iki sətir)** trekləri yazılış sisteminə görə bölür — kana, hangul, hanzi, latın və digər sistemlər, ümumilikdə on sistem; iki müxtəlif sistem ikidilli deməkdir və hansı birinci gəlirsə, o, orijinal hesab olunur. Tək bir sistem (məsələn, iki sətirə bölünmüş uzun çin sətri) birdilli kimi qəbul edilir və olduğu kimi saxlanılır. **Forma B (eyni vaxta malik iki ayrı daxiletmə)** trekləri mövqeyə görə bölür — eyni vaxt damğasındakı iki daxiletmə cütlük əmələ gətirir, birincisi orijinal sayılır və ingilis-fransız və ya ingilis-alman kimi latın əlifbasını paylaşan kombinasiyalar da düzgün şəkildə ayrılır. Heç bir ikidilli məzmun aşkar edilmədikdə, rejim seçicisi və Başlat düyməsi aydın xəbərdarlıqla birlikdə boz rəngə boyanır, beləliklə o, heç vaxt səhv nəticələrə səbəb olacaq şəkildə məcburi bölgü aparmır."
    ]
   },
   {
    "h2": "The Four Modes :: Dörd Rejim",
    "ps": [
     "“Hansını istəyirsiniz?” açılan menyusundan dörddən birini seçin: **Yalnız orijinalı saxla** və **Yalnız tərcüməni saxla** hərəsi bir fayl yaradır; **İkiyə böl** orijinal fayl və tərcümə faylı yaradır, fayl adlarının üzərinə üst-üstə yazılmanın qarşısını almaq üçün avtomatik olaraq `.orig` / `.dst` teqləri qoyulur; **Bir iki sətirli daxiletmədə birləşdir** hər cütlüyü ikidilli daxiletməyə çevrir — orijinal bir sətirdə, tərcümə digər sətirdə — birdilli cütlüklər isə olduğu kimi saxlanılır və heç bir ikinci sətir uydurulmur. Rejimləri və ya ixrac formatlarını dəyişdirdiyiniz zaman mövcud məzmun avtomatik olaraq yenidən işlənilir — Başlat düyməsini yenidən klikləməyə ehtiyac yoxdur."
    ],
    "img": {
     "file": "bilingual-modes",
     "alt": "İkidilli təmizləyicidə rejim seçimi: orijinalı saxla, tərcüməni saxla, ikiyə böl, bir iki sətirli daxiletmədə birləşdir",
     "cap": "Dörd rejim: bir treki saxla, ikiyə böl və ya bir iki sətirli daxiletmədə birləşdir"
    }
   },
   {
    "h2": "Input and Output :: Giriş və Çıxış",
    "ps": [
     "Yeddi formatı oxuyur — SRT, VTT, ASS, SSA, SBV, LRC, TXT (əvvəlcə fayl uzantısı, ehtiyat variant olaraq məzmunun analizi) — və dörd formatda ixrac edir: SRT, VTT, ASS, TXT. İstənilən giriş-çıxış kombinasiyası işləyir, buna görə də formatlararası çevrilmə proses zamanı baş verir. ASS `\\N` sətir sonları əsl sətir sonlarına qaytarılır və formatlararası ixrac zamanı effekt teqləri silinir."
    ]
   },
   {
    "h2": "Results and Export :: Nəticələr və İxrac",
    "ps": [
     "Nəticələr yalnız oxunaqlı mətn qutusunda tam şəkildə göstərilir, hər faylın daxiletmə sayı və ümumi müddət statistikası verilir; \"Endir\" və \"Kopyala\" düymələri faylı birbaşa götürməyə imkan verir. Nəticələr sahəsi önizləmédir — burada mətn və ya vaxt redaktəsi edilmir. Dəyişikliklər etmək üçün əvvəlcə ixrac edin, sonra uyğun alətdən istifadə edin."
    ],
    "img": {
     "file": "bilingual-result",
     "alt": "Təmizləmə nəticələri sahəsi: yalnız oxunaqlı önizləmə, daxiletmə sayının statistikası və endirmə/kopyalama düymələri",
     "cap": "Tam mətn önizləməsi + daxiletmə və müddət statistikası + endirmə və kopyalama"
    }
   },
   {
    "h2": "FAQ :: Tez-tez verilən suallar",
    "ps": [
     "**Bir daxiletmədə bir sətirdə ingilis, digərində fransız dili var — niyə bölünmür?** Forma A trekləri yazılış sisteminə görə bölür, buna görə də tək bir daxiletmə daxilində eyni sistemi paylaşan iki dili ayırmaq mümkün deyil. Onu Forma B (eyni vaxt xəttində iki daxiletmə) kimi yenidən təşkil edin və mövqeyə əsaslanan bölgü işləyəcək.",
     "**Endirilən fayl yalnız birdirmi?** Dizayna görə \"Yalnız orijinalı saxla\", \"Yalnız tərcüməni saxla\" və \"Bir iki sətirli daxiletmədə birləşdir\" seçimlərinin hərəsi tək bir fayl yaradır; yalnız \"İkiyə böl\" seçimi sizə `.orig` / `.dst` teqləri ilə işarələnmiş iki fayl verir.",
     "**Toplu şəkildə işlədə bilərəmmi?** Həfərdə bir fayl; növbələr dəstəklənmir.",
     "**Altitrlərimi yükləyirmi?** Xeyr — təhlil və ixrac tamamilə brauzerinizdə işləyir."
    ]
   },
   {
    "h2": "Related Guides :: Əlaqədar Bələdçilər",
    "ps": [
     "İki treki tez bir zamanda bölmək üçün [[İkidilli Altitrləri İki Trekə Bölmək|/guides/split-bilingual-subtitles.html]] bölməsinə baxın; ikidilli altitrlərin necə yaradıldığını öyrənmək üçün [[İkidilli Altitrlər Yaratmağın İki Yolu|/guides/make-bilingual-subtitles.html]] bölməsinə baxın; maşın tərcüməsi üçün [[Süni İntellekt Altitr Tərcüməsi|/translate.html]] alətindən istifadə edin."
    ]
   }
  ]
 },
 "clean": {
  "seo": {
   "title": "Altitr təmizləyicisi – su nişanlarını, reklamları, SDH-nı silin – AI-SRTSub",
   "desc": "Altitr təmizləyicisi: 13 qayda su nişanlarını, reklamları, SDH başlıqlarını, HTML teqlərini və dublikatları silir; hər bir dəyişikliyin fərq (diff) qeydi var və geri alına bilər. SRT/VTT/ASS, hamısı brauzerdə işləyir.",
   "h1": "Altitr təmizləyicisindən necə istifadə etməli",
   "intro": "Vebdən endirilən altitrlər tez-tez su nişanları, reklamlar və SDH başlıqları daşıyır. Təmizləyici bir keçiddə 13 qaydanı tətbiq edir və hər bir dəyişiklik müqayisə olunur və geri alına biləndir.",
   "ctaText": "Altitr təmizləyicisini açın"
  },
  "body": [
   {
    "h2": "What this tool does :: Bu alət nə edir?",
    "ps": [
     "Endirilmiş altitr faylları çox vaxt olmamalı olan şeyləri daşıyır. Təmizləyici qaydalara əsaslanan bir keçidlə onları silir:"
    ]
   },
   {
    "h2": "Upload and detect :: Yükləyin və aşkar edin",
    "ps": [
     "Faylı sürüyün və ya yükləmək üçün klikləyin — SRT, VTT, ASS, SSA və TXT dəstəklənir — və ya altitr mətnini birbaşa yapışdırın. Kodlaşdırma avtomatik olaraq aşkar edilir: əgər UTF-8 dekodlanması əvəzedici simvollar yaradırsa, o, GBK və ya Big5-ə keçir və səhifədə \"Kodlaşdırma {encoding} olaraq düzəldildi\" mesajı görünür. Əgər ikidilli altitrlər (eyni vaxt xəttinə malik biri çin, biri ingilis olmaqla iki treklər) yükləsəniz, onlar \"orijinal üstdə / tərcümə üstdə\" keçid düyməsi ilə tək bir ikidilli trekdə birləşdirilir."
    ]
   },
   {
    "h2": "13 qaydalarının konfiqurasiyası",
    "ps": [
     "İnterfeysdə 13 qutu işarəsi olan dörd qrup var: **Teqlər və formatlaşdırma** (ASS effektləri, HTML teqləri, idarəetmə simvolları, sıralamadan sonra yenidən nömrələmə), **SDH və səs effektləri** (SDH başlıqları, danışanın adları, təmiz mahnı sözləri sətirləri), **Su nişanları və lazımsız daxiletmələr** (su nişanları və reklamlar, təkrar daxiletmələr, boş daxiletmələr), **Mətn düzəlişləri** (durğu işarələri və boşluqlar, BÖYÜK HƏRF düzəlişi, qısa sətirlərin birləşdirilməsi). Defolt olaraq yalnız \"itkisiz və dəqiq\" elementlər aktivdir; məzmunu silə bilən elementlər (mahnı sözləri sətirləri, baş hərf düzəlişi, qısa sətirlərin birləşdirilməsi) söndürülüb — ehtiyac olduqda onları işarələyin. Hər bir elementin ⓘ ipucu (tooltip) var və istənilən qutu dəyişikliyi dərhal yenidən işlənilir."
    ],
    "img": {
     "file": "clean-opts",
     "alt": "Təmizləmə seçimləri interfeysi: 13 qutu işarələrinin dörd qrupu, yuxarıda aktiv sayı göstərilir",
     "cap": "Dörd qrup, 13 qayda; defolt olaraq yalnız itkisiz elementlər aktivdir, dəyişikliklər dərhal tətbiq olunur"
    }
   },
   {
    "h2": "Dəyişikliklər fərqi və geri qaytarılması",
    "ps": [
     "Nəticələr birbaşa üzərinə yazılmır: hər bir dəyişiklik qayda teqi ilə birlikdə müqayisə cədvəlində (bu daxiletmənin niyə redaktə edildiyi və ya silindiyi) siyahıya alınır. Birini geri qaytarmaq istəyirsiniz? Həmin sətirdə \"Bərpa et\" düyməsini klikləyin; \"Hamısını bərpa et\" hər şeyi bir kliklə geri qaytarır və ona yenidən kliklədikdə tam təmizləmə yenidən tətbiq olunur. Statistika panelində orijinal / təmizlənmiş / silinmiş / dəyişdirilmiş / bərpa edilmiş sayları göstərilir."
    ],
    "img": {
     "file": "clean-diff",
     "alt": "Dəyişikliklərin müqayisəsi cədvəli: indeks, vaxt, orijinal və təmizlənmiş mətn, hər sətirdə qayda teqi",
     "cap": "Hər dəyişiklik qayda teqi daşıyır; tək sətirləri və ya hamısını birdən bərpa edin"
    }
   },
   {
    "h2": "Preview and export :: Önizləmə və ixrac",
    "ps": [
     "\"Təmizlənmiş / Orijinal\" görünüşləri arasında keçid edin. Orijinal görünüşdə silinmiş daxiletmələrin üstü xətt çəkilir və \"Silinib\" kimi işarələnir, ixrac edilən fayl isə önizləmə ilə tamamilə eyni olur. İxrac formatları: SRT (defolt), VTT, ASS (mənbə ASS olduqda mövcuddur, üslub bölməsi olduğu kimi saxlanılır) və vaxt xətti olmayan sadə mətn TXT. Fayl adlığına avtomatik olaraq `.clean` işarəsi əlavə olunur."
    ],
    "img": {
     "file": "clean-preview",
     "alt": "Tam mətn önizləməsi: sayları göstərən statistika paneli ilə təmizlənmiş və orijinal görünüşlər",
     "cap": "İki önizləmə görünüşü, gördüyünüz nədirsə, onu da əldə edirsiniz"
    }
   },
   {
    "h2": "FAQ :: Tez-tez verilən suallar",
    "ps": [
     "**Normal dialoqu səhvən silərmi?** Su nişanı qaydası əvvəlcə su nişanı sətirlərini silir (ikidilli daxiletmələr içərisindəki dialoq sətirlərini saxlayır) və yalnız izlər qalarsa bütün daxiletməni silir; SDH silinməsi yalnız 40 simvol və ya daha qısa olan SDH açar sözləri ehtiva edən mötərizə içindəki məzmuna toxunur — adi mötərizədaxili dialoqlar qalır.",
     "**Təmiz mahnı sözləri sətirləri dialoq daxilindəki mahnı sözlərindən necə seçilir?** Yalnız hər bir sətri ♪ musiqi notları və ya [music] kimi işarələrlə əhatə olunmuş daxiletmələr silinir; içində mahnı sözləri olan dialoqlar saxlanılır.",
     "**Danışan adları çin mətninə təsir edə bilrmi?** Yalnız sətir başındakı iki nöqtə ilə izlənilən böyük hərfli hərf-rəqəm adları (`GEORGE:` kimi) uyğun gəlir; çin dilindəki iki nöqtəli cümlələr heç vaxt uyğun gəlməz.",
     "**Birdən çox faylı eyni vaxtda təmizləyə bilərəmmi?** Xeyr — hər işləmə üçün bir fayl. Nəticəni endirin, sonra növbəti faylı yükləyin."
    ]
   },
   {
    "h2": "Privacy :: Məxfilik",
    "ps": [
     "Təmizləmə tamamilə brauzerinizdə işləyir; heç bir altitr məzmunu heç vaxt serverə göndərilmir."
    ]
   },
   {
    "h2": "Əlaqədar alətlər və bələdçilər",
    "ps": [
     "Su nişanları və reklamların silinməsinə yönəlmiş qısa bələdçi üçün [[altitr reklamlarını və su nişanlarını silmək|/guides/remove-subtitle-ads.html]] bölməsinə baxın; faylınızı təslim etməzdən əvvəl [[altitr keyfiyyət yoxlamasından|/guides/subtitle-quality-check.html]] keçirin; formatı dəyişdirmək üçün [[format çevrilməsindən|/convert.html]] istifadə edin."
    ]
   }
  ]
 },
 "convert": {
  "seo": {
   "title": "Altitr Formatlarını Necə Çevirmək Olar (SRT, VTT, ASS, SBV, LRC, TXT) – AI-SRTSub",
   "desc": "Çeviricinin illüstrasiyalı bələdçisi: faylı atın, aşkar edilmiş formatı yoxlayın, çıxış formatını seçin, ikidilli mətnin öhdəsindən gəlin və endirin. Hər şey brauzerinizdə işləyir.",
   "h1": "Altitr Format Çeviricisi Bələdçisi",
   "intro": "Bu bələdçi səhifəni yuxarıdan aşağıya doğru izah edir: altitri yükləyin, aşkar edilmiş formatı təsdiqləyin, çıxış formatını seçin və endirin. Hər şey brauzerinizdə işləyir — heç bir fayl cihazınızdan çölə çıxmır.",
   "ctaText": "Altitr çeviricisini açın"
  },
  "body": [
   {
    "h2": "Load your subtitles :: Altitrlərinizi yükləyin",
    "ps": [
     "Faylı qırıq xəttli qutuya sürüyün və ya birini seçmək üçün klikləyin; həmçinin **mətni birbaşa mətn qutusuna yapışdıra** bilərsiniz. Format həm uzantıdan, həm də məzmundan aşkar edilir və nəticə format teqində göstərilir."
    ],
    "img": {
     "file": "convert-upload",
     "alt": "Yükləmə sahəsi: nümunə SRT yükləndi, SRT olaraq aşkar edildi",
     "cap": "Aşkar edilmiş format teqdə görünür — əmin deyilsinizsə, əvvəlcə buranı yoxlayın"
    }
   },
   {
    "h2": "Çıxış formatını seçin",
    "ps": [
     "Açılan menyudan hədəf formatı seçin: altı seçim — srt, vtt, ass, sbv, lrc, txt. ASS formatına çevrilmə sabit 1920×1080 defolt üslubunu (ağ mətn, qara kontur, aşağı mərkəz) yenidən yaradır və **orijinal şriftləri və ya rəngləri saxlamır**; txt isə vaxt olmadan yalnız mətni ixrac edir."
    ],
    "img": {
     "file": "convert-opt",
     "alt": "VTT seçilmiş şəkildə çıxış formatı açılan menyusu",
     "cap": "Çıxış formatı giriş formatını izləmir — onu özünüz seçirsiniz"
    }
   },
   {
    "h2": "Bilingual handling :: İkidilli mətnin idarə edilməsi",
    "ps": [
     "Fayl ikidillidirsə (bir fraqmentdə iki sətir və ya növbəli fraqmentlər), çevrilmə zamanı layout olduğu kimi saxlanılır. \"İkidilli formatı saxla\" seçimi iki dili hər biri özlüyündə yenidən sarılmaqla yuxarı və aşağı sətirlərə bölür; heç bir ikidilli mətn aşkar edilmədikdə idarəetmə elementi deaktiv edilir."
    ]
   },
   {
    "h2": "Convert and download :: Çevir və endir",
    "ps": [
     "\"Çevir\" düyməsini klikləyin: nəticə panelində fraqment sayı və ümumi müddət göstərilir, mətn isə yoxlanmağa hazırdır. Faylı yadda saxlamaq üçün **Endir** düyməsini klikləyin və ya mətni birbaşa götürmək üçün **Kopyala** düyməsini seçin. Çevrilmə heç vaxt heç bir vaxt dəyərini dəyişdirmir — yalnız formatı yenidən yazır. Fraqmentlərin vaxtını yenidən tənzimləmək üçün [[vaxt alətindən|/shift.html]] istifadə edin."
    ],
    "img": {
     "file": "convert-result",
     "alt": "Nəticə paneli: endirmə və kopyalama düymələri ilə fraqment sayı və ümumi müddət",
     "cap": "6 fraqment, 0:23 ümumi — endirməzdən əvvəl mətni nəzərdən keçirin"
    }
   }
  ]
 },
 "extract": {
  "seo": {
   "title": "Altitrlərdən sadə mətni çıxarmaq – İki layout, beş təmizləmə – AI-SRTSub",
   "desc": "Dialoqu altitrlərdən təmiz sadə mətn kimi çıxarın: davamlı abzaslar və ya hər fraqment üçün bir sətir, həmçinin SDH fraqmentləri, su nişanları, dublikatlar, prefikslər və mahnı sözləri üçün beş keçidin nəyi sildiyini öyrənin.",
   "h1": "Altitrlərdən sadə mətni necə çıxarmaq olar",
   "intro": "Dialoqu altitr faylından təmiz sadə mətn kimi çıxarın: fraqment nömrələri, zaman xətləri və üslub teqləri avtomatik olaraq silinir, buna görə də nəticə məqalə kimi oxunur və ya dialoq siyahısı kimi işləyir.",
   "ctaText": "Sadə mətn çıxarıcısını açın"
  },
  "body": [
   {
    "h2": "What this tool does :: Bu alət nə edir?",
    "ps": [
     "Oxucu üçün altitr faylındakı yalnız dialoq əhəmiyyətlidir; qalan hissə pleyer üçün nəzərdə tutulmuş strukturudur — fraqment nömrələri, zaman xətləri, üslub teqləri. Bu səhifə strukturu silir və sözləri saxlayır."
    ]
   },
   {
    "h2": "Sadəcə yükləməyin, həm də atın",
    "ps": [
     "Soldakı \"1 Altitr əlavə et\" sütunu yüklənmiş faylı qəbul edir və siz həmçinin altitr mətnini birbaşa mətn qutusuna yapışdıra bilərsiniz. Səhv fayl seçmisinizsə, \"Təmizlə\" düyməsini klikləyin və yenidən başlayın.",
     "Bu səhifə faylları UTF-8 olaraq oxuyur. Əgər altitrlər suallı işarələr və ya qutular divarı şəklində açılırsa, kodlaşdırma pozulub — əvvəlcə [[Pozulmuş mətnin bərpası|/repair.html]] bölməsində onu UTF-8 formatına çevirin, sonra qayıdın."
    ],
    "img": {
     "file": "extract-up",
     "alt": "Sadə mətn çıxarıcısının altitr əlavə etmə sahəsi",
     "cap": "Fayl yükləyin və ya altitr mətnini birbaşa mətn qutusuna yapışdırın"
    }
   },
   {
    "h2": "İki layout arasından seçim etmək",
    "ps": [
     "\"2 Çıxarma seçimləri\"nin yuxarı hissəsində layout yerləşir: **Davamlı abzaslar** mətni durğunluqlarda və cümləsonu durğu işarələrində bölür ki, o, məqalə kimi oxunsun; **Hər fraqment üçün bir sətir** isə orijinal faylın daxiletmələrinə bire-bir uyğun gələrək hər altitr daxiletməsi üçün bir sətir verir.",
     "Qeydlər üçün dialoqu kopyalamaq, tərcümə təcrübəsi etmək və ya onu nəsr kimi oxumaq davamlı abzaslar tələb edir; dialoq vərəqi yaratmaq, orijinal ilə sətirbəsətir müqayisə etmək və ya başqa alətə ötürmək isə hər fraqment üçün bir sətir tələb edir."
    ],
    "img": {
     "file": "extract-opt",
     "alt": "Çıxarma seçimləri altındakı layout və təmizləmə keçidləri",
     "cap": "Bir layout seçin; aşağıdakı beş keçid hansı növ məzmunun silinəcəyinə qərar verir"
    }
   },
   {
    "h2": "Beş təmizləmə əməliyyatından hər biri nəyi silir?",
    "ps": [
     "**SDH fraqmentlərini sil**: \"(footsteps)\" və ya \"[music]\" kimi mötərizədəki səs təsvirlərini silir və dialoqu saxlayır.",
     "**Su nişanlarını və reklamları sil**: fansub titrləri, URL-lər və kanal adları kimi sətirləri kənarlaşdırır.",
     "**Təkrar qonşuları sil**: eyni cümlə ardıcıl iki dəfə göründükdə (oyatma xətası) yalnız bir nüsxə saxlanılır; bir-birindən daha uzaqda olan təkrar mənalar daşıyır və toxunulmaz qalır.",
     "**Danışan prefikslərini sil**: \"JOHN: Hello\" mətni \"Hello\" olur. Defolt olaraq söndürülüb — ssenari üslublu mətn kimin danışdığını göstərməlidir.",
     "**Mahnı sözləri sətirlərini ötür**: tamamilə \"♪ … ♪\" olan sətirlər ötürülür. Defolt olaraq söndürülüb — mahnı sözləri də sözlərdir."
    ],
    "img": {
     "file": "extract-clean",
     "alt": "Çıxarma seçimləri altındakı beş təmizləmə keçidi və onların təsvirləri",
     "cap": "Hər keçidin sağ tərəfində nəyi sildiyi yazılıb; ehtiyac duyduğunuz keçidləri işarələyin"
    }
   },
   {
    "h2": "Nəticənin götürülməsi",
    "ps": [
     "Sağdakı \"3 Nəticə\" sütunu çıxarılmış mətni canlı olaraq göstərir və hər hansı bir seçimi dəyişdirən kimi yenidən hesablayır.",
     "Razı qaldığınız zaman .txt faylını yadda saxlamaq üçün \"Endir\" düyməsini və ya mətni özünüzlə götürmək üçün \"Kopyala\" düyməsini klikləyin. Çin və yapon dilləri kimi sözləri boşluqlarla ayırmayan dillər üçün sətirlərin birləşdirilməsi fərqli qaydalara əməl edir və alət bunu hər dil üçün avtomatik olaraq idarə edir."
    ],
    "img": {
     "file": "extract-out",
     "alt": "Endirmə və kopyalama düymələri olan nəticə sahəsi",
     "cap": "Nəticə canlı olaraq yenilənir; onu txt kimi endirin və ya birbaşa kopyalayın"
    }
   },
   {
    "h2": "Toxunulmaz qalanlar",
    "ps": [
     "Dialoqun özü yenidən yazılmır. Təmizləmə keçidləri yalnız hansı bütöv sətirlərin və ya blokların silinəcəyinə qərar verir; onlar heç vaxt daxiletmənin ifadəsini dəyişdirmirlər.",
     "Zaman xətləri və fraqment nömrələri sadəcə çıxarılmır, dəyişdirilib sonra çıxarılmır — orijinal fayl toxunulmaz qalır və bu səhifə zaman xətləri ilə ixrac təklif etmir. Bu iş [[Format çevrilməsinə|/convert.html]] məxsusdur."
    ]
   },
   {
    "h2": "Common questions :: Ümumi suallar",
    "ps": [
     "**ASS üslub teqləri mətndə qalırmı?** Xeyr. ASS `{}` xüsusi blokları silinir və yalnız dialoq qalır.",
     "**İkidilli fayl iki sətir yoxsa bir sətir kimi çıxır?** Daxiletmədə neçə sətir var idisə, o qədər; bu səhifə onları nə birləşdirir, nə də bölür — onları ayırmaq üçün [[İkidilli bölgü|/bilingual.html]] alətindən istifadə edin.",
     "**Danışan prefiksləri niyə defolt olaraq saxlanılır?** \"JOHN: Hello\" içindəki ad tez-tez faydalı məlumatdır (ssenarilər, dialoq vərəqləri) və onu silmək kimin danışdığını başa düşməyi çətinləşdirir, ona görə də seçim sizə buraxılır.",
     "**LRC mahnı sözləri faylları da çıxarıla bilrmi?** Bəli. LRC vaxt teqləri silinir və mahnı sözləri sətirləri qalır; əgər mahnı sözlərini istəmirsinizsə, \"Mahnı sözləri sətirlərini ötür\" seçimi işarələyin."
    ]
   },
   {
    "h2": "Privacy :: Məxfilik",
    "ps": [
     "Altitrlər tamamilə brauzerdə işlənilir: heç nə yüklənmir və heç nə serverdən keçmir. Mətn yalnız cari səhifədə qalır və səhifə yeniləndikdə təmizlənir."
    ]
   },
   {
    "h2": "Əlaqədar alətlər və bələdçilər",
    "ps": [
     "Altitr faylının əslində nə ehtiva etdiyini başa düşmək üçün [[SRT faylının içində nə var|/guides/srt-file-format.html]] bölməsinə baxın; çıxarılan dialoqu tərcümə etmək üçün [[Altitr tərcüməsi|/translate.html]] bölməsinə keçin; onu cədvələ çevirmək üçün [[Altitrlər Excel/CSV formatında|/guides/srt-to-excel.html]] alətindən istifadə edin; və hər hansı bir şeyi təslim etməzdən əvvəl [[Altitr QC (keyfiyyətə nəzarət)|/qc.html]] yoxlamasını icra edin."
    ]
   }
  ]
 },
 "extract-subtitles-from-video": {
  "seo": {
   "title": "Videodan altitrləri çıxarmaq – Daxil edilmiş və xarici altitrlər – AI-SRTSub",
   "desc": "MKV / WebM / MP4 / MOV fayllarının hər birinin nə daşıdığı, mətn, ASS, WebVTT və mov_text treklərinin necə fərqləndiyi, şəkil altitrlərinin (PGS / DVD) niyə mətnə malik olmadığını və çıxarıldıqdan sonra nə edilməli olduğunu öyrənin.",
   "h1": "Videodan altitrləri çıxarmaq",
   "intro": "Altitrlər video faylının içində ola bilər və ya xaricdə tək başına dayana bilər. İçəridə onlar konteynerdə bir trekedir — onları çıxarmağın transkodu ilə heç bir əlaqəsi yoxdur.",
   "ctaText": "Video altitr çıxarılmasını açın"
  },
  "body": [
   {
    "h2": "Altitrlərin yaşadığı yerlər: daxil edilmiş və xarici",
    "ps": [
     "Video faylı (MKV, MP4) eyni vaxtda video treki, audio treki və altitr treklərini saxlayan konteynerdir. İçəridə möhürlənmiş altitrlər **daxil edilmiş (embedded)**; xaricdə oturan ayrı .srt / .ass faylı isə **xarici (external)** altitrdir, daxil edilmiş trek həm də **muxed in** adlanır.",
     "Xarici altitrlər olduğu kimi istifadə edilə bilər. Problem daxil edilmiş altitrlərdədir: onları redaktə etmək, tərcümə etmək və ya orijinaldan ikidilli trek qurmaq üçün əlinizdə heç bir altitr faylı yoxdur — əvvəlcə treki konteynerdən oxuyub çıxarmalısınız. Bu addım transkod deyil: video yenidən kodlaşdırılmır, yalnız konteynerdə artıq saxlanılan məlumatlar oxunub çıxarılır."
    ]
   },
   {
    "h2": "Hansı konteyner nəyi daşıyır?",
    "ps": [
     "Müxtəlif konteynerlər müxtəlif altitr formatlarını saxlayır və çıxarma çətinliyi də dəyişir:"
    ],
    "img": {
     "file": "videosub-which",
     "alt": "Daxil edilmiş altitr çıxarılma səhifəsi tərəfindən siyahıya alınmış altitr trekləri",
     "cap": "Hər sətir üçün bir trek, adətən dil və trek adı ilə; yalnız bir trek olduqda o, avtomatik olaraq çıxarılır"
    }
   },
   {
    "h2": "Şəkil altitrləri niyə çıxarıla bilməz?",
    "ps": [
     "Blu-ray PGS və DVD altitrləri heç bir simvol saxlamır, yalnız alfa kanalına malik bir sıra şəkillər saxlayır. Pleyer onları göstərəndə mətni render etmir, sadəcə şəkil yapışdırır.",
     "Ona görə də belə trekdə oxunacaq heç bir mətn yoxdur — söhbət alətin bunu dəstəmləməməsindən deyil, orada heç bir simvolun olmamasından gedir. Səhifə belə problemlə qarşılaşdıqda bunu açıq şəkildə bildirir.",
     "Sözləri əldə etməyin yeganə yolu əvvəlcə həmin şəkillərdəki simvolları tanılamaq (OCR) və bundan altitrlər qurmaqdır. Bu, treki çıxarmaqdan ayrı prosesdir."
    ]
   },
   {
    "h2": "Çıxarılmadan sonra adətən nə gəlir?",
    "ps": [
     "Ortaya çıxan trek olduğu kimidir: alət kodlaşdırmaları təxmin etmir və zaman xətlərini düzəltmir. Ona görə də tez-tez iki şey üzə çıxır:",
     "Biri **pozulmuş mətndir** — mənbə trekdəki kodlaşdırma problemidir ki, nəticədə yenə də pozulmuş şəkildə çıxır; kodlaşdırmanı müəyyən etmək üçün [[Pozulmuş mətni necə bərpa etməli|/guides/repair.html]] bölməsinə baxın. Digəri isə **səhv vaxtlamadır** — mənbənin giriş loqosu olsun və ya kadr tezlikləri uyğun gəlməsin, nəticə bütövlükdə sürüşür; onu sürüşdürmək və ya miqyaslamaq üçün [[Vaxt tənzimləməsindən|/shift.html]] istifadə edin.",
     "Bundan sonra, tərcümə etmək üçün [[Altitr tərcüməsi|/translate.html]] bölməsinə keçin, ikidilli etmək üçün isə [[İkidilli altitrlər yaratmağın iki yolu|/guides/make-bilingual-subtitles.html]] bölməsinə baxın."
    ],
    "img": {
     "file": "videosub-formats",
     "alt": "SRT / VTT / ASS / TXT ixrac formatları olan nəticə sahəsi",
     "cap": "Çıxarılan altitrlər dörd formatda ixrac edilə bilər; ASS mənbəyi öz üslub başlıqlarını və təsvir ölçüsünü saxlayır"
    }
   },
   {
    "h2": "Səhv başa düşülməsi asan olan bir neçə məqam",
    "ps": [
     "**Altitrləri çıxarmaq onları videoya yapışdırmaq (burn-in) demək deyil.** Video yenidən kodlaşdırılmır, ona görə də şəkil keyfiyyəti və audio təsirə məruz qalmır.",
     "**Çıxarılma orijinal fayla təsir etmir.** Yalnız oxunur, heç vaxt üzərinə yazılmır və videonun bir baytı belə dəyişmir.",
     "**Böyük bir faylın yavaş işləməsi əlaqə problemi deyil.** Alət trek məlumatlarını hissə-hissə skan edir və fayl nə qədər böyükdürsə, bir o qədər çox vaxt alır; bunların hamısı lokal olaraq baş verir.",
     "**Xarici altitrlərin bu səhifəyə ehtiyacı yoxdur.** Əgər .srt / .ass faylınız varsa, birbaşa [[Format çevrilməsinə|/convert.html]] keçin; yalnız videonun içində möhürlənmiş altitrlər əvvəlcə çıxarılmalıdır."
    ]
   },
   {
    "h2": "Əlaqədar alətlər və bələdçilər",
    "ps": [
     "Tam bələdçi üçün [[Videoya daxil edilmiş altitrləri necə çıxarmalı|/guides/videosub.html]] bölməsinə baxın; çıxardığınızı tərcümə etmək üçün [[Altitr tərcüməsi|/translate.html]] bölməsinə keçin, ikidilli etmək üçün [[İkidilli altitrlər yaratmağın iki yolu|/guides/make-bilingual-subtitles.html]] bölməsinə baxın; pozulmuş mətn üçün isə [[Pozulmuş mətnin bərpası|/repair.html]] ilə başlayın."
    ]
   }
  ]
 },
 "fps-23-976-vs-25": {
  "seo": {
   "title": "23.976 / 24 / 25 / 30 fps Əslində Nə Deməkdir – Altitr Vaxtı – AI-SRTSub",
   "desc": "23.976 – 24 deyil, 29.97 də – 30 deyil — çatışmayan 0.1% NTSC rəngindən qaynaqlanır, PAL isə filmləri 4% sürətlə işlədir. Bunların altitr vaxtınızı necə dəyişdirdiyini və onlar arasında necə çevrilmə ediləcəyini öyrənin.",
   "h1": "23.976 / 24 / 25 / 30 fps əslində nə deməkdir",
   "intro": "23.976 və 24 arasındakı 0.1% boşluğu televiziya tarixindən qalan mirasdır. PAL-ın 4% formatı ilə birlikdə bu, film irəlilədikcə altitrlərin daha çox sinxronizasiyadan çıxmasının səbəbidir.",
   "ctaText": "Vaxt tənzimləməsini açın"
  },
  "body": [
   {
    "h2": "What each number is :: Hər bir rəqəmin mənası nədir?",
    "ps": [
     "Kadr tezliyi bir saniyədə neçə şəklin göstərildiyini bildirir. Ən çox qarşılaşdığınız dörd kadr tezliyi:"
    ]
   },
   {
    "h2": "0.1% haradan gəlir?",
    "ps": [
     "23.976 = 24 × 1000/1001 və 29.97 = 30 × 1000/1001. Həmin 1000/1001 NTSC-yə rəng əlavə edilməsindən qalan mirasdır: mövcud ağ-qara qəbulediciləri qırmadan rəng altdaşıyıcısını daxil etmək üçün sahə tezliyi 60 Hz-dən 59.94 Hz-ə endirildi (60 × 1000/1001) və kadr tezliyi də onunla birlikdə aşağı düşdü.",
     "Nəticə: NTSC bölgələrində filmlər 24 əvəzinə 23.976 sürətilə yayımlanır. Fərq 0.1% təşkil edir və ya bir saat ərzində 3.6 saniyədir — özlüyündə çətinliklə nəzərə çarpır, lakin onu aşağıdakı 4% ilə səhv salmayın və hər ikisini heç vaxt bir hesablamada birləşdirməyin."
    ]
   },
   {
    "h2": "4% haradan gəlir?",
    "ps": [
     "PAL bölgələri 25 fps sürəti ilə göstərir. Filmlər 24 fps sürəti ilə çəkilir və sadəcə 25 sürətilə oynadılır — bir kadr belə əlavə edilmir və ya çıxarılmır, ona görə də oxutma 4% daha sürətli işləyir (25/24 ≈ 1.0417). 100 dəqiqəlik film PAL versiyasında 96 dəqiqə davam edir.",
     "Bu, **proqressiv sürüşmənin** əsas səbəbidir: orijinala qarşı hazırlanmış altitrlər və PAL versiyasındakı video başlanğıcda tamamilə üst-üstə düşür, lakin titrlərə gəlib çatdıqda dörd dəqiqə fərqlənir. Heç bir qlobal sürüşmə bunu xilas edə bilməz; o, nisbətə görə yenidən miqyaslanmalıdır."
    ],
    "img": {
     "file": "shift-step-rate",
     "alt": "Vaxt səhifəsinin sürət bölməsi: nisbət daxiletmə qutusu",
     "cap": "Nisbətə görə yenidən miqyaslayın — bir dəyər bütün filmi əhatə edir"
    }
   },
   {
    "h2": "How to convert :: Necə çevirmək olar?",
    "ps": [
     "Çevrilmə bütün film boyunca tətbiq olunan tək bir nisbətə vurmaq deməkdir:"
    ]
   },
   {
    "h2": "Hansına sahib olduğunuzu necə müəyyən etməli",
    "ps": [
     "Nisbəti təxmin etməkdənsə, düzgün vaxtından əmin olduğunuz iki anı tapın — adətən dialoqun ilk və son sətirləri — və alətə deyin: \"bu sətir 00:00:12-də, o biri isə 01:35:40-də olmalıdır\"; o, bütün filmi həmin iki nöqtə arasında xətti şəkildə uzadır. Bu, \"iki nöqtəli lövbərləmədir\" və sizdən heç bir kadr tezliyi hesablaması tələb etmir.",
     "Kadr tezliyini özünüz təsdiqləmək üçün pleyerinizi və ya media məlumat alətini yoxlayın. `1080p.WEB` kimi fayl adı heç bir kadr tezliyi ipucu daşımadıqda, iki nöqtəli lövbərləmə daha təhlükəsiz yoldur."
    ],
    "img": {
     "file": "shift-step-two",
     "alt": "Vaxt səhifəsinin iki nöqtəli lövbər bölməsi: iki sətir zaman damğası daxiletmələri",
     "cap": "İki nöqtəli lövbərləmə kadr tezliyi tələb etmir — sadəcə iki zaman damğası kifayətdir"
    }
   },
   {
    "h2": "Əlaqədar alətlər və bələdçilər",
    "ps": [
     "Kadr tezliyinin çevrilməsi — [[Altitr kadr tezliyinin çevrilməsi|/guides/srt-fps-converter.html]]; sürət tənzimləməsi — [[Altitr sürətinin çevrilməsi|/guides/subtitle-speed-converter.html]]; bunun qlobal sürüşmə, yoxsa proqressiv sürüşmə olduğunu bilmirsinizsə — [[Altitrlərin getdikcə sinxronizasiyadan çıxması|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "glossary": {
  "seo": {
   "title": "Altitrlərdə toplu termin əvəzləməsi – Bir cədvəl faylı düzəldir – AI-SRTSub",
   "desc": "Hər sətir üçün bir qayda, ->, =>, → və ya Tab ilə ayrılmış, şərhlər üçün # işarəsi ilə. Tam söz uyğunluğu, böyük-kiçik hərf həssaslığı, ikidilli fraqmentin birinci və ya ikinci sətri, hər bir dəyişiklik siyahıya alınır və geri alına bilər.",
   "h1": "Altitrlərdə terminləri toplu şəkildə necə əvəzləmək olar",
   "intro": "Tək bir termin cədvəli bütün altitr faylının ifadələrini birdəfəyə uyğunlaşdırır — zaman xətləri, ASS üslubları və VTT NOTE bloklarına bir simvol belə toxunulmur.",
   "ctaText": "Toplu termin əvəzləməsini açın"
  },
  "body": [
   {
    "h2": "What this tool does :: Bu alət nə edir?",
    "ps": [
     "Eyni sözün iki müxtəlif şəkildə tərcümə olunması, maşın tərcüməsi ilə adların və yerlərin fərqli düşməsi, başqasının altitrlərinin öz qərarlarınıza uyğunlaşdırılması lazımdırsa — bütün bunların ortaq cəhəti odur ki, dəyişən struktur deyil, sözdür. Bu səhifə yalnız sözləri dəyişdirir."
    ]
   },
   {
    "h2": "İki giriş: altitrlər və termin cədvəli",
    "ps": [
     "Soldakı \"1 Altitr əlavə et\" sütunu altitr faylını qəbul edir və ya mətni birbaşa yapışdıra bilərsiniz; səhv fayl seçmisinizsə, \"Təmizlə\" düyməsini klikləyin.",
     "Sağdakı \"2 Termin cədvəli\" sütunu qaydaları saxlayır. **Hər sətirdə bir qayda** olmaqla, köhnə termin və yeni termin `->`, `=>`, `→` və ya Tab ilə ayrılır — dördünün də işləyir. `#` ilə başlayan sətirlər şərhlərdir və əvəzləmədə iştirak etmir.",
     "Formatdan əmin deyilsinizsə, \"Nümunəni doldur\" düyməsini klikləyin və onu redaktə edin."
    ],
    "img": {
     "file": "glossary-up",
     "alt": "Altitr əlavə etmə sahəsi və termin əvəzləmə səhifəsinin termin cədvəli girişi",
     "cap": "Solda altitrlər, sağda qaydalar; hər sətirdə bir qayda, köhnə termin və yeni termin -> ilə ayrılır"
    }
   },
   {
    "h2": "Termin cədvəli necə yazılır?",
    "ps": [
     "Hər sətirdə bir qayda: cari termin solda, sağda nə olmalıdır. Məsələn, `Thor -> Donar` fayldakı hər \"Thor\" sözünü \"Donar\" ilə əvəz edir.",
     "Şərhlər `#` ilə başlayır və qaydalar qrupunu etiketləmək (məsələn, \"# season 1 name fixes\") və qaydanı müvəqqəti olaraq söndürmək üçün əlverişlidir — silmək əvəzinə qarşısına sadəcə `#` qoyun.",
     "Qaydalar yuxarıdan aşağıya doğru işləyir; bir qayda tərəfindən yaradılan mətn altındakı qaydalar tərəfindən yenidən skan edilir. Ardıcıllıq vacib olduqda (məsələn, əvvəlcə A-nı B ilə, sonra isə B-ni C ilə əvəz etmək), bunu nəzərə alın."
    ],
    "img": {
     "file": "glossary-table",
     "alt": "Termin cədvəli daxiletməsində sətir-sətir əvəzləmə qaydaları",
     "cap": "Hər sətirdə bir qayda; # ilə başlayan sətirlər şərhlərdir və qaydanı müvəqqəti olaraq söndürə bilər"
    }
   },
   {
    "h2": "Üç keçidin gördüyü işlər",
    "ps": [
     "**Əhatə dairəsi (Scope)**: `all` / `first line only` / `second line only`. İkidilli faylda yalnız tərcüməni dəyişdirmək istədikdə \"yalnız ikinci sətir\" seçin; yalnız bir sətri olan daxiletmələr hər hansı tək sətir parametrində toxunulmaz qalır — alət hansı tərəfin orijinal olduğunu təxmin etmir.",
     "**Tam söz (Whole word)**: yalnız tək başına söz kimi duran terminləri əvəz edir, buna görə də `art` `start`-ə toxunmayacaq. Çin və yapon dilləri kimi sözləri boşluqlarla ayırmayan dillər üçün bu keçidin heç bir təsiri yoxdur — orada əvəzləmə alt-sətirlər (substrings) üzərində işləyir.",
     "**Böyük-kiçik hərf həssaslığı (Case sensitive)**: defolt olaraq söndürülüb, ona görə də `CEO` və `ceo` hər ikisi əvəzlənir; işarələndikdə yalnız eyni yazılış əvəzlənir."
    ],
    "img": {
     "file": "glossary-opt",
     "alt": "Termin cədvəlinin altındakı əhatə dairəsi, tam söz və böyük-kiçik hərf həssaslığı keçidləri",
     "cap": "Əhatə dairəsi hansı sətrin dəyişəcəyinə qərar verir; tam söz və həssaslıq isə terminin nə qədər dəqiq uyğunlaşdırılacağını müəyyənləşdirir"
    }
   },
   {
    "h2": "Hər bir dəyişiklik siyahıya alınır, hər bir dəyişiklik geri alına bilər",
    "ps": [
     "\"3 Nəticə\" əvəzlənmiş altitrləri göstərir və həmçinin **hər bir dəyişikliyi siyahıya alır**: hansı fraqment, hansı sətir, nədən nəyə.",
     "Onlardan birini istəmirsinizsə, yalnız həmin daxiletməni geri qaytarmaq üçün siyahıda onu klikləyin — termin cədvəlini redaktə edib yenidən işlətməyə ehtiyac yoxdur. Razı qaldığınız zaman \"Endir\" və ya \"Kopyala\" düyməsini klikləyin."
    ],
    "img": {
     "file": "glossary-out",
     "alt": "Fərdi dəyişikliklərin siyahısı olan nəticə sahəsi",
     "cap": "Hər bir dəyişiklik siyahıya alınır; geri qaytarmaq istəmədiyiniz birini klikləyin"
    }
   },
   {
    "h2": "Toxunulmaz qalanlar",
    "ps": [
     "**Zaman xətləri, ASS üslub sətirləri və VTT `NOTE` bloklarına bir simvol belə toxunulmur.** Əvəzləmə yalnız dialoq mətninə tətbiq olunur, heç vaxt struktur sətirlərinə deyil.",
     "Termin cədvəli heç vaxt altitr faylınızı avtomatik olaraq dəyişdirmir — nəticə yeni çıxışdır və orijinal olduğu kimi qalır."
    ]
   },
   {
    "h2": "Common questions :: Ümumi suallar",
    "ps": [
     "**Niyə termin əvəzlənmədi?** Əvvəlcə əhatə dairəsini yoxlayın: \"yalnız ikinci sətir\" seçildikdə, yalnız bir sətri olan daxiletmələr toxunulmaz qalır. Sonra təkbaşına söz olmayan uyğunluqları dayandıran tam söz uyğunluğunu yoxlayın.",
     "**Tam söz uyğunluğu işarələndiyi halda çin dili niyə hələ də alt-sətirləri əvəz edir?** Bu gözləniləndir. Çin və yapon dilləri sözləri boşluqlarla ayırmadığı üçün alət söz sərhədlərini müəyyən edə bilmir və orada tam söz uyğunluğunun heç bir təsiri yoxdur.",
     "**Səhvdən sonra hər şeyi necə geri qaytara bilərəm?** Dəyişiklik siyahısında daxiletmələri bir-bir geri qaytarın; tamamilə yenidən başlamaq üçün termin cədvəlini təmizləyin və altitrləri yenidən əlavə edin.",
     "**ASS üslub sətirləri səhvən dəyişdirilə bilrmi?** Xeyr. Üslub sətirləri və `NOTE` blokları əhatə dairəsindən kənardadır; yalnız dialoq mətni iştirak edir."
    ]
   },
   {
    "h2": "Privacy :: Məxfilik",
    "ps": [
     "Altitrlər və termin cədvəli tamamilə brauzerdə işlənilir: heç nə yüklənmir və heç nə serverdən keçmir. Termin cədvəli saxlanılmadıqları üçün səhifəni növbəti dəfə açanda o, boş olacaq."
    ]
   },
   {
    "h2": "Əlaqədar alətlər və bələdçilər",
    "ps": [
     "Termin cədvəlinin necə qurulacağı və bir mövsüm ərzində necə saxlanılacağı üçün [[Termin cədvəlləri: mövsümü uyğun saxlamaq|/guides/subtitle-glossary.html]] bölməsinə baxın; əgər məzmun çirklidirsə (su nişanları, SDH fraqmentləri), əvvəlcə [[Altitr təmizlənməsini|/clean.html]] icra edin; adlar müəyyənləşdikdən və başqa dillər lazımdırsa, [[Altitr tərcüməsi|/translate.html]] bölməsinə keçin; və nəticəni [[Altitr QC (keyfiyyətə nəzarət)|/qc.html]] yoxlamasından keçirin."
    ]
   }
  ]
 },
 "hanconv": {
  "seo": {
   "title": "Sadələşdirilmiş–Ənənəvi Altitr Çevrilməsi – Tayvan və Honq Konq – AI-SRTSub",
   "desc": "Doqquz istiqamətin bələdçisi: regional lüğətlə və ya lüğətsiz Tayvan dili, özünəməxsus üslubu ilə Honq Konq dili, bunların hamısının yenidən sadələşdirilmiş sazişə çevrilməsi. Yalnız dialoq dəyişir; vaxtlar yerində qalır.",
   "h1": "Sadələşdirilmiş və ənənəvi çin altitrlərini necə çevirmək olar",
   "intro": "Altitrin Tayvana, Honq Konqa və ya materikə getməsindən asılı olaraq həm ifadələr, həm də simvol formaları dəyişir. Seçmək üçün doqquz istiqamət var və yalnız dialoq çevrilir — vaxtlar, indeks nömrələri və ASS üslub sətirlərinə heç vaxt toxunulmur.",
   "ctaText": "Open the converter :: Çeviricini açın"
  },
  "body": [
   {
    "h2": "What this tool does :: Bu alət nə edir?",
    "ps": [
     "Sadələşdirilmiş və ənənəvi formatlar arasında çevrilmə sadəcə hər simvolu fərqli yazmaq demək deyil. Eyni sadələşdirilmiş söz müxtəlif bölgələrdə fərqli sözlərə uyğun gəlir — \"proqram təminatı\" sözü Tayvan və materik arasında fərqlənir, Honq Konqun isə başqa bir versiyası var. Çevirici bunları bir-biriindən ayırır:"
    ]
   },
   {
    "h2": "Upload and detection :: Yükləmə və aşkarlama",
    "ps": [
     "Faylı daxilə sürüyün və ya gözdən keçirin — SRT, VTT, ASS və TXT dəstəklənir — və ya altitr mətnini birbaşa qutuya yapışdırın. Format avtomatik olaraq aşkar edilir və \"Aşkar edilmiş format\" yanında göstərilir."
    ],
    "img": {
     "file": "hanconv-up",
     "alt": "Çeviricinin yükləmə sahəsi: atma zonası və yapışdırma qutusu, yuxarıda aşkar edilmiş format ilə",
     "cap": "SRT / VTT / ASS / TXT, format avtomatik olaraq aşkar edildi"
    }
   },
   {
    "h2": "Doqquz istiqamət arasında seçim etmək",
    "ps": [
     "\"Buna çevir\" altındakı doqquz istiqamət üç qrupa bölünür. **Sadələşdirilmiş → ənənəvi**: ümumi ənənəvi, Tayvan (ifadə dəyişikliyi ilə), Tayvan (yalnız qliflər), Honq Konq. **Ənənəvi → sadələşdirilmiş**: ümumi, Tayvandan, Honq Konqdan. **Ənənəvidən ənənəviyə**: Tayvan formaları, Honq Konq formaları.",
     "\"Tayvan ifadələri\"ni seçmək regional lüğəti də dəyişdirir: \"proqram təminatı\" sözü Tayvan sözünə çevrilir və \"məlumat\" sözü də eynilə dəyişir; \"Tayvan qlifləri\" yalnız simvolların necə yazıldığını dəyişdirir və ifadələrinizə toxunmur. Honq Konqtamamilə başqa bir haldır və \"proqram təminatı\" üçün başqa sözdən istifadə edir. Sadələşdirilmiş formaya geri qayıtmaq üçün aşağıdakı qrupdan istifadə edin — hansı ənənəvi növündən gəldiyinizi qeyd etməlisiniz, çünki Tayvan və Honq Konq mətnləri geriyə fərqli yollarla qayıdır."
    ],
    "img": {
     "file": "hanconv-dir",
     "alt": "Çevrilmə kartı: \"Sadələşdirilmiş → Tayvan ənənəvi (ifadə dəyişikliyi ilə)\" seçilmiş təyinat açılan menyusu",
     "cap": "İstiqamətlər \"Buna çevir\" açılan menyusunda üç qrupda yerləşir; bu, ifadə dəyişiklikləri olan Tayvan variantıdır"
    }
   },
   {
    "h2": "Result and export :: Nəticə və ixrac",
    "ps": [
     "Nəticə sahəsi çevrilmiş altitri dərhal göstərir, ümumi sətir sayını və neçə sətrin dəyişdiyini göstərən statistika paneli ilə birlikdə. Əgər heç nə dəyişməyibsə, faylın çin simvolları ehtiva etməyə biləcəyinə dair ipucu alırsınız — yalnız Han simvolları çevrilir, buna görə də tamamilə latın və ya rəqəmlərdən ibarət altitr olduğu kimi qalır.",
     "Sonra endirin və ya kopyalayın. Fayl adlığına dil teqi əlavə edilir — Tayvan ənənəvi üçün `demo.srt` olur `demo.zh-TW.srt`, ümumi ənənəvi üçün `.zh-Hant`, sadələşdirilmişə geri çevirdikdə isə `.zh-Hans` olur."
    ],
    "img": {
     "file": "hanconv-out",
     "alt": "Nəticə sahəsi: çevrilmiş altitr və statistika paneli",
     "cap": "Statistika paneli ümumi və dəyişdirilmiş sətir sayını göstərir; buradan endirin və ya kopyalayın"
    }
   },
   {
    "h2": "Heç vaxt toxunulmayanlar",
    "ps": [
     "Yalnız dialoq çevrilir. Vaxtlara, indeks nömrələrinə və ASS üslub sətirlərinə ümumiyyətlə toxunulmur — nəticə heç bir formatlaşdırmanı yenidən etmədən istifadəyə hazırdır."
    ]
   },
   {
    "h2": "FAQ :: Tez-tez verilən suallar",
    "ps": [
     "**Çevirici niyə \"clean\" (təmiz/quru) sözünü dəyişdirmədi?** Bir-çoxlu uyğunluqlar sözə görə həll edilir: \"təmiz\" mənası və \"quru\" mənası eyni ənənəvi formanı paylaşır, \"ağac gövdəsi\" mənası isə başqa birindən istifadə edir. Cədvəllər tək simvollar əvəzinə bütün ifadələri uyğunlaşdıran OpenCC-dən gəlir.",
     "**Tayvan və Honq Konq ənənəvi dilləri arasında nə fərq var?** Lüğət: \"proqram təminatı\" sözü ikisi arasında fərqlənir. Çatdırılma edəcəyiniz bölgə üçün uyğun istiqaməti seçin.",
     "**Çevrilmədən sonra simvol sayı dəyişdimi?** Yalnız Han simvolları dəyişdirilir — heç bir daxiletmə əlavə edilmir və ya silinmir, heç bir vaxt sürüşdürülmür. Sətir sayı dəyişibsə, formatın düzgün aşkar edilib-edilmədiyini yoxlayın.",
     "**Lüğət yüklənmədi?** Səhifə sizə səhifəni yeniləməyi və yenidən cəhd etməyi bildirir. O, lokal olaraq yüklənir, ona görə də altitrləri heç yerə yükləməyə ehtiyac yoxdur."
    ]
   },
   {
    "h2": "Privacy :: Məxfilik",
    "ps": [
     "Çevrilmə tamamilə brauzerinizdə işləyir. Heç bir altitr məzmunu heç vaxt serverə göndərilmir."
    ]
   },
   {
    "h2": "Əlaqədar alətlər və bələdçilər",
    "ps": [
     "Sadəcə sadələşdirilmişi ənənəviyə çevirmək lazımdırsa, [[Sadələşdirilmiş altitrləri ənənəviyə çevir|/guides/srt-simplified-to-traditional.html]] bölməsinə baxın; bunun sadəcə simvol dəyişdirməkdən daha artıq olduğunu öyrənmək üçün [[Sadələşdirilmiş və ənənəvi sadəcə simvol dəyişdirilməsi deyil|/guides/simplified-traditional-chinese.html]] bölməsinə baxın; başqa dilə tərcümə etmək üçün isə [[Altitr tərcüməsi|/translate.html]] bölməsinə keçin."
    ]
   }
  ]
 },
 "how-to-make-lrc-file": {
  "seo": {
   "title": "LRC sözlərini necə sinxronlaşdırmaq olar – Hər sətirə bir söz, ritmlə vur – AI-SRTSub",
   "desc": "Sıfırdan LRC faylı yaradın: hər sətirə bir söz yapışdırın, dinlədikcə vaxta toxunun, vacib qısayollar, sətrin nə vaxt ötürülməsi, LRC və ya SRT və vaxt sürüşdükdə nə etməli.",
   "h1": "LRC sözlərini necə sinxronlaşdırmaq olar",
   "intro": "LRC faylı sadəcə \"bir söz sətri üstəgəl bir zaman nöqtəsidir\". Onu yaratmaq vaxtın təyini adlanır: hər sətrin başladığı anı tutmaq.",
   "ctaText": "Söz sinxronizasiya alətini açın"
  },
  "body": [
   {
    "h2": "Vaxtın təyini əslində nədir",
    "ps": [
     "LRC faylının strukturu bundan daha sadə ola bilməzdi: hər sətirdə bir söz, hər birindən əvvəl `[mm:ss.xx]` zaman teqi gəlir. Pleyer bir sətrə çatdıqda, həmin sözü həmin anda göstərir.",
     "Deməli, \"LRC yaratmaq\" işinin hamısı hər söz sətrinə zaman nöqtəsi təyin etməkdən ibarətdir — və heç bir maşın bunu sizin əvəzinizə edə bilməz, çünki sətrin harada oxunmağa başladığını müəyyən etmək dinləməyi tələb edir."
    ]
   },
   {
    "h2": "Bir mahnının neçə dəfə dinlənilməsi lazımdır",
    "ps": [
     "Başlamazdan əvvəl bir dəqiqə düşünməyə dəyər; bu, sonrakı təkrar işlərin çox hissəsinə qənaət edir:"
    ],
    "img": {
     "file": "lrc-tap2",
     "alt": "Toxunma sahəsində oxut, bu sətri möhürlə, bir sətri ləğv et və bu sətri ötür idarəetmələri",
     "cap": "Oxutma zamanı Enter düyməsini sıxmaq daha hamardır; səhv sətri möhürləmisiniz? Z düyməsini sıxın və yenidən möhürləyin"
    }
   },
   {
    "h2": "Sözlərin yapışdırılması qalan işin nə qədər rəvan gedəcəyini müəyyənləşdirir",
    "ps": [
     "Sözləri hər sətirə bir söz olaraq yapışdırın; boş sətirlər ötürülür. Yapışdırdığınız sətir sonları sonradan vaxtını təyin edəcəyiniz sətirlərdir — onları indi daha çox sətirə bölün və sonradan daha çox toxunmalı olacaqsınız.",
     "Mövcud LRC-ni yapışdırmaq da işləyir: onun `[mm:ss.xx]` zaman teqləri tanınır və idxaldan sonra siz **vaxtı olmayan ilk sətirdən davam edirsiniz**, ona görə də vaxtı əvvəlcədən təyin edilmiş sətirləri yenidən etmək lazım gəlmir.",
     "Bu o deməkdir ki, yarıçıxmış LRC yadda saxlanıla və davam etmək üçün sonradan yenidən yapışdırıla bilər."
    ],
    "img": {
     "file": "lrc-paste2",
     "alt": "Sözləri yapışdırma sahəsi və sözləri təhlil et düyməsi",
     "cap": "Hər sətirə bir söz; bütün LRC-ni yapışdırmaq mövcud vaxtları oxuyur ki, davam edə biləsiniz"
    }
   },
   {
    "h2": "Export LRC or SRT :: LRC və ya SRT ixrac edin",
    "ps": [
     "**Musiqi pleyeri üçün LRC ixrac edin.** foobar2000, sözləri göstərən hər cür pleyerlər və cihazlar bunu oxuyur.",
     "**Videoya sözlər əlavə etmək və ya onları daha da emal etmək üçün SRT ixrac edin.** Video subtitr trekləri, subtitr alətləri və redaktə proqramları SRT oxuyur. İxracda hər sətir sonrakı başlayana qədər davam edir və son sətir 2 saniyəyə qayıdır.",
     "Hər ikisi yalnız vaxtı olan sətirləri ixrac edir — ötürülmüş sətirlər heç vaxt fayla daxil olmur."
    ],
    "img": {
     "file": "lrc-export",
     "alt": "İxrac sahəsindəki LRC-ni yüklə, SRT-ni yüklə və kopyala düymələri",
     "cap": "Pleyerlər üçün LRC, video üçün SRT; yalnız vaxtı olan sətirlər ixrac olunur"
    }
   },
   {
    "h2": "Səhv başa düşülməsi asan olan bir neçə şey",
    "ps": [
     "**Vaxt təyinindən sonra hər şey bir az səhvdir? Ofsetdən istifadə edin.** SRT ixrac edin və [[Timeline adjustment|/shift.html]] ilə bütövlükdə sürüşdürün; sətir-sətir yenidən vaxt təyin etməkdən qat-qat sürətlidir.",
     "**Mahnı davam etdikcə sürüşmə böyüyür? Bu, sürət problemidir.** Oxutma sürəti və yazma sürəti fərqli olduqda, xəta sonuna doğru böyüyür və bu, ofset deyil, mütənasib miqyaslama tələb edir.",
     "**Qısayollar yalnız birlikdə istifadə etdikdə təbii görünür.** Boşluq oxutdurur və dayandırır, Enter cari sətri möhürləyir, Z bir sətri ləğv edir — siçan və klaviatura arasında keçid etmək əvəzinə oxutma zamanı birbaşa Enter düyməsini basın.",
     "**Audio keyfiyyəti dəqiqliyə təsir edir.** Təmiz vokal mənbəyini izləmək daha asandır; canlı yazılar və yüksək fon səsləri olan mənbələr nəzərəçarpacaq dərəcədə çətindir."
    ]
   },
   {
    "h2": "Əlaqədar alətlər və bələdçilər",
    "ps": [
     "Tam təlimat üçün baxın: [[How to use the lyric sync tool|/guides/lrc.html]]; mövcud LRC-ni subtitrlərə çevirmək üçün baxın: [[LRC to SRT|/guides/lrc-to-srt.html]]; ixrac edilmiş SRT-nin vaxtı səhvdirsə, istifadə edin: [[Timeline adjustment|/shift.html]]; və nəticəni buradan keçirin: [[Subtitle QC|/qc.html]]."
    ]
   }
  ]
 },
 "lrc": {
  "seo": {
   "title": "Söz sinxronizasiya aləti – Mahnı yükləyin, sözləri yapışdırın, ritmlə vurun – AI-SRTSub",
   "desc": "Mahnı yükləyin, sözləri yapışdırın, dinlədikcə hər sətir üçün zaman möhürünə toxunun və LRC və ya SRT ixrac edin. Boşluq oxutdurur və dayandırır, Enter sətri möhürləyir, Z ləğv edir, əllər klaviaturada qalır.",
   "h1": "Söz sinxronizasiya alətindən necə istifadə etməli",
   "intro": "Mahnı yükləyin, sözləri yapışdırın, dinlədikcə hər sətir üçün zaman möhürünə toxunun və standart LRC və ya SRT ixrac edin. Audio yerli olaraq oxunur və heç vaxt yüklənmir.",
   "ctaText": "Söz sinxronizasiya alətini açın"
  },
  "body": [
   {
    "h2": "What this tool does :: Bu alət nə edir",
    "ps": [
     "Mahnıya oxuna bilən sözlər faylı verin: hər sətirdə bir söz, hər sətir zaman nöqtəsi daşıyır. Pleyerlər LRC oxuyur, subtitr trekləri SRT oxuyur və hər ikisi burada ixrac edilə bilər."
    ]
   },
   {
    "h2": "1 Load the song :: 1 Mahnını yükləyin",
    "ps": [
     "Soldakı birinci sütun audio fayl qəbul edir: **MP3, M4A, FLAC, WAV və OGG** hamısı işləyir. Audio yerli olaraq oxunur və heç vaxt yüklənmir.",
     "Audio keyfiyyəti vaxt dəqiqliyinə təsir etmir, lakin təmiz vokal mənbəyini izləmək daha asandır; canlı yazılar və yüksək fon səsli mənbələrin sinxronlaşdırılması nəzərəçarpacaq dərəcədə çətindir."
    ],
    "img": {
     "file": "lrc-up",
     "alt": "Söz sinxronizasiya alətinin mahnı yükləmə sahəsi",
     "cap": "MP3 / M4A / FLAC / WAV / OGG hamısı işləyir və audio yalnız yerli olaraq oxunur"
    }
   },
   {
    "h2": "2 Paste the lyrics :: 2 Sözləri yapışdırın",
    "ps": [
     "Sözləri ikinci sütuna yapışdırın, **hər sətirə bir söz**; boş sətirlər avtomatik olaraq ötürülür. Sonra \"Sözləri təhlil et\" düyməsini basın.",
     "Mövcud LRC-ni yapışdırmaq da işləyir — onun `[mm:ss.xx]` zaman teqləri tanınır və idxaldan sonra vaxtı olmayan ilk sətirdən davam edirsiniz, ona görə də vaxtı əvvəlcədən təyin edilmiş sətirləri yenidən etmək lazım gəlmir."
    ],
    "img": {
     "file": "lrc-paste",
     "alt": "Sözləri yapışdırma sahəsi və sözləri təhlil et düyməsi",
     "cap": "Hər sətirə bir söz yapışdırın və ya bütün LRC-ni yapışdırın və alətə mövcud vaxtları oxumağa icazə verin"
    }
   },
   {
    "h2": "3 Dinlədikcə ritmlə vurun",
    "ps": [
     "Mahnını oxudun və sətir başlayan anda Enter düyməsini basın (və ya \"Bu sətri möhürlə\" düyməsini basın); həmin sətrin vaxtı qeydə alınır və kursor növbəti sətrə keçir.",
     "Qısayollar: **boşluq** oxudur və dayandırır, **Enter** cari sətri möhürləyir, **Z** bir sətri ləğv edir. Oxutma zamanı Enter düyməsini sıxmaq işləməyin ən rəvan yoludur — siçan və klaviatura arasında irəli-geri keçid etmək lazım deyil.",
     "Səhv sətri möhürləmisiniz? Onu ləğv etmək və yenidən möhürləmək üçün Z düyməsini basın. Əgər heç bir sətri möhürləmək istəmirsinizsə (instrumental fasilə, təmiz musiqi parçası), \"Bu sətri ötür\" düyməsini basın və o, ixracda görünməyəcək."
    ],
    "img": {
     "file": "lrc-tap",
     "alt": "Toxunma sahəsində oxut, bu sətri möhürlə, bir sətri ləğv et və bu sətri ötür idarəetmələri",
     "cap": "Boşluq oxudur və dayandırır, Enter cari sətri möhürləyir, Z ləğv edir — əllər klaviaturada qalır"
    }
   },
   {
    "h2": "4 Export :: 4 İxrac",
    "ps": [
     "Dördüncü sütun ixracı həyata keçirir: pleyerlər üçün **LRC-ni yüklə**, video subtitr trekləri üçün **SRT-ni yüklə** və ya mətni birbaşa götürmək üçün \"Kopyala\".",
     "Yalnız vaxtı olan sətirlər ixrac olunur; ötürülmüş sətirlər heç vaxt fayla daxil olmur. SRT ixracında hər sətir sonrakı başlayana qədər davam edir və son sətir 2 saniyəyə qayıdır."
    ],
    "img": {
     "file": "lrc-out",
     "alt": "İxrac sahəsindəki LRC-ni yüklə, SRT-ni yüklə və kopyala düymələri",
     "cap": "Pleyerlər üçün LRC, video üçün SRT; yalnız vaxtı olan sətirlər ixrac olunur"
    }
   },
   {
    "h2": "Toxunulmaz qalanlar",
    "ps": [
     "Söz mətni yenidən yazılmır. Vaxtın təyini hər sətirə yalnız bir zaman nöqtəsi əlavə edir və yapışdırdığınız sözlərə heç vaxt toxunmur.",
     "Mövcud LRC-ni idxal etdiyiniz zaman, artıq zaman teqi daşıyan sətirlər öz orijinal vaxtını saxlayır və siz yalnız vaxtı olmayan ilk sətirdən etibarən möhürləyirsiniz."
    ]
   },
   {
    "h2": "Common questions :: Ümumi suallar",
    "ps": [
     "**Niyə bəzi sətirlər ixracda yoxdur?** Ötürülmüş sətirlər və vaxtı olmayan sətirlər heç vaxt fayla daxil olmur. Üçüncü addıma qayıdın və onları əlavə edin və ya onların ötürülməsinin nəzərdə tutulduğunu təsdiqləyin.",
     "**Vaxtlar sonradan dəyişdirilə bilərmi?** Möhürlədikdən sonra hər şeyi bir az sürüşdürmək istəyirsinizsə, SRT ixrac edin və onu bütövlükdə ofset etmək və ya miqyaslamaq üçün [[Timeline adjustment|/shift.html]] istifadə edin.",
     "**LRC yoxsa SRT — hansını ixrac etməliyəm?** Musiqi pleyerləri üçün LRC (foobar2000, axın klientləri, hər cür pleyerlər); sözlərin videoda yerləşməsi və ya subtitr alətləri ilə daha da emal edilməsi lazım olduqda isə SRT.",
     "**Bir mahnı nə qədər vaxt aparır?** Sətirlərin sayından və nə qədər dəqiq olmaq istədiyinizdən asılıdır. Otuz və ya qırx sətrlik mahnı üçün, axını bildikdən sonra hər keçiddə bir neçə dəqiqə; söz səviyyəsində dəqiqlik axtarmaq daha çox vaxt aparır."
    ]
   },
   {
    "h2": "Privacy :: Məxfilik",
    "ps": [
     "Audio və sözlər tamamilə brauzerdə işlənilir: heç nə yüklənmir və heç nə serverdən keçmir. Audio yalnız yerli olaraq dekodasiya edilir və oxunur."
    ]
   },
   {
    "h2": "Əlaqədar alətlər və bələdçilər",
    "ps": [
     "Əgər artıq LRC-niz varsa və subtitrlər istəyirsinizsə, baxın: [[LRC to SRT|/guides/lrc-to-srt.html]]; vaxt təyin etməyin arxasındakı düşüncə və tələlər üçün baxın: [[How to sync LRC lyrics|/guides/how-to-make-lrc-file.html]]; ixrac edilmiş SRT-nin vaxtı səhvdirsə, istifadə edin: [[Timeline adjustment|/shift.html]]; və nəticəni buradan keçirin: [[Subtitle QC|/qc.html]]."
    ]
   }
  ]
 },
 "lrc-to-srt": {
  "seo": {
   "title": "LRC-dən SRT-yə Çevirici – Sözləri Subtitrlərə Çevirin – AI-SRTSub",
   "desc": "LRC sözlərini SRT subtitrlərinə çevirin: hər sətir sonrakı başlayana qədər davam edir, son kadr 3 saniyə alır. 60 dəqiqədən çox olan mahnılar düzgün oxunur. Brauzerinizdə işləyir.",
   "h1": "LRC to SRT :: LRC-dən SRT-yə",
   "intro": "LRC söz fayllarını SRT-yə çevirin: faylı atın, SRT seçin, yükləyin. Son vaxtlar növbəti sətirdən avtomatik olaraq doldurulur.",
   "ctaText": "Convert LRC → SRT :: LRC → SRT Çevir"
  },
  "body": [
   {
    "h2": "LRC-nin SRT-dən fərqi",
    "ps": [
     "LRC sözlər formatıdır: hər sətir yalnız `[minutes:seconds.cents]`-də \"oxumağa başla\" vaxtını daşıyır və **son vaxtı yoxdur**; hər bir SRT kadrı həm başlanğıc, həm də son tələb edir. Deməli, çevirmənin əsas mahiyyəti son vaxtları doldurmaqdır."
    ],
    "img": {
     "file": "convert-upload-lrc",
     "alt": "Yükləmə sahəsi: LRC faylı yükləndi, LRC kimi aşkarlandı",
     "cap": "[00:12.50] zaman möhürləri olan söz faylı dərhal LRC kimi aşkar edilir"
    }
   },
   {
    "h2": "Son vaxtlar necə doldurulur",
    "ps": [
     "Qayda sadədir: **hər sətir sonrakı başlayana qədər davam edir**; son sətrin \"növbəti\"si yoxdur, ona görə də 3 saniyə alır. Həmçinin, LRC zaman möhürləri yalnız dəqiqə və saniyə daşıyır — saat yoxdur — və dəqiqə sahəsi daşınmır (62:05 deməkdir 1 saat 2 dəq 5 san), ona görə də DJ miksləri kimi həddindən artıq uzun treklər düzgün oxunur."
    ]
   },
   {
    "h2": "How to convert :: Necə çevirməli",
    "ps": [
     "[[converter|/convert.html]] açın, LRC-ni buraxın, çıxış olaraq **SRT - SubRip** seçin, sonra çevirin və yükləyin. Musiqi videoları və pleyerlərdə sözləri subtitr kimi quraşdırmaq üçün əlverişlidir; ixrac edilmiş SRT web üçün yenidən VTT-yə çevrilə bilər."
    ]
   }
  ]
 },
 "make-bilingual-subtitles": {
  "seo": {
   "title": "İkidilli Subtitrlər Etməyin İki Yolu – AI-SRTSub",
   "desc": "İkidilli subtitrlər iki formada olur: bir kadrda iki sətir, və ya eyni zaman xəttində iki kadr. Müsbət, mənfi cəhətləri və onların arasında necə keçid etmək olar. – AI-SRTSub",
   "h1": "İkidilli Subtitrlər Etməyin İki Yolu",
   "intro": "Eyni ikidilli subtitr iki tamamilə fərqli düzəni gizlədə bilər. Onları ayırmağı öyrənin və yaratmaq, bölmək və çevirmək sizi çaşdırmağı dayandıracaq.",
   "ctaText": "İkidilli subtitrlərlə işləyin"
  },
  "body": [
   {
    "h2": "İki Formanın Görünüşü",
    "ps": [
     "**Form B: eyni zaman xəttində iki kadr.** Bir dialoq sətri üst-üstə yığılmış şəkildə çəkilmiş eyni vaxta malik iki ayrı subtitr kadrına çevrilir — biri İngilis, biri Çin. Bu, ikidilli ASS subtitrlərinin qurulduğu ən yaygın üsuldur."
    ]
   },
   {
    "h2": "Hər Birinin Çatışmazlıqları",
    "ps": [
     "Form A-nın zəif nöqtəsi **aşkar edilməsidir**: treklərin bölünməsi yazı sistemindən asılıdır, ona görə də Çin-İngilis və ya Yapon-İngilis cütlükləri bir baxışda ayrılır, **tək yazını paylaşan birləşmələr** isə — İngilis və Fransız, və ya Çin və Yapon kanji — ayırd edilə bilməz. Form B-nin zəif nöqtəsi **istehsaldır**: iki zaman xətti dəqiq uyğunlaşmalıdır və onları əllə düzəltmək yorucudur; bəzi pleyerlər həmçinin eyni zaman xəttindəki hər iki kadrı çəkərək ekranı doldurur. Əsas qayda: izləyicilər üçün nəzərdə tutulmuş hazır subtitrlər üçün Form A-dan istifadə edin; trekləri əlavə iş üçün ayırmaq lazımdırsa, Form B-dən istifadə edin."
    ]
   },
   {
    "h2": "The Two Routes :: İki Yol",
    "ps": [
     "**Orijinaldan ikidilli subtitrlər qurun**: [[AI Subtitle Translation|/translate.html]] istifadə edin və ixrac zamanı “Bilingual · original on top” və ya “Bilingual · translation on top” seçin — birbaşa Form A əldə edirsiniz; ASS seçmək həmçinin “stacked top and bottom” və “two lines at the bottom” olmaqla iki düzən təklif edir.",
     "**İki treki birləşdirin və ya formalar arası çevirin**: [[Bilingual Subtitle Stripper|/bilingual.html]] və onun “merge into one two-line entry” rejimindən istifadə edin — Form B daxil, Form A çıxış; əks istiqamətdə isə “split into two files” Form A və ya B-ni qəbul edir və iki müstəqil trek verir."
    ],
    "img": {
     "file": "bilingual-modes",
     "alt": "İkidilli soyucunun dörd rejimi; “merge into one two-line entry” eyni zaman xəttini paylaşan iki kadrı birləşdirir",
     "cap": "“Merge into one two-line entry”: Form B, Form A olur"
    }
   },
   {
    "h2": "Hansı Cihaz Onu Oxudacaq",
    "ps": [
     "Veb pleyerlər (HTML5 `<track>`) və əksər mobil pleyerlər Form A-nı daha etibarlı idarə edir; masaüstü pleyerlər (VLC, mpv, PotPlayer) hər ikisini qəbul edir və hətta eyni zaman xəttindəki iki kadra müxtəlif rənglər və mövqelər verə bilər. Şübhə yaranarsa, Form A-nı SRT kimi ixrac edin — ən yaxşı daşınandır. Formatların özləri arasındakı fərqlər üçün baxın: [[SRT, VTT or ASS: Which Should You Use|/guides/subtitle-format-comparison.html]]."
    ],
    "img": {
     "file": "translate-export",
     "alt": "Tərcümə alətinin ixrac panelindəki ikidilli üslub seçimləri",
     "cap": "İkidilli sətir sırasını birbaşa ixrac zamanı seçin — bir addım və hazırdır"
    }
   },
   {
    "h2": "FAQ :: Tez-tez verilən suallar",
    "ps": [
     "**İkidilli subtitrlər sıx görünür — nə edə bilərəm?** Sətir enini idarə edin: tərcümə alətinin ixrac panelində “bilingual line width” ayarı var; daha dar sətir hər kadr üçün daha az simvol və daha təmiz ekran deməkdir.",
     "**Mən yalnız bir trek istəyirəm.** Soyucunun “keep original only / keep translation only” funksiyası bunu bir kliklə həll edir, baxın: [[Split Bilingual Subtitles into Two Tracks|/guides/split-bilingual-subtitles.html]]."
    ]
   }
  ]
 },
 "merge": {
  "seo": {
   "title": "İkidilli və üslublu subtitrlərin birləşdirilməsi – Birləşdir, üslub ver, ixrac et – AI-SRTSub",
   "desc": "İki subtitr faylını ikidilli trekə birləşdirin, mövcud ikidilli faylı yenidən üslublaşdırın və ya tək dilli faylı üslublaşdırın: cütləşdirmə rejimləri, ASS və VTT şablonları və hansı formatda ixrac edilməli olduğu.",
   "h1": "İkidilli birləşdirmə və xüsusi effektli subtitrlərdən necə istifadə etməli",
   "intro": "İki subtitr faylını bir ikidilli trekdə birləşdirin və ya subtitrlərə birbaşa üslub verin: şrift, rəng, kontur və mövqe gördüyünüz kimidir və önizləmə ixraca uyğundur.",
   "ctaText": "Xüsusi effektli subtitr alətini açın"
  },
  "body": [
   {
    "h2": "What this tool does :: Bu alət nə edir",
    "ps": [
     "Bu səhifə əslində üç işi əhatə edir: orijinal və tərcümə edilmiş subtitr faylını bir ikidilli faylda birləşdirmək, artıq ikidilli olan faylın sırasını və üslubunu tənzimləmək, və tək dilli fayla xüsusi effektlər əlavə etmək. Üçü də eyni üslub parametrlərini və eyni önizləməni paylaşır."
    ]
   },
   {
    "h2": "Three jobs, one page :: Üç iş, bir səhifə",
    "ps": [
     "Səhifənin yuxarı hissəsində üç tab var: **Merge two files**, **Adjust a bilingual file**, **Single-language file**. Seçiminiz solda neçə daxiletmə sütununun görünəcəyini müəyyənləşdirir.",
     "İki faylı birləşdirərkən sol tərəfdə iki sütun olur, \"1 Original subtitles\" və \"2 Translated subtitles\"; hər biri yüklənmiş faylı və ya birbaşa yapışdırılmış mətni qəbul edir. İkidilli faylın tənzimlənməsi və tək dilli faylın üslublaşdırılması hər biri yalnız bir sütun tələb edir."
    ],
    "img": {
     "file": "merge-mode",
     "alt": "Xüsusi effektli subtitr alətinin yuxarısındakı üç tab və soldakı daxiletmə sahəsi",
     "cap": "Yuxarıda üç tab; \"Merge two files\" seçildikdə solda orijinal və tərcümə sütunu açılır"
    }
   },
   {
    "h2": "İki fayl necə cütləşdirilir",
    "ps": [
     "\"3 Merge settings\" altındakı ilk element cütləşdirmə rejimidir: **Pair by order · use the original timeline**, **Pair by timeline · use the original timeline**, **Pair by order · use the translated timeline**.",
     "Hər iki fayl eyni sırada eyni sayda qeydə malik olduqda, sıraya görə cütləşdirmə ən təhlükəsizidir. Saylar fərqli olduqda (bir tərəf qeydləri birləşdirib, digəri onları bölübsə), zaman xəttinə görə cütləşdirin və alətə yaxınlığa görə uyğunlaşdırmağa icazə verin. Hansı zaman xəttindən istifadə olunacağı hansı faylın daha dəqiq olmasından asılıdır — adətən orijinal.",
     "Bundan əlavə, mətn strukturu (avtomatik aşkar etmə / hər qeyd üçün iki sətir / növbəli cütlər) və sıra (orijinal üstdə / tərcümə üstdə) yer alır."
    ],
    "img": {
     "file": "merge-pair",
     "alt": "Birləşdirmə ayarları altında cütləşdirmə rejimi, mətn strukturu və sıra seçimləri",
     "cap": "Cütləşdirmə rejimi hansı sətrin hansı ilə gedəcəyini müəyyənləşdirir və kimin zaman xəttindən istifadə olunacağı da burada təyin edilir"
    }
   },
   {
    "h2": "Üslubu element-element tənzimləyin",
    "ps": [
     "Üslub paneli sağ tərəfdə yerləşir. ASS ixrac etdikdə, \"ASS appearance\" bloku tətbiq olunur: düzən (split · separated top and bottom / stacked · two lines at the bottom), ölçü, rəng, şəffaflıq, şrift, qalın, kursiv, hərf arası məsafə, kontur, kontur rəngi, kölgə/fon (none / shadow / background), dərinlik, sərhəd rəngi, sərhəd şəffaflığı, üfüqi uyğunlaşdırma (bottom · left / bottom · centre / bottom · right) və tərcümə (əsas) sətrinin aşağı hissəsindən məsafə, üstəgəl orijinal (ikinci dərəcəli) sətrin şrifti, kölgə/fon və sol/sağ kənarları.",
     "İkidilli VTT üslubunu ixrac etdikdə, \"WebVTT style\" bloku tətbiq olunur: altı əvvəlcədən təyinat üzərinə (standard / compact / cinematic / top / accessible / portrait) şaquli xətti, lövbəri (bottom / top / centre), üfüqi mövqeni, en ölçüsünü, uyğunlaşdırma dəyərini və bütün kadrın sətir hündürlüyünü, üstəgəl tərcümə sətrinin fon rəngini, fon şəffaflığını və kontur enini dəyişə bilərsiniz; orijinal sətir əsas üslubu mənimsəyə bilər və ya ayrı-ayrılıqda təyin oluna bilər.",
     "İşiniz bitdikdən sonra nəticəni əvvəlcədən təyinat kimi yadda saxlaya və \"From saved presets\" altında seçib \"Apply\" düyməsini basmaqla ondan sonradan yenidən istifadə edə bilərsiniz."
    ],
    "img": {
     "file": "merge-style",
     "alt": "Sağdakı ASS görünüş panelinin parametrləri",
     "cap": "Ölçü, rəng, kontur, kölgə/fon və uyğunlaşdırma hamısı tənzimlənə bilər və nəticə əvvəlcədən təyinat kimi yadda saxlana bilər"
    }
   },
   {
    "h2": "İxrac etməzdən əvvəl önizləməni yoxlayın",
    "ps": [
     "\"Merge preview\" cədvəldir: #, vaxt, orijinal, tərcümə, üslub. Yuxarıdakı panel şübhəli sətirləri \"has sound effects\", \"has a speaker prefix\", \"shorter than 1 second\", \"more than two lines\" və \"reading speed exceeded\" üzrə, və ya daxil etdiyiniz açar sözlə filtrləyir.",
     "Sətrin üslub xanasına klikləmək həmin xananın redaktorunu genişləndirir və yalnız ondan istifadə edən sətirləri sadalayır; \"Clear all overrides\" hər bir əl ilə tətbiq edilən dəyişikliyi şablona qaytarır. Aşağıdakı zaman xətti tənzimləmə sahəsi qlobal ofseti (verilmiş kadrdan) və mütənasib miqyaslamanı idarə edir.",
     "Görünüş düzgün olduqda, \"4 Export\" bölməsinə keçin: subtitr faylını yükləyin və ya məzmununu kopyalayın."
    ],
    "img": {
     "file": "merge-preview",
     "alt": "Birləşdirmə önizləmə cədvəli və onun filtr paneli",
     "cap": "Önizləmə ixracın özüdür; şübhəli sətirləri növə görə filtrləyin və ya tək üslub xanasını genişləndirin"
    }
   },
   {
    "h2": "Toxunulmaz qalanlar",
    "ps": [
     "Üslublaşdırma yalnız görünüşü dəyişdirir, dialoqa heç vaxt toxunmur. Birləşdirmə zamanı orijinal və tərcümənin mətni bir simvol belə dəyişdirilmir; önizləmə altındakı tənzimləmə sahəsində qəsdən dəyişməsəniz, zaman xətti seçdiyiniz fayldan gəlir.",
     "Siz SRT və ya \"VTT without styling\" ixrac etdiyiniz zaman fayla heç bir üslub məlumatı yazılmır — səhifə sizə bildirir ki, VTT-də STYLE bloku yoxdur və pleyer öz standart görünüşündən istifadə edəcək. Üslub istəyirsinizsə, ikidilli VTT üslubunu və ya ASS seçin."
    ]
   },
   {
    "h2": "Common questions :: Ümumi suallar",
    "ps": [
     "**İki faylın qeyd sayı fərqlidirsə nə etməli?** \"Pair by timeline\" istifadə edin və alət yaxınlığa görə uyğunlaşdırır; uyğunlaşdıra bilmədiyi qeydlər uydurulmur.",
     "**Pleyer ixrac edilmiş ASS-dəki üsluba məhəl qoymazsa nə olar?** Üslublar faylın daxilində saxlanılır, lakin pleyerlərin ASS dəstəyi dəyişkəndir. Daha daşınabilən görünüş lazımdırsa, ikidilli VTT üslubunu ixrac edin.",
     "**Onu pozduqdan sonra ilkin şablona necə qayıda bilərəm?** ASS blokundakı \"Restore default parameters\" və VTT blokundakı \"Restore template defaults\" hərəsi öz bölməsini sıfırlayır.",
     "**Nümunədəki yeddi sətir nədir?** Onlar daxili nümunədir, yalnız birləşmənin necə göründüyünü görə bilməyiniz üçündür; nümunə ixrac edilə bilməz. Öz subtitrlərinizi yükləyin və birləşdirmə önizləməsinə klikləyin, onlar avtomatik olaraq əvəz olunacaq."
    ]
   },
   {
    "h2": "Privacy :: Məxfilik",
    "ps": [
     "Subtitrlər tamamilə brauzerdə işlənilir: heç nə yüklənmir və heç nə serverdən keçmir. Brauzeri bağlayın və həmin sessiyadan hər şey yoxa çıxır."
    ]
   },
   {
    "h2": "Əlaqədar alətlər və bələdçilər",
    "ps": [
     "İkidilli faylı yenidən iki trekə bölmək üçün istifadə edin: [[Bilingual split|/bilingual.html]]; əks istiqamətə gedib tək dili ikidilli fayla çevirmək üçün baxın: [[Two ways to make bilingual subtitles|/guides/make-bilingual-subtitles.html]]; nəticəni buradan keçirin: [[Subtitle QC|/qc.html]]; bütün mövsümü birdəfəyə emal etmək üçün istifadə edin: [[Batch conversion|/batch.html]]."
    ]
   }
  ]
 },
 "qc": {
  "seo": {
   "title": "Subtitr QC-dən Necə İstifadə Etməli – Zaman Xətti və Düzən Yoxlaması – AI-SRTSub",
   "desc": "Subtitr QC: 17 qayda üst-üstə düşmələri, sətir enini, oxuma sürətini və durğu işarələrini tutur, 27 dil üçün hədlər mövcuddur. Yarısı bir kliklə düzəlişlərdir; hesabatı yükləyin.",
   "h1": "Subtitr QC-dən Necə İstifadə Etməli",
   "intro": "Subtitrləri təhvil verməzdən əvvəl, vaxt və düzən üçün onları QC səhifəsindən keçirin: nə yoxlanılır, hesabatı necə oxumaq olar və hansı problemlər bir kliklə düzəldilə bilər — hamısı burada əhatə olunub.",
   "ctaText": "Open Subtitle QC :: Subtitr QC-ni açın"
  },
  "body": [
   {
    "h2": "Bu Alət Nə Üçündür",
    "ps": [
     "Adi gözlə yaxşı görünən subtitrlər təslim edildikdən sonra çox vaxt üst-üstə düşən zaman xətlərinə, həddindən artıq geniş sətirlərə və ya çox yüksək oxuma sürətinə malik olur. QC səhifəsi bu problemləri bir-bir sadalayır:"
    ]
   },
   {
    "h2": "Əvvəlcə Dil Qaydalarını Seçin",
    "ps": [
     "“Check by which language’s rules” altından beş hədd təyin edirsiniz: **maximum single-line width** (standart olaraq landşaft üçün 42 yarı-en vahidi, kvadrat üçün 36, portret üçün 28), **reading speed limit** (Çin, Yapon və Koreya dilləri üçün saniyədə 18 en vahidi, digər dillər üçün 20), **minimum duration of 833 milliseconds**, **maximum duration of 7000 milliseconds** və **at most 2 lines**. Subtitr dilini avtomatik aşkar etməyə təyin edin və ya 27-dən birini əllə seçin; ekran orientasiyası yalnız sətir eni səviyyəsini dəyişdirir — oxuma sürəti, müddətlər və sətir sayı olduğu kimi qalır. Yarı-en vahidləri ümumi ölçüdür: bir hanzi 2 sayılır, bir latın hərfi 1 — 42 sətir eni 21 hanzi və ya 42 hərfə bərabərdir."
    ],
    "img": {
     "file": "qc-rules",
     "alt": "QC ayarları: beş hədd daxiletmə qutusu üstəgəl subtitrin dili və ekran orientasiyası açılan siyahıları",
     "cap": "Beş hədd + dil + orientasiya; standartlar ümumi sənaye təcrübəsinə uyğundur"
    }
   },
   {
    "h2": "Reading the Report :: Hesabatın Oxunması",
    "ps": [
     "17 qaydaları üç səviyyədə tapıntıları bildirir: **errors** (pozulmuş mətn, zaman möhürünün formatı, başlanğıcdan əvvəl bitmə, pozulmuş nömrələmə), **warnings** (boş qeydlər, üst-üstə düşmələr, həddindən artıq qısa və ya uzun müddətlər, limitdən artıq oxuma sürəti, həddindən artıq geniş sətirlər, ikidən çox sətir) və **hints** (sətirsonu mövqeyi, əvvəlki və ya sonrakı boşluqlar, çatışmayan boşluqlar, durğu işarələri normaları və s.). Hər bir tapıntı qeyd nömrəsini və “measured X, threshold Y” təfərrüatını daşıyır və siyahı səviyyəyə görə filtrlənə bilər. İkidilli qeydlər güzəştlər əldə edir: hər iki forma avtomatik aşkar edilir, üst-üstə düşmə yoxlamaları bütün cütü azad edir və oxuma sürəti yalnız hədəf dildə yazılmış sətri hesablayır."
    ],
    "img": {
     "file": "qc-report",
     "alt": "QC hesabat sahəsi: xəta, xəbərdarlıq və ipucuna görə qruplaşdırılmış, hər biri qeyd nömrəsi və ölçülmüş dəyərə malik tapıntılar",
     "cap": "Üç səviyyəli hesabat: hər bir tapıntı öz qeyd nömrəsini və ölçülmüş/hədd dəyərlərini daşıyır"
    }
   },
   {
    "h2": "Fixing and Exporting :: Düzəltmə və İxrac",
    "ps": [
     "“Fix & export” kartı yalnız **auto-fixable** elementləri sadalayır: yenidən sətirə bölmə, boş qeydləri silmə, çatışmayan boşluqları əlavə etmə, dil normalarına uyğun durğu işarələrini əvəz etmə, yenidən nömrələmə — vaxtı toxunulmaz saxlayan hər şey standart olaraq işarələnib; **items that change timing** (başlanğıc və sonu dəyişdirmək, üst-üstə düşmələri sürüşdürmək, müddətləri qısaltmaq və ya uzatmaq) standart olaraq işarələnməyib — təsirini özünüz yoxladıqdan sonra onları işarələyin. “Apply fixes” düyməsini basın və təzə yoxlama avtomatik işləyir; sayğac yalnız həqiqətən düzəldiləni hesablayır — yenidən bölmək mümkün olmayan sətirlər rəqəmlərə şişirdilərək əlavə olunmur. **Reading speed over the limit has no auto-fix**: maşın hansı sözün kəsiləcəyini bilə bilməz, ona görə də tərcümə əllə qısaldılmalı və ya vaxt tənzimlənməlidir. Düzəliş etdikdən sonra SRT və ya VTT ixrac edin, və ya sadə mətn `.qc.txt` hesabatını yadda saxlamaq üçün “Download report” düyməsini basın."
    ],
    "img": {
     "file": "qc-fix",
     "alt": "Düzəliş kartı: avtomatik düzəldilə bilən elementlər üçün onay qutuları və Düzəlişləri tətbiq et düyməsi",
     "cap": "Siyahıya yalnız avtomatik düzəldilə bilən elementlər daxildir; vaxtı dəyişən düzəlişlər standart olaraq işarələnməyib"
    }
   },
   {
    "h2": "FAQ :: Tez-tez verilən suallar",
    "ps": [
     "**Niyə mənim ASS faylım ixrac edilə bilmir?** QC yalnız SRT və VTT ixrac edir; ASS daxil olur, lakin çıxmır. ASS effektlərini qorumaq üçün əvvəlcə [[Format Converter|/convert.html]] vasitəsilə bunu nəzərdən keçirin.",
     "**18 oxuma sürəti nə deməkdir?** Çin, Yapon və Koreya dilləri üçün limit saniyədə 9 tam enli simvoldur (18 yarı enli vahid); digər dillər saniyədə 20 yarı enli vahid alır. Bunlar ümumi rahatlıq səviyyələridir və daxiletmə qutusu onları dəyişməyə imkan verir.",
     "**Faylımın kodlaşdırması pozulub — yenə də yoxlanıla bilərmi?** QC yalnız UTF-8 oxuyur; əvvəlcə pozulmuş mətnin bərpası səhifəsində kodlaşdırmanı düzəldin.",
     "**O, mənim zaman xətrimə toxunacaqmı?** \"changes timing\" qrupunu işarələnməmiş saxladığınız müddətcə yox; işarələndikdə belə, hər bir dəyişiklik düzəliş tətbiq edilməzdən əvvəl açıq şəkildə göstərilir."
    ]
   },
   {
    "h2": "Related Guides :: Əlaqədar Bələdçilər",
    "ps": [
     "Oxumaq üçün həddindən artıq sürətlə yanıb-sönən subtitrlər — xüsusi bələdçiyə baxın: [[Subtitles Too Fast to Read|/guides/subtitle-too-fast.html]]. Təslim etməzdən əvvəl nəyi yoxlamaq lazımdır — yoxlama siyahısı buradadır: [[What to Check Before Delivery|/guides/subtitle-quality-check.html]]. Sinxronizasiyadan çıxan zaman xətti başqa cür problemdir — baxın: [[Subtitles Drifting Out of Sync|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "remove-subtitle-ads": {
  "seo": {
   "title": "Subtitrlərdən Reklam və Su Nişanlarını Silin – AI-SRTSub",
   "desc": "Su nişanlarını və reklamları subtitrlərdən təmizləyin: URL-lər, fansub qredits və encoded by teqləri bir kliklə təmizlənir, üstəgəl təkrarlanan və boş qeydlər. – AI-SRTSub",
   "h1": "Subtitrlərdən Reklam və Su Nişanlarını Silin",
   "intro": "Subtitrlərinizdə gizlənmiş URL-lər, qredits və promo qeydləri təmizləyicinin su nişanı qaydaları ilə bir keçiddə təmizlənir — və hər hansı səhv silinmə qeyd-qeyd geri qaytarıla bilər.",
   "ctaText": "Subtitr su nişanlarını təmizləyin"
  },
  "body": [
   {
    "h2": "Bu su nişanlarının nə olduğu",
    "ps": [
     "İnternetdən yüklənən subtitrlərdə tez-tez əvvəldə və ya sonda (bəzən ortada da) əlavə qeydlər olur: URL-lər, e-poçt ünvanları, fansub qrup adları, `encoded by` / `translated by` qredits, opensubtitles kimi sayt adları və “follow our WeChat account” və ya “for study purposes only” kimi sətirlər. Onlar normal subtitr qeydləridir — zaman xətti ilə, bir sətir tutur — ona görə də pleyerlər onları silə bilməz; onlar məzmuna görə aşkar edilməlidir."
    ]
   },
   {
    "h2": "Where to do it :: Bunu harada etməli",
    "ps": [
     "[[Subtitle Cleaner|/clean.html]] açın və subtitrinizi ora buraxın; “Watermarks & junk entries” qrupunda standart olaraq “Remove watermarks and ads”, “Remove duplicate entries” və “Remove empty entries” işarələnib və təmizlənmə avtomatik başlayır. Aşkaretmə iki səviyyədə işləyir: URL-lər, e-poçtlar, fansub qrupları və sayt adları kimi **hard signals** istənilən uzunluqda uyğun gəldikdə bütün qeydi silir; @handles, “encoded” və ya “proofread” qredits kimi **soft signals** uzun dialoqları kəsməmək üçün yalnız 40 simvoldan çox olmayan qısa qeydlərdə qiymətləndirilir. İkidilli qeydlərin əvvəlcə dialoq sətirləri saxlanılmaqla su nişanı sətirləri sətir-sətir soyulur; qeyd yalnız təmizləmədən sonra su nişanı izləri qaldığı təqdirdə bütövlükdə silinir."
    ],
    "img": {
     "file": "clean-opts",
     "alt": "Təmizləmə seçimləri ekranı: su nişanları və lazımsız qeydlər qrupunun üç onay qutusu",
     "cap": "“Watermarks & junk entries” qrupu standart olaraq aktivdir — əllə quraşdırma tələb olunmur"
    }
   },
   {
    "h2": "Review and export :: Nəzərdən keçirin və ixrac edin",
    "ps": [
     "Dəyişiklik siyahısında hər silinmiş qeyd “watermark & ad” teqini daşıyır — heç nəyin səhvən silinmədiyini təsdiqləmək üçün nəzərdən keçirin; əgər biri səhv görünürsə, onu geri qaytarmaq üçün “Restore” düyməsini basın. Təsdiqləndikdən sonra yükləyin: fayl adı avtomatik olaraq `.clean` markerini alır. Təmizlənmə brauzerinizdə yerli olaraq işləyir; subtitrləriniz heç vaxt heç yerə göndərilmir."
    ]
   }
  ]
 },
 "repair": {
  "seo": {
   "title": "Mojibake Subtitrləri Necə Bərpa Etməli – Kodlaşdırmanı Aşkarlayın – AI-SRTSub",
   "desc": "Addım-addım təlimat: orijinal kodlaşdırmanı aşkarlayın (GBK / Big5 / Shift_JIS / EUC-KR), bərpaları dilə daha çox bənzəyənlərə görə sıralayın, sonra BOM ilə UTF-8 və ya GBK olaraq yadda saxlayın. Vaxtlar və indeks nömrələri heç vaxt dəyişmir.",
   "h1": "Mojibake subtitrləri necə bərpa etməli",
   "intro": "Zibil simvollarla dolu subtitr faylı nadir hallarda zədələnir — sadəcə səhv kodlaşdırma ilə oxunub. Bərpa aləti orijinal kodlaşdırmanı aşkarlayır və indeks nömrələri və vaxtlara toxunmadan düzgün simvolları yerinə qaytarır.",
   "ctaText": "Mojibake bərpa alətini açın"
  },
  "body": [
   {
    "h2": "What this tool does :: Bu alət nə edir",
    "ps": [
     "UTF-8 kimi oxunan və GBK kimi oxunan eyni baytlar iki tamamilə fərqli simvollar dəsti yaradır — fayl zədələnməyib, sadəcə səhv kodlaşdırma ilə dekodasiya edilib. Bərpa alətinin etdikləri bunlardır:"
    ]
   },
   {
    "h2": "Faylı yükləyin, yapışdırmayın",
    "ps": [
     "İki daxiletmə nöqtəsi müxtəlif miqdarda zədəni bərpa edə bilər, ona görə də **bacarırsınızsa faylı yükləyin**. Fayl ilə orijinal baytlar hələ də orada qalır: alət bir kodlaşdırmanı digərindən sonra sınayır və GBK-nı tanrtıqdan sonra onu GBK kimi dekodasiya edir — heç nəyi təxmin etmək lazım gəlmir. Yapışdırma vasitəsilə gələn mətn artıq xam baytlar deyil. Brauzer sətri təhvil verənə qədər səhv artıq baş vermiş olur, ona görə də alət yalnız geriyə doğru işləyə və əldə edə bildiyini götürə bilər.",
     "Yapışdırılmış mətndə artıq əvəzetmə simvolu (həmin qutu içindəki sual işarəsi `�`) varsa, orijinal baytlar çoxdan yoxa çıxıb və heç nə onları geri qaytara bilməz. Səhifə bunu birbaşa deyir: yuxarı qayıdın və orijinalı yükləmək üçün \"Choose file\" istifadə edin."
    ],
    "img": {
     "file": "repair-up",
     "alt": "Bərpa səhifəsinin yükləmə sahəsi: atma zonası və yapışdırma qutusu, yuxarıda aşkar edilmiş kodlaşdırma göstərilir",
     "cap": "Faylı içinə sürüyün və ya gözdən keçirin; yapışdırma qutusu aşağıda yerləşir və çox az şey bərpa edə bilər"
    }
   },
   {
    "h2": "Diaqnostikanın sizə dedikləri",
    "ps": [
     "Yüklədiyiniz zaman diaqnostika kartı bir qərar verir. **No mojibake found**: məzmun olduğu kimi yaxşı oxunur; pleyeriniz hələ də zibil simvollar göstərirsə, pleyer səhv kodlaşdırmadan istifadə edib — \"Save as\" bölməsinə enin, başqasını seçin və həmin faylı ona verin. O, **looks like mojibake** göründükdə, kart tapdığı izi sadalayır:"
    ],
    "img": {
     "file": "repair-diag",
     "alt": "Diaqnostika kartı: qərar plus sətir-sətir sadalanan hər bir mojibake izi",
     "cap": "Diaqnostika sadəcə \"bu mojibakedir\" demək əvəzinə izləri növə görə sadalayır"
    }
   },
   {
    "h2": "Namizədlərin necə sıralandığı və necə seçilməli olduğu",
    "ps": [
     "\"Ways to fix this\" altında namizədlər **most-like-real-language-first** sıra ilə, 12 qədər olmaqla, hər biri hansı kodlaşdırma cütlüyündən oxunduğu və çevrildiyi ilə etiketlənərək sadalanır. Necə göründüyünü görmək üçün birinə klikləyin, onu seçin, sonra yadda saxlamaq üçün aşağı sürüşdürün. Razı deyilsiniz? Orijinala qayıtmaq üçün \"Keep as is\" istifadə edin.",
     "Sıralama baldan gəlir: ümumi simvolların payı, vurğu sətirləri, simvol sətirləri, qaranlıq simvol divarları, hamısı çəkiləndə nəzərə alınır. **Əgər heç bir bal açıq-aydın yaxşı deyilsə, heç nə tövsiyə olunmur** — sadəcə olsun deyə sizə yarı-mümkün namizədi sırıtmayacaq. İki dəfə zədələnmiş mətn (bir dəfə səhv yadda saxlanılıb, sonra bir dəfə səhv bərpa edilib) əsas namizədlər üzərində bir əlavə geri-həll dövrəsi alır, buna görə də iki təbəqə daxilində olan hər şey hələ də xilas edilə bilər."
    ],
    "img": {
     "file": "repair-fix",
     "alt": "Real dilə nə qədər bənzədiyinə görə sıralanmış, hər biri kodlaşdırma cütü ilə etiketlənmiş namizəd bərpa siyahısı",
     "cap": "\"Ən çox real dilə bənzəyən\"ə görə sıralanmış, əlaqəli kodlaşdırmaları göstərən namizədlər"
    }
   },
   {
    "h2": "Düzgün yadda saxlamaq son addımdır",
    "ps": [
     "Bərpa edilmiş nəticə hələ də düzgün şəkildə yadda saxlanılmalıdır. Pleyer UTF-8 aşkarlaya bilmədikdə, BOM ilə **UTF-8** olaraq (Windows pleyerləri BOM-a güvənir) və ya **GBK** olaraq yadda saxlamaq adətən problemi həll edir. UTF-8, UTF-8 (BOM ilə), GBK, Big5, Shift_JIS və ya EUC-KR olaraq yadda saxlaya bilərsiniz; nəsə uyğun gəlməsə, başqasını seçməyiniz deyilir (GBK Koreya dilini saxlaya bilməz). Yüklənmiş faylların adlarına `-fixed` əlavə olunur.",
     "Aşkar edilmiş kodlaşdırma UTF-8 olmadıqda, \"Save as\" sizin üçün artıq BOM ilə UTF-8 olaraq əvvəlcədən təyin edilir. Açılan menyuya özünüz toxunduqdan sonra o, sizi şübhə altına almağı dayandırır."
    ],
    "img": {
     "file": "repair-out",
     "alt": "Nəticə sahəsi: yadda saxla açılan menyusu və yükləmə düyməsi olan mətn qutusu",
     "cap": "Kodlaşdırma seçin, sonra yükləyin — fayl adının sonuna -fixed əlavə olunur"
    }
   },
   {
    "h2": "Heç vaxt toxunulmayanlar",
    "ps": [
     "Yalnız səhv oxunmuş simvollar əvəz olunur. İndeks nömrələri, vaxtlar və ASS üslub sətirləri heç bir şəkildə dəyişdirilmir."
    ]
   },
   {
    "h2": "FAQ :: Tez-tez verilən suallar",
    "ps": [
     "**Faylı yüklədim, bəs niyə onu yenidən yadda saxlamalıyam?** Faylın özü adətən yaxşıdır; pozulan şey pleyerin onu səhv kodlaşdırma ilə oxumasıdır. Bu halda mətndə heç bir simvolun dəyişdirilməsinə ehtiyac yoxdur — sadəcə BOM və ya GBK ilə UTF-8 olaraq surətini yadda saxlayın və onu pleyerə verin.",
     "**Niyə yapışdırılmış mətn bərpa edilə bilməz?** Əvəzetmə simvolu yapışdırılmış məzmunda göründükdən sonra orijinal baytlar yoxa çıxır və geriyə doğru əsaslandırmaq üçün heç nə qalmır. Yuxarı qayıdın və orijinalı yükləmək üçün \"Choose file\" istifadə edin.",
     "**İstədiyim namizəd siyahıda yoxdur?** Artıq sahib olduğunuzdan açıq-aydın daha yüksək bal toplamadıqda heç nə tövsiyə olunmur. Aşkar edilmiş kodlaşdırmanı başqasına dəyişməyə cəhd edin və onun yenidən sıralanmasına icazə verin.",
     "**Birdəfəyə neçə fayl?** Hərdəfəyə bir fayl. Bərpanı yükləyin, sonra növbəti faylı daxil edin."
    ]
   },
   {
    "h2": "Privacy :: Məxfilik",
    "ps": [
     "Aşkaretmə və bərpa tamamilə brauzerinizdə işləyir. Heç bir subtitr məzmunu heç vaxt serverə göndərilmir."
    ]
   },
   {
    "h2": "Əlaqədar alətlər və bələdçilər",
    "ps": [
     "Mojibakenin haradan gəldiyi və nə üçün belə göründüyü — baxın: [[Where subtitle mojibake comes from|/guides/subtitle-garbled-characters.html]]; kodlaşdırma yaxşıdır, lakin məzmun çirklidir — istifadə edin: [[Subtitle cleanup|/clean.html]]; vaxtı və oxuma sürətini yoxlamaq üçün — [[Subtitle QC|/qc.html]]."
    ]
   }
  ]
 },
 "sbv-to-srt": {
  "seo": {
   "title": "SBV-dən SRT-yə Çevirici – YouTube Subtitrlərini Çevirin – AI-SRTSub",
   "desc": "CapCut, Premiere və pleyerlər üçün YouTube-dan yüklənmiş SBV subtitrlərini SRT-yə çevirin. Vaxt dəyərləri toxunulmaz qalır — yalnız düzən dəyişir. Brauzerinizdə işləyir.",
   "h1": "SBV to SRT :: SBV-dən SRT-yə",
   "intro": "YouTube SBV subtitrlərini SRT-yə çevirin: faylı atın, SRT seçin, yükləyin. Vaxt dəyərləri toxunulmaz qalır — yalnız struktur dəyişir.",
   "ctaText": "Convert SBV → SRT :: SBV → SRT Çevir"
  },
  "body": [
   {
    "h2": "SBV-nin nə olduğu və haradan gəldiyi",
    "ps": [
     "SBV **YouTube-un subtitr formatıdır**: YouTube-dan \"subtitr faylları\" yükləmək çox vaxt sizə .sbv qazandırır. Onun strukturu SRT-dən daha sadədir — başlanğıc və son vaxtlar vergüllərlə ayrılmış şəkildə **bir sətirdə** yerləşir, mətn birbaşa altında gəlir və kadr nömrələri yoxdur."
    ]
   },
   {
    "h2": "Pleyerlərin onu nə üçün rədd etdiyi",
    "ps": [
     "YouTube-un özündən başqa, əksər redaktə proqramları və pleyerlər SBV-ni dəstəkləmir. Onda nömrələmə bloku yoxdur və vaxt sətrini SRT-dən fərqli yazır, ona görə də uzantının adını dəyişmək heç nə etmir — struktur həqiqi mənada yenidən qurulmalıdır."
    ],
    "img": {
     "file": "convert-upload-sbv",
     "alt": "Yükləmə sahəsi: SBV faylı yükləndi, SBV kimi aşkarlandı",
     "cap": "SBV olduğu kimi aşkar edilir, uzantının adının dəyişdirilməsinə ehtiyac yoxdur"
    }
   },
   {
    "h2": "How to convert :: Necə çevirməli",
    "ps": [
     "[[converter|/convert.html]] açın, SBV-ni buraxın, çıxış olaraq **SRT - SubRip** seçin, sonra çevirin və yükləyin. Kadr nömrələri təzədən təyin edilir və kadr içindəki orijinal sətir sonları bir sətirdə birləşdirilir (SRT çoxsətirli kadrlara icazə verir; SBV burada bir sətir olaraq ixrac olunur)."
    ]
   }
  ]
 },
 "shift": {
  "seo": {
   "title": "Subtitr Vaxtını Necə Sürüşdürməli (Ofset, Miqyas, İki Lövbər) – AI-SRTSub",
   "desc": "Vaxt redaktorunun illüstrasiyalı təlimatı: subtitrləri yükləyin, düzəliş addımları əlavə edin, iki lövbərli düzəliş, hər kadr üçün tənzimləmələr və ixrac.",
   "h1": "Vaxt Redaktoru: Addım-addım Bələdçi",
   "intro": "Bu bələdçi aləti yuxarıdan aşağıya izah edir: subtitrləri yükləyin, düzəliş addımları əlavə edin, yoxlamaları işlədin, hər kadr üzrə incə tənzimləmə edin və ixrac edin.",
   "ctaText": "Vaxt redaktorunu açın"
  },
  "body": [
   {
    "h2": "Load your subtitles :: Subtitrlərinizi yükləyin",
    "ps": [
     "Faylı qırıq xətli qutuya sürüyün və ya birini seçmək üçün klikləyin; həmçinin mətni birbaşa mətn qutusuna **yapışdıra bilərsiniz**. Format həm uzantıdan, həm də məzmundan aşkar edilir və nəticə format çipində görünür. Dəstəklənən daxiletmələr: srt, vtt, ass (və ssa), sbv, lrc və txt."
    ],
    "img": {
     "file": "shift-upload",
     "alt": "Yükləmə sahəsi: nümunə subtitr yükləndi, SRT kimi aşkarlandı",
     "cap": "Fayl adı və aşkar edilmiş format atma zonasının altında görünür; mətn qutusu redaktə oluna bilən olaraq qalır."
    }
   },
   {
    "h2": "Add adjustment steps :: Düzəliş addımları əlavə edin",
    "ps": [
     "Düzəlişlər **addımlar boru kəməri** əmələ gətirir: hər addım bir iş görür və qutunun içində vahidi göstərilməklə bir nömrə alır. Addımlar yuxarıdan aşağıya tətbiq olunur və istənilən addımın dəyişdirilməsi **hər şeyi orijinal subtitrlərdən yenidən hesablayır** — beləliklə, qarışıqlıq yaratmadan istənilən vaxt geri qayıdıb nömrəni tənzimləyə bilərsiniz."
    ]
   },
   {
    "h2": "İki lövbərli düzəliş",
    "ps": [
     "Nə saniyələrlə ofseti, nə də nisbəti bilmədiyiniz zaman iki lövbərdən istifadə edin: əlavə edildikdən sonra **iki \"current\" sahəsi** faylınızın birinci və son kadrından avtomatik olaraq doldurulur. Siz yalnız \"target\" sahələrini doldurursunuz — həmin kadrların əslində görünməli olduğu vaxtlar. Aradakı hər şey mütənasib olaraq yenidən paylanır."
    ],
    "img": {
     "file": "shift-step-two",
     "alt": "İki lövbərli düzəliş: cari vaxtlar avtomatik dolduruldu, daxil ediləcək hədəf vaxtlar",
     "cap": "Cari sahələr faylınızdan gəlir; hədəf sahələr videoda gördüyünüz düzgün vaxtlardır."
    }
   },
   {
    "h2": "Zaman xətti yoxlaması və kadr üzrə tənzimləmələr",
    "ps": [
     "Addımları işlətdikdən sonra **timeline check** oxuyun: çox qısa, çox uzun, oxumaq üçün çox sıx olan kadrlar, həddindən artıq geniş sətirlər və ya üst-üstə düşən kadrlar hamısı siyahıya alınır. Yoxlama **yalnız problemləri işarələyir və heç vaxt özbaşına heç nəyi dəyişmir**. Dörd standart qayda bunlardır: 0.833 s minimum müddət, 7 s maksimum, 9 simvol/saniyə oxuma sürəti və 21 simvol sətir başına — hamısı səhifədə redaktə oluna bilər. Aşağıda isə kadr üzrə tənzimləmələr iki qonşu kadrı birləşdirməyə, birini bölməyə və ya onun başlanğıc və sonunu birbaşa redaktə etməyə imkan verir; hər bir düzəliş ləğv edilə bilər."
    ]
   },
   {
    "h2": "Export the result :: Nəticəni ixrac edin",
    "ps": [
     "Nəticə paneli asan yoxlama üçün orijinal və tənzimlənmiş vaxtları **yan-yana** göstərir. Çıxış formatı standart olaraq daxiletmə formatına bərabərdir, lakin yükləməzdən əvvəl srt, vtt, ass, sbv, lrc və ya txt formatlarından istənilən birinə keçə bilərsiniz."
    ],
    "img": {
     "file": "shift-result",
     "alt": "Nəticə paneli: yükləmə və kopyalama düymələri ilə yanaşı əvvəlki və sonrakı vaxtlar",
     "cap": "Solda orijinal vaxtlar, sağda tənzimlənmiş vaxtlar; yoxlama düzgün göründükdən sonra yükləyin."
    }
   }
  ]
 },
 "shift-subtitle-timing": {
  "seo": {
   "title": "Bütün Subtitrləri Necə Daha Tez və ya Daha Gec Sürüşdürməli – AI-SRTSub",
   "desc": "Hər bir kadr eyni miqdarda gecikir: vaxt redaktorunun sürüşdürmə addımından istifadə edin — bir mənfi və ya müsbət rəqəm daxil edin və bütün kadrlar birlikdə hərəkət etsin.",
   "h1": "Bütün Subtitr Faylını Daha Tez və ya Daha Gec Sürüşdürün",
   "intro": "Audio başlayır, subtitr gec görünür — və hər bir kadr eyni miqdarda gecikir. Bu, vahid ofsetdir: bir nömrə onu düzəldir.",
   "ctaText": "Vaxt redaktorunu açın"
  },
  "body": [
   {
    "h2": "Əvvəlcə hər kadrın eyni miqdarda gecikdiyini təsdiqləyin",
    "ps": [
     "Başlanğıcda, ortada və sonda bir kadrı yoxlayın. Üçü də təxminən eyni miqdarda gecikirsə, bu **uniform offset**-dir və bir sürüşdürmə addımı bunu düzəldir. Başlanğıc düzgündürsə və sürüşmə sonuna doğru böyüyürsə, bu başqa problemdir — baxın: [[subtitles getting more and more out of sync|/guides/subtitles-out-of-sync.html]]."
    ]
   },
   {
    "h2": "Nə daxil etməli: irəli çəkmək üçün mənfi, gecikdirmək üçün müsbət",
    "ps": [
     "Vaxt redaktorunda **Shift all** addımı əlavə edin və dəyər qutusuna ofseti daxil edin: gecikən subtitrləri daha əvvələ çəkmək üçün mənfi rəqəm qoyulur; tez gedənləri daha sonraya atmaq üçün müsbət rəqəm qoyulur. Subtitrlər 1.5 saniyə gecikirsə, **-1.5** daxil edin — vahid saniyədir."
    ],
    "img": {
     "file": "shift-step-shift",
     "alt": "-1.5 saniyə daxil edilmiş Shift all addımı",
     "cap": "Mənfi rəqəm bütün faylı əvvələ çəkir; vahid qutunun içində saniyə ilə yazılır."
    }
   },
   {
    "h2": "Onu işlədin və birinci kadrı yoxlayın",
    "ps": [
     "Tətbiq etdikdən sonra nəticə paneli hər kadrın orijinal və yeni vaxtlarını **yan-yana** sadalayır. Əvvəlcə birinci kadrı yoxlayın: yeni başlanğıc vaxtı sətrin danışıldığı kadrın üzərinə düşürmü? Sonra ortadakı bir kadrı yoxlayın. Hər kadr eyni miqdarda hərəkət edir və öz müddətini qoruyub saxlayır."
    ]
   },
   {
    "h2": "Export :: İxrac",
    "ps": [
     "Yoxlama düzgün göründükdən sonra birbaşa yükləyin. Çıxış formatı standart olaraq daxiletmə formatına bərabərdir və başqasına dəyişdirilə bilər. Dəyişiklik yalnız vaxtlara toxunur — bir simvol belə mətə toxunmur."
    ]
   }
  ]
 },
 "simplified-traditional-chinese": {
  "seo": {
   "title": "Simvol Dəyişməsi Deyil – Bir-Çoxlu və Regional Sözlər – AI-SRTSub",
   "desc": "Üç şey bunu çətinləşdirir: sözlə həll edilən bir-çoxlu uyğunluqlar, müxtəlif Tayvan və Honq Konq lüğəti və yalnız dialoqun çevrilməsi. Üçünü də düzgün edin və heç bir insan təkrar işi tələb olunmayacaq.",
   "h1": "Sadələşdirilmiş və ənənəvi simvol dəyişməsi deyil",
   "intro": "Hansı ənənəvi simvolun sadələşdirilmiş simvolu əvəz edəcəyi onun yanında olan simvoldan asılıdır. Məhz buna görə də bu çevrilmə hərəfə bir simvolu kor-koranə dəyişdirməklə edilə bilməz.",
   "ctaText": "Open the converter :: Çeviricini açın"
  },
  "body": [
   {
    "h2": "Birinci: bir sadələşdirilmiş forma, bir neçə ənənəvi forma",
    "ps": [
     "Sadələşdirmə bir neçə ənənəvi simvolu bir sadələşdirilmiş formada birləşdirdi. Əks istiqamətə qayıtdıqda, bir sadələşdirilmiş simvol bir neçə ənənəvi simvola uyğun gəlir və onların arasında seçim nə ilə cütləşdiyindən asılıdır:",
     "Simvol-simvol dəyişdirmək hamısını eyni formaya salır və hər bir halı səhv edir. Onları ayıran şey **sözə görə** həll etməkdir — cədvəllər OpenCC-dən gəlir, tək simvollardan əvvəl ifadələri uyğunlaşdırır. Məsələn:"
    ]
   },
   {
    "h2": "İkinci: Tayvan və Honq Konq eyni şey deyil",
    "ps": [
     "Ənənəviyə çevirdikdən sonra daha bir qat var: eyni söz Tayvan və Honq Konqda fərqli yazılır. \"Proqram təminatı\" sözü Tayvanda başqa, Honq Konqda başqadır və Tayvan \"informasiya\" üçün öz sözündən istifadə edir.",
     "Buna görə də ayrı istiqamətlər var. Tayvan ənənəvi yazısı hətta \"change wording\" və \"glyphs only\" olaraq bölünür — glyphs only mövcud lüğətinizi qoruyur, change wording isə regional terminləri də dəyişdirir. Honq Konq özünəməxsus istiqamət alır."
    ],
    "img": {
     "file": "hanconv-dir",
     "alt": "Kartı çevir: \"Simplified → Taiwanese traditional (change wording)\" göstərən təyinat açılan menyusu",
     "cap": "Tayvan söz dəyişikliyi və ya yalnız qliflər təklif edir; Honq Konqun öz istiqaməti var"
    }
   },
   {
    "h2": "Üçüncü: yalnız dialoqa toxunulmalıdır",
    "ps": [
     "Subtitr faylı təkcə dialoq deyil. Orada indeks nömrələri, vaxtlar və ASS üslub sətirləri də var və bunların bir simvolu belə çevrilməməlidir — xüsusilə ASS üslub sətirləri, ஏks halda onlar dialoq kimi qəbul edildiyi anda pozulan İngilis direktiv adlarını ehtiva edir.",
     "Deməli, çevrilmə format üzrə təhlildən sonra baş verir: SRT, VTT, ASS və TXT hərəsi hansı hissənin dialoq olduğunu müəyyənləşdirir və yalnız onun içindəki simvollar çevrilir. Vaxtlar və üslublar heç bir formatlaşdırmanı yenidən etmədən toxunulmaz qalır."
    ],
    "img": {
     "file": "hanconv-out",
     "alt": "Nəticə sahəsi: çevrilmiş subtitr və dəyişdirilmiş sətir sayını göstərən statistika paneli",
     "cap": "Statistika paneli neçə sətrin dəyişdiyini göstərir; formatlaşdırma olduğu kimi qorunur"
    }
   },
   {
    "h2": "Sadələşdirilmişə qayıdarkən: diqqətli olun",
    "ps": [
     "Ənənəvini sadələşdirilmişə çevirmək həm də **hansı ənənəvi növdən gəldiyinizi** söyləməyinizi tələb edir: ümumi, Tayvan və Honq Konq üç fərqli yoldur, çünki regional lüğət çevrilməzdən əvvəl ümumi sözə bərpa edilməlidir. Səhv istiqaməti seçin və regional lüğət sadələşdirilmiş çıxışda qalacaq.",
     "Doqquz istiqamətin aşağı qrupu geriyə çevirən hissədir: ənənəvi → sadələşdirilmiş, Tayvan → sadələşdirilmiş, Honq Konq → sadələşdirilmiş."
    ]
   },
   {
    "h2": "Əlaqədar alətlər və bələdçilər",
    "ps": [
     "Tam təlimat — [[How to convert simplified and traditional subtitles|/guides/hanconv.html]]; əgər bütün lazım olan sadələşdirilmişi ənənəviyə çevirməkdirsə — [[Convert simplified subtitles to traditional|/guides/srt-simplified-to-traditional.html]]; başqa dilə tərcümə etmək üçün, [[Subtitle translation|/translate.html]]."
    ]
   }
  ]
 },
 "split": {
  "seo": {
   "title": "Subtitrlərin bölünməsi və birləşdirilməsi – Blokla kəs, ardıcıl zəncirvə – AI-SRTSub",
   "desc": "Bir faylı müddətə və ya fraza sayına görə segmetlərə kəsin, hər birini sıfırdan yenidən başladın və ya bir neçө faylı ardıcıl zəncirvari birləşdirin və ya xronologiyaya uyğun olaraq qarışdırın. Fraza nömrələri yenidən nömrələnir, mətnə toxunulmur.",
   "h1": "Subtitrləri necə bölmək və birləşdirmək olar",
   "intro": "Uzun bir subtitr faylını seqmentlərə kəsin və ya bir neçə səpələnmiş faylı bir faylda birləşdirin. Kəsmə həmişə giriş sərhədinə düşür — cümlə heç vaxt yarıdan kəsilmir.",
   "ctaText": "Bölmə və birləşdirməni aç"
  },
  "body": [
   {
    "h2": "Bu alət nə edir",
    "ps": [
     "Epizodların bölünməsi, seqmentlərin bölünməsi və mənbələrin birləşdirilməsi eyni uyğunsuzluğa gətirib çıxarır: subtitr blokları ilə video blokları üst-üstə düşmür: ya bir fayl kəsilməlidir, ya da bir neçəsi birləşdirilməlidir. Bu səhifə hər ikisini idarə edir, hər biri bir nişandadır."
    ]
   },
   {
    "h2": "Əvvəlcə kəsməyi və ya birləşdirməyi seçin",
    "ps": [
     "Yuxarıda iki nişan var: **Böl: bir faylı seqmentlərə** və **Birləşdir: bir neçə faylı bir fayla**. Aşağıdakı ikinci addım seçimləri seçiminizlə dəyişir.",
     "1 Subtitr əlavə et» bölməsində fayl yükləyirsiniz və ya mətn yapışdırırsınız; səhv fayl seçmisinizsə, \"Təmizlə\" düyməsini basın. Bu səhifə yalnız UTF-8 oxuyur — əgər kodlaşdırma pozulubsa (sual işarələri və ya qutular divarı) əvvəlcə [[Zədələnmiş mətnin bərpası|/repair.html]] səhifəsinə keçin."
    ],
    "img": {
     "file": "split-mode",
     "alt": "Bölmə və birləşdirmə səhifəsinin yuxarısındakı iki nişan",
     "cap": "Kəsmə və birləşdirmə iki nişandır; ikinci addımın seçimləri seçiminizə uyğundur"
    }
   },
   {
    "h2": "Necə kəsmək olar",
    "ps": [
     "2 Necə kəsmək olar» bölməsində əsası seçin: **müddət** (hər X dəqiqədən bir seqment) və ya **fraza sayı** (hər X frazadan bir seqment), sonra nömrə daxil edin.",
     "«Hər bir seqmenti 0-da yenidən başladın:00» qutusunu işarələyin və yaranan hər bir seqment sıfırdan hesablayır — bunu epizodları yüklədiyiniz və hər bir seqmenti öz başına pleerə verdiyiniz zaman istifadə edin. Orijinal zaman damgalarını saxlamaq üçün onu işarələnməmiş saxlayın ki, hər bir seqment yenə də mənbə videodakı mövqeyi ilə uyğunlaşsın.",
     "Kəsmə yalnız fraza sərhədlərinə düşür: çox uzun subtitr kəsmə nöqtəsini keçdikdə, bütün fraza əvvəlki seqmentdə qalır."
    ],
    "img": {
     "file": "split-cut",
     "alt": "Bölmə səhifəsində sıfırdan başlamaq keçidi ilə müddət və fraza sayı seçimləri",
     "cap": "Müddətə və ya fraza sayına görə kəsin və isteğe bağlı olaraq hər bir seqmenti 0:00-da yenidən başladın"
    }
   },
   {
    "h2": "Necə birləşdirmək olar",
    "ps": [
     "2 Necə birləşdirmək olar» bölməsində üsulu seçin: **Ardıcıl zəncirvari birləşdir** sonrakı faylı əvvəlki bitdikdən sonra başlayacaq şəkildə sürüşdürür, seqmentlər arasında üst-üstə düşmə yoxdur; **Xronologiyaya görə qarışdır** hər bir faylın orijinal zaman damgalarını qoruyur və başlanğıc vaxtına görə sıralayır.",
     "Fayllar bir epizodun birinci və ikinci yarısı olduqda və ya ayrı-ayrılıqda yoxlanılmış yarılar yenidən birləşdirilməli olduqda ardıcıl zəncirvari birləşdirmədən istifadə edin; fayllar ekranda birlikdə görünməli olduqda, məsələn, orijinal treklə tərcümə olunan trek xronologiyaya görə qarışdırmadan istifadə edin.",
     "Birləşdirmədən sonra fraza nömrələri avtomatik olaraq yenidən nömrələnir və bir söz belə dəyişmir."
    ],
    "img": {
     "file": "split-join",
     "alt": "Birləşdirmə səhifəsində ardıcıl zəncirvari və xronologiyaya görə qarışdırma seçimləri",
     "cap": "Ardıcıl zəncirvari birləşdirmə bir epizodun iki yarısına uyğundur; xronologiyaya görə qarışdırma orijinal və tərcümə edilmiş trekə uyğundur"
    }
   },
   {
    "h2": "Nəticəni götürmək",
    "ps": [
     "Sağ tərəfdəki «\"3 Nəticə\"» **SRT** və **VTT** ixrac edir; \"Yüklə\" və ya \"Kopyala\" düyməsini basın.",
     "Bölərkən hər klikə görə bir seqment əvəzinə hər kəsilmiş seqmenti dərhal yadda saxlayan \"Hər seqmenti yüklə\" seçimindən istifadə edə bilərsiniz."
    ],
    "img": {
     "file": "split-out",
     "alt": "Nəticə sahəsində yükləmək və hər seqmenti yükləmək düymələri ilə SRT/VTT formatı seçimi",
     "cap": "Bölmə nəticələri seqment-seqment yüklənə bilər; birləşdirilmiş fayl birbaşa yüklənir və ya kopyalanır"
    }
   },
   {
    "h2": "Toxunulmaz qalan nədir",
    "ps": [
     "Dialoqun bir xarakteri belə dəyişmir. Bu səhifə yalnız hansı frazaların hansı seqmentə aid olduğunu və onların necə nömrələndiyini dəyişdirir; girişlərin məzmunu olduğu kimi qalır.",
     "«Ardıcıl zəncirvari birləşdir» ilə sonrakı faylların zaman damgaları bütövlükdə sürüşdürülür — birləşdirmənin tələb etdiyi budur; «Xronologiyaya görə qarışdır» ilə hər bir orijinal zaman damgası qorunur."
    ]
   },
   {
    "h2": "Tez-tez verilən suallar",
    "ps": [
     "**Son seqment çox qısa olarsa nə olar?** Bu normaldır. Bütün seqmenti doldurmayan qalıq doldurulmaq əvəzinə öz seqmentinə çevrilir.",
     "**Kəsmə nöqtəsini keçən cümlə bölünəcəkmi?** Xeyr. Kəsimlər yalnız giriş sərhədlərinə düşür və xətti kəsən fraza əvvəlki seqmentdə qalır.",
     "**Qarışdırdıqdan sonra eyni vaxta malik iki fraza necə sıralanır?** Başlanğıc vaxtına görə; başlanğıc vaxtları eyni olduqda, faylları əlavə etdiyiniz ardıcıllıq qorunub saxlanılır.",
     "**ASS bölünə bilərmi?** Bu səhifə SRT və VTT-ni idarə edir. Əvvəlcə [[Format çevirmə|/convert.html]] ilə ASS-ni SRT və ya VTT-yə çevirin."
    ]
   },
   {
    "h2": "Məxfilik",
    "ps": [
     "Subtitrlər tamamilə brauzerdə işlənir: heç nə yüklənmir və heç nə serverdən keçmir. Səhifəni bağlayın və məzmun yox olur."
    ]
   },
   {
    "h2": "Əlaqədar alətlər və bələdçilər",
    "ps": [
     "İki faylı ikidilli trekdə birləşdirmək üçün (bir epizodda deyil) [[İkidilli birləşdirmə və xüsusi effektlər|/guides/merge.html]] istifadə edin; bütün xronologiya səhvdirsə, [[Zaman damgasının tənzimlənməsi|/shift.html]] səhifəsinə keçin; bütün mövsüm üçün [[Toplu çevirmə|/batch.html]] istifadə edin; və bitirdikdə [[Subtitr QC|/qc.html]] işlədin."
    ]
   }
  ]
 },
 "split-bilingual-subtitles": {
  "seo": {
   "title": "İkidilli subtitrləri iki trekə bölün – AI-SRTSub",
   "desc": "İkidilli subtitrləri iki fayla bölün: orijinal və tərcümə trekləri ayrı-ayrılıqda fərqli adlarla yüklənir; hər iki forma tanınır. – AI-SRTSub",
   "h1": "İkidilli subtitrləri iki trekə bölün",
   "intro": "Bir ikidilli subtitr iki fayla çevrilir — “orijinal” və “tərcümə”: yükləyin, ikiyə bölməyi seçin, hər birini yükləyin, zaman damgaları toxunulmaz saxlanılır.",
   "ctaText": "İkidilli subtitrləri bölün"
  },
  "body": [
   {
    "h2": "Bölməyə ehtiyacınız olduqda",
    "ps": [
     "Pleeriniz yalnız bir dilli trek istəyir; və ya yenidən tərcümə üçün tərcümə treki və ya başqa bir tərcümə olunmuş versiya ilə uyğunlaşdırmaq üçün orijinal trek istəyirsiniz. İkidilli subtitr ya **iki sətrli bir fraza** (bir sətirdə orijinal, digərində tərcümə) və ya **eyni xronologiyanı paylaşan iki ayrı fraza**dir — hər ikisi bölünə bilər."
    ]
   },
   {
    "h2": "Bunu harada etmək olar",
    "ps": [
     "[[İkidilli subtitr təmizləyicisi|/bilingual.html]] səhifəsini açın və subtitrinizi daxil edin. Alət ikidilli formanı avtomatik olaraq aşkar edir: iki sətrli bir fraza yaz sisteminə görə, eyni xronologiyada iki fraza isə ardıcıllığa görə bölünür. Rejim açılan menyusunda **İkiyə bölün** seçin və Başlat düyməsini basın (və ya avtomatik olaraq yenidən işləməsinə icazə verin). Nəticə sahəsi iki hissəni göstərir: `.orig` ilə işarələnmiş hissə orijinal trekdir, `.dst` ilə işarələnmiş hissə tərcümə trekidir — hər biri üçün \"Yüklə\" düyməsini basın; iki trek tamamilə eyni xronologiyanı paylaşır."
    ],
    "img": {
     "file": "bilingual-split",
     "alt": "Bölmə nəticəsi: orijinal trek və tərcümə treki iki hissə kimi, hər birinin yükləmə düyməsi var",
     "cap": "İkiyə bölün: .orig orijinal trek + .dst tərcümə treki, hər biri ayrıca yüklənir"
    }
   },
   {
    "h2": "Ümumi tələlərdən biri",
    "ps": [
     "**Eyni əlifbanı paylaşan dillərdə (məsələn, ingilis və fransız) iki sətrli bir fraza bölünə bilməz.** Traklar yaz sisteminə görə ayrıldıqda, həmin dillər bir sistem kimi sayılır və birtilli kimi qəbul edilir. Belə məzmunu əvvəlcə B eyni xronologiya formasına çevirin, sonra bölün; iki frazalı forma xronologiyaya görə uyğunlaşır və dildən asılı deyil. Hər iki formanın incəlikləri üçün [[İkidilli subtitrlər yaratmağın iki yolu|/guides/make-bilingual-subtitles.html]] baxın."
    ]
   }
  ]
 },
 "srt-file-format": {
  "seo": {
   "title": "SRT faylı nədir? Onu necə açmaq və redaktə etmək olar – AI-SRTSub",
   "desc": "SRT (SubRip) subtitr fayllarının anatomiyası: nömrə, vaxt xətti, mətn. Onu mətn redaktorunda necə açmaq olar, pleer onu nə üçün rədd edir və pozulmuş mətn ilə zaman damgası xətalarını necə düzəltmək olar.",
   "h1": "SRT fayl formatı izah edildi",
   "intro": "SRT ən universal subtitr formatıdır: düz mətn, sadə struktur, demək olar ki, hər yerdə qəbul edilir. Bu bələdçi onun strukturunu, onu necə açmağı və ümumi xətaları necə düzəltməyi izah edir.",
   "ctaText": "Subtitr çeviricisini açın"
  },
  "body": [
   {
    "h2": "SRT faylı nəyə bənzəyir",
    "ps": [
     "SRT (SubRip) düz mətndir — istənilən mətn redaktoru onu açır. Hər bir frazanın üç hissəsi var: **nömrə xətti**, **vaxt xətti** və **mətn**, boş sətirlərlə ayrılır. Vaxt xətti `00:00:01,000 --> 00:00:03,500` oxunur — millisaniyələrdən əvvəl nöqtə deyil, **vergül** olduğuna diqqət yetirin."
    ],
    "img": {
     "file": "convert-upload",
     "alt": "Yükləmə sahəsi: nömrələri və vaxtı göstərən yüklənmiş SRT faylı",
     "cap": "Standart SRT üç hissəli fraza: nömrə, vaxt xətti, mətn"
    }
   },
   {
    "h2": "Onu necə açmaq olar",
    "ps": [
     "Məzmunu oxumaq üçün: sağ klikləyin və istənilən **mətn redaktoru** ilə açın. Videoda istifadə etmək üçün: faylın adını **video fayl adı ilə eyni** edin (uzantı istisna olmaqla), hər ikisini eyni qovluğa qoyun və VLC, PotPlayer və ya mpv kimi pleerlər onu avtomatik olaraq yükləyir; həmçinin onu oxutma pəncərəsinə sürükləyə bilərsiniz."
    ]
   },
   {
    "h2": "Rədd edilmələri və pozulmuş mətnin düzəldilməsi",
    "ps": [
     "**Pozulmuş simvollar**: fayl UTF-8 deyil — redaktorunuzda UTF-8 kimi yenidən yadda saxlayın. **Heç nə görünmür**: vaxt xəttində vergüldən (nöqtədən deyil) istifadə olunduğunu və fraza nömrələrinin pozulmadığını yoxlayın (çox pleer boşluqlara dözür, bəziləri isə yox). **Fayl HTML və ya JSON-dur**: yükləmə mənbəyi səhvdir; onu yenidən əldə edin."
    ]
   },
   {
    "h2": "SRT-nin saxlaya biləcəyi və saxlaya bilməyəcəyi şeylər",
    "ps": [
     "SRT yalnız mətn və vaxt daşıyır: **heç bir üslub yoxdur** (ştriftlər, rənglər), **yerləşdirmə yoxdur** (ekranda harada), **effektlər yoxdur**. Bunlar ASS tələb edir — [[SRT-dən ASS-yə|/guides/srt-to-ass.html]] baxın. Bütün formatların müqayisəsi üçün [[subtitr formatının müqayisəsi|/guides/subtitle-format-comparison.html]] baxın."
    ]
   }
  ]
 },
 "srt-fps-converter": {
  "seo": {
   "title": "SRT FPS çeviricisi – Subtitr kadr tezliyini dəyişdirin – AI-SRTSub",
   "desc": "Film 24fps, yayım 25fps-dir və subtitrlər hər dəqiqə daha çox sürüşür: xronologiyanı bir dəfə 0.96 ilə miqyaslayın və bütün fayl hədəf tezliyə düşür.",
   "h1": "Subtitr kadr tezliyinin çevrilməsi: 24fps-dən 25fps-ə",
   "intro": "24fps filmin subtitrlərini 25fps mənbədə oxudun və onlar hər dəqiqə bir saniyədən çox itirirlər — son titrlərə gəldikdə isə dəqiqələrlə geridə qalırlar. Bir miqyaslama bunu düzəldir.",
   "ctaText": "Vaxt redaktorunu açın"
  },
  "body": [
   {
    "h2": "Kadr tezliyi uyğunsuzluğunun subtitrləri nə üçün sürüşdürdüyü",
    "ps": [
     "Kadr tezliyinin çevrilməsi **eyni vaxt intervalını iki fərqli saat altında** yenidən oxuyur. 100 dəqiqəlik 24fps filmin 6000 s × 24 = **144,000 kadrı** var; 25fps mənbədə həmin 144,000 kadr 5760 saniyədə oxunur — **96 dəqiqə**. Bütün film 4 dəqiqə qısa işləyir, ona görə də 50 dəqiqədəki fraza təxminən 2 dəqiqə gec görünür və son titrlərin subtitri heç vaxt görünmür."
    ]
   },
   {
    "h2": "Formula və ümumi faktorlar",
    "ps": [
     "Hədəf tezliyi ÷ orijinal tezlik = vurucu. **24-dən 25-ə: 0.96 ilə vurun** (24÷25); əksinə, 25-dən 24-ya: 1.0417. **25-dən 23.976-a: 0.959 ilə vurun**; əksinə: 1.0427. Vaxt redaktorunda **Tezliyə görө miqyasla** addımı əlavə edin və faktoru dəyər qutusuna daxil edin."
    ],
    "img": {
     "file": "shift-step-rate",
     "alt": "0.96 daxil edilmiş miqyaslama addımı",
     "cap": "0.96 bərabərdir 24÷25; səhifədəki ipucu hətta kadr tezliyinin çevrilməsini ümumi istifadə kimi qeyd edir."
    }
   },
   {
    "h2": "İki tezliyi bilmədiyiniz zaman",
    "ps": [
     "Mənbənin kadr tezliyini tapa bilmirsinizsə, faktoru təxmin etməyin — əvəzinə **iki lövbər** istifadə edin: birinci və sonuncu frazanın real görünmə vaxtını iki nöqtə kimi götürün və aralarındakı hər şey proporsional olaraq geri uzadılır. [[subtitrlərin getdikcə daha çox sinxronizasiyadan çıxması|/guides/subtitles-out-of-sync.html]] baxın."
    ]
   },
   {
    "h2": "Sonradan nəyi yoxlamaq lazımdır",
    "ps": [
     "Miqyaslama hər başlanğıc və sonu hərəkət etdirir; fraza müddətləri eyni faktorla uzadılır. İşlətdikdən sonra iki ekstremi yoxlayın: birinci fraza (ən kiçik orijinal xəta) və sonuncu (ən böyük). Hər iki ucluq uyğun gələrsə, aradakı hər şey də uyğun gəlir."
    ]
   }
  ]
 },
 "srt-simplified-to-traditional": {
  "seo": {
   "title": "Sadələşdirilmiş subtitrləri ənənəviyə çevirin – Tayvan və ya Honq Konq – AI-SRTSub",
   "desc": "Sadələşdirilmiş çincə subtitrləri ənənəviyə çevirin: Tayvan (regional lüğətlə və ya lüğətsiz) və ya Honq Konq seçin. Çoxsaylı uyğunlaşmalar sözlə həll edilir. Yalnız dialoq dəyişir; vaxtlar yerində qalır.",
   "h1": "Sadələşdirilmiş subtitrləri ənənəviyə çevirin",
   "intro": "Tayvan və ya Honq Konq auditoriyasına yönəlmiş sadələşdirilmiş çincə subtitr sadəcə çevrilmə tələb edir — lakin iki region fərqli şeylər istəyir və səhv istiqaməti seçmək yerli əhalinin istifadə etmədiyi ifadələr verəcəkdir.",
   "ctaText": "Bu subtitri çevirin"
  },
  "body": [
   {
    "h2": "Ehtiyac",
    "ps": [
     "Subtitrləriniz sadələşdirilmiş çincədir və Tayvan və ya Honq Konqdakı izləyicilərə çatmalıdır. Simvolları bir-bir düzəltmək real deyil — tək bir epizodda yüzlərlə fraza var — və iki region eyni ənənəvi mətni istəmir: lüğət fərqlidir və səhv istiqamət heç bir yerli sakinin istifadə etməyəcəyi ifadə verir."
    ]
   },
   {
    "h2": "Bunu harada etmək olar",
    "ps": [
     "[[Sadələşdirilmiş–ənənəvi çevrilmə|/hanconv.html]] açın, subtitri içinə sürükləyin və \"Çevir\" altında sadələşdirilmiş → ənənəvi istiqamətlərindən birini seçin: ümumi ənənəvi, Tayvan (ifadəni dəyişdir), Tayvan (yalnız qliflər) və ya Honq Konq. Çevrilmə dərhal baş verir və nəticə sahəsi yüklənməyə hazır olan hazır subtitri göstərir.",
     "**Tayvan auditoriyası üçün**: regional lüğət də dəyişməlidirsə, \"Tayvan (ifadəni dəyişdir)\" seçin — \"proqram təminatı\" və \"məlumat\" Tayvan ekvivalentlərinə çevrilir — və ya orijinal ifadənizi saxlayaraq simvol formalarını dəyişdirmək istəyirsinizsə, \"Tayvan (yalnız qliflər)\" seçin. **Honq Konq auditoriyası üçün**: \"proqram təminatı\"nın başqa bir forma ilə yazıldığı \"Honq Konq\" seçin."
    ],
    "img": {
     "file": "hanconv-dir",
     "alt": "Çevirmə kartı: \"Sadələşdirilmiş → Tayvan ənənəvi (ifadəni dəyişdir)\" göstərən təyinat yeri açılan menyusu",
     "cap": "Tayvan və Honq Konq müxtəlif lüğətlərə malik ayrı-ayrı istiqamətlərdir"
    }
   },
   {
    "h2": "Ümumi tələlər",
    "ps": [
     "**Bir-çoxa uyğunlaşmalardan qorxmayın**: \"təmiz\", \"quru\" və \"ağac gövdəsi\" sözlərindəki eyni sadələşdirilmiş simvol müxtəlif ənənəvi simvollara uyğun gəlir. Cədvəllər bunu ifadə ilə həll edir, ona görə də hər şey bir simvola endirilmir.",
     "**Yalnız dialoq çevrilir**: vaxtlar, indeks nömrələri və ASS üslub sətrləri toxunulmaz qalır, ona görə də nəticə istifadəyə hazırdır.",
     "**Heç nə dəyişmədi? Vəsvası olmamışdan əvvəl yoxlayın**: əgər statistika çubuğu 0 dəyişdirilmiş sətr bildirsə, ya faylda çincə simvollar yoxdur, ya da format səhv aşkar edilib — \"Aşkar edilmiş format\"ın yüklədiyinizlə uyğun gəldiyini yoxlayın."
    ]
   },
   {
    "h2": "Əlaqədar",
    "ps": [
     "Bütün doqquz istiqamətin tam izahatı — [[Sadələşdirilmiş və ənənəvi subtitrləri necə çevirmək olar|/guides/hanconv.html]]; bunun simvolları dəyişdirməkdən daha çox şey olmasının səbəbi — [[Sadələşdirilmiş və ənənəvi simvol dəyişdirmə deyil|/guides/simplified-traditional-chinese.html]]; ənənəvi dildən sadələşdirilmiş dilə qayıtmaq da [[Sadələşdirilmiş–ənənəvi çevrilmə|/hanconv.html]] bölməsində yerləşir."
    ]
   }
  ]
 },
 "srt-to-ass": {
  "seo": {
   "title": "SRT-dən ASS-yə çevirici – Subtitrləri onlayn çevirin – AI-SRTSub",
   "desc": "SRT subtitrlərini 1920×1080 kətan və təmiz defolt üslub ilə ASS-yə (Advanced SubStation Alpha) çevirin, istənilən pleerə yüklənməyə hazırdır. Brauzerinizdə işləyir.",
   "h1": "SRT-dən ASS-yə",
   "intro": "SRT subtitrlərini ASS-yə çevirin: faylı buraxın, ASS seçin, yükləyin. Sizin üçün 1920×1080 kətan və təmiz defolt üslub yaradılır.",
   "ctaText": "SRT → ASS çevir"
  },
  "body": [
   {
    "h2": "ASS-yə ehtiyacınız olduqda",
    "ps": [
     "Yan-yana yüklənmiş subtitrin **daha yaxşı yerləşdirmə və üslub nəzarətinə** ehtiyacı olduqda ASS istifadə edin: o, SRT-nin malik olmadığı anlayışları daşıyır — kətan ölçüsü, şrift üslubları, uyğunlaşdırma. mpv, PotPlayer, VLC və əksər pleerlər onu birbaşa dəstəkləyir."
    ]
   },
   {
    "h2": "Çıxışın nəyə bənzədiyi",
    "ps": [
     "Alət standart başlığı yenidən qurur: **1920×1080 kətan**, ağıllı sətrqırma (WrapStyle 0) və tək Defolt üslub — Arial 54, qara konturlu ağ mətn, aşağı mərkəzləşdirilmiş. Hər bir fraza bu üslubdan istifadə edir."
    ],
    "img": {
     "file": "convert-opt-ass",
     "alt": "ASS - Advanced SubStation seçilmiş çıxış formatının açılan menyusu",
     "cap": "Çıxış kimi ASS seçin və çevirdikdən sonra yükləyin"
    }
   },
   {
    "h2": "Üslublar qorunub saxlanırmı?",
    "ps": [
     "SRT-nin əvvəldən üslub anlayışı yoxdur. Və əgər mənbəyiniz artıq ASS-dirsə, çevirmək **defolt üslubu yenidən qurur və orijinalını saxlamır** — ASS-ni yenidən üslublandırmaq üçün xüsusi subtitr redaktorundan istifadə edin. Vaxt və mətn hər iki halda təsirlənmir."
    ]
   }
  ]
 },
 "srt-to-excel": {
  "seo": {
   "title": "Subtitrləri Excel-ə çevirin – Sətr-sətr yoxlayın – AI-SRTSub",
   "desc": "SRT subtitrlərini Excel-ə ixrac edin: dörd sütun üzrə hər fraza üçün bir sətr — indeks, başlanğıc, son və mətn. Vaxt mətn kimi saxlanılır, sətr sonları toxunulmaz qalır və redaktə edilmiş cədvəl yenidən subtitrlərə çevrilə bilər.",
   "h1": "Subtitrləri Excel-ə çevirin",
   "intro": "Mətn redaktorunda yüzlərlə frazanı yoxlamaq yorucudur. Excel-də hər bir fraza bir sətrdir, ona görə də filtrləmə, şərh yazma və tap-və-əvəz etmə funksiyalarının hamısı əlçatan olur — və düzəlişlər SRT-nizə geri qayıdır.",
   "ctaText": "Excel-ə ixrac et"
  },
  "body": [
   {
    "h2": "Ehtiyac",
    "ps": [
     "Yoxlama, kütləvi söz dəyişiklikləri və ya işi bir neçə nəfər arasında bölüşdürmək — bunların hamısı cədvəldə düz mətndən qat-qat sürətli gedir. SRT özü düz mətndir, lakin onun fraza strukturu (indeks, vaxt, dialoq) dörd cədvəl sütununa səliqəli şəkildə uyğun gəlir."
    ]
   },
   {
    "h2": "Bunu harada et olar",
    "ps": [
     "[[Subtitr ⇄ cədvəl çevrilməsi|/table.html]] açın, \"cədvələ\" keçin, SRT-ni sürükləyin və önizləmə dörd sütun üzrə hər fraza üçün bir sətr ilə dolur — indeks, başlanğıc, son, mətn. \"Excel (.xlsx) yüklə\" düyməsini basın və o sizindir. VTT də eyni şəkildə dəstəklənir.",
     "Redaktəni bitirdikdə: rejimi \"subtitrə\" olaraq dəyişdirin, cədvəli geri qoyun və yenidən SRT əldə edirsiniz. Qayda başlanğıc, son və mətn üçün üç sütundur (English Start / End / Text də işləyir), istənilən ardıcıllıqda."
    ],
    "img": {
     "file": "table-prev",
     "alt": "Cədvəl önizləməsi: statistika çubuğu ilə dörd sütun üzrə sətr kimi hər SRT frazası",
     "cap": "Dörd sütun kimi düzülmüş, eyni şəkildə geri çevrilə bilən SRT"
    }
   },
   {
    "h2": "Ümumi tələlər",
    "ps": [
     "**Əvvəlcə pozulmuş kodlaşdırmanı düzəldin**: bu səhifə yalnız UTF-8 oxuyur. Sual işarələri və ya qutular ekranı [[Mojibake təmiri|/repair.html]] səhifəsinə səfər deməkdir.",
     "**CSV və ya xlsx**: fayl Excel-ə gedərkən .xlsx seçin ki, vaxt sütunu yenidən formatlana bilməsin; CSV daha daşınabiləndir, lakin Excel onu başqa şey kimi oxuya bilər — belə olduqda vaxt sütununu \"Mətn\" olaraq təyin edin.",
     "**ASS işləmir**: ASS üslub direktivləri daşıyır, ona görə də onu cədvələ qoymazdan əvvəl SRT-yə çevirin."
    ]
   },
   {
    "h2": "Əlaqədar",
    "ps": [
     "Tam iki tərəfli bələdçi — [[Subtitrləri Excel / CSV formatına necə çevirmək olar|/guides/table.html]]; sonradan tərcümə etmək — [[Subtitr tərcüməsi|/translate.html]]; çatdırılmadan əvvəl son keçid — [[Subtitr QC|/qc.html]]."
    ]
   }
  ]
 },
 "srt-to-vtt": {
  "seo": {
   "title": "SRT-dən VTT-yə çevirici – Subtitrləri onlayn çevirin – AI-SRTSub",
   "desc": "HTML5 trek elementləri üçün SRT subtitrlərini VTT-yə (WebVTT) çevirin. Zaman vergülləri avtomatik olaraq nöqtəyə çevrilir. Brauzerinizdə işləyir, heç nə yüklənmir.",
   "h1": "SRT-dən VTT-yə",
   "intro": "SRT subtitrlərini VTT-yə çevirin: faylı buraxın, VTT seçin, yükləyin. Zaman damgaları veb formatı üçün yenidən yazılır, hamısı brauzerinizdə.",
   "ctaText": "SRT → VTT çevir"
  },
  "body": [
   {
    "h2": "VTT-yə ehtiyacınız olduqda",
    "ps": [
     "Veb pleerlər (HTML5 `<track>` elementi), YouTube subtitr yükləmə və əksər brauzer əsaslı pleerlər yalnız SRT-ni deyil, **VTT-ni (WebVTT)** qəbul edir. Əgər hər şeyiniz SRT-dirsə, bir çevrilmə onu işlək edir."
    ]
   },
   {
    "h2": "İki formatın nə ilə fərqləndiyi",
    "ps": [
     "Məzmun demək olar ki, eynidir; üç şey fərqli yazılır: **WEBVTT başlıq xətti** (VTT-də tələb olunur); zaman damgalarındakı **millisaniyə ayırıcısı** — SRT vergüldən istifadə edir (00:@00:01,000), VTT isə nöqtədən istifadə edir (00:00:01.000); və VTT SRT-nin icazə vermədiyi NOTE və STYLE bloklarına icazə verir."
    ],
    "img": {
     "file": "convert-result",
     "alt": "WEBVTT başlığını və nöqtə zaman damgalarını göstərən çevrilmə nəticəsi",
     "cap": "Çevrilmiş VTT: WEBVTT birinci sətirdə, nöqtə zaman damgaları"
    }
   },
   {
    "h2": "Necə çevirmək olar",
    "ps": [
     "[[Çeviricini|/convert.html]] açın, SRT-ni atın, çıxış kimi **VTT - WebVTT** seçin, sonra çevirin və yükləyin. Fraza ardıcıllığı, vaxt dəyərləri və çoxsətirli mətn olduğu kimi saxlanılır — yalnız sintaksis dəyişir. Digər tərəfə gedirsiniz? [[VTT-dən SRT-yə|/guides/vtt-to-srt.html]] baxın."
    ]
   }
  ]
 },
 "subtitle-format-comparison": {
  "seo": {
   "title": "SRT vs VTT vs ASS vs SBV vs LRC – Hansı Subtitr Formatı – AI-SRTSub",
   "desc": "Beş ümumi subtitr formatının imkanlarının müqayisəsi: mətn üslubu, yerləşdirmə, vaxt dəqiqliyi, hər birinin haraya aid olduğu və onların arasında necə çevrilmə olunacağı.",
   "h1": "Subtitr formatı seçimi: SRT / VTT / ASS / SBV / LRC",
   "intro": "Beş formatda saxlanılan eyni subtitr beş fərqli ustaya xidmət edir. Bu bələdçi hər bir formatın nə edə biləcəyini və onların arasında necə hərəkət etməyi müqayisə edir.",
   "ctaText": "Subtitr çeviricisini açın"
  },
  "body": [
   {
    "h2": "Bir cümlədə format seçin",
    "ps": [
     "Pleerə yan-yana yükləmə, maksimum uyğunluq → **SRT**; veb pleerlər (HTML5 trek) və ya YouTube yükləmə → **VTT**; şriftlər, rənglər, yerləşdirmə, effektlər → **ASS**; YouTube-dan yüklənmiş → **SBV** (dəstəyi genişləndirmək üçün SRT-yə çevirin); mahnı sözləri, sətr-sətr oxuma → **LRC**."
    ],
    "img": {
     "file": "convert-opt",
     "alt": "Çıxış formatının açılan menyusu: altı hədəf format",
     "cap": "Çeviricidəki altı ixrac hədəfi bu bələdçidəki hər formatı əhatə edir"
    }
   },
   {
    "h2": "İmkanların müqayisəsi",
    "ps": [
     "**SRT**: düz mətn + vaxt, üslub və ya yerləşdirmə yoxdur, uyğunluq çempionu. **VTT**: mətn + vaxt, brauzerlər tərəfindən yerli olaraq dəstəklənir, yerləşdirmə və əsas üslub daşıya bilər, millisaniyələrdən əvvəl nöqtə. **ASS**: mətn + vaxt + tam üslub (şriftlər, rənglər, konturlar, yerləşdirmə, effektlər), sentisaniyələrə qədər vaxt. **SBV**: YouTube-un minimal subtitr formatı, başlanğıc və son eyni sətirdə. **LRC**: mahnı sözləri formatı, yalnız başlanğıc vaxtları, son vaxtlar yoxdur, üslub yoxdur."
    ]
   },
   {
    "h2": "Formatlar arasındakı yollar",
    "ps": [
     "Bunların hər hansı biri [[çeviricidə|/convert.html]] hər iki istiqamətdə çevrilir: oxumaq srt, vtt, ass (ssa daxil olmaqla), sbv, lrc, txt dəstəkləyir; ixrac etmək srt, vtt, ass, sbv, lrc, txt dəstəkləyir. Ümumi marşrutların hərəsinin öz bələdçisi var: [[SRT-dən VTT-yə|/guides/srt-to-vtt.html]], [[VTT-dən SRT-yə|/guides/vtt-to-srt.html]], [[SRT-dən ASS-yə|/guides/srt-to-ass.html]], [[ASS-dən SRT-yə|/guides/ass-to-srt.html]], [[SBV-dən SRT-yə|/guides/sbv-to-srt.html]], [[LRC-dən SRT-yə|/guides/lrc-to-srt.html]]."
    ]
   },
   {
    "h2": "Çevirmələrin itirdiyi şeylər",
    "ps": [
     "SRT-yə çevirmək həmişə üslub və yerləşdirməni silir (SRT onları saxlaya bilməz). Bu alətlə ASS-yə çevirmək **defolt üslubu yenidən qurur və orijinalını saxlamır**. LRC-dən SRT-yə son vaxtların doldurulmasını tələb edir (hər sətr sonrakı gələnə qədər davam edir; sonuncusu 3 saniyə alır). Vaxt dəyərləri və mətn hər istiqamətdə eyni qalır."
    ]
   }
  ]
 },
 "subtitle-garbled-characters": {
  "seo": {
   "title": "Subtitr Mojibake haradan gəlir – Onu tapın, düzəldin – AI-SRTSub",
   "desc": "Mojibake zədələnmiş fayl deyil, səhv oxuma deməkdir. Əvəzedici simvollar, vurğulu hərflər divarları və qaranlıq simvollar seriyası hərəsi bir səbəbə işarə edir — hansıların bərpa olunduğunu və hansıların heç vaxt bərpa olunmadığını öyrənin.",
   "h1": "Subtitr mojibake haradan gəlir",
   "intro": "UTF-8 və GBK kimi oxunan eyni baytlar tamamilə fərqli simvollar dəsti kimi çıxır. Zibil mətnin necə görünməsi hansı addımın səhv getdiyinin birbaşa sübutudur.",
   "ctaText": "Mojibake təmiri alətini açın"
  },
  "body": [
   {
    "h2": "Fayl yaxşıdır — sadəcə səhv oxunub",
    "ps": [
     "Subtitr faylının saxladığı şey baytlardır. Baytları simvollara çevirmək onların hansı kodlaşdırmada yazıldığını bilməyi tələb edir — bunu səhv etsəniz mojibake alırsınız. Fayldan bir bayt belə əskik deyil; onu düzgün kodlaşdırma ilə yenidən oxuyun və simvollar geri qayıdır.",
     "Bu, işi ikiyə bölür: **hansı kodlaşdırma ilə başladığını anlamaq** və **pleerinizin aşkar edə biləcəyi kodlaşdırma kimi yadda saxlamaq**. Birincisi sınaq dekodlaşdırmasından və xal toplamaqdan gəlir, ikincisi isə surətini yadda saxlamaqdan. Onlar müxtəlif problemləri həll edirlər."
    ]
   },
   {
    "h2": "Beş görünüş, beş səbəb",
    "ps": [
     "Mojibake təsadüfi deyil — onun necə görünməsi səbəbini büruzə verir:"
    ],
    "img": {
     "file": "repair-diag",
     "alt": "Hər bir mojibake izi növünü sadalayan diaqnoz kartı",
     "cap": "Diaqnoz mojibake-ni ümumiləşdirmək əvəzinə səbəbə görə qruplaşdırır"
    }
   },
   {
    "h2": "Əvəzedici simvolun nə üçün təmir edilə bilməməsi",
    "ps": [
     "Əvəzedici simvol sərhəd xəttidir. `�` o deməkdir ki, baytlar artıq **əvvəlki addımda** (adətən faylı oxuyan və onu yenidən yadda saxlayan hansısa proqram tərəfindən) atılmışdı və nəyin atıldığı barədə heç nə qeydə alınmamışdı. Həmin məqamda geriyə doğru mühakimə yürütmək üçün heç nə yoxdur — heç kim onu təmir edə bilməz.",
     "Ona görə də təmir səhifəsi iki halı fərqli idarə edir. Faylı yükləyin və orijinal baytlar toxunulmaz qalır, bu da hər bir kodlaşdırmanı sınamağa imkan verir; əgər yapışdırılmış mətndə artıq əvəzedici simvol varsa, o, açıq şəkildə deyir: \"təmir edilə bilməz, lütfən orijinal faylı yükləyin\".",
     "Əks hal da var: məzmun mükəmməl oxunur, lakin pleeriniz hələ də zibil göstərir. Fayl günahkar deyil — **pleer səhv kodlaşdırma seçib**. Mətni redaktə etmək kömək etməyəcək; BOM və ya GBK ilə UTF-8 kimi surətini yadda saxlayın və ona verin."
    ],
    "img": {
     "file": "repair-up",
     "alt": "Yükləmə sahəsi: iki giriş nöqtəsi kimi sürüklə-və-burax və yapışdır",
     "cap": "Bacarırsınızsa faylı yükləyin — baytların toxunulmaz olması təmir ediləcək bir şey deməkdir"
    }
   },
   {
    "h2": "Təmir edərkən nəyi müqayisə edir",
    "ps": [
     "Alət hər mümkün kodlaşdırmanı sınayır, sonra hər nəticəni qiymətləndirir: onun nə qədərinin ümumi simvollardan ibarət olduğunu, vurğu sətirlərinin, simvol sətirlərinin olub- olmadığını, CJK qaçışlarının qaranlıq simvollar divarı olub-olmadığını. Ən yaxşı xal toplayan nəticə siyahının başına gedir.",
     "**Heç bir xal aydın şəkildə yaxşı deyilsə, heç nə tövsiyə olunmur** — sizə təkcə dildən oxşayan bir şeylə başdan eləməkdənsə, \"bu olduğu kimi yaxşı oxunur\" demək daha yaxşıdır. İki dəfə zədələnmiş mətn (bir dəfə səhv saxlanılıb, sonra bir dəfə səhv təmir edilib) ən yaxşı namizədlər üzərində bir əlavə arxa-həll dövrəsi alır."
    ],
    "img": {
     "file": "repair-fix",
     "alt": "Xalına görə sıralanmış namizəd siyahısı, hər biri kodlaşdırma cütü ilə etiketlənmişdir",
     "cap": "Xallarına görə sıralanmış namizədlər — aydın qalib yoxdur, tövsiyə yoxdur"
    }
   },
   {
    "h2": "Doğru kodlaşdırmanı yadda saxlamaq işi bitirir",
    "ps": [
     "Təmir edilmiş mətn hələ də pleerinizin tanıdığı kodlaşdırma kimi yadda saxlanılmalıdır. Windows-dakı pleerlər adətən kodlaşdırmanı aşkar etmək üçün BOM-a güvənirlər, ona görə də **BOM ilə UTF-8** ən az çətinlik yaradandır; köhnə aparatlar və bəzi regional pleerlər GBK istifadə etmək istəyir. Siz UTF-8, UTF-8 (BOM ilə), GBK, Big5, Shift_JIS və ya EUC-KR seçə bilərsiniz və nəsə uyğun gəlmədikdə sizə başqa birini seçmək tövsiyə olunacaq (GBK Koreya dilini saxlaya bilməz)."
    ],
    "img": {
     "file": "repair-out",
     "alt": "Nəticə sahəsi: fərqli kodlaşdırma kimi yadda saxla açılan menyusu və yükləmə düyməsi",
     "cap": "Pleerin tanıdığı bir şey kimi yadda saxlayın və mojibake həqiqətən həll olunur"
    }
   },
   {
    "h2": "Əlaqədar alətlər və bələdçilər",
    "ps": [
     "Tam bələdçi — [[Mojibake subtitrlərini necə tərviş etmək olar|/guides/repair.html]]; SRT faylının əslində nə saxladığı — [[SRT faylının içində nə var|/guides/srt-file-format.html]]; kodlaşdırma yaxşıdır, lakin məzmun çirklidir (su nişanları, reklamlar, eşitmə qüsuru olanlar üçün teqlər) — [[Subtitr təmizlənməsi|/clean.html]]."
    ]
   }
  ]
 },
 "subtitle-glossary": {
  "seo": {
   "title": "Termin cədvəlləri: bir mövsüm, bir lüğət – Nə vaxt qurulmalı – AI-SRTSub",
   "desc": "Termin cədvəli eyni sözün ardıcıl olaraq tərcümə edilməsini düzəldir: nə vaxt qurulmalı, onu bir mövsüm ərzində necə təkrar istifadə etməli, çin dilində bütün söz uyğunluğunun nə üçün heç nə etmədiyi və ona nəyin verilməməli olduğu.",
   "h1": "Termin cədvəlləri: mövsümü ardıcıl saxlamaq",
   "intro": "Bir ad birinci epizodda A, yeddinci epizodda B olduqda, izləyicilər onların iki personaj olduğunu düşünürlər. Termin cədvəli məhz bunun qarşısını alır — o, əşyaların necə adlandırıldığını düzəldir.",
   "ctaText": "Toplu termin əvəzetməsini açın"
  },
  "body": [
   {
    "h2": "Termin cədvəli uyğunsuzluğu düzəldir",
    "ps": [
     "Subtitrlərdə söz problemi iki cür olur: \"bu söz səhv tərcümə olunub\" və \"eyni söz bir yerdən başqa yerə fərqli tərcümə olunub\". Birincisi lüğət problemidir; ikincisi isə termin cədvəlinin nə üçün lazım olduğudur.",
     "İkincisi həm daha yaygındır, həm də tərifi çətindir: `Thor` birinci epizodda \"Tor\", yeddinci epizodda \"Donar\" olur və hər epizod özlüyündə yaxşı görünür, lakin serial bütövlükdə izləyicilərə yeni bir personajın peyda olduğunu düşünməyə vadar edir. Termin cədvəli \"bu istehsal ona Tor deyir\" ifadəsini bütün subtitr faylına birdəfəyə tətbiq olunan icra edilən qaydaya çevirir."
    ]
   },
   {
    "h2": "Nə vaxt onu qurmağa dəyər",
    "ps": [
     "Hər subtitr faylının termin cədvəlinə ehtiyacı yoxdur. Buna haqq qazandıran hallar adətən bunlardır:"
    ],
    "img": {
     "file": "glossary-rules",
     "alt": "Termin cədvəlində kateqoriyalara görə qruplaşdırılmış əvəzetmə qaydaları",
     "cap": "Qaydaları qruplaşdırmaq və redaktə edərkən müvəqqəti olaraq birini söndürmək üçün # şərhlərindən istifadə edin"
    }
   },
   {
    "h2": "Bir mövsüm ərzində bir cədvəl saxlamaq",
    "ps": [
     "Termin cədvəli **artımla** saxlanılır: birinci epizodda adları razılaşdırın, sonra yeni termin görünəndə qayda əlavə edin və mövsümün sonuna qədər cədvəl tamamlanır. Eyni serialın növbəti mövsümü üçün ordan başlayın.",
     "Qaydaları tələb olunduğundan bir qədər geniş yazın — \"Tor\" qərarına gəldikdən sonra \"Donar -> Tor\" da əlavə edin ki, başqasının subtitrləri də eyni keçiddə uyğunlaşdırılsın.",
     "Həmişə sonradan **dəyişiklik siyahısını** oxuyun: o, hər frazanın, hər sətrin adını çəkir və nəyin nə olduğunu göstərir. Dəyişikliyin düzgün olduğunu və həddini aşmadığını təsdiq edə biləcəyiniz yeganə yerdir və bəyənmədiyiniz istənilən giriş bir kliklə geri qaytarıla bilər."
    ],
    "img": {
     "file": "glossary-diff",
     "alt": "Nəticə sahəsində fərdi dəyişikliklərin siyahısı",
     "cap": "Hər bir dəyişiklik siyahıya alınır; istəmədiyiniz birini geri qaytarmaq üçün üzərinə klikləyin"
    }
   },
   {
    "h2": "Termin cədvəlinə nəyin verilməməsi",
    "ps": [
     "Termin cədvəli **sözləri** dəyişdirir. Bu üç şey onun işindən kənardadır və olmalıdır:",
     "**Qrammatika və cümlə strukturu** — sözü cümləyə çevirə bilməzsiniz; cümlə səviyyəsində işlər [[Subtitr tərcüməsi|/translate.html]] və ya insana həvalə olunur.",
     "**Məzmunun təmizlənməsi** — su nişanları, reklamlar və SDH frazaları kimi bütün sətrləri silmək [[Subtitr təmizlənməsi|/clean.html]] səhifəsinə aiddir; termin cədvəli qaydaları əvəz edir, sətrləri silmir.",
     "**Zaman damgaları** — termin cədvəli heç vaxt vaxta toxunmur. Qlobal sürüşmə və ya tezlik problemi üçün [[Zaman damgasının tənzimlənməsi|/shift.html]] səhifəsinə keçin."
    ]
   },
   {
    "h2": "Səhv etmək asan olan bir neçə şey",
    "ps": [
     "**Bütöv söz uyğunluğu seçilmiş halda Çin dili hələ də alt sətirləri əvəz edir — bu normaldır.** Çin və yapon dilləri sözləri boşluqlarla ayırmır, ona görə də alət söz sərhədlərini təyin edə bilmir və bütöv söz uyğunluğunun orada heç bir təsiri yoxdur; `art` `start`-ə toxunmayacaq, qoruma yalnız ingilis dili üçün işləyir.",
     "**Ardıcılıqlıq nəticəni dəyişdirir.** Qaydalar yuxarıdan aşağıya doğru işləyir və bir qayda ilə yaradılan mətn onun aşağısındakı qaydalar tərəfindən yenidən skan edilir. A-nı B ilə, sonra B-ni C ilə əvəz edin və sonda C əldə edirsiniz.",
     "**Yalnız tərcüməni dəyişdirmək üçün əhatə dairəsini təyin edin.** İkidilli faylda \"yalnız ikinci sətir\" seçin; yalnız bir sətri olan girişlər hər hansı tək sətr ayarında toxunulmaz qalır — alət hansı tərəfin orijinal olduğunu təxmin etmir.",
     "**Termin cədvəli yadda saxlanılmır.** Səhifəni hər dəfə açanda o, boş olur, ona görə də öz mətn faylınızı saxlayın və ötürün."
    ]
   },
   {
    "h2": "Əlaqədar alətlər və bələdçilər",
    "ps": [
     "Tam bələdçi üçün [[Subtitrlərdə terminləri necə toplu əvəz etmək olar|/guides/glossary.html]] baxın; əgər məzmun çirklidirsə, əvvəlcə [[Subtitr təmizlənməsi|/clean.html]] işlədin; adlar müəyyənləşdirildikdən sonra başqa dillərə ehtiyacınız varsa [[Subtitr tərcüməsi|/translate.html]] səhifəsinə keçin; və nəticəni [[Subtitr QC|/qc.html]] vasitəsilə yoxlayın."
    ]
   }
  ]
 },
 "subtitle-quality-check": {
  "seo": {
   "title": "Çatdırılmadan əvvəl subtitr QC yoxlama siyahısı – AI-SRTSub",
   "desc": "Subtitr çatdırılma yoxlama siyahısı: üst-üstə düşmələr, oxuma sürəti, sətr eni və durğu işarələri çox vaxt uğursuz olur. 17 QC qaydalarını işlədin — problemlərin yarısı bir kliklə düzəldilir.",
   "h1": "Çatdırılmadan əvvəl nəyi yoxlamalı",
   "intro": "Tamamlanmış subtitrlər çatdırılmağa hazır deyil: izləyicilərin ilk baxışdan gördükləri problemlər yüz dəfə baxdıqdan sonra görə bilmədiyiniz problemlərdir. Bu yoxlama siyahısı həmin son keçidi əhatə edir.",
   "ctaText": "Subtitr QC yoxlaması işlədin"
  },
  "body": [
   {
    "h2": "Problemləri niyə özünüz görə bilmirsiniz",
    "ps": [
     "Subtitr düzəldən hər kəs məzmunu çox yaxşı bilir — hər sətrin bundan sonra nə dediyini bilirsiniz, ona görə də heç vaxt hər şey çox sürətli görünmür; tərtibatı yüzlərlə dəfə görmüsünüz və gözləriniz qüsurları özbaşına ötürür. Belə ki, çatdırılmadan əvvəlki yoxlama \"başdan yenidən izləməyə\" güvənə bilməz — o, **rəqəmlərə qarşı ölçülməlidir**: oxuma sürəti, sətr eni, müddət, üst-üstə düşmələr. Qoy rəqəmlər qərar versin."
    ]
   },
   {
    "h2": "Ən çox yayılmış altı uğursuzluq",
    "ps": [
     "Çatdırılmanı batırma tezliyinə görə sıralanıb:"
    ]
   },
   {
    "h2": "Necə yoxlamalı",
    "ps": [
     "[[Subtitr QC|/qc.html]] açın və subtitrlərinizi atın; dili avtomatik aşkarlamaya təyin edin (27 dil, hərəsinin öz qayda səviyyələri var). Hesabat tapıntıları üç səviyyədə sadalayır — **xətalar / xəbərdarlıqlar / ipuçları** — hər biri giriş nömrəsi və ölçülmüş dəyərlə. Xətalar həll edilməlidir (pozulmuş mətn, vaxt formatı, əvvəldən bitmə, pozulmuş nömrələnmə); xəbərdarlıqlar haldan asılıdır (üst-üstə düşmələr, oxuma sürəti, sətr eni, müddət); ipuçları cilalanmadır (sətrqırma mövqeyi, boşluqlar, durğu işarələri)."
    ],
    "img": {
     "file": "qc-report",
     "alt": "QC hesabatı: üç səviyyəli problem siyahısı, giriş nömrəsi və ölçülmüş-və-hədd müqayisəsi olan hər bir tapıntı",
     "cap": "Hər bir tapıntı üçün giriş nömrəsini və ölçülmüş dəyəri verən üç səviyyəli hesabat"
    }
   },
   {
    "h2": "Bir kliklə nəyi düzəltmək olar",
    "ps": [
     "Nömrələnmə, boş girişlər, yenidən sətrqırma, boşluqlar və durğu işarələri — **vaxta toxunmayan** hər şey avtomatik olaraq düzəldilə bilər; **vaxtı dəyişən** düzəlişlər (başlanğıc və sonun dəyişdirilməsi, üst-üstə düşmələrin sürüşdürülməsi, müddətlərin qısaldılması və ya uzadılması) defolt olaraq işarələnməyib və yalnız təsirini təsdiq etdikdən sonra işarələnməlidir. **Limitdən yuxarı oxuma sürətinin avtomatik düzəldilməsi yoxdur** — maşın hansı sözün kəsiləcəyini bilə bilməz, ona görə də tərcüməni özünüz qısaldın və ya vaxtı bir qədər yumşaldın; [[Oxunmayacaq qədər sürətli subtitrlər|/guides/subtitle-too-fast.html]] baxın. Düzəltdikdən sonra yeni yoxlama avtomatik olaraq işləyir və hesabat yalnız həqiqətən düzəldilmiş şeyləri sayır."
    ]
   },
   {
    "h2": "Eyni zamanda",
    "ps": [
     "Hesabat səhifəsi birbaşa düz mətn `.qc.txt` hesabatı yükləyə bilər — onu çatdırılmaya əlavə edin ki, digər tərəf nəyi yoxladığınızı bir baxışda görsün. Təzə tərcümə edilmiş subtitrlər üçün çatdırılmadan əvvəl QC işlədin; ümumi zaman damgası sürüşməsi başqa cür problemdir — yoxladıqdan sonra oxuma sürəti hələ də uğursuz olarsa, [[Sinxronizasiyadan çıxaraq sürüşən subtitrlər|/guides/subtitles-out-of-sync.html]] baxın."
    ]
   }
  ]
 },
 "subtitle-speed-converter": {
  "seo": {
   "title": "Video sürəti dəyişdikdən sonra subtitrləri sinxronlaşdırın – AI-SRTSub",
   "desc": "Video sürətləndirilib və ya yavaşıdılıb və subtitrlər artıq uyğun gəlmir: miqyaslama addımında sürət faktorunu daxil edin və bütün xronologiya video ilə birlikdə uzanır.",
   "h1": "Video sürəti dəyişdirildikdən sonra subtitrləri tənzimləyin",
   "intro": "Video ümumilikdə daha sürətli və ya daha yavaş oldu, subtitrlər orijinal templərində qaldı — müəyyən nöqtədən sonrakı hər şey səhvdir. Faktoru daxil edin və bütün xronologiya video ilə miqyaslanır.",
   "ctaText": "Vaxt redaktorunu açın"
  },
  "body": [
   {
    "h2": "Sürüşmə əvəzinə tezlikdən nə vaxt istifadə etməli",
    "ps": [
     "Video **bütövlükdə** sürətləndirilib və ya yavaşıdılıb (məsələn, redaktə proqramında 0.9x və ya 1.25x) və hər bir fraza öz orijinal ritmini qoruyub: başlanğıc uyğun gəlir, nə qədər uzağa getsəniz, bir o qədər pisləşir — sabit nisbətlə. Bu tezlik problemidir. Əgər bütün fayl böyümədən sadəcə sabit miqdarla sürüşdürülübsə, sürüşmə kifayətdir — [[bütün subtitr faylını daha tezə və ya daha gecə hərəkət etdirmək|/guides/shift-subtitle-timing.html]] baxın."
    ]
   },
   {
    "h2": "Hansı nömrəni daxil etməli",
    "ps": [
     "Subtitrlər videonu izləməlidir, ona görə də **videonun həqiqətən dəyişdiyi faktoru** daxil edin: 1.25x sürətləndirmə o deməkdir ki, çatmaq üçün fraza vaxtları 1.25 ilə vurulur; 0.9x yavaşıdırma 0.9 ilə vurur. Vaxt redaktorunda **Tezliyə görə miqyasla** addımı əlavə edin və faktoru dəyər qutusuna daxil edin."
    ],
    "img": {
     "file": "shift-step-rate",
     "alt": "Dəyər qutusunda faktor olan miqyaslama addımı",
     "cap": "1-dən yuxarı faktor xronologiyanı uzadır (sürətləndirilmiş video üçün), 1-dən aşağı olan isə sıxır (yavaşıdılmış video üçün)."
    }
   },
   {
    "h2": "Bunun sürüşmədən fərqi nədir",
    "ps": [
     "Sürüşmə hər frazanın vaxtını eyni sabit miqdarla **hərəkət etdirir** və fraza müddətlərini qoruyur, tezlik isə həm başlanğıc, həm də sonu **vurur**, ona görə də müddətlər də miqyaslanır. Sürət dəyişikliyindən sonra müddətlərin özləri dəyişib — tezliyin tələb olunmasının səbəbi məhz budur."
    ]
   },
   {
    "h2": "Faktor əmin deyilsinizsə",
    "ps": [
     "Faktor itirildikdə, **iki lövbərə** qayıdın: birinci və sonuncu frazanın real video vaxtlarını daxil edin və aralarındakı hər şey proporsional olaraq yayılır — düzgün faktor üçün həll etməyə bərabərdir. [[subtitrlərin getdikcə daha çox sinxronizasiyadan çıxması|/guides/subtitles-out-of-sync.html]] baxın."
    ]
   }
  ]
 },
 "subtitle-too-fast": {
  "seo": {
   "title": "Oxunmayacaq qədər sürətli subtitrlər – Oxuma sürətini düzəldin – AI-SRTSub",
   "desc": "Oxunmayacaq qədər sürətli subtitrlər — qısa müddət yoxsa uzun mətn? QC 20 simvol/saniyədən yuxarı girişləri qeyd edir (CJK üçün 9 hanzi); müddətlər avtomatik düzəldilir, mətn redaktə edilməlidir.",
   "h1": "Oxunmayacaq qədər sürətli subtitrlər",
   "intro": "İzləyicilər fasilə verməyə davam edirlər? Günahkar oxuma sürətidir. Onu necə ölçmək olar, necə düzəltmək olar və mətni vaxtla müqayisədə nə vaxt redaktə etmək olar — hamısı bir bələdçidə.",
   "ctaText": "Oxuma sürətini yoxla"
  },
  "body": [
   {
    "h2": "Oxuma sürəti nədir?",
    "ps": [
     "Oxuma sürəti sadəcə olaraq **izləyicilərin ekranda qaldığı müddət ərzində subtitri oxuyub qurtara bilmədiyidir**. Hesablama sadədir: mətn eni ekrandakı saniyələrə bölünür. Ümumi sənaye hədləri: Çin, yapon və koreya dilləri üçün saniyədə 9 tam enli simvol (18 yarım enli vahid), digər dillər üçün isə saniyədə 20 yarım enli vahid. 1 saniyə davam edən 20-hanzi sətri saniyədə 40 en vahidi edir — həddən iki dəfə çoxdur və izləyicilər onu heç vaxt bitirməyəcəklər."
    ]
   },
   {
    "h2": "Əvvəlcə hansı növ sürətli olduğunu ayırd edin",
    "ps": [
     "\"Oxunmayacaq qədər sürətli\" əslində iki fərqli problemdir: **çox qısa müddət** — fraza bir-iki yüz millisaniyədən sonra kəsilir, adətən vaxt xətası və ya redaktə qalıdır; **çox uzun mətn** — müddət yaxşıdır, lakin sətirdə 30 hanzi sıxışdırılıb və heç bir sürət limiti onu xilas etməyəcək. Düzəlişlər əksidir, ona görə də əvvəlcə hansına sahib olduğunuzu anlayın."
    ],
    "img": {
     "file": "qc-rules",
     "alt": "CJK üçün 18 və digər dillər üçün 20 olaraq defolt təyin edilmiş QC səhifəsində oxuma sürəti limiti ayarı",
     "cap": "QC oxuma sürəti hədləri: CJK üçün saniyədə 18 en vahidi, digər dillər üçün 20"
    }
   },
   {
    "h2": "Necə yoxlamalı",
    "ps": [
     "[[Subtitr QC|/qc.html]] açın və subtitrlərinizi atın. Hesabatda \"çox qısa müddət\" ölçülmüş millisaniyələri göstərən xəbərdarlıqdır (hədd: 833 millisaniyə); \"oxunmayan sürət\" isə saniyədə ölçülmüş en vahidlərini göstərən öz tapıntısıdır. İkidilli subtitrlər üçün yalnız hədəf dildə yazılmış sətir sayılır — iki dil bir-birinə əlavə olunmur."
    ]
   },
   {
    "h2": "Onu necə düzəltməli",
    "ps": [
     "**Çox qısa müddət**: bir kliklə düzəldilə bilər — fraza növbəti frazanın başlanğıcını keçmədən avtomatik olaraq 833 millisaniyəyə uzadılır (düzəliş yeni üst-üstə düşmələr yaratmamalıdır). **Çox uzun mətn** — avtomatik düzəliş yoxdur — maşın hansı sözün kəsiləcəyini bilə bilməz. İki yol, sizin seçiminiz: tərcüməni qısaltmaq (onu redaktə etmək üçün tərcümə alətindəki xəcə basın) və ya bu frazanın müddətini uzatmaq (yalnız növbəti frazadan əvvəl boşluq varsa; ümumi xronologiya problemi üçün [[Zaman damgası sürüşməsi|/shift.html]] baxın). Oxuma sürətinin yenidən həddə qayıtdığını təsdiqləmək üçün sonradan QC yenidən işlədin."
    ]
   },
   {
    "h2": "Həddini aşmayın",
    "ps": [
     "Sürət limitinə cavab vermək rahat baxış demək deyil: hər frazanı saniyədə 9 simvola qədər sıxışdırmaq bütün filmi yorucu edir. Barmaq qaydası olaraq, vaxtın çox hissəsində həddin 70% ətrafında qalın və dialoqla zəngin parçaların arabir bir qədər keçməsinə icazə verin. Çox tez yanıb-sönən subtitr blokları özlüyündə problemdir — çatdırılmadan əvvəl bütün ölçülər dəstini işlədin, [[Çatdırılmadan əvvəl nəyi yoxlamalı|/guides/subtitle-quality-check.html]] baxın."
    ]
   }
  ]
 },
 "subtitles-out-of-sync": {
  "seo": {
   "title": "Subtitrlər getdikcə sinxronizasiyadan çıxaraq sürüşür? Onu düzəldin – AI-SRTSub",
   "desc": "Başlanğıc yaxşıdır, filmin ortasına qədər bir neçə saniyə geri qalır, sonda istifadə olunmur: bu, irəliləyən sürüşm dispozisiyasıdır, adətən kadr tezliyi uyğunsuzluğu və ya video sürətinin dəyişməsidir. İki lövbər onu düzəldir.",
   "h1": "Subtitrlər getdikcə daha çox sinxronizasiyadan çıxaraq sürüşür: Səbəblər və düzəlişlər",
   "intro": "Başlanğıcda yaxşıdır, yarım saatdan sonra bir neçə saniyə gecikir, sonda ümidsizdir. Bu cür sürüşən uyğunsuzluğun məlum səbəbləri və məlum düzəlişi var.",
   "ctaText": "Bu faylı düzəldin"
  },
  "body": [
   {
    "h2": "Əvvəlcə iki növ uyğunsuzluğu ayırd edin",
    "ps": [
     "Uyğunsuzluq iki cür olur: **vahid sürüşmə** hər bir frazanın başlanğıcdan sona qədər təxminən eyni miqdarda gecikməsi (və ya erkən olması) deməkdir; **irəliləyən sürüşmə** başlanğıcın düzgün olması və xətanın sonuna doğru böyüməsi, ehtimal ki, dəqiqələrə çatması deməkdir. Bu məqalə ikinci növ haqqındadır — birinci növ üçün [[bütün subtitr faylını daha tezə və ya daha gecə hərəkət etdirmək|/guides/shift-subtitle-timing.html]] baxın."
    ]
   },
   {
    "h2": "Niyə getdikcə daha çox sürüşür",
    "ps": [
     "Sürüşmə **iki fərqli saatdan** gəlir: ən çox yayılmış üç səbəb bunlardır: (1) kadr tezliyi uyğunsuzluğu — 24fps filmin subtitrləri 25fps mənbədə dəqiqədə bir saniyədən çox itirir; (2) subtitrlər orijinal tempini qoruyarkən videonun sürətləndirilməsi və ya yavaşıdılması; (3) xronologiyası əvvəldən qeyri-bərabər olan VFR (dəyişkən kadr tezliyi) yazısı. Onların ümumi cəhəti: xəta oxutma vaxtı ilə təxminən xətti olaraq böyüyür."
    ]
   },
   {
    "h2": "İki lövbərlə düzəldin",
    "ps": [
     "Xəta xətti olaraq böyüdüyü üçün hər bir ucluqda düzgün vaxtı kilidləmək və ortanı proporsional olaraq yenidən yaymaq hər şeyi yerinə qaytarır. Vaxt redaktorunda **iki lövbərli düzəliş** əlavə edin: iki \"cari\" sahə bu faylın orijinal vaxtları ilə avtomatik doldurulur; videoya baxırsınız və iki \"hədəf\" sahəsinə **birinci və sonuncu frazanın əslində nə vaxt göründüyünü** daxil edirsiniz."
    ],
    "img": {
     "file": "shift-step-two",
     "alt": "İki lövbərli düzəliş: cari vaxtlar avtomatik doldurulur, daxil ediləcək hədəf vaxtlar",
     "cap": "Lövbərləri iki ekstremdə — ən kiçik və ən böyük orijinal xətada götürün və aralarındakı hər şey proporsional olaraq yenidən yayılır."
    }
   },
   {
    "h2": "Nəticəni necə yoxlamaq olar",
    "ps": [
     "İşlətdikdən sonra nəticə paneli hər bir frazanın orijinal və yeni vaxtlarını **yan-yana** siyahıya alır. Üç yeri yoxlayın: birinci fraza, ortada biri və sonuncu — ən kiçik, orta və ən böyük orijinal xətanız olan üç mövqe. Hər üçü yerə düşərsə, bütün fayl düşür."
    ],
    "img": {
     "file": "shift-result",
     "alt": "Nəticə paneli: yükləmə düyməsi ilə yan-yana əvvəlki və sonrakı vaxtlar",
     "cap": "Orta frazaların yeni vaxtları iki ucluq arasında düşməlidir — nisbətin düzgün olduğuna işarədir."
    }
   },
   {
    "h2": "İki lövbərin kifayət etmədiyi vaxtlar",
    "ps": [
     "İki lövbərli düzəliş xətanın **xətti** olduğunu güman edir. Mənbə orta fayl kadr tezliyi sıçrayışı olan VFR ekran qeydisə, xətti dartılma ortanı düzəldə bilməz — üçüncü nöqtə olaraq açıq-aydın səhv orta frazanı götürün, faylı orada bölün və hər yarıda iki lövbərli düzəliş işlədin. Həmçinin, düzəltdikdən sonra heç bir yerli uyğunsuzluğun qalmadığını təsdiqləmək üçün orta hissəni normal sürətlə yenidən izləyin."
    ]
   }
  ]
 },
 "table": {
  "seo": {
   "title": "Subtitrdən Excel / CSV-yə Çevrilmə – Hər İki İstiqamət – AI-SRTSub",
   "desc": "İkiistiqamətli bələdçi: sətirbəsətir yoxlama üçün SRT/VTT faylını Excel və ya CSV-yə ixrac edin, sonra redaktə olunmuş cədvəli yenidən subtitr kimi idxal edin. Üç sütun tələb olunur, istənilən ardıcıllıqda; vaxt mətn olaraq saxlanılır.",
   "h1": "Subtitrləri Excel / CSV-yə necə çevirmək olar",
   "intro": "Cədvəldə yoxlama və tərcümə etmək daha asandır. Subtitrləri Excel və ya CSV-yə ixrac edin, sətirbəsətir redaktə edin, sonra yenidən çevirin — vaxt sütunları mətn olaraq qalır və dialoq içindəki sətir sonları qorunub saxlanılır.",
   "ctaText": "Cədvəl çeviricisini açın"
  },
  "body": [
   {
    "h2": "What this tool does :: Bu alət nə edir",
    "ps": [
     "Subtitrlər replika sətirləri, cədvəllər isə qeyd sətirləridir — cədvələ çevrildikdən sonra yoxlama, şərh yazma və toplu tərcümə artıq bildiyiniz alətlərlə edilə bilər. Hər iki istiqamət dəstəklənir:"
    ]
   },
   {
    "h2": "Yükləyin və istiqamət seçin",
    "ps": [
     "Faylı sürükləyib atın və ya gözdən keçirin. Hər istiqamət üçün fərqli növ fayl tələb olunur: **cədvələ** subtitr fayllarını (SRT / VTT), **subtitrə** isə cədvəl fayllarını (CSV / Excel, həm .xlsx, həm də .xls) qəbul edir. Yanlış rejim seçsəniz, səhifə həmin rejimin hansı fayl növünü tələb etdiyini sizə bildirəcək.",
     "⚠️ Bu səhifə yalnız UTF-8 oxuyur. Əgər subtitriniz ekranda su işarələri və ya qutular şəklində açılırsa, əvvəlcə onu [[Mojibake təmiri|/repair.html]] vasitəsilə işlədin — burada zədələnmiş kodlaşdırma yalnız əvəzedici simvollar kimi oxunur."
    ],
    "img": {
     "file": "table-up",
     "alt": "Cədvəl çeviricisi yükləmə sahəsi: atma zonas və iki rejim keçiricisi",
     "cap": "Hər rejim fərqli fayl tələb edir: subtitrlər daxil olur, cədvəl çıxır — və əksinə"
    }
   },
   {
    "h2": "Subtitrlərin cədvələ ixrac edilməsi",
    "ps": [
     "\"Cədvələ\" seçin, subtitr faylını atın və önizləmədə hər bir replika sadalanır: indeks, başlanğıc, son, mətn. Statistika panelində replikaların sayı və ümumi müddət göstərilir. Sonra \"Excel-i yüklə (.xlsx)\" və ya \"CSV-ni yüklə\" düyməsini sıxın.",
     "İkisi arasındakı fərq: .xlsx əsl cədvəl faylıdır və Excel vaxt sütununuzu xəbəriniz olmadan yenidən formatlaşdıra bilməz; CSV daha daşınabiləndir, lakin Excel açarkən vaxt sütununu başqa cür şərh edə bilər. Belə hallarda, vaxt sütununu seçin və formatını \"Mətn\" olaraq təyin edin — və ya sadəcə .xlsx istifadə edin."
    ],
    "img": {
     "file": "table-prev",
     "alt": "Cədvəl önizləməsi: indeks, başlanğıc, son və mətn sütunları statistika paneli ilə birlikdə",
     "cap": "Hər bir replika önizlənilir; statistika panelində replika sayı və ümumi müddət göstərilir"
    }
   },
   {
    "h2": "Cədvəlin yenidən subtitrlərə idxal edilməsi",
    "ps": [
     "\"Subtitrə\" seçin, cədvəli atın və sütun qaydası budur: **başlanğıc, son və mətn** üçün üç sütun tələb olunur (İngilis dilindəki Start / End / Text başlıqları da işləyir), **istənilən ardıcıllıqda**. `00:00:01,500` və `00:00:01.500` hər ikisi qəbul olunur; təhlil edilə bilməyən sətirlər bütün faylı ləğv etmək əvəzinə sadəcə ötürülür.",
     "Nəticə önizləmədə replika-replika siyahıya alınır; təsdiqləyin, sonra SRT və ya VTT yükləyin. Əgər həmin üç sütun çatışmırsa, başlıqları yoxlamağı tələb edən mesaj alacaqsınız — adətən bu, ixrac zamanı fərqli adlandırmanın istifadə olunması və ya başlıq sətrinin birinci sətir olmaması səbəbindən baş verir."
    ],
    "img": {
     "file": "table-back",
     "alt": "Subtitr nəticə sahəsi: idxal edilmiş subtitrlər replika-replika siyahıya alınıb",
     "cap": "Tanınmayan sütunlar barədə məlumat verilir, heç vaxt səssizcə nəzərdən qaçırılmır"
    }
   },
   {
    "h2": "FAQ :: Tez-tez verilən suallar",
    "ps": [
     "**Excel vaxt sütununu səhv göstərir?** .xlsx istifadə edin və bu heç vaxt baş verməyəcək. Əgər mütləq CSV istifadə etməlisinizsə: açmazdan əvvəl vaxt sütununu seçin və xana formatını \"Mətn\" olaraq təyin edin.",
     "**Sütun başlıqları ingilis dilində olmalıdırmı?** Xeyr. Start / End / Text bu səhifənin dəstəklədiyi istənilən dildə tanınır və hərf registri önəmli deyil.",
     "**İdxal etdikdən sonra sətir sonlarım hələ də qalırmı?** Bəli. Dialoq daxilindəki sətir sonları orijinal sətrəbölməyə qədər qorunub saxlanılır.",
     "**ASS dəstəklənirmi?** Bu səhifə yalnız SRT və VTT idarə edir. ASS üslub direktivləri daşıyır — əvvəlcə onu [[Format çeviricisi|/convert.html]] ilə SRT-yə çevirin.",
     "**Eyni vaxtda neçə fayl?** Bir. Onlarla və ya yüzlərlə faylı emal etmək üçün [[Toplu çevirmə|/batch.html]] istifadə edin (bu yalnız formatları çevirir və cədvəldən keçmir)."
    ]
   },
   {
    "h2": "Privacy :: Məxfilik",
    "ps": [
     "Çevrilmə tamamilə brauzerinizdə işləyir. Heç bir subtitr məzmunu heç vaxt serverə göndərilmir."
    ]
   },
   {
    "h2": "Əlaqəli alətlər və təlimatlar",
    "ps": [
     "Tək istədiyiniz subtitrdən Excel-ə keçid addımıdırsa, [[Subtitrləri Excel-ə çevir|/guides/srt-to-excel.html]] baxın; daha sonra başqa dilə tərcümə etmək üçün [[Subtitr tərcüməsi|/translate.html]]; eyni vaxtda onlarla fayl üçün — [[Toplu çevirmə|/batch.html]]."
    ]
   }
  ]
 },
 "translate": {
  "seo": {
   "title": "Süni intellekt subtitr tərcüməsi – yükləmədən ikidilli ixraca qədər – AI-SRTSub",
   "desc": "Subtitrləri süni intellektlə tərcümə edin: SRT/VTT/ASS yükləyin, 100 dildən birini seçin, lüğət vasitəsilə adları uyğunlaşdırın, ikidilli subtitrlər ixrac edin. Başlamaq pulsuzdur, şəxsi API açarı dəstəklənir.",
   "h1": "Süni intellekt subtitr tərcüməsindən necə istifadə etməli",
   "intro": "Bir subtitr faylı üçün yükləmədən tutmuş tərcümə və ixraca qədər tam iş axını: ekran nədir, nəyi klikləməli və hər addımda nə əldə edirsiniz.",
   "ctaText": "Tərcümə alətini açın"
  },
  "body": [
   {
    "h2": "What this tool does :: Bu alət nə edir",
    "ps": [
     "Subtitrləri bir dildən digərinə tərcümə edir və istifadəyə hazır subtitr faylı ixrac edir. Tipik ehtiyaclar:"
    ]
   },
   {
    "h2": "Upload subtitles :: Subtitrləri yükləyin",
    "ps": [
     "\"Subtitr faylı seç\" düyməsini klikləyin və ya subtitr mətnini birbaşa sol daxiletmə qutusuna yapışdırın. Altı format dəstəklənir: SRT, VTT, ASS, SSA, SBV və TXT. Əlinizdə fayl yoxdur? İş başında görmək üçün \"Nümunə yüklə\" düyməsini klikləyin. Təhlil edildikdən sonra orta sütun hər bir giriş üçün indeks, vaxt şkalası və mənbə mətni olan subtitr cədvəlini göstərir."
    ],
    "img": {
     "file": "translate-upload",
     "alt": "Tərcümə alətinin idxal sahəsi: subtitr faylı seçin, yapışdırma qutusu və nümunə yükləmə düyməsi",
     "cap": "Sol sütun \"Subtitrləri idxal et\": fayl seçin, mətn yapışdırın və ya nümunə yükləyin"
    }
   },
   {
    "h2": "Dil və üslub seçin",
    "ps": [
     "\"Mənbə dili\" avtomatik aşkarlamada qala bilər; \"hədəf dil\" 100 dildən seçilir. Beş tərcümə üslubu mövcuddur: Balanslaşdırılmış (defolt), Danışıq, Rəsmi peşəkar, Dublyaj tərzi və Xüsusi. \"Dublyaj tərzi\" kino və televiziya dialoqlarına uyğundur; \"Rəsmi peşəkar\" sənədli filmlərə və kurslara uyğundur."
    ],
    "img": {
     "file": "translate-lang",
     "alt": "Dil və tərcümə üslubu ayarları: mənbə dili, hədəf dil açılan menyuları və beş üslub",
     "cap": "\"Dil\" və \"tərcümə üslubu\": mənbə avtomatik aşkar edilə bilər, 75 hədəf seçimi"
    }
   },
   {
    "h2": "Lüğət: adları ardıcıl saxlayın",
    "ps": [
     "Süni intellekt toplu şəkildə tərcümə edir, buna görə də eyni ad müxtəlif toplularda iki fərqli şəkildə çıxa bilər. Lüğətə \"mənbə → kimi tərcümə edilməlidir\" qaydalarını yazın; hər topludan əvvəl alət onu skan edir və hər bir uyğunluğa əməl edir. Hər sətirə bir qayda; ox işarələri `->`, `=>`, `→` və ya Tab ola bilər; tək mənbə termini onun tərcümə olunmamış saxlanılması deməkdir; bir neçə imla `|` vasitəsilə bir təqdimatı paylaşa bilər. Süni intellektin videodan xüsusi isimləri əvvəlcə cədvələ çıxarması, sonra redaktə edib tərcümə etməsi üçün \"✨ AI çıxarışı\" düyməsini klikləyin."
    ],
    "img": {
     "file": "translate-glossary",
     "alt": "Lüğət və xüsusi isimlər sahəsi: AI çıxarışı və yadda saxla düymələri olan lüğət daxiletmə qutusu",
     "cap": "\"Vahid adlar\" lüğəti: xüsusi isimləri AI ilə çıxar, yadda saxlandıqdan sonra yeni videolar üçün avtomatik yüklənir"
    }
   },
   {
    "h2": "Tərcümə prosesi",
    "ps": [
     "Yuxarı paneldə \"▶ Tərcüməyə başla\" düyməsini klikləyin. Orta statistika zolağı girişləri, tərcümə olunanları, dolğu sözləri təmizlənənləri və girişlərarası cümlə qruplarını real vaxt rejimində göstərir; irəliləyiş çubuğu təxmini qalan vaxtı və istifadə olunan tokenləri göstərir. Tərcümə edərkən mətni redaktə etmək üçün cədvəldəki istənilən tərcümə xanasına klikləyin — dəyişikliklər maşınınızda saxlanılır və səhifə yenilənməsinə dözür. Əməliyyat yarıda qalarkən səhifəni bağlasanız, qaldığınız yerdən davam etmək təklif olunacaq. Bir cümlə bir neçə girişi əhatə etdikdə, qrup birləşdirilir, tərcümə edilir və müddətə görə doldurulur."
    ],
    "img": {
     "file": "translate-workspace",
     "alt": "Tərcümə iş sahəsi: statistika zolağı, irəliləyiş çubuğu və redaktə oluna bilən subtitr cədvəli",
     "cap": "Orta iş sahəsi: statistika zolağı + irəliləyiş çubuğu + kliklə-redaktə et subtitr cədvəli"
    }
   },
   {
    "h2": "Export :: İxrac",
    "ps": [
     "Sağ sütunda əvvəlcə məzmun formasını seçin: yalnız tərcümə (birdilli), orijinalı üstə olmaqla ikidilli və ya tərcüməsi üstə olmaqla ikidilli; sonra fayl formatı: SRT, WebVTT, SBV, ASS və ya TXT. ASS seçmək iki düzeni əlavə edir: bölünmüş yuxarı/aşağı ekranlar və yığılmış aşağı sətirlər. Məzmun və format sərbəst şəkildə 14 ixrac üslubunda birləşir. İkidilli sətir eni ayrıca təyin edilir. Faylı yadda saxlamaq üçün \"Subtitrləri yüklə\" düyməsini, dərhal yapışdırmaq üçün isə \"Mübadilə buferinə kopyala\" düyməsini klikləyin."
    ],
    "img": {
     "file": "translate-export",
     "alt": "İxrac paneli: üç məzmun forması, beş fayl formatı və ikidilli sətir eni ayarları",
     "cap": "Sağ sütun ixracı: əvvəlcə məzmun formasını, sonra fayl formatını seçin"
    }
   },
   {
    "h2": "Cost and privacy :: Xərc və məxfilik",
    "ps": [
     "Defolt model heç bir qeydiyyat və açar tələb etmir — o, hər sorğu kvotaları ilə qutudan çıxan kimi işləyir: hər IP üçün gündəlik limit və sayt miqyasında gündəlik icazə. Böyük toplular üçün \"Tərcümə mühərriki\" bölməsində öz API açarınızı daxil edin. Məxfilik, səhifədəki bildirişə görə: defolt model üçün subtitrlər bu saytın serveri vasitəsilə təminatçıya ötürülür; xüsusi API birbaşa daxil etdiyiniz təminatçı tərəfindən idarə olunur və açar brauzerinizdə qalır. Təhlil, sətir bükməsi və ikidilli düzən hamısı brauzerdə yerli olaraq işləyir."
    ]
   },
   {
    "h2": "FAQ :: Tez-tez verilən suallar",
    "ps": [
     "**Tərcüməyə başqa dillər qarışıb?** Alət dil meylini aşkar edir və avtomatik olaraq yenidən tərcümə edir; əgər bir neçə giriş hələ də səhv görünürsə, xanaya klikləyin və onları əllə düzəldin.",
     "**Mahnı sözləri necə olsun?** \"Məzmun filtrləməsi\" mahnı sözləri üçün üç seçim təklif edir: mahnı sözlərini tərcümə etmək, orijinalı saxlamaq və ya silmək.",
     "**Adların uyğunsuz tərcümələri?** Uyğun gəlməyən imlaları lüğətə əlavə edin və yenidən tərcümə edin; lüğət qlobal \"xüsusi isimlərin idarə edilməsi\" parametrindən üstünlüyə malikdir.",
     "**İngilis dili üstdə, çincə aşağıda olsun istəyirsiniz?** İxrac edərkən \"İkidilli · orijinal üstdə\" seçin; çincə üstdə və ingilis dili aşağıda üçün \"İkidilli · tərcümə üstdə\" seçin."
    ]
   },
   {
    "h2": "Əlaqəli alətlər və təlimatlar",
    "ps": [
     "Səhv format? [[Format çevrilməsi|/convert.html]] ilə başlayın; vaxt şkalası səhvdir? [[Vaxt şkalasının tənzimlənməsi|/shift.html]] istifadə edin; təhvil verməzdən əvvəl onu [[subtitr keyfiyyət yoxlaması|/guides/subtitle-quality-check.html]] vasitəsilə yoxlayın."
    ]
   }
  ]
 },
 "translate-english-to-chinese": {
  "seo": {
   "title": "İngilis dili subtitrlərini çin dilinə tərcümə edin – AI-SRTSub",
   "desc": "İngilis dili subtitrlərini çin dilinə tərcümə edin: SRT/VTT/ASS yükləyin, Sadələşdirilmiş və ya Ənənəvi seçin və yalnız çin dilində və ya ikidilli subtitrlər ixrac edin. – AI-SRTSub",
   "h1": "İngilis dili subtitrlərini çin dilinə tərcümə edin",
   "intro": "İngilis dili SRT daxil, çin (və ya ingilis-çin ikidilli) subtitrlər çıxış: yükləyin, hədəf dili seçin, ixrac edin — hamısı bir səhifədə.",
   "ctaText": "İngilis dili subtitrlərini tərcümə edin"
  },
  "body": [
   {
    "h2": "When you need it :: Nə vaxt lazımdır",
    "ps": [
     "Endirdiyiniz subtitr yalnız ingilis dilindədir və siz çatmırsınız; və ya ingilis dilini oxumayan ailə üzvləri üçün çin dilində subtitrlər istəyirsiniz. Ehtiyacınız olan şey üç üsuldan birində gəlir — **yalnız çincə subtitrlər**, yaxud **çincə üstdə, ingilis dili aşağıda** və ya **ingilis dili üstdə, çincə aşağıda** olan ikidilli subtitrlər — və bu alət hər üçünü verir."
    ]
   },
   {
    "h2": "How to do it :: Bunu necə etməli",
    "ps": [
     "[[Süni intellekt Subtitr Tərcüməçisi|/translate.html]] açın və ingilis dili subtitr faylınızı atın (SRT, VTT, ASS, SSA, SBV və TXT hamısı tanınır, və ya sadəcə mətni yapışdırın). \"Mənbə dili\"ni avtomatik aşkarlamada saxlayın, \"Hədəf dili\" Sadələşdirilmiş və ya Ənənəvi Çin dilinə təyin edin və \"▶ Tərcüməyə başla\" düyməsini klikləyin. Bitdikdə, sağdakı ixrac panelində məzmun formasını seçin: yalnız tərcümə (birdilli), ikidilli · orijinal üstdə (ingilis dili yuxarıda, çincə aşağıda) və ya ikidilli · tərcümə üstdə (çincə yuxarıda, ingilis dili aşağıda), sonra fayl formatı seçib yükləyin."
    ],
    "img": {
     "file": "translate-export",
     "alt": "İxrac paneli: yalnız tərcümə, orijinalı üstdə olan ikidilli və tərcüməsi üstdə olan ikidilli",
     "cap": "İxrac zamanı məzmun formasını seçin: yalnız çincə, və ya ingilis-üst / çin-üst ikidilli"
    }
   },
   {
    "h2": "Two common problems :: İki ümumi problem",
    "ps": [
     "**Adlar qeyri-ardıcıl tərcümə olunub?** Süni intellekt toplu şəkildə tərcümə edir, ona görə də eyni ad iki cür çıxa bilər. Hər yerdə eyniliyi qorumaq üçün lüğətə “mənbə → tərcümə olunmuş ad” cütlərini daxil edin (məs. `Watson → Huasheng`).",
     "**Subtitrlər şəkildən geri qalır?** Əvvəlcə tərcümə edin, sonra vaxtı düzəldin: iş masasının yuxarı hissəsindəki vaxt şkalası alətlər panelində qlobal ofset və miqyas nəzarəti var — [[Subtitrlər sonda sinxronizasiyadan çıxır|/guides/subtitles-out-of-sync.html]] baxın."
    ]
   }
  ]
 },
 "videosub": {
  "seo": {
   "title": "Quraşdırılmış video subtitrlərinin çıxarılması – MKV / MP4 trekləri – AI-SRTSub",
   "desc": "MKV, WebM, MP4 və MOV daxilindəki subtitr treklərini birbaşa oxuyun və SRT / VTT / ASS / TXT ixrac edin. Yükləmə yoxdur, kodlaşdırma yoxdur, hər bir dil treki siyahıdadır, şəkil subtitrləri qeyd olunub.",
   "h1": "Videoya quraşdırılmış subtitrləri necə çıxarmaq olar",
   "intro": "MKV / MP4 daxilinə möhürlənmiş subtitr trekini birbaşa SRT olaraq oxuyun — video heç vaxt yüklənmir, hər şey brauzerdə oxunur.",
   "ctaText": "Video subtitr çıxarılmasını açın"
  },
  "body": [
   {
    "h2": "What this tool does :: Bu alət nə edir",
    "ps": [
     "Subtitrlər təkbaşına olmaq əvəzinə video faylının içində möhürlənə bilər. Onları redaktə etmək, tərcümə etmək və ya cütləşdirmək üçün əvvəlcə onları çıxarmalısınız — bu səhifənin etdiyi tək şey də məhz budur."
    ]
   },
   {
    "h2": "1 Add the video :: 1 Videonu əlavə edin",
    "ps": [
     "Birinci sütuna video faylı sürükləyin və ya birini seçmək üçün klikləyin. Yalnız **MKV / WebM** və **MP4 / MOV** tanınır; digər konteynerlər heç bir trek verməyəcək.",
     "Fayl heç vaxt kompüterinizdən çıxmur — yükləmə addımı yoxdur. Alət ofset üzrə kiçik hissələrlə oxuyur, buna görə də çox giqabaytlıq film yaddaşı doldurmur, lakin ilk oxunuş trek məlumatlarını bir dəfə skan etməlidir."
    ],
    "img": {
     "file": "videosub-up",
     "alt": "Quraşdırılmış subtitrin çıxarılması səhifəsinin video əlavəetmə sahəsi",
     "cap": "MKV / WebM və MP4 / MOV dəstəklənir və fayl heç vaxt maşınınızdan çıxmır"
    }
   },
   {
    "h2": "2 Quraşdırılmış subtitr trekləri",
    "ps": [
     "Oxunuş başa çatdıqdan sonra ikinci sütun fayldakı subtitr treklərini **hər sətirdə bir ədəd olmaqla**, adətən dil və trek adı ilə (məsələn, \"Çin dili\", \"İngilis dili\", \"Məcburi\") siyahıya alır. Həmin treki çıxarmaq üçün sətrə klikləyin.",
     "Faylda yalnız bir subtitr treki olduqda, çıxarılma avtomatik olaraq başlayır — klikləməyə ehtiyac yoxdur.",
     "**Şəkil subtitrləri çıxarıla bilməz**: Blu-ray PGS və DVD subtitrləri götürüləcək mətn olmadan axına yazılmış şəkillərdir və səhifə bunu açıq şəkildə bildirir; bunlar OCR tələb edir."
    ],
    "img": {
     "file": "videosub-track",
     "alt": "Quraşdırılmış subtitr treklərinin siyahısı, hər sətirdə bir ədəd",
     "cap": "Hər sətirə bir trek; yalnız biri olduqda çıxarılma avtomatik başlayır"
    }
   },
   {
    "h2": "3 The result :: 3 Nəticə",
    "ps": [
     "Sağdakı \"3 Nəticə\" çıxarılan subtitr mətnini, yuxarısında isə ixrac formatını göstərir: **SRT / VTT / ASS / TXT**. \"Yüklə\" və ya \"Kopyala\" düyməsini klikləyin.",
     "Mənbə treki ASS olduqda, onun öz üslub başlığı və təsvir ölçüsü dəyişməz olaraq qayıdır — ASS olaraq ixrac etmək onları qoruyur, SRT olaraq ixrac etmək isə yalnız mətni daşıyır."
    ],
    "img": {
     "file": "videosub-out",
     "alt": "SRT / VTT / ASS / TXT format seçimi ilə nəticə sahəsi",
     "cap": "Dörd ixrac formatı; ASS mənbəyi öz üslub başlığını və təsvir ölçüsünü saxlayır"
    }
   },
   {
    "h2": "Toxunulmaz qalanlar",
    "ps": [
     "Video faylının özünə ümumiyyətlə toxunulmur — yalnız oxunur, yazılma yoxdur, kodlaşdırma yoxdur, remuks (remuxing) yoxdur.",
     "Subtitr məzmunu olduğu kimi çıxır: kodlaşdırma təkrarı yoxdur, vaxt şkalası düzəlişi yoxdur. Əgər çıxarılan subtitrlər qarışıqdırsa, bu, mənbə trekdəki kodlaşdırma problemidir — onu [[Zədələnmiş mətnin təmiri|/repair.html]] ünvanına aparın."
    ]
   },
   {
    "h2": "Common questions :: Ümumi suallar",
    "ps": [
     "**Şəkil subtitrlərini (PGS / DVD) idarə etməyin həqiqətən də heç bir yolu yoxdurmu?** Bu səhifədə yoxdur — onlar mətn qatı olmayan şəkillərdir. Əvvəlcə OCR gəlməlidir və bu səhifə bunu etmir.",
     "**Çıxarılan subtitrlərin vaxtı səhvdir — niyə?** Bu səhifə vaxt şkalasını düzəltmir; nə çıxırsa, o da var idi. Qlobal ofset və ya sürət problemi üçün [[Vaxt şkalasının tənzimlənməsi|/shift.html]] istifadə edin.",
     "**Niyə heç nə baş verməzdən əvvəl bu qədər uzun çəkir?** Böyük bir fayl trek məlumatları üçün hissə-hissə skan edilməlidir və fayl nə qədər böyükdürsə, bir o qədər çox vaxt aparır; bu, yerli olaraq baş verir və əlaqənizlə heç bir əlaqəsi yoxdur.",
     "**Bu səhifəni xarici subtitr faylları üçün istifadə edə bilərəmmi?** Ehtiyac yoxdur — xarici .srt / .ass birbaşa [[Format çevrilməsi|/convert.html]] və ya başqa alətə gedir. Bu səhifə videonun içində möhürlənmiş subtitrlər üçündür."
    ]
   },
   {
    "h2": "Privacy :: Məxfilik",
    "ps": [
     "Video tamamilə brauzerdə oxunur: heç nə yüklənmir, heç nə kodlaşdırılmır, heç nə serverdən keçmir. Səhifəni bağlayın və oxunmuş məlumatlar buraxılır."
    ]
   },
   {
    "h2": "Əlaqəli alətlər və təlimatlar",
    "ps": [
     "Çıxardığınızı tərcümə etmək üçün [[Subtitr tərcüməsi|/translate.html]] bölməsinə keçin, onu ikidilli etmək üçün [[İkidilli subtitrlər yaratmağın iki yolu|/guides/make-bilingual-subtitles.html]] baxın; quraşdırılmış və xarici treklər arasındakı fərq və hansıların çıxarıla biləcəyi üçün [[Videodan subtitrləri necə çıxarmaq olar|/guides/extract-subtitles-from-video.html]] baxın."
    ]
   }
  ]
 },
 "vtt-to-srt": {
  "seo": {
   "title": "VTT-dən SRT-yə Çevirici – WebVTT Subtitrlərini Çevir – AI-SRTSub",
   "desc": "Yalnız SRT qəbul edən redaktorlar və pleyerlər üçün VTT (WebVTT) subtitrlərini SRT-yə çevirin. WEBVTT başlıq və NOTE blokları avtomatik olaraq təmizlənir. Brauzerinizdə işləyir.",
   "h1": "VTT to SRT :: VTT-dən SRT-yə",
   "intro": "VTT (WebVTT) subtitrlərini SRT-yə çevirin: faylı atın, SRT seçin, yükləyin. Başlıq və qeyd blokları təmizlənir və zaman damğaları vergül işarəsinə qayıdır.",
   "ctaText": "Convert VTT → SRT :: VTT → SRT çevir"
  },
  "body": [
   {
    "h2": "Nə vaxt SRT-yə ehtiyacınız olur",
    "ps": [
     "CapCut, Premiere, əksər masaüstü pleyerlər və köhnə subtitr alətləri yalnız **SRT** qəbul edir. Vebdən və ya YouTube-dan endirilən subtitrlər adətən VTT olaraq gəlir — birbaşa idxal etmək üçün onları SRT-yə çevirin."
    ]
   },
   {
    "h2": "VTT-dən nə təmizlənir",
    "ps": [
     "**WEBVTT başlıq sətri**, NOTE blokları, STYLE/REGION blokları və vaxt sətrindən sonrakı replika ayarları (align:start kimi) subtitr mətni deyil — onlar avtomatik olaraq silinir; nömrələmə bərpa olunur və millisaniyə ayırıcısı nöqtədən vergülə qayıdır."
    ],
    "img": {
     "file": "convert-upload-vtt",
     "alt": "Yükləmə sahəsi: VTT faylı yükləndi, VTT olaraq aşkar edildi",
     "cap": "WEBVTT başlığı olan fayl dərhal VTT kimi aşkar edilir"
    }
   },
   {
    "h2": "How to convert :: Necə çevirməli",
    "ps": [
     "[[Çeviricini|/convert.html]] açın, VTT-ni atın, çıxış olaraq **SRT - SubRip** seçin, sonra çevirin və yükləyin. Mətn və vaxt dəyərləri toxunulmaz qalır."
    ],
    "img": {
     "file": "convert-result-srt",
     "alt": "Çevrilmə nəticəsi: vergül zaman damğaları ilə SRT nömrələnməsi",
     "cap": "Çevrilmiş SRT: replika nömrələri + vergül zaman damğaları"
    }
   }
  ]
 }
};
