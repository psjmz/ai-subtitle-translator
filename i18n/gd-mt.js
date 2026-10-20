/* i18n/gd-mt.js —— 43 篇指南页的mt译文（由 _mkgd.js 生成，勿手改）
 * 源：_gd/mt.json（Gemini 翻译，_gemgd.js 产出）
 * 结构：{ <slug>: { seo:{title,desc,h1,intro,ctaText}, body:[{h2,ps[],img}] } }
 * ⚠️ server.js 自己 require 它，不被任何 html 引用 —— 部署时必须显式加进传输列表。
 */
module.exports = {
 "ass-to-srt": {
  "seo": {
   "title": "Konvertitur ASS għal SRT – Ikkonverti Sottotitli ASS/SSA – AI-SRTSub",
   "desc": "Ikkonverti sottotitli ASS (u SSA) f'SRT sempliċi: it-test u l-ħinijiet jinżammu, l-istili le. Għal softwer li jaċċetta biss SRT. Jaħdem direttament fil-brawser.",
   "h1": "ASS għal SRT",
   "intro": "Aqleb sottotitli ASS (jew SSA) f'SRT: itfa' l-fajl, agħżel SRT, u niżżlu. It-test u l-ħinijiet jiġu estratti kif inhuma; it-tags tal-istil ma jgħaddux.",
   "ctaText": "Ikkonverti ASS → SRT"
  },
  "body": [
   {
    "h2": "Meta trid is-SRT lura",
    "ps": [
     "Is-suites tal-editjar, is-set-top boxes, il-plejers tat-TV, it-tolkits tat-traduzzjoni — ħafna passi downstream jaċċettaw **SRT** biss. L-istil u l-pożizzjonament fancy fl-ASS ma jfissru xejn hemmhekk, għalhekk l-SRT sempliċi huwa l-aktar għażla sigura."
    ]
   },
   {
    "h2": "X'jiġri mit-tags tal-istil",
    "ps": [
     "Kull cue tal-ASS huwa linja Dialogue li t-text tagħha ħafna drabi jkollu override tags bħal `{\\fonts}` għall-kulur, il-moviment, jew l-effetti. Il-konverżjoni għal SRT **tneħħi dawn it-tags flimkien mal-istil**, filwaqt li żżomm biss it-text u l-ħin; il-line breaks `\\N` jsiru line breaks reali. Il-fajls SSA jinqraw ukoll."
    ],
    "img": {
     "file": "convert-result-srt",
     "alt": "Riżultat tal-konverżjoni: In-numrazzjoni u t-text tal-SRT estratti mill-ASS",
     "cap": "L-SRT estratt: numru wieħed għal kull cue, text nadif"
    }
   },
   {
    "h2": "Kif tikkonverti",
    "ps": [
     "Iftaħ il-[[konvertitur|/convert.html]], niżżel il-fajl ASS fih (.ssa jaħdem ukoll), agħżel **SRT - SubRip** bħala l-output, imbagħad kkonverti u niżżel. Se tagħmel bil-kontra? Ara [[SRT għal ASS|/guides/srt-to-ass.html]]."
    ]
   }
  ]
 },
 "batch": {
  "seo": {
   "title": "Kif Tikkonverti Sottotitoli f'Lott – Mijiet f'ZIP Wieħed – AI-SRTSub",
   "desc": "Gwida pass pass: poġġi għexieren ta' fajls SRT/VTT, ikkonvertihom f'format wieħed, niżżel ZIP wieħed. Renumberati, timestamps inormalizzati, fajls mhux parsjati mmarkati minflok ma jidħlu moħbija fl-arkivju.",
   "h1": "Kif tikkonverti sottotitoli f'lott",
   "intro": "Staġun sħiħ ta' sottotitoli ġeneralment irid jispiċċa f'format wieħed, u t-telgħa tagħhom wieħed wieħed tieħu ż-żmien kollu. Poġġihom kollha hawnhekk, ikkonvertihom flimkien u niżżel ZIP wieħed — il-fajls li ma jistgħux jiġu parsjati jiġu mmarkati, u qatt ma jitqiegħdu fil-moħbi bħallikieku ħadmu.",
   "ctaText": "Iftaħ il-konverżjoni f'lott"
  },
  "body": [
   {
    "h2": "X'jagħmel dan l-għodda",
    "ps": [
     "Is-sottotitoli għal staġun sħiħ jew box set ġeneralment iridu jkunu uniformi qabel ma jkun jista' jsir xi ħaġa oħra magħhom. Hawn hu dak li tagħmel il-paġna tal-lott:"
    ]
   },
   {
    "h2": "Żieda ta' fajls",
    "ps": [
     "Iddreggja diversi fajls tas-sottotitoli fil-kaxxa bit-tikek flimkien, jew ikklikkja u agħżel diversi f'daqqa. Il-lista tal-fajls turi lil kull wieħed minnhom: il-fajls parsjati juru l-għadd ta' cues tagħhom, dawk mhux parsjati huma mmarkati sempliċement bħala mhux rikonoxxuti. Il-bar ta' fuq tgħodd in-numru totali ta' fajls, l-għadd ta' cues u kemm marru mhux rikonoxxuti.",
     "⚠️ Din il-paġna taqra UTF-8 biss. Kull ħaġa b'kodifikazzjoni mħassra (skrin mimli punti ta' interrogazzjoni jew kaxxi) għandha tgħaddew l-ewwel mill-[[Tiswija ta' Mojibake|/repair.html]]."
    ],
    "img": {
     "file": "batch-list",
     "alt": "Lista tal-fajls: l-isem u l-għadd ta' cues għal kull fajl, dawk mhux rikonoxxuti mmarkati bl-aħmar",
     "cap": "Kull fajl elenkat, u dawk mhux rikonoxxuti mmarkati fuq il-post"
    }
   },
   {
    "h2": "Għal xiex trid tikkonverti kollox",
    "ps": [
     "Agħżel il-format fil-mira taħt \"Ikkonverti kollox għal\" — SRT jew VTT. Kull fajl fil-lista mbagħad jiġi ġenerat mill-ġdid f'dak il-format: in-numri tas-cues jiġu nnumerati mill-ġdid mill-quċċata, it-timestamps jiġu nnormalizzati għall-mira (l-SRT jissepara l-millisekondi b'virgola, il-VTT b'tikka).",
     "**L-ismijiet tal-fajls oriġinali jinżammu u l-estensjoni biss tinbidel**; ismijiet duplikati jingħataw numru miżjud sabiex xejn ma jikteb fuq xi ħaġa oħra."
    ],
    "img": {
     "file": "batch-up",
     "alt": "Għażla tal-format fil-mira u l-istat tal-lista, bil-bar tal-istat turi l-għadd ta' fajls u cues",
     "cap": "Agħżel format fil-mira u kull fajl jiġi ġenerat mill-ġdid; l-ismijiet tal-fajls jibdlu biss l-estensjoni"
    }
   },
   {
    "h2": "Ippakkjar u tniżżil",
    "ps": [
     "Ikklikkja \"Ippakkja f'ZIP wieħed u niżżel\" u l-arkivju jkun fih kull fajl ikkonvertit. **Il-fajls mingħajr cues rikonoxxuti jibqgħu barra mill-arkivju** — jibqgħu fil-lista, immarkati, minflok ma jitħalltu daqslikieku rnexxew. Ladarba jiġi ppakkjat, ikollok għadd ta' kemm hemm fajls ġewwa."
    ],
    "img": {
     "file": "batch-zip",
     "alt": "Żona tal-ippakkjar: buttuna tat-tniżżil ta' ZIP u messaġġ tar-riżultat tal-ippakkjar",
     "cap": "Il-fajls mhux rikonoxxuti jibqgħu barra mill-arkivju u jibqgħu mmarkati fil-lista"
    }
   },
   {
    "h2": "Għaliex fajl jiġi mmarkat bħala mhux rikonoxxut",
    "ps": [
     "Fajl jiġi mmarkat meta l-ebda cue ma jista' jinqara minnu. Tliet raġunijiet tas-soltu: mhuwiex sottotitlu xejn (ngħidu aħna .txt readme mitluq), il-kodifikazzjoni mhijiex UTF-8 (għalhekk jinqara biss bħala karattri ta' sostituzzjoni), jew il-kontenut ġie ssikkat fi blokka waħda mingħajr timestamps.",
     "Il-fajls immarkati jistgħu jiġu ttrattati individwalment: il-problemi tal-kodifikazzjoni jmorru għand it-[[Tiswija ta' Mojibake|/repair.html]], il-problemi tal-format għand il-[[Konvertitur tal-format|/convert.html]] għal konverżjoni waħda qabel jerġgħu jmorru fil-lista."
    ]
   },
   {
    "h2": "Mistoqsijiet Frekwenti",
    "ps": [
     "**Kemm-il fajl nista' nżid?** M'hemmx limitu strett; jiddependi fuq il-memorja tal-browser tiegħek, u ftit mijiet ta' fajls SRT ġeneralment huma tajbin.",
     "**Jibdel id-djalogu tiegħi?** Le. Il-konverżjoni f'lott tbiddel biss il-format tal-kontenitur — in-numrazzjoni mill-ġdid tas-cues u n-normalizzazzjoni tat-timestamps — qatt kelma djalogu waħda.",
     "**X'jiġri jiek ikolli bżonn nibdel il-kontenut?** Din il-paġna tikkonverti formati biss. Biex tbiddel il-ħin f'massa uża l-[[Aġġustament tal-ħin|/shift.html]]; biex tbiddel il-kliem uża l-[[Sostituzzjoni tat-termini|/glossary.html]]; it-tnejn jaħdmu fajl b'fajl.",
     "**L-ASS huwa appoġġjat?** Din il-paġna tikkonverti bejn SRT u VTT biss. L-ASS iġorr stil — uża l-[[Konvertitur tal-format|/convert.html]] fuqu individwalment."
    ]
   },
   {
    "h2": "Privatezza",
    "ps": [
     "Il-konverżjoni u l-ippakkjar jaħdmu kompletament fil-browser tiegħek. L-ebda kontenut ta' sottotitoli qatt ma jintbagħat lil server."
    ]
   },
   {
    "h2": "Għodod u gwidi relatati",
    "ps": [
     "X'għandek tibdel għal staġun sħiħ u f'liema ordni — [[Editjar f'lott ta' staġun sħiħ ta' sottotitoli|/guides/batch-convert-srt.html]]; aktar formati għal fajl wieħed — [[Konvertitur tal-format|/convert.html]]; il-proofreading f'spreadsheet — [[Sottotitolu ⇄ tabella|/table.html]]."
    ]
   }
  ]
 },
 "batch-convert-srt": {
  "seo": {
   "title": "Editjar f'Lott ta' Staġun Sħiħ – X'Jaħdem f'Massa, X'Le – AI-SRTSub",
   "desc": "Staġun ġeneralment jeħtieġ l-isteb bdil kullimkien: format uniformi, żmien ta' offset, terminoloġija. Hawn hu x'jispiċċa f'pass wieħed, x'ma jistgħux, u kif timmaniġġja fajls li jonqsu milli jiġu parsjati.",
   "h1": "Editjar f'lott ta' staġun sħiħ ta' sottotitoli",
   "intro": "Meta għexieren ta' fajls tas-sottotitoli jeħtieġu bidla, ġeneralment tkun l-istess bidla kull darba. Li tkun taf liema partijiet jistgħu jsiru f'pass wieħed jiffranka ħafna aktar ħin milli taħdem fuqhom wieħed wieħed.",
   "ctaText": "Iftaħ il-konverżjoni f'lott"
  },
  "body": [
   {
    "h2": "Normalment tkun l-istess bidla kullimkien",
    "ps": [
     "Meta s-sottotitoli jmorru ħażin għal staġun sħiħ, rari kull episodju jkollu l-problema privata tiegħu stess — ġeneralment tkun kawża waħda li tolqot lil kull episodju: l-istess grupp ta' rilaxx ikkodifikahom kollha (għalhekk il-format u l-watermarks jaqblu), kollha kienu mfakkra mal-istess verżjoni tal-vidjow (għalhekk id-direzzjoni u l-ammont tal-offset jaqblu), jew it-trassliterazzjonijiet tbiegħdu matul l-istaġun.",
     "Agħmel check malajr fuq żewġ episodji l-ewwel — wieħed fil-bidu, wieħed lejn it-tmiem — u kkonferma li tassew hija **l-istess problema** qabel tagħmel l-lott. Jekk it-tnejn ma jaqblux, din mhix xi ħaġa li l-lott jista' jsolvi."
    ]
   },
   {
    "h2": "X'Jista' Isir f'Pass Wieħed",
    "ps": [
     "**L-unifikazzjoni tal-format** hija l- jedin ħaġa li tassew tispiċċa f'pass wieħed: iddreggja għexieren ta' fajls SRT u VTT fil-[[Konverżjoni f'lott|/batch.html]] flimkien, agħżel il-format fil-mira u niżżel ZIP wieħed. In-numrazzjoni mill-ġdid u n-normalizzazzjoni tat-timestamps iseħħu f'dak l-istess pass, u lanqas kelma djalogu waħda ma tinbidel."
    ],
    "img": {
     "file": "batch-list",
     "alt": "Lista tal-fajls tal-paġna tal-lott: għadd ta' cues għal kull fajl, dawk mhux rikonoxxuti mmarkati bl-aħmar",
     "cap": "Il-format uniformi huwa l-unika ħaġa li tassew tispiċċa f'pass wieħed"
    }
   },
   {
    "h2": "X'Irid Isir Fajl b'Fajl",
    "ps": [
     "Dawn m'għandhomx punt ta' dħul f'lott u jeħtieġu pass għal kull fajl — għalkemm ġeneralment ikun hemm ekwivalenti li **trid isir darba biss u mbagħad japplika għall-istaġun kollu**:"
    ]
   },
   {
    "h2": "Iġib l-ordni t-tajba",
    "ps": [
     "Meta jkun hemm bżonn isiru diversi affarijiet, l-ordni ħażina tfisser xogħol mill-ġdid. Mur b'din l-ordni:",
     "**Irranġa l-kodifikazzjoni** → **unifika l-format** → **ibdel il-kontenut** (watermarks, terminoloġija, ħin) → **QC l-aħħar**. Li tikkonverti formati qabel ma tiffissa l-kodifikazzjoni tagħtik biss mojibake f'kontenitur differenti; li tibdel il-kontenut qabel ma l-formati jkunu unifikati jfisser li taħdem b'appoġġ ta' għodod inkonsistenti."
    ],
    "img": {
     "file": "batch-zip",
     "alt": "Żona tal-ippakkjar: buttuna tat-tniżżil ta' ZIP u messaġġ tar-riżultat",
     "cap": "Unifika l-formati l-ewwel, ibdel il-kontenut wara"
    }
   },
   {
    "h2": "Immaniġġjar ta' fajls li ma ġewx rikonoxxuti",
    "ps": [
     "Il-fajls immarkati bħala mhux rikonoxxuti fil-konverżjoni f'lott jitħallew barra miż-ZIP u jibqgħu fil-lista. Tliet raġunijiet tas-soltu: mhuwiex fajl ta' sottotitolu (readme mitluq), il-kodifikazzjoni mhijiex UTF-8, jew il-kontenut ġie ssikkat fi blokka waħda mingħajr timestamps.",
     "Il-problemi tal-kodifikazzjoni jmorru għand it-[[Tiswija ta' Mojibake|/repair.html]] individwalment; il-problemi tal-format għand il-[[Konvertitur tal-format|/convert.html]] qabel ma jerġgħu jitpoġġew fil-lista. **Tġiegħelx fajls mhux rikonoxxuti jidħlu fl-arkivju biss biex iżżid l-għadd** — li tiskopri episodju nieqes fil-plejer tiegħek jiswa ħafna aktar mill-minuta li dan jiffranka."
    ]
   },
   {
    "h2": "Għodod u gwidi relatati",
    "ps": [
     "Il-gwida sħiħa tal-lott — [[Kif tikkonverti sottotitoli f'lott|/guides/batch.html]]; offsets tal-ħin uniformi — [[Kif taġġusta l-ħin tas-sottotitoli|/guides/shift.html]]; pass finali qabel il-kunsinna — [[QC tas-sottotitoli|/qc.html]]."
    ]
   }
  ]
 },
 "bilingual": {
  "seo": {
   "title": "Kif Taqli jew Tgħaqqad Sottotitoli Bilingwi – AI-SRTSub",
   "desc": "Erba' modi kif tneħħi sottotitoli bilingwi: żomm trekk wieħed biss, aqsam f'żewġ fajls, jew għaqqad f'entrata waħda b'żewġ linji. Iż-żewġ forom jiġu skoperti awtomatikament, fil-browser tiegħek.",
   "h1": "Kif Neħħi Sottotitoli Bilingwi",
   "intro": "Trid taqsam sottotitoli bilingwi, tgħaqqadhom, jew iżżomm trekk wieħed biss? Din il-gwida tgħaddi mill-erba' modi kollha: kif taħdem is-skoperta, liema mod tagħżel, u x'tikseb fuq l-esportazzjoni.",
   "ctaText": "Iftaħ l-Ippakkjatur tas-Sottotitoli Bilingwi"
  },
  "body": [
   {
    "h2": "Għal Xiex Iservi Din l-Għodda",
    "ps": [
     "Għandek sottotitoli bilingwi imma trid trekk wieħed biss — jew bil-kontra, trid taqsam jew tgħaqqad iż-żewġ treks:"
    ]
   },
   {
    "h2": "Kif Tiskopri Kontenut Bilingwi",
    "ps": [
     "Is-sottotitoli bilingwi b'żewġ treks jiġu f'żewġ forom komuni, u l-għodda tagħraf lil kull waħda minnhom — **mingħajr ma taqta' l-lingwa**: **Forma A (entrata waħda, żewġ linji)** tqassam it-treks skont is-sistema tal-kitba — kana, hangul, hanzi, Latin u sistemi oħra, għaxar b'kollox; żewġ sistemi differenti jfissru bilingwi, u liema waħda tidher l-ewwel tgħodd bħala l-oriġinali. Sistema waħda (linja twila Ċiniża mgeżwra f'tnejn, pereżempju) tiġi trattata bħala monolingwi u tinżamm kif inhi. **Forma B (żewġ entrati separati bl-istess ħin)** tqassam it-treks skont il-pożizzjoni — iż-żewġ entrati fl-istess timestamp jiffurmaw par, l-ewwel waħda tgħodd bħala l-oriġinali, u kombinazzjonijiet li jaqsmu l-alfabet Latin, bħall-Ingliż-Franċiż jew l-Ingliż-Ġermaniż, jiġu separati b'mod korrett ukoll. Meta ma jinstab l-ebda kontenut bilingwi, is-selettur tal-modalità u l-buttuna Ibda jiġu mċajpra flimkien ma' avviż ċar, sabiex qatt ma tqassam bil-forza fi riżultati ħżiena."
    ]
   },
   {
    "h2": "L-Erba' Modi",
    "ps": [
     "Agħżel wieħed mill-erba' fil-menu drop-down \"Liema wieħed trid?\": **Żomm l-oriġinali biss** u **Żomm it-traduzzjoni biss** kull wieħed jipproduċi fajl wieħed; **Aqsam f'tnejn** jipproduċi fajl oriġinali u fajl ta' traduzzjoni, bl-ismijiet tal-fajls immarkati awtomatikament b'`.orig` / `.dst` biex jiġu evitati l-kitbiet fuq xulxin; **Għaqqad f'entrata waħda b'żewġ linji** jibdel kull par f'entrata bilingwi — l-oriġinali fuq linja waħda, it-traduzzjoni fuq l-oħra — filwaqt li l-pari monolingwi jinżammu kif inhum u l-ebda tieni linja ma tiġi ivvintata. Meta taqleb il-modi jew il-formati tal-output, il-kontenut eżistenti jerġa' jaħdem awtomatikament — m'hemmx bżonn terġa' tikklikkja Ibda."
    ],
    "img": {
     "file": "bilingual-modes",
     "alt": "Għażla tal-modalità fl-istripper bilingwi: żomm l-oriġinali, żomm it-traduzzjoni, aqsam f'tnejn, għaqqad f'entrata waħda b'żewġ linji",
     "cap": "Erba' modi: żomm trekk wieħed, aqsam f'tnejn, jew għaqqad f'entrata waħda b'żewġ linji"
    }
   },
   {
    "h2": "Input u Output",
    "ps": [
     "Jaqra seba' formati — SRT, VTT, ASS, SSA, SBV, LRC, TXT (estensjoni tal-fajl l-ewwel, sniffing tal-kontenut bħala backup) — u jesporta erba': SRT, VTT, ASS, TXT. Kwalunkwe kombinazzjoni ta' input-output taħdem, sabiex il-konverżjoni bejn il-formati sseħħ tul it-triq. Il-line breaks `\\N` tal-ASS jiġu rrestawrati għal line breaks reali, u t-tags tal-effetti jitneħħew fuq l-esportazzjoni trans-format."
    ]
   },
   {
    "h2": "Riżultati u Esportazzjoni",
    "ps": [
     "Ir-riżultati jintwerew b'mod sħiħ f'kaxxa tat-text li tinqara biss, kull fajl bl-għadd ta' cues u l-istats tad-durata totali; il-buttuni Niżżel u Ikkopja jieħdu l-fajl direttament. Iż-żona tar-riżultati hija preview — m'hemm l-ebda editjar tat-text jew tal-ħin hawnhekk. Biex tagħmel bidliet, esporta l-ewwel, imbagħad uża l-għodda li taqbel."
    ],
    "img": {
     "file": "bilingual-result",
     "alt": "Iż-żona tar-riżultati tat-tneħħija: preview li tinqara biss, stats tal-għadd ta' cues, u buttuni ta' tniżżil/kopja",
     "cap": "Preview tat-text sħiħ + stats tal-cues u d-durata + tniżżil u kopja"
    }
   },
   {
    "h2": "Mistoqsijiet Frekwenti",
    "ps": [
     "**Entrata waħda għandha l-Ingliż fuq linja u l-Franċiż fuq l-oħra — għaliex mhux se tinqasam?** Il-Forma A tqassam it-treks skont is-sistema tal-kitba, għalhekk żewġ lingwi li jaqsmu sistema waħda ġewwa entrata waħda ma jistgħux jiġu separati. Strutturaha mill-ġdid bħala Forma B (żewġ entrati fuq l-istess timeline) u l-qsim ibbażat fuq il-pożizzjoni jaħdem.",
     "**Fajl wieħed biss fit-tniżżil?** \"Żomm l-oriġinali biss\", \"Żomm it-traduzzjoni biss\" u \"Għaqqad f'entrata waħda b'żewġ linji\" kull wieħed jipproduċi fajl wieħed bid-disinn; \"Aqsam f'tnejn\" biss thejtik tnejn, immarkati b'`.orig` / `.dst`.",
     "**Nista' nipproċessa f'lott?** Fajl wieħed kull darba; il-kjujiet mhumiex appoġġjati.",
     "**Tella' s-sottotitoli tiegħi?** Le — il-parsing u l-esportazzjoni jaħdmu kompletament fil-browser tiegħek."
    ]
   },
   {
    "h2": "Gwidi Relatati",
    "ps": [
     "Għall-mod malajr biex taqsam żewġ treks ara [[Kif taqsam is-sottotitoli bilingwi f'żewġ treks|/guides/split-bilingual-subtitles.html]]; għal kif isiru s-sottotitoli bilingwi ara [[Żewġ modi kif tagħmel sottotitoli bilingwi|/guides/make-bilingual-subtitles.html]]; għal traduzzjoni bil-magna uża [[Traduzzjoni ta' sottotitoli bl-AI|/translate.html]]."
    ]
   }
  ]
 },
 "clean": {
  "seo": {
   "title": "Cleaner tas-sottotitoli – neħħi watermarks, reklami, SDH – AI-SRTSub",
   "desc": "Cleaner tas-sottotitoli: ir-regoli 13 neħħi watermarks, reklami, captions tal-SDH, HTML tags, duplikati; kull bidla għandha diff u tista' tiġi mfakkar. SRT/VTT/ASS, kollha fil-browser.",
   "h1": "Kif tuża l-cleaner tas-sottotitoli",
   "intro": "Is-sottotitoli niżżlin mill-web spiss iġorru watermarks, reklami u captions tal-SDH. Il-cleaner japplika r-regoli 13 f'pass wieħed, u kull bidla għandha diff u tista' tiġi mfakkra.",
   "ctaText": "Iftaħ il-cleaner tas-sottotitoli"
  },
  "body": [
   {
    "h2": "X'jagħmel dan l-għodda",
    "ps": [
     "Il-fajls tas-sottotitoli niżżlin spiss iġorru affarijiet li m'għandhomx iġorru. Il-cleaner ineħħihom f'pass wieħed ibbażat fuq regoli:"
    ]
   },
   {
    "h2": "Tellgħu u skopri",
    "ps": [
     "Iddreggja fajl jew ikklikkja biex ittella' — SRT, VTT, ASS, SSA u TXT huma appoġġjati — jew pejstja t-text tas-sottotitolu direttament. Il-kodifikazzjoni tinqabad awtomatikament: jekk id-dekodifikazzjoni UTF-8 tipproduċi karattri ta' sostituzzjoni, taqleb għal GBK jew Big5, u l-paġna turi \"Kodifikazzjoni rranġata bħala {encoding}\". Jekk ittella' sottotitoli bilingwi b'żewġ treks (żewġ timelines identiċi, waħda Ċiniża u waħda Ingliża), dawn jiġu magħquda f'trekk bilingwi wieħed b'swiċċ \"oriġinali fuq fuq / traduzzjoni fuq fuq\"."
    ]
   },
   {
    "h2": "Konfigurazzjoni tar-regoli 13",
    "ps": [
     "L-interfaċċja għandha erba' gruppi b'kaxxi ta' kontroll 13: **Tags u format** (effetti ASS, HTML tags, karattri ta' kontroll, numerazzjoni mill-ġdid wara l-issortjar), **SDH u effetti tal-ħoss** (captions SDH, tikketti tal-kelliema, linji ta' kanzunetti puri), **Watermarks u entrati skart** (watermarks u reklami, entrati duplikati, entrati vojta), **Tiswijiet tat-text** (punteġġjatura u spazjar, tiswija ta' kapiċali kollha, għaqqad linji qosra. L-oġġetti \"bla telf u ċerti\" biss huma mixgħula awtomatikament; l-oġġetti li jistgħu jitilfu kontenut (linji ta' kanzunetti, tiswija ta' kapiċali, għaqqad linji qosra) huma mitfija — agħżelhom meta jkun meħtieġ. Kull oġġett għandu tip ta' hover ⓘ, u kwalunkwe bidla fil-kaxxa ta' kontroll terġa' taħdem immedjatament."
    ],
    "img": {
     "file": "clean-opts",
     "alt": "Interfaċċja tal-għażliet tat-tindif: erba' gruppi ta' kaxxi ta' kontroll 13, l-għadd attiv jintwera fil-quċċata",
     "cap": "Erba' gruppi, regoli 13; oġġetti bla telf biss mixgħula awtomatikament, il-bidliet japplikaw instantanjament"
    }
   },
   {
    "h2": "Bidla fid-diff u tneħħija tal-bidla (undo)",
    "ps": [
     "Ir-riżultati ma jiġux miktuba fuqhom direttament: kull bidla hija elenkata f'tabella tad-diff b'tag ta' regola (għaliex din l-entrata ġiet editjata jew imħassra). Trid waħda lura? Ikklikkja \"Irrestawra\" fuq dik ir-row; \"Irrestawra kollox\" iġib kollox lura bi klikk waħda, u li terġa' tikklikkja terġa' tapplika t-tindif sħiħ. Il-bar tal-istat turi l-għadd għal oriġinali / imnaddaf / imħassar / immodifikat / irrestawrat."
    ],
    "img": {
     "file": "clean-diff",
     "alt": "Tabella tad-diff tal-bidliet: indiċi, ħin, text oriġinali vs imnaddaf, tag ta' regola fuq kull row",
     "cap": "Kull bidla ġġorr tag ta' regola; irrestawra rows individwali jew kollha f'daqqa"
    }
   },
   {
    "h2": "Preview u esportazzjoni",
    "ps": [
     "Aqleb bejn il-fehmiet \"Imnaddaf / Oriġinali\". Fil-fehma oriġinali, l-entrati mħassra jiġu maqtugħin b'linja u mmarkati \"Imħassra\", u l-fajl esportat jaqbel mal-preview eżattament. Formati tal-esportazzjoni: SRT (default), VTT, ASS (disponibbli meta s-sors huwa ASS, bis-sezzjoni tal-istil ippreservata kif inhi), u TXT ta' text sempliċi mingħajr timelines. L-isem tal-fajl jikseb marker `.clean` awtomatikament."
    ],
    "img": {
     "file": "clean-preview",
     "alt": "Preview tat-text sħiħ: fehmiet imnaddfa u oriġinali b'bar tal-istat turi l-għadd",
     "cap": "Żewġ fehmiet tal-preview, dak li tara huwa dak li tikseb"
    }
   },
   {
    "h2": "Mistoqsijiet Frekwenti",
    "ps": [
     "**Se tħassar djalogu normali bi żball?** Ir-regola tal-watermark l-ewwel tneħħi l-linji tal-watermark (iżżomm il-linji tad-djalogu ġewwa entrati bilingwi) u tħassar l-entrata kollha biss jekk jibqgħu traċċi; it-tneħħija tal-SDH tmiss biss kontenut imdawwar bi brakits b'keywords tal-SDH li huwa 40 karattri jew iqsar — djalogu f'parentesi ordinarju jibqa'.",
     "**Kif huma distinti l-linji ta' kanzunetti puri mill-kanzunetti ġewwa d-djalogu?** Entrati fejn kull linja waħda hija mgeżwra f'noti tal-mużika ♪ jew markers bħal [mużika] biss jiġu mħassra; id-djalogu li contera kanzunetti jinżamm.",
     "**Jistgħu t-tikketti tal-kelliema jolqotu text Ċiniż?** Isem alfanumeriku b'kapiċali kollha fil-bidu tal-linja segwit minn colon (bħal `GEORGE:`) biss jaqbel; sentenzi b'colon Ċiniżi qatt ma jagħmlu hekk.",
     "**Nista' naddaf diversi fajls f'daqqa?** Le — fajl wieħed għal kull darba. Niżżel ir-riżultat, imbagħad ittella' l-ieħor."
    ]
   },
   {
    "h2": "Privatezza",
    "ps": [
     "It-tindif jaħdem kompletament fil-browser tiegħek; l-ebda kontenut ta' sottotitolu qatt ma jintbagħat lil server."
    ]
   },
   {
    "h2": "Għodod u gwidi relatati",
    "ps": [
     "Għal gwida qasira ffukata fuq it-tneħħija ta' watermarks u reklami, ara [[neħħi reklami u watermarks tas-sottotitoli|/guides/remove-subtitle-ads.html]]; għaddi l-fajl tiegħek mill-[[kontroll tal-kwalità tas-sottotitoli|/guides/subtitle-quality-check.html]] qabel ma tgħaddih; biex tibdel il-formati uża [[konverżjoni tal-format|/convert.html]]."
    ]
   }
  ]
 },
 "convert": {
  "seo": {
   "title": "Kif Tikkonverti Formati ta' Sottotitoli (SRT, VTT, ASS, SBV, LRC, TXT) – AI-SRTSub",
   "desc": "Gwida illustrata tal-konvertitur: poġġi fajl, iċċekkja l-format misjub, agħżel il-format tal-output, immaniġġja text bilingwi, u niżżel. Kollox jaħdem fil-browser tiegħek.",
   "h1": "Gwida tal-Konvertitur tal-Format tas-Sottotitoli",
   "intro": "Din il-gwida timxi fuq il-paġna minn fuq s'isfel: tella' sottotitolu, ikkonferma l-format misjub, agħżel il-format tal-output, u niżżel. Kollox jaħdem fil-browser tiegħek — l-ebda fajl qatt ma jħalli t-tagħmir tiegħek.",
   "ctaText": "Iftaħ il-konvertitur tas-sottotitoli"
  },
  "body": [
   {
    "h2": "Tella' s-sottotitoli tiegħek",
    "ps": [
     "Iddreggja fajl fil-kaxxa bit-tikek jew ikklikkja biex tagħżel wieħed; tista' wkoll **tpejstja l-kontenut** dritt fil-kaxxa tat-text. Il-format jinstab kemm mill-estensjoni kif ukoll mill-kontenut, u ir-riżultat jintwera fit-tag tal-format."
    ],
    "img": {
     "file": "convert-upload",
     "alt": "Żona tat-teltih: SRT ta' eżempju m टेलjat, misjub bħala SRT",
     "cap": "Il-format misjub jintwera fit-tag — iċċekkja hawnhekk l-ewwel jekk għandekx dubju"
    }
   },
   {
    "h2": "Agħżel il-format tal-output",
    "ps": [
     "Agħżel il-format fil-mira mill-menu drop-down: sitt għażliet — srt, vtt, ass, sbv, lrc, txt. Il-konverżjoni għal ass terġa' tibni stil default fiss 1920×1080 (text abjad, kontorn iswed, qiegħ fiċ-ċentru) u **ma żżommx il-fonts jew il-kuluri oriġinali**; txt jesporta text biss, mingħajr ħin."
    ],
    "img": {
     "file": "convert-opt",
     "alt": "Menu drop-down tal-format tal-output b'VTT magħżul",
     "cap": "Il-format tal-output ma jsegwix l-input — int tagħżlu"
    }
   },
   {
    "h2": "Immaniġġjar bilingwi",
    "ps": [
     "Jekk il-fajl huwa bilingwi (żewġ linji f'cue wieħed, jew cues interfoljati), it-tqassim jinżamm kif inhu waqt il-konverżjoni. L-għażla \"żomm bilingwi\" taqsam iż-żewġ lingwi f'linji ta' fuq u ta' tifel, kull waħda mgeżwra mill-ġdid fuq tagħha stess; il-kontroll jiġi diżattivat meta ma jinstab l-ebda text bilingwi."
    ]
   },
   {
    "h2": "Kkonverti u niżżel",
    "ps": [
     "Agħfas \"Kkonverti\": il-pannell tar-riżultati juri l-għadd ta' cues u d-durata totali, bit-text lest biex jiġi spezzjonat. Ikklikkja **Niżżel** biex issalva l-fajl, jew **Ikkopja** biex tieħu t-text direttament. Il-konverżjoni qatt ma tbiddel l-ebda valur tal-ħin — tikteb mill-ġdid il-format biss. Biex tbiddel il-ħin tas-cues, uża l-[[għodda tal-ħin|/shift.html]]."
    ],
    "img": {
     "file": "convert-result",
     "alt": "Pannell tar-riżultati: għadd ta' cues u durata totali b'buttuni ta' tniżżil u kopja",
     "cap": "6 cues, 0:23 total — aqra malajr it-text qabel tniżżel"
    }
   }
  ]
 },
 "extract": {
  "seo": {
   "title": "Estrazzjoni ta' text sempliċi minn sottotitoli – Żewġ tqassimiet, ħames tindifiet – AI-SRTSub",
   "desc": "Oħroġ id-djalogu mis-sottotitoli bħala text sempliċi nadif: paragrafi kontinwi jew linja waħda għal kull cue, u dak li ineħħu l-ħames swiċċijiet għal cues SDH, watermarks, duplikati, prefissi u kanzunetti.",
   "h1": "Kif toħroġ text sempliċi minn sottotitoli",
   "intro": "Iġbed id-djalogu 'l barra minn fajl tas-sottotitolu bħala text sempliċi nadif: in-numri tas-cues, il-timelines u t-tags tal-istil jitneħħew awtomatikament, sabiex ir-riżultat jinqara bħala artikolu jew jaħdem bħala lista ta' djalogu.",
   "ctaText": "Iftaħ l-estrattur tat-text sempliċi"
  },
  "body": [
   {
    "h2": "X'jagħmel dan l-għodda",
    "ps": [
     "Id-djalogu f'fajl tas-sottotitolu biss jimporta għal qarrej; il-bqija hija struttura maħsuba għal plejer — numri tas-cues, timelines, tags tal-istil. Din il-paġna tneħħi l-istruktura u żżomm il-kelmiet."
    ]
   },
   {
    "h2": "Poġġih fih, mhux tella' biss",
    "ps": [
     "Il-kolonna \"1 Zid is-sottotitoli\" fuq ix-xellug taċċetta fajl imtella', u tista' wkoll tpejstja l-kontenut tas-sottotitolu dritt fil-kaxxa tat-text. Jekk għażilt il-fajl il-ħażin, ikklikkja \"Ikklerja\" u erġa' ibda.",
     "Din il-paġna taqra fajls bħala UTF-8. Jekk is-sottotitoli jinfetħu bħala ħajt ta' punti ta' interrogazzjoni jew kaxxi, il-kodifikazzjoni hija miksura — ikkonverti għal UTF-8 fit-[[Tiswija ta' text imħassar|/repair.html]] l-ewwel, imbagħad erġa' ejja."
    ],
    "img": {
     "file": "extract-up",
     "alt": "Żona ta' żieda ta' sottotitoli tal-estrattur tat-text sempliċi",
     "cap": "Tella' fajl, jew pejstja l-kontenut tas-sottotitolu dritt fil-kaxxa tat-text"
    }
   },
   {
    "h2": "Għażla bejn iż-żewġ tqassimiet",
    "ps": [
     "Fil-quċċata ta' \"2 Għażliet ta' estrazzjoni\" hemm it-tqassim: **Paragrafi kontinwi** jaqsam it-text f'pawżi u punteġġjatura li tagħlaq is-sentenzi sabiex jinqara bħala artikolu; **Linja waħda għal kull cue** jagħti linja waħda għal kull entrata ta' sottotitolu, li jaqbel mal-entrati tal-fajl oriġinali wieħed għal wieħed.",
     "Il-kopja tad-djalogu għal noti, prattika tat-traduzzjoni jew qari bħala proża titlob paragrafi kontinwi; il-bini ta' folja ta' djalogu, paragun linja b'linja mal-oriġinali jew l-għalf ta' għodda oħra jitlob linja waħda għal kull cue."
    ],
    "img": {
     "file": "extract-opt",
     "alt": "It-tqassim u s-swiċċijiet tat-tindif taħt l-għażliet tal-estrazzjoni",
     "cap": "Agħżel tqassim wieħed; il-ħames swiċċijiet ta' taħt jiddeċiedu liema tip ta' kontenut jitneħħa"
    }
   },
   {
    "h2": "X'jneħħi kull wieħed mill-ħames tindifiet",
    "ps": [
     "**Neħħi l-cues SDH**: iħassar deskrizzjonijiet tal-ħoss f'brakits bħal \"(passi)\" jew \"[mużika]\" u jżomm id-djalogu.",
     "**Neħħi watermarks u reklami**: iwaqqa' linji bħal krediti ta' fansubs, URLs u mankijiet ta' kanali.",
     "**Neħħi d-duplikati ġirien** meta l-istess sentenza tidher darbtejn wara xulxin (glitch tal-plejbek) kopja waħda biss tinżamm; duplikati aktar 'il bogħod iġorru tifsira u jitħallew waħedhom.",
     "**Neħħi l-prefissi tal-kelliema**: \"JOHN: Hello\" isir \"Hello\". Mitfi awtomatikament — text fi stil ta' skript jeħtieġ li juri min qed jitkellem.",
     "**Aqbeż il-linji ta' kanzunetti**: linji li huma kompletament \"♪ … ♪\" jinqabżu. Mitfi awtomatikament — il-kanzunetti huma kliem ukoll."
    ],
    "img": {
     "file": "extract-clean",
     "alt": "Il-ħames swiċċijiet tat-tindif u d-deskrizzjonijiet tagħhom taħt l-għażliet tal-estrazzjoni",
     "cap": "Kull swiċċ jgħid x'jneħħi fuq il-lemin tiegħu; agħżel dawk li għandek bżonn"
    }
   },
   {
    "h2": "Teħid tar-riżultat miegħek",
    "ps": [
     "Il-kolonna \"3 Riżultat\" fuq il-lemin turi t-text estratt b'mod dirett u terġa' tikkalkula hekk kif tibdel xi għażla.",
     "Meta tkun kuntent, ikklikkja \"Niżżel\" biex issalva .txt jew \"Ikkopja\" biex tieħu t-text miegħek. Għal lingwi li ma jseparawx il-kelmiet bi spazji, bħaċ-Ċiniż u l-Ġappuniż, l-għaqda tal-linji ssegwi regoli differenti, u l-għodda timmaniġġja dan għal kull lingwa awtomatikament."
    ],
    "img": {
     "file": "extract-out",
     "alt": "Żona tar-riżultat bil-buttuni tat-tniżżil u l-kopja",
     "cap": "Ir-riżultat jaġġorna direttament; niżżlu bħala txt jew ikkopjah direttament"
    }
   },
   {
    "h2": "X'jitħalla mhux mimsus",
    "ps": [
     "Id-djalogu innifsu ma jiġix miktub mill-ġdid. Is-swiċċijiet tat-tindif jiddeċiedu biss liema linji sħaħ jew blokki jitwaqqgħu; qatt ma jibdlu l-kliem ta' entrata.",
     "It-timelines u n-numri tas-cues sempliċement ma jinħarġux, ma jiġux mibdula u mbagħad inħarġu — il-fajl oriġinali mhux mimsus, u din il-paġna ma offrix esportazzjoni bi timelines. Dak ix-xogħol jappartjeni lill-[[Konverżjoni tal-format|/convert.html]]."
    ]
   },
   {
    "h2": "Mistoqsijiet komuni",
    "ps": [
     "**It-tags tal-istil tal-ASS jibqgħu fit-text?** Le. Il-blokki ta' override `{}` tal-ASS jitneħħew u d-djalogu biss jibqa'.",
     "**Fajl bilingwi joħroġ f'żewġ linji jew waħda?** Kemm-il linja kellha l-entrata; din il-paġna la tgħaqqad u lanqas taqsamhom — biex tisseparahom uża l-[[Qsim bilingwi|/bilingual.html]].",
     "**Għaliex il-prefissi tal-kelliema jinżammu awtomatikament?** L-isem f'\"JOHN: Hello\" spiss ikun informazzjoni utli (skripts, folji ta' djalogu), u t-tneħħija tiegħu tagħmilha diffiċli biex tkun taf min qed jitkellem, għalhekk l-għażla titħalla f'idejk.",
     "**Jistgħu jiġu estratti l-fajls ta' kanzunetti LRC ukoll?** Iva. It-time tags tal-LRC jitneħħew u l-linji tal-kanzunetti jibqgħu; jekk ma tridx kanzunetti, agħżel \"Aqbeż il-linji ta' kanzunetti\"."
    ]
   },
   {
    "h2": "Privatezza",
    "ps": [
     "Is-sottotitoli jiġu pproċessati kompletament fil-browser: xejn ma jittella' u xejn ma jgħaddi minn server. It-text jibqa' fuq il-paġna kurrenti biss u jitħassar fuq ir-refresh."
    ]
   },
   {
    "h2": "Għodod u gwidi relatati",
    "ps": [
     "Biex tifhem x'fih fil-verità fajl tas-sottotitolu ara [[X'hemm ġewwa fajl SRT|/guides/srt-file-format.html]]; biex tinterpreta d-djalogu estratt mur għand [[Traduzzjoni ta' sottotitoli|/translate.html]]; biex tibdlu f'tabella uża [[Sottotitoli għal Excel/CSV|/guides/srt-to-excel.html]]; u aħdem il-[[QC tas-sottotitoli|/qc.html]] qabel ma tgħaddi xi ħaġa."
    ]
   }
  ]
 },
 "extract-subtitles-from-video": {
  "seo": {
   "title": "Kif toħroġ sottotitoli minn vidjow – Inkorprati vs esterni – AI-SRTSub",
   "desc": "X'iġorru MKV / WebM / MP4 / MOV kull wieħed, kif it-text, l-ASS, il-WebVTT u t-treks mov_text ivarjaw, għaliex is-sottotitoli tal-immaġni (PGS / DVD) m'għandhomx text, u x'għandek tagħmel wara l-estrazzjoni.",
   "h1": "Kif toħroġ sottotitoli minn vidjow",
   "intro": "Is-sottotitoli jistgħu jgħixu ġewwa fajl ta' vidjow jew joqgħodu waħedhom barra minnu. Minn ġewwa, huma trek fil-kontenitur — l-estrazzjoni tagħhom m'għandha x'taqsam xejn mat-transkoding.",
   "ctaText": "Iftaħ l-estrazzjoni ta' sottotitoli minn vidjow"
  },
  "body": [
   {
    "h2": "Fejn jgħixu s-sottotitoli: inkorprati u esterni",
    "ps": [
     "Fajl ta' vidjow (MKV, MP4) huwa kontenitur li jżomm trek ta' vidjow, trek ta' awdjo u treks ta' sottotitoli fl-istess ħin. Is-sottotitoli ssiġillati ġewwa huma **inkorprati**; fajl .srt / .ass separat li joqgħod barra huwa **estern**, u trek inkorprat jissejjaħ ukoll **muxed in**.",
     "Is-sottotitoli esterni jistgħu jintużaw kif inhuma. Il-problema hija dawk inkorprati: biex teditjahom, tittraduċihom jew tibni trek bilingwi mill-oriġinali, m'għandekx fajl ta' sottotitolu f'idejk — trid taqra t-trek barra mill-kontenitur l-ewwel. Dan il-pass mhuwiex transkoding: il-vidjow ma jiġix rikodifikat, id-dejta diġà maħżuna fil-kontenitur tinqara biss."
    ]
   },
   {
    "h2": "Liema kontenitur iġorr xiex",
    "ps": [
     "Kontenituri differenti jżommu formati ta' sottotitoli differenti, u d-diffikultà tal-estrazzjoni tvarja wkoll:"
    ],
    "img": {
     "file": "videosub-which",
     "alt": "It-treks tas-sottotitoli elenkati mill-paġna tal-estrazzjoni ta' sottotitoli inkorprati",
     "cap": "Trek wieħed għal kull row, ġeneralment b'lingwa u isem ta' trek; meta jkun hemm wieħed biss jiġi estratt awtomatikament"
    }
   },
   {
    "h2": "Għaliex is-sottotitoli tal-immaġni ma jistgħux jiġu estratti",
    "ps": [
     "Is-sottotitoli PGS ta' Blu-ray u DVD ma jaħżnu l-ebda karattru, serje ta' immaġni b'alpha channel biss. Meta plejer jurihom ikun qed isajjar stampa, mhux jirrendi text.",
     "Għalhekk m'hemm l-ebda text f'tali trek li jinqara — mhuwiex li l-għodda ma tAppoġġjahx, hu li l-ebda karattru mhu hemm. Il-paġna tgħid b'mod ċar meta tinżel f'waħda.",
     "L-unika mod kif tikseb kelmiet huwa li tagħraf il-karattri f'dawk l-immaġni l-ewwel (OCR) u tibni sottotitoli minn hekk. Dak huwa proċess separat milli tiġbed trek barra."
    ]
   },
   {
    "h2": "Dak li ġeneralment jiġi wara l-estrazzjoni",
    "ps": [
     "Dak li joħroġ huwa t-trek kif kien: l-għodda ma taqtax il-kodifikazzjonijiet u ma tikkoreġix it-timelines. Għalhekk żewġ affarijiet jinqalgħu ta' spiss:",
     "Waħda hija **text imħassar** — problema ta' kodifikazzjoni fit-trek tas-sors li joħroġ imħassar xorta waħda; mur għand [[Kif issewwi text imħassar|/guides/repair.html]] biex tidentifika l-kodifikazzjoni. L-oħra hija **ħin ħażin** — kemm jekk is-sors għandu logo ta' introduzzjoni, jew il-frame rates ma jaqblux, ir-riżultat huwa offset bħala kollox; uża l-[[Aġġustament tat-timeline|/shift.html]] biex tagħmel offset jew skala tiegħu.",
     "Wara dan, biex tittraduċi mur għand [[Traduzzjoni ta' sottotitoli|/translate.html]], u biex tagħmlu bilingwi ara [[Żewġ modi kif tagħmel sottotitoli bilingwi|/guides/make-bilingual-subtitles.html]]."
    ],
    "img": {
     "file": "videosub-formats",
     "alt": "Iż-żona tar-riżultat bil-formati tal-esportazzjoni SRT / VTT / ASS / TXT",
     "cap": "Is-sottotitoli estratti jistgħu jiġu esportati f'erba' formati; sors ASS iżżomm is-style header u r-riolużjoni tiegħu"
    }
   },
   {
    "h2": "Ftit affarijiet faċli biex isiru ħażin",
    "ps": [
     "**L-estrazzjoni ta' sottotitoli mhijiex il-ħruq tagħhom fil-vidjow.** Il-vidjow ma jiġix rikodifikat, għalhekk il-kwalità tal-istampa u l-awdjo ma jiġux affettwati.",
     "**L-estrazzjoni ma taffettwax il-fajl oriġinali.** Jinqara biss, qatt ma jinkiteb, u lanqas byte wieħed tal-vidjow ma jinbidel.",
     "**Fajl kbir li jkun bil-mod mhuwiex problema ta' konnessjoni.** L-għodda tiskennja l-informazzjoni tat-treks biċċa biċċa, u iktar ma jkun kbir il-fajl iktar tieħu żmien; kollox iseħħ lokalment.",
     "**Is-sottotitoli esterni m'għandhomx bżonn din il-paġna.** Jekk għandek .srt / .ass, mur direttament għand [[Konverżjoni tal-format|/convert.html]]; sottotitoli ssiġillati ġewwa vidjow biss jeħtieġu estrazzjoni l-ewwel."
    ]
   },
   {
    "h2": "Għodod u gwidi relatati",
    "ps": [
     "Għall-gwida sħiħa ara [[Kif toħroġ sottotitoli inkorprati f'vidjow|/guides/videosub.html]]; biex tittraduċi dak li toħroġ mur għand [[Traduzzjoni ta' sottotitoli|/translate.html]], biex tagħmlu bilingwi ara [[Żewġ modi kif tagħmel sottotitoli bilingwi|/guides/make-bilingual-subtitles.html]]; għal text imħassar ibda bi [[Tiswija ta' text imħassar|/repair.html]]."
    ]
   }
  ]
 },
 "fps-23-976-vs-25": {
  "seo": {
   "title": "Xi jfissru verament 23.976 / 24 / 25 / 30 fps – Ħin tas-Sottotitoli – AI-SRTSub",
   "desc": "23.976 mhuwiex 24 u 29.97 mhuwiex 30 — l-0.1% nieqes ġej mill-kulur NTSC, filwaqt li PAL imexxi films 4% aktar malajr. Kif dawn ibiddlu l-ħin tas-sottotitoli tiegħek, u kif tikkonverti bejniethom.",
   "h1": "Xi jfissru verament 23.976 / 24 / 25 / 30 fps",
   "intro": "Id-differenza 0.1% bejn 23.976 u 24 hija fdal mill-istorja tat-televiżjoni. Flimkien mal-4% tal-PAL, hija r-raġuni għaliex is-sottotitoli jitbiegħdu aktar mis-sinkronizzazzjoni hekk kif film jimxi 'l quddiem.",
   "ctaText": "Iftaħ l-aġġustament tal-ħin"
  },
  "body": [
   {
    "h2": "X'inhu kull numru",
    "ps": [
     "Il-frame rate huwa kemm-il stampa jintwerew f'sekonda waħda. L-erba' li tiltaqa' magħhom l-aktar spiss:"
    ]
   },
   {
    "h2": "Minn fejn ġej l-0.1%",
    "ps": [
     "23.976 = 24 × 1000/1001, u 29.97 = 30 × 1000/1001. Dak it-1000/1001 huwa fdal miż-żieda tal-kulur ma' NTSC: biex tpoġġi s-subcarrier tal-kulur mingħajr ma tkisser ir-riċevituri eżistenti iswed u abjad, il-field rate niżlet minn 60 Hz għal 59.94 Hz (60 × 1000/1001), u l-frame rate niżlet magħha.",
     "Ir-riżultat: il-films jixxandru f'23.976 f'reġjuni NTSC minflok f'24. Id-differenza hija 0.1%, jew 3.6 sekondi fuq siegħa — wieħed ma jinnotahx ħafna waħdu, imma tħallatx mal-4% t'hawn taħt u qatt tgħaqqad it-tnejn f'kalkolu wieħed."
    ]
   },
   {
    "h2": "Minn fejn ġej l-4%",
    "ps": [
     "Ir-reġjuni PAL juru bi 25 fps. Il-films jinġibdu bi 24 fps u sempliċement jintlagħbu bi 25 — l-ebda frame miżjud jew imneħħi, għalhekk il-plejbek jimxi 4% aktar malajr (25/24 ≈ 1.0417). Film ta' 100 minuti jimxi 96 minuti fil-verżjoni PAL tiegħu.",
     "Dik hija l-għerq tad-**drift progressiv**: sottotitoli magħmula kontra l-oriġinali u l-vidjow fil-verżjoni PAL jaqblu eżattament fil-bidu u huma erba' minuti bogħod sal-krediti. L-ebda shift globali ma jista' jsalva dan; irid jiġi skalat skont il-proporzjon."
    ],
    "img": {
     "file": "shift-step-rate",
     "alt": "Sezzjoni tal-veloċità tal-paġna tal-ħin: il-kaxxa tal-input tal-proporzjon",
     "cap": "Skala skont il-proporzjon — valur wieħed ikopri l-film kollu"
    }
   },
   {
    "h2": "Kif tikkonverti",
    "ps": [
     "Il-konverżjoni tfisser l-immultiplikar bi proporzjon wieħed li japplika tul il-film kollu:"
    ]
   },
   {
    "h2": "Kif tgħarraf liema wieħed għandek",
    "ps": [
     "Minflok taqta' l-proporzjon, sib żewġ mumenti li l-ħin korrett tagħhom int żgur minnu — ġeneralment l-ewwel u l-aħħar linji tad-djalogu — u għid l-għodda \"din il-linja għandha tkun fi 00:00:12 u dik f'01:35:40\"; tistira l-film kollu b'mod lineari bejn dawk iż-żewġ punti. Dak huwa \"l-ankraġġ b'żewġ punti\", u m'għandu bżonn l-ebda aritmetika ta' frame rate minnek.",
     "Biex tikkonferma l-frame rate lilek innifsek, iċċekkja l-plejer tiegħek jew għodda ta' informazzjoni tal-medja. Meta isem ta' fajl bħal `1080p.WEB` ma jkollux ħjiel ta' frame rate, l-ankraġġ b'żewġ punti huwa t-triq is-sigura."
    ],
    "img": {
     "file": "shift-step-two",
     "alt": "Sezzjoni tal-ankra b'żewġ punti tal-paġna tal-ħin: żewġ rows ta' inputs ta' timestamp",
     "cap": "L-ankraġġ b'żewġ punti m'għandux bżonn frame rate — żewġ timestamps biss"
    }
   },
   {
    "h2": "Għodod u gwidi relatati",
    "ps": [
     "Il-konverżjoni tal-frame rate stess — [[Konverżjoni tal-frame rate tas-sottotitoli|/guides/srt-fps-converter.html]]; aġġustament tal-veloċità — [[Konverżjoni tal-veloċità tas-sottotitoli|/guides/subtitle-speed-converter.html]]; m'intix ċert jekk huwiex shift globali jew drift progressiv — [[Sottotitoli li qed jitbiegħdu aktar mis-sinkronizzazzjoni|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "glossary": {
  "seo": {
   "title": "Sostituzzjoni ta' termini f'lott f'sottotitoli – Tabella waħda tiffissa fajl – AI-SRTSub",
   "desc": "Regola waħda għal kull linja, separati b'-> , => , → jew Tab, b'# għall-kummenti. Tqabbil ta' kelma sħiħa, sensittività għall-kapiċali, l-ewwel jew it-tieni linja ta' cue bilingwi, kull bidla elenkata u mfakkra.",
   "h1": "Kif tissostitwixxi termini f'lott f'sottotitoli",
   "intro": "Tabella ta' termini waħda tagħmel il-kliem ta' fajl tas-sottotitolu sħiħ konsistenti f'daqqa — it-timelines, l-istili tal-ASS u l-blokki VTT NOTE ma jintmissux b'karattru wieħed.",
   "ctaText": "Iftaħ is-sostituzzjoni ta' termini f'lott"
  },
  "body": [
   {
    "h2": "X'jagħmel dan l-għodda",
    "ps": [
     "L-istess kelma tradotta f'żewġ modi differenti, ismijiet u postijiet jitbiegħdu bit-traduzzjoni bil-magna, sottotitoli ta' ħaddieħor li jeħtieġu jaqblu mal-konvenzjonijiet tiegħek stess — dawn kollha jaqsmu karatteristika waħda: dak li jinbidel huwa kelma, mhux l-istruttura. Din il-paġna tbiddel il-kelmiet biss."
    ]
   },
   {
    "h2": "Żewġ inputs: sottotitoli u tabella ta' termini",
    "ps": [
     "Il-kolonna \"1 Zid is-sottotitoli\" fuq ix-xellug tieħu fajl tas-sottotitolu, jew tista' tpejstja l-kontenut dritt ġewwa; jekk għażilt il-fajl il-ħażin, ikklikkja \"Ikklerja\".",
     "Il-kolonna \"2 Tabella ta' termini\" fuq il-lemin iżżomm ir-regoli. **Regola waħda għal kull linja**, bit-terminu l-qadima u t-terminu l-ġdida separati b'`->` , `=>` , `→` jew Tab — it-tlieta jaħdmu. Linji li jibdew b'`#` huma kummenti u ma jieħdu l-ebda parti fis-sostituzzjoni.",
     "Jekk m'intix ċert dwar il-format, ikklikkja \"Imla eżempju\" u edita dak."
    ],
    "img": {
     "file": "glossary-up",
     "alt": "Żona ta' żieda ta' sottotitoli u input tat-tabella ta' termini tal-paġna ta' sostituzzjoni ta' termini",
     "cap": "Sottotitoli fuq ix-xellug, regoli fuq il-lemin; regola waħda għal kull linja, terminu qadim u terminu ġdid separati b'->"
    }
   },
   {
    "h2": "Kif tikteb it-tabella ta' termini",
    "ps": [
     "Regola waħda għal kull linja: it-terminu kurrenti fuq ix-xellug, dak li għandu jsir fuq il-lemin. Pereżempju `Thor -> Donar` jissostitwixxi kull \"Thor\" fil-fajl b' \"Donar\".",
     "Il-kummenti jibdew b'`#` u huma utli biex tikkettja grupp ta' regoli (pereżempju \"# isem l-istaġun 1 tiswijiet\"), u biex tintefa regola temporanjament — poġġi biss `#` quddiemha minflok ma tħassarha.",
     "Ir-regoli jaħdmu minn fuq s'isfel; text ipproduċi minn regola waħda jiġi skennjat mill-ġdid mir-regoli ta' taħt tagħha. Meta l-ordni tgħodd (ngħidu aħna, ibdel A b'B l-ewwel u mbagħad B b'C), żomm dan f'moħħok."
    ],
    "img": {
     "file": "glossary-table",
     "alt": "Linja wara linja ta' regoli ta' sostituzzjoni fl-input tat-tabella ta' termini",
     "cap": "Regola waħda għal kull linja; linji li jibdew b'# huma kummenti u jistgħu jitfu regola temporanjament"
    }
   },
   {
    "h2": "X'jagħmlu t-tliet swiċċijiet",
    "ps": [
     "**Skop**: `all` / `first line only` / `second line only`. F'fajl bilingwi, agħżel \"it-tieni linja biss\" meta trid tibdel it-traduzzjoni biss; entrati li għandhom linja waħda biss jibqgħu mhux mimsus taħt kwalunkwe issettjar ta' linja waħda — l-għodda ma taqtax liema naħa hija l-oriġinali.",
     "**Kelma sħiħa**: tissostitwixxi biss termini li joqgħodu waħedهم bħala kelma, sabiex `art` ma tmissx `start`. Għal lingwi li ma jseparawx il-kelmiet bi spazji, bħaċ-Ċiniż u l-Ġappuniż, dan is-swiċċ m'għandux effett — is-sostituzzjoni taħdem fuq substrings hemmhekk.",
     "**Sensittiv għall-kapiċali**: mitfi awtomatikament, għalhekk `CEO` u `ceo` huma t-tnejn sostitwiti; meta magħżul, l-eżatt l-istess ortografija biss tiġi sostitwita."
    ],
    "img": {
     "file": "glossary-opt",
     "alt": "L-is-swiċċijiet tal-iskop, kelma sħiħa u sensittivi għall-kapiċali taħt it-tabella ta' termini",
     "cap": "L-iskop jiddeċiedi liema linja tinbidel; kelma sħiħa u kapiċali jiddeċiedu kemm terminu huwa mqabbel b'mod strett"
    }
   },
   {
    "h2": "Kull bidla elenkata, kull bidla mfakkra",
    "ps": [
     "\"3 Riżultat\" juri s-sottotitoli sostitwiti u wkoll **jelenka kull bidla**: liema cue, liema linja, minn xiex għal xiex.",
     "Jekk ma tridx waħda minnhom, ikklikkja fuqha fil-lista biex tirriversja dik l-entrata biss — m'hemmx bżonn teditja t-tabella ta' termini u terġa' tħaddem. Meta tkun kuntent, ikklikkja \"Niżżel\" jew \"Ikkopja\"."
    ],
    "img": {
     "file": "glossary-out",
     "alt": "Żona tar-riżultat bil-lista tal-bidliet individwali",
     "cap": "Kull bidla hija elenkata; ikklikkja waħda li ma tridx biex tirriversjaha"
    }
   },
   {
    "h2": "X'jitħalla mhux mimsus",
    "ps": [
     "**It-timelines, linji ta' stil ASS u blokki VTT `NOTE` ma jintmissux b'karattru wieħed.** Is-sostituzzjoni tapplika għall-text tad-djalogu biss, qatt għal linji strutturali.",
     "It-tabella ta' termini qatt ma timmodifika l-fajl tas-sottotitolu tiegħek awtomatikament — ir-riżultat huwa output ġdid u l-oriġinali jibqa' kif inhu."
    ]
   },
   {
    "h2": "Mistoqsijiet komuni",
    "ps": [
     "**Għaliex terminu ma ġiex sostitwit?** Iċċekkja l-iskop l-ewwel: b'\"it-tieni linja biss\" magħżul, entrati li għandhom linja waħda biss jibqgħu mhux mimsus. Imbagħad iċċekkja t-tqabbil ta' kelma sħiħa, li jwaqqaf tqabbil li mhumiex kelmiet waħedhom.",
     "**Għaliex iċ-Ċiniż xorta jissostitwixxi substrings bit-tqabbil ta' kelma sħiħa magħżul?** Dan huwa mistenni. Iċ-Ċiniż u l-Ġappuniż ma jseparawx il-kelmiet bi spazji, għalhekk l-għodda ma tistax tiddetermina l-konfini tal-kelmiet u t-tqabbil ta' kelma sħiħa m'għandux effett hemmhekk.",
     "**Kif nirriversja kollox wara żball?** Irriversja l-entrati waħda waħda fil-lista tal-bidliet; biex terġa' tibda mill-ġdid kompletament, ikklerja t-tabella ta' termini u erġa' z-żid is-sottotitoli.",
     "**Jistgħu l-linji ta' stil ASS jinbidlu bi żball?** Le. Il-linji ta' stil u l-blokki `NOTE` huma barra mill-iskop; text tad-djalogu biss jieħu sehem."
    ]
   },
   {
    "h2": "Privatezza",
    "ps": [
     "Is-sottotitoli u t-tabella ta' termini jiġu pproċessati kompletament fil-browser: xejn ma jittella' u xejn ma jgħaddi minn server. It-tabella ta' termini ma tinħażinx, għalhekk tkun vojta d-darba li jmiss li tiftaħ il-paġna."
    ]
   },
   {
    "h2": "Għodod u gwidi relatati",
    "ps": [
     "Jekk trid tibni tabella ta' termini u kif iżżomm waħda fuq staġun, ara [[Tabelli ta' termini: iż-żamma ta' staġun konsistenti|/guides/subtitle-glossary.html]]; jekk il-kontenut huwa maħmuġ (watermarks, cues SDH) aħdem it-[[Tindif ta' sottotitoli|/clean.html]] l-ewwel; ladarba l-ismijiet ikunu stabbiliti u jkollok bżonn lingwi oħra mur għand [[Traduzzjoni ta' sottotitoli|/translate.html]]; u aħdem ir-riżultat permezz tal-[[QC tas-sottotitoli|/qc.html]]."
    ]
   }
  ]
 },
 "hanconv": {
  "seo": {
   "title": "Konverżjoni ta' Sottotitoli Simplifikati–Tradizzjonali – Tajwan vs Ħong Kong – AI-SRTSub",
   "desc": "Gwida tad-disa' direzzjonijiet: Tajwaniż bi jew mingħajr vokabularju reġjonali, Ħong Kong bħala t-togħma tiegħu stess, kollox konvertibbli lura għal simplifikat. Id-djalogu biss jinbidel; il-ħinijiet jibqgħu f'posthom.",
   "h1": "Kif tikkonverti sottotitoli Ċiniżi simplifikati u tradizzjonali",
   "intro": "Kemm jekk sottotitolu jmur it-Tajwan, Ħong Kong jew il-kontinent jibdel kemm il-kliem kif ukoll il-forom tal-karattri. Disa' direzzjonijiet x'tagħżel minnhom, u d-djalogu biss jiġi konvertit — il-ħinijiet, in-numri tal-indiċi u l-linji tal-istil ASS qatt ma jintmissux.",
   "ctaText": "Iftaħ il-konvertitur"
  },
  "body": [
   {
    "h2": "X'jagħmel dan l-għodda",
    "ps": [
     "Il-konverżjoni bejn simplifikat u tradizzjonali mhijiex biss li tikteb kull karattru b'mod differenti. L-istess kelma simplifikata tikkorrispondi għal kelmiet differenti f'reġjuni differenti — il-kelma għal \"softwer\" tvarja bejn it-Tajwan u l-kontinent, u Ħong Kong għandu verżjoni oħra. Il-konvertitur iżżomm dawn mifrudin:"
    ]
   },
   {
    "h2": "Tellgħu u skopri",
    "ps": [
     "Iddreggja fajl jew fittex wieħed — SRT, VTT, ASS u TXT huma appoġġjati — jew pejstja t-text tas-sottotitolu dritt fil-kaxxa. Il-format jinstab awtomatikament u jintwera ħdejn \"Format misjub\"."
    ],
    "img": {
     "file": "hanconv-up",
     "alt": "Żona tat-teltih tal-konvertitur: żona ta' tfigħ u kaxxa tal-pejst, bil-format misjub fuq fuq",
     "cap": "SRT / VTT / ASS / TXT, format misjub awtomatikament"
    }
   },
   {
    "h2": "Għażla fost id-disa' direzzjonijiet",
    "ps": [
     "Id-disa' direzzjonijiet taħt \"Ikkonverti għal\" jaqgħu fi tliet gruppi. **Simplifikat → tradizzjonali**: tradizzjonali ġeneriku, Tajwaniż (bidla fil-kliem), Tajwaniż (glifijiet biss), Ħong Kong. **Tradizzjonali → simplifikat**: ġeneriku, mit-Tajwaniż, minn Ħong Kong. **Tradizzjonali għal tradizzjonali**: forom tat-Tajwan, forom ta' Ħong Kong.",
     "L-għażla ta' \"Kliem tat-Tajwan\" tbiddel ukoll il-vokabularju reġjonali: il-kelma għal \"softwer\" issir dik tat-Tajwaniż u l-istess għall-kelma għal \"informazzjoni\"; \"Glifijiet tat-Tajwan\" tbiddel biss kif jinkitbu l-karattri u tħalli l-kliem tiegħek waħdu. Ħong Kong huwa każ ieħor għal kollox u juża kelma oħra għal \"softwer\". Biex tikkonverti lura għal simplifikat, uża l-grupp t'hawn taħt — trid tgħid minn liema varjetà tradizzjonali ġej, minħabba li t-text Tajwaniż u ta' Ħong Kong jieħdu rotot differenti lura."
    ],
    "img": {
     "file": "hanconv-dir",
     "alt": "Karta tal-konverżjoni għal: menu drop-down tad-destinazzjoni juri \"Simplifikat → Tradizzjonali tat-Tajwan (bidla fil-kliem)\" magħżul",
     "cap": "Id-direzzjonijiet jgħixu fil-menu drop-down \"Ikkonverti għal\" fi tliet gruppi; din hija Tajwaniża b'bidliet fil-kliem"
    }
   },
   {
    "h2": "Riżultat u esportazzjoni",
    "ps": [
     "Iż-żona tar-riżultat turi s-sottotitolu konvertit immedjatament, b'bar tal-istat tagħti l-għadd totali tal-linji u kemm-il linja nbidlet. Jekk xejn ma nbidel fl-aħħar mill-aħħar ikollok ħjiel li l-fajl jista' ma jkun fih l-ebda karattru Ċiniż — il-karattri Han biss jiġu konvertiti, għalhekk sottotitolu kollu Latin jew kollu numeriku jibqa' eżattament kif kien.",
     "Imbagħad niżżel jew ikkopja. Tag tal-lingwa jiddaħħal fl-isem tal-fajl — `demo.srt` isir `demo.zh-TW.srt` għal tradizzjonali tat-Tajwan, `.zh-Hant` għal tradizzjonali ġeneriku, u `.zh-Hans` meta tikkonverti lura għal simplifikat."
    ],
    "img": {
     "file": "hanconv-out",
     "alt": "Żona tar-riżultat: sottotitolu konvertit u bar tal-istat",
     "cap": "Il-bar tal-istat turi l-għadd ta' linji totali u mibdula; niżżel jew ikkopja minn hawn"
    }
   },
   {
    "h2": "X'qatt ma jintmess",
    "ps": [
     "Id-djalogu biss jiġi konvertit. It-timelines, in-numri tal-indiċi u l-linji tal-istil ASS ma jintmissux xejn — ir-riżultat huwa lest biex jintuża mingħajr ma terġa' tagħmel l-ebda format."
    ]
   },
   {
    "h2": "Mistoqsijiet Frekwenti",
    "ps": [
     "**Għaliex il-konvertitur ma bidilx il-kelma għal \"clean\"?** Mappings minn wieħed għal ħafna jiġu riżolti b'kelma: is-sens \"clean\" u s-sens \"dry\" jaqsmu forma tradizzjonali waħda, filwaqt li s-sens \"tree trunk\" juża waħda differenti. It-tabelli ġejjin minn OpenCC, li jqabblu frażijiet sħaħ minflok karattri singoli.",
     "**X'inhi d-differenza bejn it-tradizzjonali tat-Tajwan u ta' Ħong Kong?** Il-vokabularju: il-kelma għal \"softwer\" tvarja bejn it-tnejn. Agħżel id-direzzjoni għar-reġjun li qed twassal lilu.",
     "**L-għadd ta' karattri nbidel wara l-konverżjoni?** Il-karattri Han biss jiġu skambjati — l-ebda entrata ma tiġi miżjuda jew imneħħija u l-ebda ħin ma jiġi mċaqlaq. Jekk l-għadd ta' linji nbidel, iċċekkja jekk il-format nstabx b'mod korrett.",
     "**Id-dizzjunarju naqas milli jgħabbi?** Il-paġna tgħidlek biex tagħmel refresh u terġa' tipprova. Titgħabba lokalment, għalhekk m'hemmx bżonn ittella' sottotitoli mkien."
    ]
   },
   {
    "h2": "Privatezza",
    "ps": [
     "Il-konverżjoni taħdem kompletament fil-browser tiegħek. L-ebda kontenut ta' sottotitoli qatt ma jintbagħat lil server."
    ]
   },
   {
    "h2": "Għodod u gwidi relatati",
    "ps": [
     "Jekk kulma għandek bżonn huwa simplifikat għal tradizzjonali, ara [[Ikkonverti sottotitoli simplifikati għal tradizzjonali|/guides/srt-simplified-to-traditional.html]]; għaliex huwa dwar aktar milli sempliċement skambju ta' karattri, ara [[Simplifikat vs tradizzjonali mhuwiex skambju ta' karattri|/guides/simplified-traditional-chinese.html]]; biex tittraduċi f'lingwa oħra, [[Traduzzjoni ta' sottotitoli|/translate.html]]."
    ]
   }
  ]
 },
 "how-to-make-lrc-file": {
  "seo": {
   "title": "Kif tissinkronizza l-lirika tal-LRC – Linja waħda għal kull lirika, taptap mal-mużika – AI-SRTSub",
   "desc": "Oħloq fajl LRC mill-bidu: waħħal lirika waħda għal kull linja, taptap il-ħin waqt li tisma', l-istikers li jgħoddu, meta taqbeż linja, LRC jew SRT, u x'għandek tagħam meta l-ħin jitbiegħed.",
   "h1": "Kif tissinkronizza l-lirika tal-LRC",
   "intro": "Fajl LRC huwa sempliċement \"linja ta' lirika flimkien ma' punt ta' ħin wieħed\". Li tagħmel wieħed jissejjaħ sinkronizzazzjoni: li taqbad il-mument li fih tibda kull linja.",
   "ctaText": "Iftaħ l-għodda tas-sinkronizzazzjoni tal-lirika"
  },
  "body": [
   {
    "h2": "X'inhu fil-fatt il-ħin",
    "ps": [
     "L-istruttura ta' fajl LRC ma tistax tkun iktar sempliċi: lirika waħda għal kull linja, kull waħda preċeduta minn tikketta tal-ħin `[mm:ss.xx]`. Meta plejer jilħaq linja, juri dik il-lirika f'dak il-mument.",
     "Għalhekk ix-xogħol kollu ta' \"kif tagħmel LRC\" huwa li tassenja punt ta' ħin lil kull linja tal-lirika — u l-ebda magna ma tista' tagħmel dan għalik, minħabba li d-deċiżjoni ta' fejn linja tibda tinstema' teħtieġ is-smigħ."
    ]
   },
   {
    "h2": "Kemm-il darba (passi) teħtieġ kanzunetta",
    "ps": [
     "Ta' min taħsibha minuta qabel tibda; dan jevita l-biċċa l-kbira tax-xogħol mill-ġdid:"
    ],
    "img": {
     "file": "lrc-tap2",
     "alt": "Il-kontrolli bħala daqq, ittimbra-din-il-linja, neħħi-l-aħħar-linja u aqbeż-din-il-linja fiż-żona tat-taptap",
     "cap": "L-agħfas ta' Enter waqt id-daqq huwa l-aktar bla xkiel; ittajmrejt il-linja ħażina? Agħfas Z u erġa' ittimbra"
    }
   },
   {
    "h2": "Li twaħħal il-lirika jiddetermina kemm jibqa' bla xkiel il-kumplament",
    "ps": [
     "Waħħal il-lirika linja waħda għal kull lirika; il-linji vojta jinqabżu. Il-waqfiet tal-linji li twaħħal huma l-linji li se ttajmer aktar tard — qsamhom f'aktar linji issa u se taptap aktar drabi aktar tard.",
     "Li twaħħal LRC eżistenti jaħdem ukoll: it-tikketti tal-ħin `[mm:ss.xx]` tiegħu jiġu rikonoxxuti, u wara l-importazzjoni int **tkompli mill-ewwel linja mingħajr ħin**, sabiex il-linji li diġà huma ttimbrati ma jkollhomx għalfejn jerġgħu jsiru.",
     "Dan ifisser li LRC nofsu lest jista' jiġi salvat u mwaħħal lura aktar tard biex tkompli."
    ],
    "img": {
     "file": "lrc-paste2",
     "alt": "Iż-żona fejn twaħħal il-lirika u l-buttuna tal-analiżi tal-lirika (parse)",
     "cap": "Linja waħda għal kull lirika; li twaħħal LRC sħiħ jaqra l-ħinijiet eżistenti sabiex tkun tista' tkompli"
    }
   },
   {
    "h2": "Esporta LRC jew SRT",
    "ps": [
     "**Għal plejer tal-mużika, esporta LRC.** foobar2000, kull tip ta' plejers u apparat b'wiri tal-lirika jaqrawh.",
     "**Biex tpoġġi l-lirika fuq vidjow jew tipproċessaha aktar 'il quddiem, esporta SRT.** It-tracks tas-sottotitoli tal-vidjow, l-għodod tas-sottotitoli u s-software tal-editjar jaqraw l-SRT. Fl-esportazzjoni kull linja ddum sakemm tibda dik ta' wara, u l-aħħar linja taqa' lura għal 2 sekondi.",
     "It-tnejn jesportaw biss linji li għandhom ħin — linji maqbuża qatt ma jidħolu fil-fajl."
    ],
    "img": {
     "file": "lrc-export",
     "alt": "Il-buttuni tat-tniżżil tal-LRC, tat-tniżżil tal-SRT u tal-kopja fiż-żona tal-esportazzjoni",
     "cap": "LRC għall-plejers, SRT għall-vidjow; linji bil-ħin biss huma esportati"
    }
   },
   {
    "h2": "Ftit affarijiet li faċli żball fihom",
    "ps": [
     "**Kollox daqsxejn barra mill-ħin wara s-sinkronizzazzjoni? Uża offset.** Esporta SRT u aqlebha kollha f'daqqa ma' [[Timeline adjustment|/shift.html]]; ħafna aktar malajr milli terġa' ttajmer linja b'linja.",
     "**Id-dewmien jikber hekk kif timxi l-kanzunetta? Din hija problema ta' rata.** Meta l-veloċità tad-daqq u l-veloċità tar-reġistrazzjoni jvarjaw, l-iżball jikber lejn it-tmiem, u dan jeħtieġ skala proporzjonali, mhux offset.",
     "**L-istikers (shortcuts) iħossuhom naturali biss jekk tużahom flimkien.** L-ispazju (Space) idoqq u jwaqqaf, Enter ittimbra l-linja kurrenti, Z tħassar linja waħda — agħfas Enter direttament waqt id-daqq minflok taqleb bejn il-maws u t-tastiera.",
     "**Il-kwalità tal-awdjo taffettwa l-preċiżjoni.** Sors b'vokali ċari huwa aktar faċli biex issegwih; reġistrazzjonijiet live u sorsi b'mużika ta' wara qawwija huma ferm aktar diffiċli."
    ]
   },
   {
    "h2": "Għodod u gwidi relatati",
    "ps": [
     "Għall-ispjegazzjoni sħiħa ara [[How to use the lyric sync tool|/guides/lrc.html]]; b'mod li tibdel LRC eżistenti f'sottotitoli ara [[LRC to SRT|/guides/lrc-to-srt.html]]; jekk l-SRT esportat huwa maħdum ħażin uża [[Timeline adjustment|/shift.html]]; u mexxi r-riżultat permezz ta' [[Subtitle QC|/qc.html]]."
    ]
   }
  ]
 },
 "lrc": {
  "seo": {
   "title": "Għodda tas-sinkronizzazzjoni tal-lirika – Tagħbija kanzunetta, waħħal il-lirika, taptap mal-mużika – AI-SRTSub",
   "desc": "Tagħbija kanzunetta, waħħal il-lirika, taptap timbru tal-ħin għal kull linja waqt li tisma', u esporta LRC jew SRT. L-ispazju jdoqq u jwaqqaf, Enter ittimbra l-linja, Z tħassar, idejk jibqgħu fuq it-tastiera.",
   "h1": "Kif tuża l-għodda tas-sinkronizzazzjoni tal-lirika",
   "intro": "Tagħbija kanzunetta, waħħal il-lirika, taptap timbru tal-ħin għal kull linja hekk kif tisma', u esporta LRC jew SRT standard. L-awdjo jindaqq lokalment u qatt ma jittella' imkien.",
   "ctaText": "Iftaħ l-għodda tas-sinkronizzazzjoni tal-lirika"
  },
  "body": [
   {
    "h2": "X'tagħmel din l-għodda",
    "ps": [
     "Agħti lil kanzunetta fajl tal-lirika li jista' jinkanta magħha: linja waħda għal kull lirika, kull linja ġġorr punt ta' ħin. Il-plejers jaqraw LRC, it-tracks tas-sottotitoli jaqraw SRT, u t-tnejn jistgħu jiġu esportati hawnhekk."
    ]
   },
   {
    "h2": "1 Tagħbija l-kanzunetta",
    "ps": [
     "L-ewwel kolonna fuq ix-xellug tieħu fajl tal-awdjo: **MP3, M4A, FLAC, WAV u OGG** kollha jaħdmu. L-awdjo jindaqq lokalment u qatt ma jittella' imkien.",
     "Il-kwalità tal-awdjo ma taffettwax l-eżattezza tat-timbrar, iżda sors b'vokali ċari huwa aktar faċli biex issegwih; reġistrazzjonijiet live u sorsi b'mużika ta' wara qawwija huma ferm aktar diffiċli biex tissinkronizzahom."
    ],
    "img": {
     "file": "lrc-up",
     "alt": "Iż-żona fejn tgħabbi l-kanzunetta tal-għodda tas-sinkronizzazzjoni tal-lirika",
     "cap": "MP3 / M4A / FLAC / WAV / OGG kollha jaħdmu, u l-awdjo jindaqq lokalment biss"
    }
   },
   {
    "h2": "2 Waħħal il-lirika",
    "ps": [
     "Waħħal il-lirika fit-tieni kolonna, **linja waħda għal kull lirika**; il-linji vojta jinqabżu awtomatikament. Imbagħad ikklikkja \"Parse lyrics\".",
     "Li twaħħal LRC eżistenti jaħdem ukoll — it-tikketti tal-ħin `[mm:ss.xx]` tiegħu jiġu rikonoxxuti, u wara l-importazzjoni tkompli mill-ewwel linja mingħajr ħin, sabiex il-linji li diġà huma ttimbrati ma jkollhomx għalfejn jerġgħu jsiru."
    ],
    "img": {
     "file": "lrc-paste",
     "alt": "Iż-żona fejn twaħħal il-lirika u l-buttuna tal-analiżi tal-lirika",
     "cap": "Waħħal linja waħda għal kull lirika, jew waħħal LRC sħiħ u ħalli l-għodda taqra l-ħinijiet eżistenti"
    }
   },
   {
    "h2": "3 Taptap mal-mużika hekk kif tisma'",
    "ps": [
     "Doqq il-kanzunetta u agħfas Enter fil-mument li tibda linja (jew ikklikkja \"Stamp this line\"); il-ħin għal dik il-linja jiġi rreġistrat u l-korsur jaqbeż għal ta' wara.",
     "Stikers (Shortcuts): **space** idoqq u jwaqqaf, **Enter** ittimbra l-linja kurrenti, **Z** tħassar linja waħda. L-agħfas ta' Enter waqt id-daqq huwa l-aktar mod bla xkiel biex taħdem — m'hemmx bżonn taqleb 'l hawn u 'l hemm bejn il-maws u t-tastiera.",
     "Ittajmrejt il-linja l-ħażina? Agħfas Z biex tħassarha u erġa' ittimbra. Jekk ma tridx ittimbra linja affattu (waqfa strumentali, silta mużikali biss), ikklikkja \"Skip this line\" u din ma tidhirx fl-esportazzjoni."
    ],
    "img": {
     "file": "lrc-tap",
     "alt": "Il-kontrolli bħala daqq, ittimbra-din-il-linja, neħħi-l-aħħar-linja u aqbeż-din-il-linja fiż-żona tat-taptap",
     "cap": "L-ispazju jdoqq u jwaqqaf, Enter ittimbra l-linja kurrenti, Z tħassar — idejk jibqgħu fuq it-tastiera"
    }
   },
   {
    "h2": "4 Esporta",
    "ps": [
     "Ir-raba' kolonna tagħmel l-esportazzjoni: **Download LRC** għall-plejers, **Download SRT** għat-tracks tas-sottotitoli tal-vidjow, jew \"Copy\" biex tieħu it-test direttament.",
     "Linji bil-ħin biss huma esportati; linji maqbuża qatt ma jidħolu fil-fajl. Fl-esportazzjoni SRT kull linja ddum sakemm tibda ta' wara, u l-aħħar linja taqa' lura għal 2 sekondi."
    ],
    "img": {
     "file": "lrc-out",
     "alt": "Il-buttuni tat-tniżżil tal-LRC, tat-tniżżil tal-SRT u tal-kopja fiż-żona tal-esportazzjoni",
     "cap": "LRC għall-plejers, SRT għall-vidjow; linji bil-ħin biss huma esportati"
    }
   },
   {
    "h2": "X'jitħalla mhux mimsus",
    "ps": [
     "It-test tal-lirika ma jerġax jikteb ruħu. Is-sinkronizzazzjoni żżid biss punt ta' ħin wieħed għal kull linja u qatt ma tmiss il-kliem li waħħalt.",
     "Meta timporta LRC eżistenti, il-linji li diġà għandhom tikketta tal-ħin iżommu l-ħin oriġinali tagħhom u inti ttimbra biss mill-ewwel linja mingħajr ħin 'il quddiem."
    ]
   },
   {
    "h2": "Mistoqsijiet komuni",
    "ps": [
     "**Għaliex xi linji neqsin mill-esportazzjoni?** Linji maqbuża u linji mingħajr ħin qatt ma jidħolu fil-fajl. Mur lura għall-pass tlieta u żidhom, jew ikkonferma li kien maħsub li jinqabżu.",
     "**Il-ħinijiet jistgħu jinbidlu wara?** Jekk trid iċċaqlaq kollox ftit wara t-timbrar, esporta SRT u uża [[Timeline adjustment|/shift.html]] biex tagħmel offset jew tiskala kollox f'daqqa.",
     "**LRC jew SRT — liema għandi nesporta?** LRC għall-plejers tal-mużika (foobar2000, klijenti tal-istriming, kull tip ta' plejers); SRT meta l-lirika trid tpoġġi fuq vidjow jew tiġi pproċessata aktar b'għodod tas-sottotitoli.",
     "**Kemm tieħu żmien kanzunetta waħda?** Jiddependi fuq kemm hemm linji u kemm trid tkun preċiż. Għal kanzunetta ta' tletin jew erbgħin linja, ftit minuti għal kull pass ladarba tkun taf il-passaġġ; li tiġri wara preċiżjoni fil-livell ta' kelma tieħu aktar żmien."
    ]
   },
   {
    "h2": "Privatezza",
    "ps": [
     "L-awdjo u l-lirika huma pproċessati kompletament fil-browser: xejn ma jittella' u xejn ma jgħaddi minn server. L-awdjo jiġi ddekowdjat u jindaqq lokalment biss."
    ]
   },
   {
    "h2": "Għodod u gwidi relatati",
    "ps": [
     "Jekk diġà għandek LRC u trid sottotitoli ara [[LRC to SRT|/guides/lrc-to-srt.html]]; għall-ħsieb u l-problemi wara s-sinkronizzazzjoni ara [[How to sync LRC lyrics|/guides/how-to-make-lrc-file.html]]; jekk l-SRT esportat huwa żbaljat uża [[Timeline adjustment|/shift.html]]; u mexxi r-riżultat permezz ta' [[Subtitle QC|/qc.html]]."
    ]
   }
  ]
 },
 "lrc-to-srt": {
  "seo": {
   "title": "Konvertitur LRC għal SRT – Biddel il-lirika f'sottotitoli – AI-SRTSub",
   "desc": "Biddel il-lirika LRC f'sottotitoli SRT: kull linja ddum sakemm tibda l-oħra, l-aħħar cue tieħu 3 sekondi. Kanzunetti li jaqbżu 60 minuti jinqraw tajjeb. Jaħdem fil-browser tiegħek.",
   "h1": "LRC għal SRT",
   "intro": "Biddel fajls tal-lirika LRC f'SRT: itfa' l-fajl, agħżel SRT, niżżel. Il-ħinijiet tat-tmiem jimtlew mil-linja ta' wara awtomatikament.",
   "ctaText": "Biddel LRC → SRT"
  },
  "body": [
   {
    "h2": "Kif l-LRC huwa differenti mill-SRT",
    "ps": [
     "L-LRC huwa format tal-lirika: kull linja ġġorr biss ħin ta' \"bidu tal-kant\" f'`[minutes:seconds.cents]` u **l-ebda ħin tat-tmiem**; kull cue tal-SRT teħtieġ kemm bidu kif ukoll tmiem. Għalhekk il-qalba tal-konverżjoni hija li timla l-ħinijiet tat-tmiem."
    ],
    "img": {
     "file": "convert-upload-lrc",
     "alt": "Żona tat-tlugħ: fajl LRC mgħobbi, skopert bħala LRC",
     "cap": "Fajl tal-lirika bi timestamps [00:12.50] jiġi skopert bħala LRC mill-ewwel"
    }
   },
   {
    "h2": "Kif jimtlew il-ħinijiet tat-tmiem",
    "ps": [
     "Ir-regola hija sempliċifa: **kull linja ddum sakemm tibda l-oħra**; l-aħħar linja m'għandhiex \"li jmiss\", għalhekk tieħu 3 sekondi. Ukoll, it-timestamps tal-LRC iġorru biss minuti u sekondi — l-ebda sigħat — u l-qasam tal-minuti ma jkomplix jiżdied (62:05 ifisser 1 siegħa 2 min 5 s), sabiex tracks twal ħafna bħal mixes ta' DJs jinqraw b'mod korrett."
    ]
   },
   {
    "h2": "Kif tikkonverti",
    "ps": [
     "Iftaħ il-[[converter|/convert.html]], itfa' l-LRC, agħżel **SRT - SubRip** bħala l-output, imbagħad ikkonverti u niżżel. Utli għal vidjows mużikali u biex twaħħal il-lirika bħala sottotitoli fil-plejers; l-SRT esportat jista' jerġa' jiġi kkonvertit għal VTT għall-web."
    ]
   }
  ]
 },
 "make-bilingual-subtitles": {
  "seo": {
   "title": "Żewġ modi kif tagħmel sottotitoli bilingwi – AI-SRTSub",
   "desc": "Is-sottotitoli bilingwi jiġu f'żewġ forom: żewġ linji f'cue wieħed, jew żewġ cues fuq l-istess linja ta' żmien. Vantaġġi, żvantaġġi, u kif taqleb bejniethom. – AI-SRTSub",
   "h1": "Żewġ modi kif tagħmel sottotitoli bilingwi",
   "intro": "L-istess sottotitolu bilingwi jista' jaħbi żewġ tqassim (layouts) kompletament differenti. Tgħallem tagħrafhom, u l-ħolqien, il-qsim, u l-konverżjoni ma jibqgħux jagħtuk problemi.",
   "ctaText": "Aħdem b'sottotitoli bilingwi"
  },
  "body": [
   {
    "h2": "Kif jidhru ż-żewġ forom",
    "ps": [
     "**Formola B: żewġ cues fuq l-istess linja ta' żmien.** Linja waħda ta' djalogu ssir żewġ cues ta' sottotitoli separati b'sinkronizzazzjoni identika — waħda Ingliża, waħda Siniża — miġbuda f'saffi waħda fuq l-oħra. Dan huwa l-aktar mod komuni kif jinbnew is-sottotitoli bilingwi ASS."
    ]
   },
   {
    "h2": "Fejn kull waħda tfalli",
    "ps": [
     "Il-punt dgħajjef tal-Formola A huwa d-**detezzjoni**: il-qsim tat-tracks jiddependi fuq is-sistema tal-kitba, għalhekk pari Ċiniż-Ingliż jew Ġappuniż-Ingliż jisseparaw f'daqqa t'għajn, filwaqt li **kombinazzjonijiet li jaqsmu l-istess skript** — Ingliż flimkien ma' Franċiż, jew Ċiniż flimkien ma' kanji Ġappuniż — ma jistgħuc jiġu distinti. Il-punt dgħajjef tal-Formola B huwa l-**produzzjoni**: iż-żewġ linji ta' żmien iridu jaqblu eżattament u l-allinjament tagħhom bl-idejn huwa ta' diżgust; xi plejers ukoll jiġbdu ż-żewġ cues tal-istess linja ta' żmien, u jimlew l-iskrin. Regola ġenerali: uża l-Formola A għal sottotitoli lesti maħsuba għat-telespettaturi; uża l-Formola B meta jkollok bżonn tifred it-tracks għal aktar xogħol."
    ]
   },
   {
    "h2": "Iż-żewġ rotot",
    "ps": [
     "**Ibni sottotitoli bilingwi mill-oriġinal**: uża [[AI Subtitle Translation|/translate.html]] u agħżel “Bilingual · original on top” jew “Bilingual · translation on top” mal-esportazzjoni — ikollok il-Formola A direttament; l-għażla tal-ASS toffri wkoll żewġ tqassim, “stacked top and bottom” u “two lines at the bottom”.",
     "**Għaqqad żewġ tracks jew ikkonverti bejn il-forom**: uża [[Bilingual Subtitle Stripper|/bilingual.html]] u l-modalità tagħha “merge into one two-line entry” — Formola B tidħol, Formola A toħroġ; jekk tmur in-naħa l-oħra, “split into two files” tieħu Formola A jew B u tagħti żewġ tracks indipendenti."
    ],
    "img": {
     "file": "bilingual-modes",
     "alt": "Erba' modi tal-istripper bilingwi; “merge into one two-line entry” tgħaqqad żewġ cues li jaqsmu linja ta' żmien",
     "cap": "“Merge into one two-line entry”: Il-Formola B ssir Formola A"
    }
   },
   {
    "h2": "Liema apparat se jilgħabha",
    "ps": [
     "Il-plejers tal-web (HTML5 `<track>`) u l-biċċa l-kbira tal-plejers mobbli jimmaniġġjaw il-Formola A b'mod aktar affidabbli; il-plejers tad-desktop (VLC, mpv, PotPlayer) jaċċettaw it-tnejn u jistgħu saħansitra jagħtu kuluri u pożizzjonijiet differenti liż-żewġ cues tal-istess linja ta' żmien. Meta jkollok dubju, esporta l-Formola A bħala SRT — hija l-aktar li tivvjaġġa tajjeb. Għall-differenzi bejn il-formati stess, ara [[SRT, VTT or ASS: Which Should You Use|/guides/subtitle-format-comparison.html]]."
    ],
    "img": {
     "file": "translate-export",
     "alt": "L-għażliet tal-istil bilingwi fil-pannell tal-esportazzjoni tal-għodda tat-traduzzjoni",
     "cap": "Agħżel l-ordni tal-linji bilingwi dritt mal-esportazzjoni — pass wieħed u tkun lesta"
    }
   },
   {
    "h2": "Mistoqsijiet Frekwenti",
    "ps": [
     "**Is-sottotitoli bilingwi jidhru merħsin — x'nista' nagħmel?** Ikkontrolla l-wisa' tal-linja: il-pannell tal-esportazzjoni tal-għodda tat-traduzzjoni għandu ambjent ta' “bilingual line width”; linja anqas wiesgħa tfisser inqas karattri għal kull cue u skrin aktar nadif.",
     "**Irrid biss track waħda.** L-għażliet tal-istripper “keep original only / keep translation only” isolvuhom b'klik waħda, ara [[Split Bilingual Subtitles into Two Tracks|/guides/split-bilingual-subtitles.html]]."
    ]
   }
  ]
 },
 "merge": {
  "seo": {
   "title": "Għaqqad sottotitoli bilingwi u stili – Għaqqad, agħti stil, esporta – AI-SRTSub",
   "desc": "Għaqqad żewġ fajls ta' sottotitoli f'track bilingwi, erġa' agħti stil lil fajl bilingwi eżistenti, jew agħti stil lil wieħed b'lingwa waħda: modi ta' parir, it-templejts tal-ASS u l-VTT, u liema format għandek tesporta.",
   "h1": "Kif tuża t-tgħaqqid bilingwi u sottotitoli b'effetti speċjali",
   "intro": "Għaqqad żewġ fajls ta' sottotitoli f'track bilingwi wieħed, jew agħti stil lis-sottotitoli direttament: it-tipa, il-kulur, it-tarf (outline) u l-pożizzjoni huma dak li tara huwa dak li tieħu, u l-previżjoni taqbel mal-esportazzjoni.",
   "ctaText": "Iftaħ l-għodda tas-sottotitoli b'effetti speċjali"
  },
  "body": [
   {
    "h2": "X'tagħmel din l-għodda",
    "ps": [
     "Din il-paġna fil-fatt tkopri tliet impjiegi: tgħaqqid ta' fajl ta' sottotitoli oriġinali u tradott f'fajl bilingwi wieħed, aġġustament tal-ordni u l-istil ta' fajl li diġà huwa bilingwi, u żieda ta' effetti speċjali lil fajl b'lingwa waħda. It-tlieta jaqsmu l-istess parametri tal-istil u l-istess previżjoni."
    ]
   },
   {
    "h2": "Tliet impjiegi, paġna waħda",
    "ps": [
     "In-naħa ta' fuq tal-paġna għandha tliet tabs: **Merge two files**, **Adjust a bilingual file**, **Single-language file**. L-għażla tiegħek tiddeċiedi kemm hemm kolonni ta' input li jidhru fuq ix-xellug.",
     "Meta tgħaqqad żewġ fajls, in-naħa tax-xellug iżżomm żewġ kolonni, \"1 Original subtitles\" u \"2 Translated subtitles\"; kull waħda taċċetta fajl imtella' jew test imwaħħal dritt ġewwa. L-aġġustament ta' fajl bilingwi u l-istil ta' fajl b'lingwa waħda jeħtieġu biss kolonna waħda kull wieħed."
    ],
    "img": {
     "file": "merge-mode",
     "alt": "It-tliet tabs fin-naħa ta' fuq tal-għodda tas-sottotitoli b'effetti speċjali u ż-żona tal-input fuq ix-xellug",
     "cap": "Tliet tabs fin-naħa ta' fuq; meta tagħżel \"Merge two files\" jitilgħu kolonna oriġinali u waħda tradotta fuq ix-xellug"
    }
   },
   {
    "h2": "Kif jitqabblu żewġ fajls",
    "ps": [
     "L-ewwel oġġett taħt \"3 Merge settings\" huwa l-mod tal-parir: **Pair by order · use the original timeline**, **Pair by timeline · use the original timeline**, **Pair by order · use the translated timeline**.",
     "Meta ż-żewġ fajls ikollhom l-istess numru ta' dħul fl-istess ordni, it-tqabbil skont l-ordni huwa l-iktar sigur. Meta l-għadd ivarja (naħa waħda għaqqdet entrati, l-oħra qasmithom), qabbel skont il-linja ta' żmien u ħalli l-għodda tqabbel skont il-viċinanza. Liema linja ta' żmien għandek tuża jiddependi fuq liema fajl huwa l-aktar preċiż — ġeneralment l-oriġinali.",
     "Taħt dan hemm l-istruttura tat-test (awtodetekta / żewġ linji għal kull entrata / pari alternati) u l-ordni (oriġinali fuq fuq / traduzzjoni fuq fuq)."
    ],
    "img": {
     "file": "merge-pair",
     "alt": "Modalità ta' parir, struttura tat-test u għażliet tal-ordni taħt is-settings tat-tgħaqqid",
     "cap": "Il-modalità tal-parir tiddeċiedi liema linja tmur ma' liema, u l-linja ta' żmien ta' min għandha tintuża hija stabbilita hawn ukoll"
    }
   },
   {
    "h2": "Aġġusta l-istil oġġett b'oġġett",
    "ps": [
     "Il-pannell tal-istil jinsab fuq il-lemin. Meta tesporta ASS, japplika l-blokk \"ASS appearance\": it-tqassim (split · separated top and bottom / stacked · two lines at the bottom), id-daqs, il-kulur, l-opakità, it-tipa, l-eħxen (bold), il-korsiv (italic), l-ispazjar tal-ittri, it-tarf (outline), il-kulur tat-tarf, l-isfumatura/l-isfond (none / shadow / background), il-fond, il-kulur tal-fruntiera, l-opakità tal-fruntiera, l-allinjament orizzontali (bottom · left / bottom · centre / bottom · right) u d-distanza mill-qiegħ tal-linja tat-traduzzjoni (primarja), flimkien mat-tipa, l-isfumatura/l-isfond u l-marġini xellug/lemin tal-linja oriġinali (sekondarja).",
     "Meta tesporta stil VTT bilingwi, japplika l-blokk \"WebVTT style\": flimkien ma' sitt presets (standard / compact / cinematic / top / accessible / portrait) tista' tbiddel il-linja vertikali, l-ankra (bottom / top / centre), il-pożizzjoni orizzontali, id-daqs tal-wisa', il-valur tal-allinjament u l-għoli tal-linja tas-cue sħiħa, flimkien mal-kulur tal-isfond, l-opakità tal-isfond u l-wisa' tat-tarf tal-linja tat-traduzzjoni; il-linja oriġinali tista' tiret l-istil ewlieni jew tiġi ssettjata separatament.",
     "Meta tespandi tista' tissejvja ir-riżultat bħala preset u terġa' tużah aktar tard billi tagħżel taħt \"From saved presets\" u tikklikkja \"Apply\"."
    ],
    "img": {
     "file": "merge-style",
     "alt": "Il-parametri tal-pannell tal-apparenza ASS fuq il-lemin",
     "cap": "Id-daqs, il-kulur, it-tarf, l-isfumatura/l-isfond u l-allinjament huma kollha aġġustabbli, u r-riżultat jista' jiġi salvat bħala preset"
    }
   },
   {
    "h2": "Iċċekkja l-previżjoni qabel tesporta",
    "ps": [
     "\"Merge preview\" hija tabella: #, ħin, oriġinali, traduzzjoni, stil. Il-bar ta' fuq tiffiltra ringieli suspettużi skont \"has sound effects\", \"has a speaker prefix\", \"shorter than 1 second\", \"more than two lines\" u \"reading speed exceeded\", jew permezz ta' kelma prinċipali li tittep.",
     "Li tikklikkja l-islott tal-istil ta' ringiela tespandi l-editur ta' dak l-islott u telenka biss ir-ringieli li jużawh; \"Clear all overrides\" terġa' lura kull override manwali għat-templejt. Iż-żona tal-aġġustament tal-linja ta' żmien taħt timmaniġġja offset globali (minn cue partikolari) u skala proporzjonali.",
     "Ladarba jidher tajjeb, mur fuq \"4 Export\": niżżel il-fajl tas-sottotitoli jew ikkopja l-kontenut tiegħu."
    ],
    "img": {
     "file": "merge-preview",
     "alt": "It-tabella tal-previżjoni tat-tgħaqqid u l-bar tal-filtri tagħha",
     "cap": "Il-previżjoni hija l-esportazzjoni; iffiltra ringieli suspettużi skont it-tip jew espandi slott ta' stil wieħed"
    }
   },
   {
    "h2": "X'jitħalla mhux mimsus",
    "ps": [
     "It-tibdil fl-istil jaffettwa d-dehra biss, qatt id-djalogu. It-test tal-oriġinal u tat-traduzzjoni ma jinbidilx b'karattru wieħed waqt it-tgħaqqid; sakemm ma tbiddilx deliberatament fiż-żona tal-aġġustament taħt il-previżjoni, il-linja ta' żmien tiġi mill-fajl li għażilt.",
     "Meta tesporta SRT jew \"VTT without styling\", l-ebda informazzjoni ta' stil ma tinkiteb fil-fajl — il-paġna tgħidlek li l-VTT m'għandux blokk STYLE u l-plejer juża d-dehra awtomatika tiegħu. Jekk trid l-istil, agħżel l-istil VTT bilingwi jew ASS."
    ]
   },
   {
    "h2": "Mistoqsijiet komuni",
    "ps": [
     "**X'jiġri jekk iż-żewġ fajls għandhom għadd differenti ta' entrati?** Uża \"Pair by timeline\" u l-għodda tqabbel skont il-viċinanza; entrati li ma tistax tqabbel ma jinħolqux minn xejn.",
     "**X'jiġri jekk plejer jinjora l-istil f'ASS esportat?** L-istili huma maħżunin ġewwa l-fajl, iżda l-appoġġ tal-plejers għall-ASS ivarja. Jekk għandek bżonn dehra li tinġarr aktar faċilment, esporta stil VTT bilingwi.",
     "**Kif nerġa' lura għat-templejt inizjali wara li ħassart kollox?** \"Restore default parameters\" fil-blokk ASS u \"Restore template defaults\" fil-blokk VTT kull wieħed jirrisettja t-taqsima tiegħu stess.",
     "**X'inhuma s-seba' ringieli fil-kampjun?** Huma eżempju mibni fil-fajl, hemm biss sabiex tkun tista' tara kif jidher tgħaqqid; il-kampjun ma jistax jiġi esportat. Tella' s-sottotitoli tiegħek stess u kklikkja l-previżjoni tat-tgħaqqid u dawn jinbidlu awtomatikament."
    ]
   },
   {
    "h2": "Privatezza",
    "ps": [
     "Is-sottotitoli huma pproċessati kompletament fil-browser: xejn ma jittella' u xejn ma jgħaddi minn server. Agħlaq il-browser u dak kollu minn dik is-sessjoni jisparixxi."
    ]
   },
   {
    "h2": "Għodod u gwidi relatati",
    "ps": [
     "Biex tifred fajl bilingwi lura f'żewġ tracks uża [[Bilingual split|/bilingual.html]]; biex tmur in-naħa l-oħra u tbiddel lingwa waħda f'fajl bilingwi ara [[Two ways to make bilingual subtitles|/guides/make-bilingual-subtitles.html]]; mexxi r-riżultat permezz ta' [[Subtitle QC|/qc.html]]; għal staġun sħiħ f'daqqa uża [[Batch conversion|/batch.html]]."
    ]
   }
  ]
 },
 "qc": {
  "seo": {
   "title": "Kif tuża Subtitle QC – Kontroll tal-Linja ta' Żmien u t-Tqassim – AI-SRTSub",
   "desc": "Sottotitolu QC: ir-regoli 17 jaqbdu superpożizzjonijiet, wisa' tal-linja, veloċità tal-qari u punteġġjatura, limiti għal kull 27 lingwi. Nofs huma soluzzjonijiet b'klik waħda; niżżel ir-rapport.",
   "h1": "Kif tuża Subtitle QC",
   "intro": "Qabel ma tgħaddi s-sottotitoli lil xi ħadd, għaddihom mill-paġna QC għall-ħin u t-tqassim: x'jiġi kkontrollat, kif taqra r-rapport, u liema problemi jistgħu jiġu ffissati b'klik waħda — kollox kopert hawnhekk.",
   "ctaText": "Iftaħ Subtitle QC"
  },
  "body": [
   {
    "h2": "Għal xiex serv Din l-Għodda",
    "ps": [
     "Sottotitoli li jidhru tajbin għall-għajn spiss jirriżultaw li għandhom linji ta' żmien superposti, linji wiesa' żżejjed, jew veloċità tal-qari għolja wisq ladarba jitwasslu. Il-paġna QC telenka dawn il-kwistjonijiet waħda waħda:"
    ]
   },
   {
    "h2": "Agħżel ir-Regoli tal-Lingwa l-Ewwel",
    "ps": [
     "Taħt “Check by which language’s rules” tistabbilixxi ħames limiti: **wisa' massima ta' linja waħda** (42 unitajiet f'nofs wisa' għall-pajsaġġ awtomatikament, 36 għall-kwadru, 28 għall-portret), **limitu tal-veloċità tal-qari** (18 unitajiet ta' wisa' kull sekonda għaċ-Ċiniż, il-Ġappuniż u l-Korejan, 20 għal lingwi oħra), **tul minimu ta' 833 millisekondi**, **tul massimu ta' 7000 millisekondi**, u **l-iktar 2 linji**. Issettja l-lingwa tas-sottotitoli biex tiskopri awtomatikament jew agħżel waħda mill-27 manwalment; l-orjentazzjoni tal-iskrin tbiddel biss il-livell tal-wisa' tal-linja — il-veloċità tal-qari, it-tulijiet u l-għadd tal-linji jibqgħu kif inhuma. L-unitajiet ta' nofs wisa' huma l-kejl maqsum: karattru Ċiniż jgħodd bħala 2, ittra Latina bħala 1 — wisa' ta' linja ta' 42 hija ugwali għal 21 karattru Ċiniż jew 42 ittra."
    ],
    "img": {
     "file": "qc-rules",
     "alt": "Settings QC: ħames kaxxi tal-input tal-limiti flimkien ma' dropdowns tal-lingwa tas-sottotitoli u l-orjentazzjoni tal-iskrin",
     "cap": "Ħames limiti + lingwa + orjentazzjoni; in-nuqqasijiet jaqblu mal-prattika komuni tal-industrija"
    }
   },
   {
    "h2": "Kif taqra r-Rapport",
    "ps": [
     "Ir-rapport tar-regoli 17 jirrapporta sejbiet fi tliet livelli: **żbalji** (test imħarbat, format tat-timestamp, tmiem qabel il-bidu, numerazzjoni miksura), **twissijiet** (entrati vojta, superpożizzjonijiet, tulijiet qosra jew twal wisq, veloċità tal-qari fuq il-limitu, linji wesgħin wisq, aktar minn żewġ linji), u **ħjiel** (pożizzjoni tal-waqfien tal-linja, spazji fuq quddiem jew fuq wara, spazji neqsin, normi tal-punteġġjatura, u aktar). Kull sejba ġġorr in-numru tal-entrata u dettall \"imkejjel X, limitu Y\", u l-lista tista' tiġi ffilitrata skont il-livell. L-entrati bilingwi jieħdu eżenzjonijiet: iż-żewġ forom huma skoperti awtomatikament, il-kontrolli tas-superpożizzjoni jeżentaw il-pari kollha, u l-veloċità tal-qari tgħodd biss il-linja miktuba fil-lingwa fil-mira."
    ],
    "img": {
     "file": "qc-report",
     "alt": "Żona tar-rapport QC: sejbiet miġbura fi żball, twissija u ħjiel, kull waħda bin-numru tal-entrata u l-valur imkejjel",
     "cap": "Rapport bi tliet livelli: kull sejba ġġorr in-numru tal-entrata tagħha u l-valuri mkejla/limiti"
    }
   },
   {
    "h2": "L-iffissar u l-Esportazzjoni",
    "ps": [
     "Il-kard “Fix & export” telenka biss oġġetti **li jistgħu jiġu ffissati awtomatikament**: tkebbib mill-ġdid, tneħħija ta' entrati vojta, żieda ta' spazji neqsin, sostituzzjoni tal-punteġġjatura skont in-normi tal-lingwa, in-numerazzjoni mill-ġdid — kull ħika li tħalli l-ħin mhux mimsus hija mmarkata awtomatikament; **oġġetti li bidlu l-ħin** (bdil tal-bidu u t-tmiem, ċaqliq tas-superpożizzjonijiet, tirqim jew tiġbid tat-tulijiet) mhumiex immarkati awtomatikament — immarkahom wara li tiċċekkja l-impatt int stè. Ikklikkja “Apply fixes” u kontroll frisk jaħdem awtomatikament; il-kontur jgħodd biss dak li ġie ffissat ġenwinament — linji li ma setgħux jiġu mkebba mill-ġdid ma jintefħux fin-numri. **Il-veloċità tal-qari fuq il-limitu m'għandhiex iffissar awtomatiku**: il-magna ma tistax tkun taf liema kelma trid tinqata', għalhekk it-traduzzjoni trid titqassar bl-idejn jew il-ħin jiġi aġġustat. Wara l-iffissar, esporta SRT jew VTT, jew ikklikkja “Download report” biex issalva rapport testwali sempliċi `.qc.txt`."
    ],
    "img": {
     "file": "qc-fix",
     "alt": "Il-kard tal-iffissar: checkboxes għal oġġetti li jistgħu jiġu ffissati awtomatikament u l-buttuna Apply fixes",
     "cap": "Oġġetti li jistgħu jiġu ffissati awtomatikament biss jagħmlu l-lista; l-iffissar li bidlu l-ħin mhumiex immarkati awtomatikament"
    }
   },
   {
    "h2": "Mistoqsijiet Frekwenti",
    "ps": [
     "**Għaliex l-ASS tiegħi ma jistax jiġi esportat?** QC jesporta biss SRT u VTT; ASS jidħol iżda ma joħroġx. Biex iżżomm l-effetti tal-ASS, aħsibha f'[[Format Converter|/convert.html]] l-ewwel.",
     "**Xi jfisser veloċità tal-qari ta' 18?** Għaċ-Ċiniż, il-Ġappuniż u l-Korejan il-limitu huwa 9 karattru sħiħ kull sekonda (18 unitajiet f'nofs wisa'); lingwi oħra jieħdu 20 unitajiet f'nofs wisa' kull sekonda. Dawn huma l-livelli komuni ta' kumdità, u l-kaxxa tal-input tħallik tibdelhom.",
     "**L-inkodrar tal-fajl tiegħi huwa miksur — jista' xorta jiġi kkontrollat?** QC jaqra UTF-8 biss; iffissa l-inkodrar fuq il-paġna tat-tiswija tat-test imħarbat l-ewwel.",
     "**Se tmiss il-linja ta' żmien tiegħi?** Mhux sakemm tħalli l-grupp “changes timing” mhux immarkat; anke meta jkun immarkat, kull bidla tiġi spjegata qabel ma jiġi applikat l-iffissar."
    ]
   },
   {
    "h2": "Gwidi Relatati",
    "ps": [
     "Sottotitoli li jteptpu malajr wisq biex jinqraw — ara l-gwida ddedikata [[Subtitles Too Fast to Read|/guides/subtitle-too-fast.html]]. X'għandek tiċċekkja qabel il-konsenja — il-lista ta' kontroll tinsab f'[[What to Check Before Delivery|/guides/subtitle-quality-check.html]]. Linja ta' żmien li titbiegħed mis-sinkronizzazzjoni hija tip differenti ta' problema — ara [[Subtitles Drifting Out of Sync|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "remove-subtitle-ads": {
  "seo": {
   "title": "Neħħi r-Reaklami u l-Watermarks mis-Sottotitoli – AI-SRTSub",
   "desc": "Neħħi l-watermarks u r-reklami mis-sottotitoli: URLs, krediti ta' fansubs u tags ta' encoded by jitneħħew b'klik waħda, flimkien ma' entrati doppji u vojta. – AI-SRTSub",
   "h1": "Neħħi r-Reklami u l-Watermarks mis-Sottotitoli",
   "intro": "URLs, krediti u entrati ta' promozzjoni moħbija fis-sottotitoli tiegħek jitneħħew f'pass wieħed mir-regoli tal-watermark tal-apparat tat-tindif — u kwalunkwe tħassir bi żball jista' jiġi kkoreġut entrata b'entrata.",
   "ctaText": "Naddaf il-watermarks tas-sottotitoli"
  },
  "body": [
   {
    "h2": "X'inhuma dawn il-watermarks",
    "ps": [
     "Sottotitoli niżżlin online spiss ikollhom entrati żejda fil-bidu jew fit-tmiem (xi drabi fin-nofs ukoll): URLs, indirizzi tal-email, ismijiet ta' gruppi ta' fansubs, krediti ta' `encoded by` / `translated by`, ismijiet ta' siti bħal opensubtitles, u linji bħal “follow our WeChat account” jew “for study purposes only”. Dawn huma entrati normali ta' sottotitoli — b'linja ta' żmien, li jieħdu linja — għalhekk il-plejers ma jistgħux ineħħuhom; iridu jiġu skoperti mill-kontenut."
    ]
   },
   {
    "h2": "Fejn għandek tagħmel dan",
    "ps": [
     "Iftaħ [[Subtitle Cleaner|/clean.html]] u itfa' s-sottotitolu tiegħek; il-grupp “Watermarks & junk entries” diġà għandu “Remove watermarks and ads”, “Remove duplicate entries” u “Remove empty entries” immarkati awtomatikament, u t-tindif jibda awtomatikament. Id-detezzjoni taħdem fuq żewġ livelli: **sinjali iebsa** bħal URLs, emails, gruppi ta' fansubs u ismijiet ta' siti jħassru l-entrata sħiħa fuq hit fi kwalunkwe tul; **sinjali rotob** bħal @handles, krediti “encoded” jew “proofread” huma ġġudikati biss f'entrati qosra ta' mhux aktar minn 40 karattru, biex jiġi evitat li jinqatgħu djalogi twal. L-entrati bilingwi l-ewwel jitneħħew linja b'linja filwaqt li l-linji tad-djalogu jinżammu; l-entrata titħassar kollha biss jekk jibqgħu traċċi tal-watermark wara t-tneħħija."
    ],
    "img": {
     "file": "clean-opts",
     "alt": "Skrin tal-għażliet tat-tindif: it-tliet checkboxes tal-grupp watermarks and junk entries",
     "cap": "Il-grupp “Watermarks & junk entries” huwa mixgħul awtomatikament — l-ebda setup manwali meħtieġ"
    }
   },
   {
    "h2": "Irrevedi u esporta",
    "ps": [
     "Fil-lista tal-bidliet, kull entrata mħassra iġġorr tikketta “watermark & ad” — skimmja sabiex tikkonferma li xejn ma tneħħa bi żball; jekk xi ħaġa tidher ħażina, ikklikkja “Restore” biex terġa' tpoġġih. Ladarba kkonfermat, niżżel: l-isem tal-fajl jieħu markatur `.clean` awtomatikament. It-tindif jaħdem lokalment fil-browser tiegħek; is-sottotitoli tiegħek qatt ma jintbagħtu imkien."
    ]
   }
  ]
 },
 "repair": {
  "seo": {
   "title": "Kif Tissewwa Sottotitoli Mojibake – Skopri l-Inkodrar – AI-SRTSub",
   "desc": "Spjegazzjoni pass pass: skopri l-inkodrar oriġinali (GBK / Big5 / Shift_JIS / EUC-KR), ikklassifika t-tiswijiet skont dak li jinqara l-aktar bħala lingwa, imbagħad isseva UTF-8 b'BOM jew GBK. Il-ħinijiet u n-numri tal-indici qatt ma jinbidlu.",
   "h1": "Kif tissewwa sottotitoli mojibake",
   "intro": "Fajl ta' sottotitoli mimli b'karattri ta' skart rari jkun korrott — kien biss inqara bl-inkodrar ħażin. L-għodda tat-tiswija tiskopri l-inkodrar oriġinali u terġa' tpoġġi l-karattri t-tajba, u tħalli n-numri tal-indici u l-ħinijiet fil-paċi.",
   "ctaText": "Iftaħ l-għodda tat-tiswija mojibake"
  },
  "body": [
   {
    "h2": "X'tagħmel din l-għodda",
    "ps": [
     "L-istess bytes jinqraw bħala UTF-8 u jinqraw bħala GBK jipproduċu żewġ settijiet ta' karattri kompletament differenti — il-fajl mhuwiex imħassar, kien dekowdjat bl-inkodrar ħażin. Hawn X'tagħmel l-għodda tat-tiswija:"
    ]
   },
   {
    "h2": "Tella' l-fajl, twaħħalx it-test",
    "ps": [
     "Iż-żewġ punti ta' dħul jistgħu jsewwu ammonti differenti ta' ħsara, għalhekk **tella' l-fajl jekk tista'**. B'fajl, il-bytes oriġinali għadhom hemm: l-għodda tipprova inkodrar wara l-ieħor, u ladarba tagħraf lil GBK tiddekowdja bħala GBK — xejn ma jrid jiġi f'moħħu. Test li jasal permezz tal-pejst m'għadux bytes puri. Sal-ħin li l-browser jagħti l-istring, l-iżball ikun diġà seħħ, għalhekk l-għodda tista' taħdem biss lura u tieħu dak li tista' tikseb.",
     "Jekk it-test imwaħħal diġà fih il-karattru ta' sostituzzjoni (dak il-markatur kwadru b'mistoqsija `�`), il-bytes oriġinali ilhom li marru u xejn ma jista' jerġa' jġibhom lura. Il-paġna tgħid hekk ċar: erġa' tlugħ u uża \"Choose file\" biex ttella' l-oriġinal."
    ],
    "img": {
     "file": "repair-up",
     "alt": "Żona tat-tlugħ tal-paġna tat-tiswija: drop zone u kaxxa tal-pejst, bl-inkodrar skopert muri fuq",
     "cap": "Tkaxkar il-fajl ġewwa jew fittex għalih; il-kaxxa tal-pejst tinsab hawn taħt u tista' tissewwa ħafna inqas"
    }
   },
   {
    "h2": "X'qed tgħidlek id-dijanjosi",
    "ps": [
     "Ladarba ttella', il-kard tad-dijanjosi tagħti verdett. **L-ebda mojibake misjub**: il-kontenut jinqara tajjeb kif inhu; jekk il-plejer tiegħek xorta juri skart, il-plejer uża l-inkodrar ħażin — inżel għal \"Save as\", agħżel wieħed ieħor u agħti dak il-fajl lill-plejer. Meta **jidher qisu mojibake**, il-kard telenka liema traċċa sabet:"
    ],
    "img": {
     "file": "repair-diag",
     "alt": "Kard tad-dijanjosi: verdett flimkien ma' kull traċċa mojibake elenkata linja b'linja",
     "cap": "Id-dijanjosi telenka t-traċċi skont it-tip minflok sempliċement tgħid \"huwa mojibake\""
    }
   },
   {
    "h2": "Kif il-kandidati huma kklassifikati, u kif tagħżel",
    "ps": [
     "Taħt \"Ways to fix this\", il-kandidati huma elenkati fl-ordni **l-aktar bħal lingwa reali l-ewwel**, sa 12 minnhom, kull wieħed ittikkettat bil-par ta' inkodrar li minnu u lejn liema nqara. Ikklikkja wieħed biex tara kif jidher, agħżel, imbagħad iscrolla 'l isfel biex issejvja. M'intix kuntent? Uża \"Keep as is\" biex terġa' lura għall-oriġinal.",
     "L-ordni tiġi minn punteġġ: sehem ta' karattri komuni, string ta' aċċenti, string ta' simboli, ħitan ta' karattri oskuri, kollha mkejla. **Jekk l-ebda punteġġ ma jkun ċarament aħjar, x'ma jiġix rakkomandat** — mhuwiex se jimbotta kandidat nofsu plawSIBbli fuqek sempliċement biex ikollok wieħed. Test li ġie mfellel darbtejn (imsejjah ħażin darba, imbagħad imsewwi ħażin darba) jieħu rawnd żejjed ta' solviment lura fuq il-kandidati ewlenin, sabiex kwalunkwe ħaġa fi żmien żewġ saffi xorta tista' tiġi salvata."
    ],
    "img": {
     "file": "repair-fix",
     "alt": "Lista ta' tiswija tal-kandidati kklassifikata skont kemm jinqara bħala lingwa reali, kull waħda ttikkettata bil-par ta' inkodrar tagħha",
     "cap": "Kandidati kklassifikati skont \"l-aktar bħal lingwa reali\", kull wieħed juri l-inkodrar involut"
    }
   },
   {
    "h2": "Is-sejvjar b'mod korrett huwa l-aħħar pass",
    "ps": [
     "Riżultat imsewwi xorta jrid jiġi salvat b'mod korrett. Meta plejer ma jkunx jista' jiskopri UTF-8, is-sejvjar bħala **UTF-8 with BOM** (plejers tal-Windows jiddependu fuq il-BOM) jew b'GBK ġeneralment isolviha. Tista' tissejvja bħala UTF-8, UTF-8 (bil-BOM), GBK, Big5, Shift_JIS jew EUC-KR; jekk xi ħaġa ma taqbilx, int intqal li tagħżel oħra (GBK ma tistax iżżomm il-Korejan). Fajls imniżżla jieħdu `-fixed` miżjud mal-isem.",
     "Meta l-inkodrar skopert ma jkunx UTF-8, \"Save as\" diġà huwa issettjat minn qabel għal UTF-8 with BOM għalik. Ladarba tmiss id-dropdown int stess, tieqaf tikkercer lilek innifsek."
    ],
    "img": {
     "file": "repair-out",
     "alt": "Żona tar-riżultat: kaxxa tat-test b'dropdown save-as u buttuna tat-tniżżil",
     "cap": "Agħżel inkodrar, imbagħad niżżel — l-isem tal-fajl jieħu -fixed miżjud"
    }
   },
   {
    "h2": "X'qatt ma jintmess",
    "ps": [
     "Il-karattri li nqara ħażin biss huma sostitwiti. Numri tal-indici, ħinijiet u linji tal-istil ASS ma jinbidlu bl-ebda mod."
    ]
   },
   {
    "h2": "Mistoqsijiet Frekwenti",
    "ps": [
     "**Tellajt il-fajl, allura għaliex xorta rrid nerġa' nsejvjah?** Il-fajl innifsu ġeneralment huwa tajjeb; dak li hu mikser huwa l-plejer li qed jaqra lu bl-inkodrar ħażin. F'dak il-każ l-ebda karattru fit-test m'għandu bżonn jinbidel — sempliċement isseva kopja bħala UTF-8 b'BOM jew GBK u agħti dik l-fajl lill-plejer.",
     "**Għaliex it-test imwaħħal ma jistax jissewwa?** Ladarba l-karattru ta' sostituzzjoni jidher f'kontenut imwaħħal, il-bytes oriġinali jkunu marru u m'hemm xejn x'raġuni lura minnu. Erġa' tlugħ u uża \"Choose file\" biex ttella' l-oriġinal.",
     "**Il-kandidat li rrid mhux elenkat?** Xejn ma jiġi rakkomandat sakemm ma jikseb punteġġ ċarament aħjar minn dak li diġà għandek. Ipprova aqleb l-inkodrar skopert għal ieħor u ħallih jerġa' jikklassifika.",
     "**Kemm-il fajl f'daqqa?** Wieħed kull darba. Niżżel it-tiswija, imbagħad itfa' l-fajl li jmiss."
    ]
   },
   {
    "h2": "Privatezza",
    "ps": [
     "Id-detezzjoni u t-tiswija jaħdmu kompletament fil-browser tiegħek. L-ebda kontenut ta' sottotitoli ma jintbagħat qatt lil server."
    ]
   },
   {
    "h2": "Għodod u gwidi relatati",
    "ps": [
     "Minn fejn jiġi l-mojibake u għaliex jispiċċa jidher hekk — ara [[Where subtitle mojibake comes from|/guides/subtitle-garbled-characters.html]]; l-inkodrar huwa tajjeb iżda l-kontenut huwa maħmuġ — uża [[Subtitle cleanup|/clean.html]]; biex tiċċekkja l-ħin u l-veloċità tal-qari — [[Subtitle QC|/qc.html]]."
    ]
   }
  ]
 },
 "sbv-to-srt": {
  "seo": {
   "title": "Konvertitur SBV għal SRT – Biddel is-Sottotitoli ta' YouTube – AI-SRTSub",
   "desc": "Biddel is-sottotitoli SBV imniżżla minn YouTube f'SRT għal CapCut, Premiere, u plejers. Il-valuri tal-ħin jibqgħu mhux mimsusa — it-tqassim biss jinbidel. Jaħdem fil-browser tiegħek.",
   "h1": "SBV għal SRT",
   "intro": "Biddel is-sottotitoli SBV ta' YouTube f'SRT: itfa' il-fajl, agħżel SRT, niżżel. Il-valuri tal-ħin ma jintmessux — l-istruttura biss tinbidel.",
   "ctaText": "Biddel SBV → SRT"
  },
  "body": [
   {
    "h2": "X'inhu l-SBV u minn fejn ġej",
    "ps": [
     "L-SBV huwa **is-sottotitolu ta' YouTube**: it-tniżżil ta' \"fajls ta' sottotitoli\" minn YouTube spiss isib .sbv. L-istruttura tiegħu hija aktar sempliċi mill-SRT — il-ħinijiet tal-bidu u tat-tmiem joqogħdu fuq **linja waħda** separati b'virgoli, it-test isegwi direttament taħt, u m'hemm l-ebda numru ta' cue."
    ]
   },
   {
    "h2": "Għaliex il-plejers jirrifjutawh",
    "ps": [
     "Barra minn YouTube innifsu, il-biċċa l-kbira tas-software tal-editjar u l-plejers ma jappoġġjawx l-SBV. M'għandux il-blokk tan-numerazzjoni u jikteb il-linja tal-ħin tiegħu b'mod differenti mill-SRT, għalhekk it-tibdil tal-isem tal-estensjoni ma jagħmel xejn — l-istruttura trid terġa' tinbena għal kollox."
    ],
    "img": {
     "file": "convert-upload-sbv",
     "alt": "Żona tat-tlugħ: fajl SBV mgħobbi, skopert bħala SBV",
     "cap": "L-SBV jiġi skopert kif inhu, m'hemmx bżonn li tibdel l-estensjoni tal-fajl"
    }
   },
   {
    "h2": "Kif tikkonverti",
    "ps": [
     "Iftaħ il-[[converter|/convert.html]], itfa' l-SBV, agħżel **SRT - SubRip** bħala l-output, imbagħad ikkonverti u niżżel. In-numri tal-cues jiġu assenjati b'mod frisk, u l-waqfiet tal-linji oriġinali ġewwa cue jingħaqdu f'linja waħda (l-SRT jippermetti cues b'ħafna linji; l-SBV huwa esportat f'linja waħda hawnhekk)."
    ]
   }
  ]
 },
 "shift": {
  "seo": {
   "title": "Kif Tiċċaqlaq il-Ħin tas-Sottotitoli (Offset, Skala, Żewġ Ankri) – AI-SRTSub",
   "desc": "Spjegazzjoni illustrata tal-editur tal-ħin: tella' sottotitoli, żid passi ta' aġġustament, korrezzjoni b'żewġ ankri, aġġustamenti għal kull cue u esportazzjoni.",
   "h1": "Editur tal-Ħin: Gwida Pass Pass",
   "intro": "Din il-gwida timxi mill-quddiem sal-aħħar tal-għodda: tella' sottotitoli, żid passi ta' aġġustament, mexxi l-kontrolli, irfina għal kull cue, u esporta.",
   "ctaText": "Iftaħ l-editur tal-ħin"
  },
  "body": [
   {
    "h2": "Tella' s-sottotitoli tiegħek",
    "ps": [
     "Tkaxkar fajl fil-kaxxa bit-tikek jew ikklikkja biex tagħżel wieħed; tista' wkoll **twaħħal il-kontenut** dritt fil-kaxxa tat-test. Il-format jiġi skopert kemm mill-estensjoni kif ukoll mill-kontenut, u r-riżultat jidher fiċ-ċippa tal-format. Inputs appoġġjati: srt, vtt, ass (inkluż ssa), sbv, lrc u txt."
    ],
    "img": {
     "file": "shift-upload",
     "alt": "Żona tat-tlugħ: sottotitolu ta' kampjun mgħobbi, skopert bħala SRT",
     "cap": "L-isem tal-fajl u l-format skopert jidhru taħt iż-żona tat-tlugħ; il-kaxxa tat-test tibqa' tista' tiġi editjata."
    }
   },
   {
    "h2": "Żid passi ta' aġġustament",
    "ps": [
     "L-aġġustamenti jiffurmaw **pipeline ta' passi**: kull pass jagħmel xogħol wieħed u jieħu numru wieħed, bl-unità tiegħu murija ġewwa l-kaxxa. Il-passi japplikaw minn fuq għal isfel, u kwalunkwe bidla f'pass **terġa' tikkalkula kollox mis-sottotitoli oriġinali** — sabiex tkun tista' tmur lura u tirfina numru fi kwalunkwe ħin mingħajr ma tagħmel tixrid."
    ]
   },
   {
    "h2": "Korrezzjoni b'żewġ ankri",
    "ps": [
     "Meta la taf l-offset f'sekondi u lanqas ir-rata, uża żewġ ankri: ladarba miżjuda, **ż-żewġ oqsma \"current\" jimtlew awtomatikament** mill-ewwel u l-aħħar cue tal-fajl tiegħek. Int timla biss l-oqsma \"target\" — il-ħinijiet li dawk il-cues għandhom fil-fatt jidhru fihom. Kollox bejniethom jerġa' jiġi mifrux b'mod proporzjonali."
    ],
    "img": {
     "file": "shift-step-two",
     "alt": "Korrezzjoni b'żewġ ankri: ħinijiet kurrenti mimlijin awtomatikament, ħinijiet fil-mira biex jiddaħħlu",
     "cap": "L-oqsma kurrenti jiġu mill-fajl tiegħek; l-oqsma fil-mira huma l-ħinijiet korretti li tara fil-vidjow."
    }
   },
   {
    "h2": "Kontroll tal-linja ta' żmien u aġġustamenti għal kull cue",
    "ps": [
     "Wara li tmexxi l-passi, aqra l-**timeline check** (kontroll tal-linja ta' żmien): cues li huma qosra wisq, twal wisq, densi wisq biex jinqraw, linji li huma wiesa' wisq, jew cues superposti kollha jiġu elenkati. Il-kontroll **jidentifika biss il-problemi u qatt ma jbiddel xejn** waħdu. L-erba' linji gwida awtomatiċi huma tul minimu ta' 0.833 s, massimu ta' 7 s, veloċità tal-qari ta' 9 karattri kull sekonda u 21 karattri kull linja — kollha jistgħu jiġu editjati fuq il-paġna. Taħt dan, aġġustamenti għal kull cue jħalluk tgħaqqad żewġ cues fil-qrib, tifred wieħed, jew teditja l-bidu u t-tmiem tiegħu direttament; kull editjar jista' jiġi kkoreġut."
    ]
   },
   {
    "h2": "Esporta ir-riżultat",
    "ps": [
     "Il-pannell tar-riżultat juri l-ħinijiet oriġinali u aġġustati **ġenb ma' ġenb** għal kontroll rapidu faċli. Il-format tal-output default għall-format tal-input, iżda tista' taqleb għal kwalunkwe wieħed minn srt, vtt, ass, sbv, lrc jew txt qabel tniżżel."
    ],
    "img": {
     "file": "shift-result",
     "alt": "Pannell tar-riżultat: ħinijiet ta' qabel u wara ġenb ma' ġenb, b'buttuni tat-tniżżil u tal-kopja",
     "cap": "Ħinijiet oriġinali fuq ix-xellug, aġġustati fuq il-lemin; niżżel ladarba l-kontroll rapidu jidher tajjeb."
    }
   }
  ]
 },
 "shift-subtitle-timing": {
  "seo": {
   "title": "Kif Tiċċaqlaq is-Sottotitoli Kollha Aktar Kmieni jew Aktar Tard – AI-SRTSub",
   "desc": "Kull cue huwa tard bl-istess ammont: uża l-pass tas-shift tal-editur tal-ħin — daħħal numru negattiv jew pożittiv wieħed u s-sottotitoli kollha jiċċaqalqu flimkien.",
   "h1": "Mexxi l-Fajl tas-Sottotitoli Kollha Aktar Kmieni jew Aktar Tard",
   "intro": "L-awdjo jibda, is-sottotitolu jidher tard — u kull cue uniku huwa tard bl-istess ammont. Dan huwa offset uniformi: numru wieħed jirranġah.",
   "ctaText": "Iftaħ l-editur tal-ħin"
  },
  "body": [
   {
    "h2": "L-ewwel ikkonferma li kull cue huwa tard bl-istess ammont",
    "ps": [
     "Agħmel kontroll rapidu fuq cue wieħed qrib il-bidu, wieħed fin-nofs u wieħed fit-tmiem. Jekk it-tlieta huma tard bl-bejn wieħed u ieħor l-istess ammont, dak huwa **offset uniformi**, u pass ta' shift wieħed jirranġah. Jekk il-bidu huwa korrett u d-dewmien jikber lejn it-tmiem, dik hija problema differenti — ara [[subtitles getting more and more out of sync|/guides/subtitles-out-of-sync.html]]."
    ]
   },
   {
    "h2": "X'għandek daħħal: negattiv biex tressaq eqreb, pożittiv biex ittardja",
    "ps": [
     "Fl-editur tal-ħin, żid pass **Shift all** u daħħal l-offset fil-kaxxa tal-valur: sottotitoli li jimxu tard jieħdu numru negattiv biex imexxuhom aktar kmieni; li jimxu kmieni jieħdu numru pożittiv biex jimbuttawhom aktar tard. Jekk is-sottotitoli huma 1.5 sekondi tard, daħħal **-1.5** — l-unità hija sekondi."
    ],
    "img": {
     "file": "shift-step-shift",
     "alt": "Pass Shift all b'valur ta' -1.5 sekondi mdaħħal",
     "cap": "Numru negattiv iressaq il-fajl kollu aktar kmieni; l-unità hija miktuba ġewwa l-kaxxa, f'sekondi."
    }
   },
   {
    "h2": "Mexxih u iċċekkja l-ewwel cue",
    "ps": [
     "Wara li tapplika, il-pannell tar-riżultat telenka l-ħinijiet oriġinali u ġodda ta' kull cue **ġenb ma' ġenb**. Iċċekkja l-ewwel cue l-ewwel: il-ħin il-ġdid tal-bidu jinżel fuq il-qafas fejn tinstema' l-linja? Imbagħad agħmel kontroll rapidu fuq wieħed fin-nofs. Kull cue jiċċaqlaq bl-istess ammont u jżomm it-tul tiegħu stess."
    ]
   },
   {
    "h2": "Esporta",
    "ps": [
     "Ladarba l-kontroll rapidu jidher tajjeb, niżżel direttament. Il-format tal-output default għall-format tal-input u jista' jinbidel għal xi ħaġa oħra. Il-bidla tmiss il-ħinijiet biss — mhux karattru wieħed tat-test."
    ]
   }
  ]
 },
 "simplified-traditional-chinese": {
  "seo": {
   "title": "Mhux Sostituzzjoni ta' Karattri – One-to-Many u Kliem Reġjonali – AI-SRTSub",
   "desc": "Tliet affarijiet jagħmlu dan diffiċli: mappings minn wieħed għal ħafna solvuti bil-kelma, vokalabularju differenti f'Taiwans u Ħong Kong, u l-konverżjoni tad-djalogu biss. Agħmel it-tlieta tajbin u l-ebda xogħol mill-ġdid minn bniedem ma jsegwi.",
   "h1": "Simplifikat vs tradizzjonali mhijiex sostituzzjoni ta' karattri",
   "intro": "Liema karattru tradizzjonali jissostitwixxi wieħed simplifikat jiddependi fuq il-karattru ta' maġenbu. Huwa għalhekk li din il-konverżjoni ma tistax issir billi tissostitwixxi bl-addoċċ karattru wieħed kull darba.",
   "ctaText": "Iftaħ il-konvertitur"
  },
  "body": [
   {
    "h2": "L-ewwel: forma simplifikata waħda, diversi tradizzjonali",
    "ps": [
     "Is-simplifikazzjoni kkawżat li diversi karattri tradizzjonali jinġabru f'forma simplifikata waħda. Meta terġa' lura n-naħa l-oħra, karattru simplifikat wieħed jikkorrispondi għal diversi karattri tradizzjonali, u l-għażla bejniethom tiddependi fuq dak li huwa mqabbad miegħu:",
     "Is-sostituzzjoni ta' karattru b'karattru tiġborhom kollha fl-istess wieħed u ġġib kull każ ħażin. Is-soluzzjoni **bil-kelma** hija dak li jifridhom — it-tabelli jiġu minn OpenCC, li jqabblu frażijiet qabel karattri singoli. Per eżempju:"
    ]
   },
   {
    "h2": "It-tieni: it-Tajwan u Ħong Kong mhumiex l-istess ħaġa",
    "ps": [
     "Hemm saff ieħor wara l-konverżjoni għal tradizzjonali: l-istess kelma tinteket b'mod differenti fit-Tajwan u f'Ħong Kong. Il-kelma għal \"software\" hija ħaġa waħda fit-Tajwan u oħra f'Ħong Kong, u t-Tajwan juża l-kelma tiegħu stess għal \"informazzjoni\".",
     "Għalhekk id-direzzjonijiet separati. It-tradizzjonali tat-Tajwan saħansitra jinqasam f' \"change wording\" u \"glyphs only\" — glyphs only iżżomm il-vokabularju eżistenti tiegħek, filwaqt li change wording ibiddel it-termini reġjonali wkoll. Ħong Kong jieħu direzzjoni tiegħu stess."
    ],
    "img": {
     "file": "hanconv-dir",
     "alt": "Konvertitur għall-kard: dropdown tad-destinazzjoni li juri \"Simplified → Taiwanese traditional (change wording)\"",
     "cap": "It-Tajwan joffri bidliet fil-kliem jew glyphs biss; Ħong Kong għandu d-direzzjoni tiegħu stess"
    }
   },
   {
    "h2": "It-tielet: id-djalogu biss għandu jintmess",
    "ps": [
     "Fajl ta' sottotitoli mhux djalogu biss. Numri tal-indici, ħinijiet u linji tal-istil ASS huma hemm ġew ukoll, u mhux karattru wieħed minn dawk għandhom jiġu kkonvertiti — speċjalment il-linji tal-istil ASS, peress li jحتwew ismijiet ta' direttivi Ingliżi li jkissru hekk kif jiġu trattati bħala djalogu.",
     "Għalhekk il-konverżjoni sseħħ wara l-analiżi skont il-format: SRT, VTT, ASS u TXT kull wieħed jidentifika liema parti hija djalogu, u l-karattri ġewwa fih biss jiġu kkonvertiti. Il-ħinijiet u l-istili jibqgħu ħajjin mhux mimsusa, mingħajr ebda format b'xi jerġa' jsir."
    ],
    "img": {
     "file": "hanconv-out",
     "alt": "Żona tar-riżultat: sottotitolu kkonvertit u bar tal-istat li juri l-għadd tal-linji mibdula",
     "cap": "Il-bar tal-istat juri kemm-il linja nbidlet; il-format huwa ppreżervat kif inhu"
    }
   },
   {
    "h2": "Meta terġa' lura għal simplifikat: oqgħod attent",
    "ps": [
     "Il-konverżjoni ta' tradizzjonali għal simplifikat teħtieġ ukoll li tgħid **liema varjetà tradizzjonali int ġej minnha**: ġenerika, Tajwaniża u ta' Ħong Kong huma tliet rotot differenti, minħabba li l-vokabularju reġjonali jrid jiġi rrestawrat għall-kelma ġenerika qabel ma jkun jista' jiġi kkonvertit. Agħżel id-direzzjoni l-ħażina u l-vokabularju reġjonali jgħix fl-output simplifikat.",
     "Il-grupp t'isfel tad-disa' direzzjonijiet huwa dak li jikkonverti lura: traditional → simplified, Taiwanese → simplified, Hong Kong → simplified."
    ]
   },
   {
    "h2": "Għodod u gwidi relatati",
    "ps": [
     "L-ispjegazzjoni sħiħa — [[How to convert simplified and traditional subtitles|/guides/hanconv.html]]; jekk kulma għandek bżonn huwa simplifikat għal tradizzjonali — [[Convert simplified subtitles to traditional|/guides/srt-simplified-to-traditional.html]]; biex tittraduċi f'lingwa oħra, [[Subtitle translation|/translate.html]]."
    ]
   }
  ]
 },
 "split": {
  "seo": {
   "title": "Qsim u jingħaqad tas-sottotitoli – Aqta' skont il-blokk, għaqqad fl-ordni – AI-SRTSub",
   "desc": "Aqta' fajl wieħed f'segmenti skont it-tul jew l-għadd ta' cues, erġa' ibda kull wieħed minn żero, jew għaqqad diversi fajls fl-ordni jew interallahom skont il-linja taż-żmien. In-numri tas-sottotitoli mneżżgħin u mqassmin mill-ġdid, it-test ma jintmessx.",
   "h1": "Kif taqsam u tgħaqqad is-sottotitoli",
   "intro": "Aqta' fajl wieħed twil ta' sottotitoli f'segmenti, jew għaqqad diversi fajls imxerrda f'wieħed. Il-qtugħ dejjem jaħbat mal-konfini ta' entrata — sentenza qatt ma tinqata' fin-nofs.",
   "ctaText": "Iftaħ it-taqsima biex taqsam u tgħaqqad"
  },
  "body": [
   {
    "h2": "X'jagħmel dan l-għodda",
    "ps": [
     "It-tqassim tal-episodji, it-tqassim tas-segmenti u l-kombinazzjoni tas-sorsi kollha jwasslu għall-istess diskrepanza bejn il-blokok tas-sottotitoli u l-blokok tal-vidjow: jew fajl wieħed irid jinqata' jew diversi jridu jiġu kkombinati. Din il-paġna tieħu ħsieb it-tnejn, b'tab waħda għal kull waħda."
    ]
   },
   {
    "h2": "L-ewwel agħżel aqta' jew agħaqqad",
    "ps": [
     "Żewġ tabs fil-quċċata: **Aqsam: fajl wieħed f'segmenti** u **Għaqqad: diversi fajls f'wieħed**. L-għażliet tat-tieni pass hawn taħt jinbidlu skont l-għażla tiegħek.",
     "F'\"1 Żid is-sottotitoli\" int tella' fajl jew tippejstja test; jekk għażilt il-ħażin, ikklikkja \"Ikklerja\". Din il-paġna taqra UTF-8 biss — jekk l-inkodjar ikun imkisser (ħajt ta' marki ta' mistoqsija jew kaxxi) mur għal [[Tiswija ta' test imħarbat|/repair.html]] l-ewwel."
    ],
    "img": {
     "file": "split-mode",
     "alt": "Iż-żewġ tabs fil-quċċata tal-paġna tal-qsim u l-għaqda",
     "cap": "Aqta' u agħaqqad huma żewġ tabs; l-għażliet tat-tieni pass isegwu l-għażla tiegħek"
    }
   },
   {
    "h2": "Kif taqta'",
    "ps": [
     "Taħt \"2 Kif taqta'\" agħżel il-bażi: **tul** (segment wieħed kull X minuti) jew **għadd ta' cues** (segment wieħed kull X cues), imbagħad daħħal numru.",
     "Immarka \"Erġa' ibda kull segment f'0:00\" u kull segment li jirriżulta jgħodd minn żero — uża dan meta ttella' episodji u tagħti lil kull segment plejer għalih waħdu. Ħallih mhux immarkat biex iżżomm it-timestamps oriġinali, sabiex kull segment jibqa' jaqbel mal-pożizzjoni tiegħu fil-vidjow sors.",
     "Il-qtugħ jaħbat biss mal-konfini tas-sottotitoli: meta sottotitolu twil ħafna jifrex mal-punt tal-qtugħ, is-sottotitolu kollu jibqa' fis-segment ta' qabel."
    ],
    "img": {
     "file": "split-cut",
     "alt": "L-għażliet tat-tul u tal-għadd ta' cues bl-iswiċċ biex terġa' tibda f'żero fuq il-paġna tal-qsim",
     "cap": "Aqta' skont it-tul jew l-għadd ta' cues, u b'għażla erġa' ibda kull segment f'0:00"
    }
   },
   {
    "h2": "Kif tgħaqqad",
    "ps": [
     "Taħt \"2 Kif tgħaqqad\" agħżel il-metodu: **Għaqqad fl-ordni** iċċaqlaq il-fajl ta' wara sabiex jibda wara li jispiċċa dak ta' qabel, mingħajr ebda sovrapożizzjoni bejn is-segmenti; **Interalla skont il-linja taż-żmien** iżżomm it-timestamps oriġinali ta' kull fajl u tordna skont il-ħin tal-bidu.",
     "Uża l-għaqda fl-ordni meta l-fajls ikunu l-ewwel u t-tieni nofs ta' episodju wieħed, jew meta nofsijiet iċċekkjati separatament iridu jerġgħu jitqiegħdu flimkien; uża l-interallament skont il-linja taż-żmien meta l-fajls jappartjenu fuq l-iskrin flimkien, bħal track oriġinali u track tradotta.",
     "Wara l-għaqda, in-numri tas-sottotitoli jiġu nnumerati mill-ġdid awtomatikament u ebda kelma tad-djalogu ma tinbidel."
    ],
    "img": {
     "file": "split-join",
     "alt": "L-għażliet tal-għaqda fl-ordni u l-interallament skont il-linja taż-żmien fuq il-paġna tal-għaqda",
     "cap": "L-għaqda fl-ordni taqbel ma' żewġ nofsijiet ta' episodju wieħed; l-interallament skont il-linja taż-żmien taqbel ma' track oriġinali u waħda tradotta"
    }
   },
   {
    "h2": "Kif tieħu r-riżultat miegħek",
    "ps": [
     "\"3 Riżultat\" fuq il-lemin jesporta **SRT** u **VTT**; ikklikkja \"Niżżel\" jew \"Ikkopja\".",
     "Meta taqsam tista' tuża \"Niżżel kull segment\", li jsalva kull segment maqtugħ f'daqqa minflok klikk waħda għal kull segment."
    ],
    "img": {
     "file": "split-out",
     "alt": "L-għażla tal-format SRT/VTT b'buttuni tat-tniżżil u tat-tniżżil ta' kull segment fiż-żona tar-riżultat",
     "cap": "Ir-riżultati tal-qsim jistgħu jitniżżlu segment b'segment; fajl magħqud jitniżżel jew jiġi kkupjat direttament"
    }
   },
   {
    "h2": "Dak li jitħalla mhux mimsus",
    "ps": [
     "Ebda karattru ta' djalogu ma jinbidel. Din il-paġna tbiddel biss liema cues jappartjenu għal liema segment u kif huma nnumerati; il-kontenut tal-entrati jibqa' kif inhu.",
     "B'\"Għaqqad fl-ordni\" it-timestamps tal-fajls ta' wara jiġu ċċaqalqa bħala ħaġa sħiħa — dak hu li teħtieġ l-għaqda; b'\"Interalla skont il-linja taż-żmien\" kull timestamp oriġinali jiġi ppreservat."
    ]
   },
   {
    "h2": "Mistoqsijiet komuni",
    "ps": [
     "**X'jiġri jekk l-aħħar segment jispiċċa qasir ħafna?** Dan normali. Il-fdal li ma jimteliex f'segment sħiħ isir segment għalih minflok ma jitgħabba b'affarijiet oħra.",
     "**Se tinqata' sentenza li taqsam il-punt tal-qtugħ?** Le. Il-qtugħ jaħbat mal-konfini tal-entrati biss, u sottotitolu li jaqsam il-linja jibqa' fis-segment ta' qabel.",
     "**Wara l-interallament, kif jiġu ordnati żewġ sottotitoli bl-istess ħin?** Skont il-ħin tal-bidu; meta l-ħinijiet tal-bidu jkunu l-istess, l-ordni li fih żidt il-fajls tinżamm.",
     "**Jista' jinqasam l-ASS?** Din il-paġna tieħu ħsieb l-SRT u l-VTT. Ikkonverti ASS għal SRT jew VTT bi [[Konverżjoni tal-format|/convert.html]] l-ewwel."
    ]
   },
   {
    "h2": "Privatezza",
    "ps": [
     "Is-sottotitoli huma pproċessati kompletament fil-browser: xejn ma jittella' u xejn ma jgħaddi minn server. Agħlaq il-paġna u l-kontenut jisparixxi."
    ]
   },
   {
    "h2": "Għodod u gwidi relatati",
    "ps": [
     "Biex tgħaqqad żewġ fajls f'track bilingwi (minflok f'episodju wieħed) uża [[Għaqda bilingwi u effetti speċjali|/guides/merge.html]]; jekk il-linja taż-żmien kollha tkun barra minn postha mur għal [[Aġġustament tal-linja taż-żmien|/shift.html]]; għal staġun sħiħ uża [[Konverżjoni f'lottijiet|/batch.html]]; u tħaddem [[QC tas-sottotitoli|/qc.html]] meta tlestiex."
    ]
   }
  ]
 },
 "split-bilingual-subtitles": {
  "seo": {
   "title": "Aqsam Sottotitoli Bilingwi f'Żewġ Tracks – AI-SRTSub",
   "desc": "Aqsam sottotitoli bilingwi f'żewġ fajls: it-tracks oriġinali u tat-traduzzjoni jitniżżlu separatament b'ismijiet distinti; iż-żewġ forom huma rikonoxxuti. – AI-SRTSub",
   "h1": "Aqsam Sottotitoli Bilingwi f'Żewġ Tracks",
   "intro": "Sottotitolu bilingwi wieħed isir żewġ fajls — “oriġinali” u “traduzzjoni”: tella', agħżel aqsam f'tnejn, niżżel kull wieħed, bil-linji taż-żmien miżmumin intatti.",
   "ctaText": "Aqsam sottotitoli bilingwi"
  },
  "body": [
   {
    "h2": "Meta jkollok bżonn taqsam",
    "ps": [
     "Il-plejer tiegħek irid track b'lingwa waħda biss; jew trid it-track tat-traduzzjoni għal traduzzjoni mill-ġdid, jew it-track oriġinali biex tgħaqqadha ma' verżjoni tradotta oħra. Sottotitolu bilingwi huwa jew **sottotitolu wieħed b'żewġ linji** (l-oriġinal fuq linja waħda, it-traduzzjoni fuq l-oħra) jew **żewġ sottotitoli separati li jaqsmu l-istess linja taż-żmien** — it-tnejn jistgħu jinqasmu."
    ]
   },
   {
    "h2": "Fejn tagħmel dan",
    "ps": [
     "Iftaħ il-[[Tneħħi tas-Sottotitoli Bilingwi|/bilingual.html]] u niżżel is-sottotitolu tiegħek fih. L-għodda tiskopri l-forma bilingwi awtomatikament: sottotitolu wieħed b'żewġ linji jinqasam skont is-sistema tal-kitba, żewġ sottotitoli fuq l-istess linja taż-żmien skont l-ordni. Agħżel **Aqsam f'tnejn** fid-dropdown tal-modalità u ikklikkja Ibda (jew ħallih jerġa' jaħdem awtomatikament). Iż-żona tar-riżultat turi żewġ biċċiet: dik immarkata b'`.orig` hija t-track oriġinali, dik immarkata b'`.dst` hija t-track tat-traduzzjoni — ikklikkja “Niżżel” għal kull waħda; iż-żewġ tracks jaqsmu eżattament l-istess linja taż-żmien."
    ],
    "img": {
     "file": "bilingual-split",
     "alt": "Riżultat tal-qsim: it-track oriġinali u t-track tat-traduzzjoni bħala żewġ biċċiet, kull waħda b'buttuna tat-tniżżil",
     "cap": "Aqsam f'tnejn: track oriġinali .orig + track tat-traduzzjoni .dst, kull waħda mniżżla waħedha"
    }
   },
   {
    "h2": "Żball komuni wieħed",
    "ps": [
     "**Sottotitolu wieħed b'żewġ linji f'lingwi li jaqsmu l-istess alfabet (ngħidu aħna Ingliż flimkien ma' Franċiż) ma jistax jinqasam.** Meta t-tracks huma separati skont is-sistema tal-kitba, dawk jingħaddu bħala sistema waħda u jiġu ttrattati bħala monolingwi. Ikkonverti kontenut bħ dan għall-forma tal-istess linja taż-żmien B l-ewwel, imbagħad aqsam; il-forma ta' żewġ sottotitoli tingħaqad skont il-linja taż-żmien u ma jimpurtahiex mil-lingwa. Għad-dettalji taż-żewġ forom, ara [[Żewġ modi kif tagħmel sottotitoli bilingwi|/guides/make-bilingual-subtitles.html]]."
    ]
   }
  ]
 },
 "srt-file-format": {
  "seo": {
   "title": "X'inhu Fajl SRT? Kif Tiftaħ u Editjah – AI-SRTSub",
   "desc": "L-anatomija tal-fajls tas-sottotitoli SRT (SubRip): numru, linja tal-ħin, test. Kif tiftaħ wieħed f'editur tat-test, għaliex plejer jirrifjutah, u kif tirranġa test imħarbat u żbalji fil-timestamps.",
   "h1": "Spjegazzjoni tal-Format tal-Fajl SRT",
   "intro": "SRT huwa l-iktar format ta' sottotitoli universali: test sempliċi, struttura faċli, aċċettat kważi kull fejn hu. Din il-gwida tiċċara l-istruttura tiegħu, kif tiftaħha, u kif tirranġa fallimenti komuni.",
   "ctaText": "Iftaħ il-konvertitur tas-sottotitoli"
  },
  "body": [
   {
    "h2": "Kif jidher fajl SRT",
    "ps": [
     "SRT (SubRip) huwa test sempliċi — kwalunkwe editur tat-test jiftaħu. Kull sottotitolu għandu tliet partijiet: **linja tan-numru**, **linja tal-ħin**, u t-**test**, separati b'linji vojta. Il-linja tal-ħin taqra `00:00:01,000 --> 00:00:03,500` — innota l-**virgola** qabel il-millisekondi, mhux punt."
    ],
    "img": {
     "file": "convert-upload",
     "alt": "Żona tat-tlugħ: fajl SRT mgħobbi li juri numri u ħinijiet",
     "cap": "Is-sottotitolu standard bi tliet partijiet tal-SRT: numru, linja tal-ħin, test"
    }
   },
   {
    "h2": "Kif tiftaħha",
    "ps": [
     "Biex taqra l-kontenut: ikklikkja bil-lemin u iftaħ bi kwalunkwe **editur tat-test**. Biex tużah ma' vidjow: semmi mill-ġdid il-fajl biex **jaqbel mal-isem tal-fajl tal-vidjow** (minbarra l-estensjoni), poġġi t-tnejn fl-istess fowlder, u plejers bħal VLC, PotPlayer, jew mpv jgħabbuh awtomatikament; tista' wkoll tkaxkru fuq it-tieqa li qed ittella' l-vidjow."
    ]
   },
   {
    "h2": "Tiswija ta' rifjut u test imħarbat",
    "ps": [
     "**Karattri mħarbta**: il-fajl mhux UTF-8 — erġa' salvah b'UTF-8 fl-editur tiegħek. **Xejn ma jidher**: iċċekkja li l-linja tal-ħin tuża virgola (mhux punt) u li n-numri tas-sottotitoli mhumiex imkissrin (il-biċċa l-kbira tal-plejers jittolleraw l-ispazji vojta, xi oħrajn le. **Il-fajl huwa HTML jew JSON** kien żbaljat; iġibuh mill-ġdid."
    ]
   },
   {
    "h2": "X'jista' u ma jistax iżomm l-SRT",
    "ps": [
     "SRT iġorr biss test u ħin: **ebda stili** (fonti, kuluri), **ebda pożizzjonament** (fejn fuq l-iskrin), **ebda effetti**. Dawk jeħtieġu ASS — ara [[SRT għal ASS|/guides/srt-to-ass.html]]. Għal tqabbil bejn il-format kollha, ara [[tqabbil tal-format tas-sottotitoli|/guides/subtitle-format-comparison.html]]."
    ]
   }
  ]
 },
 "srt-fps-converter": {
  "seo": {
   "title": "Konvertitur tal-FPS tal-SRT – Ibdel ir-Rata tal-Frejms tas-Sottotitoli – AI-SRTSub",
   "desc": "Il-film huwa 24fps, ix-xandir huwa 25fps, u s-sottotitoli jiddevjaw aktar kull minuta: skalja l-linja taż-żmien b'0.96 darba u l-fajl kollu jaqa' fuq ir-rata fil-mira.",
   "h1": "Konverżjoni tar-Rata tal-Frejms tas-Sottotitoli: 24fps għal 25fps",
   "intro": "Ilgħab is-sottotitoli ta' film ta' 24fps fuq sors ta' 25fps u dawn jitilfu aktar minn sekonda kull minuta — sa tmiem il-krediti jkunu minuti wara. Skalar wieħed irranġah.",
   "ctaText": "Iftaħ l-editur tal-ħin"
  },
  "body": [
   {
    "h2": "Għaliex id-diskrepanza fir-rata tal-frejms tagħmel lis-sottotitoli jiddevjaw",
    "ps": [
     "Konverżjoni tar-rata tal-frejms terġa' taqra **l-istess medda ta' ħin taħt żewġ arloġġi differenti**. Film ta' 24fps ta' 100 minuta għandu 6000 s × 24 = **144,000 frejms**; fuq sors ta' 25fps dawk l-144,000 frejms jilagħbu f'5760 sekondi — **96 minuti**. Il-film kollu jispiċċa qasir b'4 minuti, u għalhekk sottotitolu fil-minuta 50 jidher madwar 2 minuti tard, u s-sottotitolu tal-krediti tal-aħħar qatt ma jidher."
    ]
   },
   {
    "h2": "Il-formula u l-fatturi komuni",
    "ps": [
     "Rata fil-mira ÷ rata oriġinali = il-multiplikatur. **24 għal 25: immoltiplika b'0.96** (24÷25); in-naħa l-oħra, 25 għal 24: 1.0417. **25 għal 23.976: immoltiplika b'0.959**; in-naħa l-oħra: 1.0427. Fl-editur tal-ħin żid pass **Skalja skont ir-rata** u poġġi l-fattur fil-kaxxa tal-valur."
    ],
    "img": {
     "file": "shift-step-rate",
     "alt": "Pass ta' skalar skont ir-rata b'0.96 imdaħħal",
     "cap": "0.96 huwa 24÷25; il-ħjiel fuq il-paġna saħansitra jsemmi l-konverżjoni tar-rata tal-frejms b'użu komuni."
    }
   },
   {
    "h2": "Meta ma tafx iż-żewġ rati",
    "ps": [
     "Jekk ma tistgħux issib ir-rata tal-frejms tas-sors, taqtax raden il-fattur — uża **żewġ punti ta' referenza** minflok: ħu l-ħin reali tad-dehra tal-ewwel u tal-aħħar sottotitolu bħala żewġ punti, u kull ħaġa bejniethom tiġi mġebbda lura b'mod proporzjonali. Ara [[sottotitoli li qed joħorġu dejjem aktar mis-sinkronizzazzjoni|/guides/subtitles-out-of-sync.html]]."
    ]
   },
   {
    "h2": "X'għandek tiċċekkja wara",
    "ps": [
     "L-iskalar jiċċaqlaq kull bidu u tmiem; it-tul tas-sottotitoli jiġġebbed bl-istess fattur. Wara li tħaddem, ivverifika ż-żewġ estremi: l-ewwel sottotitolu (l-iżgħar żball oriġinali) u l-aħħar wieħed (l-akbar). Jekk iż-żewġt itruf jaqblu, kull ħaġa bejniethom taqbel ukoll."
    ]
   }
  ]
 },
 "srt-simplified-to-traditional": {
  "seo": {
   "title": "Ikkonverti Sottotitoli Simplifikati għal Tradizzjonali – Tajwan jew Ħong Kong – AI-SRTSub",
   "desc": "Bidel sottotitoli Ċiniżi simplifikati għal tradizzjonali: agħżel Tajwaniż (b'jew mingħajr vabolabularju reġjonali) jew ta' Ħong Kong. Immappjar minn wieħed għal ħafna jiġi solvut bil-kelma. Id-djalogu biss jinbidel; il-ħinijiet jibqgħu f'posthom.",
   "h1": "Ikkonverti sottotitoli simplifikati għal tradizzjonali",
   "intro": "Sottotitolu Ċiniż simplifikat li jmur lejn udjenza Tajwaniża jew ta' Ħong Kong jeħtieġ biss li jiġi kkonvertit — iżda ż-żewġ reġjuni jridu affarijiet differenti, u l-għażla tad-direzzjoni ħażina tagħtik kliem li n-nies lokali ma jużawx.",
   "ctaText": "Ikkonverti dan is-sottotitolu"
  },
  "body": [
   {
    "h2": "Il-bżonn",
    "ps": [
     "Is-sottotitoli tiegħek huma Ċiniż simplifikat u jridu jilħqu l-viżur fit-Tajwan jew f'Ħong Kong. Li tirranġa l-karattri wieħed wieħed mhuwiex realistiku — episodju wieħed għandu mijiet ta' sottotitoli — u ż-żewġ reġjuni ma jridux l-istess test tradizzjonali: il-vabolabularju varja, u d-direzzjoni ħażina tipproduċi kliem li l-ebda lokali ma juża."
    ]
   },
   {
    "h2": "Fejn tagħmel dan",
    "ps": [
     "Iftaħ [[Konverżjoni simplifikata–tradizzjonali|/hanconv.html]], drag is-sottotitolu ġewwa, u agħżel waħda mid-direzzjonijiet simplifikata → tradizzjonali taħt \"Ikkonverti għal\": tradizzjonali ġeneriku, Tajwaniż (biddel il-kliem), Tajwaniż (glyphs biss) jew ta' Ħong Kong. Il-konverżjoni sseħħ instantanjament u ż-żona tar-riżultat turi s-sottotitolu lest, lest biex jitniżżel.",
     "**Għal udjenza Tajwaniża**: agħżel \"Tajwaniż (biddel il-kliem)\" jekk il-vabolabularju reġjonali għandu jinbidel ukoll — \"software\" u \"information\" isiru l-ekwivalenti Tajwaniżi tagħhom — jew \"Tajwaniż (glyphs biss)\" jekk trid li l-forom tal-karattri jinbidlu waqt li żżomm il-kliem oriġinali tiegħek. **Għal udjenza ta' Ħong Kong**: agħżel \"Ħong Kong\", fejn \"software\" jikteb b'forma oħra."
    ],
    "img": {
     "file": "hanconv-dir",
     "alt": "Karta ta' konverżjoni għal: dropdown tad-destinazzjoni li juri \"Simplifikata → Tradizzjonali Tajwaniż (biddel il-kliem)\"",
     "cap": "It-Tajwan u Ħong Kong huma direzzjonijiet separati b'vabolabularju differenti"
    }
   },
   {
    "h2": "Żbalji komuni",
    "ps": [
     "**Tibżax mill-immappjar minn wieħed għal ħafna**: l-istess karattru simplifikat fil-kliem għal \"naddaf\", \"niexef\" u \"zokk tas-siġra\" jimmappa għal karattri tradizzjonali differenti. It-tabelli jsolvu dan permezz tal-frażi, sabiex kollox ma jiġix iċċattjat f'karattru wieħed.",
     "**Id-djalogu biss jiġi kkonvertit**: il-ħinijiet, in-numri tal-indiċi u l-linji tal-istil ASS ma jintmessux, sabiex ir-riżultat ikun lest biex jintuża.",
     "**Xejn ma nbidel? Iċċekkja qabel ma tpanika**: jekk l-istatistika tirrapporta 0 linji mibdula, jew il-fajl m'għandux karattri Ċiniżi jew il-format ġie skopert ħażin — iċċekkja li \"Format skopert\" jaqbel ma' dak li tellajt."
    ]
   },
   {
    "h2": "Relatati",
    "ps": [
     "Spjegazzjoni sħiħa tad-disa' direzzjonijiet kollha — [[Kif tikkonverti sottotitoli simplifikati u tradizzjonali|/guides/hanconv.html]]; għaliex hija aktar minn sempliċement tbiddel il-karattri — [[Simplifikata vs tradizzjonali mhix bidla ta' karattri|/guides/simplified-traditional-chinese.html]]; tradizzjonali lura għal simplifikata tgħix ukoll f'[[Konverżjoni simplifikata–tradizzjonali|/hanconv.html]]."
    ]
   }
  ]
 },
 "srt-to-ass": {
  "seo": {
   "title": "Konvertitur SRT għal ASS – Ikkonverti Sottotitoli Online – AI-SRTSub",
   "desc": "Ikkonverti sottotitoli SRT għal ASS (Advanced SubStation Alpha) b'kanvas ta' 1920×1080 u stil awtomatiku nadif, lest biex jitgħabba direttament f'kwalunkwe plejer. Jaħdem fil-browser tiegħek.",
   "h1": "SRT għal ASS",
   "intro": "Bidel sottotitoli SRT f'ASS: niżżel il-fajl, agħżel ASS, niżżel. Kanvas ta' 1920×1080 u stil awtomatiku nadif jiġu ġenerati għalik.",
   "ctaText": "Ikkonverti SRT → ASS"
  },
  "body": [
   {
    "h2": "Meta teħtieġ ASS",
    "ps": [
     "Uża ASS meta sottotitolu mgħobbi jeħtieġ **kontroll aħjar tal-pożizzjonament u l-istil**: iġorr kunċetti li l-SRT nieqes minnhom — daqs tal-kanvas, stili tal-fonti, allinjament. mpv, PotPlayer, VLC, u l-biċċa l-kbira tal-plejers jappoġġjawha direttament."
    ]
   },
   {
    "h2": "Kif jidher l-output",
    "ps": [
     "L-għodda terġa' tibni header standard: **kanvas ta' 1920×1080**, tkebbib intelliġenti (WrapStyle 0), u stil Uniku Default — Arial 54, test abjad b'kontorn iswed, iċċentrat fil-qiegħ. Kull sottotitolu juża dan l-istil."
    ],
    "img": {
     "file": "convert-opt-ass",
     "alt": "Dropdown tal-format tal-output b'ASS - Advanced SubStation magħżul",
     "cap": "Agħżel ASS bħala l-output u niżżel wara l-konverżjoni"
    }
   },
   {
    "h2": "L-istili huma preservati?",
    "ps": [
     "L-SRT m'għandux kunċett ta' stil mill-bidu. U jekk is-sors tiegħek huwa diġà ASS, il-konverżjoni **terġa' tibni l-istil awtomatiku u ma żżommx dak oriġinali** — uża editur tas-sottotitoli dedikat għall-istiljar mill-ġdid tal-ASS. Il-ħin u t-test ma jiġux affettwati fiż-żewġ każijiet."
    ]
   }
  ]
 },
 "srt-to-excel": {
  "seo": {
   "title": "Ikkonverti Sottotitoli għal Excel – Iċċekkja Ringiela b'Ringiela – AI-SRTSub",
   "desc": "Esporta sottotitoli SRT għal Excel: ringiela waħda għal kull sottotitolu fuq erba' kolonni — indiċi, bidu, tmiem u test. Il-ħin inżamm b'test, il-waqfiet tal-linji intatti, u l-folja editjata tista' tiġi kkonvertita lura għal sottotitoli.",
   "h1": "Ikkonverti sottotitoli għal Excel",
   "intro": "L-iċċekkjar ta' mijiet ta' sottotitoli f'editur tat-test huwa ta' għeja. F'Excel kull sottotitolu huwa ringiela, u għalhekk il-filtrazzjoni, il-kummenti u t-tfittxija u s-sostituzzjoni jsiru disponibbli kollha — u l-editjar jerġa' jidħol fl-SRT tiegħek.",
   "ctaText": "Esporta għal Excel"
  },
  "body": [
   {
    "h2": "Il-bżonn",
    "ps": [
     "L-iċċekkjar, bidliet kbar fil-kliem, jew il-qsim tal-biċċa xogħol bejn diversi persuni — dan kollu jimxi ħafna aktar malajr f'folja milli f'test sempliċi. L-SRT innifsu huwa test sempliċi, iżda l-istruttura tas-sottotitoli tiegħu (indiċi, ħin, djalogu) timmappa pulit fuq erba' kolonni ta' spreadsheet."
    ]
   },
   {
    "h2": "Fejn tagħmel dan",
    "ps": [
     "Iftaħ [[Konverżjoni ta' sottotitoli ⇄ tabella|/table.html]], aqleb għal \"għal tabella\", drag l-SRT ġewwa, u l-preview timtela b'ringiela waħda għal kull sottotitolu fuq erba' kolonni — indiċi, bidu, tmiem, test. Agħfas \"Niżżel Excel (.xlsx)\" u huwa tiegħek. VTT huwa appoġġjat bl-istess mod.",
     "Meta tkun lestejt l-editjar: aqleb il-modalità għal \"għal sottotitolu\", poġġi l-folja lura ġewwa, u ikollok SRT mill-ġdid. Ir-regola hija tliet kolonni għall-bidu, it-tmiem u t-test (Ingliż Start / End / Text jaħdmu wkoll), fi kwalunkwe ordni."
    ],
    "img": {
     "file": "table-prev",
     "alt": "Preview tat-tabella: kull sottotitolu SRT b'ringiela fuq erba' kolonni, bil-bar tal-istatistika",
     "cap": "SRT imqassam b'erba' kolonni, li jista' jiġi kkonvertit lura bl-istess mod"
    }
   },
   {
    "h2": "Żbalji komuni",
    "ps": [
     "**Irranġa l-inkodjar imkisser l-ewwel**: din il-paġna taqra UTF-8 biss. Skrin sħiħ ta' marki ta' mistoqsija jew kaxxi jfisser vjaġġ lejn [[Tiswija ta' Mojibake|/repair.html]] l-ewwel.",
     "**CSV jew xlsx**: agħżel .xlsx meta l-fajl ikun se jidħol f'Excel, sabiex il-kolonna tal-ħin ma tkunx tista' tiġi fformattjata mill-ġdid; CSV huwa aktar portabbli iżda Excel jista' jaqrah b'xi ħaġa oħra — issettja l-kolonna tal-ħin għal \"Test\" jekk jiġri hekk.",
     "**ASS ma jaħdimx**: ASS iġorr direttivi tal-istil, għalhekk ikkonvertih għal SRT qabel ma tpoġġih f'tabella."
    ]
   },
   {
    "h2": "Relatati",
    "ps": [
     "Il-passaġġ sħiħ f'żewġ direzzjonijiet — [[Kif tikkonverti sottotitoli għal Excel / CSV|/guides/table.html]]; traduzzjoni wara — [[Traduzzjoni ta' sottotitoli|/translate.html]]; passaġġ finali qabel il-kunsinna — [[QC tas-sottotitoli|/qc.html]]."
    ]
   }
  ]
 },
 "srt-to-vtt": {
  "seo": {
   "title": "Konvertitur SRT għal VTT – Ikkonverti Sottotitoli Online – AI-SRTSub",
   "desc": "Ikkonverti sottotitoli SRT għal VTT (WebVTT) għal elementi ta' track HTML5. Il-virgoli tal-timestamps isiru tikek awtomatikament. Jaħdem fil-browser tiegħek, xejn ma jittella'.",
   "h1": "SRT għal VTT",
   "intro": "Bidel sottotitoli SRT f'VTT: niżżel il-fajl, agħżel VTT, niżżel. Il-timestamps huma miktuba mill-ġdid għall-format tal-web, kollox fil-browser tiegħek.",
   "ctaText": "Ikkonverti SRT → VTT"
  },
  "body": [
   {
    "h2": "Meta teħtieġ VTT",
    "ps": [
     "Plejers tal-web (l-element HTML5 `<track>`), tlugħ ta' sottotitoli fuq YouTube, u l-biċċa l-kbira tal-plejers ibbażati fuq il-browser jaċċettaw **VTT (WebVTT)** biss — mhux SRT. Jekk kulma għandek huwa SRT, konverżjoni waħda tagħmilha taħdem."
    ]
   },
   {
    "h2": "Kif ivarjaw iż-żewġ formati",
    "ps": [
     "Il-kontenut huwa kważi identiku; tliet affarijiet huma miktuba b'mod differenti: il-**linja tal-header WEBVTT** (meħtieġa f'VTT); is-**separatur tal-millisekondi** fil-timestamps — l-SRT juża virgola (00:00:01,000) filwaqt li l-VTT juża punt (00:00:01.000); u l-VTT jippermetti blokok NOTE u STYLE li l-SRT ma jippermettix."
    ],
    "img": {
     "file": "convert-result",
     "alt": "Riżultat tal-konverżjoni li juri l-header WEBVTT u timestamps b'tikek",
     "cap": "Il-VTT ikkonvertit: l-ewwel linja WEBVTT, timestamps b'tikek"
    }
   },
   {
    "h2": "Kif tikkonverti",
    "ps": [
     "Iftaħ il-[[konvertitur|/convert.html]], niżżel l-SRT ġewwa, agħżel **VTT - WebVTT** bħala l-output, imbagħad ikkonverti u niżżel. L-ordni tas-sottotitoli, il-valuri tal-ħin, u t-test b'diversi linji jinżammu kollha kif inhuma — is-sintassi biss tinbidel. Se tmur in-naħa l-oħra? Ara [[VTT għal SRT|/guides/vtt-to-srt.html]]."
    ]
   }
  ]
 },
 "subtitle-format-comparison": {
  "seo": {
   "title": "SRT vs VTT vs ASS vs SBV vs LRC – Liema Format ta' Sottotitoli – AI-SRTSub",
   "desc": "Tqabbil tal-kapaċitajiet ta' ħames formati komuni ta' sottotitoli: stil tat-test, pożizzjonament, preċiżjoni tal-ħin, fejn jappartjeni kull wieħed, u kif tikkonverti bejniethom.",
   "h1": "L-Għażla ta' Format ta' Sottotitoli: SRT / VTT / ASS / SBV / LRC",
   "intro": "L-istess sottotitolu salvat f'ħames formati jservi ħames masters differenti. Din il-gwida tqabbel dak li jista' jagħmel kull format u kif timxi bejniethom.",
   "ctaText": "Iftaħ il-konvertitur tas-sottotitoli"
  },
  "body": [
   {
    "h2": "Agħżel format f'sentenza waħda",
    "ps": [
     "It-tagħbija diretta f'plejer, kompatibilità massima → **SRT**; plejers tal-web (track HTML5) jew tlugħ fuq YouTube → **VTT**; fonti, kuluri, pożizzjonament, effetti → **ASS**; imniżżel minn YouTube → **SBV** (ikkonverti għal SRT biex tkabbar l-appoġġ); lirika ta' kanzunetti, kant linja b'linja → **LRC**."
    ],
    "img": {
     "file": "convert-opt",
     "alt": "Dropdown tal-format tal-output: sitt formati fil-mira",
     "cap": "Is-sitt miri tal-esportazzjoni fil-konvertitur ikopru kull format f'din il-gwida"
    }
   },
   {
    "h2": "Tqabbil tal-kapaċitajiet",
    "ps": [
     "**SRT**: test sempliċi + ħin, ebda stil jew pożizzjonament, iċ-champion tal-kompatibilità. **VTT**: test + ħin, appoġġjat b'mod nativ mill-browsers, jista' jġorr pożizzjonament u stil bażiku, punt qabel il-millisekondi. **ASS**: test + ħin + stil sħiħ (fonti, kuluri, kontorni, pożizzjonament, effetti), ħin sas-santisekondi. **SBV**: il-format minimu ta' sottotitoli ta' YouTube, bidu u tmiem fuq linja waħda. **LRC**: format ta' lirika, ħinijiet tal-bidu biss, ebda ħin tat-tmiem, ebda stil."
    ]
   },
   {
    "h2": "Mogħdijiet bejn il-formati",
    "ps": [
     "Kwalunkwe wieħed minn dawn jikkonverti fiż-żewġ direzzjonijiet fil-[[konvertitur|/convert.html]]: il-qari jappoġġja srt, vtt, ass (inkluż ssa), sbv, lrc, txt; l-esportazzjoni tappoġġja srt, vtt, ass, sbv, lrc, txt. Ir-rotta komuni kull waħda għandha l-gwida tagħha stess: [[SRT għal VTT|/guides/srt-to-vtt.html]], [[VTT għal SRT|/guides/vtt-to-srt.html]], [[SRT għal ASS|/guides/srt-to-ass.html]], [[ASS għal SRT|/guides/ass-to-srt.html]], [[SBV għal SRT|/guides/sbv-to-srt.html]], [[LRC għal SRT|/guides/lrc-to-srt.html]]."
    ]
   },
   {
    "h2": "X'jitilfu l-konverżjonijiet",
    "ps": [
     "Il-konverżjoni għal SRT dejjem twarrab l-istil u l-pożizzjonament (l-SRT ma jistax iżommhom). Il-konverżjoni għal ASS b'din l-għodda **terġa' tibni stil awtomatiku u ma żżommx dak oriġinali**. LRC għal SRT jeħtieġ li l-ħinijiet tat-tmiem jimtlew (kull linja tibqa' sakemm tiġi l-oħra; l-aħħar waħda tieħu 3 sekondi). Il-valuri tal-ħin u t-test jibqgħu identiċi f'kull direzzjoni."
    ]
   }
  ]
 },
 "subtitle-garbled-characters": {
  "seo": {
   "title": "Mnejn Jiġi l-Mojibake tas-Sottotitoli – Skoprih, Irranġah – AI-SRTSub",
   "desc": "Mojibake ifisser qari ħażin, mhux fajl imħassar. Karattri ta' sostituzzjoni, ħajt ta' ittri aċċentati u serje ta' karattri oskuri kollha jindikaw kawża — tgħallem liema jirkupraw u liema qatt ma jagħmlu hekk.",
   "h1": "Mnejn jiġi l-mojibake tas-sottotitoli",
   "intro": "L-istess bytes maqruwijin bħala UTF-8 u maqruwijin bħala GBK joħorġu bħala żewġ settijiet ta' karattri kompletament differenti. Kif jidher it-test imħassar huwa evidenza diretta ta' liema pass mar ħażin.",
   "ctaText": "Iftaħ l-għodda għat-tiswija tal-mojibake"
  },
  "body": [
   {
    "h2": "Il-fajl jinsab tajjeb — inqara ħażin",
    "ps": [
     "Dak li jaħżen fajl tas-sottotitoli huma bytes. It-tibdil ta' bytes f'karattri jeħtieġ li tkun taf f'liema inkodjar inkitbu — ħu dak ħażin u jkollok mojibake. Ebda byte wieħed ma nieqes mill-fajl; erġa' aqrah bl-inkodjar it-tajjeb u l-karattri jerġgħu lura.",
     "Dan jaqsam ix-xogħol f'tnejn: **kif wieħed jaħdem f'liema inkodjar beda**, u **kif isalvabħala inkodjar li l-plejer tiegħek jista' jiskopri**. L-ewwel wieħed jiġi mill-ippruvat tad-dekodifikazzjoni u l-punteġġ, it-tieni mill-iffrankar ta' kopja. Huma jsolvu problemi differenti."
    ]
   },
   {
    "h2": "Ħames dehriet, ħames kawżi",
    "ps": [
     "Il-mojibake mhuwiex każwali — kif jidher jiżvela x'ikkawżah:"
    ],
    "img": {
     "file": "repair-diag",
     "alt": "Karta tad-dijanjosi li elenka kull tip ta' traċċa ta' mojibake",
     "cap": "Id-dijanjosi tordna l-mojibake skont il-kawża minflok ma tiġbor kollox flimkien"
    }
   },
   {
    "h2": "Għaliex il-karattru ta' sostituzzjoni ma jistax jissewwa",
    "ps": [
     "Il-karattru ta' sostituzzjoni huwa l-linja diviżorja. `�` ifisser li l-bytes kienu diġà ntremew **f'pass aktar kmieni** (ġeneralment xi programm li qara l-fajl u reġa' salvah), u xejn ma ġie rreġistrat dwar dak li ntrema. F'dak il-punt m'hemm xejn li wieħed jirraġuna lura minnu — ħadd ma jista' jsewwih.",
     "Għalhekk il-paġna tat-tiswija tittratta żewġ każijiet b'mod differenti. Tella' fajl u l-bytes oriġinali jkunu intatti, u b'hekk iħallih jipprova kull inkodjar; jekk it-test ipejstejt diġà jkun fih il-karattru ta' sostituzzjoni, jgħid hekk b'mod ċar: \"ma jistax jissewwa, jekk jogħġbok tella' l-fajl oriġinali\".",
     "Hemm ukoll il-każ oppost: il-kontenut jinqara tajjeb ħafna iżda l-plejer tiegħek xorta juri żibel. Il-fajl mhuwiex tort — **il-plejer għażel l-inkodjar il-ħażin**. L-editjar tat-test mhux se jgħin; salva kopja b'UTF-8 b'BOM jew GBK u agħtih dik."
    ],
    "img": {
     "file": "repair-up",
     "alt": "Żona tat-tlugħ: drag-and-drop u tpejstja bħala żewġ punti tad-dħul",
     "cap": "Tella' l-fajl jekk tista' — bytes intatti jfissru xi ħaġa li tista' tissewwa"
    }
   },
   {
    "h2": "X'inhu jqabbel waqt it-tiswija",
    "ps": [
     "L-għodda tipprova kull inkodjar plawsibbli, imbagħad tagħti punteġġ lil kull riżultat: kemm minnu hu magħmul minn karattri komuni, jekk hemmx sensiela ta' aċċenti, sensiela ta' simboli, jekk il-meded ta' CJK humiex ħajt ta' karattri oskuri. Ir-riżultat bl-aħjar punteġġ jitla' fil-quċċata tal-lista.",
     "**Jekk l-ebda punteġġ ma jkun ċarament aħjar, xejn ma jiġi rrakkomandat** — aħjar ngħidulek \"dan jinqara tajjeb kif inhu\" milli nagħtuk xi ħaġa li tixbah biss b'mod vag xi lingwa. Test imħarbat darbtejn (salvat ħażin darba, imbagħad imsewwi ħażin darba) jieħu rawnd żejda wieħed ta' soluzzjoni lura fuq il-kandidati ewlenin."
    ],
    "img": {
     "file": "repair-fix",
     "alt": "Lista ta' kandidati ordnata skont il-punteġġ, kull waħda bit-tikketta tal-pari tal-inkodjar tagħha",
     "cap": "Kandidati rranġati skont il-punteġġ — l-ebda rebbieħ ċar, l-ebda rakkomandazzjoni"
    }
   },
   {
    "h2": "L-iffrankar tal-inkodjar it-tajjeb itemm ix-xogħol",
    "ps": [
     "Test imsewwi xorta jrid jiġi salvat bħala inkodjar li l-plejer tiegħek jirrikonoxxi. Il-plejers fuq Windows ġeneralment jiddependu mill-BOM biex jiskopru l-inkodjar, għalhekk **UTF-8 b'BOM** huwa l-inqas battikata; ħardwer eqdem u xi plejers reġjonali jridu GBK. Tista' tagħżel UTF-8, UTF-8 (b'BOM), GBK, Big5, Shift_JIS jew EUC-KR, u jingħadlek biex tagħżel ieħor jekk xi ħaġa ma taqbilx (GBK ma tistax żżomm Korejan)."
    ],
    "img": {
     "file": "repair-out",
     "alt": "Żona tar-riżultat: dropdown tal-inkodjar biex issalva bħala u buttuna tat-tniżżil",
     "cap": "Salvah bħala xi ħaġa li l-plejer jirrikonoxxi u l-mojibake verament jiġi solvut"
    }
   },
   {
    "h2": "Għodod u gwidi relatati",
    "ps": [
     "Il-passaġġ sħiħ — [[Kif tirranġa sottotitoli mħarbta minn mojibake|/guides/repair.html]]; x'jaħżen attwalment fajl SRT — [[X'hemm ġewwa fajl SRT|/guides/srt-file-format.html]]; l-inkodjar huwa tajjeb iżda l-kontenut huwa maħmuġ (watermarks, reklami, tags għal dawk neqsin mis-smigħ) — [[Tindif tas-sottotitoli|/clean.html]]."
    ]
   }
  ]
 },
 "subtitle-glossary": {
  "seo": {
   "title": "Tabelli tat-termini: staġun wieħed, vabolabularju wieħed – Meta tibni waħda – AI-SRTSub",
   "desc": "Tabella tat-termini tirranġa l-istess kelma tradotta b'mod inkonsistenti: meta tibni waħda, kif terġa' tużaha tul staġun sħiħ, għaliex it-tqabbil ta' kelma sħiħa ma jagħmel xejn fiċ-Ċiniż, u x'ma tridx tagħtih.",
   "h1": "Tabelli tat-termini: kif iżżomm staġun konsistenti",
   "intro": "Meta isem ikun A fl-episodju wieħed u B fl-episodju sebgħa, il-viżur jaħseb li huma żewġ karattri. Tabella tat-termini tipprevjeni eżattament dan — tirranġa kif jissejħu l-affarijiet.",
   "ctaText": "Iftaħ is-sostituzzjoni f'lottijiet tat-termini"
  },
  "body": [
   {
    "h2": "Tabella tat-termini tirranġa l-inkonsistenza",
    "ps": [
     "Il-problemi tal-kliem fis-sottotitoli jiġu f'żewġ tipi: \"din il-kelma ġiet tradotta ħażin\" u \"l-istess kelma ġiet tradotta b'mod differenti minn post għal ieħor\". L-ewwel hija problema ta' dizzjunarju; it-tieni hija għalxiex hi maħsuba tabella tat-termini.",
     "It-tieni hija kemm aktar komuni kif ukoll aktar diffiċli biex tinduna biha: `Thor` isir \"Thor\" fl-episodju wieħed u \"Donar\" fl-episodju sebgħa, u kull episodju jidher tajjeb waħdu filwaqt li s-serje kollha kemm hi tagħmel lill-viżur jaħseb li deher karattru ġdid. Tabella tat-termini tibdel \"din il-produzzjoni ssejħilu Thor\" f'regola eżekutibbli applikata għall-fajl tas-sottotitoli kollu f'daqqa."
    ]
   },
   {
    "h2": "Meta jiswa li tibni waħda",
    "ps": [
     "Mhux kull fajl ta' sottotitoli jeħtieġ tabella tat-termini. Il-każijiet li jiġġustifikaw waħda huma ġeneralment dawn:"
    ],
    "img": {
     "file": "glossary-rules",
     "alt": "Regoli ta' sostituzzjoni miġbura f'kategoriji f'tabella tat-termini",
     "cap": "Uża kummenti # biex tiġbor ir-regoli, u biex titfi waħda temporanjament waqt l-editjar"
    }
   },
   {
    "h2": "Kif żżomm tabella waħda tul staġun",
    "ps": [
     "Tabella tat-termini tinżamm **b'mod inkrementali**: issolvi l-ismijiet fl-episodju wieħed, imbagħad żid regola kull meta jidher terminu ġdid, u sal-aħħar tal-istaġun it-tabella tkun kompluta. Għall-istaġun li jmiss tal-istess serje, ibda minnha.",
     "Ikteb ir-regoli ftit usa' milli strettament meħtieġ — ladarba tkun ddeċidejt fuq \"Thor\", żid \"Donar -> Thor\" ukoll, sabiex is-sottotitoli ta' ħaddieħor ikunu jistgħu jinġiebu fl-istess linja fl-istess pass.",
     "Dejjem aqra l-**lista tal-bidliet** wara: issemmi kull sottotitolu, kull linja u dak li sar x'inhu. Hija l-uniku post fejn tista' tikkonferma li l-bidla kienet tajba u mhux żejda, u kwalunkwe entrata li ma togħġbokx tista' tiġi rriversjata bi klikk."
    ],
    "img": {
     "file": "glossary-diff",
     "alt": "Il-lista tal-bidliet individwali fiż-żona tar-riżultat",
     "cap": "Kull bidla hija elenkata; ikklikkja waħda li ma tridx biex tirriversjaha"
    }
   },
   {
    "h2": "X'm'għandekx tagħti lil tabella tat-termini",
    "ps": [
     "Tabella tat-termini tivverifika **kliem**. Dawn it-tliet affarijiet huma barra mix-xogħol tagħha, u għandhom ikunu:",
     "**Grammatika u struttura tas-sentenzi** — ma tistax tibdel kelma f'sentenza; ix-xogħol fil-livell tas-sentenza jerġa' lura għal [[Traduzzjoni ta' sottotitoli|/translate.html]] jew għal bniedem.",
     "**Tindif tal-kontenut** — it-tneħħija ta' linji sħaħ bħal watermarks, reklami u cues għal dawk neqsin mis-smigħ tappartjeni għal [[Tindif tas-sottotitoli|/clean.html]]; ir-regoli tat-tabella tat-termini jissostitwixxu, ma jħassrux linji.",
     "**Linji taż-żmien** — tabella tat-termini qatt ma tmiss il-ħin. Għal offset globali jew problema bir-rata mur għal [[Aġġustament tal-linja taż-żmien|/shift.html]]."
    ]
   },
   {
    "h2": "Ftit affarijiet faċli biex tagħmilhom ħażin",
    "ps": [
     "**Iċ-Ċiniż xorta jissostitwixxi sottostrings bit-tqabbil ta' kelma sħiħa mmarkat — dan normali.** Iċ-Ċiniż u l-Ġappuniż ma jseparawx il-kliem bi spazji, għalhekk l-għodda ma tistax tiddetermina l-konfini tal-kliem u t-tqabbil ta' kelma sħiħa m'għandu l-ebda effett hemmhekk; il-`art` mhux se jmiss il-protezzjoni ta' `start` taħdem għall-Ingliż biss.",
     "**L-ordni tibdel ir-riżultat.** Ir-regoli jaħdmu minn fuq għal isfel u t-test prodott minn regola waħda jiġi skennjat mill-ġdid mir-regoli taħtu. Ibdel A b'B u mbagħad B Ċ u tispiċċa b'Ċ.",
     "**Biex tibdel it-traduzzjoni biss, issettja l-ambitu.** F'fajl bilingwi, agħżel \"it-tieni linja biss\"; entrati b'linja waħda biss jibqgħu mhux mimsus taħt kwalunkwe ambitu b'linja waħda — l-għodda ma taqtax liema naħa hija l-oriġinali.",
     "**It-tabella tat-termini ma tiġix salvata.** Hija vojta kull darba li tiftaħ il-paġna, għalhekk żomm il-fajl tat-test tiegħek stess u għaddih."
    ]
   },
   {
    "h2": "Għodod u gwidi relatati",
    "ps": [
     "Għall-passaġġ sħiħ ara [[Kif tissostitwixxi termini f'lottijiet fis-sottotitoli|/guides/glossary.html]]; jekk il-kontenut ikun maħmuġ ħaddem [[Tindif tas-sottotitoli|/clean.html]] l-ewwel; ladarba l-ismijiet ikunu stabbiliti u jkollok bżonn lingwi oħra mur għal [[Traduzzjoni ta' sottotitoli|/translate.html]]; u tħaddem ir-riżultat permezz ta' [[QC tas-sottotitoli|/qc.html]]."
    ]
   }
  ]
 },
 "subtitle-quality-check": {
  "seo": {
   "title": "Lista ta' Kontroll tal-QC tas-Sottotitoli qabel il-Kunsinna – AI-SRTSub",
   "desc": "Lista ta' kontroll għall-kunsinna tas-sottotitoli: sovrapożizzjonijiet, veloċità tal-qari, wisa' tal-linja u punteġġjatura jonqsu l-aktar spiss. Ħaddem ir-regoli tal-QC ta' 17 — nofs il-problemi huma soluzzjonijiet bi klikk waħda.",
   "h1": "X'Għandek Tiċċekkja Qabel il-Kunsinna",
   "intro": "Sottotitoli lesti mhumiex lesti biex jiġu kunsenjati: il-problemi li l-viżur jinnutalhom mill-ewwel daqqa t'għajn huma eżattament dawk li ma tistax tara wara li tkun rajthom mitt darba. Din il-lista ta' kontroll tkopri dak il-pass finali.",
   "ctaText": "Ħaddem Kontroll tal-QC tas-Sottotitoli"
  },
  "body": [
   {
    "h2": "Għaliex Ma Tistax Tara l-Problemi Int Stess",
    "ps": [
     "Kull min jagħmel is-sottotitoli jaf il-kontenut tajjeb wisq — int taf x'tgħid kull linja li jmiss, għalhekk xejn qatt ma jħossu veloċi wisq; rajt it-tqassim mijiet ta' drabi, u għajnejk jaqbżu l-imperfezzjonijiet waħedhom. Għalhekk il-kontroll qabel il-kunsinna ma jistax jiddependi fuq \"li terġa' tarah mill-bidu\" — irid ikun **imkejjel kontra n-numri**: veloċità tal-qari, wisa' tal-linja, tul, sovrapożizzjonijiet. Ħalli ċ-ċifri jiddeċidu."
    ]
   },
   {
    "h2": "Is-Sitt Fallimenti l-Aktar Komuni",
    "ps": [
     "Ranks skont kemm-il darba jegħrqu kunsinna:"
    ]
   },
   {
    "h2": "Kif Tiċċekkja",
    "ps": [
     "Iftaħ [[QC tas-sottotitoli|/qc.html]] u niżżel is-sottotitoli tiegħek ġewwa; issettja l-lingwa biex tiskopri awtomatikament (27 lingwi, kull waħda bir-regoli tagħha stess). Ir-rapport elenka s-sejbiet fi tliet livelli — **żbalji / twissijiet / ħjiel** — kull waħda bin-numru tal-entrata u l-valur imkejjel. L-żbalji jridu jiġu indirizzati (test imħarbat, format tal-timestamp, tmiem qabel il-bidu, numerazzjoni miksura); it-twissijiet jiddependu mill-każ (sovrapożizzjonijiet, veloċità tal-qari, wisa' tal-linja, tul); il-ħjiel huma l-illustrar (pożizzjoni tal-waqfien tal-linja, spazji, punteġġjatura)."
    ],
    "img": {
     "file": "qc-report",
     "alt": "Rapport tal-QC: lista ta' kwistjonijiet bi tliet livelli, kull sejba b'numru ta' entrata u tqabbil imkejjel vs limitu",
     "cap": "Rapport bi tliet livelli li jagħti n-numru tal-entrata u l-valur imkejjel għal kull sejba"
    }
   },
   {
    "h2": "X'Jista' Jiġi Rranġat bi Klikk Waħda",
    "ps": [
     "Numerazzjoni, entrati vojta, qari mill-ġdid tal-linji, spazji u punteġġjatura — kull ħaġa li **tħalli l-ħin intatt** — tista' tiġi rranġata awtomatikament; soluzzjonijiet li **jibdlu l-ħin** (l-iskambju tal-bidu u t-tmiem, iċ-ċaqliq tas-sovrapożizzjonijiet, it-tirqim jew it-tiġbid tat-tulijiet) mhumiex immarkati b'default u għandhom jiġu mmarkati biss wara li tikkonferma l-impatt. **Veloċità tal-qari fuq il-limitu m'għandhiex soluzzjoni awtomatika** — il-magna ma tistax tkun taf liema kelma taqta', għalhekk qassar it-traduzzjoni int stess jew ittaffi l-ħin ftit; ara [[Sottotitoli Mgħaġġla Wisq biex Taqrahom|/guides/subtitle-too-fast.html]]. Wara l-irranġar, kontroll ġdid jaħdem awtomatikament, u ir-rapport jgħodd biss dak li ġie rranġat ġenwinament."
    ]
   },
   {
    "h2": "Waqt li Kunu Qed Tagħmel Dan",
    "ps": [
     "Il-paġna tar-rapport tista' tniżżel rapport ta' test sempliċi `.qc.txt` direttament — waħhlu mal-kunsinna sabiex in-naħa l-oħra tara mill-ewwel dak li ċċekkjajt. Għal sottotitoli tradotti frisk, ħaddem QC qabel il-kunsinna; id-devjazzjoni ġenerali tal-linja taż-żmien hija tip ieħor ta' problema — jekk il-veloċità tal-qari xorta tfalli wara l-iċċekkjar, ara [[Sottotitoli li qed Jiddevjaw mis-Sinkronizzazzjoni|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "subtitle-speed-converter": {
  "seo": {
   "title": "Sinkronizza Sottotitoli Wara Bidla fil-Veloċità tal-Vidjow – AI-SRTSub",
   "desc": "Il-vidjow sar aktar veloċi jew bil-mod u sottotitoli m'għadhomx jaqblu: daħħal il-fattur tal-veloċità fil-pass ta' skalar skont ir-rata u l-linja taż-żmien kollha tiġġebbed mal-vidjow.",
   "h1": "Aġġusta Sottotitoli Wara Bidla fil-Veloċità tal-Vidjow",
   "intro": "Il-vidjow sar aktar veloċi jew bil-mod b'mod ġenerali, is-sottotitoli baqgħu bl-aġġit oriġinali — kull ħaġa wara punt tkun barra minn postha. Daħħal il-fattur u l-linja taż-żmien kollha tiskala mal-vidjow.",
   "ctaText": "Iftaħ l-editur tal-ħin"
  },
  "body": [
   {
    "h2": "Meta tuża rata minflok ċaqliq",
    "ps": [
     "Il-video tħaffef jew naqqas il-pass **kollu kemm hu** (aġġusta bħal 0.9x jew 1.25x fis-softwer tal-editjar) filwaqt li kull cue żamm ir-ritmu oriġinali tiegħu: il-bidu jaqbel, u iktar ma' tavvanza iktar jiggrava — bi proporzjon kostanti. Dik hija problema ta' rata. Jekk il-fajl kollu sempliċement jiġi mċaqlaq b'ammont fiss mingħajr ma jikber, bidla tkun biżżejjed — ara [[kif tmexxi l-fajl tas-sottotitoli kollu aktar kmieni jew aktar tard|/guides/shift-subtitle-timing.html]]."
    ]
   },
   {
    "h2": "Liema numru trid daħħal",
    "ps": [
     "Is-sottotitoli jridu jsegwu l-vidjow, għalhekk daħħal **il-fattur li bih il-vidjow attwalment inbidel**: tħaffif ta' 1.25x ifisser li l-ħinijiet tas-sottotitoli jimmultiplikaw b'1.25 biex jaqbdu; tnaqqis ta' 0.9x jimmultiplika b'0.9. Fl-editur tal-ħin, żid pass **Skalja skont ir-rata** u poġġi l-fattur fil-kaxxa tal-valur."
    ],
    "img": {
     "file": "shift-step-rate",
     "alt": "Pass ta' skalar skont ir-rata b'fattur fil-kaxxa tal-valur",
     "cap": "Fattur 'il fuq minn 1 jiġġebbed il-linja taż-żmien (għal vidjow imħaffef), taħt 1 jikkompressaha (għal wieħed imnaqqas)."
    }
   },
   {
    "h2": "Kif dan ivarja minn ċaqliq",
    "ps": [
     "Ċaqliq **jiċċaqlaq** il-ħinijiet ta' kull sottotitolu bl-istess ammont fiss u jżomm it-tul tas-sottotitoli; rata **timmultiplika** kemm il-bidu kif ukoll it-tmiem, sabiex it-tulijiet jiġu skalati wkoll. Wara bidla fil-veloċità, it-tulijiet infushom inbidlu — eżattament għalhekk hija meħtieġa rata."
    ]
   },
   {
    "h2": "Jekk m'intix ċert dwar il-fattur",
    "ps": [
     "Meta l-fattur jintilef, erġa' lura għal **żewġ punti ta' referenza**: daħħal il-ħinijiet reali tal-vidjow tal-ewwel u l-aħħar sottotitolu u kull ħaġa bejniethom tinfirex b'mod proporzjonali — ekwivalenti għas-soluzzjoni għall-fattur it-tajjeb. Ara [[sottotitoli li qed joħorġu dejjem aktar mis-sinkronizzazzjoni|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "subtitle-too-fast": {
  "seo": {
   "title": "Sottotitoli Mgħaġġla Wisq biex Taqrahom – Irranġa l-Veloċità tal-Qari – AI-SRTSub",
   "desc": "Sottotitoli malajr wisq biex taqrahom — tul qasir jew test twil? Il-QC jimmarka entrati 'l fuq minn 20 karattri/sekonda (9 hanzi għal CJK); it-tulijiet jiġu rranġati awtomatikament, it-test jeħtieġ editjar.",
   "h1": "Sottotitoli Mgħaġġla Wisq biex Taqrahom",
   "intro": "Il-viżur jibqa' jagħfas pawża? Il-ħati hija l-veloċità tal-qari. Kif tkejjelha, kif tirranġaha, u meta teditja t-test kontra l-ħin — kollox f'gwida waħda.",
   "ctaText": "Iċċekkja l-Veloċità tal-Qari"
  },
  "body": [
   {
    "h2": "X'Inhi l-Veloċità tal-Qari?",
    "ps": [
     "Il-veloċità tal-qari hija sempliċement **jekk il-viżur jistgħux jispiċċaw jaqraw sottotitolu fi ħdan il-ħin li jibqa' fuq l-iskrin**. Il-matematika hija diretta: il-wisa' tat-test diviża b'sekondi fuq l-iskrin. Limiti komuni tal-industrija: 9 karattri b'wisa' sħiħa kull sekonda għaċ-Ċiniż, il-Ġappuniż u l-Korejan (18 unitajiet b'wisa' parzjali), 20 unitajiet b'wisa' parzjali kull sekonda għal lingwi oħra. Linja ta' 20 hanzi li ddum 1 sekonda taħdem għal 40 unitajiet ta' wisa' kull sekonda — aktar mid-doppju tal-limitu, u l-viżur qatt mhu se jispiċċaha."
    ]
   },
   {
    "h2": "L-ewwel, Iddistingwi Liema Tip ta' Veloċità",
    "ps": [
     "\"Mgħaġġla wisq biex taqrahom\" hija fil-fatt żewġ problemi differenti: **tul qasir wisq** — is-sottotitolu jinqata' wara mitt jew mitejn millisekonda, ġeneralment żball fil-ħin jew fdal tal-editjar; **test twil wisq** — it-tul huwa tajjeb, iżda l-linja tiġbor fih 30 hanzi, u l-ebda limitu ta' veloċità mhu se jsalvaha. Is-soluzzjonijiet huma opposti, għalhekk stabbilixxi liema waħda għandek l-ewwel."
    ],
    "img": {
     "file": "qc-rules",
     "alt": "L-issettjar tal-limitu tal-veloċità tal-qari fil-paġna tal-QC, li b'default huwa 18 għal CJK u 20 għal lingwi oħra",
     "cap": "Limiti tal-veloċità tal-qari tal-QC: 18 unitajiet ta' wisa' kull sekonda għal CJK, 20 għal lingwi oħra"
    }
   },
   {
    "h2": "Kif Tiċċekkja",
    "ps": [
     "Iftaħ [[QC tas-sottotitoli|/qc.html]] u niżżel is-sottotitoli tiegħek ġewwa. Fir-rapport, \"tul qasir wisq\" hija twissija li turi l-millisekondi mkejla (limitu: 833 millisekonda); \"veloċità li ma jinqarax\" hija sejba fiha nfisha li turi l-unitajiet ta' wisa' mkejla kull sekonda. Għal sottotitoli bilingwi l-linja miktuba fil-lingwa fil-mira biss tgħodd — iż-żewġ lingwi ma jiġux miżjudin flimkien."
    ]
   },
   {
    "h2": "Kif Tirranġaha",
    "ps": [
     "**Tul qasir wisq**: jista' jiġi rranġat bi klikk waħda — is-sottotitolu jiġi estiż awtomatikament għal 833 millisekonda, mingħajr ma jaqbeż il-bidu tas-sottotitolu li jmiss (soluzzjoni m'għandhiex toħloq sovrapożizzjonijiet ġodda). **Test twil wisq**: ebda soluzzjoni awtomatika — il-magna ma tistax tkun taf liema kelma taqta'. Żewġ mogħdijiet, l-għażla tiegħek: qassar it-traduzzjoni (ikklikkja ċ-ċellola fl-għodda tat-traduzzjoni biex teditjaha), jew iġġebbed it-tul ta' dan is-sottotitolu (biss jekk hemm spazju qabel is-sottotitolu li jmiss; għal problemi ġenerali fil-linja taż-żmien ara [[Ċaqliq fil-Linja ta' Żmien|/shift.html]]). Erġa' ħaddem il-QC wara biex tikkonferma li l-veloċità tal-qari reġgħet lura fil-limitu."
    ]
   },
   {
    "h2": "Tesaggerax fl-Iffissar",
    "ps": [
     "Li tilħaq il-limitu tal-veloċità ma jfissirx wiri komdu: l-ippakkjar ta' kull sottotitolu eżatt sal-9 karattri kull sekonda jagħmel il-film kollu għajjien. Bħala regola ġenerali, żomm madwar 70% tal-limitu fil-biċċa l-kbira tal-ħin, u ħalli passaġġi densi b'dijalogu jaqbżu ftit kultant. Blokok ta' sottotitoli li jteptep spiss wisq huma problema fihom infushom — ħaddem is-sett sħiħ ta' metriċi qabel il-kunsinna, ara [[X'Għandek Tiċċekkja Qabel il-Kunsinna|/guides/subtitle-quality-check.html]]."
    ]
   }
  ]
 },
 "subtitles-out-of-sync": {
  "seo": {
   "title": "Sottotitoli qed Jiddevjaw Aktar u Aktar mis-Sinkronizzazzjoni? Irranġah – AI-SRTSub",
   "desc": "Jibda tajjeb, ftit sekondi wara sal-nofs il-film, ma jistagħx jintuża fl-aħħar: dik hija devjazzjoni progressiva, ġeneralment diskrepanza fir-rata tal-frejms jew bidla fil-veloċità tal-vidjow. Żewġ punti ta' referenza jirranġawha.",
   "h1": "Sottotitoli qed Jiddevjaw Dejjem Aktar mis-Sinkronizzazzjoni: Kawżi u Soluzzjonijiet",
   "intro": "Tajjeb fil-bidu, ftit sekondi tard b'nofs siegħa, bla tama fl-aħħar. Dan it-tip ta' allinjament ħażin li jiddevja għandu kawżi magħrufa — u soluzzjoni magħrufa.",
   "ctaText": "Irranġa dan il-fajl"
  },
  "body": [
   {
    "h2": "L-ewwel iddistingwi ż-żewġ tipi ta' allinjament ħażin",
    "ps": [
     "L-allinjament ħażin jiġi f'żewġ tipi: **offset uniformi** ifisser li kull sottotitolu huwa tard (jew kmieni) bl-istess ammont, bejn wieħed u ieħor ugwali mill-bidu sal-aħħar; **devjazzjoni progressiva** ifisser li l-bidu huwa korrett u l-iżball jikber lejn l-aħħar, possibilment jilħaq minuti. Dan l-artikolu huwa dwar it-tieni tip — għall-ewwel wieħed, ara [[iċ-ċaqliq tal-fajl tas-sottotitoli kollu aktar kmieni jew aktar tard|/guides/shift-subtitle-timing.html]]."
    ]
   },
   {
    "h2": "Għaliex jiddevja dejjem aktar",
    "ps": [
     "Id-devjazzjoni tiġi minn **żewġ arloġġi differenti**: it-tliet kawżi l-aktar komuni huma (1) diskrepanza fir-rata tal-frejms — is-sottotitoli ta' film ta' 24fps fuq sors ta' 25fps jitilfu aktar minn sekonda kull minuta; (2) il-vidjow ġie mgħaġġel jew imnaqqas filwaqt li s-sottotitoli żammew ir-ritmu oriġinali tagħhom; (3) reġistrazzjoni VFR (variable frame rate) li l-linja taż-żmien tagħha hija irregolari mill-bidu. Dak li jaqsmu: l-iżball jikber bejn wieħed u ieħor b'mod lineari mal-ħin tal-qari."
    ]
   },
   {
    "h2": "Irranġah b'żewġ punti ta' referenza",
    "ps": [
     "Minħabba li l-iżball jikber b'mod lineari, li tiffissa ħin korrett f'kull tarf u terġa' tferrex in-nofs b'mod proporzjonali jerġa' jqiegħed kollox f'postu. Fl-editur tal-ħin, żid **korrezzjoni b'żewġ punti ta' referenza**: iż-żewġ oqsma \"kurrenti\" jimtlew awtomatikament bil-ħinijiet oriġinali ta' dan il-fajl; tara l-vidjow u ddaħħal **meta l-ewwel u l-aħħar sottotitolu attwalment jidhru** fiż-żewġ oqsma \"mira\"."
    ],
    "img": {
     "file": "shift-step-two",
     "alt": "Korrezzjoni b'żewġ punti ta' referenza: ħinijiet kurrenti mimlija awtomatikament, ħinijiet mira x'jiddaħħlu",
     "cap": "Ħu l-punti ta' referenza fiż-żewġ truf — l-iżgħar u l-akbar żball oriġinali — u kull ħaġa bejniethom terġa' tinfirex b'mod proporzjonali."
    }
   },
   {
    "h2": "Kif tivverifika r-riżultat",
    "ps": [
     "Wara li tħaddem, il-pannell tar-riżultat elenka l-ħinijiet oriġinali u ġodda ta' kull sottotitolu **ġenb ma' ġenb**. Iċċekkja tliet postijiet bħala kampjun: l-ewwel sottotitolu, wieħed fin-nofs, u l-aħħar — it-tliet pożizzjonijiet bl-iżgħar, medju u akbar żball oriġinali. Jekk it-tlieta jinżlu f'posthom, il-fajl kollu jagħmel hekk ukoll."
    ],
    "img": {
     "file": "shift-result",
     "alt": "Pannell tar-riżultat: ħinijiet ta' qabel u wara ġenb ma' ġenb, b'buttuna tat-tniżżil",
     "cap": "Il-ħinijiet il-ġodda tas-sottotitoli tan-nofs għandhom jaqgħu bejn iż-żewġ truf — sinjal li il-proporzjon huwa tajjeb."
    }
   },
   {
    "h2": "Meta żewġ punti ta' referenza ma jkunux biżżejjed",
    "ps": [
     "Korrezzjoni b'żewġ punti ta' referenza jassumi li l-iżball huwa **lineari**. Jekk is-sors huwa reġistrazzjoni ta' skrin VFR b'qabża fir-rata tal-frejms fin-nofs tal-fajl, ġibda lineari ma tistax tirranġa n-nofs — ħu sottotitolu tan-nofs li jkun ovvjament barra minn postu b'tieni punt, aqsam il-fajl hemmhekk, u ħaddem korrezzjoni b'żewġ punti ta' referenza fuq kull nofs. Ukoll, wara li tirranġa, erġa' ara t-taqsima tan-nofs b'veloċità normali biex tikkonferma li l-ebda allinjament ħażin lokali ma tħalla warajh."
    ]
   }
  ]
 },
 "table": {
  "seo": {
   "title": "Konverżjoni tas-Subtitles għal Excel / CSV – Iż-Żewġ Direzzjonijiet – AI-SRTSub",
   "desc": "Gwida bid-direzzjoni doppja: esporta SRT/VTT lejn Excel jew CSV għal qari tal-provi ringiela b'ringiela, imbagħad importa l-folja editjata lura bħala subtitles. Meħtieġa tliet kolonni, fi kwalunkwe ordni; il-ħin jinżamm bħala test.",
   "h1": "Kif tikkonverti s-subtitles għal Excel / CSV",
   "intro": "Il-qari tal-provi u t-traduzzjoni huma eħfef fi spreadsheet. Esporta s-subtitles għal Excel jew CSV, editja ringiela b'ringiela, imbagħad ikkonverti lura — il-kolonni tal-ħin jibqgħu test, u l-waqfiet tal-linji fid-djalogu jiġu ppreservati.",
   "ctaText": "Iftaħ il-konvertitur tat-tabelli"
  },
  "body": [
   {
    "h2": "What this tool does :: X'jagħmel dan l-għodda",
    "ps": [
     "Is-subtitles huma ringieli ta' cues u l-ispreadsheets huma ringieli ta' rekords — ladarba tkun folja, il-qari tal-provi, il-kummenti u t-traduzzjoni bl-ingrossa jistgħu jsiru kollha b'għodod li diġà taf. Iż-żewġ direzzjonijiet huma appoġġjati:"
    ]
   },
   {
    "h2": "Tella' u agħżel direzzjoni",
    "ps": [
     "Drag f'fajl jew fittex wieħed. Kull direzzjoni teħtieġ tip differenti ta' fajl: **to table** tieħu fajls tas-subtitles (SRT / VTT), **to subtitle** tieħu fajls ta' spreadsheet (CSV / Excel, kemm .xlsx kif ukoll .xls). Agħżel il-mod żbaljat u l-paġna tgħidlek liema tip ta' fajl irid dak il-mod.",
     "⚠️ Din il-paġna taqra UTF-8 biss. Jekk is-subtitle tiegħek jiftaħ bħala skrin sħiħ ta' punti ta' interrogazzjoni jew kaxxi, mexxih minn ġo [[Mojibake repair|/repair.html]] l-ewwel — l-encoding miksur jinqara bħala xejn ħlief karattri ta' sostituzzjoni hawnhekk."
    ],
    "img": {
     "file": "table-up",
     "alt": "Żona ta' tella' tal-konvertitur tat-tabelli: drop zone u ż-żewġ swiċċijiet tal-mod",
     "cap": "Kull mod irid fajl differenti: subtitles ġewwa, spreadsheet barra — u lura"
    }
   },
   {
    "h2": "Esportazzjoni tas-subtitles lejn tabella",
    "ps": [
     "Agħżel \"to table\", niżżel subtitle, u l-previżjoni elenka kull cue: indiċi, bidu, tmiem, test. L-istrixxa tal-istat tagħti l-għadd ta' cues u t-tul totali. Imbagħad agħfas \"Download Excel (.xlsx)\" jew \"Download CSV\".",
     "Id-differenza bejn it-tnejn: .xlsx huwa fajl ta' spreadsheet reali fejn Excel ma tistax tifformattja mill-ġdid il-kolonna tal-ħin tiegħek wara d-dahar tiegħek; CSV huwa aktar portabbli, iżda Excel tista' tinterpreta l-kolonna tal-ħin bħala xi ħaġa oħra meta tiftaħha. Jekk jiġri hekk, agħżel il-kolonna tal-ħin u onfoħ il-format tagħha għal \"Text\" — jew sempliċement uża .xlsx."
    ],
    "img": {
     "file": "table-prev",
     "alt": "Previżjoni tat-tabella: kolonni ta' indiċi, bidu, tmiem u test bl-istrixxa tal-istat",
     "cap": "Kull cue previżjonat; l-istrixxa tal-istat tagħti l-għadd ta' cues u t-tul totali"
    }
   },
   {
    "h2": "Importazzjoni ta' tabella lura għas-subtitles",
    "ps": [
     "Agħżel \"to subtitle\", niżżel il-folja, u hawn hi r-regola tal-kolonni: teħtieġ tliet kolonni għal **start, end and text** (l-intestaturi Ingliżi Start / End / Text jaħdmu wkoll), fi **kwalunkwe ordni**. `00:00:01,500` u `00:00:01.500` huma t-tnejn aċċettati; ringieli li ma jistgħux jiġu parsed jinqabżu minflok ma jiġi kkundannat il-fajl kollu.",
     "Ir-riżultat huwa elenkat cue b'cue fil-previżjoni; ikkonferma, imbagħad niżżel SRT jew VTT. Jekk dawk it-tliet kolonni jonqsu, tirċievi messaġġ li jgħidlek biex tiċċekkja l-intestaturi — ġeneralment minħabba li ntużat isem ieħor fuq l-esportazzjoni, jew ir-ringiela tal-intestatura mhix ir-ringiela numru wieħed."
    ],
    "img": {
     "file": "table-back",
     "alt": "Żona tar-riżultat tas-subtitles: subtitles importati elenkati cue b'cue",
     "cap": "Kolonni mhux rikonoxxuti huma rappurtati, qatt injorati fis-skiet"
    }
   },
   {
    "h2": "FAQ :: Mistoqsijiet Frekwenti",
    "ps": [
     "**Excel turi l-kolonna tal-ħin ħażin?** Uża .xlsx u dan qatt ma jiġri. Jekk trid bilfors tuża CSV: agħżel il-kolonna tal-ħin u onfoħ il-format taċ-ċellula għal \"Text\" qabel ma tiftaħha.",
     "**L-intestaturi tal-kolonni jridu jkunu bl-Ingliż?** Le. Start / End / Text huma rikonoxxuti fi kwalunkwe lingwa li din il-paġna ssostni, u l-majuscoli/minuscoli ma jimportawx.",
     "**Il-waqfiet tal-linji tiegħi għadhom hemm wara l-importazzjoni?** Iva. Il-waqfiet tal-linji fid-djalogu huma ppreservati, sal-linji oriġinali stess.",
     "**L-ASS huwa appoġġjat?** Din il-paġna timmaniġġja SRT u VTT biss. L-ASS iġorr direttivi tal-istil — ikkonvertih għal SRT bi [[Format converter|/convert.html]] l-ewwel.",
     "**Kemm-il fajl f'daqqa?** Wieħed. Sabiex tipproċessa għexieren jew mijiet, uża [[Batch conversion|/batch.html]] (li tikkonverti l-format biss u ma tgħaddix minn fuq tabella)."
    ]
   },
   {
    "h2": "Privacy :: Privatezza",
    "ps": [
     "Il-konverżjoni taħdem kompletament fil-browser tiegħek. L-ebda kontenut ta' subtitle ma jintbagħat qatt lil server."
    ]
   },
   {
    "h2": "Għodod u gwidi relatati",
    "ps": [
     "Jekk kulma trid huwa l-pass tas-subtitle għal Excel, ara [[Convert subtitles to Excel|/guides/srt-to-excel.html]]; biex traduzzjoni għal lingwa oħra wara, [[Subtitle translation|/translate.html]]; għexieren ta' fajls f'daqqa — [[Batch conversion|/batch.html]]."
    ]
   }
  ]
 },
 "translate": {
  "seo": {
   "title": "Traduzzjoni ta' subtitles bl-AI – tella' għal esportazzjoni bilingwi – AI-SRTSub",
   "desc": "Ittraduċi subtitles bl-AI: tella' SRT/VTT/ASS, agħżel minn 100 lingwi, unifika l-ismijiet b'glossarju, esporta subtitles bilingwi. B'xejn biex tibda, tinżamm iċ-ċavetta API tiegħek stess.",
   "h1": "Kif tuża t-traduzzjoni ta' subtitles bl-AI",
   "intro": "Il-fluss tax-xogħol sħiħ għal fajl ta' subtitle wieħed, mill-upload permezz tat-traduzzjoni sal-esportazzjoni: x'hemm fuq l-iskrin, x'għandek tikklikkja, u x'tikseb f'kull pass.",
   "ctaText": "Iftaħ l-għodda tat-traduzzjoni"
  },
  "body": [
   {
    "h2": "What this tool does :: X'jagħmel dan l-għodda",
    "ps": [
     "Ittraduċi subtitles minn lingwa għ'oħra u tesporta fajl ta' subtitle lest biex jintuża. Ħtiġijiet tipiċi:"
    ]
   },
   {
    "h2": "Upload subtitles :: Tella' subtitles",
    "ps": [
     "Ikklikkja \"Choose subtitle file\" jew pasted it-test tas-subtitle direttament fil-kaxxa tal-input tax-xellug. Sitt formati huma appoġġjati: SRT, VTT, ASS, SSA, SBV u TXT. M'għandekx fajl f'idejk? Ikklikkja \"Load sample\" biex tarah fl-azzjoni. Ladarba jiġi parsed, il-kolonna tan-nofs turi tabella ta' subtitles b'indiċi, skeda ta' żmien u test tas-sors għal kull entrata."
    ],
    "img": {
     "file": "translate-upload",
     "alt": "Żona tal-importazzjoni tal-għodda tat-traduzzjoni: agħżel il-fajl tas-subtitle, kaxxa tat-twaħħil u buttuna biex tgħabbi kampjun",
     "cap": "Kolonna tax-xellug \"Import subtitles\": agħżel fajl, paste test jew tagħbija kampjun"
    }
   },
   {
    "h2": "Agħżel lingwa u stil",
    "ps": [
     "\"Lingwa tas-sors\" tista' tibqa' fuq skoperta awtomatika; il- \"lingwa fil-mira\" tintgħażel minn 100 lingwi. Ħames stili ta' traduzzjoni huma disponibbli: Ibbilanċjat (default), Konversazzjonali, Professjonali formali, Stil tad-dubbing u Personalizzat. \"Stil tad-dubbing\" jaqbel lid-djalogu tal-films u t-TV; \"Professjonali formali\" jaqbel lid-dokumentarji u l-korsijiet."
    ],
    "img": {
     "file": "translate-lang",
     "alt": "Settings tal-lingwa u tal-istil tat-traduzzjoni: lingwa tas-sors, menus drop-down tal-lingwa fil-mira u ħames stili",
     "cap": "\"Lingwa\" u \"stil tat-traduzzjoni\": is-sors jista' jiskopri awtomatikament, 75 għażliet fil-mira"
    }
   },
   {
    "h2": "Glossarju: żomm l-ismijiet konsistenti",
    "ps": [
     "L-AI ttraduċi f'lottijiet, għalhekk l-istess isem jista' joħroġ b'żewġ modi differenti f'lottijiet differenti. Ikteb regoli \"sors → irid jiġi ttradut bħala\" fil-glossarju; qabel kull lott l-għodda tiskennjah u ssegwi kull logħba. Regola waħda kull linja; il-vleġeġ jistgħu jkunu `->`, `=>`, `→` jew Tab; terminu ta' sors waħdu jfisser li żommu mhux tradutt; diversi spellings jistgħu jaqsmu rendering wieħed permezz ta' `|`. Ikklikkja \"✨ AI extract\" biex l-AI tiġbed in-nomi proprji mill-vidjow fit-tabella l-ewwel, imbagħad editja u ittraduċi."
    ],
    "img": {
     "file": "translate-glossary",
     "alt": "Żona tal-glossarju u tan-nomi proprji: kaxxa tal-input tal-glossarju b'buttuni tal-estrazzjoni tal-AI u tas-salvat",
     "cap": "Glossarju tal- \"ismijiet unifikati\": iġbed in-nomi proprji bl-AI, mgħabbin awtomatikament għal vidjows ġodda ladarba jiġu salvati"
    }
   },
   {
    "h2": "Il-proċess tat-traduzzjoni",
    "ps": [
     "Ikklikkja \"▶ Start translation\" fl-istrixxa ta' fuq. L-istrixxa tal-istat tan-nofs turi entrati, tradotti, filler ikklerjat u gruppi ta' sentenzi trans-entrati f'ħin reali; l-istrixxa tal-progress turi l-ħin stmat li fadal u t-tokens użati. Waqt li qed ittraduċi, ikklikkja kwalunkwe ċellula tat-traduzzjoni fit-tabella biex teditja t-test — il-bidliet huma maħżuna fuq il-magna tiegħek u jibqgħu ħajjin wara li tagħmel aġġornament (refresh). Agħlaq il-paġna f'nofs il-proċess u tiġi offrut li tkompli minn fejn ħallejtha. Meta sentenza waħda tifrex diversi entrati, il-grupp jiġi magħqud, tradutt u mimli mill-ġdid skont it-tul."
    ],
    "img": {
     "file": "translate-workspace",
     "alt": "Spazju tax-xogħol tat-traduzzjoni: strixxa tal-istat, strixxa tal-progress u tabella tas-subtitles li tista' tiġi editjata",
     "cap": "Spazju tax-xogħol tan-nofs: strixxa tal-istat + strixxa tal-progress + tabella tas-subtitles ikklikkja-biex-teditja"
    }
   },
   {
    "h2": "Export :: Esportazzjoni",
    "ps": [
     "Fil-kolonna tal-lemin agħżel il-forma tal-kontenut l-ewwel: traduzzjoni biss (monolingwi), bilingwi bl-oriġinal fil-quċċata, jew bilingwi bit-traduzzjoni fil-quċċata; imbagħad il-format tal-fajl: SRT, WebVTT, SBV, ASS jew TXT. L-għażla tal-ASS żżid żewġ tqassim (layouts): skrins maqsuma fuq/isfel u linji f'munzell fil-qiegħ. Il-kontenut u l-format jingħaqdu liberament fi 14 stili ta' esportazzjoni. Il-wisa' tal-linja bilingwi hija ssettjata separatament. Ikklikkja \"Download subtitles\" biex issalva l-fajl, jew \"Copy to clipboard\" biex twaħħalha mill-ewwel."
    ],
    "img": {
     "file": "translate-export",
     "alt": "Pannell tal-esportazzjoni: tliet forom ta' kontenut, ħames formati ta' fajls u settings tal-wisa' tal-linja bilingwi",
     "cap": "Esportazzjoni tal-kolonna tal-lemin: agħżel il-forma tal-kontenut l-ewwel, imbagħad il-format tal-fajl"
    }
   },
   {
    "h2": "Cost and privacy :: Spiża u privatezza",
    "ps": [
     "Il-mudell default ma jeħtieġ l-ebda reġistrazzjoni u l-ebda ċavetta — jaħdem minnufih b'kwoti għal kull talba: limitu ta' kuljum għal kull IP flimkien ma' allowance ta' kuljum għas-sit kollu. Għal lottijiet kbar, daħħal iċ-ċavetta API tiegħek stess taħt \"Translation engine\". Privatezza, skont l-avviż fuq il-paġna: is-subtitles għall-mudell default jiġu mgħoddija permezz tas-server ta' dan is-sit lill-fornitur; API personalizzata hija mmaniġġjata direttament mill-fornitur li ddaħħal, u ċ-ċavetta tibqa' fil-browser tiegħek. Il-parsing, l-ippakkjar tal-linji u t-tqassim bilingwi kollha jaħdmu lokalment fil-browser."
    ]
   },
   {
    "h2": "FAQ :: Mistoqsijiet Frekwenti",
    "ps": [
     "**Lingwi oħra mħallta mat-traduzzjoni?** L-għodda tiskopri drift fil-lingwa u terġa' ttraduċi awtomatikament; jekk ftit entrati xorta jidhru ħażin, ikklikkja ċ-ċellula u rranġaha bl-idejn.",
     "**Xi ngħidu għal-linji tal-kanzunetti?** \"Content filtering\" toffri tliet għażliet għall-lirika: ittraduċi l-lirika, żomm l-oriġinal jew ħassarha.",
     "**Traduzzjonijiet inkonsistenti tal-ismijiet?** Żid l-ispellings inkonsistenti mal-glossarju u ittraduċi mill-ġdid; il-glossarju jieħu l-prijorità fuq is-setting globali ta' \"proper-noun handling\".",
     "**Trid l-Ingliż fuq u Ċiniż taħt?** Agħżel \"Bilingual · original on top\" meta tesporta; għaċ-Ċiniż fuq u l-Ingliż taħt, agħżel \"Bilingual · translation on top\"."
    ]
   },
   {
    "h2": "Għodod u gwidi relatati",
    "ps": [
     "Format żbaljat? Ibda bi [[format conversion|/convert.html]]; l-iskeda ta' żmien mhix f'postha? Uża [[timeline adjustment|/shift.html]]; qabel ma tgħaddiha, mexxih minn ġo [[subtitle quality check|/guides/subtitle-quality-check.html]]."
    ]
   }
  ]
 },
 "translate-english-to-chinese": {
  "seo": {
   "title": "Ittraduċi Subtitles Ingliżi għaċ-Ċiniż – AI-SRTSub",
   "desc": "Ittraduċi subtitles Ingliżi għaċ-Ċiniż: tella' SRT/VTT/ASS, agħżel Simplifikat jew Tradizzjonali, u esporta subtitles Ċiniżi biss jew bilingwi. – AI-SRTSub",
   "h1": "Ittraduċi Subtitles Ingliżi għaċ-Ċiniż",
   "intro": "SRT Ingliż ġewwa, subtitles Ċiniżi (jew bilingwi Ingliż-Ċiniż) barra: tella', agħżel il-lingwa fil-mira, esporta — kollox f'paġna waħda.",
   "ctaText": "Ittraduċi subtitles Ingliżi"
  },
  "body": [
   {
    "h2": "When you need it :: Meta jkollok bżonnu",
    "ps": [
     "Is-subtitle li niżżilt huwa bl-Ingliż biss u ma tistax tlaħħaq; jew trid subtitles Ċiniżi għall-membri tal-familja li ma jaqrawx bl-Ingliż. Dak li għandek bżonn jiġi f'waħda minn tliet forom — **subtitles Ċiniżi biss**, jew subtitles bilingwi b'**Ċiniż fuq, Ingliż taħt** jew **Ingliż fuq, Ċiniż taħt** — u din l-għodda toħroġ it-tlieta kollha."
    ]
   },
   {
    "h2": "How to do it :: Kif tagħmilha",
    "ps": [
     "Iftaħ l-[[AI Subtitle Translator|/translate.html]] u niżżel il-fajl tas-subtitle Ingliż tiegħek (SRT, VTT, ASS, SSA, SBV u TXT huma kollha rikonoxxuti, jew sempliċement paste it-test). Ħalli \"Source language\" fuq skoperta awtomatika, issettja \"Target language\" għal Ċiniż Simplifikat jew Tradizzjonali, u ikklikkja \"▶ Start translating\". Meta jispiċċa, agħżel forma ta' kontenut fil-pannell tal-esportazzjoni fuq il-lemin: traduzzjoni biss (monolingwi), bilingwi · oriġinal fuq (Ingliż fuq, Ċiniż taħt), jew bilingwi · traduzzjoni fuq (Ċiniż fuq, Ingliż taħt), imbagħad agħżel format ta' fajl u niżżel."
    ],
    "img": {
     "file": "translate-export",
     "alt": "Pannell tal-esportazzjoni: traduzzjoni biss, bilingwi bl-oriġinal fuq, u bilingwi bit-traduzzjoni fuq",
     "cap": "Agħżel il-forma tal-kontenut fl-esportazzjoni: Ċiniż biss, jew bilingwi bl-Ingliż fuq / Ċiniż fuq"
    }
   },
   {
    "h2": "Two common problems :: Żewġ problemi komuni",
    "ps": [
     "**Ismijiet tradotti b'mod inkonsistenti?** L-AI ttraduċi f'lottijiet, għalhekk l-istess isem jista' joħroġ b'żewġ modi. Poġġi pari \"sors → isem tradutt\" fil-glossarju (eż. `Watson → Huasheng`) biex iżżommu uniformi kullimkien.",
     "**Subtitles li jitbiegħdu mill-istampa?** Ittraduċi l-ewwel, imbagħad irranġa l-ħin: l-istrixxa tal-għodod tal-iskeda ta' żmien fil-quċċata tal-ispazju tax-xogħol għandha kontroll globali ta' offset u scale — ara [[Subtitles drift out of sync toward the end|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "videosub": {
  "seo": {
   "title": "Estrazzjoni ta' subtitles inkorporati fil-vidjow – tracks ta' MKV / MP4 – AI-SRTSub",
   "desc": "Aqra t-tracks tas-subtitles ġewwa MKV, WebM, MP4 u MOV direttament barra u esporta SRT / VTT / ASS / TXT. L-ebda upload, l-ebda transkodifikazzjoni, kull track tal-lingwa elenkata, subtitles f'forma ta' immaġni msemmija.",
   "h1": "Kif estratt subtitles inkorporati f'vidjow",
   "intro": "Aqra t-track tas-subtitle issiġillat ġewwa MKV / MP4 direttament bħala SRT — il-vidjow qatt ma jittella', kollox jinqara fil-browser.",
   "ctaText": "Iftaħ l-estrazzjoni ta' subtitles tal-vidjow"
  },
  "body": [
   {
    "h2": "What this tool does :: X'jagħmel dan l-għodda",
    "ps": [
     "Is-subtitles jistgħu jiġu ssiġillati ġewwa fajl ta' vidjow minflok ma joqgħodu waħedhom. Biex teditja, ittraduċi jew tqabbadhom trid l-ewwel toħroġhom — dik hi l-unika ħaġa li tagħmel din il-paġna."
    ]
   },
   {
    "h2": "1 Add the video :: 1 Żid il-vidjow",
    "ps": [
     "Drag fajl ta' vidjow fl-ewwel kolonna jew ikklikkja biex tagħżel wieħed. **MKV / WebM** u **MP4 / MOV** biss huma rikonoxxuti; kontenituri oħra ma jagħtu l-ebda track.",
     "Il-fajl qatt ma jħalli l-kompjuter tiegħek — m'hemm l-ebda pass ta' upload. L-għodda taqra f'biċċiet żgħar skont l-offset, għalhekk film ta' bosta gigabytes ma jimliex il-memorja, iżda l-ewwel qari irid jiskennja l-informazzjoni tat-track darba."
    ],
    "img": {
     "file": "videosub-up",
     "alt": "Żona biex iżżid vidjow fil-paġna tal-estrazzjoni ta' subtitles inkorporati",
     "cap": "MKV / WebM u MP4 / MOV huma appoġġjati, u il-fajl qatt ma jħalli l-magna tiegħek"
    }
   },
   {
    "h2": "2 It-tracks tas-subtitles inkorporati",
    "ps": [
     "Ladarba l-qari jispicca, it-tieni kolonna telenka t-tracks tas-subtitles fil-fajl **waħda kull ringiela**, ġeneralment b'lingwa u isem tat-track (pereżempju \"Ċiniż\", \"Ingliż\", \"Forzat\"). Ikklikkja ringiela biex testrat dak it-track.",
     "Meta l-fajl ikollu track ta' subtitle wieħed biss, l-estrazzjoni tibda awtomatikament — l-ebda klikk meħtieġa.",
     "**Subtitles f'forma ta' immaġni ma jistgħux jiġu estratti**: Is-subtitles Blu-ray PGS u DVD huma stampi maħruqin fl-istream mingħajr test x'tieħu, u l-paġna tgħid hekk ċar u tond; dawk jeħtieġu OCR."
    ],
    "img": {
     "file": "videosub-track",
     "alt": "Il-lista ta' tracks tas-subtitles inkorporati, waħda kull ringiela",
     "cap": "Track wieħed kull ringiela; meta jkun hemm wieħed biss, l-estrazzjoni tibda awtomatikament"
    }
   },
   {
    "h2": "3 The result :: 3 Ir-riżultat",
    "ps": [
     "\"3 Result\" fuq il-lemin juri t-test tas-subtitle estratt, bil-format tal-esportazzjoni fuqu: **SRT / VTT / ASS / TXT**. Ikklikkja \"Download\" jew \"Copy\".",
     "Meta t-track tas-sors huwa ASS, l-intestatura tal-istil u r-riżoluzzjoni tiegħu stess jerġgħu lura bla bdil — l-esportazzjoni bħala ASS tippreservahom, filwaqt li l-esportazzjoni b'SRT iġorr it-test biss."
    ],
    "img": {
     "file": "videosub-out",
     "alt": "Iż-żona tar-riżultat bl-għażla tal-format SRT / VTT / ASS / TXT",
     "cap": "Erba' formati ta' esportazzjoni; sors ASS iżżomm l-intestatura tal-istil u r-riżoluzzjoni tagħha"
    }
   },
   {
    "h2": "Dak li jitħalla bla tmiss",
    "ps": [
     "Il-fajl tal-vidjow innifsu ma jintmess xejn — jinqara biss, l-ebda kitba, l-ebda transkodifikazzjoni, l-ebda remuxing.",
     "Il-kontenut tas-subtitles joħroġ kif inhu: l-ebda tbassir ta' encoding, l-ebda korrezzjoni tal-iskeda ta' żmien. Jekk is-subtitles estratti huma mħawwda, dik hija problema ta' encoding fit-track tas-sors — ħudha għand [[Garbled text repair|/repair.html]]."
    ]
   },
   {
    "h2": "Common questions :: Mistoqsijiet komuni",
    "ps": [
     "**Verament m'hemm l-ebda mod kif timmaniġġja subtitles f'forma ta' immaġni (PGS / DVD)?** Mhux f'din il-paġna — huma stampi mingħajr saffi ta' test. L-OCR trid tiġi l-ewwel, u din il-paġna ma tagħmilx hekk.",
     "**Is-subtitles estratti huma f'ħin żbaljat — għaliex?** Din il-paġna ma tikkoreġix l-iskedi ta' żmien; dak li joħroġ huwa dak li kien hemm. Għal offset globali jew problema ta' rata uża [[Timeline adjustment|/shift.html]].",
     "**Għaliex jieħu daqshekk żmien qabel ma jiġri xejn?** Fajl kbir irid jiġi skennjat biċċa b'biċċa għall-informazzjoni tat-track, u iktar ma jkun kbir il-fajl iktar jieħu żmien; dan iseħħ lokalment u m'għandu x'jaqsam xejn mal-konnessjoni tiegħek.",
     "**Nista' nuża din il-paġna għal fajls ta' subtitles esterni?** M'għandekx għalfejn — .srt / .ass estern imur direttament f'[[Format conversion|/convert.html]] jew għodda oħra. Din il-paġna hija għal subtitles li huma ssiġillati ġewwa vidjow."
    ]
   },
   {
    "h2": "Privacy :: Privatezza",
    "ps": [
     "Il-vidjow jinqara kompletament fil-browser: xejn ma jittella', xejn ma jiġi transkodifikat, xejn ma jgħaddi minn server. Agħlaq il-paġna u d-dejta li nqara tiġi rilaxxata."
    ]
   },
   {
    "h2": "Għodod u gwidi relatati",
    "ps": [
     "Biex ttraduċi dak li testrat mur f'[[Subtitle translation|/translate.html]], biex tagħmlu bilingwi ara [[Two ways to make bilingual subtitles|/guides/make-bilingual-subtitles.html]]; għad-differenza bejn tracks inkorporati u esterni, u liema minnhom jistgħu jiġu estratti, ara [[How to get subtitles out of a video|/guides/extract-subtitles-from-video.html]]."
    ]
   }
  ]
 },
 "vtt-to-srt": {
  "seo": {
   "title": "Konvertitur minn VTT għal SRT – Ikkonverti Subtitles WebVTT – AI-SRTSub",
   "desc": "Ikkonverti subtitles VTT (WebVTT) għal SRT għal edituri u plejers li jaċċettaw SRT biss. L-intestatura WEBVTT u l-blokok NOTE jitnaddfu awtomatikament. Jaħdem fil-browser tiegħek.",
   "h1": "VTT to SRT :: VTT għal SRT",
   "intro": "Bidel subtitles VTT (WebVTT) f'SRT: niżżel il-fajl, agħżel SRT, niżżel. L-intestatura u l-blokok tal-noti jitnaddfu u l- timestamps jerġgħu lura għan-notazzjoni b'virgola.",
   "ctaText": "Convert VTT → SRT :: Ikkonverti VTT → SRT"
  },
  "body": [
   {
    "h2": "Meta jkollok bżonn SRT lura",
    "ps": [
     "CapCut, Premiere, il-biċċa l-kbira tal-plejers tad-desktop, u għodod eqdem tas-subtitles jaċċettaw **SRT** biss. Subtitles imniżżlin mill-web jew minn YouTube ġeneralment jiġu bħala VTT — ikkonvertihom għal SRT biex timportahom direttament."
    ]
   },
   {
    "h2": "X'jitnaddaf mill-VTT",
    "ps": [
     "Il-**linja tal-intestatura WEBVTT**, il-blokok NOTE, il-blokok STYLE/REGION, u s-settings tal-cue wara l-linja tal-ħin (bħal align:start) mhumiex test tas-subtitle — jitneħħew awtomatikament; in-numerazzjoni tiġi rrestawrata u s-separatur tal-millisekondi jerġgħu lura minn punt għal virgola."
    ],
    "img": {
     "file": "convert-upload-vtt",
     "alt": "Żona ta' tella': fajl VTT mgħobbi, skopert bħala VTT",
     "cap": "Fajl b'intestatura WEBVTT jiġi skopert bħala VTT minnufih"
    }
   },
   {
    "h2": "How to convert :: Kif tikkonverti",
    "ps": [
     "Iftaħ il-[[converter|/convert.html]], niżżel il-VTT, agħżel **SRT - SubRip** bħala l-output, imbagħad ikkonverti u niżżel. It-test u l-valuri tal-ħin jibqgħu bla tmiss."
    ],
    "img": {
     "file": "convert-result-srt",
     "alt": "Riżultat tal-konverżjoni: numerazzjoni SRT b'timestamps b'virgola",
     "cap": "L-SRT ikkonvertit: numri tal-cue + timestamps b'virgola"
    }
   }
  ]
 }
};
