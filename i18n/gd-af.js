/* i18n/gd-af.js —— 43 篇指南页的af译文（由 _mkgd.js 生成，勿手改）
 * 源：_gd/af.json（Gemini 翻译，_gemgd.js 产出）
 * 结构：{ <slug>: { seo:{title,desc,h1,intro,ctaText}, body:[{h2,ps[],img}] } }
 * ⚠️ server.js 自己 require 它，不被任何 html 引用 —— 部署时必须显式加进传输列表。
 */
module.exports = {
 "ass-to-srt": {
  "seo": {
   "title": "ASS na SRT-omskakelaar – Skakel ASS/SSA-onderskrifte om – AI-SRTSub",
   "desc": "Skakel ASS- (en SSA-) onderskrifte om na plain SRT: teks en tydsberekening word onveranderd onttrek, stylmerkers bly agter. Vir sagtewatware wat slegs SRT aanvaar. Loop in jou webblaaier.",
   "h1": "ASS na SRT",
   "intro": "Verander ASS- (of SSA-) onderskrifte in SRT: los die lêer, kies SRT, laai af. Teks en tydsberekening word onveranderd onttrek; stylmerkers word nie oorgedra nie.",
   "ctaText": "Skakel ASS → SRT om"
  },
  "body": [
   {
    "h2": "Wanneer jy weer SRT benodig",
    "ps": [
     "Redigeersuites,dekodeerders, TV-spelers, vertaalnutsgoed — talle stroomaf-stappe aanvaar slegs **SRT**. Die spoggerige styl en plasing in ASS beteken niks daar nie, so plain SRT is die veiligste oorhandiging."
    ]
   },
   {
    "h2": "Wat van stylmerkers word",
    "ps": [
     "Elke ASS-aanwysing is 'n Dialogue-reël waarvan die teks dikwels oorstyr-merkers soos `{\\fonts}` vir kleur, beweging of effekte dra. Om na SRT om te skakel, **laat hierdie merkers vaar tesame met die styl**, en behou slegs teks en tydsberekening; `\\N`-reëlandskeidings word werklike reëlandskeidings. SSA-lêers is ook leesbaar."
    ],
    "img": {
     "file": "convert-result-srt",
     "alt": "Omskakelingsresultaat: SRT-nommering en teks onttrek uit ASS",
     "cap": "Die onttrekte SRT: een nommer per aanwysing, skoon teks"
    }
   },
   {
    "h2": "Hoe om om te skakel",
    "ps": [
     "Maak die [[omskakelaar|/convert.html]] oop, los die ASS-lêer daarin (.ssa werk ook), kies **SRT - SubRip** as die uitvoer, skakel dan om en laai af. Wil jy die ander pad langsaan stap? Sien [[SRT na ASS|/guides/srt-to-ass.html]]."
    ]
   }
  ]
 },
 "batch": {
  "seo": {
   "title": "Hoe om onderskrifte bondelsgewys om te skakel – Honderde in een ZIP – AI-SRTSub",
   "desc": "Stap-vir-stap: los dosyne SRT-/VTT-lêers, skakel dit om na een formaat, en laai 'n enkelvoudige ZIP af. Genommer, tydstempels genormaliseer, en ongeldige lêers word gemerk.",
   "h1": "Hoe om onderskrifte bondelsgewys om te skakel",
   "intro": "'n Hele seisoen se onderskrifte moet gewoonlik in een formaat eindig, en om hulle een vir een op te laai neem 'n ewigheid. Los almal hier, skakel hulle saam om en laai een ZIP af — lêers wat nie ontleed kan word nie, word gemerk en nooit stilletjies saamgevoeg nie.",
   "ctaText": "Open bondelomskakeling"
  },
  "body": [
   {
    "h2": "Wat hierdie nutsding doen",
    "ps": [
     "Onderskrifte vir 'n hele seisoen of 'n boksstel moet gewoonlikvorm vas wees voordat enige iets anders daarmee gedoen kan word. Hier is wat die bondelblad doen:"
    ]
   },
   {
    "h2": "Lêers byvoeg",
    "ps": [
     "Sleep verskeie onderskriflêers gelyktydig in die stippellynblok, of klik en kies verskeie in een gooi. Die lêerlys wys elkeen: ontlede lêers vertoon hul aanwysingtelling, en onontlede lêers word eenvoudig as onherkenbaar gemerk. Die boonste staaf tel die totale lêertelling, aanwysingtelling en hoeveel onherkenbaar was.",
     "⚠️ Hierdie bladsy lees slegs UTF-8. Enigiets met gebreekte kodering ('n skerm vol vraetekens of blokkies) moet eers deur [[Mojibake repair|/repair.html]] gaan."
    ],
    "img": {
     "file": "batch-list",
     "alt": "Lêerlys: naam en aanwysingtelling per lêer, onherkenbarees rooi gemerk",
     "cap": "Elke lêer gelys, en onherkenbarees op die plek gemerk"
    }
   },
   {
    "h2": "Waarna om alles om te skakel",
    "ps": [
     "Kies die teikenformaat onder \"Skakel alles om na\" — SRT of VTT. Elke lêer in die lys word dan in daardie formaat herskep: aanwysingnommers word van bo af hernommer, en tydstempels word na die teiken genormaliseer (SRT skei millisekondes met 'n komma, VTT met 'n punt).",
     "**Oorspronklike lêername word behou en slegs die uitbreiding verander**; duplikaatname kry 'n nommer bygevoeg sodat niks iets anders oorskryf nie."
    ],
    "img": {
     "file": "batch-up",
     "alt": "Teikenformaat-kieser en lysstand, met die statistiekstaaf wat lêer- en aanwysingtellings wys",
     "cap": "Kies 'n teikenformaat en elke lêer herskep homself; lêername verander slegs van uitbreiding"
    }
   },
   {
    "h2": "Verpakking en aflaai",
    "ps": [
     "Klik \"Verpak in een ZIP en laai af\" en die argief bevat elke omgeskakelde lêer. **Lêers sonder enige herkenbare aanwysings bly uit die argief** — hulle bly in die lys, gemerk, eerder as om vermeng te word asof hulle geslaag het. Sodra dit verpak is, kry jy 'n telling van hoeveel lêers binne is."
    ],
    "img": {
     "file": "batch-zip",
     "alt": "Verpakkingsarea: ZIP-aflaaiknoppie en verpakkingsresultaatboodskap",
     "cap": "Onherkenbare lêers bly uit die argief en bly gemerk in die lys"
    }
   },
   {
    "h2": "Waarom 'n lêer as onherkenbaar gemerk word",
    "ps": [
     "'n Lêer word gemerk wanneer geen aanwysings daaruit gelees kan word nie. Drie algemene redes: dit is glad nie 'n onderskrif nie (sê maar 'n dwaal-.txt-leesmy-lêer), die kodering is nie UTF-8 nie (dus lees dit as slegs vervangingskarakters), of die inhoud is platgedruk in een blok sonder tydstempels.",
     "Gemerkte lêers kan individueel hanteer word: koderingsprobleme gaan na [[Mojibake repair|/repair.html]], formaatprobleme na [[Format converter|/convert.html]] vir 'n solo-omskakeling voordat hulle teruggaan in die lys."
    ]
   },
   {
    "h2": "Vrae en antwoorde",
    "ps": [
     "**Hoeveel lêers kan ek byvoeg?** Daar is geen harde limiet nie; dit hang af van jou webblaaier se geheue, en 'n paar honderd SRT-lêers is gewoonlik fine.",
     "**Verander dit my dialoog?** Nee. Bondelomskakeling verander slegs die houerformaat — die hernommering van aanwysings en normalisering van tydstempels — nooit 'n woord dialoog nie.",
     "**Wat as ek die inhoud moet verander?** Hierdie bladsy skakel slegs formate om. Om tydsberekening groot skaal te verander, gebruik [[Timing adjustment|/shift.html]]; om formulering te verander, gebruik [[Term replacement|/glossary.html]]; albei werk lêer vir lêer.",
     "**Word ASS ondersteun?** Hierdie bladsy skakel slegs tussen SRT en VTT om. ASS dra styl — gebruik [[Format converter|/convert.html]] daarop individueel."
    ]
   },
   {
    "h2": "Privaatheid",
    "ps": [
     "Omskakeling en verpakking loop heeltemal in jou webblaaier. Geen onderskrifinhoud word ooit na 'n bediener gestuur nie."
    ]
   },
   {
    "h2": "Verwante nutsgoed en gidse",
    "ps": [
     "Wat om vir 'n hele seisoen te verander en in watter volgorde — [[Batch editing a whole season of subtitles|/guides/batch-convert-srt.html]]; meer formate vir 'n enkel lêer — [[Format converter|/convert.html]]; proeflees in 'n sigblad — [[Subtitle ⇄ table|/table.html]]."
    ]
   }
  ]
 },
 "batch-convert-srt": {
  "seo": {
   "title": "Bondelredigering van 'n hele seisoen – Wat skaal, wat nie – AI-SRTSub",
   "desc": "'n Seisoen het dikwels dieselfde verandering oral nodig: eenvormige formaat, tydstempelverskuiwing, terminologie. Hier is wat in een lopie klaarmaak, wat nie kan nie, en hoe om lêers te hanteer wat nie ontleed nie.",
   "h1": "Bondelredigering van 'n hele seisoen van onderskrifte",
   "intro": "Wanneer dosyne onderskriflêers verander moet word, is dit gewoonlik elke keer dieselfde verandering. Om te weet watter dele in een lopie gedoen kan word, bespaar veel meer tyd as om een vir een daardeur te werk.",
   "ctaText": "Open bondelomskakeling"
  },
  "body": [
   {
    "h2": "Dit is gewoonlik oral dieselfde verandering",
    "ps": [
     "Wanneer onderskrifte verkeerd loop vir 'n hele seisoen, het elke episode selde sy eie privaat probleem — dit is gewoonlik een oorsaak wat op elke episode land: dieselfde vrystellingsgroep het almal gekodeer (sodat formaat en watermerke ooreenstem), almal is op dieselfde video-weergawe getimeer (sodat die verskuiwingsrigting en -hoeveelheid ooreenstem), of transliterasies het oor die seisoen uitmekaar gedryf.",
     "Toets eers twee episodes vlugtig — een vroeg, een laat — en bevestig dat dit regtig **dieselfde probleem** is voordat jy iets bondel. As die twee verskil, is dit nie iets wat bondeling kan regmaak nie."
    ]
   },
   {
    "h2": "Wat in een lopie gedoen kan word",
    "ps": [
     "Om **die formaat te vereenvoudig** is die enigste ding wat werklik in een lopie klaarmaak: sleep dosyne SRT- en VTT-lêers saam in [[Batch conversion|/batch.html]], kies die teikenformaat en laai een ZIP af. Hernommering en tydstempelnormalisering gebeur in daardie selfde stap, en nie een woord dialoog verander nie."
    ],
    "img": {
     "file": "batch-list",
     "alt": "Bondelblad-lêerlys: aanwysingtelling per lêer, onherkenbarees rooi gemerk",
     "cap": "Eenvormige formaat is die een ding wat werklik in 'n enkele lopie klaarmaak"
    }
   },
   {
    "h2": "Wat lêer vir lêer gedoen moet word",
    "ps": [
     "Hierdie het geen bondeltoegangspunt nie en benodig 'n lopie per lêer — hoewel daar gewoonlik 'n eweknie is wat **slegs een keer gedoen hoef te word en dan op die hele seisoen van toepassing is**:"
    ]
   },
   {
    "h2": "Kry die volgorde reg",
    "ps": [
     "Wanneer verskeie dinge gedoen moet word, beteken die verkeerde volgorde oordoen. Gaan in hierdie volgorde te werk:",
     "**Herstel kodering** → **vereenvormig formaat** → **verander inhoud** (watermerke, terminologie, tydsberekening) → **gehaltebeheer laaste**. Om formate om te skakel voordat kodering herstel is, gee jou net mojibake in 'n ander houer; om inhoud te verander voordat formate vereenvoudig is, beteken dat jy met inkonsistente nutsgoedondersteuning werk."
    ],
    "img": {
     "file": "batch-zip",
     "alt": "Verpakkingsarea: ZIP-aflaaiknoppie en resultaatboodskap",
     "cap": "Vereenvoudig formate eerste, verander inhoud daarna"
    }
   },
   {
    "h2": "Hantering van lêers wat nie herken is nie",
    "ps": [
     "Lêers wat as onherkenbaar gemerk word in bondelomskakeling word uit die ZIP gelaat en bly in die lys. Drie algemene redes: dit is nie 'n onderskriflêer nie ('n dwaal-leesmy-lêer), die kodering is nie UTF-8 nie, of die inhoud is platgedruk in een blok sonder tydstempels.",
     "Koderingsprobleme gaan individueel na [[Mojibake repair|/repair.html]]; formaatprobleme na [[Format converter|/convert.html]] voordat hulle teruggesit word in die lys. **Moenie onherkenbare lêers in die argief forseer net om die telling op te stoot nie** — om te ontdek dat 'n episode in jou speler ontbreek, kos veel meer as die minuut wat dit bespaar."
    ]
   },
   {
    "h2": "Verwante nutsgoed en gidse",
    "ps": [
     "Die volledige bondelstap-vir-stap-gids — [[How to batch convert subtitles|/guides/batch.html]]; eenvormige tydstempelverskuiwings — [[How to adjust subtitle timing|/guides/shift.html]]; 'n laaste lopie voor aflewering — [[Subtitle QC|/qc.html]]."
    ]
   }
  ]
 },
 "bilingual": {
  "seo": {
   "title": "Hoe om tweetalige onderskrifte te skei of saam te smelt – AI-SRTSub",
   "desc": "Vier maniere om tweetalige onderskrifte te stroop: behou slegs een snit, skei in twee lêers, of smelt saam in een tweereëlige inskrywing. Beide vorms word outomaties gedetecteer, in jou webblaaier.",
   "h1": "Hoe om tweetalige onderskrifte te stroop",
   "intro": "Wil jy tweetalige onderskrifte skei, saamgesmelt of net een snit behou? Hierdie gids behandel al vier modusse: hoe opsporing werk, watter modus om te kies, en wat jy met uitvoer kry.",
   "ctaText": "Open die Tweetalige Onderskrifstroaper"
  },
  "body": [
   {
    "h2": "Waarvoor hierdie nutsding is",
    "ps": [
     "Jy het tweetalige onderskrifte maar wil net een van die snitte hê — of andersom, jy wil die twee snitte skei of saamvoeg:"
    ]
   },
   {
    "h2": "Hoe dit tweetalige inhoud opspoor",
    "ps": [
     "Dubbelsnit- tweetalige onderskrifte kom in twee algemene vorms voor, en die nutsding herken elkeen — **sonder om die taal te raai**: **Vorm A (een inskrywing, twee reëls)** skei snitte volgens skryfstelsel — kana, hangul, hanzi, Latyns en ander stelsels, tien in totaal; twee verskillende stelsels beteken tweetalig, en watter een ook al eerste verskyn, tel as die oorspronklike. 'n Enkele stelsel (bv. 'n lang Chinese reël wat in twee gevou is) word as eenstalig behandel en onveranderd gehou. **Vorm B (twee afsonderlike inskrywings met identiese tydsberekening)** skei snitte volgens posisie — die twee inskrywings by dieselfde tydstempel vorm 'n paar, die eerste een tel as die oorspronklike, en kombinasies wat die Latynse alfabet deel, soos Engels-Frans of Engels-Duits, word ook korrek geskei. Wanneer geen tweetalige inhoud opspoor word nie, word die moduskieser en die Start-knoppie grys gemaak tesame met 'n duidelike kennisgewing, sodat dit nooit dwingend in verkeerde resultate skei nie."
    ]
   },
   {
    "h2": "Die vier modusse",
    "ps": [
     "Kies een van vier in die \"Watter een wil jy hê?\"-aftreklys: **Behou slegs oorspronklike** en **Behou slegs vertaling** lewer elk een lêer; **Skei in twee** lewer 'n oorspronklike lêer en 'n vertalingslêer, met lêername wat outomaties getag word `.orig` / `.dst` om oorskrywings te voorkom; **Smelt saam in een tweereëlige inskrywing** verander elke paar in 'n tweetalige inskrywing — oorspronklike op die een reël, vertaling op die ander — terwyl eenstalige pare onveranderd gehou word en geen tweede reël uitgedink word nie. Wanneer jy modusse of uitvoerformate verander, word bestaande inhoud outomaties herbegin — dit is nie nodig om weer Start te klik nie."
    ],
    "img": {
     "file": "bilingual-modes",
     "alt": "Moduskeuse in die tweetalige stroaper: behou oorspronklike, behou vertaling, skei in twee, smelt saam in een tweereëlige inskrywing",
     "cap": "Vier modusse: behou een snit, skei in twee, of smelt saam in een tweereëlige inskrywing"
    }
   },
   {
    "h2": "Invoer en uitvoer",
    "ps": [
     "Lees sewe formate — SRT, VTT, ASS, SSA, SBV, LRC, TXT (lêeruitbreiding eerste, inhoudsnuffeling as rugsteun) — en voer vier uit: SRT, VTT, ASS, TXT. Enige invoer-uitvoer-kombinasie werk, sodat kruisformaat-omskakeling langs die pad plaasvind. ASS `\\N`-reëlandskeidings word na werklike reëlandskeidings herstel, en effekmerkers word gestroop by kruisformaat-uitvoer."
    ]
   },
   {
    "h2": "Resultate en uitvoer",
    "ps": [
     "Resultate word ten volle vertoon in 'n leesalleen-teksblok, elke lêer met aanwysingtelling en totale duurstatistieke; die Aflaai- en Kopieer-knoppies neem die lêer direk weg. Die resultategebied is 'n voorskou — daar is geen redigering van teks of tydsberekening hier nie. Om veranderinge aan te bring, voer eers uit, gebruik dan die ooreenstemmende nutsding."
    ],
    "img": {
     "file": "bilingual-result",
     "alt": "Die stroopresultategebied: leesalleen-voorskou, aanwysingtellingstatistieke, en aflaai-/kopieerknoppies",
     "cap": "Volteksvoorskou + aanwysing- en duurstatistieke + aflaai en kopieer"
    }
   },
   {
    "h2": "Vrae en antwoorde",
    "ps": [
     "**Een inskrywing het Engels op een reël en Frans op die ander — waarom wil dit nie skei nie?** Vorm A skei snitte volgens skryfstelsel, so twee tale wat een stelsel binne 'n enkele inskrywing deel, kan nie geskei word nie. Herstruktureer dit as Vorm B (twee inskrywings op dieselfde tydlyn) en posisiegebaseerde skeiding werk.",
     "**Slegs een lêer in die aflaai?** \"Behou slegs oorspronklike\", \"Behou slegs vertaling\" en \"Smelt saam in een tweereëlige inskrywing\" lewer elk 'n enkelvoudige lêer per ontwerp; slegs \"Skei in twee\" gee jou twee, getag `.orig` / `.dst`.",
     "**Kan ek in 'n bondel verwerk?** Een lêer op 'n slag; toue word nie ondersteun nie.",
     "**Laai dit my onderskrifte op?** Nee — ontleding en uitvoer loop heeltemal in jou webblaaier."
    ]
   },
   {
    "h2": "Verwante gidse",
    "ps": [
     "Vir die vinnige manier om twee snitte te skei, sien [[Splitting Bilingual Subtitles into Two Tracks|/guides/split-bilingual-subtitles.html]]; vir hoe tweetalige onderskrifte gemaak word, sien [[Two Ways to Make Bilingual Subtitles|/guides/make-bilingual-subtitles.html]]; vir masjienvertaling, gebruik [[AI Subtitle Translation|/translate.html]]."
    ]
   }
  ]
 },
 "clean": {
  "seo": {
   "title": "Onderskrifskoonmaker – verwyder watermerke, advertensies, SDH – AI-SRTSub",
   "desc": "Onderskrifskoonmaker: 13 reëls verwyder watermerke, advertensies, SDH-onderskrifte, HTML-merkers, duplikate; elke verandering het 'n vergelyking en kan ongedaan gemaak word. SRT/VTT/ASS, alles in-blaaier.",
   "h1": "Hoe om die onderskrifskoonmaker te gebruik",
   "intro": "Onderskrifte wat van die web af aangaai word, dra dikwels watermerke, advertensies en SDH-onderskrifte. Die skoonmaker pas 13 reëls in een lopie toe, en elke verandering het 'n vergelyking en is omkeerbaar.",
   "ctaText": "Open die onderskrifskoonmaker"
  },
  "body": [
   {
    "h2": "Wat hierdie nutsding doen",
    "ps": [
     "Afgelaaide onderskriflêers dra dikwels dinge wat hulle nie moet nie. Die skoonmaker stroop dit in een reëlgebaseerde lopie:"
    ]
   },
   {
    "h2": "Oplaai en opspoor",
    "ps": [
     "Sleep 'n lêer in of klik om op te laai — SRT-, VTT-, ASS-, SSA- en TXT-lêers word ondersteun — of plak onderskrifteks direk. Kodering word outomaties gedetecteer: as UTF-8-dekodering vervangingskarakters lewer, val dit terug na GBK of Big5, en die bladsy wys \"{encoding} kodering reggemaak\". As jy tweetalige onderskrifte oplaai (twee identiese tydroosters, een Chinees en een Engels), word dit saamgesmelt in een tweetalige snit met 'n \"oorspronklik bo / vertaling bo\"-skakelaar."
    ]
   },
   {
    "h2": "Konfigurasie van die 13 reëls",
    "ps": [
     "Die koppelvlak het vier groepe met 13 merkblokkies: **Merker en formatering** (ASS-effekte, HTML-merkers, beheertekens, hernommer na sortering), **SDH en klankeffekte** (SDH-onderskrifte, sprekeretikette, suiwer liriekreëls), **Watermerke en rommelinskrywings** (watermerke en advertensies, duplikaatinskrywings, leë inskrywings), **Teksherestellings** (leestekens en spasiëring, alle-hoofletters-herstel, smelt kort reëls saam). Slegs \"verlieslose en sekere\" items is by verstek aan; items wat inhoud kan laat val (liriekreëls, hoofletters-herstel, smelt kort reëls saam) is af — merk dit wanneer nodig. Elke item het 'n ⓘ-aanwyswenk, en enige merkblokkieverandering word onmiddellik weer uitgevoer."
    ],
    "img": {
     "file": "clean-opts",
     "alt": "Skoonmaakopsies-koppelvlak: vier groepe van 13 merkblokkies, aktiewe telling bo wys",
     "cap": "Vier groepe, 13 reëls; slegs verlieslose items by verstek aan, veranderinge pas onmiddellik toe"
    }
   },
   {
    "h2": "Veranderingsvergelyking en ongedaan maak",
    "ps": [
     "Resultate word nie direk oorskryf nie: elke verandering word gelys in 'n vergelykingstabel met 'n reëlmerker (waarom hierdie inskrywing bewerk of verwyder is). Wil jy een terug hê? Klik \"Herstel\" op daardie ry; \"Herstel alles\" bring alles in een klik terug, en om dit weer te klik pas die volledige skoonmaak weer toe. Die statistiekstaaf wys tellings vir oorspronklik / skoon / verwyder / gewysig / herstel."
    ],
    "img": {
     "file": "clean-diff",
     "alt": "Veranderingsvergelykingtabel: indeks, tyd, oorspronklike vs skoon teks, reëlmerker op elke ry",
     "cap": "Elke verandering dra 'n reëlmerker; herstel enkelrye of alles gelyktydig"
    }
   },
   {
    "h2": "Voorskou en uitvoer",
    "ps": [
     "Wissel tussen \"Skoon / Oorspronklik\"-aansigte. In die oorspronklike aansig word verwyderde inskrywings deurgehaal en as \"Verwyder\" gemerk, en die uitgevoerde lêer stem presies ooreen met die voorskou. Uitvoerformate: SRT (verstek), VTT, ASS (beskikbaar wanneer die bron ASS is, met die stylgedeelte onveranderd behoue), en plain-text TXT sonder tydroosters. Die lêernaam kry outomaties 'n `.clean`-merker."
    ],
    "img": {
     "file": "clean-preview",
     "alt": "Volteksvoorskou: skoon en oorspronklike aansigte met 'n statistiekstaaf wat tellings wys",
     "cap": "Twee voorskou-aansigte, wat jy sien is wat jy kry"
    }
   },
   {
    "h2": "Vrae en antwoorde",
    "ps": [
     "**Sal dit normale dialoog per ongeluk verwyder?** Die watermerkreël stroop eers watermerkreëls (en behou dialoogleërs binne tweetalige inskrywings) en verwyder slegs die hele inskrywing as spore oorbly; SDH-verwydering raak slegs hakie-inhoud met SDH-sleutelwoorde wat 40 karakters of korter is — gewone hakiedialoog bly staan.",
     "**Hoe word suiwer liriekreëls onderskei van lirieke binne dialoog?** Slegs inskrywings waarvan elke enkele reël in ♪ musieknote of merkers soos [music] toegemaak is, word verwyder; dialoog wat lirieke bevat, word behou.",
     "**Kan sprekeretikette Chinese teks tref?** Slegs 'n naam in alle-hoofletters-alfanumeriese karakters aan die begin van 'n reël gevolg deur 'n dubbelpunt (soos `GEORGE:`) pas; Chinese dubbelpunt-sinne doen dit nooit.",
     "**Kan ek meervoudige lêers gelyktydig skoonmaak?** Nee — een lêer per lopie. Laai die resultaat af, en laai dan die volgende een op."
    ]
   },
   {
    "h2": "Privaatheid",
    "ps": [
     "Skoonmaak loop heeltemal in jou webblaaier; geen onderskrifinhoud word ooit na 'n bediener gestuur nie."
    ]
   },
   {
    "h2": "Verwante nutsgoed en gidse",
    "ps": [
     "Vir 'n kort stap-vir-stap-gids wat fokus op die verwydering van watermerke en advertensies, sien [[remove subtitle ads and watermarks|/guides/remove-subtitle-ads.html]]; voer jou lêer deur die [[subtitle quality check|/guides/subtitle-quality-check.html]] voordat jy dit oorhandig; om formate te verander, gebruik [[format conversion|/convert.html]]."
    ]
   }
  ]
 },
 "convert": {
  "seo": {
   "title": "Hoe om onderskrifformate te omskep (SRT, VTT, ASS, SBV, LRC, TXT) – AI-SRTSub",
   "desc": "'n Geïllustreerde deurloop van die omskakelaar: laai 'n lêer, kyk na die bespeurde formaat, kies die uitsetformaat, hanteer tweetalige teks en laai af. Alles loop in jou blaaier.",
   "h1": "Gids vir Onderskrifformaat-omskakelaar",
   "intro": "Hierdie gids loop van bo tot onder deur die bladsy: laai 'n onderskrif, bevestig die bespeurde formaat, kies die uitsetformaat, en laai af. Alles loop in jou blaaier — geen lêer verlaat ooit jou toestel nie.",
   "ctaText": "Maak die onderskrifomskakelaar oop"
  },
  "body": [
   {
    "h2": "Laai jou onderskrifte",
    "ps": [
     "Sleep 'n lêer in die streepblok of klik om een te kies; jy kan ook die inhoud **direk in die teksboks plak**. Die formaat word vanaf sowel die uitbreiding as die inhoud bespeur, en die resultaat word in die formaatetiket gewys."
    ],
    "img": {
     "file": "convert-upload",
     "alt": "Oplaai-area: 'n voorbeeld-SRT gelaai, as SRT bespeur",
     "cap": "Die bespeurde formaat wys in die etiket — kyk eerste hier as jy twyfel"
    }
   },
   {
    "h2": "Kies die uitsetformaat",
    "ps": [
     "Kies die teikenformaat uit die aftreklys: ses opsies — srt, vtt, ass, sbv, lrc, txt. Om na ass om te skakel, herbou 'n vaste verstekstyl van 1920×1080 (wit teks, swart omlyning, onder middel) en **behou nie die oorspronklike lettertipes of kleure nie**; txt voer slegs teks uit, sonder tydsberekening."
    ],
    "img": {
     "file": "convert-opt",
     "alt": "Uitsetformaat-aftreklys met VTT geselekteer",
     "cap": "Die uitsetformaat volg nie die invoer nie — jy kies dit"
    }
   },
   {
    "h2": "Tweetalige hantering",
    "ps": [
     "As die lêer tweetalig is (twee lyne in een keuse teken, of ineengestrengelde tekens), word die uitleg presies soos dit is tydens omskakeling behou. Deur \"hou tweetalig\" te kies, word die twee tale in boonste en onderste lyne geskei, wat elk afsonderlik hersaamgestel word; die beheerelement is gedeaktiveer wanneer geen tweetalige teks bespeur word nie."
    ]
   },
   {
    "h2": "Skakel om en laai af",
    "ps": [
     "Druk \"Skakel om\": die resultaatskerm wys die tekengetal en totale duur, met die teks gereed om te inspekteer. Klik **Laai af** om die lêer te stoor, of **Kopieer** om die teks direk te neem. Omskakeling verander nooit enige tydsberekeningswaardes nie — dit herskryf slegs die formaat. Om tekens te herstruktureer, gebruik die [[tydsberekeningsinstrument|/shift.html]]."
    ],
    "img": {
     "file": "convert-result",
     "alt": "Resultaatvenster: tekengetal en totale duur met aflaai- en kopieerknoppies",
     "cap": "6 tekens, 0:23 totaal — kyk vinnig deur die teks voordat jy dit aflaai"
    }
   }
  ]
 },
 "extract": {
  "seo": {
   "title": "Onttrekking van platte teks uit onderskrifte – Twee uitlegte, vyf skoonmaaksels – AI-SRTSub",
   "desc": "Onttrek dialoog uit onderskrifte as skoon platte teks: deurlopende paragrawe of een lyn per teken, en wat die vyf skakelaars vir SDH-tekens, watermerke, duplikate, voorvoegsels en lirieke verwyder.",
   "h1": "Hoe om platte teks uit onderskrifte te onttrek",
   "intro": "Trek die dialoog uit 'n onderskriflêer as skoon platte teks: tekengetalle, tylyne en styltags word outomaties gestroop, sodat die resultaat soos 'n artikel lees of as 'n dialooglys dien.",
   "ctaText": "Maak die platte-teks-onttrekker oop"
  },
  "body": [
   {
    "h2": "Wat hierdie hulpmiddel doen",
    "ps": [
     "Slegs die dialoog in 'n onderskriflêer is belangrik vir 'n leser; die res is struktuur wat vir 'n speler bedoel is — tekengetalle, tylyne, styltags. Hierdie bladsy verwyder die struktuur en behou die woorde."
    ]
   },
   {
    "h2": "Val dit in, nie net laai op nie",
    "ps": [
     "Die \"1 Voeg onderskrifte by\"-kolom aan die linkerkant aanvaar 'n oorgelaaide lêer, en jy kan ook onderskrifinhoud direk in die teksboks plak. As jy die verkeerde lêer gekies het, klik \"Vee uit\" en begin oor.",
     "Hierdie bladsy lees lêers as UTF-8. As die onderskrifte as 'n muur van vraastekens of blokkies oopmaak, is die kodering stukkend — skakel dit eers om na UTF-8 in [[Herstel van verwronge teks|/repair.html]], en kom dan terug."
    ],
    "img": {
     "file": "extract-up",
     "alt": "Die voeg-onderskrifte-area van die platte-teks-onttrekker",
     "cap": "Laai 'n lêer op, of plak onderskrifinhoud direk in die teksboks"
    }
   },
   {
    "h2": "Keuse tussen die twee uitlegte",
    "ps": [
     "Bo aan \"2 Onttrekkingsopsies\" is die uitleg: **Deurlopende paragrawe** breek teks by pouses en sin-eindpunksie sodat dit soos 'n artikel lees; **Een lyn per teken** gee een lyn per onderskrifinskrywing, wat een-tot-een ooreenstem met die inskrywings van die oorspronklike lêer.",
     "Om dialoog vir notas te kopieer, vertaling te oefen of dit as prosa te lees, vereis deurlopende paragrawe; die bou van 'n dialoogblad, die vergelyking lyn vir lyn met die oorspronklike of die voeding van 'n ander hulpmiddel vereis een lyn per teken."
    ],
    "img": {
     "file": "extract-opt",
     "alt": "Die uitleg- en skoonmaakskakelaars onder onttrekkingsopsies",
     "cap": "Kies een uitleg; die vyf skakelaars hieronder bepaal watter soort inhoud verwyder word"
    }
   },
   {
    "h2": "Wat elk van die vyf skoonmaaksels verwyder",
    "ps": [
     "**Verwyder SDH-tekens**: skrap klankbeskrywings tussen hakies soos \"(voetstappe)\" of \"[musiek]\" en behou die dialoog.",
     "**Verwyder watermerke en advertensies**: laat lyne soos fansub-krediete, URL's en kanaalhandvatsels val.",
     "**Verwyder duplikaatbure**: wanneer dieselfde sin twee keer agtereenvolgens verskyn ('n afspeelglitch) word slegs een kopie behou; duplikate verder uit mekaar dra betekenis en word met rus gelaat.",
     "**Verwyder sprekerselemente**: \"JAN: Hallo\" word \"Hallo\". Verstek is af — teks in draaiboekstyl moet wys wie praat.",
     "**Slaan lirieklyne oor**: lyne wat heeltemal \"♪ … ♪\" is, word oorgeslaan. Verstek is af — lirieke is ook woorde."
    ],
    "img": {
     "file": "extract-clean",
     "alt": "Die vyf skoonmaakskakelaars en hul beskrywings onder onttrekkingsopsies",
     "cap": "Elke skakelaar sê wat dit aan sy regterkant verwyder; merk dieenes wat jy benodig"
    }
   },
   {
    "h2": "Neem die resultaat weg",
    "ps": [
     "Die \"3 Resultaat\"-kolom aan die regterkant wys die onttrokke teks lewendig en hersat dit sodra jy 'n opsie verander.",
     "Wanneer jy tevrede is, klik \"Laai af\" om 'n .txt te stoor of \"Kopieer\" om die teks saam met jou te neem. Vir tale wat nie woorde met spasies skei nie, soos Chinees en Japannese, volg samevloeiing van lyne ander reëls, en die hulpmiddel hanteer dit outomaties per taal."
    ],
    "img": {
     "file": "extract-out",
     "alt": "Die resultaatsarea met die aflaai- en kopieerknoppies",
     "cap": "Die resultaat word lewendig opgedateer; laai dit af as 'n txt of kopieer dit direk"
    }
   },
   {
    "h2": "Wat ongeroerd gelaat word",
    "ps": [
     "Die dialoog self word nie herskryf nie. Die skoonmaakskakelaars bepaal slegs watter hele lyne of blokke gedrop word; hulle verander nooit die bewoording van 'n inskrywing nie.",
     "Tylyne en tekengetalle word eenvoudig nie uitgevoer nie, nie verander en dan uitgevoer nie — die oorspronklike lêer is ongeroerd, en hierdie bladsy bied nie 'n uitvoer met tylyne aan nie. Daardie taak behoort aan [[Formaatomskakeling|/convert.html]]."
    ]
   },
   {
    "h2": "Algemene vrae",
    "ps": [
     "**Bly ASS-styltags in die teks?** Nee. ASS `{}`-oorheersingsblokke word gestroop en slegs die dialoog bly oor.",
     "**Kom 'n tweetalige lêer as twee lyne of een uit?** Soveel lyne as wat die inskrywing gehad het; hierdie bladsy voeg dit nòg saam nòg breek dit op — om hulle te skei, gebruik [[Tweetalige skeuring|/bilingual.html]].",
     "**Waarom word sprekerselemente by verstek behou?** Die naam in \"JAN: Hallo\" is dikwels nuttige inligting (draaiboeke, dialoogblaaie), en die verwydering daarvan maak dit moeilik om te sê wie praat, so die keuse word aan jou oorgelaat.",
     "**Kan LRC-lirieklêers ook onttrek word?** Ja. LRC-tydmerkers word verwyder en die lirieklyne bly oor; as jy nie lirieke wil hê nie, merk \"Slaan lirieklyne oor\"."
    ]
   },
   {
    "h2": "Privaatheid",
    "ps": [
     "Onderskrifte word heeltemal in die blaaier verwerk: niks word opgelaai nie en niks gaan deur 'n bediener nie. Die teks bly slegs op die huidige bladsy en word met 'n herlaai uitgevee."
    ]
   },
   {
    "h2": "Verwante gereedskap en gidse",
    "ps": [
     "Om te verstaan wat 'n onderskriflêer werklik bevat, sien [[Wat is binne 'n SRT-lêer|/guides/srt-file-format.html]]; om die onttrokke dialoog te vertaal, gaan na [[Onderskrifvertaling|/translate.html]]; om dit in 'n tabel te omskep, gebruik [[Onderskrifte na Excel/CSV|/guides/srt-to-excel.html]]; en voer [[Kwaliteitsbeheer van onderskrifte|/qc.html]] uit voordat enige iets oorhandig word."
    ]
   }
  ]
 },
 "extract-subtitles-from-video": {
  "seo": {
   "title": "Onderskrifte uit 'n video haal – Ingebed teenoor ekstern – AI-SRTSub",
   "desc": "Wat MKV / WebM / MP4 / MOV elkeen dra, hoe teks-, ASS-, WebVTT- en mov_text-bane verskil, waarom beeldonderskrifte (PGS / DVD) geen teks het nie, en wat om te doen na ekstraksie.",
   "h1": "Onderskrifte uit 'n video haal",
   "intro": "Onderskrifte kan binne-in 'n videolêer leef of daarbuite staan. Binne is hulle 'n baan in die houer — om hulle te onttrek het niks met transkodering te make nie.",
   "ctaText": "Maak video-onderskrifte-ekstraksie oop"
  },
  "body": [
   {
    "h2": "Waar onderskrifte leef: ingebed en ekstern",
    "ps": [
     "'n Videolêer (MKV, MP4) is 'n houer wat 'n videobaan, 'n oudiobaan en onderskrifbane gelyktydig bevat. Onderskrifte wat binne-in verseël is, is **ingebed**; 'n afsonderlike .srt- / .ass-lêer wat buite sit, is **ekstern**, en 'n ingebedde baan word ook **ingemux** genoem.",
     "Eksterne onderskrifte kan gebruik word soos hulle is. Die probleem is die ingebeddes: om hulle te redigeer, te vertaal of 'n tweetalige baan uit die oorspronklike te bou, het jy geen onderskriflêer byderhand nie — jy moet eers die baan uit die houer lees. Hierdie stap is nie transkodering nie: die video word nie herenkodeer nie, slegs die data wat reeds in die houer gestoor is, word uitgelees."
    ]
   },
   {
    "h2": "Watter houer wat dra",
    "ps": [
     "Verskillende houers bevat verskillende onderskrifformate, en ekstraksiemoeilikheid verskil ook:"
    ],
    "img": {
     "file": "videosub-which",
     "alt": "Die onderskrifbane gelys deur die ingebedde-onderskrifte-ekstraksiebladsy",
     "cap": "Een baan per ry, meestal met 'n taal en 'n baannaam; wanneer daar net een is, word dit outomaties onttrek"
    }
   },
   {
    "h2": "Waarom beeldonderskrifte nie onttrek kan word nie",
    "ps": [
     "Blu-ray PGS- en DVD-onderskrifte stoor geen karakters at all nie, slegs 'n reeks beelde met 'n alfakanaal. Wanneer 'n speler dit wys, plak dit 'n prentjie, nie lewende teks nie.",
     "Daar is dus geen teks in so 'n baan om te lees nie — dit is nie dat die hulpmiddel dit nie ondersteun nie, maar dat daar geen karakters is nie. Die bladsy sê duidelik wanneer dit op een afkom.",
     "Die enigste manier om woorde te kry, is om eers die karakters in daardie beelde te herken (OCR) en onderskrifte daaruit te bou. Dit is 'n afsonderlike proses as om 'n baan uit te trek."
    ]
   },
   {
    "h2": "Wat gewoonlik na ekstraksie kom",
    "ps": [
     "Wat uitkom, is die baan soos dit was: die hulpmiddel raai nie koderinge nie en korrigeer nie tylyne nie. Dus kom twee dinge gereeld voor:",
     "Een is **verwronge teks** — 'n koderingsprobleem in die bronbaan wat net so verwronge uitkom; gaan na [[Hoe om verwronge teks te herstel|/guides/repair.html]] om die kodering te identifiseer. Die ander is **verkeerde tydsberekening** — of die bron nou 'n inleidingslogo het, al dan nie, of die raamtempo's nie ooreenstem nie, die resultaat is in sy geheel verskuif; gebruik [[Tydlynaanpassing|/shift.html]] om dit te verskuif of te skaal.",
     "Gaan daarna na [[Onderskrifvertaling|/translate.html]] om te vertaal, en sien [[Twee maniere om tweetalige onderskrifte te maak|/guides/make-bilingual-subtitles.html]] om dit tweetalig te maak."
    ],
    "img": {
     "file": "videosub-formats",
     "alt": "Die resultaatsarea met die SRT- / VTT- / ASS- / TXT-uitsetformate",
     "cap": "Onttrekte onderskrifte kan in vier formate uitgevoer word; 'n ASS-bron behou sy stylkop en resolusie"
    }
   },
   {
    "h2": "'n Paar dinge wat maklik is om verkeerd te verstaan",
    "ps": [
     "**Om onderskrifte te onttrek is nie om hulle in te brand nie.** Die video word nie herenkodeer nie, dus word beeldkwaliteit en oudio nie beïnvloed nie.",
     "**Ekstraksie beïnvloed nie die oorspronklike lêer nie.** Slegs lees, nooit geskryf nie, en nie 'n greep van die video verander nie.",
     "**Dat 'n groot lêer stadig is, is nie 'n verbindingseprioriteitsprobleem nie.** Die hulpmiddel skandeer baan-inligting stukkie vir stukkie, en hoe groter die lêer, hoe langer neem dit; alles vind plaaslik plaas.",
     "**Eksterne onderskrifte het nie hierdie bladsy nodig nie.** As jy 'n .srt / .ass het, gaan reguit na [[Formaatomskakeling|/convert.html]]; slegs onderskrifte wat binne-in 'n video verseël is, moet eers onttrek word."
    ]
   },
   {
    "h2": "Verwante gereedskap en gidse",
    "ps": [
     "Vir die volledige deurloop, sien [[Hoe om onderskrifte wat in 'n video ingebed is, te onttrek|/guides/videosub.html]]; om te vertaal wat jy onttrek, gaan na [[Onderskrifvertaling|/translate.html]]; om dit tweetalig te maak, sien [[Twee maniere om tweetalige onderskrifte te maak|/guides/make-bilingual-subtitles.html]]; vir verwronge teks begin met [[Herstel van verwronge teks|/repair.html]]."
    ]
   }
  ]
 },
 "fps-23-976-vs-25": {
  "seo": {
   "title": "Wat 23.976 / 24 / 25 / 30 fps werklik beteken – Onderskrif-tydsberekening – AI-SRTSub",
   "desc": "23.976 is nie 24 nie en 29.97 is nie 30 nie — die ontbrekende 0,1% kom van NTSC-kleur, terwyl PAL films 4% vinnig laat loop. Hoe dit jou onderskrif-tydsberekening verskuif, en hoe om daartussen om te skakel.",
   "h1": "Wat 23.976 / 24 / 25 / 30 fps werklik beteken",
   "intro": "Die 0,1%-gaping tussen 23.976 en 24 is 'n oorblyfsel uit televisiegeskiedenis. Tesame met PAL se 4% is dit die rede waarom onderskrifte al hoe verder buite sinchronisasie raak namate 'n film vorder.",
   "ctaText": "Maak tydsbrekeningaanpassing oop"
  },
  "body": [
   {
    "h2": "Wat elke nommer is",
    "ps": [
     "Raamtempo is hoeveel prente in een sekonde gewys word. Die vier wat jy die meeste teëkom:"
    ]
   },
   {
    "h2": "Waar die 0,1% vandaan kom",
    "ps": [
     "23.976 = 24 × 1000/1001, en 29.97 = 30 × 1000/1001. Daardie 1000/1001 is 'n oorblyfsel van die byvoeging van kleur by NTSC: om die kleur-subdraer in te pas sonder om bestaande swart-wit-ontvangers te breek, is die veldtempo verlaag van 60 Hz na 59.94 Hz (60 × 1000/1001), en die raamtempo het daarmee saam gedaal.",
     "Die resultaat: films word in NTSC-streke teen 23.976 uitgesaai in plaas van 24. Die verskil is 0,1%, of 3,6 sekondes oor 'n uur — skaars merkbaar op sy eie, maar moenie dit met die 4% hieronder verwar nie en moet nooit die twee in een berekening kombineer nie."
    ]
   },
   {
    "h2": "Waar die 4% vandaan kom",
    "ps": [
     "PAL-streke vertoon teen 25 fps. Films word teen 24 fps geskiet en eenvoudig teen 25 gespeel — nie een raam word bygevoeg of verwyder nie, dus loop die afspeel 4% vinniger (25/24 ≈ 1.0417). 'n Film van 100 minute duur 96 minute in sy PAL-weergawe.",
     "Dit is die wortel van **progressiewe drywing**: onderskrifte wat gemaak is teenoor die oorspronklike en video in die PAL-weergawe stem aan die begin presies ooreen en is vier minute uit mekaar teen die krediete. Geen globale verskuiwing kan dit red nie; dit moet volgens verhouding herskaal word."
    ],
    "img": {
     "file": "shift-step-rate",
     "alt": "Tydsberekeningsbladsy spoed-afdeling: die verhouding-invoerveld",
     "cap": "Herskaal volgens verhouding — een waarde dek die hele film"
    }
   },
   {
    "h2": "Hoe om om te skakel",
    "ps": [
     "Omskakeling beteken om te vermenigvuldig met 'n enkele verhouding wat oor die hele film geld:"
    ]
   },
   {
    "h2": "Om te sê watter een jy het",
    "ps": [
     "In plaas van om die verhouding te raai, vind twee oomblikke waarvan die korrekte tydsberekening jy seker van is — gewoonlik die eerste en laaste reëls dialoog — and sê vir die hulpmiddel \"hierdie reël moet by 00:00:12 wees en daardie een by 01:35:40\"; dit rek die hele film lineêr tussen daardie twee punte. Dit is \"twee-punt-ankering\", en dit benodig geen raamtempo-rekenkunde van jou af nie.",
     "Om die raamtempo self te bevestig, kyk na jou speler of 'n media-inligtingshulpmiddel. Wanneer 'n lêernaam soos `1080p.WEB` geen raamtempo-wenk dra nie, is twee-punt-ankering die veiliger roete."
    ],
    "img": {
     "file": "shift-step-two",
     "alt": "Tydsberekeningsbladsy twee-punt-anker-afdeling: twee rye tydstempel-insette",
     "cap": "Twee-punt-ankering benodig geen raamtempo nie — net twee tydstempels"
    }
   },
   {
    "h2": "Verwante gereedskap en gidse",
    "ps": [
     "Raamtempo-omskakeling self — [[Onderskrif-raamtempo-omskakeling|/guides/srt-fps-converter.html]]; spoedaanpassing — [[Onderskrif-spoedomskakeling|/guides/subtitle-speed-converter.html]]; onseker of dit 'n globale verskuiwing of progressiewe drywing is — [[Onderskrifte wat verder buite sinchronisasie dryf|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "glossary": {
  "seo": {
   "title": "Termvervanging in 'n grensels in onderskrifte – Een tabel los 'n lêer op – AI-SRTSub",
   "desc": "Een reël per reël, geskei deur -> , => , → of Tab, met # vir opmerkings. Volledige woord-pasvorm, hooflettergevoeligheid, eerste of tweede reël van 'n tweetalige teken, elke verandering gelys en omkeerbaar.",
   "h1": "Hoe om terme in onderskrifte joernaal te vervang",
   "intro": "Een termtabel maak die bewoording van 'n hele onderskriflêer in een slag konsekwent — tylyne, ASS-style en VTT NOTE-blokke word nie met 'n enkele karakter aangeraak nie.",
   "ctaText": "Maak bondeltermy-vervanging oop"
  },
  "body": [
   {
    "h2": "Wat hierdie hulpmiddel doen",
    "ps": [
     "Dieselfde woord op twee verskillende maniere vertaal, name en plekke wat met masjienvertaling wegdryf, iemand anders se onderskrifte wat by jou eie konvensies moet pas — al hierdie deel een eienskap: wat verander is 'n woord, nie die struktuur nie. Hierdie bladsy verander slegs woorde."
    ]
   },
   {
    "h2": "Twee insette: onderskrifte en 'n termtabel",
    "ps": [
     "Die \"1 Voeg onderskrifte by\"-kolom aan die linkerkant neem 'n onderskriflêer, of jy kan die inhoud direk plak; as jy die verkeerde lêer gekies het, klik \"Vee uit\".",
     "Die \"2 Termtabel\"-kolom aan die regterkant hou die reëls. **Een reël per reël**, met die ou term en die nuwe term geskei deur `->` , `=>` , `→` of 'n Tab — al vier werk. Reëls wat met `#` begin, is opmerkings en neem geen deel aan vervanging nie.",
     "As jy onseker is oor die formaat, klik \"Vul 'n voorbeeld in\" en redigeer dit."
    ],
    "img": {
     "file": "glossary-up",
     "alt": "Die voeg-onderskrifte-area en die termtabel-inset van die termvervangingsbladsy",
     "cap": "Onderskrifte aan die linkerkant, reëls aan die regterkant; een reël per reël, ou term en nuwe term geskei deur ->"
    }
   },
   {
    "h2": "Hoe om die termtabel te skryf",
    "ps": [
     "Een reël per reël: die huidige term aan die linkerkant, wat dit aan die regterkant moet word. Byvoorbeeld `Thor -> Donar` vervang elke \"Thor\" in die lêer met \"Donar\".",
     "Opmerkings begin met `#` en is handig om 'n groep reëls te etiketteer (byvoorbeeld \"# seisoen 1 naamfoute\"), en om 'n reël tydelik af te skakel — plaas net 'n `#` voor in plaas daarvan om dit te verwyder.",
     "Reëls loop van bo na onder; teks wat deur een reël geproduseer word, word weer geskandeer deur die reëls daaronder. Wanneer volgorde saak maak (sê nou, vervang eers A met B en dan B met C), hou dit in gedagte."
    ],
    "img": {
     "file": "glossary-table",
     "alt": "Reël na reël van vervangingsreëls in die termtabel-inset",
     "cap": "Een reël per reël; reëls wat met # begin, is opmerkings en kan 'n reël tydelik afskakel"
    }
   },
   {
    "h2": "Wat die drie skakelaars doen",
    "ps": [
     "**Omvang**: `all` / `first line only` / `second line only`. In 'n tweetalige lêer, kies \"slegs tweede reël\" wanneer jy net die vertaling wil verander; inskrywings wat net een reël het, bly onaangeraak onder enige enkelreël-instelling — die hulpmiddel raai nie watter kant die oorspronklike is nie.",
     "**Hele woord**: vervang slegs terme wat as 'n woord staan, sodat `art` nie `start` sal aanraak nie. Vir tale wat nie woorde met spasies skei nie, soos Chinees en Japannese, het hierdie skakelaar geen effek nie — vervanging werk op subreekse daar.",
     "**Hooflettergevoelig**: by verstek af, sodat `CEO` en `ceo` albei vervang word; wanneer gemerk, word slegs dieselfde spelling vervang."
    ],
    "img": {
     "file": "glossary-opt",
     "alt": "Die omvang-, hele-woord- en hooflettergevoelige skakelaars onder die termtabel",
     "cap": "Omvang besluit watter reël verander; hele woord en hoofletter besluit hoe streng 'n term gepas word"
    }
   },
   {
    "h2": "Elke verandering gelys, elke verandering omkeerbaar",
    "ps": [
     "\"3 Resultaat\" wys die vervangende onderskrifte en **lys ook elke verandering**: watter teken, watter reël, van wat na wat.",
     "As jy nie een daarvan wil hê nie, klik daarop in die lys om net daardie inskrywing om te keer — geen nodigheid om die termtabel te redigeer en weer te laat loop nie. Wanneer jy tevrede is, klik \"Laai af\" of \"Kopieer\"."
    ],
    "img": {
     "file": "glossary-out",
     "alt": "Die resultaatsarea met die lys van individuele veranderinge",
     "cap": "Elke verandering is gelys; klik een wat jy nie wil hê om dit om te keer nie"
    }
   },
   {
    "h2": "Wat ongeroerd gelaat word",
    "ps": [
     "**Tylyne, ASS-stylreëls en VTT `NOTE`-blokke word nie met 'n enkele karakter aangeraak nie.** Vervanging geld slegs vir dialoogteks, nooit vir strukturele reëls nie.",
     "Die termtabel wysig nooit jou onderskriflêer outomaties nie — die resultaat is 'n nuwe uitvoer en die oorspronklike bly soos dit is."
    ]
   },
   {
    "h2": "Algemene vrae",
    "ps": [
     "**Waarom is 'n term nie vervang nie?** Gaan eers die omvang na: met \"slegs tweede reël\" geselekteer, bly inskrywings wat net een reël het, onaangeraak. Gaan dan hele-woord-passing na, wat passings stop wat nie selfstandige woorde is nie.",
     "**Waarom vervang Chinees steeds subreekse met hele-woord-passing gemerk?** Dit word verwag. Chinees en Japannese skei nie woorde met spasies nie, dus kan die hulpmiddel nie woordgrense bepaal nie en het hele-woord-passing geen effek daar nie.",
     "**Hoe rol ek alles terug na 'n fout?** Keer inskrywings een vir een in die veranderingslys om; om heeltemal oor te begin, maak die termtabel skoon en voeg die onderskrifte weer by.",
     "**Kan ASS-stylreëls per ongeluk verander word?** Nee. Stylreëls en `NOTE`-blokke is buite omvang; slegs dialoogteks neem deel."
    ]
   },
   {
    "h2": "Privaatheid",
    "ps": [
     "Onderskrifte en die termtabel word heeltemal in die blaaier verwerk: niks word opgelaai nie en niks gaan deur 'n bediener nie. Die termtabel word nie gestoor nie, dus is dit leeg die volgende keer as jy die bladsy oopmaak."
    ]
   },
   {
    "h2": "Verwante gereedskap en gidse",
    "ps": [
     "Of jy 'n termtabel moet bou en hoe om een oor 'n seisoen te handhaaf, sien [[Termtabelle: om 'n seisoen konsekwent te hou|/guides/subtitle-glossary.html]]; as die inhoud vuil is (watermerke, SDH-tekens), voer eers [[OnderskriFSkoonmaak|/clean.html]] uit; sodra die name vasgestel is en jy ander tale benodig, gaan na [[Onderskrifvertaling|/translate.html]]; en voer die resultaat deur [[Kwaliteitsbeheer van onderskrifte|/qc.html]]."
    ]
   }
  ]
 },
 "hanconv": {
  "seo": {
   "title": "Vereenvoudigde na Tradisionele Subtitelomskakeling – Taiwan vs Hong Kong – AI-SRTSub",
   "desc": "Deurloop van die nege rigtings: Taiwanese met of sonder streekswoordeskat, Hong Kong as sy eie geur, alles omskakelbaar terug na vereenvoudig. Slegs dialoog verander; tye bly staan.",
   "h1": "Hoe om vereenvoudigde en tradisionele Sjinese subtitels om te skakel",
   "intro": "Of 'n subtitel na Taiwan, Hong Kong of die vasteland gaan, verander beide woordkeuse en karaktervorms. Nege rigtings om van te kies, en slegs dialoog word omgeskakel — tye, indekssommers en ASS-stylreëls word nooit aangeraak nie.",
   "ctaText": "Maak die omskakelaar oop"
  },
  "body": [
   {
    "h2": "Wat hierdie hulpmiddel doen",
    "ps": [
     "Om tussen vereenvoudig en tradisioneel om te skakel is nie net om elke karakter anders te skryw nie. Dieselfde vereenvoudigde woord stem ooreen met verskillende woorde in verskillende streke — die woord vir \"sagteware\" verskil tussen Taiwan en die vasteland, en Hong Kong het nog 'n weergawe. Die omskakelaar hou hierdie uit mekaar:"
    ]
   },
   {
    "h2": "Oplaai en opsporing",
    "ps": [
     "Sleep 'n lêer in of soek een — SRT, VTT, ASS en TXT word ondersteun — of plak subtitelinhoud direk in die blokkie. Die formaat word outomaties opgespoor en langs \"Opgespore formaat\" gewys."
    ],
    "img": {
     "file": "hanconv-up",
     "alt": "Omskakelaar se ooplaaigebied: sleepgebied en plakblokkie, met die opgespore formaat bo",
     "cap": "SRT / VTT / ASS / TXT, formaat outomaties opgespoor"
    }
   },
   {
    "h2": "Keuse tussen die nege rigtings",
    "ps": [
     "Die nege rigtings onder \"Skakel om na\" val in drie groepe. **Vereenvoudig → tradisioneel**: generiese tradisioneel, Taiwanese (verander woordgebruik), Taiwanese (slegs tekens), Hong Kong. **Tradisioneel → vereenvoudig**: generies, vanaf Taiwanese, vanaf Hong Kong. **Tradisioneel na tradisioneel**: Taiwanese vorms, Hong Kong-vorms.",
     "As jy \"Taiwanese woordgebruik\" kies, word streekswoordeskat ook omgeruil: die woord vir \"sagteware\" word die Taiwanese een en dieselfde geld vir die woord vir \"inligting\"; \"Taiwanese tekens\" verander slegs hoe karakters geskryf word en laat jou woordgebruik met rus. Hong Kong is 'n heel ander saak en gebruik 'n ander woord vir \"sagteware\". Om terug na vereenvoudig om te skakel, gebruik die groep hieronder — jy moet sê van watter tradisionele verskeidenheid jy afkomstig is, want Taiwanese en Hong Kong-teks neem verskillende roetes terug."
    ],
    "img": {
     "file": "hanconv-dir",
     "alt": "Skakel om na-kaart: bestemmingsaftreklys wat \"Vereenvoudig → Taiwanese tradisioneel (verander woordgebruik)\" gekies wys",
     "cap": "Rigtings leef in die \"Skakel om na\"-aftreklys in drie groepe; hierdie een is Taiwanese met woordgebruikveranderinge"
    }
   },
   {
    "h2": "Resultaat en uitvoer",
    "ps": [
     "Die resultaatsgebied wys die omgeskakelde subtitel dadelik, met 'n statistiekbalk wat die totale reëltelling gee en hoeveel reëls verander het. As niks verander het nie, kry jy 'n wenk dat die lêer dalk geen Sjinese karakters bevat nie — slegs Han-karakters word omgeskakel, dus bly 'n heeltemal Latynse of numeriese subtitel presies soos dit was.",
     "Laai dan af of kopieer. 'n Taaletiket word in die lêernaam ingevoeg — `demo.srt` word `demo.zh-TW.srt` vir Taiwanese tradisioneel, `.zh-Hant` vir generiese tradisioneel, en `.zh-Hans` wanneer dit terug na vereenvoudig omgeskakel word."
    ],
    "img": {
     "file": "hanconv-out",
     "alt": "Resultaatsgebied: omgeskakelde subtitel en statistiekbalk",
     "cap": "Die statistiekbalk wys totale en veranderde reëltellings; laai af of kopieer hier vandaan"
    }
   },
   {
    "h2": "Wat nooit aangeraak word nie",
    "ps": [
     "Slegs dialoog word omgeskakel. Tye, indekssommers en ASS-stylreëls word glad nie aangeraak nie — die resultaat is gereed om te gebruik sonder om enige formatering te herdoen."
    ]
   },
   {
    "h2": "VGV",
    "ps": [
     "**Waarom het die omskakelaar nie die woord vir \"skoon\" verander nie?** Een-tot-baie-karterings word volgens woord opgelos: die \"skoon\"-sin en die \"droë\"-sin deel een tradisionele vorm, terwyl die \"boomstam\"-sin 'n ander een gebruik. Die tabelle kom van OpenCC, wat hele frases eerder as enkelkarakters ooreenstem.",
     "**Wat is die verskil tussen Taiwanese en Hong Kong-tradisioneel?** Die woordeskat: die woord vir \"sagteware\" verskil tussen die twee. Kies die rigting vir die streek waarna jy lewer.",
     "**Het die karaktertelling na omskakeling verander?** Slegs Han-karakters word omgeruil — geen inskrywings word bygevoeg of verwyder nie en geen tydsberekening word verskuif nie. As die reëltelling verander het, kyk of die formaat korrek opgespoor is.",
     "**Kon die woordeboek nie laai nie?** Die bladsy sê jy moet herlaai en weer probeer. Dit laai plaaslik, so dit is nie nodig om subtitels iewers op te laai nie."
    ]
   },
   {
    "h2": "Privaatheid",
    "ps": [
     "Omskakeling loop geheel en al in jou blaaier. Geen subtitelinhoud word ooit na 'n bediener gestuur nie."
    ]
   },
   {
    "h2": "Verwante hulpmiddels en gidse",
    "ps": [
     "As al wat jy nodig het vereenvoudig na tradisioneel is, sien [[Skakel vereenvoudigde subtitels na tradisioneel om|/guides/srt-simplified-to-traditional.html]]; hoekom dit oor meer gaan as net die omruil van karakters, sien [[Vereenvoudig vs tradisioneel is nie 'n karakteromruiling nie|/guides/simplified-traditional-chinese.html]]; om na 'n ander taal te vertaal, [[Subtitelvertaling|/translate.html]]."
    ]
   }
  ]
 },
 "how-to-make-lrc-file": {
  "seo": {
   "title": "Hoe om LRC-liedtekste te sinkroniseer – Een reël per liedteks, tik saam – AI-SRTSub",
   "desc": "Bou 'n LRC-lêer van voor af: plak een liedteks per reël, tik die tyd terwyl jy luister, die kortpaaie wat saak maak, wanneer om 'n reël te oorslaan, LRC of SRT, en wat om te doen wanneer tydsberekening verskuif.",
   "h1": "Hoe om LRC-liedtekste te sinkroniseer",
   "intro": "'n LRC-lêer is net \"een liedteksreël plus een tydspunt\". Om een te maak word tydsberekening genoem: om die oomblik vas te lê wat elke reël begin.",
   "ctaText": "Maak die liedteks-sinkroniseringshulpmiddel oop"
  },
  "body": [
   {
    "h2": "Wat tydsberekening eintlik is",
    "ps": [
     "Die struktuur van 'n LRC-lêer kan moeilik eenvoudiger wees: een liedteks per reël, elk voorafgegaan deur 'n `[mm:ss.xx]`-tydetiket. Wanneer 'n speler 'n reël bereik, wys dit daardie liedteks op daardie oomblik.",
     "Die hele taak om \"n LRC te maak\" is dus om 'n tydspunt aan elke liedteksreël toe te ken — en geen masjien kan dit vir jou doen nie, want besluit waar 'n reël begin om gesing te word, vereis luister."
    ]
   },
   {
    "h2": "Hoeveel passe 'n liedjie benodig",
    "ps": [
     "Dit is die moeite werd om 'n minuut daaroor na te dink voordat jy begin; dit bespaar die meeste van die oordoenwerk:"
    ],
    "img": {
     "file": "lrc-tap2",
     "alt": "Die speel-, stempel-hierdie-reël-, maak-een-reël-ongedaan- en slaan-hierdie-reël-oor-kontroles in die tik-saam-gebied",
     "cap": "Om Enter te druk tydens afspeel is die gladste; die verkeerde reël gestempel? Druk Z en stempel weer"
    }
   },
   {
    "h2": "Om die liedtekste te plak, bepaal hoe glad die res verloop",
    "ps": [
     "Plak die liedtekste een liedteks per reël; leë reëls word oorgeslaan. Die reëléindsels wat jy plak, is die reëls wat jy later sal tyDsbereken — breek dit nou in meer reëls op en jy sal later meer kere tik.",
     "Om 'n bestaande LRC te plak, werk ook: sy `[mm:ss.xx]`-tydetikette word herken, and na invoer **gaan jy voort vanaf die eerste reël sonder 'n tyd**, sodat reeds getymde reëls nie oorgedoen hoef te word nie.",
     "Dit beteken 'n halfvoltooide LRC kan gestoor word en later teruggeplak word om voort te gaan."
    ],
    "img": {
     "file": "lrc-paste2",
     "alt": "Die plak-liedtekste-gebied en die ontleed-liedtekste-knoppie",
     "cap": "Een liedteks per reël; die plak van 'n hele LRC lees die bestaande tye sodat jy kan voortgaan"
    }
   },
   {
    "h2": "Voer LRC of SRT uit",
    "ps": [
     "**Vir 'n musiekspeler, voer LRC uit.** foobar2000, allerhande spelers en toestelle met liedteksvertoning lees dit.",
     "**Om liedtekste op video te plaas of dit verder te verwerk, voer SRT uit.** Videosubtitelspore, subtitelhulpmiddels en redigeersagteware lees SRT. In die uitvoer duur elke reël tot die volgende een begin, and die laaste reël val terug na 2 sekondes.",
     "Beide voer slegs reëls uit wat 'n tyd het — oorgeslaan reëls kom nooit die lêer binne nie."
    ],
    "img": {
     "file": "lrc-export",
     "alt": "Die aflaai-LRC-, aflaai-SRT- en kopieerknoppies in die uitvoergebied",
     "cap": "LRC vir spelers, SRT vir video; slegs reëls met 'n tyd word uitgevoer"
    }
   },
   {
    "h2": "'n Paar dinge wat maklik is om verkeerd te verstaan",
    "ps": [
     "**Is alles effens uit die punt na tydsberekening? Gebruik 'n verrekening.** Voer SRT uit en verskuif dit as 'n geheel met [[Tydlynaanpassing|/shift.html]]; veel vinniger as om reël vir reël te herty.",
     "**Groei die afwyking namate die liedjie vorder? Dit is 'n tempo-probleem.** Wanneer afspeelspoed and opnamespoed verskil, groei die fout na die einde toe, en dit benodig proporsionele skaaling, nie 'n verrekening nie.",
     "**Kortpaaie voel net natuurlik as jy dit saam gebruik.** Spasie speel en pouseer, Enter stempel die huidige reël, Z maak een reël ongedaan — druk Enter direk tydens afspeel in plaas daarvan om tussen muis en sleutelbord te wissel.",
     "**Klankgehalte beïnvloed presisie.** 'n Bron met duidelike vocals is makliker om te volg; lewendige opnames and bronne met harde agtergrondsnitte is merkbaar moeiliker."
    ]
   },
   {
    "h2": "Verwante hulpmiddels and gidse",
    "ps": [
     "Vir die volledige deurloop, sien [[Hoe om die liedteks-sinkroniseringshulpmiddel te gebruik|/guides/lrc.html]]; om 'n bestaande LRC in subtitels te verander, sien [[LRC na SRT|/guides/lrc-to-srt.html]]; as die uitgevoerde SRT verkeerd getym is, gebruik [[Tydlynaanpassing|/shift.html]]; en voer die resultaat deur [[Subtitel-Kkw|/qc.html]]."
    ]
   }
  ]
 },
 "lrc": {
  "seo": {
   "title": "Liedteks-sinkroniseringshulpmiddel – Laai 'n liedjie, plak liedtekste, tik saam – AI-SRTSub",
   "desc": "Laai 'n liedjie, plak die liedtekste, tik 'n tydstempel per reël terwyl jy luister, en voer LRC of SRT uit. Spasie speel en pouseer, Enter stempel die reël, Z maak ongedaan, hande bly op die sleutelbord.",
   "h1": "Hoe om die liedteks-sinkroniseringshulpmiddel te gebruik",
   "intro": "Laai 'n liedjie, plak die liedtekste, tik 'n tydstempel vir elke reël terwyl jy luister, en voer standaard LRC of SRT uit. Die klank speel plaaslik en word nooit opgelaai nie.",
   "ctaText": "Maak die liedteks-sinkroniseringshulpmiddel oop"
  },
  "body": [
   {
    "h2": "Wat hierdie hulpmiddel doen",
    "ps": [
     "Gee 'n liedjie 'n liedtekslêer waarop saamgesing kan word: een liedteks per reël, met elke reël wat 'n tydspunt dra. Spelers lees LRC, subtitelspore lees SRT, and beide kan hier uitgevoer word."
    ]
   },
   {
    "h2": "1 Laai die liedjie",
    "ps": [
     "Die eerste kolom aan die linkerkant neem 'n klanklêer: **MP3, M4A, FLAC, WAV en OGG** werk almal. Die klank speel plaaslik en word nooit opgelaai nie.",
     "Klankgehalte beïnvloed nie tydsberekeningspresisie nie, maar 'n bron met duidelike vocals is makliker om te volg; lewendige opnames en bronne met harde agtergrondsnitte is merkbaar moeiliker om te sinkroniseer."
    ],
    "img": {
     "file": "lrc-up",
     "alt": "Die laai-'n-liedjie-gebied van die liedteks-sinkroniseringshulpmiddel",
     "cap": "MP3 / M4A / FLAC / WAV / OGG werk almal, and die klank speel slegs plaaslik"
    }
   },
   {
    "h2": "2 Plak die liedtekste",
    "ps": [
     "Plak die liedtekste in die tweede kolom, **een liedteks per reël**; leë reëls word outomaties oorgeslaan. Klik dan op \"Ontleed liedtekste\".",
     "Om 'n bestaande LRC te plak, werk ook — sy `[mm:ss.xx]`-tydetikette word herken, and na invoer gaan jy voort vanaf die eerste reël sonder 'n tyd, sodat reëls wat reeds getym is nie oorgedoen hoef te word nie."
    ],
    "img": {
     "file": "lrc-paste",
     "alt": "Die plak-liedtekste-gebied en die ontleed-liedtekste-knoppie",
     "cap": "Plak een liedteks per reël, of plak 'n hele LRC en laat die hulpmiddel die bestaande tye lees"
    }
   },
   {
    "h2": "3 Tik saam terwyl jy luister",
    "ps": [
     "Speel die liedjie en druk Enter op die oomblik wat 'n reël begin (of klik \"Stempel hierdie reël\"); die tyd vir daardie reël word opgeteken en die wyser verspring na die volgende een.",
     "Kortpaaie: **spasie** speel and pouseer, **Enter** stempel die huidige reël, **Z** maak een reël ongedaan. Om Enter te druk tydens afspeel is die gladste manier om te werk — geen gewissel heen en weer tussen muis en sleutelbord nie.",
     "Die verkeerde reël gestempel? Druk Z om dit ongedaan te maak and stempel weer. As jy glad nie 'n reël wil stempel nie ('n instrumentale pouse, 'n suiwer musikale gedeelte), klik \"Slaan hierdie reël oor\" and dit sal nie in die uitvoer verskyn nie."
    ],
    "img": {
     "file": "lrc-tap",
     "alt": "Die speel-, stempel-hierdie-reël-, maak-een-reël-ongedaan- en slaan-hierdie-reël-oor-kontroles in die tik-saam-gebied",
     "cap": "Spasie speel and pouseer, Enter stempel die huidige reël, Z maak ongedaan — hande bly op die sleutelbord"
    }
   },
   {
    "h2": "4 Voer uit",
    "ps": [
     "Die vierde kolom doen die uitvoer: **Laai LRC af** vir spelers, **Laai SRT af** vir videosubtitelspore, of \"Kopieer\" om die teks direk te neem.",
     "Slegs reëls met 'n tyd word uitgevoer; oorgeslaan reëls kom nooit die lêer binne nie. In die SRT-uitvoer duur elke reël tot die volgende een begin, and die laaste reël val terug na 2 sekondes."
    ],
    "img": {
     "file": "lrc-out",
     "alt": "Die aflaai-LRC-, aflaai-SRT- and kopieerknoppies in die uitvoergebied",
     "cap": "LRC vir spelers, SRT vir video; slegs reëls met 'n tyd word uitgevoer"
    }
   },
   {
    "h2": "Wat ongeroer gelaat word",
    "ps": [
     "Die liedteksteks word nie herskryf nie. Tydsberekening voeg slegs een tydspunt per reël by and raak nooit die woorde aan wat jy geplak het nie.",
     "Wanneer jy 'n bestaande LRC invoer, behou reëls wat reeds 'n tydetiket dra hul oorspronklike tyd and jy stempel slegs vanaf die eerste ongetymde reël af."
    ]
   },
   {
    "h2": "Algemene vrae",
    "ps": [
     "**Waarom ontbreek sommige reëls uit die uitvoer?** Oorgeslaan reëls and reëls sonder 'n tyd kom nooit die lêer binne nie. Gaan terug na stap drie and voeg hulle by, of bevestig dat hulle bedoel was om oorgeslaan te word.",
     "**Kan die tye agterna verander word?** As jy alles 'n bietjie wil verskuif na stempeling, voer SRT uit and gebruik [[Tydlynaanpassing|/shift.html]] om dit as 'n geheel te verreken of te skaal.",
     "**LRC of SRT — watter moet ek uitvoer?** LRC vir musiekspelers (foobar2000, stroomkliënte, allerhande spelers); SRT wanneer die liedtekste op video moet sit of verder verwerk moet word met subtitelhulpmiddels.",
     "**Hoe lank neem een liedjie?** Dit hang af van hoeveel reëls daar is and hoe presies jy wil wees. Vir 'n liedjie van dertig of veertig reëls, 'n paar minute per pas sodat jy die vloei ken; om woordvlak-presisie na te jaag neem langer."
    ]
   },
   {
    "h2": "Privaatheid",
    "ps": [
     "Klank and liedtekste word geheel and al in die blaaier verwerk: niks word opgelaai nie and niks gaan deur 'n bediener nie. Die klank word gedekodeer and slegs plaaslik gespeel."
    ]
   },
   {
    "h2": "Verwante hulpmiddels and gidse",
    "ps": [
     "As jy reeds 'n LRC het and subtitels wil hê, sien [[LRC na SRT|/guides/lrc-to-srt.html]]; vir die denke and slaggate agter tydsberekening, sien [[Hoe om LRC-liedtekste te sinkroniseer|/guides/how-to-make-lrc-file.html]]; as die uitgevoerde SRT verkeerd is, gebruik [[Tydlynaanpassing|/shift.html]]; and voer die resultaat deur [[Subtitel-Kkw|/qc.html]]."
    ]
   }
  ]
 },
 "lrc-to-srt": {
  "seo": {
   "title": "LRC na SRT-omskakelaar – Verander liedtekste in subtitels – AI-SRTSub",
   "desc": "Skakel LRC-liedtekste om na SRT-subtitels: elke reël duur totdat die volgende een begin, die laaste snit kry 3 sekondes. Snitte verby 60 minute lees korrek. Loop in jou blaaier.",
   "h1": "LRC na SRT",
   "intro": "Verander LRC-liedtekslêers in SRT: los die lêer, kies SRT, laai af. Eindtye word outomaties ingevul vanaf die volgende reël.",
   "ctaText": "Skakel LRC → SRT om"
  },
  "body": [
   {
    "h2": "Hoe LRC van SRT verskil",
    "ps": [
     "LRC is 'n liedteksteformaat: elke reël dra slegs 'n \"begin sing\"-tyd in `[minutes:seconds.cents]` en **geen eindtyd nie**; elke SRT-snit benodig beide 'n begin en 'n einde. Die kern van die omskakeling is dus om die eindtye in te vul."
    ],
    "img": {
     "file": "convert-upload-lrc",
     "alt": "Oplaai-gebied: 'n LRC-lêer gelaai, as LRC opgespoor",
     "cap": "'n Liedtekslêer met [00:12.50]-tydstempels word dadelik as LRC opgespoor"
    }
   },
   {
    "h2": "Hoe eindtye ingevul word",
    "ps": [
     "Die reël is eenvoudig: **elke reël duur totdat die volgende een begin**; die laaste reël het geen \"volgende\" nie, so dit kry 3 sekondes. LRC-tydstempels dra ook slegs minute en sekondes — geen ure nie — en die minuutveld dra nie oor nie (62:05 beteken 1 uur 2 min 5 s), sodat ekstra lang snitte soos DJ-mengsels korrek lees."
    ]
   },
   {
    "h2": "Hoe om om te skakel",
    "ps": [
     "Maak die [[omskakelaar|/convert.html]] oop, los die LRC daarin, kies **SRT - SubRip** as die uitvoer, skakel dan om en laai af. Handig vir musiekvideo's en vir die montering van liedtekste as subtitels in spelers; die uitgevoerde SRT kan weer na VTT vir die web omgeskakel word."
    ]
   }
  ]
 },
 "make-bilingual-subtitles": {
  "seo": {
   "title": "Twee Maniere om Tweetalige Subtitels te Maak – AI-SRTSub",
   "desc": "Tweetalige subtitels kom in twee vorme voor: twee reëls in een snit, of twee snitte op dieselfde tydlyn. Voor- en nadele, en hoe om tussen hulle te wissel. – AI-SRTSub",
   "h1": "Twee Maniere om Tweetalige Subtitels te Maak",
   "intro": "Dieselfde tweetalige subtitel kan twee heeltemal verskillende uitlegte versteek. Leer om hulle uit te ken, en die maak, splits en omskakeling sal ophou om jou te pootjie.",
   "ctaText": "Werk met tweetalige subtitels"
  },
  "body": [
   {
    "h2": "Hoe die Twee Vorme Lyk",
    "ps": [
     "**Vorm B: twee snitte op dieselfde tydlyn.** Een reël dialoog word twee aparte subtitelsnitte met identiese tydsberekening — een Engels, een Sjinees — wat bo-op mekaar gestapel geteken word. Dit is die algemeenste manier waarop tweetalige ASS-subtitels gebou word."
    ]
   },
   {
    "h2": "Waar Elkeen Tekort Skiet",
    "ps": [
     "Vorm A se swak punt is **opsporing**: die skeiding van die spore maak staat op die skryfstelsel, sodat Sjinees-Engelse of Japannese-Engelse pare in 'n oogwink skei, terwyl **kombinasies wat 'n enkele skrif deel** — Engels plus Frans, of Sjinees plus Japannese kanji — nie uit mekaar geken kan word nie. Vorm B se swak punt is **produksie**: die twee tydlyne moet presies ooreenstem en om hulle met die hand in lyn te bring is vermoeiend; sommige spelers teken ook albei dieselfde-tydlyn-snitte, wat die skerm oorvol maak. Duimreël: gebruik Vorm A vir voltooide subtitels bedoel vir kykers; gebruik Vorm B wanneer jy die spore uit mekaar moet trek vir verdere werk."
    ]
   },
   {
    "h2": "Die Twee Roetes",
    "ps": [
     "**Bou tweetalige subtitels vanaf die oorspronklike**: gebruik [[KI-subtitelvertaling|/translate.html]] en kies \"Tweetalig · oorspronklike bo\" of \"Tweetalig · vertaling bo\" by uitvoer — jy kry Vorm A direk; die keuse van ASS bied ook twee uitlegte, \"gestapel bo en onder\" and \"twee reëls onder aan die skerm\".",
     "**Voeg twee spore saam of skakel tussen vorms om**: gebruik [[Tweetalige subtitel-stroper|/bilingual.html]] en sy \"voeg saam in een tweetalige inskrywing\"-modus — Vorm B in, Vorm A uit; andersom neem \"splits in twee lêers\" Vorm A of B in en gee twee onafhanklike spore uit."
    ],
    "img": {
     "file": "bilingual-modes",
     "alt": "Die vier modusse van die tweetalige stroper; \"voeg saam in een tweetalige inskrywing\" voeg twee snitte wat 'n tydlyn deel saam",
     "cap": "\"Voeg saam in een tweetalige inskrywing\": Vorm B word Vorm A"
    }
   },
   {
    "h2": "Watter Toestel Sal Dit Speel",
    "ps": [
     "Webspelers (HTML5 ``) and die meeste mobiele spelers hanteer Vorm A betroubaarder; lessenaarsspelers (VLC, mpv, PotPlayer) aanvaar beide and kan selfs die twee dieselfde-tydlyn-snitte verskillende kleure and posisies gee. In geval van twyfel, voer Vorm A as SRT uit — dit reis die beste. Vir die verskille tussen die formate self, sien [[SRT, VTT of ASS: Watter Moet Jy Gebruik?|/guides/subtitle-format-comparison.html]]."
    ],
    "img": {
     "file": "translate-export",
     "alt": "Die tweetalige stylopsies in die vertaalhulpmiddel se uitvoerpaneel",
     "cap": "Kies die tweetalige reëlvolgorde reg op uitvoer — een stap en dit is gedoen"
    }
   },
   {
    "h2": "VGV",
    "ps": [
     "**Tweetalige subtitels lyk beknop — wat kan ek doen?** Beheer die reëlbreedte: die vertaalhulpmiddel se uitvoerpaneel het 'n \"tweetalige reëlbreedte\"-instelling; 'n smaller reël beteken minder karakters per snit and 'n skoner skerm.",
     "**Ek wil net een spoor hê.** Die stroper se \"behou slegs oorspronklike / behou slegs vertaling\" hanteer dit in een klik, sien [[Verdeel tweetalige subtitels in twee spore|/guides/split-bilingual-subtitles.html]]."
    ]
   }
  ]
 },
 "merge": {
  "seo": {
   "title": "Saamvoeg van tweetalige en gestileerde onderskrifte – Voeg saam, stileer, eksporteer – AI-SRTSub",
   "desc": "Voeg twee onderskriflêers in 'n tweetalige snit saam, stileer 'n bestaande tweetalige lêer of stileer 'n enkel taal een: paringsmodusse, die ASS- en VTT-sjablone, en watter formaat om te eksporteer.",
   "h1": "Hoe om tweetalige samevoeging en spesiale-effek-onderskrifte te gebruik",
   "intro": "Kombineer twee onderskriflêers in een tweetalige snit, of stileer onderskrifte direk: skriftipe, kleur, omlyning en posisie is wat-jy-sien-is-wat-jy-kry, en die voorskou stem ooreen met die uitvoer.",
   "ctaText": "Maak die spesiale-effek-onderskrifgereedskap oop"
  },
  "body": [
   {
    "h2": "Wat hierdie gereedskap doen",
    "ps": [
     "Hierdie een bladsy dek eintlik drie take: die samevoeging van 'n oorspronklike en 'n vertaalde onderskriflêer in een tweetalige lêer, die aanpassing van die volgorde en styl van 'n lêer wat reeds tweetalig is, en die byvoeging van spesiale effekte by 'n enkel taal lêer. Al drie deel dieselfde stylparameters en dieselfde voorskou."
    ]
   },
   {
    "h2": "Drie take, een bladsy",
    "ps": [
     "Die bokant van die bladsy het drie oortjies: **Voeg twee lêers saam**, **Pas 'n tweetalige lêer aan**, **Enkel-taal lêer**. Jou keuse bepaal hoeveel invoerkolomme aan die linkerkant verskyn.",
     "Wanneer twee lêers saamgevoeg word, hou die linkerkant twee kolomme, \"1 Oorspronklike onderskrifte\" en \"2 Vertaalde onderskrifte\"; elk aanvaar 'n opgelaaide lêer of teks wat direk ingepak is. Om 'n tweetalige lêer aan te pas en 'n enkel taal lêer te stileer, benodig elk slegs een kolom."
    ],
    "img": {
     "file": "merge-mode",
     "alt": "Die drie oortjies bo aan die spesiale-effek-onderskrifgereedskap en die invoergebied aan die linkerkant",
     "cap": "Drie oortjies bo; as jy \"Voeg twee lêers saam\" kies, verskyn 'n oorspronklike en 'n vertaalde kolom aan die linkerkant"
    }
   },
   {
    "h2": "Hoe twee lêers gepaar word",
    "ps": [
     "Die eerste item onder \"3 Samevoegingsinstellings\" is die paringsmodus: **Paar volgens volgorde · gebruik die oorspronklike tydlyn**, **Paar volgens tydlyn · gebruik die oorspronklike tydlyn**, **Paar volgens volgorde · gebruik die vertaalde tydlyn**.",
     "Wanneer beide lêers dieselfde aantal inskrywings in dieselfde volgorde het, is parings volgens volgorde die veiligste. Wanneer die tellings verskil (een kant het inskrywings saamgevoeg, die ander het hulle geskei), paarlêers volgens tydlyn en laat die gereedskap per nabyheid ooreenstem. Wie se tydlyn om te gebruik hang af van watter lêer meer akkuraat is — meestal die oorspronklike.",
     "Daaronder is die tekststruktuur (outomaties opspoor / twee lyne per inskrywing / wisselende pare) en die volgorde (oorspronklike bo / vertaling bo)."
    ],
    "img": {
     "file": "merge-pair",
     "alt": "Paringsmodus, tekststruktuur en -volgorde-opsies onder samevoegingsinstellings",
     "cap": "Die paringsmodus besluit watter lyn by watter pas, en wie se tydlyn om te gebruik word ook hier ingestel"
    }
   },
   {
    "h2": "Stileer die item item vir item",
    "ps": [
     "Die stylpaneel sit aan die regterkant. Wanneer jy ASS eksporteer, geld die \"ASS-voorkoms\"-blok: uitleg (verdeel · geskei bo en onder / gestapel · twee lyne onder), die grootte, kleur, ondeursigtigheid, skriftipe, vetgedruk, kursief, letterspasiëring, omlyning, omlyningskleur, skaduwee/agtergrond (geen / skaduwee / agtergrond), diepte, randkleur, randondeursigtigheid, horisontale belyning (onder · links / onder · middel / onder · regs) en afstand vanaf die onderkant van die vertaling (primêre) lyn, plus die skriftipe, skaduwee/agtergrond en linker-/regtermarge van die oorspronklike (sekondêre) lyn.",
     "Wanneer jy tweetalige VTT-stilering eksporteer, geld die \"WebVTT-styl\"-blok: bo en behalwe ses voorafinstellings (standaard / kompak / filmagtig / bo / toeganklik / portret) kan jy die vertikale lyn, die anker (onder / bo / middel), die horisontale posisie, die breedtegrootte, die belyningswaarde en die lynhoogte van die hele aanwysing verander, plus die agtergrondkleur, agtergrondondeursigtigheid en omlyningsbreedte van die vertalingslyn; die oorspronklike lyn kan die hoofstyl erf of apart ingestel word.",
     "Wanneer jy klaar is, kan jy die resultaat as 'n voorafinstelling stoor en dit later hergebruik deur dit onder \"Van gestoor voorafinstellings\" te kies en op \"Pas toe\" te klik."
    ],
    "img": {
     "file": "merge-style",
     "alt": "Die parameters van die ASS-voorkomspaneel aan die regterkant",
     "cap": "Grootte, kleur, omlyning, skaduwee/agtergrond en belyning is almal verstelbaar, and the result can be saved as a preset"
    }
   },
   {
    "h2": "Kontroleer die voorskou voor jy eksporteer",
    "ps": [
     "\"Samevoegingsvoorskou\" is 'n tabel: #, tyd, oorspronklike, vertaling, styl. Die balk hierbo filter verdagte rye volgens \"bevat klankeffekte\", \"bevat 'n sprekervoorvoegsel\", \"korter as 1 sekonde\", \"meer as twee lyne\" en \"leespoed oorskry\", of volgens 'n sleutelwoord wat jy tik.",
     "Om op die stylgleuf van 'n ry te klik, vou daardie gleuf se redigeerder oop en lys slegs die rye wat dit gebruik; \"Maak alle oorheersings skoon\" laat elke handmatige oorheersing na die sjabloon terugkeer. Die tydlynaanpassingsgebied hieronder hanteer 'n globale verplasing (vanaf 'n gegewe aanwysing) en proporsionele skaaling.",
     "Sodra dit reg lyk, gaan na \"4 Eksporteer\": laai die onderskriflêer af of kopieer die inhoud daarvan."
    ],
    "img": {
     "file": "merge-preview",
     "alt": "Die samevoegingsvoorspoutabel en sy filterbalk",
     "cap": "Die voorskou is die uitvoer; filter verdagte rye volgens tipe of vou 'n enkelstylgleuf oop"
    }
   },
   {
    "h2": "Wat onaangeraak gelaat word",
    "ps": [
     "Stilering verander slegs voorkoms, nooit dialoog nie. Die teks van die oorspronklike en die vertaling word nie met 'n enkele karakter tydens die samevoeging verander nie; tensy jy dit doelbewus verander in die aanpassingsgebied onder die voorskou, kom die tydlyn van die lêer wat jy gekies het.",
     "Wanneer jy SRT of \"VTT sonder stilering\" eksporteer, word geen stylinligting in die lêer geskryf nie — die bladsy sê vir jou dat die VTT geen STYLE-blok het nie en die speler sal sy verstekvoorkoms gebruik. As jy stilering wil hê, kies tweetalige VTT-stilering of ASS."
    ]
   },
   {
    "h2": "Algemene vrae",
    "ps": [
     "**Wat as die twee lêers verskillende inskrywingstellings het?** Gebruik \"Paar volgens tydlyn\" en die gereedskap pas per nabyheid aan; inskrywings wat dit nie kan pas nie, word nie uitgedink nie.",
     "**Wat as 'n speler die stilering in 'n uitgevoerde ASS ignoreer?** Die style word binne die lêer gestoor, maar spelerondersteuning vir ASS wissel. As jy 'n meer draagbare voorkoms benodig, eksporteer tweetalige VTT-stilering.",
     "**Hoe kom ek terug na die aanvanklike sjabloon nadat ek dit opgeferd het?** \"Herstel verstekparameters\" in die ASS-blok en \"Herstel sjabloonverstekwaardes\" in die VTT-blok stel elkeen hul eie afdeling terug.",
     "**Wat is die sewe rye in die voorbeeld?** Hulle is 'n ingeboude voorbeeld, slegs daar sodat jy kan sien hoe 'n samevoeging lyk; die voorbeeld kan nie uitgevoer word nie. Laai jou eie onderskrifte op en klik op die samevoegingsvoorskou en hulle word outomaties vervang."
    ]
   },
   {
    "h2": "Privaatheid",
    "ps": [
     "Onderskrifte word ten volle in die blaaier verwerk: niks word opgelaai nie en niks gaan deur 'n bediener nie. Maak die blaaier toe en alles van daardie sessie is weg."
    ]
   },
   {
    "h2": "Verwante gereedskap en gidse",
    "ps": [
     "Om 'n tweetalige lêer weer in twee snitte te verdeel, gebruik [[Tweetalige skeiding|/bilingual.html]]; om die ander pad te gaan en 'n enkel taal in 'n tweetalige lêer te verander, sien [[Twee maniere om tweetalige onderskrifte te maak|/guides/make-bilingual-subtitles.html]]; laat die resultaat deur [[Onderskrif-kwaliteitsbeheer|/qc.html]] loop; vir 'n hele seisoen op een slag, gebruik [[Batsprosessering|/batch.html]]."
    ]
   }
  ]
 },
 "qc": {
  "seo": {
   "title": "Hoe om Subtitel-kwaliteitsbeheer te gebruik – Tydlyn- en uitlegkontrole – AI-SRTSub",
   "desc": "Subtitel-kwaliteitsbeheer: 17 reëls vang oorvleuelings, lynbreedte, leespoed en leestekens, drempels per 27 tale. Helfte is een-klik-fiksies; laai die verslag af.",
   "h1": "Hoe om Subtitel-kwaliteitsbeheer te gebruik",
   "intro": "Voordat jy onderskrifte oorhandig, voer hulle deur die kwaliteitsbeheerbladsy vir tydsberekening en uitleg: wat gekontroleer word, hoe om die verslag te lees, en watter kwessies met een klik opgelos kan word — alles word hier gedek.",
   "ctaText": "Maak Subtitel-kwaliteitsbeheer oop"
  },
  "body": [
   {
    "h2": "Waarvoor hierdie gereedskap is",
    "ps": [
     "Onderskrifte wat met die blote oog goed lyk, blyk dikwels oorvleuelende tydlyne, oormatige wye lyne, of te hoë leespoed te hê sodra dit afgelewer word. Die kwaliteitsbeheerbladsy lys hierdie kwessies een vir een:"
    ]
   },
   {
    "h2": "Kies eers die taakreëls",
    "ps": [
     "Onder “Kontroleer volgens watter taal se reëls” stel jy vyf drempels in: **maksimum enkellynbreedte** (42 halfbreedte-eenhede vir landskap by verstek, 36 vir vierkant, 28 vir portret), **leespoedlimiet** (18 breedte-eenhede per sekonde vir Chinees, Japannese en Koreaans, 20 vir ander tale), **minimum duur van 833 millisekondes**, **maksimum duur van 7000 millisekondes**, en **ten meeste 2 lyne**. Stel die onderskriftaal in om outomaties op te spoor of kies een van die 27 handmatig; skermoriëntasie verander slegs die lynbreedtelaag — leespoed, duurs en lynaantal bly soos hulle is. Halfbreedte-eenhede is die gedeelde maatreël: een hanzi tel as 2, een Latynse letter as 1 — 'n lynbreedte van 42 is gelyk aan 21 hanzi of 42 letters."
    ],
    "img": {
     "file": "qc-rules",
     "alt": "Kwaliteitsbeheerinstellings: vyf drempel-invoervakke plus onderskrifte-taal- en skermoriëntasiekieslyste",
     "cap": "Vyf drempels + taal + oriëntasie; die verstekwaardes stem ooreen met algemene bedryfspraktyk"
    }
   },
   {
    "h2": "Lees van die verslag",
    "ps": [
     "Die 17 reëls rapporteer bevindinge op drie vlakke: **foute** (verminkte teks, tydstempelformaat, eindig vroeër as begin, gebreekte nommering), **waarskuwings** (leë inskrywings, oorvleuelings, te kort of te lang duurs, leespoed oor die limiet, oormatige wye lyne, meer as twee lyne), en **wenke** (lynbreukposisie, voorste of agterste spasies, ontbrekende spasies, leestekennorms, en meer). Elke bevinding dra die inskrywingnommer en 'n “gemeet X, drempel Y”-detail, en die lys kan volgens vlak gefilter word. Tweetalige inskrywings kry vrystellings: beide vorme word outomaties opgespoor, oorvleuelingskontroles stel die hele paar vry, en leespoed tel slegs die lyn wat in die teikentaal geskryf is."
    ],
    "img": {
     "file": "qc-report",
     "alt": "Kwaliteitsbeheerverslaggebied: bevindinge gegroepeer volgens fout, waarskuwing en wenk, elk met inskrywingnommer en gemete waarde",
     "cap": "'n Drievlakverslag: elke bevinding dra sy inskrywingnommer en gemete/drempelwaardes"
    }
   },
   {
    "h2": "Herstel en uitvoer",
    "ps": [
     "Die “Herstel & eksporteer”-kaart lys slegs **outo-herstbare** items: heromsluiting, verwydering van leë inskrywings, byvoeging van ontbrekende spasies, vervanging van leestekens volgens taalnorms, hernommering — alles wat die tydsberekening ongerak laat, word by verstek aangedui; **items wat tydsberekening verander** (omruiling van begin en einde, verskuiwing van oorvleuelings, snoei of rek van duurs) word by verstek ontmerk — merk hulle nadat jy die impak self gekontroleer het. Klik “Pas fiksies toe” en 'n vars kontrole word outomaties uitgevoer; die teller tel slegs wat werklik herstel is — lyne wat nie heromsluit kon word nie, word nie in die syfers opgeblaas nie. **Leespoed oor die limiet het geen outo-fiks nie**: die masjien kan nie weet watter woord om te sny nie, dus moet die vertaling met die hand verkort word of die tydsberekening aangepas word. Na herstel, eksporteer SRT of VTT, of klik “Laai verslag af” om 'n gewone teks `.qc.txt`-verslag te stoor."
    ],
    "img": {
     "file": "qc-fix",
     "alt": "Die herstelkaart: merkblokkies vir outo-herstbare items en die Pas fiksies toe-knoppie",
     "cap": "Slegs outo-herstbare items haal die lys; tydsberekening-veranderende fiksies word by verstek ontmerk"
    }
   },
   {
    "h2": "Gereelde vrae",
    "ps": [
     "**Waarom kan my ASS nie uitgevoer word nie?** Kwaliteitsbeheer eksporteer slegs SRT en VTT; ASS kom in maar kom nie uit nie. Om ASS-effekte te behou, dink dit eers deur by [[Formaatomskakelaar|/convert.html]].",
     "**Wat beteken 'n leespoed van 18?** Vir Chinees, Japannese en Koreaans is die perk 9 volbreedte-karakters per sekonde (18 halfbreedte-eenhede); ander tale kry 20 halfbreedte-eenhede per sekonde. Dit is die algemene geriefsvlakke, en die invoervak laat jou toe om hulle te verander.",
     "**My lêer se kodering is gebreek — kan dit steeds gekontroleer word?** Kwaliteitsbeheer lees slegs UTF-8; herstel die kodering eers op die bladsy vir die herstel van verminkte teks.",
     "**Sal dit aan my tydlyn raak?** Nie solank jy die “verander tydsberekening”-groep ontmerk laat nie; selfs wanneer dit gemerk is, word elke verandering uitgespel voordat die fiks toegepas word."
    ]
   },
   {
    "h2": "Verwante gidse",
    "ps": [
     "Onderskrifte wat te vinnig verbyflits om te lees — sien die toegewyde gids [[Onderskrifte te vinnig om te lees|/guides/subtitle-too-fast.html]]. Wat om te kontroleer voor aflewering — die kontrolelys is by [[Wat om te kontroleer voor aflewering|/guides/subtitle-quality-check.html]]. 'n Tydlyn wat uit die haak dryf, is 'n ander soort probleem — sien [[Onderskrifte dryf uit sinchronisasie|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "remove-subtitle-ads": {
  "seo": {
   "title": "Verwyder advertensies en watertekens van onderskrifte – AI-SRTSub",
   "desc": "Stroop watertekens en advertensies van onderskrifte: URL's, fansub-krediete en \"encoded by\"-etikette word met een klik skoongemaak, plus duplikaat- en leë inskrywings. – AI-SRTSub",
   "h1": "Verwyder advertensies en watertekens van onderskrifte",
   "intro": "URL's, krediete en promosie-inskrywings wat in jou onderskrifte versteek is, word in een deurgang deur die skoonmaker se watertekenreëls uitgevee — en enige verkeerde verwydering kan inskrywing vir inskrywing ongedaan gemaak word.",
   "ctaText": "Maak onderskrifwatertekens skoon"
  },
  "body": [
   {
    "h2": "Wat hierdie watertekens is",
    "ps": [
     "Onderskrifte wat aanlyn afgelaai word, kry dikwels ekstra inskrywings aan die begin of einde (soms ook in die middel): URL's, e-posadresse, fansub-groepname, `encoded by` / `translated by`-krediete, werfname soos opensubtitles, and lyne soos “volg ons WeChat-rekening” of “slegs vir studiedoeleindes”. Dit is normale onderskrifinskrywings — met 'n tydlyn, wat 'n lyn opneem — sodat spelers hulle nie kan verwyder nie; hulle moet volgens inhoud opgespoor word."
    ]
   },
   {
    "h2": "Waar om dit te doen",
    "ps": [
     "Maak die [[Onderskrifskoonmaker|/clean.html]] oop en laat val jou onderskrif daarin; die “Watertekens & rommelinskrywings”-groep het reeds “Verwyder watertekens en advertensies”, “Verwyder duplikaatinskrywings” en “Verwyder leë inskrywings” by verstek gemerk, en die skoonmaak begin outomatisk. Opsporing werk op twee vlakke: **harde seine** soos URL's, e-posse, fansub-groepe en werfname vee die hele inskrywing uit by 'n treffer van enige lengte; **sagte seine** soos @handvatsels, “encoded”- of “proofread”-krediete word slegs beoordeel in kort inskrywings van nie meer as 40 karakters nie, om te verhoed dat lang dialoog afgekap word. Tweetalige inskrywings word eers lyn vir lyn van watertekenlyne gestroop terwyl dialooglyne behou word; die inskrywing word slegs geheel en al verwyder as watertekenspore na die stroop oorbly."
    ],
    "img": {
     "file": "clean-opts",
     "alt": "Skoonmaakopsieskerm: die drie merkblokkies van die watertekens- en rommelinskrywingsgroep",
     "cap": "Die “Watertekens & rommelinskrywings”-groep is by verstek aan — geen handmatige opstelling nodig nie"
    }
   },
   {
    "h2": "Hersien en eksporteer",
    "ps": [
     "In die veranderingslys dra elke verwyderde inskrywing 'n “waterteken & advertensie”-etiket — kyk dit vlugtig na om te bevestig dat niks per ongeluk verwyder is nie; as een verkeerd lyk, klik “Herstel” om dit terug te sit. Sodra dit bevestig is, laai af: die lêernaam kry outomaties 'n `.clean`-merker. Die skoonmaak loop plaaslik in jou blaaier; jou onderskrifte word nooit êrens heen gestuur nie."
    ]
   }
  ]
 },
 "repair": {
  "seo": {
   "title": "Hoe om verminkte onderskrifte te herstel – Spoor die kodering op – AI-SRTSub",
   "desc": "Stap-vir-stap: spoor die oorspronklike kodering op (GBK / Big5 / Shift_JIS / EUC-KR), rangskik herstelwerk volgens wat die meeste soos taal lees, en stoor dan UTF-8 met BOM of GBK. Tydsberekenings en indeksnommers verander nooit nie.",
   "h1": "Hoe om verminkte onderskrifte te herstel",
   "intro": "'n Onderskriflêer vol rommelkarakters is selde beskadig — dit is net met die verkeerde kodering gelees. Die herstelgereedskap spoor die oorspronklike kodering op en sit die regte karakters terug, en laat indeksnommers en tydsberekenings met rus.",
   "ctaText": "Maak die gereedskap vir verminkte onderskrifte oop"
  },
  "body": [
   {
    "h2": "Wat hierdie gereedskap doen",
    "ps": [
     "Dieselfde grepe wat as UTF-8 gelees word en as GBK gelees word, lewer twee heeltemal verskillende stelle karakters op — die lêer is nie beskadig nie, dit is met die verkeerde kodering dekodeer. Hier is wat die herstelgereedskap doen:"
    ]
   },
   {
    "h2": "Laai die lêer op, moenie dit plak nie",
    "ps": [
     "Die twee invoerpunte kan verskillende hoeveelhede skade herstel, so **laai die lêer op as jy kan**. Met 'n lêer is die oorspronklike grepe steeds daar: die gereedskap probeer die een kodering na die ander, en sodra dit GBK herken, dekodeer dit as GBK — niks hoef geraai te word nie. Teks wat per plak aankoms, is nie meer rou grepe nie. Teen die tyd dat die blaaier die string oorhandig, het die fout reeds gebeur, sodat die gereedskap net agteruit kan werk en neem wat dit kan kry.",
     "As geplakte teks reeds die vervangingskarakter (daardie omraamde vraagteken ``) bevat, is die oorspronklike grepe lank reeds weg en kan niks hulle terugbring nie. Die bladsy sê dit duidelik: gaan terug op en gebruik \"Kies lêer\" om die oorspronklike op te laai."
    ],
    "img": {
     "file": "repair-up",
     "alt": "Herstelbladsy-oplaaigebied: sleep-en-los-sone en plakkas, met die opgespoorde kodering hierbo gewys",
     "cap": "Sleep die lêer in of soek daarna; die plakkas sit onder en kan veel minder herstel"
    }
   },
   {
    "h2": "Wat die diagnose vir jou sê",
    "ps": [
     "Sodra jy oplaai, gee die diagnosekaart 'n uitspraak. **Geen verminking gevind nie**: die inhoud lees goed soos dit is; as jou speler steeds rommel wys, het die speler die verkeerde kodering gebruik — gaan af na \"Stoor as\", kies 'n ander een en gee daardie lêer daaraan. Wanneer dit **soos verminking lyk**, lys die kaart watter spoor dit gevind het:"
    ],
    "img": {
     "file": "repair-diag",
     "alt": "Diagnosekaart: uitspraak plus elke verminkingspoor lyn vir lyn gelis",
     "cap": "Diagnose lys spure volgens tipe in plek om net te sê \"dit is vermink\""
    }
   },
   {
    "h2": "Hoe kandidate gerangskik word, en hoe om te kies",
    "ps": [
     "Onder \"Maniere om dit te herstel\", word kandidate gelys in **meeste-soos-egte-taal-eerste**-volgorde, tot 12 van hulle, elk geëtiketteer met die paar koderings waaruit en waartoe dit gelees is. Klik een om te sien hoe dit lyk, kies dit, en blaai dan af om te stoor. Nie gelukkig nie? Gebruik \"Hou soos is\" om terug te val op die oorspronklike.",
     "Die volgorde kom van 'n telling: aandeel van algemene karakters, stringe aksente, stringe simbole, mure van duistere karakters, almal ingereken. **As geen telling duidelik beter is nie, word niks aanbeveel nie** — dit sal nie 'n half-plousibele kandidaat op jou afdwing net om een te hê nie. Teks wat twee keer vermink is (een keer verkeerd gestoor, dan een keer verkeerd herstel) kry een ekstra rondte van agteruit-oplos op die topkandidate, sodat enigiets binne twee lae steeds gered kan word."
    ],
    "img": {
     "file": "repair-fix",
     "alt": "Kandidaat-herstellingslys gerangskik volgens hoeveel dit soos egte taal lees, elk geëtiketteer met sy koderingspaar",
     "cap": "Kandidate gerangskik volgens \"meeste soos egte taal\", elk wat die koderings betrokke toon"
    }
   },
   {
    "h2": "Om korrek te stoor is die laaste stap",
    "ps": [
     "'n Herstelde resultaat moet steeds korrek gestoor word. Wanneer 'n speler nie UTF-8 kan opspoor nie, los dit gewoonlik op om as **UTF-8 met BOM** (Windows-spelers maak staat op die BOM) of as **GBK** te stoor. Jy kan as UTF-8, UTF-8 (met BOM), GBK, Big5, Shift_JIS of EUC-KR stoor; as iets nie pas nie, word jy aangesê om 'n ander te kies (GBK kan nie Koreaans hou nie). Afgelaaide lêers kry `-fixed` by die naam gevoeg.",
     "Wanneer die opgespoorde kodering nie UTF-8 is nie, is \"Stoor as\" reeds vir jou vooraf ingestel op UTF-8 met BOM. Sodra jy self aan die aftreklys raak, hou dit op om jou te betwyfel."
    ],
    "img": {
     "file": "repair-out",
     "alt": "Resultaatgebied: teksboks met stoor-as-aftreklys en aflaaiknoppie",
     "cap": "Kies 'n kodering, laai dan af — die lêernaam kry -fixed bygevoeg"
    }
   },
   {
    "h2": "Wat nooit aangeraak word nie",
    "ps": [
     "Slegs die verkeerd geleese karakters word vervang. Indeksnommers, tydsberekenings en ASS-styllyne word op geen manier verander nie."
    ]
   },
   {
    "h2": "Algemene vrae",
    "ps": [
     "**Ek het die lêer opgelaai, so hoekom moet ek dit steeds weer stoor?** Die lêer self is gewoonlik fine; wat gebreek is, is die speler wat dit met die verkeerde kodering lees. In daardie geval hoef geen karakter in die teks verander te word nie — stoor net 'n kopie as UTF-8 met BOM of GBK en gee dit aan die speler.",
     "**Hoekom kan geplakte teks nie herstel word nie?** Sodra die vervangingskarakter in geplakte inhoud verskyn, is die oorspronklike grepe weg en is daar niks om van terug te redeneer nie. Gaan terug op en gebruik \"Kies lêer\" om die oorspronklike op te laai.",
     "**Die kandidaat wat ek wil hê, is nie gelys nie?** Niks word aanbeveel tensy dit duidelik beter tel as wat jy reeds het nie. Probeer om die opgespoorde kodering na 'n ander een te skakel en laat dit herrangskik.",
     "**Hoeveel lêers op een slag?** Een op 'n slag. Laai die herstel af, voer dan die volgende lêer in."
    ]
   },
   {
    "h2": "Privaatheid",
    "ps": [
     "Opsporing en herstel loop ten volle in jou blaaier. Geen onderskrifinhoud word ooit na 'n bediener gestuur nie."
    ]
   },
   {
    "h2": "Verwante gereedskap en gidse",
    "ps": [
     "Waar onderskrif-mojibake vandaan kom en hoekom dit so lyk — sien [[Waar onderskrif-mojibake vandaan kom|/guides/subtitle-garbled-characters.html]]; die kodering is goed maar die inhoud is vuil — gebruik [[Onderskrifopruiming|/clean.html]]; om tydsberekening en leespoed te kontroleer — [[Subtitel-kwaliteitsbeheer|/qc.html]]."
    ]
   }
  ]
 },
 "sbv-to-srt": {
  "seo": {
   "title": "SBV na SRT-omskakelaar – Skakel YouTube-onderskrifte om – AI-SRTSub",
   "desc": "Skakel SBV-onderskrifte wat van YouTube afgelaai is om na SRT vir CapCut, Premiere en spelers. Tydsberekeningswaardes bly ongerak — slegs die uitleg verander. Loop in jou blaaier.",
   "h1": "SBV na SRT",
   "intro": "Verander YouTube SBV-onderskrifte in SRT: los die lêer, kies SRT, laai af. Die tydsberekeningswaardes is ongerak — slegs die struktuur verander.",
   "ctaText": "Skakel SBV → SRT om"
  },
  "body": [
   {
    "h2": "Wat SBV is en waar dit vandaan kom",
    "ps": [
     "SBV is **YouTube se onderskrifformaat**: om \"onderskriflêers\" van YouTube af te laai, gee jou dikwels 'n .sbv. Die struktuur daarvan is eenvoudiger as SRT — begin- en eindtye sit op **een lyn** geskei deur kommas, die teks volg direk daaronder, en daar is geen aanwysingsnommers nie."
    ]
   },
   {
    "h2": "Waarom spelers dit verwerp",
    "ps": [
     "Buite YouTube self ondersteun die meeste redigeringsagteware en spelers nie SBV nie. Dit ontbreek die nommeringsblok en skryf sy tydsberekeningslyn anders as SRT, sodat die herbenoeming van die lêeruitbreiding niks doen nie — die struktuur moet werklik herbou word."
    ],
    "img": {
     "file": "convert-upload-sbv",
     "alt": "Oplaaigebied: 'n SBV-lêer gelaai, as SBV opgespoor",
     "cap": "SBV word soos dit is opgespoor, geen uitbreidingsherbenoeming benodig nie"
    }
   },
   {
    "h2": "Hoe om om te skakel",
    "ps": [
     "Maak die [[omskakelaar|/convert.html]] oop, los die SBV daarin, kies **SRT - SubRip** as die uitvoer, skakel dan om en laai af. Aanwysingsnommers word vars toegeken, en die oorspronklike lynbreuke binne 'n aanwysing word in een lyn saamgevoeg (SRT laat me Elyn-aanwysings toe; SBV word hier enkellyn uitgevoer)."
    ]
   }
  ]
 },
 "shift": {
  "seo": {
   "title": "Hoe om Subtiteltydperk te Verskuif (Verplasing, Skaal, Twee Ankers) – AI-SRTSub",
   "desc": "n Geïllustreerde deurgang van die tydredakteur: laai subtitels, voeg aanpassingstappe by, twee-anker-korreksie, per-aanwysing-wysigings en uitvoer. shift|seo|h1 :: Tydredakteur: Stap-vir-Stap-gids shift|seo|intro :: Hierdie gids neem jou van bo tot onder deur die hulpmiddel: laai subtitels, voeg aanpassingstappe by, voer die kontrole uit, verfyn per aanwysing, en voer uit. shift|seo|ctaText :: Maak die tydredakteur oop shift|b0|h2 :: Laai jou subtitels shift|b0|p0 :: Sleep n lêer in die stippellynblok of klik om een te kies; jy kan ook **paste the content** direk in die teksblok plak. Die formaat word gedetecteer vanaf sowel die lêeruitbreiding as die inhoud, en die resultaat word in die formaatskyfie gewys. Ondersteunde insette: srt, vtt, ass (incl. ssa), sbv, lrc en txt.",
   "h1": "Tydredigeerder: Stap-vir-stap-gids",
   "intro": "Hierdie gids neem jou van bo tot onder deur die hulpmiddel: laai onderskrifte, voeg aanpassingsstappe by, voer kontroles uit, verfyn per snit, en the uitvoer.",
   "ctaText": "Open die tydredigeerder"
  },
  "body": [
   {
    "h2": "Laai jou onderskrifte",
    "ps": [
     "Sleep 'n lêer in die gestippelde blok of klik om een te kies; jy kan ook **die inhoud plak** direk in die teksblokkie. Die formaat word bespeur vanaf beide die uitbreiding en die inhoud, en die resultaat word in die formaat-skyfie gewys. Ondersteunde invoere: srt, vtt, ass (insluitend ssa), sbv, lrc en txt."
    ],
    "img": {
     "file": "shift-upload",
     "alt": "Oplaai-area: n voorbeeld-subtitel gelaai, gedetecteer as SRT shift|b0|cap :: Die lêernaam en gedetecteerde formaat verskyn onder die teikenarea; die teksblok bly bewerkbaar. shift|b1|h2 :: Voeg aanpassingstappe by shift|b1|p0 :: Aanpassings vorm n **pyplyn van stappe**: elke stap doen een taak en neem een nommer, met sy eenheid binne die blok gewys. Stappe word van bo na onder toegepas, en die verandering van enige stap **recalculates everything from the original subtitles** — sodat jy enige tyd kan teruggaan en n nommer kan verfyn sonder om n gemors te maak.",
     "cap": "Die lêernaam en bespeurde formaat verskyn onder die asb-laai-sone; die teksblokkie bly bewerkbaar."
    }
   },
   {
    "h2": "Voeg aanpassingsstappe by",
    "ps": [
     "Aanpassings vorm 'n **pyplyn van stappe**: elke stap doen een taak en neem een nommer, met sy eenheid binne die blok gewys. Stappe pas toe van bo na onder, and om enige stap te verander **herbereken alles vanaf die oorspronklike onderskrifte** — sodat jy enige tyd kan teruggaan en 'n nommer kan verfyn sonder om 'n gemors te maak."
    ]
   },
   {
    "h2": "Twee-anker-korreksie",
    "ps": [
     "Wanneer jy nòg die verplasing in sekondes nòg die verhouding ken, gebruik twee ankers: sodra dit bygevoeg is, word die **twee \"huidige\" velde outomaties ingevul** vanaf die eerste en laaste aanwysing van jou lêer. Jy vul net die \"teiken\"-velde in — die tye wat daardie aanwysings werklik behoort te verskyn. Alles tussenin word proporsioneel hersprei."
    ],
    "img": {
     "file": "shift-step-two",
     "alt": "Twee-anker-korreksie: huidige tye outomaties ingevul, teikentye om in te voer",
     "cap": "Die huidige velde kom uit jou lêer; die teikenvelde is die korrekte tye wat jy in die video sien."
    }
   },
   {
    "h2": "Tydlyngeskiktheid en per-aanwysing-wysigings",
    "ps": [
     "Nadat jy die stappe uitgevoer het, lees die **tydlyngeskiktheid**: aanwysings wat te kort, te lank, te dig om te lees is, reëls wat te wyd is, of oorvleuelende aanwysings word almal gelys. Die kontrole **merk slegs kwessies aan en verander nooit self iets** nie. Die vier verstekliniale is 0.833 s minimum duur, 7 s maksimum, 9 karakters per sekonde leeslspoed en 21 karakters per reël — alles op die bladsy bewerkbaar. Daaronder laat per-aanwysing-wysigings jou toe om twee naburige aanwysings saam te smelt, een te verdeel, of die begin en einde direk te wysig; elke wysiging kan ongedaan gemaak word."
    ]
   },
   {
    "h2": "Voer die resultaat uit",
    "ps": [
     "Die resultaatpaneel wys die oorspronklike en aangepaste tye **langs mekaar** vir maklike kolkontrole. Die uitvoerformaat val versteksgewys terug op die invoerformaat, maar jy kan voor aflaai oorskakel na enige van srt, vtt, ass, sbv, lrc of txt."
    ],
    "img": {
     "file": "shift-result",
     "alt": "Resultaatpaneel: voor- en na-tye langs mekaar, met aflaai- en kopieerknoppies",
     "cap": "Oorspronklike tye aan die linkerkant, aangepaste tye aan die regterkant; laai af sodra die kolkontrole reg lyk."
    }
   }
  ]
 },
 "shift-subtitle-timing": {
  "seo": {
   "title": "Hoe om alle subtitels vroeër of later te skuif – AI-SRTSub",
   "desc": "Elke aanwysing is laat met dieselfde hoeveelheid: gebruik die skuifstap van die tydredakteur — voer een negatiewe of positiewe getal in en alle aanwysings beweeg saam.",
   "h1": "Skuif die Hele Subtitellêer Vroeër of Later",
   "intro": "Die klank begin, die subtitel verskyn laat — en elke liewe aanwysing is laat met dieselfde hoeveelheid. Dit is 'n uniforme verplasing: een getal los dit op.",
   "ctaText": "Maak die tydredakteur oop"
  },
  "body": [
   {
    "h2": "Bevestig eers dat elke aanwysing laat is met dieselfde hoeveelheid",
    "ps": [
     "Kolkontroleer een aanwysing naby die begin, een in die middel en een aan die einde. As al drie omtrent dieselfde hoeveelheid laat is, is dit 'n **uniforme verplasing**, en een skuifstap los dit op. As die begin korrek is en die afwyking na die einde toe groei, is dit 'n ander probleem — sien [[subtitles getting more and more out of sync|/guides/subtitles-out-of-sync.html]]."
    ]
   },
   {
    "h2": "Wat om in te voer: negatief om te vervroeg, positief om te vertraag",
    "ps": [
     "Voeg in die tydredakteur 'n **Skuif alles**-stap by en voer die verplasing in die waardeblok in: subtitels wat laat loop, neem 'n negatiewe getal om hulle vroeër te trek; as dit vroeg loop, neem dit 'n positiewe getal om hulle later te stoot. As die subtitels 1.5 sekondes laat is, voer **-1.5** in — die eenheid is sekondes."
    ],
    "img": {
     "file": "shift-step-shift",
     "alt": "Skuif alles-stap met -1.5 sekondes ingevoer",
     "cap": "'n Negatiewe getal trek die hele lêer vroeër; die eenheid word binne die blok geskryf, in sekondes."
    }
   },
   {
    "h2": "Voer dit uit en kontroleer die eerste aanwysing",
    "ps": [
     "Na toepassing lys die resultaatpaneel elke aanwysing se oorspronklike en nuwe tye **langs mekaar**. Kontroleer die eerste aanwysing eerste: land die nuwe begintyd op die raam waar die reël gespreek word? Kolkontroleer dan een in die middel. Elke aanwysing beweeg met dieselfde hoeveelheid en behou sy eie duur."
    ]
   },
   {
    "h2": "Voer uit",
    "ps": [
     "Sodra die kolkontrole reg lyk, laai direk af. Die uitvoerformaat val versteksgewys terug op die invoerformaat en kan na iets anders oorgeskakel word. Die verandering raak slegs tye — nie 'n enkele karakter teks nie."
    ]
   }
  ]
 },
 "simplified-traditional-chinese": {
  "seo": {
   "title": "Nie 'n Karakterruil nie – Een-tot-Baie en Streekswoorde – AI-SRTSub",
   "desc": "Drie dinge maak dit moeilik: een-tot-baie-karterings wat per woord opgelos word, verskillende Taiwan- en Hong Kong-woordeskat, en die omskakling van slegs dialoog. Kry al drie reg en geen menslike herbewerking volg nie.",
   "h1": "Vereenvoudigd teenoor tradisioneel is nie 'n karakterruil nie",
   "intro": "Watter tradisionele karakter 'n vereenvoudigde een vervang, hang af van die karakter langs dit. Dit is waarom hierdie omskakling nie gedoen kan word deur blindweg een karakter op 'n slag te ruil nie.",
   "ctaText": "Maak die omskakelaar oop"
  },
  "body": [
   {
    "h2": "Eerstens: een vereenvoudigde vorm, verskeie tradisionele vorms",
    "ps": [
     "Vereenvoudiging het verskeie tradisionele karakters in een vereenvoudigde vorm saamgevoeg. Om die ander pad terug te gaan, stem een vereenvoudigde karakter ooreen met verskeie tradisionele karakters, en om tussen hulle te kies hang af waarmee dit gepaar word:",
     "Om karakter vir karakter te ruil, vou hulle almal in dieselfde een saam en kry elke geval verkeerd. Om **per woord** op te los is wat hulle skei — die tabelle kom van OpenCC, wat frases voor enkele karakters pas. Byvoorbeeld:"
    ]
   },
   {
    "h2": "Tweedens: Taiwan en Hong Kong is nie dieselfde ding nie",
    "ps": [
     "Daar is nog een laag na omskakeling na tradisioneel: dieselfde woord word verskillend geskryf in Taiwan en Hong Kong. Die woord vir \"sagteware\" is een ding in Taiwan en 'n ander in Hong Kong, and Taiwan gebruik sy eie woord vir \"inligting\".",
     "Vandaar die afsonderlike rigtings. Taiwanese tradisioneel breek selfs op in \"verander wording\" en \"slegs glife\" — slegs glife behou jou bestaande woordeskat, terwyl verander wording streeksooreenkomste ook ruil. Hong Kong kry sy eie rigting."
    ],
    "img": {
     "file": "hanconv-dir",
     "alt": "Skakel om na-kaart: bestemmingsaftreklys wys \"Vereenvoudigd → Taiwanese tradisioneel (verander wording)\"",
     "cap": "Taiwan bied woordingsveranderinge of slegs glife; Hong Kong het sy eie rigting"
    }
   },
   {
    "h2": "Derdens: slegs dialoog moet aangeraak word",
    "ps": [
     "'n Subtitellêer is nie net dialoog nie. Indeksnommers, tye en ASS-stylreëls is ook daarin, en nie een karakter daarvan moet omgeskakel word nie — veral ASS-stylreëls, aangesien dit Engelse richtlynnname bevat wat breek die oomblik dat hulle as dialoog behandel word.",
     "Omskakeling vind dus plaas na ontleding volgens formaat: SRT, VTT, ASS en TXT identifiseer elk watter deel dialoog is, and slegs die karakters daarin word omgeskakel. Tye en style oorleef ongerak, sonder enige formatering om oor te doen."
    ],
    "img": {
     "file": "hanconv-out",
     "alt": "Resultaatgebied: omgeskakelde subtitel en statistiekbalk wat veranderde reëltelling toon",
     "cap": "Die statistiekbalk wys hoeveel reëls verander het; formatering word onveranderd behou"
    }
   },
   {
    "h2": "Gaan terug na vereenvoudig: pas op",
    "ps": [
     "Om tradisioneel na vereenvoudig om te skakel vereis ook dat jy sê **van watter tradisionele verskeidenheid jy kom**: generies, Taiwanese en Hong Kong is drie verskillende roetes, omdat streekswoordeskat na die generiese woord herstel moet word voordat dit omgeskakel kan word. Kies die verkeerde rigting en streekswoordeskat oorleef in die vereenvoudigde uitvoer.",
     "Die onderste groep van die nege rigtings is die een wat terug skakel: tradisioneel → vereenvoudigd, Taiwanese → vereenvoudigd, Hong Kong → vereenvoudigd."
    ]
   },
   {
    "h2": "Verwante hulpmiddels en gidse",
    "ps": [
     "Die volledige deurgang — [[How to convert simplified and traditional subtitles|/guides/hanconv.html]]; as al wat jy nodig het vereenvoudigd na tradisioneel is — [[Convert simplified subtitles to traditional|/guides/srt-simplified-to-traditional.html]]; om na 'n ander taal te vertaal, [[Subtitle translation|/translate.html]]."
    ]
   }
  ]
 },
 "split": {
  "seo": {
   "title": "Sny en Hecht van Subtitels – Sny per Blok, Keting in Volgorde – AI-SRTSub",
   "desc": "Sny een lêer in segmente volgens duur of aanwysingtelling, herbegin elk by nul, of ketting verskeie lêers in volgorde of voeg dit saam volgens tydlyn. Aanwysingnommers word hernommer, teks bly ongerak.",
   "h1": "Hoe om subtitels te sny en te hecht",
   "intro": "Sny een lang subtitellêer in segmente, of hecht verskeie verspreide lêers in een saam. Die snit val altyd op 'n inskrywingsgrens — 'n sin word nooit in die helfte gesny nie.",
   "ctaText": "Maak sny en hecht oop"
  },
  "body": [
   {
    "h2": "Wat hierdie hulpmiddel doen",
    "ps": [
     "Om episodes te sny, segmente te sny en bronne te kombineer, loop alles op dieselfde wanpassing tussen subtitelblokke en videoblokke uit: óf een lêer moet gesny word óf verskeie moet gekombineer word. Hierdie bladsy hanteer beide, elk op sy eie oortjie."
    ]
   },
   {
    "h2": "Kies eers sny of hecht",
    "ps": [
     "Tye oortjies bo: **Sny: een lêer in segmente** en **Hecht: verskeie lêers in een**. Die stap-twee-opsies hieronder verander met jou keuse.",
     "By \"1 Voeg subtitels by\" laai jy 'n lêer op of plak teks; as jy die verkeerde een gekies het, klik \"Vee uit\". Hierdie bladsy lees slegs UTF-8 — as die kodering stukkend is ('n muur van vraastekens of blokkies), gaan eers na [[Garbled text repair|/repair.html]]."
    ],
    "img": {
     "file": "split-mode",
     "alt": "Die twee oortjies bo aan die sny-en-hecht-bladsy",
     "cap": "Sny en hecht is twee oortjies; die stap-twee-opsies volg jou keuse"
    }
   },
   {
    "h2": "Hoe om te sny",
    "ps": [
     "Kies onder \"2 Hoe om te sny\" die basis: **duur** (een segment elke X minute) of **aanwysingtelling** (een segment elke X aanwysings), en voer dan 'n getal in.",
     "Vink \"Herbegin elke segment by 0:00\" aan en elke resulterende segment tel vanaf nul — gebruik dit wanneer jy episodes oplaai en elke segment aan sy eie speler toewys. Laat dit ontvink om die oorspronklike tydstempels te behou, sodat elke segment steeds met sy posisie in die bronvideo ooreenstem.",
     "Die snit val slegs op aanwysingsgrense: wanneer 'n baie lang subtitel die snitpunt oorskry, bly die hele aanwysing in die vroeëre segment."
    ],
    "img": {
     "file": "split-cut",
     "alt": "Die duur- en aanwysingtellingsopsies met die herbegin-by-nul-skakelaar op die snybladsy",
     "cap": "Sny volgens duur of volgens aanwysingtelling, en herbegin opsioneel elke segment by 0:00"
    }
   },
   {
    "h2": "Hoe om te hecht",
    "ps": [
     "Kies onder \"2 Hoe om te hecht\" die metode: **Ketting in volgorde** verskuif die latere lêer sodat dit begin nadat die vroeëre een eindig, sonder oorvleueling tussen segmente; **Voeg saam volgens tydlyn** behou elke lêer se oorspronklike tydstempels en sorteer volgens begintyd.",
     "Gebruik ketting in volgorde wanneer die lêers die eerste en tweede helfte van een episode is, of wanneer afsonderlik proefgeleesde helftes weer aanmekaargepak moet word; gebruik voeg saam volgens tydlyn wanneer die lêers saam op die skerm hoort, soos 'n oorspronklike snit en 'n vertaalde snit.",
     "Na 'n hegting word die aanwysingnommers outomaties hernommer en nie 'n woord dialoog verander nie."
    ],
    "img": {
     "file": "split-join",
     "alt": "Die ketting-in-volgorde- en voeg-saam-volgens-tydlyn-opsies op die hegbladsy",
     "cap": "Ketting in volgorde pas by twee helftes van een episode; voeg saam volgens tydlyn pas by 'n oorspronklike en 'n vertaalde snit"
    }
   },
   {
    "h2": "Neem die resultaat weg",
    "ps": [
     "\"3 Resultaat\" aan die regterkant voer **SRT** en **VTT** uit; klik \"Laai af\" of \"Kopieer\".",
     "Wanneer jy sny, kan jy \"Laai elke segment af\" gebruik, wat elke gesnyde segment dadelik stoor in plaas van een klik per segment."
    ],
    "img": {
     "file": "split-out",
     "alt": "Die SRT/VTT-formaatkeuse met laai-af- en laai-elke-segment-af-knoppies in die resultaatsgebied",
     "cap": "Snyresultate kan segment vir segment afgelaai word; 'n gehegte lêer word direk afgelaai of gekopieer"
    }
   },
   {
    "h2": "Wat ongerak gelaat word",
    "ps": [
     "Nie 'n karakter dialoog verander nie. Hierdie bladsy verander slegs watter aanwysings aan watter segment behoort en hoe hulle genommer is; die inhoud van die inskrywings bly soos dit is.",
     "Met \"Ketting in volgorde\" word die tydstempels van die latere lêers as 'n geheel verskuif — dit is wat hegting vereis; met \"Voeg saam volgens tydlyn\" word elke oorspronklike tydstempel behou."
    ]
   },
   {
    "h2": "Algemene vrae",
    "ps": [
     "**Wat as die laaste segment baie kort eindig?** Dit is normaal. Die oorskot wat nie 'n hele segment vul nie, word sy eie segment in plaas daarvan om opgevul te word.",
     "**Sal 'n sin wat die snitpunt oorskry, gesny word?** Nee. Snitte val slegs op inskrywingsgrense, and 'n aanwysing wat die lyn oorsteek, bly in die vroeëre segment.",
     "**Hoe word twee aanwysings met identiese tye na samesmelting gesorteer?** Volgens begintyd; wanneer begintye gelyk is, word die volgorde waarin jy die lêers bygevoeg het, behou.",
     "**Kan ASS gesny word?** Hierdie bladsy hanteer SRT en VTT. Skakel ASS eers om na SRT of VTT met [[Format conversion|/convert.html]]."
    ]
   },
   {
    "h2": "Privaatheid",
    "ps": [
     "Subtitels word heeltemal in die blaaier verwerk: niks word opgelaai nie en niks gaan deur 'n bediener nie. Maak die bladsy toe en die inhoud is weg."
    ]
   },
   {
    "h2": "Verwante hulpmiddels en gidse",
    "ps": [
     "Om twee lêers in 'n tweetalige snit te kombineer (in plaas van in een episode), gebruik [[Bilingual merging and special effects|/guides/merge.html]]; as die hele tydlyn af is, gaan na [[Timeline adjustment|/shift.html]]; vir 'n hele seisoen s'n gebruik [[Batch conversion|/batch.html]]; en voer [[Subtitle QC|/qc.html]] uit wanneer jy klaar is."
    ]
   }
  ]
 },
 "split-bilingual-subtitles": {
  "seo": {
   "title": "Verdeel Tweetalige Subtitels in Twee Snitte – AI-SRTSub",
   "desc": "Verdeel tweetalige subtitels in twee lêers: oorspronklike en vertalingsnitte laai apart af met verskillende name; beide vorme word herken. – AI-SRTSub",
   "h1": "Verdeel Tweetalige Subtitels in Twee Snitte",
   "intro": "Een tweetalige subtitel word twee lêers — “oorspronklik” en “vertaling”: laai op, kies verdeel-in-twee, laai elk af, met die tydlyne ongeskonde behou.",
   "ctaText": "Verdeel tweetalige subtitels"
  },
  "body": [
   {
    "h2": "Wanneer jy moet verdeel",
    "ps": [
     "Jou speler wil net 'n enkel-talige snit hê; of jy wil die vertalingsnit hê vir 'n hervertaling, of die oorspronklike snit om met 'n ander vertaalde weergawe te paar. 'n Tweetalige subtitel is óf **een aanwysing met twee reëls** (oorspronklik op een reël, vertaling op die ander) óf **twee afsonderlike aanwysings wat dieselfde tydlyn deel** — beide kan verdeel word."
    ]
   },
   {
    "h2": "Waar om dit te doen",
    "ps": [
     "Maak die [[Bilingual Subtitle Stripper|/bilingual.html]] oop en los jou subtitel daarin. Die hulpmiddel bespeur die tweetalige vorm outomaties: een aanwysing met twee reëls word verdeel volgens skryfstelsel, twee aanwysings op dieselfde tydlyn volgens volgorde. Kies **Verdeel in twee** in die modus-aftreklys en klik Begin (of laat dit outomaties herloop). Die resultaatsgebied wys twee stukke: die een wat as `.orig` getiketeer is, is die oorspronklike snit, die een wat as `.dst` getiketeer is, is die vertalingsnit — klik “Laai af” vir elk; die twee snitte deel presies dieselfde tydlyn."
    ],
    "img": {
     "file": "bilingual-split",
     "alt": "Verdelingsresultaat: die oorspronklike snit en die vertalingsnit as twee stukke, elk met 'n aflaaiknoppie",
     "cap": "Verdeel in twee: .orig oorspronklike snit + .dst vertalingsnit, elk afsonderlik afgelaai"
    }
   },
   {
    "h2": "Een algemene strikveld",
    "ps": [
     "**Een aanwysing met twee reëls in tale wat dieselfde alfabet deel (sê Engels plus Frans) kan nie verdeel word nie.** Wanneer snitte deur skryfstelsel geskei word, tel dié as een stelsel en word as enkel-talig behandel. Skakel sulke inhoud eers om na dieselfde-tydlyn-vorm B, en verdeel dan; die twee-aanwysings-vorm paar volgens tydlyn en gee nie om oor taal nie. Vir die ins en outs van beide vorms, sien [[Two ways to make bilingual subtitles|/guides/make-bilingual-subtitles.html]]."
    ]
   }
  ]
 },
 "srt-file-format": {
  "seo": {
   "title": "Wat is 'n SRT-lêer? Hoe om dit oop te maak en te wysig – AI-SRTSub",
   "desc": "Die anatomie van SRT (SubRip)-onderskriflêers: nommer, tydreël, teks. Hoe om een in 'n teksredigeerder oop te maak, waarom 'n speler dit weier, en hoe om verminkte teks en tydstempelvoute reg te maak.",
   "h1": "Die SRT-lêerformaat verduidelik",
   "intro": "SRT is die mees universele onderskrifformaat: plain teks, eenvoudige struktuur, oral aanvaar. Hierdie gids ontleed sy struktuur, hoe om dit oop te maak, en hoe om algemene foute reg te maak.",
   "ctaText": "Maak die onderskrifomskakelaar oop"
  },
  "body": [
   {
    "h2": "Hoe 'n SRT-lêer lyk",
    "ps": [
     "SRT (SubRip) is plain teks — enige teksredigeerder maak dit oop. Elke snit het drie dele: 'n **nommerreël**, 'n **tydreël**, en die **teks**, geskei deur leë reëls. Die tydreël lees `00:00:01,000 --> 00:00:03,500` — let op die **komma** voor die millisekondes, nie 'n punt nie."
    ],
    "img": {
     "file": "convert-upload",
     "alt": "Oplaai-area: 'n gelaaide SRT-lêer wat nommers en tydsberekening toon",
     "cap": "Die standaard SRT-drie-delige snit: nommer, tydreël, teks"
    }
   },
   {
    "h2": "Hoe om dit oop te maak",
    "ps": [
     "Om die inhoud te lees: regs-klik en maak oop met enige **teksredigeerder**. Om dit met 'n video te gebruik: hernoem die lêer om **by die videolêernaam te pas** (afgesien van die uitbreiding), plaas beide in dieselfde gids, en spelers soos VLC, PotPlayer of mpv laai dit outomaties; jy kan dit ook na die speelvenster sleep."
    ]
   },
   {
    "h2": "Regstelling van geweierde lêers en verminkte teks",
    "ps": [
     "**Verminkte karakters**: die lêer is nie UTF-8 nie — stoor dit as UTF-8 in jou redigeerder. **Niks wys nie**: kyk dat die tydreël 'n komma gebruik (nie 'n punt nie) en dat snitnommers nie stukkend is nie (meeste spelers verdra gapings, sommige nie). **Die lêer is HTML of JSON**: die aflaaibron was verkeerd; haal dit weer op."
    ]
   },
   {
    "h2": "Wat SRT kan en nie kan bevat nie",
    "ps": [
     "SRT dra slegs teks en tydsberekening: **geen style** (lettertipes, kleure), **geen posisionering** (waar op die skerm), **geen effekte** nie. Dít benodig ASS — sien [[SRT na ASS|/guides/srt-to-ass.html]]. Vir 'n vergelyking langs mekaar van alle formate, sien [[onderskrifformaatvergelyking|/guides/subtitle-format-comparison.html]]."
    ]
   }
  ]
 },
 "srt-fps-converter": {
  "seo": {
   "title": "SRT FPS-omskakelaar – Verander Onderskrif-raamspoed – AI-SRTSub",
   "desc": "Film is 24fps, uitsending is 25fps, en onderskrifte dryf al hoe meer weg elke minuut: skaal die tydlyn met 0.96 een keer en die hele lêer beland op die teikenspoed.",
   "h1": "Onderskrif-raamspoedomskakeling: 24fps tot 25fps",
   "intro": "Speel 'n 24fps-film se onderskrifte op 'n 25fps-bron af en hulle verloor meer as 'n sekonde elke minuut — teen die eindtitels loop hulle minute agter. Een skalering maak dit reg.",
   "ctaText": "Maak die tydredigeerder oop"
  },
  "body": [
   {
    "h2": "Waarom raamspoed-wanpassing onderskrifte laat dryf",
    "ps": [
     "'n Raamspoedomskakeling herlees **dieselfde tydspan onder twee verskillende horlosies**. 'n 100-minuut 24fps-film het 6000 s × 24 = **144 000 rame**; op 'n 25fps-bron speel daardie 144 000 rame in 5760 sekondes af — **96 minute**. Die hele film loop 4 minute kort, so 'n snit by minuut 50 verskyn sowat 2 minute laat, en die eindtitels se onderskrif wys nooit op nie."
    ]
   },
   {
    "h2": "Die formule en die algemene faktore",
    "ps": [
     "Teikenspoed ÷ oorspronklike spoed = die vermenigvuldiger. **24 tot 25: vermenigvuldig met 0.96** (24÷25); andersom, 25 tot 24: 1.0417. **25 tot 23.976: vermenigvuldig met 0.959**; andersom: 1.0427. Voeg 'n **Skaal volgens spoed**-stap in die tydredigeerder by en plaas die faktor in die waardekas."
    ],
    "img": {
     "file": "shift-step-rate",
     "alt": "Skaal volgens spoed-stap met 0.96 ingevoer",
     "cap": "0.96 is 24÷25; die wenk op die bladsy vermeld selfs raamspoedomskakeling as 'n algemene gebruik."
    }
   },
   {
    "h2": "Wanneer jy nie die twee spoede ken nie",
    "ps": [
     "As jy nie die bron se raamspoed kan vind nie, moenie die faktor raai nie — gebruik eerder **twee ankers**: neem die werklike verskyningstyd van die eerste en die laaste snit as twee punte, en alles tussenin word proporsioneel teruggestrek. Sien [[onderskrifte raak al hoe meer uit sinchronisasie uit|/guides/subtitles-out-of-sync.html]]."
    ]
   },
   {
    "h2": "Wat om agterna te kontroleer",
    "ps": [
     "Skalering skuif elke begin en einde; snitduur strek met dieselfde faktor. Na die uitvoering, verifieer die twee uiterstes: die eerste snit (kleinste oorspronklike fout) en die laaste een (grootste). As beide ente ooreenstem, doen alles tussenin dit ook."
    ]
   }
  ]
 },
 "srt-simplified-to-traditional": {
  "seo": {
   "title": "Skakel Vereenvoudigde Onderskrifte om na Tradisioneel – Taiwan of Hong Kong – AI-SRTSub",
   "desc": "Verander vereenvoudigde Sjinese onderskrifte na tradisioneel: kies Taiwanees (met of sonder streekswoordeskat) of Hong Kong. Een-tot-baie-karterings los op volgens woord. Slegs dialoog verander; tydsberekening bly waar dit is.",
   "h1": "Skakel vereenvoudigde onderskrifte om na tradisioneel",
   "intro": "'n Vereenvoudigde Sjinese onderskrif wat vir 'n Taiwaneese of Hong Kong-gehoor bestem is, benodig net omskakeling — maar die twee streke wil verskillende dinge hê, and om die verkeerde rigting te kies, gee jou bewoording wat plaaslike inwoners nie gebruik nie.",
   "ctaText": "Skakel hierdie onderskrif om"
  },
  "body": [
   {
    "h2": "Die behoefte",
    "ps": [
     "Jou onderskrifte is in vereenvoudigde Sjinees en moet kykers in Taiwan of Hong Kong bereik. Om die karakters een vir een reg te maak is nie realisties nie — 'n enkele episode het honderde snitte — and die twee streke wil nie dieselfde tradisionele teks hê nie: die woordeskat verskil, and die verkeerde rigting lewer bewoording op wat geen plaaslike inwoner sal gebruik nie."
    ]
   },
   {
    "h2": "Waar om dit te doen",
    "ps": [
     "Maak [[Vereenvoudigd-na-tradisioneel-omskakeling|/hanconv.html]] oop, sleep die onderskrif in, en kies een van die vereenvoudigd → tradisioneel-rigtings onder \"Skakel om na\": algemene tradisioneel, Taiwanees (verander bewoording), Taiwanees (slegs tekens) of Hong Kong. Omskakeling vind onmiddellik plaas en die resultaatgebied wys die voltooide onderskrif, gereed om af te laai.",
     "**Vir 'n Taiwaneese gehoor**: kies \"Taiwanees (verander bewoording)\" as streekswoordeskat ook moet verander — \"sagteware\" and \"inligting\" word hul Taiwaneese ekwivalente — of \"Taiwanees (slegs tekens)\" as jy wil hê dat die karaktersvorms verander word terwyl jou oorspronklike bewoording behou word. **Vir 'n Hong Kong-gehoor**: kies \"Hong Kong\", waar \"sagteware\" met nog 'n ander vorm geskryf word."
    ],
    "img": {
     "file": "hanconv-dir",
     "alt": "Skakel om na-kaart: bestemmingsaftreklys wat \"Vereenvoudigd → Taiwaneese tradisioneel (verander bewoording)\" toon",
     "cap": "Taiwan en Hong Kong is afsonderlike rigtings met verskillende woordeskat"
    }
   },
   {
    "h2": "Algemene slaggate",
    "ps": [
     "**Moenie vrees vir een-tot-baie-karterings nie**: dieselfde vereenvoudigde karakter in die woorde vir \"skoon\", \"droog\" and \"boomstam\" karteer na verskillende tradisionele karakters. Die tabelle los dit per frase op, sodat alles nie in een karakter platgedruk word nie.",
     "**Slegs dialoog word omgeskakel**: tydsberekening, indekssyfers and ASS-stylreëls word nie aangeraak nie, sodat die resultaat gereed is om te gebruik.",
     "**Niks verander nie? Gaan dit na voor jy paniekerig raak**: as die statistiekbalk 0 veranderde reëls rapporteer, het die lêer óf geen Sjinese karakters óf die formaat is verkeerd gedetecteer — gaan na dat \"Gedetecteerde formaat\" ooreenstem met wat jy opgelaai het."
    ]
   },
   {
    "h2": "Verwant",
    "ps": [
     "Die volledige verduideliking van al nege rigtings — [[Hoe om vereenvoudigde en tradisionele onderskrifte om te skakel|/guides/hanconv.html]]; waarom dit meer is as net om karakters te ruil — [[Vereenvoudigd teenoor tradisioneel is nie 'n karakterruil nie|/guides/simplified-traditional-chinese.html]]; tradisioneel terug na vereenvoudigd leef ook in [[Vereenvoudigd-na-tradisioneel-omskakeling|/hanconv.html]]."
    ]
   }
  ]
 },
 "srt-to-ass": {
  "seo": {
   "title": "SRT na ASS-omskakelaar – Skakel Onderskrifte Aanlyn Om – AI-SRTSub",
   "desc": "Skakel SRT-onderskrifte om na ASS (Advanced SubStation Alpha) met 'n 1920×1080-doek en 'n skoon verstekstyl, gereed om in enige speler te laai. Loop in jou blaaier.",
   "h1": "SRT na ASS",
   "intro": "Verander SRT-onderskrifte in ASS: los die lêer, kies ASS, laai af. 'n 1920×1080-doek en 'n skoon verstekstyl word vir jou gegenereer.",
   "ctaText": "Skakel SRT → ASS om"
  },
  "body": [
   {
    "h2": "Wanneer jy ASS benodig",
    "ps": [
     "Gebruik ASS wanneer 'n gelaaide onderskrif **beter posisionering en stylbeheer** benodig: dit dra konsepte wat SRT ontbreek — doekgrootte, lettertypestyle, belyning. mpv, PotPlayer, VLC, en die meeste spelers ondersteun dit direk."
    ]
   },
   {
    "h2": "Hoe die uitset lyk",
    "ps": [
     "Die instrument bou 'n standaardopskrif weer op: 'n **1920×1080-doek**, slim omvou (WrapStyle 0), en 'n enkele Verstekstyl — Arial 54, wit teks met 'n swart omlyning, onder in die middel. Elke snit gebruik hierdie styl."
    ],
    "img": {
     "file": "convert-opt-ass",
     "alt": "Uitsetformaat-aftreklys met ASS - Advanced SubStation geselekteer",
     "cap": "Kies ASS as die uitset en laai af na omskakeling"
    }
   },
   {
    "h2": "Word style behou?",
    "ps": [
     "SRT het geen stylkonsep om mee te begin nie. En as jou bron reeds ASS is, **bou die omskakeling die verstekstyl weer op en behou nie die oorspronklike een nie** — gebruik 'n toegewyde onderskrifredigeerder om ASS te herskep. Tydsberekening and teks word in beide gevalle nie geraak nie."
    ]
   }
  ]
 },
 "srt-to-excel": {
  "seo": {
   "title": "Skakel Onderskrifte om na Excel – Proeflees Rij vir Ry – AI-SRTSub",
   "desc": "Vovoer SRT-onderskrifte na Excel uit: een ry per snit oor vier kolomme – indeks, begin, einde en teks. Tyd behou as teks, reëlbreuke ongeskonde, en die gewysigde veld kan weer na onderskrifte omgeskakel word.",
   "h1": "Skakel onderskrifte om na Excel",
   "intro": "Om honderde snitte in 'n teksredigeerder te proeflees is uitputtend. In Excel is elke snit 'n ry, sodat filtrering, kommentaar en soek-en-vervang almal beskikbaar word – en die wysigings gaan terug in jou SRT.",
   "ctaText": "Vovoer na Excel uit"
  },
  "body": [
   {
    "h2": "Die behoefte",
    "ps": [
     "Proeflees, grootmaatwoordewysigings, of die verdeling van die werk tussen verskeie mense – dit alles verloop baie vinniger in 'n sigblad as in plain teks. SRT self is plain teks, maar sy snitstruktuur (indeks, tydsberekening, dialoog) pas netjies op vier sigbladkolomme."
    ]
   },
   {
    "h2": "Waar om dit te doen",
    "ps": [
     "Maak [[Onderskrif ⇄ tabel-omskakeling|/table.html]] oop, skakel oor na \"na tabel\", sleep die SRT in, en die voorskou vul met een ry per snit oor vier kolomme – indeks, begin, einde, teks. Klik \"Laai Excel (.xlsx) af\" en dit is joune. VTT word op dieselfde manier ondersteun.",
     "Wanneer jy klaar gewysig het: skakel die modus oor na \"na onderskrif\", sit die sigblad terug, en jy kry weer 'n SRT. Die reël is drie kolomme vir begin, einde en teks (Engels Start / End / Text werk ook), in enige volgorde."
    ],
    "img": {
     "file": "table-prev",
     "alt": "Tabelvoorskou: elke SRT-snit as 'n ry oor vier kolomme, met die statistiekbalk",
     "cap": "SRT uiteengesit as vier kolomme, omskakelbaar terug op dieselfde manier"
    }
   },
   {
    "h2": "Algemene slaggate",
    "ps": [
     "**Maak eers gebroke kodering reg**: hierdie bladsy lees slegs UTF-8. 'n Skermvol vraastekens of blokkies beteken eers 'n reis na [[Mojibake-herstel|/repair.html]].",
     "**CSV of xlsx**: kies .xlsx wanneer die lêer in Excel ingaan, sodat die tydkolom nie hersaamgestel kan word nie; CSV is meer draagbaar, maar Excel kan dit as iets anders lees – stel die tydkolom op \"Teks\" as dit gebeur.",
     "**ASS werk nie**: ASS dra stylaanwysings, so skakel dit om na SRT voordat dit in 'n tabel geplaas word."
    ]
   },
   {
    "h2": "Verwant",
    "ps": [
     "Die volledige tweerigting-deurloop – [[Hoe om onderskrifte na Excel / CSV om te skakel|/guides/table.html]]; vertaling daarna – [[Onderskrifvertaling|/translate.html]]; 'n laaste deurloop voor aflewering – [[Onderskrif-kwaliteitsbeheer|/qc.html]]."
    ]
   }
  ]
 },
 "srt-to-vtt": {
  "seo": {
   "title": "SRT na VTT-omskakelaar – Skakel onderskrifte aanlyn om – AI-SRTSub",
   "desc": "Skakel SRT-onderskrifte om na VTT (WebVTT) vir HTML5-sporelemente. Tydstempelkommas word outomaties punte. Loop in jou blaaier, niks word opgelaai nie.",
   "h1": "SRT na VTT",
   "intro": "Verander SRT-onderskrifte in VTT: los die lêer, kies VTT, laai af. Tydstempe word vir die webformaat herskryf, alles in jou blaaier.",
   "ctaText": "Skakel SRT → VTT om"
  },
  "body": [
   {
    "h2": "Wanneer jy VTT benodig",
    "ps": [
     "Webspelers (die HTML5 ``-element), YouTube-onderskrifoplaaie en die meeste blaaiergebaseerde spelers aanvaar slegs **VTT (WebVTT)** — nie SRT nie. As al wat jy het SRT is, laat een omskakeling dit werk."
    ]
   },
   {
    "h2": "Hoe die twee formate verskil",
    "ps": [
     "Die inhoud is amper identies; drie dinge word verskillend geskryf: die **WEBVTT-kopreël** (word in VTT vereis); die **millisekondeskeier** in tydstempels — SRT gebruik 'n komma (00:00:01,000) terwyl VTT 'n punt gebruik (00:00:01.000); en VTT laat NOTE- en STYLE-blokke toe wat SRT nie doen nie."
    ],
    "img": {
     "file": "convert-result",
     "alt": "Omskakelingsresultaat wat die WEBVTT-kop en punt-tydstempels toon",
     "cap": "Die omgeskakelde VTT: WEBVTT eerste reël, punt-tydstempels"
    }
   },
   {
    "h2": "Hoe om om te skakel",
    "ps": [
     "Maak die [[omskakelaar|/convert.html]] oop, los die SRT in, kies **VTT - WebVTT** as die uitvoer, skakel dan om en laai af. Cue-volgorde, tydsfaktore en teks met meervoudige reëls word presies gehou soos dit is — slegs die sintaksis verander. Gaan jy die ander pad? Sien [[VTT na SRT|/guides/vtt-to-srt.html]]."
    ]
   }
  ]
 },
 "subtitle-format-comparison": {
  "seo": {
   "title": "SRT vs VTT vs ASS vs SBV vs LRC – Watter onderskrifformaat – AI-SRTSub",
   "desc": "'n Vergelyking van vermoëns van vyf algemene onderskrifformate: teksstilering, posisionering, tydsberekening-presisie, waar elkeen hoort en hoe om tussen hulle om te skakel.",
   "h1": "Kies 'n onderskrifformaat: SRT / VTT / ASS / SBV / LRC",
   "intro": "Dieselfde onderskrif wat in vyf formate gestoor is, dien vyf verskillende meesters. Hierdie gids vergelyk wat elke formaat kan doen en hoe om tussen hulle te beweeg.",
   "ctaText": "Maak die onderskrifomskakelaar oop"
  },
  "body": [
   {
    "h2": "Kies 'n formaat in een sin",
    "ps": [
     "Sywaartse laai in 'n speler, maksimum versoenbaarheid → **SRT**; webspelers (HTML5-spoor) of YouTube-oplaai → **VTT**; lettertipes, kleure, posisionering, effekte → **ASS**; afgelaai van YouTube → **SBV** (skakel om na SRT om ondersteuning te verbreed); liedjiestekste, reël-vir-reël-singing → **LRC**."
    ],
    "img": {
     "file": "convert-opt",
     "alt": "Uitvoerformaat-aftreklys: ses teikenformate",
     "cap": "Die ses uitvoerteikens in die omskakelaar dek elke formaat in hierdie gids"
    }
   },
   {
    "h2": "Vergelyking van vermoëns",
    "ps": [
     "**SRT**: plain text + timing, geen stilering of posisionering, die versoenbaarheidskampioen. **VTT**: teks + tydsberekening, inheems ondersteun deur blaaiers, kan posisionering en basiese stilering dra, punt voor millisekondes. **ASS**: teks + tydsberekening + volle stilering (lettertipes, kleure, omlynings, posisionering, effekte), tydsberekening tot sentisekondes. **SBV**: YouTube se minimale onderskrifformaat, begin en einde op een reël. **LRC**: liriekeformaat, slegs begintye, geen eindtye, geen stilering."
    ]
   },
   {
    "h2": "Paaie tussen formate",
    "ps": [
     "Enige hiervan skakel in beide rigtings in die [[omskakelaar|/convert.html]] om: lees ondersteun srt, vtt, ass (insluitend ssa), sbv, lrc, txt; uitvoer ondersteun srt, vtt, ass, sbv, lrc, txt. Die algemene roetes het elk hul eie gids: [[SRT na VTT|/guides/srt-to-vtt.html]], [[VTT na SRT|/guides/vtt-to-srt.html]], [[SRT na ASS|/guides/srt-to-ass.html]], [[ASS na SRT|/guides/ass-to-srt.html]], [[SBV na SRT|/guides/sbv-to-srt.html]], [[LRC na SRT|/guides/lrc-to-srt.html]]."
    ]
   },
   {
    "h2": "Wat omskakelings verloor",
    "ps": [
     "Om na SRT om te skakel, laat altyd stilering en posisionering val (SRT kan dit nie hou nie). Om na ASS om te skakel met hierdie hulpmiddel **bou 'n verstekstyl weer op en behou nie die oorspronklike een nie**. LRC na SRT benodig dat eindtye ingevul word (elk reël duur tot die volgende; die laaste kry 3 sekondes). Tydstempelwaardes en teks bly identies in elke rigting."
    ]
   }
  ]
 },
 "subtitle-garbled-characters": {
  "seo": {
   "title": "Waar onderskrif-mojibake vandaan kom – Vind dit, herstel dit – AI-SRTSub",
   "desc": "Mojibake beteken 'n verkeerde lees, nie 'n beskadigde lêer nie. Vervangingskarakters, mure van aksentletters en reekse duistere karakters wys elkeen na 'n oorsaak — leer watter herstel en watter nooit nie.",
   "h1": "Waar onderskrif-mojibake vandaan kom",
   "intro": "Dieselfde grepe wat as UTF-8 en as GBK gelees word, kom as twee heeltemal verskillende stelle karakters na vore. Hoe die rommelteks lyk, is direkte bewys van watter stap verkeerd gegaan het.",
   "ctaText": "Maak die mojibake-herstelinstrument oop"
  },
  "body": [
   {
    "h2": "Die lêer is fine — dit is verkeerd gelees",
    "ps": [
     "Wat 'n onderskriflêer stoor, is grepe. Om grepe in karakters te verander, vereis om te weet in watter kodering dit geskryf is — kry dit verkeerd en jy kry mojibake. Nie een greep ontbreek uit die lêer nie; lees dit weer met die regte kodering en die karakters kom terug.",
     "Dit verdeel die taak in twee: **om uit te werk watter kodering dit as begin gehad het**, en **om dit te stoor as 'n kodering wat jou speler kan opspoor**. Die eerste kom van proefdekodering en -puntetelling, die tweede van die stoor van 'n kopie. Hulle los verskillende probleme op."
    ]
   },
   {
    "h2": "Vyf voorkoms, vyf oorsake",
    "ps": [
     "Mojibake is nie ewekansig nie — hoe dit lyk, verklap wat dit veroorsaak het:"
    ],
    "img": {
     "file": "repair-diag",
     "alt": "Diagnosekaart wat elke tipe mojibake-spoor lys",
     "cap": "Diagnose sorteer mojibake volgens oorsaak eerder as om dit saam te hoop"
    }
   },
   {
    "h2": "Waarom die vervangingskarakter nie herstel kan word nie",
    "ps": [
     "Die vervangingskarakter is die skeidslyn. A `` beteken die grepe is reeds weggegooi **op 'n vroeëre stap** (gewoonlik een of ander program wat die lêer lees en dit weer stoor), en niks is opgeteken oor wat laat val is nie. Op daardie stadium is daar niks om agteruit van te redeneer nie — niemand kan dit herstel nie.",
     "Dus hanteer die herstelbladsy twee gevalle verskillend. Laai 'n lêer op en die oorspronklike grepe is ongeskonde, wat dit laat probeer elke kodering; as geplakte teks reeds die vervangingskarakter bevat, sê dit dit duidelik: \"kan nie herstel word nie, laai asseblief die oorspronklike lêer op\".",
     "Daar is ook die omgekeerde geval: die inhoud lees heeltemal goed, maar jou speler wys steeds rommel. Die lêer is nie te blameer nie — **die speler het die verkeerde kodering gekies**. Om die teks te redigeer sal nie help nie; stoor 'n kopie as UTF-8 met BOM of GBK en gee dit daardie."
    ],
    "img": {
     "file": "repair-up",
     "alt": "Oplaai-area: sleep-en-los en plak as twee toetspunte",
     "cap": "Laai die lêer op as jy kan — ongeskonde grepe beteken iets om te herstel"
    }
   },
   {
    "h2": "Wat dit vergelyk terwyl dit herstel",
    "ps": [
     "Die instrument probeer elke plausibele kodering, en ken dan punte toe aan elke resultaat: hoeveel daarvan gemaak is van algemene karakters, of daar reekse aksente is, reekse simbole, of die CJK-lopies mure van duistere karakters is. Die resultaat met die hoogste puntetelling gaan na bo in die lys.",
     "**As geen puntetelling duidelik beter is nie, word niks aanbeveel nie** — beter om vir jou te sê \"dit lees goed soos dit is\" en nie jou af te skeep met iets wat net vaagweg na taal lyk nie. Teks wat twee keer vermink is (een keer verkeerd gestoor, dan een keer verkeerd herstel) kry een ekstra rondte agteruitoplossing op die boonste kandidate."
    ],
    "img": {
     "file": "repair-fix",
     "alt": "Kandidaatlys gesorteer volgens puntetelling, elkeen geëtiketteer met sy koderingspaar",
     "cap": "Kandidate gerangskik volgens puntetelling — geen duidelike wenner, geen aanbeveling"
    }
   },
   {
    "h2": "Om die regte kodering te stoor voltooi die taak",
    "ps": [
     "Herstelde teks moet steeds gestoor word as 'n kodering wat jou speler herken. Spelers op Windows maak gewoonlik staat op die BOM om kodering op te spoor, so **UTF-8 met BOM** is die minste moeite; ouer hardeware en sommige streeksspelers wil GBK hê. Jy kan UTF-8, UTF-8 (met BOM), GBK, Big5, Shift_JIS of EUC-KR kies, en daar sal aan jou gesê word om 'n ander te kies as iets nie pas nie (GBK kan nie Koreaans hou nie)."
    ],
    "img": {
     "file": "repair-out",
     "alt": "Resultaatarea: stoor-as-koderingsaftreklys en aflaaiknoppie",
     "cap": "Stoor dit as iets wat die speler herken en mojibake word ware opgelos"
    }
   },
   {
    "h2": "Verwante instrumente en gidse",
    "ps": [
     "Die volledige deurloop — [[Hoe om mojibake-onderskrifte te herstel|/guides/repair.html]]; wat 'n SRT-lêer eintlik stoor — [[Wat is binne 'n SRT-lêer|/guides/srt-file-format.html]]; die kodering is fine maar die inhoud is vuil (watermerke, advertensies, gehoorgestremde etikette) — [[Onderskrifopruiming|/clean.html]]."
    ]
   }
  ]
 },
 "subtitle-glossary": {
  "seo": {
   "title": "Termtabelle: een seisoen, een woordeskat – Wanneer om een te bou – AI-SRTSub",
   "desc": "'n Termtabelle herstel dieselfde woord wat onkonsekwent vertaal is: wanneer om een te bou, hoe om dit oor 'n seisoen te hergebruik, en meer.",
   "h1": "Termtabelle: om 'n seisoen konsekwent te hou",
   "intro": "Wanneer 'n naam A is in episode een en B in episode sewe, dink kykers hulle is twee karakters. 'n Termtabelle verhoed presies dit — dit maak reg wat dinge genoem word.",
   "ctaText": "Maak bondel-termvervanging oop"
  },
  "body": [
   {
    "h2": "'n Termtabelle herstel onkonsekwentheid",
    "ps": [
     "Woordkeuseprobleme in onderskrifte kom in twee soorte voor: \"hierdie woord is verkeerd vertaal\" en \"dieselfde woord word anders vertaal van die een plek na die ander\". Die eerste is 'n woordeboekprobleem; die tweede is waarvoor 'n termtabelle is.",
     "Die tweede is beide algemener en moeiliker om raak te sien: `Thor` word \"Thor\" in episode een en \"Donar\" in episode sewe, en elke episode lyk goed op sy eie terwyl die reeks as geheel kykers laat dink 'n nuwe karakter het verskyn. 'n Termtabelle verander \"hierdie produksie noem hom Thor\" in 'n uitvoerbare reël wat gelyktydig op die hele onderskriflêer toegepas word."
    ]
   },
   {
    "h2": "Wanneer dit die moeite werd is om een te bou",
    "ps": [
     "Nie elke onderskriflêer benodig 'n termtabelle nie. Die gevalle wat een regverdig, is gewoonlik die volgende:"
    ],
    "img": {
     "file": "glossary-rules",
     "alt": "Vervangingsreëls gegroepeer volgens kategorie in 'n termtabelle",
     "cap": "Gebruik #-opmerkings om reëls te groepeer, en om een tydelik af te skakel tydens redigering"
    }
   },
   {
    "h2": "Om een tabel oor 'n seisoen te behou",
    "ps": [
     "'n Termtabelle word **inkrementeel** instand gehou: maak die name vas in episode een, voeg dan 'n reël by wanneer 'n nuwe term verskyn, en teen die einde van die seisoen is die tabel volledig. Vir die volgende seisoen van dieselfde reeks, begin daarmee.",
     "Skryf reëls 'n bietjie wyer as wat streng nodig is — sodra jy op \"Thor\" besluit het, voeg ook \"Donar -> Thor\" by, sodat iemand anders se onderskrifte in dieselfde deurgang in lyn gebring kan word.",
     "Lees altyd die **veranderingslys** daarna: dit benoem elke cue, elke reël en wat wat geword het. Dit is die enigste plek waar jy kan bevestig dat die verandering reg was en nie oordryf is nie, en enige inskrywing waarvan jy nie hou nie, kan met 'n klik teruggedraai word."
    ],
    "img": {
     "file": "glossary-diff",
     "alt": "Die lys van individuele veranderinge in die resultategebied",
     "cap": "Elke verandering word gelys; klik op een wat jy nie wil hê nie om dit terug te draai"
    }
   },
   {
    "h2": "Wat om nie aan 'n termtabelle te gee nie",
    "ps": [
     "'n Termtabelle verander **woorde**. Hierdie drie dinge is buite sy taak, en moet dit wees:",
     "**Grammatika en sinskonstruksie** — jy kan nie 'n woord in 'n sin verander nie; sin-vlak werk gaan terug na [[Onderskrifvertaling|/translate.html]] of na 'n mens.",
     "**Inhoudsopheffing** — om hele reëls soos watermerke, advertensies en SDH-cues te laat val, behoort aan [[Onderskrifopruiming|/clean.html]]; termtabellereëls vervang, hulle vee nie reëls uit nie.",
     "**Tydlyne** — 'n termtabelle raak nooit tyd aan nie. Vir 'n globale verskuiwing of 'n tempo-probleem, gaan na [[Tydlynverstelling|/shift.html]]."
    ]
   },
   {
    "h2": "'n Paar dinge wat maklik is om verkeerd te kry",
    "ps": [
     "**Sjinees vervang steeds substringe met hele-woord-passing aangeskakel — dit is normaal.** Sjinees en Japanees skei nie woorde met spasies nie, dus kan die instrument nie woordgrense bepaal nie en het hele-woord-passing geen effek daar nie; die `art` sal nie `start` aanraak nie, beskerming werk net vir Engels.",
     "**Volgorde verander die resultaat.** Reëls loop van bo na onder en teks wat deur een reël geproduseer word, word weer deur die reëls daaronder geskandeer. Vervang A met B en dan B met C en jy eindig met C op.",
     "**Om slegs die vertaling te verander, stel die omvang in.** Kies in 'n tweetalige lêer \"slegs tweede reël\"; inskrywings met net een reël bly onaangeraak onder enige enkel-reël-instelling — die instrument raai nie watter kant die oorspronklike is nie.",
     "**Die termtabelle word nie gestoor nie.** Dit is leeg elke keer as jy die bladsy oopmaak, so hou jou eie tekslêer en gee dit aan."
    ]
   },
   {
    "h2": "Verwante instrumente en gidse",
    "ps": [
     "Vir die volledige deurloop, sien [[Hoe om terme in onderskrifte in 'n bondel te vervang|/guides/glossary.html]]; as die inhoud vuil is, voer eers [[Onderskrifopruiming|/clean.html]] uit; sodra die name vasgestel is en jy ander tale benodig, gaan na [[Onderskrifvertaling|/translate.html]]; en voer die resultaat deur [[Onderskrif-Kwaliteitsbeheer|/qc.html]]."
    ]
   }
  ]
 },
 "subtitle-quality-check": {
  "seo": {
   "title": "Vooraf-leweringsonderskrif-Kwaliteitsbeheerkontrolelys – AI-SRTSub",
   "desc": "Onderskrif-leweringkontrolelys: oorkruisings, leesnoed, reëlbreedte en leestekens faal die meeste. Voer die 17 Kwaliteitsbeheerreëls uit — helfte van die probleme is een-klik-oplossings.",
   "h1": "Wat om voor aflewering te kontroleer",
   "intro": "Voltooide onderskrifte is nie gereed om af te lewer nie: die probleme wat kykers met die eerste oogopslag opmerk, is presies die wat jy nie na honderd kere kyk kan sien nie. Hierdie kontrolelys dek daardie finale deurgang.",
   "ctaText": "Voer 'n onderskrif-Kwaliteitsbeheerkontrole uit"
  },
  "body": [
   {
    "h2": "Waarom jy nie self die probleme kan sien nie",
    "ps": [
     "Enigeen wat onderskrifte maak, ken die inhoud te goed — jy weet wat elke reël volgende sê, so niks voel ooit te vinnig nie; jy het die uitleg honderde kere gesien, en jou oë slaan vanself die gebreke oor. Dus kan die vooraf-leweringskontrole nie staatmaak op “om dit weer van bo af te kyk” nie — dit moet **teen getalle gemeet word**: leesnoed, reëlbreedte, duur, oorkruisings. Laat die syfers besluit."
    ]
   },
   {
    "h2": "Die ses mees algemene mislukkings",
    "ps": [
     "Gerangskik volgens hoe gereeld hulle 'n aflewering kelder:"
    ]
   },
   {
    "h2": "Hoe om te kontroleer",
    "ps": [
     "Maak [[Onderskrif-Kwaliteitsbeheer|/qc.html]] oop en gooi jou onderskrifte daarin; stel die taal in op outo-opsporing (27 tale, elkeen met sy eie reëlvlakke). Die verslag lys bevindings op drie vlakke — **foute / waarskuwings / wenke** — elkeen met die inskrywingsnommer en die gemete waarde. Foute moet hanteer word (verminkte teks, tydstempelformaat, eindig vroeër as begin, gebreekte numerering); waarskuwings hang af van die geval (oorkruisings, leesnoed, reëlbreedte, duur); wenke is die verfyning (reëlsbreekposisie, spasies, leestekens)."
    ],
    "img": {
     "file": "qc-report",
     "alt": "Kwaliteitsbeheerverslag: 'n drievlak-probleemlys, elke bevinding met inskrywingsnommer en gemete-teenoor-drempel-vergelyking",
     "cap": "'n Drievlakverslag wat die inskrywingsnommer en gemete waarde vir elke bevinding gee"
    }
   },
   {
    "h2": "Wat met een klik reggemaak kan word",
    "ps": [
     "Numerering, leë inskrywings, heromlyning, spasies en leestekens — enigiets wat **die tydsberekening ongerak laat** — kan outomaties reggemaak word; regstellings wat **die tydsberekening verander** (om begin en einde te omruil, oorkruisings te verskuif, duurs te snoei of te rek) is by verstek ontmerk en moet slegs gemerk word nadat jy die impak bevestig het. **Leesnoed oor die limiet het geen outo-regstelling nie** — die masjien kan nie weet watter woord om te sny nie, so sny die vertaling self korter of maak die tydsberekening 'n bietjie losser; sien [[Onderskrifte te vinnig om te lees|/guides/subtitle-too-fast.html]]. Na die regstelling loop 'n vars kontrole outomaties, and die verslag tel slegs wat werklik reggemaak is."
    ]
   },
   {
    "h2": "Terwyl jy besig is",
    "ps": [
     "Die verslagbladsy kan 'n plain-text `.qc.txt`-verslag direk aflaai — heg dit aan die aflewering sodat die ander kant met 'n oogopslag sien wat jy gekontroleer het. Vir vars vertaalde onderskrifte, voer Kwaliteitsbeheer uit voor aflewering; algehele tydlyndrywing is 'n ander soort probleem — as leesnoed steeds misluk na kontrole, sien [[Onderskrifte dryf uit sinchronisasie|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "subtitle-speed-converter": {
  "seo": {
   "title": "Sinkroniseer onderskrifte na video se spoedverandering – AI-SRTSub",
   "desc": "Video is versnel of vertraag en die onderskrifte pas nie meer nie: voer die spoedfaktor by die skaal-volgens-tempo-stap in en die hele tydlyn rek saam met die video.",
   "h1": "Pas onderskrifte aan na 'n video se spoedverandering",
   "intro": "Die video het in die geheel vinniger of stadiger geword, die onderskrifte het op die oorspronklike tempo gebly — alles na 'n sekere punt is uit. Voer die faktor in en die hele tydlyn skaal saam met die video.",
   "ctaText": "Maak die tydredigeerder oop"
  },
  "body": [
   {
    "h2": "Wanneer om 'n koers in plaas van 'n verskuiwing te gebruik",
    "ps": [
     "Die video is **as 'n geheel** versnel of vertraag (sê 0.9x of 1.25x in die redigeersagteware) terwyl elke aanwysing sy oorspronklike ritme behou het: die begin stem ooreen, en hoe verder jy gaan, hoe erger word dit — met 'n konstante verhouding. Dit is 'n koersprobleem. As die hele lêer eenvoudig met 'n vaste bedrag verskuif word sonder om te groei, is 'n verskuiwing genoeg — sien [[skuif die hele onderskriflêer vroeër of later|/guides/shift-subtitle-timing.html]]."
    ]
   },
   {
    "h2": "Watter nommer om in te voer",
    "ps": [
     "Onderskrifte moet die video volg, so voer **die faktor in waarmee die video werklik verander het**: 'n versnelling van 1.25x beteken aanwysingstye vermenigvuldig met 1.25 om op te vang; 'n vertraging van 0.9x vermenigvuldig met 0.9. Voeg in die tydredigeerder 'n **Skaal volgens koers**-stap by en plaas die faktor in die waarde-blokkie."
    ],
    "img": {
     "file": "shift-step-rate",
     "alt": "Skaal volgens koers-stap met 'n faktor in die waarde-blokkie",
     "cap": "'n Faktor bo 1 rek die tydlyn (vir 'n versnelde video), onder 1 komprimeer dit (vir 'n vertraagde een)."
    }
   },
   {
    "h2": "Hoe dit van 'n verskuiwing verskil",
    "ps": [
     "'n Verskuiwing **skuif** elke aanwysing se tye met dieselfde vaste bedrag en behou aanwysingsduur; 'n koers **vermenigvuldig** beide begin en einde, sodat duurs ook skaal. Na 'n spoedverandering het die duurs self verander — dit is presies waarom 'n koers vereis word."
    ]
   },
   {
    "h2": "As jy nie seker is oor die faktor nie",
    "ps": [
     "Wanneer die faktor verlore is, val terug op **twee ankers**: voer die egte videotye van die eerste en die laaste aanwysing in en alles tussenin sprei proporsioneel uit — gelykstaande aan om vir die regte faktor op te los. Sien [[onderskrifte raak al hoe meer uit sinchronisasie|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "subtitle-too-fast": {
  "seo": {
   "title": "Onderskrifte te vinnig om te lees – Herstel leesmaat – AI-SRTSub",
   "desc": "Onderskrifte te vinnig om te lees — kort duur of lang teks? Kwaliteitsbeheer merk inskrywings oor 20 karakters/sekonde (9 hanzi vir CJK); duur herstel outomaties, teks moet bewerk word.",
   "h1": "Onderskrifte te vinnig om te lees",
   "intro": "Kykers druk gedurig pouse? Die sondebok is leesmaat. Hoe om dit te meet, hoe om dit te herstel, en wanneer om die teks te bewerk teenoor die tydsberekening — alles in een gids.",
   "ctaText": "Gaan leesmaat na"
  },
  "body": [
   {
    "h2": "Wat is leesmaat?",
    "ps": [
     "Leesmaat is eenvoudig **of kykers kan klaarmaak om 'n onderskrif te lees binne die tyd wat dit op die skerm bly**. Die wiskunde is reguit: teksbreedte gedeel deur sekondes op skerm. Algemene bedryfsperke: 9 volbreedte-karakters per sekonde vir Chinees, Japannees en Koreaans (18 halfbreedte-eenhede), 20 halfbreedte-eenhede per sekonde vir ander tale. 'n Lyn van 20 hanzi wat 1 sekonde hou, werk uit op 40 breedte-eenhede per sekonde — meer as dubbel die perk, en kykers sal dit nooit klaarmaak nie."
    ]
   },
   {
    "h2": "Eerstens, onderskei watter soort vinnig",
    "ps": [
     "“Te vinnig om te lees” is eintlik twee verskillende probleme: **te kort duur** — die aanwysing sny weg na een of tweehonderd millisekondes, gewoonlik 'n tydsberekeningsfout of 'n redigeeroorskot; **te lang teks** — die duur is in orde, maar die lyn prop 30 hanzi in, en geen spoedperk gaan dit red nie. Die regstellings is teenoorgesteld, so vind eers uit watter een jy het."
    ],
    "img": {
     "file": "qc-rules",
     "alt": "Die leesmaatperk-instelling in die kwaliteitsbeheerbladsy, met 18 vir CJK en 20 vir ander tale as verstek",
     "cap": "Kwaliteitsbeheerdrempels vir leesmaat: 18 breedte-eenhede per sekonde vir CJK, 20 vir ander tale"
    }
   },
   {
    "h2": "Hoe om na te gaan",
    "ps": [
     "Maak [[Subtitle QC|/qc.html]] oop en los jou onderskrifte daarin. In die verslag is “te kort duur” 'n waarskuwing wat die gemete millisekondes toon (drempel: 833 millisekondes); “onleesbare spoed” is sy eie bevinding wat die gemete breedte-eenhede per sekonde toon. Vir tweetalige onderskrifte tel slegs die lyn wat in die teikentaal geskryf is — die twee tale word nie by mekaar getel nie."
    ]
   },
   {
    "h2": "Hoe om dit reg te maak",
    "ps": [
     "**Te kort duur**: regmaakbaar met een klik — die aanwysing word outomaties verleng tot 833 millisekondes, sonder om die begin van die volgende aanwysing te oorskry (‘n regstelling moenie nuwe oorvleuelings skep nie). **Te lang teks**: geen outomatiese regstelling nie — die masjien kan nie weet watter woord om te sny nie. Twee paaie, jou keuse: verkort die vertaling (klik die sel in die vertaalgereedskap om dit te bewerk), of rek hierdie aanwysing se duur (slegs as daar ‘n gaping voor die volgende aanwysing is; vir algemene tydlynprobleme sien [[Timeline Shift|/shift.html]]). Voer kwaliteitsbeheer daarna weer uit om te bevestig dat die leesmaat weer binne die drempel is."
    ]
   },
   {
    "h2": "Moenie oorregmaak nie",
    "ps": [
     "Om aan die spoedperk te voldoen beteken nie gemaklike kyk nie: om elke aanwysing reg tot op 9 karakters per sekonde in te prop maak die hele film vermoeiend. As 'n vuistreël, bly die meeste van die tyd rondom 70% van die drempel, and laat dialoogdigte gedeeltes van tyd tot tyd effens oorskry. Onderskrifblokke wat te dikwels flikker, is ‘n probleem op hul eie — voer die volle stel maatstawwe uit voor aflewering, sien [[What to Check Before Delivery|/guides/subtitle-quality-check.html]]."
    ]
   }
  ]
 },
 "subtitles-out-of-sync": {
  "seo": {
   "title": "Onderskrifte raak al hoe meer uit sinchronisasie? Herstel dit – AI-SRTSub",
   "desc": "Begin goed, ‘n paar sekondes agter teen middel van film, onbruikbaar aan die einde: dit is progressiewe weglating, gewoonlik ‘n raamtempo-wanpassing of video-spoedverandering. Twee ankers herstel dit.",
   "h1": "Onderskrifte raak al hoe meer uit sinchronisasie: Oorsake en regstellings",
   "intro": "Goed aan die begin, ‘n paar sekondes laat ná ‘n halfuur, hopeloos aan die einde. Hierdie tipe weglating het bekende oorsake — en ‘n bekende regstelling.",
   "ctaText": "Herstel hierdie lêer"
  },
  "body": [
   {
    "h2": "Vertel eers die twee tipe wanpassing uitmekaar",
    "ps": [
     "Wanpassing kom in twee soorte voor: ‘n **eenvormige verskuiwing** beteken elke aanwysing is laat (of vroeg) met dieselfde bedrag, rofweg gelyk van begin tot einde; **progressiewe weglating** beteken die begin is korrek en die fout groei na die einde toe, moontlik tot minute. Hierdie artikel handel oor die tweede soort — vir die eerste, sien [[skuif die hele onderskriflêer vroeër of later|/guides/shift-subtitle-timing.html]]."
    ]
   },
   {
    "h2": "Waarom dit al hoe meer wegraak",
    "ps": [
     "Weglating kom van **twee verskillende horlosies** af: die drie mees algemene oorsake is (1) ‘n raamtempo-wanpassing — ‘n 24fps-film se onderskrifte op ‘n 25fps-bron verloor meer as ‘n sekonde per minuut; (2) die video is versnel of vertraag terwyl die onderskrifte hul oorspronklike tempo behou het; (3) ‘n VFR-opname (veranderlike raamtempo) waarvan die tydlyn van meet af aan ongelyk is. Wat hulle deel: die fout groei rofweg lineêr met speeltyd."
    ]
   },
   {
    "h2": "Herstel dit met twee ankers",
    "ps": [
     "Omdat die fout lineêr groei, plaas dit alles terug deur ‘n korrekte tyd aan elke kant vas te pen en die middel proporsioneel te hersprei. Voeg in die tydredigeerder **twee-anker-korreksie** by: die twee \"huidige\" velde word outomaties ingevul met hierdie lêer se oorspronklike tye; jy kyk na die video en voer **wanneer die eerste en die laaste aanwysing werklik verskyn** in die twee \"teiken\"-velde in."
    ],
    "img": {
     "file": "shift-step-two",
     "alt": "Twee-anker-korreksie: huidige tye outomaties ingevul, teikentye om in te voer",
     "cap": "Neem die ankers by die twee uiterstes — kleinste en grootste oorspronklike fout — en alles tussenin hersprei proporsioneel."
    }
   },
   {
    "h2": "Hoe om die resultaat te verifieer",
    "ps": [
     "Na die uitvoering lys die resultaatpaneel elke aanwysing se oorspronklike en nuwe tye **langs mekaar**. Koltoets drie plekke: die eerste aanwysing, een in die middel, en die laaste — die drie posisies met kleinste, medium en grootste oorspronklike fout. As al drie land, doen die hele lêer dit."
    ],
    "img": {
     "file": "shift-result",
     "alt": "Resultaatpaneel: voor- en na-tye langs mekaar, met aflaaiknoppie",
     "cap": "Die nuwe tye van middelste aanwysings moet tussen die twee ente val — ‘n teken dat die proporsie reg is."
    }
   },
   {
    "h2": "Wanneer twee ankers nie genoeg is nie",
    "ps": [
     "Twee-anker-korreksie neem aan dat die fout **lineêr** is. As die bron ‘n VFR-skermopname met ‘n raamtempo-sprong in die middel van die lêer is, kan ‘n lineêre trek nie die middel regmaak nie — neem ‘n duidelik verkeerde middelste aanwysing as ‘n derde punt, sny die lêer daar, en voer twee-anker-korreksie op elke helfte uit. Kyk ook na die regstelling die middelste gedeelte teen normale spoed weer om te bevestig dat geen plaaslike wanpassing agterbly nie."
    ]
   }
  ]
 },
 "table": {
  "seo": {
   "title": "Onderskrif na Excel- / CSV-omskakeling – Beide rigtings – AI-SRTSub",
   "desc": "Tweerigting-stap-vir-stap: voer SRT/VTT uit na Excel of CSV vir ry-vir-ry-proeflees, en voer die bewerkte blad dan weer in as onderskrifte. Drie kolomme benodig, enige volgorde; tyd word as teks gehou.",
   "h1": "Hoe om onderskrifte na Excel / CSV om te skakel",
   "intro": "Proeflees en vertaling is makliker in ‘n sigblad. Voer onderskrifte uit na Excel of CSV, bewerk ry vir ry, en skakel dan weer terug — tydkolomme bly teks, en reëlbreuke binne dialoog word behoue.",
   "ctaText": "Maak die sigbladomskakelaar oop"
  },
  "body": [
   {
    "h2": "Wat hierdie hulpmiddel doen",
    "ps": [
     "Onderskrifte is rye aanwysings en sigblaaie is rye rekords — sodra dit ‘n blad is, kan proeflees, kommentaar en grootmaatvertaling alles gedoen word met hulpmiddels wat jy reeds ken. Beide rigtings word ondersteun:"
    ]
   },
   {
    "h2": "Laai op en kies ‘n rigting",
    "ps": [
     "Sleep ‘n lêer in of soek een. Elke rigting benodig ‘n ander tipe lêer: **na blad** neem onderskriflêers (SRT / VTT), **na onderskrif** neem sigbladlêers (CSV / Excel, beide .xlsx en .xls). Kies die verkeerde modus en die bladsy sê watter lêertipe daardie modus wil hê.",
     "⚠️ Hierdie bladsy lees slegs UTF-8. As jou onderskrif as ‘n skermvol vraaktekens of blokkies oopmaak, voer dit eers deur [[Mojibake repair|/repair.html]] — gebroke kodering lees hier slegs as vervangingskarakters."
    ],
    "img": {
     "file": "table-up",
     "alt": "Sigbladomskakelaar-oplaaigebied: sleeparea en die twee modusskakelaars",
     "cap": "Elke modus wil ‘n ander lêer hê: onderskrifte in, sigblad uit — en terug"
    }
   },
   {
    "h2": "Voer onderskrifte uit na ‘n blad",
    "ps": [
     "Kies \"na blad\", los ‘n onderskrif in, en die voorskou lys elke aanwysing: indeks, begin, einde, teks. Die statbalk gee die aanwysingtelling en totale duur. Klik dan \"Laai Excel af (.xlsx)\" of \"Laai CSV af\".",
     "Die verskil tussen die twee: .xlsx is ‘n regte sigbladlêer waar Excel nie jou tydkolom agter jou rug kan herformateer nie; CSV is meer draagbaar, maar Excel kan dalk die tydkolom as iets anders interpreteer wanneer dit oopgemaak word. As dit gebeur, kies die tydkolom en stel sy formaat op \"Teks\" — of gebruik net .xlsx."
    ],
    "img": {
     "file": "table-prev",
     "alt": "Bladvoorskou: indeks-, begin-, einde- en tekskolomme met die statbalk",
     "cap": "Elke aanwysing voorskou; die statbalk gee aanwysingtelling en totale duur"
    }
   },
   {
    "h2": "Voer ‘n blad terug na onderskrifte in",
    "ps": [
     "Kies \"na onderskrif\", los die blad in, en hier is die kolomreël: dit benodig drie kolomme vir **begin, einde en teks** (Engelse opskrifte Start / End / Text werk ook), in **enige volgorde**. `00:00:01,500` en `00:00:01.500` word beide aanvaar; rye wat nie ontleed kan word nie, word oorgeslaan eerder as om die hele lêer te veroordeel.",
     "Die resultaat word aanwysing vir aanwysing in die voorskou gelys; bevestig, en laai dan SRT of VTT af. As daardie drie kolomme ontbreek, kry jy ‘n boodskap wat jou sê om die opskrifte na te gaan — gewoonlik omdat ‘n ander benaming by uitvoer gebruik is, of die opskrifry nie ry een is nie."
    ],
    "img": {
     "file": "table-back",
     "alt": "Onderskrifresultaatgebied: ingevoerde onderskrifte aanwysing vir aanwysing gelys",
     "cap": "Onbekende kolomme word gerapporteer, nooit stilswyend geïgnoreer nie"
    }
   },
   {
    "h2": "VGV",
    "ps": [
     "**Excel wys die tydkolom verkeerd?** Gebruik .xlsx en dit gebeur nooit. As jy CSV moet gebruik: kies die tydkolom en stel die selformaat op \"Teks\" voor jy dit oopmaak.",
     "**Moet die kolomopskrifte Engels wees?** Nee. Start / End / Text word erken in enige taal wat hierdie bladsy ondersteun, en klein- en hoofletters maak nie saak nie.",
     "**Is my reëlbreuke steeds daar na invoer?** Ja. Reëlbreuke binne dialoog word behoue, tot reg by die oorspronklike ombreek.",
     "**Word ASS ondersteun?** Hierdie bladsy hanteer slegs SRT en VTT. ASS dra stylaanwysings — skakel dit eers na SRT om met [[Format converter|/convert.html]].",
     "**Hoe baie lêers gelyktydig?** Een. Om dosyne of honderde te verwerk, gebruik [[Batch conversion|/batch.html]] (wat slegs formate omsekst en nie deur ‘n blad gaan nie)."
    ]
   },
   {
    "h2": "Privaatheid",
    "ps": [
     "Omskakeling loop geheel en al in jou blaaier. Geen onderskrifinhoud word ooit na ‘n bediener gestuur nie."
    ]
   },
   {
    "h2": "Verwante hulpmiddels en gidse",
    "ps": [
     "As al wat jy wil hê die onderskrif-na-Excel-stap is, sien [[Convert subtitles to Excel|/guides/srt-to-excel.html]]; om daarna in ‘n ander taal te vertaal, [[Subtitle translation|/translate.html]]; dosyne lêers gelyktydig — [[Batch conversion|/batch.html]]."
    ]
   }
  ]
 },
 "translate": {
  "seo": {
   "title": "KI-onderskrifvertaling – laai op na tweetalige uitvoer – AI-SRTSub",
   "desc": "Vertaal onderskrifte met KI: laai SRT/VTT/ASS op, kies uit 100 tale, verenig name met ‘n woordelys, voer tweetalige onderskrifte uit. Gratis om te begin, eie API-sleutel ondersteun.",
   "h1": "Hoe om KI-onderskrifvertaling te gebruik",
   "intro": "Die volledige werkvloei vir een onderskriflêer, van oplaai deur vertaling tot uitvoer: wat op die skerm is, waarop om te klik, and wat jy by elke stap kry.",
   "ctaText": "Maak die vertaalgereedskap oop"
  },
  "body": [
   {
    "h2": "Wat hierdie hulpmiddel doen",
    "ps": [
     "Vertaal onderskrifte van een taal na ‘n ander en voer ‘n gereed-om-te-gebruik-onderskriflêer uit. Tipiese behoeftes:"
    ]
   },
   {
    "h2": "Laai onderskrifte op",
    "ps": [
     "Klik \"Kies onderskriflêer\" of plak onderskrifteks direk in die linker-invoervak. Ses formate word ondersteun: SRT, VTT, ASS, SSA, SBV en TXT. Geen lêer by die hand nie? Klik \"Laai voorbeeld\" om dit in aksie te sien. Sodra dit ontleed is, wys die middelste kolom ‘n onderskrifblad met ‘n indeks, tydlyn en bronteks vir elke inskrywing."
    ],
    "img": {
     "file": "translate-upload",
     "alt": "Invoergebied van die vertaalgereedskap: kies onderskriflêer, plakvak en voorbeeld-laaiknoppie",
     "cap": "Linkerkolom \"Laai onderskrifte op\": kies ‘n lêer, plak teks of laai ‘n voorbeeld"
    }
   },
   {
    "h2": "Kies taal en styl",
    "ps": [
     "\"Brontaal\" kan op outomatiese opsporing bly; die \"teikentaal\" word uit 100 tale gekies. Vyf vertalingstyle is beskikbaar: Gebalanseerd (verstek), Gespreksmatig, Formeel professioneel, Dub-styl en Pasgemaak. \"Dub-styl\" pas by film- en TV-dialoog; \"Formeel professioneel\" pas by dokumentaires en kursusse."
    ],
    "img": {
     "file": "translate-lang",
     "alt": "Taal- en vertalingstylinstellings: brontaal, teikentaal-aftreklyste en vyf style",
     "cap": "\"Taal\" en \"vertalingstyl\": bron kan outomaties opspoor, 75 teikenkeuses"
    }
   },
   {
    "h2": "Woordelys: hou name konsekwent",
    "ps": [
     "Die KI vertaal in groepe, so dieselfde naam kan op twee verskillende maniere in verskillende groepe uitkom. Skryf \"bron → moet vertaal word as\"-reëls in die woordelys; voor elke groep skandeer die hulpmiddel dit en volg elke ooreenkoms. Een reël per lyn; pyle kan `->`, `=>`, `→` of Tab wees; ‘n alleenstaande bronterm beteken hou dit onvertaal; verskeie spelling kan een vertolking via `|` deel. Klik \"✨ KI-ekstraheer\" om die KI eiename eers uit die video in die blad te laat trek, en bewerk en vertaal dan."
    ],
    "img": {
     "file": "translate-glossary",
     "alt": "Woordelys- en eienaamgebied: woordelys-invoervak ​​met KI-ekstraheer- en stoorknoppies",
     "cap": "\"Verenigde name\"-woordelys: KI-ekstraheer eiename, outomaties gelaai vir nuwe videos sodra dit gestoor is"
    }
   },
   {
    "h2": "Die vertaalproses",
    "ps": [
     "Klik \"▶ Begin vertaling\" in die boonste balk. Die middelste statistiekstrook wys inskrywings, vertaal, opvulling skoon en kruis-inskrywing-sinspanne in reële tyd; die vorderingsbalk wys die beraamde oorblywende tyd en tokens gebruik. Terwyl jy vertaal, klik enige vertalingsel in die blad om die teks te bewerk — veranderinge word op jou rekenaar gestoor en oorleef ‘n verfrissing. Maak die bladsy halfpad toe en jy sal aangebied word om voort te gaan waar dit opgehou het. Wanneer een sin verskeie inskrywings strek, word die groep saamgevoeg, vertaal en deur duur aangevul."
    ],
    "img": {
     "file": "translate-workspace",
     "alt": "Vertaalwerkspasie: statistiekstrook, vorderingsbalk en bewerkbare onderskrifblad",
     "cap": "Middelwerkspasie: statistiekstrook + vorderingsbalk + klik-om-te-bewerk-onderskrifblad"
    }
   },
   {
    "h2": "Uitvoer",
    "ps": [
     "Kies eers die inhoudvorm in die regterkolom: slegs vertaling (eenstaal), tweetalig met die oorspronklike bo, of tweetalig met die vertaling bo; dan die lêerformaat: SRT, WebVTT, SBV, ASS of TXT. Om ASS te kies voeg twee uitlegte by: gesplete bo/onder-skerms en gestapelde onderste reëls. Inhoud en formaat kombineer vryelik in 14 uitvoerstyle. Tweetalige reëlbreedte word afsonderlik gestel. Klik \"Laai onderskrifte af\" om die lêer te stoor, of \"Kopieer na knipbord\" om dit dadelik te plak."
    ],
    "img": {
     "file": "translate-export",
     "alt": "Uitvoerpaneel: drie inhoudvorms, vyf lêerformate en tweetalige reëlbreedte-instellings",
     "cap": "Regterkolomuitvoer: kies eers die inhoudvorm, dan die lêerformaat"
    }
   },
   {
    "h2": "Koste en privaatheid",
    "ps": [
     "Die verstekmodel benodig geen aanmelding en geen sleutel nie — dit werk uit die boks uit met per-versoek-kwotas: ‘n daaglikse perk per IP plus ‘n werfwye daaglikse toelae. Vir groot groepe, voer jou eie API-sleutel onder \"Vertaalnutsding\" in. Privaatheid, volgens die kennisgewing op die bladsy: onderskrifte vir die verstekmodel word deur hierdie webwerf se bediener na die verskaffer gestuur; ‘n pasgemaakte API word direk deur die verskaffer wat jy invoer gehanteer, en die sleutel bly in jou blaaier. Ontleding, reëls-omvou en tweetalige uitleg loop alles plaaslik in die blaaier."
    ]
   },
   {
    "h2": "VGV",
    "ps": [
     "**Ander tale vermeng in die vertaling?** Die hulpmiddel spoor taalweglating op en vertaal outomaties weer; as ‘n paar inskrywings steeds verkeerd lyk, klik die sel en herstel dit met die hand.",
     "**Wat van liriekreëls?** \"Inhoudfiltrering\" bied drie opsies vir lirieke: vertaal die lirieke, behou die oorspronklike of vee dit uit.",
     "**Inkonsekwente vertalings van name?** Voeg die inkonsekwente spelling by die woordelys en vertaal weer; die woordelys geniet voorrang bo die globale \"eienaamhantering\"-instelling.",
     "**Wil jy Engels bo en Chinees onder hê?** Kies \"Tweetalig · oorspronklike bo\" wanneer jy uitvoer; vir Chinees bo en Engels onder, kies \"Tweetalig · vertaling bo\"."
    ]
   },
   {
    "h2": "Verwante hulpmiddels en gidse",
    "ps": [
     "Verkeerde formaat? Begin met [[format conversion|/convert.html]]; tydlyn af? Gebruik [[timeline adjustment|/shift.html]]; voor jy dit oorhandig, voer dit deur die [[subtitle quality check|/guides/subtitle-quality-check.html]]."
    ]
   }
  ]
 },
 "translate-english-to-chinese": {
  "seo": {
   "title": "Vertai Engels na Sjinees – AI-SRTSub",
   "desc": "Vertai Engelse onderskrifte na Sjinees: laai SRT/VTT/ASS op, kies Vereenvoudig of Tradisioneel, en voerSjinees-alleen of tweetalige onderskrifte uit. – AI-SRTSub",
   "h1": "Vertai Engelse onderskrifte na Sjinees",
   "intro": "Engelse SRT in, Sjinese (of Engels-Sjinese tweetalige) onderskrifte uit: laai op, kies die teikentaal, voer uit — alles op een bladsy.",
   "ctaText": "Vertai Engelse onderskrifte"
  },
  "body": [
   {
    "h2": "Wanneer jy dit benodig",
    "ps": [
     "Die onderskrif wat jy afgelaai het, is slegs in Engels en jy kan nie bybly nie; of jy wil Sjinese onderskrifte hê vir familielede wat nie Engels lees nie. Wat jy benodig, kom in een van drie vorms — **slegs-Sjinese onderskrifte**, of tweetalige onderskrifte met **Sjinees bo, Engels onder** of **Engels bo, Sjinees onder** — en hierdie hulpmiddel lewer al drie."
    ]
   },
   {
    "h2": "Hoe om dit te doen",
    "ps": [
     "Maak die [[AI Subtitle Translator|/translate.html]] oop en los jou Engelse onderskriflêer daar (SRT, VTT, ASS, SSA, SBV en TXT word almal herken, of plak net die teks). Laat “Bronstaal” op outo-opsporing, stel “Teikentaal” op Vereenvoudigde of Tradisionele Sjinees, and klik “▶ Begin vertaal”. Wanneer dit klaar is, kies 'n inhoudsvorm in die uitvoerpaneel aan die regterkant: slegs vertaling (eentalig), tweetalig · oorspronklike bo (Engels bo, Sjinees onder), of tweetalig · vertaling bo (Sjinees bo, Engels onder), kies dan 'n lêerformaat en laai af."
    ],
    "img": {
     "file": "translate-export",
     "alt": "Uitvoerpaneel: slegs vertaling, tweetalig met oorspronklike bo, en tweetalig met vertaling bo",
     "cap": "Kies die inhoudsvorm by uitvoer: slegs Sjinees, of Engels-bo / Sjinees-bo tweetalig"
    }
   },
   {
    "h2": "Twee algemene probleme",
    "ps": [
     "**Name inkonsistent vertaal?** Die KI vertaal in groepe, sodat dieselfde naam op twee maniere kan uitkom. Plaas “bron → vertaalde naam”-pare in die woordelys (bv. `Watson → Huasheng`) om dit dwarsdeur eenvormig te hou.",
     "**Onderskrifte dryf weg van die prentjie?** Vertaal eers, stel dan die tydsberekening reg: die tydlynnutsbalk bo-aan die werkbank het 'n globale verskuiwing- en skaalbeheer — sien [[Subtitles drift out of sync toward the end|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "videosub": {
  "seo": {
   "title": "Onttrek ingebedde video-onderskrifte – MKV / MP4-snitte – AI-SRTSub",
   "desc": "Lees die onderskrifsnitte binne MKV-, WebM-, MP4- en MOV-lêers reguit uit en voer SRT / VTT / ASS / TXT uit. Geen oplaai, geen transkodering, elke taal snit gelys.",
   "h1": "Hoe om onderskrifte wat in 'n video ingebed is, te onttrek",
   "intro": "Lees die onderskrifsnit wat binne 'n MKV / MP4 verseël is reguit as SRT uit — die video word nooit opgelaai nie, alles word in die blouster gelees.",
   "ctaText": "Maak video-onderskrifonttrekking oop"
  },
  "body": [
   {
    "h2": "Wat hierdie hulpmiddel doen",
    "ps": [
     "Onderskrifte kan binne 'n videolêer verseël wees in plaas daarvan om alleen te staan. Om hulle te redigeer, te vertaal of te koppel, moet jy hulle eers uithaal — dit is die enigste ding wat hierdie bladsy doen."
    ]
   },
   {
    "h2": "1 Voeg die video by",
    "ps": [
     "Sleep 'n videolêer na die eerste kolom of klik om een te kies. Slegs **MKV / WebM** en **MP4 / MOV** word herken; ander houers sal geen snit oplewer nie.",
     "Die lêer verlaat nooit jou rekenaar nie — daar is geen oplaaitap nie. Die hulpmiddel lees in klein brokkies volgens verskuiwing, sodat 'n film van verskeie gigagrepe nie die geheue volmaak nie, maar die eerste lees moet die snitinligting een keer deursoek."
    ],
    "img": {
     "file": "videosub-up",
     "alt": "Die voeg-video-gebied van die ingebedde onderskrifonttrekkingsbladsy",
     "cap": "MKV / WebM en MP4 / MOV word ondersteun, en die lêer verlaat nooit jou masjien nie"
    }
   },
   {
    "h2": "2 Die ingebedde onderskrifsnitte",
    "ps": [
     "Sodra die lees klaar is, lys die tweede kolom die onderskrifsnitte in die lêer **een per ry**, gewoonlik met 'n taal en 'n snitnaam (byvoorbeeld \"Chinese\", \"English\", \"Forced\"). Klik op 'n ry om daardie snit te onttrek.",
     "Wanneer die lêer slegs een onderskrifsnit bevat, begin onttrekking outomaties — geen klik nodig nie.",
     "**Beeldonderskrifte kan nie onttrek word nie**: Blu-ray PGS- en DVD-onderskrifte is prente wat in die stroom ingebrand is sonder teks om te neem, en die bladsy sê dit duidelik; dié benodig OCR."
    ],
    "img": {
     "file": "videosub-track",
     "alt": "Die lys van ingebedde onderskrifsnitte, een per ry",
     "cap": "Een snit per ry; wanneer daar net een is, begin onttrekking outomaties"
    }
   },
   {
    "h2": "3 Die resultaat",
    "ps": [
     "\"3 Result\" aan die regterkant wys die onttrekte onderskrifteks, met die uitvoerformaat bo dit: **SRT / VTT / ASS / TXT**. Klik \"Download\" of \"Copy\".",
     "Wanneer die bronsnit ASS is, kom sy eie stylkop en resolusie onveranderd terug — uitvoer as ASS behou dit, terwyl uitvoer as SRT slegs die teks dra."
    ],
    "img": {
     "file": "videosub-out",
     "alt": "Die resultaatsgebied met die SRT / VTT / ASS / TXT-formaatkeuse",
     "cap": "Vier uitvoerformate; 'n ASS-bron behou sy stylkop en resolusie"
    }
   },
   {
    "h2": "Wat onaangeraak gelaat word",
    "ps": [
     "Die videolêer self word hoegenaamd nie aangeraak nie — slegs lees, geen skryf, geen transkodering, geen remuxing.",
     "Onderskrifinhoud kom uit soos dit is: geen koderingstehuis, geen tydlynbegrip nie. As die onttrekte onderskrifte mismaak is, is dit 'n koderingsprobleem in die bronsnit — vat dit na [[Garbled text repair|/repair.html]]."
    ]
   },
   {
    "h2": "Algemene vrae",
    "ps": [
     "**Is daar regtig geen manier om beeldonderskrifte (PGS / DVD) te hanteer nie?** Nie op hierdie bladsy nie — dit is prente sonder 'n tekslaag. OCR moet eerste kom, en hierdie bladsy doen dit nie.",
     "**Die onttrekte onderskrifte is verkeerd getimed — hoekom?** Hierdie bladsy korrigeer nie tydlyne nie; wat uitkom is wat daar was. Vir 'n globale verskuiwing of 'n tempo-probleem gebruik [[Timeline adjustment|/shift.html]].",
     "**Hoekom neem dit so lank voordat enigiets gebeur?** 'n Groot lêer moet stukkie vir stukkie deursoek word vir snitinligting, en hoe groter die lêer, hoe langer neem dit; dit gebeur plaaslik en het niks met jou verbinding te doen nie.",
     "**Kan ek hierdie bladsy vir eksterne onderskriflêers gebruik?** Jy hoef nie — 'n eksterne .srt / .ass gaan reguit in [[Format conversion|/convert.html]] of 'n ander hulpmiddel. Hierdie bladsy is vir onderskrifte wat binne 'n video verseël is."
    ]
   },
   {
    "h2": "Privaatheid",
    "ps": [
     "Die video word geheel en al in die blaaier gelees: niks word opgelaai nie, niks word getranskodeer nie, niks gaan deur 'n bediener nie. Maak die bladsy toe en die data wat gelees is, word vrygestel."
    ]
   },
   {
    "h2": "Verwante hulpmiddels en gidse",
    "ps": [
     "Om te vertaal wat jy onttrek, gaan na [[Subtitle translation|/translate.html]], om dit tweetalig te maak sien [[Two ways to make bilingual subtitles|/guides/make-bilingual-subtitles.html]]; vir die verskil tussen ingebedde en eksterne snitte, en watter kan onttrek word, sien [[How to get subtitles out of a video|/guides/extract-subtitles-from-video.html]]."
    ]
   }
  ]
 },
 "vtt-to-srt": {
  "seo": {
   "title": "VTT na SRT-omskakelaar – Skakel WebVTT-onderskrifte om – AI-SRTSub",
   "desc": "Skakel VTT (WebVTT)-onderskrifte om na SRT vir redakteurs en spelers wat slegs SRT aanvaar. Die WEBVTT-opskrif en NOTE-blokke word outomaties skoongemaak. Loop in jou blaaier.",
   "h1": "VTT na SRT",
   "intro": "Verander VTT (WebVTT)-onderskrifte in SRT: los die lêer, kies SRT, laai af. Die opskrif- en nota-blokke word skoongemaak en tydstempels gaan terug na kommanotasie.",
   "ctaText": "Skakel VTT → SRT om"
  },
  "body": [
   {
    "h2": "Wanneer jy SRT terugbenodig",
    "ps": [
     "CapCut, Premiere, die meeste lessenaarspeletjies en ouer onderskrifhulpmiddels aanvaar slegs **SRT**. Onderskrifte wat van die web of van YouTube afgelaai word, kom gewoonlik as VTT — skakel dit om na SRT om direk te inporteer."
    ]
   },
   {
    "h2": "Wat skoongemaak word van die VTT",
    "ps": [
     "Die **WEBVTT-opskriflyn**, NOTE-blokke, STYLE/REGION-blokke en keu-instellings na die tydsberekeningslyn (soos align:start) is nie onderskrifteks nie — dit word outomaties weggelaat; nommering word herstel en die millisekondeskeier gaan terug van 'n punt na 'n komma."
    ],
    "img": {
     "file": "convert-upload-vtt",
     "alt": "Oplaai-area: 'n VTT-lêer gelaai, gedetekteer as VTT",
     "cap": "'n Lêer met 'n WEBVTT-opskrif word dadelik as VTT gedetekteer"
    }
   },
   {
    "h2": "Hoe om om te skakel",
    "ps": [
     "Maak die [[converter|/convert.html]] oop,los die VTT in, kies **SRT - SubRip** as die uitvoer, skakel dan om en laai af. Die teks- en tydsberekeningswaardes bly onaangeraak."
    ],
    "img": {
     "file": "convert-result-srt",
     "alt": "Omskakelingsresultaat: SRT-nommering met kommatydstempels",
     "cap": "Die omgeskakelde SRT: keunommers + kommatydstempels"
    }
   }
  ]
 }
};
