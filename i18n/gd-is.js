/* i18n/gd-is.js —— 43 篇指南页的is译文（由 _mkgd.js 生成，勿手改）
 * 源：_gd/is.json（Gemini 翻译，_gemgd.js 产出）
 * 结构：{ <slug>: { seo:{title,desc,h1,intro,ctaText}, body:[{h2,ps[],img}] } }
 * ⚠️ server.js 自己 require 它，不被任何 html 引用 —— 部署时必须显式加进传输列表。
 */
module.exports = {
 "ass-to-srt": {
  "seo": {
   "title": "ASS til SRT breytir – Umbreyta ASS/SSA textaskrám – AI-SRTSub",
   "desc": "Umbreyta ASS- (og SSA-) textaskrám í einfalt SRT: texti og tímasetningar eru dregnar út eins og þær eru, en stíltaggar skiljast eftir. Fyrir hugbúnað sem tekur eingöngu við SRT. Keyrir í vafranum þínum.",
   "h1": "ASS til SRT",
   "intro": "Umbreyta ASS- (eða SSA-) textaskrám í SRT: slepptu skránni, veldu SRT, halaðu niður. Texti og tímasetningar eru dregnar út eins og þær eru; stíltaggar flytjast ekki með.",
   "ctaText": "Umbreyta ASS → SRT"
  },
  "body": [
   {
    "h2": "Þegar þig vantar SRT aftur",
    "ps": [
     "Myndvinnsluforrit, stafrænir sjónvarpsboxar, sjónvarpsspilarar, þýðingarverkfæri — fjölmargir ferlar síðar í keðjunni taka eingöngu við **SRT** skráarsniði. Glæsileg stílfærsla og staðsetning í ASS skiptir þar engu máli, þannig að einfalt SRT er öruggasta lausnin."
    ]
   },
   {
    "h2": "Hvað verður um stíltagga",
    "ps": [
     "Hvert ASS-skot er Dialogue-lína þar sem textinn ber oft yfirskrifunartagga eins og `{\\fonts}` fyrir lit, hreyfingu eða brellur. Við breytingu í SRT **falla þessir taggar brott ásamt stílsniðinu**, þannig að aðeins textinn og tímasetningarnar haldast; `\\N` línuskil verða að raunverulegum línuskilum. Einnig er hægt að lesa SSA-skrár."
    ],
    "img": {
     "file": "convert-result-srt",
     "alt": "Niðurstaða breytingar: SRT-númerun og texti dreginn út úr ASS",
     "cap": "Útdregið SRT: eitt númer á skot, hreinn texti"
    }
   },
   {
    "h2": "Hvernig á að umbreyta",
    "ps": [
     "Opnaðu [[breytinn|/convert.html]], slepptu ASS-skránni inn í (það virkar líka með .ssa), veldu **SRT - SubRip** sem úttak, umbreyttu síðan og halaðu niður. Ertu að fara hina áttina? Sjá [[SRT til ASS|/guides/srt-to-ass.html]]."
    ]
   }
  ]
 },
 "batch": {
  "seo": {
   "title": "Hvernig á að fjöldaumbreyta textaskrám – Hundruð í eina ZIP-skrá – AI-SRTSub",
   "desc": "Leiðbeiningar: slepptu tugum SRT-/VTT-skráa inn í, umbreyttu þeim í eitt snið, halaðu niður einni ZIP-skrá. Endurnúmerað, tímatimplar staðlaðir, skrár sem ekki tókst að þátta eru flaggaðar í stað þess að smygla sér inn í safnið.",
   "h1": "Hvernig á að fjöldaumbreyta textaskrám",
   "intro": "Það þarf venjulega að skila allri þáttaröð af textaskrám á einu og sama sniði, og að hlaða þeim upp einni af annarri tekur langan tíma. Slepptu þeim öllum hingað inn, umbreyttu þeim saman og halaðu niður einni ZIP-skrá — skrár sem ekki er hægt að þátta eru flaggaðar, en þeim er aldrei pakkað hljóðlega saman eins og þær hafi virkað.",
   "ctaText": "Opna fjöldaumbreytingu"
  },
  "body": [
   {
    "h2": "Hvað þetta tól gerir",
    "ps": [
     "Það þarf venjulega að samræma textaskrár fyrir alla þáttaröðina eða safnið áður en hægt er að gera eitthvað annað við þær. Hér er það sem fjöldavinnslusíðan gerir:"
    ]
   },
   {
    "h2": "Bæta við skrám",
    "ps": [
     "Dragðu nokkrar textaskrár í brotalínureitinn í einu, eða smelltu og veldu margar skrár í einu. Skráarlistinn sýnir þær allar: þáttaðar skrár sýna fjölda skota, en þær sem ekki tókst að þátta eru einfaldlega merktar sem óþekktar. Efsta stikan sýnir heildarfjölda skráa, skota og hversu margar skrár fundust ekki.",
     "⚠️ Þessi síða les eingöngu UTF-8 skráarsnið. Allt sem er með skemmda stafsetningu (skjáfullt af spurningamerkjum eða kassa) ætti fyrst að fara í gegnum [[Viðgerð á rugluðum texta|/repair.html]]."
    ],
    "img": {
     "file": "batch-list",
     "alt": "Skráarlisti: nafn og fjöldi skota á hverja skrá, óþekktar skrár merktar með rauðu",
     "cap": "Hver skrá er skráð og óþekktar skrár eru flaggaðar samstundis"
    }
   },
   {
    "h2": "Hverju á að umbreyta öllu í",
    "ps": [
     "Veldu markskráarsnið undir \"Umbreyta öllu í\" — SRT eða VTT. Hver skrá á listanum er þá endurgerð á því sniði: skotanúmer eru endurnúmeruð frá efstu línu, tímatimplar staðlaðir við markskráarsniðið (SRT aðskilur millisekúndur með kommu, VTT með punkti).",
     "**Upprunaleg skráarnöfn haldast og aðeins skráarendingin breytist**; tvítekin nöfn fá viðbótarnúmer þannig að engu sé skipt út fyrir annað."
    ],
    "img": {
     "file": "batch-up",
     "alt": "Valið fyrir markskráarsnið og staða lista, ásamt stöðustiku sem sýnir fjölda skráa og skota",
     "cap": "Veldu markskráarsnið og hver skrá endurgerist; aðeins skráarending skráarnafna breytist"
    }
   },
   {
    "h2": "Pökkun og niðurhal",
    "ps": [
     "Smelltu á \"Pakka í eina ZIP-skrá og hala niður\" og skjalasafnið inniheldur hverja einustu umbreytta skrá. **Skrár án þekktra skota haldast utan skjalasafnsins** — þær eru áfram á listanum, flaggaðar, í stað þess að vera blandað saman eins og þær hafi heppnast. Þegar búið er að pakka færðu upplýsingar um hve margar skrár eru inni í safninu."
    ],
    "img": {
     "file": "batch-zip",
     "alt": "Pökkunarsvæði: ZIP-niðurhalsnaki og skilaboð um árangur pökkunar",
     "cap": "Óþekktar skrár haldast utan skjalasafnsins og eru áfram flaggaðar á listanum"
    }
   },
   {
    "h2": "Hvers vegna skrá er flokkuð sem óþekkt",
    "ps": [
     "Skrá er flaggað þegar ekki er hægt að lesa nein skot úr henni. Þrjár venjulegar ástæður: þetta er engan veginn textaskrá (t.d. villt .txt-lesmælisskrá), stafsetningin er ekki UTF-8 (þannig að hún birtist eingöngu sem útskiptimerki), eða innihaldinu hefur verið þjappað saman í einn blokk án tímatimbla.",
     "Hægt er að glíma við flaggaðar skrár hverja fyrir sig: vandamál varðandi stafsetningu fara í [[Viðgerð á rugluðum texta|/repair.html]], sniðvandamál í [[Sniðbreytir|/convert.html]] fyrir staka umbreytingu áður en farið er aftur inn á listann."
    ]
   },
   {
    "h2": "Algengar spurningar",
    "ps": [
     "**Hversu mörgum skrám get ég bætt við?** Það eru engin föst mörk; það fer eftir minni vafrans þíns, og nokkur hundruð SRT-skrár ganga venjulega vel.",
     "**Breytir þessu samtalinu mínu?** Nei. Fjöldaumbreyting breytir eingöngu ílátssniðinu — endurnúmerar skot og staðlar tímatimbla — aldrei einu einasta orði í samtali.",
     "**Hvað ef ég þarf að breyta innihaldinu?** Þessi síða breytir eingöngu skráarsniðum. Til að breyta tímasetningum í lausu skal nota [[Tímasetningarstilling|/shift.html]]; til að breyta orðalagi skal nota [[Skipting á hugtökum|/glossary.html]]; hvort tveggja virkar skrá fyrir skrá.",
     "**Er stuðningur við ASS?** Þessi síða umbreytir aðeins á milli SRT og VTT. ASS ber með sér stílfærslu — notaðu [[Sniðbreytir|/convert.html]] á hana fyrir sig."
    ]
   },
   {
    "h2": "Persónuvernd",
    "ps": [
     "Umbreyting og pökkun eiga sér stað að fullu í vafranum þínum. Ekkert innihald textaskráa er nokkurn tíma sent á þjón."
    ]
   },
   {
    "h2": "Tengd tól og leiðbeiningar",
    "ps": [
     "Hvað á að breyta fyrir alla þáttaröð og í hvaða röð — [[Fjöldavinnsla á allri þáttaröð af textaskrám|/guides/batch-convert-srt.html]]; fleiri snið fyrir staka skrá — [[Sniðbreytir|/convert.html]]; yfirlestur í töflureikni — [[Textaskrá ⇄ tafla|/table.html]]."
    ]
   }
  ]
 },
 "batch-convert-srt": {
  "seo": {
   "title": "Fjöldavinnsla á allri þáttaröð – Hvað skilar sér, hvað ekki – AI-SRTSub",
   "desc": "Það þarf venjulega sömu breytinguna alls staðar í þáttaröð: stöðugt snið, tímasetningarhliðrun, hugtök. Hér er það sem klárast í einni umferð, það sem ekki er hægt, og hvernig á að meðhöndla skrár sem mistekst að þátta.",
   "h1": "Fjöldavinnsla á allri þáttaröð af textaskrám",
   "intro": "Þegar breyta þarf tugum textaskráa er það venjulega sama breytingin í hvert sinn. Það að vita hvaða hluta hægt er að gera í einni umferð sparar mun meiri tíma en að vinna sig í gegnum þær einar og sér.",
   "ctaText": "Opna fjöldaumbreytingu"
  },
  "body": [
   {
    "h2": "Það er venjulega sama breytingin alls staðar",
    "ps": [
     "Þegar textaskrár fara úrskeiðis fyrir alla þáttaröðina á hver þáttur sjaldan sinn eigin sérstaka vanda — það er venjulega ein orsök sem kemur niður á öllum þáttum: sami útgáfuhópurinn kóðaði þá alla (þannig að snið og vatnsmerki passa saman), þeir voru allir tímasettir við sömu myndútgáfu (þannig að stefna og magn hliðrunar eru samhljóða), eða þýðingar fóru í sundur yfir þáttaröðina.",
     "Athugaðu fyrst tvo þætti lauslega — einn snemma, einn seint — og staðfestu að þetta sé sannarlega **sama vandamálið** áður en þú ferð í fjöldavinnslu. Ef þeir eru ekki sammála er þetta ekki eitthvað sem fjöldavinnsla getur lagað."
    ]
   },
   {
    "h2": "Hvað er hægt að gera í einni umferð",
    "ps": [
     "**Samræming sniðsins** er það eina sem klárast í raun í einni umferð: dragðu tugi SRT- og VTT-skráa inn í [[Fjöldaumbreyting|/batch.html]] í einu, veldu markskráarsniðið og halaðu niður einni ZIP-skrá. Endurnúmerun og staðlun tímatimbla eiga sér stað í sama skrefi, og ekki einasta orð í samtali breytist."
    ],
    "img": {
     "file": "batch-list",
     "alt": "Skráarlisti á fjöldavinnslusíðu: fjöldi skota á skrá, óþekktar skrár merktar með rauðu",
     "cap": "Samræmt snið er það eina sem klárast sannarlega í einni umferð"
    }
   },
   {
    "h2": "Hvað þarf að gera skrá fyrir skrá",
    "ps": [
     "Þetta er ekki með neinn aðgangspunkt fyrir fjöldavinnslu og þarf eina umferð á skrá — þó að það sé venjulega samsvarandi aðgerð sem **þarf aðeins að gera einu sinni og á síðan við um alla þáttaröðina**:"
    ]
   },
   {
    "h2": "Náðu réttri röð",
    "ps": [
     "Þegar margt þarf að gera þýðir röng röð endurvinnslu. Farðu í þessari röð:",
     "**Laga stafsetningu** → **samræma snið** → **breyta innihaldi** (vatnsmerki, hugtök, tímasetningar) → **gæðaeftirlit síðast**. Að umbreyta sniðum áður en stafsetning er lagað gefur þér bara ruglaðan texta í öðru íláti; að breyta innihaldi áður en snið eru samræmd þýðir vinnu við ósamræmdan stuðning tækja."
    ],
    "img": {
     "file": "batch-zip",
     "alt": "Pökkunarsvæði: ZIP-niðurhalsnaki og niðurstöðuskilaboð",
     "cap": "Samræmdu snið fyrst, breyttu innihaldi á eftir"
    }
   },
   {
    "h2": "Meðhöndlun skráa sem fundust ekki",
    "ps": [
     "Skrár sem eru flaggaðar sem óþekktar í fjöldaumbreytingu eru teknar út úr ZIP-skránni og haldast á listanum. Þrjár venjulegar ástæður: þetta er ekki textaskrá (villt lesmælisskrá), stafsetningin er ekki UTF-8, eða innihaldinu var þjappað saman í einn blokk án tímatimbla.",
     "Vandamál varðandi stafsetningu fara í [[Viðgerð á rugluðum texta|/repair.html]] hver fyrir sig; sniðvandamál í [[Sniðbreytir|/convert.html]] áður en þeim er komið aftur fyrir á listanum. **Ekki þvinga óþekktar skrár inn í skjalasafnið eingöngu til að hækka fjöldann** — að uppgötva að þátt vantar í spilaranum þínum kostar miklu meira en mínútan sem þetta sparar."
    ]
   },
   {
    "h2": "Tengd tól og leiðbeiningar",
    "ps": [
     "Allar fjöldavinnsluleiðbeiningar — [[Hvernig á að fjöldaumbreyta textaskrám|/guides/batch.html]]; stöðugar tímasetningarhliðranir — [[Hvernig á að stilla tímasetningu textaskráa|/guides/shift.html]]; síðasta umferð fyrir afhendingu — [[Gæðaeftirlit textaskráa|/qc.html]]."
    ]
   }
  ]
 },
 "bilingual": {
  "seo": {
   "title": "Hvernig á að skipta eða sameina tvítyngdar textaskrár – AI-SRTSub",
   "desc": "Fjórar leiðir til að fjarlægja tvítyngdan texta: halda aðeins einu spor, skipta í tvær skrár, eða sameina í eina tveggja lína færslu. Báðar tegundir sjálfgreindar, í vafranum þínum.",
   "h1": "Hvernig á að fjarlægja tvítyngdan texta úr textaskrám",
   "intro": "Viltu skipta tvítyngdum texta, sameina hann eða halda bara einu spori? Þessar leiðbeiningar fara í gegnum allar fjórar stillingarnar: hvernig greining virkar, hvaða stillingu á að velja og hvað þú færð við útflutning.",
   "ctaText": "Opna tvítyngda textaskráahreinsarann"
  },
  "body": [
   {
    "h2": "Til hvers þetta tól er gert",
    "ps": [
     "Þú ert með tvítyngdan texta en vilt bara annað sporið — eða öfugt, þú vilt skipta eða sameina sporin tvö:"
    ]
   },
   {
    "h2": "Hvernig það greinir tvítyngt efni",
    "ps": [
     "Tvítyngdar skrár með tvöföldum sporum koma fram í tveimur algengum myndum, og tólið þekkir hverja um sig — **án þess að giska á tungumálið**: **Mynd A (ein færsla, tvær línur)** skiptir sporatitlum eftir ritkerfi — kana, hangul, hanzi, latnesku og öðrum kerfum, samtals tíu talsins; tvö mismunandi kerfi þýða tvítyngi, og það sem birtist fyrst gildir sem upprunalegt. Eitt kerfi (t.d. löng kínversk lína skipt í tvær) er meðhöndlað sem eintyngt og haldið óbreyttu. **Mynd B (tvær aðskildar færslur með nákvæmlega sömu tímasetningu)** skiptir sporatitlum eftir staðsetningu — færslurnar tvær á sömu tímatimblu mynda par, sú fyrsta gildir sem upprunaleg, og samsetningar sem deila latnesku stafrófi, eins og ensku-frönsku eða ensku-þýsku, eru einnig aðskildar réttilega. Þegar ekkert tvítyngt efni greinist eru stillingavalmyndin og Byrja-hnappurinn óvirkir ásamt skýrri tilkynningu, þannig að það þvingar aldrei fram ranga niðurstöðu."
    ]
   },
   {
    "h2": "Fjórleikur stillinganna",
    "ps": [
     "Veldu einn af fjórum í fellivalmyndinni „Hvaða viltu?“: **Halda aðeins upprunalegum** og **Halda aðeins þýðingu** gefa hvor um sig eina skrá; **Skipta í tvær** gefur upprunalega skrá og þýðingarskrá, þar sem skráarnöfn eru sjálfkrafa merkt með `.orig` / `.dst` til að koma inni í veg fyrir yfirskrifun; **Sameina í eina tveggja lína færslu** breytir hverju pari í tvítyngda færslu — upprunaleg á einni línu, þýðing á hinni — á meðan eintyngdum pörum er haldið óbreyttum og engin önnur lína er fundin upp. Þegar þú skiptir um stillingu eða úttakssnið keyrir núverandi efni aftur sjálfkrafa — engin þörf á að smella aftur á Byrja."
    ],
    "img": {
     "file": "bilingual-modes",
     "alt": "Stillingarval í tvítyngda hreinsaranum: halda upprunalegu, halda þýðingu, skipta í tvær, sameina í eina tveggja lína færslu",
     "cap": "Fjórar stillingar: halda einu spori, skipta í tvær, eða sameina í eina tveggja lína færslu"
    }
   },
   {
    "h2": "Inntak og úttak",
    "ps": [
     "Les sjö snið — SRT, VTT, ASS, SSA, SBV, LRC, TXT (skráarending fyrst, efnisgreining sem varaaðferð) — og flytur út fjögur: SRT, VTT, ASS, TXT. Hvaða inntaks- og úttakssamsetning sem er virkar, þannig að sniðaskipti eiga sér stað í ferlinu. ASS `\\N` línuskil eru endurheimt sem raunveruleg línuskil, og brellutaggar eru fjarlægðir við úttak á milli sniða."
    ]
   },
   {
    "h2": "Niðurstöður og útflutningur",
    "ps": [
     "Niðurstöður birtast að fullu í skrifvörðum textareit, þar sem hver skrá sýnir fjölda skota og heildartímatölfræði; Niðurhal- og Afrita-hnapparnir sækja skrána beint. Niðurstöðusvæðið er forsýning — það er engin ritvinnsla á texta eða tímasetningum hér. Til að gera breytingar skal flytja út fyrst og nota síðan samsvarandi tól."
    ],
    "img": {
     "file": "bilingual-result",
     "alt": "Niðurstöðusvæði fyrir hreinsun: skrifvörð forsýning, tölfræði um fjölda skota og niðurhals-/afritunarhnappar",
     "cap": "Forsýning með fullum texta + tölfræði um skot og lengd + niðurhal og afritun"
    }
   },
   {
    "h2": "Algengar spurningar",
    "ps": [
     "**Ein færsla er með ensku á einni línu og frönsku á hinni — hvers vegna vill hún ekki skiptast?** Mynd A skiptir sporatitlum eftir ritkerfi, þannig að tvö tungumál sem deila einu kerfi innan einnar færslu eru aðskiljanleg. Endurskipuleggðu hana sem Mynd B (tvær færslur á sömu tímalínu) og skipting eftir staðsetningu virkar.",
     "**Aðeins ein skrá í niðurhalinu?** „Halda aðeins upprunalegum“, „Halda aðeins þýðingu“ og „Sameina í eina tveggja lína færslu“ gefa hver um sig eina skrá samkvæmt hönnun; aðeins „Skipta í tvær“ gefur þér tvær, merktar með `.orig` / `.dst`.",
     "**Get ég unnið í biðröð?** Ein skrá í einu; biðraðir eru ekki studdar.",
     "**Hlaðast textaskrárnar mínar upp á netið?** Nei — greining og útflutningur fara fram að fullu í vafranum þínum."
    ]
   },
   {
    "h2": "Tengdar leiðbeiningar",
    "ps": [
     "Fyrir fljótlegu leiðina til að skipta tveimur sporatitlum sjá [[Skipta tvítyngdum textaskrár í tvö spor|/guides/split-bilingual-subtitles.html]]; fyrir hvernig tvítyngdar textaskrár eru búnar til sjá [[Tvær leiðir til að búa til tvítyngdar textaskrár|/guides/make-bilingual-subtitles.html]]; fyrir vélþýðingu skal nota [[AI-textaskrárþýðing|/translate.html]]."
    ]
   }
  ]
 },
 "clean": {
  "seo": {
   "title": "Textaskráahreinsari – fjarlægja vatnsmerki, auglýsingar, SDH-texta – AI-SRTSub",
   "desc": "Textaskráahreinsari: 13 reglur fjarlægja vatnsmerki, auglýsingar, SDH-texta, HTML-tagga, tvítekningar; hver breyting er með samanburð (diff) og er afturkræf. SRT/VTT/ASS, allt í vafra.",
   "h1": "Hvernig á að nota textaskráahreinsarann",
   "intro": "Textaskrár sem hlaðið er niður af vefnum bera oft með sér vatnsmerki, auglýsingar og SDH-texta. Hreinsarinn beitir 13 reglum í einni umferð, og sérhver breyting er greind með mismun og hægt er að afturkalla hana.",
   "ctaText": "Opna textaskráahreinsarann"
  },
  "body": [
   {
    "h2": "Hvað þetta tól gerir",
    "ps": [
     "Niðurhalaðar textaskrár bera oft með sér hluti sem þær ættu ekki að hafa. Hreinsarinn fjarlægir þá í einni regludrífnum umferð:"
    ]
   },
   {
    "h2": "Hlaða inn og greina",
    "ps": [
     "Dragðu skrá inn eða smelltu til að hlaða henni upp — SRT, VTT, ASS, SSA og TXT eru studd — eða límdu textaskráartexta beint inn. Stafsetning er sjálfgreind: ef UTF-8 afkóðun skilar útskiptimerkjum fellur hún aftur á GBK eða Big5, og síðan sýnir „Stafsetning lagað sem {encoding}“. Ef þú hlaðir upp tvítyngdum textaskrám (tveimur eins tímalínum, annarri á kínversku og hinni á ensku) er þeim safnað saman í eitt tvítyngt spor með „upprunalegt efst / þýðing efst“ skipti."
    ]
   },
   {
    "h2": "Að stilla 13 reglurnar",
    "ps": [
     "Viðmótið er með fjóra hópa með 13 gátreitum: **Taggar og snið** (ASS brellur, HTML taggar, stjórnmerki, endurnúmera eftir röðun), **SDH og hljóðbrellur** (SDH-texti, hátalaramerki, hreinar laglínur), **Vatnsmerki og ruslfærslur** (vatnsmerki og auglýsingar, tvíteknar færslur, tómir færslur), **Textaleiðréttingar** (greinarmerki og bil, hástafaviðgerð, sameina stuttar línur). Aðeins „tapslausir og öruggir“ hlutir eru virkir sjálfgefni; hlutir sem gætu fellt niður efni (laglínur, hástafaviðgerð, sameina stuttar línur) eru óvirkir — hakaðu við þá þegar þörf krefur. Hver hlutur er með ⓘ svifiábendingu og allar breytingar á gátreitum keyra samstundis aftur."
    ],
    "img": {
     "file": "clean-opts",
     "alt": "Viðmót hreinsunarstillinga: fjórir hópar af 13 gátreitum, virkur fjöldi birtist efst",
     "cap": "Fjórir hópar, 13 reglur; aðeins tapslausir hlutirvirkir sjálfgefni, breytingar eiga við samstundis"
    }
   },
   {
    "h2": "Breytingarsamanburður og afturköllun",
    "ps": [
     "Niðurstöður eru ekki skrifaðar yfir beint: hver breyting er skráð í mismunatöflu með reglutagi (hvers vegna þessari færslu var breytt eða hún eytt). Viltu fá hana til baka? Smelltu á „Endurheimta“ í þeirri röð; „Endurheimta allt“ færir allt til baka með einum smelli, og ef smellt er aftur er öll hreinsunin endurtekin. Stöðustikan sýnir fjölda fyrir upprunalegt / hreinsað / eytt / breytt / endurheimt."
    ],
    "img": {
     "file": "clean-diff",
     "alt": "Tafla fyrir breytingarmismun: vísir, tími, upprunalegur vs hreinsaður texti, reglutagur á hverri röð",
     "cap": "Hver breyting ber með sér reglutag; endurheimtu stakar raðir eða allar í einu"
    }
   },
   {
    "h2": "Forsýning og útflutningur",
    "ps": [
     "Skiptu á milli „Hreinsað / Upprunalegt“ sýna. Í upprunalegu sýninni eru eyddar færslur strikaðar yfir og merktar „Eytt“, og útflutningsskráin passa nákvæmlega við forsýninguna. Útflutningssnið: SRT (sjálfgefið), VTT, ASS (í boði þegar uppruninn er ASS, þar sem stílhlutinn heldur sér óbreyttur), og plain-text TXT án tímatimbla. Skráarnafnið fær `.clean` merki sjálfkrafa."
    ],
    "img": {
     "file": "clean-preview",
     "alt": "Forsýning með fullum texta: hreinsaðar og upprunalegar sýn með stöðustiku sem sýnir fjölda",
     "cap": "Tvær forsýningarútsýni, það sem þú sérð er það sem þú færð"
    }
   },
   {
    "h2": "Algengar spurningar",
    "ps": [
     "**Mun þetta eyða venjulegu samtali fyrir mistök?** Vatnsmerkreglan fjarlægir fyrst vatnsmerki línur (og heldur samtalslínum innan tvítyngdra færsla) og eyðir aðeins allri færslunni ef ummerki eru til staðar; SDH-fjarlæging snertir aðeins efni innan sviga með SDH-lykilhugtökum sem eru 40 stafir eða styttri — venjulegt innan sviga samtal heldur sér.",
     "**Hvernig er hreinum laglínum greint frá lögum innan samtaals?** Aðeins færslur þar sem hver einasta lína er umlukin ♪ tónlistartáknum eða merkjum eins og [music] er eytt; samtal sem inniheldur texta laga er haldið.",
     "**Gætu hátalaramerki lent á kínverskum texta?** Aðeins hástafa tölustafanafni í upphafi línu fylgt eftir með tvípunkti (eins og `GEORGE:`) passa; kínverskar tvípunktur setningar gera það aldrei.",
     "**Get ég hreinsað margar skrár í einu?** Nei — ein skrá í hverri keyrslu. Sæktu niðurstöðuna og hlaðið síðan upp þeirri næstu."
    ]
   },
   {
    "h2": "Persónuvernd",
    "ps": [
     "Hreinsun keyrir að fullu í vafranum þínum; ekkert efni textaskráa er nokkurn tíma sent á þjón."
    ]
   },
   {
    "h2": "Tengd tól og leiðbeiningar",
    "ps": [
     "Fyrir stuttar leiðbeiningar sem beinast að því að fjarlægja vatnsmerki og auglýsingar, sjá [[fjarlægja textaskráarauglýsingar og vatnsmerki|/guides/remove-subtitle-ads.html]]; keyrðu skrána þína í gegnum [[gæðaeftirlit textaskráa|/guides/subtitle-quality-check.html]] áður en þú afhendir hana; til að breyta sniðum skal nota [[sniðbreyting|/convert.html]]."
    ]
   }
  ]
 },
 "convert": {
  "seo": {
   "title": "Hvernig á að umbreyta textaskráarsniðum (SRT, VTT, ASS, SBV, LRC, TXT) – AI-SRTSub",
   "desc": "Myndrænar leiðbeiningar fyrir breytinn: slepptu skrá inn í, athugaðu greint snið, veldu úttakssnið, taktu á tvítyngdum texta og halaðu niður. Allt keyrir í vafranum þínum.",
   "h1": "Leiðbeiningar um breyti á textaskráarsniðum",
   "intro": "Þessar leiðbeiningar fara í gegnum síðuna frá efstu til neðstu línu: hladdu inn textaskrá, staðfestu greint snið, veldu úttakssnið og halaðu niður. Allt keyrir í vafranum þínum — engin skrá yfirgefur tækið þitt.",
   "ctaText": "Opna textaskráarbreytinn"
  },
  "body": [
   {
    "h2": "Hlaðdu inn textaskrám þínum",
    "ps": [
     "Dragðu skrá inn í brotalínureitinn eða smelltu til að velja eina; þú getur líka **límt innihaldinu** beint inn í textareitinn. Sniðið er greint bæði út frá skráarendingu og innihaldi, og niðurstaðan birtist í sniðstaganum."
    ],
    "img": {
     "file": "convert-upload",
     "alt": "Inntakssvæði: dæmi um SRT hlaðið inn, greint sem SRT",
     "cap": "Greinda sniðið birtist í tagginu — athugaðu hér fyrst ef þú ert í vafa"
    }
   },
   {
    "h2": "Veldu úttakssnið",
    "ps": [
     "Veldu markskráarsnið úr fellivalmyndinni: sex valmöguleikar — srt, vtt, ass, sbv, lrc, txt. Umbreyting í ass endurgerir fastan 1920×1080 sjálfgefinn stíl (hvítur texti, svört útlína, neðst í miðju) og **heldur ekki upprunalegum letrum eða litum**; txt flytur út texta eingöngu, án tímasetninga."
    ],
    "img": {
     "file": "convert-opt",
     "alt": "Fellivalmynd fyrir úttakssnið með VTT valið",
     "cap": "Úttakssniðið fylgir ekki inntakinu — þú velur það"
    }
   },
   {
    "h2": "Meðhöndlun tvítyngis",
    "ps": [
     "Ef skráin er tvítyngd (tvær línur í einu skoti, eða skot sem fléttast saman) er útlitið haldið óbreyttu við umbreytingu. Valið „halda tvítyngdu“ skiptir tungumálunum tveimur í efri og neðri línur, þar sem hvor um sig er umbúðuð upp á nýtt á sínum stað; stjórntækið er óvirkt þegar enginn tvítyngdur texti greinist."
    ]
   },
   {
    "h2": "Umbreyttu og halaðu niður",
    "ps": [
     "Smelltu á „Umbreyta“: niðurstöðuborðið sýnir fjölda skota og heildartíma, ásamt textanum tilbúnum til skoðunar. Smelltu á **Niðurhal** til að vista skrána, eða **Afrita** til að taka textann beint. Umbreyting breytir aldrei neinum tímatilvikum — hún skrifar aðeins yfir sniðið. Til að breyta tímasetningum skota skal nota [[tímatól|/shift.html]]."
    ],
    "img": {
     "file": "convert-result",
     "alt": "Niðurstöðuborð: fjöldi skota og heildartími ásamt niðurhals- og afritunarhnöppum",
     "cap": "6 skot, 0:23 samtals — renndu yfir textann áður en þú halar niður"
    }
   }
  ]
 },
 "extract": {
  "seo": {
   "title": "Draga út hreinan texta úr textaskrám – Tvö útlit, fimm hreinsanir – AI-SRTSub",
   "desc": "Draga út talmál úr textaskrám sem hreinan texta: samfelldar málsgreinar eða ein lína á skot, og það sem fimm rofarnir fyrir SDH-skot, vatnsmerki, tvíteknar færslur, forskeyti og laglínur fjarlægja.",
   "h1": "Hvernig á að draga út hreinan texta úr textaskrám",
   "intro": "Draga talmálið út úr textaskrá sem hreinan texta: skotanúmer, tímalínur og stíltaggar eru fjarlægð sjálfkrafa, þannig að niðurstaðan lesst eins og grein eða virkar sem samtalslisti.",
   "ctaText": "Opna útdráttartól fyrir hreinan texta"
  },
  "body": [
   {
    "h2": "Hvað þetta tól gerir",
    "ps": [
     "Aðeins talmálið í textaskrá skiptir lesanda máli; afgangurinn er uppbygging sem er ætluð fyrir spilara — skotanúmer, tímalínur, stíltaggar. Þessi síða fjarlægir uppbygginguna og heldur orðunum."
    ]
   },
   {
    "h2": "Slepptu því inn, ekki bara hlaða upp",
    "ps": [
     "„1 Bæta við textaskrám“ dálkurinn til vinstri tekur við hlaðinni skrá, og þú getur líka límt textaskráartexta beint inn í textareitinn. Ef þú valdir rangar skrár skaltu smella á „Hreinsa“ og byrja aftur.",
     "Þessi síða les skrár sem UTF-8. Ef textaskrárnar opnast sem veggur af spurningamerkjum eða kassa er stafsetningin skemmd — umbreyttu henni í UTF-8 í [[Viðgerð á rugluðum texta|/repair.html]] fyrst og komdu svo aftur."
    ],
    "img": {
     "file": "extract-up",
     "alt": "Bæta-við-textaskrám svæðið í útdráttartólinu fyrir hreinan texta",
     "cap": "Hladdu upp skrá eða límdu textaskráartexta beint inn í textareitinn"
    }
   },
   {
    "h2": "Að velja á milli tveggja útlita",
    "ps": [
     "Efst á „2 Útdráttarstillingar“ er útlitið: **Samfelldar málsgreinar** skiptir texta við þagnir og setningaendirgreiningarmerki þannig að hann lesist eins og grein; **Ein lína á skot** gefur eina línu á hverja textafærslu, sem passar við færslur upprunalegu skrárinnar einn á móti einni.",
     "Að afrita talmál fyrir glósur, æfa þýðingar eða lesa það sem prósa krefst samfelldra málsgreina; að byggja upp samtalsblað, bera saman línu fyrir línu við upprunann eða mata annað tól krefst einnar línu á skot."
    ],
    "img": {
     "file": "extract-opt",
     "alt": "Útlits- og hreinsunarrofarnir undir útdráttarstillingum",
     "cap": "Veldu eitt útlitsform; fimm rofarnir fyrir neðan ákveða hvers konar efni er fjarlægt"
    }
   },
   {
    "h2": "Hvað hver af fimm hreinsunum fjarlægir",
    "ps": [
     "**Fjarlægja SDH-skot**: eyðir hljóðlýsingum innan sviga eins og „(fótatak)“ eða „[music]“ og heldur samtali.",
     "**Fjarlægja vatnsmerki og auglýsingar**: fellir niður línur eins og aðdáendateymisþakkir, vefslóðir og rásarhöfundarmerki.",
     "**Fjarlægja tvíteknar nágrannafærslur**: þegar sama setning birtist tvisvar í röð (spilunarvilla) er aðeins haldið einu eintaki; tvíteknar færslur sem eru lengra á milli bera merkingu og eru látnar vera.",
     "**Fjarlægja hátalaraforskeyti**: „JÓN: Halló“ verður „Halló“. Óvirkt sjálfgefni — handritsstíll texti þarf að sýna hver er að tala.",
     "**Sleppa laglínum**: línur sem eru algjörlega „♪ … ♪“ eru sleppt. Óvirkt sjálfgefni — lög eru líka orð."
    ],
    "img": {
     "file": "extract-clean",
     "alt": "Fimm hreinsunarrofarnir og lýsingar þeirra undir útdráttarstillingum",
     "cap": "Hver rofi segir hvað hann fjarlægir hægra megin við sig; hakaðu við þá sem þig vantar"
    }
   },
   {
    "h2": "Að taka niðurstöðuna með sér",
    "ps": [
     "„3 Niðurstaða“ dálkurinn til hægri sýnir útdregna textann í beinni og reiknar út aftur um leið og þú breytir stillingu.",
     "Þegar þú ert ánægður skaltu smellt á „Niðurhal“ til að vista .txt-skrá eða „Afrita“ til að taka textann með þér. Fyrir tungumál sem aðskilja ekki orð með bilum, eins og kínversku og japönsku, fylgir línusamruni öðrum reglum, og tólið sér um það eftir tungumáli sjálfkrafa."
    ],
    "img": {
     "file": "extract-out",
     "alt": "Niðurstöðusvæðið með niðurhals- og afritunarhnöppum",
     "cap": "Niðurstaðan uppfærist í beinni; halaðu henni niður sem txt-skrá eða afritaðu hana beint"
    }
   },
   {
    "h2": "Hvað er látið óhreyft",
    "ps": [
     "Samtali sjálfu er ekki breytt. Hreinsunarrofarnir ákveða aðeins hvaða heilum línum eða blokkum er hent út; þeir breyta aldrei orðalagi færslu.",
     "Tímalínur og skotanúmer eru hreinlega ekki skrifuð út, ekki breytt og skrifuð út — upprunalega skráin er óhreyfð, og þessi síða býður ekki upp á útflutning með tímalínum. Það starf heyrir undir [[Sniðbreyting|/convert.html]]."
    ]
   },
   {
    "h2": "Algengar spurningar",
    "ps": [
     "**Bliðna ASS-stíltaggar eftir í textanum?** Nei. ASS `{}` yfirskrifunarblokkir eru fjarlægðar og aðeins samtalið stendur eftir.",
     "**Kæmir tvítyngd skrá út sem tvær línur eða ein?** Eins margar línur og færslan var með; þessi síða hvorki sameinar né skiptir þeim — til að aðskilja þær skal nota [[Tvítyngd skipting|/bilingual.html]].",
     "**Hvers vegna eru hátalaraforskeyti haldin sjálfgefið?** Nafnið í „JÓN: Halló“ eru oft gagnlegar upplýsingar (handrit, samtalsblöð), og að fjarlægja það gerir það erfitt að segja til um hver er að tala, þannig aðvalið er látið eftir þér.",
     "**Er hægt að draga út LRC-lagalínur líka?** Já. LRC-tímataggar eru fjarlægðir og lagalínurnar standa eftir; ef þú vilt ekki lög skaltu haka við „Sleppa laglínum“."
    ]
   },
   {
    "h2": "Persónuvernd",
    "ps": [
     "Textaskrár eru unnar að fullu í vafranum: ekkert er hlaðið upp og ekkert fer í gegnum þjón. Textinn er aðeins á núverandi síðu og hreinsast við endurnýjun."
    ]
   },
   {
    "h2": "Tengd tól og leiðbeiningar",
    "ps": [
     "Til að skilja hvað textaskrá inniheldur í raun og veru sjá [[Hvað er inn í SRT-skrá|/guides/srt-file-format.html]]; til að þýða útdregið talmál fara í [[Textaskrárþýðing|/translate.html]]; til að breyta því í töflu nota [[Textaskrár yfir í Excel/CSV|/guides/srt-to-excel.html]]; og keyrðu [[Gæðaeftirlit textaskráa|/qc.html]] áður en þú afhendir eitthvað."
    ]
   }
  ]
 },
 "extract-subtitles-from-video": {
  "seo": {
   "title": "Að ná textaskrám úr myndbandi – Innbyggð vs utanaðkomandi – AI-SRTSub",
   "desc": "Hvað MKV / WebM / MP4 / MOV bera með sér, hvernig texti, ASS, WebVTT og mov_text spor eru aðgreind, hvers vegna myndtextaskrár (PGS / DVD) eru án texta, og hvað á að gera eftir útdrátt.",
   "h1": "Að ná textaskrám út úr myndbandi",
   "intro": "Textaskrár geta búið inn í myndbandsskrá eða staðið sjálfstæðar fyrir utan hana. Inni í þeim eru þær spor í ílátinu — að draga þær út hefur ekkert að gera við myndbandsumbeytingu (transcoding).",
   "ctaText": "Opna útdrátt textaskráa úr myndbandi"
  },
  "body": [
   {
    "h2": "Hvar textaskrár búa: innbyggðar og utanaðkomandi",
    "ps": [
     "Myndbandsskrá (MKV, MP4) er ílát sem heldur utan um myndbandaspor, hljóðspor og textaskráarspor á sama tíma. Textaskrár sem eru innsiglaðar inni eru **innbyggðar**; aðskilin .srt- / .ass-skrá sem situr fyrir utan er **utanaðkomandi**, og innbyggð spor eru einnig kölluð **mux-uð inn**.",
     "Hægt er að nota utanaðkomandi textaskrár eins og þær eru. Vandamálið eru innbyggðu skráarnar: til að breyta þeim, þýða þær eða byggja upp tvítyngd spor úr upprunanum ertu ekki með textaskrá í höndunum — þú verður að lesa sporið út úr ílátinu fyrst. Þetta skref er ekki umbreyting: myndbandið er ekki endurkóðað, aðeins gögnin sem þegar eru geymd í ílátinu eru lesin út."
    ]
   },
   {
    "h2": "Hvaða ílát ber hvað",
    "ps": [
     "Mismunandi ílát geyma mismunandi textaskráarsnið, og erfiðleikar við útdrátt eru einnig mismunandi:"
    ],
    "img": {
     "file": "videosub-which",
     "alt": "Textaskráarsporin sýnd af útdráttarsíðu innbyggðra textaskráa",
     "cap": "Eitt spor í hverri röð, venjulega með tungumáli og spornafni; þegar það er aðeins eitt er það dregið út sjálfkrafa"
    }
   },
   {
    "h2": "Hvers vegna ekki er hægt að draga út myndtextaskrár",
    "ps": [
     "Blu-ray PGS og DVD textaskrár geyma enga stafi yfirleitt, aðeins röð af myndum með alfa-ráðum. Þegar spilari sýnir þær er hann að líma mynd, ekki birta texta.",
     "Þannig að það er enginn texti í svona spori til að lesa — það er ekki það að tólið styðji það ekki, heldur það að engir stafir eru til staðar. Síðan segir skýrt frá þegar hún rekst á eina þannig.",
     "Eina leiðin til að fá orð er að þekkja stafina í þessum myndum fyrst (OCR) og byggja upp textaskrár út frá því. Það er sérstakt ferli frá því að draga spor út."
    ]
   },
   {
    "h2": "Hvað kemur venjulega á eftir útdrætti",
    "ps": [
     "Það sem kemur út er sporið eins og það var: tólið giskar ekki á stafsetningu og lagar ekki tímatimbla. Þannig að tvennt kemur oft upp:",
     "Annað er **rugluður texti** — stafsetningarvandamál í upprunasporinu sem kemur út ruglað samt sem áður; farðu í [[Hvernig á að laga runglegan texta|/guides/repair.html]] til að bera kennsl á stafsetninguna. Hitt er **röng tímasetning** — hvort sem uppruninn er með kynningarlógói eða rammatíðni passar ekki saman, þá er niðurstaðan færð til í heild sinni; notaðu [[Tímalínustilling|/shift.html]] til að hliðra henni eða skala.",
     "Eftir það, til að þýða skaltu fara í [[Textaskrárþýðing|/translate.html]], og til að gera hana tvítyngda sjá [[Tvær leiðir til að búa til tvítyngdar textaskrár|/guides/make-bilingual-subtitles.html]]."
    ],
    "img": {
     "file": "videosub-formats",
     "alt": "Niðurstöðusvæðið með SRT / VTT / ASS / TXT útflutningssniðum",
     "cap": "Hægt er að flytja út útdregnar textaskrár á fjórum sniðum; ASS-uppruni heldur stílhaus sínum og upplausn"
    }
   },
   {
    "h2": "Nokkrir hlutir sem auðvelt er að fara rangt með",
    "ps": [
     "**Að draga út textaskrár er ekki að brenna þær inn.** Myndbandið er ekki endurkóðað, þannig að myndgæði og hljóð hafa óbreytt áhrif.",
     "**Útdráttur hefur áhrif á upprunalegu skrána.** Aðeins lestur, aldrei skrifað og ekki eitt bætist við breytingu á myndbandinu.",
     "**Að stór skrá sé hæg er ekki tengingarvandamál.** Tólið skannar sporaupplýsingar í bútum og því stærri sem skráin er því lengri tíma tekur það; allt gerist þetta staðbundið.",
     "**Utanaðkomandi textaskrár þurfa ekki þessa síðu.** Ef þú ert með .srt- / .ass-skrá skaltu fara beint í [[Sniðbreyting|/convert.html]]; aðeins textaskrár innsiglaðar inni í myndbandi þarf að draga út fyrst."
    ]
   },
   {
    "h2": "Tengd tól og leiðbeiningar",
    "ps": [
     "Fyrir allar leiðbeiningar sjá [[Hvernig á að draga út textaskrár innbyggðar í myndbandi|/guides/videosub.html]]; til að þýða það sem þú dregur út skaltu fara í [[Textaskrárþýðing|/translate.html]], til að gera það tvítyngd sjá [[Tvær leiðir til að búa til tvítyngdar textaskrár|/guides/make-bilingual-subtitles.html]]; fyrir runglegan texta byrja á [[Viðgerð á rugluðum texta|/repair.html]]."
    ]
   }
  ]
 },
 "fps-23-976-vs-25": {
  "seo": {
   "title": "Hvað þýða 23.976 / 24 / 25 / 30 rammar á sekúndu í raun – Textaskráartímasetning – AI-SRTSub",
   "desc": "23.976 er ekki 24 og 29.97 er ekki 30 — vantaða 0.1% kemur frá NTSC-lit, á meðan PAL keyrir kvikmyndir 4% hraðar. Hvernig þetta breytir tímasetningu textaskrárinnar þinnar og hvernig á að umbreyta á milli þeirra.",
   "h1": "Hvað þýða 23.976 / 24 / 25 / 30 rammar á sekúndu í raun",
   "intro": "0.1% bilið á milli 23.976 og 24 er leifar frá sjónvarpissögu. Ásamt 4% í PAL er það ástæðan fyrir því að textaskrár skekkjast lengra út úr samstillingu eftir því sem myndmynd líður.",
   "ctaText": "Opna tímasetningarstillingu"
  },
  "body": [
   {
    "h2": "Hvað hver tala er",
    "ps": [
     "Rammatíðni er hversu margar myndir eru sýndar á einni sekúndu. Þær fjórar sem þú hittir oftast á:"
    ]
   },
   {
    "h2": "Hvaðan 0.1% kemur",
    "ps": [
     "23.976 = 24 × 1000/1001, og 29.97 = 30 × 1000/1001. Þessi 1000/1001 er leifar af því að bæta lit við NTSC: til að þrengja litsundurtíðnina inn án þess að brjóta núverandi svarthvítuviðtaka var sviðstíðnin lækkuð úr 60 Hz í 59.94 Hz (60 × 1000/1001), og rammatíðni fór niður með henni.",
     "Niðurstaðan: kvikmyndir eru sýndar á 23.976 á NTSC svæðum í stað 24. Munurinn er 0.1%, eða 3.6 sekúndur yfir klukkustund — varla áberandi sjálf þegar um er að ræða, en ekki rugla þessu saman við 4% hér að neðan og aldrei sameina þetta tvennt í einum útreikningi."
    ]
   },
   {
    "h2": "Hvaðan 4% kemur",
    "ps": [
     "PAL svæði sýna við 25 ramma á sekúndu. Kvikmyndir eru teknar upp á 24 ramma á sekúndu og einfaldlega spilaðar á 25 — ekki einum ramma bætt við eða tekinn burt, þannig að spilunin keyrir 4% hraðar (25/24 ≈ 1.0417). 100 mínútna kvikmynd keyrir í 96 mínútur í PAL útgáfu sinni.",
     "Það er rót **stigvaxandi skekkju**: textaskrár gerðar á móti uppruna og myndband í PAL útgáfunni passa nákvæmlega saman í upphafi og eru fjórum mínútum frá hvorri annarri við lokaatriði. Engin altæk hliðrun getur bjargað því; hún þarf að vera skalasett eftir hlutfalli."
    ],
    "img": {
     "file": "shift-step-rate",
     "alt": "Hraðahluti tímasetningarsíðu: hlutfallsinntaksreiturinn",
     "cap": "Skalasetta eftir hlutfalli — eitt gildi nær yfir alla kvikmyndina"
    }
   },
   {
    "h2": "Hvernig á að umbreyta",
    "ps": [
     "Umbreyting þýðir að margfalda með einu hlutfalli sem á við um alla kvikmyndina:"
    ]
   },
   {
    "h2": "Að vita hverju þú ert með",
    "ps": [
     "Í stað þess að giska á hlutfallið skaltu finna tvö augnablik sem þú ert viss um að séu með rétta tímasetningu — venjulega fyrstu og síðustu línu samtalsins — og segja við tólið: „þessi lína ætti að vera kl. 00 00 12 og hin kl. 01 35 40“; hún teygir alla kvikmyndina línulega á milli þessara tveggja punkta. Það er „tveggja punkta akkerun“, og hún þarf enga útreikninga á rammatíðni frá þér.",
     "Til að staðfesta rammatíðnina sjálf(ur) skaltu athuga spilarann þinn eða miðlunarupplýsingatól. Þegar skráarnafn eins og `1080p.WEB` ber engar vísbendingar um rammatíðni er tveggja punkta akkerun öruggari leiðin."
    ],
    "img": {
     "file": "shift-step-two",
     "alt": "Akkerishluti tveggja punkta á tímasetningarsíðu: tvær raðir af tímatimplainntökum",
     "cap": "Tveggja punkta akkerun þarf enga rammatíðni — bara tvo tímatimbla"
    }
   },
   {
    "h2": "Tengd tól og leiðbeiningar",
    "ps": [
     "Umbreyting rammatíðni sjálf — [[Umbreyting á rammatíðni textaskrár|/guides/srt-fps-converter.html]]; hraðastilling — [[Hraðaumbreyting textaskrár|/guides/subtitle-speed-converter.html]]; óviss(ur) um hvort þetta sé altæk hliðrun eða stigvaxandi skekkja — [[Textaskrár sem skekkjast meira og meira úr samstillingu|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "glossary": {
  "seo": {
   "title": "Fjöldaskipting hugtaka í textaskrár – Ein tafla lagar skrá – AI-SRTSub",
   "desc": "Ein regla á línu, aðskilin með -> , => , → eða Tab, ásamt # fyrir athugasemdir. Samræmd leit að heilum orðum, hástafaviðkvæmni, fyrsta eða önnur lína tvítyngds skots, hver breyting skráð og afturkræf.",
   "h1": "Hvernig á að skipta út hugtökum í textaskrár í fjöldavinnslu",
   "intro": "Ein hugtakatöflu gerir orðalag allrar textaskrár samræmt í einu lagi — tímalínur, ASS-stílar og VTT NOTE-blokkir eru ekki snertar af einu einasta bókstaf.",
   "ctaText": "Opna fjöldaskiptingu hugtaka"
  },
  "body": [
   {
    "h2": "Hvað þetta tól gerir",
    "ps": [
     "Sama orð þýtt á tvo mismunandi vegu, nöfn og staðir sem reika með vélþýðingu, textaskrár einhvers annars sem þurfa að passa við þínar eigin venjur — allt þetta á sameiginlegt eitt einkenni: það sem breytist er orð, ekki uppbyggingin. Þessi síða breytir aðeins orðum."
    ]
   },
   {
    "h2": "Tvö inntak: textaskrár og hugtakatöflu",
    "ps": [
     "„1 Bæta við textaskrám“ dálkurinn til vinstri tekur við textaskrá, eða þú getur límt innihaldið beint inn; ef þú valdir rangar skrá skaltu smella á „Hreinsa“.",
     "„2 Hugtakatöflu“ dálkurinn til hægri heldur utan um reglurnar. **Ein regla á línu**, þar sem gamla hugtakið og nýja hugtakið eru aðskilin með `->` , `=>` , `→` eða Tab — öll fjögur virka. Línur sem byrja á `#` eru athugasemdir og taka engan þátt í útskiptingu.",
     "Ef þú ert óviss um sniðið skaltu smella á „Fylltu í dæmi“ og breyta því."
    ],
    "img": {
     "file": "glossary-up",
     "alt": "Bæta-við-textaskrám svæðið og hugtakatöfluinntak skiptisíðunnar",
     "cap": "Textaskrár til vinstri, reglur til hægri; ein regla á línu, gamalt hugtak og nýtt hugtak aðskilin með ->"
    }
   },
   {
    "h2": "Hvernig á að skrifa hugtakatöfluna",
    "ps": [
     "Ein regla á línu: núverandi hugtak til vinstri, hvað það ætti að verða til hægri. Til dæmis `Thor -> Donar` skiptir út hverju „Thor“ í skránni fyrir „Donar“.",
     "Athugasemdir byrja á `#` og eru handhægar til að merkja hóp af reglum (til dæmis „# season 1 name fixes“), og til að slökkva tímabundið á reglu — settu bara `#` fyrir framan í stað þess að eyða henni.",
     "Reglur keyra frá efstu línu til neðstu; texti framleiddur af einni reglu er skannaður aftur af reglum fyrir neðan hana. Þegar röð skiptir máli (segjum, skipta út A fyrir B fyrst og síðan B fyrir C), hafðu það í huga."
    ],
    "img": {
     "file": "glossary-table",
     "alt": "Lína á fætur línu af útskiptingarreglum í hugtakatöfluinntaki",
     "cap": "Ein regla á línu; línur sem byrja á # eru athugasemdir og geta slökkt tímabundið á reglu"
    }
   },
   {
    "h2": "Hvað rofarnir þrír gera",
    "ps": [
     "**Umfang**: `all` / `first line only` / `second line only`. Í tvítyngdri skrá skaltu velja „aðeins seinni lína“ þegar þú vilt aðeins breyta þýðingunni; færslur sem eru aðeins með eina línu haldast óhreyfðar undir hvorri einlínu-stillingu sem er — tólið giskar ekki á hvaða hlið er upprunaleg.",
     "**Heilt orð**: skiptir aðeins út hugtökum sem standa ein og sér sem orð, þannig að `art` mun ekki snerta `start`. Fyrir tungumál sem aðskilja ekki orð með bilum, eins og kínversku og japönsku, hefur þessi rofi engin áhrif — útskipting virkar á undirstrengi þar.",
     "**Hástafaviðkvæmni**: óvirkt sjálfgefni, þannig að bæði `CEO` og `ceo` eru skipt út; þegar hakað er við er aðeins skipt út nákvæmlega sömu stafsetningu."
    ],
    "img": {
     "file": "glossary-opt",
     "alt": "Umfang, heilt-orð og hástafaviðkvæmni rofarnir fyrir neðan hugtakatöfluna",
     "cap": "Umfang ákveður hvaða lína breytist; heilt orð og hástafir ákveða hve strangt hugtak er passað"
    }
   },
   {
    "h2": "Hver breyting skráð, hver breyting afturkræf",
    "ps": [
     "„3 Niðurstaða“ sýnir þær textaskrár sem skipt hefur verið út og **skráir einnig hverja breytingu**: hvaða skot, hvaða línu, frá hverju til hvað.",
     "Ef þú vilt ekki eina af þeim skaltu smella á hana á listanum til að afturkalla aðeins þá færslu — engin þörf á að breyta hugtakatöflunni og keyra aftur. Þegar þú ert ánægður skaltu smella á „Niðurhal“ eða „Afrita“."
    ],
    "img": {
     "file": "glossary-out",
     "alt": "Niðurstöðusvæðið með lista yfir stakar breytingar",
     "cap": "Hver breyting er skráð; smelltu á eina sem þú vilt ekki til að afturkalla hana"
    }
   },
   {
    "h2": "Hvað er látið óhreyft",
    "ps": [
     "**Tímalínur, ASS-stíllínur og VTT `NOTE` blokkir eru ekki snertar af einu einasta bókstaf.** Útskipting á aðeins við um samtalsmál, aldrei skipulagslínur.",
     "Hugtakatöflun breytir textaskránni þinni aldrei sjálfkrafa — niðurstaðan er nýtt úttak og uppruninn stendur eins og hann er."
    ]
   },
   {
    "h2": "Algengar spurningar",
    "ps": [
     "**Hvers vegna var hugtaki ekki skipt út?** Athugaðu umfangið fyrst: með „aðeins seinni lína“ valið haldast færslur með aðeins eina línu óhreyfðar. Athugaðu síðan samræmda leit að heilum orðum, sem stöðvar samsvörun sem eru ekki sjálfstæð orð.",
     "**Hvers vegna skiptir kínverska enn út undirstrengjum með heilu-orði valið?** Það er búist við því. Kínverska og japanska aðskilja ekki orð með bilum, þannig að tólið getur ekki ákvarðað orðamörk og heilt-orð leit hefur engin áhrif þar.",
     "**Hvernig afturkalla ég allt eftir mistök?** Afturkallaðu færslur eina af annarri í breytingarlistanum; til að byrja upp á nýtt skaltu hreinsa hugtakatöfluna og bæta textaskrám við aftur.",
     "**Getur ASS-stíllínum verið breytt fyrir slysni?** Nei. Stíllínur og `NOTE` blokkir eru utan gildissviðs; aðeins samtalsmál tekur þátt."
    ]
   },
   {
    "h2": "Persónuvernd",
    "ps": [
     "Textaskrár og hugtakatöflu eru unnar að fullu í vafranum: ekkert er hlaðið upp og ekkert fer í gegnum þjón. Hugtakatöflunni er ekki safnað saman, þannig að hún er tóm næst þegar þú opnar síðuna."
    ]
   },
   {
    "h2": "Tengd tól og leiðbeiningar",
    "ps": [
     "Hvort eigi að byggja upp hugtakatöflu og hvernig eigi að viðhalda henni yfir þáttaröð, sjá [[Hugtakatöflur: halda þáttaröð samræmdri|/guides/subtitle-glossary.html]]; ef innihaldið er óhreint (vatnsmerki, SDH-skot) keyrðu [[Textaskráahreinsun|/clean.html]] fyrst; þegar nöfnin eru frágengin og þig vantar önnur tungumál farðu í [[Textaskrárþýðing|/translate.html]]; og keyrðu niðurstöðuna í gegnum [[Gæðaeftirlit textaskráa|/qc.html]]."
    ]
   }
  ]
 },
 "hanconv": {
  "seo": {
   "title": "Einfölduð–hefðbundin umbreyting textaskráa – Taívan vs Hong Kong – AI-SRTSub",
   "desc": "Myndrænar leiðbeiningar um þrjár stefnur: taívönsk með eða án svæðisbundins orðaforða, Hong Kong sem sitt eigi bragð, allt saman umbreytt aftur í einfaldaða. Aðeins samtalsmál breytist; tímasetningar haldast.",
   "h1": "Hvernig á að umbreyta einfölduðum og hefðbundnum kínverskum textaskrám",
   "intro": "Hvort textaskrá fer til Taívans, Hong Kong eða meginlandsins breytir bæði orðalagi og stafalögun. Níur stefnur til að velja úr, og aðeins samtalsmál er umbreytt — tímasetningar, vísanúmer og ASS-stíllínur eru aldrei snertar.",
   "ctaText": "Opna breytinn"
  },
  "body": [
   {
    "h2": "Hvað þetta tól gerir",
    "ps": [
     "Að umbreyta á milli einfaldaðra og hefðbundinna er ekki bara að skrifa hvern staf á annan hátt. Sama einfaldaða orðið samsvarar mismunandi orðum á mismunandi svæðum — orðið yfir „hugbúnað“ er mismunandi á milli Taívans og meginlandsins, og Hong Kong er með enn aðra útgáfu. Breytirinn heldur þessu í sundur:"
    ]
   },
   {
    "h2": "Hlaða inn og greina",
    "ps": [
     "Dragðu skrá inn eða flettu upp einni — SRT, VTT, ASS og TXT eru studd — eða límdu textaskráartexta beint inn í reitinn. Sniðið er greint sjálfkrafa og sýnt við hlið „Greint snið“."
    ],
    "img": {
     "file": "hanconv-up",
     "alt": "Hlaða-inn svæði breytis: dragsvæði og límingarreitur, með greint snið fyrir ofan",
     "cap": "SRT / VTT / ASS / TXT, snið greint sjálfkrafa"
    }
   },
   {
    "h2": "Að velja á milli níu stefna",
    "ps": [
     "Níur stefnurnar undir „Umbreyta í“ falla í þrjá hópa. **Einfölduð → hefðbundin**: almenn hefðbundin, taívönsk (breyta orðalagi), taívönsk (aðeins letur), Hong Kong. **Hefðbundin → einfölduð**: almenn, frá taívönsku, frá Hong Kong. **Hefðbundin til hefðbundinna**: taívönsk form, Hong Kong form.",
     "Að velja „taívönsk orðalag“ skiptir út svæðisbundnum orðaforða líka: orðið yfir „hugbúnað“ verður það taívönska og svo gerir orðið yfir „upplýsingar“; „taívönsk letur“ breytir aðeins hvernig stafir eru skrifaðir og lætur orðalagið þitt í friði. Hong Kong er annað mál alveg og notar enn annað orð yfir „hugbúnað“. Til að umbreyta aftur í einfaldaða skaltu nota hópinn fyrir neðan — þú verður að segja hvaða hefðbundnu afbrigði þú ert að koma úr, vegna þess að taívanskur og Hong Kong texti fara mismunandi leiðir til baka."
    ],
    "img": {
     "file": "hanconv-dir",
     "alt": "Umbreyta í kort: áfangastaðar fellivalmynd sem sýnir „Einfölduð → taívönsk hefðbundin (breyta orðalagi)“ valið",
     "cap": "Stefnur búa í „Umbreyta í“ fellivalmyndinni í þremur hópum; þessi er taívönsk með orðalagsbreytingum"
    }
   },
   {
    "h2": "Niðurstaða og útflutningur",
    "ps": [
     "Niðurstöðusvæðið sýnir umbreyttu textaskrána strax, með stöðustiku sem gefur upp heildarlínufjölda og hve margar línur breyttust. Ef ekkert breyttist yfir höfuð færðu ábendingu um að skráin gæti innihaldið enga kínverska stafi — aðeins Han-stafir eru umbreyttir, þannig að öll latnesk eða töluleg textaskrá heldur sér nákvæmlega eins og hún var.",
     "Halaðu síðan niður eða afritaðu. Tungumálatag er sett inn í skráarnafnið — `demo.srt` verður `demo.zh-TW.srt` fyrir taívönska hefðbundna, `.zh-Hant` fyrir almenna hefðbundna, og `.zh-Hans` þegar umbreytt er aftur í einfaldaða."
    ],
    "img": {
     "file": "hanconv-out",
     "alt": "Niðurstöðusvæði: umbreytt textaskrá og stöðustika",
     "cap": "Stöðustikan sýnir heildarlínu- og breyttan línufjölda; halaðu niður eða afritaðu þaðan"
    }
   },
   {
    "h2": "Hvað er aldrei snert",
    "ps": [
     "Aðeins samtalsmál er umbreytt. Tímasetningar, vísanúmer og ASS-stíllínur eru ekki snertar yfir höfuð — niðurstaðan er tilbúin tilnotkunar án þess að endurgera neina sniðfærslu."
    ]
   },
   {
    "h2": "Algengar spurningar",
    "ps": [
     "**Hvers vegna breytti breytirinn ekki orðinu yfir „hreint“?** Eitt-til-mörg vörpun eru leyst eftir orði: „hreint“ merkingin og „þurrt“ merkingin deila einu hefðbundnu formi, á meðan „trjábols“ merkingin notar aðra. Töflurnar koma frá OpenCC, og passa við heilar setningar frekar en staka stafi.",
     "**Hver er munurinn á taívönskum og Hong Kong hefðbundnum?** Orðaforðinn: orðið yfir „hugbúnað“ er mismunandi á milli þeirra tveggja. Veldu stefnuna fyrir svæðið sem þú ert að skila til.",
     "**Stafafjöldinn breyttist eftir umbreytingu?** Aðeins Han-stafir eru skiptir út — engar færslur eru bættar við eða teknar burt og engri tímasetningu er hreyft. Ef línufjöldinn breyttist skaltu athuga hvort sniðið hafi greinst réttilega.",
     "**Mistókst að hlaða orðabókinni?** Síðan segir þér að endurnýja og reyna aftur. Hún hleðst staðbundið inn, þannig að það þarf ekki að hlaða textaskrám upp neins staðar."
    ]
   },
   {
    "h2": "Persónuvernd",
    "ps": [
     "Umbreyting keyrir að fullu í vafra þínum. Ekkert efni textaskráa er nokkurn tíma sent á þjón."
    ]
   },
   {
    "h2": "Tengd tól og leiðbeiningar",
    "ps": [
     "Ef allt sem þig vantar er einfaldað í hefðbundið, sjá [[Umbreyta einfaldaðri textaskrá í hefðbundna|/guides/srt-simplified-to-traditional.html]]; hvers vegna þetta snýst um meira en að skipta út stöfum, sjá [[Einfaldað vs hefðbundið er ekki stafaútskipting|/guides/simplified-traditional-chinese.html]]; til að þýða yfir á annað tungumál, [[Textaskrárþýðing|/translate.html]]."
    ]
   }
  ]
 },
 "how-to-make-lrc-file": {
  "seo": {
   "title": "Hvernig á að samstilla LRC texta – Ein lína í einu, bankað á taxtann – AI-SRTSub",
   "desc": "Búa til LRC-skrá frá grunni: líma inn einn texta á línu, banka á tímanum á meðan þú hlustar, flýtileiðirnar sem máli skipta, hvenær á að sleppa línu, LRC eða SRT, og hvað skal gera þegar tímasetning reikar.",
   "h1": "Hvernig á að samstilla LRC texta",
   "intro": "LRC-skrá er bara „ein textalína ásamt einum tímapunkti“. Að búa til eina svoleiðis kallast tímasetning: að ná því augnabliki sem hver lína byrjar.",
   "ctaText": "Opna textasamstillingartækið"
  },
  "body": [
   {
    "h2": "Hvað tímasetning er í raun og veru",
    "ps": [
     "Uppbygging LRC-skrár gæti varla verið einfaldari: einn texti á línu, hver á undan `[mm:ss.xx]` tímatagi. Þegar spilari nær í línu sýnir hann þann texta á því augnabliki.",
     "Þannig að allt starfið við að „búa til LRC“ felst í því að úthluta tímapunkti á hverja textalínu — og engin vél getur gert það fyrir þig, því það þarf að hlusta til að ákveða hvar lína byrjar að vera sungin."
    ]
   },
   {
    "h2": "Hve margar umferðir lag þarf",
    "ps": [
     "Það borgar sig að hugsa málið í eina mínútu áður en þú byrjar; það sparar mest af endurvinnunni:"
    ],
    "img": {
     "file": "lrc-tap2",
     "alt": "Spilunar-, stimpla-þessa-línu-, afturkalla-eina-línu- og sleppa-þessari-línu-stýringarnar á banksvæðinu",
     "cap": "Ýta á Enter á meðan spilun stendur yfir er það mýksta; stimplað rangri línu? Ýttu á Z og stimplaðu aftur"
    }
   },
   {
    "h2": "Innlíming textans ákveður hve mjúklega afgangurinn gengur",
    "ps": [
     "Límdu textana einn á línu; auðum línum er sleppt. Línuskilin sem þú límir eru línurnar sem þú tímasetur síðar — skiptu þeim í fleiri línur núna og þú munt banka oftar síðar.",
     "Það virkar líka að líma inn fyrirliggjandi LRC: tímamerkin `[mm:ss.xx]` þess eru þekkt og eftir innflutning **heldurðu áfram frá fyrstu línunni án tíma**, þannig að ekki þarf að endurgera línur sem þegar eru tímasettar.",
     "Það þýðir að hægt er að vista hálfgerða LRC og líma hana til baka síðar til að halda áfram."
    ],
    "img": {
     "file": "lrc-paste2",
     "alt": "Textainnlímingarsvæðið og greiningartakkinn",
     "cap": "Ein lína á texta; að líma heila LRC les fyrirliggjandi tíma svo þú getir haldið áfram"
    }
   },
   {
    "h2": "Flytja út LRC eða SRT",
    "ps": [
     "**Fyrir tónlistarspilara, flytja út LRC.** foobar2000, alls konar spilarar og tæki með textaskjá lesa það.",
     "**Til að setja texta á myndband eða vinna þá lengra skaltu flytja út SRT.** Myndbandatextabrautir, textatæki og klippihugbúnaður lesa SRT. Við útflutning varir hver lína þar til næsta byrjar, og síðasta línan fellur aftur í 2 sekúndur.",
     "Báðir flytja aðeins út línur sem hafa tíma — línum sem sleppt er er aldrei hlaðið inn í skrána."
    ],
    "img": {
     "file": "lrc-export",
     "alt": "Niðurhal-LRC-, niðurhal-SRT- og afritunartakkarnir á útflutningssvæðinu",
     "cap": "LRC fyrir spilara, SRT fyrir myndband; aðeins línur með tíma eru fluttar út"
    }
   },
   {
    "h2": "Nokkrir hlutir sem auðvelt er að fara rangt með",
    "ps": [
     "**Allt aðeins úr lagi eftir tímasetningu? Notaðu hliðrun.** Flyttu út SRT og hliðraðu því í heild sinni með [[Tímalínustilling|/shift.html]]; mun hraðar en að endurtímasetja línu fyrir línu.",
     "**Reikið vex eftir því sem lagið líður? Það er vandamál með hraða.** Þegar spilunarhraði og upptökuhraði eru mismunandi vex villan í átt að endanum, og það þarf hlutfallslega skölun, en ekki hliðrun.",
     "**Flýtileiðir virka bara eðlilega ef þú notar þær saman.** Bil spilar og gerir hlé, Enter stimplar núverandi línu, Z afturkallar eina línu — ýttu beint á Enter á meðan spilun stendur í stað þess að skipta á milli músar og lyklaborðs.",
     "**Hljóðgæði hafa áhrif á nákvæmni.** Heimild með skýrum söng er auðveldari að fylgja eftir; tónleikaupptökur og heimildir með háværum undirleik eru áberandi erfiðari."
    ]
   },
   {
    "h2": "Tengd tæki og handbækur",
    "ps": [
     "Fyrir alla leiðsögnina sjá [[Hvernig á að nota textasamstillingartækið|/guides/lrc.html]]; til að breyta fyrirliggjandi LRC í undirtexta sjá [[LRC í SRT|/guides/lrc-to-srt.html]]; ef útflutt SRT er rangt tímasett notaðu [[Tímalínustilling|/shift.html]]; og keyrðu niðurstöðuna í gegnum [[Textagæðaeftirlit|/qc.html]]."
    ]
   }
  ]
 },
 "lrc": {
  "seo": {
   "title": "Textasamstillingartæki – Hlaða inn lagi, líma texta, banka með – AI-SRTSub",
   "desc": "Hlaða inn lagi, líma textann, banka á tímarstimpli á línu þegar þú hlustar, og flytja út LRC eða SRT. Bil spilar og gerir hlé, Enter stimplar línuna, Z afturkallar, hendur haldast á lyklaborðinu.",
   "h1": "Hvernig á að nota textasamstillingartækið",
   "intro": "Hlaða inn lagi, líma textann, banka á tímarstimpli fyrir hverja línu þegar þú hlustar, og flytja út staðlaða LRC eða SRT. Hljóðspilunin fer fram staðbundið og er aldrei hlaðið upp.",
   "ctaText": "Opna textasamstillingartækið"
  },
  "body": [
   {
    "h2": "Hvað þetta tæki gerir",
    "ps": [
     "Gefðu lagi textaskrá sem hægt er að syngja með: ein lína á texta, hver lína með tímapunkti. Spilarar lesa LRC, textabrautir lesa SRT, og hægt er að flytja hvort tveggja út hér."
    ]
   },
   {
    "h2": "1 Hlaða inn laginu",
    "ps": [
     "Fyrsti dálkurinn vinstra megin tekur við hljóðskrá: **MP3, M4A, FLAC, WAV og OGG** virka öll. Hljóðið spilast staðbundið og er aldrei hlaðið upp.",
     "Hljóðgæði hafa ekki áhrif á tímasetningarnákvæmni, en heimild með skýrum söng er auðveldari að fylgja eftir; tónleikaupptökur og heimildir með háværum undirleik eru áberandi erfiðari að samstilla."
    ],
    "img": {
     "file": "lrc-up",
     "alt": "Innheimtuskráarsvæði textasamstillingartækis",
     "cap": "MP3 / M4A / FLAC / WAV / OGG virka öll, og hljóðið spilast aðeins staðbundið"
    }
   },
   {
    "h2": "2 Líma inn textann",
    "ps": [
     "Límdu textann í annan dálkinn, **eina línu á texta**; auðum línum er sleppt sjálfkrafa. Smelltu síðan á „Greina texta“.",
     "Að líma inn fyrirliggjandi LRC virkar líka — `[mm:ss.xx]` tímatög þess eru þekkt, og eftir innflutning heldurðu áfram frá fyrstu línu án tíma, þannig að línur sem þegar eru tímasettar þurfa ekki að vera gerðar upp á nýtt."
    ],
    "img": {
     "file": "lrc-paste",
     "alt": "Textainnlímingarsvæðið og greiningartakkinn",
     "cap": "Límdu eina línu á texta, eða límdu inn alla LRC og láttu tækið lesa fyrirliggjandi tíma"
    }
   },
   {
    "h2": "3 Banka með á meðan þú hlustar",
    "ps": [
     "Spilaðu lagið og ýttu á Enter á því augnabliki sem lína byrjar (eða smelltu á „Stimpla þessa línu“); tíminn fyrir þá línu er skráður og bendillinn stökkvar á þá næstu.",
     "Flýtileiðir: **bil** spilar og gerir hlé, **Enter** stimplar núverandi línu, **Z** afturkallar eina línu. Að ýta á Enter á meðan spilun stendur er mýksta leiðin til að vinna — engin skipting fram og til baka á milli músar og lyklaborðs.",
     "Stimplað rangri línu? Ýttu á Z til að afturkalla hana og stimpla aftur. Ef þú vilt ekki stimpla línu yfirleitt (hljóðfærabrot, eingöngu hljóðfærakafli), smelltu á „Sleppa þessari línu“ og hún birtist ekki í útflutningi."
    ],
    "img": {
     "file": "lrc-tap",
     "alt": "Spilunar-, stimpla-þessa-línu-, afturkalla-eina-línu- og sleppa-þessari-línu-stýringarnar á banksvæðinu",
     "cap": "Bil spilar og gerir hlé, Enter stimplar núverandi línu, Z afturkallar — hendur haldast á lyklaborðinu"
    }
   },
   {
    "h2": "4 Útflutningur",
    "ps": [
     "Fjórði dálkurinn sér um útflutninginn: **Sækja LRC** fyrir spilara, **Sækja SRT** fyrir myndbandatextabrautir, eða „Afrita“ til að taka textann beint.",
     "Aðeins línur með tíma eru fluttar út; línum sem sleppt er er aldrei hlaðið inn í skrána. Í SRT-útflutningi varir hver lína þar til næsta byrjar, og síðasta línan fellur aftur í 2 sekúndur."
    ],
    "img": {
     "file": "lrc-out",
     "alt": "Niðurhal-LRC-, niðurhal-SRT- og afritunartakkarnir á útflutningssvæðinu",
     "cap": "LRC fyrir spilara, SRT fyrir myndband; aðeins línur með tíma eru fluttar út"
    }
   },
   {
    "h2": "Hvað er látið óhreyft",
    "ps": [
     "Textinn er ekki endurskrifaður. Tímasetning bætir aðeins við einum tímapunkti á línu og snertir aldrei orðin sem þú límir inn.",
     "Þegar þú flytur inn fyrirliggjandi LRC halda línur sem þegar eru með tímatagi sínum upprunalegum tíma og þú stimplar aðeins frá fyrstu ótímasettu línu og áfram."
    ]
   },
   {
    "h2": "Algengar spurningar",
    "ps": [
     "**Af hverju vantar sumar línur úr útflutningi?** Línum sem sleppt er og línum án tíma er aldrei hlaðið inn í skrána. Farðu aftur í skref þrjú og bættu þeim við, eða staðfestu að þeim hafi verið ætlað að sleppa.",
     "**Hægt að breyta tímunum eftir á?** Ef þú vilt hliðra öllu smávegis eftir stimplun, flytdu út SRT og notaðu [[Tímalínustilling|/shift.html]] til að hliðra eða skala það í heild sinni.",
     "**LRC eða SRT — hvort ætti ég að flytja út?** LRC fyrir tónlistarspilara (foobar2000, streymisforrit, alls kyns spilara); SRT þegar textarnir þurfa að vera á myndbandi eða unniðir frekar með textatækjum.",
     "**Hversu langan tíma tekur eitt lag?** Það fer eftir því hve margar línur eru og hve nákvæmur þú vilt vera. Fyrir lag með þrjátíu eða fjörutíu línum, nokkrar mínútur á umferð þegar þú þekkir flæðið; að elta orðanákvæmni tekur lengri tíma."
    ]
   },
   {
    "h2": "Persónuvernd",
    "ps": [
     "Hljóð og textar eru unnin að fullu í vafra: engu er hlaðið upp og ekkert fer í gegnum netþjón. Hljóðið er afkóðað og spilað aðeins staðbundið."
    ]
   },
   {
    "h2": "Tengd tæki og handbækur",
    "ps": [
     "Ef þú átt þegar LRC og vilt undirtexta sjá [[LRC í SRT|/guides/lrc-to-srt.html]]; fyrir hugsunina og gildrurnar á bak við tímasetningu sjá [[Hvernig á að samstilla LRC texta|/guides/how-to-make-lrc-file.html]]; ef útflutt SRT er skakkt notaðu [[Tímalínustilling|/shift.html]]; og keyrðu niðurstöðuna í gegnum [[Textagæðaeftirlit|/qc.html]]."
    ]
   }
  ]
 },
 "lrc-to-srt": {
  "seo": {
   "title": "LRC í SRT breytir – Umbreyttu textum í undirtexta – AI-SRTSub",
   "desc": "Umbreyttu LRC textum í SRT undirtexta: hver lína varir þar til næsta byrjar, síðasta stefið fær 3 sekúndur. Lög eldri en 60 mínútur lesast rétt. Keyrir í vafranum þínum.",
   "h1": "LRC í SRT",
   "intro": "Umbreyttu LRC textaskrám í SRT: slepptu skránni, veldu SRT, sæktu. Lokatímar eru fylltir inn sjálfkrafa úr næstu línu.",
   "ctaText": "Umbreyta LRC → SRT"
  },
  "body": [
   {
    "h2": "Hvernig LRC er frábrugðið SRT",
    "ps": [
     "LRC er textasnið: hver lína ber aðeins „byrja að syngja“-tíma í `[minutes:seconds.cents]` og **engan endatíma**; hvert SRT stef þarf bæði byrjun og enda. Þannig að kjarni umbreytingarinnar er að fylla inn endatímana."
    ],
    "img": {
     "file": "convert-upload-lrc",
     "alt": "Upphleðslusvæði: LRC-skrá hlaðið inn, greind sem LRC",
     "cap": "Textaskrá með [00:12.50] tímamerkjum er greind sem LRC strax"
    }
   },
   {
    "h2": "Hvernig endatímar eru fylltir inn",
    "ps": [
     "Reglan er einföld: **hver lína varir þar til næsta byrjar**; lokasíðan hefur engan „næsta“, svo hún fær 3 sekúndur. Einnig bera LRC tímamerki aðeins mínútur og sekúndur — engar klukkustundir — og mínútureiturinn flyst ekki yfir (62:05 þýðir 1 klst 2 mín 5 sek), þannig að auka löng lög eins og DJ-blöndur lesast rétt."
    ]
   },
   {
    "h2": "Hvernig á að umbreyta",
    "ps": [
     "Opnaðu [[breytirinn|/convert.html]], slepptu LRC-skránni í, veldu **SRT - SubRip** sem úttak, umbreyttu síðan og sæktu. Handhægt fyrir tónlistarmyndbönd og til að setja texta upp sem undirtexta í spilurum; hægt er að umbreyta útfluttu SRT aftur í VTT fyrir vefinn."
    ]
   }
  ]
 },
 "make-bilingual-subtitles": {
  "seo": {
   "title": "Tvær leiðir til að búa til tvítyngda undirtexta – AI-SRTSub",
   "desc": "Tvítyngdir undirtextar koma í tveimur formum: tvær línur í einu stefi, eða tvö stef á sömu tímalínu. Kostir, gallar og hvernig á að skipta á milli þeirra. – AI-SRTSub",
   "h1": "Tvær leiðir til að búa til tvítyngda undirtexta",
   "intro": "Sami tvítyngdi undirtextinn getur falið tvö algjörlega ólík útlit. Lærðu að greina þau í sundur, og gerð, skipting og umbreyting hætta að flækja fyrir þér.",
   "ctaText": "Vinna með tvítyngda undirtexta"
  },
  "body": [
   {
    "h2": "Hvernigformin tvö líta út",
    "ps": [
     "**Form B: tvö stef á sömu tímalínu.** Ein lína af samtali verður að tveimur aðskildum undirtextastefum með nákvæmlega sömu tímasetningu — ein ensk, ein kínversk — dregnar staflað ofan á hvor aðra. Þetta er algengasta leiðin til að byggja upp tvítyngda ASS-undirtexta."
    ]
   },
   {
    "h2": "Hvar hvort um sig skortir",
    "ps": [
     "Veiki punktur Form A er **greining**: að skipta um lög reiðir sig á ritkerfið, þannig að kínversk-enskar eða japönsk-enskar pör skiljast að í fljótu bragði, en **samsetningar sem deila einu letri** — enska plús franska, eða kínverska plús japönsk kanji — er ekki hægt að greina í sundur. Veiki punktur Form B er **framleiðsla**: tímalínurnar tvær verða að passa nákvæmlega saman og að stilla þær í höndunum er þreytandi; sumir spilarar draga einnig bæði stef á sömu tímalínu, sem þrengir skjáinn. Þumalfingursregla: notaðu Form A fyrir tilbúna undirtexta sem ætlaðir eru áhorfendum; notaðu Form B þegar þú þarft að draga lögin í sundur til frekari vinnu."
    ]
   },
   {
    "h2": "Leiðirnar tvær",
    "ps": [
     "**Byggja tvítyngda undirtexta frá upprunalegu**: notaðu [[AI Undirtextaþýðing|/translate.html]] og veldu „Tvítyngt · upprunalegt efst“ eða „Tvítyngt · þýðing efst“ við útflutning — þú færð Form A beint; að velja ASS býður einnig upp á tvö útlit, „staflað ofan og neðst“ og „tvær línur neðst“.",
     "**Sameina tvö lög eða umbreyta á milli forma**: notaðu [[Tvítyngdur undirtextastrippari|/bilingual.html]] og stillinguna „sameina í eina tveggja línu færslu“ — Form B inn, Form A út; að fara hina leiðina, „skipta í tvær skrár“ tekur Form A eða B inn og skilar tveimur sjálfstæðum lögum út."
    ],
    "img": {
     "file": "bilingual-modes",
     "alt": "Fjórar stillingar tvítyngdu stripparans; „sameina í eina tveggja línu færslu“ sameinar tvö stef sem deila tímalínu",
     "cap": "„Sameina í eina tveggja línu færslu“: Form B verður að Formi A"
    }
   },
   {
    "h2": "Hvaða tæki mun spila það",
    "ps": [
     "Vefspilarar (HTML5 `<track>`) og flestir farsímaspilarar meðhöndla Form A áreiðanlegar; borðtölvuspilarar (VLC, mpv, PotPlayer) taka við báðum og geta jafnvel gefið stefjunum á sömu tímalínu mismunandi liti og staðsetningar. Þegar vafa leikur á, fluttu út Form A sem SRT — það fer best. Fyrir mismuninn á sniðunum sjálfum, sjá [[SRT, VTT eða ASS: Hvað ættirðu að nota|/guides/subtitle-format-comparison.html]]."
    ],
    "img": {
     "file": "translate-export",
     "alt": "Tvítyngdu stílmöguleikarnir í útflutningsvalmynd þýðingartækisins",
     "cap": "Veldu röð tvítyngdra lína beint við útflutning — eitt skref og það er komið"
    }
   },
   {
    "h2": "Algengar spurningar",
    "ps": [
     "**Tvítyngdir undirtextar líta út fyrir að vera þröngir — hvað get ég gert?** Stjórnaðu línuvíddinni: útflutningsvalmynd þýðingartækisins er með „tvítyngd línuvídd“ stillingu; þrengri lína þýðir færri stafi í stef og hreinni skjá.",
     "**Ég vil bara eitt lag.** „Aðeins halda upprunalegu / aðeins halda þýðingu“ stripparans leysir það með einum smelli, sjá [[Skipta tvítyngdum undirtextum í tvö lög|/guides/split-bilingual-subtitles.html]]."
    ]
   }
  ]
 },
 "merge": {
  "seo": {
   "title": "Sameina tvítyngda og stílaða undirtexta – Sameina, stíla, flytja út – AI-SRTSub",
   "desc": "Sameina tvær undirtextaskrár í tvítyngda braut, stíla fyrirliggjandi tvítyngda skrá, eða stíla einstakt tungumál: pörunarstillingar, ASS- og VTT-sniðmát, og hvaða snið á að flytja út.",
   "h1": "Hvernig á að nota tvítyngda samruna og séraðgerða undirtexta",
   "intro": "Sameina tvær undirtextaskrár í eina tvítyngda braut, eða stíla undirtexta beint: letur, litur, útlína og staðsetning eru það sem þú sérð er það sem þú færð, og forskoðunin passar við útflutninginn.",
   "ctaText": "Opna séraðgerða undirtextatækið"
  },
  "body": [
   {
    "h2": "Hvað þetta tæki gerir",
    "ps": [
     "Þessi eina síða nær yfir þrjú störf: að sameina upprunalega og þýdda undirtextaskrá í eina tvítyngda skrá, stilla röð og stíl á skrá sem er þegar tvítyngd, og bæta sérstökum áhrifum við einmála skrá. Öll þrjú deila sömu stílfæribreytum og sömu forskoðun."
    ]
   },
   {
    "h2": "Þrjú störf, ein síða",
    "ps": [
     "Efst á síðunni eru þrír flipar: **Sameina tvær skrár**, **Stilla tvítyngda skrá**, **Einstaks tungumáls skrá**. Val þitt ákveður hve margir inntaksdálkar birtast vinstra megin.",
     "Þegar tvær skrár eru sameinaðar heldur vinstri hliðin tveimur dálkum, „1 Upprunalegir undirtextar“ og „2 Þýddir undirtextar“; hvor um sig tekur við hlaðinni skrá eða texta límdum beint inn. Stilling tvítyngdrar skráar og stílfærsla einmála skráar þurfa aðeins einn dálk hvor."
    ],
    "img": {
     "file": "merge-mode",
     "alt": "Þrír flipar efst á séraðgerða undirtextatækinu og inntakssvæðið vinstra megin",
     "cap": "Þrír flipar efst; að velja „Sameina tvær skrár“ birtir upprunalegan og þýddan dálk vinstra megin"
    }
   },
   {
    "h2": "Hvernig tvær skrár eru paraðar",
    "ps": [
     "Fyrsti hluturinn undir „3 Samrunastillingar“ er pörunarstillingin: **Para eftir röð · nota upprunalega tímalínu**, **Para eftir tímalínu · nota upprunalega tímalínu**, **Para eftir röð · nota þýddu tímalínuna**.",
     "Þegar báðar skrárnar eru með sama fjölda færslna í sameiginlegri röð er pörun eftir röð sú öruggasta. Þegar fjöldinn er mismunandi (önnur hliðin sameinaði færslur, hin skipti þeim), paraðu eftir tímalínu og láttu tækið passa saman eftir nálægð. Hvaða tímalínu á að nota fer eftir því hvort skráin er nákvæmari — venjulega sú upprunalega.",
     "Fyrir neðan það eru textabyggingin (sjálfvirk greining / tvær línur á færslu / skiptispar) og röðin (upprunalegt efst / þýðing efst)."
    ],
    "img": {
     "file": "merge-pair",
     "alt": "Pörunarstilling, textabygging og raðmöguleikar undir samrunastillingum",
     "cap": "Pörunarstillingin ákveður hvaða lína fer með hverriri, og hvaða tímalínu á að nota er stillt hér líka"
    }
   },
   {
    "h2": "Stilla stílinn hlut fyrir hlut",
    "ps": [
     "Stílaportið situr hægra megin. Þegar þú flytur út ASS gildir „ASS útlit“-blokkin: útlit (skipt · aðskilið efst og neðst / staflað · tvær línur neðst), stærð, litur, gagnsæi, letur, feitletrað, skáletrað, stafabil, útlína, útlínulitur, skuggi/bakgrunnur (enginn / skuggi / bakgrunnur), dýpt, jaðarlitur, jaðargagnsæi, lárétt jöfnun (neðst · vinstri / neðst · miðja / neðst · hægri) og fjarlægð frá botni þýðingar (aðal) línu, auk leturs, skugga/bakgrunns og vinstri/hægri spássía upprunalegu (auka) línunnar.",
     "Þegar þú flytur út tvítyngda VTT stílfærslu gildir „WebVTT style“-blokkin: til viðbótar við sex forstillingar (stöðluð / þétt / kvikmyndaleg / efst / aðgengileg / portrett) geturðu breytt lóðréttu línunni, festingunni (neðst / efst / miðja), láréttri staðsetningu, víddastærð, jöfnunargildi og línuhæð alls stefsins, auk bakgrunnslits, bakgrunnsgagnsæis og útlínubreiddar þýðingarlínunnar; upprunalega línan getur erft aðalstílinn eða verið stillt sérstaklega.",
     "Þegar þú ert búinn geturðu vistað niðurstöðuna sem forstillingu og endurnýtt hana síðar með því að velja hana undir „Frá vistuðum forstillingum“ og smella á „Virkja“."
    ],
    "img": {
     "file": "merge-style",
     "alt": "Færibreytur ASS útlitssvæðisins hægra megin",
     "cap": "Stærð, litur, útlína, skuggi/bakgrunnur og jöfnun eru öll breytileg, og niðurstöðuna er hægt að vista sem forstillingu"
    }
   },
   {
    "h2": "Athugaðu forskoðun áður en þú flytur út",
    "ps": [
     "„Samrunaforskoðun“ er tafla: #, tími, upprunalegt, þýðing, still. Sláinn fyrir ofan síar grunsamlegar raðir eftir „er með hljóðbrellur“, „er með hátalaraforskeyti“, „styttra en 1 sekúndu“, „fleiri en tvær línur“ og „lestrarhraði fór yfir“, eða eftir leitarorði sem þú skrifar.",
     "Að smella á stílreit raðar stækkar ritil þess reits og sýnir aðeins raðirnar sem nota hann; „Hreinsa allar yfirskrifanir“ skilar hverri handvirkri yfirskrifun í sniðmátið. Tímalínustillingarsvæðið fyrir neðan sér um alþjóðlega hliðrun (frá tilteknu stefi) og hlutfallslega skölun.",
     "Þegar það lítur vel út skaltu fara í „4 Útflutningur“: sækja undirtextaskrána eða afrita innihald hennar."
    ],
    "img": {
     "file": "merge-preview",
     "alt": "Samrunaforskoðunartaflan og síuslá hennar",
     "cap": "Forskoðunin er útflutningurinn; síðuðu grunsamlegar raðir eftir tegund eða stækkaðu stakan stílreit"
    }
   },
   {
    "h2": "Hvað er látið óhreyft",
    "ps": [
     "Stílfærsla breytir aðeins útliti, aldrei samtali. Texti upprunalegu og þýðingar er ekki breytt um einn staf við samrunann; nema þú breytir því vísvitandi á stillingarsvæðinu fyrir neðan forskoðunina kemur tímalínan úr skránni sem þú valdir.",
     "Þegar þú flytur út SRT eða „VTT án stílfærslu“ er engum stílaupplýsingum skrifað inn í skrána — síðan segir þér að VTT sé ekki með STYLE-blokk og spilarinn muni nota sjálfgefið útlit sitt. Ef þú vilt stílfærslu skaltu velja tvítyngda VTT stílfærslu eða ASS."
    ]
   },
   {
    "h2": "Algengar spurningar",
    "ps": [
     "**Hvað ef skrárnar tvjár eru með mismunandi færslufjölda?** Notaðu „Para eftir tímalínu“ og tækið passar saman eftir nálægð; færslum sem það getur ekki passað saman er ekki fundið upp.",
     "**Hvað ef spilari hunsar stílfærsluna í útfluttu ASS?** Stílarnir eru geymdir inni í skránni, en stuðningur spilara við ASS er breytilegur. Ef þú þarft flytjanlegra útlit skaltu flytja út tvítyngda VTT stílfærslu.",
     "**Hvernig kemst ég aftur í upphaflega sniðmátið eftir að hafa ruglað því?** „Endurheimta sjálfgefnar breytur“ í ASS-blokkinni og „Endurheimta sniðmáts sjálfgefin gildi“ í VTT-blokkinni endurstilla hvor sína deild.",
     "**Hvað eru sjö raðirnar í sýnishorninu?** Þær eru innbyggt dæmi, aðeins þar til þú sjáir hvernig samruni lítur út; sýnishorninu er ekki hægt að flytja út. Hlaðið upp eigin undirtextum og smelltu á samrunaforskoðun og þær skiptast út sjálfkrafa."
    ]
   },
   {
    "h2": "Persónuvernd",
    "ps": [
     "Undirtextar eru unnir að fullu í vafra: engu er hlaðið upp og ekkert fer í gegnum netþjón. Lokaðu vafranum og allt úr þeirri lotu er farið."
    ]
   },
   {
    "h2": "Tengd tæki og handbækur",
    "ps": [
     "Til að skipta tvítyngdri skrá aftur í tvö lög skal nota [[Tvítyngd skipting|/bilingual.html]]; til að fara hina leiðina og breyta einu tungumáli í tvítyngda skrá sjá [[Tvær leiðir til að búa til tvítyngda undirtexta|/guides/make-bilingual-subtitles.html]]; keyrðu niðurstöðuna í gegnum [[Textagæðaeftirlit|/qc.html]]; fyrir allt tímabil í einu skal nota [[Lotubreyting|/batch.html]]."
    ]
   }
  ]
 },
 "qc": {
  "seo": {
   "title": "Hvernig á að nota textagæðaeftirlit – Tímalínu- og útlitsathugun – AI-SRTSub",
   "desc": "Textagæðaeftirlit: 17 reglur grípa skörun, línuvídd, lestrarhraða og greinarmerki, þröskuldar á hverja 27 tungumál. Helmingur eru eins-smells lagfæringar; sæktu skýrsluna.",
   "h1": "Hvernig á að nota textagæðaeftirlit",
   "intro": "Áður en þú afhendir undirtexta skaltu keyra þá í gegnum gæðaeftirlitssíðuna fyrir tímasetningu og útlit: hvað er athugað, hvernig á að lesa skýrsluna, og hvaða vandamál er hægt að laga með einum smelli — allt fjallað um hér.",
   "ctaText": "Opna textagæðaeftirlit"
  },
  "body": [
   {
    "h2": "Hvað þetta tæki er gert fyrir",
    "ps": [
     "Undirtextar sem líta vel út fyrir beru auga reynast oft vera með skarandi tímalínur, of breiðar línur, eða of háan lestrarhraða þegar þeir hafa verið afhentir. Gæðaeftirlitssíðan listar þessi vandamál upp eitt af öðru:"
    ]
   },
   {
    "h2": "Veldu tungumálsreglur fyrst",
    "ps": [
     "Undir „Athuga eftir reglum hvaða tungumáls“ stillir þú fimm þröskulda: **hámarks einnar línu vídd** (42 hálf-víddar einingar fyrir landslagsmynd sjálfkrafa, 36 fyrir ferning, 28 fyrir portrett), **lestrarhraðamörk** (18 víddar-einingar á sekúndu fyrir kínversku, japönsku og kóresku, 20 fyrir önnur tungumál), 833 millisekúndur lágmarkslengd**, 7000 millisekúndur hámarkslengd**, og **að hámarki 2 línur**. Stilltu tungumál undirtexta á sjálfvirka greiningu eða veldu eitt af 27 handvirkt; skjástefna breytir aðeins línuvíddarþrepinu — lestrarhraði, lengdir og línufjöldi haldast eins og þau eru. Hálfvíddar einingar eru sameiginlegi mælikvarðinn: einn hanzi telur sem 2, einn latneskur stafur sem 1 — línuvídd 42 jafngildir 21 hanzi eða 42 stöfum."
    ],
    "img": {
     "file": "qc-rules",
     "alt": "Gæðaeftirlitsstillingar: fimm inntaksreitir fyrir þröskulda auk fellivalmynda fyrir tungumál undirtexta og skjástefnu",
     "cap": "Fimm þröskuldar + tungumál + stefna; sjálfgefin gildi passa við algengar iðnaðarvenjur"
    }
   },
   {
    "h2": "Að lesa skýrsluna",
    "ps": [
     "17 reglna skýrslan tilkynnir niðurstöður á þremur stigum: **villur** (ruglaður texti, tímasnið, endar fyrr en byrjar, brotin númerun), **aðvaranir** (auðar færslur, skörun, of stuttar eða of langar lengdir, lestrarhraði yfir mörkum, of breiðar línur, fleiri en tvær línur), og **ábendingar** (línuskilastaðsetning, bil í upphafi eða enda, vantar bil, greinarmerkjanorm, og fleira). Hver niðurstaða ber færslunúmerið og „mæld X, þröskuldur Y“-smáatriði, og hægt er að síu listann eftir stigi. Tvítyngdar færslur fá undanþágur: bæði form eru sjálfkrafa greind, skörunarathuganir veita öllu parinu undanþágu og lestrarhraði telur aðeins línuna skrifaða á marktungumálinu."
    ],
    "img": {
     "file": "qc-report",
     "alt": "Gæðaeftirlitssvæði: niðurstöður flokkaðar eftir villu, aðvörun og ábendingu, hver með færslunúmeri og mældu gildi",
     "cap": "Þriggja stiga skýrsla: hver niðurstaða ber færslunúmer sitt og mæld/þröskuldsgildi"
    }
   },
   {
    "h2": "Að laga og flytja út",
    "ps": [
     "„Laga og flytja út“-kortið listar aðeins upp **sjálfkrafa lagfæranlega** hluti: endurumbúðir, fjarlæging auðra færslna, viðbót vantar bila, skipti á greinarmerkjum eftir tungumálsnormum, endurnúmerun — allt sem skilur tímasetninguna óhreyfða er hakað við sjálfkrafa; **hlutir sem breyta tímasetningu** (skipta á upphafi og enda, hliðra skörunum, klippa eða teygja lengdir) eru óhakaðir sjálfkrafa — hakaðu við þá eftir að hafa athugað áhrifin sjálfur. Smelltu á „Virkja lagfæringar“ og ný athugun keyrir sjálfkrafa; telurinn telur aðeins það sem raunverulega var lagað — línum sem ekki var hægt að umbúða upp á nýtt er ekki hækkað í tölunum. **Lestrarhraði yfir mörkum hefur enga sjálfvirka lagfæringu**: vélin getur ekki vitað hvaða orð á að klippa, þannig að þýðingin verður að vera stytt í höndunum eða tímasetningin stillt. Eftir lagfæringu skal flytja út SRT eða VTT, eða smella á „Sækja skýrslu“ til að vista hreina texta `.qc.txt` skýrslu."
    ],
    "img": {
     "file": "qc-fix",
     "alt": "Lagfæringarkortið: gátreitir fyrir sjálfkrafa lagfæranlega hluti og Virkja lagfæringar-takkann",
     "cap": "Aðeins sjálfkrafa lagfæranlegir hlutir fara á listann; lagfæringar sem breyta tímasetningu eru óhakaðar sjálfkrafa"
    }
   },
   {
    "h2": "Algengar spurningar",
    "ps": [
     "**Af hverju er ekki hægt að flytja ASS út?** Gæðaeftirlit flytur aðeins út SRT og VTT; ASS fer inn en kemur ekki út. Til að halda ASS áhrifum skaltu hugsa það til enda hjá [[Sniðbreytir|/convert.html]] fyrst.",
     "**Hvað þýðir lestrarhraði upp á 18?** Fyrir kínversku, japönsku og kóresku er þakið 9 full-víddar stafir á sekúndu (18 hálf-víddar einingar); önnur tungumál fá 20 hálf-víddar einingar á sekúndu. Þetta eru algengu þægindaþrepin, og inntaksreiturinn gerir þér kleift að breyta þeim.",
     "**Kóðun skrárinnar minnar er brotin — er hægt að athuga hana samt?** Gæðaeftirlit les aðeins UTF-8; lagaðu kóðunina á síðu fyrir viðgerð á rugluðum texta fyrst.",
     "**Mun það snerta tímalínuna mína?** Ekki svo lengi sem þú skilur „breytir tímasetningu“-hópinn óhakaðan; jafnvel þegar hakað er við er hver breyting tíunduð áður en lagfæringin er virkjuð."
    ]
   },
   {
    "h2": "Tengdar handbækur",
    "ps": [
     "Undirtextar flögra framhjá of hratt til að lesa — sjá sérstöku handbókina [[Undirtextarof fljótir til að lesa|/guides/subtitle-too-fast.html]]. Hvað á að athuga fyrir afhendingu — gátlistinn er á [[Hvað á að athuga fyrir afhendingu|/guides/subtitle-quality-check.html]]. Tímalína sem reikar úr samstillingu er öðruvísi vandamál — sjá [[Undirtextar reika úr samstillingu|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "remove-subtitle-ads": {
  "seo": {
   "title": "Fjarlægja auglýsingar og vatnsmerki úr undirtextum – AI-SRTSub",
   "desc": "Strippa vatnsmerki og auglýsingar úr undirtextum: slóðir, aðdáendahópaeiningar og kóðaðar af merki eru hreinsaðar með einum smelli, auk tvítekinna og auðra færslna. – AI-SRTSub",
   "h1": "Fjarlægja auglýsingar og vatnsmerki úr undirtextum",
   "intro": "Slóðir, einingar og kynningarfærslur faldar í undirtextunum þínum eru hreinsaðar í einni umferð af vatnsmerkjareglum hreinsarans — og allri mistökum eyðingu er hægt að afturkalla færslu fyrir færslu.",
   "ctaText": "Hreinsa undirtextavatnsmerki"
  },
  "body": [
   {
    "h2": "Hvað þessi vatnsmerki eru",
    "ps": [
     "Undirtextum sem halað er niður á netinu fylgja oft aukafærslur í upphafi eða enda (stundum í miðjunni líka): slóðir, netföng, hópanöfn aðdáendahópa, `encoded by` / `translated by` einingar, nafn síðna eins og opensubtitles, og línur eins og „fylgdu WeChat-reikningnum okkar“ eða „eingöngu í námslegum tilgangi“. Þær eru venjulegar undirtextafærslur — með tímalínu, taka upp línu — þannig að spilarar geta ekki fjarlægt þær; þær verða að vera greindar eftir innihaldi."
    ]
   },
   {
    "h2": "Hvar á að gera það",
    "ps": [
     "Opnaðu [[Undirtextahreinsarann|/clean.html]] og slepptu undirtextanum þínum í; „Vatnsmerki og ruslfærslur“-hópurinn er þegar með „Fjarlægja vatnsmerki og auglýsingar“, „Fjarlægja tvíteknar færslur“ og „Fjarlægja auðar færslur“ hakað við sjálfkrafa, og hreinsun hefst sjálfkrafa. Greining virkar á tveimur stigum: **sterk merki** eins og slóðir, tölvupóstar, aðdáendahópar og nafn síðna eyða allri færslunni við högg á hvaða lengd sem er; **veik merki** eins og @notendanafn, „kóðað“ eða „prófarkalesið“ einingar eru aðeins dæmdar í stuttum færslum sem eru ekki meira en 40 stafir, til að forðast að klippa lang samræður. Tvítyngdar færslur fá fyrst vatnsmeralínur strippaðar línu fyrir línu á meðan samtalslínum er haldið; færslunni er eytt í heild sinni aðeins ef vatnsmerkjaummerki eru eftir eftir strippun."
    ],
    "img": {
     "file": "clean-opts",
     "alt": "Hreinsunarstillingaskjár: gátreitirnir þrír í vatnsmerka- og ruslfærsluhópnum",
     "cap": "„Vatnsmerki og ruslfærslur“-hópurinn er kveikt á sjálfkrafa — engin handvirk uppsetning nauðsynleg"
    }
   },
   {
    "h2": "Yfirferð og útflutningur",
    "ps": [
     "Í breytingalistanum ber hver eydd færslu „vatnsmerki og auglýsing“-merki — skimaðu það til að staðfesta að engu hafi verið fjarlægt óvart; ef eitt lítur rangt út skaltu smella á „Endurheimta“ til að setja það til baka. Þegar búið er að staðfesta, sæktu: skráarnafnið fær `.clean` merki sjálfkrafa. Hreinsun keyrir staðbundið í vafranum þínum; undirtextarnir þínir eru aldrei sendir neitt."
    ]
   }
  ]
 },
 "repair": {
  "seo": {
   "title": "Hvernig á að laga rangstilla undirtexta (Mojibake) – Finna kóðunina – AI-SRTSub",
   "desc": "Leiðsögn: finna upprunalega kóðun (GBK / Big5 / Shift_JIS / EUC-KR), raða viðgerðum eftir því hvað lesst mest eins og tungumál, vistaðu síðan UTF-8 með BOM eða GBK. Tímasetningar og vísitölunúmer breytast aldrei.",
   "h1": "Hvernig á að laga rangstilla undirtexta",
   "intro": "Undirtextaskrá full af ruslastöfum er sjaldan spillt — hún var bara lesin með rangri kóðun. Viðgerðartækið finnur upprunalegu kóðunina og setur réttu stafina aftur, skilur vísitölunúmer og tímasetningar eftir í friði.",
   "ctaText": "Opna viðgerðartæki fyrir rangstilltan texta"
  },
  "body": [
   {
    "h2": "Hvað þetta tæki gerir",
    "ps": [
     "Sömu bæti lesnir sem UTF-8 og lesnir sem GBK gefa af sér tvö gjörólík safn stafa — skráin er ekki skemmd, hún var afkóðuð með rangri kóðun. Hér er það sem viðgerðartækið gerir:"
    ]
   },
   {
    "h2": "Hlaða upp skránni, ekki líma hana",
    "ps": [
     "Tveir inntakspunktar geta gert við mismunandi mikið tjón, svo **hlaðið upp skránni ef þú getur**. Með skrá eru upprunalegu bætin enn til staðar: tækið reynir eina kóðun á fætur annarri, og þegar það þekkir GBK afkóðar það sem GBK — engu þarf að giska á. Texti sem kemur með innlímingu er ekki lengur hráir bæti. Þegar vafrinn afhendir strenginn hefur mistökin þegar átt sér stað, þannig að tækið getur aðeins unnið afturábak og tekið það sem það getur fengið.",
     "Ef límdur texti inniheldur nú þegar staðgengilsstafinn (þann kassaða spurningarmerki `�`), eru upprunalegu bætin löngu farin og ekkert getur fært þau til baka. Síðan segir það beint út: farðu aftur upp og notaðu „Veldu skrá“ til að hlaða upp upprunalegu."
    ],
    "img": {
     "file": "repair-up",
     "alt": "Upphleðslusvæði fyrir viðgerðarsíðu: sleppisvæði og innlímingarreitur, með fundinni kóðun sýndri fyrir ofan",
     "cap": "Dragðu skrána inn eða leitaðu að henni; innlímingarreiturinn situr fyrir neðan og getur gert við miklu minna"
    }
   },
   {
    "h2": "Hvað greiningin er að segja þér",
    "ps": [
     "Þegar þú hleður upp gefur greiningarkortið dóm. **Engin röskun fannst**: innihaldið lesst vel eins og það er; ef spilarinn þinn sýnir samt rusl notaði spilarinn rangla kóðun — farðu niður í „Vista sem“, veldu aðra og afhentu henni þá skrá. Þegar það **lítur út eins og röskun** listar kortið upp hvaða ummerki það fann:"
    ],
    "img": {
     "file": "repair-diag",
     "alt": "Greiningarkort: dómur auk hverrar rösunarmerkja listar línu fyrir línu",
     "cap": "Greining listar ummerki eftir tegund í stað þess að segja bara „þetta er röskun“"
    }
   },
   {
    "h2": "Hvernig frambjóðendum er raðað, og hvernig á að velja",
    "ps": [
     "Undir „Leiðir til að laga þetta“ er frambjóðendum raðað í **mest-líkt-raunverulegu-tungumáli-fyrst** röð, allt að 12 þeirra, hver merktur með parinu af kóðunum sem hún var lesin frá og til. Smelltu á einn til að sjá hvernig hún lítur út, veldu hana, flettu síðan niður til að vista. Ekki ánægður? Notaðu „Halda eins og er“ til að falla aftur á það upprunalega.",
     "Röðin kemur frá stigi: hlutdeild algengra stafa, strengir af kommum, strengir af táknum, veggir af óþekktum stöfum, allir vegnir inn. **Ef engin einkunn er greinilega betri er engu mælt með** — það mun ekki þrýsta hálf-trúverðugum frambjóðanda að þér bara til að hafa einn. Texti sem var skemmdur tvisvar (vistaður rangt einu sinni, lagaður rangt einu sinni) fær eina aukarundu af aftur-lausn á efstu frambjóðendum, þannig að allt innan tveggja laga getur samt verið bjargað."
    ],
    "img": {
     "file": "repair-fix",
     "alt": "Listi yfir frambjóðendur að viðgerð raðað eftir því hve mikið hún lesst eins og raunverulegt tungumál, hver merkt með kóðunarpari sínu",
     "cap": "Frambjóðendur raðað eftir „mest eins og raunverulegt tungumál“, hver sýnir hlutaðeigandi kóðanir"
    }
   },
   {
    "h2": "Að vista rétt er síðasta skrefið",
    "ps": [
     "Lagaðri niðurstöðu þarf samt að vista rétt. Þegar spilari getur ekki greint UTF-8, er vistun sem **UTF-8 með BOM** (Windows spilarar treysta á BOM) eða sem **GBK** venjulega lausnin. Þú getur vistað sem UTF-8, UTF-8 (með BOM), GBK, Big5, Shift_JIS eða EUC-KR; ef eitthvað passast ekki er þér sagt að velja annað (GBK getur ekki geymt kóresku). Sóttar skrár fá `-fixed` bætt við nafnið.",
     "Þegar fundin kóðun er ekki UTF-8, er „Vista sem“ þegar forsniðið á UTF-8 með BOM fyrir þig. Þegar þú snertir fellivalmyndina sjálfur hættir hún að giska á þig."
    ],
    "img": {
     "file": "repair-out",
     "alt": "Niðurstöðusvæði: textareitur með vista-sem fellivalmynd og niðurhalsekk",
     "cap": "Veldu kóðun, sæktu síðan — skráarnafnið fær -fixed viðbætt"
    }
   },
   {
    "h2": "Hvað er aldrei snert",
    "ps": [
     "Aðeins stöfunum sem voru lesnir rangt er skipt út. Vísitölunúmer, tímasetningar og ASS stíllínur eru ekki breyttar á nokkurn hátt."
    ]
   },
   {
    "h2": "Algengar spurningar",
    "ps": [
     "**Ég hlaði skránni upp, af hverju þarf ég samt að vista hana aftur?** Skráin sjálf er venjulega í lagi; það sem er brotið er spilarinn sem les hana með rangri kóðun. Í því tilviki þarf enginn stafur í textanum breytingu — vistaðu bara afrit sem UTF-8 með BOM eða GBK og gefðu það spilaranum.",
     "**Af hverju er ekki hægt að laga límdan texta?** Þegar staðgengilsstafurinn birtist í límdri innihaldi eru upprunalegu bætin farin og það er ekkert til að rökstyðja afturábak frá. Farðu aftur upp og veldu „Veldu skrá“ til að hlaða upp upprunalegu.",
     "**Frambjóðandinn sem ég vil er ekki á listanum?** Engu er mælt með nema það fái hærri einkunn en það sem þú átt nú þegar. Prófaðu að skipta um fundnu kóðun í aðra og láttu hana endurraða.",
     "**Hversu margar skrár í einu?** Eina í einu. Sæktu viðgerðina, gefðu síðan inn næstu skrá."
    ]
   },
   {
    "h2": "Persónuvernd",
    "ps": [
     "Greining og viðgerð keyra að fullu í vafranum þínum. Ekkert undirtextainnihald er eða verður nokkurn tíma sent á netþjón."
    ]
   },
   {
    "h2": "Tengd tæki og handbækur",
    "ps": [
     "Hvað röskun kemur frá og af hverju hún endar á að líta svona út — sjá [[Hvað undirtextaröskun kemur frá|/guides/subtitle-garbled-characters.html]]; kóðunin er í lagi en innihaldið er óhreint — notaðu [[Textahreinsun|/clean.html]]; til að athuga tímasetningu og lestrarhraða — [[Textagæðaeftirlit|/qc.html]]."
    ]
   }
  ]
 },
 "sbv-to-srt": {
  "seo": {
   "title": "SBV í SRT breytir – Umbreyttu YouTube undirtextum – AI-SRTSub",
   "desc": "Umbreyttu SBV undirtextum sem hlaðið var niður af YouTube í SRT fyrir CapCut, Premiere og spilara. Tímasetningargildi haldast óhreyfð — aðeins útlitið breytist. Keyrir í vafranum þínum.",
   "h1": "SBV í SRT",
   "intro": "Umbreyttu YouTube SBV undirtextum í SRT: slepptu skránni, veldu SRT, sæktu. Tímasetningargildin eru óhreyfð — aðeins uppbyggingin breytist.",
   "ctaText": "Umbreyta SBV → SRT"
  },
  "body": [
   {
    "h2": "Hvað SBV er og hvaðan það kemur",
    "ps": [
     "SBV er **undirtextasnið YouTube**: að hlaða niður „undirtextaskrám“ af YouTube færðu oft .sbv skrá. Uppbygging heess er einfaldari en SRT — byrjunar- og endatímar sitja á **einni línu** aðskildir með kommum, textinn fylgir beint fyrir neðan, og það eru engin stefnúmer."
    ]
   },
   {
    "h2": "Af hverju spilarar hafna því",
    "ps": [
     "Fyrir utan YouTube sjálft styðja flestir klippihugbúnaðir og spilarar ekki SBV. Það skortir númerunarblokkina og skrifar tímasetningarlínu sína öðruvísi en SRT, þannig að það gerir ekkert að endurnefna endingu — uppbyggingin þarf að vera endurbyggð fyrir alvöru."
    ],
    "img": {
     "file": "convert-upload-sbv",
     "alt": "Upphleðslusvæði: SBV-skrá hlaðið inn, greind sem SBV",
     "cap": "SBV er greint eins og það er, engin endurnefning endingar nauðsynleg"
    }
   },
   {
    "h2": "Hvernig á að umbreyta",
    "ps": [
     "Opnaðu [[breytirinn|/convert.html]], slepptu SBV-skránni í, veldu **SRT - SubRip** sem úttak, umbreyttu síðan og sæktu. Stefnúmerum er úthlutað nýjum, og upprunalegum línuskilum innan stefs er safnað saman í eina línu (SRT leyfir fjölínu stef; SBV er flutt út einlínu hér)."
    ]
   }
  ]
 },
 "shift": {
  "seo": {
   "title": "Hvernig á að hliðra undirtextatímasetningu (Hliðrun, skölun, tveir punktar) – AI-SRTSub",
   "desc": "Mynduð leiðsögn um tímasetningarritilinn: hlaða inn undirtextum, bæta við aðlögunarskrefum, tveggja punkta leiðréttingu, fínstillingu á stef og útflutningi.",
   "h1": "Tímasetningarritill: Leiðbeiningar skref fyrir skref",
   "intro": "Þessi handbók fer í gegnum tækið frá top til botns: hlaða inn undirtextum, bæta við aðlögunarskrefum, keyra athuganir, fínstilla á stef og flytja út.",
   "ctaText": "Opna tímasetningarritilinn"
  },
  "body": [
   {
    "h2": "Hlaða inn undirtextunum þínum",
    "ps": [
     "Dragðu skrá í strikakaflann eða smelltu til að velja eina; þú getur líka **límt innihaldið** beint í textareitinn. Sniðið er greint bæði úr endingunni og innihaldinu, og niðurstaðan birtist í sniðflögunni. Studd inntök: srt, vtt, ass (þ.m.t. ssa), sbv, lrc og txt."
    ],
    "img": {
     "file": "shift-upload",
     "alt": "Upphleðslusvæði: sýnishorn undirtexta hlaðið inn, greindur sem SRT",
     "cap": "Skráarnafnið og fundið snið birtast undir sleppisvæðinu; textareiturinn heldur áfram að vera breytilegur."
    }
   },
   {
    "h2": "Bæta við aðlögunarskrefum",
    "ps": [
     "Aðlögun mynda **pípu af skrefum**: hvert skref gerir eitt verk og tekur eina tölu, með einingu sína sýnda inni í reitnum. Skref eiga við frá top til botns, og að breyta hvaða skrefi sem er **reiknar allt aftur úr upprunalegu undirtextunum** — þannig að þú getur farið til baka og breytt tölu hvenær sem er án þess að gera rugl."
    ]
   },
   {
    "h2": "Tveggja punkta leiðrétting",
    "ps": [
     "Þegar þú hvorki veist hliðrunina í sekúndum né hlutfallið skaltu nota tvo punkta: þegar búið er að bæta við, eru **tveir „núverandi“ reitir fylltir út sjálfkrafa** úr fyrsta og síðasta stefi skráarinnar þinnar. Þú fyllir aðeins út „mark“-reitina — tímana sem þessum stefjum ætti raunverulega að birtast á. Allt þar á milli er enderdreift hlutfallslega."
    ],
    "img": {
     "file": "shift-step-two",
     "alt": "Tveggja punkta leiðrétting: núverandi tímar sjálfkrafa fylltir út, mark-tímar til að slá inn",
     "cap": "Núverandi reitir koma úr skránni þinni; mark-reitirnir eru réttu tímarnir sem þú sérð í myndbandinu."
    }
   },
   {
    "h2": "Tímalínuathugun og stef-fínstillingar",
    "ps": [
     "Eftir að hafa keyrt skrefin skaltu lesa **tímalínuathugunina**: stef sem eru of stutt, of lög, of þétt til að lesa, línur sem eru of breiðar, eða skarandi stef fá öll upptalningu. Athugunin **birtir aðeins vandamál og breytir engu** upp á sitt einsdæmi. Sjálfgefnu reglurnar fjórar eru 0.833 sek lágmarkslengd, 7 sek hámark, 9 stafir á sekúndu lestrarhraði og 21 stafir á línu — allar breytilegar á síðunni. Fyrir neðan leyfa stef-fínstillingar þér að sameina tvö nágrannastef, skipta einu, eða breyta upphafi þess og enda beint; hverri breytingu er hægt að afturkalla."
    ]
   },
   {
    "h2": "Flytja út niðurstöðuna",
    "ps": [
     "Niðurstöðusvæðið sýnir upprunalega og stillta tíma **hlið við hlið** til auðveldrar yfirferðar. Útflutningssniðið fellur sjálfgefið að inntakssniðinu, en þú getur skipt í hvaða sem er af srt, vtt, ass, sbv, lrc eða txt áður en þú sækir."
    ],
    "img": {
     "file": "shift-result",
     "alt": "Niðurstöðusvæði: fyrri og eftir tímar hlið við hlið, með niðurhals- og afritunartökkum",
     "cap": "Upprunalegir tímar vinstra megin, stilltir hægra megin; sæktu þegar yfirferðin lítur vel út."
    }
   }
  ]
 },
 "shift-subtitle-timing": {
  "seo": {
   "title": "Hvernig á að hliðra öllum undirtextum fyrr eða seinna – AI-SRTSub",
   "desc": "Hvert stef er seint um sömu upphæð: notaðu hliðrunarskref tímasetningarritilsins — sláðu inn eina neikvæða eða jákvæða tölu og öll stef hreyfast saman.",
   "h1": "Færa alla undirtextaskrána fyrr eða seinna",
   "intro": "Hljóðið byrjar, undirtextinn birtist seint — og hvert einasta stef er seint um sömu upphæð. Það er jöfn hliðrun: ein tala lagar það.",
   "ctaText": "Opna tímasetningarritilinn"
  },
  "body": [
   {
    "h2": "Staðfestu fyrst að hvert stef sé seint um sömu upphæð",
    "ps": [
     "Skoðaðu eitt stef nálægt upphafi, eitt í miðjunni og eitt í endanum. Ef öll þrjú eru seint um svipaða upphæð er það **jöfn hliðrun**, og eitt hliðrunarskref lagar það. Ef upphafið er rétt og reikið vex í átt að endanum er það annað vandamál — sjá [[undirtextar verða meira og meira úr samstillingu|/guides/subtitles-out-of-sync.html]]."
    ]
   },
   {
    "h2": "Hvað á að slá inn: neikvætt til að flýta, jákvætt til að seinka",
    "ps": [
     "Í tímasetningarritlinum skaltu bæta við **Hliðra öllu** skrefi og slá inn hliðrunina í gildi-reitinn: undirtextar sem keyra seint taka neikvæða tölu til að draga þá fyrr; að keyra snemma tekur jákvæða tölu til að þrýsta þeim seinna. Ef undirtextarnir eru 1.5 sekúndur seinir skaltu slá inn **-1.5** — einingin er sekúndur."
    ],
    "img": {
     "file": "shift-step-shift",
     "alt": "Hliðra öllu skrefi með -1.5 sekúndum slegnum inn",
     "cap": "Neikvæð tala dregur alla skrána fyrr; einingin er skrifuð inni í reitnum, í sekúndum."
    }
   },
   {
    "h2": "Keyrðu það og athugaðu fyrsta stefið",
    "ps": [
     "Eftir beitingu listar niðurstöðusvæðið upprunalega og nýja tíma hvers stefs **hlið við hlið**. Athugaðu fyrsta stefið fyrst: lendir nýi upphafstíminn á ramma þar sem línan er töluð? Athugaðu síðan eitt í miðjunni. Hvert stef hreyfist um sömu upphæð og heldur sínum eigin tímalengd."
    ]
   },
   {
    "h2": "Útflutningur",
    "ps": [
     "Þegar yfirferðin lítur vel út skaltu sækja beint. Útflutningssniðið fellur sjálfgefið að inntakssniðinu og hægt er að skipta því í eitthvað annað. Breytingin snertir aðeins tíma — ekki einn staf af texta."
    ]
   }
  ]
 },
 "simplified-traditional-chinese": {
  "seo": {
   "title": "Ekki stafaskipti – Ein-til-margar og svæðisbundin orð – AI-SRTSub",
   "desc": "Þrír hlutir gera þetta erfitt: ein-til-margar vörpunarleysingar eftir orði, mismunandi taílenskur og hongkongskur orðaforði, og umbreyting aðeins á samtali. Fáðu öll þrjú rétt og engin manna endurvinnsla fylgir.",
   "h1": "Einfölduð vs hefðbundin er ekki stafaskipti",
   "intro": "Hvaða hefðbundinn stafur kemur í stað einfaldaðs stafar fer eftir stafnum við hliðina á honum. Þess vegna er ekki hægt að gera þessa umbreytingu með því að skipta blindu einum staf í einu.",
   "ctaText": "Opna breytirinn"
  },
  "body": [
   {
    "h2": "Fyrst: eitt einfaldað form, nokkur hefðbundin",
    "ps": [
     "Einföldun dró saman nokkra hefðbundna stafi í eitt einfaldað form. Að fara hina leiðina, einn einfaldaður stafur samsvarar nokkrum hefðbundnum, og að velja þar á milli fer eftir því hverju hann er paraður við:",
     "Að skipta staf fyrir staf fellir þá alla saman í þann sama og fær öll tilvik röng. Að leysa **eftir orði** er það sem aðskilur þau — töflurnar koma frá OpenCC, passa setningar áður en stakir stafir. Til dæmis:"
    ]
   },
   {
    "h2": "Annað: Taívan og Hong Kong eru ekki það sama",
    "ps": [
     "Það er ein viðbótarlag eftir umbreytingu í hefðbundið: sama orð er skrifað öðruvísi í Taívan og Hong Kong. Orðið yfir „hugbúnað“ er eitt í Taívan og annað í Hong Kong, og Taívan notar sitt eigið orð yfir „upplýsingar“.",
     "Þess vegna aðskildu stefnurnar. Taílensk hefðbundin skiptist jafnvel í „breyta orðalagi“ og „aðeins leturmerki“ — aðeins leturmerki heldur núverandi orðaforða þínum, á meðan breyta orðalagi skiptir svæðisbundnum hugtökum líka út. Hong Kong fær sína eigin stefnu."
    ],
    "img": {
     "file": "hanconv-dir",
     "alt": "Umbreyta í kort: áfangastaðarfellivalmynd sem sýnir „Einfaldað → Taílensk hefðbundin (breyta orðalagi)“",
     "cap": "Taívan býður upp á orðalagsbreytingar eða aðeins leturmerki; Hong Kong hefur sína eigin stefnu"
    }
   },
   {
    "h2": "Þriðja: aðeins samtali ætti að vera breytt",
    "ps": [
     "Undirtextaskrá er ekki bara samtat. Vísitölunúmer, tímasetningar og ASS stíllínur eru þar líka, og ekki einum staf af þeim ætti að vera breytt — ASS stíllínur sérstaklega, þar sem þær innihalda ensk leiðbeiningarnöfn sem brotna um leið og þær eru meðhöndlaðar sem samtat.",
     "Þannig að umbreyting á sér stað eftir greiningu eftir sniði: SRT, VTT, ASS og TXT bera hver um sig kennsl á hvaða hluti er samtat, og aðeins stöfunum innan þess er breytt. Tímasetningar og stílar lifa af óhreyfðir, engin snið til að endurgera."
    ],
    "img": {
     "file": "hanconv-out",
     "alt": "Niðurstöðusvæði: umbreyttur undirtexti og tölfræðislá sem sýnir breyttan línufjölda",
     "cap": "Tölfræðisláin sýnir hve margar línur breyttust; sniðun er varðveitt eins og er"
    }
   },
   {
    "h2": "Að fara aftur í einfaldað: passaðu þig",
    "ps": [
     "Að umbreyta hefðbundnu í einfaldað krefst þess líka að þú segir **hvaða hefðbundnu fjölbreytni þú ert að koma frá**: almenn, taílensk og hongkongsk eru þrjár ólíkar leiðir, vegna þess að svæðisbundinn orðaforði þarf að vera endurheimtur í almenna orðið áður en hægt er að umbreyta honum. Veldu ranga stefnu og svæðisbundinn orðaforði lifir af í einfaldaða úttakinu.",
     "Neðri hópur stefnanna níu er sá sem umbreytir aftur: hefðbundið → einfaldað, taílenskt → einfaldað, hongkongsktt → einfaldað."
    ]
   },
   {
    "h2": "Tengd tæki og handbækur",
    "ps": [
     "Allar leiðbeiningar — [[Hvernig á að umbreyta einfölduðum og hefðbundnum undirtextum|/guides/hanconv.html]]; ef allt sem þú þarft er einfaldað í hefðbundið — [[Umbreyta einfölduðum undirtextum í hefðbundna|/guides/srt-simplified-to-traditional.html]]; til að þýða yfir á annað tungumál, [[Undirtextaþýðing|/translate.html]]."
    ]
   }
  ]
 },
 "split": {
  "seo": {
   "title": "Að skipta og sameina textaskrár – Klippa eftir einingum, raða í röð – AI-SRTSub",
   "desc": "Klippa eina skrá í hluta eftir tímalengd eða fjölda textablokka, endurræsa hverja frá núlli, eða keðjutengja nokkrar skrár í réttri röð eða flétta þeim saman eftir tímalínu. Númerum textablokka er endurraðað en textinn lætur óbreyttur.",
   "h1": "Hvernig á að skipta og sameina textaskrár",
   "intro": "Klippa eina langa textaskrá í hluta, eða sameina nokkrar dreifðar skrár í eina. Skurðurinn lendir alltaf á mörkum textaatriða – málsgrein er aldrei sneidd í tvennt.",
   "ctaText": "Opna skiptingu og sameiningu"
  },
  "body": [
   {
    "h2": "Hvað þetta verkfæri gerir",
    "ps": [
     "Skipting þátta, skipting hluta og samruna uppruna skila öllum sömu misræmum á milli textablokka og myndbandsblokka: annað hvort þarf að klippa eina skrá eða sameina nokkrar. Þessi síða sér um hvort tveggja, einn flipi fyrir hvort."
    ]
   },
   {
    "h2": "Veldu fyrst klippingu eða sameiningu",
    "ps": [
     "Tveir flipar efst: **Skipta: eina skrá í hluta** og **Sameina: nokkrar skrár í eina**. Valkostirnir í öðru skrefi hér að neðan breytast eftir valinu.",
     "Undir „1 Bæta við texta“ hleður þú upp skrá eða límdum texta; ef þú valdir vitlaust skaltu smella á „Hreinsa“. Þessi síða les eingöngu UTF-8 – ef kóðunin er skemmd (veggur af spurningarmerkjum eða kassa) farðu þá í [[Viðgerð á röngu stafakóði|/repair.html]] fyrst."
    ],
    "img": {
     "file": "split-mode",
     "alt": "Tveir flipar efst á síðu skiptingar og sameiningar",
     "cap": "Klipping og sameining eru tveir flipar; valkostirnir í öðru skrefi fylgja valinu þínu"
    }
   },
   {
    "h2": "Hvernig á að klippa",
    "ps": [
     "Undir „2 Hvernig á að klippa“ skaltu velja grundvöll: **tímalengd** (einn hluti á hverjum X mínútum) eða **fjölda textaatriða** (einn hluti á hverjum X textablokkum), og sláðu síðan inn tölu.",
     "Hakaðu við „Endurræsa hvern hluta á 0:00“ og hver hluti sem verður til telur frá núlli – notaðu þetta þegar þú hleður upp þáttum og gefur hverjum hluta spilara út af fyrir sig. Skildu þetta eftir óhakast til að halda upprunalegum tímamerkjum, þannig að hver hluti raðist þó saman við staðsetningu sína í upprunalega myndbandinu.",
     "Skurðurinn lendir eingöngu á mörkum textablokka: þegar mjög langur texti teygir sig yfir skurðpunktinn fer öll blokkin í fyrri hlutann."
    ],
    "img": {
     "file": "split-cut",
     "alt": "Valkostirnir fyrir tímalengd og fjölda textaatriða með rofanum fyrir endurræsingu við núll á skiptingarsíðunni",
     "cap": "Klippa eftir tímalengd eða fjölda textablokka, og valfrjálst að endurræsa hvern hluta á 0ઃ00"
    }
   },
   {
    "h2": "Hvernig á að sameina",
    "ps": [
     "Undir „2 Hvernig á að sameina“ skaltu velja aðferðina: **Keðjutengja í röð** færir seinni skrána þannig að hún hefst eftir að sú fyrri endar, án þess að hlutar skarist; **Flétta saman eftir tímalínu** varðveitir upprunaleg tímamerki hverrar skráar og raðar eftir upphafstíma.",
     "Notaðu keðjutengingu í röð þegar skrárnar eru fyrri og síðari helmingur eins þáttar, eða þegar sérprufreaddir helmingar þurfa að fara aftur saman; notaðu fléttun eftir tímalínu þegar skrárnar eigaheima á skjánum saman, svo sem upprunalegt hljóðrás og þýdd hljóðrás.",
     "Eftir sameiningu er textanúmerum endurraðað sjálfkrafa og ekki eitt einasta orð í samtali breytist."
    ],
    "img": {
     "file": "split-join",
     "alt": "Valkostirnir fyrir keðjutengingu í röð og fléttun eftir tímalínu á sameiningarsíðunni",
     "cap": "Keðjutenging í röð hentar fyrir tvo helminga eins þáttar; fléttun eftir tímalínu hentar fyrir upprunalega og þýdda rás"
    }
   },
   {
    "h2": "Að sækja niðurstöðuna",
    "ps": [
     "„3 Niðurstaða“ hægra meginflytur út **SRT** og **VTT**; smelltu á „Sækja“ eða „Afrita“.",
     "Við skiptingu geturðu notað „Sækja hvern hluta“, sem vistar hvern klipptan hluta í einu lagi í stað þess að smella einu sinni fyrir hvern hluta."
    ],
    "img": {
     "file": "split-out",
     "alt": "Valið á SRT/VTT sniði með hnöppum til að sækja og sækja hvern hluta á niðurstöðusvæðinu",
     "cap": "Skiptingarniðurstöður er hægt að sækja hluta fyrir hluta; sameinaðri skrá er hlaðið niður eða hún afrituð beint"
    }
   },
   {
    "h2": "Hvað er látið óbreytt",
    "ps": [
     "Ekki einn stafur í samtali breytist. Þessi síða breytir aðeins því hvaða textablokkar tilheyra hvaða hluta og hvernig þeim er raðað upp; innihald færslnanna heldur sér eins og það er.",
     "Með „Keðjutengja í röð“ er tímamerkjum seinni skránna breytt í heild sinni – það er það sem sameining krefst; með „Flétta saman eftir tímalínu“ er öllum upprunalegum tímamerkjum haldið til haga."
    ]
   },
   {
    "h2": "Algengar spurningar",
    "ps": [
     "**Hvað ef síðasti hluti reynist mjög stuttur?** Það er eðlilegt. Afgangurinn sem fyllir ekki út í engan heilum hluta verður að sínum eigin hluta í stað þess að fá fyllingu.",
     "**Verður málsgrein sem teygir sig yfir skurðpunktinn skipt?** Nei. Skurðir lenda eingöngu á mörkum færslna, og textablokkar sem fara yfir línuna verða eftir í fyrri hlutanum.",
     "**Eftir fléttun, hvernig er tvíteknum textablokkum með sömu tímum raðað?** Eftir upphafstíma; þegar upphafstímar eru jafnir er röðinni sem þú bættir skrám við haldið.",
     "**Er hægt að skipta ASS?** Þessi síða sér um SRT og VTT. Umbreyttu ASS í SRT eða VTT með [[Sniðbreyting|/convert.html]] fyrst."
    ]
   },
   {
    "h2": "Persónuvernd",
    "ps": [
     "Textaskrár eru unnar að fullu í vafri: engu er hlaðið upp og ekkert fer í gegnum netþjón. Lokaðu síðunni og innihaldið er horfið."
    ]
   },
   {
    "h2": "Tengd verkfæri og leiðbeiningar",
    "ps": [
     "Til að sameina tvær skrár í tvítyngda rás (í stað eins þáttar) skal nota [[Tvítyngdur samruna og sérstök áhrif|/guides/merge.html]]; ef öll tímalínan er skakk farðu þá í [[Tímalínustilling|/shift.html]]; fyrir heila þá Að það sé tímabils virði nota [[Lotubreyting|/batch.html]]; og keyrðu [[Texta Gæðaeftirlit|/qc.html]] þegar þú ert búin(n)."
    ]
   }
  ]
 },
 "split-bilingual-subtitles": {
  "seo": {
   "title": "Skipta tvítyngdum textaskrám í tvær rásir – AI-SRTSub",
   "desc": "Skipta tvítyngdum textaskrám í tvær skrár: upprunaleg og þýdd rás eru sóttar sérstaklega með mismunandi nöfnum; bæði form eru viðurkennd. – AI-SRTSub",
   "h1": "Skipta tvítyngdum textaskrám í tvær rásir",
   "intro": "Ein tvítyngd textaskrá verður að tveimur skrám – „upprunaleg“ og „þýðing“: hlaða upp, velja skiptingu í tvennt, sækja hvora um sig, þar sem tímalínum er haldið óskertum.",
   "ctaText": "Skipta tvítyngdum textaskrám"
  },
  "body": [
   {
    "h2": "Þegar þú þarft að skipta",
    "ps": [
     "Spilarinn þinn vill aðeins eina tungumálarás; eða þú vilt þýðingarrásina til endurþýðingar, eða upprunalegu rásina til að para saman við aðra þýdda útgáfu. Tvítyngdur texti er annað hvort **einn textablokkur með tveimur línum** (upprunalegt á einni línu, þýðing á hinni) eða **tveir aðskildir textablokkar sem deila sömu tímalínunni** – hægt er að skipta hvoru tveggja."
    ]
   },
   {
    "h2": "Hvar á að gera það",
    "ps": [
     "Opnaðu [[Tvítyngda textaflögnunin|/bilingual.html]] og slepptu textaskránni þinni inn. Verkfærið greinir tvítyngda formið sjálfkrafa: einni blokk með tveimur línum er skipt eftir ritkerfi, tveimur blokkum á sömu tímalínu eftir röð. Veldu **Skipta í tvennt** í fellivalmyndinni fyrir ham og smelltu á Byrja (eða láttu það keyra aftur sjálfkrafa). Niðurstöðusvæðið sýnir tvo hluta: sá sem er merktur `.orig` er upprunalega rásin, sá sem er merktur `.dst` er þýðingarrásin – smelltu á „Sækja“ fyrir hvora um sig; rásirnar tvær deila nákvæmlega sömu tímalínunni."
    ],
    "img": {
     "file": "bilingual-split",
     "alt": "Skiptingarniðurstaða: upprunalega rásin og þýðingarrásin sem tveir hlutar, hvor um sig með sækingarhnappi",
     "cap": "Skipta í tvennt: .orig upprunaleg rás + .dst þýðingarrás, hvor um sig sótt sérstaklega"
    }
   },
   {
    "h2": "Ein algeng gildra",
    "ps": [
     "**Ekki er hægt að skipta einni blokk með tveimur línum á tungumálum sem deila sama stafrófinu (segjum ensku og frönsku).** Þegar rásir eru aðskildar eftir ritkerfi teljast þær til sama kerfis og eru meðhöndlaðar sem eintyngdar. Umbreyttu svonu efni í sama tímalínuform B fyrst, skiptu því síðan; formið með tveimur blokkum parar saman eftir tímalínu og lætur tungumál af skipta litlu. Fyrir ítarlegar upplýsingar um bæði form skaltu skoða [[Tvær leiðir til að búa til tvítyngda texta|/guides/make-bilingual-subtitles.html]]."
    ]
   }
  ]
 },
 "srt-file-format": {
  "seo": {
   "title": "Hvað er SRT-skrá? Hvernig á að opna og breyta henni – AI-SRTSub",
   "desc": "Uppbygging SRT (SubRip) textaskráa: númer, tímalína, texti. Hvernig á að opna eina í textaritli, af hverju spilari hafnar henni og hvernig á að laga ranga stafakóðun og villur í tímamerkjum.",
   "h1": "Útskýring á SRT-skráarsniðinu",
   "intro": "SRT er algengasta textasniðið: óunninn texti, einföld uppbygging, samþykkt nánast alls staðar. Þessi handbók útskýrir uppbyggingu þess, hvernig á að opna það og hvernig á að laga algengar bilanir.",
   "ctaText": "Opna textaskráabreytirinn"
  },
  "body": [
   {
    "h2": "Hvernig SRT-skrá lítur út",
    "ps": [
     "SRT (SubRip) er óunninn texti – hvaða textaritill sem er opnar hana. Hver textablokkur hefur þrjá hluta: **númeralínu**, **tímalínu** og **texta**, aðskilda með auðum línum. Tímalínan les `00:00:01,000 --> 00:00:03,500` – athugið **kompuna** á undan millisekúndum, ekki punkt."
    ],
    "img": {
     "file": "convert-upload",
     "alt": "Upphleðslusvæði: SRT-skrá hlaðið inn sem sýnir númer og tímasetningu",
     "cap": "Hefðbundni SRT þríþætti textablokkurinn: númer, tímalína, texti"
    }
   },
   {
    "h2": "Hvernig á að opna hana",
    "ps": [
     "Til að lesa innihaldið: hægrismelltu og opnaðu með hvaða **textaritli** sem er. Til að nota hana með myndbandi: endurnefnið skrána til að **passa við skráarnafn myndbandsins** (fyrir utan skráarendingu), setjið þær báðar í sama möppu, og spilarar eins og VLC, PotPlayer eða mpv hlaða henni inn sjálfkrafa; þú getur líka dregið hana yfir á spilunargluggann."
    ]
   },
   {
    "h2": "Að laga höfnun og ranga stafakóðun",
    "ps": [
     "**Skemmdir stafir**: skráin er ekki UTF-8 – vistaðu hana aftur sem UTF-8 í textaritlinum þínum. **Ekkert birtist**: athugaðu hvort tímalínan nota kompu (ekki punkt) og að textanúmer séu ekki brotin (flestir spilarar þola bil, sumir ekki). **Skráin er HTML eða JSON**: uppruni niðurhalsins var rangur; sæktu hana aftur."
    ]
   },
   {
    "h2": "Hvað SRT getur og getur ekki geymt",
    "ps": [
     "SRT geymir aðeins texta og tímasetningu: **engar stílsnið** (letur, liti), **engna staðsetningu** (hvar á skjánum), **engin áhrif**. Það þarf ASS til þess – sjá [[SRT í ASS|/guides/srt-to-ass.html]]. Fyrir hlið við hlið samanburð á öllum sniðum, sjá [[samanburður á textasniðum|/guides/subtitle-format-comparison.html]]."
    ]
   }
  ]
 },
 "srt-fps-converter": {
  "seo": {
   "title": "SRT FPS-breytir – Breyta rammahraða texta – AI-SRTSub",
   "desc": "Kvikmynd er 24fps, útsending er 25fps og textar reka meira í burtu hverja mínútu: skalastu tímalínuna um 0.96 einu sinni og öll skráin lendir á markhraðanum.",
   "h1": "Breyting á rammahraða texta: 24fps í 25fps",
   "intro": "Spilaðu texta 24fps kvikmyndar á 25fps uppruna og þeir tapa yfir sekúndu á hverri mínútu – við lokalínu eru þeir mínútum á eftir. Ein skalun lagar það.",
   "ctaText": "Opna tímaritilinn"
  },
  "body": [
   {
    "h2": "Af hverju ósamræmi í rammahraða veldur því að textar reka til",
    "ps": [
     "Breyting á rammahraða endurles **sama tímahlbil undir tveimur mismunandi klukkum**. 100-mínútu 24fps kvikmynd hefur 6000 s × 24 = **144,000 ramma**; á 25fps uppruna spilast þessir 144,000 rammar á 5760 sekúndum – **96 mínútum**. Öll kvikmyndin keyrir 4 mínútum of stutt, þannig að textablokkur á mínútu 50 birtist u.þ.b. 2 mínútum of seint, og textinn í lokaatriðunum birtist aldrei."
    ]
   },
   {
    "h2": "Formúlan og algengir þættir",
    "ps": [
     "Markhraði ÷ upprunalegur hraði = margfeldisstuðullinn. **24 til 25: margfalda með 0.96** (24÷25); á hin línuna, 25 til 24: 1.0417. **25 til 23.976: margfalda með 0.959**; á hin línuna: 1.0427. Í tímaritlinum skaltu bæta við **Skala eftir hraða** skrefi og setja stuðulinn í gildið reit."
    ],
    "img": {
     "file": "shift-step-rate",
     "alt": "Skala eftir hraða skref með 0.96 skráð inn",
     "cap": "0.96 er 24÷25; ábendingin á síðunni nefnir jafnvel rammahraðabreytingu sem algenga notkun."
    }
   },
   {
    "h2": "Þegar þú veist ekki hvort tveggja rammahraðana",
    "ps": [
     "Ef þú finnur ekki rammahraða upprunans skaltu ekki giska á stuðulinn – notaðu **tvo akkeri** í staðinn: taktu raunverulegan birtingartíma fyrsta og síðasta textablokksins sem tvo punkta, og allt þar á milli er teygt til baka í réttum hlutföllum. Sjá [[textar fara meira og meira úr samstillingu|/guides/subtitles-out-of-sync.html]]."
    ]
   },
   {
    "h2": "Hvað á að athuga á eftir",
    "ps": [
     "Skalun færir hvert upphaf og endi; tímalengdir texta teygjast með sama stuðul. Eftir keyrslu skaltu staðfesta þessa tvo útstaði: fyrsta textablokk (minnsta upprunalega villa) og þann síðasta (mesta). Ef báðir endar passa gerir allt þar á milli það líka."
    ]
   }
  ]
 },
 "srt-simplified-to-traditional": {
  "seo": {
   "title": "Breyta einfölduðum texta í hefðbundinn – Tævan eða Hong Kong – AI-SRTSub",
   "desc": "Breyttu einfölduðum kínverskum textum í hefðbundna: veldu tævanska (með eða án svæðisbundins orðaforða) eða Hong Kong. Vörpun frá einum til margra leysist eftir orði. Aðeins samtöl breytast; tímastillingar haldast óbreyttar.",
   "h1": "Breyta einfölduðum textum í hefðbundna",
   "intro": "Einfaldaður kínverskur texti sem stefnir á tævanska eða Hong Kong áhorfendur þarf aðeins breytingu – en svæðin tvö vilja mismunandi hluti, og að velja ranga stefnu gefur þér orðalag sem heimamenn nota ekki.",
   "ctaText": "Breyta þessum texta"
  },
  "body": [
   {
    "h2": "Þörfin",
    "ps": [
     "Textarnir þínir eru á einfaldaðri kínversku og þurfa að ná til áhorfenda í Tævan eða Hong Kong. Að laga stafi einn af öðrum er ekki raunhæft – einn þáttur hefur hundruð textablokka – og svæðin tvö vilja ekki sama hefðbundna textann: orðaforðinn er mismunandi og röng stefna framleiðir orðalag sem enginn heimamaður myndi nota."
    ]
   },
   {
    "h2": "Hvar á að gera það",
    "ps": [
     "Opnaðu [[Einfölduð–hefðbundin breyting|/hanconv.html]], dragðu textann inn og veldu eina af einfaldaðri → hefðbundinni stefnu undir „Breyta í“: almennt hefðbundið, tævanska (breyta orðalagi), tævanska (aðeins leturmerki) eða Hong Kong. Breytingin á sér stað samstundis og niðurstöðusvæðið sýnir fullgerða textann, tilbúinn til niðurhals.",
     "**Fyrir tævanska áhorfendur**: veldu „Tævanska (breyta orðalagi)“ ef svæðisbundinn orðaforði ætti líka að breytast – „hugbúnaður“ og „upplýsingar“ verða tævönsku jafngildi þeirra – eða „Tævanska (aðeins leturmerki)“ ef þú vilt að stafalögunum sé breytt á meðan upprunalegu orðalagi er haldið. **Fyrir Hong Kong áhorfendur**: veldu „Hong Kong“, þar sem „hugbúnaður“ er skrifaður með öðru formi enn sem komið er."
    ],
    "img": {
     "file": "hanconv-dir",
     "alt": "Breyta í kort: fellivalmynd áfangastaðar sem sýnir „Einfölduð → Tævönsk hefðbundin (breyta orðalagi)“",
     "cap": "Tævan og Hong Kong eru aðskildar stefnur með mismunandi orðaforða"
    }
   },
   {
    "h2": "Algengar gildrur",
    "ps": [
     "**Óttast ekki vörpun frá einum til margra**: sami einfaldaði stafurinn í orðunum fyrir „hreint“, „þurrt“ og „trjástofn“ varpar á mismunandi hefðbundna stafi. Töflurnar leysa þetta eftir setningafrasa, þannig að allt sé ekki flatt út í einn staf.",
     "**Aðeins samtöl er breytt**: tímamerki, raðnúmer og ASS-stíllínur eru óhreyfð, þannig að niðurstaðan er tilbúin til notkunar.",
     "**Ekkert breytt? Athugaðu áður en þú panikar**: ef tölfræðistikan tilkynnir 0 breyttar línur, þá hefur skráin annað hvort enga kínverska stafi eða sniðið greindist rangt – athugaðu að „Greint snið“ passi við það sem þú hleður upp."
    ]
   },
   {
    "h2": "Tengt",
    "ps": [
     "Full útskýring á öllum níu stefnunum – [[Hvernig á að breyta einfölduðum og hefðbundnum textum|/guides/hanconv.html]]; hvers vegna þetta er meira en að skipta út stöfum – [[Einfaldað vs hefðbundið er ekki stafa skipting|/guides/simplified-traditional-chinese.html]]; hefðbundið aftur í einfaldað býr líka í [[Einfölduð–hefðbundin breyting|/hanconv.html]]."
    ]
   }
  ]
 },
 "srt-to-ass": {
  "seo": {
   "title": "SRT í ASS breytir – Breyta textaskrám á netinu – AI-SRTSub",
   "desc": "Umbreyttu SRT-textum í ASS (Advanced SubStation Alpha) með 1920×1080 striga og hreinum sjálfgefnum stíl, tilbúinn til hliðarhleðslu í hvaða spilara sem er. Keyrir í vafra þínum.",
   "h1": "SRT í ASS",
   "intro": "Breyttu SRT-textum í ASS: slepptu skránni, veldu ASS, sæktu. 1920×1080 strigi og hreinn sjálfgefinn still er búinn til fyrir þig.",
   "ctaText": "Breyta SRT → ASS"
  },
  "body": [
   {
    "h2": "Þegar þú þarft ASS",
    "ps": [
     "Notaðu ASS þegar texti til hliðarhleðslu þarf **betri staðsetningu og stýringu á stíl**: hann geymir hugtök sem SRT skortir – stærð striga, leturstíla, jöfnun. mpv, PotPlayer, VLC og flestir spilarar styðja það beint."
    ]
   },
   {
    "h2": "Hvernig úttakið lítur út",
    "ps": [
     "Verkfærið endurbyggir staðlaðan haus: **1920×1080 striga**, snjalla línuskiptingu (WrapStyle 0), og einn sjálfgefinn stíl – Arial 54, hvítan texta með svartri útlínu, neðst miðjaður. Hver textablokkur notar þennan stíl."
    ],
    "img": {
     "file": "convert-opt-ass",
     "alt": "Fellivalmynd úttakssniðs með ASS - Advanced SubStation valið",
     "cap": "Veldu ASS sem úttak og sæktu eftir breytingu"
    }
   },
   {
    "h2": "Eru stílar varðveittir?",
    "ps": [
     "SRT hefur ekkert stílhugtak til að börast með. Og ef uppruninn þinn er þegar ASS, mun umbreytingin **endurbyggja sjálfgefna stílinn og ekki halda þeim upprunalega** – notaðu sérstakan textaritil til að stíla ASS upp á nýtt. Tímastilling og texti verða ekki fyrir áhrifum hvort eða heldur."
    ]
   }
  ]
 },
 "srt-to-excel": {
  "seo": {
   "title": "Breyta textum í Excel – Pruflesa röð fyrir röð – AI-SRTSub",
   "desc": "Flyttu út SRT-texta í Excel: ein röð á bólk í fjórum dálkum – vísir, upphaf, endir og texti. Tími geymdur sem texti, línuskil ósnortin, og breyttu töflunni er hægt að umbreyta aftur í textaskrár.",
   "h1": "Breyta textum í Excel",
   "intro": "Að pruflesa hundruð textablokka í textaritli er lýjandi. Í Excel er hver textablokkur röð, þannig að síun, athugasemdir og finna-og-skipta verða allar aðgengilegar – og breytingarnar fara aftur í SRT-skrána þína.",
   "ctaText": "Flytja út í Excel"
  },
  "body": [
   {
    "h2": "Þörfin",
    "ps": [
     "Prufrufslun, magnorðabreytingar eða skipting á vinnunni á milli nokkurra manna – allt það gengur miklu hraðar í töflu en í óunnnum texta. SRT sjálft er óunninn texti, en textablokkaruppbygging þess (vísir, tímastilling, samtöl) passar snyrtilega við fjóra töfludálka."
    ]
   },
   {
    "h2": "Hvar á að gera það",
    "ps": [
     "Opnaðu [[Texta ⇄ töflubreyting|/table.html]], skiptu í „í töflu“, dragðu SRT-skrána inn, og forskoðunin fyllist af einni röð á hverja blokk í fjórum dálkum – vísir, upphaf, endir, texti. Ýttu á „Sækja Excel (.xlsx)“ og hún er þín. VTT er stutt á sama hátt.",
     "Þegar þú ert búin(n) að breyta: skiptu um ham í „í texta“, settu töfluna aftur inn og þú færð SRT aftur. Reglan er þrír dálkar fyrir upphaf, endi og texta (enska Start / End / Text virkar líka), í hvaða röð sem er."
    ],
    "img": {
     "file": "table-prev",
     "alt": "Tafla forskoðun: hver SRT-blokk sem röð yfir fjóra dálka, með tölfræðistiku",
     "cap": "SRT sett upp sem fjórir dálkar, hægt að breyta aftur á sama hátt"
    }
   },
   {
    "h2": "Algengar gildrur",
    "ps": [
     "**Lagaðu brotna stafakóðun fyrst**: þessi síða les eingöngu UTF-8. Fullur skjár af spurningarmerkjum eða kössum þýðir ferð í [[Viðgerð á Mojibake|/repair.html]] fyrst.",
     "**CSV eða xlsx**: veldu .xlsx þegar skráin fer í Excel, þannig að tímadálkurinn geti ekki endursniðist; CSV er meðfærilegra en Excel gæti lesið það sem eitthvað annað – stilltu tímadálkinn á „Texti“ ef það gerist.",
     "**ASS virkar ekki**: ASS geymir stílleiðbeiningar, svo umbreyttu því í SRT áður en það er sett í töflu."
    ]
   },
   {
    "h2": "Tengt",
    "ps": [
     "Full tvíhliða leiðsögn – [[Hvernig á að breyta textum í Excel / CSV|/guides/table.html]]; þýðing eftir á – [[Textaþýðing|/translate.html]]; síðasta umferð fyrir afhendingu – [[Texta Gæðaeftirlit|/qc.html]]."
    ]
   }
  ]
 },
 "srt-to-vtt": {
  "seo": {
   "title": "SRT í VTT breytir – Breyta textaskrám á netinu – AI-SRTSub",
   "desc": "Umbreyttu SRT-textum í VTT (WebVTT) fyrir HTML5-lagstök. Kompur í tímamerkjum verða punktar sjálfkrafa. Keyrir í vafra þínum, engu er hlaðið upp.",
   "h1": "SRT í VTT",
   "intro": "Breyttu SRT-textum í VTT: slepptu skránni, veldu VTT, sæktu. Tímamerki eru endurskrifuð fyrir vefsniðið, allt í vafra þínum.",
   "ctaText": "Breyta SRT → VTT"
  },
  "body": [
   {
    "h2": "Þegar þú þarft VTT",
    "ps": [
     "Vefspilarar (HTML5 `<track>` stakið), niðurhalaðir YouTube textar og flestir vafraundirstaðir spilarar samþykkja aðeins **VTT (WebVTT)** – ekki SRT. Ef allt sem þú átt er SRT gerir ein breyting það að verkum að það virkar."
    ]
   },
   {
    "h2": "Hvernig sniðin tvö eru ólík",
    "ps": [
     "Innihaldið er nánast eins; þrír hlutir eru skrifaðir á annan hátt: **WEBVTT hausslína** (áskilin í VTT); **millisekúnduskilrúmið** í tímamerkjum – SRT notar kompu (00:00:01,000) en VTT notar punkt (00:00:01.000); og VTT leyfir NOTE og STYLE blokkir sem SRT gerir ekki."
    ],
    "img": {
     "file": "convert-result",
     "alt": "Breytingarniðurstaða sem sýnir WEBVTT haus og punktatímamerki",
     "cap": "Umbreytta VTT: WEBVTT fyrsta lína, punktatímamerki"
    }
   },
   {
    "h2": "Hvernig á að breyta",
    "ps": [
     "Opnaðu [[breytirinn|/convert.html]], slepptu SRT-skránni inn, veldu **VTT - WebVTT** sem úttak, breyttu síðan og sæktu. Röð textablokka, tímasetningargildi og fjöllínu texti er allt haldið eins og er – aðeins setningafræðin breytist. Ferðu hina leiðina? Sjá [[VTT í SRT|/guides/vtt-to-srt.html]]."
    ]
   }
  ]
 },
 "subtitle-format-comparison": {
  "seo": {
   "title": "SRT vs VTT vs ASS vs SBV vs LRC – Hvaða textasnið – AI-SRTSub",
   "desc": "Samanburður á getu fimm algengra textasniða: textastíll, staðsetning, tímakvæmni, hvar hvert um sig á heima og hvernig á að breyta á milli þeirra.",
   "h1": "Að velja textasnið: SRT / VTT / ASS / SBV / LRC",
   "intro": "Sami texti vistaður í fimm sniðum þjónar fimm mismunandi herrum. Þessi handbók ber saman hvað hvert snið getur gert og hvernig á að færa sig á milli þeirra.",
   "ctaText": "Opna textaskráabreytirinn"
  },
  "body": [
   {
    "h2": "Veldu snið í einni setningu",
    "ps": [
     "Hliðarhleðsla í spilara, hámarks samhæfni → **SRT**; vefspilarar (HTML5 lag) eða YouTube upphleðsla → **VTT**; letur, litir, staðsetning, áhrif → **ASS**; sótt af YouTube → **SBV** (umbreyta í SRT til að víkka stuðning); lagatextar, söngur línu fyrir línu → **LRC**."
    ],
    "img": {
     "file": "convert-opt",
     "alt": "Fellivalmynd úttakssniðs: sex markmiðssnið",
     "cap": "Sex útflutningsmarkmiðin í breytinum ná yfir öll snið í þessari handbók"
    }
   },
   {
    "h2": "Samanburður á getu",
    "ps": [
     "**SRT**: óunninn texti + tímasetning, engin stílsnið eða staðsetning, samhæfnimeistarinn. **VTT**: texti + tímasetning, stutt innfætt af vöfrum, getur geymt staðsetningu og grunnhönnun, punktur á undan millisekúndum. **ASS**: texti + tímasetning + full hönnun (letur, litir, útlínur, staðsetning, áhrif), tímastilling niður í hundraðtu hluta úr sekúndu. **SBV**: lágmarkstextasnið YouTube, upphaf og endir á einni línu. **LRC**: lagatextasnið, aðeins upphafstímar, engir endartímar, engin hönnun."
    ]
   },
   {
    "h2": "Leiðir á milli sniða",
    "ps": [
     "Hvaða þessara sem er umbreytist á báða vegu í [[breytinum|/convert.html]]: lestur styður srt, vtt, ass (þ.m.t. ssa), sbv, lrc, txt; útflutningur styður srt, vtt, ass, sbv, lrc, txt. Algengar leiðir hafa hver um sig sína eigin handbók: [[SRT í VTT|/guides/srt-to-vtt.html]], [[VTT í SRT|/guides/vtt-to-srt.html]], [[SRT í ASS|/guides/srt-to-ass.html]], [[ASS í SRT|/guides/ass-to-srt.html]], [[SBV í SRT|/guides/sbv-to-srt.html]], [[LRC í SRT|/guides/lrc-to-srt.html]]."
    ]
   },
   {
    "h2": "Hvað umbreytingar tapa",
    "ps": [
     "Að breyta í SRT fellir alltaf út hönnun og staðsetningu (SRT getur ekki geymt það). Að breyta í ASS með þessu tæki **endurbyggir sjálfgefinn stíl og heldur ekki þeim upprunalega**. LRC í SRT þarf að fyllta endartíma (hver lína endist þar til sú næsta kemur; sú síðasta fær 3 sekúndur). Tímastillingargildi og texti haldast óbreytt í allar áttir."
    ]
   }
  ]
 },
 "subtitle-garbled-characters": {
  "seo": {
   "title": "Hvaðan texta-Mojibake kemur – Finndu það, lagaðu það – AI-SRTSub",
   "desc": "Mojibake þýðir rangur lestur, ekki skemmd skrá. Skiptistafir, veggir af kommustöfum og runur af óskýrum stöfum benda allir á orsök – lærðu hverjir ná sér og hverjir gera það aldrei.",
   "h1": "Hvaðan texta-mojibake kemur",
   "intro": "Sömu bæti lesin sem UTF-8 og lesin sem GBK koma út sem tveir algjörlega mismunandi hópar stafa. Hvernig rusltextinn lítur út er bein sönnun um hvað fór úrskeiðis í hvaða skrefi sem er.",
   "ctaText": "Opna mojibake-viðgerðartækið"
  },
  "body": [
   {
    "h2": "Skráin er í lagi – hún var lesin rangt",
    "ps": [
     "Það sem textaskrá geymir eru bæti. Að breyta bætum í stafi krefst þess að vita hvaða stafakóðun þau voru skrifuð í – gerðu það rangt og þú færð mojibake. Eitt einasta bæti vantar ekki í skrána; lestu hana aftur með réttri stafakóðun og stafirnir koma til baka.",
     "Það skiptir vinnunni í tvennt: **að finna út hvaða stafakóðun hún byrjaði sem**, og **að vista hana sem stafakóðun sem spilarinn þinn getur greint**. Hið fyrra kemur frá tilraunaafkóðun og einkunnagjöf, hið seinna frá því að vista afrit. Þau leysa mismunandi vandamál."
    ]
   },
   {
    "h2": "Fimm útlit, fimm orsakir",
    "ps": [
     "Mojibake er ekki tilviljun – hvernig hún lítur út gefur til kynna hvað olli henni:"
    ],
    "img": {
     "file": "repair-diag",
     "alt": "Greiningarkort sem sýnir hverja tegund mojibake-ummerkja",
     "cap": "Greining flokkar mojibake eftir orsökum í stað þess að henda öllu saman"
    }
   },
   {
    "h2": "Af hverju ekki er hægt að laga skiptistafinn",
    "ps": [
     "Skiptistafurinn er skilalínan. `�` þýðir að bætunum var þegar hent **á fyrra stigi** (venjulega einhverju forriti sem les skrána og vistar hana aftur), og ekkert var skráð um hvað fór í burtu. Á þeim tímapunkti er ekkert til að rökstyðja aftur á bak frá – enginn getur lagað það.",
     "Þannig að viðgerðarsíðan meðhöndlar tvö tilvik á mismunandi hátt. Hladdu upp skrá og upprunalegu bætin eru óskemmd, sem gerir henni kleift að prófa hverja stafakóðun; ef límdur texti inniheldur nú þegar skiptistafinn, segir hún það skýrt: „ekki hægt að laga, vinsamlegast hlaðið upp upprunalegu skránni“.",
     "Það er líka til öfuga tilvikið: innihaldið lesst fullkomlega en spilarinn þinn sýnir samt rusl. Skráin er ekki að kenna – **spilarinn valdi rangna stafakóðun**. Að breyta textanum mun ekki hjálpa; vistaðu afrit sem UTF-8 með BOM eða GBK og láttu hana fá það."
    ],
    "img": {
     "file": "repair-up",
     "alt": "Upphleðslusvæði: drag-og-sleppa og líma sem tveir inngangspunktar",
     "cap": "Hladdu upp skránni ef þú getur – óskemmd bæti þýða eitthvað til að laga"
    }
   },
   {
    "h2": "Hvað hún er að bera saman á meðan hún lagar",
    "ps": [
     "Verkfærið prófar hverja sennilega stafakóðun, gefur svo hverri niðurstöðu einkunn: hve mikið af henni er gert úr algengum stöfum, hvort það eru runur af kommustöfum, runur af táknum, hvort KJK-runur eru vegir af óskýrum stöfum. Niðurstaðan með hæstu einkunn fer efst á listann.",
     "**Ef engin einkunn er greinilega betri er engu mælt með** – betra að segja þér „þetta lesst í lagi eins og er“ en að afgreiða þig með einhverju sem líkist tungumáli aðeins að hluta. Texti sem hefur verið ruglað saman tvisvar (vistaður rangt einu sinni, lagaður rangt einu sinni) fær eina aukalotu af afturlausn á efstu frambjóðendunum."
    ],
    "img": {
     "file": "repair-fix",
     "alt": "Frambjóðendalisti raðaður eftir einkunn, hver merkist með stafakóðunarparinu sínu",
     "cap": "Frambjóðendur raðaðir eftir einkunn – enginn skýr sigurvegari, engin ráðgjöf"
    }
   },
   {
    "h2": "Að vista réttu stafakóðunina klárar verkið",
    "ps": [
     "Lagaður texti þarf samt að verða vistaður sem stafakóðun sem spilarinn þinn þekkir. Spilarar á Windows reiða sig venjulega á BOM til að greina stafakóðun, þannig að **UTF-8 með BOM** er minnsta fyrirhöfnin; eldri vélbúnaður og sumir svæðisbundnir spilarar vilja GBK. Þú getur valið UTF-8, UTF-8 (með BOM), GBK, Big5, Shift_JIS eða EUC-KR, og þér verður sagt að velja annað ef eitthvað passár ekki (GBK getur ekki geymt kóresku)."
    ],
    "img": {
     "file": "repair-out",
     "alt": "Niðurstöðusvæði: vista sem stafakóðunar-fellivalmynd og sækingarhnappur",
     "cap": "Vistaðu það sem eitthvað sem spilarinn þekkir og mojibake er sannarlega leyst"
    }
   },
   {
    "h2": "Tengd verkfæri og leiðbeiningar",
    "ps": [
     "Full leiðsögn – [[Hvernig á að laga mojibake-texta|/guides/repair.html]]; hvað SRT-skrá geymir í raun og veru – [[Hvað er í SRT-skrá|/guides/srt-file-format.html]]; stafakóðunin er í lagi en innihaldið er óhreint (vatnsmerki, auglýsingar, textar fyrir heyrnarskerta) – [[Textahreinsun|/clean.html]]."
    ]
   }
  ]
 },
 "subtitle-glossary": {
  "seo": {
   "title": "Hugtakatöflur: eitt tímabil, einn orðaforði – Hvenær á að búa til eina – AI-SRTSub",
   "desc": "Hugtakatafla lagar sama orð sem er þýtt ósamræmanlega: hvenær á að búa til eina, hvernig á að endurnýta hana yfir tímabil, af hverju leit að heilu orði gerir ekki neitt á kínversku og hverju ekki á að láta hana fá.",
   "h1": "Hugtakatöflur: halda samræmi í tímabili",
   "intro": "Þegar nafn er A í þætti eitt og B í þætti sjö, halda áhorfendur að þeir séu tvær persónur. Hugtakatafla kemur í veg fyrir einmitt það – hún lagar það sem hlutir heita.",
   "ctaText": "Opna lotuhugtakaskipti"
  },
  "body": [
   {
    "h2": "Hugtakatafla lagar ósamræmi",
    "ps": [
     "Orðalagsandstæður í textum koma í tvennu lagi: „þetta orð er þýtt rangt“ og „sama orð er þýtt á annan hátt á einum stað en öðrum“. Hið fyrra er orðabókarmál; hið síðar er það sem hugtakatafla er til fyrir.",
     "Hið síðara er bæði algengara og erfiðara að greina: `Thor` verður að „Þór“ í þætti eitt og „Donar“ í þætti sjö, og hver þáttur lítur vel út einn og sér á meðan þáttaröðin öll lærir áhorfendur til að halda að ný persóna hafi birst. Hugtakatafla breytir því að „þessi framleiðsla kallar hann Þór“ í framkvæmanlega reglu sem gildir fyrir allar textaskrárnar í einu."
    ]
   },
   {
    "h2": "Hvenær það borgar sig að búa til eina",
    "ps": [
     "Ekki þarf hver textaskrá hugtakataflu. Tilvikin sem réttlæta eina eru venjulega þessi:"
    ],
    "img": {
     "file": "glossary-rules",
     "alt": "Skiptireglur flokkaðar eftir flokkum í hugtakatöflu",
     "cap": "Notaðu # athugasemdir til að flokka reglur og til að slökkva á einni tímabundið við breytingar"
    }
   },
   {
    "h2": "Að halda einni töflu yfir tímabil",
    "ps": [
     "Hugtakatafla er viðhaldið **skref fyrir skref**: negldu niður nöfnin í þætti eitt, bættu síðan við reglu þegar nýtt hugtak birtist, og við lok tímabilsins er taflan fullkomin. Fyrir næsta tímabil af sömu þáttaröð skaltu byrja út frá henni.",
     "Skrifaðu reglur aðeins breiðari en stranglega þarf – þegar þú hefur ákveðið „Þór“, skaltu bæta við „Donar -> Þór“ líka, þannig að hægt sé að koma textum einhvers annars í takt í sömu umferð.",
     "Lestu alltaf **breytingalistann** á eftir: hannnefnirhvern textablokk, hverja línu og hvað varð til úr hverju. Það er eini staðurinn þar sem þú getur staðfest að breytingin hafi verið rétt og ekki ofnotuð, og hægt er að afturkalla hvaða færslu sem er með smelli."
    ],
    "img": {
     "file": "glossary-diff",
     "alt": "Listinn yfir stakar breytingar á niðurstöðusvæðinu",
     "cap": "Hver breyting er skráð; smelltu á eina sem þú vilt ekki til að afturkalla hana"
    }
   },
   {
    "h2": "Hverju ekki á að láta hugtakataflu fá",
    "ps": [
     "Hugtakatafla breytir **orðum**. Þessir þrír hlutir eru utan hennar verksviðs og ættu að vera það:",
     "**Málfræði og setningafræði** – þú getur ekki breytt orði í setningu; setningafræðilegt starf fer aftur í [[Textaþýðing|/translate.html]] eða til manneskju.",
     "**Innihaldshreinsun** – að fella út heilum línum eins og vatnsmerkjum, auglýsingum og SDH-textum tilheyrir [[Textahreinsun|/clean.html]]; reglur hugtakatöflu skipta út, þær eyða ekki línum.",
     "**Tímalínur** — hugtökutafla snertir aldrei tíma. Fyrir alþjóðlegt hliðrunar- eða hraðavandamál, farðu í [[Timeline adjustment|/shift.html]]."
    ]
   },
   {
    "h2": "Nokkrir hlutir sem auðvelt er að fara rangt með",
    "ps": [
     "**Kínverska skiptir samt út hlutstrengjum þegar leit að heilu orði er virkjuð – það er eðlilegt.** Kínverska og japanska skilja ekki orð að með bilum, þannig að verkfærið getur ekki ákvarðað orðamörk og leit að heilu orði hefur engin áhrif þar; `art` mun ekki snerta `start` vernd virkar aðeins fyrir ensku.",
     "**Röð breytir niðurstöðunni.** Reglur keyra að ofan til neðst og texti sem er framleiddur af einni reglu er skannaður aftur af reglunum fyrir neðan hana. Skiptu A út fyrir B og síðan B út fyrir C og þú endar með C.",
     "**Til að breyta aðeins þýðingunni skal stilla gildissviðið.** Í tvítyngdri skrá skaltu velja „aðeins önnur lína“; færslur með aðeins eina línu haldast óbreyttar undir hvorri einstæðri línu stillingu sem er – verkfærið giskar ekki á hvaða hliðin er upprunaleg.",
     "**Hugtakataflan er ekki vistuð.** Hún er tóm í hvert skipti sem þú opnar síðuna, svo hafðu þína eigin textaskrá og sendu hana áfram."
    ]
   },
   {
    "h2": "Tengd verkfæri og leiðbeiningar",
    "ps": [
     "Fyrir fulla leiðsögn sjá [[Hvernig á að skipta út hugtökum í lotu í textum|/guides/glossary.html]]; ef innihaldið er óhreint skaltu keyra [[Textahreinsun|/clean.html]] fyrst; þegar nöfnin eru komin í höfn og þךrfir önnur tungumál farðu þá í [[Textaþýðing|/translate.html]]; og keyrðu niðurstöðuna í gegnum [[Texta Gæðaeftirlit|/qc.html]]."
    ]
   }
  ]
 },
 "subtitle-quality-check": {
  "seo": {
   "title": "Gæðaeftirlitslisti fyrir texta fyrir afhendingu – AI-SRTSub",
   "desc": "Gæðaeftirlitslisti fyrir texta: skörun, lestrarhraði, línubreidd og greinarmerki klikka oftast. Keyrðu 17 gæðaeftirlitsreglurnar – helmingur vandamálanna eru eins smellps laga.",
   "h1": "Hvað á að athuga fyrir afhendingu",
   "intro": "Fullgerðir textar eru ekki tilbúnir til afhendingar: vandamálin sem áhorfendur sjá við fyrstu sýn eru nákvæmlega þau sem þú sérð ekki eftir að hafa horft hundruð sinnum. Þessi gæðaeftirlitslisti nær yfir þessa hinstu umferð.",
   "ctaText": "Keyra texta Gæðaeftirlit"
  },
  "body": [
   {
    "h2": "Af hverju þú getur ekki séð vandamálin sjálf(ur)",
    "ps": [
     "Hver sem búnar til texta þekkir efnið of vel – þú veist hvað hver lína segir næst, þannig að ekkert finnst nokkurn tímaof hratt; þú hefur séð útlitið hundruð sinnum, og augun þín sleppa yfir galla af sjálfu sér. Þannig að gæðaeftirlitið fyrir afhendingu getur ekki treyst á „að horfa aftur á það frá upphafi“ – það verður að vera **mælt á móti tölum**: lestrarhraði, línubreidd, tímalengd, skörun. Láttu tölurnar ráða."
    ]
   },
   {
    "h2": "Sex algengustu bilanirnar",
    "ps": [
     "Raðað eftir því hve oft þær sökkva afhendingu:"
    ]
   },
   {
    "h2": "Hvernig á að athuga",
    "ps": [
     "Opnaðu [[Texta Gæðaeftirlit|/qc.html]] og slepptu textaskránni þinni inn; stilltu tungumálið á sjálfvirka greiningu (27 tungumál, hvert með sínar eigin regluþrep). Skýrslan sýnir niðurstöður á þremur stigum – **villur / aðvaranir / ábendingar** – hver með færslunúmeri og mældu gildi. Villur verður að taka á (rangur texti, tímasnið, endar fyrr en byrjar, brotin númering); aðvaranir fara eftir tilvikum (skörun, lestrarhraði, línubreidd, tímalengd); ábendingar eru fæginingin (staða línuskila, bil, greinarmerki)."
    ],
    "img": {
     "file": "qc-report",
     "alt": "Gæðaeftirlitsskýrsla: þriggja þrepa vandamálalisti, hver niðurstaða með færslunúmeri og samanburði á mældu og mörkum",
     "cap": "Þriggja þrepa skýrsla sem gefur færslunúmer og mælt gildi fyrir hverja niðurstöðu"
    }
   },
   {
    "h2": "Hvað er hægt að laga með einum smelli",
    "ps": [
     "Númering, auðar færslur, endurumbúðir, bil og greinarmerki – eitthvað sem **skilur tímastillinguna eftir óhreyfða** – er hægt að laga sjálfkrafa; lagfæringar sem **breyta tímastillingunni** (skipta upphafi og enda, færa skörun, stytta eða teygja tímalengdir) eru óhakaðar sjálfgefnum og ætti að haka við aðeins eftir að þú hefur staðfest áhrifin. **Lestrarhraði yfir mörkum hefur enga sjálfvirka lagfæringu** – vélin getur ekki vitað hvaða orð á að klippa, svo styttu þýðinguna sjálf(ur) eða losaða tímastillinguna aðeins; sjá [[Textarof hraddir til að lesa|/guides/subtitle-too-fast.html]]. Eftir lagfæringu keyrir nýtt eftirlit sjálfkrafa, og skýrslan telur aðeins það sem var raunverulega lagað."
    ]
   },
   {
    "h2": "Á meðan þú ert að því",
    "ps": [
     "Síðu skýrslunnar er hægt að sækja beint sem óunnið texta `.qc.txt` skýrslu – festu hana við afhendingu þannig að hin hliðin sjái í fljótu bragði hvað þú athugaðir. Fyrir nýþýdda texta skaltu keyra gæðaeftirlit fyrir afhendingu; almenn tímalínureki er öðruvísi vandamál – ef lestrarhraði bilar enn eftir athugun, sjá [[Textar reka úr samstillingu|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "subtitle-speed-converter": {
  "seo": {
   "title": "Samstilla texta eftir breytingu á myndbandshraða – AI-SRTSub",
   "desc": "Myndband hraðað eða hægt og textarnir passa ekki lengur: sláðu inn hraðastuðulinn í skrefinu til að skalan eftir hraða og öll tímalínan teygist með myndbandinu.",
   "h1": "Að stilla texta eftir breytingu á myndbandshraða",
   "intro": "Myndbandið varð hraðara eða hægara í heild sinni, textarnir héldu upprunalegum takti – allt á eftir punkti er skakkt. Sláðu inn stuðulinn og öll tímalínan skalast með myndbandinu.",
   "ctaText": "Opna tímaritilinn"
  },
  "body": [
   {
    "h2": "Hvenær á að nota hraða í stað hliðrunar",
    "ps": [
     "Myndbandinu var hraðað eða hægt á **í heild sinni** (segjum 0.9x eða 1.25x í klippihugbúnaðinum) á meðan hver textablokkur hélt sínum upprunalega takti: upphafið passar og því lengra sem þú ferð því verra verður það – með stöðugu hlutfalli. Það er hraðavandamál. Ef öll skráin er einfaldlega færð um ákveðna upphæð án þess að stækka, þá dugar hliðrun – sjá [[færa alla textaskrána fyrr eða seinna|/guides/shift-subtitle-timing.html]]."
    ]
   },
   {
    "h2": "Hvaða tölu á að slá inn",
    "ps": [
     "Textar verða að fylgja myndbandinu, svo sláðu inn **stuðulinn sem myndbandið breyttist raunverulega um**: 1.25x hraðakstur þýðir að tímar textablokka margfaldast með 1.25 til að ná upp; 0.9x hægagangur margfaldast með 0.9. Í tímaritlinum skaltu bæta við **Skala eftir hraða** skrefi og setja stuðulinn í gildið reit."
    ],
    "img": {
     "file": "shift-step-rate",
     "alt": "Skala eftir hraða skref með stuðul í gildisreitnum",
     "cap": "Stuðull yfir 1 teygir tímalínuna (fyrir myndband sem hefur verið hraðað), undir 1 þjappar henni saman (fyrir myndband sem hefur verið hægt á)."
    }
   },
   {
    "h2": "Hvernig þetta er frábrugðið hliðrun",
    "ps": [
     "Hliðrun **færir** tíma hvers textablokks um sömu föstu upphæð og heldur tímalengdum texta; hraði **margfaldar** bæði upphaf og endi, þannig að tímalengdir skalast líka. Eftir hraðabreytingu hafa tímalengdirnar sjálfar breyst – það er nákvæmlega ástæðan fyrir því að hraði er nauðsynlegur."
    ]
   },
   {
    "h2": "Ef þú ert ekki viss um stuðulinn",
    "ps": [
     "Þegar stuðullinn tapast skaltu falla aftur á **tvo akkeri**: sláðu inn raunverulegan myndbandstíma fyrsta og síðasta textablokks og allt þar á milli dreifist hlutfallslega – jafngilt því að leysa fyrir réttan stuðul. Sjá [[textar fara meira og meira úr samstillingu|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "subtitle-too-fast": {
  "seo": {
   "title": "Textar of hraddir til að lesa – Laga lestrarhraða – AI-SRTSub",
   "desc": "Textar of hraddir til að lesa – stuttur tími eða langur texti? Gæðaeftirlit merkir færslur yfir 20 stafi/sekúndu (9 hanzi fyrir KJK); tímalengdir lagast sjálfkrafa, texti þarf breytingu.",
   "h1": "Textar of hraddir til að lesa",
   "intro": "Áhorfendur halda áfram að ýta á hlé? Sökudólgurinn er lestrarhraði. Hvernig á að mæla hann, hvernig á að laga hann og hvenær á að breyta textanum á móti tímastillingunni – allt í einni handbók.",
   "ctaText": "Athuga lestrarhraða"
  },
  "body": [
   {
    "h2": "Hvað er lestrarhraði?",
    "ps": [
     "Lestrarhraði er einfaldlega **hvort áhorfendur geti klárað að lesa texta fyrr en hann hverfur af skjánum**. Útreikningurinn er einfaldur: textabreidd deilt með sekúndum á skjá. Algengmörk í iðnaði: 9 fullbreiddar stafir á sekúndu fyrir kínversku, japönsku og kóresku (18 hálfbreiddar einingar), 20 hálfbreiddar einingar á sekúndu fyrir önnur tungumál. 20-hanzi lína sem endist í 1 sekúndu þýðir 40 breiddareiningar á sekúndu — meira en tvöfalt hámarkið, og áhorfendur munu aldrei klára hana."
    ]
   },
   {
    "h2": "Fyrst skaltu greina hvaða tegund af hröðum",
    "ps": [
     "„Of hratt til að lesa“ eru í raun tvö mismunandi vandamál: **of stutt tímalengd** – textablokkurinn klippist í burtu eftir eitt eða tvö hundruð millisekúndur, venjulega villu í tímastillingum eða leifar frá klippingu; **of langur texti** – tímalengdin er í lagi, en línan troðir í 30 hanzi og engin hraðamörk munu bjarga henni. Lagfæringarnar eru andstæður, svo finndu út hverju þú ert að glíma við fyrst."
    ],
    "img": {
     "file": "qc-rules",
     "alt": "Stilling á mörkum lestrarhraða á gæðaeftirlitssíðunni, með sjálfgefnu gildi 18 fyrir KJK og 20 fyrir önnur tungumál",
     "cap": "Mörk lestrarhraða í gæðaeftirliti: 18 breiddareiningar á sekúndu fyrir KJK, 20 fyrir önnur tungumál"
    }
   },
   {
    "h2": "Hvernig á að athuga",
    "ps": [
     "Opnaðu [[Texta Gæðaeftirlit|/qc.html]] og slepptu textaskránni þinni inn. Í skýrslunni er „of stutt tímalengd“ aðvörun sem sýnir mældar millisekúndur (mörk: 833 millisekúndur); „ólesanlegur hraði“ er sín eigin niðurstaða sem sýnir mældar breiddareiningar á sekúndu. Fyrir tvítyngda texta telur aðeins línan sem skrifuð er á marktungumálinu – tungumálin tvö eru ekki lögð saman."
    ]
   },
   {
    "h2": "Hvernig á að laga það",
    "ps": [
     "**Of stutt tímalengd**: hægt að laga með einum smelli – textablokkurinn er sjálfkrafa framlengdur í 833 millisekúndur, án þess að fara framhjá upphafi næsta textablokks (lagfæring má ekki búa til nýja skörun). **Of langur texti** – engin sjálfvirk lagfæring – vélin getur ekki vitað hvaða orð á að klippa. Tvær leiðir, þitt val: styttu þýðinguna (smelltu á reitinn í þýðingartækinu til að breyta honum), eða teygðu tímalengd þessa textablokks (aðeins ef það er bil á undan næsta textablokki; fyrir almenn vandamál á tímalínu sjá [[Tímalínuhliðrun|/shift.html]]). Keyrðu gæðaeftirlit aftur á eftir til að staðfesta að lestrarhraði sé kominn aftur innan marka."
    ]
   },
   {
    "h2": "Ekki ofbæta",
    "ps": [
     "Að uppfylla hraðamörkin þýðir ekki þægilega áhorf: að troða hverjum textablokki rétt upp að 9 stöfum á sekúndu gerir alla myndina lýjandi. Að þumalputtareglum skaltu halda þig við u.þ.b. 70% af mörkum mest allan tímann og leyfa þéttsettum samtalsköflum að fara aðeins yfir stundum. Textablokkar sem blikka of oft eru vandamál í sjálfu sér – keyrðu allt safnið af mælingum fyrir afhendingu, sjá [[Hvað á að athuga fyrir afhendingu|/guides/subtitle-quality-check.html]]."
    ]
   }
  ]
 },
 "subtitles-out-of-sync": {
  "seo": {
   "title": "Textar reka meira og meira úr samstillingu? Lagaðu það – AI-SRTSub",
   "desc": "Byrjar vel, nokkrum sekúndum á eftir um miðja mynd, ónothæft í lokin: það er stighækkandi reki, venjulega rammahraðamismunur eða breyting á myndbandshraða. Tveir akkeri laga það.",
   "h1": "Textar reka meira og meira úr samstillingu: Orsakir og lagfæringar",
   "intro": "Gott í upphafi, tveimur sekúndum of seint eftir hálftíma, vonlaust í lokin. Þessi tegund af skakku misræmi hefurþekktar orsakir – og þekkta lagfæringu.",
   "ctaText": "Laga þessa skrá"
  },
  "body": [
   {
    "h2": "Að greina hvers kyns misræmi í sundur fyrst",
    "ps": [
     "Misræmi kemur í tvennu lagi: **samræmd hliðrun** þýðir að hver textablokkur er seinn (eða snemmur) um sama magn, u.þ.b. jafnt frá upphafi til enda; **stighækkandi reki** þýðir að upphafið er rétt og villan vex í átt að endanum, mögulega náandi mínútum. Þessi grein er um seinni tegundina – fyrir þá fyrri, sjá [[færa alla textaskrána fyrr eða seinna|/guides/shift-subtitle-timing.html]]."
    ]
   },
   {
    "h2": "Af hverju hann rekur meira og meira",
    "ps": [
     "Reki stafar af **tveimur mismunandi klukkum**: þrjár algengustu orsakirnar eru (1) misræmi í rammahraða – textar 24fps kvikmyndar á 25fps uppruna tapa yfir sekúndu á mínútu; (2) myndbandinu var hraðað eða hægt á á meðan textarnir héldu sínum upprunalega takti; (3) VFR (breytilegur rammahraði) upptaka sem er með ójafna tímalínu til að byrja með. Það sem þau eiga sameiginlegt: villan vex u.þ.b. línulega með spilunartíma."
    ]
   },
   {
    "h2": "Lagaðu það með tveimur akkerum",
    "ps": [
     "Vegna þess að villan vex línulega, setur það allt aftur á sinn stað að festa réttan tíma á hvorum enda og endurdreifa miðjunni hlutfallslega. Í tímaritlinum skaltu bæta við **tveggja akkerja leiðréttingu**: reitirnir tveir „núverandi“ fyllast sjálfkrafa út með upprunalegum tímum þessarar skráar; þú horfir á myndbandið og slærð inn **hvenær fyrsti og síðasti textablokkurinn birtast raunverulega** í reitina „markmið“."
    ],
    "img": {
     "file": "shift-step-two",
     "alt": "Tveggja akkerja leiðrétting: núverandi tímar sjálfkrafa fylltir út, markmiðstímar til að slá inn",
     "cap": "Taktu akkerana við útstaðina – minnstu og mestu upprunalegu villuna – og allt þar á milli dreifist hlutfallslega aftur."
    }
   },
   {
    "h2": "Hvernig á að staðfesta niðurstöðuna",
    "ps": [
     "Eftir keyrslu sýnir niðurstöðusvæðið upprunalega og nýja tíma hvers textablokks **hlið við hlið**. Athugaðu þrjá staði: fyrsta textablokk, einn í miðjunni og þann síðasta – þrjár stöður með minnstu, miðlungs og mestu upprunalegu villu. Ef allir þrír lenda, gerir öll skráin það líka."
    ],
    "img": {
     "file": "shift-result",
     "alt": "Niðurstöðusvæði: tímar fyrir og eftir hlið við hlið, með sækingarhnappi",
     "cap": "Nýir tímar miðtexta ættu að lenda á milli endanna tveggja – merki um að hlutfallið sé rétt."
    }
   },
   {
    "h2": "Þegar tveir akkeri duga ekki",
    "ps": [
     "Tveggja akkerja leiðrétting gerir ráð fyrir að villan sé **línuleg** abrupt. Ef uppruninn er VFR sk skjáupptaka með stökki í rammahraða um miðja skrá, getur línulegt tog ekki lagað miðjuna – taktu greinilega skakkan miðtexta sem þriðja punkt, skiptu skránni þar og keyrðu tveggja akkerja leiðréttingu á hvorum helmingi. Eftir lagfæringu skaltu líka horfa á miðhlutann aftur á eðlilegum hraða til að staðfesta að engin staðbundin misræmi séu eftir."
    ]
   }
  ]
 },
 "table": {
  "seo": {
   "title": "Skipting á milli textaskráa og Excel / CSV – Báðar áttir – AI-SRTSub",
   "desc": "Leiðbeiningar í báðar áttir: flytja út SRT/VTT í Excel eða CSV til yfirlestrar línu fyrir línu, og flytja síðan breyttu töfluna aftur inn sem textaskeyti. Þrjá dálka þarf, í hvaða röð sem er; tími er geymdur sem texti.",
   "h1": "Hvernig á að breyta textaskeytum í Excel / CSV",
   "intro": "Yfirlestur and þýðing eru auðveldari í töflureikni. Flytja út textaskeyti í Excel eða CSV, breyta línu fyrir línu, og breyta síðan aftur — tímadálkar haldast sem texti, og línuskil innan samtals eru varðveitt.",
   "ctaText": "Opna töflubreytinn"
  },
  "body": [
   {
    "h2": "What this tool does :: Hvað þetta tól gerir",
    "ps": [
     "Textaskeyti eru línur af tilvísunum og töflureiknar eru línur af færslum — þegar það er komið í töflu er hægt að lesa yfir, skrifa athugasemdir og þýða í miklu magni með tækjum sem þú þekkir nú þegar. Báðar áttir eru studdar:"
    ]
   },
   {
    "h2": "Hlaða upp og velja átt",
    "ps": [
     "Dragðu skrá inn eða flettu upp í henni. Hver átt þarf mismunandi tegund af skrá: **í töflu** tekur við textaskráarskrám (SRT / VTT), **í textaskeyti** tekur við töflureikniskrám (CSV / Excel, bæði .xlsx og .xls). Veljið ranga stillingu og síðan segir síðan til um hvaða skráartegund sú stilling vill.",
     "⚠️ Þessi síða les aðeins UTF-8. Ef textaskeytið þitt opnast sem skjáfullt af spurningarmerkjum eða kassa, keyrðu það í gegnum [[Mojibake viðgerð|/repair.html]] fyrst — brotin kóðun lesast sem ekkert annað en skiptistafir hér."
    ],
    "img": {
     "file": "table-up",
     "alt": "Upphlaðsvæði töflubreytis: sleppisvæði og tveir stillirofar",
     "cap": "Hver stilling vill mismunandi skrá: textaskeyti inn, töflureiknir út — og til baka"
    }
   },
   {
    "h2": "Flytja út textaskeyti í töflu",
    "ps": [
     "Veldu „í töflu“, slepptu textaskeyti inn og forskoðunin telur upp alla tilvísun: vísir, upphaf, endir, texti. Tölfræðistikan gefur tilvísunarfjölda og heildarlengd. Ýttu síðan á „Hlaða niður Excel (.xlsx)“ eða „Hlaða niður CSV“.",
     "Munurinn á þessu tvennu: .xlsx er raunveruleg töflureikniskrá þar sem Excel getur ekki endursniðið tímadálkinn þinn á bak við þig; CSV er meðfærilegra, en Excel gætiúlkað tímadálkinn sem eitthvað annað þegar hann er opnaður. Ef það gerist skaltu velja tímadálkinn og setja snið hans á „Texti“ — eða nota bara .xlsx."
    ],
    "img": {
     "file": "table-prev",
     "alt": "Forskoðun töflu: vísir, upphaf, endir og textadálkar með tölfræðistiku",
     "cap": "Öll tilvísun forskoðuð; tölfræðistikan gefur tilvísunarfjölda og heildarlengd"
    }
   },
   {
    "h2": "Flytja töflu aftur inn í textaskeyti",
    "ps": [
     "Veldu „í textaskeyti“, slepptu töflunni inn og hér er dálkareglan: hún þarf þrjá dálka fyrir **upphaf, endi og texta** (enska hausar Start / End / Text virka líka), í **hvaða röð sem er**. `00:00:01,500` og `00:00:01.500` eru samþykkt bæði; línum sem ekki er hægt að þátta er sleppt í stað þess að dæma alla skrána.",
     "Niðurstaðan er skráð tilvísun fyrir tilvísun í forskoðuninni; staðfestu og hlaðið síðan niður SRT eða VTT. Ef þessa þrjá dálka vantar færðu skilaboð sem segja þér að athuga hausana — venjulega vegna þess að önnur nafnagjöf var notuð við útflutning, eða hausaröðin er ekki röð eitt."
    ],
    "img": {
     "file": "table-back",
     "alt": "Niðurstöðusvæði textaskeyta: innflutt textaskeyti skráð tilvísun fyrir tilvísun",
     "cap": "Óþekktir dálkar eru tilkynntir, aldrei þagnað yfir þeim"
    }
   },
   {
    "h2": "FAQ :: Spurt og svarað",
    "ps": [
     "**Sýnir Excel tímadálkinn rangt?** Notaðu .xlsx og það gerist aldrei. Ef þú verður að nota CSV: veldu tímadálkinn og stilltu reitasniðið á „Texti“ áður en hann er opnaður.",
     "**Þurfa dálkahausarnir að vera á ensku?** Nei. Start / End / Text eru þekkt á hvaða tungumáli sem þessi síða styður, og hástafir/lágstafir skipta ekki máli.",
     "**Eru línuskilin mín enn til staðar eftir innflutning?** Já. Línuskil innan samtals eru varðveitt, allt niður í upprunalegu umbúðirnar.",
     "**Er ASS styðjað?** Þessi síða meðhöndlar aðeins SRT og VTT. ASS ber stílleiðbeiningar — breyttu því í SRT með [[Sniðbreytir|/convert.html]] fyrst.",
     "**Hversu margar skrár í einu?** Ein. Til að vinna úr tugum eða hundruðum skaltu nota [[Lotubreytingu|/batch.html]] (sem breytir aðeins sniðum og fer ekki í gegnum töflu)."
    ]
   },
   {
    "h2": "Privacy :: Persónuvernd",
    "ps": [
     "Breitingin keyrir algjörlega í vafranum þínum. Ekkert textaskeyti er nokkurn tíma sent á netþjón."
    ]
   },
   {
    "h2": "Tengd tól og leiðbeiningar",
    "ps": [
     "Ef allt sem þú vilt er skrefið úr textaskeyti í Excel, sjá [[Breyta textaskeytum í Excel|/guides/srt-to-excel.html]]; til að þýða yfir á annað tungumál á eftir, [[Textaskeytaþýðing|/translate.html]]; tugir skráa í einu — [[Lotubreyting|/batch.html]]."
    ]
   }
  ]
 },
 "translate": {
  "seo": {
   "title": "Gervigreindartextaþýðing – hlaða upp í tvítyngdan útflutning – AI-SRTSub",
   "desc": "Þýddu textaskeyti með gervigreind: hlaðið upp SRT/VTT/ASS, veldu úr 100 tungumálum, sameina nöfn með orðalista, flytja út tvítyngd textaskeyti. Ókeypis að byrja, eigin API lykill studdur.",
   "h1": "Hvernig á að nota gervigreindartextaþýðingu",
   "intro": "Fullkomið verkflæði fyrir eina textaskeytisskrá, frá upphlaði í gegnum þýðingu í útflutning: hvað er á skjá, hvað á að smella á, og hvað þú færð í hverju skrefi.",
   "ctaText": "Opna þýðingartólið"
  },
  "body": [
   {
    "h2": "What this tool does :: Hvað þetta tól gerir",
    "ps": [
     "Þýðir textaskeyti frá einu tungumáli yfir á annað og flytur út tilbúna textaskeytisskrá. Dæmigerðar þarfir:"
    ]
   },
   {
    "h2": "Upload subtitles :: Hlaða upp textaskeytum",
    "ps": [
     "Smelltu á „Veldu textaskeytisskrá“ og límdu textaskeyti beint í innsláttarreitinn til vinstri. Sex snið eru studd: SRT, VTT, ASS, SSA, SBV og TXT. Engin skrá við höndina? Smelltu á „Hlaða sýnishorni“ til að sjá það í verki. Þegar búið er að þátta sýnir miðdálkurinn textaskeytatöflu með vísi, tímalínu og upprunatexta fyrir hverja færslu."
    ],
    "img": {
     "file": "translate-upload",
     "alt": "Innflutningssvæði þýðingartólsins: veldu textaskeytisskrá, límreitur og hlaða-sýnishorni hnappur",
     "cap": "Vinstri dálkur „Flytja inn textaskeyti“: veldu skrá, límdu texta eða hlaða sýnishorni"
    }
   },
   {
    "h2": "Veldu tungumál og stíl",
    "ps": [
     "„Upprunatungumál“ getur verið á sjálfvirkri greiningu; „marktungumálið“ er valið úr 100 tungumálum. Fimm þýðingarstílar eru í boði: Jafnvægi (sjálfgefið), Samtalsstíll, Formlegur fagstíll, Talsetningarstíll og Sérsniðinn. „Talsetningarstíll“ hentar kvikmynda- og sjónvarpssamtölum; „Formlegur fagstíll“ hentar heimildarmyndum og námskeiðum."
    ],
    "img": {
     "file": "translate-lang",
     "alt": "Stillingar á tungumáli og þýðingarstíl: upprunatungumál, marktungumálsfellingar og fimm stílar",
     "cap": "„Tungumál“ og „þýðingarstíll“: uppruni getur greint sjálfkrafa, 75 markmiðsval"
    }
   },
   {
    "h2": "Orðalisti: halda nöfnum samræmdum",
    "ps": [
     "Gervigreindin þýðir í lotum, þannig að sama nafn gæti komið út á tvö mismunandi vegu í mismunandi lotum. Skrifaðu „uppruni → verður að þýðast sem“ reglur í orðalistann; áður en hver lota skannar tólið hann og fylgir hverju samsvörun. Ein regla á línu; örvar geta verið `->`, `=>`, `→` eða Tab; stakur upprunatermín þýðir að halda honum óþýddum; nokkrar stafsetningar geta deilt einni útgáfu í gegnum `|`. Smelltu á „✨ AI útdráttur“ til að fá gervigreindina til að draga sérnöfnin úr myndbandinu í töfluna fyrst, breyttu síðan og þýddu."
    ],
    "img": {
     "file": "translate-glossary",
     "alt": "Orðalisti og sérnöfnasvæði: innsláttarreitur orðalista með gervigreindarútdrætti og vistunarhnöppum",
     "cap": "Orðalisti „sameinaðra nafna“: gervigreindar-útdregin sérnöfn, sjálfkrafa hlaðin fyrir ný myndbönd þegar þau eru vistuð"
    }
   },
   {
    "h2": "Þýðingarferlið",
    "ps": [
     "Smelltu á „▶ Byrja þýðingu“ á efstu stikunni. Miðtölfræðistikan sýnir færslur, þýddar, fylliefnihreinsaðar og setningarhópa yfir færslur í rauntíma; frammistöðustikan sýnir áætlaðan tíma sem eftir er og tákn sem notuð eru. Meðan þýðing fer fram skaltu smella á hvaða þýðingarreit sem er í töflunni til að breyta textanum — breytingar eru geymdar á tölvunni þinni og lifa af endurnýjun. Lokaðu síðunni í miðju ferli og þér verður boðið að halda áfram þar sem frá var horfið. Þegar ein setning nær yfir nokkrar færslur er hópurinn sameinaður, þýddur og endurfylltur eftir lengd."
    ],
    "img": {
     "file": "translate-workspace",
     "alt": "Þýðingarvinnusvæði: tölfræðistika, frammistöðustika og breytileg textaskeytatafla",
     "cap": "Miðvinnusvæði: tölfræðistika + frammistöðustika + smella-til-að-breyta textaskeytatöflu"
    }
   },
   {
    "h2": "Export :: Útflutningur",
    "ps": [
     "Í dálknum til hægri skaltu velja efnisformið fyrst: aðeins þýðing (eintyngd), tvítyngd með upprunalegu að ofan, eða tvítyngd með þýðingunni að ofan; síðan skráarsniðið: SRT, WebVTT, SBV, ASS eða TXT. Að velja ASS bætir við tveimur útlitum: skiptum efri/neðri skjáum og staflaðum neðri línum. Efni og snið sameinast frjálslega í 14 útflutningsstíla. Tvítyngd línuvídd er stillt sérstaklega. Smelltu á „Hlaða niður textaskeytum“ til að vista skrána, eða „Afrita á klippiborð“ til að líma hana beint inn."
    ],
    "img": {
     "file": "translate-export",
     "alt": "Útflutningsspjald: þrjú efnisform, fimm skráarsnið og stillingar á tvítyngdri línuvídd",
     "cap": "Útflutningur í hægri dálki: veldu efnisformið fyrst, síðan skráarsniðið"
    }
   },
   {
    "h2": "Cost and privacy :: Kostnaður og persónuvernd",
    "ps": [
     "Sjálfgefna líkanið þarf enga skráningu og engan lykil — það virkar beint úr kassanum með kvótum á hverja beiðni: daglegt þak á hverja IP-tölu auk daglegrar heimildar fyrir alla síðuna. Fyrir stórar lotur skaltu slá inn þinn eigin API lykil undir „Þýðingarvél“. Persónuvernd, samkvæmt tilkynningu á síðunni: textaskeyti fyrir sjálfgefna líkanið eru send í gegnum netþjón þessarar síðu til þjónustuveitunnar; sérsniðið API er meðhöndlað beint af þjónustuveitunni sem þú slærð inn og lykillinn er í vafranum þínum. Þáttun, línuskipting og tvítyngt útlit keyra öll staðbundið í vafranum."
    ]
   },
   {
    "h2": "FAQ :: Spurt og svarað",
    "ps": [
     "**Önnur tungumál blönduðust í þýðinguna?** Tólið greinir tungumálsreiki og þýðir aftur sjálfkrafa; ef nokkrar færslur líta enn rangt út skaltu smella á reitinn og laga þær í höndunum.",
     "**Hvað með textalínur laga?** „Efnisarsía“ býður upp á þrjá valkosti fyrir lög: þýða textana, halda upprunalegu eða eyða þeim.",
     "**Ósamræmdar þýðingar á nöfnum?** Bættu ósamræmdu stafsetningunum við orðalistann og þýddu aftur; orðalistinn gengur framar almennri „sérnöfnumeðhöndlunar“-stillingu.",
     "**Viltu ensku að ofan og kínversku að neðan?** Veldu „Tvítyngt · upprunalegt að ofan“ við útflutning; fyrir kínversku að ofan og ensku að neðan skaltu velja „Tvítyngd · þýðing að ofan“."
    ]
   },
   {
    "h2": "Tengd tól og leiðbeiningar",
    "ps": [
     "Rangt snið? Byrjaðu á [[sniðbreytingu|/convert.html]]; tímalína skökk? Notaðu [[tímalínustillingu|/shift.html]]; áður en þú afhendir það skaltu keyra það í gegnum [[textaskeytagæðaeftirlitið|/guides/subtitle-quality-check.html]]."
    ]
   }
  ]
 },
 "translate-english-to-chinese": {
  "seo": {
   "title": "Þýða ensk textaskeyti yfir á kínversku – AI-SRTSub",
   "desc": "Þýðing enskra textaskeyta yfir á kínversku: hlaðið upp SRT/VTT/ASS, veldu einfaldaða eða hefðbundna, og flyttu út kínversk-einungis eða tvítyngd textaskeyti. – AI-SRTSub",
   "h1": "Þýða ensk textaskeyti yfir á kínversku",
   "intro": "Ensktt SRT inn, kínversk (eða ensk-kínversk tvítyngd) textaskeyti út: hlaða upp, velja marktungumál, flytja út — allt á einni síðu.",
   "ctaText": "Þýða ensk textaskeyti"
  },
  "body": [
   {
    "h2": "When you need it :: Þegar þú þarft á því að halda",
    "ps": [
     "Textaskeytið sem þú hleður niður er eingöngu á ensku og þú nærð ekki að fylgjast með; eða þú vilt kínversk textaskeyti fyrir fjölskyldumeðlimi sem lesa ekki ensku. Það sem þú þarft kemur í einu af þremur formum — **eingöngu kínversk textaskeyti**, eða tvítyngd textaskeyti með **kínversku að ofan, ensku að neðan** eða **ensku að ofan, kínversku að neðan** — og þetta tól skilar öllum þremur."
    ]
   },
   {
    "h2": "How to do it :: Hvernig á að gera það",
    "ps": [
     "Opnaðu [[Gervigreindartextaþýðinn|/translate.html]] og slepptu ensku textaskeytisskránni þinni (SRT, VTT, ASS, SSA, SBV og TXT eru öll þekkt, eða límdu bara textann). Skildu eftir „Upprunatungumál“ á sjálfvirkri greiningu, stilltu „Marktungumál“ á einfaldaða eða hefðbundna kínversku og smelltu á „▶ Byrja þýðingu“. Þegar því er lokið skaltu velja efnisform á útflutningsspjaldinu til hægri: aðeins þýðing (eintyngd), tvítyngd · upprunalegt að ofan (enska fyrir ofan, kínverska fyrir neðan), eða tvítyngd · þýðing að ofan (kínverska fyrir ofan, enska fyrir neðan), veldu síðan skráarsnið og hlaðið niður."
    ],
    "img": {
     "file": "translate-export",
     "alt": "Útflutningsspjald: aðeins þýðing, tvítyngd með upprunalegu að ofan, og tvítyngd með þýðingu að ofan",
     "cap": "Veldu efnisformið við útflutning: aðeins kínverska, eða enska-efst / kínverska-efst tvítyngd"
    }
   },
   {
    "h2": "Two common problems :: Tvö algeng vandamál",
    "ps": [
     "**Nöfn þýdd á ósamræmdan hátt?** Gervigreindin þýðir í lotum, þannig að sama nafn getur komið út á tvívegu. Settu „uppruni → þýtt nafn“ pör í orðalistann (t.d. `Watson → Huasheng`) til að hafa það samræmt í gegnið.",
     "**Textaskeyti reika frá myndinni?** Þýddu fyrst, lagaðu tímasetninguna svo: tímalínutækjastikan efst á vinnuborðinu er með alþjóðlega hliðrun og stærðarstýringu — sjá [[Textaskeyti reika úr samstillingu í lokin|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "videosub": {
  "seo": {
   "title": "Útdráttur innbúinna myndbandstextaskeyta – MKV / MP4 spor – AI-SRTSub",
   "desc": "Lestu textaskeytasporin inni í MKV, WebM, MP4 og MOV beint út og flyttu út SRT / VTT / ASS / TXT. Ekkert upphlað, engin umkóðun, hvert tungumálaspor skráð, myndtextaskeyti merkt sérstaklega.",
   "h1": "Hvernig á að draga út textaskeyti sem eru inni í myndbandi",
   "intro": "Lestu textaskeytasporið sem er lokað inni í MKV / MP4 beint út sem SRT — myndbandinu er aldrei hlaðið upp, það er allt lesið í vafranum.",
   "ctaText": "Opna útdrátt myndbandstextaskeyta"
  },
  "body": [
   {
    "h2": "What this tool does :: Hvað þetta tól gerir",
    "ps": [
     "Textaskeyti geta verið innsigluð inni í myndbandsskrá í stað þess að standa ein og sér. Til að breyta, þýða eða para þau þarftu fyrst að ná þeim út — það er það eina sem þessi síða gerir."
    ]
   },
   {
    "h2": "1 Add the video :: 1 Bæta við myndbandinu",
    "ps": [
     "Dragðu myndbandsskrá í fyrsta dálkinn eða smelltu til að velja eina. Aðeins **MKV / WebM** og **MP4 / MOV** eru þekkt; önnur snið gefa af sér ekkert spor.",
     "Skráin yfirgefur aldrei tölvuna þína — það er ekkert upphlaðsskref. Tólið les í litlum bútum eftir hliðrun, þannig að fjögurra gígabæta mynd fyllir ekki minnið, en fyrsta lesturinn þarf að skanna í gegnum sporiðlýsinguna einu sinni."
    ],
    "img": {
     "file": "videosub-up",
     "alt": "Viðbótarmyndbandssvæði innbúnu textaskeytaútdráttarsíðunnar",
     "cap": "MKV / WebM og MP4 / MOV eru studd, og skráin yfirgefur aldrei vélina þína"
    }
   },
   {
    "h2": "2 Innbúnu textaskeytasporin",
    "ps": [
     "Þegar lestrinum lýkur telur annar dálkurinn upp textaskeytasporin í skránni **eitt á hverja línu**, venjulega með tungumáli og spornafni (til dæmis „kínverska“, „enska“, „skyldubundið“). Smelltu á línu til að draga það spor út.",
     "Þegar skráin heldur aðeins einu textaskeytaspori byrjar útdráttur sjálfkrafa — enginn smellur þarf.",
     "**Ekki er hægt að draga út myndtextaskeyti**: Blu-ray PGS og DVD textaskeyti eru myndir brenndar inn í streymið án texta til að taka, og síðan segir það skýrt; þau þurfa sjónræna stafgreiningu (OCR)."
    ],
    "img": {
     "file": "videosub-track",
     "alt": "Listinn yfir innbúnu textaskeytasporin, eitt á hverja línu",
     "cap": "Eitt spor á hverja línu; þegar það er bara eitt byrjar útdráttur sjálfkrafa"
    }
   },
   {
    "h2": "3 The result :: 3 Niðurstaðan",
    "ps": [
     "„3 Niðurstaða“ hægra megin sýnir útregna textaskeytatextann, með útflutningssniðinu fyrir ofan hann: **SRT / VTT / ASS / TXT**. Smelltu á „Hlaða niður“ eða „Afrita“.",
     "Þegar upprunasporið er ASS kemur eigin stílhaus þess og upplausn óbreytt til baka — að flytja út sem ASS varðveitir þau, en að flytja út sem SRT flytur aðeins textann."
    ],
    "img": {
     "file": "videosub-out",
     "alt": "Niðurstöðusvæðið með valinu á SRT / VTT / ASS / TXT sniði",
     "cap": "Fögur útflutningssnið; ASS uppruni heldur stílhausi sínum og upplausn"
    }
   },
   {
    "h2": "Hvað er látið óhreyft",
    "ps": [
     "Myndbandsskráinni sjálfri er ekkert snert við — aðeins lesið, engin skrift, engin umkóðun, engin endurpökkun.",
     "Innihald textaskeyta kemur út eins og það er: engin kóðunargiskun, engin tímalínuleiðrétting. Ef útregnu textaskeytin eru röng er það kóðunarvandamál í upprunasporinu — farðu með það í [[Skemmdra texta viðgerð|/repair.html]]."
    ]
   },
   {
    "h2": "Common questions :: Algengar spurningar",
    "ps": [
     "**Er sannarlega engin leið til að meðhöndla myndtextaskeyti (PGS / DVD)?** Ekki á þessari síðu — þetta eru myndir án textalags. OCR þarf að koma fyrst, og þessi síða gerir það ekki.",
     "**Útregnu textaskeytin eru rangt tímasett — af hverju?** Þessi síða lagar ekki tímalínur; það sem kemur út er það sem var þar. Fyrir alþjóðlega hliðrun eða hlutfallsvandamál skaltu nota [[Tímalínustillingu|/shift.html]].",
     "**Af hverju tekur það svona langan tíma áður en eitthvað gerist?** Stóra skrá þarf að skanna búts í bút fyrir sporupplýsingar, og því stærri sem skráin er því lengri tíma tekur það; þetta gerist staðbundið og hefur ekkert að gera við tenginguna þína.",
     "**Get ég notað þessa síðu fyrir utanaðkomandi textaskeytisskrár?** Þú þarft þess ekki — ytri .srt / .ass fer beint inn í [[Sniðbreytingu|/convert.html]] eða annað tól. Þessi síða er fyrir textaskeyti sem eru innsigluð inni í myndbandi."
    ]
   },
   {
    "h2": "Privacy :: Persónuvernd",
    "ps": [
     "Myndbandið er lesið að fullu í vafranum: ekkert er hlaðið upp, ekkert er umkóðað, ekkert fer í gegnum netþjón. Lokaðu síðunni og gögnin sem voru lesten eru losuð."
    ]
   },
   {
    "h2": "Tengd tól og leiðbeiningar",
    "ps": [
     "Til að þýða það sem þú dregur út skaltu fara í [[Textaskeytaþýðingu|/translate.html]], til að gera það tvítyngd sjá [[Tvær leiðir til að búa til tvítyngd textaskeyti|/guides/make-bilingual-subtitles.html]]; um muninn á innbúnum og ytri sporum, og hverjum hægt er að draga út, sjá [[Hvernig á að ná textaskeytum úr myndbandi|/guides/extract-subtitles-from-video.html]]."
    ]
   }
  ]
 },
 "vtt-to-srt": {
  "seo": {
   "title": "VTT í SRT breytir – Breyta WebVTT textaskeytum – AI-SRTSub",
   "desc": "Breyta VTT (WebVTT) textaskeytum í SRT fyrir ritstjóra og spilara sem taka aðeins SRT. WEBVTT hausinn og NOTE blokkir eru hreinsaðar upp sjálfkrafa. Keyrir í vafranum þínum.",
   "h1": "VTT to SRT :: VTT í SRT",
   "intro": "Breyta VTT (WebVTT) textaskeytum í SRT: slepptu skránni, veldu SRT, hlaðið niður. Hausinn og athugasemdarblokkir eru hreinsaðar upp og tímatöflur fara aftur í kommutáknmál.",
   "ctaText": "Convert VTT → SRT :: Breyta VTT → SRT"
  },
  "body": [
   {
    "h2": "Þegar þú þarft SRT til baka",
    "ps": [
     "CapCut, Premiere, flestir skjáborðsspilarar og eldri textaskeytatól samþykkja aðeins **SRT**. Textaskeyti sem hlaðið er niður af vefnum eða af YouTube koma venjulega sem VTT — breyttu þeim í SRT til að flytja beint inn."
    ]
   },
   {
    "h2": "Hvað er hreinsað úr VTT",
    "ps": [
     "**WEBVTT hausalínan**, NOTE blokkir, STYLE/REGION blokkir og tilvísunarstillingar eftir tímalínuna (eins og align:start) eru ekki textaskeyti texti — þeim er sleppt sjálfkrafa; númering er endurheimt og millisekúnduskiljan fer aftur úr punkti í kommu."
    ],
    "img": {
     "file": "convert-upload-vtt",
     "alt": "Upphlaðsvæði: VTT skrá hlaðin, greind sem VTT",
     "cap": "Skrá með WEBVTT haus er greind sem VTT strax"
    }
   },
   {
    "h2": "How to convert :: Hvernig á að breyta",
    "ps": [
     "Opnaðu [[breytinn|/convert.html]], slepptu VTT inn, veldu **SRT - SubRip** sem úttak, breyttu síðan og hlaðið niður. Texti og tímasetningargildi haldast óhreyfð."
    ],
    "img": {
     "file": "convert-result-srt",
     "alt": "Breytilegri niðurstaða: SRT númering með kommublaðstímum",
     "cap": "Breytta SRT: tilvísunarnúmer + kommublaðstímar"
    }
   }
  ]
 }
};
