/* i18n/gd-sl.js —— 43 篇指南页的sl译文（由 _mkgd.js 生成，勿手改）
 * 源：_gd/sl.json（Gemini 翻译，_gemgd.js 产出）
 * 结构：{ <slug>: { seo:{title,desc,h1,intro,ctaText}, body:[{h2,ps[],img}] } }
 * ⚠️ server.js 自己 require 它，不被任何 html 引用 —— 部署时必须显式加进传输列表。
 */
module.exports = {
 "ass-to-srt": {
  "seo": {
   "title": "Pretvornik iz ASS v SRT – Pretvorite podnapise ASS/SSA – AI-SRTSub",
   "desc": "Pretvorite podnapise ASS (in SSA) v navaden SRT: besedilo in časovne oznake se izvlečejo takšne, kot so, oznake sloga pa ostanejo zadaj. Za programsko opremo, ki podpira samo SRT. Deluje v vašem brskalniku.",
   "h1": "ASS to SRT :: Iz ASS v SRT",
   "intro": "Pretvorite podnapise ASS (ali SSA) v SRT: spustite datoteko, izberite SRT, prenesite. Besedilo in časovne oznake se izvlečejo takšne, kot so; oznake sloga se ne prenesejo.",
   "ctaText": "Convert ASS → SRT :: Pretvori ASS → SRT"
  },
  "body": [
   {
    "h2": "Ko potrebujete nazaj SRT",
    "ps": [
     "Urejevalni programi, sprejemniki set-top box, televizijski predvajalniki, prevajalska orodja – številni nadaljnji koraki sprejemajo samo **SRT**. Zapleteno oblikovanje in pozicioniranje v ASS tam nimata pomena, zato je navaden SRT najvarnejša izbira."
    ]
   },
   {
    "h2": "Kaj se zgodi z oznakami sloga",
    "ps": [
     "Vsak iztočnik ASS je vrstica Dialog, katere besedilo pogosto vsebuje preglasitvene oznake, kot je `{\\fonts}` za barvo, gibanje ali učinke. Pretvorba v SRT **te oznake skupaj s slogom odstrani**, obdrži pa samo besedilo in čas; prelomnice vrstic `\\N` postanejo pravi prelomi vrstic. Datoteke SSA so prav tako berljive."
    ],
    "img": {
     "file": "convert-result-srt",
     "alt": "Rezultat pretvorbe: oštevilčenje SRT in besedilo, izvlečeno iz ASS",
     "cap": "Izvlečeni SRT: ena številka na iztočnik, čisto besedilo"
    }
   },
   {
    "h2": "How to convert :: Kako pretvoriti",
    "ps": [
     "Odprite [[pretvornik|/convert.html]], vrzite vanj datoteko ASS (deluje tudi .ssa), kot izhod izberite **SRT - SubRip**, nato pretvorite in prenesite. Greste v nasprotni smeri? Glejte [[SRT v ASS|/guides/srt-to-ass.html]]."
    ]
   }
  ]
 },
 "batch": {
  "seo": {
   "title": "Kako množično pretvoriti podnapise – Stotine v en ZIP – AI-SRTSub",
   "desc": "Vodič: spustite na desetine datotek SRT/VTT, jih pretvorite v en format, prenesite en sam ZIP. Ponovno oštevilčeno, časovne oznake normalizirane, neobdelane datoteke označene namesto tihega tihotapljenja v arhiv.",
   "h1": "Kako množično pretvoriti podnapise",
   "intro": "Celotna sezona podnapisov mora običajno končati v enem formatu, njihovo nalaganje enega za drugim pa traja večno. Vse jih spustite sem, jih skupaj pretvorite in prenesite en ZIP – datoteke, ki jih ni mogoče razčleniti, so označene in nikoli tiho vključene, kot da bi delovale.",
   "ctaText": "Odprite množično pretvorbo"
  },
  "body": [
   {
    "h2": "What this tool does :: Kaj počne to orodje",
    "ps": [
     "Podnapisi za celotno sezono ali komplet morajo biti običajno enotni, preden lahko z njimi storite karkoli drugega. To počne stran za množično obdelavo:"
    ]
   },
   {
    "h2": "Adding files :: Dodajanje datotek",
    "ps": [
     "Povlecite več datotek s podnapisi skupaj v črtkano polje ali kliknite in več izberite v eni potezi. Seznam datotek prikazuje vsako posebej: razčlenjene datoteke prikazujejo število iztočnikov, nerazčlenjene pa so označene preprosto kot neprepoznane. Zgornja vrstica sešteva število datotek, število iztočnikov in koliko jih je ostalo neprepoznanih.",
     "⚠️ Ta stran bere samo UTF-8. Vse s pokvarjenim kodiranjem (zaslon, poln vprašajev ali kvadratkov) mora najprej skozi [[Popravilo kodiranja (Mojibake)|/repair.html]]."
    ],
    "img": {
     "file": "batch-list",
     "alt": "Seznam datotek: ime in število iztočnikov na datoteko, neprepoznane označene rdeče",
     "cap": "Vsaka datoteka je na seznamu, neprepoznane pa so takoj označene"
    }
   },
   {
    "h2": "V kaj pretvoriti vse",
    "ps": [
     "Pod »Pretvori vse v« izberite ciljni format – SRT ali VTT. Vsaka datoteka na seznamu se nato ponovno ustvari v tem formatu: številke iztočnikov so ponovno oštevilčene od vrha, časovne oznake so normalizirane na cilj (SRT ločuje milisekunde z vejico, VTT s piko).",
     "**Prvotna imena datotek se ohranijo, spremeni pa se le končnica**; podvojenim imenom se doda številka, da se nič ne prepiše."
    ],
    "img": {
     "file": "batch-up",
     "alt": "Izbirnik ciljnega formata in stanje seznama z vrstico s statistiko, ki prikazuje število datotek in iztočnikov",
     "cap": "Izberite ciljni format in vsaka datoteka se ponovno ustvari; datotekam se spremeni samo končnica"
    }
   },
   {
    "h2": "Pakiranje in prenos",
    "ps": [
     "Kliknite »Zapakiraj v en ZIP in prenesi« in arhiv vsebuje vsako pretvorjeno datoteko. **Datoteke brez prepoznavnih iztočnikov ostanejo izven arhiva** – ostanejo na seznamu in so označene, namesto da bi se mešale z drugimi, kot da bi jim uspelo. Ko so zapakirane, dobite podatek o številu datotek v paketu."
    ],
    "img": {
     "file": "batch-zip",
     "alt": "Območje pakiranja: gumb za prenos ZIP in sporočilo o rezultatu pakiranja",
     "cap": "Neprepoznane datoteke ostanejo zunaj arhiva in ostanejo označene na seznamu"
    }
   },
   {
    "h2": "Zakaj je datoteka označena kot neprepoznana",
    "ps": [
     "Datoteka je označena, ko iz nje ni mogoče prebrati nobenih iztočnikov. Trije običajni razlogi: sploh niso podnapisi (recimo zablodela datoteka .txt readme), kodiranje ni UTF-8 (zato se bere le kot nadomestni znaki) ali pa je vsebina sploščena v en blok brez časovnih oznak.",
     "Z označenimi datotekami je mogoče ravnati posamično: težave s kodiranjem gredo v [[Popravilo kodiranja|/repair.html]], težave s formatom pa v [[Pretvornik formatov|/convert.html]] za samostojno pretvorbo, preden se vrnejo na seznam."
    ]
   },
   {
    "h2": "FAQ :: Pogosta vprašanja",
    "ps": [
     "**Koliko datotek lahko dodam?** Trdne omejitve ni; odvisno je od pomnilnika vašega brskalnika, nekaj sto datotek SRT pa je običajno v redu.",
     "**Ali spreminja moj dialog?** Ne. Množična pretvorba spremeni samo format vsebnika – ponovno oštevilči iztočnike in normalizira časovne oznake – in nikoli niti besede dialoga.",
     "**Kaj pa, če moram spremeniti vsebino?** Ta stran pretvarja samo formate. Za množično spreminjanje časa uporabite [[Prilagoditev časa|/shift.html]]; za spreminjanje besedila uporabite [[Zamenjava izrazov|/glossary.html]]; oboje deluje od datoteke do datoteke.",
     "**Ali je ASS podprt?** Ta stran pretvarja samo med formatoma SRT in VTT. ASS vsebuje obliko – nanj posamično uporabite [[Pretvornik formatov|/convert.html]]."
    ]
   },
   {
    "h2": "Privacy :: Zasebnost",
    "ps": [
     "Pretvorba in pakiranje potekata v celoti v vašem brskalniku. Nobena vsebina podnapisov se nikoli ne pošlje na strežnik."
    ]
   },
   {
    "h2": "Povezana orodja in vodniki",
    "ps": [
     "Kaj spremeniti za celotno sezono in v kakšnem vrstnem redu – [[Mnoično urejanje celotne sezone podnapisov|/guides/batch-convert-srt.html]]; več formatov za eno datoteko – [[Pretvornik formatov|/convert.html]]; lektoriranje v preglednici – [[Podnapisi ⇄ tabela|/table.html]]."
    ]
   }
  ]
 },
 "batch-convert-srt": {
  "seo": {
   "title": "Množično urejanje celotne sezone – Kaj deluje v obsegu, kaj pa ne – AI-SRTSub",
   "desc": "Sezona običajno potrebuje povsod enako spremembo: enoten format, časovni zamik, terminologijo. Tukaj je navedeno, kaj se zaključi v enem prehodu, česa ni mogoče in kako ravnati z datotekami, ki se ne razčlenijo pravilno.",
   "h1": "Množično urejanje celotne sezone podnapisov",
   "intro": "Ko je treba spremeniti na desetine datotek s podnapisi, gre običajno vsakič za isto spremembo. Poznavanje delov, ki jih je mogoče opraviti v enem prehodu, prihrani veliko več časa kot mučenje z njimi enega za drugim.",
   "ctaText": "Odprite množično pretvorbo"
  },
  "body": [
   {
    "h2": "Običajno je povsod enaka sprememba",
    "ps": [
     "Ko gredo podnapisi narobe za celotno sezoni, ima vsaka epizoda redko svojo zasebno težavo – običajno je en sam vzrok, ki prizadene vsako epizodo: iste izdajateljske skupine so kodirale vse (zato se format in vodni žigi ujemajo), vse so bile časovno usklajene z isto različico videa (zato se smer in količina zamika ujemata) ali pa so se prepisi med sezono razšli.",
     "Najprej preverite dve epizodi – eno zgodnjo in eno pozno – in potrdite, da gre res za **isto težavo**, preden karkoli množično obdelate. Če se ne ujemata, tega ni mogoče popraviti z množično obdelavo."
    ]
   },
   {
    "h2": "Kaj je mogoče storiti v enem prehodu",
    "ps": [
     "**Poenotenje formata** je edina stvar, ki se resnično zaključi v enem prehodu: skupaj povlecite na desetine datotek SRT in VTT v [[Množično pretvorbo|/batch.html]], izberite ciljni format in prenesite en ZIP. Ponovno oštevilčenje in normalizacija časovnih oznak se zgodita v istem koraku, pri čemer se ne spremeni niti ena beseda dialoga."
    ],
    "img": {
     "file": "batch-list",
     "alt": "Seznam datotek na strani za množično obdelavo: število iztočnikov na datoteko, neprepoznane označene rdeče",
     "cap": "Enoten format je edina stvar, ki se resnično zaključi v enem samem prehodu"
    }
   },
   {
    "h2": "Kaj je treba storiti od datoteke do datoteke",
    "ps": [
     "Ti nimajo vstopne točke za množično obdelavo in potrebujejo prehod za vsako datoteko posebej – čeprav običajno obstaja enakovredna rešitev, ki jo je treba **narediti samo enkrat in nato velja za celotno sezono**:"
    ]
   },
   {
    "h2": "Get the order right :: Uredite vrstni red",
    "ps": [
     "Ko je treba postoriti več stvari, napačen vrstni red pomeni ponovno delo. Pojdite v tem vrstnem redu:",
     "**Popravi kodiranje** → **poenoti format** → **spremeni vsebino** (vodni žigi, terminologija, čas) → **Nadzor kakovosti na koncu**. Pretvarjanje formatov pred popravilom kodiranja vam prinese le popačenke (mojibake) v drugem vsebniku; spreminjanje vsebine pred poenotenjem formatov pomeni delo z neusklajeno podporo orodij."
    ],
    "img": {
     "file": "batch-zip",
     "alt": "Območje pakiranja: gumb za prenos ZIP in sporočilo o rezultatu",
     "cap": "Najprej poenotite formate, nato spremenite vsebino"
    }
   },
   {
    "h2": "Obravnava datotek, ki niso bile prepoznane",
    "ps": [
     "Datoteke, označene kot neprepoznane pri množični pretvorbi, so izpuščene iz ZIP-a in ostanejo na seznamu. Trije običajni razlogi: ni datoteka s podnapisi (zalutala datoteka readme), kodiranje ni UTF-8 ali pa je bila vsebina sploščena v en sam blok brez časovnih oznak.",
     "Težave s kodiranjem gredo posamično v [[Popravilo kodiranja|/repair.html]]; težave s formatom v [[Pretvornik formatov|/convert.html]], preden jih vrnete na seznam. **Ne silite neprepoznanih datotek v arhiv samo zato, da bi povečali število** – odkrivanje manjkajoče epizode v vašem predvajalniku stane veliko več kot minuta, ki jo s tem prihranite."
    ]
   },
   {
    "h2": "Povezana orodja in vodniki",
    "ps": [
     "Celotni vodnik po množični obdelavi – [[Kako množično pretvoriti podnapise|/guides/batch.html]]; enotni časovni zamiki – [[Kako prilagoditi čas podnapisov|/guides/shift.html]]; zadnji prehod pred oddajo – [[Nadzor kakovosti podnapisov|/qc.html]]."
    ]
   }
  ]
 },
 "bilingual": {
  "seo": {
   "title": "Kako razdeliti ali združiti dvojezične podnapise – AI-SRTSub",
   "desc": "Štiri možnosti odstranjevanja dvojezičnih podnapisov: obdržite samo eno sled, razdelite v dve datoteki ali združite v en vnos z dvema vrsticama. Obe obliki sta samodejno zaznani v vašem brskalniku.",
   "h1": "Kako odstraniti dvojezične podnapise",
   "intro": "Želite razdeliti dvojezične podnapise, jih združiti ali obdržati samo eno sled? Ta vodnik predstavlja vse štiri načine: kako deluje zaznavanje, kateri način izbrati in kaj dobite ob izvozu.",
   "ctaText": "Odprite odstranjevalec dvojezičnih podnapisov"
  },
  "body": [
   {
    "h2": "Čemu služi to orodje",
    "ps": [
     "Imate dvojezične podnapise, vendar želite samo eno od sledi – ali obratno, želite razdeliti ali združiti sledi:"
    ]
   },
   {
    "h2": "Kako zaznava dvojezično vsebino",
    "ps": [
     "Dvojezični podnapisi z dvema sledema se pojavljajo v dveh pogostih oblikah, orodje pa prepozna vsako – **brez ugani jezika**: **Oblika A (en vnos, dve vrstici)** deli sledi glede na pisni sistem – kana, hangul, hanzi, latinica in drugi sistemi, skupaj deset; dva različna sistema pomenita dvojezičnost, kateri koli se pojavi prvi, pa šteje kot izvirnik. En sam sistem (na primer dolga kitajska vrstica, zavita v dve) se obravnava kot enojezičen in se ohrani nespremenjen. **Oblika B (dva ločena vnosa z enakim časom)** deli sledi po položaju – vnosa z enakim časovnim žigom tvorita par, prvi šteje kot izvirnik, kombinacije, ki si delijo latinico, kot sta angleško-francoska ali angleško-nemška, pa se prav tako pravilno ločijo. Ko ni zaznane dvojezične vsebine, sta izbirnik načina in gumb Začni zasenčena skupaj z jasnim obvestilom, zato nikoli na silo ne deli v napačne rezultate."
    ]
   },
   {
    "h2": "The Four Modes :: Štirje načini",
    "ps": [
     "V spustnem meniju »Katero želite?« izberite enega od štirih: **Obdrži samo izvirnik** in **Obdrži samo prevod** ustvarita vsak svojo datoteko; **Razdeli na dvoje** ustvari izvirno datoteko in datoteko s prevodom, pri čemer imeni datotek nosita samodejni oznaki `.orig` / `.dst`, da se prepreči prepisovanje; **Združi v en vnos z dvema vrsticama** spremeni vsak par v dvojezični vnos – izvirnik v eni vrstici, prevod v drugi – medtem ko se enojezični pari ohranijo takšni, kot so, in se ne izmišljuje druge vrstice. Ko preklopite načine ali izhodne formate, se obstoječa vsebina samodejno ponovno zažene – ponovni klik na gumb Začni ni potreben."
    ],
    "img": {
     "file": "bilingual-modes",
     "alt": "Izbira načina v odstranjevalcu dvojezičnih podnapisov: obdrži izvirnik, obdrži prevod, razdeli na dvoje, združi v en vnos z dvema vrsticama",
     "cap": "Štirje načini: obdrži eno sled, razdeli na dvoje ali združi v en vnos z dvema vrsticama"
    }
   },
   {
    "h2": "Input and Output :: Vhod in izhod",
    "ps": [
     "Prebere sedem formatov – SRT, VTT, ASS, SSA, SBV, LRC, TXT (najprej končnica datoteke, kot rezervna možnost pa vohunjenje vsebine) – in izvozi štiri: SRT, VTT, ASS, TXT. Deluje katera koli vhodno-izhodna kombinacija, zato med potjo poteka pretvorba med formati. Prelomi vrstic ASS `\\N` se povrnejo v prave prelomi vrstic, oznake učinkov pa se pri medformatnem izvozu odstranijo."
    ]
   },
   {
    "h2": "Results and Export :: Rezultati in izvoz",
    "ps": [
     "Rezultati so v celoti prikazani v polju z besedilom samo za branje, vsaka datoteka ima statistiko števila vnosov in skupnega trajanja; gumba Prenesi in Kopiraj odneseta datoteko neposredno. Območje rezultatov je predogled – tu ni urejanja besedila ali časa. Če želite spremeniti, najprej izvozite, nato uporabite ustrezno orodje."
    ],
    "img": {
     "file": "bilingual-result",
     "alt": "Območje rezultatov odstranjevanja: predogled samo za branje, statistika števila vnosov ter gumba za prenos/kopiranje",
     "cap": "Predogled celotnega besedila + statistika vnosov in trajanja + prenos in kopiranje"
    }
   },
   {
    "h2": "FAQ :: Pogosta vprašanja",
    "ps": [
     "**En vnos ima angleščino v eni vrstici in francoščino v drugi – zakaj se ne razdeli?** Oblika A deli sledi po pisnem sistemu, zato dveh jezikov, ki si v enem vnosu delita isti sistem, ni mogoče ločiti. Preoblikujte jo v obliko B (dva vnosa na isti časovnici) in delitev glede na položaj bo delovala.",
     "**Samo ena datoteka v prenosu?** Nastavitve »Ohrani samo izvirnik«, »Ohrani samo prevod« in »Združi v en vnos v dveh vrsticah« že po zasnovi ustvarijo eno samo datoteko; samo možnost »Razdeli na dve« vam da dve, označeni z `.orig` / `.dst`.",
     "**Ali lahko obdelujem serijsko?** Ena datoteka naenkrat; čakalne vrste niso podprte.",
     "**Ali nalaga moje podnapise?** Ne – razčlenjevanje in izvoz potekata v celoti v vašem brskalniku."
    ]
   },
   {
    "h2": "Related Guides :: Povezani vodniki",
    "ps": [
     "Za hiter način razdelitve dveh sledi glejte [[Razdelitev dvojezičnih podnapisov na dve sledi|/guides/split-bilingual-subtitles.html]]; o nastajanju dvojezičnih podnapisov glejte [[Dva načina za izdelavo dvojezičnih podnapisov|/guides/make-bilingual-subtitles.html]]; za strojno prevajanje uporabite [[Prevajanje podnapisov z umetno inteligenco|/translate.html]]."
    ]
   }
  ]
 },
 "clean": {
  "seo": {
   "title": "Čistilec podnapisov – odstranite vodne žige, oglasne vsebine, SDH – AI-SRTSub",
   "desc": "Čistilec podnapisov: pravila 13 odstranijo vodne žige, oglase, napise SDH, oznake HTML, dvojnike; vsaka sprememba ima primerjavo (diff) in jo je mogoče razveljaviti. SRT/VTT/ASS, vse v brskalniku.",
   "h1": "Kako uporabljati čistilec podnapisov",
   "intro": "Podnapisi, preneseni iz spleta, imajo pogosto vodne žige, oglase in napise SDH. Čistilec uporabi pravila 13 v enem prehodu, vsaka sprememba pa je primerljiva in povratna.",
   "ctaText": "Odprite čistilec podnapisov"
  },
  "body": [
   {
    "h2": "What this tool does :: Kaj počne to orodje",
    "ps": [
     "Prenesene datoteke s podnapisi imajo pogosto vsebine, ki jih ne bi smele imeti. Čistilec jih odstrani v enem prehodu na podlagi pravil:"
    ]
   },
   {
    "h2": "Upload and detect :: Naloži in zaznaj",
    "ps": [
     "Povlecite datoteko ali kliknite za nalaganje – podprti so SRT, VTT, ASS, SSA in TXT – ali neposredno prilepite besedilo podnapisov. Kodiranje se samodejno zazna: če dekodiranje UTF-8 ustvari nadomestne znake, preklopi na GBK ali Big5, stran pa prikaže sporočilo »Kodiranje popravljeno na {encoding}«. Če naložite dvojezične podnapise z dvema sledema (dve enaki časovnici, ena kitajska in ena angleška), se združijo v eno dvojezično sled s stikalom »izvirnik zgoraj / prevod zgoraj«."
    ]
   },
   {
    "h2": "Konfiguriranje pravil 13",
    "ps": [
     "Vmesnik ima štiri skupine s potrditvenimi polji 13: **Oznake in oblikovanje** (učinki ASS, oznake HTML, krmilni znaki, ponovno oštevilčenje po razvrščanju), **SDH in zvočni učinki** (podnapisi SDH, oznake govorcev, čiste vrstice besedil pesmi), **Vodni žigi in neželeni vnosi** (vodni žigi in oglasi, podvojeni vnosi, prazni vnosi), **Popravki besedila** (ločila in presledki, popravek velikih črk, združevanje kratkih vrstic). Privzeto so vklopljeni samo elementi »brez izgube in zanesljivi«; elementi, ki lahko izgubijo vsebino (vrstice pesmi, popravek velikih črk, združevanje kratkih vrstic), so izklopljeni – vklopite jih po potrebi. Vsak element ima namig ob lebdenju ⓘ, vsaka sprememba potrditvenega polja pa se takoj ponovno zažene."
    ],
    "img": {
     "file": "clean-opts",
     "alt": "Vmesnik možnosti čiščenja: štiri skupine potrditvenih polj 13, število aktivnih je prikazano na vrhu",
     "cap": "Štiri skupine, pravila 13; privzeto so vklopljeni samo elementi brez izgube, spremembe pa veljajo takoj"
    }
   },
   {
    "h2": "Change diff and undo :: Primerjava sprememb in razveljavitev",
    "ps": [
     "Rezultati se ne prepišejo neposredno: vsaka sprememba je navedena v primerjalni tabeli z oznako pravila (zakaj je bil ta vnos urejen ali izbrisan). Želite enega nazaj? Kliknite »Obnovi« v tisti vrstici; »Obnovi vse« vrne vse nazaj z enim klikom, s ponovnim klikom pa se celotno čiščenje ponovno uveljavi. Vrstica s statistiko prikazuje število izvirnih / očiščenih / izbrisanih / spremenjenih / obnovljenih elementov."
    ],
    "img": {
     "file": "clean-diff",
     "alt": "Tabela primerjave sprememb: indeks, čas, izvirno vs. očiščeno besedilo, oznaka pravila v vsaki vrstici",
     "cap": "Vsaka sprememba nosi oznako pravila; obnovite posamezne vrstice ali vse hkrati"
    }
   },
   {
    "h2": "Preview and export :: Predogled in izvoz",
    "ps": [
     "Preklapljajte med pogledoma »Očiščeno / Izvirno«. V izvirnem pogledu so izbrisani vnosi prečrtani in označeni z »Izbrisano«, izvožena datoteka pa se popolnoma ujema s predogledom. Izhodni formati: SRT (privzeto), VTT, ASS (na voljo, ko je vir ASS, z nespremenjenim razdelkom sloga) in navadno besedilo TXT brez časovnic. Ime datoteke samodejno dobi oznako `.clean`."
    ],
    "img": {
     "file": "clean-preview",
     "alt": "Predogled celotnega besedila: očiščen in izzivni pogled s statistično vrstico s števci",
     "cap": "Dva pogleda predogleda, kar vidiš, to dobiš"
    }
   },
   {
    "h2": "FAQ :: Pogosta vprašanja",
    "ps": [
     "**Ali bo pomotoma izbrisalo normalen dialog?** Pravilo za vodne žige najprej odstrani vrstice z vodnimi žigi (ohrani vrstice dialoga znotraj dvojezičnih vnosov) in izbriše celoten vnos le, če ostanejo sledi; odstranjevanje SDH se dotakne samo vsebine v oklepajih s ključnimi besedami SDH, ki je dolga 40 znakov ali manj – navaden oklepajski dialog ostane.",
     "**Kako se čiste vrstice besedil pesmi razlikujejo od besedil znotraj dialoga?** Izbrišejo se samo vnosi, kjer je vsaka posamezna vrstica zavita v glasbene note ♪ ali oznake, kot je [music]; dialog, ki vsebuje besedila, se ohrani.",
     "**Ali lahko oznake govorcev vplivajo na kitajsko besedilo?** Ujema se samo alfanumerično ime z velikimi črkami na začetku vrstice, ki mu sledi dvopičje (kot je `GEORGE:`); kitajski stavki z dvopičjem se nikoli ne ujemajo.",
     "**Ali lahko očistim več datotek hkrati?** Ne – ena datoteka na zagon. Prenesite rezultat, nato naložite naslednjega."
    ]
   },
   {
    "h2": "Privacy :: Zasebnost",
    "ps": [
     "Čiščenje poteka v celoti v vašem brskalniku; nobena vsebina podnapisov se nikoli ne pošlje na strežnik."
    ]
   },
   {
    "h2": "Povezana orodja in vodniki",
    "ps": [
     "Za kratek vodič, osredotočen na odstranjevanje vodnih žigov in oglasov, glejte [[odstranjevanje oglasov in vodnih žigov s podnapisov|/guides/remove-subtitle-ads.html]]; pred oddajo poženite datoteko skozi [[preverjanje kakovosti podnapisov|/guides/subtitle-quality-check.html]]; za spremembo formatov uporabite [[pretvorbo formatov|/convert.html]]."
    ]
   }
  ]
 },
 "convert": {
  "seo": {
   "title": "Kako pretvoriti formate podnapisov (SRT, VTT, ASS, SBV, LRC, TXT) – AI-SRTSub",
   "desc": "Ilustriran vodnik po pretvorniku: spustite datoteko, preverite zaznani format, izberite izhodni format, obdelajte dvojezično besedilo in prenesite. Vse deluje v vašem brskalniku.",
   "h1": "Vodnik po pretvorniku formatov podnapisov",
   "intro": "Ta vodnik vodi skozi stran od vrha do dna: naložite podnapis, potrdite zaznani format, izberite izhodni format in prenesite. Vse deluje v vašem brskalniku – nobena datoteka nikoli ne zapusti vaše naprave.",
   "ctaText": "Odprite pretvornik podnapisov"
  },
  "body": [
   {
    "h2": "Load your subtitles :: Naložite svoje podnapise",
    "ps": [
     "Povlecite datoteko v črtkano polje ali kliknite, da jo izberete; vsebino lahko tudi **prilepite** neposredno v polje z besedilom. Format se zazna iz končnice in vsebine, rezultat pa je prikazan v oznaki formata."
    ],
    "img": {
     "file": "convert-upload",
     "alt": "Območje nalaganja: naložen vzorec SRT, zaznan kot SRT",
     "cap": "Zaznani format je prikazan v oznaki – v dvomih najprej preverite tukaj"
    }
   },
   {
    "h2": "Izberite izhodni format",
    "ps": [
     "V spustnem meniju izberite ciljni format: šest možnosti – srt, vtt, ass, sbv, lrc, txt. Pretvorba v ass obnovi privzeti slog 1920×1080 (belo besedilo, črna obroba, spodaj na sredini) in **ne ohrani prvotnih pisav ali barv**; txt izvozi samo besedilo, brez časa."
    ],
    "img": {
     "file": "convert-opt",
     "alt": "Spustni meni izhodnega format z izbranim VTT",
     "cap": "Izhodni format ne sledi vhodu – izberete ga sami"
    }
   },
   {
    "h2": "Bilingual handling :: Obravnava dvojezičnosti",
    "ps": [
     "Če je datoteka dvojezična (dve vrstici v enem iztočniku ali prepleteni iztočniki), se postavitev med pretvorbo ohrani nespremenjena. Izbira »ohrani dvojezičnost« razdeli jezika v zgornjo in spodnjo vrstico, vsako posebej; krmilnik je onemogočen, ko ni zaznano dvojezično besedilo."
    ]
   },
   {
    "h2": "Convert and download :: Pretvori in prenesi",
    "ps": [
     "Kliknite »Pretvori«: plošča z rezultati prikazuje število iztočnikov in skupno trajanje, besedilo pa je pripravljeno za pregled. Kliknite **Prenesi**, da shranite datoteko, ali **Kopiraj**, da vzamete besedilo neposredno. Pretvorba nikoli ne spremeni časovnih vrednosti – zapiše samo format. Za spreminjanje časovnih žigov uporabite [[orodje za časovno usklajevanje|/shift.html]]."
    ],
    "img": {
     "file": "convert-result",
     "alt": "Plošča z rezultati: število iztočnikov in skupno trajanje z gumboma za prenos in kopiranje",
     "cap": "6 iztočnikov, skupaj 0:23 – preglejte besedilo pred prenosom"
    }
   }
  ]
 },
 "extract": {
  "seo": {
   "title": "Izvleček navadnega besedila iz podnapisov – Dve postavitvi, pet čiščenj – AI-SRTSub",
   "desc": "Izvlecite dialog iz podnapisov kot čisto navadno besedilo: neprekinjene odstavke ali eno vrstico na iztočnik ter kaj odstranijo stikala za napise SDH, vodne žige, dvojnike, predpone in besedila pesmi.",
   "h1": "Kako izvleči navadno besedilo iz podnapisov",
   "intro": "Izvlecite dialog iz datoteke s podnapisi kot čisto navadno besedilo: številke iztočnikov, časovne linije in oznake sloga se samodejno odstranijo, zato se rezultat bere kot članek ali deluje kot seznam dialogov.",
   "ctaText": "Odprite odstranjevalec navadnega besedila"
  },
  "body": [
   {
    "h2": "What this tool does :: Kaj počne to orodje",
    "ps": [
     "Bralcu je pomemben samo dialog v datoteki s podnapisi; preostalo je struktura, namenjena predvajalniku – številke iztočnikov, časovne linije, oznake sloga. Ta stran odstrani strukturo in obdrži besede."
    ]
   },
   {
    "h2": "Spustite vanj, ne le naložite",
    "ps": [
     "Stolpec »1 Dodaj podnapise« na levi sprejme naloženo datoteko, vsebino podnapisov pa lahko prilepite tudi neposredno v polje za besedilo. Če ste izbrali napačno datoteko, kliknite »Počisti« in začnite znova.",
     "Ta stran bere datoteke kot UTF-8. Če se podnapisi odprejo kot zid vprašajev ali kvadratkov, je kodiranje pokvarjeno – najprej ga pretvorite v UTF-8 v [[Popravilu popačenega besedila|/repair.html]] in se nato vrnite."
    ],
    "img": {
     "file": "extract-up",
     "alt": "Območje dodajanja podnapisov v odstranjevalcu navadnega besedila",
     "cap": "Naložite datoteko ali prilepite vsebino podnapisov neposredno v polje z besedilom"
    }
   },
   {
    "h2": "Izbira med obema postavitvama",
    "ps": [
     "Na vrhu »Možnosti izpisa 2« je postavitev: **Neprekinjeni odstavki** prelomijo besedilo ob premorih in ločilih na koncu stavkov, tako da se bere kot članek; **Ena vrstica na iztočnik** poda eno vrstico na vnos podnapisa, ki se ena na ena ujema z vnosom izvirne datoteke.",
     "Kopiranje dialoga za opombe, vadbo prevajanja ali branje kot prozo zahteva neprekinjene odstavke; izdelava seznama dialogov, primerjava vrstico za vrstico z izvirnikom ali dovajanje drugega orodja pa zahteva eno vrstico na iztočnik."
    ],
    "img": {
     "file": "extract-opt",
     "alt": "Postavitev in stikala za čiščenje pod možnostmi izpisa",
     "cap": "Izberite eno postavitev; spodnjih pet stikal določa, katera vrsta vsebine se odstrani"
    }
   },
   {
    "h2": "Kaj odstrani posamezno od petih čiščenj",
    "ps": [
     "**Odstrani iztočnike SDH**: izbriše zvočne opise v oklepajih, kot sta »(koraki)« ali »[glasba]«, in ohrani dialog.",
     "**Odstrani vodne žige in oglase**: opusti vrstice, kot so zasluge za ljubiteljske napise (fansub), URL-ji in uporabniška imena kanalov.",
     "**Odstrani podvojene sosede**: ko se isti stavek pojavi dvakrat zapored (napaka pri predvajanju), se obdrži samo ena kopija; bolj oddaljeni dvojniki nosijo pomen in ostanejo nespremenjeni.",
     "**Odstrani predpone govorcev**: »JOHN: Zdravo« postane »Zdravo«. Privzeto izklopljeno – besedilo v slogu scenarija mora prikazovati, kdo govori.",
     "**Preskoči vrstice besedil pesmi**: vrstice, ki so v celoti »♪ … ♪«, se preskočijo. Privzeto izklopljeno – besedila pesmi so prav tako besede."
    ],
    "img": {
     "file": "extract-clean",
     "alt": "Pet stikal za čiščenje in njihovi opisi pod možnostmi izpisa",
     "cap": "Vsako stikalo na desni pove, kaj odstranjuje; označite tista, ki jih potrebujete"
    }
   },
   {
    "h2": "Prevzem rezultata",
    "ps": [
     "Stolpec »3 Rezultat« na desni prikazuje izvlečeno besedilo v živo in ga preračuna takoj, ko spremenite možnost.",
     "Ko ste zadovoljni, kliknite »Prenesi«, da shranite datoteko .txt, ali »Kopiraj«, da vzamete besedilo s seboj. Za jezike, ki ne ločujejo besed s presledki, kot sta kitajščina in japonščina, združevanje vrstic sledi drugačnim pravilom, orodje pa to samodejno obravnava glede na jezik."
    ],
    "img": {
     "file": "extract-out",
     "alt": "Območje rezultata z gumboma za prenos in kopiranje",
     "cap": "Rezultat se posodablja v živo; prenesite ga kot txt ali ga neposredno kopirajte"
    }
   },
   {
    "h2": "Kaj ostane nespremenjeno",
    "ps": [
     "Sam dialog ni prepisan. Stikala za čiščenje določajo le, katere celotne vrstice ali bloki se zavržejo; nikoli ne spremenijo besedila vnosa.",
     "Časovne linije in številke iztočnikov preprosto niso izpisane, niso spremenjene in nato izpisane – izvirna datoteka je nedotaknjena, ta stran pa ne ponuja izvoza s časovnimi linijami. To delo spada k [[Pretvorniku formatov|/convert.html]]."
    ]
   },
   {
    "h2": "Common questions :: Pogosta vprašanja",
    "ps": [
     "**Ali oznake sloga ASS ostanejo v besedilu?** Ne. Preglasitveni bloki ASS `{}` so odstranjeni in ostane samo dialog.",
     "**Ali dvojezična datoteka izstopi kot dve vrstici ali ena?** Kolikor vrstic je imel vnos; ta stran jih ne združuje in ne deli – za njihovo ločitev uporabite [[Dvojezično razdelitev|/bilingual.html]].",
     "**Zakaj so predpone govorcev privzeto ohranjene?** Ime v vrstici »JOHN: Zdravo« je pogosto koristna informacija (skripte, seznami dialogov), njegovo odstranjevanje pa otežuje prepoznavanje govorca, zato je izbira prepuščena vam.",
     "**Ali je mogoče izvleči tudi datoteke z besedili pesmi LRC?** Da. Časovne oznake LRC se odstranijo, vrstice z besedilom pa ostanejo; če besedil pesmi ne želite, označite »Preskoči vrstice besedil pesmi«."
    ]
   },
   {
    "h2": "Privacy :: Zasebnost",
    "ps": [
     "Podnapisi se obdelujejo v celoti v brskalniku: nič se ne naloži in nič ne gre prek strežnika. Besedilo ostane samo na trenutni strani in se ob osvežitvi izbriše."
    ]
   },
   {
    "h2": "Povezana orodja in vodniki",
    "ps": [
     "Če želite razumeti, kaj datoteka s podnapisi dejansko vsebuje, glejte [[Kaj je v datoteki SRT|/guides/srt-file-format.html]]; za prevajanje izvlečenega dialoga pojdite na [[Prevajanje podnapisov|/translate.html]]; za pretvorbo v tabelo uporabite [[Podnapisi v Excel/CSV|/guides/srt-to-excel.html]]; in pred kakršno koli oddajo zaženite [[Nadzor kakovosti podnapisov|/qc.html]]."
    ]
   }
  ]
 },
 "extract-subtitles-from-video": {
  "seo": {
   "title": "Pridobivanje podnapisov iz videa – Vgrajeni vs. zunanji – AI-SRTSub",
   "desc": "Kaj nosijo zapisi MKV / WebM / MP4 / MOV, kako se razlikujejo sledi besedila, ASS, WebVTT in mov_text, zakaj slikovni podnapisi (PGS / DVD) nimajo besedila in kaj storiti po izvozu.",
   "h1": "Pridobivanje podnapisov iz videa",
   "intro": "Podnapisi lahko živijo znotraj videodatoteke ali samostojno zunaj nje. Znotraj so sled v vsebniku – njihovo pridobivanje nima nikakršne zveze s prekodiranjem.",
   "ctaText": "Odprite pridobivanje podnapisov iz videa"
  },
  "body": [
   {
    "h2": "Kje živijo podnapisi: vgrajeni in zunanji",
    "ps": [
     "Videodatoteka (MKV, MP4) je vsebnik, ki hkrati hrani videoposnetek, zvočno sled in sledi s podnapisi. Podnapisi, zatesnjeni v njem, so **vgrajeni**; ločena datoteka .srt / .ass zunaj je **zunanja**, vgrajena sled pa se imenuje tudi **založena (muxed in)**.",
     "Zunanje podnapise lahko uporabite takšne, kot so. Težava so vgrajeni: če jih želite urediti, prevesti ali zgraditi dvojezično sled iz izvirnika, nimate datoteke s podnapisi v rokah – najprej morate prebrati sled iz vsebnika. Ta korak ni prekodiranje: video se ne prekodira, preberejo se le podatki, ki so že shranjeni v vsebniku."
    ]
   },
   {
    "h2": "Kateri vsebnik kaj nosi",
    "ps": [
     "Različni vsebniki vsebujejo različne formate podnapisov, razlikuje pa se tudi zahtevnost pridobivanja:"
    ],
    "img": {
     "file": "videosub-which",
     "alt": "Sledi podnapisov, navedene na strani za pridobivanje vgrajenih podnapisov",
     "cap": "Ena sled na vrstico, običajno z jezikom in imenom sledi; ko je samo ena, se pridobiti samodejno"
    }
   },
   {
    "h2": "Zakaj slikovnih podnapisov ni mogoče pridobiti",
    "ps": [
     "Podnapisi Blu-ray PGS in DVD ne shranjujejo nobenih znakov, temveč samo vrsto slik z alfa kanalom. Ko jih predvajalnik prikaže, le prilepi sliko, ne pa upodablja besedila.",
     "V takšni sledi torej ni besedila za branje – ni stvar v tem, da orodje tega ne podpira, ampak v tem, da tam ni nobenih znakov. Stran to jasno pove, ko na takšno naleti.",
     "Edini način za pridobitev besed je, da najprej prepoznate znake na teh slikah (OCR) in iz tega zgradite podnapise. To je ločen postopek od izvleka sledi."
    ]
   },
   {
    "h2": "Kaj običajno sledi po pridobivanju",
    "ps": [
     "Kar pride ven, je sled takšna, kot je bila: orodje ne ugane kodiranja in ne popravlja časovnih linij. Zato se pogosto pojavita dve stvari:",
     "Ena je **popačeno besedilo** – težava s kodiranjem v izvorni sledi, ki vseeno prihaja ven popačena; pojdite na [[Kako popraviti popačeno besedilo|/guides/repair.html]], da prepoznate kodiranje. Druga je **napačen čas** – ne glede na to, ali ima vir uvodni logotip ali se frekvence sličic ne ujemajo, je rezultat zamaknjen kot celota; uporabite [[Prilagoditev časovnice|/shift.html]], da ga zamaknete ali prilagodite v merilu.",
     "Nato za prevajanje pojdite na [[Prevajanje podnapisov|/translate.html]], za dvojezičnost pa glejte [[Dva načina za izdelavo dvojezičnih podnapisov|/guides/make-bilingual-subtitles.html]]."
    ],
    "img": {
     "file": "videosub-formats",
     "alt": "Območje rezultata z izhodnimi formati SRT / VTT / ASS / TXT",
     "cap": "Izvlečene podnapise je mogoče izvoziti v štirih formatih; vir ASS ohrani glavo sloga in ločljivost"
    }
   },
   {
    "h2": "Nekaj stvari, ki jih je lahko narobe razumeti",
    "ps": [
     "**Pridobivanje podnapisov ni njihovo vžigovanje v sliko (burning in).** Video se ne prekodira, zato kakovost slike in zvok ostaneta nespremenjena.",
     "**Pridobivanje ne vpliva na izvirno datoteko.** Je samo za branje, nikoli se ne zapisuje in niti bajt videa se ne spremeni.",
     "**Počasnost velike datoteke ni težava s povezavo.** Orodje pregleduje informacije o sledi kos za kosom, in večja kot je datoteka, dlje traja; vse se dogaja lokalno.",
     "**Zunanji podnapisi ne potrebujejo te strani.** Če imate .srt / .ass, pojdite naravnost na [[Pretvorbo formatov|/convert.html]]; najprej je treba izvleči samo podnapise, ki so zatesnjeni v videu."
    ]
   },
   {
    "h2": "Povezana orodja in vodniki",
    "ps": [
     "Za celoten vodnik glejte [[Kako izvleči podnapise, vgrajene v video|/guides/videosub.html]]; za prevajanje tistega, kar izvlečete, pojdite na [[Prevajanje podnapisov|/translate.html]], za dvojezičnost glejte [[Dva načina za izdelavo dvojezičnih podnapisov|/guides/make-bilingual-subtitles.html]]; za popačeno besedilo začnite s [[Popravilom popačenega besedila|/repair.html]]."
    ]
   }
  ]
 },
 "fps-23-976-vs-25": {
  "seo": {
   "title": "Kaj v resnici pomenijo 23.976 / 24 / 25 / 30 sličic na sekundo (fps) – Časovna uskladitev podnapisov – AI-SRTSub",
   "desc": "23.976 ni 24 in 29.97 ni 30 – manjkajoči 0.1% izhaja iz barvnega sistema NTSC, medtem ko PAL predvaja filme 4% hitreje. Kako ti dejavniki zamaknejo časovne oznake vaših podnapisov in kako pretvarjati med njimi.",
   "h1": "Kaj v resnici pomenijo 23.976 / 24 / 25 / 30 fps",
   "intro": "Vrzel 0.1% med 23.976 in 24 je ostanek iz zgodovine televizije. Skupaj s sistemom PAL 4% je to razlog, zakaj se podnapisi med predvajanjem filma vse bolj razhajajo.",
   "ctaText": "Odprite prilagoditev časa"
  },
  "body": [
   {
    "h2": "What each number is :: Kaj je posamezna številka",
    "ps": [
     "Hitrost sličic je število slik, prikazanih v eni sekundi. Štiri, s katerimi se najpogosteje srečujete:"
    ]
   },
   {
    "h2": "Od kod prihaja 0.1%",
    "ps": [
     "23.976 = 24 × 1000/1001 in 29.97 = 30 × 1000/1001. To razmerje 1000/1001 je ostanek dodajanja barve v NTSC: da bi stisnili barvno podnosilno frekvenco, ne da bi pokvarili obstoječe črno-bele sprejemnike, se je hitrost polj znižala z 60 Hz na 59.94 Hz (60 × 1000/1001), z njo pa se je znižala tudi hitrost sličic.",
     "Rezultat: filmi se v regijah NTSC predvajajo s hitrostjo 23.976 namesto 24. Razlika je 0.1% oziroma 3.6 sekunde v eni uri – sama po sebi komaj opazna, vendar je ne zamenjajte s spodnjim 4% in nikoli ne združujte obeh v enem izračunu."
    ]
   },
   {
    "h2": "Od kod prihaja 4%",
    "ps": [
     "Regije PAL prikazujejo s hitrostjo 25 fps. Filmi so posneti s hitrostjo 24 fps in preprosto predvajani s hitrostjo 25 – dodana ali odstranjena ni niti ena sličica, zato predvajanje poteka 4% hitreje (25/24 ≈ 1.0417). 100-minutni film ima v različici PAL dolžino 96 minut.",
     "To je koren **progresivnega zamika**: podnapisi, ustvarjeni za izvirnik, in video v različici PAL se na začetku popolnoma ujemajo, do odjavne špice pa so narazen že štiri minute. Noben globalni premik tega ne more rešiti; prilagoditi ga je treba v merilu glede na razmerje."
    ],
    "img": {
     "file": "shift-step-rate",
     "alt": "Odsek za hitrost na strani s časom: vnosno polje za razmerje",
     "cap": "Prilagoditev po razmerju – ena vrednost pokriva celoten film"
    }
   },
   {
    "h2": "How to convert :: Kako pretvoriti",
    "ps": [
     "Pretvorba pomeni množenje z enotnim razmerjem, ki velja za celoten film:"
    ]
   },
   {
    "h2": "Prepoznavanje, katero imate",
    "ps": [
     "Namesto ugibanja razmerja poiščite dva trenutka, v katerih pravilni čas zanesljivo poznate – običajno prvo in zadnjo vrstico dialoga – ter orodju sporočite: »ta vrstica mora biti ob 00:00:12, tista pa ob 01:35:40«. Celoten film linearno raztegne med tema dvema točkama. To je »sidranje v dveh točkah« in za to ne potrebujete nobenega računanja s hitrostjo sličic.",
     "Če želite sami potrditi hitrost sličic, preverite svoj predvajalnik ali orodje za informacij o medijih. Ko ime datoteke, kot je `1080p.WEB`, ne vsebuje namiga o hitrosti sličic, je sidranje v dveh točkah varnejša izbira."
    ],
    "img": {
     "file": "shift-step-two",
     "alt": "Odsek za sidranje v dveh točkah na strani s časom: dve vrstici vnosov časovnih žigov",
     "cap": "Sidranje v dveh točkah ne potrebuje hitrosti sličic – le dva časovna žiga"
    }
   },
   {
    "h2": "Povezana orodja in vodniki",
    "ps": [
     "Sama pretvorba hitrosti sličic – [[Pretvorba hitrosti sličic podnapisov|/guides/srt-fps-converter.html]]; prilagoditev hitrosti – [[Pretvorba hitrosti podnapisov|/guides/subtitle-speed-converter.html]]; niste prepričani, ali gre za globalni zamik ali progresivno razhajanje – [[Podnapisi se vse bolj razhajajo|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "glossary": {
  "seo": {
   "title": "Množična zamenjava izrazov v podnapisih – Ena tabela popravi datoteko – AI-SRTSub",
   "desc": "Eno pravilo na vrstico, ločeno z -> , => , → ali tabulatorjem, z # za komentarje. Ujemanje celih besed, občutljivost na velikost črk, prva ali druga vrstica dvojezičnega iztočnika, vsaka sprememba je navedena in jo je mogoče razveljaviti.",
   "h1": "Kako množično zamenjati izraze v podnapisih",
   "intro": "Ena tabela izrazov poenoti besedilo celotne datoteke s podnapisi v enem zamahu – časovne linije, slogi ASS in bloki VTT NOTE se ne dotaknejo niti z enim samim znakom.",
   "ctaText": "Odprite množično zamenjavo izrazov"
  },
  "body": [
   {
    "h2": "What this tool does :: Kaj počne to orodje",
    "ps": [
     "Ista beseda, prevedena na dva različna načina, imena in kraji, ki se spreminjajo s strojni prevodom, tuji podnapisi, ki se morajo ujemati z vašimi lastnimi dogovori – vsi imajo eno skupno lastnost: spreminja se beseda, ne struktura. Ta stran spreminja samo besede."
    ]
   },
   {
    "h2": "Dva vhoda: podnapisi in tabela izrazov",
    "ps": [
     "Stolpec »1 Dodaj podnapise« na levi sprejme datoteko s podnapisi ali pa vsebino prilepite neposredno; če ste izbrali napačno datoteko, kliknite »Počisti«.",
     "Stolpec »2 Tabela izrazov« na desni vsebuje pravila. **Eno pravilo na vrstico**, pri čemer sta stari in novi izraz ločena s `->` , `=>` , `→` ali tabulatorjem – delujejo vsi štirje. Vrstice, ki se začnejo s `#`, so komentarji in ne sodelujejo pri zamenjavi.",
     "Če niste prepričani glede formata, kliknite »Izpolni primer« in ga uredite."
    ],
    "img": {
     "file": "glossary-up",
     "alt": "Območje dodajanja podnapisov in vnos tabele izrazov na strani za zamenjavo izrazov",
     "cap": "Podnapisi na levi, pravila na desni; eno pravilo na vrstico, stari in novi izraz sta ločena z ->"
    }
   },
   {
    "h2": "Kako napisati tabelo izrazov",
    "ps": [
     "Eno pravilo na vrstico: trenutni izraz na levi, v kaj naj se spremeni na desni. Na primer `Thor -> Donar` zamenja vsak »Thor« v datoteki z »Donar«.",
     "Komentarji se začnejo s `#` in so priročni za označevanje skupine pravil (na primer »# popravki imen sezone 1«) ter za začasni izklop pravila – prednje preprosto postavite `#` namesto brisanja.",
     "Pravila se izvajajo od vrha navzdol; besedilo, ki ga ustvari eno pravilo, ponovno pregležejo pravila pod njim. Ko je vrstni red pomemben (recimo najprej zamenjajte A z B in nato B s C), imejte to v mislih."
    ],
    "img": {
     "file": "glossary-table",
     "alt": "Vrstica za vrstico pravil zamenjave v vnosu tabele izrazov",
     "cap": "Eno pravilo na vrstico; vrstice, ki se začnejo s #, so komentarji in lahko začasno izklopijo pravilo"
    }
   },
   {
    "h2": "Kaj počnejo trije stikali",
    "ps": [
     "**Obseg**: `all` / »`first line only` / `second line only`. V dvojezični datoteki izberite »samo drugo vrstico«, če želite spremeniti samo prevod; vnosi, ki imajo samo eno vrstico, ostanejo pod obema nastavitvama ene vrstice nespremenjeni – orodje ne ugane, katera stran je izvirnik.",
     "**Cela beseda**: zamenja samo izraze, ki stojijo samostojno kot beseda, zato `art` ne bo vplival na `start`. Pri jezikih, ki ne ločujejo besed s presledki, kot sta kitajščina in japonščina, to stikalo nima učinka – tam zamenjava deluje na podnizih.",
     "**Občutljivo na velikost črk**: privzeto izklopljeno, zato se zamenjata tako `CEO` kot `ceo`; ko je označeno, se zamenja samo popolnoma enako črkovanje."
    ],
    "img": {
     "file": "glossary-opt",
     "alt": "Stikala za obseg, celo besedo in občutljivost na velikost črk pod tabelo izrazov",
     "cap": "Obseg določa, katera vrstica se spremeni; cela beseda in velikost črk določata, kako strogo se izraz ujema"
    }
   },
   {
    "h2": "Vsaka sprememba je navedena, vsako spremembo je mogoče razveljaviti",
    "ps": [
     "»3 Rezultat« prikazuje zamenjane podnapise in tudi **navaja vsako spremembo**: kateri iztočnik, katera vrstica, iz česa v kaj.",
     "Če katere od njih ne želite, jo kliknite na seznamu, da povrnete samo tisti vnos – ni treba urejati tabele izrazov in znova poganjati. Ko ste zadovoljni, kliknite »Prenesi« ali »Kopiraj«."
    ],
    "img": {
     "file": "glossary-out",
     "alt": "Območje rezultata s seznamom posameznih sprememb",
     "cap": "Vsaka sprememba je navedena; kliknite tisto, ki je ne želite, da jo povrnete"
    }
   },
   {
    "h2": "Kaj ostane nedotaknjeno",
    "ps": [
     "**Časovne linije, vrstice sloga ASS in bloki VTT `NOTE` se ne dotaknejo niti z enim samim znakom.** Zamenjava velja samo za besedilo dialoga, nikoli za strukturne vrstice.",
     "Tabela izrazov nikoli samodejno ne spremeni vaše datoteke s podnapisi – rezultat je nov izhod, izvirnik pa ostane takšen, kot je."
    ]
   },
   {
    "h2": "Common questions :: Pogosta vprašanja",
    "ps": [
     "**Zakaj izraz ni bil zamenjan?** Najprej preverite obseg: pri izbrani možnosti »samo druga vrstica« vnosi, ki imajo samo eno vrstico, ostanejo nespremenjeni. Nato preverite ujemanje celih besed, ki preprečuje ujemanja, ki niso samostojne besede.",
     "**Zakaj kitajščina kljub označenemu ujemanju celih besed še vedno zamenjuje podnize?** To je pričakovano. Kitajščina in japonščina ne ločujeta besed s presledki, zato orodje ne more določiti meja besed in ujemanje celih besed tam nima učinka.",
     "**Kako vse skupaj povrnem po napaki?** Vnose povrnite enega za drugim na seznamu sprememb; če želite začeti povsem znova, počistite tabelo izrazov in ponovno dodajte podnapise.",
     "**Ali se lahko vrstice sloga ASS pomotoma spremenijo?** Ne. Vrstice sloga in bloki `NOTE` so izven obsega; sodeluje samo besedilo dialoga."
    ]
   },
   {
    "h2": "Privacy :: Zasebnost",
    "ps": [
     "Podnapisi in tabela izrazov se obdelujejo v celoti v brskalniku: nič se ne naloži in nič ne gre prek strežnika. Tabela izrazov se ne shranjuje, zato bo naslednjič, ko odprete stran, prazna."
    ]
   },
   {
    "h2": "Povezana orodja in vodniki",
    "ps": [
     "O tem, ali naj zgradite tabelo izrazov in kako jo vzdrževati skozi celotno sezono, glejte [[Tabele izrazov: ohranjanje doslednosti sezone|/guides/subtitle-glossary.html]]; če je vsebina umazana (vodni žigi, iztočniki SDH), najprej zaženite [[Čiščenje podnapisov|/clean.html]]; ko so imena urejena in potrebujete druge jezike, pojdite na [[Prevajanje podnapisov|/translate.html]]; in rezultat poženite skozi [[Nadzor kakovosti podnapisov|/qc.html]]."
    ]
   }
  ]
 },
 "hanconv": {
  "seo": {
   "title": "Pretvorba poenostavljenih in tradicionalnih podnapisov – Tajvan vs. Hong Kong – AI-SRTSub",
   "desc": "Pregled devetih smeri: tajvanska s področnim besedilom ali brez njega, Hong Kong kot posebna zvrst, vse pa je mogoče pretvoriti nazaj v poenostavljeno pisavo. Spreminja se samo dialog; časi ostanejo nespremenjeni.",
   "h1": "Kako pretvoriti poenostavljene in tradicionalne kitajske podnapise",
   "intro": "Ne glede na to, ali podnapisi gredo na Tajvan, v Hong Kong ali na celino, se spremenijo tako besedišče kot oblike znakov. Na voljo je devet smeri, pretvarja pa se samo dialog – časi, indeksne številke in vrstice sloga ASS se nikoli ne dotaknejo.",
   "ctaText": "Open the converter :: Odprite pretvornik"
  },
  "body": [
   {
    "h2": "What this tool does :: Kaj počne to orodje",
    "ps": [
     "Pretvarjanje med poenostavljeno in tradicionalno pisavo ni samo drugačno zapisovanje posameznih znakov. Ista poenostavljena beseda ustreza različnim besedam v različnih regijah – beseda za »programsko opremo« se razlikuje med Tajvanom in celino, Hong Kong pa ima še eno različico. Pretvornik jih ohranja ločene:"
    ]
   },
   {
    "h2": "Upload and detection :: Naloži in zaznaj",
    "ps": [
     "Povlecite datoteko ali poiščite eno – podprti so SRT, VTT, ASS in TXT – ali neposredno prilepite besedilo podnapisov. Format se samodejno zazna in prikaže poleg »Zaznani format«."
    ],
    "img": {
     "file": "hanconv-up",
     "alt": "Območje nalaganja pretvornika: območje za spuščanje in polje za lepljenje, z zaznanim formatom zgoraj",
     "cap": "SRT / VTT / ASS / TXT, format se zazna samodejno"
    }
   },
   {
    "h2": "Izbira med devetimi smeri",
    "ps": [
     "Devet smeri pod »Pretvori v« spada v tri skupine. **Poenostavljena → tradicionalna**: splošna tradicionalna, tajvanska (sprememba besedišča), tajvanska (samo glifi), Hong Kong. **Tradicionalna → poenostavljena**: splošna, iz tajvanske, iz Hong Konga. **Tradicionalna v tradicionalno**: tajvanske oblike, hongkonške oblike.",
     "Izbira možnosti »tajvansko besedišče« zamenja tudi regionalno besedišče: beseda za »programsko opremo« postane tajvanska, prav tako beseda za »informacije«; »tajvanske glife« spremeni samo zapis znakov in vaše besedišče pusti pri miru. Hongkong je popolnoma druga zgodba in uporablja še eno besedo za »programsko opremo«. Če želite pretvoriti nazaj v poenostavljeno pismo, uporabite spodnjo skupino – povedati morate, iz katere tradicionalne različice izhajate, ker imata tajvansko in hongkonško besedilo različni poti nazaj."
    ],
    "img": {
     "file": "hanconv-dir",
     "alt": "Kartica Pretvori v: spustni meni cilja z izbrano možnostjo »Poenostavljena → Tajvanska tradicionalna (sprememba besedišča)«",
     "cap": "Smeri so v spustnem meniju »Pretvori v« v treh skupinah; ta je tajvanska s spremembami besedišča"
    }
   },
   {
    "h2": "Result and export :: Rezultat in izvoz",
    "ps": [
     "Območje rezultata takoj prikaže pretvorjen podnapis z vrstico s statistiko, ki prikazuje skupno število vrstic in število spremenjenih vrstic. Če se ni spremenilo nič, dobite namig, da datoteka morda ne vsebuje kitajskih znakov – pretvarjajo se samo znaki Han, zato vsi latinski ali vsi številčni podnapisi ostanejo točno takšni, kot so bili.",
     "Nato prenesite ali kopirajte. V ime datoteke se vstavi jezikovna oznaka – `demo.srt` postane `demo.zh-TW.srt` za tajvansko tradicionalno, `.zh-Hant` za splošno tradicionalno in `.zh-Hans` pri pretvorbi nazaj v poenostavljeno pisavo."
    ],
    "img": {
     "file": "hanconv-out",
     "alt": "Območje rezultata: pretvorjen podnapis in vrstica s statistiko",
     "cap": "Vrstica s statistiko prikazuje skupno število vrstic in število spremenjenih vrstic; od tod prenesite ali kopirajte"
    }
   },
   {
    "h2": "Kaj se nikoli ne dotakne",
    "ps": [
     "Pretvarja se samo dialog. Časi, indeksne številke in vrstice sloga ASS se sploh ne dotaknejo – rezultat je pripravljen za uporabo brez ponovnega oblikovanja."
    ]
   },
   {
    "h2": "FAQ :: Pogosta vprašanja",
    "ps": [
     "**Zakaj pretvornik ni spremenil besede za »čisto«?** Preslikave ena proti več se rešujejo po besedah: pomen »čisto« in pomen »suho« si delita eno tradicionalno obliko, medtem ko pomen »deblo« uporablja drugo. Tabele prihajajo iz OpenCC, ki se ujema s celotnimi frazami in ne s posameznimi znaki.",
     "**Kakšna je razlika med tajvansko in hongkonško tradicionalno pisavo?** Besedišče: beseda za »programsko opremo« se med njima razlikuje. Izberite smer za regijo, v katero oddajate vsebino.",
     "**Se je število znakov po pretvorbi spremenilo?** Zamenjajo se samo znaki Han – nobeni vnosi se ne dodajo ali odstranijo in noben čas se ne premakne. Če se je število vrstic spremenilo, preverite, ali je bil format pravilno zaznan.",
     "**Slovar se ni uspel naložiti?** Stran vam naroči, naj osvežite in poskusite znova. Naloži se lokalno, zato ni treba nikamor nalagati podnapisov."
    ]
   },
   {
    "h2": "Privacy :: Zasebnost",
    "ps": [
     "Pretvorba poteka v celoti v vašem brskalniku. Nobena vsebina podnapisov se nikoli ne pošlje na strežnik."
    ]
   },
   {
    "h2": "Povezana orodja in vodniki",
    "ps": [
     "Če potrebujete samo poenostavljene v tradicionalne, glejte [[Pretvorba poenostavljenih podnapisov v tradicionalne|/guides/srt-simplified-to-traditional.html]]; zakaj gre za več kot le zamenjavo znakov, si oglejte v [[Poenostavljeni vs. tradicionalni nista samo zamenjava znakov|/guides/simplified-traditional-chinese.html]]; za prevajanje v drug jezik pa [[Prevajanje podnapisov|/translate.html]]."
    ]
   }
  ]
 },
 "how-to-make-lrc-file": {
  "seo": {
   "title": "Kako sinhronizirati LRC besedila – Eno vrstica na besedilo, udarjajte ob ritmu – AI-SRTSub",
   "desc": "Zgradi LRC datoteko iz ničle: prilepite eno vrstico na besedilo, tapnite čas med poslušanjem, bližnjice, ki štejejo, kdaj preskočiti vrstico, LRC ali SRT in kaj storiti, ko časovno usklajevanje zaide.",
   "h1": "Kako sinhronizirati LRC besedila",
   "intro": "LRC datoteka je le \"ena vrstica besedila plus ena časovna točka\". Izdelava se imenuje časovna umestitev: zajem trenutka, ko se vsaka vrstica začne.",
   "ctaText": "Odprite orodje za sinhronizacijo besedil"
  },
  "body": [
   {
    "h2": "Kaj časovna umestitev pravzaprav je",
    "ps": [
     "Struktura LRC datoteke ne bi mogla biti preprostejša: ena vrstica besedila na vrstico, vsaki pa predhodi časovna oznaka `[mm:ss.xx]`. Ko predvajalnik doseže vrstico, v tistem trenutku prikaže to besedilo.",
     "Torej je celotno delo \"izdelave LRC-ja\" dodeljevanje časovne točke vsaki vrstici besedila – in noben stroj tega ne more storiti namesto vas, saj določanje, kje se začne petje posamezne vrstice, zahteva poslušanje."
    ]
   },
   {
    "h2": "Koliko prehodov pesem potrebuje",
    "ps": [
     "Pred začetkom je vredno nameniti minuto razmisleka; to prihrani večino ponovnega dela:"
    ],
    "img": {
     "file": "lrc-tap2",
     "alt": "Kontrole za predvajanje, ožigosanje te vrstice, razveljavitev ene vrstice in preskok te vrstice v območju tapkanja",
     "cap": "Pritiskanje tipke Enter med predvajanjem je najgladkejše; ste ožigosali napačno vrstico? Pritisnite Z in ponovno ožigosajte"
    }
   },
   {
    "h2": "Lepljenje besedila določa, kako gladko bo potekal preostanek",
    "ps": [
     "Prilepite besedilo z eno vrstico na besedilo; prazne vrstice se preskočijo. Prelomi vrstic, ki jih prilepite, so vrstice, ki jih boste časovno določili pozneje – razbijte jih na več vrstic zdaj in pozneje boste tapkali večkrat.",
     "Deluje tudi lepljenje obstoječega LRC-ja: njegove časovne oznake `[mm:ss.xx]` so prepoznane, po uvozu pa **nadaljujete od prve vrstice brez časa**, tako da že časovno opredeljenih vrstic ni treba delati znova.",
     "To pomeni, da lahko napol dokončan LRC shranite in pozneje prilepite nazaj za nadaljevanje."
    ],
    "img": {
     "file": "lrc-paste2",
     "alt": "Območje za lepljenje besedil in gumb za razčlenjevanje besedil",
     "cap": "Ena vrstica na besedilo; lepljenje celotnega LRC-ja prebere obstoječe čase, da lahko nadaljujete"
    }
   },
   {
    "h2": "Export LRC or SRT :: Izvozi LRC ali SRT",
    "ps": [
     "**Za predvajalnik glasbe izvozi LRC.** Beró ga foobar2000 ter najrazličnejši predvajalniki in naprave s prikazom besedil.",
     "**Če želite besedilo umestiti na video ali ga nadalje obdelati, izvozi SRT.** Sledilne steze video podnapisov, orodja za podnapise in programska oprema za urejanje berejo SRT. Pri izvozu vsaka vrstica traja, dokler se ne začne naslednja, zadnja vrstica pa pade nazaj na 2 sekund.",
     "Oboje izvozi samo vrstice, ki imajo čas – preskočene vrstice nikoli ne vstopijo v datoteko."
    ],
    "img": {
     "file": "lrc-export",
     "alt": "Gumbi za prenos LRC, prenos SRT in kopiranje v območju izvoza",
     "cap": "LRC za predvajalnike, SRT za video; izvožene so samo vrstice s časom"
    }
   },
   {
    "h2": "Nekaj stvari, ki jih je enostavno narobe razumeti",
    "ps": [
     "**Je po časovni uskladitvi vse rahlo zamaknjeno? Uporabite zamik.** Izvozi SRT in ga premaknite kot celoto s [[Prilagoditev časovnice|/shift.html]]; precej hitreje kot ponovno časovno določanje vrstico za vrstico.",
     "**Se odklon med pesmijo povečuje? To je težava s hitrostjo.** Ko se hitrost predvajanja in hitrost snemanja razlikujeta, napaka proti koncu raste, kar zahteva sorazmerno skaliranje in ne zamika.",
     "**Bližnjice se zdijo naravne le, če jih uporabljate skupaj.** Preslednica predvaja in zaustavlja, Enter ožigosa trenutno vrstico, Z razveljavi eno vrstico – pritisnite Enter neposredno med predvajanjem, namesto da preklapljate med miško in tipkovnico.",
     "**Kakovost zvoka vpliva na natančnost.** Vir z razločnim vokalnim delom je lažje slediti; živi posnetki in viri z glasno spremljevalno glasbo so opazno težji."
    ]
   },
   {
    "h2": "Povezana orodja in vodniki",
    "ps": [
     "Za celoten vodnik si oglejte [[Kako uporabljati orodje za sinhronizacijo besedil|/guides/lrc.html]]; za pretvorbo obstoječega LRC-ja v podnapise glejte [[LRC v SRT|/guides/lrc-to-srt.html]]; če je izvoženi SRT napačno časovno usklajen, uporabite [[Prilagoditev časovnice|/shift.html]]; rezultat pa poženite skozi [[Nadzor kakovosti podnapisov|/qc.html]]."
    ]
   }
  ]
 },
 "lrc": {
  "seo": {
   "title": "Orodje za sinhronizacijo besedil – Naložite pesem, prilepite besedilo, udarjajte ob ritmu – AI-SRTSub",
   "desc": "Naložite pesem, prilepite besedilo, med poslušanjem tapnite časovno oznako za vsako vrstico in izvozite LRC ali SRT. Preslednica predvaja in zaustavlja, Enter ožigosa vrstico, Z razveljavi, roke ostanejo na tipkovnici.",
   "h1": "Kako uporabljati orodje za sinhronizacijo besedil",
   "intro": "Naložite pesem, prilepite besedilo, med poslušanjem tapnite časovno oznako za vsako vrstico in izvozite standardni LRC ali SRT. Zvok se predvaja lokalno in se nikoli ne naloži.",
   "ctaText": "Odprite orodje za sinhronizacijo besedil"
  },
  "body": [
   {
    "h2": "What this tool does :: Kaj to orodje počri",
    "ps": [
     "Pesmi dodelite datoteko z besedilom, ob kateri je mogoče peti: ena vrstica na besedilo, vsaka vrstica nosi časovno točko. Predvajalniki berejo LRC, sledilne steze podnapisov berejo SRT, oboje pa je mogoče izvoziti tukaj."
    ]
   },
   {
    "h2": "1 Load the song :: 1 Naloži pesem",
    "ps": [
     "Prvi stolpec na levi sprejme zvočno datoteko: delujejo vsi formati **MP3, M4A, FLAC, WAV in OGG**. Zvok se predvaja lokalno in se nikoli ne naloži.",
     "Kakovost zvoka ne vpliva na natančnost časovne uskladitve, vendar je vir z razločnim vokalnim delom lažje slediti; živi posnetki in viri z glasno spremljevalno glasbo so opazno težji za sinhronizacijo."
    ],
    "img": {
     "file": "lrc-up",
     "alt": "Območje za nalaganje pesmi v orodju za sinhronizacijo besedil",
     "cap": "Vsi formati MP3 / M4A / FLAC / WAV / OGG delujejo, zvok pa se predvaja izključno lokalno"
    }
   },
   {
    "h2": "2 Paste the lyrics :: 2 Prilepite besedilo",
    "ps": [
     "Prilepite besedilo v drugi stolpec, **ena vrstica na besedilo**; prazne vrstice se samodejno preskočijo. Nato kliknite »Razčleni besedilo«.",
     "Deluje tudi lepljenje obstoječega LRC-ja – njegove časovne oznake `[mm:ss.xx]` so prepoznane, po uvozu pa nadaljujete od prve vrstice brez časa, tako da vrstic, ki so že časovno opredeljene, ni treba delati znova."
    ],
    "img": {
     "file": "lrc-paste",
     "alt": "Območje za lepljenje besedila in gumb za razčlenjevanje besedila",
     "cap": "Prilepite eno vrstico na besedilo ali prilepite celoten LRC in pustite, da orodje prebere obstoječe čase"
    }
   },
   {
    "h2": "3 Udarjajte ob ritmu med poslušanjem",
    "ps": [
     "Predvajajte pesem in pritisnite Enter v trenutku, ko se vrstica začne (ali kliknite »Ožigosaj to vrstico«); čas za tisto vrstico se zabeleži, kurzor pa skoči na naslednjo.",
     "Bližnjice: **preslednica** predvaja in zaustavlja, **Enter** ožigosa trenutno vrstico, **Z** razveljavi eno vrstico. Pritiskanje tipke Enter med predvajanjem je najgladkejši način dela – brez nenehnega preklapljanja med miško in tipkovnico.",
     "Ste ožigosali napačno vrstico? Pritisnite Z, da jo razveljavite in ponovno ožigosate. Če vrstice sploh ne želite ožigosati (instrumentalni premor, čisto glasbeni prehod), kliknite »Preskoči to vrstico« in ne bo se pojavila v izvozu."
    ],
    "img": {
     "file": "lrc-tap",
     "alt": "Kontrole za predvajanje, ožigosanje te vrstice, razveljavitev ene vrstice in preskok te vrstice v območju tapkanja",
     "cap": "Preslednica predvaja in zaustavlja, Enter ožigosa trenutno vrstico, Z razveljavi – roke ostanejo na tipkovnici"
    }
   },
   {
    "h2": "4 Export :: 4 Izvozi",
    "ps": [
     "Četrti stolpec izvede izvoz: **Prenesi LRC** za predvajalnike, **Prenesi SRT** za sledilne steze video podnapisov ali »Kopiraj«, da vzamete besedilo neposredno.",
     "Izvožene so samo vrstice s časom; preskočene vrstice nikoli ne vstopijo v datoteko. Pri izvozu SRT vsaka vrstica traja, dokler se ne začne naslednja, zadnja vrstica pa pade nazaj na 2 sekund."
    ],
    "img": {
     "file": "lrc-out",
     "alt": "Gumbi za prenos LRC, prenos SRT in kopiranje v območju izvoza",
     "cap": "LRC za predvajalnike, SRT za video; izvožene so samo vrstice s časom"
    }
   },
   {
    "h2": "Kar ostane nedotaknjeno",
    "ps": [
     "Besedilo besedila ni prepisano. Časovna umestitev doda le eno časovno točko na vrstico in se nikoli ne dotakne besed, ki ste jih prilepili.",
     "Ko uvozite obstoječi LRC, vrstice, ki že imajo časovno oznako, obdržijo svoj prvotni čas, vi pa žigosate šele od prve časovno neopredeljene vrstice naprej."
    ]
   },
   {
    "h2": "Common questions :: Pogosta vprašanja",
    "ps": [
     "**Zakaj v izvozu manjkajo nekatere vrstice?** Preskočene vrstice in vrstice brez časa nikoli ne vstopijo v datoteko. Vrnite se na tretji korak in jih dodajte ali potrdite, da je bilo mišljeno, da se preskočijo.",
     "**Ali je čase mogoče spremeniti pozneje?** Če želite po žigosanju vse skupaj malo premakniti, izvozite SRT in uporabite [[Prilagoditev časovnice|/shift.html]] za zamik ali skaliranje kot celote.",
     "**LRC ali SRT – kaj naj izvozim?** LRC za predvajalnike glasbe (foobar2000, pretočne odjemalce, najrazličnejše predvajalnike); SRT, ko morajo biti besedila na videu ali nadalje obdelana z orodji za podnapise.",
     "**Koliko časa traja ena pesem?** Odvisno je od tega, koliko vrstic je in kako natančni želite biti. Za pesem s tridesetimi ali štiridesetimi vrsticami traja nekaj minut na prehod, ko enkrat obvladate ritem; lovljenje natančnosti na ravni besed traja dlje."
    ]
   },
   {
    "h2": "Privacy :: Zasebnost",
    "ps": [
     "Zvok in besedila se obdelujejo izključno v brskalniku: nič se ne naloži in nič ne gre prek strežnika. Zvok se dekodira in predvaja izključno lokalno."
    ]
   },
   {
    "h2": "Povezana orodja in vodniki",
    "ps": [
     "Če že imate LRC in želite podnapise, si oglejte [[LRC v SRT|/guides/lrc-to-srt.html]]; za ozadje razmišljanja in pasti pri časovnem usklajevanju glejte [[Kako sinhronizirati LRC besedila|/guides/how-to-make-lrc-file.html]]; če je izvoženi SRT zamaknjen, uporabite [[Prilagoditev časovnice|/shift.html]]; in poženite rezultat skozi [[Nadzor kakovosti podnapisov|/qc.html]]."
    ]
   }
  ]
 },
 "lrc-to-srt": {
  "seo": {
   "title": "Pretvornik LRC v SRT – Pretvorite besedila v podnapise – AI-SRTSub",
   "desc": "Pretvorite besedila LRC v podnapise SRT: vsaka vrstica traja, dokler se ne začne naslednja, zadnji iztočnici pa pripadajo 3 sekund. Pesmi, daljše od 60 minut, se preberejo pravilno. Deluje v vašem brskalniku.",
   "h1": "LRC to SRT :: LRC v SRT",
   "intro": "Pretvorite datoteke z besedilom LRC v SRT: spustite datoteko, izberite SRT, prenesite. Končni casi se samodejno izpolnijo iz naslednje vrstice.",
   "ctaText": "Convert LRC → SRT :: Pretvori LRC → SRT"
  },
  "body": [
   {
    "h2": "Kako se LRC razlikuje od SRT",
    "ps": [
     "LRC je format besedil: vsaka vrstica nosi samo čas \"začetka petja\" v `[minutes:seconds.cents]` in **brez končnega časa**; vsaka iztočnica SRT potrebuje tako začetek kot konec. Jedro pretvorbe je torej izpolnjevanje končnih časov."
    ],
    "img": {
     "file": "convert-upload-lrc",
     "alt": "Območje za nalaganje: naložena datoteka LRC, zaznana kot LRC",
     "cap": "Datoteka besedila s časovnimi oznakami [00:12.50] je takoj zaznana kot LRC"
    }
   },
   {
    "h2": "Kako se izpolnijo končni casi",
    "ps": [
     "Pravilo je preprosto: **vsaka vrstica traja, dokler se ne začne naslednja**; zadnja vrstica nima \"naslednje\", zato dobi 3 sekund. Poleg tega časovne oznake LRC nosijo le minute in sekunde – brez ur – in polje minut se ne prenaša naprej (62:05 pomeni 1 uro 2 min 5 s), zato se zelo dolge skladbe, kot so DJ miksi, preberejo pravilno."
    ]
   },
   {
    "h2": "How to convert :: Kako pretvoriti",
    "ps": [
     "Odprite [[pretvornik|/convert.html]], spustite LRC, izberite **SRT - SubRip** kot izhod, nato pretvorite in prenesite. Priročno za videospote in za vdelavo besedil kot podnapisov v predvajalnikih; izvoženi SRT je mogoče ponovno pretvoriti v VTT za splet."
    ]
   }
  ]
 },
 "make-bilingual-subtitles": {
  "seo": {
   "title": "Dva načina za izdelavo dvojezičnih podnapisov – AI-SRTSub",
   "desc": "Dvojezični podnapisi so na voljo v dveh oblikah: dve vrstici v eni iztočnici ali dve iztočnici na isti časovnici. Prednosti, slabosti in kako preklapljati med njima. – AI-SRTSub",
   "h1": "Dva načina za izdelavo dvojezičnih podnapisov",
   "intro": "Isti dvojezični podnapis lahko skriva dve povsem različni postavitvi. Naučite se jih ločevati in izdelava, razdeljevanje ter pretvorba vam ne bodo več povzčale preglavic.",
   "ctaText": "Delo z dvojezičnimi podnapisi"
  },
  "body": [
   {
    "h2": "Kako izgledata obe obliki",
    "ps": [
     "**Oblika B: dve iztočnici na isti časovnici.** Ena vrstica dialoga postane dve ločeni iztočnici podnapisov z enakim časom – ena angleška, ena kitajska – narisani ena na vrhu druge. To je najpogostejši način izdelave dvojezičnih podnapisov ASS."
    ]
   },
   {
    "h2": "Kje posamezna oblika odpove",
    "ps": [
     "Šibka točka oblike A je **zaznavanje**: razdeljevanje sledilnih stez se opira na pisni sistem, zato se kitajsko-angleški ali japonsko-angleški pari ločijo na prvi pogled, medtem ko **kombinacij, ki si delijo eno pisavo** – angleščina in francoščina ali kitajščina in japonski kandži – ni mogoče ločiti. Šibka točka oblike B je **produkcija**: časovnici se morata natančno ujemati, ročno poravnavanje pa je utrujasto; nekateri predvajalniki prav tako narišejo obe iztočnici z iste časovnice, kar utesnjuje zaslon. Zlato pravilo: uporabite obliko A za končne podnapise, namenjene gledalcem; obliko B uporabite, ko morate sledilni stezi ločiti za nadaljnje delo."
    ]
   },
   {
    "h2": "The Two Routes :: Dve poti",
    "ps": [
     "**Zgradite dvojezične podnapise iz izvirnika**: uporabite [[Prevajanje podnapisov z umetno inteligenco|/translate.html]] in pri izvozu izberite »Dvojezično · izvirnik zgoraj« ali »Dvojezično · prevod zgoraj« – obliko A dobite neposredno; izbira ASS ponuja tudi dve postavitvi, »zloženo zgoraj in spodaj« ter »dve vrstici na dnu«.",
     "**Združite dve sledilni stezi ali pretvarjajte med oblikami**: uporabite [[Odstranjevalec dvojezičnih podnapisov|/bilingual.html]] in njegov način »združi v en vnos z dvema vrsticama« – oblika B vstopi, oblika A izstopi; v obratni smeri »razdeli v dve datoteki« sprejme obliko A ali B ter vrne dve neodvisni sledilni stezi."
    ],
    "img": {
     "file": "bilingual-modes",
     "alt": "Štirje načini dvojezičnega odstranjevalca; »združi v en vnos z dvema vrsticama« združi dve iztočnici, ki si delita časovnico",
     "cap": "»Združi v en vnos z dvema vrsticama«: oblika B postane oblika A"
    }
   },
   {
    "h2": "Katera naprava jo bo predvajala",
    "ps": [
     "Spletni predvajalniki (HTML5 `<track>`) in večina mobilnih predvajalnikov z obliko A upravljajo zanesljiveje; namizni predvajalniki (VLC, mpv, PotPlayer) sprejemata obe in lahko obema iztočnicama z iste časovnice celo dodelita različne barve in položaje. V dvomih izvozite obliko A kot SRT – ta se prenaša najbolje. Za razlike med samimi formati si oglejte [[SRT, VTT ali ASS: Katerega naj uporabite|/guides/subtitle-format-comparison.html]]."
    ],
    "img": {
     "file": "translate-export",
     "alt": "Možnosti dvojezičnega sloga v izvozni plošči orodja za prevajanje",
     "cap": "Izberite vrstni red dvojezičnih vrstic neposredno ob izvozu – en korak in narejeno je"
    }
   },
   {
    "h2": "FAQ :: Pogosta vprašanja",
    "ps": [
     "**Dvojezični podnapisi so videti utesnjeni – kaj lahko storim?** Nadzorujte širino vrstice: izvozna plošča orodja za prevajanje ima nastavitev »širina dvojezične vrstice«; ožja vrstica pomeni manj znakov na iztočnico in čistejši zaslon.",
     "**Želim samo eno sledilno stezo.** Možnost odstranjevalca »obdrži samo izvirnik / obdrži samo prevod« to reši s enim klikom, glejte [[Razdeli dvojezične podnapise na dve sledilni stezi|/guides/split-bilingual-subtitles.html]]."
    ]
   }
  ]
 },
 "merge": {
  "seo": {
   "title": "Združevanje dvojezičnih in oblikovanih podnapisov – Združi, oblikuj, izvozi – AI-SRTSub",
   "desc": "Združite dve datoteki s podnapisi v dvojezično sledilno stezo, ponovno oblikujte obstoječo dvojezično datoteko ali oblikujte enojezično: načini seznanjanja, predloge ASS in VTT ter kateri format izvoziti.",
   "h1": "Kako uporabljati dvojezično združevanje in podnapise s posebnimi učinki",
   "intro": "Združite dve datoteki s podnapisi v eno dvojezično sledilno stezo ali neposredno oblikujte podnapise: pisava, barva, obroba in položaj delujejo po načelu \"kar vidiš, to dobiš\", predogled pa se ujema z izvozom.",
   "ctaText": "Odprite orodje za podnapise s posebnimi učinki"
  },
  "body": [
   {
    "h2": "What this tool does :: Kaj to orodje počne",
    "ps": [
     "Ta ena stran dejansko pokriva tri naloge: združevanje izvirne in prevedene datoteke s podnapisi v eno dvojezično datoteko, prilagajanje vrstnega reda in sloga datoteke, ki je že dvojezična, ter dodajanje posebnih učinkov enojezični datoteki. Vse tri si delijo iste parametre sloga in isti predogled."
    ]
   },
   {
    "h2": "Three jobs, one page :: Tri naloge, ena stran",
    "ps": [
     "V vrhu strani so trije zavihki: **Združi dve datoteki**, **Prilagodi dvojezično datoteko**, **Enojezična datoteka**. Vaša izbira določa, koliko vhodnih stolpcev se pojavi na levi.",
     "Pri združevanju dveh datotek leva stran vsebuje dva stolpca, \"1 Izvirni podnapisi\" in \"2 Prevedeni podnapisi\"; vsak sprejme naloženo datoteko ali neposredno prilepljeno besedilo. Prilagajanje dvojezične datoteke in oblikovanje enojezične datoteke potrebujeta vsaka le en stolpec."
    ],
    "img": {
     "file": "merge-mode",
     "alt": "Trije zavihki na vrhu orodja za podnapise s posebnimi učinki in vhodno območje na levi",
     "cap": "Trije zavihki na vrhu; izbira možnosti »Združi dve datoteki« prikaže izvirni in prevedeni stolpec na levi"
    }
   },
   {
    "h2": "Kako sta dve datoteki seznanjeni",
    "ps": [
     "Prvi element pod »3 Nastavitve združevanja« je način seznanjanja: **Seznani po vrstnem redu · uporabi izvirno časovnico**, **Seznani po časovnici · uporabi izvirno časovnico**, **Seznani po vrstnem redu · uporabi prevedeno časovnico**.",
     "Ko imata obe datoteki enako število vnosov v enakem vrstnem redu, je seznanjanje po vrstnem redu najvarnejše. Ko se števila razlikujeju (ena stran je združila vnose, druga jih je razdelila), seznanite po časovnici in pustite, da orodje vzpostavi ujemnost glede na bližino. Katero časovnico uporabiti, je odvisno od tega, katera datoteka je natančnejša – običajno izvirna.",
     "Pod tem sta struktura besedila (samodejna zaznava / dve vrstici na vnos / izmenični pari) in vrstni red (izvirnik zgoraj / prevod zgoraj)."
    ],
    "img": {
     "file": "merge-pair",
     "alt": "Možnosti načina seznanjanja, strukture besedila in vrstnega reda pod nastavitvami združevanja",
     "cap": "Način seznanjanja določa, katera vrstica gre s katero, tukaj pa je nastavljeno tudi, čigavo časovnico je treba uporabiti"
    }
   },
   {
    "h2": "Prilagodite slog element za elementom",
    "ps": [
     "Plošča za slog se nahaja na desni. Ko izvozite ASS, velja blok »Videz ASS«: postavitev (razdeljeno · ločeno zgoraj in spodaj / zloženo · dve vrstici na dnu), velikost, barva, motnost, pisava, krepko, ležeče, medčrkovni razmik, obroba, barva obrobe, sena/ozadje (brez / sena / ozadje), globina, barva robu, motnost robu, vodoravna poravnava (dno · levo / dno · sredina / dno · desno) in razdalja od dna prevodne (primarne) vrstice, poleg tega pa še pisava, sena/ozadje in levi/desni rob izvirne (sekundarne) vrstice.",
     "Ko izvozite dvojezično oblikovanje VTT, velja blok »Slog WebVTT«: poleg šestih prednastavitev (standardno / strnjeno / kinematografsko / zgoraj / dostopno / pokončno) lahko spremenite navpično vrstico, sidro (dno / vrh / sredina), vodoravni položaj, velikost širine, vrednost poravnave in višino vrstice celotne iztočnice, poleg tega pa še barvo ozadja, motnost ozadja in širino obrobe prevodne vrstice; izvirna vrstica lahko podeduje glavni slog ali pa je nastavljena ločeno.",
     "Ko končate, lahko rezultat shranite kot prednastavitev in jo pozneje ponovno uporabite tako, da jo izberete pod »Iz shranjenih prednastavitev« in kliknete »Uporabi«."
    ],
    "img": {
     "file": "merge-style",
     "alt": "Parametri plošče za videz ASS na desni",
     "cap": "Velikost, barva, obroba, sena/ozadje in poravnava so v celoti nastavljivi, rezultat pa je mogoče shraniti kot prednastavitev"
    }
   },
   {
    "h2": "Pred izvozom preverite predogled",
    "ps": [
     "\"Predogled združitve\" je tabela: #, čas, izvirnik, prevod, slog. Vrstica zgoraj filtrira sumljive vrstice glede na \"ima zvočne učinke\", \"ima predpono govorca\", \"krajše od 1 sekunde\", \"več kot dve vrstici\" in \"hitrost branja je presežena\", ali glede na ključno besedo, ki jo vnesete.",
     "S klikom na polje za slog v vrstici razširite urejevalnik tega polja in prikažete samo vrstice, ki ga uporabljajo; »Počisti vse preglase« vrne vsako ročno preglasitev na predlogo. Spodnje območje za prilagoditev časovnice obravnava globalni zamik (iz dane iztočnice) in sorazmerno skaliranje.",
     "Ko je videti pravilno, pojdite na 4 Izvozi: prenesite datoteko s podnapisi ali kopirajte njeno vsebino."
    ],
    "img": {
     "file": "merge-preview",
     "alt": "Tabela predogleda združitve in njena vrstica s filtri",
     "cap": "Predogled je izvoz; filtrirajte sumljive vrstice po vrsti ali razširite posamezno polje za slog"
    }
   },
   {
    "h2": "Kar ostane nedotaknjeno",
    "ps": [
     "Oblikovanje spremeni samo videz, nikoli pa dialoga. Besedilo izvirnika in prevoda se med združevanjem ne spremeni niti za en sam znak; razen če ga namenoma spremenite v območju prilagajanja pod predogledom, časovnica izhaja iz datoteke, ki ste jo izbrali.",
     "Ko izvozite SRT ali »VTT brez oblikovanja«, v datoteko ni zapisana nobena informacija o slogu – stran vam pove, da VTT nima bloka STYLE in da bo predvajalnik uporabil svoj privzeti videz. Če želite oblikovanje, izberite dvojezično oblikovanje VTT ali ASS."
    ]
   },
   {
    "h2": "Common questions :: Pogosta vprašanja",
    "ps": [
     "**Kaj pa, če imata datoteki različno število vnosov?** Uporabite »Seznani po časovnici« in orodje se ujema glede na bližino; vnosi, katerih ni mogoče uskladiti, se ne izmislijo.",
     "**Kaj pa, če predvajalnik prezre oblikovanje v izvoženem ASS-ju?** Slogi so shranjeni v datoteki, vendar se podpora predvajalnikov za ASS razlikuje. Če potrebujete bolj prenosljiv videz, izvozite dvojezično oblikovanje VTT.",
     "**Kako se vrnem na začetno predlogo, ko sem jo pokvaril?** »Obnovi privzete parametre« v bloku ASS in »Obnovi privzete vrednosti predloge« v bloku VTT ponastavita vsak svoj razdelek.",
     "**Kaj predstavlja sedem vrstic v vzorcu?** So vgrajen primer, ki je tu le zato, da vidite, kako je videti združitev; vzorca ni mogoče izvoziti. Naložite lastne podnapise, kliknite predogled združitve in samodejno se bodo zamenjali."
    ]
   },
   {
    "h2": "Privacy :: Zasebnost",
    "ps": [
     "Podnapisi se obdelujejo izključno v brskalniku: nič se ne naloži in nič ne gre prek strežnika. Zaprite brskalnik in vse iz te seje je izbrisano."
    ]
   },
   {
    "h2": "Povezana orodja in vodniki",
    "ps": [
     "Za razdelitev dvojezične datoteke nazaj na dve sledilni stezi uporabite [[Dvojezična razdelitev|/bilingual.html]]; za obratno pot in pretvorbo enega jezika v dvojezično datoteko glejte [[Dva načina za izdelavo dvojezičnih podnapisov|/guides/make-bilingual-subtitles.html]]; poženite rezultat skozi [[Nadzor kakovosti podnapisov|/qc.html]]; za celotno sezono naenkrat uporabite [[Paketna pretvorba|/batch.html]]."
    ]
   }
  ]
 },
 "qc": {
  "seo": {
   "title": "Kako uporabljati nadzor kakovosti podnapisov – Preverjanje časovnice in postavitve – AI-SRTSub",
   "desc": "Nadzor kakovosti podnapisov: 17 pravil zazna prekrivanja, širino vrstice, hitrost branja in ločila, pragovi za 27 jezikov. Polovica so popravki z enim klikom; prenesite poročilo.",
   "h1": "Kako uporabljati nadzor kakovosti podnapisov",
   "intro": "Preden izročite podnapise, jih poženite skozi stran za nadzor kakovosti glede časa in postavitve: kaj se preverja, kako brati poročilo in katere težave je mogoče odpraviti z enim klikom – vse to je zajeto tukaj.",
   "ctaText": "Odpri kontrolo kakovosti podnapisov"
  },
  "body": [
   {
    "h2": "Čemu je namenjeno to orodje",
    "ps": [
     "Podnapisi, ki so s prostim očes videti v redu, se ob dostavi pogosto izkažejo za takšne z prekrivajočimi se časovnicami, preširokimi vrsticami ali previsoko hitrostjo branja. Stran za nadzor kakovosti te težave navaja eno za drugo:"
    ]
   },
   {
    "h2": "Najprej izberite jezikovna pravila",
    "ps": [
     "Pod razdelkom »Preveri po pravilih katerega jezika« nastavite pet pragov: **največja širina enojne vrstice** (42 enot polovične širine za ležeče privzeto, 36 za kvadratno, 28 za pokončno), **omejitev hitrosti branja** (18 enote širine na sekundo za kitajščino, japonščino in korejščino, 20 za druge jezike), **najmanjše trajanje 833 milisekund**, **največje trajanje 7000 milisekund** in **največ 2 vrstic**. Nastavite jezik podnapisov na samodejno zaznavo ali ročno izberite enega od 27; usmerjenost zaslona spremeni le raven širine vrstice – hitrost branja, trajanja in število vrstic ostanejo nespremenjeni. Enote polovične širine so skupna mera: en hanzi šteje kot 2, ena latinična črka kot 1 – širina vrstice 42 je enaka 21 hanzijem ali 42 črkam."
    ],
    "img": {
     "file": "qc-rules",
     "alt": "Nastavitve nadzora kakovosti: pet vnosnih polj pragov ter spustna seznama za jezik podnapisov in usmerjenost zaslona",
     "cap": "Pet pragov + jezik + usmerjenost; privzete vrednosti se ujemajo s splošno industrijsko prakso"
    }
   },
   {
    "h2": "Reading the Report :: Branje poročila",
    "ps": [
     "Poročilo o 17 pravilih javlja ugotovitve na treh ravneh: **napake** (popačeno besedilo, oblika časovne oznake, konec pred začetkom, prekinjeno oštevilčenje), **opozorila** (prazni vnosi, prekrivanja, prekratka ali predolga trajanja, hitrost branja nad mejo, preširoke vrstice, več kot dve vrstici) in **namigi** (položaj preloma vrstice, začetni ali končni presledki, manjkajoči presledki, norme ločil in drugo). Vsaka ugotovitev nosi številko vnosa in podrobnost »izmerjeno X, prag Y«, seznam pa je mogoče filtrirati po ravni. Dvojezični vnosi prejmejo izjeme: obe obliki se zaznavata samodejno, preverjanja prekrivanja izvzemajo celoten par, hitrost branja pa šteje samo vrstico, napisano v ciljnem jeziku."
    ],
    "img": {
     "file": "qc-report",
     "alt": "Območje poročila o nadzoru kakovosti: ugotovitve, razvrščene po napakah, opozorilih in namigih, vsaka s številko vnosa in izmerjeno vrednostjo",
     "cap": "Tristopenjsko poročilo: vsaka ugotovitev nosi svojo številko vnosa in izmerjene vrednosti/vrednosti praga"
    }
   },
   {
    "h2": "Fixing and Exporting :: Popravljanje in izvoz",
    "ps": [
     "Kartica »Popravi in izvozi« navaja samo **samodejno popravljive« postavke: ponovno zavihtevanje, odstranjevanje praznih vnosov, dodajanje manjkajočih presledkov, zamenjava ločil v skladu z jezikovnimi normami, ponovno oštevilčenje – vse, kar pušča časovno umestitev nedotaknjeno, je privzeto označeno; **postavke, ki spreminjajo časovno umestitev« (zamenjava začetka in konca, premikanje prekrivanj, obrezovanje ali raztezanje trajanja), so privzeto označene kot potrjene – označite jih, potem ko sami preverite vpliv. Kliknite »Uporabi popravke« in samodejno se zažene sveže preverjanje; števec šteje samo tisto, kar je bilo dejansko popravljeno – vrstice, ki jih ni bilo mogoče ponovno zavihteti, se ne napihujejo v številkah. Hitrost branja nad mejo nima samodejnega popravka«: stroj ne more vedeti, katero besedo je treba izrezati, zato je treba prevod skrajšati ročno ali prilagoditi časovno umestitev. Po popravljanju izvozite SRT ali VTT ali kliknite »Prenesi poročilo«, da shranite poročilo v navadnem besedilu `.qc.txt`."
    ],
    "img": {
     "file": "qc-fix",
     "alt": "Kartica za popravke: potrditvena polja za samodejno popravljive postavke in gumb Uporabi popravke",
     "cap": "Na seznam se uvrstijo le samodejno popravljive postavke; popravki, ki spreminjajo časovno umestitev, so privzeto označeni"
    }
   },
   {
    "h2": "FAQ :: Pogosta vprašanja",
    "ps": [
     "**Zakaj moje datoteke ASS ni mogoče izvoziti?** Nadzor kakovosti izvozi samo SRT in VTT; ASS gre vanj, vendar ne pride ven. Če želite ohraniti učinke ASS, to najprej premislite pri [[Pretvornik formatov|/convert.html]].",
     "**Kaj pomeni hitrost branja 18?** Za kitajščino, japonščino in korejščino je zgornja meja 9 znakov polne širine na sekundo (18 enot polovične širine); drugi jeziki prejmejo 20 enote polovične širine na sekundo. To so običajne ravni udobja, vnosno polje pa vam omogoča, da jih spremenite.",
     "**Ali je mogoče preveriti mojo datoteko s pokvarjenim kodiranjem?** Nadzor kakovosti bere izključno UTF-8; najprej popravite kodiranje na strani za popravilo popačenega besedila.",
     "**Ali se bo dotaknil moje časovnice?** Ne, dokler puščate skupino »spreminja časovno umestitev« neoznačeno; tudi ko je označena, je vsaka sprememba natančno opisana, preden se popravek uporabi."
    ]
   },
   {
    "h2": "Related Guides :: Povezani vodniki",
    "ps": [
     "Podnapisi drsijo mimo prehitro, da bi jih lahko brali – si oglejte namenski vodnik [[Podnapisi so prehitri za branje|/guides/subtitle-too-fast.html]]. Kaj je treba preveriti pred dostavo – kontrolni seznam je na [[Kaj je treba preveriti pred dostavo|/guides/subtitle-quality-check.html]]. Časovnica, ki zaide iz sinhronizacije, je drugačna vrsta težave – si oglejte [[Podnapisi izgubljajo sinhronizacijo|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "remove-subtitle-ads": {
  "seo": {
   "title": "Odstranite oglasne in vodne žige iz podnapisov – AI-SRTSub",
   "desc": "Odstranite vodne žige in oglasne vsebine iz podnapisov: URL-naslovi, zasluge skupin za podnaslavljanje in oznake \"encoded by\" se počistijo z enim klikom, skupaj s podvojenimi in praznimi vnositami. – AI-SRTSub",
   "h1": "Odstranite oglasne in vodne žige iz podnapisov",
   "intro": "URL-naslovi, zasluge in promocijski vnosi, skriti v vaših podnapisih, se v enem prehodu počistijo s pravili čistilnika za vodne žige – vsak napačen izbris pa je mogoče razveljaviti vnos za vnosom.",
   "ctaText": "Očistite vodne žige podnapisov"
  },
  "body": [
   {
    "h2": "Kaj so ti vodni žigi",
    "ps": [
     "Podnapisi, preneseni prek spleta, imajo pogosto dodatne vnose na začetku ali koncu (včasih tudi v sredini): URL-naslove, e-poštne naslove, imena skupin za podnaslavljanje, zasluge `encoded by` / `translated by`, imena spletnih mest, kot je opensubtitles, in vrstice, kot so »sledite našemu računu WeChat« ali »samo za študijske namene«. To so običajni vnosi podnapisov – s časovnico, ki zasedajo vrstico – zato jih predvajalniki ne morejo odstraniti; zaznati jih je treba glede na vsebino."
    ]
   },
   {
    "h2": "Where to do it :: Kje to storiti",
    "ps": [
     "Odprite [[Čistilnik podnapisov|/clean.html]] in vanj spustite svoj podnapis; skupina »Vodni žigi in nekoristni vnosi« ima privzeto označene možnosti »Odstrani vodne žige in oglasne napise«, »Odstrani podvojene vnose« in »Odstrani prazne vnose«, čiščenje pa se začne samodejno. Zaznavanje deluje na dveh ravneh: **strogi signali**, kot so URL-ji, e-poštna sporočila, skupine za fansub in imena spletnih mest, ob zadetku izbrišejo celoten vnos ne glede na dolžino; **mehki signali**, kot so ročaji @ ter zasluge za »kodiranje« (encoded) ali »lekturo« (proofread), se presojajo samo pri kratkih vnosih, ki ne presegajo 40 znakov, da se prepreči rezanje dolgih dialogov. Pri dvojezičnih vnosih se najprej vrstica za vrstico odstranijo vodni žigi, medtem ko se vrstice dialogov ohranijo; vnos se v celoti izbriše le, če po odstranjevanju ostanejo sledi vodnih žigov."
    ],
    "img": {
     "file": "clean-opts",
     "alt": "Zaslon z možnostmi čiščenja: tri potrditvena polja skupine vodnih žigov in nezaželenih vnosov",
     "cap": "Skupina »Vodni žigi in nezaželeni vnosi« je privzeto vklopljena – ročna namestitev ni potrebna"
    }
   },
   {
    "h2": "Review and export :: Pregled in izvoz",
    "ps": [
     "Na seznamu sprememb vsak izbrisan vnos nosi oznako »voda žig in oglas« – preletite jo, da potrdite, da nič ni bilo odstranjeno po pomoti; če je kaj videti narobe, kliknite »Obnovi«, da jo vrnete. Ko je potrjeno, prenesite: ime datoteke samodejno dobi oznako `.clean`. Čiščenje poteka lokalno v vašem brskalniku; vaši podnapisi se nikoli ne pošiljajo nikamor."
    ]
   }
  ]
 },
 "repair": {
  "seo": {
   "title": "Kako popraviti popačene (mojibake) podnapise – Zaznaj kodiranje – AI-SRTSub",
   "desc": "Vodnik: zaznajte izvirno kodiranje (GBK / Big5 / Shift_JIS / EUC-KR), razvrstite popravke glede na to, kaj najbolj spominja na jezik, nato shranite kot UTF-8 z BOM-om ali GBK. Časovne umestitve in številke indeksov se nikoli ne spremenijo.",
   "h1": "Kako popraviti popačene podnapise",
   "intro": "Datoteka s podnapisi, polna smetnih znakov, je le redko poškodovana – preprosto bila je prebrana z napačnim kodiranjem. Orodje za popravilo zazna izvirno kodiranje in vrne prave znake, pri čemer številke indeksov in čase pusti pri miru.",
   "ctaText": "Odprite orodje za popravilo popačenih besedil"
  },
  "body": [
   {
    "h2": "What this tool does :: Kaj to orodje počne",
    "ps": [
     "Isti bajti, prebrani kot UTF-8 in prebrani kot GBK, proizvedejo dva popolnoma različna nabora znakov – datoteka ni poškodovana, le dekodirana je bila z napačnim kodiranjem. Tukaj je, kaj počne orodje za popravilo:"
    ]
   },
   {
    "h2": "Naložite datoteko, ne lepite je",
    "ps": [
     "Obe vstopni točki lahko popravita različne stopnje škode, zato **naložite datoteko, če je to mogoče**. Pri datoteki so izvirni bajti še vedno tam: orodje preizkuša enega za drugim in ko prepozna GBK, dekodira kot GBK – ničesar ni treba ugibati. Besedilo, ki prispe z lepljenjem, ni več surovi bajti. Do trenutka, ko brskalnik preda niz, je napaka že nastala, zato lahko orodje dela le nazaj in vzame, kar lahko dobi.",
     "Če prilepljeno besedilo že vsebuje nadomestni znak (tisti uokvirjeni vprašaj `�`), so izvirni bajti že zdavnaj izginili in nič jih ne more vrniti. Stran to odkrito pove: vrnite se gor in uporabite »Izberi datoteko«, da naložite izvirnik."
    ],
    "img": {
     "file": "repair-up",
     "alt": "Območje za nalaganje na strani za popravilo: območje za spuščanje in polje za lepljenje, z zaznanim kodiranjem zgoraj",
     "cap": "Povlecite datoteko vanj ali jo poiščite; polje za lepljenje je spodaj in lahko popravi precej manj"
    }
   },
   {
    "h2": "Kaj vam sporoča diagnoza",
    "ps": [
     "Ko jo naložite, kartica z diagnozo poda sodbo. **Ni najdenih popačenih znakov**: vsebina se bere v redu takšna, kot je; če vaš predvajalnik še vedno prikazuje smeti, je predvajalnik uporabil napačno kodiranje – spustite se do »Shrani kot«, izberite drugo in mu predajte to datoteko. Ko je **videti kot popačeno besedilo**, kartica navaja, katero sled je našla:"
    ],
    "img": {
     "file": "repair-diag",
     "alt": "Kartica z diagnozo: sodba ter vsaka sled popačenega besedila, navedena vrstico za vrstico",
     "cap": "Diagnoza navaja sledi po vrstah, namesto da bi preprosto rekla »to je popačeno besedilo«"
    }
   },
   {
    "h2": "Kako so kandidati razvrščeni in kako izbrati",
    "ps": [
     "Pod »Načini za popravilo« so kandidati navedeni v vrstnem redu **najbolj podobno pravemu jeziku na prvem mestu**, do 12 njih, vsak pa je označen s parom kodiranj, iz katerih in v katera je bil prebran. Kliknite enega, da vidite, kako je videti, ga izberite, nato se pomaknite navzdol za shranjevanje. Niste zadovoljni? Uporabite »Obdrži nespremenjeno«, da se vrnete na izvirnik.",
     "Vrstni red izhaja iz ocene: delež pogostih znakov, nizi naglasov, nizi simbolov, zidovi nejasnih znakov, pri čemer je vse uteženo. **Če nobena ocena ni očitno boljša, ni priporočeno nič** – ne bo vam vsiljeval polplavetnega kandidata samo zato, da bi ga imel. Besedilo, ki je bilo dvakrat poškodovano (enkrat napačno shranjeno, nato enkrat napačno popravljeno), dobi še en dodaten krog povratnega reševanja na vrhnjih kandidatih, tako da je mogoče rešiti karkoli znotraj dveh plasti."
    ],
    "img": {
     "file": "repair-fix",
     "alt": "Seznam kandidatov za popravilo, razvrščen glede na to, koliko spominja na pravi jezik, pri čemer je vsak označen s svojim parom kodiranj",
     "cap": "Kandidati, razvrščeni po »najbolj podobno pravemu jeziku«, pri čemer vsak prikazuje vključena kodiranja"
    }
   },
   {
    "h2": "Pravilno shranjevanje je zadnji korak",
    "ps": [
     "Popravljen rezultat je treba še vedno pravilno shraniti. Ko predvajalnik ne more zaznati UTF-8, shranjevanje kot **UTF-8 z BOM-om** (predvajalniki za Windows se zanašajo na BOM) ali kot **GBK** to običajno reši. Shranite lahko kot UTF-8, UTF-8 (z BOM-om), GBK, Big5, Shift_JIS ali EUC-KR; če kaj ne ustreza, boste opozorjeni, da izberete drugo (GBK ne more vsebovati korejščine). Prenesene datoteke dobijo dodano pripono `-fixed` k imenu.",
     "Ko zaznano kodiranje ni UTF-8, je možnost »Shrani kot« za vas že vnaprej nastavljena na UTF-8 z BOM-om. Ko sami sežete po spustnem seznamu, vas neha uganovati."
    ],
    "img": {
     "file": "repair-out",
     "alt": "Območje rezultata: besedilno polje s spustnim seznamom za shranjevanje kot in gumbom za prenos",
     "cap": "Izberite kodiranje, nato prenesite – imenu datoteke se doda -fixed"
    }
   },
   {
    "h2": "Kar se nikoli ne dotakne",
    "ps": [
     "Zamenjani so samo napačno prebrani znaki. Številke indeksov, časi in vrstice sloga ASS se na noben način ne spreminjajo."
    ]
   },
   {
    "h2": "FAQ :: Pogosta vprašanja",
    "ps": [
     "**Datoteko sem naložil, zakaj jo moram torej še enkrat shraniti?** Sama datoteka je običajno v redu; pokvarjeno je to, da jo predvajalnik bere z napačnim kodiranjem. V tem primeru v besedilu ni treba spreminjati nobenega znaka – samo shranite kopijo kot UTF-8 z BOM-om ali GBK in jo izročite predvajalniku.",
     "**Zakaj ni mogoče popraviti prilepljenega besedila?** Ko se v prilepljeni vsebini pojavi nadomestni znak, so izvirni bajti izginili in ni ničesar, iz česar bi lahko sklepali nazaj. Vrnite se gor in uporabite »Izberi datoteko«, da naložite izvirnik.",
     "**Kandidata, ki ga želim, ni na seznamu?** Nič ni priporočeno, razen če doseže očitno boljši rezultat od tistega, kar že imate. Poskusite preklopiti zaznano kodiranje na drugo in pustite, da se ponovno razvrsti.",
     "**Koliko datotek hkrati?** Ena naenkrat. Prenesite popravilo, nato vnesite naslednjo datoteko."
    ]
   },
   {
    "h2": "Privacy :: Zasebnost",
    "ps": [
     "Zaznavanje in popravilo potekata izključno v vašem brskalniku. Nobena vsebina podnapisov se nikoli ne pošlje na strežnik."
    ]
   },
   {
    "h2": "Povezana orodja in vodniki",
    "ps": [
     "Od kod izvirajo popačeni podnapisi in zakaj so na koncu videti tako – glejte [[Od kod izvirajo popačeni podnapisi|/guides/subtitle-garbled-characters.html]]; kodiranje je v redu, vendar je vsebina umazana – uporabite [[Čiščenje podnapisov|/clean.html]]; za preverjanje časa in hitrosti branja – [[Nadzor kakovosti podnapisov|/qc.html]]."
    ]
   }
  ]
 },
 "sbv-to-srt": {
  "seo": {
   "title": "Pretvornik SBV v SRT – Pretvorite YouTube podnapise – AI-SRTSub",
   "desc": "Pretvorite podnapise SBV, prenesene iz YouTuba, v SRT za CapCut, Premiere in predvajalnike. Časovne vrednosti ostanejo nedotaknjene – spremeni se le postavitev. Deluje v vašem brskalniku.",
   "h1": "SBV to SRT :: SBV v SRT",
   "intro": "Pretvorite podnapise SBV iz YouTuba v SRT: spustite datoteko, izberite SRT, prenesite. Časovne vrednosti so nedotaknjene – spremeni se le struktura.",
   "ctaText": "Convert SBV → SRT :: Pretvori SBV → SRT"
  },
  "body": [
   {
    "h2": "Kaj je SBV in od kod prihaja",
    "ps": [
     "SBV je ** YouTubov format podnapisov**: prenos »datotek s podnapisi« iz YouTuba vam pogosto prinese datoteko .sbv. Njena struktura je preprostejša od SRT – začetni in končni čas sta na **eni vrstici**, ločena z vejicami, besedilo sledi neposredno spodaj, številk iztočnic pa ni."
    ]
   },
   {
    "h2": "Zakaj jo predvajalniki zavračajo",
    "ps": [
     "Izven samega YouTuba večina programske opreme za urejanje in predvajalnikov ne podpira SBV-ja. Manjka mu blok oštevilčenja in svojo časovno vrstico piše drugače kot SRT, zato preimenovanje pripone ne pomaga ničesar – strukturo je treba dejansko zgraditi na novo."
    ],
    "img": {
     "file": "convert-upload-sbv",
     "alt": "Območje za nalaganje: naložena datoteka SBV, zaznana kot SBV",
     "cap": "SBV je zaznan takšen, kot je, preimenovanje pripone ni potrebno"
    }
   },
   {
    "h2": "How to convert :: Kako pretvoriti",
    "ps": [
     "Odprite [[pretvornik|/convert.html]], spustite SBV, izberite **SRT - SubRip** kot izhod, nato pretvorite in prenesite. Številke iztočnic so dodeljene na novo, prvotni prelomi vrstic znotraj iztočnice pa so združeni v eno vrstico (SRT dovoljuje večvrstične iztočnice; SBV je tukaj izvožen enovrstično)."
    ]
   }
  ]
 },
 "shift": {
  "seo": {
   "title": "Kako zamakniti čas podnapisov (zamik, merilo, dve sidri) – AI-SRTSub",
   "desc": "Ilustriran vodnik po urejevalniku časovne umestitve: naložite podnapise, dodajte korake prilagajanja, popravek z dvema sidroma, prilagoditve posameznih iztočnic in izvoz.",
   "h1": "Urejevalnik časovne umestitve: Vodnik korak za korakom",
   "intro": "Ta vodnik vodi skozi orodje od vrha do dna: naložite podnapise, dodajte korake prilagajanja, zaženite preverjanja, fino nastavite posamezne iztočnice in izvozite.",
   "ctaText": "Odprite urejevalnik časovne umestitve"
  },
  "body": [
   {
    "h2": "Load your subtitles :: Naložite svoje podnapise",
    "ps": [
     "Povlecite datoteko v črtkano polje ali kliknite, da jo izberete; prav tako lahko **prilepite vsebino** neposredno v besedilno polje. Format se zazna tako iz pripone kot iz vsebine, rezultat pa se prikaže v čipu oblike. Podprti vhodi: srt, vtt, ass (vključno s ssa), sbv, lrc in txt."
    ],
    "img": {
     "file": "shift-upload",
     "alt": "Območje za nalaganje: naložen vzorčni podnapis, zaznan kot SRT",
     "cap": "Ime datoteke in zaznani format se pojavita pod območjem za spuščanje; besedilno polje ostane urejanje omogočeno."
    }
   },
   {
    "h2": "Add adjustment steps :: Dodajte korake prilagajanja",
    "ps": [
     "Prilagoditve tvorijo **cevovod korakov**: vsak korak opravi eno nalogo in sprejme eno številko, z enoto, prikazano znotraj polja. Koraki veljajo od vrha do dna, sprememba katerega koli koraka pa **ponovno izračuna vse iz izvirnih podnapisov** – tako se lahko kadar koli vrnete in prilagodite število, ne da bi povzročili zmedo."
    ]
   },
   {
    "h2": "Popravek z dvema sidroma",
    "ps": [
     "Ko ne poznate ne zamika v sekundah ne razmerja, uporabite dve sidri: ko jih dodate, se **dve polji \"trenutno\" samodejno izpolnita** iz prve in zadnje iztočnice vaše datoteke. Izpolnite samo polja »cilj« – čase, v katerih bi se te iztočnice dejansko morale pojaviti. Vse vmes se sorazmerno prerazporedi."
    ],
    "img": {
     "file": "shift-step-two",
     "alt": "Popravek z dvema sidroma: trenutni casi samodejno izpolnjeni, ciljni casi za vnos",
     "cap": "Trenutna polja izvirajo iz vaše datoteke; ciljna polja so pravilni casi, ki jih vidite v videu."
    }
   },
   {
    "h2": "Preverjanje časovnice in prilagoditve posameznih iztočnic",
    "ps": [
     "Po izvedbi korakov preberite **preverjanje časovnice**: iztočnice, ki so predkratke, predolge, preveč goste za branje, vrstice, ki so preširoke, ali prekrivajoče se iztočnice, so vse navedene. Preverjanje **samo označuje težave in nikoli ničesar ne spremeni** samo od sebe. Štiri privzeta pravila so 0.833 s najmanjšega trajanja, 7 s največjega trajanja, 9 znakov na sekundo hitrosti branja in 21 znakov na vrstico – vse to je urejate na strani. Pod njim prilagoditve posameznih iztočnic omogočajo združitev dveh sosednjih iztočnic, razdelitev ene ali neposredno urejanje njenega začetka in konca; vsako urejanje je mogoče razveljaviti."
    ]
   },
   {
    "h2": "Export the result :: Izvozi rezultat",
    "ps": [
     "Plošča z rezultati prikazuje izvirne in prilagojene čase **drug ob drugem** za preprosto preverjanje na licu mesta. Izhodni format je privzeto enak vhodnemu formatu, vendar lahko pred prenosom preklopite na katerega koli od srt, vtt, ass, sbv, lrc ali txt."
    ],
    "img": {
     "file": "shift-result",
     "alt": "Plošča z rezultati: časi pred in po drug ob drugem, z gumboma za prenos in kopiranje",
     "cap": "Izvirni časi na levi, prilagojeni na desni; prenesite, ko je preverjanje na licu mesta videti pravilno."
    }
   }
  ]
 },
 "shift-subtitle-timing": {
  "seo": {
   "title": "Kako premakniti vse podnapise prej ali kasneje – AI-SRTSub",
   "desc": "Vsaka iztočnica zamuja za enako količino: uporabite korak zamika v urejevalniku časovne umestitve – vnesite eno negativno ali pozitivno število in vse iztočnice se premaknejo skupaj.",
   "h1": "Premaknite celotno datoteko podnapisov prej ali kasneje",
   "intro": "Zvok se začne, podnapis se prikaže pozno – in vsaka posamezna iztočnica zamuja za enako količino. To je enoten zamik: ena številka ga odpravi.",
   "ctaText": "Odprite urejevalnik časovne umestitve"
  },
  "body": [
   {
    "h2": "Najprej potrdite, da vsaka iztočnica zamuja za enako količino",
    "ps": [
     "Preverite eno iztočnico blizu začetka, eno na sredini in eno na koncu. Če vse tri zamujajo za približno enako količino, gre za **enoten zamik**, ki ga odpravi en korak zamika. Če je začetek pravilen in odklon raste proti koncu, je to drugačna težava – glejte [[podnapisi izgubljajo sinhronizacijo|/guides/subtitles-out-of-sync.html]]."
    ]
   },
   {
    "h2": "Kaj vnesti: negativno za pospešitev, pozitivno za zakasnitev",
    "ps": [
     "V urejevalniku časovne umestitve dodajte korak **Zamik vsega** in vnesite zamik v vnosno polje vrednosti: podnapisi, ki zamujajo, prejmejo negativno število, da se pomaknejo prej; tisti, ki prehitevajo, prejmejo pozitivno število, da se potisnejo kasneje. Če podnapisi zamujajo za 1.5 sekund, vnesite **-1.5** – enota so sekunde."
    ],
    "img": {
     "file": "shift-step-shift",
     "alt": "Korak zamika vsega z vnesenimi -1.5 sekundami",
     "cap": "Negativno število premakne celotno datoteko prej; enota je zapisana znotraj polja, v sekundah."
    }
   },
   {
    "h2": "Zaženite ga in preverite prvo iztočnico",
    "ps": [
     "Po uveljavitvi plošča z rezultati navaja izvirne in nove čase posamezne iztočnice **drug ob drugem**. Najprej preverite prvo iztočnico: ali novi začetni čas pade na kader, kjer je izrečena vrstica? Nato preverite eno na sredini. Vsaka iztočnica se premakne za enako količino in obdrži svoje trajanje."
    ]
   },
   {
    "h2": "Export :: Izvozi",
    "ps": [
     "Ko je preverjanje na licu mesta videti pravilno, neposredno prenesite. Izhodni format je privzeto enak vhodnemu formatu in ga je mogoče preklopiti na nekaj drugega. Sprememba se dotakne samo časov – niti enega znaka besedila."
    ]
   }
  ]
 },
 "simplified-traditional-chinese": {
  "seo": {
   "title": "Ni zamenjava znakov – eno-več in regionalne besede – AI-SRTSub",
   "desc": "Zaradi treh stvari je to težko: preslikave tipa eno-več, razrešene po besedah, različno tajvansko in hongkonško besedišče ter pretvarjanje samo dialoga. Ujemite vse troje prav in sledilo ne bo nikakršno človeško popravljanje.",
   "h1": "Poenostavljena vs. tradicionalna pisava ni zamenjava znakov",
   "intro": "Kateri tradicionalni znak nadomesti poenostavljenega, je odvisno od znaka zraven njega. Zato te pretvorbe ni mogoče izvesti z slepim zamenjevanjem enega znaka naenkrat.",
   "ctaText": "Open the converter :: Odprite pretvornik"
  },
  "body": [
   {
    "h2": "Prvič: ena poenostavljena oblika, več tradicionalnih",
    "ps": [
     "Poenostavitev je združila več tradicionalnih znakov v eno poenostavljeno obliko. V obratni smeri en poenostavljeni znak ustreza več tradicionalnim, izbira med njimi pa je odvisna od tega, s čim je seznanjen:",
     "Zamenjava znak za znakom vse združi v istega in vsak primer napačno razume. Razreševanje **po besedah** je tisto, kar jih ločuje – tabele izvirajo iz OpenCC in ujemajo fraze pred posameznimi znaki. Na primer:"
    ]
   },
   {
    "h2": "Drugič: Tajvan in Hong Kong nista isto",
    "ps": [
     "Po pretvorbi v tradicionalno pisavo obstaja še ena plast: ista beseda se v Tajvanu in Hong Kongu piše različno. Beseda za »programsko opremo« je v Tajvanu ena stvar, v Hong Kongu pa druga, Tajvan pa uporablja svojo besedo za »informacije«.",
     "Zato obstajajo ločene smeri. Tajvanska tradicionalna se celo deli na »spremeni besedilo« in »samo glife« – samo glifi ohranijo vaše obstoječe besedišče, medtem ko sprememba besedila zamenja tudi regionalne izraze. Hong Kong dobi svojo lastno smer."
    ],
    "img": {
     "file": "hanconv-dir",
     "alt": "Kartica za pretvorbo: ciljni spustni seznam prikazuje »Poenostavljena → tajvanska tradicionalna (spremeni besedilo)«",
     "cap": "Tajvan ponuja spremembe besedila ali samo glife; Hong Kong ima svojo smer"
    }
   },
   {
    "h2": "Tretjič: dotakniti se je treba samo dialoga",
    "ps": [
     "Datoteka s podnapisi ni le dialog. Številke indeksov, časi in vrstice sloga ASS so prav tako tam in niti en znak od tega ne sme biti pretvorjen – še posebej vrstice sloga ASS, saj vsebujejo imena angleških direktiv, ki se pokvarijo v tistem trenutku, ko se obravnavajo kot dialog.",
     "Zato pretvorba poteka po razčlenjevanju glede na format: SRT, VTT, ASS in TXT vsak posebej prepoznajo, kateri del je dialog, in pretvorijo se samo znaki znotraj njega. Časovne umestitve in slogi preživijo nedotaknjeni, brez potrebe po ponovnem oblikovanju."
    ],
    "img": {
     "file": "hanconv-out",
     "alt": "Območje rezultata: pretvorjeni podnapis in vrstica s statistiko, ki prikazuje število spremenjenih vrstic",
     "cap": "Vrstica s statistiko prikazuje, koliko vrstic se je spremenilo; oblikovanje se ohrani takšno, kot je"
    }
   },
   {
    "h2": "Vračanje na poenostavljeno: bodite pozorni",
    "ps": [
     "Pretvarjanje tradicionalne pisave v poenostavljeno od vas zahteva tudi, da poveste, **iz katere tradicionalne različice prihajate**: splošna, tajvanska in hongkonška so tri različne poti, ker je treba regionalno besedišče pred pretvorbo povrniti na splošno besedo. Izberite napačno smer in regionalno besedišče preživi v poenostavljenem izhodu.",
     "Spodnja skupina devetih smeri je tista, ki se pretvarja nazaj: tradicionalna → poenostavljena, tajvanska → poenostavljena, hongkonška → poenostavljena."
    ]
   },
   {
    "h2": "Povezana orodja in vodniki",
    "ps": [
     "Celoten vodnik – [[Kako pretvoriti poenostavljene in tradicionalne podnapise|/guides/hanconv.html]]; če vse, kar potrebujete, je pretvorba poenostavljenih v tradicionalne – [[Pretvori poenostavljene podnapise v tradicionalne|/guides/srt-simplified-to-traditional.html]]; za prevajanje v drug jezik – [[Prevajanje podnapisov|/translate.html]]."
    ]
   }
  ]
 },
 "split": {
  "seo": {
   "title": "Razrezovanje in združevanje podnapisov – Izrez po blokih, veriga po vrstnem redu – AI-SRTSub",
   "desc": "Izrežite eno datoteko na segmente glede na trajanje ali število iztočnic, ponastavite vsako na nič ali pa več datotek povežite v verigi po vrstnem redu ali jih prepletemo po časovnici. Številke iztočnic so preštevilčene, besedilo ostane nespremenjeno.",
   "h1": "Kako razrezati in združiti podnapise",
   "intro": "Izrežite eno dolgo datoteko s podnapisi na segmente ali pa združite več raztresenih datotek v eno. Izrez vedno pade na mejo vnosa – stavek ni nikoli prerezan na pol.",
   "ctaText": "Open split and join :: Odpri razrez in združevanje"
  },
  "body": [
   {
    "h2": "What this tool does :: Kaj to orodje počutí",
    "ps": [
     "Razrezovanje epizod, razrezovanje segmentov in združevanje virov se vsi soočajo z istim neskladjem med bloki podnapisov in video bloki: bodisi je treba eno datoteko izrezati bodisi jih je treba združiti več. Ta stran obravnava oboje, vsako na svojem zavihku."
    ]
   },
   {
    "h2": "Najprej izberite izrez ali združitev",
    "ps": [
     "Dva zavihka na vrhu: **Razrez: ena datoteka v segmente** in **Združitev: več datotek v eno**. Možnosti drugega koraka spodaj se spremenijo z vašo izbiro.",
     "V razdelku „1 Dodaj podnapise“ naložite datoteko ali prilepite besedilo; če ste izbrali napačno, kliknite »Počisti«. Ta stran bere samo UTF-8 – če je kodiranje pokvarjeno (zid vprašajev ali kvadratkov), najprej pojdite na [[Popravilo popačenega besedila|/repair.html]]."
    ],
    "img": {
     "file": "split-mode",
     "alt": "Dva zavihka na vrhu strani za razrez in združevanje",
     "cap": "Izrez in združitev sta dva zavihka; možnosti v drugem koraku sledijo vaši izbiri"
    }
   },
   {
    "h2": "How to cut :: Kako izrezati",
    "ps": [
     "Pod razdelkom „2 Kako izrezati“ izberite podlago: **trajanje** (en segment vsakih X minut) ali **število iztočnic** (en segment vsakih X iztočnic), nato vnesite številko.",
     "Označite „Ponastavi vsak segment na 0:00“ in vsak nastali segment se šteje od nič – to uporabite, ko naložite epizode in vsak segment posebej dodelite predvajalniku. Pustite neoznačeno, da ohranite izvirne časovne žige, tako da se vsak segment še vedno ujema s svojim položajem v izvirnem videoposnetku.",
     "Izrez pade samo na meje iztočnic: ko zelo dolg podnapis sega čez točko izreza, celotna iztočnica ostane v prejšnjem segmentu."
    ],
    "img": {
     "file": "split-cut",
     "alt": "Možnosti trajanja in števila iztočnic s stikalom za ponastavitev na nič na strani za razrez",
     "cap": "Izrežite po trajanju ali številu iztočnic ter izbirno ponastavite vsak segment na 0:00"
    }
   },
   {
    "h2": "How to join :: Kako združiti",
    "ps": [
     "Pod razdelkom „2 Kako združiti“ izberite metodo: **Poveži v verigi po vrstnem redu** premakne poznejšo datoteko tako, da se začne po koncu prejšnje, brez prekrivanja med segmenti; **Prepleti po časovnici** ohrani izvirne časovne žige posamezne datoteke in jih razvrsti glede na čas začetka.",
     "Povezavo v verigi po vrstnem redu uporabite, ko sta datoteki prva in druga polovica ene epizode ali ko je treba posebej lektorirani polovici ponovno sestaviti; prepletanje po časovnici uporabite, ko datoteki spadata skupaj na zaslon, na primer izvirna sled in prevedena sled.",
     "Po združitvi se številke iztočnic samodejno preštevilčijo in nobena beseda dialoga se ne spremeni."
    ],
    "img": {
     "file": "split-join",
     "alt": "Možnosti povezave v verigi po vrstnem redu in prepletanja po časovnici na strani za združevanje",
     "cap": "Povezava v verigi po vrstnem redu ustreza dvema polovicama ene epizode; prepletanje po časovnici ustreza izvirni in prevedeni sledi"
    }
   },
   {
    "h2": "Odnos do rezultata / Prevzem rezultata",
    "ps": [
     "„3 Rezultat“ na desni izvozi oblike **SRT** in **VTT**; kliknite »Prenesi« ali »Kopiraj«.",
     "Pri razrezovanju lahko uporabite »Prenesi vsak segment«, kar shrani vsak izrezan segment naenkrat namesto enega klika na segment."
    ],
    "img": {
     "file": "split-out",
     "alt": "Izbira oblike SRT/VTT z gumboma za prenos in prenos vsakega segmenta na območju rezultata",
     "cap": "Rezultate razreza je mogoče prenašati segment za segmentom; združena datoteka se prenese ali kopira neposredno"
    }
   },
   {
    "h2": "Kaj ostane nespremenjeno",
    "ps": [
     "Niti znak dialoga se ne spremeni. Ta stran spremeni samo to, katere iztočnice spadajo v kateri segment in kako so oštevilčene; vsebina vnosov ostane takšna, kot je.",
     "Pri možnosti „Poveži v verigi po vrstnem redu“ se časovni žigi poznejših datotek premaknejo kot celota – to zahteva združevanje; pri možnosti „Prepleti po časovnici“ se ohrani vsak izvirni časovni žig."
    ]
   },
   {
    "h2": "Common questions :: Pogosta vprašanja",
    "ps": [
     "**Kaj pa, če je zadnji segment zelo kratek?** To je normalno. Preostanek, ki ne zapolni celega segmenta, postane svoj segment, namesto da bi bil dopolnjen.",
     "**Ali bo stavek, ki se razteza čez točko izreza, razdeljen?** Ne. Izrezi padejo samo na meje vnosov, iztočnica, ki prečka črto, pa ostane v prejšnjem segmentu.",
     "**Kako sta po prepletanju razvrščeni dve iztočnici z enakima časoma?** Glede na čas začetka; ko sta časa začetka enaka, se ohrani vrstni red, v katerem ste dodali datoteke.",
     "**Ali je mogoče razdeliti ASS?** Ta stran obravnava SRT in VTT. Najprej pretvorite ASS v SRT ali VTT s pomočjo [[Pretvorba oblik zapisov|/convert.html]]."
    ]
   },
   {
    "h2": "Privacy :: Zasebnost",
    "ps": [
     "Podnapisi se obdelujejo izključno v brskalniku: nič se ne naloži in nič ne gre preko strežnika. Zaprite stran in vsebina je izginila."
    ]
   },
   {
    "h2": "Povezana orodja in vodniki",
    "ps": [
     "Za združitev dveh datotek v dvojezično sled (namesto v eno epizodo) uporabite [[Dvojezično združevanje in posebni učinki|/guides/merge.html]]; če je celotna časovnica zamaknjena, pojdite na [[Prilagoditev časovnice|/shift.html]]; za celotno sezono uporabite [[Paketna pretvorba|/batch.html]]; ko končate, pa zaženite [[Nadzor kakovosti podnapisov|/qc.html]]."
    ]
   }
  ]
 },
 "split-bilingual-subtitles": {
  "seo": {
   "title": "Razdeli dvojezične podnapise na dve sledi – AI-SRTSub",
   "desc": "Razdeli dvojezične podnapise v dve datoteki: izvirna in prevedena sled se preneseta ločeno z različnima imenoma; obe obliki sta prepoznani. – AI-SRTSub",
   "h1": "Razdeli dvojezične podnapise na dve sledi",
   "intro": "En dvojezični podnapis postane dve datoteki – „izvirnik“ in „prevod“: naložite, izberite razdelitev na dvoje, prenesite vsako posebej, pri čemer časovnice ostanejo nedotaknjene.",
   "ctaText": "Razdeli dvojezične podnapise"
  },
  "body": [
   {
    "h2": "Kdaj morate razdeliti",
    "ps": [
     "Vaš predvajalnik zahteva samo enojezično sled; ali pa želite prevodno sled za ponovni prevod oziroma izvirno sled za združitev z drugo prevedeno različico. Dvojezični podnapis je bodisi **ena iztočnica z dvema vrsticama** (izvirnik v eni vrstici, prevod v drugi) bodisi **dve ločeni iztočnici z isto časovnico** – oboje je mogoče razdeliti."
    ]
   },
   {
    "h2": "Where to do it :: Kje to storiti",
    "ps": [
     "Odprite [[Odstranjevalec dvojezičnih podnapisov|/bilingual.html]] in vanj povlecite svoj podnapis. Orodje samodejno zazna dvojezično obliko: ena iztočnica z dvema vrsticama se razdeli glede na pisavni sistem, dve iztočnici na isti časovnici pa po vrstnem redu. V spustnem meniju načina izberite **Razdeli na dvoje** in kliknite Začni (ali pustite, da se samodejno ponovno zažene). Območje rezultatov prikazuje dva dela: tisti s oznako `.orig` je izvirna sled, tisti s oznako `.dst` pa je prevedena sled – za vsakega kliknite »Prenesi«; obe sledi si delita popolnoma isto časovnico."
    ],
    "img": {
     "file": "bilingual-split",
     "alt": "Rezultat razreza: izvirna sled in prevedena sled kot dva dela, vsak z gumbom za prenos",
     "cap": "Razdeljeno na dvoje: .orig izvirna sled + .dst prevedena sled, vsaka prenesena posebej"
    }
   },
   {
    "h2": "One common pitfall :: Ena pogosta past",
    "ps": [
     "**Ene iztočnice z dvema vrsticama v jezikih, ki si delijo isto abecedo (na primer angleščina in francoščina), ni mogoče razdeliti.** Ko so sledi ločene po pisnem sistemu, se te štejejo kot en sam sistem in se obravnavajo kot enojezične. Takšno vsebino najprej pretvorite v obliko z isto časovnico B, nato jo razdelite; oblika z dvema iztočnicama se povezuje prek časovnice in se ne ozira na jezik. Za podrobnosti o obeh oblikah si oglejte [[Dva načina za izdelavo dvojezičnih podnapisov|/guides/make-bilingual-subtitles.html]]."
    ]
   }
  ]
 },
 "srt-file-format": {
  "seo": {
   "title": "Kaj je datoteka SRT? Kako jo odpreti in urediti – AI-SRTSub",
   "desc": "Anatomija datotek s podnapisi SRT (SubRip): številka, časovna vrstica, besedilo. Kako odpreti datoteko v urejeovalniku besedila, zakaj jo predvajalnik zavrne ter kako odpraviti popačeno besedilo in napake v časovnih žigih.",
   "h1": "Razlaga oblike datoteke SRT",
   "intro": "SRT je najmlajša in najbolj univerzalna oblika podnapisov: golo besedilo, preprosta struktura, sprejeta skoraj povsod. Ta vodnik razčlenjuje njeno zgradbo, načine odpiranja in odpravljanje pogostih napak.",
   "ctaText": "Odprite pretvornik podnapisov"
  },
  "body": [
   {
    "h2": "Kako je videti datoteka SRT",
    "ps": [
     "SRT (SubRip) je golo besedilo – odpre ga lahko kateri koli urejevalnik besedila. Vsaka iztočnica je sestavljena iz treh delov: **vrstice s številko**, **časovne vrstice** in **besedila**, ločenih s praznimi vrsticami. Časovna vrstica se glasi `00:00:01,000 --> 00:00:03,500` – bodite pozorni na **vejico** pred milisekundami in ne piko."
    ],
    "img": {
     "file": "convert-upload",
     "alt": "Območje nalaganja: naložena datoteka SRT, ki prikazuje številke in časovni razpored",
     "cap": "Standardna tridelna iztočnica SRT: številka, časovna vrstica, besedilo"
    }
   },
   {
    "h2": "How to open it :: Kako jo odpreti",
    "ps": [
     "Za branje vsebine: kliknite z desno miškino tipko in jo odprite s katerim koli **urejevalnikom besedila**. Če jo želite uporabiti z videoposnetkom, preimenujte datoteko tako, da se **ujema z imenom videodatoteke** (brez končnice), postavite obe v isto mapo in predvajalniki, kot so VLC, PotPlayer ali mpv, jo bodo samodejno naložili; povlečete jo lahko tudi na okno predvajalnika."
    ]
   },
   {
    "h2": "Odpravljanje zavrnitev in popačenega besedila",
    "ps": [
     "**Popačeni znaki**: datoteka ni v formatu UTF-8 – v urejevalniku jo ponovno shranite kot UTF-8. **Nič se ne prikaže**: preverite, ali časovna vrstica uporablja vejico (in ne pike) ter ali številke iztočnic niso prekinjene (večina predvajalnikov dopušča vrzeli, nekateri pa ne). **Datoteka je v obliki HTML ali JSON**: vir prenosov je bil napačen; prenesite jo znova."
    ]
   },
   {
    "h2": "Kaj SRT lahko in česar ne more vsebovati",
    "ps": [
     "SRT vsebuje samo besedilo in čas: **brez slogov** (pisave, barve), **brez pozicioniranja** (kje na zaslonu), **brez učinkov**. Za te je potreben ASS – glejte [[Pretvorba SRT v ASS|/guides/srt-to-ass.html]]. Za primerjavo vseh formatov drug ob drugem si oglejte [[primerjava formatov podnapisov|/guides/subtitle-format-comparison.html]]."
    ]
   }
  ]
 },
 "srt-fps-converter": {
  "seo": {
   "title": "Pretvornik frekvence sličic SRT – Spremenite hitrost sličic podnapisov – AI-SRTSub",
   "desc": "Film ima 24 sličic na sekundo (fps), televizijsko oddajanje pa 25 fps, zato podnapisi vsako minuto bolj zaostajajo: enkratno prilagodite časovnico s faktorjem 0.96 in celotna datoteka se ujema s ciljno hitrostjo.",
   "h1": "Pretvorba hitrosti sličic podnapisov: iz 24fps v 25fps",
   "intro": "Predvajajte podnapise filma s 24 fps na viru z 25 fps in vsako minuto bodo izgubili več kot sekundo – ob odjavni špici bodo zaostajali že za minute. Ena prilagoditev to odpravi.",
   "ctaText": "Odprite urejevalnik časovnega razporeda"
  },
  "body": [
   {
    "h2": "Zakaj neskladje hitrosti sličic povzroča zamikanje podnapisov",
    "ps": [
     "Pretvorba hitrosti sličic ponovno prebere **isto časovno obdobje pod dvema različnima urama**. Film s 24 fps, dolg 100 minut, ima 6000 s × 24 = **144,000 sličic**; na viru s 25 fps se te 144,000 sličice predvajajo v 5760 sekundah – **96 minut**. Celoten film se predvaja 4 minut prekratko, zato se iztočnica v minuti 50 pojavi približno 2 minut prepozno, podnapis odjavne špice pa se sploh ne prikaže."
    ]
   },
   {
    "h2": "Formula in pogosti dejavniki",
    "ps": [
     "Ciljna hitrost ÷ izvirna hitrost = množilnik. **Od 24 do 25: pomnožite z 0.96** (24÷25); v obratni smeri, od 25 do 24: 1.0417. **Od 25 do 23.976: pomnožite z 0.959**; v obratni smeri: 1.0427. V urejevalniku časovnega razporeda dodajte korak **Spremeni merilo glede na hitrost** in v polje za vrednost vnesite faktor."
    ],
    "img": {
     "file": "shift-step-rate",
     "alt": "Korak spreminjanja merila glede na hitrost z vneseno vrednostjo 0.96",
     "cap": "0.96 je 24÷25; namig na strani celo omenja pretvorbo hitrosti sličic kot pogosto uporabo."
    }
   },
   {
    "h2": "Ko ne poznate obeh hitrosti",
    "ps": [
     "Če ne najdete hitrosti sličic vira, ne ugibajte faktorja – namesto tega uporabite **dve sidriščni točki**: vzemite dejanski čas prikaza prve in zadnje iztočnice kot dve točki, vse vmes pa se sorazmerno raztegne nazaj. Glejte [[podnapisi postajajo vse bolj nesinhroni|/guides/subtitles-out-of-sync.html]]."
    ]
   },
   {
    "h2": "Kaj je treba preveriti pozneje",
    "ps": [
     "Prilagajanje merila premakne vsak začetek in konec; trajanja iztočnic se raztegnejo za isti faktor. Po izvedbi preverite oba ekstrema: prvo iztočnico (najmanjša izvirna napaka) in zadnjo (največja). Če se oba konca ujemata, se ujema tudi vse vmes."
    ]
   }
  ]
 },
 "srt-simplified-to-traditional": {
  "seo": {
   "title": "Pretvorite poenostavljene podnapise v tradicionalne – Tajvan ali Hong Kong – AI-SRTSub",
   "desc": "Pretvorite poenostavljene kitajske podnapise v tradicionalne: izberite tajvanske (z regionalnim besednjakom ali brez njega) ali hongkonške. Preslikave enega proti več se razrešijo glede na besedo. Spremeni se samo dialog; časovni žigi ostanejo nespremenjeni.",
   "h1": "Pretvorba poenostavljenih podnapisov v tradicionalne",
   "intro": "Poenostavljeni kitajski podnapisi, namenjeni tajvanskemu ali hongkonškemu občinstvu, potrebujejo le pretvorbo – vendar si obe regiji želita nekaj različnega, izbira napačne smeri pa prinaša besedno zvezo, ki jo domačini ne uporabljajo.",
   "ctaText": "Pretvorite ta podnapis"
  },
  "body": [
   {
    "h2": "The need :: Potreba",
    "ps": [
     "Vaši podnapisi so v poenostavljeni kitajščini in morajo doseči gledalce na Tajvanu ali v Hong Kongu. Popravljanje znakov enega za drugim ni realno – posamezna epizoda ima na stotine iztočnic –, poleg tega si obe regiji ne želita istega tradicionalnega besedila: besednjak se razlikuje, napačna smer pa povzroči besedno zvezo, ki je ne bi uporabil noben domačin."
    ]
   },
   {
    "h2": "Where to do it :: Kje to storiti",
    "ps": [
     "Odprite [[Pretvorba med poenostavljeno in tradicionalno pisavo|/hanconv.html]], povlecite podnapis in pod »Pretvori v« izberite eno od smeri poenostavljena → tradicionalna: splošna tradicionalna, tajvanska (sprememba besednjaka), tajvanska (samo znaki) ali hongkonška. Pretvorba se zgodi takoj, območje rezultatov pa prikazuje končani podnapis, pripravljen za prenos.",
     "**Za tajvansko občinstvo**: izberite „tajvanska (sprememba besednjaka)“, če se mora spremeniti tudi regionalni besednjak – »programska oprema« in »informacije« postaneta njuni tajvanski ustreznici – ali „tajvanska (samo znaki)“, če želite spremeniti le oblike znakov, hkrati pa obdržati izvirno besedno izbiro. **Za hongkonško občinstvo**: izberite „Hong Kong“, kjer je »programska oprema« zapisana v spet drugi obliki."
    ],
    "img": {
     "file": "hanconv-dir",
     "alt": "Kartica za pretvorbo: spustni meni cilja prikazuje »Poenostavljena → tajvanska tradicionalna (sprememba besednjaka)«",
     "cap": "Tajvan in Hong Kong sta ločeni smeri z različnim besednjakom"
    }
   },
   {
    "h2": "Common pitfalls :: Pogoste pasti",
    "ps": [
     "**Ne bojte se preslikav ena proti več**: isti poenostavljeni znak v besedah za \"čisto\", \"suho\" in \"deblo\" se preslikava v različne tradicionalne znake. Tabele to rešujejo glede na besedno zvezo, tako da ni vse sploščeno v en sam znak.",
     "**Pretvori se samo dialog**: časovni žigi, številke indeksov in vrstice sloga ASS ostanejo nespremenjeni, zato je rezultat pripravljen za uporabo.",
     "**Se ni nič spremenilo? Preverite, preden zaniha panika**: če vrstica s statistiko poročila poroča o 0 spremenjenih vrsticah, datoteka nima kitajskih znakov ali pa je bil format napačno zaznan – preverite, ali se »Zaznani format« ujema s tem, kar ste naložili."
    ]
   },
   {
    "h2": "Related :: Povezano",
    "ps": [
     "Celotna razlaga vseh devetih smeri – [[Kako pretvoriti poenostavljene in tradicionalne podnapise|/guides/hanconv.html]]; zakaj to ni le zamenjava znakov – [[Poenostavljena proti tradicionalni pisavi ni le zamenjava znakov|/guides/simplified-traditional-chinese.html]]; vračanje iz tradicionalne v poenostavljeno pisavo se prav tako nahaja v [[Pretvorba med poenostavljeno in tradicionalno pisavo|/hanconv.html]]."
    ]
   }
  ]
 },
 "srt-to-ass": {
  "seo": {
   "title": "Pretvornik SRT v ASS – Pretvorite podnapise v spletu – AI-SRTSub",
   "desc": "Pretvorite podnapise SRT v obliko ASS (Advanced SubStation Alpha) s platnom velikosti 1920×1080 in čistim privzetim slogom, pripravljenim za nalaganje v kateri koli predvajalnik. Deluje v vašem brskalniku.",
   "h1": "SRT to ASS :: SRT v ASS",
   "intro": "Pretvorite podnapise SRT v ASS: spustite datoteko, izberite ASS, prenesite. Platno velikosti 1920×1080 in čist privzeti slog se ustvarita namesto vas.",
   "ctaText": "Convert SRT → ASS :: Pretvori SRT → ASS"
  },
  "body": [
   {
    "h2": "When you need ASS :: Kdaj potrebujete ASS",
    "ps": [
     "ASS uporabite, ko naloženi podnapis potrebuje **boljše pozicioniranje in nadzor sloga**: vsebuje koncepte, ki jih SRT nima – velikost platna, sloge pisave, poravnavo. Predvajalniki mpv, PotPlayer, VLC in večina drugih ga podpirajo neposredno."
    ]
   },
   {
    "h2": "Kako je videti izhodna datoteka",
    "ps": [
     "Orodje znova zgradi standardno glavo: **platno velikosti 1920×1080**, pametno prelom vrstic (WrapStyle 0) in en sam privzeti slog – Arial 54, belo besedilo s črno obrobo, spodaj na sredini. Vsaka iztočnica uporablja ta slog."
    ],
    "img": {
     "file": "convert-opt-ass",
     "alt": "Spustni meni izhodnega formata z izbrano obliko ASS - Advanced SubStation",
     "cap": "Izberite ASS kot izhodno obliko in prenesite po pretvorbi"
    }
   },
   {
    "h2": "Ali se slogi ohranijo?",
    "ps": [
     "SRT sploh nima koncepta sloga. In če je vaš vir že v formatu ASS, pretvorba **ponovno zgradi privzeti slog in ne obdrži izvirnega** – za spreminjanje sloga ASS uporabite namenski urejevalnik podnapisov. Časovni razpored in besedilo v vsakem primeru ostaneta nespremenjena."
    ]
   }
  ]
 },
 "srt-to-excel": {
  "seo": {
   "title": "Pretvorite podnapise v Excel – Lektorirajte vrstico za vrstico – AI-SRTSub",
   "desc": "Izvozite podnapise SRT v Excel: ena vrstica na iztočnico v štirih stolpcih – indeks, začetek, konec in besedilo. Čas se ohrani kot besedilo, prelomi vrstic so nedotaknjeni, urejeno preglednico pa je mogoče pretvoriti nazaj v podnapise.",
   "h1": "Pretvorba podnapisov v Excel",
   "intro": "Lektoriranje stotin iztočnic v urejevalniku besedila je izjemno utrudljivo. V Excelu je vsaka iztočnica ena vrstica, zato postanejo dostopni filtriranje, komentiranje ter iskanje in zamenjava – popravki pa se lahko vrnejo v vašo datoteko SRT.",
   "ctaText": "Export to Excel :: Izvozi v Excel"
  },
  "body": [
   {
    "h2": "The need :: Potreba",
    "ps": [
     "Lektoriranje, množične spremembe besed ali delitev dela med več ljudi – vse to poteka veliko hitreje v preglednici kot v goli besedilni obliki. SRT je sam po sebi golo besedilo, vendar se njegova struktura iztočnic (indeks, časovni razpored, dialog) lepo preslika v štiri stolpce preglednice."
    ]
   },
   {
    "h2": "Where to do it :: Kje to storiti",
    "ps": [
     "Odprite [[Pretvorba med podnapisi in tabelami|/table.html]], preklopite na »v tabelo«, povlecite datoteko SRT in predogled se zapolni z eno vrstico na iztočnico v štirih stolpcih – indeks, začetek, konec, besedilo. Kliknite »Prenesi Excel (.xlsx)« in datoteka je vaša. Format VTT je podprt na enak način.",
     "Ko končate z urejanjem: preklopite način na »v podnapise«, vstavite preglednico nazaj in znova dobite SRT. Pravilo so trije stolpci za začetek, konec in besedilo (delujejo tudi angleški Start / End / Text), v poljubnem vrstnem redu."
    ],
    "img": {
     "file": "table-prev",
     "alt": "Predogled tabele: vsaka iztočnica SRT kot vrstica v štirih stolpcih z vrstico s statistiko",
     "cap": "SRT, razporejen v štiri stolpce, ki jih je mogoče na enak način pretvoriti nazaj"
    }
   },
   {
    "h2": "Common pitfalls :: Pogoste pasti",
    "ps": [
     "**Najprej odpravite pokvarjeno kodiranje**: ta stran bere samo UTF-8. Zaslon, poln vprašajev ali kvadratkov, pomeni, da je najprej potreben obisk orodja [[Popravilo popačenega besedila (mojibake)|/repair.html]].",
     "**CSV ali xlsx**: izberite .xlsx, ko gre datoteka v Excel, da se stolpec s časom ne bo ponovno formatiral; CSV je bolj prenosljiv, vendar ga Excel lahko prebere kot nekaj drugega – v tem primeru nastavite stolpec s časom na »Besedilo«.",
     "**ASS ne deluje**: ASS vsebuje direktive za slog, zato ga pred vnosom v tabelo pretvorite v SRT."
    ]
   },
   {
    "h2": "Related :: Povezano",
    "ps": [
     "Celoten dvosmerni vodnik – [[Kako pretvoriti podnapise v Excel / CSV|/guides/table.html]]; poznejše prevajanje – [[Prevajanje podnapisov|/translate.html]]; zadnji pregled pred oddajo – [[Nadzor kakovosti podnapisov|/qc.html]]"
    ]
   }
  ]
 },
 "srt-to-vtt": {
  "seo": {
   "title": "Pretvornik SRT v VTT – Pretvorite podnapise v spletu – AI-SRTSub",
   "desc": "Pretvorite podnapise SRT v VTT (WebVTT) za elemente sledi HTML5. Vejice v časovnih žigih samodejno postanejo pike. Deluje v vašem brskalniku, nič se ne naloži.",
   "h1": "SRT to VTT :: SRT v VTT",
   "intro": "Pretvorite podnapise SRT v VTT: spustite datoteko, izberite VTT, prenesite. Časovni žigi se prepišejo za spletni format, vse v vašem brskalniku.",
   "ctaText": "Convert SRT → VTT :: Pretvori SRT → VTT"
  },
  "body": [
   {
    "h2": "When you need VTT :: Kdaj potrebujete VTT",
    "ps": [
     "Spletni predvajalniki (element `<track>` v HTML5), nalaganje podnapisov na YouTube in večina predvajalnikov v brskalniku sprejemajo samo **VTT (WebVTT)** – ne pa SRT. Če imate na voljo samo SRT, bo ena pretvorba poskrbela, da bo delovalo."
    ]
   },
   {
    "h2": "Kako se obas formata razlikujeta",
    "ps": [
     "Vsebina je skoraj enaka; tri stvari so zapisane drugače: **glavna vrstica WEBVTT** (obvezna v VTT); **ločilo milisekund** v časovnih žigih – SRT uporablja vejico (00:00:01,000), medtem ko VTT uporablja piko (00:00:01.000); poleg tega VTT dovoljuje bloke NOTE in STYLE, ki jih SRT ne."
    ],
    "img": {
     "file": "convert-result",
     "alt": "Rezultat pretvorbe, ki prikazuje glavo WEBVTT in časovne žige s pikami",
     "cap": "Pretvorjeni VTT: prva vrstica WEBVTT, časovni žigi s pikami"
    }
   },
   {
    "h2": "How to convert :: Kako pretvoriti",
    "ps": [
     "Odprite [[pretvornik|/convert.html]], povlecite datoteko SRT, izberite **VTT - WebVTT** kot izhod, nato pretvorite in prenesite. Vrstni red iztočnic, časovne vrednosti in večvrstično besedilo ostanejo nespremenjeni – spremeni se samo skladnja. Greste v obratni smeri? Glejte [[VTT v SRT|/guides/vtt-to-srt.html]]."
    ]
   }
  ]
 },
 "subtitle-format-comparison": {
  "seo": {
   "title": "SRT proti VTT proti ASS proti SBV proti LRC – Katera oblika podnapisov – AI-SRTSub",
   "desc": "Primerjava zmožnosti petih pogostih formatov podnapisov: oblikovanje besedila, pozicioniranje, časovna natančnost, kam posamezen format spada in kako preklapljati med njimi.",
   "h1": "Izbira oblike podnapisov: SRT / VTT / ASS / SBV / LRC",
   "intro": "Isti podnapis, shranjen v petih formah, služi petim različnim mojstrom. Ta vodnik primerja, kaj vsak format zmore in kako prehajati med njimi.",
   "ctaText": "Odprite pretvornik podnapisov"
  },
  "body": [
   {
    "h2": "Izberite format v enem stavku",
    "ps": [
     "Nalaganje v predvajalnik, največja združljivost → **SRT**; spletni predvajalniki (sled HTML5) ali nalaganje na YouTube → **VTT**; pisave, barve, pozicioniranje, učinki → **ASS**; preneseno iz YouTuba → **SBV** (pretvorite v SRT za širšo podporo); besedila pesmi, petje vrstico za vrstico → **LRC**."
    ],
    "img": {
     "file": "convert-opt",
     "alt": "Spustni meni izhodnega formata: šest ciljnih formatov",
     "cap": "Šest ciljnih izvozov v pretvorniku pokriva vsak format v tem vodniku"
    }
   },
   {
    "h2": "Primerjava zmožnosti",
    "ps": [
     "**SRT**: golo besedilo + časovni razpored, brez slogov ali pozicioniranja, prvak v združljivosti. **VTT**: besedilo + časovni razpored, ki ga brskalniki izvorno podpirajo, lahko vsebuje pozicioniranje in osnovno oblikovanje, pika pred milisekundami. **ASS**: besedilo + časovni razpored + popolno oblikovanje (pisave, barve, obrobe, pozicioniranje, učinki), časovna natančnost na stotinke sekunde. **SBV**: minimalni format podnapisov za YouTube, začetek in konec v eni vrstici. **LRC**: format besedil pesmi, samo časi začetka, brez časov konca, brez oblikovanja."
    ]
   },
   {
    "h2": "Poti med formati",
    "ps": [
     "K katerega koli od teh lahko pretvorite v obe smeri v [[pretvorniku|/convert.html]]: branje podpira srt, vtt, ass (vključno s ssa), sbv, lrc, txt; izvoz podpira srt, vtt, ass, sbv, lrc, txt. Pogoste poti imajo vsaka svoj vodnik: [[Pretvorba SRT v VTT|/guides/srt-to-vtt.html]], [[Pretvorba VTT v SRT|/guides/vtt-to-srt.html]], [[Pretvorba SRT v ASS|/guides/srt-to-ass.html]], [[Pretvorba ASS v SRT|/guides/ass-to-srt.html]], [[Pretvorba SBV v SRT|/guides/sbv-to-srt.html]], [[Pretvorba LRC v SRT|/guides/lrc-to-srt.html]]."
    ]
   },
   {
    "h2": "Kaj pretvorbe izgubijo",
    "ps": [
     "Pretvorba v SRT vedno odstrani sloge in pozicioniranje (SRT jih ne more vsebovati). Pretvorba v ASS s tem orodjem **ponovno zgradi privzeti slog in ne ohrani izvirnega**. Za LRC v SRT je treba vnesti čase konca (vsaka vrstica traja do naslednje; zadnja dobi 3 sekund). Časovne vrednosti in besedilo ostanejo nespremenjeni v vsaki smeri."
    ]
   }
  ]
 },
 "subtitle-garbled-characters": {
  "seo": {
   "title": "Od kod izvira popačeno besedilo podnapisov (mojibake) – Prepoznajte ga, popravite ga – AI-SRTSub",
   "desc": "Mojibake pomeni napačno branje in ne poškodovane datoteke. Nadomestni znaki, zidovi naglašenih črk in nizi neznanih znakov kažejo na določen vzrok – naučite se, kateri so popravljivi in kateri nikoli več.",
   "h1": "Od kod izvira popačenje podnapisov (mojibake)",
   "intro": "Isti bajti, prebrani kot UTF-8 in kot GBK, se prikažejo kot dva popolnoma različna niza znakov. Videz smetenega besedila je neposreden dokaz, kateri korak je šel narobe.",
   "ctaText": "Odprite orodje za popravilo popačenega besedila (mojibake)"
  },
  "body": [
   {
    "h2": "Datoteka je v redu – le prebrana je bila napačno",
    "ps": [
     "Datoteka s podnapisi shranjuje bajte. Preoblikovanje bajtov v znake zahteva poznavanje kodiranja, v katerem so bili zapisani – če se pri tem zmotite, dobite popačeno besedilo. Iz datoteke ne manjka niti en bajt; preberite jo znova s pravilnim kodiranjem in znaki se vrnejo.",
     "To deli nalogo na dvoje: **ugotavljanje, s katerim kodiranjem se je začela**, in **shranjevanje v kodiranju, ki ga vaš predvajalnik lahko prepozna**. Prvo izhaja iz poskusnega dekodiranja in točkovanja, drugo pa iz shranjevanja kopije. Rešujejo različne težave."
    ]
   },
   {
    "h2": "Pet videzov, pet vzrokov",
    "ps": [
     "Popačeno besedilo (mojibake) ni naključno – njegov videz razkriva vzrok:"
    ],
    "img": {
     "file": "repair-diag",
     "alt": "Diagnostična kartica, ki navaja posamezne vrste sledi popačenega besedila",
     "cap": "Diagnostika razvršča popačeno besedilo glede na vzrok namesto zgolj pavšalnega združevanja"
    }
   },
   {
    "h2": "Zakaj nadomestnega znaka ni mogoče popraviti",
    "ps": [
     "Nadomestni znak je ločnica. Znak `�` pomeni, da so bili bajti zavrženi že **v prejšnjem koraku** (običajno v kakem programu, ki je prebral datoteko in jo ponovno shranil), pri čemer ni bilo zabeleženo, kaj je bilo izpuščeno. V tistem trenutku ni več mogoče sklepati nazaj – tega nihče ne more popraviti.",
     "Zato stran za popravilo obravnava dva primera različno. Če naložite datoteko in so izvirni bajti nedotaknjeni, lahko orodje preizkusi vsako kodiranje; če prilepljeno besedilo že vsebuje nadomestni znak, to jasno pove: »ni mogoče popraviti, prosimo, naložite izvirno datoteko«.",
     "Obstaja tudi obraten primer: vsebina se bere popolnoma čitljivo, vendar vaš predvajalnik še vedno prikazuje smeti. Ni krivda datoteke – **predvajalnik je izbral napačno kodiranje**. Urejanje besedila ne bo pomagalo; shranite kopijo kot UTF-8 z BOM ali GBK in jo predajte predvajalniku."
    ],
    "img": {
     "file": "repair-up",
     "alt": "Območje nalaganja: povleci-in-spusti ter prilepi kot dve vstopni točki",
     "cap": "Naložite datoteko, če je le mogoče – ohranjeni bajti pomenijo, da je nekaj mogoče popraviti"
    }
   },
   {
    "h2": "Kaj primerja med popravljanjem",
    "ps": [
     "Orodje preizkusi vsako verjetno kodiranje, nato oceni vsak rezultat: koliko ga sestavljajo pogosti znaki, ali obstajajo nizi naglasov, nizi simbolov in ali so območja CJK zidovi neznanih znakov. Rezultat z najvišjo oceno se uvrsti na vrh seznama.",
     "**Če nobena ocena ni očitno boljša, se ne priporoča ničesar** – bolje je povedati »to se bere v redu takšno, kot je«, namesto da bi vam ponudili nekaj, kar le megleno spominja na jezik. Besedilo, ki je bilo dvakrat popačeno (napačno shranjeno enkrat in nato napačno popravljeno enkrat), dobi še en dodatni krog povratnega reševanja na najboljših kandidatih."
    ],
    "img": {
     "file": "repair-fix",
     "alt": "Seznam kandidatov, razvrščen po oceni, vsakoznačen s svojim parom kodiranja",
     "cap": "Kandidati, razvrščeni po oceni – ni jasnega zmagovalca, ni priporočila"
    }
   },
   {
    "h2": "Shranjevanje pravega kodiranja zaključi delo",
    "ps": [
     "Popravljeno besedilo je treba vseeno shraniti v kodiranju, ki ga vaš predvajalnik prepozna. Predvajalniki v sistemu Windows se običajno zanašajo na BOM za zaznavanje kodiranja, zato je **UTF-8 z BOM** najmanj težaven; starejša strojna oprema in nekateri regionalni predvajalniki zahtevajo GBK. Izberete lahko UTF-8, UTF-8 (z BOM), GBK, Big5, Shift_JIS ali EUC-KR, pri čemer boste opozorjeni, da izberete drugo, če se kaj ne ujema (GBK ne more vsebovati korejščine)."
    ],
    "img": {
     "file": "repair-out",
     "alt": "Območje rezultata: spustni meni za shranjevanje kot kodiranje in gumb za prenos",
     "cap": "Shranite v obliki, ki jo predvajalnik prepozna, in popačeno besedilo (mojibake) je resnično rešeno"
    }
   },
   {
    "h2": "Povezana orodja in vodniki",
    "ps": [
     "Celoten vodnik – [[Kako popraviti popačene podnapise (mojibake)|/guides/repair.html]]; kaj datoteka SRT dejansko shranjuje – [[Kaj se skriva v datoteki SRT|/guides/srt-file-format.html]]; kodiranje je v redu, vendar je vsebina nečista (vodni žigi, oglasne oznake, oznake za gluhe in naglušne) – [[Čiščenje podnapisov|/clean.html]]."
    ]
   }
  ]
 },
 "subtitle-glossary": {
  "seo": {
   "title": "Tabele izrazov: ena sezona, en besednjak – Kdaj zgraditi tabelo – AI-SRTSub",
   "desc": "Tabela izrazov odpravlja nedosledno prevajanje iste besede: kdaj jo zgraditi, kako jo ponovno uporabiti v celotni sezoni, zakaj ujemanje celih besed v kitajščini nima učinka in česa ji ne gre zaupati.",
   "h1": "Tabele izrazov: ohranjanje doslednosti v sezoni",
   "intro": "Ko je neko ime v prvi epizodi A, v sedmi pa B, gledalci menijo, da gre za dva različna lika. Tabela izrazov preprečuje natanko to – ureja poimenovanje stvari.",
   "ctaText": "Odprite paketno zamenjavo izrazov"
  },
  "body": [
   {
    "h2": "Tabela izrazov odpravlja nedoslednost",
    "ps": [
     "Težave z besedno izbiro v podnapisih so dveh vrst: »ta beseda je prevedena napačno« in »ista beseda je prevedena različno na različnih mestih«. Prvo je slovarska težava; drugo je namen tabele izrazov.",
     "Druga težava je tako pogostejša kot težje opazna: `Thor` postane v prvi epizodi »Thor«, v sedmi pa »Donar«, pri čemer je vsaka epizoda videti v redu sama po sebi, medtem ko serija kot celota gledalcem povzroča vtis, da se je pojavil nov lik. Tabela izrazov pretvori izjavo »ta produkcija ga kliče Thor« v izvedljivo pravilo, ki se hkrati uporabi za celotno datoteko s podnapisi."
    ]
   },
   {
    "h2": "Kdaj se splača zgraditi tabelo",
    "ps": [
     "Vsaka datoteka s podnapisi ne potrebuje tabele izrazov. Primeri, ki jo upravičujejo, so običajno naslednji:"
    ],
    "img": {
     "file": "glossary-rules",
     "alt": "Pravila zamenjave, združena po kategorijah v tabeli izrazov",
     "cap": "Uporabite komentarje # za združevanje pravil in začasni izklop posameznega pravila med urejanjem"
    }
   },
   {
    "h2": "Vzdrževanje ene tabele skozi vso sezono",
    "ps": [
     "Tabela izrazov se vzdržuje **inkrementalno**: določite imena v prvi epizodi, nato dodajte pravilo, vsakič ko se pojavi nov izraz, in do konca sezone je tabela popolna. Za naslednjo sezono iste serije začnite z njo.",
     "Pravila napišite malce širše, kot je nujno potrebno – ko se odločite za »Thor«, dodajte tudi »Donar -> Thor«, tako da lahko v istem prehodu uskladite tudi podnapise nekoga drugega.",
     "Pozneje vedno preberite **seznam sprememb**: navaja vsako iztočnico, vsako vrstico in to, v kaj se je spremenila. To je edino mesto, kjer lahko potrdite, da je bila sprememba pravilna in nepretirana, vsak vnos, ki vam ni všeč, pa lahko z enim klikom povrnete."
    ],
    "img": {
     "file": "glossary-diff",
     "alt": "Seznam posameznih sprememb v območju rezultata",
     "cap": "Vsaka sprememba je navedena; kliknite tisto, ki je ne želite, da jo povrnete"
    }
   },
   {
    "h2": "Česa ne gre zaupati tabeli izrazov",
    "ps": [
     "Tabela izrazov spreminja **besede**. Te tri stvari so zunaj njenega področja dela in to tudi morajo biti:",
     "**Slovnica in stavčna struktura** – besede ne morete spremeniti v stavek; dela na ravni stavkov se vračajo k [[Prevajanje podnapisov|/translate.html]] ali človeškemu prevajalcu.",
     "**Čiščenje vsebine** – brisanje celih vrstic, kot so vodni žigi, oglasna sporočila in iztočnice SDH, spada pod [[Čiščenje podnapisov|/clean.html]]; pravila tabele izrazov nadomeščajo, ne pa brišejo vrstic.",
     "**Časovne osi** – tabela izrazov se nikoli ne dotika časa. Za globalni zamik ali težavo s hitrostjo pojdite na [[Prilagoditev časovnice|/shift.html]]."
    ]
   },
   {
    "h2": "Nekatere stvari, pri katerih se zlahka zatakne",
    "ps": [
     "**Kitajščina še vedno zamenjuje podnizi tudi pri vklopljenem ujemajnju celih besed – to je normalno.** Kitajščina in japonščina ne ločujeta besed s presledki, zato orodje ne more določiti meja besed in ujemanje celih besed tam nima učinka; zaščita `start` ne bo vplivala na `art` in deluje samo za angleščino.",
     "**Vrstni red spremeni rezultat.** Pravila se izvajajo od vrha navzdol, besedilo, ki ga proizvede posamezno pravilo, pa spodnja pravila ponovno preverijo. Zamenjajte A z B in nato B s C ter končate s C.",
     "**Če želite spremeniti samo prevod, nastavite obseg.** V dvojezični datoteki izberite »samo druga vrstica«; vnosi s samo eno vrstico ostanejo nespremenjeni pri kateri koli nastavitvi enojne vrstice – orodje ne ugiba, katera stran je izvirnik.",
     "**Tabela izrazov ni shranjena.** Ob vsakem odprtju strani je prazna, zato imejte lastno besedilno datoteko, ki jo posredujete naprej."
    ]
   },
   {
    "h2": "Povezana orodja in vodniki",
    "ps": [
     "Za celoten vodnik si oglejte [[Kako paketno zamenjati izraze v podnapisih|/guides/glossary.html]]; če je vsebina nečista, najprej zaženite [[Čiščenje podnapisov|/clean.html]]; ko so imena urejena in potrebujete druge jezike, pojdite na [[Prevajanje podnapisov|/translate.html]]; na koncu pa rezultat preverite z [[Nadzor kakovosti podnapisov|/qc.html]]."
    ]
   }
  ]
 },
 "subtitle-quality-check": {
  "seo": {
   "title": "Kontrolni seznam za nadzor kakovosti podnapisov pred oddajo – AI-SRTSub",
   "desc": "Kontrolni seznam za oddajo podnapisov: prekrivanja, hitrost branja, širina vrstice in ločila so tisti elementi, ki najpogosteje odpovedo. Zaženite pravila nadzora kakovosti 17 – polovico težav je mogoče odpraviti z enim klikom.",
   "h1": "Kaj je treba preveriti pred oddajo",
   "intro": "Dokončani podnapisni niso pripravljeni za oddajo: težave, ki jih gledalci opazijo na prvi pogled, so ravno tiste, ki jih vi po stotih ogledih več ne vidite. Ta kontrolni seznam pokriva prav ta zadnji pregled.",
   "ctaText": "Zaženite preverjanje kakovosti podnapisov"
  },
  "body": [
   {
    "h2": "Zakaj težav ne morete videti sami",
    "ps": [
     "Vsak, ki ustvarja podnapise, vsebino preveč dobro pozna – vnaprej veste, kaj pravi vsaka naslednja vrstica, zato se vam nič ne zdi prehitro; postavitev ste videli stokrat in vaše oči same preskočijo napake. Zato se preverjanje pred oddajo ne more zanašati na »ponovni ogled od začetka« – temveč mora biti **izmerjeno glede na številke**: hitrost branja, širina vrstice, trajanje, prekrivanja. Naj odločajo številke."
    ]
   },
   {
    "h2": "Šest najpogostejših napak",
    "ps": [
     "Razvrščeno glede na pogostost, s katero spodkopavajo oddajo:"
    ]
   },
   {
    "h2": "How to Check :: Kako preveriti",
    "ps": [
     "Odprite [[Nadzor kakovosti podnapisov|/qc.html]] in vanj spustite svoje podnapise; nastavite samodejno zaznavanje jezika (27 jezikov, vsak s svojimi ravnmi pravil). Poročilo navaja ugotovitve na treh ravneh – **napake / opozorila / namigi** – vsaka z ustrezno številko vnosa in izmerjeno vrednostjo. Z napakami se je treba spopasti (popačeno besedilo, oblika časovnega žiga, konec pred začetkom, prekinjeno oštevilčenje); opozorila so odvisna od primera (prekrivanja, hitrost branja, širina vrstice, trajanje); namigi pa so poliranje (položaj preloma vrstice, presledki, ločila)."
    ],
    "img": {
     "file": "qc-report",
     "alt": "Poročilo nadzora kakovosti: tristopenjski seznam težav, kjer vsaka ugotovitev vključuje številko vnosa in primerjavo med izmerjeno vrednostjo in pragom",
     "cap": "Tristopenjsko poročilo, ki za vsako ugotovitev podaja številko vnosa in izmerjeno vrednost"
    }
   },
   {
    "h2": "Kaj je mogoče popraviti z enim klikom",
    "ps": [
     "Oštevilčenje, prazni vnosi, ponovno ovijanje besedila, presledki in ločila – karkoli, kar **pusti časovni razpored nedotaknjen** – je mogoče popraviti samodejno; popravki, ki **spreminjajo časovni razpored** (zamenjava začetka in konca, prestavljanje prekrivanj, krajšanje ali raztezanje trajanj), so privzeto neoznačeni in jih je treba označiti šele, ko potrdite njihov vpliv. **Previsoka hitrost branja nima samodejnega popravka** – računalnik ne more vedeti, katero besedo je treba izrezati, zato prevod skrajšajte sami ali nekoliko razrahljajte časovni razpored; glejte [[Podnapisi so prehitri za branje|/guides/subtitle-too-fast.html]]. Po popravilu se samodejno zažene novo preverjanje, poročilo pa šteje le tisto, kar je bilo dejansko popravljeno."
    ]
   },
   {
    "h2": "While You’re At It :: Medtem ko ste pri tem",
    "ps": [
     "Stran s poročilom lahko neposredno prenese poročilo v obliki gola besedila `.qc.txt` – priložite ga k oddaji, da bo druga stran na prvi pogled videla, kaj ste preverili. Za sveže prevedene podnapise zaženite nadzor kakovosti pred oddajo; splošni zamik časovnice je drugačna vrsta težave – če hitrost branja po preverjanju še vedno ni ustrezna, glejte [[Podnapisi postajajo nesinhroni|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "subtitle-speed-converter": {
  "seo": {
   "title": "Sinhronizirajte podnapise po spremembi hitrosti videoposnetka – AI-SRTSub",
   "desc": "Videoposnetek je bil pospešen ali upočasnjen, podnapisi pa se ne ujemajo več: v koraku spreminjanja merila glede na hitrost vnesite faktor hitrosti in celotna časovnica se raztegne skupaj z videoposnetkom.",
   "h1": "Prilagodite podnapise po spremembi hitrosti videoposnetka",
   "intro": "Videoposnetek je postal hitrejši ali počasnejši kot celota, podnapisi pa so ostali pri prvotnem tempu – vse po določeni točki je zamaknjeno. Vnesite faktor in celotna časovnica se prilagodi hitrosti videoposnetka.",
   "ctaText": "Odprite urejevalnik časovnega razporeda"
  },
  "body": [
   {
    "h2": "Kdaj uporabiti faktor hitrosti namesto zamika",
    "ps": [
     "Videoposnetek je bil pospešen ali upočasnjen **kot celota** (recimo 0.9x ali 1.25x v programu za urejanje), medtem ko je vsaka iztočnica ohranila svoj izvirni ritem: začetek se ujema, dlje ko greste, slabše postaja – ob stalnem razmerju. To je težava s hitrostjo. Če je celotna datotetka preprosto zamaknjena za fiksni znesek, ne da bi se širila, zadostuje zamik – glejte [[prestavljanje celotne datoteke s podnapisi bolj zgodaj ali pozneje|/guides/shift-subtitle-timing.html]]."
    ]
   },
   {
    "h2": "Katero številko je treba vnesti",
    "ps": [
     "Podnapisi morajo slediti videoposnetku, zato vnesite **faktor, za katerega se je videoposnetek dejansko spremenil**: pospešitev za 1.25x pomeni, da se časi iztočnic pomnožijo z 1.25, da bi dohitevali; upočasnitev za 0.9x se pomnoži s 0.9. V urejevalniku časovnega razporeda dodajte korak **Spremeni merilo glede na hitrost** in v polje za vrednost vnesite faktor."
    ],
    "img": {
     "file": "shift-step-rate",
     "alt": "Korak spreminjanja merila glede na hitrost z vnesenim faktorjem v polju za vrednost",
     "cap": "Faktor nad 1 razteguje časovnico (za pospešen videoposnetek), pod 1 pa jo stiska (za upočasnjen videoposnetek)."
    }
   },
   {
    "h2": "Kako se to razlikuje od zamika",
    "ps": [
     "Zamik **premakne** čase vsake iztočnice za enako fiksno vrednost in ohrani trajanje iztočnic; stopnja (faktor) pa **pomnoži** tako začetek kot konec, zato se trajanja prav tako ustrezno spremenijo. Po spremembi hitrosti so se sama trajanja spremenila – natanko zato je potreben faktor hitrosti."
    ]
   },
   {
    "h2": "Če niste prepričani o faktorju",
    "ps": [
     "Če je faktor izgubljen, se zanesite na **dve sidriščni točki**: vnesite dejanske čase videoposnetka za prvo in zadnjo iztočnico, vse vmes pa se bo sorazmerno razporedilo – kar je enakovredno iskanju pravega faktorja. Glejte [[podnapisi postajajo vse bolj nesinhroni|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "subtitle-too-fast": {
  "seo": {
   "title": "Podnapisi so prehitri za branje – Odpravite prehitro hitrost branja – AI-SRTSub",
   "desc": "Podnapisi so prehitri za branje – prekratko trajanje ali predolgo besedilo? Nadzor kakovosti opozarja na vnose nad 20 znakov/sekundo (9 znakov hanzi za CJK); trajanja se popravijo samodejno, besedilo pa zahteva urejanje.",
   "h1": "Podnapisi so prehitri za branje",
   "intro": "Gledalci nenehno pritiskajo na premor? Kriva je hitrost branja. Kako jo izmeriti, kako jo popraviti in kdaj urejati besedilo namesto časovnega razporeda – vse v enem vodniku.",
   "ctaText": "Check Reading Speed :: Preverite hitrost branja"
  },
  "body": [
   {
    "h2": "Kaj je hitrost branja?",
    "ps": [
     "Hitrost branja preprosto pomeni, **ali lahko gledalci končajo branje podnapisa v času, ko je ta prikazan na zaslonu**. Matematika je preprosta: širina besedila, deljena s sekundami na zaslonu. Pogoste panožne omejitve: 9 znakov polne širine na sekundo za kitajščino, japonščino in korejščino (18 enot polovične širine), 20 enoti polovične širine na sekundo za druge jezike. Vrstica s 20 znaki hanzi, ki traja 1 sekundo, znese 40 enot širine na sekundo – več kot dvakratno zgornjo mejo, zato jo gledalci nikoli ne bodo mogli prebrati do konca."
    ]
   },
   {
    "h2": "Najprej ločite, za katero vrsto hitrosti gre",
    "ps": [
     "»Prehitro za branje« sta pravzaprav dve različni težavi: **prekratko trajanje** – iztočnica izgine po stotih ali dveh sto milisekundah, kar je običajno napaka v časovnem razporedu ali ostanek urejanja; **predolgo besedilo** – trajanje je v redu, vendar je v vrstico stisnjenih preveč znakov hanzi (30), in nobena omejitev hitrosti tega ne reši. Popravki so nasprotujoči si, zato najprej ugotovite, s katero težavo se soočate."
    ],
    "img": {
     "file": "qc-rules",
     "alt": "Nastavitev omejitve hitrosti branja na strani nadzora kakovosti, s privzeto vrednostjo 18 za CJK in 20 za druge jezike",
     "cap": "Pragi hitrosti branja nadzora kakovosti: 18 enot širine na sekundo za CJK, 20 za druge jezike"
    }
   },
   {
    "h2": "How to Check :: Kako preveriti",
    "ps": [
     "Odprite [[Nadzor kakovosti podnapisov|/qc.html]] in vanj spustite svoje podnapise. V poročilu je »prekratko trajanje« opozorilo, ki prikazuje izmerjene milisekunde (prag: 833 milisekund); »neberljiva hitrost« pa je samostojna ugotovitev, ki prikazuje izmerjene enote širine na sekundo. Pri dvojezičnih podnapisih se šteje samo vrstica, napisana v ciljnem jeziku – jezika se ne seštevata."
    ]
   },
   {
    "h2": "How to Fix It :: Kako to popraviti",
    "ps": [
     "**Prekratko trajanje**: popravljivo z enim klikom – iztočnica se samodejno podaljša na 833 milisekund, ne da bi prešla začetek naslednje iztočnice (popravek ne sme ustvariti novih prekrivanj). **Predolgo besedilo**: ni samodejnega popravka – računalnik ne more vedeti, katero besedo je treba odstraniti. Dve poti, vaša izbira: skrajšajte prevod (kliknite celico v prevajalnem orodju, da jo uredite) ali raztegnite trajanje te iztočnice (samo če je pred naslednjo iztočnico vrzel; za splošne težave s časovnico glejte [[Zamik časovnice|/shift.html]]). Nato znova zaženite nadzor kakovosti, da potrdite, da je hitrost branja spet znotraj praga."
    ]
   },
   {
    "h2": "Don’t Overcorrect :: Ne pretiravajte s popravki",
    "ps": [
     "Doseganje omejitve hitrosti še ne pomeni udobnega ogleda: stiskanje vsake iztočnice čisto do meja 9 znakov na sekundo naredi celoten film utrujajoč. Kot zlato pravilo: večino časa ostanite pri približno 70% praga, v pogovorno gostih prizorih pa se občasno lahko nekoliko dvignete čez to mejo. Bloki podnapisov, ki prepogosto utripajo, so težava sami po sebi – pred oddajo zaženite celoten nabor meritev, glejte [[Kaj je treba preveriti pred oddajo|/guides/subtitle-quality-check.html]]."
    ]
   }
  ]
 },
 "subtitles-out-of-sync": {
  "seo": {
   "title": "Podnapisi postajajo vse bolj nesinhroni? Popravite jih – AI-SRTSub",
   "desc": "Začne se v redu, sredi filma zaostaja za nekaj sekund, na koncu pa je neuporaben: to je postopno zamikanje, običajno zaradi neskladja hitrosti sličic ali spremembe hitrosti videoposnetka. Zadeva se odpravi z dvema sidriščnima točkama.",
   "h1": "Podnapisi postajajo vedno bolj nesinhroni: Vzroki in rešitve",
   "intro": "Na začetku je vse v redu, po pol ure zamuja nekaj sekund, na koncu pa je brezupno. Tovrstna nesinhronost ima znane vzroke – in znano rešitev.",
   "ctaText": "Fix this file :: Popravite to datoteko"
  },
  "body": [
   {
    "h2": "Najprej ločite med obema vrstama napačne poravnave",
    "ps": [
     "Napačna poravnava je dveh vrst: **enotni zamik** pomeni, da vsaka iztočnica zamuja (ali prehiteva) za enako količino, ki je približno enaka od začetka do konca; **postopno zamikanje** pomeni, da je začetek pravilen, napaka pa raste proti koncu in lahko doseže celo minute. Ta članek govori o drugi vrsti – za prvo glejte [[prestavljanje celotne datoteke s podnapisi bolj zgodaj ali pozneje|/guides/shift-subtitle-timing.html]]."
    ]
   },
   {
    "h2": "Zakaj vedno bolj zamikajo",
    "ps": [
     "Zamikanje izhaja iz **dveh različnih ur**: trije najpogostejši vzroki so (1) neskladje hitrosti sličic – podnapisi filma s 24 fps na viru s 25 fps izgubijo več kot sekundo na minuto; (2) videoposnetek je bil pospešen ali upočasnjen, medtem ko so podnapisi ohranili svoj prvotni tempo; (3) snemanje s spremenljivo hitrostjo sličic (VFR), katerega časovnica je že v izhodišču neenakomerna. Skupno jim je to, da napaka narašča približno linearno s časom predvajanja."
    ]
   },
   {
    "h2": "Popravite z dvema sidriščnima točkama",
    "ps": [
     "Ker napaka narašča linearno, namestitev pravilnega časa na vsakem koncu in sorazmerna prerazporeditev sredine vse postavi na svoje mesto. V urejevalniku časovnega razporeda dodajte **popravek z dvema sidriščnima točkama**: polji »trenutno« se samodejno izpolnita z izvirnimi časi te datoteke; pogledate videoposnetek in v polji »cilj« vnesete, **kdaj se prva in zadnja iztočnica dejansko pojavita**."
    ],
    "img": {
     "file": "shift-step-two",
     "alt": "Popravek z dvema sidriščnima točkama: trenutni časi so samodejno izpolnjeni, ciljne čase je treba vnesti",
     "cap": "Vzemite sidrišči na obeh ekstremih – najmanjša in največja izvirna napaka – in vse vmes se sorazmerno prerazporedi."
    }
   },
   {
    "h2": "Kako preveriti rezultat",
    "ps": [
     "Po izvedbi plošča z rezultati prikazuje izvirne in nove čase vsake iztočnice drug ob drugem«/b«. Na hitro preverite tri mesta: prvo iztočnico, eno na sredini in zadnjo – tri položaje z najmanjšo, srednjo in največjo izvirno napako. Če vse tri ustrezajo, se ujema celotna datoteka."
    ],
    "img": {
     "file": "shift-result",
     "alt": "Plošča z rezultati: časi pred in po drug ob drugem, z gumbom za prenos",
     "cap": "Novi časi srednjih iztočnic morajo pasti med oba konca – kar je znak, da je sorazmernost pravilna."
    }
   },
   {
    "h2": "Ko dve sidriščni točki nista dovolj",
    "ps": [
     "Popravek z dvema sidriščnima točkama predpostavlja, da je napaka **linearna**. Če je vir posnetek zaslona VFR s skokom hitrosti sličic sredi datoteke, linearna poteg ne more popraviti sredine – vzemite očitno napačno sredinsko iztočnico kot tretjo točko, tam razdelite datoteko in na vsaki polovici zaženite popravek z dvema sidriščnima točkama. Poleg tega po popravku ponovno si oglejte srednji del pri normalni hitrosti, da potrdite, da ni ostala nobena lokalna napačna poravnava."
    ]
   }
  ]
 },
 "table": {
  "seo": {
   "title": "Pretvorba podnapisov v Excel / CSV – V obe smeri – AI-SRTSub",
   "desc": "Dvosmerni vodnik: izvozite SRT/VTT v Excel ali CSV za lekturo vrstico za vrstico, nato pa urejeno preglednico uvozite nazaj kot podnapise. Potrebni sta tri stolpci, v poljubnem vrstnem redu; čas se ohrani kot besedilo.",
   "h1": "Kako pretvoriti podnapise v Excel / CSV",
   "intro": "Lektura in prevajanje sta lažja v preglednici. Izvozite podnapise v Excel ali CSV, uredite vrstico za vrstico ter jih nato pretvorite nazaj – časovni stolpci ostanejo besedilo, prelomi vrstic znotraj dialoga pa so ohranjeni.",
   "ctaText": "Odprite pretvornik preglednic"
  },
  "body": [
   {
    "h2": "What this tool does :: Kaj to orodje počé",
    "ps": [
     "Podnapisi so vrstice iztočnic, preglednice pa so vrstice zapisov – ko so v preglednici, lahko lekturo, komentiranje in množično prevajanje opravite z orodji, ki jih že poznate. Podprti sta obe smeri:"
    ]
   },
   {
    "h2": "Naložite in izberite smer",
    "ps": [
     "Povlecite datoteko vanj ali jo poiščite. Vsaka smer potrebuje drugo vrsto datoteke: **v preglednico** sprejme datoteke podnapisov (SRT / VTT), **v podnapise** pa datoteke preglednic (CSV / Excel, tako .xlsx kot .xls). Če izberete napačen način, vas stran obvesti, katero vrsto datoteke ta način zahteva.",
     "⚠️ Ta stran bere samo UTF-8. Če se vaši podnapisi odprejo kot zaslon, poln vprašajev ali kvadratkov, jih najprej poženite skozi [[Popravilo zamešanega besedila|/repair.html]] – poškodovano kodiranje se tu bere le kot nadomestni znaki."
    ],
    "img": {
     "file": "table-up",
     "alt": "Področje za nalaganje pretvornika preglednic: območje za spuščanje in stikali za način",
     "cap": "Vsak način želi drugo datoteko: podnapisi noter, preglednica ven – in nazaj"
    }
   },
   {
    "h2": "Izvoz podnapisov v preglednico",
    "ps": [
     "Izberite »v preglednico«, spustite podnapis in predogled navede vsako iztočnico: indeks, začetek, konec, besedilo. Vrstica s statistiko prikazuje število iztočnic in skupno trajanje. Nato kliknite »Prenesi Excel (.xlsx)« ali »Prenesi CSV«.",
     "Razlika med obema: .xlsx je prava datoteka preglednice, kjer Excel ne more preoblikovati vašega časovnega stolpca za vašim hrbtom; CSV je bolj prenosljiv, vendar lahko Excel ob odpiranju časovni stolpec razlaga drugače. Če se to zgodi, izberite časovni stolpec in nastavite njegovo obliko na »Besedilo« – ali pa preprosto uporabite .xlsx."
    ],
    "img": {
     "file": "table-prev",
     "alt": "Predogled preglednice: stolpci indeks, začetek, konec in besedilo s statistično vrstico",
     "cap": "Predogled vsake iztočnice; statistična vrstica prikazuje število iztočnic in skupno trajanje"
    }
   },
   {
    "h2": "Uvoz preglednice nazaj v podnapise",
    "ps": [
     "Izberite »v podnapise«, spustite preglednico in tu je pravilo glede stolpcev: potrebuje tri stolpce za **začetek, konec in besedilo** (delujejo tudi angleške glave Start / End / Text), v **poljubnem vrstnem redu**. Sprejeta sta `00:00:01,500` in `00:00:01.500`; vrstice, ki jih ni mogoče razčleniti, se preskočijo, namesto da bi to osodilo celotno datoteko.",
     "Rezultat je v predogledu naveden iztočnica za iztočnico; potrdite in prenesite SRT ali VTT. Če ti trije stolpci manjkajo, boste prejeli sporočilo, ki vas poziva, da preverite glave – običajno zato, ker je bilo pri izvozu uporabljeno drugo poimenovanje ali pa vrstica z glavami ni prva vrstica."
    ],
    "img": {
     "file": "table-back",
     "alt": "Območje rezultatov podnapisov: uvoženi podnapisi, navedeni iztočnica za iztočnico",
     "cap": "Nepoznani stolpci so sporočeni, nikoli tiho prezrti"
    }
   },
   {
    "h2": "FAQ :: Pogosta vprašanja",
    "ps": [
     "**Ali Excel napačno prikazuje časovni stolpec?** Uporabite .xlsx in to se ne bo nikoli zgodilo. Če morate uporabiti CSV: pred odpiranjem izberite časovni stolpec in nastavite obliko celice na »Besedilo«.",
     "**Morajo biti glave stolpcev angleške?** Ne. Start / End / Text so prepoznani v katerem koli jeziku, ki ga ta stran podpira, velikost črk pa ni pomembna.",
     "**Ali so moji prelomi vrstic po uvozu še vedno tu?** Da. Prelomi vrstic znotraj dialoga se ohranijo vse do izvirnega preloma.",
     "**Ali je podprt ASS?** Ta stran obravnava samo SRT in VTT. ASS vsebuje direktive sloga – najprej ga pretvorite v SRT s [[Pretvornikom formatov|/convert.html]].",
     "**Koliko datotek hkrati?** Ena. Za obdelavo več deset ali stotih uporabite [[Paketno pretvorbo|/batch.html]] (ki samo pretvarja formate in ne gre skozi preglednico)."
    ]
   },
   {
    "h2": "Privacy :: Zasebnost",
    "ps": [
     "Pretvorba poteka v celoti v vašem brskalniku. Nobena vsebina podnapisov ni nikoli poslana na strežnik."
    ]
   },
   {
    "h2": "Povezana orodja in vodniki",
    "ps": [
     "Če želite le korak iz podnapisov v Excel, glejte [[Pretvorba podnapisov v Excel|/guides/srt-to-excel.html]]; za naknadni prevod v drug jezik [[Prevod podnapisov|/translate.html]]; več deset datotek hkrati – [[Paketna pretvorba|/batch.html]]."
    ]
   }
  ]
 },
 "translate": {
  "seo": {
   "title": "Prevod podnapisov z umetno inteligenco – nalaganje v dvojezični izvoz – AI-SRTSub",
   "desc": "Prevedite podnapise z umetno inteligenco: naložite SRT/VTT/ASS, izberite med 100 jeziki, poenotite imena s slovarjem, izvozite dvojezične podnapise. Brezplačen začetek, podprt lastni ključ API.",
   "h1": "Kako uporabljati prevajanje podnapisov z umetno inteligenco",
   "intro": "Celoten potek dela za eno datoteko podnapisov, od nalaganja preko prevajanja do izvoza: kaj je na zaslonu, kaj klikniti in kaj dobite na vsakem koraku.",
   "ctaText": "Odprite orodje za prevajanje"
  },
  "body": [
   {
    "h2": "What this tool does :: Kaj to orodje počé",
    "ps": [
     "Prevede podnapise iz enega jezika v drugega in izvozi datoteko podnapisov, pripravljeno za uporabo. Tipične potrebe:"
    ]
   },
   {
    "h2": "Upload subtitles :: Naložite podnapise",
    "ps": [
     "Kliknite »Izberi datoteko podnapisov« ali prilepite besedilo podnapisov neposredno v levo vhodno polje. Podprtih je šest formatov: SRT, VTT, ASS, SSA, SBV in TXT. Nimate datoteke pri roki? Kliknite »Naloži vzorec«, da vidite delovanje v praksi. Ko je vsebina razčlenjena, srednji stolpec prikazuje tabelo podnapisov z indeksom, časovnico in izvornim besedilom za vsak vnos."
    ],
    "img": {
     "file": "translate-upload",
     "alt": "Območje uvoza orodja za prevajanje: izbira datoteke podnapisov, polje za lepljenje in gumb za nalaganje vzorca",
     "cap": "Levi stolpec »Uvozi podnapise«: izberite datoteko, prilepite besedilo ali naložite vzorec"
    }
   },
   {
    "h2": "Izberite jezik in slog",
    "ps": [
     "»Izvorni jezik« lahko ostane na samodejnem zaznavanju; »ciljni jezik« se izbere iz 100 jezikov. Na voljo je pet prevajalskih slogov: uravnoteženi (privzeto), pogovorni, formalni strokovni, slog sinhronizacije in po meri. »Slog sinhronizacije« ustreza filmskim in televizijskim dialogom; »formalni strokovni« pa dokumentarcem in tečajem."
    ],
    "img": {
     "file": "translate-lang",
     "alt": "Nastavitve jezika in sloga prevajanja: spustni meni za izvorni jezik, ciljni jezik in pet slogov",
     "cap": "»Jezik« in »slog prevajanja«: izvorni je lahko samodejno zaznan, 75 izbir ciljnega jezika"
    }
   },
   {
    "h2": "Slovar: ohranite doslednost imen",
    "ps": [
     "Umetna inteligenca prevaja v paketih, zato se isto ime v različnih paketih lahko pojavi na dva različna načina. V slovar napišite pravila »vir → mora biti prevedeno kot«; pred vsakim paketom orodje pregleda slovar in sledi vsakemu ujemajočemu pravilu. Ena pravilo na vrstico; puščice so lahko `->`, `=>`, `→` ali Tab; osamljen izvorni izraz pomeni, da ostane nepreveden; več zapisov si lahko deli en sam prenos prek `|`. Kliknite »✨ Izvleček z UI«, da umetna inteligenca najprej povleče lastna imena iz videa v tabelo, nato pa jih uredite in prevedite."
    ],
    "img": {
     "file": "translate-glossary",
     "alt": "Območje slovarja in lastnih imen: vhodno polje slovarja z gumboma za izvleček z umetno inteligenco in shranjevanje",
     "cap": "Slovar »poenotenih imen«: izvleček lastnih imen z umetno inteligenco, samodejno naložen za nove videoposnetke, ko je shranjen"
    }
   },
   {
    "h2": "Postopek prevajanja",
    "ps": [
     "V zgornji vrstici kliknite »▶ Začni prevajanje«. Srednji statistični pas v realnem času prikazuje vnose, prevedeno, očiščena polnila in skupine stavkov prek vnosov; vrstica napredka prikazuje preostali ocenjeni čas in porabljene žetone. Med prevajanjem kliknite katero koli prevajalsko celico v tabeli, da uredite besedilo – spremembe se shranijo v vaš računalnik in preživijo osvežitev. Če stran zaprete sredi delovanja, vam bo ponujeno nadaljevanje tam, kjer se je ustavilo. Ko en stavek obsega več vnosov, se skupina združi, prevede in ponovno napolni glede na trajanje."
    ],
    "img": {
     "file": "translate-workspace",
     "alt": "Delovni prostor za prevajanje: statistični pas, vrstica napredka in ureljiva tabela podnapisov",
     "cap": "Srednji delovni prostor: statistični pas + vrstica napredka + tabela podnapisov s klikom za urejanje"
    }
   },
   {
    "h2": "Export :: Izvoz",
    "ps": [
     "V desnem stolpcu najprej izberite obliko vsebine: samo prevod (enojezični), dvojezični z izvirnikom zgoraj ali dvojezični s prevodom zgoraj; nato obliko datoteke: SRT, WebVTT, SBV, ASS ali TXT. Izbira ASS doda dve postavitvi: razdeljena zaslona zgoraj/spodaj in naložene spodnje vrstice. Vsebina in format se prosto združujeta v 14 izvoznih slogov. Širina dvojezične vrstice se nastavi posebej. Kliknite »Prenesi podnapise«, da shranite datoteko, ali »Kopiraj v odložišče«, da jo takoj prilepite."
    ],
    "img": {
     "file": "translate-export",
     "alt": "Izvozna plošča: tri oblike vsebine, pet formatov datotek in nastavitve širine dvojezične vrstice",
     "cap": "Izvoz v desnem stolpcu: najprej izberite obliko vsebine, nato format datoteke"
    }
   },
   {
    "h2": "Cost and privacy :: Stroški in zasebnost",
    "ps": [
     "Privzeti model ne potrebuje prijave in ključa – deluje takoj po namestitvi s kvotami na zahtevo: dnevno omejitev na IP in dnevni znesek za celotno spletno mesto. Za velike pakete vnesite svoj ključ API pod »Prevajalni mehanizem«. Zasebnost, v skladu z obvestilom na strani: podnapisi za privzeti model se prenašajo prek strežnika tega spletnega mesta do ponudnika; s po meri prilagojenim API-jem upravlja neposredno ponudnik, ki ga vnesete, ključ pa ostane v vašem brskalniku. Razčlenjevanje, prelomi vrstic in dvojezična postavitev se izvajajo lokalno v brskalniku."
    ]
   },
   {
    "h2": "FAQ :: Pogosta vprašanja",
    "ps": [
     "**So se v prevod pomešali drugi jeziki?** Orodje zazna zamik jezika in samodejno ponovno prevede; če nekaj vnoso še vedno izgleda napačno, kliknite celico in jo popravite ročno.",
     "**Kaj pa vrstice z besedili pesmi?** »Filtriranje vsebine« ponuja tri možnosti za besedila pesmi: prevedite besedilo, obdržite izvirnik ali jih izbrišite.",
     "**Neskladni prevodi imen?** Dodajte neskladne zapise v slovar in ponovno prevedite; slovar ima prednost pred globalno nastavitvijo »obravnave lastnih imen«.",
     "**Želite angleščino zgoraj in kitajščino spodaj?** Pri izvozu izberite »Dvojezično · izvirnik zgoraj«; za kitajščino zgoraj in angleščino spodaj pa izberite »Dvojezično · prevod zgoraj«."
    ]
   },
   {
    "h2": "Povezana orodja in vodniki",
    "ps": [
     "Napačen format? Začnite s [[pretvorbo formatov|/convert.html]]; časovnica ni usklajena? Uporabite [[prilagoditev časovnice|/shift.html]]; preden jo oddate, jo poženite skozi [[preverjanje kakovosti podnapisov|/guides/subtitle-quality-check.html]]."
    ]
   }
  ]
 },
 "translate-english-to-chinese": {
  "seo": {
   "title": "Prevod angleških podnapisov v kitajščino – AI-SRTSub",
   "desc": "Prevedite angleške podnapise v kitajščino: naložite SRT/VTT/ASS, izberite poenostavljeno ali tradicionalno kitajščino ter izvozite zgolj kitajske ali dvojezične podnapise. – AI-SRTSub",
   "h1": "Prevod angleških podnapisov v kitajščino",
   "intro": "Angleški SRT noter, kitajski (ali angleško-kitajski dvojezični) podnapisi ven: naložite, izberite ciljni jezik, izvozite – vse na eni strani.",
   "ctaText": "Prevedite angleške podnapise"
  },
  "body": [
   {
    "h2": "When you need it :: Kdaj to potrebujete",
    "ps": [
     "Preneseni podnapisi so samo v angleščini in jim ne sledite; ali pa želite kitajske podnapise za družinske člane, ki ne berejo angleško. Kar potrebujete, je v one od treh oblik – **zgolj kitajski podnapisi** ali dvojezični podnapisi s **kitajščino zgoraj in angleščino spodaj** ali **angleščino zgoraj in kitajščino spodaj** – in to orodje izvozi vse tri."
    ]
   },
   {
    "h2": "How to do it :: Kako to storiti",
    "ps": [
     "Odprite [[Prevajalnik podnapisov z umetno inteligenco|/translate.html]] in spustite svojo angleško datoteko podnapisov (SRT, VTT, ASS, SSA, SBV in TXT so vsi prepoznani ali pa preprosto prilepite besedilo). Pustite »Izvorni jezik« na samodejnem zaznavanju, nastavite »Ciljni jezik« na poenostavljeno ali tradicionalno kitajščino in kliknite »▶ Začni prevajati«. Ko je končano, izberite obliko vsebine v izvozni plošči na desni: samo prevod (enojezični), dvojezični · izvirnik zgoraj (angleščina zgoraj, kitajščina spodaj) ali dvojezični · prevod zgoraj (kitajščina zgoraj, angleščina spodaj), nato izberite format datoteke in prenesite."
    ],
    "img": {
     "file": "translate-export",
     "alt": "Izvozna plošča: samo prevod, dvojezični z izvirnikom zgoraj in dvojezični s prevodom zgoraj",
     "cap": "Izberite obliko vsebine ob izvozu: samo kitajska ali dvojezična z angleščino zgoraj / kitajščino zgoraj"
    }
   },
   {
    "h2": "Two common problems :: Dve pogosti težavi",
    "ps": [
     "**So imena prevedena neskladno?** Umetna inteligenca prevaja v paketih, zato se isto ime lahko pojavi na dva načina. V slovar vstavite pare »vir → prevedeno ime« (npr. `Watson → Huasheng`), da bo po celotnem besedilu enotno.",
     "**Se podnapisi oddaljujejo od slike?** Najprej prevedite, nato popravite časovnost: orodna vrstica časovnice na vrhu delovnega prostora ima globalni nadzor zamika in merila – glejte [[Podnapisi se proti koncu razsinhronizirajo|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "videosub": {
  "seo": {
   "title": "Izvlečenje vdelanih videopodnapisov – sledi MKV / MP4 – AI-SRTSub",
   "desc": "Neposredno preberite sledi podnapisov znotraj datotek MKV, WebM, MP4 in MOV ter izvozite SRT / VTT / ASS / TXT. Brez nalaganja, brez transkodiranja, navedena je vsaka jezikovna sled, podnapisi v obliki slik so posebej označi.",
   "h1": "Kako izvleči podnapise, vdelane v video",
   "intro": "Preberite sled podnapisov, zaprto znotraj MKV / MP4, neposredno kot SRT – video ni nikoli naložen, vse se bere v brskalniku.",
   "ctaText": "Odprite izvlečenje videopodnapisov"
  },
  "body": [
   {
    "h2": "What this tool does :: Kaj to orodje počé",
    "ps": [
     "Podnapisi so lahko zaprti znotraj videodatoteke namesto samostojnih datotek. Če jih želite urediti, prevesti ali povezati, jih morate najprej izvleči – to je edina stvar, ki jo ta stran počne."
    ]
   },
   {
    "h2": "1 Add the video :: 1 Dodajte video",
    "ps": [
     "Povlecite videodatoteko v prvi stolpec ali kliknite za izbiro. Prepoznani sta samo datoteki **MKV / WebM** in **MP4 / MOV**; drugi vsebovalniki ne bodo vrnili nobene sledi.",
     "Datoteka nikoli ne zapusti vašega računalnika – ni koraka nalaganja. Orodje bere v majhnih kosih z zamikom, tako da večgigabajtni film ne zapolni pomnilnika, vendar mora prvo branje enkrat pregledati podatke o sledi."
    ],
    "img": {
     "file": "videosub-up",
     "alt": "Območje za dodajanje videa na strani za izvlečenje vdelanih podnapisov",
     "cap": "Podprta sta MKV / WebM in MP4 / MOV, datoteka pa nikoli ne zapusti vašega računalnika"
    }
   },
   {
    "h2": "2 Vdelane sledi podnapisov",
    "ps": [
     "Ko se branje zaključi, drugi stolpci prikazujejo podnapisne sledi v datoteki **ena sled na vrstico**, običajno z jezikom in imenom sledi (na primer \"kitajščina\", \"angleščina\", \"prisilno\"). Kliknite vrstico, da izvlečete to sled.",
     "Ko datoteka vsebuje samo eno sled podnapisov, se izvlečenje začne samodejno – klik ni potreben.",
     "**Slikovnih podnapisov ni mogoče izvleči**: Blu-ray PGS in DVD podnapisi so slike, zapečatene v tok brez besedila, ki bi ga bilo mogoče vzeti, in stran to jasno pove; ti potrebujejo optično prepoznavanje znakov (OCR)."
    ],
    "img": {
     "file": "videosub-track",
     "alt": "Seznam vdelanih sledi podnapisov, ena na vrstico",
     "cap": "Ena sled na vrstico; ko je na voljo samo ena, se izvlečenje začne samodejno"
    }
   },
   {
    "h2": "3 The result :: 3 Rezultat",
    "ps": [
     "»3 Rezultat« na desni prikazuje izvlečeno besedilo podnapisov z izvoznim formatom nad njim: **SRT / VTT / ASS / TXT**. Kliknite »Prenesi« ali »Kopiraj«.",
     "Ko je izvorna sled v formatu ASS, se njena lastna glava sloga in ločljivost vrneta nespremenjeni – izvoz kot ASS ju ohrani, medtem ko izvoz kot SRT prenaša samo besedilo."
    ],
    "img": {
     "file": "videosub-out",
     "alt": "Območje rezultatov z izbiro oblike SRT / VTT / ASS / TXT",
     "cap": "Štiri oblike izvoza; vir ASS ohrani glavo sloga in ločljivost"
    }
   },
   {
    "h2": "Kaj ostane nespremenjeno",
    "ps": [
     "Videodatoteka sama se sploh ne dotika – samo za branje, brez pisanja, brez transkodiranja, brez ponovnega multipleksiranja.",
     "Vsebina podnapisov prihaja ven takšna, kot je: brez ugibanja o kodiranju, brez popravljanja časovnice. Če so izvlečeni podnapisi popačeni, je to težava s kodiranjem v izvorni sledi – pojdite na [[Popravilo popačenega besedila|/repair.html]]."
    ]
   },
   {
    "h2": "Common questions :: Pogosta vprašanja",
    "ps": [
     "**Ali res ni načina za obravnavo slikovnih podnapisov (PGS / DVD)?** Na tej strani ne – to so slike brez plasti besedila. Najprej mora biti opravljen OCR, tega pa ta stran ne počne.",
     "**Izvlečeni podnapisi so napačno časovno nastavljeni – zakaj?** Ta stran ne popravlja časovnic; kar pride ven, je tisto, kar je bilo tam. Za globalni zamik ali težavo s hitrostjo uporabite [[Prilagoditev časovnice|/shift.html]].",
     "**Zakaj traja tako dolgo, preden se karkoli zgodi?** Veliko datoteko je treba kos za kosom pregledati glede podatkov o sledi, in večja kot je datoteka, dlje traja; to se zgodi lokalno in nima nikakršne zveze z vašo povezavo.",
     "**Ali lahko to stran uporabljam za zunanje datoteke podnapisov?** Ni vam treba – zunanja datoteka .srt / .ass gre naravnost v [[Pretvorbo formatov|/convert.html]] ali drugo orodje. Ta stran je namenjena podnapisom, ki so zapečateni znotraj videa."
    ]
   },
   {
    "h2": "Privacy :: Zasebnost",
    "ps": [
     "Video se bere v celoti v brskalniku: nič se ne naloži, nič se ne transkodira, nič ne gre skozi strežnik. Zaprite stran in prebrani podatki se sprostijo."
    ]
   },
   {
    "h2": "Povezana orodja in vodniki",
    "ps": [
     "Za prevajanje tega, kar izvlečete, pojdite na [[Prevod podnapisov|/translate.html]], za dvojezično različico glejte [[Dva načina za izdelavo dvojezičnih podnapisov|/guides/make-bilingual-subtitles.html]]; za razliko med vdelanimi in zunanjimi sledmi ter katere je mogoče izvleči, glejte [[Kako spraviti podnapise ven iz videa|/guides/extract-subtitles-from-video.html]]."
    ]
   }
  ]
 },
 "vtt-to-srt": {
  "seo": {
   "title": "Pretvornik VTT v SRT – Pretvorba podnapisov WebVTT – AI-SRTSub",
   "desc": "Pretvorite podnapise VTT (WebVTT) v SRT za urejevalnike in predvajalnike, ki sprejemajo samo SRT. Glava WEBVTT in bloki NOTE se samodejno počistijo. Izvaža se v vašem brskalniku.",
   "h1": "VTT to SRT :: VTT v SRT",
   "intro": "Prelevite podnapise VTT (WebVTT) v SRT: spustite datoteko, izberite SRT, prenesite. Glava in bloki opomb se počistijo, časovne oznake pa se vrnejo na zapis z vejico.",
   "ctaText": "Convert VTT → SRT :: Pretvori VTT → SRT"
  },
  "body": [
   {
    "h2": "Kdaj potrebujete nazaj SRT",
    "ps": [
     "CapCut, Premiere, večina namiznih predvajalnikov in starejša orodja za podnapise sprejemajo samo **SRT**. Podnapisi, preneseni s spleta ali iz YouTuba, so običajno v formatu VTT – pretvorite jih v SRT za neposreden uvoz."
    ]
   },
   {
    "h2": "Kaj se počisti iz VTT-ja",
    "ps": [
     "**Vrstica glave WEBVTT**, bloki NOTE, bloki STYLE/REGION in nastavitve iztočnic za časovno vrstico (kot je align:start) niso besedilo podnapisov – samodejno se zavržejo; oštevilčenje se obnovi, ločilo za milisekunde pa se iz pike vrne na vejico."
    ],
    "img": {
     "file": "convert-upload-vtt",
     "alt": "Območje nalaganja: naložena datoteka VTT, zaznana kot VTT",
     "cap": "Datoteka z glavo WEBVTT je takoj prepoznana kot VTT"
    }
   },
   {
    "h2": "How to convert :: Kako pretvoriti",
    "ps": [
     "Odprite [[pretvornik|/convert.html]], spustite VTT, izberite **SRT - SubRip** kot izhod ter nato pretvorite in prenesite. Vrednosti besedila in časa ostanejo nespremenjene."
    ],
    "img": {
     "file": "convert-result-srt",
     "alt": "Rezultat pretvorbe: oštevilčenje SRT s časovnimi oznakami z vejico",
     "cap": "Pretvorjeni SRT: številke iztočnic + časovne oznake z vejico"
    }
   }
  ]
 }
};
