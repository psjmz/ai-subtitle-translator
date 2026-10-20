/* i18n/gd-xh.js —— 43 篇指南页的xh译文（由 _mkgd.js 生成，勿手改）
 * 源：_gd/xh.json（Gemini 翻译，_gemgd.js 产出）
 * 结构：{ <slug>: { seo:{title,desc,h1,intro,ctaText}, body:[{h2,ps[],img}] } }
 * ⚠️ server.js 自己 require 它，不被任何 html 引用 —— 部署时必须显式加进传输列表。
 */
module.exports = {
 "ass-to-srt": {
  "seo": {
   "title": "I-ASS ukuya kwi-SRT Converter – Guqulela i-ASS/SSA Subtitles – AI-SRTSub",
   "desc": "Guqulela i-ASS (kunye ne-SSA) subtitles ibe yeyona SRT icocekileyo: isicatshulwa nexesha zikhutshwa njengoko zinjalo, izihlomelo zesitayile zihlala ngasemva. Yeyesoftware eyamkela i-SRT kuphela. Iqhuba kwisikhangeli sakho (browser).",
   "h1": "I-ASS ukuya kwi-SRT",
   "intro": "Guqula i-ASS (okanye i-SSA) subtitles zibe yi-SRT: lahla ifayile, khetha i-SRT, khuphela. Isicatshulwa nexesha zikhutshwa njengoko zinjalo; izihlomelo zesitayile azidluleli ngaphambili.",
   "ctaText": "Guqulela i-ASS → SRT"
  },
  "body": [
   {
    "h2": "Xa ufuna i-SRT yakho ibuyile",
    "ps": [
     "Iisiteji zokuhlela, iibhokisi zokuseta phezulu (set-top boxes), izidlali ze-TV, izixhobo zokuguqulela — amanqinibe amaninzi ngaphantsi amkela i-**SRT** kuphela. Ukuhlobisa okuqaqambileyo kunye nokubekwa endaweni kwi-ASS akunamseko apho, ngoko ke i-SRT icocekileyo yeyona ndlela ikhuselekileyo yokunikezela."
    ]
   },
   {
    "h2": "Kwenzeka ntoni kwizihlomelo zesitayile",
    "ps": [
     "Isalathiso ngasinye se-ASS ngumgca woNcoko (Dialogue line) oqulethe izihlomelo zokubethelela ezifana no-`{\\fonts}` wombala, intshukumo, okanye iziphumo. Ukuguqulela kwi-SRT **kuphosa ezi zihlomelo kunye nesitayile**, kugcina isicatshulwa nexesha kuphela; ukwahlula imigca oku-`\\N` kuba kukwahlula imigca yokwenene. Iifayile ze-SSA nazo ziyafunda."
    ],
    "img": {
     "file": "convert-result-srt",
     "alt": "Isiphumo soguqulo: Inombolo ye-SRT kunye nesicatshulwa esikhutshwe kwi-ASS",
     "cap": "I-SRT ekhutshiweyo: inombolo enye ngesalathiso ngasinye, isicatshulwa esicocekileyo"
    }
   },
   {
    "h2": "Uyiguqulela njani",
    "ps": [
     "Vula [[isiguquli|/convert.html]], faka ifayile ye-ASS phakathi (.ssa iyasebenza nayo), khetha u-**SRT - SubRip** njengesiphumo, emva koko guqulela uze ukhuphele. Ukuba uhamba kwelinye icala? Bona [[i-SRT ukuya kwi-ASS|/guides/srt-to-ass.html]]."
    ]
   }
  ]
 },
 "batch": {
  "seo": {
   "title": "Uyenza njani iBatch Convert yeSubtitles – Amakhulu abe yiZIP enye – AI-SRTSub",
   "desc": "Umkhombandlela: faka amashumi eefayile ze-SRT/VTT, ziguqulele kufomati enye, ukhuphele i-ZIP enye. Zinaniwe ngokutsha, amaxesha aqhelekanisiwe, iifayile ezingaqondakaliyo ziphawuliwe endaweni yokungena ngendluba kwi-archive.",
   "h1": "Uyenza njani i-batch convert subtitles",
   "intro": "Ixesha lonke le-subtitles liqhele ukuphelela kufomati enye, kwaye ukuzilayisha inye ngenye kuthatha ixesha elide. Zifake zonke apha, ziguqule enye kwaye ukhuphele i-ZIP enye — iifayile ezingenakufundeka ziyaqapheliswa, azize zibanjwe ngasese ngathi zisebenze.",
   "ctaText": "Vula i-batch conversion"
  },
  "body": [
   {
    "h2": "Oku kwenziwa sesi sixhobo",
    "ps": [
     "I-subtitles zexesha lonke okanye ibhokisi yeseti zihlala zifuna ukufana ngaphambi kokuba kwenzeke nantoni na kuzo. Nantsi le nto eyenziwa yiphepha le-batch:"
    ]
   },
   {
    "h2": "Ukongeza iifayile",
    "ps": [
     "Tsala iifayile ze-subtitle ezininzi zibe kwiibhokisi ezinethephu kunye, okanye ucofe kwaye ukhethe ezininzi ngexesha elinye. Uluhlu lweefayile lubonisa nganye nganye: ezifundiweyo zibonisa inani lesalathiso sazo, ezingafundekanga ziphawulwe ngokulula njengezingaqondakaliyo. Ibha ephezulu ibala inani leefayile, inani lesalathiso kunye nexesha elingaqondakaliyo.",
     "⚠️ Eli phepha lifunda i-UTF-8 kuphela. Nantoni na enekhowudi eyaphukileyo (iscreen esizele yimibuzo okanye iibhokisi) kufanele ihambe ngo[[Ulungiso lwe-Mojibake|/repair.html]] kuqala."
    ],
    "img": {
     "file": "batch-list",
     "alt": "Uluhlu lweefayile: igama kunye nenani lesalathiso ngefayile nganye, ezingaqondakaliyo ziphawulwe ngombala obomvu",
     "cap": "Ifayile nganye idweliswe, kwaye ezingaqondakaliyo ziphawulwe kwindawo"
    }
   },
   {
    "h2": "Yintoni enokuguqulelwa kuyo yonke into",
    "ps": [
     "Khetha ifomati ekujoliswe kuyo phantsi ko-\"Convert all to\" — i-SRT okanye i-VTT. Ifayile nganye kuluhlu iphinda yenziwe ngaloo fomati: amanani esalathiso ahlaziywa ukususela phezulu, amaxesha aqhelekaniswa nendawo ekujoliswe kuyo (i-SRT yahlula amawaka wesibini ngekoma, i-VTT ngethontsi).",
     "**Amagama wokuqala weefayile ayagcinwa kwaye kuphela isandiso esitshintshayo**; amagama aphindaphindiweyo afumana inombolo eyongeziweyo ukuze kungabikho nto ithabathela enye indawo."
    ],
    "img": {
     "file": "batch-up",
     "alt": "Isikhethi sefomati ekujoliswe kuyo kunye nesimo soluhlu, kunye nebha yezibalo ebonisa inani leefayile nesalathiso",
     "cap": "Khetha ifomati ekujoliswe kuyo kwaye ifayile nganye iyazizalisa ngokutsha; amagama wokuqala atshintsha kuphela isandiso"
    }
   },
   {
    "h2": "Ukupakisha nokukhuphela",
    "ps": [
     "Cofa u-\"Pack into one ZIP and download\" kwaye i-archive iqulethe ifayile nganye eguqulelweyo. **Iifayile ezingenazalathiso zaziwayo zihlala ngaphandle kwe-archive** — zihlala kuluhlu, ziphawuliwe, endaweni yokuba zixutywe ngathi ziphumelele. Nje ukuba zipakishwe, ufumana inani leefayile ezingaphakathi."
    ],
    "img": {
     "file": "batch-zip",
     "alt": "Indawo yokupakisha: iqhosha lokukhuphela le-ZIP kunye nomyalezo wesiphumo sokupakisha",
     "cap": "Iifayile ezingaqondakaliyo zihlala ngaphandle kwe-archive kwaye zihlala ziphawuliwe kuluhlu"
    }
   },
   {
    "h2": "Kutheni ifayile iphawulwa njengezingaqondakaliyo",
    "ps": [
     "Ifayile iphawulwa xa kungekho zisalathiso zinokufundwa kuyo. Izizathu ezintathu eziqhelekileyo: asiyo subtitle konke konke (masithi i-.txt readme elahlekileyo), ikhowudi asiyo UTF-8 (ngoko ifundeka njengeempawu zokutshintsha kuphela), okanye umxholo wenziwe ibhuloko enye engenamaxesha.",
     "Iifayile eziphawuliweyo zinokuphathwa ngenyathelo ngalinye: iingxaki zekhowudi ziya [[Ulungiso lwe-Mojibake|/repair.html]], iingxaki zefomati ziya [[Isiguquli sefomati|/convert.html]] zenzwe zodwa ngaphambi kokuba zibuyele kuluhlu."
    ]
   },
   {
    "h2": "I-FAQ",
    "ps": [
     "**Ndingongeza iifayile ezingaphi?** Akukho mda uqinileyo; kuxhomekeke kwimemori yesikhangeli sakho, kwaye amakhulu ambalwa weefayile ze-SRT zihlala zilungile.",
     "**Ingaba kuyatshintsha uncoko lwam?** Hayi. Ukuguqula i-batch kutshintsha kuphela ifomati yesiqu — ukuhlaziya amanani esalathiso kunye nokuqhelekanisa amaxesha — akaze litshintshe negama elinye loncoko.",
     "**Kuthekani ukuba ndifuna ukutshintsha umxholo?** Eli phepha liguqula iifomati kuphela. Ukutshintsha ixesha ngobuninzi sebenzisa [[Ulungiso lwesixesha|/shift.html]]; ukutshintsha amagama sebenzisa [[Ulungiso lwamagama|/glossary.html]]; zombini zisebenza ifayile ngefayile.",
     "**Ingaba i-ASS iyaxhaswa?** Eli phepha liguqulela phakathi kwe-SRT ne-VTT kuphela. I-ASS iphethe isitayile — sebenzisa [[Isiguquli sefomati|/convert.html]] kuyo yodwa."
    ]
   },
   {
    "h2": "Imfihlo",
    "ps": [
     "Ukuguqula nokupakisha kuqhuba ngokupheleleyo kwisikhangeli sakho. Akukho mxholo we-subtitle ohlala uthunyelwa kuseva."
    ]
   },
   {
    "h2": "Izixhobo ezihambelanayo nezikhombandlela",
    "ps": [
     "Kufuneka utshintshe ntoni kwixesha lonke nakuluphi udibano — [[Ukuhlela i-batch yesizini epheleleyo ye-subtitles|/guides/batch-convert-srt.html]]; iifomati ezingakumbi zefayile enye — [[Isiguquli sefomati|/convert.html]]; ukuhlola kwispredishithi — [[Subtitle ⇄ table|/table.html]]."
    ]
   }
  ]
 },
 "batch-convert-srt": {
  "seo": {
   "title": "Ukuhlela i-Batch yeSizini ePheleleyo – Yintoni Esebenzayo, Yintoni Engasebenziyo – AI-SRTSub",
   "desc": "Ixesha lihlala lifuna utshintsho olufanayo kuyo yonke indawo: ifomati efanayo, i-offset yexesha, igama. Nantsi le nto iphelelayo ngelixa linye, engenakukwazi, nendlela yokuphatha iifayile ezingaphumelele ukufundeka.",
   "h1": "Ukuhlela i-batch yesizini epheleleyo ye-subtitles",
   "intro": "Xa amashumi eefayile ze-subtitle zidinga utshintsho, lihlala lizinga elifanayo ngalo lonke ixesha. Ukwazi ukuba yeyiphi inxalenye enokwenziwa ngexesha linye kugcina ixesha elininzi kunokusebenza inye ngenye.",
   "ctaText": "Vula i-batch conversion"
  },
  "body": [
   {
    "h2": "Ngokuqhelekileyo luhlobo olunye lwenkcazo kuyo yonke indawo",
    "ps": [
     "Xa i-subtitles zingahambi kakuhle kwixesha lonke, isiqendu ngasinye sinengxaki yaso encinci — lihlala luyimbangela enye ehlasela isiqendu ngasinye: iqela elifanayo elikhululayo libhale zonke (ngoko ifomati neempawu zihambelana), zonke zazakhelwe kwinguqulelo yevidiyo enye (ngoko isikhombisi kunye nobukhulu bayo buyavumelana), okanye ukuguqulelwa kwaphuka kwisizini yonke.",
     "Hlola iziqendu ezimbini kuqala — esinye kwasekuqaleni, esinye kwasekumacala — uqiniseke ukuba yinyaniso **eyona ngxaki** ngaphambi kokwenza i-batch. Ukuba azivumelani, oku akuyonto inokulungiswa yi-batch."
    ]
   },
   {
    "h2": "Into enokwenziwa ngexesha linye",
    "ps": [
     "**Ukumanya ifomati** yiyo kuphela into egqiba ngokwenene ngexesha linye: tsala amashumi eefayile ze-SRT ne-VTT ku-[[Batch conversion|/batch.html]] kunye, khetha ifomati ekujoliswe kuyo uze ukhuphele i-ZIP enye. Ukuhlaziya amanani kunye nokulinganisa amaxesha kwenzeka kuloo nyathelo linye, kwaye akukho gama linye loncoko elitshintshayo."
    ],
    "img": {
     "file": "batch-list",
     "alt": "Uluhlu lweefayile zephepha le-batch: inani lesalathiso ngefayile, ezingafundekanga ziphawulwe ngombala obomvu",
     "cap": "Ifomati efanayo yinto enye egqiba ngokwenene ngexesha elinye"
    }
   },
   {
    "h2": "Into ekufuneka yenziwe ifayile ngefayile",
    "ps": [
     "Ezi azinenkcazo yase-batch kwaye zidinga udlulo ngefayile nganye — nangona ngokuqhelekileyo kukho enye efanayo **ekufuneka yenziwe kanye kuphela ize isebenze kwisizini yonke**:"
    ]
   },
   {
    "h2": "Fumana iodolo elungileyo",
    "ps": [
     "Xa izinto ezininzi zidinga ukwenziwa, iodolo engeyiyo ithetha ukwenza kwakhona. Hamba ngale odolo:",
     "**Lungisa ikhowudi** → **manya ifomati** → **tshintsha umxholo** (iimpawu, amagama, ixesha) → **QC ekugqibeleni**. Ukuguqula iifomati ngaphambi kokulungisa ikhowudi kunika kuphela i-mojibake kwisitya esahlukileyo; ukutshintsha umxholo ngaphambi kokumanya iifomati kuthetha ukusebenza ngezixhobo ezingahambelaniyo."
    ],
    "img": {
     "file": "batch-zip",
     "alt": "Indawo yokupakisha: iqhosha lokukhuphela le-ZIP kunye nomyalezo wesiphumo",
     "cap": "Manya iifomati kuqala, tshintsha umxholo emva koko"
    }
   },
   {
    "h2": "Ukuphatha iifayile ezingazange ziqondwe",
    "ps": [
     "Iifayile eziphawulwe njengezingaqondakaliyo kwi-batch conversion zishiywe ngaphandle kwe-ZIP kwaye zihlala kuluhlu. Izizathu ezintathu eziqhelekileyo: asiyo fayile ye-subtitle (i-readme elahlekileyo), ikhowudi asiyo UTF-8, okanye umxholo wenziwe ibhuloko enye engenamaxesha.",
     "Iingxaki zekhowudi ziya [[Ulungiso lwe-Mojibake|/repair.html]] ngenyathelo ngalinye; iingxaki zefomati ziya [[Isiguquli sefomati|/convert.html]] ngaphambi kokuzibuyisela kuluhlu. **Musa ukunyanzela iifayile ezingaqondakaliyo kwi-archive ukulungiselela ukunyusa inani** — ukufumanisa ukuba isiqendu esilahlekileyo asikho kwisidlali sakho kubiza kakhulu kuneminithi egcinwa yiloo nto."
    ]
   },
   {
    "h2": "Izixhobo ezihambelanayo nezikhombandlela",
    "ps": [
     "Umkhombandlela opheleleyo we-batch — [[Uyenza njani i-batch convert subtitles|/guides/batch.html]]; ukulinganisa amaxesha — [[Uyenza njani ukulungisa ixesha le-subtitle|/guides/shift.html]]; udlulo lokugqibela ngaphambi kokuhambisa — [[Subtitle QC|/qc.html]]."
    ]
   }
  ]
 },
 "bilingual": {
  "seo": {
   "title": "Ukwahlula okanye ukuDibanisa iSubtitles eziLwimi-mbini – AI-SRTSub",
   "desc": "Indlela ezine zokususa i-subtitles ezilwimi-mbini: gcina umkhondo omnye kuphela, yahlula ibe ziifayile ezimbini, okanye dibanisa ibibe yisalathiso somgca ombini. Zombini iindlela zibonwa ngokuzenzekelayo, kwisikhangeli sakho.",
   "h1": "Uyisusa njani iSubtitles eziLwimi-mbini",
   "intro": "Ufuna ukwahlula i-subtitles ezilwimi-mbini, uzidibanise, okanye ugcine umkhondo omnye kuphela? Eli nqaku lihamba ngezindlela ezine: indlela ukufumanisa okusebenza ngayo, yeyiphi indlela ekufuneka uyikhethe, kunye nento oyifumanayo xa uthumela.",
   "ctaText": "Vula i-Bilingual Subtitle Stripper"
  },
  "body": [
   {
    "h2": "Yintoni le nto yenzelwe yona",
    "ps": [
     "Unale subtitles ezilwimi-mbini kodwa ufuna umkhondo omnye kuphela — okanye ngendlela eyahlukileyo, ufuna ukwahlula okanye ukudibanisa imikhondo emibini:"
    ]
   },
   {
    "h2": "Indlela Ezibonwa Ngayo Izinto eziLwimi-mbini",
    "ps": [
     "I-subtitles ezilwimi-mbini zemikhondo emibini ziza ngeendlela ezibini eziqhelekileyo, kwaye isixhobo siyazazi zombini — **ngaphandle kokuqikelela ulwimi**: **Uhlobo A (isalathiso esinye, imigca emibini)** sahlula imikhondo ngendlela yokubhala — i-kana, i-hangul, i-hanzi, i-Latin kunye nezinye iindlela, zilishumi zizonke; iindlela ezimbini ezahlukileyo zithetha ukuba zilwimi-mbini, kwaye eyokuqala ukuvela ibalwa njengento yokuqala. Indlela enye (umgca omude wesi-Chinese owongwe kabini, umzekelo) uphathwa njengolwimi olunye kwaye uyagcinwa njengoko unjalo. **Uhlobo B (izisalathiso ezimbini ezahlukileyo ezinexesha elifanayo)** sahlula imikhondo ngendawo — izisalathiso ezimbini kwixesha elinye zenza isibini, eyokuqala ibalwa njengento yokuqala, kunye nokudityaniswa okwabelana nge-alphabets yaseLatin, njengeNgesi-French okanye iNgesi-German, zohlulwa ngokuchanekileyo nakuzo. Xa kungekho mhlaba ulimi-mbini ofunyenweyo, iqhosha lokukhetha imowudi kunye neqhosha lokuQala zibuthuntu kunye nesaziso esicacileyo, ukuze ingaze inyanzeliswe ekwahluleni ngeziphumo ezingeziyo."
    ]
   },
   {
    "h2": "Iindlela eziNe",
    "ps": [
     "Khetha enye kwezine kwindawo yokukhetha “Uyifuna eyiphi?”: **Gcina eyokuqala kuphela** kunye **Gcina inguqulelo kuphela** nganye ivelisa ifayile enye; **Yahlula ibe ziifayile ezimbini** ivelisa ifayile yokuqala kunye nefayile yenguqulelo, kunye namagama eefayile abhalwe ngokuzenzekelayo `.orig` / `.dst` ukuthintela ukubhalela phezulu; **Dibanisa ibibe yisalathiso somgca ombini** iguqula isibini ngasinye sibe yisalathiso solwimi-mbini — eyokuqala kumgca omnye, inguqulelo komnye — ngelixa izibini zolwimi olunye zigcinwa njengoko zinjalo kwaye akukho mgca wesibini oziswayo. Xa utshintsha iindlela okanye iifomati zokuphuma, umxholo okhoyo uphinda uqale ngokuzenzekelayo — akukho mfuneko yokucoferha uQala kwakhona."
    ],
    "img": {
     "file": "bilingual-modes",
     "alt": "Ukukhetha imowudi kwi-bilingual stripper: gcina eyokuqala, gcina inguqulelo, yahlula ibe ziifayile ezimbini, dibanisa ibibe yisalathiso somgca ombini",
     "cap": "Iindlela ezine: gcina umkhondo omnye, yahlula ibe ziifayile ezimbini, okanye dibanisa ibibe yisalathiso somgca ombini"
    }
   },
   {
    "h2": "Input ne-Output",
    "ps": [
     "Ifunda iifomati ezisixhenxe — i-SRT, VTT, ASS, SSA, SBV, LRC, TXT (isandiso sefayile kuqala, ukuqonda umxholo njengokugcina) — kwaye ithumela ezine: i-SRT, VTT, ASS, TXT. Nawuphi na umxube we-input-output uyasebenza, ngoko ukuguqula phakathi kweefomati kwenzeka endleleni. Imigca ye-ASS `\\N` ibuyiselwa kwimigca yokwenene, kwaye izihlomelo zeziphumo ziyasuswa ekuthumeleni phakathi kweefomati."
    ]
   },
   {
    "h2": "Iziphumo kunye noThumelo",
    "ps": [
     "Iziphumo ziboniswa ngokupheleleyo kwibhokisi yesicatshulwa esifundekayo kuphela, ifayile nganye enenani lesalathiso kunye nezibalo zexesha elipheleleyo; amaqhosha oKhuphele noKopa athatha ifayile ngokuthe ngqo. Indawo yeziphumo yindawo yokujonga kuqala — akukho kuhlela kwesicatshulwa okanye kwexesha apha. Ukwenza utshintsho, thumela kuqala, uze usebenzise isixhobo esihambelanayo."
    ],
    "img": {
     "file": "bilingual-result",
     "alt": "Indawo yeziphumo zokususa: ukujonga kuqala okufundekayo kuphela, izibalo zenani lesalathiso, kunye namaqhosha okhuphelo/okopa",
     "cap": "Ukujonga kuqala isicatshulwa esipheleleyo + izibalo zesalathiso nexesha + ukhuphelo nokopa"
    }
   },
   {
    "h2": "I-FAQ",
    "ps": [
     "**Isalathiso sinesiNgesi kumgca omnye ne-French komnye — kutheni singayi kwahluka?** Uhlobo A sahlula imikhondo ngendlela yokubhala, ngoko iilwimi ezimbini ezabelana ngendlela enye ngaphakathi kwisalathiso esinye azinakwahlulwa. Yilungiselele njengeHlobo B (izisalathiso ezimbini kwixesha elinye) kwaye ukwahlula ngokwendawo kuyasebenza.",
     "**Ifayile enye kuphela ekukhupheleni?** “Gcina eyokuqala kuphela”, “Gcina inguqulelo kuphela” kunye “Dibanisa ibibe yisalathiso somgca ombini” nganye ivelisa ifayile enye ngokuyila; “Yahlula ibe ziifayile ezimbini” kuphela ekupha ezimbini, ezibhalwe `.orig` / `.dst`.",
     "**Ndingakwazi ukusebenza nge-batch?** Ifayile inye ngexesha; i-queues azixhaswa.",
     "**Ingaba ilayisha i-subtitles zam?** Hayi — ukufunda nokuthumela kuqhuba ngokupheleleyo kwisikhangeli sakho."
    ]
   },
   {
    "h2": "Izikhombandlela eziHambelanayo",
    "ps": [
     "Ngendlela ekhawulezayo yokwahlula imikhondo emibini bona [[Ukwahlula iSubtitles eziLwimi-mbini zibe yiMikhondo emiBini|/guides/split-bilingual-subtitles.html]]; malunga nendlela ezenziwa ngayo i-subtitles ezilwimi-mbini bona [[Iindlela eziBini zokuCela iSubtitles eziLwimi-mbini|/guides/make-bilingual-subtitles.html]]; ukuguqulela ngumatshini sebenzisa [[Ukuguqulelwa kweSubtitles nge-AI|/translate.html]]."
    ]
   }
  ]
 },
 "clean": {
  "seo": {
   "title": "Isicoci se-subtitle – susa iimpawu zokuthengisa, iintengiso, i-SDH – AI-SRTSub",
   "desc": "Isicoci se-subtitle: imigaqo 13 isusa iimpawu zokuthengisa, iintengiso, iingcaphaxo ze-SDH, izihlomelo ze-HTML, ukuphindaphinda; utshintsho ngalunye lunediff kwaye lunokubuyiselwa. SRT/VTT/ASS, konke kwisikhangeli.",
   "h1": "Uyisebenzisa njani isicoci se-subtitle",
   "intro": "I-subtitles ezikhutshelwe kwi-web zihlala zineempawu zokuthengisa, iintengiso kunye neengcaphaxo ze-SDH. Isicoci sisebenzisa imigaqo 13 ngexesha linye, kwaye utshintsho ngalunye lunediff kwaye luyabuyiseka.",
   "ctaText": "Vula isicoci se-subtitle"
  },
  "body": [
   {
    "h2": "Oku kwenziwa sesi sixhobo",
    "ps": [
     "Iifayile ze-subtitle ezikhutshelweyo zihlala zinezinto ezingafunekiyo. Isicoci siyazisusa ngomgaqo omnye:"
    ]
   },
   {
    "h2": "Layisha kwaye ufumanise",
    "ps": [
     "Tsala ifayile okanye cofa ukulayisha — SRT, VTT, ASS, SSA kunye ne-TXT zixhaswa — okanye ncamathisela isicatshulwa se-subtitle ngokuthe ngqo. Ikhowudi iyaziwa ngokuzenzekelayo: ukuba ukufunda kwe-UTF-8 kuvelisa iimpawu zokubuyisela, kuyabuyela kwi-GBK okanye ku-Big5, kwaye iphepha libonisa \"Encoding fixed as {encoding}\". Ukuba ulayisha i-subtitles ezilwimi-mbini zemikhondo emibini (amaxesha afanayo, enye isi-Chinese enye isiNgesi), zidityaniswa zibe ngumkhondo omnye wolwimi-mbini kunye nokukhetha \"eyokuqala phezulu / inguqulelo phezulu\"."
    ]
   },
   {
    "h2": "Ukulungelelanisa imigaqo 13",
    "ps": [
     "Ojongene naye unezintlu ezine ezine-13 checkboxes: **Izihlomelo nefomati** (iziqendu ze-ASS, izihlomelo ze-HTML, iimpawu zokulawula, hlaziya emva kohlelo), **I-SDH nezixhobo zomsindo** (iingcaphaxo ze-SDH, iimpawu zezithethi, imigca yengoma ecocekileyo), **Iimpawu zokuthengisa nezisalathiso ezingenamsebenzi** (iimpawu zokuthengisa nentengiso, izisalathiso eziphindaphindiweyo, izisalathiso ezingenanto), **Ulungiso lwesicatshulwa** (uphawu lokuphefumla kunye nesithuba, ulungiso lwamaqhosha amakhulu, dibanisa imigca emifutshane. Zizinto \"ezingalahlekiyo neziziqinisekileyo\" ezivuliweyo ngokuzenzekelayo; izinto ezinokuphosa umxholo (imigca yengoma, ulungiso lwamaqhosha, dibanisa imigca emifutshane) zivaliwe — ziphawule xa zifuneka. Into nganye ine-ⓘ yokunceda, kwaye naluphi na utshintsho lwe-checkbox luphinda luqhube ngoko nangoko."
    ],
    "img": {
     "file": "clean-opts",
     "alt": "Ojongene nokucoca: amaqela amane e-13 checkboxes, inani elisebenzayo liboniswa phezulu",
     "cap": "Amaqela amane, imigaqo 13; izinto ezingalahlekiyo kuphela ezivuliweyo ngokuzenzekelayo, utshintsho lusebenza ngoko nangoko"
    }
   },
   {
    "h2": "Utshintsho lwediff nokubuyisela",
    "ps": [
     "Iziphumo azibhalelwa phezulu ngokuthe ngqo: utshintsho ngalunye ludweliswe kwitheyibhile yediff kunye nophawu lomgaqo (kutheni esi salathiso sihleliwe okanye sacinywa). Ufuna enye ibuye? Cofa u-\"Restore\" kuloo mgca; u-\"Restore all\" ubuyisa konke ngokucofa kwaye ukucofa kwakhona kuphinda kusebenzise ukucoca okuphelele. Ibha yezibalo ibonisa amanani wokuqala / ecociweyo / acinyiweyo / ahloliweyo / abuyisiweyo."
    ],
    "img": {
     "file": "clean-diff",
     "alt": "Itheyibhile yediff yotshintsho: inani, ixesha, isicatshulwa sokuqala xa sithelekiswa nesecociweyo, uphawu lomgaqo kumgca ngamnye",
     "cap": "Utshintsho ngalunye luphatha uphawu lomgaqo; buyisela imigca enye okanye zonke ngaxeshanye"
    }
   },
   {
    "h2": "Ukujonga kuqala nokuthumela",
    "ps": [
     "Guqulela phakathi kokujonga \"Ecociweyo / Eyokuqala\". Kwimbonakalo yokuqala, izisalathiso ezicinyiweyo zicwecwe kwaye ziphawulwe \"Deleted\", kwaye ifayile ethunyelwayo ihambelana ngokuchanekileyo nombonakalo wokuqala. Iifomati zokuthumela: SRT (ezenzelwe ngokuzenzekelayo), VTT, ASS (iyakwazi ukufumaneka xa umxholo ungowe-ASS, kunye necandelo lesitayile ligcinwe njengoko linjalo), kunye ne-TXT yesicatshulwa esingenamaxesha. Igama lefayile lifumana uphawu `.clean` ngokuzenzekelayo."
    ],
    "img": {
     "file": "clean-preview",
     "alt": "Ukujonga kuqala isicatshulwa esipheleleyo: imbonakalo ecociweyo neyokuqala kunye nebha yezibalo ebonisa amanani",
     "cap": "Imbonakalo yokuqala emibini, le nto uyibonayo yiyo oyifumanayo"
    }
   },
   {
    "h2": "I-FAQ",
    "ps": [
     "**Ingaba iya kucima uncoko oluqhelekileyo ngempazamo?** Umgaqo wophawu lokuthengisa kuqala ususa imigca yophawu (ugcina imigca yoncoko ngaphakathi kwezisalathiso ezilwimi-mbini) kwaye ucima kuphela isisalathiso esipheleleyo ukuba kukho okuseleyo; ukususwa kwe-SDH kuchukumisa kuphela umxholo obiyelweyo onezivakalisi ze-SDH ezingama-40 iimpawu okanye ezimfutshane — uncoko oluqhelekileyo olubiyelweyo luhlala.",
     "**Zahlulwa njani imigca yengoma ecocekileyo kwiingoma ezingaphakathi concoko?** Zisalathiso kuphela apho umgca ngamnye uwotshelwe kwiinqaku zomculo ze-♪ okanye iimpawu ezifana no-[music] ezicinyiweyo; uncoko oluneengoma luyagcinwa.",
     "**Ingaba iimpawu zezithethi zinokuchaphazela isicatshulwa sesi-Chinese?** Igama elibhalwe ngamaqhosha amakhulu kuphela ekuqaleni komgca elandelwa yikholoni (njenge-`GEORGE:`) liyahambelana; izivakalisi zekholoni zesi-Chinese azize zizenze.",
     "**Ndingakwazi ukucoca iifayile ezininzi ngaxeshanye?** Hayi — ifayile enye ngomzamo ngamnye. Khuphela isiphumo, uze ulayishe elandelayo."
    ]
   },
   {
    "h2": "Imfihlo",
    "ps": [
     "Ukucoca kuqhuba ngokupheleleyo kwisikhangeli sakho; akukho mxholo we-subtitle ohlala uthunyelwa kuseva."
    ]
   },
   {
    "h2": "Izixhobo ezihambelanayo nezikhombandlela",
    "ps": [
     "Ngomkhombandlela omfutshane ogxile ekususeni iimpawu zokuthengisa neentengiso, bona [[susa iintengiso ze-subtitle kunye neempawu|/guides/remove-subtitle-ads.html]]; hamba ifayile yakho [[ukujonga umgangatho we-subtitle|/guides/subtitle-quality-check.html]] ngaphambi kokuyinikela; ukutshintsha iifomati sebenzisa [[ukuqulunqa iifomati|/convert.html]]."
    ]
   }
  ]
 },
 "convert": {
  "seo": {
   "title": "Uyiguqulela njani iFomati yeSubtitles (SRT, VTT, ASS, SBV, LRC, TXT) – AI-SRTSub",
   "desc": "Umkhombandlela oboniswayo wesiguquli: faka ifayile, hlola ifomati efunyenweyo, khetha ifomati yokuphuma, phatha isicatshulwa esilwimi-mbini, kwaye ukhuphele. Konke kuqhuba kwisikhangeli sakho.",
   "h1": "Umkhombandlela woSiguquli seFomati yeSubtitles",
   "intro": "Eli nqaku lihamba ngeqhosha ukususela phezulu ukuya ezantsi: layisha i-subtitle, qinisekisa ifomati efunyenweyo, khetha ifomati yokuphuma, kwaye ukhuphele. Konke kuqhuba kwisikhangeli sakho — akukho fayile ishiya isixhobo sakho.",
   "ctaText": "Vula isiguquli se-subtitle"
  },
  "body": [
   {
    "h2": "Layisha i-subtitles zakho",
    "ps": [
     "Tsala ifayile ebhokisini okanye cofa ukukhetha enye; unako kwakhona **ncamathisela umxholo** ngokuthe ngqo kwibhokisi yesicatshulwa. Ifomati ifunyenwa kuzo zombini isandiso nomxholo, kwaye isiphumo sibonisa kwisihloko sefomati."
    ],
    "img": {
     "file": "convert-upload",
     "alt": "Indawo yokulayisha: i-SRT yesampula elayishiweyo, efunyenwe njenge-SRT",
     "cap": "Ifomati efunyenweyo ibonisa kwisihloko — hlola apha kuqala ukuba unamathandabuzo"
    }
   },
   {
    "h2": "Khetha ifomati yokuphuma",
    "ps": [
     "Khetha ifomati ekujoliswe kuyo kwindawo yokukhetha: izinto ezisithandathu — srt, vtt, ass, sbv, lrc, txt. Ukuguqulela kwi-ass kwakha kwakhona isitayile esisemgangathweni esingu-1920×1080 (isicatshulwa esimhlophe, umda omnyama, ezantsi embikweni) kwaye **ayigcini imithombo yokuqala okanye imibala**; i-txt ithumela isicatshulwa kuphela, ngaphandle kwexesha."
    ],
    "img": {
     "file": "convert-opt",
     "alt": "Indawo yokukhetha ifomati yokuphuma ene-VTT ekhethiweyo",
     "cap": "Ifomati yokuphuma ayilandeli i-input — uyayikhetha wena"
    }
   },
   {
    "h2": "Ukuphatha iilwimi-mbini",
    "ps": [
     "Ukuba ifayile yeyolwimi-mbini (imigca emibini kwisafunwa sinye, okanye izisalathiso ezixubeneyo), imbonakalo igcinwa njengoko injalo ngexesha loguqulo. Ukukhetha \"gcina ulwimi-mbini\" kwahlula iilwimi ezimbini zibe ngumgca ongasentantsi nongasezantsi, ngamnye uphinda uwongwe wedwa; ulawulo alusebenzi xa kungekho zicatshulwa zolwimi-mbini ezifunyenweyo."
    ]
   },
   {
    "h2": "Guqulela uze ukhuphele",
    "ps": [
     "Cofa u-\"Convert\": iphaneli yeziphumo ibonisa inani lesalathiso kunye nexesha elipheleleyo, kunye nesicatshulwa esilungiselelwe ukuhlolwa. Cofa u-**Download** ukugcina ifayile, okanye u-**Copy** ukuthatha isicatshulwa ngokuthe ngqo. Uguqulelo aluzange lutshintshe naziphi na iishedyuli zexesha — lubhala kwakhona ifomati kuphela. Ukuhlaziya kwakhona izisalathiso, sebenzisa [[isixhobo sexesha|/shift.html]]."
    ],
    "img": {
     "file": "convert-result",
     "alt": "Iphaneli yeziphumo: inani lesalathiso kunye nexesha elipheleleyo kunye namaqhosha okhuphelo nokopa",
     "cap": "I-6 izisalathiso, i-0 :23 zizonke — jonga isicatshulwa ngaphambi kokuba ukhuphele"
    }
   }
  ]
 },
 "extract": {
  "seo": {
   "title": "Ukukhupha isicatshulwa esicocekileyo kwi-subtitles – Imbonakalo emibini, ukucoca okuhlanu – AI-SRTSub",
   "desc": "Khupha uncoko kwi-subtitles njengesicatshulwa esicocekileyo: imihlaba eqhubekayo okanye umgca omnye ngesalathiso ngasinye, kunye nento esuswa zizitshixo ezihlanu zezisalathiso ze-SDH, iimpawu zokuthengisa, ukuphindaphinda, izimamva kunye neengoma.",
   "h1": "Uyisusa njani isicatshulwa esicocekileyo kwi-subtitles",
   "intro": "Khipha uncoko kwifayile ye-subtitle njengesicatshulwa esicocekileyo: amanani esalathiso, amaxesha kunye nezihlomelo zesitayile zisuswa ngokuzenzekelayo, ngoko isiphumo sifundeka njengenqaku okanye sisebenza njengoluhlu loncoko.",
   "ctaText": "Vula isikhiphi sesicatshulwa esicocekileyo"
  },
  "body": [
   {
    "h2": "Oku kwenziwa sesi sixhobo",
    "ps": [
     "Uncoko kuphela kwifayile ye-subtitle olubalulekileyo kumfundi; okunye yisakhiwo esenzelwe isidlali — amanani esalathiso, amaxesha, izihlomelo zesitayile. Eli phepha lisusa isakhiwo kwaye ligcina amagama."
    ]
   },
   {
    "h2": "Yifake phakathi, hayi ukuyilayisha kuphela",
    "ps": [
     "Ikholamu ethi \"1 Add subtitles\" ngasekhohlo yamkela ifayile elayishiweyo, kwaye unako nokuncamathisela umxholo we-subtitle ngokuthe ngqo kwibhokisi yesicatshulwa. Ukuba ukhethe ifayile engeyiyo, cofa u-\"Clear\" uze uqale kwakhona.",
     "Eli phepha lifunda iifayile njenge-UTF-8. Ukuba i-subtitles zivuleka njengodonga lwemiqondiso yemibuzo okanye iibhokisi, ikhowudi eyaphukileyo — iguqulele ku-UTF-8 ku-[[Ulungiso lwesicatshulwa esingaqondakaliyo|/repair.html]] kuqala, uze ubuye."
    ],
    "img": {
     "file": "extract-up",
     "alt": "Indawo yokongeza i-subtitles yesikhiphi sesicatshulwa esicocekileyo",
     "cap": "Layisha ifayile, okanye ncamathisela umxholo we-subtitle ngokuthe ngqo kwibhokisi yesicatshulwa"
    }
   },
   {
    "h2": "Ukukhetha phakathi kweendlela ezimbini zembonakalo",
    "ps": [
     "Phezulu ko-\"2 Extraction options\" kukho imbonakalo: **Imihlaba eqhubekayo** yahlula isicatshulwa kumaphumlo kunye nokuvalwa kwezivakalisi ukuze ifunde njengenqaku; **Umgca omnye ngesalathiso** unika umgca omnye ngesalathiso ngasinye se-subtitle, ehambelana nezisalathiso zefayile yokuqala inye ngenye.",
     "Ukukopa uncoko lwamanqaku, ukuqhelisela uguqulelo okanye ukulufunda njengencoko kufuna imihlaba eqhubekayo; ukwakha iphepha loncoko, ukuthelekisa umgca ngomgca nomlinganiswa wokuqala okanye ukondla esinye isixhobo kufuna ummgca omnye ngesalathiso."
    ],
    "img": {
     "file": "extract-opt",
     "alt": "Imbonakalo nezitshixo zokucoca phantsi kweendlela zokukhupha",
     "cap": "Khetha imbonakalo enye; izitshixo ezihlanu ezingezantsi zigqiba ukuba ngowuphi umxholo osuswayo"
    }
   },
   {
    "h2": "Into esuswa yisitshixo ngasinye kwezihlanu",
    "ps": [
     "**Susa izisalathiso ze-SDH**: icima iinkcazo zomsindo ezibiyelweyo ezifana \"(footsteps)\" okanye \"[music]\" kwaye igcina uncoko.",
     "**Susa iimpawu zokuthengisa neentengiso**: isusa imigca enje ngezaphulelo zabaqokeleli, ii-URL kunye namagama ajikelezileyo.",
     "**Susa ukuphindaphinda okufutshane**: xa isivakalisi esifanayo sibonakala kabini kulandelelana (isiphazamiso sokudlala) ikopi enye kuphela egcinwayo; ukuphindaphinda okukude kunentsingiselo kwaye kuyashiywa.",
     "**Susa izimamva zezithethi**: \"JOHN: Hello\" iba \"Hello\". Kuvaliwe ngokuzenzekelayo — isicatshulwa sesitayile sescript sidinga ukubonisa ukuba ngubani othethayo.",
     "**Yeqa imigca yengoma**: imigca ephelele \"♪ … ♪\" iyayeqwa. Kuvaliwe ngokuzenzekelayo — iingoma ngamagama nawo."
    ],
    "img": {
     "file": "extract-clean",
     "alt": "Izitshixo zokucoca ezihlanu neenkcazo zazo phantsi kweendlela zokukhupha",
     "cap": "Isitshixo ngasinye sitshela into esusayo ngasekunene; phawula ezo uzidingayo"
    }
   },
   {
    "h2": "Ukuthatha isiphumo sihambe",
    "ps": [
     "Ikholamu ethi \"3 Result\" ngasekunene ibonisa isicatshulwa esikhutshiweyo ngqo kwaye iphinda ibale ngokukhawuleza xa utshintsha inketho.",
     "Xa ukonwabile, cofa u-\"Download\" ukugcina i-.txt okanye u-\"Copy\" ukuthatha isicatshulwa nawe. Ngeelwimi ezingahluli amagama ngezithuba, ezifana nesi-Chinese nesi-Japanese, ukudityaniswa kwemigca kulandela imigaqo eyahlukileyo, kwaye isixhobo siyakuphatha oko ngolwimi ngalunye ngokuzenzekelayo."
    ],
    "img": {
     "file": "extract-out",
     "alt": "Indawo yeziphumo enamaqhosha okhuphelo nokopa",
     "cap": "Isiphumo sihlaziya ngqo; siyikhuphele njenge-txt okanye usikope ngokuthe ngqo"
    }
   },
   {
    "h2": "Into eshiyekileyo ingachukumiswanga",
    "ps": [
     "Uncoko ngokwaso alubhalwa kwakhona. Izitshixo zokucoca zigqiba kuphela ukuba ngowuphi umgca opheleleyo okanye iibholoko ezicinywayo; azikaze zitshintshe amagama esalathiso.",
     "Amaxesha namanani esalathiso awakhuphi ngaphandle, akatshintshwa aze akhuphe — ifayile yokuqala ayichukunyiswanga, kwaye eli phepha alininzi ukuthumela okunamaxesha. Lo msebenzi ungowo[[Ukuqulunqa iifomati|/convert.html]]."
    ]
   },
   {
    "h2": "Imibuzo eqhelekileyo",
    "ps": [
     "**Ingaba izihlomelo zesitayile se-ASS zihlala kwisicatshulwa?** Hayi. Iibholoko zokubethelela ze-ASS `{}` ziyasuswa kwaye uncoko kuphela oluseleyo.",
     "**Ingaba ifayile yezilwimi-mbini iphuma njengemigca emibini okanye enye?** Njengemigca emininzi njengoko isalathiso sasingenayo; eli phepha alidibanisi okanye alwahluli — ukwahlula sebenzisa [[Ukwahlula kwezilwimi-mbini|/bilingual.html]].",
     "**Kutheni izimamva zezithethi zigcinwa ngokuzenzekelayo?** Igama elithi \"JOHN: Hello\" lihlala liyinkcukacha eluncedo (izicatshulwa, amaphepha oncoko), kwaye ukulisusa kwenza kube nzima ukwazi ukuba ngubani othethayo, ngoko ukukhetha kushiywa kuwe.",
     "**Ingaba iifayile zeengoma ze-LRC zinokukhutshwa nazo?** Ewe. Izihlomelo zexesha le-LRC ziyasuswa kwaye imigca yengoma iyasele; ukuba awufuni ingoma, phawula \"Skip lyric lines\"."
    ]
   },
   {
    "h2": "Imfihlo",
    "ps": [
     "I-subtitles ziqhutywa ngokupheleleyo kwisikhangeli: akukho nto ilayishwanga kwaye akukho nto ihamba kuseva. Isicatshulwa sihlala kwiphepha langoku kuphela kwaye siyacinywa xa kuhlaziywa."
    ]
   },
   {
    "h2": "Izixhobo ezihambelanayo nezikhombandlela",
    "ps": [
     "Ukukuqonda oko kufunyanwa kwifayile ye-subtitle bona [[Yintoni engaphakathi kwi-SRT file|/guides/srt-file-format.html]]; ukuguqulela uncoko olukhuphileyo yiya [[Subtitle translation|/translate.html]]; ukuyiguqula ibe yiteyibhile sebenzisa [[Subtitles to Excel/CSV|/guides/srt-to-excel.html]]; kwaye uqhube [[Subtitle QC|/qc.html]] ngaphambi kokuhambisa nantoni na."
    ]
   }
  ]
 },
 "extract-subtitles-from-video": {
  "seo": {
   "title": "Ukukhupha i-subtitles kwividiyo – Iziqulathiweyo vs zangaphandle – AI-SRTSub",
   "desc": "Ukuba i-MKV / WebM / MP4 / MOV ephethe ntoni, indlela isicatshulwa, ASS, WebVTT kunye ne-mov_text track ezahlula ngayo, kutheni i-subtitles zemifanekiso (PGS / DVD) zingenasicatshulwa, kwaye yintoni enokwenziwa emva kokukhupha.",
   "h1": "Ukukhupha i-subtitles kwividiyo",
   "intro": "I-subtitles zinokuhlala ngaphakathi kwefayile yevidiyo okanye zime zodwa ngaphandle kwayo. Ngaphakathi, zingumkhondo kwisitya — ukuzikhupha akunanto yakwenza nokuguqula ifomati (transcoding).",
   "ctaText": "Vula ukukhupha i-subtitles zevidiyo"
  },
  "body": [
   {
    "h2": "Apho kuhlala khona i-subtitles: ezifakiweyo nezangaphandle",
    "ps": [
     "Ifayile yevidiyo (MKV, MP4) sisitya esiphethe umkhondo wevidiyo, umkhondo womsindo kunye nemikhondo ye-subtitle ngaxeshanye. I-subtitles ezitywinwe ngaphakathi **zifakiwe**; ifayile ye-.srt / .ass eyahlukileyo ehlala ngaphandle **yingaphandle**, kwaye umkhondo othe wafakwa ngaphakathi ubizwa ngokuba **muxed in**.",
     "I-subtitles zangaphandle zinokusetyenziswa njengoko zinjalo. Ingxaki yilezi zifakiweyo: ukuzihlela, ukuziguqulela okanye ukwakha umkhondo wolwimi-mbini ovela kowokuqala, awunafayile ye-subtitle esandleni — kufuneka ufundise umkhondo phandle kwesitya kuqala. Eli nyathelo aliyokuguqula ifomati: Ividiyo ayiphindi ibhalwe, kuphela idatha esele igcinwe kwisitya efundwayo."
    ]
   },
   {
    "h2": "Yisiphi isitya esiphethe ntoni",
    "ps": [
     "Izitya ezahlukeneyo ziphethe iifomati ezahlukeneyo ze-subtitle, kwaye nobunzima bokukhupha buyahlula:"
    ],
    "img": {
     "file": "videosub-which",
     "alt": "Imikhondo ye-subtitle edweliswe yiphepha lokukhupha i-subtitles ezifakiweyo",
     "cap": "Umkhondo omnye ngomgca ngamnye, ngokuqhelekileyo onolwimi negama lomkhondo; xa kukho omnye kuphela ukhutshwa ngokuzenzekelayo"
    }
   },
   {
    "h2": "Kutheni i-subtitles zemifanekiso zingenakukhutshwa",
    "ps": [
     "I-Blu-ray PGS ne-DVD subtitles azigcini zimpawu konke konke, kuphela uluhlu lwemifanekiso enesiteshi se-alpha. Xa isidlali sizibonisa sibeka umfanekiso, asenzi isicatshulwa.",
     "Ngoko akukho sicatshulwa kuloo mkhondo sokufunda — asiyokuba isixhobo asiyixhasi, kukuba akukho mpawu zikhoyo apho. Eli phepha lithetha ngokucacileyo xa lidibana nazo.",
     "Indlela kuphela yokufuma amagama kukwazi iimpawu kule mifanekiso kuqala (OCR) kwaye wakhe i-subtitles kuyo. Yinkqubo eyahlukileyo ekukhupheni umkhondo."
    ]
   },
   {
    "h2": "Okuhlala kulandela emva kokukhupha",
    "ps": [
     "Okuphumayo ngumkhondo njengoko wawunjalo: isixhobo asiqikeleli iikhowudi kwaye asilungisi amaxesha. Ngoko izinto ezimbini zivela rhoqo:",
     "Enye **yisicatshulwa esingaqondakaliyo** — ingxaki yekhowudi kumkhondo wokuqala ophuma ungaqondakaliyo konke konke; yiya ku-[[Uyenza njani ukulungisa isicatshulwa esingaqondakaliyo|/guides/repair.html]] ukufumanisa ikhowudi. Eyesibini **yixesha elingalunganga** — nokuba umthombo uneempawu zokuqala, okanye amaxesha awahambelani, isiphumo siyaphambuka njengento epheleleyo; sebenzisa [[Ulungiso lwesixesha|/shift.html]] ukuyiphambukisa okanye ukuyilinganisa.",
     "Emva koko, ukuguqulela yiya ku-[[Subtitle translation|/translate.html]], kwaye ukuyenza ibe yeyolwimi-mbini bona [[Iindlela ezibini zokwakha i-subtitles ezilwimi-mbini|/guides/make-bilingual-subtitles.html]]."
    ],
    "img": {
     "file": "videosub-formats",
     "alt": "Indawo yeziphumo enee-SRT / VTT / ASS / TXT zokuthumela iifomati",
     "cap": "I-subtitles ezikhutshiweyo zinokuthunyelwa ngeefomati ezine; umthombo we-ASS ugcina isihloko sesitayile nesigqibo"
    }
   },
   {
    "h2": "Izinto ezimbalwa ezilula ukuba zenziwe ngempazamo",
    "ps": [
     "**Ukukhupha i-subtitles akukutshisi ngaphakathi.** Ividiyo ayiphindi ibhalwe, ngoko umgangatho womfanekiso nomsindo awuchaphazeleki.",
     "**Ukukhupha akuchaphazeli ifayile yokuqala.** Kufundwa kuphela, akubhalwa nkam, kwaye akukho bhayithi yevidiyo etshintshayo.",
     "**Ifayile enkulu ecothayo asiyongxaki yoqhagamshelwano.** Isixhobo siphicotha ulwazi lomkhondo isiqendu nesiqendu, kwaye xa ifayile inkulu kakhulu kuthatha ixesha elide; konke oku kwenzeka kwayindawo.",
     "**I-subtitles zangaphandle azidingi eli phepha.** Ukuba unayo i-.srt / .ass, hamba ngqo ku-[[Ukuqulunqa iifomati|/convert.html]]; kuphela i-subtitles ezitywinwe ngaphakathi zevidiyo ezidinga ukukhutshwa kuqala."
    ]
   },
   {
    "h2": "Izixhobo ezihambelanayo nezikhombandlela",
    "ps": [
     "Kumkhombandlela opheleleyo bona [[Uyenza njani ukukhupha i-subtitles ezifakiweyo kwividiyo|/guides/videosub.html]]; ukuguqulela oko ukukhuphileyo yiya [[Subtitle translation|/translate.html]], ukuyenza ibe yeyolwimi-mbini bona [[Iindlela ezibini zokwakha i-subtitles ezilwimi-mbini|/guides/make-bilingual-subtitles.html]]; kwisicatshulwa esingaqondakaliyo qala ngo-[[Ulungiso lwesicatshulwa esingaqondakaliyo|/repair.html]]."
    ]
   }
  ]
 },
 "fps-23-976-vs-25": {
  "seo": {
   "title": "Kutheni i-23.976 / 24 / 25 / 30 fps Ithetha Ukuba Ntoni – Ixesha le-Subtitle – AI-SRTSub",
   "desc": "I-23.976 ayiyo 24 kwaye 29.97 ayiyo 30 — 0.1% engekho ivela kumbala we-NTSC, ngelixa i-PAL iqhuba iimuvi ngokukhawuleza ngo-4%. Indlela ezi zishukumisa ngayo ixesha le-subtitle yakho, kunye nendlela yokuguqulela phakathi kwazo.",
   "h1": "Kutheni i-23.976 / 24 / 25 / 30 fps ithetha ukuba ntoni",
   "intro": "Umsantsa 0.1% phakathi kwe-23.976 no-24 yintsalela yembali yetevision. Kunye ne-PAL's 4%, yiyo unobangela wokuba i-subtitles ziqhubeke zilahleka ngakumbi njengoko imuvi iqhubeka.",
   "ctaText": "Vula ulungiso lwesixesha"
  },
  "body": [
   {
    "h2": "Yintoni inombolo nganye",
    "ps": [
     "Isantya samakhasi yimifanekiso emingaphi eboniswa ngemizuzwana enye. Ezine ozidibana nazo kakhulu:"
    ]
   },
   {
    "h2": "Apho kuvela khona i-0.1%",
    "ps": [
     "23.976 = 24 × 1000/1001, kwaye 29.97 = 30 × 1000/1001. Loo 1000/1001 yintsalela yokongeza umbala kwi-NTSC: ukufaka umbala ngaphakathi ngaphantsi ngaphandle kokuphula abamkeli abamnyama nabaqabukayo, isantya samabala sehla ukusuka ku-60 Hz ukuya ku-59.94 Hz (60 × 1000/1001), kwaye isantya samakhasi sehla kunye naso.",
     "Isiphumo: iimuvi ziboniswa ku-23.976 kwiindawo ze-NTSC endaweni ka-24. Umahluko ngu-0.1%, okanye imizuzwana engu-3.6 kwisixa seyure enye — kuphantse kungabonakali ngesiqu saso, kodwa musa ukuyidibanisa ne-4% engezantsi kwaye ungaqinisekisi ukuzidibanisa zombini kubalo olunye."
    ]
   },
   {
    "h2": "Apho kuvela khona i-4%",
    "ps": [
     "Iindawo ze-PAL zibonisa ku-25 fps. Iimuvi zishicilelwa ku-24 fps kwaye zidlalwa nje ku-25 — akukho khasi linyusiweyo okanye licinyiweyo, ngoko ukudlala kuqhuba ngokukhawuleza ngo-4% (25/24 ≈ 1.0417). Imuvi yemizuzwana engu-100 iqhuba imizuzwana engu-96 kwinguqulelo yayo ye-PAL.",
     "Yiyo loo nto ungcambu lwe-**progressive drift**: i-subtitles ezenzelwe umthombo nevidiyo kwinguqulelo ye-PAL zihambelana ngokuchanekileyo ekuqaleni kwaye ziziimimitha ezine ngamakhredithi. Akukho tshintsho lwehlabathi lonke olungasindisa loo nto; kufuneka ilinganiswe ngomlinganiselo."
    ],
    "img": {
     "file": "shift-step-rate",
     "alt": "Isahluko sesantya sephepha lesixesha: ibhokisi yokufaka umlinganiselo",
     "cap": "Linganisa ngomlinganiselo — ixabiso elinye ligubungela imuvi yonke"
    }
   },
   {
    "h2": "Uyiguqulela njani",
    "ps": [
     "Ukuguqulela kuthetha ukuphindaphinda ngomlinganiselo omnye osebenza kwiimuvi zonke:"
    ]
   },
   {
    "h2": "Ukwazi ukuba unayiphi",
    "ps": [
     "Endaweni yokuqikelela umlinganiselo, fumana amaxesha amabini oqinisekileyo ngexesha lawo — ngokuqhelekileyo imigca yokuqala neyokugqibela yoncoko — kwaye uxelele isixhobo \"lo mgca kufuneka ube ku-00:00:12 kwaye lowo ku-01:35:40\"; yolula imuvi yonke ngokuthe ngqo phakathi kwaloo manqinda mabini. Obu ngubizo \"lwamanqinda amabini\", kwaye aludingi sibalo sesantya samakhasi kuwe.",
     "Ukuqinisekisa isantya samakhasi ngokwakho, hlola isidlali sakho okanye isixhobo solwazi lwemidiya. Xa igama lefayile lifana no-`1080p.WEB` lingabonisi nkcazo yesantya samakhasi, ukubethelela kwamanqinda amabini yindlela ekhuselekileyo."
    ],
    "img": {
     "file": "shift-step-two",
     "alt": "Isahluko sebethelelo lwamanqinda amabini sephepha lesixesha: imigca emibini yokufaka amaxesha",
     "cap": "Ukubethelela kwamanqinda amabini akudingi santya samakhasi — amaxesha amabini kuphela"
    }
   },
   {
    "h2": "Izixhobo ezihambelanayo nezikhombandlela",
    "ps": [
     "Ukuguqula isantya samakhasi ngokwaso — [[Subtitle frame rate conversion|/guides/srt-fps-converter.html]]; ulungiso lwesantya — [[Subtitle speed conversion|/guides/subtitle-speed-converter.html]]; awuqinisekanga ukuba kungcoliseko lwehlabathi lonke okanye i-progressive drift — [[Subtitles drifting further out of sync|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "glossary": {
  "seo": {
   "title": "Ukutshintshwa kwamagama nge-batch kwi-subtitles – Itheyibhile enye ilungisa ifayile – AI-SRTSub",
   "desc": "Umgaqo omnye ngomgca, ohlulwe ngu- -> , => , → okanye i-Tab, kunye no-# wamagqabaza. Ukufana kwamagama aphelele, ukhuseleko lweempawu ezinkulu, umgca wokuqala okanye wesibini wendlela yezilwimi-mbini, utshintsho ngalunye ludweliswe kwaye luyabuyiseka.",
   "h1": "Uyitshintsha njani amagama nge-batch kwi-subtitles",
   "intro": "Itheyibhile yeligama enye yenza isicatshulwa sefayile ye-subtitle yonke ihambelane ngexesha elinye — amaxesha, izitayile ze-ASS kunye neebholoko ze-VTT NOTE azichukunyiswa nayibhayithi enye.",
   "ctaText": "Vula ukutshintshwa kwamagama nge-batch"
  },
  "body": [
   {
    "h2": "Oku kwenziwa sesi sixhobo",
    "ps": [
     "Igama elinye eliguqulelwe ngeendlela ezimbini ezahlukileyo, amagama neendawo ezihambayo ngoguqulelo lomatshini, i-subtitles zomnye umntu ezidinga ukuhambelana nemigaqo yakho — zonke ezi zabelana ngento enye: into etshintshayo ligama, hayi isakhiwo. Eli phepha litshintsha amagama kuphela."
    ]
   },
   {
    "h2": "I-inputs ezimbini: i-subtitles kunye ne-iteyibhile yeligama",
    "ps": [
     "Ikholamu ethi \"1 Add subtitles\" ngasekhohlo ithatha ifayile ye-subtitle, okanye unguncamathisela umxholo ngokuthe ngqo; ukuba ukhethe ifayile engeyiyo, cofa u-\"Clear\".",
     "Ikholamu ethi \"2 Term table\" ngasekunene iphethe imigaqo. **Umgaqo omnye ngomgca**, kunye negama elidala kunye negama elitsha elahlulwe ngu-`->` , `=>` , `→` okanye i-Tab — zonke ezine ziyasebenza. Imigca eqala ngo-`#` ngamagqabaza kwaye ayithathi nxaxheba ekutshintsheni.",
     "Ukuba unamandabuzo malunga nefomati, cofa u-\"Fill in an example\" uze uhlele loo nto."
    ],
    "img": {
     "file": "glossary-up",
     "alt": "Indawo yokongeza i-subtitles kunye nefakelo le-iteyibhile yeligama lephepha lokutshintsha amagama",
     "cap": "I-subtitles ngasekhohlo, imigaqo ngasekunene; umgaqo omnye ngomgca, igama elidala negama elitsha elahlulwe ngu- ->"
    }
   },
   {
    "h2": "Uyibhala njani itheyibhile yeligama",
    "ps": [
     "Umgaqo omnye ngomgca: igama langoku ngasekhohlo, into emelwe kukuba yiyo ngasekunene. Umzekelo `Thor -> Donar` utshintsha wonke u-\"Thor\" kwifayile abe ngu-\"Donar\".",
     "Amagqabaza aqala ngo-`#` kwaye aluncedo ekubhaleni iqela lemigaqo (umzekelo \"# season 1 name fixes\"), kunye nokucima umgaqo okwethutyana — faka u-`#` ngaphambili endaweni yokucima.",
     "Imigaqo iqhuba ukususela phezulu ukuya ezantsi; isicatshulwa esiveliswe ngumgaqo omnye siye sifundwe kwakhona yimigaqo engezantsi kwaso. Xa iodolo ibalulekile (masithi, tshintsha u-A abe ngu-B kuqala uze u-B abe ngu-C), khumbula oko."
    ],
    "img": {
     "file": "glossary-table",
     "alt": "Umgca emva komgca wemigaqo yotshintsho kwisicatshulwa se-iteyibhile yeligama",
     "cap": "Umgaqo omnye ngomgca; imigca eqala ngo-# ngamagqabaza kwaye inokucima umgaqo okwethutyana"
    }
   },
   {
    "h2": "Into eyenziwa yizitshixo ezintathu",
    "ps": [
     "**Ububanzi**: `all` / `first line only` / `second line only`. Kwifayile yezilwimi-mbini, khetha \"umgca wesibini kuphela\" xa ufuna ukutshintsha inguqulelo kuphela; izisalathiso ezinomgca omnye kuphela zihlala zingachukunyiswanga phantsi kwayo nayiphi na indlela yomgca omnye — isixhobo asiqikeleli ukuba yeyiphi icala eliyeyokuqala.",
     "**Igama eliphelele**: utshintsha kuphela amagama amile ngodwa njengegama, ngoko `art` ayiyi kuchukumisa `start`. Ngeelwimi ezingahluli amagama ngezithuba, ezifana nesi-Chinese nesi-Japanese, esi sitshixo asinamsebenzi — ukutshintsha kusebenza kwizicatshulwa ezisezantsi apho.",
     "**Ukuqaphela iimpawu ezinkulu**: kuvaliwe ngokuzenzekelayo, ngoko u-`CEO` no-`ceo` zombini ziyandululwa; xa ziphawuliwe, igama elichanekileyo kuphela elitsshintshwayo."
    ],
    "img": {
     "file": "glossary-opt",
     "alt": "Ububanzi, igama eliphelele kunye nezitshixo zokuqaphela iimpawu ezinkulu ezingezantsi kwe-iteyibhile yeligama",
     "cap": "Ububanzi bugqiba ukuba ngowuphi umgca otshintshayo; igama eliphelele neempawu zinquma ukuba igama lithelekiswa kangakanani ngokuchanekileyo"
    }
   },
   {
    "h2": "Utshintsho ngalunye ludweliswe, utshintsho ngalunye luyabuyiseka",
    "ps": [
     "\"3 Result\" ibonisa i-subtitles ezitshintshiweyo kwaye **ydwelisa utshintsho ngalunye**: sesiphi isisalathiso, nguwuphi umgca, ukusuka kuphi ukuya kuphi.",
     "Ukuba awufuni enye yazo, cofa kuyo kuluhlu ukuze ubuyisele eso salathiso — akukho mfuneko yokuhlela itheyibhile yeligama nokuyiphinda. Xa ukonwabile, cofa u-\"Download\" okanye u-\"Copy\"."
    ],
    "img": {
     "file": "glossary-out",
     "alt": "Indawo yeziphumo enoluhlu lotshintsho ngalunye",
     "cap": "Utshintsho ngalunye ludweliswe; cofa enye ongayifuniyo ukuze uyibuyisele"
    }
   },
   {
    "h2": "Into eshiyekileyo ingachukumiswanga",
    "ps": [
     "**Amaxesha, imigca yesitayile se-ASS kunye neebholoko ze-VTT `NOTE` azichukunyiswa nayibhayithi enye.** Utshintsho lusebenza kwisicatshulwa soncoko kuphela, aluza lusebenze kwimigca yesakhiwo.",
     "Itheyibhile yeligama ayikaze iguqule ifayile yakho ye-subtitle ngokuzenzekelayo — isiphumo sisicatshulwa esitsha kwaye esokuqala sihlala njengoko sinjalo."
    ]
   },
   {
    "h2": "Imibuzo eqhelekileyo",
    "ps": [
     "**Kutheni igama lingazange litshintshwe?** Hlola ububanzi kuqala: ngokukhetha \"umgca wesibini kuphela\", izisalathiso ezinomgca omnye kuphela zihlala zingachukunyiswanga. Emva koko hlola ukufana kwamagama aphelele, okuthintela ukufana okungeyomigaqo yamagama amileyo.",
     "**Kutheni isi-Chinese sisatshintsha izicatshulwa ezisezantsi xa ukufana kwamagama aphelele kuphawuliwe?** Kulindelekile loo nto. Isi-Chinese nesi-Japanese azihli amagama ngezithuba, ngoko isixhobo asikwazi ukufumanisa imida yamagama kwaye ukufana kwamagama aphelele akunamsebenzi apho.",
     "**Ndingayibuyisela njani yonke into emva kwempazamo?** Buyisela izisalathiso inye ngenye kuluhlu lotshintsho; ukuqala ngokutsha ngokupheleleyo, cima itheyibhile yeligama uze uongeze i-subtitles kwakhona.",
     "**Ingaba imigca yesitayile se-ASS ingasatshintshwa ngempazamo?** Hayi. Imigca yesitayile kunye neebholoko ze-`NOTE` azikho ngaphakathi kobubanzi; isicatshulwa soncoko kuphela esithatha nxaxheba."
    ]
   },
   {
    "h2": "Imfihlo",
    "ps": [
     "I-subtitles kunye ne-iteyibhile yeligama ziqhutywa ngokupheleleyo kwisikhangeli: akukho nto ilayishwanga kwaye akukho nto ihamba kuseva. Itheyibhile yeligama ayigcinwanga, ngoko ingenanto xa uvula iphepha kwakhona kwixesha elizayo."
    ]
   },
   {
    "h2": "Izixhobo ezihambelanayo nezikhombandlela",
    "ps": [
     "Nokuba uzakha itheyibhile yeligama njani kwaye uyigcine njani kwisizini yonke, bona [[Term tables: keeping a season consistent|/guides/subtitle-glossary.html]]; ukuba umxholo ungcolile (iimpawu zokuthengisa, izisalathiso ze-SDH) qhuba [[Subtitle cleaning|/clean.html]] kuqala; xa amagama esetiwe kwaye ufuna ezinye iilwimi yiya [[Subtitle translation|/translate.html]]; kwaye uqhube isiphumo ngo-[[Subtitle QC|/qc.html]]."
    ]
   }
  ]
 },
 "hanconv": {
  "seo": {
   "title": "Ukuguqulelwa kweSubtitles eziNcinci–Zesintu – Taiwan vs Hong Kong – AI-SRTSub",
   "desc": "Umkhombandlela weendlela ezisithoba: zaseTaiwan ezinokanye ezingenamagama angawasekhaya, iaseHong Kong njengeyayo, zonke zinokuguqulelwa zibuyele kwezixinzelelweyo. Uncoko kuphela olutshintshayo; amaxesha ahlala apho enjalo.",
   "h1": "Uyiguqulela njani i-subtitles zesi-Chinese ezixinzelelweyo nezisintu",
   "intro": "Nokuba i-subtitle iya eTaiwan, eHong Kong okanye kwilizwe elikhulu kutshintsha zombini amagama neemilo zeempawu. Iindlela ezisithoba zokukhetha kuzo, kwaye uncoko kuphela oluguqulwayo — amaxesha, amanani esalathiso kunye nemigca yesitayile se-ASS azichukunyiswa.",
   "ctaText": "Vula isiguquli"
  },
  "body": [
   {
    "h2": "Oku kwenziwa sesi sixhobo",
    "ps": [
     "Ukuguqulela phakathi kwezixinzelelweyo nezisintu akusosi ukubhala uhlobo ngalunye lweempawu ngendlela eyahlukileyo. Igama elifanayo elixinzelelweyo lihambelana namagama ahlukileyo kwiindawo ezahlukeneyo — igama \"lesoftware\" liyahlula phakathi kweTaiwan nelilizwe elikhulu, kwaye iHong Kong inenye inguqulelo kwakhona. Isiguquli siyazahlula ezi:"
    ]
   },
   {
    "h2": "Layisha kwaye ufumanise",
    "ps": [
     "Tsala ifayile phakathi okanye ukhangele enye — SRT, VTT, ASS kunye ne-TXT zixhaswa — okanye ncamathisela isicatshulwa se-subtitle ngokuthe ngqo kwibhokisi. Ifomati ifunyenwa ngokuzenzekelayo kwaye iboniswa ecaleni ko-\"Detected format\"."
    ],
    "img": {
     "file": "hanconv-up",
     "alt": "Indawo yokulayisha yesiguquli: indawo yokutsala kunye nebhokisi yokuncamathisela, kunye nefomati efunyenweyo phezulu",
     "cap": "SRT / VTT / ASS / TXT, ifomati ifunyenwe ngokuzenzekelayo"
    }
   },
   {
    "h2": "Ukukhetha phakathi kweendlela ezisithoba",
    "ps": [
     "Iindlela ezisithoba phantsi ko-\"Convert to\" ziwela kumaqela amathathu. **Ezixinzelelweyo → zesintu**: ezisintu eziqhelekileyo, zaseTaiwan (tshintsha amagama), zaseTaiwan (iimilo zephepha kuphela), zaseHong Kong. **Zesintu → ezixinzelelweyo**: eziqhelekileyo, ezivela zaseTaiwan, ezivela zaseHong Kong. **Zesintu ukuya kwezesintu**: iindlela zaseTaiwan, iindlela zaseHong Kong.",
     "Ukukhetha \"Taiwan wording\" kutshintsha amagama angawasekhaya na: igama \"lesoftware\" liba le zaseTaiwan kwaye kunjalo nakwigama \"lolwazi\"; \"Taiwan glyphs\" kutshintsha kuphela indlela ezibhalwa ngayo iimpawu kwaye ishiya amagama akho enjalo. IHong Kong yimeko eyahlukileyo ngokupheleleyo kwaye isebenzisa elinye igama \"lesoftware\" kwakhona. Ukuguqulela ubuyisele kwezixinzelelweyo, sebenzisa iqela elangezantsi — kufuneka uthethe ukuba yeyiphi uhlobo lwesintu ozisuka kulo, kuba isicatshulwa saseTaiwan naseHong Kong sithatha iindlela ezahlukileyo zokubuya."
    ],
    "img": {
     "file": "hanconv-dir",
     "alt": "Khadi lokuguqulela ku-: indawo yokukhetha ebonisa \"Simplified → Taiwanese traditional (change wording)\" ekhethiweyo",
     "cap": "Iindlela zihlala kwindawo yokukhetha ethi \"Convert to\" kumaqela amathathu; le yeyesintu saseTaiwan notshintsho lwamagama"
    }
   },
   {
    "h2": "Isiphumo kunye nothumelo",
    "ps": [
     "Indawo yeziphumo ibonisa isicatshulwa esiguquliweyo kwangoko, kunye nebha yezibalo enika inani lemigca yonke kunye nemigca emingaphi etshintshileyo. Ukuba akukho nto itshintshileyo konke konke ufumana isaziso sokuba ifayile isenokuba ayiqulethe mpawu zase-Chinese — iimpawu ze-Han kuphela eziguqulwayo, ngoko i-subtitle yaseLatin yonke okanye yamanani yonke ihlala njengoko yayinjalo.",
     "Emva koko khuphela okanye kopa. Uphawu lolwimi lufakwa kwigama lefayile — u-`demo.srt` uba ngu-`demo.zh-TW.srt` wesintu saseTaiwan, u-`.zh-Hant` wesintu esiqhelekileyo, kunye no-`.zh-Hans` xa uguqulela ubuyisela kwezixinzelelweyo."
    ],
    "img": {
     "file": "hanconv-out",
     "alt": "Indawo yeziphumo: isicatshulwa esiguquliweyo kunye nebha yezibalo",
     "cap": "Ibha yezibalo ibonisa amanani wemigca yonke neyetshintshileyo; khuphela okanye kopa ukusuka apha"
    }
   },
   {
    "h2": "Into engazange ichukunyiswe",
    "ps": [
     "Uncoko kuphela oluguqulwayo. Amaxesha, amanani esalathiso kunye nemigca yesitayile se-ASS azichukunyiswa konke konke — isiphumo silungele ukusetyenziswa ngaphandle kokuphinda wenze nayiphi na ifomati."
    ]
   },
   {
    "h2": "I-FAQ",
    "ps": [
     "**Kutheni isiguquli singatshintshanga igama \"elicacileyo\"?** Ukuhambelana okunye-kwininzi kulungiswa ngeligama: ingqiqo \"elicacileyo\" nengqiqo \"eyomileyo\" zabelana ngendlela enye yesintu, ngelixa ingqiqo \"yesiqu somthi\" isebenzisa enye eyahlukileyo. Izitshixo zivela kwi-OpenCC, zihambelana namazwi aphelele endaweni yezimpawu ezihlukileyo.",
     "**Yintoni umahluko phakathi kwesintu saseTaiwan naseHong Kong?** Amagama: igama \"lesoftware\" liyahlula phakathi kwazo zombini. Khetha indawo yengingqi oza kuyinikela kuyo.",
     "**Inani lempawu litshintshile emva kowoguqulelo?** Iimpawu ze-Han kuphela ezitshintshwayo — akukho zisalathiso zongeziweyo okanye zacinywa kwaye akukho xesha lishukumiweyo. Ukuba inani lemigca litshintshile, hlola ukuba ifomati ifunyenwe ngokuchanekileyo na.",
     "**Isichazi-magama asiphumelelanga ukulayisha?** Eli phepha likuxelela ukuba uhlaziye uze uzame kwakhona. Zilayisha ngokwaso, ngoko akukho mfuneko yokulayisha i-subtitles naphi na."
    ]
   },
   {
    "h2": "Imfihlo",
    "ps": [
     "Uguqulelo luqhuba ngokupheleleyo kwisikhangeli sakho. Akukho mxholo we-subtitle ohlala uthunyelwa kuseva."
    ]
   },
   {
    "h2": "Izixhobo ezihambelanayo nezikhombandlela",
    "ps": [
     "Ukuba konke okudingayo kukuba zixinzelelwe zibe zesintu, bona [[Convert simplified subtitles to traditional|/guides/srt-simplified-to-traditional.html]]; kutheni kungaphezulu kokutshintsha iimpawu, bona [[Simplified vs traditional is not a character swap|/guides/simplified-traditional-chinese.html]]; ukuguqulela kolunye ulwimi, [[Subtitle translation|/translate.html]]."
    ]
   }
  ]
 },
 "how-to-make-lrc-file": {
  "seo": {
   "title": "Indlela yokuvumelanisa amazwi eengoma ze-LRC – Umgca omnye ngelixa locululo, cofa ngoxa uphulaphule – AI-SRTSub",
   "desc": "Yakha ifayile ye-LRC ukusuka ekuqaleni: namathisela umgca omnye wengoma ngomgca ngamnye, cofa ixesha ngoxa uphulaphule, izinqumli ezibalulekileyo, xa uze utsibe umgca, i-LRC okanye i-SRT, nento omayenze xa ixesha lisaphuka.",
   "h1": "Indlela yokuvumelanisa amazwi eengoma ze-LRC",
   "intro": "Ifayile ye-LRC ilula nje \"ngumgca wengoma omnye kunye nendawo enye yexesha\". Ukwenza omnye kubizwa ngokuba kukubeka ixesha: ukubamba umzuzwana ngamnye umgca oqala ngawo.",
   "ctaText": "Vula isixhobo sokuvumelanisa amazwi eengoma"
  },
  "body": [
   {
    "h2": "Kusini na ukubeka ixesha ngokwenene",
    "ps": [
     "Ubume befayile ye-LRC bunzima ukuba bube lula ngakumbi: umgca omnye wengoma ngomgca ngamnye, ngamnye ungowangaphambi `[mm:ss.xx]` kweethegi zexesha. Xa umdlali efika kumgca, ubonisa olo luhlu ngaloo mzuzu.",
     "Ngoko umsebenzi wonke \"wokwenza i-LRC\" kukunika indawo yexesha kumgca ngamnye wengoma — kwaye akukho matshini unokukwenzela oko, kuba ukugqiba apho umgca oqala ukuculwa kudinga ukulalela."
    ]
   },
   {
    "h2": "Mingaphi imizamo efunekayo ingoma",
    "ps": [
     "Kufezekile ukuba nomzuzwana wokucinga ngaphambi kokuba uqale; kusindisa uninzi lomsebenzi oqala phantsi:"
    ],
    "img": {
     "file": "lrc-tap2",
     "alt": "Ukudlala, tywina-lo-mggca, khulula-umgca-omnye kunye nokutsiba-lo-mggca izilawuli kwindawo yokucofa kunye",
     "cap": "Ukucinezela u-Enter ngexesha lokudlala yeyona nto igudileyo; utywine umgca ongafanelekanga? Cinezela u-Z uze uphinde utywine kwakhona"
    }
   },
   {
    "h2": "Ukunamathisela amazwi eengoma kugqiba indlela okuba lula ngayo okuseleyo",
    "ps": [
     "Namathisela amazwi eengoma umgca omnye ngelixa locululo; imigca engenanto iyatsitywa. Ukwahlula imigca oyinamathiselayo yimigca oya kuyibekela ixesha kamva — yahlule ibe yimigca emininzi ngoku kwaye uza kucofa amaxesha amaninzi kamva.",
     "Ukunamathisela i-LRC ekhoyo kuyasebenza na: ii-ethegi zexesha zayo `[mm:ss.xx]` ziyaziwa, kwaye emva kokungenisa **uqhubeka ukusuka kumgca wokuqala ongenaxesha**, ngoko imigca esele ibekelwe ixesha akunyanzelekanga ukuba iphindwe yenziwe.",
     "Oku kuthetha ukuba i-LRC egqitywe isiqingatha inokugcinwa kwaye iphindwe yanamathiselwe kamva ukuze iqhubeke."
    ],
    "img": {
     "file": "lrc-paste2",
     "alt": "Indawo yokunamathisela amazwi eengoma kunye neqhosha lokuhlahlela amazwi eengoma",
     "cap": "Umgca omnye ngelixa locululo; ukunamathisela i-LRC yonke kufunda amaxesha akhoyo ukuze ukwazi ukuqhubeka"
    }
   },
   {
    "h2": "Thumela i-LRC okanye i-SRT",
    "ps": [
     "**Kumdlali womculo, thumela i-LRC.** i-foobar2000, zonke iintlobo zabadlali kunye nezixhobo ezibonisayo amazwi eengoma ziyayifunda.",
     "**Ukubeka amazwi eengoma kwividiyo okanye ukuyiqhubela phambili, thumela i-SRT.** Imikhondo yezihloko zevidiyo, izixhobo zezihloko kunye nesoftware yokuhlela zifunda i-SRT. Ekuthumeleni umgca ngamnye uhlala kude kuqale olandelayo, kwaye umgca wokugqibela ubuyela 2 kwimizuzwana.",
     "Zombini zithumela kuphela imigca enexesha — imigca etsityiweyo ayingenabani efayilini."
    ],
    "img": {
     "file": "lrc-export",
     "alt": "Ukukhuphela i-LRC, ukukhuphela i-SRT kunye namaqhosha okukopa kwindawo yokuthumela",
     "cap": "I-LRC yabadlali, i-SRT yevidiyo; kuphela imigca enexesha ethunyelwayo"
    }
   },
   {
    "h2": "Izinto ezimbalwa kulula ukuzenza kakubi",
    "ps": [
     "**Yonke into iphantsi kancinci emva kokubeka ixesha? Sebenzisa i-offset.** Thumela i-SRT kwaye uyishukumise njengeyeyunithi enye kunye [[Timeline adjustment|/shift.html]]; ikhawuleza kakhulu kunokubuyela umva umgca ngomgca.",
     "**Ukukhula kokulahleka njengoko ingoma iqhubeka? Lyingxaki yobungakanani obulinganisiweyo.** Xa isantya sokudlala kunye nesantya sokurekhoda zahlukile, impazamo ikhula isiya ekupheni, kwaye oko kufuna ukulinganiswa ngokomlinganiselo, hayi i-offset.",
     "**Izinqumli ziziva zindalo kuphela ukuba uzisebenzisa kunye.** Isithuba sidlala kwaye simise, u-Enter utywina umgca wangoku, u-Z uyayicima umgca omnye — cinezela u-Enter ngokuthe ngqo ngexesha lokudlala endaweni yokutshintsha phakathi kwempuku kunye nekhibhodi.",
     "**Umgangatho wesandi uchaphazela ukuchaneka.** Umthombo onezwi elicacileyo kulula ukuwulandela; ukurekhodwa kobomi kunye nemithombo enezandi zasemva ezikhulu kunzima ngokuphawulekayo."
    ]
   },
   {
    "h2": "Izixhobo ezinxulumeneyo kunye nezikhokelo",
    "ps": [
     "Ngohambo olupheleleyo bona [[How to use the lyric sync tool|/guides/lrc.html]]; ukuguqula i-LRC ekhoyo ibe zihloko zangaphantsi bona [[LRC to SRT|/guides/lrc-to-srt.html]]; ukuba i-SRT ethunyelweyo ayichanekanga ngexesha sebenzisa [[Timeline adjustment|/shift.html]]; kwaye uqhube umphumo ngaphakathi [[Subtitle QC|/qc.html]]."
    ]
   }
  ]
 },
 "lrc": {
  "seo": {
   "title": "Isixhobo sokuvumelanisa amazwi eengoma – Layisha ingoma, namathisela amazwi eengoma, cofa kunye – AI-SRTSub",
   "desc": "Layisha ingoma, namathisela amazwi eengoma, cofa isitempu sexesha ngomgca ngamnye njengoko uphulaphule, kwaye uthumele i-LRC okanye i-SRT. Isithuba sidlala kwaye simise, u-Enter utywina umgca, u-Z uyayicima, izandla zihlala kwikhibhodi.",
   "h1": "Indlela yokusebenzisa isixhobo sokuvumelanisa amazwi eengoma",
   "intro": "Layisha ingoma, namathisela amazwi eengoma, cofa isitempu sexesha somgca ngamnye njengoko uphulaphule, kwaye uthumele i-LRC okanye i-SRT eqhelekileyo. Isandi sidlala kwaye asizange sikhupheleke phezulu.",
   "ctaText": "Vula isixhobo sokuvumelanisa amazwi eengoma"
  },
  "body": [
   {
    "h2": "Into eyenziwa sesi sixhobo",
    "ps": [
     "Nikeza ingoma ifayile yamazwi eengoma enokuculwa nayo: umgca omnye ngelixa locululo, umgca ngamnye unendawo yexesha. Abadlali bafunda i-LRC, imikhondo yezihloko zangaphantsi ifunda i-SRT, kwaye zombini zinokuthunyelwa apha."
    ]
   },
   {
    "h2": "1 Layisha ingoma",
    "ps": [
     "Ikholamu yokuqala ngasekhohlo ithatha ifayile yesandi: **MP3, M4A, FLAC, WAV kunye ne-OGG** zonke ziyasebenza. Isandi sidlala kwindawo kwaye asizange sikhupheleke phezulu.",
     "Umgangatho wesandi awuchaphazeli ukuchaneka kwexesha, kodwa umthombo onezwi elicacileyo kulula ukuwulandela; ukurekhodwa kobomi kunye nemithombo enezandi zasemva ezikhulu kunzima ngokuphawulekayo ukuzivumelanisa."
    ],
    "img": {
     "file": "lrc-up",
     "alt": "Indawo yokulayisha ingoma yesixhobo sokuvumelanisa amazwi eengoma",
     "cap": "MP3 / M4A / FLAC / WAV / OGG zonke ziyasebenza, kwaye isandi sidlala kwindawo kuphela"
    }
   },
   {
    "h2": "2 Namathisela amazwi eengoma",
    "ps": [
     "Namathisela amazwi eengoma kwikholamu yesibini, **umgca omnye ngomgca wengoma**; imigca engenanto iyatsitywa ngokuzenzekelayo. Emva koko cofa \"Hlahlela amazwi eengoma\".",
     "Ukunamathisela i-LRC ekhoyo kuyasebenza na — ii-ethegi zexesha zayo `[mm:ss.xx]` ziyaziwa, kwaye emva kokungenisa uqhubeka ukusuka kumgca wokuqala ongenaxesha, ngoko imigca esele ibekelwe ixesha akunyanzelekanga ukuba iphindwe yenziwe."
    ],
    "img": {
     "file": "lrc-paste",
     "alt": "Indawo yokunamathisela amazwi eengoma kunye neqhosha lokuhlahlela amazwi eengoma",
     "cap": "Namathisela umgca omnye ngomgca wengoma, okanye namathisela i-LRC yonke kwaye uvumele isixhobo sifunde amaxesha akhoyo"
    }
   },
   {
    "h2": "3 Cofa ngoxa uphulaphule",
    "ps": [
     "Dlala ingoma kwaye ucinezele u-Enter ngomzuzwana umgca oqala ngawo (okanye cofa \"Tywina lo mggca\"); ixesha lalo mggca liyarekhodwa kwaye isalathisi sitsiba siye kwelandelayo.",
     "Izinqumli: **space** sidlala kwaye simise, **Enter** isitshixo sitywina umgca wangoku, **Z** uyayicima umgca omnye. Ukucinezela u-Enter ngexesha lokudlala yeyona ndlela igudileyo yokusebenza — akukho kutshintsha emva nangaphambili phakathi kwempuku nekhibhodi.",
     "Utywine umgca ongafanelekanga? Cinezela u-Z ukuyicima kwaye utywine kwakhona. Ukuba awufuni ukutywina umgca kwaphela (ikhefu lezixhobo zokucula, indawo yomculo kuphela), cofa \"Tsiba lo mggca\" kwaye akusayi kuvela ekuthumeleni."
    ],
    "img": {
     "file": "lrc-tap",
     "alt": "Ukudlala, tywina-lo-mggca, khulula-umgca-omnye kunye nokutsiba-lo-mggca izilawuli kwindawo yokucofa kunye",
     "cap": "Isithuba sidlala kwaye simise, u-Enter utywina umgca wangoku, u-Z uyayicima — izandla zihlala kwikhibhodi"
    }
   },
   {
    "h2": "4 Thumela ngaphandle",
    "ps": [
     "Ikholamu yesine yenza ukuthumela ngaphandle: **Khuphela i-LRC** yabadlali, **Khuphela i-SRT** yemikhondo yezihloko zangaphantsi zevidiyo, okanye \"Khopa\" ukuthatha okubhaliweyo ngqo.",
     "Kuphela imigca enexesha ethunyelwayo; imigca etsityiweyo ayingenabani efayilini. Ekuthumeleni i-SRT umgca ngamnye uhlala kude kuqale olandelayo, kwaye umgca wokugqibela ubuyela 2 kwimizuzwana."
    ],
    "img": {
     "file": "lrc-out",
     "alt": "Ukukhuphela i-LRC, ukukhuphela i-SRT kunye namaqhosha okukopa kwindawo yokuthumela",
     "cap": "I-LRC yabadlali, i-SRT yevidiyo; kuphela imigca enexesha ethunyelwayo"
    }
   },
   {
    "h2": "Yintoni eshiywe ingachwaphazelwanga",
    "ps": [
     "Okubhaliweyo kwamazwi eengoma akubhalwa ngokutsha. Ukubeka ixesha kongeza kuphela indawo yexesha omnye ngomgca kwaye akuzange kuchukumise amagama owanamathisela.",
     "Xa ungenisa i-LRC ekhoyo, imigca esele inethegi yexesha igcina ixesha layo lokuqala kwaye utywina kuphela ukusuka kumgca wokuqala ongenaxesha ukuya phambili."
    ]
   },
   {
    "h2": "Imibuzo eqhelekileyo",
    "ps": [
     "**Kutheni eminye imigca ingekho ekuthumeleni?** Imigca etsityiweyo kunye nemigca engenaxesha ayingenabani efayilini. Buyela kwinyathelo lesithathu kwaye uzongeze, okanye uqinisekise ukuba zazenzelwe ukuba zitsitywe.",
     "**Ngaba amaxesha anokutshintshwa emva koko?** Ukuba ufuna ukushukumisa yonke into kancinci emva kokutywina, thumela i-SRT kwaye usebenzise [[Timeline adjustment|/shift.html]] ukuze uyenze i-offset okanye uyilinganise njengeyeyunithi enye.",
     "**I-LRC okanye i-SRT — yeyiphi endifanele ndiyithumele?** I-LRC yabadlali bomculo (i-foobar2000, abathengi bokusasaza, zonke iintlobo zabadlali); I-SRT xa amazwi eengoma kufuneka ahlale kwividiyo okanye aqhubele phambili ngezixhobo zezihloko zangaphantsi.",
     "**Kuthatha ixesha elingakanani ingoma enye?** Kuxhomekeke ekubeni mingaphi imigca ekhoyo kwayo nokuba ufuna ukuba ichaneke kangakanani. Kwingoma enemigca yamashumi marhulu okanye amashumi amane, imizuzwana embalwa ngomzamo omnye wakuba uyazi indlela; ukusukela ukuchaneka kwenqanaba lamagama kuthatha ixesha elide."
    ]
   },
   {
    "h2": "Ukugcinwa kwemfihlo",
    "ps": [
     "Isandi kunye namazwi eengoma ziqhutywa ngokupheleleyo kwisikhangeli: akukho nto ikhuphelelwa phezulu kwaye akukho nto ihamba ngeseva. Isandi siyachithwa kwaye sidlalwa kwindawo kuphela."
    ]
   },
   {
    "h2": "Izixhobo ezinxulumeneyo kunye nezikhokelo",
    "ps": [
     "Ukuba sele unayo i-LRC kwaye ufuna izihloko zangaphantsi bona [[LRC to SRT|/guides/lrc-to-srt.html]]; ukucinga kunye nemigibe emva kokubeka ixesha bona [[How to sync LRC lyrics|/guides/how-to-make-lrc-file.html]]; ukuba i-SRT ethunyelweyo ayichanekanga sebenzisa [[Timeline adjustment|/shift.html]]; kwaye uqhube umphumo ngaphakathi [[Subtitle QC|/qc.html]]."
    ]
   }
  ]
 },
 "lrc-to-srt": {
  "seo": {
   "title": "Isiguquli se-LRC ukuya kwi-SRT – Guqula amazwi eengoma abe ziZihloko zangaphantsi – AI-SRTSub",
   "desc": "Guqula amazwi eengoma ze-LRC abe ziZihloko zangaphantsi ze-SRT: umgca ngamnye uhlala kude kuqale olandelayo, umgca wokugqibela ufumana 3 imizuzwana. Iingoma ezidlulileyo 60 imizuzu zifunda ngokuchanekileyo. Iyasebenza kwisikhangeli sakho.",
   "h1": "I-LRC ukuya kwi-SRT",
   "intro": "Guqula iifayile zamazwi eengoma ze-LRC zibe yi-SRT: thula ifayile, khetha i-SRT, khuphela. Amaxesha okuphela azaliswa ngokuzenzekelayo kumgca olandelayo.",
   "ctaText": "Guqula i-LRC → i-SRT"
  },
  "body": [
   {
    "h2": "Indlela i-LRC eyahluka ngayo kwi-SRT",
    "ps": [
     "I-LRC yifayile yamazwi eengoma: umgca ngamnye uphatha kuphela ixesha \"lokuqala ukucula\" ku `[minutes:seconds.cents]` kwaye **akukho xesha lokuphela**; wonke umgca we-SRT udinga kokubili ukuqala nokuphela. Ngoko undoqo wokuguqula kukuzalisa amaxesha okuphela."
    ],
    "img": {
     "file": "convert-upload-lrc",
     "alt": "Indawo yokulayisha: ifayile ye-LRC elayishiweyo, efunyenwe njenge-LRC",
     "cap": "Ifayile yamazwi eengoma enama-timestamp [00:12.50] ifunyenwe njenge-LRC ngoko nangoko"
    }
   },
   {
    "h2": "Indlela amaxesha okuphela azaliswa ngayo",
    "ps": [
     "Umgaqo ulula: **umgca ngamnye uhlala kude kuqale olandelayo**; umgca wokugqibela awunanto \"elandelayo\", ngoko ufumana 3 imizuzwana. Kwakhona, ii-timestamp ze-LRC ziphatha kuphela imizuzu nemizuzwana — akukho iyure — kwaye intsimi yemizuzu ayidluli (62:05 kuthetha 1 iyure 2 imiz 5 s), ngoko iingoma ezinde kakhulu ezifana ne-DJ mix zifunda ngokuchanekileyo."
    ]
   },
   {
    "h2": "Indlela yokuguqula",
    "ps": [
     "Vula [[converter|/convert.html]], faka i-LRC, khetha **SRT - SubRip** njengomphumo, uze uguqule kwaye ukhuphele. Ilungele iividiyo zomculo kwaye ukubeka amazwi eengoma njengezihloko zangaphantsi kubadlali; i-SRT ethunyelweyo inokuguqulwa kwakhona ibe yi-VTT yewebhu."
    ]
   }
  ]
 },
 "make-bilingual-subtitles": {
  "seo": {
   "title": "Iindlela ezimbini zokwenza izihloko zangaphantsi ezilwimi zimbini – AI-SRTSub",
   "desc": "Izihloko zangaphantsi ezilwimi zimbini ziza ngeendlela ezimbini: imigca emibini kumgca omnye, okanye imigca emibini kwixesha elifanayo. Iingenelo, iingxaki, kunye nendlela yokutshintsha phakathi kwazo. – AI-SRTSub",
   "h1": "Iindlela ezimbini zokwenza izihloko zangaphantsi ezilwimi zimbini",
   "intro": "Isihloko esifanayo solwimi olubini sinokufihla uyilo ezimbini ezahluke ngokupheleleyo. Funda ukuzahlula, kwaye ukwenza, ukwahlula, kunye nokuguqula konke kuyeka ukukukhubekisa.",
   "ctaText": "Sebenza ngezihloko zangaphantsi ezilwimi zimbini"
  },
  "body": [
   {
    "h2": "Zinjani iiNdlela eziMibini",
    "ps": [
     "**Ifomu B: imigca emibini kwixesha elifanayo.** Umgca omnye wencoko uba yimigca emibini yezihloko ezahlukileyo enexesha elifanayo — enye isiNgesi, enye isiTshayina — ezotywe ziphezulu omnye komnye. Le yeyona ndlela iqhelekileyo yokuba izihloko ze-ASS ezilwimi zimbini zakhiwe ngayo."
    ]
   },
   {
    "h2": "Apho Uhlobo ngalunye lwehlileyo khona",
    "ps": [
     "Indawo ebuthathaka yeFomu A **kukufumanisa**: ukwahlula imikhondo kuxhomekeke kwinkqubo yokubhala, ngoko iimbini zesiTshayina-siNgesi okanye zesiJapanese-siNgesi zahlukana ngokujonga nje, ngoxa **iziqwengana ezabelana ngeskripthi esinye** — isiNgesi kunye nesiFrentshi, okanye isiTshayina kunye nekanji yaseJapan — azinakwahlulwa. Indawo ebuthathaka yeFomu B **kukwenza**: amaxesha amabini kufuneka ahambelane ngokuchanekileyo kwaye ukuwalungelelanisa ngesandla kuyadina; abanye abadlali bayazoba zombini imigca exesha elifanayo, bevalela isikrini. Umgaqo wesandla: sebenzisa iFomu A yezihloko ezigqitywe ezithethwe kububukeli; sebenzisa iFomu B xa ufuna ukutsala imigca yahlukane ukuze usebenze ngaphambili."
    ]
   },
   {
    "h2": "Iindlela eziMibini",
    "ps": [
     "**Yakha izihloko zangaphantsi ezilwimi zimbini ukusuka kokuqala**: sebenzisa [[AI Subtitle Translation|/translate.html]] kwaye ukhethe “Bilingual · original on top” okanye “Bilingual · translation on top” ekuthumeleni — ufumana iFomu A ngqo; ukukhetha i-ASS kukwabonelela ngezibonelelo ezimbini, “stacked top and bottom” kunye “two lines at the bottom”.",
     "**Dibanisa imikhondo emibini okanye guqula phakathi kweefomu**: sebenzisa [[Bilingual Subtitle Stripper|/bilingual.html]] kunye “merge into one two-line entry” indlela yayo — iFomu B ngaphakathi, iFomu A ngaphandle; ukuhamba ngendlela enye, “split into two files” ithatha iFomu A okanye B ngaphakathi kwaye inika imikhondo emibini ezimeleyo ngaphandle."
    ],
    "img": {
     "file": "bilingual-modes",
     "alt": "Iindlela ezine zomkhuhlizi wolwimi olubini; “merge into one two-line entry” idibanisa imigca emibini ezabelana ngexesha",
     "cap": "“Merge into one two-line entry”: Ifomu B iba yiFomu A"
    }
   },
   {
    "h2": "Yiyiphi Isixhobo Esiya kuyidlala",
    "ps": [
     "Abadlali bewebhu (i-HTML5 `<track>`) kunye uninzi lwabadlali beselula bayiphatha iFomu A ngokuthembekileyo; abadlali bedesktop (VLC, mpv, PotPlayer) bamkela zombini kwaye banokunika imigca emibini exesha elifanayo imibala eyahlukeneyo kunye neendawo. Xa unqabile, thumela i-Form A njenge-SRT — ihamba kakuhle kakhulu. Ngokwahlula phakathi kweefomu ngokwazo, bona [[SRT, VTT or ASS: Which Should You Use|/guides/subtitle-format-comparison.html]]."
    ],
    "img": {
     "file": "translate-export",
     "alt": "Izinketho zesitayile solwimi olubini kwiphaneli yokuthumela yesixhobo soguqulo",
     "cap": "Khetha uluhlu lwemigca yolwimi olubini ngqo ekuthumeleni — inyathelo elinye kwaye kwenziwe"
    }
   },
   {
    "h2": "Imibuzo Ebuzwa Rhoqo",
    "ps": [
     "**Izihloko zangaphantsi ezilwimi zimbini zikhangeleka ziqineneyo — yintoni endinokuyenza?** Lawula ububanzi bomgca: iphaneli yokuthumela yesixhobo soguqulo inesicwangciso “bilingual line width”; umgca omncinci uthetha abalinganiswa abancinci ngomgca ngamnye kunye nesikrini esicocekileyo.",
     "**Ndífuna umkhondo omnye kuphela.** “keep original only / keep translation only” yomkhuhlizi iyayiphatha ngokucofa kanye, bona [[Split Bilingual Subtitles into Two Tracks|/guides/split-bilingual-subtitles.html]]."
    ]
   }
  ]
 },
 "merge": {
  "seo": {
   "title": "Ukudibanisa amazwi awahlukeneyo kunye nezihloko ezinesitayile – Dibanisa, sitala, thumela – AI-SRTSub",
   "desc": "Dibanisa iifayile zezihloko zangaphantsi ezimbini zibe ngumkhondo wolwimi olubini, sitala ifayile yolwimi olubini ekhoyo, okanye sitala ulwimi olunye: iindlela zokudibanisa, i-ASS kunye ne-VTT templates, kunye nokuba yiyiphi ifayile omayithumele.",
   "h1": "Indlela yokusebenzisa ukudityaniswa kolwimi olubini kunye nezihloko ezizodwa",
   "intro": "Dibanisa iifayile zezihloko zangaphantsi ezimbini zibe ngumkhondo omnye wolwimi olubini, okanye sitala izihloko ngqo: ifonti, umbala, umda kunye nendawo yinto oyibonayo yiyo oyifumanayo, kwaye umboniso ohambelana nokuthumela.",
   "ctaText": "Vula isixhobo sesihloko esineziphumo ezizodwa"
  },
  "body": [
   {
    "h2": "Into eyenziwa sesi sixhobo",
    "ps": [
     "Eli phepha linye ngokwenene ligubungela imisebenzi emithathu: ukudibanisa okuqala kunye nefayile yesihloko esiguqulelweyo ibe yifayile enye yolwimi olubini, ukulungelelanisa uluhlu kunye nesitayile sefayile esele ingeyolwimi olubini, kunye nokongeza iziphumo ezizodwa kwifayile yolwimi olunye. Zombini ezintathu zabelana ngemigaqo yesitayile efanayo kunye nomboniso olinganayo."
    ]
   },
   {
    "h2": "Imisebenzi emithathu, iphepha linye",
    "ps": [
     "Phezulu ephepheni kukho iithebhu ezintathu: **Dibanisa iifayile ezimbini**, **Lungisa ifayile yolwimi olubini**, **Ifayile yolwimi olunye**. Ukhetho lwakho lugqiba ukuba zingaphi iikholamu zokufaka ezivelayo ngasekhohlo.",
     "Xa udibanisa iifayile ezimbini, icala lasekhohlo libambe iikholamu ezimbini, \"1 Izihloko zangaphantsi zokuqala\" kunye \"2 Izihloko zangaphantsi eziguqulelweyo\"; nganye yamkela ifayile elayishiweyo okanye okubhaliweyo okunamathiselwe ngqo. Ukulungelelanisa ifayile yolwimi olubini kunye nokusitala ifayile yolwimi olunye nganye idinga ikholamu enye kuphela."
    ],
    "img": {
     "file": "merge-mode",
     "alt": "Iithebhu ezintathu phezulu kwesixhobo sesihloko esineziphumo ezizodwa kunye nendawo yokufaka ngasekhohlo",
     "cap": "Iithebhu ezintathu phezulu; ukukhetha \"Dibanisa iifayile ezimbini\" kuzisa ikholamu yokuqala neyeguqulelweyo ngasekhohlo"
    }
   },
   {
    "h2": "Indlela iifayile ezimbini ezidityaniswa ngayo",
    "ps": [
     "Into yokuqala phantsi \"3 Dibanisa useto\" yindlela yokudibanisa: **Pair by order · use the original timeline**, **Pair by timeline · use the original timeline**, **Pair by order · use the translated timeline**.",
     "Xa zombini iifayile zinenani elifanayo lamangeniso kuluhlu olufanayo, ukudibanisa ngocwangciso yeyona khuselekileyo. Xa amanani ahluka (elinye icala lidibanise amangeniso, elinye lawahlula), dibanisa ngexesha kwaye uvumele isixhobo silungelelane ngokusondela. Ixesha likabani eliza kusetyenziswa kuxhomekeke ekubeni yiyiphi ifayile echaneke ngakumbi — ngokuqhelekileyo eyokuqala.",
     "Ngaphantsi kwaloo nto kukho ubume bokubhaliweyo (ukufumanisa ngokuzenzekelayo / imigca emibini ngangeniso ngalinye / iimbini ezitshintshelanayo) kunye nocwangciso (eyokuqala phezulu / uguqulelo phezulu)."
    ],
    "img": {
     "file": "merge-pair",
     "alt": "Uhlobo lokudibanisa, ubume bokubhaliweyo kunye nezinketho zocwangciso phantsi koseto lokudibanisa",
     "cap": "Indlela yokudibanisa igqiba ukuba yiyiphi imigca ehamba nayiphi, kwaye ixesha likabani eliza kusetyenziswa libekwe apha nakho"
    }
   },
   {
    "h2": "Lungisa isitayile into nento",
    "ps": [
     "Iphaneli yesitayile ihle ngasekunene. Xa uthumela i-ASS, ibhloko ethi \"ASS appearance\" iyasebenza: uyilo (split · separated top and bottom / stacked · two lines at the bottom), ubungakanani, umbala, ukungabonakali, ifonti, isibindi, i-italik, isithuba samagama, umda, umbala womda, isithunzi/imvelaphi (none / shadow / background), ubunzulu, umbala womda, ukungabonakali komda, ulungelelwaniso oluthe tye (bottom · left / bottom · centre / bottom · right) kunye nomgama osuka ezantsi woguqulelo (primary) umgca, kunye nelfonti, isithunzi/imvelaphi kunye nemida yasekhohlo/yasekunene yomgca wokuqala (secondary).",
     "Xa uthumela isitayile se-VTT yolwimi olubini, ibhloko ethi \"WebVTT style\" iyasebenza: ngaphezulu kwezinto ezintandathu (standard / compact / cinematic / top / accessible / portrait) unokutshintsha umgca othe nkqo, i-anchor (bottom / top / centre), indawo ethe tye, ubungakanani bobubanzi, ixexesha lolungelelwaniso kunye nokuphakama komgca wawo wonke umgca, kunye nombala wemvelaphi, ukungabonakali kwemvelaphi kunye nobubanzi bomda womgca woguqulelo; umgca wokuqala unokuzuza isitayile esikhulu okanye umiselwe ngokwahlukeneyo.",
     "Xa ugqibile unokugcina umphumo njengendawo eyayilungisiwe kwaye uyisebenzise kwakhona kamva ngokuyikhetha phantsi \"From saved presets\" kwaye ucofe \"Apply\"."
    ],
    "img": {
     "file": "merge-style",
     "alt": "Iparameters zepaneli yokubonakala kwe-ASS ngasekunene",
     "cap": "Ubungakanani, umbala, umda, isithunzi/imvelaphi kunye nolungelelwaniso konke kuyalungiseka, kwaye umphumo unokugcinwa njengendawo eyayilungisiwe"
    }
   },
   {
    "h2": "Jonga umboniso ngaphambi kokuthumela",
    "ps": [
     "\"Merge preview\" yitafile: #, ixesha, okuqala, uguqulelo, isitayile. Iba phezulu ihluza imigca ekrokrisayo \"has sound effects\", \"has a speaker prefix\", \"shorter than 1 second\", \"more than two lines\" kunye \"reading speed exceeded\", okanye ngegama elingundoqo owachayayo.",
     "Ukucofa isithuba sesitayile somgca wandisa umlawuli walo sithuba kwaye udwelisa kuphela imigca eyisebenzisayo; \"Clear all overrides\" ibuyisela lonke utshintsho olwenziwe ngesandla kwisakhelo. Indawo yokulungelelanisa ixesha engezantsi iphethe i-offset yehlabathi (ukusuka kumgca onikiweyo) kunye nokulinganiswa komlinganiselo.",
     "Nje ukuba ikhangeleka ilungile, yiya \"4 Export\": khuphela ifayile yesihloko okanye ukope okuqukethwe kuyo."
    ],
    "img": {
     "file": "merge-preview",
     "alt": "Itafile yomboniso wokudibanisa kunye nebha yayo yokuhluza",
     "cap": "Umboniso kukuthumela; hluza imigca ekrokrisayo ngohlobo okanye wandise isithuba sesitayile esinye"
    }
   },
   {
    "h2": "Yintoni eshiywe ingachwaphazelwanga",
    "ps": [
     "Ukusitala kutshintsha ukubonakala kuphela, akuzange kutshintshe incoko. Okubhaliweyo kokuqala kunye noguqulelo akuguqulwa ngumntu omnye ngexesha lokudibanisa; ngaphandle kokuba uyayitshintsha ngabom kwindawo yokulungelelanisa engezantsi komboniso, ixesha livela kwifayile oyikhethileyo.",
     "Xa uthumela i-SRT okanye \"VTT without styling\", akukho lwazi lwesitayile olubhalwa efayilini — iphepha likuxelela ukuba i-VTT ayinabhloko ye-STYLE kwaye umdlali uza kusebenzisa ukubonakala kwakhe okungagqibekanga. Ukuba ufuna isitayile, khetha isitayile se-VTT solwimi olubini okanye i-ASS."
    ]
   },
   {
    "h2": "Imibuzo eqhelekileyo",
    "ps": [
     "**Kutheni ukuba iifayile ezimbini zinenani lamangeniso elahlukeneyo?** Sebenzisa \"Pair by timeline\" kwaye isixhobo silungelelana ngokusondela; amangeniso angenakho ukulungelelaniswa akasungulwa.",
     "**Kutheni ukuba umdlali engahoyi isitayile kwi-ASS ethunyelweyo?** Izitayile zigcinwa ngaphakathi kwefayile, kodwa inkxaso yomdlali ye-ASS iyahluka. Ukuba udinga ukubukeka okuphathekayo ngakumbi, thumela isitayile se-VTT solwimi olubini.",
     "**Ndibuyela njani kwisakhelo sokuqala emva kokuyonakalisa?** \"Restore default parameters\" kwibhloko ye-ASS kunye \"Restore template defaults\" kwibhloko ye-VTT nganye iseta ngokutsha icandelo layo.",
     "**Yintoni imigca esixhenxe kwi-sampuli?** Ziyimboniso eyakhelwe ngaphakathi, kuphela ukuze ubone ukuba ukudibanisa kukhangela njani; isampuli ayinakuthunyelwa. Layisha izihloko zakho zangaphantsi kwaye ucofe umboniso wokudibanisa kwaye zitshintshwa ngokuzenzekelayo."
    ]
   },
   {
    "h2": "Ukugcinwa kwemfihlo",
    "ps": [
     "Izihloko zangaphantsi ziqhutywa ngokupheleleyo kwisikhangeli: akukho nto ikhuphelelwa phezulu kwaye akukho nto ihamba ngeseva. Vala isikhangeli kwaye yonke into kuloo seshoni ihamba."
    ]
   },
   {
    "h2": "Izixhobo ezinxulumeneyo kunye nezikhokelo",
    "ps": [
     "Ukwahlula ifayile yolwimi olubini ibuyele emikhondweni emibini sebenzisa [[Bilingual split|/bilingual.html]]; ukuhamba ngendlela enye kwaye ujike ulwimi olunye lube yifayile yolwimi olubini bona [[Two ways to make bilingual subtitles|/guides/make-bilingual-subtitles.html]]; uqhube umphumo ngaphakathi [[Subtitle QC|/qc.html]]; kwisizini yonke ngaxeshanye sebenzisa [[Batch conversion|/batch.html]]."
    ]
   }
  ]
 },
 "qc": {
  "seo": {
   "title": "Indlela yokusebenzisa i-Subtitle QC – Ixesha & Ukuhlolwa koYilo – AI-SRTSub",
   "desc": "I-Subtitle QC: 17 imigaqo ibamba ukugqitha, ububanzi bomgca, isantya sokufunda kunye namanqaku, imida ngelixa 27 iilwimi. Isiqingatha zilungiso zokucofa kanye; khuphela ingxelo.",
   "h1": "Indlela yokusebenzisa i-Subtitle QC",
   "intro": "Phambi kokuba unikele ngezihloko zangaphantsi, ziqhube kwiphepha le-QC lexesha kunye noyilo: yintoni ehlolwayo, indlela yokufunda ingxelo, kunye nokuba yeyiphi imiba enokulungiswa ngokucofa kanye — konke kugubungelwe apha.",
   "ctaText": "Vula i-Subtitle QC"
  },
  "body": [
   {
    "h2": "Yintoni le Sixhobo Senzelwe Yona",
    "ps": [
     "Izihloko zangaphantsi ezikhangeleka zilungile ngamehlo angenanto zihlala zifunyanwa zinexesha eligqithanayo, imigca ebanzi kakhulu, okanye isantya sokufunda esiphezulu kakhulu emva kokuhanjiswa. Iphepha le-QC lidwelisa le miiba nganye nganye:"
    ]
   },
   {
    "h2": "Khetha Imigaqo yoLwimi Kuqala",
    "ps": [
     "Phantsi “Check by which language’s rules” umisela imida emihlanu: **ububanzi bomgca omnye obuninzi** (42 iyunithi yesiqingatha sobubanzi yendawo evulekileyo ngokungagqibekanga, 36 yesikwere, 28 yobude), **umda wesantya sokufunda** (18 iiyunithi zobubanzi ngesibini zesiTshayina, isiJapanese nesiKorean, 20 kwezinye iilwimi), **ubude obuncinci be 833 milliseconds**, **ubude obuninzi be 7000 milliseconds**, kunye **ubuninzi 2 imigca**. Misela ulwimi lwesihloko sibe kukufumanisa ngokuzenzekelayo okanye ukhethe enye ye 27 ngesandla; ukujikeleza kwesikrini kutshintsha kuphela inqanaba lobubanzi bomgca — isantya sokufunda, ubude kunye nenani lemigca zihlala njengoko zinjalo. Iiyunithi zesiqingatha sobubanzi ngumlinganiselo owabelwanayo: umhanzi omnye ubala njenge 2, ileta yesiLatin enye njenge 1 — ububanzi bomgca 42 bulingana 21 abahanzi okanye 42 ileta."
    ],
    "img": {
     "file": "qc-rules",
     "alt": "Useto lwe-QC: iibhokisi zokufaka umida emihlanu kunye nolwimi lwesihloko kunye namachaphaza okujikeleza kwesikrini",
     "cap": "Imida emihlanu + ulwimi + ukujikeleza; ukungagqibekanga kuhambelana nomkhwa oqhelekileyo weshishini"
    }
   },
   {
    "h2": "Ukufunda Ingxelo",
    "ps": [
     "17 Imigaqo yengxelo ibika izinto ezifunyenweyo ngamanqanaba amathathu: **impazamo** (umbhalo ongaqondakaliyo, ifomathi ye-timestamp, ukuphela ngaphambi kokuqala, ukubala okwaphukileyo), **izilumkiso** (amangeniso angenanto, ukugqitha, ubude obufutshane kakhulu okanye obude kakhulu, isantya sokufunda ngaphezu komda, imigca ebanzi kakhulu, ngaphezu kwemigca emibini), kunye **namacebiso** (indawo yokuphefumla umgca, izithuba zangaphambili okanye zangasemva, izithuba ezingekho, amanqaku aqhelekileyo, nokunye okuninzi). Into nganye efunyenweyo ineNani lingeniso kunye “measured X, threshold Y” inkcukacha, kwaye uluhlu lunokuhltulwa ngenqanaba. Amangeniso ezilwimi zimbini afumana ukukhululwa: zombini iifomu ziyafumaniswa ngokuzenzekelayo, ukujonga ukugqitha kukhulula yonke iimbini, kwaye isantya sokufunda sibala kuphela umgca obhalwe ngolwimi olujoliswe kulo."
    ],
    "img": {
     "file": "qc-report",
     "alt": "Indawo yengxelo ye-QC: izinto ezifunyenweyo ziqokelelwe ngempazamo, isilumkiso kunye necebiso, nganye inenani lingeniso kunye nexoxwayo elilinganisiweyo",
     "cap": "Ingxelo yenqanaba elithathu: yonke into efunyenweyo iphethe inani layo lingeniso kunye namaxabiso alinganisiweyo/omida"
    }
   },
   {
    "h2": "Ukulungisa kunye nokuThumela",
    "ps": [
     "Ikhadi “Fix & export” lidwelisa kuphela **izinto ezinokulungiswa ngokuzenzekelayo**: ukuqina kwakhona, ukususa amangeniso angenanto, ukongeza izithuba ezingekho, ukufaka endaweni yamanqaku ngokwemigaqo yolwimi, ukubala ngokutsha — yonke into eshiya ixesha lingachwaphazelwanga itshekiwe ngokungagqibekanga; **izinto ezitshintsha ixesha** (ukutshintshana ukuqala nokuphela, ukushukumisa ukugqitha, ukusika okanye ukolula ubude) azitshekiwanga ngokungagqibekanga — zitsheke emva kokujonga impucuko ngokwakho. Cofa “Apply fixes” kwaye ukuhlola okutsha kuqala ngokuzenzekelayo; isbala sibala kuphela oko kulungiswe ngokwenene — imigca engenakulinganiswa kwakhona ayiphakanyiswa kumanani. **Isantya sokufunda ngaphezu komda asinakulungiswa ngokuzenzekelayo**: umtshini awukwazi ukwazi ukuba yeyiphi igama eliza kusikwa, ngoko uguqulelo lufuneka lucutshwe ngesandla okanye ixesha lilungiswe. Emva kolungiso, thumela i-SRT okanye i-VTT, okanye cofa “Download report” ukugcina ingxelo ethi plain-text `.qc.txt`."
    ],
    "img": {
     "file": "qc-fix",
     "alt": "Ikhadi lolungiso: ibhokisi yokutsheka yezinto ezinokulungiswa ngokuzenzekelayo kunye neqhosha lokusebenzisa",
     "cap": "Izinto ezinokulungiswa ngokuzenzekelayo kuphela ezenza uluhlu; ukulungisa okutshintsha ixesha akutshekiwanga ngokungagqibekanga"
    }
   },
   {
    "h2": "Imibuzo Ebuzwa Rhoqo",
    "ps": [
     "**Kutheni i-ASS yam ingenakuthunyelwa?** I-QC ithumela kuphela i-SRT kunye i-VTT; i-ASS iya ngaphakathi kodwa ayiphumi ngaphandle. Ukugcina iziphumo ze-ASS, cinga ngayo ku [[Format Converter|/convert.html]] kuqala.",
     "**Kutheni isantya sokufunda 18 sithetha ukuthini?** KwisiTshayina, isiJapanese nesiKorean umda ngabalinganiswa abazalisekileyo 9 ngesibini (18 iiyunithi zesiqingatha sobubanzi); ezinye iilwimi zifumana iiyunithi zesiqingatha sobubanzi 20 ngesibini. Le ngemicimbi eqhelekileyo yokuthuthuzela, kwaye ibhokisi yokufaka ikuvumela ukuba uyitshintshe.",
     "**Ukufakela kwefayile yam kophukile — ingaba isenokuhlolwa?** I-QC ifunda UTF-8 kuphela; lungisa ukufakela kwiphepha lokulungisa umbhalo ongaqondakaliyo kuqala.",
     "**Ingaba iya kuchukumisa ixesha lam?** Ayiyi kuba nje ukuba ushiya iqela “changes timing” lingatshekiwanga; nasekuvumeni tshekwe, utshintsho ngalurubu luchazwe ngaphambi kokuba ulungiso lusetyenziswe."
    ]
   },
   {
    "h2": "Izikhokelo Ezinxulumeneyo",
    "ps": [
     "Izihloko zangaphantsi zikhanyisa ngokukhawuleza ukuba zifundwe — bona isikhokelo esizinikezelelayo [[Subtitles Too Fast to Read|/guides/subtitle-too-fast.html]]. Yintoni omayihlole ngaphambi kokuhanjiswa — uluhlu lukwi [[What to Check Before Delivery|/guides/subtitle-quality-check.html]]. Ixesha eliphuma ekubeni lingahambelani yingxaki eyahlukileyo — bona [[Subtitles Drifting Out of Sync|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "remove-subtitle-ads": {
  "seo": {
   "title": "Susa Iintengiso & Nezibona Zamazwi kuZihloko – AI-SRTSub",
   "desc": "Susa izibona zamandla kunye neentengiso kwizihloko zangaphantsi: ii-URL, ikredithi yeqela labalandeli kunye nokufakwa ngeethegi kuyacaca ngokucofa kanye, kunye namangeniso aphindwe kabini nangenanto. – AI-SRTSub",
   "h1": "Susa Iintengiso Nezibona Zamazwi kuZihloko",
   "intro": "Ii-URL, ikredithi kunye namangeniso akhuthazayo afihliweyo kwizihloko zangaphantsi zakho zicaciswa ngomzamo omnye ngemigaqo yesibona samandla somkhuhli — kwaye naluphi na ucimo olungalunganga lunokulungiswa umnqweno ngomncweno.",
   "ctaText": "Susa izibona zamandla zesihloko"
  },
  "body": [
   {
    "h2": "Yintoni ezi zibona zamandla",
    "ps": [
     "Izihloko zangaphantsi ezikhuphelelwe kwi-intanethi zihlala zifumana amangeniso angeyomfuneko ekuqaleni okanye ekupheni (ngamaxesha nasepakati): ii-URL, iidilesi ze-imeyile, amagama amaqela abalandeli, `encoded by` / `translated by` ikredithi, amagama asayithi njenge-opensubtitles, kunye nemigca enjenge “follow our WeChat account” okanye “for study purposes only”. Ngamangeniso ezihloko eziqhelekileyo — anelixa, athatatha umgca — ngoko abadlali abanakukuwacima; kufuneka zifunyenwe ngokuqukethwe."
    ]
   },
   {
    "h2": "Apho ungayenza khona",
    "ps": [
     "Vula [[Subtitle Cleaner|/clean.html]] kwaye ufake isihloko sakho; iqela “Watermarks & junk entries” sele line “Remove watermarks and ads”, “Remove duplicate entries” kunye “Remove empty entries” itshekiwe ngokungagqibekanga, kwaye ukucoca kuqala ngokuzenzekelayo. Ukufumanisa kusebenza kumanqanaba amabini: **imiboniso eqinileyo** enjengee-URL, iimeyile, amaqela abalandeli kunye namagama asayithi asusa lonke ungeno kukumiswa kwanangayiphi na ubude; **imiboniso ethambileyo** enjengee-@handle, “encoded” okanye “proofread” ikredithi zivavanywa kuphela kumangeniso amafutshane angadlulanga 40 abalinganiswa, ukunqanda ukusika incoko ende. Amangeniso ezilwimi zimbini kuqala anemigca yesibona samandla esuswe umgca ngomgca ngoxa imigca yencoko igcinwe; ungeno luyacishwa luphelele kuphela ukuba imikhondo yesibona samandla isasele emva kokucoca."
    ],
    "img": {
     "file": "clean-opts",
     "alt": "Isikrini sokukhetha ukucoca: iibhokisi zokutsheka ezintathu zeqela lemibono yesibona samandla kunye namangeniso angenanto",
     "cap": "Iqela “Watermarks & junk entries” livuliwe ngokungagqibekanga — akukho seti ngesandla efunekayo"
    }
   },
   {
    "h2": "Ukuphonononga kunye nokuthumela",
    "ps": [
     "Uluhlu lotshintsho, wonke ungeno olucishiweyo luphatha ithegi “watermark & ad” — yijonge ukuqinisekisa ukuba akukho nto isusiweyo ngempazamo; ukuba enye ikhangeleka ingalunganga, cofa “Restore” ukuyibuyisela. Nje ukuba iqinisekisiwe, khuphela: igama lefayile lifumana umboniso `.clean` ngokuzenzekelayo. Ukucoca kuqala kwindawo kwisikhangeli sakho; izihloko zangaphantsi zakho azizange zithunyelwe naphi na."
    ]
   }
  ]
 },
 "repair": {
  "seo": {
   "title": "Indlela yokulungisa i-Mojibake Subtitles – Fumanisa ukufakela – AI-SRTSub",
   "desc": "Uhambo: fumanisa ukufakela kwasekuqaleni (GBK / Big5 / Shift_JIS / EUC-KR), hlela ulungiso ngoko kufunda kakhulu njengolwimi, emva koko gcina UTF-8 nge-BOM okanye GBK. Amaxesha kunye namandla okubala akaze atshintshe.",
   "h1": "Indlela yokulungisa izihloko ze-mojibake",
   "intro": "Ifayile yesihloko egcwele abalinganiswa benkunkuma ayifane yonakaliswe — yayifundwa nje ngokufakela okungalunganga. Isixhobo solungiso sifumanisa ukufakela kwasekuqaleni kwaye sibeka abalinganiswa abalungileyo kwakhona, sishiya amanani okubala kunye namaxesha kuphela.",
   "ctaText": "Vula isixhobo solungiso lwe-mojibake"
  },
  "body": [
   {
    "h2": "Into eyenziwa sesi sixhobo",
    "ps": [
     "Iibhayithi ezifanayo zifundwa njenge-UTF-8 kwaye zifundwa njenge-GBK zivelisa amasethi amabini ahlukeneyo apheleleyo abalinganiswa — ifayile ayonakalanga, yafundwa ngokufakela okungalunganga. Nantsi into eyenziwa yisixhobo solungiso:"
    ]
   },
   {
    "h2": "Layisha ifayile, musa ukuyinamathisela",
    "ps": [
     "Amanqaku amabini okungena anokulungisa amanani ahlukeneyo owonakaliswa, ngoko **layisha ifayile ukuba unako**. Ngelifayile, iibhayithi zokuqala zisekhona: isixhobo sizama ukufakela emva kwelinye, kwaye xa siqaphela i-GBK siyifunda njenge-GBK — akukho nto kufuneka iqikelelwe. Umbhalo othi ufike ngokunamathisela akuseyiyo iibhayithi ezikrwada. Ngexesha isikhangeli sinikezela ngentambo, impazamo sele yenzekile, ngoko isixhobo sinokusebenza kuphela emva kwaye sithathe oko sinako ukukufumana.",
     "Ukuba umbhalo onamathiselweyo sele uqulethe umlinganiswa wendawo (loo mibuzo ibhokiswe `�`), iibhayithi zokuqala ziphelile kudala kwaye akukho nto inokuzibuyisa. Iphepha litsho ngokuphandle: buyela phezulu kwaye usebenzise \"Choose file\" ukulayisha eyokuqala."
    ],
    "img": {
     "file": "repair-up",
     "alt": "Indawo yokulayisha iphepha lolungiso: indawo yokulahla kunye nebhokisi yokunamathisela, kunye nokufakela okufunyenweyo kuboniswe phezulu",
     "cap": "Tsala ifayile ngaphakathi okanye ukhangele kuyo; ibhokisi yokunamathisela ihle ngezantsi kwaye inokulungisa okuncinci kakhulu"
    }
   },
   {
    "h2": "Yintoni eboniswa yuxilongo kuwe",
    "ps": [
     "Nje ukuba ulayishe, ikhadi loxilongo linika isigwebo. **Akukho mojibake ifunyenweyo**: okuqukethwe kufundeka kakuhle njengoko kunjalo; ukuba umdlali wakho usabonisa inkunkuma, umdlali usebenzise ukufakela okungalunganga — hla uye ku \"Saveאים\", khetha enye kwaye unike leyo fayile. Xa **ikhangeleka njenge-mojibake**, ikhadi lidwelisa umkhondo owufumeneyo:"
    ],
    "img": {
     "file": "repair-diag",
     "alt": "Ikhadi loxilongo: isigwebo kunye nomkhondo ngamnye we-mojibake odweliswe umgca ngomgca",
     "cap": "Uxilongo ludwelisa imikhondo ngohlobo endaweni yokuthi nje \"yi-mojibake\""
    }
   },
   {
    "h2": "Indlela abaviwa abahlelwa ngayo, kunye nendlela yokukhetha",
    "ps": [
     "Phantsi \"Ways to fix this\", abaviwa badweliswe ngokuthi **eyona ifana nolwimi lwenene kuqala**, ukuya kuthi ga ku 12 kuzo, nganye ibhalwe ngepair yokufakela eyayifundwe kuyo nasendaweni yayo. Cofa enye ukubona ukuba ikhangeleka njani, yikhethe, emva koko hla uye phantsi ukuze ugcine. Awuvuyanga? Sebenzisa \"Keep as is\" ukubuyela kweyokuqala.",
     "Uluhlu luvela kumanqaku: isabelo sabalinganiswa abaqhelekileyo, iintambo zamagama, iintambo zemifanekiso, iindonga zabalinganiswa abangaziwayo, zonke zilinganiswe. **Ukuba akukho manqaku abonakalayo ngcono, akukho nto inconywayo** — ayiyi kutyhala umviwa osengqiqweni kuwe ngenjongo yokuba abe nomnye. Umbhalo owonakaliswe kabini (gcina kakubi kanye, emva koko wacolwa kakubi kanye) ufumana umjikelo omnye owongezelelweyo wokusebenza emva kubaviwa abaphezulu, ngoko nayiphi na into ngaphakathi kwemingqunya emibini isenokuhlangulwa."
    ],
    "img": {
     "file": "repair-fix",
     "alt": "Uluhlu lwabaviwa bolungiso oluhlelwe ngokuba lufunda kangakanani njengolwimi lwenene, nganye ibhalwe ngefayile yayo yokufakela",
     "cap": "Abaviwa abahlelwe \"njengabona bafana nolwimi lwenene\", nganye ibonisa ukufakela okubandakanyekayo"
    }
   },
   {
    "h2": "Ukugcina ngokuchanekileyo linyathelo lokugqibela",
    "ps": [
     "Umphumo olungisiweyo usadinga ukugcinwa ngokuchanekileyo. Xa umdlali engenakukwazi ukufumanisa i-UTF-8, ukugcina njenge **UTF-8 nge-BOM** (abadlali beWindows baxhomekeke kwi-BOM) okanye njenge **GBK** kuhlala kulungisa oko. Ungagcina njenge-UTF-8, UTF-8 (nge-BOM), GBK, Big5, Shift_JIS okanye EUC-KR; ukuba enye into ingafani, uxelelwa ukuba ukhethe enye (i-GBK ayinakubamba isiKorean). Iifayile ezikhutshelweyo zifumana `-fixed` yongezwe egameni.",
     "Xa ukufakela okufunyenweyo kungeyona i-UTF-8, \"Save as\" sele isethiwe kwi-UTF-8 nge-BOM kuwe. Nje ukuba uchukumise idropdown ngokwakho, iyeka ukuqikelela kwakhona."
    ],
    "img": {
     "file": "repair-out",
     "alt": "Indawo yomphumo: ibhokisi yombhalo enedropdown yokugcina-njenge kunye neqhosha lokukhuphela",
     "cap": "Khetha ukufakela, emva koko ukhuphele — igama lefayile lifumana -fixed yongezwe"
    }
   },
   {
    "h2": "Yinto engazange ichwaphazelwe",
    "ps": [
     "Kuphela abalinganiswa abafundwe kakubi abafakwayo endaweni. Amanani okubala, amaxesha kunye nemigca yesitayile se-ASS akatshintshwanga nangayiphi na indlela."
    ]
   },
   {
    "h2": "Imibuzo Ebuzwa Rhoqo",
    "ps": [
     "**ndiyilayishile ifayile, kungoko ndisadinga ukuyigcina kwakhona?** Ifayile ngokwayo idla ngokuba ilungile; okonakeleyo ngumdlali oyifundayo ngokuqhubela phambili okungalunganga. Kule meko akukho mlinganiswa kumbhalo odinga ukutshintshwa — gcina nje ikhophi njenge-UTF-8 nge-BOM okanye GBK kwaye unike loo nto kumdlali.",
     "**Kutheni umbhalo onamathiselweyo ungenakulungiswa?** Nje ukuba umlinganiswa wendawo avela kumbhalo onamathiselweyo, iibhayithi zokuqala ziphelile kwaye akukho nto inokucinga emva kuyo. Buyela phezulu kwaye usebenzise \"Choose file\" ukulayisha eyokuqala.",
     "**Umviwa endiwufunayo awudweliswanga?** Akukho nto inconywayo ngaphandle kokuba ifumana amanqaku ngcono ngokucacileyo kunale sele unayo. Zama ukutshintsha ukufakela okufunyenweyo kuye kwenye kwaye uyivumele ihlele kwakhona.",
     "**Zingaphi iifayile ngexesha elinye?** Nje ngomnye ngexesha elinye. Khuphela ulungiso, emva koko faka ifayile elandelayo."
    ]
   },
   {
    "h2": "Ukugcinwa kwemfihlo",
    "ps": [
     "Ukufumanisa kunye nolungiso kuqhubeka ngokupheleleyo kwisikhangeli sakho. Akukho nqaku lezihloko ezithunyelwa kwiseva."
    ]
   },
   {
    "h2": "Izixhobo ezinxulumeneyo kunye nezikhokelo",
    "ps": [
     "Apho i-mojibake yezihloko ivela khona kwaye kutheni igqibela ngokukhangela ngaloo ndlela — bona [[Where subtitle mojibake comes from|/guides/subtitle-garbled-characters.html]]; ukufakela kulungile kodwa okuqukethwe kungcolile — sebenzisa [[Subtitle cleanup|/clean.html]]; ukujonga ixesha kunye nesantya sokufunda — [[Subtitle QC|/qc.html]]."
    ]
   }
  ]
 },
 "sbv-to-srt": {
  "seo": {
   "title": "Isiguquli se-SBV ukuya kwi-SRT – Guqula Izihloko zangaphantsi zeYouTube – AI-SRTSub",
   "desc": "Guqula izihloko zangaphantsi ze-SBV ezikhutshelweyo kwi-YouTube zibe yi-SRT yeCapCut, Premiere, kunye nabadlali. Amaxesha axabisekileyo ahlala engachwaphazelwanga — kuphela uyilo olutshintshayo. Iyasebenza kwisikhangeli sakho.",
   "h1": "I-SBV ukuya kwi-SRT",
   "intro": "Guqula izihloko zangaphantsi ze-SBV zeYouTube zibe yi-SRT: thula ifayile, khetha i-SRT, khuphela. Amaxesha axabisekileyo awachwaphazelwanga — kuphela ubume obutshintshayo.",
   "ctaText": "Guqula i-SBV → i-SRT"
  },
  "body": [
   {
    "h2": "Yintoni i-SBV kwaye ivela phi",
    "ps": [
     "I-SBV yeyenzelwe **isihloko sikaYouTube**: ukukhuphela \"iifayile zezihloko\" kwi-YouTube kudla ngokukunika .sbv. Ubume bayo bulula kune-SRT — amaxesha okuqala nokupekela ahlala **kumgca omnye** ahlulwe ziikholamu, okuqukethwe kulandela ngqo ngaphantsi, kwaye akukho manani okubala."
    ]
   },
   {
    "h2": "Kutheni abadlali bayala",
    "ps": [
     "Ngaphandle kweYouTube ngokwayo, uninzi lwesoftware yokuhlela kunye nabadlali abayixhasi i-SBV. Ayinayo ibhloko yokubala kwaye ibhala umgca wayo wexesha ngendlela eyahlukileyo kwi-SRT, ngoko ukutshintsha igama lokuncedisa akwenzeki nto — ubume bufuneka bukwakhiwe ngokutsha ngokwenene."
    ],
    "img": {
     "file": "convert-upload-sbv",
     "alt": "Indawo yokulayisha: ifayile ye-SBV elayishiweyo, efunyenwe njenge-SBV",
     "cap": "I-SBV ifunyenwe njengoko injalo, akukho kutshintshwa kwegama lokuncedisa okudingekayo"
    }
   },
   {
    "h2": "Indlela yokuguqula",
    "ps": [
     "Vula [[converter|/convert.html]], faka i-SBV, khetha **SRT - SubRip** njengomphumo, uze uguqule kwaye ukhuphele. Amanani okubala abelwe amatsha, kwaye imigca yokuqala yokuqala ngaphakathi komgca idityaniswe yaba ngumgca omnye (i-SRT ivumela imigca emininzi; i-SBV ithunyelwa ngumgca omnye apha)."
    ]
   }
  ]
 },
 "shift": {
  "seo": {
   "title": "Indlela yokushukumisa ixesha lezihloko zangaphantsi (i-Offset, i-Scale, i-Anchors ezimbini) – AI-SRTSub",
   "desc": "Uhambo oluboniswayo lomhleli wexesha: layisha izihloko zangaphantsi, yongeza amanyathelo okulungisa, ukulungisa i-anchor ezimbini, ukulungisa umgca ngamnye kunye nokuthumela.",
   "h1": "Umhleli wexesha: Isikhokelo senyathelo ngenyathelo",
   "intro": "Eli sikhokelo sihamba isixhobo ukusuka phezulu ukuya ezantsi: layisha izihloko zangaphantsi, yongeza amanyathelo okulungisa, qhuba ukuhlola, lungisa ngokucokisekileyo umgca ngamnye, kwaye uthumele.",
   "ctaText": "Vula umhleli wexesha"
  },
  "body": [
   {
    "h2": "Layisha izihloko zakho zangaphantsi",
    "ps": [
     "Tsala ifayile kwibhokisi echaziweyo okanye cofa ukukhetha enye; unokwenza **okunamathiselweyo** ngqo kwibhokisi yombhalo. Ifomathi ifunyenwe kokubili kuhlonzi kunye nokuqukethwe, kwaye umphumo ubonisa kwisipuni sefomathi. Okufakwayo okuxhasiweyo: srt, vtt, ass (kuquka ssa), sbv, lrc kunye txt."
    ],
    "img": {
     "file": "shift-upload",
     "alt": "Indawo yokulayisha: isihloko sesampuli esilayishiweyo, esifunyenwe njenge-SRT",
     "cap": "Igama lefayile kunye nefomathi efunyenweyo zivela phantsi kwendawo yokulahla; ibhokisi yombhalo ihlala ihlelwa."
    }
   },
   {
    "h2": "Yongeza amanyathelo okulungisa",
    "ps": [
     "Ulungiso lwakha **umgca wamanyathelo**: inyathelo ngalinye lenenza umsebenzi omnye kwaye lithatha inani elinye, kunye neyunithi yalo eboniswe ngaphakathi kwibhokisi. Amanyathelo asebenza ukusuka phezulu ukuya ezantsi, kwaye ukutshintsha naluphi na inyathelo **kubala kwakhona konke ukusuka ezikrinini zangaphantsi** — ukuze ubuyele emva kwaye ulungise inani nangaliphi na ixesha ngaphandle kokwenza ubugwenxa."
    ]
   },
   {
    "h2": "Ukulungisa i-anchor ezimbini",
    "ps": [
     "Xa ungasazi i-offset ngemizuzwana okanye umlinganiselo, sebenzisa ama-anchor amabini: kanye xa wongeziwe, **iindawo zangoku ezimbini zizaliswa ngokuzenzekelayo** ukusuka kumgca wokuqala nowokugqibela wefayile yakho. Uzalisa kuphela iindawo ezijoliswe kuzo — amaxesha lawo mgca afanele abonakale ngawo. Yonke into ephakathi isasazwa ngokulinganisa."
    ],
    "img": {
     "file": "shift-step-two",
     "alt": "Ukulungisa i-anchor ezimbini: amaxesha angoku azalwe ngokuzenzekelayo, amaxesha ajoliswe kuyo ukungena",
     "cap": "Iindawo zangoku zivela kwifayile yakho; iindawo ezijoliswe kuzo ngamaxesha alungileyo owabonayo kwividiyo."
    }
   },
   {
    "h2": "Ukuhlola ixesha kunye nokulungisa umgca ngamnye",
    "ps": [
     "Emva kokusebenzisa amanyathelo, funda **ukuhlola ixesha**: imigca emifutshane kakhulu, ende kakhulu, exineneyo kakhulu ukuyifunda, imigca ebanzi kakhulu, okanye imigca egqithanayo yonke iyadweliswa. Ukuhlola **kuphawula kuphela imiba kwaye akuzange kutshintshe naluphi na into** ngokwayo. Imithetho emine emiselweyo yi 0.833 s ubude obuncinci, 7 s ubude obuninzi, 9 abalinganiswa ngesibini isantya sokufunda kunye 21 abalinganiswa ngomgca — konke kulungiseka ephepheni. Ngaphantsi kwayo, ukulungisa umgca ngamnye kukuvumela ukuba udibanise imigca emibini ekufupi, uhlule omnye, okanye uhlele ukuqala nokuqhela kwayo ngqo; yonke uhlelo lunokucinywa."
    ]
   },
   {
    "h2": "Thumela umphumo",
    "ps": [
     "Iphaneli yomphumo ibonisa amaxesha okuqala kunye naselungisiweyo **ecaleni ngecaleni** ukwenza ukuhlola okulula. Ifomathi yomphumo ingagqibekanga kwifomathi yokufaka, kodwa unokutshintshela kuye nayiphi na i-srt, vtt, ass, sbv, lrc okanye txt ngaphambi kokukhuphela."
    ],
    "img": {
     "file": "shift-result",
     "alt": "Iphaneli yomphumo: ngaphambi nangemva kwamaxesha ecaleni ngecaleni, kunye namaqhosha okukhuphela nokukopa",
     "cap": "Amaxesha okuqala ngasekhohlo, agqitywe ngasekunene; khuphela nje ukuba ukuhlola kubonakala kulungile."
    }
   }
  ]
 },
 "shift-subtitle-timing": {
  "seo": {
   "title": "Indlela yokushukumisa zonke izihloko zangaphantsi kwangaphambili okanye kamva – AI-SRTSub",
   "desc": "Wonke umgca uphosakele ngesixa esifanayo: sebenzisa inyathelo lokushukumisa lomhleli wexesha — faka inani elibi okanye elihle elinye kwaye yonke imigca ishukumisa kunye.",
   "h1": "Shukumisa Yonke Ifayile yesihloko Kwangaphambili okanye Kamva",
   "intro": "Isandi siyaqala, isihloko sibonakala kamva — kwaye wonke umgca uqobo uphosakele ngesixa esifanayo. Loo nto yi-offset ehambelanayo: inani elinye liyayilungisa.",
   "ctaText": "Vula umhleli wexesha"
  },
  "body": [
   {
    "h2": "Kuqala kuqinisekiswe ukuba wonke umgca uphosakele ngesixa esifanayo",
    "ps": [
     "Jonga umgca omnye kufuphi nokuqala, omnye phakathi, kwaye omnye ekupheni. Ukuba zontathu ziphosakele ngesixa esifanayo malunga, yiyo **i-offset ehambelanayo**, kwaye inyathelo lokushukumisa elinye liyayilungisa. Ukuba ukuqala kulungile kwaye ukulahleka kukhula isiya ekupheni, yingxaki eyahlukileyo — bona [[subtitles getting more and more out of sync|/guides/subtitles-out-of-sync.html]]."
    ]
   },
   {
    "h2": "Into yokufaka: engalunganga ukuhambisa phambili, elungileyo ukulibazisa",
    "ps": [
     "Kumhleli wexesha, yongeza **Shift all** inyathelo kwaye ufake i-offset kwibhokisi yexabiso: izihloko ezibalekayo kamva zithatha inani elibi ukuzitsalela kwangaphantsi; ukubaleka kwangaphambili kuthatha inani elihle ukuzityhalela kamva. Ukuba izihloko zangaphantsi ziyi 1.5 imizuzwana kamva, faka **-1.5** — iyunithi yimizuzwana."
    ],
    "img": {
     "file": "shift-step-shift",
     "alt": "Shukumisa lonke inyathelo kunye -1.5 imizuzwana efakiweyo",
     "cap": "Inani elibi litsala yonke ifayile kwangaphantsi; iyunithi ibhalwe ngaphantsi kwibhokisi, kwimizuzwana."
    }
   },
   {
    "h2": "Qhuba kwaye uhlole umgca wokuqala",
    "ps": [
     "Emva kokusebenzisa, iphaneli yomphumo idwelisa amaxesha okuqala kunye namatsha omgca ngamnye **ecaleni ngecaleni**. Hlola umgca wokuqala kuqala: ngaba ixesha elitsha lokuqala liwela kwifreyimu apho umgca uthethwa khona? Emva koko jonga omnye phakathi. Wonke umgca ushukumisa ngesixa esifanayo kwaye ugcina ubude bawo."
    ]
   },
   {
    "h2": "Thumela",
    "ps": [
     "Nje ukuba ukuhlola kubonakala kulungile, khuphela ngokuthe ngqo. Ifomathi yomphumo ingagqibekanga kwifomathi yokufaka kwaye inokutshintshwa kwenye into. Utshintsho luchukumisa amaxesha kuphela — hayi umntu omnye wokubhaliweyo."
    ]
   }
  ]
 },
 "simplified-traditional-chinese": {
  "seo": {
   "title": "AyisisiNtshintsho sikaMlinganiswa – Okunye-kuya-Kwinani elininzi kunye namagama aseRharhweni – AI-SRTSub",
   "desc": "Izinto ezintathu zenza oku kube nzima: imaphu enye-kuya-kwinani elininzi ezisulungekisiweyo ngegama, ulwimi olwahlukileyo lwaseTaiwan neHong Kong, kunye nokuguqula incoko kuphela. Fumana zontathu zilungile kwaye akukho msebenzi womntu olandelayo.",
   "h1": "Eyenziweyo ngokulula vs yendabuko ayisisiNtshintsho sikaMlinganiswa",
   "intro": "Ngowuphi umlinganiswa wendabuko othatnda indawo yobenziweyo ngokulula kuxhomekeke kumlinganiswa ohlala ecaleni kwakhe. Yiyo le nto le nguqulelo ingenakwenziwa ngokutshintsha ngokungaboni umlinganiswa omnye ngexesha.",
   "ctaText": "Vula isiguquli"
  },
  "body": [
   {
    "h2": "Okokuqala: ifomu enye eyenziweyo ngokulula, ezininzi zendabuko",
    "ps": [
     "Ukwenza lula kwadibanisa abalinganiswa bendabuko abaninzi babe yifomu enye eyenziweyo ngokulula. Ukubuyela kwakhona ngenye indlela, umlinganiswa omnye owenziweyo ngokulula uhambelana nabalinganiswa bendabuko abaninzi, kwaye ukukhetha phakathi kwabo kuxhomekeke kwinto edibene nayo:",
     "Ukutshintsha umlinganiswa ngomlinganiswa kuzidibanisa zonke zibe yinto enye kwaye kufumana zonke izihlandlo zibe ngagalelo. Ukusombulula **ngegama** yiyo eyahlulayo — iitheyibhile zivela kwi-OpenCC, zihambelana nemishwana ngaphambi kwabalinganiswa abanye. Umzekelo:"
    ]
   },
   {
    "h2": "Okwesibini: I-Taiwan ne-Hong Kong ayisiyiyo into enye",
    "ps": [
     "Kukho maleko omnye emva kokuguqula ukuya kwendabuko: igama elifanayo libhalwe ngokwahlukileyo eTaiwan naseHong Kong. Igama \"software\" yinto enye eTaiwan kwaye yenye eHong Kong, kwaye i-Taiwan isebenzisa igama layo \"information\".",
     "Ngenxa yoko iindlela ezahlukeneyo. Isiko laseTaiwan likwahlula libe \"change wording\" kunye \"glyphs only\" — glyphs only igcina isigama sakho esikhoyo, ngoxa change wording ishintsha amagama aseRharhweni. I-Hong Kong ifumana indlela yayo."
    ],
    "img": {
     "file": "hanconv-dir",
     "alt": "Guqula ukuya ekhadini: idropdown yendawo ebonisa \"Simplified → Taiwanese traditional (change wording)\"",
     "cap": "I-Taiwan inikezela utshintsho lwamagama okanye ama-glyph kuphela; i-Hong Kong inendlela yayo"
    }
   },
   {
    "h2": "Okwesithathu: incoko kuphela ekufuneka ichukunyiswe",
    "ps": [
     "Ifayile yesihloko ayisiyincoko kuphela. Amanani okubala, amaxesha kunye nemigca yesitayile se-ASS ikhona apho, kwaye akukho mlinganiswa wazo ofanele uguqulwe — imigca yesitayile se-ASS ngokukodwa, kuba iqulethe amagama alawulayo wesiNgesi aphula ngemizuzu aphathwa ngayo njengencoko.",
     "Ngoko ukuguqula kuyenzeka emva kokuhlahlela ngifomathi: SRT, VTT, ASS kunye TXT nganye ichonga ukuba yiyiphi inxalenye eyincoko, kwaye kuphela abalinganiswa abaphakathi kwayo abaguqulwayo. Amaxesha nezitayile ziyasinda zingachwaphazelwanga, kunye nokungabikho kofomathi ekufanele iphindwe yenziwe."
    ],
    "img": {
     "file": "hanconv-out",
     "alt": "Indawo yomphumo: isihloko esiguqulelweyo kunye nebha yezibalo ebonisa inani lemigca etshintshiweyo",
     "cap": "Ibha yezibalo ibonisa ukuba mingaphi imigca etshintshileyo; ufomathi igcinwe njengoko injalo"
    }
   },
   {
    "h2": "Ukubuyela kwento eyenziweyo ngokulula: qaphela",
    "ps": [
     "Ukuguqula okwendabuko ukuya kwinto eyenziweyo ngokulula kukwafuna ukuba uthi **uvela kuluhlu luni lwendabuko**: generic, Taiwanese kunye Hong Kong ziindlela ezintathu ezahlukeneyo, kuba isigama saseRharhweni kufuneka sibuyiselwe kwigama elijikeleziweyo ngaphambi kokuba siphinde siguqulwe. Khetha indlela engalunganga kwaye isigama saseRharhweni siyasinda kumphumo owenziweyo ngokulula.",
     "Iqela elisezantsi leendlela ezisixhenxe yileyo iguqula emva: traditional → simplified, Taiwanese → simplified, Hong Kong → simplified."
    ]
   },
   {
    "h2": "Izixhobo ezinxulumeneyo kunye nezikhokelo",
    "ps": [
     "Uhambo olupheleleyo — [[How to convert simplified and traditional subtitles|/guides/hanconv.html]]; ukuba konke okudingayo kukwenza okwenziweyo ngokulula kube yindabuko — [[Convert simplified subtitles to traditional|/guides/srt-simplified-to-traditional.html]]; ukuguqulela kolunye ulwimi, [[Subtitle translation|/translate.html]]."
    ]
   }
  ]
 },
 "split": {
  "seo": {
   "title": "Ukuqhekeka nokujoyina imibhalo engezansi – Sika ngebhloko, xhumanisa ngokulandelelana – AI-SRTSub",
   "desc": "Sika ifayela elilodwa libe yizigaba ngobude besikhathi noma ngenani lama-cue, qala kabusha ngalinye ku-zero, noma xhumanisa amafayela amaningana ngokulandelelana noma uwahlanganise ngomugqa wesikhathi. Izinombolo zama-cue zibhalwe kabusha, umbhalo awuthintwanga.",
   "h1": "Ungasika kanjani futhi ujoyine imibhalo engezansi",
   "intro": "Sika ifayela lemibhalo engezansi elide libe yizigaba, noma ujoyine amafayela amaningana ahlukene abe lilodwa. Ukusikwa kuhlala kuwa emngceleni wokungena – umusho awusoze wanqunywa phakathi.",
   "ctaText": "Vula ukwahlukanisa nokujoyina"
  },
  "body": [
   {
    "h2": "Lokho okwenziwa yileli thuluzi",
    "ps": [
     "Ukwahlukanisa iziqephu, ukwahlukanisa izingxenye nokuhlanganisa imithombo konke kugijimela kokungafani okufanayo phakathi kwamabhloko emibhalo engezansi namabhloko evidiyo: noma ifayela elilodwa kufanele lisikwe noma amaningana kufanele ahlanganiswe. Leli khasi liphatha kokubili, ithebhu eyodwa ngayinye."
    ]
   },
   {
    "h2": "Okokuqala khetha ukusika noma ukujoyina",
    "ps": [
     "Amathebhu amabili phezulu: **Sika: ifayela elilodwa libe yizigaba** kanye **Nokho: amafayela amaningana abe lilodwa**. Izinketho zesinyathelo sesibili ezingezansi ziyashintsha ngokukhetha kwakho.",
     "Ku-\"1 Faka imibhalo engezansi\" ulayisha ifayela noma unamathisele umbhalo; uma ukhethe loyo ongalungile, chofoza u-\"Sula\". Leli khasi lifunda i-UTF-8 kuphela — uma ikhowudi iphukile (udonga lwezimpawu zemibuzo noma amabhokisi) iya ku-[[Ukulungiswa kombhalo ongafundeki|/repair.html]] kuqala."
    ],
    "img": {
     "file": "split-mode",
     "alt": "Amathebhu amabili phezulu kwekhasi lokwahlukanisa nokujoyina",
     "cap": "Ukusika nokujoyina kungamathebhu amabili; izinketho zesinyathelo sesibili zilandela ukukhetha kwakho"
    }
   },
   {
    "h2": "Ungasika kanjani",
    "ps": [
     "Phantsi 2 ka-\"How to cut\" khetha isiseko: **duration** (isiqephu esinye kuzo zonke iimizuzu «X») okanye **cue count** (isiqephu esinye kuzo zonke iisignali «X»), uze ufake inombolo.",
     "Maka u-\"Qala kabusha ingxenye ngalinye ku-0:00\" futhi ingxenye ngayinye ebangelwayo ibalwa kusuka ku-zero – sebenzisa lokhu uma ulayisha iziqephu futhi unikeza ingxenye ngayinye kumdlali uwedwa. Shiya kungamakiwe ukuze ugcine izitembu zesikhathi sokuqala, ukuze ingxenye ngayinye isalokhu iqondanisiwe nesikhundla sayo kuvidiyo yomthombo.",
     "Ukusikwa kuwa kuphela emngceleni wama-cue: uma umbhalo engezansi omude kakhulu uwela iphuzu lokusikwa, wonke ama-cue uhlala engxenyeni yangaphambili."
    ],
    "img": {
     "file": "split-cut",
     "alt": "Ubude besikhathi nezinketho zenani lama-cue ngensimbi yokuqala kabusha ku-zero ekhasini lokwahlukanisa",
     "cap": "Sika ngobude besikhathi noma ngenani lama-cue, futhi ngokuzithandela qala kabusha ingxenye ngayinye ku-0:00"
    }
   },
   {
    "h2": "Ungawoyina kanjani",
    "ps": [
     "Phantsi 2 ka-\"How to join\" khetha indlela: **Chain in order** ihambisa ifayile esemva ukuze iqale emva kokuba ephelelwe eyaphambi kwayo, kungekho kudibana phakathi kwamasegmenti; **Interleave by timeline** igcina izihamba-xesha zokuqala zefayile nganye ize ihlele ngokwexesha lokuqala.",
     "Sebenzisa ukuxhumanisa ngokulandelelana lapho amafayela kuyingxenye yokuqala neyesibili yesiqephu esisodwa, noma lapho izinhlangothi ezihlolwe ngokuhlukana kufanele zibuyiselwe ndawonye; sebenzisa ukuhlanganisa ngomugqa wesikhathi lapho amafayela engowesikrini ndawonye, njengethrekhi yokuqala nethrekhi ehunyshiwe.",
     "Emva kokujoyina izinombolo zama-cue zibhalwa kabusha ngokuzenzakalelayo futhi akukho negama lengxoxo elishintshelwayo."
    ],
    "img": {
     "file": "split-join",
     "alt": "Izinketho zokuxhumanisa ngokulandelelana nokuhlanganisa ngomugqa wesikhathi ekhasini lokujoyina",
     "cap": "Ukuxhumanisa ngokulandelelana kufanele izinhlangothi ezimbili zesiqephu esisodwa; ukuhlanganisa ngomugqa wesikhathi kufanele ithrekhi yokuqala nethrekhi ehunyshiwe"
    }
   },
   {
    "h2": "Ukuthatha umphumela",
    "ps": [
     "\"3 Result\" ngasekunene ithumela **SRT** kunye **VTT**; cofa u-\"Download\" okanye u-\"Copy\".",
     "Lapho uhlukanisa ungasebenzisa u-\"Landa zonke izingxenye\", olondoloza ingxenye ngayinye esikwe ngokushesha esikhundleni sokuchofoza kanye ngengxenye ngayinye."
    ],
    "img": {
     "file": "split-out",
     "alt": "Ukukhetha kwefomethi ye-SRT/VTT enezinkinobho zokulanda nokulanda zonke izingxenye endaweni yomphumela",
     "cap": "Imiphumela yokwahlukanisa ingalandwa ingxenye nengxenye; ifayela elijoyinisiwe lilandwa noma likopishwa ngqo"
    }
   },
   {
    "h2": "Okusele kungathintwanga",
    "ps": [
     "Akunalingiswa lengxoxo elishintshelwayo. Leli khasi liguqula kuphela ukuthi yimaphi ama-cue angcwele kwiyiphi ingxenye nokuthi abhalwa kanjani; okuqukethwe kokufakiwe kuhlala njengoba kunjalo.",
     "Ngokuthi **Xhumanisa ngokulandelelana** izitembu zesikhathi zamafayela alandelayo zishintshwa njengento eyodwa – yilokho okudingwa ukujoyina; ngokuthi **Hlanganisa ngomugqa wesikhathi** zonke izitembu zesikhathi sokuqala ziyagcinwa."
    ]
   },
   {
    "h2": "Imibuzo evamile",
    "ps": [
     "**Kuthiwani uma ingxenye yokugcina igcina imfushane kakhulu?** Lokho kujwayelekile. Okusele okungagcwalisi ingxenye yonke kuba yingxenye yayo esikhundleni sokugcwaliswa.",
     "**Ingabe umusho owela iphuzu lokusikwa uzoqhekeka?** Cha. Ukusikwa kuwa emngceleni wokungena kuphela, futhi i-cue ewela umugqa ihlala engxenyeni yangaphambili.",
     "**Emva kokuhlanganisa, ama-cue amabili anezikhathi ezifanayo ahlelwa kanjani?** Ngesikhathi sokuqala; lapho izikhathi zokuqala zilingana, ukulandelana owafaka ngakho amafayela kuyagcinwa.",
     "**Ingabe i-ASS ingahlukaniswa?** Leli khasi liphatha i-SRT ne-VTT. Guqula i-ASS iye ku-SRT noma VTT nge-[[Ukuguqulwa kwefomethi|/convert.html]] kuqala."
    ]
   },
   {
    "h2": "Ukumfihlo",
    "ps": [
     "Imibhalo engezansi icutshungulwa ngokuphelele esipheqululini: akukho okulayishwayo futhi akukho okudlula kwisiphakeli. Vala ikhasi futhi okuqukethwe sekuhambile."
    ]
   },
   {
    "h2": "Amathuluzi ahlobene nemihlahlandlela",
    "ps": [
     "Ukuhlanganisa amafayela amabili abe yithrekhi yezilimi ezimbili (esikhundleni sesiqephu esisodwa) sebenzisa [[Ukuhlanganisa kwezilimi ezimbili nemiphumela ekhethekile|/guides/merge.html]]; uma wonke umugqa wesikhathi uphumile iya ku-[[Ukulungiswa komugqa wesikhathi|/shift.html]]; kunkathi yonke yonyaka sebenzisa [[Ukuguqulwa ngeqoqo|/batch.html]]; futhi uqale [[QC yemibhalo engezansi|/qc.html]] uma usuqedile."
    ]
   }
  ]
 },
 "split-bilingual-subtitles": {
  "seo": {
   "title": "Hlukanisa Imibhalo Engezansi Yezilimi Ezimbili Ibe Izithrekhi Ezimbili – AI-SRTSub",
   "desc": "Hlukanisa imibhalo engezansi yezilimi ezimbili ibe amafayela amabili: izithrekhi zokuqala nezokuhumusha zilandwa ngokwehlukana ngamagama ahlukene; zombili izinhlobo ziyaziwa. – AI-SRTSub",
   "h1": "Hlukanisa Imibhalo Engezansi Yezilimi Ezimbili Ibe Izithrekhi Ezimbili",
   "intro": "Umbhalo engezansi wezilimi ezimbili uba amafayela amabili – “okokuqala” kanye “nokuhumusha”: layisha, khetha ukwahlukanisa-kube-kabili, landa ngalinye, ngemigqa yesikhathi igcinwe ingaphazamisekile.",
   "ctaText": "Hlukanisa imibhalo engezansi yezilimi ezimbili"
  },
  "body": [
   {
    "h2": "Lapho udinga ukwahlukanisa",
    "ps": [
     "Umdlali wakho ufuna kuphela ithrekhi yolimi olulodwa; noma ufuna ithrekhi yokuhumusha yokuhumusha kabusha, noma ithrekhi yokuqala yokubhangqa nenye inguqulo ehlunyshiwe. Umbhalo engezansi wezilimi ezimbili ungaba **i-cue eyodwa enemigqa emibili** (okokqala emugqeni owodwa, ukuhumusha komunye) noma **ama-cue amabili ahlukene ahlanganyela umugqa wesikhathi owodwa** – zombili zingahlukaniswa."
    ]
   },
   {
    "h2": "Ukuthi ungakwenza kuphi",
    "ps": [
     "Vula [[Isikhumuli Semibhalo Engezansi Yezilimi Ezimbili|/bilingual.html]] bese uphonsa umbhalo wakho engezansi. Ithuluzi lithola uhlobo lwezilimi ezimbili ngokuzenzakalelayo: i-cue eyodwa enemigqa emibili ihlukaniswa ngohlelo lokubhala, ama-cue amabili kumugqa wesikhathi ofanayo ngokulandelelana. Khetha **Hlukanisa kube kabili** ekudonselweni phansi kwemodi bese uchofoza Qala (noma uvumele kuphinde kuqale ngokuzenzakalelayo). Indawo yomphumela ibonisa izingcezu ezimbili: leyo enophawu `.orig` kuyithrekhi yokuqala, leyo enophawu `.dst` kuyithrekhi yokuhumusha – chofoza “Landa” ngayinye; izithrekhi ezimbili zihlanganyela umugqa wesikhathi ofanayo ncamashi."
    ],
    "img": {
     "file": "bilingual-split",
     "alt": "Umphumela wokwahlukanisa: ithrekhi yokuqala nethrekhi yokuhumusha njengezingcezu ezimbili, ngalinye lininkinobho yokulanda",
     "cap": "Hlukanisa kube kabili: .orig ithrekhi yokuqala + .dst ithrekhi yokuhumusha, elandelwe ngayinye yayo"
    }
   },
   {
    "h2": "Inkinga eyodwa evamile",
    "ps": [
     "**I-cue eyodwa enemigqa emibili ngezilimi ezihlanganyela i-alphabet efanayo (masithi isiNgisi kanye nesiFulentshi) ayikwazi ukwahlukaniswa.** Lapho izithrekhi zehlukene ngohlelo lokubhala, lezo zibalwa njengohlelo olulodwa futhi ziphathwa njengezilimi ezisodwa. Guqula okuqukethwe okunjalo kufomu elifanayo lomugqa wesikhathi B kuqala, bese uhlukanisa; ifomu lama-cue amabili libhangqa ngomugqa wesikhathi futhi alinendaba nolimi. Ngokuningiliziwe kwazo zombili izinhlobo, bona [[Izindlela ezimbili zokwenza imibhalo engezansi yezilimi ezimbili|/guides/make-bilingual-subtitles.html]]."
    ]
   }
  ]
 },
 "srt-file-format": {
  "seo": {
   "title": "Yini Ifayela le-SRT? Ungalivula kanjani futhi ulihlehleli kanjani – AI-SRTSub",
   "desc": "Isakhiwo samafayela emibhalo engezansi e-SRT (SubRip): inombolo, umugqa wesikhathi, umbhalo. Ungalivula kanjani kumhleli wombhalo, kungani umdlali enqaba, nokuthi ungayilungisa kanjani umbhalo ongafundeki namaphutha esitembu sesikhathi.",
   "h1": "Ifomethi Yefayela le-SRT Ichazwe",
   "intro": "I-SRT yifomethi yemibhalo engezansi yonke yendawo: umbhalo ocacile, isakhiwo esilula, samukelwa cishe yonke indawo. Lo mhlahlandlela uvula isakhiwo sawo, ukuthi ungalivula kanjani, nokuthi ungazulazula kanjani ukwehluleka okuvamile.",
   "ctaText": "Vula isiguquli semibhalo engezansi"
  },
  "body": [
   {
    "h2": "Ukuthi ifayela le-SRT libukeka kanjani",
    "ps": [
     "I-SRT (SubRip) ingumbhalo ocacile – noma yimuphi umhleli wombhalo uyayivula. I-cue ngayinye inezingxenye ezintathu: **umugqa wenombolo**, **umugqa wesikhathi**, kanye **nombhalo**, ehlukaniswe imigqa engenalutho. Umugqa wesikhathi ufunda `00:00:01,000 --> 00:00:03,500` – qaphela **kukhefu** ngaphambi kwamamilisekondi, hhayi ichashazi."
    ],
    "img": {
     "file": "convert-upload",
     "alt": "Indawo yokulayisha: ifayela le-SRT elilayishiwe elibonisa izinombolo nesikhathi",
     "cap": "I-cue ejwayelekile yezingxenye ezintathu ye-SRT: inombolo, umugqa wesikhathi, umbhalo"
    }
   },
   {
    "h2": "Ungalivula kanjani",
    "ps": [
     "Ukufunda okuqukethwe: chofoza kwesokudla bese uvula nganoma yimuphi **umhleli wombhalo**. Ukuyisebenzisa nevidiyo: qamba kabusha ifayela ukuze **ifane negama lefayela levidiyo** (ngaphandle kwesandiso), faka zombili efayeleni elifanayo, futhi abadlali abanjengoVLC, PotPlayer, noma mpv bayayilayisha ngokuzenzakalelayo; ungaphinda uyihudulele efashtireni lokudlala."
    ]
   },
   {
    "h2": "Ukulungisa ukwaliwa nombhalo ongafundeki",
    "ps": [
     "**Izinhlamvu ezingafundeki**: ifayela akusiyo i-UTF-8 – ligcine futhi njenge-UTF-8 kumhleli wakho. **Akukho okubonakalayo**: hlola ukuthi umugqa wesikhathi usebenzisa ikhefu (hhayi ichashazi) nokuthi izinombolo zama-cue aziphukile (abadlali abaningi babekezelela izikhala, abanye abakwenzi). **Ifayela yi-HTML noma i-JSON** – umthombo wokulanda wawungalungile; thola futhi."
    ]
   },
   {
    "h2": "Lokho i-SRT engakuthwala futhi engakwazi ukukuthwala",
    "ps": [
     "I-SRT iphethe umbhalo nesikhathi kuphela: **akukho zitayela** (amafonti, imibala), **akukho mkhombandlela** (lapho esikrinini), **akukho miphumela**. Lokho kudinga i-ASS – bona [[I-SRT iya ku-ASS|/guides/srt-to-ass.html]]. Ngohlangothi ngohlangothi lwawo wonke amafomethi, bona [[ukuqhathaniswa kwefomethi yemibhalo engezansi|/guides/subtitle-format-comparison.html]]."
    ]
   }
  ]
 },
 "srt-fps-converter": {
  "seo": {
   "title": "Isiguquli se-SRT FPS – Shintsha Izinga Lohlaka Lwemibhalo Engezansi – AI-SRTSub",
   "desc": "Ifilimu ingu-24fps, ukusakaza kungu-25fps, futhi imibhalo engezansi iyasehla kakhulu ngaminye: kala umugqa wesikhathi ngo-0.96 kanye futhi lonke ifayela liwela esilinganisweni esihlosiwe.",
   "h1": "Ukuguqulwa Kwezinga Lohlaka Lwemibhalo Engezansi: 24fps kuya ku-25fps",
   "intro": "Dlala imibhalo engezansi yefilimu ka-24fps kumthombo ka-25fps futhi zilahlekelwa isikhathi esingaphezu kwesekhondi ngaminye – ekupheleni kwamakhredithi ziseva imizuzu emuva. Ukulinganisa okukodwa kuyakulungisa.",
   "ctaText": "Vula umhleli wesikhathi"
  },
  "body": [
   {
    "h2": "Kungani ukungafani kwezinga lohlaka kwenza imibhalo engezansi ihambe",
    "ps": [
     "Ukuguqulwa kwezinga lohlaka kuphinda kufunde **isikhathi esifanayo ngaphansi kwamawashi amabili ahlukene**. Ifilimu ka-24fps yemizuzu engu-100 inama-s angu-6000 × 24 = **izi-144,000 zohlaka**; kumthombo ka-25fps lawo mahlaka angu-144,000 adlala ngemizuzwana engu-5760 – **imizuzu engu-96**. Lonke ifilimu lihamba imizuzu engu-4 emfushane, ngakho i-cue ngeminithi engu-50 ibonakala cishe ngemizuzu engu-2 sekwephuzile, futhi umbhalo engezansi wamakhredithi okuphela awusoze wavelaphi."
    ]
   },
   {
    "h2": "Ifomula nezinto ezivamile",
    "ps": [
     "Izinga elihlosiwe ÷ izinga lokuqala = isiphindaphindi. **24 kuya ku-25: phindaphinda ngo-0.96** (24÷25); enye indlela, 25 kuya ku-24: 1.0417. **25 kuya ku-23.976: phindaphinda ngo-0.959**; enye indlela: 1.0427. Kumhleli wesikhathi engeza isinyathelo **Kala ngesilinganiso** bese ufaka isiphindaphindi ebhokisini lenani."
    ],
    "img": {
     "file": "shift-step-rate",
     "alt": "Kala ngesinyathelo sesilinganiso no-0.96 ofakiwe",
     "cap": "0.96 ngu-24÷25; i-tip ekhasini ize isho ukuguqulwa kwezinga lohlaka njengesetshenziswa esijwayelekile."
    }
   },
   {
    "h2": "Lapho ungazi izinga ezimbili",
    "ps": [
     "Uma ungakwazi ukuthola izinga lohlaka lomthombo, ungaqageli isiphindaphindi – sebenzisa **izisekelo ezimbili** esikhundleni salokho: thatha isikhathi sangempela sokubonakala se-cue yokuqala neyokugcina njengamaphuzu amabili, futhi konke okuphakathi kuqanjwa emuva ngokulinganisela. Bona [[imibhalo engezansi ithola ukuphuma kokuvumelanisa nakakhulu|/guides/subtitles-out-of-sync.html]]."
    ]
   },
   {
    "h2": "Okufanele ukuhlola emva kwalokho",
    "ps": [
     "Ukulinganisa kunyakaza yonke indawo yokuqala nokuphela; ubude besikhathi bama-cue buqanjwa ngesiphindaphindi esifanayo. Emva kokusebenza, qinisekisa imikhawulo emibili: i-cue yokuqala (iphutha lokuqala elincane) neyokugcina (inkulu). Uma zombili iziphetho zihambisana, konke okuphakathi nakho kuyenza."
    ]
   }
  ]
 },
 "srt-simplified-to-traditional": {
  "seo": {
   "title": "Guqula Imibhalo Engezansi Eyenziwe Lula Ibe Eyendabuko – I-Taiwan noma i-Hong Kong – AI-SRTSub",
   "desc": "Guqula imibhalo engezansi yesiShayina eyenziwe lula ibe eyendabuko: khetha isi-Taiwan (ngezwi lesifunda noma ngaphandle kwalo) noma i-Hong Kong. Amamephu avela kokukodwa kuya kokuningi axazulula ngegama. Ingxoxo kuphela eshintshayo; izitembu zesikhathi zihlala lapho zikhona.",
   "h1": "Guqula imibhalo engezansi eyenziwe lula ibe eyendabuko",
   "intro": "Umbhalo engezansi wesiShayina owenziwe lula oya kubalaleli base-Taiwan noma base-Hong Kong udinga kuphela ukuguqulwa – kodwa izifunda ezimbili zifuna izinto ezihlukile, futhi ukukhetha indlela engalungile kunika amagama abantu basekhaya abangawasebenzisi.",
   "ctaText": "Guqula lo mbhalo engezansi"
  },
  "body": [
   {
    "h2": "Isidingo",
    "ps": [
     "Imibhalo engezansi yakho isiShayina esenziwe lula futhi kufanele ifinyelele kubalaleli base-Taiwan noma base-Hong Kong. Ukulungisa izinhlamvu munye ngamunye akulona iqiniso – isiqephu esisodwa sinamakhulu ama-cue – futhi izifunda ezimbili azifuni umbhalo ofanayo wendabuko: ulwazi lwamagama lwehlukile, futhi indlela engalungile ikhiqiza amagama angekho owendawo angawasebenzisa."
    ]
   },
   {
    "h2": "Ukuthi ungakwenza kuphi",
    "ps": [
     "Vula [[Ukuguqulwa kwendabuko-okwenziwe lula|/hanconv.html]], hudula umbhalo engezansi ngaphakathi, bese ukhetha enye yezinkombandlela zokwenza lula → zendabuko ngaphansi kokuthi \"Guqula ku\": okwesintu okuvamile, okwase-Taiwan (shintsha amagama), okwase-Taiwan (ama-glyphs kuphela) noma i-Hong Kong. Ukuguqulwa kwenzeka ngokushesha futhi indawo yomphumela ibonisa umbhalo engezansi oqediwe, omi ngomumo ukulandwa.",
     "**Kubalaleli base-Taiwan**: khetha \"Okwase-Taiwan (shintsha amagama)\" uma amagama esifunda kufanele ashintshe nawo – \"software\" nethi \"information\" ziba okuhambisanayo kwase-Taiwan – noma \"Okwase-Taiwan (ama-glyphs kuphela)\" uma ufuna ukuthi ukuma kwezinhlamvu kushintshwe ngenkathi ugcina amagama akho wokuqala. **Kubalaleli base-Hong Kong**: khetha \"I-Hong Kong\", lapho \"software\" kubhalwa ngolunye uhlobo futhi."
    ],
    "img": {
     "file": "hanconv-dir",
     "alt": "Guqula ikhadi: ukudonsela phansi kwendawo okuyiwa kuyo okubonisa \"Okwenziwe lula → Okwesintu kwase-Taiwan (shintsha amagama)\"",
     "cap": "I-Taiwan ne-Hong Kong izinkombandlela ezihlukene ezinamagama ahlukene"
    }
   },
   {
    "h2": "Izinkinga ezivamile",
    "ps": [
     "**Ungesabi ukulinganisa okuvela kokukodwa kuya kokuningi**: uhlamvu olufanayo olwenziwe lula emagameni athi \"hlanzekile\", \"omile\" ne-\"isihlahla somuthi\" lumephu ezinhlamwini zendabuko ezihlukene. Amathebula axazulula lokhu ngomusho, ngakho konke akulinganiswa kube uhlamvu olulodwa.",
     "**Ingxoxo kuphela eguqulwayo**: izitembu zesikhathi, izinombolo zenkomba nemigqa yesitayela se-ASS akuthintwanga, ngakho umphumela umi ngomumo ukusetshenziswa.",
     "**Akunalutho olushintshile? Hlola ngaphambi kokuba wethuke**: uma ibha yezibalo ibika imigqa engu-0 eshintshiwe, noma ifayela alinamagama esiShayina noma ifomethi itholwe kabi – hlola ukuthi \"Ifomethi etholakele\" ifana nalokho owakulayisha."
    ]
   },
   {
    "h2": "Okuhlobene",
    "ps": [
     "Incazelo ephelele yezinkombandlela zonke eziyisishiyagalolunye – [[Ungayiguqula kanjani imibhalo engezansi eyenziwe lula neyendabuko|/guides/hanconv.html]]; kungani kuyinto engaphezu kokushintshanisa izinhlamvu – [[Okwenziwe lula vs okwesintu akusona ukushintshanisa izinhlamvu|/guides/simplified-traditional-chinese.html]]; okwesintu emuva kokwenziwe lula nakho kuhlala ku-[[Ukuguqulwa kwendabuko-okwenziwe lula|/hanconv.html]]."
    ]
   }
  ]
 },
 "srt-to-ass": {
  "seo": {
   "title": "Isiguquli se-SRT siphinde sibe yi-ASS – Guqula Imibhalo Engezansi Ku-inthanethi – AI-SRTSub",
   "desc": "Guqula imibhalo engezansi ye-SRT ibe yi-ASS (Advanced SubStation Alpha) ngekhwevula engu-1920×1080 nesitayela esimisiwe esihlanzekile, esimi ngomumo ukulayishwa ohlangothini kunoma yimuphi umdlali. Kusebenza esipheqululini sakho.",
   "h1": "I-SRT iya ku-ASS",
   "intro": "Guqula imibhalo engezansi ye-SRT ibe yi-ASS: phonsa ifayela, khetha i-ASS, landa. Ikhwevula engu-1920×1080 nesitayela esimisiwe esihlanzekile zikhiqizelwa wena.",
   "ctaText": "Guqula i-SRT → ASS"
  },
  "body": [
   {
    "h2": "Lapho udinga i-ASS",
    "ps": [
     "Sebenzisa i-ASS lapho umbhalo engezansi oulayishwe ohlangothini udinga **ukuma okungcono nokulawulwa kwesitayela**: iphethe imiqondo i-SRT engenayo – usayizi wekhwevula, izitayela zamafonti, ukuqondanisa. I-mpv, PotPlayer, VLC, nabadlali abaningi bayayisekela ngqo."
    ]
   },
   {
    "h2": "Ukuthi umphumela ubukeka kanjani",
    "ps": [
     "Ithuluzi lakha kabusha ikhanda elijwayelekile: **ikhwevula engu-1920×1080**, ukugoqa okuhlakaniphile (WrapStyle 0), nesitayela esisodwa esimisiwe – i-Arial 54, umbhalo omhlophe onqenqemeni olumnyama, ezansi maphakathi. I-cue ngayinye isebenzisa lesi sitayela."
    ],
    "img": {
     "file": "convert-opt-ass",
     "alt": "Ukudonsela phansi kwefomethi yomphumela okune-ASS - Advanced SubStation ekhethiwe",
     "cap": "Khetha i-ASS njengomphumela bese ulanda emva kokuguqula"
    }
   },
   {
    "h2": "Ingabe izitayela ziyagcinwa?",
    "ps": [
     "I-SRT ayinomqondo wesitayela ekuqaleni. Futhi uma umthombo wakho usuvele ungowe-ASS, ukuguqula **kuqhaqha isitayela esimisiwe futhi akugcini isokuqala** – sebenzisa umhleli wemibhalo engezansi ozinikele wokubuyisela isitayela kwe-ASS. Isikhathi nombhalo akuthintwanga nganoma iyiphi indlela."
    ]
   }
  ]
 },
 "srt-to-excel": {
  "seo": {
   "title": "Guqula Imibhalo Engezansi Ibe yi-Excel – Hlola Umugqa ngomugqa – AI-SRTSub",
   "desc": "Thumela ngaphandle imibhalo engezansi ye-SRT iye ku-Excel: umugqa owodwa nge-cue kuzinsika ezine – inkomba, ukuqala, ukuphela nombhalo. Isikhathi sigcinwe njengombhalo, ukwehliswa kwemigqa kuphila, futhi ishidi elihleliwe lingaguqulelwa emuva emibhalweni engezansi.",
   "h1": "Guqula imibhalo engezansi ibe yi-Excel",
   "intro": "Ukuhlola amakhulu ama-cue kumhleli wombhalo kuyadinisa. Ku-Excel i-cue ngayinye ingumugqa, ngakho ukuhlunga, ukuphawula nokusesha-nokushintsha konke kuyatholakala – futhi ukuhlelwa kubuyela ku-SRT yakho.",
   "ctaText": "Thumela ngaphandle ku-Excel"
  },
  "body": [
   {
    "h2": "Isidingo",
    "ps": [
     "Ukuhlola, ukushintsha kwamagama ngobuningi, noma ukwahlukanisa umsebenzi phakathi kwabantu abaningi – konke lokho kuhamba ngokushesha okukhulu eshidini kunembhalo ocacile. I-SRT uqobo lwayo ingumbhalo ocacile, kodwa isakhiwo sayo se-cue (inkomba, isikhathi, ingxoxo) ihambisana kahle nezinsika ezine zethebula."
    ]
   },
   {
    "h2": "Ukuthi ungakwenza kuphi",
    "ps": [
     "Vula [[Ukuguqulwa kwethebula ⇄ kombhalo engezansi|/table.html]], shintshela kokuthi \"kuya ethebuleni\", hudula i-SRT ngaphathi, futhi ukuhlola kugcwala ngomugqa owodwa nge-cue kuzinsika ezine – inkomba, ukuqala, ukuphela, umbhalo. Shaya u-\"Landa i-Excel (.xlsx)\" futhi kungokwakho. I-VTT isekelwa ngendlela efanayo.",
     "Uma usuqedile ukuhlela: shintsha imodi ibe ukuya \"ku-mbhalo engezansi\", faka ishidi emuva, futhi uthola i-SRT futhi. Umthetho unezinsika ezintathu zokuqala, ukuphela nombhalo (isiNgisi Start / End / Text ziyasebenza nazo), nganoma yikuphi ukulandelana."
    ],
    "img": {
     "file": "table-prev",
     "alt": "Ukuhlola ithebula: yonke i-cue ye-SRT njengomugqa kuzinsika ezine, enebha yezibalo",
     "cap": "I-SRT ebekwe njengezinsika ezine, eguqulekayo emuva ngendlela efanayo"
    }
   },
   {
    "h2": "Izinkinga ezivamile",
    "ps": [
     "**Lungisa ikhowudi ephukile kuqala**: le khasi lifunda i-UTF-8 kuphela. Isikrini esigcwele izimpawu zemibuzo noma amabhokisi kusho uhambo oluya [[Ukulungiswa kwe-Mojibake|/repair.html]] kuqala.",
     "**I-CSV noma i-xlsx**: khetha .xlsx uma ifayela liya ku-Excel, ukuze insika yesikhathi ingakwazi ukubhalwa kabusha; i-CSV iphatheka kakhulu kodwa i-Excel ingayifunda njengento ehlukile – setha insika yesikhathi ibe \"Umbhalo\" uma lokho kwenzeka.",
     "**I-ASS ayisebenzi**: i-ASS iphethe imiyalelo yesitayela, ngakho yiguqule ibe yi-SRT ngaphambi kokuifaka ethebuleni."
    ]
   },
   {
    "h2": "Okuhlobene",
    "ps": [
     "Ukuhamba ngezindlela ezimbili okugcwele – [[Ungayiguqula kanjani imibhalo engezansi ibe yi-Excel / CSV|/guides/table.html]]; ukuhumusha emva kwalokho – [[Ukuhunyushwa kwemibhalo engezansi|/translate.html]]; ukudlula kokugcina ngaphambi kokulethwa – [[QC yemibhalo engezansi|/qc.html]]."
    ]
   }
  ]
 },
 "srt-to-vtt": {
  "seo": {
   "title": "Isiguquli se-SRT siphinde sibe yi-VTT – Guqula Imibhalo Engezansi Ku-inthanethi – AI-SRTSub",
   "desc": "Guqula imibhalo engezansi ye-SRT ibe yi-VTT (WebVTT) yezinto zethrekhi ze-HTML5. Amakhefu ezitembu zesikhathi aba amachashazi ngokuzenzakalelayo. Kusebenza esipheqululini sakho, akukho okulayishwayo.",
   "h1": "I-SRT iya ku-VTT",
   "intro": "Guqula imibhalo engezansi ye-SRT ibe yi-VTT: phonsa ifayela, khetha i-VTT, landa. Izitembu zesikhathi zibhalwa kabusha ngefomethi yewebhu, konke esipheqululini sakho.",
   "ctaText": "Guqula i-SRT → VTT"
  },
  "body": [
   {
    "h2": "Lapho udinga i-VTT",
    "ps": [
     "Abadlali bewebhu (isici se-HTML5 `<track>`), ukulayishwa kwemibhalo engezansi ka-YouTube, nabadlali abaningi abasekelwe esipheqululini bamukela **VTT (WebVTT)** kuphela – hhayi i-SRT. Uma konke onakho kuyi-SRT, ukuguqulwa okukodwa kuyayenza isebenze."
    ]
   },
   {
    "h2": "Ukuthi amafomethi amabili ahlukene kanjani",
    "ps": [
     "Okuqukethwe cishe kuyefana; izinto ezintathu zibhalwa ngokuhlukile: **umugqa wekhanda le-WEBVTT** (odingekayo ku-VTT); **isihlukanisi samamilisekondi** ezitembu zesikhathi – i-SRT isebenzisa ikhefu (00:00:01,000) kuyilapho i-VTT isebenzisa ichashazi (00:00:01.000); futhi i-VTT ivumela amabhloko e-NOTE nawe-STYLE i-SRT engawavumeli."
    ],
    "img": {
     "file": "convert-result",
     "alt": "Umphumela wokuguqula obonisa ikhanda le-WEBVTT nezitembu zesikhathi zamachashazi",
     "cap": "I-VTT eguquliwe: umugqa wokuqala we-WEBVTT, izitembu zesikhathi zamachashazi"
    }
   },
   {
    "h2": "Ukuthi ungasiguqula kanjani",
    "ps": [
     "Vula [[isiguquli|/convert.html]], phonsa i-SRT ngaphakathi, khetha **VTT - WebVTT** njengomphumela, bese uguqula ulande. Ukulandelana kwama-cue, amanani esikhathi, nombhalo wemigqa eminingi konke kugcinwa njengoba kunjalo – ukwakhiwa kolimi kuphela okushintshayo. Uya ngelinye icala? Bona [[I-VTT iya ku-SRT|/guides/vtt-to-srt.html]]."
    ]
   }
  ]
 },
 "subtitle-format-comparison": {
  "seo": {
   "title": "I-SRT vs VTT vs ASS vs SBV vs LRC – Yiphi Ifomethi Yemibhalo Engezansi – AI-SRTSub",
   "desc": "Ukuqhathaniswa kwamandla amafomethi amahlanu avamile emibhalo engezansi: isitayela sombhalo, ukuma, ukunemba kwesikhathi, lapho ngalinye likhona, nokuthi ungasiguqula kanjani phakathi kwawo.",
   "h1": "Ukukhetha Ifomethi Yemibhalo Engezansi: SRT / VTT / ASS / SBV / LRC",
   "intro": "Umbhalo engezansi ofanayo olondolozwe ngefomethi ezinhlanu ukhonza amakhosi amahlanu ahlukene. Lo mhlahlandlela uqhathanisa lokho ifomethi ngayinye engakwenza nokuthi ungahamba kanjani phakathi kwazo.",
   "ctaText": "Vula isiguquli semibhalo engezansi"
  },
  "body": [
   {
    "h2": "Khetha ifomethi emugwini owodwa",
    "ps": [
     "Ukulayisha ohlangothini kumdlali, ukuhambisana okuphezulu → **SRT**; abadlali bewebhu (ithrekhi ye-HTML5) noma ukulayishwa ku-YouTube → **VTT**; amafonti, imibala, ukuma, imiphumela → **ASS**; elandelwe phansi ku-YouTube → **SBV** (guqulela ku-SRT ukuze wandise ukusekelwa); amaculo ezingoma, ukucula umugqa nomugqa → **LRC**."
    ],
    "img": {
     "file": "convert-opt",
     "alt": "Ukudonsela phansi kwefomethi yomphumela: amafomethi ayisithupha ohlosiwe",
     "cap": "Izinhloso eziyisithupha zokuthumela ngaphandle esiguqulini zihlanganisa yonke fomethi kulo mhlahlandlela"
    }
   },
   {
    "h2": "Ukuqhathaniswa kwamandla",
    "ps": [
     "**SRT**: umbhalo ocacile + isikhathi, akukho sitayela noma ukuma, iqhawe lokuhambisana. **VTT**: umbhalo + isikhathi, isekelwa ngokwemvelo yiziphequluli, ingaphethe ukuma nesitayela esiyisisekelo, ichashazi ngaphambi kwamamilisekondi. **ASS**: umbhalo + isikhathi + isitayela esigcwele (amafonti, imibala, imigqa, ukuma, imiphumela), isikhathi samasekhondi ayisikhombisa. **SBV**: fomethi encane yemibhalo engezansi ka-YouTube, ukuqala nokuphela emugwini owodwa. **LRC**: fomethi yezingoma, izikhathi zokuqala kuphela, akukho zikhathi zokuphela, akukho sitayela."
    ]
   },
   {
    "h2": "Izindlela phakathi kwamafomethi",
    "ps": [
     "Noma yikuphi kwalokhu kuguqula zombili izindlela [[esiguqulini|/convert.html]]: ukufunda kusekela i-srt, vtt, ass (kuhlanganise ne-ssa), sbv, lrc, txt; ukuthumela ngaphandle kusekela i-srt, vtt, ass, sbv, lrc, txt. Imizila evamile inemihlahlandlela yayo: [[I-SRT iya ku-VTT|/guides/srt-to-vtt.html]], [[I-VTT iya ku-SRT|/guides/vtt-to-srt.html]], [[I-SRT iya ku-ASS|/guides/srt-to-ass.html]], [[I-ASS iya ku-SRT|/guides/ass-to-srt.html]], [[I-SBV iya ku-SRT|/guides/sbv-to-srt.html]], [[I-LRC iya ku-SRT|/guides/lrc-to-srt.html]]."
    ]
   },
   {
    "h2": "Lokho okulahlekile ngokuguqula",
    "ps": [
     "Ukuguqulela ku-SRT kuhlale kusehlela isitayela nokuma (i-SRT ayinakukwazi ukuziphetha). Ukuguqulela ku-ASS ngeli thuluzi **kuqhaqha isitayela esimisiwe futhi akugcini esokuqala**. I-LRC eya ku-SRT idinga izikhathi zokuphela zigcwaliswe (umugqa ngamunye uhlala kuze kube olandelayo; owokugcina uthola imizuzwana engu-3). Amanani esikhathi nombhalo ahlala efana kuzo zonke izinkombandlela."
    ]
   }
  ]
 },
 "subtitle-garbled-characters": {
  "seo": {
   "title": "Lapho I-Mojibake Yemibhalo Engezansi Ivela Khona – Yibone, Iyilungise – AI-SRTSub",
   "desc": "I-Mojibake isho ukufunda okungalungile, hhayi ifayela elonakele. Izinhlamvu zokufaka esikhundleni, izindawo zezinhlamvu ezinezimpawu nokulandelana kwezinhlamvu ezingaziwayo zonke zikhomba imbangela – funda ukuthi yikuphi okululamayo nokungasoze kwakulula.",
   "h1": "Lapho i-mojibake yemibhalo engezansi ivela khona",
   "intro": "Amabhithi afanayo afundwa njenge-UTF-8 futhi afundwa njenge-GBK aphuma njengamasethi amabili ahlukene ngokuphelele ezinhlamvu. Indlela umbhalo kadoti obukeka ngayo uwubufakazi obuqondile bokuthi yisiphi isinyathelo esihambe kabi.",
   "ctaText": "Vula ithuluzi lokulungisa i-mojibake"
  },
  "body": [
   {
    "h2": "Ifayela lilungile – lifundwe kabi",
    "ps": [
     "Lokho okugcinwa yifayela lemibhalo engezansi ngamabhithi. Ukuphendula amabhithi abe izinhlamvu kudinga ukwazi ukuthi abhalwe kuyiphi ikhowudi – thatha lokho kabi futhi uthola i-mojibake. Akunalubandla elilodwa elilahlekile efayeleni; lifunde futhi ngenkohliso efanele futhi izinhlamvu ziyabuya.",
     "Lokho kuqhekeka umsebenzi kube kubili: **ukusebenza ukuthi yiphi ikhowudi eyaqala ngayo**, kanye **nokuyigcina njengekhowudi umdlali wakho angayithola**. Eyokuqala ivela ekuhloleni ukuhlola nokushaya amaphuzu, eyesibili ekuqopheni ikhophi. Zixazulula izinkinga ezihlukene."
    ]
   },
   {
    "h2": "Ukubukeka okuhlanu, izimbangela ezinhlanu",
    "ps": [
     "I-mojibake ayilona i-random – ukubukeka kwayo kuyadalula okuyimbangela:"
    ],
    "img": {
     "file": "repair-diag",
     "alt": "Ikhadi lokuhlola elibala uhlobo ngalinye lomkhondo we-mojibake",
     "cap": "Ukuhlola kuhlela i-mojibake ngembangela esikhundleni sokuyihlanganisa ndawonye"
    }
   },
   {
    "h2": "Kungani uhlamvu lokufaka esikhundleni lungenakukulungiswa",
    "ps": [
     "Uhlamvu lokufaka esikhundleni ngumngcele wokuhlukanisa. U-`�` usho ukuthi amabhithi ayeselahliwe kakade **esinyathelweni sangaphambilini** (ngokuvamile olunye uhlelo olufunda ifayela futhi luyigcine futhi), futhi akunalutho olurekhodiwe ngokwehlisiwe. Naleso sikhathi akunalutho okucatshangelwa emuva ngalo – akekho ongalilungisa.",
     "Ngakho ikhasi lokulungisa liphatha amacala amabili ngokuhlukile. Layisha ifayela futhi amabhithi wokuqala anjalo, evumela ukuthi azame ikhowudi ngayinye; uma umbhalo onamathiselwe usuqukethe uhlamvu lokufaka esikhundleni, lisho kanjalo ngokusobala: \"akunakukulungiswa, sicela ulayishe ifayela lokuqala\".",
     "Kukhona necala elibuyela emuva: okuqukethwe kufundeka kahle kakhulu kodwa umdlali wakho usabisa udoti. Ifayela alisona elinesiphoso – **umdlali ukhethe ikhowudi engalungile**. Ukuhlela umbhalo ngeke kusize; gcina ikhophi njenge-UTF-8 enayo i-BOM noma i-GBK futhi uyinike yona."
    ],
    "img": {
     "file": "repair-up",
     "alt": "Indawo yokulayisha: hudula-uphonse futhi unamathisele njengezindawo zokungena ezimbili",
     "cap": "Layisha ifayela uma unga – amabhithi anjalo asho okuthile ukulungisa"
    }
   },
   {
    "h2": "Lokho okuqhathanisayo ngenkathi kulungiswa",
    "ps": [
     "Ithuluzi lizama zonke ikhowudi ezingaba khona, bese lishaya amaphuzu umphumela ngamunye: ukuthi kungakanani okwenziwe ngezinhlamvu ezivamile, ukuthi kukhona yini imigqa yezinhlamvu ezibizwayo, imigqa yezimpawu, ukuthi imigqa ye-CJK ingodonga lwezinhlamvu ezingaziwayo. Umphumela ophumelele kakhulu uya phezulu ohlwini.",
     "**Uma kungekho iphuzu elibonakala lingcono, akunalutho oluncomekayo** – kungcono ukuthi uthi \"lokhu kufundeka kahle njengoba kunjalo\" kuneziphonsela phansi ngento efana kancane nolimi. Umbhalo ophule kabili (ogcinwe kabi kanye, bese ulungiswa kabi kanye) uthola omunye umjikelezo owengeziwe wokuxazulula emuva kwabaphambili abaphezulu."
    ],
    "img": {
     "file": "repair-fix",
     "alt": "Uhlu lwabafakiwe oluhlelwe ngamaphuzu, ngalinye linophawu lwebhangqa lalo lekhowudi",
     "cap": "Abafakiwe ababhalwe ngamaphuzu – akukho owine ngokucacile, akukho sincomo"
    }
   },
   {
    "h2": "Ukugcina ikhowudi efanele kuqedela umsebenzi",
    "ps": [
     "Umbhalo olungisiwe kumele usagcinwe njengekhowudi umdlali wakho ayibonayo. Abadlali baseWindows ngokuvamile bathemba i-BOM ukuthola ikhowudi, ngakho **i-UTF-8 ene-BOM** iyona engadingi inkinga kakhulu; ihadiwe endala nabadlali abathile bezifunda bafuna i-GBK. Ungakhetha i-UTF-8, i-UTF-8 (ene-BOM), i-GBK, Big5, Shift_JIS noma EUC-KR, futhi uzotshelwa ukuthi ukhethe enye uma kukhona okungalingani (i-GBK ayinakukwazi ukubamba isiKorea)."
    ],
    "img": {
     "file": "repair-out",
     "alt": "Indawo yomphumela: gcina-njengekhowudi yokudonsela phansi nenkinobho yokulanda",
     "cap": "Yigcine njengento umdlali ayibonayo futhi i-mojibake ixazululwe ngempela"
    }
   },
   {
    "h2": "Amathuluzi ahlobene nemihlahlandlela",
    "ps": [
     "Ukuhamba okugcwele – [[Ungayilungisa kanjani imibhalo engezansi ye-mojibake|/guides/repair.html]]; ukuthi ifayela le-SRT ligcina ini ngempela – [[Kusebenza ini ngaphakathi kwefayela le-SRT|/guides/srt-file-format.html]]; ikhowudi ilungile kodwa okuqukethwe kungcolile (izimpawu zamanzi, izikhangiso, amathegi okuzwa kahle) – [[Ukuhlanzwa kwemibhalo engezansi|/clean.html]]."
    ]
   }
  ]
 },
 "subtitle-glossary": {
  "seo": {
   "title": "Amathebula amagama: isikhathi esisodwa, amagama amabili – Lapho okwakha khona – AI-SRTSub",
   "desc": "I-thebula lamagama lilungisa igama elifanayo elinikezwe ngokungalingani: lapho okwakha khona, ukuthi ungaliphinda kanjani ukusebenzisa esikhathini, kungani ukufana kwamagama agcwele kungenalutho ngesiShayina, nalokho ongakunikeli kulo.",
   "h1": "Amathebula amagama: ukugcina isikhathi singaguquki",
   "intro": "Lapho igama lingu-A esiqeshini sokuqala no-B esiqeshini sesikhombisa, abalibali bacabanga ukuthi bangabalingiswa ababili. I-thebula lamagama livimba lokho ncamashi – lilungisa lokuthi izinto zibizwa ngani.",
   "ctaText": "Vula ukushintshwa kwamagama ngeqoqo"
  },
  "body": [
   {
    "h2": "I-thebula lamagama lilungisa ukungalingani",
    "ps": [
     "Izinkinga zamagama emibhalweni engezansi ziza ngezinhlobo ezimbili: \"eligama lihunyushwe kabi\" kanye \"neligama elifanayo lihunyushwe ngokuhlukile kusuka endaweni eyodwa kuya kwenye\". Eyokuqala yinkinga yesichazamazwi; eyesibili yilokho i-thebula lamagama elenzelwe khona.",
     "Eyesibili ijwayelekile kakhulu futhi kunzima ukuyibona: `Thor` uba u-\"Thor\" esiqeshini sokuqala no-\"Donar\" esiqeshini sesikhombisa, futhi isiqephu ngasinye sibukeka kahle sodwa kuyilapho uchungechunge lonke lenza abalaleli bacabange ukuthi umlingiswa omusha uvelile. I-thebula lamagama liphendula \"lolu mkhiqizo umbiza ngo-Thor\" lube umthetho osebenzayo osethwe efayeleni lemibhalo engezansi lonke ngesikhathi esisodwa."
    ]
   },
   {
    "h2": "Lapho kufanele ukwakha eyodwa",
    "ps": [
     "Akayona yonke ifayela lemibhalo engezansi elidinga i-thebula lamagama. Amacala athethelela elilodwa ngokuqondile yila:"
    ],
    "img": {
     "file": "glossary-rules",
     "alt": "Imithetho yokushintsha ehlanganiswe ngesigaba ethebuleni lamagama",
     "cap": "Sebenzisa amazwana ka-# ukuhlanganisa imithetho, nokucisha eyodwa okwesikhashana ngenkathi uhlela"
    }
   },
   {
    "h2": "Ukugcina ithebula elilodwa kunkathi yonke",
    "ps": [
     "I-thebula lamagama ligcinwa **ngokwesikhashana**: zinza amagama esiqeshini sokuqala, bese ungeza umthetho noma nini lapho igama elisha livela, futhi ekupheleni kwenkathi ithebula liphelele. Kwenkathi elandelayo yochungechunge olufanayo, qala kulo.",
     "Bhala imithetho ibaziwe kancane kunokuba kudingeke ngokuqinile – uma usunqume ngo-\"Thor\", engeza u-\"Donar -> Thor\" nawo, ukuze imibhalo engezansi yomunye umuntu ilethwe kulayini ngesikhathi esifanayo.",
     "Hlala ufunda **uhlu lwezinguquko** emva kwalokho: lubiza i-cue ngayinye, umugqa ngamunye nokuthi yini eyaba yini. Yindawo yodwa lapho ungaqinisekisa khona ukuthi ushintsho lwalulungile futhi alwenziwanga kakhulu, futhi noma yikuphi ukufaka ongakuthandi kungabuyiselwa ngokuchofoza."
    ],
    "img": {
     "file": "glossary-diff",
     "alt": "Uhlu lwezinguquko ngazinye endaweni yomphumela",
     "cap": "Zonke izinguquko zibaliwe; chofoza eyodwa ongafuni ukuyibuyisela"
    }
   },
   {
    "h2": "Lokho ongakunikeli ethebuleni lamagama",
    "ps": [
     "I-thebula lamagama lishintsha **amagama**. Lezi zinto ezintathu zingaphandle komsebenzi walo, futhi kufanele zibe njalo:",
     "**Ulimi namasiko emisho** – awukwazi ukuguqula igama libe umusho; umsebenzi wezinga le-umusho ubuyela [[Ekuhumushweni kwemibhalo engezansi|/translate.html]] noma kumuntu.",
     "**Ukucocwa komxholo** — ukulahla imigca epheleleyo efana namanzi, iintengiso kunye neempawu ze-SDH kungqamana ne-[[Subtitle cleaning|/clean.html]]; imithetho yetheyibhile yamagama iyatshintsha, ayicimi migca.",
     "**Amazwi exesha** — itheyibhile yamagama ayichukumisi xesha. Ukuba kukho ukwahluka okanye ingxaki yexesha, yiya ku-[[Timeline adjustment|/shift.html]]."
    ]
   },
   {
    "h2": "Izinto ezimbalwa kulula ukuzenza kabi",
    "ps": [
     "**IsiShayina sisaphinda sifake esikhundleni izinhlamvu ezincane ngokufana kwamagama agcwele okumakiwe – lokho kujwayelekile.** IsiShayina nesiJapani azihlukanisi amagama ngezikhala, ngakho ithuluzi alikwazi ukunquma imingcele yamagama futhi ukufana kwamagama agcwele akunamphumela lapho; u-`art` ngeke athinte u-`start` ukuvikela kusebenza kuphela esiNgisini.",
     "**Ukulandelana kushintsha umphumela.** Imithetho isebenza kusuka phezulu kuya phansi futhi umbhalo okhiqizwe ngumthetho owodwa useshewa futhi yimithetho engezansi kwawo. Shintsha u-A ngo-B bese u-B ngo-C futhi ugcina ube ngu-C.",
     "**Ukushintsha umbhalo kuphela, setha umkhawulo.** Kwifayela lezilimi ezimbili, khetha \"umugqa wesibili kuphela\"; okufakiwe okunomugqa owodwa kuphela kuhlala kungathintwanga ngaphansi kwanoma yikuphi ukulungiswa komugqa owodwa – ithuluzi alikuqageli ukuthi iyiphi uhlangothi engokoqobo.",
     "**I-thebula lamagama aligcinwa.** Akunalutho isikhathi ngasinye lapho uvula ikhasi, ngakho gcina ifayela lakho lombhalo bese ulidlulisa."
    ]
   },
   {
    "h2": "Amathuluzi ahlobene nemihlahlandlela",
    "ps": [
     "Ngokuhamba okugcwele bona [[Ungawashintsha kanjani amagama ngeqoqo emibhalweni engezansi|/guides/glossary.html]]; uma okuqukethwe kungcolile qala [[Ukuhlanzwa kwemibhalo engezansi|/clean.html]]; uma amagama esezinzile futhi udinga ezinye izilimi iya ku-[[Ukuhunyushwa kwemibhalo engezansi|/translate.html]]; futhi qala umphumela nge-[[QC yemibhalo engezansi|/qc.html]]."
    ]
   }
  ]
 },
 "subtitle-quality-check": {
  "seo": {
   "title": "Uhlu Lwezinto Okufanele Kuhlolwe Ngaphambi Kokulethwa Kwemibhalo Engezansi – AI-SRTSub",
   "desc": "Uhlu lwezinto zokulethwa kwemibhalo engezansi: ukugqagqana, isivinini sokufunda, ububanzi bomugqa namakhefu kuyehluleka kakhulu. Qala imithetfo ye-QC ka-17 – ingxenye yezinkinga ilungiseka ngokuchofoza kanye.",
   "h1": "Lokho Okufanele Ukuhlole Ngaphambi Kokulethwa",
   "intro": "Imibhalo engezansi eqediwe ayimi ngomumo ukulethwa: izinkinga abalaleli abazibonayo ekuqaleni ziyizo kanye lezingaziboni emva kokubuka izikhathi ezingamakhulu. Lo hlu luhlanganisa lokho kudlula kokugcina.",
   "ctaText": "Qala Ukuhlola QC Kwemibhalo Engezansi"
  },
  "body": [
   {
    "h2": "Kungani Ungakwazi Ukubona Izinkinga Wena Wedwa",
    "ps": [
     "Noma ubani owenza imibhalo engezansi uyazi okuqukethwe kahle kakhulu – uyazi ukuthi umugqa ngamunye uthini olandelayo, ngakho akunalutho oluzizwa lusheshe kakhulu; ubonile ukuma izikhathi ezingamakhulu, futhi amehlo akho ayaseta amaphutha wodwa. Ngakho ukuhlola ngaphambi kokulethwa akukwazi ukuthembela \"ekubukeni futhi kusuka phezulu\" – kufanele **kulinganiswe ngamanamba**: isivinini sokufunda, ububanzi bomugqa, ubude besikhathi, ukugqagqana. Vumela izibalo zinqume."
    ]
   },
   {
    "h2": "Ukwehluleka Okuyisithupha Okuvamile Kakhulu",
    "ps": [
     "Okubhalwe ngokuthi zivame kangakanani ukucwisa ukulethwa:"
    ]
   },
   {
    "h2": "Ungakuhlola Kanjani",
    "ps": [
     "Vula [[QC yemibhalo engezansi|/qc.html]] bese uphonsa imibhalo engezansi yakho; setha ulimi ukuthi luzitholele (izilimi ezingu-27, ngalinye linemithetho yalo). Umbiko ubhala okutholakele emazingeni amathathu – **amaphutha / izixwayiso / amathiphu** – ngalinye linombolo yokungena nenani elilinganisiwe. Amaphutha kumele abhekanwe nawo (umbhalo ongafundeki, ifomethi yesitembu sesikhathi, ukuphela ngaphambi kokuqala, ukubala okwaphukile); izixwayiso zincike ecaleni (ukugqagqana, isivinini sokufunda, ububanzi bomugqa, ubude besikhathi); amathiphu yi-polish (indawo yokwehlisa umugqa, izikhala, amakhefu)."
    ],
    "img": {
     "file": "qc-report",
     "alt": "Umbiko we-QC: uhlu lwezinkinga zamazinga amathathu, okutholakele ngakunye kunenombolo yokungena nokuqhathaniswa okulinganisiwe-vs-umkhawulo",
     "cap": "Umbiko wamazinga amathathu unikeza inombolo yokungena nenani elilinganisiwe kuyo yonke into etholakele"
    }
   },
   {
    "h2": "Lokho Okungalingiswa Ngokuchofoza Kanye",
    "ps": [
     "Ukubala, okokufunga okungenalutho, ukugoqa kabusha, izikhala namakhefu – noma yini **eyeka isikhathi singathintwanga** – ingalungiswa ngokuzenzakalelayo; ukulungisa **okushintsha isikhathi** (ukushintshanisa ukuqala nokuphela, ukushintsha ukugqagqana, ukunciphisa noma ukuqamba ubude besikhathi) kungamakiwe ngokuzenzakalelayo futhi kufanele kumakiwe kuphela emva kokuqinisekisa umthelela. **Isivinini sokufunda esingaphezu komkhawulo asinokulungiswa okuzenzakalelayo** – umshini awukwazi ukwazi ukuthi yiliphi igama okufanele lisikwe, ngakho zinciphise ukuhumusha wena noma wehlise isikhathi kancane; bona [[Imibhalo Engezansi Esesheshayo Ukuyifunda|/guides/subtitle-too-fast.html]]. Emva kokulungisa, ukuhlola okusha kuyaqala ngokuzenzakalelayo, futhi umbiko ubala kuphela lokho okulungiswe ngempela."
    ]
   },
   {
    "h2": "Ngenkathi Usebenzisa",
    "ps": [
     "Ikhasi lombiko lingalanda umbiko wombhalo ocacile ka-`.qc.txt` ngqo – unamathisele ekulethweni ukuze olunye uhlangothi lubone shazi lokho owakuhlola. Kwimibhalo engezansi esanda kuhunyushwa, qala i-QC ngaphambi kokulethwa; ukuphuma komugqa wesikhathi konke kuyinhlobo ehlukile yenkinga – uma isivinini sokufunda sisahluleka emva kokuhlola, bona [[Imibhalo Engezansi Ehamba Iphuma Kokuvumelanisa|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "subtitle-speed-converter": {
  "seo": {
   "title": "Vumelanisa Imibhalo Engezansi Emva Kokushintsha Kwesivinini Sevidiyo – AI-SRTSub",
   "desc": "Ividiyo isheshiswe noma yehliswe ijubane futhi imibhalo engezansi ayisalingani: faka isiphindaphindi sesivinini esinyathelweni sokukala ngesilinganiso futhi lonke umugqa wesikhathi uqabuka nevidiyo.",
   "h1": "Lungisa Imibhalo Engezansi Emva Kokushintsha Kwesivinini Sevidiyo",
   "intro": "Ividiyo isheshisile noma yehlile ijubane jikelele, imibhalo engezansi yahlala esivinini sokuqala – konke emva kwephuzu akuphumile. Faka isiphindaphindi futhi lonke umugqa wesikhathi ukala nevidiyo.",
   "ctaText": "Vula umhleli wesikhathi"
  },
  "body": [
   {
    "h2": "Lapho okufanele usebenzise isilinganiso esikhundleni sokushintsha",
    "ps": [
     "Ividiyo ikhawuleziswe okanye yacothiswa **njengento epheleleyo** (masithi 0.9x okanye 1.25x kwisoftwe yokuhlela) ngelixa yonke ingqinibe igcine isingqisho sayo sokuqala: ukuqala kuyahambelana, kwaye xa uqhubela phambili iba mbi ngakumbi — ngesilinganiso esingatshintshiyo. Le yingxaki yexesha. Ukuba ifayile yonke ibekwe kwelinye ixesha ngenani elimisiweyo ngaphandle kokukhula, utshintsho lwanele — bona [[moving the whole subtitle file earlier or later|/guides/shift-subtitle-timing.html]]."
    ]
   },
   {
    "h2": "Iyiphi inombolo okufanele uyifake",
    "ps": [
     "Iisubtitles kufuneka zilandele ividiyo, ngoko faka **umaleko owatshintsha ngawo ividiyo ngokwenene**: ukuqaliswa ngokukhawuleza kwe-1.25x kuthetha ukuba amaxesha engqinibe aphindwa ngo-1.25 ukuze afikelele; ukucothiswa kwe-0.9x kuphinda ngo-0.9. Kumhleli wexesha, yongeza inyathelo **Linganisela ngesilinganiso** kwaye ufake inani kwibhokisi yexabiso."
    ],
    "img": {
     "file": "shift-step-rate",
     "alt": "Kala ngesinyathelo sesilinganiso nesiphindaphindi ebhokisini lenani",
     "cap": "Isiphindaphindi esingaphezu kuka-1 siqamba umugqa wesikhathi (sevidiyo esheshisiwe), esingaphansi kuka-1 siyayicindezela (eyehliswe ijubane)."
    }
   },
   {
    "h2": "Lokhu kuhluka kanjani ekushintsheni",
    "ps": [
     "Ukushintsha **kuhambisa** izikhathi ze-cue ngayinye ngenani elimisiwe elifanayo futhi kugcina ubude besikhathi se-cue; isilinganiso **siphindaphinda** kokubili ukuqala nokuphela, ngakho ubude besikhathi buyakala nabo. Emva kokushintsha kwesivinini ubude besikhathi uqobo lwabo lushintshile – yilokho kanye okwenza isilinganiso sidingeke."
    ]
   },
   {
    "h2": "Uma ungaqinisekile ngesiphindaphindi",
    "ps": [
     "Uma isiphindaphindi silahlekile, buyela **ezisekelweni ezimbili**: faka izikhathi zangempela zevidiyo ze-cue yokuqala neyokugcina futhi konke okuphakathi kwabo kusabalala ngokulinganisela – okulingana nokuxazulula isiphindaphindi esifanele. Bona [[imibhalo engezansi ithola ukuphuma kokuvumelanisa nakakhulu|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "subtitle-too-fast": {
  "seo": {
   "title": "Imibhalo Engezansi Esesheshayo Ukuyifunda – Lungisa Isivinini Sokufunda – AI-SRTSub",
   "desc": "Imibhalo engezansi esesheshayo ukuyifunda – ubude besikhathi obufushane noma umbhalo omude? I-QC imaka okufakiwe okungaphezulu kwezi-20 izinhlamvu/isekhondi (9 i-hanzi ye-CJK); ubude besikhathi buyalungiswa ngokuzenzakalelayo, umbhalo udinga ukuhlelwa.",
   "h1": "Imibhalo Engezansi Esesheshayo Ukuyifunda",
   "intro": "Abalaleli bayahlala bekhipha ikhefu? Imbangela yisivinini sokufunda. Ukuthi usilinganisa kanjani, usilungisa kanjani, nokuthi uqondisa nini umbhalo uma kuqhathaniswa nesikhathi – konke kumhlahlandlela owodwa.",
   "ctaText": "Hlola Isivinini Sokufunda"
  },
  "body": [
   {
    "h2": "Yini Isivinini Sokufunda?",
    "ps": [
     "Isivinini sokufunda **ukuthi ngabe abalaleli bangaqeda ukufunda umbhalo engezansi ngesikhathi ohlala ngaso esikrinini**. Izibalo zilula: ububanzi bombhalo buhlukaniswe ngemizuzwana esikrinini. Imikhawulo ejwayelekile yemboni: izinhlamvu ezigcwele ezingama-9 ngesekhondi zesiShayina, iJapani nesiKorea (18 amayunithi ahhafu ububanzi), amayunithi ahhafu ububanzi angu-20 ngesekhondi kwezinye izilimi. Umugqa wama-hanzi angu-20 ohlala isekhondi engu-1 usebenza njengamayunithi obubanzi angu-40 ngesekhondi – ngaphezu kokuphindaphinda umkhawulo, futhi abalaleli abasoze bawuqeda."
    ]
   },
   {
    "h2": "Okokuqala, Hlukanisa Ukuthi Luhlobo Luni Lwejubane",
    "ps": [
     "\"Esesheshayo ukuyifunda\" empeleni kuyizinkinga ezimbili ezihlukene: **ubude besikhathi obufushane kakhulu** – i-cue inqunywa emva kwamamilisekondi angu-100 noma angu-200, ngokuvamile iphutha lesikhathi noma okusele kokuhlela; **umbhalo omude kakhulu** – ubude besikhathi bulungile, kodwa umugqa ugcwele ama-hanzi angu-30, futhi akunamkhawulo wesivinini ozowusindisa. Ukulungisa kuphambene, ngakho thola ukuthi unaliphi kuqala."
    ],
    "img": {
     "file": "qc-rules",
     "alt": "Ukubekwa komkhawulo wesivinini sokufunda ekhasini le-QC, okuzenzakalelayo ku-18 kwe-CJK no-20 kwezinye izilimi",
     "cap": "Imikhawulo yesivinini sokufunda se-QC: amayunithi obubanzi angu-18 ngesekhondi kwe-CJK, 20 kwezinye izilimi"
    }
   },
   {
    "h2": "Ukuthi Ungakuhlola Kanjani",
    "ps": [
     "Vula [[QC yemibhalo engezansi|/qc.html]] bese uphonsa imibhalo engezansi yakho. Embikweni, \"ubude besikhathi obufushane kakhulu\" isixwayiso esibonisa amamilisekondi alinganisiwe (umkhawulo: amamilisekondi angu-833); \"isivinini esingafundeki\" okutholakele kwayo okubonisa amayunithi obubanzi alinganisiwe ngesekhondi. Kwimibhalo engezansi yezilimi ezimbili umugqa obhalwe ngolimi oluhlosiwe kuphela obalwayo – izilimi ezimbili azihlanganiswa ndawonye."
    ]
   },
   {
    "h2": "Ukuthi Ungakulungisa Kanjani",
    "ps": [
     "**Ubude besikhathi obufushane kakhulu**: okulungisekayo ngokuchofoza kanye – i-cue iyanwetshwa ngokuzenzakalelayo ibe amamilisekondi angu-833, ngaphandle kokudlula ukuqala kwe-cue elandelayo (ukulungisa kumele kungadali ukugqagqana okusha). **Umbhalo omude kakhulu** – akunalungiso oluzenzakalelayo – umshini awukwazi ukwazi ukuthi yiliphi igama okufanele lisikwe. Izindlela ezimbili, ukukhetha kwakho: zinciphise ukuhumusha (chofoza iseli ethuluzini lokuhumusha ukuze uyihlele), noma nweba ubude besikhathi sale i-cue (kuphela uma kunesikhala ngaphambi kwe-cue elandelayo; ngenkinga yomugqa wesikhathi jikelele bona [[Ukushintsha Komugqa Wesikhathi|/shift.html]]). Qala i-QC futhi emva kwalokho ukuze uqinisekise ukuthi isivinini sokufunda sibuyele ngaphansi komkhawulo."
    ]
   },
   {
    "h2": "Ungaqondisi Kakhulu",
    "ps": [
     "Ukuhlangabezana nomkhawulo wesivinini kusho ukuthi ukubuka akukhululekile: ukugcwalisa i-cue ngayinye kuze kube sezinhlamvu ezingu-9 ngesekhondi kwenza lonke ifilimu lukhathale. Njengomthetho wendawo, hlala eduze no-70% womkhawulo iningi lesikhathi, futhi uvumele izingxoxo eziningi ziye ngaphezu kwesikhathi esincane kwesinye isikhathi. Amabhloko emibhalo engezansi akhanyisa kakhulu ayinkinga kuwo – qala isethi ephelele yezilinganiso ngaphambi kokulethwa, bona [[Lokho Okufanele Ukuhlole Ngaphambi Kokulethwa|/guides/subtitle-quality-check.html]]."
    ]
   }
  ]
 },
 "subtitles-out-of-sync": {
  "seo": {
   "title": "Imibhalo Engezansi Ihamba Iphuma Kokuvumelanisa Kakhulu? Ikulungise – AI-SRTSub",
   "desc": "Kuqala kahle, imizuzwana embalwa emva kwesikhathi phakathi nefilimu, ayisasebenzi ekupheleni: lokho ukuchezuka okuqhubekayo, ngokuvamile ukungafani kwezinga lohlaka noma ukushintsha kwesivinini sevidiyo. Izisekelo ezimbili ziyayilungisa.",
   "h1": "Imibhalo Engezansi Ihamba Iphuma Kokuvumelanisa Kakhulu: Izimbangela Nezilungiso",
   "intro": "Kuhle ekuqaleni, imizuzwana embalwa sekwephuzule ngesigamu sehora, alikho ithemba ekupheleni. Lolu hlobo lokuhlukana okuhambayo lunezimbangela ezaziwayo – nesilungiso esaziwayo.",
   "ctaText": "Lungisa le fayela"
  },
  "body": [
   {
    "h2": "Okokuqala hlukanisa izinhlobo ezimbili zokuhlukana",
    "ps": [
     "Ukuhlukana kuza ngezinhlobo ezimbili: **ukuchezuka okufanayo** kusho ukuthi i-cue ngayinye sekwephuzile (noma isenesikhathi) ngenani elifanayo, cishe liyalingana kusuka ekuqaleni kuya ekupheleni; **ukuchezuka okuqhubekayo** kusho ukuthi ukuqala kulungile futhi iphutha likhula libheke ekupheleni, mhlawumbe lifinyelele imizuzu. Lesi sihloko simayelana nohlobo lwesibili – okokuqala, bona [[ukuhambisa lonke ifayela lemibhalo engezansi ngaphambili noma emuva|/guides/shift-subtitle-timing.html]]."
    ]
   },
   {
    "h2": "Kungani ihamba kakhulu nangaphezulu",
    "ps": [
     "Ukuchezuka kuvela **kumawashi amabili ahlukene**: izimbangela ezintathu ezivamile ziyi-(1) ukungafani kwezinga lohlaka – imibhalo engezansi yefilimu ka-24fps kumthombo ka-25fps yilahlekelwa isekhondi elingaphezu kwalinye ngaminye; (2) ividiyo yasheshiswa noma yehliswa ijubane ngenkathi imibhalo engezansi igcina isigqi sayo sokuqala; (3) ukurekhodwa kwe-VFR (izinga lohlaka eliguqukayo) okumugqa wesikhathi ungalinganisiwe ekuqaleni. Okuhlanganyelwe yibo: iphutha likhula cishe ngomugqa nesikhathi sokudlala."
    ]
   },
   {
    "h2": "Ikulungise ngezisekelo ezimbili",
    "ps": [
     "Ngenxa yokuthi iphutha likhula ngomugqa, ukuqinisekisa isikhathi esifanele esiphepheni ngasinye nokubuyisela phakathi ngokulinganisela kubuyisela konke. Kumhleli wesikhathi, engeza **ukukulungiswa kwezisekelo ezimbili**: amasimu amabili \"amanje\" agcwaliswa ngokuzenzakalelayo ngezikhathi zokuqala zale fayela; ubuka ividiyo bese ufaka **ukuthi i-cue yokuqala neyokugcina zivela nini ngempela** emasinini amabili \"okuhloswe ngawo\"."
    ],
    "img": {
     "file": "shift-step-two",
     "alt": "Ukulungiswa kwezisekelo ezimbili: izikhathi zamanje zigcwaliswe ngokuzenzakalelayo, izikhathi eziqondisiwe zokufaka",
     "cap": "Thatha izisekelo emikhawulweni emibili – iphutha lokuqala elincane nelikhulu – futhi konke okuphakathi kwasabalala ngokulinganisela."
    }
   },
   {
    "h2": "Ungakuqinisekisa kanjani umphumela",
    "ps": [
     "Emva kokusebenza, iphaneli yomphumela ibala izikhathi zokuqala nezintsha ze-cue ngayinye **ngohlangothi**. Hlola izindawo ezintathu: i-cue yokuqala, eyodwa phakathi, neyokugcina – izikhundla ezintathu ezincane, eziphakathi nezinkulu zamaphutha okuqala. Uma zombili ziwela, lonke ifayela liyenza."
    ],
    "img": {
     "file": "shift-result",
     "alt": "Iphaneli yomphumela: ngaphambi nangemva kwezikhathi ngohlangothi, neningi lokulanda",
     "cap": "Izikhathi ezintsha zamacue aphakathi kumele ziwe phakathi kweziphetho ezimbili – isibonakaliso sokuthi isilinganiso silungile."
    }
   },
   {
    "h2": "Lapho izisekelo ezimbili zinganele",
    "ps": [
     "Ukulungiswa kwezisekelo ezimbili kucabanga ukuthi iphutha **lihamba ngomugqa**. Uma umthombo kuwukurekhodwa kwesikrini se-VFR okunokweqa kwezinga lohlaka lwe-phakathi nefayela, ukudonsa komugqa akunakukulungisa phakathi – thatha i-cue ephakathi ephumile ngokusobala njengephuzu lesithathu, qhekeka ifayela lapho, futhi uqale ukulungiswa kwezisekelo ezimbili engxenyeni ngayinye. Futhi, emva kokulungisa, buza futhi isigaba esimaphakathi ngesivinini esijwayelekile ukuze uqinisekise ukuthi akukho ukuchezuka kwangaphakathi okusele."
    ]
   }
  ]
 },
 "table": {
  "seo": {
   "title": "Ukuguqulelwa kweZihlokwana zibe yi-Excel / CSV – Kwiindlela zombini – AI-SRTSub",
   "desc": "Ukuhamba kweendlela zombini: thumela i-SRT/VTT kwi-Excel okanye kwi-CSV ukuze uqinisekise ngomgca ngomgca, uze ungenise kwakhona iphepha elilungisiweyo njengezihlokwana. Iikholamu ezintathu ziyadingeka, nayiphi na iodolo; ixesha ligcinwe njengecandelo lombhalo.",
   "h1": "Indlela yokuguqulela izihlokwana zibe yi-Excel / CSV",
   "intro": "Ukuhlola nokuqinisekisa nokuguqulela kulula kwispredishithi. Thumela izihlokwana kwi-Excel okanye kwi-CSV, hlela umgca ngomgca, uze uguqulele kwakhona — iikholamu zexesha zihlala zisesisesibhalo lombhalo, kwaye imigca eqhekekileyo ngaphakathi kwencoko igcinwe.",
   "ctaText": "Vula isiguquli setheyibhile"
  },
  "body": [
   {
    "h2": "What this tool does :: Le nto yenziwa sesi sixhobo",
    "ps": [
     "Izihlokwana ziimigca zemiyalelo kunye neespredishithi ziimigca yamarekhodi — xa sele iyiphepha, ukuqinisekisa, ukuphawula kunye nokuguqulela ngobuninzi konke kunokwenziwa ngezixhobo osandul' ukuzazi. Iindlela zombini ziyaxhaswa:"
    ]
   },
   {
    "h2": "Layisha kwaye ukhethe indlela",
    "ps": [
     "Tsala ifayile ngaphakathi okanye ukhangele enye. Uhlobo ngalunye ludinga uhlobo olwahlukileyo lwefayile: **isiya kwiteyibhile** sithatha iifayile zezihlokwana (SRT / VTT), **isiya kwisihlokwana** sithatha iifayile zespredishithi (CSV / Excel, zombini .xlsx kunye ne-.xls). Khetha imowudi engeyiyo kwaye iphepha liyakuxelela ukuba loluphi uhlobo lwefayile olufunwa yile mowudi.",
     "⚠️ Eli phepha lifunda i-UTF-8 kuphela. Ukuba isihlokwana sakho sivuleka njengescreen esizele ziimpawu zemibuzo okanye iibhokisi, yigqithise kuqala ku-[[Ukulungiswa kweMojibake|/repair.html]] — ukufakwa kwekhowudi okuphukileyo kufundwa njengeempawu zokutshintsha kuphela apha."
    ],
    "img": {
     "file": "table-up",
     "alt": "Indawo yokulayisha yesiguquli setheyibhile: indawo yokulahla kunye nokutshintsha kweemowudi ezimbini",
     "cap": "Imowudi nganye ifuna ifayile eyahlukileyo: izihlokwana zingenile, ispredishithi siphumile — kwaye sabuyela emva"
    }
   },
   {
    "h2": "Ukuthumela izihlokwana kwiteyibhile",
    "ps": [
     "Khetha \"isiya kwiteyibhile\", faka isihlokwana, kwaye imbonakalo yokuqala idwelisa wonke umyalelo: i-index, ukuqala, ukuphela, umbhalo. Ibha yamanani inika inani lemiyalelo kunye nobude bonke. Emva koko cinezela u-\"Khuphela i-Excel (.xlsx)\" okanye u-\"Khuphela i-CSV\".",
     "Umahluko phakathi kwazo zombini: i-.xlsx yifayile yokwenene yespredishithi apho i-Excel ingenakuyifomatha ngokutsha ikholamu yakho yexesha ngasemva kwakho; i-CSV iphatheka lula, kodwa i-Excel inokuyitolika ikholamu yexesha njengento eyahlukileyo xa uyivula. Ukuba oko kuyenzeka, khetha ikholamu yexesha kwaye umisele ifomathi yayo ibe \"Umbhalo\" — okanye sebenzisa i-.xlsx."
    ],
    "img": {
     "file": "table-prev",
     "alt": "Imbonakalo yeziteyibhile: iikholamu ze-index, ukuqala, ukuphela kunye nombhalo kunye nebha yamanani",
     "cap": "Wonke umyalelo ubonisiwe kuqala; ibha yamanani inika inani lemiyalelo kunye nobude bonke"
    }
   },
   {
    "h2": "Ukungenisa kwakhona itheyibhile ibe zizihlokwana",
    "ps": [
     "Khetha \"isiya kwisihlokwana\", faka iphepha, kwaye nantsi umthetho wekholamu: ifuna iikholamu ezintathu **ukuqala, ukuphela kunye nombhalo** (iintloko zesiNgesi Start / End / Text ziyasebenza nazo), **nayiphi na iodolo**. `00:00:01,500` kunye `00:00:01.500` zombini ziyamkelwa; imigca engenakuhlaziywa iyashiywa endaweni yokuba kulahlwe ifayile yonke.",
     "Iziphumo zidweliswe umyalelo ngomyalelo kwimbonakalo yokuqala; qinisekisa, uze ukhuphele i-SRT okanye i-VTT. Ukuba ezo kholamu zintathu azikho ufumana umyalezo wokuxelela ukuba ujonge iintloko — ngokuqhelekileyo ngenxa yokuba igama elahlukileyo lisetyenzisiwe ekuthumeleni ngaphandle, okanye umgca wentloko asingomgca wokuqala."
    ],
    "img": {
     "file": "table-back",
     "alt": "Indawo yeziphumo zezihlokwana: izihlokwana ezingenisiweyo ezidweliswe umyalelo ngomyalelo",
     "cap": "Iikholamu ezingaziwayo ziyaxelwa, azize zishiywe ngaphandle ngokuthula"
    }
   },
   {
    "h2": "FAQ :: I-FAQ",
    "ps": [
     "**I-Excel ibonisa ikholamu yexesha ingachananga?** Sebenzisa i-.xlsx kwaye ayize yenzeke loo nto. Ukuba kufuneka usebenzise i-CSV: khetha ikholamu yexesha kwaye umisele ifomathi yeseli ibe \"Umbhalo\" ngaphambi kokuyivula.",
     "**Ngaba iintloko zekholamu kufuneka zibe sesiNgesi?** Hayi. I-Start / End / Text ziyaziwa kuyo nayiphi na ulwimi oluxhaswa yile phepha, kwaye ubukhulu boonobumba abubalulekanga.",
     "**Ngaba imigca yam eqhekekileyo isekho emva kokungenisa?** Ewe. Imigca eqhekekileyo ngaphakathi kwencoko igcinwe, kude kuse kumqulu wokuqala.",
     "**Ngaba i-ASS iyaxhaswa?** Eli phepha liphethe i-SRT ne-VTT kuphela. I-ASS iphethe imiyalelo yesitayela — yiguqulele ibe yi-SRT kunye [[Isiguquli sefomathi|/convert.html]] kuqala.",
     "** Zingaphi iifayile ngaxeshanye?** Enye. Ukulungisa amashumi okanye amawaka, sebenzisa [[Ukuguqula ngobuninzi|/batch.html]] (okuguqula iifomathi kuphela kwaye akuhambi ngetheyibhile)."
    ]
   },
   {
    "h2": "Privacy :: Imfihlo",
    "ps": [
     "Ukuguqulwa kuqhuba ngokupheleleyo kwisikhenqisi sakho. Akukho xwebhu lesihlokwana oluthunyelwa kwiseva."
    ]
   },
   {
    "h2": "Izixhobo ezinxulumeneyo kunye nezikhokelo",
    "ps": [
     "Ukuba yonke oyifunayo kukunyathela isihlokwana-siye-kwi-Excel, bona [[Guqulela izihlokwana zibe yi-Excel|/guides/srt-to-excel.html]]; ukuguqulela kolunye ulwimi emva koko, [[Ukuguqulelwa kwezihlokwana|/translate.html]]; amashumi eefayile ngaxeshanye — [[Ukuguqula ngobuninzi|/batch.html]]."
    ]
   }
  ]
 },
 "translate": {
  "seo": {
   "title": "Ukuguqulelwa kwezihlokwana ze-AI – layisha ukuya kutsho ekuthumeleni ngaphandle kweelwimi ezimbini – AI-SRTSub",
   "desc": "Guqulela izihlokwana nge-AI: layisha i-SRT/VTT/ASS, khetha kulwimi 100, hlanganisa amagama ngesigama, thumela ngaphandle izihlokwana zeelwimi ezimbini. Simahla ukuqala, isitshixo sakho se-API siyaxhaswa.",
   "h1": "Indlela yokusebenzisa ukuguqulelwa kwezihlokwana ze-AI",
   "intro": "Umsebenzi opheleleyo wefayile yesihlokwana enye, ukusuka ekulayisheni ukuya ekuguquleleni nasekuthumeleni ngaphandle: yintoni ekwisikrini, yintoni okunokucofa kuyo, kwaye yintoni oyifumanayo kwinqanaba ngalinye.",
   "ctaText": "Vula isixhobo sokuguqulela"
  },
  "body": [
   {
    "h2": "What this tool does :: Le nto yenziwa sesi sixhobo",
    "ps": [
     "Iguqulela izihlokwana ukusuka kolunye ulwimi ukuya kolunye ize ithumele ifayile yesihlokwana ekulungele ukusetyenziswa. Iimfuno eziqhelekileyo:"
    ]
   },
   {
    "h2": "Upload subtitles :: Layisha izihlokwana",
    "ps": [
     "Cofa u-\"Khetha ifayile yesihlokwana\" okanye uncamathisele umbhalo wesihlokwana ngqo kwibhokisi yokufaka esempazweni. Iifomathi ezintandathu ziyaxhaswa: i-SRT, VTT, ASS, SSA, SBV kunye ne-TXT. Akukho fayile esesandleni? Cofa u-\"Layisha isampula\" ukuyibona isebenza. Nje ukuba ihlalutywe, ikholamu esembindini ibonisa itheyibhile yesihlokwana ene-index, ixesha kunye nombhalo womthombo kungeniso ngalinye."
    ],
    "img": {
     "file": "translate-upload",
     "alt": "Indawo yokungenisa yesixhobo sokuguqulela: khetha ifayile yesihlokwana, ibhokisi yokuncamathisela kunye neqhosha lokulayisha isampula",
     "cap": "Ikholamu yasekunene \"Ngenisa izihlokwana\": khetha ifayile, uncamathisele umbhalo okanye ulayishe isampula"
    }
   },
   {
    "h2": "Khetha ulwimi nesitayela",
    "ps": [
     "\"Ulwimi lomthombo\" lunokuhlala kwi-auto-detect; \"ulwimi ekujoliswe kulo\" lukhethwa kwiilwimi 100. Izitayela zokuguqulela ezintlanu ziyafumaneka: I-Balanced (mhle), I-Conversational, I-Formal professional, I-Dub-style kunye ne-Custom. I-\"Dub-style\" ilungele incoko yefilimu neTV; i-\"Formal professional\" ilungele amawokhumentari kunye nezifundo."
    ],
    "img": {
     "file": "translate-lang",
     "alt": "Izicwangciso zolwimi nesitayela sokuguqulela: ulwimi lomthombo, ulwimi ekujoliswe kulo lolokudonsa phantsi kunye nezitayela ezintlanu",
     "cap": "\"Ulwimi\" kunye \"nesitayela sokuguqulela\": umthombo unokuzifumanela ngokwawo, 75 ukhetho ekujoliswe kulo"
    }
   },
   {
    "h2": "Isigama: gcina amagama ehambelana",
    "ps": [
     "I-AI iguqulela ngamaqela, ngoko ke igama elifanayo linokuvela ngeendlela ezimbini ezahlukileyo kumaqela ahlukeneyo. Bhala imigaqo \"umthombo → kufuneka iguqulelwe njenge\" kwisigama; ngaphambi kweqela ngalinye isixhobo siyayiskena kwaye silandele wonke umdlalo. Umgaqo omnye ngomgca; iintolo zinokuba `->`, `=>`, `→` okanye iTab; igama lomthombo eledwa lithetha ukuba ligcine lingaguqulelwanga; upelo oluninzi lunokwabelana ngokuvela kunye `|`. Cofa \"✨ AI extract\" ukuze i-AI itsale amagama afanelekileyo kwividiyo iwele kwiteyibhile kuqala, uze uhlele kwaye uguqulele."
    ],
    "img": {
     "file": "translate-glossary",
     "alt": "Isigama kunye nendawo yamagama afanelekileyo: ibhokisi yokufaka isigama ene-AI extract kunye namaqhosha okulondoloza",
     "cap": "Isigama \"Samagama ahlangeneyo\": amagama afanelekileyo e-AI-extract, alayishwa ngokuzenzekelayo kwiividiyo ezintsha xa sele agcinwe"
    }
   },
   {
    "h2": "Inkqubo yokuguqulela",
    "ps": [
     "Cofa u-\"▶ Qala ukuguqulela\" kubha ephezulu. Umgca wamanani osembindini ubonisa okufakiweyo, okuguqulelweyo, izinto ezigcwalisayo ezicociweyo kunye namaqela emisho yokuwela unxweme ngexesha lokwenyani; ibha yenkqubela phambili ibonisa ixesha eliqikelelweyo eliseleyo kunye namathokheni asetyenzisiweyo. Ngelixa uguqulela, cofa nayiphi na iseli yokuguqulela kwiteyibhile ukuhlela umbhalo — utshintsho lugcinwe kumatshini wakho kwaye lusinda ekuhlaziyeni. Vala iphepha phakathi komzamo kwaye uya kunikwa ukuba uqhubeke apho lishiye khona. Xa umvakalisi omnye uthabatha okufakiweyo okuninzi, iqela lidityaniswe, liguqulelwe kwaye lazaliswa kwakhona ngobude."
    ],
    "img": {
     "file": "translate-workspace",
     "alt": "Indawo yokusebenzela yokuguqulela: umgca wamanani, ibha yenkqubela phambili kunye niteyibhile yesihlokwana ehlelekayo",
     "cap": "Indawo yokusebenzela yasezimbindini: umgca wamanani + ibha yenkqubela phambili + cofa-ukuze-uhlele itheyibhile yesihlokwana"
    }
   },
   {
    "h2": "Export :: Thumela ngaphandle",
    "ps": [
     "Kwikholamu yasekunene khetha ifom yokuqulatho kuqala: ukuguqulela kuphela (lulwimi olunye), ulwimi olumbini kunye nomthombo phezulu, okanye ulwimi olumbini kunye noguqulelo phezulu; uze ufihle ifomathi yefayile: i-SRT, WebVTT, SBV, ASS okanye TXT. Ukukhetha i-ASS kongeza izakheko ezimbini: izikrini ezahluliweyo eziphezulu/ezantsi kunye nemigca esezantsi ezinyakelweyo. Umxholo nefomathi zidibanisa ngokukhululekileyo kwizitayela zokuthumela ngaphandle 14. Ububani bomgca weelwimi ezimbini bumiselwe ngokwahlukeneyo. Cofa u-\"Khuphela izihlokwana\" ukugcina ifayile, okanye u-\"Kopa kwiklipbhodi\" ukuyincamathisela ngoko nangoko."
    ],
    "img": {
     "file": "translate-export",
     "alt": "Iphaneli yokuthumela ngaphandle: iifom zoqulatho ezintathu, iifomathi zefayile ezintlanu kunye nezicwangciso zobubani bomgca weelwimi ezimbini",
     "cap": "Ukuthumela ngaphandle kwikholamu yasekunene: khetha ifom yokuqulatho kuqala, uze ufihle ifomathi yefayile"
    }
   },
   {
    "h2": "Cost and privacy :: Ixabiso nemfihlo",
    "ps": [
     "Imodeli emiselweyo ayidingi kubhalisa kwaye ayinasitshixo — isebenza ngaphandle kwebhokisi ngamaxabiso ngesicelo ngasinye: umda wemihla ngemihla nge-IP kunye nesabelo semihla ngemihla kwisiza sonke. Kumajelo amakhulu, faka isitshixo sakho se-API phantsi \"kwenjini yokuguqulela\". Imfihlo, ngokwesaziso esikwiphepha: izihlokwana zemodeli emiselweyo zidluliselwa ngeseva yalesi siza kumnikezeli; i-API yesiko iphethwe ngqo ngumnikezeli owufakayo, kwaye isitshixo sihlala kwisikhenqisi sakho. Ukuhlaziya, ukusonga imigca kunye nesakheko seelwimi ezimbini konke kuqhuba ekuhlaleni kwisikhenqisi."
    ]
   },
   {
    "h2": "FAQ :: I-FAQ",
    "ps": [
     "**Olunye ulwimi luxutywe noguqulelo?** Isixhobo sifumanisa ukukhukuliseka kolwimi kwaye siphinda siguqulele ngokuzenzekelayo; ukuba amanye amangeniso asabonakala engachananga, cofa iseli kwaye uwulungise ngesandla.",
     "**Kuthekani ngemigca yengoma?** \"Ukucaca okuqulathiweyo\" kunikela ngeendlela ezintathu zeengoma: guqulela iingoma, gcina umthombo okanye uzicime.",
     "**Uguqulelo olungahambelaniyo lwamagama?** Yongeza upelo olungahambelaniyo kwisigama uze uguqulele kwakhona; isigama sithatha kuqala phezu kwesicwangciso sasehlabathini \"sokusingatha amagama afanelekileyo\".",
     "**Ufuna isiNgesi phezulu nesiTshayina ngezantsi?** Khetha \"Ulwimi olumbini · umthombo phezulu\" xa uthumela ngaphandle; kwisiTshayina phezulu nesiNgesi ngezantsi, khetha \"Ulwimi olumbini · uguqulelo phezulu\"."
    ]
   },
   {
    "h2": "Izixhobo ezinxulumeneyo kunye nezikhokelo",
    "ps": [
     "Ifomathi engeyiyo? Qala nge-[[ukuguqulwa kwefomathi|/convert.html]]; ixesha lingahambelani? Sebenzisa [[uhlengahlengiso lwenkqubo yexesha|/shift.html]]; ngaphambi kokuba unikezele ngayo, yigqithise ku-[[ukuhlolwa komgangatho wesihlokwana|/guides/subtitle-quality-check.html]]."
    ]
   }
  ]
 },
 "translate-english-to-chinese": {
  "seo": {
   "title": "Guqulela izihlokwana zesiNgesi zibe sisiTshayina – AI-SRTSub",
   "desc": "Guqulela izihlokwana zesiNgesi zibe sisiTshayina: layisha i-SRT/VTT/ASS, khetha isiTshayina esenziwe lula okanye esesiNtu, kwaye uthumele ngaphandle izihlokwana zesiTshayina kuphela okanye zeelwimi ezimbini. – AI-SRTSub",
   "h1": "Guqulela izihlokwana zesiNgesi zibe sisiTshayina",
   "intro": "I-SRT yesiNgesi ingenile, izihlokwana zesiTshayina (okanye i-English-Chinese bilingual) ziphumile: layisha, khetha ulwimi ekujoliswe kulo, thumela ngaphandle — konke kwiphepha elinye.",
   "ctaText": "Guqulela izihlokwana zesiNgesi"
  },
  "body": [
   {
    "h2": "When you need it :: Xa uyifuna",
    "ps": [
     "Isihlokwana osikhupheleyo sesesiNgesi kuphela kwaye awukwazi ukuhambisana; okanye ufuna izihlokwana zesiTshayina zamalungu osapho abangafundi isiNgesi. Oku kukufunayo kuza kwelinye leefom ezintathu — **izihlokwana zesiTshayina kuphela**, okanye izihlokwana zeelwimi ezimbini **nesiTshayina phezulu, isiNgesi ngezantsi** okanye **isiNgesi phezulu, isiTshayina ngezantsi** — kwaye esi sixhobo siphuma zombini zontathu."
    ]
   },
   {
    "h2": "How to do it :: Indlela yokuyenza",
    "ps": [
     "Vula [[Isiguquli Sezihlokwana se-AI|/translate.html]] kwaye ufake ifayile yakho yesihlokwana sesiNgesi (i-SRT, VTT, ASS, SSA, SBV kunye ne-TXT zonke ziyaziwa, okanye uncamathisele umbhalo). Shiya “Ulwimi lomthombo” ku-auto-detect, seta “Ulwimi ekujoliswe kulo” lube sisiTshayina esenziwe lula okanye esesiNtu, kwaye cofa “▶ Qala ukuguqulela”. Xa igqibile, khetha ifom yokuqulatho kwiphaneli yokuthumela ngaphandle kwicala lasekunene: ukuguqulela kuphela (lulwimi olunye), ulwimi olumbini · umthombo phezulu (isiNgesi phezulu, isiTshayina ngezantsi), okanye ulwimi olumbini · uguqulelo phezulu (isiTshayina phezulu, isiNgesi ngezantsi), uze ukhethe ifomathi yefayile kwaye ukhuphele."
    ],
    "img": {
     "file": "translate-export",
     "alt": "Iphaneli yokuthumela ngaphandle: ukuguqulela kuphela, ulwimi olumbini olunomthombo phezulu, kunye nolwimi olumbini olunoguqulelo phezulu",
     "cap": "Khetha ifom yokuqulatho ekuthumeleni ngaphandle: isiTshayina kuphela, okanye isiNgesi-phezulu / isiTshayina-phezulu kweelwimi ezimbini"
    }
   },
   {
    "h2": "Two common problems :: Iingxaki ezimbini eziqhelekileyo",
    "ps": [
     "**Amagama aguqulelwe ngokungahambelaniyo?** I-AI iguqulela ngamaqela, ngoko ke igama elifanayo linokuvela ngeendlela ezimbini. Faka iimbini “zomthombo → igama eliguqulelweyo” kwisigama (umzekelo `Watson → Huasheng`) ukuyigcina ihambelana kuyo yonke.",
     "**Izihlokwana zikhukuliseka kumfanekiso?** Guqulela kuqala, uze ulungise ixesha: ibha yezixhobo zexesha phezulu kwendawo yokusebenzela inesiphelo sehlabathi kunye nolawulo lwesikali — bona [[Izihlokwana zikhukuliseka ngaphandle kokuhambelana kude kuse ekugqibeleni|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "videosub": {
  "seo": {
   "title": "Ukutsala izihlokwana zevidiyo ezifakwe ngaphakathi – iindlela ze-MKV / MP4 – AI-SRTSub",
   "desc": "Funda iindlela zesihlokwana ngaphakathi kwe-MKV, WebM, MP4 kunye ne-MOV ngqo uze uthumele i-SRT / VTT / ASS / TXT. Akukho kulayisha, akukho kuguqula, zonke iindlela zolwimi zixelwe, izihlokwana zemifanekiso zibizwe.",
   "h1": "Indlela yokutsala izihlokwana ezifakwe ngaphakathi kwividiyo",
   "intro": "Funda indlela yesihlokwana etywiniweyo ngaphakathi kwe-MKV / MP4 ngqo njenge-SRT — ividiyo ayilayishwa konke konke, yonke ifundwa kwisikhenqisi.",
   "ctaText": "Vula ukutsalwa kwezihlokwana zevidiyo"
  },
  "body": [
   {
    "h2": "What this tool does :: Le nto yenziwa sesi sixhobo",
    "ps": [
     "Izihlokwana zinokutywinwa ngaphakathi kwefayile yevidiyo endaweni yokuma zodwa. Ukuhlela, ukuguqulela okanye ukuzidibanisa kufuneka uqale uzikhuphe — yiyo leyo into enye eyenziwa yeli phepha."
    ]
   },
   {
    "h2": "1 Add the video :: 1 Yongeza ividiyo",
    "ps": [
     "Tsala ifayile yevidiyo kwikholamu yokuqala okanye cofa ukukhetha enye. I **MKV / WebM** kunye **MP4 / MOV** kuphela ezaziwayo; ezinye izikhongozeli aziyi kuvelisa nayiphi na indlela.",
     "Ifayile ayize ishiye ikhompyutha yakho — akukho nyathelo lokulayisha. Isixhobo sifunda ngamaqhekeza amancinci nge-offset, ngoko ke ifilimu enamagigabhayithi amaninzi ayigcwalisi inkumbulo, kodwa ukufunda kokuqala kufuneka kuskene ulwazi lwendlela kube kanye."
    ],
    "img": {
     "file": "videosub-up",
     "alt": "Indawo yongeza-ividiyo yephepha lokutsala izihlokwana ezifakwe ngaphakathi",
     "cap": "I-MKV / WebM kunye ne-MP4 / MOV ziyaxhaswa, kwaye ifayile ayize ishiye umatshini wakho"
    }
   },
   {
    "h2": "2 Iindlela zesihlokwana ezifakwe ngaphakathi",
    "ps": [
     "Nje ukuba ukufunda kugqibe, ikholamu yesibini idwelisa iindlela zesihlokwana kwifayile **enye ngomgca**, ngokuqhelekileyo enolwimi negama lendlela (umzekelo \"IsiTshayina\", \"IsiNgesi\", \"Forced\"). Cofa umgca ukutsala le ndlela.",
     "Xa ifayile inendlela yesihlokwana enye kuphela, ukutsalwa kuqala ngokuzenzekelayo — akukho nqaku lifunekayo.",
     "**Izihlokwana zemifanekiso azinakutsalwa**: Izihlokwana ze-Blu-ray PGS ne-DVD yimifanekiso etshiswe kumsinga engenambhalo onokuthathwa, kwaye iphepha lisho njalo ngokucacileyo; ezo zidinga i-OCR."
    ],
    "img": {
     "file": "videosub-track",
     "alt": "Uluhlu lweendlela zesihlokwana ezifakwe ngaphakathi, inye ngomgca",
     "cap": "Indlela enye ngomgca; xa kukho enye kuphela, ukutsalwa kuqala ngokuzenzekelayo"
    }
   },
   {
    "h2": "3 The result :: 3 Iziphumo",
    "ps": [
     "\"3 Iziphumo\" kwicala lasekunene libonisa umbhalo wesihlokwana otsaliweyo, kunye nefomathi yokuthumela ngaphandle ngaphezulu kwayo: **SRT / VTT / ASS / TXT**. Cofa u-\"Khuphela\" okanye u-\"Kopa\".",
     "Xa indlela yomthombo iyi-ASS, intloko yesitayela sayo kunye nesisombululo zibuya zingatshintshanga — ukuthumela ngaphandle njenge-ASS kuzigcina, ngelixa ukuthumela ngaphandle njenge-SRT kuphatha umbhalo kuphela."
    ],
    "img": {
     "file": "videosub-out",
     "alt": "Indawo yeziphumo kunye nokukhetha fomathi ye-SRT / VTT / ASS / TXT",
     "cap": "Iifomathi zokuthumela ngaphandle ezine; umthombo we-ASS ugcina intloko yesitayela sayo nesisombululo"
    }
   },
   {
    "h2": "Okushiywe kungatshintsanga",
    "ps": [
     "Ifayile yevidiyo ngokwayo ayichukunyiswa konke konke — ifundwa kuphela, akukho kubhala, akukho kuguqula, akukho kuzisa kwakhona.",
     "Umxholo wesihlokwana uphuma njengoko unjalo: akukho kuqikelela ukufakwa kwekhowudi, akukho kulungiswa kwexesha. Ukuba izihlokwana ezitsaliweyo ziyaphithizela, yingxaki yokufakwa kwekhowudi kwindlela yomthombo — yise ku-[[Ukulungiswa kombhalo ophithizelayo|/repair.html]]."
    ]
   },
   {
    "h2": "Common questions :: Imibuzo eqhelekileyo",
    "ps": [
     "**Akukho ndlela yokwenene yokujongana nezihlokwana zemifanekiso (PGS / DVD)?** Ayikho keli phepha — yimifanekiso engenaluhlu lombhalo. I-OCR kufuneka iqale kuqala, kwaye eli phepha aliyenzi lonto.",
     "**Izihlokwana ezitsaliweyo azichanekanga ngexesha — kutheni?** Eli phepha alilungisi maxesha; okuphumayo yile nto yayikhona. Kwisiphelo sehlabathi okanye ingxaki yexabiso sebenzisa [[Uhlengahlengiso lwenkqubo yexesha|/shift.html]].",
     "**Kutheni kuthatha ixesha elide ngaphambi kokuba kwenzeke nantoni na?** Ifayile enkulu kufuneka iskenwe uqhekeza ngeqhekeza ngolwazi lwendlela, kwaye enkulu ifayile kwaye kuthatha ixesha elide; oku kwenzeka ekuhlaleni kwaye akunanto yakwenza noqhagamshelwano lwakho.",
     "**Ndingasisebenzisa esi phepha kwiifayile zezihlokwana zangaphandle?** Awuyidingi — i-.srt / .ass yangaphandle iya ngqo ku-[[Ukuguqulwa kwefomathi|/convert.html]] okanye esinye isixhobo. Eli phepha lelezihlokwana ezitywinwe ngaphakathi kwividiyo."
    ]
   },
   {
    "h2": "Privacy :: Imfihlo",
    "ps": [
     "Ividiyo ifundwa ngokupheleleyo kwisikhenqisi: akukho nto ilayishelwayo, akukho nto iguqulwayo, akukho nto ihamba kwiseva. Vala iphepha kwaye idatha efundweyo iyakhululwa."
    ]
   },
   {
    "h2": "Izixhobo ezinxulumeneyo kunye nezikhokelo",
    "ps": [
     "Ukuguqulela oko ukutsalayo yiya ku-[[Ukuguqulelwa kwezihlokwana|/translate.html]], ukuyenza ibe yeelwimi ezimbini bona [[Iindlela ezimbini zokwenza izihlokwana zeelwimi ezimbini|/guides/make-bilingual-subtitles.html]]; ngomahluko phakathi kweendlela ezifakwe ngaphakathi nezangaphandle, kunye nokuba yeyiphi enokutsalwa, bona [[Indlela yokutsala izihlokwana ngaphandle kwevidiyo|/guides/extract-subtitles-from-video.html]]."
    ]
   }
  ]
 },
 "vtt-to-srt": {
  "seo": {
   "title": "Isiguquli se-VTT ukuya kwi-SRT – Guqulela izihlokwana ze-WebVTT – AI-SRTSub",
   "desc": "Guqulela izihlokwana ze-VTT (WebVTT) zibe yi-SRT kubahleli nabadlali abathatha i-SRT kuphela. Intloko ye-WEBVTT kunye neebhloko ze-NOTE ziyacocwa ngokuzenzekelayo. Kuqhuba kwisikhenqisi sakho.",
   "h1": "VTT to SRT :: VTT ukuya kwi-SRT",
   "intro": "Jikela izihlokwana ze-VTT (WebVTT) zibe yi-SRT: faka ifayile, khetha i-SRT, khuphela. Intloko kunye neebhloko ze-note ziyacocwa kwaye amagama exesha abuyela kumanani esikhewu.",
   "ctaText": "Convert VTT → SRT :: Guqulela i-VTT → SRT"
  },
  "body": [
   {
    "h2": "Xa ufuna i-SRT ibuyele",
    "ps": [
     "I-CapCut, Premiere, abadlali abaninzi bedesktop, nezixhobo zezihlokwana ezidala zamkela **i-SRT** kuphela. Izihlokwana ezikhuphelelwe kwiwebhu okanye kuYouTube ngokuqhelekileyo ziza njenge-VTT — ziguqulele zibe yi-SRT ukungenisa ngqo."
    ]
   },
   {
    "h2": "Okucocwayo kwi-VTT",
    "ps": [
     "**Umgca wentloko we-WEBVTT**, iibhloko ze-NOTE, iibhloko ze-STYLE/REGION, kunye nezicwangciso zomyalelo emva komgca wexesha (njenge-align:start) asingombhalo wesihlokwana — zilahlelwa phantsi ngokuzenzekelayo; ukubala kuyabuyiselwa kwaye isahluli semizuzwana esincinci sibuyela ukusuka kwichaphaza ukuya kwisikhewu."
    ],
    "img": {
     "file": "convert-upload-vtt",
     "alt": "Indawo yokulayisha: ifayile ye-VTT elayishiweyo, efumanekile njenge-VTT",
     "cap": "Ifayile enentloko ye-WEBVTT ifumaneka njenge-VTT kwangoko"
    }
   },
   {
    "h2": "How to convert :: Indlela yokuguqulela",
    "ps": [
     "Vula [[isiguquli|/convert.html]], faka i-VTT, khetha **SRT - SubRip** njengokuphumayo, uze uguqulele kwaye ukhuphele. Umbhalo kunye nexesha elixeliweyo zihlala zingachukunyiswanga."
    ],
    "img": {
     "file": "convert-result-srt",
     "alt": "Iziphumo zokuguqulelwa: ukubala kwe-SRT ngamaxesha esikhewu",
     "cap": "I-SRT eguqulelweyo: amanani omyalelo + amaxesha esikhewu"
    }
   }
  ]
 }
};
