/* i18n/gd-lt.js —— 43 篇指南页的lt译文（由 _mkgd.js 生成，勿手改）
 * 源：_gd/lt.json（Gemini 翻译，_gemgd.js 产出）
 * 结构：{ <slug>: { seo:{title,desc,h1,intro,ctaText}, body:[{h2,ps[],img}] } }
 * ⚠️ server.js 自己 require 它，不被任何 html 引用 —— 部署时必须显式加进传输列表。
 */
module.exports = {
 "ass-to-srt": {
  "seo": {
   "title": "ASS į SRT konverteris – Konvertuoti ASS/SSA subtitrus – AI-SRTSub",
   "desc": "Konvertuokite ASS (ir SSA) subtitrus į paprastą SRT: tekstas ir laiko žymos ištraukiami tokie, kokie yra, stiliaus žymos lieka praeityje. Programinei įrangai, kuri palaiko tik SRT. Veikia jūsų naršyklėje.",
   "h1": "ASS į SRT",
   "intro": "Paverskite ASS (arba SSA) subtitrus į SRT: įmeskite failą, pasirinkite SRT, atsisiųskite. Tekstas ir laiko žymos ištraukiami tokie, kokie yra; stiliaus žymos neperkeliamos.",
   "ctaText": "Konvertuoti ASS → SRT"
  },
  "body": [
   {
    "h2": "Kai vėl prireikia SRT",
    "ps": [
     "Redagavimo programos, priedai (set-top boxes), televizoriai, vertimo įrankiai – daugelis tolesnių etapų palaiko tik **SRT**. Įmantrus stilius ir pozicionavimas ASS formatu ten nieko nereiškia, todėl paprastas SRT yra saugiausias pasirinkimas."
    ]
   },
   {
    "h2": "Kas nutinka stiliaus žymoms",
    "ps": [
     "Kiekviena ASS eilutė yra Dialogo (Dialogue) eilutė, kurios tekste dažnai yra nepaisymo žymų, tokių kaip `{\\fonts}` spalvai, judesiui ar efektams. Konvertuojant į SRT, **šios žymos pašalinamos kartu su stiliumi**, paliekant tik tekstą ir laiko žymas; `\\N` eilutės lūžimai tampa tikrais eilutės lūžimais. SSA failai taip pat skaitomi."
    ],
    "img": {
     "file": "convert-result-srt",
     "alt": "Konvertavimo rezultatas: SRT numeravimas ir tekstas, ištrauktas iš ASS",
     "cap": "Ištrauktas SRT: vienas numeris kiekvienai eilutei, švarus tekstas"
    }
   },
   {
    "h2": "Kaip konvertuoti",
    "ps": [
     "Atidarykite [[konverterį|/convert.html]], įmeskite ASS failą (.ssa taip pat tinka), pasirinkite **SRT - SubRip** kaip išvestį, tuomet konvertuokite ir atsisiųskite. Darote atvirkščiai? Žiūrėkite [[SRT į ASS|/guides/srt-to-ass.html]]."
    ]
   }
  ]
 },
 "batch": {
  "seo": {
   "title": "Kaip paketu konvertuoti subtitrus – Šimtus į vieną ZIP – AI-SRTSub",
   "desc": "Vadovas: įmeskite dešimtis SRT/VTT failų, konvertuokite juos į vieną formatą, atsisiųskite vieną ZIP. Perumeruota, laiko žymos normalizuotos, nesuparsuoti failai pažymėti, o ne slapta įtraukti į archyvą.",
   "h1": "Kaip paketu konvertuoti subtitrus",
   "intro": "Visas subtitrų sezonas paprastai turi baigtis vienu formatu, o kelti juos po vieną užtrunka amžinybę. Įmeskite juos visus čia, konvertuokite kartu ir atsisiųskite vieną ZIP – failai, kurių nepavyksta išpakuoti (suparsuoti), pažymimi, o ne tyliai supakuojami taip, tarsi viskas būtų pavykę.",
   "ctaText": "Atidaryti paketinį konvertavimą"
  },
  "body": [
   {
    "h2": "Ką daro šis įrankis",
    "ps": [
     "Subtitrai visam sezonui ar serialų rinkiniui paprastai turi būti vienodi, kad su jais būtų galima daryti kažką kita. Štai ką daro paketinis puslapis:"
    ]
   },
   {
    "h2": "Failų pridėjimas",
    "ps": [
     "Nutempkite kelis subtitrų failus į brūkšninį laukelį arba spustelėkite ir pažymėkite kelis iš karto. Failų sąraše rodomas kiekvienas: suparsuoti failai rodo eilučių skaičių, nesuparsuoti pažymimi paprastai kaip neatpažinti. Viršutinėje juostoje suskaičiuojamas bendras failų bei eilučių skaičius ir kiek jų liko neatpažintų.",
     "⚠️ Šis puslapis skaito tik UTF-8 formatą. Bet kas su sugadinta koduote (klaustukų ar langelių pilnas ekranas) pirmiausia turėtų būti pataisyta per [[Koduotės pataisymą|/repair.html]]."
    ],
    "img": {
     "file": "batch-list",
     "alt": "Failų sąrašas: pavadinimas ir eilučių skaičius kiekviename faile, neatpažinti pažymėti raudonai",
     "cap": "Kiekvienas failas išvardytas, o neatpažinti iškart pažymėti"
    }
   },
   {
    "h2": "Į kokį formatą viską konvertuoti",
    "ps": [
     "Pasirinkite tikslinį formatą skiltyje „Konvertuoti viską į“ („Convert all to“) – SRT arba VTT. Kiekvienas failas sąraše iš naujo sugeneruojamas tuo formatu: eilutės numeruojamos iš naujo nuo viršaus, laiko žymos normalizuojamos pagal paskirtį (SRT milisekundes skiria kableliu, VTT – tašku).",
     "**Originalūs failų pavadinimai išsaugomi ir pasikeičia tik plėtinys**; prie pasikartojančių pavadinimų pridedamas skaičius, kad niekas nebūtų perrašytas."
    ],
    "img": {
     "file": "batch-up",
     "alt": "Paskirties formato parinkiklis ir sąrašo būsena su statistikos juosta, rodančia failų ir eilučių skaičių",
     "cap": "Pasirinkite tikslinį formatą ir kiekvienas failas iš naujo sugeneruojamas; failų pavadinimams pasikeičia tik plėtinys"
    }
   },
   {
    "h2": "Pakavimas ir atsisiuntimas",
    "ps": [
     "Spustelėkite „Supakuoti į vieną ZIP ir atsisiųsti“ („Pack into one ZIP and download“) ir archyve bus visi konvertuoti failai. **Failai be atpažįstamų eilučių į archyvą nepatenka** – jie lieka sąraše pažymėti, o ne sumaišomi taip, tarsi viskas būtų pavykę. Supakavus gausite pranešimą, kiek failų yra viduje."
    ],
    "img": {
     "file": "batch-zip",
     "alt": "Pakavimo sritis: ZIP atsisiuntimo mygtukas ir pakavimo rezultato pranešimas",
     "cap": "Neatpažinti failai lieka ne archyve ir lieka pažymėti sąraše"
    }
   },
   {
    "h2": "Kodėl failas pažymimas kaip neatpažintas",
    "ps": [
     "Failas pažymimas, kai iš jo nepavyksta perskaityti jokių eilučių. Trys įprastos priežastys: tai išvis nėra subtitrai (tarkime, pasiklydęs .txt failas su informacija), koduotė nėra UTF-8 (todėl skaitoma tik kaip pakaitiniai simboliai) arba turinys buvo sulygiuotas į vieną bloką be jokių laiko žymų.",
     "Su pažymėtais failais galima tvarkytis atskirai: kilus problemoms dėl koduotės, eikite į [[Koduotės pataisymą|/repair.html]], kilus problemoms dėl formato – į [[Formato konverterį|/convert.html]] vienetiniam konvertavimui prieš grįžtant į sąrašą."
    ]
   },
   {
    "h2": "DUK",
    "ps": [
     "**Kiek failų galiu pridėti?** Griežto limito nėra; tai priklauso nuo jūsų naršyklės atminties, o keli šimtai SRT failų paprastai tinka puikiai.",
     "**Ar tai keičia mano dialogus?** Ne. Paketinis konvertavimas keičia tik konteinerio formatą – perumeruoja eilutes ir normalizuoja laiko žymas – ir nepakeičia nė vieno dialogo žodžio.",
     "**Ką daryti, jei man reikia pakeisti turinį?** Šis puslapis tik konvertuoja formatus. Norėdami masiškai pakeisti laiką, naudokite [[Laiko koregavimą|/shift.html]]; norėdami pakeisti žodžius – [[Terminų keitimą|/glossary.html]]; abu veikia su kiekvienu failu atskirai.",
     "**Ar palaikomas ASS?** Šis puslapis konvertuoja tik tarp SRT ir VTT. ASS turi stilius – naudokite [[Formato konverterį|/convert.html]] jam atskirai."
    ]
   },
   {
    "h2": "Privatumo politika",
    "ps": [
     "Konvertavimas ir pakavimas vyksta tik jūsų naršyklėje. Joks subtitrų turinys niekada nesiunčiamas į serverį."
    ]
   },
   {
    "h2": "Susiję įrankiai ir gidai",
    "ps": [
     "Ką keisti visam sezonui ir kokia tvarka – [[Viso subtitrų sezono paketinis redagavimas|/guides/batch-convert-srt.html]]; daugiau formatų vienam failui – [[Formato konverteris|/convert.html]]; korektūra skaičiuoklėje – [[Subtitrai ⇄ lentelė|/table.html]]."
    ]
   }
  ]
 },
 "batch-convert-srt": {
  "seo": {
   "title": "Viso sezono paketinis redagavimas – kas pasiteisina mastu, o kas ne – AI-SRTSub",
   "desc": "Sezonui paprastai reikia tų pačių pokyčių visur: vienodo formato, laiko poslinkio, terminologijos. Štai kas atliekama per vieną kartą, ko neįmanoma ir kaip elgtis su failais, kurių nepavyksta suparsuoti.",
   "h1": "Viso subtitrų sezono paketinis redagavimas",
   "intro": "Kai reikia pakeisti dešimtis subtitrų failų, paprastai kiekvieną kartą daromas tas pats pakeitimas. Žinojimas, kurias dalis galima atlikti per vieną kartą, sutaupo kur kas daugiau laiko nei dorotis su jais po vieną.",
   "ctaText": "Atidaryti paketinį konvertavimą"
  },
  "body": [
   {
    "h2": "Tai dažniausiai tie patys pokyčiai visur",
    "ps": [
     "Kai viso sezono subtitrai sugenda, kiekvienas epizodas retai turi savo unikalią problemą – dažniausiai tai viena priežastis, veikianti kiekvieną epizodą: ta pati išleidimo grupė juos visus užkodavo (todėl formatas ir vandenženkliai sutampa), visi jie buvo sinchronizuoti su ta pačia vaizdo versija (todėl poslinkio kryptis ir dydis sutampa) arba transliteracijos per sezoną išsiskyrė.",
     "Pirmiausia patikrinkite du epizodus – vieną ankstyvą, vieną vėlyvą – ir įsitikinkite, kad tai tikrai **ta pati problema**, prieš pradėdami paketinį apdorojimą. Jei jiedu nesutampa, paketo įrankis to neištaisys."
    ]
   },
   {
    "h2": "Ką galima padaryti vienu ypu",
    "ps": [
     "**Formato suvienodinimas** yra vienintelis dalykas, kuris tikrai atliekamas per vieną kartą: kartu nutempkite dešimtis SRT ir VTT failų į [[Paketinį konvertavimą|/batch.html]], pasirinkite tikslinį formatą ir atsisiųskite vieną ZIP. Numeravimas ir laiko žymų normalizavimas atliekami tame pačiame žingsnyje, ir nepakeičiamas nė vienas dialogo žodis."
    ],
    "img": {
     "file": "batch-list",
     "alt": "Paketo puslapio failų sąrašas: eilučių skaičius faile, neatpažinti pažymėti raudonai",
     "cap": "Vienodas formatas yra vienintelis dalykas, kuris tikrai atliekamas per vieną kartą"
    }
   },
   {
    "h2": "Ką reikia daryti failas po failo",
    "ps": [
     "Šie neturi paketinio įėjimo taško ir reikalauja apdorojimo kiekvienam failui atskirai, nors paprastai yra atitikmuo, kurį **reikia atlikti tik vieną kartą, o tada jis taikomas visam sezonui**:"
    ]
   },
   {
    "h2": "Nustatykite teisingą tvarką",
    "ps": [
     "Kai reikia atlikti kelis dalykus, neteisinga tvarka reiškia perdirbimą. Eikite šia tvarka:",
     "**Pataisykite koduotę** → **suvienodinkite formatą** → **pakeiskite turinį** (vandenženklius, terminologiją, laiką) → **atlikite kokybės kontrolę gale**. Formatu konvertavimas prieš pataisant koduotę suteikia tik netvarką kitame konteineryje; turinio keitimas prieš suvienodinant formatus reiškia darbą su nesuderinamu įrankių palaikymu."
    ],
    "img": {
     "file": "batch-zip",
     "alt": "Pakavimo sritis: ZIP atsisiuntimo mygtukas ir rezultato pranešimas",
     "cap": "Pirmiausia suvienodinkite formatus, po to keiskite turinį"
    }
   },
   {
    "h2": "Kaip elgtis su failais, kurie nebuvo atpažinti",
    "ps": [
     "Paketinio konvertavimo metu kaip neatpažinti pažymėti failai neįtraukiami į ZIP ir lieka sąraše. Trys įprastos priežastys: tai nėra subtitrų failas (pasiklydęs readme failas), koduotė nėra UTF-8 arba turinys buvo sulygiuotas į vieną bloką be laiko žymų.",
     "Su koduotės problemomis kreipkitės į [[Koduotės pataisymą|/repair.html]] atskirai; su formatu problemomis – į [[Formato konverterį|/convert.html]] prieš įkeldami jas atgal į sąrašą. **Neverskite neatpažintų failų į archyvą tik tam, kad padidintumėte skaičių** – trūkstamo epizodo atradimas grotuve kainuoja daug brangiau nei ši minutė, kurią sutaupote."
    ]
   },
   {
    "h2": "Susiję įrankiai ir gidai",
    "ps": [
     "Pilnas paketo gidas – [[Kaip paketu konvertuoti subtitrus|/guides/batch.html]]; vienodi laiko poslinkiai – [[Kaip koreguoti subtitrų laiką|/guides/shift.html]]; paskutinis patikrinimas prieš pristatymą – [[Subtitrų kokybės kontrolė (QC)|/qc.html]]."
    ]
   }
  ]
 },
 "bilingual": {
  "seo": {
   "title": "Kaip padalinti arba sujungti dvikalbius subtitrus – AI-SRTSub",
   "desc": "Keturi būdai pašalinti dvikalbius subtitrus: palikti tik vieną takelį, padalinti į du failus arba sujungti į vieną dviejų eilučių įrašą. Abi formos aptinkamos automatiškai, jūsų naršyklėje.",
   "h1": "Kaip pašalinti dvikalbius subtitrus",
   "intro": "Norite padalinti dvikalbius subtitrus, juos sujungti ar palikti tik vieną takelį? Šis vadovas padeda pereiti visus keturis režimus: kaip veikia aptikimas, kurį režimą pasirinkti ir ką gaunate eksportuodami.",
   "ctaText": "Atidarykite dvikalbių subtitrų šalintuvą"
  },
  "body": [
   {
    "h2": "Kam skirtas šis įrankis",
    "ps": [
     "Turite dvikalbius subtitrus, bet norite tik vieno iš takelių – arba atvirkščiai, norite padalinti arba sujungti du takelius:"
    ]
   },
   {
    "h2": "Kaip jis aptinka dvikalbį turinį",
    "ps": [
     "Dviejų takelių dvikalbiai subtitrai būna dviejų įprastų formų, ir įrankis atpažįsta kiekvieną iš jų – **neatspėdamas kalbos**: **A forma (vienas įrašas, dvi eilutės)** padalija takelius pagal rašto sistemą – kaną, hangulą, hanzi, lotynų ir kitas sistemas, iš viso dešimt; dvi skirtingos sistemos reiškia dvikalbį tekstą, o kas pasirodo pirma, laikoma originalu. Viena sistema (pavyzdžiui, ilga kinų eilutė, padalinta į dvi) traktuojama kaip vienakalbė ir paliekama tokia, kokia yra. **B forma (du atskiri įrašai su identišku laiku)** padalija takelius pagal poziciją – du įrašai tuo pačiu laiko momentu sudaro porą, pirmasis laikomas originalu, o deriniai, turintys bendrą lotynų abėcėlę (kaip anglų-prancūzų ar anglų-vokiečių), taip pat atskiriami teisingai. Kai dvikalbis turinys neaptinkamas, režimo parinkiklis ir pradžios mygtukas yra pilki kartu su aiškiu pranešimu, todėl jis niekada prievarta nepadalina į neteisingus rezultatus."
    ]
   },
   {
    "h2": "Keturi režimai",
    "ps": [
     "Išskleidžiamajame meniu „Kurį norite pasirinkti?“ („Which one do you want?“) pasirinkite vieną iš keturių: **Palikti tik originalą** („Keep original only“) ir **Palikti tik vertimą** („Keep translation only“) sukuria po vieną failą; **Padalinti į du** („Split into two“) sukuria originalų failą ir vertimo failą, o failų pavadinimai automatiškai pažymimi `.orig` / `.dst`, kad būtų išvengta perrašymo; **Sujungti į vieną dviejų eilučių įrašą** („Merge into one two-line entry“) paverčia kiekvieną porą dvikalbiu įrašu – originalas vienoje eilutėje, vertimas kitoje, o vienakalbės poros paliekamos tokios, kokios yra, ir jokia antra eilutė neišgalvojama. Kai keičiate režimus ar išvesties formatus, esamas turinys paleidžiamas iš naujo automatiškai – nereikia vėl spausti Pradėti."
    ],
    "img": {
     "file": "bilingual-modes",
     "alt": "Režimo pasirinkimas dvikalbių subtitrų šalintuve: palikti originalą, palikti vertimą, padalinti į du, sujungti į vieną dviejų eilučių įrašą",
     "cap": "Keturi režimai: palikti vieną takelį, padalinti į du arba sujungti į vieną dviejų eilučių įrašą"
    }
   },
   {
    "h2": "Įvestis ir išvestis",
    "ps": [
     "Skaito septynis formatus – SRT, VTT, ASS, SSA, SBV, LRC, TXT (pirmiausia failo plėtinys, turinio nustatymas kaip atsarginis variantas) – ir eksportuoja keturis: SRT, VTT, ASS, TXT. Veikia bet koks įvesties ir išvesties derinys, todėl pakeliui vyksta konvertavimas tarp formatų. ASS `\\N` eilutės lūžimai atstatomi į tikrus eilučių lūžimus, o efekto žymos šalinamos eksportuojant tarp formatų."
    ]
   },
   {
    "h2": "Rezultatai ir eksportas",
    "ps": [
     "Rezultatai rodomi tik skaitomam teksto laukelyje, kiekvienas failas su eilučių skaičiumi ir bendra trukmės statistika; atsisiuntimo ir kopijavimo mygtukai iškart paima failą. Rezultatų sritis yra peržiūra – čia nėra teksto ar laiko redagavimo. Norėdami atlikti pakeitimus, pirmiausia eksportuokite, tada naudokite atitinkamą įrankį."
    ],
    "img": {
     "file": "bilingual-result",
     "alt": "Šalinimo rezultatų sritis: tik skaitoma peržiūra, eilučių skaičiaus statistika ir atsisiuntimo/kopijavimo mygtukai",
     "cap": "Viso teksto peržiūra + eilučių ir trukmės statistika + atsisiuntimas ir kopijavimas"
    }
   },
   {
    "h2": "DUK",
    "ps": [
     "**Viename įraše anglų kalba yra vienoje eilutėje, o prancūzų – kitoje, kodėl jis nesidalija?** A forma padalija takelius pagal rašto sistemą, todėl dviejų kalbų, kurios viename įraše dalijasi viena sistema, atskirti negalima. Pertvarkykite jį kaip B formą (du įrašai toje pačioje laiko skalėje) ir pozicija pagrįstas padalijimas suveiks.",
     "**Atsisiuntimuose tik vienas failas?** „Palikti tik originalą“, „Palikti tik vertimą“ ir „Sujungti į vieną dviejų eilučių įrašą“ pagal dizainą sukuria vieną failą; tik „Padalinti į du“ duoda du, pažymėtus `.orig` / `.dst`.",
     "**Ar galiu apdoroti paketu?** Po vieną failą; eilės nepalaikomos.",
     "**Ar tai įkelia my subtitrus?** Ne – analizė ir eksportavimas vyksta tik jūsų naršyklėje."
    ]
   },
   {
    "h2": "Susiję gidai",
    "ps": [
     "Norėdami sužinoti greitą būdą padalinti du takelius, žiūrėkite [[Dvikalbių subtitrų padalijimas į du takelius|/guides/split-bilingual-subtitles.html]]; kaip kuriami dvikalbiai subtitrai – [[Du būdai kurti dvikalbius subtitrus|/guides/make-bilingual-subtitles.html]]; mašininiam vertimui – [[AI subtitrų vertimas|/translate.html]]."
    ]
   }
  ]
 },
 "clean": {
  "seo": {
   "title": "Subtitrų valiklis – pašalinkite vandenženklius, reklamas, SDH – AI-SRTSub",
   "desc": "Subtitrų valiklis: 13 taisyklės pašalina vandenženklius, reklamas, SDH subtitrus, HTML žymas, dublikatus; kiekvienas pakeitimas turi skirtumų rodinį (diff) ir gali būti anuliuotas. SRT/VTT/ASS, viskas naršyklėje.",
   "h1": "Kaip naudoti subtitrų valiklį",
   "intro": "Iš interneto atsisiųsti subtitrai dažnai turi vandenženklių, reklamų ir SDH subtitrų. Valiklis taiko 13 taisyklės vienu ypu, o kiekvienas pakeitimas turi skirtumų rodinį ir yra atstatomas.",
   "ctaText": "Atidarykite subtitrų valiklį"
  },
  "body": [
   {
    "h2": "Ką daro šis įrankis",
    "ps": [
     "Atsisiųsti subtitrų failai dažnai turi dalykų, kurių neturėtų turėti. Valiklis juos pašalina taikydamas taisykles:"
    ]
   },
   {
    "h2": "Įkėlimas ir aptikimas",
    "ps": [
     "Nutempkite failą arba spustelėkite norėdami įkelti – palaikomi SRT, VTT, ASS, SSA ir TXT – arba tiesiogiai įklijuokite subtitrų tekstą. Koduotė aptinkama automatiškai: jei UTF-8 dekodavimas sukuria pakaitinius simbolius, grįžtama prie GBK arba Big5, o puslapyje rodoma „Koduotė pataisyta kaip {encoding}“. Jei įkeliate dviejų takelių dvikalbius subtitrus (du identiški laiko grafikai, vienas kinų, kitas anglų), jie sujungiami į vieną dvikalbį takelį su jungikliu „originalas viršuje / vertimas viršuje“."
    ]
   },
   {
    "h2": "13 taisyklių konfigūravimas",
    "ps": [
     "Sąsaja turi keturias grupes su 13 žymimaisiais langeliais: **Žymos ir formatavimas** (ASS efektai, HTML žymos, valdymo simboliai, pernumeruoti po rūšiavimo), **SDH ir garso efektai** (SDH titrai, kalbėtojų etiketės, grynos dainų tekstų eilutės), **Vandenženkliai ir nereikalingi įrašai** (vandenženkliai ir reklamos, pasikartojantys įrašai, tušti įrašai), **Teksto pataisymai** (skyryba ir tarpai, didžiųjų raidžių pataisymas, trumpų eilučių sujungimas). Pagal nutylėjimą įjungti tik „be nuostolių ir patikimi“ elementai; elementai, galintys pašalinti turinį (dainų eilutės, raidžių pataisymas, trumpų eilučių sujungimas), yra išjungti – pažymėkite juos, kai reikia. Kiekvienas elementas turi ⓘ užvedimo patarimą, o bet koks žymimojo langelio pakeitimas vėl paleidžiamas akimirksniu."
    ],
    "img": {
     "file": "clean-opts",
     "alt": "Valymo parinkčių sąsaja: keturios 13 žymimųjų langelių grupės, viršuje rodomas aktyvių skaičius",
     "cap": "Keturios grupės, 13 taisyklės; pagal nutylėjimą įjungti tik be nuostolių elementai, pakeitimai pritaikomi akimirksniu"
    }
   },
   {
    "h2": "Pakeitimų skirtumai ir atšaukimas",
    "ps": [
     "Rezultatai nėra perrašomi tiesiogiai: kiekvienas pakeitimas išvardytas skirtumų (diff) lentelėje su taisyklės žyma (kodėl šis įrašas buvo redaguotas arba ištrintas). Norite grąžinti atgal? Spustelėkite „Atstatyti“ („Restore“) šioje eilutėje; „Atstatyti viską“ („Restore all“) vienu paspaudimu grąžina viską atgal, o paspaudus dar kartą – iš naujo pritaiko pilną valymą. Statistikos juosta rodo originalių / išvalytų / ištrintų / modifikuotų / atstatytų skaičius."
    ],
    "img": {
     "file": "clean-diff",
     "alt": "Pakeitimų skirtumų lentelė: indeksas, laikas, originalus ir išvalytas tekstas, taisyklės žyma kiekvienoje eilutėje",
     "cap": "Kiekvienas pakeitimas turi taisyklės žymą; atstatykite atskiras eilutes arba visas iš karto"
    }
   },
   {
    "h2": "Peržiūra ir eksportavimas",
    "ps": [
     "Perjunkite rodinius „Išvalyta / Originali“ („Cleaned / Original“). Originaliame rodinyje ištrinti įrašai perbraukti ir pažymėti kaip „Ištrinti“ („Deleted“), o eksportuotas failas tiksliai atitinka peržiūrą. Eksportavimo formatai: SRT (numatytasis), VTT, ASS (galimas, kai šaltinis yra ASS, stiliaus skyrius paliekamas toks, koks yra) ir paprasto teksto TXT be laiko žymų. Failo pavadinimas automatiškai gauna `.clean` žymą."
    ],
    "img": {
     "file": "clean-preview",
     "alt": "Viso teksto peržiūra: išvalytas ir originalus rodiniai su statistikos juosta, rodančia skaičius",
     "cap": "Du peržiūros rodiniai, ką matote, tą ir gaunate"
    }
   },
   {
    "h2": "DUK",
    "ps": [
     "**Ar netyčia nebus ištrintas įprastas dialogas?** Vandenženklių taisyklė pirmiausia pašalina vandenženklių eilutes (palikdama dialogo eilutes dvikalbiuose įrašuose) ir ištrina visą įrašą tik tada, kai lieka pėdsakų; SDH pašalinimas liečia tik skliaustuose esantį turinį su SDH raktažodžiais, kuris yra 40 simbolių ar trumpesnis – įprastas tėvų ar skliaustuose esantis dialogas lieka nepaliestas.",
     "**Kaip grynų dainų tekstų eilutės atskirose nuo dainų tekstų dialogo viduje?** Ištrinami tik tie įrašai, kuriuose kiekviena eilutė yra apsupta ♪ muzikos natų arba žymų, tokių kaip [music]; dialogas, kurio sudėtyje yra dainų tekstų, yra išsaugomas.",
     "**Ar kalbėtojų etiketės gali pataikyti į kinų tekstą?** Sutampa tik didžiosiomis raidėmis parašytas raidinis ir skaitmeninis vardas eilutės pradžioje, po kurio eina dvitaškis (kaip `GEORGE:`); kinų kalbos dvitaškio sakiniai – niekada.",
     "**Ar galiu valyti kelis failus iš karto?** Ne – vienas failas per vykdymą. Atsisiųskite rezultatą, tada įkelkite kitą."
    ]
   },
   {
    "h2": "Privatumo politika",
    "ps": [
     "Valymas vyksta visiškai jūsų naršyklėje; joks subtitrų turinys niekada nesiunčiamas į serverį."
    ]
   },
   {
    "h2": "Susiję įrankiai ir gidai",
    "ps": [
     "Trumpą gidą, skirtą vandenženklių ir reklamų šalinimui, rasite čia – [[pašalinti subtitrų reklamas ir vandenženklius|/guides/remove-subtitle-ads.html]]; prieš pateikdami failą, paleiskite jį per [[subtitrų kokybės patikrinimą|/guides/subtitle-quality-check.html]]; norėdami pakeisti formatus, naudokite [[formato konvertavimą|/convert.html]]."
    ]
   }
  ]
 },
 "convert": {
  "seo": {
   "title": "Kaip konvertuoti subtitrų formatus (SRT, VTT, ASS, SBV, LRC, TXT) – AI-SRTSub",
   "desc": "Iliustruotas konverterio gidas: įmeskite failą, patikrinkite aptiktą formatą, pasirinkite išvesties formatą, tvarkykite dvikalbį tekstą ir atsisiųskite. Viskas vyksta jūsų naršyklėje.",
   "h1": "Subtitrų formato konverterio gidas",
   "intro": "Šis gidas veda puslapį iš viršaus į apačią: įkelkite subtitrus, patvirtinkite aptiktą formatą, pasirinkite išvesties formatą ir atsisiųskite. Viskas veikia jūsų naršyklėje – joks failas niekada nepalieka jūsų įrenginio.",
   "ctaText": "Atidarykite subtitrų konverterį"
  },
  "body": [
   {
    "h2": "Įkelkite savo subtitrus",
    "ps": [
     "Nutempkite failą į brūkšninį laukelį arba spustelėkite norėdami pasirinkti; taip pat galite **įklijuoti turinį** tiesiai į teksto laukelį. Formatas aptinkamas tiek iš plėtinio, tiek iš turinio, o rezultatas rodomas formato žymoje."
    ],
    "img": {
     "file": "convert-upload",
     "alt": "Įkėlimo sritis: įkeltas pavyzdinis SRT, aptiktas kaip SRT",
     "cap": "Aptiktas formatas rodomas žymoje – jei abejojate, pirmiausia patikrinkite čia"
    }
   },
   {
    "h2": "Pasirinkite išvesties formatą",
    "ps": [
     "Iš išskleidžiamojo meniu pasirinkite tikslinį formatą: šešios parinktys – srt, vtt, ass, sbv, lrc, txt. Konvertuojant į ass, atstatomas fiksuotas 1920×1080 numatytasis stilius (baltas tekstas, juodas kontūras, apačioje centre) ir **neišsaugomi originalūs šriftai ar spalvos**; txt eksportuoja tik tekstą, be laiko."
    ],
    "img": {
     "file": "convert-opt",
     "alt": "Išvesties formato išskleidžiamasis meniu su pasirinktu VTT",
     "cap": "Išvesties formatas neseka įvesties – jį pasirenkate jūs patys"
    }
   },
   {
    "h2": "Dvikalbis tvarkymas",
    "ps": [
     "Jei failas yra dvikalbis (dvi eilutės vienoje eilutėje arba persipynę įrašai), konvertuojant išdėstymas lieka toks, koks yra. Pasirinkus „palikti dvikalbį“, dvi kalbos padalijamos į viršutinę ir apatinę eilutes, kurių kiekviena perkeliamai perrašoma atskirai; valdiklis išjungtas, kai dvikalbis tekstas neaptinkamas."
    ]
   },
   {
    "h2": "Konvertuoti ir atsisiųsti",
    "ps": [
     "Spustelėkite „Konvertuoti“ („Convert“): rezultatų skydelyje rodomas eilučių skaičius ir bendra trukmė, o tekstas paruoštas patikrai. Spustelėkite **Atsisiųsti** („Download“), kad išsaugotumėte failą, arba **Kopijuoti** („Copy“), kad tiesiogiai paimtumėte tekstą. Konvertavimas niekada nekeičia jokių laiko reikšmių – jis perrašo tik formatą. Norėdami pakeisti eilučių laiką, naudokite [[laiko įrankį|/shift.html]]."
    ],
    "img": {
     "file": "convert-result",
     "alt": "Rezultatų skydelis: eilučių skaičius ir bendra trukmė su atsisiuntimo ir kopijavimo mygtukais",
     "cap": "6 eilučių, 0:23 iš viso – peržvelkite tekstą prieš atsisiunčiant"
    }
   }
  ]
 },
 "extract": {
  "seo": {
   "title": "Paprasto teksto ištraukimas iš subtitrų – Du išdėstymai, penki valymai – AI-SRTSub",
   "desc": "Ištraukite dialogą iš subtitrų kaip švarų paprastą tekstą: nepertraukiamas pastraipas arba po vieną eilutę vienam įrašui, ir ką pašalina penki jungikliai SDH įrašams, vandenženkliams, dublikatams, prefiksams ir dainų tekstams.",
   "h1": "Kaip ištraukite paprastą tekstą iš subtitrų",
   "intro": "Ištraukite dialogą iš subtitrų failo kaip švarų paprastą tekstą: eilučių numeriai, laiko grafikai ir stiliaus žymos pašalinami automatiškai, todėl rezultatas skaitomas kaip straipsnis arba veikia kaip dialogų sąrašas.",
   "ctaText": "Atidarykite paprasto teksto ištraukiklį"
  },
  "body": [
   {
    "h2": "Ką daro šis įrankis",
    "ps": [
     "Skaitytojui svarbus tik dialogas subtitrų faile; visa kita yra grotuvui skirta struktūra – eilučių numeriai, laiko grafikai, stiliaus žymos. Šis puslapis pašalina struktūrą ir palieka žodžius."
    ]
   },
   {
    "h2": "Įmeskite, o ne tik įkelkite",
    "ps": [
     "Kairėje esanti „1 Pridėti subtitrus“ („Add subtitles“) skiltis priima įkeltą failą, taip pat galite tiesiogiai įklijuoti subtitrų turinį į teksto laukelį. Jei pasirinkote netinkamą failą, spustelėkite „Išvalyti“ („Clear“) ir pradėkite iš naujo.",
     "Šis puslapis skaito failus kaip UTF-8. Jei subtitrai atsidaro kaip klaustukų ar langelių siena, koduotė sugadinta – pirmiausia konvertuokite ją į UTF-8 per [[Sugadinto teksto pataisymą|/repair.html]], tada sugrįžkite."
    ],
    "img": {
     "file": "extract-up",
     "alt": "Paprasto teksto ištraukiklio subtitrų pridėjimo sritis",
     "cap": "Įkelkite failą arba tiesiogiai įklijuokite subtitrų turinį į teksto laukelį"
    }
   },
   {
    "h2": "Pasirinkimas tarp dviejų išdėstymų",
    "ps": [
     "„2 Ištraukimo parinkčių“ („Extraction options“) viršuje yra išdėstymas: **Nepertraukiamos pastraipos** („Continuous paragraphs“) nutraukia tekstą ties pauzėmis ir sakinio pabaigos skyryba, todėl skaitosi kaip straipsnis; **Viena eilutė viename įraše** („One line per cue“) duoda po vieną eilutę vienam subtitrų įrašui, tiksliai atitinkančią originalaus failo įrašus.",
     "Dialogo kopijavimas užrašams, vertimo praktika arba skaitymas kaip proza reikalauja nepertraukiamų pastraipų; dialogų lapo kūrimas, eilutė po eilutės lyginimas su originalu arba kito įrankio maitinimas reikalauja vienos eilutės vienam įrašui."
    ],
    "img": {
     "file": "extract-opt",
     "alt": "Išdėstymo ir valymo jungikliai ištraukimo parinktyse",
     "cap": "Pasirinkite vieną išdėstymą; penki žemiau esantys jungikliai nusprendžia, koks turinys pašalinamas"
    }
   },
   {
    "h2": "Ką pašalina kiekvienas iš penkių valymų",
    "ps": [
     "**Pašalinti SDH įrašus** („Remove SDH cues“): ištrina skliausteliuose esančius garso aprašymus, tokius kaip „(footsteps)“ arba „[music]“, ir palieka dialogą.",
     "**Pašalinti vandenženklius ir reklamas** („Remove watermarks and ads“): pašalina eilutes, tokias kaip titrų kūrėjų kreditai, URL ir kanalų rankenėlės (handles).",
     "**Pašalinti pasikartojančius kaimynus** („Remove duplicate neighbours“): kai tas pats sakinys pasirodo du kartus iš eilės (atkūrimo triktis), paliekama tik viena kopija; toliau esantys dublikatai turi prasmę ir paliekami ramybėje.",
     "**Pašalinti kalbėtojų prefiksus** („Remove speaker prefixes“): „JOHN: Hello“ tampa „Hello“. Pagal nutylėjimą išjungta – scenarijaus stiliaus tekstui reikia parodyti, kas kalba.",
     "**Praleisti dainų tekstų eilutes** („Skip lyric lines“): eilutės, kurios yra visiškai „♪ … ♪“, praleidžiamos. Pagal nutylėjimą išjungta – dainų tekstai irgi yra žodžiai."
    ],
    "img": {
     "file": "extract-clean",
     "alt": "Penki valymo jungikliai ir jų aprašymai ištraukimo parinktyse",
     "cap": "Kiekvienas jungiklis dešinėje nurodo, ką jis pašalina; pažymėkite tuos, kurių jums reikia"
    }
   },
   {
    "h2": "Rezultato pasiėmimas",
    "ps": [
     "Dešinėje esanti „3 Rezultatas“ („Result“) skiltis rodo ištrauktą tekstą gyvai ir perskaičiuoja vos pakeitus parinktį.",
     "Kai būsite patenkinti, spustelėkite „Atsisiųsti“ („Download“), kad išsaugotumėte .txt, arba „Kopijuoti“ („Copy“), kad pasiimtumėte tekstą kartu. Kalboms, kurios neskiria žodžių tarpais, pavyzdžiui, kinų ir japonų, eilučių sujungimas laikosi skirtingų taisyklių, o įrankis tuo pasirūpina kiekvienai kalbai automatiškai."
    ],
    "img": {
     "file": "extract-out",
     "alt": "Rezultatų sritis su atsisiuntimo ir kopijavimo mygtukais",
     "cap": "Rezultatas atsinaujina gyvai; atsisiųskite jį kaip txt arba nukopijuokite tiesiogiai"
    }
   },
   {
    "h2": "Kas paliekama nepaliesta",
    "ps": [
     "Pats dialogas nėra perrašomas. Valymo jungikliai nusprendžia tik tai, kurios visos eilutės ar blokai yra pašalinami; jie niekada nekeičia įrašo formuluotės.",
     "Laiko grafikai ir eilučių numeriai tiesiog išvis neišvedami, o ne pakeičiami ir tada išvedami – originalus failas lieka nepaliestas, o šis puslapis nesiūlo eksportavimo su laiko grafikais. Šis darbas priklauso [[Formato konvertavimui|/convert.html]]."
    ]
   },
   {
    "h2": "Dažni klausimai",
    "ps": [
     "**Ar ASS stiliaus žymos lieka tekste?** Ne. ASS `{}` nepaisymo blokai pašalinami ir lieka tik dialogas.",
     "**Ar dvikalbis failas išsiduoda kaip dvi eilutės ar kaip viena?** Tiek eilučių, kiek turėjo įrašas; šis puslapis jų nei sujungia, nei padalina – norėdami juos atskirti, naudokite [[Dvikalbį padalijimą|/bilingual.html]].",
     "**Kodėl kalbėtojų prefiksai pagal nutylėjimą paliekami?** Vardas „JOHN: Hello“ dažnai yra naudinga informacija (scenarijai, dialogų lapai), o jos pašalinimas apsunkina supratimą, kas kalba, todėl pasirinkimas paliekamas jums.",
     "**Ar galima ištraukti ir LRC dainų tekstų failus?** Taip. LRC laiko žymos pašalinamos, o dainų tekstų eilutės lieka; jei dainų tekstų nenorite, pažymėkite „Praleisti dainų tekstų eilutes“."
    ]
   },
   {
    "h2": "Privatumo politika",
    "ps": [
     "Subtitrai apdorojami tik naršyklėje: niekas neįkeliama ir niekas nepraeina per serverį. Tekstas lieka tik esamame puslapyje ir išvalomas atnaujinus."
    ]
   },
   {
    "h2": "Susiję įrankiai ir gidai",
    "ps": [
     "Norėdami suprasti, ką iš tikrųjų turi subtitrų failas, žr. [[Kas yra SRT failo viduje|/guides/srt-file-format.html]]; norėdami išversti ištrauktą dialogą, eikite į [[Subtitrų vertimas|/translate.html]]; norėdami paversti jį lentele, naudokite [[Subtitrai į Excel/CSV|/guides/srt-to-excel.html]]; ir prieš ką nors perduodant, paleiskite [[Subtitrų kokybės kontrolę (QC)|/qc.html]]."
    ]
   }
  ]
 },
 "extract-subtitles-from-video": {
  "seo": {
   "title": "Subtitrų ištraukimas iš vaizdo įrašo – Įterpti vs išoriniai – AI-SRTSub",
   "desc": "Ką neša MKV / WebM / MP4 / MOV, kuo skiriasi teksto, ASS, WebVTT ir mov_text takeliai, kodėl vaizdo subtitrai (PGS / DVD) neturi teksto ir ką daryti po ištraukimo.",
   "h1": "Subtitrų ištraukimas iš vaizdo įrašo",
   "intro": "Subtitrai gali gyventi vaizdo įrašo faile arba stovėti atskirai už jo ribų. Viduje jie yra konteinerio takelis – jų ištraukimas neturi nieko bendra su perkodavimu.",
   "ctaText": "Atidarykite vaizdo subtitrų ištraukimą"
  },
  "body": [
   {
    "h2": "Kur gyvena subtitrai: įterpti ir išoriniai",
    "ps": [
     "Vaizdo įrašo failas (MKV, MP4) yra konteineris, kuriame vienu metu yra vaizdo takelis, garso takelis ir subtitrų takeliai. Viduje užsandarinti subtitrai yra **įterpti**; atskiras .srt / .ass failas, esantis išorėje, yra **išorinis**, o įterptas takelis taip pat vadinamas **įmušimu** (muxed in).",
     "Išorinius subtitrus galima naudoti tokius, kokie jie yra. Problema yra įterptieji: norint juos redaguoti, išversti arba sukurti dvikalbį takelį iš originalo, neturite subtitrų failo rankose – pirmiausia turite nuskaityti takelį iš konteinerio. Šis žingsnis nėra perkodavimas: vaizdo įrašas iš naujo nekoduojamas, nuskaitomi tik konteineryje jau išsaugoti duomenys."
    ]
   },
   {
    "h2": "Kuris konteineris ką neša",
    "ps": [
     "Skirtingi konteineriai palaiko skirtingus subtitrų formatus, o ištraukimo sudėtingumas taip pat skiriasi:"
    ],
    "img": {
     "file": "videosub-which",
     "alt": "Įterptųjų subtitrų ištraukimo puslapio išvardyti subtitrų takeliai",
     "cap": "Vienas takelis eilutėje, paprastai su kalba ir takelio pavadinimu; kai yra tik vienas, jis ištraukiamas automatiškai"
    }
   },
   {
    "h2": "Kodėl vaizdo subtitrų negalima ištraukti",
    "ps": [
     "„Blu-ray PGS“ ir „DVD“ subtitrai išvis nesaugo jokių simbolių, tik vaizdų seriją su alfa kanalu. Kai grotuvas juos rodo, jis įklijuoja paveikslėlį, o ne atvaizduoja tekstą.",
     "Taigi tokiame takelyje nėra teksto, kurį būtų galima perskaityti – tai ne tai, kad įrankis jo nepalaiko, o tai, kad ten nėra jokių simbolių. Puslapis aiškiai pasako, kai su tuo susiduria.",
     "Vienintelis būdas gauti žodžius – pirmiausia atpažinti simbolius tuose paveikslėliuose (OCR) ir iš to sukurti subtitrus. Tai atskiras procesas nuo takelio ištraukimo."
    ]
   },
   {
    "h2": "Kas dažniausiai vyksta po ištraukimo",
    "ps": [
     "Tai, kas ištraukiama, yra takelis toks, koks jis buvo: įrankis neatspėja kodučių ir netaiso laiko grafikų. Taigi dažnai iškyla du dalykai:",
     "Vienas iš jų yra **sugadintas tekstas** – koduotės problema šaltinio takelyje, kuri vis tiek išeina sugadinta; eikite į [[Kaip pataisyti sugadintą tekstą|/guides/repair.html]], kad nustatytumėte koduotę. Antras dalykas yra **neteisingas laikas** – nesvarbu, ar šaltinis turi įžanginį logotipą, ar kadrų dažnis nesutampa, rezultatas kaip visuma yra pasislinkęs; naudokite [[Laiko koregavimą|/shift.html]], kad jį pastumtumėte arba pakeistumėte mastelį.",
     "Po to, norėdami versti, eikite į [[Subtitrų vertimas|/translate.html]], o norėdami padaryti juos dvikalbiais, žiūrėkite [[Du būdai sukurti dvikalbius subtitrus|/guides/make-bilingual-subtitles.html]]."
    ],
    "img": {
     "file": "videosub-formats",
     "alt": "Rezultatų sritis su SRT / VTT / ASS / TXT eksportavimo formatais",
     "cap": "Ištrauktus subtitrus galima eksportuoti keturiais formatais; ASS šaltinis išlaiko savo stiliaus antraštę ir skiriamąją gebą"
    }
   },
   {
    "h2": "Keletas dalykų, kuriuos lengva suprasti klaidingai",
    "ps": [
     "**Subtitrų ištraukimas nereiškia jų įdeginimo (burning in).** Vaizdo įrašas iš naujo nekoduojamas, todėl vaizdo kokybė ir garsas lieka nepažeisti.",
     "**Ištraukimas neturi įtakos originaliam failui.** Tik skaitomas, niekada nerašomas, ir nepasikeičia nė vienas vaizdo įrašo baitas.",
     "**Didelio failo lėtumas nėra ryšio problema.** Įrankis nuskenuoja takelio informaciją dalimis, o kuo didesnis failas,  tuo ilgiau tai užtrunka; viskas vyksta vietoje.",
     "**Išoriniams subtitrams šio puslapio nereikia.** Jei turite .srt / .ass, eikite tiesiai į [[Formato konvertavimą|/convert.html]]; tik subtitrus, užsandarintus vaizdo įrašo viduje, reikia pirmiausia ištraukti."
    ]
   },
   {
    "h2": "Susiję įrankiai ir gidai",
    "ps": [
     "Išsamų gidą rasite čia – [[Kaip ištraukti į vaizdo įrašą įterptus subtitrus|/guides/videosub.html]]; norėdami išversti tai, ką ištraukėte, eikite į [[Subtitrų vertimas|/translate.html]], norėdami padaryti juos dvikalbiais, žiūrėkite [[Du būdai sukurti dvikalbius subtitrus|/guides/make-bilingual-subtitles.html]]; sugadintam tekstui pradėkite nuo [[Sugadinto teksto pataisymo|/repair.html]]."
    ]
   }
  ]
 },
 "fps-23-976-vs-25": {
  "seo": {
   "title": "Ką iš tikrųjų reiškia 23.976 / 24 / 25 / 30 fps – Subtitrų laikas – AI-SRTSub",
   "desc": "23.976 nėra 24, o 29.97 nėra 30 – trūkstamas 0.1% atsiranda iš NTSC spalvų, o PAL paleidžia filmus 4% greičiau. Kaip tai pastumia jūsų subtitrų laiką ir kaip tarp jų konvertuoti.",
   "h1": "Ką iš tikrųjų reiškia 23.976 / 24 / 25 / 30 fps",
   "intro": "0.1% tarpas tarp 23.976 ir 24 yra televizijos istorijos palikimas. Kartu su PAL „4%“, tai yra priežastis, kodėl filmo eigoje subtitrai vis labiau išsiderina.",
   "ctaText": "Atidarykite laiko koregavimą"
  },
  "body": [
   {
    "h2": "Ką reiškia kiekvienas skaičius",
    "ps": [
     "Kadrų dažnis – tai rodomų paveikslėlių skaičius per vieną sekundę. Keturi, su kuriais susiduriate dažniausiai:"
    ]
   },
   {
    "h2": "Iš kur atsiranda 0.1%",
    "ps": [
     "23.976 = 24 × 1000/1001, o 29.97 = 30 × 1000/1001. Šis „1000/1001“ yra palikimas pridedant spalvą prie NTSC: norint įsprausti spalvų nešiklį nepažeidžiant esamų nespalvotų imtuvų, lauko dažnis buvo sumažintas nuo 60 Hz iki 59.94 Hz (60 × 1000/1001), o kadrų dažnis sumažėjo kartu su juu.",
     "Rezultatas: NTSC regionuose filmai rodomi 23.976 kadrų dažniu vietoj 24. Skirtumas yra 0.1%, arba 3.6 sekundės per valandą – savaip sunkiai pastebimas, bet nesupainiokite jo su žemiau esančiu 4% ir niekada nesujunkite jų į vieną skaičiavimą."
    ]
   },
   {
    "h2": "Iš kur atsiranda 4%",
    "ps": [
     "PAL regionuose filmai rodomi 25 fps dažniu. Filmai nufilmuoti 24 fps ir paprastai leidžiami 25 – nepridėta ir neišimta nė vieno kadro, todėl atkūrimas vyksta 4% greičiau (25/24 ≈ 1.0417). „100“ minučių filmas jo PAL versijoje trunka 96 minutes.",
     "Tai yra **progresyvaus išsiderinimo** šaknis: subtitrai, sukurti pagal originalą, ir vaizdo įrašas PAL versijoje tiksliai sutampa pradžioje, o iki titrų skiriasi keturiomis minutėmis. Joks pasaulinis poslinkis to neišgelbės; tai turi būti pakeista proporcingai (pagal santykį)."
    ],
    "img": {
     "file": "shift-step-rate",
     "alt": "Laiko puslapio greičio skiltis: santykio įvesties laukelis",
     "cap": "Pakeisti mastelį santykiu – viena vertė apima visą filmą"
    }
   },
   {
    "h2": "Kaip konvertuoti",
    "ps": [
     "Konvertavimas reiškia daugybą iš vieno santykio, kuris taikomas visame filme:"
    ]
   },
   {
    "h2": "Kaip atskirti, kurį turite",
    "ps": [
     "Vietoj to, kad atspėtumėte santykį, suraskite du momentus, kurių teisingu laiku esate tikri – paprastai pirmąją ir paskutinę dialogo eilutes – ir pasakykite įrankiui: „ši eilutė turėtų būti ties 00:00:12, o ana – ties 01:35:40“; jis ištempia visą filmą tiesiškai tarp tų dviejų taškų. Tai yra „dviejų taškų pririšimas“ ir tam nereikia jokių kadrų dažnio skaičiavimų iš jūsų pusės.",
     "Norėdami patys patvirtinti kadrų dažnį, patikrinkite savo grotuvą arba medijos informacijos įrankį. Kai failo pavadinimas, toks kaip `1080p.WEB`, neturi jokių kadrų dažnio užuominų, dviejų taškų pririšimas yra saugesnis kelias."
    ],
    "img": {
     "file": "shift-step-two",
     "alt": "Laiko puslapio dviejų taškų pririšimo skiltis: dvi laiko žymų įvesties eilutės",
     "cap": "Dviejų taškų pririšimui nereikia kadrų dažnio – užtenka dviejų laiko žymų"
    }
   },
   {
    "h2": "Susiję įrankiai ir gidai",
    "ps": [
     "Pats kadrų dažnio konvertavimas – [[Subtitrų kadrų dažnio konvertavimas|/guides/srt-fps-converter.html]]; greičio koregavimas – [[Subtitrų greičio konvertavimas|/guides/subtitle-speed-converter.html]]; nesate tikri, ar tai pasaulinis poslinkis, ar progresyvus išsiderinimas – [[Subtitrai vis labiau išsiderina|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "glossary": {
  "seo": {
   "title": "Paketinis terminų keitimas subtitruose – Viena lentelė sutvarko failą – AI-SRTSub",
   "desc": "Viena taisyklė eilutėje, atskirta per -> , => , → arba Tab, su # komentare. Viso žodžio atitikimas, jautrumas didžiosioms raidėms, dvikalbio įrašo pirma arba antra eilutė, kiekvienas pakeitimas išvardytas ir atstatomas.",
   "h1": "Kaip masiškai pakeisti terminus subtitruose",
   "intro": "Viena terminų lentelė padaro viso subtitrų failo terminologiją nuoseklią vienu ypu – laiko grafika, ASS stiliai ir VTT NOTE blokai nėra paliesti nė vienu simboliu.",
   "ctaText": "Atidarykite paketinį terminų keitimą"
  },
  "body": [
   {
    "h2": "Ką daro šis įrankis",
    "ps": [
     "Tas pats žodis, išverstas dviem skirtingais būdais, mašininio vertimo iškraipomi vardai ir vietos, kažkieno kito subtitrai, kuriuos reikia pritaikyti prie jūsų konvencijų – visi jie turi vieną bendrą bruožą: pasikeičia žodis, o ne struktūra. Šis puslapis keičia tik žodžius."
    ]
   },
   {
    "h2": "Dvi įvestys: subtitrai ir terminų lentelė",
    "ps": [
     "Kairėje esanti „1 Pridėti subtitrus“ („Add subtitles“) skiltis priima subtitrų failą, arba galite tiesiogiai įklijuoti turinį; jei pasirinkote netinkamą failą, spustelėkite „Išvalyti“ („Clear“).",
     "Dešinėje esanti „2 Terminų lentelė“ („Term table“) skiltis talpina taisykles. **Viena taisyklė eilutėje**, kur senas terminas ir naujas terminas atskirti per `->` , `=>` , `→` arba Tab – visi keturi veikia. Eilutės, prasidedančios `#`, yra komentarai ir nedalyvauja keitime.",
     "Jei abejojate dėl formato, spustelėkite „Užpildyti pavyzdį“ („Fill in an example“) ir jį redaguokite."
    ],
    "img": {
     "file": "glossary-up",
     "alt": "Subtitrų pridėjimo sritis ir terminų keitimo puslapio terminų lentelės įvestis",
     "cap": "Subtitrai kairėje, taisyklės dešinėje; viena taisyklė eilutėje, senas ir naujas terminas atskirti per ->"
    }
   },
   {
    "h2": "Kaip parašyti terminų lentelę",
    "ps": [
     "Viena taisyklė eilutėje: esamas terminas kairėje, kuo jis turėtų tapti dešinėje. Pavyzdžiui, `Thor -> Donar` pakeičia kiekvieną „Thor“ faile į „Donar“.",
     "Komentarai prasideda nuo `#` ir yra patogūs grupuojant taisyklėse (pavyzdžiui, „# season 1 name fixes“) ir laikinai išjungiant taisyklę – vietoj ištrynimo tiesiog įdėkite `#` priekyje.",
     "Taisyklės vykdomos nuo viršaus iki apačios; vienos taisyklės sukurtas tekstas vėl nuskenuojamas žemiau esančių taisyklių. Kai svarbi tvarka (tarkime, pirmiausia pakeiskite A į B, o po to B į C), turėkite tai omenyje."
    ],
    "img": {
     "file": "glossary-table",
     "alt": "Keitimo taisyklių eilutė po eilutės terminų lentelės įvestyje",
     "cap": "Viena taisyklė eilutėje; eilutės, prasidedančios #, yra komentarai ir gali laikinai išjungti taisyklę"
    }
   },
   {
    "h2": "Ką daro trys jungikliai",
    "ps": [
     "**Sritis** („Scope“): `all` / `first line only` / `second line only`. Dvikalbiame faile pasirinkite „tik antra eilutė“, kai norite pakeisti tik vertimą; įrašai, turintys tik vieną eilutę, lieka nepaliesti esant bet kuriam vienos eilutės nustatymui – įrankis neatspėja, kuri pusė yra originalas.",
     "**Visas žodis** („Whole word“): pakeičia tik tuos terminus, kurie stovi atskirai kaip žodis, todėl `art` nepalietė `start`. Kalboms, kurios neskiria žodžių tarpais, pavyzdžiui, kinų ir japonų, šis jungiklis neturi jokio poveikio – ten keitimas vyksta pagal vidines dalis (substring).",
     "**Jautrus didžiosioms raidėms** („Case sensitive“): pagal nutylėjimą išjungta, todėl `CEO` ir `ceo` pakeičiami abu; pažymėjus, pakeičiama tik tiksliai tokia pati rašyba."
    ],
    "img": {
     "file": "glossary-opt",
     "alt": "Srities, viso žodžio ir jautrumo didžiosioms raidėms jungikliai po terminų lentele",
     "cap": "Sritis nusprendžia, kuri eilutė keičiasi; visas žodis ir raidžių jautrumas nusprendžia, kaip griežtai sutampa terminas"
    }
   },
   {
    "h2": "Kiekvienas pakeitimas išvardytas, kiekvienas pakeitimas atstatomas",
    "ps": [
     "„3 Rezultatas“ („Result“) rodo pakeistus subtitrus ir taip pat **išvardija kiekvieną pakeitimą**: kuri eilutė, iš ko į ką.",
     "Jei nenorite kurio nors iš jų, spustelėkite jį sąraše, kad atšauktumėte tik tą įrašą – nereikia redaguoti terminų lentelės ir paleisti iš naujo. Kai būsite patenkinti, spustelėkite „Atsisiųsti“ („Download“) arba „Kopijuoti“ („Copy“)."
    ],
    "img": {
     "file": "glossary-out",
     "alt": "Rezultatų sritis su atskirų pakeitimų sąrašu",
     "cap": "Kiekvienas pakeitimas išvardytas; spustelėkite tą, kurio nenorite, kad jį atšauktumėte"
    }
   },
   {
    "h2": "Kas paliekama nepaliesta",
    "ps": [
     "**Laiko grafikai, ASS stiliaus eilutės ir VTT `NOTE` blokai nepaliesti nė vienu simboliu.** Keitimas taikomas tik dialogo tekstui, niekada struktūrinėms eilutėms.",
     "Terminų lentelė niekada automatiškai nemodifikuoja jūsų subtitrų failo – rezultatas yra nauja išvestis, o originalas lieka toks, koks yra."
    ]
   },
   {
    "h2": "Dažni klausimai",
    "ps": [
     "**Kodėl terminas nebuvo pakeistas?** Pirmiausia patikrinkite sritį: pasirinkus „tik antra eilutė“, įrašai, turintys tik vieną eilutę, lieka nepaliesti. Tada patikrinkite viso žodžio atitikimą, kuris sustabdo atitikmenis, kurie nėra atskiri žodžiai.",
     "**Kodėl kinų kalba vis dar keičia vidines dalis, nors pažymėtas viso žodžio atitikimas?** Tai tikėtina. Kinų ir japonų kalbos neskiria žodžių tarpais, todėl įrankis negali nustatyti žodžių ribų, ir viso žodžio atitikimas ten neturi jokio poveikio.",
     "**Kaip man viską atstatyti po klaidos?** Atšaukite įrašus po vieną pakeitimų sąraše; norėdami pradėti iš naujo visiškai, išvalykite terminų lentelę ir vėl pridėkite subtitrus.",
     "**Ar ASS stiliaus eilutės gali būti pakeistos per klaidą?** Ne. Stiliaus eilutės ir `NOTE` blokai yra už apimties ribų; dalyvauja tik dialogo tekstas."
    ]
   },
   {
    "h2": "Privatumo politika",
    "ps": [
     "Subtitrai ir terminų lentelė apdorojami tik naršyklėje: niekas neįkeliama ir niekas nepraeina per serverį. Terminų lentelė nesaugoma, todėl kitą kartą atidarius puslapį ji bus tuščia."
    ]
   },
   {
    "h2": "Susiję įrankiai ir gidai",
    "ps": [
     "Ar kurti terminų lentelę ir kaip ją išlaikyti nuoseklią per sezoną – [[Terminų lentelės: sezono nuoseklumo palaikymas|/guides/subtitle-glossary.html]]; jei turinys nešvarus (vandenženkliai, SDH įrašai), pirmiausia paleiskite [[Subtitrų valymą|/clean.html]]; kai vardai nusistovėjo ir reikia kitų kalbų – [[Subtitrų vertimas|/translate.html]]; ir paleiskite rezultatą per [[Subtitrų kokybės kontrolę (QC)|/qc.html]]."
    ]
   }
  ]
 },
 "hanconv": {
  "seo": {
   "title": "Supaprastintų ir tradicinių subtitrų konvertavimas – Taivanas vs Honkongas – AI-SRTSub",
   "desc": "Devynių krypčių apžvalga: taivanietiški su regioniniu žodynu arba be jo, Honkongas kaip atskiras variantas, visa tai konvertuojama atgal į supaprastintus. Keičiasi tik dialogas; laikas lieka vietoje.",
   "h1": "Kaip konvertuoti supaprastintus ir tradicinius kinų subtitrus",
   "intro": "Nesvarbu, ar subtitrai keliauja į Taivaną, Honkongą ar žemyninę dalį, tai keičia tiek formuluotę, tiek simbolių formas. Galima rinktis iš devynių krypčių, o konvertuojamas tik dialogas – laikas, indekso numeriai ir ASS stiliaus eilutės niekada neliečiami.",
   "ctaText": "Atidarykite konverterį"
  },
  "body": [
   {
    "h2": "Ką daro šis įrankis",
    "ps": [
     "Konvertavimas tarp supaprastintų ir tradicinių nėra tik kiekvieno simbolio rašymas kitaip. Tas pats supaprastintas žodis atitinka skirtingus žodžius skirtinguose regionuose – žodis „programinė įranga“ skiriasi tarp Taivano ir žemyninės dalies, o Honkongas turi dar vieną versiją. Konverteris juos atskiria:"
    ]
   },
   {
    "h2": "Įkėlimas ir aptikimas",
    "ps": [
     "Nutempkite failą arba suraskite jį – palaikomi SRT, VTT, ASS ir TXT – arba tiesiogiai įklijuokite subtitrų turinį į langelį. Formatas aptinkamas automatiškai ir rodomas šalia „Aptiktas formatas“ („Detected format“)."
    ],
    "img": {
     "file": "hanconv-up",
     "alt": "Konverterio įkėlimo sritis: numetimo zona ir įklijavimo dėžutė su aptiktu formatu viršuje",
     "cap": "SRT / VTT / ASS / TXT, formatas aptinkamas automatiškai"
    }
   },
   {
    "h2": "Pasirinkimas iš devynių krypčių",
    "ps": [
     "Devynios kryptys skiltyje „Konvertuoti į“ („Convert to“) skirstomos į tris grupes. **Supaprastinti → tradiciniai**: bendrieji tradiciniai, taivanietiški (keičiant žodyną), taivanietiški (tik rašmenys), Honkongo. **Tradiciniai → supaprastinti**: bendrieji, iš taivanietiškų, iš Honkongo. **Tradiciniai į tradicinius**: Taivano formos, Honkongo formos.",
     "Pasirinkus „Taivano žodyną“, taip pat keičiamas regioninis žodynas: žodis „programinė įranga“ tampa taivanietišku, kaip ir žodis „informacija“; „Taivano rašmenys“ keičia tik tai, kaip rašomi simboliai, ir palieka jūsų formuluotę ramybėje. Honkongas yra visiškai kitas atvejis ir naudoja dar kitokį žodį „programinei įrangai“. Norėdami konvertuoti atgal į supaprastintus, naudokite žemiau esančią grupę – turite nurodyti, iš kurios tradicinės atmainos ateinate, nes taivanietiškas ir Honkongo tekstas atgal eina skirtingais keliais."
    ],
    "img": {
     "file": "hanconv-dir",
     "alt": "Konvertavimo kortelė: paskirties išskleidžiamasis meniu, rodantis pasirinkimą „Supaprastinti → Taivano tradiciniai (keičiant žodyną)“",
     "cap": "Kryptys gyvena išskleidžiamajame meniu „Konvertuoti į“ trijose grupėse; ši yra taivanietiška su žodyno pakeitimais"
    }
   },
   {
    "h2": "Rezultatas ir eksportas",
    "ps": [
     "Rezultatų sritis iškart rodo konvertuotus subtitrus su statistikos juosta, nurodančia bendrą eilučių skaičių ir kiek eilučių pasikeitė. Jei niekas nepasikeitė, gausite užuominą, kad faile gali nebūti jokių kiniškų simbolių – konvertuojami tik Han simboliai, todėl visiškai lotyniškas arba visiškai skaitmeninis subtitras lieka toks, koks buvo.",
     "Tada atsisiųskite arba nukopijuokite. Į failo pavadinimą įterpiama kalbos žyma – `demo.srt` tampa `demo.zh-TW.srt` taivanietiškiems tradiciniams, `.zh-Hant` bendriesji tradiciniai ir `.zh-Hans`, kai konvertuojama atgal į supaprastintus."
    ],
    "img": {
     "file": "hanconv-out",
     "alt": "Rezultatų sritis: konvertuoti subtitrai ir statistikos juosta",
     "cap": "Statistikos juosta rodo bendrą ir pakeistą eilučių skaičių; atsisiųskite arba nukopijuokite iš čia"
    }
   },
   {
    "h2": "Kas niekada neliečiama",
    "ps": [
     "Konvertuojamas tik dialogas. Laiko grafikai, indekso numeriai ir ASS stiliaus eilutės visai neliečiami – rezultatas paruoštas naudoti be jokio pakartotinio formatavimo."
    ]
   },
   {
    "h2": "DUK",
    "ps": [
     "**Kodėl konverteris nepakeitė žodžio „švarus“?** Daugiareikšmiai atitikmenys sprendžiami pagal žodį: „švarus“ prasmė ir „sausas“ prasmė dalijasi viena tradicine forma, o „medžio kamieno“ prasmė naudoja kitą. Lentelės kilusios iš OpenCC, pritaikant visas frazes, o ne vienus simbolius.",
     "**Kuo skiriasi Taivano ir Honkongo tradiciniai?** Žodynu: žodis „programinė įranga“ tarp jų skiriasi. Pasirinkite kryptį regionui, į kurį pristatote.",
     "**Simbolių skaičius pasikeitė po konvertavimo?** Sukeičiami tik Han simboliai – jokie įrašai nepridedami ir nepašalinami, laikas nepajudinamas. Jei eilučių skaičius pasikeitė, patikrinkite, ar formatas buvo aptiktas teisingai.",
     "**Žodynas neįsikėlė?** Puslapis nurodo atnaujinti ir bandyti dar kartą. Jis įsikelia vietoje, todėl subtitrų niekur nereikia kelti."
    ]
   },
   {
    "h2": "Privatumo politika",
    "ps": [
     "Konvertavimas vyksta tik jūsų naršyklėje. Joks subtitrų turinys niekada nesiunčiamas į serverį."
    ]
   },
   {
    "h2": "Susiję įrankiai ir gidai",
    "ps": [
     "Jei jums tereikia supaprastintų į tradicinius, žiūrėkite [[Konvertuoti supaprastintus subtitrus į tradicinius|/guides/srt-simplified-to-traditional.html]]; kodėl tai susiję su daugiau nei paprastu simbolių sukeitimu, žr. [[Supaprastinti vs tradiciniai nėra simbolių sukeitimas|/guides/simplified-traditional-chinese.html]]; norėdami išversti į kitą kalbą, [[Subtitrų vertimas|/translate.html]]."
    ]
   }
  ]
 },
 "how-to-make-lrc-file": {
  "seo": {
   "title": "Kaip sinchronizuoti LRC dainos tekstus – Viena eilutė eilutei, bakstelėkite ritmu – AI-SRTSub",
   "desc": "Sukurkite LRC failą nuo nulio: įklijuokite po vieną eilutę, bakstelėkite laiką klausydamiesi, svarbiausios sparčiosios klavišai, kada praleisti eilutę, LRC ar SRT ir ką daryti, kai laiko žymos išsiderina.",
   "h1": "Kaip sinchronizuoti LRC dainos tekstus",
   "intro": "LRC failas yra tiesiog „viena dainos teksto eilutė plius vienas laiko taškas“. Jo kūrimas vadinamas laiko žymėjimu: kiekvienos eilutės pradžios momento užfiksavimu.",
   "ctaText": "Atidarykite dainos tekstų sinchronizavimo įrankį"
  },
  "body": [
   {
    "h2": "Kas iš tikrųjų yra laiko žymėjimas",
    "ps": [
     "LRC failo struktūra vargu ar galėtų būti paprastesnė: viena eilutė teksto, po kurios seka `[mm:ss.xx]` laiko žyma. Kai grotuvas pasiekia eilutę, tuo momentu jis rodo tą tekstą.",
     "Taigi visas „LRC kūrimo“ darbą sudaro laiko taško priskirimas kiekvienai teksto eilutei — ir joks kompiuteris to nepadarys už jus, nes nuspręsti, kur prasideda dainuojama eilutė, reikalauja klausymosi."
    ]
   },
   {
    "h2": "Kiek perklausų dainai reikia",
    "ps": [
     "Verta skirti minutę apmąstymui prieš pradedant; tai sutaupo didžiąją dalį perdarymo:"
    ],
    "img": {
     "file": "lrc-tap2",
     "alt": "Leidimo, šios eilutės žymėjimo, vienos eilutės atšaukimo ir šios eilutės praleidimo valdikliai bakstelėjimo zonoje",
     "cap": "Grojimo metu geriausia spausti „Enter“; pažymėjote ne tą eilutę? Paspauskite Z ir žymėkite vėl"
    }
   },
   {
    "h2": "Teksto įklijavimas lemia, kaip sklandžiai viskas vyks toliau",
    "ps": [
     "Įklijuokite dainos tekstą po vieną eilutę; tuščios eilutės praleidžiamos. Įklijuoti eilutės lūžiai yra eilutės, kurias sinchronizuosite vėliau — dabar padalinkite jas į daugiau eilučių, o vėliau turėsite dažniau bakstelėti.",
     "Įklijuoti esamą LRC taip pat veikia: jo `[mm:ss.xx]` laiko žymos atpažįstamos, o po importavimo jūs **tęsiate nuo pirmos eilutės be laiko**, todėl jau suderintų eilučių nereikia daryti iš naujo.",
     "Tai reiškia, kad pusiau baigtą LRC galima išsaugoti ir vėliau vėl įklijuoti norint tęsti."
    ],
    "img": {
     "file": "lrc-paste2",
     "alt": "Teksto įklijavimo sritis ir teksto analizės mygtukas",
     "cap": "Viena eilutė eilutei; įklijuojant visą LRC nuskaitomi esami laikai, kad galėtumėte tęsti"
    }
   },
   {
    "h2": "Eksportuoti LRC arba SRT",
    "ps": [
     "**Muzikos grotuvui eksportuokite LRC.** „foobar2000“, įvairūs grotuvai ir įrenginiai su dainų tekstų rodymu jį skaito.",
     "**Norėdami įdėti tekstus į vaizdo įrašą arba juos apdoroti toliau, eksportuokite SRT.** Vaizdo įrašų subtitrų takeliai, subtitrų įrankiai ir redagavimo programinė įranga skaito SRT. Eksportuojant kiekviena eilutė tęsiasi iki tol, kol prasideda kita, o paskutinė eilutė grįžta į 2 sekundes.",
     "Abi parinktys eksportuoja tik tas eilutes, kurios turi laiką – praleistos eilutės niekada nepateka į failą."
    ],
    "img": {
     "file": "lrc-export",
     "alt": "Atsisiųsti LRC, atsisiųsti SRT ir kopijavimo mygtukai eksportavimo srityje",
     "cap": "LRC grotuvams, SRT vaizdo įrašams; eksportuojamos tik eilutės su laiku"
    }
   },
   {
    "h2": "Keli dalykai, kuriuos lengva padaryti neteisingai",
    "ps": [
     "**Po sinchronizavimo viskas šiek tiek nukrypsta? Naudokite poslinkį.** Eksportuokite SRT ir perkelkite jį kaip visumą su [[Timeline adjustment|/shift.html]]; tai daug greičiau nei iš naujo žymėti eilutę po eilutės.",
     "**Dainai bėgant nukrypimas auga? Tai greičio problema.** Kai atkūrimo greitis ir įrašymo greitis skiriasi, paklaida auga pabaigos link, o tam reikia proporcingo mastelio keitimo, o ne poslinkio.",
     "**Sparčiosios klavišai atrodo natūraliai tik tada, kai juos naudojate kartu.** „Tarpas“ paleidžia ir sustabdo, „Enter“ pažymi dabartinę eilutę, „Z“ atšaukia vieną eilutę — spauskite „Enter“ tiesiogiai atkūrimo metu, vietoj to, kad perjunginėtumėte pelę ir klaviatūrą.",
     "**Garso kokybė turi įtakos tikslumui.** Šaltinį su aiškiais vokalais sekti lengvesnis; gyvi įrašai ir šaltiniai su garsiais foniniais takeliais pastebimai sunkesni."
    ]
   },
   {
    "h2": "Susiję įrankiai ir vadovai",
    "ps": [
     "Visą instrukciją rasite čia [[How to use the lyric sync tool|/guides/lrc.html]]; norėdami paversti esamą LRC subtitrais, žiūrėkite [[LRC to SRT|/guides/lrc-to-srt.html]]; jei eksportuotas SRT netiksliuoja laiko, naudokite [[Timeline adjustment|/shift.html]]; o galutinį rezultatą paleiskite per [[Subtitle QC|/qc.html]]."
    ]
   }
  ]
 },
 "lrc": {
  "seo": {
   "title": "Dainų tekstų sinchronizavimo įrankis – Įkelkite dainą, įklijuokite tekstą, bakstelėkite ritmu – AI-SRTSub",
   "desc": "Įkelkite dainą, įklijuokite tekstą, klausydamiesi bakstelėkite laiko žymą kiekvienai eilutei ir eksportuokite LRC arba SRT. „Tarpas“ paleidžia ir sustabdo, „Enter“ pažymi eilutę, „Z“ atšaukia, rankos lieka ant klaviatūros.",
   "h1": "Kaip naudoti dainų tekstų sinchronizavimo įrankį",
   "intro": "Įkelkite dainą, įklijuokite tekstą, klausydamiesi bakstelėkite kiekvienos eilutės laiko žymą ir eksportuokite standartinį LRC arba SRT. Garsas groja vietoje ir niekada nėra įkeliamas.",
   "ctaText": "Atidarykite dainų tekstų sinchronizavimo įrankį"
  },
  "body": [
   {
    "h2": "Ką daro šis įrankis",
    "ps": [
     "Suteikite dainai teksto failą, pagal kurį galima dainuoti: viena eilutė teksto, kiekviena eilutė turi laiko tašką. Grotuvai skaito LRC, subtitrų takeliai skaito SRT, ir abu gali būti eksportuoti čia."
    ]
   },
   {
    "h2": "1 Įkelkite dainą",
    "ps": [
     "Pirmasis stulpelis kairėje priima garso failą: **MP3, M4A, FLAC, WAV ir OGG** visi veikia. Garsas groja vietoje ir niekada nėra įkeliamas.",
     "Garso kokybė nedaro įtakos laiko tikslumui, tačiau šaltinį su aiškiais vokalais lengviau sekti; gyvus įrašus ir šaltinius su garsiais foniniais takeliais pastebimai sunkiau sinchronizuoti."
    ],
    "img": {
     "file": "lrc-up",
     "alt": "Dainų tekstų sinchronizavimo įrankio dainos įkėlimo sritis",
     "cap": "MP3 / M4A / FLAC / WAV / OGG visi veikia, o garsas groja tik vietoje"
    }
   },
   {
    "h2": "2 Įklijuokite dainos tekstą",
    "ps": [
     "Įklijuokite dainos tekstą į antrąjį stulpelį, **po vieną eilutę eilutei**; tuščios eilutės praleidžiamos automatiškai. Tada spustelėkite „Analizuoti tekstą“.",
     "Įklijuoti esamą LRC taip pat veikia – jo `[mm:ss.xx]` laiko žymos atpažįstamos, o po importavimo tęsiate nuo pirmos eilutės be laiko, todėl jau suderintų eilučių nereikia daryti iš naujo."
    ],
    "img": {
     "file": "lrc-paste",
     "alt": "Teksto įklijavimo sritis ir teksto analizės mygtukas",
     "cap": "Įklijuokite po vieną eilutę arba įklijuokite visą LRC ir leiskite įrankiui perskaityti esamus laikus"
    }
   },
   {
    "h2": "3 Bakstelėkite ritmu klausydamiesi",
    "ps": [
     "Leiskite dainą ir paspauskite „Enter“ tuo momentu, kai prasideda eilutė (arba spustelėkite „Pažymėti šią eilutę“); tos eilutės laikas įrašomas, o žymeklis peršoka prie kitos.",
     "Sparčiosios klavišai: **tarpas** paleidžia ir sustabdo, **Enter** pažymi dabartinę eilutę, **Z** atšaukia vieną eilutę. „Enter“ paspaudimas atkūrimo metu yra pats sklandžiausias darbo būdas — nereikia nuolat perjunginėti pelės ir klaviatūros.",
     "Pažymėjote ne tą eilutę? Paspauskite Z, kad ją atšauktumėte ir pažymėtumėte iš naujo. Jei nenorite visiškai pažymėti eilutės (instrumentinė pertrauka, grynai muzikalus epizodas), spustelėkite „Praleisti šią eilutę“ ir ji nepasirodys eksportuojant."
    ],
    "img": {
     "file": "lrc-tap",
     "alt": "Leidimo, šios eilutės žymėjimo, vienos eilutės atšaukimo ir šios eilutės praleidimo valdikliai bakstelėjimo zonoje",
     "cap": "„Tarpas“ paleidžia ir sustabdo, „Enter“ pažymi dabartinę eilutę, „Z“ atšaukia — rankos lieka ant klaviatūros"
    }
   },
   {
    "h2": "4 Eksportuoti",
    "ps": [
     "Ketvirtasis stulpelis atlieka eksportavimą: **Atsisiųsti LRC** grotuvams, **Atsisiųsti SRT** vaizdo įrašų subtitrų takeliams arba „Kopijuoti“, kad paimtumėte tekstą tiesiogiai.",
     "Eksportuojamos tik eilutės su laiku; praleistos eilutės niekada nepateka į failą. SRT eksportuojant kiekviena eilutė tęsiasi tol, kol prasideda kita, o paskutinė eilutė grįžta į 2 sekundes."
    ],
    "img": {
     "file": "lrc-out",
     "alt": "Atsisiųsti LRC, atsisiųsti SRT ir kopijavimo mygtukai eksportavimo srityje",
     "cap": "LRC grotuvams, SRT vaizdo įrašams; eksportuojamos tik eilutės su laiku"
    }
   },
   {
    "h2": "Kas lieka nepaliesta",
    "ps": [
     "Dainos teksto žodžiai nėra perrašomi. Laiko žymėjimas prideda tik vieną laiko tašką eilutei ir niekada Neliečia jūsų įklijuotų žodžių.",
     "Kai importuojate esamą LRC, eilutės, kurios jau turi laiko žymą, išlaiko savo pradinį laiką, o jūs žymite tik nuo pirmos nelaiku pažymėtos eilutės."
    ]
   },
   {
    "h2": "Dažniausiai užduodami klausimai",
    "ps": [
     "**Kodėl kai kurios eilutės trūksta eksportuojant?** Praleistos eilutės ir eilutės be laiko niekada nepateka į failą. Grįžkite prie trečio žingsnio ir jas pridėkite arba patvirtinkite, kad jos turėjo būti praleistos.",
     "**Ar laikus galima pakeisti vėliau?** Jei po žymėjimo norite viską šiek tiek pastumti, eksportuokite SRT ir naudokite [[Timeline adjustment|/shift.html]], kad pastumtumėte arba pakeistumėte mastelį kaip visumą.",
     "**LRC ar SRT – kurį turėčiau eksportuoti?** LRC muzikos grotuvams („foobar2000“, transliavimo klientams, įvairiems grotuvams); SRT, kai subtitrai turi būti rodomi vaizdo įraše arba toliau apdorojami subtitrų įrankiais.",
     "**Kiek laiko užtrunka viena diena?** Tai priklauso nuo to, kiek eilučių yra ir kiek tikslumo norite. Dainai iš trisdešimties ar keturiasdešimt eilučių – kelios minutės per perklausą, kai žinote eigą; žodžių lygio tikslumo vaikymasis užtrunka ilgiau."
    ]
   },
   {
    "h2": "Privatumas",
    "ps": [
     "Garsas ir dainų tekstas apdorojami visiškai naršyklėje: niekas neįkeliama ir niekas nekeliauja per serverį. Garsas dekoduojamas ir grojamas tik vietoje."
    ]
   },
   {
    "h2": "Susiję įrankiai ir vadovai",
    "ps": [
     "Jei jau turite LRC ir norite subtitrų, žiūrėkite [[LRC to SRT|/guides/lrc-to-srt.html]]; apie mąstymą ir spąstus už laiko žymėjimo skaitykite [[How to sync LRC lyrics|/guides/how-to-make-lrc-file.html]]; jei eksportuotas SRT išsiderinęs, naudokite [[Timeline adjustment|/shift.html]]; o rezultatą paleiskite per [[Subtitle QC|/qc.html]]."
    ]
   }
  ]
 },
 "lrc-to-srt": {
  "seo": {
   "title": "LRC į SRT keitiklis – Paverskite dainos tekstus subtitrais – AI-SRTSub",
   "desc": "Paverskite LRC tekstus SRT subtitrais: kiekviena eilutė tęsiasi iki tol, kol prasideda kita, paskutinė žyma gauna 3 sekundžių. Dainos po 60 minučių skaitomos teisingai. Veikia jūsų naršyklėje.",
   "h1": "LRC į SRT",
   "intro": "Paverskite LRC tekstinius failus į SRT: numeskite failą, pasirinkite SRT, atsisiųskite. Pabaigos laikai automatiškai užpildomi iš kitos eilutės.",
   "ctaText": "Konvertuoti LRC → SRT"
  },
  "body": [
   {
    "h2": "Kuo LRC skiriasi nuo SRT",
    "ps": [
     "LRC yra dainų tekstų formatas: kiekviena eilutė turi tik „dainavimo pradžios“ laiką `[minutes:seconds.cents]` ir **jokio pabaigos laiko**; kiekvienai SRT žymai reikia ir pradžios, ir pabaigos. Taigi konvertavimo esmė – pabaigos laikų užpildymas."
    ],
    "img": {
     "file": "convert-upload-lrc",
     "alt": "Įkėlimo sritis: įkeltas LRC failas, atpažintas kaip LRC",
     "cap": "Dainos teksto failas su [00:12.50] laiko žymomis iš karto atpažįstamas kaip LRC"
    }
   },
   {
    "h2": "Kaip užpildomi pabaigos laikai",
    "ps": [
     "Taisyklė paprasta: **kiekviena eilutė tęsiasi tol, kol prasideda kita**; paskutinė eilutė neturi „kitos“, todėl gauna 3 sekundžių. Be to, LRC laiko žymose yra tik minutės ir sekundės – jokių valandų – o minučių laukas nepersikelia (62:05 reiškia 1 valandą 2 min 5 s), todėl itin ilgi kūriniai, tokie kaip DJ miksai, skaitomi teisingai."
    ]
   },
   {
    "h2": "Kaip konvertuoti",
    "ps": [
     "Atidarykite [[converter|/convert.html]], įmeskite LRC, pasirinkite **SRT - SubRip** kaip išvestį, tada konvertuokite ir atsisiųskite. Patogu muzikos vaizdo įrašams ir subtitrams grotuvuose įkelti; eksportuotas SRT vėl gali būti konvertuotas į VTT internetui."
    ]
   }
  ]
 },
 "make-bilingual-subtitles": {
  "seo": {
   "title": "Du būdai sukurti dvikalbius subtitrus – AI-SRTSub",
   "desc": "Dvikalbiai subtitrai būna dviejų formų: dvi eilutės vienoje žymoje arba dvi žymos toje pačioje laiko juostoje. Privalumai, trūkumai ir kaip tarp jų perjungti. – AI-SRTSub",
   "h1": "Du būdai sukurti dvikalbius subtitrus",
   "intro": "Tas pats dvikalbis subtitras gali slėpti du visiškai skirtingus išdėstymus. Išmokite juos atskirti, ir kūrimas, skaidymas bei konvertavimas nustos jus painioti.",
   "ctaText": "Dirbkite su dvikalbiais subtitrais"
  },
  "body": [
   {
    "h2": "Kaip atrodo šios dvi formos",
    "ps": [
     "**B forma: dvi žymos toje pačioje laiko juostoje.** Viena dialogų eilutė tampa dviem atskiromis subtitrų žymomis su identišku laiku — viena angliška, viena kinų — nupieštomis viena ant kitos. Tai dažniausias būdas kurti dvikalbius ASS subtitrus."
    ]
   },
   {
    "h2": "Kur kiekvienas iš jų nepakankamas",
    "ps": [
     "A formos silpnoji vieta yra **aptikimas**: takelių skaidymas remiasi rašto sistema, todėl kinų-anglų ar japonų-anglų poras galima atskirti iš pirmo žvilgsnio, o **deriniai, kurie dalijasi viena rašto sistema** — anglų ir prancūzų, arba kinų ir japonų kandži — negali būti atskirti. B formos silpnoji vieta yra **gamyba**: dvi laiko juostos turi tiksliai sutapti, o jų sulyginimas rankomis yra varginantis; kai kurie grotuvai taip pat atvaizduoja abi tos pačios laiko juostos žymas, užgriozdindami ekraną. Nykščio taisyklė: naudokite A formą galutiniams subtitrams, skirtiems žiūrovams; naudokite B formą, kai reikia išskirti takelius tolimesniam darbui."
    ]
   },
   {
    "h2": "Du keliai",
    "ps": [
     "**Sukurkite dvikalbius subtitrus iš originalo**: naudokite [[AI Subtitle Translation|/translate.html]] ir eksportuodami pasirinkite „Bilingual · original on top“ arba „Bilingual · translation on top“ — gausite A formą tiesiogiai; pasirinkus ASS taip pat siūlomi du išdėstymai, „stacked top and bottom“ ir „two lines at the bottom“.",
     "**Sujunkite du takelius arba konvertuokite tarp formų**: naudokite [[Bilingual Subtitle Stripper|/bilingual.html]] ir jo „merge into one two-line entry“ režimą — B forma įeina, A forma išeina; einant kitu keliu, „split into two files“ paima A arba B formą ir pateikia du nepriklausomus takelius."
    ],
    "img": {
     "file": "bilingual-modes",
     "alt": "Keturis dvikalbio šalinimo įrankio režimus; „merge into one two-line entry“ sujungia dvi žymas, kurios dalijasi viena laiko juosta",
     "cap": "„Merge into one two-line entry“: B forma tampa A forma"
    }
   },
   {
    "h2": "Kuris įrenginys jį atkurs",
    "ps": [
     "Žiniatinklio grotuvai (HTML5 `<track>`) ir dauguma mobiliųjų grotuvų patikimiau tvarkosi su A forma; stalinių kompiuterių grotuvai (VLC, mpv, PotPlayer) priima abu ir netgi gali suteikti dviem tos pačios laiko juostos žymoms skirtingas spalvas bei pozicijas. Kilus abejonėms, eksportuokite A formą kaip SRT — ji keliauja geriausiai. Dėl pačių formatų skirtumų žr. [[SRT, VTT or ASS: Which Should You Use|/guides/subtitle-format-comparison.html]]."
    ],
    "img": {
     "file": "translate-export",
     "alt": "Dvikalbio stiliaus parinktys vertimo įrankio eksportavimo skydelyje",
     "cap": "Pasirinkite dvikalbių eilučių tvarką tiesiai eksportuodami — vienas žingsnis ir viskas padaryta"
    }
   },
   {
    "h2": "DUK",
    "ps": [
     "**Dvikalbiai subtitrai atrodo suspausti – ką galiu padaryti?** Valdykite eilutės plotį: vertimo įrankio eksportavimo skydelyje yra „bilingual line width“ nustatymas; siauresnė eilutė reiškia mažiau simbolių žymoje ir švaresnį ekraną.",
     "**Aš noriu tik vieno takelio.** Šalinimo įrankio „keep original only / keep translation only“ viską išsprendžia vienu paspaudimu, žr. [[Split Bilingual Subtitles into Two Tracks|/guides/split-bilingual-subtitles.html]]."
    ]
   }
  ]
 },
 "merge": {
  "seo": {
   "title": "Dvikalbių ir stilių subtitrų sujungimas – Sujungti, stiliuoti, eksportuoti – AI-SRTSub",
   "desc": "Sujunkite du subtitrų failus į dvikalbį takelį, stilizuokite esamą dvikalbį failą arba stilizuokite vienakalbį: poravimo režimai, ASS ir VTT šablonai bei kurį formatą eksportuoti.",
   "h1": "Kaip naudoti dvikalbį sujungimą ir specialiųjų efektų subtitrus",
   "intro": "Sujunkite du subtitrų failus į vieną dvikalbį takelį arba tiesiogiai stilizuokite subtitrus: šriftas, spalva, kontūras ir padėtis yra „tai, ką matote, yra tai, ką gaunate“, o peržiūra atitinka eksportą.",
   "ctaText": "Atidarykite specialiųjų efektų subtitrų įrankį"
  },
  "body": [
   {
    "h2": "Ką daro šis įrankis",
    "ps": [
     "Šis puslapis iš tikrųjų apima tris užduotis: originalių ir išverstų subtitrų failo sujungimą į vieną dvikalbį failą, jau dvikalbio failo tvarkos ir stiliaus reguliavimą, bei specialiųjų efektų pridėjimą prie vienakalbio failo. Visi trys dalijasi tais pačiais stiliaus parametrais ir ta pačia peržiūra."
    ]
   },
   {
    "h2": "Tris darbai, vienas puslapis",
    "ps": [
     "Puslapio viršuje yra trys skirtukai: **Sujungti du failus**, **Koreguoti dvikalbį failą**, **Vienakalbis failas**. Jūsų pasirinkimas nusprendžia, kiek įvesties stulpelių pasirodys kairėje.",
     "Sujungiant du failus, kairėje pusėje yra du stulpeliai, „1 Originalūs subtitrai“ ir „2 Išversti subtitrai“; kiekvienas priima įkeltą failą arba tiesiogiai įklijuotą tekstą. Koreguojant dvikalbį failą ir stilizuojant vienakalbį failą reikia tik vieno stulpelio."
    ],
    "img": {
     "file": "merge-mode",
     "alt": "Trys skirtukai specialiųjų efektų subtitrų įrankio viršuje ir įvesties sritis kairėje",
     "cap": "Trys skirtukai viršuje; pasirinkus „Sujungti du failus“, kairėje iškyla originalo ir vertimo stulpeliai"
    }
   },
   {
    "h2": "Kaip suporuojami du failai",
    "ps": [
     "Pirmasis elementas skiltyje „3 Sujungimo nustatymai“ yra poravimo režimas: **Suporuoti pagal tvarką · naudoti originalią laiko juostą**, **Suporuoti pagal laiko juostą · naudoti originalią laiko juostą**, **Suporuoti pagal tvarką · naudoti išverstą laiko juostą**.",
     "Kai abu failai turi vienodą eilučių skaičių ta pačia tvarka, poravimas pagal tvarką yra saugiausias. Kai skaičiai skiriasi (viena pusė sujungė eilutes, kita jas padalijo), suporuokite pagal laiko juostą ir leiskite įrankiui rasti atitiktis pagal artumą. Kurios laiko juostą naudoti, priklauso nuo to, kuris failas tikslesnis — paprastai originalas.",
     "Žemiau yra teksto struktūra (automatinis aptikimas / dvi eilutės per įrašą / pakaitinės poros) ir tvarka (originalas viršuje / vertimas viršuje)."
    ],
    "img": {
     "file": "merge-pair",
     "alt": "Poravimo režimas, teksto struktūra ir tvarkos parinktys sujungimo nustatymuose",
     "cap": "Poravimo režimas nusprendžia, kuri eilutė eina su kuria, o kieno laiko juostą naudoti, nustatoma taip pat čia"
    }
   },
   {
    "h2": "Koreguokite stilių elementas po elemento",
    "ps": [
     "Stiliaus skydelis yra dešinėje. Kai eksportuojate ASS, taikomas blokas „ASS išvaizda“: išdėstymas (padalintas · atskirtas viršuje ir apačioje / sudėtas · dvi eilutės apačioje), dydis, spalva, nepermatomumas, šriftas, pusjuodis, kursyvas, tarpai tarp raidžių, kontūras, kontūro spalva, šešėlis / fonas (nėra / šešėlis / fonas), gylis, kraštinės spalva, kraštinės nepermatomumas, horizontalus lygiavimas (apačioje · kairėje / apačioje · centre / apačioje · dešinėje) ir atstumas nuo vertimo (pirminės) eilutės apačios, plius originalo (antrinės) eilutės šriftas, šešėlis / fonas ir kairės / dešinės paraštės.",
     "Kai eksportuojate dvikalbio VTT stilių, taikomas blokas „WebVTT stilius“: virš šešių išankstinių nustatymų (standartinis / kompaktiškas / kinematografinis / viršus / prieinamas / portretas) galite pakeisti vertikalią eilutę, inkarą (apačia / viršus / centras), horizontalią padėtį, pločio dydį, lygiavimo reikšmę ir visos žymos eilutės aukštį, plius vertimo eilutės fono spalvą, fono nepermatomumą ir kontūro plotį; originali eilutė gali paveldi pagrindinį stilių arba būti nustatyta atskirai.",
     "Baigę galite išsaugoti rezultatą kaip išankstinį nustatymą ir vėliau jį pakartotinai naudoti pasirinkę skiltyje „Iš išsaugotų išankstinių nustatymų“ ir spustelėję „Taikyti“."
    ],
    "img": {
     "file": "merge-style",
     "alt": "ASS išvaizdos skydelio parametrai dešinėje",
     "cap": "Dydis, spalva, kontūras, šešėlis / fonas ir lygiavimas yra reguliuojami, o rezultatą galima išsaugoti kaip išankstinį nustatymą"
    }
   },
   {
    "h2": "Prieš eksportuodami patikrinkite peržiūrą",
    "ps": [
     "„Sujungimo peržiūra“ yra lentelė: #, laikas, originalas, vertimas, stilius. Juosta viršuje filtruoja įtartinas eilutes pagal „turi garso efektus“, „turi pranešėjo priešdėlį“, „trumpesnė nei 1 sekundė“, „daugiau nei dvi eilutės“ ir „viršytas skaitymo greitis“, arba pagal jūsų įvestą raktažodį.",
     "Spustelėjus eilutės stiliaus laukelį, išskleidžiamas to laukelio redaktorius ir rodomos tik jį naudojančios eilutės; „Išvalyti visus nepaisymus“ grąžina kiekvieną rankinį nepaisymą į šabloną. Žemiau esanti laiko juostos koregavimo sritis tvarko visuotinį poslinkį (nuo nurodytos žymos) ir proporcingą mastelio keitimą.",
     "Kai viskas atrodo gerai, eikite į „4 Eksportuoti“: atsisiųskite subtitrų failą arba nukopijuokite jo turinį."
    ],
    "img": {
     "file": "merge-preview",
     "alt": "Sujungimo peržiūros lentelė ir jos filtravimo juosta",
     "cap": "Peržiūra yra eksportas; filtruokite įtartinas eilutes pagal tipą arba išskleiskite vieną stiliaus laukelį"
    }
   },
   {
    "h2": "Kas lieka nepaliesta",
    "ps": [
     "Stilius keičia tik išvaizdą, niekada dialogų. Originalo ir vertimo tekstas sujungimo metu nepakeičiamas nė vienu simboliu; nebent sąmoningai jį pakeisite koregavimo srityje po peržiūra, laiko juosta ateina iš jūsų pasirinkto failo.",
     "Kai eksportuojate SRT arba „VTT be stiliaus“, į failą neįrašoma jokia stiliaus informacija — puslapis praneša, kad VTT neturi STYLE bloko ir grotuvas naudos numatytąją išvaizdą. Jei norite stiliaus, pasirinkite dvikalbio VTT stilių arba ASS."
    ]
   },
   {
    "h2": "Dažniausiai užduodami klausimai",
    "ps": [
     "**Ką daryti, jei abiejų failų įrašų skaičius skiriasi?** Naudokite „Suporuoti pagal laiko juostą“ ir įrankis suderina pagal artumą; įrašai, kurių negalima suderinti, nėra išsigalvojami.",
     "**Ką daryti, jei grotuvas ignoruoja stilių eksportuotame ASS?** Stiliai saugomi failo viduje, tačiau grotuvų palaikymas ASS skiriasi. Jei jums reikia mobilesnės išvaizdos, eksportuokite dvikalbio VTT stilių.",
     "**Kaip grįžti prie pradinio šablono jį sugadinus?** ASS bloko „Atkurti numatytuosius parametrus“ ir VTT bloko „Atkurti šablono numatytuosius nustatymus“ iš naujo nustato savo skyrių.",
     "**Kokie yra septyni pavyzdžio įrašai?** Tai įmontuotas pavyzdys, esantis tik tam, kad matytumėte, kaip atrodo sujungimas; pavyzdžio negalima eksportuoti. Įkelkite savo subtitrus ir spustelėkite sujungimo peržiūrą, ir jie bus pakeisti automatiškai."
    ]
   },
   {
    "h2": "Privatumas",
    "ps": [
     "Subtitrai apdorojami visiškai naršyklėje: niekas neįkeliama ir niekas nekeliauja per serverį. Uždarykite naršyklę ir viskas iš šios sesijos dings."
    ]
   },
   {
    "h2": "Susiję įrankiai ir vadovai",
    "ps": [
     "Norėdami išskaidyti dvikalbį failą atgal į du takelius, naudokite [[Bilingual split|/bilingual.html]]; norėdami eiti kitu keliu ir paversti vienakalbį failą dvikalbiu, žr. [[Two ways to make bilingual subtitles|/guides/make-bilingual-subtitles.html]]; rezultatą paleiskite per [[Subtitle QC|/qc.html]]; visam sezonui iš karto naudokite [[Batch conversion|/batch.html]]."
    ]
   }
  ]
 },
 "qc": {
  "seo": {
   "title": "Kaip naudoti subtitrų kokybės kontrolę (QC) – Laiko juostos ir išdėstymo patikra – AI-SRTSub",
   "desc": "Subtitrų kokybės kontrolė: 17 taisyklės pagauna persidengimus, eilutės plotį, skaitymo greitį ir skyrybą, ribos pagal 27 kalbas. Pusė yra vieno paspaudimo taisymai; atsisiųskite ataskaitą.",
   "h1": "Kaip naudoti subtitrų kokybės kontrolę",
   "intro": "Prieš atiduodami subtitrus, paleiskite juos per kokybės kontrolės (QC) puslapį laiko juostai ir išdėstymui patikrinti: kas patikrinama, kaip perskaityti ataskaitą ir kurias problemas galima išspręsti vienu paspaudimu — viskas aprašyta čia.",
   "ctaText": "Atidarykite subtitrų kokybės kontrolę"
  },
  "body": [
   {
    "h2": "Kam skirtas šis įrankis",
    "ps": [
     "Subtitrai, kurie plika akimi atrodo gerai, pristatyti dažnai pasirodo turintys persidengiančias laiko juostas, per platų eilučių plotį arba per didelį skaitymo greitį. QC puslapis išvardija šias problemas po vieną:"
    ]
   },
   {
    "h2": "Pirmiausia pasirinkite kalbos taisykles",
    "ps": [
     "Skiltyje „Tikrinti pagal kurios kalbos taisykles“ nustatote penkias ribas: **maksimalų vienos eilutės plotį** (42 pusės pločio vienetų kraštovaizdžio orientacijai pagal nutylėjimą, 36 kvadratui, 28 portretui), **skaitymo greičio limitą** (18 pločio vienetai per sekundę kinų, japonų ir korėjiečių kalbomis, 20 kitoms kalboms), **minimalią 833 milisekundžių trukmę**, **maksimalią 7000 milisekundžių trukmę** ir **daugiausia 2 eilučių**. Nustatykite subtitrų kalbą automatiškai aptikti arba rankiniu būdu pasirinkite vieną iš 27; ekrano orientacija keičia tik eilutės pločio lygį — skaitymo greitis, trukmės ir eilučių skaičius lieka tokie, kokie yra. Pusės pločio vienetai yra bendras matas: vienas hanzi skaičiuojamas kaip 2, viena lotyniška raidė kaip 1 — eilutės plotis 42 lygus 21 hanzi arba 42 raidėms."
    ],
    "img": {
     "file": "qc-rules",
     "alt": "QC nustatymai: penkių ribų įvesties laukeliai plius subtitrų kalbos ir ekrano orientacijos išskleidžiamieji meniu",
     "cap": "Penkios ribos + kalba + orientacija; numatytosios reikšmės atitinka įprastą pramonės praktiką"
    }
   },
   {
    "h2": "Ataskaitos skaitymas",
    "ps": [
     "17 taisyklės praneša apie pastebėjimus trijų lygių: **klaidos** (sugadintas tekstas, laiko žymos formatas, pabaiga anksčiau nei pradžia, nutrūkusi numeracija), **įspėjimai** (tušti įrašai, persidengimai, per trumpos arba per ilgos trukmės, skaitymo greitis viršija limitą, per platūs eilutės, daugiau nei dvi eilutės) ir **patarimai** (eilutės lūžio pozicija, priekiniai ar galiniai tarpai, trūkstami tarpai, skyrybos normos ir kita). Kiekvienas radinys turi įrašo numerį ir detalę „išmatuota X, riba Y“, o sąrašą galima filtruoti pagal lygį. Dvikalbiai įrašai gauna išimtis: abi formos aptinkamos automatiškai, persidengimo patikros atleidžia visą porą, o skaitymo greitis skaičiuoja tik eilutę, parašyta tiksline kalba."
    ],
    "img": {
     "file": "qc-report",
     "alt": "QC ataskaitos sritis: radiniai, sugrupuoti pagal klaidą, įspėjimą ir patarimą, kiekvienas su įrašo numeriu ir išmatuota verte",
     "cap": "Trijų lygių ataskaita: kiekvienas radinys turi savo įrašo numerį ir išmatuotas / ribines vertes"
    }
   },
   {
    "h2": "Taisymas ir eksportavimas",
    "ps": [
     "Kortelėje „Taisyti ir eksportuoti“ išvardyti tik **automatiškai pataisomi** elementai: perrašymas, tuščių įrašų šalinimas, trūkstamų tarpų pridėjimas, skyrybos keitimas pagal kalbos normas, pernumeravimas — viskas, kas palieka laiko žymes nepaliestas, pažymėta varnelėmis pagal nutylėjimą; **elementai, kurie keičia laiko žymes** (pradžios ir pabaigos sukeitimas, persidengimų perkėlimas, trukmių trumpinimas ar ilginimas) pagal nutylėjimą nepažymėti — pažymėkite juos patys patikrinę poveikį. Spustelėkite „Taikyti pataisymus“ ir automatiškai paleidžiamas naujas patikrinimas; skaitliukas skaičiuoja tik tai, kas buvo iš tikrųjų pataisyta — eilutės, kurių nepavyko perrašyti, nepadidina skaičių. **Skaitymo greitis viršijantis limitą neturi automatinio pataisymo**: kompiuteris negali žinoti, kurį žodį iškirpti, todėl vertimą reikia sutrumpinti rankiniu būdu arba pakoreguoti laiką. Po pataisymo eksportuokite SRT arba VTT, arba spustelėkite „Atsisiųsti ataskaitą“, kad išsaugotumėte paprasto teksto `.qc.txt` ataskaitą."
    ],
    "img": {
     "file": "qc-fix",
     "alt": "Taisymo kortelė: žymimieji langeliai automatiškai pataisomiems elementams ir mygtukas „Taikyti pataisymus“",
     "cap": "Į sąrašą patenka tik automatiškai pataisomi elementai; laiką keičiantys taisymai pagal nutylėjimą nepažymėti"
    }
   },
   {
    "h2": "DUK",
    "ps": [
     "**Kodėl mano ASS negali būti eksportuotas?** QC eksportuoja tik SRT ir VTT; ASS įeina, bet neišeina. Norėdami išlaikyti ASS efektus, iš anksto apsvarstykite tai skiltyje [[Format Converter|/convert.html]].",
     "**Ką reiškia 18 skaitymo greitis?** Kinų, japonų ir korėjiečių kalboms riba yra 9 pilno pločio simboliai per sekundę (18 pusės pločio vienetai); kitos kalbos gauna 20 pusės pločio vienetų per sekundę. Tai įprasti komforto lygiai, o įvesties laukelis leidžia juos pakeisti.",
     "**Mano failo koduotė sugadinta – ar jį vis tiek galima patikrinti?** QC skaito tik UTF-8; pirmiausia pataisykite koduotę sugadinto teksto taisymo puslapyje.",
     "**Ar tai palies my laiko juostą?** Ne, kol paliksite „keičiančių laiką“ grupę nepažymėtą; net ir pažymėjus, kiekvienas pakeitimas yra apibūdinamas prieš pritaikant pataisymą."
    ]
   },
   {
    "h2": "Susiję vadovai",
    "ps": [
     "Subtitrai praskrieja per greitai, kad spėtų perskaityti — žiūrėkite specialų vadovą [[Subtitles Too Fast to Read|/guides/subtitle-too-fast.html]]. Ką patikrinti prieš pristatymą — kontrolinis sąrašas yra [[What to Check Before Delivery|/guides/subtitle-quality-check.html]]. Laiko juosta, kuri išsiderina, yra kitokio pobūdžio problema — žr. [[Subtitles Drifting Out of Sync|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "remove-subtitle-ads": {
  "seo": {
   "title": "Pašalinkite reklamas ir vandens ženklus iš subtitrų – AI-SRTSub",
   "desc": "Pašalinkite vandens ženklus ir reklamas iš subtitrų: URL, fanų grupės kreditai ir „suproceduota pagal“ žymos išvalomi vienu paspaudimu, taip pat dubliuojantys ir tušti įrašai. – AI-SRTSub",
   "h1": "Pašalinkite reklamas ir vandens ženklus iš subtitrų",
   "intro": "URL, kreditai ir reklaminiai įrašai, paslėpti jūsų subtitruose, vienu kartu išvalomi valiklio vandens ženklų taisyklėmis — ir bet kokį klaidingą ištrynimą galima atšaukti įrašas po įrašo.",
   "ctaText": "Išvalykite subtitrų vandens ženklus"
  },
  "body": [
   {
    "h2": "Kas yra šie vandens ženklai",
    "ps": [
     "Internete atsisiųsti subtitrai dažnai gauna papildomų įrašų pradžioje arba pabaigoje (kartais ir viduryje): URL, el. pašto adresus, fanų grupių pavadinimus, `encoded by` / `translated by` kreditus, svetainių pavadinimus, tokius kaip opensubtitles, ir eilutes, tokias kaip „sekite mūsų WeChat paskyrą“ arba „tik studijų tikslais“. Tai įprasti subtitrų įrašai — su laiko juosta, užimantys eilutę — todėl grotuvai negali jų pašalinti; jie turi būti aptikti pagal turinį."
    ]
   },
   {
    "h2": "Kur tai padaryti",
    "ps": [
     "Atidarykite [[Subtitle Cleaner|/clean.html]] ir įmeskite savo subtitrus; „Vandens ženklų ir nepageidaujamų įrašų“ grupėje jau pažymėti „Pašalinti vandens ženklus ir reklamas“, „Pašalinti dubliuojančius įrašus“ ir „Pašalinti tuščius įrašus“, o valymas pradedamas automatiškai. Aptikimas veikia dviejuose lygiuose: **griežti signalai**, tokie kaip URL, el. laiškai, fanų grupės ir svetainių pavadinimai, ištrina visą įrašą užfiksavus bet kokį ilgį; **švelnūs signalai**, tokie kaip @vardai, „suproceduota“ arba „koreguota“ kreditai, vertinami tik trumpuose įrašuose, ne ilgesniuose nei 40 simbolių, kad būtų išvengta ilgų dialogų nukirpimo. Dvikalbiuose įrašuose vandens ženklų eilutės pirmiausia pašalinamos eilutė po eilutės, o dialogų eilutės paliekamos; įrašas ištrinamas visas tik tuo atveju, jei po pašalinimo lieka vandens ženklų pėdsakų."
    ],
    "img": {
     "file": "clean-opts",
     "alt": "Valymo parinkčių ekranas: trys vandens ženklų ir nepageidaujamų įrašų grupės žymimieji langeliai",
     "cap": "Grupė „Vandens ženklai ir nepageidaujami įrašai“ įjungta pagal nutylėjimą — jokio rankinio nustatymo nereikia"
    }
   },
   {
    "h2": "Peržiūrėkite ir eksportuokite",
    "ps": [
     "Pakeitimų sąraše kiekvienas ištrintas įrašas turi žymą „watermark & ad“ — peržvelkite ją, kad patvirtintumėte, jog nieko nebuvo pašalinta per klaidą; jei kažkas atrodo negerai, spustelėkite „Atstatyti“, kad sugrąžintumėte. Kai patvirtinsite, atsisiųskite: failo vardas automatiškai gauna `.clean` žymą. Valymas vyksta vietoje jūsų naršyklėje; jūsų subtitrai niekada niekur nesiunčiami."
    ]
   }
  ]
 },
 "repair": {
  "seo": {
   "title": "Kaip pataisyti sugadintus koduotės subtitrus (mojibake) – Aptikti koduotę – AI-SRTSub",
   "desc": "Instrukcija: aptikti pradinę koduotę (GBK / Big5 / Shift_JIS / EUC-KR), suorganizuoti pataisymus pagal tai, kas labiau skamba kaip kalba, tada išsaugoti UTF-8 su BOM arba GBK. Laiko žymos ir indekso numeriai niekada nesikeičia.",
   "h1": "Kaip pataisyti sugadintus koduotės subtitrus",
   "intro": "Subtitrų failas, pilnas šiukšlių simbolių, sugadinamas retai — jis tiesiog buvo nuskaitytas su neteisinga koduote. Taisymo įrankis aptinka pradinę koduotę ir atstato tinkamus simbolius, palikdamas indekso numerius ir laiko žymes ramybėje.",
   "ctaText": "Atidarykite sugadintos koduotės taisymo įrankį"
  },
  "body": [
   {
    "h2": "Ką daro šis įrankis",
    "ps": [
     "Tie patys baitai, nuskaityti kaip UTF-8 ir nuskaityti kaip GBK, sukuria du visiškai skirtingus simbolių rinkinius — failas nėra sugadintas, jis buvo dekoduotas su neteisinga koduote. Štai ką daro taisymo įrankis:"
    ]
   },
   {
    "h2": "Įkelkite failą, o ne jį įklijuokite",
    "ps": [
     "Du įėjimo taškai gali ištaisyti skirtingą žalos kiekį, todėl **jei įmanoma, įkelkite failą**. Su failu pradiniai baitai vis dar ten: įrankis išbando vieną koduotę po kitos, ir vos atpažinęs GBK jis dekoduoja kaip GBK — nieko nereikia spėlioti. Įklijuotas tekstas nebėra gryni baitai. Kai naršyklė perduoda eilutę, klaida jau įvyko, todėl įrankis gali dirbti tik atgaline tvarka ir paimti tai, ką gali gauti.",
     "Jei įklijuotame tekste jau yra pakaitinis simbolis (tas languotas klaustukas `�`), pradiniai baitai seniai dingo ir niekas jų nebegrąžins. Puslapis tai sako tiesiai: grįžkite atgal ir naudokite „Pasirinkti failą“, kad įkeltumėte originalą."
    ],
    "img": {
     "file": "repair-up",
     "alt": "Taisymo puslapio įkėlimo sritis: numetimo zona ir įklijavimo langelis, viršuje rodoma aptikta koduotė",
     "cap": "Nutempkite failą arba ieškokite jo; įklijavimo langelis yra apačioje ir gali pataisyti daug mažiau"
    }
   },
   {
    "h2": "Ką sako jūsų diagnozė",
    "ps": [
     "Įkėlus diagnostikos kortelė pateikia išvadą. **Koduotės gedimų nerasta**: turinys skaitomas gerai toks, koks yra; jei jūsų grotuvas vis tiek rodo šiukšles, grotuvas panaudojo neteisingą koduotę — nusileiskite iki „Išsaugoti kaip“, pasirinkite kitą ir paduokite jam tą failą. Kai tai **panašu į sugadintą koduotę**, kortelėje nurodoma, kokį pėdsaką ji rado:"
    ],
    "img": {
     "file": "repair-diag",
     "alt": "Diagnostikos kortelė: išvada ir kiekvienas koduotės pėdsakas, išvardytas eilutė po eilutės",
     "cap": "Diagnostika išvardija pėdsakus pagal tipą, o ne tiesiog pasako „tai sugadinta koduotė“"
    }
   },
   {
    "h2": "Kaip reitinguojami kandidatai ir kaip pasirinkti",
    "ps": [
     "Skiltyje „Būdai tai ištaisyti“ kandidatai išvardyti tvarka **pirmiausia tai, kas labiausiai panašu į realią kalbą**, iki 12 iš jų, kiekvienas pažymėtas koduoto pora, iš kurios ir į kurią jis buvo nuskaitytas. Spustelėkite vieną, kad pamatytumėte, kaip jis atrodo, pasirinkite jį, tada slinkite žemyn, kad išsaugotumėte. Nepatenkinti? Naudokite „Palikti tokį, koks yra“, kad grįžtumėte prie originalo.",
     "Tvarka kyla iš balo: bendrų simbolių dalis, akcentų eilutės, simbolių eilutės, neaiškių simbolių sienos – viskas pasverta. **Jei jėga ar balas nėra aiškiai geresnis, niekas nerekomenduojama** — jis nepirš pusiau įtikinančio kandidato tik tam, kad jį turėtų. Tekstas, kuris buvo sugadintas du kartus (neteisingai išsaugotas kartą, tada neteisingai pataisytas kartą), gauna vieną papildomą atgalinio sprendimo etapą geriausiems kandidatams, todėl bet kas per du sluoksnius vis tiek gali būti išgelbėta."
    ],
    "img": {
     "file": "repair-fix",
     "alt": "Kandidatų taisymo sąrašas, išrikiuotas pagal tai, kiek jis skaitomas kaip reali kalba, kiekvienas pažymėtas savo koduotės pora",
     "cap": "Kandidatai išrikiuoti pagal „labiausiai panašius į realią kalbą“, kiekvienas rodo įtrauktas koduotes"
    }
   },
   {
    "h2": "Teisingas išsaugojimas yra paskutinis žingsnis",
    "ps": [
     "Pataisytą rezultatą vis tiek reikia teisingai išsaugoti. Kai grotuvas negali aptikti UTF-8, išsaugojimas kaip **UTF-8 su BOM** (Windows grotuvai remiasi BOM) arba kaip **GBK** paprastai tai išsprendžia. Galite išsaugoti kaip UTF-8, UTF-8 (su BOM), GBK, Big5, Shift_JIS arba EUC-KR; jei kažkas netelpa, jums liepiama pasirinkti kitą (GBK negali palaikyti korėjiečių). Atsisiųsti failai gauna `-fixed` pridedamą prie pavadinimo.",
     "Kai aptikta koduotė nėra UTF-8, „Išsaugoti kaip“ jau yra iš anksto nustatyta į UTF-8 su BOM jums. Kai tik pats paliesite išskleidžiamąjį meniu, jis nustoja jus spėlioti."
    ],
    "img": {
     "file": "repair-out",
     "alt": "Rezultato sritis: teksto langelis su išsaugojimo kaip išskleidžiamuoju meniu ir atsisiuntimo mygtuku",
     "cap": "Pasirinkite koduotę, tada atsisiųskite — failo vardas gauna -fixed priesagą"
    }
   },
   {
    "h2": "Kas niekada nebūta paliesta",
    "ps": [
     "Pakeičiami tik neteisingai nuskaityti simboliai. Indekso numeriai, laiko žymos ir ASS stiliaus eilutės jokių būdu nekeičiami."
    ]
   },
   {
    "h2": "DUK",
    "ps": [
     "**Aš įkėliau failą, tad kodėl vis tiek turiu jį išsaugoti iš naujo?** Pats failas paprastai yra geras; kas sugadinta, tai grotuvas, skaitantis jį su neteisinga koduote. Tokiu atveju jokių teksto simbolių nereikia keisti — tiesiog išsaugokite kopiją kaip UTF-8 su BOM arba GBK ir duokite tai grotuvui.",
     "**Kodėl įklijuoto teksto negalima pataisyti?** Kai pakaitinis simbolis pasirodo įklijuotame turinyje, pradiniai baitai dingo ir nėra nuo ko atvirkščiai samprotauti. Grįžkite atgal ir naudokite „Pasirinkti failą“, kad įkeltumėte originalą.",
     "**Kandidatas, kurio noriu, nėra išvardytas?** Niekas nerekomenduojama, nebent gauna aiškiai geresnį balą nei tai, ką jau turite. Pabandykite perjungti aptiktą koduotę į kitą ir leiskite jai iš naujo susireitinguoti.",
     "**Kiek failų vienu metu?** Po vieną. Atsisiųskite pataisymą, tada paduokite kitą failą."
    ]
   },
   {
    "h2": "Privatumas",
    "ps": [
     "Aptikimas ir taisymas vyksta visiškai jūsų naršyklėje. Joks subtitrų turinys niekada nesiunčiamas į serverį."
    ]
   },
   {
    "h2": "Susiję įrankiai ir vadovai",
    "ps": [
     "Iš kur atsiranda sugadinta koduotė (mojikake) ir kodėl ji galiausiai taip atrodo — žiūrėkite [[Where subtitle mojibake comes from|/guides/subtitle-garbled-characters.html]]; koduotė yra gera, bet turinys purvinas — naudokite [[Subtitle cleanup|/clean.html]]; norėdami patikrinti laiką ir skaitymo greitį — [[Subtitle QC|/qc.html]]."
    ]
   }
  ]
 },
 "sbv-to-srt": {
  "seo": {
   "title": "SBV į SRT keitiklis – Konvertuokite „YouTube“ subtitrus – AI-SRTSub",
   "desc": "Konvertuokite „YouTube“ atsisiųstus SBV subtitrus į SRT, skirtą „CapCut“, „Premiere“ ir grotuvams. Laiko reikšmės lieka nepaliestos — keičiasi tik išdėstymas. Veikia jūsų naršyklėje.",
   "h1": "SBV į SRT",
   "intro": "Paverskite „YouTube“ SBV subtitrus į SRT: numeskite failą, pasirinkite SRT, atsisiųskite. Laiko reikšmės nepaliestos — keičiasi tik struktūra.",
   "ctaText": "Konvertuoti SBV → SRT"
  },
  "body": [
   {
    "h2": "Kas yra SBV ir iš kur jis kilęs",
    "ps": [
     "SBV yra **„YouTube“ subtitrų formatas**: atsisiunčiant „subtitrų failus“ iš „YouTube“, dažnai gaunamas .sbv failas. Jo struktūra paprastesnė nei SRT — pradžios ir pabaigos laikai yra vienoje eilutėje«, atskirti kableliais, tekstas eina tiesiai po jais, o žymų numerių nėra."
    ]
   },
   {
    "h2": "Kodėl grotuvai jį atmeta",
    "ps": [
     "Už „YouTube“ ribų dauguma redagavimo programų ir grotuvų nepalaiko SBV. Jam trūksta numeravimo bloko, o jo laiko eilutė parašyta kitaip nei SRT, todėl plėtinio pervardijimas nieko nedaro — struktūrą reikia atkurti iš naujo."
    ],
    "img": {
     "file": "convert-upload-sbv",
     "alt": "Įkėlimo sritis: įkeltas SBV failas, atpažintas kaip SBV",
     "cap": "SBV atpažįstamas toks, koks yra, nereikia pervardyti plėtinio"
    }
   },
   {
    "h2": "Kaip konvertuoti",
    "ps": [
     "Atidarykite [[converter|/convert.html]], įmeskite SBV, pasirinkite **SRT - SubRip** kaip išvestį, tada konvertuokite ir atsisiųskite. Žymų numeriai priskiriami iš naujo, o pradiniai eilutės lūžiai žymos viduje sujungiami į vieną eilutę (SRT leidžia kelių eilučių žymas; čia SBV eksportuojamas kaip viena eilutė)."
    ]
   }
  ]
 },
 "shift": {
  "seo": {
   "title": "Kaip pastumti subtitrų laiką (poslinkis, mastelis, du inkarai) – AI-SRTSub",
   "desc": "Iliustruotas laiko redaktoriaus gidas: įkelkite subtitrus, pridėkite koregavimo veiksmus, dviejų inkarų korekcija, koregavimai kiekvienai žymai ir eksportas.",
   "h1": "Laiko redaktorius: žingsnis po žingsnio gidas",
   "intro": "Šis gidas veda per įrankį nuo viršaus iki apačios: įkelkite subtitrus, pridėkite koregavimo veiksmus, paleiskite patikrinimus, smulkiai sureguliuokite kiekvieną žymą ir eksportuokite.",
   "ctaText": "Atidarykite laiko redaktorių"
  },
  "body": [
   {
    "h2": "Įkelkite savo subtitrus",
    "ps": [
     "Nutempkite failą į brūkšninį laukelį arba spustelėkite norėdami pasirinkti vieną; taip pat galite **įklijuoti turinį** tiesiai į teksto langelį. Formatas aptinkamas tiek iš plėtinio, tiek iš turinio, o rezultatas rodomas formato žetone. Palaikomos įvestys: srt, vtt, ass (įsk. ssa), sbv, lrc ir txt."
    ],
    "img": {
     "file": "shift-upload",
     "alt": "Įkėlimo sritis: įkeltas pavyzdinis subtitras, atpažintas kaip SRT",
     "cap": "Failo pavadinimas ir aptiktas formatas pasirodo po numetimo zona; teksto langelis lieka redaguojamas."
    }
   },
   {
    "h2": "Pridėkite koregavimo veiksmus",
    "ps": [
     "Koregavimai sudaro **veiksmų konvejerį**: kiekvienas veiksmas atlieka vieną darbą ir paima vieną skaičių, o jo vienetas rodomas laukelio viduje. Veiksmai taikomi nuo viršaus iki apačios, o bet kurio veiksmo keitimas **iš naujo apskaičiuoja viską iš pradinių subtitrų** — todėl galite bet kada grįžti ir patikslinti skaičių nesukeldami netvarkos."
    ]
   },
   {
    "h2": "Dviejų inkarų korekcija",
    "ps": [
     "Kai nežinote nei poslinkio sekundėmis, nei santykio, naudokite du inkarus: pridėjus, **du „dabartiniai“ laukai užpildomi automatiškai** iš pirmosios ir paskutinės jūsų failo žymos. Užpildote tik „tikslo“ laukus — laikus, kuriais tos žymos iš tikrųjų turėtų pasirodyti. Viskas tarp jų perskirstoma proporcingai."
    ],
    "img": {
     "file": "shift-step-two",
     "alt": "Dviejų inkarų korekcija: dabartiniai laikai užpildomi automatiškai, tikslo laikai įvedami rankiniu būdu",
     "cap": "Dabartiniai laukai ateina iš jūsų failo; tikslo laikai yra teisingi laikai, kuriuos matote vaizdo įraše."
    }
   },
   {
    "h2": "Laiko juostos patikra ir koregavimai kiekvienai žymai",
    "ps": [
     "Atlikę veiksmus, perskaitykite **laiko juostos patikrą**: per trumpos, per ilgos, per tankios skaityti žymos, per platūs eilutės arba persidengiančios žymos — viskas išvedama į sąrašą. Patikrinimas **tik pažymi problemas ir nieko nekeičia** pats. Keturios numatytosios liniuotės yra 0.833 s minimali trukmė, 7 s maksimali, 9 simboliai per sekundę skaitymo greitis ir 21 simboliai eilutėje — viskas redaguojama puslapyje. Žemiau koregavimai kiekvienai žymai leidžia sujungti dvi gretimas žymas, padalinti vieną arba tiesiogiai redaguoti jos pradžią ir pabaigą; kiekvieną redagavimą galima atšaukti."
    ]
   },
   {
    "h2": "Eksportuokite rezultatą",
    "ps": [
     "Rezultato skydelis rodo pradinius ir pakoreguotus laikus **greta vienas kito**, kad būtų lengva patikrinti. Išvesties formatas pagal nutylėjimą atitinka įvesties formatą, tačiau prieš atsisiunčiant galite perjungti į bet kurį iš srt, vtt, ass, sbv, lrc arba txt."
    ],
    "img": {
     "file": "shift-result",
     "alt": "Rezultato skydelis: laikai prieš ir po greta vienas kito, su atsisiudimo ir kopijavimo mygtukais",
     "cap": "Pradiniai laikai kairėje, pakoreguoti dešinėje; atsisiųskite, kai patikrinimas atrodo teisingas."
    }
   }
  ]
 },
 "shift-subtitle-timing": {
  "seo": {
   "title": "Kaip perkelti visus subtitrus anksčiau arba vėliau – AI-SRTSub",
   "desc": "Kiekviena žyma vėluoja tuo pačiu laiko tarpu: naudokite laiko redaktoriaus poslinkio veiksmą — įveskite vieną neigiamą arba teigiamą skaičių ir visos žymos pasislinks kartu.",
   "h1": "Perkelkite visą subtitrų failą anksčiau arba vėliau",
   "intro": "Garsas prasideda, subtitras pasirodo vėlai — ir kiekviena atskira žyma vėluoja tuo pačiu laiko tarpu. Tai vienodas poslinkis: vienas skaičius tai ištaiso.",
   "ctaText": "Atidarykite laiko redaktorių"
  },
  "body": [
   {
    "h2": "Pirmiausia patvirtinkite, kad kiekviena žyma vėluoja tuo pačiu laiko tarpu",
    "ps": [
     "Patikrinkite vieną žymą netoli pradžios, vieną viduryje ir vieną pabaigoje. Jei visi trys vėluoja maždaug tuo pačiu laiko tarpu, tai yra **vienodas poslinkis**, ir vienas poslinkio veiksmas viską ištaiso. Jei pradžia teisinga, o nukrypimas auga pabaigos link, tai kita problema — žr. [[subtitles getting more and more out of sync|/guides/subtitles-out-of-sync.html]]."
    ]
   },
   {
    "h2": "Ką įvesti: neigiamą paspartinti, teigiamą uždelsti",
    "ps": [
     "Laiko redaktoriuje pridėkite **Perkelti viską** veiksmą ir įveskite poslinkį vertės langelyje: vėlai bėgantys subtitrai gauna neigiamą skaičių, kad būtų patraukti anksčiau; bėgantys anksti gauna teigiamą skaičių, kad būtų stumti vėliau. Jei subtitrai vėluoja 1.5 sekundes, įveskite **-1.5** — vienetas yra sekundės."
    ],
    "img": {
     "file": "shift-step-shift",
     "alt": "Perkelti viską veiksmas su įvestomis -1.5 sekundėmis",
     "cap": "Neigiamas skaičius patraukia visą failą anksčiau; vienetas parašytas laukelio viduje, sekundėmis."
    }
   },
   {
    "h2": "Paleiskite jį ir patikrinkite pirmąją žymą",
    "ps": [
     "Pritaikius, rezultato skydelis išrašo kiekvienos žymos pradinius ir naujus laikus **greta vienas kito**. Pirmiausia patikrinkite pirmąją žymą: ar naujas pradžios laikas patenka į kadrą, kuriame tariama eilutė? Tada patikrinkite vieną viduryje. Kiekviena žyma pasislenka tuo pačiu laiko tarpu ir išlaiko savo trukmę."
    ]
   },
   {
    "h2": "Eksportuoti",
    "ps": [
     "Kai patikrinimas atrodo gerai, atsisiųskite tiesiogiai. Išvesties formatas pagal nutylėjimą atitinka įvesties formatą ir gali būti pakeistas kitu. Pakeitimas liečia tik laikus — ne Nė vieno teksto simbolio."
    ]
   }
  ]
 },
 "simplified-traditional-chinese": {
  "seo": {
   "title": "Ne simboliųkeitimas – Vieno su daugeliu ir regioniniai žodžiai – AI-SRTSub",
   "desc": "Tai padaro sudėtingu trys dalykai: vienas su daugeliu atitiktys, išspręstos pagal žodį, skirtingas Taivano ir Honkongo žodynas ir tik dialogų konvertavimas. Atlikite visus tris teisingai, ir jokie žmogaus perdarymai nebus reikalingi.",
   "h1": "Supaprastinta ir tradicinė nėra simboliųkeitimas",
   "intro": "Kuris tradicinis simbolis pakeičia supaprastintą, priklauso nuo šalia jo esančio simbolio. Štai kodėl šis konvertavimas negali būti atliktas aklai keičiant po vieną simbolį.",
   "ctaText": "Atidarykite keitiklį"
  },
  "body": [
   {
    "h2": "Pirma: viena supaprastinta forma, kelios tradicinės",
    "ps": [
     "Supaprastinimas sujungė kelis tradicinius simbolius į vieną supaprastintą formą. Grįžtant atgal, vienas supaprastintas simbolis atitinka kelis tradicinius, o pasirinkimas tarp jų priklauso nuo to, su kuo jis suporuotas:",
     "Simboliųkeitimas po simbolio visus juos sujungia į tą patį ir kiekvieną atvejį padaro neteisingą. Išsprendimas **pagal žodį** yra tai, kas juos atskiria — lentelės yra iš OpenCC, suderinančios frazes prieš vienus simbolius. Pavyzdžiui:"
    ]
   },
   {
    "h2": "Antra: Taivanas ir Honkongas nėra tas pats dalykas",
    "ps": [
     "Konvertavus į tradicinę, yra dar vienas sluoksnis: tas pats žodis Taivane ir Honkonge rašomas skirtingai. Žodis „programinė įranga“ Taivane yra vienoks, o Honkonge kitoks, o Taivanas naudoja savo žodį „informacijai“.",
     "Todėl atskiros kryptys. Taivaniečių tradicinė netgi skolinasi į „sugeneruoti formuluotę“ ir „tik glifai“ — tik glifai išlaiko jūsų esamą žodyną, o formuluotės keitimas keičia ir regioninius terminus. Honkongas gauna savo kryptį."
    ],
    "img": {
     "file": "hanconv-dir",
     "alt": "Konvertavimo kortelė: paskirties išskleidžiamasis meniu, rodantis „Supaprastinta → Taivaniečių tradicinė (formuluotės keitimas)“",
     "cap": "Taivanas siūlo formuluočių keitimus arba tik glifus; Honkongas turi savo kryptį"
    }
   },
   {
    "h2": "Trečia: turėtų būti liečiami tik dialogai",
    "ps": [
     "Subtitrų failas yra ne tik dialogas. Indekso numeriai, laiko žymos ir ASS stiliaus eilutės taip pat yra ten, ir nė vienas tų simbolių neturėtų būti konvertuojamas — ASS stiliaus eilutės ypač, nes jos turi angliškus direktyvų pavadinimus, kurie sugenda vos tik su jais elgiamasi kaip su dialogais.",
     "Taigi konvertavimas įvyksta po analizės pagal formatą: SRT, VTT, ASS ir TXT kiekvienas identifikuoja, kuri dalis yra dialogas, ir konvertuojami tik viduje esantys simboliai. Laiko žymos ir stiliai išgyvena nepaliesti, nereikia iš naujo formatuoti."
    ],
    "img": {
     "file": "hanconv-out",
     "alt": "Rezultato sritis: konvertuoti subtitrai ir būsenos juosta, rodoma pakeistų eilučių skaičių",
     "cap": "Būsenos juosta rodo, kiek eilučių pasikeitė; formatavimas išsaugotas toks, koks yra"
    }
   },
   {
    "h2": "Grįžimas prie supaprastintos: būkite atsargūs",
    "ps": [
     "Konvertuojant tradicinę į supaprastintą, taip pat reikia nurodyti, **iš kurios tradicinės atmainos ateinate**: bendroji, taivaniečių ir honkongiečių yra trys skirtingi keliai, nes regioninį žodyną reikia atkurti į bendrąjį žodį prieš jį konvertuojant. Pasirinkite neteisingą kryptį, ir regioninis žodynas išgyvena supaprastintoje išvestyje.",
     "Apatinė devynių krypčių grupė yra ta, kuri konvertuoja atgal: tradicinė → supaprastinta, taivaniečių → supaprastinta, honkongiečių → supaprastinta."
    ]
   },
   {
    "h2": "Susiję įrankiai ir vadovai",
    "ps": [
     "Visas gidas — [[How to convert simplified and traditional subtitles|/guides/hanconv.html]]; jei viskas, ko jums reikia, yra supaprastintos į tradicinę — [[Convert simplified subtitles to traditional|/guides/srt-simplified-to-traditional.html]]; norėdami išversti į kitą kalbą, [[Subtitle translation|/translate.html]]."
    ]
   }
  ]
 },
 "split": {
  "seo": {
   "title": "Subtitrų dalijimas ir sujungimas – Kirpti pagal bloką, sujungti eilės tvarka – AI-SRTSub",
   "desc": "Padalykite vieną failą į segmentus pagal trukmę arba cue skaičių, iš naujo pradėkite kiekvieną nuo nulio arba sujunkite kelis failus eilės tvarka arba perkelkite juos pagal laiko juostą. Cue numeriai pernumeruoti, tekstas nepakeistas.",
   "h1": "Kaip padalinti ir sujungti subtitrus",
   "intro": "Supjaustykite vieną ilgą subtitrų failą į segmentus arba sujunkite kelis išsklaidytus failus į vieną. Pjūvis visada patenka į įrašo ribą – sakinys niekada nėra perpjaunamas per pusę.",
   "ctaText": "Open split and join :: Atidarykite padalijimą ir sujungimą"
  },
  "body": [
   {
    "h2": "What this tool does :: Ką daro šis įrankis",
    "ps": [
     "Epizodų padalijimas, segmentų padalijimas ir šaltinių sujungimas – visa tai susiduria su tuo pačiu subtitrų blokų ir vaizdo įrašų blokų neatitikimu: arba vieną failą reikia apkarpyti, arba reikia sujungti kelis. Šiame puslapyje pateikiami abu variantai, kiekvienam skirtas po vieną skirtuką."
    ]
   },
   {
    "h2": "Pirmiausia pasirinkite kirpimą arba sujungimą",
    "ps": [
     "Viršuje yra du skirtukai: **Padalijimas: vienas failas į segmentus** ir **Sujungimas: keli failai į vieną**. Antrojo žingsnio parinktys apačioje pasikeičia pagal jūsų pasirinkimą.",
     "Dalyje „1 Pridėti subtitrus“ įkeliate failą arba įklijuojate tekstą; jei pasirinkote neteisingai, spustelėkite „Išvalyti“. Šiame puslapyje skaitomas tik UTF-8 – jei koduotė sugadinta (klaustukų arba langelių siena), pirmiausia eikite į [[Neįskaitomo teksto taisymas|/repair.html]]."
    ],
    "img": {
     "file": "split-mode",
     "alt": "Du skirtukai padalijimo ir sujungimo puslapio viršuje",
     "cap": "Kirpimas ir sujungimas yra du skirtukai; antrojo žingsnio parinktys atitinka jūsų pasirinkimą"
    }
   },
   {
    "h2": "How to cut :: Kaip kirpti",
    "ps": [
     "Dalyje „2 Kaip kirpti“ pasirinkite pagrindą: **trukmę** (vienas segmentas kas X minučių) arba **cue skaičių** (vienas segmentas kas X cue), tada įveskite numerį.",
     "Pažymėkite „Iš naujo paleisti kiekvieną segmentą ties 0:00“ ir kiekvienas gautas segmentas skaičiuojamas nuo nulio – naudokite tai, kai įkeliate epizodus ir kiekvieną segmentą atiduodate grotuvui atskirai. Palikite nepažymėtu, kad išlaikytumėte pradinius laiko žymes, kad kiekvienas segmentas vis tiek atitiktų jo padėtį šaltinio vaizdo įraše.",
     "Pjūvis patenka tik į cue ribas: kai labai ilgi subtitrai apima pjūvio tašką, visas cue lieka ankstesniame segmente."
    ],
    "img": {
     "file": "split-cut",
     "alt": "Trukmės ir cue skaičiaus parinktys su iš naujo paleidimo nuo nulio jungikliu padalijimo puslapyje",
     "cap": "Kirpkite pagal trukmę arba cue skaičių ir pasirinktinai iš naujo paleiskite kiekvieną segmentą ties 0:00"
    }
   },
   {
    "h2": "How to join :: Kaip sujungti",
    "ps": [
     "Dalyje „2 Kaip sujungti“ pasirinkite metodą: **Sujungti eilės tvarka** perkelia vėlesnį failą taip, kad jis prasidėtų pasibaigus ankstesniam, be persidengimo tarp segmentų; **Sunaudoti pagal laiko juostą** išlaiko kiekvieno failo pradinius laiko žymes ir rūšiuoja pagal pradžios laiką.",
     "Naudokite sujungimą eilės tvarka, kai failai yra pirmoji ir antroji vieno epizodo pusė arba kai atskirai patikrintas puses reikia sujungti iš naujo; naudokite interlėjimą pagal laiko juostą, kai failai priklauso ekrane kartu, pavyzdžiui, originalus takelis ir išverstas takelis.",
     "Po sujungimo cue numeriai pernumeruojami automatiškai ir nepasikeičia nė vienas dialogo žodis."
    ],
    "img": {
     "file": "split-join",
     "alt": "Sujungimo eilės tvarka ir interlėjimo pagal laiko juostą parinktys sujungimo puslapyje",
     "cap": "Sujungimas eilės tvarka tinka dviem vieno epizodo pusėms; interlėjimai pagal laiko juostą tinka originaliam ir išverstam takeliui"
    }
   },
   {
    "h2": "Rezultato pasiėmimas",
    "ps": [
     "„3 Rezultatas“ dešinėje eksportuoja **SRT** ir **VTT**; spustelėkite „Atsisiųsti“ arba „Kopijuoti“.",
     "Dalydami galite naudoti „Atsisiųsti kiekvieną segmentą“, kuriuo išsaugomi visi iškirpti segmentai vienu metu, o ne vienu paspaudimu kiekvienam segmentui."
    ],
    "img": {
     "file": "split-out",
     "alt": "SRT/VTT formato pasirinkimas su atsisiuntimo ir atsisiųsti-kiekvieną-segmentą mygtukais rezultato srityje",
     "cap": "Padalijimo rezultatus galima atsisiųsti segmentas po segmento; sujungtas failas atsisiunčiamas arba nukopijuojamas tiesiogiai"
    }
   },
   {
    "h2": "Kas paliekama nepakeista",
    "ps": [
     "Nepasikeičia nė vienas dialogo simbolis. Šiame puslapyje keičiasi tik tai, kurie cue priklauso kuriam segmentui ir kaip jie numeruojami; įrašų turinys lieka toks, koks yra.",
     "Naudojant „Sujungti eilės tvarka“, vėlesnių failų laiko žymės perstumtos kaip visuma – to ir reikalauja sujungimas; naudojant „Sunaudoti pagal laiko juostą“, išsaugoma kiekviena originali laiko žymė."
    ]
   },
   {
    "h2": "Common questions :: Dažni klausimai",
    "ps": [
     "**O kas, jei paskutinis segmentas bus labai trumpas?** Tai normalu. Likutis, kuris neužpildo viso segmento, tampa atskiru segmentu, o ne užpildomas.",
     "**Ar sakinys, apimantis pjūvio tašką, bus padalintas?** Ne. Pjūviai patenka tik į įrašo ribas, o liniją kirtęs cue lieka ankstesniame segmente.",
     "**Kaip po sujungimo rikiuojami du cue su vienodoru laiku?** Pagal pradžios laiką; kai pradžios laikas lygus, išsaugoma failų pridėjimo tvarka.",
     "**Ar galima padalinti ASS?** Šiame puslapyje tvarkomi SRT ir VTT. Pirmiausia konvertuokite ASS į SRT arba VTT naudodami [[Formato konvertavimas|/convert.html]]."
    ]
   },
   {
    "h2": "Privacy :: Privatumas",
    "ps": [
     "Subtitrai apdorojami naršyklėje: niekas neįkeliama ir niekas nepraeina per serverį. Uždarykite puslapį ir turinys dings."
    ]
   },
   {
    "h2": "Susiję įrankiai ir vadovai",
    "ps": [
     "Norėdami sujungti du failus į dvikalbį takelį (o ne į vieną epizodą), naudokite [[Dvikalbis sujungimas ir specialieji efektai|/guides/merge.html]]; jei visa laiko juosta nesutampa, eikite į [[Laiko juostos koregavimas|/shift.html]]; visam sezonui naudokite [[Paketinis konvertavimas|/batch.html]]; o baigę paleiskite [[Subtitrų QC|/qc.html]]."
    ]
   }
  ]
 },
 "split-bilingual-subtitles": {
  "seo": {
   "title": "Padalykite dvikalbius subtitrus į du takelius – AI-SRTSub",
   "desc": "Padalykite dvikalbius subtitrus į du failus: originalus ir vertimo takeliai atsisiunčiami atskirai su skirtingais pavadinimais; atpažįstamos abi formos. – AI-SRTSub",
   "h1": "Padalykite dvikalbius subtitrus į du takelius",
   "intro": "Vienas dvikalbis subtitras tampa dviem failais – „originalas“ ir „vertimas“: įkelkite, pasirinkite padalijimą į dvi dalis, atsisiųskite kiekvieną, išlaikant nepažeistas laiko juostas.",
   "ctaText": "Padalykite dvikalbius subtitrus"
  },
  "body": [
   {
    "h2": "Kada reikia padalinti",
    "ps": [
     "Jūsų grotuvas nori tik vienos kalbos takelio; arba norite vertimo takelio pakartotiniam vertimui, arba originalaus takelio, kurį būtų galima suporuoti su kita išversta versija. Dvikalbis subtitras yra arba **vienas cue su dviem eilutėmis** (originalas vienoje eilutėje, vertimas kitoje), arba **du atskiri cue, turintys tą pačią laiko juostą** – abu galima padalinti."
    ]
   },
   {
    "h2": "Where to do it :: Kur tai padaryti",
    "ps": [
     "Atidarykite [[Dvikalbių subtitrų išskirtuvas|/bilingual.html]] ir įmeskite savo subtitrus. Įrankis dvikalbę formą aptinka automatiškai: vienas cue su dviem eilutėmis padalijamas pagal rašto sistemą, du cue toje pačioje laiko juostoje pagal tvarką. Režimo išskleidžiamajame meniu pasirinkite **Padalinti į dvi dalis** ir spustelėkite Pradėti (arba leiskite jam automatiškai paleisti iš naujo). Rezultato srityje rodomos dvi dalys: pažymėta `.orig` yra originalus takelis, o pažymėta `.dst` – vertimo takelis – kiekvienai spustelėkite „Atsisiųsti“; abu takeliai turi lygiai tą pačią laiko juostą."
    ],
    "img": {
     "file": "bilingual-split",
     "alt": "Padalijimo rezultatas: originalus takelis ir vertimo takelis kaip dvi dalys, kurių kiekviena turi atsisiuntimo mygtuką",
     "cap": "Padalinta į dvi dalis: .orig originalus takelis + .dst vertimo takelis, atsisiųsti kiekvieną atskirai"
    }
   },
   {
    "h2": "One common pitfall :: Viena dažna klaida",
    "ps": [
     "**Vienas cue su dviem eilutėmis kalbomis, turinčiomis tą patį alfabetą (tarkime, anglų ir prancūzų), negali būti padalintas.** Kai takeliai yra atskirti pagal rašto sistemą, jie laikomi viena sistema ir traktuojami kaip vienakalbiai. Tokį turinį pirmiausia konvertuokite į tos pačios laiko juostos formą B, tada padalykite; dviejų cue forma poruojasi pagal laiko juostą ir jai nesvarbu kalba. Apie abi formas išsamiau skaitykite [[Du būdai kurti dvikalbius subtitrus|/guides/make-bilingual-subtitles.html]]."
    ]
   }
  ]
 },
 "srt-file-format": {
  "seo": {
   "title": "Kas yra SRT failas? Kaip jį atidaryti ir redaguoti – AI-SRTSub",
   "desc": "SRT (SubRip) subtitrų failų anatomija: numeris, laiko žymėjimo eilutė, tekstas. Kaip atidaryti jį teksto rengyklėje, kodėl grotuvas jį atmeta ir kaip ištaisyti sugadintą tekstą bei laiko žymių klaidas.",
   "h1": "Paaiškintas SRT failo formatas",
   "intro": "SRT yra pats universaliausias subtitrų formatas: paprastas tekstas, paprasta struktūra, priimamas beveik visur. Šiame vadove atskleidžiama jo struktūra, kaip jį atidaryti ir kaip ištaisyti dažnos nesėkmes.",
   "ctaText": "Atidarykite subtitrų keitiklį"
  },
  "body": [
   {
    "h2": "Kaip atrodo SRT failas",
    "ps": [
     "SRT (SubRip) yra paprastas tekstas – jį atidaro bet kuri teksto rengyklė. Kiekvienas cue susideda iš trijų dalių: **numerio eilutės**, **laiko eilutės** ir **teksto**, atskirtų tuščiomis eilutėmis. Laiko eilutėje rodoma `00:00:01,000 --> 00:00:03,500` – atkreipkite dėmesį į **kablelį** prieš milisekundes, o ne tašką."
    ],
    "img": {
     "file": "convert-upload",
     "alt": "Įkėlimo sritis: įkeltas SRT failas, kuriame rodomi numeriai ir laikas",
     "cap": "Standartinis SRT trijų dalių cue: numeris, laiko eilutė, tekstas"
    }
   },
   {
    "h2": "How to open it :: Kaip jį atidaryti",
    "ps": [
     "Norėdami perskaityti turinį: spustelėkite dešiniuoju pelės mygtuku ir atidarykite bet kuria **teksto rengyklė**. Norėdami naudoti jį su vaizdo įrašu: pervadinkite failą, kad jis **atitiktų vaizdo įrašo failo vardą** (išskyrus plėtinį), padėkite abu į tą patį aplanką, o tokie grotuvai kaip VLC, PotPlayer arba mpv jį įkelia automatiškai; taip pat galite tempti jį ant grojimo lango."
    ]
   },
   {
    "h2": "Atmetimų ir sugadinto teksto taisymas",
    "ps": [
     "**Sugadinti simboliai**: failas nėra UTF-8 – išsaugokite jį iš naujo kaip UTF-8 savo rengyklėje. **Nieko nerodoma**: patikrinkite, ar laiko eilutėje naudojamas kablelis (o ne taškas) ir ar cue numeriai nėra sugadinti (dauguma grotuvų toleruoja tarpus, kai kurie ne). **Failas yra HTML arba JSON** – atsisiuntimo šaltinis buvo neteisingas; gaukite jį iš naujo."
    ]
   },
   {
    "h2": "Ką SRT gali ir ko negali talpinti",
    "ps": [
     "SRT perkelia tik tekstą ir laiką: **jokių stilių** (šriftų, spalvų), **jokio pozicionavimo** (ekrane), **jokių efektų**. Tam reikia ASS – žr. [[SRT į ASS|/guides/srt-to-ass.html]]. Visų formatų palyginimui šalia žr. [[subtitrų formato palyginimas|/guides/subtitle-format-comparison.html]]."
    ]
   }
  ]
 },
 "srt-fps-converter": {
  "seo": {
   "title": "SRT kadrų dažnio keitiklis – Pakeiskite subtitrų kadrų dažnį – AI-SRTSub",
   "desc": "Filmas yra 24 fps, transliacija – 25 fps, o subtitrai vėluoja kas minutę: vieną kartą pakeiskite laiko juostos mastelį pagal 0.96 ir visas failas patenka į tikslinį dažnį.",
   "h1": "Subtitrų kadrų dažnio konvertavimas: nuo 24 fps iki 25 fps",
   "intro": "Paleiskite 24 fps filmo subtitrus 25 fps šaltinyje ir jie praras daugiau nei sekundę kiekvieną minutę – baigiant titrus jie atsilieka keliomis minutėmis. Viena mastelio keitimo procedūra tai ištaiso.",
   "ctaText": "Atidarykite laiko rengyklę"
  },
  "body": [
   {
    "h2": "Kodėl kadrų dažnio neatitikimas verčia subtitrus vėluoti",
    "ps": [
     "Kadrų dažnio konvertavimas iš naujo skaito **tą patį laiko tarpą esant dviem skirtingiems laikrodžiams**. 100 minučių trukmės 24 fps filmas turi 6000 s × 24 = **144,000 kadrus**; 25 fps šaltinyje šie 144,000 kadrai rodomi per 5760 sekundes – **96 minutes**. Visas filmas trunka 4 minutėmis trumpiau, todėl cue ties 50 minute pasirodo maždaug 2 minutėmis vėliau, o pabaigos titrų subtitrai niekada nepasirodo."
    ]
   },
   {
    "h2": "Formulė ir bendri veiksniai",
    "ps": [
     "Tikslinis dažnis ÷ pradinis dažnis = daugiklis. **Nuo 24 iki 25: padauginkite iš 0.96** (24÷25); atvirkščiai, nuo 25 iki 24: 1.0417. **Nuo 25 iki 23.976: padauginkite iš 0.959**; atvirkščiai: 1.0427. Laiko rengyklėje pridėkite **Keisti mastelį pagal dažnį** žingsnį ir įveskite koeficientą į reikšmių laukelį."
    ],
    "img": {
     "file": "shift-step-rate",
     "alt": "Keisti mastelį pagal dažnio žingsnį įvedus 0.96",
     "cap": "0.96 yra 24÷25; puslapyje pateiktoje užuominoje netgi minima, kad kadrų dažnio keitimas yra dažnas naudojimas."
    }
   },
   {
    "h2": "Kai nežinote dviejų dažnių",
    "ps": [
     "Jei nerandate šaltinio kadrų dažnio, neatspėkite koeficiento – vietoje to naudokite **du atskaitos taškus**: paimkite tikrąjį pirmojo ir paskutinio cue pasirodymo laiką kaip du taškus, o visa kita tarp jų proporcingai ištempiama atgal. Žr. [[subtitrai vis labiau nesutampa|/guides/subtitles-out-of-sync.html]]."
    ]
   },
   {
    "h2": "Ką patikrinti vėliau",
    "ps": [
     "Mastelio keitimas perkelia kiekvieną pradžią ir pabaigą; cue trukmė išsiplečia tuo pačiu koeficientu. Paleidę patikrinkite du kraštus: pirmąjį cue (mažiausia pradinė klaida) ir paskutinį (didžiausia). Jei abipusiai sutampa, viskas tarp jų taip pat sutampa."
    ]
   }
  ]
 },
 "srt-simplified-to-traditional": {
  "seo": {
   "title": "Konvertuoti supaprastintus subtitrus į tradicinius – Taivanas arba Honkongas – AI-SRTSub",
   "desc": "Paverskite supaprastintus kinų subtitrus tradiciniais: pasirinkite Taivano (su regioniniu žodynu arba be jo) arba Honkongo. „Vienas su daugeliu“ atitikimai sprendžiami pagal žodį. Keičiasi tik dialogas; laiko žymės lieka savo vietoje.",
   "h1": "Konvertuoti supaprastintus subtitrus į tradicinius",
   "intro": "Supaprastinti kinų subtitrai, skirti Taivano arba Honkongo auditorijai, turi būti tik konvertuojami – tačiau abu regionai nori skirtingų dalykų, o pasirinkus netinkamą kryptį gaunami žodžiai, kurių vietiniai nenaudoja.",
   "ctaText": "Konvertuoti šiuos subtitrus"
  },
  "body": [
   {
    "h2": "The need :: Poreikis",
    "ps": [
     "Jūsų subtitrai yra supaprastintos kinų kalbos ir turi pasiekti žiūrovus Taivane arba Honkonge. Taisyti simbolius po vieną nėra realu – vienas epizodas turi šimtus cue, o abu regionai nenori to paties tradicinio teksto: skiriasi žodynas, o netinkama kryptis sukuria formuluotes, kurių nenaudotų joks vietinis gyventojas."
    ]
   },
   {
    "h2": "Where to do it :: Kur tai padaryti",
    "ps": [
     "Atidarykite [[Supaprastintų ir tradicinių simbolių konvertavimas|/hanconv.html]], nuvilkite subtitrus ir dalyje „Konvertuoti į“ pasirinkite vieną iš supaprastintų → tradicinių krypčių: bendrinis tradicinis, Taivano (keisti formuluotę), Taivano (tik glifai) arba Honkongo. Konvertavimas įvyksta akimirksniu, o rezultato srityje rodomi paruošti atsisiųsti subtitrai.",
     "**Taivano auditorijai**: pasirinkite „Taivano (keisti formuluotę)“, jei regioninis žodynas taip pat turėtų pasikeisti – „programinė įranga“ ir „informacija“ tampa jų Taivano atitikmenimis – arba „Taivano (tik glifai)“, jei norite pakeisti simbolių formas, išsaugodami pradinę formuluotę. **Honkongo auditorijai**: pasirinkite „Honkongas“, kur „programinė įranga“ rašoma kita forma."
    ],
    "img": {
     "file": "hanconv-dir",
     "alt": "Konvertuoti į kortelę: paskirties išskleidžiamasis meniu, kuriame rodoma „Supaprastinta → Taivano tradicinė (keisti formuluotę)“",
     "cap": "Taivanas ir Honkongas yra atskiros kryptys su skirtingu žodynu"
    }
   },
   {
    "h2": "Common pitfalls :: Dažnos klaidos",
    "ps": [
     "**Nebijokite „vienas su daugeliu“ atitikimų**: tas pats supaprastintas simbolis žodžiuose „švarus“, „sausas“ ir „medžio kamienas“ atitinka skirtingus tradicinius simbolius. Lentelės tai išsprendžia pagal frazę, todėl viskas nėra sutraukiama į vieną simbolį.",
     "**Konvertuojamas tik dialogas**: laiko žymės, indeksų numeriai ir ASS stiliaus eilutės lieka nepakeistos, todėl rezultatas paruoštas naudoti.",
     "**Niekas nepasikeitė? Patikrinkite prieš panikuodami**: jei statistikos juostoje rodomos 0 pakeistos eilutės, failas neturi kinų simbolių arba formatas buvo aptiktas neteisingai – patikrinkite, ar „Aptiktas formatas“ atitinka tai, ką įkėlėte."
    ]
   },
   {
    "h2": "Related :: Susiję",
    "ps": [
     "Pilnas visų devynių krypčių paaiškinimas – [[Kaip konvertuoti supaprastintus ir tradicinius subtitrus|/guides/hanconv.html]]; kodėl tai daugiau nei simbolių sukeitimas – [[Supaprastinti ir tradiciniai nėra tik simbolių sukeitimas|/guides/simplified-traditional-chinese.html]]; tradiciniai atgal į supaprastintus taip pat yra [[Supaprastintų ir tradicinių simbolių konvertavimas|/hanconv.html]]."
    ]
   }
  ]
 },
 "srt-to-ass": {
  "seo": {
   "title": "SRT į ASS keitiklis – Konvertuokite subtitrus internete – AI-SRTSub",
   "desc": "Konvertuokite SRT subtitrus į ASS (Advanced SubStation Alpha) su 1920×1080 drobe ir švariu numatytuoju stiliumi, paruoštu įkelti į bet kurį grotuvą. Veikia jūsų naršyklėje.",
   "h1": "SRT to ASS :: SRT į ASS",
   "intro": "Paverskite SRT subtitrus į ASS: numeskite failą, pasirinkite ASS, atsisiųskite. Jums sugeneruojama 1920×1080 drobė ir švarus numatytasis stilius.",
   "ctaText": "Convert SRT → ASS :: Konvertuoti SRT → ASS"
  },
  "body": [
   {
    "h2": "When you need ASS :: Kada jums reikia ASS",
    "ps": [
     "Naudokite ASS, kai įkeliamam subtitrui reikia **geresnio pozicionavimo ir stiliaus valdymo**: jis turi sąvokas, kurių SRT trūksta – drobės dydį, šrifto stilius, lygiavimą. mpv, PotPlayer, VLC ir dauguma grotuvų tai palaiko tiesiogiai."
    ]
   },
   {
    "h2": "Kaip atrodo išvestis",
    "ps": [
     "Įrankis atkuria standartinę antraštę: **1920×1080 drobę**, išmanųjį teksto perkėlimą (WrapStyle 0) ir vieną numatytąjį stilių – Arial 54, baltą tekstą su juodu apvadu, apačioje centre. Kiekvienas cue naudoja šį stilių."
    ],
    "img": {
     "file": "convert-opt-ass",
     "alt": "Išvesties formato išskleidžiamasis meniu su pasirinktu ASS - Advanced SubStation",
     "cap": "Pasirinkite ASS kaip išvestį ir atsisiųskite po konvertavimo"
    }
   },
   {
    "h2": "Ar išsaugomi stiliai?",
    "ps": [
     "SRT iš pradžių neturi stiliaus sąvokos. O jei jūsų šaltinis jau yra ASS, konvertavimas **atkuria numatytąjį stilių ir neišsaugo originalaus** – ASS pertvarkymui naudokite specialią subtitrų rengyklę. Laikas ir tekstas bet kuriuo atveju lieka nepakeisti."
    ]
   }
  ]
 },
 "srt-to-excel": {
  "seo": {
   "title": "Konvertuoti subtitrus į Excel – Koreguoti eilutę po eilutės – AI-SRTSub",
   "desc": "Eksportuokite SRT subtitrus į Excel: viena eilutė vienam cue per keturis stulpelius – indeksas, pradžia, pabaiga ir tekstas. Laikas išlaikytas kaip tekstas, eilutės lūžiai nepažeisti, o redaguotą lapą galima konvertuoti atgal į subtitrus.",
   "h1": "Konvertuoti subtitrus į „Excel“",
   "intro": "Šimtų cue koregavimas teksto rengyklėje vargina. Programoje „Excel“ kiekvienas cue yra eilutė, todėl galite naudoti filtravimą, komentarų rašymą, ieškos ir pakeitimo funkcijas, o redagavimai patenka atgal į jūsų SRT.",
   "ctaText": "Export to Excel :: Eksportuoti į Excel"
  },
  "body": [
   {
    "h2": "The need :: Poreikis",
    "ps": [
     "Koregavimas, masiniai žodžių keitimai arba darbo padalijimas tarp kelių žmonių – visa tai lentelėje vyksta daug greičiau nei paprastame tekste. Pats SRT yra paprastas tekstas, tačiau jo cue struktūra (indeksas, laikas, dialogas) gražiai atitinka keturis skaičiuoklės stulpelius."
    ]
   },
   {
    "h2": "Where to do it :: Kur tai padaryti",
    "ps": [
     "Atidarykite [[Subtitrų ⇄ lentelės konvertavimas|/table.html]], perjunkite į „į lentelę“, nuvilkite SRT, ir peržiūra užsikraus viena eilute kiekvienam cue per keturis stulpelius – indeksą, pradžią, pabaigą, tekstą. Spustelėkite „Atsisiųsti Excel (.xlsx)“ ir jis jūsų. VTT palaikomas tuo pačiu būdu.",
     "Baigę redaguoti: perjunkite režimą į „į subtitrus“, įdėkite lapą atgal ir vėl gausite SRT. Taisyklė yra trys stulpeliai pradžiai, pabaigai ir tekstui (angliški Start / End / Text taip pat veikia) bet kuria tvarka."
    ],
    "img": {
     "file": "table-prev",
     "alt": "Lentelės peržiūra: kiekvienas SRT cue kaip eilutė per keturis stulpelius su statistikos juosta",
     "cap": "SRT išdėstytas kaip keturi stulpeliai, konvertuojamas atgal tuo pačiu būdu"
    }
   },
   {
    "h2": "Common pitfalls :: Dažnos klaidos",
    "ps": [
     "**Pirmiausia pataisykite sugadintą koduotę**: šiame puslapyje skaitomas tik UTF-8 langelis. Pilnas ekranas klaustukų ar langelių reiškia kelionę į [[Koduotės taisymas|/repair.html]].",
     "**CSV arba xlsx**: pasirinkite .xlsx, kai failas patenka į „Excel“, kad laiko stulpelio nebūtų galima performatuoti; CSV yra labiau nešiojamas, tačiau „Excel“ gali jį perskaityti kaip kažką kito – jei taip atsitiktų, nustatykite laiko stulpelį į „Tekstas“.",
     "**ASS neveikia**: ASS turi stiliaus direktyvas, todėl prieš dėdami į lentelę konvertuokite jį į SRT."
    ]
   },
   {
    "h2": "Related :: Susiję",
    "ps": [
     "Visas dvikryptis vadovas – [[Kaip konvertuoti subtitrus į Excel / CSV|/guides/table.html]]; vertimas vėliau – [[Subtitrų vertimas|/translate.html]]; paskutinis patikrinimas prieš pristatymą – [[Subtitrų QC|/qc.html]]."
    ]
   }
  ]
 },
 "srt-to-vtt": {
  "seo": {
   "title": "SRT į VTT keitiklis – Konvertuokite subtitrus internete – AI-SRTSub",
   "desc": "Konvertuokite SRT subtitrus į VTT (WebVTT) HTML5 takelio elementams. Laiko žymos kableliai automatiškai tampa taškais. Veikia jūsų naršyklėje, niekas neįkeliama.",
   "h1": "SRT to VTT :: SRT į VTT",
   "intro": "Paverskite SRT subtitrus į VTT: numeskite failą, pasirinkite VTT, atsisiųskite. Laiko žymos perrašytos žiniatinklio formatui, viskas jūsų naršyklėje.",
   "ctaText": "Convert SRT → VTT :: Konvertuoti SRT → VTT"
  },
  "body": [
   {
    "h2": "When you need VTT :: Kada jums reikia VTT",
    "ps": [
     "Žiniatinklio grotuvai (HTML5 elementas `<track>`), „YouTube“ subtitrų įkėlimas ir dauguma naršyklėje veikiančių grotuvų palaiko tik **VTT (WebVTT)**, o ne SRT. Jei turite tik SRT, viena konversija privers jį veikti."
    ]
   },
   {
    "h2": "Kuo du formatai skiriasi",
    "ps": [
     "Turinys beveik identiškas; trys dalykai parašyti skirtingai: **WEBVTT antraštės eilutė** (reikalinga VTT); **milisekundžių skyriklis** laiko žymose – SRT naudoja kablelį (00:00:01,000), o VTT naudoja tašką (00:00:01.000); ir VTT leidžia NOTE bei STYLE blokus, kurių SRT neleidžia."
    ],
    "img": {
     "file": "convert-result",
     "alt": "Konvertavimo rezultatas, roduodantis WEBVTT antraštę ir taško laiko žymes",
     "cap": "Konvertuotas VTT: pirmoji WEBVTT eilutė, taško laiko žymos"
    }
   },
   {
    "h2": "How to convert :: Kaip konvertuoti",
    "ps": [
     "Atidarykite [[keitiklis|/convert.html]], įmeskite SRT, pasirinkite **VTT - WebVTT** kaip išvestį, tada konvertuokite ir atsisiųskite. Cue tvarka, laiko reikšmės ir kelių eilučių tekstas išsaugomi tokie, kokie yra – keičiasi tik sintaksė. Einate kita kryptimi? Žr. [[VTT į SRT|/guides/vtt-to-srt.html]]."
    ]
   }
  ]
 },
 "subtitle-format-comparison": {
  "seo": {
   "title": "SRT vs VTT vs ASS vs SBV vs LRC – Kurį subtitrų formatą pasirinkti – AI-SRTSub",
   "desc": "Penkių įprastų subtitrų formatų galimybių palyginimas: teksto stilius, pozicionavimas, laiko tikslumas, kur kiekvienas priklauso ir kaip tarp jų konvertuoti.",
   "h1": "Subtitrų formato pasirinkimas: SRT / VTT / ASS / SBV / LRC",
   "intro": "Tas pats subtitras, išsaugotas penkiais formatais, tarnauja penkiems skirtingiems tikslams. Šiame vadove lyginama, ką gali kiekvienas formatas ir kaip pereiti tarp jų.",
   "ctaText": "Atidarykite subtitrų keitiklį"
  },
  "body": [
   {
    "h2": "Pasirinkite formatą vienu sakiniu",
    "ps": [
     "Įkėlimas į grotuvą, maksimalus suderinamumas → **SRT**; žiniatinklio grotuvai (HTML5 takelis) arba „YouTube“ įkėlimas → **VTT**; šriftai, spalvos, pozicionavimas, efektai → **ASS**; atsisiųsta iš „YouTube“ → **SBV** (konvertuoti į SRT, kad būtų lengviau palaikyti); dainos žodžiai, dainavimas eilutė po eilutės → **LRC**."
    ],
    "img": {
     "file": "convert-opt",
     "alt": "Išvesties formato išskleidžiamasis meniu: šeši tiksliniai formatai",
     "cap": "Šeši eksporto tikslai keitiklyje apima kiekvieną šio vadovo formatą"
    }
   },
   {
    "h2": "Galimybių palyginimas",
    "ps": [
     "**SRT**: paprastas tekstas + laikas, be stiliaus ar pozicionavimo, suderinamumo čempionas. **VTT**: tekstas + laikas, naršyklių palaikomas gimtąja kalba, gali turėti pozicionavimą ir pagrindinį stilių, taškas prieš milisekundes. **ASS**: tekstas + laikas + pilnas stilius (šriftai, spalvos, kontūrai, pozicionavimas, efektai), laikas iki centisekundžių. **SBV**: „YouTube“ minimalus subtitrų formatas, pradžia ir pabaiga vienoje eilutėje. **LRC**: dainų tekstų formatas, tik pradžios laikas, nėra pabaigos laiko, nėra stiliaus."
    ]
   },
   {
    "h2": "Keliai tarp formatų",
    "ps": [
     "Bet kuris iš šių elementų konvertuojamas į abi puses [[keitiklyje|/convert.html]]: skaitymas palaiko srt, vtt, ass (įskaitant ssa), sbv, lrc, txt; eksportas palaiko srt, vtt, ass, sbv, lrc, txt. Kiekvienas įprastas kelias turi savo vadovą: [[SRT į VTT|/guides/srt-to-vtt.html]], [[VTT į SRT|/guides/vtt-to-srt.html]], [[SRT į ASS|/guides/srt-to-ass.html]], [[ASS į SRT|/guides/ass-to-srt.html]], [[SBV į SRT|/guides/sbv-to-srt.html]], [[LRC į SRT|/guides/lrc-to-srt.html]]."
    ]
   },
   {
    "h2": "Ką praranda konvertavimai",
    "ps": [
     "Konvertuojant į SRT visada prarandamas stilius ir pozicionavimas (SRT jų negali talpinti). Konvertuojant į ASS su šiuo įrankiu **atkuriamas numatytasis stilius ir neišsaugomas originalus**. LRC į SRT reikia įvesti pabaigos laiką (kiekviena eilutė tęsiasi iki kitos; paskutinė gauna 3 sekundžių). Laiko reikšmės ir tekstas išlieka identiški bet kuria kryptimi."
    ]
   }
  ]
 },
 "subtitle-garbled-characters": {
  "seo": {
   "title": "Iš kur atsiranda subtitrų kodavimo klaidos (Mojibake) – Pastebėkite, pataisykite – AI-SRTSub",
   "desc": "„Mojibake“ reiškia klaidingą skaitymą, o ne sugadintą failą. Pakeitimo simboliai, kirčiuotų raidžių sienos ir neaiškių simbolių eilės nurodo priežastį – sužinokite, kurios atsigauna, o kurios niekada.",
   "h1": "Iš kur atsiranda subtitrų mojibake",
   "intro": "Tie patys baitai, nuskaityti kaip UTF-8 ir nuskaityti kaip GBK, pateikia du visiškai skirtingus simbolių rinkinius. Šlamšto teksto išvaizda yra tiesioginis įrodymas, kuris žingsnis nepavyko.",
   "ctaText": "Atidarykite kodavimo taisymo įrankį"
  },
  "body": [
   {
    "h2": "Failas yra geras – jis buvo nuskaitytas klaidingai",
    "ps": [
     "Subtitrų faile saugomi baitai. Norint paversti baitus simboliais, reikia žinoti, kokia koduote jie buvo parašyti – jei suklysite, gausite mojibake. Iš failo nedingo nė vienas baitas; nuskaitykite jį iš naujo su tinkama koduote ir simboliai sugrįš.",
     "Tai padalija darbą į dvi dalis: **išsiaiškinti, kokia koduote jis prasidėjo** ir **išsaugoti jį kaip koduotę, kurią jūsų grotuvas gali aptikti**. Pirmasis kyla iš bandomojo dekodavimo ir vertinimo, antrasis – iš kopijos išsaugojimo. Jie sprendžia skirtingas problemas."
    ]
   },
   {
    "h2": "Penkios išvaizdos, penkios priežastys",
    "ps": [
     "„Mojibake“ nėra atsitiktinis – jo išvaizda išduoda, kas jį sukėlė:"
    ],
    "img": {
     "file": "repair-diag",
     "alt": "Diagnostikos kortelė, kurioje nurodytas kiekvienas mojibake pėdsakas",
     "cap": "Diagnostika rūšiuoja mojibake pagal priežastį, o ne sujungia į krūvą"
    }
   },
   {
    "h2": "Kodėl pakeitimo simbolio negalima pataisyti",
    "ps": [
     "Pakeitimo simbolis yra skiriamoji linija. `�` reiškia, kad baitai jau buvo išmesti **ankstesniame žingsnyje** (paprastai kokia nors programa skaito failą ir išsaugo jį iš naujo) ir nieko nebuvo įrašyta apie tai, kas buvo atmesta. Tuo metu nėra ko mąstyti atgal – niekas negali jo pataisyti.",
     "Todėl taisymo puslapis du atvejus sprendžia skirtingai. Įkelkite failą ir originalūs baitai bus nepažeisti, leidžiantys išbandyti kiekvieną koduotę; jei įklijuotame tekste jau yra pakeitimo simbolio, jis aiškiai sako: „negalima pataisyti, įkelkite originalų failą“.",
     "Taip pat yra ir atvirkštinis atvejis: turinys skaitomas puikiai, bet grotuvas vis tiek rodo šlamštą. Failas nėra kaltas – **grotuvas pasirinko neteisingą koduotę**. Teksto redagavimas nepadės; išsaugokite kopiją kaip UTF-8 su BOM arba GBK ir pateikite ją jam."
    ],
    "img": {
     "file": "repair-up",
     "alt": "Įkėlimo sritis: nuvilkimas ir įklijavimas kaip du įėjimo taškai",
     "cap": "Įkelkite failą, jei galite – nepažeisti baitai reiškia, kad yra ką taisyti"
    }
   },
   {
    "h2": "Ką jis lygina taisydamas",
    "ps": [
     "Įrankis išbando kiekvieną tikėtiną koduotę, tada įvertina kiekvieną rezultatą: kiek jo sudaro dažni simboliai, ar yra akcentų eilučių, simbolių eilučių, ar CJK raidžių virtinės yra neaiškių simbolių sienos. Geriausiai įvertintas rezultatas patenka į sąrašo viršų.",
     "**Jei jokių taškų nėra akivaizdžiai geresnių, niekas nerekomenduojama** – geriau pasakyti „tai skaitosi gerai kaip yra“, nei apgauti jus kažkuo, kas tik miglotai primena kalbą. Du kartus sugadintas tekstas (vieną kartą neteisingai išsaugotas, o po to neteisingai pataisytas) gauna dar vieną atgalinio sprendimo etapą geriausiems kandidatams."
    ],
    "img": {
     "file": "repair-fix",
     "alt": "Kandidatų sąrašas, sušūriuotas pagal balus, kurių kiekvienas paženklintas savo koduotės pora",
     "cap": "Kandidatai pagal balus – nėra aiškaus nugalėtojo, nėra rekomendacijos"
    }
   },
   {
    "h2": "Tinkamos koduotės išsaugojimas užbaigia darbą",
    "ps": [
     "Pataisytą tekstą vis tiek reikia išsaugoti kaip koduotę, kurią jūsų grotuvas atpažįsta. „Windows“ grotuvai paprastai pasikliauja BOM, kad aptiktų koduotę, todėl **UTF-8 su BOM** kelia mažiausiai problemų; senesnei aparatinei įrangai ir kai kuriems regioniniams grotuvams reikia GBK. Galite pasirinkti UTF-8, UTF-8 (su BOM), GBK, Big5, Shift_JIS arba EUC-KR, ir jums bus liepta pasirinkti kitą, jei kažkas netinka (GBK negali talpinti korėjiečių k.)."
    ],
    "img": {
     "file": "repair-out",
     "alt": "Rezultato sritis: išsaugoti-kaip koduotės išskleidžiamasis meniu ir atsisiuntimo mygtukas",
     "cap": "Išsaugokite kaip kažką, ką grotuvas atpažįsta, ir mojibake bus iš tikrųjų išspręstas"
    }
   },
   {
    "h2": "Susiję įrankiai ir vadovai",
    "ps": [
     "Išsamus vadovas – [[Kaip pataisyti sugadintus subtitrus|/guides/repair.html]]; kas iš tikrųjų saugoma SRT faile – [[Kas yra SRT failo viduje|/guides/srt-file-format.html]]; koduotė gera, bet turinys purvinas (vandens ženklai, reklamos, kurčiųjų žymos) – [[Subtitrų valymas|/clean.html]]."
    ]
   }
  ]
 },
 "subtitle-glossary": {
  "seo": {
   "title": "Terminų lentelės: vienas sezonas, vienas žodynas – Kada sukurti – AI-SRTSub",
   "desc": "Terminų lentelė ištaiso tą patį žodį, kuris rodomas nenuosekliai: kada sukurti, kaip jį pakartotinai naudoti per sezoną, kodėl viso žodžio atitikimas nieko nedaro kinų kalba ir ko jam neduoti.",
   "h1": "Terminų lentelės: sezono nuoseklumo palaikymas",
   "intro": "Kai vardas pirmajame epizode yra A, o septintajame – B, žiūrovai manote, kad tai du skirtingi personažai. Terminų lentelė užkerta kelią būtent tam – ji sutvarko, kaip kas vadinama.",
   "ctaText": "Atidarykite paketinį terminų keitimą"
  },
  "body": [
   {
    "h2": "Terminų lentelė ištaiso nenuoseklumą",
    "ps": [
     "Subtitrų formuluočių problemos yra dviejų rūšių: „šis žodis išverstas neteisingai“ ir „tas pats žodis išverstas skirtingai skirtingose vietose“. Pirmoji yra žodyno problema; antroji – skirta terminų lentelei.",
     "Antroji yra ir dažnesnė, ir sunkiau pastebima: `Thor` pirmajame epizode tampa „Toras“, o septintajame – „Donaras“, ir kiekvienas epizodas atskirai atrodo gerai, o serialas kaip visuma verčia žiūrovus galvoti, kad pasirodė naujas personažas. Terminų lentelė paverčia „šiame kūrinyje jis vadinamas Toru“ į vykdytiną taisyklę, taikomą visam subtitrų failui iš karto."
    ]
   },
   {
    "h2": "Kada verta jį sukurti",
    "ps": [
     "Ne kiekvienam subtitrų failui reikia terminų lentelės. Atvejai, kurie tai pateisina, paprastai yra šie:"
    ],
    "img": {
     "file": "glossary-rules",
     "alt": "Pakeitimo taisyklės, sugrupuotos pagal kategorijas terminų lentelėje",
     "cap": "Naudokite # komentarus taisyklėms sugrupuoti ir laikinai išjungti redagavimo metu"
    }
   },
   {
    "h2": "Vienos lentelės palaikymas visą sezoną",
    "ps": [
     "Terminų lentelė tvarkoma **palaipsniui**: nusistatykite vardus pirmajame epizode, tada pridėkite taisyklę kiekvieną kartą, kai pasirodo naujas terminas, ir iki sezono pabaigos lentelė bus pilna. Kitam to paties serialo sezonui pradėkite nuo jos.",
     "Parašykite taisykles šiek tiek platesnes nei griežtai reikalaujama – nusprendę dėl „Toro“, pridėkite ir „Donaras -> Toras“, kad kieno nors kito subtitrus būtų galima sulygiuoti tuo pačiu metu.",
     "Vėliau visada perskaitykite **pakeitimų sąrašą**: jame įvardytas kiekvienas cue, kiekviena eilutė ir kas kuo tapo. Tai vienintelė vieta, kur galite patvirtinti, kad pakeitimas buvo teisingas ir nepersūdytas, o bet kurį nepatinkantį įrašą galite anuliuoti spustelėjimu."
    ],
    "img": {
     "file": "glossary-diff",
     "alt": "Atskirų pakeitimų sąrašas rezultato srityje",
     "cap": "Kiekvienas pakeitimas yra išvardytas; spustelėkite tą, kurio nenorite anuliuoti"
    }
   },
   {
    "h2": "Ko nereikia duoti terminų lentelei",
    "ps": [
     "Terminų lentelė keičia **žodžius**. Šie dalykai neįeina į jos darbą ir turėtų būti:",
     "**Gramatika ir sakinio struktūra** – negalite paversti žodžio sakiniu; darbas sakinio lygiu grįžta į [[Subtitrų vertimas|/translate.html]] arba žmogui.",
     "**Turinio valymas** – viso eilučių, tokių kaip vandens ženklai, reklamos ir SDH cue, šalinimas priklauso [[Subtitrų valymas|/clean.html]]; terminų lentelės taisyklės keičia, jos neištrina eilučių.",
     "**Laiko žymės** – terminų lentelė niekada neliečia laiko. Dėl pasaulinio poslinkio ar dažnio problemos eikite į [[Laiko juostos koregavimas|/shift.html]]."
    ]
   },
   {
    "h2": "Keletas dalykų, kuriuos lengva suprasti neteisingai",
    "ps": [
     "**Kinų kalba vis tiek pakeičia dalinius žodžius pažymėjus viso žodžio atitiktį – tai normalu.** Kinų ir japonų kalbos neatskiria žodžių tarpais, todėl įrankis negali nustatyti žodžio ribų ir viso žodžio atitiktis ten neturi jokio poveikio; `art` nelies `start` apsauga veikia tik anglų kalbai.",
     "**Tvarka keičia rezultatą.** Taisyklės vykdomos iš viršaus į apačią, o tekstą, sukurtą vienos taisyklės, iš naujo nuskaito žemiau esančios taisyklės. Pakeiskite A į B, o tada B į C ir gausite C.",
     "**Norėdami pakeisti tik vertimą, nustatykite apimtį.** Dvikalbiame failyje pasirinkite „tik antra eilutė“; įrašai su viena eilute lieka nepakeisti pagal bet kurį vienos eilutės nustatymą – įrankis neatspėja, kuri pusė yra originalas.",
     "**Terminų lentelė neišsaugoma.** Kiekvieną kartą atidarius puslapį ji yra tuščia, todėl pasilikite savo teksto failą ir perduokite jį toliau."
    ]
   },
   {
    "h2": "Susiję įrankiai ir vadovai",
    "ps": [
     "Išsamų vadovą rasite [[Kaip paketu keisti terminus subtitruose|/guides/glossary.html]]; jei turinys purvinas, pirmiausia paleiskite [[Subtitrų valymas|/clean.html]]; kai vardai nusistovės ir prireiks kitų kalbų, eikite į [[Subtitrų vertimas|/translate.html]]; ir paleiskite rezultatą per [[Subtitrų QC|/qc.html]]."
    ]
   }
  ]
 },
 "subtitle-quality-check": {
  "seo": {
   "title": "Subtitrų kokybės kontrolės patikrinimo sąrašas prieš pristatymą – AI-SRTSub",
   "desc": "Subtitrų pristatymo patikrinimo sąrašas: dažniausiai sugenda persidengimai, skaitymo greitis, eilutės plotis ir skyryba. Vykdykite 17 kokybės kontrolės taisykles – pusė problemų išsprendžiama vienu paspaudimu.",
   "h1": "Ką patikrinti prieš pristatymą",
   "intro": "Baigti subtitrai nėra paruošti pristatymui: problemos, kurias žiūrovai pastebi iš pirmo žvilgsnio, yra būtent tos, kurių nematai peržiūrėjęs šimtą kartų. Šiame patikrinimo sąraše aptariamas paskutinis etapas.",
   "ctaText": "Atlikite subtitrų kokybės kontrolės patikrinimą"
  },
  "body": [
   {
    "h2": "Kodėl patys nematote problemų",
    "ps": [
     "Kiekvienas, kuriantis subtitrus, per gerai žino turinį – žinote, ką kiekviena eilutė sako toliau, todėl niekada neatrodo per greita; maketą matėte šimtus kartų, o jūsų akys pačios praleidžia trūkumus. Taigi patikrinimas prieš pristatymą negali remtis „žiūrėjimu vėl iš naujo nuo viršaus“ – jis turi būti **matuojamas skaičiais**: skaitymo greitis, eilutės plotis, trukmė, persidengimai. Leiskite nuspręsti skaičiams."
    ]
   },
   {
    "h2": "Šešios dažniausios nesėkmės",
    "ps": [
     "Surūšiuoti pagal tai, kaip dažnai jie sužlugdo pristatymą:"
    ]
   },
   {
    "h2": "How to Check :: Kaip patikrinti",
    "ps": [
     "Atidarykite [[Subtitrų QC|/qc.html]] ir įmeskite savo subtitrus; nustatykite kalbos automatinį aptikimą (27 kalbos, kurių kiekviena turi savo taisyklių pakopas). Ataskaitoje išvardytos išvados trimis lygiais – **klaidos / įspėjimai / patarimai** – kiekviena su įrašo numeriu ir išmatuota verte. Su klaidomis reikia kovoti (sugadintas tekstas, laiko žymės formatas, pabaiga ankstesnė už pradžią, sugadintas numeravimas); įspėjimai priklauso nuo atvejo (persidengimai, skaitymo greitis, eilutės plotis, trukmė); patarimai – tai poliravimas (eilutės lūžio pozicija, tarpai, skyryba)."
    ],
    "img": {
     "file": "qc-report",
     "alt": "Kokybės kontrolės ataskaita: trijų lygių problemų sąrašas, kiekviena išvada su įrašo numeriu ir išmatuotos ir slenksčio vertės palyginimu",
     "cap": "Trijų lygių ataskaita, kurioje pateikiamas įrašo numeris ir išmatuota vertė kiekvienai išvadai"
    }
   },
   {
    "h2": "Ką galima ištaisyti vienu paspaudimu",
    "ps": [
     "Numeravimas, tušti įrašai, perrašymas, tarpai ir skyryba – viskas, kas **palieka laiko žymes nepakeistas** – gali būti pataisyta automatiškai; pataisymai, kurie **keičia laiko žymes** (pradžios ir pabaigos sukeitimas, persidengimų perstumimas, trukmės sutrumpinimas ar išplėtimas), pagal nutylėjimą yra nepažymėti ir turėtų būti pažymėti tik patvirtinus poveikį. **Skaitymo greitis virš ribos neturi automatinio taisymo** – mašina negali žinoti, kurį žodį iškirpti, todėl patys sutrumpinkite vertimą arba šiek tiek sušvelninkite laiką; žr. [[Subtitrai per greiti skaityti|/guides/subtitle-too-fast.html]]. Pataisius, naujas patikrinimas paleidžiamas automatiškai, o ataskaitoje skaičiuojama tik tai, kas iš tikrųjų buvo pataisyta."
    ]
   },
   {
    "h2": "While You’re At It :: Kol tuo užsiimate",
    "ps": [
     "Ataskaitos puslapyje galima tiesiogiai atsisiųsti gryno teksto `.qc.txt` ataskaitą – pridėkite ją prie pristatymo, kad kita pusė iš pirmo žvilgsnio pamatytų, ką patikrinote. Neseniai išverstiems subtitrams atlikite kokybės kontrolę prieš pristatymą; bendras laiko juostos vėlavimas yra kito tipo problema – jei po patikrinimo skaitymo greitis vis tiek netinka, žr. [[Subtitrai vėluoja ir nesutampa|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "subtitle-speed-converter": {
  "seo": {
   "title": "Sinchronizuoti subtitrus pakeitus vaizdo įrašo greitį – AI-SRTSub",
   "desc": "Vaizdo įrašas pagreitintas arba sulėtintas, o subtitrai nebepasiekia: įveskite greičio koeficientą mastelio keitimo pagal dažnį žingsnyje ir visa laiko juosta išsiplečia kartu su vaizdo įrašu.",
   "h1": "Koreguoti subtitrus pakeitus vaizdo įrašo greitį",
   "intro": "Vaizdo įrašas apskritai pagreitėjo arba sulėtėjo, subtitrai liko pradiniu tempu – viskas po tam tikro taško nesutampa. Įveskite koeficientą ir visa laiko juosta pasikeičia pagal vaizdo įrašą.",
   "ctaText": "Atidarykite laiko rengyklę"
  },
  "body": [
   {
    "h2": "Kada naudoti dažnį, o ne poslinkį",
    "ps": [
     "Vaizdo įrašas buvo pagreitintas arba sulėtintas **kaip visuma** (tarkime, 0.9x arba 1.25x redagavimo programinėje įrangoje), o kiekvienas cue išlaikė savo pradinį ritmą: pradžia sutampa, o kuo toliau einate, tuo blogiau – su pastoviu santykiu. Tai dažnio problema. Jei visas failas tiesiog pasislinkęs fiksuotu dydžiu neaugant, poslinkio pakanka – žr. [[viso subtitrų failo perkėlimas ankstesniam arba vėlesniam laikui|/guides/shift-subtitle-timing.html]]."
    ]
   },
   {
    "h2": "Ką skaičių įvesti",
    "ps": [
     "Subtitrai turi sekti vaizdo įrašą, todėl įveskite **koeficientą, kuriuo vaizdo įrašas iš tikrųjų pasikeitė**: 1.25x pagreitėjimas reiškia, kad cue laikas padauginamas iš 1.25, kad pasivytų; 0.9x sulėtėjimas padauginamas iš 0.9. Laiko rengyklėje pridėkite **Keisti mastelį pagal dažnį** žingsnį ir įveskite koeficientą reikšmių laukelyje."
    ],
    "img": {
     "file": "shift-step-rate",
     "alt": "Keisti mastelį pagal dažnį su koeficientu reikšmių laukelyje",
     "cap": "Koeficientas virš 1 išplečia laiko juostą (pagreitintam vaizdo įrašui), žemiau 1 suspaudžia ją (sulėtintam)."
    }
   },
   {
    "h2": "Kuo tai skiriasi nuo poslinkio",
    "ps": [
     "Poslinkis **perkelia** kiekvieno cue laiką tuo pačiu fiksuotu kiekiu ir išlaiko cue trukmę; dažnis **padaugina** ir pradžią, ir pabaigą, todėl trukmės taip pat keičiasi proporcingai. Pakeitus greitį, pasikeitė pati trukmė – būtent todėl reikalingas dažnis."
    ]
   },
   {
    "h2": "Jei nesate tikri dėl koeficiento",
    "ps": [
     "Kai koeficientas prarastas, grįžkite prie **dviejų atskaitos taškų**: įveskite tikrąjį pirmojo ir paskutinio cue vaizdo įrašo laiką, ir viskas tarp jų proporcingai pasklinda – prilygsta tinkamo koeficiento radimui. Žr. [[subtitrai vis labiau nesutampa|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "subtitle-too-fast": {
  "seo": {
   "title": "Subtitrai per greiti skaityti – Pataisyti skaitymo greitį – AI-SRTSub",
   "desc": "Subtitrai per greiti skaityti – trumpa trukmė ar ilgas tekstas? Kokybės kontrolė pažymi įrašus, viršijančius 20 simb./sek. (9 hanzi CJK); trukmės taisomos automatiškai, tekstą reikia redaguoti.",
   "h1": "Subtitrai per greiti skaityti",
   "intro": "Žiūrovai vis spaudžia pauzę? Kaltininkas yra skaitymo greitis. Kaip jį išmatuoti, kaip pataisyti ir kada redaguoti tekstą, o kada laiką – viskas viename vadove.",
   "ctaText": "Check Reading Speed :: Patikrinkite skaitymo greitį"
  },
  "body": [
   {
    "h2": "Kas yra skaitymo greitis?",
    "ps": [
     "Skaitymo greitis – tai tiesiog **tai, ar žiūrovai spėja perskaityti subtitrus per laiką, kol jie rodomi ekrane**. Matematika paprasta: teksto plotis padalytas iš sekundžių ekrane. Įprastos pramonės ribos: 9 viso pločio simbolių per sekundę kinų, japonų ir korėjiečių kalboms (18 pusės pločio vienetai), 20 pusės pločio vienetai per sekundę kitoms kalboms. 20 hanzi eilutė, trunkant 1 sekundę, sudaro 40 pločio vienetus per sekundę – daugiau nei dvigubai viršija ribą, ir žiūrovai jos niekada neperskaitys."
    ]
   },
   {
    "h2": "Pirmiausia atskirkite, kokio tipo greitumas",
    "ps": [
     "„Per greitai perskaityti“ iš tikrųjų yra dvi skirtingos problemos: **per trumpa trukmė** – cue išnyksta po vieno ar dviejų šimtų milisekundžių, paprastai tai laiko klaida arba redagavimo liekana; **per ilgas tekstas** – trukmė gera, bet eilutėje telpa 30 hanzi, ir joks greičio apribojimas jos neišgelbės. Pataisymai yra priešingi, todėl pirmiausia išsiaiškinkite, kurį turite."
    ],
    "img": {
     "file": "qc-rules",
     "alt": "Skaitymo greičio apribojimo nustatymas kokybės kontrolės puslapyje, kurio numatytoji reikšmė CJK yra 18, o kitoms kalboms – 20",
     "cap": "Kokybės kontrolės skaitymo greičio slenksčiai: 18 pločio vienetų per sekundę CJK, 20 kitoms kalboms"
    }
   },
   {
    "h2": "How to Check :: Kaip patikrinti",
    "ps": [
     "Atidarykite [[Subtitrų QC|/qc.html]] ir įmeskite savo subtitrus. Ataskaitoje „per trumpa trukmė“ yra įspėjimas, rodantis išmatuotas milisekundes (slenkstis: 833 milisekundės); „neįskaitomas greitis“ yra atskira išvada, rodanti išmatuotus pločio vienetus per sekundę. Dvikalbiams subtitrams skaičiuojama tik eilutė, parašyta tiksline kalba – dvi kalbos nesumuojamos."
    ]
   },
   {
    "h2": "How to Fix It :: Kaip tai pataisyti",
    "ps": [
     "**Per trumpa trukmė**: pataisoma vienu paspaudimu – cue automatiškai pratęsiamas iki 833 milisekundžių, neperžengiant kito cue pradžios (pataisymas negali sukurti naujų persidengimų). **Per ilgas tekstas**: jokio automatinio pataisymo – mašina negali žinoti, kurį žodį iškirpti. Du keliai, jūsų pasirinkimas: sutrumpinkite vertimą (spustelėkite langelį vertimo įrankyje, kad jį redaguotumėte) arba ištempkite šio cue trukmę (tik jei prieš kitą cue yra tarpas; dėl bendrų laiko juostos problemų žr. [[Laiko poslinkis|/shift.html]]). Po to vėl paleiskite kokybės kontrolę, kad patvirtintumėte, jog skaitymo greitis vėl neviršija slenksčio."
    ]
   },
   {
    "h2": "Don’t Overcorrect :: Nepersistenkite taisyriau",
    "ps": [
     "Greičio apribojimo pasiekimas nereiškia patogaus žiūrėjimo: kiekvieno cue sukimšimas iki 9 simbolio per sekundę paverčia visą filmą varginančiu. Kaip taisyklę, dažniausiai laikykitės maždaug 70% slenksčio ribos, o dialogų gausiose vietose kartais leiskite šiek tiek viršyti. Subtitrų blokai, kurie mirksi per dažnai, patys savaime yra problema – prieš pristatymą paleiskite visą metrikų rinkinį, žr. [[Ką patikrinti prieš pristatymą|/guides/subtitle-quality-check.html]]."
    ]
   }
  ]
 },
 "subtitles-out-of-sync": {
  "seo": {
   "title": "Subtitrai vėluoja ir vis labiau nesutampa? Pataisykite tai – AI-SRTSub",
   "desc": "Prasideda gerai, iki filmo vidurio atsilieka keliomis sekundėmis, pabaigoje netinkamas naudoti: tai progresyvus vėlavimas, dažniausiai kadrų dažnio neatitikimas arba vaizdo įrašo greičio pokytis. Du atskaitos taškai tai ištaiso.",
   "h1": "Subtitrai vis labiau nesutampa: priežastys ir pataisymai",
   "intro": "Pradžioje gerai, po pusvalandžio vėluoja porą sekundžių, pabaigoje beviltiška. Šio tipo vėluojantis nesutapimas turi žinomas priežastis ir žinomą pataisymą.",
   "ctaText": "Fix this file :: Pataisykite šį failą"
  },
  "body": [
   {
    "h2": "Pirmiausia atskirkite dvi nesutapimo rūšis",
    "ps": [
     "Nesutapimas būna dviejų rūšių: **vienodas poslinkis** reiškia, kad kiekvienas cue vėluoja (arba skuba) tuo pačiu kiekiu, maždaug vienodu nuo pradžios iki pabaigos; **progresyvus vėlavimas** reiškia, kad pradžia teisinga, o klaida auga į pabaigą, galbūt pasiekdama minutes. Šis straipsnis yra apie antrąją rūšį – pirmąją žr. [[viso subtitrų failo perkėlimas ankstesniam arba vėlesniam laikui|/guides/shift-subtitle-timing.html]]."
    ]
   },
   {
    "h2": "Kodėl jis vis daugiau vėluoja",
    "ps": [
     "Vėlavimas kyla iš **dviejų skirtingų laikrodžių**: trys dažniausios priežastys yra (1) kadrų dažnio neatitikimas – 24 fps filmo subtitrai 25 fps šaltinyje praranda daugiau nei sekundę per minutę; (2) vaizdo įrašas buvo pagreitintas arba sulėtintas, o subtitrai išlaikė savo pradinį tempą; (3) VFR (kintamo kadrų dažnio) įrašas, kurio laiko juosta iš pradžių yra nelygi. Kas jiems bendro: klaida auga maždaug tiesiškai su grojimo laiku."
    ]
   },
   {
    "h2": "Pataisykite dviem atskaitos taškais",
    "ps": [
     "Kadangi klaida auga tiesiškai, teisingo laiko užfiksavimas kiekviename gale ir vidurio proporcingas paskirstymas viską sugrąžina į vietą. Laiko rengyklėje pridėkite **dviejų atskaitos taškų koregavimą**: du „esamieji“ laukai automatiškai užpildomi šio failo pradiniais laikais; žiūrite vaizdo įrašą ir į du „tikslinius“ laukus įvedate, **kada iš tikrųjų pasirodo pirmasis ir paskutinis cue**."
    ],
    "img": {
     "file": "shift-step-two",
     "alt": "Dviejų atskaitos taškų koregavimas: esami laikai užpildomi automatiškai, tiksliniai laikai įvedami rankiniu būdu",
     "cap": "Paimkite atskaitos taškus ties dviem kraštais – mažiausia ir didžiausia pradine klaida – ir viskas tarp jų vėl proporcingai pasklinda."
    }
   },
   {
    "h2": "Kaip patikrinti rezultatą",
    "ps": [
     "Paleidus rezultatų skydelyje pateikiami kiekvieno cue pradiniai ir nauji laikai **vienas šalia kito**. Patikrinkite tris vietas: pirmąjį cue, vieną viduryje ir paskutinį – tris pozicijas su mažiausia, vidutine ir didžiausia pradine klaida. Jei visos trys pataiko, pataiko ir visas failas."
    ],
    "img": {
     "file": "shift-result",
     "alt": "Rezultato skydelis: laikai prieš ir po vienas šalia kito, su atsisiuntimo mygtuku",
     "cap": "Nauji vidurinių cue laikai turėtų patekti tarp dviejų galų – tai ženklas, kad proporcija teisinga."
    }
   },
   {
    "h2": "Kai dviejų atskaitos taškų nepakanka",
    "ps": [
     "Dviejų atskaitos taškų koregavimas daro prielaidą, kad klaida yra **tiesinė**. Jei šaltinis yra VFR ekrano įrašas su kadrų dažnio šuoliu failo viduryje, tiesinis tempimas negali pataisyti vidurio – paimkite akivaizdžiai nesutampantį vidurinį cue kaip trečią tašką, padalykite failą ten ir paleiskite dviejų atskaitos taškų koregavimą kiekvienai pusei. Taip pat po pataisymo peržiūrėkite vidurinę dalį įprastu greičiu, kad patvirtintumėte, jog neliko jokių vietinių nesutapimų."
    ]
   }
  ]
 },
 "table": {
  "seo": {
   "title": "Subtitrų konvertavimas į „Excel“ / CSV – abi kryptys – AI-SRTSub",
   "desc": "Vaikščiojimas į abi puses: eksportuokite SRT/VTT į „Excel“ arba CSV, kad galėtumėte tikrinti eilutę po eilutės, tada importuokite redaguotą lentelę atgal kaip subtitrus. Reikia trijų stulpelių, bet kokia tvarka; laikas paliekamas kaip tekstas.",
   "h1": "Kaip konvertuoti subtitrus į „Excel“ / CSV",
   "intro": "Koreguoti ir versti lengvesnė užduotis skaičiuoklėje. Eksportuokite subtitrus į „Excel“ arba CSV, redaguokite eilutę po eilutės, tada konvertuokite atgal – laiko stulpeliai lieka teksto formato, o eilutės lūžiai dialoge išsaugomi.",
   "ctaText": "Atidaryti lentelių keitiklį"
  },
  "body": [
   {
    "h2": "What this tool does :: Ką daro šis įrankis",
    "ps": [
     "Subtitrai yra užuominų eilutės, o skaičiuoklės – įrašų eilutės. Kai tai tampa lentele, korektūra, komentarai ir masinis vertimas gali būti atliekami jūsų jau žinomis įrankiais. Palaikomos abi kryptys:"
    ]
   },
   {
    "h2": "Įkelkite ir pasirinkite kryptį",
    "ps": [
     "Tempkite failą arba ieškokite jo kompiuteryje. Kiekvienai ašiai reikia kito tipo failo: **į lentelę** priima subtitrų failus (SRT / VTT), **į subtitrus** priima skaičiuoklės failus (CSV / „Excel“, tiek .xlsx, tiek .xls). Pasirinkus netinkamą režimą, puslapis praneš, kokio failo tipo tam režimui reikia.",
     "⚠️ Šis puslapis skaito tik UTF-8. Jei jūsų subtitrai atsidaro kaip pilnas ekranas klaustukų ar langelių, iš pradžių paleiskite juos per [[Koduotės taisymą|/repair.html]] – sugadinta koduotė čia skaitoma tik kaip pakaitiniai simboliai."
    ],
    "img": {
     "file": "table-up",
     "alt": "Lentelių keitiklio įkėlimo sritis: numetimo zona ir du režimų jungikliai",
     "cap": "Kiekvienas režimas nori kito failo: subtitrai į vidų, skaičiuoklė į išorę – ir atgal"
    }
   },
   {
    "h2": "Subtitrų eksportavimas į lentelę",
    "ps": [
     "Pasirinkite „į lentelę“, įmeskite subtitrus, ir peržiūroje pateikiama kiekviena užuomina: indeksas, pradžia, pabaiga, tekstas. Statistikos juosta rodo užuominų skaičių ir bendrą trukmę. Tada spustelėkite „Atsisiųsti Excel (.xlsx)“ arba „Atsisiųsti CSV“.",
     "Skirtumas tarp jų: .xlsx yra tikras skaičiuoklės failas, kuriame „Excel“ negali slapta pertvarkyti jūsų laiko stulpelio; CSV yra mobilesnis, tačiau atidarant „Excel“ gali suprasti laiko stulpelį kitaip. Jei taip atsitinka, pasirinkite laiko stulpelį ir nustatykite jo formatą kaip „Tekstas“ – arba tiesiog naudokite .xlsx."
    ],
    "img": {
     "file": "table-prev",
     "alt": "Lentelės peržiūra: indėkso, pradžios, pabaigos ir teksto stulpeliai su statistikos juosta",
     "cap": "Peržiūrėta kiekviena užuomina; statistikos juosta pateikia užuominų skaičių ir bendrą trukmę"
    }
   },
   {
    "h2": "Lentelės importavimas atgal į subtitrus",
    "ps": [
     "Pasirinkite „į subtitrus“, įmeskite lapą, ir čia yra stulpelių taisyklė: reikia trijų stulpelių skirtų **pradžiai, pabaigai ir tekstui** (angliškos antraštės Start / End / Text taip pat veikia), **bet kokia tvarka**. Priimami ir `00:00:01,500`, ir `00:00:01.500`; eilutės, kurių nepavyksta išanalizuoti, praleidžiamos, o ne atmetamas visas failas.",
     "Rezultatas peržiūroje pateikiamas užuomina po užuominos; patvirtinkite, tada atsisiųskite SRT arba VTT. Jei trūksta šių trijų stulpelių, gausite pranešimą, liepiantį patikrinti antraštes – dažniausiai todėl, kad eksportuojant buvo naudojamas kitoks pavadinimas arba antraščių eilutė nėra pirmoji eilutė."
    ],
    "img": {
     "file": "table-back",
     "alt": "Subtitrų rezultatų sritis: importuoti subtitrai išvardyti užuomina po užuominos",
     "cap": "Apie neatpažintus stulpelius pranešama, jie niekada nebūti ignoruojami tyliai"
    }
   },
   {
    "h2": "FAQ :: DUK",
    "ps": [
     "**„Excel“ neteisingai rodo laiko stulpelį?** Naudokite .xlsx ir tai niekada nenutiks. Jei privalote naudoti CSV: prieš atidarydami pasirinkite laiko stulpelį ir nustatykite langelio formatą į „Tekstas“.",
     "**Ar stulpelių antraštės turi būti angliškos?** Ne. Start / End / Text atpažįstami bet kuria šio puslapio palaikoma kalba, o raidžių dydis neturi reikšmės.",
     "**Ar po importavimo eilutės lūžiai išliko?** Taip. Dialogo viduje esantys eilutės lūžiai yra išsaugomi iki pat originalaus lūžiavimo.",
     "**Ar palaikomas ASS?** Šis puslapis tvarko tik SRT ir VTT. ASS apima stiliaus direktyvas – pirmiausia konvertuokite jį į SRT su [[Formato keitikliu|/convert.html]].",
     "**Kiek failų vienu metu?** Vieną. Norėdami apdoroti dešimtis ar šimtus, naudokite [[Paketinį konvertavimą|/batch.html]] (kuris tik konvertuoja formatus ir nepereina per lentelę)."
    ]
   },
   {
    "h2": "Privacy :: Privatumas",
    "ps": [
     "Konvertavimas vyksta visiškai jūsų naršyklėje. Joks subtitrų turinys niekada nesiunčiamas į serverį."
    ]
   },
   {
    "h2": "Susiję įrankiai ir vadovai",
    "ps": [
     "Jei viskas, ko norite, yra subtitru-į-„Excel“ veiksmas, žiūrėkite [[Konvertuoti subtitrus į Excel|/guides/srt-to-excel.html]]; po to norint versti į kitą kalbą – [[Subtitrų vertimas|/translate.html]]; dešimtys failų vienu metu – [[Paketinis konvertavimas|/batch.html]]."
    ]
   }
  ]
 },
 "translate": {
  "seo": {
   "title": "Dirbtinio intelekto subtitrų vertimas – dvikalbis eksportas – AI-SRTSub",
   "desc": "Verskite subtitrus su DI: įkelkite SRT/VTT/ASS, pasirinkite iš 100 kalbų, suvienodinkite vardus žodynu, eksportuokite dvikalbius subtitrus. Nemokama pradžia, palaikomas savo API raktas.",
   "h1": "Kaip naudoti DI subtitrų vertimą",
   "intro": "Pilna vieno subtitrų failo darbo eiga nuo įkėlimo per vertimą iki eksporto: kas ekrane, ką spausti ir ką gaunate kiekviename žingsnyje.",
   "ctaText": "Atidaryti vertimo įrankį"
  },
  "body": [
   {
    "h2": "What this tool does :: Ką daro šis įrankis",
    "ps": [
     "Verčia subtitrus iš vienos kalbos į kitą ir eksportuoja par-uoštą naudoti subtitrų failą. Tipiniai poreikiai:"
    ]
   },
   {
    "h2": "Upload subtitles :: Įkelti subtitrus",
    "ps": [
     "Spustelėkite „Pasirinkti subtitrų failą“ arba įklijuokite subtitrų tekstą tiesiai į kairįjį įvesties laukelį. Palaikomi šeši formatai: SRT, VTT, ASS, SSA, SBV ir TXT. Neturite failo po ranka? Spustelėkite „Įkelti pavyzdį“, kad pamatytumėte veikimą. Išanalizavus vidurinis stulpelis rodo subtitrų lentelę su indeksu, laiko juosta ir šaltinio tekstu kiekvienam įrašui."
    ],
    "img": {
     "file": "translate-upload",
     "alt": "Vertimo įrankio importo sritis: pasirinkti subtitrų failą, įklijavimo laukelis ir įkelti pavyzdį mygtukas",
     "cap": "Kairysis stulpelis „Importuoti subtitrus“: pasirinkite failą, įklijuokite tekstą arba įkelkite pavyzdį"
    }
   },
   {
    "h2": "Pasirinkti kalbą ir stilių",
    "ps": [
     "„Šaltinio kalba“ gali likti ties automatiniu aptikimu; „paskirties kalba“ renkama iš 100 kalbų. Galimi penki vertimo stiliai: Subalansuotas (numatytasis), Šnekamasis, Oficialus profesionalus, Dubliavimo stilius ir Pasirinktinis. „Dubliavimo stilius“ tinka filmų ir TV dialogams; „Oficialus profesionalus“ tinka dokumentiniams filmams ir kursams."
    ],
    "img": {
     "file": "translate-lang",
     "alt": "Kalbos ir vertimo stiliaus nustatymai: šaltinio kalbos, paskirties kalbos išskleidžiamieji meniu ir penki stiliai",
     "cap": "„Kalba“ ir „vertimo stilius“: šaltinis gali automatiškai aptikti, 75 paskirties pasirinkimai"
    }
   },
   {
    "h2": "Žodynas: išlaikyti vardus nuoseklius",
    "ps": [
     "DI verčia partijomis, todėl tas pats vardas skirtingose partijose gali pasirodyti dviejuose skirtinguose variantuose. Įrašykite „šaltinis → turi būti išverstas kaip“ taisykles į žodyną; prieš kiekvieną partiją įrankis jį nuskaito ir seka kiekvieną atitikmenį. Viena taisyklė eilutėje; rodyklės gali būti `->`, `=>`, `→` arba Tab; vienišas šaltinio terminas reiškia palikti jį neišverstą; kelios rašybos gali dalintis viena išraiška per `|`. Spustelėkite „✨ AI ištraukti“, kad DI iš pradžių ištrauktų tikrinius daiktavardžius iš vaizdo įrašo į lentelę, tuomet juos redaguokite ir verskite."
    ],
    "img": {
     "file": "translate-glossary",
     "alt": "Žodyno ir tikrinių daiktavardžių sritis: žodyno įvesties laukelis su DI ištraukimo ir išsaugojimo mygtukais",
     "cap": "„Suvienodintų vardų“ žodynas: DI ištraukiami tikriniai daiktavardžiai, išsaugojus automatiškai įkeliami naujiems vaizdo įrašams"
    }
   },
   {
    "h2": "Vertimo procesas",
    "ps": [
     "Viršutinėje juostoje spustelėkite „▶ Pradėti vertimą“. Vidurinė statistikos juosta realiuoju laiku rodo įrašus, išverstus, išvalytus užpildus ir sakinių grupes per kelis įrašus; eigos juosta rodo numatomą likusį laiką ir sunaudotus žetonus. Versdami spustelėkite bet kurį vertimo langelį lentelėje, kad redaguotumėte tekstą – pakeitimai išsaugomi jūsų kompiuteryje ir išlieka po atnaujinimo. Uždarius puslapį viduryje proceso, jums bus pasiūlyta pratęsti ten, kur sustojote. Kai vienas sakinys apima kelis įrašus, grupė sujungiama, verčiama ir užpildoma iš naujo pagal trukmę."
    ],
    "img": {
     "file": "translate-workspace",
     "alt": "Vertimo darbinė sritis: statistikos juosta, eigos juosta ir redaguojama subtitrų lentelė",
     "cap": "Vidurinė darbinė sritis: statistikos juosta + eigos juosta + paspauskite ir redaguokite subtitrų lentelę"
    }
   },
   {
    "h2": "Export :: Eksportas",
    "ps": [
     "Dešiniajame stulpelyje iš pradžių pasirinkite turinio formą: tik vertimas (vienakalbis), dvikalbis su originalu viršuje arba dvikalbis su vertimu viršuje; tada failo formatą: SRT, WebVTT, SBV, ASS arba TXT. Pasirinkus ASS pridedami du maketai: padalintas viršus/apačia ekranas ir sukrautos apatinės eilutės. Turinys ir formatas laisvai derinasi į 14 eksporto stilius. Dvikalbė eilutės plotis nustatomas atskirai. Spustelėkite „Atsisiųsti subtitrus“, kad išsaugotumėte failą, arba „Kopijuoti į iškarpinę“, kad iškart įklijuotumėte."
    ],
    "img": {
     "file": "translate-export",
     "alt": "Eksporto skydelis: trys turinio formos, penki failų formatai ir dvikalbės eilutės pločio nustatymai",
     "cap": "Dešiniojo stulpelio eksportas: pirmiausia pasirinkite turinio formą, tada failo formatą"
    }
   },
   {
    "h2": "Cost and privacy :: Kaina ir privatumas",
    "ps": [
     "Numatytajam modeliui nereikia registracijos ar rakto – jis veikia iš karto su užklausų kvotomis: dienos limitu vienam IP ir visos svetainės dienos leidžiamu kiekiu. Didelėms partijoms įveskite savo API raktą skiltyje „Vertimo variklis“. Privatumas, kaip nurodyta puslapyje: numatytojo modelio subtitrai perduodami per šios svetainės serverį paslaugų teikėjui; pasirinktinį API tiesiogiai tvarko jūsų įvestas teikėjas, o raktas lieka jūsų naršyklėje. Analizė, eilučių laužymas ir dvikalbis išdėstymas vyksta vietoje naršyklėje."
    ]
   },
   {
    "h2": "FAQ :: DUK",
    "ps": [
     "**Į vertimą įsivėlė kitų kalbų?** Įrankis aptinka kalbos nukrypimą ir automatiškai išverčia iš naujo; jei keli įrašai vis tiek atrodo blogai, spustelėkite langelį ir pataisykite juos rankiniu būdu.",
     "**O kaip dainų tekstų eilutės?** „Turinio filtravimas“ siūlo tris dainų tekstų parinktis: versti dainų tekstus, išlaikyti originalą arba juos ištrinti.",
     "**Nesuderinti vardų vertimai?** Įtraukite nesuderintus rašybos variantus į žodyną ir verskite iš naujo; žodynas turi pirmenybę prieš pasaulinį „tikrinių daiktavardžių tvarkymo“ nustatymą.",
     "**Norite anglų kalbos viršuje, o kinų apačioje?** Eksportuodami pasirinkite „Dvikalbis · originalas viršuje“; jei kinų viršuje, o anglų apačioje – pasirinkite „Dvikalbis · vertimas viršuje“."
    ]
   },
   {
    "h2": "Susiję įrankiai ir vadovai",
    "ps": [
     "Neteisingas formatas? Pradėkite nuo [[formato keitimo|/convert.html]]; laiko juosta nesutampa? Naudokite [[laiko juostos koregavimą|/shift.html]]; prieš atiduodami, paleiskite per [[subtitrų kokybės patikrinimą|/guides/subtitle-quality-check.html]]."
    ]
   }
  ]
 },
 "translate-english-to-chinese": {
  "seo": {
   "title": "Verskite angliškus subtitrus į ki­nių kalbą – AI-SRTSub",
   "desc": "Verskite angliškus subtitrus į kinų kalbą: įkelkite SRT/VTT/ASS, pasirinkite Supaprastintą arba Tradicinę, ir eksportuokite tik kinų arba dvikalbius subtitrus. – AI-SRTSub",
   "h1": "Verskite angliškus subtitrus į kinų kalbą",
   "intro": "Angliškas SRT į vidų, kiniški (arba anglų-kinų dvikalbiai) subtitrai į išorę: įkelkite, pasirinkite paskirties kalbą, eksportuokite – viskas viename puslapyje.",
   "ctaText": "Verskite angliškus subtitrus"
  },
  "body": [
   {
    "h2": "When you need it :: Kada to reikia",
    "ps": [
     "Atsisiųsti subtitrai yra tik anglų kalbos ir jūs nespėjate; arba norite kiniškų subtitrų šeimos nariams, kurie neskaito angliškai. Tai, ko jums reikia, pateikiama viena iš trijų formų – **tik kiniški subtitrai** arba dvikalbiai subtitrai su **kinų viršuje, anglų apačioje** arba **anglų viršuje, kinų apačioje** – ir šis įrankis sukuria visus tris."
    ]
   },
   {
    "h2": "How to do it :: Kaip tai padaryti",
    "ps": [
     "Atidarykite [[DI subtitrų vertėją|/translate.html]] ir įmeskite savo anglų kalbos subtitrų failą (SRT, VTT, ASS, SSA, SBV ir TXT yra visi atpažįstami arba tiesiog įklijuokite tekstą). Palikite „Šaltinio kalbą“ ties automatišku aptikimu, nustatykite „Paskirties kalbą“ į supaprastintą arba tradicinę kinų kalbą ir spustelėkite „▶ Pradėti versti“. Kai baigsite, dešiniajame eksporto skydelyje pasirinkite turinio formą: tik vertimas (vienakalbis), dvikalbis · originalas viršuje (anglų viršuje, kinų apačioje) arba dvikalbis · vertimas viršuje (kinų viršuje, anglų apačioje), tada pasirinkite failo formatą ir atsisiųskite."
    ],
    "img": {
     "file": "translate-export",
     "alt": "Eksporto skydelis: tik vertimas, dvikalbis su originalu viršuje ir dvikalbis su vertimu viršuje",
     "cap": "Eksportuodami pasirinkite turinio formą: tik kinų arba anglų-viršuje / kinų-viršuje dvikalbis"
    }
   },
   {
    "h2": "Two common problems :: Dvi dažnos problemos",
    "ps": [
     "**Vardai išversti nenuosekliai?** DI verčia partijomis, todėl tas pats vardas gali pasirodyti dviem būdais. Įdėkite „šaltinis → išverstas vardas“ poras į žodyną (pvz., `Watson → Huasheng`), kad viskas būtų vienoda.",
     "**Subtitrai nesutampa su vaizdu?** Pirmiausia išverskite, tada pataisykite laiką: darbinės srities viršuje esanti laiko juostos įrankių juosta turi pasaulinį poslinkio ir mastelio valdiklį – žiūrėkite [[Subtitrai išsiderina pabaigos link|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "videosub": {
  "seo": {
   "title": "Integruotų vaizdo įrašo subtitrų išskleidimas – MKV / MP4 takeliai – AI-SRTSub",
   "desc": "Nuskaitykite subtitrų takelius, esančius MKV, WebM, MP4 ir MOV viduje, tiesiogiai ir eksportuokite SRT / VTT / ASS / TXT. Jokio įkėlimo, jokio perkodavimo, išvardytas kiekvienas kalbos takelis, išskirti paveikslėlių subtitrai.",
   "h1": "Kaip išskleisti vaizdo įraše įterptus subtitrus",
   "intro": "Nuskaitykite subtitrų takelį, užantspauduotą MKV / MP4 viduje, tiesiai kaip SRT – vaizdo įrašas niekada neįkeliamas, viskas skaitoma naršyklėje.",
   "ctaText": "Atidaryti vaizdo įrašo subtitrų išskleidimą"
  },
  "body": [
   {
    "h2": "What this tool does :: Ką daro šis įrankis",
    "ps": [
     "Subtitrai gali būti įterpti vaizdo įrašo faile, o ne stovėti atskirai. Norėdami juos redaguoti, versti ar suporuoti, pirmiausia turite juos išimti – tai vienintelis dalykas, kurį daro šis puslapis."
    ]
   },
   {
    "h2": "1 Add the video :: 1 Pridėti vaizdo įrašą",
    "ps": [
     "Tempkite vaizdo įrašo failą į pirmąjį stulpelį arba spustelėkite norėdami pasirinkti. Atpažįstami tik **MKV / WebM** ir **MP4 / MOV**; kiti konteneriai nesuteiks jokio takelio.",
     "Failas niekada nepalieka jūsų kompiuterio – nėra jokio įkėlimo žingsnio. Įrankis skaito mažais gabalėliais pagal poslinkį, todėl kelių gigabaitų filmas neužpilda atminties, tačiau pirmą kartą skaitant reikia vieną kartą nuskaityti takelio informaciją."
    ],
    "img": {
     "file": "videosub-up",
     "alt": "Įterptųjų subtitrų išskleidimo puslapio vaizdo įrašo pridėjimo sritis",
     "cap": "Palaikomi MKV / WebM ir MP4 / MOV, o failas niekada nepalieka jūsų kompiuterio"
    }
   },
   {
    "h2": "2 Įterptieji subtitrų takeliai",
    "ps": [
     "Kai nuskaitymas baigiasi, antrame stulpelyje išvardijami subtitrų takeliai faile **po vieną eilutėje**, paprastai su kalba ir takelio pavadinimu (pavyzdžiui, „Kiniškas“, „Angliškas“, „Priverstinis“). Spustelėkite eilutę, kad išskleistumėte tą takelį.",
     "Kai faile yra tik vienas subtitrų takelis, išskleidimas prasideda automatiškai – nereikia spausti.",
     "**Paveikslėlių subtitrų negalima išskleisti**: „Blu-ray PGS“ ir DVD subtitrai yra paveikslėliai, įrašyti sraute be paimamo teksto, ir puslapis tai aiškiai sako; jiems reikia OCR."
    ],
    "img": {
     "file": "videosub-track",
     "alt": "Įterptųjų subtitrų takelių sąrašas, po vieną eilutėje",
     "cap": "Vienas takelis eilutėje; kai yra tik vienas, išskleidimas prasideda automatiškai"
    }
   },
   {
    "h2": "3 The result :: 3 Rezultatas",
    "ps": [
     "Dešinėje esantis „3 Rezultatas“rodo išskleistą subtitrų tekstą, o virš jo yra eksporto formatas: **SRT / VTT / ASS / TXT**. Spustelėkite „Atsisiųsti“ arba „Kopijuoti“.",
     "Kai šaltinio takelis yra ASS, jo nuosava stiliaus antraštė ir raiška sugrįžta nepakeistos – eksportavimas kaip ASS jas išsaugo, o eksportavimas kaip SRT perkelia tik tekstą."
    ],
    "img": {
     "file": "videosub-out",
     "alt": "Rezultato sritis su SRT / VTT / ASS / TXT formato pasirinkimu",
     "cap": "Keturi eksporto formatai; ASS šaltinis išlaiko savo stiliaus antraštę ir raišką"
    }
   },
   {
    "h2": "Kas paliekama nepaliesta",
    "ps": [
     "Pats vaizdo įrašo failas visai neliečiamas – tik skaitymui, jokio rašymo, jokio perkodavimo, jokio pertvarkymo.",
     "Subtitrų turinys išsiskleidžia toks, koks yra: jokio koduotės spėliojimo, jokio laiko juostos koregavimo. Jei išskleisti subtitrai yra iškraipyti, tai yra šaltinio takelio koduotės problema – nuneškite ją į [[Išderinto teksto taisymą|/repair.html]]."
    ]
   },
   {
    "h2": "Common questions :: Dažni klausimai",
    "ps": [
     "**Ar tikrai nėra būdo apdoroti paveikslėlių subtitrų (PGS / DVD)?** Ne šiame puslapyje – tai paveikslėliai be teksto sluoksnio. OCR turi eiti pirma, o šis puslapis to nedaro.",
     "**Išskleistų subtitrų laikas neteisingas – kodėl?** Šis puslapis nekoreguoja laiko juostų; kas išeina, tas ten ir buvo. Pasauliniam poslinkiui ar greičio problemai naudokite [[Laiko juostos koregavimą|/shift.html]].",
     "**Kodėl užtrunka taip ilgai, kol kas nors įvyksta?** Didelį failą reikia nuskaityti dalimis takelio informacijai gauti, ir kuo didesnis failas, tuo ilgiau užtrunka; tai vyksta vietoje ir neturi nieko bendro su jūsų ryšiu.",
     "**Ar galiu naudoti šį puslapį išoriniams subtitrų failams?** Nereikia – išorinis .srt / .ass keliauja tiesiai į [[Formato keitimą|/convert.html]] arba kitą įrankį. Šis puslapis skirtas subtitrams, kurie yra įterpti vaizdo įrašo viduje."
    ]
   },
   {
    "h2": "Privacy :: Privatumas",
    "ps": [
     "Vaizdo įrašas skaitomas visiškai naršyklėje: niekas neįkeliama, niekas neperkoduojama, niekas nekeliauja per serverį. Uždarykite puslapį ir nuskaityti duomenys atlaisvinami."
    ]
   },
   {
    "h2": "Susiję įrankiai ir vadovai",
    "ps": [
     "Norėdami išversti tai, ką išskleidžiate, eikite į [[Subtitrų vertimą|/translate.html]], kad padarytumėte juos dvikalbiais, žiūrėkite [[Du būdai padaryti dvikalbius subtitrus|/guides/make-bilingual-subtitles.html]]; dėl skirtumo tarp įterptų ir išorinių takelių bei kuriuos iš jų galima išskleisti, žiūrėkite [[Kaip išgauti subtitrus iš vaizdo įrašo|/guides/extract-subtitles-from-video.html]]."
    ]
   }
  ]
 },
 "vtt-to-srt": {
  "seo": {
   "title": "VTT į SRT keitiklis – Konvertuoti WebVTT subtitrus – AI-SRTSub",
   "desc": "Konvertuokite VTT (WebVTT) subtitrus į SRT redaktoriams ir grotuvams, kurie priima tik SRT. WEBVTT antraštė ir NOTE blokai išvalomi automatiškai. Veikia jūsų naršyklėje.",
   "h1": "VTT to SRT :: VTT į SRT",
   "intro": "Paverskite VTT (WebVTT) subtitrus į SRT: įmeskite failą, pasirinkite SRT, atsisiųskite. Antraštės ir pastabų blokai išvalomi, o laiko žymos grįžta prie kablelio žymėjimo.",
   "ctaText": "Convert VTT → SRT :: Konvertuoti VTT → SRT"
  },
  "body": [
   {
    "h2": "Kada reikia SRT atgal",
    "ps": [
     "„CapCut“, „Premiere“, daugelis darbalaukio grotuvų ir senesni subtitrų įrankiai priima tik **SRT**. Subtitrai, atsisiųsti iš žiniatinklio ar „YouTube“, dažniausiai būna VTT formato – konvertuokite juos į SRT, kad galėtumėte tiesiogiai importuoti."
    ]
   },
   {
    "h2": "Kas išvaloma iš VTT",
    "ps": [
     "**WEBVTT antraštės eilutė**, NOTE blokai, STYLE/REGION blokai ir užuominų nustatymai po laiko eilutės (kaip align:start) nėra subtitrų tekstas – jie pašalinami automatiškai; numeravimas atstatomas, o milisekundžių skyriklis grįžta nuo taško prie kablelio."
    ],
    "img": {
     "file": "convert-upload-vtt",
     "alt": "Įkėlimo sritis: įkeltas VTT failas, aptiktas kaip VTT",
     "cap": "Failas su WEBVTT antrašte iš karto aptinkamas kaip VTT"
    }
   },
   {
    "h2": "How to convert :: Kaip konvertuoti",
    "ps": [
     "Atidarykite [[keitiklį|/convert.html]], įmeskite VTT, pasirinkite **SRT - SubRip** kaip išvestį, tada konvertuokite ir atsisiųskite. Teksto ir laiko reikšmės lieka nepaliestos."
    ],
    "img": {
     "file": "convert-result-srt",
     "alt": "Konvertavimo rezultatas: SRT numeravimas su kablelio laiko žymomis",
     "cap": "Konvertuotas SRT: užuominų numeriai + kablelio laiko žymos"
    }
   }
  ]
 }
};
