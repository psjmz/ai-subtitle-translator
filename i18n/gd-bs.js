/* i18n/gd-bs.js —— 43 篇指南页的bs译文（由 _mkgd.js 生成，勿手改）
 * 源：_gd/bs.json（Gemini 翻译，_gemgd.js 产出）
 * 结构：{ <slug>: { seo:{title,desc,h1,intro,ctaText}, body:[{h2,ps[],img}] } }
 * ⚠️ server.js 自己 require 它，不被任何 html 引用 —— 部署时必须显式加进传输列表。
 */
module.exports = {
 "ass-to-srt": {
  "seo": {
   "title": "ASS u SRT konverter – Pretvorite ASS/SSA titlove – AI-SRTSub",
   "desc": "Pretvorite ASS (i SSA) titlove u običan SRT: tekst i vremenske oznake se izvlače takvi kakvi jesu, oznake stila ostaju iza. Za softver koji podržava samo SRT. Pokreće se u vašem pretraživaču.",
   "h1": "ASS u SRT",
   "intro": "Pretvorite ASS (ili SSA) titlove u SRT: otpustite fajl, odaberite SRT, preuzmite. Tekst i vremenske oznake se izvlače takvi kakvi jesu; oznake stila se ne prenose.",
   "ctaText": "Pretvori ASS → SRT"
  },
  "body": [
   {
    "h2": "Kada vam je SRT ponovo potreban",
    "ps": [
     "Programi za uređivanje, set-top boksovi, TV plejeri, alati za prevođenje — mnogi koraci u nizu prihvataju samo **SRT**. Fini stilovi i pozicioniranje u ASS-u tu nemaju nikakvu svrhu, tako da je običan SRT najsigurniji izbor."
    ]
   },
   {
    "h2": "Šta se dešava sa oznakama stila",
    "ps": [
     "Svaki ASS dio je linija dijaloga čiji tekst često nosi oznake prepisivanja kao što je `{\\fonts}` za boju, pokret ili efekte. Pretvaranjem u SRT **ove oznake se uklanjaju zajedno sa stilizovanjem**, čuvajući samo tekst i vrijeme; `\\N` prelazi u novi red postaju pravi prelazi u novi red. SSA fajlovi su takođe čitljivi."
    ],
    "img": {
     "file": "convert-result-srt",
     "alt": "Rezultat konverzije: SRT numerisanje i tekst izvučen iz ASS-a",
     "cap": "Izvučeni SRT: jedan broj po dijelu, čist tekst"
    }
   },
   {
    "h2": "Kako konvertovati",
    "ps": [
     "Otvorite [[konverter|/convert.html]], ubacite ASS fajl (radi i .ssa), odaberite **SRT - SubRip** kao izlaz, a zatim konvertujte i preuzmite. Idete u suprotnom pravcu? Pogledajte [[SRT u ASS|/guides/srt-to-ass.html]]."
    ]
   }
  ]
 },
 "batch": {
  "seo": {
   "title": "Kako grupno konvertovati titlove – Stotine u jedan ZIP – AI-SRTSub",
   "desc": "Vodič: ubacite desetine SRT/VTT fajlova, konvertujte ih u jedan format, preuzmite jedan ZIP. Ponovo numerisano, vremenske oznake normalizovane, neanalizirani fajl označeni umjesto da se uvuku u arhivu.",
   "h1": "Kako grupno konvertovati titlove",
   "intro": "Cijela sezona titlova obično mora završiti u jednom formatu, a otpremanje jednog po jednog traje vječno. Ubacite ih sve ovdje, konvertujte ih zajedno i preuzmite jedan ZIP — fajlovi koji se ne mogu analizirati bivaju označeni, a nikada tiho ubačeni kao da su radili.",
   "ctaText": "Otvori grupnu konverziju"
  },
  "body": [
   {
    "h2": "Šta ovaj alat radi",
    "ps": [
     "Titlovi za cijelu sezonu ili kolekciju obično moraju biti ujednačeni prije nego što se s njima bilo šta drugo uradi. Evo šta stranica za grupnu obradu radi:"
    ]
   },
   {
    "h2": "Dodavanje fajlova",
    "ps": [
     "Prevucite nekoliko fajlova titlova u isprekidani okvir zajedno ili kliknite i izaberite više njih odjednom. Lista fajlova prikazuje svaki: parsirani fajlovi prikazuju broj svojih dijelova, neparsirani su označeni jednostavno kao nepriznati. Gornja traka zbraja ukupan broj fajlova, dijelova i koliko ih je ostalo nepriznato.",
     "⚠️ Ova stranica čita samo UTF-8. Sve sa oštećenim kodiranjem (ekran pun upitnika ili kvadratića) prvo treba da prođe kroz [[Popravku pogrešnog kodiranja (Mojibake)|/repair.html]]."
    ],
    "img": {
     "file": "batch-list",
     "alt": "Lista fajlova: naziv i broj dijelova po fajlu, nepriznati označeni crvenom bojom",
     "cap": "Svaki fajl izlistan, a nepriznati označeni na licu mjesta"
    }
   },
   {
    "h2": "U šta sve konvertovati",
    "ps": [
     "Izaberite ciljni format pod \"Konvertuj sve u\" — SRT ili VTT. Svaki fajl na listi se zatim ponovo generiše u tom formatu: brojevi dijelova se ponovo numerišu od vrha, vremenske oznake se normalizuju prema ciljnim (SRT odvaja milisekunde zarezom, VTT tačkom).",
     "**Originalni nazivi fajlova se zadržavaju i mijenja se samo ekstenzija**; duplikati naziva dobijaju dodani broj tako da ništa ne prepiše drugo."
    ],
    "img": {
     "file": "batch-up",
     "alt": "Birač ciljnog formata i stanje liste, sa trakom stanja koja prikazuje broj fajlova i dijelova",
     "cap": "Odaberite ciljni format i svaki fajl se ponovo generiše; nazivima fajlova se mijenja samo ekstenzija"
    }
   },
   {
    "h2": "Pakovanje i preuzimanje",
    "ps": [
     "Kliknite na \"Upakuj u jedan ZIP i preuzmi\" i arhiva sadrži svaki konvertovani fajl. **Fajl bez prepoznatljivih dijelova ostaju izvan arhive** — ostaju na listi, označeni, umjesto da se miješaju kao da su uspjeli. Jednom upakovano, dobićete podatak koliko je fajlova unutra."
    ],
    "img": {
     "file": "batch-zip",
     "alt": "Oblast za pakovanje: dugme za preuzimanje ZIP-a i poruka o rezultatu pakovanja",
     "cap": "Nepriznati fajl ostaju izvan arhive i ostaju označeni na listi"
    }
   },
   {
    "h2": "Zašto se fajl označava kao nepriznat",
    "ps": [
     "Fajl se označava kada se iz njega ne mogu pročitati dijelovi. Tri uobičajena razloga: uopšte nije titl (recimo zalutali .txt fajl sa uputstvima), kodiranje nije UTF-8 (tako da se čita samo kao zamjenski znakovi) ili je sadržaj sveden u jedan blok bez vremenskih oznaka.",
     "Označeni fajlovi se mogu rješavati pojedinačno: problemi sa kodiranjem idu na [[Popravku pogrešnog kodiranja|/repair.html]], problemi sa formatom na [[Konverter formata|/convert.html]] za pojedinačnu konverziju prije povratka na listu."
    ]
   },
   {
    "h2": "Često postavljana pitanja (FAQ)",
    "ps": [
     "**Koliko fajlova mogu dodati?** Nema čvrstog ograničenja; zavisi od memorije vašeg pretraživača, a nekoliko stotina SRT fajlova je obično u redu.",
     "**Da li ovo mijenja moj dijalog?** Ne. Grupna konverzija mijenja samo format kontejnera — ponovno numerisanje dijelova i normalizaciju vremenskih oznaka — nikada ni jednu riječ dijaloga.",
     "**Šta ako trebam promijeniti sadržaj?** Ova stranica samo konvertuje formate. Za masovnu promjenu vremena koristite [[Podešavanje vremena|/shift.html]]; za promjenu teksta koristite [[Zamjenu izraza|/glossary.html]]; oba rade fajl po fajl.",
     "**Da li je ASS podržan?** Ova stranica konvertuje samo između SRT i VTT. ASS nosi stilizovanje — koristite [[Konverter formata|/convert.html]] na njemu pojedinačno."
    ]
   },
   {
    "h2": "Privatnost",
    "ps": [
     "Konverzija i pakovanje se odvijaju u potpunosti u vašem pretraživaču. Nikakav sadržaj titla se nikada ne šalje na server."
    ]
   },
   {
    "h2": "Povezani alati i vodiči",
    "ps": [
     "Šta promijeniti za cijelu sezonu i kojim redoslijedom — [[Grupno uređivanje cijele sezone titlova|/guides/batch-convert-srt.html]]; više formata za jedan fajl — [[Konverter formata|/convert.html]]; lektura u tabeli — [[Titl ⇄ tabela|/table.html]]."
    ]
   }
  ]
 },
 "batch-convert-srt": {
  "seo": {
   "title": "Grupno uređivanje cijele sezone – Šta je skalabilno, a šta nije – AI-SRTSub",
   "desc": "Sezoni obično treba ista promjena svuda: ujednačen format, vremenski pomak, terminologija. Evo šta se završava u jednom prolazu, šta ne može i kako postupiti sa fajlovima čija analiza ne uspije.",
   "h1": "Grupno uređivanje cijele sezone titlova",
   "intro": "Kada je potrebno promijeniti desetine fajlova titlova, to je obično ista promjena svaki put. Poznavanje dijelova koji se mogu obaviti u jednom prolazu štedi daleko više vremena nego mučenje kroz njih jedan po jedan.",
   "ctaText": "Otvori grupnu konverziju"
  },
  "body": [
   {
    "h2": "To je obično ista promjena svuda",
    "ps": [
     "Kada titlovi pođu po zlu za cijelu sezonu, rijetko koja epizoda ima svoj privatni problem — to je obično jedan uzrok koji pogađa svaku epizodu: ista grupa za izdanje je kodirala sve njih (tako da se format i vodeni žigovi poklapaju), svi su bili tempirani na istu verziju video zapisa (tako da se smjer i iznos pomaka slažu) ili su transliteracije počele da se razilaze tokom sezone.",
     "Prvo provjerite dvije epizode — jednu raniiju, jednu kasniju — i potvrdite da je to zaista **isti problem** prije bilo kakvog grupnog rada. Ako se njih dvije ne slažu, ovo nije nešto što grupna obrada može popraviti."
    ]
   },
   {
    "h2": "Šta se može uraditi u jednom prolazu",
    "ps": [
     "**Ujednačavanje formata** je jedina stvar koja se zaista završava u jednom prolazu: prevucite desetine SRT i VTT fajlova u [[Grupnu konverziju|/batch.html]] zajedno, odaberite ciljni format i preuzmite jedan ZIP. Ponovno numerisanje i normalizacija vremenskih oznaka dešavaju se u tom istom koraku, i nijedna riječ dijaloga se ne mijenja."
    ],
    "img": {
     "file": "batch-list",
     "alt": "Lista fajlova na stranici za grupnu obradu: broj dijelova po fajlu, nepriznati označeni crvenom bojom",
     "cap": "Ujednačen format je jedina stvar koja se zaista završava u jednom prolazu"
    }
   },
   {
    "h2": "Šta se mora uraditi fajl po fajl",
    "ps": [
     "Ovi nemaju tačku ulaza za grupnu obradu i zahtijevaju prolaz po fajl — iako obično postoji ekvivalent koji **treba uraditi samo jednom i onda se primjenjuje na cijelu sezonu**:"
    ]
   },
   {
    "h2": "Uspostavite pravi redoslijed",
    "ps": [
     "Kada treba uraditi nekoliko stvari, pogrešan redoslijed znači ponovni rad. Idite ovim redoslijedom:",
     "**Popravite kodiranje** → **ujednačite format** → **promijenite sadržaj** (vodeni žigovi, terminologija, vrijeme) → **QC (kontrola kvaliteta) na kraju**. Konvertovanje formata prije popravljanja kodiranja samo vam daje pogrešno kodiranje (mojibake) u drugom kontejneru; promjena sadržaja prije ujednačavanja formata znači rad sa nedosljednom podrškom alata."
    ],
    "img": {
     "file": "batch-zip",
     "alt": "Oblast za pakovanje: dugme za preuzimanje ZIP-a i poruka o rezultatu",
     "cap": "Prvo ujednačite formate, a zatim promijenite sadržaj"
    }
   },
   {
    "h2": "Rukovanje fajlovima koji nisu prepoznati",
    "ps": [
     "Fajlovi označeni kao nepriznati u grupnoj konverziji ostaju izvan ZIP-a i ostaju na listi. Tri uobičajena razloga: to nije fajl titla (zalutali readme), kodiranje nije UTF-8 ili je sadržaj sveden u jedan blok bez vremenskih oznaka.",
     "Problemi sa kodiranjem idu na [[Popravku pogrešnog kodiranja|/repair.html]] pojedinačno; problemi sa formatom na [[Konverter formata|/convert.html]] prije vraćanja na listu. **Nemojte gurati nepriznate fajlove u arhivu samo da biste povećali broj** — otkrivanje da vam nedostaje epizoda u plejeru košta mnogo više od minuta koji ovo štedi."
    ]
   },
   {
    "h2": "Povezani alati i vodiči",
    "ps": [
     "Kompletan vodič za grupnu obradu — [[Kako grupno konvertovati titlove|/guides/batch.html]]; ujednačeni vremenski pomaci — [[Kako podesiti vrijeme titla|/guides/shift.html]]; posljednji prolaz prije isporuke — [[Kontrola kvaliteta titlova|/qc.html]]."
    ]
   }
  ]
 },
 "bilingual": {
  "seo": {
   "title": "Kako podijeliti ili spojiti dvojezične titlove – AI-SRTSub",
   "desc": "Četiri načina za uklanjanje dvojezičnih titlova: zadržite samo jednu traku, podijelite u dva fajla ili spojite u jedan unos od dvije linije. Oba oblika se automatski detektuju, u vašem pretraživaču.",
   "h1": "Kako ukloniti dvojezične titlove",
   "intro": "Želite li podijeliti dvojezične titlove, spojiti ih ili zadržati samo jednu traka? Ovaj vodič prolazi kroz sva četiri načina: kako funkcionira detekcija, koji način odabrati i šta dobijate pri izvozu.",
   "ctaText": "Otvorite alat za uklanjanje dvojezičnih titlova"
  },
  "body": [
   {
    "h2": "Čemu služi ovaj alat",
    "ps": [
     "Imate dvojezične titlove, ali želite samo jednu traku — ili obrnuto, želite podijeliti ili spojiti dvije trake:"
    ]
   },
   {
    "h2": "Kako detektuje dvojezični sadržaj",
    "ps": [
     "Dvodelne dvojezične titlove dolaze u dva uobičajena oblika, i alat prepoznaje svaki od njih — **bez pogađanja jezika**: **Oblik A (jedan unos, dvije linije)** dijeli trake prema sistemu pisanja — kana, hangul, hanzi, latinica i drugi sistemi, ukupno deset; dva različita sistema znače dvojezično, a ono što se prvo pojavi računa se kao original. Jedan sistem (na primjer duga kineska linija prelomljena u dvije) tretira se kao jednojezični i čuva se kakav jeste. **Oblik B (dva odvojena unosa sa identičnim vremenskim rasporedom)** dijeli trake po položaju — dva unosa u isto vrijeme čine par, prvi se računa kao original, a kombinacije koje dijele latinicu, poput englesko-francuskog ili englesko-njemačkog, takođe su ispravno odvojene. Kada se ne detektuje dvojezični sadržaj, birač načina rada i dugme Start su zasivi zajedno sa jasnim obavještenjem, tako da se nikada ne vrši prisilno dijeljenje u pogrešne rezultate."
    ]
   },
   {
    "h2": "Četiri načina rada",
    "ps": [
     "Izaberite jedan od četiri u padajućem meniju „Koji želite?“: **Zadrži samo original** i **Zadrži samo prevod** daju svaki po jedan fajl; **Podijeli na dva** daje originalni fajl i fajl prevoda, s nazivima fajlova automatski označenim sa `.orig` / `.dst` kako bi se spriječilo prepisivanje; **Spoji u jedan unos od dvije linije** pretvara svaki par u dvojezični unos — original u jednoj liniji, prevod u drugoj — dok se jednojezični parovi čuvaju kakvi jesu i druga linija se ne izmišlja. Kada promijenite način rada ili izlazne formate, postojeći sadržaj se ponovo pokreće automatski — nema potrebe za ponovnim klikom na Start."
    ],
    "img": {
     "file": "bilingual-modes",
     "alt": "Izbor načina rada u alatu za dvojezične titlove: zadrži original, zadrži prevod, podijeli na dva, spoji u jedan unos od dvije linije",
     "cap": "Četiri načina: zadrži jednu traku, podijeli na dvije ili spoji u jedan unos od dvije linije"
    }
   },
   {
    "h2": "Ulaz i izlaz",
    "ps": [
     "Čita sedam formata — SRT, VTT, ASS, SSA, SBV, LRC, TXT (ekstenzija fajla prva, prepoznavanje sadržaja kao rezervna opcija) — i izvozi četiri: SRT, VTT, ASS, TXT. Bilo koja kombinacija ulaza i izlaza radi, tako da se usput odvija konverzija između formata. ASS `\\N` prelazi u novi red se vraćaju u prave prelaze u novi red, a oznake efekata se uklanjaju pri izvozu u drugi format."
    ]
   },
   {
    "h2": "Rezultati i izvoz",
    "ps": [
     "Rezultati su prikazani u cijelosti u tekstualnom polju samo za čitanje, svaki fajl sa brojem unosa i ukupnim trajanjem; dugmad za preuzimanje i kopiranje prenose fajl direktno. Oblast rezultata je pregled — ovdje nema uređivanja teksta ili vremena. Da biste unijeli promjene, prvo izvezite, a zatim koristite odgovarajući alat."
    ],
    "img": {
     "file": "bilingual-result",
     "alt": "Oblast rezultata razdvajanja: pregled samo za čitanje, statistika broja unosa i dugmad za preuzimanje/kopiranje",
     "cap": "Pregled punog teksta + statistika unosa i trajanja + preuzimanje i kopiranje"
    }
   },
   {
    "h2": "Često postavljana pitanja (FAQ)",
    "ps": [
     "**Jedan unos ima engleski u jednoj liniji, a francuski u drugoj — zašto neće da se podijeli?** Oblik A dijeli trake po sistemu pisanja, tako da se dva jezika koja dijele jedan sistem unutar jednog unosa ne mogu odvojiti. Restrukturirajte ga kao Oblik B (dva unosa na istoj vremenskoj liniji) i dijeljenje zasnovano na položaju će raditi.",
     "**Samo jedan fajl u preuzimanju?** \"Zadrži samo original\", \"Zadrži samo prevod\" i \"Spoji u jedan unos od dvije linije\" daju po jedan fajl po dizajnu; samo \"Podijeli na dva\" daje vam dva, označena sa `.orig` / `.dst`.",
     "**Mogu li raditi grupnu obradu?** Jedan po jedan fajl; redovi čekanja nisu podržani.",
     "**Da li ovo otprema moje titlove?** Ne — analiza i izvoz se odvijaju u potpunosti u vašem pretraživaču."
    ]
   },
   {
    "h2": "Povezani vodiči",
    "ps": [
     "Za brz način dijeljenja dvije trake pogledajte [[Dijeljenje dvojezičnih titlova u dvije trake|/guides/split-bilingual-subtitles.html]]; za način na koji se prave dvojezični titlovi pogledajte [[Dva načina za pravljenje dvojezičnih titlova|/guides/make-bilingual-subtitles.html]]; za mašinski prevod koristite [[AI prevod titlova|/translate.html]]."
    ]
   }
  ]
 },
 "clean": {
  "seo": {
   "title": "Čistač titlova – uklonite vodene žigove, reklame, SDH – AI-SRTSub",
   "desc": "Čistač titlova: 13 pravila uklanjaju vodene žigove, reklame, SDH natpise, HTML oznake, duplikate; svaka promjena ima razliku (diff) i može se poništiti. SRT/VTT/ASS, sve u pretraživaču.",
   "h1": "Kako koristiti čistač titlova",
   "intro": "Titlovi preuzeti sa interneta često nose vodene žigove, reklame i SDH natpise. Čistač primjenjuje 13 pravila u jednom prolazu, a svaka promjena se razlikuje i može se poništiti.",
   "ctaText": "Otvorite čistač titlova"
  },
  "body": [
   {
    "h2": "Šta ovaj alat radi",
    "ps": [
     "Preuzeti fajlovi titlova često nose stvari koje ne bi trebalo. Čistač ih uklanja u jednom prolazu zasnovanom na pravilima:"
    ]
   },
   {
    "h2": "Otpremanje i detekcija",
    "ps": [
     "Prevucite fajl ili kliknite da ga otpremite — podržani su SRT, VTT, ASS, SSA i TXT — ili nalijepite tekst titla direktno. Kodiranje se automatski prepoznaje: ako UTF-8 dekodiranje proizvodi zamjenske znakove, vraća se na GBK ili Big5, a stranica prikazuje \"Kodiranje ispravljeno kao {encoding}\". Ako otpremite dvojezične titlove sa dvije trake (dvije identične vremenske linije, jedna kineska i jedna engleska), oni se spajaju u jednu dvojezičnu traku sa prekidačem \"original na vrhu / prevod na vrhu\"."
    ]
   },
   {
    "h2": "Konfigurisanje 13 pravila",
    "ps": [
     "Interfejs ima četiri grupe sa 13 poljima za potvrdu: **Oznake i formatiranje** (ASS efekti, HTML oznake, kontrolni znakovi, ponovno numerisanje nakon sortiranja), **SDH i zvučni efekti** (SDH natpisi, oznake govornika, čiste linije stihova), **Vodeni žigovi i neželjeni unosi** (vodeni žigovi i reklame, dupli unosi, prazni unosi), **Ispravke teksta** (interpunkcija i razmaci, popravka velikih slova, spajanje kratkih linija). Samo stavke \"bez gubitaka i sigurne\" su uključene po defaultu; stavke koje mogu ukloniti sadržaj (linije stihova, popravka velikih slova, spajanje kratkih linija) su isključene — označite ih kada je potrebno. Svaka stavka ima ⓘ savjet pri prelazu mišem, a svaka promjena polja za potvrdu se odmah ponovo pokreće."
    ],
    "img": {
     "file": "clean-opts",
     "alt": "Interfejs opcija čišćenja: četiri grupe 13 polja za potvrdu, aktivan broj prikazan na vrhu",
     "cap": "Četiri grupe, 13 pravila; samo stavke bez gubitaka uključene prema defaultu, promjene se primjenjuju odmah"
    }
   },
   {
    "h2": "Razlika u promjenama (diff) i poništavanje",
    "ps": [
     "Rezultati se ne prepisuju direktno: svaka promjena je navedena u tabeli razlika sa oznakom pravila (zašto je ovaj unos uredjen ili obrisan). Želite li nazad neki? Kliknite na \"Vrati\" u tom redu; \"Vrati sve\" vraća sve nazad jednim klikom, a ponovnim klikom na njega ponovo se primjenjuje puno čišćenje. Traka statistike prikazuje broj originalnih / očišćenih / obrisanih / izmijenjenih / vraćenih."
    ],
    "img": {
     "file": "clean-diff",
     "alt": "Tabela razlika promjena: indeks, vrijeme, originalni naspram očišćenog teksta, oznaka pravila u svakom redu",
     "cap": "Svaka promjena nosi oznaku pravila; vratite pojedinačne redove ili sve odjednom"
    }
   },
   {
    "h2": "Pregled i izvoz",
    "ps": [
     "Prebacujte se između prikaza \"Očišćeno / Originalno\". U originalnom prikazu, obrisani unosi su precrtani i označeni sa \"Obrisano\", a izvezeni fajl se tačno poklapa sa pregledom. Izlazni formati: SRT (default), VTT, ASS (dostupno kada je izvor ASS, sa dijelom stila sačuvanim kakav jeste) i običan tekst TXT bez vremenskih linija. Naziv fajla automatski dobija marker `.clean`."
    ],
    "img": {
     "file": "clean-preview",
     "alt": "Pregled punog teksta: očišćeni i originalni prikazi sa trakom statistike koja prikazuje brojeve",
     "cap": "Dva prikaza za pregled, šta vidite to i dobijate"
    }
   },
   {
    "h2": "Često postavljana pitanja (FAQ)",
    "ps": [
     "**Hoće li greškom izbrisati normalan dijalog?** Pravilo vodenog žiga prvo uklanja linije vodenog žiga (čuvajući linije dijaloga unutar dvojezičnih unosa) i briše cijeli unos samo ako tragovi ostanu; uklanjanje SDH dotiče samo sadržaj u zagradama sa SDH ključnim riječima koji ima 40 znakova ili manje — običan dijalog u zagradama ostaje.",
     "**Kako se čiste linije stihova razlikuju od stihova unutar dijaloga?** Brišu se samo unosi u kojima je svaka pojedinačna linija okružena ♪ muzičkim notama ili markerima poput [music]; dijalog koji sadrži stihove se čuva.",
     "**Mogu li oznake govornika pogoditi kineski tekst?** Samo alfanumeričko ime velikim slovima na početku linije praćeno dvotačkom (kao `GEORGE:`) se poklapa; kineske rečenice sa dvotačkom nikada ne odgovaraju.",
     "**Mogu li očistiti više fajlova odjednom?** Ne — jedan fajl po pokretanju. Preuzmite rezultat, a zatim otpremite sljedeći."
    ]
   },
   {
    "h2": "Privatnost",
    "ps": [
     "Čišćenje se odvija u potpunosti u vašem pretraživaču; nikakav sadržaj titla se nikada ne šalje na server."
    ]
   },
   {
    "h2": "Povezani alati i vodiči",
    "ps": [
     "Za kratak vodič fokusiran na uklanjanje vodenih žigova i reklama, pogledajte [[uklanjanje reklama i vodenih žigova sa titlova|/guides/remove-subtitle-ads.html]]; provjerite svoj fajl kroz [[kontrolu kvaliteta titlova|/guides/subtitle-quality-check.html]] prije predaje; za promjenu formata koristite [[konverziju formata|/convert.html]]."
    ]
   }
  ]
 },
 "convert": {
  "seo": {
   "title": "Kako konvertovati formate titlova (SRT, VTT, ASS, SBV, LRC, TXT) – AI-SRTSub",
   "desc": "Ilustrovani vodič kroz konverter: ubacite fajl, provjerite detektovani format, izaberite izlazni format, obradite dvojezični tekst i preuzmite. Sve se pokreće u vašem pretraživaču.",
   "h1": "Vodič za konverter formata titlova",
   "intro": "Ovaj vodič prolazi kroz stranicu od vrha do dna: učitajte titl, potvrdite detektovani format, odaberite izlazni format i preuzmite. Sve se pokreće u vašem pretraživaču — nijedan fajl nikada ne napušta vaš uređaj.",
   "ctaText": "Otvorite konverter titlova"
  },
  "body": [
   {
    "h2": "Učitajte svoje titlove",
    "ps": [
     "Prevucite fajl u isprekidani okvir ili kliknite da izaberete jedan; takođe možete **nalijepiti sadržaj** direktno u tekstualno polje. Format se detektuje i na osnovu ekstenzije i na osnovu sadržaja, a rezultat se prikazuje u oznaci formata."
    ],
    "img": {
     "file": "convert-upload",
     "alt": "Oblast za otpremanje: učitan uzorak SRT-a, detektovan kao SRT",
     "cap": "Detektovani format se prikazuje u oznaci — provjerite ovo prvo ako ste u nedoumici"
    }
   },
   {
    "h2": "Izaberite izlazni format",
    "ps": [
     "Izaberite ciljni format iz padajućeg menija: šest opcija — srt, vtt, ass, sbv, lrc, txt. Konvertovanjem u ass ponovo se kreira fiksni 1920×1080 podrazumijevani stil (bijeli tekst, crni obrub, dolje centrirano) i **ne čuva originalne fontove ili boje**; txt izvozi samo tekst, bez vremena."
    ],
    "img": {
     "file": "convert-opt",
     "alt": "Padajući meni izlaznog formata sa izabranim VTT-om",
     "cap": "Izlazni format ne prati ulaz — vi ga birate"
    }
   },
   {
    "h2": "Rukovanje dvojezičnim tekstom",
    "ps": [
     "Ako je fajl dvojezičan (dvije linije u jednom dijelu ili ispreplitani dijelovi), raspored se čuva kakav jeste tokom konverzije. Odabir \"zadrži dvojezično\" dijeli dva jezika na gornju i donju liniju, od kojih je svaka ponovo prelomljena za sebe; kontrola je onemogućena kada se ne detektuje dvojezični tekst."
    ]
   },
   {
    "h2": "Konvertuj i preuzmi",
    "ps": [
     "Kliknite na \"Konvertuj\": panel rezultata prikazuje broj dijelova i ukupno trajanje, sa tekstom spremnim za pregled. Kliknite na **Preuzmi** da sačuvate fajl ili **Kopiraj** da direktno preuzmete tekst. Konverzija nikada ne mijenja nijednu vremensku vrijednost — ona prepisuje samo format. Da biste ponovo uskladili dijelove, koristite [[alat za vrijeme|/shift.html]]."
    ],
    "img": {
     "file": "convert-result",
     "alt": "Panel rezultata: broj dijelova i ukupno trajanje sa dugmadima za preuzimanje i kopiranje",
     "cap": "6 dijelova, 0:23 ukupno — pregledajte tekst prije preuzimanja"
    }
   }
  ]
 },
 "extract": {
  "seo": {
   "title": "Izvlačenje običnog teksta iz titlova – Dva rasporeda, pet čišćenja – AI-SRTSub",
   "desc": "Izazovite dijalog iz titlova kao čist običan tekst: kontinuirani pasusi ili jedna linija po dijelu, i šta pet prekidača za SDH dijelove, vodene žigove, duplikate, prefikse i stihove uklanja.",
   "h1": "Kako izvući običan tekst iz titlova",
   "intro": "Izvucite dijalog iz fajla titla kao čist običan tekst: brojevi dijelova, vremenske linije i oznake stila se automatski uklanjaju, tako da se rezultat čita kao članak ili funkcioniše kao lista dijaloških linija.",
   "ctaText": "Otvorite ekstraktror običnog teksta"
  },
  "body": [
   {
    "h2": "Šta ovaj alat radi",
    "ps": [
     "Čitaocu je važan samo dijalog u fajlu titla; ostalo je struktura namijenjena plejeru — brojevi dijelova, vremenske linije, oznake stila. Ova stranica uklanja strukturu i čuva riječi."
    ]
   },
   {
    "h2": "Ubacite ga, nemojte samo otpremati",
    "ps": [
     "Kolona \"1 Dodaj titlove\" sa lijeve strane prihvata otpremljeni fajl, a također možete nalijepiti sadržaj titla direktno u tekstualno polje. Ako ste izabrali pogrešan fajl, kliknite na \"Obriši\" i počnite ponovo.",
     "Ova stranica čita fajlove kao UTF-8. Ako se titlovi otvore kao zid upitnika ili kvadratića, kodiranje je oštećeno — konvertujte ga u UTF-8 u [[Popravci oštećenog teksta|/repair.html]] prvo, pa se vratite."
    ],
    "img": {
     "file": "extract-up",
     "alt": "Oblast za dodavanje titlova u ekstraktoru običnog teksta",
     "cap": "Otpremite fajl ili nalijepite sadržaj titla direktno u tekstualno polje"
    }
   },
   {
    "h2": "Izbor između dva rasporeda",
    "ps": [
     "Na vrhu \"2 Opcija ekstrakcije\" je raspored: **Kontinuirani pasusi** dijeli tekst na pauzama i interpunkcijskim znakovima koji označavaju kraj rečenice tako da se čita kao članak; **Jedna linija po dijelu** daje jednu liniju po unosu titla, prateći unose originalnog fajla jedan na jedan.",
     "Kopiranje dijaloga za bilješke, vježbanje prevođenja ili čitanje kao proze zahtijeva kontinuirane pasuse; pravljenje liste dijaloga, poređenje red po red sa originalom ili proslijeđivanje drugom alatu zahtijeva jednu liniju po dijelu."
    ],
    "img": {
     "file": "extract-opt",
     "alt": "Opcije rasporeda i čišćenja pod opcijama ekstrakcije",
     "cap": "Izaberite jedan raspored; pet prekidača ispod odlučuje koja vrsta sadržaja se uklanja"
    }
   },
   {
    "h2": "Šta svako od pet čišćenja uklanja",
    "ps": [
     "**Ukloni SDH dijelove**: briše opise zvukova u zagradama kao što su \"(koraci)\" ili \"[music]\" i čuva dijalog.",
     "**Ukloni vodene žigove i reklame**: uklanja linije kao što su zasluge fan sub grupa, URL-ovi i nazivi kanala.",
     "**Ukloni susjedne duplikate**: kada se ista rečenica pojavi dva puta zaredom (greška pri reprodukciji) čuva se samo jedna kopija; duplikati koji su udaljeniji nose značenje i ostavljaju se na miru.",
     "**Ukloni prefikse govornika**: \"JOHN: Zdravo\" postaje \"Zdravo\". Isključeno po defaultu — tekst u stilu scenarija treba da pokaže ko govori.",
     "**Preskoči linije stihova**: linije koje su u potpunosti \"♪ … ♪\" se preskaču. Isključeno po defaultu — stihovi su također riječi."
    ],
    "img": {
     "file": "extract-clean",
     "alt": "Pet prekidača za čišćenje i njihovi opisi pod opcijama ekstrakcije",
     "cap": "Svaki prekidač govori šta uklanja sa svoje desne strane; označite one koji vam trebaju"
    }
   },
   {
    "h2": "Preuzimanje rezultata",
    "ps": [
     "Kolona \"3 Rezultat\" sa desne strane prikazuje izvučeni tekst uživo i preračunava se čim promijenite opciju.",
     "Kada ste zadovoljni, kliknite na \"Preuzmi\" da sačuvate .txt ili \"Kopiraj\" da preuzmete tekst sa sobom. Za jezike koji ne odvajaju riječi razmacima, kao što su kineski i japanski, spajanje linija prati drugačija pravila, i alat to rješava automatski po jeziku."
    ],
    "img": {
     "file": "extract-out",
     "alt": "Oblast rezultata sa dugmadima za preuzimanje i kopiranje",
     "cap": "Rezultat se ažurira uživo; preuzmite ga kao txt ili ga kopirajte direktno"
    }
   },
   {
    "h2": "Šta ostaje netaknuto",
    "ps": [
     "Sam dijalog se ne prepisuje. Prekidači za čišćenje samo odlučuju koje se cijele linije ili blokovi uklanjaju; oni nikada ne mijenjaju tekst unosa.",
     "Vremenske linije i brojevi dijelova jednostavno se ne izvoze, ne mijenjaju pa izvoze — originalni fajl ostaje netaknut, a ova stranica ne nudi izvoz sa vremenskim linijama. Taj posao pripada [[Konverziji formata|/convert.html]]."
    ]
   },
   {
    "h2": "Česta pitanja",
    "ps": [
     "**Da li ASS oznake stila ostaju u tekstu?** Ne. ASS `{}` blokovi za prepisivanje se uklanjaju i ostaje samo dijalog.",
     "**Da li dvojezični fajl izlazi kao dvije linije ili jedna?** Onoliko linija koliko je unos imao; ova stranica ih niti spaja niti dijeli — za njihovo razdvajanje koristite [[Dvojezično razdvajanje|/bilingual.html]].",
     "**Zašto se prefiksi govornika zadržavaju po defaultu?** Ime u \"JOHN: Zdravo\" su često korisne informacije (scenariji, liste dijaloga), a njihovo uklanjanje otežava prepoznavanje ko govori, pa je izbor prepušten vama.",
     "**Mogu li se izvući i LRC fajlovi stihova?** Da. LRC vremenske oznake se uklanjaju i linije stihova ostaju; ako ne želite stihove, označite \"Preskoči linije stihova\"."
    ]
   },
   {
    "h2": "Privatnost",
    "ps": [
     "Titlovi se obrađuju u potpunosti u pretraživaču: ništa se ne otprema i ništa ne prolazi kroz server. Tekst ostaje samo na trenutnoj stranici i briše se pri osvježavanju."
    ]
   },
   {
    "h2": "Povezani alati i vodiči",
    "ps": [
     "Da biste shvatili šta fajl titla zapravo sadrži, pogledajte [[Šta se nalazi unutar SRT fajla|/guides/srt-file-format.html]]; da prevedete izvučeni dijalog idite na [[Prevod titlova|/translate.html]]; da ga pretvorite u tabelu koristite [[Titlovi u Excel/CSV|/guides/srt-to-excel.html]]; i pokrenite [[Kontrolu kvaliteta titlova|/qc.html]] prije bilo kakve predaje."
    ]
   }
  ]
 },
 "extract-subtitles-from-video": {
  "seo": {
   "title": "Izvlačenje titlova iz videa – Ugrađeni naspram spoljnih – AI-SRTSub",
   "desc": "Šta MKV / WebM / MP4 / MOV nose, kako se razlikuju tekstualne, ASS, WebVTT i mov_text trake, zašto slikovni titlovi (PGS / DVD) nemaju tekst i šta učiniti nakon izvlačenja.",
   "h1": "Izvlačenje titlova iz videa",
   "intro": "Titlovi mogu živjeti unutar video fajla ili stajati sami izvan njega. Unutra, oni su traka u kontejneru — njihovo izvlačenje nema nikakve veze sa transkodiranjem.",
   "ctaText": "Otvorite izvlačenje titlova iz videa"
  },
  "body": [
   {
    "h2": "Gdje žive titlovi: ugrađeni i spoljni",
    "ps": [
     "Video fajl (MKV, MP4) je kontejner koji istovremeno drži video traku, audio traku i trake titlova. Titlovi zatvoreni unutra su **ugrađeni**; zaseban .srt / .ass fajl koji stoji vani je **spoljni**, a ugrađena traka se naziva i **muksiranom**.",
     "Spoljni titlovi se mogu koristiti takvi kakvi jesu. Problem su ugrađeni: da biste ih uređivali, prevodili ili gradili dvojezičnu traku iz originala, nemate fajl titla pri ruci — prvo morate pročitati traku iz kontejnera. Ovaj korak nije transkodiranje: video se ne ponovo kodira, već se čitaju samo podaci koji su već pohranjeni u kontejneru."
    ]
   },
   {
    "h2": "Koji kontejner šta nosi",
    "ps": [
     "Različiti kontejneri drže različite formate titlova, a težina izvlačenja se takođe razlikuje:"
    ],
    "img": {
     "file": "videosub-which",
     "alt": "Trake titlova navedene na stranici za izvlačenje ugrađenih titlova",
     "cap": "Jedna traka po redu, obično sa jezikom i nazivom trake; kada postoji samo jedna, ona se automatski izvlači"
    }
   },
   {
    "h2": "Zašto se slikovni titlovi ne mogu izvući",
    "ps": [
     "Blu-ray PGS i DVD titlovi uopšte ne pohranjuju znakove, već samo niz slika sa alfa kanalom. Kada ih plejer prikazuje, on lijepi sliku, a ne ispisuje tekst.",
     "Tako da u takvoj traci nema teksta za čitanje — nije stvar u tome da alat to ne podržava, već u tome da tamo nema znakova. Stranica jasno kaže kada naiđe na takav slučaj.",
     "Jedini način da se dođe do riječi je da se prvo prepoznaju znakovi na tim slikama (OCR) i da se od toga naprave titlovi. To je proces odvojen od izvlačenja trake."
    ]
   },
   {
    "h2": "Šta obično dolazi nakon izvlačenja",
    "ps": [
     "Ono što izlazi je traka kakva je bila: alat ne pogađa kodiranje i ne ispravlja vremenske linije. Tako se često javljaju dvije stvari:",
     "Jedna je **oštećen tekst** — problem kodiranja u izvornoj traci koja ionako izlazi oštećena; idite na [[Kako popraviti oštećen tekst|/guides/repair.html]] da identifikujete kodiranje. Druga je **pogrešno vrijeme** — bez obzira da li izvor ima uvodni logo ili se brzina kadrova (fps) ne poklapa, rezultat je pomjeren u cjelini; koristite [[Podešavanje vremenske linije|/shift.html]] da ga pomjerite ili skalirate.",
     "Nakon toga, za prevod idite na [[Prevod titlova|/translate.html]], a da biste ga učinili dvojezičnim pogledajte [[Dva načina za pravljenje dvojezičnih titlova|/guides/make-bilingual-subtitles.html]]."
    ],
    "img": {
     "file": "videosub-formats",
     "alt": "Oblast rezultata sa izlaznim formatima SRT / VTT / ASS / TXT",
     "cap": "Izvučeni titlovi se mogu izvesti u četiri formata; ASS izvor čuva zaglavlje stila i rezoluciju"
    }
   },
   {
    "h2": "Nekoliko stvari u kojima je lako pogriješiti",
    "ps": [
     "**Izvlačenje titlova nije njihovo urezivanje (hardsubbing).** Video se ne ponovo kodira, tako da kvalitet slike i zvuka ostaju netaknuti.",
     "**Izvlačenje ne utiče na originalni fajl.** Samo za čitanje, nikada se ne upisuje, i nijedan bajt videa se ne mijenja.",
     "**Ako je veliki fajl spor, to nije problem sa vezom.** Alat skenira informacije o traci komad po komad, i što je fajl veći, to duže traje; sve se dešava lokalno.",
     "**Spoljni titlovi ne trebaju ovu stranicu.** Ako imate .srt / .ass, idite direktno na [[Konverziju formata|/convert.html]]; samo titlovi zapečaćeni unutar videa trebaju prvo izvlačenje."
    ]
   },
   {
    "h2": "Povezani alati i vodiči",
    "ps": [
     "Za kompletan vodič pogledajte [[Kako izvući titlove ugrađene u video|/guides/videosub.html]]; da prevedete ono što izvučete idite na [[Prevod titlova|/translate.html]], da ga učinite dvojezičnim pogledajte [[Dva načina za pravljenje dvojezičnih titlova|/guides/make-bilingual-subtitles.html]]; za oštećen tekst počnite sa [[Popravkom oštećenog teksta|/repair.html]]."
    ]
   }
  ]
 },
 "fps-23-976-vs-25": {
  "seo": {
   "title": "Šta 23.976 / 24 / 25 / 30 fps zaista znače – Vrijeme titlova – AI-SRTSub",
   "desc": "23.976 nije 24 i 29.97 nije 30 — nedostajući 0.1% dolazi iz NTSC boje, dok PAL pokreće filmove 4% brzo. Kako ovo pomjera vrijeme vašeg titla i kako konvertovati između njih.",
   "h1": "Šta 23.976 / 24 / 25 / 30 fps zaista znače",
   "intro": "Jaz 0.1% između 23.976 i 24 je ostatak iz istorije televizije. Zajedno sa PAL-ovim 4%, on je razlog zašto titlovi gube sinhronizaciju što film više odmiče.",
   "ctaText": "Otvorite podešavanje vremena"
  },
  "body": [
   {
    "h2": "Šta je svaki broj",
    "ps": [
     "Brzina kadrova je koliko se slika prikaže u jednoj sekundi. Četiri koja najčešće susrećete:"
    ]
   },
   {
    "h2": "Odakle dolazi 0.1%",
    "ps": [
     "23.976 = 24 × 1000/1001, a 29.97 = 30 × 1000/1001. Taj 1000/1001 je ostatak od dodavanja boje u NTSC: da bi se podnosilac boje ugurao bez rušenja postojećih crno-bijelih prijemnika, brzina polja je smanjena sa 60 Hz na 59.94 Hz (60 × 1000/1001), a brzina kadrova je opala sa njom.",
     "Rezultat: filmovi se emituju na 23.976 u NTSC regijama umjesto na 24. Razlika je 0.1%, ili 3.6 sekunde tokom jednog sata — jedva primjetno sama po sebi, ali nemojte je miješati sa 4% ispod i nikada nemojte kombinovati to dvoje u jednoj računici."
    ]
   },
   {
    "h2": "Odakle dolazi 4%",
    "ps": [
     "PAL regije prikazuju na 25 fps. Filmovi se snimaju na 24 fps i jednostavno se puštaju na 25 — nijedan kadar nije dodat niti uklonjen, tako da reprodukcija radi 4% brže (25/24 ≈ 1.0417). Film u trajanju od 100 minuta traje 96 minuta u svojoj PAL verziji.",
     "To je korijen **progresivnog odstupanja**: titlovi napravljeni za original i video u PAL verziji se tačno poklapaju na početku, a razdvojeni su četiri minuta do odjavne špice. Nijedan globalni pomak to ne može spasiti; mora se skalirati po omjeru."
    ],
    "img": {
     "file": "shift-step-rate",
     "alt": "Odjeljak o brzini na stranici za vrijeme: polje za unos omjera",
     "cap": "Skaliraj po omjeru — jedna vrijednost pokriva cijeli film"
    }
   },
   {
    "h2": "Kako konvertovati",
    "ps": [
     "Konverzija znači množenje jednim omjerom koji se primjenjuje na cijeli film:"
    ]
   },
   {
    "h2": "Kako prepoznati šta imate",
    "ps": [
     "Umjesto pogađanja omjera, pronađite dva trenutka za čije ste tačno vrijeme sigurni — obično prvu i poslednju liniju dijaloga — i recite alatu \"ova linija treba da bude na 00:00:12, a ona na 01:35:40\"; on linearno rasteže cijeli film između te dvije tačke. To je \"sidrenje u dvije tačke\" i ne zahtijeva od vas nikakvu aritmetiku brzine kadrova.",
     "Da sami potvrdite brzinu kadrova, provjerite svoj plejer ili alat za informacije o mediju. Kada naziv fajla poput `1080p.WEB` ne nosi nikakvu naznaku o brzini kadrova, sidrenje u dvije tačke je sigurniji put."
    ],
    "img": {
     "file": "shift-step-two",
     "alt": "Odjeljak sa sidrima u dvije tačke na stranici za vrijeme: dva reda unosa vremenskih oznaka",
     "cap": "Sidrenje u dvije tačke ne treba brzinu kadrova — samo dvije vremenske oznake"
    }
   },
   {
    "h2": "Povezani alati i vodiči",
    "ps": [
     "Sama konverzija brzine kadrova — [[Konverzija brzine kadrova titlova|/guides/srt-fps-converter.html]]; podešavanje brzine — [[Konverzija brzine titlova|/guides/subtitle-speed-converter.html]]; niste sigurni da li je to globalni pomak ili progresivno odstupanje — [[Titlovi sve više gube sinhronizaciju|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "glossary": {
  "seo": {
   "title": "Grupna zamjena izraza u titlovima – Jedna tabela ispravlja fajl – AI-SRTSub",
   "desc": "Jedno pravilo po liniji, odvojeno sa -> , => , → ili tabulatorom (Tab), sa # za komentare. Podudaranje cijelih riječi, osjetljivost na velika i mala slova, prva ili druga linija dvojezičnog dijela, svaka promjena izlistana i moguća za poništavanje.",
   "h1": "Kako grupno zamijeniti izraze u titlovima",
   "intro": "Jedna tabela izraza čini da formulacija cijelog fajla titla bude dosljedna odjednom — vremenske linije, ASS stilovi i VTT NOTE blokovi nisu dotaknuti ni jednim jedinim znakom.",
   "ctaText": "Otvorite grupnu zamjenu izraza"
  },
  "body": [
   {
    "h2": "Šta ovaj alat radi",
    "ps": [
     "Ista riječ prevedena na dva različita načina, imena i mjesta koja se razilaze uz mašinski prevod, tuđi titlovi koji treba da se uklapaju u vaše sopstvene konvencije — sve ovo dijeli jednu osobinu: ono što se mijenja je riječ, a ne struktura. Ova stranica mijenja samo riječi."
    ]
   },
   {
    "h2": "Dva unosa: titlovi i tabela izraza",
    "ps": [
     "Kolona \"1 Dodaj titlove\" s lijeve strane uzima fajl titla, ili možete direktno nalijepiti sadržaj; ako ste izabrali pogrešan fajl, kliknite na \"Obriši\".",
     "Kolona \"2 Tabela izraza\" sa desne strane drži pravila. **Jedno pravilo po liniji**, sa starim izrazom i novim izrazom odvojenim sa `->` , `=>` , `→` ili tabulatorom (Tab) — sva četiri rade. Linije koje počinju sa `#` su komentari i ne učestvuju u zamjeni.",
     "Ako niste sigurni u vezi sa formatom, kliknite na \"Popuni primjerom\" i uredite ga."
    ],
    "img": {
     "file": "glossary-up",
     "alt": "Oblast za dodavanje titlova i unos tabele izraza na stranici za zamjenu izraza",
     "cap": "Titlovi lijevo, pravila desno; jedno pravilo po liniji, stari izraz i novi izraz odvojeni sa ->"
    }
   },
   {
    "h2": "Kako napisati tabelu izraza",
    "ps": [
     "Jedno pravilo po liniji: trenutni izraz lijevo, ono što bi trebalo da postane desno. Na primjer `Thor -> Donar` mijenja svaki \"Thor\" u fajlu sa \"Donar\".",
     "Komentari počinju sa `#` i korisni su za označavanje grupe pravila (na primjer \"# popravke imena u sezoni 1\"), kao i za privremeno isključivanje pravila — samo stavite `#` ispred umjesto da ga brišete.",
     "Pravila se izvršavaju odozgo prema dolje; tekst koji proizvede jedno pravilo ponovo se skenira od strane pravila ispod njega. Kada je redoslijed važan (recimo, prvo zamijenite A sa B, a zatim B sa C), imajte to na umu."
    ],
    "img": {
     "file": "glossary-table",
     "alt": "Red za redom pravila zamjene u unosu tabele izraza",
     "cap": "Jedno pravilo po liniji; linije koje počinju sa # su komentari i mogu privremeno isključiti pravilo"
    }
   },
   {
    "h2": "Šta rade tri prekidača",
    "ps": [
     "**Opseg**: `all` / `first line only` / `second line only`. U dvojezičnom fajlu, izaberite \"samo druga linija\" kada želite da promijenite samo prevod; unosi koji imaju samo jednu liniju ostaju netaknuti pod bilo kojom postavkom za jednu liniju — alat ne pogađa koja je strana original.",
     "**Cijela riječ**: mijenja samo izraze koji stoje sami kao riječ, tako da `art` neće dotaknuti `start`. Za jezike koji ne odvajaju riječi razmacima, kao što su kineski i japanski, ovaj prekidač nema efekta — zamjena tu radi na podniskama (substrings).",
     "**Osjetljivo na velika i mala slova**: isključeno po defaultu, tako da se i `CEO` i `ceo` zamjenjuju; kada je označeno, zamjenjuje se samo tačno isto pisanje."
    ],
    "img": {
     "file": "glossary-opt",
     "alt": "Prekidači za opseg, cijelu riječ i osjetljivost na velika i mala slova ispod tabele izraza",
     "cap": "Opseg odlučuje koja se linija mijenja; cijela riječ i velika/mala slova odlučuju koliko se strogo izraz podudara"
    }
   },
   {
    "h2": "Svaka promjena izlistana, svaka promjena moguća za poništavanje",
    "ps": [
     "\"3 Rezultat\" prikazuje zamijenjene titlove i takođe **navodi svaku promjenu**: koji dio, koja linija, od čega do čega.",
     "Ako ne želite neku od njih, kliknite je na listi da vratite samo taj unos — nema potrebe za uređivanjem tabele izraza i ponovnim pokretanjem. Kada ste zadovoljni, kliknite na \"Preuzmi\" ili \"Kopiraj\"."
    ],
    "img": {
     "file": "glossary-out",
     "alt": "Oblast rezultata sa listom pojedinačnih promjena",
     "cap": "Svaka promjena je izlistana; kliknite na onu koju ne želite da biste je poništili"
    }
   },
   {
    "h2": "Šta ostaje netaknuto",
    "ps": [
     "**Vremenske linije, linije ASS stila i VTT `NOTE` blokovi nisu dotaknuti ni jednim jedinim znakom.** Zamjena se primjenjuje samo na tekst dijaloga, nikada na linije strukture.",
     "Tabela izraza nikada automatski ne mijenja vaš fajl titla — rezultat je novi izlaz, a original ostaje kakav jeste."
    ]
   },
   {
    "h2": "Česta pitanja",
    "ps": [
     "**Zašto izraz nije zamijenjen?** Prvo provjerite opseg: sa izabranim \"samo druga linija\", unosi koji imaju samo jednu liniju ostaju netaknuti. Zatim provjerite podudaranje cijelih riječi, što zaustavlja podudaranja koja nisu samostalne riječi.",
     "**Zašto kineski i dalje mijenja podniske sa uključenim podudaranjem cijelih riječi?** To je očekivano. Kineski i japanski ne odvajaju riječi razmacima, tako da alat ne može odrediti granice riječi i podudaranje cijelih riječi tu nema efekta.",
     "**Kako da vratim sve nazad nakon greške?** Vratite unose jedan po jedan na listi promjena; da biste počeli ispočetka, obrišite tabelu izraza i ponovo dodajte titlove.",
     "**Mogu li se linije ASS stila slučajno promijeniti?** Ne. Linije stila i `NOTE` blokovi su van opsega; učešće uzima samo tekst dijaloga."
    ]
   },
   {
    "h2": "Privatnost",
    "ps": [
     "Titlovi i tabela izraza se obrađuju u potpunosti u pretraživaču: ništa se ne otprema i ništa ne prolazi kroz server. Tabela izraza se ne čuva, tako da će sljedeći put kada otvorite stranicu biti prazna."
    ]
   },
   {
    "h2": "Povezani alati i vodiči",
    "ps": [
     "Bilo da trebate da napravite tabelu izraza i kako da je održavate kroz sezonu, pogledajte [[Tabele izraza: održavanje dosljednosti sezone|/guides/subtitle-glossary.html]]; ako je sadržaj prljav (vodeni žigovi, SDH dijelovi) prvo pokrenite [[čišćenje titlova|/clean.html]]; kada su imena sređena i trebaju vam drugi jezici idite na [[prevod titlova|/translate.html]]; i provjerite rezultat kroz [[kontrolu kvaliteta titlova|/qc.html]]."
    ]
   }
  ]
 },
 "hanconv": {
  "seo": {
   "title": "Konverzija pojednostavljenih i tradicionalnih titlova – Tajvan naspram Hong Konga – AI-SRTSub",
   "desc": "Vodič kroz devet smjerova: tajvanski sa ili bez regionalnog rječnika, Hong Kong kao sopstveni ukus, sve to konvertovano nazad u pojednostavljeno. Mijenja se samo dijalog; vremena ostaju na mjestu.",
   "h1": "Kako konvertovati pojednostavljene i tradicionalne kineske titlove",
   "intro": "Da li titl ide na Tajvan, u Hong Kong ili na kopno mijenja i formulaciju i oblike znakova. Devet smjerova za izbor, a konvertuje se samo dijalog — vremena, brojevi indeksa i linije ASS stila se nikada ne diraju.",
   "ctaText": "Otvorite konverter"
  },
  "body": [
   {
    "h2": "Šta ovaj alat radi",
    "ps": [
     "Konvertovanje između pojednostavljenog i tradicionalnog nije samo drugačije pisanje svakog znaka. Isti pojednostavljeni riječ odgovara različitim riječima u različitim regijama — riječ za \"softver\" se razlikuje između Tajvana i kopna, a Hong Kong ima još jednu verziju. Konverter ih drži odvojenima:"
    ]
   },
   {
    "h2": "Otpremanje i detekcija",
    "ps": [
     "Prevucite fajl ili potražite jedan — podržani su SRT, VTT, ASS i TXT — ili nalijepite sadržaj titla direktno u polje. Format se detektuje automatski i prikazuje se pored \"Detektovani format\"."
    ],
    "img": {
     "file": "hanconv-up",
     "alt": "Oblast otpremanja konvertera: zona za ispuštanje i polje za lijepljenje, sa detektovanim formatom iznad",
     "cap": "SRT / VTT / ASS / TXT, format se detektuje automatski"
    }
   },
   {
    "h2": "Izbor između devet smjerova",
    "ps": [
     "Devet smjerova pod \"Konvertuj u\" dijeli se u tri grupe. **Pojednostavljeno → tradicionalno**: generičko tradicionalno, tajvansko (promjena rječnika), tajvansko (samo glifovi), Hong Kong. **Tradicionalno → pojednostavljeno**: generičko, iz tajvanskog, iz Hong Konga. **Tradicionalno u tradicionalno**: tajvanski oblici, oblici Hong Konga.",
     "Izbor \"Tajvanski rječnik\" mijenja i regionalni rječnik: riječ za \"softver\" postaje tajvanska, kao i riječ za \"informacije\"; \"Tajvanski glifovi\" mijenja samo način na koji su znakovi napisani i ostavlja vašu formulaciju netaknutom. Hong Kong je sasvim drugi slučaj i koristi još jednu riječ za \"softver\". Da biste konvertovali nazad u pojednostavljeno, koristite grupu ispod — morate reći iz koje tradicionalne varijante dolazite, jer tajvanski i hongkonški tekst idu različitim putevima nazad."
    ],
    "img": {
     "file": "hanconv-dir",
     "alt": "Kartica \"Konvertuj u\": padajući meni odredišta koji prikazuje odabrano \"Pojednostavljeno → tajvansko tradicionalno (promjena rječnika)\"",
     "cap": "Smjerovi se nalaze u padajućem meniju \"Konvertuj u\" u tri grupe; ovaj je tajvanski sa promjenama rječnika"
    }
   },
   {
    "h2": "Rezultat i izvoz",
    "ps": [
     "Oblast rezultata odmah prikazuje konvertovani titl, sa trakom statistike koja daje ukupan broj linija i koliko se linija promijenilo. Ako se ništa nije promijenilo, dobićete nagovještaj da fajl možda ne sadrži kineske znakove — konvertuju se samo Han znakovi, tako da sve-latinični ili sve-numerički titl ostaje tačno onakav kakav je bio.",
     "Zatim preuzmite ili kopirajte. Oznaka jezika se ubacuje u naziv fajla — `demo.srt` postaje `demo.zh-TW.srt` za tajvansko tradicionalno, `.zh-Hant` za generičko tradicionalno i `.zh-Hans` prilikom konverzije nazad u pojednostavljeno."
    ],
    "img": {
     "file": "hanconv-out",
     "alt": "Oblast rezultata: konvertovani titl i traka statistike",
     "cap": "Traka statistike prikazuje ukupan broj linija i broj promijenjenih linija; preuzmite ili kopirajte odavde"
    }
   },
   {
    "h2": "Šta se nikada ne dira",
    "ps": [
     "Konvertuje se samo dijalog. Vremena, brojevi indeksa i linije ASS stila se uopšte ne diraju — rezultat je spreman za upotrebu bez ponovnog oblikovanja."
    ]
   },
   {
    "h2": "Česta pitanja",
    "ps": [
     "**Zašto konverter nije promijenio riječ za \"clean\" (čisto)?** Preslikavanja jedan-na-više se rješavaju prema riječi: značenje \"čisto\" i značenje \"suvo\" dijele jedan tradicionalni oblik, dok značenje \"stablo drveta\" koristi drugi. Tabele dolaze iz OpenCC-a, podudarajući cijele fraze, a ne pojedinačne znakove.",
     "**Koja je razlika između tajvanskog i hongkonškog tradicionalnog?** Rječnik: riječ za \"softver\" se razlikuje između njih dvoje. Izaberite smjer za regiju u koju isporučujete.",
     "**Broj znakova se promijenio nakon konverzije?** Mijenjaju se samo Han znakovi — nijedan unos nije dodat niti uklonjen i nijedno vrijeme nije pomjeren. Ako se broj linija promijenio, provjerite da li je format ispravno detektovan.",
     "**Učitavanje rječnika nije uspjelo?** Stranica vam govori da osvježite i pokušate ponovo. Učitava se lokalno, tako da nema potrebe za otpremanjem titlova bilo gdje."
    ]
   },
   {
    "h2": "Privatnost",
    "ps": [
     "Konverzija se odvija u potpunosti u vašem pretraživaču. Nikakav sadržaj titla se nikada ne šalje na server."
    ]
   },
   {
    "h2": "Povezani alati i vodiči",
    "ps": [
     "Ako vam je potrebno samo pojednostavljeno u tradicionalno, pogledajte [[Konvertuj pojednostavljene titl u tradicionalne|/guides/srt-simplified-to-traditional.html]]; zašto se radi o nečemu više od pukog mijenjanja znakova, pogledajte [[Pojednostavljeno naspram tradicionalnog nije zamjena znakova|/guides/simplified-traditional-chinese.html]]; da prevedete na drugi jezik, [[Prevod titlova|/translate.html]]."
    ]
   }
  ]
 },
 "how-to-make-lrc-file": {
  "seo": {
   "title": "Kako sinhronizovati LRC stihove – Jedan red po stihu, tapkajte u ritmu – AI-SRTSub",
   "desc": "Napravite LRC datoteku od nule: zalijepite jedan stih po redu, tapnite na vrijeme dok slušate, prečice koje su bitne, kada preskočiti red, LRC ili SRT, i šta učiniti kada vremenska usklađenost počne da bježi.",
   "h1": "Kako sinhronizovati LRC stihove",
   "intro": "LRC datoteka je zapravo samo „jedan red stiha plus jedna vremenska tačka“. Izrada ovoga naziva se usklađivanjem vremena: hvatanje trenutka kada svaki red počinje.",
   "ctaText": "Otvorite alat za sinhronizaciju stihova"
  },
  "body": [
   {
    "h2": "Šta vremenska usklađenost zapravo jeste",
    "ps": [
     "Struktura LRC datoteke teško da može biti jednostavnija: jedan stih po redu, a svakom prethodi `[mm:ss.xx]` vremenska oznaka. Kada plejer dođe do nekog reda, prikaže taj stih u tom trenutku.",
     "Cijeli posao „izrade LRC-a“ se dakle svodi na dodjeljivanje vremenske tačke svakom redu stiha — a nijedna mašina to ne može uraditi umjesto vas, zato što odlučivanje o tome gdje red počinje da se pjeva zahtijeva slušanje."
    ]
   },
   {
    "h2": "Koliko prolaza pjesma treba",
    "ps": [
     "Vrijedi razmisliti minut prije nego što počnete; to štedi većinu naknadnog prepravljanja:"
    ],
    "img": {
     "file": "lrc-tap2",
     "alt": "Kontrole za reprodukciju, pečatiranje ovog reda, poništavanje jednog reda i preskakanje ovog reda u oblasti za tapkanje u ritmu",
     "cap": "Pritiskanje tipke Enter tokom reprodukcije je najglađe; jeste li pečatirali pogrešan red? Pritisnite Z i pečatirajte ponovo"
    }
   },
   {
    "h2": "Lijepljenje stihova određuje koliko će ostatak glatko ići",
    "ps": [
     "Zalijepite stihove sa jednim stihom po redu; prazni redovi se preskaču. Prijelom reda koji zalijepite su redovi koje ćete kasnije vremenski usklađivati – razbijte ih na više redova sada i tapkaćete više puta kasnije.",
     "Lijepljenje već postojeće LRC datoteke također funkcionira: njene `[mm:ss.xx]` vremenske oznake se prepoznaju, a nakon uvoza **nastavljate od prvog reda bez vremena**, tako da već usklađeni redovi ne moraju se ponovo raditi.",
     "To znači da se poluzavršeni LRC može sačuvati i kasnije ponovo zalijepiti da bi se nastavilo."
    ],
    "img": {
     "file": "lrc-paste2",
     "alt": "Oblast za lijepljenje stihova i dugme za parsiranje stihova",
     "cap": "Jedan red po stihu; lijepljenje cijelog LRC-a čita postojeća vremena tako da možete nastaviti"
    }
   },
   {
    "h2": "Izvezi LRC ili SRT",
    "ps": [
     "**Za muzički plejer, izvezite LRC.** foobar2000, sve vrste plejera i uređaja sa prikazom stihova ga čitaju.",
     "**Da stavite stihove na video ili ih dalje obradite, izvezite SRT.** Video titlovi, alati za titlove i softver za uređivanje čitaju SRT. Pri izvozu svaki red traje dok sljedeći ne počne, a posljednji red se vraća na 2 sekundi.",
     "Obje opcije izvoze samo redove koji imaju vrijeme – preskočeni redovi nikada ne ulaze u datoteku."
    ],
    "img": {
     "file": "lrc-export",
     "alt": "Dugmad za preuzimanje LRC-a, preuzimanje SRT-a i kopiranje u oblasti izvoza",
     "cap": "LRC za plejere, SRT za video; izvoze se samo redovi sa vremenom"
    }
   },
   {
    "h2": "Nekoliko stvari koje je lako pogriješiti",
    "ps": [
     "**Sve je malo pomaknuto nakon usklađivanja? Upotrijebite pomak.** Izvezite SRT i pomjerite ga u cjelini pomoću [[Prilagođavanje vremenske linije|/shift.html]]; daleko brže nego ponovno usklađivanje red po red.",
     "**Kašnjenje raste kako pjesma odmiče? To je problem brzine.** Kada se brzina reprodukcije i brzina snimanja razlikuju, greška raste prema kraju, a to zahtijeva proporcionalno skaliranje, a ne pomak.",
     "**Prečice izgledaju prirodno samo ako ih koristite zajedno.** Razmaknica pokreće i pauzira, Enter pečatira trenutni red, Z poništava jedan red — pritisnite Enter direktno tokom reprodukcije umjesto prebacivanja između miša i tastature.",
     "**Kvalitet zvuka utiče na preciznost.** Izvor sa jasnim vokalima je lakše pratiti; snimci uživo i izvori sa glasnom pozadinskom muzikom su primjetno teži."
    ]
   },
   {
    "h2": "Povezani alati i vodiči",
    "ps": [
     "Za kompletan vodič pogledajte [[Kako sinhronizovati LRC stihove|/guides/lrc.html]]; da pretvorite postojeći LRC u titlove pogledajte [[LRC u SRT|/guides/lrc-to-srt.html]]; ako izvezeni SRT nije dobro vremenski usklađen upotrijebite [[Prilagođavanje vremenske linije|/shift.html]]; i provucite rezultat kroz [[Provjera kvaliteta titlova|/qc.html]]."
    ]
   }
  ]
 },
 "lrc": {
  "seo": {
   "title": "Alat za sinhronizaciju stihova – Učitajte pjesmu, zalijepite stihove, tapkajte u ritmu – AI-SRTSub",
   "desc": "Učitajte pjesmu, zalijepite stihove, tapkajte vremensku oznaku po redu dok slušate, i izvezite LRC ili SRT. Razmaknica pokreće i pauzira, Enter pečatira red, Z poništava, ruke ostaju na tastaturi.",
   "h1": "Kako sinhronizovati LRC stihove",
   "intro": "Učitajte pjesmu, zalijepite stihove, tapkajte vremensku oznaku za svaki red dok slušate i izvezite standardni LRC ili SRT. Zvuk se reprodukuje lokalno i nikada se ne otprema.",
   "ctaText": "Otvorite alat za sinhronizaciju stihova"
  },
  "body": [
   {
    "h2": "Šta ovaj alat radi",
    "ps": [
     "Dajte pjesmi datoteku stihova uz koju se može pjevati: jedan red po stihu, pri čemu svaki red nosi vremensku tačku. Plejeri čitaju LRC, staze titlova čitaju SRT, a oboje se može izvesti ovdje."
    ]
   },
   {
    "h2": "1 Učitaj pjesmu",
    "ps": [
     "Prva kolona s lijeve strane prima audio datoteku: **MP3, M4A, FLAC, WAV i OGG** sve radi. Zvuk se reprodukuje lokalno i nikada se ne otprema.",
     "Kvalitet zvuka ne utiče na tačnost usklađivanja, ali izvor sa jasnim vokalima je lakši za praćenje; snimci uživo i izvori sa glasnom pozadinskom muzikom su primjetno teži za sinhronizaciju."
    ],
    "img": {
     "file": "lrc-up",
     "alt": "Oblast za učitavanje pjesme alata za sinhronizaciju stihova",
     "cap": "MP3 / M4A / FLAC / WAV / OGG sve radi, a zvuk se reproducira samo lokalno"
    }
   },
   {
    "h2": "2 Zalijepite stihove",
    "ps": [
     "Zalijepite stihove u drugu kolonu, **jedan red po stihu**; prazni redovi se automatski preskaču. Zatim kliknite na \"Parsiraj stihove\".",
     "Lijepljenje već postojeće LRC datoteke također funkcionira — njene `[mm:ss.xx]` vremenske oznake se prepoznaju, a nakon uvoza nastavljate od prvog reda bez vremena, tako da redovi koji su već usklađeni ne moraju se ponovo raditi."
    ],
    "img": {
     "file": "lrc-paste",
     "alt": "Oblast za lijepljenje stihova i dugme za parsiranje stihova",
     "cap": "Zalijepite jedan red po stihu ili zalijepite cijeli LRC i dozvolite alatu da pročita postojeća vremena"
    }
   },
   {
    "h2": "3 Tapkajte u ritmu dok slušate",
    "ps": [
     "Pustite pjesmu i pritisnite Enter u trenutku kada red počinje (ili kliknite \"Pečatiraj ovaj red\"); vrijeme za taj red se bilježi i kursor skače na sljedeći.",
     "Prečice: **razmaknica** pokreće i pauzira, **Enter** pečatira trenutni red, **Z** poništava jedan red. Pritiskanje Enter tokom reprodukcije je najglađi način rada — nema prebacivanja naprijed-nazad između miša i tastature.",
     "Jeste li pečatirali pogrešan red? Pritisnite Z da to poništite i pečatirajte ponovo. Ako uopće ne želite pečatirati red (instrumentalna pauza, čisto muzički odlomak), kliknite \"Preskoči ovaj red\" i on se neće pojaviti u izvozu."
    ],
    "img": {
     "file": "lrc-tap",
     "alt": "Kontrole za reprodukciju, pečatiranje ovog reda, poništavanje jednog reda i preskakanje ovog reda u oblasti za tapkanje u ritmu",
     "cap": "Razmaknica pokreće i pauzira, Enter pečatira trenutni red, Z poništava — ruke ostaju na tastaturi"
    }
   },
   {
    "h2": "4 Izvezi",
    "ps": [
     "Četvrta kolona obavlja izvoz: **Preuzmi LRC** za plejere, **Preuzmi SRT** za video staze titlova, ili \"Kopiraj\" da preuzmete tekst direktno.",
     "Izvoze se samo redovi sa vremenom; preskočeni redovi nikada ne ulaze u datoteku. U SRT izvozu svaki red traje dok sljedeći ne počne, a posljednji red se vraća na 2 sekundi."
    ],
    "img": {
     "file": "lrc-out",
     "alt": "Dugmad za preuzimanje LRC-a, preuzimanje SRT-a i kopiranje u oblasti izvoza",
     "cap": "LRC za plejere, SRT za video; izvoze se samo redovi sa vremenom"
    }
   },
   {
    "h2": "Šta ostaje netaknuto",
    "ps": [
     "Tekst stiha se ne prepisuje. Usklađivanje vremena samo dodaje jednu vremensku tačku po redu i nikada ne dira riječi koje ste zalijepili.",
     "Kada uvezete postojeći LRC, redovi koji već nose vremensku oznaku zadržavaju svoje originalno vrijeme i vi pečatirate samo od prvog neusklađenog reda nadalje."
    ]
   },
   {
    "h2": "Često postavljana pitanja",
    "ps": [
     "**Zašto neki redovi nedostaju u izvozu?** Preskočeni redovi i redovi bez vremena nikada ne ulaze u datoteku. Vratite se na korak tri i dodajte ih, ili potvrdite da su trebali biti preskočeni.",
     "**Mogu li se vremena naknadno promijeniti?** Ako želite malo pomaknuti sve nakon pečatiranja, izvezite SRT i upotrijebite [[Prilagođavanje vremenske linije|/shift.html]] da ga pomaknete ili skalirate u cjelini.",
     "**LRC ili SRT — šta trebam izvesti?** LRC za muzičke plejere (foobar2000, klijenti za striming, sve vrste plejera; SRT kada stihovi moraju stajati na videu ili se dalje obrađivati alatima za titlove.",
     "**Koliko traje jedna pjesma?** Zavisi od toga koliko redova ima i koliko precizni želite biti. Za pjesmu od trideset ili četrdeset redova, nekoliko minuta po prolazu kada jednom savladate tok; jurenje preciznosti na nivou riječi traje duže."
    ]
   },
   {
    "h2": "Privatnost",
    "ps": [
     "Zvuk i stihovi se obrađuju u potpunosti u pretraživaču: ništa se ne otprema i ništa ne prolazi kroz server. Zvuk se dekodira i reprodukuje samo lokalno."
    ]
   },
   {
    "h2": "Povezani alati i vodiči",
    "ps": [
     "Ako već imate LRC i želite titlove pogledajte [[LRC u SRT|/guides/lrc-to-srt.html]]; za razmišljanja i zamke iza usklađivanja vremena pogledajte [[Kako sinhronizovati LRC stihove|/guides/how-to-make-lrc-file.html]]; ako izvezeni SRT nije tačan upotrijebite [[Prilagođavanje vremenske linije|/shift.html]]; i provucite rezultat kroz [[Provjera kvaliteta titlova|/qc.html]]."
    ]
   }
  ]
 },
 "lrc-to-srt": {
  "seo": {
   "title": "Pretvarač LRC u SRT – Pretvorite stihove u titlove – AI-SRTSub",
   "desc": "Pretvorite LRC stihove u SRT titlove: svaki red traje dok sljedeći ne počne, posljednji isječak dobija 3 sekundi. Pjesme duže od 60 minuta se ispravno čitaju. Radi u vašem pretraživaču.",
   "h1": "LRC u SRT",
   "intro": "Pretvorite LRC datoteke stihova u SRT: ispustite datoteku, odaberite SRT, preuzmite. Vremena završetka se automatski popunjavaju iz sljedećeg reda.",
   "ctaText": "Pretvori LRC → SRT"
  },
  "body": [
   {
    "h2": "Kako se LRC razlikuje od SRT-a",
    "ps": [
     "LRC je format stihova: svaki red nosi samo vrijeme „početka pjevanja“ u `[minutes:seconds.cents]` i **nema vrijeme završetka**; svaki SRT isječak treba i početak i kraj. Dakle, srž konverzije je popunjavanje vremena završetka."
    ],
    "img": {
     "file": "convert-upload-lrc",
     "alt": "Oblast otpremanja: LRC datoteka učitana, detektovana kao LRC",
     "cap": "Datoteka stihova sa [00:12.50] vremenskim oznakama se odmah prepoznaje kao LRC"
    }
   },
   {
    "h2": "Kako se vremena završetka popunjavaju",
    "ps": [
     "Pravilo je jednostavno: **svaki red traje dok sljedeći ne počne**; posljednji red nema „sljedeći“, tako da dobija 3 sekundi. Također, LRC vremenske oznake nose samo minute i sekunde — bez sati — i polje minuta se ne prenosi (62:05 znači 1 sat 2 min 5 s), tako da se izuzetno duge numere poput DJ mikseva ispravno čitaju."
    ]
   },
   {
    "h2": "Kako pretvoriti",
    "ps": [
     "Otvorite [[pretvarač|/convert.html]], ispustite LRC, odaberite **SRT - SubRip** kao izlaz, zatim pretvorite i preuzmite. Korisno za muzičke spotove i za postavljanje stihova kao titlova u plejerima; izvezeni SRT se može ponovo pretvoriti u VTT za web."
    ]
   }
  ]
 },
 "make-bilingual-subtitles": {
  "seo": {
   "title": "Dva načina za izradu dvojezičnih titlova – AI-SRTSub",
   "desc": "Dvojezični titlovi dolaze u dva oblika: dva reda u jednom isječku ili dva isječka na istoj vremenskoj liniji. Prednosti, mane i kako se prebacivati između njih. – AI-SRTSub",
   "h1": "Dvojezični titlovi na dva načina",
   "intro": "Isti dvojezični titl može skrivati dva potpuno različita rasporeda. Naučite da ih razlikujete, pa vam pravljenje, dijeljenje i konverzija više neće stvarati probleme.",
   "ctaText": "Rad sa dvojezičnim titlovima"
  },
  "body": [
   {
    "h2": "Kako izgledaju ova dva oblika",
    "ps": [
     "**Oblik B: dva isječka na istoj vremenskoj liniji.** Jedan red dijaloga postaje dva odvojena isječka titla sa identičnim vremenskim usklađivanjem — jedan na engleskom, jedan na kineskom — nacrtana jedan iznad drugog. Ovo je najčešći način na koji se grade dvojezični ASS titlovi."
    ]
   },
   {
    "h2": "Gdje svaki od njih zakazuje",
    "ps": [
     "Slaba tačka Oblika A je **detekcija**: dijeljenje traka se oslanja na sistem pisanja, tako da se kinesko-engleski ili japansko-engleski parovi razdvajaju na prvi pogled, dok se **kombinacije koje dijele jedno pismo** — engleski plus francuski, ili kineski plus japanski kanji — ne mogu razlikovati. Slaba tačka Oblika B je **proizvodnja**: dvije vremenske linije se moraju tačno poklapati i njihovo ručno poravnavanje je zamorno; neki plejeri također crtaju oba isječka sa iste vremenske linije, pretrpavajući ekran. Pravilo palca: koristite Oblik A za gotove titlove namijenjene gledaocima; koristite Oblik B kada trebate rastaviti trake radi daljeg rada."
    ]
   },
   {
    "h2": "Dva puta",
    "ps": [
     "**Napravite dvojezične titlove iz originala**: upotrijebite [[Prijevod AI titlova|/translate.html]] i izaberite „Dvojezično · original na vrhu“ ili „Dvojezično · prijevod na vrhu“ pri izvozu — dobićete Oblik A direktno; odabirom ASS-a se takođe nude dva rasporeda, „slagano gore i dolje“ i „dva reda na dnu“.",
     "**Spojite dvije trake ili pretvorite između oblika**: upotrijebite [[Uklanjač dvojezičnih titlova|/bilingual.html]] i njegov režim „spoji u jedan unos u dva reda“ – Oblik B unutra, Oblik A van; idući u suprotnom smjeru, „podijeli u dvije datoteke“ uzima Oblik A ili B unutra i daje dvije nezavisne trake van."
    ],
    "img": {
     "file": "bilingual-modes",
     "alt": "Četiri režima dvojezičnog uklanjača; „spoji u jedan unos u dva reda“ spaja dva isječka koja dijele vremensku liniju",
     "cap": "„Spoji u jedan unos u dva reda“: Oblik B postaje Oblik A"
    }
   },
   {
    "h2": "Koji uređaj će to reproducirati",
    "ps": [
     "Web plejeri (HTML5 `<track>`) i većina mobilnih plejera pouzdanije rukuju Oblikom A; desktop plejeri (VLC, mpv, PotPlayer) prihvataju oba i mogu čak dati dva isječka sa iste vremenske linije različite boje i položaje. Ako ste u nedoumici, izvezite Oblik A kao SRT — on se najbolje prenosi. Za same razlike između formata pogledajte [[SRT, VTT ili ASS: Koji biste trebali koristiti|/guides/subtitle-format-comparison.html]]."
    ],
    "img": {
     "file": "translate-export",
     "alt": "Opcije dvojezičnog stila na panelu za izvoz alata za prevođenje",
     "cap": "Odaberite redoslijed dvojezičnih linija direktno pri izvozu — jedan korak i gotovo je"
    }
   },
   {
    "h2": "Često postavljana pitanja",
    "ps": [
     "**Dvojezični titlovi izgledaju pretrpano — šta mogu učiniti?** Kontrolišite širinu reda: panel za izvoz alata za prevođenje ima postavku „širina dvojezičnog reda“; uži red znači manje znakova po isječku i čišći ekran.",
     "**Želim samo jednu traku.** Režim uklanjača „zadrži samo original / zadrži samo prijevod“ to rješava jednim klikom, pogledajte [[Podijeli dvojezične titlove u dvije trake|/guides/split-bilingual-subtitles.html]]."
    ]
   }
  ]
 },
 "merge": {
  "seo": {
   "title": "Spajanje dvojezičnih i stilizovanih titlova – Spoji, stilizuj, izvezi – AI-SRTSub",
   "desc": "Spojite dvije datoteke titlova u dvojezičnu traku, restilizujte postojeću dvojezičnu datoteku ili stilizujte jezički jedinstvenu: načini uparivanja, ASS i VTT šabloni, i koji format izvesti.",
   "h1": "Kako koristiti dvojezično spajanje i titlove sa specijalnim efektima",
   "intro": "Kombinujte dvije datoteke titlova u jednu dvojezičnu traku ili direktno stilizujte titlove: font, boja, obris i položaj su „ono što vidiš to i dobiješ“, a pregled odgovara izvozu.",
   "ctaText": "Otvorite alat za titlove sa specijalnim efektima"
  },
  "body": [
   {
    "h2": "Šta ovaj alat radi",
    "ps": [
     "Ova stranica zapravo pokriva tri posla: spajanje originalne i prevedene datoteke titlova u jednu dvojezičnu datoteku, podešavanje redoslijeda i stila datoteke koja je već dvojezična, i dodavanje specijalnih efekata datoteci sa jednim jezikom. Sva tri dijele iste parametre stila i isti pregled."
    ]
   },
   {
    "h2": "Tri posla, jedna stranica",
    "ps": [
     "Na vrhu stranice nalaze se tri kartice: **Spoji dvije datoteke**, **Prilagodi dvojezičnu datoteku**, **Jednojezična datoteka**. Vaš izbor određuje koliko ulaznih kolona se pojavljuje sa lijeve strane.",
     "Pri spajanju dvije datoteke, lijeva strana sadrži dvije kolone, „1 Originalni titlovi“ i „2 Prevedeni titlovi“; svaka prihvaća otpremljenu datoteku ili tekst zalijepljen direktno. Prilagođavanje dvojezične datoteke i stilizovanje jednojezične datoteke zahtijevaju samo po jednu kolonu."
    ],
    "img": {
     "file": "merge-mode",
     "alt": "Tri kartice na vrhu alata za titlove sa specijalnim efektima i ulazna oblast sa lijeve strane",
     "cap": "Tri kartice na vrhu; odabir \"Spoji dvije datoteke\" donosi originalnu i prevedenu kolonu sa lijeve strane"
    }
   },
   {
    "h2": "Kako se dvije datoteke uparuju",
    "ps": [
     "Prva stavka pod „3 Postavke spajanja“ je režim uparivanja: **Upari po redoslijedu · koristi originalnu vremensku liniju**, **Upari po vremenskoj liniji · koristi originalnu vremensku liniju**, **Upari po redoslijedu · koristi prevedenu vremensku liniju**.",
     "Kada obje datoteke imaju isti broj unosa istim redoslijedom, uparivanje po redoslijedu je najsigurnije. Kada se brojevi razlikuju (jedna strana je spojila unose, druga ih je podijelila), uparite po vremenskoj liniji i pustite alat da uporedi prema blizini. Čiju vremensku liniju koristiti zavisi od toga koja je datoteka tačnija — obično originalna.",
     "Ispod toga su struktura teksta (automatsko prepoznavanje / dva reda po unosu / naizmjenični parovi) i redoslijed (original na vrhu / prijevod na vrhu)."
    ],
    "img": {
     "file": "merge-pair",
     "alt": "Režim uparivanja, struktura teksta i opcije redoslijeda pod postavkama spajanja",
     "cap": "Režim uparivanja odlučuje koji red ide uz koji, a čiju vremensku liniju treba koristiti postavlja se i ovdje"
    }
   },
   {
    "h2": "Podesite stil stavku po stavku",
    "ps": [
     "Panel stila se nalazi sa desne strane. Kada izvozite ASS, primjenjuje se blok \"ASS izgled\": raspored (podijeljeno · odvojeno gore i dolje / složeno · dva reda na dnu), veličina, boja, neprozirnost, font, podebljano, kurziv, prored slova, obris, boja obrisa, sjena/pozadina (nijedna / sjena / pozadina), dubina, boja ivice, neprozirnost ivice, horizontalno poravnanje (dno · lijevo / dno · centar / dno · desno) i udaljenost od dna prijevoda (primarni) reda, plus font, sjena/pozadina i lijeva/desna margina originalnog (sekundarnog) reda.",
     "Kada izvozite dvojezično VTT stilizovanje, primjenjuje se blok \"WebVTT stil\": povrh šest unaprijed postavljenih postavki (standardno / kompaktno / kinematografski / gore / pristupačno / portret) možete promijeniti vertikalnu liniju, sidro (dno / vrh / centar), horizontalni položaj, veličinu širine, vrijednost poravnanja i visinu linije cijelog isječka, plus boju pozadine, neprozirnost pozadine i širinu obrisa reda prijevoda; originalni red može naslijediti glavni stil ili se postaviti zasebno.",
     "Kada završite, možete sačuvati rezultat kao unaprijed postavljenu postavku i ponovo je koristiti kasnije odabirom pod \"Iz sačuvanih unaprijed postavljenih postavki\" i klikom na \"Primijeni\"."
    ],
    "img": {
     "file": "merge-style",
     "alt": "Parametri ASS panela izgleda sa desne strane",
     "cap": "Veličina, boja, obris, sjena/pozadina i poravnanje su podesivi, a rezultat se može sačuvati kao unaprijed postavljena postavka"
    }
   },
   {
    "h2": "Provjerite pregled prije izvoza",
    "ps": [
     "\"Pregled spajanja\" je tabela: #, vrijeme, original, prijevod, stil. Traka iznad filtrira sumnjive redove po \"ima zvučne efekte\", \"ima prefiks govornika\", \"kraće od 1 sekunde\", \"više od dva reda\" i \"prešla brzina čitanja\", ili po ključnoj riječi koju upišete.",
     "Klik na prorez stila reda širi uređivač tog proreza i navodi samo redove koji ga koriste; \"Obriši sva poništavanja\" vraća svako ručno poništavanje na šablon. Oblast prilagođavanja vremenske linije ispod upravlja globalnim pomakom (sa datog isječka) i proporcionalnim skaliranjem.",
     "Kada izgleda dobro, idite na \"4 Izvoz\": preuzmite datoteku titlova ili kopirajte njen sadržaj."
    ],
    "img": {
     "file": "merge-preview",
     "alt": "Tabela pregleda spajanja i njena traka za filtriranje",
     "cap": "Pregled je izvoz; filtrirajte sumnjive redove po vrsti ili proširite jedan prorez stila"
    }
   },
   {
    "h2": "Šta ostaje netaknuto",
    "ps": [
     "Stilizovanje mijenja samo izgled, nikada dijalog. Tekst originala i prijevoda nije izmijenjen ni za jedan znak tokom spajanja; osim ako ga namjerno ne promijenite u oblasti za prilagođavanje ispod pregleda, vremenska linija dolazi iz datoteke koju ste odabrali.",
     "Kada izvozite SRT ili \"VTT bez stilizovanja\", nikakve informacije o stilu se ne upisuju u datoteku — stranica vam govori da VTT nema STYLE blok i plejer će koristiti svoj zadani izgled. Ako želite stilizovanje, odaberite dvojezično VTT stilizovanje ili ASS."
    ]
   },
   {
    "h2": "Često postavljana pitanja",
    "ps": [
     "**Šta ako dvije datoteke imaju različit broj unosa?** Upotrijebite \"Upari po vremenskoj liniji\" i alat upoređuje prema blizini; unosi koje ne može upariti se ne izmišljaju.",
     "**Šta ako plejer ignorira stilizovanje u izvezenom ASS-u?** Stilovi su pohranjeni unutar datoteke, ali podrška plejera za ASS varira. Ako vam treba prenosiviji izgled, izvezite dvojezično VTT stilizovanje.",
     "**Kako da se vratim na početni šablon nakon što sam ga pokvario?** \"Vrati zadane parametre\" u ASS bloku i \"Vrati zadane postavke šablona\" u VTT bloku resetuju svako svoj dio.",
     "**Šta je sedam redova u uzorku?** Oni su ugrađeni primjer, tu su samo da vidite kako spajanje izgleda; uzorak se ne može izvesti. Otpremite sopstvene titlove i kliknite na pregled spajanja i oni se automatski zamjenjuju."
    ]
   },
   {
    "h2": "Privatnost",
    "ps": [
     "Titlovi se obrađuju u potpunosti u pretraživaču: ništa se ne otprema i ništa ne prolazi kroz server. Zatvorite pretraživač i sve iz te sesije je nestalo."
    ]
   },
   {
    "h2": "Povezani alati i vodiči",
    "ps": [
     "Da podijelite dvojezičnu datoteku nazad u dvije trake upotrijebite [[Dvojezično dijeljenje|/bilingual.html]]; da idete u suprotnom smjeru i pretvorite jedan jezik u dvojezičnu datoteku pogledajte [[Dva načina za izradu dvojezičnih titlova|/guides/make-bilingual-subtitles.html]]; provucite rezultat kroz [[Provjera kvaliteta titlova|/qc.html]]; za cijelu sezonu odjednom upotrijebite [[Grupna konverzija|/batch.html]]."
    ]
   }
  ]
 },
 "qc": {
  "seo": {
   "title": "Kako koristiti provjeru kvaliteta titlova – Provjera vremenske linije i rasporeda – AI-SRTSub",
   "desc": "Provjera kvaliteta titlova: 17 pravila hvataju preklapanja, širinu reda, brzinu čitanja i interpunkciju, pragovi po 27 jezika. Polovina su popravke jednim klikom; preuzmite izvještaj.",
   "h1": "Kako koristiti provjeru kvaliteta titlova",
   "intro": "Prije nego što predate titlove, provucite ih kroz stranicu za provjeru kvaliteta za vrijeme i raspored: šta se provjerava, kako pročitati izvještaj i koji se problemi mogu riješiti jednim klikom — sve je obuhvaćeno ovdje.",
   "ctaText": "Otvorite provjeru kvaliteta titlova"
  },
  "body": [
   {
    "h2": "Čemu služi ovaj alat",
    "ps": [
     "Titlovi koji golim okom izgledaju dobro često se ispostavi da imaju preklapajuće vremenske linije, preširoke redove ili previsoku brzinu čitanja kada se isporuče. Stranica za provjeru kvaliteta navodi ove probleme jedan po jedan:"
    ]
   },
   {
    "h2": "Prvo odaberite pravila jezika",
    "ps": [
     "Pod „Provjeri po pravilima kojeg jezika“ postavljate pet pragova: **maksimalna širina jednog reda** (42 jedinica pola širine za pejzaž prema zadanim postavkama, 36 za kvadrat, 28 za portret), **ograničenje brzine čitanja** (18 jedinice širine u sekundi za kineski, japanski i korejski, 20 za druge jezike), **minimalno trajanje od 833 milisekundi**, **maksimalno trajanje od 7000 milisekundi**, i **najviše 2 redova**. Postavite jezik titla na automatsko prepoznavanje ili ručno odaberite jedan od 27; orijentacija ekrana mijenja samo nivo širine reda — brzina čitanja, trajanja i broj redova ostaju kakvi jesu. Jedinice pola širine su zajednička mjera: jedan hanzi se računa kao 2, jedno latinično slovo kao 1 — širina reda od 42 je jednaka 21 hanzi ili 42 slova."
    ],
    "img": {
     "file": "qc-rules",
     "alt": "Postavke provjere kvaliteta: pet polja za unos praga plus padajući meni za jezik titlova i orijentaciju ekrana",
     "cap": "Pet pragova + jezik + orijentacija; zadane postavke odgovaraju uobičajenoj industrijskoj praksi"
    }
   },
   {
    "h2": "Čitanje izvještaja",
    "ps": [
     "Izveštaj o 17 pravilima javlja nalaze na tri nivoa: **greške** (iskvareni tekst, format vremenske oznake, kraj ranije nego početak, pokvareno numerisanje), **upozorenja** (prazni unosi, preklapanja, prekratka ili preduga trajanja, brzina čitanja preko granice, preširoki redovi, više od dva reda), i **savjeti** (položaj prijeloma reda, vodeći ili prateći razmaci, nedostajući razmaci, norme interpunkcije i još mnogo toga). Svaki nalaz nosi broj unosa i detalj „izmjereno X, prag Y“, a lista se može filtrirati po nivou. Dvojezični unosi dobijaju izuzeća: oba oblika se automatski prepoznaju, provjere preklapanja izuzimaju cijeli par, a brzina čitanja računa samo red napisan na ciljnom jeziku."
    ],
    "img": {
     "file": "qc-report",
     "alt": "Oblast izvještaja o provjeri kvaliteta: nalazi grupirani po greškama, upozorenjima i savjetima, svaki sa brojem unosa i izmjerenom vrijednošću",
     "cap": "Izvještaj na tri nivoa: svaki nalaz nosi svoj broj unosa i izmjerene/granične vrijednosti"
    }
   },
   {
    "h2": "Popravka i izvoz",
    "ps": [
     "Kartica „Popravi i izvezi“ navodi samo **stavke koje se mogu automatski popraviti**: ponovno namotavanje, uklanjanje praznih unosa, dodavanje nedostajućih razmaka, zamjena interpunkcije prema jezičnim normama, ponovno numerisanje — sve što ostavlja vrijeme netaknutim je označeno prema zadanim postavkama; **stavke koje mijenjaju vrijeme** (zamjena početka i kraja, pomjeranje preklapanja, skraćivanje ili rastezanje trajanja) nisu označene prema zadanim postavkama — označite ih nakon što sami provjerite uticaj. Kliknite „Primijeni popravke“ i nova provjera se pokreće automatski; brojač broji samo ono što je zaista popravljeno — redovi koji se nisu mogli ponovo namotati se ne ubacuju u brojeve. **Brzina čitanja preko granice nema automatsku popravku**: mašina ne može znati koju riječ skratiti, tako da se prijevod mora skratiti ručno ili se vrijeme mora prilagoditi. Nakon popravke izvezite SRT ili VTT, ili kliknite „Preuzmi izvještaj“ da sačuvate običan tekstualni `.qc.txt` izvještaj."
    ],
    "img": {
     "file": "qc-fix",
     "alt": "Kartica za popravku: polja za potvrdu za stavke koje se mogu automatski popraviti i dugme Primijeni popravke",
     "cap": "Na listu dolaze samo stavke koje se mogu automatski popraviti; popravke koje mijenjaju vrijeme nisu označene prema zadanim postavkama"
    }
   },
   {
    "h2": "Često postavljana pitanja",
    "ps": [
     "**Zašto se moj ASS ne može izvesti?** Provjera kvaliteta izvozi samo SRT i VTT; ASS ulazi ali ne izlazi. Da zadržite ASS efekte, prvo dobro razmislite o tome na [[Pretvarač formata|/convert.html]].",
     "**Šta znači brzina čitanja od 18?** Za kineski, japanski i korejski gornja granica je 9 znakova pune širine u sekundi (18 jedinice pola širine); drugi jezici dobijaju 20 jedinice pola širine u sekundi. Ovo su uobičajeni nivoi udobnosti, a polje za unos vam omogućava da ih promijenite.",
     "**Kodiranje moje datoteke je pokvareno — može li se i dalje provjeriti?** Provjera kvaliteta čita samo UTF-8; prvo popravite kodiranje na stranici za popravku iskvarenog teksta.",
     "**Hoće li dirati moju vremensku liniju?** Sve dok ostavljate grupu „mijenja vrijeme“ neoznačenom, neće; čak i kada je označena, svaka promjena je precizno objašnjena prije nego što se popravka primijeni."
    ]
   },
   {
    "h2": "Povezani vodiči",
    "ps": [
     "Titlovi prolaze prebrzo da bi se pročitali — pogledajte namjenski vodič [[Titlovi prebrzi za čitanje|/guides/subtitle-too-fast.html]]. Šta provjeriti prije isporuke — kontrolna lista je na [[Šta provjeriti prije isporuke|/guides/subtitle-quality-check.html]]. Vremenska linija koja bježi iz sinhronizacije je drugačija vrsta problema — pogledajte [[Titlovi koji bježe iz sinhronizacije|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "remove-subtitle-ads": {
  "seo": {
   "title": "Uklonite oglase i vodene žigove iz titlova – AI-SRTSub",
   "desc": "Uklonite vodene žigove i oglase iz titlova: URL-ovi, zasluge tima za fan-prevođenje i oznake kodiranja se čiste jednim klikom, plus dupli i prazni unosi. – AI-SRTSub",
   "h1": "Uklonite oglase i vodene žigove iz titlova",
   "intro": "URL-ovi, zasluge i promotivni unosi sakriveni u vašim titlovima čiste se u jednom prolazu pravilima vodenih žigova čistača — a svako pogrešno brisanje može se poništiti unos po unos.",
   "ctaText": "Očistite vodene žigove titlova"
  },
  "body": [
   {
    "h2": "Šta su ovi vodeni žigovi",
    "ps": [
     "Titlovi preuzeti sa interneta često dobijaju dodatne unose na početku ili kraju (ponekad i u sredini): URL-ove, adrese e-pošte, imena grupa za fan-prevođenje, `encoded by` / `translated by` zasluge, imena sajtova poput opensubtitles, i redove poput „zapadnite naš WeChat nalog“ ili „samo u svrhu učenja“. To su normalni unosi titlova — sa vremenskom linijom, zauzimaju red — tako da ih plejeri ne mogu ukloniti; moraju se detektovati po sadržaju."
    ]
   },
   {
    "h2": "Gdje to učiniti",
    "ps": [
     "Otvorite [[Čistač titlova|/clean.html]] i ispustite svoj titl; grupa „Vodeni žigovi i smeće unosi“ već ima označene opcije „Ukloni vodene žigove i oglase“, „Ukloni duple unose“ i „Ukloni prazne unose“ prema zadanim postavkama, i čišćenje počinje automatski. Detekcija radi na dva nivoa: **čvrsti signali** poput URL-ova, e-pošte, grupa za fan-prevođenje i imena sajtova brišu cijeli unos pri pogodku bilo koje dužine; **meki signali** poput @korisničkih imena, zasluga za „kodiranje“ ili „lektorisanje“ ocjenjuju se samo u kratkim unosima od najviše 40 znakova, kako bi se izbjeglo skraćivanje dugog dijaloga. Dvojezični unosi se prvo čiste od redova vodenih žigova red po red dok se redovi dijaloga zadržavaju; unos se briše u cjelini samo ako tragovi vodenih žigova ostanu nakon čišćenja."
    ],
    "img": {
     "file": "clean-opts",
     "alt": "Ekrana opcija čišćenja: tri polja za potvrdu grupe vodenih žigova i smeća unosa",
     "cap": "Grupa „Vodeni žigovi i smeće unosi“ je uključena prema zadanim postavkama — nije potrebno ručno podešavanje"
    }
   },
   {
    "h2": "Pregled i izvoz",
    "ps": [
     "Na listi promjena, svaki obrisani unos nosi oznaku „vodeni žig i oglas“ — pregledajte je da potvrdite da ništa nije uklonjeno greškom; ako nešto izgleda pogrešno, kliknite „Vrati“ da to vratite. Kada potvrdite, preuzmite: naziv datoteke automatski dobija oznaku `.clean`. Čišćenje se vrši lokalno u vašem pretraživaču; vaši titlovi se nikada nigdje ne šalju."
    ]
   }
  ]
 },
 "repair": {
  "seo": {
   "title": "Kako popraviti iskvarene (mojibake) titlove – Detektujte kodiranje – AI-SRTSub",
   "desc": "Vodič: detektujte originalno kodiranje (GBK / Big5 / Shift_JIS / EUC-KR), rangirajte popravke po tome šta najviše liči na jezik, zatim sačuvajte UTF-8 sa BOM-om ili GBK. Vremena i brojevi indeksa se nikada ne mijenjaju.",
   "h1": "Kako popraviti iskvarene titlove",
   "intro": "Datoteka titlova puna smeća znakova rijetko je oštećena — samo je pročitana sa pogrešnim kodiranjem. Alat za popravku detektuje originalno kodiranje i vraća prave znakove nazad, ostavljajući brojeve indeksa i vremena na miru.",
   "ctaText": "Otvorite alat za popravku iskvarenog teksta"
  },
  "body": [
   {
    "h2": "Šta ovaj alat radi",
    "ps": [
     "Isti bajtovi pročitani kao UTF-8 i pročitani kao GBK proizvode dva potpuno različita skupa znakova — datoteka nije oštećena, dekodirana je sa pogrešnim kodiranjem. Evo šta alat za popravku radi:"
    ]
   },
   {
    "h2": "Otpremite datoteku, nemojte je lijepiti",
    "ps": [
     "Dvije ulazne tačke mogu popraviti različite količine oštećenja, pa **otpremite datoteku ako možete**. Sa datotekom, originalni bajtovi su još uvijek tu: alat pokušava jedno kodiranje za drugim, i kada prepozna GBK dekodira kao GBK — ništa se ne mora pogađati. Tekst koji stigne lijepljenjem više nisu sirovi bajtovi. Do trenutka kada pretraživač preda nisku, greška se već dogodila, tako da alat može raditi samo unazad i uzeti ono što može dobiti.",
     "Ako zalijepljeni tekst već sadrži znak za zamjenu (onaj uokvireni znak pitanja `�`), originalni bajtovi su odavno nestali i ništa ih ne može vratiti. Stranica to izričito kaže: vratite se gore i upotrijebite \"Izaberi datoteku\" da otpremite original."
    ],
    "img": {
     "file": "repair-up",
     "alt": "Oblast otpremanja stranice za popravku: zona za ispuštanje i polje za lijepljenje, sa detektovanim kodiranjem prikazanim iznad",
     "cap": "Povucite datoteku unutra ili je potražite; polje za lijepljenje se nalazi ispod i može popraviti mnogo manje"
    }
   },
   {
    "h2": "Šta vam dijagnoza govori",
    "ps": [
     "Kada otpremite, kartica dijagnoze daje presudu. **Nema pronađenih iskvarenosti**: sadržaj se čita dobro kakav jeste; ako vaš plejer i dalje prikazuje smeće, plejer je koristio pogrešno kodiranje — idite dolje na \"Sačuvaj kao\", odaberite drugo i dajte mu tu datoteku. Kada **izgleda kao iskvaren tekst**, kartica navodi koji trag je pronašla:"
    ],
    "img": {
     "file": "repair-diag",
     "alt": "Kartica dijagnoze: presuda plus svaki trag iskvarenosti naveden red po red",
     "cap": "Dijagnoza navodi tragove po vrsti umjesto da samo kaže \"to je iskvaren tekst\""
    }
   },
   {
    "h2": "Kako se kandidati rangiraju i kako odabrati",
    "ps": [
     "Pod \"Načini da se ovo popravi\", kandidati su navedeni redoslijedom **najviše liči na pravi jezik na prvom mjestu**, do 12 njih, a svaki je označen parom kodiranja iz i u koje je pročitan. Kliknite na jedan da vidite kako izgleda, izaberite ga, a zatim se pomaknite dolje da sačuvate. Niste zadovoljni? Upotrijebite \"Zadrži kakvo jeste\" da se vratite na original.",
     "Redoslijed dolazi iz ocjene: udio uobičajenih znakova, niza naglasaka, niza simbola, zidova nejasnih znakova, sve uzeto u obzir. **Ako nijedna ocjena nije jasno bolja, ništa se ne preporučuje** — neće vam gurati upola uvjerljivog kandidata samo da bi ga imalo. Tekst koji je oštećen dva puta (sačuvan pogrešno jednom, pa popravljen pogrešno jednom) dobija još jedan krug naknadnog rješavanja na najboljim kandidatima, tako da se sve unutar dva sloja još uvijek može spasiti."
    ],
    "img": {
     "file": "repair-fix",
     "alt": "Lista kandidata za popravku rangirana po tome koliko liči na pravi jezik, a svaki je označen svojim parom kodiranja",
     "cap": "Kandidati rangirani po \"najviše liči na pravi jezik\", od kojih svaki pokazuje uključena kodiranja"
    }
   },
   {
    "h2": "Pravilno čuvanje je posljednji korak",
    "ps": [
     "Popravljeni rezultat se i dalje mora pravilno sačuvati. Kada plejer ne može detektovati UTF-8, čuvanje kao **UTF-8 sa BOM-om** (Windows plejeri se oslanjaju na BOM) ili kao **GBK** obično to rješava. Možete sačuvati kao UTF-8, UTF-8 (sa BOM-om), GBK, Big5, Shift_JIS ili EUC-KR; ako nešto ne odgovara, rečeno vam je da odaberete drugo (GBK ne može držati korejski). Preuzete datoteke dobijaju `-fixed` dodato imenu.",
     "Kada detektovano kodiranje nije UTF-8, \"Sačuvaj kao\" je već unaprijed podešeno na UTF-8 sa BOM-om za vas. Kada sami dotaknete padajući meni, prestaje da pogađa umjesto vas."
    ],
    "img": {
     "file": "repair-out",
     "alt": "Oblast rezultata: tekstualno polje sa padajućim menijem za čuvanje kao i dugmetom za preuzimanje",
     "cap": "Izaberite kodiranje, a zatim preuzmite — naziv datoteke dobija -fixed dodato"
    }
   },
   {
    "h2": "Šta se nikada ne dira",
    "ps": [
     "Zamjenjuju se samo pogrešno pročitani znakovi. Brojevi indeksa, vremena i linije ASS stila se ni na koji način ne mijenjaju."
    ]
   },
   {
    "h2": "Često postavljana pitanja",
    "ps": [
     "**Otpremio sam datoteku, pa zašto je i dalje moram ponovo sačuvati?** Sama datoteka je obično u redu; ono što je pokvareno je plejer koji je čita sa pogrešnim kodiranjem. U tom slučaju nijedan znak u tekstu ne treba mijenjati — samo sačuvajte kopiju kao UTF-8 sa BOM-om ili GBK i dajte je plejeru.",
     "**Zašto se zalijepljeni tekst ne može popraviti?** Jednom kada se znak za zamjenu pojavi u zalijepljenom sadržaju, originalni bajtovi su nestali i nema ničega o čemu bi se moglo rasuđivati unazad. Vratite se gore i upotrijebite \"Izaberi datoteku\" da otpremite original.",
     "**Kandidat kojeg želim nije naveden?** Ništa se ne preporučuje osim ako nema jasno bolju ocjenu od onoga što već imate. Pokušajte prebaciti detektovano kodiranje na drugo i pustite ga da izvrši ponovno rangiranje.",
     "**Koliko datoteka odjednom?** Jednu po jednu. Preuzmite popravku, a zatim ubacite sljedeću datoteku."
    ]
   },
   {
    "h2": "Privatnost",
    "ps": [
     "Detekcija i popravka se odvijaju u potpunosti u vašem pretraživaču. Nikakav sadržaj titlova se nikada ne šalje na server."
    ]
   },
   {
    "h2": "Povezani alati i vodiči",
    "ps": [
     "Odakle potiču iskvareni titlovi i zašto na kraju izgledaju tako — pogledajte [[Odakle potiču iskvareni titlovi|/guides/subtitle-garbled-characters.html]]; kodiranje je u redu ali je sadržaj prljav — upotrijebite [[Čišćenje titlova|/clean.html]]; da provjerite vrijeme i brzinu čitanja — [[Provjera kvaliteta titlova|/qc.html]]."
    ]
   }
  ]
 },
 "sbv-to-srt": {
  "seo": {
   "title": "Pretvarač SBV u SRT – Pretvorite YouTube titlove – AI-SRTSub",
   "desc": "Pretvorite SBV titlove preuzete sa YouTube-a u SRT za CapCut, Premiere i plejere. Vremenske vrijednosti ostaju netaknute — mijenja se samo raspored. Radi u vašem pretraživaču.",
   "h1": "SBV u SRT",
   "intro": "Pretvorite YouTube SBV titlove u SRT: ispustite datoteku, odaberite SRT, preuzmite. Vremenske vrijednosti su netaknute — mijenja se samo struktura.",
   "ctaText": "Pretvori SBV → SRT"
  },
  "body": [
   {
    "h2": "Šta je SBV i odakle dolazi",
    "ps": [
     "SBV je **YouTube-ov format titlova**: preuzimanje „datoteka titlova“ sa YouTube-a često vam donosi .sbv. Njegova struktura je jednostavnija od SRT-a — vremena početka i kraja nalaze se u **jednom redu** odvojena zarezima, tekst slijedi direktno ispod, i nema brojeva isječaka."
    ]
   },
   {
    "h2": "Zašto ih plejeri odbijaju",
    "ps": [
     "Izvan samog YouTube-a, većina softvera za uređivanje i plejera ne podržava SBV. Nedostaje mu blok numerisanja i svoju liniju vremena piše drugačije od SRT-a, tako da preimenovanje ekstenzije ne radi ništa — struktura se mora ponovo izgraditi za stvarnost."
    ],
    "img": {
     "file": "convert-upload-sbv",
     "alt": "Oblast otpremanja: SBV datoteka učitana, detektovana kao SBV",
     "cap": "SBV se prepoznaje takav kakav jeste, nije potrebno preimenovanje ekstenzije"
    }
   },
   {
    "h2": "Kako pretvoriti",
    "ps": [
     "Otvorite [[pretvarač|/convert.html]], ispustite SBV, odaberite **SRT - SubRip** kao izlaz, zatim pretvorite i preuzmite. Brojevi isječaka se dodjeljuju nanovo, a originalni prijelomi reda unutar isječka se spajaju u jedan red (SRT dozvoljava višelinske isječke; SBV se ovdje izvozi kao jednolinski)."
    ]
   }
  ]
 },
 "shift": {
  "seo": {
   "title": "Kako pomaknuti vrijeme titlova (pomak, skaliranje, dva sidra) – AI-SRTSub",
   "desc": "Ilustrovani vodič kroz uređivač vremena: učitajte titlove, dodajte korake podešavanja, korekcija sa dva sidra, podešavanja po isječku i izvoz.",
   "h1": "Uređivač vremena: Vodič korak po korak",
   "intro": "Ovaj vodič prolazi kroz alat od vrha do dna: učitajte titlove, dodajte korake podešavanja, pokrenite provjere, fino podesite po isječku i izvezite.",
   "ctaText": "Otvorite uređivač vremena"
  },
  "body": [
   {
    "h2": "Učitajte svoje titlove",
    "ps": [
     "Povucite datoteku u isprekidani okvir ili kliknite da izaberete jednu; također možete **zalijepiti sadržaj** direktno u tekstualno polje. Format se detektuje i iz ekstenzije i iz sadržaja, a rezultat se prikazuje u čipu formata. Podržani unosi: srt, vtt, ass (uklj. ssa), sbv, lrc i txt."
    ],
    "img": {
     "file": "shift-upload",
     "alt": "Oblast otpremanja: primjer titla učitan, detektovan kao SRT",
     "cap": "Naziv datoteke i detektovani format pojavljuju se ispod zone za ispuštanje; tekstualno polje ostaje podložno uređivanju."
    }
   },
   {
    "h2": "Dodajte korake podešavanja",
    "ps": [
     "Podešavanja formiraju **cjevovod koraka**: svaki korak radi jedan posao i uzima jedan broj, sa svojom jedinicom prikazanom unutar okvira. Koraci se primjenjuju odozgo prema dolje, i promjena bilo kojeg koraka **ponovo izračunava sve iz originalnih titlova** — tako da se možete vratiti i prilagoditi broj u bilo koje vrijeme bez pravljenja nereda."
    ]
   },
   {
    "h2": "Korekcija sa dva sidra",
    "ps": [
     "Kada ne znate ni pomak u sekundama ni omjer, upotrijebite dva sidra: jednom dodana, **dva \"trenutna\" polja se automatski popunjavaju** iz prvog i posljednjeg isječka vaše datoteke. Popunjavate samo \"ciljna\" polja — vremena u koja bi se ti isječci trebali zapravo pojaviti. Sve između se ponovo raspoređuje proporcionalno."
    ],
    "img": {
     "file": "shift-step-two",
     "alt": "Korekcija sa dva sidra: trenutna vremena se automatski popunjavaju, ciljna vremena se unose",
     "cap": "Trenutna polja dolaze iz vaše datoteke; ciljna polja su tačna vremena koja vidite u videu."
    }
   },
   {
    "h2": "Provjera vremenske linije i podešavanja po isječku",
    "ps": [
     "Nakon pokretanja koraka, pročitajte **provjeru vremenske linije**: isječci koji su prekratki, predugi, previše gusti za čitanje, redovi koji su preširoki, ili isječci koji se preklapaju se svi navode. Provjera **samo označava probleme i nikada ništa ne mijenja** sama od sebe. Četiri zadata ravnala su minimalno trajanje od 0.833 s, maksimalno 7 s, brzina čitanja od 9 znakova u sekundi i 21 znakova po redu — sve se može uređivati na stranici. Ispod toga, podešavanja po isječku vam omogućavaju da spojite dva susjedna isječka, podijelite jedan, ili direktno uredite njegov početak i kraj; svaka izmjena se može poništiti."
    ]
   },
   {
    "h2": "Izvezi rezultat",
    "ps": [
     "Panel rezultata prikazuje originalna i prilagođena vremena **jedno pored drugog** radi lakše brze provjere. Izlazni format je po zadanom format unosa, ali možete preći na bilo koji od srt, vtt, ass, sbv, lrc ili txt prije preuzimanja."
    ],
    "img": {
     "file": "shift-result",
     "alt": "Panel rezultata: vremena prije i poslije jedno pored drugog, sa dugmadima za preuzimanje i kopiranje",
     "cap": "Originalna vremena s lijeve strane, prilagođena s desne; preuzmite kada brza provjera izgleda dobro."
    }
   }
  ]
 },
 "shift-subtitle-timing": {
  "seo": {
   "title": "Kako pomaknuti sve titlove ranije ili kasnije – AI-SRTSub",
   "desc": "Svaki isječak kasni za istu količinu: upotrijebite korak pomaka u uređivaču vremena — unesite jedan negativan ili pozitivan broj i svi isječci se pomjeraju zajedno.",
   "h1": "Pomaknite cijelu datoteku titlova ranije ili kasnije",
   "intro": "Zvuk počinje, titl se pojavljuje kasno — i svaki pojedinačni isječak kasni za istu količinu. To je uniformni pomak: jedan broj to popravlja.",
   "ctaText": "Otvorite uređivač vremena"
  },
  "body": [
   {
    "h2": "Prvo potvrdite da svaki isječak kasni za istu količinu",
    "ps": [
     "Brzo provjerite jedan isječak blizu početka, jedan u sredini i jedan na kraju. Ako sva tri kasne za otprilike istu količinu, to je **uniformni pomak**, i jedan korak pomaka to rješava. Ako je početak tačan, a kašnjenje raste prema kraju, to je drugačiji problem — pogledajte [[titlovi koji sve više bježe iz sinhronizacije|/guides/subtitles-out-of-sync.html]]."
    ]
   },
   {
    "h2": "Šta unijeti: negativno za naprijed, pozitivno za kašnjenje",
    "ps": [
     "U uređivaču vremena dodajte korak **Pomakni sve** i unesite pomak u polje za vrijednost: titlovi koji kasne uzimaju negativan broj da ih povuku ranije; oni koji žure uzimaju pozitivan broj da ih gurnu kasnije. Ako titlovi kasne 1.5 sekundi, unesite **-1.5** — jedinica je u sekundama."
    ],
    "img": {
     "file": "shift-step-shift",
     "alt": "Korak Pomakni sve sa unesenih -1.5 sekundi",
     "cap": "Negativan broj povlači cijelu datoteku ranije; jedinica je upisana unutar okvira, u sekundama."
    }
   },
   {
    "h2": "Pokrenite ga i provjerite prvi isječak",
    "ps": [
     "Nakon primjene, panel rezultata navodi originalna i nova vremena svakog isječka **jedno pored drugog**. Prvo provjerite prvi isječak: da li novo vrijeme početka pada na kadar u kojem se red izgovara? Zatim brzo provjerite jedan u sredini. Svaki isječak se pomjera za istu količinu i zadržava svoje trajanje."
    ]
   },
   {
    "h2": "Izvezi",
    "ps": [
     "Kada brza provjera izgleda dobro, preuzmite direktno. Izlazni format je po zadanom format unosa i može se promijeniti u nešto drugo. Promjena dira samo vremena — nijedan znak teksta."
    ]
   }
  ]
 },
 "simplified-traditional-chinese": {
  "seo": {
   "title": "Nije zamjena znakova – Više-prema-jedan i regionalne riječi – AI-SRTSub",
   "desc": "Tri stvari ovo čine teškim: preslikavanja više-prema-jedan riješena po riječi, različiti vokabular Tajvana i Hong Konga, i konverzija samo dijaloga. Dobijte sva tri tačno i neće uslijediti nikakva ljudska naknadna obrada.",
   "h1": "Pojednostavljeni vs tradicionalni nije zamjena znakova",
   "intro": "Koji tradicionalni znak mijenja pojednostavljeni zavisi od znaka pored njega. Zato se ova konverzija ne može obaviti slijepim mijenjanjem jednog po jednog znaka.",
   "ctaText": "Otvorite pretvarač"
  },
  "body": [
   {
    "h2": "Prvo: jedan pojednostavljeni oblik, nekoliko tradicionalnih",
    "ps": [
     "Pojednostavljivanje je srušilo nekoliko tradicionalnih znakova u jedan pojednostavljeni oblik. Vraćajući se u suprotnom smjeru, jedan pojednostavljeni znak odgovara nekoliko tradicionalnih, a izbor između njih zavisi od toga s čim je uparen:",
     "Mijenjanje znakova znak po znak urušava ih sve u isti i čini svaku instancu pogrešnom. Razrješavanje **po riječi** je ono što ih razdvaja — tabele dolaze iz OpenCC-a, usklađujući fraze prije pojedinačnih znakova. Na primjer:"
    ]
   },
   {
    "h2": "Drugo: Tajvan i Hong Kong nisu isto",
    "ps": [
     "Postoji još jedan sloj nakon konverzije u tradicionalni: ista riječ se piše drugačije na Tajvanu i u Hong Kongu. Riječ za \"softver\" je jedno na Tajvanu, a drugo u Hong Kongu, i Tajvan koristi svoju riječ za \"informacije\".",
     "Odatle i odvojeni smjerovi. Tajvanski tradicionalni se čak dijeli na \"promjenu Wordinga\" i \"samo glifove\" — samo glifovi zadržavaju vaš postojeći vokabular, dok promjena Wordinga mijenja i regionalne izraze. Hong Kong dobija svoj smjer."
    ],
    "img": {
     "file": "hanconv-dir",
     "alt": "Kartica za pretvaranje: padajući meni odredišta koji prikazuje \"Pojednostavljeni → Tajvanski tradicionalni (promjena Wordinga)\"",
     "cap": "Tajvan nudi promjene Wordinga ili samo glifove; Hong Kong ima svoj smjer"
    }
   },
   {
    "h2": "Treće: samo dijalog treba dirati",
    "ps": [
     "Datoteka titlova nije samo dijalog. Brojevi indeksa, vremena i linije ASS stila su također tu, i nijedan znak od toga ne bi trebao biti konvertovan — posebno linije ASS stila, pošto sadrže nazive engleskih direktiva koji se pokvare čim se tretiraju kao dijalog.",
     "Tako se konverzija dešava nakon parsiranja po formatu: SRT, VTT, ASS i TXT svaki identifikuju koji dio je dijalog, i samo znakovi unutar njega se konvertuju. Vremena i stilovi preživljavaju netaknuti, bez formatiranja koje treba ponovo raditi."
    ],
    "img": {
     "file": "hanconv-out",
     "alt": "Oblast rezultata: konvertovani titl i traka sa statistikom koja prikazuje broj promijenjenih redova",
     "cap": "Traka sa statistikom pokazuje koliko se redova promijenilo; formatiranje je sačuvano kakvo jeste"
    }
   },
   {
    "h2": "Povratak na pojednostavljeni: pripazite",
    "ps": [
     "Konverzija tradicionalnog u pojednostavljeni također zahtijeva da kažete **iz koje tradicionalne varijante dolazite**: generička, tajvanska i hongkonška su tri različita puta, jer se regionalni vokabular mora vratiti u generičku riječ prije nego što se može konvertovati. Izaberite pogrešan smjer i regionalni vokabular preživljava u pojednostavljenom izlazu.",
     "Donja grupa od devet pravaca je ona koja se vraća nazad: tradicionalni → pojednostavljeni, tajvanski → pojednostavljeni, hongkonški → pojednostavljeni."
    ]
   },
   {
    "h2": "Povezani alati i vodiči",
    "ps": [
     "Kompletan vodič — [[Kako konvertovati pojednostavljene i tradicionalne titlove|/guides/hanconv.html]]; ako vam treba samo pojednostavljeni u tradicionalni — [[Konvertujte pojednostavljene titlove u tradicionalne|/guides/srt-simplified-to-traditional.html]]; za prevođenje na drugi jezik, [[Prevođenje titlova|/translate.html]]."
    ]
   }
  ]
 },
 "split": {
  "seo": {
   "title": "Spajanje i dijeljenje titlova – Izreži po blokovima, poveži redom – AI-SRTSub",
   "desc": "Izrežite jednu datoteku na segmente prema trajanju ili broju oznaka, ponovno pokrenite svaku od nule ili povežite nekoliko datoteka redom ili ih isprepletite po vremenskoj traci. Brojevi oznaka su ponovno numerirani, tekst je netaknut.",
   "h1": "Kako podijeliti i spojiti titlove",
   "intro": "Izrežite jednu dugu datoteku titlova na segmente ili spojite nekoliko raspršenih datoteka u jednu. Rez uvijek pada na granicu unosa – rečenica se nikada ne reže na pola.",
   "ctaText": "Otvori dijeljenje i spajanje"
  },
  "body": [
   {
    "h2": "Što ovaj alat radi",
    "ps": [
     "Dijeljenje epizoda, dijeljenje segmenata i kombiniranje izvora nailaze na isto neslaganje između blokova titlova i blokova videa: ili se jedna datoteka mora izrezati ili se nekoliko njih mora kombinirati. Ova stranica obrađuje oboje, po jednu karticu za svako."
    ]
   },
   {
    "h2": "Prvo odaberite izrezivanje ili spajanje",
    "ps": [
     "Dvije kartice na vrhu: **Podijeli: jednu datoteku na segmente** i **Spoji: nekoliko datoteka u jednu**. Opcije drugog koraka u nastavku mijenjaju se s vašim izborom.",
     "U \"1 Dodaj titlove\" učitavate datoteku ili lijepite tekst; ako ste odabrali pogrešnu, kliknite \"Očisti\". Ova stranica čita samo UTF-8 – ako je kodiranje oštećeno (zid upitnika ili kvadratića), prvo idite na [[Popravak iskrivljenog teksta|/repair.html]]."
    ],
    "img": {
     "file": "split-mode",
     "alt": "Dvije kartice na vrhu stranice za dijeljenje i spajanje",
     "cap": "Izrezivanje i spajanje su dvije kartice; opcije drugog koraka prate vaš izbor"
    }
   },
   {
    "h2": "Kako izrezati",
    "ps": [
     "Pod \"2 Kako izrezati\" odaberite osnovu: **trajanje** (jedan segment svakih X minuta) ili **broj oznaka** (jedan segment svakih X oznaka), zatim unesite broj.",
     "Označite kućicu \"Ponovno pokreni svaki segment na 0:00\" i svaki rezultirajući segment broji se od nule – upotrijebite ovo kada učitavate epizode i svakom segmentu dajete player zasebno. Ostavite neoznačeno kako biste zadržali izvorne vremenske oznake, tako da se svaki segment i dalje poravnava sa svojim položajem u izvornom videu.",
     "Rez pada samo na granice oznaka: kada vrlo dugi titl premošćuje točku reza, cijela oznaka ostaje u ranijem segmentu."
    ],
    "img": {
     "file": "split-cut",
     "alt": "Opcije trajanja i broja oznaka s prekidačem za ponovno pokretanje od nule na stranici za dijeljenje",
     "cap": "Izrežite prema trajanju ili broju oznaka i opcionalno ponovno pokrenite svaki segment na 0:00"
    }
   },
   {
    "h2": "Kako spojiti",
    "ps": [
     "Pod \"2 Kako spojiti\" odaberite metodu: **Poveži redom** pomiče kasniju datoteku tako da počinje nakon završetka ranije, bez preklapanja između segmenata; **Ispredpleti po vremenskoj traci** zadržava izvorne vremenske oznake svake datoteke i sortira prema vremenu početka.",
     "Upotrijebite povezivanje redom kada su datoteke prva i druga polovina jedne epizode ili kada se odvojeno lektorirane polovične datoteke moraju ponovno sastaviti; upotrijebite ispreplitanje po vremenskoj traci kada datoteke pripadaju zajedno na ekranu, kao što su izvorni zapis i prevedeni zapis.",
     "Nakon spajanja, brojevi oznaka se automatski ponovno numeriraju i nijedna riječ dijaloga se ne mijenja."
    ],
    "img": {
     "file": "split-join",
     "alt": "Opcije povezivanja redom i ispreplitanja po vremenskoj traci na stranici za spajanje",
     "cap": "Povezivanje redom odgovara dvjema polovicama jedne epizode; ispreplitanje po vremenskoj traci odgovara izvornom i prevedenom zapisu"
    }
   },
   {
    "h2": "Preuzimanje rezultata",
    "ps": [
     "\"3 Rezultat\" s desne strane izvozi **SRT** i **VTT**; kliknite \"Preuzmi\" ili \"Kopiraj\".",
     "Prilikom dijeljenja možete koristiti \"Preuzmi svaki segment\", što sprema svaki izrezani segment odjednom umjesto jednog klika po segmentu."
    ],
    "img": {
     "file": "split-out",
     "alt": "Izbor formata SRT/VTT s gumbima za preuzimanje i preuzimanje svakog segmenta u području rezultata",
     "cap": "Rezultati dijeljenja mogu se preuzeti segment po segment; spojena datoteka se preuzima ili kopira izravno"
    }
   },
   {
    "h2": "Što ostaje netaknuto",
    "ps": [
     "Nijedan znak dijaloga se ne mijenja. Ova stranica mijenja samo koje oznake pripadaju kojem segmentu i kako su numerirane; sadržaj unosa ostaje kakav jest.",
     "S opcijom \"Poveži redom\" vremenske oznake kasnijih datoteka pomaknute su u cjelini – to je ono što spajanje zahtijeva; s opcijom \"Ispredpleti po vremenskoj traci\" svaka izvorna vremenska oznaka je očuvana."
    ]
   },
   {
    "h2": "Česta pitanja",
    "ps": [
     "**Što ako posljednji segment ispadne vrlo kratak?** To je normalno. Ostatak koji ne ispunjava cijeli segment postaje vlastiti segment umjesto da se popunjava.",
     "**Hoće li rečenica koja premošćuje točku reza biti podijeljena?** Ne. Rezovi padaju samo na granice unosa, a oznaka koja prelazi crtu ostaje u ranijem segmentu.",
     "**Nakon ispreplitanja, kako se naručuju dvije oznake s identičnim vremenima?** Prema vremenu početka; kada su vremena početka jednaka, zadržava se redoslijed kojim ste dodali datoteke.",
     "**Može li se ASS dijeliti?** Ova stranica obrađuje SRT i VTT. Pretvorite ASS u SRT ili VTT pomoću [[Pretvorba formata|/convert.html]] prvo."
    ]
   },
   {
    "h2": "Privatnost",
    "ps": [
     "Titlovi se obrađuju u potpunosti u pregledniku: ništa se ne učitava i ništa ne prolazi kroz poslužitelj. Zatvorite stranicu i sadržaj je nestao."
    ]
   },
   {
    "h2": "Povezani alati i vodiči",
    "ps": [
     "Za kombiniranje dviju datoteka u dvojezični zapis (umjesto u jednu epizodu) upotrijebite [[Dvojezično stapanje i specijalni efekti|/guides/merge.html]]; ako je cijela vremenska traka pomaknuta, idite na [[Prilagodba vremenske trake|/shift.html]]; za vrijednost cijele sezone koristite [[Skupna pretvorba|/batch.html]]; i pokrenite [[Kontrola kvalitete titlova|/qc.html]] kada završite."
    ]
   }
  ]
 },
 "split-bilingual-subtitles": {
  "seo": {
   "title": "Podijeli dvojezične titlove u dva zapisa – AI-SRTSub",
   "desc": "Podijelite dvojezične titlove u dvije datoteke: izvorni i prevedeni zapis preuzimaju se odvojeno s različitim nazivima; oba oblika su prepoznata. – AI-SRTSub",
   "h1": "Podijeli dvojezične titlove u dva zapisa",
   "intro": "Jedan dvojezični titl postaje dvije datoteke — “izvornik” i “prijevod”: učitajte, odaberite podjelu na dva dijela, preuzmite svaki, s očuvanim vremenskim trakama.",
   "ctaText": "Podijeli dvojezične titlove"
  },
  "body": [
   {
    "h2": "Kada trebate podijeliti",
    "ps": [
     "Vaš player želi samo jednojezični zapis; ili želite zapis prijevoda za ponovni prijevod, ili izvorni zapis za uparivanje s drugom prevedenom verzijom. Dvojezični titl je ili **jedna oznaka s dva retka** (izvornik u jednom retku, prijevod u drugom) ili **dvije odvojene oznake koje dijele istu vremensku traku** – oboje se može podijeliti."
    ]
   },
   {
    "h2": "Gdje to učiniti",
    "ps": [
     "Otvorite [[Uklanjač dvojezičnih titlova|/bilingual.html]] i ispustite svoj titl. Alat automatski prepoznaje dvojezični oblik: jedna oznaka s dva retka dijeli se prema sustavu pisanja, dvije oznake na istoj vremenskoj traci prema redoslijedu. Odaberite **Podijeli na dva** u padajućem izborniku načina rada i kliknite Pokreni (ili pustite da se automatski ponovno pokrene). Područje rezultata prikazuje dva dijela: onaj označen s `.orig` je izvorni zapis, onaj označen s `.dst` je zapis prijevoda – kliknite \"Preuzmi\" za svaki; dva zapisa dijele potpuno istu vremensku traku."
    ],
    "img": {
     "file": "bilingual-split",
     "alt": "Rezultat dijeljenja: izvorni zapis i zapis prijevoda kao dva dijela, svaki s gumbom za preuzimanje",
     "cap": "Podijeli na dva: .orig izvorni zapis + .dst zapis prijevoda, svaki preuzet zasebno"
    }
   },
   {
    "h2": "Jedna uobičajena zamka",
    "ps": [
     "**Jedna oznaka s dva retka na jezicima koji dijele istu abecedu (recimo engleski plus francuski) ne može se podijeliti.** Kada su zapisi odvojeni sustavom pisanja, oni se računaju kao jedan sustav i tretiraju se kao jednojezični. Takav sadržaj prvo pretvorite u oblik B iste vremenske trake, pa ga zatim podijelite; oblik s dvije oznake uparuje se po vremenskoj traci i nije mu važno koji je jezik. Za detalje oba oblika pogledajte [[Dva načina izrade dvojezičnih titlova|/guides/make-bilingual-subtitles.html]]."
    ]
   }
  ]
 },
 "srt-file-format": {
  "seo": {
   "title": "Što je SRT datoteka? Kako je otvoriti i urediti – AI-SRTSub",
   "desc": "Anatomija SRT (SubRip) datoteka titlova: broj, vremenska linija, tekst. Kako otvoriti jednu u uređivaču teksta, zašto je player odbija i kako popraviti iskrivljeni tekst i pogreške vremenskih oznaka.",
   "h1": "Objašnjenje formata SRT datoteke",
   "intro": "SRT je najuniverzalniji format titlova: običan tekst, jednostavna struktura, prihvaćen gotovo svugdje. Ovaj vodič otkriva njegovu strukturu, način otvaranja i rješavanje uobičajenih pogrešaka.",
   "ctaText": "Otvori pretvarač titlova"
  },
  "body": [
   {
    "h2": "Kako izgleda SRT datoteka",
    "ps": [
     "SRT (SubRip) je običan tekst – otvara ga bilo koji uređivač teksta. Svaka oznaka ima tri dijela: **liniju broja**, **vremensku liniju** i **tekst**, odvojene praznim linijama. Vremenska linija glasi `00:00:01,000 --> 00:00:03,500` – primijetite **zarez** prije milisekundi, a ne točku."
    ],
    "img": {
     "file": "convert-upload",
     "alt": "Područje učitavanja: učitana SRT datoteka koja prikazuje brojeve i vrijeme",
     "cap": "Standardna SRT trodijelna oznaka: broj, vremenska linija, tekst"
    }
   },
   {
    "h2": "Kako je otvoriti",
    "ps": [
     "Za čitanje sadržaja: kliknite desnom tipkom miša i otvorite s bilo kojim **uređivačem teksta**. Za korištenje s videom: preimenujte datoteku da **odgovara nazivu video datoteke** (osim ekstenzije), stavite oboje u istu mapu, i playeri poput VLC-a, PotPlayera ili mpv-a automatski je učitavaju; također je možete povući na prozor za reprodukciju."
    ]
   },
   {
    "h2": "Ispravljanje odbijanja i iskrivljenog teksta",
    "ps": [
     "**Iskrivljeni znakovi**: datoteka nije u UTF-8 formatu – spremite je ponovno kao UTF-8 u svom uređivaču. **Ništa se ne prikazuje**: provjerite koristi li vremenska linija zarez (a ne točku) i da brojevi oznaka nisu slomljeni (većina playera tolerira praznine, neki ne). **Datoteka je HTML ili JSON**: izvor preuzimanja je bio pogrešan; dohvatite je ponovno."
    ]
   },
   {
    "h2": "Što SRT može, a što ne može sadržavati",
    "ps": [
     "SRT nosi samo tekst i vrijeme: **nema stilova** (fontovi, boje), **nema pozicioniranja** (gdje na ekranu), **nema efekata**. Za to je potreban ASS – pogledajte [[SRT u ASS|/guides/srt-to-ass.html]]. Za usporedbu svih formata jedno pored drugog, pogledajte [[usporedba formata titlova|/guides/subtitle-format-comparison.html]]."
    ]
   }
  ]
 },
 "srt-fps-converter": {
  "seo": {
   "title": "SRT pretvarač broja sličica u sekundi (FPS) – Promijeni broj sličica u sekundi titlova – AI-SRTSub",
   "desc": "Film ima 24 fps, emitiranje ima 25 fps, a titlovi kasne svake minute sve više: skalirajte vremensku traku za 0.96 jednom i cijela datoteka sjeda na ciljanu stopu.",
   "h1": "Pretvorba broja sličica u sekundi titlova: 24fps u 25fps",
   "intro": "Pustite titlove filma s 24 fps na izvoru s 25 fps i oni gube preko sekundu svake minute – do odjavne špice kasne nekoliko minuta. Jedno skaliranje to rješava.",
   "ctaText": "Otvori uređivač vremena"
  },
  "body": [
   {
    "h2": "Zašto neusklađenost broja sličica u sekundi uzrokuje kašnjenje titlova",
    "ps": [
     "Pretvorba broja sličica u sekundi ponovno čita **isto vremensko razdoblje pod dva različita sata**. Film od 100 minuta s 24 fps ima 6000 s × 24 = **144,000 sličica**; na izvoru s 25 fps te 144,000 sličice se reproduciraju u 5760 sekundi – **96 minuta**. Cijeli film traje 4 minuta kraće, tako da se oznaka u minuti 50 pojavljuje oko 2 minuta kasnije, a titl odjavne špice se uopće ne prikaže."
    ]
   },
   {
    "h2": "Formula i uobičajeni faktori",
    "ps": [
     "Ciljana stopa ÷ izvorna stopa = množitelj. **24 do 25: pomnoži s 0.96** (24÷25); obrnuto, od 25 do 24: 1.0417. **25 do 23.976: pomnoži s 0.959**; obrnuto: 1.0427. U uređivaču vremena dodajte korak **Skaliraj prema stopi** i unesite faktor u polje za vrijednost."
    ],
    "img": {
     "file": "shift-step-rate",
     "alt": "Korak skaliranja prema stopi s unesenim 0.96",
     "cap": "0.96 je 24÷25; savjet na stranici čak spominje pretvorbu broja sličica u sekundi kao uobičajenu upotrebu."
    }
   },
   {
    "h2": "Kada ne znate dvije stope",
    "ps": [
     "Ako ne možete pronaći broj sličica u sekundi izvora, nemojte pogađati faktor – umjesto toga upotrijebite **dva sidra**: uzmite stvarno vrijeme pojavljivanja prve i posljednje oznake kao dvije točke, a sve između proporcionalno se rasteže. Pogledajte [[titlovi sve više gube sinkronizaciju|/guides/subtitles-out-of-sync.html]]."
    ]
   },
   {
    "h2": "Što provjeriti nakon toga",
    "ps": [
     "Skaliranje pomiče svaki početak i kraj; trajanja oznaka se rastežu za isti faktor. Nakon izvršavanja, provjerite dvije krajnosti: prvu oznaku (najmanja izvorna pogreška) i posljednju (najveća). Ako se oba kraja podudaraju, sve između također se podudara."
    ]
   }
  ]
 },
 "srt-simplified-to-traditional": {
  "seo": {
   "title": "Pretvori pojednostavljene titlove u tradicionalne – Tajvan ili Hong Kong – AI-SRTSub",
   "desc": "Pretvorite pojednostavljene kineske titlove u tradicionalne: odaberite tajvanski (s regionalnim rječnikom ili bez njega) ili hongkonški. Preslikavanja jedan-na-više rješavaju se po riječima. Mijenja se samo dijalog; vremenske oznake ostaju na mjestu.",
   "h1": "Pretvori pojednostavljene titlove u tradicionalne",
   "intro": "Pojednostavljeni kineski titl namijenjen tajvanskoj ili hongkonškoj publici treba samo pretvorbu – ali dvije regije žele različite stvari, a odabir pogrešnog smjera daje vam formulacije koje lokalno stanovništvo ne koristi.",
   "ctaText": "Pretvori ovaj titl"
  },
  "body": [
   {
    "h2": "Potreba",
    "ps": [
     "Vaši titlovi su na pojednostavljenom kineskom i moraju doprijeti do gledatelja na Tajvanu ili u Hong Kongu. Popravljanje znakova jedan po jedan nije realno – jedna epizoda ima stotine oznaka – a dvije regije ne žele isti tradicionalni tekst: rječnik se razlikuje, a pogrešan smjer proizvodi formulacije koje nijedan lokalni stanovnik ne bi koristio."
    ]
   },
   {
    "h2": "Gdje to učiniti",
    "ps": [
     "Otvorite [[Pojednostavljeno-tradicionalna pretvorba|/hanconv.html]], povucite titl unutra i odaberite jedan od smjerova pojednostavljeno → tradicionalno pod \"Pretvori u\": općenito tradicionalno, tajvansko (promijeni rječnik), tajvansko (samo glifi) ili hongkonško. Pretvorba se događa trenutno, a područje rezultata prikazuje gotov titl, spreman za preuzimanje.",
     "**Za tajvansku publiku**: odaberite \"Tajvansko (promijeni rječnik)\" ako bi se i regionalni rječnik trebao promijeniti – \"softver\" i \"informacije\" postaju njihovi tajvanski ekvivalenti – ili \"Tajvansko (samo glifi)\" ako želite promijeniti oblike znakova uz zadržavanje izvornog rječnika. **Za hongkonšku publiku**: odaberite \"Hong Kong\", gdje se \"softver\" piše s još jednim oblikom."
    ],
    "img": {
     "file": "hanconv-dir",
     "alt": "Kartica Pretvori u: padajući izbornik odredišta koji prikazuje \"Pojednostavljeno → Tajvansko tradicionalno (promijeni rječnik)\"",
     "cap": "Tajvan i Hong Kong su odvojeni smjerovi s različitim rječnikom"
    }
   },
   {
    "h2": "Uobičajene zamke",
    "ps": [
     "**Ne bojte se preslikavanja jedan-na-više**: isti pojednostavljeni znak u riječima za \"čisto\", \"suho\" i \"deblo stabla\" preslikava se u različite tradicionalne znakove. Tablice to rješavaju po frazama, tako da se sve ne spljošti u jedan znak.",
     "**Samo se dijalog pretvara**: vremenske oznake, brojevi indeksa i linije ASS stila ostaju netaknuti, tako da je rezultat spreman za upotrebu.",
     "**Ništa se nije promijenilo? Provjerite prije panike**: ako traka statistike izvještava o 0 promijenjenih linija, datoteka ili nema kineskih znakova ili je format pogrešno otkriven – provjerite odgovara li \"Otkriveni format\" onome što ste učitali."
    ]
   },
   {
    "h2": "Povezano",
    "ps": [
     "Potpuno objašnjenje svih devet smjerova – [[Kako pretvoriti pojednostavljene i tradicionalne titlove|/guides/hanconv.html]]; zašto je to više od zamjene znakova – [[Pojednostavljeno naspram tradicionalnog nije zamjena znakova|/guides/simplified-traditional-chinese.html]]; povratak s tradicionalnog na pojednostavljeno također se nalazi u [[Pojednostavljeno-tradicionalna pretvorba|/hanconv.html]]."
    ]
   }
  ]
 },
 "srt-to-ass": {
  "seo": {
   "title": "SRT u ASS pretvarač – Pretvorite titlove na mreži – AI-SRTSub",
   "desc": "Pretvorite SRT titlove u ASS (Advanced SubStation Alpha) s platnom 1920×1080 i čistim zadanvim stilom, spremnim za bočno učitavanje u bilo kojem playeru. Radi u vašem pregledniku.",
   "h1": "SRT u ASS",
   "intro": "Pretvorite SRT titlove u ASS: ispustite datoteku, odaberite ASS, preuzmite. Platno 1920×1080 i čist zadani stil generiraju se za vas.",
   "ctaText": "Pretvori SRT → ASS"
  },
  "body": [
   {
    "h2": "Kada trebate ASS",
    "ps": [
     "Upotrijebite ASS kada bočno učitani titl treba **bolju kontrolu pozicioniranja i stila** – nosi koncepte koje SRT nema – veličinu platna, stilove fontova, poravnanje. mpv, PotPlayer, VLC i većina playera podržavaju ga izravno."
    ]
   },
   {
    "h2": "Kako izgleda izlaz",
    "ps": [
     "Alat obnavlja standardno zaglavlje: **platno 1920×1080**, pametno prelamanje (WrapStyle 0) i jedan zadani stil – Arial 54, bijeli tekst s crnim obrubom, centrirano dolje. Svaka oznaka koristi ovaj stil."
    ],
    "img": {
     "file": "convert-opt-ass",
     "alt": "Padajući izbornik izlaznog formata s odabranim ASS - Advanced SubStation",
     "cap": "Odaberite ASS kao izlaz i preuzmite nakon pretvorbe"
    }
   },
   {
    "h2": "Jesu li stilovi očuvani?",
    "ps": [
     "SRT uopće nema koncept stila. A ako je vaš izvor već ASS, pretvorba **obnavlja zadani stil i ne zadržava izvorni** – upotrijebite namjenski uređivač titlova za preoblikovanje ASS-a. Vrijeme i tekst ostaju nepromijenjeni u oba slučaja."
    ]
   }
  ]
 },
 "srt-to-excel": {
  "seo": {
   "title": "Pretvori titlove u Excel – Lektorirajte red po red – AI-SRTSub",
   "desc": "Izvezite SRT titlove u Excel: jedan redak po oznaci u četiri stupca – indeks, početak, kraj i tekst. Vrijeme zadržano kao tekst, prijelomi redaka netaknuti, a uređena tablica može se ponovno pretvoriti u titlove.",
   "h1": "Pretvori titlove u Excel",
   "intro": "Lektura stotina oznaka u uređivaču teksta je iscrpljujuća. U Excelu je svaka oznaka redak, tako da filtriranje, komentiranje i pronalaženje i zamjena postaju dostupni – a izmjene se vraćaju u vaš SRT.",
   "ctaText": "Izvezi u Excel"
  },
  "body": [
   {
    "h2": "Potreba",
    "ps": [
     "Lektura, masovne izmjene riječi ili dijeljenje posla između nekoliko ljudi – sve to ide puno brže u tablici nego u običnom tekstu. Sam SRT je običan tekst, ali njegova struktura oznaka (indeks, vrijeme, dijalog) uredno se preslikava na četiri stupca proračunske tablice."
    ]
   },
   {
    "h2": "Gdje to učiniti",
    "ps": [
     "Otvorite [[Pretvorba titlova ⇄ tablice|/table.html]], prebacite se na \"u tablicu\", povucite SRT unutra, i pretpregled se puni s jednim retkom po oznaci u četiri stupca – indeks, početak, kraj, tekst. Pritisnite \"Preuzmi Excel (.xlsx)\" i vaš je. VTT je podržan na isti način.",
     "Kada završite s uređivanjem: prebacite način rada na \"u titl\", vratite tablicu natrag i ponovno ćete dobiti SRT. Pravilo je tri stupca za početak, kraj i tekst (engleski Start / End / Text također rade), bilo kojim redoslijedom."
    ],
    "img": {
     "file": "table-prev",
     "alt": "Pretpregled tablice: svaka SRT oznaka kao redak u četiri stupca, s trakom statistike",
     "cap": "SRT raspoređen kao četiri stupca, može se ponovno pretvoriti na isti način"
    }
   },
   {
    "h2": "Uobičajene zamke",
    "ps": [
     "**Prvo popravite oštećeno kodiranje**: ova stranica čita samo UTF-8. Zaslon pun upitnika ili kvadratića znači izlet na [[Popravak mojibake-a|/repair.html]] najprije.",
     "**CSV ili xlsx**: odaberite .xlsx kada datoteka ide u Excel, tako da se stupac s vremenom ne može ponovno formatirati; CSV je prijenosniji, ali ga Excel može pročitati kao nešto drugo – postavite stupac s vremenom na \"Tekst\" ako se to dogodi.",
     "**ASS ne radi**: ASS nosi direktive stila, stoga ga pretvorite u SRT prije nego što ga stavite u tablicu."
    ]
   },
   {
    "h2": "Povezano",
    "ps": [
     "Puni dvosmjerni vodič – [[Kako pretvoriti titlove u Excel / CSV|/guides/table.html]]; naknadno prevođenje – [[Prevođenje titlova|/translate.html]]; posljednji prolaz prije isporuke – [[Kontrola kvalitete titlova|/qc.html]]."
    ]
   }
  ]
 },
 "srt-to-vtt": {
  "seo": {
   "title": "SRT u VTT pretvarač – Pretvorite titlove na mreži – AI-SRTSub",
   "desc": "Pretvorite SRT titlove u VTT (WebVTT) za HTML5 elemente zapisa. Zarezi vremenskih oznaka automatski postaju točke. Radi u vašem pregledniku, ništa se ne učitava.",
   "h1": "SRT u VTT",
   "intro": "Pretvorite SRT titlove u VTT: ispustite datoteku, odaberite VTT, preuzmite. Vremenske oznake se prepisuju za web format, sve u vašem pregledniku.",
   "ctaText": "Pretvori SRT → VTT"
  },
  "body": [
   {
    "h2": "Kada trebate VTT",
    "ps": [
     "Web playeri (HTML5 `<track>` element), prijenos titlova na YouTube i većina playera temeljenih na pregledniku prihvaćaju samo **VTT (WebVTT)** – ne SRT. Ako imate samo SRT, jedna pretvorba ga čini funkcionalnim."
    ]
   },
   {
    "h2": "Kako se dva formata razlikuju",
    "ps": [
     "Sadržaj je gotovo identičan; tri stvari su napisane drugačije: **WEBVTT linija zaglavlja** (obavezna u VTT-u); **separator milisekundi** u vremenskim oznakama – SRT koristi zarez (000001,000) dok VTT koristi točku (000001.000); i VTT dozvoljava NOTE i STYLE blokove koje SRT ne dozvoljava."
    ],
    "img": {
     "file": "convert-result",
     "alt": "Rezultat pretvorbe koji prikazuje WEBVTT zaglavlje i vremenske oznake s točkom",
     "cap": "Pretvoreni VTT: prvi redak WEBVTT, vremenske oznake s točkom"
    }
   },
   {
    "h2": "Kako pretvoriti",
    "ps": [
     "Otvorite [[pretvarač|/convert.html]], ispustite SRT, odaberite **VTT - WebVTT** kao izlaz, zatim pretvorite i preuzmite. Redoslijed oznaka, vrijednosti vremena i tekst u više redaka zadržani su kakvi jesu – mijenja se samo sintaksa. Idete u suprotnom smjeru? Pogledajte [[VTT u SRT|/guides/vtt-to-srt.html]]."
    ]
   }
  ]
 },
 "subtitle-format-comparison": {
  "seo": {
   "title": "SRT naspram VTT naspram ASS naspram SBV naspram LRC – Koji format titlova odabrati – AI-SRTSub",
   "desc": "Usporedba mogućnosti pet uobičajenih formata titlova: stiliziranje teksta, pozicioniranje, preciznost vremena, gdje svaki pripada i kako se pretvarati između njih.",
   "h1": "Odabir formata titlova: SRT / VTT / ASS / SBV / LRC",
   "intro": "Isti titl spremljen u pet formata služi petorici različitih gospodara. Ovaj vodič uspoređuje što svaki format može učiniti i kako se kretati između njih.",
   "ctaText": "Otvori pretvarač titlova"
  },
  "body": [
   {
    "h2": "Odaberite format u jednoj rečenici",
    "ps": [
     "Bočno učitavanje u player, maksimalna kompatibilnost → **SRT**; web playeri (HTML5 zapis) ili YouTube prijenos → **VTT**; fontovi, boje, pozicioniranje, efekti → **ASS**; preuzeto s YouTubea → **SBV** (pretvorite u SRT za širu podršku); tekstovi pjesama, pjevanje redak po redak → **LRC**."
    ],
    "img": {
     "file": "convert-opt",
     "alt": "Padajući izbornik izlaznog formata: šest ciljnih formata",
     "cap": "Šest izvoznih ciljeva u pretvaraču pokriva svaki format u ovom vodiču"
    }
   },
   {
    "h2": "Usporedba mogućnosti",
    "ps": [
     "**SRT**: običan tekst + vrijeme, bez stila ili pozicioniranja, prvak kompatibilnosti. **VTT**: tekst + vrijeme, izvorno podržano od strane preglednika, može nositi pozicioniranje i osnovni stil, točka prije milisekundi. **ASS**: tekst + vrijeme + puni stil (fontovi, boje, obrubi, pozicioniranje, efekti), vrijeme u stotinkama sekunde. **SBV**: YouTubeov minimalni format titlova, početak i kraj u jednom retku. **LRC**: format tekstova pjesama, samo vremena početka, bez vremena završetka, bez stila."
    ]
   },
   {
    "h2": "Putovi između formata",
    "ps": [
     "Bilo koji od ovih se pretvara u oba smjera u [[pretvaraču|/convert.html]]: čitanje podržava srt, vtt, ass (uključujući ssa), sbv, lrc, txt; izvoz podržava srt, vtt, ass, sbv, lrc, txt. Uobičajene rute imaju svaka svoj vodič: [[SRT u VTT|/guides/srt-to-vtt.html]], [[VTT u SRT|/guides/vtt-to-srt.html]], [[SRT u ASS|/guides/srt-to-ass.html]], [[ASS u SRT|/guides/ass-to-srt.html]], [[SBV u SRT|/guides/sbv-to-srt.html]], [[LRC u SRT|/guides/lrc-to-srt.html]]."
    ]
   },
   {
    "h2": "Što pretvorbe gube",
    "ps": [
     "Pretvaranje u SRT uvijek odbacuje stil i pozicioniranje (SRT ih ne može sadržavati). Pretvaranje u ASS s ovim alatom **obnavlja zadani stil i ne zadržava izvorni**. LRC u SRT zahtijeva ispunjavanje vremena završetka (svaki redak traje do sljedećeg; posljednji dobiva 3 sekundi). Vrijednosti vremena i tekst ostaju identični u svakom smjeru."
    ]
   }
  ]
 },
 "subtitle-garbled-characters": {
  "seo": {
   "title": "Odakle potječe iskrivljeni tekst (mojibake) titlova – Uoči ga, popravi – AI-SRTSub",
   "desc": "Mojibake znači pogrešno čitanje, a ne oštećenu datoteku. Zamjenski znakovi, zidovi naglašenih slova i nizovi nejasnih znakova upućuju na uzrok – naučite koji se oporavljaju, a koji nikada ne mogu.",
   "h1": "Odakle potječe iskrivljeni tekst titlova",
   "intro": "Isti bajtovi pročitani kao UTF-8 i pročitani kao GBK daju dva potpuno različita skupa znakova. Kako smeće od teksta izgleda izravan je dokaz koji je korak pošao po zlu.",
   "ctaText": "Otvori alat za popravak iskrivljenog teksta"
  },
  "body": [
   {
    "h2": "Datoteka je u redu – pogrešno je pročitana",
    "ps": [
     "Ono što datoteka titlova pohranjuje su bajtovi. Pretvaranje bajtova u znakove zahtijeva poznavanje kodiranja u kojem su napisani – pogriješite u tome i dobit ćete mojibake. Nijedan bajt ne nedostaje iz datoteke; pročitajte je ponovno s pravim kodiranjem i znakovi se vraćaju.",
     "To dijeli posao na dva dijela: **otkrivanje s kojim je kodiranjem započela** i **spremanje kao kodiranje koje vaš player može otkriti**. Prvo dolazi iz probnog dekodiranja i bodovanja, drugo iz spremanja kopije. Oni rješavaju različite probleme."
    ]
   },
   {
    "h2": "Pet izgleda, pet uzroka",
    "ps": [
     "Mojibake nije nasumičan – kako izgleda odaje što ga je uzrokovalo:"
    ],
    "img": {
     "file": "repair-diag",
     "alt": "Dijagnostička kartica koja navodi svaki trag mojibake-a",
     "cap": "Dijagnoza sortira mojibake prema uzroku, umjesto da ih trpa zajedno"
    }
   },
   {
    "h2": "Zašto se zamjenski znak ne može popraviti",
    "ps": [
     "Zamjenski znak je linija razdvajanja. `�` znači da su bajtovi već odbačeni **u ranijem koraku** (obično neki program čita datoteku i ponovno je sprema), i ništa nije zabilježeno o tome što je odbačeno. U tom trenutku nema se od čega krenuti unatrag – nitko ga ne može popraviti.",
     "Stoga stranica za popravak obrađuje dva slučaja drugačije. Učitajte datoteku i izvorni bajtovi su netaknuti, dopuštajući joj da isproba svako kodiranje; ako zalijepljeni tekst već sadrži zamjenski znak, to jasno kaže: \"ne može se popraviti, molimo učitajte izvornu datoteku\".",
     "Postoji i obratni slučaj: sadržaj se čita savršeno, ali vaš player i dalje prikazuje smeće. Datoteka nije kriva – **player je odabrao pogrešno kodiranje** tekst se neće promijeniti; spremite kopiju kao UTF-8 s BOM-om ili GBK-om i predajte mu je."
    ],
    "img": {
     "file": "repair-up",
     "alt": "Područje učitavanja: povuci-i-ispusti i zalijepi kao dvije ulazne točke",
     "cap": "Učitajte datoteku ako možete – netaknuti bajtovi znače nešto za popravak"
    }
   },
   {
    "h2": "Što uspoređuje tijekom popravka",
    "ps": [
     "Alat isprobava svako vjerojatno kodiranje, zatim ocjenjuje svaki rezultat: koliko je napravljen od uobičajenih znakova, postoje li nizovi naglasaka, nizovi simbola, jesu li CJK nizovi zidovi nejasnih znakova. Rezultat s najboljom ocjenom ide na vrh popisa.",
     "**Ako nijedna ocjena nije jasno bolja, ništa se ne preporučuje** – bolje je reći vam \"ovo se čita u redu kako jest\" nego vas otkvačiti nečim što samo nejasno sliči jeziku. Tekst unakažen dva puta (spremljen pogrešno jednom, zatim popravljen pogrešno jednom) dobiva još jedan dodatni krug obrnutog rješavanja na najboljim kandidatima."
    ],
    "img": {
     "file": "repair-fix",
     "alt": "Popis kandidata sortiran po ocjeni, svaki označen svojim parom kodiranja",
     "cap": "Kandidati rangirani po ocjeni – nema jasnog pobjednika, nema preporuke"
    }
   },
   {
    "h2": "Spremanje pravog kodiranja završava posao",
    "ps": [
     "Popravljeni tekst se i dalje mora spremiti kao kodiranje koje vaš player prepoznaje. Playeri na sustavu Windows obično se oslanjaju na BOM za prepoznavanje kodiranja, pa je **UTF-8 s BOM-om** najmanje gnjavaže; stariji hardver i neki regionalni playeri žele GBK. Možete odabrati UTF-8, UTF-8 (s BOM-om), GBK, Big5, Shift_JIS ili EUC-KR, i reći će vam da odaberete drugo ako nešto ne odgovara (GBK ne može sadržavati korejski)."
    ],
    "img": {
     "file": "repair-out",
     "alt": "Područje rezultata: padajući izbornik spremanja kao kodiranja i gumb za preuzimanje",
     "cap": "Spremite je kao nešto što player prepoznaje i mojibake je doista riješen"
    }
   },
   {
    "h2": "Povezani alati i vodiči",
    "ps": [
     "Puni vodič – [[Kako popraviti iskrivljene titlove (mojibake)|/guides/repair.html]]; što SRT datoteka zapravo pohranjuje – [[Što se nalazi unutar SRT datoteke|/guides/srt-file-format.html]]; kodiranje je u redu, ali sadržaj je prljav (vodeni žigovi, oglasi, oznake za nagluhe) – [[Čišćenje titlova|/clean.html]]."
    ]
   }
  ]
 },
 "subtitle-glossary": {
  "seo": {
   "title": "Tablice pojmova: jedna sezona, jedan rječnik – Kada izgraditi jednu – AI-SRTSub",
   "desc": "Tablica pojmova ispravlja istu riječ koja se nedosljedno prevodi: kada izgraditi jednu, kako je ponovno upotrijebiti kroz sezonu, zašto podudaranje cijelih riječi ne radi ništa na kineskom i što joj ne treba predavati.",
   "h1": "Tablice pojmova: održavanje dosljednosti sezone",
   "intro": "Kada je ime u prvoj epizodi A, a u sedmoj B, gledatelji misle da su to dva lika. Tablica pojmova sprječava upravo to – ispravlja kako se stvari nazivaju.",
   "ctaText": "Otvori skupnu zamjenu pojmova"
  },
  "body": [
   {
    "h2": "Tablica pojmova ispravlja nedosljednost",
    "ps": [
     "Problemi s riječima u titlovima javljaju se u dvije vrste: \"ova je riječ prevedena pogrešno\" i \"ista je riječ prevedena različito s jednog mjesta na drugo\". Prvo je problem rječnika; drugo je ono čemu tablica pojmova služi.",
     "Drugo je i češće i teže uočiti: `Thor` postaje \"Thor\" u prvoj epizodi i \"Donar\" u sedmoj, a svaka epizoda izgleda dobro sama za sebe, dok serija u cjelini navodi gledatelje da pomisle kako se pojavio novi lik. Tablica pojmova pretvara \"ova produkcija ga zove Thor\" u izvršivo pravilo primijenjeno na cijelu datoteku titlova odjednom."
    ]
   },
   {
    "h2": "Kada se isplati izgraditi jednu",
    "ps": [
     "Nema svaka datoteka titlova potrebu za tablicom pojmova. Slučajevi koji opravdavaju jednu obično su ovi:"
    ],
    "img": {
     "file": "glossary-rules",
     "alt": "Pravila zamjene grupirana po kategorijama u tablici pojmova",
     "cap": "Upotrijebite # komentare za grupiranje pravila i za privremeno isključivanje jednog tijekom uređivanja"
    }
   },
   {
    "h2": "Zadržavanje jedne tablice kroz sezonu",
    "ps": [
     "Tablica pojmova održava se **inkrementalno**: uskladite imena u prvoj epizodi, zatim dodajte pravilo kad god se pojavi novi pojam, i do kraja sezone tablica je potpuna. Za sljedeću sezonu iste serije, počnite od nje.",
     "Pišite pravila malo šire nego što je striktno potrebno – jednom kada se odlučite za \"Thor\", dodajte i \"Donar -> Thor\", tako da se tuđi titlovi mogu dovesti u red u istom prolazu.",
     "Uvijek pročitajte **popis promjena** nakon toga: on imenuje svaku oznaku, svaki redak i što je u što postalo. To je jedino mjesto gdje možete potvrditi da je promjena bila ispravna i da nije pretjerana, a svaki unos koji vam se ne sviđa može se vratiti jednim klikom."
    ],
    "img": {
     "file": "glossary-diff",
     "alt": "Popis pojedinačnih promjena u području rezultata",
     "cap": "Svaka promjena je navedena; kliknite onu koju ne želite kako biste je vratili"
    }
   },
   {
    "h2": "Što ne predavati tablici pojmova",
    "ps": [
     "Tablica pojmova mijenja **riječi**. Ove tri stvari izvan su njenog posla i trebale bi biti:",
     "**Gramatika i struktura rečenice** – ne možete pretvoriti riječ u rečenicu; rad na razini rečenice vraća se na [[Prevođenje titlova|/translate.html]] ili čovjeku.",
     "**Čišćenje sadržaja** — uklanjanje cijelih redova kao što su vodeni žigi, reklame i SDH oznake spada u [[Subtitle cleaning|/clean.html]]; pravila tabele termina mijenjaju, ona ne brišu redove.",
     "**Vremenske trake** – tablica pojmova nikada ne dira vrijeme. Za globalni pomak ili problem sa stopom idite na [[Prilagodba vremenske trake|/shift.html]]."
    ]
   },
   {
    "h2": "Nekoliko stvari koje je lako pogriješiti",
    "ps": [
     "**Kineski i dalje zamjenjuje podnizove s uključenim podudaranjem cijelih riječi – to je normalno.** Kineski i japanski ne odvajaju riječi razmacima, tako da alat ne može odrediti granice riječi i podudaranje cijelih riječi tu nema učinka; `art` neće dotaknuti `start`, zaštita radi samo za engleski.",
     "**Redoslijed mijenja rezultat.** Pravila se izvršavaju od vrha prema dnu, a tekst proizveden jednim pravilom ponovno se skenira pravilima ispod njega. Zamijenite A s B, a zatim B s C i završit ćete s C.",
     "**Za promjenu samo prijevoda, postavite opseg.** U dvojezičnoj datoteci odaberite \"samo drugi redak\"; unosi sa samo jednim retkom ostaju netaknuti pod bilo kojom postavkom jednog retka – alat ne pogađa koja je strana izvorna.",
     "**Tablica pojmova nije spremljena.** Prazna je svaki put kada otvorite stranicu, stoga čuvajte vlastitu tekstualnu datoteku i proslijedite je dalje."
    ]
   },
   {
    "h2": "Povezani alati i vodiči",
    "ps": [
     "Za potpuni vodič pogledajte [[Kako skupno zamijeniti pojmove u titlovima|/guides/glossary.html]]; ako je sadržaj prljav, prvo pokrenite [[Čišćenje titlova|/clean.html]]; kada se imena usklade i trebaju vam drugi jezici, idite na [[Prevođenje titlova|/translate.html]]; i provucite rezultat kroz [[Kontrola kvalitete titlova|/qc.html]]."
    ]
   }
  ]
 },
 "subtitle-quality-check": {
  "seo": {
   "title": "Kontrolni popis za kontrolu kvalitete titlova prije isporuke – AI-SRTSub",
   "desc": "Kontrolni popis za isporuku titlova: preklapanja, brzina čitanja, širina retka i interpunkcija najčešće ne uspijevaju. Pokrenite 17 pravila kontrole kvalitete – polovica problema rješava se jednim klikom.",
   "h1": "Što provjeriti prije isporuke",
   "intro": "Dovršeni titlovi nisu spremni za isporuku: problemi koje gledatelji primjećuju na prvi pogled upravo su oni koje ne možete vidjeti nakon gledanja stotinu puta. Ovaj kontrolni popis pokriva taj završni prolaz.",
   "ctaText": "Pokrenite provjeru kontrole kvalitete titlova"
  },
  "body": [
   {
    "h2": "Zašto ne možete sami vidjeti probleme",
    "ps": [
     "Svatko tko pravi titlove pre dobro poznaje sadržaj – znate što svaki redak govori sljedeće, tako da se ništa nikad ne čini prebrzo; vidjeli ste izgled stotine puta, i vaše oči same preskaču nedostatke. Stoga se provjera prije isporuke ne može osloniti na \"ponovno gledanje od vrha\" – mora se **mjeriti prema brojevima**: brzina čitanja, širina retka, trajanje, preklapanja. Neka brojke odluče."
    ]
   },
   {
    "h2": "Šest najčešćih propusta",
    "ps": [
     "Rangirano prema tome koliko često potapaju isporuku:"
    ]
   },
   {
    "h2": "Kako provjeriti",
    "ps": [
     "Otvorite [[Kontrola kvalitete titlova|/qc.html]] i ispustite svoje titlove; postavite jezik na automatsko prepoznavanje (27 jezika, svaki sa svojim razinama pravila). Izvještaj navodi nalaze na tri razine – **pogreške / upozorenja / natuknice** – svaka s brojem unosa i izmjerenom vrijednošću. S pogreškama se mora postupati (iskrivljeni tekst, format vremenske oznake, kraj ranije nego početak, slomljeno numeriranje); upozorenja ovisno o slučaju (preklapanja, brzina čitanja, širina retka, trajanje); natuknice su dotjerivanje (položaj prijeloma retka, razmaci, interpunkcija)."
    ],
    "img": {
     "file": "qc-report",
     "alt": "Izvještaj o kontroli kvalitete: popis problema u tri razine, svaki nalaz s brojem unosa i usporedbom izmjereno-naspram-praga",
     "cap": "Trostruki izvještaj koji daje broj unosa i izmjerenu vrijednost za svaki nalaz"
    }
   },
   {
    "h2": "Što se može popraviti jednim klikom",
    "ps": [
     "Numeriranje, prazni unosi, ponovno omatanje, razmaci i interpunkcija – sve što **ostavlja vrijeme netaknutim** – može se automatski popraviti; popravci koji **mijenjaju vrijeme** (zamjena početka i kraja, pomicanje preklapanja, skraćivanje ili rastezanje trajanja) po zadanom su odznačeni i trebali bi biti označeni tek nakon što potvrdite utjecaj. **Brzina čitanja iznad granice nema automatski popravak** – stroj ne može znati koju riječ izrezati, stoga sami skratite prijevod ili malo olabavite vrijeme; pogledajte [[Titlovi su prebrzi za čitanje|/guides/subtitle-too-fast.html]]. Nakon popravka, svježa provjera pokreće se automatski, a izvještaj broji samo ono što je istinski popravljeno."
    ]
   },
   {
    "h2": "Kad ste već kod toga",
    "ps": [
     "Stranica izvještaja može izravno preuzeti izvještaj u običnom tekstu `.qc.txt` – priložite ga uz isporuku tako da druga strana na prvi pogled vidi što ste provjerili. Za svježe prevedene titlove pokrenite kontrolu kvalitete prije isporuke; ukupno pomicanje vremenske trake drugačija je vrsta problema – ako brzina čitanja i dalje ne uspijeva nakon provjere, pogledajte [[Titlovi ispadaju iz sinkronizacije|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "subtitle-speed-converter": {
  "seo": {
   "title": "Sinkronizirajte titlove nakon promjene brzine videa – AI-SRTSub",
   "desc": "Video je ubrzan ili usporiljen, a titlovi se više ne uklapaju: unesite faktor brzine u korak skaliranja prema stopi i cijela se vremenska traka rasteže s videom.",
   "h1": "Prilagodite titlove nakon promjene brzine videa",
   "intro": "Video je postao brži ili sporiji u cjelini, titlovi su ostali u izvornom ritmu – sve nakon jedne točke je pomaknuto. Unesite faktor i cijela se vremenska traka skalira s videom.",
   "ctaText": "Otvori uređivač vremena"
  },
  "body": [
   {
    "h2": "Kada koristiti stopu umjesto pomaka",
    "ps": [
     "Video je ubrzan ili usporiljen **u cjelini** (recimo 0.9x ili 1.25x u softveru za uređivanje) dok je svaka oznaka zadržala svoj izvorni ritam: početak se podudara, a što dalje idete, to gore postaje – s konstantnim omjerom. To je problem stope. Ako je cijela datoteka jednostavno pomaknuta za fiksni iznos bez rasta, pomak je dovoljan – pogledajte [[pomicati cijelu datoteku titlova ranije ili kasnije|/guides/shift-subtitle-timing.html]]."
    ]
   },
   {
    "h2": "Koji broj unijeti",
    "ps": [
     "Titlovi moraju pratiti video, stoga unesite **faktor za koji se video stvarno promijenio**: ubrzanje od 1.25x znači da se vremena oznaka množe s 1.25 kako bi se sustiglo; usporavanje od 0.9x množi s 0.9. U uređivaču vremena dodajte korak **Skaliraj prema stopi** i stavite faktor u polje za vrijednost."
    ],
    "img": {
     "file": "shift-step-rate",
     "alt": "Korak skaliranja prema stopi s faktorom u polju za vrijednost",
     "cap": "Faktor iznad 1 rasteže vremensku traku (za ubrzani video), ispod 1 je sažima (za usporavanje)."
    }
   },
   {
    "h2": "Kako se ovo razlikuje od pomaka",
    "ps": [
     "Pomak **pomiče** vremena svake oznake za isti fiksni iznos i zadržava trajanja oznaka; stopa **množi** i početak i kraj, tako da se i trajanja skaliraju. Nakon promjene brzine sama su se trajanja promijenila – to je upravo razlog zašto je stopa potrebna."
    ]
   },
   {
    "h2": "Ako niste sigurni u vezi s faktorom",
    "ps": [
     "Kada je faktor izgubljen, vratite se na **dva sidra**: unesite stvarna vremena videa prve i posljednje oznake i sve između širi se proporcionalno – ekvivalentno rješavanju za pravi faktor. Pogledajte [[titlovi sve više gube sinkronizaciju|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "subtitle-too-fast": {
  "seo": {
   "title": "Titlovi su prebrzi za čitanje – Popravite brzinu čitanja – AI-SRTSub",
   "desc": "Titlovi su prebrzi za čitanje – kratko trajanje ili dugačak tekst? QC označava unose preko 20 znakova u sekundi (9 hanzi za CJK); trajanja se automatski popravljaju, tekst treba urediti.",
   "h1": "Titlovi su prebrzi za čitanje",
   "intro": "Gledatelji stalno pritišću pauzu? Krivac je brzina čitanja. Kako je izmjeriti, kako je popraviti i kada uređivati tekst u odnosu na vrijeme – sve u jednom vodiču.",
   "ctaText": "Provjeri brzinu čitanja"
  },
  "body": [
   {
    "h2": "Što je brzina čitanja?",
    "ps": [
     "Brzina čitanja je jednostavno **mogu li gledatelji završiti s čitanjem titla unutar vremena koje ostaje na ekranu**. Matematika je jednostavna: širina teksta podijeljena sa sekundama na ekranu. Uobičajena industrijska ograničenja: 9 znakova pune širine u sekundi za kineski, japanski i korejski (18 jedinica polovične širine), 20 jedinice polovične širine u sekundi za druge jezike. Redak s 20 hanzi znakova koji traje 1 sekundu ispada 40 jedinica širine u sekundi – više od dvostruko više od ograničenja, i gledatelji ga nikada neće završiti."
    ]
   },
   {
    "h2": "Prvo, razdvojite koja vrsta brzine je u pitanju",
    "ps": [
     "\"Prebrzo za čitanje\" zapravo su dva različita problema: **kratko trajanje** – oznaka se prekida nakon jedne ili dvije stotine milisekundi, obično pogreška vremena ili ostatak uređivanja; **dugačak tekst** – trajanje je u redu, ali redak trpa 30 hanzi znakova, i nijedno ograničenje brzine ga neće spasiti. Popravci su suprotni, stoga prvo shvatite koji imate."
    ],
    "img": {
     "file": "qc-rules",
     "alt": "Postavka ograničenja brzine čitanja na stranici QC-a, zadano postavljena na 18 za CJK i 20 za druge jezike",
     "cap": "Pragovi brzine čitanja za QC: 18 jedinica širine u sekundi za CJK, 20 za druge jezike"
    }
   },
   {
    "h2": "Kako provjeriti",
    "ps": [
     "Otvorite [[Kontrola kvalitete titlova|/qc.html]] i ispustite svoje titlove. U izvještaju, \"kratko trajanje\" je upozorenje koje prikazuje izmjerene milisekunde (prag: 833 milisekundi); \"nečitljiva brzina\" je vlastiti nalaz koji prikazuje izmjerene jedinice širine u sekundi. Za dvojezične titlove računa se samo redak napisan na ciljanom jeziku – dva jezika se ne zbrajaju."
    ]
   },
   {
    "h2": "Kako to popraviti",
    "ps": [
     "**Kratko trajanje**: može se popraviti jednim klikom – oznaka se automatski produžuje na 833 milisekundi, bez prekoračenja početka sljedeće oznake (popravak ne smije stvoriti nova preklapanja). **Dugačak tekst**: nema automatskog popravka – stroj ne može znati koju riječ izrezati. Dva puta, vaš izbor: skratite prijevod (kliknite ćeliju u alatu za prevođenje da biste je uredili) ili rastegnite trajanje ove oznake (samo ako postoji praznina prije sljedeće oznake; za probleme s ukupnom vremenskom trakom pogledajte [[Pomak vremenske trake|/shift.html]]). Ponovno pokrenite QC nakon toga kako biste potvrdili da je brzina čitanja vraćena unutar praga."
    ]
   },
   {
    "h2": "Nemojte pretjerano ispravljati",
    "ps": [
     "Zadovoljavanje ograničenja brzine ne znači udobno gledanje: trpanje svake oznake točno do 9 znakova u sekundi čini cijeli film nornim. Kao pravilo palca, zadržite se na oko 70% praga većinu vremena, i dopustite odlomcima s puno dijaloga da malo prijeđu preko toga s vremena na vrijeme. Blokovi titlova koji trepere prečesto sami po sebi predstavljaju problem – pokrenite cijeli skup metrika prije isporuke, pogledajte [[Što provjeriti prije isporuke|/guides/subtitle-quality-check.html]]."
    ]
   }
  ]
 },
 "subtitles-out-of-sync": {
  "seo": {
   "title": "Titlovi sve više gube sinkronizaciju? Popravite to – AI-SRTSub",
   "desc": "Počinje dobro, nekoliko sekundi kasni do sredine filma, neupotrebljivo na kraju: to je progresivno kašnjenje, obično neusklađenost broja sličica u sekundi ili promjena brzine videa. Dva sidra to rješavaju.",
   "h1": "Titlovi sve više ispadaju iz sinkronizacije: uzroci i rješenja",
   "intro": "Dobro na početku, par sekundi kasno nakon pola sata, bespomoćno na kraju. Ova vrsta pomaknute neusklađenosti ima poznate uzroke – i poznato rješenje.",
   "ctaText": "Popravi ovu datoteku"
  },
  "body": [
   {
    "h2": "Prvo razdvojite dvije vrste neusklađenosti",
    "ps": [
     "Neusklađenost dolazi u dvije vrste: **uniformni pomak** znači da svaka oznaka kasni (ili žuri) za isti iznos, otprilike jednak od početka do kraja; **progresivno kašnjenje** znači da je početak točan i pogreška raste prema kraju, potencijalno dosežući minute. Ovaj članak govori o drugoj vrsti – za prvu pogledajte [[pomicati cijelu datoteku titlova ranije ili kasnije|/guides/shift-subtitle-timing.html]]."
    ]
   },
   {
    "h2": "Zašto sve više kasni",
    "ps": [
     "Kašnjenje dolazi iz **dva različita sata**: tri najčešća uzroka su (1) neusklađenost broja sličica u sekundi – titlovi filma s 24 fps na izvoru s 25 fps gube preko sekundu po minuti; (2) video je bio ubrzan ili usporiljen dok su titlovi zadržali svoj izvorni ritam; (3) VFR (promjenjivi broj sličica u sekundi) snimka čija je vremenska traka ionako neravnomjerna. Ono što dijele: pogreška raste otprilike linearno s vremenom reprodukcije."
    ]
   },
   {
    "h2": "Popravite to s dva sidra",
    "ps": [
     "Budući da pogreška raste linearno, fiksiranje točnog vremena na svakom kraju i ponovno širenje sredine proporcionalno vraća sve na mjesto. U uređivaču vremena dodajte **korekciju s dva sidra**: dva \"trenutna\" polja automatski se popunjavaju izvornim vremenima ove datoteke; gledate video i unosite **kada se prva i posljednja oznaka stvarno pojavljuju** u dva \"ciljana\" polja."
    ],
    "img": {
     "file": "shift-step-two",
     "alt": "Korekcija s dva sidra: trenutna vremena automatski popunjena, ciljana vremena za unijeti",
     "cap": "Uzmite sidra na dvjema krajnostima – najmanja i najveća izvorna pogreška – i sve između se proporcionalno ponovno širi."
    }
   },
   {
    "h2": "Kako provjeriti rezultat",
    "ps": [
     "Nakon izvršavanja, ploča s rezultatima prikazuje izvorna i nova vremena svake oznake **jedno pored drugog**. Provjerite na licu mjesta tri mjesta: prvu oznaku, jednu u sredini i posljednju – tri položaja s najmanjom, srednjom i najvećom izvornom pogreškom. Ako se sva tri poklope, cijela datoteka se poklapa."
    ],
    "img": {
     "file": "shift-result",
     "alt": "Ploča s rezultatima: vremena prije i poslije jedno pored drugog, s gumbom za preuzimanje",
     "cap": "Nova vremena srednjih oznaka trebala bi pasti između dva kraja – znak da je omjer ispravan."
    }
   },
   {
    "h2": "Kada dva sidra nisu dovoljna",
    "ps": [
     "Korekcija s dva sidra pretpostavlja da je pogreška **linearna**. Ako je izvor VFR snimka zaslona s skokom broja sličica u sekundi u sredini datoteke, linearno povlačenje ne može popraviti sredinu – uzmite očito pomaknutu srednju oznaku kao treću točku, podijelite datoteku tamo i pokrenite korekciju s dva sidra na svakoj polovici. Također, nakon popravka, ponovno pogledajte srednji dio pri normalnoj brzini kako biste potvrdili da nije ostalo lokalne neusklađenosti."
    ]
   }
  ]
 },
 "table": {
  "seo": {
   "title": "Pretvorba titlova u Excel / CSV – U oba smjera – AI-SRTSub",
   "desc": "Vodič u oba smjera: izvezite SRT/VTT u Excel ili CSV za lektoriranje redak po redak, a zatim uvezite uređenu tablicu natrag kao titlove. Potrebna su tri stupca, bilo kojim redoslijedom; vrijeme se čuva kao tekst.",
   "h1": "Kako pretvoriti titlove u Excel / CSV",
   "intro": "Lektoriranje i prevođenje lakši su u proračunskoj tablici. Izvezite titlove u Excel ili CSV, uređujte redak po redak, a zatim ih ponovno pretvorite — stupci s vremenom ostaju tekst, a prijelomi redaka unutar dijaloga su očuvani.",
   "ctaText": "Otvori pretvarač tablica"
  },
  "body": [
   {
    "h2": "What this tool does :: Što ovaj alat radi",
    "ps": [
     "Titlovi su redci znakova, a proračunske tablice su redci zapisa – jednom kada je to tablica, lektoriranje, komentiranje i masovno prevođenje mogu se obaviti alatima koje već poznajete. Podržana su oba smjera:"
    ]
   },
   {
    "h2": "Učitajte i odaberite smjer",
    "ps": [
     "Povucite datoteku unutra ili je potražite. Svaki smjer treba drugačiju vrstu datoteke: **u tablicu** uzima datoteke titlova (SRT / VTT), **u titl** uzima datoteke proračunskih tablica (CSV / Excel, i .xlsx i .xls). Ako odaberete krivi način rada, stranica će vam reći koju vrstu datoteke taj način rada želi.",
     "⚠️ Ova stranica čita samo UTF-8. Ako se vaš titl otvori kao zaslon pun upitnika ili kvadratića, prvo ga provucite kroz [[Popravak kodiranja|/repair.html]] – oštećeno kodiranje ovdje se čita samo kao zamjenski znakovi."
    ],
    "img": {
     "file": "table-up",
     "alt": "Područje za učitavanje pretvarača tablica: zona za ispuštanje i dva prekidača načina rada",
     "cap": "Svaki način rada želi drugu datoteku: titlovi unutra, proračunska tablica van – i natrag"
    }
   },
   {
    "h2": "Izvoz titlova u tablicu",
    "ps": [
     "Odaberite \"u tablicu\", ispustite titl, a pretpregled će izlistati svaki znak: indeks, početak, kraj, tekst. Traka sa statistikom daje broj znakova i ukupno trajanje. Zatim kliknite \"Preuzmi Excel (.xlsx)\" ili \"Preuzmi CSV\".",
     "Razlika između dvoga: .xlsx je prava datoteka proračunske tablice u kojoj Excel ne može preoblikovati vaš stupac s vremenom iza vaših leđa; CSV je prijenosniji, ali Excel može protumačiti stupac s vremenom kao nešto drugo prilikom otvaranja. Ako se to dogodi, odaberite stupac s vremenom i postavite njegov format na \"Tekst\" – ili jednostavno upotrijebite .xlsx."
    ],
    "img": {
     "file": "table-prev",
     "alt": "Pretpregled tablice: stupci indeksa, početka, kraja i teksta s trakom statistike",
     "cap": "Pregledan svaki znak; traka sa statistikom daje broj znakova i ukupno trajanje"
    }
   },
   {
    "h2": "Uvoz tablice natrag u titlove",
    "ps": [
     "Odaberite \"u titl\", ispustite tablicu, a ovo je pravilo za stupce: potrebna su tri stupca za **početak, kraj i tekst** (engleska zaglavlja Start / End / Text također rade), u **bilo kojem redoslijedu**. `00:00:01,500` i `00:00:01.500` su oba prihvaćena; retci koji se ne mogu analizirati preskaču se umjesto da se osudi cijela datoteka.",
     "Rezultat je naveden znak po znak u pretpregledu; potvrdite, zatim preuzmite SRT ili VTT. Ako ta tri stupca nedostaju, dobit ćete poruku koja vam govori da provjerite zaglavlja – obično zato što je pri izvozu korišten drugi naziv ili redak zaglavlja nije prvi redak."
    ],
    "img": {
     "file": "table-back",
     "alt": "Područje rezultata titlova: uvezeni titlovi navedeni znak po znak",
     "cap": "Nepoznati stupci se prijavljuju, nikada se ne ignoriraju tiho"
    }
   },
   {
    "h2": "FAQ :: Često postavljana pitanja",
    "ps": [
     "**Excel pogrešno prikazuje stupac s vremenom?** Upotrijebite .xlsx i to se nikada ne događa. Ako morate koristiti CSV: odaberite stupac s vremenom i postavite format ćelije na \"Tekst\" prije otvaranja.",
     "**Moraju li zaglavlja stupaca biti na engleskom?** Ne. Start / End / Text prepoznaju se na bilo kojem jeziku koji ova stranica podržava, a veličina slova nije važna.",
     "**Jesu li moji prijelomi redaka još uvijek tu nakon uvoza?** Da. Prijelomi redaka unutar dijaloga su sačuvani, sve do izvornog omatanja.",
     "**Je li ASS podržan?** Ova stranica obrađuje samo SRT i VTT. ASS nosi direktive stila – prvo ga pretvorite u SRT pomoću [[Pretvarač formata|/convert.html]].",
     "**Koliko datoteka odjednom?** Jedna. Za obradu desetaka ili stotina, upotrijebite [[Grupna pretvorba|/batch.html]] (koja samo pretvara formate i ne prolazi kroz tablicu)."
    ]
   },
   {
    "h2": "Privacy :: Privatnost",
    "ps": [
     "Pretvorba se odvija u potpunosti u vašem pregledniku. Sadržaj titlova se nikada ne šalje na poslužitelj."
    ]
   },
   {
    "h2": "Povezani alati i vodiči",
    "ps": [
     "Ako sve što želite jest korak pretvorbe titlova u Excel, pogledajte [[Pretvori titlove u Excel|/guides/srt-to-excel.html]]; za naknadno prevođenje na drugi jezik, [[Prevođenje titlova|/translate.html]]; desetine datoteka odjednom – [[Grupna pretvorba|/batch.html]]."
    ]
   }
  ]
 },
 "translate": {
  "seo": {
   "title": "AI prevođenje titlova – učitavanje do dvojezičnog izvoza – AI-SRTSub",
   "desc": "Prevedite titlove pomoću AI-ja: učitajte SRT/VTT/ASS, odaberite između 100 jezika, ujednačite imena pomoću rječnika, izvezite dvojezične titlove. Besplatno za početak, podržan vlastiti API ključ.",
   "h1": "Kako koristiti AI prevođenje titlova",
   "intro": "Cijeli tijek rada za jednu datoteku titlova, od učitavanja preko prevođenja do izvoza: što je na ekranu, što kliknuti i što dobivate u svakom koraku.",
   "ctaText": "Otvori alat za prevođenje"
  },
  "body": [
   {
    "h2": "What this tool does :: Što ovaj alat radi",
    "ps": [
     "Prevedi titlove s jednog jezika na drugi i izvezi spremnu datoteku titlova. Tipične potrebe:"
    ]
   },
   {
    "h2": "Upload subtitles :: Učitaj titlove",
    "ps": [
     "Kliknite \"Odaberi datoteku titlova\" ili zalijepite tekst titla izravno u lijevo polje za unos. Podržano je šest formata: SRT, VTT, ASS, SSA, SBV i TXT. Nemate datoteku pri ruci? Kliknite \"Učitaj primjer\" da biste vidjeli kako radi. Nakon obrade, srednji stupac prikazuje tablicu titlova s indeksom, vremenskom crtom i izvornim tekstom za svaki unos."
    ],
    "img": {
     "file": "translate-upload",
     "alt": "Područje uvoza alata za prevođenje: odaberite datoteku titlova, okvirić za lijepljenje i gumb za učitavanje primjera",
     "cap": "Lijevi stupac \"Uvoz titlova\": odaberite datoteku, zalijepite tekst ili učitajte primjer"
    }
   },
   {
    "h2": "Odaberi jezik i stil",
    "ps": [
     "\"Izvorni jezik\" može ostati na automatskom detektiranju; \"ciljni jezik\" se bira iz 100 jezika. Dostupno je pet stilova prevođenja: Uravnoteženo (zadano), Razgovorni, Formalno profesionalno, Stil sinkronizacije i Prilagođeno. \"Stil sinkronizacije\" odgovara filmskim i TV dijalozima; \"Formalno profesionalno\" odgovara dokumentarcima i tečajevima."
    ],
    "img": {
     "file": "translate-lang",
     "alt": "Postavke jezika i stila prevođenja: izvorni jezik, padajući izbornici ciljnog jezika i pet stilova",
     "cap": "\"Jezik\" i \"stil prevođenja\": izvor može automatski prepoznati, 75 ciljnih izbora"
    }
   },
   {
    "h2": "Rječnik: održavajte imena dosljednima",
    "ps": [
     "AI prevodi u serijama, tako da isto ime može izaći na dva različita načina u različitim serijama. Upišite pravila \"izvor → mora biti prevedeno kao\" u rječnik; prije svake serije alat ga skenira i slijedi svako podudaranje. Jedno pravilo po retku; strelice mogu biti `->`, `=>`, `→` ili Tab; usamljeni izvorni pojam znači ostaviti ga neprevedenim; nekoliko pravopisa može dijeliti jedan prikaza putem `|`. Kliknite \"✨ AI izdvajanje\" kako bi AI prvo izvukao vlastite imenice iz videa u tablicu, zatim ih uredio i preveo."
    ],
    "img": {
     "file": "translate-glossary",
     "alt": "Područje rječnika i vlastitih imenica: polje za unos rječnika s gumbima za AI izdvajanje i spremanje",
     "cap": "Rječnik \"Ujednačena imena\": AI-izdvajanje vlastitih imenica, automatski učitano za nove videozapise jednom spremljeno"
    }
   },
   {
    "h2": "Proces prevođenja",
    "ps": [
     "Kliknite \"▶ Pokreni prevođenje\" u gornjoj traci. Središnja traka sa statistikom prikazuje unose, prevedeno, očišćene poštapalice i grupe rečenica koje se protežu kroz više unosa u stvarnom vremenu; traka napretka prikazuje preostalo procijenjeno vrijeme i iskorištene tokene. Tijekom prevođenja kliknite bilo koju ćeliju za prevođenje u tablici kako biste uredili tekst – promjene se pohranjuju na vašem računalu i preživljavaju osvježavanje. Zatvorite stranicu usred izvođenja i bit će vam ponuđeno da nastavite tamo gdje ste stali. Kada se jedna rečenica proteže kroz nekoliko unosa, grupa se spaja, prevodi i ponovno ispunjava prema trajanju."
    ],
    "img": {
     "file": "translate-workspace",
     "alt": "Radni prostor za prevođenje: traka sa statistikom, traka napretka i tablica titlova koja se može uređivati",
     "cap": "Srednji radni prostor: traka sa statistikom + traka napretka + tablica titlova s klikom za uređivanje"
    }
   },
   {
    "h2": "Export :: Izvoz",
    "ps": [
     "U desnom stupcu prvo odaberite oblik sadržaja: samo prijevod (jednojezični), dvojezični s izvornikom na vrhu ili dvojezični s prijevodom na vrhu; zatim format datoteke: SRT, WebVTT, SBV, ASS ili TXT. Odabir ASS-a dodaje dva rasporeda: podijeljene gornje/donje zaslone i složene donje retke. Sadržaj i format slobodno se kombiniraju u 14 stilova izvoza. Širina dvojezičnog retka postavlja se zasebno. Kliknite \"Preuzmi titlove\" da biste spremili datoteku ili \"Kopiraj u međuspremnik\" da biste je odmah zalijepili."
    ],
    "img": {
     "file": "translate-export",
     "alt": "Ploča za izvoz: tri oblika sadržaja, pet formata datoteka i postavke širine dvojezičnog retka",
     "cap": "Izvoz u desnom stupcu: prvo odaberite oblik sadržaja, zatim format datoteke"
    }
   },
   {
    "h2": "Cost and privacy :: Trošak i privatnost",
    "ps": [
     "Zadani model ne zahtijeva registraciju ni ključ – radi odmah po izgledu s kvotama po zahtjevu: dnevni limit po IP-u plus dnevni dodatak za cijelu stranicu. Za velike serije unesite vlastiti API ključ pod \"Prevoditeljski mehanizam\". Privatnost, prema obavijesti na stranici: titlovi za zadani model prosljeđuju se preko poslužitelja ove stranice pružatelju usluge; prilagođenim API-jem upravlja izravno pružatelj kojeg unesete, a ključ ostaje u vašem pregledniku. Analiza, omatanje redaka i dvojezični raspored rade lokalno u pregledniku."
    ]
   },
   {
    "h2": "FAQ :: Često postavljana pitanja",
    "ps": [
     "**Drugi jezici pomiješani u prijevodu?** Alat otkriva odstupanje jezika i automatski prevodi ponovno; ako nekoliko unosa i dalje izgleda pogrešno, kliknite ćeliju i ispravite ih ručno.",
     "**Što je s recima stihova?** \"Filtriranje sadržaja\" nudi tri opcije za stihove: prevedite stihove, zadržite izvornik ili ih izbrišite.",
     "**Nedosljedni prijevodi imena?** Dodajte nedosljedne pravopise u rječnik i prevedite ponovno; rječnik ima prednost nad globalnom postavkom \"upravljanja vlastitim imenicama\".",
     "**Želite li engleski na vrhu, a kineski ispod?** Odaberite \"Dvojezično · izvornik na vrhu\" prilikom izvoza; za kineski na vrhu i engleski ispod, odaberite \"Dvojezično · prijevod na vrhu\"."
    ]
   },
   {
    "h2": "Povezani alati i vodiči",
    "ps": [
     "Krivi format? Počnite s [[pretvorbom formata|/convert.html]]; vremenska crta nije u redu? Upotrijebite [[prilagodbu vremenske crte|/shift.html]]; prije nego što ga predate, provucite ga kroz [[provjeru kvalitete titlova|/guides/subtitle-quality-check.html]]."
    ]
   }
  ]
 },
 "translate-english-to-chinese": {
  "seo": {
   "title": "Prevedi engleske titlove na kineski – AI-SRTSub",
   "desc": "Prevedite engleske titlove na kineski: učitajte SRT/VTT/ASS, odaberite pojednostavljeni ili tradicionalni i izvezite samo kineske ili dvojezične titlove. – AI-SRTSub",
   "h1": "Prevedi engleske titlove na kineski",
   "intro": "Engleski SRT unutra, kineski (ili dvojezični englesko-kineski) titlovi van: učitajte, odaberite ciljni jezik, izvezite – sve na jednoj stranici.",
   "ctaText": "Prevedi engleske titlove"
  },
  "body": [
   {
    "h2": "When you need it :: Kada vam je to potrebno",
    "ps": [
     "Titl koji ste preuzeli je samo na engleskom i ne možete pratiti; ili želite kineske titlove za članove obitelji koji ne čitaju engleski. Ono što trebate dolazi u jednom od tri oblika – **samo kineski titlovi**, ili dvojezični titlovi s **kineskim na vrhu, engleskim ispod** ili **engleskim na vrhu, kineskim ispod** – a ovaj alat daje sva tri."
    ]
   },
   {
    "h2": "How to do it :: Kako to učiniti",
    "ps": [
     "Otvorite [[AI prevoditelj titlova|/translate.html]] i ispustite svoju datoteku engleskog titla (SRT, VTT, ASS, SSA, SBV i TXT su prepoznati, ili jednostavno zalijepite tekst). Ostavite \"Izvorni jezik\" na automatskom prepoznavanju, postavite \"Ciljni jezik\" na pojednostavljeni ili tradicionalni kineski i kliknite \"▶ Započni prevođenje\". Kada završi, odaberite oblik sadržaja na ploči za izvoz s desne strane: samo prijevod (jednojezični), dvojezično · izvornik na vrhu (engleski gore, kineski dolje) ili dvojezično · prijevod na vrhu (kineski gore, engleski dolje), zatim odaberite format datoteke i preuzmite."
    ],
    "img": {
     "file": "translate-export",
     "alt": "Ploča za izvoz: samo prijevod, dvojezično s izvornikom na vrhu i dvojezično s prijevodom na vrhu",
     "cap": "Odaberite oblik sadržaja pri izvozu: samo kineski, ili dvojezično s engleskim gore / kineskim gore"
    }
   },
   {
    "h2": "Two common problems :: Dva uobičajena problema",
    "ps": [
     "**Imena prevedena nedosljedno?** AI prevodi u serijama, tako da isto ime može izaći na dva načina. Stavite parove \"izvor → prevedeno ime\" u rječnik (npr. `Watson → Huasheng`) kako biste ga održali ujednačenim posvuda.",
     "**Titlovi se razilaze sa slikom?** Prvo prevedite, zatim popravite vrijeme: traka s alatima vremenske crte na vrhu radnog stola ima globalnu kontrolu pomaka i ljestvice – pogledajte [[Titlovi gube sinkronizaciju prema kraju|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "videosub": {
  "seo": {
   "title": "Izdvajanje ugrađenih titlova videa – MKV / MP4 zapisi – AI-SRTSub",
   "desc": "Pročitajte zapise titlova unutar MKV, WebM, MP4 i MOV datoteka izravno i izvezite SRT / VTT / ASS / TXT. Nema prijenosa, nema transkodiranja, svaki je jezični zapis naveden, slikovni titlovi su označeni.",
   "h1": "Kako izvući titlove ugrađene u videozapis",
   "intro": "Pročitajte zapis titla zapečaćen unutar MKV / MP4 datoteke izravno kao SRT – videozapis se nikada ne prenosi, sve se čita u pregledniku.",
   "ctaText": "Otvori izdvajanje titlova iz videa"
  },
  "body": [
   {
    "h2": "What this tool does :: Što ovaj alat radi",
    "ps": [
     "Titlovi mogu biti zapečaćeni unutar videodatoteke umjesto da stoje sami. Da biste ih uredili, preveli ili uparili, prvo ih morate izvući – to je jedina stvar koju ova stranica radi."
    ]
   },
   {
    "h2": "1 Add the video :: 1 Dodaj videozapis",
    "ps": [
     "Povucite videodatoteku u prvi stupac ili kliknite da biste je odabrali. Prepoznati su samo **MKV / WebM** i **MP4 / MOV**; drugi spremnici neće dati nikakav zapis.",
     "Datoteka nikada ne napušta vaše računalo – nema koraka prijenosa. Alat čita u malim komadima po pomaku, tako da film od više gigabajta ne puni memoriju, ali prvo čitanje mora jednom skenirati informacije o zapisu."
    ],
    "img": {
     "file": "videosub-up",
     "alt": "Područje za dodavanje videa na stranici za izdvajanje ugrađenih titlova",
     "cap": "MKV / WebM i MP4 / MOV su podržani, a datoteka nikada ne napušta vaše računalo"
    }
   },
   {
    "h2": "2 Ugrađeni zapisi titlova",
    "ps": [
     "Jednom kada čitanje završi, drugi stupac navodi zapise titlova u datoteci **jedan po retku**, obično s jezikom i nazivom zapisa (na primjer \"kineski\", \"engleski\", \"prisilno\"). Kliknite redak da biste izvukli taj zapis.",
     "Kada datoteka sadrži samo jedan zapis titla, izdvajanje započinje automatski – nije potreban klik.",
     "**Slikovni titlovi se ne mogu izvući**: Blu-ray PGS i DVD titlovi su slike ugrađene u tok bez teksta koji se može uzeti, a stranica to jasno kaže; za te je potreban OCR."
    ],
    "img": {
     "file": "videosub-track",
     "alt": "Popis ugrađenih zapisa titlova, jedan po retku",
     "cap": "Jedan zapis po retku; kada postoji samo jedan, izdvajanje započinje automatski"
    }
   },
   {
    "h2": "3 The result :: 3 Rezultat",
    "ps": [
     "\"3 Rezultat\" s desne strane prikazuje izvučeni tekst titla, s formatom izvoza iznad njega: **SRT / VTT / ASS / TXT**. Kliknite \"Preuzmi\" ili \"Kopiraj\".",
     "Kada je izvorni zapis ASS, njegova vlastita zaglavlja stila i razlučivost vraćaju se nepromijenjeni – izvoz kao ASS ih čuva, dok izvoz kao SRT nosi samo tekst."
    ],
    "img": {
     "file": "videosub-out",
     "alt": "Područje rezultata s izborom formata SRT / VTT / ASS / TXT",
     "cap": "Četiri formata izvoza; izvor u ASS formatu zadržava zaglavlje stila i razlučivost"
    }
   },
   {
    "h2": "Što ostaje netaknuto",
    "ps": [
     "Sama videodatoteka uopće nije dirana – samo čitanje, bez pisanja, bez transkodiranja, bez remuxiranja.",
     "Sadržaj titla izlazi kakav jest: bez pogađanja kodiranja, bez korekcije vremenske crte. Ako su izvučeni titlovi iskrivljeni, to je problem kodiranja u izvornom zapisu – odnesite ga na [[Popravak iskrivljenog teksta|/repair.html]]."
    ]
   },
   {
    "h2": "Common questions :: Česta pitanja",
    "ps": [
     "**Postoji li zaista način da se obrade slikovni titlovi (PGS / DVD)?** Ne na ovoj stranici – to su slike bez sloja teksta. OCR mora biti prvi, a ova stranica to ne radi.",
     "**Izvučeni titlovi imaju pogrešno vrijeme – zašto?** Ova stranica ne ispravlja vremenske crte; ono što izađe jest ono što je bilo tu. Za globalni pomak ili problem s brzinom upotrijebite [[Prilagodba vremenske crte|/shift.html]].",
     "**Zašto treba toliko dugo prije nego što se bilo što dogodi?** Veliku datoteku potrebno je skenirati dio po dio radi informacija o zapisu, i što je datoteka veća, to dulje traje; to se događa lokalno i nem veze s vašom vezom.",
     "**Mogu li koristiti ovu stranicu za vanjske datoteke titlova?** Ne morate – vanjski .srt / .ass ide izravno u [[Pretvorba formata|/convert.html]] ili drugi alat. Ova stranica je za titlove koji su zapečaćeni unutar videa."
    ]
   },
   {
    "h2": "Privacy :: Privatnost",
    "ps": [
     "Videozapis se čita u potpunosti u pregledniku: ništa se ne prenosi, ništa se ne transkodira, ništa ne prolazi kroz poslužitelj. Zatvorite stranicu i pročitani podaci se oslobađaju."
    ]
   },
   {
    "h2": "Povezani alati i vodiči",
    "ps": [
     "Za prevođenje onoga što izvučete idite na [[Prevođenje titlova|/translate.html]], da biste ih učinili dvojezičnim pogledajte [[Dva načina izrade dvojezičnih titlova|/guides/make-bilingual-subtitles.html]]; za razliku između ugrađenih i vanjskih zapisa te koji se mogu izvući, pogledajte [[Kako izvući titlove iz videa|/guides/extract-subtitles-from-video.html]]."
    ]
   }
  ]
 },
 "vtt-to-srt": {
  "seo": {
   "title": "VTT u SRT pretvarač – Pretvorite WebVTT titlove – AI-SRTSub",
   "desc": "Pretvorite VTT (WebVTT) titlove u SRT za uređivače i svirače koji prihvaćaju samo SRT. WEBVTT zaglavlje i NOTE blokovi se automatski čiste. Radi u vašem pregledniku.",
   "h1": "VTT to SRT :: VTT u SRT",
   "intro": "Pretvorite VTT (WebVTT) titlove u SRT: ispustite datoteku, odaberite SRT, preuzmite. Zaglavlja i blokovi bilješki se čiste, a vremenske oznake vraćaju se na zapis sa zarezom.",
   "ctaText": "Convert VTT → SRT :: Pretvori VTT → SRT"
  },
  "body": [
   {
    "h2": "Kada vam je SRT ponovno potreban",
    "ps": [
     "CapCut, Premiere, većina stolnih svirača i stariji alati za titlove prihvaćaju samo **SRT**. Titlovi preuzeti s weba ili s YouTubea obično dolaze kao VTT – pretvorite ih u SRT kako biste ih uvezli izravno."
    ]
   },
   {
    "h2": "Što se čisti iz VTT-a",
    "ps": [
     "**Linija zaglavlja WEBVTT**, NOTE blokovi, STYLE/REGION blokovi i postavke znakova nakon linije vremena (poput align:start) nisu tekst titla – oni se automatski odbacuju; numeriranje se obnavlja, a separator milisekundi vraća se s točke na zarez."
    ],
    "img": {
     "file": "convert-upload-vtt",
     "alt": "Područje za učitavanje: učitana VTT datoteka, prepoznata kao VTT",
     "cap": "Datoteka s WEBVTT zaglavljem odmah se prepoznaje kao VTT"
    }
   },
   {
    "h2": "How to convert :: Kako pretvoriti",
    "ps": [
     "Otvorite [[pretvarač|/convert.html]], ispustite VTT, odaberite **SRT - SubRip** kao izlaz, zatim pretvorite i preuzmite. Tekst i vrijednosti vremena ostaju netaknuti."
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
