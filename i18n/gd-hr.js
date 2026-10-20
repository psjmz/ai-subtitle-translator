/* i18n/gd-hr.js —— 43 篇指南页的hr译文（由 _mkgd.js 生成，勿手改）
 * 源：_gd/hr.json（Gemini 翻译，_gemgd.js 产出）
 * 结构：{ <slug>: { seo:{title,desc,h1,intro,ctaText}, body:[{h2,ps[],img}] } }
 * ⚠️ server.js 自己 require 它，不被任何 html 引用 —— 部署时必须显式加进传输列表。
 */
module.exports = {
 "ass-to-srt": {
  "seo": {
   "title": "Pretvarač iz ASS u SRT – Pretvori ASS/SSA titlove – AI-SRTSub",
   "desc": "Pretvori ASS (i SSA) titlove u obični SRT: tekst i vrijeme se izvlače kakvi jesu, stilovi ostaju iza. Za softver koji podržava samo SRT. Radi u vašem pregledniku.",
   "h1": "ASS u SRT",
   "intro": "Pretvorite ASS (ili SSA) titlove u SRT: ispustite datoteku, odaberite SRT i preuzmite. Tekst i vrijeme se izvlače kakvi jesu; oznake stila se ne prenose.",
   "ctaText": "Pretvori ASS → SRT"
  },
  "body": [
   {
    "h2": "Kada vam ponovno zatreba SRT",
    "ps": [
     "Programi za montažu, set-top box uređaji, TV reproduktori, alati za prevođenje — mnogi naknadni koraci prihvaćaju isključivo **SRT**. Fensi stilovi i pozicioniranje u ASS-u tamo ne znače ništa, pa je obični SRT najsigurniji prijenos."
    ]
   },
   {
    "h2": "Što se događa s oznakama stila",
    "ps": [
     "Svaki ASS odsječak je redak Dialogue čiji tekst često sadrži zamjenske oznake poput `{\\fonts}` za boju, kretanje ili efekte. Pretvaranjem u SRT **te se oznake uklanjaju zajedno sa stilom**, zadržavajući samo tekst i vrijeme; prijelomi retka `\\N` postaju pravi prijelomi retka. SSA datoteke su također čitljive."
    ],
    "img": {
     "file": "convert-result-srt",
     "alt": "Rezultat pretvorbe: SRT numeriranje i tekst izvučeni iz ASS-a",
     "cap": "Izvučeni SRT: jedan broj po odsječku, čist tekst"
    }
   },
   {
    "h2": "Kako izvršiti pretvorbu",
    "ps": [
     "Otvorite [[pretvarač|/convert.html]], ubacite ASS datoteku (radi i .ssa), odaberite **SRT - SubRip** kao izlaz, a zatim pretvorite i preuzmite. Idete u suprotnom smjeru? Pogledajte [[SRT u ASS|/guides/srt-to-ass.html]]."
    ]
   }
  ]
 },
 "batch": {
  "seo": {
   "title": "Kako masovno pretvoriti titlove – Stotine u jedan ZIP – AI-SRTSub",
   "desc": "Vodič: ubacite desetke SRT/VTT datoteka, pretvorite ih u jedan format, preuzmite jedan ZIP. Ponovno numerirano, normalizirane vremenske oznake, neprepoznate datoteke označene umjesto da se uvuku u arhivu.",
   "h1": "Kako masovno pretvoriti titlove",
   "intro": "Cijela sezona titlova obično mora završiti u jednom formatu, a njihovo učitavanje jedno po jedno traje vječno. Ubacite ih sve ovdje, pretvorite ih zajedno i preuzmite jedan ZIP — datoteke koje se ne mogu obraditi bivaju označene, a nikada se tiho ne pakiraju kao da su uspjele.",
   "ctaText": "Otvori masovnu pretvorbu"
  },
  "body": [
   {
    "h2": "Što ovaj alat radi",
    "ps": [
     "Titlovi za cijelu sezonu ili komplet obično moraju biti ujednačeni prije nego što se s njima može učiniti bilo što drugo. Evo što stranica za masovnu obradu radi:"
    ]
   },
   {
    "h2": "Dodavanje datoteka",
    "ps": [
     "Povucite nekoliko datoteka titlova u iscrtkani okvir zajedno ili kliknite i odaberite više komada odjednom. Popis datoteka prikazuje svaku: obrađene datoteke prikazuju broj odsječaka, one neobrađene označene su jednostavno kao nepriznate. Gornja traka zbraja broj datoteka, broj odsječaka i koliko ih je ostalo nepriznato.",
     "⚠️ Ova stranica čita samo UTF-8. Sve s oštećenim kodiranjem (zaslon prepun upitnika ili kvadratića) prvo treba proći kroz [[popravak kodiranja|/repair.html]]."
    ],
    "img": {
     "file": "batch-list",
     "alt": "Popis datoteka: naziv i broj odsječaka po datoteci, nepriznate označene crvenom bojom",
     "cap": "Svaka datoteka je izlistana, a nepriznate su označene na licu mjesta"
    }
   },
   {
    "h2": "U što pretvoriti sve",
    "ps": [
     "Odaberite ciljni format pod \"Pretvori sve u\" — SRT ili VTT. Svaka datoteka na popisu se zatim ponovno generira u tom formatu: brojevi odsječaka se ponovno numeriraju od vrha, vremenske oznake se normaliziraju na ciljane (SRT odvaja milisekunde zarezom, VTT točkom).",
     "**Izvorni nazivi datoteka se čuvaju i mijenja se samo ekstenzija**; dvostruki nazivi dobivaju dodani broj tako da ništa ne prebriše ništa."
    ],
    "img": {
     "file": "batch-up",
     "alt": "Odabir ciljnog formata i stanje popisa, s trakom statistike koja prikazuje broj datoteka i odsječaka",
     "cap": "Odaberite ciljni format i svaka se datoteka ponovno generira; nazivima datoteka mijenja se samo ekstenzija"
    }
   },
   {
    "h2": "Pakiranje i preuzimanje",
    "ps": [
     "Kliknite \"Spakiraj u jedan ZIP i preuzmi\" i arhiva sadrži svaku pretvorenu datoteku. **Datoteke bez prepoznatljivih odsječaka ostaju izvan arhive** — ostaju na popisu, označene, umjesto da budu pomiješane kao da su uspjele. Nakon pakiranja dobivate broj datoteka unutra."
    ],
    "img": {
     "file": "batch-zip",
     "alt": "Područje pakiranja: gumb za preuzimanje ZIP-a i poruka o rezultatu pakiranja",
     "cap": "Nepriznate datoteke ostaju izvan arhive i ostaju označene na popisu"
    }
   },
   {
    "h2": "Zašto je datoteka označena kao nepriznata",
    "ps": [
     "Datoteka je označena kada se iz nje ne mogu pročitati nikakvi odsječci. Tri uobičajena razloga: to uopće nije titl (recimo zalutala .txt datoteka s obavijesti), kodiranje nije UTF-8 (pa se čita samo kao znakovi zamjene) ili je sadržaj spojen u jedan blok bez vremenskih oznaka.",
     "S označenim datotekama može se postupati pojedinačno: problemi s kodiranjem idu na [[popravak kodiranja|/repair.html]], problemi s formatom na [[pretvarač formata|/convert.html]] za pojedinačnu pretvorbu prije povratka na popis."
    ]
   },
   {
    "h2": "Česta pitanja",
    "ps": [
     "**Koliko datoteka mogu dodati?** Nema čvrstog ograničenja; ovisi o memoriji vašeg preglednika, a nekoliko stotina SRT datoteka obično je u redu.",
     "**Mijenja li mi dijalog?** Ne. Masovna pretvorba mijenja samo format spremnika — ponovno numeriranje odsječaka i normaliziranje vremenskih oznaka — nikada ni jednu riječ dijaloga.",
     "**Što ako trebam promijeniti sadržaj?** Ova stranica samo pretvara formate. Za skupnu promjenu vremena koristite [[prilagodbu vremena|/shift.html]]; za promjenu izraza koristite [[zamjenu pojmova|/glossary.html]]; oboje radi datoteka po datoteka.",
     "**Je li podržan ASS?** Ova stranica pretvara samo između SRT-a i VTT-a. ASS nosi stilove — upotrijebite [[pretvarač formata|/convert.html]] na njemu pojedinačno."
    ]
   },
   {
    "h2": "Privatnost",
    "ps": [
     "Pretvorba i pakiranje odvijaju se u potpunosti u vašem pregledniku. Sadržaj titlova se nikada ne šalje na poslužitelj."
    ]
   },
   {
    "h2": "Povezani alati i vodiči",
    "ps": [
     "Što promijeniti za cijelu sezonu i kojim redoslijedom — [[masovno uređivanje cijele sezone titlova|/guides/batch-convert-srt.html]]; više formata za jednu datoteku — [[pretvarač formata|/convert.html]]; lektura u proračunskoj tablici — [[titl ⇄ tablica|/table.html]]."
    ]
   }
  ]
 },
 "batch-convert-srt": {
  "seo": {
   "title": "Masovno uređivanje cijele sezone – Što se može, a što ne – AI-SRTSub",
   "desc": "Sezona obično treba istu promjenu svugdje: ujednačen format, pomak vremena, nazivlje. Evo što se završava u jednom prolazu, što ne može i kako postupiti s datotekama koje se ne uspiju obraditi.",
   "h1": "Masovno uređivanje cijele sezone titlova",
   "intro": "Kada desetke datoteka titlova treba promijeniti, obično je riječ o istoj promjeni svaki put. Poznavanje dijelova koji se mogu obaviti u jednom prolazu štedi daleko više vremena nego njihovo ručno uređivanje jedno po jedno.",
   "ctaText": "Otvori masovnu pretvorbu"
  },
  "body": [
   {
    "h2": "Obično je to ista promjena svugdje",
    "ps": [
     "Kada se titlovi pokvare za cijelu sezonu, rijetko koja epizoda ima svoj vlastiti privatni problem — obično je to jedan uzrok koji pogađa svaku epizodu: ista je grupa za izdanje kodirala sve (pa se format i vodeni žigovi podudaraju), sve su bile tempirane na istu video verziju (pa se smjer i iznos pomaka slažu) ili su se transliteracije razišle tijekom sezone.",
     "Prvo provjerite dvije epizode — jednu rano, jednu kasno — i potvrdite je li to zaista **isti problem** prije nego što bilo što masovno obradite. Ako se njih dvije ne slažu, to nije nešto što masovna obrada može popraviti."
    ]
   },
   {
    "h2": "Što se može učiniti u jednom prolazu",
    "ps": [
     "**Ujednačavanje formata** jedina je stvar koja doista završava u jednom prolazu: povucite desetke SRT i VTT datoteka u [[masovnu pretvorbu|/batch.html]] zajedno, odaberite ciljni format i preuzmite jedan ZIP. Ponovno numeriranje i normalizacija vremenskih oznaka događaju se u tom istom koraku, a niti jedna riječ dijaloga se ne mijenja."
    ],
    "img": {
     "file": "batch-list",
     "alt": "Popis datoteka na stranici za masovnu obradu: broj odsječaka po datoteci, neprepoznati označeni crvenom bojom",
     "cap": "Ujednačeni format jedina je stvar koja se doista završava u jednom prolazu"
    }
   },
   {
    "h2": "Što se mora učiniti datoteka po datoteka",
    "ps": [
     "One nemaju ulaznu točku za masovnu obradu i zahtijevaju prolaz po datoteci — iako obično postoji ekvivalent koji se **mora učiniti samo jednom, a zatim se primjenjuje na cijelu sezonu**:"
    ]
   },
   {
    "h2": "Odredite pravi redoslijed",
    "ps": [
     "Kada treba obaviti nekoliko stvari, krivi redoslijed znači ponovni rad. Idite ovim redoslijedom:",
     "**Popravite kodiranje** → **ujednačite format** → **promijenite sadržaj** (vodeni žigovi, nazivlje, vrijeme) → **kontrola kvalitete na kraju**. Pretvaranje formata prije popravljanja kodiranja donosi vam samo iskrivljene znakove (mojibake) u drugom spremniku; promjena sadržaja prije ujednačavanja formata znači rad s neusklađenom podrškom alata."
    ],
    "img": {
     "file": "batch-zip",
     "alt": "Područje pakiranja: gumb za preuzimanje ZIP-a i poruka s rezultatom",
     "cap": "Prvo ujednačite formate, a zatim promijenite sadržaj"
    }
   },
   {
    "h2": "Rukovanje datotekama koje nisu prepoznate",
    "ps": [
     "Datoteke označene kao nepriznate u masovnoj pretvorbi ostaju izvan ZIP-a i ostaju na popisu. Tri su uobičajena razloga: to nije datoteka titlova (zalutala tekstualna datoteka), kodiranje nije UTF-8 ili je sadržaj spojen u jedan blok bez vremenskih oznaka.",
     "Problemi s kodiranjem idu na [[popravak kodiranja|/repair.html]] pojedinačno; problemi s formatom na [[pretvarač formata|/convert.html]] prije vraćanja na popis. **Nemojte silom gurati nepriznate datoteke u arhivu samo da povećate broj** — otkrivanje nestale epizode u vašem reproduktoru košta daleko više od minute koju ovo štedi."
    ]
   },
   {
    "h2": "Povezani alati i vodiči",
    "ps": [
     "Potpuni vodič za masovnu obradu — [[Kako masovno pretvoriti titlove|/guides/batch.html]]; ujednačeni pomaci vremena — [[Kako prilagoditi vrijeme titlova|/guides/shift.html]]; završni prolaz prije isporuke — [[Kontrola kvalitete titlova|/qc.html]]."
    ]
   }
  ]
 },
 "bilingual": {
  "seo": {
   "title": "Kako razdvojiti ili spojiti dvojezične titlove – AI-SRTSub",
   "desc": "Četiri načina za uklanjanje dvojezičnih titlova: zadržite samo jedan zapis, razdvojite u dvije datoteke ili spojite u jedan unos od dva retka. Oba oblika se automatski prepoznaju, u vašem pregledniku.",
   "h1": "Kako ukloniti dvojezične titlove",
   "intro": "Želite li razdvojiti dvojezične titlove, spojiti ih ili zadržati samo jedan zapis? Ovaj vodič prolazi kroz sva četiri načina: kako radi prepoznavanje, koji način odabrati i što dobivate pri izvozu.",
   "ctaText": "Otvori alat za uklanjanje dvojezičnih titlova"
  },
  "body": [
   {
    "h2": "Čemu služi ovaj alat",
    "ps": [
     "Imate dvojezične titlove, ali želite samo jedan od zapisa — ili obrnuto, želite razdvojiti ili spojiti dva zapisa:"
    ]
   },
   {
    "h2": "Kako prepoznaje dvojezični sadržaj",
    "ps": [
     "Dvodijelni dvojezični titlovi dolaze u dva uobičajena oblika, a alat prepoznaje svaki od njih — **bez nagađanja jezika**: **Oblik A (jedan unos, dva retka)** dijeli zapise prema pismu — kana, hangul, hanzi, latinica i drugi sustavi, ukupno deset; dva različita sustava označavaju dvojezičnost, a ono što se prvo pojavi računa se kao izvornik. Jedan sustav (na primjer, duga kineska linija prelomljena u dvije) tretira se kao jednojezični i zadržava se kakav jest. **Oblik B (dva odvojena unosa s identičnim vremenom)** dijeli zapise prema položaju — dva unosa u istoj vremenskoj oznaci čine par, prvi se računa kao izvornik, a kombinacije koje dijele latinicu, poput englesko-francuskog ili englesko-njemačkog, također su ispravno odvojene. Kada se ne prepozna dvojezični sadržaj, izbornik načina rada i gumb Start su zasivljeni zajedno s jasnom obaviješću, tako da se nikada silom ne dijeli u pogrešne rezultate."
    ]
   },
   {
    "h2": "Četiri načina rada",
    "ps": [
     "Odaberite jedan od četiri u padajućem izborniku “Što želite?”: **Zadrži samo izvornik** i **Zadrži samo prijevod** daju po jednu datoteku; **Razdvoji na dva** daje izvornu datoteku i datoteku prijevoda, s nazivima datoteka automatski označenim s `.orig` / `.dst` kako bi se spriječilo prepisivanje; **Spoji u jedan unos od dva retka** pretvara svaki par u dvojezični unos — izvornik u jednom retku, prijevod u drugom — dok se jednojezični parovi zadržavaju kakvi jesu i drugi redak se ne izmišlja. Kada promijenite način rada ili izlazne formate, postojeći sadržaj se automatski ponovno pokreće — nema potrebe za ponovnim klikom na Start."
    ],
    "img": {
     "file": "bilingual-modes",
     "alt": "Odabir načina rada u dvojezičnom alatu: zadrži izvornik, zadrži prijevod, razdvoji na dva, spoji u jedan unos od dva retka",
     "cap": "Četiri načina: zadrži jedan zapis, razdvoji u dva ili spoji u jedan unos od dva retka"
    }
   },
   {
    "h2": "Ulaz i izlaz",
    "ps": [
     "Čita sedam formata — SRT, VTT, ASS, SSA, SBV, LRC, TXT (ekstenzija datoteke na prvom mjestu, prepoznavanje sadržaja kao rezervna opcija) — i izvozi četiri: SRT, VTT, ASS, TXT. Bilo koja kombinacija ulaza i izlaza radi, tako da se pretvorba između formata odvija putem. ASS `\\N` prijelomi retka vraćaju se na prave prijelome retka, a oznake efekata se uklanjaju pri izvozu u drugi format."
    ]
   },
   {
    "h2": "Rezultati i izvoz",
    "ps": [
     "Rezultati su u cijelosti prikazani u tekstualnom okviru samo za čitanje, svaka datoteka s brojem unosa i statistikom ukupnog trajanja; gumbi Preuzmi i Kopiraj izravno prenose datoteku. Područje rezultata je pregled — ovdje nema uređivanja teksta ili vremena. Za izvođenje promjena prvo izvezite, a zatim upotrijebite odgovarajući alat."
    ],
    "img": {
     "file": "bilingual-result",
     "alt": "Područje rezultata uklanjanja: pregled samo za čitanje, statistika broja unosa i gumbi za preuzimanje/kopiranje",
     "cap": "Pregled cijelog teksta + statistika unosa i trajanja + preuzimanje i kopiranje"
    }
   },
   {
    "h2": "Česta pitanja",
    "ps": [
     "**Jedan unos ima engleski u jednom retku, a francuski u drugom — zašto se ne želi razdvojiti?** Oblik A dijeli zapise prema pismu, tako da se dva jezika koja dijele jedno pismo unutar jednog unosa ne mogu odvojiti. Preoblikujte ga u Oblik B (dva unosa na istoj vremenskoj osi) i dijeljenje temeljeno na položaju će raditi.",
     "**Samo jedna datoteka u preuzimanju?** „Zadrži samo izvornik”, „Zadrži samo prijevod” i „Spoji u jedan unos od dva retka” po dizajnu daju jednu datoteku; samo „Razdvoji na dva” daje vam dvije, označene s `.orig` / `.dst`.",
     "**Mogu li obraditi skupno?** Jednu po jednu datoteku; redovi čekanja nisu podržani.",
     "**Prenosi li moje titlove?** Ne — analiza i izvoz odvijaju se u potpunosti u vašem pregledniku."
    ]
   },
   {
    "h2": "Povezani vodiči",
    "ps": [
     "Za brzi način razdvajanja dva zapisa pogledajte [[Razdvajanje dvojezičnih titlova u dva zapisa|/guides/split-bilingual-subtitles.html]]; za informacije o tome kako se stvaraju dvojezični titlovi pogledajte [[Dva načina izrade dvojezičnih titlova|/guides/make-bilingual-subtitles.html]]; za strojno prevođenje upotrijebite [[Prevođenje AI titlova|/translate.html]]."
    ]
   }
  ]
 },
 "clean": {
  "seo": {
   "title": "Čistač titlova – uklonite vodene žigove, oglase, SDH – AI-SRTSub",
   "desc": "Čistač titlova: 13 pravila uklanja vodene žigove, oglase, SDH natpise, HTML oznake, duplikate; svaka promjena ima usporedbu i može se poništiti. SRT/VTT/ASS, sve u pregledniku.",
   "h1": "Kako koristiti čistač titlova",
   "intro": "Titlovi preuzeti s weba često sadrže vodene žigove, oglase i SDH natpise. Čistač primjenjuje 13 pravila u jednom prolazu, a svaka je promjena uspoređena i reverzibilna.",
   "ctaText": "Otvori čistač titlova"
  },
  "body": [
   {
    "h2": "Što ovaj alat radi",
    "ps": [
     "Preuzete datoteke titlova često sadrže ono što ne bi trebale. Čistač ih uklanja u jednom prolazu temeljenom na pravilima:"
    ]
   },
   {
    "h2": "Učitavanje i prepoznavanje",
    "ps": [
     "Povucite datoteku ili kliknite za učitavanje — podržani su SRT, VTT, ASS, SSA i TXT — ili izravno zalijepite tekst titla. Kodiranje se automatski prepoznaje: ako dešifriranje u UTF-8 proizvodi znakove zamjene, vraća se na GBK ili Big5, a stranica prikazuje \"Encoding fixed as {encoding}\". Ako učitate dvojezične titlove s dva zapisa (dva identična vremenska slijeka, jedan kineski i jedan engleski), oni se spajaju u jedan dvojezični zapis s prekidačem \"izvornik gore / prijevod gore\"."
    ]
   },
   {
    "h2": "Konfiguriranje 13 pravila",
    "ps": [
     "Sučelje ima četiri grupe s 13 potvrdnih okvira: **Oznake i oblikovanje** (ASS efekti, HTML oznake, upravljački znakovi, ponovno numeriranje nakon sortiranja), **SDH i zvučni efekti** (SDH natpisi, oznake govornika, čisti stihovi pjesama), **Vodeni žigovi i neželjeni unosi** (vodeni žigovi i oglasi, dvostruki unosi, prazni unosi), **Ispravci teksta** (interpunkcija i razmaki, popravak velikih slova, spajanje kratkih redaka). Prema zadanim postavkama uključene su samo stavke koje su \"bez gubitaka i sigurne\"; stavke koje mogu ukloniti sadržaj (linije s tekstom pjesama, popravak velikih slova, spajanje kratkih redaka) su isključene — označite ih kada je potrebno. Svaka stavka ima ⓘ savjet pri prelasku mišem, a svaka promjena potvrdnog okvira ponovno se pokreće trenutačno."
    ],
    "img": {
     "file": "clean-opts",
     "alt": "Sučelje opcija čišćenja: četiri grupe od 13 potvrdnih okvira, aktivni broj prikazan na vrhu",
     "cap": "Četiri grupe, 13 pravila; prema zadanim postavkama uključene su samo stavke bez gubitaka, promjene se primjenjuju trenutačno"
    }
   },
   {
    "h2": "Usporedba promjena i poništavanje",
    "ps": [
     "Rezultati se ne prepisuju izravno: svaka promjena je navedena u tablici usporedbe s oznakom pravila (zašto je ovaj unos uredjen ili izbrisan). Želite li ga natrag? Kliknite \"Vrati\" na tom retku; \"Vrati sve\" vraća sve jednim klikom, a ponovnim klikom ponovno se primjenjuje puno čišćenje. Traka statistike prikazuje brojeve za izvorno / očišćeno / izbrisano / izmijenjeno / vraćeno."
    ],
    "img": {
     "file": "clean-diff",
     "alt": "Tablica usporedbe promjena: indeks, vrijeme, izvorni naspram očišćenog teksta, oznaka pravila u svakom retku",
     "cap": "Svaka promjena nosi oznaku pravila; vratite pojedinačne retke ili sve odjednom"
    }
   },
   {
    "h2": "Pregled i izvoz",
    "ps": [
     "Prebacivanje između prikaza \"Očišćeno / Izvorno\". U izvornom prikazu izbrisani unosi su prekriženi i označeni s \"Izbrisano\", a izvezena datoteka točno odgovara pregledu. Izvozni formati: SRT (zadano), VTT, ASS (dostupno kada je izvor ASS, s odjeljkom stila očuvanim u izvornom obliku) i običan tekst TXT bez vremenskih oznaka. Naziv datoteke automatski dobiva oznaku `.clean`."
    ],
    "img": {
     "file": "clean-preview",
     "alt": "Pregled cijelog teksta: očišćeni i izvorni prikazi s trakom statistike koja prikazuje brojeve",
     "cap": "Dva prikaza pregleda, ono što vidite je ono što dobivate"
    }
   },
   {
    "h2": "Često postavljana pitanja",
    "ps": [
     "**Hoće li greškom izbrisati normalan dijalog?** Pravilo vodenog žiga najprije uklanja retke vodenog žiga (zadržavajući retke dijaloga unutar dvojezičnih unosa) i briše cijeli unos samo ako ostanu tragovi; uklanjanje SDH dotiče samo sadržaj u zagradama s SDH ključnim riječima koji ima 40 znakova ili manje — obični zagradni dijalog ostaje.",
     "**Kako se čisti stihovi pjesama razlikuju od stihova unutar dijaloga?** Brišu se samo unosi u kojima je svaki pojedini redak omotan notama ♪ ili oznakama poput [music]; dijalog koji sadrži stihove se zadržava.",
     "**Mogu li oznake govornika pogoditi kineski tekst?** Podudara se samo alfanumerički naziv velikim slovima na početku retka praćen dvotočkom (poput `GEORGE:`); rečenice s kineskom dvotočkom nikada se ne podudaraju.",
     "**Mogu li očistiti više datoteka odjednom?** Ne — jedna datoteka po pokretanju. Preuzmite rezultat, a zatim učitajte sljedeću."
    ]
   },
   {
    "h2": "Privatnost",
    "ps": [
     "Čišćenje se odvija u potpunosti u vašem pregledniku; sadržaj titlova se nikada ne šalje na poslužitelj."
    ]
   },
   {
    "h2": "Povezani alati i vodiči",
    "ps": [
     "Za kratki vodič usredotočen na uklanjanje vodenih žigova i oglasa pogledajte [[uklanjanje oglasa i vodenih žigova s titlova|/guides/remove-subtitle-ads.html]]; provjerite svoju datoteku kroz [[provjeru kvalitete titlova|/guides/subtitle-quality-check.html]] prije predaje; za promjenu formata koristite [[pretvorbu formata|/convert.html]]."
    ]
   }
  ]
 },
 "convert": {
  "seo": {
   "title": "Kako pretvoriti formate titlova (SRT, VTT, ASS, SBV, LRC, TXT) – AI-SRTSub",
   "desc": "Ilustrirani vodič kroz pretvarač: ispustite datoteku, provjerite prepoznati format, odaberite izlazni format, obradite dvojezični tekst i preuzmite. Sve se izvodi u vašem pregledniku.",
   "h1": "Vodič za pretvaranje formata titlova",
   "intro": "Ovaj vodič prolazi stranicu od vrha do dna: učitajte titl, potvrdite prepoznati format, odaberite izlazni format i preuzmite. Sve se izvodi u vašem pregledniku – nijedna datoteka ne napušta vaš uređaj.",
   "ctaText": "Otvori pretvarač titlova"
  },
  "body": [
   {
    "h2": "Učitajte svoje titlove",
    "ps": [
     "Povucite datoteku u isprekidani okvir ili kliknite za odabir; također možete **zalijepiti sadržaj** izravno u tekstni okvir. Format se prepoznaje i po ekstenziji i po sadržaju, a rezultat se prikazuje u oznaci formata."
    ],
    "img": {
     "file": "convert-upload",
     "alt": "Područje za prijenos: učitan je uzorak SRT-a, prepoznat kao SRT",
     "cap": "Prepoznati format prikazuje se u oznaci – provjerite ovdje prvo ako ste u nedoumici"
    }
   },
   {
    "h2": "Odaberite izlazni format",
    "ps": [
     "Odaberite ciljni format iz padajućeg izbornika: šest opcija – srt, vtt, ass, sbv, lrc, txt. Pretvaranjem u ass ponovno se gradi zadani stil 1920×1080 (bijeli tekst, crni obrub, donji centar) i **ne zadržava izvorne fontove ni boje**; txt izvozi samo tekst, bez vremenskih oznaka."
    ],
    "img": {
     "file": "convert-opt",
     "alt": "Padajući izbornik izlaznog formata s odabranim VTT-om",
     "cap": "Izlazni format ne prati ulazni – sami ga birate"
    }
   },
   {
    "h2": "Dvojezično rukovanje",
    "ps": [
     "Ako je datoteka dvojezična (dva retka u jednom bloku ili isprepleteni blokovi), izgled se tijekom pretvaranja čuva kakav jest. Odabir opcije \"zadrži dvojezično\" dijeli dva jezika na gornji i donji redak, pri čemu se svaki zasebno prelama; kontrola je onemogućena kada se ne otkrije dvojezični tekst."
    ]
   },
   {
    "h2": "Pretvori i preuzmi",
    "ps": [
     "Pritisnite \"Pretvori\": ploča s rezultatima prikazuje broj blokova i ukupno trajanje, a tekst je spreman za pregled. Kliknite **Preuzmi** za spremanje datoteke ili **Kopiraj** za izravno preuzimanje teksta. Pretvaranje nikada ne mijenja vrijednosti vremena – samo prepisuje format. Za ponovno tempiranje blokova upotrijebite [[alat za pomicanje|/shift.html]]."
    ],
    "img": {
     "file": "convert-result",
     "alt": "Ploča s rezultatima: broj blokova i ukupno trajanje s gumbima za preuzimanje i kopiranje",
     "cap": "6 blokova, ukupno 0:23 – pregledajte tekst prije preuzimanja"
    }
   }
  ]
 },
 "extract": {
  "seo": {
   "title": "Izvađivanje običnog teksta iz titlova – Dva rasporeda, pet čišćenja – AI-SRTSub",
   "desc": "Izvucite dijalog iz titlova kao čist obični tekst: neprekidni odlomci ili jedan redak po bloku, uz opis onoga što uklanja pet prekidača za SDH blokove, vodene žigove, duplikate, prefikse i stihove pjesama.",
   "h1": "Kako izvući običan tekst iz titlova",
   "intro": "Izvucite dijalog iz datoteke titlova kao čist obični tekst: brojevi blokova, vremenske oznake i oznake stila uklanjaju se automatski, tako da rezultat djeluje poput članka ili služi kao popis dijaloga.",
   "ctaText": "Otvori alat za izvađivanje običnog teksta"
  },
  "body": [
   {
    "h2": "Što ovaj alat radi",
    "ps": [
     "Čitatelju je važan samo dijalog u datoteci titlova; sve ostalo je struktura namijenjena reproduktoru – brojevi blokova, vremenske oznake, oznake stila. Ova stranica uklanja strukturu i zadržava riječi."
    ]
   },
   {
    "h2": "Ispustite datoteku, nemojte je samo prenositi",
    "ps": [
     "Stupac \"1 Dodaj titlove\" s lijeve strane prihvaća prenesenu datoteku, a sadržaj titlova možete i izravno zalijepiti u tekstni okvir. Ako ste odabrali krelu datoteku, kliknite \"Očisti\" i počnite ponovno.",
     "Ova stranica čita datoteke kao UTF-8. Ako se titlovi otvore kao hrpa znakova pitanja ili kvadratića, kodiranje je neispravno – najprije ga pretvorite u UTF-8 u [[Popravak nečitkog teksta|/repair.html]], a zatim se vratite."
    ],
    "img": {
     "file": "extract-up",
     "alt": "Područje za dodavanje titlova u alatu za izvađivanje običnog teksta",
     "cap": "Prenesite datoteku ili izravno zalijepite sadržaj titlova u tekstni okvir"
    }
   },
   {
    "h2": "Odabir između dvaju rasporeda",
    "ps": [
     "Na vrhu odjeljka \"2 Mogućnosti izvađivanja\" nalazi se raspored: **Neprekidni odlomci** prelama tekst na pauzama i rečeničnim znakovima interpunkcije tako da se čita poput članka; **Jedan redak po bloku** daje jedan redak po unosu titla, što u potpunosti odgovara unosima izvorne datoteke.",
     "Kopiranje dijaloga za bilješke, vježbanje prevođenja ili čitanje kao proze zahtijeva neprekidne odlomke; izrada tablice dijaloga, usporedba redak po redak s izvornikom ili prosljeđivanje drugom alatu zahtijeva jedan redak po bloku."
    ],
    "img": {
     "file": "extract-opt",
     "alt": "Prekidači za raspored i čišćenje pod mogućnostima izvađivanja",
     "cap": "Odaberite jedan raspored; pet prekidača u nastavku odlučuje koja se vrsta sadržaja uklanja"
    }
   },
   {
    "h2": "Što uklanja svako od pet čišćenja",
    "ps": [
     "**Ukloni SDH blokove**: briše zvučne opise u zagradama kao što su \"(koraci)\" ili \"[glazba]\" i zadržava dijalog.",
     "**Ukloni vodene žigove i oglase**: uklanja retke poput zasluga obožavateljskih prijevoda, URL-ova i naziva kanala.",
     "**Ukloni susjedne duplikate**: kada se ista rečenica pojavi dvaput zaredom (greška pri reprodukciji), zadržava se samo jedna kopija; duplikati koji su udaljeniji nose značenje i ostavljaju se netaknutima.",
     "**Ukloni govornikove prefikse**: \"IVAN: Bok\" postaje \"Bok\". Isključeno prema zadanim postavkama – tekst u stilu scenarija mora prikazivati tko govori.",
     "**Preskoči retke stihova**: retci koji su u cijelosti \"♪ … ♪\" se preskaču. Isključeno prema zadanim postavkama – stihovi su također riječi."
    ],
    "img": {
     "file": "extract-clean",
     "alt": "Pet prekidača za čišćenje i njihovi opisi pod mogućnostima izvađivanja",
     "cap": "Svaki prekidač s desne strane navodi što uklanja; označite one koji vam trebaju"
    }
   },
   {
    "h2": "Preuzimanje rezultata",
    "ps": [
     "Stupac \"3 Rezultat\" s desne strane prikazuje izvađeni tekst uživo i preračunava se čim promijenite neku mogućnost.",
     "Kada ste zadovoljni, kliknite \"Preuzmi\" da biste spremili datoteku .txt ili \"Kopiraj\" da biste ponijeli tekst sa sobom. Za jezike koji ne odvajaju riječi razmacima, kao što su kineski i japanski, spajanje redaka slijedi drugačija pravila, a alat to rješava automatski za svaki jezik."
    ],
    "img": {
     "file": "extract-out",
     "alt": "Područje rezultata s gumbima za preuzimanje i kopiranje",
     "cap": "Rezultat se ažurira uživo; preuzmite ga kao txt ili ga kopirajte izravno"
    }
   },
   {
    "h2": "Ono što ostaje netaknuto",
    "ps": [
     "Sam dijalog se ne prepisuje. Prekidači za čišćenje samo odlučuju koji se cijeli retci ili blokovi odbacuju; oni nikada ne mijenjaju formulaciju unosa.",
     "Vremenske oznake i brojevi blokova jednostavno se ne ispisuju, ne mijenjaju pa ispisuju – izvorna datoteka ostaje netaknuta, a ova stranica ne nudi izvoz s vremenskim oznakama. Taj posao pripada [[Pretvaranju formata|/convert.html]]."
    ]
   },
   {
    "h2": "Česta pitanja",
    "ps": [
     "**Ostaju li ASS oznake stila u tekstu?** Ne. ASS `{}` blokovi nadjačavanja se uklanjaju i ostaje samo dijalog.",
     "**Dolazi li dvojezična datoteka kao dva retka ili jedan?** Onoliko redaka koliko je unos imao; ova stranica ih ne spaja niti razdvaja – za njihovo odvajanje upotrijebite [[Dvojezično razdvajanje|/bilingual.html]].",
     "**Zašto se govornikovi prefisi zadržavaju prema zadanim postavkama?** Ime u \"IVAN: Bok\" često je koristan podatak (scenariji, popisi dijaloga), a njegovo uklanjanje otežava prepoznavanje tko govori, pa je izbor prepušten vama.",
     "**Mogu li se izvući i LRC datoteke stihova?** Da. LRC vremenske oznake se uklanjaju, a retci stihova ostaju; ako ne želite stihove, označite \"Preskoči retke stihova\"."
    ]
   },
   {
    "h2": "Privatnost",
    "ps": [
     "Titlovi se obrađuju u potpunosti u pregledniku: ništa se ne prenosi i ništa ne prolazi kroz poslužitelj. Tekst ostaje samo na trenutnoj stranici i briše se osvježavanjem."
    ]
   },
   {
    "h2": "Povezani alati i vodiči",
    "ps": [
     "Da biste razumjeli što datoteka titlova zapravo sadrži, pogledajte [[Što se nalazi unutar SRT datoteke|/guides/srt-file-format.html]]; da biste preveli izvađeni dijalog, idite na [[Prevođenje titlova|/translate.html]]; da biste ga pretvorili u tablicu, upotrijebite [[Titlovi u Excel/CSV|/guides/srt-to-excel.html]]; a prije bilo kakve predaje pokrenite [[Kontrolu kvalitete titlova|/qc.html]]."
    ]
   }
  ]
 },
 "extract-subtitles-from-video": {
  "seo": {
   "title": "Vađenje titlova iz videa – Ugrađeni u odnosu na vanjske – AI-SRTSub",
   "desc": "Što MKV, WebM, MP4 i MOV sadrže, kako se razlikuju tekstualni, ASS, WebVTT i mov_text zapisi, zašto slikovni titlovi (PGS / DVD) nemaju tekst i što učiniti nakon vađenja.",
   "h1": "Vađenje titlova iz videa",
   "intro": "Titlovi mogu živjeti unutar videodatoteke ili stajati samostalno izvan nje. Unutra su zapis u spremniku – njihovo vađenje nema nikakve veze s transkodiranjem.",
   "ctaText": "Otvori vađenje titlova iz videa"
  },
  "body": [
   {
    "h2": "Gdje titlovi žive: ugrađeni i vanjski",
    "ps": [
     "Videodatoteka (MKV, MP4) spremnik je koji istovremeno sadrži videodatoteku, audiodatoteku i zapise titlova. Titlovi koji su zatvoreni unutra jesu **ugrađeni**; zasebna datoteka .srt / .ass koja se nalazi izvan jest **vanjska**, a ugrađeni zapis naziva se još i **sakrivenim u spremniku**.",
     "Vanjski se titlovi mogu koristiti takvi kakvi jesu. Problem su ugrađeni: da biste ih uređivali, prevodili ili gradili dvojezični zapis iz izvornika, nemate datoteku titlova pri ruci – najprije morate pročitati zapis iz spremnika. Ovaj korak nije transkodiranje: video se ne ponovno kodira, čitaju se samo podaci koji su već pohranjeni u spremniku."
    ]
   },
   {
    "h2": "Koji spremnik što nosi",
    "ps": [
     "Različiti spremnici drže različite formate titlova, a poteškoće pri vađenju također se razlikuju:"
    ],
    "img": {
     "file": "videosub-which",
     "alt": "Zapisi titlova navedeni na stranici za vađenje ugrađenih titlova",
     "cap": "Jedan zapis po retku, obično s jezikom i nazivom zapisa; kada postoji samo jedan, vadi se automatski"
    }
   },
   {
    "h2": "Zašto se slikovni titlovi ne mogu izvaditi",
    "ps": [
     "Blu-ray PGS i DVD titlovi uopće ne pohranjuju znakove, već samo niz slika s alfa kanalom. Kada ih reproduktor prikaže, on lijepi sliku, a ne iscrtava tekst.",
     "Stoga u takvom zapisu nema teksta za čitanje – nije stvar u tome da alat to ne podržava, nego u tome da tamo nema znakova. Stranica jasno kaže kada naiđe na takav zapis.",
     "Jedini način da se dođe do riječi jest najprije prepoznati znakove na tim slikama (OCR) i iz toga izgraditi titlove. To je zaseban proces od izvlačenja zapisa."
    ]
   },
   {
    "h2": "Što obično slijedi nakon vađenja",
    "ps": [
     "Ono što izlazi jest zapis kakav je bio: alat ne pogađa kodiranja i ne ispravlja vremenske oznake. Stoga se često javljaju dvije stvari:",
     "Jedna je **nečitak tekst** – problem s kodiranjem u izvornom zapisu koji svejedno izlazi nečitak; idite na [[Kako popraviti nečitak tekst|/guides/repair.html]] da biste identificirali kodiranje. Druga je **pogrešno vrijeme** – bez obzira ima li izvor uvodni logotip ili se brzine sličica ne podudaraju, rezultat je pomaknut u cjelini; upotrijebite [[Prilagodbu vremenskih oznaka|/shift.html]] da biste ga pomaknuli ili skalirali.",
     "Nakon toga, za prevođenje idite na [[Prevođenje titlova|/translate.html]], a da biste napravili dvojezični titl, pogledajte [[Dva načina izrade dvojezičnih titlova|/guides/make-bilingual-subtitles.html]]."
    ],
    "img": {
     "file": "videosub-formats",
     "alt": "Područje rezultata s formatima izvoza SRT / VTT / ASS / TXT",
     "cap": "Izvađeni se titlovi mogu izvesti u četiri formata; ASS izvor zadržava zaglavlje stila i razlučivost"
    }
   },
   {
    "h2": "Nekoliko stvari koje je lako pogriješiti",
    "ps": [
     "**Vađenje titlova nije njihovo ugrađivanje u sliku.** Video se ne ponovno kodira, pa kvaliteta slike i zvuka ostaju nepromijenjene.",
     "**Vađenje ne utječe na izvornu datoteku.** Samo se čita, nikada se ne zapisuje i niti jedan bajt videa se ne mijenja.",
     "**Sporost velike datoteke nije problem s vezom.** Alat skenira informacije o zapisima dio po dio, i što je datoteka veća, to dulje traje; sve se odvija lokalno.",
     "**Vanjskim titlovima ova stranica nije potrebna.** Ako imate datoteku .srt / .ass, idite ravno na [[Pretvaranje formata|/convert.html]]; samo titlovi zatvoreni unutar videa zahtijevaju prethodno vađenje."
    ]
   },
   {
    "h2": "Povezani alati i vodiči",
    "ps": [
     "Za potpuni vodič pogledajte [[Kako izvaditi titlove ugrađene u video|/guides/videosub.html]]; da biste preveli ono što izvadite, idite na [[Prevođenje titlova|/translate.html]], da biste napravili dvojezični titl pogledajte [[Dva načina izrade dvojezičnih titlova|/guides/make-bilingual-subtitles.html]]; za nečitak tekst počnite s [[Popravkom nečitkog teksta|/repair.html]]."
    ]
   }
  ]
 },
 "fps-23-976-vs-25": {
  "seo": {
   "title": "Što doista znače 23.976 / 24 / 25 / 30 fpsa – Vremenske oznake titlova – AI-SRTSub",
   "desc": "23.976 nije 24, a 29.97 nije 30 – nestalih 0,1% dolazi iz NTSC boje, dok PAL filmove ubrzava 4%. Saznajte kako to pomiče vremenske oznake vaših titlova i kako ih pretvoriti.",
   "h1": "Što doista znače 23.976 / 24 / 25 / 30 fpsa",
   "intro": "Jaz od 0,1% između 23.976 i 24 ostatak je iz povijesti televizije. Uz PAL-ovih 4%, to je razlog zašto titlovi gube sinkronizaciju kako film odmiče.",
   "ctaText": "Otvori prilagodbu vremenskih oznaka"
  },
  "body": [
   {
    "h2": "Što pojedini broj predstavlja",
    "ps": [
     "Brzina izmjene sličica (frame rate) označava koliko se slika prikaže u jednoj sekundi. Četiri s kojima se najčešće susrećete:"
    ]
   },
   {
    "h2": "Odakle potječe 0,1%",
    "ps": [
     "23.976 = 24 × 1000/1001, a 29.97 = 30 × 1000/1001. Taj omjer 1000/1001 ostatak je dodavanja boje u NTSC: kako bi se ugurala podnosiocu boje bez kvarljenja postojećih crno-bijelih prijamnika, brzina polja smanjena je sa 60 Hz na 59.94 Hz (60 × 1000/1001), a s njom se smanjila i brzina sličica.",
     "Rezultat: filmovi se u NTSC regijama prikazuju pri 23.976 umjesto pri 24. Razlika iznosi 0,1% ili 3,6 sekundi tijekom jednog sata – sama po sebi jedva primjetna, ali nemojte je miješati s 4% u nastavku i nikada nemojte kombinirati to dvoje u jednoj računicici."
    ]
   },
   {
    "h2": "Odakle potječe 4%",
    "ps": [
     "PAL regije prikazuju pri 25 fpsa. Filmovi se snimaju pri 24 fpsa i jednostavno se puštaju pri 25 – nijedna sličica nije dodana niti uklonjena, pa se reprodukcija odvija 4% brže (25/24 ≈ 1.0417). Film od 100 minuta u svojoj PAL verziji traje 96 minuta.",
     "To je korijen **progresivnog pomaka**: titlovi napravljeni prema izvorniku i videu u PAL verziji savršeno se podudaraju na početku, a na odjavnoj špici razlikuju se za četiri minute. Nijedan globalni pomak to ne može spasiti; to se mora skalirati prema omjeru."
    ],
    "img": {
     "file": "shift-step-rate",
     "alt": "Odjeljak za brzinu na stranici s vremenskim oznakama: okvir za unos omjera",
     "cap": "Skaliranje prema omjeru – jedna vrijednost pokriva cijeli film"
    }
   },
   {
    "h2": "Kako pretvoriti",
    "ps": [
     "Pretvaranje znači množenje s jednim omjerom koji se primjenjuje na cijeli film:"
    ]
   },
   {
    "h2": "Kako prepoznati što imate",
    "ps": [
     "Umjesto pogađanja omjera, pronađite dva trenutka za čiju ste točnu vremensku oznaku sigurni – obično prvi i posljednji redak dijaloga – i recite alatu \"ovaj redak treba biti na 00:00:12, a onaj na 01:35:40\"; on će linearno rastegnuti cijeli film između te dvije točke. To se zove \"sidrenje u dvjema točkama\" i za to vam nije potrebna nikakva matematika brzine sličica.",
     "Da biste sami potvrdili brzinu sličica, provjerite svoj reproduktor ili alat za informacije o mediju. Kada naziv datoteke poput `1080p.WEB` ne sadrži naznaku brzine sličica, sidrenje u dvjema točkama sigurniji je put."
    ],
    "img": {
     "file": "shift-step-two",
     "alt": "Odjeljak sidrenja u dvjema točkama na stranici s vremenskim oznakama: dva retka unosa vremenskih oznaka",
     "cap": "Sidrenje u dvjema točkama ne treba brzinu sličica – samo dvije vremenske oznake"
    }
   },
   {
    "h2": "Povezani alati i vodiči",
    "ps": [
     "Sama pretvorba brzine sličica – [[Pretvaranje brzine sličica titlova|/guides/srt-fps-converter.html]]; prilagodba brzine – [[Pretvaranje brzine titlova|/guides/subtitle-speed-converter.html]]; niste sigurni je li riječ o globalnom pomaku ili progresivnom odmaku – [[Titlovi koji sve više gube sinkronizaciju|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "glossary": {
  "seo": {
   "title": "Skupna zamjena pojmova u titlovima – Jedna tablica ispravlja datoteku – AI-SRTSub",
   "desc": "Jedno pravilo po retku, odvojeno s -> , => , → ili tabulatorom, uz # za komentare. Podudaranje cijelih riječi, osjetljivost na velika i mala slova, prvi ili drugi redak dvojezičnog bloka, svaka promjena izlistana i podložna poništavanju.",
   "h1": "Kako skupno zamijeniti pojmove u titlovima",
   "intro": "Jedna tablica pojmova usklađuje izraze u cijeloj datoteci titlova u jednom potezu – vremenske oznake, ASS stilovi i VTT NOTE blokovi ne mijenjaju se ni za jedan znak.",
   "ctaText": "Otvori skupnu zamjenu pojmova"
  },
  "body": [
   {
    "h2": "Što ovaj alat radi",
    "ps": [
     "Isto prevedena riječ na dva različita načina, imena i mjesta koja lutaju zbog strojniog prevođenja, tuđi titlovi koji se trebaju prilagoditi vašim pravilima – sve to dijeli jednu osobinu: mijenja se riječ, a ne struktura. Ova stranica mijenja samo riječi."
    ]
   },
   {
    "h2": "Dva unosa: titlovi i tablica pojmova",
    "ps": [
     "Stupac \"1 Dodaj titlove\" s lijeve strane prima datoteku titlova, ili sadržaj možete izravno zalijepiti; ako ste odabrali krelu datoteku, kliknite \"Očisti\".",
     "Stupac \"2 Tablica pojmova\" s desne strane sadrži pravila. **Jedno pravilo po retku**, pri čemu su stari i novi pojam odvojeni znakom `->` , `=>` , `→` ili tabulatorom – sva četiri rade. Retci koji počinju znakom `#` komentari su i ne sudjeluju u zamjeni.",
     "Ako niste sigurni u vezi s formatom, kliknite \"Ispuni primjer\" i uredite ga."
    ],
    "img": {
     "file": "glossary-up",
     "alt": "Područje za dodavanje titlova i unos tablice pojmova na stranici za zamjenu pojmova",
     "cap": "Titlovi lijevo, pravila desno; jedno pravilo po retku, stari i novi pojam odvojeni s ->"
    }
   },
   {
    "h2": "Kako napisati tablicu pojmova",
    "ps": [
     "Jedno pravilo po retku: trenutni pojam s lijeve strane, ono što treba postati s desne strane. Na primjer, `Thor -> Donar` zamjenjuje svaku pojavu riječi \"Thor\" u datoteci s \"Donar\".",
     "Komentari počinju znakom `#` i korisni su za označavanje skupine pravila (na primjer \"# ispravci imena 1. sezone\") te za privremeno isključivanje pravila – jednostavno stavite `#` ispred umjesto brisanja.",
     "Pravila se izvršavaju od vrha prema dnu; tekst koji stvori jedno pravilo ponovno se skenira u pravilima ispod njega. Kada je redoslijed važan (recimo, prvo zamijenite A s B, a zatim B s C), imajte to na umu."
    ],
    "img": {
     "file": "glossary-table",
     "alt": "Redak za retkom pravila zamjene u unosu tablice pojmova",
     "cap": "Jedno pravilo po retku; retci koji počinju s # jesu komentari i mogu privremeno isključiti pravilo"
    }
   },
   {
    "h2": "Što rade tri prekidača",
    "ps": [
     "**Opseg**: `all` / `first line only` / `second line only`. U dvojezičnoj datoteci odaberite \"samo drugi redak\" kada želite promijeniti samo prijevod; unosi koji imaju samo jedan redak ostaju netaknuti u bilo kojoj postavki za jedan redak – alat ne nagađa koja je strana izvornik.",
     "**Cijela riječ**: zamjenjuje samo pojmove koji stoje sami kao riječ, tako da `art` neće dotaknuti `start`. Za jezike koji ne odvajaju riječi razmacima, kao što su kineski i japanski, ovaj prekidač nema učinka – tamo zamjena radi na podnizovima.",
     "**Osjetljivo na veličinu slova**: isključeno prema zadanim postavkama, tako da se `CEO` i `ceo` oboje zamjenjuju; kada je označeno, zamjenjuje se samo točno isto pisano slovo."
    ],
    "img": {
     "file": "glossary-opt",
     "alt": "Prekidači opsega, cijele riječi i osjetljivosti na veličinu slova ispod tablice pojmova",
     "cap": "Opseg odlučuje koji se redak mijenja; cijela riječ i veličina slova odlučuju koliko se strogo podudara pojam"
    }
   },
   {
    "h2": "Svaka promjena izlistana, svaka promjena podložna poništavanju",
    "ps": [
     "\"3 Rezultat\" prikazuje zamijenjene titlove i također **navodi svaku promjenu**: koji blok, koji redak, iz čega u što.",
     "Ako neku od njih ne želite, kliknite je na popisu da biste poništili samo taj unos – nema potrebe za uređivanjem tablice pojmova i ponovnim pokretanjem. Kada ste zadovoljni, kliknite \"Preuzmi\" ili \"Kopiraj\"."
    ],
    "img": {
     "file": "glossary-out",
     "alt": "Područje rezultata s popisom pojedinačnih promjena",
     "cap": "Svaka je promjena navedena; kliknite onu koju ne želite da biste je poništili"
    }
   },
   {
    "h2": "Ono što ostaje netaknuto",
    "ps": [
     "**Vremenske oznake, linije ASS stila i VTT `NOTE` blokovi ne mijenjaju se ni za jedan znak.** Zamjena se primjenjuje samo na tekst dijaloga, nikada na strukturalne retke.",
     "Tablica pojmova nikada automatski ne mijenja vašu datoteku titlova – rezultat je novi izlaz, a izvornik ostaje kakav jest."
    ]
   },
   {
    "h2": "Česta pitanja",
    "ps": [
     "**Zašto pojam nije zamijenjen?** Prvo provjerite opseg: s odabranom opcijom \"samo drugi redak\" unosi koji imaju samo jedan redak ostaju netaknuti. Zatim provjerite podudaranje cijelih riječi, što zaustavlja podudaranja koja nisu samostalne riječi.",
     "**Zašto kineski jezik i dalje zamjenjuje podnizove iako je označeno podudaranje cijelih riječi?** To je očekivano. Kineski i japanski ne odvajaju riječi razmacima, pa alat ne može odrediti granice riječi i podudaranje cijelih riječi tu nema učinka.",
     "**Kako mogu sve vratiti nakon pogreške?** Poništite unose jedan po jedan na popisu promjena; da biste počeli ispočetka, očistite tablicu pojmova i ponovno dodajte titlove.",
     "**Mogu li se linije ASS stila promijeniti slučajno?** Ne. Linije stila i `NOTE` blokovi izvan su opsega; sudjeluje samo tekst dijaloga."
    ]
   },
   {
    "h2": "Privatnost",
    "ps": [
     "Titlovi i tablica pojmova obrađuju se u potpunosti u pregledniku: ništa se ne prenosi i ništa ne prolazi kroz poslužitelj. Tablica pojmova se ne pohranjuje, pa je prazna sljedeći put kada otvorite stranicu."
    ]
   },
   {
    "h2": "Povezani alati i vodiči",
    "ps": [
     "O tome kako izgraditi tablicu pojmova i kako je održavati kroz sezonu pogledajte [[Tablice pojmova: održavanje dosljednosti sezone|/guides/subtitle-glossary.html]]; ako je sadržaj neuredan (vodeni žigovi, SDH blokovi), najprije pokrenite [[Čišćenje titlova|/clean.html]]; kada su imena usklađena i trebaju vam drugi jezici, idite na [[Prevođenje titlova|/translate.html]]; a rezultat provjerite kroz [[Kontrolu kvalitete titlova|/qc.html]]."
    ]
   }
  ]
 },
 "hanconv": {
  "seo": {
   "title": "Pretvorba pojednostavljenog i tradicionalnog kineskog – Tajvan vs Hong Kong – AI-SRTSub",
   "desc": "Pregled devet smjerova: tajvanski s regionalnim rječnikom ili bez njega, Hong Kong kao poseban stil i mogućnost povratka na pojednostavljeni. Mijenja se samo dijalog; vremenske oznake ostaju.",
   "h1": "Kako pretvoriti titlove na pojednostavljenom i tradicionalnom kineskom pismu",
   "intro": "Slanje titlova na Tajvan, u Hong Kong ili na kopno mijenja i izbor riječi i oblike znakova. Na raspolaganju je devet smjerova, a pretvara se samo dijalog — vremenske oznake, brojevi redaka i linije stila za ASS nikada se ne diraju.",
   "ctaText": "Otvori pretvarač"
  },
  "body": [
   {
    "h2": "Što ovaj alat radi",
    "ps": [
     "Pretvorba između pojednostavljenog i tradicionalnog pisma nije samo drukčije pisanje pojedinih znakova. Isto pojednostavljeno značenje odgovara različitim riječima u različitim regijama — riječ za „softver” razlikuje se između Tajvana i kopna, a Hong Kong ima još jednu verziju. Pretvarač ih drži odvojenima:"
    ]
   },
   {
    "h2": "Učitavanje i prepoznavanje",
    "ps": [
     "Povucite datoteku ili je potražite — podržani su formati SRT, VTT, ASS i TXT — ili zalijepite sadržaj titlova izravno u okvir. Format se automatski prepoznaje i prikazuje pokraj stavke „Prepoznati format”."
    ],
    "img": {
     "file": "hanconv-up",
     "alt": "Područje za učitavanje u pretvaraču: zona za ispuštanje i okvir za lijepljenje, s prepoznatim formatom iznad",
     "cap": "SRT / VTT / ASS / TXT, format se prepoznaje automatski"
    }
   },
   {
    "h2": "Odabir između devet smjerova",
    "ps": [
     "Devet smjerova pod stavkom „Pretvori u” dijeli se u tri skupine. **Pojednostavljeno → tradicionalno**: opće tradicionalno, tajvansko (promjena riječi), tajvansko (samo znakovi), Hong Kong. **Tradicionalno → pojednostavljeno**: opće, iz tajvanskog, iz Hong Konga. **Tradicionalno u tradicionalno**: tajvanski oblici, oblici za Hong Kong.",
     "Odabirom „tajvanskog rječnika” mijenja se i regionalni rječnik: riječ za „softver” postaje tajvanska, kao i riječ za „informacije”; „tajvanski znakovi” mijenjaju samo način pisanja znakova, a rječnik ostaje netaknut. Hong Kong je posve drukčiji slučaj i koristi drugu riječ za „softver”. Za povratak na pojednostavljeno upotrijebite donju skupinu — morate navesti iz kojeg tradicionalnog varijeteta dolazite jer tajvanski i hongkonški tekst idu različitim putevima natrag."
    ],
    "img": {
     "file": "hanconv-dir",
     "alt": "Kartica za pretvorbu: padajući izbornik odredišta s odabranom opcijom „Pojednostavljeno → tajvansko tradicionalno (promjena riječi)”",
     "cap": "Smjerovi se nalaze u padajućem izborniku „Pretvori u” unutar tri skupine; ova je opcija tajvanska s promjenama riječi"
    }
   },
   {
    "h2": "Rezultat i izvoz",
    "ps": [
     "Područje s rezultatom odmah prikazuje pretvoreni titl, uz traku sa statistikama koja pokazuje ukupan broj redaka i broj promijenjenih redaka. Ako se ništa nije promijenilo, dobit ćete obavijest da datoteka možda ne sadrži kineske znakove — pretvaraju se samo kineski znakovi, pa titl koji sadrži samo slova latinične abecede ili brojeve ostaje nepromijenjen.",
     "Zatim preuzmite ili kopirajte sadržaj. Jezična oznaka umeće se u naziv datoteke — `demo.srt` postaje `demo.zh-TW.srt` za tajvanski tradicionalni, `.zh-Hant` za opći tradicionalni i `.zh-Hans` kod povratka na pojednostavljeni."
    ],
    "img": {
     "file": "hanconv-out",
     "alt": "Područje s rezultatom: pretvoreni titl i traka sa statistikama",
     "cap": "Traka sa statistikama prikazuje ukupan broj redaka i broj promijenjenih redaka; ovdje možete preuzeti ili kopirati tekst"
    }
   },
   {
    "h2": "Što se nikada ne dira",
    "ps": [
     "Pretvara se samo dijalog. Vremenske oznake, brojevi redaka i linije stila za ASS uopće se ne diraju — rezultat je spreman za upotrebu bez ponovnog oblikovanja."
    ]
   },
   {
    "h2": "Često postavljana pitanja",
    "ps": [
     "**Zašto pretvarač nije promijenio riječ za „čisto”?** Preslikavanja s jednog na više elemenata rješavaju se prema riječi: značenje „čisto” i značenje „suho” dijele jedan tradicionalni oblik, dok značenje „deblo” koristi drugi oblik. Tablice preuzete iz projekta OpenCC usklađuju cijele fraze, a ne pojedinačne znakove.",
     "**Koja je razlika između tajvanskog i hongkonškog tradicionalnog pisma?** Rječnik: riječ za „softver” razlikuje se između njih. Odaberite smjer za regiju u koju isporučujete sadržaj.",
     "**Broj znakova promijenio se nakon pretvorbe?** Mijenjaju se samo kineski znakovi — nijedan unos nije dodan ni uklonjen, niti je pomaknuto vrijeme. Ako se broj redaka promijenio, provjerite je li format ispravno prepoznat.",
     "**Rječnik se nije uspio učitati?** Stranica vas upućuje da osvježite stranicu i pokušate ponovno. Učitava se lokalno, stoga nije potrebno nigdje učitavati titlove."
    ]
   },
   {
    "h2": "Privatnost",
    "ps": [
     "Pretvorba se odvija u potpunosti u vašem pregledniku. Sadržaj titlova nikada se ne šalje na poslužitelj."
    ]
   },
   {
    "h2": "Povezani alati i vodiči",
    "ps": [
     "Ako vam je potrebno samo pretvaranje pojednostavljenog u tradicionalno pismo, pogledajte [[Pretvaranje pojednostavljenih titlova u tradicionalne|/guides/srt-simplified-to-traditional.html]]; zašto je riječ o nečemu višem od obične zamjene znakova saznajte u [[Pojednostavljeni vs tradicionalni nisu samo zamjena znakova|/guides/simplified-traditional-chinese.html]]; za prijevod na drugi jezik posjetite [[Prevođenje titlova|/translate.html]]."
    ]
   }
  ]
 },
 "how-to-make-lrc-file": {
  "seo": {
   "title": "Kako sinkronizirati stihove u LRC-u – Jedan redak po stihu, kuckajte u ritmu – AI-SRTSub",
   "desc": "Izradite LRC datoteku od nule: zalijepite jedan stih po retku, zabilježite vrijeme dok slušate, koristite važne prečace, preskočite redak kad je potrebno, odaberite LRC ili SRT i riješite odstupanja vremena.",
   "h1": "Kako sinkronizirati LRC stihove",
   "intro": "LRC datoteka sastoji se od „jednog retka stihova i jedne vremenske točke”. Izrada takve datoteke naziva se sinkronizacijom: bilježenjem trenutka u kojem svaki redak započinje.",
   "ctaText": "Otvori alat za sinkronizaciju stihova"
  },
  "body": [
   {
    "h2": "Što sinkronizacija zapravo jest",
    "ps": [
     "Struktura LRC datoteke teško može biti jednostavnija: jedan stih po retku, a svakom prethodi vremenska oznaka `[mm:ss.xx]`. Kada uređaj za reprodukciju dođe do tog retka, u tom trenutku prikazuje stih.",
     "Stoga se cijeli posao „izrade LRC-a” svodi na dodjeljivanje vremenske točke svakom retku stihova — a nijedan stroj to ne može obaviti umjesto vas jer je za odlučivanje o tome kada stih počinje potrebno slušanje."
    ]
   },
   {
    "h2": "Koliko je prolaza pjesmi potrebno",
    "ps": [
     "Vrijedi izdvojiti minutu razmišljanja prije početka jer se tako štedi većina naknadnog ispravljanja:"
    ],
    "img": {
     "file": "lrc-tap2",
     "alt": "Kontrole za reprodukciju, označavanje retka, poništavanje jednog retka i preskakanje retka u području za kuckanje",
     "cap": "Pritiskanje tipke Enter tijekom reprodukcije najglađe je rješenje; označili ste krivi redak? Pritisnite Z i označite ponovno"
    }
   },
   {
    "h2": "Lijepljenje stihova određuje glatkoću daljnjeg rada",
    "ps": [
     "Zalijepite stihove u obliku jednog stiha po retku; prazni retci se preskaču. Prijelomi redaka koje zalijepite bit će retci koje ćete kasnije sinkronizirati — ako ih sada razlomite na više redaka, kasnije ćete morati češće kuckati.",
     "Lijepljenje postojećeg LRC-a također funkcionira: njegove se vremenske oznake `[mm:ss.xx]` prepoznaju, a nakon uvoza **nastavljate od prvog retka bez vremena**, tako da već sinkronizirane retke ne morate ponovno raditi.",
     "To znači da se poludovršeni LRC može spremiti i kasnije ponovno zalijepiti kako biste nastavili."
    ],
    "img": {
     "file": "lrc-paste2",
     "alt": "Područje za lijepljenje stihova i gumb za raščlanjivanje stihova",
     "cap": "Jedan redak po stihu; lijepljenje cijelog LRC-a čita postojeća vremena kako biste mogli nastaviti"
    }
   },
   {
    "h2": "Izvoz u LRC ili SRT",
    "ps": [
     "**Za glazbeni uređaj izvezite LRC.** foobar2000, razni svirači i uređaji s prikazom stihova čitaju ga.",
     "**Za stavljanje stihova na video ili daljnju obradu izvezite SRT.** Videotrake sa titlovima, alati za titlove i softver za uređivanje čitaju SRT. Pri izvozu svaki redak traje dok ne počne sljedeći, a posljednji redak vraća se na zadano trajanje od 2 sekunde.",
     "Oba formata izvoze samo retke koji imaju dodijeljeno vrijeme — preskočeni retci nikada ne ulaze u datoteku."
    ],
    "img": {
     "file": "lrc-export",
     "alt": "Gumbi za preuzimanje LRC-a, preuzimanje SRT-a i kopiranje u području izvoza",
     "cap": "LRC za svirače, SRT za video; izvoze se samo retci s vremenskom oznakom"
    }
   },
   {
    "h2": "Nekoliko stvari koje je lako pogriješiti",
    "ps": [
     "**Sve je malo pomaknuto nakon sinkronizacije? Upotrijebite odmak.** Izvezite SRT i pomaknite ga u cijelosti pomoću opcije [[Prilagodba vremenske trake|/shift.html]]; to je daleko brže nego ponovno sinkronizirati redak po redak.",
     "**Odstupanje raste kako pjesma odmiče? To je problem brzine.** Kada se brzina reprodukcije i brzina snimanja razlikuju, pogreška raste prema kraju i za to je potrebna proporcionalna promjena razmjera, a ne običan odmak.",
     "**Prečaci djeluju prirodno samo ako ih koristite zajedno.** Razmaknica pokreće i pauzira, Enter označava trenutačni redak, Z poništava jedan redak — pritisnite Enter izravno tijekom reprodukcije umjesto prebacivanja između miša i tipkovnice.",
     "**Kvaliteta zvuka utječe na preciznost.** Izvornik s jasnim vokalima lakše je pratiti; koncertne snimke i izvori s glasnom pozadinskom glazbom primjetno su teži."
    ]
   },
   {
    "h2": "Povezani alati i vodiči",
    "ps": [
     "Za cjeloviti vodič pogledajte [[Kako koristiti alat za sinkronizaciju stihova|/guides/lrc.html]]; za pretvaranje postojećeg LRC-a u titlove pogledajte [[LRC u SRT|/guides/lrc-to-srt.html]]; ako izvezeni SRT ima pogrešno vrijeme, upotrijebite [[Prilagodba vremenske trake|/shift.html]]; a rezultat provjerite pomoću [[Kontrola kvalitete titlova|/qc.html]]."
    ]
   }
  ]
 },
 "lrc": {
  "seo": {
   "title": "Alat za sinkronizaciju stihova – Učitajte pjesmu, zalijepite stihove, kuckajte u ritmu – AI-SRTSub",
   "desc": "Učitajte pjesmu, zalijepite stihove, zabilježite vremensku oznaku za svaki redak dok slušate i izvezite LRC ili SRT. Razmaknica pokreće i pauzira, Enter označava redak, Z poništava, a ruke ostaju na tipkovnici.",
   "h1": "Kako koristiti alat za sinkronizaciju stihova",
   "intro": "Učitajte pjesmu, zalijepite stihove, zabilježite vremensku oznaku za svaki redak dok slušate i izvezite standardni LRC ili SRT. Zvuk se reproducira lokalno i nikada se ne učitava na poslužitelj.",
   "ctaText": "Otvori alat za sinkronizaciju stihova"
  },
  "body": [
   {
    "h2": "Što ovaj alat radi",
    "ps": [
     "Omogućuje da pjesma dobije datoteku stihova uz koju se može pjevati: jedan redak po stihu, pri čemu svaki redak sadrži vremensku točku. Uređaji za reprodukciju čitaju LRC, zapisi titlova čitaju SRT, a oba formata mogu se izvesti ovdje."
    ]
   },
   {
    "h2": "1 Učitavanje pjesme",
    "ps": [
     "Prvi stupac s lijeve strane služi za unos zvučne datoteke: podržani su formati **MP3, M4A, FLAC, WAV i OGG**. Zvuk se reproducira lokalno i nikada se ne učitava.",
     "Kvaliteta zvuka ne utječe na točnost sinkronizacije, ali izvor s jasnim vokalima lakše je pratiti; koncertne snimke i izvori s glasnom pozadinskom glazbom primjetno se teže sinkroniziraju."
    ],
    "img": {
     "file": "lrc-up",
     "alt": "Područje za učitavanje pjesme u alatu za sinkronizaciju stihova",
     "cap": "Podržani su formati MP3 / M4A / FLAC / WAV / OGG, a zvuk se reproducira isključivo lokalno"
    }
   },
   {
    "h2": "2 Lijepljenje stihova",
    "ps": [
     "Zalijepite stihove u drugi stupac, **jedan redak po stihu**; prazni retci automatski se preskaču. Zatim kliknite na „Raščlani stihove”.",
     "Lijepljenje postojećeg LRC-a također funkcionira — njegove se vremenske oznake `[mm:ss.xx]` prepoznaju, a nakon uvoza nastavljate od prvog retka bez vremena, tako da već sinkronizirane retke ne morate ponovno obrađivati."
    ],
    "img": {
     "file": "lrc-paste",
     "alt": "Područje za lijepljenje stihova i gumb za raščlanjivanje stihova",
     "cap": "Zalijepite jedan redak po stihu ili umetnite cijeli LRC kako bi alat pročitao postojeća vremena"
    }
   },
   {
    "h2": "3 Kuckanje u ritmu dok slušate",
    "ps": [
     "Pustite pjesmu i pritisnite Enter u trenutku kada redak započne (ili kliknite na „Označi ovaj redak”); vrijeme za taj redak bit će zabilježeno, a pokazivač će preći na sljedeći.",
     "Prečaci: **razmaknica** pokreće i pauzira, **Enter** označava trenutačni redak, **Z** poništava jedan redak. Pritiskanje tipke Enter tijekom reprodukcije najglađi je način rada — nema prebacivanja između miša i tipkovnice.",
     "Označili ste krivi redak? Pritisnite Z kako biste ga poništili i označili ponovno. Ako uopće ne želite označiti neki redak (instrumentalni prijelaz, čisto glazbeni dio), kliknite na „Preskoči ovaj redak” i on se neće pojaviti u izvozu."
    ],
    "img": {
     "file": "lrc-tap",
     "alt": "Kontrole za reprodukciju, označavanje retka, poništavanje jednog retka i preskakanje retka u području za kuckanje",
     "cap": "Razmaknica pokreće i pauzira, Enter označava trenutačni redak, Z poništava — ruke ostaju na tipkovnici"
    }
   },
   {
    "h2": "4 Izvoz",
    "ps": [
     "Četvrti stupac služi za izvoz: **Preuzmi LRC** za svirače, **Preuzmi SRT** za videozapise sa zapisima titlova ili „Kopiraj” za izravno preuzimanje teksta.",
     "Izvoze se samo retci s vremenskom oznakom; preskočeni retci nikada ne ulaze u datoteku. U izvozu u formatu SRT svaki redak traje sve dok ne počne sljedeći, a posljednji redak vraća se na zadano trajanje od 2 sekunde."
    ],
    "img": {
     "file": "lrc-out",
     "alt": "Gumbi za preuzimanje LRC-a, preuzimanje SRT-a i kopiranje u području izvoza",
     "cap": "LRC za svirače, SRT za video; izvoze se samo retci s vremenskom oznakom"
    }
   },
   {
    "h2": "Što ostaje netaknuto",
    "ps": [
     "Tekst stihova se ne prepisuje. Sinkronizacija samo dodaje jednu vremensku točku po retku i nikada ne dira riječi koje ste zalijepili.",
     "Kada uvozite postojeći LRC, retci koji već sadrže vremensku oznaku zadržavaju svoje izvorno vrijeme, a označavanje započinjete tek od prvog nesinkroniziranog retka nadalje."
    ]
   },
   {
    "h2": "Često postavljana pitanja",
    "ps": [
     "**Zašto neki retci nedostaju u izvozu?** Preskočeni retci i retci bez vremenske oznake nikada ne ulaze u datoteku. Vratite se na treći korak i dodajte ih ili potvrdite da su namjerno preskočeni.",
     "**Mogu li se vremena naknadno promijeniti?** Ako nakon označavanja želite malo pomaknuti sve, izvezite SRT i upotrijebite opciju [[Prilagodba vremenske trake|/shift.html]] kako biste ga pomaknuli ili prilagodili u cijelosti.",
     "**LRC ili SRT — što trebam izvesti?** LRC za glazbene svirače (foobar2000, klijente za streaming, razne reproduktore); SRT kada se stihovi moraju prikazati na videozapisu ili dodatno obraditi alatima za titlove.",
     "**Koliko dugo traje obrada jedne pjesme?** Ovisi o broju redaka i tome koliko precizni želite biti. Za pjesmu s trideset ili četrdeset redaka, uz poznavanje ritma potrebno je nekoliko minuta po prolazu; postizanje preciznosti na razini pojedinačnih riječi traje duže."
    ]
   },
   {
    "h2": "Privatnost",
    "ps": [
     "Zvuk i stihovi obrađuju se u potpunosti unutar preglednika: ništa se ne učitava i ništa ne prolazi kroz poslužitelj. Zvuk se dekodira i reproducira isključivo lokalno."
    ]
   },
   {
    "h2": "Povezani alati i vodiči",
    "ps": [
     "Ako već imate LRC datoteku i želite titlove, pogledajte [[LRC u SRT|/guides/lrc-to-srt.html]]; o razmišljanjima i zamkama koje stoje iza sinkronizacije saznajte u članku [[Kako sinkronizirati stihove u LRC-u|/guides/how-to-make-lrc-file.html]]; ako je izvezeni SRT pomaknut, upotrijebite [[Prilagodba vremenske trake|/shift.html]]; a rezultat provjerite pomoću alata [[Kontrola kvalitete titlova|/qc.html]]."
    ]
   }
  ]
 },
 "lrc-to-srt": {
  "seo": {
   "title": "Pretvarač LRC u SRT – Pretvorite stihove u titlove – AI-SRTSub",
   "desc": "Pretvorite LRC stihove u SRT titlove: svaki redak traje do početka sljedećeg, a posljednji redak dobiva 3 sekunde. Snimke dulje od 60 minuta ispravno se čitaju. Pokreće se u pregledniku.",
   "h1": "LRC u SRT",
   "intro": "Pretvorite LRC datoteke stihova u SRT: ispustite datoteku, odaberite SRT i preuzmite. Vremena završetka automatski se popunjavaju iz sljedećeg retka.",
   "ctaText": "Pretvori LRC → SRT"
  },
  "body": [
   {
    "h2": "Po čem se LRC razlikuje od SRT-a",
    "ps": [
     "LRC je format stihova: svaki redak sadrži samo vrijeme „početka pjevanja” u obliku `[minute:sekunde.stotinke]` i **nema vrijeme završetka**; svaki SRT zapis zahtijeva i početak i kraj. Stoga je srž pretvorbe popunjavanje vremena završetka."
    ],
    "img": {
     "file": "convert-upload-lrc",
     "alt": "Područje za učitavanje: učitana LRC datoteka, prepoznata kao LRC",
     "cap": "Datoteka stihova s vremenskim oznakama [00:12.50] odmah se prepoznaje kao LRC"
    }
   },
   {
    "h2": "Kako se popunjavaju vremena završetka",
    "ps": [
     "Pravilo je jednostavno: **svaki redak traje dok ne počne sljedeći**; posljednji redak nema „sljedeći”, stoga dobiva 3 sekunde. Također, LRC vremenske oznake sadrže samo minute i sekunde — bez sati — a polje minuta ne prenosi se dalje (62:05 znači 1 sat, 2 minute i 5 sekundi), tako da se iznimno dugi zapisi poput DJ mikseva ispravno čitaju."
    ]
   },
   {
    "h2": "Kako izvršiti pretvorbu",
    "ps": [
     "Otvorite [[pretvarač|/convert.html]], ubacite LRC datoteku, odaberite **SRT - SubRip** kao izlazni format, a zatim pokrenite pretvorbu i preuzmite datoteku. Korisno za glazbene spotove i za postavljanje stihova kao titlova u uređajima za reprodukciju; izvezeni se SRT može ponovno pretvoriti u VTT za web."
    ]
   }
  ]
 },
 "make-bilingual-subtitles": {
  "seo": {
   "title": "Dva načina izrade dvojezičnih titlova – AI-SRTSub",
   "desc": "Dvojezični titlovi dolaze u dva oblika: dva retka u jednom zapisu ili dva zapisa na istoj vremenskoj traci. Prednosti, nedostaci i načini prebacivanja. – AI-SRTSub",
   "h1": "Dva načina izrade dvojezičnih titlova",
   "intro": "Isti dvojezični titl može skrivati dva potpuno različita rasporeda. Naučite ih razlikovati, pa će vam izrada, dijeljenje i pretvorba postati jednostavniji.",
   "ctaText": "Radi s dvojezičnim titlovima"
  },
  "body": [
   {
    "h2": "Kako izgledaju ta dva oblika",
    "ps": [
     "**Oblik B: dva zapisa na istoj vremenskoj traci.** Jedan redak dijaloga postaje dva zasebna zapisa titlova s identicalnim vremenskim oznakama — jedan na engleskom, jedan na kineskom — složena jedan iznad drugoga. To je najčešći način izrade dvojezičnih ASS titlova."
    ]
   },
   {
    "h2": "Gdje svaki oblik ima nedostatke",
    "ps": [
     "Slabost Oblika A jest **prepoznavanje**: razdvajanje zapisa oslanja se na pisano pismo, pa se parovi kineskog i engleskog ili japanskog i engleskog jezika lako razdvajaju na prvi pogled, dok se **kombinacije koje dijele isto pismo** — engleski i francuski, ili kineski i japanski kanji — ne mogu razlikovati. Slabost Oblika B jest **izrada**: dvije vremenske trake moraju se u potpunosti podudarati, a ručno usklađivanje je naporno; neki uređaji za reprodukciju također iscrtavaju oba zapisa s iste vremenske trake, što pretrpava zaslon. Pravilo palca: upotrijebite Oblik A za završne titl-zapise namijenjene gledateljima; upotrijebite Oblik B kada trebate odvojiti zapise za daljnju obradu."
    ]
   },
   {
    "h2": "Dva smjera",
    "ps": [
     "**Izrada dvojezičnih titlova iz izvornika**: upotrijebite [[AI Prevođenje titlova|/translate.html]] i pri izvozu odaberite „Dvojezično · izvorno na vrhu” ili „Dvojezično · prijevod na vrhu” — odmah dobivate Oblik A; odabirom ASS-a također se nude dva rasporeda, „složeno gore i dolje” i „dva retka na dnu”.",
     "**Spajanje dvaju zapisa ili pretvorba između oblika**: upotrijebite [[Uklanjanje dvojezičnosti u titlovima|/bilingual.html]] i njegov način rada „spoji u jedan unos s dva retka” — unutra ide Oblik B, van izlazi Oblik A; krećući se u suprotnom smjeru, „podijeli u dvije datoteke” uzima Oblik A ili B na ulazu i daje dva neovisna zapisa na izlazu."
    ],
    "img": {
     "file": "bilingual-modes",
     "alt": "Četiri načina rada alata za dvojezične titlove; „spoji u jedan unos s dva retka” spaja dva zapisa koja dijele vremensku traku",
     "cap": "„Spoji u jedan unos s dva retka”: Oblik B postaje Oblik A"
    }
   },
   {
    "h2": "Koji će uređaj reproducirati titlove",
    "ps": [
     "Web uređaji za reprodukciju (HTML5 ``) i većina mobilnih uređaja pouzdanije obrađuju Oblik A; stolni uređaji (VLC, mpv, PotPlayer) prihvaćaju oba i mogu čak dodijeliti različite boje i položaje dvama zapisima na istoj vremenskoj traci. Kada ste u nedoumici, izvezite Oblik A kao SRT — to je najpouzdanija opcija. Više o razlikama između samih formata potražite u članku [[SRT, VTT ili ASS: Što biste trebali koristiti|/guides/subtitle-format-comparison.html]]."
    ],
    "img": {
     "file": "translate-export",
     "alt": "Mogućnosti dvojezičnog stila na upravljačkoj ploči alata za prevođenje",
     "cap": "Odaberite redoslijed dvojezičnih redaka izravno pri izvozu — jedan korak i sve je gotovo"
    }
   },
   {
    "h2": "Često postavljana pitanja",
    "ps": [
     "**Dvojezični titlovi izgledaju pretrpano — što mogu učiniti?** Kontrolirajte širinu redaka: upravljačka ploča alata za prevođenje sadrži postavku „širina dvojezičnog retka”; uži redak znači manje znakova po zapisu i čišći zaslon.",
     "**Želim samo jedan zapis.** Alat za uklanjanje dvojezičnosti s opcijom „zadrži samo izvornik / zadrži samo prijevod” rješava to jednim klikom, pogledajte vodič [[Podjela dvojezičnih titlova u dva zapisa|/guides/split-bilingual-subtitles.html]]."
    ]
   }
  ]
 },
 "merge": {
  "seo": {
   "title": "Spajanje dvojezičnih titlova i stilova – AI-SRTSub",
   "desc": "Spojite dvije datoteke titlova u dvojezični zapis, prilagodite postojeći ili stilizirajte jednojezični titl: načini uparivanja, ASS i VTT predlošci te izvoz.",
   "h1": "Kako koristiti dvojezično spajanje i titlove s posebnim efektima",
   "intro": "Kombinirajte dvije datoteke titlova u jedan dvojezični zapis ili izravno uredite stil titlova: font, boja, obrub i položaj funkcioniraju po principu ono što vidiš to i dobiješ, a pretpregled odgovara izvozu.",
   "ctaText": "Otvorite alat za titlove s posebnim efektima"
  },
  "body": [
   {
    "h2": "Što ovaj alat radi",
    "ps": [
     "Ova stranica zapravo pokriva tri zadatka: spajanje izvorne i prevedene datoteke titlova u jednu dvojezičnu datoteku, prilagodbu redoslijeda i stila datoteke koja je već dvojezična te dodavanje posebnih efekata jednojezičnoj datoteci. Sva tri dijele iste parametre stila i isti pretpregled."
    ]
   },
   {
    "h2": "Tri zadatka, jedna stranica",
    "ps": [
     "Na vrhu stranice nalaze se tri kartice: **Spoji dvije datoteke**, **Prilagodi dvojezičnu datoteku**, **Jednojezična datoteka**. Vaš izbor određuje koliko se ulaznih stupaca pojavljuje s lijeve strane.",
     "Prilikom spajanja dviju datoteka, lijeva strana sadrži dva stupca, \"1 Originalni titlovi\" i \"2 Prevedeni titlovi\"; svaki prihvaća prenesenu datoteku ili izravno zalijepljen tekst. Prilagodba dvojezične datoteke i stiliziranje jednojezične datoteke trebaju samo po jedan stupac."
    ],
    "img": {
     "file": "merge-mode",
     "alt": "Tri kartice na vrhu alata za titlove s posebnim efektima i područje unosa s lijeve strane",
     "cap": "Tri kartice na vrhu; odabirom opcije \"Spoji dvije datoteke\" pojavljuju se izvorni i prevedeni stupac s lijeve strane"
    }
   },
   {
    "h2": "Kako se dvije datoteke uparuju",
    "ps": [
     "Prva stavka pod \"3 Postavke spajanja\" jest način uparivanja: **Upari prema redoslijedu · koristi izvornu vremensku traku**, **Upari prema vremenskoj traci · koristi izvornu vremensku traku**, **Upari prema redoslijedu · koristi prevedenu vremensku traku**.",
     "Kada obje datoteke imaju isti broj unosa u istom redoslijedu, uparivanje prema redoslijedu je najsigurnije. Kada se brojevi razlikuju (jedna strana je spojila unose, druga ih je podijelila), uparite prema vremenskoj traci i dopustite alatu da ih uskladi prema blizini. Čiju vremensku traku koristiti ovisi o tome koja je datoteka točnija — obično izvorna.",
     "Ispod toga nalaze se struktura teksta (automatsko otkrivanje / dvije linije po unosu / izmjenjujući parovi) i redoslijed (izvornik gore / prijevod gore)."
    ],
    "img": {
     "file": "merge-pair",
     "alt": "Mogućnosti načina uparivanja, strukture teksta i redoslijeda pod postavkama spajanja",
     "cap": "Način uparivanja odlučuje koja linija ide s kojom, a ovdje se postavlja i čiju vremensku traku treba koristiti"
    }
   },
   {
    "h2": "Prilagodite stil stavku po stavku",
    "ps": [
     "Upravljačka ploča za stil nalazi se s desne strane. Prilikom izvoza u ASS primjenjuje se blok \"Izgled ASS\": izgled (razdvojeno · odvojeno gore i dolje / složeno · dvije linije na dnu), veličina, boja, neprozirnost, font, podebljano, kurziv, razmak između slova, obrub, boja obruba, sjena/pozadina (nema / sjena / pozadina), dubina, boja ruba, neprozirnost ruba, vodoravno poravnanje (dno · lijevo / dno · centrirano / dno · desno) i udaljenost od dna prijevoda (primarne) linije, plus font, sjena/pozadina i lijeve i desne margine izvorne (sekundarne) linije.",
     "Prilikom izvoza dvojezičnog WebVTT stila, primjenjuje se blok \"WebVTT stil\": povrh šest unaprijed postavljenih opcija (standardno / kompaktno / filmski / vrh / pristupačno / portretno) možete promijeniti okomitu liniju, sidro (dno / vrh / centar), vodoravni položaj, širinu, vrijednost poravnanja i visinu retka cijelog odsječka, plus boju pozadine, neprozirnost pozadine i širinu obruba linije prijevoda; izvorna linija može naslijediti glavni stil ili se postaviti zasebno.",
     "Kada završite, možete spremiti rezultat kao unaprijed postavljenu postavku i ponovno je koristiti kasnije tako da je odaberete pod \"Iz spremljenih predložaka\" i kliknete \"Primijeni\"."
    ],
    "img": {
     "file": "merge-style",
     "alt": "Parametri upravljačke ploče za ASS izgled s desne strane",
     "cap": "Veličina, boja, obrub, sjena/pozadina i poravnanje mogu se prilagoditi, a rezultat se može spremiti kao predložak"
    }
   },
   {
    "h2": "Provjerite pretpregled prije izvoza",
    "ps": [
     "\"Pretpregled spajanja\" je tablica: #, vrijeme, izvornik, prijevod, stil. Traka iznad filtrira sumnjive retke prema kriterijima \"ima zvučne efekte\", \"ima prefiks govornika\", \"kraće od 1 sekunde\", \"više od dvije linije\" i \"premašena brzina čitanja\" ili prema ključnoj riječi koju upišete.",
     "Klikom na polje stila u retku proširuje se uređivač tog polja i prikazuju se samo retci koji ga koriste; vraća svaku ručnu izmjenu na predložak. Područje prilagodbe vremenske trake ispod upravlja globalnim pomakom (od određenog odsječka) i proporcionalnim skaliranjem.",
     "Kada sve izgleda dobro, idite na \"4 Izvoz\": preuzmite datoteku titlova ili kopirajte njezin sadržaj."
    ],
    "img": {
     "file": "merge-preview",
     "alt": "Tablica pretpregleda spajanja i njezina traka filtera",
     "cap": "Pretpregled je ujedno i izvoz; filtrirajte sumnjive retke prema vrsti ili proširite jedno polje stila"
    }
   },
   {
    "h2": "Što ostaje netaknuto",
    "ps": [
     "Stiliziranje mijenja samo izgled, nikada dijalog. Tekst izvornika i prijevoda nije izmijenjen ni za jedan znak tijekom spajanja; osim ako ga namjerno ne promijenite u području prilagodbe ispod pretpregleda, vremenska traka dolazi iz datoteke koju ste odabrali.",
     "Kada izvozite SRT ili \"VTT bez stiliziranja\", u datoteku se ne zapisuju nikakve informacije o stilu — stranica vas obavještava da VTT nema blok STYLE i da će reproduktor koristiti zadani izgled. Ako želite stiliziranje, odaberite dvojezični WebVTT stil ili ASS."
    ]
   },
   {
    "h2": "Često postavljana pitanja",
    "ps": [
     "**Što ako dvije datoteke imaju različit broj unosa?** Upotrijebite \"Upari prema vremenskoj traci\" i alat će ih uskladiti prema blizini; unosi koje ne može uskladiti se ne izmišljaju.",
     "**Što ako reproduktor ignorira stil u izvezenom ASS-u?** Stilovi su pohranjeni unutar datoteke, ali podrška reproduktora za ASS varira. Ako trebate prenosiviji izgled, izvezite dvojezični WebVTT stil.",
     "**Kako se vratiti na početni predložak nakon što ste ga izmijenili?** \"Vrati zadane parametre\" u ASS bloku i \"Vrati zadane postavke predloška\" u VTT bloku ponovno postavljaju svaki svoj dio.",
     "**Što predstavlja sedam redaka u uzorku?** Oni su ugrađeni primjer, tu su samo da vidite kako spajanje izgleda; uzorak se ne može izvesti. Prenesite vlastite titlove, kliknite pretpregled spajanja i oni će se automatski zamijeniti."
    ]
   },
   {
    "h2": "Privatnost",
    "ps": [
     "Titlovi se obrađuju u potpunosti u pregledniku: ništa se ne prenosi i ništa ne prolazi kroz poslužitelj. Zatvorite preglednik i sve iz te sesije nestaje."
    ]
   },
   {
    "h2": "Povezani alati i vodiči",
    "ps": [
     "Za razdvajanje dvojezične datoteke natrag u dvije staze koristite [[Dvojezično razdvajanje|/bilingual.html]]; za obrnut proces pretvaranja jednojezične datoteke u dvojezičnu pogledajte [[Dva načina izrade dvojezičnih titlova|/guides/make-bilingual-subtitles.html]]; provjerite rezultat kroz [[Kontrola kvalitete titlova|/qc.html]]; za cijelu sezonu odjednom koristite [[Grupna konverzija|/batch.html]]."
    ]
   }
  ]
 },
 "qc": {
  "seo": {
   "title": "Kako koristiti kontrolu kvalitete titlova – Provjera vremenske trake i izgleda – AI-SRTSub",
   "desc": "Kontrola kvalitete titlova: 17 pravila otkriva preklapanja, širinu retka, brzinu čitanja i interpunkciju, pragske vrijednosti za 27 jezika. Polovica su popravci jednim klikom; preuzmite izvješće.",
   "h1": "Kako koristiti kontrolu kvalitete titlova",
   "intro": "Prije nego što predate titl, provjerite ga na stranici za kontrolu kvalitete u svrhu provjere vremena i izgleda: što se provjerava, kako čitati izvješće i koji se problemi mogu riješiti jednim klikom — sve je obuhvaćeno ovdje.",
   "ctaText": "Otvorite kontrolu kvalitete titlova"
  },
  "body": [
   {
    "h2": "Čemu služi ovaj alat",
    "ps": [
     "Titlovi koji na prvi pogled izgledaju u redu često imaju preklapajuće vremenske trake, pretjerano široke retke ili preveliku brzinu čitanja nakon isporuke. Stranica za kontrolu kvalitete popisuje ove probleme jedan po jedan:"
    ]
   },
   {
    "h2": "Prvo odaberite jezična pravila",
    "ps": [
     "Pod „Provjeri prema pravilima kojeg jezika” postavljate pet pragova: **maksimalnu širinu jednog retka** (zadano 42 polovične jedinice za vodoravni prikaz, 36 za kvadratni, 28 za okomiti), **ograničenje brzine čitanja** (18 jedinica širine u sekundi za kineski, japanski i korejski, 20 za ostale jezike), **minimalno trajanje od 833 milisekunde**, **maksimalno trajanje od 7000 milisekundi** i **najviše 2 retka**. Postavite jezik titla na automatsko otkrivanje ili ručno odaberite jedan od 27 jezika; orijentacija zaslona mijenja samo razinu širine retka — brzina čitanja, trajanja i broj redaka ostaju neizmijenjeni. Polovične jedinice zajednička su mjera: jedan znak (hanzi) računa se kao 2, jedno latinično slovo kao 1 — širina retka od 42 jednaka je 21 znaku (hanzi) ili 42 slova."
    ],
    "img": {
     "file": "qc-rules",
     "alt": "Postavke kontrole kvalitete: pet polja za unos praga plus padajući izbornici za jezik titla i orijentaciju zaslona",
     "cap": "Pet pragova + jezik + orijentacija; zadane vrijednosti odgovaraju uobičajenoj industrijskoj praksi"
    }
   },
   {
    "h2": "Čitanje izvješća",
    "ps": [
     "Izvješće s 17 pravila navodi nalaze na tri razine: **pogreške** (iskvaren tekst, format vremenske oznake, završetak prije početka, neispravno numeriranje), **upozorenja** (prazni unosi, preklapanja, prekratka ili preduga trajanja, brzina čitanja iznad ograničenja, pretjerano široki reci, više od dva retka) i **savjeti** (položaj prijelaza retka, vodeći ili prateći razmaci, nedostajući razmaci, norme interpunkcije i još mnogo toga). Svaki nalaz sadrži broj unosa i pojedinost „izmjereno X, prag Y”, a popis se može filtrirati prema razini. Dvojezični unosi ostvaruju izuzeća: oba oblika se automatski otkrivaju, provjere preklapanja izuzimaju cijeli par, a brzina čitanja računa samo redak napisan na ciljnom jeziku."
    ],
    "img": {
     "file": "qc-report",
     "alt": "Područje izvješća kontrole kvalitete: nalazi grupirani po pogreškama, upozorenjima i savjetima, svaki s brojem unosa i izmjerenom vrijednošću",
     "cap": "Trorazinsko izvješće: svaki nalaz nosi svoj broj unosa i izmjerene/granične vrijednosti"
    }
   },
   {
    "h2": "Popravljanje i izvoz",
    "ps": [
     "Kartica „Popravi i izvezi” navodi samo **automatski ispravljive** stavke: ponovno prelamanje redaka, uklanjanje praznih unosa, dodavanje nedostajućih razmaka, zamjenu interpunkcije prema jezičnim normama, ponovno numeriranje — sve što vremenski raspored ostavlja netaknutim označeno je prema zadanim postavkama; **stavke koje mijenjaju vremenski raspored** (zamjena početka i kraja, pomicanje preklapanja, skraćivanje ili rastezanje trajanja) nisu označene prema zadanim postavkama — označite ih nakon što sami provjerite utjecaj. Kliknite „Primijeni popravke” i automatski se pokreće nova provjera; brojač broji samo ono što je doista popravljeno — reci koji se nisu mogli ponovno prelomiti ne uvećavaju brojeve. **Brzina čitanja iznad ograničenja nema automatski popravak**: stroj ne može znati koju riječ skratiti, pa se prijevod mora skratiti ručno ili prilagoditi vremenski raspored. Nakon popravka izvezite SRT ili VTT, ili kliknite „Preuzmi izvješće” kako biste spremili izvješće u običnom tekstualnom formatu `.qc.txt`."
    ],
    "img": {
     "file": "qc-fix",
     "alt": "Kartica za popravak: potvrdni okvir za automatski ispravljive stavke i gumb Primijeni popravke",
     "cap": "Na popis ulaze samo automatski ispravljive stavke; popravci koji mijenjaju vrijeme nisu označeni prema zadanim postavkama"
    }
   },
   {
    "h2": "Često postavljana pitanja",
    "ps": [
     "**Zašto se moj ASS ne može izvesti?** Kontrola kvalitete izvozi samo SRT i VTT; ASS ulazi, ali ne izlazi. Kako biste zadržali ASS efekte, unaprijed razmislite o tome u [[Pretvarač formata|/convert.html]].",
     "**Što znači brzina čitanja 18?** Za kineski, japanski i korejski ograničenje je 9 znakova pune širine u sekundi (18 polovičnih jedinica); ostali jezici dobivaju 20 polovičnih jedinica u sekundi. To su uobičajene razine udobnosti, a polje za unos omogućuje vam njihovu promjenu.",
     "**Kodiranje moje datoteke je oštećeno — može li se još uvijek provjeriti?** Kontrola kvalitete čita samo UTF-8; prvo popravite kodiranje na stranici za popravak iskvarenog teksta.",
     "**Hoće li dirati moju vremensku traku?** Sve dok grupu „mijenja vrijeme” ostavite neoznačenom, neće; čak i kada je označena, svaka se promjena jasno navodi prije primjene popravka."
    ]
   },
   {
    "h2": "Povezani vodiči",
    "ps": [
     "Titlovi koji prebrzo bljeskaju da bi se pročitali — pogledajte namjenski vodič [[Titlovi su prebrzi za čitanje|/guides/subtitle-too-fast.html]]. Što provjeriti prije isporuke — popis provjere nalazi se na [[Što provjeriti prije isporuke|/guides/subtitle-quality-check.html]]. Vremenska traka koja ispada iz sinkronizacije drugačija je vrsta problema — pogledajte [[Titlovi ispadaju iz sinkronizacije|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "remove-subtitle-ads": {
  "seo": {
   "title": "Uklonite reklame i vodene žigove iz titlova – AI-SRTSub",
   "desc": "Uklonite vodene žigove i reklame iz titlova: URL-ovi, zasluge fansub grupa i oznake kodiranja brišu se jednim klikom, uz dvostruke i prazne unose. – AI-SRTSub",
   "h1": "Uklonite reklame i vodene žigove iz titlova",
   "intro": "URL-ovi, zasluge i promidžbeni unosi skriveni u vašim titlovima čiste se u jednom prolazu prema pravilima čistača za vodene žigove — a svako pogrešno brisanje može se poništiti unos po unos.",
   "ctaText": "Očistite vodene žigove s titlova"
  },
  "body": [
   {
    "h2": "Što su ti vodeni žigovi",
    "ps": [
     "Titlovi preuzeti s interneta često imaju dodatne unose na početku ili kraju (ponekad i u sredini): URL-ove, adrese e-pošte, nazive fansub grupa, zasluge `encoded by` / `translated by`, nazive web-mjesta poput opensubtitles i retke poput „pratite naš WeChat račun” ili „samo u svrhu učenja”. To su uobičajeni unosi titlova — s vremenskom trakom, koji zauzimaju redak — tako da ih reproduktori ne mogu ukloniti; moraju se otkriti prema sadržaju."
    ]
   },
   {
    "h2": "Gdje to učiniti",
    "ps": [
     "Otvorite [[Čistač titlova|/clean.html]] i ispustite svoj titl; grupa „Vodeni žigovi i neželjeni unosi” već ima označene opcije „Ukloni vodene žigove i reklame”, „Ukloni dvostruke unose” i „Ukloni prazne unose” prema zadanim postavkama, a čišćenje počinje automatski. Detekcija radi na dvjema razinama: **čvrsti signali** poput URL-ova, e-pošte, fansub grupa i naziva web-mjesta brišu cijeli unos pri svakom podudaranju bez obzira na duljinu; **meki signali** poput @korisničkih imena ili zasluga „kodirano” / „lektorirano” procjenjuju se samo u kratkim unosima od najviše 40 znakova, kako bi se izbjeglo rezanje dugog dijaloga. Dvojezični unosi prvo se čiste od redaka vodenog žiga redak po redak dok se retci dijaloga zadržavaju; unos se briše u cijelosti samo ako tragovi vodenog žiga ostanu i nakon čišćenja."
    ],
    "img": {
     "file": "clean-opts",
     "alt": "Zaslon s opcijama čišćenja: tri potvrdna okvira grupe vodenih žigova i neželjenih unosa",
     "cap": "Grupa „Vodeni žigovi i neželjeni unosi” uključena je prema zadanim postavkama — nije potrebno ručno postavljanje"
    }
   },
   {
    "h2": "Pregled i izvoz",
    "ps": [
     "Na popisu promjena svaki izbrisani unos nosi oznaku „vodeni žig i reklama” — pregledajte ga kako biste potvrdili da ništa nije uklonjeno pogreškom; ako nešto izgleda pogrešno, kliknite „Vrati” kako biste ga vratili. Jednom kada je potvrđeno, preuzmite: naziv datoteke automatski dobiva oznaku `.clean`. Čišćenje se izvodi lokalno u vašem pregledniku; vaši se titlovi nikada nikamo ne šalju."
    ]
   }
  ]
 },
 "repair": {
  "seo": {
   "title": "Kako popraviti iskvarene titlove (mojibake) – Otkrijte kodiranje – AI-SRTSub",
   "desc": "Vodič: otkrijte izvorno kodiranje (GBK / Big5 / Shift_JIS / EUC-KR), rangirajte popravke prema onome što najviše nalikuje jeziku, a zatim spremite u UTF-8 s BOM-om ili GBK. Vremenski raspored i brojevi indeksa nikada se ne mijenjaju.",
   "h1": "Kako popraviti iskvarene titlove",
   "intro": "Datoteka s titlovima puna nasumičnih znakova rijetko je oštećena — samo je pročitana s krivim kodiranjem. Alat za popravak otkriva izvorno kodiranje i vraća prave znakove, ostavljajući brojeve indeksa i vremenski raspored netaknutima.",
   "ctaText": "Otvorite alat za popravak iskvarenih titlova"
  },
  "body": [
   {
    "h2": "Što ovaj alat radi",
    "ps": [
     "Isti bajtovi pročitani kao UTF-8 i pročitani kao GBK daju dva potpuno različita skupa znakova — datoteka nije oštećena, deodirana je s krivim kodiranjem. Evo što alat za popravak radi:"
    ]
   },
   {
    "h2": "Prenesite datoteku, nemojte je lijepiti",
    "ps": [
     "Dvije ulazne točke mogu popraviti različite količine oštećenja, stoga **prenesite datoteku ako možete**. S datotekom izvorni bajtovi su još uvijek tu: alat isprobava jedno kodiranje za drugim, a jednom kada prepozna GBK, dekodira ga kao GBK — ništa se ne mora nagađati. Tekst koji stigne lijepljenjem više nije sirovi bajt. Do trenutka kada preglednik preda niz znakova, pogreška se već dogodila, tako da alat može raditi samo unatrag i uzeti ono što može dobiti.",
     "Ako zalijepljeni tekst već sadrži znak za zamjenu (onaj upitnik u okviru ``), izvorni bajtovi su odavno nestali i ništa ih ne može vratiti. Stranica to jasno kaže: vratite se gore i upotrijebite \"Odaberi datoteku\" za prijenos izvornika."
    ],
    "img": {
     "file": "repair-up",
     "alt": "Područje prijenosa na stranici za popravak: zona za ispuštanje i polje za lijepljenje, s detektiranim kodiranjem prikazanim iznad",
     "cap": "Povucite datoteku unutra ili je potražite; polje za lijepljenje nalazi se ispod i može popraviti puno manje"
    }
   },
   {
    "h2": "Što vam dijagnoza govori",
    "ps": [
     "Nakon prijenosa, kartica s dijagnozom daje presudu. **Nema pronađenih iskvarenih znakova**: sadržaj se čita sasvim u redu takav kakav jest; ako vaš reproduktor i dalje prikazuje smeće, reproduktor je koristio krivi kod — spustite se na \"Spremi kao\", odaberite drugo i dajte mu tu datoteku. Kada **izgleda kao iskvaren tekst**, kartica navodi koji je trag pronašla:"
    ],
    "img": {
     "file": "repair-diag",
     "alt": "Kartica s dijagnozom: presuda plus svaki trag iskvarenosti naveden redak po redak",
     "cap": "Dijagnoza navodi tragove po vrsti umjesto da samo kaže \"to je iskvareno\""
    }
   },
   {
    "h2": "Kako se kandidati rangiraju i kako odabrati",
    "ps": [
     "Pod \"Načini popravka\", kandidati su navedeni redoslijedom **najsličnije stvarnom jeziku**, do njih 12, a svaki je označen parom kodiranja iz kojeg je i u koje je pročitan. Kliknite na jednog da vidite kako izgleda, odaberite ga, a zatim se pomaknite prema dolje za spremanje. Niste zadovoljni? Upotrijebite \"Zadrži kakvo jest\" za povratak na izvorno.",
     "Redoslijed dolazi iz ocjene: udio uobičajenih znakova, nizovi naglasaka, nizovi simbola, zidovi opskurnih znakova, sve uzeto u obzir s odgovarajućom težinom. **Ako nijedna ocjena nije jasno bolja, ništa se ne preporučuje** — neće vam nametati polovično uvjerljivog kandidata samo da bi ga imao. Tekst koji je bio oštećen dva puta (krivo spremljen jednom, pa krivo popravljen jednom) dobiva još jedan krug naknadnog rješavanja na najboljim kandidatima, tako da se sve unutar dva sloja još uvijek može spasiti."
    ],
    "img": {
     "file": "repair-fix",
     "alt": "Popis kandidata za popravak rangiran prema tome koliko sliči stvarnom jeziku, svaki označen svojim parom kodiranja",
     "cap": "Kandidati rangirani prema \"najsličnije stvarnom jeziku\", a svaki prikazuje uključena kodiranja"
    }
   },
   {
    "h2": "Pravilno spremanje je posljednji korak",
    "ps": [
     "Popravljeni rezultat još uvijek treba ispravno spremiti. Kada reproduktor ne može otkriti UTF-8, spremanje kao **UTF-8 s BOM-om** (Windows reproduktori se oslanjaju na BOM) ili kao **GBK** obično rješava stvar. Možete spremiti kao UTF-8, UTF-8 (s BOM-om), GBK, Big5, Shift_JIS ili EUC-KR; ako nešto ne odgovara, reći će vam da odaberete drugo (GBK ne može sadržavati korejski). Preuzete datoteke dobivaju oznaku `-fixed` dodanu nazivu.",
     "Kada detektirano kodiranje nije UTF-8, \"Spremi kao\" već je unaprijed postavljeno na UTF-8 s BOM-om za vas. Čim sami dotaknete padajući izbornik, prestaje nagađati umjesto vas."
    ],
    "img": {
     "file": "repair-out",
     "alt": "Područje rezultata: tekstni okvir s padajućim izbornikom za spremanje kao i gumbom za preuzimanje",
     "cap": "Odaberite kodiranje, zatim preuzmite — naziv datoteke dobiva dodatak -fixed"
    }
   },
   {
    "h2": "Što se nikada ne dira",
    "ps": [
     "Zamjenjuju se samo pogrešno pročitani znakovi. Brojevi indeksa, vremenski raspored i linije ASS stila ne mijenjaju se ni na koji način."
    ]
   },
   {
    "h2": "Često postavljana pitanja",
    "ps": [
     "**Prenio sam datoteku, pa zašto je još uvijek moram ponovno spremiti?** Sama datoteka je obično u redu; ono što je pokvareno jest reproduktor koji je čita s krivim kodiranjem. U tom slučaju nijedan znak u tekstu ne treba mijenjati — samo spremite kopiju kao UTF-8 s BOM-om ili GBK i dajte je reproduktoru.",
     "**Zašto se zalijepljeni tekst ne može popraviti?** Jednom kada se znak za zamjenu pojavi u zalijepljenom sadržaju, izvorni bajtovi su nestali i nema ničega iz čega bi se moglo zaključivati unatrag. Vratite se gore i upotrijebite \"Odaberi datoteku\" za prijenos izvornika.",
     "**Kandidat kojeg želim nije na popisu?** Ništa se ne preporučuje ako ocjenom nije jasno bolje od onoga što već imate. Pokušajte promijeniti detektirano kodiranje u drugo i dopustite mu ponovno rangiranje.",
     "**Koliko datoteka odjednom?** Jedna po jedna. Preuzmite popravak, a zatim unesite sljedeću datoteku."
    ]
   },
   {
    "h2": "Privatnost",
    "ps": [
     "Detekcija i popravak odvijaju se u potpunosti u vašem pregledniku. Sadržaj titlova se nikada ne šalje na poslužitelj."
    ]
   },
   {
    "h2": "Povezani alati i vodiči",
    "ps": [
     "Odakle potječu iskvareni znakovi i zašto na kraju izgledaju tako — pogledajte [[Odakle potječu iskvareni znakovi u titlovima|/guides/subtitle-garbled-characters.html]]; kodiranje je u redu, ali sadržaj je neuredan — upotrijebite [[Čišćenje titlova|/clean.html]]; za provjeru vremena i brzine čitanja — [[Kontrola kvalitete titlova|/qc.html]]."
    ]
   }
  ]
 },
 "sbv-to-srt": {
  "seo": {
   "title": "Pretvarač SBV u SRT – Pretvorite YouTube titlove – AI-SRTSub",
   "desc": "Pretvorite SBV titlove preuzete s YouTubea u SRT za CapCut, Premiere i reproduktore. Vrijednosti vremena ostaju netaknute – mijenja se samo izgled. Radi u pregledniku.",
   "h1": "SBV u SRT",
   "intro": "Pretvorite YouTube SBV titlove u SRT: ispustite datoteku, odaberite SRT, preuzmite. Vrijednosti vremena su netaknute – mijenja se samo struktura.",
   "ctaText": "Pretvori SBV → SRT"
  },
  "body": [
   {
    "h2": "Što je SBV i odakle dolazi",
    "ps": [
     "SBV je **YouTubeov format titlova**: preuzimanje „datoteka titlova” s YouTubea često vam daje .sbv. Njegova je struktura jednostavnija od SRT-a – početno i završno vrijeme nalaze se u **jednom retku** odvojeni zarezima, tekst dolazi izravno ispod, a brojevi odsječaka ne postoje."
    ]
   },
   {
    "h2": "Zašto ga reproduktori odbijaju",
    "ps": [
     "Izvan samog YouTubea, većina softvera za uređivanje i reproduktora ne podržava SBV. Nedostaje mu blok s brojevima i zapisuje svoju liniju vremena drugačije nego SRT, tako da preimenovanje ekstenzije ne radi ništa – strukturu je potrebno stvarno ponovno izgraditi."
    ],
    "img": {
     "file": "convert-upload-sbv",
     "alt": "Područje prijenosa: učitana SBV datoteka, detektirana kao SBV",
     "cap": "SBV se detektira takav kakav jest, nije potrebno preimenovanje ekstenzije"
    }
   },
   {
    "h2": "Kako pretvoriti",
    "ps": [
     "Otvorite [[pretvarač|/convert.html]], ispustite SBV, odaberite **SRT - SubRip** kao izlaz, a zatim pretvorite i preuzmite. Brojevi odsječaka dodjeljuju se iznova, a izvorni prijelomi redaka unutar odsječka spajaju se u jedan redak (SRT dopušta višelinijske odsječke; SBV se ovdje izvozi u jednom retku)."
    ]
   }
  ]
 },
 "shift": {
  "seo": {
   "title": "Kako pomaknuti vrijeme titlova (pomak, skaliranje, dva sidra) – AI-SRTSub",
   "desc": "Ilustrirani vodič kroz uređivač vremena: učitavanje titlova, dodavanje koraka prilagodbe, korekcija s dva sidra, naknadna podešavanja i izvoz.",
   "h1": "Uređivač vremena: vodič korak po korak",
   "intro": "Ovaj vodič prolazi kroz alat od vrha do dna: učitavanje titlova, dodavanje koraka prilagodbe, pokretanje provjera, fino podešavanje pojedinih stavki i izvoz.",
   "ctaText": "Otvori uređivač vremena"
  },
  "body": [
   {
    "h2": "Učitajte svoje titlove",
    "ps": [
     "Povucite datoteku u isprekidani okvir ili kliknite za odabir; također možete **zalijepiti sadržaj** izravno u tekstni okvir. Format se prepoznaje i po ekstenziji i po sadržaju, a rezultat se prikazuje na oznaci formata. Podržani unosi: srt, vtt, ass (uključujući ssa), sbv, lrc i txt."
    ],
    "img": {
     "file": "shift-upload",
     "alt": "Područje za prijenos: učitan primjer titla, prepoznat kao SRT",
     "cap": "Naziv datoteke i prepoznati format pojavljuju se ispod zone za ispuštanje; tekstni okvir ostaje u uredivom stanju."
    }
   },
   {
    "h2": "Dodavanje koraka prilagodbe",
    "ps": [
     "Prilagodbe čine **lanac koraka**: svaki korak obavlja jedan zadatak i uzima jedan broj, s jedinicom prikazanom unutar okvira. Koraci se primjenjuju odozgo prema dolje, a promjena bilo kojeg koraka **ponovno izračunava sve iz izvornih titlova** — tako da se možete vratiti i prilagoditi broj u bilo kojem trenutku bez narušavanja poretka."
    ]
   },
   {
    "h2": "Korekcija s dva sidra",
    "ps": [
     "Kada ne znate ni pomak u sekundama ni omjer, upotrijebite dva sidra: jednom dodana, **dva polja \"trenutačno\" automatski se popunjavaju** iz prvog i posljednjeg retka vaše datoteke. Unosite samo polja \"cilj\" — vremena u koja bi se ti titlovi doista trebali pojaviti. Sve između ponovno se proporcionalno raspoređuje."
    ],
    "img": {
     "file": "shift-step-two",
     "alt": "Korekcija s dva sidra: trenutačna vremena automatski popunjena, ciljna vremena za unos",
     "cap": "Trenutačna polja dolaze iz vaše datoteke; ciljna polja su točna vremena koja vidite u videu."
    }
   },
   {
    "h2": "Provjera vremenske trake i prilagodbe po stavkama",
    "ps": [
     "Nakon pokretanja koraka pročitajte **provjeru vremenske trake**: titlovi koji su prekratki, prekugasti, prenabijeni za čitanje, retci koji su preširoki ili se preklapaju – sve se to navodi na popisu. Provjera **samo označava probleme i nikada ništa ne mijenja** sama od sebe. Četiri zadana ravnala su 0,833 s minimalnog trajanja, 7 s maksimalnog, 9 znakova u sekundi brzine čitanja i 21 znak po retku — sve se to može uređivati na stranici. Ispod toga, prilagodbe po stavkama omogućuju vam spajanje dvaju susjednih titlova, dijeljenje jednoga ili izravno uređivanje njihovog početka i kraja; svaka se izmjena može poništiti."
    ]
   },
   {
    "h2": "Izvoz rezultata",
    "ps": [
     "Ploča s rezultatima prikazuje izvorna i prilagođena vremena **jednu pokraj druge** radi lakše brze provjere. Izlazni format zadano prati ulazni format, ali prije preuzimanja možete se prebaciti na bilo koji od formata srt, vtt, ass, sbv, lrc ili txt."
    ],
    "img": {
     "file": "shift-result",
     "alt": "Ploča s rezultatima: vremena prije i poslije jedna pored druge, s gumbima za preuzimanje i kopiranje",
     "cap": "Izvorna vremena s lijeve strane, prilagođena s desne; preuzmite kada brza provjera izgleda dobro."
    }
   }
  ]
 },
 "shift-subtitle-timing": {
  "seo": {
   "title": "Kako pomaknuti sve titlove ranije ili kasnije – AI-SRTSub",
   "desc": "Svaki titl kasni za isti iznos: upotrijebite korak pomaka u uređivaču vremena — unesite jedan negativan ili pozitivan broj i svi se titlovi pomiču zajedno.",
   "h1": "Pomaknite cijelu datoteku titlova ranije ili kasnije",
   "intro": "Zvuk počinje, titl se pojavljuje s kašnjenjem — i svaki pojedini titl kasni za isti iznos. To je jednoličan pomak: jedan broj to rješava.",
   "ctaText": "Otvori uređivač vremena"
  },
  "body": [
   {
    "h2": "Prvo provjerite kasni li svaki titl za isti iznos",
    "ps": [
     "Provjerite jedan titl blizu početka, jedan u sredini i jedan na kraju. Ako sva tri kasne za otprilike isti iznos, radi se o **jednakom pomaku** i jedan korak pomaka to rješava. Ako je početak točan, a kašnjenje raste prema kraju, to je drugi problem — pogledajte [[titlovi sve više gube sinkronizaciju|/guides/subtitles-out-of-sync.html]]."
    ]
   },
   {
    "h2": "Što unijeti: negativno za pomicanje unaprijed, pozitivno za odgodu",
    "ps": [
     "U uređivaču vremena dodajte korak **Pomakni sve** i unesite pomak u polje za vrijednost: titlovi koji kasne primaju negativan broj kako bi se pomaknuli ranije; oni koji žure primaju pozitivan broj kako bi se pomaknuli kasnije. Ako titlovi kasne 1,5 sekundu, unesite **-1.5** — jedinica su sekunde."
    ],
    "img": {
     "file": "shift-step-shift",
     "alt": "Korak pomicanja svih s unesenom vrijednošću od -1.5 sekundi",
     "cap": "Negativan broj pomiče cijelu datoteku ranije; jedinica je upisana unutar okvira, u sekundama."
    }
   },
   {
    "h2": "Pokrenite i provjerite prvi titl",
    "ps": [
     "Nakon primjene, ploča s rezultatima prikazuje izvorna i nova vremena svakog titla **jednu pokraj druge**. Prvo provjerite prvi titl: pada li novo vrijeme početka na kadar u kojem se linija izgovara? Zatim nasumično provjerite jedan u sredini. Svaki se titl pomiče za isti iznos i zadržava svoje trajanje."
    ]
   },
   {
    "h2": "Izvoz",
    "ps": [
     "Kada brza provjera izgleda u redu, preuzmite izravno. Izlazni format prema zadanim postavkama odgovara ulaznom formatu i može se promijeniti u nešto drugo. Promjena utječe samo na vremena — ni na jedan znak teksta."
    ]
   }
  ]
 },
 "simplified-traditional-chinese": {
  "seo": {
   "title": "Nije samo zamjena znakova – preslikavanje jedan-na-više i regionalne riječi – AI-SRTSub",
   "desc": "Tri stvari otežavaju ovaj proces: preslikavanja jedan-na-više koja se rješavaju prema riječi, različit rječnik Tajvana i Hong Konga te pretvaranje samo dijaloga. Uskladite sve troje i dodatne ljudske dorade neće biti potrebne.",
   "h1": "Pojednostavljeni naspram tradicionalnog kineskog nije obična zamjena znakova",
   "intro": "Koji tradicionalni znak mijenja pojednostavljeni ovisi o znaku pokraj njega. Zato se ova konverzija ne može izvršiti naslijevo-nadesno jednostavnim mijenjanjem jednog po jednog znaka.",
   "ctaText": "Otvori pretvarač"
  },
  "body": [
   {
    "h2": "Prvo: jedan pojednostavljeni oblik, nekoliko tradicionalnih",
    "ps": [
     "Pojednochnjavanjem je nekoliko tradicionalnih znakova svedeno na jedan pojednostavljeni oblik. U obrnutom smjeru, jedan pojednostavljeni znak odgovara nekoliko tradicionalnih, a izbor između njih ovisi o tome s čime je uparen:",
     "Zamjena znak po znak sve ih pretvara u isti i svako pojavljivanje ispada pogrešno. Razrješavanje **po riječima** ono je što ih odvaja – tablice dolaze iz OpenCC-a, usklađujući fraze prije pojedinačnih znakova. Na primjer:"
    ]
   },
   {
    "h2": "Drugo: Tajvan i Hong Kong nisu isto",
    "ps": [
     "Postoji još jedan sloj nakon pretvaranja u tradicionalni: ista se riječ različito piše na Tajvanu i u Hong Kongu. Riječ za \"softver\" jedna je na Tajvanu, a druga u Hong Kongu, pri čemu Tajvan koristi vlastitu riječ za \"informacije\".",
     "Stoga postoje odvojeni smjerovi. Tajvanski tradicionalni čak se dijeli na \"promjenu izraza\" i \"samo glifove\" — samo glifovi zadržavaju vaš postojeći rječnik, dok promjena izraza mijenja i regionalne pojmove. Hong Kong dobiva vlastiti smjer."
    ],
    "img": {
     "file": "hanconv-dir",
     "alt": "Kartica za pretvaranje: padajući izbornik odredišta prikazuje \"Pojednostavljeni → Tajvanski tradicionalni (promjena izraza)\"",
     "cap": "Tajvan nudi promjenu izraza ili samo glifove; Hong Kong ima svoj vlastiti smjer"
    }
   },
   {
    "h2": "Treće: trebalo bi dirati samo dijalog",
    "ps": [
     "Datoteka s titlovima nije samo dijalog. U njoj se nalaze i redni brojevi, vremenske oznake i linije ASS stila, i nijedan znak od toga ne bi se trebao pretvarati — posebno linije ASS stila, budući da sadrže nazive engleskih direktiva koje se pokvare čim se tretiraju kao dijalog.",
     "Stoga se pretvaranje odvija nakon raščlanjivanja prema formatu: SRT, VTT, ASS i TXT identificiraju koji je dio dijalog, a pretvaraju se samo znakovi unutar njega. Vremenske oznake i stilovi preživljavaju netaknuti, bez potrebe za ponovnim oblikovanjem."
    ],
    "img": {
     "file": "hanconv-out",
     "alt": "Područje rezultata: pretvoreni titl i traka sa statistikom koja prikazuje broj promijenjenih linija",
     "cap": "Traka sa statistikom prikazuje koliko se linija promijenilo; oblikovanje je sačuvano takvo kakvo jest"
    }
   },
   {
    "h2": "Povratak na pojednostavljeni: pripazite",
    "ps": [
     "Pretvaranje tradicionalnog u pojednostavljeni također zahtijeva da navedete **iz koje tradicionalne varijante dolazite**: generički, tajvanski i hongkonški tri su različita puta, jer se regionalni rječnik mora vratiti na generičku riječ prije nego što se može pretvoriti. Odaberite krivi smjer i regionalni će rječnik preživjeti u pojednostavljenom izlazu.",
     "Donja skupina od devet smjerova ona je koja pretvara natrag: tradicionalni → pojednostavljeni, tajvanski → pojednostavljeni, hongkonški → pojednostavljeni."
    ]
   },
   {
    "h2": "Povezani alati i vodiči",
    "ps": [
     "Cijeli vodič — [[Kako pretvoriti pojednostavljene i tradicionalne titlove|/guides/hanconv.html]]; ako trebate samo pojednostavljeni u tradicionalni — [[Pretvorite pojednostavljene titlove u tradicionalne|/guides/srt-simplified-to-traditional.html]]; za prevođenje na drugi jezik, [[Prevođenje titlova|/translate.html]]."
    ]
   }
  ]
 },
 "split": {
  "seo": {
   "title": "Razdvajanje i spajanje titlova – Izrezivanje po blokovima, redoslijed lanaca – AI-SRTSub",
   "desc": "Izrežite jednu datoteku na segmente po trajanju ili broju titlova, ponovno pokrenite svaki od nule ili povežite nekoliko datoteka redom odnosno isprepleti ih po vremenskoj traci. Brojevi titlova su ponovno numerirani, tekst je netaknut.",
   "h1": "Kako razdvojiti i spojiti titlove",
   "intro": "Izrežite jednu dugu datoteku titlova na segmente ili spojite nekoliko raspršenih datoteka u jednu. Rez uvijek pada na granicu unosa — rečenica se nikada ne reže na pola.",
   "ctaText": "Otvori razdvajanje i spajanje"
  },
  "body": [
   {
    "h2": "Što ovaj alat radi",
    "ps": [
     "Razdvajanje epizoda, dijeljenje segmenata i kombiniranje izvora nailaze na istu neusklađenost između blokova titlova i video-blokova: ili se jedna datoteka mora izrezati ili se nekoliko njih mora kombinirati. Ova stranica rješava oboje, svako u svojoj kartici."
    ]
   },
   {
    "h2": "Prvo odaberite izrezivanje ili spajanje",
    "ps": [
     "Dvije kartice na vrhu: **Razdvoji: jednu datoteku u segmente** i **Spoji: nekoliko datoteka u jednu**. Opcije koraka dva u nastavku mijenjaju se s vašim odabirom.",
     "U odjeljku \"1 Dodaj titlove\" učitavate datoteku ili lijepite tekst; ako ste odabrali pogrešnu, kliknite \"Očisti\". Ova stranica čita samo UTF-8 — ako je kodiranje oštećeno (zid upitnika ili kvadratića), prvo idite na [[Popravak oštećenog teksta|/repair.html]]."
    ],
    "img": {
     "file": "split-mode",
     "alt": "Dvije kartice na vrhu stranice za razdvajanje i spajanje",
     "cap": "Izrezivanje i spajanje dvije su kartice; opcije u drugom koraku prate vaš odabir"
    }
   },
   {
    "h2": "Kako izrezati",
    "ps": [
     "Pod \"2 Kako izrezati\" odaberite osnovu: **trajanje** (jedan segment svakih X minuta) ili **broj titlova** (jedan segment svakih X titlova), a zatim unesite broj.",
     "Označite \"Ponovno pokreni svaki segment na 0:00\" i svaki rezultirajući segment kreće od nule — upotrijebite ovo kada učitavate epizode i svakom segmentu dajete zaseban uređaj za reprodukciju. Ostavite neoznačeno kako biste zadržali izvorne vremenske oznake, tako da se svaki segment i dalje podudara sa svojim položajem u izvornom videu.",
     "Rez pada samo na granice titlova: kada vrlo dug titl prelazi preko točke reza, cijeli titl ostaje u ranijem segmentu."
    ],
    "img": {
     "file": "split-cut",
     "alt": "Opcije trajanja i broja titlova s prekidačem za ponovno pokretanje na nuli na stranici za razdvajanje",
     "cap": "Izrežite po trajanju ili po broju titlova i opcionalno ponovno pokrenite svaki segment na 0:00"
    }
   },
   {
    "h2": "Kako spojiti",
    "ps": [
     "Pod \"2 Kako spojiti\" odaberite metodu: **Poveži po redu** pomiče kasniju datoteku tako da počinje nakon završetka ranije, bez preklapanja između segmenata; **Isprepleti po vremenskoj traci** zadržava izvorne vremenske oznake svake datoteke i sortira prema vremenu početka.",
     "Upotrijebite povezivanje po redu kada su datoteke prva i druga polovina jedne epizode, ili kada se zasebno lektorirane polovine moraju ponovno sastaviti; upotrijebite isprepletanje po vremenskoj traci kada datoteke pripadaju zajedno na ekranu, kao što su izvorni zapis i prevedeni zapis.",
     "Nakon spajanja, brojevi titlova se automatski ponovno numeriraju i niti jedna riječ dijaloga se ne mijenja."
    ],
    "img": {
     "file": "split-join",
     "alt": "Opcije povezivanja po redu i isprepletanja po vremenskoj traci na stranici za spajanje",
     "cap": "Povezivanje po redu odgovara dvjema polovicama jedne epizode; isprepletanje po vremenskoj traci odgovara izvornom i prevedenom zapisu"
    }
   },
   {
    "h2": "Preuzimanje rezultata",
    "ps": [
     "\"3 Rezultat\" s desne strane izvozi **SRT** i **VTT**; kliknite \"Preuzmi\" ili \"Kopiraj\".",
     "Pri razdvajanju možete koristiti \"Preuzmi svaki segment\", što sprema svaki izrezani segment odjednom umjesto jednog klika po segmentu."
    ],
    "img": {
     "file": "split-out",
     "alt": "Izbor formata SRT/VTT s gumbima za preuzimanje i preuzimanje svakog segmenta u području rezultata",
     "cap": "Rezultati razdvajanja mogu se preuzeti segment po segment; spojena se datoteka preuzima ili kopira izravno"
    }
   },
   {
    "h2": "Što ostaje netaknuto",
    "ps": [
     "Niti jedan znak dijaloga se ne mijenja. Ova stranica mijenja samo koji titlovi pripadaju kojem segmentu i kako su numerirani; sadržaj unosa ostaje kakav jest.",
     "S opcijom \"Poveži po redu\" vremenske oznake kasnijih datoteka pomiču se u cijelosti — to je ono što spajanje zahtijeva; s opcijom \"Isprepleti po vremenskoj traci\" svaka izvorna vremenska oznaka je očuvana."
    ]
   },
   {
    "h2": "Česta pitanja",
    "ps": [
     "**Što ako posljednji segment ispadne vrlo kratak?** To je normalno. Ostatak koji ne ispunjava cijeli segment postaje zaseban segment umjesto da se popunjava.",
     "**Hoće li rečenica koja prelazi točku reza biti razdvojena?** Ne. Rezovi padaju samo na granice unosa, a titl koji prelazi liniju ostaje u ranijem segmentu.",
     "**Nakon isprepletanja, kako su poredana dva titla s istim vremenima?** Prema vremenu početka; kada su vremena početka jednaka, zadržava se redoslijed kojim ste dodali datoteke.",
     "**Može li se ASS razdvojiti?** Ova stranica obrađuje SRT i VTT. Prvo pretvorite ASS u SRT ili VTT pomoću [[Pretvorba formata|/convert.html]]."
    ]
   },
   {
    "h2": "Privatnost",
    "ps": [
     "Titlovi se obrađuju u potpunosti u pregledniku: ništa se ne prenosi i ništa ne prolazi kroz poslužitelj. Zatvorite stranicu i sadržaj nestaje."
    ]
   },
   {
    "h2": "Povezani alati i vodiči",
    "ps": [
     "Za kombiniranje dviju datoteka u dvojezični zapis (umjesto u jednu epizodu) upotrijebite [[Dvojezično stapanje i posebni efekti|/guides/merge.html]]; ako je cijela vremenska traka pomaknuta, idite na [[Prilagodba vremenske trake|/shift.html]]; za količinu za cijelu sezonu upotrijebite [[Grupna pretvorba|/batch.html]]; i pokrenite [[Kontrola kvalitete titlova|/qc.html]] kada završite."
    ]
   }
  ]
 },
 "split-bilingual-subtitles": {
  "seo": {
   "title": "Razdvajanje dvojezičnih titlova u dva zapisa – AI-SRTSub",
   "desc": "Razdvojite dvojezične titlove u dvije datoteke: izvorni i prevedeni zapis preuzimaju se zasebno s različitim nazivima; oba su oblika prepoznata. – AI-SRTSub",
   "h1": "Razdvajanje dvojezičnih titlova u dva zapisa",
   "intro": "Jedan dvojezični titl postaje dvije datoteke — \"izvorni\" i \"prijevod\": učitajte, odaberite razdvajanje na dvoje, preuzmite svaku posebno, s netaknutim vremenskim oznakama.",
   "ctaText": "Razdvoji dvojezične titlove"
  },
  "body": [
   {
    "h2": "Kada trebate izvršiti razdvajanje",
    "ps": [
     "Vaš uređaj za reprodukciju podržava samo jednojezični zapis; ili želite zapis s prijevodom za ponovno prevođenje, ili izvorni zapis koji ćete upariti s drugom prevedenom verzijom. Dvojezični titl je ili **jedan titl s dvjema linijama** (izvornik u jednoj liniji, prijevod u drugoj) ili **dva odvojena titla koja dijele istu vremensku traku** — oba se mogu razdvojiti."
    ]
   },
   {
    "h2": "Gdje to učiniti",
    "ps": [
     "Otvorite [[Uklanjač dvojezičnih titlova|/bilingual.html]] i ispustite svoj titl. Alat automatski prepoznaje dvojezični oblik: jedan titl s dvjema linijama razdvaja se prema pismu, a dva titla na istoj vremenskoj traci prema redoslijedu. Odaberite **Razdvoji na dvoje** u padajućem izborniku načina rada i kliknite Pokreni (ili dopustite da se automatski ponovno pokrene). Područje rezultata prikazuje dva dijela: onaj označen s `.orig` je izvorni zapis, onaj označen s `.dst` je prevedeni zapis — kliknite \"Preuzmi\" za svaki; oba zapisa dijele potpuno istu vremensku traku."
    ],
    "img": {
     "file": "bilingual-split",
     "alt": "Rezultat razdvajanja: izvorni i prevedeni zapis kao dva dijela, svaki s gumbom za preuzimanje",
     "cap": "Razdvojeno na dvoje: izvorni zapis .orig + prevedeni zapis .dst, svaki se preuzima zasebno"
    }
   },
   {
    "h2": "Jedna česta zamka",
    "ps": [
     "**Jedan titl s dvjema linijama na jezicima koji dijele isto pismo (recimo engleski i francuski) ne može se razdvojiti.** Kada se zapisi razdvajaju prema pismu, ti se jezici smatraju jednim pismom i tretiraju se kao jednojezični. Takav sadržaj najprije pretvorite u oblik B s istom vremenskom trakom, a zatim ga razdvojite; oblik s dva titla uparuje se prema vremenskoj traci i ne ovisi o jeziku. Pojedinosti o oba oblika potražite u vodiču [[Dva načina stvaranja dvojezičnih titlova|/guides/make-bilingual-subtitles.html]]."
    ]
   }
  ]
 },
 "srt-file-format": {
  "seo": {
   "title": "Što je SRT datoteka? Kako je otvoriti i urediti – AI-SRTSub",
   "desc": "Anatomija SRT (SubRip) titlova: broj, vremenska oznaka i tekst. Saznajte kako ih otvoriti, zašto ih player odbija te kako popraviti iskrivljeni tekst i pogreške.",
   "h1": "Objašnjenje formata SRT datoteka",
   "intro": "SRT je najuniverzalniji format titlova: običan tekst, jednostavna struktura i široko prihvaćen. Ovaj vodič otkriva njegovu strukturu, način otvaranja i rješavanje uobičajenih pogrešaka.",
   "ctaText": "Otvorite pretvarač titlova"
  },
  "body": [
   {
    "h2": "Kako izgleda SRT datoteka",
    "ps": [
     "SRT (SubRip) je običan tekst — otvara ga svaki uređivač teksta. Svaki blok ima tri dijela: **redni broj**, **vremensku oznaku** i **tekst**, odvojene praznim retcima. Vremenska oznaka glasi `00:00:01,000 --> 00:00:03,500` — pripazite na **zarez** ispred milisekundi, a ne točku."
    ],
    "img": {
     "file": "convert-upload",
     "alt": "Područje za prijenos: učitana SRT datoteka koja prikazuje brojeve i vrijeme",
     "cap": "Standardni trodijelni SRT blok: broj, vremenska oznaka, tekst"
    }
   },
   {
    "h2": "Kako je otvoriti",
    "ps": [
     "Za čitanje sadržaja: kliknite desnom tipkom miša i otvorite u bilo kojem **uređivaču teksta**. Za korištenje uz videozapis: preimenujte datoteku tako da **odgovara nazivu videozapisa** (izuzev ekstenzije), stavite ih u istu mapu, a playeri poput VLC-a, PotPlayera ili mpv-a učitat će ga automatski; možete ga i povući u prozor za reprodukciju."
    ]
   },
   {
    "h2": "Ispravljanje odbijanja i iskrivljenog teksta",
    "ps": [
     "**Iskrivljeni znakovi**: datoteka nije u UTF-8 kodiranju — spremite je ponovno kao UTF-8 u uređivaču. **Ništa se ne prikazuje**: provjerite koristi li vremenska oznaka zarez (a ne točku) i jesu li brojevi blokova ispravni (većina playera tolerira praznine, ali neki ne). **Datoteka je u HTML-u ili JSON-u**: izvor preuzimanja je bio pogrešan; preuzmite je ponovno."
    ]
   },
   {
    "h2": "Što SRT može, a što ne može sadržavati",
    "ps": [
     "SRT prenosi samo tekst i vrijeme: **nema stilova** (fontovi, boje), **nema pozicioniranja** (položaj na ekranu), **nema efekata**. Za to je potreban ASS — pogledajte [[SRT u ASS|/guides/srt-to-ass.html]]. Za usporedbu svih formata jedan pokraj drugoga, pogledajte [[usporedba formata titlova|/guides/subtitle-format-comparison.html]]."
    ]
   }
  ]
 },
 "srt-fps-converter": {
  "seo": {
   "title": "SRT pretvarač broja sličica u sekundi – Promijenite FPS titlova – AI-SRTSub",
   "desc": "Film ima 24fps, televizija 25fps, a titlovi kasne svake minute: jednim skaliranjem vremenske linije za 0.96 cijela datoteka sjeda na željenu brzinu.",
   "h1": "Pretvorba broja sličica u sekundi titlova: s 24fps na 25fps",
   "intro": "Pokrenite titlove filma od 24fps na izvoru od 25fps i oni će gubiti više od sekunde svake minute — do odjavne špice kasnit će minutama. Jedno skaliranje to rješava.",
   "ctaText": "Otvorite uređivač vremena"
  },
  "body": [
   {
    "h2": "Zašto neusklađenost broja sličica uzrokuje kašnjenje titlova",
    "ps": [
     "Pretvorba broja sličica ponovno čita **isto vremensko razdoblje pod dva različita sata**. Film od 24fps u trajanju od 100 minuta ima 6000 s × 24 = **144,000 frames**; na izvoru od 25fps tih se 144,000 sličica reproducira u 5760 sekundi — **96 minutes**. Cijeli film traje 4 minute kraće, pa se titl u 50. minuti pojavljuje oko 2 minute kasnije, a titl odjavne špice se uopće ne prikaže."
    ]
   },
   {
    "h2": "Formula i uobičajeni faktori",
    "ps": [
     "Ciljana brzina ÷ izvorna brzina = množitelj. **24 na 25: pomnožite s 0.96** (24÷25); obrnuto, 25 na 24: 1.0417. **25 na 23.976: pomnožite s 0.959**; obrnuto: 1.0427. U uređivaču vremena dodajte korak **Skaliraj prema brzini** i unesite faktor u polje za vrijednost."
    ],
    "img": {
     "file": "shift-step-rate",
     "alt": "Korak skaliranja prema brzini s unesenom vrijednošću 0.96",
     "cap": "0.96 je 24÷25; napomena na stranici čak spominje pretvorbu broja sličica kao uobičajenu upotrebu."
    }
   },
   {
    "h2": "Kada ne znate obje brzine",
    "ps": [
     "Ako ne možete pronaći brzinu sličica izvora, nemojte pogađati faktor — umjesto toga upotrijebite **dva sidra**: uzmite stvarno vrijeme pojavljivanja prvog i zadnjeg titla kao dvije točke, a sve između proporcionalno se rasteže. Pogledajte [[titlovi sve više gube sinkronizaciju|/guides/subtitles-out-of-sync.html]]."
    ]
   },
   {
    "h2": "Što provjeriti nakon toga",
    "ps": [
     "Skaliranjem se pomiče svaki početak i kraj; trajanja titlova rastežu se za isti faktor. Nakon izvršavanja provjerite dvije krajnosti: prvi titl (najmanja izvorna pogreška) i posljednji (najveća). Ako se oba kraja podudaraju, podudara se i sve između."
    ]
   }
  ]
 },
 "srt-simplified-to-traditional": {
  "seo": {
   "title": "Pretvorite pojednostavljeni kineski u tradicionalni – Tajvan ili Hong Kong – AI-SRTSub",
   "desc": "Pretvorite pojednostavljene kineske titlove u tradicionalne: odaberite tajvanski (s regionalnim rječnikom ili bez njega) ili hongkonški. Preslikavanja jedno na više rješavaju se prema riječi. Mijenja se samo dijalog; vremenske oznake ostaju neizmijenjene.",
   "h1": "Pretvorba pojednostavljenih titlova u tradicionalne",
   "intro": "Pojednostavljeni kineski titl namijenjen tajvanskoj ili hongkonškoj publiki zahtijeva samo pretvorbu — no ove dvije regije traže različite stvari, a odabir krive opcije donosi izraze koje lokalno stanovništvo ne koristi.",
   "ctaText": "Pretvorite ovaj titl"
  },
  "body": [
   {
    "h2": "Potreba",
    "ps": [
     "Vaši su titlovi na pojednostavljenom kineskom i trebaju stići do gledatelja na Tajvanu ili u Hong Kongu. Ispravljanje znakova one po one nije izvedivo — jedna epizoda ima stotine blokova — a te dvije regije ne žele isti tradicionalni tekst: rječnik se razlikuje, a krivi smjer daje formulacije koje nijedan lokalni stanovnik ne bi upotrijebio."
    ]
   },
   {
    "h2": "Gdje to učiniti",
    "ps": [
     "Otvorite [[Pretvorba pojednostavljenog i tradicionalnog pisma|/hanconv.html]], povucite titl unutra i odaberite jedan od smjerova pojednostavljeni → tradicionalni pod stavkom \"Pretvori u\": opći tradicionalni, tajvanski (promjena rječnika), tajvanski (samo glifi) ili hongkonški. Pretvorba se događa trenutačno, a područje s rezultatima prikazuje gotov titl spreman za preuzimanje.",
     "**Za tajvansku publiku**: odaberite \"tajvanski (promjena rječnika)\" ako se treba promijeniti i regionalni rječnik — \"softver\" i \"informacije\" postaju njihovi tajvanski ekvivalenti — ili \"tajvanski (samo glifi)\" ako želite promijeniti oblike znakova uz zadržavanje izvornog rječnika. **Za hongkonšku publiku**: odaberite \"Hong Kong\", gdje se \"softver\" piše još jednim oblikom."
    ],
    "img": {
     "file": "hanconv-dir",
     "alt": "Kartica za pretvorbu: padajući izbornik odredišta s prikazom opcije \"Pojednostavljeni → tajvanski tradicionalni (promjena rječnika)\"",
     "cap": "Tajvan i Hong Kong odvojeni su smjerovi s različitim rječnikom"
    }
   },
   {
    "h2": "Uobičajene zamke",
    "ps": [
     "**Ne bojte se preslikavanja jedno na više**: isti pojednostavljeni znak u riječima za \"čisto\", \"suho\" i \"deblo\" preslikava se u različite tradicionalne znakove. Tablice to rješavaju po frazama, tako da se sve ne svodi na jedan znak.",
     "**Pretvara se samo dijalog**: vremenske oznake, brojevi indeksa i linije ASS stilova ostaju netaknuti, pa je rezultat spreman za upotrebu.",
     "**Ništa se nije promijenilo? Provjerite prije panike**: ako traka stanja izvještava o 0 promijenjenih redaka, datoteka ili nema kineskih znakova ili je format pogrešno prepoznat — provjerite odgovara li stavka \"Prepoznati format\" onome što ste učitali."
    ]
   },
   {
    "h2": "Povezano",
    "ps": [
     "Potpuno objašnjenje svih devet smjerova — [[Kako pretvoriti pojednostavljene i tradicionalne titlove|/guides/hanconv.html]]; zašto je to više od obične zamjene znakova — [[Pojednostavljeni naspram tradicionalnog nije samo zamjena znakova|/guides/simplified-traditional-chinese.html]]; povratak s tradicionalnog na pojednostavljeni također se nalazi na [[Pretvorba pojednostavljenog i tradicionalnog pisma|/hanconv.html]]."
    ]
   }
  ]
 },
 "srt-to-ass": {
  "seo": {
   "title": "Pretvarač iz SRT u ASS – Pretvorite titlove na mreži – AI-SRTSub",
   "desc": "Pretvorite SRT titlove u ASS (Advanced SubStation Alpha) s platnom rezolucije 1920x1080 i čistim zadanim stilom, spremnim za učitavanje u bilo kojem playeru. Radi u vašem pregledniku.",
   "h1": "SRT u ASS",
   "intro": "Pretvorite SRT titlove u ASS: ispustite datoteku, odaberite ASS i preuzmite je. Za vas se generiraju platno rezolucije 1920x1080 i čist zadani stil.",
   "ctaText": "Pretvori SRT → ASS"
  },
  "body": [
   {
    "h2": "Kada vam treba ASS",
    "ps": [
     "Koristite ASS kada titl treba **bolje pozicioniranje i kontrolu stila**: on sadrži koncepte koje SRT nema — veličinu platna, stilove fontova, poravnanje. mpv, PotPlayer, VLC i većina playera podržavaju ga izravno."
    ]
   },
   {
    "h2": "Kako izgleda izlazni rezultat",
    "ps": [
     "Alat obnavlja standardno zaglavlje: **platno rezolucije 1920x1080**, pametno prelamanje (WrapStyle 0) i jedan zadani stil — Arial 54, bijeli tekst s crnim obrubom, centrirano pri dnu. Svaki blok koristi ovaj stil."
    ],
    "img": {
     "file": "convert-opt-ass",
     "alt": "Padajući izbornik izlaznog formata s odabranom opcijom ASS - Advanced SubStation",
     "cap": "Odaberite ASS kao izlaz i preuzmite nakon pretvorbe"
    }
   },
   {
    "h2": "Jesu li stilovi sačuvani?",
    "ps": [
     "SRT uopće nema koncept stila. A ako vam je izvor već ASS, pretvorba **obnavlja zadani stil i ne zadržava izvorni** — upotrijebite namjenski uređivač titlova za ponovno stiliziranje ASS-a. Vrijeme i tekst ostaju netaknuti u oba slučaja."
    ]
   }
  ]
 },
 "srt-to-excel": {
  "seo": {
   "title": "Pretvorite titlove u Excel – Lektorirajte redak po redak – AI-SRTSub",
   "desc": "Izvezite SRT titlove u Excel: jedan redak po bloku u četiri stupca — indeks, početak, kraj i tekst. Vrijeme je zadržano kao tekst, prijelomi redaka su očuvani, a uređena tablica može se ponovno pretvoriti u titlove.",
   "h1": "Pretvorba titlova u Excel",
   "intro": "Lektoriranje stotina blokova u uređivaču teksta je iscrpljujuće. U Excelu je svaki blok jedan redak, čime postaju dostupni filtriranje, komentiranje te pretraživanje i zamjena — a izmjene se vraćaju u vaš SRT.",
   "ctaText": "Izvezi u Excel"
  },
  "body": [
   {
    "h2": "Potreba",
    "ps": [
     "Lektoriranje, masovne izmjene riječi ili dijeljenje posla između nekoliko ljudi — sve to ide puno brže u tablici nego u običnom tekstu. Sam SRT je običan tekst, ali njegova struktura blokova (indeks, vrijeme, dijalog) uredno se preslikava na četiri stupca proračunske tablice."
    ]
   },
   {
    "h2": "Gdje to učiniti",
    "ps": [
     "Otvorite [[Pretvorba titlova ⇄ tablica|/table.html]], prebacite na \"u tablicu\", povucite SRT, i pretpregled će se ispuniti s jednim retkom po bloku u četiri stupca — indeks, početak, kraj, tekst. Pritisnite \"Preuzmi Excel (.xlsx)\" i vaša je. VTT je podržan na isti način.",
     "Kada završite s uređivanjem: prebacite način rada na \"u titl\", vratite tablicu natrag i ponovno ćete dobiti SRT. Pravilo je tri stupca za početak, kraj i tekst (engleski Start / End / Text također rade), u bilo kojem redoslijedu."
    ],
    "img": {
     "file": "table-prev",
     "alt": "Pretpregled tablice: svaki SRT blok kao redak u četiri stupca, s trakom stanja",
     "cap": "SRT raspoređen u četiri stupca, s mogućnošću pretvorbe natrag na isti način"
    }
   },
   {
    "h2": "Uobičajene zamke",
    "ps": [
     "**Prvo popravite oštećeno kodiranje**: ova stranica čita samo UTF-8. Zaslon pun upitnika ili kvadratića znači da prvo morate posjetiti [[Popravak iskrivljenog teksta|/repair.html]].",
     "**CSV ili xlsx**: odaberite .xlsx kada datoteka ide u Excel, tako da se stupac s vremenom ne može ponovno formatirati; CSV je prenosiviji, ali ga Excel može pročitati drugačije — postavite stupac s vremenom na \"Tekst\" ako se to dogodi.",
     "**ASS ne radi**: ASS sadrži naredbe za stil, stoga ga pretvorite u SRT prije stavljanja u tablicu."
    ]
   },
   {
    "h2": "Povezano",
    "ps": [
     "Potpuni dvosmjerni vodič — [[Kako pretvoriti titlove u Excel / CSV|/guides/table.html]]; naknadno prevođenje — [[Prevođenje titlova|/translate.html]]; završna provjera prije isporuke — [[Kontrola kvalitete titlova|/qc.html]]."
    ]
   }
  ]
 },
 "srt-to-vtt": {
  "seo": {
   "title": "Pretvarač SRT u VTT – Prevedite titlove online – AI-SRTSub",
   "desc": "Pretvorite SRT titlove u VTT (WebVTT) za HTML5 elemente zapisa. Zarezi u vremenskim oznakama automatski postaju točke. Pokreće se u pregledniku, ništa se ne učitava.",
   "h1": "SRT u VTT",
   "intro": "Pretvorite SRT titlove u VTT: ispustite datoteku, odaberite VTT, preuzmite. Vremenske oznake prepisuju se za web format, sve unutar vašeg preglednika.",
   "ctaText": "Pretvori SRT → VTT"
  },
  "body": [
   {
    "h2": "Kada vam je potreban VTT",
    "ps": [
     "Web reproduktori (HTML5 element ``), prijenos titlova na YouTube i većina reproduktora temeljenih na pregledniku prihvaćaju samo **VTT (WebVTT)** – ne i SRT. Ako imate samo SRT, jedna konverzija omogućuje da sve radi."
    ]
   },
   {
    "h2": "Po čemu se ta dva formata razlikuju",
    "ps": [
     "Sadržaj je gotovo identičan; tri se stvari pišu drugačije: **linija zaglavlja WEBVTT** (obavezna u VTT-u); **razdvojnik milisekundi** u vremenskim oznakama – SRT koristi zarez (00:00:01,000) dok VTT koristi točku (00:00:01.000); i VTT dopušta NOTE i STYLE blokove koje SRT ne podržava."
    ],
    "img": {
     "file": "convert-result",
     "alt": "Rezultat pretvorbe koji prikazuje WEBVTT zaglavlje i vremenske oznake s točkama",
     "cap": "Pretvoreni VTT: WEBVTT u prvom retku, vremenske oznake s točkama"
    }
   },
   {
    "h2": "Kako izvršiti pretvorbu",
    "ps": [
     "Otvorite [[pretvarač|/convert.html]], ubacite SRT, odaberite **VTT - WebVTT** kao izlaz, a zatim pretvorite i preuzmite. Redoslijed replika, vrijednosti vremena i višelinijski tekst ostaju neizmjenjeni – mijenja se samo sintaksa. Idete u suprotnom smjeru? Pogledajte [[VTT u SRT|/guides/vtt-to-srt.html]]."
    ]
   }
  ]
 },
 "subtitle-format-comparison": {
  "seo": {
   "title": "SRT vs VTT vs ASS vs SBV vs LRC – Koji format titla odabrati – AI-SRTSub",
   "desc": "Usporedba mogućnosti pet uobičajenih formata titlova: stiliziranje teksta, pozicioniranje, preciznost vremena, namjena svakog formata i pretvorba među njima.",
   "h1": "Odabir formata titla: SRT / VTT / ASS / SBV / LRC",
   "intro": "Isti titl spremljen u pet formata služi pet različitih namjena. Ovaj vodič uspoređuje što svaki format može i kako prelaziti s jednog na drugi.",
   "ctaText": "Otvori pretvarač titlova"
  },
  "body": [
   {
    "h2": "Odaberite format u jednoj rečenici",
    "ps": [
     "Dodavanje u reproduktor, maksimalna kompatibilnost → **SRT**; web reproduktori (HTML5 track) ili YouTube prijenos → **VTT**; fontovi, boje, pozicioniranje, efekti → **ASS**; preuzeto s YouTubea → **SBV** (pretvori u SRT za širu podršku); tekstovi pjesama, pjevanje redak po redak → **LRC**."
    ],
    "img": {
     "file": "convert-opt",
     "alt": "Padajući izbornik izlaznog formata: šest ciljnih formata",
     "cap": "Šest ciljnih formata za izvoz u pretvaraču pokrivaju svaki format iz ovog vodiča"
    }
   },
   {
    "h2": "Usporedba mogućnosti",
    "ps": [
     "**SRT**: običan tekst + vrijeme, bez stiliziranja ili pozicioniranja, prvak kompatibilnosti. **VTT**: tekst + vrijeme, izvorno podržano od strane preglednika, može nositi pozicioniranje i osnovno stiliziranje, točka prije milisekundi. **ASS**: tekst + vrijeme + puno stiliziranje (fontovi, boje, obrubi, pozicioniranje, efekti), vrijeme na stotinke sekunde. **SBV**: YouTubeov minimalni format titlova, početak i kraj u jednom retku. **LRC**: format teksta pjesme, samo vremena početka, bez vremena završetka, bez stiliziranja."
    ]
   },
   {
    "h2": "Putovi između formata",
    "ps": [
     "Bilo koja od ovih pretvorbi radi u oba smjera u [[pretvaraču|/convert.html]]: čitanje podržava srt, vtt, ass (uključujući ssa), sbv, lrc, txt; izvoz podržava srt, vtt, ass, sbv, lrc, txt. Uobičajene rute imaju vlastite vodiče: [[SRT u VTT|/guides/srt-to-vtt.html]], [[VTT u SRT|/guides/vtt-to-srt.html]], [[SRT u ASS|/guides/srt-to-ass.html]], [[ASS u SRT|/guides/ass-to-srt.html]], [[SBV u SRT|/guides/sbv-to-srt.html]], [[LRC u SRT|/guides/lrc-to-srt.html]]."
    ]
   },
   {
    "h2": "Što se gubi pretvorbom",
    "ps": [
     "Pretvorba u SRT uvijek gubi stiliziranje i pozicioniranje (SRT ih ne može sadržavati). Pretvorba u ASS s ovim alatom **ponovno izrađuje zadani stil i ne zadržava originalni**. LRC u SRT zahtijeva popunjavanje vremena završetka (svaki redak traje do sljedećeg; posljednji dobiva 3 sekunde). Vrijednosti vremena i tekst ostaju identični u svakom smjeru."
    ]
   }
  ]
 },
 "subtitle-garbled-characters": {
  "seo": {
   "title": "Odakle potječe iskrivljeni tekst titlova – Prepoznajte, popravite – AI-SRTSub",
   "desc": "Iskrivljeni tekst znači pogrešno čitanje, a ne oštećenu datoteku. Zamjenski znakovi, zidovi naglašenih slova i nizovi nejasnih znakova ukazuju na uzrok — saznajte koji se mogu oporaviti, a koji nikada ne mogu.",
   "h1": "Odakle potječe iskrivljeni tekst titlova",
   "intro": "Isti bajtovi pročitani kao UTF-8 i pročitani kao GBK daju dva potpuno različita skupa znakova. Izgled smeća od teksta izravan je dokaz koji je korak pošao po zlu.",
   "ctaText": "Otvori alat za popravak iskrivljenog teksta"
  },
  "body": [
   {
    "h2": "Datoteka je u redu — pročitana je pogrešno",
    "ps": [
     "Ono što datoteka titlova pohranjuje jesu bajtovi. Pretvaranje bajtova u znakove zahtijeva poznavanje kodiranja u kojem su zapisani — ako to pogriješite, dobit ćete iskrivljeni tekst. Niti jedan bajt nije izgubljen iz datoteke; pročitajte je ponovno s ispravnim kodiranjem i znakovi će se vratiti.",
     "Time se posao dijeli na dva dijela: **određivanje s kojim je kodiranjem započelo** i **spremanje u kodiranju koje vaš reproduktor može prepoznati**. Prvo dolazi iz probnog dekodiranja i bodovanja, drugo iz spremanja kopije. Oni rješavaju različite probleme."
    ]
   },
   {
    "h2": "Pet izgleda, pet uzroka",
    "ps": [
     "Iskrivljeni tekst nije slučajan — njegov izgled odaje što ga je uzrokovalo:"
    ],
    "img": {
     "file": "repair-diag",
     "alt": "Dijagnostička kartica koja navodi svaku vrstu traga iskrivljenog teksta",
     "cap": "Dijagnostika razvrstava iskrivljeni tekst prema uzroku umjesto da ih sve stavlja u isti koš"
    }
   },
   {
    "h2": "Zašto se zamjenski znak ne može popraviti",
    "ps": [
     "Zamjenski znak predstavlja granicu. Znak `` znači da su bajtovi već odbačeni **u ranijem koraku** (obično neki program koji čita datoteku i ponovno je sprema), i ništa nije zabilježeno o tome što je odbačeno. U tom trenutku nema ničega od čega bi se moglo krenuti unatrag — nitko to ne može popraviti.",
     "Stoga stranica za popravak tretira dva slučaja drugačije. Učitajte datoteku i izvorni bajtovi su netaknuti, što joj omogućuje da isproba svako kodiranje; ako zalijepljeni tekst već sadrži zamjenski znak, jasno kaže: \"ne može se popraviti, učitajte izvornu datoteku\".",
     "Postoji i obratan slučaj: sadržaj se čita savršeno dobro, ali vaš reproduktor i dalje prikazuje smeće. Datoteka nije kriva — **reproduktor je odabrao pogrešno kodiranje**. Uređivanje teksta neće pomoći; spremite kopiju kao UTF-8 s BOM-om ili GBK-om i predajte mu ju."
    ],
    "img": {
     "file": "repair-up",
     "alt": "Područje za prijenos: povuci-i-ispusti i zalijepi kao dvije ulazne točke",
     "cap": "Učitajte datoteku ako možete — netaknuti bajtovi znače da se nešto može popraviti"
    }
   },
   {
    "h2": "Što uspoređuje tijekom popravka",
    "ps": [
     "Alat isprobava svako vjerojatno kodiranje, a zatim boduje svaki rezultat: koliko je napravljen od uobičajenih znakova, postoje li nizovi naglasaka, nizovi simbola, jesu li CJK nizovi zidovi opskurnih znakova. Rezultat s najboljim rezultatom ide na vrh popisa.",
     "**Ako nijedan rezultat nije jasno bolji, ništa se ne preporučuje** — bolje je reći vam \"ovo se čita dobro kakvo jest\" nego vam podvaliti nešto što samo približno sliči jeziku. Tekst iskrivljen dvaput (pogrešno spremljen jednom, zatim pogrešno popravljen jednom) dobiva još jedan krug rješavanja unatrag na najboljim kandidatima."
    ],
    "img": {
     "file": "repair-fix",
     "alt": "Popis kandidata sortiran prema rezultatu, svaki označen parom kodiranja",
     "cap": "Kandidati rangirani prema rezultatu — nema jasnog pobjednika, nema preporuke"
    }
   },
   {
    "h2": "Spremanje ispravnog kodiranja dovršava posao",
    "ps": [
     "Popravljeni tekst se i dalje mora spremiti kao kodiranje koje vaš reproduktor prepoznaje. Reproduktori na sustavu Windows obično se oslanjaju na BOM za prepoznavanje kodiranja, pa je **UTF-8 s BOM-om** najmanje kompliciran; stariji hardver i neki regionalni reproduktori žele GBK. Možete odabrati UTF-8, UTF-8 (s BOM-om), GBK, Big5, Shift_JIS ili EUC-KR, a bit ćete pozvani da odaberete drugo ako nešto ne odgovara (GBK ne može sadržavati korejski)."
    ],
    "img": {
     "file": "repair-out",
     "alt": "Područje rezultata: padajući izbornik kodiranja za spremanje i gumb za preuzimanje",
     "cap": "Spremite ga kao nešto što reproduktor prepoznaje i iskrivljeni tekst je doista riješen"
    }
   },
   {
    "h2": "Povezani alati i vodiči",
    "ps": [
     "Cijeli vodič — [[Kako popraviti iskrivljene titlove|/guides/repair.html]]; što SRT datoteka zapravo pohranjuje — [[Što se nalazi unutar SRT datoteke|/guides/srt-file-format.html]]; kodiranje je u redu, ali je sadržaj neuredan (vodni žigovi, oglasi, oznake za nagluhe) — [[Čišćenje titlova|/clean.html]]."
    ]
   }
  ]
 },
 "subtitle-glossary": {
  "seo": {
   "title": "Tablice pojmova: jedna sezona, jedan rječnik – Kada je izgraditi – AI-SRTSub",
   "desc": "Tablica pojmova rješava istu riječ prevedenu nedosljedno: kada je izgraditi, kako je ponovno koristiti u sezoni, zašto podudaranje cijelih riječi ne radi na kineskom i što joj ne prepuštati.",
   "h1": "Tablice pojmova: održavanje dosljednosti sezone",
   "intro": "Kada je neko ime u prvoj epizodi A, a u sedmoj B, gledatelji misle da su to dva lika. Tablica pojmova sprječava upravo to — popravlja kako se stvari nazivaju.",
   "ctaText": "Otvori skupnu zamjenu pojmova"
  },
  "body": [
   {
    "h2": "Tablica pojmova rješava nedosljednost",
    "ps": [
     "Problemi s formulacijom u titlovima dolaze u dvije vrste: \"ova je riječ prevedena pogrešno\" i \"ista je riječ prevedena drukčije s jednog mjesta na drugo\". Prvo je problem rječnika; drugo je ono čemu tablica pojmova služi.",
     "Drugo je i češće i teže za uočiti: `Thor` postaje \"Thor\" u prvoj epizodi i \"Donar\" u sedmoj, a svaka epizoda izgleda dobro sama za sebe, dok serija u cjelini navodi gledatelje da pomisle kako se pojavio novi lik. Tablica pojmova pretvara \"ova produkcija ga zove Thor\" u izvršivo pravilo primijenjeno na cijelu datoteku titlova odjednom."
    ]
   },
   {
    "h2": "Kada se isplati izgraditi je",
    "ps": [
     "Svaka datoteka titlova ne treba tablicu pojmova. Slučajevi koji je opravdavaju obično su ovi:"
    ],
    "img": {
     "file": "glossary-rules",
     "alt": "Pravila zamjene grupirana po kategorijama u tablici pojmova",
     "cap": "Upotrijebite # komentare za grupiranje pravila i privremeno isključivanje jednog tijekom uređivanja"
    }
   },
   {
    "h2": "Održavanje jedne tablice kroz sezonu",
    "ps": [
     "Tablica pojmova održava se **inkrementalno**: uskladite imena u prvoj epizodi, zatim dodajte pravilo kad god se pojavi novi pojam, i do kraja sezone tablica je potpuna. Za sljedeću sezonu iste serije počnite od nje.",
     "Pišite pravila malo šire nego što je striktno potrebno — jednom kada se odlučite za \"Thor\", dodajte i \"Donar -> Thor\" kako bi se tuđi titlovi mogli dovesti u red u istom prolazu.",
     "Uvijek pročitajte **popis promjena** nakon toga: on imenuje svaku repliku, svaki redak i što je postalo što. To je jedino mjesto gdje možete potvrditi da je promjena bila ispravna, a ne pretjerana, i bilo koji unos koji vam se ne sviđa može se poništiti jednim klikom."
    ],
    "img": {
     "file": "glossary-diff",
     "alt": "Popis pojedinačnih promjena u području rezultata",
     "cap": "Svaka je promjena navedena; kliknite onu koju ne želite da biste je poništili"
    }
   },
   {
    "h2": "Što ne prepuštati tablici pojmova",
    "ps": [
     "Tablica pojmova mijenja **riječi**. Ove tri stvari izvan su njezina posla i trebale bi biti:",
     "**Gramatika i struktura rečenice** — ne možete pretvoriti riječ u rečenicu; rad na razini rečenice vraća se na [[Prevođenje titlova|/translate.html]] ili čovjeku.",
     "**Čišćenje sadržaja** — uklanjanje cijelih redaka kao što su vodeni žigovi, oglasi i SDH replike pripada [[Čišćenju titlova|/clean.html]]; pravila tablice pojmova zamjenjuju, ne brišu retke.",
     "**Vremenske oznake** — tablica pojmova nikada ne dira vrijeme. Za globalni pomak ili problem s brzinom idite na [[Prilagodbu vremenskih oznaka|/shift.html]]."
    ]
   },
   {
    "h2": "Nekoliko stvari koje je lako pogriješiti",
    "ps": [
     "**Kineski i dalje zamjenjuje podnizove s uključenim podudaranjem cijelih riječi — to je normalno.** Kineski i japanski ne odvajaju riječi razmacima, pa alat ne može odrediti granice riječi i podudaranje cijelih riječi tu nema učinka; znak `art` neće dirati `start` jer zaštita vrijedi samo za engleski.",
     "**Redoslijed mijenja rezultat.** Pravila se izvršavaju od vrha prema dnu, a tekst koji proizvede jedno pravilo ponovno skeniraju pravila ispod njega. Zamijenite A s B, a zatim B s C i završit ćete s C.",
     "**Za promjenu samo prijevoda, postavite opseg.** U dvojezičnoj datoteci odaberite \"samo drugi redak\"; unosi s samo jednim retkom ostaju netaknuti pod bilo kojom postavkom jednog retka — alat ne pogađa koja je strana izvorna.",
     "**Tablica pojmova nije spremljena.** Prazna je svaki put kada otvorite stranicu, stoga čuvajte vlastitu tekstualnu datoteku i proslijedite je dalje."
    ]
   },
   {
    "h2": "Povezani alati i vodiči",
    "ps": [
     "Cijeli vodič potražite u [[Kako skupno zamijeniti pojmove u titlovima|/guides/glossary.html]]; ako je sadržaj neuredan, najprije pokrenite [[Čišćenje titlova|/clean.html]]; jednom kada su imena usklađena i trebate druge jezike, prijeđite na [[Prevođenje titlova|/translate.html]]; a rezultat provjerite kroz [[Kontrolu kvalitete titlova|/qc.html]]."
    ]
   }
  ]
 },
 "subtitle-quality-check": {
  "seo": {
   "title": "Kontrolni popis za provjeru kvalitete titlova prije isporuke – AI-SRTSub",
   "desc": "Kontrolni popis za isporuku titlova: preklapanja, brzina čitanja, širina retka i interpunkcija najčešće ne prolaze. Pokrenite 17 pravila provjere — pola problema rješava se jednim klikom.",
   "h1": "Što provjeriti prije isporuke",
   "intro": "Gotovi titlovi nisu spremni za isporuku: problemi koje gledatelji primijete na prvi pogled upravo su oni koje ne možete vidjeti nakon što ste ih pogledali sto puta. Ovaj kontrolni popis obuhvaća taj završni prolaz.",
   "ctaText": "Pokreni provjeru kvalitete titlova"
  },
  "body": [
   {
    "h2": "Zašto sami ne možete vidjeti probleme",
    "ps": [
     "Svatko tko izrađuje titlove pre dobro poznaje sadržaj — znate što svaki redak sljedeći govori, tako da se ništa nikada ne čini prebrzo; vidjeli ste raspored stotine puta, i vaše oči same preskaču nedostatke. Stoga provjera prije isporuke se ne može oslanjati na „ponovno gledanje od vrha“ — mora se **mjeriti prema brojevima**: brzina čitanja, širina retka, trajanje, preklapanja. Neka brojke odluče."
    ]
   },
   {
    "h2": "Šest najčešćih propusta",
    "ps": [
     "Rangirano prema tome koliko često potkopavaju isporuku:"
    ]
   },
   {
    "h2": "Kako provjeriti",
    "ps": [
     "Otvorite [[Kontrolu kvalitete titlova|/qc.html]] i ubacite svoje titlove; postavite jezik na automatsko prepoznavanje (27 jezika, svaki sa svojim razinama pravila). Izvješće navodi nalaze na tri razine — **pogreške / upozorenja / savjeti** — svaka s brojem unosa i izmjerenom vrijednošću. S pogreškama se mora pozabaviti (iskrivljeni tekst, format vremenskih oznaka, završetak raniji od početka, pokvareno numeriranje); upozorenja ovise o slučaju (preklapanja, brzina čitanja, širina retka, trajanje); savjeti služe za dotjerivanje (položaj prijelaza retka, razmaci, interpunkcija)."
    ],
    "img": {
     "file": "qc-report",
     "alt": "Izvješće o provjeri kvalitete: popis problema u tri razine, svaki nalaz s brojem unosa i usporedbom izmjerene vrijednosti i praga",
     "cap": "Izvješće u tri razine koje daje broj unosa i izmjerenu vrijednost za svaki nalaz"
    }
   },
   {
    "h2": "Što se može popraviti jednim klikom",
    "ps": [
     "Numeriranje, prazni unosi, ponovno omotavanje, razmaci i interpunkcija — sve što **ostavlja vrijeme netaknutim** — može se automatski popraviti; popravci koji **mijenjaju vrijeme** (zamjena početka i završetka, pomicanje preklapanja, skraćivanje ili rastezanje trajanja) prema zadanim su postavkama označeni i treba ih označiti tek nakon što potvrdite utjecaj. **Brzina čitanja preko granice nema automatski popravak** — stroj ne može znati koju riječ skratiti, stoga sami skratite prijevod ili malo olabavite vrijeme; pogledajte [[Titlovi su prebrzi za čitanje|/guides/subtitle-too-fast.html]]. Nakon popravka, nova provjera pokreće se automatski, a izvješće broji samo ono što je stvarno popravljeno."
    ]
   },
   {
    "h2": "Kad ste već kod toga",
    "ps": [
     "Stranica izvješća može izravno preuzeti običnu tekstualnu datoteku `.qc.txt` izvješća — priložite je uz isporuku tako da druga strana na prvi pogled vidi što ste provjerili. Za svježe prevedene titlove, pokrenite provjeru kvalitete prije isporuke; ukupno odstupanje vremenske crte drugačija je vrsta problema — ako brzina čitanja i dalje ne prolazi nakon provjere, pogledajte [[Titlovi gube sinkronizaciju|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "subtitle-speed-converter": {
  "seo": {
   "title": "Sinkronizirajte titlove nakon promjene brzine videa – AI-SRTSub",
   "desc": "Videozapis je ubrzan ili usporan, a titlovi se više ne poklapaju: unesite faktor brzine u korak skaliranja prema stopi i cijela se vremenska traka prilagođava videu.",
   "h1": "Prilagodba titlova nakon promjene brzine videa",
   "intro": "Videozapis je u cjelini postao brži ili sporiji, a titlovi su ostali u izvornom tempu — sve nakon određene točke nije usklađeno. Unesite faktor i cijela se vremenska traka skalira s videozapisom.",
   "ctaText": "Otvorite uređivač vremena"
  },
  "body": [
   {
    "h2": "Kada koristiti stopu umjesto pomaka",
    "ps": [
     "Videozapis je ubrzan ili usporan **u cijelosti** (recimo 0.9x ili 1.25x u softveru za uređivanje), pri čemu je svaki dio zadržao svoj izvorni ritam: početak odgovara, a što dalje idete, to je razlika veća — s konstantnim omjerom. To je problem stope. Ako je cijela datoteka jednostavno pomaknuta za fiksni iznos bez rastezanja, pomak je dovoljan — pogledajte [[pomicanje cijele datoteke s titlovima ranije ili kasnije|/guides/shift-subtitle-timing.html]]."
    ]
   },
   {
    "h2": "Koji broj unijeti",
    "ps": [
     "Titlovi moraju pratiti videozapis, stoga unesite **faktor za koji se videozapis stvarno promijenio**: ubrzanje od 1.25x znači da se vremena titlova množe s 1.25 kako bi se uhvatio korak; usporavanje od 0.9x množi se s 0.9. U uređivaču vremena dodajte korak **Skaliraj prema stopi** i stavite faktor u polje za vrijednost."
    ],
    "img": {
     "file": "shift-step-rate",
     "alt": "Korak skaliranja prema stopi s faktorom u polju za vrijednost",
     "cap": "Faktor iznad 1 rasteže vremensku traku (za ubrzani videozapis), a ispod 1 ju sažima (za usoreni)."
    }
   },
   {
    "h2": "Po čemu se ovo razlikuje od pomaka",
    "ps": [
     "Pomak **pomiče** vremena svakog titla za isti fiksni iznos i zadržava trajanje titlova; stopa **množi** i početak i kraj, tako da se i trajanja skaliraju. Nakon promjene brzine, sama su se trajanja promijenila — upravo je zato potrebna stopa."
    ]
   },
   {
    "h2": "Ako niste sigurni u vezi s faktorom",
    "ps": [
     "Kada se faktor izgubi, vratite se na **dva sidra**: unesite stvarna vremena videa prvog i posljednjeg titla i sve između proporcionalno se raširi — što je ekvivalentno pronalaženju ispravnog faktora. Pogledajte [[titlovi sve više gube sinkronizaciju|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "subtitle-too-fast": {
  "seo": {
   "title": "Titlovi se prebrzo čitaju – Ispravite brzinu čitanja – AI-SRTSub",
   "desc": "Titlovi se prebrzo čitaju — kratko trajanje ili predugačak tekst? Kontrola kvalitete označava unose iznad 20 znakova u sekundi (9 hanzi za KJK); trajanja se automatski ispravljaju, tekst je potrebno urediti.",
   "h1": "Titlovi se prebrzo čitaju",
   "intro": "Gledatelji stalno pauziraju? Krivac je brzina čitanja. Kako ju izmjeriti, kako ju ispraviti i kada uređivati tekst umjesto vremena — sve u jednom vodiču.",
   "ctaText": "Provjerite brzinu čitanja"
  },
  "body": [
   {
    "h2": "Što je brzina čitanja?",
    "ps": [
     "Brzina čitanja zapravo je **mogu li gledatelji završiti s čitanjem titla u vremenu dok je on na ekranu**. Matematika je jednostavna: širina teksta podijeljena sa sekundama na ekranu. Uobičajene industrijske granice: 9 znakova pune širine u sekundi za kineski, japanski i korejski (18 jedinica polusvjetske širine), 20 jedinica poluširine u sekundi za ostale jezike. Redak s 20 hanzi znakova koji traje 1 sekundu daje 40 jedinica širine u sekundi — više nego dvostruko više od granice, i gledatelji ga nikada neće stići pročitati."
    ]
   },
   {
    "h2": "Prvo razaznajte o kojoj se vrsti brzine radi",
    "ps": [
     "„Prebrzo za čitanje” zapravo su dva različita problema: **prekratko trajanje** — dio nestaje nakon stotinjak ili dvjesto milisekundi, obično pogreška u vremenu ili ostatak uređivanja; **predugačak tekst** — trajanje je u redu, ali redak natrpa 30 hanzi znakova, i nikakvo ograničenje brzine ga neće spasiti. Rješenja su suprotna, stoga prvo utvrdite s čime imate posla."
    ],
    "img": {
     "file": "qc-rules",
     "alt": "Postavka ograničenja brzine čitanja na stranici kontrole kvalitete, zadano na 18 za KJK i 20 za ostale jezike",
     "cap": "Pragovi brzine čitanja kontrole kvalitete: 18 jedinica širine u sekundi za KJK, 20 za ostale jezike"
    }
   },
   {
    "h2": "Kako provjeriti",
    "ps": [
     "Otvorite [[Kontrola kvalitete titlova|/qc.html]] i ubacite svoje titlove. U izvješću je „prekratko trajanje” upozorenje koje prikazuje izmjerene milisekunde (prag: 833 milisekunde); „nečitljiva brzina” zaseban je nalaz koji prikazuje izmjerene jedinice širine u sekundi. Za dvojezične titlove računa se samo redak napisan na ciljnom jeziku — ta se dva jezika ne zbrajaju."
    ]
   },
   {
    "h2": "Kako to ispraviti",
    "ps": [
     "**Prekratko trajanje**: rješivo jednim klikom — dio se automatski produžuje na 833 milisekunde, bez prekoračenja početka sljedećeg dijela (ispravak ne smije stvarati nova preklapanja). **Predugačak tekst**: nema automatskog ispravljanja — stroj ne može znati koju riječ skratiti. Dva puta, vaš izbor: skratite prijevod (kliknite ćeliju u alatu za prevođenje da biste ju uredili) ili rastegnite trajanje ovog dijela (samo ako postoji razmak prije sljedećeg dijela; za opće probleme s vremenskom trakom pogledajte [[Pomicanje vremenske trake|/shift.html]]). Ponovno pokrenite kontrolu kvalitete kako biste potvrdili da je brzina čitanja ponovno unutar praga."
    ]
   },
   {
    "h2": "Nemojte pretjerivati s ispravkom",
    "ps": [
     "Zadovoljavanje ograničenja brzine ne znači udobno gledanje: natrpavanje svakog dijela točno do 9 znakova u sekundi čini cijeli film zamornim. Kao opće pravilo, većinu vremena ostanite na oko 70% praga, a odlomcima s gustim dijalozima dopustite da s vremena na vrijeme malo pređu granicu. Blokovi titlova koji trepere prečesto sami po sebi predstavljaju problem — prije isporuke pokrenite cijeli skup metrika, pogledajte [[Što provjeriti prije isporuke|/guides/subtitle-quality-check.html]]."
    ]
   }
  ]
 },
 "subtitles-out-of-sync": {
  "seo": {
   "title": "Titlovi sve više gube sinkronizaciju? Popravite to – AI-SRTSub",
   "desc": "Početak je dobar, do sredine filma kasni nekoliko sekundi, a na kraju je neupotrebljiv: to je progresivno pomicanje, obično neusklađenost broja sličica u sekundi ili promjena brzine videa. Dva sidra to rješavaju.",
   "h1": "Titlovi sve više gube sinkronizaciju: uzroci i rješenja",
   "intro": "Dobro na početku, nekoliko sekundi kasni nakon pola sata, beznadno na kraju. Ova vrsta pomaknute sinkronizacije ima poznate uzroke — i poznato rješenje.",
   "ctaText": "Popravite ovu datoteku"
  },
  "body": [
   {
    "h2": "Prvo razaznajte dvije vrste neusklađenosti",
    "ps": [
     "Neusklađenost dolazi u dvije vrste: **ujednačeni pomak** znači da svaki dio kasni (ili žuri) za isti iznos, otprilike jednak od početka do kraja; **progresivno pomicanje** znači da je početak točan, a pogreška raste prema kraju, potencijalno dostižući minute. Ovaj članak govori o drugoj vrsti — za prvu pogledajte [[pomicanje cijele datoteke s titlovima ranije ili kasnije|/guides/shift-subtitle-timing.html]]."
    ]
   },
   {
    "h2": "Zašto se sve više pomiče",
    "ps": [
     "Pomicanje dolazi iz **dva različita sata**: tri najčešća uzroka su (1) neusklađenost broja sličica u sekundi — titlovi filma s 24 sličice u sekundi na izvoru s 25 sličica gube više od sekunde u minuti; (2) videozapis je ubrzan ili usporan, dok su titlovi zadržali svoj izvorni tempo; (3) VFR snimka (varijabilni broj sličica u sekundi) čija je vremenska traka ionako neravnomjerna. Ono što dijele: pogreška raste otprilike linearno s vremenom reprodukcije."
    ]
   },
   {
    "h2": "Riješite to s dva sidra",
    "ps": [
     "Budući da pogreška raste linearno, fiksiranje točnog vremena na svakom kraju i ponovno proporcionalno širenje sredine vraća sve na svoje mjesto. U uređivaču vremena dodajte **korekciju s dva sidra**: dva „trenutna” polja automatski se popunjavaju izvornim vremenima ove datoteke; gledate videozapis i unosite **kada se prvi i posljednji dio doista pojavljuju** u dva „ciljna” polja."
    ],
    "img": {
     "file": "shift-step-two",
     "alt": "Korekcija s dva sidra: trenutna vremena automatski ispunjena, ciljna vremena za unos",
     "cap": "Uzmite sidra na dvjema krajnostima — najmanja i najveća izvorna pogreška — i sve između ponovno se proporcionalno širi."
    }
   },
   {
    "h2": "Kako provjeriti rezultat",
    "ps": [
     "Nakon pokretanja, ploča s rezultatima prikazuje izvorna i nova vremena svakog dijela **jedno pored drugoga**. Provjerite tri mjesta: prvi dio, jedan u sredini i posljednji — tri položaja s najmanjom, srednjom i najvećom izvornom pogreškom. Ako sva tri sjednu na mjesto, sjest će i cijela datoteka."
    ],
    "img": {
     "file": "shift-result",
     "alt": "Ploča s rezultatima: vremena prije i poslije jedno pored drugoga, s gumbom za preuzimanje",
     "cap": "Nova vremena srednjih dijelova trebala bi pasti između dvaju krajeva — znak da je omjer ispravan."
    }
   },
   {
    "h2": "Kada dva sidra nisu dovoljna",
    "ps": [
     "Korekcija s dva sidra pretpostavlja da je pogreška **linearna**. Ako je izvor VFR snimka zaslona sa skokom broja sličica u sekundi u sredini datoteke, linearno rastezanje ne može popraviti sredinu — uzmite očito neusklađen srednji dio kao treću točku, podijelite datoteku ondje i pokrenite korekciju s dva sidra na svakoj polovici. Također, nakon popravka, ponovno pregledajte središnji dio pri normalnoj brzini kako biste potvrdili da nije ostala lokalna neusklađenost."
    ]
   }
  ]
 },
 "table": {
  "seo": {
   "title": "Pretvorba titlova u Excel / CSV – U oba smjera – AI-SRTSub",
   "desc": "Dvosmjerni vodič: izvezite SRT/VTT u Excel ili CSV za lektoriranje redak po redak, a zatim uredeni list ponovno uvezite kao titlove. Potrebna su tri stupca, bilo koji redoslijed; vrijeme se čuva kao tekst.",
   "h1": "Kako pretvoriti titlove u Excel / CSV",
   "intro": "Lektoring i prevođenje lakši su u tabličnom kalkulatoru. Izvezite titlove u Excel ili CSV, uredite redak po redak, a zatim ih pretvorite natrag — vremenski stupci ostaju u tekstu, a prijelomi redaka unutar dijaloga su sačuvani.",
   "ctaText": "Otvorite pretvarač tablica"
  },
  "body": [
   {
    "h2": "Što ovaj alat radi",
    "ps": [
     "Titlovi su redci dijelova, a tablični kalkulatori su redci zapisa — kada je jednom u obliku tablice, lektoring, komentiranje i masovno prevođenje mogu se obaviti alatima koje već poznajete. Podržana su oba smjera:"
    ]
   },
   {
    "h2": "Učitajte i odaberite smjer",
    "ps": [
     "Povucite datoteku unutra ili ju potražite. Svaki smjer zahtijeva drugu vrstu datoteke: **u tablicu** uzima datoteke titlova (SRT / VTT), **u titlove** uzima datoteke tabličnog kalkulatora (CSV / Excel, i .xlsx i .xls). Odaberite krivi način rada i stranica će vam reći koju vrstu datoteke taj način rada traži.",
     "⚠️ Ova stranica čita samo UTF-8. Ako se vaši titlovi otvaraju kao zaslon pun upitnika ili kvadratića, prvo ih provucite kroz [[Popravak kodiranja|/repair.html]] — oštećeno kodiranje ovdje se čita samo kao zamjenski znakovi."
    ],
    "img": {
     "file": "table-up",
     "alt": "Područje prijenosa pretvarača tablica: zona ispuštanja i dva prekidača načina rada",
     "cap": "Svaki način rada traži drugu datoteku: titlovi unutra, tablični kalkulator van — i natrag"
    }
   },
   {
    "h2": "Izvoz titlova u tablicu",
    "ps": [
     "Odaberite „u tablicu”, ispustite titl, i pretpregled navodi svaki dio: indeks, početak, kraj, tekst. Traka stanja daje broj dijelova i ukupno trajanje. Zatim kliknite „Preuzmi Excel (.xlsx)” ili „Preuzmi CSV”.",
     "Razlika između to dvoje: .xlsx je prava datoteka tabličnog kalkulatora gdje Excel ne može preoblikovati vaš vremenski stupac iza vaših leđa; CSV je prenosiviji, ali Excel može protumačiti vremenski stupac kao nešto drugo prilikom otvaranja. Ako se to dogodi, odaberite vremenski stupac i postavite njegov format na „Tekst” — ili jednostavno upotrijebite .xlsx."
    ],
    "img": {
     "file": "table-prev",
     "alt": "Pretpregled tablice: stupci indeksa, početka, kraja i teksta s trakom stanja",
     "cap": "Pregledan svaki dio; traka stanja daje broj dijelova i ukupno trajanje"
    }
   },
   {
    "h2": "Uvoz tablice natrag u titlove",
    "ps": [
     "Odaberite „u titlove”, ispustite tablicu, i ovo je pravilo stupaca: potrebna su tri stupca za **početak, kraj i tekst** (engleska zaglavlja Start / End / Text također rade), u **bilo kojem redoslijedu**. `00:00:01,500` i `00:00:01.500` su prihvaćeni; redci koji se ne mogu analizirati preskaču se umjesto da osude cijelu datoteku.",
     "Rezultat je naveden dio po dio u pretpregledu; potvrdite, a zatim preuzmite SRT ili VTT. Ako ta tri stupca nedostaju, dobit ćete poruku koja vam govori da provjerite zaglavlja — obično zato što je pri izvozu korišten drugi naziv ili redak zaglavlja nije prvi redak."
    ],
    "img": {
     "file": "table-back",
     "alt": "Područje rezultata titlova: uvezeni titlovi navedeni dio po dio",
     "cap": "Nepoznati stupci se prijavljuju, nikada se ne zanemaruju tiho"
    }
   },
   {
    "h2": "Često postavljana pitanja",
    "ps": [
     "**Excel pogrešno prikazuje vremenski stupac?** Upotrijebite .xlsx i to se nikada neće dogoditi. Ako morate koristiti CSV: odaberite vremenski stupac i postavite format ćelije na „Tekst” prije otvaranja.",
     "**Moraju li zaglavlja stupaca biti na engleskom?** Ne. Start / End / Text prepoznaju se na bilo kojem jeziku koji ova stranica podržava, a velika i mala slova nisu važna.",
     "**Jesu li moji prijelomi redaka i dalje tu nakon uvoza?** Da. Prijelomi redaka unutar dijaloga su sačuvani, sve do izvornog prelamanja.",
     "**Je li ASS podržan?** Ova stranica obrađuje samo SRT i VTT. ASS nosi direktive stila — prvo ga pretvorite u SRT pomoću [[Pretvarač formata|/convert.html]].",
     "**Koliko datoteka odjednom?** Jednu. Za obradu desetaka ili stotina, upotrijebite [[Skupna pretvorba|/batch.html]] (koja samo pretvara formate i ne prolazi kroz tablicu)."
    ]
   },
   {
    "h2": "Privatnost",
    "ps": [
     "Pretvorba se odvija u potpunosti u vašem pregledniku. Sadržaj titlova se nikada ne šalje na poslužitelj."
    ]
   },
   {
    "h2": "Povezani alati i vodiči",
    "ps": [
     "Ako vam treba samo korak pretvorbe titlova u Excel, pogledajte [[Pretvorba titlova u Excel|/guides/srt-to-excel.html]]; za naknadno prevođenje na drugi jezik, [[Prevođenje titlova|/translate.html]]; deseci datoteka odjednom — [[Skupna pretvorba|/batch.html]]."
    ]
   }
  ]
 },
 "translate": {
  "seo": {
   "title": "AI prevođenje titlova – prijenos do dvojezičnog izvoza – AI-SRTSub",
   "desc": "Prevedite titlove uz pomoć AI-ja: prijenos SRT/VTT/ASS datoteka, odabir između 100 jezika, ujednačavanje imena rječnikom, izvoz dvojezičnih titlova. Besplatan početak, podržan vlastiti API ključ.",
   "h1": "Kako koristiti AI prevođenje titlova",
   "intro": "Potpuni radni tijek za jednu datoteku titlova, od prijenosa preko prevođenja do izvoza: što je na ekranu, na što kliknuti i što dobivate u svakom koraku.",
   "ctaText": "Otvorite alat za prevođenje"
  },
  "body": [
   {
    "h2": "Što ovaj alat radi",
    "ps": [
     "Preodi titlove s jednog jezika na drugi i izvozi spremnu datoteku titlova. Uobičajene potrebe:"
    ]
   },
   {
    "h2": "Učitajte titlove",
    "ps": [
     "Kliknite „Odaberite datoteku titlova” ili zalijepite tekst titlova izravno u lijevo polje za unos. Podržano je šest formata: SRT, VTT, ASS, SSA, SBV i TXT. Nemate datoteku pri ruci? Kliknite „Učitaj uzorak” da biste vidjeli kako radi. Nakon raščlambe, srednji stupac prikazuje tablicu titlova s indeksom, vremenskom trakom i izvornim tekstom za svaki unos."
    ],
    "img": {
     "file": "translate-upload",
     "alt": "Područje uvoza alata za prevođenje: odaberite datoteku titlova, polje za lijepljenje i gumb za učitavanje uzorka",
     "cap": "Lijevi stupac „Učitaj titlove”: odaberite datoteku, zalijepite tekst ili učitajte uzorak"
    }
   },
   {
    "h2": "Odaberite jezik i stil",
    "ps": [
     "„Izvorni jezik” može ostati na automatskom prepoznavanju; „ciljni jezik” bira se iz 100 jezika. Dostupno je pet stilova prevođenja: Uravnoteženi (zadano), Razgovorni, Službeni profesionalni, Stil sinkronizacije i Prilagođeni. „Stil sinkronizacije” odgovara filmskim i televizijskim dijalozima; „Službeni profesionalni” odgovara dokumentarcima i tečajevima."
    ],
    "img": {
     "file": "translate-lang",
     "alt": "Postavke jezika i stila prevođenja: padajući izbornici izvornog jezika, ciljnog jezika i pet stilova",
     "cap": "„Jezik” i „stil prevođenja”: izvor može automatski prepoznati, 75 izbora cilja"
    }
   },
   {
    "h2": "Rječnik: održavajte dosljednost imena",
    "ps": [
     "AI prevodi u serijama, tako da se isto ime u različitim serijama može pojaviti na dva različita načina. Napišite pravila „izvor → mora biti prevedeno kao” u rječnik; prije svake serije alat ga skenira i prati svako podudaranje. Jedno pravilo po retku; strelice mogu biti `->`, `=>`, `→` ili Tab; samostalni izvorni izraz znači da se ostavlja nepreveden; nekoliko pravopisnih oblika može dijeliti jedan pripis putem `|`. Kliknite „✨ AI izvlačenje” kako bi AI najprije izvukao vlastita imena iz videa u tablicu, a zatim ih uredite i prevedite."
    ],
    "img": {
     "file": "translate-glossary",
     "alt": "Područje rječnika i vlastitih imena: polje za unos rječnika s gumbima za AI izvlačenje i spremanje",
     "cap": "Rječnik „ujedinjenih imena”: AI izvlači vlastita imena, automatski se učitava za nove videe jednom kada se spremi"
    }
   },
   {
    "h2": "Proces prevođenja",
    "ps": [
     "Kliknite „▶ Pokreni prevođenje” u gornjoj traci. Srednja traka sa statistikom u stvarnom vremenu prikazuje unose, prevedeno, očišćene poštapalice i grupe rečenica koje se protežu kroz više unosa; traka napretka prikazuje procijenjeno preostalo vrijeme i iskorištene tokene. Tijekom prevođenja kliknite bilo koju ćeliju za prevođenje u tablici kako biste uredili tekst — promjene se spremaju na vašem računalu i preživljavaju osvježavanje. Zatvorite stranicu usred rada i ponudit će vam se nastavak tamo gdje je stalo. Kada se jedna rečenica proteže kroz nekoliko unosa, grupa se spaja, prevodi i ponovno popunjava prema trajanju."
    ],
    "img": {
     "file": "translate-workspace",
     "alt": "Radni prostor prevođenja: traka sa statistikom, traka napretka i tablica titlova koja se može uređivati",
     "cap": "Srednji radni prostor: traka sa statistikom + traka napretka + tablica titlova s mogućnošću uređivanja klikom"
    }
   },
   {
    "h2": "Izvoz",
    "ps": [
     "U desnom stupcu najprije odaberite oblik sadržaja: samo prijevod (jedjezični), dvojezični s izvornikom na vrhu ili dvojezični s prijevodom na vrhu; zatim format datoteke: SRT, WebVTT, SBV, ASS ili TXT. Odabirom ASS-a dodaju se dva rasporeda: podijeljeni zasloni gore/dolje i složeni donji redci. Sadržaj i format slobodno se kombiniraju u 14 stilova izvoza. Širina dvojezičnog retka postavlja se zasebno. Kliknite „Preuzmi titlove” da biste spremili datoteku ili „Kopiraj u međuspremnik” da biste ju odmah zalijepili."
    ],
    "img": {
     "file": "translate-export",
     "alt": "Izvozna ploča: tri oblika sadržaja, pet formata datoteka i postavke širine dvojezičnog retka",
     "cap": "Izvoz desnog stupca: prvo odaberite oblik sadržaja, zatim format datoteke"
    }
   },
   {
    "h2": "Trošak i privatnost",
    "ps": [
     "Zadani model ne zahtijeva prijavu ni ključ — radi iz kutije s kvotama po zahtjevu: dnevno ograničenje po IP-u plus dnevni dodatak za cijelu stranicu. Za velike serije unesite vlastiti API ključ pod „Motor za prevođenje”. Privatnost, prema obavijesti na stranici: titlovi za zadani model prosljeđuju se putem poslužitelja ove stranice davatelju usluga; prilagođenim API-jem upravlja izravno davatelj kojeg unesete, a ključ ostaje u vašem pregledniku. Raščlamba, prelamanje redaka i dvojezični raspored izvršavaju se lokalno u pregledniku."
    ]
   },
   {
    "h2": "Često postavljana pitanja",
    "ps": [
     "**Drugi jezici pomiješani u prijevodu?** Alat detektira odstupanje jezika i automatski prevodi ponovno; ako nekoliko unosa i dalje izgleda pogrešno, kliknite ćeliju i ispravite ih ručno.",
     "**Što je s stihovima pjesama?** „Filtriranje sadržaja” nudi tri opcije za stihove: prevedi stihove, zadrži izvornik ili ih izbriši.",
     "**Nedosljedni prijevodi imena?** Dodajte nedosljedne pravopisne oblike u rječnik i ponovno prevedite; rječnik ima prednost pred globalnom postavkom „upravljanja vlastitim imenima”.",
     "**Želite li engleski na vrhu, a kineski dolje?** Pri izvozu odaberite „Dvojezično · izvornik na vrhu”; za kineski na vrhu i engleski dolje, odaberite „Dvojezično · prijevod na vrhu”."
    ]
   },
   {
    "h2": "Povezani alati i vodiči",
    "ps": [
     "Krivi format? Počnite s [[pretvorbom formata|/convert.html]]; vremenska traka nije usklađena? Upotrijebite [[prilagodbu vremenske trake|/shift.html]]; prije predaje provjerite ju kroz [[kontrolu kvalitete titlova|/guides/subtitle-quality-check.html]]."
    ]
   }
  ]
 },
 "translate-english-to-chinese": {
  "seo": {
   "title": "Prevedi engleske titlove na kineski – AI-SRTSub",
   "desc": "Prevedi engleske titlove na kineski: učitaj SRT/VTT/ASS, odaberi pojednostavljeni ili tradicionalni te izvezi samo kineske ili dvojezične titlove. – AI-SRTSub",
   "h1": "Prevedi engleske titlove na kineski",
   "intro": "Engleski SRT unutra, kineski (ili englesko-kineski dvojezični) titlovi van: učitaj, odaberi ciljni jezik, izvezi — sve na jednoj stranici.",
   "ctaText": "Prevedi engleske titlove"
  },
  "body": [
   {
    "h2": "Kada vam je to potrebno",
    "ps": [
     "Titl koji ste preuzeli je samo na engleskom i ne možete pratiti; ili želite kineske titlove za članove obitelji koji ne čitaju engleski. Ono što vam treba dolazi u jednom od tri oblika — **samo kineski titlovi** ili dvojezični titlovi s **kineskim gore, engleskim dolje** odnosno **engleskim gore, kineskim dolje** — a ovaj alat daje sva tri."
    ]
   },
   {
    "h2": "Kako to učiniti",
    "ps": [
     "Otvorite [[AI prevoditelj titlova|/translate.html]] i ubacite svoju datoteku s engleskim titlovima (SRT, VTT, ASS, SSA, SBV i TXT su prepoznati ili jednostavno zalijepite tekst). Ostavite „Izvorni jezik” na automatskom prepoznavanju, postavite „Ciljni jezik” na pojednostavljeni ili tradicionalni kineski i kliknite „▶ Započni prevođenje”. Kada završi, odaberite oblik sadržaja na ploči za izvoz s desne strane: samo prijevod (jednojezični), dvojezično · izvorno gore (engleski iznad, kineski ispod) ili dvojezično · prijevod gore (kineski iznad, engleski ispod), zatim odaberite format datoteke i preuzmite."
    ],
    "img": {
     "file": "translate-export",
     "alt": "Ploča za izvoz: samo prijevod, dvojezično s izvornikom gore i dvojezično s prijevodom gore",
     "cap": "Odaberite oblik sadržaja pri izvozu: samo kineski ili dvojezično s engleskim/kineskim gore"
    }
   },
   {
    "h2": "Dva uobičajena problema",
    "ps": [
     "**Imena se prevode nedosljedno?** AI prevodi u serijama, tako da isto ime može ispasti na dva načina. Stavite parove „izvorni → prevedeni naziv” u rječnik (npr. `Watson → Huasheng`) kako bi sve ostalo dosljedno.",
     "**Titlovi gube sinkronizaciju sa slikom?** Prvo prevedite, a zatim popravite vrijeme: traka s alatima za vremensku traku na vrhu radnog prostora ima globalnu kontrolu pomaka i skaliranja — pogledajte [[Titlovi gube sinkronizaciju prema kraju|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "videosub": {
  "seo": {
   "title": "Vađenje ugrađenih videotitlova – MKV / MP4 zapisi – AI-SRTSub",
   "desc": "Izravno pročitajte zapise titlova unutar datoteka MKV, WebM, MP4 i MOV te izvezite SRT / VTT / ASS / TXT. Bez prijenosa, bez transkodiranja, navedeni su svi jezični zapisi, istaknuti slikovni titlovi.",
   "h1": "Kako izvući titlove ugrađene u videozapis",
   "intro": "Pročitajte zapis titla zatvoren unutar MKV / MP4 datoteke izravno kao SRT — videozapis se nikada ne prenosi, sve se čita u pregledniku.",
   "ctaText": "Otvori vađenje videotitlova"
  },
  "body": [
   {
    "h2": "Što ovaj alat radi",
    "ps": [
     "Titlovi mogu biti zatvoreni unutar videodatoteke umjesto da stoje samostalno. Da biste ih uredili, preveli ili uparili, prvo ih morate izvući — to je jedina stvar koju ova stranica radi."
    ]
   },
   {
    "h2": "1 Dodajte videozapis",
    "ps": [
     "Povucite videodatoteku u prvi stupac ili kliknite za odabir. Prepoznati su samo **MKV / WebM** i **MP4 / MOV**; drugi spremnici neće dati nikakav zapis.",
     "Datoteka nikada ne napušta vaše računalo — nema koraka prijenosa. Alat čita u malim dijelovima po pomaku, tako da film od nekoliko gigabajta ne popunjava memoriju, ali prvo čitanje mora jednom proći kroz podatke o zapisu."
    ],
    "img": {
     "file": "videosub-up",
     "alt": "Područje za dodavanje videozapisa na stranici za vađenje ugrađenih titlova",
     "cap": "Podržani su MKV / WebM i MP4 / MOV, a datoteka nikada ne napušta vaš uređaj"
    }
   },
   {
    "h2": "2 Zapisi ugrađenih titlova",
    "ps": [
     "Kada se čitanje završi, drugi stupac prikazuje zapise titlova u datoteci **jedan po retku**, obično s jezikom i nazivom zapisa (na primjer „Chinese”, „English”, „Forced”). Kliknite redak za izvlačenje tog zapisa.",
     "Kada datoteka sadrži samo jedan zapis titla, vađenje započinje automatski — nije potreban klik.",
     "**Slikovni titlovi se ne mogu izvući**: Blu-ray PGS i DVD titlovi slike su ugrađene u strujanje bez teksta koji se može uzeti, a stranica to jasno navodi; njima je potreban OCR."
    ],
    "img": {
     "file": "videosub-track",
     "alt": "Popis zapisa ugrađenih titlova, jedan po retku",
     "cap": "Jedan zapis po retku; kada postoji samo jedan, vađenje započinje automatski"
    }
   },
   {
    "h2": "3 Rezultat",
    "ps": [
     "„3 Rezultat” s desne strane prikazuje izvučeni tekst titla, s formatom izvoza iznad njega: **SRT / VTT / ASS / TXT**. Kliknite „Preuzmi” ili „Kopiraj”.",
     "Kada je izvorni zapis ASS, njegova vlastita zaglavlja stila i razlučivost vraćaju se nepromijenjeni — izvoz u formatu ASS čuva ih, dok izvoz u formatu SRT nosi samo tekst."
    ],
    "img": {
     "file": "videosub-out",
     "alt": "Područje rezultata s odabirom formata SRT / VTT / ASS / TXT",
     "cap": "Četiri formata izvoza; izvor u formatu ASS zadržava zaglavlje stila i razlučivost"
    }
   },
   {
    "h2": "Što ostaje netaknuto",
    "ps": [
     "Sama videodatoteka uopće se ne dira — samo čitanje, bez pisanja, bez transkodiranja, bez remuxiranja.",
     "Sadržaj titlova izlazi kakav jest: bez pogađanja kodiranja, bez korekcije vremenske trake. Ako su izvučeni titlovi iskrivljeni, to je problem kodiranja u izvornom zapisu — odnesite ih na [[Popravak iskrivljenog teksta|/repair.html]]."
    ]
   },
   {
    "h2": "Česta pitanja",
    "ps": [
     "**Postoji li doista način za obradu slikovnih titlova (PGS / DVD)?** Ne na ovoj stranici — to su slike bez slova. OCR mora biti prvi, a ova stranica to ne radi.",
     "**Izvučeni titlovi su pogrešno sinkronizirani – zašto?** Ova stranica ne ispravlja vremenske trake; ono što izađe jest ono što je bilo tamo. Za globalni pomak ili problem s brzinom koristite [[Prilagodba vremenske trake|/shift.html]].",
     "**Zašto je potrebno toliko vremena prije nego što se bilo što dogodi?** Veliku datoteku potrebno je skenirati dio po dio radi informacija o zapisima, a što je datoteka veća, to dulje traje; to se događa lokalno i nema nikakve veze s vašom vezom.",
     "**Mogu li koristiti ovu stranicu za vanjske datoteke titlova?** Ne morate — vanjski .srt / .ass ide izravno u [[Pretvorba formata|/convert.html]] ili drugi alat. Ova stranica namijenjena je titlovima koji su zatvoreni unutar videozapisa."
    ]
   },
   {
    "h2": "Privatnost",
    "ps": [
     "Videozapis se čita u potpunosti u pregledniku: ništa se ne prenosi, ništa se ne transkodira, ništa ne prolazi kroz poslužitelj. Zatvorite stranicu i pročitani podaci se oslobađaju."
    ]
   },
   {
    "h2": "Povezani alati i vodiči",
    "ps": [
     "Za prevođenje onoga što izvučete idite na [[Prevođenje titlova|/translate.html]], da biste napravili dvojezične pogledajte [[Dva načina za izradu dvojezičnih titlova|/guides/make-bilingual-subtitles.html]]; za razliku između ugrađenih i vanjskih zapisa te koje se mogu izvući, pogledajte [[Kako izvući titlove iz videozapisa|/guides/extract-subtitles-from-video.html]]."
    ]
   }
  ]
 },
 "vtt-to-srt": {
  "seo": {
   "title": "Pretvarač VTT u SRT – Pretvorite WebVTT titlove – AI-SRTSub",
   "desc": "Pretvorite VTT (WebVTT) titlove u SRT za uređivače i uređaje koji prihvaćaju samo SRT. Zaglavlje WEBVTT i blokovi NOTE automatski se čiste. Radi u vašem pregledniku.",
   "h1": "VTT u SRT",
   "intro": "Pretvorite VTT (WebVTT) titlove u SRT: ispustite datoteku, odaberite SRT, preuzmite. Zaglavlje i blokovi bilješki se čiste, a vremenske oznake vraćaju se na zapis sa zarezom.",
   "ctaText": "Pretvori VTT → SRT"
  },
  "body": [
   {
    "h2": "Kada vam je SRT ponovno potreban",
    "ps": [
     "CapCut, Premiere, većina stolnih uređaja i stariji alati za titlove prihvaćaju samo **SRT**. Titlovi preuzeti s weba ili s YouTubea obično dolaze u VTT formatu — pretvorite ih u SRT za izravan uvoz."
    ]
   },
   {
    "h2": "Što se čisti iz VTT-a",
    "ps": [
     "**Linija zaglavlja WEBVTT**, blokovi NOTE, blokovi STYLE/REGION i postavke znakova nakon linije s vremenom (poput align:start) nisu tekst titla — automatski se uklanjaju; numeriranje se obnavlja, a separator milisekundi vraća se s točke na zarez."
    ],
    "img": {
     "file": "convert-upload-vtt",
     "alt": "Područje za prijenos: učitana VTT datoteka, prepoznata kao VTT",
     "cap": "Datoteka sa zaglavljem WEBVTT odmah se prepoznaje kao VTT"
    }
   },
   {
    "h2": "Kako pretvoriti",
    "ps": [
     "Otvorite [[pretvarač|/convert.html]], ubacite VTT, odaberite **SRT - SubRip** kao izlaz, zatim pretvorite i preuzmite. Tekst i vremenske vrijednosti ostaju netaknuti."
    ],
    "img": {
     "file": "convert-result-srt",
     "alt": "Rezultat pretvorbe: SRT numeriranje s vremenskim oznakama sa zarezom",
     "cap": "Pretvoreni SRT: brojevi znakova + vremenske oznake sa zarezom"
    }
   }
  ]
 }
};
