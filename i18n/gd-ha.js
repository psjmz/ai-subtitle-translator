/* i18n/gd-ha.js —— 43 篇指南页的ha译文（由 _mkgd.js 生成，勿手改）
 * 源：_gd/ha.json（Gemini 翻译，_gemgd.js 产出）
 * 结构：{ <slug>: { seo:{title,desc,h1,intro,ctaText}, body:[{h2,ps[],img}] } }
 * ⚠️ server.js 自己 require 它，不被任何 html 引用 —— 部署时必须显式加进传输列表。
 */
module.exports = {
 "ass-to-srt": {
  "seo": {
   "title": "Mai Juyawa na ASS zuwa SRT – Canza Sashin Taken ASS/SSA – AI-SRTSub",
   "desc": "Canza sassan taken ASS (da SSA) zuwa SRT mai sauƙi: ana fitar da rubutu da lokaci kamar yadda suke, alamomin salo suna zama a baya. Don software da ke karɓar SRT kaɗai. Yana aiki a cikin burauzarka.",
   "h1": "ASS zuwa SRT",
   "intro": "Juya sassan taken ASS (ko SSA) zuwa SRT: sauke fayil ɗin, zaɓi SRT, sannan ka sauke. Ana fitar da rubutu da lokaci kamar yadda suke; alamomin salo ba sa wucewa.",
   "ctaText": "Canza ASS → SRT"
  },
  "body": [
   {
    "h2": "Lokacin da kake buƙatar SRT baya",
    "ps": [
     "Na'urorin shirye-shirye, akwatunan talabijin, masu kunna talabijin, kayan aikin fassara — yawancin matakai na gaba suna karɓar **SRT** kaɗai. Kyawawan salo da matsayi a cikin ASS ba su da wata ma'ana a can, don haka SRT mai sauƙi shi ne mafi aminci."
    ]
   },
   {
    "h2": "Abin da ke faruwa da alamomin salo",
    "ps": [
     "Kowane layi na ASS layin Magana ne wanda rubutunsa ke ɗauke da alamomin gyarawa kamar `{\\fonts}` don launi, motsi, ko tasiri. Canzawa zuwa SRT **yana cire waɗannan alamomin tare da salo**, yana barin rubutu da lokaci kawai; `\\N` ƙarin layuka suna zama ainihin sabbin layuka. Har ila yau, ana iya karanta fayilolin SSA."
    ],
    "img": {
     "file": "convert-result-srt",
     "alt": "Sakamakon canji: Lambobin SRT da rubutun da aka fitar daga ASS",
     "cap": "SRT da aka fitar: lamba ɗaya ga kowane jeri, rubutu mai tsabta"
    }
   },
   {
    "h2": "Yadda ake yi canji",
    "ps": [
     "Buɗe [[converter|/convert.html]], sanya fayil ɗin ASS (.ssa yana aiki ma), zaɓi **SRT - SubRip** a matsayin fitarwa, sannan ka canza kuma ka sauke. Kana son tafiya ta ɗaya ɓangaren? Duba [[SRT zuwa ASS|/guides/srt-to-ass.html]]."
    ]
   }
  ]
 },
 "batch": {
  "seo": {
   "title": "Yadda Ake Canza Sassan Taken a Rukuni – Daruruwa zuwa Cikin ZIP Ɗaya – AI-SRTSub",
   "desc": "Jagora: sanya fayilolin SRT/VTT da yawa, canza su zuwa tsari ɗaya, sauke ZIP guda ɗaya. An sake lamba, an daidaita lokaci, an lura da fayilolin da ba a iya karanta su ba maimakon shiga cikin ma'ajiyar a ajiya.",
   "h1": "Yadda ake canza sassan taken a rukuni",
   "intro": "Yawancin lokaci duka kakar sassan taken dole ne su ƙare a cikin tsari ɗaya, kuma ɗora su ɗaya bayan ɗaya yana ɗaukar lokaci mai tsawo. Sanya su duka a nan, ku canza su tare sannan ku sauke ZIP guda ɗaya — fayilolin da ba za a iya karanta su ba ana nuna su, ba a haɗa su a asirce kamar suna aiki ba.",
   "ctaText": "Buɗe canjin rukuni"
  },
  "body": [
   {
    "h2": "Abin da wannan kayan aikin ke yi",
    "ps": [
     "Sassan taken na duka kakar ko akwatin tarawa yawancin lokaci suna buƙatar zama daidai kafin a iya yin wani abu da su. Ga abin da shafin rukunin ke yi:"
    ]
   },
   {
    "h2": "Ƙara fayiloli",
    "ps": [
     "Jawo fayilolin taken da yawa cikin akwatin da aka zana tare, ko danna kuma zaɓi da yawa a lokaci ɗaya. Jerin fayilolin yana nuna kowanne: fayilolin da aka karanta suna nuna adadin alamominsu, waɗanda ba a karanta su ba ana nuna su kawai a matsayin ba a san su ba. Sandar sama tana nuna jimlar adadin fayiloli, adadin alamomi da nawa ba a san su ba.",
     "⚠️ Wannan shafin yana karanta UTF-8 kawai. Duk wani abin da ke da matsalar ɓoye bayanai (allo cike da alamomin tambaya ko akwatuna) ya kamata ya fara zuwa [[Mojibake repair|/repair.html]]."
    ],
    "img": {
     "file": "batch-list",
     "alt": "Jerin fayiloli: suna da adadin alamomi ga kowane fayil, waɗanda ba a san su ba an nuna su da ja",
     "cap": "Kowane fayil da aka lissafa, kuma an nuna waɗanda ba a san su ba a wurin"
    }
   },
   {
    "h2": "Abin da za a canza komai zuwa gare shi",
    "ps": [
     "Zaɓi tsarin da ake nufi a ƙarƙashin \"Convert all to\" — SRT ko VTT. Ana sake ƙirƙirar kowane fayil a cikin jerin a cikin wannan tsarin: an sake lamba daga sama, an daidaita lokaci zuwa ga wanda ake nufi (SRT yana raba milisekan da kamshi, VTT da ɗigo).",
     "**Ana kiyaye asalin sunayen fayiloli kuma faɗaɗawar kawai ce ke canzawa**; sunaye masu maimaitawa suna samun lamba a ƙarshe domin babu abin da ya zarta wani."
    ],
    "img": {
     "file": "batch-up",
     "alt": "Mai zaɓar tsarin da ake nufi da yanayin jerin, tare da sandar ƙididdiga da ke nuna adadin fayil da alamomi",
     "cap": "Zaɓi tsarin da ake nufi kuma kowane fayil yana sake haihuwa; sunayen fayil suna canza faɗaɗawa kawai"
    }
   },
   {
    "h2": "Kunshin da saukewa",
    "ps": [
     "Danna \"Pack into one ZIP and download\" kuma ma'ajiyar tana ɗauke da kowane fayil da aka canza. **Fayilolin da ba su da alamomin da aka san su suna zaune a wajen ma'ajiyar** — suna tsayawa a cikin jerin, an nuna su, maimakon a haɗa su kamar sun yi nasara. Da zarar an tattara, kuna samun adadin nawa ne a ciki."
    ],
    "img": {
     "file": "batch-zip",
     "alt": "Yankin tattarawa: maɓallin sauke ZIP da sakon sakamakon tattarawa",
     "cap": "Fayilolin da ba a san su ba suna zaune a wajen ma'ajiyar kuma suna ci gaba da kasancewa a rubuce a cikin jerin"
    }
   },
   {
    "h2": "Me yasa ake nuna fayil a matsayin wanda ba a san shi ba",
    "ps": [
     "Ana nuna fayil lokacin da ba a iya karanta alamomi daga cikinsa. Dalilai uku na yau da kullun: ba takaitaccen bayani ba ne ko kaɗan (misali .txt na gefe), rufaffen bayani ba UTF-8 ba ne (don haka yana karanta kamar alamomin maye gurbin kawai), ko abubuwan da ke ciki sun zama gungu guda ɗaya ba tare da lokaci ba.",
     "Ana iya magance fayilolin da aka nuna ɗaya bayan ɗaya: matsalolin ɓoye bayanai suna zuwa [[Mojibake repair|/repair.html]], matsalolin tsari zuwa [[Format converter|/convert.html]] don canji na musamman kafin komawa cikin jerin."
    ]
   },
   {
    "h2": "Tambayoyin da aka fi yi",
    "ps": [
     "**Nawa fayiloli zan iya ƙarawa?** Babu wani ƙayyadadden iyaka; ya dogara da ƙwaƙwalwar burauzarka, kuma ɗaruruwan fayilolin SRT yawanci suna da kyau.",
     "**Shin yana canza tattaunawata?** A'a. Canjin rukuni yana canza tsarin akwati kawai — sake lamba da daidaita lokaci — ba kalmar tattaunawa ba.",
     "**Yaya idan ina buƙatar canza abubuwan da ke ciki?** Wannan shafin yana canza tsari ne kawai. Don canza lokaci a cikin yawa yi amfani da [[Timing adjustment|/shift.html]]; don canza kalmomi yi amfani da [[Term replacement|/glossary.html]]; duka biyun suna aiki fayil bayan fayil.",
     "**Shin ana goyon bayan ASS?** Wannan shafin yana canzawa tsakanin SRT da VTT kawai. ASS tana ɗauke da salo — yi amfani da [[Format converter|/convert.html]] akanta daban."
    ]
   },
   {
    "h2": "Sirri",
    "ps": [
     "Canjawa da tattarawa suna aiki gaba ɗaya a cikin burauzarka. Ba a tura abubuwan da ke cikin sassan taken zuwa uwar garken ba."
    ]
   },
   {
    "h2": "Kayan aiki da jagorori masu alaƙa",
    "ps": [
     "Abin da za a canza don duka kakar da kuma a cikin wane tsari — [[Batch editing a whole season of subtitles|/guides/batch-convert-srt.html]]; ƙarin tsari don fayil guda ɗaya — [[Format converter|/convert.html]]; bincike a cikin tebur — [[Subtitle ⇄ table|/table.html]]."
    ]
   }
  ]
 },
 "batch-convert-srt": {
  "seo": {
   "title": "Gyara Sassan Taken na Duka Kakar a Rukuni – Abin da Yake Aiki, Abin da Ba Ya Aiki – AI-SRTSub",
   "desc": "Yawancin lokaci kakar tana buƙatar canji guda a ko'ina: tsari ɗaya, sauye-sauyen lokaci, ƙamus. Ga abin da ke ƙarewa a lokaci ɗaya, abin da ba zai yiwu ba, da yadda ake sarrafa fayilolin da suka gaza karantawa.",
   "h1": "Gyara sassan taken na duka kakar a rukuni",
   "intro": "Lokacin da fayilolin taken da yawa ke buƙatar canji, yawanci abu ɗaya ne a kowane lokaci. Sanin waɗanne sassa ne za a iya yi a lokaci guda yana ceton lokaci mai yawa maimakon yin su ɗaya bayan ɗaya.",
   "ctaText": "Buɗe canjin rukuni"
  },
  "body": [
   {
    "h2": "Yawanci abu ɗaya ne a ko'ina",
    "ps": [
     "Lokacin da sassan taken suka lalace don duka kakar, kowane shirin ba da daɗewa ba yana da nasa matsalar — yawanci dalili guda ne ke shiga kowane shiri: gungun masu fitarwa guda ɗaya ne suka canza su duka (don haka tsari da alamomin ruwa sun yi daidai), duka an tsara su zuwa sigar bidiyo guda ɗaya (don haka alkiblar sauye-sauye da adadi sun yarda), ko kuma fassarar ta bambanta a duk faɗin kakar.",
     "Bincika sassa biyu da farko — ɗaya na farko, ɗaya na ƙarshe — kuma tabbatar cewa gaske ne **matsalar ita ce ɗaya** kafin a yi rukunin wani abu. Idan biyun ba su yarda ba, wannan ba abin da rukunin zai iya gyarawa ba ne."
    ]
   },
   {
    "h2": "Abin da za a iya yi a lokaci guda",
    "ps": [
     "**Haɗa tsarin** shine abu guda tilo da gaske ke ƙarewa a lokaci guda: jawo fayilolin SRT da VTT da yawa cikin [[Batch conversion|/batch.html]] tare, zaɓi tsarin da ake nufi kuma sauke ZIP guda ɗaya. Sake lamba da daidaita lokaci suna faruwa a wannan matakin, kuma ba kalmar tattaunawa ɗaya ba ce ke canzawa."
    ],
    "img": {
     "file": "batch-list",
     "alt": "Jerin fayilolin shafin rukuni: adadin alamomi ga kowane fayil, waɗanda ba a san su ba an nuna su da ja",
     "cap": "Tsarin da ya dace shine abu guda tilo da gaske ke ƙarewa a cikin wucewa ɗaya"
    }
   },
   {
    "h2": "Abin da dole a yi fayil bayan fayil",
    "ps": [
     "Waɗannan ba su da wurin shiga na rukuni kuma suna buƙatar wucewa ga kowane fayil — kodayake yawancin lokaci akwai mai kama da shi wanda **dole ne a yi sau ɗaya kawai sannan ya shafi dukan kakar**:"
    ]
   },
   {
    "h2": "Samun tsari daidai",
    "ps": [
     "Lokacin da abubuwa da yawa ke buƙatar yin, rashin tsari daidai yana nufin sake yin aiki. Tafi a cikin wannan tsari:",
     "**Gyara ɓoye bayanai** → **haɗa tsari** → **canza abubuwan da ke ciki** (alamomin ruwa, ƙamus, lokaci) → **QC a ƙarshe**. Canza tsari kafin gyara ɓoye bayanai kawai yana ba ku mojibake a cikin wani akwati daban; canza abubuwan da ke ciki kafin a haɗa tsarin yana nufin yin aiki tare da goyon bayan kayan aiki da ba su da tabbas."
    ],
    "img": {
     "file": "batch-zip",
     "alt": "Yankin tattarawa: maɓallin sauke ZIP da sakon sakamako",
     "cap": "Haɗa tsari da farko, canza abubuwan da ke ciki daga baya"
    }
   },
   {
    "h2": "Sarrafa fayilolin da ba a gane su ba",
    "ps": [
     "Fayilolin da aka nuna a matsayin waɗanda ba a san su ba a cikin canjin rukuni an bar su a wajen ZIP kuma suna tsayawa a cikin jerin. Dalilai uku na yau da kullun: ba fayil din taken ba ne (.txt na gefe), rufaffen bayani ba UTF-8 ba ne, ko abubuwan da ke ciki sun zama gungu guda ɗaya ba tare da lokaci ba.",
     "Matsalolin ɓoye bayanai suna zuwa [[Mojibake repair|/repair.html]] ɗaya bayan ɗaya; matsalolin tsari zuwa [[Format converter|/convert.html]] kafin a mayar da su cikin jerin. **Kada ku tilasta fayilolin da ba a san su ba cikin ma'ajiyar kawai don ƙara adadin** — gano wani shiri da ya ɓace a cikin mai kunna ku yana kashe fiye da minti daya da wannan ke adanawa."
    ]
   },
   {
    "h2": "Kayan aiki da jagorori masu alaƙa",
    "ps": [
     "Cikakken jagorar rukuni — [[How to batch convert subtitles|/guides/batch.html]]; daidaiton lokaci — [[How to adjust subtitle timing|/guides/shift.html]]; wucewa ta ƙarshe kafin isarwa — [[Subtitle QC|/qc.html]]."
    ]
   }
  ]
 },
 "bilingual": {
  "seo": {
   "title": "Yadda Ake Rabuwa ko Haɗa Sassan Taken Harsuna Biyu – AI-SRTSub",
   "desc": "Hanyoyi huɗu na cire sassan taken harsuna biyu: ajiye waƙoƙi ɗaya kawai, raba zuwa fayiloli biyu, ko haɗa zuwa shigarwa layuka biyu guda ɗaya. An gano nau'ikan biyu ta atomatik, a cikin burauzarka.",
   "h1": "Yadda Ake Cire Sassan Taken Harsuna Biyu",
   "intro": "Kuna son raba sassan taken harsuna biyu, haɗa su, ko ajiye waƙoƙi ɗaya kawai? Wannan jagorar tana bi ta duk hanyoyi huɗu: yadda gano ke aiki, wane yanayi za a zaɓa, da abin da kuke samu a fitarwa.",
   "ctaText": "Buɗe Mai Cire Sassan Taken Harsuna Biyu"
  },
  "body": [
   {
    "h2": "Abin da Wannan Kayan Aikin Ke Yi",
    "ps": [
     "Kuna da sassan taken harsuna biyu amma kuna son ɗaya daga cikin waƙoƙin kawai — ko kuma akasin haka, kuna son raba ko haɗa waƙoƙin biyu:"
    ]
   },
   {
    "h2": "Yadda Yake Gano Abubuwan Harsuna Biyu",
    "ps": [
     "Sassan taken harsuna biyu masu waƙoƙi biyu suna zuwa a cikin siffofi biyu na yau da kullun, kuma kayan aikin suna gane kowanne — **ba tare da ɓata lokaci wajen hasashen harshe ba**: **Siffa A (shigarwa ɗaya, layuka biyu)** tana raba waƙoƙi ta hanyar tsarin rubutu — kana, hangul, hanzi, Latin da sauran tsarin, goma gaba ɗaya; tsarin biyu daban-daban suna nufin harsuna biyu, kuma duk wanda ya fara bayyana yana ƙidaya a matsayin asali. Tsarin da aka keɓe guda ɗaya (dogon layin Sinanci da aka nannade a cikin biyu, alal misali) ana daukar shi a matsayin harshe ɗaya kuma ana kiyaye shi kamar yadda yake. **Siffa B (shigarwa biyu daban-daban tare da lokaci iri ɗaya)** tana raba waƙoƙi ta hanyar matsayi — shigarwa biyu a lokaci iri ɗaya suna kafa ma'aurata, na farko yana ƙidaya a matsayin asali, kuma haɗin da ke raba haruffan Latin, kamar Ingilishi-Faransanci ko Ingilishi-Jamusanci, an raba su daidai ma. Lokacin da ba a gano abubuwan harsuna biyu ba, mai zaɓar yanayi da maɓallin Fara ana sanya su launin toka tare da sanarwa mai bayyana, don haka ba ta taɓa tilasta rarrabuwa zuwa sakamako mara daidai ba."
    ]
   },
   {
    "h2": "Hanyoyi Huɗu",
    "ps": [
     "Zaɓi ɗaya daga cikin huɗu a cikin akwatin \"Wanne kake so?\": **Ajiye asali kawai** da **Ajiye fassara kawai** kowannensu yana samar da fayil ɗaya; **Raba zuwa biyu** yana samar da fayil na asali da fayil na fassara, tare da sunayen fayil da aka yi musu alama ta atomatik `.orig` / `.dst` don hana rubutawa a kai; **Haɗa zuwa shigarwa layuka biyu guda ɗaya** yana juya kowane ma'aurata zuwa shigarwa mai harsuna biyu — asali a kan layin ɗaya, fassara a kan wani — yayin da ma'auratan harshe ɗaya ake kiyaye su kamar yadda suke kuma babu layin na biyu da aka ƙirƙira. Lokacin da kuka canza yanayi ko tsarin fitarwa, abubuwan da ke akwai suna sake gudana ta atomatik — babu buƙatar danna Fara kuma."
    ],
    "img": {
     "file": "bilingual-modes",
     "alt": "Zaɓin yanayi a cikin mai cire harsuna biyu: ajiye asali, ajiye fassara, raba zuwa biyu, haɗa zuwa shigarwa layuka biyu guda ɗaya",
     "cap": "Hanyoyi huɗu: ajiye waƙoƙi ɗaya, raba zuwa biyu, ko haɗa zuwa shigarwa layuka biyu guda ɗaya"
    }
   },
   {
    "h2": "Shigarwa da Fitarwa",
    "ps": [
     "Yana karanta tsari bakwai — SRT, VTT, ASS, SSA, SBV, LRC, TXT (fadada fayil da farko, gano abubuwan ciki a matsayin madadin) — kuma yana fitar da huɗu: SRT, VTT, ASS, TXT. Duk wani haɗin shigarwa da fitarwa yana aiki, don haka canjin tsari ya kan faru a kan hanya. An mayar da ƙarin layukan ASS `\\N` zuwa ainihin sabbin layuka, kuma an cire alamomin tasiri a kan fitarwar tsari iri-iri."
    ]
   },
   {
    "h2": "Sakamako da Fitarwa",
    "ps": [
     "Ana nuna sakamako cikakke a cikin akwatin rubutu na karanta-kawai, kowane fayil tare da adadin shigarwa da jimlar ƙidayar lokaci; maɓallin Sauke da Kwafi suna fitar da fayil ɗin kai tsaye. Yankin sakamako samfoti ne — babu gyaran rubutu ko lokaci a nan. Don yin canje-canje, fitar da farko, sannan ka yi amfani da kayan aikin da suka dace."
    ],
    "img": {
     "file": "bilingual-result",
     "alt": "Yankin sakamakon cirewa: samfoti na karanta-kawai, ƙidayar adadin shigarwa, da maɓallin sauke/kwafi",
     "cap": "Samfoti na cikakken rubutu + ƙidayar shigarwa da lokaci + sauke da kwafi"
    }
   },
   {
    "h2": "Tambayoyin da aka fi yi",
    "ps": [
     "**Shigarwa ɗaya tana da Ingilishi a layin ɗaya kuma Faransanci a wani — me yasa ba zai raba ba?** Siffa A tana raba waƙoƙi ta hanyar tsarin rubutu, don haka harsuna biyu da ke raba tsari ɗaya a cikin shigarwa ɗaya ba za a iya raba su ba. Sake tsara shi azaman Siffa B (shigarwa biyu akan lokaci guda) kuma raba ta hanyar matsayi yana aiki.",
     "**Fayil ɗaya kawai a cikin saukewa?** \"Ajiye asali kawai\", \"Ajiye fassara kawai\" da \"Haɗa zuwa shigarwa layuka biyu guda ɗaya\" kowannensu yana samar da fayil ɗaya ta hanyar ƙira; \"Raba zuwa biyu\" ne kawai ke ba ku biyu, tare da alamar `.orig` / `.dst`.",
     "**Zan iya yin aiki a rukuni?** Fayil ɗaya a lokaci ɗaya; ba a goyon bayan jerin gwano.",
     "**Shin yana ɗora sassan taken na?** A'a — nazari da fitarwa suna gudana gaba ɗaya a cikin burauzarka."
    ]
   },
   {
    "h2": "Jagorori Masu Alaƙa",
    "ps": [
     "Don saurin hanyar raba waƙoƙi biyu duba [[Splitting Bilingual Subtitles into Two Tracks|/guides/split-bilingual-subtitles.html]]; don yadda ake yin sassan taken harsuna biyu duba [[Two Ways to Make Bilingual Subtitles|/guides/make-bilingual-subtitles.html]]; don fassarar na'ura yi amfani da [[AI Subtitle Translation|/translate.html]]."
    ]
   }
  ]
 },
 "clean": {
  "seo": {
   "title": "Mai Tsabtace Sassan Taken – cire alamomin ruwa, tallace-tallace, SDH – AI-SRTSub",
   "desc": "Mai tsabtace sassan taken: dokoki 13 suna cire alamomin ruwa, tallace-tallace, rubutun SDH, alamomin HTML, kwafi; kowane canji yana da bambanci kuma ana iya dawo da shi. SRT/VTT/ASS, duka a cikin burauza.",
   "h1": "Yadda ake amfani da mai tsabtace sassan taken",
   "intro": "Sassan taken da aka sauke daga yanar gizo sau da yawa suna ɗauke da alamomin ruwa, tallace-tallace da rubutun SDH. Mai tsabtace yana amfani da dokoki 13 a cikin wucewa ɗaya, kuma kowane canji yana da bambanci kuma ana iya dawo da shi.",
   "ctaText": "Buɗe mai tsabtace sassan taken"
  },
  "body": [
   {
    "h2": "Abin da wannan kayan aikin ke yi",
    "ps": [
     "Fayilolin sassan taken da aka sauke sau da yawa suna ɗauke da abubuwan da bai kamata su kasance ba. Mai tsabtace yana cire su a cikin wucewa ɗaya bisa dokoki:"
    ]
   },
   {
    "h2": "Ɗorawa da gano abubuwa",
    "ps": [
     "Jawo fayil ko danna don ɗorawa — ana goyan bayan SRT, VTT, ASS, SSA da TXT — ko kuma liƙa rubutun sassan taken kai tsaye. An gano ɓoye bayanai ta atomatik: idan fassarar UTF-8 ta samar da alamomin maye gurbin, tana komawa zuwa GBK ko Big5, kuma shafin yana nuna \"Encoding fixed as {encoding}\". Idan ka ɗora sassan taken harsuna biyu masu waƙoƙi biyu (lokaci biyu iri ɗaya, ɗaya Sinanci da ɗaya Ingilishi), ana haɗa su zuwa waƙa guda ɗaya ta harsuna biyu tare da maɓallin \"asali a sama / fassara a sama\"."
    ]
   },
   {
    "h2": "Sanya dokoki 13",
    "ps": [
     "Dubawa yana da rukuni huɗu tare da akwatunan dubawa 13: **Alamomi da tsari** (tasirin ASS, alamomin HTML, alamomin sarrafawa, sake lamba bayan tsarawa), **SDH da tasirin sauti** (rubutun SDH, alamomin mai magana, layukan waƙa masu tsabta), **Alamomin ruwa da shigarwa mara amfani** (alamomin ruwa da tallace-tallace, shigarwa masu maimaitawa, shigarwa marasa komai), **Gyaran rubutu** (alamomin rubutu da tazara, gyaran manyan haruffa duka, haɗa gajerun layuka). Abubuwan \"marasaasara kuma tabbatacce\" ne kawai ke kunna ta tsohuwa; abubuwan da za su iya cire abubuwa (layukan waƙa, gyaran haruffa, haɗa gajerun layuka) a kashe suke — ka sanya musu alama lokacin da ake buƙata. Kowane abu yana da bayanin ⓘ, kuma duk wcanjin akwatin dubawa yana sake farawa nan take."
    ],
    "img": {
     "file": "clean-opts",
     "alt": "Dubawar zaɓuɓɓukan tsabtace: rukuni huɗu na akwatunan dubawa 13, adadin da ke aiki a sama",
     "cap": "Rukuni huɗu, dokoki 13; abubuwan marasa asara kawai a kunne ta tsohuwa, canje-canje suna aiki nan take"
    }
   },
   {
    "h2": "Canja bambanci da dawo da shi",
    "ps": [
     "Ba a rubuta sakamako kai tsaye ba: kowane canji an lissafa shi a cikin teburin bambanci tare da alamar dok apakah (me yasa aka gyara ko share wannan shigarwa). Kana son dawo da ɗaya? Danna \"Restore\" a kan wannan layin; \"Restore all\" yana dawo da komai a danna ɗaya, kuma danna shi kuma yana sake amfani da cikakken tsabtace. Sandar ƙididdiga tana nuna adadin asali / mai tsabta / sharewa / gyarawa / dawo da su."
    ],
    "img": {
     "file": "clean-diff",
     "alt": "Teburin bambancin canji: fihirisa, lokaci, asali da rubutun da aka tsabtace, alamar doka a kowane layin",
     "cap": "Kowane canji yana dauke da alamar doka; dawo da layuka ɗaya ko duka a lokaci guda"
    }
   },
   {
    "h2": "Samfoti da Fitarwa",
    "ps": [
     "Canza tsakanin ra'ayoyin \"Cleaned / Original\". A cikin ra'ayin asali, an goge shigarwa da aka share kuma an yi musu alama da \"Deleted\", kuma fayil ɗin da aka fitar yana dace da samfoti daidai. Tsarin fitarwa: SRT (tsohuwa), VTT, ASS (yana samuwa lokacin da tushen ASS ne, tare da sashin salo an kiyaye shi kamar yadda yake), da TXT mai sauƙi ba tare da lokaci ba. Sunayen fayil sun sami alamar `.clean` ta atomatik."
    ],
    "img": {
     "file": "clean-preview",
     "alt": "Samfoti na cikakken rubutu: ra'ayoyin da aka tsabtace da na asali tare da sandar ƙididdiga da ke nuna adadi",
     "cap": "Ra'ayoyin samfoti biyu, abin da kake gani shine abin da kake samu"
    }
   },
   {
    "h2": "Tambayoyin da aka fi yi",
    "ps": [
     "**Shin zai share tattaunawa ta yau da kullun ta kuskure?** Dokar alamar ruwa da farko tana cire layukan alamomin ruwa (yana kiyaye layukan tattaunawa a cikin shigarwa masu harsuna biyu) kuma tana share duk shigarwa kawai idan alamomi sun rage; cire SDH yana taɓa abubuwan da ke cikin maƙallin tare da kalmomin SDH waɗanda ke da harafi 40 ko ƙasa da haka — tattaunawa ta yau da kullun tana nan.",
     "**Ta yaya ake bambanta layukan waƙa masu tsabta da waƙoƙi a cikin tattaunawa?** Shigarwa kawai inda aka nannade kowane layin a cikin alamomin kiɗa ♪ ko alamomi kamar [music] ana share su; ana kiyaye tattaunawa mai ɗauke da waƙoƙi.",
     "**Shin alamomin mai magana za su iya shafar rubutun Sinanci?** Sunan haruffa masu manyan haruffa duka a farkon layin wanda ke biye da colon (kamar `GEORGE:`) ne kawai ke dacewa; jumlar colon ta Sinanci ba ta taɓa yin hakan ba.",
     "**Zan iya tsabtace fayiloli da yawa a lokaci ɗaya?** A'a — fayil ɗaya a kowane gudana. Sauke sakamakon, sannan ka ɗora na gaba."
    ]
   },
   {
    "h2": "Sirri",
    "ps": [
     "Tsabtace tana gudana gaba ɗaya a cikin burauzarka; babu abubuwan da ke cikin sassan taken da ake turawa zuwa uwar garken."
    ]
   },
   {
    "h2": "Kayan aiki da jagorori masu alaƙa",
    "ps": [
     "Don gajeren jagora da aka mayar da hankali kan cire alamomin ruwa da tallace-tallace, duba [[remove subtitle ads and watermarks|/guides/remove-subtitle-ads.html]]; gudanar da fayil ɗinka ta [[subtitle quality check|/guides/subtitle-quality-check.html]] kafin mika shi; don canza tsari yi amfani da [[format conversion|/convert.html]]."
    ]
   }
  ]
 },
 "convert": {
  "seo": {
   "title": "Yadda Ake Canza Tsarin Subtitle (SRT, VTT, ASS, SBV, LRC, TXT) – AI-SRTSub",
   "desc": "Jagora mai hoto kan mai canza tsarin: sanya fayil, duba tsarin da aka gano, zaɓi tsarin fitarwa, sarrafa rubutu biyu, da saukarwa. Komai yana aiki ne a cikin burauzarka.",
   "h1": "Jagorar Mai Canza Tsarin Subtitle",
   "intro": "Wannan jagora tana bi ta shafin daga sama zuwa ƙasa: ɗora subtitle, tabbatar da tsarin da aka gano, zaɓi tsarin fitarwa, da saukarwa. Komai yana aiki ne a cikin burauzarka — babu wani fayil da ke barin na'urarka.",
   "ctaText": "Buɗe mai canza tsarin subtitle"
  },
  "body": [
   {
    "h2": "Ɗora subtitle ɗinka",
    "ps": [
     "Ja fayil zuwa cikin akwatin da aka zana da ratsi ko danna don zaɓar ɗaya; Hakanan zaka iya **manna abubuwan da ke ciki** kai tsaye a cikin akwatin rubutu. Ana gano tsarin daga ɓangarorin biyu da abubuwan da ke ciki, kuma sakamakon yana bayyana a alamar tsarin."
    ],
    "img": {
     "file": "convert-upload",
     "alt": "Wurin lodi: an ɗora samfurin SRT, kuma an gano shi a matsayin SRT",
     "cap": "Tsarin da aka gano yana bayyana a alamar — duba nan da farko idan kana cikin shakka"
    }
   },
   {
    "h2": "Zaɓi tsarin fitarwa",
    "ps": [
     "Zaɓi tsarin da ake so daga menu mai faɗaɗawa: zaɓuɓɓuka shida — srt, vtt, ass, sbv, lrc, txt. Canzawa zuwa ass yana sake gina salon tsoho na 1920×1080 (rubutu fari, layin baki, ƙasa a tsakiya) kuma **ba ya kiyaye rubutun asali ko launi**; txt yana fitar da rubutu kawai, ba tare da lokaci ba."
    ],
    "img": {
     "file": "convert-opt",
     "alt": "Menu mai faɗaɗawa na tsarin fitarwa tare da zaɓaɓɓen VTT",
     "cap": "Tsarin fitarwa baya bin shigarwa — kai ne ke zaɓar shi"
    }
   },
   {
    "h2": "Sarrafa harsuna biyu",
    "ps": [
     "Idan fayil ɗin yana da harsuna biyu (layuka biyu a cikin cue ɗaya, ko cues masu haɗuwa), ana kiyaye tsarin yadda yake yayin canzawa. Zaɓar \"kiyaye harsuna biyu\" yana raba harsunan biyu zuwa layuka na sama da na ƙasa, kowanne an sake nade shi daban; an kashe ikon lokacin da ba a gano rubutun harsuna biyu ba."
    ]
   },
   {
    "h2": "Canza kuma saukar da shi",
    "ps": [
     "Danna \"Canza\": kwamitin sakamakon yana nuna adadin cue da jimlar lokacin, tare da shirye-shiryen rubutun don dubawa. Danna **Saukar da** don adana fayil ɗin, ko **Kwafi** don ɗaukar rubutun kai tsaye. Canzawa ba ta taɓa canza kowane ƙimar lokaci ba — tana sake rubuta tsarin ne kawai. Don sake saita lokacin cue, yi amfani da [[kayan aikin lokaci|/shift.html]]."
    ],
    "img": {
     "file": "convert-result",
     "alt": "Kwamitin sakamako: adadin cue da jimlar lokaci tare da maɓallan saukarwa da kwafi",
     "cap": "Cues 6, 0:23 jimla — duba rubutun da sauri kafin saukarwa"
    }
   }
  ]
 },
 "extract": {
  "seo": {
   "title": "Cire Rubutu Mai Sauƙi Daga Subtitle – Tsare-tsare guda biyu, Gyara guda biyar – AI-SRTSub",
   "desc": "Ciro tattaunawa daga subtitle a matsayin rubutu mai tsabta: sakin layi masu ci gaba ko layin ɗaya a kowane cue, da abin da maɓallan gyara biyar ke cirewa.",
   "h1": "Yadda Ake Cire Rubutu Mai Sauƙi Daga Subtitle",
   "intro": "Fitar da tattaunawa daga fayil ɗin subtitle a matsayin rubutu mai tsabta: lambobin cue, lokaci da alamomin salo suna cirewa ta atomatik, don haka sakamakon yana karanta kamar labari ko aiki azaman jerin tattaunawa.",
   "ctaText": "Buɗe mai cire rubutu mai sauƙi"
  },
  "body": [
   {
    "h2": "Abin da Wannan Kayan Aikin Ke Yi",
    "ps": [
     "Tattaunawa kawai a cikin fayil ɗin subtitle ce ke da mahimmanci ga mai karatu; sauran tsarin an yi su ne don ɗan wasa — lambobin cue, lokaci, alamomin salo. Wannan shafin yana cire tsarin kuma yana kiyaye kalmomin."
    ]
   },
   {
    "h2": "Sanya Shi Ciki, Ba Kawai Ɗorawa Ba",
    "ps": [
     "Ginshiƙi na \"1 Ƙara subtitles\" a hagu yana karɓar fayil ɗin da aka ɗora, kuma zaka iya liƙa abubuwan da ke cikin subtitle kai tsaye a cikin akwatin rubutu. Idan kun zaɓi fayil ɗin da ba daidai ba, danna \"Share\" kuma ku fara sabuntawa.",
     "Wannan shafin yana karanta fayiloli azaman UTF-8. Idan subtitle sun buɗe kamar bango na alamomin tambaya ko akwatuna, an lalata lambar — canza ta zuwa UTF-8 a cikin [[Gyaran rubutun da ya lalace|/repair.html]] da farko, sannan ku dawo."
    ],
    "img": {
     "file": "extract-up",
     "alt": "Wurin ƙara-subtitles na mai cire rubutu mai sauƙi",
     "cap": "Ɗora fayil, ko liƙa abubuwan da ke cikin subtitle kai tsaye a cikin akwatin rubutu"
    }
   },
   {
    "h2": "Zaɓar Tsakanin Tsare-tsare Guda Biyu",
    "ps": [
     "A saman \"2 Zaɓuɓɓukan cirewa\" shine tsarin: **Sakin layi masu ci gaba** yana karya rubutu a wuraren hutu da alamomin ƙarshen jumla don ya karanta kamar labari; **Layin ɗaya a kowane cue** yana ba da layin ɗaya a kowane shigarwar subtitle, yana daidaita shigarwar fayil na asali ɗaya zuwa ɗaya.",
     "Kwafin tattaunawa don bayanin kula, yin aikin fassara ko karanta shi azaman fassarar yana buƙatar sakin layi masu ci gaba; gina takardar tattaunawa, kwatanta layi bayan layi da na asali ko ciyar da wani kayan aiki yana buƙatar layin ɗaya a kowane cue."
    ],
    "img": {
     "file": "extract-opt",
     "alt": "Tsarin da maɓallan gyara ƙarƙashin zaɓuɓɓukan cirewa",
     "cap": "Zaɓi tsarin ɗaya; maɓallan gyara biyar da ke ƙasa suna yanke shawarar wani irin abun ciki ake cirewa"
    }
   },
   {
    "h2": "Abin da Kowane Gyara Guda Biya Ke Cirewa",
    "ps": [
     "**Cire SDH cues**: yana share bayanin sautin da ke cikin baka kamar \"(sawun ƙafa)\" ko \"[kiɗa]\" kuma yana kiyaye tattaunawar.",
     "**Cire alamomin ruwa da talla**: yana saukar da layuka kamar lambobin yabo na fansub, URLs da sunayen tashoshi.",
     "**Cire kwafin maƙwabta**: lokacin da jumla guda ta bayyana sau biyu a jere (kuskuren kunna waƙa) ana kiyaye kwafi ɗaya kawai; kwafin da ke nesa da juna suna ɗauke da ma'ana kuma ana barin su su kadai.",
     "**Cire sunayen masu magana**: \"JOHN: Sannu\" ya zama \"Sannu\". A kashe ta tsohuwa — rubutun salo na buƙatar nuna wanda ke magana.",
     "**Tsallake layukan waka**: layukan da suka zama \"♪ … ♪\" gabaɗaya ana tsallake su. A kashe ta tsohuwa — wakoki ma kalmomi ne."
    ],
    "img": {
     "file": "extract-clean",
     "alt": "Maɓallan gyara guda biyar da bayanin su ƙarƙashin zaɓuɓɓukan cirewa",
     "cap": "Kowane maɓallin yana cewa abin da yake cirewa a hannun damansa; yi alama kan waɗanda kuke buƙata"
    }
   },
   {
    "h2": "Dauke Sakamakon",
    "ps": [
     "Ginshiƙi na \"3 Sakamako\" a dama yana nuna rubutun da aka cire a rayuwa kuma yana sake ƙididdigewa da zaran kun canza zaɓi.",
     "Lokacin da kuke farin ciki, danna \"Saukar da\" don adana .txt ko \"Kwafi\" don daukar rubutun tare da ku. Don harsunan da ba su raba kalmomi da sarari ba, kamar Sinanci da Japananci, haɗakar layi tana bi da dokoki daban-daban, kuma kayan aikin suna sarrafa hakan kowane harshe ta atomatik."
    ],
    "img": {
     "file": "extract-out",
     "alt": "Wurin sakamako tare da maɓallan saukarwa da kwafi",
     "cap": "Sakamakon yana sabuntawa a rayuwa; saukar da shi azaman txt ko kwafe shi kai tsaye"
    }
   },
   {
    "h2": "Abin da Ba a Taɓa Ba",
    "ps": [
     "Tattaunawar kanta ba a sake rubuta ta ba. Maɓallan gyara kawai suna yanke shawarar wane ne layuka ko tubalan gabaɗaya ake cirewa; ba sa taɓa canza kalmomin shigarwa.",
     "Lokaci da lambobin cue kawai ba a fitar da su ba, ba a canza su ba sannan a fitar da su — fayil na asali ba a taɓa shi ba, kuma wannan shafin baya bayar da fitarwa tare da lokaci. Wannan aikin yana mallakar [[Canjin tsari|/convert.html]]."
    ]
   },
   {
    "h2": "Tambayoyi Gama Gari",
    "ps": [
     "**Shin alamomin salo na ASS suna zama a cikin rubutun?** A'a. ASS `{}` tubalan maye gurbin ana share su kuma tattaunawar kawai ce ta rage.",
     "**Shin fayil mai harsuna biyu yana fitowa azaman layuka biyu ko ɗaya?** Layuka da yawa kamar yadda shigarwar take da shi; wannan shafin baya haɗawa ko raba su — don raba su yi amfani [[Raba harsuna biyu|/bilingual.html]].",
     "**Me yasa ake kiyaye sunayen masu magana ta tsohuwa?** Sunan a cikin \"JOHN: Sannu\" sau da yawa bayani ne mai amfani (rubutun, takardun tattaunawa), kuma cire shi yana sa ya yi wahala a gaya wanda ke magana, don haka an bar zaɓin a gare ku.",
     "**Za a iya ciro fayilolin waka na LRC ma?** Ee. An cire alamomin lokacin LRC kuma layukan waka sun rage; idan ba ku son wakoki, yi alama kan \"Tsallake layukan waka\"."
    ]
   },
   {
    "h2": "Sirri",
    "ps": [
     "Ana sarrafa subtitles gabaɗaya a cikin burauza: babu abin da aka ɗora kuma babu abin da ke wucewa ta uwar garken. Rubutun yana tsayawa akan shafin yanzu kawai kuma ana share shi a kan sabuntawa."
    ]
   },
   {
    "h2": "Kayan Aiki da Jagorori masu Alaka",
    "ps": [
     "Don fahimtar abin da fayil ɗin subtitle ya ƙunshi gaskiya duba [[Abin da ke cikin fayil ɗin SRT|/guides/srt-file-format.html]]; don fassara tattaunawar da aka ciroje zuwa [[Fassarar subtitle|/translate.html]]; don juya shi zuwa tebur yi amfani da [[Subtitles zuwa Excel/CSV|/guides/srt-to-excel.html]]; kuma gudanar da [[QC na Subtitle|/qc.html]] kafin mika komai."
    ]
   }
  ]
 },
 "extract-subtitles-from-video": {
  "seo": {
   "title": "Fitar da Subtitles Daga Bidiyo – Na Ciki da Na Waje – AI-SRTSub",
   "desc": "Abin da MKV / WebM / MP4 / MOV kowanne ke ɗauke da shi, yadda rubutu, ASS, WebVTT da waƙoƙin mov_text suka bambanta, me yasa subtitles na hotuna (PGS / DVD) ba su da rubutu, da abin da za a yi bayan cirewa.",
   "h1": "Fitar da Subtitles Daga Bidiyo",
   "intro": "Subtitles na iya zama a cikin fayil ɗin bidiyo ko kuma su tsaya su kaɗai a waje. A ciki, su ne waƙa a cikin akwatin — cire su ba shi da alaƙa da sauya fasalin.",
   "ctaText": "Buɗe cire subtitle na bidiyo"
  },
  "body": [
   {
    "h2": "Inda Subtitles Ke Zama: Na Ciki da Na Waje",
    "ps": [
     "Fayil ɗin bidiyo (MKV, MP4) akwati ne da ke riƙe da waƙar bidiyo, waƙar sauti da waƙoƙin subtitle a lokaci guda. Subtitles da aka rufe a ciki **na ciki ne**; wani .srt / .ass daban da ke zaune a waje **na waje ne**, kuma ana kuma kiran waƙar da aka saka **wacce aka haɗa**.",
     "Ana iya amfani da subtitles na waje kamar yadda suke. Matsalar ita ce na ciki: don gyara su, fassara su ko gina waƙa mai harsuna biyu daga na asali, ba ka da fayil ɗin subtitle a hannu — dole ne ka fara karanta waƙar daga cikin akwatin farko. Wannan matakin ba sauya fasali bane: ba a sake sanya bidiyon lamba ba, sai dai bayanan da aka riga aka adana a cikin akwatin ake karantawa."
    ]
   },
   {
    "h2": "Wane Akwati Ke Dauke Da Menene",
    "ps": [
     "Akwatuna daban-daban suna riƙe da tsarin subtitle daban-daban, kuma wahalar cirewa ma ta bambanta:"
    ],
    "img": {
     "file": "videosub-which",
     "alt": "Waƙoƙin subtitle da shafin cire subtitle na ciki ya lissafa",
     "cap": "Waƙa ɗaya a kowane jeri, yawanci tare da harshe da sunan waƙa; idan akwai ɗaya kawai ana cire ta ta atomatik"
    }
   },
   {
    "h2": "Me Yasa Subtitles na Hotuna Ba Za A Iya Cire Su Ba",
    "ps": [
     "Blu-ray PGS da DVD subtitles ba sa adana haruffa ko kaɗan, sai dai jerin hotuna masu tashar alpha. Lokacin da ɗan wasa ya nuna su, yana manna hoto ne, ba yana fassara rubutu ba.",
     "Don haka babu rubutu a cikin irin wannan waƙar don karantawa — ba wai kayan aikin ba ne ba su goyi bayansa ba, a'a babu haruffa a ciki. Shafin yana cewa a fili lokacin da ya ci karo da ɗaya.",
     "Hanya ɗaya tilo don samun kalmomi ita ce fara gane haruffa a cikin waɗannan hotunan (OCR) da gina subtitles daga can. Wannan tsari ne daban da fitar da waƙa."
    ]
   },
   {
    "h2": "Abin da Yawanci Ke Zuwa Bayan Cirewa",
    "ps": [
     "Abin da ke fitowa shi ne waƙar kamar yadda take: kayan aikin ba ya tsammanin lambobin sauti kuma ba ya gyara lokaci. Don haka abubuwa biyu sun kan taso sau da yawa:",
     "Daya shine **rubutun da ya lalace** — matsalar lamba a cikin waƙar tushe wacce ke fita ta lalace duk da haka; je zuwa [[Yadda ake gyara rubutun da ya lalace|/guides/repair.html]] don gane lambar. Daya kuma shine **lokacin da bai dace ba** — ko tushen yana da tambarin gabatarwa, ko adadin firam ɗin bai dace ba, sakamakon yana karkata gaba ɗaya; yi amfani da [[Daidaitawar lokaci|/shift.html]] don karkata ko sikelin shi.",
     "Bayan haka, don fassara je zuwa [[Fassarar subtitle|/translate.html]], kuma don sanya shi harsuna biyu duba [[Hanyoyi biyu na yin subtitles masu harsuna biyu|/guides/make-bilingual-subtitles.html]]."
    ],
    "img": {
     "file": "videosub-formats",
     "alt": "Wurin sakamako tare da tsarin fitarwa na SRT / VTT / ASS / TXT",
     "cap": "Ana iya fitar da subtitles da aka ciro a cikin tsarin huɗu; tushen ASS yana kiyaye kanun labaran salon sa da ƙudurinsa"
    }
   },
   {
    "h2": "Abubuwa Kaɗan da Yake Da Sauƙin Kuskure A Kai",
    "ps": [
     "**Fitar da subtitles ba kona su bane a ciki.** Ba a sake sanya bidiyon lamba ba, don haka ingancin hoto da sauti ba su shafa ba.",
     "**Cirewa ba ya shafar fayil ɗin asali.** Karatu kawai, ba a taɓa rubuta shi ba, kuma ba a canza wani bayanin byte na bidiyon ba.",
     "**Babban fayil da ke tafiya a hankali ba matsalar haɗin gwiwa ba ce.** Kayan aikin yana binciken bayanan waƙa yanki bayan yanki, kuma yayin da fayil ɗin ya fi girma haka yake daukar lokaci; duk yana faruwa ne a gida.",
     "**Subtitles na waje ba sa buƙatar wannan shafin.** Idan kana da .srt / .ass, je kai tsaye zuwa [[Canjin tsari|/convert.html]]; subtitles kawai da aka rufe a cikin bidiyo ne ke buƙatar cirewa da farko."
    ]
   },
   {
    "h2": "Kayan Aiki da Jagorori masu Alaka",
    "ps": [
     "Don cikakken jagora duba [[Yadda ake cire subtitles da aka saka a cikin bidiyo|/guides/videosub.html]]; don fassara abin da kuka ciro je zuwa [[Fassarar subtitle|/translate.html]], don sanya shi harsuna biyu duba [[Hanyoyi biyu na yin subtitles masu harsuna biyu|/guides/make-bilingual-subtitles.html]]; don rubutun da ya lalace fara da [[Gyaran rubutun da ya lalace|/repair.html]]."
    ]
   }
  ]
 },
 "fps-23-976-vs-25": {
  "seo": {
   "title": "Abin da 23.976 / 24 / 25 / 30 fps Ke Nufin Gaskiya – Lokacin Subtitle – AI-SRTSub",
   "desc": "23.976 ba 24 ba ce kuma 29.97 ba 30 ba ce — kashi 0.1% da aka rasa ya fito ne daga launi na NTSC, yayin da PAL ke gudu da fina-finai sauri da kashi 4%. Yadda waɗannan ke canza lokacin subtitle ɗinka, da yadda ake canzawa tsakaninsu.",
   "h1": "Abin da 23.976 / 24 / 25 / 30 fps ke nufin gaskiya",
   "intro": "Tazantar 0.1% tsakanin 23.976 da 24 ragowar tarihin talabijin ce. Tare da 4% na PAL, shi ne dalilin da ya sa subtitles ke ci gaba da rasa daidaito yayin da fim ke ci gaba.",
   "ctaText": "Buɗe daidaitawar lokaci"
  },
  "body": [
   {
    "h2": "Abin da kowace lamba take",
    "ps": [
     "Adadin firam shine yawan hotunan da ake nunawa a cikin daƙiƙa ɗaya. Hudu da kuka fi haɗuwa da su akai-akai:"
    ]
   },
   {
    "h2": "Inda 0.1% ya fito",
    "ps": [
     "23.976 = 24 × 1000/1001, kuma 29.97 = 30 × 1000/1001. Wannan 1000/1001 ragowa ce daga ƙara launi zuwa NTSC: don matsatsa ƙaramin launi ciki ba tare da karya masu karɓar baƙi da fari na yanzu ba, an saukar da adadin filin daga 60 Hz zuwa 59.94 Hz (60 × 1000/1001), kuma adadin firam ya sauka tare da shi.",
     "Sakamakon: fina-finai suna fitowa a 23.976 a yankunan NTSC maimakon 24. Bambancin shine 0.1%, ko daƙiƙa 3.6 a cikin awa guda — da kyar a lura da shi da kansa, amma kada ku ruɗe shi da 4% a ƙasa kuma kada ku haɗa su biyu a lissafi ɗaya."
    ]
   },
   {
    "h2": "Inda 4% ya fito",
    "ps": [
     "Yankunan PAL suna nuna fina-finai a 25 fps. Ana ɗaukar fina-finai a 24 fps kuma ana kunna su a 25 kawai — ba a ƙara ko cire firam ɗaya ba, don haka kunna waƙar yana gudu da sauri da kashi 4% (25/24 ≈ 1.0417). Fim na mintuna 100 yana gudu na mintuna 96 a cikin sigar PAL ɗin sa.",
     "Wannan shine tushen **karkatar da ci gaba**: subtitles da aka yi a kan na asali da bidiyo a cikin sigar PAL suna dace da daidai a farkon kuma suna da nisan mintuna huɗu a cikin biredi. Babu wani sauyi na duniya da zai iya ceton hakan; dole ne a sake sikelin shi ta hanyar rabo."
    ],
    "img": {
     "file": "shift-step-rate",
     "alt": "Sashen saurin shafin lokaci: akwatin shigar da rabo",
     "cap": "Sake sikelin ta hanyar rabo — daraja ɗaya tana rufe dukan fim ɗin"
    }
   },
   {
    "h2": "Yadda Ake Canzawa",
    "ps": [
     "Canzawa yana nufin ninka ta rabo guda ɗaya wanda ya shafi dukan fim ɗin:"
    ]
   },
   {
    "h2": "Faɗin Wanda Kake Da Shi",
    "ps": [
     "Maimakon tsammanin rabon, nemo lokuta guda biyu waɗanda daidaitaccen lokacin su kuke da tabbacin su — yawanci layin farko da na ƙarshe na tattaunawa — kuma faɗawa kayan aikin \"wannan layin ya kamata ya zama a 00:00:12 kuma wancan a 01:35:40\"; yana miƙa dukan fim ɗin a madaidaici tsakanin waɗancan maki biyu. Wannan shine \"ƙulla maki biyu\", kuma baya buƙatar lissafin adadin firam daga gare ku.",
     "Don tabbatar da adadin firam da kanka, duba ɗan wasan ku ko kayan aikin bayanin kafofin watsa labarai. Lokacin da sunan fayil kamar `1080p.WEB` ba ya ɗauke da alamar adadin firam, ƙulla maki biyu ita ce hanya mafi aminci."
    ],
    "img": {
     "file": "shift-step-two",
     "alt": "Sashen ƙulla maki biyu na shafin lokaci: layuka biyu na abubuwan shigar da lokaci",
     "cap": "Ƙulla maki biyu baya buƙatar adadin firam — kawai alamomin lokaci biyu"
    }
   },
   {
    "h2": "Kayan Aiki da Jagorori masu Alaka",
    "ps": [
     "Canjin adadin firam kansa — [[Canjin adadin firam na subtitle|/guides/srt-fps-converter.html]]; daidaitawar sauri — [[Canjin saurin subtitle|/guides/subtitle-speed-converter.html]]; rashin tabbas ko canji ne na duniya ko karkatar da ci gaba — [[Subtitles suna ci gaba da fita daga daidaito|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "glossary": {
  "seo": {
   "title": "Sauya Sharuɗɗa Da Yawa a Cikin Subtitles – Tebur ɗaya yana gyara fayil – AI-SRTSub",
   "desc": "Dokar ɗaya a kowane layin, wacce aka raba ta -> , => , → ko Tab, tare da # don sharhi. Daidaita kalma-gaba ɗaya, kulawa da harafi, layin farko ko na biyu na cue mai harsuna biyu, kowane canji an jera shi kuma ana iya mayar da shi.",
   "h1": "Yadda Ake Sauya Sharuɗɗa Da Yawa a Cikin Subtitles",
   "intro": "Tebur ɗaya na kalmomi yana sa kalmomin dukan fayil ɗin subtitle su zama daidai a lokaci ɗaya — lokaci, salon ASS da VTT NOTE tubalan ba a taɓa su da harafi ɗaya ba.",
   "ctaText": "Buɗe sauya sharuɗɗa da yawa"
  },
  "body": [
   {
    "h2": "Abin da Wannan Kayan Aikin Ke Yi",
    "ps": [
     "Kalmar guda da aka fassara ta hanyoyi biyu daban-daban, sunaye da wurare da ke fita da fassarar na'ura, subtitles na wani wanda ke buƙatar dace da nata dokoki — duk waɗannan suna da halaye ɗaya: abin da ya canza shine kalma, ba tsarin ba. Wannan shafin yana canza kalmomi kawai."
    ]
   },
   {
    "h2": "Abubuwan Shigar da Suna Biyu: Subtitles da Tebur na Kalmomi",
    "ps": [
     "Ginshiƙi na \"1 Ƙara subtitles\" a hagu yana ɗaukar fayil ɗin subtitle, ko kuma zaka iya liƙa abubuwan da ke ciki kai tsaye; idan kun zaɓi fayil ɗin da ba daidai ba, danna \"Share\".",
     "Ginshiƙi na \"2 Tebur na kalmomi\" a dama yana riƙe da dokoki. **Dokar ɗaya a kowane layin**, tare da tsohuwar kalmar da sabuwar kalmar da aka raba ta `->` , `=>` , `→` ko Tab — duk huɗun suna aiki. Layukan da suka fara da `#` sune sharhi kuma ba sa shiga cikin maye gurbin.",
     "Idan ba ku da tabbas game da tsarin, danna \"Cika misali\" kuma gyara hakan."
    ],
    "img": {
     "file": "glossary-up",
     "alt": "Wurin ƙara-subtitles da abubuwan shigar da tebur na kalmomi na shafin maye gurbin kalmomi",
     "cap": "Subtitles a hagu, dokoki a dama; dokar ɗaya a kowane layin, tsohuwar kalma da sabuwar kalma da -> ya raba"
    }
   },
   {
    "h2": "Yadda Ake Rubuta Tebur na Kalmomi",
    "ps": [
     "Dokar ɗaya a kowane layin: kalmar yanzu a hagu, abin da ya kamata ta zama a dama. Misali `Thor -> Donar` yana maye gurbin kowane \"Thor\" a cikin fayil ɗin da \"Donar\".",
     "Sharhi suna farawa da `#` kuma suna da amfani don sanya alama kan rukunin dokoki (misali \"# gyaran sunan kakar 1\"), da kuma kashe dokar na ɗan lokaci — kawai sanya `#` a gaba maimakon share shi.",
     "Dokoki suna gudana daga sama zuwa ƙasa; rubutun da doka ɗaya ta samar ana bincika shi kuma ta dokokin da ke ƙasa da shi. Lokacin da tsari ke da mahimmanci (cewa, maye gurbin A da B da farko sannan B da C), kiyaye hakan a zuciya."
    ],
    "img": {
     "file": "glossary-table",
     "alt": "Layin bayan layin dokokin maye gurbin a cikin abubuwan shigar da tebur na kalmomi",
     "cap": "Dokar ɗaya a kowane layin; layukan da suka fara da # sune sharhi kuma za su iya kashe doka na ɗan lokaci"
    }
   },
   {
    "h2": "Abin da Maɓallan Uku Ke Yi",
    "ps": [
     "**Tsari**: `all` / `first line only` / `second line only`. A cikin fayil mai harsuna biyu, zaɓi \"layin na biyu kawai\" lokacin da kake son canza fassarar kawai; shigarwar da ke da layi ɗaya kawai suna tsayawa ba a taɓa su ba a ƙarƙashin kowane saitunan layin ɗaya — kayan aikin ba ya tsammanin wane gefe ne na asali.",
     "**Kalma guda**: yana maye gurbin kawai sharuɗɗan da ke tsaye su kaɗai azaman kalma, don haka `art` ba zai taɓa `start` ba. Don harsunan da ba su raba kalmomi da sarari ba, kamar Sinanci da Japananci, wannan maɓallin ba shi da tasiri — maye gurbin yana aiki a kan ɓangarorin kalmomi a can.",
     "**Mai kulawa da harafi**: a kashe ta tsohuwa, don haka `CEO` da `ceo` duk an maye gurbin su; lokacin da aka yi alama, daidai rubutun kawai ake maye gurbinsa."
    ],
    "img": {
     "file": "glossary-opt",
     "alt": "Tsari, kalma guda da maɓallan mai kulawa da harafi ƙarƙashin tebur na kalmomi",
     "cap": "Tsari yana yanke shawarar wane layi ne ke canzawa; kalma guda da harafi suna yanke shawarar yadda tsattsauran ra'ayi ake dace da kalmar"
    }
   },
   {
    "h2": "Kowane Canji An Jera Shi, Kowane Canji Ana Iya Mayar da Shi",
    "ps": [
     "\"3 Sakamako\" yana nuna subtitles da aka maye gurbinsu kuma **yana lissafin kowane canji**: wane cue, wane layi, daga me zuwa me.",
     "Idan ba ku son ɗayan su, danna shi a cikin jerin don mayar da wannan shigarwar kawai — babu buƙatar gyara tebur na kalmomi da sake gudanarwa. Lokacin da kuke farin ciki, danna \"Saukar da\" ko \"Kwafi\"."
    ],
    "img": {
     "file": "glossary-out",
     "alt": "Wurin sakamako tare da jerin canje-canje ɗaya ɗaya",
     "cap": "Kowane canji an jera shi; danna wanda ba ku so don mayar da shi"
    }
   },
   {
    "h2": "Abin da Ba a Taɓa Ba",
    "ps": [
     "**Lokaci, layukan salon ASS da VTT `NOTE` tubalan ba a taɓa su da harafi ɗaya ba.** Maye gurbin yana shafa rubutun tattaunawa kawai, ba ga layukan tsari ba.",
     "Tebur na kalmomi baya taɓa gyara fayil ɗin subtitle ɗinku ta atomatik — sakamakon sabon fitarwa ne kuma asalin yana tsayawa kamar yadda yake."
    ]
   },
   {
    "h2": "Tambayoyi Gama Gari",
    "ps": [
     "**Me yasa ba a maye gurbin kalma ba?** Duba tsari da farko: tare da an zaɓi \"layin na biyu kawai\", shigarwar da ke da layi ɗaya kawai suna tsayawa ba a taɓa su ba. Sannan duba dacewar kalma guda, wacce ke dakatar da abubuwan da ba su zama kalmomi masu zaman kansu ba.",
     "**Me yasa Sinanci ke ci gaba da maye gurbin ɓangarorin kalmomi tare da dacewar kalma guda?** Wannan ana tsammaninsa. Sinanci da Japananci ba su raba kalmomi da sarari ba, don haka kayan aikin ba za su iya tantance iyakokin kalmomi ba kuma dacewar kalma guda ba ta da tasiri a can.",
     "**Yaya zan mayar da komai bayan kuskure?** Mayar da shigarwar ɗaya bayan ɗaya a cikin jerin canje-canje; don farawa gabaɗaya, share tebur na kalmomi kuma ƙara subtitles sake.",
     "**Za a iya canza layukan salon ASS ta hanyar kuskure?** A'a. Layukan salo da `NOTE` tubalan ba su cikin iyaka; rubutun tattaunawa kawai ke shiga."
    ]
   },
   {
    "h2": "Sirri",
    "ps": [
     "Ana sarrafa subtitles da tebur na kalmomi gabaɗaya a cikin burauza: babu abin da aka ɗora kuma babu abin da ke wucewa ta uwar garken. Ba a adana tebur na kalmomi ba, don haka yana da komai a bofi lokacin da kuka buɗe shafin na gaba."
    ]
   },
   {
    "h2": "Kayan Aiki da Jagorori masu Alaka",
    "ps": [
     "Ko za a gina tebur na kalmomi da yadda ake kula da shi a duk kakar, duba [[Tebur na kalmomi: kiyaye kakar ta zama daidai|/guides/subtitle-glossary.html]]; idan abun ciki ya ƙazantu (alamomin ruwa, SDH cues) gudanar da [[Tazantar subtitle|/clean.html]] da farko; da zarar sunayen sun daidaita kuma kuna buƙatar wasu harsuna je zuwa [[Fassarar subtitle|/translate.html]]; kuma gudanar da sakamakon ta [[QC na Subtitle|/qc.html]]."
    ]
   }
  ]
 },
 "hanconv": {
  "seo": {
   "title": "Canza Sahuwa Mai Sauƙi zuwa Ta Gargajiya – Taiwan da Hong Kong – AI-SRTSub",
   "desc": "Jagorar hanya tara: na Taiwan tare da ko ba tare da ƙamus na musamman ba, Hong Kong a matsayin nata salo, dukansu za a iya mayar da su zuwa sauƙaƙe. Magana kawai ke canzawa; lokaci ya tsaya a inda yake.",
   "h1": "Yadda ake canza sassaka na Sinanci masu sauƙi da na gargajiya",
   "intro": "Ko subtitle yana zuwa Taiwan, Hong Kong ko babban yankin kasar yana canza duka kalmomi da siffofin haruffa. Hanyoyi tara da za a zaba, kuma tattaunawa kawai ake canzawa - lokaci, lambobin index da layukan salo na ASS ba a taɓa su ba.",
   "ctaText": "Buɗe mai canzawa"
  },
  "body": [
   {
    "h2": "Abin da wannan kayan aikin ke yi",
    "ps": [
     "Canzawa tsakanin sauƙaƙe da gargajiya ba kawai rubuta kowane haruffa daban ba ne. Kalma guda mai sauƙi ta yi daidai da kalmomi daban-daban a yankuna daban-daban - kalmar \"software\" ta bambanta tsakanin Taiwan da babban yankin, kuma Hong Kong tana da wani nau'in. Mai canzawa yana kiyaye waɗannan daban:"
    ]
   },
   {
    "h2": "Loda da gano abu",
    "ps": [
     "Jawo fayil ciki ko bincika ɗaya — ana tallafawa SRT, VTT, ASS da TXT — ko liƙa abun ciki na subtitle kai tsaye a cikin akwatin. Ana gano tsarin ta atomatik kuma an nuna shi kusa da **Detected format**."
    ],
    "img": {
     "file": "hanconv-up",
     "alt": "Yankin loda mai canzawa: yanki mai sauka da akwatin liƙa, tare da tsarin da aka gano a sama",
     "cap": "SRT / VTT / ASS / TXT, an gano tsarin ta atomatik"
    }
   },
   {
    "h2": "Zabi tsakanin hanyoyi tara",
    "ps": [
     "Hanyoyi tara a ƙarƙashin \"Canza zuwa\" sun rabu zuwa ƙungiyoyi uku. **Sauƙaƙe → gargajiya**: gargajiya ta gama-gari, ta Taiwan (canza kalmomi), ta Taiwan (haruffa kawai), Hong Kong. **Gargajiya → sauƙaƙe**: na gama-gari, daga Taiwan, daga Hong Kong. **Gargajiya zuwa gargajiya**: siffofin Taiwan, siffofin Hong Kong.",
     "Zabar \"Kalmomin Taiwan\" yana musanya ƙamus na yanki ma: kalmar \"software\" ta zama ta Taiwan kuma haka ma kalmar \"bayanai\"; \"Haruffan Taiwan\" yana canza yadda ake rubuta haruffa kawai kuma yana barin kalmomin ku yadda suke. Hong Kong wani lamari ne daban gaba ɗaya kuma yana amfani da wata kalmar don \"software\". Don komawa zuwa sauƙaƙe, yi amfani da ƙungiyar da ke ƙasa - dole ne ka fadi wane nau'in gargajiya kake fitowa daga ciki, saboda rubutun Taiwan da Hong Kong suna bi hanyoyi daban-daban don komawa."
    ],
    "img": {
     "file": "hanconv-dir",
     "alt": "Canza zuwa katin: menu na sauka na makoma wanda ke nuna \"Sauƙaƙe → Gargajiyar Taiwan (canza kalmomi)\" an zaɓa",
     "cap": "Hanyoyi suna cikin menu na \"Canza zuwa\" a cikin ƙungiyoyi uku; wannan na Taiwan ne tare da canjin kalmomi"
    }
   },
   {
    "h2": "Sakamako da fitarwa",
    "ps": [
     "Yankin sakamako yana nuna subtitle da aka canza nan take, tare da mashigin ƙididdiga wanda ke ba da jimlar adadin layuka da adadin layukan da suka canza. Idan babu abin da ya canza kwata-kwata kuna samun shawara cewa fayil ɗin bazai ƙunshi haruffan Sinanci ba - haruffan Han kawai ake canzawa, don haka subtitle mai haruffan Latin ko lambobi kawai yana zama daidai da yadda yake.",
     "Sannan sauke ko kwafi. An saka alamar harshe a cikin sunan fayil - `demo.srt` ya zama `demo.zh-TW.srt` don gargajiyar Taiwan, `.zh-Hant` don gargajiya ta gama-gari, da `.zh-Hans` lokacin komawa zuwa sauƙaƙe."
    ],
    "img": {
     "file": "hanconv-out",
     "alt": "Yankin sakamako: subtitle da aka canza da mashigin ƙididdiga",
     "cap": "Mashigin ƙididdiga yana nuna jimlar layuka da waɗanda suka canza; zazzage ko kwafi daga nan"
    }
   },
   {
    "h2": "Abin da ba a taɓa taɓawa ba",
    "ps": [
     "Tattaunawa kawai ake canzawa. Lokaci, lambobin index da layukan salo na ASS ba a taɓa su ba kwata-kwata - sakamakon yana shirye don amfani ba tare da sake yin kowane tsari ba."
    ]
   },
   {
    "h2": "Tambayoyi da Amsoshi",
    "ps": [
     "**Me yasa mai canzawa bai canza kalmar \"mai tsabta\" ba?** Ana warware taswirar abu ɗaya zuwa da yawa ta hanyar kalma: ma'anar \"mai tsabta\" da ma'anar \"bushe\" suna raba sigar gargajiya guda ɗaya, yayin da ma'anar \"gangar bishiya\" tana amfani da wata daban. Teburorin sun fito ne daga OpenCC, suna dacewa da cikakkun jimla maimakon haruffa ɗaya ɗaya.",
     "**Menene bambanci tsakanin gargajiyar Taiwan da ta Hong Kong?** Ƙamus: kalmar \"software\" ta bambanta tsakanin su biyun. Zaɓi hanyar da ta dace da yankin da kake bayarwa.",
     "**Adadin haruffa ya canza bayan an canza?** Haruffan Han kawai ake musanyawa - ba a ƙara ko cire kowane shigarwa kuma ba a motsa lokaci ba. Idan adadin layin ya canza, buba ko an gano tsarin daidai.",
     "**Kamus ɗin ya kasa lodawa?** Shafin yana gaya maka ka sake shafawa kuma ka sake gwadawa. Yana lodawa a cikin gida, don haka babu buƙatar loda subtitle ko ina."
    ]
   },
   {
    "h2": "Sirri",
    "ps": [
     "Canzawa yana gudana gaba ɗaya a cikin burauzar ku. Ba a tura abun ciki na subtitle zuwa uwar garken ba."
    ]
   },
   {
    "h2": "Kayan aiki da jagorori masu alaƙa",
    "ps": [
     "Abin da kake buƙata kawai shine sauƙaƙe zuwa gargajiya, duba [[Canza sassaka masu sauƙi zuwa na gargajiya|/guides/srt-simplified-to-traditional.html]]; me yasa yake game da fiye da musayar haruffa, duba [[Sauƙaƙe da gargajiya ba musayar haruffa ba ne|/guides/simplified-traditional-chinese.html]]; don fassara zuwa wani harshe, [[Fassarar subtitle|/translate.html]]."
    ]
   }
  ]
 },
 "how-to-make-lrc-file": {
  "seo": {
   "title": "Yadda ake daidaita waƙoƙin LRC – Layi ɗaya a kowace waƙa, danna tare – AI-SRTSub",
   "desc": "Gina fayil ɗin LRC daga farko: liƙa layi ɗaya a kowace waƙa, danna lokacin yayin da kake sauraro, gajerun hanyoyin da suka dace, lokacin da za a tsallake layi, LRC ko SRT, da abin da za a yi lokacin da lokacin ya karkace.",
   "h1": "Yadda ake daidaita waƙoƙin LRC",
   "intro": "Fayil ɗin LRC kawai \"layin waƙa ɗaya da kuma aya ɗaya ta lokaci\" ne. Yin ɗaya ana kiranta saita lokaci: ɗaukar lokacin da kowane layi ya fara.",
   "ctaText": "Buɗe kayan aikin daidaita waƙa"
  },
  "body": [
   {
    "h2": "Abin da lokaci yake a zahiri",
    "ps": [
     "Tsarin fayil ɗin LRC ba zai iya zama mai sauƙi ba: layi ɗaya a kowace waƙa, kowanne yana gab da `[mm:ss.xx]` alamar lokaci. Lokacin da ɗan wasa ya isa layi, yana nuna waƙar a lokacin.",
     "Don haka dukan aikin \"yin LRC\" shine sanya aya ta lokaci ga kowane layin waƙa - kuma babu wani na'ura da zai iya yi muku haka, saboda yanke shawara inda layin ya fara rera waƙa yana buƙatar sauraro."
    ]
   },
   {
    "h2": "Sau nawa waƙa ke buƙata",
    "ps": [
     "Yana da darajar minti ɗaya na tunani kafin ka fara; yana ceton yawancin sake yin aikin:"
    ],
    "img": {
     "file": "lrc-tap2",
     "alt": "Wasan, sanya hatimi a wannan layin, soke layi ɗaya da sarrafa tsallake wannan layin a yankin danna-tare",
     "cap": "Danna Maɓallin Shigar lokacin wasa shine mafi sauƙi; an sanya hatimi a layin da ba daidai ba? Danna Z kuma sake sanya hatimi"
    }
   },
   {
    "h2": "Liƙa waƙoƙin yana yanke shawara yadda sauran ke tafiya da sauƙi",
    "ps": [
     "Liƙa waƙoƙin layi ɗaya a kowace waƙa; ana tsallake layin da babu komai. Tsagewar layin da kuka liƙa sune layukan da zaku saita lokaci daga baya - raba su zuwa ƙarin layuka yanzu kuma zaku danna sau da yawa daga baya.",
     "Liƙa LRC da ke akwai yana aiki ma: ana gane alamomin lokaci `[mm:ss.xx]`, kuma bayan shigo da kaya kun **ci gaba daga layin farko ba tare da lokaci ba**, don haka ba dole the a sake yin layukan da aka riga aka saita lokaci ba.",
     "Wannan yana nufin za a iya adana LRC mai rabin gamawa a liƙa ta baya daga baya don ci gaba."
    ],
    "img": {
     "file": "lrc-paste2",
     "alt": "Yankin liƙa-waƙoƙi da maɓallin binciken-waƙoƙi",
     "cap": "Layi ɗaya a kowace waƙa; liƙa dukan LRC yana karanta lokutan da ke akwai don ku iya ci gaba"
    }
   },
   {
    "h2": "Fitar da LRC ko SRT",
    "ps": [
     "**Don ɗan wasan kiɗa, fitar da LRC.** foobar2000, duk nau'ikan 'yan wasa da na'urori masu nuna waƙa suna karanta shi.",
     "**Don sanya waƙoƙi akan bidiyo ko sarrafa su gaba, fitar da SRT.** Waƙoƙin subtitle na bidiyo, kayan aikin subtitle da software na gyarawa suna karanta SRT. A cikin fitarwa kowane layi yana ɗaukar har sai na gaba ya fara, kuma layin ƙarshe yana komawa baya zuwa daƙiƙa 2.",
     "Dukansu suna fitar da layukan da ke da lokaci kawai - ba a taba shigar da layukan da aka tsallake cikin fayil din ba."
    ],
    "img": {
     "file": "lrc-export",
     "alt": "Maɓallan zazzage-LRC, zazzage-SRT da kwafi a yankin fitarwa",
     "cap": "LRC don 'yan wasa, SRT don bidiyo; kawai layuka masu lokaci ake fitarwa"
    }
   },
   {
    "h2": "Abubuwa kaɗan da ke da sauƙin kuskure",
    "ps": [
     "**Komai ya dan karkace bayan saita lokaci? Yi amfani da diyya.** Fitar da SRT kuma canza shi gaba ɗaya tare da [[Daidaitawar lokaci|/shift.html]]; ya fi sauri sosai fiye da sake saita lokaci layi da layi.",
     "**Karkacewar tana ƙaruwa yayin da waƙar ke ci gaba? Wannan matsalar sauri ce.** Lokacin da saurin wasa da saurin rikodin suka bambanta, kuskuren yana ƙaruwa zuwa ƙarshe, kuma hakan yana buƙatar daidaitawa mai daidaituwa, ba diyya ba.",
     "**Gajerun hanyoyi suna jin na halitta ne kawai idan kun yi amfani da su tare.** Sarari yana kunnawa kuma yana dakatarwa, Shigar yana sanya hatimi a layin yanzu, Z yana soke layi ɗaya - danna Shigar kai tsaye yayin wasa maimakon sauyawa tsakanin linzamin kwamfuta da maɓalli.",
     "**Ingancin sauti yana shafar daidaito.** Tushen da ke da muryoyi bayyanannu yana da sauƙin bi; rikodin kai tsaye da tushe tare da waƙoƙin baya masu ƙarfi suna da wahala sosai."
    ]
   },
   {
    "h2": "Kayan aiki da jagorori masu alaƙa",
    "ps": [
     "Don cikakken bayani duba [[Yadda ake amfani da kayan aikin daidaita waƙa|/guides/lrc.html]]; don juya LRC da ke akwai zuwa subtitles duba [[LRC zuwa SRT|/guides/lrc-to-srt.html]]; idan SRT da aka fitar ba daidai ba ne lokacin amfani [[Daidaitawar lokaci|/shift.html]]; kuma gudanar da sakamakon ta [[Subtitle QC|/qc.html]]."
    ]
   }
  ]
 },
 "lrc": {
  "seo": {
   "title": "Kayan aikin daidaita waƙa – Loda waƙa, liƙa waƙoƙi, danna tare – AI-SRTSub",
   "desc": "Loda waƙa, liƙa waƙoƙin, danna alamar lokaci a kowace layi yayin da kake sauraro, kuma fitar da LRC ko SRT. Sarari yana kunnawa kuma yana dakatarwa, Shigar yana sanya hatimi a layin, Z yana soke, hannaye suna kan maballin.",
   "h1": "Yadda ake amfani da kayan aikin daidaita waƙa",
   "intro": "Loda waƙa, liƙa waƙoƙin, danna alamar lokaci ga kowane layi yayin da kake sauraro, kuma fitar da daidaitaccen LRC ko SRT. Ana kunna sautin a cikin gida kuma ba a taɓa loda shi ba.",
   "ctaText": "Buɗe kayan aikin daidaita waƙa"
  },
  "body": [
   {
    "h2": "Abin da wannan kayan aikin ke yi",
    "ps": [
     "Ba waƙa fayil ɗin waƙa wanda za a iya rera waƙa tare da shi: layi ɗaya a kowace waƙa, kowane layi yana dauke da aya ta lokaci. Masu kunna waƙa suna karanta LRC, waƙoƙin subtitle suna karanta SRT, kuma duka biyun ana iya fitar da su anan."
    ]
   },
   {
    "h2": "1 Loda waƙar",
    "ps": [
     "Ginshiƙi na farko a hagu yana ɗaukar fayil ɗin sauti: **MP3, M4A, FLAC, WAV da OGG** duk suna aiki. Ana kunna sautin a cikin gida kuma ba a taɓa loda shi ba.",
     "Ingancin sauti baya shafar daidaiton lokaci, amma tushen da muryoyi bayyanannu yana da sauƙin bi; rikodin kai tsaye da tushe tare da waƙoƙin baya masu ƙarfi suna da wahala sosai wajen daidaitawa."
    ],
    "img": {
     "file": "lrc-up",
     "alt": "Yankin loda-waƙa na kayan aikin daidaita waƙa",
     "cap": "MP3 / M4A / FLAC / WAV / OGG duk suna aiki, kuma ana kunna sautin a cikin gida kawai"
    }
   },
   {
    "h2": "2 Liƙa waƙoƙin",
    "ps": [
     "Liƙa waƙoƙin a ginshiƙi na biyu, **layi ɗaya a kowace waƙa**; ana tsallake layin da babu komai ta atomatik. Sa'an nan danna \"Parse lyrics\".",
     "Liƙa LRC da ke akwai yana aiki ma - ana gane alamomin lokaci `[mm:ss.xx]`, kuma bayan shigo da kaya kuna ci gaba daga layin farko ba tare da lokaci ba, don haka layukan da aka riga aka saita lokaci ba dole ba ne a sake yin su."
    ],
    "img": {
     "file": "lrc-paste",
     "alt": "Yankin liƙa-waƙoƙi da maɓallin binciken-waƙoƙi",
     "cap": "Liƙa layi ɗaya a kowace waƙa, ko liƙa dukan LRC kuma bari kayan aikin su karanta lokutan da ke akwai"
    }
   },
   {
    "h2": "3 Danna tare yayin da kake sauraro",
    "ps": [
     "Kunna waƙar kuma danna Shigar a lokacin da wani layi ya fara (ko danna \"Stamp this line\"); an rubuta lokacin don wannan layin kuma manuniya ta tsallake zuwa na gaba.",
     "Gajerun hanyoyi: **sarari** yana kunnawa kuma yana dakatarwa, **Shigar** yana sanya hatimi a layin yanzu, **Z** yana soke layi ɗaya. Danna Shigar yayin wasa ita ce hanya mafi sauƙi don yin aiki - babu sauyawa baya da gaba tsakanin linzamin kwamfuta da maɓalli.",
     "An sanya hatimi a layin da bai dace ba? Danna Z don soke shi kuma sake sanya hatimi. Idan ba kwa son sanya hatimi a layin kwata-kwata (hutun kayan kiɗa, wani sashe na kiɗa kawai), danna \"Skip this line\" kuma ba zai bayyana a cikin fitarwa ba."
    ],
    "img": {
     "file": "lrc-tap",
     "alt": "Wasan, sanya hatimi a wannan layin, soke layi ɗaya da sarrafa tsallake wannan layin a yankin danna-tare",
     "cap": "Sarari yana kunnawa kuma yana dakatarwa, Shigar yana sanya hatimi a layin yanzu, Z yana soke - hannaye suna kan maballin"
    }
   },
   {
    "h2": "4 Fitarwa",
    "ps": [
     "Ginshiƙi na huɗu yana yin fitarwa: **Zazzage LRC** don masu kunna waƙa, **Zazzage SRT** don waƙoƙin subtitle na bidiyo, ko \"Copy\" don ɗaukar rubutun kai tsaye.",
     "Layuka masu lokaci kawai ake fitarwa; ba a taɓa shigar da layukan da aka tsallake cikin fayil din ba. A cikin fitarwar SRT kowane layi yana ɗaukar har sai na gaba ya fara, kuma layin ƙarshe yana komawa baya zuwa daƙiƙa 2."
    ],
    "img": {
     "file": "lrc-out",
     "alt": "Maɓallan zazzage-LRC, zazzage-SRT da kwafi a yankin fitarwa",
     "cap": "LRC don 'yan wasa, SRT don bidiyo; kawai layuka masu lokaci ake fitarwa"
    }
   },
   {
    "h2": "Abin da aka bari ba a taɓa ba",
    "ps": [
     "Ba a sake rubuta rubutun waƙar ba. Saitin lokaci yana ƙara wuri ɗaya kawai na lokaci a kowane layi kuma baya taɓa kalmomin da kuka liƙa.",
     "Lokacin da kuka shigo da LRC da ke akwai, layukan da suka riga sun dauke da alamar lokaci suna kiyaye lokacin su na asali kuma kuna sanya hatimi kawai daga layin farko da ba a saita masa lokaci ba gaba."
    ]
   },
   {
    "h2": "Tambayoyin da ake yawan yi",
    "ps": [
     "**Me yasa wasu layuka suka rasa daga fitarwa?** Layukan da aka tsallake da layukan da ba su da lokaci ba sa shiga cikin fayil ɗin ba. Komawa mataki na uku kuma ƙara su, ko tabbatar an yi nufin tsallake su.",
     "**Za a iya canza lokutan bayan haka?** Idan kuna son canza komai ɗan kadan bayan sanya hatimi, fitar da SRT kuma yi amfani da [[Daidaitawar lokaci|/shift.html]] don rama ko daidaita shi duka gaba ɗaya.",
     "**LRC ko SRT — wanne zan fitar da shi?** LRC don masu kunna kiɗa (foobar2000, abokan ciniki masu yawo, duk nau'ikan masu kunna waƙa); SRT lokacin da waƙoƙin dole ne su zauna akan bidiyo ko a sarrafa su gaba tare da kayan aikin subtitle.",
     "**Tsawon lokacin da waƙa ɗaya ke ɗauka?** Ya dogara da adadin layukan da ake da su da kuma irin daidaiton da kake so. Don waƙar layuka talatin ko arba'in, mintuna kaɗan a kowane zagaye da zaran kun san kwararar; bin diddigin daidaiton matakin kalma yana ɗaukar lokaci mai tsawo."
    ]
   },
   {
    "h2": "Sirri",
    "ps": [
     "Ana sarrafa sauti da waƙoƙi gaba ɗaya a cikin burauzar: babu abin da ake lodawa kuma babu abin da ke wucewa ta uwar garken. Ana lalata sautin kuma ana kunna shi a cikin gida kawai."
    ]
   },
   {
    "h2": "Kayan aiki da jagorori masu alaƙa",
    "ps": [
     "Idan kun riga kun sami LRC kuma kuna son subtitles duba [[LRC zuwa SRT|/guides/lrc-to-srt.html]]; don tunani da matsalolin da ke bayan saita lokaci duba [[Yadda ake daidaita waƙoƙin LRC|/guides/how-to-make-lrc-file.html]]; idan SRT da aka fitar bai yi daidai ba yi amfani [[Daidaitawar lokaci|/shift.html]]; kuma gudanar da sakamakon ta [[Subtitle QC|/qc.html]]."
    ]
   }
  ]
 },
 "lrc-to-srt": {
  "seo": {
   "title": "Mai Juya LRC zuwa SRT – Juya Waƙoƙi Su Zama Subtitles – AI-SRTSub",
   "desc": "Canza waƙoƙin LRC zuwa subtitles na SRT: kowace layi tana ɗaukar har sai na gaba ta fara, layin ƙarshe yana samun daƙiƙa 3. Waƙoƙin da suka wuce mintuna 60 ana karanta su daidai. Yana gudana a cikin burauzar ku.",
   "h1": "LRC zuwa SRT",
   "intro": "Juya fayilolin waƙa na LRC zuwa SRT: sauke fayil ɗin, zaɓi SRT, zazzagewa. Ana cika lokutan ƙarshe daga layin na gaba ta atomatik.",
   "ctaText": "Canza LRC → SRT"
  },
  "body": [
   {
    "h2": "Yadda LRC ta bambanta da SRT",
    "ps": [
     "LRC tsarin waƙa ne: kowane layi yana ɗauke da lokacin \"fara rera waƙa\" kawai a cikin `[minutes:seconds.cents]` kuma **babu lokacin ƙarshe**; kowane alamar SRT yana buƙatar farko da ƙarshe. Don haka jigon jujjuyawar shine cika lokutan ƙarshe."
    ],
    "img": {
     "file": "convert-upload-lrc",
     "alt": "Yankin lodawa: an loda fayil ɗin LRC, an gano shi azaman LRC",
     "cap": "An gano fayil ɗin waƙa tare da [00:12.50] alamomin lokaci azaman LRC nan take"
    }
   },
   {
    "h2": "Yadda ake cika lokutan ƙarshe",
    "ps": [
     "Dokar tana da sauƙi: **kowace layi tana ɗaukar har sai na gaba ta fara**; layin ƙarshe ba shi da \"na gaba\", don haka yana samun daƙiƙa 3. Hakanan, alamomin lokaci na LRC suna ɗaukar mintuna da daƙiƙa kawai - babu sa'o'i - kuma fagen minti baya wucewa (62:05 yana nufin sa'a 1 minti 2 daƙiƙa 5), don haka waƙoƙi masu tsayi sosai kamar haɗakar DJ suna karanta daidai."
    ]
   },
   {
    "h2": "Yadda ake canzawa",
    "ps": [
     "Buɗe [[mai canzawa|/convert.html]], sanya LRC a ciki, zaɓi **SRT - SubRip** azaman fitarwa, sannan canza kuma zazzagewa. Yana da amfani ga bidiyon kiɗa da kuma sanya waƙoƙi azaman subtitles a cikin 'yan wasa; ana iya sake canza SRT da aka fitar zuwa VTT don yanar gizo."
    ]
   }
  ]
 },
 "make-bilingual-subtitles": {
  "seo": {
   "title": "Hanyoyi Biyu na Yin Subtitle Mai Harshe Biyu – AI-SRTSub",
   "desc": "Subtitles masu harshe biyu suna zuwa ta siffofi biyu: layuka biyu a cikin wani alama ɗaya, ko alamomi biyu akan lokaci guda. Amfani, rashin amfani, da yadda ake sauyawa tsakaninsu. – AI-SRTSub",
   "h1": "Hanyoyi Biyu na Yin Subtitle Mai Harshe Biyu",
   "intro": "Harshe biyu na subtitle guda na iya ɓoye tsare-tsare biyu daban-daban gaba ɗaya. Koyi bambance su, da yin, raba, da jujjuya su duk su daina dame ku.",
   "ctaText": "Yi aiki tare da subtitles masu harshe biyu"
  },
  "body": [
   {
    "h2": "Abin da Siffofin Biyu Suke Kama",
    "ps": [
     "**Siffa ta B: alamomi biyu akan lokaci guda.** Layin tattaunawa ɗaya ya zama alamomin subtitle guda biyu daban-daban tare da lokaci iri ɗaya - ɗaya Turanci, ɗaya Sinanci - waɗanda aka zana a saman juna. Wannan ita ce hanya mafi gama gari da ake gina subtitles masu harshe biyu na ASS."
    ]
   },
   {
    "h2": "Inda Kowanne Yake Gazawa",
    "ps": [
     "Raunin Siffa ta A shine **ganowa**: raba waƙoƙin ya dogara ne akan tsarin rubutu, don haka nau'ikan Sinanci-Turanci ko Jafananci-Turanci suna rabuwa a kallo ɗaya, yayin da **haɗin gwiwa da ke raba rubutu guda ɗaya** - Turanci da Faransanci, ko Sinanci da kanji na Jafananci - ba za a iya bambanta su ba. Raunin Siffa ta B shine **samarwa**: lokuttan biyu dole ne su yi daidai da daidaita su da hannu yana da gajiya; wasu 'yan wasa kuma suna zana alamomin lokaci guda biyu, suna cika allo. Dokar batsa: yi amfani da Siffa ta A don gama-gari da aka nufa wa masu kallo; yi amfani da Siffa ta B lokacin da kake buƙatar fitar da waƙoƙin daban don ƙarin aiki."
    ]
   },
   {
    "h2": "Hanyoyin Biyu",
    "ps": [
     "**Gina subtitles masu harshe biyu daga asali**: yi amfani da [[AI Subtitle Translation|/translate.html]] kuma zaɓi \"Bilingual · original on top\" ko \"Bilingual · translation on top\" yayin fitarwa - kuna samun Siffa ta A kai tsaye; zaɓar ASS kuma yana ba da tsare-tsare biyu, \"stacked top and bottom\" da \"two lines at the bottom\".",
     "**Haɗa waƙoƙi biyu ko juya tsakanin siffofi**: yi amfani da [[Bilingual Subtitle Stripper|/bilingual.html]] da yanayin sa na \"merge into one two-line entry\" - Siffa ta B a ciki, Siffa ta A a waje; tafiya ta wata hanyar, \"split into two files\" yana ɗaukar Siffa ta A ko B a ciki kuma yana ba da waƙoƙi biyu masu zaman kansu a waje."
    ],
    "img": {
     "file": "bilingual-modes",
     "alt": "Hanyoyin huɗu na mai cire harshe biyu; \"merge into one two-line entry\" yana haɗa alamomi biyu da ke raba lokaci",
     "cap": "\"Merge into one two-line entry\": Siffa ta B ta zama Siffa ta A"
    }
   },
   {
    "h2": "Wane Na'ura Ne Zai Kunna Shi",
    "ps": [
     "'Yan wasan yanar gizo (HTML5 ``) da yawancin 'yan wasan hannu suna sarrafa Siffa ta A da aminci; 'yan wasan kwamfuta (VLC, mpv, PotPlayer) suna karɓar duka biyu kuma har ma suna iya ba da alamomin lokaci guda biyu launi da matsayi daban-daban. Idan kuna shakka, fitar da Siffa ta A azaman SRT - yana tafiya mafi kyau. Don bambance-tsakanin tsare-tsare da kansu, duba [[SRT, VTT or ASS: Which Should You Use|/guides/subtitle-format-comparison.html]]."
    ],
    "img": {
     "file": "translate-export",
     "alt": "Zaɓuɓɓukan salon harshe biyu a cikin kwamitin fitarwa na kayan aikin fassarar",
     "cap": "Zaɓi tsarin layin harshe biyu daidai lokacin fitarwa - mataki ɗaya kuma an gama"
    }
   },
   {
    "h2": "Tambayoyi da Amsoshi",
    "ps": [
     "**Subtitles masu harshe biyu suna da ban tsoro - me zan iya yi?** Sarrafa faɗin layin: kwamitin fitarwa na kayan aikin fassarar yana da saitin \"bilingual line width\"; layin da ya fi kunkuntar yana nufin haruffa kaɗan a kowane alama da allo mai tsafta.",
     "**Ina son waƙa ɗaya kawai.** Mai cirewa na \"keep original only / keep translation only\" yana sarrafa shi a danna ɗaya, duba [[Split Bilingual Subtitles into Two Tracks|/guides/split-bilingual-subtitles.html]]."
    ]
   }
  ]
 },
 "merge": {
  "seo": {
   "title": "Hadewa da sanyin harsuna biyu da ƙawata ƙasar fure – Ƙawata, sauya fasali, fitarwa – AI-SRTSub",
   "desc": "Haɗa fayilolin ƙaramin take biyu zuwa saitin harsuna biyu, sake gyara fasalin wani fayil mai harsuna biyu, ko ƙawata wanda yake da yare guda: hanyoyin haɗawa, samfuran ASS da VTT, da kuma wane tsari za a fitar.",
   "h1": "Yadda ake amfani da haɗakar harsuna biyu da ƙananan rubutun tasiri na musamman",
   "intro": "Haɗa fayilolin ƙaramin take guda biyu zuwa cikin waƙa mai harsuna biyu, ko kuma ka ƙawata ƙananan rubutu kai tsaye: girma, launi, zane da matsayi suna da sauƙin gani da gaske, kuma samfoti ya yi daidai da fitarwa.",
   "ctaText": "Buɗe kayan aikin ƙaramin rubutu mai tasiri na musamman"
  },
  "body": [
   {
    "h2": "Abin da wannan kayan aikin ke yi",
    "ps": [
     "Wannan shafin guda ɗaya yana rufe ayyuka uku a zahiri: haɗa fayil ɗin ƙaramin take na asali da wanda aka fassara zuwa fayil guda ɗaya mai harsuna biyu, daidaita tsari da salo na fayil wanda riga yana da harsuna biyu, da kuma ƙara tasiri na musamman zuwa fayil mai yare guda. Duk ukun suna raba sigogi iri ɗaya da samfoti iri ɗaya."
    ]
   },
   {
    "h2": "Ayyuka uku, shafi ɗaya",
    "ps": [
     "Sama da shafin yana da shafuka uku: **Haɗa fayiloli biyu**, **Daidaita fayil mai harsuna biyu**, **Fayil mai yare guda**. Zabin ku yana yanke shawarar ginshiƙan shigarwa nawa ne ke bayyana a hagu.",
     "Lokacin haɗa fayiloli biyu, gefen hagu yana da ginshiƙai biyu, \"1 Ƙananan rubutu na asali\" da \"2 Ƙananan rubutu da aka fassara\"; kowanne yana karɓar fayil da aka loda ko rubutu da aka manna kai tsaye. Daidaita fayil mai harsuna biyu da ƙawata fayil mai yare guda kowanne yana buƙatar ginshiƙi guda ɗaya kacal."
    ],
    "img": {
     "file": "merge-mode",
     "alt": "Shafuka uku a saman kayan aikin ƙaramin rubutu mai tasiri da yankin shigarwa a hagu",
     "cap": "Shafuka uku a sama; zaɓen \"Haɗa fayiloli biyu\" yana kawo asali da ginshiƙi da aka fassara a hagu"
    }
   },
   {
    "h2": "Yadda ake haɗa fayiloli biyu",
    "ps": [
     "Abu na farko ƙarƙashin \"3 Saitunan haɗawa\" shine yanayin haɗawa: **Haɗa ta tsari · yi amfani da lokacin asali**, **Haɗa ta lokaci · yi amfani da lokacin asali**, **Haɗa ta tsari · yi amfani da lokacin fassarar**.",
     "Lokacin da fayilolin biyu suka sami adadin abubuwa daidai a cikin tsari guda, haɗawa ta tsari shine mafi aminci. Lokacin da adadin ya bambanta (gefe ɗaya ya haɗa abubuwa, dayan ya raba su), haɗa ta lokaci kuma bar kayan aikin ya dace ta hanyar kusanci. Wanne lokacin da za a yi amfani da shi ya dogara da wane fayil ne ya fi daidai — galibi na asali.",
     "A ƙasa da wannan shine tsarin rubutu (gano ta atomatik / layuka biyu kowace shigarwa / madadin nau'o'i) da tsari (na asali a sama / fassarar a sama)."
    ],
    "img": {
     "file": "merge-pair",
     "alt": "Yanayin haɗawa, tsarin rubutu da zaɓuɓɓukan tsari a ƙarƙashin saitunan haɗawa",
     "cap": "Yanayin haɗawa yana yanke shawarar wane layin ke tafiya da wanne, kuma wane lokacin da za a yi amfani da shi an saita shi anan ma"
    }
   },
   {
    "h2": "Daidaita kayan salo abu bayan abu",
    "ps": [
     "Kwamitin salon yana zaune a dama. Lokacin da kuka fitar da ASS, toshe \"Bayyanar ASS\" ya shafi: shimfidawa (raba · raba sama da ƙasa / ɗora · layuka biyu a ƙasa), girma, launi, haske, harafi, mai ƙarfi, lafazin kwance, tazaran haruffa, zane, launi na zane, inuwa/bango (babu / inuwa / bango), zurfi, launi na baki, hasken baki, daidaitawar kwance (ƙasa · hagu / ƙasa · tsakiya / ƙasa · dama) da nisa daga ƙasan layin fassarar (na farko), tare da harafi, inuwa/bango da gefen hagu/dama na layin asali (na biyu).",
     "Lokacin da kuka fitar da salo na VTT mai harsuna biyu, toshe \"Saitin WebVTT\" ya shafi: saman abubuwa shida (daidai / a haɗe / sinima / sama / mai sauƙin shiga / tsaye) zaku iya canza layin tsaye, angarar (ƙasa / sama / tsakiya), matsayin kwance, girmman faɗi, ƙimar daidaitawa da tsayin layin duka cue, tare da launin bango, hasken bango da faɗin zane na layin fassarar; layin asali na iya gado babban salo ko a saita shi daban.",
     "Lokacin da kuka gama zaku iya adana sakamakon azaman tsari kuma ku sake amfani da shi daga baya ta hanyar zaɓar shi ƙarƙashin \"Daga abubuwan da aka adana\" da danna \"Aiwatar\"."
    ],
    "img": {
     "file": "merge-style",
     "alt": "Sigogin kwamitin bayyanar ASS a dama",
     "cap": "Girma, launi, zane, inuwa/bango da daidaitawa duk suna da daidaitawa, kuma ana iya adana sakamakon azaman tsari"
    }
   },
   {
    "h2": "Bincika samfoti kafin fitarwa",
    "ps": [
     "\"Samfotin haɗawa\" tebur ne: #, lokaci, na asali, fassarar, salo. Sandar da ke sama tana tace layuka masu shakku ta \"yana da tasirin sauti\", \"yana da prefix na mai magana\", \"ya fi daƙiƙa 1 gajere\", \"fiye da layuka biyu\" da \"saurin karatu ya wuce\", ko ta kalmar maɓalli da kuka buga.",
     "Danna ramin salon jere yana faɗaɗa editan wannan ramin kuma yana lissafa kawai layukan da ke amfani da shi; \"Share duk abubuwan da aka wuce\" yana dawo da kowane bayanin hannu zuwa samfurin. Yankin daidaitawar lokaci a ƙasa yana kula da biyan kuɗi na duniya (daga wani cue da aka ba) da sikelin daidaitawa.",
     "Da zarar ya yi daidai, je zuwa \"4 Fitarwa\": zazzage fayil ɗin ƙaramin take ko kwafi abubuwan da ke ciki."
    ],
    "img": {
     "file": "merge-preview",
     "alt": "Tebur samfotin haɗawa da sandar tace ta",
     "cap": "Samfotin shine fitarwa; tace layuka masu shakku ta nau'i ko faɗaɗa ramin salo guda ɗaya"
    }
   },
   {
    "h2": "Abin da aka bari ba a taɓa shi ba",
    "ps": [
     "Canjin salo yana canza bayyanar kawai, ba zance ba. Rubutun asali da fassarar ba a canza su da harafi ɗaya ba yayin haɗawa; sai dai idan kun canza shi da gangan a yankin daidaitawa a ƙasa da samfoti, lokacin yana zuwa daga fayil ɗin da kuka zaɓa.",
     "Lokacin da kuka fitar da SRT ko \"VTT ba tare da salo ba\", ba a rubuta bayanin salo a cikin fayil ɗin ba — shafin yana gaya muku cewa VTT ba shi da tubalin STYLE kuma ɗan wasan zai yi amfani da bayyanarsa ta tsohuwa. Idan kuna son salo, zaɓi salo na VTT mai harsuna biyu ko ASS."
    ]
   },
   {
    "h2": "Tambayoyi gama gari",
    "ps": [
     "**Idan fayilolin biyu suna da adadin shiga daban-daban fa?** Yi amfani da \"Haɗa ta lokaci\" kuma kayan aikin suna dace da kusanci; shigarwar da ba zai iya dace da su ba ba a ƙirƙira su ba.",
     "**Idan ɗan wasa ya yi watsi da salo a cikin ASS da aka fitar fa?** Ana adana salon a cikin fayil ɗin, amma goyon bayan ɗan wasa don ASS ya bambanta. Idan kuna buƙatar kyan gani mai sauƙin ɗauka, fitar da salo na VTT mai harsuna biyu.",
     "**Yaya zan koma zuwa samfurin farko bayan na lalata shi?** \"Mayar da sigogin tsohuwa\" a cikin tubalin ASS da \"Mayar da tsohuwar samfurin\" a cikin tubalin VTT kowanne yana sake saita nasa sashe.",
     "**Menene layuka bakwai a cikin samfurin?** Misali ne da aka gina a ciki, kawai a can ne domin ku ga abin da haɗakar ke gani; ba za a iya fitar da samfurin ba. Loda ƙananan rubutun ku kuma danna samfotin haɗawa kuma an maye gurbin su ta atomatik."
    ]
   },
   {
    "h2": "Keɓantawa",
    "ps": [
     "Ana aiwatar da ƙananan rubutu gaba ɗaya a cikin burauza: ba a loda komai ba kuma babu abin da ke wucewa ta uwar garken. Rufe burauza kuma komai daga wannan zaman ya tafi."
    ]
   },
   {
    "h2": "Kayan aiki masu alaƙa da jagorori",
    "ps": [
     "Don raba fayil mai harsuna biyu baya zuwa waƙoƙi biyu yi amfani da [[Rabe-raben harsuna biyu|/bilingual.html]]; don tafiya ta ɗaya bangaren kuma juya yare ɗaya zuwa fayil mai harsuna biyu duba [[Hanyoyi biyu na yin ƙananan rubutu masu harsuna biyu|/guides/make-bilingual-subtitles.html]]; gudanar da sakamakon ta [[QC na Ƙaramin Take|/qc.html]]; don kakar wasa gaba ɗaya lokaci ɗaya yi amfani da [[Canjin rukuni|/batch.html]]."
    ]
   }
  ]
 },
 "qc": {
  "seo": {
   "title": "Yadda Ake Amfani da QC na Ƙaramin Take – Binciken Lokaci & Tsari – AI-SRTSub",
   "desc": "QC na Ƙaramin Take: dokoki 17 suna kama ruɗewa, faɗin layi, saurin karatu da alamomin rubutu, iyakoki ga kowace harsuna 27. Rabin gyare-gyare ne na latsa ɗaya; zazzage rahoton.",
   "h1": "Yadda Ake Amfani da QC na Ƙaramin Take",
   "intro": "Kafin ka miƙa ƙananan rubutu, gudanar da su ta shafin QC don lokaci da tsari: abin da ake bincika, yadda ake karanta rahoton, da kuma wace matsala za a iya gyarawa da latsa ɗaya — duk an rufe anan.",
   "ctaText": "Buɗe QC na Ƙaramin Take"
  },
  "body": [
   {
    "h2": "Abin da Wannan Kayan Aikin Ke Yi",
    "ps": [
     "Ƙananan rubutu waɗanda ke da kyau a idanuwan zahiri galibi suna fitowa da lokutan da suka haɗu, layuka masu faɗi sosai, ko saurin karatu mai yawa da zarar an kawo su. Shafin QC yana lissafa waɗannan matsalolin ɗaya bayan ɗaya:"
    ]
   },
   {
    "h2": "Zaɓi Dokokin Harshe Da Farko",
    "ps": [
     "Ƙarƙashin “Bincika ta dokokin wane harshe” kun saita iyakoki biyar: **mafi girman faɗin layi ɗaya** (raka'a rabin faɗi 42 don fadi ta tsohuwa, 36 don murabba'i, 28 don hoto), **iyakan saurin karatu** (raka'a masu faɗi 18 a kowace daƙiƙa don Sinanci, Japananci da Koriya, 20 don sauran harsuna), **mafi ƙarancin tsawon milisakan 833**, **mafi girman tsawon milisakan 7000**, da **aƙalla layuka 2**. Saita harshen ƙaramin take don gano ta atomatik ko zaɓi ɗaya daga cikin 27 da hannu; fuskantar allo yana canza nauyin faɗin layi kawai — saurin karatu, tsawon lokaci da lissafin layi suna nan yadda suke. Raka'a rabin faɗi ita ce ma'auni na gama-gari: harafin hanzi ɗaya yana ƙidaya azaman 2, harafin Latin ɗaya azaman 1 — faɗin layi na 42 yayi daidai da hanzi 21 ko haruffa 42."
    ],
    "img": {
     "file": "qc-rules",
     "alt": "Saitunan QC: akwatunan shigarwa na iyaka biyar ƙari da harshen ƙaramin take da saukowar fuskantar allo",
     "cap": "Iyakoki biyar + harshe + fuskantar allo; tsoffin suna dace da aikin masana'antu na gama-gari"
    }
   },
   {
    "h2": "Karanta Rahoton",
    "ps": [
     "Rahoton dokoki 17 yana ba da rahoton binciken a mataki uku: **kuskure** (rubutu mai ruɗewa, tsarin alamar lokaci, ƙarshe da wuri fiye da farawa, lissafin da ya karye), **gargaɗi** (shigarwa mara komai, abubuwan da suka haɗu, tsawon lokaci mai gajere ko mai tsayi sosai, saurin karatu sama da iyaka, layuka masu faɗi sosai, fiye da layuka biyu), da **shawarwari** (matsayin karyewar layi, wuraren da ke gaba ko baya, wuraren da suka ɓace, ƙa'idodin alamomin rubutu, da ƙari). Kowane bincike yana ɗauke da lambar shigarwa da cikakken bayani na “awo X, iyaka Y”, kuma ana iya tace lissafin ta mataki. Shigarwar harsuna biyu suna samun rangwame: ana gano nau'ikan biyu ta atomatik, binciken haɗuwa yana ba da rangwame ga duka biyu, kuma saurin karatu yana ƙidaya layin da aka rubuta a harshen da ake nufa kawai."
    ],
    "img": {
     "file": "qc-report",
     "alt": "Yankin rahoton QC: binciken da aka haɗa ta kuskure, gargaɗi da shawara, kowanne da lambar shigarwa da ƙimar da aka awo",
     "cap": "Rahoto mai mataki uku: kowane bincike yana ɗauke da lambar shigarwa da ƙimar da aka awo/iyaka"
    }
   },
   {
    "h2": "Gyarawa da Fitarwa",
    "ps": [
     "Katin “Gyara & fitarwa” yana lissafa abubuwa **masu sauƙin gyarawa ta atomatik** kaɗai: sake nannade, cire shigarwa mara komai, ƙara wuraren da suka ɓace, maye gurbin alamomin rubutu bisa ƙa'idodin harshe, sake lissafi — duk abin da ya bar lokacin bai taɓa ba an duba shi ta tsohuwa; **abubuwan da ke canza lokaci** (musayar farawa da ƙarshe, canza haɗuwa, yankewa ko shimfiɗa tsawon lokaci) ba a duba su ba ta tsohuwa — duba su bayan bincika tasirin da kanka. Danna “Aiwatar da gyare-gyare” kuma bincike sabo yana gudana ta atomatik; mai ƙidayar tana ƙidaya abin da aka gyara da gaske kawai — layukan da ba za a iya sake nannade su ba ba a ƙara su cikin lambobin ba. **Saurin karatu sama da iyaka ba shi da gyara ta atomatik**: na'urar ba za ta iya sanin wane kalma za ta yanke ba, don haka dole ne a taƙaita fassarar da hannu ko kuma a daidaita lokacin. Bayan gyarawa, fitar da SRT ko VTT, ko danna “Zazzage rahoto” don adana rahoton rubutu mai sauƙi na `qc.txt`."
    ],
    "img": {
     "file": "qc-fix",
     "alt": "Katin gyara: akwatunan duba don abubuwan da za a iya gyarawa ta atomatik da maɓallin Aiwatar da gyare-gyare",
     "cap": "Abubuwan da za a iya gyarawa ta atomatik kaɗai ke shiga jerin; gyare-gyaren canza lokaci ba a duba su ba ta tsohuwa"
    }
   },
   {
    "h2": "Tambayoyi da Amsoshi",
    "ps": [
     "**Me yasa ba za a iya fitar da ASS na ba?** QC tana fitar da SRT da VTT kawai; ASS tana shiga amma ba ta fitowa. Don kiyaye tasirin ASS, yi tunani akai a [[Mai Juyar da Tsari|/convert.html]] da farko.",
     "**Menene ma'anar saurin karatu na 18?** Don Sinanci, Japananci da Koriya iyakar ita ce haruffa 9 masu cike da faɗi a kowace daƙiƙa (raka'a rabin faɗi 18); sauran harsuna suna samun raka'a rabin faɗi 20 a kowace daƙiƙa. Waɗannan su ne matakan jin daɗi na gama-gari, kuma akwatin shigarwa yana ba ku damar canza su.",
     "**An lalata lambar fayil dina — ana iya bincika ta?** QC tana karanta UTF-8 kawai; gyara lambar a shafin gyaran rubutu da aka lalata da farko.",
     "**Zai taɓa lokacina?** Muddin kuka bar rukunin “canza lokaci” ba a duba shi ba; ko da lokacin da aka duba shi, kowane canji ana bayyana shi kafin a yi amfani da gyarawa."
    ]
   },
   {
    "h2": "Jagorori Masu Alaƙa",
    "ps": [
     "Ƙananan rubutu suna walƙiya da sauri don karantawa — duba jagorar da aka keɓe [[Subtitles Too Fast to Read|/guides/subtitle-too-fast.html]]. Abin da za a bincika kafin isarwa — jerin abubuwan bincike yana nan a [[What to Check Before Delivery|/guides/subtitle-quality-check.html]]. Lokacin da ya karkace daga daidaita shine nau'in matsala daban — duba [[Subtitles Drifting Out of Sync|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "remove-subtitle-ads": {
  "seo": {
   "title": "Cire Tallace-tallace & Alamomin Ruwa daga Ƙananan Rubutu – AI-SRTSub",
   "desc": "Cire alamomin ruwa da tallace-tallace daga ƙananan rubutu: adireshin yanar gizo, yabo na ƙungiyar fassara da alamun wanda aka tsara ana share su cikin latsa ɗaya, tare da shigarwa iri ɗaya da mara komai. – AI-SRTSub",
   "h1": "Cire Tallace-tallace da Alamomin Ruwa daga Ƙananan Rubutu",
   "intro": "Adireshin yanar gizo, yabo da shigarwar talla da aka ɓoye a cikin ƙananan rubutun ku ana share su cikin wucewa ɗaya ta dokokin alamomin ruwa na mai tsaftacewa — kuma duk wani kuskuren sharewa ana iya dawo da shi shigarwa bayan shigarwa.",
   "ctaText": "Tsabtace alamomin ruwa na ƙaramin take"
  },
  "body": [
   {
    "h2": "Wadannan alamomin ruwa menene su",
    "ps": [
     "Ƙananan rubutu da aka zazzage ta intanet galibi suna samun ƙarin shigarwa a farko ko ƙarshe (wani lokacin a tsakiya ma): adireshin yanar gizo, adiresoshin imel, sunayen rukunin fassara, yabo na `encoded by` / `translated by`, sunayen shafuka kamar opensubtitles, da layuka kamar “bi asusun mu na WeChat” ko “don dalilan nazari kawai”. Shigarwar ƙaramin take ce ta al'ada — tare da lokaci, suna ɗaukar layi — don haka ‘yan wasa ba za su iya cire su ba; dole ne a gano su ta hanyar abun ciki."
    ]
   },
   {
    "h2": "Inda za a yi shi",
    "ps": [
     "Buɗe [[Subtitle Cleaner|/clean.html]] kuma jefa ƙaramin taken ku; rukunin “Alamomin ruwa & shigarwar shara” riga yana da “Cire alamomin ruwa da tallace-tallace”, “Cire shigarwa iri ɗaya” da “Cire shigarwa marasa komai” an duba su ta tsohuwa, kuma tsaftacewa tana farawa ta atomatik. Gano yana aiki a mataki biyu: **maƙasudan sigina** kamar adiresoshin yanar gizo, imel, rukunin fassara da sunayen shafuka suna share dukkan shigarwar kan wani bugu a kowane tsayi; **sigina masu laushi** kamar alamomin @, yabon “encoded” ko “proofread” ana hukunta su ne kawai a cikin ɗ gajeren shigarwa na haruffa ba fiye da 40 ba, don guje wa yanke dogon zance. Shigarwa masu harsuna biyu suna fara cire layukan alamar ruwa layi bayan layi yayin da ake riƙe layukan zance; ana share shigarwar gaba ɗaya ne kawai idan alamun alamar ruwa suka rage bayan cirewa."
    ],
    "img": {
     "file": "clean-opts",
     "alt": "Allon zaɓuɓɓukan tsaftacewa: akwatunan duba guda uku na rukunin alamomin ruwa da shigarwar shara",
     "cap": "Rukunin “Alamomin ruwa & shigarwar shara” yana aiki ta tsohuwa — babu buƙatar saitin hannu"
    }
   },
   {
    "h2": "Sake Dubawa da Fitarwa",
    "ps": [
     "A cikin jerin canje-canje, kowane shigarwa da aka share yana ɗauke da alamar “alamar ruwa & talla” — duba shi don tabbatar da cewa babu abin da aka cire da kuskure; idan ɗaya ya yi kuskure, danna “Mayar da shi” don dawo da shi. Da zarar an tabbatar, zazzage: sunan fayil ɗin yana samun alamar `.clean` ta atomatik. Tsaftacewa tana gudana a cikin burauza ta gida; ba a tura ƙananan rubutun ku ko ina ba."
    ]
   }
  ]
 },
 "repair": {
  "seo": {
   "title": "Yadda Ake Gyara Ƙananan Rubutu na Mojibake – Gano Lambar – AI-SRTSub",
   "desc": "Tafiya ta mataki-mataki: gano lambar asali (GBK / Big5 / Shift_JIS / EUC-KR), sanya gyare-gyare ta abin da yafi karanta kamar harshe, sannan a adana UTF-8 tare da BOM ko GBK. Lokaci da lambobin nuni ba sa canzawa kowane iri.",
   "h1": "Yadda ake gyara ƙananan rubutu na mojibake",
   "intro": "Fayil ɗin ƙaramin take da ke cike da haruffa marasa amfani ba kasafai yake lalacewa ba — kawai an karanta shi ne da lambar da ba daidai ba. Kayan aikin gyarawa suna gano lambar asali kuma suna dawo da madaidaitan haruffa, suna barin lambobin nuni da lokuta a matsayin su.",
   "ctaText": "Buɗe kayan aikin gyara mojibake"
  },
  "body": [
   {
    "h2": "Abin da wannan kayan aikin ke yi",
    "ps": [
     "Irin waɗannan bayanan da aka karanta azaman UTF-8 da aka karanta azaman GBK suna samar da saitin haruffa biyu daban-daban gaba ɗaya — ba a lalata fayil ɗin ba, an yanke shawarar lambar da ba daidai ba. Ga abin da kayan aikin gyarawa ke yi:"
    ]
   },
   {
    "h2": "Loda fayil ɗin, kar a manna shi",
    "ps": [
     "Wuraren shigarwa guda biyu na iya gyara adadin lalacewa daban-daban, don haka **loda fayil ɗin idan za ku iya**. Tare da fayil, bayanan asali suna nan tukuna: kayan aikin suna gwada lamba ɗaya bayan wata, kuma da zaran ta gane GBK tana yanke shawarar azaman GBK — babu abin da ake buƙatar tunani. Rubutun da ya zo ta hanyar mannewa ba bayanan da ba a sarrafa su ba ne. Lokacin da burauza ta ba da kirtani, kuskuren ya riga ya faru, don haka kayan aikin na iya aiki baya kawai kuma ya ɗauki abin da ya samu.",
     "Idan rubutun da aka manna ya riga ya ƙunshi harafin maye gewa (wannan alamar tambaya da aka rufe a cikin akwati ``), bayanan asali sun daɗe da tafiya kuma babu abin da zai iya dawo da su. Shafin yana cewa hakan fili: koma sama kuma yi amfani da \"Zaɓi fayil\" don loda na asali."
    ],
    "img": {
     "file": "repair-up",
     "alt": "Yankin lodin shafin gyarawa: yankin jefa da akwatin manna, tare da lambar da aka gano a sama",
     "cap": "Ja fayil ɗin ciki ko bincika shi; akwatin manna yana zaune a ƙasa kuma zai iya gyara ƙarancin abu sosai"
    }
   },
   {
    "h2": "Abin da binciken ke faɗa muku",
    "ps": [
     "Da zaran kun loda, katin bincike yana ba da hukunci. **Ba a sami mojibake ba**; idan ɗan wasan ku yana nuna shara har yanzu, ɗan wasan ya yi amfani da lambar da ba daidai ba — sauka zuwa \"Ajiye azaman\", zaɓi wani daban kuma ba shi wannan fayil ɗin. Lokacin da ya **yi kama da mojibake**, katin yana lissafa wane alama da ya samu:"
    ],
    "img": {
     "file": "repair-diag",
     "alt": "Katin bincike: hukunci da kowane alamar mojibake da aka lissafa layi bayan layi",
     "cap": "Bincike yana lissafa alamomi ta nau'i maimakon kawai cewa \"mojibake ne\""
    }
   },
   {
    "h2": "Yadda ake tsara ‘yan takara, da yadda za a zaɓa",
    "ps": [
     "Ƙarƙashin \"Hanyoyin gyara wannan\", ana lissafa ‘yan takara a cikin tsarin **mafi-kamar-ainihin-harshe-da-farko**, har zuwa 12 daga cikinsu, kowanne yana da alama tare da ma'auratan lambobin da aka karanta daga ciki da zuwa ciki. Danna ɗaya don ganin yadda yake gani, zaɓi shi, sannan gungura ƙasa don adana shi. Ba ku ji daɗi ba? Yi amfani da \"Ajiye a yadda yake\" don komawa zuwa na asali.",
     "Tsarin yana fitowa daga maki: kaso na gama-gari na haruffa, kirtani na lafazin harshe, kirtani na alamomi, ganuwar haruffa masu duhu, duk an sanya su a ciki. **Idan babu maki da ya fi fice a fili, ba a ba da shawarar komai ba** — ba zai tura ɗan takara mai rabin gamsarwa a kan ku ba kawai don samun ɗaya. Rubutun da aka lalata sau biyu (an adana shi ba daidai ba sau ɗaya, sannan aka gyara shi ba daidai ba sau ɗaya) yana samun zagaye ɗaya na ƙarin warware baya a kan manyan ‘yan takara, don haka duk abin da ke cikin yadudduka biyu ana iya ceto shi har yanzu."
    ],
    "img": {
     "file": "repair-fix",
     "alt": "Jerin ‘yan takarar gyarawa wanda aka tsara ta yadda yake karanta kamar ainihin harshe, kowanne yana da alama da ma'auratan lambobinsa",
     "cap": "‘Yan takara da aka tsara ta \"mafi kamar ainihin harshe\", kowanne yana nuna lambobin da abin ya shafa"
    }
   },
   {
    "h2": "Ajiye daidai shine mataki na ƙarshe",
    "ps": [
     "Sakamakon da aka gyara har yanzu dole ne a adana shi daidai. Lokacin da ɗan wasa ba zai iya gano UTF-8 ba, adanawa azaman **UTF-8 tare da BOM** ('yan wasan Windows suna dogara da BOM) ko azaman **GBK** yawanci yana daidaita shi. Kuna iya adana shi azaman UTF-8, UTF-8 (tare da BOM), GBK, Big5, Shift_JIS ko EUC-KR; idan wani abu bai dace ba, ana gaya muku ku zaɓi wani (GBK ba zai iya riƙe Koriya ba). Fayilolin da aka zazzage suna samun `-fixed` an ƙara su a sunan.",
     "Lokacin da lambar da aka gano ba ta zama UTF-8 ba, \"Ajiye azaman\" riga an saita shi zuwa UTF-8 tare da BOM a gare ku. Da zaran kun taɓa saukowar da kanku, ta daina tunani na biyu a kan ku."
    ],
    "img": {
     "file": "repair-out",
     "alt": "Yankin sakamako: akwatin rubutu tare da saukowar ajiye-azaman da maɓallin zazzagewa",
     "cap": "Zaɓi lamba, sannan zazzage — sunan fayil ɗin yana samun -fixed an ƙara shi"
    }
   },
   {
    "h2": "Abin da ba a taɓa taɓawa ba",
    "ps": [
     "Haruffa da aka karanta ba daidai ba kawai ake maye gurbinsu. Lambobin nuni, lokuta da layukan salon ASS ba a canza su ta kowace hanya ba."
    ]
   },
   {
    "h2": "Tambayoyi da Amsoshi",
    "ps": [
     "**Na loda fayil ɗin, to me yasa har yanzu ina buƙatar adana shi kuma?** Fayil ɗin da kansa yana da kyau yawanci; abin da ya lalace shine ɗan wasan da ke karanta shi da lambar da ba daidai ba. A wannan yanayin babu harafin da ke cikin rubutun da ke buƙatar canzawa — kawai a adana kwafi azaman UTF-8 tare da BOM ko GBK kuma ba da shi ga ɗan wasan.",
     "**Me yasa ba za a iya gyara rubutun da aka manna ba?** Da zaran harafin maye gewa ya bayyana a cikin abubuwan da aka manna, bayanan asali sun tafi kuma babu abin da za a yi tunani baya daga gare shi. Koma sama kuma yi amfani da \"Zaɓi fayil\" don loda na asali.",
     "**Ɗan takarar da nake so ba a lissafa shi ba?** Ba a ba da shawarar komai ba sai dai idan ya zira ƙwallo a fili fiye da abin da kuke da shi riga. Gwaji canza lambar da aka gano zuwa wata sannan bar ta sake zura ƙwallo.",
     "**Fayil nawa lokaci guda?** Daya a lokaci guda. Zazzage gyarawa, sannan ciyar da fayil na gaba."
    ]
   },
   {
    "h2": "Keɓantawa",
    "ps": [
     "Gano da gyarawa suna gudana gaba ɗaya a cikin burauzar ku. Ba a tura abubuwan da ke cikin ƙaramin take zuwa uwar garken ba kowane iri."
    ]
   },
   {
    "h2": "Kayan aiki masu alaƙa da jagorori",
    "ps": [
     "Inda mojibake ke fitowa da kuma dalilin da ya sa ya ƙare da yin kama da haka — duba [[Where subtitle mojibake comes from|/guides/subtitle-garbled-characters.html]]; lambar tana da kyau amma abun ciki yana da datti — yi amfani da [[Subtitle cleanup|/clean.html]]; don bincika lokaci da saurin karatu — [[Subtitle QC|/qc.html]]."
    ]
   }
  ]
 },
 "sbv-to-srt": {
  "seo": {
   "title": "Mai Juyar da SBV zuwa SRT – Juyar da Ƙananan Rubutun YouTube – AI-SRTSub",
   "desc": "Juyar da ƙananan rubutun SBV da aka zazzage daga YouTube zuwa SRT don CapCut, Premiere, da ‘yan wasa. Ƙimar lokaci ba ta canzawa — tsari ne kawai yake canzawa. Yana gudana a cikin burauzar ku.",
   "h1": "SBV zuwa SRT",
   "intro": "Juya ƙananan rubutun SBV na YouTube zuwa SRT: jefa fayil ɗin, zaɓi SRT, zazzage. Ƙimar lokaci ba ta canzawa — tsari ne kawai yake canzawa.",
   "ctaText": "Juya SBV → SRT"
  },
  "body": [
   {
    "h2": "Abin da SBV yake da kuma inda yake fitowa",
    "ps": [
     "SBV shine **tsarin ƙaramin take na YouTube**: zazzage \"fayilolin ƙaramin take\" daga YouTube galibi yana ba ku .sbv. Tsarin sa ya fi SRT sauƙi — lokutan farawa da ƙarshe suna zaune a **layi ɗaya** wanda aka raba ta kwalta, rubutun yana bi kai tsaye a ƙasa, kuma babu lambobin cue."
    ]
   },
   {
    "h2": "Me yasa ‘yan wasa ke ƙin shi",
    "ps": [
     "A waje da YouTube kanta, mafi yawan software na gyarawa da ‘yan wasa ba sa goyon bayan SBV. Ba shi da tubalin lambobi kuma yana rubuta layin lokacinsa daban da SRT, don haka sake suna ƙarin baya baya yin komai — dole a sake gina tsarin da gaske."
    ],
    "img": {
     "file": "convert-upload-sbv",
     "alt": "Yankin lodin: an loda fayil ɗin SBV, an gano shi azaman SBV",
     "cap": "Ana gano SBV yadda yake, babu buƙatar sake sunan ƙarin baya"
    }
   },
   {
    "h2": "Yadda ake juyawa",
    "ps": [
     "Buɗe [[converter|/convert.html]], jefa SBV a ciki, zaɓi **SRT - SubRip** azaman fitarwa, sannan juya kuma zazzage. Ana ba da lambobin cue sababbi, kuma asalin karyewar layi a cikin cue ana haɗa su zuwa layi ɗaya (SRT yana ba da damar cues masu layi da yawa; ana fitar da SBV layi ɗaya anan)."
    ]
   }
  ]
 },
 "shift": {
  "seo": {
   "title": "Yadda Ake Canza Lokacin Subtitle (Ma'auni, Sikeli, Anka Biyu) – AI-SRTSub",
   "desc": "Jagora mai misali kan editan lokaci: loda subtitle, ƙara matakan gyara, gyaran anka biyu, gyare-gyaren kowane sashi da fitarwa.",
   "h1": "Editan Lokaci: Jagora Mataki-da-Mataki",
   "intro": "Wannan jagorar tana bi da kayan aiki daga sama zuwa ƙasa: loda subtitle, ƙara matakan gyara, gudanar da bincike, daidaita kowane sashi da kyau, da kuma fitarwa.",
   "ctaText": "Buɗe editan lokaci"
  },
  "body": [
   {
    "h2": "Loda subtitle ɗinka",
    "ps": [
     "Jawo fayil zuwa cikin akwatin da aka zana da ratsi ko danna don zaɓar ɗaya; Hakanan zaka iya **manna abun ciki** kai tsaye a cikin akwatin rubutu. Ana gano tsarin daga ɗaukacin tsawo da abun ciki, kuma sakamakon yana bayyana a cikin guntun tsarin. Abubuwan shigarwa masu goyan baya: srt, vtt, ass (ciki har da ssa), sbv, lrc da txt."
    ],
    "img": {
     "file": "shift-upload",
     "alt": "Wurin loda: an loda samfurin subtitle, an gano shi azaman SRT",
     "cap": "Sunan fayil da tsarin da aka gano suna bayyana a ƙarƙashin yankin sauka; akwatin rubutu ya kasance mai yiwuwa a gyara shi."
    }
   },
   {
    "h2": "Ƙara matakan gyara",
    "ps": [
     "Gyare-gyare sun kafa **layin aiki na matakai**: kowane mataki yana yin aiki ɗaya kuma yana ɗaukar lamba ɗaya, tare da naúrar sa da aka nuna a cikin akwatin. Matakan suna aiki daga sama zuwa ƙasa, kuma canza kowane mataki **yana sake lissafin komai daga asalin subtitle** — ta yadda zaka iya komawa baya ka gyara lamba a duk lokacin da kake so ba tare da ɓata komai ba."
    ]
   },
   {
    "h2": "Gyaran anka biyu",
    "ps": [
     "Lokacin da ba ka san tazara a cikin daƙiƙa ba ko rabon, yi amfani da anka biyu: da zarar an ƙara, **fannonin \"na yanzu\" guda biyu suna cika ta atomatik** daga farko da na ƙarshe na fayil ɗinka. Kuna cika fannonin \"manufa\" kawai - lokutan da waɗannan sassan su bayyana a zahiri. Komai a tsakiyan yana sake yaɗuwa daidai gwargwado."
    ],
    "img": {
     "file": "shift-step-two",
     "alt": "Gyaran anka biyu: lokutan yanzu an cika su ta atomatik, lokutan manufa don shigarwa",
     "cap": "Filayen na yanzu suna fitowa daga fayil ɗinka; filayen manufa su ne madaidaitan lokutan da kake gani a cikin bidiyon."
    }
   },
   {
    "h2": "Binciken lokaci da gyare-gyaren kowane sashi",
    "ps": [
     "Bayan gudanar da matakan, karanta **binciken lokaci**: sassan da suka yi gajere sosai, masu tsayi sosai, masu yawa don karantawa, layukan da suka yi faɗi sosai, ko sassan da suka mamaye juna duk ana lissafa su. Binciken **yana nuna matsaloli ne kawai kuma baya canza komai** da kansa. Mulkin tsohuwa huɗu sune daƙiƙa 0.833 mafi ƙarancin lokaci, daƙiƙa 7 mafi yawa, harafi 9 a kowace daƙiƙa gudun karatu da haruffa 21 a kowane layi - duk ana iya gyara su akan shafin. A ƙasa da shi, gyare-gyaren kowane sashi suna ba da damar haɗa makwabta biyu, raba ɗaya, ko gyara farkonsa da ƙarshen sa kai tsaye; kowane gyara ana iya soke shi."
    ]
   },
   {
    "h2": "Fitar da sakamakon",
    "ps": [
     "Allon sakamako yana nuna asali da daidaitattun lokuta **gefe da gefe** don sauƙaƙe duba gani. Tsarin fitarwa yana komawa zuwa tsarin shigarwa ta tsohuwa, amma zaka iya canzawa zuwa kowane ɗayan srt, vtt, ass, sbv, lrc ko txt kafin saukarwa."
    ],
    "img": {
     "file": "shift-result",
     "alt": "Allon sakamako: kafin da bayan lokuta gefe da gefe, tare da maɓallan saukarwa da kwafi",
     "cap": "Lokutan asali a hagu, daidaitattun lokuta a dama; sauke da zarar binciken wuri ya yi kyau."
    }
   }
  ]
 },
 "shift-subtitle-timing": {
  "seo": {
   "title": "Yadda Ake Matsar da Duk Subtitle Daga baya Ko Daga gaba – AI-SRTSub",
   "desc": "Kowane sashi yana da makara da adadi ɗaya: yi amfani da matakin sauya wuri na editan lokaci - shigar da lambar da ba ta da kyau ko mai kyau kuma duk sassan suna motsawa tare.",
   "h1": "Matsar da Dukan Fayil ɗin Subtitle Daga Gaba Ko Daga Baya",
   "intro": "Sauti ya fara, subtitle yana fitowa a makare - kuma kowane sashi ɗaya yana makara da adadi ɗaya. Wannan wuri ne daidai gwargwado: lamba ɗaya ta gyara shi.",
   "ctaText": "Buɗe editan lokaci"
  },
  "body": [
   {
    "h2": "Tabbatar da farko cewa kowane sashi yana makara da adadi ɗaya",
    "ps": [
     "Duba sashi ɗaya kusa da farko, ɗaya a tsakiya da ɗaya a ƙarshe. Idan duka ukun sun makara da adadi ɗaya kusan, wuri ne **mai daidaituwa**, kuma matakin sauya wuri ɗaya ya gyara shi. Idan farkon ya yi daidai kuma karkacewar tana girma zuwa ƙarshe, wannan matsala ce daban — duba [[subtitles getting more and more out of sync|/guides/subtitles-out-of-sync.html]]."
    ]
   },
   {
    "h2": "Abin da za a shigar: mara kyau don ci gaba, mai kyau don jinkirtawa",
    "ps": [
     "A cikin editan lokaci, ƙara matakin **Matsar da duka** kuma shigar da tazara a cikin akwatin ƙima: subtitles da ke gudana a makare suna ɗaukar lambar da ba ta da kyau don jawo su da wuri; gudana da wuri yana ɗaukar lambar da ke da kyau don tura su daga baya. Idan subtitles suna da daƙiƙa 1.5 a makare, shigar da **-1.5** - naúrar ita ce daƙiƙa."
    ],
    "img": {
     "file": "shift-step-shift",
     "alt": "Matsar da dukan mataki tare da daƙiƙa -1.5 da aka shigar",
     "cap": "Lambar da ba ta da kyau tana jawo dukan fayil ɗin da wuri; ana rubuta naúrar a cikin akwatin, a cikin daƙiƙa."
    }
   },
   {
    "h2": "Gudanar da shi kuma bincika sashi na farko",
    "ps": [
     "Bayan amfani, allon sakamako yana lissafa asali da sabbin lokutan kowane sashi **gefe da gefe**. Bincika sashi na farko tukuna: sabon lokacin farawa yana sauka a kan firam ɗin da ake magana da layin? Sannan duba na tsakiya. Kowane sashi yana motsawa da adadi ɗaya kuma yana kiyaye lokacinsa."
    ]
   },
   {
    "h2": "Fitarwa",
    "ps": [
     "Da zarar duba wuri ya yi kyau, zazzage kai tsaye. Tsarin fitarwa yana komawa zuwa tsarin shigarwa kuma ana iya canzawa zuwa wani abu daban. Canjin yana taɓa lokuta ne kawai - ba harafi ɗaya na rubutu ba."
    ]
   }
  ]
 },
 "simplified-traditional-chinese": {
  "seo": {
   "title": "Ba Canjin Haruffa Ba Ne – Kalmomi Da Yawa da Na Yanki – AI-SRTSub",
   "desc": "Abubuwa uku sun sa wannan ya yi wahala: taswirar ɗaya zuwa da yawa da kalmomin da aka warware ta kalma, ƙamus daban-daban na Taiwan da Hong Kong, da jujjuya tattaunawa kawai. Sami duk abubuwa uku daidai kuma babu gyaran ɗan adam da zai biyo baya.",
   "h1": "Sauƙaƙe da na gargajiya bacanjin harafi ba ne",
   "intro": "Wanne harafi na gargajiya wanda yake maye gurbin mai sauƙi ya dogara ne akan harafin da ke kusa da shi. Wannan shine dalilin da ya sa ba za a iya yin wannan jujjuyar ta hanyar jujjuya harafi ɗaya a lokaci guda ba.",
   "ctaText": "Buɗe mai jujjuya"
  },
  "body": [
   {
    "h2": "Na farko: nau'i ɗaya mai sauƙi, da yawa na gargajiya",
    "ps": [
     "Sauƙaƙewa ya haɗa haruffa na gargajiya da yawa zuwa nau'i ɗaya mai sauƙi. Komawa ta wata hanya, harafin sauƙaƙe ɗaya ya dace da na gargajiya da yawa, kuma zaɓar tsakanin su ya dogara da abin da aka haɗa shi da shi:",
     "Jujjuya harafi ta harafi yana haɗa su duka zuwa ɗaya kuma yana samun kowane misali ba daidai ba. Warwarewa **ta kalma** shine abin da ke raba su — teburin sun fito ne daga OpenCC, suna dacewa da jumla kafin haruffa guda ɗaya. Misali:"
    ]
   },
   {
    "h2": "Na biyu: Taiwan da Hong Kong ba abu ɗaya bane",
    "ps": [
     "Akwai wani mataki bayan jujjuya zuwa na gargajiya: ana rubuta kalma guda ta daban a Taiwan da Hong Kong. Kalmar \"software\" abu ɗaya ce a Taiwan kuma wata a Hong Kong, kuma Taiwan tana amfani da nata kalmar don \"bayani\".",
     "Saboda haka hanyoyin daban. Al'adar Taiwan har ma tana raba zuwa \"canza kalmomi\" da \"zane-zane kawai\" - zane-zane kawai yana adana ƙamus ɗin da kake da shi, yayin da canza kalmomi ke jujjuya sharuɗɗan yankin ma. Hong Kong tana samun nata alkibla."
    ],
    "img": {
     "file": "hanconv-dir",
     "alt": "Canza zuwa katin: saukar da makoma yana nuna \"Sauƙaƙe → Na gargajiya na Taiwan (canza kalmomi)\"",
     "cap": "Taiwan tana ba da canjin kalmomi ko zane-zane kawai; Hong Kong tana da nata alkibla"
    }
   },
   {
    "h2": "Na uku: tattaunawa kawai ya kamata a taɓa",
    "ps": [
     "Fayil ɗin subtitle ba tattaunawa kawai ba ne. Lambobin index, lokuta da layukan salo na ASS suna ciki ma, kuma ba harafi ɗaya daga cikinsu da ya kamata a juya — layukan salo na ASS musamman, tunda sun ƙunshi sunayen umarnin Turanci waɗanda ke karyewa a daidai lokacin da ake ɗaukar su azaman tattaunawa.",
     "Don haka jujjuyawar tana faruwa bayan tantancewa ta tsari: SRT, VTT, ASS da TXT kowannensu yana gano wace sashi ce tattaunawa, kuma haruffa kawai a ciki ake jujjuya su. Lokuta da salo suna tsira ba tare da an taɓa su ba, ba tare da wani tsari na sake yi ba."
    ],
    "img": {
     "file": "hanconv-out",
     "alt": "Wurin sakamako: subtitle da aka juya da sandar kididdiga wadda ke nuna adadinlayin da aka canza",
     "cap": "Sandar ƙididdiga tana nuna adadin layukan da suka canza; an kiyaye tsarin kamar yadda yake"
    }
   },
   {
    "h2": "Komawa zuwa mai sauƙi: yi hankali",
    "ps": [
     "Jujjuya na gargajiya zuwa mai sauƙi kuma yana buƙatar ka faɗi **wace iri ta gargajiya kake fitowa daga gare ta**: gama-gari, Taiwan da Hong Kong hanyoyi ne daban-daban guda uku, saboda dole ne a dawo da ƙamus na yankin zuwa kalmar gama-gari kafin a iya jujjuya shi. Zaɓi ɓangaren da bai dace ba kuma ƙamus na yankin yana tsira zuwa fitowar mai sauƙi.",
     "Ƙungiyar ƙasa ta hanyoyi tara ita ce wadda ke jujjuya baya: na gargajiya → mai sauƙi, Taiwan → mai sauƙi, Hong Kong → mai sauƙi."
    ]
   },
   {
    "h2": "Kayan aiki da jagorori masu alaƙa",
    "ps": [
     "Cikakken bayani - [[How to convert simplified and traditional subtitles|/guides/hanconv.html]]; idan duk abin da kake buƙata shine sauƙaƙe zuwa na gargajiya - [[Convert simplified subtitles to traditional|/guides/srt-simplified-to-traditional.html]]; don fassara zuwa wani harshe, [[Subtitle translation|/translate.html]]."
    ]
   }
  ]
 },
 "split": {
  "seo": {
   "title": "Raba da Haɗa Subtitle – Yanke ta ɓangare, silsila a cikin tsari – AI-SRTSub",
   "desc": "Yanke fayil ɗaya zuwa sassa ta lokaci ko ƙidayar sashi, sake fara kowanne a sifili, ko haɗa fayiloli da yawa a cikin tsari ko haɗa su ta lokaci. Lambobin sashi sun sake samun lambobi, rubutu ba a taɓa shi ba.",
   "h1": "Yadda ake raba da haɗa subtitle",
   "intro": "Yanke fayil ɗin subtitle mai tsayi guda ɗaya zuwa sassa, ko haɗa fayiloli da yawa da suka watse zuwa ɗaya. Yankan yana faɗuwa a kan iyakar shigarwa - ba a taɓa yankewa jumla a rabi ba.",
   "ctaText": "Buɗe rabawa da haɗawa"
  },
  "body": [
   {
    "h2": "Abin da wannan kayan aikin ke yi",
    "ps": [
     "Rabawa sassa, rabawa sassa da haɗatar da tushe duk suna shiga cikin rashin dacewa tsakanin tubalan subtitle da tubalan bidiyo: ko dai dole ne a yanke fayil ɗaya ko kuma dole ne a haɗa da yawa. Wannan shafin yana kula da dukansu, shafi ɗaya kowanne."
    ]
   },
   {
    "h2": "Zaɓi farko don yanke ko haɗa",
    "ps": [
     "Shafi biyu a sama: **Raba: fayil ɗaya zuwa sassa** da **Haɗa: fayiloli da yawa zuwa ɗaya**. Zaɓuɓɓukan mataki na biyu a ƙasa suna canzawa tare da zaɓinku.",
     "A cikin \"1 Ƙara subtitle\" kuna loda fayil ko manna rubutu; idan ka zaɓi wanda ba daidai ba, danna \"Share\". Wannan shafin yana karanta UTF-8 kawai - idan ɓoyewa ta karye (bango na alamomin tambaya ko akwatuna) je zuwa [[Garbled text repair|/repair.html]] da farko."
    ],
    "img": {
     "file": "split-mode",
     "alt": "Shafi biyu a saman shafin rabawa da haɗawa",
     "cap": "Yanke da haɗa sune shafuka biyu; zaɓuɓɓukan mataki na biyu suna bin zaɓinku"
    }
   },
   {
    "h2": "Yadda ake yanke",
    "ps": [
     "Ƙarƙashin \"2 Yadda ake yanke\" zaɓi tushen: **lokaci** (sashi ɗaya kowane minti X) ko **ƙidayar sashi** (sashi ɗaya kowane sashi X), sannan shigar da lamba.",
     "Tabbatar \"Sake fara kowane sashi a 0:00\" kuma kowane sashi da aka samu yana ƙidowa daga sifili - yi amfani da wannan lokacin da kuka loda sassa kuma kuka ba da kowane sashi ga ɗan wasa da kansa. Bar shi ba a duba shi ba don kiyaye alamomin lokaci na asali, ta yadda kowane sashi har yanzu yana daidaitawa da matsayinsa a cikin bidiyon asali.",
     "Yankan yana faɗuwa ne kawai a kan iyakokin sashi: lokacin da subtitle mai tsayi sosai ya ratsa wurin yanke, duka sashi yana zaune a cikin sashin da ya gabata."
    ],
    "img": {
     "file": "split-cut",
     "alt": "Zaɓuɓɓukan lokaci da ƙidayar sashi tare da maɓallin sake farawa a sifili akan shafin rabawa",
     "cap": "Yanke ta lokaci ko ta ƙidayar sashi, kuma zaɓi don sake fara kowane sashi a 0:00"
    }
   },
   {
    "h2": "Yadda ake haɗa",
    "ps": [
     "Ƙarƙashin \"2 Yadda ake haɗa\" zaɓi hanyar: **Silsila a cikin tsari** yana motsa fayil ɗin da ya zo daga baya ta yadda zai fara bayan wanda ya gabata ya ƙare, babu maɓalli tsakanin sassa; **Haɗa ta lokaci** yana kiyaye asalin alamomin lokaci na kowane fayil kuma yana tsara ta lokacin farawa.",
     "Yi amfani da silsila a cikin tsari lokacin da fayilolin sune rabi na farko da na biyu na sashi ɗaya, ko lokacin da rabin da aka bincika daban dole ne a sake haɗa su; yi amfani da haɗa ta lokaci lokacin da fayilolin suke mallaka a kan allo tare, kamar waƙar asali da waƙar da aka fassara.",
     "Bayan haɗuwa lambobin sashi ana sake ba da su ta atomatik kuma babu kalmar tattaunawa da ke canzawa."
    ],
    "img": {
     "file": "split-join",
     "alt": "Zaɓuɓɓukan silsila-a-cikin-tsari da haɗa-ta-lokaci akan shafin haɗawa",
     "cap": "Silsila a cikin tsari ta dace da rabi biyu na sashi ɗaya; haɗa ta lokaci yana dace da asali da waƙar da aka fassara"
    }
   },
   {
    "h2": "Dauke sakamakon",
    "ps": [
     "\"3 Sakamako\" a hagu yana fitar da **SRT** da **VTT**; danna \"Zazzage\" ko \"Kwafi\".",
     "Lokacin rabawa zaka iya amfani da \"Zazzage kowane sashi\", wanda ke adana kowane sashi da aka yanke lokaci guda maimakon danna ɗaya kowane sashi."
    ],
    "img": {
     "file": "split-out",
     "alt": "Zaɓin tsarin SRT/VTT tare da maɓallan zazzagewa da zazzage-kowane-sashi a yankin sakamako",
     "cap": "Ana iya sauke sakamakon rabawa sashi da sashi; ana sauke fayil ɗin da aka haɗa ko kwafi kai tsaye"
    }
   },
   {
    "h2": "Abin da aka bari ba a taɓa shi ba",
    "ps": [
     "Babu harafi ɗaya na tattaunawa da ke canzawa. Wannan shafin yana canza sassan da ke mallakar wane sashi ne da yadda ake ba da su lambobi kawai; abubuwan shigarwa suna tsayawa kamar yadda suke.",
     "Tare da \"Silsila a cikin tsari\" alamomin lokaci na fayilolin da suka zo daga baya ana motsa su gaba ɗaya - wannan shine abin da haɗuwa ke buƙata; tare da \"Haɗa ta lokaci\" ana kiyaye kowane asalin alamar lokaci."
    ]
   },
   {
    "h2": "Tambayoyi gama gari",
    "ps": [
     "**Yaya idan sashin ƙarshe ya ƙare da gajere sosai?** Wannan abu ne na al'ada. Ragowar da ba ta cika cikakken sashi ba ta zama nata sashi maimakon a cika shi.",
     "**Za a raba jumla da ke ketare wurin yanke?** A'a. Yankan yana faɗuwa a kan iyakokin shigarwa kawai, kuma sashi da ke ketare layin yana zaune a cikin sashin da ya gabata.",
     "**Bayan haɗawa, ta yadda ake tsara sassa biyu tare da lokuta iri ɗaya?** Ta lokacin farawa; lokacin da lokutan farawa suka yi daidai, ana kiyaye tsarin da kuka ƙara fayilolin.",
     "**Za a iya raba ASS?** Wannan shafin yana kula da SRT da VTT. Juya ASS zuwa SRT ko VTT tare da [[Format conversion|/convert.html]] da farko."
    ]
   },
   {
    "h2": "Sirri",
    "ps": [
     "Ana sarrafa subtitle gaba ɗaya a cikin burauza: ba a loda komai kuma babu abin da ke wucewa ta uwar garken. Rufe shafin kuma abun ciki ya tafi."
    ]
   },
   {
    "h2": "Kayan aiki da jagorori masu alaƙa",
    "ps": [
     "Don haɗa fayiloli biyu zuwa waƙar harsuna biyu (maimakon zuwa sashi ɗaya) yi amfani da [[Bilingual merging and special effects|/guides/merge.html]]; idan duk lokacin yana kan kuskure je zuwa [[Timeline adjustment|/shift.html]]; don kowane lokacin kakar wasa yi amfani da [[Batch conversion|/batch.html]]; kuma gudanar da [[Subtitle QC|/qc.html]] lokacin da kuka gama."
    ]
   }
  ]
 },
 "split-bilingual-subtitles": {
  "seo": {
   "title": "Raba Subtitles na Harsuna Biyu zuwa Wakoki Biyu – AI-SRTSub",
   "desc": "Raba subtitles na harsuna biyu zuwa fayiloli biyu: asali da fassarar suna sauke daban da sunaye daban; an gano nau'ikan biyu. – AI-SRTSub",
   "h1": "Raba Subtitles na Harsuna Biyu zuwa Wakoki Biyu",
   "intro": "Subtitle guda ɗaya na harsuna biyu ya zama fayiloli biyu - “asali” da “fassara”: loda, zaɓi rabuwa zuwa biyu, zazzage kowanne, tare da kiyaye alamomin lokaci ba tare da an taɓa su ba.",
   "ctaText": "Raba subtitles na harsuna biyu"
  },
  "body": [
   {
    "h2": "Lokacin da kuke buƙatar rabawa",
    "ps": [
     "Mai kunnawa yana son waƙar harshe ɗaya kawai; ko kana son waƙar fassarar don sake fassarawa, ko waƙar asali don haɗawa da wani sigar da aka fassara. Subtitle na harsuna biyu ko dai **sashi ɗaya ne tare da layuka biyu** (asali a layi ɗaya, fassara a wancan) ko **sassa biyu daban waɗanda ke raba lokaci ɗaya** — duka biyun ana iya rabawa."
    ]
   },
   {
    "h2": "Inda za a yi shi",
    "ps": [
     "Buɗe [[Bilingual Subtitle Stripper|/bilingual.html]] sannan ka zubar da subtitle ɗinka. Kayan aikin yana gano nau'in harsuna biyu ta atomatik: sashi ɗaya tare da layuka biyu ana raba shi ta tsarin rubutu, sassa biyu akan lokaci guda ta tsari. Zaɓi **Raba zuwa biyu** a cikin menu mai sauka na yanayi sannan danna Fara (ko bar shi ya sake gudana ta atomatik). Yankin sakamako yana nuna guda biyu: wanda aka yi masa alama `.orig` shine waƙar asali, wanda aka yi masa alama `.dst` shine waƙar fassara — danna “Zazzage” ga kowanne; waƙoƙin biyu suna raba lokaci ɗaya daidai."
    ],
    "img": {
     "file": "bilingual-split",
     "alt": "Sakamakon rabuwa: waƙar asali da waƙar fassara azaman guda biyu, kowanne tare da maɓallin zazzagewa",
     "cap": "Raba zuwa biyu: .orig waƙar asali + .dst waƙar fassara, an zazzage kowanne da kansa"
    }
   },
   {
    "h2": "Matsala guda ɗaya da aka saba samu",
    "ps": [
     "**Sashi ɗaya tare da layuka biyu a cikin harsunan da ke raba haruffa iri ɗaya (kamar Turanci da Faransanci) ba za a iya rabawa ba.** Lokacin da aka raba waƙoƙi ta tsarin rubutu, waɗannan suna ƙidaya azaman tsari ɗaya kuma ana bi da su azaman harshe ɗaya. Juya irin wannan abun ciki zuwa nau'in lokaci ɗaya B da farko, sannan ka raba; nau'in sashi biyu yana haɗawa ta lokaci kuma baya damuwa da harshe. Don cikakken bayani na nau'ikan biyu, duba [[Two ways to make bilingual subtitles|/guides/make-bilingual-subtitles.html]]."
    ]
   }
  ]
 },
 "srt-file-format": {
  "seo": {
   "title": "Menene Fayil na SRT? Yadda ake Buɗewa da Gyara Shi – AI-SRTSub",
   "desc": "Tsarin fayilolin ƙananan rubutun SRT (SubRip): lamba, layin lokaci, da rubutu. Yadda ake buɗewa a edita, dalilin da ya sa ɗan wasan bidiyo ke ƙin shi, da gyara rubutu ko lokaci da suka lalace.",
   "h1": "An Bayyana Tsarin Fayil na SRT",
   "intro": "SRT shine mafi shahararren tsarin ƙananan rubutu: rubutu mai sauƙi, tsari mai sauƙi, kuma ana karɓar shi kusan ko'ina. Wannan jagorar tana bayyana tsarin sa, yadda ake buɗewa, da yadda ake gyara matsalolin da suka zama ruwan dare.",
   "ctaText": "Buɗe mai juyar da ƙananan rubutu"
  },
  "body": [
   {
    "h2": "Yadda fayil din SRT yake kallo",
    "ps": [
     "SRT (SubRip) rubutu ne mai sauƙi — kowane editan rubutu zai iya buɗe shi. Kowane sashi yana da sassa uku: **layinlamba**, **layin lokaci**, da **rubutu**, waɗanda aka raba su da layuka marasa komai. Layin lokacin yana karanta `00:00:01,000 --> 00:00:03,500` — lura da **ƙira** kafin adadin sakan na miliya, ba aya ba."
    ],
    "img": {
     "file": "convert-upload",
     "alt": "Wurin loda: an loda fayil din SRT yana nuna lambobi da lokaci",
     "cap": "Sasshi uku na SRT na yau da kullum: lamba, layin lokaci, rubutu"
    }
   },
   {
    "h2": "Yadda ake buɗe shi",
    "ps": [
     "Don karanta abubuwan da ke ciki: danna-dama kuma buɗe tare da kowane **editan rubutu**. Don amfani da shi tare da bidiyo: sake masa suna don ya **yi daidai da sunan fayil din bidiyo** (ban da ƙarin bayani), sanya su duka a cikin fayil ɗaya, kuma ƴan wasa kamar VLC, PotPlayer, ko mpv za su loda shi ta atomatik; za ka iya kuma jawo shi zuwa kan taga mai kunnawa."
    ]
   },
   {
    "h2": "Gyara ƙin amincewa da rubutun da ya lalace",
    "ps": [
     "**Haruffan da suka lalace**: fayil din ba UTF-8 bane — sake adana shi azaman UTF-8 a cikin editan ka. **Babu abin da ya bayyana**: bincika cewa layin lokaci yana amfani da waƙafi (ba aya ba) kuma cewa lambobin sashe ba su lalace ba (yawancin ƴan wasa suna haƙuri da guraben da babu komai, wasu kuma ba sa yi). **Fayil din shine HTML ko JSON**: tushen zazzagewar bai yi daidai ba; sake debo shi."
    ]
   },
   {
    "h2": "Abin da SRT zai iya ɗauka da abin da ba zai iya ba",
    "ps": [
     "SRT yana ɗauke da rubutu da lokaci ne kaɗai: **babbu salon rubutu** (fuskokin rubutu, launi), **babbu wurin zama** (inda yake a kan allo), **babbu tasiri**. Waɗannan suna buƙatar ASS — duba [[SRT zuwa ASS|/guides/srt-to-ass.html]]. Don kwatankwacin gefe da gefe na duk tsare-tsare, duba [[kwatancen tsarin ƙananan rubutu|/guides/subtitle-format-comparison.html]]."
    ]
   }
  ]
 },
 "srt-fps-converter": {
  "seo": {
   "title": "Mai Juyar da Sauri na SRT – Canza Saurin Firem na Ƙananan Rubutu – AI-SRTSub",
   "desc": "Fim 24fps ne, watsa shiri 25fps ne, kuma ƙananan rubutun suna yin nisa a kowace minti: a ma'aunin lokaci da 0.96 sau ɗaya sannan dukkan fayil ɗin ya tafi kan saurin da ake so.",
   "h1": "Canza Saurin Firem na Ƙananan Rubutu: 24fps zuwa 25fps",
   "intro": "Kunna ƙananan rubutun fim na 24fps akan tushen 25fps sannan suna rasa fiye da daƙiƙa ɗaya a kowace minti — zuwa ƙarshen ƙarshen credits suna bayan mintuna. Ma'auni ɗaya ne yake gyara shi.",
   "ctaText": "Buɗe editan lokaci"
  },
  "body": [
   {
    "h2": "Me yasa rashin daidaituwar saurin firem ke sa ƙananan rubutu yin nisa",
    "ps": [
     "Canza saurin firem yana sake karanta **lokaci guda a ƙarƙashin agogo biyu daban-daban**. Fim na minti 100 na 24fps yana da sakan 6000 × 24 = **firem 144,000**; akan tushen 25fps waɗannan firem 144,000 suna kunnawa a cikin daƙiƙa 5760 — **minti 96**. Dukkan fim ɗin yana gudu minti 4 da suka rage, don haka sashi a minti 50 yana bayyana kimanin minti 2 a hankali, kuma ƙananan rubutun ƙarshen credits ba sa bayyana ko kaɗan."
    ]
   },
   {
    "h2": "Dabara da abubuwan da suka zama ruwan dare",
    "ps": [
     "Saurin da ake so ÷ asalin sauri = mai ninka. **24 zuwa 25: ninka da 0.96** (24÷25); akasin haka, 25 zuwa 24: 1.0417. **25 zuwa 23.976: ninka da 0.959**; akasin haka: 1.0427. A cikin editan lokaci ƙara mataki **Ma'auni ta sauri** sannan sanya abin ninkawa a cikin akwatin ƙima."
    ],
    "img": {
     "file": "shift-step-rate",
     "alt": "Ma'auni ta matakin sauri tare da shigar da 0.96",
     "cap": "0.96 shine 24÷25; bayanin da ke shafin ma ya ambaci canza saurin firem a matsayin abin amfani na yau da kullum."
    }
   },
   {
    "h2": "Lokacin da ba ka san saurin biyu ba",
    "ps": [
     "Idan ba za ka iya samun saurin firem na tushen ba, kada ka yi zato mai ninkawa — yi amfani da **anguna biyu** maimakon haka: ɗauki ainihin lokacin bayyanar na farko da na ƙarshe azaman maki biyu, kuma duk abin da ke tsakanin an miƙe shi daidai gwargwado. Duba [[ƙananan rubutu suna ƙara yin nisa da daidaitawa|/guides/subtitles-out-of-sync.html]]."
    ]
   },
   {
    "h2": "Abin da za a bincika bayansa",
    "ps": [
     "Ma'auni yana motsa kowane farawa da ƙarshe; tsawon lokacin sashi suna mikewa da sauri ɗaya. Bayan gudana, tabbatar da matsananci biyu: sashi na farko (ƙarancin kuskure na asali) da na ƙarshe (mafi girma). Idan sassan biyu sun yi daidai, duk abin da ke tsakanin ma haka yake."
    ]
   }
  ]
 },
 "srt-simplified-to-traditional": {
  "seo": {
   "title": "Canza Ƙananan Rubutu na Sauƙaƙe zuwa Na Gargajiya – Taiwan ko Hong Kong – AI-SRTSub",
   "desc": "Mayar da ƙananan rubutun Sinanci masu sauƙi zuwa na gargajiya: zaɓi Taiwan ko Hong Kong. Gyaran kalmomi yana faruwa ta kalma. Tattaunawa ce kawai ke canzawa; lokuta suna nan daram.",
   "h1": "Canza ƙananan rubutu masu sauƙi zuwa na gargajiya",
   "intro": "Ƙananan rubutun Sinanci mai sauƙi da aka nufa ga masu sauraro a Taiwan ko Hong Kong kawai yana buƙatar sauyawa — amma yankuna biyu suna son abubuwa daban-daban, kuma zaɓar alkibla mara daidai yana ba da kalmomin da mutanen gida ba sa amfani da su.",
   "ctaText": "Canza wannan ƙaramin rubutu"
  },
  "body": [
   {
    "h2": "Buƙatar",
    "ps": [
     "Ƙananan rubutun ku Sinanci ne mai sauƙi kuma dole ne su isa ga masu kallo a Taiwan ko Hong Kong. Gyara haruffa ɗaya bayan ɗaya ba abin yiwuwa ba ne — kashi ɗaya yana da ɗaruruwan sassa — kuma yankunan biyu ba sa son rubutun gargajiya guda ɗaya: ƙamus ya bambanta, kuma alkibla mara daidai tana samar da kalmomin da babu ɗan gida da zai yi amfani da su."
    ]
   },
   {
    "h2": "Inda za a yi shi",
    "ps": [
     "Buɗe [[Canji tsakanin mai sauƙi da gargajiya|/hanconv.html]], ja ƙaramin rubutu ciki, kuma zaɓi ɗaya daga cikin hanyar mai sauƙi → gargajiya a ƙarƙashin \"Canza zuwa\": gargajiya ta gaba ɗaya, ta Taiwan (canza kalmomi), ta Taiwan (zane-zane kaɗai) ko Hong Kong. Canjin yana faruwa nan take kuma yankin sakamako yana nuna ƙaramin rubutu da aka kammala, wanda ya shirya don zazzagewa.",
     "**Don masu sauraron Taiwan**: zaɓi \"Taiwan (canza kalmomi)\" idan ƙamus na yanki ma ya kamata ya canza — \"software\" da \"bayanai\" sun zama daidaitattun su na Taiwan — ko \"Taiwan (zane-zane kaɗai)\" idan kana son sifofin haruffa su canza yayin da kake kiyaye ainihin kalmomin ku. **Don masu sauraron Hong Kong**: zaɓi \"Hong Kong\", inda ake rubuta \"software\" da wani nau'i daban."
    ],
    "img": {
     "file": "hanconv-dir",
     "alt": "Canza zuwa katin: menu na ƙasa na inda ake zuwa yana nuna \"Mai sauƙi → Gargajiya ta Taiwan (canza kalmomi)\"",
     "cap": "Taiwan da Hong Kong cibiyoyi ne daban-daban tare da ƙamus daban-daban"
    }
   },
   {
    "h2": "Matsalolin da suka zama ruwan dare",
    "ps": [
     "**Kada ka ji tsoron taswirar ɗaya-zuwa-da-yawa**: harafi mai sauƙi guda ɗaya a cikin kalmomi na \"mai tsabta\", \"bushe\" da \"tushen bishiya\" yana taswira zuwa haruffa na gargajiya daban-daban. Teburorin suna magance wannan ta jimla, don haka ba a tattara komai cikin harafi ɗaya ba.",
     "**Tattaunawa ce kawai ake canzawa**: lokuta, lambobin index da layukan salo na ASS ba a taɓa su ba, don haka sakamakon ya shirya don amfani.",
     "**Babu abin da ya canza? Bincika kafin ka firgita**: idan mashayar matsayi ta ba da rahoton layuka 0 da aka canza, ko dai fayil ɗin ba shi da haruffan Sinanci ko kuma an gano tsarin ba da daidai ba — bincika cewa \"Tsarin da aka gano\" ya yi daidai da abin da ka loda."
    ]
   },
   {
    "h2": "Mai alaƙa",
    "ps": [
     "Cikakken bayanin dukkan hanyoyi tara — [[Yadda ake canza ƙananan rubutu masu sauƙi da na gargajiya|/guides/hanconv.html]]; dalilin da ya sa ya wuce kawai musayar haruffa — [[Mai sauƙi da gargajiya ba musayar harafi ba ne|/guides/simplified-traditional-chinese.html]]; gargajiya zuwa mai sauƙi kuma yana zaune a [[Canji tsakanin mai sauƙi da gargajiya|/hanconv.html]]."
    ]
   }
  ]
 },
 "srt-to-ass": {
  "seo": {
   "title": "Mai Juyar da SRT zuwa ASS – Canza Ƙananan Rubutu ta Intanet – AI-SRTSub",
   "desc": "Canza ƙananan rubutun SRT zuwa ASS (Advanced SubStation Alpha) tare da zanen 1920×1080 da salon tsoho mai tsabta, wanda ya shirya don lodi a kowane ɗan wasa. Yana gudana a cikin burauzar ku.",
   "h1": "SRT zuwa ASS",
   "intro": "Mayar da ƙananan rubutun SRT zuwa ASS: ja fayil ɗin, zaɓi ASS, zazzagewa. Ana samar muku da zanen 1920×1080 da salon tsoho mai tsabta.",
   "ctaText": "Canza SRT → ASS"
  },
  "body": [
   {
    "h2": "Lokacin da kake buƙatar ASS",
    "ps": [
     "Yi amfani da ASS lokacin da ƙaramin rubutu wanda aka loda yake buƙatar **ingantaccen tsari da ikon salon rubutu**: yana dauke da ra'ayoyin da SRT ba ta da su — girman zane, salon fuskokin rubutu, daidaitawa. mpv, PotPlayer, VLC, da yawancin ƴan wasa suna goyan bayan sa kai tsaye."
    ]
   },
   {
    "h2": "Abin da fitarwar take kallo",
    "ps": [
     "Kayan aikin yana sake gina babban kanun labarai: **zanen 1920×1080**, naɗewa ta hankali (WrapStyle 0), da salon tsoho guda ɗaya — Arial 54, rubutu farar fata tare da baki baƙi, a tsakiyar ƙasa. Kowane sashi yana amfani da wannan salon."
    ],
    "img": {
     "file": "convert-opt-ass",
     "alt": "Fitar da tsarin sauka-ƙasa tare da ASS - Advanced SubStation da aka zaɓa",
     "cap": "Zaɓi ASS a matsayin fitarwa kuma zazzage bayan an canza"
    }
   },
   {
    "h2": "Shin ana kiyaye salon rubutu?",
    "ps": [
     "SRT ba ta da ra'ayin salon rubutu tun farko. Kuma idan tushen ku riga ya zama ASS, canzawa **yana sake gina salon tsoho kuma baya kiyaye asalin** — yi amfani da editan ƙananan rubutu na musamman don sake salon ASS. Lokaci da rubutu ba su shafa ba ta kowace hanya."
    ]
   }
  ]
 },
 "srt-to-excel": {
  "seo": {
   "title": "Canza Ƙananan Rubutu zuwa Excel – Gyara Layi-da-Layi – AI-SRTSub",
   "desc": "Fitar da ƙananan rubutun SRT zuwa Excel: layi ɗaya a kowane sashi a cikin ginshiƙai huɗu — lamba, farawa, ƙarshe, da rubutu. An adana lokaci azaman rubutu, an kiyaye fasalin layuka, kuma za a iya mayar da takardar da aka gyara zuwa ƙananan rubutu.",
   "h1": "Canza ƙananan rubutu zuwa Excel",
   "intro": "Gyara daruruwan sassa a cikin editan rubutu yana da gajiya. A cikin Excel kowane sashi layi ne, don haka tace, sanya sharhi, da nema-da-maye duk sun zama masu sauƙin amfani — kuma gyaran yana komawa cikin SRT ɗinku.",
   "ctaText": "Fitar da zuwa Excel"
  },
  "body": [
   {
    "h2": "Buƙatar",
    "ps": [
     "Gyarawa, sauye-sauyen kalmomi masu yawa, ko raba aikin tsakanin mutane da yawa — duk waɗannan suna tafiya da sauri sosai a cikin takarda fiye da rubutu mai sauƙi. SRT da kansa rubutu ne mai sauƙi, amma tsarin sassan sa (lamba, lokaci, tattaunawa) yana dacewa sosai da ginshiƙai huɗu na jadawalin aiki."
    ]
   },
   {
    "h2": "Inda za a yi shi",
    "ps": [
     "Buɗe [[Canji tsakanin ƙananan rubutu da jadawali|/table.html]], canza zuwa \"zuwa jadawali\", ja cikin SRT, kuma samfoti yana cika da layi ɗaya a kowane sashi a ginshiƙai huɗu — lamba, farawa, ƙarshe, rubutu. Danna \"Zazzage Excel (.xlsx)\" kuma naka ne. Ana goyan bayan VTT ta haka.",
     "Lokacin daka gama gyarawa: canza yanayin zuwa \"zuwa ƙaramin rubutu\", sanya takardar baya, kuma za ka sake samun SRT. Dokar ita ce ginshiƙai uku don farawa, ƙarshe da rubutu (Start / End / Text na Ingilishi suma suna aiki), a kowane tsari."
    ],
    "img": {
     "file": "table-prev",
     "alt": "Samfotin jadawali: kowane sashi na SRT azaman layi a ginshiƙai huɗu, tare da mashayar matsayi",
     "cap": "An shimfiɗa SRT azaman ginshiƙai huɗu, mai yiwuwa a mayar da shi ta hanya guda"
    }
   },
   {
    "h2": "Matsalolin da suka zama ruwan dare",
    "ps": [
     "**Gyara ɓarnatar da rubutu da farko**: wannan shafin yana karanta UTF-8 kawai. Cikakken allo na alamun tambaya ko akwatuna yana nufin tafiya zuwa [[Gyaran Mojibake|/repair.html]] da farko.",
     "**CSV ko xlsx**: zaɓi .xlsx lokacin da fayil ɗin zai shiga Excel, don haka ba za a iya sake tsara ginshiƙin lokaci ba; CSV yafi sauƙin ɗauka amma Excel na iya karanta shi a matsayin wani abu daban — saita ginshiƙin lokaci zuwa \"Rubutu\" idan hakan ta faru.",
     "**ASS ba ya aiki**: ASS yana ɗauke da umarnin salon rubutu, don haka canza shi zuwa SRT kafin sanya shi a cikin jadawali."
    ]
   },
   {
    "h2": "Mai alaƙa",
    "ps": [
     "Cikakken bayanin hanya biyu — [[Yadda ake canza ƙananan rubutu zuwa Excel / CSV|/guides/table.html]]; fassara bayansa — [[Fassarar ƙananan rubutu|/translate.html]]; wucewa ta ƙarshe kafin bayarwa — [[QC na ƙananan rubutu|/qc.html]]."
    ]
   }
  ]
 },
 "srt-to-vtt": {
  "seo": {
   "title": "Mai Juya SRT zuwa VTT – Juya Rubutun Fim Kan-Gizo – AI-SRTSub",
   "desc": "Juya rubutun fim na SRT zuwa VTT (WebVTT) don abubuwan waƙa na HTML5. Kulle-lokaci suna canzawa zuwa ‘yan digito ta atomatik. Yana aiki a cikin burauzarka, ba a loda komai ba.",
   "h1": "SRT zuwa VTT",
   "intro": "Mai da rubutun fim na SRT zuwa VTT: jefa fayil ɗin, zaɓi VTT, sauke shi. An sake rubuta alamomin lokaci don tsarin yanar gizo, duka a cikin burauzarka.",
   "ctaText": "Juya SRT → VTT"
  },
  "body": [
   {
    "h2": "Lokacin da kake buƙatar VTT",
    "ps": [
     "Na’urorin kunna bidiyo na yanar gizo (abin da ke cikin HTML5 ``), loda rubutun fim a YouTube, da yawancin na’urorin kunna bidiyo na burauza suna karɓar **VTT (WebVTT)** kawai — ba SRT ba. Idan abin da kake da shi kawai shine SRT, sauya shi sau ɗaya zai sa ya yi aiki."
    ]
   },
   {
    "h2": "Yadda tsarin biyu suka bambanta",
    "ps": [
     "Abubuwan da ke ciki kusan ɗaya suke; abubuwa uku an rubuta su daban: **layin kan taken WEBVTT** (wanda ake buƙata a VTT); **mai raba miliyoyin saƙo** a cikin alamomin lokaci — SRT tana amfani da waƙafi (00:00:01,000) yayin da VTT tana amfani daigo (00:00:01.000); kuma VTT tana ba da damar toshe-toshen NOTE da STYLE waɗanda SRT ba ta da su."
    ],
    "img": {
     "file": "convert-result",
     "alt": "Sakamakon juyawa da ke nuna kan taken WEBVTT da alamomin lokaci masuigo",
     "cap": "VTT da aka juya: WEBVTT a layin farko, alamomin lokaci masuigo"
    }
   },
   {
    "h2": "Yadda ake juyawa",
    "ps": [
     "Buɗe [[mai juyawa|/convert.html]], sanya SRT ɗin ciki, zaɓi **VTT - WebVTT** a matsayin abin da za a fitar, sannan ka juya kuma ka sauke. Tsarin lissafi, ƙima na lokaci, da rubutu mai layuka da yawa ana kiyaye su kamar yadda suke — sintaks ɗin kawai yake sauyawa. Kuna son tafiya ta ɗayan hanyar? Duba [[VTT zuwa SRT|/guides/vtt-to-srt.html]]."
    ]
   }
  ]
 },
 "subtitle-format-comparison": {
  "seo": {
   "title": "SRT da VTT da ASS da SBV da LRC – Wane Tsarin Rubutun Fim Ne – AI-SRTSub",
   "desc": "Kwatancen ikon nau'ikan rubutun fim guda biyar: salon rubutu, wuri, daidaiton lokaci, inda kowanne yake, da yadda ake jujjuya su tsakanin su.",
   "h1": "Zaɓar Tsarin Rubutun Fim: SRT / VTT / ASS / SBV / LRC",
   "intro": "Hanyar rubutun fim guda ɗaya da aka adana a cikin nau'ikan nau'ikan guda biyar tana yin hidima ga masters daban-daban guda biyar. Wannan jagorar tana kwatanta abin da kowane tsari zai iya yi da yadda ake motsawa tsakanin su.",
   "ctaText": "Buɗe mai sauya rubutun fim"
  },
  "body": [
   {
    "h2": "Zaɓi tsari a cikin jumla ɗaya",
    "ps": [
     "Sanya waƙa a cikin mai kunnawa, mafi girman dacewa → **SRT**; masu kunna gizo (waƙar HTML5) ko loda YouTube → **VTT**; haruffa, launuka, wuri, tasiri → **ASS**; wanda aka sauke daga YouTube → **SBV** (sauya zuwa SRT don faɗaɗa goyon baya); waƙoƙin waka, rera waƙa ta layin-bayan-layi → **LRC**."
    ],
    "img": {
     "file": "convert-opt",
     "alt": "Saukar da tsarin fitarwa: nau'ikan manufa guda shida",
     "cap": "Manufofin fitarwa guda shida a cikin mai sauyawa sun rufe kowane tsari a cikin wannan jagorar"
    }
   },
   {
    "h2": "Kwatancen iyawa",
    "ps": [
     "**SRT**: rubutu mai sauƙi + lokaci, babu salo ko wuri, zakaran dacewa. **VTT**: rubutu + lokaci, burauza suna tallafawa asali, na iya ɗaukar wuri da salon asali, digo kafin milliseconds. **ASS**: rubutu + lokaci + cikakken salon (haruffa, launuka, zane, wuri, tasiri), lokaci zuwa centiseconds. **SBV**: ƙaramin tsarin rubutun fim na YouTube, farawa da ƙarewa a layin ɗaya. **LRC**: tsarin waƙoƙi, lokutan farawa kawai, babu lokutan ƙarewa, babu salo."
    ]
   },
   {
    "h2": "Hanyoyin da ke tsakanin tsaruka",
    "ps": [
     "Duk wanne daga cikin waɗannan yana jujjuya ta hanyar [[mai juyawa|/convert.html]]: karatu yana goyan bayan srt, vtt, ass (ciki har da ssa), sbv, lrc, txt; fitarwa yana goyan bayan srt, vtt, ass, sbv, lrc, txt. Hanyoyin da suka zama ruwan dare kowannensu yana da nasa jagorar: [[SRT zuwa VTT|/guides/srt-to-vtt.html]], [[VTT zuwa SRT|/guides/vtt-to-srt.html]], [[SRT zuwa ASS|/guides/srt-to-ass.html]], [[ASS zuwa SRT|/guides/ass-to-srt.html]], [[SBV zuwa SRT|/guides/sbv-to-srt.html]], [[LRC zuwa SRT|/guides/lrc-to-srt.html]]."
    ]
   },
   {
    "h2": "Abin da juyawa ke rasa",
    "ps": [
     "Juya zuwa SRT koyaushe yana zubar da salo da wuri (SRT ba zai iya riƙe su ba). Juya zuwa ASS tare da wannan kayan aikin **yana sake gina salon tsoho kuma baya kiyaye asalin**. LRC zuwa SRT yana buƙatar cika lokutan ƙarewa (kowane layi yana ɗauka har sai na gaba; na ƙarshe yana samun daƙiƙa 3). Ƙimar lokaci da rubutu sun kasance iri ɗaya a kowace ainihin hanya."
    ]
   }
  ]
 },
 "subtitle-garbled-characters": {
  "seo": {
   "title": "Indar Muryar Rubutun Fim ta Fito – Gane Ta, Gyara Ta – AI-SRTSub",
   "desc": "Ma'anar mojibake shine karatu mara kyau, ba fayil da ya lalace ba. Haruffa maye gurbin, bango na haruffa masu lafazi da jerin haruffa masu ban mamaki kowanne yana nuna dalili — koyi wanda zai dawo da wanda ba zai taɓa dawo ba.",
   "h1": "Inda hargitsin rubutun fim ya fito",
   "intro": "Haka bytes ɗaya aka karanta su azaman UTF-8 da kuma azaman GBK suna fitowa azaman saitin haruffa biyu daban-daban gaba ɗaya. Yadda rubutun da ya lalace yake gani shine shaidar kai tsaye ta wane mataki ne ya lalace.",
   "ctaText": "Buɗe kayan aikin gyara mojibake"
  },
  "body": [
   {
    "h2": "Fayil ɗin yana da kyau — an karanta shi ba daidai ba",
    "ps": [
     "Abin da fayil ɗin rubutun fim ke adana shine bytes. Juya bytes zuwa haruffa yana buƙatar sanin wane saitin rubutu aka rubuta shi da shi — ka ɓata hakan kuma zaka sami mojibake. Babu byte ɗaya da ya ɓace daga fayil ɗin; karanta shi kuma tare da saitin rubutu mai daidai kuma haruffan suna dawo.",
     "Wannan ya raba aikin zuwa biyu: **gANO da wane saitin rubutu ya fara**, da **ajiyar shi a matsayin saitin rubutun da mai kunnawan ka zai iya gani**. Na farko ya fito ne daga gwajin ɓata lissafi da ƙididdiga, na biyu daga adana kwafi. Suna magance matsaloli daban-daban."
    ]
   },
   {
    "h2": "Dubi biyar, dalilai biyar",
    "ps": [
     "Mojibake ba na bazuwar bane — yadda yake gani yana nuna abin da ya haifar da shi:"
    ],
    "img": {
     "file": "repair-diag",
     "alt": "Katin bincike da ke lissafin kowane nau'i na alamar mojibake",
     "cap": "Bincike yana tsara mojibake ta dalili maimakon haɗa su wuri guda"
    }
   },
   {
    "h2": "Me yasa ba za a iya gyara haruffan maye gurbin ba",
    "ps": [
     "Haruffan maye gurbin su ne layin rarrabawa. `` yana nufin an riga an jefar da bytes ɗin **a mataki na farko** (yawanci wani shirin yana karanta fayil ɗin kuma ya sake adana shi), kuma ba a rubuta komai game da abin da aka jefa ba. A wancan lokacin babu abin da za a yi la'akari da shi baya — babu wanda zai iya gyara shi.",
     "Don haka shafin gyarawa yana sarrafa lokuta biyu daban. Loda fayil kuma asalin bytes suna nan daram, yana ba shi damar gwada kowane saitin rubutu; idan rubutun da aka liƙa ya riga ya ƙunshi harafin maye gurbin, yana faɗar hakan a sarari: \"ba za a iya gyarawa ba, don Allah loda asalin fayil ɗin\".",
     "Haka nan akwai akasin hakan: abubuwan da ke ciki suna karanta da kyau sosai amma har yanzu mai kunnawar ka yana nuna hargitsi. Fayil ɗin ba shi da laifi — **mai kunnawan ya zaɓi saitin rubutu ba daidai ba**. Gyara rubutun ba zai taimaka ba; adana kwafi azaman UTF-8 tare da BOM ko GBK kuma ka ba shi hakan."
    ],
    "img": {
     "file": "repair-up",
     "alt": "Wurin loda: ja-da-jefa da liƙa azaman wuraren shigarwa guda biyu",
     "cap": "Loda fayil ɗin idan zaka iya — bytes masu kyau suna nufin wani abu da za a gyara"
    }
   },
   {
    "h2": "Abin da yake kwatantawa yayin gyarawa",
    "ps": [
     "Kayan aikin yana gwada kowane saitin rubutu mai yiwuwa, sannan yana ƙididdige kowane sakamako: yawan abin da aka yi da haruffa na yau da kullum, ko akwai zaren lafazi, zaren alamomi, ko gudu na CJK bango ne na haruffa masu duhu. Sakamako mafi kyawun ƙididdiga yana zuwa saman jerin.",
     "**Idan babu ƙididdiga a fili wadda ta fi kyau, babu abin da ake ba da shawarar** — ya fi kyau a gaya maka \"wannan yana karanta da kyau kamar yadda yake\" maimakon a ba da wani abu da kawai ya yi kama da yaren. Rubutun da aka lalata sau biyu (an adana ba daidai ba sau ɗaya, sannan aka gyara ba daidai ba sau ɗaya) yana samun ƙarin zagaye na warware baya kan manyan 'yan takara."
    ],
    "img": {
     "file": "repair-fix",
     "alt": "Jerin 'yan takara da aka tsara ta ƙididdiga, kowanne yana da alamar ma'auratan saitin rubutun sa",
     "cap": "'Yan takara da aka tsara ta ƙididdiga — babu wanda ya yi nasara a fili, babu shawarwari"
    }
   },
   {
    "h2": "Adana saitin rubutu da ya dace yana kammala aikin",
    "ps": [
     "Rubutun da aka gyara har yanzu dole ne a adana shi azaman saitin rubutu wanda mai kunnawan ka ya sani. Masu kunna bidiyo a Windows yawanci suna dogaro da BOM don gano saitin rubutu, don haka **UTF-8 tare da BOM** shine mafi ƙarancin damuwa; tsohuwar na'ura da wasu masu kunnawa na yanki suna son GBK. Zaka iya zaɓar UTF-8, UTF-8 (tare da BOM), GBK, Big5, Shift_JIS ko EUC-KR, kuma za a gaya maka ka zaɓi wani idan wani abu bai dace ba (GBK ba zai iya riƙe Koriya ba)."
    ],
    "img": {
     "file": "repair-out",
     "alt": "Wurin sakamako: ajiye-a matsayin saitin rubutu da maɓallin saukewa",
     "cap": "Adana shi azaman wani abu da mai kunnawa ya sani kuma an magance mojibake gaba ɗaya"
    }
   },
   {
    "h2": "Kayan aiki da jagorori masu alaƙa",
    "ps": [
     "Cikakken jagora — [[Yadda ake gyara rubutun fim na mojibake|/guides/repair.html]]; abin da fayil ɗin SRT yake adana a zahiri — [[Abin da ke cikin fayil ɗin SRT|/guides/srt-file-format.html]]; saitin rubutun yana da kyau amma abubuwan da ke ciki sun datti (alamomin ruwa, talla, alamomin masu fama da matsalar ji) — [[Tsabtace rubutun fim|/clean.html]]."
    ]
   }
  ]
 },
 "subtitle-glossary": {
  "seo": {
   "title": "Teburin Kalamai: lokaci guda, ƙamus guda – Yaushe ake gina ɗaya – AI-SRTSub",
   "desc": "Teburin kalamai yana gyara kalma ɗaya da aka fassara ba daidai ba: yaushe za a gina ɗaya, yadda ake sake amfani da ita a duk lokacin da ake so, me yasa daidaitawar kalma guda ba ta yin komai a cikin Sinanci, da abin da ba za a ba ta ba.",
   "h1": "Teburin kalamai: kiyaye daidaiton lokaci",
   "intro": "Lokacin da suna ya zama A a kashi na ɗaya kuma B a kashi na bakwai, masu kallo suna tsammanin su halaye ne guda biyu. Teburin kalamai yana hana hakan daidai - yana gyara abin da ake kiran abubuwa.",
   "ctaText": "Buɗe maye gurbin kalmar rukuni"
  },
  "body": [
   {
    "h2": "Teburin kalamai yana gyara rashin daidaituwa",
    "ps": [
     "Matsalolin kalmomi a cikin rubutun fim suna zuwa nau'i biyu: \"wannan kalmar an fassara ta ba daidai ba\" da \"wannan kalmar an fassara ta daban daga wuri zuwa wuri\". Na farko matsalar ƙamus ce; na biyu shine abin da teburin kalamai ya ƙunshi.",
     "Na biyu duka ya fi yawa kuma yana da wuya a gane shi: `Thor` ya zama \"Thor\" a kashi na ɗaya kuma \"Donar\" a kashi na bakwai, kuma kowane kashi yana da kyau da kansa yayin da jerin gwanon gaba ɗaya yana sa masu kallo su yi tunanin sabon hali ya bayyana. Teburin kalamai yana juya \"wannan samarwa yana kiran shi Thor\" zuwa ƙa'idar da aka zartar wacce aka yi amfani da ita ga dukkan fayil ɗin rubutun fim ɗin lokaci guda."
    ]
   },
   {
    "h2": "Lokacin da ya dace a gina ɗaya",
    "ps": [
     "Ba kowane fayil ɗin rubutun fim ke buƙatar teburin kalma ba. Lokuta da ke ba da hujjar ɗaya yawanci sune waɗannan:"
    ],
    "img": {
     "file": "glossary-rules",
     "alt": "Ƙa'idodin maye gurbin da aka haɗa ta rukuni a cikin teburin kalma",
     "cap": "Yi amfani da # tsokaci don haɗa ƙa'idodi, da kuma kashe ɗaya ɗan lokaci yayin gyarawa"
    }
   },
   {
    "h2": "Kiyaye tebur ɗaya a duk lokacin wasa",
    "ps": [
     "Ana kiyaye teburin kalma **a hankali**: daidaita sunayen a kashi na ɗaya, sannan ƙara ƙa'ida duk lokacin da sabon kalma ya bayyana, kuma a ƙarshen kakar teburin ya cika. Don kakar wasa ta gaba ta jerin gwanon guda, fara daga gare ta.",
     "Rubuta ƙa'idodi kaɗan mafi faɗi fiye da yadda ake buƙata — da zaran ka yanke shawarar \"Thor\", ƙara \"Donar -> Thor\" ma, ta yadda za a iya kawo rubutun fim na wani a cikin layi a cikin wucewa guda.",
     "Koyaushe karanta **jerin canji** bayan haka: yana sanya sunan kowane cue, kowane layi da abin que ya zama me. Shi kadai ne wurin da za ka iya tabbatar da cewa canjin ya yi daidai kuma ba a wuce gona da iri ba, kuma duk wani shigar da ba ka so za a iya mayar da shi da danna."
    ],
    "img": {
     "file": "glossary-diff",
     "alt": "Jerin abubuwan canji na mutum ɗaya a yankin sakamako",
     "cap": "An jera kowane canji; danna wanda ba ka so ka mayar da shi"
    }
   },
   {
    "h2": "Abin da ba za a ba wa teburin kalma ba",
    "ps": [
     "Teburin kalma yana canza **kalmomi**. Waɗannan abubuwa guda uku suna waje da aikinsa, kuma ya kamata su kasance:",
     "**Nahawu da tsarin jimla** — ba za ka iya juya kalma zuwa jimla ba; aikin matakin jimla yana komawa zuwa [[Fassarar rubutun fim|/translate.html]] ko zuwa ga mutum.",
     "**Tsabtace abubuwan ciki** — jefa layuka duka kamar alamomin ruwa, tallace-tallace da alamomin SDH yana zuwa [[Tsabtace rubutun fim|/clean.html]]; ƙa'idodin teburin kalma suna maye gurbin, ba sa share layuka.",
     "**Tsarin lokaci** — teburin kalma baya taɓa lokaci. Don biyan kuɗi na duniya ko matsalar ƙimar zuwa [[Gyaran lokaci|/shift.html]]."
    ]
   },
   {
    "h2": "Abubuwa kaɗan da ke da sauƙin kuskure",
    "ps": [
     "**Sinanci har yanzu yana maye gurbin sub-strings tare da daidaitawar kalma baki ɗaya — wannan abu ne na al'ada.** Sinanci da Japananci ba sa raba kalmomi da sarari, don haka kayan aikin ba za su iya tantance iyakokin kalma ba kuma daidaitawar kalma baki ɗaya ba ta da tasiri a can; `art` ba za ta taɓa kariya ta `start` ba tana aiki ne kawai ga Ingilishi.",
     "**Tsari yanacanza sakamakon.** Ƙa'idodi suna gudana daga sama zuwa ƙasa kuma rubutun da ƙa'ida ɗaya ta samar ana bincika shi ta ƙa'idodin da ke ƙasa da shi. Maye gurbin A da B sannan B da C kuma kun ƙare da C.",
     "**Don canza fassarar kawai, saita iyakacin.** A cikin fayil mai harsuna biyu, zaɓi \"layi na biyu kawai\"; shiga tare da layi ɗaya kawai sun kasance ba a taɓa su ba a ƙarƙashin kowane saiti na layi ɗaya - kayan aikin baya tsammanin wane gefe ne asali.",
     "**Ba a adana teburin kalma ba.** Yana da banza duk lokacin da ka buɗe shafin, don haka kiyaye naka fayil ɗin rubutu kuma wuce shi."
    ]
   },
   {
    "h2": "Kayan aiki da jagorori masu alaƙa",
    "ps": [
     "Don cikakken tafiya duba [[Yadda ake maye gurbin kalmomi a cikin rubutun fim|/guides/glossary.html]]; idan abubuwan da ke ciki sun datti gudu [[Tsabtace rubutun fim|/clean.html]] fara; da zaran an daidaita sunayen kuma kuna buƙatar wasu harsuna je zuwa [[Fassarar rubutun fim|/translate.html]]; kuma gudu sakamakon ta hanyar [[QC na rubutun fim|/qc.html]]."
    ]
   }
  ]
 },
 "subtitle-quality-check": {
  "seo": {
   "title": "Jerin Abubuwan Dubawa Kafin Isar da Rubutun Fim – AI-SRTSub",
   "desc": "Jerin abubuwan da za a duba na rubutun fim: ruɓewa, saurin karatu, faɗin layi da alamomin rubutu ne ke fi faduwa. Yi amfani da ƙa'idodin QC 17 - rabin matsalolin gyarawa ne da danna ɗaya.",
   "h1": "Abin da Za a Duba Kafin Isarwa",
   "intro": "Rubutun fim da aka gama ba su shirya don isarwa ba: matsalolin da masu kallo ke gani a kallo na farko sune ainihin waɗanda ba za ku iya gani ba bayan kallo sau ɗari. Wannan jerin abubuwan dubawa suna rufe wannan wucewar ƙarshe.",
   "ctaText": "Gudanar da Binciken QC na Rubutun Fim"
  },
  "body": [
   {
    "h2": "Me yasa Ba za ku Iya Ganin Matsalolin Da Kanku Ba",
    "ps": [
     "Duk wanda ya yi rubutun fim ya san abubuwan da ke ciki sosai - kun san abin da kowane layi ke cewa na gaba, don haka babu abin da yake jin sauri sosai; kun ga tsarin sau ɗari, kuma idanunku suna tsallake lahani da kansu. Don haka binciken kafin isarwa ba zai iya dogara ga \"kallo shi kuma daga sama\" ba - dole ne a **auna shi da lambobi**: saurin karatu, faɗin layi, tsawon lokaci, ruɓewa. Bari lambobi su yanke shawara."
    ]
   },
   {
    "h2": "Gazawa Shida Mafi Yawanci",
    "ps": [
     "An jera su ta yawan saukar da isarwa:"
    ]
   },
   {
    "h2": "Yadda Ake Dubawa",
    "ps": [
     "Buɗe [[QC na Rubutun Fim|/qc.html]] sannan ka sanya rubutun fim ɗin ka a ciki; saita yaren zuwa gano atomatik (harsuna 27, kowanne da nasa matakan ƙa'ida). Rahoton yana lissafin abubuwan da aka gano a mataki uku — **kuskure / gargaɗi / shawarwari** — kowanne tare da lambar shigarwa da ƙimar da aka auna. Dole ne a magance kurakurai (rubutun da aka ɓata, tsarin lokaci, ƙarewa kafin farawa, lamba ta karye); gargaɗi ya dogara da yanayin (ruɓewa, saurin karatu, faɗin layi, tsawon lokaci); shawarwari sune gogewa (matsayin karyewar layi, sarari, alamomin rubutu)."
    ],
    "img": {
     "file": "qc-report",
     "alt": "Rahoton QC: jerin batutuwa mataki-mataki uku, kowane bincike tare da lambar shigarwa da kwatancen da aka auna da kuma abin da aka tsara",
     "cap": "Rahoton mataki uku wanda ke ba da lambar shigarwa da ƙimar da aka auna don kowane bincike"
    }
   },
   {
    "h2": "Abin da Za a Iya Gyarawa da Danna Ɗaya",
    "ps": [
     "Lamba, abubuwan da babu komai a ciki, sake naɗewa, sarari da alamomin rubutu — duk abin da **ya bar lokacin ba a taɓa shi ba** — ana iya gyara shi ta atomatik; gyare-gyaren da **suke canza lokacin** (musayar farawa da ƙarewa, sauya ruɓewa, yanke ko miƙa tsawon lokaci) an cire su ta tsohuwa kuma ya kamata a duba su ne kawai bayan kun tabbatar da tasirin. **Surin karatu da ya wuce iyaka ba shi da gyara ta atomatik** — injin ba zai iya sanin wane kalma za a yanke ba, don haka rage fassarar da kanka ko sassauta lokacin kaɗan; duba [[Rubutun Fim Sun Yi Sauri Sosai don Karatu|/guides/subtitle-too-fast.html]]. Bayan gyarawa, sabon bincike yana gudana ta atomatik, kuma rahoton yana ƙidaya abin da aka gyara gaske kawai."
    ]
   },
   {
    "h2": "Yayin da Kake Ciki",
    "ps": [
     "Shafin rahoton zai iya sauke rahoton rubutu mai sauƙi `.qc.txt` kai tsaye — haɗa shi da isarwa ta yadda ɗayan bangaren zai gani a kallo ɗaya abin da ka duba. Don rubutun fim da aka fassara sababbi, gudanar da QC kafin isarwa; ɓarkewar lokaci na duniya wani nau'in matsala ne daban — idan saurin karatu har yanzu ya gaza bayan bincike, duba [[Rubutun Fim Suna Fita Daga Daidaito|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "subtitle-speed-converter": {
  "seo": {
   "title": "Daidaita Rubutun Fassarar Bidiyo Bayan Canza Saurin Bidiyo – AI-SRTSub",
   "desc": "Idan bidiyon ya yi sauri ko a hankali kuma rubutun fassarar bai dace ba: shigar da lambar saurin a matakin daidaita sauri kuma dukkan lokacin zai bi bidiyon.",
   "h1": "Daidaita Rubutun Fassarar Bidiyo Bayan Canza Saurinsa",
   "intro": "Bidiyon ya yi sauri ko a hankali gaba ɗaya, amma rubutun fassarar ya tsaya a kan asalin gudunsa — komai ya lalace daga wani wuri zuwa gaba. Shigar da adadin kuma dukkan lokacin zai daidaita tare da bidiyon.",
   "ctaText": "Buɗe mai gyara lokaci"
  },
  "body": [
   {
    "h2": "Yaushe za a yi amfani da saurin gudu maimakon motsawa",
    "ps": [
     "An sauri ko rage saurin bidiyon **gaba ɗaya** (misali 0.9x ko 1.25x a cikin manhajar gyaran bidiyo) yayin da kowane saiti ya kiyaye asalin tsarinsa: farkon ya yi daidai, kuma yayin da kuke ci gaba, haka abin ke ƙara lalacewa — tare da tsayayyen rabo. Wannan matsalar saurin gudu ce. Idan an sauya dukan fayil ɗin da takamaiman adadi ba tare da ya fi girma ba, motsawa kaɗai ya isa — duba [[motsa dukan fayil ɗin rubutun fassarar zuwa gaba ko baya|/guides/shift-subtitle-timing.html]]."
    ]
   },
   {
    "h2": "Wace lamba ce za a shigar",
    "ps": [
     "Dole ne rubutun fassarar ya bi bidiyon, don haka shigar da **adadin da bidiyon ya canza da gaske**: ƙaruwar sauri ta 1.25x na nufin lokutan saitin sun ninka da 1.25 domin su cim ma shi; rage saurin ta 0.9x yana ninka da 0.9. A cikin mai gyara lokaci, ƙara matakin **Daidaita gwargwadon sauri** kuma saka adadin a cikin akwatin ƙima."
    ],
    "img": {
     "file": "shift-step-rate",
     "alt": "Matakin daidaita gwargwadon sauri tare da adadi a cikin akwatin ƙima",
     "cap": "Adadin da ya wuce 1 yana miƙe lokacin ne (don bidiyon da aka ƙara masa sauri), wanda ke ƙasa da 1 yana matse shi (don wanda aka rage masa sauri)."
    }
   },
   {
    "h2": "Yadda wannan ya bambanta da sauyawa",
    "ps": [
     "Sauyawa yana **motsa** lokutan kowane saiti da adadi ɗaya da aka tsara kuma yana kiyaye tsawon lokacin saitin; saurin gudu yana **ninka** duka farawa da ƙarshe, don haka tsawon lokacin ma yana daidaita. Bayan canjin sauri, tsawon lokacin da kansa ya canza — wanda hakan ne ke sanya ake buƙatar saurin gudu."
    ]
   },
   {
    "h2": "Idan ba ku da tabbas game da adadin",
    "ps": [
     "Idan adadin ya ɓace, koma ga **madogara biyu**: shigar dainiyar lokutan bidiyo na farko da na ƙarshe na saitin kuma komai da ke tsakani zai bazu gwargwadon yadda yake — wanda yake daidai da nemo daidaitaccen adadin. Duba [[rubutun fassarar yana ci gaba da rashin daidaituwa|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "subtitle-too-fast": {
  "seo": {
   "title": "Rubutun Fassarar Ya Yi Sauri Sosai Don Karatu – Gyara Saurin Karatu – AI-SRTSub",
   "desc": "Rubutun fassarar ya yi sauri sosai don karatu — ɗan gajeren lokaci ko dogon rubutu? QC tana nuna shigarwa fiye da haruffa 20 a daƙiƙa (hanzi 9 don CJK); lokuta suna gyaruwa ta atomatik, amma ana buƙatar gyara rubutu.",
   "h1": "Rubutun Fassarar Ya Yi Sauri Sosai Don Karatu",
   "intro": "Masu kallo na ci gaba da danna dakatarwa? Dalilin shine saurin karatu. Yadda ake auna shi, yadda ake gyara shi, da lokacin da za a gyara rubutu maimakon lokaci — duk a cikin jagora guda.",
   "ctaText": "Duba Saurin Karatu"
  },
  "body": [
   {
    "h2": "Menene Saurin Karatu?",
    "ps": [
     "Saurin karatu kawai shine **ko masu kallo za su iya kammala karanta rubutun fassarar a cikin lokacin da yake kan allo**. Lissafin yana da sauƙi: faɗin rubutu raba da daƙiƙa a kan allo. Matsakaicin masana'antu na yau da kullun: haruffa masu faɗi gaba ɗaya 9 a kowace daƙiƙa don Sinanci, Jafananci da Koriya (raka'a rabin faɗi 18), raka'a rabin faɗi 20 a kowace daƙiƙa don sauran harsuna. Layin hanzi 20 wanda ya wuce daƙiƙa 1 ya kai raka'a faɗin 40 a kowace daƙiƙa — fiye da sau biyu na matsakaicin, kuma masu kallo ba za su taɓa kammala shi ba."
    ]
   },
   {
    "h2": "Da Farko, Bambanta Wace Irin Saurin Ce",
    "ps": [
     "“Yi sauri sosai don karatu” a zahiri matsaloli biyu ne daban-daban: **ɗan gajeren lokaci** — saitin yana yankewa bayan milisakan ɗari ɗaya ko ɗari biyu, yawanci kuskuren lokaci ne ko ragowar gyara; **dogon rubutu** — lokacin yana da kyau, amma layin yana cunkushe hanzi 30, kuma babu wani iyakar sauri da zai ceto shi. Gyaran ya saba wa juna, don haka gano wanda kake da shi tukuna."
    ],
    "img": {
     "file": "qc-rules",
     "alt": "Saitin iyakar saurin karatu a shafin QC, wanda tsohuwar ƙimar sa ita ce 18 don CJK da 20 don sauran harsuna",
     "cap": "Ƙofofin saurin karatu na QC: raka'a faɗin 18 a kowace daƙiƙa don CJK, 20 don sauran harsuna"
    }
   },
   {
    "h2": "Yadda Ake Dubawa",
    "ps": [
     "Buɗe [[QC na Rubutun Fassarar|/qc.html]] kuma saka rubutun fassararka a ciki. A cikin rahoton, “ɗan gajeren lokaci” gargaɗi ne wanda ke nuna milisakan da aka auna (mafi ƙaranci: milisakan 833); “saurin da ba a iya karantawa” bincike ne na kansa wanda ke nuna raka'a faɗin da aka auna a kowace daƙiƙa. Don rubutun fassarar harsuna biyu, layin da aka rubuta da harshen da ake nufa ne kawai ke ƙidaya — ba a haɗa harsunan biyu ba."
    ]
   },
   {
    "h2": "Yadda Ake Gyara Shi",
    "ps": [
     "**Ɗan gajeren lokaci**: ana iya gyara shi da dannawa ɗaya — ana tsawaita saitin ta atomatik zuwa milisakan 833, ba tare da wuce farkon saiti na gaba ba (gyara dole ne ya haifar da sabbin sassan da suka haɗu ba). **Dogon rubutu** — babu gyara ta atomatik — na'urar ba za ta iya sanin wane kalma za a yanke ba. Hanyoyi biyu, zaɓinka: rage fassarar (danna tantanin halitta a cikin kayan aikin fassarar don gyara shi), ko miƙe lokacin wannan saitin (idan kawai akwai tazara kafin saiti na gaba; don matsalar tsarin lokaci gaba ɗaya duba [[Motsawar Tsarin Lokaci|/shift.html]]). Sake gudanar da QC bayan hakan don tabbatar da cewa saurin karatu ya koma cikin iyaka."
    ]
   },
   {
    "h2": "Kada Ka Yi Kuskuren Wuce Gona da Irri",
    "ps": [
     "Cika iyakar sauri ba yana nufin kwanciyar hankali ba wajen kallo: cunkushe kowane saiti daidai har zuwa haruffa 9 a kowace daƙiƙa yana sa dukan fim ɗin ya gajiya. A matsayin ka'ida gaba ɗaya, tsaya kusan kashi 70% na iyaka mafi yawancin lokaci, kuma bari sassan da ke da yawan tattaunawa su wuce kaɗan a lokaci guda. Tubalan rubutun fassarar da ke kiftawa akai-akai matsala ce a kanta — gudanar da cikakken saitin ma'auni kafin bayarwa, duba [[Abin da Za A Duba Kafin Bayarwa|/guides/subtitle-quality-check.html]]."
    ]
   }
  ]
 },
 "subtitles-out-of-sync": {
  "seo": {
   "title": "Rubutun Fassarar Yana Ci Gaba da Rashin Daidaituwa? Gyara Shi – AI-SRTSub",
   "desc": "Yana fara da kyau, ya yi baya da daƙiƙa kaɗaɗan a tsakiyar fim, kuma ba a iya amfani da shi a ƙarshe: wannan shi ne tsarin fita daidai a hankali, yawanci rashin dacewar ƙimar firam ne ko canjin saurin bidiyo. Madogara biyu na gyara shi.",
   "h1": "Rubutun Fassarar Yana Ci Gaba da Rashin Daidaituwa: Dalilai da Gyare-gyare",
   "intro": "Yana da kyau a farko, ya yi latti da daƙiƙa biyu bayan mintuna talatin, kuma babu bege a ƙarshe. Wannan nau'in rashin daidaituwa yana da sanannun dalilai — da sanannen gyara.",
   "ctaText": "Gyara wannan fayil ɗin"
  },
  "body": [
   {
    "h2": "Da Farko Bambanta Nau'ikan Rashin Daidaituwa Biya",
    "ps": [
     "Rashin daidaituwa ya kasu kashi biyu: **daidaitaccen rabo** yana nufin kowane saiti yana da latti (ko da wuri) da adadi ɗaya, kusan daidai daga farko zuwa ƙarshe; **fita daidai a hankali** yana nufin farkon yana da daidai kuma kuskuren yana ƙaruwa zuwa ƙarshe, mai yiwuwa ya kai mintuna. Wannan labarin yana game da nau'i na biyu ne — don na farko, duba [[motsa dukan fayil ɗin rubutun fassarar zuwa gaba ko baya|/guides/shift-subtitle-timing.html]]."
    ]
   },
   {
    "h2": "Me Yasa Yake Ƙara Fita Daga Daidaituwa",
    "ps": [
     "Fita daidaitawa yana zuwa daga **agogo biyu daban-daban**: manyan dalilai guda uku da suka fi kowa yawa sune (1) rashin dacewar ƙimar firam — rubutun fassarar fim ɗin 24fps a kan tushen 25fps yana rasa fiye da daƙiƙa guda a kowace minti; (2) an ƙara saurin bidiyon ko an rage shi yayin da rubutun fassarar ya kiyaye asalin gudunsa; (3) rikodin VFR (mai canjin ƙimar firam) wanda tsarin lokacinsa bai daidaita ba tun farko. Abin da suke rabawa: kuskuren yana ƙaruwa kusan ta layi ɗaya tare da lokacin wasa."
    ]
   },
   {
    "h2": "Gyara Shi Da Madogara Biyu",
    "ps": [
     "Domin kuskuren yana ƙaruwa ta layi ɗaya, ɗaura daidaitaccen lokaci a kowane gefe da kuma sake yada tsakiyan gwargwadon yadda ya dace yana dawo da komai. A cikin mai gyara lokaci, ƙara **gyaran madogara biyu**: filayen \"na yanzu\" guda biyu suna cika ta atomatik tare da asalin lokutan wannan fayil ɗin; kuna kallon bidiyon kuma kuna shigar da **lokacin da farkon da ƙarshen saitin suka bayyana gaske** a cikin filayen \"manufa\" guda biyu."
    ],
    "img": {
     "file": "shift-step-two",
     "alt": "Gyaran madogara biyu: lokutan yanzu an cika su ta atomatik, lokutan manufa don shigarwa",
     "cap": "Ɗauki madogaran a matatsun biyu — mafi ƙanƙanta da mafi girma asalin kuskure — kuma komai da ke tsakani yana sake yadawa gwargwadon yadda ya dace."
    }
   },
   {
    "h2": "Yadda Ake Tabbatar da Sakamakon",
    "ps": [
     "Bayan gudanarwa, sashin sakamako yana lissafin asalin kuskuren kowane saiti da sabbin lokuta **gefe da gefe**. Bincika wurare guda uku: saitin farko, ɗaya a tsakiya, da na ƙarshe — matsayi uku tare da mafi ƙanƙanta, matsakaici da mafi girma asalin kuskure. Idan duk ukun sun sauka, dukan fayil ɗin zai yi hakan."
    ],
    "img": {
     "file": "shift-result",
     "alt": "Sashin sakamako: lokutan gabanin da bayannan gefe da gefe, tare da maɓallin zazzagewa",
     "cap": "Sabbin lokutan tsakiyar saiti ya kamata su faɗi tsakanin ƙarshen biyu — alamar cewa rabon yana da daidai."
    }
   },
   {
    "h2": "Yaushe Madogara Biyu Ba Su Isa Ba",
    "ps": [
     "Gyaran madogara biyu yana ɗauka cewa kuskuren **layi ɗaya ne**. Idan tushen rikodin allo ne na VFR tare da tsalle-tsalle na ƙimar firam na tsakiyar fayil, jawo na layi ba zai iya gyara tsakiyar ba — ɗauki tsakiyar saitin da ba daidai ba a fili a matsayin wuri na uku, raba fayil ɗin a can, kuma gudanar da gyaran madogara biyu a kan kowane rabi. Hakanan, bayan gyarawa, sake kallon sashin tsakiya a daidaitaccen sauri don tabbatar da cewa babu sauran rashin daidaituwar gida da ta rage."
    ]
   }
  ]
 },
 "table": {
  "seo": {
   "title": "Canza Rubutun Fassarar zuwa Excel / CSV – Hanyoyi Biyu – AI-SRTSub",
   "desc": "Gabatarwa ta hanya biyu: fitar da SRT/VTT zuwa Excel ko CSV don bita ta jere-jere, sannan a shigar da takardar da aka gyara azaman rubutun fassarar. Ana buƙatar ginshiƙai uku, kowane tsari; an ajiye lokaci azaman rubutu.",
   "h1": "Yadda Ake Canza Rubutun Fassarar zuwa Excel / CSV",
   "intro": "Bita da fassarar suna da sauƙi a cikin takardar bayanai (spreadsheet). Fitar da rubutun fassarar zuwa Excel ko CSV, gyara jere bayan jere, sannan a sake canzawa — ginshiƙan lokaci suna kasancewa rubutu, kuma an kiyaye fasalin layuka a cikin tattaunawa.",
   "ctaText": "Buɗe mai canza tebur"
  },
  "body": [
   {
    "h2": "Abin da Wannan Kayan Aikin Ke Yi",
    "ps": [
     "Rubutun fassarar sune jerin saituna kuma takardun bayanai sune jerin bayanai — da zarar ta zama takarda, bita, sharhi da fassarar taro duk za a iya yin su da kayan aikin da kuka riga kuka sani. Ana goyan bayan hanyoyin biyu:"
    ]
   },
   {
    "h2": "Loda kuma Zaɓi Hanyar Da Aka So",
    "ps": [
     "Jawo fayil ciki ko bincika ɗaya. Kowane hanya tana buƙatar wani nau'in fayil daban: **zuwa tebur** yana ɗaukar fayilolin rubutun fassarar (SRT / VTT), **zuwa rubutun fassarar** yana ɗaukar fayilolin takardar bayanai (CSV / Excel, duka .xlsx da .xls). Zaɓi malalaciyar hanya kuma shafin zai gaya muku irin nau'in fayil ɗin da hanyar ke so.",
     "⚠️ Wannan shafin yana karanta UTF-8 kadai. Idan rubutun fassarar ku ya buɗe azaman taron alamun tambaya ko akwatuna, gudanar da shi ta hanyar [[Gyaran Mojibake|/repair.html]] tukuna — ɓarnatacciyar hanyar lamba tana karanta azaman alamun maye gurbin kawai a nan."
    ],
    "img": {
     "file": "table-up",
     "alt": "Yankin lodin mai canza tebur: wurin jefawa da masu sauya hanyar biyu",
     "cap": "Kowane hanya tana son fayil daban: rubutun fassarar ciki, takardar bayanai waje — da kuma baya"
    }
   },
   {
    "h2": "Fitar da Rubutun Fassarar zuwa Tebur",
    "ps": [
     "Zaɓi \"zuwa tebur\", jefa rubutun fassarar a ciki, kuma gabatarwar tana lissafin kowane saiti: lamba, farawa, ƙarshe, rubutu. Mashigar kididdiga tana ba da adadin saiti da jimlar tsawon lokaci. Sannan danna \"Zazzage Excel (.xlsx)\" ko \"Zazzage CSV\".",
     "Bambancin tsakanin su biyu: .xlsx naini ne na takardar bayanai na gaske inda Excel ba zai iya sake tsara ginshiƙin lokacin ku a bayan ku ba; CSV ya fi sauƙin motsawa, amma Excel na iya fassara ginshiƙin lokaci azaman wani abu lokacin buɗe shi. Idan hakan ta faru, zaɓi ginshiƙin lokaci kuma saita tsarin sa zuwa \"Rubutu\" — ko kawai yi amfani da .xlsx."
    ],
    "img": {
     "file": "table-prev",
     "alt": "Gabatarwar tebur: lamba, farko, ƙarshe da ginshiƙan rubutu tare da mashigar kididdiga",
     "cap": "An nuna kowane saiti; mashigar kididdiga tana ba da adadin saiti da jimlar tsawon lokaci"
    }
   },
   {
    "h2": "Shigar da Tebur Baya zuwa Rubutun Fassarar",
    "ps": [
     "Zaɓi \"zuwa rubutun fassarar\", jefa takardar a ciki, kuma ga dokar ginshiƙi: tana buƙatar ginshiƙai uku don **farkawa, ƙarshe da rubutu** (sunayen Turanci Start / End / Text suna aiki ma), a kowane **tsari**. Ana karɓar `00:00:01,500` da `00:00:01.500` dukansu; jerin da ba za a iya nazari ba ana tsallake su maimakon hukunta dukan fayil ɗin.",
     "An lissafa sakamakon saiti bayan saiti a cikin gabatarwa; tabbatar, sannan zazzage SRT ko VTT. Idan waɗannan ginshiƙai ukun sun ɓace kuna samun saƙon da ke gaya muku ku bincika sunayen kai — yawanci saboda an yi amfani da wani suna daban lokacin fitarwa, ko kuma jerin sunayen kai ba jere na ɗaya ba ne."
    ],
    "img": {
     "file": "table-back",
     "alt": "Yankin sakamakon rubutun fassarar: an lissafa rubutun fassarar da aka shigar saiti bayan saiti",
     "cap": "Ana ba da rahoton ginshiƙan da ba a sani ba, ba a taɓa yin watsi da su a shiru ba"
    }
   },
   {
    "h2": "Tambayoyin da aka fi yin su akai",
    "ps": [
     "**Excel yana nuna ginshiƙin lokaci ba daidai ba?** Yi amfani da .xlsx kuma hakan ba ya taɓa faruwa. Idan dole ne ku yi amfani da CSV: zaɓi ginshiƙin lokaci kuma saita tsarin tantanin halitta zuwa \"Rubutu\" kafin buɗewa.",
     "**Shin dole ne sunayen kai na ginshiƙi su kasance cikin Turanci?** A'a. Ana gane Start / End / Text a kowane harshe da wannan shafin ke goyan baya, kuma girman baƙi ba ya da mahimmanci.",
     "**Shin fasalin layukana yana nan bayan shigarwa?** Ee. Ana kiyaye fasalin layuka a cikin tattaunawa, daidai har zuwa asalin naɗewa.",
     "**Shin ana goyan bayan ASS?** Wannan shafin yana sarrafa SRT da VTT kawai. ASS yana ɗauke da umarnin salo — canza shi zuwa SRT tare da [[Mai canza tsari|/convert.html]] tukuna.",
     "**Fayiloli nawa a lokaci guda?** Ɗaya. Don sarrafa da yawa ko ɗari, yi amfani da [[Canjin taro|/batch.html]] (wanda ke canza tsari kawai kuma ba ya tafiya ta tebur)."
    ]
   },
   {
    "h2": "Sirri",
    "ps": [
     "Canji yana gudana gaba ɗaya a cikin burauzar ku. Ba a tura abubuwan da ke cikin rubutun fassarar zuwa sabista ko yaushe."
    ]
   },
   {
    "h2": "Kayan aiki da jagorori masu alaƙa",
    "ps": [
     "Idan abin da kuke so kawai shi ne matakin rubutun fassarar zuwa Excel, duba [[Canza rubutun fassarar zuwa Excel|/guides/srt-to-excel.html]]; don fassara zuwa wani harshe bayan haka, [[Fassarar rubutun fassarar|/translate.html]]; fayiloli da yawa a lokaci guda — [[Canjin taro|/batch.html]]."
    ]
   }
  ]
 },
 "translate": {
  "seo": {
   "title": "Fassarar Rubutun Fassarar AI – loda zuwa fitarwa mai harsuna biyu – AI-SRTSub",
   "desc": "Fassara rubutun fassarar tare da AI: loda SRT/VTT/ASS, zaɓi daga harsuna 100, haɗa sunaye tare da ƙamus, fitar da rubutun fassarar harsuna biyu. Kyauta don farawa, ana goyan bayan maɓallin API na kanka.",
   "h1": "Yadda Ake Amfani da Fassarar Rubutun Fassarar AI",
   "intro": "Cikakken aiki don fayil ɗin rubutun fassarar guda ɗaya, daga loda ta hanyar fassara zuwa fitarwa: abin da ke kan allo, abin da za a danna, da abin da kuke samu a kowane mataki.",
   "ctaText": "Buɗe kayan aikin fassarar"
  },
  "body": [
   {
    "h2": "Abin da Wannan Kayan Aikin Ke Yi",
    "ps": [
     "Yana fassara rubutun fassarar daga wani harshe zuwa wani kuma yana fitar da fayil ɗin rubutun fassarar wanda yake shirye don amfani. Bukatu na yau da kullun:"
    ]
   },
   {
    "h2": "Loda Rubutun Fassarar",
    "ps": [
     "Danna \"Zaɓi fayil ɗin rubutun fassarar\" ko liƙa rubutun fassarar kai tsaye a cikin akwatin shigarwa na hagu. Ana goyan bayan tsari shida: SRT, VTT, ASS, SSA, SBV da TXT. Ba a da fayil a hannu? Danna \"Loda samfurin\" don ganin shi a aikace. Da zarar an bincika, ginshiƙi na tsakiya yana nuna teburin rubutun fassarar tare da lamba, tsarin lokaci da asalin rubutu don kowane shigarwa."
    ],
    "img": {
     "file": "translate-upload",
     "alt": "Yankin shigarwa na kayan aikin fassarar: zaɓi fayil ɗin rubutun fassarar, akwatin liƙawa da maɓallin loda-samfurin",
     "cap": "Ginshiƙi na hagu \"Loda rubutun fassarar\": zaɓi fayil, liƙa rubutu ko loda samfurin"
    }
   },
   {
    "h2": "Zaɓi Harshe da Salo",
    "ps": [
     "\"Harshen tushe\" na iya tsaya a kan gano ta atomatik; \"harshen manufa\" an zaɓi shi daga harsuna 100. Akwai salojin fassarar guda biyar: Daidaitacce (tsohuwa), Mai tattaunawa, Kwararre na hukuma, Salon dubbing da Na musamman. \"Salon dubbing\" ya dace da tattaunawar fim da talabijin; \"Kwararre na hukuma\" ya dace da takardu da darussa."
    ],
    "img": {
     "file": "translate-lang",
     "alt": "Saitunan harshe da salon fassarar: harshen tushe, jerin harshen manufa da salo biyar",
     "cap": "\"Harshe\" da \"salon fassarar\": tushe zai iya gano ta atomatik, zaɓuɓɓukan manufa 75"
    }
   },
   {
    "h2": "Ƙamus: kiyaye sunaye daidai",
    "ps": [
     "AI tana fassara a rukuni-rukuni, don haka ana iya fitar da sunan ɗaya ta hanyoyi biyu daban-daban a cikin rukuni daban-daban. Rubuta dokokin \"tushe → dole ne a fassara shi azaman\" a cikin ƙamus; kafin kowane rukuni kayan aikin suna duba shi kuma suna bin kowane daidaituwa. Dokar ɗaya a kowane layin; kibiyoyi za su iya zama `->`, `=>`, `→` ko Tab; kalmar tushe ɗaya tana nufin a bar ta ba a fassara ta ba; haruffa da yawa za su iya raba fassara guda ɗaya ta hanyar `|`. Danna \"✨ Cire AI\" don samun AI ta cire proper nouns daga bidiyon zuwa teburin tukuna, sannan gyara da fassara."
    ],
    "img": {
     "file": "translate-glossary",
     "alt": "Yankin ƙamus da proper-noun: akwatin shigar da ƙamus tare da cire AI da maɓallin adanawa",
     "cap": "Ƙamus na \"sunaye haɗe\": AI ta cire proper nouns, an loda su ta atomatik don sabbin bidiyoyi da zarar an adana su"
    }
   },
   {
    "h2": "Tsarin Fassarar",
    "ps": [
     "Danna \"▶ Fara fassara\" a cikin mashigar sama. Yankin ƙididdiga na tsakiya yana nuna shigarwa, wanda aka fassara, ciko da aka share da rukunin jumla na cross-entry ainihin lokaci; mashigar ci gaba tana nuna kimanin lokacin da ya rage da alamomin da aka yi amfani da su. Yayin da ake fassara, danna kowane tantanin fassarar a cikin tebur don gyara rubutun — ana adana canje-canje a kan na'urar ku kuma sun tsira daga sabuntawa. Rufe shafin tsakiyar aiki kuma za a ba ku damar ci gaba inda ya tsaya. Lokacin da jumla guda ta mamaye shigarwa da yawa, an haɗa rukunin, an fassara kuma an cika shi ta hanyar tsawon lokaci."
    ],
    "img": {
     "file": "translate-workspace",
     "alt": "Wuraren aikin fassarar: yankin ƙididdiga, mashigar ci gaba da teburin rubutun fassarar da za a iya gyarawa",
     "cap": "Wuraren aiki na tsakiya: yankin ƙididdiga + mashigar ci gaba + teburin rubutun fassarar da za a iya dannawa don gyarawa"
    }
   },
   {
    "h2": "Fitarwa",
    "ps": [
     "A cikin ginshiƙi na dama zaɓi tsarin abun ciki da farko: fassarar kawai (monolingual), harsuna biyu tare da asalin a sama, ko harsuna biyu tare da fassarar a sama; sannan tsarin fayil: SRT, WebVTT, SBV, ASS ko TXT. Zaɓin ASS yana ƙara shimfidu biyu: raba allo na sama/ƙasa da layukan ƙasa masu jera. Abun ciki da tsari suna haɗuwa da yardar kowa cikin salojin fitarwa 14. An saita faɗin layin harsuna biyu daban. Danna \"Zazzage rubutun fassarar\" don adana fayil ɗin, ko \"Kwafi zuwa allo\" don liƙa shi nan take."
    ],
    "img": {
     "file": "translate-export",
     "alt": "Kwamitin fitarwa: nau'ikan abun ciki guda uku, tsarin fayil guda biyu da saitunan faɗin layin harsuna biyu",
     "cap": "Fitarwar ginshiƙi na dama: zaɓi tsarin abun ciki da farko, sannan tsarin fayil"
    }
   },
   {
    "h2": "Farashi da Sirri",
    "ps": [
     "Samfurin tsohuwa baya buƙatar rajista kuma babu maɓallin — yana aiki daga akwatin tare da ƙayyadaddun abubuwan da ake buƙata na kowane buƙata: iyakar yau da kullun kowane IP tare da izinin yau da kullun na shafin gaba ɗaya. Don manyan rukunoni, shigar da maɓallin API na kanka a ƙarƙashin \"Injin fassarar\". Sirri, bisa ga sanarwar da ke shafin: an tura rubutun fassarar don samfurin tsohuwa ta hanyar sabar wannan shafin zuwa ga mai ba da sabis; mai ba da API na musamman yana sarrafa shi kai tsaye ta hanyar mai ba da sabis da kuka shigar, kuma maɓallin yana zaune a cikin burauzar ku. Bincike, naɗewar layin da shimfidar harsuna biyu duk suna gudana a cikin burauzar cikin gida."
    ]
   },
   {
    "h2": "Tambayoyin da Aka Fi Yawaita (FAQ)",
    "ps": [
     "**Sauran harsuna sun gauraya a cikin fassarar?** Kayan aikin suna gano karkacewar harshe kuma suna sake fassara ta atomatik; idan ƴan shigarwa har yanzu suna da kuskure, danna tantanin kuma gyara su da hannu.",
     "**Yaya game da layukan waka?** \"Tace abun ciki\" yana ba da zaɓuɓɓuka guda uku don waƙoƙi: fassara waƙoƙin, kiyaye asalin ko share su.",
     "**Fassarar sunaye da ba ta dace ba?** Ƙara sunayen da ba su dace ba zuwa ƙamus kuma sake fassara; ƙamus yana da fifiko fiye da tsohuwar saitin \"sarrafa proper-noun\".",
     "**Kuna son Turanci a sama da Sinanci a ƙasa?** Zaɓi \"Harsuna biyu · asalin a sama\" lokacin fitarwa; don Sinanci a sama da Turanci a ƙasa, zaɓi \"Harsuna biyu · fassarar a sama\"."
    ]
   },
   {
    "h2": "Kayan aiki da jagorori masu alaƙa",
    "ps": [
     "Tsarin da bai dace ba? Fara da [[canjin tsari|/convert.html]]; tsarin lokaci ba daidai ba ne? Yi amfani da [[daidaita tsarin lokaci|/shift.html]]; kafin miƙa shi, gudanar da shi ta hanyar [[binciken ingancin rubutun fassarar|/guides/subtitle-quality-check.html]]."
    ]
   }
  ]
 },
 "translate-english-to-chinese": {
  "seo": {
   "title": "Fassara Subtitles na Turanci zuwa Sinanci – AI-SRTSub",
   "desc": "Fassara subtitles na Turanci zuwa Sinanci: loda SRT/VTT/ASS, zaɓi Mai Sauƙi ko Na Gargajiya, kuma fitar da subtitles na Sinanci kawai ko na harsuna biyu. – AI-SRTSub",
   "h1": "Fassara Subtitles na Turanci zuwa Sinanci",
   "intro": "SRT na Turanci a ciki, subtitles na Sinanci (ko na harsuna biyu na Turanci-Sinanci) a waje: loda, zaɓi harshen da ake so, fitar da shi — duk a shafi ɗaya.",
   "ctaText": "Fassara subtitles na Turanci"
  },
  "body": [
   {
    "h2": "Lokacin da kake buƙatar hakan",
    "ps": [
     "Subtitle da ka sauke na Turanci ne kaɗai kuma ba za ka iya bin su ba; ko kuma kana son subtitles na Sinanci don 'yan uwa waɗanda ba sa karanta Turanci. Abin da kake buƙata yana zuwa a cikin ɗaya daga cikin siffofi uku — **subtitles na Sinanci kaɗai**, ko subtitles na harsuna biyu tare da **Sinanci a sama, Turanci a ƙasa** ko **Turanci a sama, Sinanci a ƙasa** — kuma wannan kayan aikin yana fitar da duka ukun."
    ]
   },
   {
    "h2": "Yadda ake yin hakan",
    "ps": [
     "Buɗe [[AI Subtitle Translator|/translate.html]] sannan ka sanya fayil ɗin subtitle na Turanci (ana gane SRT, VTT, ASS, SSA, SBV da TXT, ko kuma kawai ka liƙa rubutun). Bari “Source language” kan gano kai tsaye, saita “Target language” zuwa Sinanci mai Sauƙi ko Na Gargajiya, kuma danna “▶ Start translating”. Lokacin da ya gama, zaɓi tsarin abun ciki a cikin kwamitin fitarwa a gefen dama: fassara kaɗai (harshe ɗaya), harsuna biyu · na asali a sama (Turanci a sama, Sinanci a ƙasa), ko harsuna biyu · fassara a sama (Sinanci a sama, Turanci a ƙasa), sannan ka zaɓi tsarin fayil kuma ka sauke."
    ],
    "img": {
     "file": "translate-export",
     "alt": "Kwamitin fitarwa: fassara kaɗai, harsuna biyu tare da na asali a sama, da harsuna biyu tare da fassara a sama",
     "cap": "Zaɓi tsarin abun ciki a lokacin fitarwa: Sinanci kaɗai, ko harsuna biyu na Turanci a sama / Sinanci a sama"
    }
   },
   {
    "h2": "Matsaloli biyu na gama-gari",
    "ps": [
     "**Ana fassara sunaye daban-daban?** AI yana fassarawa a rukuni, don haka abu ɗaya na iya fitar da sunaye ta hanyoyi biyu. Sanya ma'auratan “source → translated name” a cikin ƙamus ɗin kalmomi (misali `Watson → Huasheng`) don kiyaye shi ya kasance daidai a duk fadin.",
     "**Subtitles sun fara bambanta da hoton?** Fassara da farko, sannan gyara lokacin: kayan aikin lokaci da ke sama a wurin aiki yana da ikon daidaita kewayawa da sikelin duniya — duba [[Subtitles drift out of sync toward the end|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "videosub": {
  "seo": {
   "title": "Cire da Subtitles da ke Ƙunshe a cikin Bidiyo – Wakokin MKV / MP4 – AI-SRTSub",
   "desc": "Karanta wakokin subtitle da ke cikin MKV, WebM, MP4 da MOV kai tsaye kuma fitar da SRT / VTT / ASS / TXT. Babu loda, babu sauya fasali, an jera kowane harshe, an ambaci subtitles na hoto.",
   "h1": "Yadda ake cire subtitles da ke Ƙunshe a cikin Bidiyo",
   "intro": "Karanta waƙar subtitle da ke kulle a cikin MKV / MP4 kai tsaye kamar SRT — ba a taba loda bidiyon ba, duk ana karanta shi ne a cikin burauza.",
   "ctaText": "Buɗe cire subtitle na bidiyo"
  },
  "body": [
   {
    "h2": "Abin da wannan kayan aikin ke yi",
    "ps": [
     "Subtitles za a iya kulle su a cikin fayil ɗin bidiyo maimakon tsayawa kaɗai. Don gyarawa, fassara ko haɗa su, dole ne farko ka fitar da su — wancan shine abu ɗaya da wannan shafin ke yi."
    ]
   },
   {
    "h2": "1 Ƙara bidiyon",
    "ps": [
     "Jawo fayil ɗin bidiyo zuwa ginshiƙi na farko ko danna don zaɓar ɗaya. **MKV / WebM** da **MP4 / MOV** ne kawai aka amince da su; sauran kwantenar ba za su fitar da kowace waƙa ba.",
     "Fayil ɗin bai taba barin kwamfutarka ba — babu matakin loda. Kayan aikin yana karanta a cikin ƙananan chunks ta hanyar offset, don haka fim mai girman gigabyte da yawa baya cika ƙwaƙwalwa, amma karatu na farko dole ne ya bincika bayanin waƙar sau ɗaya."
    ],
    "img": {
     "file": "videosub-up",
     "alt": "Yankin ƙara bidiyo na shafin cire subtitle ɗin da ke ƙunshe",
     "cap": "Ana goyan bayan MKV / WebM da MP4 / MOV, kuma fayil ɗin bai taba barin na'urarka ba"
    }
   },
   {
    "h2": "2 Waƙokin subtitle da ke ƙunshe",
    "ps": [
     "Da zarar karatun ya ƙare, ginshiƙi na biyu yana jera waƙokin subtitle a cikin fayil ɗin **ɗaya kowane jeri**, yawanci tare da harshe da sunan waƙa (misali \"Chinese\", \"English\", \"Forced\"). Danna jeri don cire waccan waƙar.",
     "Lokacin da fayil ɗin ke da waƙar subtitle guda ɗaya kawai, cirewa yana farawa ta atomatik — babu buƙatar danna.",
     "**Ba za a iya cire subtitles na hoto ba**: Blu-ray PGS da subtitles na DVD hotuna ne da aka ƙona a cikin kwarara ba tare da rubutu donauka ba, kuma shafin yana faɗar hakan a fili; waɗannan suna buƙatar OCR."
    ],
    "img": {
     "file": "videosub-track",
     "alt": "Jerin waƙokin subtitle da ke ƙunshe, ɗaya kowane jeri",
     "cap": "Waƙa ɗaya kowane jeri; idan akwai ɗaya kawai, cirewa yana farawa ta atomatik"
    }
   },
   {
    "h2": "3 Sakamakon",
    "ps": [
     "\"3 Result\" a gefen dama yana nuna rubutun subtitle da aka cire, tare da tsarin fitarwa a sama da shi: **SRT / VTT / ASS / TXT**. Danna \"Download\" ko \"Copy\".",
     "Lokacin da waƙar tushen ta kasance ASS, nata kan takarda na salo da ƙuduri suna dawowa ba tare da canzawa ba — fitarwa azaman ASS tana adana su, yayin da fitarwa azaman SRT ke ɗauke da rubutu kawai."
    ],
    "img": {
     "file": "videosub-out",
     "alt": "Yankin sakamako tare da zaɓin tsarin SRT / VTT / ASS / TXT",
     "cap": "Tsarin fitarwa huɗu; tushen ASS yana riƙe da kan takarda na salo da ƙuduri"
    }
   },
   {
    "h2": "Abin da aka bari ba a taɓa shi ba",
    "ps": [
     "Kanta fayil ɗin bidiyo ba a taɓa shi ba kwata-kwata — karatu kawai, babu rubutu, babu sauya fasali, babu remuxing.",
     "Abubuwan da ke cikin subtitle suna fita kamar yadda yake: babu zato na ɓoye, babu gyaran lokaci. Idan subtitles da aka cire sun ɓace, wannan matsala ce ta ɓoye a cikin waƙar tushe — kai shi zuwa [[Garbled text repair|/repair.html]]."
    ]
   },
   {
    "h2": "Tambayoyi na gama-gari",
    "ps": [
     "**Shin da gaske babu wata hanyar magance subtitles na hoto (PGS / DVD)?** Ba a wannan shafin ba — hotuna ne marasa layin rubutu. Dole ne OCR ya zo da farko, kuma wannan shafin ba ya yin hakan.",
     "**Subtitles da aka cire ba su da lokaci mai kyau — me yasa?** Wannan shafin baya gyara lokaci; abin da ya fito shine abin da ke wurinta. Don biyan diyya na duniya ko matsalar ƙimar amfani [[Timeline adjustment|/shift.html]].",
     "**Me yasa yake ɗaukar lokaci mai tsawo kafin wani abu ya faru?** Dole ne a bincika babban fayil ɗin chunk da chunk don bayanin waƙa, kuma mafi girman fayil ɗin shine tsawon lokacin da yake ɗauka; wannan yana faruwa a gida kuma ba shi da alaƙa da haɗin gwiwar ku.",
     "**Zan iya amfani da wannan shafin don fayilolin subtitle na waje?** Ba kwa buƙatar hakan — .srt / .ass na waje yana shiga kai tsaye cikin [[Format conversion|/convert.html]] ko wani kayan aiki. Wannan shafin na subtitles ne da aka rufe a cikin bidiyo."
    ]
   },
   {
    "h2": "Sirri",
    "ps": [
     "Ana karanta bidiyon gaba ɗaya a cikin burauza: ba a loda komai ba, ba a sauya komai ba, babu abin da ke wucewa ta sabar. Rufe shafin kuma an fitar da bayanai da aka karanta."
    ]
   },
   {
    "h2": "Kayan aiki da jagorori masu alaƙa",
    "ps": [
     "Don fassara abin da kuka cireje zuwa [[Subtitle translation|/translate.html]], don sanya shi harsuna biyu duba [[Two ways to make bilingual subtitles|/guides/make-bilingual-subtitles.html]]; don bambanci tsakanin waƙoƙi masu alaƙa da na waje, da waɗanda za a iya cirewa, duba [[How to get subtitles out of a video|/guides/extract-subtitles-from-video.html]]."
    ]
   }
  ]
 },
 "vtt-to-srt": {
  "seo": {
   "title": "Mai Juya VTT zuwa SRT – Juyar da Subtitles na WebVTT – AI-SRTSub",
   "desc": "Juyar da VTT (WebVTT) zuwa SRT don masu gyara da masu kunna waɗanda ke karɓar SRT kawai. Ana share kan gaba na WEBVTT da toshewar NOTE ta atomatik. Yana aiki a cikin burauza.",
   "h1": "VTT zuwa SRT",
   "intro": "Juya VTT (WebVTT) subtitles zuwa SRT: zubar da fayil ɗin, zaɓi SRT, sauke. Ana share kan gaba da toshewar note sannan alamar lokaci tana komawa ga amfani da hular kwana (comma).",
   "ctaText": "Juya VTT → SRT"
  },
  "body": [
   {
    "h2": "Lokacin da kake buƙatar SRT baya",
    "ps": [
     "CapCut, Premiere, mafi yawan masu kunna bidiyo na tebur, da tsoffin kayan aikin subtitle suna karɓar **SRT** kaɗai. Subtitles da aka sauke daga yanar gizo ko daga YouTube yawanci suna zuwa a matsayin VTT — juya su zuwa SRT don shigarwa kai tsaye."
    ]
   },
   {
    "h2": "Abin da ake sharewa daga VTT",
    "ps": [
     "Layin kan gaba na **WEBVTT header line**, toshewar NOTE, toshewar STYLE/REGION, da saitin cue bayan layin lokaci (kamar align:start) ba rubutun subtitle ba ne — ana cire su ta atomatik; ana dawo da lambobi kuma mai raba lokaci na milisogwandi yana komawa daga ɗigo zuwa hular kwana (comma)."
    ],
    "img": {
     "file": "convert-upload-vtt",
     "alt": "Yankin loda: an ɗora fayil ɗin VTT, an gano shi azaman VTT",
     "cap": "An gano fayil mai kan gaba na WEBVTT azaman VTT nan take"
    }
   },
   {
    "h2": "Yadda ake juyawa",
    "ps": [
     "Buɗe [[converter|/convert.html]], zubar da VTT a ciki, zaɓi **SRT - SubRip** azaman fitarwa, sannan juya kuma ka sauke. Rubutun da ƙimar lokaci suna kasancewa ba a taɓa su ba."
    ],
    "img": {
     "file": "convert-result-srt",
     "alt": "Sakamakon juyawa: lambobin SRT tare da alamomin lokaci na comma",
     "cap": "SRT da aka juya: lambobin cue + alamomin lokaci na comma"
    }
   }
  ]
 }
};
