/* i18n/gd-zu.js —— 43 篇指南页的zu译文（由 _mkgd.js 生成，勿手改）
 * 源：_gd/zu.json（Gemini 翻译，_gemgd.js 产出）
 * 结构：{ <slug>: { seo:{title,desc,h1,intro,ctaText}, body:[{h2,ps[],img}] } }
 * ⚠️ server.js 自己 require 它，不被任何 html 引用 —— 部署时必须显式加进传输列表。
 */
module.exports = {
 "ass-to-srt": {
  "seo": {
   "title": "Isiguquli se-ASS sibe yi-SRT – Guqula Amazwibela e-ASS/SSA – AI-SRTSub",
   "desc": "Guqula amazwibela e-ASS (ne-SSA) abe yi-SRT ecacile: umbhalo nesikhathi kukhishwa njengoba kunjalo, amathegi esitayela ayasalela emva. Kwisoftware eyamukela i-SRT kuphela. Isebenza esipheqululini sakho.",
   "h1": "I-ASS ibe yi-SRT",
   "intro": "Guqula amazwibela e-ASS (noma i-SSA) abe yi-SRT: donsela ifayela phansi, khetha i-SRT, bese ulanda. Umbhalo nesikhathi kukhishwa njengoba kunjalo; amathegi esitayela awadluliselwa phambili.",
   "ctaText": "Guqula i-ASS → i-SRT"
  },
  "body": [
   {
    "h2": "Uma udinga i-SRT futhi",
    "ps": [
     "Izindawo zokuhlela, amabhokisi aphezulu esethi, izidlali ze-TV, namathuluzi okuhumusha — izinyathelo eziningi ezilandelayo zamukela **i-SRT** kuphela. Isitayela esihle nokubekwa ku-ASS akusho lutho lapho, ngakho-ke i-SRT ecacile iyisinqumo esiphephile sokudlulisela."
    ]
   },
   {
    "h2": "Kwenzekani kumathegi esitayela",
    "ps": [
     "Isethi ngayinye ye-ASS iwumugqa Wengxoxo (Dialogue) onombhalo ovame ukuphatha amathegi okweqa anjenge-`{\\fonts}` wombala, ukunyakaza, noma imiphumela. Ukuguqulela ku-SRT **kuqeda la mathegi kanye nesitayela**, kugcina kuphela umbhalo nesikhathi; `\\N` ukwehliswa kwemigqa kuba ukwehliswa kwemigqa kwangempela. Amafayela e-SSA nawo ayafundeka."
    ],
    "img": {
     "file": "convert-result-srt",
     "alt": "Umphumela wokuguqula: Izinombolo ze-SRT nombhalo okhishwe ku-ASS",
     "cap": "I-SRT ekhishiwe: inombolo eyodwa yesethi ngayinye, umbhalo ohlanzekile"
    }
   },
   {
    "h2": "Ungayiguqula kanjani",
    "ps": [
     "Vula [[isiguquli|/convert.html]], faka ifayela le-ASS (ne-.ssa iyasebenza), khetha **SRT - SubRip** njengokuphumayo, bese uguqula bese ulanda. Uhamba ngenye indlela? Bona [[i-SRT ibe yi-ASS|/guides/srt-to-ass.html]]."
    ]
   }
  ]
 },
 "batch": {
  "seo": {
   "title": "Indlela Yokuguqula Amazwibela Ngobuningi – Amakhulu abe yi-ZIP Eyodwa – AI-SRTSub",
   "desc": "Umhlahlandlela: faka amafayela e-SRT/VTT amaningi, uguqulele kwifomu eyodwa, ulande i-ZIP eyodwa. Inombolo entsha, izikhathi ezilinganisiwe, amafayela angabonakaliyo amakishwe esikhundleni sokungena buthule ku-archive.",
   "h1": "Indlela yokuguqula amazwibela ngobuningi",
   "intro": "Isizini yonke yamazwibela idinga ukuba ifike kwifomu eyodwa, futhi ukuwafaka elilodwa nelilodwa kuthatha isikhathi eside. Wafake wonke lapha, uwaguqule ndawonye bese ulanda i-ZIP eyodwa — amafayela angakwazi ukufundwa ayamakishwa, angalokothi afakwe buthule sengathi asebenzile.",
   "ctaText": "Vula ukuguqula ngobuningi"
  },
  "body": [
   {
    "h2": "Lokho okwenziwa yileli thuluzi",
    "ps": [
     "Amazwibela esizini yonke noma iqoqo lebhokisi adinga ukufana ngaphambi kokuba kwenziwe okunye ngawo. Nakhu okwenziwa ikhasi lobuningi:"
    ]
   },
   {
    "h2": "Ukungeza amafayela",
    "ps": [
     "Hudula amafayela amazwibela amaningi ebhokisini elinamachaphaza ndawonye, noma uchofoze bese ukhetha amaningi ngesikhathi esisodwa. Uhlu lwamafayela lubonisa ngalinye: amafayela afundiwe abonisa isibalo sawo sezethi, lawo angafundwanga amakishwa kalula njengangaziwa. Ibha engenhla ibala isibalo samafayela wonke, isibalo sezethi nokuthi mangaki angaziwa.",
     "⚠️ Leli khasi lifunda i-UTF-8 kuphela. Noma yini enekhowudi ephukile (ulayini wemibuzo noma amabhokisi) kufanele idlule ku-[[Ukulungiswa kwe-Mojibake|/repair.html]] kuqala."
    ],
    "img": {
     "file": "batch-list",
     "alt": "Uhlu lwamafayela: igama nesibalo sezethi efayeleni ngalinye, okungaziwa kumakishwe ngokubomvu",
     "cap": "Ifayela ngalinye libhalwe phansi, futhi okungaziwa kumakishwe endaweni"
    }
   },
   {
    "h2": "Okufanele uguqulele kukho konke",
    "ps": [
     "Khetha ifomu eliqondiwe ngaphansi \"Guqula konke kube yi-\" — i-SRT noma i-VTT. Ifayela ngalinye elohlwini liyakhishwa kabusha ngaleyo fomu: izinombolo zezethi zibhalwa kabusha kusuka phezulu, izikhathi zilinganiswe kulokho okuqondiwe (i-SRT yehlukanisa ama-millisecond nge-koma, i-VTT ngeviki).",
     "**Amagama wokuqala amafayela agcinwa futhi kuphela isandiso esishintshelwayo**; amagama aphindaphindwayo athola inombolo eyengeziwe ukuze kungabikho lutho olubhala phezu kolunye."
    ],
    "img": {
     "file": "batch-up",
     "alt": "Umkhethi wefomu oqondisiwe nesimo sohlu, nebha yezibalo ebonisa isibalo samafayela nezethi",
     "cap": "Khetha ifomu eliqondiwe futhi ifayela ngalinye liyazala kabusha; amagama amafayela ashintsha isandiso kuphela"
    }
   },
   {
    "h2": "Ukufaka nokulanda",
    "ps": [
     "Chofoza u-\"Faka ku-ZIP eyodwa bese ulanda\" futhi i-archive iqukethe fayela ngalinye eliguquliwe. **Amafayela angenazethi eziqondakalayo ahlala ngaphandle kwe-archive** — ahlala ohlwini, amakishwe, esikhundleni sokuxutshwa sengathi aphumelele. Uma selifakwe, uthola isibalo samafayela angaphakathi."
    ],
    "img": {
     "file": "batch-zip",
     "alt": "Indawo yokufaka: inkinobho yokulanda i-ZIP nomyalezo womphumela wokufaka",
     "cap": "Amafayela angaziwa ahlala ngaphandle kwe-archive futhi ahlala amakishwe ohlwini"
    }
   },
   {
    "h2": "Kungani ifayela limakwa njengelingaziwa",
    "ps": [
     "Ifayela limakwa uma kungekho zethi ezingafundwa kulo. Izizathu ezintathu ezivamile: akusona amazwibela nhlobo (njengefayela le-.txt elilahlekile), ikhowudi akuyona i-UTF-8 (ngakho lifundeka njengezinhlamvu zokufaka kuphela), noma okuqukethwe kuhlanganisiwe kwaba ibhulokhi eyodwa engenazo izikhathi.",
     "Amafayela amakishwe angalungiswa ngokwehlukana: izinkinga zekhowudi ziya ku-[[Ukulungiswa kwe-Mojibake|/repair.html]], izinkinga zefomu ziya [[Isiguquli sefomu|/convert.html]] zokuguqula eyedwa ngaphaphambi kokubuyela ohlwini."
    ]
   },
   {
    "h2": "I-FAQ",
    "ps": [
     "**Mangaki amafayela engingawangeza?** Awukho umkhawulo oqinile; kuxhomeke kwimemori yesiphequluli sakho, futhi amafayela ambalwa wama-SRT alungile ngokuvamile.",
     "**Ngabe kushintsha inkulumo yami?** Cha. Ukuguqula ngobuningi kuguqula ifomu lesitsha kuphela — ukubhala kabusha izethi nokulinganisa izikhathi — akulokothi kushintshe negama lenkulumo.",
     "**Kuthiwani uma ngidinga ukushintsha okuqukethwe?** Leli khasi liguqula amafomu kuphela. Ukushintsha isikhathi ngobuningi sebenzisa [[Ukulungiswa kwesikhathi|/shift.html]]; ukushintsha amagama sebenzisa [[Ukufakwa esikhundleni samagama|/glossary.html]]; zombili zisebenza ifayela ngalinye.",
     "**Ngabe i-ASS iyasekelwa?** Leli khasi liguqula phakathi kwe-SRT ne-VTT kuphela. I-ASS iphethe isitayela — sebenzisa [[Isiguquli sefomu|/convert.html]] kuyo eyedwa."
    ]
   },
   {
    "h2": "Ukugcinwa kuyimfihlo",
    "ps": [
     "Ukuguqula nokufaka kuqhubeka ngokuphelele esipheqululini sakho. Alikho okuqukethwe kwamazwibela okuthunyelwa kuseva."
    ]
   },
   {
    "h2": "Amathuluzi ahlobene nemihlahlandlela",
    "ps": [
     "Okumele ukushintshe isizini yonke nangaliphi i-oda — [[Ukuhlela ngobuningi isizini yonke yamazwibela|/guides/batch-convert-srt.html]]; amafomu amaningi efayela elilodwa — [[Isiguquli sefomu|/convert.html]]; ukubuyekeza etafuleni — [[Amazwibela ⇄ itafula|/table.html]]."
    ]
   }
  ]
 },
 "batch-convert-srt": {
  "seo": {
   "title": "Ukuhlela Isizini Yonke Ngobuningi – Okusebenzayo, Okungasebenzi – AI-SRTSub",
   "desc": "Isizini ivame ukudinga ushintsho olufanayo kuyo yonke indawo: ifomu elifanayo, ukulungiswa kwesikhathi, amatemu. Nakhu okuqeda ngesikhathi esisodwa, okungenakwenza, nendlela yokuphatha amafayela angaphumelelanga ukufundwa.",
   "h1": "Ukuhlela isizini yonke yamazwibela ngobuningi",
   "intro": "Uma amafayela amazwibela amaningi edinga ushintsho, ngokuvamile kuwushintsho olufanayo ngaso sonke isikhathi. Ukwazi ukuthi yimaphi amalungu angenziwa ngesikhathi esisodwa kusindisa isikhathi esiningi kakhulu kunesikhathi sokusebenza ngawo ngamunye ngamunye.",
   "ctaText": "Vula ukuguqula ngobuningi"
  },
  "body": [
   {
    "h2": "Ngokuvamile kuwushintsho olufanayo kuyo yonke indawo",
    "ps": [
     "Uma amazwibela engahambisani kahle esizinini yonke, isiqephu ngasinye asivamile ukuba nenkinga yaso eyodwa — ngokuvamile kuwimbangela eyodwa efinyelela esiqephubeni ngasinye: iqembu elifanayo lokukhipha likhiphe wonke (ngakho ifomu namawotamakha kufana), wonke abekwe isikhathi kunguqulo yevidiyo efanayo (ngakho isikhombisi sokuphambukela nesilinganiso kuyavumelana), noma ukuhunyushwa kwezinhlamvu kwehlukile kuyo yonke isizini.",
     "Hlola iziqephu ezimbili kuqala — eyodwa yangaphambi kwesikhathi, eyodwa yakamuva — futhi uqinisekise ukuthi **inenkinga efanayo** ngaphambi kokwenza noma yini ngobuningi. Uma zihlukene, lokhu akulungiseki ngokusebenzisa uhlelo lobuningi."
    ]
   },
   {
    "h2": "Okungenziwa ngesikhathi esisodwa",
    "ps": [
     "**Ukuhlanganisa ifomu** yinto eyodwa eqeda ngempela ngesikhathi esisodwa: hudula amafayela amaningi e-SRT ne-VTT ku-[[Ukuguqula ngobuningi|/batch.html]] ndawonye, khetha ifomu eliqondiwe bese ulanda i-ZIP eyodwa. Ukubhalwa kabusha kwezinombolo nokulinganiswa kwezikhathi kwenzeka ngaleso sikhathi, futhi alikho negama lenkulumo elishintshelwayo."
    ],
    "img": {
     "file": "batch-list",
     "alt": "Uhlu lwamafayela ekhasi lobuningi: isibalo sezethi efayeleni ngalinye, okungaziwa kumakishwe ngokubomvu",
     "cap": "Ifomu elifanayo yinto eyodwa eqeda ngempela ngesikhathi esisodwa"
    }
   },
   {
    "h2": "Okumele kwenziwe ifayela ngalinye",
    "ps": [
     "Lokhu akunenkinobho yokungena yobuningi futhi kudinga ukwenziwa nge-fayela ngalinye — yize ngokuvamile kukhona okulinganayo **okudingeka kwenziwe kanye kuphela bese kusebenza esizinini yonke**:"
    ]
   },
   {
    "h2": "Thola i-oda elifanele",
    "ps": [
     "Uma izinto eziningi zidinga ukwenziwa, i-oda elingalungile lisho ukuthi kuzodingeka kuqaliswe kabusha. Hamba ngale ndlela:",
     "**Lungisa ikhowudi** → **hlanganisa ifomu** → **shintsha okuqukethwe** (amawotamakha, amatemu, isikhathi) → **hlola ikhwalithi ekugcineni**. Ukuguqula amafomu ngaphambi kokulungisa ikhowudi kunikeza kuphela i-mojibake esitsheni esihlukile; ukushintsha okuqukethwe ngaphambi kokuba amafayela ahlanganiswe kusho ukusebenza nokusekelwa kwamathuluzi okungahambisani."
    ],
    "img": {
     "file": "batch-zip",
     "alt": "Indawo yokufaka: inkinobho yokulanda i-ZIP nomyalezo womphumela",
     "cap": "Hlanganisa amafomu kuqala, shintsha okuqukethwe ngemuva kwalokho"
    }
   },
   {
    "h2": "Ukusingatha amafayela angaziwanga",
    "ps": [
     "Amafayela amakishwe njengangaziwa ekuguquleni ngobuningi ashiywa ngaphandle kwe-ZIP futhi ahlala ohlwini. Izizathu ezintathu ezivamile: akusona ifayela lezamazwibela (ifayela le-readme elilahlekile), ikhowudi akuyona i-UTF-8, noma okuqukethwe kuhlanganisiwe kwaba ibhulokhi eyodwa ngaphandle kwezikhathi.",
     "Izinkinga zekhowudi ziya ku-[[Ukulungiswa kwe-Mojibake|/repair.html]] ngazinye; izinkinga zefomu ziya ku-[[Isiguquli sefomu|/convert.html]] ngaphambi kokubuyisela ohlwini. **Ungaphoqi amafayela angaziwa ku-archive ukuze nje ukhuphule isibalo** — ukuthola isiqephu esilahlekile kumdlali wakho kubiza kakhulu kunesikhathi esincane lokhu okusindisayo."
    ]
   },
   {
    "h2": "Amathuluzi ahlobene nemihlahlandlela",
    "ps": [
     "Umhlahlandlela ophelele wobuningi — [[Indlela yokuguqula amazwibela ngobuningi|/guides/batch.html]]; ukulinganisa isikhathi okufanayo — [[Indlela yokulungisa isikhathi samazwibela|/guides/shift.html]]; ukuhlola kokugcina ngaphambi kokuletha — [[Ukuhlola ikhwalithi yamazwibela|/qc.html]]."
    ]
   }
  ]
 },
 "bilingual": {
  "seo": {
   "title": "Indlela Yokwehlukanisa Noma Yokuhlanganisa Amazwibela Ezilimi Ezimbili – AI-SRTSub",
   "desc": "Izindlela ezine zokuhlukanisa amazwibela ezilimi ezimbili: gcina umkhondo owodwa kuphela, hlukanisa amafayela amabili, noma uhlanganise abe ngumugqa owodwa wezinhlangothi ezimbili. Zombili izinhlobo zitholwa ngokuzenzakalelayo, esipheqululini sakho.",
   "h1": "Indlela Yokwehlukanisa Amazwibela Ezilimi Ezimbili",
   "intro": "Ufuna ukwehlukanisa amazwibela ezilimi ezimbili, uwahlanganise, noma ugcine umkhondo owodwa kuphela? Lo mhlahlandlela uhamba kuzo zonke izindlela ezine: indlela ukutholwa okusebenza ngayo, ukuthi yiluphi uhlobo okumele ulukhethe, nokuthi utholeni ekutheni ukhiphe.",
   "ctaText": "Vula Isihlukanisi Samazwibela Ezilimi Ezimbili"
  },
  "body": [
   {
    "h2": "Lokho Okwenziwa Yileli Thuluzi",
    "ps": [
     "Unamazwibela ezilimi ezimbili kodwa ufuna umkhondo owodwa kuphela - noma ngenye indlela, ufuna ukwehlukanisa noma ukuhlanganisa imikhondo emibili:"
    ]
   },
   {
    "h2": "Indlela Elithola Ngayo Okuqukethwe Kwezilimi Ezimbili",
    "ps": [
     "Amazwibela ezilimi ezimbili zemikhondo emibili anezinhlobo ezimbili ezivamile, futhi ithuluzi liyayibona ngayinye - **ngaphandle kokuqagela ulimi**: **Uhlobo A (umugqa owodwa, imigqa emibili)** lwehlukanisa imikhondo ngesisthemu sokubhala - isi-kana, isi-hangul, isi-hanzi, isi-Latin nezinye izinhlelo, eziyishumi zonke; izinhlelo ezimbili ezihlukene zisho izilimi ezimbili, futhi noma yikuphi okuvela kuqala kubalwa njengokuqala. Uhlelo olulodwa (umugqa wesiShayina omude owongwe kwemibili, isibonelo) luphathwa njengolimi olulodwa futhi lugcinwa njengoba lunjalo. **Uhlobo B (okufakiwe okubili okwehlukile okunohlelo lwesikhathi olufanayo)** lwehlukanisa imikhondo ngesikhundla - okufakiwe okubili ngesikhathi esifanayo kwenza pair, eyokuqala ibalwa njengokuqala, futhi inhlanganisela eyabelana ngama-alphabet ase-Latin, njengesiNgisi-isiFulentshi noma isiNgisi-isiJalimane, zihlukaniswa kahle futhi. Lapho kungekho okuqukethwe kwezilimi ezimbili okutholwayo, umkhethi wemodi nenkinobho Yokuqala zibekwa gray kanye nesaziso esicacile, ngakho ayisoze yandla ngenkani ku-results engalungile."
    ]
   },
   {
    "h2": "Izindlela Ezine",
    "ps": [
     "Khetha eyodwa kwezine ku “Uyiphi ofuna?” dropdown: **Gcina uqobo kuphela** futhi **Gcina ukuhumusha kuphela** ngamunye ukhiqiza ifayela elilodwa; **Hlukanisa zibe zimbili** ukhiqiza ifayela lokuqala nefayela lokuhumusha, ngamagama amafayela aqanjwe ngokuzenzakalelayo `.orig` / `.dst` ukuvimbela ukubhalwa okuphezulu; **Hlanganisa abe ngumugqa owodwa wezinhlangothi ezimbili** uphendula ipheya ngayinye ibe ngumugqa wezilimi ezimbili - lokuqala emugqeni owodwa, ukuhumusha komunye - kuyilapho ama-pair olimi olulodwa agcinwa njengoba anjalo futhi akukho mgqa wesibili osungulwayo. Uma ushintsha izindlela noma ama-format okuphumayo, okuqukethwe okukhona kuqala ngokuzenzakalelayo - asikho isidingo sokuchofoza Qala futhi."
    ],
    "img": {
     "file": "bilingual-modes",
     "alt": "Ukukhetha imodi kwisihlukanisi sezilimi ezimbili: gcina okokuqala, gcina ukuhumusha, hlukanisa zibe zimbili, hlanganisa zibe ngumugqa owodwa wezinhlangothi ezimbili",
     "cap": "Izindlela ezine: gcina umkhondo owodwa, hlukanisa zibe zimbili, noma hlanganisa zibe ngumugqa owodwa wezinhlangothi ezimbili"
    }
   },
   {
    "h2": "Okufakiwe Nokuphumayo",
    "ps": [
     "Ifunda ama-format ayisikhombisa - SRT, VTT, ASS, SSA, SBV, LRC, TXT (isandiso sefayela kuqala, ukuphunga kokuqukethwe njenge-fallback) - futhi ikhipha amane: SRT, VTT, ASS, TXT. Noma iyiphi inhlanganisela yokufakiwe nokuphumayo iyasebenza, ngakho ukuguqulwa kwama-format awela phakathi kuyenzeka endleleni. Ama-ASS `\\N` ukwehliswa kwemigqa kubuyiselwa emigqeni yangempela yomugqa, futhi amathegi emiphumela ayahlukaniswa ekuhanjisweni kwama-format awela phakathi."
    ]
   },
   {
    "h2": "Imiphumela Nokukhipha",
    "ps": [
     "Imiphumela iboniswa ngokuphelele ebhokisini lombhalo elifundwa kuphela, ifayela ngalinye linesibalo sokufakiwe nezibalo zesikhathi esiphelele; izinkinobho Zokulanda Nokukopa zithatha ifayela ngqo. Indawo yemiphumela iyibukiso - akukho ukuhlelwa kombhalo noma isikhathi lapha. Ukwenza izinguquko, khipha kuqala, bese usebenzisa ithuluzi elifanayo."
    ],
    "img": {
     "file": "bilingual-result",
     "alt": "Indawo yemiphumela yokwehlukanisa: ukubukiso okufundwa kuphela, izibalo zesibalo sokufakiwe, nezinkinobho zokulanda/zokukopa",
     "cap": "Ukubukiso kombhalo ogcwele + isibalo sokufakiwe nesesikhathi + ukulanda nokukopa"
    }
   },
   {
    "h2": "I-FAQ",
    "ps": [
     "**Okukodwa okunqunyiwe kunesiNgisi emugqeni owodwa nesiFulentshi komunye - kungani kungengeke kwehlukane?** Uhlobo A lwehlukanisa imikhondo ngesisthemu sokubhala, ngakho izilimi ezimbili ezabelana ngohlelo olulodwa ngaphakathi kokufakiwe okukodwa azikwazi ukuhlukaniswa. Yilungise kabusha njengoHlobo B (okufakiwe okubili kumugqa wesikhathi ofanayo) futhi ukwehlukanisa okusekelwe esikhundleni kuyasebenza.",
     "**Ifayela elilodwa kuphela ekulandeni?** “Gcina uqobo kuphela”, “Gcina ukuhumusha kuphela” futhi “Hlanganisa abe ngumugqa owodwa wezinhlangothi ezimbili” ngamunye ukhiqiza ifayela elilodwa ngomklamo; kuphela “Hlukanisa zibe zimbili” okunika ezimbili, ezinamakhodi `.orig` / `.dst`.",
     "**Ngingakwazi ukusebenza ngobuningi?** Ifayela elilodwa ngesikhathi; imigqa ayisekelwa.",
     "**Ingabe ilayisha amazwibela ami?** Cha - ukuhlaziya nokukhipha kuqhubeka ngokuphelele esipheqululini sakho."
    ]
   },
   {
    "h2": "Imihlahlandlela Ehlobene",
    "ps": [
     "Ngendlela esheshayo yokwehlukanisa imikhondo emibili bona [[Ukwehlukanisa Amazwibela Ezilimi Ezimbili Kube Imikhondo Emibili|/guides/split-bilingual-subtitles.html]]; ngendlela amazwibela ezilimi ezimbili enziwa ngayo bona [[Izindlela Ezimbili Zokwenza Amazwibela Ezilimi Ezimbili|/guides/make-bilingual-subtitles.html]]; ngokuhumusha komshini sebenzisa [[Ukuhumusha Kwamazwibela e-AI|/translate.html]]."
    ]
   }
  ]
 },
 "clean": {
  "seo": {
   "title": "Isihlanzi Samazwibela – Susa Amawotamakha, Izikhangiso, i-SDH – AI-SRTSub",
   "desc": "Isihlanzi samazwibela: Imithetho eyi-13 isusa amawotamakha, izikhangiso, amazwibela e-SDH, amathegi e-HTML, okuyimpinda; ushintsho ngalunye lunomehluko futhi lungabuyiselwa. SRT/VTT/ASS, konke kusipheqululini.",
   "h1": "Indlela yokusebenzisa isihlanzi samazwibela",
   "intro": "Amazwibela alandiwe kuwebhu avame ukuphatha amawotamakha, izikhangiso namazwibela e-SDH. Isihlanzi sisebenzisa imithetho eyi-13 ngesikhathi esisodwa, futhi ushintsho ngalunye lunomehluko futhi luyabuyiseleka.",
   "ctaText": "Vula isihlanzi samazwibela"
  },
  "body": [
   {
    "h2": "Lokho okwenziwa yileli thuluzi",
    "ps": [
     "Amafayela amazwibela alandiwe avame ukuphatha izinto okungamelwe abe nazo. Isihlanzi siyazisusa ngesikhathi esisodwa esisekelwe emithethweni:"
    ]
   },
   {
    "h2": "Layisha futhi uthole",
    "ps": [
     "Hudula ifayela noma uchofoze ukuze ulayishe — i-SRT, VTT, ASS, SSA kanye ne-TXT zisekelwa — noma unamathisele umbhalo wamazwibela ngqo. Ikhowudi iyazitholela: uma ukubhala kwe-UTF-8 kukhiqiza izinhlamvu zokushintsha, buyela ku-GBK noma ku-Big5, futhi ikhasi libonisa \"Ikhowudi ilungiswe njenge-{encoding}\". Uma ulayisha amazwibela ezilimi ezimbili zemikhondo emibili (izikhathi ezimbili ezifarnayo, enye isiShayina nenye isiNgisi), zihlanganiswa zibe umkhondo owodwa wezilimi ezimbili onenkinobho ethi \"eyokuqala phezulu / ukuhumusha phezulu\"."
    ]
   },
   {
    "h2": "Ukulungiselela imithetho eyi-13",
    "ps": [
     "Isikhombimsebenzisi sinamaqoqo amane anebhokisi lokuhlola ayi-13: **Amathegi nefomethi** (imiphumela ye-ASS, amathegi e-HTML, izinhlamvu zokulawula, bhala kabusha ngemva kokuhlunga), **I-SDH nemiphumela yomsindo** (amazwibela e-SDH, amalebula ezikhulumi, imigqa yezingoma emsulwa), **Amawotamakha nokufakiwe okungadingeki** (amawotamakha nezikhangiso, okufakiwe okuphindaphindiwe, okufakiwe okungenalutho), **Ukulungiswa kombhalo** (izimpawu zokubhala nesikhala, ukulungiswa kosonhlamvu abakhulu, hlanganisa imigqa emifushane). Izinto \"ezingalahleki futhi eziqinisekile\" kuphela ezivuliwe ngokuzenzakalelayo; izinto ezingalahla okuqukethwe (imigqa yezingoma, ukulungiswa kusonhlamvu, ukuhlanganisa imigqa emifushane) zivaliwe — zihlole lapho kudingeka. Into ngayinye inethiphu yokundiza ye-ⓘ, futhi noma yikuphi ukushintsha kwebhokisi lokuhlola kuqala ngokushesha."
    ],
    "img": {
     "file": "clean-opts",
     "alt": "Isikhombimsebenzisi sezinketho zokuhlanza: amaqoqo amane wamabhokisi okuhlola ayi-13, isibalo esisebenzayo siboniswe phezulu",
     "cap": "Amaqoqo amane, imithetho eyi-13; izinto ezingalahleki kuphela ezivuliwe ngokuzenzakalelayo, izinguquko zisebenza ngokushesha"
    }
   },
   {
    "h2": "Umehluko woguquko nokubuyisela",
    "ps": [
     "Imiphumela ayibhalwa phezulu ngqo: ushintsho ngalunye lubhalwe etafuleni lomehluko eline-tag yomthetho (ukuthi kungani lokhu kufakiwe kuhleliwe noma kususwe). Ufuna eyodwa ibuye? Chofoza \"Buyisela\" kulowomugqa; \"Buyisela konke\" kubuyisela konke ngokuchofoza okukodwa, futhi ukukuchofoza futhi kuphinda kusebenzise ukuhlanza okugcwele. Ibha yezibalo ibonisa izibalo zokuqala / ezihlanzwe / ezisusiwe / ezilungisiwe / ezibuyisiwe."
    ],
    "img": {
     "file": "clean-diff",
     "alt": "Itafula lomehluko woguquko: inkomba, isikhathi, umbhalo wokuqala kuqhathaniswa nowohlanzekile, i-tag yomthetho kumugqa ngamunye",
     "cap": "Ushintsho ngalunye luphatha i-tag yomthetho; buyisela imigqa eyodwa noma yonke kanye"
    }
   },
   {
    "h2": "Ukubuka kuqala nokukhipha",
    "ps": [
     "Shintsha phakathi kokuthi \"Kuhlanzwe / Okuqala\". Ekubukeni kokuqala, okufakiwe okususiwe kuyasikwa futhi kumakishwe \"Kususiwe\", futhi ifayela elithunyelwe lihambisana nokubuka kuqala ngokuphelele. Amafomethi okukhipha: i-SRT (okokuzenzakalelayo), i-VTT, i-ASS (eyatholakala lapho umthombo ungowase-ASS, nesigaba sesitayela sigcinwe njengoba sinjalo), kanye ne-TXT yombhalo ocacile ngaphandle kwezikhathi. Igama lefayela lithola uphawu `.clean` ngokuzenzakalelayo."
    ],
    "img": {
     "file": "clean-preview",
     "alt": "Ukubuka kuqala kombhalo ogcwele: ukubukwa okuhlanzekile nokuqala nebha yezibalo ebonisa izibalo",
     "cap": "Ukubukwa kokubuka kuqala okubili, okubonayo yikho okutholayo"
    }
   },
   {
    "h2": "I-FAQ",
    "ps": [
     "**Ngabe kuzosusa inkulumo ejwayelekile ngephutha?** Umthetho wewotamakha uqala ususe imigqa yewotamakha (ugcine imigqa yenkulumo ngaphakathi kokufakiwe kwezilimi ezimbili) futhi ususa kuphela okufakiwe okuphelele uma kusele imikhondo; ukususwa kwe-SDH kuthinta kuphela okuqukethwe okubiyelwe ngamagama angukhiye e-SDH okunezinhlamvu ezingama-40 noma ngaphansi — inkulumo evamile ebiyelwe ihlala.",
     "**Imigqa yezingoma emsulwa ihlukaniswa kanjani nezingoma ezingaphakathi kwenkulumo?** Okufakiwe kuphela lapho umugqa ngamunye ugoqwe khona ngamanothi omculo we-♪ noma amamaki afana ne-[music] okususwa; inkulumo equkethe izingoma iyanakwa futhi iyagcinwa.",
     "**Ingabe amalebula ezikhulumi angashaya umbhalo wesiShayina?** Igama le-alphanumeric losonhlamvu abakhulu kuphela ekuqaleni komugqa elandelwa ikholoni (njenge-`GEORGE:`) elihambisanayo; imisho yekholoni yesiShayina ayenzi kanjalo nhlobo.",
     "**Ngingakwazi ukuhlanza amafayela amaningi ngesikhathi esisodwa?** Cha — ifayela elilodwa ngokugijima ngakunye. Landa umphumela, bese ulayisha olandelayo."
    ]
   },
   {
    "h2": "Ukugcinwa kuyimfihlo",
    "ps": [
     "Ukuhlanza kuqhubeka ngokuphelele esipheqululini sakho; alikho okuqukethwe kwamazwibela okuthunyelwa kuseva."
    ]
   },
   {
    "h2": "Amathuluzi ahlobene nemihlahlandlela",
    "ps": [
     "Ngomhlahlandlela omfishane ogxile ekususeni amawotamakha nezikhangiso, bona [[susa izikhangiso zamazwibela namawotamakha|/guides/remove-subtitle-ads.html]]; sebenzisa ifayela lakho ngokusebenzisa [[ukuhlola ikhwalithi yamazwibela|/guides/subtitle-quality-check.html]] ngaphambi kokulidlulisela; ukushintsha amafomethi sebenzisa [[ukuguqulwa kwefomethi|/convert.html]]."
    ]
   }
  ]
 },
 "convert": {
  "seo": {
   "title": "Ungayiguqula Kanjani Ifomethi Yamagama-ncinci (SRT, VTT, ASS, SBV, LRC, TXT) – AI-SRTSub",
   "desc": "Umhlahlandlela obonisayo woguquko: faka ifayela, hlola ifomethi etholakele, khetha ifomethi yokuphuma, phatha umbhalo wezilimi ezimbili, bese ulandawunoda. Konke kusebenza kuphela esipheqululini sakho.",
   "h1": "Umhlahlandlela Wokuguqula Ifomethi Yamagama-ncinci",
   "intro": "Lo mhlahlandlela uhamba ikhasi kusuka phezulu kuya phansi: layisha amagama-ncinci, qinisekisa ifomethi etholakele, khetha ifomethi yokuphuma, bese ulandawunoda. Konke kusebenza esipheqululini sakho - akukho fayela elike lishiye idivayisi yakho.",
   "ctaText": "Vula isiguquli samagama-ncinci"
  },
  "body": [
   {
    "h2": "Layisha amagama-ncinci akho",
    "ps": [
     "Hudula ifayela ebhokisini elinamachashaza noma uchofoze ukuze ukhethe elodwa; ungaphinda futhi **unamathisele okuqukethwe** ngqo ebhokisini lombhalo. Ifomethi itholakala kuzo zombili isandiso nokuqukethwe, futhi umphumela ubonakala kuthegi yefomethi."
    ],
    "img": {
     "file": "convert-upload",
     "alt": "Indawo yokulayisha: isampula ye-SRT ilayishiwe, itholakele njenge-SRT",
     "cap": "Ifomethi etholakele ibonakala kuthegi — hlola lapha kuqala uma ungabaza"
    }
   },
   {
    "h2": "Khetha ifomethi yokuphuma",
    "ps": [
     "Khetha ifomethi oqondise kuyo kusuka kuhlu olwehlelayo: izinketho eziyisithupha — srt, vtt, ass, sbv, lrc, txt. Ukuguqulela ku-ass kwakha kabusha isitayela esimisiwe sika-1920×1080 (umbhalo omhlophe, umphetho omnyama, phansi ngenhla) futhi **akuwagcini amafonti noma imibala yokuqala**; i-txt ikhipha umbhalo kuphela, ngaphandle kwesikhathi."
    ],
    "img": {
     "file": "convert-opt",
     "alt": "Uhlu olwehlelayo lwefomethi yokuphuma olunokukhethwa kwe-VTT",
     "cap": "Ifomethi yokuphuma ayilandeli okufakiwe — uyazikhethela yona"
    }
   },
   {
    "h2": "Ukuphatha izilimi ezimbili",
    "ps": [
     "Uma ifayela linezilimi ezimbili (imigqa emibili kuyi-cue eyodwa, noma ama-cue ahlangene), isakhiwo sigcinwa njengoba sinjalo ngesikhathi sokuguqula. Ukukhetha \"gcina izilimi ezimbili\" kwahlukanisa izilimi ezimbili zibe imigqa engenhla nengezansi, ngalinye ligoqwe kabusha lodwa; isilawuli sivaliwe uma kungekho mbhalo wezilimi ezimbili otholakele."
    ]
   },
   {
    "h2": "Guqula bese ulandawunoda",
    "ps": [
     "Chofoza u-\"Convert\": iphaneli yemiphumela ibonisa inani lama-cue kanye nobude besikhathi, nombhalo ulungele ukuhlolwa. Chofoza u-**Download** ukuze ugcine ifayela, noma u-**Copy** ukuze uthathe umbhalo ngqo. Ukuguqula akuguquli inani lesikhathi — kubhala kabusha ifomethi kuphela. Ukuze ubuyisele isikhathi sama-cue, sebenzisa [[timing tool|/shift.html]]."
    ],
    "img": {
     "file": "convert-result",
     "alt": "Iphaneli yemiphumela: inani lama-cue nobude besikhathi esiphelele namasevisi wokulandawunoda nokukopisha",
     "cap": "ama-cue angu-6, isiyonke ngu-0:23 — skrola umbhalo ngaphambi kokulandawunoda"
    }
   }
  ]
 },
 "extract": {
  "seo": {
   "title": "Ukukhipha umbhalo ocacile kumagama-ncinci – Izakhiwo ezimbili, ukuhlanzwa okuhlanu – AI-SRTSub",
   "desc": "Khipha ingxoxo kumagama-ncinci njengombhalo ocacile ohlanzekile: izigaba eziqhubekayo noma umugqa owodwa nge-cue nganye, nalokho okususwa izinkinoshini ezinhlanu zama-cue e-SDH, izimpawu zamanzi, okuphindaphindiwe, izandulela kanye namagama ezingoma.",
   "h1": "Uyikhipha kanjani imibhalo ecacile kumagama-ncinci",
   "intro": "Khipha ingxoxo efayeleni lamagama-ncinci njengombhalo ocacile ohlanzekile: izinombolo ze-cue, izikhathi namathegi esitayela zisuswa ngokuzenzakalelayo, ukuze umphumela ufunde njenge-athikili noma usebenze njengohlu lwezingxoxo.",
   "ctaText": "Vula isikhiphi sombhalo ocacile"
  },
  "body": [
   {
    "h2": "Lokhu okwenziwa yileli thuluzi",
    "ps": [
     "Ingxoxo kuphela efayeleni lamagama-ncinci ebalulekile kumfundi; okusele isakhiwo esenzelwe isidlali — izinombolo ze-cue, izikhathi, amathegi esitayela. Leli khasi lisuza leso sakhiwo futhi ligcine amagama."
    ]
   },
   {
    "h2": "Lifake ngaphakathi, hhayi ukulayisha kuphela",
    "ps": [
     "Ikholomu ethi \"1 Faka amagama-ncinci\" kwesobunxele yamukela ifayela elilayishiwe, futhi ungaphinda unamathisele okuqukethwe kwamagama-ncinci ngqo ebhokisini lombhalo. Uma ukhethe ifayela elingalungile, chofoza u-\"Sula\" bese uqala phansi.",
     "Leli khasi lifunda amafayela njenge-UTF-8. Uma amagama-ncinci evuleka njengodonga lwezimpawu zemibuzo noma amabhokisi, ukubetheka kuphukile — kuqondise kube yi-UTF-8 ku-[[Garbled text repair|/repair.html]] kuqala, bese ubuya."
    ],
    "img": {
     "file": "extract-up",
     "alt": "Indawo yokufaka amagama-ncinci yesikhiphi sombhalo ocacile",
     "cap": "Layisha ifayela, noma unamathisele okuqukethwe kwamagama-ncinci ngqo ebhokisini lombhalo"
    }
   },
   {
    "h2": "Ukukhetha phakathi kwezakhiwo ezimbili",
    "ps": [
     "Phezulu kokuthi \"2 Izinketho zokukhipha\" kunesakhiwo: u-**Izigaba eziqhubekayo** uphula umbhalo lapho kunamakhefu nezimpawu zokuphela kwemisho ukuze ufunde njenge-athikili; u-**Umugqa owodwa nge-cue nganye** unikeza umugqa owodwa ngokufakwa kwamagama-ncinci ngakunye, okufana nokufakwa kwefayela langempela ngakunye.",
     "Ukukopisha ingxoxo yamanothi, ukuzijwayeza ukuhumusha noma ukuyifunda njengombhalo ojwayelekile kudinga izigaba eziقhubekayo; ukwakha ishidi lengxoxo, ukuqhathanisa umugqa ngomugqa nokuqala noma ukondla elinye ithuluzi kudinga umugqa owodwa nge-cue nganye."
    ],
    "img": {
     "file": "extract-opt",
     "alt": "Isakhiwo nezinkinoshini zokuhlanzwa ngaphansi kwezinketho zokukhipha",
     "cap": "Khetha isakhiwo esisodwa; izinkinoshini ezinhlanu ezingezansi zinquma ukuthi yiliphi uhlobo lokuqukethwe olususwayo"
    }
   },
   {
    "h2": "Lokho okususwa ukuhlanzwa ngakunye kwezinhlanu",
    "ps": [
     "u-**Susa ama-cue e-SDH**: ususa izincazelo zomsindo ezibiyelwe ezifana no-\"(izinyawo)\" noma \"[umculo]\" futhi ugcine ingxoxo.",
     "u-**Susa izimpawu zamanzi nezikhangiso**: ususa imigqa efana namakhredithi e-fansub, ama-URL nezibambo zeziteshi.",
     "u-**Susa okuphindaphindiwe okungomakhelwane**: uma umisho ofanayo uvela kabura ngokulandelana (iphutha lokudlala) umkhawulo owodwa kuphela ogcinwayo; okuphindaphindiwe okukude kuphatha incazelo futhi kuyashiywa kunjalo.",
     "u-**Susa izandulela zezikhulumi**: \"JOHN: Sawubona\" kuba \"Sawubona\". Kuvalwe ngokuzenzakalelayo — umbhalo wesitayela seskripthi udinga ukukhombisa ukuthi ubani okhulumayo.",
     "u-**Yeqa imigqa yezingoma**: imigqa eyi-\"♪ … ♪\" ngokuphelele iyaqanyelwa. Kuvalwe ngokuzenzakalelayo — izingoma zingamagama nawo."
    ],
    "img": {
     "file": "extract-clean",
     "alt": "Izinkinoshini zokuhlanzwa ezinhlanu nezincazelo zazo ngaphansi kwezinketho zokukhipha",
     "cap": "Inkinoshini ngayinye itsho lokho eyikusulayo ngakwesokunene sayo; maka lezo ozidingayo"
    }
   },
   {
    "h2": "Ukuhamba nomphumela",
    "ps": [
     "Ikholomu ethi \"3 Umphumela\" kwesokudla ibonisa umbhalo okhishiwe bukhoma futhi ibala kabusha ngokushesha nje lapho ushintsha inketho.",
     "Uma ujabule, chofoza u-\"Download\" ukuze ulondoloze i-.txt noma u-\"Copy\" ukuze uthathe umbhalo nawe. Ngezilimi ezingahlukanisi amagama ngezikhala, ezifana nesiShayina nesiJapane, ukuhlanganiswa kwemigqa kulandela imithetho ehlukile, futhi ithuluzi liyakuphatha lokho ngolimi ngalunye ngokuzenzakalelayo."
    ],
    "img": {
     "file": "extract-out",
     "alt": "Indawo yemiphumela enezinkinobho zokulandawunoda nezokukopisha",
     "cap": "Umphumela ubuyekezwa bukhoma; yilandawunode njenge-txt noma uyikopishe ngqo"
    }
   },
   {
    "h2": "Lokho okushiywa kungathintanga",
    "ps": [
     "Ingxoxo uqobo ayibhalwa kabusha. Izinkinoshini zokuhlanzwa zinquma kuphela ukuthi yimaphi imigqa ephelele noma amabhulokhi asuswayo; azikaze zishintshe amagama okufakwa.",
     "Izikhathi nezinombolo ze-cue azikhishwa nje, azishintshwa bese zikhishwa — ifayela langempela alithintwa, futhi leli khasi alihlinzeki ngokuthekelisa ngezikhathi. Lo msebenzi ungowokuthi [[Format conversion|/convert.html]]."
    ]
   },
   {
    "h2": "Imibuzo ejwayelekile",
    "ps": [
     "**Ingabe amathegi esitayela se-ASS ahlala embhalweni?** Cha. Amabhulokhi okubhala phezu kwe-ASS `{}` ayasuswa futhi kungxoxo kuphela esalayo.",
     "**Ingabe ifayela lezilimi ezimbili liphuma njengemigqa emibili noma eyodwa?** Njengemigqa eminingi njengoba ukufakwa kwakunjalo; leli khasi aluhlanganisi noma alihlukanisi — ukuze uzihlukanise sebenzisa [[Bilingual split|/bilingual.html]].",
     "**Kungani izandulela zezikhulumi zigcinwa ngokuzenzakalelayo?** Igama elithi \"JOHN: Sawubona\" ​​livamise ukuba ulwazi oluwusizo (ama-skripthi, amashidi engxoxo), futhi ukulisusa kwenza kube nzima ukuthi ubani okhulumayo, ngakho ukukhetha kushiwo kuwe.",
     "**Ingabe amafayela ezingoma ze-LRC nawo angakhishwa?** Yebo. Amathegi esikhathi se-LRC ayasuswa futhi imigqa yezingoma iyasala; uma ungafisi izingoma, maka \"Yeqa imigqa yezingoma\"."
    ]
   },
   {
    "h2": "Ukugcinwa imfihlo",
    "ps": [
     "Amagama-ncinci acutshungulwa ngokuphelele esipheqululini: akukho okulayishwile futhi akukho okudlula kwisingeli. Umbhalo uhlala ekhasini lamanje kuphela futhi uyasulwa uma kuvuselelwa."
    ]
   },
   {
    "h2": "Amathuluzi ahlobene nemihlahlandlela",
    "ps": [
     "Ukuze uqonde ukuthi ifayela lamagama-ncinci liquketheni ngempela bheka [[What is inside an SRT file|/guides/srt-file-format.html]]; ukuhumusha ingxoxo ekhishiwe iya ku-[[Subtitle translation|/translate.html]]; ukuze uyiguqule ibe yithebula sebenzisa [[Subtitles to Excel/CSV|/guides/srt-to-excel.html]]; futhi usebenzise [[Subtitle QC|/qc.html]] ngaphambi kokudlulisela noma yini."
    ]
   }
  ]
 },
 "extract-subtitles-from-video": {
  "seo": {
   "title": "Ukukhipha amagama-ncinci kuvidiyo – Okufakwe ngaphakathi kuqhathaniswa nokwangaphandle – AI-SRTSub",
   "desc": "Okuphethwe yi-MKV / WebM / MP4 / MOV ngayinye, ukuthi amasu ombhalo, i-ASS, i-WebVTT ne-mov_text ahluke kanjani, kungani amagama-ncinci wezithombe (i-PGS / DVD) engenandaba yombhalo, nokuthi yini okufanele yenwe ngemuva kokukhipha.",
   "h1": "Ukukhipha amagama-ncinci kuvidiyo",
   "intro": "Amagama-ncinci angahlala ngaphakathi kwefayela levidiyo noma azimisele ngaphandle kwayo. Ngaphakathi, angumkhondo osekungeneni — ukuwakhipha akuhlangene nokuguqula ikhodi.",
   "ctaText": "Vula ukukhishwa kwamagama-ncinci evidiyo"
  },
  "body": [
   {
    "h2": "Lapho kuhlala khona amagama-ncinci: afakwe ngaphakathi nangaphandle",
    "ps": [
     "Ifayela levidiyo (MKV, MP4) isitsha esiphethe umkhondo wevidiyo, umkhondo womsindo nemikhondo yamagama-ncinci ngesikhathi esisodwa. Amagama-ncinci avalwe ngaphakathi **afakwe ngaphakathi**; ifayela elihlukile le-.srt / .ass elihlezi ngaphandle **elingaphandle**, futhi umkhondo ofakwe ngaphakathi ubizwa nangokuthi **kuxhunywe ngaphakathi**.",
     "Amagama-ncinci angaphandle angasetshenziswa njengoba enjalo. Inkinga ngalawo afakwe ngaphakathi: ukuze uwahlele, uwahumushe noma wakhe umkhondo wezilimi ezimbili kusuka kowokuqala, awunalifayela lamagama-ncinci esandleni — kufanele uqale ufunde umkhondo esitsheni. Lesi sinyathelo akusona esokuguqula ikhodi: ividiyo ayiphindi ifakwe ikhodi, kusetshenziswa kuphela idatha esivele igcinwe esitsheni."
    ]
   },
   {
    "h2": "Isiphi isitsha esiphatha ini",
    "ps": [
     "Izitsha ezihlukene ziphethe amafomethi wamagama-ncinci ahlukene, futhi nobunzima bokukhipha buyahlukana:"
    ],
    "img": {
     "file": "videosub-which",
     "alt": "Imikhondo yamagama-ncinci ebhalwe yikhasisi lokukhipha amagama-ncinci afakwe ngaphakathi",
     "cap": "Umkhondo owodwa ngomugqa ngamunye, ovame ukuba nolimi negama lomkhondo; uma kunowodwa kuphela kukishwa ngokuzenzakalelayo"
    }
   },
   {
    "h2": "Kungani amagama-ncinci wezithombe angenakukhishwa",
    "ps": [
     "Amagama-ncinci e-Blu-ray PGS kanye ne-DVD awagcini zinhlamvu nhlobo, kuphela uchungechunge lwezithombe olunesiteshi se-alpha. Uma umdlali ebonisa kubonakala sengathi unamathisela isithombe, hhayi ukunikeza umbhalo.",
     "Ngakho-ke alikho igama kumkhondo onjalo ongawufunda — akusho ukuthi ithuluzi alisekeli, kodwa azikho izinhlamvu ezikhona. Ikhasisi lisho ngokusobho uma lihlangabezana nolunye.",
     "Kuphela indlela yokuthola amagama iwukubona izinhlamvu kulezo zithombe kuqala (i-OCR) bese wakha amagama-ncinci kulokho. Lokho kuyinqubo ehlukile ekukhipheni umkhondo."
    ]
   },
   {
    "h2": "Okujwayelekile okulandela ukukhishwa",
    "ps": [
     "Okuphumayo ngumkhondo njengoba wawunjalo: ithuluzi aliziqageli izindlela zokubetheka futhi alilungisi izikhathi. Ngakho-ke izinto ezimbili zivela kakhulu:",
     "Okunye **umbhalo ongcwecwa** — inkinga yokubetheka kumkhondo womthombo ophuma ungacacile; iya ku-[[How to repair garbled text|/guides/repair.html]] ukuze ubone ukubetheka. Okunye **isikhathi esingalungile** — noma ngabe umthombo unelogo yokuqala, noma amanani amafremu angahambisani, umphumela uphambukile wonke; sebenzisa [[Timeline adjustment|/shift.html]] ukuze uwukhulule noma uwulinganise.",
     "Ngemuva kwalokho, ukuze uhumushe iya ku-[[Subtitle translation|/translate.html]], futhi ukuze wenze kube ngezilimi ezimbili bheka [[Two ways to make bilingual subtitles|/guides/make-bilingual-subtitles.html]]."
    ],
    "img": {
     "file": "videosub-formats",
     "alt": "Indawo yemiphumela enefomethi yokuthekelisa ye-SRT / VTT / ASS / TXT",
     "cap": "Amagama-ncinci akhishiwe angathekeliswa ngefomethi emine; umthombo we-ASS ugcina ikhanda lesitayela nokulungiswa kwaso"
    }
   },
   {
    "h2": "Izinto ezimbalwa okulula ukuzenza kabi",
    "ps": [
     "**Ukukhipha amagama-ncinci akusho ukuthi kuyafakwa kuwo.** Ividiyo ayiphindi ifakwe ikhodi, ngakho ikhwalithi yezithombe nomsindo akuthinteki.",
     "**Ukukhipha akuthinti ifayela langempela.** Kufundwa kuphela, akukaze kubhalwe, futhi akukho ngqikithi yevidiyo eshintshayo.",
     "**Ifayela elikhulu elihamba kancane akusona inkinga yokuxhumana.** Ithuluzi liskena ulwazi lomkhondo ngendlela yezingcezu, futhi uma likhulu ifayela kulapho kuthatha isikhathi eside; konke lokho kwenzeka endaweni yangakini.",
     "**Amagama-ncinci angaphandle awalidingi leli khasi.** Uma unayo i-.srt / .ass, iya ngqo ku-[[Format conversion|/convert.html]]; amagama-ncinci avalwe ngaphakathi kuvidiyo kuphela adinga ukukhishwa kuqala."
    ]
   },
   {
    "h2": "Amathuluzi ahlobene nemihlahlandlela",
    "ps": [
     "Ukuze ubone umhlahlandlela ophelele bheka [[How to extract subtitles embedded in a video|/guides/videosub.html]]; ukuze uhumushe okukhiphayo iya ku-[[Subtitle translation|/translate.html]], ukuze wenze kube ngezilimi ezimbili bheka [[Two ways to make bilingual subtitles|/guides/make-bilingual-subtitles.html]]; ngombhalo ongcwecwa qala nge-[[Garbled text repair|/repair.html]]."
    ]
   }
  ]
 },
 "fps-23-976-vs-25": {
  "seo": {
   "title": "Kusho Ukuthini Ngempela kwe-23.976 / 24 / 25 / 30 fps – Isikhathi Samagama-ncinci – AI-SRTSub",
   "desc": "I-23.976 akuyona i-24 kanti i-29.97 akuyona i-30 — u-0.1% ongekho uvela kumbala we-NTSC, kuyilapho i-PAL isebenzisa amafilimu ngesivinzi esingu-4%. Indlela lezi ezishintsha ngayo isikhathi samagama-ncinci akho, nendlela yokuguqula phakathi kwazo.",
   "h1": "Kusho ukuthini ngempela kwe-23.976 / 24 / 25 / 30 fps",
   "intro": "Igebe lika-0.1% phakathi kwe-23.976 ne-24 liyinsalela yomlando wethelevishini. Kanye no-4% we-PAL, yisona sizathu esenza amagama-ncinci aphambuke kakhulu njengoba ifilimu iqhubeka.",
   "ctaText": "Vula ukulungiswa kwesikhathi"
  },
  "body": [
   {
    "h2": "Leyo nombolo ngayinye isho ukuthini",
    "ps": [
     "Isilinganiso samafremu yizingane zezithombe eziboniswa ngomzuzwana owodwa. Ezine ozihlangabezana nazo kakhulu:"
    ]
   },
   {
    "h2": "Lapho u-0.1% uvela khona",
    "ps": [
     "23.976 = 24 × 1000/1001, kanti 29.97 = 30 × 1000/1001. Leyo-1000/1001 iyinsalela yokungeza umbala ku-NTSC: ukuze ufake isithwali sombala ngaphandle kokuphula abamukeli abamnyama nabamhlophe abakhona, isilinganiso senkundla sehliswa sisuka ku-60 Hz saya ku-59.94 Hz (60 × 1000/1001), kanti isilinganiso samafremu sehle kanye naso.",
     "Umphumela: amafilimu asakazwa ku-23.976 ezifundeni ze-NTSC esikhundleni sika-24. Umehluko ngu-0.1%, noma imizuzwana engu-3.6 ngehora — ubonakala kanzima yedwa, kodwa ungawudida no-4% ongezansi futhi ungalokothi uhlanganise lezi zibili ekubaleni okukodwa."
    ]
   },
   {
    "h2": "Lapho u-4% uvela khona",
    "ps": [
     "Izifunda ze-PAL zibukisa ku-25 fps. Amafilimu adutshulwa ku-24 fps futhi adlalwa nje ku-25 — akukho fremu eyodwa eyengeziwe noma esusiwe, ngakho ukudlala kusebenza ngokushesha ngo-4% (25/24 ≈ 1.0417). Ifilimu yemizuzu eyi-100 isebenza imizuzu engu-96 enguqulweni yayo ye-PAL.",
     "Lowo ungumgogodla wesi **progressive drift**: amagama-ncinci enzelwe umthombo wokuqala nevidiyo enguqulweni ye-PAL afana ncamashi ekuqaleni futhi ahlukene ngemizuzu emine ngesikhathi samakhredithi. Akukho ukushintsha komhlaba wonke okungasindisa lokho; kufanele kulinganiswe kabusha ngesilinganiso."
    ],
    "img": {
     "file": "shift-step-rate",
     "alt": "Isigaba sesivinzi sekheli lesikhathi: ibhokisi lokufaka isilinganiso",
     "cap": "Linganisa kabusha ngesilinganiso — inani elilodwa lihlanganisa ifilimu yonke"
    }
   },
   {
    "h2": "Uyiguqula kanjani",
    "ps": [
     "Ukuguqula kusho ukubuyabuyelela ngesilinganiso esisodwa esisebenza kuyo yonke ifilimu:"
    ]
   },
   {
    "h2": "Ukutshela ukuthi uneyiphi",
    "ps": [
     "Esikhundleni sokuqagela isilinganiso, thola izikhathi ezimbili isikhathi sazo esifanele oqinisekile ngaso — ngokuvamile imigqa yokuqala neyokugcina yengxoxo — bese utshela ithuluzi \"lo mugqa kufanele ube ku-00:00:12 kanti lowo ku-01:35:40\"; liyelula ifilimu yonke ngomugqa oqondile phakathi kwalokho okubili. Lokho kuthiwa \"i-two-point anchoring\", futhi akudingi i-arithmetics yesilinganiso samafremu kuwe.",
     "Ukuze uqinisekise isilinganiso samafremu wena uqobo, hlola umdlali wakho noma ithuluzi lolwazi lwemidiya. Uma igama lefayela elifana ne-`1080p.WEB` lingaphethi icebiso ngesilinganiso samafremu, i-two-point anchoring iyindlela ephephile."
    ],
    "img": {
     "file": "shift-step-two",
     "alt": "Isigaba se-two-point anchor sekheli lesikhathi: imigqa emibili yokufaka izitembu zesikhathi",
     "cap": "I-two-point anchoring ayidingi isilinganiso samafremu — izitembu zesikhathi ezimbili kuphela"
    }
   },
   {
    "h2": "Amathuluzi ahlobene nemihlahlandlela",
    "ps": [
     "Ukuguqulwa kwesilinganiso samafremu uqobo — [[Subtitle frame rate conversion|/guides/srt-fps-converter.html]]; ukulungiswa kwesivinzi — [[Subtitle speed conversion|/guides/subtitle-speed-converter.html]]; ungaqiniseki ukuthi kuwukushintsha komhlaba wonke noma ukukhula okuqhubekayo — [[Subtitles drifting further out of sync|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "glossary": {
  "seo": {
   "title": "Ukushintsha kwamagama ngobuningi kumagama-ncinci – Ithebula elilodwa lilungisa ifayela – AI-SRTSub",
   "desc": "Umthetho owodwa ngomugqa ngamunye, ohlukaniswe ngo- -> , => , → noma u-Tab, no-# wamazwana. Ukufana kwamagama agcwele, ukuzwela kosonhlamvukazi, umugqa wokuqala noma wesibili wokuqala kwezilimi ezimbili, konke ukuguqula okubhalwe phansi nokubuyisekayo.",
   "h1": "Ungawashintsha kanjani amagama ngobuningi kumagama-ncinci",
   "intro": "Ithebula lamagama elilodwa lenza amagama efayela lamagama-ncinci eliphelele ahambisane ngesikhathi esisodwa – izikhathi, izitayela ze-ASS namabhulokhi e-VTT NOTE akuthintwa ngisho unhlamvukazi owodwa.",
   "ctaText": "Vula ukushintshwa kwamagama ngobuningi"
  },
  "body": [
   {
    "h2": "Lokhu okwenziwa yileli thuluzi",
    "ps": [
     "Igama elifanayo elihunyushwe ngezindlela ezimbili ezihlukene, amagama nezindawo ezikhukulayo ngokuhunyushwa komshini, amagama-ncinci omunye umuntu adinga ukuhambisana nemithetho yakho – konke lokhu kuhlanganyela uphawu olulodwa: okushintshayo igama, hhayi isakhiwo. Leli khasi lishintsha amagama kuphela."
    ]
   },
   {
    "h2": "Okokufaka okubili: amagama-ncinci nethebula lamagama",
    "ps": [
     "Ikholomu ethi \"1 Faka amagama-ncinci\" kwesobunxele ithatha ifayela lamagama-ncinci, noma ungamathisela okuqukethwe ngqo ngaphakathi; uma ukhethe ifayela elingalungile, chofoza u-\"Sula\".",
     "Ikholomu ethi \"2 Ithebula lamagama\" kwesobunxele ephethe imithetho. **Umthetho owodwa ngomugqa**, negama elidala negama elisha ahlukaniswe ngo- `->` , `=>` , `→` noma u-Tab – zonke ezine ziyasebenza. Imigqa eqala ngo- `#` ingamazwana futhi ayibambi iqhaza ekushintsheni.",
     "Uma ungaqinisekile ngefomethi, chofoza u-\"Gcwalisa isibonelo\" bese uyahlela lokho."
    ],
    "img": {
     "file": "glossary-up",
     "alt": "Indawo yokufaka amagama-ncinci kanye nokufakwa kwethebula lamagama ekhasini lokushintsha amagama",
     "cap": "Amagama-ncinci kwesobunxele, imithetho kwesokudla; umthetho owodwa ngomugqa, igama elidala negama elisha ahlukaniswe ngo- ->"
    }
   },
   {
    "h2": "Indlela yokubhala ithebula lamagama",
    "ps": [
     "Umthetho owodwa ngomugqa: igama lamanje kwesobunxele, okufanele libe yilo kwesokudla. Isibonelo `Thor -> Donar` sithatha wonke u-\"Thor\" efayeleni siwushintshe abe ngu-\"Donar\".",
     "Amazwana aqala ngo- `#` futhi awusizo ekubhaleni iqembu lemithetho (isibonelo \"# ukulungiswa kwamagama esizini 1\"), nasekucasiseni umthetho okwesikhashana – vele ubeke u- `#` phambi kwawo esikhathini sokususa.",
     "Imithetho isebenza kusuka phezulu kuya phansi; umbhalo okhiqizwe umthetho owodwa uhlolwa futhi yimithetho engezansi kwawo. Uma ukulandelana kubalulekile (ithi, shintsha u-A ngo-B kuqala bese u-B ngo-C), gcina lokho engqondweni."
    ],
    "img": {
     "file": "glossary-table",
     "alt": "Umugqa ngemva komugqa wemithetho yokushintsha ekufakweni kwethebula lamagama",
     "cap": "Umthetho owodwa ngomugqa; imigqa eqala ngo-# ingamazwana futhi ingacisha umthetho okwesikhashana"
    }
   },
   {
    "h2": "Okwenziwa izinkinoshini ezintathu",
    "ps": [
     "**Ububanzi**: `konke` / `umugqa wokuqala kuphela` / `umugqa wesibili kuphela`. Efayeleni lezilimi ezimbili, khetha \"umugqa wesibili kuphela\" uma ufuna ukuguqula ukuhumusha kuphela; okufakiwe okunomugqa owodwa kuphela okuhlala kungathintanga ngaphansi kwanoma yiluphi ushintsho lomugqa owodwa – ithuluzi aliziqageli ukuthi iyiphi iŋxenye eyisiqalo.",
     "**Igama eligcwele**: kusheshe kushintshe amagama amile wodwa njengegama, ngakho u- `art` ngeke athinte u- `start`. Ngezilimi ezingahlukanisi amagama ngezikhala, njengeShayina neJapane, le nkinoshini ayinamphumela – ukushintsha kusebenza ezincwadini ezingaphansi lapho.",
     "**Ukuzwela kosonhlamvukazi**: kuvaliwe ngokuzenzakalelayo, ngakho u- `CEO` no- `ceo` bayashintshwa bobabili; uma kukhethiwe, igama elifana ncamashi kuphela elishintshwayo."
    ],
    "img": {
     "file": "glossary-opt",
     "alt": "Ububanzi, igama eligcwele kanye nezinkinoshini ezizwela usonhlamvukazi ngaphansi kwethebula lamagama",
     "cap": "Ububanzi bunquma ukuthi yimuphi umugqa oshintshayo; igama eligcwele nosonhlamvukazi kunquma ukuthi igama lifana kangakanani"
    }
   },
   {
    "h2": "Konke okuguqulwe kubhalwe phansi, konke okuguqulwe kuyabuyiseka",
    "ps": [
     "\"3 Umphumela\" kubonisa amagama-ncinci ashintshiwe futhi **kubhala konke okushintshiwe**: yiluphi u-cue, yimuphi umugqa, kusukela kuphi kuye kuphi.",
     "Uma ungafisi okunye kwalokho, chofoza kukho kulolu hlu ukuze ubuyisele lokho okufakiwe kuphela – asikho isidingo sokuhlela ithebula lamagama futhi uphinde uqale. Uma ujabule, chofoza u-\"Download\" noma u-\"Copy\"."
    ],
    "img": {
     "file": "glossary-out",
     "alt": "Indawo yemiphumela enohlu lwezinguquko ngamunye ngamunye",
     "cap": "Konke ukushintsha kubhalwe phansi; chofoza okungafunwayo ukuze ukubuyisele"
    }
   },
   {
    "h2": "Lokho okushiywa kungathintanga",
    "ps": [
     "**Izikhathi, imigqa yesitayela se-ASS namabhulokhi e-VTT `NOTE` akuthintwa ngisho unhlamvukazi owodwa.** Ukushintsha kusebenza kumbhalo wengxoxo kuphela, hhayi emigqeni yesakhiwo.",
     "Ithebula lamagama alisoze lashintsha ifayela lamagama-ncinci ngokuzenzakalelayo – umphumela uwumkhiqizo omusha futhi elangempela lihlala linjalo."
    ]
   },
   {
    "h2": "Imibuzo ejwayelekile",
    "ps": [
     "**Kungani igama lingashintshwanga?** Hlola ububanzi kuqala: uma kukhethwe \"umugqa wesibili kuphela\", okufakiwe okunomugqa owodwa kuphela kuhlala kungathintanga. Bese uhlola ukufana kwamagama agcwele, okumisa ukufana okungeyona amagama amile wodwa.",
     "**Kungani isiShayina sisashintsha izinhlamvu ezingaphansi kugama eligcwele elikhethiwe?** Lokho kulindelekile. IsiShayina nesiJapane azihlukanisi amagama ngezikhala, ngakho ithuluzi alikwazi ukuthola imingcele yamagama futhi ukufana kwamagama agcwele akunamphumela lapho.",
     "**Ngiyibuyisela kanjani yonke into emuva emva kwephutha?** Buyisela okufakiwe ngakunye ngohlu lwezinguquko; ukuze uqale kabusha ngokuphelele, sula ithebula lamagama bese wengeza amagama-ncinci futhi.",
     "**Ingabe imigqa yesitayela se-ASS ingashintshwa ngephutha?** Cha. Imigqa yesitayela namabhulokhi e- `NOTE` angaphandle kobubanzi; umbhalo wengxoxo kuphela obamba iqhaza."
    ]
   },
   {
    "h2": "Ukugcinwa imfihlo",
    "ps": [
     "Amagama-ncinci kanye nethebula lamagama zicutshungulwa ngokuphelele esipheqululini: akukho okulayishwile futhi akukho okudlula kwisingeli. Ithebula lamagama aligcinwa, ngakho alinalutho ngesikhathi esilandelayo ovula ngaso ikhasi."
    ]
   },
   {
    "h2": "Amathuluzi ahlobene nemihlahlandlela",
    "ps": [
     "Ukuthi wakha kanjani ithebula lamagama nokuthi ulondoloza kanjani esizini yonke, bheka [[Term tables: keeping a season consistent|/guides/subtitle-glossary.html]]; uma okuqukethwe kungcolile (izimpawu zamanzi, ama-cue e-SDH) sebenzisa [[Subtitle cleaning|/clean.html]] kuqala; uma amagama esehlelwe futhi udinga ezinye izilimi iya ku-[[Subtitle translation|/translate.html]]; futhi usebenzise umphumela nge-[[Subtitle QC|/qc.html]]."
    ]
   }
  ]
 },
 "hanconv": {
  "seo": {
   "title": "Ukuguqulwa Kwemibhalo Elinganiselwe–Yendabuko – i-Taiwan vs i-Hong Kong – AI-SRTSub",
   "desc": "Ukuhamba ngezindlela eziyisishiyagalolunye: eyase-Taiwan enamagama esifunda noma engekho, i-Hong Kong njengendlela yayo, konke kungaguqulelwa emibhalweni elula. Izingxoxo kuphela eziguqukayo; izikhathi zihlala zinjalo.",
   "h1": "Indlela yokuguqula imibhalo engezansi yesi-Chinese elula neyendabuko",
   "intro": "Ukuthi umbhalo ogezansi uya e-Taiwan, e-Hong Kong noma e-mainland kuyashintsha kokubili amagama kanye nokwakheka kwezinhlamvu. Izindlela eziyisishiyagalolunye ongazikhetha, futhi yizingxoxo kuphela eziguqulwayo — izikhathi, izinombolo kanye nemigqa yisitayela se-ASS akusoze kwathintwa.",
   "ctaText": "Vula isiguquli"
  },
  "body": [
   {
    "h2": "Okwenziwa yileli thuluzi",
    "ps": [
     "Ukuguqula phakathi kweyendabuko nelula akusona nje ukubhala uhlamvu ngalunye ngendlela ehlukile. Igama elifanayo elilula lihambisana namagama ahlukene ezifundeni ehlukene — igama lesi-software liyahlukana phakathi kwe-Taiwan ne-mainland, kanti i-Hong Kong inayo eyayo inguqulo. Isiguquli siyazihlukanisa lezi:"
    ]
   },
   {
    "h2": "Ukulayisha nokuthola",
    "ps": [
     "Hudula ifayela lingene noma ufake elinye — i-SRT, i-VTT, i-ASS kanye ne-TXT ziyasekelwa — noma unamathisele okuqukethwe kombhalo ogezansi ngqo ebhokisini. Ifomethi itholwa ngokuzenzakalelayo futhi iboniswa eceleni «Detected format»."
    ],
    "img": {
     "file": "hanconv-up",
     "alt": "Indawo yokulayisha yesiguquli: indawo yokuphonsa nebhokisi lokunamathisela, kanye nefomethi etholiwe phezulu",
     "cap": "SRT / VTT / ASS / TXT, ifomethi itholwe ngokuzenzakalelayo"
    }
   },
   {
    "h2": "Ukukhetha phakathi kwezindlela eziyisishiyagalolunye",
    "ps": [
     "Izindlela eziyisishiyagalolunye ngaphansi «Convert to» zihlukaniseka zaba amaqembu amathathu. **Simplified → traditional**: eyendabuko ejwayelekile, eyase-Taiwan (shintsha amagama), eyase-Taiwan (izinhlamvu kuphela), i-Hong Kong. **Traditional → simplified**: ejwayelekile, evela e-Taiwan, evela e-Hong Kong. **Traditional to traditional**: amafomu ase-Taiwan, amafomu ase-Hong Kong.",
     "Ukukhetha «Taiwan wording» kushintsha namagama esifunda: igama lesi-software liba yilabo base-Taiwan kanye negama lolwazi; «Taiwan glyphs» kushintsha kuphela ukuthi izinhlamvu zibhalwa kanjani futhi kuyawushiya amazwi akho njengoba enjalo. I-Hong Kong yinto ehlukile nhlobo futhi isebenzisa elinye igama lesi-software. Ukuze ubuyisele kokulula, sebenzisa iqembu elingaphansi — kufanele usho ukuthi uvela kuliphi ihlobo lendabuko, ngoba umbhalo wase-Taiwan nowe-Hong Kong uthatha izindlela ezehlukene zokubuya."
    ],
    "img": {
     "file": "hanconv-dir",
     "alt": "Ikhadi lokuguqula: imenyu yokudonsela phansi yendawo ebonisa «Simplified → Taiwanese traditional (change wording)» kukhethiwe",
     "cap": "Izindlela zisezinyuvesi zokudonsela phansi «Convert to» ngamaqembu amathathu; lena eyase-Taiwan enezinguquko zamagama"
    }
   },
   {
    "h2": "Umphumela nokuthekelisa",
    "ps": [
     "Indawo yomphumela ibonisa umbhalo ogezansi oguquliwe ngokushesha, kanye nebha yezibalo enikeza ingqikithi yemigqa kanye nokuthi mingaki imigqa eshintshile. Uma kungekho lutho olushintshile nhlobo uthola Iseluleko sokuthi ifayela lingase lingabi nezinhlamvu zesi-Chinese — izinhlamvu ze-Han kuphela eziguqulwayo, ngakho umbhalo ogezansi wonke owama-Latin noma owamanani uhlala unjengoba wawunjalo.",
     "Bese ulanda noma ukopisha. I-tag yolimi ifakwa egameni lefayela — okuthi `demo.srt` kube `demo.zh-TW.srt` kwendabuko yase-Taiwan, `.zh-Hant` kwendabuko ejwayelekile, kanye `.zh-Hans` lapho ubuyisela kokulula."
    ],
    "img": {
     "file": "hanconv-out",
     "alt": "Indawo yomphumela: umbhalo ogezansi oguquliwe nebha yezibalo",
     "cap": "I-bha yezibalo ibonisa ingqikithi nemigqa eshintshile; landa noma kopisha kusuka lapha"
    }
   },
   {
    "h2": "Okungasoze kwathintwa",
    "ps": [
     "Izingxoxo kuphela eziguqulwayo. Izikhathi, izinombolo zenkomba kanye nemigqa yesitayela se-ASS akuthintwa nhlobo — umphumela usukulungele ukusetshenziswa ngaphandle kokuphinda wenze noma iyiphi indlela yokuhlela."
    ]
   },
   {
    "h2": "Imibuzo Ebuzwa Njalo",
    "ps": [
     "**Kungani isiguquli singashintsanga igama elithi \"clean\"?** Ukuxhumana okukodwa kuya kokuningi kuxazululwa ngegama: umqondo othi \"clean\" nomqondo othi \"dry\" zabelana ngendlela eyodwa yendabuko, kuyilapho umqondo othi \"tree trunk\" usebenzisa ohlukile. Amathebula avela ku-OpenCC, afanisa imisho yonke kunezinhlamvu ezodwa.",
     "**Buyini umehluko phakathi kwendabuko yase-Taiwan ne-Hong Kong?** Amagama: igama lesi-software liyahlukana phakathi kwalokho kokubili. Khetha indlela yesifunda osithumela kuso.",
     "**Inani lezinhlamvu lishintshile ngemva kokuguqula?** Izinhlamvu ze-Han kuphela ezishintshaniswayo — akukho okufakwayo noma okususwayo futhi akukho sikhathi esinyakaziswayo. Uma inani lemigqa lishintshile, hlola ukuthi ifomethi itholwe yini kahle.",
     "**Isichazamazwi sihlulekile ukulayisha?** Ikhasi likutshela ukuthi uvuselele futhi uzame futhi. Ilayisha endaweni yangakini, ngakho asikho isidingo sokulayisha imibhalo engezansi noma kuphi."
    ]
   },
   {
    "h2": "Ubumfihlo",
    "ps": [
     "Ukuguqula kusebenza ngokuphelele esipheqululini sakho. Akukho okuqukethwe kombhalo ogezansi okuthunyelwa kuseva."
    ]
   },
   {
    "h2": "Amathuluzi ahlobene nemihlahlandlela",
    "ps": [
     "Uma konke okudingayo kuyindlela elula eya kwendabuko, bheka [[Convert simplified subtitles to traditional|/guides/srt-simplified-to-traditional.html]]; ukuthi kungani kumayelana nokungaphezulu kokushintshanisa izinhlamvu, bheka [[Simplified vs traditional is not a character swap|/guides/simplified-traditional-chinese.html]]; ukuguqulela kolunye ulwimi, [[Subtitle translation|/translate.html]]."
    ]
   }
  ]
 },
 "how-to-make-lrc-file": {
  "seo": {
   "title": "Indlela yokuvumelanisa amagama e-LRC – Umugqa owodwa ngeligama, nqakraza – AI-SRTSub",
   "desc": "Yakha ifayela le-LRC kusukela ekuqaleni: namathisela umugqa owodwa wombhalo ngamunye, nqakraza isikhathi njengoba ulalele, izinqamuleli ezibalulekile, ukuthi yikuphi okumele kuqhutshwe, i-LRC noma i-SRT, nokumele kwenziwe uma isikhathi siphambuka.",
   "h1": "Indlela yokuvumelanisa amagama e-LRC",
   "intro": "Ifayela le-LRC liwumugqa owodwa wamagama kuhlanganiswe nephuzu lesikhathi elilodwa. Ukwenza elilodwa kubizwa ngokuthi ukubeka isikhathi: ukuthwebula isikhathi umugqa ngamunye oqala ngaso.",
   "ctaText": "Vula ithuluzi lokuvumelanisa amagama"
  },
  "body": [
   {
    "h2": "Kuyini ngempela ukubeka isikhathi",
    "ps": [
     "Isakhiwo sefayela le-LRC silula kakhulu: umugqa owodwa wombhalo ngamunye, ngamunye unikezwe uphawu lwesikhathi olungu-`[mm:ss.xx]`. Uma umdlali efinyelela kumugqa, ubonisa lawo magama ngaleso sikhathi.",
     "Ngakho umsebenzi wonke \"wokwenza i-LRC\" ukuqoka iphupho lesikhathi kumugqa ngamunye wamagama — futhi akukho mshini ongenza lokho esikhundleni sakho, ngoba ukunquma ukuthi umugqa uqala kuphi ukuculwa kudinga ukulalela."
    ]
   },
   {
    "h2": "Mangaki amathuba ingoma eyiwadingayo",
    "ps": [
     "Kuyafaneleka ukucabanga ngalokhu umzuzu ngaphambi kokuba uqale; konga umsebenzi omningi:"
    ],
    "img": {
     "file": "lrc-tap2",
     "alt": "Izilawuli zokudlala, zokumaka lo mugqa, zokuhoxisa umugqa owodwa kanye nokweqa lo mugqa endaweni yokuncindezela",
     "cap": "Ukucindezela u-Enter ngesikhathi sokudlala kuyindlela ebushelelezi kakhulu; umake umugqa ongafanele? Cindezela u-Z bese umaka futhi"
    }
   },
   {
    "h2": "Ukunamathisela amagama kunquma ukuthi konke okunye kuzohamba kahle kangakanani",
    "ps": [
     "Namathisela amagama umugqa owodwa ngegama ngalinye; imigqa engenalutho iyeyeqiwa. Ukwehlukana kwemigqa okunamathiselayo yimigqa ozoyibekela isikhathi kamuva — yehlukanise ibe imigqa eminingi manje futhi uzocindezela kaningi ngokwengeziwe kamuva.",
     "Ukunamathisela i-LRC ekhona kuyasebenza futhi: izimpawu zayo zesikhathi ezingu-`[mm:ss.xx]` ziyaziwa, futhi emva kokungenisa **uqhubeka kusuka kumugqa wokuqala ngaphandle kwesikhathi**, ngakho imigqa eseyabekelwe isikhathi akudingeki iphindwe.",
     "Lokho kusho ukuthi i-LRC eqedwe ingxenye ingagcinwa futhi inamathiselwe emuva kamuva ukuze iqhubeke."
    ],
    "img": {
     "file": "lrc-paste2",
     "alt": "Indawo yokunamathisela amagama kanye nenkinobho yokuhlaziya amagama",
     "cap": "Umugqa owodwa ngeligama; ukunamathisela i-LRC yonke kufunda izikhathi ezikhona ukuze ukwazi ukuqhubeka"
    }
   },
   {
    "h2": "Khipha i-LRC noma i-SRT",
    "ps": [
     "**Kumdlali womculo, khipha i-LRC.** i-foobar2000, zonke izinhlobo zabadlali namadivayisi abonisa amagama ayayifunda.",
     "**Ukubeka amagama kuvidiyo noma ukuwacubungula ngokuphambili, khipha i-SRT.** Amathrekhi wemibhalo engezansi yevidiyo, amathuluzi emibhalo engezansi kanye nesoftware yokuhlela kufunda i-SRT. Ekukhipheni umugqa ngamunye uhlala kuze kuqale olandelayo, kanti umugqa wokugcina ubuyela emva ku-2 seconds.",
     "Kokubili kukhipha kuphela imigqa enesikhathi — imigqa eyeqiwe ayikaze ingene efayeleni."
    ],
    "img": {
     "file": "lrc-export",
     "alt": "Izinkinobho zokulanda i-LRC, ukulanda i-SRT kanye nokopisha endaweni yokukhipha",
     "cap": "I-LRC yabadlali, i-SRT yevidiyo; kuphela imigqa enesikhathi ekishwayo"
    }
   },
   {
    "h2": "Izinto ezimbalwa okulula ukuzenza budedengu",
    "ps": [
     "**Konke akulungile kancane emva kokubeka isikhathi? Sebenzisa i-offset.** Khipha i-SRT bese uyisusa njengento eyodwa nge-[[Timeline adjustment|/shift.html]]; kushesha kakhulu kunokubuyisela isikhathi umugqa ngamunye.",
     "**Ukuphambuka kuyakhula njengoba ingoma iqhubeka? Lena yinkinga yesilinganiso.** Uma isivinini sokudlala nesivinini sokurekhoda sehlukene, iphutha liyakhula ekugcineni, futhi lokho kudinga ukulinganisa okulinganiselwe, hhayi i-offset.",
     "**Izinqamuleli zizwakala kahle kuphela uma uzisebenzisa ndawonye.** Isikhala siyadlala futhi simise, u-Enter umaka umugqa wamanje, u-Z uhoxisa umugqa owodwa — cindezela u-Enter ngqo ngesikhathi sokudlala esikhundleni sokushintsha phakathi kwegundane nekhibhodi.",
     "**Ikhwalithi yomsindo ithinta ukunemba.** Umthombo onezwi elicacile kulula ukuwulandela; ukuqoshwa bukhoma nemithombo enezinsimbi ezinkulu zokusekela kuyabonakala kunzima."
    ]
   },
   {
    "h2": "Amathuluzi ahlobene nemihlahlandlela",
    "ps": [
     "Ukuze ubone umhlahlandlela ophelele bheka [[How to use the lyric sync tool|/guides/lrc.html]]; ukuguqula i-LRC ekhona ibe imibhalo engezansi bheka [[LRC to SRT|/guides/lrc-to-srt.html]]; uma i-SRT ekhishiwe ingalungile isikhathi sebenzisa [[Timeline adjustment|/shift.html]]; bese ugijima umphumela nge-[[Subtitle QC|/qc.html]]."
    ]
   }
  ]
 },
 "lrc": {
  "seo": {
   "title": "Ithuluzi lokuvumelanisa amagama – Layisha ingoma, namathisela amagama, nqakraza – AI-SRTSub",
   "desc": "Layisha ingoma, namathisela amagama, nqakraza isitembu sesikhathi ngomugqa njengoba ulalele, bese ukhipha i-LRC noma i-SRT. Isikhala siyadlala futhi simise, u-Enter umaka umugqa, u-Z uyahoxisa.",
   "h1": "Indlela yokusebenzisa ithuluzi lokuvumelanisa amagama",
   "intro": "Layisha ingoma, namathisela amagama, nqakraza isitembu sesikhathi somugqa ngamunye njengoba ulalele, bese ukhipha i-LRC noma i-SRT ejwayelekile. Umsindo udlala endaweni yangakini futhi awuphinde ulayishwe.",
   "ctaText": "Vula ithuluzi lokuvumelanisa amagama"
  },
  "body": [
   {
    "h2": "Okwenziwa yileli thuluzi",
    "ps": [
     "Nikeza ingoma ifayela lamagama elingaculelwa: umugqa owodwa ngeligama ngalinye, umugqa ngamunye uphethe iphupho lesikhathi. Abadlali bafunda i-LRC, amathrekhi wemibhalo engezansi afunda i-SRT, futhi kokubili kungathengiswa lapha."
    ]
   },
   {
    "h2": "1 Layisha ingoma",
    "ps": [
     "Ikholomu yokuqala ngakwesobunxele ithatha ifayela lomsindo: **MP3, M4A, FLAC, WAV kanye ne-OGG** konke kuyasebenza. Umsindo udlala endaweni yangakini futhi awuphinde ulayishwe.",
     "Ikhwalithi yomsindo ayithinti ukunemba kwesikhathi, kodwa umthombo onezwi elicacile kulula ukuwulandela; ukuqoshwa bukhoma nemithombo enezinsimbi ezinkulu zokusekela kuyabonakala kunzima ukuvumelanisa."
    ],
    "img": {
     "file": "lrc-up",
     "alt": "Indawo yokulayisha ingoma yethuluzi lokuvumelanisa amagama",
     "cap": "MP3 / M4A / FLAC / WAV / OGG konke kuyasebenza, futhi umsindo udlala endaweni yangakini kuphela"
    }
   },
   {
    "h2": "2 Namathisela amagama",
    "ps": [
     "Namathisela amagama kukholomu yesibili, **umugqa owodwa ngeligama**; imigqa engenalutho iyeyeqiwa ngokuzenzakalelayo. Bese uchofoza \"Parse lyrics\".",
     "Ukunamathisela i-LRC ekhona kuyasebenza futhi — izimpawu zayo zesikhathi ezingu-`[mm:ss.xx]` ziyaziwa, futhi emva kokungenisa uqhubeka kusuka kumugqa wokuqala ngaphandle kwesikhathi, ngakho imigqa eseyabekelwe isikhathi akudingeki iphindwe."
    ],
    "img": {
     "file": "lrc-paste",
     "alt": "Indawo yokunamathisela amagama kanye nenkinobho yokuhlaziya amagama",
     "cap": "Namathisela umugqa owodwa ngeligama, noma unamathisele i-LRC yonke futhi uvumele ithuluzi lifunde izikhathi ezikhona"
    }
   },
   {
    "h2": "3 Nqakraza njengoba ulalele",
    "ps": [
     "Dlala ingoma bese ucindezela u-Enter ngesikhathi umugqa uqala ngawo (noma uchofoze \"Stamp this line\"); isikhathi salowo mugqa siqoshiwe futhi ikhesa igxumela kwelandelayo.",
     "Izinqamuleli: **space** iyadlala futhi imise, **Enter** umaka umugqa wamanje, **Z** uhoxisa umugqa owodwa. Ukucindezela u-Enter ngesikhathi sokudlala kuyindlela ebushelelezi yokusebenza — akukho ukushintsha emuva naphambili phakathi kwegundane nekhibhodi.",
     "Umake umugqa ongafanele? Cindezela u-Z ukuze uwuhoxise futhi umake futhi. Uma ungafuni ukumaka umugqa nhlobo (ikhefu lezinsimbi zomculo, umugqa womculo kuphela), chofoza \"Skip this line\" futhi ngeke ubonakale ekukhipheni."
    ],
    "img": {
     "file": "lrc-tap",
     "alt": "Izilawuli zokudlala, zokumaka lo mugqa, zokuhoxisa umugqa owodwa kanye nokweqa lo mugqa endaweni yokuncindezela",
     "cap": "Isikhala siyadlala futhi simise, u-Enter umaka umugqa wamanje, u-Z uyahoxisa — izandla zihlala kukhibhodi"
    }
   },
   {
    "h2": "4 Khipha",
    "ps": [
     "Ikholomu yesine yenza ukukhipha: **Download LRC** yabadlali, **Download SRT** yamathrekhi wemibhalo engezansi yevidiyo, noma \"Copy\" ukuthatha umbhalo ngqo.",
     "Kuphela imigqa enesikhathi ekishwayo; imigqa eyeqiwe ayikaze ingene efayeleni. Ekukhipheni kwe-SRT umugqa ngamunye uhlala kuze kuqale olandelayo, kanti umugqa wokugcina ubuyela emva ku-2 seconds."
    ],
    "img": {
     "file": "lrc-out",
     "alt": "Izinkinobho zokulanda i-LRC, ukulanda i-SRT kanye nokopisha endaweni yokukhipha",
     "cap": "I-LRC yabadlali, i-SRT yevidiyo; kuphela imigqa enesikhathi ekishwayo"
    }
   },
   {
    "h2": "Okushiywe kungathintwa",
    "ps": [
     "Umbhalo wamagama awubhalwa kabusha. Ukubeka isikhathi kwengeza iphupho lesikhathi elilodwa kuphela ngomugqa futhi akuthinti amagama owanamathisile.",
     "Uma ungenisa i-LRC ekhona, imigqa esivele iphethe uphawu lwesikhathi igcina isikhathi sayo sokuqala futhi umaka kuphela kusuka kumugqa wokuqala ongenasikhathi kuya phambili."
    ]
   },
   {
    "h2": "Imibuzo ejwayelekile",
    "ps": [
     "**Kungani eminye imigqa ingekho ekukhipheni?** Imigqa eyeqiwe nemigqa enesikhathi esingekho ayikaze ingene efayeleni. Buyela esinyathelweni sesithathu bese uyayengeza, noma uqinisekise ukuthi bekufanele yeqiwe.",
     "**Ingabe izikhathi zingashintshwa emva kwalokho?** Uma ufuna ukususa konke kancane emva kokumaka, khipha i-SRT bese usebenzisa [[Timeline adjustment|/shift.html]] ukuze unxephezele noma ulinganise njengento eyodwa.",
     "**I-LRC noma i-SRT — yikuphi okumele ngikukhiphe?** I-LRC yabadlali bomculo (i-foobar2000, amaklayenti okusakaza, zonke izinhlobo zabadlali); i-SRT lapho amagama kufanele ahlale khona kuvidiyo noma acutshungulwe ngokuphambili ngamathuluzi emibhalo engezansi.",
     "**Kuthatha isikhathi esingakanani ingoma eyodwa?** Kuncike ekutheni mingaki imigqa ekhona nokuthi ufuna ukuba ngqo kangakanani. Engomeni enemigqa engamashumi amathathu noma amane, imizuzu embalwa ngesikhathi uma wazi ukuthi kuhamba kanjani; ukujaha ukunemba kwezinga lamagama kuthatha isikhathi esiningi."
    ]
   },
   {
    "h2": "Ubumfihlo",
    "ps": [
     "Umsindo namagama kucutshungulwa ngokuphelele esipheqululini: akukho okulayishwayo futhi akukho okudlula kuseva. Umsindo uyahlukaniswa futhi udlale endaweni yangakini kuphela."
    ]
   },
   {
    "h2": "Amathuluzi ahlobene nemihlahlandlela",
    "ps": [
     "Uma usuvele unayo i-LRC futhi ufuna imibhalo engezansi bheka [[LRC to SRT|/guides/lrc-to-srt.html]]; ngomcabango nezithiyo ezingemuva kokubeka isikhathi bheka [[How to sync LRC lyrics|/guides/how-to-make-lrc-file.html]]; uma i-SRT ekhishiwe ingalungile sebenzisa [[Timeline adjustment|/shift.html]]; bese ugijima umphumela nge-[[Subtitle QC|/qc.html]]."
    ]
   }
  ]
 },
 "lrc-to-srt": {
  "seo": {
   "title": "Isiguquli se-LRC siye ku-SRT – Guqula Amagama Abe Imibhalo Engezansi – AI-SRTSub",
   "desc": "Guqula amagama e-LRC abe yimibhalo engezansi ye-SRT: umugqa ngamunye uhlala kuze kuqale olandelayo, umugqa wokugcina uthola imizuzwana emithathu. Izingoma ezingaphezu kwemizuzu engu-60 zifundeka kahle. Kusebenza esipheqululini sakho.",
   "h1": "LRC ukuya ku-SRT",
   "intro": "Guqula amafayela wamagama e-LRC abe yi-SRT: faka ifayela, khetha i-SRT, landa. Izikhathi zokuphela zigcwaliswa ngomugqa olandelayo ngokuzenzakalelayo.",
   "ctaText": "Guqula i-LRC → i-SRT"
  },
  "body": [
   {
    "h2": "Indlela i-LRC ehlukile ngayo ku-SRT",
    "ps": [
     "I-LRC iwuhlobo lwamagama: umugqa ngamunye uphethe isikhathi sokuthi \"qala ukucula\" ku-`[minutes:seconds.cents]` futhi **ngekho isikhathi sokuphela**; wonke umugqa we-SRT udinga kokubili ukuqala nokuphela. Ngakho umongo wokuguqula uwukugcwalisa izikhathi zokuphela."
    ],
    "img": {
     "file": "convert-upload-lrc",
     "alt": "Indawo yokulayisha: ifayela le-LRC lilayishiwe, latholakala njenge-LRC",
     "cap": "Ifayela lamagama elinezitembu zesikhathi zika-[00:12.50] liyatholakala njenge-LRC ngokushesha"
    }
   },
   {
    "h2": "Indlela izikhathi zokuphela ezicwaliswa ngayo",
    "ps": [
     "Umthetho ulula: **umugqa ngamunye uhlala kuze kuqale olandelayo**; umugqa wokugcina awunaye \"owalandelayo\", ngakho uthola imizuzwana emithathu. Futhi, izitembu zesikhathi se-LRC ziphethe imizuzu namasekhondi kuphela — akunamahora — futhi umkhakha wemizuzu awudluli (u-62:05 usho ihora eli-1 imizuzu emi-2 amasekhondi ama-5), ngakho amathrekhi amade engeziwe afana ne-DJ mixes afundeka kahle."
    ]
   },
   {
    "h2": "Indlela yokuguqula",
    "ps": [
     "Vula [[converter|/convert.html]], faka i-LRC, khetha **SRT - SubRip** njengokuphumayo, bese uguqula futhi ulande. Kuyasiza kumavidiyo omculo kanye nokufaka amagama njengemibhalo engezansi kubadlali; i-SRT ekhishiwe ingaguqulwa futhi ibe yi-VTT yewebhu."
    ]
   }
  ]
 },
 "make-bilingual-subtitles": {
  "seo": {
   "title": "Izindlela Ezimbili Zokwenza Imibhalo Engezansi Yezilimi Ezimbili – AI-SRTSub",
   "desc": "Imibhalo engezansi yezilimi ezimbili iza ngezindlela ezimbili: imigqa emibili kumugqa owodwa, noma amacue amabili kulayini wesikhathi ofanayo. Izinzuzo, ububi, kanye nendlela yokushintsha phakathi kwazo. – AI-SRTSub",
   "h1": "Izindlela Ezimbili Zokwenza Imibhalo Engezansi Yezilimi Ezimbili",
   "intro": "Umbhalo omncane ofanayo wezilimi ezimbili ungase ufihle izinhlelo ezimbili ezihlukene ngokuphelele. Funda ukuzihlukanisa, futhi ukwenza, ukwahlukanisa, kanye nokuguqula konke kuyeka ukukudida.",
   "ctaText": "Sebenza ngemibhalo engezansi yezilimi ezimbili"
  },
  "body": [
   {
    "h2": "Ukubukeka Kwezindlela Ezimbili",
    "ps": [
     "**Ifomu B: ama-cue amabili kulayini wesikhathi ofanayo.** Umugqa owodwa wengxoxo uba ama-cue amabili ahlukene emibhalo engezansi anesikhathi esifanayo — owesiNgisi owodwa, owesiShayina owodwa — abhalwe phezu komunye. Lena yindlela ejwayelekile kakhulu eyakhiwa ngayo imibhalo engezansi ye-ASS yezilimi ezimbili."
    ]
   },
   {
    "h2": "Lapho Uhlobo Ngalunye Lwehluleka Khona",
    "ps": [
     "Indawo ebuthakathaka yefomu A **ukutholwa**: ukwahlukanisa amathrekhi kusekelwe ohlelweni lokubhala, ngakho ama-pair wesiShayina nesiNgisi noma wesi-Japanese nesiNgisi ahlukana shá, kuyilapho **izinhlanganisela ezisebenzisa uhlelo olulodwa** — isiNgisi nesiFulentshi, noma isiShayina namajapane kanji — zingakwazi ukuhlukaniswa. Indawo ebuthakathaka yefomu B **ukukhiqizwa**: imigqa yesikhathi emibili kufanele ifane ncamashi futhi ukuyiqondanisa ngesandla kuyakhathaza; abanye abadlali baphinde badwebe womabili ama-cue esikhathi esifanayo, bagcwalise isikrini. Umthetho wesandla: sebenzisa Ifomu A lemibhalo engezansi eqediwe eyenzelwe ababukeli; sebenzisa Ifomu B uma udinga ukukhipha amathrekhi ukuze uqhubeke nomsebenzi."
    ]
   },
   {
    "h2": "Izindlela Ezimbili",
    "ps": [
     "**Yakha imibhalo engezansi yezilimi ezimbili kusuka kokwangempela**: sebenzisa [[AI Subtitle Translation|/translate.html]] bese ukhetha “Bilingual · original on top” noma “Bilingual · translation on top” ekuthekeliseni — uthola Ifomu A ngqo; ukukhetha i-ASS kuphinde kunikeze izinhlelo ezimbili, “stacked top and bottom” kanye “two lines at the bottom”.",
     "**Hlanganisa amathrekhi amabili noma uguqule phakathi amafomu**: sebenzisa [[Bilingual Subtitle Stripper|/bilingual.html]] kanye nemodi yayo “merge into one two-line entry” — Ifomu B lingena, Ifomu A liyaphuma; uma uya ngelinye icala, “split into two files” ithatha Ifomu A noma B ingene futhi inikeze amathrekhi amabili azimele aphumayo."
    ],
    "img": {
     "file": "bilingual-modes",
     "alt": "Izinhlelo ezine zokukhipha imibhalo engezansi yezilimi ezimbili; “merge into one two-line entry” ihlanganisa ama-cue amabili abelana ngesikhathi",
     "cap": "“Merge into one two-line entry”: Ifomu B liba Ifomu A"
    }
   },
   {
    "h2": "Iliphi Idivayisi Elizoyidlala",
    "ps": [
     "Abadlali bewebhu (HTML5 ``) kanye nabadlali abaningi beselula baphethe Ifomu A ngokuthembeka kakhudlwana; abadlali bedeskithophu (VLC, mpv, PotPlayer) bamukela kokubili futhi bangaze banikeze ama-cue amabili esikhathi esifanayo imibala ehlukene nezindawo. Uma ungabaza, thumela Ifomu A njenge-SRT — kuhamba kangcono. Ngokwehluka phakathi kwamafomu uqobo, bheka [[SRT, VTT or ASS: Which Should You Use|/guides/subtitle-format-comparison.html]]."
    ],
    "img": {
     "file": "translate-export",
     "alt": "Izinketho zesitayela sezilimi ezimbili kuphaneli yokuthekelisa yethuluzi lokuhumusha",
     "cap": "Khetha ukulandelana kwemigqa yezilimi ezimbili khona lapho uthekelisa — isinyathelo esisodwa bese kwenziwa"
    }
   },
   {
    "h2": "Imibuzo Ebuzwa Njalo",
    "ps": [
     "**Imibhalo engezansi yezilimi ezimbili ibukeka imuncane — yini engingayenza?** Lawula ububanzi bomugqa: iphaneli yokuthekelisa yethuluzi lokuhumusha inokulungiselelwa “bilingual line width”; umugqa omncane usho izinhlamvu ezimbalwa ku-cue ngayinye nesikrini esihlanzekile.",
     "**Ngifuna ithrekhi eyodwa kuphela.** Indlela yokukhipha eyodwa “keep original only / keep translation only” iyayiphatha ngokuchofoza okukodwa, bheka [[Split Bilingual Subtitles into Two Tracks|/guides/split-bilingual-subtitles.html]]."
    ]
   }
  ]
 },
 "merge": {
  "seo": {
   "title": "Ukuhlanganisa imibhalo engezansi yezilimi ezimbili nezinomklamo – Hlanganisa, klama, thumela ngaphandle – AI-SRTSub",
   "desc": "Hlanganisa amafayela amabili emibhalo engezansi abe umkhondo wolimi olubili, klama kabusha ifayela lolimi olubili elikhona, noma klama olulodwa: izindlela zokubhangqa, izifanekiso ze-ASS ne-VTT, nefomethi yokuthumela ngaphandle.",
   "h1": "Uyisebenzisa kanjani ukuhlanganisa izilimi ezimbili kanye nemibhalo engezansi enemiphumela ekhethekile",
   "intro": "Hlanganisa amafayela amabili emibhalo engezansi abe umkhondo owodwa wolimi olubili, noma klama imibhalo engezansi ngqo: ifonti, umbala, umugqa ongaphandle kanye nendawo yileyo oyibonayo iyiyo oyitholayo, futhi ukubuka kuqala kufana nokuthunyelwe ngaphandle.",
   "ctaText": "Vula ithuluzi lemibhalo engezansi enemiphumela ekhethekile"
  },
  "body": [
   {
    "h2": "Lokhu okwenziwa yileli thuluzi",
    "ps": [
     "Leli khasi elilodwa empeleni lihlanganisa imisebenzi emithathu: ukuhlanganisa ifayela lombhalo wokuqala nowohunyushiwe kube ifayela elilodwa lolimi olubili, ukulungisa i-oda kanye nesitayela sefayela elisivele linolimi olubili, nokungeza imiphumela ekhethekile efayeleni lolimi olulodwa. Konke okuthathu kusebenzisa amapharamitha esitayela afanayo nokubuka kuqala okufanayo."
    ]
   },
   {
    "h2": "Imisebenzi emithathu, ikhasi elilodwa",
    "ps": [
     "Phezulu kwekhesi kunezithebhu ezintathu: **Hlanganisa amafayela amabili**, **Lungisa ifayela lolimi olubili**, **Ifayela lolimi olulodwa**. Ukukhetha kwakho kunquma ukuthi zingaki izinsika zokufaka ezivela ngakwesobunxele.",
     "Uma kuhlanganiswa amafayela amabili, uhlangothi lwesobunxele luqukethe izinsika ezimbili, \"1 Imibhalo engezansi yokuqala\" kanye \"2 Imibhalo engezansi ehunyushiwe\"; ngayinye yamukela ifayela elingenisiwe noma umbhalo onanyathiselwe ngqo. Ukulungisa ifayela lolimi olubili nokuklama ifayela lolimi olulodwa zidinga insika eyodwa kuphela."
    ],
    "img": {
     "file": "merge-mode",
     "alt": "Izithebhu ezintathu phezulu kwethuluzi lemibhalo engezansi enemiphumela ekhethekile kanye nendawo yokufaka ngakwesobunxele",
     "cap": "Izithebhu ezintathu phezulu; ukukhetha \"Hlanganisa amafayela amabili\" kulethela insika yokuqala neyohunyushiwe ngakwesobunxele"
    }
   },
   {
    "h2": "Amafayela amabili abhangqwa kanjani",
    "ps": [
     "Into yokuqala ngaphansi \"3 Izilungiselelo zokuhlanganisa\" iyindlela yokubhangqa: **Bhangqa nge-oda · sebenzisa umugqa wesikhathi wokuqala**, **Bhangqa ngomugqa wesikhathi · sebenzisa umugqa wesikhathi wokuqala**, **Bhangqa nge-oda · sebenzisa umugqa wesikhathi ohunyushiwe**.",
     "Lapho womabili amafayela enenani elifanayo lamagalelo ku-oda elifanayo, ukubhangqa nge-oda kuphephile kakhulu. Lapho amanani ehluke (uhlangothi olulodwa luhlanganise amagalelo, olunye lwahlukanisa), bhangqa ngomugqa wesikhathi futhi uvumele ithuluzi lifake ngokusedwu. Umugqa wesikhathi kabani ozowusebenzisa kuxhomeke ekutheni yiliphi ifayela elinembile kakhulu — ngokuvamile elokuqala.",
     "Ngaphansi kwalokho kunesakhiwo sombhalo (ukuthola ngokuzenzakalelayo / imigqa emibili ngokufaka ngakunye / ukushintshana ngamabhangqa) kanye ne-oda (okuqala phezulu / ukuhumusha phezulu)."
    ],
    "img": {
     "file": "merge-pair",
     "alt": "Indlela yokubhangqa, isakhiwo sombhalo kanye nezinketho ze-oda ngaphansi kwezilungiselelo zokuhlanganisa",
     "cap": "Indlela yokubhangqa enquma ukuthi yimuphi umugqa ohamba nomaphi, futhi nomugqa wesikhathi kabani ozowusebenzisa ubekwe lapha futhi"
    }
   },
   {
    "h2": "Lungisa isitayela into nento",
    "ps": [
     "Iphaneli yesitayela ihlezi ngakwesokudla. Uma uthumela ngaphandle i-ASS, ibhulokhi \"Ukubukeka kwe-ASS\" iyasebenza: ukwakheka (ukwahlukanisa · kuphezulu naseansi okuhlukene / ukubeka izendlalelo · imigqa emibili phansi), usayizi, umbala, ukungabonakali, ifonti, okugqamile, okutsyekile, isikhala sezinhlamvu, umugqa ongaphandle, umbala womugqa ongaphandle, umthunzi/isizinda (akukho / umthunzi / isizinda), ukujula, umbala womngcele, ukungabonakali komngcele, ukuhlelwa okuvundlile (phansi · kwesobunxele / phansi · phakathi / phansi · kwesokudla) kanye nebanga ukusuka phansi komugqa wokuhumusha (omkhulu), kanye nefonti, umthunzi/isizinda kanye nemiphetho yesobunxele/yesokudla yomugqa wokuqala (wesibili).",
     "Uma uthumela ukwakheka kwe-VTT yolimi olubili ngaphandle, ibhulokhi \"Isitayela se-WebVTT\" iyasebenza: ngaphezu kwamalungiselelo ayisithupha (okujwayelekile / okuminene / kwefilimu / phezulu / okufinyelelekayo / okumile) ungashintsha umugqa oqondile, ihange (phansi / phezulu / phakathi), indlela evundlile, usayizi wobubanzi, inani lokuhlela kanye nokuphakama komugqa wayo yonke ikhuwu, kanye nombala wesizinda, ukungabonakali kwesizinda nobubanzi bomugqa ongaphandle womugqa wokuhumusha; umugqa wokuqala ungadla isitayela esikhulu noma ubekwe ngokwahlukile.",
     "Uma uqedile ungagcina umphumela njengokulungiselelo bese ukuwusebenzisa futhi kamuva ngokukukhetha ngaphansi \"Kumasethingi alondoloziwe\" bese uchofoza \"Sebenzisa\"."
    ],
    "img": {
     "file": "merge-style",
     "alt": "Amapharamitha ephaneli yokubukeka kwe-ASS ngakwesokudla",
     "cap": "Usayizi, umbala, umugqa ongaphandle, umthunzi/isizinda nokuhlelwa konke kuyalungiseka, futhi umphumela ungagcinwa njengokulungiselelo"
    }
   },
   {
    "h2": "Hlola ukubuka kuqala ngaphambi kokuthumela ngaphandle",
    "ps": [
     "\"Ukubuka kuqala kokuhlanganisa\" kuyithebula: #, isikhathi, okuqala, ukuhumusha, isitayela. Ibha engenhla ihlunga imigqa eyisikwele ng \"kunomsindo\", \"kunesiphawulo somkhulumeli\", \"kufushane kunasekhondi eliyi-1\", \"kunemigqa emibili\", kanye \"nejubane lokufunda selidlulile\", noma ngegama eliyinhloko olifakile.",
     "Ukuchofoza isikhala sesitayela somugqa kwandisa umhleli walowo mgqa futhi kubala kuphela imigqa eyisebenzisayo; \"Sula zonke izilungiselelo\" kubuyisela konke ukweqa mathupha esifanekisweni. Indawo yokulungisa umugqa wesikhathi engezansi iphetha isinxephezelo samazwe ngamazwe (kusuka kuki ezinikeziwe) nokulinganisa okulinganiselayo.",
     "Uma sekubukeka kukuhle, iya kokuthi \"4 Thumela ngaphandle\": landa ifayela lombhalo engezansi noma kopisha okuqukethwe kwalo."
    ],
    "img": {
     "file": "merge-preview",
     "alt": "Ithebula lokubuka kuqala kokuhlanganisa nebha yalo yokuhlunga",
     "cap": "Ukubuka kuqala ukuthumela ngaphandle; hlunga imigqa eyisikwele ngohlobo noma wandise isikhala sesitayela esisodwa"
    }
   },
   {
    "h2": "Okushiywe kungathintwanga",
    "ps": [
     "Ukulungisa isitayela kushintsha ukubukeka kuphela, akusoze kwashintsha ingxoxo. Umbhalo wokuqala nowokuhumusha awushintshwa nguhlamvu olulodwa ngesikhathi sokuhlanganisa; ngaphandle uma ukushintsha ngamabomu endaweni yokulungisa engezansi kokubuka kuqala, umugqa wesikhathi uvela efayeleni olikhethile.",
     "Uma uthumela ngaphandle i-SRT noma \"I-VTT engekho sitayela\", alukho ulwazi lwesitayela olubhalwa efayeleni — ikhasi likutshela ukuthi i-VTT ayinabhulokhi LESITAYELA futhi umdlali uzosebenzisa ukubukeka kwakhe okuzenzakalelayo. Uma ufuna isitayela, khetha ukwakheka kwe-VTT yolimi olubili noma i-ASS."
    ]
   },
   {
    "h2": "Imibuzo ejwayelekile",
    "ps": [
     "**Kuthiwani uma amaفayela amabili enenani elihlukile lamagalelo?** Sebenzisa \"Bhangqa ngomugqa wesikhathi\" futhi ithuluzi lifaka ngokusedwu; amagalelo elingakwazi ukuwabhangqa awakhiwanga.",
     "**Kuthiwani uma umdlali engayinaki isitayela ku-ASS ethunyelwe ngaphandle?** Izitayela zigcinwa ngaphakathi efayeleni, kodwa ukwesekwa komdlali kwe-ASS kuyahlukahluka. Uma udinga ukubukeka okuphathekayo kakhulu, thumela ngaphandle ukwakheka kwe-VTT yolimi olubili.",
     "**Ngingabuyela kanjani esifanekisweni sokuqala ngemuva kokusiphazamisa?** \"Buyisela amapharamitha azenzakalelayo\" kubhulokhi ye-ASS kanye \"Buyisela okuzenzakalelayo kwesifanekiso\" kubhulokhi ye-VTT ngayinye isetha kabusha isigaba sayo.",
     "**Ayini imigqa eyisikhombisa esibonelweni?** Isibonelo esakhelwe ngaphakathi, sikhona ukuze ubone ukuthi ukuhlanganisa kubukeka kanjani; isibonelo asikwazi ukuthunyelwa ngaphandle. Layisha imibhalo yakho engezansi bese uchofoza ukubuka kuqala kokuhlanganisa bese zishintshwa ngokuzenzakalelayo."
    ]
   },
   {
    "h2": "Ukugcinwa kuyimfihlo",
    "ps": [
     "Imibhalo engezansi icutshungulwa ngokuphelele esipheqululini: akukho okulayishwa futhi akukho okudlula kuseva. Vala isiphequluli futhi konke okwaleso sikhathi kuyanyamalala."
    ]
   },
   {
    "h2": "Amathuluzi ahlobene nemihlahlandlela",
    "ps": [
     "Ukwahlukanisa ifayela lolimi olubili libuyele emikhondweni emibili sebenzisa [[Ukuhlukana kolimi olubili|/bilingual.html]]; ukuya ngenye indlela nokuguqula ulimi olulodwa lube ifayela lolimi olubili bheka [[Izindlela ezimbili zokwenza imibhalo engezansi yezilimi ezimbili|/guides/make-bilingual-subtitles.html]]; sebenzisa umphumela nge [[I-QC yembhalo engezansi|/qc.html]]; isizini yonke ngesikhathi esisodwa sebenzisa [[Ukuguqula ngeqoqo|/batch.html]]."
    ]
   }
  ]
 },
 "qc": {
  "seo": {
   "title": "Uyisebenzisa kanjani i-QC Yembhalo Engezansi – Isikhathi & Ukuhlola Ukwakheka – AI-SRTSub",
   "desc": "I-QC Yembhalo Engezansi: Imithetho engu-17 ibamba ukugqagqana, ububanzi bomugqa, isivinji sokufunda kanye nezimpawu zokubhala, imikhawulo ngezilimi ezingu-27. Isigamu siyilungiso lokuchofoza okukodwa; landa umbiko.",
   "h1": "Uyisebenzisa kanjani i-QC Yembhalo Engezansi",
   "intro": "Ngaphambi kokuba unikeze imibhalo engezansi, yidlulise ekhasini le-QC ngesikhathi nokwakheka: okuhlolwayo, ukuthi ungawufunda kanjani umbiko, nokuthi yiziphi izinkinga ezingalungiswa ngokuchofoza okukodwa — konke kuhlanganisiwe lapha.",
   "ctaText": "Vula i-QC Yembhalo Engezansi"
  },
  "body": [
   {
    "h2": "Okwenzelwe Leli Thuluzi",
    "ps": [
     "Imibhalo engezansi ebonakala kahle ngamehlo avamile ivamise ukuvela inemigqa yesikhathi egqagqanayo, imigqa ebanzi ngokweqile, noma isivinji sokufunda esiphakeme kakhulu uma isilethiwe. Ikhasi le-QC libala lezi zinkinga ngayinye ngayinye:"
    ]
   },
   {
    "h2": "Khetha Imithetho Yolimi Kuqala",
    "ps": [
     "Ngaphansi “Kuhlolwe yimithetho yaliphi ulimi” ubeka imikhawulo emihlanu: **ububanzi bomugqa owodwa obukhulu** (amayunithi wengxenye yobubanzi angu-42 endaweni enqala ngokuzenzakalelayo, angu-36 kwesikwele, angu-28 kwesimi mpo), **umkhawulo wesivinini sokufunda** (amayunithi obubanzi angu-18 ngesikhathi ngasinye sesiShayina, sesiJapane naseKorea, angu-20 kwezinye izilimi), **isikhathi esincane samamilisekondi angu-833**, **isikhathi esikhulu samamilisekondi angu-7000**, kanye **nemigqa emibili kakhulu**. Setha ulimi lombhalo engezansi ukuthi luthole ngokuzenzakalelayo noma ukhethe olulodwa lwezingu-27 ngesandla; ukuma kwesikrini kushintsha kuphela izinga lobubanzi bomugqa — isivinini sokufunda, izikhathi kanye nenani lemigqa kuhlala njengoba kunjalo. Amayunithi wengxenye yobubanzi yisilinganiso esabiwe: i-hanzi eyodwa ibalwa njengo-2, incwadi yesiLatini njengo-1 — ububanzi bomugqa bangu-42 bulingana ne-hanzi engu-21 noma izincwadi ezingama-42."
    ],
    "img": {
     "file": "qc-rules",
     "alt": "Izilungiselelo ze-QC: amabhokisi okufaka umkhawulo amahlanu kanye namaconsi olimi lombhalo engezansi nokuma kwesikrini",
     "cap": "Imikhawulo emihlanu + ulimi + ukuma; okuzenzakalelayo kuhambisana nomkhuba ovamile wemboni"
    }
   },
   {
    "h2": "Ukufunda Umbiko",
    "ps": [
     "Umbiko wemithetho engu-17 ubika okutholakele emazingeni amathathu: **amaphutha** (umbhalo ongalungile, ifomethi yesitembu sesikhathi, ukuphela ngaphambi kokuqala, ukubala okwephukile), **izixwayiso** (amagalelo angenalutho, ukugqagqana, izikhathi ezimfishane kakhulu noma ezinde kakhulu, isivinji sokufunda ngaphezu komkhawulo, imigqa ebanzi ngokweqile, imigqa emibili engaphezulu), kanye **namacebiso** (indawo yokweqa umugqa, izikhala zokuqala noma zokuphela, izikhala ezingekho, izindinganiso zezimpawu zokubhala, nokunye okuningi). Konke okutholakele kuphatha inombolo yokufaka kanye “nesilinganiso X, umkhawulo Y” imininingwane, futhi uhlu lungenzeka luhlungwe yizinga. Amagalelo olimi olubili athola ukukhululwa: zombili izindlela zitholwa ngokuzenzakalelayo, ukuhlolwa kokugqagqana kukhulula lonke ubhangqa, futhi isivinji sokufunda sibala kuphela umugqa obhalwe ngolimi oluqondisiwe."
    ],
    "img": {
     "file": "qc-report",
     "alt": "Indawo yombiko we-QC: okutholakele kuqoqwe ngephutha, isixwayiso kanye nelcebiso, ngasinye sinenombolo yokufaka kanye nenani elilinganisiwe",
     "cap": "Umbiko wamazinga amathathu: konke okutholakele kuphatha inombolo yokufaka namagugu alinganisiwe/omkhawulo"
    }
   },
   {
    "h2": "Ukulungisa Nokuthumela Ngaphandle",
    "ps": [
     "Ikhadi elithi “Lungisa & Thumela ngaphandle” libala kuphela izinto **ezingalungiseka ngokuzenzakalelayo**: ukugoqa kabusha, ukususa amagalelo angenalutho, ukungeza izikhala ezingekho, ukufaka esikhundleni sezimpawu zokubhala ngokwezindinganiso zolimi, ukubala kabusha — konke okushiya isikhathi singathintwa kuhlolwe ngokuzenzakalelayo; **izinto ezishintsha isikhathi** (ukushintshana kokuqala nokuphela, ukushintsha ukugqagqana, ukusika noma ukwelula izikhathi) azihlolwanga ngokuzenzakalelayo — zihlole ngemuva kokuhlola umthelela wena uqobo. Chofoza “Sebenzisa ukulungisa” futhi ukuhlolwa okusha kuqala ngokuzenzakalelayo; isibali sibala kuphela lokho okulungiswe ngempela — imigqa ebingeke igoqwe kabusha ayikhuliswanga ezinomenini. **Isivinji sokufunda ngaphezu komkhawulo asinakulungiswa ngokuzenzakalelayo**: umshini awukwazi ukuthi yiluphi uligama okufanele lusikwe, ngakho ukuhumusha kufanele kunciphise ngesandla noma isikhathi silungiswe. Ngemuva kokulungisa, thumela nge-SRT noma VTT, ou chofoza “Landa umbiko” ukuze ugcine umbiko wombhalo ojwayelekile `.qc.txt`."
    ],
    "img": {
     "file": "qc-fix",
     "alt": "Ikhadi lokulungisa: amabhokisi okuhlola ezinto ezingalungiseka ngokuzenzakalelayo kanye nenkinobho Sebenzisa ukulungisa",
     "cap": "Izinto kuphela ezingalungiseka ngokuzenzakalelayo ezenza uhlu; ukulungisa okushintsha isikhathi akuhlolwanga ngokuzenzakalelayo"
    }
   },
   {
    "h2": "Imibuzo Ebuzwa Njalo",
    "ps": [
     "**Kungani i-ASS yami ingakwazi ukuthunyelwa ngaphandle?** I-QC ithumela kuphela i-SRT ne-VTT; i-ASS ingena kodwa ayiphumi. Ukugcina imiphumela ye-ASS, cabanga ngayo kuqala ku-[[Isiguquli Sefomethi|/convert.html]].",
     "**Kusho ukuthini isivinji sokufunda esiyi-18?** KwesiShayina, sesiJapane naseKorea umkhawulo ungabalingiswa abayi-9 abagcwele ngesikhathi sesibili (amayunithi angu-18 awububanzi obuncane); ezinye izilimi zithola amayunithi angu-20 awububanzi obuncane ngesikhathi sesibili. Lawa ngamazinga avamile enduduzo, futhi ibhokisi lokufaka likuvumela ukuthi uwashintshe.",
     "**Ukufakwa kwefayela lami kuphukile — kuseyakwazi ukuhlolwa?** I-QC ifunda i-UTF-8 kuphela; lungisa ukufakwa ekhasini lokulungisa ummbhalo ongalungile kuqala.",
     "**Kuzothinta umugqa wesikhathi sami?** Ngeke inqobo nje uma ushiya iqembu “elishintsha isikhathi” lingahlolwanga; ngisho nalapho lihloliwe, konke ukuguqulwa kuchazwe ngaphambi kokuba ukulungisa kusetshenziswe."
    ]
   },
   {
    "h2": "Imihlahlandlela Ehlobene",
    "ps": [
     "Imibhalo engezansi ekhazimulayo ngokushesha ukuthi ingafundwa — bheka umhlahlandlela ozinikele [[Imibhalo Engezansi Ishesha Kakhulu Ukufundwa|/guides/subtitle-too-fast.html]]. Okufanele kuhlolwe ngaphambi kokulethwa — uhlu lokuhlola luse-[[Okufanele Kuhlolwe Ngaphambi Kokulethwa|/guides/subtitle-quality-check.html]]. Umugqa wesikhathi ophuma ekuhambeni uyinkinga ehlukile — bheka [[Imibhalo Engezansi Ephuma Ekuhambeni|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "remove-subtitle-ads": {
  "seo": {
   "title": "Susa Izikhangiso Nezimpawu Zamanzi Emibhalweni Engezansi – AI-SRTSub",
   "desc": "Susa izimpawu zamanzi nezikhangiso emibhalweni engezansi: ama-URL, amakhredithi efansub kanye namakhodi ngamathegi asulwa ngokuchofoza okukodwa, kanye namagalelo aphindaphindwayo nangenalutho. – AI-SRTSub",
   "h1": "Susa Izikhangiso Nezimpawu Zamanzi Emibhalweni Engezansi",
   "intro": "Ama-URL, amakhredithi namagalelo okukhangisa afihliwe emibhalweni yakho engezansi asulwa ngesikhathi esisodwa yimithetho yezimpawu zamanzi yomhlanzisi — futhi noma yikuphi ukususa ngephutha kungenalwa entry ngentry.",
   "ctaText": "Hlanza izimpawu zamanzi zemibhalo engezansi"
  },
  "body": [
   {
    "h2": "Ziyini lezi zimpawu zamanzi",
    "ps": [
     "Imibhalo engezansi elandiwe ku-inthanethi ivamise ukuthola amagalelo engeziwe ekuqaleni noma ekupheleni (kwesinye isikhathi naphakathi nendawo): ama-URL, ama-email, amagama amaqembu efansub, `encoded by` / `translated by` amakhredithi, amagama amasayithi afana ne-opensubtitles, nemigqa efana “ne-landela i-akhawunti yethu ye-WeChat” noma “ngezinhloso zokutadisha kuphela”. Ngamagalelo ajwayelekile emibhalo engezansi — anomugqa wesikhathi, athathe umugqa — ngakho abadlali abakwazi ukuwasusa; kumele atholwe ngokuqukethwe."
    ]
   },
   {
    "h2": "Ungakwenza kuphi",
    "ps": [
     "Vula [[Umhlanzisi Wemibhalo Engezansi|/clean.html]] bese ufake umbhalo wakho engezansi; iqembu elithi “Izimpawu zamanzi & namagalelo angenangqondo” selivele line “Susa izimpawu zamanzi nezikhangiso”, “Susa amagalelo aphindaphindwayo” kanye “Susa amagalelo angenalutho” kuhlolwe ngokuzenzakalelayo, futhi ukuhlanzwa kuqala ngokuzenzakalelayo. Ukutholwa kusebenza emazingeni amabili: **amasignali aqinile** afana nama-URL, ama-email, amaqembu efansub namagama amasayithi asusa lonke ugcwele uma ehlangana nganoma yiluphi ubude; **amasignali athambile** afana nama-@handle, amakhredithi “e-encoded” noma “e-proofread” ahlulelwa kuphela kumagalelo amafushane angadluli abalingiswa abangu-40, ukugwema ukunqamula ingxoxo ende. Amagalelo ezilimi ezimbili kuqala anqanyulwa imigqa yezimpawu zamanzi umugqa ngomugqa kuyilapho imigqa yengxoxo igcinwa; igcwele isuswa yonke kuphela uma imikhondo yezimpawu zamanzi isasele ngemuva kokunqamula."
    ],
    "img": {
     "file": "clean-opts",
     "alt": "Isikrini sezinketho zokuhlanzwa: amabhokisi okuhlola amathathu ezimpawu zamanzi kanye neqembu lamagalelo angenangqondo",
     "cap": "Iqembu “Lezimpawu zamanzi & namagalelo angenangqondo” livuliwe ngokuzenzakalelayo — akukho ukumiswa ngesandla okudingekayo"
    }
   },
   {
    "h2": "Ukubuyekeza nokuthumela ngaphandle",
    "ps": [
     "Kuhlu lwezinguquko, konke ukungena okususwe kuphatha ithegi “yophawu lwasemanzini & yesikhangiso” — yibheke ukuqinisekisa ukuthi akukho okususwe ngephutha; uma okuthile kubukeka kungalungile, chofoza “Buyisela” ukuze ukubuyisele endaweni yaso. Uma sekuqinisekisiwe, landa: igama lefayela lithola uphawu `.clean` ngokuzenzakalelayo. Ukuhlanzwa kuqhubeka endaweni esipheqululini sakho; imibhalo yakho engezansi ayisoze yathunyelwa ndawo."
    ]
   }
  ]
 },
 "repair": {
  "seo": {
   "title": "Uyisebenzisa kanjani ukulungisa imibhalo engezansi ye-Mojibake – Thola ukufakwa – AI-SRTSub",
   "desc": "Ukuhamba: thola ukufakwa kwokuqala (GBK / Big5 / Shift_JIS / EUC-KR), hlela ukulungisa ngokuthi yini efundeka kakhulu njengolimi, bese ulondoloza i-UTF-8 nge-BOM noma i-GBK. Izikhathi nezinombolo zekheli azishintshi neze.",
   "h1": "Uyisebenzisa kanjani ukulungisa imibhalo engezansi ye-mojibake",
   "intro": "Ifayela lemibhalo engezansi eligcwele izinhlamvu zokungcola alivamile ukuba lonakele — lafundwa nje ngokufakwa okungalungile. Ithuluzi lokulungisa lithola ukufakwa kwokuqala bese libuyisela izinhlamvu ezifanele, lishiya izinombolo zekheli nezikhathi zedwa.",
   "ctaText": "Vula ithuluzi lokulungisa i-mojibake"
  },
  "body": [
   {
    "h2": "Lokhu okwenziwa yileli thuluzi",
    "ps": [
     "Amabhayithi afanayo afundwa njenge-UTF-8 futhi afundwa njenge-GBK akhiqiza amasethi amabili ahlukene ngokuphelele ezinhlamvu — ifayela alilimazekanga, lafakwa ngesandla ngokufakwa okungalungile. Nakhu okwenziwa yithuluzi lokulungisa:"
    ]
   },
   {
    "h2": "Layisha ifayela, ungali namathiseli",
    "ps": [
     "Amaphuzu amabili okungena angalungisa amanani ahlukene womonakalo, ngakho **layisha ifayela uma ukwazi**. Ngefafile, amabhayithi okuqala asasekhona: ithuluzi lizama ukufakwa okukodwa emva kwesinye, futhi uma selazi i-GBK liyayifaka njenge-GBK — akukho okumele kuqagelwe. Umbhalo ofika ngokunamathiselwa awusewona amabhayithi aluhlaza. Ngesikhathi isiphequluli sinikeza intambo, iphutha selivele lenzekile, ngakho ithuluzi lingasebenza kuphela emuva bese lithatha lokho elingakuthola.",
     "Uma umbhalo onanyathiselwe usuqukethe uhlamvu lwezinguquko (lowo mbuzo ongebhokisi ``), amabhayithi okuqala ashabalele kude futhi akukho okungawabuza. Ikhasi lisho kanjalo ngokuqondile: buyela phezulu bese usebenzisa u-\"Khetha ifayela\" ukulayisha elo kuqala."
    ],
    "img": {
     "file": "repair-up",
     "alt": "Indawo yokulayisha ikhasi lokulungisa: indawo yokulahla kanye nebhokisi lokunamathisela, nokufakwa okutholwe okuboniswe phezulu",
     "cap": "Hudula ifayela lingene noma ubheke lona; ibhokisi lokunamathisela lihlezi ngezansi futhi lingalungisa kancane kakhulu"
    }
   },
   {
    "h2": "Ukuxilonga kukutshela ukuthini",
    "ps": [
     "Uma usulayisile, ikhadi lokuxilonga linikeza isinqumo. **Ayikho i-mojibake etholiwe**: okuqukethwe kufundeka kahle njengoba kunjalo; uma isidlali sakho sisabona ukungcola, isidlali sisebenzise ukufakwa okungalungile — yehlela phansi kokuthi \"Londoloza njenge\", khetha okunye bese uyinika lelo fayela. Lapho **kubukeka njenge-mojibake**, ikhadi libala ukuthi yiluphi umkhondo olitholile:"
    ],
    "img": {
     "file": "repair-diag",
     "alt": "Ikhadi lokuxilonga: isinqumo kanye nomkhondo ngamunye we-mojibake obhalwe umugqa ngomugqa",
     "cap": "Ukuxilonga kubala imikhondo ngohlobo esikhundleni sokuthi \"kuyi-mojibake\""
    }
   },
   {
    "h2": "Izikhundla zikhethwa kanjani, nokuthi ungakhetha kanjani",
    "ps": [
     "Ngaphansi kokuthi \"Izindlela zokulungisa lokhu\", abazongenela babhalwe ngohlobo **olufana kakhulu nolimi lwangempela kuqala**, kufika kwangu-12 kubo, ngasinye sinophawu lwamapheya okufakwa okufundwe kuwo nokuya kuwo. Chofoza okukodwa ukuze ubone ukuthi kubukeka kanjani, ukhethe, bese uskrolela phansi ukuze ulondoloze. Awujabulile? Sebenzisa u-\"Gcina njengoba kunjalo\" ukuze ubuyele kokokuqala.",
     "I-oda livela kumaphuzu: isabelo sezinhlamvu ezivamile, izintambo zamaphimbo, izintambo zezimpawu, izindonga zezinhlamvu ezingaziwa, konke okunesisindo. **Uma kungekho maphuzu angcono ngokucacile, akukho okunconyiwe** — ngeke likucindezelele umuntu oyingxenye enengqondo kuwe ukuze nje ube nayo. Umbhalo owonakele kabili (olondolozwe kabi kanye, bese ulungiswa kabi kanye) uthola umjikelezo owodwa owengeziwe wokuxazulula emuva kwabazongenela abaphezulu, ngakho noma yini engaphansi kwezingqimba ezimbili isakwazi ukuhlengwa."
    ],
    "img": {
     "file": "repair-fix",
     "alt": "Uhlu lwabazongenela ukulungisa oluhlelwe ngokuthi lufundeka kangakanani njengolimi lwangempela, ngasinye sinophawu lwamapheya alo okufaka",
     "cap": "Abazongenela abahlelwe ngokuthi \"kufana kakhulu nolimi lwangempela\", ngasinye sibonisa ukufakwa okuhilelekile"
    }
   },
   {
    "h2": "Ukulondoloza kahle kuyisinyathelo sokugcina",
    "ps": [
     "Umphumela otholakele usadinga ukulondolozwa kahle. Uma isidlali singakwazi ukuthola i-UTF-8, ukulondolozwa njenge **UTF-8 nge-BOM** (abadlali be-Windows bathembela ku-BOM) noma njenge **GBK** kuvame ukuyixazulula. Ungalondoloza njenge-UTF-8, UTF-8 (ne-BOM), GBK, Big5, Shift_JIS noma EUC-KR; kukhona okungalingani, utshelwa ukuthi ukhethe okunye (i-GBK ayikwazi ukubamba isiKorea). Amafayela alandiwe athola u-`-fixed` owengeziwe egameni.",
     "Lapho ukufakwa okutholwe kungesiyo i-UTF-8, u-\"Londoloza njenge\" selehlisiwe kakade ku-UTF-8 nge-BOM kuwe. Uma uthinta amaconsi wena uqobo, uyeka ukuqagela okwesibili."
    ],
    "img": {
     "file": "repair-out",
     "alt": "Indawo yomphumela: ibhokisi lombhalo elinamaconsi okugcina njenge nenkinobho yokulanda",
     "cap": "Khetha ukufakwa, bese ulanda — igama lefayela lithola i-fixed engeziwe"
    }
   },
   {
    "h2": "Okungathintwa neze",
    "ps": [
     "Izinhlamvu ezifundwe kabi kuphela ezifakwa esikhundleni sazo. Izinombolo zekheli, izikhathi kanye nemigqa yesitayela se-ASS akushintshwa nganoma yiphi indlela."
    ]
   },
   {
    "h2": "Imibuzo Ebuzwa Njalo",
    "ps": [
     "** Ngilayisile ifayela, pho kungani ngisadinga ukulondolozwa futhi?** Ifayela uqobo lwayo livame ukuba lihle; okonakele yisidlali esifunda ngokufakwa okungalungile. Kulokho akukho hlamvu embhalweni oludinga ukushintshwa — vele ulondoloze ikhophi njenge-UTF-8 nge-BOM noma i-GBK bese unikeza isidlali lokho.",
     "**Kungani umbhalo onanyathiselwe ungakwazi ukulungiswa?** Uma uhlamvu lokungena lolu luvela kokuqukethwe okunanyathiselwe, amabhayithi okuqala ashabalele futhi akukho okumele kucatshangwe ngemuva. Buyela phezulu bese usebenzisa u-\"Khetha ifayela\" ukulayisha elo kuqala.",
     "**Umuntu engifuna ukuba yimboniso akabhalwanga?** Akukho okunconyiwe ngaphandle uma kuthola amaphuzu angcono ngokucacile kunalokho osuvele unakho. Zama ukushintsha ukufakwa okutholwe uye kwesinye bese uvumela ukuthi kuphinde kuhlelwe.",
     "**Mangaki amafayela ngesikhathi esisodwa?** Elilodwa ngesikhathi. Landa ukulungiswa, bese udla kufayela elilandelayo."
    ]
   },
   {
    "h2": "Ukugcinwa kuyimfihlo",
    "ps": [
     "Ukutholwa nokulungiswa kuqhuba ngokuphelele esipheqululini sakho. Alukho okuqukethwe kombhalo engezansi okuthunyelwa kuseva."
    ]
   },
   {
    "h2": "Amathuluzi ahlobene nemihlahlandlela",
    "ps": [
     "Lapho i-mojibake iphuma khona nokuthi kungani igcina ibukeka kanje — bheka [[Lapho imibhalo engezansi ye-mojibake iphuma khona|/guides/subtitle-garbled-characters.html]]; ukufakwa kulungile kodwa okuqukethwe kungcolile — sebenzisa [[Ukuhlanzwa kwemibhalo engezansi|/clean.html]]; ukuhlola isikhathi nesivinini sokufunda — [[I-QC Yembhalo Engezansi|/qc.html]]."
    ]
   }
  ]
 },
 "sbv-to-srt": {
  "seo": {
   "title": "Isiguquli se-SBV kuya ku-SRT – Guqula Imibhalo Engezansi ye-YouTube – AI-SRTSub",
   "desc": "Guqula imibhalo engezansi ye-SBV elandiwe ku-YouTube ibe yi-SRT ye-CapCut, i-Premiere, nabadlali. Amanani wesikhathi ahlala engathintwanga — ukwakheka kuphela okushintshayo. Kuyasebenza esipheqululini sakho.",
   "h1": "I-SBV kuya ku-SRT",
   "intro": "Guqula imibhalo engezansi ye-YouTube ye-SBV ibe yi-SRT: faka ifayela, khetha i-SRT, landa. Amanani wesikhathi awathintwanga — isakhiwo kuphela esishintshayo.",
   "ctaText": "Guqula i-SBV → i-SRT"
  },
  "body": [
   {
    "h2": "Kuyini i-SBV nokuthi iphuma kuphi",
    "ps": [
     "I-SBV **ifomethi yemibhalo engezansi ye-YouTube**: ukulanda \"amafayela emibhalo engezansi\" ku-YouTube kuvamise ukukunikeza i-.sbv. Isakhiwo sayo silula kune-SRT — izikhathi zokuqala nezokuphela zihlala **emugqaleni owodwa** ohlukaniswe ngo-kholoni, umbhalo ulandela ngqo ngaphansi, futhi azikho izinombolo zekhuwu."
    ]
   },
   {
    "h2": "Kungani abadlali beyenqaba",
    "ps": [
     "Ngaphandle kwe-YouTube uqobo, iningi lesofthiwe yokuhlela nabadlali abayisekeli i-SBV. Ayinaso isakhiwo senombolo futhi ibhala umugqa wayo wesikhathi ngendlela ehlukile kune-SRT, ngakho ukuqamba kabusha isandiso akwenzi lutho — isakhiwo kufanele sakhiwe kabusha ngempela."
    ],
    "img": {
     "file": "convert-upload-sbv",
     "alt": "Indawo yokulayisha: ifayela le-SBV elayishiwe, elitholakele njenge-SBV",
     "cap": "I-SBV itholwa njengoba injalo, akukho slandiso sokuqamba kabusha esidingekayo"
    }
   },
   {
    "h2": "Ungayiguqula kanjani",
    "ps": [
     "Vula [[isiguquli|/convert.html]], faka i-SBV, khetha **SRT - SubRip** njengokuphumayo, bese uguqula bese ulanda. Izinombolo zekhuwu zabelwa kabusha, futhi ukweqa komugqa wangempela ngaphakathi kwekhuwu kuhlanganiswa kube umugqa owodwa (i-SRT ivumela amakhuwu anemigqa eminingi; i-SBV ithunyelwa ngaphandle inemigqa emodwa lapha)."
    ]
   }
  ]
 },
 "shift": {
  "seo": {
   "title": "Indlela Yokushintsha Isikhathi Sama-subtitle (Isinxephezelo, Isikali, Izinsika Ezimbili) – AI-SRTSub",
   "desc": "Umhlahlandlela onezithombe womhleli wesikhathi: layisha ama-subtitle, engeza izinyathelo zokulungisa, ukulungisa ngezinsika ezimbili, ukulungisa ikowe ngayinye nokukhipha.",
   "h1": "Umhleli Wesikhathi: Umhlahlandlela Wesinyathelo Ngesinyathelo",
   "intro": "Lo mhlahlandlela uhamba ngezinyathelo zethuluzi kusukela phezulu kuze kube phansi: layisha ama-subtitle, engeza izinyathelo zokulungisa, yenza ukuhlola, lungisa kahle ikowe ngayinye, bese ukhipha.",
   "ctaText": "Vula umhleli wesikhathi"
  },
  "body": [
   {
    "h2": "Layisha ama-subtitle akho",
    "ps": [
     "Hudula ifayela libe sebhokisini elinamachashaza noma uchofoze ukuze ukhethe elodwa; ungaphinde **unamathisele okuqukethwe** ngqo ebhokisini lombhalo. Ifomethi itholakala kuzo zombili izandiso nokuqukethwe, futhi umphumela ubonakala ku-chip yefomethi. Okufakiwe okusekelwayo: srt, vtt, ass (kuhlanganisa ne-ssa), sbv, lrc kanye ne-txt."
    ],
    "img": {
     "file": "shift-upload",
     "alt": "Indawo yokulayisha: i-subtitle yesampula elayishiwe, etholakale njenge-SRT",
     "cap": "Igama lefomethi kanye nefomethi etholakele kuvela ngaphansi kwendawo yokuwisa; ibhokisi lombhalo lihlala lilungiseka."
    }
   },
   {
    "h2": "Engeza izinyathelo zokulungisa",
    "ps": [
     "Ukulungiswa kwakha **umugqa wezinyathelo**: isinyathelo ngasinye senza umsebenzi owodwa futhi sithatha inombolo eyodwa, kuyilapho iyunithi yaso iboniswe ngaphakathi kwebhokisi. Izinyathelo zisebenza ukusuka phezulu kuye phansi, futhi ukushintsha noma yisiphi isinyathelo **kuphinda kubale konke kusuka kuma-subtitle wokuqala** — ngakho ungabuyela emuva futhi ulungise inombolo nganoma yisiphi isikhathi ngaphandle kwempi."
    ]
   },
   {
    "h2": "Ukulungisa ngezinsika ezimbili",
    "ps": [
     "Uma ungazi isinxephezelo ngemizuzwana noma isilinganiso, sebenzisa izinsika ezimbili: uma sezifakiwe, **amasimu amabili \"amanje\" agcwaliswa ngokuzenzakalelayo** kusuka kukowe wokuqala nowokugcina wefayela lakho. Ugcwalisa kuphela amasimu \"okuhlosiwe\" — izikhathi okufanele lawo ma-kowe avela ngempela ngazo. Konke okuphakathi nendawo kuphinde kusakazwe ngokulinganisa."
    ],
    "img": {
     "file": "shift-step-two",
     "alt": "Ukulungisa ngezinsika ezimbili: izikhathi zamanje zigcwaliswe ngokuzenzakalelayo, izikhathi zokuhlosiwe okufanele zifakwe",
     "cap": "Amasimu amanje avela efayeleni lakho; amasimu okuhlosiwe yizikhathi ezifanele ozibona kuvidiyo."
    }
   },
   {
    "h2": "Ukuhlola umugqa wesikhathi kanye nokulungiswa kwe-kowe ngayinye",
    "ps": [
     "Ngemuva kokusebenzisa izinyathelo, funda **ukuhlola komugqa wesikhathi**: ama-kowe amafushane kakhulu, amade kakhulu, aminyene kakhulu ukuthi angafundeka, imigqa ebanzi kakhulu, noma ama-kowe agqagqanayekayo konke kuyahlolwa. Ukuhlola **kuqondisa izinkinga kuphela futhi akusoze kwaguqula lutho** ngokwaso. Imithetho emine ezenzakalelayo ingubude besikhathi obuncane obungama-0.833 s, ubuningi obungama-7 s, isivinini sokufunda sezinhlamvu eziyi-9 ngemizuzwana kanye nezinhlamvu eziyi-21 zomugqa ngamunye — konke kuyalungiseka ekhasini. Ngaphansi kwalokho, ukulungiswa kwe-kowe ngalinye kukuvumela ukuthi uhlanganise ama-kowe amabili angomakhelwane, uhlukanise owodwa, noma uhlele ukuqala kwawo nokuphela kwawo ngqo; konke ukuhlelwa kungahoxiswa."
    ]
   },
   {
    "h2": "Khipha umphumela",
    "ps": [
     "Iphaneli yomphumela ibonisa izikhathi zokuqala nezilungisiwe **eceleni** ukuze kuqashwe kalula. Ifomethi yokuphumayo ibuyela ngokuzenzakalelayo kufomethi yokufaka, kodwa ungashintshela kunoma iyiphi i-srt, vtt, ass, sbv, lrc noma i-txt ngaphambi kokulanda."
    ],
    "img": {
     "file": "shift-result",
     "alt": "Iphaneli yomphumela: ngaphambi nangemuva kwezikhathi eziseceleni, ngezinkinobho zokulanda nokukopisha",
     "cap": "Izikhathi zokuqala kwesobunxele, ezilungisiwe kwesokudla; landa uma isihlolwa sokuhlola sibukeka silungile."
    }
   }
  ]
 },
 "shift-subtitle-timing": {
  "seo": {
   "title": "Indlela Yokushintsha Wonke Ama-subtitle Ngaphambili Noma Ngemuva – AI-SRTSub",
   "desc": "Yonke i-kowe isemuva ngenani elifanayo: sebenzisa isinyathelo sokushintsha somhleli wesikhathi — faka inombolo eyodwa engeyinhle noma enesihle futhi wonke ama-kowe ahamba ndawonye.",
   "h1": "Hambisa Wonke Ifayela Le-subtitle Ngaphambili Noma Ngemuva",
   "intro": "Umsindo uyaqala, i-subtitle ivele sekwephuzile — futhi yonke i-kowe eyodwa isemuva ngenani elifanayo. Lokho kuwukulingana okufanayo: inombolo eyodwa iyayilungisa.",
   "ctaText": "Vula umhleli wesikhathi"
  },
  "body": [
   {
    "h2": "Okokuqala qinisekisa ukuthi yonke i-kowe isemuva ngenani elifanayo",
    "ps": [
     "Hlola i-kowe eyodwa eduze kokuqala, eyodwa phakathi nendawo kanye neyodwa ekugcineni. Uma zombili zisemuva cishe ngenani elifanayo, kuwukulingana okufanayo **uniform offset**, futhi isinyathelo esisodwa sokushintsha siyayilungisa. Uma ukuqala kulungile futhi ukukhukula kukhula kubheke ekugcineni, lena yinkinga ehlukile — bheka [[ama-subtitle aphuma kakhulu ekusebenzeni ndawonye|/guides/subtitles-out-of-sync.html]]."
    ]
   },
   {
    "h2": "Okufanele ukufake: okungeyinhle ukuthuthukisa, okuhle ukubambezela",
    "ps": [
     "Emhleli wesikhathi, engeza isinyathelo **Shintsha konke** bese ufaka isinxephezelo ebhokisini lenani: ama-subtitle asebenza sekwephuzile athatha inombolo engeyinhle ukuze awaphushele phambili; asebenza kusenesikhathi athatha inombolo enesihle ukuze awaphushele emva. Uma ama-subtitle esemuva ngemizuzwana ewu-1.5, faka **-1.5** — iyunithi ngemizuzwana."
    ],
    "img": {
     "file": "shift-step-shift",
     "alt": "Shintsha sonke isinyathelo ngo--1.5 imizuzwana efakiwe",
     "cap": "Inombolo engeyinhle idonsela lonke ifayela phambili; iyunithi ibhalwe ngaphakathi kwebhokisi, ngemizuzwana."
    }
   },
   {
    "h2": "Kuyise futhi uhlole i-kowe yokuqala",
    "ps": [
     "Ngemuva kokusebenzisa, iphaneli yomphumela ibhala izikhathi zokuqala nezintsha zekowe ngalinye **eceleni**. Hlola i-kowe yokuqala kuqala: ingabe isikhathi sokuqala esisha siwela kuhlaka lapho umugqa ukhulunywa khona? Bese uhlola okukodwa phakathi nendawo. Yonke i-kowe ihamba ngenani elifanayo futhi igcina ubude bayo besikhathi."
    ]
   },
   {
    "h2": "Khipha",
    "ps": [
     "Uma isihlolwa sokuhlola sibukeka silungile, landa ngqo. Ifomethi yokuphumayo ibuyela ngokuzenzakalelayo kufomethi yokufaka futhi ingashintshelwa kokunye. Ushintsho luthinta izikhathi kuphela — hhayi uhlamvu olulodwa lombhalo."
    ]
   }
  ]
 },
 "simplified-traditional-chinese": {
  "seo": {
   "title": "Akusiyo Ukushintshaniswa Kwezinhlamvu – Okunye-kuya-Kuningi Namagama Esifunda – AI-SRTSub",
   "desc": "Izinto ezintathu zenza lokhu kube nzima: ukuhlelwa okunye-kuya-kuningi okuxazululwe ngegama, ulwazi oluhlukile lwaseTaiwan naseHong Kong, kanye nokuguqula ingxoxo kuphela. Thola zombili zilungile futhi akukho msebenzi womuntu olandelayo.",
   "h1": "Okwenziwe lula vs okwesintu akusiyo ukushintshaniswa kwezinhlamvu",
   "intro": "Ukuthi iyiphi inhlamvu yesintu esikhundleni sayo esenziwe lula kuncike enhlamvwini eseduze nayo. Yileso sizathu esenza lokhu kuguqula kungakwazi ukwenziwa ngokushintshana ngaphandle kokucabanga uhlamvu olulodwa ngesikhathi.",
   "ctaText": "Vula isiguquli"
  },
  "body": [
   {
    "h2": "Okokuqala: ifomu elilodwa elenziwe lula, amaningi esintu",
    "ps": [
     "Ukwenza lula kwaphula izinhlamvu eziningi zesintu zaba ifomu elilodwa elenziwe lula. Ukubuyela ngenye indlela, uhlamvu olulodwa olulula luhambelana neziningi zesintu, futhi ukukhetha phakathi kwazo kuncike kulokho okumataniswa nakho:",
     "Ukushintshanisa uhlamvu ngohlamvu kuzibhidliza zonke zibe yinto eyodwa futhi kuthola zonke izikhathi zingalungile. Ukuxazulula **ngegama** yikho okuzahlukanisayo — amatafula avela ku-OpenCC, afanisa imishwana ngaphambi kwezinhlamvu ezodwa. Isibonelo:"
    ]
   },
   {
    "h2": "Okwesibili: I-Taiwan ne-Hong Kong akuyona into eyodwa",
    "ps": [
     "Kunenye ungqimba ngemuva kokuguqulela kwesintu: igama elifanayo libhalwe ngokuhlukile e-Taiwan nase-Hong Kong. Igama elithi \"software\" liyinto eyodwa e-Taiwan nenye e-Hong Kong, futhi i-Taiwan isebenzisa igama layo elithi \"information\".",
     "Ngakho izikhombisi ezihlukene. Isintu saseTaiwan siphinde sihlukanise sibe \"ukushintsha amagama\" kanye \"nemidwebo kuphela\" — imidwebo kuphela igcina ulwazi lwakho lwamagama akhona, kuyilapho ukushintsha amagama kushintsha amagama esifunda nawo. I-Hong Kong ithola indlela yayo eyodwa."
    ],
    "img": {
     "file": "hanconv-dir",
     "alt": "Guqulela ekhadini: imenyu eyehlelayo yendawo eya kuyo ebonisa \"Okwenziwe lula → Okwesintu sase-Taiwan (ukushintsha amagama)\"",
     "cap": "I-Taiwan inikeza izinguquko zamagama noma imidwebo kuphela; i-Hong Kong inendlela yayo"
    }
   },
   {
    "h2": "Okwesithathu: ingxoxo kuphela okumele ithintwe",
    "ps": [
     "Ifayela le-subtitle akusiyo ingxoxo kuphela. Izinombolo zenkomba, izikhathi kanye nemigqa yesitayela se-ASS ikhonapho, futhi ayisodwa inhlamvu yalokho okumele iguqulwe — imigqa yesitayela se-ASS ikakhulukazi, njengoba iqukethe amagama omkhombandlela wesiNgisi aphuka ngesikhathi aphathwa njengengxoxo.",
     "Ngakho ukuguqulwa kwenzeka ngemuva kokuhlaziya ngefomethi: i-SRT, VTT, ASS ne-TXT ngayinye ihlonza ukuthi yiyiphi ingxenye eyinxoxo, futhi yizinhlamvu kuphela ezingaphakathi kuyo eziguqulwayo. Izikhathi nezitayela ziyasinda zingathintanga, ngaphandle kokuhlelwa kabusha kokufomethwa."
    ],
    "img": {
     "file": "hanconv-out",
     "alt": "Indawo yomphumela: i-subtitle eguqulwe kanye nebha yezibalo ebonisa ukubalwa kwemigqa eshintshiwe",
     "cap": "Ibha yezibalo ibonisa ukuthi mingaki imigqa eshintshile; ukufomethwa kulondolozwe njengoba kunjalo"
    }
   },
   {
    "h2": "Ukubuyela kokwenziwe lula: qaphela",
    "ps": [
     "Ukuguqula isintu sibe esenziwe lula kudinga futhi ukuthi usho **ukuthi yiluphi uhlobo lwesintu osuka kulo**: okujwayelekile, okwase-Taiwan kanye nase-Hong Kong izindlela ezintathu ezihlukene, ngoba ulwazi lwamagama esifunda kufanele lubuyiselwe egameni elijwayelekile ngaphambi kokuba liguqulwe. Khetha indlela engeyiyo futhi ulwazi lwamagama esifunda lusinda lungene okukhipha okwenziwe lula.",
     "Iqembu elingaphansi lezikhombisi eziyisishiyagalolunye yilona eliguqulela emuva: isintu → okwenziwe lula, isi-Taiwan → okwenziwe lula, isi-Hong Kong → okwenziwe lula."
    ]
   },
   {
    "h2": "Amathuluzi ahlobene nemihlahlandlela",
    "ps": [
     "Umhlahlandlela ogcwele — [[Indlela yokuguqula ama-subtitle enziwe lula nawesintu|/guides/hanconv.html]]; uma konke okudingayo kuyinto eyenziwe lula ibe yisintu — [[Guqulela ama-subtitle enziwe lula abe yisintu|/guides/srt-simplified-to-traditional.html]]; ukuguqulela kolunye ulimi, [[Ukuhunyushwa kwama-subtitle|/translate.html]]."
    ]
   }
  ]
 },
 "split": {
  "seo": {
   "title": "Ukuhlukanisa Nokuhlanganisa Ama-subtitle – Sika ngezuphu, xhuma ngokulandelana – AI-SRTSub",
   "desc": "Sika ifayela elilodwa libe izingxenye ngobude besikhathi noma ngenani lekowe, qala kabusha ngayinye ku-zero, noma xhuma amafayela amaningi ngokulandelana noma uwahlanganise ngomugqa wesikhathi. Izinombolo zekowe zibuyiselwe izinombolo, umbhalo awuthintwanga.",
   "h1": "Indlela yokuhlukanisa nokuhlanganisa ama-subtitle",
   "intro": "Sika ifayela le-subtitle elide libe izingxenye, noma hlanganisa amafayela amaningi ahlakazekile abe lilodwa. Ukusikwa kuhlala kuwa emkhakheni wokungena — umusho awusoze wanqunywa phakathi nendawo.",
   "ctaText": "Vula ukuhlukanisa nokuhlanganisa"
  },
  "body": [
   {
    "h2": "Lokho okwenziwa yileli thuluzi",
    "ps": [
     "Ukuhlukanisa iziqephu, ukuhlukanisa izingxenye kanye nokuhlanganisa imithombo konke kungena ekungafaneni okufanayo phakathi kwamabhulokhi ama-subtitle namabhulokhi evidiyo: noma ifayela lilodwa liyadingeka ukuba lisikwe noma amaningi adinga ukuhlanganiswa. Leli khasi liphethe kokubili, ithebhu eyodwa ngayinye."
    ]
   },
   {
    "h2": "Okokuqala khetha ukusika noma ukuhlanganisa",
    "ps": [
     "Amathebhu amabili phezulu: **Sika: ifayela elilodwa libe izingxenye** kanye **Hlanganisa: amafayela amaningi abe yilodwa**. Izinketho zesinyathelo sesibili ezingezansi zishintsha ngokukhetha kwakho.",
     "Ku-\"1 Engeza ama-subtitle\" ulayisha ifayela noma unamathisele umbhalo; uma ukhethe okungalungile, chofoza u-\"Sula\". Leli khasi lifunda i-UTF-8 kuphela — uma ukubhala kuphukile (udonga lwezimpawu zemibuzo noma amabhokisi) iya ku-[[Ukulungiswa kombhalo owonakele|/repair.html]] kuqala."
    ],
    "img": {
     "file": "split-mode",
     "alt": "Amathebhu amabili phezulu kwekhasi lokuhlukanisa nokuhlanganisa",
     "cap": "Ukusika nokuhlanganisa kungamathebhu amabili; izinketho zesinyathelo sesibili zilandela ukukhetha kwakho"
    }
   },
   {
    "h2": "Indlela yokusika",
    "ps": [
     "Phansi kwa-\"2 Indlela yokusika\" khetha isisekelo: **isikhathi** (ingxenye eyodwa njalo ngemizuzu engu-X) noma **inombolo yekowe** (ingxenye eyodwa njalo ngama-kowe angu-X), bese ufaka inombolo.",
     "Maka u-\"Qala kabusha ingxenye ngayinye ku-0:00\" futhi ingxenye ngayinye ebangelwayo ibalwa kusuka ku-zero — sebenzisa lokhu uma ulayisha iziqephu futhi unikeza ingxenye ngayinye kumdlali ngokwakhe. Yiyeke ingamakiwe ukuze ugcine izitempu zesikhathi zangempela, ukuze ingxenye ngayinye isahambisana nesikhundla sayo kuvidiyo yomthombo.",
     "Ukusikwa kuwa kuphela emikhakheni yekowe: uma i-subtitle ende kakhulu iwele iphuzu lokusika, yonke ikowe ihlala engxenyeni yangaphambili."
    ],
    "img": {
     "file": "split-cut",
     "alt": "Izinketho zesikhathi nenani lekowe ezinenkinobho yokuqala kabusha ku-zero ekhasini lokuhlukanisa",
     "cap": "Sika ngesikhathi noma ngenani lekowe, futhi ngokuzithandela qala kabusha ingxenye ngayinye ku-0:00"
    }
   },
   {
    "h2": "Indlela yokuhlanganisa",
    "ps": [
     "Phansi kwa-\"2 Indlela yokuhlanganisa\" khetha indlela: **Xhuma ngokulandelana** ishukumisa ifayela elandelayo ukuze liqale ngemva kokuba elangaphambilini liphelile, ngaphandle kokugqagqana phakathi kwezingxenye; **Hlanganisa ngomugqa wesikhathi** igcina izitempu zesikhathi zangempela zefayela ngalinye futhi ihlela ngesikhathi sokuqala.",
     "Sebenzisa ukuxhuma ngokulandelana wakati amafayela iyingxenye yokuqala neyesibili yesiqephu esisodwa, noma wakati iz halves ezihloliwe ngokuhlukile kufanele zibuyiselwe ndawonye; sebenzisa ukuhlanganisa ngomugqa wesikhathi wakati amafayela angowe esibukweni ndawonye, njengomkhondo wokuqala nomkhondo ohunyushiwe.",
     "Emva kokuhlanganisa izinombolo zekowe zibuyiselwa izinombolo ngokuzenzakalelayo futhi akulona negama lengxoxo elishintshelwayo."
    ],
    "img": {
     "file": "split-join",
     "alt": "Izinketho zokuxhuma ngokulandelana nokuhlanganisa ngomugqa wesikhathi ekhasini lokuhlanganisa",
     "cap": "Ukuxhuma ngokulandelana kulungele izingxenye ezimbili zesiqephu esisodwa; ukuhlanganisa ngomugqa wesikhathi kulungele umkhondo wokuqala nowohunyushiwe"
    }
   },
   {
    "h2": "Ukuthatha umphumela",
    "ps": [
     "\"3 Umphumela\" kwesokudla kukhipha **SRT** kanye **VTT**; chofoza u-\"Landa\" noma u-\"Kopisha\".",
     "Lapho uhlukanisa ungasebenzisa u-\"Landa ingxenye ngayinye\", olondoloza ingxenye ngayinye esikiwe ngesikhathi esisodwa esikhundleni sokuchofoza kanye ngengxenye ngayinye."
    ],
    "img": {
     "file": "split-out",
     "alt": "Ukukhetha kwefomethi ye-SRT/VTT ngezinkinobho zokulanda nokulanda ingxenye ngayinye endaweni yomphumela",
     "cap": "Imiphumela yokuhlukanisa ingalandwa ingxenye ngengxenye; ifayela elihlanganisiwe lilandwa noma likopishwa ngqo"
    }
   },
   {
    "h2": "Okushiywe kungathintwanga",
    "ps": [
     "Akulona uhlamvu lengxoxo olushintshayo. Leli khasi liguqula kuphela ukuthi yimaphi ama-kowe angowe yiphi ingxenye nokuthi anikezwa kanjani izinombolo; okuqukethwe kokufakiwe kuhlala njengoba kunjalo.",
     "Nge-\"Xhuma ngokulandelana\" izitempu zesikhathi zamafayela alandelayo zishukunyiswa njengento eyodwa — yilokho okudingwa ukuhlanganisa; nge-\"Hlanganisa ngomugqa wesikhathi\" yonke isitempu sesikhathi sangempela siyagcinwa."
    ]
   },
   {
    "h2": "Imibuzo ejwayelekile",
    "ps": [
     "**Kuthiwani uma ingxenye yokugcina iphetha imfushane kakhulu?** Lokho kujwayelekile. Okusele okungagcwalisi ingxenye yonke kuba yingxenye yaso esikhundleni sokufakwa uboya.",
     "**Ingabe umusho owelela iphuzu lokusika uzohlukaniswa?** Cha. Ukusikwa kuwa emikhakheni yokungena kuphela, futhi ikowe ewelela umugqa ihlala engxenyeni yangaphambili.",
     "**Ngemva kokuhlanganisa, ama-kowe amabili anezikhathi ezifanayo ahlelwa kanjani?** Ngesikhathi sokuqala; lapho izikhathi zokuqala zilingana, ukulandelana owafaka ngakho amafayela kuyagcinwa.",
     "**Ingabe i-ASS ingahlukaniswa?** Leli khasi liphethe i-SRT ne-VTT. Guqulela i-ASS ibe yi-SRT noma i-VTT nge-[[Ukuguqulwa kwefomethi|/convert.html]] kuqala."
    ]
   },
   {
    "h2": "Ukuyimfihlo",
    "ps": [
     "Ama-subtitle aphathwa ngokuphelele esiphequlwini: akukho okulayishwayo futhi akukho okudlula kwisingenisi seseva. Vala the khasi futhi okuqukethwe kuhambile."
    ]
   },
   {
    "h2": "Amathuluzi ahlobene nemihlahlandlela",
    "ps": [
     "Ukuhlanganisa amafayela amabili abe ngumkhondo wezilimi ezimbili (esikhundleni sokuba wusiqephu esisodwa) sebenzisa [[Ukuhlanganisa kwezilimi ezimbili nemiphumela ekhethekile|/guides/merge.html]]; uma umugqa wesikhathi wonke uphumile iya ku-[[Ukulungiswa komugqa wesikhathi|/shift.html]]; ngesizini yonke sebenzisa [[Ukuguqula ngamaqoqo|/batch.html]]; futhi uqale [[I-QC yama-subtitle|/qc.html]] uma uqede."
    ]
   }
  ]
 },
 "split-bilingual-subtitles": {
  "seo": {
   "title": "Hlukanisa Ama-subtitle Ezilimi Ezimbili abe Imikhondo Emibili – AI-SRTSub",
   "desc": "Hlukanisa ama-subtitle ezilimi ezimbili abe amafayela amabili: umkhondo wokuqala nowokuhumusha ulanda ngokwehlukana ngamagama ahlukile; zombili izindlela ziyaziwa. – AI-SRTSub",
   "h1": "Hlukanisa Ama-subtitle Ezilimi Ezimbili abe Imikhondo Emibili",
   "intro": "I-subtitle yezilimi ezimbili iba amafayela amabili — “eyokuqala” kanye “negeyokuhumusha”: layisha, khetha ukwahlukanisa kabuibili, landa ngasinye, nemigqa yesikhathi igcinwe ingaphazamisekile.",
   "ctaText": "Hlukanisa ama-subtitle ezilimi ezimbili"
  },
  "body": [
   {
    "h2": "Uma udinga ukwahlukanisa",
    "ps": [
     "Umdlali wakho ufuna kuphela umkhondo wolimi olulodwa; noma ufuna umkhondo wokuhumusha ukuze uphinde uhumushe, noma umkhondo wokuqala ukuze uhambisane nenye inguqulo eholishiwe. I-subtitle yezilimi ezimbili noma **ikowe eyodwa enemigqa emibili** (eyokuqala kumugqa owodwa, ukuhumusha komunye) noma **amakowe amabili ahlukene abelana ngomugqa wesikhathi ofanayo** — kokubili kungahlukaniswa."
    ]
   },
   {
    "h2": "Lapho okumele kwenziwe khona",
    "ps": [
     "Vula [[Isihlukanisi Sama-subtitle Ezilimi Ezimbili|/bilingual.html]] bese uphonsa i-subtitle yakho phakathi. Ithuluzi lithola ifomu lezilimi ezimbili ngokuzenzakalelayo: ikowe eyodwa enemigqa emibili ihlukaniswa ngohlelo lokubhala, amakowe amabili kumugqa wesikhathi ofanayo ngokolandelana. Khetha **Hlukanisa kabili** kwimenyu eyehlelayo yemodi bese uchofoxa uQala (noma uvumele iphinde isebenze ngokuzenzakalelayo). Indawo yomphumela ibonisa izingcezu ezimbili: leyo enophawu `.orig` iwumkhondo wokuqala, leyo enophawu `.dst` iwumkhondo wokuhumusha — chofoza u-\"Landa\" ngayinye; le mikhondo emibili abelana ngomugqa wesikhathi ofanayo ncamashi."
    ],
    "img": {
     "file": "bilingual-split",
     "alt": "Umphumela wokwahlukanisa: umkhondo wokuqala nomkhondo wokuhumusha njengezingcezu ezimbili, ngasinye sineqinobho lokulanda",
     "cap": "Hlukanisa kabili: umkhondo wokuqala ka-.orig + umkhondo wokuhumusha ka-.dst, ngayinye ilandwa ngendlela yayo"
    }
   },
   {
    "h2": "Ingibe eyodwa ejwayelekile",
    "ps": [
     "**Ikowe eyodwa enemigqa emibili ngezilimi ezabelana ngohlamvu olufanayo (athi isiNgisi kanye nesiFulentshi) ayikwazi ukwahlukaniswa.** Uma imikhondo ihlukaniswa ngohlelo lokubhala, lezo zibalo njengohlelo olulodwa futhi ziphathwa njengezilimi eziyodwa. Guqulela lokho okuqukethwe kufomu elifanayo lomugqa wesikhathi B kuqala, bese uhlukanisa; ifomu lamakowe amabili libhangqa ngomugqa wesikhathi futhi alinendaba nolimi. Ngokungena nokuphuma kwamafomu womabili, bheka [[Izindlela ezimbili zokwenza ama-subtitle ezilimi ezimbili|/guides/make-bilingual-subtitles.html]]."
    ]
   }
  ]
 },
 "srt-file-format": {
  "seo": {
   "title": "Kuyini Ifayela le-SRT? Ungalivula kanjani futhi ulihlehlele kanjani – AI-SRTSub",
   "desc": "Isakhiwo samafayela wamagama-ncazo e-SRT (SubRip): inombolo, ulayini wesikhathi, umbhalo. Ungalivula kanjani kumhleli wombhalo, kungani umdlali enqaba, nokuthi ungakulungisa kanjani ukubhala okungalungile namaphutha esikhathi.",
   "h1": "Isakhiwo Sefayela le-SRT Siyachazwa",
   "intro": "I-SRT iyifayela lamagama-ncazo elijwayelekile kakhulu: umbhalo ocacile, isakhiwo esilula, samukelwa cishe yonke indawo. Lo mhlahlandlela uchaza isakhiwo sawo, ukuthi ungawuvula kanjani, nokuthi ungazixazulula kanjani izinkinga ezivamile.",
   "ctaText": "Vula isiguquleli samagama-ncazo"
  },
  "body": [
   {
    "h2": "Ukubukeka kwefayela le-SRT",
    "ps": [
     "I-SRT (SubRip) ingumbhalo ocacile — noma yimuphi umhleli wombhalo uyayivula. Isiqeshana ngasinye sinezingxenye ezintathu: **ulayini wenombolo**, **ulayini wesikhathi**, kanye **nombhalo**, ehlukaniswa imigqa engenalutho. Ulayini wesikhathi uthi `00:00:01,000 --> 00:00:03,500` — qaphela **ukhomama** ngaphambi kwamamilisekondi, hhayi ichashazi."
    ],
    "img": {
     "file": "convert-upload",
     "alt": "Indawo yokulayisha: ifayela le-SRT elayishiwe elibonisa izinombolo nesikhathi",
     "cap": "Isiqeshana esijwayelekile se-SRT esinezingxenye ezintathu: inombolo, ulayini wesikhathi, umbhalo"
    }
   },
   {
    "h2": "Ungalivula kanjani",
    "ps": [
     "Ukufunda okuqukethwe: chofoza kwesokudla bese uvula nganoma yimuphi **umhleli wombhalo**. Ukuze ulisebenzise nevidiyo: qamba kabusha ifayela ukuze **lifane negama lefayela levidiyo** (ngaphandle kwesandiso), faka womabili kufolda eyodwa, futhi abadlali abafana ne-VLC, PotPlayer, noma i-mpv bayayilayisha ngokuzenzakalelayo; ungaphinde uyihudulele efasiteleni elidlalayo."
    ]
   },
   {
    "h2": "Ukulungisa ukwenqaba nokubhala okungalungile",
    "ps": [
     "**Izinhlamvu eziphazanyisiwe**: ifayela akusiwo u-UTF-8 — ligcine futhi njengo-UTF-8 kumhleli wakho. **Akunalutho olubonakalayo**: hlola ukuthi ulayini wesikhathi usebenzisa ukhomama (hhayi ichashazi) nokuthi izinombolo zesiqeshana aziphukile (abadlali abaningi bayakubekezelela ukweqa, abanye abakwenzi lokho). **Ifayela li-HTML noma i-JSON** : umthombo wokulanda wawungalungile; thola futhi."
    ]
   },
   {
    "h2": "Lokho i-SRT engakwazi nokungakwazi ukukuqukatha",
    "ps": [
     "I-SRT iphethe umbhalo nesikhathi kuphela: **azenikela ngezitayela** (amafonti, imibala), **azenikela ngokubeka** (lapho esikrinini), **azenikela ngemiphumela**. Lokho kudinga i-ASS — bheka [[SRT to ASS|/guides/srt-to-ass.html]]. Ukuze ubone amafayela wonke eceleni, bheka [[subtitle format comparison|/guides/subtitle-format-comparison.html]]."
    ]
   }
  ]
 },
 "srt-fps-converter": {
  "seo": {
   "title": "Isiguquleli se-SRT FPS – Shintsha Izinga Lohlaka Lwamagama-ncazo – AI-SRTSub",
   "desc": "Ifilimu ingu-24fps, ukusakaza kungu-25fps, kanti amagama-ncazo akhukhuleka kakhulu ngemizuzu yonke: kala isikhathi ngo-0.96 kanye bese lonke ifayela liwa ezingeni elihlosiwe.",
   "h1": "Ukuguqulwa Kwezinga Lohlaka Lwamagama-ncazo: 24fps kuya ku-25fps",
   "intro": "Dlala amagama-ncazo efilimu ka-24fps kumthombo ka-25fps futhi alahlekelwa umzuzwana ongaphezu komzuzu ngamunye — ekupheleni kwamakhredithi asendaweni imizuzuemuva. Ukukala okukodwa kuyakulungisa lokho.",
   "ctaText": "Vula umhleli wesikhathi"
  },
  "body": [
   {
    "h2": "Kungani ukungafani kwezinga lohlaka kubangela ukuthi amagama-ncazo akhukhuleke",
    "ps": [
     "Ukuguqulwa kwezinga lohlaka kufunda kabusha **isikhathi esifanayo ngaphansi kwamawashi amabili ahlukene**. Ifilimu yemizuzu eyi-100 engu-24fps inama-6000 s × 24 = **ama-frame ayi-144,000**; kumthombo ka-25fps lawo ma-frame ayi-144,000 adlala ngemizuzwana eyi-5760 — **imizuzu engu-96**. Yonke ifilimu igijima imizuzu emi-4 kafushane, ngakho isiqeshana ngomzuzu wama-50 sivela cishe sekwephuze ngemizuzu emi-2, futhi amagama-ncazo amakhredithi okuphela awaze abonakale."
    ]
   },
   {
    "h2": "Ifomula nezici ezivamile",
    "ps": [
     "Izinga elihlosiwe ÷ izinga lokuqala = isiphindiseli. **24 kuya ku-25: phindaphinda ngo-0.96** (24÷25); ngenye indlela, 25 kuya ku-24: 1.0417. **25 kuya ku-23.976: phindaphinda ngo-0.959**; ngenye indlela: 1.0427. Kumhleli wesikhathi engeza **Isiteji sokukala ngezinga** bese ufaka isici ebhokisini lenani."
    ],
    "img": {
     "file": "shift-step-rate",
     "alt": "Isiteji sokukala ngezinga esifakwe u-0.96",
     "cap": "U-0.96 ngu-24÷25; inkomba esekhasini ize isho ukuguqulwa kwezinga lohlaka njengokusetshenziswa okuvamile."
    }
   },
   {
    "h2": "Uma ungazi izinga lamabili",
    "ps": [
     "Uma ungakwazi ukuthola izinga lohlaka lomthombo, unqamuli isici — sebenzisa **izisekelo ezimbili** esikhundleni salokho: thatha isikhathi sangempela sokuvela kwesiqeshana sokuqala nesokugcina njengamaphuzu amabili, futhi konke okuphakathi kwayo kwelulwa emuva ngokulinganisela. Bheka [[subtitles getting more and more out of sync|/guides/subtitles-out-of-sync.html]]."
    ]
   },
   {
    "h2": "Okufanele ukuhlole ngemuva kwalokho",
    "ps": [
     "Ukukala kunyakazisa wonke umqalo nokuphela; ubude besiqeshana bululwa yisici esifanayo. Ngemuva kokusebenza, qinisekisa imikhawulo emibili: isiqeshana sokuqala (iphutha lokuqala elincane) nesokugcina (inkulu). Uma imikhawulo yomibili ifana, konke okuphakathi nakho kwenza njalo."
    ]
   }
  ]
 },
 "srt-simplified-to-traditional": {
  "seo": {
   "title": "Guqulela Amagama-ncazo Enziwe Lula Abe Ndabuko – Taiwan noma iHong Kong – AI-SRTSub",
   "desc": "Guqula amagama-ncazo esiShayina esenziwe lula abe ndabuko: khetha iTaiwan (ngamagama esifunda noma ngaphandle kwawo) noma iHong Kong. Ukuxhumana okuningi kuxazululwa yigama. Kuguquka ingxoxo kuphela; izikhathi zihlala zinjalo.",
   "h1": "Guqulela amagama-ncazo enziwe lula abe ndabuko",
   "intro": "Amagama-ncazo esiShayina esenziwe lula ahelelwa izethameli zaseTaiwan noma zaseHong Kong adinga ukuguqulwa kuphela — kodwa lezi zifunda zombili zifuna izinto ezihlukene, futhi ukukhetha indlela engekho ikunikeza amagama abantu basekhaya abangawasebenzisi.",
   "ctaText": "Guqula lawa magama-ncazo"
  },
  "body": [
   {
    "h2": "Isidingo",
    "ps": [
     "Amagama-ncazo akho ayisiShayina esenziwe lula futhi kufanele afinyelele kubabukeli baseTaiwan noma eHong Kong. Ukulungisa izinhlamvu ngazinye akukho eqinisweni — isiqephu esisodwa sineziqephu zamagama-ncazo ezingamakhulu — futhi lezi zifunda zombili azifuni umbhalo ofanayo wendabuko: isilulumagama sihlukile, futhi indlela engekho ikhiqiza amagamagekho angasetshenziswa muntu wasendaweni."
    ]
   },
   {
    "h2": "Ukukwenza kuphi",
    "ps": [
     "Vula [[Simplified–traditional conversion|/hanconv.html]], hudulela amagama-ncazo phakathi, bese ukhetha enye yezindlela zokuguqula eziya kwendabuko ngaphansi kokuthi \"Convert to\": indabuko evamile, yaseTaiwan (shintsha amagama), yaseTaiwan (izinhlamvu kuphela) noma yaseHong Kong. Ukuguqula kwenzeka ngokushesha futhi indawo yemiphumela ibonisa amagama-ncazo aqediwe, alungele ukulandwa.",
     "**Ezethamelini zaseTaiwan**: khetha u-\"Taiwanese (change wording)\" uma isilulumagama sesifunda kufanele sishintshe nakho — \"software\" kanye \"information\" ziba amagama azo aseTaiwan — noma u-\"Taiwanese (glyphs only)\" uma ufuna ukuthi ukuma kwezinhlamvu kushintshe kuyilapho ugcina amagama akho wokuqala. **Ezethamelini zaseHong Kong**: khetha u-\"Hong Kong\", lapho \"software\" ibhalwa ngefomu elihlukile."
    ],
    "img": {
     "file": "hanconv-dir",
     "alt": "Ikhadi lokuguqula liye: imenyu eyehlayo yendawo ebonisa u-\"Simplified → Taiwanese traditional (change wording)\"",
     "cap": "I-Taiwan neHong Kong izindawo ezihlukene ezinamagama ahlukile"
    }
   },
   {
    "h2": "Izicupho ezivamile",
    "ps": [
     "**Ungesabi ukuxhumana okuningi**: uhlamvu olufanayo olwenza lula emagameni athi \"clean\", \"dry\" kanye \"tree trunk\" luxhumana nezinhlamvu ezihlukene zendabuko. Amathebula axazulula lokhu ngepheshana, ngakho konke akuhlanjululwa kube uhlamvu olulodwa.",
     "**Kuguquka ingxoxo kuphela**: izikhathi, izinombolo zamakhasi kanye nemigqa yesitayela se-ASS akuthintwa, ngakho umphumela ulungele ukusetshenziswa.",
     "**Akukho okushintshile? Hlola ngaphambi kokuba wethuke**: uma ibha yesimo ibika imigqa engu-0 eshintshiwe, mhlawumbe ifayela alinezinhlamvu zesiShayina noma ifomethi ayitholwanga kahle — hlola ukuthi \"Detected format\" ihambisana nalokho okulayishile."
    ]
   },
   {
    "h2": "Okuhlobene",
    "ps": [
     "Incazelo ephelele yezindlela zonke eziyisishiyagalolunye — [[How to convert simplified and traditional subtitles|/guides/hanconv.html]]; kungani kungaphezu kokushintshanisa izinhlamvu — [[Simplified vs traditional is not a character swap|/guides/simplified-traditional-chinese.html]]; indabuko ebuyela kokwenziwe lula nayo ikhona ku-[[Simplified–traditional conversion|/hanconv.html]]."
    ]
   }
  ]
 },
 "srt-to-ass": {
  "seo": {
   "title": "Isiguquleli se-SRT kuya ku-ASS – Guqula Amagama-ncazo Ku-inthanethi – AI-SRTSub",
   "desc": "Guqula amagama-ncazo e-SRT abe yi-ASS (Advanced SubStation Alpha) enekhanvasi engu-1920×1080 nesitayela esihlanzekile esizenzakalelayo, esilungele ukulayishwa kunoma yimuphi umdlali. Kuyasebenza kusiphequluli sakho.",
   "h1": "I-SRT kuya ku-ASS",
   "intro": "Guqula amagama-ncazo e-SRT abe yi-ASS: donsela ifayela phakathi, khetha i-ASS, landa. Ikhanvasi engu-1920×1080 nesitayela esihlanzekile esizenzakalelayo zenzelwa wena.",
   "ctaText": "Guqula i-SRT → i-ASS"
  },
  "body": [
   {
    "h2": "Uma udinga i-ASS",
    "ps": [
     "Sebenzisa i-ASS uma amagama-ncazo alayishiwe edinga **ukubekwa kangcono nokulawulwa kwesitayela**: aphatha imiqondo i-SRT engenayo — usayizi wekhanvasi, izitayela zamafonti, ukuqondanisa. I-mpv, i-PotPlayer, i-VLC, kanye nabadlali abaningi bayayisekela ngqo."
    ]
   },
   {
    "h2": "Ukubukeka komphumela",
    "ps": [
     "Ithuluzi wakha kabusha ikhanda elijwayelekile: **ikhanvasi engu-1920×1080**, ukugoqa okuhlakaniphile (i-WrapStyle 0), nesitayela esisodwa esizenzakalelayo — i-Arial 54, umbhalo omhlophe onqenqemeni olumnyama, ogxile ngezansi. Isiqeshana ngasinye sisebenzisa lesi sitayela."
    ],
    "img": {
     "file": "convert-opt-ass",
     "alt": "Imenyu yefomethi yokuphumela eno-ASS - Advanced SubStation okhethiwe",
     "cap": "Khetha i-ASS njengokuphumela bese ulanda ngemuva kokuguqula"
    }
   },
   {
    "h2": "Ingabe izitayela ziyalondolozwa?",
    "ps": [
     "I-SRT ayinqondo yesitayela ekuqaleni. Futhi uma umthombo wakho usuyi-ASS, ukuguqula **kwakha kabusha isitayela esizenzakalelayo futhi akugcini esokuqala** — sebenzisa umhleli wamagama-ncazo ozinikele ekuhlobiseni kabusha i-ASS. Isikhathi nombhalo akuthintwa noma ngabe yikuphi."
    ]
   }
  ]
 },
 "srt-to-excel": {
  "seo": {
   "title": "Guqulela Amagama-ncazo Ku-Excel – Buyekeza Ngomugqa Ngomugqa – AI-SRTSub",
   "desc": "Thumela amagama-ncazo e-SRT ku-Excel: umugqa owodwa ngesiqeshana kuzinsika ezine — inombolo, ukuqala, ukuphela kanye nombhalo. Isikhathi sigcinwa njengombhalo, ukwehliswa kwemigqa kuyalondolozwa, futhi ishidi elihleliwe lingaguqulelwa emagameni-ncazo futhi.",
   "h1": "Guqulela amagama-ncazo ku-Excel",
   "intro": "Ukubuyekeza amakhulu eziqephu kumhleli wombhalo kuyadinisa. Ku-Excel isiqeshana ngasinye siwumugqa, ngakho ukuhlunga, ukuphawula kanye nokuthola-nokushintsha konke kuyatholakala — futhi ukuhlela kubuyela ku-SRT yakho.",
   "ctaText": "Thumela ku-Excel"
  },
  "body": [
   {
    "h2": "Isidingo",
    "ps": [
     "Ukubuyekeza, izinguquko zamagama ngobuningi, noma ukwahlukanisa umsebenzi phakathi kwabantu abaningana — konke lokho kuhamba ngokushesha okukhulu eshidini kune-plain text. I-SRT uqobo lwayo ingumbhalo ocacile, kodwa isakhiwo sayo sesiqephu (inombolo, isikhathi, ingxoxo) ihambisana kahle nezinsika ezine zethebula."
    ]
   },
   {
    "h2": "Ukukwenza kuphi",
    "ps": [
     "Vula [[Subtitle ⇄ table conversion|/table.html]], shintshela ku-\"to table\", hudulela i-SRT ngaphathi, futhi kuqala ukugcwala ngomugqa owodwa ngesiqeshana kuzinsika ezine — inombolo, ukuqala, ukuphela, umbhalo. Chofoza u-\"Download Excel (.xlsx)\" futhi sekungokwakho. I-VTT isekelwa ngendlela efanayo.",
     "Uma uqeda ukuhlela: shintsha imodi ibe \"to subtitle\", faka ishidi emuva, futhi uthola i-SRT futhi. Umthetho yizinsika ezintathu zokuqala, ukuphela kanye nombhalo (i-English Start / End / Text iyasebenza nayo), nganoma iyiphi i-oda."
    ],
    "img": {
     "file": "table-prev",
     "alt": "Ukubuka kuqala kwethebula: isiqeshana ngasinye se-SRT njengomugqa kuzinsika ezine, kunye nebha yesimo",
     "cap": "I-SRT ebekwe njengezinsika ezine, engaguqulelwa emuva ngendlela efanayo"
    }
   },
   {
    "h2": "Izicupho ezivamile",
    "ps": [
     "**Lungisa ukubhala okonakele kuqala**: leli khasi lifunda u-UTF-8 kuphela. Isikrini esigcwele imibuzo noma amabhokisi kusho uhambo oluya ku-[[Mojibake repair|/repair.html]] kuqala.",
     "**I-CSV noma i-.xlsx**: khetha u-.xlsx uma ifayela liya ku-Excel, ukuze insika yesikhathi ingafomathwa kabusha; i-CSV iyasebenziseka kakhulu kodwa i-Excel ingayifunda njengenye into — seta insika yesikhathi ibe \"Text\" uma lokho kwenzeka.",
     "**I-ASS ayisebenzi**: i-ASS iphethe imiyalo yesitayela, ngakho iguqulele ku-SRT ngaphambi kokuyifaka kuthebula."
    ]
   },
   {
    "h2": "Okuhlobene",
    "ps": [
     "Ukuhamba kwezindlela zombili ngokugcwele — [[How to convert subtitles to Excel / CSV|/guides/table.html]]; ukuhumusha ngemuva kwalokho — [[Subtitle translation|/translate.html]]; ukudlula kokugcina ngaphambi kokuletha — [[Subtitle QC|/qc.html]]."
    ]
   }
  ]
 },
 "srt-to-vtt": {
  "seo": {
   "title": "Isiguquli se-SRT kuya ku-VTT – Guqula Imibhalo engezansi Ku-inthanethi – AI-SRTSub",
   "desc": "Guqula imibhalo engezansi ye-SRT ibe yisi-VTT (WebVTT) yezinto ze-HTML5 track. Izikhathi zama-comma ziba ngamachashazi ngokuzenzakalelayo. Kusebenza esipheqululini sakho, akukho okulayishwayo.",
   "h1": "I-SRT kuya ku-VTT",
   "intro": "Guqula imibhalo engezansi ye-SRT ibe yisi-VTT: donsela ifayela phakathi, khetha i-VTT, bese uyayilanda. Izikhathi zibhalwa kabusha ngendlela yewebhu, konke esipheqululini sakho.",
   "ctaText": "Guqula i-SRT → VTT"
  },
  "body": [
   {
    "h2": "Uma udinga i-VTT",
    "ps": [
     "Izidlali zewebhu (into ye-HTML5 ``), ukulayishwa kwemibhalo engezansi ku-YouTube, kanye nezidlali eziningi ezisekelwe esipheqululini zamukela **i-VTT (WebVTT)** kuphela — hhayi i-SRT. Uma unayo i-SRT kuphela, ukuguqula kanye kwenza kusebenze."
    ]
   },
   {
    "h2": "Ukuhluka kwalezi zinhlobo ezimbili",
    "ps": [
     "Okuqukethwe kuyafana cishe; kunezinto ezintathu ezibhalwe ngendlela ehlukile: **umugqa wesihloko se-WEBVTT** (uyadingeka ku-VTT); **isihlukanisi samamilisekondi** ezikhathini — i-SRT isebenzisa u-comma (00:00:01,000) kuyilapho i-VTT isebenzisa ichashazi (00:00:01.000); futhi i-VTT ivumela amabhulokhi e-NOTE nawe-STYLE lawo i-SRT engawavumeli."
    ],
    "img": {
     "file": "convert-result",
     "alt": "Umphumela wokuguqula obonisa isihloko se-WEBVTT nezikhathi zamachashazi",
     "cap": "I-VTT eguquliwe: umugqa wokuqala we-WEBVTT, izikhathi zamachashazi"
    }
   },
   {
    "h2": "Ungayiguqula kanjani",
    "ps": [
     "Vula [[isiguquli|/convert.html]], faka i-SRT, khetha **VTT - WebVTT** njengokuphumayo, bese uguqula futhi ulande. Ukulandelana kwama-cue, amanani esikhathi, nombhalo wemigqa eminingi konke kugcinwa njengoba kunjalo — ushintsho luba yisyntax kuphela. Uyahamba ngelinye icala? Bona [[VTT kuya ku-SRT|/guides/vtt-to-srt.html]]."
    ]
   }
  ]
 },
 "subtitle-format-comparison": {
  "seo": {
   "title": "I-SRT vs VTT vs ASS vs SBV vs LRC – Isiphi Isimo Semibhalo Engezansi – AI-SRTSub",
   "desc": "Ukuqhathaniswa kwamandla amafomethi emibhalo engezansi emihlanu: isitayela sombhalo, ukubekwa, ukunemba kwesikhathi, lapho ngayinye ingekho khona, kanye nendlela yokuguqula phakathi kwazo.",
   "h1": "Ukukhetha Ifomethi Yemibhalo Engezansi: SRT / VTT / ASS / SBV / LRC",
   "intro": "Umbhalo omncane ofanayo olondolozwe ngamafomethi amahlanu ukhonza amakhosi amahlanu ahlukene. Lo mhlahlandlela uqhathanisa lokho ifomethi ngayinye engakwenza nendlela yokuhamba phakathi kwazo.",
   "ctaText": "Vula isiguquli semibhalo engezansi"
  },
  "body": [
   {
    "h2": "Khetha ifomethi ngomusho owodwa",
    "ps": [
     "Ukulayisha isidlali, ukuhambisana okuphezulu → **SRT**; izidlali zewebhu (ithrekhi ye-HTML5) noma ukulayishwa ku-YouTube → **VTT**; amafonti, imibala, ukubekwa, imiphumela → **ASS**; okulandiwe ku-YouTube → **SBV** (guqulela ku-SRT ukuze wandise ukusekelwa); amazwi engoma, ukucula komugqa ngamunye → **LRC**."
    ],
    "img": {
     "file": "convert-opt",
     "alt": "Ukwehla kwefomethi yokuphumayo: amafomethi ayisithupha aqondiwe",
     "cap": "Izinhloso eziyisithupha zokuthumela ngaphandle kwisiguquli zihlanganisa wonke amafomethi kulo mhlahlandlela"
    }
   },
   {
    "h2": "Ukuqhathaniswa kwamandla",
    "ps": [
     "**SRT**: umbhalo ojwayelekile + isikhathi, akukho sitayela noma ukubekwa, iqhawe lokuhambisana. **VTT**: umbhalo + isikhathi, usekelwa yiziphequluli ngokwemvelo, ungaphatha ukubekwa nesitayela esiyisisekelo, ichashazi ngaphambi kwamamilisekondi. **ASS**: umbhalo + isikhathi + isitayela esigcwele (amafonti, imibala, imithetho, ukubekwa, imiphumela), isikhathi samasentisekondi. **SBV**: ifomethi encane yemibhalo engezansi ye-YouTube, ukuqala nokuphela kumugqa owodwa. **LRC**: ifomethi yamagama engoma, izikhathi zokuqala kuphela, akukho zikhathi zokuphela, akukho sitayela."
    ]
   },
   {
    "h2": "Izindlela phakathi kwamafomethi",
    "ps": [
     "Noma yikuphi kwalokhu kuguqula zombili izindlela ku-[[isiguquli|/convert.html]]: ukufunda kusekela srt, vtt, ass (kuhlanganise ne-ssa), sbv, lrc, txt; ukuthumela ngaphandle kusekela srt, vtt, ass, sbv, lrc, txt. Imizila ejwayelekile ngalinye linomhlahlandlela walo: [[SRT kuya ku-VTT|/guides/srt-to-vtt.html]], [[VTT kuya ku-SRT|/guides/vtt-to-srt.html]], [[SRT kuya ku-ASS|/guides/srt-to-ass.html]], [[ASS kuya ku-SRT|/guides/ass-to-srt.html]], [[SBV kuya ku-SRT|/guides/sbv-to-srt.html]], [[LRC kuya ku-SRT|/guides/lrc-to-srt.html]]."
    ]
   },
   {
    "h2": "Lokho ukuguqulwa okulahlekelwa yikho",
    "ps": [
     "Ukuguqulela ku-SRT kuhlale kulahla isitayela nokubekwa (i-SRT ayikwazi ukuzibamba). Ukuguqulela ku-ASS ngaleli thuluzi **kwakha kabusha isitayela esimisiwe futhi akugcini esokuqala**. I-LRC eya ku-SRT idinga ukuthi izikhathi zokuphela zigcwaliswe (umugqa ngamunye uhlala kuze kube olandelayo; owokugcina uthola imizuzwana emi-3). Amanani esikhathi nombhalo kuhlala kufana kuzo zonke izinkomba."
    ]
   }
  ]
 },
 "subtitle-garbled-characters": {
  "seo": {
   "title": "Kuvela Kuphi Ukonakala Kwemibhalo Engezansi – Kubone, Kulungise – AI-SRTSub",
   "desc": "Ukonakala kusho ukufunda okungalungile, hhayi ifayela elilimele. Izinhlamvu zokufaka esikhundleni, izindonga zezinhlamvu ezinomaka namacala ezinhlamvu ezingaziwa konke kukhomba imbangela — funda ukuthi yikuphi okululamayo futhi okungaphinde kululame.",
   "h1": "Kuvela kuphi ukonakala kwemibhalo engezansi",
   "intro": "Ama-byte afanayo afundwa njenge-UTF-8 futhi afundwa njenge-GBK aphuma njengezinhlamvu ezimbili ezihlukene ngokuphelele. Indlela umbhalo wemfucuza obukeka ngayo uwubufakazi obuqondile bokuthi yisiphi isinyathelo esingahambanga kahle.",
   "ctaText": "Vula ithuluzi lokulungisa ukonakala"
  },
  "body": [
   {
    "h2": "Ifayela lihle — lifundwe kabi",
    "ps": [
     "Lokho okugcinwa yifayela lemibhalo engezansi ama-byte. Ukuguqula ama-byte abe izinhlamvu kudinga ukwazi ukuthi abhalwe ngaluphi uhlobo lwekhodi — uphoxe lokho bese uthola ukonakala. Akukho ne-byte eyodwa elahlekile efayeleni; lifunde futhi ngekhodi efanele bese izinhlamvu zibuya.",
     "Lokho kwenza umsebenzi ube kubili: **ukuthola ukuthi yaqala ngaluphi uhlobo lwekhodi**, kanye **nokuyigcina njengekhodi engabanjwa yisidlali sakho**. Okokuqala kuvela ekuzameni ukukhipha ikhodi nokushaya amagoli, okwesibili kuvela ekugcineni ikhophi. Zixazulula izinkinga ezihlukene."
    ]
   },
   {
    "h2": "Ukubukeka okuhlanu, izimbangela ezinhlanu",
    "ps": [
     "Ukonakala akulona ize — ukuthi kubukeka kanjani kuveza okukubangele:"
    ],
    "img": {
     "file": "repair-diag",
     "alt": "Ikhadi lokuxilonga elibhala phansi uhlobo ngalunye lophawu lokonakala",
     "cap": "Ukuxilonga kuhlunga ukonakala ngembangela esikhundleni sokuzihlanganisa ndawonye"
    }
   },
   {
    "h2": "Kungani uhlamvu olufakwe esikhundleni lungakwazi ukulungiswa",
    "ps": [
     "Uhlamvu olufakwe esikhundleni luwumugqa wokuhlukanisa. U `` usho ukuthi ama-byte ayeselahliwe kakade **esinyathelweni sangaphambilini** (kuvamile ukuthi kube uhlelo oluthile olufunda ifayela futhi liyigcine futhi), futhi akukho okurekhodiwe ngalokho okulahliwe. Ngaleso sikhathi akukho lutho ongasuka kukho uqonde emuva — akekho ongalungisa lokho.",
     "Ngakho ikhasi lokulungisa liphatatha amacala amabili ngokwehlukana. Layisha ifayela bese ama-byte okuqala engaguquki, ukuvumela ukuthi azame uhlobo ngalunye lwekhodi; uma umbhalo onamathiselwe unohlamvu olufakwe esikhundleni kakade, kusho lokho ngokucacile: \"akunakugcinwa, sicela ulayishe ifayela lokuqala\".",
     "Kukhona futhi necala elihlukile: okuqukethwe kufundeka kahle kodwa isidlali sakho sisabiza imfucuza. Ifayela aliphosisile — **isidlali sikhethe ikhodi engalungile**. Ukuhlela umbhalo ngeke kusize; gcina ikhophi njenge-UTF-8 ene-BOM noma i-GBK bese uyinika yona."
    ],
    "img": {
     "file": "repair-up",
     "alt": "Indawo yokulayisha: donsela-phansi futhi unamathisele njengamaphuzu amabili okungena",
     "cap": "Layisha ifayela uma ungakwazi — ama-byte angaguquki asho okuthile okulungisekayo"
    }
   },
   {
    "h2": "Okufaniswayo ngenkathi kulungiswa",
    "ps": [
     "Ithuluzi lizama zonke izinhlobo zekhodi ezinengqondo, bese lishaya amagoli womphumela ngamunye: kungakanani okwenziwe ngezinhlamvu ezivamile, noma kukhona yini imichilo yamagama, imichilo yezimpawu, noma ngabe ukugijima kwe-CJK kuyizindonga zezinhlamvu ezingaziwa. Umphumela ophumelele kakhulu uya phezulu kohlu.",
     "**Uma kungekho amagoli acacile kangcono, akukho okunconywayo** — kungcono ukuthi uthi \"lokhu kufundeka kahle njengoba kunjalo\" kunokuba ukubeke okuthile okufana nolimi kancane nje. Umbhalo ophule kabili (ogcinwe kabi kanye, bese ulungiswa kabi kanye) uthola umjikelezo owodwa owengeziwe wokuxazulula emuva kwabayeni abaphezulu."
    ],
    "img": {
     "file": "repair-fix",
     "alt": "Uhlu lwabaqokelwe oluhlungwe ngamagoli, ngamunye anikezwe ilebula nobabili bakhe bekhodi",
     "cap": "Abaqokelwe abahlungiwe ngamagoli — alukho umsubathi ocacile, akukho sincomo"
    }
   },
   {
    "h2": "Ukugcina ikhodi efanele kuqeda umsebenzi",
    "ps": [
     "Umbhalo olungisiwe kumele usagcinwe njengekhodi ebonwa yisidlali sakho. Izidlali ku-Windows ngokuvamile zincike ku-BOM ukuthola ikhodi, ngakho **i-UTF-8 ene-BOM** iyona encane kakhulu enomsindo; ihadiwe endala nezinye izidlali zesifunda zifuna i-GBK. Ungakhetha i-UTF-8, i-UTF-8 (ene-BOM), i-GBK, i-Big5, i-Shift_JIS noma i-EUC-KR, futhi uzotshelwa ukuba ukhethe enye uma kukhona okungafanele (i-GBK ayikwazi ukubamba isiKorea)."
    ],
    "img": {
     "file": "repair-out",
     "alt": "Indawo yomphumela: gcina njengekhodi yokwehliswayo kanye nenkinobho yokulanda",
     "cap": "Kuyigcine njengento ebonwa yisidlali futhi ukonakala kuyaxazululwa ngempela"
    }
   },
   {
    "h2": "Amathuluzi ahlobene nemihlahlandlela",
    "ps": [
     "Ukuhamba okugcwele — [[Indlela yokulungisa imibhalo engezansi eyonakele|/guides/repair.html]]; lokho okugcinwa ifayela le-SRT ngempela — [[Yini engaphakathi kwefayela le-SRT|/guides/srt-file-format.html]]; ikhodi ilungile kodwa okuqukethwe kungcolile (izimpawu zamanzi, izikhangiso, amathegi abantu abangezwa kahle) — [[Ukuhlanza imibhalo engezansi|/clean.html]]."
    ]
   }
  ]
 },
 "subtitle-glossary": {
  "seo": {
   "title": "Amathebula Emigomo: isizini eyodwa, ulwazi olulodwa – Uma ungakha elilodwa – AI-SRTSub",
   "desc": "Ithebula lemigomo lilungisa igama elifanayo elihunyushwe ngokungaguquki: ukuthi lingakha nini, ukuthi lingalisebenzisa kanjani esizinini sonke, kungani ukufana kwamagama aphelele kungenzi lutho ngesiShayina, nokuthi yini okungamelwe unikeze yona.",
   "h1": "Amathebula emigomo: ukugcina isizini ingaguquki",
   "intro": "Uma igama lingu-A esiqeshini sokuqala futhi lingu-B esiqeshini sesikhombisa, ababukeli bacabanga ukuthi bangabalingiswa ababili. Ithebula lemigomo livimbela lokho kanye — lilungisa lokuthi izinto zibizwa ngani.",
   "ctaText": "Vula ukushintshwa kwemigomo ngobuningi"
  },
  "body": [
   {
    "h2": "Ithebula lemigomo lilungisa ukungaguquki",
    "ps": [
     "Izinkinga zokubhala kwemibhalo engezansi ziza ngezinhlobo ezimbili: \"leli gama lihunyushwe kabi\" kanye \"neligama elifanayo lihunyushwe ngokuhlukile kusuka endaweni eyodwa kuya kwenye\". Okokuqala kuyinkinga yesichazamazwi; okwesibili yilokho ithebula lemigomo elenzelwe khona.",
     "Okwesibili kuvame kakhulu futhi kunzima ukukubona: u-`Thor` uba u-\"Thor\" esiqeshini sokuqala no-\"Donar\" esiqeshini sesikhombisa, futhi isiqepha ngasinye sibukeka kahle sodwa kuyilapho uchungechunge lonke lenza ababukeli bacabanga ukuthi umlingiswa omusha uvele. Ithebula lemigomo liguqula \"lokhu kukhiqiza kombiza ngokuthi u-Thor\" kube umthetho osebenzisekayo ofakwe efayeleni lemibhalo engezansi lonke ngesikhathi esisodwa."
    ]
   },
   {
    "h2": "Uma kufanele ukwakha elilodwa",
    "ps": [
     "Akona konke ifayela lemibhalo engezansi elidinga ithebula lemigomo. Amacala athethelela elilodwa ngokuvamile ngala:"
    ],
    "img": {
     "file": "glossary-rules",
     "alt": "Imithetho yokushintsha ehlanganiswe ngesigaba ethebula lemigomo",
     "cap": "Sebenzisa ukuphawula kuka-# ukuqoqa imithetho, nokucisha eyodwa okwesikhashana ngenkathi uhlela"
    }
   },
   {
    "h2": "Ukugcina ithebula lilodwa esizinini sonke",
    "ps": [
     "Ithebula lemigomo liyagcinwa **kancane kancane**: zinza amagama esiqeshini sokuqala, bese wengeza umthetho noma nini lapho kuvela igama elisha, futhi ekugcineni kwesizini ithebula liphelele. Esizinini esilandelayo salolu chungechunge olufanayo, qala kulo.",
     "Bhala imithetho ebanzi kancane kunalokho okudingeka ngempela — uma usuvele unqume ngo-\"Thor\", engeza u-\"Donar -> Thor\" futhi, ukuze imibhalo engezansi yomunye umuntu ikwazi ukulethwa ngokulandelana ngesikhathi esifanayo.",
     "Funda njalo **uhlu lwezinguquko** emva kwalokho: luqamba i-cue ngayinye, umugqa ngamunye nokuthi kwaba yini nokuthi kwaba yini. Yindawo eyodwa lapho ungaqinisekisa khona ukuthi ushintsho belulungile futhi alwenziwanga kakhulu, futhi noma ngaluphi ungeno olungakujabulisi lungabuyiselwa ngokuchofoza."
    ],
    "img": {
     "file": "glossary-diff",
     "alt": "Uhlu lwezinguquko ngazinye endaweni yomphumela",
     "cap": "Zonke izinguquko zibaliwe; chofoza leyo ongayifuni ukuthi ibuyiselwe"
    }
   },
   {
    "h2": "Yini okungamelwe uyinikeze ithebula lemigomo",
    "ps": [
     "Ithebula lemigomo liguqula **amagama**. Lezi zinto ezintathu zingaphandle komsebenzi wazo, futhi kufanele zibe njalo:",
     "**Uhlelo lolimi nesakhiwo somusho** — ngeke uguqule igama libe umusho; umsebenzi wezinga lezimisho ubuyela ku-[[Ukuhunyushwa kwemibhalo engezansi|/translate.html]] noma kumuntu.",
     "**Ukuhlanza okuqukethwe** — ukulahla imigqa yonke efana nezimpawu zamanzi, izikhangiso nama-SDH cues kungokwe-[[Ukuhlanza imibhalo engezansi|/clean.html]]; imithetho yethebula lemigomo iyahola, ayisusi imigqa.",
     "**Izikhathi** — ithebula lemigomo aliphathi isikhathi neze. Ukuze uthole i-offset yomhlaba wonke noma inkinga yesilinganiso iya ku-[[Ukulungiswa kwesikhathi|/shift.html]]."
    ]
   },
   {
    "h2": "Izinto ezimbalwa kulula ukuzenza kabi",
    "ps": [
     "**IsiShayina sisashintsha ama-substrings ngokufana kwamagama aphelele okumakiwe — lokho kuvelekile.** IsiShayina nesiJapani azihlukanisi amagama ngezikhala, ngakho ithuluzi alikwazi ukuthola imingcele yamagama futhi ukufana kwamagama aphelele akunamphumela lapho; u-`art` ngeke athinte ukuvikelwa kuka-`start` kusebenza kuphela ngesiNgisi.",
     "**Ukulandelana kuguqula umphumela.** Imithetho isebenza ukusuka phezulu kuye phansi futhi umbhalo owenziwe umthetho owodwa uskwa futhi yimithetho engezansi kwawo. Shintsha u-A ngo-B bese u-B ngo-C futhi ugcina ngo-C.",
     "**Ukuze ushintsho ukuhumusha kuphela, setha ububanzi.** Efayeleni lezilimi ezimbili, khetha \"umugqa wesibili kuphela\"; okufakiwe okunomugqa owodwa kuphela kuhlala kungathintwa ngaphansi kokubeka komugqa owodwa — ithuluzi aliqagele ukuthi yiliphi uhlangothi lokuqala.",
     "**Ithebula lemigomo alilondolozwa.** Lilutho njalo uma uvula ikhasi, ngakho gcina ifayela lakho lombhalo bese ulidlulisela phambili."
    ]
   },
   {
    "h2": "Amathuluzi ahlobene nemihlahlandlela",
    "ps": [
     "Ukuze uthole ukuhamba okuphelele bona [[Indlela yokushintsha ngobuningi imigomo emibhalweni engezansi|/guides/glossary.html]]; uma okuqukethwe kungcolile sebenzisa [[Ukuhlanza imibhalo engezansi|/clean.html]] kuqala; uma amagama esezinzile futhi udinga ezinye izilimi iya ku-[[Ukuhunyushwa kwemibhalo engezansi|/translate.html]]; futhi ugijimise umphumela nge-[[I-QC yemibhalo engezansi|/qc.html]]."
    ]
   }
  ]
 },
 "subtitle-quality-check": {
  "seo": {
   "title": "Uhlu Lwamazwi Okuhlola I-QC Yemibhalo Engezansi Ngaphambi Kokulethwa – AI-SRTSub",
   "desc": "Uhlu lokuhlola ukulethwa kwemibhalo engezansi: ukugqagqana, isivinini sokufunda, ububanzi bomugqa namaphuzu kuvame ukwehluleka kakhulu. Qalisa imithetho ye-QC engu-17 — ingxenye yezinkinga ilungiseka ngokuchofoza kanye.",
   "h1": "Okufanele Ukuhlole Ngaphambi Kokulethwa",
   "intro": "Imibhalo engezansi eqediwe ayikulungele ukulethwa: izinkinga ababukeli abazibona ngesikhathi sokuqala yizona kanye ongaziboni ngemva kokubukela izikhathi eziyikhulu. Lolu hlu lokuhlola luhlanganisa lowo msebenzi wokugcina.",
   "ctaText": "Qalisa Ukuhlola kwe-QC Yemibhalo Engezansi"
  },
  "body": [
   {
    "h2": "Kungani Ungakwazi Ukuzibona Izinkinga Wena",
    "ps": [
     "Noma ubani owenza imibhalo engezansi uyalazi kahle okuqukethwe — uyazi ukuthi umugqa ngamunye uthini okulandelayo, ngakho akukho lutho oluzwakala lusheshe kakhulu; ubone ukwakheka izikhathi eziyikhulu, futhi amehlo akho ayayeqa amaphutha ngokwawo. Ngakho ukuhlola kwangaphambi kokulethwa akukwazi ukuncika “ekubukeleni futhi kusuka phezulu” — kumele **kulinganiswe ngamanani**: isivinini sokufunda, ububanzi bomugqa, isikhathi, ukugqagqana. Vumela izibalo zinqume."
    ]
   },
   {
    "h2": "Ukwehluleka Okuyisithupha Okuvamile Kakhulu",
    "ps": [
     "Kubekwe ngokulandelana kokuthi zivame kangakanani ukucwilisa ukulethwa:"
    ]
   },
   {
    "h2": "Ungayihlola Kanjani",
    "ps": [
     "Vula [[I-QC Yemibhalo Engezansi|/qc.html]] bese ufake imibhalo yakho engezansi; setha ulimi ukuba luzitholele (izilimi ezingu-27, ngayinye inamazinga ayo emithetho). Umbiko ubala okutholwe emazingeni amathathu — **amaphutha / izixwayiso / amathiphu** — ngalinye linenombolo yokungena nenani elilinganisiwe. Amaphutha kumele abhekanwe nawo (umbhalo owonakele, ifomethi yesikhathi, ukuphela ngaphambilini kokuqala, ukubala okuphukile); izixwayiso zincike ecaleni (ukugqagqana, isivinini sokufunda, ububanzi bomugqa, isikhathi); amathiphu yiwona acwengisayo (indawo yokweqa umugqa, izikhala, amaphuzu)."
    ],
    "img": {
     "file": "qc-report",
     "alt": "Umbiko we-QC: uhlu lwezinkinga zamazinga amathathu, okutholwe ngakunye kunenombolo yokungena nokuqhathaniswa kwenani elilinganisiwe nomkhawulo",
     "cap": "Umbiko wamazinga amathathu onikeza inombolo yokungena nenani elilinganisiwe lokutholwe ngakunye"
    }
   },
   {
    "h2": "Okungase Kulungiswe Ngokuchofoza Okukodwa",
    "ps": [
     "Ukubala, okufakiwe okungenalutho, ukugoqa kabusha, izikhala namaphuzu — noma yini **eyeka isikhathi singathintwanga** — ingalungiswa ngokuzenzakalelayo; ukulungisa **okushintsha isikhathi** (ukushintshanisa ukuqala nokuphela, ukushintsha ukugqagqana, ukunciphisa noma ukwelula ubude besikhathi) akukhethiwe ngokuzenzakalelayo futhi kumele kukhethe kuphela ngemva kokuba uqinisekisa umthelela. **Isivinini sokufunda esingaphezu komkhawulo asinalungiso oluzenzakalelayo** — umshini awukwazi ukuthi yiliphi igama okumele lisikwe, ngakho nciphisa ukuhumusha wena uqobo noma ukhulule isikhathi kancane; bheka [[Imibhalo Engezansi Esheshayo Kakhulu Ukuthi Ifundwe|/guides/subtitle-too-fast.html]]. Ngemva kokulungisa, ukuhlola okusha kuqalisa ngokuzenzakalelayo, futhi umbiko ubala kuphela lokho okulungiswe ngempela."
    ]
   },
   {
    "h2": "Ngenkathi Ukuyo",
    "ps": [
     "Ikhasi lombiko lingalanda umbiko wombhalo ojwayelekile we `.qc.txt` ngqo — kuunamathisele ekulethweni ukuze olunye uhlangothi lubone shazi lokho okuhlolile. Ngemibhalo engezansi ehunyushwe esanda kuvela, qalisa i-QC ngaphambi kokulethwa; ukukhukhuleka kwesikhathi esiphelele kuwuhlobo oluhlukile lwenkinga — uma isivinini sokufunda sisehluleka ngemva kokuhlola, bheka [[Imibhalo Engezansi Eyeka Ukuhambisana|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "subtitle-speed-converter": {
  "seo": {
   "title": "Vumelanisa Ama-Subtitles Emva Kokuba Ijubanga Levidiyo Lishintshile – AI-SRTSub",
   "desc": "Ividiyo isheshiswe noma yehlise ijubane futhi ama-subtitles awasavumelani: faka inani lejubane esinyathelweni sokukala ngezinga futhi wonke umugqa wesikhathi uyelulwa nevidiyo.",
   "h1": "Lungisa Ama-Subtitles Emva Kokuba Ijubane Levidiyo Lishintshile",
   "intro": "Ividiyo isheshe noma yehlise ijubane jikelele, ama-subtitles ahlala esibhalweni sokuqala — konke okusemuva kwephuzu okuthile akulungile. Faka inani futhi wonke umugqa wesikhathi uyalinganiswa nevidiyo.",
   "ctaText": "Vula umhleli wesikhathi"
  },
  "body": [
   {
    "h2": "Nini ukusebenzisa izinga esikhundleni sokushintsha",
    "ps": [
     "Ividiyo isheshiswe noma yehlise ijubane **njengento eyodwa** (ithi 0.9x noma 1.25x kusofthiwe yokuhlela) kuyilapho wonke umugqa ugcine isigqi sawo sokuqala: ukuqala kuyavumelana, futhi lapho uqhubeka khona kuba kubi kakhulu — ngesilinganiso esifanayo. Lokho kuyinkinga yezinga. Uma ifayela lonke limane lixhunywe ngenani elimisiwe ngaphandle kokukhula, ukushintsha kwanele — bheka [[ukuthuthela ifayela lonke lama-subtitles kuqala noma kamuva|/guides/shift-subtitle-timing.html]]."
    ]
   },
   {
    "h2": "Liyiphi inombolo okufanele uyifake",
    "ps": [
     "Ama-subtitles kufanele alandele ividiyo, ngakho faka **izinga ividiyo eshintshe ngalo ngempela**: ukusheshisa ngo-1.25x kusho ukuthi izikhathi zemigqa ziphindwa ngo-1.25 ukuze zibambe; ukwehlisa ijubane ngo-0.9x kuphindaphindwa ngo-0.9. Kumhleli wesikhathi, engeza isinyathelo **Sika ngezinga** bese ufaka inani ebhokisini lenani."
    ],
    "img": {
     "file": "shift-step-rate",
     "alt": "Isinyathelo sokukala ngezinga elinenani ebhokisini lenani",
     "cap": "Inani elingaphezu kuka-1 lilula umugqa wesikhathi (kuvidiyo esheshisiwe), elingaphansi kuka-1 liyayicindezela (eyehliselwe ijubane)."
    }
   },
   {
    "h2": "Ukuthi lokhu kwehluke kanjani ekushintsheni",
    "ps": [
     "Ukushintsha **kuhambisa** izikhathi zomugqa ngamunye ngenani elifanayo elimisiwe futhi kugcine ubude bemigqa; izinga **liphindaphinda** zombili ukuqala nokuphela, ngakho ubude buyakala nabo. Emva koshintsho lwejubane ubude babo bushintshile — yingakho kanye kudingeka izinga."
    ]
   },
   {
    "h2": "Uma ungaqinisekile ngenani",
    "ps": [
     "Uma inani lilahlekile, buyela **eziqintini ezimbili**: faka izikhathi zangempela zevidiyo zomugqa wokuqala nowokugcina futhi konke okuphakathi kwazo kuyasakazeka ngokulinganisweni — okulingana nokuxazulula inani elifanele. Bheka [[ama-subtitles aqala ukungavumelani kakhulu namanje|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "subtitle-too-fast": {
  "seo": {
   "title": "Ama-Subtitles Ashesha Kakhulu Ukufundwa – Lungisa Isivinini Sokufunda – AI-SRTSub",
   "desc": "Ama-subtitles ashesha kakhulu ukufundwa — isikhathi esifushane noma umbhalo omude? I-QC imakaza okungaphezu kwezinhlamvu ezingama-20 ngesizuzwana (ama-hanzi angu-9 e-CJK); izikhathi ziyalungiseka ngokuzenzakalelayo, umbhalo udinga ukuhlelwa.",
   "h1": "Ama-Subtitles Ashesha Kakhulu Ukufundwa",
   "intro": "Izibukeli ziyaqhubeka nokucindezela ikhefu? Imbangela isivinini sokufunda. Ungasakala kanjani, ungakulungisa kanjani, futhi nini lapho okufanele uhlele khona umbhalo ngokuqhathanisa nesikhathi — konke kumhlahlandlela owodwa.",
   "ctaText": "Hlola Isivinini Sokufunda"
  },
  "body": [
   {
    "h2": "Kuyini Isivinini Sokufunda?",
    "ps": [
     "Isivinini sokufunda kungukuthi **ukuthi izibukeli zingakwazi yini ukuqedela ukufunda i-subtitle ngaphakathi kwesikhathi esihlala ngaso esikrinini**. Izibalo ziqonde ngqo: ububanzi bombondo buhlukaniswe ngemizuzwana esikrinini. Imikhawulo ejwayelekile yezimboni: izinhlamvu ezigcwele zobubanzi eziyisi-9 ngesizuzwana sase-China, Japan nase-Korea (amayunithi angu-18 awuhhafu wobubanzi), amayunithi angu-20 awuhhafu wobubanzi ngesizuzwana kwezinye izilimi. Umugqa wama-hanzi angu-20 ohlala isizuzwana esingu-1 uba amayunithi wobubanzi angu-40 ngesizuzwana — ngaphezu kokuphindwe kabili komkhawulo, futhi izibukeli ngeke ziwuqede."
    ]
   },
   {
    "h2": "Okokuqala, Hlukanisa Ukuthi Luhlobo Luni Lwesivinini Esisheshayo",
    "ps": [
     "“Ashesha kakhulu ukufundwa” empeleni izinkinga ezimbili ezihlukene: **isikhathi esifushane kakhulu** — umugqa uyasikwa ngemva kwamakhulu ama-millisecond aliseduze noma amabili, ngokuvamile iphutha lesikhathi noma okusele ekuhleleni; **umbhalo omude kakhulu** — isikhathi sihle, kodwa umugqa ufaka ama-hanzi angu-30, futhi akukho mkhawulo wesivinini ozowusindisa. Izixazululo ziphakathi nendawo, ngakho thola ukuthi unaluphi kuqala."
    ],
    "img": {
     "file": "qc-rules",
     "alt": "Ukulungiselelwa komkhawulo wesivinini sokufunda ekhasini le-QC, okuzenzakalelayo ku-18 kwe-CJK kanye no-20 kwezinye izilimi",
     "cap": "Imikhawulo yesivinini sokufunda se-QC: amayunithi wobubanzi angu-18 ngesizuzwana se-CJK, angu-20 kwezinye izilimi"
    }
   },
   {
    "h2": "Ungakuhlola Kanjani",
    "ps": [
     "Vula [[I-Subtitle QC|/qc.html]] bese ufake ama-subtitles akho phakathi. Umbiko, “isikhathi esifushane kakhulu” kuyisixwayiso esibonisa ama-millisecond alinganisiwe (umkhawulo: ama-millisecond angu-833); “isivinini esingafundeki” yinto yaso esibonisa amayunithi wobubanzi alinganisiwe ngesizuzwana. Kwisi-subtitle esinezilimi ezimbili kuphela umugqa obhalwe ngolimi okuhloswe ngalo obalwayo — izilimi ezimbili azihlanganiswa ndawonye."
    ]
   },
   {
    "h2": "Ungakulungisa Kanjani",
    "ps": [
     "**Isikhathi esifushane kakhulu**: kulungiseka ngokuchofoza okukodwa — umugqa welulwa ngokuzenzakalelayo ube ngama-millisecond angu-833, ngaphandle kokudlula ukuqala komugqa olandelayo (ukulungiswa akumele kwenze ukugqagqana okusha). **Umbhalo omude kakhulu**: akukho ukulungisa okuzenzakalelayo — umshini awukwazi ukuthi yiluphi ulwazi okufanele lusikwe. Izindlela ezimbili, okukhetha kwakho: finqe ukuhunyushwa (chofoza iseli ethuluzini lokuhumusha ukuze uyihlele), noma welule isikhathi salo mugqa (kuphela uma kunesikhala ngaphambi komugqa olandelayo; ngenkinga yonke yomugqa wesikhathi bheka [[Timeline Shift|/shift.html]]). Qalisa i-QC futhi emva kwalokho ukuze uqinisekise ukuthi isivinini sokufunda sibuyele ngaphakathi komkhawulo."
    ]
   },
   {
    "h2": "Ungalungisi Kakhulu",
    "ps": [
     "Ukuhlangabezana nomkhawulo wesivinini akusho ukubukela okunethezekile: ukufaka yonke imigqa kuze kufike ezinhlamvu eziyisi-9 ngesizuzwana kwenza ifilimu yonke ibe buhlungu. Njengomthetho wesandla, hlala cishe ku-70% womkhawulo isikhathi esiningi, futhi vumela izigaba ezigcwele izingxoxo zidlule kancane ngezikhathi ezithile. Amabhulokhi ama-subtitles akhanya kaningi kakhulu ayinkinga ngokwawo — qalisa isethi egcwele yamamethrikhi ngaphambi kokulethwa, bheka [[What to Check Before Delivery|/guides/subtitle-quality-check.html]]."
    ]
   }
  ]
 },
 "subtitles-out-of-sync": {
  "seo": {
   "title": "Ama-Subtitles Aphambana Kakhulu Ngokuhamba Kwesikhathi? Kulungise – AI-SRTSub",
   "desc": "Kuqala kahle, kusemuva ngemizuzwana embalwa maphakathi nefilimu, akusebenziseki ekugcineni: lokho kuwukukhubeka okungaguquki, ngokuvamile ukungafani kwezinga lozimele noma ushintsho lwejubane levidiyo. Izisekelo ezimbili ziyakulungisa.",
   "h1": "Ama-Subtitles Aphambana Kakhulu Ngokuhamba Kwesikhathi: Izimbangela Nezixazululo",
   "intro": "Kuhle ekuqaleni, sekwedlule imizuzwana embalwa sekuyimizuzu engu-awu, kuphelelwa ithemba ekugcineni. Lolu hlobo lokungaqondani olukhubekayo lunezimbangela ezaziwayo — nesixazululo esaziwayo.",
   "ctaText": "Lungisa le fayela"
  },
  "body": [
   {
    "h2": "Okokuqala hlukanisa izinhlobo ezimbili zokungafani",
    "ps": [
     "Ukungafani kuza ngezinhlobo ezimbili: **isinxephezelo esifanayo** kusho ukuthi wonke umugqa usemuva (noma usekuqaleni) ngenani elifanayo, cishe liyalingana kusuka ekuqaleni kuya ekugcineni; **ukukhubeka okuqhubekayo** kusho ukuthi ukuqala kulungile futhi iphutha likhula libheke ekugcineni, mhlawumbe lifinyelele emizuzwini. Lesi sihloko simayelana nohlobo lwesibili — olokuqala, bheka [[ukuthuthela ifayela lonke lama-subtitles kuqala noma kamuva|/guides/shift-subtitle-timing.html]]."
    ]
   },
   {
    "h2": "Kungani kukhubeka nakakhulu",
    "ps": [
     "Ukukhubeka kuvela **kumawashi amabili ahlukene**: izimbangela ezintathu ezivame kakhulu yilezi (1) ukungafani kwezinga lozimele — ama-subtitles efilimu engama-24fps kumthombo wama-25fps alahlekelwa isizuzwana esingaphezu kwesodwa ngemizuzu; (2) ividiyo isheshiswe noma yehlise ijubane kuyilapho ama-subtitles egcine isigqi sawo sokuqala; (3) ukurekhoda kwe-VFR (izinga lozimele eliguquguqukayo) umugqa wesikhathi ongalingani kusukela ekuqaleni. Okuhlanganyelwa yibo: iphutha likhula cishe ngokomugqa ngesikhathi sokudlala."
    ]
   },
   {
    "h2": "Kulungise ngezisekelo ezimbili",
    "ps": [
     "Ngenxa yokuthi iphutha likhula ngokomugqa, ukubeka isikhathi esifanele ekugcineni ngakunye nokusakaza kabusha phakathi ngokulinganisa kubuyisela konke endaweni. Kumhleli wesikhathi, engeza **ukulungiswa kwezisekelo ezimbili**: amasimu amabili \"amanje\" agcwaliswa ngokuzenzakalelayo ngezikhathi zokuqala zeli fayela; ubukela ividiyo bese ufaka **ukuthi umugqa wokuqala nowokugcina uvela nini ngempela** kumasimu amabili \"okuhloswe ngawo\"."
    ],
    "img": {
     "file": "shift-step-two",
     "alt": "Ukulungiswa kwezisekelo ezimbili: izikhathi zamanje zigcwaliswe ngokuzenzakalelayo, izikhathi eziqondiswe kuzo ezizofakwa",
     "cap": "Thatha izisekelo emikhawulweni emibili — iphutha lokuqala elincane nelikhulu kakhulu — futhi konke okuphakathi kuyasakazeka kabusha ngokulinganisa."
    }
   },
   {
    "h2": "Ungakuqinisekisa kanjani umphumela",
    "ps": [
     "Emva kokusebenza, iphanele yomphumela ibala izikhathi zokuqala nezintsha zomugqa ngamunye **ngasendaweni eyodwa**. Hlola izindawo ezintathu: umugqa wokuqala, owodwa phakathi, nowokugcina — izindawo ezintathu eziniphutha lokuqala elincane, eliphakathi nendawo nelikhulu kakhulu. Uma zombili zihlangene, lonke ifayela liyenzenjalo."
    ],
    "img": {
     "file": "shift-result",
     "alt": "Iphanele yomphumela: ngaphambi nangemva kwezikhathi ndawonye, ​​nenkinobho yokulanda",
     "cap": "Izikhathi ezintsha zemigqa ephakathi nendawo kufanele ziwe phakathi kwemikhawulo emibili — uphawu lokuthi isilinganiso silungile."
    }
   },
   {
    "h2": "Uma izisekelo ezimbili zinganele",
    "ps": [
     "Ukulungiswa kwezisekelo ezimbili kucabanga ukuthi iphutha **liwuqweqwe**. Uma umthombo kuwukurekhoda kwesikrini se-VFR ngokugxuma kwezinga lozimele maphakathi nefayela, ukudonsa komugqa akukwazi ukulungisa okuphakathi — thatha umugqa omaphakathi osuke ungalungile obonakalayo njengephuzu lesithathu, hlukanisa ifayela lapho, bese uqalisa ukulungiswa kwezisekelo ezimbili ingxenye ngayinye. Futhi, emva kokulungisa, bulela isigaba saphakathi ngesivinini esivamile ukuze uqinisekise ukuthi akukho ukungafani kwasendaweni okusele."
    ]
   }
  ]
 },
 "table": {
  "seo": {
   "title": "Ukuguqula Ama-Subtitle abe yi-Excel / CSV – Izinhlangothi Zombili – AI-SRTSub",
   "desc": "Ukuhamba ngezindlela ezimbili: thumela i-SRT/VTT ku-Excel noma ku-CSV ukuze ubuyekeze umugqa nomugqa, bese ungenisa ishishi elihleliwe njengama-subtitles. Kudingeka amakholomu amathathu, noma yiluphi uhlelo; isikhathi sigcinwe njengombhalo.",
   "h1": "Ungakuqaphela Kanjani Ukuguqula Ama-Subtitle abe yi-Excel / CSV",
   "intro": "Ukubuyekeza nokuhumusha kulula kushidi lokubala. Thumela ama-subtitles ku-Excel noma ku-CSV, hlela umugqa nomugqa, bese uguqula emuva — amakholomu esikhathi ahlala engumbhalo, futhi ukwehlukana kwemigqa ngaphakathi kwezingxoxo kuyalondolozwa.",
   "ctaText": "Vula isiguquli seshidi"
  },
  "body": [
   {
    "h2": "Lokhu okwenziwa yilolu thuluzi",
    "ps": [
     "Ama-subtitles angimigqa yemigqa kanye namashidi okubala angimigqa yamarekhodi — uma sekuyishidi, ukubuyekeza, ukuphawula nokuhumusha ngobuningi konke kungenziwa ngamathuluzi owaziyo kakade. Zombili izinhlangothi ziyasekelwa:"
    ]
   },
   {
    "h2": "Layisha bese ukhetha indlela",
    "ps": [
     "Hudula ifayela ngaphakathi noma ufune elilodwa. Uhlangothi ngalunye ludinga uhlobo oluhlukile lwefayela: **kuya kwishidi** kuthatha amafayela wama-subtitle (SRT / VTT), **kuya ku-subtitle** kuthatha amafayela weshidi lokubala (CSV / Excel, kokubili .xlsx kanye .xls). Khetha imodi engalungile futhi ikhasi likutshela ukuthi yiliphi uhlobo lwefayela elifunwa yileyo modi.",
     "⚠️ Leli khasi lifunda i-UTF-8 kuphela. Uma i-subtitle yakho ivulwa njengesikrini esigcwele samaphawu ombuzo noma amabhokisi, yidlulise ku-[[Ukulungiswa kwe-Mojibake|/repair.html]] kuqala — ukubethela okwephukile kufundwa njengamapharumenti okushintsha lapha."
    ],
    "img": {
     "file": "table-up",
     "alt": "Indawo yokulayisha isiguquli seshidi: indawo yokulahla kanye nokushintsha kwemodi ezimbili",
     "cap": "Imodi ngayinye ifuna ifayela elihlukile: ama-subtitles angaphakathi, ishidi lokubala liphumile — futhi libuyele emuva"
    }
   },
   {
    "h2": "Ukuthumela ama-subtitles eshidini",
    "ps": [
     "Khetha \"kuya kwishidi\", faka i-subtitle, futhi ukubuka kuqala kubala wonke umugqa: inkomba, ukuqala, ukuphela, umbhalo. Ibha yezibalo inikeza inani lemigqa kanye nesikhathi esiphelele. Bese uchofoza \"Landa i-Excel (.xlsx)\" noma \"Landa i-CSV\".",
     "Ukwehluka phakathi kwazo zombili: i-xlsx iyifayela langempela leshidi lokubala lapho i-Excel ingakwazi ukufometha kabusha ikholomu yakho yesikhathi ngemuva kwakho; i-CSV iphatheka kakhulu, kodwa i-Excel ingase ihumushe ikholomu yesikhathi njengenye into lapho ivulwa. Uma lokho kwenzeka, khetha ikholomu yesikhathi bese ubeka ifomethi yayo ibe \"Umbhalo\" — noma vele usebenzise .xlsx."
    ],
    "img": {
     "file": "table-prev",
     "alt": "Ukubuka kuqala kweshidi: amakholomu enkomba, ukuqala, ukuphela nombhalo anebha yezibalo",
     "cap": "Wonke umugqa ubukwe kuqala; ibha yezibalo inikeza inani lemigqa nesikhathi esiphelele"
    }
   },
   {
    "h2": "Ukungenisa ishidi libuyele kuma-subtitles",
    "ps": [
     "Khetha \"kuya ku-subtitle\", faka ishidi, futhi nansi umthetho wekholomu: ludinga amakholomu amathathu **ukuqala, ukuphela nombhalo** (izihloko zesiNgisi Start / End / Text ziyasebenza futhi), **noma yiluphi uhlelo**. `00:00:01,500` kanye ne-`00:00:01.500` zombili ziyamukelwa; imigqa engenakuhlaziywa iyashiywa esikhundleni sokulahla lonke ifayela.",
     "Umphumela ubhalwe umugqa nomugqa ekubukeni kuqala;qinisekisa, bese ulanda i-SRT noma i-VTT. Uma lawo makholomu amathathu engekho uthola umlayezo othi uhlole izihloko — ngokuvamile ngenxa yokuthi kusetshenziswe ukuqamba okuhlukile ekuthumeleni, noma umugqa wesihloko awuwo umugqa wokuqala."
    ],
    "img": {
     "file": "table-back",
     "alt": "Indawo yomphumela we-subtitle: ama-subtitles angenisiwe abhalwe umugqa nomugqa",
     "cap": "Amakholomu angabonwa ayabikwa, awasoze azitshwa buthule"
    }
   },
   {
    "h2": "Imibuzo Ebuzwa Njalo",
    "ps": [
     "**I-Excel ibonisa ikholomu yesikhathi ngokungalungile?** Sebenzisa i-.xlsx futhi akusoze kwenzeka. Kufanele usebenzise i-CSV: khetha ikholomu yesikhathi bese ubeka ifomethi yeseli ibe \"Umbhalo\" ngaphambi kokuvula.",
     "**Ingabe izihloko zamakholomu kufanele zibe zesiNgisi?** Cha. I-Start / End / Text ziyaqashelwa kunoma yiluphi ulimi olusekelwa yileli khasi, futhi ukukhuluphala akubalulekile.",
     "**Ingabe ukwehlukana kwemigqa yami kusekhona emva kokungenisa?** Yebo. Ukwehlukana kwemigqa ngaphakathi kwezingxoxo kuyalondolozwa, kuze kufike ekugoqeni kwangempela.",
     "**Ingabe i-ASS iyasekelwa?** Leli khasi liphathe i-SRT ne-VTT kuphela. I-ASS iphethe imiyalelo yesitayela — iguqulele ku-SRT nge-[[Isiguquli sefomethi|/convert.html]] kuqala.",
     "**Mangaki amafayela ngesikhathi esisodwa?** Eyodwa. Ukucubungula amashumi noma amakhulu, sebenzisa [[Ukuguqula ngamaqoqo|/batch.html]] (okuguqula amafomethi kuphela futhi akadluli eshidini)."
    ]
   },
   {
    "h2": "Ukuphepha",
    "ps": [
     "Ukuguqula kuqhubeka ngokuphelele esipheqululini sakho. Akukho okuqukethwe yi-subtitle okuthunyelwa kuseva."
    ]
   },
   {
    "h2": "Amathuluzi ahlobene nemihlahlandlela",
    "ps": [
     "Uma konke okufunayo kuyisinyathelo sokuguqula ama-subtitle abe yi-Excel, bheka [[Guqula ama-subtitle abe yi-Excel|/guides/srt-to-excel.html]]; ukuhumushela kolunye ulimi emva kwalokho, [[Ukuhunyushwa kwama-subtitle|/translate.html]]; amashumi amafayela ngesikhathi esisodwa — [[Ukuguqula ngamaqoqo|/batch.html]]."
    ]
   }
  ]
 },
 "translate": {
  "seo": {
   "title": "Ukuhunyushwa Kwama-Subtitle nge-AI – ukulayisha kuze kube sekuthumeleni ngezilimi ezimbili – AI-SRTSub",
   "desc": "Humusha ama-subtitle nge-AI: layisha i-SRT/VTT/ASS, khetha ezilimini eziyi-100, hlanganisa amagama ngegilosari, thumela ama-subtitle ngezilimi ezimbili. Kumahhala ukuqala, ukhiye wakho we-API uyasekelwa.",
   "h1": "Indlela Yokusebenzisa Ukuhunyushwa Kwama-Subtitle nge-AI",
   "intro": "Umsebenzi ophelele wefayela elilodwa lama-subtitle, kusukela ekulayisheni kuze kufike ekuhumusheni nasekuvezeni: okusesikrinini, okufanele ukuchofoze, nalokho okutholayo esinyathelweni ngasinye.",
   "ctaText": "Vula ithuluzi lokuhumusha"
  },
  "body": [
   {
    "h2": "Lokhu okwenziwa yilolu thuluzi",
    "ps": [
     "Humusha ama-subtitle kolunye ulimi ukuya kolunye futhi uthumele ifayela lama-subtitle elilungele ukusetshenziswa. Izidingo ezijwayelekile:"
    ]
   },
   {
    "h2": "Layisha ama-subtitles",
    "ps": [
     "Chofoza u-\"Khetha ifayela lama-subtitle\" noma unamathisele umbhalo wama-subtitle ngqo ebhokisini lokufaka langakwesokunxele. Amafomethi ayisithupha ayasekelwa: i-SRT, VTT, ASS, SSA, SBV kanye ne-TXT. Alikho ifayela eliseduze? Chofoza u-\"Layisha isampula\" ukuze ubone ukuthi lisebenza kanjani. Uma selihlaziwe, ikholomu ephakathi nendawo ibonisa itafula lama-subtitle elinenkomba, umugqa wesikhathi kanye nombhalo womthombo kumuntu ngamunye."
    ],
    "img": {
     "file": "translate-upload",
     "alt": "Indawo yokungenisa yethuluzi lokuhumusha: khetha ifayela lama-subtitle, ibhokisi lokunamathisela nenkinobho yokulayisha isampula",
     "cap": "Ikholomu yesokunxele \"Ngenisa ama-subtitles\": khetha ifayela, namathisela umbhalo noma ulayishe isampula"
    }
   },
   {
    "h2": "Khetha ulimi nesitayela",
    "ps": [
     "\"Ulimi lomthombo\" lungahlala ekutholeni ngokuzenzakalelayo; \"ulimi okuhlosiwe\" lukhethwa ezilimini eziyi-100. Kunezitayela zokuhumusha ezinhlanu ezitholakalayo: Okulinganisela (okuzenzakalelayo), Okukhulunywayo, Okusemthethweni kobuchwepheshe, Isitayela sokubiza kanye Nokwezifiso. \"Isitayela sokubiza\" silungele izingxoxo zamafilimu nethelevishini; \"Okusemthethweni kobuchwepheshe\" kulungele amadokhumentari nezifundo."
    ],
    "img": {
     "file": "translate-lang",
     "alt": "Izilungiselelo zolimi nesitayela sokuhumusha: ulimi lomthombo, amamenyu aphansi olimi okuhlosiwe nezitayela ezinhlanu",
     "cap": "\"Ulimi\" kanye \"nesitayela sokuhumusha\": umthombo ungazitholela wonke, izinketho ezihlosiwe ezingama-75"
    }
   },
   {
    "h2": "Igilosari: gcina amagama engaguquki",
    "ps": [
     "I-AI ihumusha ngamaqoqo, ngakho igama elifanayo lingaphuma ngezindlela ezimbili ezihlukene kumaqoqo ahlukene. Bhala imithetho ethi \"umthombo → kufanele ihunyushwe njenge\" ku-gilosari; ngaphambi kweqoqo ngalinye ithuluzi liyayihlola futhi lilandele wonke umdlalo. Umthetho owodwa ngomugqa ngamunye; imicibisholo ingaba `->`, `=>`, `→` noma i-Tab; ithempeli lomthombo elilodwa lisho ukuthi ligcinwe lingahunyushwanga; izipelingi eziningana zingabelana ngokuhunyushwa okukodwa nge `|`. Chofoza u-\"✨ AI extract\" ukuze i-AI ikhiphe amagama afanele kuvidiyo iwele etafuleni kuqala, bese uhlela futhi uhumushe."
    ],
    "img": {
     "file": "translate-glossary",
     "alt": "Igilosari nendawo yamagama afanele: ibhokisi lokufaka legilosari eline-AI extract nezinkinobho zokulondoloza",
     "cap": "Igilosari \"yamagama ahlanganisiwe\": amagama afanele akhishwa yi-AI, alayishwa ngokuzenzakalelayo kumavidiyo amasha uma eselondoloziwe"
    }
   },
   {
    "h2": "Inqubo yokuhumusha",
    "ps": [
     "Chofoza u-\"▶ Qala ukuhumusha\" kubha ephezulu. Umucu wezibalo ophakathi nendawo ubonisa imigqa, okuhunyshiwe, okusuliwe okugcwele kanye namaqembu emisho yemigqa eyahlukeneyo ngesikhathi sangempela; ibha yenqubelaphambili ibonisa isikhathi esilinganiselwe esisele namathokheni asetshenzisiwe. Ngenkathi uhumusha, chofoza noma iyiphi iseli yokuhumusha etafuleni ukuze uhlele umbhalo — izinguquko zigcinwa kumshini wakho futhi ziyasinda ekuvuseleleni. Vala ikhasi phakathi nohambo futhi uzonikezwa ithuba lokuqalisa kabula lapho lishiye khona. Lapho umusho owodwa uthatha imigqa eminingana, iqembu lihlanganiswa, lihunyushwe futhi ligcwaliswe ngesikhathi."
    ],
    "img": {
     "file": "translate-workspace",
     "alt": "Indawo yokusebenzela yokuhumusha: umucu wezibalo, ibha yenqubelaphambili netafula lama-subtitle elihlelekayo",
     "cap": "Indawo yokusebenzela ephakathi nendawo: umucu wezibalo + ibha yenqubelaphambili + chofoza ukuze uhlele itafula lama-subtitle"
    }
   },
   {
    "h2": "Thumela",
    "ps": [
     "Kukholomu engakwesokudla khetha ifomu lokuqukethwe kuqala: ukuhumusha kuphela (kolimi olulodwa), ulimi olubili olunomthombo phezulu, noma ulimi olubili olunokuhumusha phezulu; bese kuba yifomethi yefayela: i-SRT, WebVTT, SBV, ASS noma i-TXT. Ukukhetha i-ASS kungeza izakhiwo ezimbili: izikrini ezehlukene ezingaphezulu/ezansi kanye nemigqa enqwabelene engezansi. Okuqukethwe nefomethi kuhlangana ngokukhululekile ezitayeleni zokuthumela eziyi-14. Ububanzi bomugqa wolimi olubili bubekwa ngokwahlukana. Chofoza u-\"Landa ama-subtitle\" ukuze ulondoloze ifayela, noma u-\"Kopisha ebhodini lokunamathisela\" ukuze ulinamathisele ngokushesha."
    ],
    "img": {
     "file": "translate-export",
     "alt": "Iphaneli yokuthumela: amafomu okuqukethwe amathathu, amafomethi wefayela ayisihlanu nezilungiselelo zobubanzi bomugqa wolimi olubili",
     "cap": "Ukuthumela ikholomu engakwesokudla: khetha ifomu lokuqukethwe kuqala, bese kuba yifomethi yefayela"
    }
   },
   {
    "h2": "Izindleko kanye nobumfihlo",
    "ps": [
     "Imodeli ezenzakalelayo ayidingi ukubhaliswa futhi ayidingi ukhiye — isebenza ngaphandle kwebhokisi ngamaqoqo omcelo ngamunye: umkhawulo wansuku zonke nge-IP kanye nesibonelelo sansuku zonke sesayithi lonke. Kumafayela amakhulu, faka ukhiye wakho we-API ngaphansi \"Kokusebenza kokuhumusha\". Ubumfihlo, ngokwesaziso esisekhasini: ama-subtitle emodeli ezenzakalelayo adluliswa ngeseva yalesi sayithi kumnikezeli; i-API yangokwezifiso iphethwa ngqo ngumnikezeli owufakayo, futhi ukhiye uhlala esipheqululini sakho. Ukuhlaziya, ukugoqa imigqa kanye nesakhiwo sezilimi ezimbili konke kuqhubeka endaweni esipheqululini."
    ]
   },
   {
    "h2": "Imibuzo Ebuzwa Njalo",
    "ps": [
     "**Ezinye izilimi zixubene ekuhumusheni?** Ithuluzi lithola ukukhubeka kolimi futhi lihumusha kabusha ngokuzenzakalelayo; uma imigqa embalwa isebonakala ingalungile, chofoza iseli bese uyilungisa ngesandla.",
     "**Kunjani ngemigqa yezingoma?** \"Ukuhlunga okuqukethwe\" kunikeza izinketho ezintathu zezingoma: humusha izingoma, gcina umthombo noma uzisuse.",
     "**Ukuhunyushwa kwamagama okungahambisani?** Engeza izipelingi ezingahambisani ku-gilosari bese uhumusha futhi; igilosari ithatha kuqala phezu kwesilungiselelo somhlaba wonke \"sokuphatha amagama afanele\".",
     "**Ufuna isiNgisi phezulu nesiShayina ngezansi?** Khetha u-\"Ulimi olubili · umthombo phezulu\" lapho uthumela; kwesiShayina phezulu nesiNgisi ngezansi, khetha u-\"Ulimi olubili · ukuhumusha phezulu\"."
    ]
   },
   {
    "h2": "Amathuluzi ahlobene nemihlahlandlela",
    "ps": [
     "Ifomethi engalungile? Qala ngokuthi [[ukuguqulwa kwefomethi|/convert.html]]; umugqa wesikhathi ungalungile? Sebenzisa [[ukukulungiswa komugqa wesikhathi|/shift.html]]; ngaphambi kokuyinikela, yidlulise [[kuhlolwa kwezinga lama-subtitle|/guides/subtitle-quality-check.html]]."
    ]
   }
  ]
 },
 "translate-english-to-chinese": {
  "seo": {
   "title": "Humusha amaSubtitles esiNgisi aye esiShayini – AI-SRTSub",
   "desc": "Humusha amaSubtitles esiNgisi aye esiShayini: layisha i-SRT/VTT/ASS, khetha isiShayini Esilula noma Esidala, bese ukhipha amaSubtitles esiShayini sodwa noma awolimi olubili. – AI-SRTSub",
   "h1": "Humusha amaSubtitles esiNgisi aye esiShayini",
   "intro": "I-SRT yesiNgisi ingena, amaSubtitles esiShayini (noma amawesiNgisi nesiShayini olulimi olubili) aphuma: layisha, khetha ulimi oluhlosiwe, khipha — konke ekhasini elilodwa.",
   "ctaText": "Humusha amaSubtitles esiNgisi"
  },
  "body": [
   {
    "h2": "Uma uwadinga",
    "ps": [
     "I-subtitles oyilandile ingesiNgisi sodwa futhi awukwazi ukuhambisana nayo; noma ufuna amaSubtitles esiShayini amalungu omndeni angayifundi isiNgisi. Okudingayo kuza ngendlela kwezintathu — **amaSubtitles esiShayini sodwa**, noma amaSubtitles wolimi olubili anokuthi **isiShayini phezulu, isiNgisi ngezansi** noma **isiNgisi phezulu, isiShayini ngezansi** — futhi leli thuluzi likhipha zontathu."
    ]
   },
   {
    "h2": "Indlela yokukwenza",
    "ps": [
     "Vula i-[[Mhumushi we-Subtitle we-AI|/translate.html]] bese uconsa ifayela lakho le-subtitle yesiNgisi (i-SRT, VTT, ASS, SSA, SBV ne-TXT konke kuyaziwa, noma vele unamathisele umbhalo). Shiya u-\"Source language\" ekutholeni ngokuzenzakalelayo, setha u-\"Target language\" abe isiShayini Esilula noma Esidala, bese uchofoza u-\"▶ Start translating\". Uma sekuqedile, khetha uhlobo lokuqukethwe kuphaneli yokuthekelisa kwesokudla: ukuhumusha kuphela (olulimi olulodwa), ulimi olubili · okwangempela phezulu (isiNgisi ngenhla, isiShayini ngezansi), noma ulimi olubili · ukuhumusha phezulu (isiShayini ngenhla, isiNgisi ngezansi), bese ukhetha ifomethi yefayela bese ulanda."
    ],
    "img": {
     "file": "translate-export",
     "alt": "Iphaneli yokuthekelisa: ukuhumusha kuphela, ulimi olubili olunesiNgisi phezulu, nolimi olubili olunesiShayini phezulu",
     "cap": "Khetha uhlobo lokuqukethwe lapho uthekelisa: isiShayini sodwa, noma ulimi olubili lwesiNgisi phezulu / isiShayini phezulu"
    }
   },
   {
    "h2": "Izinkinga ezimbili ezivamile",
    "ps": [
     "**Amagama ahunyushwe ngokungaguquguquki?** I-AI ihumusha ngamaqoqo, ngakho igama elifanayo lingaphuma ngezindlela ezimbili. Faka amabili “source → translated name” kuhlu lwamagama (isb. `Watson → Huasheng`) ukuze ugcine kufana kuyo yonke indawo.",
     "**Ama-subtitles aphambene nesithombe?** Humusha kuqala, bese ulungisa isikhathi: ithuluzi lesikhathi phezulu kwendawo yokusebenza linokulawula komhlaba wonke kwe-offset kanye ne-scale — bheka i-[[Ama-subtitles aphuma ekuhambisaneni ekugcineni|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "videosub": {
  "seo": {
   "title": "Ukukhipha ama-subtitles evidiyo ashumekiwe – ama-tracks e-MKV / MP4 – AI-SRTSub",
   "desc": "Funda ama-tracks e-subtitle ngaphakathi kwe-MKV, WebM, MP4 ne-MOV ngokuqondile bese uthekelisa i-SRT / VTT / ASS / TXT. Akukho kulayisha, akukho ukuguqula, zonke izilimi zibaliwe, ama-subtitles wezithombe ayabizwa.",
   "h1": "Uyikhipha kanjani ama-subtitles ashumekwe kuvidiyo",
   "intro": "Funda ithrekhi ye-subtitle evalelelwe ngaphakathi kwe-MKV / MP4 ngqo njenge-SRT — ividiyo ayilayishwa nhlobo, konke kufundwa esipheqululini.",
   "ctaText": "Vula ukukhishwa kwe-subtitle yevidiyo"
  },
  "body": [
   {
    "h2": "Lokho okwenziwa yileli thuluzi",
    "ps": [
     "Ama-subtitles angavalelwa ngaphakathi kwefayela levidiyo esikhundleni sokuma wodwa. Ukuze uhlele, uhumushe noma uwahlanganise kufanele uqale uwakhiphe — yilokho kanye okwenziwa yileli khasi."
    ]
   },
   {
    "h2": "1 Engeza ividiyo",
    "ps": [
     "Hudula ifayela levidiyo uye kukholomu yokuqala noma uchofoze ukuze ukhethe elodwa. **MKV / WebM** ne-**MP4 / MOV** kuphela eziqashelwayo; amanye amakhontenti ngeke akhiphe lutho.",
     "Ifayela aliphumi kwikhompyutha yakho — asikho isinyathelo sokulayisha. Ithuluzi lifunda ngeziqephu ezincane ngama-offset, ngakho ifilimu enkulu ayigcwalisi imemori, kodwa ukufunda kokuqala kumele skene ulwazi lwetrekhi kanye."
    ],
    "img": {
     "file": "videosub-up",
     "alt": "Indawo yokungeza ividiyo yekhasi lokukhipha i-subtitle eshumekiwe",
     "cap": "I-MKV / WebM ne-MP4 / MOV ziyasekelwa, futhi ifayela aliphumi kumshini wakho"
    }
   },
   {
    "h2": "2 Ama-tracks e-subtitle ashumekiwe",
    "ps": [
     "Uma ukufunda kuqedile, ikholomu yesibili ibala ama-tracks e-subtitle afakwe efayeleni **elinye ngalinye ngomugqa**, ngokuvamile nolimi kanye negama le-trakhi (isibonelo \"IsiShayini\", \"IsiNgisi\", \"Okungaphandle\"). Chofoza umugqa ukuze ukhiphe leyo trekhi.",
     "Uma ifayela line-trakhi eyodwa ye-subtitle, ukukhishwa kuqala ngokuzenzakalelayo — akukho ukuchofoza okudingekayo.",
     "**Ama-subtitles ezithombe awakwazi ukukhishwa**: Ama-subtitles e-Blu-ray PGS ne-DVD izithombe ezishiswe kusikrini ngaphandle kombhalo okumele uthathe, futhi ikhasi lisho kanjalo ngokusobala; lawo adinga i-OCR."
    ],
    "img": {
     "file": "videosub-track",
     "alt": "Uhlu lwama-tracks e-subtitle ashumekiwe, elilodwa ngomugqa",
     "cap": "Ithrekhi eyodwa ngomugqa ngamunye; uma kukhona eyodwa kuphela, ukukhishwa kuqala ngokuzenzakalelayo"
    }
   },
   {
    "h2": "3 Umphumela",
    "ps": [
     "\"3 Result\" kwesokudla ikhombisa umbhalo we-subtitle okhishiwe, kanye nefomethi yokuthekelisa ngaphezulu kwayo: **SRT / VTT / ASS / TXT**. Chofoza u-\"Download\" noma u-\"Copy\".",
     "Uma ithrekhi yomthombo ingeyase-ASS, isihloko sayo sesitayela kanye nokulungiswa kubuyela kungashintshile — ukuthekelisa njenge-ASS kugcina zona, kuyilapho ukuthekelisa njenge-SRT kuphatha umbhalo kuphela."
    ],
    "img": {
     "file": "videosub-out",
     "alt": "Indawo yomphumela enokukhethwa kwefomethi ye-SRT / VTT / ASS / TXT",
     "cap": "Amafomethi amane wokuthekelisa; umthombo we-ASS ugcina isihloko sawo sesitayela nokulungiswa"
    }
   },
   {
    "h2": "Okushiywe kungathintwanga",
    "ps": [
     "Ifayela levidiyo uqobo alithintwa nhlobo — ukufunda kuphela, akukho ukubhala, akukho ukuguqula, akukho ukuxuba kabusha.",
     "Okuqukethwe kwe-subtitle kuphuma njengoba kunje: akukho ukuqagela kwekhodi, akukho ukulungiswa kwesikhathi. Uma ama-subtitles akhishiwe ephazamisekile, lena yinkinga yokubhala ngefomethi kwitrekhi yomthombo — yiyise ku-[[Ukulungiswa kombhalo ophazamisekile|/repair.html]]."
    ]
   },
   {
    "h2": "Imibuzo ejwayelekile",
    "ps": [
     "**Ingabe akukho ndlela ngempela yokuphatha ama-subtitles ezithombe (PGS / DVD)?** Akukho kuleli khasi — ziyizithombe ezingenaso isendlalelo sombhalo. I-OCR kumele iqale, futhi leli khasi alikwenzi lokho.",
     "**Ama-subtitles akhishiwe awanesikhathi esifanele — kungani?** Leli khasi alilungisi izikhathi; okuphumayo yilokho okwakukhona lapho. Ukuze uthole i-offset yomhlaba wonke noma inkinga yesilinganiso sebenzisa [[Ukulungiswa kwesikhathi|/shift.html]].",
     "**Kungani kuthatha isikhathi eside ngaphambi kokuba kwenzeke lutho?** Ifayela elikhulu kumele skenwe isiqephu ngesiqephu ngolwazi lwetrekhi, futhi uma lifayela likhulu kulapho kuthatha isikhathi eside; lokhu kwenzeka endaweni yangakini futhi akuhlangene nokuxhumana kwakho.",
     "**Ngingasebenzisa leli khasi amafayela e-subtitle angaphandle?** Awudingi — i-.srt / .ass yangaphandle ingena ngqo ku-[[Ukuguqulwa kwefomethi|/convert.html]] noma elinye ithuluzi. Leli khasi elama-subtitles avalelwe ngaphakathi kwevidiyo."
    ]
   },
   {
    "h2": "Ukugcinwa kuyimfihlo",
    "ps": [
     "Ividiyo ifundwa ngokuphelele esipheqululini: akukho okulayishwile, akukho okuguquliwe, akukho okudlula kwiseva. Vala ikhasi bese idatha eyayifundwa ikhululwa."
    ]
   },
   {
    "h2": "Amathuluzi ahlobene nemihlahlandlela",
    "ps": [
     "Ukuze uhumushe lokho okukhiphayo hamba ku-[[Ukuhunyushwa kwe-subtitle|/translate.html]], ukuze kuyenze ulimi olubili bona [[Izindlela ezimbili zokwenza ama-subtitles wolimi olubili|/guides/make-bilingual-subtitles.html]]; ngomehluko phakathi kwama-tracks ashumekiwe nangaphandle, nokuthi yimaphi angakhipha, bona [[Ungawakhipha kanjani ama-subtitles kuvidiyo|/guides/extract-subtitles-from-video.html]]."
    ]
   }
  ]
 },
 "vtt-to-srt": {
  "seo": {
   "title": "Isiguquli se-VTT kuya ku-SRT – Guqula amaSubtitles e-WebVTT – AI-SRTSub",
   "desc": "Guqula amaSubtitles e-VTT (WebVTT) abe yi-SRT yabahleli nabadlali abamukela i-SRT kuphela. Isihloko se-WEBVTT namabhulokhi e-NOTE ahlanzwa ngokuzenzakalelayo. Kusebenza esipheqululini sakho.",
   "h1": "VTT kuya ku-SRT",
   "intro": "Guqula amaSubtitles e-VTT (WebVTT) abe yi-SRT: donsela ifayela, khetha i-SRT, landa. Isihloko namabhulokhi wamanothi ahlanzwa futhi izitembu zesikhathi zibuyela kusetshenziswa ukumaka komvuli (comma).",
   "ctaText": "Guqula i-VTT → SRT"
  },
  "body": [
   {
    "h2": "Uma udinga i-SRT futhi",
    "ps": [
     "I-CapCut, i-Premiere, abadlali abaningi bedeskhtophu, namathuluzi amadala ama-subtitles amukela **i-SRT** kuphela. Ama-subtitles alandiwe kuwebhu noma ku-YouTube avame ukuza njenge-VTT — guqula abe yi-SRT ukuze uwungenise ngqo."
    ]
   },
   {
    "h2": "Okuhlanjululwayo ku-VTT",
    "ps": [
     "Umugqa wesihloko se-**WEBVTT**, amabhulokhi e-NOTE, amabhulokhi e-STYLE/REGION, nezilungiselelo zekhiwe ngemva komugqa wesikhathi (njenge-align:start) akuwona umbhalo wama-subtitles — alahlwa ngokuzenzakalelayo; ukubalwa kuyabuyiselwa futhi isihlukanisi samasekhondi ayizinkulungwane sibuyela kusuka kumaphuzu (dot) kuya kumvuli (comma)."
    ],
    "img": {
     "file": "convert-upload-vtt",
     "alt": "Indawo yokulayisha: ifayela le-VTT lilayishiwe, litholwe njenge-VTT",
     "cap": "Ifayela elinesihloko se-WEBVTT litholwa njenge-VTT ngokushesha"
    }
   },
   {
    "h2": "Ungayiguqula kanjani",
    "ps": [
     "Vula [[isiguquli|/convert.html]], faka i-VTT, khetha **SRT - SubRip** njengokukhiphayo, bese uguqula bese ulanda. Umbhalo namavelu esikhathi ahlala engathintwanga."
    ],
    "img": {
     "file": "convert-result-srt",
     "alt": "Umphumela wokuguqula: ukubalwa kwe-SRT nezitembu zesikhathi ezine-comma",
     "cap": "I-SRT eguquliwe: izinombolo zekhiwe + izitembu zesikhathi ezine-comma"
    }
   }
  ]
 }
};
