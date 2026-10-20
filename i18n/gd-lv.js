/* i18n/gd-lv.js —— 43 篇指南页的lv译文（由 _mkgd.js 生成，勿手改）
 * 源：_gd/lv.json（Gemini 翻译，_gemgd.js 产出）
 * 结构：{ <slug>: { seo:{title,desc,h1,intro,ctaText}, body:[{h2,ps[],img}] } }
 * ⚠️ server.js 自己 require 它，不被任何 html 引用 —— 部署时必须显式加进传输列表。
 */
module.exports = {
 "ass-to-srt": {
  "seo": {
   "title": "ASS uz SRT pārveidotājs – Konvertējiet ASS/SSA subtitrus – AI-SRTSub",
   "desc": "Konvertējiet ASS (un SSA) subtitrus uz vienkāršu SRT: teksts un laika atzīmes tiek izgūti tāpat, kā ir, stila tagi paliek aizmugurē. Programmatūrai, kas pieņem tikai SRT. Darbojas jūsu pārlūkprogrammā.",
   "h1": "ASS uz SRT",
   "intro": "Pārvērsiet ASS (vai SSA) subtitrus par SRT: nometiet failu, izvēlieties SRT, lejupielādējiet. Teksts un laika atzīmes tiek izgūti tāpat, kā ir; stila tagi netiek saglabāti.",
   "ctaText": "Konvertēt ASS → SRT"
  },
  "body": [
   {
    "h2": "Kad jums atkal ir nepieciešams SRT",
    "ps": [
     "Rediģēšanas programmas, TV pierīces, televizoru atskaņotāji, tulkošanas rīki — daudzi pēcapstrādes posmi pieņem tikai **SRT**. Izsmalcinātais stils un pozicionēšana ASS formātā tur neko nenozīmē, tāpēc vienkāršs SRT ir drošākā izvēle."
    ]
   },
   {
    "h2": "Kas notiek ar stila tagiem",
    "ps": [
     "Katrs ASS kadrs ir dialoga rinda, kuras tekstā bieži ir ignorēšanas tagi, piemēram, `{\\fonts}` krāsai, kustībai vai efektiem. Konvertējot uz SRT, **šie tagi tiek noņemti kopā ar stilu**, saglabājot tikai tekstu un laika atzīmes; `\\N` rindas pārtraukumi kļūst par īstiem rindas pārtraukumiem. SSA faili arī ir nolasāmi."
    ],
    "img": {
     "file": "convert-result-srt",
     "alt": "Konvertēšanas rezultāts: SRT numerācija un teksts, kas izgūts no ASS",
     "cap": "Izgūtais SRT: viens numurs vienam kadram, tīrs teksts"
    }
   },
   {
    "h2": "Kā konvertēt",
    "ps": [
     "Atveriet [[konvertētāju|/convert.html]], iemetiet ASS failu (der arī .ssa), izejas formātā izvēlieties **SRT - SubRip**, pēc tam konvertējiet un lejupielādējiet. Darbojaties pretējā virzienā? Skatiet [[SRT uz ASS|/guides/srt-to-ass.html]]."
    ]
   }
  ]
 },
 "batch": {
  "seo": {
   "title": "Kā pakešu režīmā konvertēt subtitrus – Simtiem vienā ZIP – AI-SRTSub",
   "desc": "Pamācība: nometiet desmitiem SRT/VTT failu, konvertējiet tos vienā formātā, lejupielādējiet vienu ZIP failu. Pārnumurēti, normalizēti laika zīmogi, neanalizētie faili ir atzīmēti, nevis slepeni iekļauti arhīvā.",
   "h1": "Kā pakešu režīmā konvertēt subtitrus",
   "intro": "Viena subtitru sezona parasti ir jāpārvērš vienā formātā, un to augšupielāde pa vienam prasa mūžību. Nometiet tos visus šeit, konvertējiet kopā un lejupielādējiet vienu ZIP — faili, kurus nevar analizēt, tiek atzīmēti, un tie netiek klusi iekļauti tā, tarsi viss būtu izdevies.",
   "ctaText": "Atvērt pakešu konvertēšanu"
  },
  "body": [
   {
    "h2": "Ko dara šis rīks",
    "ps": [
     "Subtitriem visai sezonai vai komplektam parasti ir jābūt vienveidīgiem, pirms ar tiem var veikt jebko citu. Lūk, ko paveic pakešu lapa:"
    ]
   },
   {
    "h2": "Failu pievienošana",
    "ps": [
     "Velciet vairākus subtitru failus kopā pārtrauktajā lodziņā vai noklikšķiniet un atlasiet vairākus vienā reizē. Failu saraksts parāda katru no tiem: analizētie faili parāda savu kadru skaitu, neanalizētie ir vienkārši atzīmēti kā neatpazīti. Augšējā josla apkopo failu skaitu, kadru skaitu un to, cik daudz palikuši neatpazīti.",
     "⚠️ Šī lapa nolasa tikai UTF-8 kodējumu. Jebkas ar bojātu kodējumu (ekrāns, pilns ar jautājuma zīmēm vai kastītēm) vispirms ir jāizlaiž caur [[Kodējuma labošanu|/repair.html]]."
    ],
    "img": {
     "file": "batch-list",
     "alt": "Failu saraksts: katra faila nosaukums un kadru skaits, neatpazītie ir atzīmēti sarkanā krāsā",
     "cap": "Katrs fails ir sarakstīts, un neatpazītie ir atzīmēti uz vietas"
    }
   },
   {
    "h2": "Uz ko visu konvertēt",
    "ps": [
     "Izvēlieties mērķa formātu sadaļā \"Konvertēt visu uz\" — SRT vai VTT. Katrs sarakstā esošais fails pēc tam tiek atjaunots šajā formātā: kadru numuri tiek pārnumurēti no augšas, laika zīmogi tiek normalizēti uz mērķa formātu (SRT atdala milisekundes ar komatu, VTT ar punktu).",
     "**Sākotnējie failu nosaukumi tiek saglabāti un mainās tikai paplašinājums**; dublētiem nosaukumiem tiek pievienots numurs, lai nekas netiktu pārrakstīts."
    ],
    "img": {
     "file": "batch-up",
     "alt": "Mērķa formāta izvēle un saraksta statuss ar statistikas joslu, kas parāda failu un kadru skaitu",
     "cap": "Izvēlieties mērķa formātu, un katrs fails atjaunojas; failu nosaukumiem mainās tikai paplašinājums"
    }
   },
   {
    "h2": "Arhivēšana un lejupielāde",
    "ps": [
     "Noklikšķiniet uz \"Iepakot vienā ZIP un lejupielādēt\", un arhīvā būs katrs konvertētais fails. **Faili bez atpazīstamiem kadriem paliek ārpus arhīva** — tie paliek sarakstā un ir atzīmēti, nevis tiek sajaukti kopā, it kā tie būtu izdevušies. Kad tie ir sapakoti, jūs saņemat paziņojumu par to, cik failu ir iekšpusē."
    ],
    "img": {
     "file": "batch-zip",
     "alt": "Iepakojuma zona: ZIP lejupielādes poga un iepakojuma rezultāta ziņojums",
     "cap": "Neatpazītie faili paliek ārpus arhīva un paliek atzīmēti sarakstā"
    }
   },
   {
    "h2": "Kāpēc fails tiek atzīmēts kā neatpazīts",
    "ps": [
     "Fails tiek atzīmēts, ja no tā nevar nolasīt nevienu kadru. Trīs ierasti iemesli: tas vispār nav subtitru fails (teiksim, klaiņojošs .txt lasīšanas fails), kodējums nav UTF-8 (tāpēc tas nolasa tikai aizvietotājzīmes) vai saturs ir saplacināts vienā blokā bez laika zīmoga.",
     "Ar atzīmētajiem failiem var rīkoties atsevišķi: kodējuma problēmu gadījumā dodieties uz [[Kodējuma labošanu|/repair.html]], formāta problēmu gadījumā — uz [[Formātu konvertētāju|/convert.html]], lai veiktu individuālu konvertēšanu pirms atgriešanās sarakstā."
    ]
   },
   {
    "h2": "BUJ",
    "ps": [
     "**Cik failus es varu pievienot?** Stingra limita nav; tas ir atkarīgs no jūsu pārlūkprogrammas atmiņas, un daži simti SRT failu parasti ir piemēroti.",
     "**Vai tas maina manu dialogu?** Nē. Pakešu konvertēšana maina tikai konteinera formātu — pārnumurē kadrus un normalizē laika zīmogu —, nevis nevienu dialoga vārdu.",
     "**Ko darīt, ja man ir jāmaina saturs?** Šajā lapā tiek konvertēti tikai formāti. Lai mainītu laika nobīdi vairākiem failiem, izmantojiet [[Laika pielāgošanu|/shift.html]]; lai mainītu formulējumu, izmantojiet [[Terminu aizvietošanu|/glossary.html]]; abi darbojas failu pa failam.",
     "**Vai ASS tiek atbalstīts?** Šajā lapā tiek konvertēts tikai starp SRT un VTT. ASS satur stilu — izmantojiet [[Formātu konvertētāju|/convert.html]] tam atsevišķi."
    ]
   },
   {
    "h2": "Privātums",
    "ps": [
     "Konvertēšana un iepakošana notiek pilnībā jūsu pārlūkprogrammā. Nekāds subtitru saturs nekad netiek nosūtīts uz serveri."
    ]
   },
   {
    "h2": "Saistītie rīki un ceļveži",
    "ps": [
     "Ko mainīt visai sezonai un kādā secībā — [[Vienas sezonas subtitru pakešu rediģēšana|/guides/batch-convert-srt.html]]; vairāk formātu vienam failam — [[Formātu konvertētājs|/convert.html]]; korektūra izklājlapā — [[Subtitri ⇄ tabula|/table.html]]."
    ]
   }
  ]
 },
 "batch-convert-srt": {
  "seo": {
   "title": "Vienas sezonas pakešu rediģēšana – kas mērogojas, kas nē – AI-SRTSub",
   "desc": "Sezonai parasti ir nepieciešams vienāds labojums visur: vienots formāts, laika nobīde, terminoloģija. Šeit ir norādīts, kas tiek paveikts vienā gājienā, kas nē un kā rīkoties ar failiem, kurus neizdodas analizēt.",
   "h1": "Vienas sezonas subtitru pakešu rediģēšana",
   "intro": "Kad desmitiem subtitru failu ir jāmaina, tā parasti ir viena un tā pati izmaiņa katru reizi. Zinot, kuras daļas var veikt vienā gājienā, ietaupa daudz vairāk laika nekā to apstrāde pa vienam.",
   "ctaText": "Atvērt pakešu konvertēšanu"
  },
  "body": [
   {
    "h2": "Visur parasti ir viena un tā pati izmaiņa",
    "ps": [
     "Kad subtitru darbība visas sezonas garumā ir kļūdaina, katrai sērijai reti ir sava privāta problēma — parasti tas ir viens iemesls, kas skar katru sēriju: viena un tā pati relīžu grupa tās visas ir kodējusi (tāpēc formāts un ūdenszīmes sakrīt), tās visas ir sinhronizētas ar vienu un to pašu video versiju (tāpēc nobīdes virziens un apjoms sakrīt), vai arī transliterācijas sezonas gaitā ir izklīdušas.",
     "Vispirms pārbaudiet divas sērijas — vienu agrīnu, vienu vēlīnu — un pirms pakešu apstrādes apstipriniet, ka tā patiešām ir **tā pati problēma**. Ja tās nesakrīt, šo problēmu nevar atrisināt ar pakešu apstrādi."
    ]
   },
   {
    "h2": "Ko var paveikt vienā gājienā",
    "ps": [
     "**Formāta apvienošana** ir vienīgā lieta, kas patiesi noslēdzas vienā gājienā: kopā velciet desmitiem SRT un VTT failu uz [[Pakešu konvertēšanu|/batch.html]], izvēlieties mērķa formātu un lejupielādējiet vienu ZIP failu. Pārnumurēšana un laika zīmogu normalizēšana notiek tajā pašā solī, un netiek mainīts neviens dialoga vārds."
    ],
    "img": {
     "file": "batch-list",
     "alt": "Pakešu lapas failu saraksts: kadru skaits failā, neatpazītie ir atzīmēti sarkanā krāsā",
     "cap": "Viendabīgs formāts ir viena lieta, kas patiesi beidzas vienā gājienā"
    }
   },
   {
    "h2": "Kas jādara failu pa failam",
    "ps": [
     "Šiem nav pakešu saraksta sākumpunkta, un tiem ir nepieciešams gājiens katram failam — lai gan parasti ir ekvivalents, kam **jāveic darbība tikai vienu reizi un pēc tam tiek piemērots visai sezonai**:"
    ]
   },
   {
    "h2": "Ievērojiet pareizo secību",
    "ps": [
     "Ja ir jāveic vairākas lietas, nepareiza secība nozīmē pārstrādāšanu. Rīkojieties šādā secībā:",
     "**Labot kodējumu** → **apvienot formātu** → **mainīt saturu** (ūdenszīmes, terminoloģija, laiks) → **kvalitātes kontrole pēdējā**. Formātu konvertēšana pirms kodējuma labošanas sniedz tikai ķīniešu ābeci citā konteinerā; satura maiņa pirms formātu apvienošanas nozīmē darbu ar nekonsekventu rīku atbalstu."
    ],
    "img": {
     "file": "batch-zip",
     "alt": "Iepakojuma zona: ZIP lejupielādes poga un rezultāta ziņojums",
     "cap": "Vispirms apvienojiet formātus, pēc tam mainiet saturu"
    }
   },
   {
    "h2": "Rīcība ar neatpazītajiem failiem",
    "ps": [
     "Faili, kas pakešu konvertēšanā ir atzīmēti kā neatpazīti, tiek izslēgti no ZIP arhīva un paliek sarakstā. Trīs parasti iemesli: tas nav subtitru fails (klaiņojošs lasīšanas fails), kodējums nav UTF-8 vai saturs tika saplacināts vienā blokā bez laika zīmoga.",
     "Kodējuma problēmas tiek novirzītas uz [[Kodējuma labošanu|/repair.html]] atsevišķi; formāta problēmas uz [[Formātu konvertētāju|/convert.html]] pirms to ievietošanas atpakaļ sarakstā. **Nepiespiediet neatpazītos failus arhīvā tikai tāpēc, lai palielinātu skaitu** — trūkstošas sērijas atrašana atskaņotājā maksā daudz vairāk nekā minūte, ko tas ietaupa."
    ]
   },
   {
    "h2": "Saistītie rīki un ceļveži",
    "ps": [
     "Pilna pakešu apstrādes pamācība — [[Kā konvertēt subtitrus pakešu režīmā|/guides/batch.html]]; vienotas laika nobīdes — [[Kā pielāgot subtitru laiku|/guides/shift.html]]; pēdējais posms pirms piegādes — [[Subtitru kvalitātes kontrole|/qc.html]]."
    ]
   }
  ]
 },
 "bilingual": {
  "seo": {
   "title": "Kā sadalīt vai apvienot divvalodu subtitrus – AI-SRTSub",
   "desc": "Četri veidi, kā noņemt divvalodu subtitrus: saglabāt tikai vienu celiņu, sadalīt divos failos vai apvienot vienā divu rindu ierakstā. Abas formas tiek automātiski noteiktas jūsu pārlūkprogrammā.",
   "h1": "Kā noņemt divvalodu subtitrus",
   "intro": "Vlaties sadalīt divvalodu subtitrus, apvienot tos vai saglabāt tikai vienu celiņu? Šajā ceļvedī ir apskatīti visi četri režīmi: kā darbojas noteikšana, kuru režīmu izvēlēties un ko jūs saņemat eksportējot.",
   "ctaText": "Atveriet divvalodu subtitru noņēmēju"
  },
  "body": [
   {
    "h2": "Kam paredzēts šis rīks",
    "ps": [
     "Jums ir divvalodu subtitri, bet vēlaties tikai vienu no celiņiem — vai otrādi, vēlaties sadalīt vai apvienot abus celiņus:"
    ]
   },
   {
    "h2": "Kā tas nosaka divvalodu saturu",
    "ps": [
     "Divu celiņu divvalodu subtitriem ir divas izplatītas formas, un rīks atpazīst katru no tām — **neuzminot valodu**: **A forma (viens ieraksts, divas rindas)** sadala celiņus pēc rakstības sistēmas — kana, hangul, hanzi, latīņu un citām sistēmām, kopā desmit; divas dažādas sistēmas nozīmē divvalodu, un tā, kas parādās pirmā, tiek uzskatīta par oriģinālu. Viena sistēma (piemēram, gara ķīniešu rinda, kas ietīta divās) tiek uzskatīta par vienvalodu un tiek saglabāta tāda, kāda tā ir. **B forma (divi atsevišķi ieraksti ar identisku laiku)** sadala celiņus pēc pozīcijas — divi ieraksti ar vienādu laika zīmogu veido pāri, pirmais tiek uzskatīts par oriģinālu, un kombinācijas, kurām ir kopīgs latīņu alfabēts, piemēram, angļu-franču vai angļu-vācu, tiek atdalītas pareizi. Ja netiek atrasts neviens divvalodu saturs, režīma atlasītājs un poga Sākt ir pelēki kopā ar skaidru paziņojumu, tāpēc tas nekad nepiespiedu kārtā nesadala nepareizos rezultātos."
    ]
   },
   {
    "h2": "Četri režīmi",
    "ps": [
     "Nolaižamajā izvēlnē “Kuru jūs vēlaties?” izvēlieties vienu no četriem: **Saglabāt tikai oriģinālu** un **Saglabāt tikai tulkojumu** — katrs izveido vienu failu; **Sadalīt divos** izveido oriģinālo failu un tulkojuma failu, un failu nosaukumi tiek automātiski atzīmēti ar `.orig` / `.dst`, lai novērstu pārrakstīšanu; **Apvienot vienā divu rindu ierakstā** pārvērš katru pāri divvalodu ierakstā — oriģināls vienā rindā, tulkojums otrā —, savukārt vienvalodu pāri netiek aizskarti, un otra rinda netiek izdomāta. Pārslēdzot režīmus vai izejas formātus, esošais saturs tiek palaists automātiski — nav jānoklikšķina uz Sākt vēlreiz."
    ],
    "img": {
     "file": "bilingual-modes",
     "alt": "Režīma izvēle divvalodu noņēmējā: saglabāt oriģinālu, saglabāt tulkojumu, sadalīt divos, apvienot vienā divu rindu ierakstā",
     "cap": "Četri režīmi: saglabāt vienu celiņu, sadalīt divos vai apvienot vienā divu rindu ierakstā"
    }
   },
   {
    "h2": "Ievade un izvade",
    "ps": [
     "Nolasa septiņus formātus — SRT, VTT, ASS, SSA, SBV, LRC, TXT (faila paplašinājums pirmais, satura noteikšana kā rezerves variants) — un eksportē četrus: SRT, VTT, ASS, TXT. Darbojas jebkura ievades un izvades kombinācija, tāpēc starpformātu konvertēšana notiek procesa gaitā. ASS `\\N` rindas pārtraukumi tiek atjaunoti uz reāliem rindas pārtraukumiem, un efektu tagi tiek noņemti starpformātu eksportēšanas laikā."
    ]
   },
   {
    "h2": "Rezultāti un eksportēšana",
    "ps": [
     "Rezultāti pilnībā tiek parādīti tikai lasāmā teksta lodziņā, katrs fails ar kadru skaitu un kopējo ilguma statistiku; pogas Lejupielādēt un Kopēt tieši paņem failu. Rezultātu laums ir priekšskatījums — šeit nenotiek teksta vai laika rediģēšana. Lai veiktu izmaiņas, vispirms eksportējiet un pēc tam izmantojiet atbilstošo rīku."
    ],
    "img": {
     "file": "bilingual-result",
     "alt": "Apgriešanas rezultātu apgabals: tikai lasāms priekšskatījums, kadru skaita statistika un lejupielādes/kopēšanas pogas",
     "cap": "Pilna teksta priekšskatījums + kadru un ilguma statistika + lejupielāde un kopēšana"
    }
   },
   {
    "h2": "BUJ",
    "ps": [
     "**Vienā ierakstā vienā rindā ir angļu valoda, bet otrā franču — kāpēc tas netiek sadalīts?** A forma sadala celiņus pēc rakstības sistēmas, tāpēc divas valodas, kurām vienā ierakstā ir kopīga viena sistēma, nevar atdalīt. Pārstrukturējiet to kā B formu (divi ieraksti tajā pašā laika skalā), un darbosies sadalīšana pēc pozīcijas.",
     "**Lejupielādē ir tikai viens fails?** “Saglabāt tikai oriģinālu”, “Saglabāt tikai tulkojumu” un “Apvienot vienā divu rindu ierakstā” pēc dizaina izveido vienu failu; tikai “Sadalīt divos” sniedz jums divus, kas atzīmēti ar `.orig` / `.dst`.",
     "**Vai es varu veikt pakešu apstrādi?** Pa vienam failam; rindas netiek atbalstītas.",
     "**Vai tas augšupielādē manus subtitrus?** Nē — analizēšana un eksportēšana notiek pilnībā jūsu pārlūkprogrammā."
    ]
   },
   {
    "h2": "Saistītie ceļveži",
    "ps": [
     "Lai uzzinātu ātro veidu, kā sadalīt divus celiņus, skatiet [[Divvalodu subtitru sadalīšana divos celiņos|/guides/split-bilingual-subtitles.html]]; lai uzzinātu, kā tiek izveidoti divvalodu subtitri, skatiet [[Divi veidi, kā izveidot divvalodu subtitrus|/guides/make-bilingual-subtitles.html]]; mašīntulkošanai izmantojiet [[AI subtitru tulkošanu|/translate.html]]."
    ]
   }
  ]
 },
 "clean": {
  "seo": {
   "title": "Subtitru tīrītājs – noņem ūdenszīmes, reklāmas, SDH – AI-SRTSub",
   "desc": "Subtitru tīrītājs: 13 noteikumi noņem ūdenszīmes, reklāmas, SDH parakstus, HTML tagus, dublikātus; katrai izmaiņai ir salīdzinājums (diff), un to var atsaukt. SRT/VTT/ASS, viss pārlūkprogrammā.",
   "h1": "Kā lietot subtitru tīrītāju",
   "intro": "No tīmekļa lejupielādētajiem subtitriem bieži ir ūdenszīmes, reklāmas un SDH paraksti. Tīrītājs vienā gājienā piemēro 13 noteikumus, un katra izmaiņa ir salīdzināma un atgriezeniska.",
   "ctaText": "Atveriet subtitru tīrītāju"
  },
  "body": [
   {
    "h2": "Ko dara šis rīks",
    "ps": [
     "Lejupielādētajos subtitru failos bieži ir lietas, kuru tur nevajadzētu būt. Tīrītājs tos noņem vienā uz noteikumiem balstītā gājienā:"
    ]
   },
   {
    "h2": "Augšupielāde un noteikšana",
    "ps": [
     "Velciet failu vai noklikšķiniet, lai augšupielādētu — tiek atbalstīti SRT, VTT, ASS, SSA un TXT — vai ielīmējiet subtitru tekstu tieši. Kodējums tiek noteikts automātiski: ja UTF-8 dekodēšana iegūst aizvietotājzīmes, tā atgriežas pie GBK vai Big5, un lapā tiek parādīts \"Kodējums labots kā {encoding}\". Ja augšupielādējat divu celiņu divvalodu subtitrus (divas identiskas laika skalas, viena ķīniešu un viena angļu), tie tiek apvienoti vienā divvalodu celiņā ar slēdzi \"oriģināls augšā / tulkojums augšā\"."
    ]
   },
   {
    "h2": "13 noteikumu konfigurēšana",
    "ps": [
     "Interfeisā ir četras grupas ar 13 izvēles rūtiņām: **Tagi un formatēšana** (ASS efekti, HTML tagi, vadības rakstzīmes, pārnumurēšana pēc kārtošanas), **SDH un skaņas efekti** (SDH paraksti, runātāju etiķetes, tīri dziesmu teksta ieraksti), **Ūdenszīmes un nevēlamie ieraksti** (ūdenszīmes un reklāmas, dublēti ieraksti, tukši ieraksti), **Teksta labojumi** (pieturzīmes un atstarpes, visi burti lielie, īsu līniju apvienošana). Pēc noklusējuma ir ieslēgti tikai \"bezzaudējumu un drošie\" vienumi; vienumi, kas var noņemt saturu (dziesmu teksti, burtu reģistra labojumi, īsu līniju apvienošana), ir izslēgti — atzīmējiet tos, kad nepieciešams. Katram vienumam ir ⓘ padoms, un jebkura izvēles rūtiņas maiņa tiek atkārtoti palaista uzreiz."
    ],
    "img": {
     "file": "clean-opts",
     "alt": "Tīrīšanas opciju saskarne: četras 13 izvēles rūtiņu grupas, aktīvais skaits parādīts augšpusē",
     "cap": "Četras grupas, 13 noteikumi; pēc noklusējuma ir ieslēgti tikai bezzaudējuma vienumi, izmaiņas stājas spēkā uzreiz"
    }
   },
   {
    "h2": "Izmaiņu salīdzinājums un atsaukšana",
    "ps": [
     "Rezultāti netiek tieši pārrakstīti: katra izmaiņa ir uzskaitīta salīdzinājuma tabulā ar noteikuma tagu (kāpēc šis ieraksts tika rediģēts vai dzēsts). Vēlaties to atpakaļ? Noklikšķiniet uz \"Atjaunot\" attiecīgajā rindā; \"Atjaunot visu\" atgriež visu ar vienu klikšķi, un, noklikšķinot uz tā vēlreiz, tiek atkārtoti piemērota pilna tīrīšana. Statistikas josla parāda oriģinālo / notīrīto / dzēsto / modificēto / atjaunoto skaitu."
    ],
    "img": {
     "file": "clean-diff",
     "alt": "Izmaiņu salīdzinājuma tabula: indekss, laiks, oriģinālais teksts pret notīrīto tekstu, noteikuma tags katrā rindā",
     "cap": "Katra izmaiņa ietver noteikuma tagu; atjaunojiet atsevišķas rindas vai visas uzreiz"
    }
   },
   {
    "h2": "Priekšskatījums un eksportēšana",
    "ps": [
     "Pārslēdzieties starp \"Notīrīts / Oriģināls\" skatiem. Oriģinālajā skatā dzēstie ieraksti ir pārsvītroti un atzīmēti ar \"Dzēsts\", un eksportētais fails precīzi atbilst priekšskatījumam. Eksportēšanas formāti: SRT (pēc noklusējuma), VTT, ASS (pieejams, ja avots ir ASS, stila sadaļa saglabāta tāda, kāda tā ir) un vienkārša teksta TXT bez laika skalas. Faila nosaukums automātiski saņem `.clean` marķieri."
    ],
    "img": {
     "file": "clean-preview",
     "alt": "Pilna teksta priekšskatījums: notīrīti un oriģināli skati ar statistikas joslu, kas parāda skaitu",
     "cap": "Divi priekšskatījuma skati, tas, ko redzat, ir tas, ko saņemat"
    }
   },
   {
    "h2": "BUJ",
    "ps": [
     "**Vai tas kļūdas pēc izdzēsīs parastu dialogu?** Ūdenszīmju noteikums vispirms noņem ūdenszīmju rindas (saglabājot dialoga rindas divvalodu ierakstos) un dzēš visu ierakstu tikai tad, ja paliek pēdas; SDH noņemšana skar tikai iekavās iekļautu saturu ar SDH atslēgvārdiem, kas ir 40 rakstzīmes vai īsāki — parasts iekavās iekļauts dialogs paliek.",
     "**Kā tīras dziesmu teksta rindas atšķiras no dziesmu tekstiem dialoga ietvaros?** Tiek dzēsti tikai tie ieraksti, kuros katra atsevišķa rinda ir ietverta ♪ mūzikas notīs vai marķieros, piemēram, [music]; dialogs, kurā ir dziesmu teksti, tiek saglabāts.",
     "**Vai runātāju etiķetes var ietekmēt ķīniešu tekstu?** Atbilst tikai alfanumerisks nosaukums ar lielajiem burtiem rindas sākumā, kam seko kols (piemēram, `GEORGE:`); ķīniešu kolu teikumi nekad neatbilst.",
     "**Vai varu notīrīt vairākus failus vienlaikus?** Nē — viens fails vienā reizē. Lejupielādējiet rezultātu un pēc tam augšupielādējiet nākamo."
    ]
   },
   {
    "h2": "Privātums",
    "ps": [
     "Tīrīšana notiek pilnībā jūsu pārlūkprogrammā; nekāds subtitru saturs nekad netiek nosūtīts uz serveri."
    ]
   },
   {
    "h2": "Saistītie rīki un ceļveži",
    "ps": [
     "Īsai pamācībai, kas vērsta uz ūdenszīmju un reklāmu noņemšanu, skatiet [[noņemt subtitru reklāmas un ūdenszīmes|/guides/remove-subtitle-ads.html]]; pirms nodošanas izlaidiet savu failu caur [[subtitru kvalitātes pārbaudi|/guides/subtitle-quality-check.html]]; lai mainītu formātus, izmantojiet [[formātu konvertēšanu|/convert.html]]."
    ]
   }
  ]
 },
 "convert": {
  "seo": {
   "title": "Kā konvertēt subtitru formātus (SRT, VTT, ASS, SBV, LRC, TXT) – AI-SRTSub",
   "desc": "Ilustrēta konvertētāja pamācība: nometiet failu, pārbaudiet noteikto formātu, izvēlieties izvades formātu, apstrādājiet divvalodu tekstu un lejupielādējiet. Viss darbojas jūsu pārlūkprogrammā.",
   "h1": "Subtitru formātu konvertētāja ceļvedis",
   "intro": "Šajā ceļvedī lapa ir apskatīta no augšas līdz apakšai: ielādējiet subtitrus, apstipriniet noteikto formātu, izvēlieties izvades formātu un lejupielādējiet. Viss darbojas jūsu pārlūkprogrammā — neviens fails nekad neatstāj jūsu ierīci.",
   "ctaText": "Atveriet subtitru konvertētāju"
  },
  "body": [
   {
    "h2": "Ielādējiet subtitrus",
    "ps": [
     "Velciet failu pārtrauktajā lodziņā vai noklikšķiniet, lai izvēlētos; varat arī **ielīmēt saturu** tieši teksta lodziņā. Formāts tiek noteikts gan pēc paplašinājuma, gan satura, un rezultāts tiek parādīts formāta tagā."
    ],
    "img": {
     "file": "convert-upload",
     "alt": "Augšupielādes apgabals: ielādēts SRT paraugs, noteikts kā SRT",
     "cap": "Noteiktais formāts tiek parādīts tagā — šaubu gadījumā vispirms pārbaudiet to šeit"
    }
   },
   {
    "h2": "Izvēlieties izvades formātu",
    "ps": [
     "Nolaižamajā izvēlnē izvēlieties mērķa formātu: sešas opcijas — srt, vtt, ass, sbv, lrc, txt. Konvertējot uz ass, tiek atjaunots fiksēts 1920×1080 noklusējuma stils (balts teksts, melna apmale, apakšā centrā) un **tas nesaglabā oriģinālos fontus vai krāsas**; txt eksportē tikai tekstu bez laika."
    ],
    "img": {
     "file": "convert-opt",
     "alt": "Izvades formāta nolaižamā izvēlne ar atlasītu VTT",
     "cap": "Izvades formāts neseko ievadei — jūs to izvēlaties"
    }
   },
   {
    "h2": "Divvalodu apstrāde",
    "ps": [
     "Ja fails ir divvalodu (divas rindas vienā kadrā vai mijas kadri), izkārtojums konvertēšanas laikā tiek saglabāts tāds, kāds tas ir. Izvēloties \"saglabāt divvalodu\", abas valodas tiek sadalītas augšējā un apakšējā rindā, katra tiek pārtīta atsevišķi; vadīklas ir atspējotas, ja netiek atrasts neviens divvalodu teksts."
    ]
   },
   {
    "h2": "Konvertēt un lejupielādēt",
    "ps": [
     "Noklikšķiniet uz \"Konvertēt\": rezultātu panelī tiek parādīts kadru skaits un kopējais ilgums, un teksts ir gatavs pārbaudei. Noklikšķiniet uz **Lejupielādēt**, lai saglabātu failu, vai **Kopēt**, lai paņemtu tekstu tieši. Konvertēšana nekad nemaina laika vērtības — tā pārraksta tikai formātu. Lai mainītu kadru laiku, izmantojiet [[laika rīku|/shift.html]]."
    ],
    "img": {
     "file": "convert-result",
     "alt": "Rezultātu panelis: kadru skaits un kopējais ilgums ar lejupielādes un kopēšanas pogām",
     "cap": "6 kadri, 0:23 kopā — pārskatiet tekstu pirms lejupielādes"
    }
   }
  ]
 },
 "extract": {
  "seo": {
   "title": "Vienkārša teksta izgūšana no subtitriem – Divi izkārtojumi, piecas tīrīšanas reizes – AI-SRTSub",
   "desc": "Izgūstiet dialogu no subtitriem kā tīru vienkāršu tekstu: nepārtrauktas rindkopas vai viena rinda vienam kadram, un to, ko pieci slēdži SDH kadriem, ūdenszīmēm, dublikātiem, prefiksiem un dziesmu tekstiem noņem.",
   "h1": "Kā izgūt vienkāršu tekstu no subtitriem",
   "intro": "Izvelciet dialogu no subtitru faila kā tīru vienkāršu tekstu: kadru numuri, laika skalas un stila tagi tiek noņemti automātiski, tāpēc rezultāts lasāms kā raksts vai darbojas kā dialogu saraksts.",
   "ctaText": "Atveriet vienkārša teksta izvilcēju"
  },
  "body": [
   {
    "h2": "Ko dara šis rīks",
    "ps": [
     "Lasītājam ir svarīgs tikai dialogs subtitru failā; pārējais ir struktūra, kas paredzēta atskaņotājam — kadru numuri, laika skalas, stila tagi. Šajā lapā tiek noņemta struktūra un saglabāti vārdi."
    ]
   },
   {
    "h2": "Nomest, nevis tikai augšupielādēt",
    "ps": [
     "Kolonna \"1 Pievienot subtitrus\" kreisajā pusē pieņem augšupielādētu failu, un jūs varat arī ielīmēt subtitru saturu tieši teksta lodziņā. Ja izvēlējāties nepareizu failu, noklikšķiniet uz \"Notīrīt\" un sāciet no jauna.",
     "Šajā lapā faili tiek lasīti kā UTF-8. Ja subtitri atveras kā jautājuma zīmju vai kastīšu siena, kodējums ir bojāts — vispirms konvertējiet to uz UTF-8 sadaļā [[Neskaidra teksta labošana|/repair.html]] un pēc tam atgriezieties."
    ],
    "img": {
     "file": "extract-up",
     "alt": "Vienkārša teksta izvilcēja subtitru pievienošanas apgabals",
     "cap": "Augšupielādējiet failu vai ielīmējiet subtitru saturu tieši teksta lodziņā"
    }
   },
   {
    "h2": "Izvēle starp abiem izkārtojumiem",
    "ps": [
     "Sadaļas \"2 Izgūšanas opcijas\" augšpusē ir izkārtojums: **Nepārtrauktas rindkopas** pārtrauc tekstu pie pauzēm un teikuma beigu pieturzīmēm, lai tas lasītos kā raksts; **Viena rinda vienam kadram** nodrošina vienu rindu vienam subtitru ierakstam, precīzi saskaņojot oriģinālā faila ierakstus viens pret vienu.",
     "Dialoga kopēšana piezīmēm, tulkošanas praksei vai lasīšanai kā prozai prasa nepārtrauktas rindkopas; dialogu lapas izveide, salīdzināšana rindu pa rindai ar oriģinālu vai cita rīka barošana prasa vienu rindu vienam kadram."
    ],
    "img": {
     "file": "extract-opt",
     "alt": "Izkārtojuma un tīrīšanas slēdži zem izgūšanas opcijām",
     "cap": "Izvēlieties vienu izkārtojumu; pieci zemāk redzamie slēdži nosaka, kāds saturs tiek noņemts"
    }
   },
   {
    "h2": "Ko katra no piecām tīrīšanām noņem",
    "ps": [
     "**Noņemt SDH kadrus**: dzēš iekavās ietvertus skaņas aprakstus, piemēram, \"(soļi)\" vai \"[mūzika]\", un saglabā dialogu.",
     "**Noņemt ūdenszīmes un reklāmas**: noņem tādas rindas kā fanu subtitru kredīti, vietrāži URL un kanālu nosaukumi.",
     "**Noņemt dublētos kaimiņus**: kad tas pats teikums parādās divas reizes pēc kārtas (atskaņošanas kļūme), tiek saglabāta tikai viena kopija; tālāk esošie dublikāti satur nozīmi un tiek atstāti neskarti.",
     "**Noņemt runātāju prefiksus**: \"JĀNIS: Sveiki\" kļūst par \"Sveiki\". Pēc noklusējuma izslēgts — skripta stila tekstam ir jāparāda, kurš runā.",
     "**Izlaist dziesmu teksta rindas**: rindas, kas pilnībā ir \"♪ … ♪\", tiek izlaistas. Pēc noklusējuma izslēgts — dziesmu teksti arī ir vārdi."
    ],
    "img": {
     "file": "extract-clean",
     "alt": "Pieci tīrīšanas slēdži un to apraksti zem izgūšanas opcijām",
     "cap": "Katrs slēdzis labajā pusē norāda, ko tas noņem; atzīmējiet tos, kas jums nepieciešami"
    }
   },
   {
    "h2": "Rezultāta paņemšana līdzi",
    "ps": [
     "Kolonna \"3 Rezultāts\" labajā pusē parāda izgūto tekstu tiešraidē un pārrēķina to, tiklīdz maināt opciju.",
     "Kad esat apmierināts, noklikšķiniet uz \"Lejupielādēt\", lai saglabātu .txt failu, vai \"Kopēt\", lai paņemtu tekstu līdzi. Valodām, kas neatdala vārdus ar atstarpēm, piemēram, ķīniešu un japāņu valodai, līniju apvienošanai ir atšķirīgi noteikumi, un rīks to apstrādā automātiski katrai valodai."
    ],
    "img": {
     "file": "extract-out",
     "alt": "Rezultātu apgabals ar lejupielādes un kopēšanas pogām",
     "cap": "Rezultāts tiek atjaunināts tiešraidē; lejupielādējiet to kā txt vai kopējiet tieši"
    }
   },
   {
    "h2": "Kas paliek neskarts",
    "ps": [
     "Pats dialogs netiek pārrakstīts. Tīrīšanas slēdži nosaka tikai to, kuras veselās rindas vai bloki tiek noņemti; tie nekad nemaina ieraksta formulējumu.",
     "Laika skalas un kadru numuri vienkārši netiek izvadīti, netiek mainīti un pēc tam izvadīti — oriģinālais fails paliek neskarts, un šī lapa nepiedāvā eksportēšanu ar laika skalām. Šis uzdevums pieder [[Formātu konvertēšanai|/convert.html]]."
    ]
   },
   {
    "h2": "Bieži uzdotie jautājumi",
    "ps": [
     "**Vai ASS stila tagi paliek tekstā?** Nē. ASS `{}` ignorēšanas bloki tiek noņemti, un paliek tikai dialogs.",
     "**Vai divvalodu fails iznāk kā divas rindas vai viena?** Tik daudz rindu, cik bija ierakstā; šī lapa tās ne apvieno, ne sadala — lai tās atdalītu, izmantojiet [[Divvalodu sadalīšanu|/bilingual.html]].",
     "**Kapēc runātāju prefiksi pēc noklusējuma tiek saglabāti?** Vārds \"JĀNIS: Sveiki\" bieži ir noderīga informācija (skripti, dialogu lapas), un tās noņemšana apgrūtina noteikšanu, kurš runā, tāpēc izvēle tiek atstāta jūsu ziņā.",
     "**Vai var izgūt arī LRC dziesmu tekstu failus?** Jā. LRC laika tagi tiek noņemti, un dziesmu teksta rindas paliek; ja nevēlaties dziesmu tekstus, atzīmējiet \"Izlaist dziesmu teksta rindas\"."
    ]
   },
   {
    "h2": "Privātums",
    "ps": [
     "Subtitri tiek apstrādāti pilnībā pārlūkprogrammā: nekas netiek augšupielādēts un nekas neiet cauri serverim. Teksts paliek tikai pašreizējā lapā un tiek notīrīts, atsvaidzinot to."
    ]
   },
   {
    "h2": "Saistītie rīki un ceļveži",
    "ps": [
     "Lai saprastu, ko subtitru fails patiesībā satur, skatiet [[Kas atrodas SRT failā|/guides/srt-file-format.html]]; lai tulkotu izgūto dialogu, dodieties uz [[Subtitru tulkošanu|/translate.html]]; lai pārvērstu to par tabulu, izmantojiet [[Subtitri uz Excel/CSV|/guides/srt-to-excel.html]]; un pirms jebkādas nodošanas palaidiet [[Subtitru kvalitātes kontroli|/qc.html]]."
    ]
   }
  ]
 },
 "extract-subtitles-from-video": {
  "seo": {
   "title": "Subtitru iegūšana no video – Iekļautie pret ārējiem – AI-SRTSub",
   "desc": "Ko katrs no MKV / WebM / MP4 / MOV nes, kā teksts, ASS, WebVTT un mov_text celiņi atšķiras, kāpēc attēla subtitriem (PGS / DVD) nav teksta un ko darīt pēc izvilkšanas.",
   "h1": "Subtitru iegūšana no video",
   "intro": "Subtitri var atrasties video faila iekšpusē vai atsevišķi ārpus tā. Iekšpusē tie ir celiņš konteinerā — to izvilkšanai nav nekāda sakara ar pārkodēšanu.",
   "ctaText": "Atvērt video subtitru izvilkšanu"
  },
  "body": [
   {
    "h2": "Kur atrodas subtitri: iekļautie un ārējie",
    "ps": [
     "Video fails (MKV, MP4) ir konteiners, kurā vienlaikus atrodas video celiņš, audio celiņš un subtitru celiņi. Subtitri, kas iepludināti iekšpusē, ir **iekļautie**; atsevišķs .srt / .ass fails ārpusē ir **ārējais**, un iekļautu celiņu sauc arī par **iemuxotu**.",
     "Ārējos subtitrus var izmantot tādus, kādi tie ir. Problēma ir ar iekļautajiem: lai tos rediģētu, tulkotu vai izveidotu divvalodu celiņu no oriģināla, jums nav pa rokai subtitru faila — vispirms ir jāizlasa celiņš no konteinera. Šis solis nav pārkodēšana: video netiek pārkodēts, tiek nolasīti tikai konteinerā jau saglabātie dati."
    ]
   },
   {
    "h2": "Kurš konteiners ko nes",
    "ps": [
     "Dažādi konteineri satur dažādus subtitru formātus, un arī izvilkšanas grūtības atšķiras:"
    ],
    "img": {
     "file": "videosub-which",
     "alt": "Iekļauto subtitru izvilkšanas lapas norādītie subtitru celiņi",
     "cap": "Viens celiņš rindiņā, parasti ar valodu un celiņa nosaukumu; ja ir tikai viens, tas tiek izvilkts automātiski"
    }
   },
   {
    "h2": "Kāpēc attēla subtitrus nevar izvilkt",
    "ps": [
     "Blu-ray PGS un DVD subtitri nesaglabā nekādas rakstzīmes, tikai attēlu sēriju ar alfa kanālu. Kad atskaņotājs tos rāda, tas ielīmē attēlu, nevis renderē tekstu.",
     "Tāpēc šādā celiņā nav teksta ko lasīt — rīks to neatbalsta nevis tāpēc, ka nespētu, bet gan tāpēc, ka tur nav rakstzīmju. Lapa skaidri paziņo, kad uzduras šādam celiņam.",
     "Vienīgais veids, kā iegūt vārdus, ir vispirms atpazīt rakstzīmes šajos attēlos (OCR) un no tā izveidot subtitrus. Tas ir atsevišķs process no celiņa izvilkšanas."
    ]
   },
   {
    "h2": "Kas parasti seko pēc izvilkšanas",
    "ps": [
     "Tas, kas iznāk, ir celiņš tāds, kāds tas bija: rīks neuzmin kodējumus un neizlabo laika skalas. Tāpēc bieži rodas divas lietas:",
     "Viens ir **sakropļots teksts** — kodējuma problēma avota celiņā, kas tāpat iznāk sakropļota; dodieties uz [[Kā labot sakropļotu tekstu|/guides/repair.html]], lai identificētu kodējumu. Otrs ir **nepareizs laiks** — neatkarīgi no tā, vai avotam ir ievada logo vai kadru nomaiņas ātrumi nesakrīt, rezultāts ir nobīdīts kopumā; izmantojiet [[Laika skalas pielāgošana|/shift.html]], lai to nobīdītu vai mērogotu.",
     "Pēc tam, lai tulkotu, dodieties uz [[Subtitru tulkošana|/translate.html]], un, lai padarītu tos divvalodu, skatiet [[Divi veidi, kā izveidot divvalodu subtitrus|/guides/make-bilingual-subtitles.html]]."
    ],
    "img": {
     "file": "videosub-formats",
     "alt": "Rezultātu apgabals ar SRT / VTT / ASS / TXT eksportēšanas formātiem",
     "cap": "Izvilktos subtitrus var eksportēt četros formātos; ASS avots saglabā savu stila galveni un izšķirtspēju"
    }
   },
   {
    "h2": "Dažas lietas, ko viegli saprast nepareizi",
    "ps": [
     "**Subtitru izvilkšana nav to iecepšana video.** Video netiek pārkodēts, tāpēc attēla kvalitāte un audio paliek neskarti.",
     "**Izvilkšana neietekmē oriģinālo failu.** Tikai lasīšana, nekad netiek rakstīts, un no video nemainās ne bita.",
     "**Liela faila lēnums nav savienojuma problēma.** Rīks skenē celiņa informāciju gabals pa gabalam, un jo lielāks fails, jo ilgāk tas aizņem; tas viss notiek lokāli.",
     "**Ārējiem subtitriem šī lapa nav vajadzīga.** Ja jums ir .srt / .ass, dodieties tieši uz [[Formātu konvertēšana|/convert.html]]; vispirms ir jāizvelk tikai tie subtitri, kas iepludināti video iekšpusē."
    ]
   },
   {
    "h2": "Saistītie rīki un ceļveži",
    "ps": [
     "Pilnu pamācību skatiet šeit: [[Kā izvilkt subtitrus, kas iekļauti video|/guides/videosub.html]]; lai tulkotu izvilkto, dodieties uz [[Subtitru tulkošana|/translate.html]], lai padarītu to divvalodu, skatiet [[Divi veidi, kā izveidot divvalodu subtitrus|/guides/make-bilingual-subtitles.html]]; bojātu tekstu sāciet labot ar [[Sakropļota teksta labošana|/repair.html]]."
    ]
   }
  ]
 },
 "fps-23-976-vs-25": {
  "seo": {
   "title": "Ko 23.976 / 24 / 25 / 30 kadri sekundē patiesībā nozīmē – Subtitru laiks – AI-SRTSub",
   "desc": "23.976 nav 24 un 29.97 nav 30 — trūkstošais 0.1% nāk no NTSC krāsas, savukārt PAL atskaņo filmas 4% ātrāk. Kā šie rādītāji maina subtitru laiku un kā veikt konvertēšanu starp tiem.",
   "h1": "Ko 23.976 / 24 / 25 / 30 kadri sekundē patiesībā nozīmē",
   "intro": "0.1% atstarpe starp 23.976 un 24 ir paliekas no televīzijas vēstures. Kopā ar PAL 4% tas ir iemesls, kāpēc filmas gaitā subtitri arvien vairāk atpaliek no sinhronizācijas.",
   "ctaText": "Atvērt laika pielāgošanu"
  },
  "body": [
   {
    "h2": "Kas ir katrs skaitlis",
    "ps": [
     "Kadru nomaiņas ātrums ir tas, cik attēlu tiek parādīts vienā sekundē. Četri, kurus satiekat visbiežāk:"
    ]
   },
   {
    "h2": "No kurienes rodas 0.1%",
    "ps": [
     "23.976 = 24 × 1000/1001, un 29.97 = 30 × 1000/1001. Šis 1000/1001 ir paliekas no krāsas pievienošanas NTSC: lai iespiestu krāsu apakšnesēju, nesalaužot esošos melnbaltos uztvērējus, lauka frekvence tika samazināta no 60 Hz uz 59.94 Hz (60 × 1000/1001), un līdz ar to samazinājās arī kadru nomaiņas ātrums.",
     "Rezultāts: NTSC reģionos filmas tiek raidītas ar 23.976, nevis 24. Atšķirība ir 0.1% jeb 3.6 sekundes stundas laikā — pati par sevi tik tikko pamanāma, bet nejauciet to ar zemāk redzamo 4% un nekad neapvienojiet abus vienā aprēķinā."
    ]
   },
   {
    "h2": "No kurienes rodas 4%",
    "ps": [
     "PAL reģionos rādīšana notiek ar 25 kadriem sekundē. Filmas tiek uzņemtas ar 24 kadru sekundē un vienkārši atskaņotas ar 25 — nav pievienots vai noņemts neviens kadrs, tāpēc atskaņošana norit 4% ātrāk (25/24 ≈ 1.0417). 100 minūšu gara filmass PAL versijā ilgst 96 minūtes.",
     "Tā ir **progresīvās nobīdes** sakne: subtitri, kas veidoti oriģinālam, un video PAL versijā sakrīt precīzi sākumā un līdz titriem atšķiras par četrām minūtēm. Neviena globāla nobīde to nespēj glābt; tā ir jāpārmēro pēc attiecības."
    ],
    "img": {
     "file": "shift-step-rate",
     "alt": "Laika iestatīšanas lapas ātruma sadaļa: attiecības ievades lodziņš",
     "cap": "Pārmērot pēc attiecības — viena vērtība aptver visu filmu"
    }
   },
   {
    "h2": "Kā konvertēt",
    "ps": [
     "Konvertēšana nozīmē reizināšanu ar vienu attiecību, kas attiecas uz visu filmu:"
    ]
   },
   {
    "h2": "Kā noteikt, kurš jums ir",
    "ps": [
     "Tā vietā, lai minētu attiecību, atrodiet divus mirkļus, kuru pareizajā laikā esat pārliecināts — parasti pirmo un pēdējo dialoga rindiņu — un sakiet rīkam: \"šai rindiņai jābūt pie 00:[00]:12 un tai otrai pie 01:35:40\"; tas lineāri izstiepj visu filmu starp šiem diviem punktiem. Tā ir \"divu punktu piesaiste\", un tai nav nepieciešami nekādi kadru nomaiņas ātruma aprēķini no jums.",
     "Lai pats apstiprinātu kadru nomaiņas ātrumu, pārbaudiet savu atskaņotāju vai multivides informācijas rīku. Ja faila nosaukums, piemēram, `1080p.WEB`, nesatur norādi par kadru nomaiņas ātrumu, divu punktu piesaiste ir drošāks ceļš."
    ],
    "img": {
     "file": "shift-step-two",
     "alt": "Laika iestatīšanas lapas divu punktu piesaistes sadaļa: divas laika zīmumu ievades rindas",
     "cap": "Divu punktu piesaistei nav nepieciešams kadru nomaiņas ātrums — tikai divi laika zīmumi"
    }
   },
   {
    "h2": "Saistītie rīki un ceļveži",
    "ps": [
     "Pati kadru nomaiņas ātruma konvertēšana — [[Subtitru kadru nomaiņas ātruma konvertēšana|/guides/srt-fps-converter.html]]; ātruma pielāgošana — [[Subtitru ātruma konvertēšana|/guides/subtitle-speed-converter.html]]; nav pārliecības, vai tā ir globāla nobīde vai progresīva nobīde — [[Subtitri arvien vairāk atpaliek no sinhronizācijas|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "glossary": {
  "seo": {
   "title": "Terminu pakešu aizvietošana subtitros – Viena tabula izlabo failu – AI-SRTSub",
   "desc": "Viens noteikums rindiņā, atdalīts ar -> , => , → vai Tab, ar # komentāriem. Atbilstība veseliem vārdiem, reģistrjutība, divvalodu frāzes pirmā vai otrā rindiņa, katras izmaiņas uzskaitītas un atsaucamas.",
   "h1": "Kā pakešu veidā aizvietot terminus subtitros",
   "intro": "Viena terminu tabula vienā piegājienā padara visa subtitru faila terminoloģiju konsekventu — laika skalas, ASS stili un VTT NOTE bloki netiek aizskarti ne ar vienu rakstzīmi.",
   "ctaText": "Atvērt terminu pakešu aizvietošanu"
  },
  "body": [
   {
    "h2": "Ko šis rīks dara",
    "ps": [
     "Viens un tas pats vārds, kas tulkots divos dažādos veidos, vārdi un vietas, kas ar mašīntulkojumu sāk klīst dažādos virzienos, kāda cita subtitri, kam jāatbilst jūsu pašas konvencijām — visiem tiem ir viena kopīga iezīme: mainās vārds, nevis struktūra. Šī lapa maina tikai vārdus."
    ]
   },
   {
    "h2": "Divas ievades: subtitri un terminu tabula",
    "ps": [
     "Kolonna \"1 Pievienot subtitrus\" kreisajā pusē uzņem subtitru failu, vai arī jūs varat ielīmēt saturu tieši iekšā; ja izvēlējāties nepareizu failu, noklikšķiniet uz \"Notīrīt\".",
     "Kolonna \"2 Terminu tabula\" labajā pusē satur noteikumus. **Viens noteikums rindiņā**, kur veco terminu un jauno terminu atdala `->` , `=>` , `→` vai Tab — strādā visi četri. Rindas, kas sākas ar `#`, ir komentāri un nepiedalās aizvietošanā.",
     "Ja neesat pārliecināts par formātu, noklikšķiniet uz \"Aizpildīt ar piemēru\" un rediģējiet to."
    ],
    "img": {
     "file": "glossary-up",
     "alt": "Subtitru pievienošanas zona un terminu aizvietošanas lapas terminu tabulas ievade",
     "cap": "Subtitri kreisajā pusē, noteikumi labajā pusē; viens noteikums rindiņā, vecs termins un jauns termins atdalīti ar ->"
    }
   },
   {
    "h2": "Kā uzrakstīt terminu tabulu",
    "ps": [
     "Viens noteikums rindiņā: pašreizējais termins kreisajā pusē, tam labajā pusē jākļūst par. Piemēram, `Thor -> Donar` aizvieto katru failā sastopamo \"Thor\" ar \"Donar\".",
     "Komentāri sākas ar `#` un ir noderīgi noteikumu grupas apzīmēšanai (piemēram, \"# season 1 name fixes\"), kā arī lai īslaicīgi izslēgtu noteikumu — vienkārši ielieciet priekšā `#`, tā vietā lai to dzēstu.",
     "Noteikumi izpildās no augšas uz leju; teksts, ko ģenerē viens noteikums, tiek skenēts no jauna ar zemāk esošajiem noteikumiem. Ja secībai ir nozīme (teiksim, vispirms aizvietot A ar B un tad B ar C), paturiet to prātā."
    ],
    "img": {
     "file": "glossary-table",
     "alt": "Viena aizvietošanas noteikumu rinda pēc otras terminu tabulas ievadē",
     "cap": "Viens noteikums rindiņā; rindas, kas sākas ar #, ir komentāri un var īslaicīgi izslēgt noteikumu"
    }
   },
   {
    "h2": "Ko dara trīs slēdži",
    "ps": [
     "**Darbības joma**: `all` / `first line only` / `second line only`. Divvalodu failā izvēlieties \"tikai otrā rindiņa\", ja vēlaties mainīt tikai tulkojumu; ieraksti, kam ir tikai viena rindiņa, paliek neskarti pie jebkura viena rindiņas iestatījuma — rīks neuzmin, kura puse ir oriģināls.",
     "**Vesels vārds**: aizvieto tikai tos terminus, kas pastāv atsevišķi kā vārds, tāpēc `art` neaiztiks `start`. Valodām, kas neatdala vārdus ar atstarpēm, piemēram, ķīniešu un japāņu, šim slēdzim nav ietekmes — tur aizvietošana darbojas ar apakšvirknēm.",
     "**Reģistrjutīgs**: pēc noklusējuma izslēgts, tāpēc `CEO` un `ceo` tiek aizvietoti abi; ja atzīmēts, tiek aizvietota tikai precīzi tā pati rakstība."
    ],
    "img": {
     "file": "glossary-opt",
     "alt": "Darbības jomas, vesela vārda un reģistrjutīgie slēdži zem terminu tabulas",
     "cap": "Darbības joma izlemj, kura rinda mainās; vesels vārds un reģistrs izlemj, cik stingri termins tiek saskaņots"
    }
   },
   {
    "h2": "Katras izmaiņas uzskaitītas, katras izmaiņas atsaucamas",
    "ps": [
     "\"3 Rezultāts\" parāda aizvietotos subtitrus un arī **uzskaita katras izmaiņas**: kurš fragments, kura rinda, no kā uz ko.",
     "Ja jūs nevēlaties kādu no tām, noklikšķiniet uz tās sarakstā, lai atsauktu tikai šo vienu ierakstu — nav nepieciešams rediģēt terminu tabulu un palaist to no jauna. Kad esat apmierināts, noklikšķiniet uz \"Lejupielādēt\" vai \"Kopēt\"."
    ],
    "img": {
     "file": "glossary-out",
     "alt": "Rezultātu apgabals ar atsevišķo izmaiņu sarakstu",
     "cap": "Katras izmaiņas ir uzskaitītas; noklikšķiniet uz tās, kuru nevēlaties, lai to atsauktu"
    }
   },
   {
    "h2": "Kas paliek neskarts",
    "ps": [
     "**Laika skalas, ASS stila līnijas un VTT `NOTE` bloki netiek aizskarti ne ar vienu rakstzīmi.** Aizvietošana attiecas tikai uz dialoga tekstu, nekad uz strukturālām rindām.",
     "Terminu tabula nekad automātiski nemodificē jūsu subtitru failu — rezultāts ir jauna izvade, un oriģināls paliek tāds, kāds tas bija."
    ]
   },
   {
    "h2": "Bieži uzdotie jautājumi",
    "ps": [
     "**Kāpēc termins netika aizvietots?** Vispirms pārbaudiet darbības jomu: ja ir atlasīts \"tikai otrā rindiņa\", ieraksti, kam ir tikai viena rindiņa, paliek neskarti. Pēc tam pārbaudiet vesela vārda saskaņošanu, kas aptur atbilstības, kuras nav patstāvīgi vārdi.",
     "**Kāpēc ķīniešu valodā joprojām tiek aizvietotas apakšvirknes, ja ir atzīmēta vesela vārda saskaņošana?** Tas ir paredzēts. Ķīniešu un japāņu valoda neatdala vārdus ar atstarpēm, tāpēc rīks nevar noteikt vārdu robežas, un vesela vārda saskaņošanai tur nav ietekmes.",
     "**Kā atsaukt visu pēc kļūdas?** Atsauciet ierakstus pa vienam izmaiņu sarakstā; lai sāktu no jauna pilnībā, notīriet terminu tabulu un pievienojiet subtitrus vēlreiz.",
     "**Vai ASS stila līnijas var nejauši tikt mainītas?** Nē. Stila līnijas un `NOTE` bloki ir ārpus darbības jomas; piedalās tikai dialoga teksts."
    ]
   },
   {
    "h2": "Privātums",
    "ps": [
     "Subtitri un terminu tabula tiek apstrādāti pilnībā pārlūkprogrammā: nekas netiek augšupielādēts un nekas neiet caur serveri. Terminu tabulas netiek saglabātas, tāpēc nākamreiz, atverot lapu, tā ir tukša."
    ]
   },
   {
    "h2": "Saistītie rīki un ceļveži",
    "ps": [
     "Par to, vai veidot terminu tabulu un kā to uzturēt sezonas garumā, skatiet [[Terminu tabulas: sezonas konsekvences uzturēšana|/guides/subtitle-glossary.html]]; ja saturs ir netīrs (ūdenszīmes, SDH fragmenti), vispirms palaidiet [[Subtitru tīrīšana|/clean.html]]; kad nosaukumi ir sakārtoti un jums ir vajadzīgas citas valodas, dodieties uz [[Subtitru tulkošana|/translate.html]]; un palaidiet rezultātu caur [[Subtitru kvalitātes kontrole|/qc.html]]."
    ]
   }
  ]
 },
 "hanconv": {
  "seo": {
   "title": "Vienkāršotās–tradicionālās ķīniešu valodas subtitru konvertēšana – Taivāna pret Honkongu – AI-SRTSub",
   "desc": "Visu deviņu virzienu apskats: Taivānas ar vai bez reģionālās leksikas, Honkonga kā savdabīga garša, viss konvertējams atpakaļ uz vienkāršoto. Mainās tikai dialogs; laika atzīmes paliek savās vietās.",
   "h1": "Kā konvertēt vienkāršotās un tradicionālās ķīniešu valodas subtitrus",
   "intro": "Tas, vai subtitri nonāk Taivānā, Honkongā vai kontinentālajā daļā, maina gan vārdu krājumu, gan rakstzīmju formas. Deviņi virzieni, no kuriem izvēlēties, un tiek konvertēts tikai dialogs — laika atzīmes, indeksa numuri un ASS stila līnijas nekad netiek aizskartas.",
   "ctaText": "Atvērt konvertētāju"
  },
  "body": [
   {
    "h2": "Ko šis rīks dara",
    "ps": [
     "Konvertēšana starp vienkāršoto un tradicionālo nav tikai katras rakstzīmes rakstīšana citādi. Viens un tas pats vienkāršotais vārds dažādos reģionos atbilst dažādiem vārdiem — vārds \"programmatūra\" atšķiras starp Taivānu un kontinentālo daļu, un Honkongai ir vēl cita versija. Konvertētājs tos tur atstatus:"
    ]
   },
   {
    "h2": "Augšupielāde un noteikšana",
    "ps": [
     "Velciet failu iekšā vai meklējiet to — tiek atbalstīti SRT, VTT, ASS un TXT — vai ielīmējiet subtitru saturu tieši lodziņā. Formāts tiek noteikts automātiski un parādīts blakus \"Noteiktais formāts\"."
    ],
    "img": {
     "file": "hanconv-up",
     "alt": "Konvertētāja augšupielādes zona: izmešanas zona un ielīmēšanas lodziņš ar noteikto formātu augšpusē",
     "cap": "SRT / VTT / ASS / TXT, formāts noteikts automātiski"
    }
   },
   {
    "h2": "Izvēle starp deviņiem virzieniem",
    "ps": [
     "Deviņi virzieni sadaļā \"Konvertēt uz\" iedalās trīs grupās. **Vienkāršotā → tradicionālā**: vispārējā tradicionālā, Taivānas (mainīt leksiku), Taivānas (tikai glifi), Honkongas. **Tradicionālā → vienkāršotā**: vispārējā, no Taivānas, no Honkongas. **Tradicionālā uz tradicionālo**: Taivānas formas, Honkongas formas.",
     "Izvēloties \"Taivānas leksika\", tiek apmainīta arī reģionālā leksika: vārds \"programmatūra\" kļūst par Taivānas vārdu, un tāpat arī vārds \"informācija\"; \"Taivānas glifi\" maina tikai to, kā tiek rakstītas rakstzīmes, un atstāj jūsu leksiku neskartu. Honkonga ir pilnīgi cits gadījums un izmanto vēl citu vārdu \"programmatūrai\". Lai konvertētu atpakaļ uz vienkāršoto, izmantojiet zemāk esošo grupu — jums ir jāpasaka, no kuras tradicionālās dažādības jūs nākat, jo Taivānas un Honkongas teksti izmanto dažādus ceļus atpakaļ."
    ],
    "img": {
     "file": "hanconv-dir",
     "alt": "Konvertēt uz karti: galamērķa nolaižamā izvēlne, kurā atlasīts \"Vienkāršotā → Taivānas tradicionālā (mainīt leksiku)\"",
     "cap": "Virzieni atrodas nolaižamajā izvēlnē \"Konvertēt uz\" trīs grupās; šī ir Taivānas ar leksikas izmaiņām"
    }
   },
   {
    "h2": "Rezultāts un eksportēšana",
    "ps": [
     "Rezultātu apgabals uzreiz parāda konvertētos subtitrus ar statistikas joslu, kas norāda kopējo rindiņu skaitu un to, cik rindiņu ir mainījies. Ja nekas vispār nav mainījies, jūs saņemat mājienu, ka fails var nesaturēt ķīniešu rakstzīmes — tiek konvertētas tikai haņu rakstzīmes, tāpēc subtitri, kuros ir tikai latīņu vai tikai cipari, paliek tieši tādi, kādi tie bija.",
     "Pēc tam lejupielādējiet vai kopējiet. Faila nosaukumā tiek ievietota valodas birka — `demo.srt` kļūst par `demo.zh-TW.srt` Taivānas tradicionālajai, `.zh-Hant` vispārējajai tradicionālajai un `.zh-Hans`, konvertējot atpakaļ uz vienkāršoto."
    ],
    "img": {
     "file": "hanconv-out",
     "alt": "Rezultātu apgabals: konvertētie subtitri un statistikas josla",
     "cap": "Statistikas josla parāda kopējo un mainīto rindiņu skaitu; lejupielādējiet vai kopējiet no šejienes"
    }
   },
   {
    "h2": "Tas, kas nekad netiek aizskarts",
    "ps": [
     "Tiek konvertēts tikai dialogs. Laika atzīmes, indeksa numuri un ASS stila līnijas netiek aizskartas vispār — rezultāts ir gatavs lietošanai bez jebkādas formatēšanas pārtaisīšanas."
    ]
   },
   {
    "h2": "Bieži uzdotie jautājumi",
    "ps": [
     "**Kpēc konvertētājs nemainīja vārdu \"tīrs\"?** Vienas-daudzu atbilstības tiek atrisinātas pēc vārda: \"tīrā\" nozīme un \"sausā\" nozīme dala vienu tradicionālo formu, savukārt \"koka stumbra\" nozīme izmanto citu. Tabulas nāk no OpenCC, saskaņojot veselas frāzes, nevis atsevišķas rakstzīmes.",
     "**Kāda ir atšķirība starp Taivānas un Honkongas tradicionālo?** Vārdu krājums: vārds \"programmatūra\" starp abām atšķiras. Izvēlieties virzienu reģionam, uz kuru piegādājat.",
     "**Rakstzīmju skaits pēc konvertēšanas mainījās?** Haņu rakstzīmes tiek tikai apmainītas — netiek pievienoti vai noņemti nekādi ieraksti un nav pārvietots laiks. Ja rindiņu skaits ir mainījies, pārbaudiet, vai formāts tika noteikts pareizi.",
     "**Vārdnīcu neizdevās ielādēt?** Lapa liek jums atjaunināt un mēģināt vēlreiz. Tā ielādējas lokāli, tāpēc subtitrus nekur nav nepieciešams augšupielādēt."
    ]
   },
   {
    "h2": "Privātums",
    "ps": [
     "Konvertēšana notiek pilnībā jūsu pārlūkprogrammā. Nekāds subtitru saturs nekad netiek nosūtīts uz serveri."
    ]
   },
   {
    "h2": "Saistītie rīki un ceļveži",
    "ps": [
     "Ja viss, kas jums nepieciešams, ir vienkāršotā uz tradicionālo, skatiet [[Konvertēt vienkāršotos subtitrus uz tradicionālajiem|/guides/srt-simplified-to-traditional.html]]; kāpēc tas ir par ko vairāk nekā vienkārši rakstzīmju apmaiņu, skatiet [[Vienkāršotā pret tradicionālo nav rakstzīmju apmaiņa|/guides/simplified-traditional-chinese.html]]; lai tulkotu citā valodā, [[Subtitru tulkošana|/translate.html]]."
    ]
   }
  ]
 },
 "how-to-make-lrc-file": {
  "seo": {
   "title": "Kā sinhronizēt LRC dziesmu tekstus – Viena rinda dziesmu tekstam, pieskaroties līdzi – AI-SRTSub",
   "desc": "Izveidot LRC failu no nulles: ielīmējiet vienu rindu katrā rindā, pieskarieties laikam, kad klausāties, svarīgākie īsceļi, kad izlaist rindu, LRC vai SRT, un ko darīt, kad laiks novirzās.",
   "h1": "Kā sinhronizēt LRC dziesmu tekstus",
   "intro": "LRC fails ir vienkārši \"viena dziesmu teksta rinda plus viens laika punkts\". Tā izveidi sauc par sinhronizāciju: katras rindas sākuma brīža fiksēšanu.",
   "ctaText": "Atvērt dziesmu tekstu sinhronizācijas rīku"
  },
  "body": [
   {
    "h2": "Kas patiesībā ir sinhronizācija",
    "ps": [
     "LRC faila struktūra ambīciju dēļ nevarētu būt vienkāršāka: viens dziesmu teksts rindā, katrai priekšā ir `[mm:ss.xx]` laika tags. Kad atskaņotājs sasniedz rindu, tas tajā brīdī parāda šo dziesmu tekstu.",
     "Tātad viss \"LRC izveides\" darbs ir laika punkta piešķiršana katrai dziesmu teksta rindai — un neviena mašīna to nevar izdarīt jūsu vietā, jo izlemšana, kur rinda sākies dziedāt, prasa klausīšanos."
    ]
   },
   {
    "h2": "Cik reizes dziesmai ir jāskan",
    "ps": [
     "Ir vērts veltīt minūti pārdomām pirms darba sākšanas; tas ietaupa lielāko daļu pārlabojumu:"
    ],
    "img": {
     "file": "lrc-tap2",
     "alt": "Atskaņošanas, atzīmēt-šo-rindu, atcelt-vienu-rindu un izlaist-šo-rindu vadīklas pieskaršanās apgabalā",
     "cap": "Enter nospiešana atskaņošanas laikā ir visplūdenākā; atzīmējāt nepareizu rindu? Nospiediet Z un atzīmējiet vēlreiz"
    }
   },
   {
    "h2": "Dziesmu teksta ielīmēšana nosaka, cik gludi noritēs pārējais process",
    "ps": [
     "Ielīmējiet dziesmu tekstus pa vienai rindai vienā tekstā; tukšās rindas tiek izlaistas. Rindiņu pārtraukumi, ko ielīmējat, ir rindas, kuras jūs vēlāk sinhronizēsiet — sadaliet tās vairākās rindās tagad, un vēlāk jūs pieskaraties biežāk.",
     "Ielīmēt esošu LRC arī darbojas: tā `[mm:ss.xx]` laika tagi tiek atpazīti, un pēc importēšanas jūs **turpināt no pirmās rindas bez laika**, tāpēc jau sinhronizētās rindas nav jāpārtaisa.",
     "Tas nozīmē, ka puspabeigtu LRC var saglabāt un vēlāk ielīmēt atpakaļ, lai turpinātu."
    ],
    "img": {
     "file": "lrc-paste2",
     "alt": "Dziesmu teksta ielīmēšanas lauks un dziesmu teksta parsēšanas poga",
     "cap": "Viena rinda dziesmu teksta rindai; vesela LRC ielīmēšana nolasa esošos laikus, lai jūs varētu turpināt"
    }
   },
   {
    "h2": "Export LRC or SRT :: Eksportēt LRC vai SRT",
    "ps": [
     "**Mūzikas atskaņotājam eksportējiet LRC.** to nolasa foobar2000, visu veidu atskaņotāji un ierīces ar dziesmu tekstu attēlošanu.",
     "**Lai ievietotu dziesmu tekstus videoklipā vai apstrādātu tālāk, eksportējiet SRT.** SRT nolasa video subtitru celiņi, subtitru rīki un rediģēšanas programmatūra. Eksportā katra rinda ilgst līdz nākamās sākumam, un pēdējā rinda atgriežas pie 2 sekundēm.",
     "Abos eksportos tiek iekļautas tikai tās rindas, kurām ir laiks — izlaistās rindas failā nekad neiekļūst."
    ],
    "img": {
     "file": "lrc-export",
     "alt": "Lejupielādēt-LRC, lejupielādēt-SRT un kopēšanas pogas eksporta apgabalā",
     "cap": "LRC atskaņotājiem, SRT video; tiek eksportētas tikai rindas ar laiku"
    }
   },
   {
    "h2": "Dažas lietas, ko viegli saprast nepareizi",
    "ps": [
     "**Pēc sinhronizācijas viss ir nedaudz nobīdīts? Izmantojiet nobīdi.** Eksportējiet SRT un pārvietojiet to kopumā ar [[Timeline adjustment|/shift.html]]; tas ir daudz ātrāk nekā sinhronizēt no jauna rindu pa rindai.",
     "**Dziesmai turpinoties, novirze palielinās? Tā ir ātruma problēma.** Ja atskaņošanas ātrums un ierakstīšanas ātrums atšķiras, kļūda aug pret beigām, un tam ir nepieciešama proporcionāla mērogošana, nevis nobīde.",
     "**Īsceļi šķiet dabiski tikai tad, ja tos izmantojat kopā.** Atstarpe atskaņo un pauzē, Enter atzīmē pašreizējo rindu, Z atceļ vienu rindu — nospiediet Enter tieši atskaņošanas laikā, tā vietā, lai pārslēgtos starp peli un tastatūru.",
     "**Audio kvalitāte ietekmē precizitāti.** Avotu ar skaidru vokālu ir vieglāk sekot; koncertierakstus un avotus ar skaļu pavadījumu ir ievērojami grūtāk."
    ]
   },
   {
    "h2": "Saistītie rīki un ceļveži",
    "ps": [
     "Pilnu ceļvedi skatiet [[How to use the lyric sync tool|/guides/lrc.html]]; lai pārvērstu esošu LRC subtitros, skatiet [[LRC to SRT|/guides/lrc-to-srt.html]]; ja eksportētajam SRT ir nepareizs laiks, izmantojiet [[Timeline adjustment|/shift.html]]; un palaidiet rezultātu caur [[Subtitle QC|/qc.html]]."
    ]
   }
  ]
 },
 "lrc": {
  "seo": {
   "title": "Dziesmu teksta sinhronizācijas rīks – Ielādējiet dziesmu, ielīmējiet dziesmu tekstus, pieskarieties līdzi – AI-SRTSub",
   "desc": "Ielādējiet dziesmu, ielīmējiet dziesmu tekstus, klausoties pieskarieties laika zīmogam katrai rindai un eksportējiet LRC vai SRT. Atstarpe atskaņo un pauzē, Enter atzīmē rindu, Z atceļ, rokas paliek uz tastatūras.",
   "h1": "Kā lietot dziesmu teksta sinhronizācijas rīku",
   "intro": "Ielādējiet dziesmu, ielīmējiet dziesmu tekstus, klausoties pieskarieties katras rindas laika zīmogam un eksportējiet standarta LRC vai SRT. Audio tiek atskaņots lokāli un nekad netiek augšupielādēts.",
   "ctaText": "Atvērt dziesmu teksta sinhronizācijas rīku"
  },
  "body": [
   {
    "h2": "What this tool does :: Ko šis rīks dara",
    "ps": [
     "Sniedziet dziesmai dziesmu teksta failu, kuram var dziedāt līdzi: viena rinda dziesmu tekstam, katra rinda satur laika punktu. Atskaņotāji nolasa LRC, subtitru celiņi nolasa SRT, un abus var eksportēt šeit."
    ]
   },
   {
    "h2": "1 Load the song :: 1 Ielādēt dziesmu",
    "ps": [
     "Pirmā kolonna kreisajā pusē pieņem audio failu: der **MP3, M4A, FLAC, WAV un OGG**. Audio tiek atskaņots lokāli un nekad netiek augšupielādēts.",
     "Audio kvalitāte neietekmē sinhronizācijas precizitāti, bet avotu ar skaidru vokālu ir vieglāk sekot; koncertierakstus un avotus ar skaļu pavadījumu ir ievērojami grūtāk sinhronizēt."
    ],
    "img": {
     "file": "lrc-up",
     "alt": "Dziesmu teksta sinhronizācijas rīka dziesmas ielādes apgabals",
     "cap": "MP3 / M4A / FLAC / WAV / OGG visi darbojas, un audio tiek atskaņots tikai lokāli"
    }
   },
   {
    "h2": "2 Paste the lyrics :: 2 Ielīmēt dziesmu tekstus",
    "ps": [
     "Ielīmējiet dziesmu tekstus otrajā kolonnā, **viena rinda katram dziesmu tekstam**; tukšās rindas tiek izlaistas automātiski. Pēc tam noklikšķiniet uz \"Parsēt dziesmu tekstus\".",
     "Esoša LRC ielīmēšana arī darbojas — tā `[mm:ss.xx]` laika tagi tiek atpazīti, un pēc importēšanas jūs turpināt no pirmās rindas bez laika, tāpēc jau sinhronizētās rindas nav jāpārtaisa."
    ],
    "img": {
     "file": "lrc-paste",
     "alt": "Dziesmu teksta ielīmēšanas lauks un dziesmu teksta parsēšanas poga",
     "cap": "Ielīmējiet vienu rindu katram dziesmu tekstam vai ielīmējiet veselu LRC un ļaujiet rīkam nolasīt esošos laikus"
    }
   },
   {
    "h2": "3 Pieskarieties līdzi klausoties",
    "ps": [
     "Atskaņojiet dziesmu un nospiediet Enter brīdī, kad sākas rinda (vai noklikšķiniet uz \"Atzīmēt šo rindu\"); šīs rindas laiks tiek ierakstīts un kursors pāriet uz nākamo.",
     "Īsceļi: **atstarpe** atskaņo un pauzē, **Enter** atzīmē pašreizējo rindu, **Z** atceļ vienu rindu. Enter nospiešana atskaņošanas laikā ir visplūdenākais darba veids — nav jāpārslēdzas turp un atpakaļ starp peli un tastatūru.",
     "Atzīmējāt nepareizu rindu? Nospiediet Z, lai to atceltu un atzīmētu vēlreiz. Ja nevēlaties atzīmēt rindu vispār (instrumentāls pārtraukums, tīri muzikāls fragments), noklikšķiniet uz \"Izlaist šo rindu\", un tā neparādīsies eksportā."
    ],
    "img": {
     "file": "lrc-tap",
     "alt": "Atskaņošanas, atzīmēt-šo-rindu, atcelt-vienu-rindu un izlaist-šo-rindu vadīklas pieskaršanās apgabalā",
     "cap": "Atstarpe atskaņo un pauzē, Enter atzīmē pašreizējo rindu, Z atceļ — rokas paliek uz tastatūras"
    }
   },
   {
    "h2": "4 Export :: 4 Eksportēt",
    "ps": [
     "Ceturtā kolonna veic eksportu: **Lejupielādēt LRC** atskaņotājiem, **Lejupielādēt SRT** video subtitru celiņiem vai \"Kopēt\", lai paņemtu tekstu tieši.",
     "Tiek eksportētas tikai rindas ar laiku; izlaistās rindas nekad neiekļūst failā. SRT eksportā katra rinda ilgst līdz nākamās sākumam, un pēdējā rinda atgriežas pie 2 sekundēm."
    ],
    "img": {
     "file": "lrc-out",
     "alt": "Lejupielādēt-LRC, lejupielādēt-SRT un kopēšanas pogas eksporta apgabalā",
     "cap": "LRC atskaņotājiem, SRT video; tiek eksportētas tikai rindas ar laiku"
    }
   },
   {
    "h2": "Kas paliek neskarts",
    "ps": [
     "Dziesmu teksta vārdi netiek pārrakstīti. Sinhronizācija pievieno tikai vienu laika punktu rindai un nekad nepieskaras jūsu ielīmētajiem vārdiem.",
     "Importējot esošu LRC, rindas, kurām jau ir laika tags, saglabā savu sākotnējo laiku, un jūs atzīmējat tikai sākot no pirmās nesinhronizētās rindas."
    ]
   },
   {
    "h2": "Common questions :: Bieži uzdotie jautājumi",
    "ps": [
     "**Kāpēc no eksporta trūkst dažu rindu?** Izlaistās rindas un rindas bez laika nekad neiekļūst failā. Atgriezieties pie trešā solis un pievienojiet tās, vai apstipriniet, ka tās bija domāts izlaist.",
     "**Vai laikus var mainīt vēlāk?** Ja pēc atzīmēšanas vēlaties visu nedaudz pārvietot, eksportējiet SRT un izmantojiet [[Timeline adjustment|/shift.html]], lai nobīdītu vai mērogotu to kopumā.",
     "**LRC vai SRT — kas būtu jāeksportē?** LRC mūzikas atskaņotājiem (foobar2000, straumēšanas klientiem, visu veidu atskaņotājiem); SRT, ja dziesmu tekstiem jāatrodas uz video vai jāapstrādā tālāk ar subtitru rīkiem.",
     "**Cik ilgst viena dziesma?** Tas ir atkarīgs no rindu skaita un vēlamās precizitātes. Dziesmai ar trīsdesmit vai četrdesmit rindām dažas minūtes vienā piegājienā, kad pārzināt plūsmu; tiecoties pēc precizitātes vārda līmenī, tas aizņem ilgāku laiku."
    ]
   },
   {
    "h2": "Privacy :: Konfidencialitāte",
    "ps": [
     "Audio un dziesmu teksti tiek apstrādāti pilnībā pārlūkprogrammā: nekas netiek augšupielādēts un nekas neiet caur serveri. Audio tiek atšifrēts un atskaņots tikai lokāli."
    ]
   },
   {
    "h2": "Saistītie rīki un ceļveži",
    "ps": [
     "Ja jums jau ir LRC un vēlaties subtitrus, skatiet [[LRC to SRT|/guides/lrc-to-srt.html]]; par apsvērumiem un slazdiem aiz sinhronizācijas skatiet [[How to sync LRC lyrics|/guides/how-to-make-lrc-file.html]]; ja eksportētais SRT ir nobīdījies, izmantojiet [[Timeline adjustment|/shift.html]]; un palaidiet rezultātu caur [[Subtitle QC|/qc.html]]."
    ]
   }
  ]
 },
 "lrc-to-srt": {
  "seo": {
   "title": "LRC uz SRT pārveidotājs – Pārvērtiet dziesmu tekstus subtitros – AI-SRTSub",
   "desc": "Pārvērst LRC dziesmu tekstus SRT subtitros: katra rinda ilgst līdz nākamās sākumam, pēdējais fragments saņem 3 sekundes. Dziesmas, kas garākas par 60 minūtēm, nolasās pareizi. Darbojas jūsu pārlūkprogrammā.",
   "h1": "LRC to SRT :: LRC uz SRT",
   "intro": "Pārvērtiet LRC dziesmu teksta failus par SRT: nometiet failu, izvēlieties SRT, lejupielādējiet. Beigu laiki tiek automātiski aizpildīti no nākamās rindas.",
   "ctaText": "Convert LRC → SRT :: Pārvērst LRC → SRT"
  },
  "body": [
   {
    "h2": "Ar ko LRC atšķiras no SRT",
    "ps": [
     "LRC ir dziesmu tekstu formāts: katra rinda nes tikai \"dziedāšanas sākuma\" laiku iekš `[minutes:seconds.cents]` un **nav beigu laika**; katram SRT fragmentam ir nepieciešams gan sākums, gan beigas. Tātad konvertēšanas kodols ir beigu laiku aizpildīšana."
    ],
    "img": {
     "file": "convert-upload-lrc",
     "alt": "Augšupielādes apgabals: LRC fails ielādēts, atpazīts kā LRC",
     "cap": "Dziesmu teksta fails ar [00:12.50] laika zīmogiem tiek uzreiz atpazīts kā LRC"
    }
   },
   {
    "h2": "Kā tiek aizpildīti beigu laiki",
    "ps": [
     "Noteikums ir vienkāršs: **katra rinda ilgst līdz nākamās sākumam**; beigu rindai nav \"nākamās\", tāpēc tā saņem 3 sekundes. Turklāt LRC laika zīmogi satur tikai minūtes un sekundes — bez stundām — un minūšu lauks nepārnesas (62:05 nozīmē 1 stunda 2 min 5 s), tāpēc īpaši gari ieraksti, piemēram, dīdžeju miksi, nolasās pareizi."
    ]
   },
   {
    "h2": "How to convert :: Kā konvertēt",
    "ps": [
     "Atveriet [[converter|/convert.html]], iemetiet LRC, izvēlieties **SRT - SubRip** kā izvadi, pēc tam konvertējiet un lejupielādējiet. Noderīgi mūzikas videoklipiem un dziesmu tekstu ievietošanai kā subtitriem atskaņotājos; eksportēto SRT var atkal konvertēt uz VTT tīmeklim."
    ]
   }
  ]
 },
 "make-bilingual-subtitles": {
  "seo": {
   "title": "Divi veidi, kā izveidot divvalodu subtitrus – AI-SRTSub",
   "desc": "Divvalodu subtitri ir divās formās: divas rindas vienā fragmentā vai divi fragmenti uz vienas laika skalas. Plusi, mīnusi un kā pārslēgties starp tiem. – AI-SRTSub",
   "h1": "Divi veidi, kā izveidot divvalodu subtitrus",
   "intro": "Tas pats divvalodu subtitrs var slēpt divus pilnīgi dažādus izkārtojumus. Iemācieties tos atšķirt, un veidošana, sadalīšana un konvertēšana vairs nesagādās problēmas.",
   "ctaText": "Strādāt ar divvalodu subtitriem"
  },
  "body": [
   {
    "h2": "Kā izskatās abas formas",
    "ps": [
     "**B forma: divi fragmenti uz vienas laika skalas.** Viena dialoga rinda kļūst par diviem atsevišķiem subtitru fragmentiem ar identisku laiku — viena angļu, viena ķīniešu —, kas novietoti viens virs otra. Šis ir visizplatītākais veids, kā tiek veidoti divvalodu ASS subtitri."
    ]
   },
   {
    "h2": "Kur katra no tām klibo",
    "ps": [
     "A formas vājais punkts ir **atpazīšana**: celiņu sadalīšana balstās uz rakstības sistēmu, tāpēc ķīniešu-angļu vai japāņu-angļu pāri atdalās uzreiz, savukārt **kombinācijas, kurām ir kopīgs viens skripts** — angļu plus franču vai ķīniešu plus japāņu kandži — nevar atšķirt. B formas vājais punkts ir **ražošana**: abām laika skalām ir precīzi jāsakrīt, un to pielīdzināšana ar roku ir nogurdinoša; daži atskaņotāji arī zīmē abus vienas laika skalas fragmentus, pārpildot ekrānu. Pamatlikums: izmantojiet A formu gataviem subtitriem, kas paredzēti skatītājiem; izmantojiet B formu, kad nepieciešams atdalīt celiņus turpmākam darbam."
    ]
   },
   {
    "h2": "The Two Routes :: Abi ceļi",
    "ps": [
     "**Izveidojiet divvalodu subtitrus no oriģināla**: izmantojiet [[AI Subtitle Translation|/translate.html]] un eksportējot izvēlieties \"Bilingual · original on top\" vai \"Bilingual · translation on top\" — jūs uzreiz saņemat A formu; izvēloties ASS, tiek piedāvāti arī divi izkārtojumi: \"stacked top and bottom\" un \"two lines at the bottom\".",
     "**Apvienojiet divus celiņus vai konvertējiet starp formām**: izmantojiet [[Bilingual Subtitle Stripper|/bilingual.html]] un tā režīmu \"merge into one two-line entry\" — B forma iec, A forma ārā; ejot otrā virzienā, \"split into two files\" paņem A vai B formu iekšā un dod divus neatkarīgus celiņus ārā."
    ],
    "img": {
     "file": "bilingual-modes",
     "alt": "Četri divvalodu noņēmēja režīmi; \"merge into one two-line entry\" apvieno divus fragmentus, kuriem ir kopīga laika skala",
     "cap": "\"Merge into one two-line entry\": B forma kļūst par A formu"
    }
   },
   {
    "h2": "Kura ierīce to atskaņos",
    "ps": [
     "Tīmekļa atskaņotāji (HTML5 `<track>`) un vairums mobilo atskaņotāju apstrādā A formu drošāk; darbvirsmas atskaņotāji (VLC, mpv, PotPlayer) pieņem abus un var pat piešķirt abiem vienas laika skalas fragmentiem dažādas krāsas un pozīcijas. Ja šaubāties, eksportējiet A formu kā SRT — tā ir vislabāk saderīgā. Par pašu formātu atšķirībām skatiet [[SRT, VTT or ASS: Which Should You Use|/guides/subtitle-format-comparison.html]]."
    ],
    "img": {
     "file": "translate-export",
     "alt": "Divvalodu stila opcijas tulkošanas rīka eksporta panelī",
     "cap": "Izvēlieties divvalodu rindiņu secību tieši eksportējot — viens solis, un tas ir izdarīts"
    }
   },
   {
    "h2": "FAQ :: Bieži uzdotie jautājumi",
    "ps": [
     "**Divvalodu subtitri izskatās saspiesti — ko es varu darīt?** Kontrolējiet rindiņas platumu: tulkošanas rīka eksporta panelī ir iestatījums \"bilingual line width\"; šaurāka rinda nozīmē mazāk rakstzīmju uz fragmentu un tīrāku ekrānu.",
     "**Es gribu tikai vienu celiņu.** Noņēmēja funkcija \"keep original only / keep translation only\" to atrisina ar vienu klikšķi, skatiet [[Split Bilingual Subtitles into Two Tracks|/guides/split-bilingual-subtitles.html]]."
    ]
   }
  ]
 },
 "merge": {
  "seo": {
   "title": "Divvalodu un stilizētu subtitru apvienošana – Apvienojiet, stilizējiet, eksportējiet – AI-SRTSub",
   "desc": "Apvienojiet divus subtitru failus divvalodu celiņā, pārveidojiet esoša divvalodu faila stilu vai stilizējiet vienvalodas failu: pārošanas režīmi, ASS un VTT veidnes, kā arī eksportējamais formāts.",
   "h1": "Kā lietot divvalodu apvienošanu un specefektu subtitrus",
   "intro": "Apvienojiet divus subtitru failus vienā divvalodu celiņā vai tieši stilizējiet subtitrus: fonts, krāsa, kontūra un pozīcija ir tāda, ko redzat, to saņemat, un priekšskatījums sakrīt ar eksportu.",
   "ctaText": "Atvērt specefektu subtitru rīku"
  },
  "body": [
   {
    "h2": "What this tool does :: Ko šis rīks dara",
    "ps": [
     "Šī viena lapa faktiski aptver trīs darbus: oriģināla un tulkota subtitru faila apvienošanu vienā divvalodu failā, jau divvalodu faila secības un stila pielāgošanu, kā arī specefektu pievienošanu vienvalodas failam. Visiem trim ir kopīgi vieni un tie paši stila parametri un viens un tas pats priekšskatījums."
    ]
   },
   {
    "h2": "Three jobs, one page :: Trīs darbi, viena lapa",
    "ps": [
     "Lapas augšdaļā ir trīs cilnes: **Merge two files**, **Adjust a bilingual file**, **Single-language file**. Jūsu izvēle nosaka, cik ievades kolonnu parādās kreisajā pusē.",
     "Apvienojot divus failus, kreisajā pusē ir divas kolonnas: \"1 Original subtitles\" un \"2 Translated subtitles\"; katra pieņem augšupielādētu failu vai tieši ielīmētu tekstu. Divvalodu faila pielāgošanai un vienvalodas faila stilizēšanai katrai ir nepieciešama tikai viena kolonna."
    ],
    "img": {
     "file": "merge-mode",
     "alt": "Trīs cilnes specefektu subtitru rīka augšdaļā un ievades apgabals kreisajā pusē",
     "cap": "Trīs cilnes augšdaļā; izvēloties \"Merge two files\", kreisajā pusē parādās oriģināla un tulkojuma kolonna"
    }
   },
   {
    "h2": "Kā abi faili tiek sapāroti",
    "ps": [
     "Pirmais elements sadaļā \"3 Merge settings\" ir pārošanas režīms: **Pair by order · use the original timeline**, **Pair by timeline · use the original timeline**, **Pair by order · use the translated timeline**.",
     "Ja abiem failiem ir vienāds ierakstu skaits tādā pašā secībā, pārošana pēc secības ir visdrošākā. Ja skaits atšķiras (viena puse apvienojusi ierakstus, otra tos sadalījusi), pārojiet pēc laika skalas un ļaujiet rīkam saskaņot pēc tuvuma. Kuru laika skalu izmantot, ir atkarīgs no tā, kurš fails ir precīzāks — parasti oriģināls.",
     "Zem tā atrodas teksta struktūra (auto-detect / two lines per entry / alternating pairs) un secība (original on top / translation on top)."
    ],
    "img": {
     "file": "merge-pair",
     "alt": "Pārošanas režīms, teksta struktūra un secības opcijas apvienošanas iestatījumos",
     "cap": "Pārošanas režīms izlemj, kura rinda iet ar kuru, un šeit tiek iestatīts arī tas, kura laika skala ir jāizmanto"
    }
   },
   {
    "h2": "Pielāgojiet stilu pa elementiem",
    "ps": [
     "Stila panelis atrodas labajā pusē. Eksportējot ASS, tiek piemērots bloks \"ASS appearance\": izkārtojums (split · separated top and bottom / stacked · two lines at the bottom), izmērs, krāsa, necaurspīdīgums, fonts, treknraksts, slīpraksts, burtu atstarpe, kontūra, kontūras krāsa, ēna/fons (none / shadow / background), dziļums, apmales krāsa, apmales necaurspīdīgums, horizontālā līdzināšana (bottom · left / bottom · centre / bottom · right) un attālums no tulkojuma (galvenās) rindas apakšas, kā arī oriģinālās (sekundārās) rindas fonts, ēna/fons un kreisā/labā mala.",
     "Eksportējot divvalodu VTT stilu, tiek piemērots bloks \"WebVTT style\": papildus sešiem sākotnējiem iestatījumiem (standard / compact / cinematic / top / accessible / portrait) varat mainīt vertikālo līniju, atbalsta punktu (bottom / top / centre), horizontālo pozīciju, platuma izmēru, līdzināšanas vērtību un visa fragmenta rindiņas augstumu, kā arī tulkojuma rindas fona krāsu, fona necaurspīdīgumu un kontūras platumu; oriģinālā rinda var mantot galveno stilu vai tikt iestatīta atsevišķi.",
     "Kad esat pabeidzis, varat saglabāt rezultātu kā iepriekšēju iestatījumu un izmantot to vēlreiz vēlāk, atlasot to sadaļā \"From saved presets\" un noklikšķinot uz \"Apply\"."
    ],
    "img": {
     "file": "merge-style",
     "alt": "ASS izskata paneļa parametri labajā pusē",
     "cap": "Izmērs, krāsa, kontūra, ēna/fons un līdzināšana ir regulējami, un rezultātu var saglabāt kā iepriekšēju iestatījumu"
    }
   },
   {
    "h2": "Pirms eksportēšanas pārbaudiet priekšskatījumu",
    "ps": [
     "\"Merge preview\" ir tabula: #, time, original, translation, style. Augšējā josla filtrē aizdomīgās rindas pēc \"has sound effects\", \"has a speaker prefix\", \"shorter than 1 second\", \"more than two lines\" un \"reading speed exceeded\" vai pēc jūsu ierakstītā atslēgvārda.",
     "Noklikšķinot uz rindas stila slotu, tiek izvērsts šī slota redaktors un uzskaitītas tikai tās rindas, kuras to izmanto; \"Clear all overrides\" atgriež katru manuālo ignorēšanu uz veidni. Zemāk esošais laika skalas pielāgošanas apgabals apstrādā globālo nobīdi (no dotā fragmenta) un proporcionālo mērogošanu.",
     "Kad tas izskatās pareizi, dodieties uz \"4 Export\": lejupielādējiet subtitru failu vai kopējiet tā saturu."
    ],
    "img": {
     "file": "merge-preview",
     "alt": "Apvienošanas priekšskatījuma tabula un tās filtru josla",
     "cap": "Priekšskatījums ir eksports; filtrējiet aizdomīgās rindas pēc veida vai izvērsiet vienu stila slotu"
    }
   },
   {
    "h2": "Kas paliek neskarts",
    "ps": [
     "Stilizēšana maina tikai izskatu, nekad dialogu. Oriģināla un tulkojuma teksts apvienošanas laikā netiek mainīts ne par vienu rakstzīmi; ja vien jūs to apzināti nemaināt pielāgošanas apgabalā zem priekšskatījuma, laika skala nāk no faila, kuru izvēlējāties.",
     "Eksportējot SRT vai \"VTT without styling\", failā netiek ierakstīta nekāda stila informācija — lapa jums norāda, ka VTT nav STYLE bloka un atskaņotājs izmantos savu noklusējuma izskatu. Ja vēlaties stilu, izvēlieties divvalodu VTT stilu vai ASS."
    ]
   },
   {
    "h2": "Common questions :: Bieži uzdotie jautājumi",
    "ps": [
     "**Ko darīt, ja abiem failiem ir atšķirīgs ierakstu skaits?** Izmantojiet \"Pair by timeline\", un rīks veic saskaņošanu pēc tuvuma; ieraksti, kurus tas nevar saskaņot, netiek izdomāti.",
     "**Ko darīt, ja atskaņotājs ignorē stilu eksportētā ASS?** Stili tiek glabāti failā, bet atskaņotāju atbalsts ASS atšķiras. Ja jums nepieciešams portatīvāks izskats, eksportējiet divvalodu VTT stilu.",
     "**Kā atgriezties pie sākotnējās veidnes pēc tās sabojāšanas?** \"Restore default parameters\" ASS blokā un \"Restore template defaults\" VTT blokā atiestata katrs savu sadaļu.",
     "**Kas ir septiņas rindas paraugā?** Tas ir iebūvēts piemērs, kas ir tur tikai tāpēc, lai jūs redzētu, kā izskatās apvienošana; paraugu nevar eksportēt. Augšupielādējiet savus subtitrus un noklikšķiniet uz apvienošanas priekšskatījuma, un tie tiks automātiski aizvietoti."
    ]
   },
   {
    "h2": "Privacy :: Konfidencialitāte",
    "ps": [
     "Subtitri tiek apstrādāti pilnībā pārlūkprogrammā: nekas netiek augšupielādēts un nekas neiet caur serveri. Aizveriet pārlūkprogrammu, un viss no šīs sesijas ir pagaisis."
    ]
   },
   {
    "h2": "Saistītie rīki un ceļveži",
    "ps": [
     "Lai sadalītu divvalodu failu atpakaļ divos celiņos, izmantojiet [[Bilingual split|/bilingual.html]]; lai ietu pretējā virzienā un pārvērstu vienu valodu divvalodu failā, skatiet [[Two ways to make bilingual subtitles|/guides/make-bilingual-subtitles.html]]; palaidiet rezultātu caur [[Subtitle QC|/qc.html]]; veselai sezonai uzreiz izmantojiet [[Batch conversion|/batch.html]]."
    ]
   }
  ]
 },
 "qc": {
  "seo": {
   "title": "Kā lietot subtitru kvalitātes kontroli – Laika skalas un izkārtojuma pārbaude – AI-SRTSub",
   "desc": "Subtitru kvalitātes kontrole: 17 noteikumi noķer pārklāšanās, rindas platumu, lasīšanas ātrumu un pieturzīmes, sliekšņi katrai 27 valodām. Puse ir labojumi ar vienu klikšķi; lejupielādējiet pārskatu.",
   "h1": "Kā lietot subtitru kvalitātes kontroli",
   "intro": "Pirms nododat subtitrus, izlaidiet tos caur kvalitātes kontroles lapu laika un izkārtojuma pārbaudei: kas tiek pārbaudīts, kā lasīt pārskatu un kuras problēmas var novērst ar vienu klikšķi — tas viss ir apskatīts šeit.",
   "ctaText": "Atvērt subtitru kvalitātes kontroli"
  },
  "body": [
   {
    "h2": "Kam paredzēts šis rīks",
    "ps": [
     "Subtitri, kas ar neapbruņotu aci izskatās labi, pēc piegādes bieži izrādās ar pārklājošāmies laika skalām, pārāk platām rindām vai pārāk lielu lasīšanas ātrumu. Kvalitātes kontroles lapa uzskaita šīs problēmas pa vienai:"
    ]
   },
   {
    "h2": "Vispirms izvēlieties valodas noteikumus",
    "ps": [
     "Sadaļā \"Check by which language’s rules\" jūs iestatāt piecus sliekšņus: **maksimālais vienas rindas platums** (42 pusplatuma vienības ainavskatam pēc noklusējuma, 36 kvadrātam, 28 portretam), **lasīšanas ātruma limits** (18 platuma vienības sekundē ķīniešu, japāņu un korejiešu valodai, 20 citām valodām), **minimālais ilgums 833 milisekundēs**, **maksimālais ilgums 7000 milisekundēs** un **ne vairāk kā 2 rindas**. Iestatiet subtitru valodu uz automātisko atpazīšanu vai izvēlieties vienu no 27 manuāli; ekrāna orientācija maina tikai rindas platuma līmeni — lasīšanas ātrums, ilgums un rindiņu skaits paliek nemainīgi. Pusplatuma vienības ir kopīgais mērs: viens handzi skaitās kā 2, viens latīņu burts kā 1 — rindas platums 42 ir vienāds ar 21 handzi vai 42 burtiem."
    ],
    "img": {
     "file": "qc-rules",
     "alt": "Kvalitātes kontroles iestatījumi: piecas sliekšņa ievades kastes, kā arī subtitru valodas un ekrāna orientācijas nolaižamās izvēlnes",
     "cap": "Pieci sliekšņi + valoda + orientācija; noklusējuma vērtības atbilst ierastajai nozares praksei"
    }
   },
   {
    "h2": "Reading the Report :: Pārskata lasīšana",
    "ps": [
     "17 noteikumi ziņo par atradumiem trijos līmeņos: **kļūdas** (izlocīts teksts, laika zīmoga formāts, beigas agrāk par sākumu, salauzta numerācija), **brīdinājumi** (tukši ieraksti, pārklāšanās, pārāk īsi vai pārāk gari ilgumi, lasīšanas ātrums virs limita, pārāk platas rindas, vairāk nekā divas rindas) un **padomi** (rindiņu pārtraukuma pozīcija, vadošās vai sekojošās atstarpes, trūkstošās atstarpes, pieturzīmju normas un citi). Katrs atradums satur ieraksta numuru un detaļu \"measured X, threshold Y\", un sarakstu var filtrēt pēc līmeņa. Divvalodu ieraksti saņem izņēmumus: abas formas tiek automātiski atpazītas, pārklāšanās pārbaudes atbrīvo visu pāri, un lasīšanas ātrums skaita tikai mērķa valodā uzrakstīto rindu."
    ],
    "img": {
     "file": "qc-report",
     "alt": "Kvalitātes kontroles pārskata apgabals: atradumi, kas sagrupēti pēc kļūdas, brīdinājuma un padoma, katrs ar ieraksta numuru un izmērīto vērtību",
     "cap": "Trīs līmeņu pārskats: katrs atradums satur savu ieraksta numuru un izmērītās/sliekšņa vērtības"
    }
   },
   {
    "h2": "Fixing and Exporting :: Labošana un eksportēšana",
    "ps": [
     "Kartīte \"Fix & export\" uzskaita tikai **automātiski labojamos** vienumus: atkārtotu aplaušanu, tukšo ierakstu noņemšanu, trūkstošo atstarpju pievienošanu, pieturzīmju nomaiņu atbilstoši valodas normām, pārnumurēšanu — viss, kas atstāj laiku neskartu, pēc noklusējuma ir atzīmēts; **vienumi, kas maina laiku** (sākuma un beigu apmaiņa, pārklāšanās nobīde, ilguma apgriešana vai izstiepšana), pēc noklusējuma ir neatzīmēti — atzīmējiet tos, kad pats esat pārbaudījis ietekmi. Noklikšķiniet uz \"Apply fixes\", un automātiski tiek palaista jauna pārbaude; skaitītājs skaita tikai to, kas tika patiesi izlabots — rindas, kuras nevarēja aplauzt atkārtoti, netiek palielinātas skaitļos. **Lasīšanas ātrumam virs limita nav automātiskas labošanas**: mašīna nevar zināt, kuru vārdu nogriezt, tāpēc tulkojums ir jāsaīsina ar roku vai jāpielāgo laiks. Pēc labošanas eksportējiet SRT vai VTT vai noklikšķiniet uz \"Download report\", lai saglabātu vienkārša teksta `.qc.txt` pārskatu."
    ],
    "img": {
     "file": "qc-fix",
     "alt": "Labošanas kartīte: izvēles rūtiņas automātiski labojamiem vienumiem un poga Apply fixes",
     "cap": "Sarakstā iekļauti tikai automātiski labojami vienumi; laiku mainošie labojumi pēc noklusējuma ir neatzīmēti"
    }
   },
   {
    "h2": "FAQ :: Bieži uzdotie jautājumi",
    "ps": [
     "**Kāpēc manu ASS nevar eksportēt?** Kvalitātes kontrole eksportē tikai SRT un VTT; ASS iet iekšā, bet nenāk ārā. Lai saglabātu ASS efektus, vispirms izdomājiet to vietnē [[Format Converter|/convert.html]].",
     "**Ko nozīmē lasīšanas ātrums 18?** Ķīniešu, japāņu un korejiešu valodai ierobežojums ir 9 pilnplatuma rakstzīmes sekundē (18 pusplatuma vienības); citas valodas saņem 20 pusplatuma vienības sekundē. Tie ir parastie komforta līmeņi, un ievades kaste ļauj tos mainīt.",
     "**Mana faila kodējums ir bojāts — vai to joprojām var pārbaudīt?** Kvalitātes kontrole nolasa tikai UTF-8; vispirms salabojiet kodējumu sagrozītā teksta labošanas lapā.",
     "**Vai tas skars manu laika skalu?** Kamēr jūs atstājat grupu \"changes timing\" neatzīmētu, nē; pat ja tā ir atzīmēta, katras izmaiņas tiek skaidri norādītas pirms labošanas piemērošanas."
    ]
   },
   {
    "h2": "Related Guides :: Saistītie ceļveži",
    "ps": [
     "Subtitri mirgo garām pārāk ātri, lai tos izlasītu — skatiet īpašo ceļvedi [[Subtitles Too Fast to Read|/guides/subtitle-too-fast.html]]. Kas jāpārbauda pirms piegādes — pārbaudes saraksts atrodas vietnē [[What to Check Before Delivery|/guides/subtitle-quality-check.html]]. Laika skala, kas novirzās no sinhronizācijas, ir cita veida problēma — skatiet [[Subtitles Drifting Out of Sync|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "remove-subtitle-ads": {
  "seo": {
   "title": "Noņemt reklāmas un ūdenszīmes no subtitriem – AI-SRTSub",
   "desc": "Notīriet ūdenszīmes un reklāmas no subtitriem: vietrāži URL, fanzubu titri un encoded by tagi tiek notīrīti ar vienu klikšķi, kā arī dublētie un tukšie ieraksti. – AI-SRTSub",
   "h1": "Noņemt reklāmas un ūdenszīmes no subtitriem",
   "intro": "Vietrāži URL, titri un reklāmas ieraksti, kas paslēpti jūsu subtitros, tiek notīrīti vienā piegājienā ar tīrītāja ūdenszīmju noteikumiem — un jebkuru kļūdainu dzēšanu var atcelt ierakstu pa ierakstam.",
   "ctaText": "Notīrīt subtitru ūdenszīmes"
  },
  "body": [
   {
    "h2": "Kas ir šīs ūdenszīmes",
    "ps": [
     "Tiešsaistē lejupielādētiem subtitriem sākumā vai beigās (dažreiz arī vidū) bieži vien ir papildu ieraksti: vietrāži URL, e-pasta adreses, fanzubu grupu nosaukumi, `encoded by` / `translated by` titri, vietņu nosaukumi, piemēram, opensubtitles, un tādas rindas kā \"follow our WeChat account\" vai \"for study purposes only\". Tie ir parasti subtitru ieraksti — ar laika skalu, kas aizņem rindu —, tāpēc atskaņotāji tos nevar noņemt; tie ir jāatpazīst pēc satura."
    ]
   },
   {
    "h2": "Where to do it :: Kur to izdarīt",
    "ps": [
     "Atveriet [[Subtitle Cleaner|/clean.html]] un nemetiet iekšā savus subtitrus; grupai \"Watermarks & junk entries\" jau pēc noklusējuma ir atzīmēti \"Remove watermarks and ads\", \"Remove duplicate entries\" un \"Remove empty entries\", un tīrīšana sākas automātiski. Atpazīšana darbojas divos līmeņos: **stingrie signāli**, piemēram, vietrāži URL, e-pasti, fanzubu grupas un vietņu nosaukumi, dzēš visu ierakstu pēc sakritības jebkurā garumā; **vieglie signāli**, piemēram, @rokturi, \"encoded\" vai \"proofread\" titri, tiek vērtēti tikai īsos ierakstos, kas nepārsniedz 40 rakstzīmes, lai izvairītos no garu dialogu apgriešanas. Divvalodu ierakstiem vispirms tiek notīrītas ūdenszīmju rindas rinda pa rindai, vienlaikus saglabājot dialogu rindas; ieraksts tiek dzēsts pilnībā tikai tad, ja pēc tīrīšanas paliek ūdenszīmju pēdas."
    ],
    "img": {
     "file": "clean-opts",
     "alt": "Tīrīšanas opciju ekrāns: grupas \"watermarks and junk entries\" trīs izvēles rūtiņas",
     "cap": "Grupa \"Watermarks & junk entries\" ir ieslēgta pēc noklusējuma — nav nepieciešama manuāla iestatīšana"
    }
   },
   {
    "h2": "Review and export :: Pārskatīt un eksportēt",
    "ps": [
     "Izmaiņu sarakstā katrs dzēstais ieraksts satur \"watermark & ad\" tagu — pārskatiet to, lai apstiprinātu, ka nekas nav noņemts kļūdas dēļ; ja kaut kas izskatās nepareizi, noklikšķiniet uz \"Restore\", lai to atliktu atpakaļ. Kad esat apstiprinājis, lejupielādējiet: faila nosaukums automātiski saņem `.clean` marķieri. Tīrīšana darbojas lokāli jūsu pārlūkprogrammā; jūsu subtitri nekad netiek nekur sūtīti."
    ]
   }
  ]
 },
 "repair": {
  "seo": {
   "title": "Kā salabot mojibake subtitrus – Atpazīt kodējumu – AI-SRTSub",
   "desc": "Ceļvedis: atpazīstiet sākotnējo kodējumu (GBK / Big5 / Shift_JIS / EUC-KR), sakārtojiet labojumus pēc tam, kas visvairāk izskatās pēc valodas, pēc tam saglabājiet UTF-8 ar BOM vai GBK. Laika un indeksa numuri nekad nemainās.",
   "h1": "Kā salabot mojibake subtitrus",
   "intro": "Subtitru fails, kas pilns ar greiziem simboliem, reti ir bojāts — tas vienkārši tika nolasīts ar nepareizu kodējumu. Labošanas rīks atpazīst sākotnējo kodējumu un atliek atpakaļ pareizos simbolus, atstājot indeksa numurus un laikus neskartus.",
   "ctaText": "Atvērt mojibake labošanas rīku"
  },
  "body": [
   {
    "h2": "What this tool does :: Ko šis rīks dara",
    "ps": [
     "Tie paši baiti, kas nolasīti kā UTF-8 un nolasīti kā GBK, rada divas pilnīgi dažādas simbolu kopas — fails nav bojāts, tas tika atšifrēts ar nepareizu kodējumu. Lūk, ko dara labošanas rīks:"
    ]
   },
   {
    "h2": "Augšupielādējiet failu, nevis līmējiet to",
    "ps": [
     "Abi ievades punkti var novērst dažādu bojājumu apjomu, tāpēc **augšupielādējiet failu, ja varat**. Failā oriģinālie baiti joprojām ir tur: rīks izmēģina vienu kodējumu pēc otra, un, kad tas atpazīst GBK, tas atšifrē kā GBK — nekas nav jāuzmin. Teksts, kas pienāk ielīmējot, vairs nav neapstrādāti baiti. Līdz brīdim, kad pārlūkprogramma nodod rindu, kļūda jau ir notikusi, tāpēc rīks var strādāt tikai atpakaļceļā un ņemt to, ko var dabūt.",
     "Ja ielīmētajā tekstā jau ir aizstāšanas simbols (tā ietvarā esošā jautājuma zīme `�`), oriģinālie baiti sen ir pazuduši un nekas tos nespēj atgriezt. Lapa to tieši pasaka: dodieties atpakaļ uz augšu un izmantojiet \"Choose file\", lai augšupielādētu oriģinālu."
    ],
    "img": {
     "file": "repair-up",
     "alt": "Labošanas lapas augšupielādes apgabals: nomešanas zona un ielīmēšanas lodziņš, virs kura redzams atpazītais kodējums",
     "cap": "Velciet failu iekšā vai meklējiet to; ielīmēšanas lodziņš atrodas zemāk un var salabot daudz mazāk"
    }
   },
   {
    "h2": "Ko jums saka diagnostika",
    "ps": [
     "Tikko jūs augšupielādējat, diagnostikas kartīte sniedz spriedumu. **No mojibake found**: saturs lasās labi tāds, kāds tas ir; ja jūsu atskaņotājs joprojām rāda greizus simbolus, atskaņotājs izmantoja nepareizu kodējumu — dodieties uz leju uz \"Save as\", izvēlieties citu un nododiet šo failu tam. Kad tas **looks like mojibake**, kartīte uzskaita, kādu pēdu tā ir atradusi:"
    ],
    "img": {
     "file": "repair-diag",
     "alt": "Diagnostikas kartīte: spriedums plus katra mojibake pēda, kas uzskaitīta rinda pa rindai",
     "cap": "Diagnostika uzskaita pēdas pēc veida, nevis vienkārši pasaka \"tas ir mojibake\""
    }
   },
   {
    "h2": "Kā kandidāti tiek sakārtoti un kā izvēlēties",
    "ps": [
     "Sadaļā \"Ways to fix this\" kandidāti ir uzskaitīti secībā **most-like-real-language-first**, līdz 12 no tiem, katrs apzīmēts ar to kodējumu pāri, no kura un uz kuru tas tika nolasīts. Noklikšķiniet uz viena, lai redzētu, kā tas izskatās, izvēlieties to, pēc tam ritiniet uz leju, lai saglabātu. Neesat apmierināts? Izmantojiet \"Keep as is\", lai atgrieztos pie oriģināla.",
     "Secība nāk no rādītāja: kopējo rakstzīmju īpatsvars, akcentu virknes, simbolu virknes, neskaidru rakstzīmju sienas, kas visas ir ņemtas vērā. **Ja neviens rādītājs nav nepārprotami labāks, nekas netiek ieteikts** — tas neuzspiedīs jums pusplausiblu kandidātu tikai tāpēc, lai tāds būtu. Teksts, kas tika sakropļots divas reizi (reizi saglabāts nepareizi, tad reizi salabots nepareizi), saņem vienu papildu atpakaļrisināšanas kārtu labākajiem kandidātiem, tāpēc visu divu slāņu robežās joprojām var izglābt."
    ],
    "img": {
     "file": "repair-fix",
     "alt": "Kandidātu labošanas saraksts, sakārtots pēc tā, cik tas līdzinās īstai valodai, katrs apzīmēts ar savu kodējumu pāri",
     "cap": "Kandidāti, sakārtoti pēc \"most like real language\", katrs parāda iesaistītos kodējumus"
    }
   },
   {
    "h2": "Pareiza saglabāšana ir pēdējais solis",
    "ps": [
     "Salabots rezultāts joprojām ir jāsaglabā pareizi. Ja atskaņotājs nevar atpazīt UTF-8, saglabāšana kā **UTF-8 ar BOM** (Windows atskaņotāji paļaujas uz BOM) vai kā **GBK** parasti to atrisina. Varat saglabāt kā UTF-8, UTF-8 (ar BOM), GBK, Big5, Shift_JIS vai EUC-KR; ja kaut kas neder, jums tiek prasīts izvēlēties citu (GBK nevar saturēt korejiešu valodu). Lejupielādētajiem failiem nosaukumam tiek pievienots `-fixed`.",
     "Kad atpazītais kodējums nav UTF-8, \"Save as\" jums jau ir iepriekš iestatīts uz UTF-8 ar BOM. Kad jūs pats pieskaraties nolaižamajai izvēlnei, tā pārstāj jūs apšaubīt."
    ],
    "img": {
     "file": "repair-out",
     "alt": "Rezultāta apgabals: teksta lodziņš ar saglabāšanas nolaižamo izvēlni un lejupielādes pogu",
     "cap": "Izvēlieties kodējumu, pēc tam lejupielādējiet — faila nosaukumam tiek pievienots -fixed"
    }
   },
   {
    "h2": "Kas nekad netiek aizskarts",
    "ps": [
     "Tiek aizstāti tikai nepareizi nolasītie simboli. Indeksa numuri, laiki un ASS stila rindas netiek nekādā veidā mainīti."
    ]
   },
   {
    "h2": "FAQ :: Bieži uzdotie jautājumi",
    "ps": [
     "**Es augšupielādēju failu, tad kāpēc man tas joprojām ir jāsaglabā no jauna?** Pats fails parasti ir kārtībā; tas, kas ir bojāts, ir atskaņotājs, kas to nolasa ar nepareizu kodējumu. Tādā gadījumā tekstā nav jāmaina neviena rakstzīme — vienkārši saglabājiet kopiju kā UTF-8 ar BOM vai GBK un nododiet to atskaņotājam.",
     "**Kāpēc ielīmēto tekstu nevar labot?** Kad ielīmētajā saturā parādās aizstāšanas simbols, oriģinālie baiti ir pagaisuši un nav no kā spriest atpakaļceļā. Dodieties atpakaļ uz augšu un izmantojiet \"Choose file\", lai augšupielādētu oriģinālu.",
     "**Vēlamais kandidāts nav norādīts sarakstā?** Nekas netiek ieteikts, ja vien tas neiegūst ievērojami labāku rādītāju nekā tas, kas jums jau ir. Mēģiniet pārslēgt atpazīto kodējumu uz citu un ļaujiet tam pārrindot.",
     "**Cik failus uzreiz?** Pa vienam. Lejupielādējiet labojumu, pēc tam padodiet nākamo failu."
    ]
   },
   {
    "h2": "Privacy :: Konfidencialitāte",
    "ps": [
     "Atpazīšana un labošana darbojas pilnībā jūsu pārlūkprogrammā. Nekāds subtitru saturs nekad netiek sūtīts uz serveri."
    ]
   },
   {
    "h2": "Saistītie rīki un ceļveži",
    "ps": [
     "No kurienes rodas mojibake un kāpēc tas beigās tā izskatās — skatiet [[Where subtitle mojibake comes from|/guides/subtitle-garbled-characters.html]]; kodējums ir kārtībā, bet saturs ir netīrs — izmantojiet [[Subtitle cleanup|/clean.html]]; lai pārbaudītu laiku un lasīšanas ātrumu — [[Subtitle QC|/qc.html]]."
    ]
   }
  ]
 },
 "sbv-to-srt": {
  "seo": {
   "title": "SBV uz SRT pārveidotājs – Konvertēt YouTube subtitrus – AI-SRTSub",
   "desc": "Konvertējiet no YouTube lejupielādētos SBV subtitrus par SRT priekš CapCut, Premiere un atskaņotājiem. Laika vērtības paliek neskartas — mainās tikai izkārtojums. Darbojas jūsu pārlūkprogrammā.",
   "h1": "SBV to SRT :: SBV uz SRT",
   "intro": "Pārvērtiet YouTube SBV subtitrus par SRT: nometiet failu, izvēlieties SRT, lejupielādējiet. Laika vērtības ir neskartas — mainās tikai struktūra.",
   "ctaText": "Convert SBV → SRT :: Konvertēt SBV → SRT"
  },
  "body": [
   {
    "h2": "Kas ir SBV un no kurienes tas nāk",
    "ps": [
     "SBV ir **YouTube subtitru formāts**: lejupielādējot \"subtitru failus\" no YouTube, jūs bieži saņemat .sbv. Tās struktūra ir vienkāršāka nekā SRT — sākuma un beigu laiki atrodas uz **vienas rindas**, atdalīti ar komatiem, teksts seko tieši apakšā, un nav nekādu fragmentu numuru."
    ]
   },
   {
    "h2": "Kāpēc atskaņotāji to noraida",
    "ps": [
     "Ārpus paša YouTube lielākā daļa rediģēšanas programmatūras un atskaņotājs neatbalsta SBV. Tam trūkst numerācijas bloka un tā laika līnija tiek rakstīta citādi nekā SRT, tāpēc paplašinājuma pārdēvēšana neko nedara — struktūra ir jāpārbūvē patiesībā."
    ],
    "img": {
     "file": "convert-upload-sbv",
     "alt": "Augšupielādes apgabals: SBV fails ielādēts, atpazīts kā SBV",
     "cap": "SBV tiek atpazīts tāds, kāds tas ir, nav nepieciešams pārdēvēt paplašinājumu"
    }
   },
   {
    "h2": "How to convert :: Kā konvertēt",
    "ps": [
     "Atveriet [[converter|/convert.html]], iemetiet SBV, izvēlieties **SRT - SubRip** kā izvadi, pēc tam konvertējiet un lejupielādējiet. Fragmentu numuri tiek piešķirti no jauna, un sākotnējie rindiņu pārtraukumi fragmenta iekšpusē tiek apvienoti vienā rindā (SRT atļauj vairāku līniju fragmentus; SBV šeit tiek eksportēts vienā rindā)."
    ]
   }
  ]
 },
 "shift": {
  "seo": {
   "title": "Kā nobīdīt subtitru laiku (nobīde, mērogs, divi atbalsta punkti) – AI-SRTSub",
   "desc": "Ilustrēts laika redaktora ceļvedis: ielādējiet subtitrus, pievienojiet pielāgošanas soļus, divu atbalsta punktu korekciju, pielāgojumus katram fragmentam un eksportējiet.",
   "h1": "Laika redaktors: soli pa solim ceļvedis",
   "intro": "Šis ceļvedis izstaigā rīku no augšas līdz apakšai: ielādējiet subtitrus, pievienojiet pielāgošanas soļus, palaidiet pārbaudes, precizējiet katru fragmentu un eksportējiet.",
   "ctaText": "Atvērt laika redaktoru"
  },
  "body": [
   {
    "h2": "Load your subtitles :: Ielādējiet savus subtitrus",
    "ps": [
     "Velciet failu pārtrauktajā lodziņā vai noklikšķiniet, lai izvēlētos; varat arī **ielīmēt saturu** tieši teksta lodziņā. Formāts tiek atpazīts gan no paplašinājuma, gan satura, un rezultāts parādās formāta mikroshēmā. Atbalstītās ievades: srt, vtt, ass (t.sk. ssa), sbv, lrc un txt."
    ],
    "img": {
     "file": "shift-upload",
     "alt": "Augšupielādes apgabals: parauga subtitri ielādēti, atpazīti kā SRT",
     "cap": "Faila nosaukums un atpazītais formāts parādās zem nomešanas zonas; teksta lodziņš paliek rediģējams."
    }
   },
   {
    "h2": "Add adjustment steps :: Pievienot pielāgošanas soļus",
    "ps": [
     "Pielāgojumi veido **soļu konveijeru**: katrs solis veic vienu darbu un pieņem vienu skaitli, kura mērvienība redzama lodziņā. Soļi tiek piemēroti no augšas uz leju, un jebkura soļa maiņa **pārrēķina visu no sākotnējiem subtitriem** — tāpēc varat jebkurā laikā atgriezties un mainīt skaitli, neradot haosu."
    ]
   },
   {
    "h2": "Divu atbalsta punktu korekcija",
    "ps": [
     "Ja jūs nezināt ne nobīdi sekundēs, ne attiecību, izmantojiet divus atbalsta punktus: kad tie pievienoti, **divi \"current\" lauki tiek aizpildīti automātiski** no jūsu faila pirmā un pēdējā fragmenta. Jūs aizpildāt tikai \"target\" laukus — laikus, kad šiem fragmentiem patiesībā vajadzētu parādīties. Viss pa vidu tiek atkārtoti sadalīts proporcionāli."
    ],
    "img": {
     "file": "shift-step-two",
     "alt": "Divu atbalsta punktu korekcija: pašreizējie laiki aizpildīti automātiski, mērķa laiki ievadāmi",
     "cap": "Pašreizējie lauki nāk no jūsu faila; mērķa laiki ir pareizie laiki, ko redzat videoklipā."
    }
   },
   {
    "h2": "Laika skalas pārbaude un pielāgojumi katram fragmentam",
    "ps": [
     "Pēc soļu izpildes izlasiet **laika skalas pārbaudi**: fragmenti, kas ir par īsu, par garu, par blīvu lasīšanai, rindas, kas ir par platām, vai pārklājošies fragmenti — visi tiek uzskaitīti. Pārbaude **tikai atzīmē problēmas un nekad neko nemaina** pati par sevi. Četri noklusējuma mēri ir 0.833 s minimālais ilgums, 7 s maksimālais, 9 rakstzīmes sekundē lasīšanas ātrums un 21 rakstzīmes rindā — visi ir rediģējami lapā. Zem tā pielāgojumi katram fragmentam ļauj apvienot divus blakus esošus fragmentus, sadalīt vienu vai tieši rediģēt tā sākumu un beigas; katru labojumu var atcelt."
    ]
   },
   {
    "h2": "Export the result :: Eksportēt rezultātu",
    "ps": [
     "Rezultāta panelis parāda oriģinālos un pielāgotos laikus **blakus viens otram** vienkāršai pārbaudei uz vietas. Izvades formāts pēc noklusējuma ir ievades formāts, bet pirms lejupielādes varat pārslēgties uz jebkuru no srt, vtt, ass, sbv, lrc vai txt."
    ],
    "img": {
     "file": "shift-result",
     "alt": "Rezultāta panelis: pirms un pēc laiki blakus, ar lejupielādes un kopēšanas pogām",
     "cap": "Oriģinālie laiki kreisajā pusē, pielāgotie labajā pusē; lejupielādējiet, kad pārbaude uz vietas izskatās pareizi."
    }
   }
  ]
 },
 "shift-subtitle-timing": {
  "seo": {
   "title": "Kā pārvietot visus subtitrus agrāk vai vēlāk – AI-SRTSub",
   "desc": "Katrs fragments kavējas par vienu un to pašu summu: izmantojiet laika redaktora nobīdes soli — ievadiet vienu negatīvu vai pozitīvu skaitli, un visi fragmenti pārvietojas kopā.",
   "h1": "Pārvietot visu subtitru failu agrāk vai vēlāk",
   "intro": "Audio sākas, subtitrs parādās novēloti — un katrs atsevišķs fragments kavējas par vienu un to pašu summu. Tā ir vienota nobīde: viens skaitlis to atrisina.",
   "ctaText": "Atvērt laika redaktoru"
  },
  "body": [
   {
    "h2": "Vispirms apstipriniet, ka katrs fragments kavējas par vienu un to pašu summu",
    "ps": [
     "Pārbaudiet vienu fragmentu tuvu sākumam, vienu vidū un vienu beigās. Ja visi trīs kavējas par aptuveni vienādu summu, tā ir **vienota nobīde**, un viens nobīdes solis to atrisina. Ja sākums ir pareizs un novirze pieaug pret beigām, tā ir cita problēma — skatiet [[subtitles getting more and more out of sync|/guides/subtitles-out-of-sync.html]]."
    ]
   },
   {
    "h2": "Ko ievadīt: negatīvs, lai virzītu uz priekšu, pozitīvs, lai aizkavētu",
    "ps": [
     "Laika redaktorā pievienojiet soli **Shift all** un ievadiet nobīdi vērtības lodziņā: novēloti subtitri saņem negatīvu skaitli, lai tos pavilktu agrāk; pārāk agri skrejoši saņem pozitīvu skaitli, lai tos pastumtu vēlāk. Ja subtitri kavējas par 1.5 sekundēm, ievadiet **-1.5** — mērvienība ir sekundes."
    ],
    "img": {
     "file": "shift-step-shift",
     "alt": "Solis Shift all ar ievadītām -1.5 sekundēm",
     "cap": "Negatīvs skaitlis pavelk visu failu agrāk; mērvienība ir ierakstīta lodziņā sekundēs."
    }
   },
   {
    "h2": "Palaidiet to un pārbaudiet pirmo fragmentu",
    "ps": [
     "Pēc piemērošanas rezultāta panelis uzskaita katra fragmenta oriģinālos un jaunos laikus **blakus viens otram**. Vispirms pārbaudiet pirmo fragmentu: vai jaunais sākuma laiks iekrīt kadrā, kurā tiek izrunāta rinda? Pēc tam pārbaudiet vienu vidū. Katrs fragments pārvietojas par vienu un to pašu summu un saglabā savu ilgumu."
    ]
   },
   {
    "h2": "Export :: Eksportēt",
    "ps": [
     "Kad pārbaude izskatās pareizi, lejupielādējiet tieši. Izvades formāts pēc noklusējuma ir ievades formāts, un to var mainīt uz citu. Izmaiņas skar tikai laikus — nevis nevienu teksta rakstzīmi."
    ]
   }
  ]
 },
 "simplified-traditional-chinese": {
  "seo": {
   "title": "Tā nav rakstzīmju apmaiņa – Viens pret daudziem un reģionālie vārdi – AI-SRTSub",
   "desc": "Trīs lietas padara šo sarežģītu: viens-pret-daudziem kartēšana, kas atrisināta pēc vārda, dažādi Taivānas un Honkongas vārdu krājumi un tikai dialoga konvertēšana. Izdariet visas trīs lietas pareizi, un cilvēka atkārtota apstrāde neSekos.",
   "h1": "Vienkāršotā pret tradicionālo nav rakstzīmju apmaiņa",
   "intro": "Kura tradicionālā rakstzīme aizstāj vienkāršoto, ir atkarīga no tai blakus esošās rakstzīmes. Tāpēc šo konvertēšanu nevar veikt, akli apmainot vienu rakstzīmi vienlaikus.",
   "ctaText": "Open the converter :: Atvērt pārveidotāju"
  },
  "body": [
   {
    "h2": "Pirmkārt: viena vienkāršotā forma, vairākas tradicionālās",
    "ps": [
     "Vienkāršošana apvienoja vairākas tradicionālās rakstzīmes vienā vienkāršotajā formā. Ejot otrā virzienā, viena vienkāršotā rakstzīme atbilst vairākām tradicionālajām, un izvēle starp tām ir atkarīga no tā, ar ko tā ir sapārota:",
     "Apmainot rakstzīmi pa rakstzīmei, tās visas saplūst vienā un katra instance tiek padarīta nepareiza. Atrisināšana **pēc vārda** ir tas, kas tās atdala — tabulas nāk no OpenCC, saskaņojot frāzes pirms atsevišķām rakstzīmēm. Piemēram:"
    ]
   },
   {
    "h2": "Otrkārt: Taivāna un Honkonga nav viena un tā pati lieta",
    "ps": [
     "Pēc konvertēšanas uz tradicionālo ir vēl viens slānis: tas pats vārds Taivānā un Honkongā tiek rakstīts atšķirīgi. Vārds \"programmatūra\" Taivānā ir viena lieta, bet Honkongā cita, un Taivāna izmanto savu vārdu \"informācijai\".",
     "Tāpēc ir atsevišķi virzieni. Taivānas tradicionālā pat sadalās \"change wording\" un \"glyphs only\" — glyphs only saglabā jūsu esošo vārdu krājumu, savukārt change wording apmaina arī reģionālos terminus. Honkonga saņem savu virzienu."
    ],
    "img": {
     "file": "hanconv-dir",
     "alt": "Pārvērst kartītē: mērķa nolaižamā izvēlne, kas rāda \"Simplified → Taiwanese traditional (change wording)\"",
     "cap": "Taivāna piedāvā vārdu krājuma izmaiņas vai tikai glifus; Honkongai ir savs virziens"
    }
   },
   {
    "h2": "Treškārt: jāaizskar tikai dialogs",
    "ps": [
     "Subtitru fails nav tikai dialogs. Tur ir arī indeksa numuri, laiki un ASS stila rindas, un ne viena vienīgā rakstzīme no tiem nedrīkst tikt konvertēta — īpaši ASS stila rindas, jo tās satur angļu direktīvu nosaukumus, kas salūzt brīdī, kad ar tām rīkojas kā ar dialogu.",
     "Tātad konvertēšana notiek pēc parsēšanas pēc formāta: SRT, VTT, ASS un TXT katrs identificē, kura daļa ir dialogs, un tiek konvertētas tikai tajā esošās rakstzīmes. Laiki un stili paliek neskarti, bez nepieciešamības pārveidot formatējumu."
    ],
    "img": {
     "file": "hanconv-out",
     "alt": "Rezultāta apgabals: konvertētie subtitri un statistikas josla, kas rāda mainīto rindu skaitu",
     "cap": "Statistikas josla parāda, cik rindas ir mainījušās; formatējums tiek saglabāts tāds, kāds tas ir"
    }
   },
   {
    "h2": "Atgriešanās pie vienkāršotās: uzmanieties",
    "ps": [
     "Konvertējot tradicionālo uz vienkāršoto, jums ir arī jāpasaka, **no kuras tradicionālās variācijas jūs nākat**: vispārējā, Taivānas un Honkongas ir trīs dažādi ceļi, jo reģionālais vārdu krājums ir jāatjauno uz vispārējo vārdu pirms to var konvertēt. Izvēlieties nepareizo virzienu, un reģionālais vārdu krājums saglabājas vienkāršotajā izvadē.",
     "Deviņu virzienu apakšējā grupa ir tā, kas konvertē atpakaļ: traditional → simplified, Taiwanese → simplified, Hong Kong → simplified."
    ]
   },
   {
    "h2": "Saistītie rīki un ceļveži",
    "ps": [
     "Pilns ceļvedis — [[How to convert simplified and traditional subtitles|/guides/hanconv.html]]; ja viss, kas jums nepieciešams, ir vienkāršotā uz tradicionālo — [[Convert simplified subtitles to traditional|/guides/srt-simplified-to-traditional.html]]; lai tulkotu citā valodā — [[Subtitle translation|/translate.html]]."
    ]
   }
  ]
 },
 "split": {
  "seo": {
   "title": "Subtitru sadalīšana un apvienošana – Apgriezt pēc bloka, virknēt secībā – AI-SRTSub",
   "desc": "Sagriezt vienu failu segmentos pēc ilguma vai elementu skaita, katru sākt no nulles vai virknēt vairākus failus secībā, vai mijas secībā pēc laika skalas. Elementu numuri pārnumurēti, teksts nemainīts.",
   "h1": "Kā sadalīt un apvienot subtitrus",
   "intro": "Sagriezt vienu garu subtitru failu segmentos vai apvienot vairākus izkaisītus failus vienā. Griezums vienmēr iekrīt ieraksta robežā — teikums nekad netiek pārgriezts uz pusēm.",
   "ctaText": "Atvērt sadalīšanu un apvienošanu"
  },
  "body": [
   {
    "h2": "Ko dara šis rīks",
    "ps": [
     "Epizodu sadalīšana, segmentu sadalīšana un avotu apvienošana – tas viss atduras pret vienu un to pašu neatbilstību starp subtitru blokiem un video blokiem: vai nu viens fails ir jāpārgriež, vai vairāki ir jāapvieno. Šajā lapā ir aprakstīts gan viens, gan otrs, katram atvēlēta viena cilne."
    ]
   },
   {
    "h2": "Vispirms izvēlieties griešanu vai apvienošanu",
    "ps": [
     "Divas cilnes augšpusē: **Sadalīt: vienu failu segmentos** un **Apvienot: vairākus failus vienā**. Zemāk esošās otrā soļa opcijas mainās atbilstoši jūsu izvēlei.",
     "Sadaļā „1 Pievienot subtitrus“ augšupielādējiet failu vai ielīmējiet tekstu; ja izvēlējāties nepareizi, noklikšķiniet uz „Notīrīt“. Šī lapa nolasa tikai UTF-8 — ja kodējums ir bojāts (jautājuma zīmju vai kastīšu siena), vispirms dodieties uz [[Kropļota teksta labošana|/repair.html]]."
    ],
    "img": {
     "file": "split-mode",
     "alt": "Divas cilnes subtitru sadalīšanas un apvienošanas lapas augšpusē",
     "cap": "Griešana un apvienošana ir divas cilnes; otrā soļa opcijas seko jūsu izvēlei"
    }
   },
   {
    "h2": "Kā griezt",
    "ps": [
     "Sadaļā „2 Kā griezt“ izvēlieties pamatu: **ilgumu** (vienu segmentu ik pēc X minūtēm) vai **elementu skaitu** (vienu segmentu ik pēc X elementiem), pēc tam ievadiet skaitli.",
     "Atzīmējiet izvēles rūtiņu „Katru segmentu sākt no 0∶00“, un katrs iegūtais segments tiks skaitīts no nulles — izmantojiet šo, kad augšupielādējat epizodes un katru segmentu atskaņotājā dodat atsevišķi. Atstājiet to neatzīmētu, lai saglabātu sākotnējos laika zīmogus, lai katrs segments joprojām sakristu ar tā pozīciju avota videoklipā.",
     "Griezums iekrīt tikai elementu robežās: ja ļoti garš subtitrs stiepjas pāri griezuma punktam, viss elements paliek agrākajā segmentā."
    ],
    "img": {
     "file": "split-cut",
     "alt": "Ilguma un elementu skaita opcijas ar restartēšanas uz nulli slēdzi sadalīšanas lapā",
     "cap": "Griezt pēc ilguma vai elementu skaita, un pēc izvēles katru segmentu sākt no 0∶00"
    }
   },
   {
    "h2": "Kā apvienot",
    "ps": [
     "Sadaļā „2 Kā apvienot“ izvēlieties metodi: **Virknēt secībā** pārbīda vēlāko failu tā, lai tas sāktos pēc agrākā faila beigām, bez pārklāšanās starp segmentiem; **Mīt secīgi pēc laika skalas** saglabā katra faila sākotnējos laika zīmogus un kārto pēc sākuma laika.",
     "Izmantojiet virknēšanu secībā, ja faili ir vienas epizodes pirmā un otrā puse vai ja atsevišķi rediģētas puses ir jāsaliek kopā; izmantojiet mīšanu secīgi pēc laika skalas, ja faili pieder ekrānam kopā, piemēram, oriģinālais celiņš un tulkotais celiņš.",
     "Pēc apvienošanas elementu numuri tiek pārnumurēti automātiski, un neviens dialoga vārds nemainās."
    ],
    "img": {
     "file": "split-join",
     "alt": "Virknēšanas secībā un mīšanas secīgi pēc laika skalas opcijas apvienošanas lapā",
     "cap": "Virknēšana secībā ir piemērota vienas epizodes divām pusēm; mīšana secīgi pēc laika skalas ir piemērota oriģinālajam un tulkotajam celiņam"
    }
   },
   {
    "h2": "Rezultāta paņemšana līdzi",
    "ps": [
     "„3 Rezultāts“ labajā pusē eksportē **SRT** un **VTT**; noklikšķiniet uz „Lejupielādēt“ vai „Kopēt“.",
     "Sadalot varat izmantot „Lejupielādēt katru segmentu“, kas saglabā katru griezto segmentu uzreiz, nevis ar vienu klikšķi uz katru segmentu."
    ],
    "img": {
     "file": "split-out",
     "alt": "SRT/VTT formāta izvēle ar lejupielādes un katra segmenta lejupielādes pogām rezultātu apgabalā",
     "cap": "Sadalīšanas rezultātus var lejupielādēt segmentu pa segmentam; apvienotais fails tiek lejupielādēts vai kopēts tieši"
    }
   },
   {
    "h2": "Kas paliek neskarts",
    "ps": [
     "Neviena dialoga rakstzīme nemainās. Šī lapa maina tikai to, kuri elementi pieder kuram segmentam un kā tie ir numurēti; ierakstu saturs paliek tāds, kāds tas ir.",
     "Izmantojot „Virknēt secībā“, vēlāko failu laika zīmogi tiek pārbīdīti kopumā — tas ir tas, ko prasa apvienošana; izmantojot „Mīt secīgi pēc laika skalas“, katrs oriģinālais laika zīmogs tiek saglabāts."
    ]
   },
   {
    "h2": "Bieži uzdotie jautājumi",
    "ps": [
     "**Ko darīt, ja pēdējais segments izrādās ļoti īss?** Tas ir normāli. Atlikums, kas neaizpilda veselu segmentu, kļūst par savu segmentu, nevis tiek aizpildīts.",
     "**Vai teikums, kas stiepjas pāri griezuma punktam, tiks sadalīts?** Nē. Griezumi iekrīt tikai ieraksta robežās, un elements, kas šķērso līniju, paliek agrākajā segmentā.",
     "**Kā pēc mīšanas tiek sakārtoti divi elementi ar identiskiem laikiem?** Pēc sākuma laika; ja sākuma laiki ir vienādi, tiek saglabāta secība, kādā pievienojāt failus.",
     "**Vai var sadalīt ASS?** Šī lapa apstrādā SRT un VTT. Vispirms konvertējiet ASS uz SRT vai VTT, izmantojot [[Formāta konvertēšana|/convert.html]]."
    ]
   },
   {
    "h2": "Privātums",
    "ps": [
     "Subtitri tiek apstrādāti pilnībā pārlūkprogrammā: nekas netiek augšupielādēts un nekas neiet caur serveri. Aizveriet lapu, un saturs ir pazudis."
    ]
   },
   {
    "h2": "Saistītie rīki un ceļveži",
    "ps": [
     "Lai apvienotu divus failus divvalodu celiņā (nevis vienā epizodē), izmantojiet [[Divvalodu apvienošana un specefekti|/guides/merge.html]]; ja visa laika skala ir nobīdīta, dodieties uz [[Laika skalas pielāgošana|/shift.html]]; visai sezonai izmantojiet [[Pakešveida konvertēšana|/batch.html]]; un, kad esat pabeidzis, palaidiet [[Subtitru kvalitātes kontrole|/qc.html]]."
    ]
   }
  ]
 },
 "split-bilingual-subtitles": {
  "seo": {
   "title": "Sadalīt divvalodu subtitrus divos celiņos – AI-SRTSub",
   "desc": "Sadalīt divvalodu subtitrus divos failos: oriģinālais un tulkojuma celiņi tiek lejupielādēti atsevišķi ar atšķirīgiem nosaukumiem; abas formas tiek atpazītas. – AI-SRTSub",
   "h1": "Sadalīt divvalodu subtitrus divos celiņos",
   "intro": "Viens divvalodu subtitrs kļūst par diviem failiem — „oriģināls“ un „tulkojums“: augšupielādējiet, izvēlieties sadalīšanu uz pusēm, lejupielādējiet katru, saglabājot neskartas laika skalas.",
   "ctaText": "Sadalīt divvalodu subtitrus"
  },
  "body": [
   {
    "h2": "Kad jums nepieciešams sadalīt",
    "ps": [
     "Jūsu atskaņotājs vēlas tikai vienas valodas celiņu; vai arī jūs vēlaties tulkojuma celiņu atkārtotam tulkojumam, vai oriģinālo celiņu, ko savienot pārī ar citu tulkoto versiju. Divvalodu subtitri ir vai nu **viens elements ar divām rindām** (oriģināls vienā rindā, tulkojums otrā), vai **divi atsevišķi elementi, kam ir kopīga laika skala** — abus var sadalīt."
    ]
   },
   {
    "h2": "Kur to izdarīt",
    "ps": [
     "Atveriet [[Divvalodu subtitru atdalītājs|/bilingual.html]] un nometiet savu subtitru. Rīks automātiski nosaka divvalodu formu: viens elements ar divām rindām tiek sadalīts pēc rakstības sistēmas, divi elementi uz vienas laika skalas pēc secības. Režīma nolaižamajā izvēlnē izvēlieties **Sadalīt divās daļās** un noklikšķiniet uz Sākt (vai ļaujiet tam atkārtoti palaist automātiski). Rezultātu apgabalā ir redzami divi gabali: tas, kas atzīmēts ar `.orig`, ir oriģinālais celiņš, tas, kas atzīmēts ar `.dst`, ir tulkojuma celiņš — katram noklikšķiniet uz „Lejupielādēt“; abiem celiņiem ir precīzi tāda pati laika skala."
    ],
    "img": {
     "file": "bilingual-split",
     "alt": "Sadalīšanas rezultāts: oriģinālais celiņš un tulkojuma celiņš kā divi gabali, katrs ar lejupielādes pogu",
     "cap": "Sadalīt divās daļās: .orig oriģinālais celiņš + .dst tulkojuma celiņš, katrs lejupielādēts atsevišķi"
    }
   },
   {
    "h2": "Viena izplatīta kļūda",
    "ps": [
     "**Vienu elementu ar divām rindām valodās, kurām ir kopīgs alfabēts (teiksim, angļu un franču), nevar sadalīt.** Ja celiņi ir atdalīti pēc rakstības sistēmas, tās tiek uzskatītas par vienu sistēmu un tiek apstrādātas kā vienvalodas. Vispirms konvertējiet šādu saturu uz B formu ar to pašu laika skalu, pēc tam sadalīju; divu elementu forma tiek savienota pārī pēc laika skalas un tai navs nozīmes valodai. Lai uzzinātu abu formu nianses, skatiet [[Divi veidi, kā izveidot divvalodu subtitrus|/guides/make-bilingual-subtitles.html]]."
    ]
   }
  ]
 },
 "srt-file-format": {
  "seo": {
   "title": "Kas ir SRT fails? Kā to atvērt un rediģēt – AI-SRTSub",
   "desc": "SRT (SubRip) subtitru failu anatomija: numurs, laika rinda, teksts. Kā atvērt vienu teksta redaktorā, kāpēc atskaņotājs to noraida un kā labot kropļotu tekstu un laika zīmogu kļūdas.",
   "h1": "SRT faila formāts paskaidrots",
   "intro": "SRT ir visuniversālākais subtitru formāts: vienkāršs teksts, vienkārša struktūra, tiek pieņemts gandrīz visur. Šajā ceļvedī ir apskatīta tā struktūra, kā to atvērt un kā labot izplatītas kļūmes.",
   "ctaText": "Atvērt subtitru konvertētāju"
  },
  "body": [
   {
    "h2": "Kā izskatās SRT fails",
    "ps": [
     "SRT (SubRip) ir vienkāršs teksts — jebkurš teksta redaktors to atver. Katram elementam ir trīs daļas: **numura rinda**, **laika rinda** un **teksts**, kuras atdalītas ar tukšām rindām. Laika rinda ir `00:00:01,000 --> 00:00:03,500` — ņemiet vērā **komatu** pirms milisekundēm, nevis punktu."
    ],
    "img": {
     "file": "convert-upload",
     "alt": "Augšupielādes apgabals: ielādēts SRT fails, kurā redzami numuri un laiks",
     "cap": "Standarta SRT trīs daļu elements: numurs, laika rinda, teksts"
    }
   },
   {
    "h2": "Kā to atvērt",
    "ps": [
     "Lai izlasītu saturu: noklikšķiniet ar peles labo pogu un atveriet ar jebkuru **teksta redaktoru**. Lai to izmantotu ar videoklipu: pārdēvējiet failu tā, lai tas **atbilstu video faila nosaukumam** (neskaitot paplašinājumu), ievietojiet abus vienā mapē, un tādi atskaņotāji kā VLC, PotPlayer vai mpv to ielādē automātiski; varat arī to ievilkt atskaņošanas logā."
    ]
   },
   {
    "h2": "Noraidījumu un kropļotā teksta labošana",
    "ps": [
     "**Kropļotas rakstzīmes**: fails nav UTF-8 — saglabājiet to no jauna kā UTF-8 savā redaktorā. **Nekas neparādās**: pārbaudiet, vai laika rindā tiek izmantots komats (nevis punkts) un vai elementu numuri nav bojāti (vairums atskaņotāju panes nepilnības, daži nē). **Fails ir HTML vai JSON** pamats: lejupielādes avots bija nepareizs; iegūstiet to vēlreiz."
    ]
   },
   {
    "h2": "Ko SRT var un nevar saturēt",
    "ps": [
     "SRT satur tikai tekstu un laiku: **nav stila** (fontu, krāsu), **nav pozicionēšanas** (kur ekrānā), **nav efektu**. Tam nepieciešams ASS — skatiet [[SRT uz ASS|/guides/srt-to-ass.html]]. Visu formātu salīdzinājumam skatiet [[subtitru formātu salīdzinājums|/guides/subtitle-format-comparison.html]]."
    ]
   }
  ]
 },
 "srt-fps-converter": {
  "seo": {
   "title": "SRT kadru ātruma konvertētājs – mainīt subtitru kadru ātrumu – AI-SRTSub",
   "desc": "Filma ir 24 kadri sekundē, apraide ir 25 kadri sekundē, un subtitri katru minūti arvien vairāk novirzās: mērogojiet laika skalu pēc 0.96 vienu reizi, un viss fails nonāk mērķa ātrumā.",
   "h1": "Subtitru kadru ātruma konvertēšana: no 24 k/s uz 25 k/s",
   "intro": "Atskaņojiet 24 k/s filmas subtitrus uz 25 k/s avota, un tie katru minūti zaudē vairāk nekā sekundi — līdz beigu titriem tie atpaliek par minūtēm. Viena mērogošana to labo.",
   "ctaText": "Atvērt laika redaktoru"
  },
  "body": [
   {
    "h2": "Kāpēc kadru ātruma neatbilstība liek subtitriem novirzīties",
    "ps": [
     "Kadru ātruma konvertēšana atkārtoti nolasa **to pašu laika posmu zem diviem dažādiem pulksteņiem**. 100 minūšu 24 k/s filmai ir 6000 s × 24 = **144,000 kadri**; uz 25 k/s avota šie 144,000 kadri tiek atskaņoti 5760 sekundēs — **96 minūtes**. Visa filma ilgst 4 minūtes īsāk, tāpēc elements pie 50. minūtes parādās apmēram 2 minūtes vēlāk, un beigu titru subtitri nekad neparādās."
    ]
   },
   {
    "h2": "Formula un kopīgie reizinātāji",
    "ps": [
     "Mērķa ātrums ÷ sākotnējais ātrums = reizinātājs. **No 24 uz 25: reizināt ar 0.96** (24÷25); otrādi, no 25 uz 24: 1.0417. **No 25 uz 23.976: reizināt ar 0.959**; otrādi: 1.0427. Laika redaktorā pievienojiet **Mērogot pēc ātruma** soli un ievadiet reizinātāju vērtības lodziņā."
    ],
    "img": {
     "file": "shift-step-rate",
     "alt": "Mērogot pēc ātruma solis ar ievadītu 0.96",
     "cap": "0.96 ir 24÷25; mjiens lapā pat piemin kadru ātruma konvertēšanu kā izplatītu lietojumu."
    }
   },
   {
    "h2": "Kad jūs nezināt abus ātrumus",
    "ps": [
     "Ja nevarat atrast avota kadru ātrumu, neuzminiet reizinātāju — tā vietā izmantojiet **divus atskaites punktus**: ņemiet pirmā un pēdējā elementa reālo parādīšanās laiku kā divus punktus, un viss starp tiem tiek proporcionāli izstiepts. Skatiet [[subtitri arvien vairāk zaudē sinhronizāciju|/guides/subtitles-out-of-sync.html]]."
    ]
   },
   {
    "h2": "Kas jāpārbauda pēc tam",
    "ps": [
     "Mērogošana pārvieto katru sākumu un beigas; elementu ilgums tiek izstiepts par tādu pašu reizinātāju. Pēc palaišanas pārbaudiet abus galējos punktus: pirmo elementu (mazākā sākotnējā kļūda) un pēdējo (lielākā). Ja abi gali sakrīt, sakrīt arī viss starp tiem."
    ]
   }
  ]
 },
 "srt-simplified-to-traditional": {
  "seo": {
   "title": "Konvertēt vienkāršotos subtitrus uz tradicionālajiem — Taivāna vai Honkonga – AI-SRTSub",
   "desc": "Pārvērtiet vienkāršotās ķīniešu valodas subtitrus tradicionālajos: izvēlieties Taivānas (ar vai bez reģionālā vārdu krājuma) vai Honkongas. Viens-pret-daudzi kartējumi tiek atrisināti pēc vārda. Mainās tikai dialogs; laika zīmogi paliek savā vietā.",
   "h1": "Konvertēt vienkāršotos subtitrus uz tradicionālajiem",
   "intro": "Vienkāršotās ķīniešu valodas subtitriem, kas paredzēti Taivānas vai Honkongas auditorijai, ir nepieciešama tikai konvertēšana — taču abos reģionos vēlas dažādas lietas, un nepareizā virziena izvēle sniedz formulējumu, ko vietējie neizlieto.",
   "ctaText": "Konvertēt šo subtitru"
  },
  "body": [
   {
    "h2": "Vajadzība",
    "ps": [
     "Jūsu subtitri ir vienkāršotajā ķīniešu valodā un ir jāsasniedz skatītāji Taivānā vai Honkongā. Rakstzīmju labošana pa vienai nav reāla — vienā epizodē ir simtiem elementu —, un abi reģioni nevēlas vienu un to pašu tradicionālo tekstu: vārdu krājums atšķiras, un nepareizais virziens rada formulējumu, ko neviens vietējais neizmantotu."
    ]
   },
   {
    "h2": "Kur to izdarīt",
    "ps": [
     "Atveriet [[Vienkāršotās–tradicionālās konvertēšana|/hanconv.html]], ievelciet subtitru un izvēlieties kādu no vienkāršotās → tradicionālās virziena zem „Konvertēt uz“: vispārējā tradicionālā, Taivānas (mainīt vārdu krājumu), Taivānas (tikai glifi) vai Honkongas. Konvertēšana notiek uzreiz, un rezultātu apgabalā tiek parādīts gatavais subtitrs, kas gatavs lejupielādei.",
     "**Taivānas auditorijai**: izvēlieties „Taivānas (mainīt vārdu krājumu)“, ja ir jāmaina arī reģionālais vārdu krājums — „programmatūra“ un „informācija“ kļūst par to Taivānas ekvivalentiems —, vai „Taivānas (tikai glifi)“, ja vēlaties mainīt rakstzīmju formas, saglabājot savu oriģinālo formulējumu. **Honkongas auditorijai**: izvēlieties „Honkonga“, kur „programmatūra“ ir uzrakstīta ar vēl citu formu."
    ],
    "img": {
     "file": "hanconv-dir",
     "alt": "Konvertēt uz kartīti: galamērķa nolaižamā izvēlne, kurā redzams „Vienkāršotā → Taivānas tradicionālā (mainīt vārdu krājumu)“",
     "cap": "Taivāna un Honkonga ir atsevišķi virzieni ar dažādu vārdu krājumu"
    }
   },
   {
    "h2": "Izplatītas kļūdas",
    "ps": [
     "**Nebaidieties no viens-pret-daudzi kartējumiem**: viena un tā pati vienkāršotā rakstzīme vārdos „tīrs“, „sauss“ un „koka stumbrs“ tiek kartēta uz dažādām tradicionālajām rakstzīmēm. Tabulas to atrisina pa frāzēm, tāpēc viss netiek saplacināts vienā rakstzīmē.",
     "**Tiek konvertēts tikai dialogs**: laika zīmogi, indeksa numuri un ASS stila rindas paliek neskarti, tāpēc rezultāts ir gatavs lietošanai.",
     "**Nekas nav mainījies? Pārbaudiet pirms panikas**: ja statistikas joslā tiek ziņots par 0 mainītām rindām, failā nav ķīniešu rakstzīmju vai formāts ir nepareizi atpazīts — pārbaudiet, vai „Atpazītais formāts“ sakrīt ar to, ko augšupielādējāt."
    ]
   },
   {
    "h2": "Saistītie",
    "ps": [
     "Pilns visu deviņu virzienu skaidrojums — [[Kā konvertēt vienkāršotos un tradicionālos subtitrus|/guides/hanconv.html]]; kāpēc tā ir vairāk nekā rakstzīmju apmaiņa — [[Vienkāršotā pret tradicionālo nav rakstzīmju apmaiņa|/guides/simplified-traditional-chinese.html]]; tradicionālā atpakaļ uz vienkāršoto arī atrodas sadaļā [[Vienkāršotās–tradicionālās konvertēšana|/hanconv.html]]."
    ]
   }
  ]
 },
 "srt-to-ass": {
  "seo": {
   "title": "SRT uz ASS konvertētājs – konvertēt subtitrus tiešsaistē – AI-SRTSub",
   "desc": "Konvertējiet SRT subtitrus uz ASS (Advanced SubStation Alpha) ar 1920×1080 audeklu un tīru noklusējuma stilu, kas gatavs ielādēšanai jebkurā atskaņotājā. Darbojas jūsu pārlūkprogrammā.",
   "h1": "SRT uz ASS",
   "intro": "Pārvērtiet SRT subtitrus uz ASS: nometiet failu, izvēlieties ASS, lejupielādējiet. Jums tiek ģenerēts 1920×1080 audekls un tīrs noklusējuma stils.",
   "ctaText": "Konvertēt SRT → ASS"
  },
  "body": [
   {
    "h2": "Kad jums nepieciešams ASS",
    "ps": [
     "Izmantojiet ASS, kad sāniski ielādētam subtitram nepieciešama **labāka pozicionēšana un stila kontrole**: tas nes jēdzienus, kuru SRT trūkst — audekla izmēru, fontu stilus, līdzinājumu. mpv, PotPlayer, VLC un vairums atskaņotāju to atbalsta tieši."
    ]
   },
   {
    "h2": "Kā izskatās izvade",
    "ps": [
     "Rīks atjauno standarta galveni: **1920×1080 audeklu**, viedo aplaušanu (WrapStyle 0) un vienu Noklusējuma stilu — Arial 54, balts teksts ar melnu apveidu, apakšā centrēts. Katrs elements izmanto šo stilu."
    ],
    "img": {
     "file": "convert-opt-ass",
     "alt": "Izvades formāta nolaižamā izvēlne ar atlasītu ASS - Advanced SubStation",
     "cap": "Izvēlieties ASS kā izvadi un lejupielādējiet pēc konvertēšanas"
    }
   },
   {
    "h2": "Vai stili tiek saglabāti?",
    "ps": [
     "SRT vispār nav stila jēdziena. Un, ja jūsu avots jau ir ASS, konvertēšana **atjauno noklusējuma stilu un nesaglabā oriģinālo** — ASS pārveidošanai izmantojiet īpašu subtitru redaktoru. Laiks un teksts netiek ietekmēti nevienā virzienā."
    ]
   }
  ]
 },
 "srt-to-excel": {
  "seo": {
   "title": "Konvertēt subtitrus uz Excel – koriģēt rindu pa rindai – AI-SRTSub",
   "desc": "Eksportējiet SRT subtitrus uz Excel: viena rinda uz vienu elementu četrās kolonnās — indekss, sākums, beigas un teksts. Laiks saglabāts kā teksts, rindas pārtraukumi neskarti, un rediģēto lapu var konvertēt atpakaļ subtitros.",
   "h1": "Konvertēt subtitrus uz Excel",
   "intro": "Simtiem elementu koriģēšana teksta redaktorā ir nogurdinoša. Programmā Excel katrs elements ir rinda, tāpēc filtrēšana, komentēšana un meklēšana un aizvietošana kļūst pieejama — un labojumi atgriežas jūsu SRT.",
   "ctaText": "Eksportēt uz Excel"
  },
  "body": [
   {
    "h2": "Vajadzība",
    "ps": [
     "Koriģēšana, lielapjoma vārdu maiņa vai darba sadalīšana starp vairākiem cilvēkiem — tas viss tabulā rit daudz ātrāk nekā vienkāršā tekstā. SRT pats par sevi ir vienkāršs teksts, bet tā elementu struktūra (indekss, laiks, dialogs) glīti kartējas četrās izklājlapas kolonnās."
    ]
   },
   {
    "h2": "Kur to izdarīt",
    "ps": [
     "Atveriet [[Subtitru ⇄ tabulas konvertēšana|/table.html]], pārslēdzieties uz „uz tabulu“, ievelciet SRT, un priekšskatījums aizpildās ar vienu rindu uz vienu elementu četrās kolonnās — indekss, sākums, beigas, teksts. Noklikšķiniet uz „Lejupielādēt Excel (.xlsx)“, un tas ir jūsu. VTT tiek atbalstīts tādā pašā veidā.",
     "Kad esat pabeidzis rediģēšanu: pārslēdziet režīmu uz „uz subtitriem“, ievietojiet lapu atpakaļ, un jūs atkal saņemat SRT. Nosacījums ir trīs kolonnas sākumam, beigām un tekstam (der arī English Start / End / Text) jebkurā secībā."
    ],
    "img": {
     "file": "table-prev",
     "alt": "Tabulas priekšskatījums: katrs SRT elements kā rinda četrās kolonnās, ar statistikas joslu",
     "cap": "SRT izkārtots kā četras kolonnas, konvertējams atpakaļ tādā pašā veidā"
    }
   },
   {
    "h2": "Izplatītas kļūdas",
    "ps": [
     "**Vispirms izlabojiet bojāto kodējumu**: šī lapa nolasa tikai UTF-8. Ekrāns pilns ar jautājuma zīmēm vai kastītēm nozīmē braucienu vispirms uz [[Kropļojumu labošana|/repair.html]].",
     "**CSV vai xlsx**: izvēlieties .xlsx, kad fails nonāk Excel, lai laika kolonu nevarētu pārformatēt; CSV ir portatīvāks, bet Excel to var nolasīt kā ko citu — ja tā notiek, iestatiet laika kolonu uz „Teksts“.",
     "**ASS nedarbojas**: ASS nes stila direktīvas, tāpēc pirms ievietošanas tabulā konvertējiet to uz SRT."
    ]
   },
   {
    "h2": "Saistītie",
    "ps": [
     "Pilns divvirzienu ceļvedis — [[Kā konvertēt subtitrus uz Excel / CSV|/guides/table.html]]; tulkošana pēc tam — [[Subtitru tulkošana|/translate.html]]; pēdējā caurlaide pirms piegādes — [[Subtitru kvalitātes kontrole|/qc.html]]."
    ]
   }
  ]
 },
 "srt-to-vtt": {
  "seo": {
   "title": "SRT uz VTT konvertētājs – konvertēt subtitrus tiešsaistē – AI-SRTSub",
   "desc": "Konvertējiet SRT subtitrus uz VTT (WebVTT) HTML5 celiņa elementiem. Laika zīmogu komati automātiski kļūst par punktiem. Darbojas jūsu pārlūkprogrammā, nekas netiek augšupielādēts.",
   "h1": "SRT uz VTT",
   "intro": "Pārvērtiet SRT subtitrus uz VTT: nometiet failu, izvēlieties VTT, lejupielādējiet. Laika zīmogi tiek pārrakstīti tīmekļa formātam, viss jūsu pārlūkprogrammā.",
   "ctaText": "Konvertēt SRT → VTT"
  },
  "body": [
   {
    "h2": "Kad jums nepieciešams VTT",
    "ps": [
     "Tīmekļa atskaņotāji (HTML5 `<track>` elements), YouTube subtitru augšupielāde un vairums pārlūkprogrammas atskaņotāju pieņem tikai **VTT (WebVTT)** — nevis SRT. Ja jums ir tikai SRT, viena konvertēšana padara to darboties spējīgu."
    ]
   },
   {
    "h2": "Kā abi formāti atšķiras",
    "ps": [
     "Saturs ir gandrīz identisks; trīs lietas ir uzrakstītas citādi: **WEBVTT galvenes rinda** (nepieciešama VTT); **milisekuržu atdalītājs** laika zīmoga — SRT izmanto komatu (00∶00∶01,000), savukārt VTT izmanto punktu (00∶00∶01.000); un VTT ļauj izmantot NOTE un STYLE blokus, ko SRT neļauj."
    ],
    "img": {
     "file": "convert-result",
     "alt": "Konvertēšanas rezultāts, kurā redzama WEBVTT galvene un punktu laika zīmogi",
     "cap": "Konvertētais VTT: WEBVTT pirmā rinda, punktu laika zīmogi"
    }
   },
   {
    "h2": "Kā konvertēt",
    "ps": [
     "Atveriet [[konvertētāju|/convert.html]], iemetiet SRT, izvēlieties **VTT - WebVTT** kā izvadi, pēc tam konvertējiet un lejupielādējiet. Elementu secība, laika vērtības un vairāku līniju teksts tiek saglabāti tādi, kādi tie ir — mainās tikai sintakse. Ejot pretējā virzienā? Skatiet [[VTT uz SRT|/guides/vtt-to-srt.html]]."
    ]
   }
  ]
 },
 "subtitle-format-comparison": {
  "seo": {
   "title": "SRT pret VTT pret ASS pret SBV pret LRC – kurš subtitru formāts – AI-SRTSub",
   "desc": "Piecu izplatītu subtitru formātu iespēju salīdzinājums: teksta stils, pozicionēšana, laika precizitāte, kur katrs pieder un kā starp tiem konvertēt.",
   "h1": "Subtitru formāta izvēle: SRT / VTT / ASS / SBV / LRC",
   "intro": "Tas pats subtitrs, kas saglabāts piecos formātos, kalpo pieciem dažādiem meistariem. Šajā ceļvedī salīdzināts, ko katrs formāts var darbt un kā pārvietoties starp tiem.",
   "ctaText": "Atvērt subtitru konvertētāju"
  },
  "body": [
   {
    "h2": "Izvēlieties formātu vienā teikumā",
    "ps": [
     "Ielādēšana atskaņotājā, maksimālā saderība → **SRT**; tīmekļa atskaņotāji (HTML5 celiņš) vai YouTube augšupielāde → **VTT**; fonti, krāsas, pozicionēšana, efekti → **ASS**; lejupielādēts no YouTube → **SBV** (konvertēt uz SRT, lai paplašinātu atbalstu); dziesmu vārdi, dziedāšana rindu pa rindai → **LRC**."
    ],
    "img": {
     "file": "convert-opt",
     "alt": "Izvades formāta nolaižamā izvēlne: seši mērķa formāti",
     "cap": "Seši eksporta mērķi konvertētājā aptver katru šajā ceļvedī minēto formātu"
    }
   },
   {
    "h2": "Iespēju salīdzinājums",
    "ps": [
     "**SRT**: vienkāršs teksts + laiks, bez stila vai pozicionēšanas, saderības čempions. **VTT**: teksts + laiks, pārlūkprogrammu dabiski atbalstīts, var nest pozicionēšanu un pamata stilu, punkts pirms milisekundēm. **ASS**: teksts + laiks + pilns stils (fonti, krāsas, kontūras, pozicionēšana, efekti), laiks līdz sekundes simtdaļām. **SBV**: YouTube minimālais subtitru formāts, sākums un beigas vienā rindā. **LRC**: dziesmu vārdu formāts, tikai sākuma laiks, bez beigu laika, bez stila."
    ]
   },
   {
    "h2": "Ceļi starp formātiem",
    "ps": [
     "Jebkurš no šiem konvertē abos virzienos [[konvertētājā|/convert.html]]: lasīšana atbalsta srt, vtt, ass (tostarp ssa), sbv, lrc, txt; eksportēšana atbalsta srt, vtt, ass, sbv, lrc, txt. Katram kopīgajam maršrutam ir savs ceļvedis: [[SRT uz VTT|/guides/srt-to-vtt.html]], [[VTT uz SRT|/guides/vtt-to-srt.html]], [[SRT uz ASS|/guides/srt-to-ass.html]], [[ASS uz SRT|/guides/ass-to-srt.html]], [[SBV uz SRT|/guides/sbv-to-srt.html]], [[LRC uz SRT|/guides/lrc-to-srt.html]]."
    ]
   },
   {
    "h2": "Ko konvertēšana zaudē",
    "ps": [
     "Konvertēšana uz SRT vienmēr atmet stilu un pozicionēšanu (SRT tos nevar saturēt). Konvertēšana uz ASS ar šo rīku **atjauno noklusējuma stilu un nesaglabā oriģinālo**. LRC uz SRT ir jāaizpilda beigu laiki (katra rinda ilgst līdz nākamajai; pēdējā saņem 3 sekundes). Laika vērtības un teksts paliek identiski katrā virzienā."
    ]
   }
  ]
 },
 "subtitle-garbled-characters": {
  "seo": {
   "title": "No kurienes rodas subtitru kropļojumi – pamanīt, izlabot – AI-SRTSub",
   "desc": "Kropļojums nozīmē nepareizu nolasīšanu, nevis bojātu failu. Aizstāšanas rakstzīmes, akcentētu burtu sienas un neskaidru rakstzīmju virknes norāda uz iemeslu — uzziniet, kuras atgūstas un kuras nekad.",
   "h1": "No kurienes rodas subtitru kropļojumi",
   "intro": "Tie paši baiti, kas nolasīti kā UTF-8 un nolasīti kā GBK, izrādās divas pilnīgi dažādas rakstzīmju kopas. Tas, kā izskatās atkritumu teksts, ir tiešs pierādījums tam, kurš solis nogāja greizi.",
   "ctaText": "Atvērt kropļojumu labošanas rīku"
  },
  "body": [
   {
    "h2": "Fails ir kārtībā — tas tika nolasīts nepareizi",
    "ps": [
     "Subtitru fails saglabā baitus. Lai pārvērstu baitus rakstzīmēs, ir jāzina, kādā kodējumā tie tika uzrakstīti — ja kļūdāties, iegūstat kropļojumu. No faila nav pazudis neviens baits; nolasiet to vēlreiz ar pareizo kodzīmi, un rakstzīmes atgriežas.",
     "Tas sadala darbu divās daļās: **izdomāt, kāds kodējums tam bija sākumā**, un **saglabāt to kā kodējumu, ko jūsu atskaņotājs var atpazīt**. Pirmais rodas no izmēģinājuma atšifrēšanas un vērtēšanas, otrais no kopijas saglabāšanas. Tie risina dažādas problēmas."
    ]
   },
   {
    "h2": "Pieci izskati, pieci cēloņi",
    "ps": [
     "Kropļojums nav nejaušs — tā izskats atklāj, kas to izraisīja:"
    ],
    "img": {
     "file": "repair-diag",
     "alt": "Diagnozes kartīte, kurā uzskaitīts katrs kropļojuma pēdu veids",
     "cap": "Diagnoze kārto kropļojumus pēc cēloņa, nevis tos apvieno"
    }
   },
   {
    "h2": "Kāpēc aizstāšanas rakstzīmi nevar labot",
    "ps": [
     "Aizstāšanas rakstzīme ir robežlīnija. `�` nozīmē, ka baiti jau tika izmesti **iepriekšējā solī** (parasti kāda programma, kas nolasa failu un saglabā to no jauna), un nekas netika reģistrēts par to, kas tika nomests. Šajā brīdī nav ko secināt atpakaļgaitā — neviens to nevar labot.",
     "Tāpēc labošanas lapa apstrādā abus gadījumus atšķirīgi. Augšupielādējiet failu, un oriģinālie baiti ir neskarti, ļaujot izmēģināt katru kodējumu; ja ielīmētajā tekstā jau ir aizstāšanas rakstzīme, tas to skaidri pasaka: „nevar labot, lūdzu, augšupielādējiet oriģinālo failu“.",
     "Ir arī pretējs gadījums: saturs nolasās perfekti labi, bet jūsu atskaņotājs joprojām rāda atkritumus. Fails nav vainīgs — **atskaņotājs izvēlējās nepareizu kodējumu**. Teksta rediģēšana nepalīdzēs; saglabājiet kopiju kā UTF-8 ar BOM vai GBK un iedodiet to tam."
    ],
    "img": {
     "file": "repair-up",
     "alt": "Augšupielādes apgabals: vilkt-un-nomest un ielīmēt kā divi ievades punkti",
     "cap": "Augšupielādējiet failu, ja varat — neskarti baiti nozīmē ko labojamu"
    }
   },
   {
    "h2": "Ko tas salīdzina labošanas laikā",
    "ps": [
     "Rīks izmēģina katru ticamo kodējumu, pēc tam novērtē katru rezultātu: cik liela tā daļa ir veidota no parastajām rakstzīmēm, vai ir akcentu virknes, simbolu virknes, vai CJK joslas ir neskaidru rakstzīmju sienas. Visaugstāk novērtētais rezultāts nonāk saraksta augšgalā.",
     "**Ja neviena vērtība nav nepārprotami labāka, nekas nav ieteicams** — labāk pateikt „šis lasās labi tāds, kāds tas ir“, nekā apmuļķot ar kaut ko, kas tikai aptuveni līdzinās valodai. Divreiz sabojāts teksts (saglabāts nepareizi vienu reizi, pēc tam labots nepareizi vienu reizi) iegūst vienu papildu atgriezeniskās atrisināšanas kārtu labākajiem kandidātiem."
    ],
    "img": {
     "file": "repair-fix",
     "alt": "Kandidātu saraksts, sakārtots pēc vērtības, katrs apzīmēts ar tā kodējuma pāri",
     "cap": "Kandidāti sakārtoti pēc vērtības — nav skaidra uzvarētāja, nav ieteikuma"
    }
   },
   {
    "h2": "Pareizā kodējuma saglabāšana pabeidz darbu",
    "ps": [
     "Labotais teksts joprojām ir jāsaglabā kā kodējums, ko jūsu atskaņotājs atpazīst. Atskaņotāji operētājsistēmā Windows parasti paļaujas uz BOM, lai noteiktu kodējumu, tāpēc **UTF-8 ar BOM** ir vismazākā jezga; vecākai aparatūrai un dažiem reģionālajiem atskaņotājiem ir nepieciešams GBK. Varat izvēlēties UTF-8, UTF-8 (ar BOM), GBK, Big5, Shift_JIS vai EUC-KR, un jums tiks likts izvēlēties citu, ja kaut kas neder (GBK nevar saturēt korejiešu valodu)."
    ],
    "img": {
     "file": "repair-out",
     "alt": "Rezultātu apgabals: saglabāt-kā kodējuma nolaižamā izvēlne un lejupielādes poga",
     "cap": "Saglabājiet to kā kaut ko, ko atskaņotājs atpazīst, un kropļojums ir patiesi atrisināts"
    }
   },
   {
    "h2": "Saistītie rīki un ceļveži",
    "ps": [
     "Pilns ceļvedis — [[Kā labot kropļotus subtitrus|/guides/repair.html]]; ko SRT fails patiesībā saglabā — [[Kas atrodas SRT faila iekšpusē|/guides/srt-file-format.html]]; kodējums ir kārtībā, bet saturs ir netīrs (ūdenszīmes, reklāmas, vājdzirdīgo tagi) — [[Subtitru tīrīšana|/clean.html]]."
    ]
   }
  ]
 },
 "subtitle-glossary": {
  "seo": {
   "title": "Terminu tabulas: viena sezona, viens vārdu krājums – kad tādu izveidot – AI-SRTSub",
   "desc": "Terminu tabula novērš to, ka viens un tas pats vārds tiek attēlots nekonsekventi: kad to izveidot, kā to atkārtoti izmantot visā sezonā, kāpēc vārdu sakritība ķīniešu valodā neko nedara un ko tam nevajadzētu dot.",
   "h1": "Terminu tabulas: sezonas konsekvences uzturēšana",
   "intro": "Kad vārds pirmajā epizodē ir A un septītajā epizodē ir B, skatītāji domā, ka tie ir divi tēli. Terminu tabula novērš tieši to — tā nosaka lietu nosaukumus.",
   "ctaText": "Atvērt pakešveida terminu aizstāšanu"
  },
  "body": [
   {
    "h2": "Terminu tabula novērš nekonsekvenci",
    "ps": [
     "Vārdu krājuma problēmas subtitros ir divu veidu: „šis vārds ir tulkots nepareizi“ un „tas pats vārds ir tulkots citādi no vienas vietas uz citu“. Pirmais ir vārdnīcas problēma; otrais ir tas, kam paredzēta terminu tabula.",
     "Otrs ir gan izplatītāks, gan grūtāk pamanāms: `Thor` pirmajā epizodē kļūst par „Tors“ un septītajā epizodē par „Donars“, un katra epizode pati par sevi izskatās labi, savukārt seriāls kopumā liek skatītājiem domāt, ka parādījies jauns tēls. Terminu tabula pārvērš „šī producēšana viņu sauc par Toru“ par izpildāmu likumu, kas uzreiz tiek piemērots visam subtitru failam."
    ]
   },
   {
    "h2": "Kad ir vērts tādu izveidot",
    "ps": [
     "Ne katram subtitru failam ir nepieciešama terminu tabula. Gadījumi, kas to attaisno, parasti ir šādi:"
    ],
    "img": {
     "file": "glossary-rules",
     "alt": "Aizstāšanas likumi, kas sagrupēti pēc kategorijām terminu tabulā",
     "cap": "Izmantojiet # komentārus, lai sagrupētu likumus un īslaicīgi izslēgtu vienu no tiem rediģēšanas laikā"
    }
   },
   {
    "h2": "Vienas tabulas uzturēšana sezonas garumā",
    "ps": [
     "Terminu tabula tiek uzturēta **pakāpeniski**: sakārtojiet vārdus pirmajā epizodē, pēc tam pievienojiet likumu ikreiz, kad parādās jauns termins, un līdz sezonas beigām tabula ir pilnīga. Nākamajai tās pašas sērijas sezonai sāciet no tās.",
     "Uzrakstiet likumus nedaudz plašāk, nekā stingri nepieciešams — kad esat izvēlējies „Tors“, pievienojiet arī „Donars -> Tors“, lai kāda cita subtitrus varētu salīdzināt tajā pašā piegājienā.",
     "Pēc tam vienmēr izlasiet **izmaiņu sarakstu**: tajā ir nosaukts katrs elements, katra rinda un kas par ko kļuva. Tā ir vienīgā vieta, kur varat apstiprināt, ka izmaiņas bija pareizas un nebija pārspīlētas, un jebkuru ierakstu, kas jums nepatīk, var atcelt ar klikšķi."
    ],
    "img": {
     "file": "glossary-diff",
     "alt": "Atsevišķu izmaiņu saraksts rezultātu apgabalā",
     "cap": "Katra izmaiņa ir uzskaitīta; noklikšķiniet uz tās, kuru nevēlaties, lai to atceltu"
    }
   },
   {
    "h2": "Ko nevajadzētu dot terminu tabulai",
    "ps": [
     "Terminu tabula maina **vārdus**. Šīs trīs lietas ir ārpus tās darba, un tām vajadzētu būt:",
     "**Gramatika un teikuma struktūra** — jūs nevarat pārvērst vārdu teikumā; darbs ar teikuma līmeni atgriežas pie [[Subtitru tulkošana|/translate.html]] vai pie cilvēka.",
     "**Satura tīrīšana** — veselu rindu, piemēram, ūdenszīmju, reklāmu un SDH elementu, nomešana pieder pie [[Subtitru tīrīšana|/clean.html]]; terminu tabulas likumi aizstāj, tie neizdzēš rindas.",
     "**Laika skalas** — terminu tabula nekad nepieskaras laikam. Globālai nobīdei vai ātruma problēmai dodieties uz [[Laika skalas pielāgošana|/shift.html]]."
    ]
   },
   {
    "h2": "Dažas lietas, kuras ir viegli izdarīt nepareizi",
    "ps": [
     "**Ķīniešu valoda joprojām aizstāj apakšvirknes, ja ir atzīmēta vesela vārda saskaņošana — tas ir normāli.** Ķīniešu un japāņu valodā vārdi netiek atdalīti ar atstarpēm, tāpēc rīks nevar noteikt vārdu robežas un vesela vārda saskaņošanai tur nav ietekmes; `art` neaizskars `start` aizsardzība darbojas tikai angļu valodai.",
     "**Secība maina rezultātu.** Likumi darbojas no augšas uz apakšu, un teksts, ko izveidojis viens likums, tiek skenēts no jauna ar zemāk esošajiem likumiem. Aizstājiet A ar B un pēc tam B ar C, un jūs beigsiet ar C.",
     "**Lai mainītu tikai tulkojumu, iestatiet darbības jomu.** Divvalodu failā izvēlieties „tikai otrā rinda“; ieraksti ar tikai vienu rindu paliek neskarti zem jebkura vienas rindas iestatījuma — rīks neuzmin, kura puse ir oriģinālā.",
     "**Terminu tabula netiek saglabāta.** Tā ir tukša katru reizi, kad atverat lapu, tāpēc saglabājiet savu teksta failu un nododiet to tālāk."
    ]
   },
   {
    "h2": "Saistītie rīki un ceļveži",
    "ps": [
     "Pilnu ceļvedi skatiet sadaļā [[Kā pakešveidā aizstāt terminus subtitros|/guides/glossary.html]]; ja saturs ir netīrs, vispirms palaidiet [[Subtitru tīrīšana|/clean.html]]; kad vārdi ir sakārtoti un jums ir vajadzīgas citas valodas, dodieties uz [[Subtitru tulkošana|/translate.html]]; un palaidiet rezultātu caur [[Subtitru kvalitātes kontrole|/qc.html]]."
    ]
   }
  ]
 },
 "subtitle-quality-check": {
  "seo": {
   "title": "Piegādei iepriekš veicamā subtitru kvalitātes kontroles kontrolsaraksts – AI-SRTSub",
   "desc": "Subtitru piegādes kontrolsaraksts: pārklāšanās, lasīšanas ātrums, rindas platums un pieturzīmes visbiežāk izgāžas. Palaidiet 17 kvalitātes kontroles noteikumus — puse problēmu ir labojumi ar vienu klikšķi.",
   "h1": "Kas jāpārbauda pirms piegādes",
   "intro": "Pabeigtie subtitri nav gatavi piegādei: problēmas, ko skatītāji pamana pirmajā acu uzmetienā, ir tieši tās, kuras jūs nevarat redzēt pēc simto reizi skatīšanās. Šis kontrolsaraksts aptver šo pēdējo caurlaidi.",
   "ctaText": "Palaist subtitru kvalitātes kontroles pārbaudi"
  },
  "body": [
   {
    "h2": "Kāpēc jūs pats nevarat redzēt problēmas",
    "ps": [
     "Ikvienam, kas veido subtitrus, saturs ir pārāk labi zināms — jūs zināt, ko katra rinda saka tālāk, tāpēc nekas nekad nešķiet pārāk ātrs; jūs esat redzējis izkārtojumu simtiem reižu, un jūsu acis pašas izlaiž nepilnības. Tāpēc pirmspiegādes pārbaude nevar paļauties uz „atkal noskatīšanos no augšas“ — tai jābūt **izmērītai pret skaitļiem**: lasīšanas ātrums, rindas platums, ilgums, pārklāšanās. Ļaujiet skaitļiem lemt."
    ]
   },
   {
    "h2": "Sešas visbiežāk sastopamās kļūmes",
    "ps": [
     "Sakārtotas pēc tā, cik bieži tās nogremdē piegādi:"
    ]
   },
   {
    "h2": "Kā pārbaudīt",
    "ps": [
     "Atveriet [[Subtitru kvalitātes kontrole|/qc.html]] un nometiet savus subtitrus; iestatiet valodu uz automātisko noteikšanu (27 valodas, katrai ar saviem noteikumu līmeņiem). Ziņojumā atradumi ir uzskaitīti trijos līmeņos — **kļūdas / brīdinājumi / mājieni** — katrs ar ieraksta numuru un izmērīto vērtību. Ar kļūdām ir jātiek galā (kropļots teksts, laika zīmoga formāts, beigas agrāk par sākumu, salauzta numerācija); brīdinājumi ir atkarīgi no gadījuma (pārklāšanās, lasīšanas ātrums, rindas platums, ilgums); mājieni ir spodrināšana (rindas pārtraukuma pozīcija, atstarpes, pieturzīmes)."
    ],
    "img": {
     "file": "qc-report",
     "alt": "Kvalitātes kontroles ziņojums: trīs līmeņu problēmu saraksts, katrs atradums ar ieraksta numuru un izmērītās un sliekšņa vērtības salīdzinājumu",
     "cap": "Trīs līmeņu ziņojums, kurā norādīts katra atraduma ieraksta numurs un izmērītā vērtība"
    }
   },
   {
    "h2": "Ko var izlabot ar vienu klikšķi",
    "ps": [
     "Numerācija, tukši ieraksti, atkārtota aplaušana, atstarpes un pieturzīmes — viss, kas **atstāj laiku neskartu** — var tikt izlabots automātiski; labojumi, kas **maina laiku** (sākuma un beigu apmaiņa, pārklāšanās pārbīdīšana, ilguma apgriešana vai izstiepšana), pēc noklusējuma ir atzīmēti un ir jāatzīmē tikai pēc tam, kad esat apstiprinājis ietekmi. **Lasīšanas ātrumam virs limita nav automātiska labojuma** — mašīna nevar zināt, kuru vārdu apgriezt, tāpēc saīsiniet tulkojumu pats vai nedaudz atlaidiet laiku; skatiet [[Subtitri ir pārāk ātri, lai tos izlasītu|/guides/subtitle-too-fast.html]]. Pēc labošanas automātiski tiek palaista jauna pārbaude, un ziņojums skaita tikai to, kas tika patiesi izlabots."
    ]
   },
   {
    "h2": "Kamēr jūs esat pie tā",
    "ps": [
     "Ziņojumu lapā var tieši lejupielādēt vienkārša teksta `.qc.txt` ziņojumu — pievienojiet to piegādei, lai otra puse uzreiz redzētu, ko jūs pārbaudījāt. Tikko tulkotiem subtitriem pirms piegādes palaidiet kvalitātes kontroli; kopējā laika skalas novirze ir cita veida problēma — ja lasīšanas ātrums pēc pārbaudes joprojām neizdodas, skatiet [[Subtitri novirzās no sinhronizācijas|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "subtitle-speed-converter": {
  "seo": {
   "title": "Sinhronizēt subtitrus pēc video ātruma maiņas – AI-SRTSub",
   "desc": "Video paātrināts vai palēnināts un subtitri vairs neder: ievadiet ātruma reizinātāju mērogošanas pēc ātruma solī, un visa laika skala izstiepjas kopā ar videoklipu.",
   "h1": "Pielāgot subtitrus pēc video ātruma maiņas",
   "intro": "Video kļuva ātrāks vai lēnāk kopumā, subtitri palika sākotnējā tempā — viss pēc punkta ir izslēgts. Ievadiet reizinātāju, un visa laika skala mērogojas ar video.",
   "ctaText": "Atvērt laika redaktoru"
  },
  "body": [
   {
    "h2": "Kad izmantot ātrumu, nevis nobīdi",
    "ps": [
     "Video tika paātrināts vai palēnināts **kopumā** (teiksim, 0,9x vai 1,25x rediģēšanas programmatūrā), kamēr katrs elements saglabāja savu oriģinālo ritmu: sākums sakrīt, un jo tālāk dodaties, jo sliktāk tas kļūst — ar nemainīgu attiecību. Tā ir ātruma problēma. Ja viss fails ir vienkārši nobīdīts par fiksētu summu bez augšanas, pietiek ar nobīdi — skatiet [[visa subtitru faila pārvietošana agrāk vai vēlāk|/guides/shift-subtitle-timing.html]]."
    ]
   },
   {
    "h2": "Kuru skaitli ievadīt",
    "ps": [
     "Subtitriem ir jāseko videoklipam, tāpēc ievadiet **reizinātāju, par kādu video faktiski mainījās**: 1,25x paātrinājums nozīmē, ka elementa laiks reizinās ar 1.25, lai panāktu; 0,9x palēninājums reizinās ar 0.9. Laika redaktorā pievienojiet **Mērogot pēc ātruma** soli un ievadiet reizinātāju vērtības lodziņā."
    ],
    "img": {
     "file": "shift-step-rate",
     "alt": "Mērogot pēc ātruma solis ar reizinātāju vērtības lodziņā",
     "cap": "Reizinātājs virs 1 izstiepj laika skalu (paātrinātam video), zem 1 to saspiež (palēninātam)."
    }
   },
   {
    "h2": "Kā tas atšķiras no nobīdes",
    "ps": [
     "Nobīde **pārvieto** katra elementa laiku par vienu un to pašu fiksēto summu un saglabā elementa ilgumu; ātrums **reizina** gan sākumu, gan beigas, tāpēc ilgums arī mērogojas. Pēc ātruma maiņas pats ilgums ir mainījies — tieši tāpēc ir nepieciešams ātrums."
    ]
   },
   {
    "h2": "Ja neesat pārliecināts par reizinātāju",
    "ps": [
     "Ja reizinātājs ir pazudis, atgriezieties pie **diviem atskaites punktiem**: ievadiet pirmā un pēdējā elementa reālo video laiku, un viss starp tiem izplešas proporcionāli — kas ir līdzvērtīgi pareizā reizinātāja atrisināšanai. Skatiet [[subtitri arvien vairāk zaudē sinhronizāciju|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "subtitle-too-fast": {
  "seo": {
   "title": "Subtitri ir pārāk ātri, lai tos izlasītu – labot lasīšanas ātrumu – AI-SRTSub",
   "desc": "Subtitri ir pārāk ātri, lai tos izlasītu — īss ilgums vai garš teksts? Kvalitātes kontrole atzīmē ierakstus virs 20 rakstzīmēm sekundē (9 haņzi CJK valodām); ilgums tiek labots automātiski, teksts ir jārediģē.",
   "h1": "Subtitri ir pārāk ātri, lai tos izlasītu",
   "intro": "Skatītāji turpina spiest pauzi? Galvenais vaininieks ir lasīšanas ātrums. Kā to izmērīt, kā to labot un kad rediģēt tekstu pret laiku — viss vienā ceļvedī.",
   "ctaText": "Pārbaudīt lasīšanas ātrumu"
  },
  "body": [
   {
    "h2": "Kas ir lasīšanas ātrums?",
    "ps": [
     "Lasīšanas ātrums ir vienkārši **tas, vai skatītāji var pabeigt subtitru izlasīšanu laikā, kamēr tas paliek ekrānā**. Matemātika ir vienkārša: teksta platums, dalīts ar sekundēm ekrānā. Parastie nozares limiti: 9 pilna platuma rakstzīmes sekundē ķīniešu, japāņu un korejiešu valodai (18 pusplatuma vienības), 20 pusplatuma vienības sekundē citām valodām. 20 haņzi rinda, kas ilgst 1 sekundi, iznāk 40 platuma vienības sekundē — vairāk nekā divas reizes pārsniedz limitu, un skatītāji to nekad nepabeigs."
    ]
   },
   {
    "h2": "Vispirms atšķiriet, kāda veida ātrums tas ir",
    "ps": [
     "„Pārāk ātri, lai lasītu“ patiesībā ir divas dažādas problēmas: **pārāk īss ilgums** — elements nogriežas pēc vienas vai divām simtdaļām sekundes, parasti laika kļūda vai rediģēšanas pārpalikums; **pārāk garš teksts** — ilgums ir labs, bet rinda iebāž 30 haņzi, un neviens ātruma limits to neglābs. Labojumi ir pretēji, tāpēc vispirms noskaidrojiet, kurš no tiem jums ir."
    ],
    "img": {
     "file": "qc-rules",
     "alt": "Lasīšanas ātruma limita iestatījums kvalitātes kontroles lapā, pēc noklusējuma 18 CJK un 20 citām valodām",
     "cap": "Kvalitātes kontroles lasīšanas ātruma sliekšņi: 18 platuma vienības sekundē CJK, 20 citām valodām"
    }
   },
   {
    "h2": "Kā pārbaudīt",
    "ps": [
     "Atveriet [[Subtitru kvalitātes kontrole|/qc.html]] un nometiet savus subtitrus. Ziņojumā „pārāk īss ilgums“ ir brīdinājums, kas parāda izmērītās milisekundes (slieksnis: 833 milisekundes); „neasināms ātrums“ ir savs atradums, kas parāda izmērītās platuma vienības sekundē. Divvalodu subtitriem skaitās tikai mērķa valodā uzrakstītā rinda — abas valodas netiek saskaitītas kopā."
    ]
   },
   {
    "h2": "Kā to izlabot",
    "ps": [
     "**Pārāk īss ilgums**: labojams ar vienu klikšķi — elements tiek automātiski pagarināts līdz 833 milisekundēm, nepārsniedzot nākamā elementa sākumu (labojums nedrīkst radīt jaunu pārklāšanos). **Pārāk garš teksts**: nav automātiska labojuma — mašīna nevar zināt, kuru vārdu apgriezt. Divi ceļi, jūsu izvēle: saīsiniet tulkojumu (noklikšķiniet uz šūnas tulkošanas rīkā, lai to rediģētu) vai izstiepiet šī elementa ilgumu (tikai tad, ja pirms nākamā elementa ir sprauga; kopējai laika skalas problēmai skatiet [[Laika skalas nobīde|/shift.html]]). Pēc tam vēlreiz palaidiet kvalitātes kontroli, lai apstiprinātu, ka lasīšanas ātrums ir atgriezies sliekšņa robežās."
    ]
   },
   {
    "h2": "Nepārspīlējiet",
    "ps": [
     "Sliekšņa sasniegšana nenozīmē ērtu skatīšanos: katra elementa iespiešana līdz 9 rakstzīmēm sekundē padara visu filmu nogurdinošu. Kā īkšķa likums, lielāko daļu laika turieties ap 70% no sliekšņa un laiku pa laikam ļaujiet ar dialogiem bagātām ejām nedaudz pārsniegt. Subtitru bloki, kas mirgo pārāk bieži, paši par sevi ir problēma — pirms piegādes palaidiet pilnu metrikas kopu, skatiet [[Piegādei iepriekš veicamais subtitru kvalitātes kontroles kontrolsaraksts|/guides/subtitle-quality-check.html]]."
    ]
   }
  ]
 },
 "subtitles-out-of-sync": {
  "seo": {
   "title": "Subtitri arvien vairāk zaudē sinhronizāciju? Izlabojiet to – AI-SRTSub",
   "desc": "Sākas labi, filmas vidū atpaliek par dažām sekundēm, beigās nederīgi: tā ir progresīva novirzīšanās, parasti kadru ātruma neatbilstība vai video ātruma maiņa. Divi atskaites punkti to izlabo.",
   "h1": "Subtitri arvien vairāk zaudē sinhronizāciju: cēloņi un labojumi",
   "intro": "Sākumā labi, pēc pusstundas pāris sekundes vēlu, beigās bezcerīgi. Šāda veida novirzītai nepareizai saskaņošanai ir zināmi cēloņi — un zināms labojums.",
   "ctaText": "Izlabot šo failu"
  },
  "body": [
   {
    "h2": "Vispirms atšķiriet abu veidu nepareizu saskaņošanu",
    "ps": [
     "Nepareiza saskaņošana ir divu veidu: **vienveidīga nobīde** nozīmē, ka katrs elements ir vēlu (vai agri) par vienu un to pašu daudzumu, aptuveni vienādi no sākuma līdz beigām; **progresīva novirzīšanās** nozīmē, ka sākums ir pareizs un kļūda aug uz beigām, iespējams, sasniedzot minūtes. Šis raksts ir par otro veidu — pirmajam skatiet [[visa subtitru faila pārvietošana agrāk vai vēlāk|/guides/shift-subtitle-timing.html]]."
    ]
   },
   {
    "h2": "Kāpēc tas arvien vairāk novirzās",
    "ps": [
     "Novirzīšanās rodas no **diviem dažādiem pulksteņiem**: trīs visbiežāk sastopamie cēloņi ir (1) kadru ātruma neatbilstība — 24 kadru sekundē filmas subtitri uz 25 kadru sekundē avota zaudē vairāk než sekundi minūtē; (2) video tika paātrināts vai palēnināts, kamēr subtitri saglabāja savu sākotnējo tempu; (3) VFR (mainīga kadru ātruma) ieraksts, kura laika skala jau sākotnēji ir nevienmērīga. Kas tiem kopīgs: kļūda aug aptuveni lineāri ar atskaņošanas laiku."
    ]
   },
   {
    "h2": "Izlabojiet to ar diviem atskaites punktiem",
    "ps": [
     "Tā kā kļūda aug lineāri, pareiza laika piespraušana katrā galā un vidus pārspiešana proporcionāli visu saliek atpakaļ. Laika redaktorā pievienojiet **divu atskaites punktu korekciju**: abi „pašreizējie“ lauki tiek automātiski aizpildīti ar šī faila oriģinālajiem laikiem; jūs noskatāties video un ievadāt abos „mērķa“ laukos **, kad pirmais un pēdējais elements faktiski parādās**."
    ],
    "img": {
     "file": "shift-step-two",
     "alt": "Divu atskaites punktu korekcija: pašreizējie laiki aizpildīti automātiski, mērķa laiki ievadāmi",
     "cap": "Paņemiet atskaites punktus abās galējībās — mazāko un lielāko sākotnējo kļūdu — un viss starp tiem proporcionāli pārizplešas."
    }
   },
   {
    "h2": "Kā pārbaudīt rezultātu",
    "ps": [
     "Pēc palaišanas rezultātu panelis parāda katra elementa oriģinālos un jaunos laikus **blakus**. Pārbaudiet trīs vietas: pirmo elementu, vienu vidū un pēdējo — trīs pozīcijas ar mazāko, vidējo un lielāko sākotnējo kļūdu. Ja visas trīs nonāk vietā, viss fails ir kārtībā."
    ],
    "img": {
     "file": "shift-result",
     "alt": "Rezultātu panelis: pirms un pēc laiki blakus, ar lejupielādes pogu",
     "cap": "Vidējo elementu jaunajiem laikiem vajadzētu iekrist starp abiem galiem — tā ir zīme, ka proporcija ir pareiza."
    }
   },
   {
    "h2": "Kad divu atskaites punktu nepietiek",
    "ps": [
     "Divu atskaites punktu korekcija pieņem, ka kļūda ir **lineāra**. Ja avots ir VFR ekrāna ieraksts ar vidusfaila kadru ātruma lēcienu, lineāra vilkšana nevar izlabot vidu — ņemiet acīmredzami nepareizu vidējo elementu kā trešo punktu, sadaliet failu tur un palaidiet divu atskaites punktu korekciju katrā pusē. Tāpat pēc labošanas vēlreiz noskatieties vidējo posmu normālā ātrumā, lai apstiprinātu, ka nav palikusi vietējā nepareizā saskaņošana."
    ]
   }
  ]
 },
 "table": {
  "seo": {
   "title": "Subtitru konvertēšana uz Excel / CSV – Abos virzienos – AI-SRTSub",
   "desc": "Divvirzienu ceļvedis: eksportējiet SRT/VTT uz Excel vai CSV rindas korektūrai, pēc tam importējiet rediģēto lapu atpakaļ kā subtitrus. Nepieciešamas trīs kolonnas, jebkādā secībā; laiks saglabāts kā teksts.",
   "h1": "Kā konvertēt subtitrus uz Excel / CSV",
   "intro": "Korektūra un tulkošana izklājlapā ir vienkāršāka. Eksportējiet subtitrus uz Excel vai CSV, rediģējiet rindu pa rindai, pēc tam konvertējiet atpakaļ — laika kolonnas paliek kā teksts, un rindu pārtraukumi dialogā tiek saglabāti.",
   "ctaText": "Atvērt tabulu konvertētāju"
  },
  "body": [
   {
    "h2": "What this tool does :: Ko šis rīks dara",
    "ps": [
     "Subtitri ir norāžu rindas un izklājlapas ir ierakstu rindas — kad tā ir lapa, korektūru, komentēšanu un lielapjoma tulkošanu var veikt ar rīkiem, ko jau zināt. Tiek atbalstīti abi virzieni:"
    ]
   },
   {
    "h2": "Augšupielādējiet un izvēlieties virzienu",
    "ps": [
     "Velciet failu iekšā vai meklējiet to. Katram virzienam ir nepieciešams cita veida fails: **uz tabulu** ņem subtitru failus (SRT / VTT), **uz subtitriem** ņem izklājlapas failus (CSV / Excel, gan .xlsx, gan .xls). Izvēlieties nepareizu režīmu, un lapa pateiks, kādu faila tipu šis režīms vēlas.",
     "⚠️ Šī lapa nolasa tikai UTF-8. Ja jūsu subtitri atveras kā jautājuma zīmju vai kastīšu ekrāns, vispirms palaidiet tos cauri [[Možibakes labošana|/repair.html]] — bojāts kodējums šeit lasās tikai kā aizvietotājzīmes."
    ],
    "img": {
     "file": "table-up",
     "alt": "Tabulu konvertētāja augšupielādes zona: izmešanas zona un divi režīmu slēdži",
     "cap": "Katrs režīms vēlas citu failu: subtitri iekšā, izklājlapa ārā — un atpakaļ"
    }
   },
   {
    "h2": "Subtitru eksportēšana uz tabulu",
    "ps": [
     "Izvēlieties \"uz tabulu\", nometiet subtitru, un priekšskatījums uzskaita katru norādi: indeksu, sākumu, beigas, tekstu. Statusa josla norāda norāžu skaitu un kopējo ilgumu. Pēc tam nospiediet \"Lejupielādēt Excel (.xlsx)\" vai \"Lejupielādēt CSV\".",
     "Atšķirība starp abiem: .xlsx ir īsts izklājlapas fails, kurā Excel nevar pārformātēt jūsu laika kolonnu aiz muguras; CSV ir portatīvāks, taču Excel, atverot to, var interpretēt laika kolonnu kā kaut ko citu. Ja tas notiek, atlasiet laika kolonnu un iestatiet tās formātu uz \"Teksts\" — vai vienkārši izmantojiet .xlsx."
    ],
    "img": {
     "file": "table-prev",
     "alt": "Tabulas priekšskatījums: indeksa, sākuma, beigu un teksta kolonnas ar statusa joslu",
     "cap": "Katra norāde priekšskatīta; statusa josla norāda norāžu skaitu un kopējo ilgumu"
    }
   },
   {
    "h2": "Tabulas importēšana atpakaļ subtitros",
    "ps": [
     "Izvēlieties \"uz subtitriem\", nometiet lapu, un šeit ir kolonnu noteikums: tam ir nepieciešamas trīs kolonnas priekš **sākuma, beigām un teksta** (angļu galvenes Start / End / Text arī der), **jebkādā secībā**. Tiek pieņemti gan `00:00:01,500`, gan `00:00:01.500`; rindas, kuras nevar parsēt, tiek izlaistas, nevis nosodīts viss fails.",
     "Rezultāts ir uzskaitīts pa norādēm priekšskatījumā; apstipriniet, pēc tam lejupielādējiet SRT vai VTT. Ja trūkst šo trīs kolonnu, jūs saņemat ziņojumu, kas liek pārbaudīt galvenes — parasti tāpēc, ka eksportēšanai tika izmantots cits nosaukums vai galvenes rinda nav pirmā rinda."
    ],
    "img": {
     "file": "table-back",
     "alt": "Subtitru rezultātu zona: importētie subtitri uzskaitīti pa norādēm",
     "cap": "Par neatpazītām kolonnām tiek ziņots, tās nekad netiek klusējot ignorētas"
    }
   },
   {
    "h2": "FAQ :: Bieži uzdotie jautājumi",
    "ps": [
     "**Excel nepareizi rāda laika kolonnu?** Izmantojiet .xlsx, un tas nekad nenotiek. Ja jums ir jāizmanto CSV: pirms atvēršanas atlasiet laika kolonnu un iestatiet šūnas formātu uz \"Teksts\".",
     "**Vai kolonnu galvenēm jābūt angļu valodā?** Nē. Start / End / Text tiek atpazīti jebkurā valodā, ko šī lapa atbalsta, un reģistram nav nozīmes.",
     "**Vai pēc importēšanas mani rindu pārtraukumi joprojām ir tur?** Jā. Rindu pārtraukumi dialogā tiek saglabāti līdz pat sākotnējam ietvaram.",
     "**Vai ASS tiek atbalstīts?** Šī lapa apstrādā tikai SRT un VTT. ASS satur stila direktīvas — vispirms konvertējiet to uz SRT ar [[Formātu konvertētājs|/convert.html]].",
     "**Cik failu vienlaikus?** Viens. Lai apstrādātu desmitiem vai simtiem, izmantojiet [[Sērijveida konvertēšana|/batch.html]] (kas tikai konvertē formātus un neiet cauri tabulai)."
    ]
   },
   {
    "h2": "Privacy :: Privātums",
    "ps": [
     "Konvertēšana notiek pilnībā jūsu pārlūkprogrammā. Nekāds subtitru saturs nekad netiek nosūtīts uz serveri."
    ]
   },
   {
    "h2": "Saistītie rīki un ceļveži",
    "ps": [
     "Ja viss, ko vēlaties, ir subtitru pārveidošanas uz Excel solis, skatiet [[Konvertēt subtitrus uz Excel|/guides/srt-to-excel.html]]; lai pēc tam tulkotu citā valodā, [[Subtitru tulkošana|/translate.html]]; desmitiem failu vienlaikus — [[Sērijveida konvertēšana|/batch.html]]."
    ]
   }
  ]
 },
 "translate": {
  "seo": {
   "title": "Mākslīgā intelekta subtitru tulkošana – augšupielāde uz divvalodu eksportu – AI-SRTSub",
   "desc": "Tulkojiet subtitrus ar mākslīgo intelektu: augšupielādējiet SRT/VTT/ASS, izvēlieties no 100 valodām, apvienojiet vārdus ar glosāriju, eksportējiet divvalodu subtitrus. Bezmaksas sākums, tiek atbalstīta sava API atslēga.",
   "h1": "Kā izmantot mākslīgā intelekta subtitru tulkošanu",
   "intro": "Pilnīga darbplūsma vienam subtitru failam, sākot no augšupielādes caur tulkošanu līdz eksportēšanai: kas ir uz ekrāna, uz ko klikšķināt un ko jūs saņemat katrā solī.",
   "ctaText": "Atvērt tulkošanas rīku"
  },
  "body": [
   {
    "h2": "What this tool does :: Ko šis rīks dara",
    "ps": [
     "Tulko subtitrus no vienas valodas citā un eksportē lietošanai gatavu subtitru failu. Tipiskas vajadzības:"
    ]
   },
   {
    "h2": "Upload subtitles :: Augšupielādēt subtitrus",
    "ps": [
     "Noklikšķiniet uz \"Izvēlēties subtitru failu\" vai ielīmējiet subtitru tekstu tieši kreisajā ievades laukā. Tiek atbalstīti seši formāti: SRT, VTT, ASS, SSA, SBV un TXT. Nav faila pa rokai? Noklikšķiniet uz \"Ielādēt paraugu\", lai redzētu to darbībā. Kad tas ir parsēts, vidējā kolonna parāda subtitru tabulu ar indeksu, laika skalu un avota tekstu katram ierakstam."
    ],
    "img": {
     "file": "translate-upload",
     "alt": "Tulkošanas rīka importēšanas zona: izvēlēties subtitru failu, ielīmēšanas lodziņš un parauga ielādes poga",
     "cap": "Kreisā kolonna \"Importēt subtitrus\": izvēlieties failu, ielīmējiet tekstu vai ielādējiet paraugu"
    }
   },
   {
    "h2": "Izvēlieties valodu un stilu",
    "ps": [
     "\"Avota valoda\" var palikt automātiskajā noteikšanā; \"mērķa valoda\" tiek izvēlēta no 100 valodām. Ir pieejami pieci tulkošanas stili: Sabalansēts (noklusējums), Sarunvalodas, Oficiāls profesionāls, Dublēšanas stils un Pielāgots. \"Dublēšanas stils\" ir piemērots filmu un TV dialogiem; \"Oficiāls profesionāls\" ir piemērots dokumentālajām filmām un kursiem."
    ],
    "img": {
     "file": "translate-lang",
     "alt": "Valodas un tulkošanas stila iestatījumi: avota valodas, mērķa valodas nolaižamās izvēlnes un pieci stili",
     "cap": "\"Valoda\" un \"tulkošanas stils\": avots var automātiski noteikt, 75 mērķa izvēles"
    }
   },
   {
    "h2": "Glosārijs: saglabājiet vārdus konsekventus",
    "ps": [
     "MI tulko partijās, tāpēc tas pats vārds dažādās partijās var iznākt divos dažādos veidos. Ierakstiet glosārijā likumus \"avots → jātulko kā\"; pirms katras partijas rīks to noskenē un seko katrai atbilstībai. Viens likums rindā; bultiņas var būt `->`, `=>`, `→` vai tabulators; viens pats avota termins nozīmē turēt to netulkotu; vairāki pareizrakstības varianti var dalīt vienu atveidi, izmantojot `|`. Noklikšķiniet uz \"✨ AI izvilkums\", lai MI vispirms izvilktu no video īpašvārdus tabulā, pēc tam rediģētu un tulkotu."
    ],
    "img": {
     "file": "translate-glossary",
     "alt": "Glosārija un īpašvārdu zona: glosārija ievades lodziņš ar MI izvilkuma un saglabāšanas pogām",
     "cap": "\"Apvienoto vārdu\" glosārijs: MI izvilktie īpašvārdi, automātiski ielādēti jauniem video pēc saglabāšanas"
    }
   },
   {
    "h2": "Tulkošanas process",
    "ps": [
     "Augšējā joslā noklikšķiniet uz \"▶ Sākt tulkošanu\". Vidējā statistikas josla reāllaikā parāda ierakstus, iztulkotos, notīrītos pildvielas un starprakstu teikumu grupas; progresa josla parāda atlikušā laika aprēķinu un izmantotos žetonus. Tulkošanas laikā noklikšķiniet uz jebkuras tulkošanas šūnas tabulā, lai rediģētu tekstu — izmaiņas tiek saglabātas jūsu datorā un pārdzīvo atsvaidzināšanu. Aizveriet lapu procesa vidū, un jums tiks piedāvāts atsākt no vietas, kur tas apstājās. Kad viens teikums aptver vairākus ierakstus, grupa tiek apvienota, iztulkota un atkārtoti aizpildīta pēc ilguma."
    ],
    "img": {
     "file": "translate-workspace",
     "alt": "Tulkošanas darba vide: statistikas josla, progresa josla un rediģējama subtitru tabula",
     "cap": "Vidējā darba vide: statistikas josla + progresa josla + noklikšķināma un rediģējama subtitru tabula"
    }
   },
   {
    "h2": "Export :: Eksportēt",
    "ps": [
     "Labajā kolonnā vispirms izvēlieties satura formu: tikai tulkojums (vienvalodas), divvalodu ar oriģinālu augšpusē vai divvalodu ar tulkojumu augšpusē; pēc tam faila formātu: SRT, WebVTT, SBV, ASS vai TXT. ASS izvēle pievieno divus izkārtojumus: sadalītus augšējo/apakšējo ekrānus un sakrautas apakšējās līnijas. Saturs un formāts brīvi apvienojas 14 eksportēšanas estilos. Divvalodu rindu platums tiek iestatīts atsevišķi. Noklikšķiniet uz \"Lejupielādēt subtitrus\", lai saglabātu failu, vai \"Kopēt starplaikā\", lai to uzreiz ielīmētu."
    ],
    "img": {
     "file": "translate-export",
     "alt": "Eksporta panelis: trīs satura formas, pieci failu formāti un divvalodu rindu platuma iestatījumi",
     "cap": "Labās kolonnas eksports: vispirms izvēlieties satura formu, pēc tam faila formātu"
    }
   },
   {
    "h2": "Cost and privacy :: Izmaksas un privātums",
    "ps": [
     "Noklusējuma modelim nav nepieciešama reģistrācija un atslēga — tas darbojas uzreiz ar pieprasījuma kvotām: ikdienas limits vienai IP plus vietnes mēroga ikdienas atļauja. Lielām partijām ievadiet savu API atslēgu sadaļā \"Tulkošanas dzinējs\". Privātums saskaņā ar paziņojumu lapā: noklusējuma modeļa subtitri tiek nodoti caur šīs vietnes serveri pakalpojuma sniedzējam; pielāgotu API tieši apstrādā jūsu ievadītais pakalpojuma sniedzējs, un atslēga paliek jūsu pārlūkprogrammā. Parsēšana, rindu aplaušana un divvalodu izkārtojums darbojas lokāli pārlūkprogrammā."
    ]
   },
   {
    "h2": "FAQ :: Bieži uzdotie jautājumi",
    "ps": [
     "**Tulkojumā sajauktas citas valodas?** Rīks nosaka valodas novirzi un automātiski tulko atkārtoti; ja daži ieraksti joprojām izskatās nepareizi, noklikšķiniet uz šūnas un labojiet tos ar roku.",
     "**Kā ir ar dziesmu vārdu rindām?** \"Satura filtrēšana\" piedāvā trīs opcijas dziesmu vārdiem: tulkot dziesmu vārdus, saglabāt oriģinālu vai izdzēst tos.",
     "**Nekonsekventi vārdu tulkojumi?** Pievienojiet nekonsekventos pareizrakstības variantus glosārijam un tulkojiet vēlreiz; glosārijam ir prioritāte pār globālo \"īpašvārdu apstrādes\" iestatījumu.",
     "**Vēlaties angļu valodu augšpusē un ķīniešu valodu apakšpusē?** Eksportējot izvēlieties \"Divvalodu · oriģināls augšpusē\"; ķīniešu valodai augšpusē un angļu valodai apakšpusē izvēlieties \"Divvalodu · tulkojums augšpusē\"."
    ]
   },
   {
    "h2": "Saistītie rīki un ceļveži",
    "ps": [
     "Nepareizs formāts? Sāciet ar [[formāta konvertēšana|/convert.html]]; laika skala nobīdījusies? Izmantojiet [[laika skalas pielāgošana|/shift.html]]; pirms nodošanas tālāk, palaidiet to cauri [[subtitru kvalitātes pārbaude|/guides/subtitle-quality-check.html]]."
    ]
   }
  ]
 },
 "translate-english-to-chinese": {
  "seo": {
   "title": "Tulkot angļu subtitrus ķīniešu valodā – AI-SRTSub",
   "desc": "Tulkot angļu subtitrus ķīniešu valodā: augšupielādējiet SRT/VTT/ASS, izvēlieties vienkāršoto vai tradicionālo, un eksportējiet tikai ķīniešu vai divvalodu subtitrus. – AI-SRTSub",
   "h1": "Tulkot angļu subtitrus ķīniešu valodā",
   "intro": "Angļu SRT iekšā, ķīniešu (vai angļu-ķīniešu divvalodu) subtitri ārā: augšupielādējiet, izvēlieties mērķa valodu, eksportējiet — viss vienā lapā.",
   "ctaText": "Tulkot angļu subtitrus"
  },
  "body": [
   {
    "h2": "When you need it :: Kad tas ir nepieciešams",
    "ps": [
     "Lejupielādētie subtitri ir tikai angļu valodā, un jūs netiekat līdzi; vai arī jūs vēlaties ķīniešu subtitrus ģimenes locekļiem, kuri nelasa angliski. Tas, kas jums nepieciešams, ir viena no trim formām — **tikai ķīniešu subtitri** vai divvalodu subtitri ar **ķīniešu valodu augšpusē, angļu valodu apakšpusē** vai **angļu valodu augšpusē, ķīniešu valodu apakšpusē** — un šis rīks izvada visus trīs."
    ]
   },
   {
    "h2": "How to do it :: Kā to izdarīt",
    "ps": [
     "Atveriet [[MI subtitru tulkotājs|/translate.html]] un nometiet savu angļu subtitru failu (SRT, VTT, ASS, SSA, SBV un TXT visi tiek atpazīti, vai vienkārši ielīmējiet tekstu). Atstājiet \"Avota valoda\" uz automātisko noteikšanu, iestatiet \"Mērķa valoda\" uz vienkāršoto vai tradicionālo ķīniešu valodu un noklikšķiniet uz \"▶ Sākt tulkošanu\". Kad tas beidzas, eksporta panelī labajā pusē izvēlieties satura formu: tikai tulkojums (vienvalodas), divvalodu · oriģināls augšpusē (angļu augšā, ķīniešu apakšā) vai divvalodu · tulkojums augšpusē (ķīniešu augšā, angļu apakšā), pēc tam izvēlieties faila formātu un lejupielādējiet."
    ],
    "img": {
     "file": "translate-export",
     "alt": "Eksporta panelis: tikai tulkojums, divvalodu ar oriģinālu augšpusē un divvalodu ar tulkojumu augšpusē",
     "cap": "Eksportējot izvēlieties satura formu: tikai ķīniešu vai angļu-augšā / ķīniešu-augšā divvalodu"
    }
   },
   {
    "h2": "Two common problems :: Divas izplatītas problēmas",
    "ps": [
     "**Vārdi tulkoti nekonsekventi?** MI tulko partijās, tāpēc tas pats vārds var iznākt divos veidos. Ievietojiet \"avots → tulkots vārds\" pārus glosārijā (piem., `Watson → Huasheng`), lai tas visur būtu vienots.",
     "**Subtitri novirzās no attēla?** Vispirms tulkojiet, pēc tam labojiet laika grafiku: darba vides augšdaļā esošajai laika skalas rīkjoslai ir globāla nobīdes un mēroga vadība — skatiet [[Subtitri novirzās no sinhronizācijas uz beigām|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "videosub": {
  "seo": {
   "title": "Iegulto video subtitru izvilkšana – MKV / MP4 celiņi – AI-SRTSub",
   "desc": "Izlasiet subtitru celiņus MKV, WebM, MP4 un MOV iekšpusē un eksportējiet SRT / VTT / ASS / TXT. Nav augšupielādes, nav transkodēšanas, uzskaitīts katrs valodas celiņš, norādīti attēla subtitri.",
   "h1": "Kā izvilkt video iegultos subtitrus",
   "intro": "Izlasiet subtitru celiņu, kas noslēgts MKV / MP4 iekšpusē, tieši kā SRT — video nekad netiek augšupielādēts, viss tiek nolasīts pārlūkprogrammā.",
   "ctaText": "Atvērt video subtitru izvilkšanu"
  },
  "body": [
   {
    "h2": "What this tool does :: Ko šis rīks dara",
    "ps": [
     "Subtitri var būt noslēgti video faila iekšpusē, nevis pastāvēt atsevišķi. Lai tos rediģētu, tulkotu vai savienotu pārī, vispirms tie ir jāizvelk — tā ir vienīgā lieta, ko šī lapa dara."
    ]
   },
   {
    "h2": "1 Add the video :: 1 Pievienot video",
    "ps": [
     "Velciet video failu pirmajā kolonnā vai noklikšķiniet, lai to izvēlētos. Tiek atpazīti tikai **MKV / WebM** un **MP4 / MOV**; citi konteineri nedos nevienu celiņu.",
     "Fails nekad neatstāj jūsu datoru — nav augšupielādes soļa. Rīks nolasa mazos gabalos pēc nobīdes, tāpēc daudzu gigabaitu filma neaizpilda atmiņu, bet pirmajam lasījumam ir vienreiz jāizskenē celiņa informācija."
    ],
    "img": {
     "file": "videosub-up",
     "alt": "Iegulto subtitru izvilkšanas lapas video pievienošanas zona",
     "cap": "MKV / WebM un MP4 / MOV tiek atbalstīti, un fails nekad neatstāj jūsu datoru"
    }
   },
   {
    "h2": "2 Iegultie subtitru celiņi",
    "ps": [
     "Kad nolasīšana ir pabeigta, otrā kolonnā failā ir uzskaitīti subtitru celiņi **pa vienam rindā**, parasti ar valodu un celiņa nosaukumu (piemēram, \"ķīniešu\", \"angļu\", \"spiests\"). Noklikšķiniet uz rindas, lai izvilktu šo celiņu.",
     "Ja failā ir tikai viens subtitru celiņš, izvilkšana sākas automātiski — klikšķis nav nepieciešams.",
     "**Attēla subtitrus nevar izvilkt**: Blu-ray PGS un DVD subtitri ir attēli, kas ieededzināti plūsmā bez teksta, ko paņemt, un lapa to skaidri pasaka; tiem nepieciešams OCR."
    ],
    "img": {
     "file": "videosub-track",
     "alt": "Iegulto subtitru celiņu saraksts, pa vienam rindā",
     "cap": "Viens celiņš rindā; ja ir tikai viens, izvilkšana sākas automātiski"
    }
   },
   {
    "h2": "3 The result :: 3 Rezultāts",
    "ps": [
     "\"3 Rezultāts\" labajā pusē parāda izvilkto subtitru tekstu ar eksporta formātu virs tā: **SRT / VTT / ASS / TXT**. Noklikšķiniet uz \"Lejupielādēt\" vai \"Kopēt\".",
     "Kad avota celiņš ir ASS, tā paša stila galvene un izšķirtspēja atgriežas nemainīta — eksportēšana kā ASS tās saglabā, savukārt eksportēšana kā SRT nes tikai tekstu."
    ],
    "img": {
     "file": "videosub-out",
     "alt": "Rezultātu zona ar SRT / VTT / ASS / TXT formāta izvēli",
     "cap": "Četri eksporta formāti; ASS avots saglabā savu stila galveni un izšķirtspēju"
    }
   },
   {
    "h2": "Kas paliek neskarts",
    "ps": [
     "Pašam video failam netiek pieskarties vispār — tikai lasīšana, bez rakstīšanas, bez transkodēšanas, bez remuksēšanas.",
     "Subtitru saturs iznāk tāds, kāds tas ir: nav kodējuma minēšanas, nav laika skalas korekcijas. Ja izvilktie subtitri ir sagrozīti, tā ir kodējuma problēma avota celiņā — nogādājiet to uz [[Kropļota teksta labošana|/repair.html]]."
    ]
   },
   {
    "h2": "Common questions :: Bieži uzdotie jautājumi",
    "ps": [
     "**Vai tiešām nav iespējas rīkoties ar attēla subtitriem (PGS / DVD)?** Ne šajā lapā — tie ir attēli bez teksta slāņa. OCR ir jābūt pirmajai, un šī lapa to nedara.",
     "**Izvilktajiem subtitriem ir nepareizs laiks — kāpēc?** Šī lapa nekoriģē laika skalas; tas, kas iznāk, bija tur. Globālai nobīdei vai ātruma problēmai izmantojiet [[Laika skalas pielāgošana|/shift.html]].",
     "**Kāpēc paiet tik ilgs laiks, pirms kaut kas notiek?** Liels fails ir jānoskenē pa gabaliem celiņa informācijas dēļ, un jo lielāks fails, jo ilgāk tas aizņem; tas notiek lokāli un tam nav nekāda sakara ar jūsu savienojumu.",
     "**Vai varu izmantot šo lapu ārējiem subtitru failiem?** Jums tas nav jādara — ārējs .srt / .ass iet tieši uz [[Formātu konvertēšana|/convert.html]] vai citu rīku. Šī lapa ir paredzēta subtitriem, kas ir noslēgti video iekšpusē."
    ]
   },
   {
    "h2": "Privacy :: Privātums",
    "ps": [
     "Video tiek nolasīts pilnībā pārlūkprogrammā: nekas netiek augšupielādēts, nekas netiek transkodēts, nekas neiet cauri serverim. Aizveriet lapu, un nolasītie dati tiek atbrīvoti."
    ]
   },
   {
    "h2": "Saistītie rīki un ceļveži",
    "ps": [
     "Lai iztulkotu to, ko izvelkat, dodieties uz [[Subtitru tulkošana|/translate.html]], lai padarītu to divvalodu, skatiet [[Divi veidi, kā izveidot divvalodu subtitrus|/guides/make-bilingual-subtitles.html]]; par atšķirību starp iegultajiem un ārējiem celiņiem un kuriem no tiem var izvilkt, skatiet [[Kā dabūt subtitrus ārā no video|/guides/extract-subtitles-from-video.html]]."
    ]
   }
  ]
 },
 "vtt-to-srt": {
  "seo": {
   "title": "VTT uz SRT konvertētājs – Konvertēt WebVTT subtitrus – AI-SRTSub",
   "desc": "Konvertējiet VTT (WebVTT) subtitrus uz SRT redaktoriem un atskaņotājiem, kas ņem tikai SRT. WEBVTT galvene un NOTE bloki tiek automātiski notīrīti. Darbojas jūsu pārlūkprogrammā.",
   "h1": "VTT to SRT :: VTT uz SRT",
   "intro": "Pārvērtiet VTT (WebVTT) subtitrus par SRT: nometiet failu, izvēlieties SRT, lejupielādējiet. Galvenes un piezīmju bloki tiek notīrīti, un laika zīmogi atgriežas pie komata apzīmējuma.",
   "ctaText": "Convert VTT → SRT :: Konvertēt VTT → SRT"
  },
  "body": [
   {
    "h2": "Kad jums ir nepieciešams atpakaļ SRT",
    "ps": [
     "CapCut, Premiere, lielākā daļa darbvirsmas atskaņotāju un vecāki subtitru rīki pieņem tikai **SRT**. Subtitri, kas lejupielādēti no tīmekļa vai YouTube, parasti ir VTT formātā — konvertējiet tos uz SRT, lai importētu tieši."
    ]
   },
   {
    "h2": "Kas tiek notīrīts no VTT",
    "ps": [
     "**WEBVTT galvenes rinda**, NOTE bloki, STYLE/REGION bloki un norāžu iestatījumi pēc laika līnijas (piemēram, align:start) nav subtitru teksts — tie tiek automātiski atmesti; numerācija tiek atjaunota un milisekuļu atdalītājs atgriežas no punkta uz komatu."
    ],
    "img": {
     "file": "convert-upload-vtt",
     "alt": "Augšupielādes zona: ielādēts VTT fails, atpazīts kā VTT",
     "cap": "Fails ar WEBVTT galveni tiek uzreiz atpazīts kā VTT"
    }
   },
   {
    "h2": "How to convert :: Kā konvertēt",
    "ps": [
     "Atveriet [[konvertētājs|/convert.html]], nometiet VTT, izvēlieties **SRT - SubRip** kā izvadi, pēc tam konvertējiet un lejupielādējiet. Teksta un laika vērtības paliek neskartas."
    ],
    "img": {
     "file": "convert-result-srt",
     "alt": "Konvertēšanas rezultāts: SRT numerācija ar komatu laika zīmoga formātu",
     "cap": "Konvertētais SRT: norāžu numuri + laika zīmogi ar komatu"
    }
   }
  ]
 }
};
