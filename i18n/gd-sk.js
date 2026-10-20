/* i18n/gd-sk.js —— 43 篇指南页的sk译文（由 _mkgd.js 生成，勿手改）
 * 源：_gd/sk.json（Gemini 翻译，_gemgd.js 产出）
 * 结构：{ <slug>: { seo:{title,desc,h1,intro,ctaText}, body:[{h2,ps[],img}] } }
 * ⚠️ server.js 自己 require 它，不被任何 html 引用 —— 部署时必须显式加进传输列表。
 */
module.exports = {
 "ass-to-srt": {
  "seo": {
   "title": "Prevodník ASS na SRT – Konvertovať titulky ASS/SSA – AI-SRTSub",
   "desc": "Konvertujte titulky ASS (a SSA) na čistý SRT: text a časovanie sa extrahujú tak, ako sú, značky štýlov zostávajú. Pre softvér podporujúci len SRT. Beží v prehliadači.",
   "h1": "ASS na SRT",
   "intro": "Premeňte titulky ASS (alebo SSA) na SRT: pretiahnite súbor, vyberte SRT, stiahnite. Text a časovanie sa extrahujú bez zmeny; značky štýlov sa neprenášajú.",
   "ctaText": "Konvertovať ASS → SRT"
  },
  "body": [
   {
    "h2": "Kedy potrebujete späť SRT",
    "ps": [
     "Strihové štúdiá, set-top boxy, televízne prehrávače, prekladateľské nástroje — mnohé nadväzujúce kroky prijímajú iba **SRT**. Efektné štýly a pozíciovanie v ASS tam neznamenajú nič, takže čistý SRT je najbezpečnejšia voľba."
    ]
   },
   {
    "h2": "Čo sa stane so značkami štýlov",
    "ps": [
     "Každý úsek v ASS je riadok Dialogue, ktorého text často obsahuje značky prepisu ako `{\\fonts}` pre farbu, pohyb alebo efekty. Konverzia do SRT **tieto značky spolu so štýlom odstráni**, pričom zachová iba text a časovanie; zalomenia riadkov `\\N` sa stanú skutočnými zalomeniami. Súbory SSA sú tiež čitateľné."
    ],
    "img": {
     "file": "convert-result-srt",
     "alt": "Výsledok konverzie: číslovanie SRT a text extrahovaný z ASS",
     "cap": "Extrahovaný SRT: jedno číslo na úsek, čistý text"
    }
   },
   {
    "h2": "Ako konvertovať",
    "ps": [
     "Otvorte [[konvertor|/convert.html]], vložte súbor ASS (.ssa funguje tiež), vyberte **SRT - SubRip** ako výstup, potom skonvertujte a stiahnite. Idete opačným smerom? Pozrite si [[SRT na ASS|/guides/srt-to-ass.html]]."
    ]
   }
  ]
 },
 "batch": {
  "seo": {
   "title": "Ako dávkovo konvertovať titulky – Stovky do jedného ZIPu – AI-SRTSub",
   "desc": "Návod: vložte desiatky súborov SRT/VTT, skonvertujte ich do jedného formátu a stiahnite si jeden ZIP. Prečíslované, časové značky normalizované, neparsované súbory označené.",
   "h1": "Ako dávkovo konvertovať titulky",
   "intro": "Celá séria titulkov musí zvyčajne skončiť v jednom formáte a nahrávať ich po jednom trvá veky. Vložte ich sem všetky naraz, skonvertujte ich spoločne a stiahnite si jeden ZIP – súbory, ktoré sa nedajú spracovať, sú označené a nikdy sa ticho nepribalia, akoby zafungovali.",
   "ctaText": "Otvoriť dávkovú konverziu"
  },
  "body": [
   {
    "h2": "Čo tento nástroj robí",
    "ps": [
     "Titulky pre celú sériu alebo box set musia byť zvyčajne jednotné predtým, než s nimi môžete niečo ďalej robiť. Tu je to, čo robí stránka dávkového spracovania:"
    ]
   },
   {
    "h2": "Pridávanie súborov",
    "ps": [
     "Presuňte niekoľko súborov tituliek naraz do prerušovaného políčka alebo kliknite a vyberte viacero naraz. Zoznam súborov ukazuje každý z nich: parsované súbory zobrazujú počet svojich úsekov, neparsované sú označené jednoducho ako nerozpoznané. Horný panel sčítava celkový počet súborov, počet úsekov a koľko ich zostalo nerozpoznaných.",
     "⚠️ Táto stránka číta iba UTF-8. Všetko s poškodeným kódovaním (obrazovka plná otáznikov alebo štvorčekov) by malo najprv prejsť cez [[Oprava kódovania|/repair.html]]."
    ],
    "img": {
     "file": "batch-list",
     "alt": "Zoznam súborov: názov a počet úsekov na súbor, nerozpoznané označené červenou",
     "cap": "Každý súbor je uvedený v zozname a nerozpoznané sú ihneď označené"
    }
   },
   {
    "h2": "Na čo všetko konvertovať",
    "ps": [
     "Vyberte cieľový formát v časti „Konvertovať všetko na“ — SRT alebo VTT. Každý súbor v zozname sa potom vygeneruje v tomto formáte: čísla úsekov sa prečíslujú odzhora, časové značky sa normalizujú na cieľ (SRT oddeľuje milisekundy čiarkou, VTT bodkou).",
     "**Pôvodné názvy súborov sa zachovávajú a mení sa iba prípona**; duplicitné názvy dostanú pridané číslo, takže sa nič navzájom neprepíše."
    ],
    "img": {
     "file": "batch-up",
     "alt": "Výber cieľového formátu a stav zoznamu so štatistickým panelom zobrazujúcim počty súborov a úsekov",
     "cap": "Vyberte cieľový formát a každý súbor sa pregeneruje; názvom sa mení iba prípona"
    }
   },
   {
    "h2": "Balenie a sťahovanie",
    "ps": [
     "Kliknite na „Zabaliť do jedného ZIPu a stiahnuť“ a archív bude obsahovať každý skonvertovaný súbor. **Súbory bez rozpoznateľných úsekov zostávajú mimo archívu** — zostávajú v zozname označené namiesto toho, aby sa primiešali, akoby boli úspešné. Po zabalení získate informáciu o tom, koľko súborov sa nachádza vo vnútri."
    ],
    "img": {
     "file": "batch-zip",
     "alt": "Oblasť balenia: tlačidlo sťahovania ZIPu a správa o výsledku balenia",
     "cap": "Nerozpoznané súbory zostávajú mimo archívu a v zozname ostávajú označené"
    }
   },
   {
    "h2": "Prečo sa súbor označí ako nerozpoznaný",
    "ps": [
     "Súbor sa označí vtedy, keď sa z neho nedajú prečítať žiadne úseky. Tri obvyklé dôvody: vôbec to nie je súbor tituliek (povedzme zatúlaný súbor README.txt), kódovanie nie je v UTF-8 (takže sa číta iba ako znaky náhrady), alebo obsah sploštený do jedného bloku bez časových značiek.",
     "S označenými súbormi možno pracovať individuálne: problémy s kódovaním idú na [[Oprava kódovania|/repair.html]], problémy s formátom na [[Konvertor formátov|/convert.html]] na samostatnú konverziu pred opätovným zaradením do zoznamu."
    ]
   },
   {
    "h2": "Často kladené otázky",
    "ps": [
     "**Koľko súborov môžem pridať?** Neexistuje žiadny pevný limit; závisí to od pamäte vášho prehliadača a niekoľko stoviek súborov SRT je zvyčajne v poriadku.",
     "**Mení to moje dialógy?** Nie. Dávková konverzia mení iba kontajnerový formát — prečíslováva úseky a normalizuje časové značky — nikdy ani slovo z dialógu.",
     "**Čo ak potrebujem zmeniť obsah?** Táto stránka konvertuje iba formáty. Na hromadnú zmenu načasovania použite [[Úprava načasovania|/shift.html]]; na zmenu slovníka použite [[Náhrada výrazov|/glossary.html]]; oboje funguje súbor po súbore.",
     "**Je podporovaný formát ASS?** Táto stránka konvertuje iba medzi SRT a VTT. ASS obsahuje štýly — použite naň jednotlivo [[Konvertor formátov|/convert.html]]."
    ]
   },
   {
    "h2": "Súkromie",
    "ps": [
     "Konverzia a balenie prebiehajú kompletne vo vašom prehliadači. Žiadny obsah tituliek sa nikdy neposiela na server."
    ]
   },
   {
    "h2": "Súvisiace nástroje a návody",
    "ps": [
     "Čo a v akom poradí meniť pre celú sériu — [[Dávková úprava celej série titulkov|/guides/batch-convert-srt.html]]; viac formátov pre jeden súbor — [[Konvertor formátov|/convert.html]]; korektúra v tabuľke — [[Titulky ⇄ tabuľka|/table.html]]."
    ]
   }
  ]
 },
 "batch-convert-srt": {
  "seo": {
   "title": "Dávková úprava celej série – Čo funguje hromadne a čo nie – AI-SRTSub",
   "desc": "Séria zvyčajne potrebuje rovnakú zmenu všade: jednotný formát, posun načasovania, terminológiu. Zistite, čo zvládnete naraz, čo nie a ako na zlyhané súbory.",
   "h1": "Dávková úprava celej série tituliek",
   "intro": "Keď je potrebné upraviť desiatky súborov tituliek, zvyčajne ide o tú istú zmenu zakaždým. Zistenie, ktoré časti sa dajú zvládnuť v jednom prechode, ušetrí omnoho viac času než ich prechádzanie po jednom.",
   "ctaText": "Otvoriť dávkovú konverziu"
  },
  "body": [
   {
    "h2": "Zvyčajne ide o tú istú zmenu všade",
    "ps": [
     "Keď sa titulky pre celú sériu pokazia, málokedy má každá epizóda svoj vlastný problém – zvyčajne ide o jednu príčinu na každú epizódu: rovnaká vydavateľská skupina zakódovala všetky (takže formát a vodoznace sú zhodné), všetky boli načasované na rovnakú verziu videa (takže smer a veľkosť posunu súhlasia) alebo sa prepis názvov v priebehu série rozbehol.",
     "Najskôr skontrolujte dve epizódy – jednu skorú, jednu neskorú – a pred akýmkoľvek dávkovým spracovaním overte, či ide skutočne o **ten istý problém**. Ak sa tieto dve nezhodujú, nejde o niečo, čo by dávkové spracovanie mohlo vyriešiť."
    ]
   },
   {
    "h2": "Čo sa dá urobiť v jednom prechode",
    "ps": [
     "**Zjednotenie formátu** je jediná vec, ktorá sa reálne dokončí v jednom prechode: presuňte desiatky súborov SRT a VTT do nástroja [[Dávková konverzia|/batch.html]] naraz, vyberte cieľový formát a stiahnite jeden ZIP. Prečíslovanie a normalizácia časových značiek prebehnú v rovnakom kroku a nezmení sa ani jediné slovo dialógu."
    ],
    "img": {
     "file": "batch-list",
     "alt": "Zoznam súborov dávkovej stránky: počet úsekov na súbor, nerozpoznané označené červenou",
     "cap": "Jednotný formát je tou jedinou vecou, ktorá sa skutočne dokončí v jedinom prechode"
    }
   },
   {
    "h2": "Čo je nutné urobiť súbor po súbore",
    "ps": [
     "Tieto nemajú žiadny bod pre dávkový vstup a vyžadujú prechod pre každý súbor – hoci zvyčajne existuje ekvivalent, ktorý **stačí vykonať iba raz a potom sa aplikuje na celú sériu**:"
    ]
   },
   {
    "h2": "Dodržte správne poradie",
    "ps": [
     "Keď je potrebné urobiť viacero vecí, nesprávne poradie znamená prerábanie. Postupujte v tomto poradí:",
     "**Opraviť kódovanie** → **zjednotiť formát** → **zmeniť obsah** (vodoznaky, terminológia, načasovanie) → **nakoniec kontrola kvality**. Konverzia formátov pred opravou kódovania prináša iba skomolený text v inom kontajneri; zmena obsahu pred zjednotením formátov znamená prácu s nekonzistentnou podporou nástrojov."
    ],
    "img": {
     "file": "batch-zip",
     "alt": "Oblasť balenia: tlačidlo stiahnutia ZIPu a správa o výsledku",
     "cap": "Najskôr zjednoťte formáty, obsah zmeňte až potom"
    }
   },
   {
    "h2": "Spracovanie súborov, ktoré neboli rozpoznané",
    "ps": [
     "Súbory označené ako nerozpoznané v dávkovej konverzii sú vynechané zo ZIPu a zostávajú v zozname. Tri obvyklé dôvody: nie je to súbor tituliek (zatúlaný súbor README), kódovanie nie je v UTF-8 alebo obsah bol sploštený do jedného bloku bez časových značiek.",
     "Problémy s kódovaním idú individuálne do nástroja [[Oprava kódovania|/repair.html]]; problémy s formátom do [[Konvertor formátov|/convert.html]] pred ich opätovným zaradením do zoznamu. **Nevynucujte zaradenie nerozpoznaných súborov do archívu len kvôli zvýšeniu počtu** – objavenie chýbajúcej epizódy v prehrávači stojí oveľa viac než minúta, ktorú to ušetrí."
    ]
   },
   {
    "h2": "Súvisiace nástroje a návody",
    "ps": [
     "Kompletný návod na dávkové spracovanie – [[Ako dávkovo konvertovať titulky|/guides/batch.html]]; jednotné posuny načasovania – [[Ako upraviť načasovanie tituliek|/guides/shift.html]]; posledný prechod pred doručením – [[Kontrola kvality tituliek|/qc.html]]."
    ]
   }
  ]
 },
 "bilingual": {
  "seo": {
   "title": "Ako rozdeliť alebo zlúčiť dvojjazyčné titulky – AI-SRTSub",
   "desc": "Štyri spôsoby úpravy dvojjazyčných tituliek: ponechanie len jednej stopy, rozdelenie do dvoch súborov alebo zlúčenie do jedného dvojriadkového záznamu. Obidva formáty sú automaticky detekované vo vašom prehliadači.",
   "h1": "Ako upraviť dvojjazyčné titulky",
   "intro": "Chcete rozdeliť dvojjazyčné titulky, zlúčiť ich alebo ponechať iba jednu stopu? Táto príručka vás provedie všetkými štyrmi režimami: ako funguje detekcia, aký režim zvoliť a čo získate pri exporte.",
   "ctaText": "Otvoriť nástroj na úpravu dvojjazyčných tituliek"
  },
  "body": [
   {
    "h2": "Na čo tento nástroj slúži",
    "ps": [
     "Máte dvojjazyčné titulky, ale chcete iba jednu stopu — alebo naopak, chcete obe stopy rozdeliť či zlúčiť:"
    ]
   },
   {
    "h2": "Ako deteguje dvojjazyčný obsah",
    "ps": [
     "Dvojstopové dvojjazyčné titulky prichádzajú v dvoch bežných formách a nástroj každú z nich rozpozná — **bez hádania jazyka**: **Forma A (jeden záznam, dva riadky)** delí stopy podľa písma — kana, hangul, chan-zi, latinka a iné systémy, celkovo desať; dva rôzne systémy znamenajú dvojjazyčnosť a ten, ktorý sa objaví skôr, sa počítá ako originál. Jediný systém (napríklad dlhý čínsky riadok rozdelený do dvoch) sa považuje za jednojazyčný a zachová sa tak, ako je. **Forma B (dva samostatné záznamy s identickým časovaním)** delí stopy podľa pozície — dva záznamy v rovnakom časovom bode tvoria pár, prvý sa počítá ako originál a kombinácie zdieľajúce latinku, ako napríklad anglicko-francúzska alebo anglicko-nemecká, sú tiež správne oddelené. Ak nie je detegovaný žiadny dvojjazyčný obsah, prepínač režimov a tlačidlo Štart sa zosivejú spolu s jasným upozornením, takže sa nikdy nedôjde k vynútenému rozdeleniu na nesprávne výsledky."
    ]
   },
   {
    "h2": "Štyri režimy",
    "ps": [
     "Vyberte jeden zo štyroch v rozbaľovacej ponuke „Ktorý chcete?“: **Ponechať iba originál** a **Ponechať iba preklad** vytvoria každý jeden súbor; **Rozdeliť na dva** vytvorí pôvodný súbor a súbor s prekladom, pričom názvy súborov sú automaticky označené `.orig` / `.dst`, aby sa predišlo prepísaniu; **Zlúčiť do jedného dvojriadkového záznamu** premení každý pár na dvojjazyčný záznam — originál na jednom riadku, preklad na druhom —, zatiaľ čo jednojazyčné páry sa zachovávajú v pôvodnom stave a druhý riadok sa nevymýšľa. Keď prepnete režimy alebo výstupné formáty, existujúci obsah sa spustí automaticky — nemusíte znova klikať na tlačidlo Štart."
    ],
    "img": {
     "file": "bilingual-modes",
     "alt": "Výber režimu v nástroji na rozdelenie dvojjazyčných tituliek: ponechať originál, ponechať preklad, rozdeliť na dva, zlúčiť do jedného dvojriadkového záznamu",
     "cap": "Štyri režimy: ponechanie jednej stopy, rozdelenie na dva alebo zlúčenie do jedného dvojriadkového záznamu"
    }
   },
   {
    "h2": "Vstup a výstup",
    "ps": [
     "Číta sedem formátov — SRT, VTT, ASS, SSA, SBV, LRC, TXT (najskôr prípona súboru, ako záloha slúži analýza obsahu) — a exportuje štyri: SRT, VTT, ASS, TXT. Funguje akákoľvek vstupno-výstupná kombinácia, takže medziformátová konverzia prebieha počas procesu. Zalomenia riadkov `\\N` v ASS sa obnovia na skutočné zalomenia riadkov a značky efektov sa pri medziformátovom exporte odstránia."
    ]
   },
   {
    "h2": "Výsledky a export",
    "ps": [
     "Výsledky sa zobrazujú v plnom rozsahu v textovom poli iba na čítanie, pričom každý súbor obsahuje štatistiky počtu záznamov a celkového trvania; tlačidlá Stiahnuť a Kopírovať umožňujú súbor priamo odniesť. Oblasť výsledkov je náhľad — text ani časovanie sa tu neupravujú. Ak chcete vykonať zmeny, najskôr exportujte a potom použite zodpovedajúci nástroj."
    ],
    "img": {
     "file": "bilingual-result",
     "alt": "Oblasť výsledkov rozdelenia: náhľad iba na čítanie, štatistiky počtu záznamov a tlačidlá stiahnutia/kopírovania",
     "cap": "Náhľad celého textu + štatistiky počtu a trvania záznamov + stiahnutie a kopírovanie"
    }
   },
   {
    "h2": "Často kladené otázky",
    "ps": [
     "**Jeden záznam má angličtinu na jednom riadku a francúzštinu na druhom — prečo sa nechce rozdeliť?** Forma A delí stopy podľa systému písma, takže dva jazyky, ktoré zdieľajú jeden systém v rámci jedného záznamu, sa nedajú oddeliť. Preformátujte to ako Formu B (dva záznamy na tej istej časovej osi) a fungovať bude delenie založené na pozícii.",
     "**V stiahnutom súbore je iba jeden súbor?** „Ponechať iba originál“, „Ponechať iba preklad“ a „Zlúčiť do jedného dvojriadkového záznamu“ vytvárajú z podstaty veci jeden súbor; iba „Rozdeliť na dva“ vám poskytne dva súbory označené `.orig` / `.dst`.",
     "**Môžem spracovávať dávkovo?** Po jednom súbore; fronty nie sú podporované.",
     "**Nahrávajú sa moje titulky na server?** Nie — parsovanie a export prebiehajú kompletne vo vašom prehliadači."
    ]
   },
   {
    "h2": "Súvisiace návody",
    "ps": [
     "Rýchly spôsob, ako rozdeliť dve stopy, nájdete v časti [[Rozdelenie dvojjazyčných tituliek na dve stopy|/guides/split-bilingual-subtitles.html]]; informácie o tom, ako vznikajú dvojjazyčné titulky, nájdete v časti [[Dva spôsoby vytvárania dvojjazyčných tituliek|/guides/make-bilingual-subtitles.html]]; na strojový preklad použite [[Preklad tituliek pomocou AI|/translate.html]]."
    ]
   }
  ]
 },
 "clean": {
  "seo": {
   "title": "Čistič tituliek – odstráňte vodoznaky, reklamy, SDH – AI-SRTSub",
   "desc": "Čistič tituliek: 13 pravidiel odstraňuje vodoznaky, reklamy, SDH titulky, značky HTML, duplikáty; každá zmena má porovnanie a dá sa vrátiť späť. SRT/VTT/ASS, v prehliadači.",
   "h1": "Ako používať čistič tituliek",
   "intro": "Titulky stiahnuté z webu často obsahujú vodoznaky, reklamy a SDH popisky. Čistič aplikuje 13 pravidiel v jednom prechode a každá zmena sa dá porovnať a vrátiť späť.",
   "ctaText": "Otvoriť čistič tituliek"
  },
  "body": [
   {
    "h2": "Čo tento nástroj robí",
    "ps": [
     "Stiahnuté súbory tituliek často obsahujú veci, ktoré by v nich nemali byť. Čistič ich odstráni v jednom kroku založenom na pravidlách:"
    ]
   },
   {
    "h2": "Nahratie a detekcia",
    "ps": [
     "Presuňte súbor alebo kliknutím ho nahrajte — podporované sú SRT, VTT, ASS, SSA a TXT — prípadne priamo vložte text tituliek. Kódovanie sa rozpozná automaticky: ak dekódovanie UTF-8 vytvorí náhradné znaky, systém prejde na GBK alebo Big5 a na stránke sa zobrazí „Kódovanie opravené ako {encoding}“. Ak nahrajete dvojjazyčné titulky s dvoma stopami (dva identické časové harmonogramy, jeden čínsky a jeden anglický), zlúčia sa do jednej dvojjazyčnej stopy s prepínačom „pôvodný navrchu / preklad navrchu“."
    ]
   },
   {
    "h2": "Konfigurácia 13 pravidiel",
    "ps": [
     "Rozhranie obsahuje štyri skupiny s 13 začiarkavacími políčkami: **Značky a formátovanie** (efekty ASS, HTML značky, riadiace znaky, prečíslovanie po zoradení), **SDH a zvukové efekty** (SDH popisky, menovky rečníkov, čisté riadky piesní), **Vodoznaky a zbytočné záznamy** (vodoznaky a reklamy, duplicitné záznamy, prázdne záznamy), **Úpravy textu** (interpunkcia a medzery, oprava veľkých písmen, zlúčenie krátkych riadkov). Predvolene sú zapnuté iba položky „bez strát a isté“; položky, ktoré môžu odstrániť obsah (riadky piesní, oprava veľkých písmen, zlúčenie krátkych riadkov), sú vypnuté – začiarknite ich v prípade potreby. Každá položka obsahuje nápovedu ⓘ pri umiestnení kurzora myši a akákoľvek zmena začiarkavacieho políčka sa okamžite prejaví."
    ],
    "img": {
     "file": "clean-opts",
     "alt": "Rozhranie možností čistenia: štyri skupiny 13 začiarkavacích políčok, aktívny počet zobrazený hore",
     "cap": "Štyri skupiny, 13 pravidiel; predvolene sú zapnuté iba položky bez strát, zmeny sa prejavujú okamžite"
    }
   },
   {
    "h2": "Porovnanie zmien a vrátenie späť",
    "ps": [
     "Výsledky sa neprepisujú priamo: každá zmena je uvedená v tabuľke porovnania so značkou pravidla (prečo bol tento záznam upravený alebo odstránený). Chcete niektorý vrátiť? Kliknite na „Obnoviť“ na príslušnom riadku; „Obnoviť všetko“ vráti všetko jedným kliknutím a opätovné kliknutie znova použije úplné vyčistenie. Panel štatistík zobrazuje počty pre pôvodné / vyčistené / odstránené / upravené / obnovené."
    ],
    "img": {
     "file": "clean-diff",
     "alt": "Tabuľka porovnania zmien: index, čas, pôvodný vs. vyčistený text, značka pravidla na každom riadku",
     "cap": "Každá zmena nesie značku pravidla; obnovte jednotlivé riadky alebo všetky naraz"
    }
   },
   {
    "h2": "Náhľad a export",
    "ps": [
     "Prepínajte medzi zobrazeniami „Vyčistené / Pôvodné“. V pôvodnom zobrazení sú odstránené záznamy preškrtnuté a označené ako „Odstránené“ a exportovaný súbor presne zodpovedá náhľadu. Formáty exportu: SRT (predvolený), VTT, ASS (k dispozícii, keď je zdrojom ASS, pričom sekcia štýlov sa zachová v nezmenenej podobe) a čistý text TXT bez časových osí. Názov súboru automaticky získa značku `.clean`."
    ],
    "img": {
     "file": "clean-preview",
     "alt": "Náhľad celého textu: vyčistené a pôvodné zobrazenie so štatistickým panelom zobrazujúcim počty",
     "cap": "Dva náhľady, dostanete presne to, čo vidíte"
    }
   },
   {
    "h2": "Často kladené otázky",
    "ps": [
     "**Vymaže to omylom normálne dialógy?** Pravidlo pre vodoznak najskôr odstráni riadky s vodoznakom (pričom zachová riadky dialógov vnútri dvojjazyčných záznamov) a celý záznam vymaže iba vtedy, ak zostanú stopové prvky; odstránenie SDH sa dotýka iba obsahu v zátvorkách s kľúčovými slovami SDH, ktorý má 40 znakov alebo menej – bežné dialógy v zátvorkách zostávajú.",
     "**Ako sa čisté riadky piesní odlišujú od piesní v dialógoch?** Odstránené sú iba tie záznamy, kde je každý jeden riadok obklopený hudobnými notami ♪ alebo značkami ako [music]; dialógy obsahujúce piesne sa zachovávajú.",
     "**Môžu menovky rečníkov zasiahnuť čínsky text?** Zhodujú sa iba názvy písané veľkými písmenami na začiatku riadku, za ktorými nasleduje dvojbodka (napríklad `GEORGE:`); vety s čínskou dvojbodkou sa nikdy nezhodujú.",
     "**Môžem čistiť viacero súborov naraz?** Nie – jeden súbor na jedno spustenie. Stiahnite si výsledok a potom nahrajte ďalší."
    ]
   },
   {
    "h2": "Súkromie",
    "ps": [
     "Čistenie prebieha kompletne vo vašom prehliadači; žiadny obsah tituliek sa nikdy neposiela na server."
    ]
   },
   {
    "h2": "Súvisiace nástroje a návody",
    "ps": [
     "Krátky návod zameraný na odstránenie vodoznakov a reklám nájdete v časti [[odstránenie reklám a vodoznakov z tituliek|/guides/remove-subtitle-ads.html]]; pred odovzdaním spustite nad súborom [[kontrola kvality tituliek|/guides/subtitle-quality-check.html]]; ak chcete zmeniť formáty, použite [[konverzia formátov|/convert.html]]."
    ]
   }
  ]
 },
 "convert": {
  "seo": {
   "title": "Ako konvertovať formáty titulkov (SRT, VTT, ASS, SBV, LRC, TXT) – AI-SRTSub",
   "desc": "Sprievodca konvertorom: vložte súbor, skontrolujte zistený formát, vyberte výstupný formát, pracujte s dvojjazyčným textom a stiahnite ho. Všetko prebieha v prehliadači.",
   "h1": "Sprievodca konvertorom formátov titulkov",
   "intro": "Tento sprievodca vás provádza stránkou zhora nadol: načítajte titulky, potvrďte zistený formát, vyberte výstupný formát a stiahnite výsledok. Všetko prebieha vo vašom prehliadači – žiadny súbor neopustí vaše zariadenie.",
   "ctaText": "Otvoriť konvertor titulkov"
  },
  "body": [
   {
    "h2": "Načítajte svoje titulky",
    "ps": [
     "Presuňte súbor do prerušovaného poľa alebo kliknutím vyberte jeden; do textového poľa môžete tiež **prilepiť obsah**. Formát sa zistí z prípony aj obsahu a výsledok sa zobrazí v značke formátu."
    ],
    "img": {
     "file": "convert-upload",
     "alt": "Oblasť nahratia: načítaná vzorka SRT, zistená ako SRT",
     "cap": "Zistený formát sa zobrazuje v značke – v prípade pochybností to skontrolujte tu"
    }
   },
   {
    "h2": "Vyberte výstupný formát",
    "ps": [
     "Vyberte cieľový formát z rozbaľovacej ponuky: šesť možností – srt, vtt, ass, sbv, lrc, txt. Konverzia na formát ass obnoví pevný predvolený štýl 1920×1080 (biely text, čierny obrys, dole v strede) a **nezachová pôvodné písma ani farby**; txt exportuje iba text bez načasovania."
    ],
    "img": {
     "file": "convert-opt",
     "alt": "Rozbaľovacia ponuka výstupného formátu s vybratým formátom VTT",
     "cap": "Výstupný formát sa neriadi vstupom – musíte si ho vybrať sami"
    }
   },
   {
    "h2": "Dvojjazyčné spracovanie",
    "ps": [
     "Ak je súbor dvojjazyčný (dva riadky v jednom titulku alebo prekladané titulky), rozloženie sa počas konverzie zachová v pôvodnom stave. Výberom možnosti „ponechať dvojjazyčné“ sa dva jazyky rozdelia na horný a dolný riadok, pričom každý sa zalamuje samostatne; ovládací prvok je deaktivovaný, keď sa nezistí žiadny dvojjazyčný text."
    ]
   },
   {
    "h2": "Konvertovať a stiahnuť",
    "ps": [
     "Kliknite na „Konvertovať“: panel výsledkov zobrazuje počet titulkov a celkové trvanie, pričom text je pripravený na kontrolu. Kliknutím na **Stiahnuť** uložte súbor alebo kliknutím na **Kopírovať** získate text priamo. Konverzia nikdy nemení žiadne hodnoty časovania – prepisuje iba formát. Ak chcete prečasovať titulky, použite [[nástroj na časovanie|/shift.html]]."
    ],
    "img": {
     "file": "convert-result",
     "alt": "Panel výsledkov: počet titulkov a celkové trvanie s tlačidlami na stiahnutie a kopírovanie",
     "cap": "6 titulkov, celkovo 0:23 – text si pred stiahnutím letmo prejdite"
    }
   }
  ]
 },
 "extract": {
  "seo": {
   "title": "Extrahovanie čistého textu z titulkov – Dva formáty, päť úprav – AI-SRTSub",
   "desc": "Extrahujte dialógy z titulkov ako čistý text: súvislé odstavce alebo jeden riadok na titulok a funkcia piatich prepínačov na odstránenie SDH titulkov, vodoznakov, duplikátov, predpôn a piesní.",
   "h1": "Ako extrahovať čistý text z titulkov",
   "intro": "Vytiahnite dialógy zo súboru titulkov ako čistý text: čísla titulkov, časové osi a štýlové značky sa automaticky odstránia, takže výsledok sa číta ako článok alebo funguje ako zoznam dialógov.",
   "ctaText": "Otvoriť extráktor čistého textu"
  },
  "body": [
   {
    "h2": "Čo tento nástroj robí",
    "ps": [
     "Pre čitateľa sú dôležité iba dialógy v súbore titulkov; zvyšok je štruktúra určená pre prehrávač – čísla titulkov, časové osi, štýlové značky. Táto stránka odstráni štruktúru a ponechá slová."
    ]
   },
   {
    "h2": "Presuňte ho, nielen nahrajte",
    "ps": [
     "Stĺpec „1 Pridať titulky“ vľavo akceptuje nahraný súbor a obsah titulkov môžete tiež vložiť priamo do textového poľa. Ak ste vybrali nesprávny súbor, kliknite na „Vymazať“ a začnite znova.",
     "Táto stránka číta súbory ako UTF-8. Ak sa titulky otvoria ako stena otáznikov alebo rámčekov, kódovanie je poškodené – najskôr ho konvertujte na UTF-8 v ponuke [[Oprava poškodeného textu|/repair.html]] a potom sa vráťte."
    ],
    "img": {
     "file": "extract-up",
     "alt": "Oblasť pridávania titulkov v extraktore čistého textu",
     "cap": "Nahrajte súbor alebo vložte obsah titulkov priamo do textového poľa"
    }
   },
   {
    "h2": "Výber medzi dvoma rozloženiami",
    "ps": [
     "V hornej časti „2 Možnosti extrakcie“ je rozloženie: **Súvislé odstavce** rozdeľuje text na základe páuz a koncových interpunkčných znamení, takže sa číta ako článok; **Jeden riadok na titulok** poskytuje jeden riadok na položku titulku, pričom presne zodpovedá položkám pôvodného súboru.",
     "Kopírovanie dialógov pre poznámky, precvičovanie prekladu alebo čítanie ako prózy si vyžaduje súvislé odstavce; vytváranie hárku dialógov, porovnávanie riadok po riadku s originálom alebo kŕmenie iného nástroja si vyžaduje jeden riadok na titulok."
    ],
    "img": {
     "file": "extract-opt",
     "alt": "Prepínače rozloženia a čistenia v rámci možností extrakcie",
     "cap": "Vyberte jedno rozloženie; päť prepínačov nižšie rozhoduje o tom, aký druh obsahu sa odstráni"
    }
   },
   {
    "h2": "Čo každá z piatich úprav odstráni",
    "ps": [
     "**Odstrániť SDH titulky**: vymaže zvukové popisy v zátvorkách, ako napríklad „(kroky)“ alebo „[hudba]“, a zachová dialóg.",
     "**Odstrániť vodoznaky a reklamy**: zahodí riadky, ako sú titulky fansubov, adresy URL a názvy kanálov.",
     "**Odstrániť duplicitných susedov**: keď sa tá istá veta objaví dvakrát za sebou (chyba prehrávania), zachová sa iba jedna kópia; duplikáty s väčším odstupom nesú význam a ponechajú sa tak.",
     "**Odstrániť predpony rečníkov**: „JOHN: Ahoj“ sa zmení na „Ahoj“. Predvolene vypnuté – text v štýle scenára musí ukazovať, kto hovorí.",
     "**Preskočiť riadky piesní**: riadky, ktoré sú celé zložené z „♪ … ♪“, sa preskočia. Predvolene vypnuté – piesne sú tiež slová."
    ],
    "img": {
     "file": "extract-clean",
     "alt": "Päť prepínačov čistenia a ich popisy v rámci možností extrakcie",
     "cap": "Každý prepínač hovorí, čo odstráni na pravej strane; začiarknite tie, ktoré potrebujete"
    }
   },
   {
    "h2": "Prevzatie výsledku",
    "ps": [
     "Stĺpec „3 Výsledok“ vpravo zobrazuje extrahovaný text naživo a prepočítava sa hneď, ako zmeníte možnosť.",
     "Keď ste spokojní, kliknutím na „Stiahnuť“ uložte súbor .txt alebo na „Kopírovať“ a vezmite si text so sebou. Pre jazyky, ktoré neoddeľujú slová medzerami, ako je čínština a japončina, sa zlučovanie riadkov riadi inými pravidlami a nástroj to spravuje pre každý jazyk automaticky."
    ],
    "img": {
     "file": "extract-out",
     "alt": "Oblasť výsledkov s tlačidlami na stiahnutie a kopírovanie",
     "cap": "Výsledok sa aktualizuje naživo; stiahnite si ho ako txt alebo skopírujte priamo"
    }
   },
   {
    "h2": "Čo zostáva nedotknuté",
    "ps": [
     "Samotný dialóg sa neprepisuje. Prepínače čistenia rozhodujú iba o tom, ktoré celé riadky alebo bloky sa zahodia; nikdy nemenia znenie položky.",
     "Časové osi a čísla titulkov sa jednoducho nevypisujú, nie sú pozmenené a potom vypísané – pôvodný súbor je nedotknutý a táto stránka neponúka export s časovými osami. Táto úloha patrí pod [[Konverzia formátov|/convert.html]]."
    ]
   },
   {
    "h2": "Často kladené otázky",
    "ps": [
     "**Zostávajú štýlové značky ASS v texte?** Nie. Bloky prepísania ASS `{}` sú odstránené a zostáva iba dialóg.",
     "**Vychádza dvojjazyčný súbor ako dva riadky alebo jeden?** Toľko riadkov, koľko mala položka; táto stránka ich nezlučuje ani nerozdeľuje – na ich oddelenie použite [[Rozdelenie dvojjazyčných titulkov|/bilingual.html]].",
     "**Prečo sú predpony rečníkov zachované predvolene?** Meno v „JOHN: Ahoj“ je často užitočná informácia (scenáre, hárky dialógov) a jeho odstránenie sťažuje určenie, kto hovorí, takže výber zostáva na vás.",
     "**Dajú sa extrahovať aj súbory piesní LRC?** Áno. Časové značky LRC sa odstránia a riadky piesní zostanú; ak piesne nechcete, začiarknite možnosť „Preskočiť riadky piesní“."
    ]
   },
   {
    "h2": "Súkromie",
    "ps": [
     "Titulky sa spracovávajú výlučne v prehliadači: nič sa nenahráva a nič neprechádza cez server. Text zostáva iba na aktuálnej stránke a po obnovení sa vymaže."
    ]
   },
   {
    "h2": "Súvisiace nástroje a sprievodcovia",
    "ps": [
     "Ak chcete pochopiť, čo súbor titulkov skutočne obsahuje, pozrite si [[Čo je vo vnútri súboru SRT|/guides/srt-file-format.html]]; ak chcete preložiť extrahovaný dialóg, prejdite na [[Preklad titulkov|/translate.html]]; ak ho chcete premeniť na tabuľku, použite [[Titulky do Excelu/CSV|/guides/srt-to-excel.html]]; a pred odovzdaním čohokoľvek spustite [[Kontrola kvality titulkov|/qc.html]]."
    ]
   }
  ]
 },
 "extract-subtitles-from-video": {
  "seo": {
   "title": "Získavanie titulkov z videa – Vstavané verzus externé – AI-SRTSub",
   "desc": "Čo obsahujú MKV / WebM / MP4 / MOV, ako sa líšia textové, ASS, WebVTT a mov_text stopové záznamy, prečo obrazové titulky (PGS / DVD) neobsahujú text a čo robiť po extrakcii.",
   "h1": "Získavanie titulkov z videa",
   "intro": "Titulky môžu žiť vo vnútri videof Súboru alebo stáť samostatne mimo neho. Vo vnútri predstavujú stopu v kontajneri – ich extrakcia nemá nič spoločné s prekonvertovaním.",
   "ctaText": "Otvoriť extrakciu titulkov z videa"
  },
  "body": [
   {
    "h2": "Kde titulky žijú: vstavané a externé",
    "ps": [
     "Súbor videa (MKV, MP4) je kontajner obsahujúci videostopu, audiostopu a stopové záznamy titulkov naraz. Titulky zapečatené vo vnútri sú **vstavané**; samostatný súbor .srt / .ass nachádzajúci sa vonku je **externý** a vstavaná stopa sa nazýva aj **zmuxovaná**.",
     "Externé titulky je možné používať tak, ako sú. Problémom sú tie vstavané: ak ich chcete upraviť, preložiť alebo vytvoriť dvojjazyčnú stopu z originálu, nemáte k dispozícii žiadny súbor titulkov – stopu musíte najskôr prečítať z kontajnera. Tento krok nie je prekonvertovaním: video sa znovu nekóduje, prečítajú sa iba údaje už uložené v kontajneri."
    ]
   },
   {
    "h2": "Aký kontajner čo obsahuje",
    "ps": [
     "Rôzne kontajnery uchovávajú rôzne formáty titulkov a líši sa aj náročnosť extrakcie:"
    ],
    "img": {
     "file": "videosub-which",
     "alt": "Stopové záznamy titulkov zobrazené stránkou extrakcie vstavaných titulkov",
     "cap": "Jedna stopa na riadok, zvyčajne s jazykom a názvom stopy; ak existuje iba jedna, extrahuje sa automaticky"
    }
   },
   {
    "h2": "Prečo sa obrazové titulky nedajú extrahovať",
    "ps": [
     "Titulky Blu-ray PGS a DVD neukladajú žiadne znaky, iba sériu obrázkov s alfa kanálom. Keď ich prehrávač zobrazuje, vkladá obrázok, nie vykresľuje text.",
     "V takejto stope teda nie je žiadny text na čítanie – nejde o to, že by ho nástroj nepodporoval, ale o to, že tam žiadne znaky nie sú. Stránka to jasne uvádza, keď na takú narazí.",
     "Jediný spôsob, ako získať slová, je najskôr rozpoznať znaky v týchto obrázkoch (OCR) a vytvoriť z nich titulky. Ide o samostatný proces oddelený od vyťahovania stopy."
    ]
   },
   {
    "h2": "Čo zvyčajne nasleduje po extrakcii",
    "ps": [
     "Výsledkom je stopa v pôvodnom stave: nástroj nehádže kódovania a neopravuje časové osi. Často sa preto objavujú dve veci:",
     "Jednou je **poškodený text** – problém s kódovaním v zdrojovej stope, ktorý vyjde rovnako poškodený; prejdite na [[Ako opraviť poškodený text|/guides/repair.html]] a identifikujte kódovanie. Druhou je **nesprávne načasovanie** – či už má zdroj úvodné logo, alebo sa snímkové frekvencie nezhodujú, výsledok je ako celok posunutý; použite [[Úprava časovej osi|/shift.html]] na jeho posunutie alebo škálovanie.",
     "Potom prejdite na preklad na [[Preklad titulkov|/translate.html]] a ak chcete vytvoriť dvojjazyčné titulky, pozrite si [[Dva spôsoby, ako vytvoriť dvojjazyčné titulky|/guides/make-bilingual-subtitles.html]]."
    ],
    "img": {
     "file": "videosub-formats",
     "alt": "Oblasť výsledkov s formátmi exportu SRT / VTT / ASS / TXT",
     "cap": "Extrahované titulky je možné exportovať v štyroch formátoch; zdroj ASS si zachováva hlavičku štýlu a rozlíšenie"
    }
   },
   {
    "h2": "Niekoľko vecí, ktoré sa dajú ľahko pokaziť",
    "ps": [
     "**Extrakcia titulkov neznamená ich vpaľovanie do videa.** Video sa opätovne nekóduje, takže kvalita obrazu a zvuku zostávajú nedotknuté.",
     "**Extrakcia neovplyvňuje pôvodný súbor.** Je iba na čítanie, nikdy sa doň nezapisuje a nezmení sa ani bajt videa.",
     "**Pomalosť pri veľkom súbore nie je problémom pripojenia.** Nástroj kontroluje informácie o stope po častiach a čím je súbor väčší, tým dlhšie to trvá; všetko prebieha lokálne.",
     "**Externé titulky túto stránku nepotrebujú.** Ak máte súbor .srt / .ass, prejdite priamo na [[Konverzia formátov|/convert.html]]; extrahovať treba iba titulky zapečatené vo vnútri videa."
    ]
   },
   {
    "h2": "Súvisiace nástroje a sprievodcovia",
    "ps": [
     "Úplný návod nájdete v časti [[Ako extrahovať titulky vstavané vo videu|/guides/videosub.html]]; ak chcete preložiť to, čo ste extrahovali, prejdite na [[Preklad titulkov|/translate.html]], pre vytvorenie dvojjazyčných titulkov si pozrite [[Dva spôsoby, ako vytvoriť dvojjazyčné titulky|/guides/make-bilingual-subtitles.html]]; pri poškodenom texte začnite s [[Oprava poškodeného textu|/repair.html]]."
    ]
   }
  ]
 },
 "fps-23-976-vs-25": {
  "seo": {
   "title": "Čo skutočne znamenajú hodnoty 23.976 / 24 / 25 / 30 fps – Načasovanie titulkov – AI-SRTSub",
   "desc": "23.976 nie je 24 a 29.97 nie je 30 – chýbajúcich 0,1 % pochádza z farby NTSC, zatiaľ čo PAL spúšťa filmy o 4 % rýchlejšie. Ako tieto hodnoty posúvajú načasovanie titulkov a ako medzi nimi konvertovať.",
   "h1": "Čo skutočne znamenajú hodnoty 23.976 / 24 / 25 / 30 fps",
   "intro": "Medzera 0,1 % medzi 23.976 a 24 je pozostatkom z histórie televízie. Spolu so 4 % pre PAL je to dôvod, prečo sa titulky postupne čoraz viac rozchádzajú so zvukom, ako film plynulo pokračuje.",
   "ctaText": "Otvoriť úpravu načasovania"
  },
  "body": [
   {
    "h2": "Čo znamená každé číslo",
    "ps": [
     "Snímková frekvencia určuje, koľko obrázkov sa zobrazí za jednu sekundu. Štyri najčastejšie používané:"
    ]
   },
   {
    "h2": "Odkiaľ pochádza hodnota 0,1 %",
    "ps": [
     "23.976 = 24 × 1000/1001 a 29.97 = 30 × 1000/1001. Hodnota 1000/1001 je pozostatkom pridávania farby do normy NTSC: aby sa farebná nosná vlnová frekvencia vmestila bez narušenia existujúcich čiernobielych prijímačov, frekvencia políčok sa znížila zo 60 Hz na 59.94 Hz (60 × 1000/1001) a snímková frekvencia klesla s ňou.",
     "Výsledok: filmy sa v regiónoch NTSC vysielajú pri 23.976 namiesto 24. Rozdiel je 0,1 % alebo 3,6 sekundy za hodinu – sám osebe je sotva pozorovateľný, ale nezamieňajte si ho so 4 % uvedenými nižšie a nikdy ich nekombinujte do jedného výpočtu."
    ]
   },
   {
    "h2": "Odkiaľ pochádzajú 4 %",
    "ps": [
     "Regióny PAL premietajú pri 25 fps. Filmy sa nakrúcajú pri 24 fps a jednoducho sa prehrávajú pri 25 – nepridáva sa ani neodoberá žiadne okno, takže prehrávanie prebieha o 4 % rýchlejšie (25/24 ≈ 1.0417). 100-minútový film má vo verzii PAL dĺžku 96 minút.",
     "To je koreňom **progresívneho posunu**: titulky vytvorené pre originál a video vo verzii PAL sa na začiatku presne zhodujú a pri záverečných titulkoch sú od seba vzdialené štyri minúty. Žiadny globálny posun to nedokáže napraviť; je nutné ich preškálovať podľa pomeru."
    ],
    "img": {
     "file": "shift-step-rate",
     "alt": "Sekcia rýchlosti na stránke načasovania: vstupné pole pomeru",
     "cap": "Preškálovať podľa pomeru – jedna hodnota pokrýva celý film"
    }
   },
   {
    "h2": "Ako konvertovať",
    "ps": [
     "Konverzia znamená vynásobenie jediným pomerom, ktorý platí pre celý film:"
    ]
   },
   {
    "h2": "Ako zistiť, akú hodnotu máte",
    "ps": [
     "Namiesto hádania pomeru nájdite dva momenty, o ktorých správnom načasovaní ste si istí – zvyčajne prvý a posledný riadok dialógu – a povedzte nástroju „tento riadok by mal byť na 00:00:12 a tamten na 01:35:40“; lineárne roztiahne celý film medzi týmito dvoma bodmi. Ide o „dvojbodové ukotvenie“, ktoré nevyžaduje žiadnu aritmetiku snímkovej frekvencie z vašej strany.",
     "Ak si chcete sami overiť snímkovú frekvenciu, pozrite sa do prehrávača alebo nástroja na informácie o médiách. Keď názov súboru ako `1080p.WEB` neobsahuje žiadnu nápovedu o snímkovej frekvencii, bezpečnejšou cestou je dvojbodové ukotvenie."
    ],
    "img": {
     "file": "shift-step-two",
     "alt": "Sekcia dvojbodového ukotvenia na stránke načasovania: dva riadky vstupov časových značiek",
     "cap": "Dvojbodové ukotvenie nevyžaduje snímkovú frekvenciu – stačia dve časové značky"
    }
   },
   {
    "h2": "Súvisiace nástroje a sprievodcovia",
    "ps": [
     "Samotná konverzia snímkovej frekvencie – [[Konverzia snímkovej frekvencie titulkov|/guides/srt-fps-converter.html]]; úprava rýchlosti – [[Konverzia rýchlosti titulkov|/guides/subtitle-speed-converter.html]]; neistota, či ide o globálny posun alebo progresívny posun – [[Titulky sa čoraz viac rozchádzajú so zvukom|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "glossary": {
  "seo": {
   "title": "Hromadná výmena výrazov v titulkoch – Jedna tabuľka opraví súbor – AI-SRTSub",
   "desc": "Jedno pravidlo na riadok, oddelené pomocou -> , => , → alebo tabulátora, so znakom # pre komentáre. Zhoda celých slov, citlivosť na veľkosť písmen, prvý alebo druhý riadok dvojjazyčného titulku, každá zmena je zaznamenaná a vratná.",
   "h1": "Ako hromadne nahradiť výrazy v titulkoch",
   "intro": "Jedna tabuľka výrazov zabezpečí jednotnú terminológiu v celom súbore titulkov naraz – časové osi, štýly ASS a bloky VTT NOTE zostávajú úplne nedotknuté.",
   "ctaText": "Otvoriť hromadnú výmenu výrazov"
  },
  "body": [
   {
    "h2": "Čo tento nástroj robí",
    "ps": [
     "To isté slovo preložené dvoma rôznymi spôsobmi, mená a miesta posúvajúce sa pri strojovom preklade, cudzie titulky, ktoré potrebujú zodpovedať vašim vlastným zvyklostiam – to všetko spája jedna črta: mení sa slovo, nie štruktúra. Táto stránka mení iba slová."
    ]
   },
   {
    "h2": "Dva vstupy: titulky a tabuľka výrazov",
    "ps": [
     "Stĺpec „1 Pridať titulky“ vľavo prijíma súbor titulkov alebo môžete obsah vložiť priamo; ak ste vybrali nesprávny súbor, kliknite na „Vymazať“.",
     "Stĺpec „2 Tabuľka výrazov“ vpravo obsahuje pravidlá. **Jedno pravidlo na riadok**, pričom starý výraz a nový výraz sú oddelené znakom `->` , `=>` , `→` alebo tabulátorom – fungujú všetky štyri možnosti. Riadky začínajúce znakom `#` sú komentáre a nezúčastňujú sa na nahradzovaní.",
     "Ak si nie ste istí formátom, kliknite na „Vyplniť príklad“ a upravte ho."
    ],
    "img": {
     "file": "glossary-up",
     "alt": "Oblasť pridávania titulkov a vstup tabuľky výrazov na stránke výmeny výrazov",
     "cap": "Titulky vľavo, pravidlá vpravo; jedno pravidlo na riadok, starý a nový výraz oddelené znakom ->"
    }
   },
   {
    "h2": "Ako napísať tabuľku výrazov",
    "ps": [
     "Jedno pravidlo na riadok: aktuálny výraz vľavo, to, čím sa má stať, vpravo. Napríklad `Thor -> Donar` nahradí každý výskyt slova „Thor“ v súbore slovom „Donar“.",
     "Komentáre začínajú znakom `#` a sú užitočné na označenie skupiny pravidiel (napríklad „# opravy mien 1. série“) a na dočasné vypnutie pravidla – stačí predň umiestniť znak `#` namiesto jeho vymazania.",
     "Pravidlá sa vykonávajú zhora nadol; text vytvorený jedným pravidlom je opätovne skenovaný pravidlami pod ním. Keď záleží na poradí (povedzme najprv nahradiť A za B a potom B za C), majte to na pamäti."
    ],
    "img": {
     "file": "glossary-table",
     "alt": "Riadok za riadkom pravidiel výmeny vo vstupe tabuľky výrazov",
     "cap": "Jedno pravidlo na riadok; riadky začínajúce znakom # sú komentáre a môžu dočasne vypnúť pravidlo"
    }
   },
   {
    "h2": "Čo robia tri prepínače",
    "ps": [
     "**Rozsah**: `všetko` / `iba prvý riadok` / `iba druhý riadok`. V dvojjazyčnom súbore vyberte možnosť „iba druhý riadok“, ak chcete zmeniť iba preklad; položky, ktoré majú iba jeden riadok, zostávajú pri nastavení pre jeden riadok nedotknuté – nástroj nehádže, ktorá strana je originál.",
     "**Celé slovo**: nahradzuje iba výrazy, ktoré stojí samostatne ako slovo, takže `art` sa nedotkne slova `start`. Pre jazyky, ktoré neoddeľujú slová medzerami, ako je čínština a japončina, tento prepínač nemá žiadny vplyv – nahrádzanie tam funguje na základe podreťazcov.",
     "**Citlivé na veľkosť písmen**: predvolene vypnuté, takže `CEO` aj `ceo` sú nahradené; po začiarknutí sa nahradí iba presne rovnaká veľkosť písmen."
    ],
    "img": {
     "file": "glossary-opt",
     "alt": "Prepínače rozsahu, celého slova a citlivosti na veľkosť písmen pod tabuľkou výrazov",
     "cap": "Rozsah rozhoduje o tom, ktorý riadok sa mení; celé slovo a veľkosť písmen rozhodujú o tom, aká prísna je zhoda výrazu"
    }
   },
   {
    "h2": "Každá zmena je zaznamenaná, každá zmena je vratná",
    "ps": [
     "„3 Výsledok“ zobrazuje vymenené titulky a tiež **uvádza zoznam každej zmeny**: ktorý titulok, ktorý riadok, z čoho na čo.",
     "Ak niektorú z nich nechcete, kliknite na ňu v zozname a vráťte späť iba túto položku – netreba upravovať tabuľku výrazov a spúšťať všetko znova. Keď ste spokojní, kliknite na „Stiahnuť“ alebo „Kopírovať“."
    ],
    "img": {
     "file": "glossary-out",
     "alt": "Oblasť výsledkov so zoznamom jednotlivých zmien",
     "cap": "Každá zmena je zaznamenaná; kliknutím na tú, ktorú nechcete, ju vrátite späť"
    }
   },
   {
    "h2": "Čo zostáva nedotknuté",
    "ps": [
     "**Časové osi, riadky štýlov ASS a bloky VTT `NOTE` nie sú ovplyvnené ani jediným znakom.** Nahrádzanie sa vzťahuje iba na text dialógu, nikdy nie na štrukturálne riadky.",
     "Tabuľka výrazov nikdy automaticky neupravuje váš súbor titulkov – výsledkom je nový výstup a originál zostáva taký, aký je."
    ]
   },
   {
    "h2": "Často kladené otázky",
    "ps": [
     "**Prečo sa výraz nenahradil?** Najskôr skontrolujte rozsah: pri zvolenej možnosti „iba druhý riadok“ zostávajú položky s jediným riadkom nedotknuté. Potom skontrolujte zhodu celých slov, ktorá zastavuje zhody, ktoré nie sú samostatnými slovami.",
     "**Prečo čínština stále nahrádza podreťazce, aj keď je zapnutá zhoda celých slov?** To je očakávané správanie. Čínština a japončina neoddeľujú slová medzerami, takže nástroj nedokáže určiť hranice slov a zhoda celých slov tam nemá žiadny vplyv.",
     "**Ako všetko vrátim späť po chybe?** Vráťte položky späť jednu po druhej v zozname zmien; ak chcete začať odznova, vymažte tabuľku výrazov a znova pridajte titulky.",
     "**Môžu byť riadky štýlov ASS zmenené omylom?** Nie. Riadky štýlov a bloky `NOTE` sú mimo rozsahu platnosti; zúčastňuje sa iba text dialógu."
    ]
   },
   {
    "h2": "Súkromie",
    "ps": [
     "Titulky a tabuľka výrazov sa spracovávajú výlučne v prehliadači: nič sa nenahráva a nič neprechádza cez server. Tabuľka výrazov sa neuloží, takže pri ďalšom otvorení stránky bude prázdna."
    ]
   },
   {
    "h2": "Súvisiace nástroje a sprievodcovia",
    "ps": [
     "Informácie o tom, či si vytvoriť tabuľku výrazov a ako ju udržiavať počas celej série, nájdete v časti [[Tabuľky výrazov: udržiavanie konzistentnosti série|/guides/subtitle-glossary.html]]; ak je obsah znečistený (vodoznaky, SDH titulky), najskôr spustite [[Čistenie titulkov|/clean.html]]; ak sú mená usporiadané a potrebujete iné jazyky, prejdite na [[Preklad titulkov|/translate.html]]; a výsledok prežeňte cez [[Kontrola kvality titulkov|/qc.html]]."
    ]
   }
  ]
 },
 "hanconv": {
  "seo": {
   "title": "Konverzia zjednodušených a tradičných titulkov – Taiwan vs Hongkong – AI-SRTSub",
   "desc": "Sprievodca deviatimi smermi: taiwančina s regionálnou slovnou zásobou alebo bez nej, Hongkong ako samostatná varianta, všetko s možnosťou prevodu späť do zjednodušenej čínštiny.",
   "h1": "Ako prevádzať zjednodušené a tradičné čínske titulky",
   "intro": "To, či titulky smerujú na Taiwan, do Hongkongu alebo do pevninskej Číny, ovplyvňuje slovnú zásobu aj tvar znakov. Na výber je deväť smerov, pričom sa prevádza iba dialóg – časovanie, poradové čísla a štýlové riadky ASS zostávajú nedotknuté.",
   "ctaText": "Otvoriť konvertor"
  },
  "body": [
   {
    "h2": "Čo tento nástroj robí",
    "ps": [
     "Prevod medzi zjednodušenou a tradičnou čínštinou nie je len o odlišnom zápise jednotlivých znakov. Rovnaké zjednodušené slovo zodpovedá rôznym slovám v rôznych regiónoch – slovo pre „softvér“ sa na Taiwane líši od pevniny a Hongkong má ešte ďalšiu verziu. Konvertor ich drží oddelene:"
    ]
   },
   {
    "h2": "Nahratie a detekcia",
    "ps": [
     "Presuňte súbor sem alebo ho vyhľadajte – podporované sú formáty SRT, VTT, ASS a TXT – prípadne prilepte obsah titulkov priamo do políčka. Formát sa deteguje automaticky a zobrazí sa vedľa nápisu „Zistený formát“."
    ],
    "img": {
     "file": "hanconv-up",
     "alt": "Oblasť nahrávania konvertora: priestor na presunutie a pole na prilepenie so zisteným formátom navrchu",
     "cap": "SRT / VTT / ASS / TXT, formát zistený automaticky"
    }
   },
   {
    "h2": "Výber z deviatich smerov",
    "ps": [
     "Deväť smerov v ponuke „Previesť na“ sa delí do troch skupín. **Zjednodušená → tradičná**: všeobecná tradičná, taiwanská (so zmenou slovnej zásoby), taiwanská (iba znaky), hongkonská. **Tradičná → zjednodušená**: všeobecná, z taiwanskej, z hongkonskej. **Tradičná na tradičnú**: taiwanské tvary, hongkonské tvary.",
     "Výber „taiwanskej slovnej zásoby“ mení aj regionálne slová: slovo pre „softvér“ sa zmení na taiwanské a rovnako aj slovo pre „informácie“; „taiwanské znaky“ menia iba spôsob písania znakov a slovnú zásobu nechávajú tak. Hongkong je úplne iný prípad a používa ďalšie slovo pre „softvér“. Ak chcete prevádzať späť do zjednodušenej, použite skupinu nižšie – musíte uviesť, z ktorej tradičnej variety vychádzate, pretože taiwanský a hongkonský text sa vracajú inou cestou."
    ],
    "img": {
     "file": "hanconv-dir",
     "alt": "Karta Previesť na: rozbaľovacia ponuka cieľa so zvolenou možnosťou „Zjednodušená → taiwanská tradičná (so zmenou slovnej zásoby)“",
     "cap": "Smerové ponuky sa nachádzajú v rozbaľovacom zozname „Previesť na“ v troch skupinách; táto je taiwanská so zmenou slovnej zásoby"
    }
   },
   {
    "h2": "Výsledok a export",
    "ps": [
     "Oblasť výsledkov okamžite zobrazuje prevedené titulky spolu so štatistickým panelom obsahujúcim celkový počet riadkov a počet zmenených riadkov. Ak sa nezmenilo nič, zobrazí sa upozornenie, že súbor nemusí obsahovať žiadne čínske znaky – prevádzajú sa iba znaky chan, takže titulky obsahujúce iba latinku alebo číslice zostávajú presne také, aké boli.",
     "Potom ich stiahnite alebo skopírujte. Do názvu súboru sa vkladá jazyková značka – `demo.srt` sa pre taiwanskú tradičnú mení na `demo.zh-TW.srt`, pre všeobecnú tradičnú na `.zh-Hant` a pri prevode späť do zjednodušenej na `.zh-Hans`."
    ],
    "img": {
     "file": "hanconv-out",
     "alt": "Oblasť výsledkov: prevedené titulky a štatistický panel",
     "cap": "Štatistický panel zobrazuje celkový počet riadkov a počet zmenených riadkov; odtiaľto ich môžete stiahnuť alebo skopírovať"
    }
   },
   {
    "h2": "Čo zostáva nedotknuté",
    "ps": [
     "Prevádza sa iba dialóg. Časovanie, poradové čísla a štýlové riadky ASS sa vôbec nemenia – výsledok je pripravený na použitie bez nutnosti opätovného formátovania."
    ]
   },
   {
    "h2": "Časté otázky",
    "ps": [
     "**Prečo konvertor nezmenil slovo pre „čistý“?** Mapovania typu jeden-k-viacerým sa riešia kontextom slova: význam „čistý“ a význam „suchý“ zdieľajú jednu tradičnú formu, zatiaľ čo význam „kmeň stromu“ používa inú. Tabuľky pochádzajú z projektu OpenCC a porovnávajú celé frázy namiesto jednotlivých znakov.",
     "**Aký je rozdiel medzi taiwanskou a hongkonskou tradičnou čínštinou?** Slovná zásoba: slovo pre „softvér“ sa medzi nimi líši. Vyberte smer pre región, do ktorého dodávate obsah.",
     "**Počet znakov sa po prevode zmenil?** Vymieňajú sa iba znaky chan – žiadne položky sa nepridávajú ani neodstraňujú a časovanie sa nemení. Ak sa zmenil počet riadkov, skontrolujte, či bol správne detegovaný formát.",
     "**Slovník sa nepodarilo načítať?** Stránka vás vyzve na obnovenie a opätovný pokus. Načítava sa lokálne, takže titulky netreba nikam nahrávať."
    ]
   },
   {
    "h2": "Ochrana súkromia",
    "ps": [
     "Prevod prebieha výlučne vo vašom prehliadači. Žiadny obsah titulkov sa nikdy neodosiela na server."
    ]
   },
   {
    "h2": "Súvisiace nástroje a sprievodcovia",
    "ps": [
     "Ak potrebujete iba prevod zjednodušenej čínštiny na tradičnú, pozrite si [[Previesť zjednodušené titulky na tradičné|/guides/srt-simplified-to-traditional.html]]; prečo ide o niečo viac než len výmenu znakov, nájdete v článku [[Zjednodušená vs tradičná nie je len výmena znakov|/guides/simplified-traditional-chinese.html]]; ak chcete preložiť text do iného jazyka, navštívte [[Preklad titulkov|/translate.html]]."
    ]
   }
  ]
 },
 "how-to-make-lrc-file": {
  "seo": {
   "title": "Ako synchronizovať texty LRC – Jeden riadok na text, ťuknutie do rytmu – AI-SRTSub",
   "desc": "Vytvorte súbor LRC od začiatku: vložte jeden riadok textu na riadok, ťukajte na čas počas počúvania, užitočné skratky, kedy preskočiť riadok, LRC alebo SRT a čo robiť pri posune časovania.",
   "h1": "Ako synchronizovať texty LRC",
   "intro": "Súbor LRC je v podstate len „jeden riadok textu plus jeden časový bod“. Jeho vytvorenie sa nazýva časovanie: zachytenie okamihu, kedy sa každý riadok začína.",
   "ctaText": "Otvoriť nástroj na synchronizáciu textu"
  },
  "body": [
   {
    "h2": "Čo je to vlastne časovanie",
    "ps": [
     "Štruktúra súboru LRC nemôže byť jednoduchšia: jeden riadok textu na riadok, pričom každý predchádza časová značka `[mm:ss.xx]`. Keď prehrávač dosiahne daný riadok, v tom momente ho zobrazí.",
     "Celá práca s „vytváraním LRC“ tak spočíva v priradení časového bodu ku každému riadku textu – a to za vás žiaden stroj neurobí, pretože rozhodnúť, kedy sa riadok začína spievať, vyžaduje počúvanie."
    ]
   },
   {
    "h2": "Koľko prechodov skladba potrebuje",
    "ps": [
     "Oplatí sa nad tým zamyslieť minútu predtým, ako začnete; ušetrí vám to väčšinu prerábania:"
    ],
    "img": {
     "file": "lrc-tap2",
     "alt": "Ovládacie prvky pre prehrávanie, označenie riadku, vrátenie jedného riadku späť a preskočenie riadku v oblasti ťukania do rytmu",
     "cap": "Stláčanie klávesu Enter počas prehrávania je najplynulejšie; označili ste nesprávny riadok? Stlačte Z a označte ho znova"
    }
   },
   {
    "h2": "Vloženie textov rozhoduje o tom, aké plynulé to bude ďalej",
    "ps": [
     "Vložte texty v štýle jeden riadok na text; prázdne riadky sa preskočia. Zlomy riadkov, ktoré vložíte, sú tie riadky, ktoré budete neskôr časovať – ak ich teraz rozdelíte na viaceré riadky, neskôr budete musieť viackrát ťuknúť.",
     "Funguje aj vloženie existujúceho súboru LRC: jeho časové značky `[mm:ss.xx]` sú rozpoznané a po importe **pokračujete od prvého riadku bez času**, takže už načasované riadky netreba robiť znova.",
     "To znamená, že napoly hotový súbor LRC môžete uložiť a neskôr ho vložiť späť, aby ste mohli pokračovať."
    ],
    "img": {
     "file": "lrc-paste2",
     "alt": "Oblast vkladania textov a tlačidlo na analýzu textov",
     "cap": "Jeden riadok na text; vloženie celého LRC načíta existujúce časy, takže môžete pokračovať"
    }
   },
   {
    "h2": "Exportovať do LRC alebo SRT",
    "ps": [
     "**Pre hudobný prehrávač exportujte formát LRC.** Foobar2000, rôzne prehrávače a zariadenia so zobrazením textu ho dokážu prečítať.",
     "**Ak chcete umiestniť texty na video alebo ich ďalej spracovať, exportujte SRT.** Formát SRT čítajú videostopové titulky, nástroje na titulky a strihový softvér. Pri exporte každý riadok trvá až do začiatku nasledujúceho a posledný riadok sa vráti k trvaniu 2 sekundy.",
     "Oba exportujú iba riadky, ktoré majú čas – preskočené riadky sa do súboru nikdy nedostanú."
    ],
    "img": {
     "file": "lrc-export",
     "alt": "Tlačidlá na stiahnutie LRC, stiahnutie SRT a kopírovanie v oblasti exportu",
     "cap": "LRC pre prehrávače, SRT pre video; exportujú sa iba riadky s časom"
    }
   },
   {
    "h2": "Niekoľko vecí, ktoré sa dajú ľahko pokaziť",
    "ps": [
     "**Je všetko po načasovaní trochu posunuté? Použite posun.** Exportujte SRT a posuňte ho ako celok pomocou funkcie [[Úprava časovej osi|/shift.html]]; je to oveľa rýchlejšie než prečasovávanie riadok po riadku.",
     "**Odchýlka sa s postupujúcou skladbou zväčšuje? Ide o problém s rýchlosťou.** Keď sa rýchlosť prehrávania a rýchlosť nahrávania líšia, chyba narastá smerom ku koncu a to si vyžaduje proporčné škálovanie, nie posun.",
     "**Skratky pôsobia prirodzene len vtedy, ak ich používate spoločne.** Medzerník spúšťa a pozastavuje prehrávanie, Enter označuje aktuálny riadok, Z vráti jeden riadok späť – stlačte Enter priamo počas prehrávania namiesto prepínania medzi myšou a klávesnicou.",
     "**Kvalita zvuku ovplyvňuje presnosť.** Zdroj s čistými vokálmi sa sleduje ľahšie; živé nahrávky a zdroje s hlasným hudobným sprievodom sú citeľne náročnejšie."
    ]
   },
   {
    "h2": "Súvisiace nástroje a sprievodcovia",
    "ps": [
     "Kompletný návod nájdete v časti [[Ako používať nástroj na synchronizáciu textu|/guides/lrc.html]]; ak chcete premeniť existujúci LRC na titulky, pozrite si [[LRC na SRT|/guides/lrc-to-srt.html]]; ak je exportovaný SRT nesprávne načasovaný, použite [[Úprava časovej osi|/shift.html]]; a výsledok preverte cez [[Kontrola kvality titulkov|/qc.html]]."
    ]
   }
  ]
 },
 "lrc": {
  "seo": {
   "title": "Nástroj na synchronizáciu textov – Načítajte skladbu, vložte texty, ťukajte do rytmu – AI-SRTSub",
   "desc": "Načítajte skladbu, vložte texty, ťukajte na časovú značku pre každý riadok počas počúvania a exportujte súbory LRC alebo SRT. Medzerník spúšťa a pozastavuje, Enter označuje riadok, Z vracia späť, ruky zostávajú na klávesnici.",
   "h1": "Ako používať nástroj na synchronizáciu textov",
   "intro": "Načítajte skladbu, vložte texty, ťukajte na časovú značku pre každý riadok počas počúvania a exportujte štandardný súbor LRC alebo SRT. Zvuk sa prehráva lokálne a nikdy sa nikam neodosiela.",
   "ctaText": "Otvoriť nástroj na synchronizáciu textu"
  },
  "body": [
   {
    "h2": "Čo tento nástroj robí",
    "ps": [
     "Poskytnite skladbe súbor s textom, ktorý sa dá spievať: jeden riadok na text, pričom každý riadok obsahuje časový bod. Prehrávače čítajú súbory LRC, titulkové stopy čítajú SRT a oboje je možné exportovať tu."
    ]
   },
   {
    "h2": "1 Načítanie skladby",
    "ps": [
     "Prvý stĺpec vľavo prijíma zvukový súbor: fungujú formáty **MP3, M4A, FLAC, WAV a OGG**. Zvuk sa prehráva lokálne a nikdy sa neodosiela na server.",
     "Kvalita zvuku neovplyvňuje presnosť časovania, ale zdroj s čistými vokálmi sa sleduje jednoduchšie; živé nahrávky a zdroje s hlasným hudobným sprievodom sa synchronizujú citeľne náročnejšie."
    ],
    "img": {
     "file": "lrc-up",
     "alt": "Oblast načítania skladby v nástroji na synchronizáciu textov",
     "cap": "Formáty MP3 / M4A / FLAC / WAV / OGG fungujú a zvuk sa prehráva výlučne lokálne"
    }
   },
   {
    "h2": "2 Vloženie textov",
    "ps": [
     "Vložte texty do druhého stĺpca, **jeden riadok na text**; prázdne riadky sa automaticky preskočia. Potom kliknite na tlačidlo „Analyzovať texty“.",
     "Funguje aj vloženie existujúceho súboru LRC – jeho časové značky `[mm:ss.xx]` sú rozpoznané a po importe pokračujete od prvého riadku bez času, takže už načasované riadky netreba robiť znova."
    ],
    "img": {
     "file": "lrc-paste",
     "alt": "Oblast vkladania textov a tlačidlo na analýzu textov",
     "cap": "Vložte jeden riadok na text, prípadne vložte celé LRC a nechajte nástroj prečítať existujúce časy"
    }
   },
   {
    "h2": "3 Ťukanie do rytmu počas počúvania",
    "ps": [
     "Prehrajte skladbu a stlačte kláves Enter v okamihu, keď sa riadok začína (alebo kliknite na „Označiť tento riadok“); zaznamená sa čas pre daný riadok a kurzor preskočí na nasledujúci.",
     "Klávesové skratky: **medzerník** spúšťa a pozastavuje prehrávanie, **Enter** označuje aktuálny riadok, **Z** vracia jeden riadok späť. Stláčanie klávesu Enter počas prehrávania je najplynulejší spôsob práce – nemusíte neustále prepínať medzi myšou a klávesnicou.",
     "Označili ste nesprávny riadok? Stlačením klávesu Z ho vrátite späť a môžete ho označiť znova. Ak nechcete riadok označiť vôbec (inštrumentálna prestávka, čisto hudobná pasáž), kliknite na „Preskočiť tento riadok“ a v exporte sa nezobrazí."
    ],
    "img": {
     "file": "lrc-tap",
     "alt": "Ovládacie prvky pre prehrávanie, označenie riadku, vrátenie jedného riadku späť a preskočenie riadku v oblasti ťukania do rytmu",
     "cap": "Medzerník spúšťa a pozastavuje, Enter označuje aktuálny riadok, Z vracia späť – ruky zostávajú na klávesnici"
    }
   },
   {
    "h2": "4 Exportovať",
    "ps": [
     "Štvrtý stĺpec slúži na export: **Stiahnuť LRC** pre prehrávače, **Stiahnuť SRT** pre video stopy s titulkami alebo „Kopírovať“ na priame získanie textu.",
     "Exportujú sa iba riadky s časom; preskočené riadky sa do súboru nikdy nedostanú. V exporte SRT každý riadok trvá až do začiatku nasledujúceho a posledný riadok sa vráti k trvaniu 2 sekundy."
    ],
    "img": {
     "file": "lrc-out",
     "alt": "Tlačidlá na stiahnutie LRC, stiahnutie SRT a kopírovanie v oblasti exportu",
     "cap": "LRC pre prehrávače, SRT pre video; exportujú sa iba riadky s časom"
    }
   },
   {
    "h2": "Čo zostáva nedotknuté",
    "ps": [
     "Text piesne sa neprepisuje. Časovanie pridáva iba jeden časový bod na riadok a nikdy sa nedotýka slov, ktoré ste vložili.",
     "Pri importe existujúceho súboru LRC si riadky, ktoré už obsahujú časovú značku, zachovávajú pôvodný čas a vy označujete iba od prvého nečasovaného riadku ďalej."
    ]
   },
   {
    "h2": "Časté otázky",
    "ps": [
     "**Prečo v exporte chýbajú niektoré riadky?** Preskočené riadky a riadky bez času sa do súboru nikdy nedostanú. Vráťte sa k tretiemu kroku a doplňte ich, prípadne overte, či mali byť preskočené.",
     "**Dajú sa časy zmeniť dodatočne?** Ak chcete po označení všetko trochu posunúť, exportujte SRT a použite [[Úprava časovej osi|/shift.html]] na úpravu posunu alebo škálovanie celého súboru.",
     "**LRC alebo SRT – čo mám exportovať?** LRC pre hudobné prehrávače (foobar2000, streamovacie klienty, rôzne prehrávače); SRT, ak sa texty musia nachádzať na videu alebo ak sa s nimi bude ďalej pracovať pomocou nástrojov na titulky.",
     "**Ako dlho trvá spracovanie jednej skladby?** Záleží na tom, koľko riadkov obsahuje a akú presnosť požadujete. V prípade skladby s tridsiatimi alebo štyridsiatimi riadkami zaberie jeden prechod niekoľko minút, keď už poznáte rytmus; naháňanie presnosti na úrovni slov trvá dlhšie."
    ]
   },
   {
    "h2": "Ochrana súkromia",
    "ps": [
     "Zvuk a texty sa spracúvajú výlučne v prehliadači: nič sa neodosiela a nič neprechádza cez server. Zvuk sa dekóduje a prehráva iba lokálne."
    ]
   },
   {
    "h2": "Súvisiace nástroje a sprievodcovia",
    "ps": [
     "Ak už máte súbor LRC a chcete z neho spraviť titulky, pozrite si [[LRC na SRT|/guides/lrc-to-srt.html]]; informácie o myšlienkach a úskaliach za časovaním nájdete v časti [[Ako synchronizovať texty LRC|/guides/how-to-make-lrc-file.html]]; ak je exportovaný súbor SRT posunutý, použite [[Úprava časovej osi|/shift.html]]; a výsledok preverte pomocou [[Kontrola kvality titulkov|/qc.html]]."
    ]
   }
  ]
 },
 "lrc-to-srt": {
  "seo": {
   "title": "Konvertor LRC na SRT – Premeňte texty na titulky – AI-SRTSub",
   "desc": "Konvertujte texty LRC na titulky SRT: každý riadok trvá do začiatku nasledujúceho, posledná značka získava 3 sekundy. Skladby dlhšie ako 60 minút sa načítavajú správne. Beží vo vašom prehliadači.",
   "h1": "LRC na SRT",
   "intro": "Premeňte súbory s textom LRC na SRT: presuňte súbor, vyberte SRT, stiahnite si ho. Koncové časy sa automaticky doplnia z nasledujúceho riadku.",
   "ctaText": "Konvertovať LRC → SRT"
  },
  "body": [
   {
    "h2": "Ako sa LRC líši od SRT",
    "ps": [
     "LRC je formát textov piesní: každý riadok obsahuje iba čas „začiatku spevu“ vo formáte `[minúty:sekundy.stotiny]` a **žiadny koncový čas**; každá položka SRT potrebuje počiatočný aj koncový čas. Jadrom konverzie je teda doplnenie koncových časov."
    ],
    "img": {
     "file": "convert-upload-lrc",
     "alt": "Oblasť nahrávania: načítaný súbor LRC, rozpoznaný ako LRC",
     "cap": "Súbor s textom s časovými značkami [00:12.50] sa okamžite deteguje ako LRC"
    }
   },
   {
    "h2": "Ako sa dopĺňajú koncové časy",
    "ps": [
     "Pravidlo je jednoduché: **každý riadok trvá do začiatku nasledujúceho**; posledný riadok nemá žiadny „nasledujúci“, takže získava 3 sekundy. Časové značky LRC navyše obsahujú iba minúty a sekundy – žiadne hodiny – a pole minút sa neposúva ďalej (62:05 znamená 1 hodinu 2 minúty a 5 sekúnd), takže mimoriadne dlhé skladby, ako sú DJ mixy, sa načítavajú správne."
    ]
   },
   {
    "h2": "Ako prevádzať",
    "ps": [
     "Otvorte [[konvertor|/convert.html]], vložte súbor LRC, ako výstup vyberte **SRT - SubRip**, potom ho konvertujte a stiahnite. Užitočné pre hudobné videá a na vkladanie textov piesní ako titulkov do prehrávačov; exportovaný súbor SRT je možné opätovne konvertovať na VTT pre web."
    ]
   }
  ]
 },
 "make-bilingual-subtitles": {
  "seo": {
   "title": "Dva spôsoby, ako vytvoriť dvojjazyčné titulky – AI-SRTSub",
   "desc": "Dvojjazyčné titulky prichádzajú v dvoch formách: dva riadky v jednej položke alebo dve položky na rovnakej časovej osi. Výhody, nevýhody a spôsob prepínania. – AI-SRTSub",
   "h1": "Dva spôsoby, ako vytvoriť dvojjazyčné titulky",
   "intro": "Tisté isté dvojjazyčné titulky môžu skrývať dve úplne odlišné štruktúry. Naučte sa ich rozoznávať a tvorba, rozdeľovanie aj prevod vám pôjdu od ruky.",
   "ctaText": "Pracovať s dvojjazyčnými titulkami"
  },
  "body": [
   {
    "h2": "Ako vyzerajú tieto dve formy",
    "ps": [
     "**Forma B: dve položky na rovnakej časovej osi.** Jeden riadok dialógu sa stane dvoma samostatnými položkami titulkov s rovnakým časovaním – jedna anglická, jedna čínska –, ktoré sú vykreslené nad sebou. Toto je najbežnejší spôsob vytvárania dvojjazyčných titulkov ASS."
    ]
   },
   {
    "h2": "V čom každá z nich zaostáva",
    "ps": [
     "Slabou stránkou formy A je **detekcia**: rozdelenie stôp sa spolieha na systém písma, takže čínsko-anglické alebo japonsko-anglické páry sa oddelia na prvý pohľad, zatiaľ čo **kombinácie, ktoré zdieľajú rovnaké písmo** – angličtina plus francúzština alebo čínština plus japonské kandži –, sa nedajú rozlíšiť. Slabou stránkou formy B je **výroba**: obidve časové osi sa musia presne zhodovať a ručné zarovnávanie je únavné; niektoré prehrávače navyše zobrazujú obidve položky s rovnakou časovou osou naraz, čím zapĺňajú obrazovku. Zlaté pravidlo: pre hotové titulky určené divákom použite formu A; formu B použite vtedy, keď potrebujete stopy oddeliť na ďalšie spracovanie."
    ]
   },
   {
    "h2": "Dve cesty",
    "ps": [
     "**Vytvorenie dvojjazyčných titulkov z originálu**: použite nástroj [[Preklad titulkov pomocou AI|/translate.html]] a pri exporte vyberte možnosť „Dvojjazyčné · originál navrchu“ alebo „Dvojjazyčné · preklad navrchu“ – formu A získate priamo; výber formátu ASS ponúka aj dva rozvrhnutia: „poukladané nad sebou“ a „dva riadky naspodku“.",
     "**Zlúčenie dvoch stôp alebo prevod medzi formami**: použite nástroj [[Nástroj na odstránenie dvojjazyčných titulkov|/bilingual.html]] a jeho režim „zlúčiť do jednej dvojriadkovej položky“ – forma B na vstupe, forma A na výstupe; pri opačnom postupe režim „rozdeliť na dva súbory“ prijme formu A alebo B na vstupe a poskytne dve nezávislé stopy na výstupe."
    ],
    "img": {
     "file": "bilingual-modes",
     "alt": "Štyri režimy nástroja na úpravu dvojjazyčných titulkov; možnosť „zlúčiť do jednej dvojriadkovej položky“ spojí dve položky zdieľajúce rovnakú časovú os",
     "cap": "„Zlúčiť do jednej dvojriadkovej položky“: forma B sa stane formou A"
    }
   },
   {
    "h2": "Ktoré zariadenie ich pre prehrá",
    "ps": [
     "Webové prehrávače (HTML5 ``) a väčšina mobilných prehrávačov spracúva formu A spoľahlivejšie; desktopové prehrávače (VLC, mpv, PotPlayer) akceptujú obe a obidvom položkám s rovnakou časovou osou dokážu dokonca priradiť rôzne farby a pozície. V prípade pochybností exportujte formu A ako SRT – cestuje sa s ňou najlepšie. Informácie o samotných rozdieloch medzi formátmi nájdete v časti [[SRT, VTT alebo ASS: Ktorý by ste mali použiť?|/guides/subtitle-format-comparison.html]]."
    ],
    "img": {
     "file": "translate-export",
     "alt": "Možnosti dvojjazyčného štýlu v paneli exportu prekladacieho nástroja",
     "cap": "Vyberte poradia dvojjazyčných riadkov priamo pri exporte – jeden krok a je to hotové"
    }
   },
   {
    "h2": "Časté otázky",
    "ps": [
     "**Dvojjazyčné titulky vyzerajú natlačené – čo môžem robiť?** Upravte šírku riadku: panel exportu prekladacieho nástroja obsahuje nastavenie „šírka dvojjazyčného riadku“; užší riadok znamená menej znakov na položku a čistejšiu obrazovku.",
     "**Chcem iba jednu stopu.** Režim nástroja na úpravu stôp „ponechať iba originál / ponechať iba preklad“ to vyrieši jedným kliknutím, pozrite si časť [[Rozdelenie dvojjazyčných titulkov na dve stopy|/guides/split-bilingual-subtitles.html]]."
    ]
   }
  ]
 },
 "merge": {
  "seo": {
   "title": "Spájanie dvojjazyčných a štýlovo upravených titulkov – Spojiť, upraviť štýl, exportovať – AI-SRTSub",
   "desc": "Spojte dva súbory s titulkami do dvojjazyčnej stopky, upravte štýl existujúceho dvojjazyčného súboru alebo priraďte štýl jednojazyčnému: režimy párovania, šablóny ASS a VTT a výber formátu na export.",
   "h1": "Ako používať dvojjazyčné spájanie a titulky so špeciálnymi efektmi",
   "intro": "Skombinujte dva súbory s titulkami do jednej dvojjazyčnej stopy alebo upravte štýl titulkov priamo: písmo, farba, obrys a pozícia sú v režime „čo vidíte, to dostanete“ a náhľad presne zodpovedá exportu.",
   "ctaText": "Otvoriť nástroj na tvorbu titulkov so špeciálnymi efektmi"
  },
  "body": [
   {
    "h2": "Čo tento nástroj robí",
    "ps": [
     "Táto jedna stránka vlastne pokrýva tri úlohy: spájanie originálneho a preloženého súboru s titulkami do jedného dvojjazyčného súboru, úpravu poradia a štýlu súboru, ktorý je už dvojjazyčný, a pridávanie špeciálnych efektov do jednojazyčného súboru. Všetky tri zdieľajú rovnaké parametre štýlu a rovnaký náhľad."
    ]
   },
   {
    "h2": "Tri úlohy, jedna stránka",
    "ps": [
     "Horná časť stránky obsahuje tri karty: **Spojiť dva súbory**, **Upraviť dvojjazyčný súbor**, **Jednojazyčný súbor**. Vaša voľba určí, koľko vstupných stĺpcov sa zobrazí vľavo.",
     "Pri spájaní dvoch súborov má ľavá strana dva stĺpce, „1 Pôvodné titulky“ a „2 Preložené titulky“; každý akceptuje nahraný súbor alebo priamo vopred vložený text. Úprava dvojjazyčného súboru a štýlovanie jednojazyčného súboru vyžadujú každý iba jeden stĺpec."
    ],
    "img": {
     "file": "merge-mode",
     "alt": "Tri karty v hornej časti nástroja na tvorbu titulkov so špeciálnymi efektmi a vstupná oblasť vľavo",
     "cap": "Tri karty hore; výber možnosti „Spojiť dva súbory“ vyvolá zobrazenie pôvodného a preloženého stĺpca vľavo"
    }
   },
   {
    "h2": "Ako sa dva súbory párujú",
    "ps": [
     "Prvá položka v časti „3 Nastavenia spájania“ je režim párovania: **Páriť podľa poradia · použiť pôvodnú časovú os**, **Páriť podľa časovej osi · použiť pôvodnú časovú os**, **Páriť podľa poradia · použiť preloženú časovú os**.",
     "Keď majú oba súbory rovnaký počet položiek v rovnakom poradí, párovanie podľa poradia je najbezpečnejšie. Keď sa počty líšia (jedna strana zlúčila položky, druhá ich rozdelila), spárujte ich podľa časovej osi a nechajte nástroj vyhľadávať zhody podľa blízkosti. To, čiu časovú os použiť, závisí od toho, ktorý súbor je presnejší – zvyčajne originál.",
     "Pod tým sa nachádza štruktúra textu (automatická detekcia / dva riadky na položku / striedajúce sa páry) a poradie (originál navrchu / preklad navrchu)."
    ],
    "img": {
     "file": "merge-pair",
     "alt": "Možnosti režimu párovania, štruktúry textu a poradia v nastaveniach spájania",
     "cap": "Režim párovania rozhoduje o tom, ktorý riadok patrí ku ktorému, a tu sa nastavuje aj to, čiu časovú os použiť"
    }
   },
   {
    "h2": "Úprava štýlu položka po položke",
    "ps": [
     "Panel štýlov sa nachádza vpravo. Pri exporte formátu ASS sa uplatní blok „Vzhľad ASS“: rozloženie (rozdelené · oddelené hore a dole / usporiadané nad sebou · dva riadky dole), veľkosť, farba, nepriehľadnosť, písmo, tučné, kurzíva, medzery medzi písmenami, obrys, farba obrysu, tieň/pozadie (žiadne / tieň / pozadie), hĺbka, farba okraja, nepriehľadnosť okraja, horizontálne zarovnanie (dole a vľavo / dole a v strede / dole a vpravo) a vzdialenosť od spodnej časti prekladu (primárny riadok), plus písmo, tieň/pozadie a ľavý/pravý okraj originálu (sekundárny riadok).",
     "Pri exporte štýlovania pre dvojjazyčný VTT sa uplatní blok „Štýl WebVTT“: okrem šiestich predvolieb (štandardný / kompaktný / filmový / horný / prístupný / portrétový) môžete zmeniť vertikálny riadok, kotvu (dole / hore / v strede), horizontálnu pozíciu, veľkosť šírky, hodnotu zarovnania a výšku riadku celého cue, plus farbu pozadia, nepriehľadnosť pozadia a šírku obrysu prekladového riadku; pôvodný riadok môže zdediť hlavný štýl alebo byť nastavený samostatne.",
     "Po dokončení môžete výsledok uložiť ako predvoľbu a neskôr ho znova použiť tak, že ho vyberiete v časti „Z uložených predvolieb“ a kliknete na tlačidlo „Použiť“."
    ],
    "img": {
     "file": "merge-style",
     "alt": "Parametre panela vzhľadu ASS vpravo",
     "cap": "Veľkosť, farba, obrys, tieň/pozadie a zarovnanie sú plne nastaviteľné a výsledok možno uložiť ako predvoľbu"
    }
   },
   {
    "h2": "Kontrola náhľadu pred exportom",
    "ps": [
     "„Náhľad spájania“ je tabuľka: #, čas, originál, preklad, štýl. Panel nad ňou filtruje podozrivé riadky podľa kategórií „obsahuje zvukové efekty“, „obsahuje predponu rečníka“, „kratšie ako 1 sekunda“, „viac ako dva riadky“ a „prekročená rýchlosť čítania“ alebo pomocou vami zadaného kľúčového slova.",
     "Kliknutie na slot štýlu v riadku rozbalí editor daného slotu a zobrazí iba tie riadky, ktoré ho používajú; možnosť „Vymazať všetky prepísania“ vráti každé manuálne prepísanie späť na šablónu. Oblasť úpravy časovej osi nižšie spravuje globálny posun (z daného cue) a proporčnú mierku.",
     "Keď všetko vyzerá správne, prejdite na časť „4 Export“: stiahnite súbor s titulkami alebo skopírujte jeho obsah."
    ],
    "img": {
     "file": "merge-preview",
     "alt": "Tabuľka náhľadu spájania a jej panel filtrov",
     "cap": "Náhľad je samotným exportom; filtrujte podozrivé riadky podľa typu alebo rozbaľte jediný slot štýlu"
    }
   },
   {
    "h2": "Čo zostáva nedotknuté",
    "ps": [
     "Úprava štýlu mení iba vzhľad, nikdy nie samotné dialógy. Text originálu a prekladu sa počas spájania nezmení ani o jediný znak; pokiaľ to zámerne nezmeníte v oblasti úprav pod náhľadom, časová os pochádza zo súboru, ktorý ste vybrali.",
     "Pri exporte formátu SRT alebo „VTT bez štýlovania“ sa do súboru nezapisujú žiadne informácie o štýle – stránka vás upozorní, že formát VTT neobsahuje blok STYLE a prehrávač použije svoj predvolený vzhľad. Ak chcete štýlovanie, vyberte štýlovanie pre dvojjazyčný VTT alebo ASS."
    ]
   },
   {
    "h2": "Často kladené otázky",
    "ps": [
     "**Čo ak majú dva súbory rôzny počet položiek?** Použite možnosť „Páriť podľa časovej osi“ a nástroj vyhľadá zhody podľa blízkosti; položky, ktoré nedokáže priradiť, si nevymýšľa.",
     "**Čo ak prehrávač ignoruje štýlovanie v exportovanom súbore ASS?** Štýly sú uložené vo vnútri súboru, ale podpora formátu ASS v prehrávačoch sa líši. Ak potrebujete prenosnejší vzhľad, exportujte štýlovanie pre dvojjazyčný VTT.",
     "**Ako sa dostanem späť k počiatočnej šablóne, keď ju pokazím?** Možnosti „Obnoviť predvolené parametre“ v bloke ASS a „Obnoviť predvolené nastavenia šablóny“ v bloke VTT resetujú každá svoju vlastnú sekciu.",
     "**Čo predstavuje sedem riadkov v ukážke?** Ide o vstavaný príklad, ktorý slúži len na to, aby ste videli, ako vyzerá spájanie; ukážka sa nedá exportovať. Nahrajte vlastné titulky, kliknite na náhľad spájania a ukážka sa automaticky nahradí."
    ]
   },
   {
    "h2": "Ochrana súkromia",
    "ps": [
     "Titulky sa spracúvajú výlučne v prehliadači: nič sa nenahráva na server a nič cezň neprechádza. Zatvorte prehliadač a všetko z danej relácie je preč."
    ]
   },
   {
    "h2": "Súvisiace nástroje a príručky",
    "ps": [
     "Ak chcete rozdeliť dvojjazyčný súbor späť na dve stopy, použite [[Rozdelenie dvojjazyčných titulkov|/bilingual.html]]; ak chcete postupovať opačne a premeniť jednojazyčný súbor na dvojjazyčný, prečítajte si článok [[Dva spôsoby vytvárania dvojjazyčných titulkov|/guides/make-bilingual-subtitles.html]]; výsledok skontrolujte pomocou nástroja [[Kontrola kvality titulkov|/qc.html]]; pre celú sezónu naraz použite [[Hromadná konverzia|/batch.html]]."
    ]
   }
  ]
 },
 "qc": {
  "seo": {
   "title": "Ako používať kontrolu kvality titulkov – Časová os a kontrola rozloženia – AI-SRTSub",
   "desc": "Kontrola kvality titulkov: 17 pravidiel odhaľuje prekrývanie, šírku riadkov, rýchlosť čítania a interpunkciu pre 27 jazykov. Polovica opráv jedným kliknutím; stiahnite si správu.",
   "h1": "Ako používať kontrolu kvality titulkov",
   "intro": "Pred odovzdaním titulkov ich skontrolujte na stránke kontroly kvality z hľadiska načasovania a rozloženia: čo sa kontroluje, ako čítať správu a ktoré problémy možno vyriešiť jedným kliknutím – to všetko nájdete tu.",
   "ctaText": "Otvoriť kontrolu kvality titulkov"
  },
  "body": [
   {
    "h2": "Na čo tento nástroj slúži",
    "ps": [
     "Titulky, ktoré voľným okom vyzerajú v poriadku, majú po dodaní často prekrývajúce sa časové osi, príliš široké riadky alebo príliš vysokú rýchlosť čítania. Stránka kontroly kvality tieto problémy vypisuje jeden po druhom:"
    ]
   },
   {
    "h2": "Najprv vyberte pravidlá jazyka",
    "ps": [
     "V časti „Kontrolovať podľa pravidiel jazyka“ nastavíte päť prahových hodnôt: **maximálna šírka jedného riadku** (predvolene 42 jednotiek polovičnej šírky pre šírku, 36 pre štvorec, 28 pre výšku), **limit rýchlosti čítania** (18 jednotiek šírky za sekundu pre čínštinu, japončinu a kórejčinu, 20 pre ostatné jazyky), **minimálne trvanie 833 milisekúnd**, **maximálne trvanie 7000 milisekúnd** a **najviac 2 riadky**. Jazyk titulkov nastavte na automatickú detekciu alebo vyberte jeden z 27 manuálne; orientácia obrazovky mení iba úroveň šírky riadku – rýchlosť čítania, trvanie a počet riadkov zostávajú tak, ako sú. Jednotky polovičnej šírky sú spoločnýou mierou: jeden znak hanzi sa počítaj ako 2, jedno písmeno latinky ako 1 – šírka riadku 42 sa rovná 21 znakom hanzi alebo 42 písmenám."
    ],
    "img": {
     "file": "qc-rules",
     "alt": "Nastavenia kontroly kvality: päť vstupných polí pre prahové hodnoty a rozbaľovacie ponuky pre jazyk titulkov a orientáciu obrazovky",
     "cap": "Päť prahových hodnôt + jazyk + orientácia; predvolené hodnoty zodpovedajú bežnej praxi v odvetví"
    }
   },
   {
    "h2": "Čítanie správy",
    "ps": [
     "Správa so 17 pravidlami uvádza zistenia na troch úrovniach: **chyby** (poškodený text, formát časovej pečiatky, koniec skôr než začiatok, poškodené číslovanie), **varovania** (prázdne položky, prekrývania, príliš krátke alebo príliš dlhé trvanie, rýchlosť čítania nad limit, príliš široké riadky, viac ako dva riadky) a **poznámky** (pozícia zalomenia riadku, úvodné alebo koncové medzery, chýbajúce medzery, interpunkčné normy a ďalšie). Každé zistenie obsahuje číslo položky a detail „namerané X, prahová hodnota Y“ a zoznam možno filtrovať podľa úrovne. Dvojjazyčné položky získavajú výnimky: oba formáty sa detegujú automaticky, kontroly prekrývania oslobodzujú celý pár a rýchlosť čítania počítat len riadok napísaný v cieľovom jazyku."
    ],
    "img": {
     "file": "qc-report",
     "alt": "Oblasť správy kontroly kvality: zistenia zoskupené podľa chýb, varovaní a poznámok, každé s číslom položky a nameranou hodnotou",
     "cap": "Trojúrovňová správa: každé zistenie obsahuje svoje číslo položky a namerané/prahové hodnoty"
    }
   },
   {
    "h2": "Oprava a export",
    "ps": [
     "Karta „Opraviť a exportovať“ zoznamuje iba **automaticky opraviteľné** položky: opätovné zalamovanie, odstránenie prázdnych položiek, pridanie chýbajúcich medzier, nahradenie interpunkcie podľa jazykových noriem, prečíslovanie – všetko, čo ponecháva načasovanie nedotknuté, je predvolene začiarknuté; **položky, ktoré menia načasovanie** (výmena začiatku a konca, posunutie prekrývaní, orezanie alebo natiahnutie trvania) sú predvolene nezačiarknuté – začiarknite ich po vlastnom overení dopadu. Kliknite na „Použiť opravy“ a automaticky sa spustí nová kontrola; počítadlo počíta iba to, čo bolo skutočne opravené – riadky, ktoré nebolo možné znova zaimtovať, sa do čísel nezapočítavajú. **Rýchlosť čítania nad limit nemá žiadnu automatickú opravu**: stroj nevie, ktoré slovo vystrihnúť, takže preklad je nutné skrátiť ručne alebo upraviť načasovanie. Po oprave exportujte formát SRT alebo VTT, prípadne kliknite na „Stiahnuť správu“ a uložte správu vo formáte obyčajného textu `.qc.txt`."
    ],
    "img": {
     "file": "qc-fix",
     "alt": "Karta opráv: začiarkavacie políčka pre automaticky opraviteľné položky a tlačidlo Použiť opravy",
     "cap": "Do zoznamu sa dostávajú iba položky, ktoré sa dajú automaticky opraviť; opravy meniace načasovanie sú predvolene nezačiarknuté"
    }
   },
   {
    "h2": "Často kladené otázky",
    "ps": [
     "**Prečo sa môj súbor ASS nedá exportovať?** Kontrola kvality exportuje iba formáty SRT a VTT; formát ASS vstupuje dnu, ale nevychádza von. Ak chcete zachovať efekty ASS, najprv si to premyslite v nástroji [[Konvertor formátov|/convert.html]].",
     "**Čo znamená rýchlosť čítania 18?** Pre čínštinu, japončinu a kórejčinu je limit 9 celošírkových znakov za sekundu (18 jednotiek polovičnej šírky); ostatné jazyky dostávajú 20 jednotiek polovičnej šírky za sekundu. Toto sú bežné úrovne pohodlia a vstupné pole vám umožňuje ich zmeniť.",
     "**Kódovanie môjho súboru je poškodené – dá sa stále skontrolovať?** Kontrola kvality číta iba formát UTF-8; kódovanie najprv opravte na stránke opráv poškodeného textu.",
     "**Dotkne sa to mojej časovej osi?** Pokiaľ necháte skupinu „mení načasovanie“ nezačiarknutú, tak nie; aj keď je začiarknutá, každá zmena je pred použitím opravy podrobne popísaná."
    ]
   },
   {
    "h2": "Súvisiace príručky",
    "ps": [
     "Titulky preblikávajú príliš rýchlo na prečítanie – pozrite si špeciálnu príručku [[Titulky sú príliš rýchle na prečítanie|/guides/subtitle-too-fast.html]]. Čo skontrolovať pred odovzdaním – kontrolný zoznam nájdete na adrese [[Čo skontrolovať pred odovzdaním|/guides/subtitle-quality-check.html]]. Časová os, ktorá sa rozsynchronizuje, je iný druh problému – pozrite si tému [[Titulky strácajú synchronizáciu|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "remove-subtitle-ads": {
  "seo": {
   "title": "Odstránenie reklám a vodoznakov z titulkov – AI-SRTSub",
   "desc": "Odstráňte vodoznaky a reklamy z titulkov: URL adresy, kredity fansubov a štítky encoded by sa vymažú jedným kliknutím, spolu s duplicitnými a prázdnymi položkami. – AI-SRTSub",
   "h1": "Odstránenie reklám a vodoznakov z titulkov",
   "intro": "URL adresy, kredity a reklamné položky skryté v titulkoch vymaže nástroj na čistenie jedným prechodom pomocou pravidiel pre vodoznaky – a prípadné nesprávne vymazanie možno vrátiť položku po položke.",
   "ctaText": "Vyčistiť vodoznaky v titulkoch"
  },
  "body": [
   {
    "h2": "Čo sú tieto vodoznaky zač",
    "ps": [
     "Titulky stiahnuté z internetu často obsahujú ďalšie položky na začiatku alebo na konci (niekedy aj v strede): URL adresy, e-mailové adresy, názvy fansubových skupín, kredity `encoded by` / `translated by`, názvy stránok ako opensubtitles a riadky ako „sledujte náš účet na WeChat“ alebo „len na študijné účely“. Sú to normálne položky titulkov – s časovou osou, zaberajúce riadok –, takže ich prehrávače nedokážu odstrániť; musia byť detegované na základe obsahu."
    ]
   },
   {
    "h2": "Kde to urobiť",
    "ps": [
     "Otvorte [[Nástroj na čistenie titulkov|/clean.html]] a vložte svoje titulky; skupina „Vodoznaky a zbytočné položky“ má už predvolene začiarknuté možnosti „Odstrániť vodoznaky a reklamy“, „Odstrániť duplicitné položky“ a „Odstrániť prázdne položky“ a čistenie sa spustí automaticky. Detekcia funguje na dvoch úrovniach: **tvrdé signály**, ako sú URL adresy, e-maily, fansubové skupiny a názvy stránok, vymažú celú položku pri zhode akejkoľvek dĺžky; **mäkké signály**, ako sú @koncovky, kredity „encoded“ alebo „proofread“, sa posudzujú iba v krátkych položkách s maximálne 40 znakmi, aby sa predišlo orezaniu dlhých dialógov. Z dvojjazyčných položiek sa najskôr riadok po riadku odstránia riadky s vodoznakmi, pričom riadky dialógov zostávajú zachované; položka sa vymaže celá iba vtedy, ak po odstránení zostanú stopy vodoznaku."
    ],
    "img": {
     "file": "clean-opts",
     "alt": "Obrazovka s možnosťami čistenia: tri začiarkavacie políčka skupiny vodoznakov a zbytočných položiek",
     "cap": "Skupina „Vodoznaky a zbytočné položky“ je predvolene zapnutá – nevyžaduje sa žiadne manuálne nastavenie"
    }
   },
   {
    "h2": "Kontrola a export",
    "ps": [
     "V zozname zmien má každá vymazaná položka štítok „vodoznak a reklama“ – prejdite si ho, aby ste sa uistili, že nič nebolo odstránené omylom; ak sa niektorá položka zdá nesprávna, kliknutím na tlačidlo „Obnoviť“ ju vrátite späť. Po potvrdení súbor stiahnite: názov súboru automaticky dostane značku `.clean`. Čistenie prebieha lokálne vo vašom prehliadači; vaše titulky sa nikdy nikam neodosielajú."
    ]
   }
  ]
 },
 "repair": {
  "seo": {
   "title": "Ako opraviť poškodené (mojibake) titulky – Zistenie kódovania – AI-SRTSub",
   "desc": "Návod: zistite pôvodné kódovanie (GBK / Big5 / Shift_JIS / EUC-KR), usporiadajte opravy podľa toho, čo najviac pripomína jazyk, a uložte súbor ako UTF-8 s BOM alebo GBK. Časovanie a indexové čísla sa nikdy nemenia.",
   "h1": "Ako opraviť poškodené titulky (mojibake)",
   "intro": "Súbor s titulkami plný skomolených znakov je zriedka poškodený – bol iba prečítaný so správnym kódovaním. Nástroj na opravu zistí pôvodné kódovanie a vráti správne znaky, pričom indexové čísla a časovanie ponechá tak, ako sú.",
   "ctaText": "Otvoriť nástroj na opravu poškodených titulkov"
  },
  "body": [
   {
    "h2": "Čo tento nástroj robí",
    "ps": [
     "Rovnaké bajty prečítané ako UTF-8 a prečítané ako GBK produkujú dve úplne odlišné sady znakov – súbor nie je poškodený, bol iba dekódovaný s nesprávnym kódovaním. Tu je to, čo nástroj na opravu robí:"
    ]
   },
   {
    "h2": "Súbor nahrajte, nevkladajte ho kopírovaním",
    "ps": [
     "Tieto dva vstupné body dokážu opraviť rôzny rozsah poškodenia, takže **ak môžete, súbor nahrajte**. Súborom sa zachovajú pôvodné bajty: nástroj skúša jedno kódovanie za druhým a akonáhle rozpozná GBK, dekóduje ho ako GBK – nič netreba tipovať. Text vložený kopírovaním už nie je v surových bajtoch. V čase, keď prehliadač odovzdá reťazec, chyba sa už stala, takže nástroj môže pracovať iba spätne a vziať to, čo dostane.",
     "Ak vložený text už obsahuje náhradný znak (tento ohrámovaný otáznik ``), pôvodné bajty sú nenávratne preč a nič ich nedokáže vrátiť späť. Stránka to hovorí otvorene: vráťte sa hore a použite možnosť „Vybrať súbor“ na nahranie originálu."
    ],
    "img": {
     "file": "repair-up",
     "alt": "Oblasť nahrania na stránke opráva: zóna na presunutie a pole na vkladanie, pričom zistené kódovanie sa zobrazi navrchu",
     "cap": "Presuňte súbor dovnútra alebo ho vyhľadajte; pole na vkladanie sa nachádza dole a dokáže opraviť oveľa menej"
    }
   },
   {
    "h2": "Čo vám hovorí diagnóza",
    "ps": [
     "Po nahraní poskytne diagnostická karta verdikt. **Nenašli sa žiadne poškodené znaky**: obsah je čitateľný tak, ako je; ak váš prehrávač stále zobrazuje skomolené znaky, prehrávač použil nesprávne kódovanie – prejdite na „Uložiť ako“, vyberte iné a dajte mu tento súbor. Keď to **vyzýva ako poškodený text**, karta vypíše, akú stopu našla:"
    ],
    "img": {
     "file": "repair-diag",
     "alt": "Diagnostická karta: verdikt plus každá stopa poškodenia uvedená riadok po riadku",
     "cap": "Diagnostika uvádza stopy podľa typu namiesto jednoduchého konštatovania „je to poškodené“"
    }
   },
   {
    "h2": "Ako sú kandidáti zoradení a ako si vybrať",
    "ps": [
     "V časti „Spôsoby opravy“ sú kandidáti zoznamovaní v poradí **najviac podobné skutočnému jazyku**, až do 12 položiek, pričom každá je označená párom kódovaní, z ktorého a do ktorého sa čítalo. Kliknutím na niektorého z nich uvidíte, ako to vyzerá, vyberte ho a potom prejdite dole a uložte ho. Nie ste spokojní? Pomocou možnosti „Ponechať tak, ako je“ sa vrátite k originálu.",
     "Poradie vychádza zo skóre: podiel bežných znakov, reťazce akcentov, reťazce symbolov, steny nejasných znakov, pričom všetko je zohľadnené. **Ak žiadne skóre nie je jednoznačne lepšie, nič sa neodporúča** – nebude vám vnucovať polovične vierohodného kandidáta len preto, aby nejakého malo. Text, ktorý bol skomolený dvakrát (raz zle uložený, potom raz zle opravený), dostáva jedno kolo spätného riešenia navyše u najlepších kandidátov, takže všetko v rámci dvoch vrstiev sa dá ešte zachrániť."
    ],
    "img": {
     "file": "repair-fix",
     "alt": "Zoznam kandidátov na opravu zoradený podľa toho, do akej miery sa podobá na skutočný jazyk, pričom každý je označený svojím párom kódovania",
     "cap": "Kandidáti zoradení podľa „najviac podobné skutočnému jazyku“, pričom každý zobrazuje príslušné kódovania"
    }
   },
   {
    "h2": "Správne uloženie je posledný krok",
    "ps": [
     "Opravený výsledok je stále nutné správne uložiť. Keď prehrávač nedokáže detegovať kódovanie UTF-8, uloženie ako **UTF-8 s BOM** (prehrávače pre Windows sa spoliehajú na BOM) alebo ako **GBK** to zvyčajne vyrieši. Môžete uložiť ako UTF-8, UTF-8 (s BOM), GBK, Big5, Shift_JIS alebo EUC-KR; ak niečo nesedí, budete vyzvaní na výber iného (GBK nevie obsiahnuť kórejčinu). Stiahnuté súbory dostanú do názvu pridanú príponu `-fixed`.",
     "Keď zistené kódovanie nie je UTF-8, možnosť „Uložiť ako“ je pre vás už predvolená na UTF-8 s BOM. Ak sa rozbaľovacej ponuky dotknete sami, prestane za vás hádať."
    ],
    "img": {
     "file": "repair-out",
     "alt": "Oblasť výsledkov: textové pole s rozbaľovacou ponukou uloženia ako a tlačidlom na stiahnutie",
     "cap": "Vyberte kódovanie a potom stiahnite – k názvu súboru sa pridá -fixed"
    }
   },
   {
    "h2": "Čo sa nikdy nemení",
    "ps": [
     "Nahrádzajú sa iba nesprávne prečítané znaky. Indexové čísla, časovanie a riadky štýlov ASS sa žiadnym spôsobom nemenia."
    ]
   },
   {
    "h2": "Často kladené otázky",
    "ps": [
     "**Súbor som nahral, tak prečo ho musím znova ukladať?** Samotný súbor je zvyčajne v poriadku; pokazené je to, že ho prehrávač číta s nesprávnym kódovaním. V takom prípade netreba v texte meniť ani jeden znak – stačí uložiť kópiu ako UTF-8 s BOM alebo GBK a dať ju prehrávaču.",
     "**Prečo sa vložený text nedá opraviť?** Akonáhle sa v vloženom obsahu objaví náhradný znak, pôvodné bajty sú preč a nie je z čoho vyvodzovať závery. Vráťte sa hore a použite možnosť „Vybrať súbor“ na nahranie originálu.",
     "**Kandidát, ktorého chcem, nie je v zozname?** Neodporúča sa nič, pokiaľ to nemá jednoznačne lepšie skóre ako to, čo už máte. Skúste zmeniť zistené kódovanie na iné a nechajte ho prepočítať poradie.",
     "**Koľko súborov naraz?** Jeden po druhom. Stiahnite opravu a potom nahrajte ďalší súbor."
    ]
   },
   {
    "h2": "Ochrana súkromia",
    "ps": [
     "Detekcia a oprava prebiehajú výlučne vo vašom prehliadači. Žiadny obsah titulkov sa nikdy neodosiela na server."
    ]
   },
   {
    "h2": "Súvisiace nástroje a príručky",
    "ps": [
     "Odkiaľ pochádzajú poškodené titulky a prečo takto vyzerajú – pozrite si tému [[Odkiaľ pochádzajú poškodené titulky|/guides/subtitle-garbled-characters.html]]; kódovanie je v poriadku, ale obsah je nečistý – použite [[Čistenie titulkov|/clean.html]]; na kontrolu časovania a rýchlosti čítania – [[Kontrola kvality titulkov|/qc.html]]."
    ]
   }
  ]
 },
 "sbv-to-srt": {
  "seo": {
   "title": "Konvertor SBV na SRT – Konverzia titulkov z YouTube – AI-SRTSub",
   "desc": "Konvertujte titulky SBV stiahnuté z YouTube do formátu SRT pre aplikácie CapCut, Premiere a prehrávače. Hodnoty časovania zostávajú nedotknuté – mení sa iba rozloženie. Beží vo vašom prehliadači.",
   "h1": "SBV na SRT",
   "intro": "Premeňte titulky SBV z YouTube na SRT: presuňte súbor, vyberte SRT, stiahnite. Hodnoty časovania sú nedotknuté – mení sa iba štruktúra.",
   "ctaText": "Konvertovať SBV → SRT"
  },
  "body": [
   {
    "h2": "Čo je SBV a odkiaľ pochádza",
    "ps": [
     "SBV je **formát titulkov služby YouTube**: sťahovanie „súborov titulkov“ z YouTube vám často prinesie súbor s príponou .sbv. Jeho štruktúra je jednoduchšia ako pri SRT – čas začiatku a konca sa nachádza na **jednom riadku** oddelený čiarkami, text nasleduje priamo pod ním a chýbajú v ňom čísla titulkov."
    ]
   },
   {
    "h2": "Prečo ho prehrávače odmietajú",
    "ps": [
     "Mimo samotného YouTube väčšina editačného softvéru a prehrávačov SBV nepodporuje. Chýba mu blok číslovania a riadok časovania zapisuje inak ako SRT, takže premenovanie prípony nič nevyrieši – štruktúru treba od základu prebudovať."
    ],
    "img": {
     "file": "convert-upload-sbv",
     "alt": "Oblasť nahrania: nahraný súbor SBV detegovaný ako SBV",
     "cap": "SBV sa deteguje v pôvodnom stave, premenovanie prípony nie je potrebné"
    }
   },
   {
    "h2": "Ako konvertovať",
    "ps": [
     "Otvorte [[konvertor|/convert.html]], vložte súbor SBV, ako výstup vyberte **SRT – SubRip**, potom konvertujte a stiahnite. Čísla titulkov sa priradia nanovo a pôvodné zalomenia riadkov v rámci titulku sa spoja do jedného riadku (SRT umožňuje viacriadkové titulky; SBV sa tu exportuje ako jednoriadkové)."
    ]
   }
  ]
 },
 "shift": {
  "seo": {
   "title": "Ako posunúť časovanie titulkov (posun, mierka, dva body) – AI-SRTSub",
   "desc": "Ilustrovaný sprievodca editorom časovania: nahranie titulkov, pridanie krokov úpravy, korekcia podľa dvoch bodov, úpravy jednotlivých blokov a export.",
   "h1": "Editor časovania: Podrobný sprievodca",
   "intro": "Tento sprievodca vás prevedie nástrojom od začiatku do konca: nahranie titulkov, pridanie krokov úpravy, spustenie kontrol, jemné doladenie jednotlivých blokov a export.",
   "ctaText": "Otvoriť editor časovania"
  },
  "body": [
   {
    "h2": "Nahrajte svoje titulky",
    "ps": [
     "Presuňte súbor do prerušovaného políčka alebo kliknite a vyberte ho; obsah môžete tiež **prilepiť priamo** do textového poľa. Formát sa deteguje z prípony aj obsahu a výsledok sa zobrazí v značke formátu. Podporované vstupy: srt, vtt, ass (vrátane ssa), sbv, lrc a txt."
    ],
    "img": {
     "file": "shift-upload",
     "alt": "Oblasť nahratia: ukážkové titulky sú nahraté a detegované ako SRT",
     "cap": "Názov súboru a zistený formát sa zjavia pod oblasťou presunutia; textové pole zostáva upraviteľné."
    }
   },
   {
    "h2": "Pridanie krokov úpravy",
    "ps": [
     "Úpravy tvoria **postupnosť krokov**: každý krok robí jednu vec a berie jedno číslo, pričom jeho jednotka je zobrazená vnútri poľa. Kroky sa aplikujú zhora nadol a zmena ktoréhokoľvek kroku **všetko prepočíta z pôvodných titulkov** – takže sa môžete kedykoľvek vrátiť a upraviť číslo bez toho, aby ste niečo pokazili."
    ]
   },
   {
    "h2": "Korekcia podľa dvoch bodov",
    "ps": [
     "Keď nepoznáte posun v sekundách ani pomer, použite dva body: po pridaní sa **dve polia „aktuálne“ vyplnia automaticky** z prvého a posledného bloku vášho súboru. Vy vyplníte iba „cieľové“ polia – časy, kedy by sa tieto bloky mali skutočne objaviť. Všetko medzi nimi sa úmerne prerozdelí."
    ],
    "img": {
     "file": "shift-step-two",
     "alt": "Korekcia podľa dvoch bodov: aktuálne časy sú vyplnené automaticky, zadávajú sa cieľové časy",
     "cap": "Aktuálne polia pochádzajú z vášho súboru; cieľové polia sú správne časy, ktoré vidíte vo videu."
    }
   },
   {
    "h2": "Kontrola časovej osi a úpravy jednotlivých blokov",
    "ps": [
     "Po spustení krokov si prečítajte **kontrolu časovej osi**: príliš krátke, príliš dlhé alebo príliš husté bloky na čítanie, príliš široké riadky alebo prekrývajúce sa bloky – to všetko sa vypíše. Kontrola **iba označuje problémy a nič sama nemení**. Štyri predvolené pravítka sú: minimálna dĺžka 0,833 s, maximálna 7 s, rýchlosť čítania 9 znakov za sekundu a 21 znakov na riadok – všetky sú na stránke upraviteľné. Pod tým vám úpravy jednotlivých blokov umožňujú zlúčiť dva susedné bloky, rozdeliť jeden alebo priamo upraviť jeho začiatok a koniec; každú úpravu možno vrátiť späť."
    ]
   },
   {
    "h2": "Export výsledku",
    "ps": [
     "Panel s výsledkami zobrazuje pôvodné a upravené časy **vedľa seba** pre jednoduchú letmú kontrolu. Výstupný formát sa predvolene zhoduje so vstupným formátom, pred stiahnutím však môžete prepnúť na ktorýkoľvek formát: srt, vtt, ass, sbv, lrc alebo txt."
    ],
    "img": {
     "file": "shift-result",
     "alt": "Panel s výsledkami: časy pred a po vedľa seba, s tlačidlami na stiahnutie a kopírovanie",
     "cap": "Pôvodné časy vľavo, upravené vpravo; po vizuálnej kontrole súbor stiahnite."
    }
   }
  ]
 },
 "shift-subtitle-timing": {
  "seo": {
   "title": "Ako posunúť všetky titulky skôr alebo neskôr – AI-SRTSub",
   "desc": "Každý blok mešká o rovnaký čas: použite krok posunu v editore časovania — zadajte jedno záporné alebo kladné číslo a všetky bloky sa posunú naraz.",
   "h1": "Posunutie celého súboru titulkov skôr alebo neskôr",
   "intro": "Zvuk začne hrať, titulky sa objavia neskôr – a každý jeden blok mešká o rovnaký čas. Ide o rovnomerný posun: vyrieši ho jediné číslo.",
   "ctaText": "Otvoriť editor časovania"
  },
  "body": [
   {
    "h2": "Najprv overte, či každý blok mešká o rovnaký čas",
    "ps": [
     "Skontrolujte jeden blok blízko začiatku, jeden v strede a jeden na konci. Ak všetky tri meškajú o približne rovnaký čas, ide o **rovnomerný posun** a vyrieši ho jeden krok posunu. Ak je začiatok správny a nesúlad sa smerom ku koncu zväčšuje, ide o iný problém – pozrite si [[subtitles getting more and more out of sync|/guides/subtitles-out-of-sync.html]]."
    ]
   },
   {
    "h2": "Čo zadať: záporné číslo na posunutie dopredu, kladné na oneskorenie",
    "ps": [
     "V editore časovania pridajte krok **Posunúť všetko** a do poľa hodnoty zadajte posun: titulky, ktoré meškajú, vyžadujú záporné číslo, aby sa posunuli skôr; ak sú príliš skoro, vyžadujú kladné číslo, aby sa posunuli neskôr. Ak titulky meškajú 1,5 sekundy, zadajte **-1.5** – jednotkou sú sekundy."
    ],
    "img": {
     "file": "shift-step-shift",
     "alt": "Krok posunu všetkého so zadanou hodnotou -1,5 sekundy",
     "cap": "Záporné číslo posunie celý súbor skôr; jednotka je napísaná vnútri poľa v sekundách."
    }
   },
   {
    "h2": "Spustite to a skontrolujte prvý blok",
    "ps": [
     "Po použití panel s výsledkami vypíše pôvodné a nové časy každého bloku **vedľa seba**. Najskôr skontrolujte prvý blok: padne nový čas začiatku na snímku, kde sa riadok vyslovuje? Potom skontrolujte jeden blok v strede. Každý blok sa posunie o rovnaký čas a zachová si svoje trvanie."
    ]
   },
   {
    "h2": "Exportovať",
    "ps": [
     "Keď je letmá kontrola v poriadku, súbor priamo stiahnite. Výstupný formát sa predvolene zhoduje so vstupným a dá sa prepnúť na iný. Zmena sa týka iba časov – ani jediný znak textu sa nezmení."
    ]
   }
  ]
 },
 "simplified-traditional-chinese": {
  "seo": {
   "title": "Nie je to zámena znakov – jedno-v-mnohom a regionálne slová – AI-SRTSub",
   "desc": "Tri veci, ktoré to sťažujú: jedno-v-mnohom mapovania vyriešené podľa slov, odlišná slovná zásoba na Taiwane a v Hongkongu a prevod iba dialógov. Zvládnite všetky tri a vyhnete sa ručným úpravám.",
   "h1": "Zjednodušená a tradičná čínština nie je len zámena znakov",
   "intro": "To, ktorý tradičný znak nahradí zjednodušený, závisí od znaku vedľa neho. Preto sa tento prevod nedá vykonať slepou zámenou jedného znaku naraz.",
   "ctaText": "Otvoriť prevodník"
  },
  "body": [
   {
    "h2": "Po prvé: jedna zjednodušená forma, niekoľko tradičných",
    "ps": [
     "Zjednodušenie zlúčilo niekoľko tradičných znakov do jednej zjednodušenej formy. Pri opačnom postupe jeden zjednodušený znak zodpovedá niekoľkým tradičným a výber medzi nimi závisí od toho, s čím sa spája:",
     "Výmena znak po znaku ich všetky spojí do toho istého a pokazí každý výskyt. Oddelenie **podľa slova** je to, čo ich rozlišuje – tabuľky pochádzajú z OpenCC a porovnávajú slová pred jednotlivými znakmi. Napríklad:"
    ]
   },
   {
    "h2": "Po druhé: Taiwan a Hongkong nie sú to isté",
    "ps": [
     "Po prevode do tradičnej čínštiny existuje ešte jedna vrstva: to isté slovo sa na Taiwane a v Hongkongu píše inak. Slovo pre „softvér“ je na Taiwane iné než v Hongkongu a Taiwan používa vlastné slovo pre „informácie“.",
     "Odtiaľ pochádzajú samostatné smery. Taiwanská tradičná čínština sa dokonca delí na „zmeniť slovnú zásobu“ a „iba glyfy“ – iba glyfy zachovávajú vašu existujúcu slovnú zásobu, zatiaľ čo zmena slovnej zásoby mení aj regionálne výrazy. Hongkong má svoj vlastný smer."
    ],
    "img": {
     "file": "hanconv-dir",
     "alt": "Karta Konvertovať na: rozbaľovacia ponuka cieľa zobrazuje „Zjednodušená → taiwanská tradičná (zmena slovnej zásoby)“",
     "cap": "Taiwan ponúka zmeny slovnej zásoby alebo iba glyfy; Hongkong má svoj vlastný smer"
    }
   },
   {
    "h2": "Po tretie: dotknúť sa treba iba dialógov",
    "ps": [
     "Súbor s titulkami nie sú len dialógy. Nachádzajú sa v ňom aj indexové čísla, načasovanie a riadky štýlov ASS, pričom ani jediný znak z nich by sa nemal prevádzať – najmä riadky štýlov ASS, pretože obsahujú anglické názvy direktív, ktoré sa v momente spracovania ako dialóg rozpadnú.",
     "Prevod preto prebieha až po analýze podľa formátu: SRT, VTT, ASS a TXT – každý identifikuje, ktorá časť je dialóg, a prevádzajú sa iba znaky vo vnútri. Načasovanie a štýly prežijú bez zmien, bez nutnosti prerábať formátovanie."
    ],
    "img": {
     "file": "hanconv-out",
     "alt": "Oblasť výsledkov: skonvertované titulky a stavový riadok zobrazujúci počet zmenených riadkov",
     "cap": "Stavový riadok ukazuje, koľko riadkov sa zmenilo; formátovanie zostáva zachované"
    }
   },
   {
    "h2": "Návrat k zjednodušenej čínštine: dajte si pozor",
    "ps": [
     "Prevod z tradičnej do zjednodušenej čínštiny taktiež vyžaduje, aby ste uviedli, **z ktorej tradičnej variety prichádzate**: všeobecná, taiwanská a hongkongská sú tri rôzne cesty, pretože regionálnu slovnú zásobu treba pred prevodom obnoviť na všeobecné slovo. Ak zvolíte nesprávny smer, regionálna slovná zásoba prežije do zjednodušeného výstupu.",
     "Spodná skupina deviatich smerov je tá, ktorá prevádza naspäť: tradičná → zjednodušená, taiwanská → zjednodušená, hongkongská → zjednodušená."
    ]
   },
   {
    "h2": "Súvisiace nástroje a príručky",
    "ps": [
     "Kompletný sprievodca – [[How to convert simplified and traditional subtitles|/guides/hanconv.html]]; ak potrebujete iba zjednodušenú na tradičnú – [[Convert simplified subtitles to traditional|/guides/srt-simplified-to-traditional.html]]; ak chcete preložiť do iného jazyka, [[Subtitle translation|/translate.html]]."
    ]
   }
  ]
 },
 "split": {
  "seo": {
   "title": "Rozdeľovanie a spájanie titulkov – Strih podľa blokov, reťazenie v poradí – AI-SRTSub",
   "desc": "Rozrežte jeden súbor na segmenty podľa trvania alebo počtu blokov, každý reštartujte od nuly, alebo reťazte viacero súborov v poradí či ich prekladajte podľa časovej osi. Čísla blokov prečíslované, text nedotknutý.",
   "h1": "Ako rozdeliť a spojiť titulky",
   "intro": "Rozrežte jeden dlhý súbor s titulkami na segmenty alebo spojte niekoľko roztrúsených súborov do jedného. Rez vždy padá na hranicu záznamu – veta sa nikdy nerozreže na polovicu.",
   "ctaText": "Otvoriť rozdeľovanie a spájanie"
  },
  "body": [
   {
    "h2": "Čo tento nástroj robí",
    "ps": [
     "Rozdeľovanie epizód, delenie segmentov a kombinovanie zdrojov narážajú na rovnaký nesúlad medzi blokmi titulkov a video blokmi: buď je potrebné jeden súbor rozrezať, alebo viacero skombinovať. Táto stránka zvládá oboje, pričom každá má svoju kartu."
    ]
   },
   {
    "h2": "Najprv vyberte rozdelenie alebo spojenie",
    "ps": [
     "Hore sú dve karty: **Rozdeliť: jeden súbor na segmenty** a **Spojiť: niekoľko súborov do jedného**. Možnosti pre druhý krok nižšie sa menia podľa vášho výberu.",
     "V časti „1 Pridať titulky“ nahrajte súbor alebo prilepte text; ak ste vybrali nesprávny, kliknite na „Vymazať“. Táto stránka číta iba formát UTF-8 – ak je kódovanie poškodené (stena otáznikov alebo štvorčekov), prejdite najprv na [[Garbled text repair|/repair.html]]."
    ],
    "img": {
     "file": "split-mode",
     "alt": "Dve karty v hornej časti stránky na rozdeľovanie a spájanie",
     "cap": "Rozdelenie a spojenie sú dve karty; možnosti druhého kroku nasledujú váš výber"
    }
   },
   {
    "h2": "Ako rezať",
    "ps": [
     "V časti „2 Ako rezať“ vyberte základ: **trvanie** (jeden segment každých X minút) alebo **počet blokov** (jeden segment každých X blokov) a zadajte číslo.",
     "Začiarknite možnosť „Reštartovať každý segment na 0:00“ a každý výsledný segment sa bude počítať od nuly – použite to, keď nahrajete epizódy a každý segment dáte prehrávaču samostatne. Nezačiarkujte ju, ak chcete zachovať pôvodné časové značky, takže každý segment stále zodpovedá svojej pozícii v zdrojovom videu.",
     "Rez padá iba na hranice blokov: keď veľmi dlhý titulok prekrýva bod rezu, celý blok zostáva v skoršom segmente."
    ],
    "img": {
     "file": "split-cut",
     "alt": "Možnosti trvania a počtu blokov s prepínačom reštartovania od nuly na stránke rozdeľovania",
     "cap": "Strih podľa trvania alebo počtu blokov a voliteľné reštartovanie každého segmentu na 0:00"
    }
   },
   {
    "h2": "Ako spájať",
    "ps": [
     "V časti „2 Ako spájať“ vyberte metódu: **Reťaziť v poradí** posunie neskorší súbor tak, aby začal po skončení skoršieho, bez prekrývania medzi segmentmi; **Prekladať podľa časovej osi** zachováva pôvodné časové značky každého súboru a radí ich podľa času začiatku.",
     "Použite reťazenie v poradí, keď sú súbory prvou a druhou polovicou jednej epizódy, alebo keď je potrebné spojiť samostatne skontrolované polovice; použite prekladanie podľa časovej osi, keď súbory patria na obrazovku spolu, napríklad pôvodná stopa a preložená stopa.",
     "Po spojení sa čísla blokov automaticky prečíslujú a ani jediné slovo dialógu sa nezmení."
    ],
    "img": {
     "file": "split-join",
     "alt": "Možnosti reťazenia v poradí a prekladania podľa časovej osi na stránke spájania",
     "cap": "Reťazenie v poradí sa hodí pre dve polovice jednej epizódy; prekladanie podľa časovej osi sa hodí pre pôvodnú a preloženú stopu"
    }
   },
   {
    "h2": "Prevzatie výsledku",
    "ps": [
     "Časť „3 Výsledok“ vpravo exportuje formáty **SRT** a **VTT**; kliknite na „Stiahnuť“ alebo „Kopírovať“.",
     "Pri rozdeľovaní môžete použiť „Stiahnuť každý segment“, čím naraz uložíte každý narezaný segment namiesto jedného kliknutia na segment."
    ],
    "img": {
     "file": "split-out",
     "alt": "Výber formátu SRT/VTT s tlačidlami na stiahnutie a stiahnutie každého segmentu v oblasti výsledkov",
     "cap": "Výsledky rozdeľovania možno stiahnuť segment po segmente; spojený súbor sa stiahne alebo skopíruje priamo"
    }
   },
   {
    "h2": "Čo zostáva nedotknuté",
    "ps": [
     "Ani jediný znak dialógu sa nezmení. Táto stránka mení iba to, ktoré bloky patria do akého segmentu a ako sú očíslované; obsah položiek zostáva taký, aký je.",
     "Pri „Reťazení v poradí“ sa časové značky neskorších súborov posunú ako celok – to spájanie vyžaduje; pri „Prekladaní podľa časovej osi“ sa zachováva každá pôvodná časová značka."
    ]
   },
   {
    "h2": "Často kladené otázky",
    "ps": [
     "**Čo ak je posledný segment veľmi krátky?** To je normálne. Zvyšok, ktorý nenaplní celý segment, sa stane vlastným segmentom namiesto toho, aby bol vyplnený.",
     "**Bude veta prekrývajúca bod rezu rozdelená?** Nie. Strihy padajú iba na hranice záznamov a blok, ktorý prekrýva čiaru, zostáva v skoršom segmente.",
     "**Ako sa po prekladaní zoradia dva bloky s identickými časmi?** Podľa času začiatku; ak sú časy začiatku rovnaké, zachová sa poradie, v akom ste súbory pridali.",
     "**Dá sa rozdeliť formát ASS?** Táto stránka spracováva formáty SRT a VTT. ASS najskôr konvertujte na SRT alebo VTT pomocou nástroja [[Format conversion|/convert.html]]."
    ]
   },
   {
    "h2": "Súkromie",
    "ps": [
     "Titulky sa spracúvajú úplne v prehliadači: nič sa nenahráva a nič neprechádza cez server. Zatvorte stránku a obsah je preč."
    ]
   },
   {
    "h2": "Súvisiace nástroje a príručky",
    "ps": [
     "Ak chcete spojiť dva súbory do dvojjazyčnej stopy (namiesto jednej epizódy), použite [[Bilingual merging and special effects|/guides/merge.html]]; ak je celá časová os posunutá, prejdite na [[Timeline adjustment|/shift.html]]; pre celú sériu použite [[Batch conversion|/batch.html]]; a po dokončení spustite [[Subtitle QC|/qc.html]]."
    ]
   }
  ]
 },
 "split-bilingual-subtitles": {
  "seo": {
   "title": "Rozdelenie dvojjazyčných titulkov na dve stopy – AI-SRTSub",
   "desc": "Rozdeľte dvojjazyčné titulky na dva súbory: pôvodná stopa a preklad sa stiahnu samostatne s rôznymi názvami; obidva formáty sú rozpoznané. – AI-SRTSub",
   "h1": "Rozdelenie dvojjazyčných titulkov na dve stopy",
   "intro": "Jedny dvojjazyčné titulky sa stanú dvoma súbormi – „pôvodným“ a „prekladom“: nahrajte, vyberte rozdelenie na dva, stiahnite každý zvlášť a časová os zostane nedotknutá.",
   "ctaText": "Rozdeliť dvojjazyčné titulky"
  },
  "body": [
   {
    "h2": "Kedy je potrebné rozdeliť titulky",
    "ps": [
     "Prehrávač vyžaduje stopu iba v jednom jazyku; alebo chcete stopu s prekladom na opätovný preklad, prípadne pôvodnú stopu na spárovanie s inou preloženou verziou. Dvojjazyčné titulky sú buď **jeden blok s dvoma riadkami** (pôvodný text na jednom riadku, preklad na druhom), alebo **dva samostatné bloky zdieľajúce rovnakú časovú os** – obidve varianty je možné rozdeliť."
    ]
   },
   {
    "h2": "Kde to vykonať",
    "ps": [
     "Otvorte nástroj [[Bilingual Subtitle Stripper|/bilingual.html]] a vložte doň svoje titulky. Nástroj automaticky deteguje dvojjazyčný formát: jeden blok s dvoma riadkami sa rozdelí podľa systému písma, dva bloky na rovnakej časovej osi podľa poradia. V rozbaľovacej ponuke režimov vyberte možnosť **Rozdeliť na dva** a kliknite na tlačidlo Spustiť (alebo nechajte proces prebehnúť automaticky). V oblasti výsledkov sa zobrazia dve časti: časť označená ako `.orig` predstavuje pôvodnú stopu a časť označená ako `.dst` predstavuje preloženú stopu – pre každú z nich kliknite na „Stiahnuť“; obe stopy zdieľajú presne tú istú časovú os."
    ],
    "img": {
     "file": "bilingual-split",
     "alt": "Výsledok rozdelenia: pôvodná stopa a preložená stopa ako dve časti, každá s tlačidlom na stiahnutie",
     "cap": "Rozdelenie na dva: pôvodná stopa .orig + preložená stopa .dst, každá sa stiahne samostatne"
    }
   },
   {
    "h2": "Jedna častá úskalia",
    "ps": [
     "**Jeden blok s dvoma riadkami v jazykoch, ktoré používajú rovnakú abecedu (napríklad angličtina plus francúzština), sa nedá rozdeliť.** Ak sú stopy oddelené podľa systému písma, považujú sa za jeden systém a spracúvajú sa ako jednojazyčné. Takýto obsah najskôr preveďte do formátu B s rovnakou časovou osou a až potom ho rozdelte; formát s dvoma blokmi sa spáruje podľa časovej osi a nezáleží mu na jazyku. Podrobnosti o oboch formátoch nájdete v časti [[Two ways to make bilingual subtitles|/guides/make-bilingual-subtitles.html]]."
    ]
   }
  ]
 },
 "srt-file-format": {
  "seo": {
   "title": "Čo je to súbor SRT? Ako ho otvoriť a upravovať – AI-SRTSub",
   "desc": "Anatómia titulkových súborov SRT (SubRip): číslo, časový riadok a text. Ako ho otvoriť, prečo ho prehrávač odmieta a ako opraviť skomolený text a chyby.",
   "h1": "Vysvetlenie formátu súborov SRT",
   "intro": "SRT je najuniverzálnejší formát titulkov: čistý text, jednoduchá štruktúra, akceptovaná takmer všade. Táto príručka rozoberá jeho štruktúru, spôsob otvorenia a opravu bežných chýb.",
   "ctaText": "Otvoriť konvertor titulkov"
  },
  "body": [
   {
    "h2": "Ako vyzerá súbor SRT",
    "ps": [
     "SRT (SubRip) je čistý text — otvorí ho každý textový editor. Každý titulok má tri časti: **riadok s číslom**, **časový riadok** a **text**, oddelené prázdnymi riadkami. Časový riadok vyzerá takto: `00:00:01,000 --> 00:00:03,500` — všimnite si **čiarku** pred milisekundami, nie bodku."
    ],
    "img": {
     "file": "convert-upload",
     "alt": "Oblasť nahratia: načítaný súbor SRT zobrazujúci čísla a časovanie",
     "cap": "Štandardný trojčasťový titulok SRT: číslo, časový riadok, text"
    }
   },
   {
    "h2": "Ako ho otvoriť",
    "ps": [
     "Pre zobrazenie obsahu: kliknite pravým tlačidlom myši a otvorte v ľubovoľnom **textovom editore**. Na použitie s videom: premenujte súbor tak, aby **zodpovedal názvu súboru videa** (okrem prípony), uložte oba do rovnakého priečinka a prehrávače ako VLC, PotPlayer alebo mpv ho načítajú automaticky; môžete ho tiež presunúť do okna prehrávania."
    ]
   },
   {
    "h2": "Oprava odmietnutí a skomoleného textu",
    "ps": [
     "**Skomolené znaky**: súbor nie je v kódovaní UTF-8 — uložte ho znova ako UTF-8 vo svojom editore. **Nič sa nezobrazuje**: skontrolujte, či časový riadok používa čiarku (nie bodku) a či čísla titulkov nie sú porušené (väčšina prehrávačov toleruje medzery, niektoré nie). **Súbor je vo formáte HTML alebo JSON**: zdroj sťahovania bol nesprávny; stiahnite ho znova."
    ]
   },
   {
    "h2": "Čo SRT dokáže a nedokáže obsahovať",
    "ps": [
     "SRT prenáša iba text a časovanie: **žiadne štýly** (fonty, farby), **žiadne umiestnenie** (kde na obrazovke), **žiadne efekty**. Na tie je potrebný ASS — pozri [[SRT na ASS|/guides/srt-to-ass.html]]. Pre porovnanie všetkých formátov vedľa seba pozri [[porovnanie formátov titulkov|/guides/subtitle-format-comparison.html]]."
    ]
   }
  ]
 },
 "srt-fps-converter": {
  "seo": {
   "title": "Konvertor FPS SRT – Zmena snímkovej frekvencie titulkov – AI-SRTSub",
   "desc": "Film má 24 fps, vysielanie 25 fps a titulky sa každú minútu čoraz viac rozchádzajú: mierku časovej osi upravte koeficientom 0,96 a celý súbor bude sedieť.",
   "h1": "Konverzia snímkovej frekvencie titulkov: 24 fps na 25 fps",
   "intro": "Spustite titulky z 24 fps filmu na 25 fps zdroji a stratia vyše sekundy každú minútu – do záverečných titulkov budú meškajúce o minúty. Jedna zmena mierky to napraví.",
   "ctaText": "Otvoriť editor časovania"
  },
  "body": [
   {
    "h2": "Prečo nesúlad snímkovej frekvencie spôsobuje rozchádzanie titulkov",
    "ps": [
     "Konverzia snímkovej frekvencie opätovne prečíta **rovnaký časový úsek pod dvoma rôznymi hodinami**. 100-minútový 24 fps film má 6000 s × 24 = **144 000 snímok**; na 25 fps zdroji sa týchto 144 000 snímok prehrá za 5760 sekúnd – **96 minút**. Celý film beží o 4 minúty kratšie, takže titulok v 50. minúte sa objaví približne o 2 minúty neskôr a titulok v záverečných titulkoch sa neukáže vôbec."
    ]
   },
   {
    "h2": "Vzorec a bežné faktory",
    "ps": [
     "Cieľová frekvencia ÷ pôvodná frekvencia = multiplikátor. **24 na 25: vynásobte 0,96** (24÷25); opačne, 25 na 24: 1,0417. **25 na 23,976: vynásobte 0,959**; opačne: 1,0427. V editore časovania pridajte krok **Zmeniť mierku podľa frekvencie** a zadajte faktor do poľa hodnoty."
    ],
    "img": {
     "file": "shift-step-rate",
     "alt": "Krok zmeny mierky podľa frekvencie so zadanou hodnotou 0,96",
     "cap": "0,96 je 24÷25; nápoveda na stránke dokonca spomína konverziu snímkovej frekvencie ako bežné použitie."
    }
   },
   {
    "h2": "Keď nepoznáte obidve frekvencie",
    "ps": [
     "Ak nemôžete nájsť snímkovú frekvenciu zdroja, nehádajte faktor — použite namiesto toho **dva kontrolné body**: vezmite skutočný čas zobrazenia prvého a posledného titulku ako dva body a všetko medzi tým sa proporcionálne roztiahne. Pozri [[titulky sa čoraz viac rozchádzajú|/guides/subtitles-out-of-sync.html]]."
    ]
   },
   {
    "h2": "Čo skontrolovať potom",
    "ps": [
     "Zmena mierky posunie každý začiatok a koniec; trvanie titulkov sa roztiahne rovnakým faktorom. Po spustení overte dva extrémy: prvý titulok (najmenšia pôvodná chyba) a posledný (najväčšia). Ak sa oba konce zhodujú, všetko medzi nimi sedí tiež."
    ]
   }
  ]
 },
 "srt-simplified-to-traditional": {
  "seo": {
   "title": "Konverzia zjednodušených titulkov na tradičné – Taiwan alebo Hongkong – AI-SRTSub",
   "desc": "Preveďte zjednodušené čínske titulky na tradičné: vyberte si tchajwanskú (s regionálnou slovnou zásobou alebo bez nej) alebo hongkonskú verziu. Preklady sa riešia podľa slov. Menia sa iba dialógy; časovanie zostáva zachované.",
   "h1": "Konverzia zjednodušených titulkov na tradičné",
   "intro": "Zjednodušené čínske titulky určené pre tchajwanské alebo hongkonské publikum stačí len konvertovať – obidva regióny však vyžadujú niečo iné a výber nesprávneho smeru vám prinesie výrazy, ktoré miestni nepoužívajú.",
   "ctaText": "Konvertovať tieto titulky"
  },
  "body": [
   {
    "h2": "Potreba konverzie",
    "ps": [
     "Vaše titulky sú v zjednodušenej čínštine a musia osloviť divákov na Taiwane alebo v Hongkongu. Opravovať znaky jeden po druhom nie je reálne – jedna epizóda má stovky titulkov – a obidva regióny nechcú rovnaký tradičný text: slovná zásoba sa líši a nesprávny smer prináša formulácie, ktoré by žiadny miestny nepoužil."
    ]
   },
   {
    "h2": "Kde to vykonať",
    "ps": [
     "Otvorte [[Konverzia medzi zjednodušenou a tradičnou čínštinou|/hanconv.html]], presuňte titulky do okna a v položke „Convert to“ vyberte niektorý zo smerov zjednodušená → tradičná: všeobecná tradičná, tchajwanská (so zmenou slovnej zásoby), tchajwanská (iba glyfy) alebo hongkonská. Konverzia prebehne okamžite a oblasť výsledku zobrazí hotové titulky pripravené na stiahnutie.",
     "**Pre tchajwanské publikum**: vyberte „Taiwanese (change wording)“, ak sa má zmeniť aj regionálna slovná zásoba – „softvér“ a „informácie“ sa zmenia na ich tchajwanské ekvivalenty – alebo „Taiwanese (glyphs only)“, ak chcete zmeniť tvary znakov pri zachovaní pôvodnej slovnej zásoby. **Pre hongkonské publikum**: vyberte „Hong Kong“, kde sa „softvér“ píše ďalšou formou."
    ],
    "img": {
     "file": "hanconv-dir",
     "alt": "Karta konverzie: rozbaľovacia ponuka cieľa zobrazujúca možnosť „Simplified → Taiwanese traditional (change wording)“",
     "cap": "Taiwan a Hongkong predstavujú samostatné smery s odlišnou slovnou zásobou"
    }
   },
   {
    "h2": "Bežné úskalia",
    "ps": [
     "**Nebojte sa priradení jeden ku viacerým**: rovnaký zjednodušený znak v slovách pre „čistý“, „suchý“ a „kmeň stromu“ sa mapuje na rôzne tradičné znaky. Tabuľky to riešia na úrovni fráz, takže všetko nie je zjednotené na jediný znak.",
     "**Konvertujú sa iba dialógy**: časovanie, čísla indexov a riadky štýlov ASS zostávajú nedotknuté, takže výsledok je pripravený na použitie.",
     "**Nič sa nezmenilo? Skontrolujte to predtým, než začnete panikáriť**: ak stavový riadok hlási 0 zmenených riadkov, súbor buď neobsahuje čínske znaky, alebo bol nesprávne detegovaný formát – skontrolujte, či položka „Detected format“ zodpovedá tomu, čo ste nahrali."
    ]
   },
   {
    "h2": "Súvisiace",
    "ps": [
     "Úplné vysvetlenie všetkých deviatich smerov – [[Ako konvertovať zjednodušené a tradičné titulky|/guides/hanconv.html]]; prečo ide o niečo viac než len o výmenu znakov – [[Zjednodušená vs tradičná čínština nie je len výmena znakov|/guides/simplified-traditional-chinese.html]]; konverzia z tradičnej späť na zjednodušenú sa nachádza v časti [[Konverzia medzi zjednodušenou a tradičnou čínštinou|/hanconv.html]]."
    ]
   }
  ]
 },
 "srt-to-ass": {
  "seo": {
   "title": "Konvertor SRT na ASS – Konvertujte titulky online – AI-SRTSub",
   "desc": "Konvertujte titulky SRT do formátu ASS (Advanced SubStation Alpha) s rozlíšením 1920×1080 a čistým predvoleným štýlom, pripraveným na načítanie v každom prehrávači. Spustite priamo v prehliadači.",
   "h1": "SRT na ASS",
   "intro": "Preveďte titulky SRT na ASS: presuňte súbor, vyberte ASS, stiahnite. Automaticky sa vytvorí plátno 1920×1080 a čistý predvolený štýl.",
   "ctaText": "Konvertovať SRT → ASS"
  },
  "body": [
   {
    "h2": "Kedy potrebujete formát ASS",
    "ps": [
     "Formát ASS použite vtedy, keď načítané titulky vyžadujú **lepšie umiestnenie a ovládanie štýlov**: obsahuje koncepty, ktoré SRT neponúka – veľkosť plátna, štýly písma, zarovnanie. Prehrávače mpv, PotPlayer, VLC a väčšina ostatných ich podporujú priamo."
    ]
   },
   {
    "h2": "Ako vyzerá výstup",
    "ps": [
     "Nástroj vytvorí štandardnú hlavičku: **plátno 1920×1080**, inteligentné zalamovanie (WrapStyle 0) a jediný predvolený štýl – Arial 54, biely text s čiernym obrysom, zarovnaný dole na stred. Tento štýl využíva každý jeden titulok."
    ],
    "img": {
     "file": "convert-opt-ass",
     "alt": "Rozbaľovacia ponuka výstupného formátu so zvolenou možnosťou ASS - Advanced SubStation",
     "cap": "Vyberte ASS ako výstup a po konverzii stiahnite"
    }
   },
   {
    "h2": "Sú štýly zachované?",
    "ps": [
     "SRT nemá žiadny koncept štýlov. Ak je váš zdroj už vo formáte ASS, konverzia **obnoví predvolený štýl a nezachová ten pôvodný** – na úpravu štýlov ASS použite špecializovaný editor titulkov. Časovanie a text zostávajú v oboch prípadoch nedotknuté."
    ]
   }
  ]
 },
 "srt-to-excel": {
  "seo": {
   "title": "Konverzia titulkov do Excelu – Korektúra riadok po riadku – AI-SRTSub",
   "desc": "Exportujte titulky SRT do Excelu: jeden riadok na titulok v štyroch stĺpcoch – index, začiatok, koniec a text. Čas je uložený ako text, zalomenia riadkov sú zachované a upravenú tabuľku možno skontvertovať späť na titulky.",
   "h1": "Konverzia titulkov do Excelu",
   "intro": "Kontrola stoviek titulkov v textovom editore je vyčerpávajúca. V Exceli je každý titulok jedným riadkom, takže filtrovanie, komentovanie a hľadanie s nahradením sú ľahko dostupné – a úpravy sa môžu vrátiť späť do vášho súboru SRT.",
   "ctaText": "Exportovať do Excelu"
  },
  "body": [
   {
    "h2": "Prečo je to potrebné",
    "ps": [
     "Korektúra, hromadné úpravy slov alebo delenie práce medzi viacerých ľudí – to všetko ide v tabuľke oveľa rýchlejšie než v čistom texte. Samotný formát SRT je čistý text, ale jeho štruktúra (index, časovanie, dialóg) sa presne mapuje na štyri stĺpce tabuľky."
    ]
   },
   {
    "h2": "Kde to vykonať",
    "ps": [
     "Otvorte [[Konverzia medzi titulkami a tabuľkou|/table.html]], prepnite na režim „to table“, presuňte súbor SRT a náhľad sa naplní jedným riadkom na titulok v štyroch stĺpcoch – index, začiatok, koniec, text. Kliknite na „Download Excel (.xlsx)“ a je váš. Formát VTT je podporovaný rovnako.",
     "Po dokončení úprav: prepnite režim na „to subtitle“, vložte hárček späť a získate opäť súbor SRT. Pravidlom sú tri stĺpce pre začiatok, koniec a text (fungujú aj anglické názvy Start / End / Text) v ľubovoľnom poradí."
    ],
    "img": {
     "file": "table-prev",
     "alt": "Náhľad tabuľky: každý titulok SRT ako riadok v štyroch stĺpcoch so stavovým riadkom",
     "cap": "SRT usporiadané ako štyri stĺpce, s možnosťou spätného prevodu rovnakým spôsobom"
    }
   },
   {
    "h2": "Bežné úskalia",
    "ps": [
     "**Najskôr opravte poškodené kódovanie**: táto stránka číta iba UTF-8. Obrazovka plná otazníkov alebo obdĺžnikov znamená, že najskôr musíte navštíviť [[Oprava kódovania (mojibake)|/repair.html]].",
     "**CSV alebo xlsx**: zvoľte .xlsx, ak súbor smeruje do Excelu, aby sa stĺpec s časom nedal preformátovať; CSV je prenosnejší, ale Excel ho môže interpretovať inak – v takom prípade nastavte stĺpec času na „Text“.",
     "**Formát ASS nefunguje**: ASS obsahuje smernice štýlov, preto ho pred vložením do tabuľky skonvertujte na SRT."
    ]
   },
   {
    "h2": "Súvisiace",
    "ps": [
     "Úplný obojsmerný návod – [[Ako konvertovať titulky do Excelu / CSV|/guides/table.html]]; následný preklad – [[Preklad titulkov|/translate.html]]; záverečná kontrola pred odovzdaním – [[Kontrola kvality titulkov|/qc.html]]."
    ]
   }
  ]
 },
 "srt-to-vtt": {
  "seo": {
   "title": "Prevodník SRT do VTT – Konverzia titulkov online – AI-SRTSub",
   "desc": "Konvertujte titulky SRT do formátu VTT (WebVTT) pre prvky HTML5 track. Čiarky v časových značkách sa automaticky zmenia na bodky. Všetko prebieha v prehliadači, nič sa nenahráva.",
   "h1": "SRT do VTT",
   "intro": "Zmeňte titulky SRT na VTT: presuňte súbor, vyberte VTT a stiahnite. Časové značky sa upravia pre webový formát, všetko priamo vo vašom prehliadači.",
   "ctaText": "Konvertovať SRT → VTT"
  },
  "body": [
   {
    "h2": "Kedy potrebujete VTT",
    "ps": [
     "Webové prehrávače (prvok HTML5 ``), nahrávanie titulkov na YouTube a väčšina prehrávačov v prehliadači akceptujú iba **VTT (WebVTT)** – nie SRT. Ak máte k dispozícii iba SRT, jedna konverzia zabezpečí jeho funkčnosť."
    ]
   },
   {
    "h2": "Ako sa oba formáty líšia",
    "ps": [
     "Obsah je takmer totožný, odlišujú sa v troch veciach: **hlavička WEBVTT** (vyžadovaná vo formáte VTT); **oddeľovač milisekúnd** v časových značkách – SRT používa čiarku (00:00:01,000), zatiaľ čo VTT používa bodku (00:00:01.000); a VTT navyše umožňuje bloky NOTE a STYLE, ktoré SRT nepodporuje."
    ],
    "img": {
     "file": "convert-result",
     "alt": "Výsledok konverzie znázorňujúci hlavičku WEBVTT a časové značky s bodkou",
     "cap": "Konvertovaný VTT súbor: prvý riadok WEBVTT, časové značky s bodkou"
    }
   },
   {
    "h2": "Ako vykonať konverziu",
    "ps": [
     "Otvorte [[converter|/convert.html]], vložte súbor SRT, ako výstupný formát vyberte **VTT - WebVTT** a následne súbor konvertujte a stiahnite. Poradie replík, časové hodnoty a viacriadkový text zostávajú zachované – mení sa iba syntax. Potrebujete opačný proces? Pozrite si [[VTT to SRT|/guides/vtt-to-srt.html]]."
    ]
   }
  ]
 },
 "subtitle-format-comparison": {
  "seo": {
   "title": "SRT vs VTT vs ASS vs SBV vs LRC – Ktorý formát titulkov – AI-SRTSub",
   "desc": "Porovnanie funkcií piatich bežných formátov titulkov: štýlovanie textu, pozíciovanie, presnosť časovania, kam ktorý patrí a ako medzi nimi konvertovať.",
   "h1": "Výber formátu titulkov: SRT / VTT / ASS / SBV / LRC",
   "intro": "Tie isté titulky uložené v piatich formátoch slúžia piatim rôznym účelom. Táto príručka porovnáva, čo každý formát dokáže a ako medzi nimi prechádzať.",
   "ctaText": "Otvoriť prevodník titulkov"
  },
  "body": [
   {
    "h2": "Výber formátu v jedinej vete",
    "ps": [
     "Načítanie do prehrávača, maximálna kompatibilita → **SRT**; webové prehrávače (prvok HTML5 track) alebo nahrávanie na YouTube → **VTT**; písma, farby, pozíciovanie, efekty → **ASS**; stiahnuté z YouTube → **SBV** (konvertujte na SRT pre širšiu podporu); texty piesní, spievanie po riadkoch → **LRC**."
    ],
    "img": {
     "file": "convert-opt",
     "alt": "Rozbaľovacia ponuka výstupného formátu: šesť cieľových formátov",
     "cap": "Šesť cieľových formátov exportu v prevodníku pokrýva každý formát z tejto príručky"
    }
   },
   {
    "h2": "Porovnanie funkcií",
    "ps": [
     "**SRT**: čistý text + časovanie, bez štýlovania alebo pozíciovania, šampión kompatibility. **VTT**: text + časovanie, natívne podporované prehliadačmi, dokáže obsahovať pozíciovanie a základné štýlovanie, bodka pred milisekundami. **ASS**: text + časovanie + úplné štýlovanie (písma, farby, obrysy, pozíciovanie, efekty), časovanie na stotiny sekundy. **SBV**: minimálny formát titulkov pre YouTube, začiatok a koniec na jednom riadku. **LRC**: formát textov piesní, iba časy začiatku, žiadne časy konca, žiadne štýlovanie."
    ]
   },
   {
    "h2": "Cesty medzi formátmi",
    "ps": [
     "Ktorýkoľvek z týchto formátov je možné obojsmerne konvertovať v [[converter|/convert.html]]: čítanie podporuje srt, vtt, ass (vrátane ssa), sbv, lrc, txt; export podporuje srt, vtt, ass, sbv, lrc, txt. Bežné trasy majú vlastné príručky: [[SRT to VTT|/guides/srt-to-vtt.html]], [[VTT to SRT|/guides/vtt-to-srt.html]], [[SRT to ASS|/guides/srt-to-ass.html]], [[ASS to SRT|/guides/ass-to-srt.html]], [[SBV to SRT|/guides/sbv-to-srt.html]], [[LRC to SRT|/guides/lrc-to-srt.html]]."
    ]
   },
   {
    "h2": "Čo sa konverziou stráca",
    "ps": [
     "Konverzia do SRT vždy odstráni štýlovanie a pozíciovanie (SRT ich nedokáže obsahovať). Konverzia do ASS pomocou tohto nástroja **obnoví predvolený štýl a nezachová pôvodný**. Prechod z LRC do SRT vyžaduje doplnenie časov konca (každý riadok trvá do nasledujúceho; posledný trvá 3 sekundy). Hodnoty časovania a text zostávajú vo všetkých smeroch identické."
    ]
   }
  ]
 },
 "subtitle-garbled-characters": {
  "seo": {
   "title": "Odkiaľ pochádzajú poškodené titulky – Identifikácia a oprava – AI-SRTSub",
   "desc": "Skazený text (mojibake) znamená nesprávne čítanie, nie poškodený súbor. Znaky náhrady, steny akcentovaných písmen a zhluky neznámych znakov poukazujú na konkrétnu príčinu – zistite, ktoré sa dajú obnoviť a ktoré nie.",
   "h1": "Odkiaľ pochádzajú poškodené titulky",
   "intro": "Tie isté bajty prečítané ako UTF-8 a prečítané ako GBK vytvárajú dve úplne odlišné sady znakov. Vzhľad poškodeného textu je priamym dôkazom toho, ktorý krok zlyhal.",
   "ctaText": "Otvoriť nástroj na opravu poškodeného textu"
  },
  "body": [
   {
    "h2": "Súbor je v poriadku – bol nesprávne prečítaný",
    "ps": [
     "Súbor s titulkami ukladá bajty. Premena bajtov na znaky vyžaduje znalosť kódovania, v ktorom boli napísané – ak sa v ňom mýlite, výsledkom je poškodený text. Zo súboru sa nestratil ani jediný bajt; prečítajte ho znovu so správnym kódovaním a znaky sa vrátia.",
     "To delí úlohu na dve časti: **zistenie pôvodného kódovania** a **jeho uloženie v kódovaní, ktoré váš prehrávač dokáže detekovať**. Prvé vychádza z pokusného dekódovania a bodovania, druhé z uloženia kópie. Riešia rôzne problémy."
    ]
   },
   {
    "h2": "Päť podôb, päť príčin",
    "ps": [
     "Poškodenie textu nie je náhodné – jeho vzhľad prezrádza príčinu:"
    ],
    "img": {
     "file": "repair-diag",
     "alt": "Diagnostická karta so zoznamom jednotlivých typov stop poškodenia textu",
     "cap": "Diagnostika triedi poškodený text podľa príčiny namiesto toho, aby ho hádzala do jedného vreca"
    }
   },
   {
    "h2": "Prečo sa znak náhrady nedá opraviť",
    "ps": [
     "Znak náhrady je deliacou čiarou. Znak `` znamená, že bajty boli zahodené **už v skoršom kroku** (zvyčajne pri čítaní súboru a jeho opätovnom uložení nejakým programom) a nič sa nezaznamenalo o tom, čo sa stratilo. V tom bode už neexistuje východisko na spätné uvažovanie – nikto to nedokáže opraviť.",
     "Stránka na opravu preto pristupuje k dvom prípadom odlišne. Nahrajte súbor a pôvodné bajty zostanú nedotknuté, čo umožní vyskúšať každé kódovanie; ak vložený text už obsahuje znak náhrady, jasne hlási: „nedá sa opraviť, nahrajte prosím pôvodný súbor“.",
     "Existuje aj opačný prípad: obsah sa číta dokonale, ale váš prehrávač stále zobrazuje zmätok. Súbor za to nemôže – **prehrávač zvolil nesprávne kódovanie**. Úprava textu nepomôže; uložte kópiu ako UTF-8 s BOM alebo GBK a poskytnite mu ju."
    ],
    "img": {
     "file": "repair-up",
     "alt": "Oblasť nahratia: presunutie myšou a vloženie ako dva vstupné body",
     "cap": "Ak môžete, nahrajte súbor – nedotknuté bajty znamenajú niečo, čo sa dá opraviť"
    }
   },
   {
    "h2": "Čo nástroj porovnáva počas opravy",
    "ps": [
     "Nástroj vyskúša každé vierohodné kódovanie a potom ohodnotí každý výsledok: koľko z neho tvoria bežné znaky, či obsahuje reťazce akcentov, reťazce symbolov, či úseky CJK nie sú stenami nejasných znakov. Výsledok s najvyšším skóre sa umiestni na vrch zoznamu.",
     "**Ak žiadne skóre jasne nevyniká, neodporúča sa nič** – je lepšie povedať vám „toto sa číta dobre tak, ako to je“, než vás odbiť niečím, čo len neurčito pripomína jazyk. Dvakrát skazený text (raz zle uložený, potom raz zle opravený) prechádza jedným dodatočným kolom spätného výpočtu u najlepších kandidátov."
    ],
    "img": {
     "file": "repair-fix",
     "alt": "Zoznam kandidátov zoradený podľa skóre, každý označený svojou dvojicou kódovaní",
     "cap": "Kandidátov hodnotených podľa skóre – žiadny jasný víťaz, žiadne odporúčanie"
    }
   },
   {
    "h2": "Uloženie správneho kódovania dokončí prácu",
    "ps": [
     "Opravený text je stále nutné uložiť v kódovaní, ktoré váš prehrávač rozoznáva. Prehrávače v systéme Windows sa pri detekcii kódovania zvyčajne spoliehajú na BOM, takže **UTF-8 s BOM** spôsobuje najmenej problémov; starší hardvér a niektoré regionálne prehrávače vyžadujú GBK. Môžete zvoliť UTF-8, UTF-8 (s BOM), GBK, Big5, Shift_JIS alebo EUC-KR, a ak niečo nesedí, budete vyzvaní na výber iného formátu (GBK nedokáže obsahovať kórejčinu)."
    ],
    "img": {
     "file": "repair-out",
     "alt": "Oblasť výsledkov: rozbaľovacia ponuka kódovania na uloženie a tlačidlo prevzatia",
     "cap": "Uložte ho v tvare, ktorý prehrávač rozozná, a problém s poškodeným textom je definitívne vyriešený"
    }
   },
   {
    "h2": "Súvisiace nástroje a príručky",
    "ps": [
     "Úplný návod – [[How to repair mojibake subtitles|/guides/repair.html]]; čo súbor SRT v skutočnosti ukladá – [[What is inside an SRT file|/guides/srt-file-format.html]]; kódovanie je v poriadku, ale obsah je znečistený (vodoznaky, reklamy, značky pre nepočujúcich) – [[Subtitle cleanup|/clean.html]]."
    ]
   }
  ]
 },
 "subtitle-glossary": {
  "seo": {
   "title": "Tabuľky pojmov: jedna séria, jedna slovná zásoba – Kedy ju vytvoriť – AI-SRTSub",
   "desc": "Tabuľka pojmov vyrieši nejednotný preklad toho istého slova: kedy ju vytvoriť, ako ju opakovane použiť v celej sérii, prečo zhoda celých slov v čínštine nič nerobí a čo do nej nepatrí.",
   "h1": "Tabuľky pojmov: ako udržať konzistentnosť v celej sérii",
   "intro": "Keď je nejaké meno v prvej časti A a v siedmej časti B, diváci si myslia, že ide o dve rôzne postavy. Tabuľka pojmov presne tomu zabraňuje – dorieši, ako sa veci nazývajú.",
   "ctaText": "Otvoriť hromadnú výmenu pojmov"
  },
  "body": [
   {
    "h2": "Tabuľka pojmov rieši nekonzistentnosť",
    "ps": [
     "Problémy s formuláciami v titulkoch majú dva druhy: „toto slovo je preložené zle“ a „to isté slovo je na rôznych miestach preložené odlišne“. Prvý problém je slovníkový; druhý je presne ten, na ktorý slúži tabuľka pojmov.",
     "Druhý problém je bežnejší a ťažšie si ho všimnúť: zo slova `Thor` sa v prvej časti stane „Thor“ a v siedmej časti „Donar“, pričom každá časť vyzerá sama osebe dobre, no seriál ako celok vyvoláva v divákoch dojem, že sa objavila nová postava. Tabuľka pojmov mení fakt, že „tato produkcia ho nazýva Thor“, na spustiteľné pravidlo, ktoré sa naraz aplikuje na celý súbor s titulkami."
    ]
   },
   {
    "h2": "Kedy sa oplatí ju vytvoriť",
    "ps": [
     "Nie každý súbor s titulkami potrebuje tabuľku pojmov. Prípady, ktoré ju oprávňujú, sú zvyčajne tieto:"
    ],
    "img": {
     "file": "glossary-rules",
     "alt": "Pravidlá výmeny zoskupené podľa kategórií v tabuľke pojmov",
     "cap": "Pomocou komentárov # môžete zoskupiť pravidlá a dočasne ich počas úprav vypnúť"
    }
   },
   {
    "h2": "Udržiavanie jednej tabuľky počas celej série",
    "ps": [
     "Tabuľka pojmov sa udržiava **prírastkovo**: usporiadajte mená v prvej časti, potom pridajte pravidlo, kedykoľvek sa objaví nový pojem, a do konca série bude tabuľka kompletná. Pre ďalšiu sériu toho istého seriálu začnite od nej.",
     "Píšte pravidlá o niečo širšie, než je striktne nutné – akonáhle sa rozhodnete pre „Thor“, pridajte aj „Donar -> Thor“, aby sa titulky niekoho iného dali uviesť do súladu v rámci tej istej operácie.",
     "Vždy si prečítajte následný **zoznam zmien**: uvádza každú repliku, každý riadok a to, čo sa na čo zmenilo. Je to jediné miesto, kde si môžete overiť, či bola zmena správna a nie prehnaná, pričom akýkoľvek záznam, ktorý sa vám nepáči, možno jedným kliknutím vrátiť späť."
    ],
    "img": {
     "file": "glossary-diff",
     "alt": "Zoznam jednotlivých zmien v oblasti výsledkov",
     "cap": "Každá zmena je uvedená v zozname; kliknutím na tú, ktorú nechcete, ju vrátite späť"
    }
   },
   {
    "h2": "Čo nepatrí do tabuľky pojmov",
    "ps": [
     "Tabuľka pojmov mení **slová**. Tieto tri veci presahujú jej náplň práce a mali by ňou aj ostať:",
     "**Gramatika a štruktúra vety** – slovo nemôžete premeniť na vetu; práca na úrovni vety patrí do [[Subtitle translation|/translate.html]] alebo ľuďom.",
     "**Čistenie obsahu** – odstraňovanie celých riadkov, ako sú vodoznaky, reklamy a skryté titulky pre nepočujúcich, patrí do [[Subtitle cleaning|/clean.html]]; pravidlá v tabuľke pojmov nahrádzajú, no nemastia ani mažu riadky.",
     "**Časové osi** – tabuľka pojmov sa nikdy nedotýka času. Pre globálny posun alebo problém s frekvenciou prejdite na [[Timeline adjustment|/shift.html]]."
    ]
   },
   {
    "h2": "Niekoľko vecí, ktoré sa dajú ľahko pokaziť",
    "ps": [
     "**Čínština stále nahrádza podreťazce aj so zaškrtnutou zhodou celých slov – to je normálne.** Čínština a japončina neoddeľujú slová medzerami, takže nástroj nedokáže určiť hranice slov a zhoda celých slov tam nemá žiadny vplyv; ochrana pred dotknutím sa reťazca `art` vo vnútri `start` funguje iba pre angličtinu.",
     "**Poradie mení výsledok.** Pravidlá prebiehajú zhora nadol a text vytvorený jedným pravidlom je opätovne preskenovaný pravidlami pod ním. Nahraďte A za B a potom B za C a nakoniec skončíte pri C.",
     "**Ak chcete zmeniť iba preklad, nastavte rozsah.** V dvojjazyčnom súbore vyberte „iba druhý riadok“; položky s jediným riadkom zostávajú nedotknuté pri oboch nastaveniach pre jeden riadok – nástroj nehádže tipy na to, ktorá strana je pôvodná.",
     "**Tabuľka pojmov sa neukladá.** Pri každom otvorení stránky je prázdna, takže si svoj textový súbor uchovajte a posuňte ho ďalej."
    ]
   },
   {
    "h2": "Súvisiace nástroje a príručky",
    "ps": [
     "Kompletný návod nájdete v [[How to batch-replace terms in subtitles|/guides/glossary.html]]; ak je obsah znečistený, najskôr spustite [[Subtitle cleaning|/clean.html]]; akonáhle sú mená usporiadané a potrebujete iné jazyky, prejdite na [[Subtitle translation|/translate.html]]; a výsledok prežeňte cez [[Subtitle QC|/qc.html]]."
    ]
   }
  ]
 },
 "subtitle-quality-check": {
  "seo": {
   "title": "Kontrolný zoznam pred dodaním titulkov (QC) – AI-SRTSub",
   "desc": "Kontrolný zoznam dodania titulkov: prekrývania, rýchlosť čítania, šírka riadku a interpunkcia zlyhávajú najčastejšie. Spustite 17 pravidiel QC – polovica problémov sa dá vyriešiť jedným kliknutím.",
   "h1": "Čo skontrolovať pred dodaním",
   "intro": "Hotové titulky ešte nie sú pripravené na dodanie: problémy, ktoré diváci odhalia na prvý pohľad, sú presne tie, ktoré po stý raz pozerania už nevidíte. Tento kontrolný zoznam pokrýva túto záverečnú kontrolu.",
   "ctaText": "Spustiť kontrolu kvality titulkov"
  },
  "body": [
   {
    "h2": "Prečo sami nevidíte problémy",
    "ps": [
     "Každý, kto robí titulky, pozná obsah príliš dobre – viete, čo hovorí každý nasledujúci riadok, takže nič nepôsobí prirýchlo; rozloženie ste videli stokrát a vaše oči samy prehliadajú nedostatky. Kontrola pred dodaním sa teda nemôže spoliehať na „opätovné pozretie od začiatku“ – musí byť **meraná číslami**: rýchlosť čítania, šírka riadku, trvanie, prekrývania. Nechajte rozhodnúť čísla."
    ]
   },
   {
    "h2": "Šesť najčastejších chýb",
    "ps": [
     "Zoradené podľa toho, ako často potopia dodanie:"
    ]
   },
   {
    "h2": "Ako vykonať kontrolu",
    "ps": [
     "Otvorte [[Subtitle QC|/qc.html]] a vložte doň svoje titulky; nastavte jazyk na automatickú detekciu (27 jazykov, každý s vlastnými úrovňami pravidiel). Správa uvádza zistenia na troch úrovniach – **chyby / upozornenia / tipy** – pričom každé obsahuje číslo položky a nameranú hodnotu. Chyby je nutné vyriešiť (poškodený text, formát časových značiek, koniec skôr než začiatok, poškodené číslovanie); upozornenia závisia od prípadu (prekrývania, rýchlosť čítania, šírka riadku, trvanie); tipy sú záverečné doladenie (pozícia zlomov riadkov, medzery, interpunkcia)."
    ],
    "img": {
     "file": "qc-report",
     "alt": "Správa QC: trojúrovňový zoznam problémov, pričom každé zistenie obsahuje číslo položky a porovpanie nameranej hodnoty s prahovou",
     "cap": "Trojúrovňová správa poskytujúca číslo položky a nameranú hodnotu pre každé zistenie"
    }
   },
   {
    "h2": "Čo možno opraviť jedným kliknutím",
    "ps": [
     "Číslovanie, prázdne položky, opätovné zalamovanie, medzery a interpunkcia – čokoľvek, čo **necháva časovanie nedotknuté** – možno opraviť automaticky; opravy, ktoré **menia časovanie** (výmena začiatku a konca, posun prekrývaní, orezanie alebo natiahnutie trvania), sú predvolene odškrtnuté a mali by sa zaškrtnúť až po potvrdení dopadu. **Rýchlosť čítania nad limit nemá žiadnu automatickú opravu** – stroj nemôže vedieť, ktoré slovo vystrihnúť, takže preklad skráťte sami alebo trochu uvoľnite časovanie; pozrite si [[Subtitles Too Fast to Read|/guides/subtitle-too-fast.html]]. Po oprave sa automaticky spustí nová kontrola a správa počítá iba to, čo bolo skutočne opravené."
    ]
   },
   {
    "h2": "Kým ste pri tom",
    "ps": [
     "Stránka so správou dokáže priamo prevziať správu v čistom texte `.qc.txt` – priložte ju k dodaniu, aby druhá strana hneď videla, čo ste skontrolovali. Pri čerstvo preložených titulkoch spustite QC pred dodaním; celkový posun časovej osi je iný druh problému – ak rýchlosť čítania po kontrole stále nevyhovuje, pozrite si [[Subtitles Drifting Out of Sync|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "subtitle-speed-converter": {
  "seo": {
   "title": "Synchronizácia titulkov po zmene rýchlosti videa – AI-SRTSub",
   "desc": "Video sa zrýchlilo alebo spomalilo a titulky nesedia: zadajte faktor rýchlosti v kroku zmeny mierky a celá časová os sa prispôsobí videu.",
   "h1": "Úprava titulkov po zmene rýchlosti videa",
   "intro": "Video je celkovo rýchlejšie alebo pomalšie, ale titulky zostali v pôvodnom tempe — od určitého bodu je všetko posunuté. Zadajte faktor a celá časová os sa prispôsobí videu.",
   "ctaText": "Otvoriť editor časovania"
  },
  "body": [
   {
    "h2": "Kedy použiť pomer namiesto posunu",
    "ps": [
     "Video bolo zrýchlené alebo spomalené **ako celok** (povedzme 0.9x alebo 1.25x v strihovom programe), pričom každý titulok si zachoval svoj pôvodný rytmus: začiatok sedí a čím ďalej pokračujete, tým je to horšie – s konštantným pomerom. To je problém s rýchlosťou. Ak je celý súbor jednoducho posunutý o pevnú hodnotu bez roztiahnutia, posun stačí – pozrite si [[posunutie celého súboru titulkov skôr alebo neskôr|/guides/shift-subtitle-timing.html]]."
    ]
   },
   {
    "h2": "Aké číslo zadať",
    "ps": [
     "Titulky musia nasledovať video, takže zadajte **faktor, o ktorý sa video skutočne zmenilo**: zrýchlenie 1.25x znamená, že časy titulkov sa vynásobia 1.25, aby stíhali; spomalenie 0.9x sa vynásobí 0.9. V editore časovania pridajte krok **Škálovanie podľa pomeru** a zadajte faktor do poľa hodnoty."
    ],
    "img": {
     "file": "shift-step-rate",
     "alt": "Krok škálovania podľa pomeru s faktorom v poli hodnoty",
     "cap": "Faktor nad 1 naťahuje časovú os (pre zrýchlené video), pod 1 ju stláča (pre spomalené)."
    }
   },
   {
    "h2": "Ako sa to líši od posunu",
    "ps": [
     "Posun **posúva** časy každého titulku o rovnakú pevnú hodnotu a zachováva trvanie titulkov; pomer **násobí** začiatok aj koniec, takže sa mení aj trvanie. Po zmene rýchlosti sa samotné trvanie zmenilo – presne preto je potrebný pomer."
    ]
   },
   {
    "h2": "Ak si nie ste istí faktorom",
    "ps": [
     "Keď nepoznáte presný faktor, použite **dva záchytné body**: zadajte skutočné časy videa pre prvý a posledný titulok a všetko medzi tým sa úmerne roztiahne – čo zodpovedá výpočtu správneho faktora. Pozrite si [[titulky sa čoraz viac rozchádzajú|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "subtitle-too-fast": {
  "seo": {
   "title": "Titulky sú príliš rýchle na čítanie – Úprava rýchlosti čítania – AI-SRTSub",
   "desc": "Titulky sú príliš rýchle na čítanie – krátke trvanie alebo dlhý text? Kontrola kvality označuje položky nad 20 znakov/s (9 znakov pre CJK); trvanie sa opraví automaticky, text si vyžaduje úpravu.",
   "h1": "Titulky sú príliš rýchle na čítanie",
   "intro": "Diváci stále stláčajú pauzu? Na vine je rýchlosť čítania. Ako ju zmerať, ako ju opraviť a kedy upraviť text namiesto časovania – to všetko v jednej príručke.",
   "ctaText": "Skontrolovať rýchlosť čítania"
  },
  "body": [
   {
    "h2": "Čo je rýchlosť čítania?",
    "ps": [
     "Rýchlosť čítania je jednoducho to, **či diváci stihnú prečítať titulok v čase, počas ktorého je zobrazený na obrazovke**. Výpočet je priamočiary: šírka textu vydelená sekundami na obrazovke. Bežné priemyselné limity: 9 znakov s plnou šírkou za sekundu pre čínštinu, japončinu a kórejčinu (18 jednotiek s polovičnou šírkou), 20 jednotiek s polovičnou šírkou za sekundu pre ostatné jazyky. Riadok s 20 znakmi, ktorý trvá 1 sekundu, vychádza na 40 jednotiek šírky za sekundu – viac než dvojnásobok limitu a diváci ho nikdy nestihnú dočítať."
    ]
   },
   {
    "h2": "Najprv zistite, o aký druh rýchlosti ide",
    "ps": [
     "„Príliš rýchle na čítanie“ sú v skutočnosti dva rôzne problémy: **príliš krátke trvanie** – titulok zmizne po jednej či dvoch stovkách milisekúnd, čo je zvyčajne chyba časovania alebo zvyšok po strihu; **príliš dlhý text** – trvanie je v poriadku, ale riadok natlačí 30 znakov a žiaden rýchlostný limit ho nezachráni. Opravy sú opačné, takže najprv zistite, aký problém máte."
    ],
    "img": {
     "file": "qc-rules",
     "alt": "Nastavenie limitu rýchlosti čítania na stránke kontroly kvality, predvolene 18 pre CJK a 20 pre ostatné jazyky",
     "cap": "Prahové hodnoty rýchlosti čítania kontroly kvality: 18 jednotiek šírky za sekundu pre CJK, 20 pre ostatné jazyky"
    }
   },
   {
    "h2": "Ako to skontrolovať",
    "ps": [
     "Otvorte [[Kontrola kvality titulkov|/qc.html]] a vložte svoje titulky. V správe je „príliš krátke trvanie“ varovanie, ktoré zobrazuje namerané milisekundy (prahová hodnota: 833 milisekúnd); „nečitateľná rýchlosť“ je samostatné zistenie, ktoré zobrazuje namerané jednotky šírky za sekundu. Pri dvojjazyčných titulkoch sa počítajú iba riadky napísané v cieľovom jazyku – tieto dva jazyky sa nesčítavajú."
    ]
   },
   {
    "h2": "Ako to opraviť",
    "ps": [
     "**Príliš krátke trvanie**: opraviteľné jedným kliknutím – titulok sa automaticky predĺži na 833 milisekúnd bez toho, aby presiahol začiatok nasledujúceho titulku (oprava nesmie vytvoriť nové prekrývania). **Príliš dlhý text**: žiadna automatická oprava – stroj nemôže vedieť, ktoré slovo vystrihnúť. Dve cesty, vaša voľba: skrátiť preklad (kliknutím na bunku v prekladateľskom nástroji ju upravte) alebo predĺžiť trvanie tohto titulku (iba ak je pred nasledujúcim titulkom medzera; pri problémoch s celkovou časovou osou pozrite [[Posun časovej osi|/shift.html]]). Následne znova spustite kontrolu kvality, aby ste potvrdili, že rýchlosť čítania je opäť v rámci limitu."
    ]
   },
   {
    "h2": "Nepreháňajte to s úpravami",
    "ps": [
     "Dodržiavanie rýchlostného limitu neznamená pohodlné sledovanie: natlačenie každého titulku až na hranicu 9 znakov za sekundu robí celý film únavným. Pravidlom je držať sa väčšinou na približne 70% prahovej hodnoty a pasáže husté na dialógy nechať občas mierne prekročiť limit. Bloky titulkov, ktoré blikajú prirýchlo, sú samy osebe problémom – pred odovzdaním spustite úplnú sadu metrík, pozrite si [[Čo skontrolovať pred odovzdaním|/guides/subtitle-quality-check.html]]."
    ]
   }
  ]
 },
 "subtitles-out-of-sync": {
  "seo": {
   "title": "Titulky sa čoraz viac rozchádzajú? Opravte to – AI-SRTSub",
   "desc": "Začiatok sedí, v strede filmu meškajú pár sekúnd a na konci sú nepoužiteľné: to je postupné rozchádzanie, zvyčajne nesúlad snímkovej frekvencie alebo zmena rýchlosti videa. Dva záchytné body to vyriešia.",
   "h1": "Titulky sa čoraz viac rozchádzajú: Príčiny a riešenia",
   "intro": "Na začiatku to sedí, po pol hodine meškajú pár sekúnd a na konci je to beznádejné. Tento typ rozchádzania má známe príčiny – a známe riešenie.",
   "ctaText": "Opraviť tento súbor"
  },
  "body": [
   {
    "h2": "Najprv odlíšte dva druhy nesúladu",
    "ps": [
     "Nesúlad má dva druhy: **rovnomernejší posun** znamená, že každý titulok mešká (alebo predchádza) o rovnakú hodnotu, ktorá je od začiatku do konca približne rovnaká; **postupné rozchádzanie** znamená, že začiatok je správny a chyba rastie smerom ku koncu, pričom môže dosiahnuť až minúty. Tento článok sa venujú druhému druhu – pre prvý si pozrite [[posunutie celého súboru titulkov skôr alebo neskôr|/guides/shift-subtitle-timing.html]]."
    ]
   },
   {
    "h2": "Prečo sa čoraz viac rozchádzajú",
    "ps": [
     "Rozchádzanie pochádza z **dvoch rôznych hodín**: tri najbežnejšie príčiny sú (1) nesúlad snímkovej frekvencie – titulky k filmu s 24 sn./s na zdroji s 25 sn./s strácajú viac ako sekundu za minútu; (2) video bolo zrýchlené alebo spomalené, zatiaľ čo titulky si zachovali pôvodné tempo; (3) nahrávka s premenlivou snímkovou frekvenciou (VFR), ktorej časová os je už od začiatku nerovnomerná. Čo majú spoločné: chyba rastie približne lineárne s časom prehrávania."
    ]
   },
   {
    "h2": "Opravte to pomocou dvoch záchytných bodov",
    "ps": [
     "Keďže chyba rastie lineárne, pripnutie správneho času na každom konci a opätovné úmerné roztiahnutie stredu všetko napraví. V editore časovania pridajte **korekciu pomocou dvoch záchytných bodov**: dve políčka „aktuálne“ sa automaticky vyplnia pôvodnými časmi tohto súboru; sledujete video a zadáte **, kedy sa skutočne objaví prvý a posledný titulok** do dvoch políčok „cieľové“."
    ],
    "img": {
     "file": "shift-step-two",
     "alt": "Korekcia pomocou dvoch záchytných bodov: aktuálne časy sú vyplnené automaticky, cieľové časy je potrebné zadať",
     "cap": "Vezmite záchytné body na dvoch okrajoch – s najmenšou a najväčšou pôvodnou chybou – a všetko medzi nimi sa úmerne opäť roztiahne."
    }
   },
   {
    "h2": "Ako overiť výsledok",
    "ps": [
     "Po spustení výsledný panel zoznamuje pôvodné a nové časy každého titulku **vedľa seba**. Skontrolujte tri miesta: prvý titulok, jeden v strede a posledný – tri pozície s najmenšou, strednou a najväčšou pôvodnou chybou. Ak pristanú všetky tri, pristanú aj všetky ostatné v súbore."
    ],
    "img": {
     "file": "shift-result",
     "alt": "Výsledný panel: pôvodné a nové časy vedľa seba s tlačidlom na stiahnutie",
     "cap": "Nové časy stredných titulkov by mali padnúť medzi dva okraje – znak toho, že pomer je správny."
    }
   },
   {
    "h2": "Keď dva záchytné body nestačia",
    "ps": [
     "Korekcia pomocou dvoch záchytných bodov predpokladá, že chyba je **lineárna**. Ak je zdrojom záznam obrazovky s VFR a so skokom snímkovej frekvencie v strede súboru, lineárne natiahnutie nemôže opraviť stred – vezmite zjavne nesediaci stredný titulok ako tretí bod, rozdelte tam súbor a spustite korekciu s dvoma záchytnými bodmi pre každú polovicu zvlášť. Po oprave si tiež pozrite strednú časť normálnou rýchlosťou, aby ste potvrdili, že nezostal žiadny lokálny nesúlad."
    ]
   }
  ]
 },
 "table": {
  "seo": {
   "title": "Konverzia titulkov do Excelu / CSV – Obojsmerne – AI-SRTSub",
   "desc": "Dva smery: export SRT/VTT do Excelu alebo CSV na kontrolu riadok po riadku, potom import upraveného hárku späť ako titulky. Vyžadujú sa tri stĺpce, ľubovoľné poradie; čas sa uchováva ako text.",
   "h1": "Ako konvertovať titulky do Excelu / CSV",
   "intro": "Korektúra a preklad sú v tabuľkovom procesore jednoduchšie. Exportujte titulky do Excelu alebo CSV, upravte ich riadok po riadku a potom ich preveďte späť – stĺpce s časom zostanú textom a zalomenia riadkov v dialógoch sa zachovajú.",
   "ctaText": "Otvoriť konvertor tabuliek"
  },
  "body": [
   {
    "h2": "Čo tento nástroj robí",
    "ps": [
     "Titulky sú riadky s titulkami a tabuľky sú riadky so záznamami – akonáhle máte hárok, kontrolu, komentáre a hromadný preklad môžete vykonávať pomocou nástrojov, ktoré už poznáte. Podporované sú oba smery:"
    ]
   },
   {
    "h2": "Nahranie a výber smeru",
    "ps": [
     "Pretiahnite súbor alebo ho vyhľadajte. Každý smer vyžaduje iný typ súboru: **do tabuľky** prijíma súbory titulkov (SRT / VTT), **do titulkov** prijíma súbory tabuliek (CSV / Excel, .xlsx aj .xls). Ak zvolíte nesprávny režim, stránka vám povie, aký typ súboru tento režim vyžaduje.",
     "⚠️ Táto stránka číta iba formát UTF-8. Ak sa vaše titulky otvoria ako plocha plná otáznikov alebo štvorčekov, prežeňte ich najskôr cez [[Oprava poškodeného kódovania|/repair.html]] – poškodené kódovanie sa tu číta iba ako náhradné znaky."
    ],
    "img": {
     "file": "table-up",
     "alt": "Oblasť nahrania konvertora tabuliek: oblasť presunutia a dva prepínače režimov",
     "cap": "Každý režim vyžaduje iný súbor: titulky dnu, tabuľka von – a späť"
    }
   },
   {
    "h2": "Export titulkov do tabuľky",
    "ps": [
     "Vyberte „do tabuľky“, vložte titulky a v náhľade sa zobrazí každý titulok: index, začiatok, koniec, text. Stavový riadok uvádza počet titulkov a celkové trvanie. Potom kliknite na „Stiahnuť Excel (.xlsx)“ alebo „Stiahnuť CSV“.",
     "Rozdiel medzi nimi: .xlsx je skutočný súbor tabuľky, kde Excel nemôže zmeniť formát stĺpca s časom za vaším chrbtom; CSV je prenosnejšie, ale Excel môže pri otváraní interpretovať stĺpec s časom inak. Ak sa tak stane, vyberte stĺpec s časom a nastavte jeho formát na „Text“ – alebo jednoducho použite .xlsx."
    ],
    "img": {
     "file": "table-prev",
     "alt": "Náhľad tabuľky: stĺpce indexu, začiatku, konca a textu so stavovým riadkom",
     "cap": "Každý titulok v náhľade; stavový riadok uvádza počet titulkov a celkové trvanie"
    }
   },
   {
    "h2": "Import tabuľky späť na titulky",
    "ps": [
     "Vyberte „do titulkov“, vložte hárok a tu platí pravidlo stĺpcov: vyžaduje tri stĺpce pre **začiatok, koniec a text** (anglické hlavičky Start / End / Text tiež fungujú) v **ľubovoľnom poradí**. `00:00:01,500` a `00:00:01.500` sú akceptované; riadky, ktoré sa nedajú spracovať, sa preskočia namiesto odsúdenia celého súboru.",
     "Výsledok je v náhľade uvedený po jednotlivých titulkoch; potvrďte a stiahnite SRT alebo VTT. Ak tieto tri stĺpce chýbajú, zobrazí sa správa s pokynom skontrolovať hlavičky – zvyčajne preto, lebo pri exporte bolo použité iné pomenovanie, alebo riadok hlavičky nie je prvým riadkom."
    ],
    "img": {
     "file": "table-back",
     "alt": "Oblast výsledkov titulkov: importované titulky zobrazené po jednotlivých položkách",
     "cap": "Nerozpoznané stĺpce sú hlásené, nikdy sa ticho neignorujú"
    }
   },
   {
    "h2": "Často kladené otázky",
    "ps": [
     "**Excel zobrazuje stĺpec s časom nesprávne?** Použite .xlsx a to sa nestane. Ak musíte použiť CSV: pred otvorením vyberte stĺpec s časom a nastavte formát bunky na „Text“.",
     "**Musia byť hlavičky stĺpcov v angličtine?** Nie. Start / End / Text sú rozpoznané v každom jazyku, ktorý táto stránka podporuje, a na veľkosti písmen nezáleží.",
     "**Zostali mi zalomenia riadkov po importe?** Áno. Zalomenia riadkov v dialógoch sú zachované presne až po pôvodné zalamovanie.",
     "**Je podporovaný formát ASS?** Táto stránka spracováva iba SRT a VTT. ASS obsahuje pokyny pre štýl – prekonvertujte ho najskôr na SRT pomocou nástroja [[Konvertor formátov|/convert.html]].",
     "**Koľko súborov naraz?** Jeden. Na spracovanie desiatok alebo stoviek použite [[Hromadná konverzia|/batch.html]] (ktorá konvertuje iba formáty a neprechádza cez tabuľku)."
    ]
   },
   {
    "h2": "Súkromie",
    "ps": [
     "Konverzia prebieha výlučne vo vašom prehliadači. Žiadny obsah titulkov sa nikdy neodosiela na server."
    ]
   },
   {
    "h2": "Súvisiace nástroje a príručky",
    "ps": [
     "Ak chcete iba krok prevodu titulkov do Excelu, pozrite [[Konverzia titulkov do Excelu|/guides/srt-to-excel.html]]; na následný preklad do iného jazyka [[Preklad titulkov|/translate.html]]; desiatky súborov naraz – [[Hromadná konverzia|/batch.html]]."
    ]
   }
  ]
 },
 "translate": {
  "seo": {
   "title": "Preklad titulkov pomocou AI – nahranie až po dvojjazyčný export – AI-SRTSub",
   "desc": "Prekladajte titulky pomocou AI: nahrajte SRT/VTT/ASS, vyberte si zo 100 jazykov, zlaďte mená pomocou slovníka a exportujte dvojjazyčné titulky. Začnite zadarmo, podpora vlastného API kľúča.",
   "h1": "Ako používať preklad titulkov pomocou AI",
   "intro": "Kompletný pracovný postup pre jeden súbor titulkov, od nahrania cez preklad až po export: čo je na obrazovke, na čo kliknúť a čo získate v každom kroku.",
   "ctaText": "Otvoriť prekladový nástroj"
  },
  "body": [
   {
    "h2": "Čo tento nástroj robí",
    "ps": [
     "Prekladá titulky z jedného jazyka do druhého a exportuje pripravený súbor titulkov. Typické potreby:"
    ]
   },
   {
    "h2": "Nahrať titulky",
    "ps": [
     "Kliknite na „Vybrať súbor titulkov“ alebo vložte text titulkov priamo do ľavého vstupného poľa. Podporovaných je šesť formátov: SRT, VTT, ASS, SSA, SBV a TXT. Nemáte po ruke žiadny súbor? Kliknutím na „Naťažiť vzorku“ si ho môžete pozrieť v akcii. Po analýze stredný stĺpec zobrazí tabuľku titulkov s indexom, časovou osou a zdrojovým textom pre každú položku."
    ],
    "img": {
     "file": "translate-upload",
     "alt": "Oblasť importu prekladového nástroja: výber súboru titulkov, pole na vloženie a tlačidlo na načítanie vzorky",
     "cap": "Ľavý stĺpec „Importovať titulky“: vyberte súbor, vložte text alebo načítajte vzorku"
    }
   },
   {
    "h2": "Vybrať jazyk a štýl",
    "ps": [
     "„Zdrojový jazyk“ môže zostať na automatickej detekcii; „cieľový jazyk“ sa vyberá zo 100 jazykov. K dispozícii je päť prekladových štýlov: Vyvážený (predvolený), Konverzačný, Formálny profesionálny, Štýl dabingu a Vlastný. „Štýl dabingu“ sa hodí pre filmové a televízne dialógy; „Formálny profesionálny“ sa hodí pre dokumenty a kurzy."
    ],
    "img": {
     "file": "translate-lang",
     "alt": "Nastavenia jazyka a prekladového štýlu: rozbaľovacie ponuky zdrojového jazyka, cieľového jazyka a päť štýlov",
     "cap": "„Jazyk“ a „prekladový štýl“: zdroj môže automaticky detegovať, 75 možností cieľa"
    }
   },
   {
    "h2": "Slovník: udržujte konzistentné mená",
    "ps": [
     "AI prekladá po dávkach, takže to isté meno môže v rôznych dávkach vyjsť dvoma rôznymi spôsobmi. Do slovníka napíšte pravidlá „zdroj → musí byť preložený ako“; pred každou dávkou ho nástroj prehľadá a riadi sa každou zhodou. Jedno pravidlo na riadok; šípky môžu byť `->`, `=>`, `→` alebo Tab; osamelý zdrojový výraz znamená, že sa má ponechať nepreložený; niekoľko pravopisov môže zdieľať jedno vyjadrenie cez `|`. Kliknutím na „✨ AI extrahovať“ nechajte AI najprv vytiahnuť vlastné mená z videa do tabuľky, potom ich upravte a preložte."
    ],
    "img": {
     "file": "translate-glossary",
     "alt": "Slovník a oblasť vlastných podstatných mien: vstupné pole slovníka s tlačidlami na AI extrakciu a uloženie",
     "cap": "Slovník „zjednotených mien“: AI extrahuje vlastné mená, po uložení sa automaticky načítajú pre nové videá"
    }
   },
   {
    "h2": "Proces prekladu",
    "ps": [
     "Kliknite na „▶ Spustiť preklad“ v hornom paneli. Stredný pásik so štatistikami v reálnom čase zobrazuje položky, preložené, vymazané výplne a skupiny viet naprieč položkami; panel priebehu ukazuje odhadovaný zostávajúci čas a spotrebované tokeny. Počas prekladu kliknite na ľubovoľnú prekladovú bunku v tabuľke a upravte text – zmeny sa uložia do vášho počítača a prežijú obnovenie stránky. Zatvorte stránku uprostred behu a ponúkne sa vám možnosť pokračovať tam, kde prestala. Keď jedna veta presahuje do viacerých položiek, skupina sa zlúči, preloží a doplní podľa trvania."
    ],
    "img": {
     "file": "translate-workspace",
     "alt": "Pracovný priestor prekladu: pásik so štatistikami, panel priebehu a upraviteľná tabuľka titulkov",
     "cap": "Stredný pracovný priestor: pásik so štatistikami + panel priebehu + upraviteľná tabuľka titulkov kliknutím"
    }
   },
   {
    "h2": "Exportovať",
    "ps": [
     "V pravom stĺpci najprv vyberte formu obsahu: iba preklad (jednojazyčný), dvojjazyčný s originálom navrchu alebo dvojjazyčný s prekladom navrchu; potom formát súboru: SRT, WebVTT, SBV, ASS alebo TXT. Výber ASS pridáva dva rozvrhnutia: rozdelené horné/dolné obrazovky a naskladané spodné riadky. Obsah a formát sa voľne kombinujú do 14 exportných štýlov. Šírka dvojjazyčného riadku sa nastavuje osobitne. Kliknutím na „Stiahnuť titulky“ súbor uložíte alebo kliknutím na „Kopírovať do schránky“ ho môžete ihneď vložiť."
    ],
    "img": {
     "file": "translate-export",
     "alt": "Panel exportu: tri formy obsahu, päť formátov súborov a nastavenia šírky dvojjazyčného riadku",
     "cap": "Export pravého stĺpca: najprv vyberte formu obsahu, potom formát súboru"
    }
   },
   {
    "h2": "Náklady a súkromie",
    "ps": [
     "Predvolený model nevyžaduje žiadnu registráciu ani kľúč – funguje hneď po vybalení s kvótami na požiadavku: denný limit na IP plus celoštatná denná kvóta. V prípade veľkých dávok zadajte vlastný API kľúč v časti „Prekladový motor“. Súkromie, podľa upozornenia na stránke: titulky pre predvolený model sa prenášajú cez server tejto stránky poskytovateľovi; vlastné API spravuje priamo vami zadaný poskytovateľ a kľúč zostáva vo vašom prehliadači. Analýza, zalamovanie riadkov a dvojjazyčné rozvrhnutie prebiehajú lokálne v prehliadači."
    ]
   },
   {
    "h2": "Často kladené otázky",
    "ps": [
     "**V preklade sa miešajú iné jazyky?** Nástroj deteguje posun jazyka a automaticky ho preloží znova; ak sa niekoľko položiek stále zdá nesprávnych, kliknite na bunku a opravte ich ručne.",
     "**A čo texty piesní?** „Filtrovanie obsahu“ ponúka tri možnosti pre texty piesní: preložiť texty, ponechať originál alebo ich vymazať.",
     "**Nejednotné preklady mien?** Pridajte nekonzistentné tvary do slovníka a preložte znova; slovník má prednosť pred globálnym nastavením „spracovania vlastných mien“.",
     "**Chcete angličtinu navrchu a čínštinu dole?** Pri exporte vyberte „Dvojjazyčne · originál navrchu“; pre čínštinu navrchu a angličtinu dole vyberte „Dvojjazyčne · preklad navrchu“."
    ]
   },
   {
    "h2": "Súvisiace nástroje a príručky",
    "ps": [
     "Nesprávny formát? Začnite s [[konverziou formátov|/convert.html]]; nesedí časová os? Použite [[úpravu časovej osi|/shift.html]]; pred odovzdaním ju prežeňte [[kontrolou kvality titulkov|/guides/subtitle-quality-check.html]]."
    ]
   }
  ]
 },
 "translate-english-to-chinese": {
  "seo": {
   "title": "Preklad anglických titulkov do čínštiny – AI-SRTSub",
   "desc": "Preložte anglické titulky do čínštiny: nahrajte SRT/VTT/ASS, vyberte zjednodušenú alebo tradičnú čínštinu a exportujte čínske alebo dvojjazyčné titulky. – AI-SRTSub",
   "h1": "Preklad anglických titulkov do čínštiny",
   "intro": "Anglické SRT na vstupe, čínske (alebo anglicko-čínske dvojjazyčné) titulky na výstupe: nahrajte, vyberte cieľový jazyk, exportujte – všetko na jednej stránke.",
   "ctaText": "Preložiť anglické titulky"
  },
  "body": [
   {
    "h2": "Kedy to budete potrebovať",
    "ps": [
     "Stiahnuť titulky sú iba v angličtine a nestíhate čítať; prípadne chcete čínske titulky pre rodinných príslušníkov, ktorí nevedia po anglicky. To, čo potrebujete, má jednu z troch podôb – **iba čínske titulky** alebo dvojjazyčné titulky s **čínštinou navrchu a angličtinou naspodku**, prípadne **angličtinou navrchu a čínštinou naspodku** – a tento nástroj dokáže vytvoriť všetky tri."
    ]
   },
   {
    "h2": "Ako na to",
    "ps": [
     "Otvorte [[AI Subtitle Translator|/translate.html]] a presuňte doň váš súbor s anglickými titulkami (podporované sú formáty SRT, VTT, ASS, SSA, SBV a TXT, prípadne môžete text jednoducho vložiť). „Zdrojový jazyk“ nechajte na automatickú detekciu, v „Cieľovom jazyku“ zvoľte zjednodušenú alebo tradičnú čínštinu a kliknite na „▶ Start translating“. Po dokončení vyberte v paneli exportu vpravo požadovaný formát obsahu: iba preklad (jednojazyčný), dvojjazyčný · originál navrchu (angličtina hore, čínština dole) alebo dvojjazyčný · preklad navrchu (čínština hore, angličtina dole), následne zvoľte formát súboru a stiahnite ho."
    ],
    "img": {
     "file": "translate-export",
     "alt": "Panel exportu: iba preklad, dvojjazyčný s originálom navrchu a dvojjazyčný s prekladom navrchu",
     "cap": "Pri exporte vyberte podobu obsahu: iba čínština alebo dvojjazyčné s angličtinou/čínštinou navrchu"
    }
   },
   {
    "h2": "Dva časté problémy",
    "ps": [
     "**Nezhodné preklady mien?** Umelá inteligencia prekladá po dávkach, takže to isté meno môže byť preložené dvoma spôsobmi. Do slovníka pridajte dvojice „zdroj → preložené meno“ (napr. `Watson → Huasheng`), aby ste zabezpečili jednotnosť v celom súbore.",
     "**Titulky nesedia s obrazom?** Najskôr preložte a až potom upravte načasovanie: panel nástrojov časovej osi v hornej časti pracovného prostredia obsahuje ovládanie globálneho posunu a mierky – pozrite si tému [[Subtitles drift out of sync toward the end|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "videosub": {
  "seo": {
   "title": "Extrahovanie vložených videotitulkov – stopy MKV / MP4 – AI-SRTSub",
   "desc": "Prečítajte si titulkové stopy v MKV, WebM, MP4 a MOV priamo a exportujte SRT / VTT / ASS / TXT. Žiadne nahrajúce, žiadne transkódovanie, zoznam všetkých jazykov, upozornenie na obrazové titulky.",
   "h1": "Ako extrahovať titulky vložené vo videu",
   "intro": "Prečítajte si titulkovú stopu uzavretú v súbore MKV / MP4 priamo ako SRT – video sa nikdy nenahráva, všetko sa číta v prehliadači.",
   "ctaText": "Otvoriť extrahovanie videotitulkov"
  },
  "body": [
   {
    "h2": "Čo tento nástroj robí",
    "ps": [
     "Titulky môžu byť uzavreté vo videokonjugácii namiesto toho, aby boli samostatné. Ak ich chcete upraviť, preložiť alebo spárovať, musíte ich najprv dostať von – to je presne to, čo robí táto stránka."
    ]
   },
   {
    "h2": "1 Pridajte video",
    "ps": [
     "Presuňte súbor videa do prvého stĺpca alebo kliknite a vyberte ho. Rozpoznané sú iba **MKV / WebM** a **MP4 / MOV**; iné kontajnery neposkytnú žiadnu stopu.",
     "Súbor nikdy neopustí váš počítač – neprebieha žiadne nahrávanie. Nástroj číta v malých blokoch podľa posunu, takže viacgigabajtový film nezaplní pamäť, ale prvé čítanie musí raz prejsť informácie o stope."
    ],
    "img": {
     "file": "videosub-up",
     "alt": "Oblasť pridania videa na stránke extrakcie vložených titulkov",
     "cap": "Podporované sú MKV / WebM a MP4 / MOV a súbor nikdy neopustí váš počítač"
    }
   },
   {
    "h2": "2 Vložené titulkové stopy",
    "ps": [
     "Po dokončení čítania druhý stĺpec vypíše titulkové stopy v súbore **po jednej na riadok**, zvyčajne s jazykom a názvom stopy (napríklad „Chinese“, „English“, „Forced“). Kliknutím na riadok extrahujete danú stopu.",
     "Keď súbor obsahuje iba jednu titulkovú stopu, extrakcia sa spustí automaticky – nie je potrebné kliknutie.",
     "**Obrazové titulky sa nedajú extrahovať**: Titulky Blu-ray PGS a DVD sú obrázky vypálené do streamu bez textu, ktorý by sa dal vziať, a stránka to jasne hovorí; tie vyžadujú OCR."
    ],
    "img": {
     "file": "videosub-track",
     "alt": "Zoznam vložených titulkových stôp, jedna na riadok",
     "cap": "Jedna stopa na riadok; ak je k dispozícii iba jedna, extrakcia sa spustí automaticky"
    }
   },
   {
    "h2": "3 Výsledok",
    "ps": [
     "„3 Result“ vpravo zobrazuje extrahovaný text titulkov s formátom exportu nad ním: **SRT / VTT / ASS / TXT**. Kliknite na „Download“ alebo „Copy“.",
     "Keď je zdrojová stopa vo formáte ASS, jej vlastná hlavička štýlu a rozlíšenie sa vrátia nezmenené – export ako ASS ich zachová, zatiaľ čo export ako SRT prenáša iba text."
    ],
    "img": {
     "file": "videosub-out",
     "alt": "Oblasť výsledkov s voľbou formátu SRT / VTT / ASS / TXT",
     "cap": "Štyri exportné formáty; zdroj ASS si zachováva hlavičku štýlu a rozlíšenie"
    }
   },
   {
    "h2": "Čo zostáva nedotknuté",
    "ps": [
     "Samotný súbor videa sa vôbec nemení – iba sa číta, žiadne zapisovanie, žiadne transkódovanie, žiadne remuxovanie.",
     "Obsah titulkov vychádza tak, ako je: žiadne hádanie kódovania, žiadna korekcia časovej osi. Ak sú extrahované titulky skreslené, ide o problém s kódovaním v zdrojovej stope – vezmite ich na [[Garbled text repair|/repair.html]]."
    ]
   },
   {
    "h2": "Často kladené otázky",
    "ps": [
     "**Naozaj neexistuje spôsob, ako spracovať obrazové titulky (PGS / DVD)?** Na tejto stránke nie – sú to obrázky bez textovej vrstvy. Najprv musí prebehnúť OCR a táto stránka to nerobí.",
     "**Extrahované titulky majú zlé načasovanie – prečo?** Táto stránka neupravuje časové osi; to, čo vyjde, je to, čo tam bolo. V prípade globálneho posunu alebo problému s rýchlosťou použite [[Timeline adjustment|/shift.html]].",
     "**Prečo to trvá tak dlho, kým sa niečo udeje?** Veľký súbor sa musí prechádzať po blokoch kvôli informáciám o stopách a čím väčší súbor, tým dlhšie to trvá; deje sa to lokálne a nemá to nič spoločné s vaším pripojením.",
     "**Môžem túto stránku použiť pre externé súbory titulkov?** Nemusíte – externý súbor .srt / .ass ide priamo do [[Format conversion|/convert.html]] alebo iného nástroja. Táto stránka je určená pre titulky, ktoré sú uzavreté vo vnútri videa."
    ]
   },
   {
    "h2": "Ochrana súkromia",
    "ps": [
     "Video sa číta výhradne v prehliadači: nič sa nenahráva, nič sa netranskóduje, nič neprechádza cez server. Zatvorte stránku a prečítané dáta sa uvoľnia."
    ]
   },
   {
    "h2": "Súvisiace nástroje a príručky",
    "ps": [
     "Ak chcete preložiť to, čo ste extrahovali, prejdite na [[Subtitle translation|/translate.html]], ak to chcete spraviť dvojjazyčným, pozrite si [[Two ways to make bilingual subtitles|/guides/make-bilingual-subtitles.html]]; informácie o rozdieloch medzi vloženými a externými stopami a o tom, ktoré z nich možno extrahovať, nájdete v časti [[How to get subtitles out of a video|/guides/extract-subtitles-from-video.html]]."
    ]
   }
  ]
 },
 "vtt-to-srt": {
  "seo": {
   "title": "Konvertor VTT na SRT – Konvertujte WebVTT titulky – AI-SRTSub",
   "desc": "Konvertujte titulky VTT (WebVTT) na SRT pre editori a prehrávače, ktoré podporujú iba SRT. Hlavička WEBVTT a bloky NOTE sa vyčistia automaticky. Spustí sa vo vašom prehliadači.",
   "h1": "VTT na SRT",
   "intro": "Premeňte VTT (WebVTT) titulky na SRT: presuňte súbor, vyberte SRT, stiahnite. Hlavička a bloky poznámok sa vyčistia a časové značky sa vrátia k zápisu s čiarkou.",
   "ctaText": "Konvertovať VTT → SRT"
  },
  "body": [
   {
    "h2": "Kedy potrebujete späť SRT",
    "ps": [
     "CapCut, Premiere, väčšina desktopových prehrávačov a staršie nástroje na titulky akceptujú iba **SRT**. Titulky stiahnuté z webu alebo YouTube sú zvyčajne vo formáte VTT – konvertujte ich na SRT, aby ste ich mohli priamo importovať."
    ]
   },
   {
    "h2": "Čo sa z VTT vyčistí",
    "ps": [
     "**Riadok hlavičky WEBVTT**, bloky NOTE, bloky STYLE/REGION a nastavenia titulkov za časovým riadkom (ako align:start) nie sú textom titulkov – automaticky sa odstránia; číslovanie sa obnoví a oddeľovač milisekúnd sa zmení z bodky na čiarku."
    ],
    "img": {
     "file": "convert-upload-vtt",
     "alt": "Oblasť nahrania: nahratý VTT súbor, rozpoznaný ako VTT",
     "cap": "Súbor s hlavičkou WEBVTT sa okamžite rozpozná ako VTT"
    }
   },
   {
    "h2": "Ako konvertovať",
    "ps": [
     "Otvorte [[converter|/convert.html]], vložte súbor VTT, vyberte **SRT - SubRip** ako výstup, potom skonvertujte a stiahnite. Hodnoty textu a načasovania zostanú nedotknuté."
    ],
    "img": {
     "file": "convert-result-srt",
     "alt": "Výsledok konverzie: číslovanie SRT s časovými značkami s čiarkou",
     "cap": "Konvertované SRT: čísla titulkov + časové značky s čiarkou"
    }
   }
  ]
 }
};
