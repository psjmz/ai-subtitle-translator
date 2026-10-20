/* i18n/gd-so.js —— 43 篇指南页的so译文（由 _mkgd.js 生成，勿手改）
 * 源：_gd/so.json（Gemini 翻译，_gemgd.js 产出）
 * 结构：{ <slug>: { seo:{title,desc,h1,intro,ctaText}, body:[{h2,ps[],img}] } }
 * ⚠️ server.js 自己 require 它，不被任何 html 引用 —— 部署时必须显式加进传输列表。
 */
module.exports = {
 "ass-to-srt": {
  "seo": {
   "title": "Beddelaha ASS ilaa SRT – Beddel Qoraallada Hoose ee ASS/SSA – AI-SRTSub",
   "desc": "U beddel qoraallada hoose ee ASS (iyo SSA) qaabka caadiga ah ee SRT: qoraalka iyo waqtigu waa sidoodii ayay u baxayaan, summadaha qaabeynta ayaanaharaya. Barnaamijyada taageera SRT kaliya. Wuxuu ka shaqeeyaa biraawsarkaaga.",
   "h1": "ASS ilaa SRT",
   "intro": "Qoraallada hoose ee ASS (ama SSA) u beddel SRT: soo jiid faylka, dooro SRT, deji. Qoraalka iyo waqtigu waa sidoodii ayay u baxayaan; summadaha qaabeyntu ma guurayaan.",
   "ctaText": "Beddel ASS → SRT"
  },
  "body": [
   {
    "h2": "Markaad u baahan tahay in lagu celiyo SRT",
    "ps": [
     "Qalabka tafatirka, qalabka TV-yada, iyo xirmooyinka turjumaadda — qeybo badan oo soo socda waxay aqbalaan **SRT** keliya. Qaabeynta iyo meelaynta quruxda badan ee ASS wax macno ah ugu fadhin maayaan halkaas, markaa SRT caadiga ah waa habka ugu nabdoon."
    ]
   },
   {
    "h2": "Waxa ku dhaca summadaha qaabeynta",
    "ps": [
     "Qeyb kasta oo ASS ah waa sadar wadahadal ah oo qoraalkiisuna inta badan wata summadaha dulsaarka sida `{\\fonts}` ee midabka, dhaqdhaqaaqa, ama saamaynta. U beddelashada SRT **waxay meesha ka saaraysaa summadahan iyo qaabeyntii**, iyada oo ilaalinaysa qoraalka iyo waqtiga keliya; `\\N` jebinta sadarradu waxay noqdaan jebin sadar oo dhab ah. Faylasha SSA sidoo kale waa la akhrin karaa."
    ],
    "img": {
     "file": "convert-result-srt",
     "alt": "Natiijada beddelka: Lambarka SRT iyo qoraalka laga soo saaray ASS",
     "cap": "SRT-ga la soo saaray: hal lambar oo loogu talagalay qayb kasta, qoraal nadiif ah"
    }
   },
   {
    "h2": "Sida loo beddelo",
    "ps": [
     "Fur [[converter|/convert.html]], geli faylka ASS (.ssa sidoo kale waa uu shaqeeyaa), dooro **SRT - SubRip** sida wax-soosaarka, ka dib beddel oo soo deji. Ma rabtaa dhinaca kale? Eeg [[SRT to ASS|/guides/srt-to-ass.html]]."
    ]
   }
  ]
 },
 "batch": {
  "seo": {
   "title": "Sida loo Beddelo Qoraallada Hoose ee Xirmada – Boqolaal ilaa Hal ZIP – AI-SRTSub",
   "desc": "Hagaha: ku tuur daraasiin faylal ah oo SRT/VTT ah, ugu beddel hal qaab, soo deji hal ZIP ah. Tirada dib ayaa loo nidaamiyay, waqtiga waa la caadiyeeyay, faylasha aan la aqoon waa la calaamadiyay halkii ay si dhuumasho ah ugu dhex dhuuman lahaayeen kaydka.",
   "h1": "Sida loo beddelo qoraallada hoose ee xirmada",
   "intro": "Xil xilliyeed oo dhan oo ah qoraallo hoose caadi ahaan waa inay ku dhammaadaan hal qaab, soo gelintooda mid mid waxay qaadataa waqti dheer. Dhammaantood halkan ku tuur, isla wadajir u beddel oo soo deji hal ZIP — faylasha aan la akhrin karin waa la calaamadiyaa, weligoodna si aamusnaan ah looma daro sidii iyagoo shaqeeyay oo kale.",
   "ctaText": "Fur beddelka xirmada"
  },
  "body": [
   {
    "h2": "Waxa qalabkani sameeyo",
    "ps": [
     "Qoraallada hoose ee xilli dhan ama xirmo sanduuq ah caadi ahaan waxay u baahan yihiin inay noqdaan kuwo siman ka hor intaan wax kale lagu samayn. Waa kan waxa bogga xirmadu sameeyo:"
    ]
   },
   {
    "h2": "Ku darida faylasha",
    "ps": [
     "Jiid dhawr fayl oo qoraallo hoose ah sanduuqa dhibcaha leh adigoo wada jira, ama guji oo dooro wax ka badan hal mar oo ah hal mar. Liiska faylalku wuxuu muujinayaa mid walba: faylasha la aqoonsaday waxay muujinayaan tiradooda, kuwa aan la aqoonsan waxaa lagu calaamadiyaa si fudud inaan la aqoon. Xariiqda sare waxay soo koobeysaa tirada faylasha, tirada qaybaha, iyo inta aan la aqoonsan.",
     "⚠️ Boggani wuxuu akhriyaa UTF-8 keliya. Wax kasta oo leh sir-jebin jabtay (shaashad buuxda oo calaamado su'aal ah ama sanduuqyo ah) waa inay marka hore dhex maraan [[Mojibake repair|/repair.html]]."
    ],
    "img": {
     "file": "batch-list",
     "alt": "Liiska faylasha: magaca iyo tirada qaybaha fayl kasta, kuwa aan la aqoonsan oo lagu calaamadiyay casaan",
     "cap": "Fayl kasta oo la liis gareeyay, iyo kuwa aan la aqoonsan oo meesha lagu calaamadiyay"
    }
   },
   {
    "h2": "Waxa wax walba loo beddelayo",
    "ps": [
     "Dooro qaabka loo socdo ee hoos yimaada \"Convert all to\" — SRT ama VTT. Fayl kasta oo liiska ku jira ayaa markaa dib loogu abuuraa qaabkaas: lambarrada qaybaha dib ayaa looga soo billaabayaa kor, waqtiga ayaa loo caadiyeeyay bartilmaameedka (SRT waxay ku kala saartaa millisebisyada comma, VTT-na barta).",
     "**Magacyada asliga ah waa la hayaa oo kaliya kordhinta ayaa isbedesha**; magacyada nuqulka ah waxay helayaan lambar lagu daray si uusan wax walba u tirtirin."
    ],
    "img": {
     "file": "batch-up",
     "alt": "Doorta qaabka bartilmaameedka iyo xaaladda liiska, iyadoo baraha tirakoobku muujinayaan tirada faylasha iyo qaybaha",
     "cap": "Dooro qaab bartilmaameed ah oo fayl kastaa dib buu u abuurmayaa; magacyada faylasha kaliya waxay beddelaan kordhinta"
    }
   },
   {
    "h2": "Xirxirida iyo soo dejinta",
    "ps": [
     "Guji \"Pack into one ZIP and download\" oo kaydku wuxuu ka kooban yahay fayl kasta oo la beddelay. **Faylasha aan lahayn qaybo la aqoonsan karo dibadda ayay joogayaan** — waxay ku jiraan liiska, iyagoo calaamadsan, halkii lagu dhex dari lahaa sidii iyagoo guuleystay. Marka la xirxiro, waxaad helaysaa tirada faylasha ku jira gudaha."
    ],
    "img": {
     "file": "batch-zip",
     "alt": "Aagga xirxirida: badhanka soo dejinta ZIP iyo fariinta natiijada xirxirida",
     "cap": "Faylasha aan la aqoonsan waxay ka baxsan yihiin kaydka waxayna ku jiraan liiska iyagoo calaamadsan"
    }
   },
   {
    "h2": "Sababta faylka loogu calaamadiyo mid aan la aqoonsan",
    "ps": [
     "Faylka waxaa loo calaamadiyaa mark aan la akhrin karin wax qaybo ah. Saddex sababood oo caadi ah: ma aha qoraal hoose haba yaraatee (yacni akhristaha .txt ee leexsan), koodhku ma aha UTF-8 (markaa wuxuu u akhriyaa sidii calaamado beddel ah kaliya), ama waxa ku jira waa la simay oo hal baloog ah oo aan lahayn waqtiyo.",
     "Faylasha calaamadsan waxaa lala tacaali karaa mid mid: dhibaatooyinka koodhka waxay aadaan [[Mojibake repair|/repair.html]], dhibaatooyinka qaabka waxay aadaan [[Format converter|/convert.html]] si loogu beddelo hal kelinimo ah ka hor inta aan dib loogu celin liiska."
    ]
   },
   {
    "h2": "Su'aalaha Badanaa La Is Weydiiyo",
    "ps": [
     "**Immisa fayl baan ku dari karaa?** Ma jiro xad adag; waxay ku xidhan tahay xusuusta biraawsarkaaga, boqolaal fayl oo SRT ahna inta badan way fiican yihiin.",
     "**Ma beddelaa wadahadalkayga?** Maya. Beddelka xirmadu wuxuu beddelaa qaabka weelka kaliya — dib u tirinta qaybaha iyo caadiyeynta waqtiga — weligoodna eray wadahadal ah ma taabto.",
     "**Ka waran haddaan u baahahay inaan beddelo waxa ku jira?** Boggani wuxuu beddelaa qaababka kaliya. Si aad waqtiga u beddesho si wadajir ah isticmaal [[Timing adjustment|/shift.html]]; si aad erayada u beddesho isticmaal [[Term replacement|/glossary.html]]; labaduba waxay u shaqeeyaan fayl ilaa fayl.",
     "**Ma la taageeraa ASS?** Boggani wuxuu u beddelaa int u dhaxaysa SRT iyo VTT kaliya. ASS waxay wadataa qaabayn — isticmaal [[Format converter|/convert.html]] si gooni ah ugu samee."
    ]
   },
   {
    "h2": "Asturnaanta",
    "ps": [
     "Beddelka iyo xirxiriddu waxay gebi ahaanba ka shaqeeyaan biraawsarkaaga gudihiisa. Wax nuxur ah oo qoraal hoose ah marna lama garab maro ama looma diro server."
    ]
   },
   {
    "h2": "Qalabka iyo hagayaasha la xiriira",
    "ps": [
     "Waxa la beddelayo xilli dhan iyo siday u kala horreeyaan — [[Batch editing a whole season of subtitles|/guides/batch-convert-srt.html]]; qaabab badan oo loogu talagalay hal fayl — [[Format converter|/convert.html]]; caddaynta miiska dhexdiisa — [[Subtitle ⇄ table|/table.html]]."
    ]
   }
  ]
 },
 "batch-convert-srt": {
  "seo": {
   "title": "Tafatirka Xirmada ee Xilli Dhan – Maxaa Shisheeya, Maxaa Aan Shisheynin – AI-SRTSub",
   "desc": "Xilligu badanaa wuxuu u baahan yahay isbeddel isku mid ah meel kasta: qaabka siman, waqtiga la leexiyay, erey-bixin. Waa kan waxa ku dhammaada hal tallaabo, waxa aan dhici karin, iyo sida loo maareeyo faylasha fashilmay in la akhriyo.",
   "h1": "Sida loo tafatiro xilli dhan oo qoraallo hoose ah",
   "intro": "Marka daraasiin faylal ah oo qoraallo hoose ah ay u baahan yihiin in la beddelo, badanaa waa isbeddel isku mid ah mar kasta. Ogaanshaha qaybaha la qaban karo hal tallaabo waxay badbaadinaysaa waqti badan halkii laga dhex shaqayn lahaa mid mid.",
   "ctaText": "Fur beddelka xirmada"
  },
  "body": [
   {
    "h2": "Badanaa waa isbeddel isku mid ah meel kasta",
    "ps": [
     "Marka qoraallada hoose ay qaldamaan xilli dhan, dhacdo kasta dhif ayey leedahay dhibaato gaar ah oo iyada u gaar ah — badanaa waa hal sabab oo gaarta dhacdo kasta: kooxda siideynta oo wada kodhisay dhammaantood (markaa qaabka iyo summadaha biyuhu waa isku mid), dhammaantood waxaa loo waqtigay nooca fiidiyowga ah ee la mid ah (markaa jihada iyo xaddiga leexashada waa isku raacsanyihiin), ama turjumaadaha ayaa kala tagay xilliga oo dhan.",
     "Marka hore hubi laba dhacdo — mid hore, mid dambe — oo xaqiiji inuu dhab ahaantii yahay **dhibaatada isla mid ah** ka hor intaanad waxba xirmayn. Haddii labada ay is diidaan, tani ma aha wax ay xirxiriddu hagaajin karto."
    ]
   },
   {
    "h2": "Waxa lagu samayn karo hal tallaabo",
    "ps": [
     "**Mideynta qaabka** waa waxa kaliya ee dhab ahaantii ku dhammaada hal tallaabo: jiid daraasiin faylal ah oo SRT iyo VTT ah oo ku dar [[Batch conversion|/batch.html]] si wadajir ah, dooro qaabka bartilmaameedka oo soo deji hal ZIP. Dib u tirinta iyo caadiyeynta waqtiga waxay ka dhacaan isla tallaabadaas, mana jirto hal eray oo wadahadal ah oo isbeddelaya."
    ],
    "img": {
     "file": "batch-list",
     "alt": "Liiska faylasha bogga xirmada: tirada qaybaha fayl kasta, kuwa aan la aqoonsan oo lagu calaamadiyay casaan",
     "cap": "Qaabka siman waa waxa keliya ee dhab ahaantii ku dhammaada hal tallaabo"
    }
   },
   {
    "h2": "Waxa lagu qasban yahay in loo sameeyo fayl ilaa fayl",
    "ps": [
     "Kuwani ma laha meel laga soo galo xirmada waxayse u baahan yihiin hal tallaabo fayl kasta — inkastoo badanaa uu jiro mid la mid ah oo **hal mar keliya la qabto kadibna khuseeya xilliga oo dhan**:"
    ]
   },
   {
    "h2": "Hel kala horreynta saxda ah",
    "ps": [
     "Marka dhowr waxyalo ay u baahan yihiin in la qabto, kala horreynta khaldani waxay la macno tahay in dib loo shaqeeyo. Sidan u kala horree\":",
     "**Hagaaji koodhka** → **midee qaabka** → **beddel waxa ku jira** (summadaha biyaha, erey-bixinta, waqtiga) → **QC ugu dambayn**. Beddelka qaababka ka hor intaan la hagaajin koodhka waxay ku siinaysaa mojibake weel kale ah; beddelka waxa ku jira ka hor intaan qaababka la mideyn waxay la macno tahay ka shaqaynta taageerada qalab ee aan is waafaqsanayn."
    ],
    "img": {
     "file": "batch-zip",
     "alt": "Aagga xirxirida: badhanka soo dejinta ZIP iyo fariinta natiijada",
     "cap": "Mideey qaababka marka hore, beddel waxa ku jira kadib"
    }
   },
   {
    "h2": "Maareynta faylasha aan la aqoonsan",
    "ps": [
     "Faylasha lagu calaamadiyay inay yihiin kuwa aan la aqoonsan ee beddelka xirmada waxaa laga reebay ZIP-ka waxayna ku jiraan liiska. Saddex sababood oo caadi ah: ma aha fayl qoraal hoose ah (fayl akhris oo leexsan), koodhku ma aha UTF-8, ama waxa ku jira waxaa lagu simay hal baloog oo aan lahayn waqtiyo.",
     "Dhibaatooyinka koodhka waxay aadaan [[Mojibake repair|/repair.html]] si gooni ah; dhibaatooyinka qaabka waxay aadaan [[Format converter|/convert.html]] ka hor intaan dib loogu celin liiska. **Ha ku qasbin faylasha aan la aqoonsan inay galaan kaydka si aad u kordhiso tirada** — helitaanka dhacdo maqan ee ciyaartoygaaga waxay ku kacaysaa wax badan oo ka badan daqiiqadda tani ay badbaadinayso."
    ]
   },
   {
    "h2": "Qalabka iyo hagayaasha la xiriira",
    "ps": [
     "Hagaha xirmada buuxa — [[How to batch convert subtitles|/guides/batch.html]]; leexashada waqtiga ee siman — [[How to adjust subtitle timing|/guides/shift.html]]; tallaabada ugu dambaysa ka hor intaan la dhiibin — [[Subtitle QC|/qc.html]]."
    ]
   }
  ]
 },
 "bilingual": {
  "seo": {
   "title": "Sida loo Kala-saaro ama Loo Isku-daro Qoraallada Hoose ee Labo-luuqadle ah – AI-SRTSub",
   "desc": "Afar hab oo looga saaro qoraallada hoose ee labo-luuqadlaha ah: hayso hal jid keliya, u kala saar laba fayl, ama ku biiri hal gelis laba-sadar ah. Labada noocba waa la aqoonsadaa, biraawsarkaaga gudihiisa.",
   "h1": "Sida Looga Saaro Qoraallada Hoose ee Labo-luuqadlaha ah",
   "intro": "Ma rabtaa inaad u kala saarto qoraallada hoose ee labo-luuqadlaha ah, inaad isku darto, ama aad hayso hal jid keliya? Hagahan wuxuu ku socdaa afarta hab: sida aqoonsigu u shaqeeyo, habka la dooranayo, iyo waxaad helayso marka la dhoofinayo.",
   "ctaText": "Fur Qalabka Kala-saarka Qoraallada Hoose ee Labo-luuqadlaha ah"
  },
  "body": [
   {
    "h2": "Waxa Qalabkani U Adeegayo",
    "ps": [
     "Waxaad leedahay qoraallo hoose oo labo-luuqadle ah laakiin waxaad rabtaa hal jid oo keliya — ama si kale, waxaad rabtaa inaad kala saarto ama isku darto labada jid:"
    ]
   },
   {
    "h2": "Sida uu u Aqoonsado Waxyaabaha Labo-luuqadlaha ah",
    "ps": [
     "Qoraallada hoose ee labo-luuqadlaha ah ee jidka laba-geesoodka ah waxay ku yimaadaan laba nooc oo caadi ah, qalabkuna wuxuu aqoonsadaa mid kasta — **iyadoo aan la qiyaasin luqadda**: **Nooca A (hal gelis, laba sadar)** waxay u kala saartaa jidadka nidaamka qoraalka — kana, hangul, hanzi, Laatiin iyo nidaamyo kale, toban guud ahaan; laba nidaam oo kala duwan waxay ka dhigan yihiin labo-luuqadle, mid kasta oo soo baxa marka horena wuxuu u tirsadaa sidii asalka ahaa. Nidaam keliya (sida sadar Shiine ah oo dheer oo laba loo duuduubay, tusaale ahaan) waxaa loola dhaqmaa sida hal-luuqad leh oo waa la hayaa sida ay tahay. **Nooca B (laba gelis oo kala gooni ah oo leh wakhti isku mid ah)** wuxuu u kala saartaa jidadka boosaska — labada gelis ee wakhtiga isla eg waxay samaraan lamaane, kan koowaad wuxuu u tirsadaa sida asalka ah, iyo isku-darka la wadaaga alifbeetada Laatiinka, sida Ingiriisi-Faransiis ama Ingiriisi-Jarmal, waa la kala saaraa si sax ah sidoo kale. Mark aan la ogaanin wax nuxur labo-luuqadle ah, dooraha habka iyo badhanka Bilowga waa la cirroeyey iyadoo la socoto ogeysis cad, marka marnaba kuma qasbo inay u kala baxaan natiijooyin khaldan."
    ]
   },
   {
    "h2": "Afarta Hab",
    "ps": [
     "Dooro mid ka mid ah afarta sanduuqa hoos u dhaca ah ee “Waatee midka aad rabtaa?”: **Hayso asalka keliya** iyo **Hayso turjumaadda keliya** mid kasta waxay soo saartaa hal fayl; **U kala saar laba** waxay soo saartaa fayl asal ah iyo fayl turjumaad ah, iyadoo magacyada faylasha ay si otomaatig ah u calaamadsan yihiin `.orig` / `.dst` si looga hortago in la dul-qoro; **Isku-dar oo ka dhig hal gelis laba-sadar ah** waxay u rogeshaa lammaane kasta gelis labo-luuqadle ah — asalkii oo ku yaal hal sadar, turjumaaddii oo ku taal midka kale — halka lammaanayaasha hal-luuqad leh la hayo sida ay yihiin mana jiro sadar labaad oo la ikhtiraacay. Markaad beddesho hababka ama qaababka wax-soosaarka, nuxurka jira wuxuu si otomaatig ah u socodsiiyaa mar labaad — uma baahna in la gujiyo Bilow markale."
    ],
    "img": {
     "file": "bilingual-modes",
     "alt": "Xulashada habka ee kala-saaraha labo-luuqadlaha ah: hayso asalka, hayso turjumaadda, u kala saar laba, ku biiri hal gelis laba-sadar ah",
     "cap": "Afar hab: hayso hal jid, u kala saar laba, ama ku biiri hal gelis laba-sadar ah"
    }
   },
   {
    "h2": "Gelinta iyo Soo-saarka",
    "ps": [
     "Wuxuu akhriyaa toddobo qaab — SRT, VTT, ASS, SSA, SBV, LRC, TXT (kordhinta faylka marka hore, ururinta nuxurka sida kaydka ah) — wuxuuna dhoofiyaa afar: SRT, VTT, ASS, TXT. Isku-darka gelinta-iyo-soo-saarka kasta wuu shaqeeyaa, markaa beddelka qaab-ilaa-qaab wuxuu dhacaa inta lagu jiro socodka. ASS `\\N` jebinta sadarradu waa la soo celiyaa oo waxay noqdaan jebinta sadar ee dhabta ah, summaddaha saameyntana waa laga saaraa dhoofinta qaab-ilaa-qaab."
    ]
   },
   {
    "h2": "Natiijooyinka iyo Dhoofinta",
    "ps": [
     "Natiijooyinka waxaa si buuxda loogu muujiyaa sanduuq qoraal ah oo akhris keliya ah, fayl kasta oo leh tirada geliska iyo tirakoobka muddada guud; badhamada Soo-deji iyo Koobiyeey waxay qaataan faylka si toos ah. Aagga natiijooyinka waa horudhac — ma jiro tafatir qoraal ama wakhti ah halkan. Si aad u samayso isbeddellada, dhoofi marka hore, ka dib isticmaal qalabka ku habboon."
    ],
    "img": {
     "file": "bilingual-result",
     "alt": "Aagga natiijooyinka kala-saarka: horudhac akhris keliya ah, tirakoobka tirada geliska, iyo badhamada soo-dejinta/koobiyeynta",
     "cap": "Horudhaca qoraalka buuxa + tirakoobka geliska iyo muddada + soo-deji iyo koobiyeey"
    }
   },
   {
    "h2": "Su'aalaha Badanaa La Is Weydiiyo",
    "ps": [
     "**Hal gelis ayaa leh Ingiriisi hal sadar ah iyo Faransiis kan kale ah — maxaa u diidaya inuu kala baxo?** Nooca A wuxuu u kala saaraa jidadka nidaamka qoraalka, markaa laba luqadood oo wadaaga hal nidaam gudaheeda hal gelis dhexdeeda ah lama kala saari karo. Dib u habee sida Nooca B (laba gelis oo ku yaal isla waqtiga) iyo kala-saarka ku saleysan booska ayaa shaqeynaya.",
     "**Hal fayl oo keliya ayaa ku jira soo-dejinta?** “Hayso asalka keliya”, “Hayso turjumaadda keliya” iyo “Isku-dar oo ka dhig hal gelis laba-sadar ah” mid kasta waxay soo saartaa hal fayl oo loogu talagalay qaab ahaan; keliya “U kala saar laba” ayaa ku siinaysa laba, oo lagu calaamadiyay `.orig` / `.dst`.",
     "**Ma samayn karaa habaynta xirmada?** Hal fayl markiiba; safafka lama taageero.",
     "**Ma geliyo qoraalladayda hoose?** Maya — akhrinta iyo dhoofintu waxay gebi ahaanba ka shaqeeyaan biraawsarkaaga gudihiisa."
    ]
   },
   {
    "h2": "Hagayaasha La Xiriira",
    "ps": [
     "Qaabka degdegga ah ee loo kala saaro laba jid eeg [[Splitting Bilingual Subtitles into Two Tracks|/guides/split-bilingual-subtitles.html]]; sida loo sameeyo qoraallada hoose ee labo-luuqadlaha ah eeg [[Two Ways to Make Bilingual Subtitles|/guides/make-bilingual-subtitles.html]]; turjumaadda mashiinka isticmaal [[AI Subtitle Translation|/translate.html]]."
    ]
   }
  ]
 },
 "clean": {
  "seo": {
   "title": "Nadiyaha Qoraallada Hoose – ka saar summadaha biyaha, xayaysiisyada, SDH – AI-SRTSub",
   "desc": "Nadiyaha qoraallada hoose: 13 xeer waxay ka saaraan summadaha biyaha, xayaysiisyada, qoraallada SDH, summadaha HTML, nuqullada; isbeddel kasta wuxuu leeyahay farqi waana la celin karaa. SRT/VTT/ASS, dhammaan gudaha biraawsarka.",
   "h1": "Sida loo isticmaalo nadiyaha qoraallada hoose",
   "intro": "Qoraallada hoose ee laga soo dejiyo shabakadda badanaa waxay wataan summadaha biyaha, xayaysiisyada iyo qoraallada SDH. Nadiyuhu wuxuu adeegsadaa 13 xeer hal mar, isbeddel kastaana waa la kala saaraa waana la celin karaa.",
   "ctaText": "Fur nadiyaha qoraallada hoose"
  },
  "body": [
   {
    "h2": "Waxa Qalabkani Sameeyo",
    "ps": [
     "Faylasha qoraallada hoose ee la soo dejiyey badanaa waxay wataan waxyaabo aysan tahay inay wataan. Nadiyuhu wuxuu ka saaraa hal mar oo xeer ku saleysan:"
    ]
   },
   {
    "h2": "Soo-gelinta iyo Aqoonsiga",
    "ps": [
     "Jiid fayl ama guji si aad u soo dejiso — SRT, VTT, ASS, SSA iyo TXT waa la taageeraa — ama ku dheji qoraalka qoraalka hoose si toos ah. Koodhka waa la ogaadaa haddii UTF-8 decode uu soo saaro xarfaha beddelka, waxay ku noqotaa GBK ama Big5, bogguna wuxuu muujinayaa \"Koodhka waa la hagaajiyay sida {encoding}\". Haddii aad soo geliso qoraallo hoose oo labo-luuqadle ah oo laba-jidad ah (laba waqti oo isku mid ah, mid Shiine ah iyo mid Ingiriisi ah), waxaa lagu mideeyaa hal jid oo labo-luuqadle ah iyadoo leh badhanka \"asal ah kor / turjumaad kor\"."
    ]
   },
   {
    "h2": "Qaabeynta 13-ka Xeer",
    "ps": [
     "Interface-ku wuxuu leeyahay afar kooxood oo wata 13 sanduuq xulasho: **Summadaha iyo qaabeynta** (saamaynta ASS, summadaha HTML, calaamadaha kantaroolka, dib u tirinta ka dib kala-soocidda), **SDH iyo saamaynta codka** (qoraallada SDH, summadaha afhayeenka, sadarrada heesaha saafi ah), **Summadaha biyaha iyo gelisyada qashinka ah** (summadaha biyaha iyo xayaysiisyada, gelisyada nuqulka ah, gelisyada madhan), **Hagaajinta qoraalka** (xarfaha kala-goosashada iyo bannaanada, dayactirka xarfaha waaweyn, isku-darka sadarrada gaaban). Kasta oo \"khasaare la'aan ah oo la hubiyay\" ayaa shaqeeya si caadi ah; walxaha qaarkood ee tuuri kara nuxurka (sadarrada heesaha, dayactirka xarfaha, isku-darka sadarrada gaaban) waa dami yihiin — calaamadee marka loo baahdo. Shay kasta wuxuu leeyahay tilmaam ⓘ hover ah, isbeddel kasta oo sanduuqa xulashada ah ayaana si degdeg ah dib ugu socodsiiya."
    ],
    "img": {
     "file": "clean-opts",
     "alt": "Interface-ka xulashada nadiifinta: afar kooxood oo ah 13 sanduuq xulasho, tirada firfircoon ee la muujiyay kor",
     "cap": "Afar kooxood, 13 xeer; kaliya walxaha khasaare la'aanta ah ayaa shaqeeya si caadi ah, isbeddelladu waxay khuseeyaan si degdeg ah"
    }
   },
   {
    "h2": "Farqiga isbeddelka iyo celinta",
    "ps": [
     "Natiijooyinka si toos ah looma dul-qoro: isbeddel kasta waxaa lagu qoraa miiska farqiga iyadoo leh summad xeer (sababta geliskan loo tafatiray ama loo tirtiray). Ma rabtaa mid dib loo soo celiyo? Guji \"Restore\" safkaas; \"Restore all\" waxay dib u soo celisaa wax walba hal guji, gujinta mar kalena waxay dib u adeegsaneysaa nadiifinta buuxda. Baraha tirakoobka waxay muujinayaan tirada asalka / la nadiifiyey / la tirtiray / la beddelay / la soo celiyey."
    ],
    "img": {
     "file": "clean-diff",
     "alt": "Miiska farqiga isbeddelka: tusmada, wakhtiga, qoraalka asalka ah iyo kan la nadiifiyey, summadaha xeerarka ee saf kasta",
     "cap": "Isbeddel kasta wuxuu wataa summad xeer; dib u soo celi safafka hal-hal ah ama dhammaantood hal mar"
    }
   },
   {
    "h2": "Horudhaca iyo Dhoofinta",
    "ps": [
     "Kala beddel aragtida \"Cleaned / Original\". Aragtida asalka ah, gelisyada la tirtiray waa la dhex xarriiqaa waxaana lagu calaamadiyaa \"Deleted\", faylka la dhoofiyayna wuxuu si sax ah ula mid yahay horudhaca. Qaababka dhoofinta: SRT (caadiga ah), VTT, ASS (waxaa la heli karaa marka isha ay tahay ASS, iyadoo qaybta qaabku ay u taallo sidii ay ahayd), iyo TXT qoraal caadi ah oo aan lahayn waqtiyo. Magaca faylka wuxuu helayaa summad `.clean` ah si otomaatig ah."
    ],
    "img": {
     "file": "clean-preview",
     "alt": "Horudhaca qoraalka buuxa: aragtiyo la nadiifiyey iyo kuwo asal ah oo wata bar tirakoob oo muujinaysa tirada",
     "cap": "Laba aragti oo horudhac ah, waxaad aragtaa waa waxa aad hesho"
    }
   },
   {
    "h2": "Su'aalaha Badanaa La Is Weydiiyo",
    "ps": [
     "**Ma tirtiri doontaa wadahadalka caadiga ah si khaldan?** Xeerka summadaha biyaha wuxuu marka hore ka saaraa sadarrada summadaha biyaha (isagoo ilaalinaya sadarrada wadahadalka ee ku jira gelisyada labo-luuqadlaha ah) wuxuuna tirtiraa geliska oo dhan haddii raadad ay jiraan; ka saaridda SDH waxay taabataa oo keliya waxyaabaha ku jira qawsaska ee leh ereyada muhiimka ah ee SDH ee ah 40 xaraf ama ka gaaban — wadahadalka caadiga ah ee qawsaska ku jira waa uu joogaa.",
     "**Sidee loo kala saaraa sadarrada heesaha saafi ah iyo heesaha ku jira wadahadalka?** Keliya gelisyada ay sadar kasta oo ka mid ahi ku duudduuban yahay qoraallada muusigga ee ♪ ama summadaha sida [music] ayaa la tirtiraa; wadahadalka ay ku jiraan heesaha waa la hayaa.",
     "**Summadaha afhayeenka ma ku dhici karaan qoraalka Shiinaha?** Keliya magac xarfo waaweyn oo tiro-xaraf ah bilowga sadarka oo ay ku xigto laba dhibcood (sida `GEORGE:`) ayaa waafaqaya; xukummada labada dhibcood ee Shiinaha marna ma sameeyaan.",
     "**Ma nadiifin karaa dhowr fayl hal mar?** Maya — hal fayl halkii mar. Soo deji natiijada, ka dib soo geli midka xiga."
    ]
   },
   {
    "h2": "Asturnaanta",
    "ps": [
     "Nadiifintu waxay gebi ahaanba ka shaqaysaa biraawsarkaaga gudihiisa; wax nuxur ah oo qoraal hoose ah marna lama diro server."
    ]
   },
   {
    "h2": "Qalabka iyo hagayaasha la xiriira",
    "ps": [
     "Si aad u hesho hage gaaban oo diiradda saaraya ka saaridda summadaha biyaha iyo xayaysiisyada, eeg [[remove subtitle ads and watermarks|/guides/remove-subtitle-ads.html]]; ku sifee faylkaaga [[subtitle quality check|/guides/subtitle-quality-check.html]] ka hor intaanad dhiibin; si aad u beddesho qaababka isticmaal [[format conversion|/convert.html]]."
    ]
   }
  ]
 },
 "convert": {
  "seo": {
   "title": "Beddelidda Qaababka Qoraal-hoosaadka (SRT, VTT, ASS, SBV, LRC, TXT) – AI-SRTSub",
   "desc": "Hage ku saabsan beddelaha: soo jiid faylka, hubi qaabka la ogaaday, dooro kan soo-baxa, maaree qoraalka labada luqadood, oo soo degso. Wax walba waxay ka shaqeeyaan biraawsarkaaga.",
   "h1": "Hagaha Beddelaha Qaabka Qoraal-hoosaadka",
   "intro": "Hagahan wuxuu maraa bogga laga bilaabo kor ilaa hoos: soo rar qoraal-hoosaad, xaqiiji qaabka la ogaaday, dooro qaabka soo-baxa, oo soo degso. Wax walba waxay ka shaqeeyaan biraawsarkaaga — majiro fayl ka tegaya qalabkaaga.",
   "ctaText": "Fur beddelaha qoraal-hoosaadka"
  },
  "body": [
   {
    "h2": "Soo rar qoraal-hoosaadyadaada",
    "ps": [
     "Ku jiid fayl sanduuqa xariiqda goosgooska leh ama guji si aad mid u dooratid; sidoo kale waad awooddaa **in aad soo dhejiso waxa ku jira** si toos ah sanduuqa qoraalka. Qaabka waxaa laga ogaadaa labadaba kordhinta iyo waxa ku jira, natiijaduna waxay ka muuqataa summada qaabka."
    ],
    "img": {
     "file": "convert-upload",
     "alt": "Goobta gelinta: muunad SRT ah ayaa la soo raray, oo lagu ogaaday in ay tahay SRT",
     "cap": "Qaabka la ogaaday wuxuu ka muuqdaa summada — halkan marka hore hubi haddii aad shaki qabtid"
    }
   },
   {
    "h2": "Dooro qaabka soo-baxa",
    "ps": [
     "Dooro qaabka loo socdo liiska hoos u soo dhaca: lix ikhtiyaar — srt, vtt, ass, sbv, lrc, txt. U beddelashada ass waxay dib u dhisaysaa qaab caadi ah oo go'an oo ah 1920×1080 (qoraal cad, duluc madow, hoose dhexe) mana **hayso farta aŭ midabada asalka ah***; txt waxay dhoofisaa qoraal kaliya, iyada oo aan lahayn waqti."
    ],
    "img": {
     "file": "convert-opt",
     "alt": "Liiska hoos u soo dhaca ee qaabka soo-baxa oo VTT la doortay",
     "cap": "Qaabka soo-baxa ma raacayo gelinta — adiga ayaa doorta"
    }
   },
   {
    "h2": "Maareynta labada luqadood",
    "ps": [
     "Haddii faylku yahay laba luqadood (labo sadar hal xariiq ama xariiqyo is dhex maray), qaab-dhismeedka waa la ilaaliyaa inta lagu jiro beddelka. Doorashada \"keep bilingual\" waxay u qaybisaa labada luqadood sadarro sare iyo hoose ah, mid walbaona si gaar ah ayaa dib loogu duubaa; kontoroolka waa la damiyaa marka aan la ogaanin qoraal laba luqadood ah."
    ]
   },
   {
    "h2": "Beddel oo soo degso",
    "ps": [
     "Guji \"Convert\": qaybta natiijada waxay tusaysaa tirada xariiqyada iyo wadarta muddada, iyadoo qoraalku diyaar u yahay in la eego. Guji **Download** si aad u kaydisid faylka, ama **Copy** si aad qoraalka si toos ah u qaadatid. Beddelku waligii ma beddelayo wax qiimaha wakhtiga ah — wuxuu dib u qoraa qaabka kaliya. Si aad dib ugu habayso wakhtiga xariiqyada, isticmaal [[qalabka wakhteynta|/shift.html]]."
    ],
    "img": {
     "file": "convert-result",
     "alt": "Qaybta natiijada: tirada xariiqyada iyo wadarta muddada oo wata badhamada soo dejinta iyo koobiyeynta",
     "cap": "6 xariiq, 0:23 wadarta guud — si kooban u eeg qoraalka ka hor inta aanad soo dejisan"
    }
   }
  ]
 },
 "extract": {
  "seo": {
   "title": "Soo saaridda qoraal caadi ah oo laga soo saaray qoraal-hoosaadyada – Laba qaab-dhismeed, shan nadiifin – AI-SRTSub",
   "desc": "Ka soo saar wadahadalka qoraal-hoosaadyada sidii qoraal caadi ah oo nadiif ah: sadarro is xiga ama hal sadar halkii xariiq, iyo waxa shanta badel ee SDH, calaamadaha biyaha, nuqullada, hor-galaha iyo heesuhu ay tirtirayaan.",
   "h1": "Sida looga soo saaro qoraal caadi ah qoraal-hoosaadyada",
   "intro": "Ka soo saar wadahadalka faylka qoraal-hoosaadka sidii qoraal caadi ah oo nadiif ah: lambarada xariiqyada, xilliyada iyo summada qaabka si otomaatig ah ayaa loo tirtiraa, sidaas darteed natiijadu waxay u akhrisanaysaa sidii maqaal ama waxay u shaqaysaa sidii liis wadahadal.",
   "ctaText": "Fur soo-saaraha qoraal-caadiga ah"
  },
  "body": [
   {
    "h2": "Waxa qalabkani qabto",
    "ps": [
     "Wadahadalka ku jira faylka qoraal-hoosaadka kaliya ayaa muhiim u ah akhristaha; inta kalena waa qaab-dhismeed loogu talagalay ciyaaryahan — lambarada xariiqyada, xilliyada, summada qaabka. Boggani wuxuu meesha ka saarayaa qaab-dhismeedka oo wuxuu hayaa erayada."
    ]
   },
   {
    "h2": "Soo rido, ee ma aha oo kaliya soo rarid",
    "ps": [
     "Tiirka \"1 Add subtitles\" ee dhinaca bidix wuxuu aqbalayaa fayl la soo raray, sidoo kale waad ku dhejin kartaa waxa ku jira qoraal-hoosaadka si toos ah sanduuqa qoraalka. Haddii aad dooratay faylka khaldan, guji \"Clear\" oo dib u bilow.",
     "Boggani wuxuu akhriyaa faylasha sida UTF-8. Haddii qoraal-hoosaadku u furmo sidii darbi calaamado su'aal ama sanduuqyo ah, kaydinta erayada waa mid jabtay — ku beddel UTF-8 [[Hagaajinta qoraalka burburay|/repair.html]] marka hore, dabadeed soo noqo."
    ],
    "img": {
     "file": "extract-up",
     "alt": "Aagga ku darista qoraal-hoosaadka ee soo-saaraha qoraal-caadiga ah",
     "cap": "Soo rar fayl, ama ku dheji waxa ku jira qoraal-hoosaadka si toos ah sanduuqa qoraalka"
    }
   },
   {
    "h2": "Doorashada labada qaab-dhismeed u dhexeysa",
    "ps": [
     "Xagga sare ee \"2 Extraction options\" waa qaab-dhismeedka: **Continuous paragraphs** wuxuu jebiyaa qoraalka hakadka iyo joojinta weedhaha si uu u akhrisamo sida maqaal; **One line per cue** wuxuu bixiyaa hal sadar halkii gelis qoraal-hoosaad ah, isaga oo la mid ah gelitaannada faylka asalka ah mid-ka-mid.",
     "Koobiyeynta wadahadalka qoraallada, ku celcelinta tarjumaadda ama u akhrinta sida tiraab waxay u baahan tahay sadarro is xiga; dhisidda xaashi wadahadal, barbardhigidda sadar sadar oo lala barbar dhigo asalka ama quudinta qalab kale waxay u baahan tahay hal sadar halkii xariiq."
    ],
    "img": {
     "file": "extract-opt",
     "alt": "Qaab-dhismeedka iyo badhamada nadiifinta ee hoos yimaada xulashooyinka soo-saaridda",
     "cap": "Dooro hal qaab-dhismeed; shanta badel ee hoose waxay go'aaminayaan nooca nuxurka la saarayo"
    }
   },
   {
    "h2": "Waxa nadiifin kasta oo ka mid ah shanta ahi ay tirtirayso",
    "ps": [
     "**Remove SDH cues**: wuxuu tirtirayaa sharaxaadda dhawaaqa ee xidhmooyinka ku jirta sida \"(footsteps)\" ama \"[music]\" wuxuuna hayaa wadahadalka.",
     "**Remove watermarks and ads**: wuxuu ka tirtirayaa sadarrada sida ammaanta fansub-ka, URL-yada iyo magacyada kanaalka.",
     "**Remove duplicate neighbours**: marka isla weedhu ay laba jeer is xigto (cilad dib u ciarid ah) hal koobi oo kaliya ayaa la hayaa; nuqullada fogaanaya waxay wataan macno waana la iska daayaa.",
     "**Remove speaker prefixes**: \"JOHN: Hello\" waxay noqotaa \"Hello\". Waa la damiyay caadi ahaan — qoraal-nooca qoraalka filimadu wuxuu u baahan yahay inuu muujiyo qofka hadlaya.",
     "**Skip lyric lines**: sadarrada ah \"♪ … ♪\" oo dhan waa la boodaa. Waa la damiyay caadi ahaan — ereyada heesuhu sidoo kale waa erayo."
    ],
    "img": {
     "file": "extract-clean",
     "alt": "Shanta badel ee nadiifinta iyo sharaxaadooda oo hoos yimaada xulashooyinka soo-saaridda",
     "cap": "Badel kastaa wuxuu sheegayaa waxa uu ka saarayo dhinaca midig; calaamadee kuwa aad u baahan tahay"
    }
   },
   {
    "h2": "Qaadashada natiijada",
    "ps": [
     "Tiirka \"3 Result\" ee dhinaca midig wuxuu tusiyaa qoraalka la soo saaray si toos ah wuxuuna dib u xisaabinayaa isla marka aad beddesho ikhtiyaar.",
     "Markaad faraxsan tahay, guji \"Download\" si aad u kaydisid .txt ama \"Copy\" si aad qoraalka ula baxdid. Luqadaha aan kala soocin erayada oo wata meelo bannaan, sida Shiinaha iyo Jabaanka, isu-geynta sadarradu waxay raacdaa xeerar kala duwan, qalabkuna si toos ah ayuu taas u maareeyaa luqad kasta."
    ],
    "img": {
     "file": "extract-out",
     "alt": "Aagga natiijada oo wata badhamada soo dejinta iyo koobiyeynta",
     "cap": "Natiijadu waxay cusboonaysiisaa si toos ah; u soo deji sida txt ama si toos ah u koobiyeyso"
    }
   },
   {
    "h2": "Waxa la taabtay la'aanta",
    "ps": [
     "Wadahadalka laftiisa dib looma qoro. Badhamada nadiifinta ayaa kaliya go'aaminaya sadarrada ama blocks-ka dhan ee la tuurayo; waligood ma beddelaan erayada gelitaanka.",
     "Xilliyada iyo lambarada xariiqyada si fudud looma soo saaro, lama beddelo dabadeedna lama soo saaro — faylka asalka ah waa mid aan la taaban, bogganina ma bixiyo dhoofin wata xilliyo. Shaqadaasi waxay leedahay [[Beddelidda qaabka|/convert.html]]."
    ]
   },
   {
    "h2": "Su'aalaha badanaa la isu weydiiyo",
    "ps": [
     "**Ma ku jiraan summada qaabka ASS qoraalka?** Maya. ASS `{}` blocks-ka beddelka waa la tirtirayaa oo kaliya wadahadalkii ayaaharaya.",
     "**Faylka labada luqadood ma soo baxaa laba sadar ama hal?** Sida sadarro badan oo gelitaanku lahaa; boggani midna ma isu geeyo midna ma kala qaybiyo — si loo kala saaro isticmaal [[Kala qaybinta laba-luqadood|/bilingual.html]].",
     "**Maxaa hor-galaha hadlaayaasha loo hayaa caadi ahaan?** Magaca ku jira \"JOHN: Hello\" badanaa waa macluumaad faa'iido leh (qoraallada, xaashiyaha wadahadalka), ka saariddeeduna waxay dhib ka dhigaysaa in la ogaado qofka hadlaya, markaa doorashada adiga ayaa lagugu hayaa.",
     "**Faylasha erayada heesaha ee LRC ma la soo saari karaa sidoo kale?** Haa. Summadaha wakhtiga ee LRC waa la tirtirayaa oo sadarrada heesuhu way harayaan; haddii aadan rabin heesaha, calaamadee \"Skip lyric lines\"."
    ]
   },
   {
    "h2": "Arrimaha gaarka ah",
    "ps": [
     "Qoraal-hoosaadyada waxaa lagu farsameeyaa gebi ahaanba biraawsarka: waxba lama soo raro waxna ma dhex maro server. Qoraalku wuxuu ku jiraa bogga hadda jira oo kaliya waxaana la tirtiraa marka la cusboonaysiiyo."
    ]
   },
   {
    "h2": "Qalabka iyo hagayaasha la xiriira",
    "ps": [
     "Si aad u fahamto waxa faylka qoraal-hoosaadku dhab ahaantii ka kooban yahay eeg [[Waa maxay waxa ku jira faylka SRT|/guides/srt-file-format.html]]; si aad u tarjunto wadahadalka la soo saaray tag [[Tarjumaadda qoraal-hoosaadka|/translate.html]]; si aad ugu beddesho miiska isticmaal [[Qoraal-hoosaadyada ilaa Excel/CSV|/guides/srt-to-excel.html]]; oo wad [[QC-da qoraal-hoosaadka|/qc.html]] ka hor inta aanad cidna u dhiibin."
    ]
   }
  ]
 },
 "extract-subtitles-from-video": {
  "seo": {
   "title": "Soo saaridda qoraal-hoosaadyada ee muuqaal – Ku dhex jira vs dibadda – AI-SRTSub",
   "desc": "Waxa MKV / WebM / MP4 / MOV minba uu wado, sida qoraalka, ASS, WebVTT iyo mov_text tracks ay u kala duwan yihiin, sababta qoraal-hoosaadka sawirka ah (PGS / DVD) aysan u lahayn qoraal, iyo waxa la sameeyo soo-saaridda ka dib.",
   "h1": "Soo saaridda qoraal-hoosaadyada ee muuqaal",
   "intro": "Qoraal-hoosaadyadu waxay ku noolaan karaan gudaha faylka muuqaalka ama waxay si madaxbannaan ugu taagnaan karaan dibaddiisa. Gudaha, waxay yihiin raad ku jira weelka — soo saaridoodu wax shaqo ah kuma laha beddelidda qaabka.",
   "ctaText": "Fur soo-saaridda qoraal-hoosaadka muuqaalka"
  },
  "body": [
   {
    "h2": "Meesha ay ku nool yihiin qoraal-hoosaadku: ku dhex jira iyo dibadda",
    "ps": [
     "Faylka muuqaalka (MKV, MP4) waa weel haysta raadka muuqaalka, raadka maqalka iyo raadadka qoraal-hoosaadka isku mar. Qoraal-hoosaadyada ku xiran gudaha waa **ku dhex jira**; fayl gooni ah oo .srt / .ass ah oo dibadda fadhiya waa **dibadda**, raad ku dhex jirana waxaa sidoo kala lagu magacaabaa **muxed in**.",
     "Qoraal-hoosaadyada dibadda waxaa loo isticmaali karaa sida ay yihiin. Dhibaatadu waa kuwa ku dhex jira: si aad u beddesho, u turjunto ama u dhisato raad laba-luqadood ah oo laga keenay asalka, ma haysatid fayl qoraal-hoosaad ah oo gacanta ku jira — waa inaad marka hore akhrisaa raadka weelka ka baxsan. Tallaabadani ma aha beddelid qaab: muuqaalka dib looma habeeyo, kaliya xogta hore loogu kaydiyay weelka ayaa la akhriyaa."
    ]
   },
   {
    "h2": "Weelka wada waxa uu wato",
    "ps": [
     "Weelasha kala duwan waxay hayaan qaabab qoraal-hoosaad oo kala duwan, dhibaatada soo-saariduna sidoo kale way kala duwan tahay:"
    ],
    "img": {
     "file": "videosub-which",
     "alt": "Raadadka qoraal-hoosaadka ee ay liis garaysay bogga soo-saaridda qoraal-hoosaadka ee ku dhex jira",
     "cap": "Hal raad halkii saf, oo badanaa wata luqad iyo magac raad; marka uu jiro hal kaliya waxaa loo soo saaraa si otomaatig ah"
    }
   },
   {
    "h2": "Sababta qoraal-hoosaadka sawirka ah aan loo soo saari karin",
    "ps": [
     "Blu-ray PGS iyo qoraal-hoosaadka DVD ma kaydiyaan xarfo haba yaraatee, ee waxay kaydiyaan taxane sawirro ah oo wata kanaalka alfa. Marka ciyaaryahan tusiye waa uu dhejinayaa sawir, ee ma aha soo bandhigid qoraal.",
     "Markaa ma jiro qoraal ku jira raad sidaas oo kale ah oo la akhriyo — ma aha in qalabku uusan taageerayn, ee waa in aysan jirin xarfo halkaas ku jira. Boggu si cad ayuu u sheegayaa marka uu la kulmo mid ka mid ah.",
     "Habka kaliya ee lagu heli karo erayada waa in marka hore la aqoonsado xarfaha ku jira sawiradaas (OCR) oo laga dhiso qoraal-hoosaadyo taas. Taasi waa geeddi-socod ka gooni ah soo jiidashada raadka."
    ]
   },
   {
    "h2": "Waxa caadi ahaan yimaada soo-saaridda ka dib",
    "ps": [
     "Waxa soo baxaya waa raadkii sida uu ahaa: qalabku ma qiyaaso kaydinta erayada mana saxo xilliyada. Markaa laba shay ayaa soo baxa badanaa:",
     "Mid waa **qoraal burburay** — dhibato kaydinta erayada ah oo ku jirta raadka asalka ah oo soo baxaya isagoo burbursan si kastaba; aado [[Sida loo hagaajiyo qoraalka burburay|/guides/repair.html]] si loo aqoonsado kaydinta erayada. Midka kalena waa **waqti khaldan** — ha ahaato asalkaas inay leedahay sumad hordhac ah, ama heerarka qaab-dhismeedku aysan waafaqsanayn, natiijadu waa mid ka leexatay guud ahaan; isticmaal [[Habaynta wakhtiga|/shift.html]] si aad u leexiso ama u cabirto.",
     "Intaas ka dib, si loo turjunto aado [[Tarjumaadda qoraal-hoosaadka|/translate.html]], iyo si aad uga dhigto laba-luqadood eeg [[Laba siyaabood oo loogu sameeyo qoraal-hoosaadyada laba-luqadood ah|/guides/make-bilingual-subtitles.html]]."
    ],
    "img": {
     "file": "videosub-formats",
     "alt": "Aagga natiijada oo wata qaababka dhoofinta ee SRT / VTT / ASS / TXT",
     "cap": "Qoraal-hoosaadyada la soo saaray waxaa loo dhoofin karaa afar qaab; isha ASS waxay haysaa madaxa iyo xallinta qaabkeeda"
    }
   },
   {
    "h2": "Waxyaabo dhawr ah oo sahlan in la khaldamo",
    "ps": [
     "**Soo saaridda qoraal-hoosaadku ma aha in lagu gubo iyaga.** Muuqaalka dib looma habeeyo, markaa tayada sawirka iyo maqalka saameyn kuma yeelanayaan.",
     "**Soo-saariddu saameyn kuma yeelanayso faylka asalka ah.** Waa la akhriyaa oo kaliya, weligood lama qoro, mana jiro hal bayt oo muuqaalka ka mid ah oo isbeddelaya.",
     "**Fayl weyn oo gaabis ah ma aha dhibato xiriir.** Qalabku wuxuu ka baaraa macluumaadka raadka qayb-qayb, kan faylku weyn yahayna wuu ka dheeraadaa; dhammaanteed waxay ka dhacdaa deegaanka gudaha.",
     "**Qoraal-hoosaadyada dibaddu uma baahna boggan.** Haddii aad haysato .srt / .ass, si toos ah u aado [[Beddelidda qaabka|/convert.html]]; qoraal-hoosaadyada ku dhex xiran muuqaalka kaliya ayaa u baahan in marka hore la soo saaro."
    ]
   },
   {
    "h2": "Qalabka iyo hagayaasha la xiriira",
    "ps": [
     "Si aad u hesho hage dhammaystiran eeg [[Sida loo soo saaro qoraal-hoosaadyada ku dhex jira muuqaal|/guides/videosub.html]]; si aad u turjunto waxa aad soo saarto aado [[Tarjumaadda qoraal-hoosaadka|/translate.html]], si aad uga dhigto laba-luqadood eeg [[Laba siyaabood oo loogu sameeyo qoraal-hoosaadyada laba-luqadood ah|/guides/make-bilingual-subtitles.html]]; qoraalka burburayna ka bilow [[Hagaajinta qoraalka burburay|/repair.html]]."
    ]
   }
  ]
 },
 "fps-23-976-vs-25": {
  "seo": {
   "title": "Waxa 23.976 / 24 / 25 / 30 fps ay dhab ahaantii ka dhigan yihiin – Wakhtiga Qoraal-hoosaadka – AI-SRTSub",
   "desc": "23.976 ma aha 24 29.97-na ma aha 30 — 0.1% maqan waxay ka timid midabka NTSC, halka PAL uu filimada ku socodsiiyo 4% si dhakhso ah. Sida kuwani u beddelaan wakhtiga qoraal-hoosaadkaaga, iyo sida loogu beddelo dhexdooda.",
   "h1": "Waxa 23.976 / 24 / 25 / 30 fps ay dhab ahaantii ka dhigan yihiin",
   "intro": "Farqiga 0.1% ee u dhexeeya 23.976 iyo 24 waa haraaga taariikhda telefishanka. Iyadoo lala kaashanayo 4% ee PAL, waa sababta qoraal-hoosaadyadu uga sii jeexjeexayaan wada-socodka sida filimku u socdo.",
   "ctaText": "Fur habaynta wakhtiga"
  },
  "body": [
   {
    "h2": "Waxa nambar kastaa yahay",
    "ps": [
     "Heerka qaab-dhismeedku waa inta sawir ee la tusayo hal ilbiriqsi. Afarta aad inta badan la kulanto:"
    ]
   },
   {
    "h2": "Halkaas 0.1% ay ka timid",
    "ps": [
     "23.976 = 24 × 1000/1001, iyo 29.97 = 30 × 1000/1001. In 1000/1001 waa haraaga ka dhashay ku darida midabka NTSC: si loo riixo subcarrier-ka midabka iyada oo aan la jabin qalabka madow-iyo-cad ee jira, heerka goobta ayaa laga soo dejiyay 60 Hz ilaa 59.94 Hz (60 × 1000/1001), heerka qaab-dhismeedka ayaana hoos u dhacay iyada.",
     "Natiijada: filimadu waxay ka baxaan 23.976 gobollada NTSC halkii ay ka ahaan lahaayeen 24. Farqigu waa 0.1%, ama 3.6 ilbiriqsi saacad gudaheed — si dhib yar looma dareemo keligood, laakiin ha ku khaldin 4% ee hoose oo weligood ha isku darin labada xisaabin mid."
    ]
   },
   {
    "h2": "Halkaas 4% ay ka timid",
    "ps": [
     "Gobollada PAL waxay ku soo bandhigaan 25 fps. Filimada waxaa lagu duubaa 24 fps waxaana si fudud loogu ciyaaraa 25 — hal qaab-dhismeed laguma darin ama lagama saarin, markaa dib-u-ciiriddu waxay socotaa 4% si dhakhso ah (25/24 ≈ 1.0417). Filim 100-daqiiqo ah wuxuu socdaa 96 daqiiqo nuqulkiisa PAL.",
     "Taasi waa xididka **leexashada horumarka leh**: qoraal-hoosaadyada laga sameeyay asalka iyo muuqaalka nuqulka PAL waxay si sax ah isugu mid yihiin bilowga waxayna afar daqiiqo u jiraan credits-ka. Majiro leexasho caalami ah oo badbaadin karta taas; waa in dib loogu cabbiraa saamiga."
    ],
    "img": {
     "file": "shift-step-rate",
     "alt": "Qaybta xawaaraha bogga wakhtiga: sanduuqa gelinta saamiga",
     "cap": "Dib u cabbir saamiga — hal qiime ayaa daboolaya filimka oo dhan"
    }
   },
   {
    "h2": "Sida loo beddelo",
    "ps": [
     "Beddeliddu waxay ka dhigan tahay in lagu dhufto hal saamiga oo quseeya filimka oo dhan:"
    ]
   },
   {
    "h2": "Sheegidda midka aad haysato",
    "ps": [
     "Halkii aad qiyaasi lahayd saamiga, hel laba xilli oo wakhtigooda saxda ah aad hubto — badanaa sadarrada koowaad iyo kan u dambeeya ee wadahadalka — oo u sheeg qalabka \"sadarkan wuxuu ahaan lahaa 00:00:12 iyo kan kalena 01:35:40\"; waxay ku fidisaa filimka oo dhan si toosan labadaas dhibcood u dhexeeya. Taasi waa \"ku xidhida laba-dhibcood\", mana u baahna xisaabinta heerka qaab-dhismeedka adiga kugu xidhan.",
     "Si aad adigu u xaqiijiso heerka qaab-dhismeedka, hubi ciyaaryahan kaaga ama qalabka macluumaadka warbaahinta. Marka magaca faylka sida `1080p.WEB` uusan wadin tilmaan heerka qaab-dhismeedka ah, ku xidhida laba-dhibcood waa waddada badbaadada leh."
    ],
    "img": {
     "file": "shift-step-two",
     "alt": "Qaybta ku xidhida laba-dhibcood ee bogga wakhtiga: laba saf oo ah gelinta wakhtiga",
     "cap": "Ku xidhida laba-dhibcood uma baahna heerka qaab-dhismeedka — waa laba wakhti oo keliya"
    }
   },
   {
    "h2": "Qalabka iyo hagayaasha la xiriira",
    "ps": [
     "Beddelidda heerka qaab-dhismeedka laftiisa — [[Beddelidda heerka qaab-dhismeedka qoraal-hoosaadka|/guides/srt-fps-converter.html]]; habaynta xawaaraha — [[Beddelidda xawaaraha qoraal-hoosaadka|/guides/subtitle-speed-converter.html]]; aan la hubin inay tahay leexasho caalami ah ama leexasho horumar leh — [[Qoraal-hoosaadyada oo sii leexnaya wada-socodka|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "glossary": {
  "seo": {
   "title": "Beddelidda ereyada xiriirka ah ee qoraal-hoosaadyada – Hal miis ayaa hagaajiya fayl – AI-SRTSub",
   "desc": "Hal sharci hal sadar, oo lagu kala saaray -> , => , → ama Tab, oo wata # oo ah faallooyin. Erayo dhammaystiran, xasaasiyad xaraf, sadarka koowaad ama labaad ee qoraal-hoosaad laba-luqadood ah, isbeddel kasta oo la qoray oo dib loo celin karo.",
   "h1": "Sida loo beddelo ereyada xiriirka ah ee qoraal-hoosaadyada",
   "intro": "Hal miis oo ereyo ah ayaa ka dhigaya erayada faylka qoraal-hoosaadka oo dhan mid joogto ah hal mar — xilliyada, hababka ASS iyo blocks-ka VTT NOTE lama taabto hal xaraf.",
   "ctaText": "Fur beddelidda ereyada xiriirka ah"
  },
  "body": [
   {
    "h2": "Waxa qalabkani qabto",
    "ps": [
     "Isku eray oo laba siyood loo tarjumay, magacyo iyo meelo la socda tarjumaadda mashiinka, qoraal-hoosaadyada qof kale oo u baahan inay waafaqaan hababkaaga — dhammaantood waxay wadaagaan hal sifo: waxa is beddelaya waa eray, ee ma aha qaab-dhismeedka. Boggani wuxuu beddelaa ereyada kaliya."
    ]
   },
   {
    "h2": "Laba shay oo la geliyo: qoraal-hoosaadyada iyo miiska ereyada",
    "ps": [
     "Tiirka \"1 Add subtitles\" ee dhinaca bidix wuxuu qaadanayaa fayl qoraal-hoosaad ah, ama waxaad ku dhejin kartaa waxa ku jira si toos ah; haddii aad dooratay faylka khaldan, guji \"Clear\".",
     "Tiirka \"2 Term table\" ee dhinaca midig wuxuu hayaa xeerarka. **Hal sharci hal sadar**, iyadoo erayga hore iyo erayga cusub ay kala saarayaan `->` , `=>` , `→` ama Tab — afartuba way shaqeeyaan. Sadarrada ka bilaabmaya `#` waa faallooyin mana qayb ka qaataan beddelka.",
     "Haddii aanad hubin qaabka, guji \"Fill in an example\" oo wax ka beddel taas."
    ],
    "img": {
     "file": "glossary-up",
     "alt": "Aagga ku darista qoraal-hoosaadka iyo gelinta miiska ereyada ee bogga beddelidda ereyada",
     "cap": "Qoraal-hoosaadyada dhinaca bidix, xeerarka dhinaca midig; hal sharci hal sadar, erayga hore iyo erayga cusub oo ay kala saarayaan ->"
    }
   },
   {
    "h2": "Sida loo qoro miiska ereyada",
    "ps": [
     "Hal sharci hal sadar: erayga hadda jira ee bidixda, waxa uu noqon lahaa midigta. Tusaale ahaan `Thor -> Donar` wuxuu beddelaa \"Thor\" kasta oo faylka ku jira \"Donar\".",
     "Faallooyinku waxay ka bilaabmaan `#` waana kuwo waxtar u leh calaamadaynta koox xeerar ah (tusaale ahaan \"# season 1 name fixes\"), iyo daminta sharci ku meel gaar ah — kaliya geli `#` horraanta halkii aad tirtiri lahayd.",
     "Xeerarku waxay ka socdaan kor ilaa hoos; qoraalka ay soo saarto hal sharci waxaa dib u baaraya xeerarka hoose. Marka ay kala horraysintu muhiim tahay (iska leh, beddel A oo la mariyo B marka hore ka dibna B oo la mariyo C), maskaxda ku hay taas."
    ],
    "img": {
     "file": "glossary-table",
     "alt": "Sadar ka dib sadar oo ah xeerarka beddelidda ee gelinta miiska ereyada",
     "cap": "Hal sharci hal sadar; sadarrada ka bilaabmaya # waa faallooyin waxayna damin karaan sharci ku meel gaar ah"
    }
   },
   {
    "h2": "Waxa saddexda badel ay qabtaan",
    "ps": [
     "**Scope**: `all` / `first line only` / `second line only`. Faylka laba-luqadood ah, dooro \"second line only\" marka aad rabto in aad beddesho tarjumaadda kaliya; gelitaannada leh hal sadar oo kaliya waxay ahaanayaan kuwo aan la taaban hoos yimaada dejinta hal-sadar kasta — qalabku ma qiyaaso dhinaca ah kan asalka ah.",
     "**Whole word**: wuxuu beddelaa kaliya ereyada u taagan keligood sida eray, markaa `art` taaban maayo `start`. Luqadaha aan kala soocin erayada oo wata meelo bannaan, sida Shiinaha iyo Jabaanka, badelkani wax saameyn ah ma leh — beddelku wuxuu ka shaqeeyaa qaybaha hoose ee erayada halkaas.",
     "**Case sensitive**: waa la damiyay caadi ahaan, markaa `CEO` iyo `ceo` labadaba waa la beddelaa; marka la calaamadiyo, higgaadda saxda ah ee isku midka ah ayaa la beddelaa."
    ],
    "img": {
     "file": "glossary-opt",
     "alt": "Baaxadda, erey-dhammaystiran iyo badelada xasaasiga ah ee ka hooseeya miiska ereyada",
     "cap": "Baaxaddu waxay go'aamisaa sadarka is beddelaya; erey-dhammaystiran iyo xasaasigu waxay go'aaminayaan sida adag ee eray loo waafajiyo"
    }
   },
   {
    "h2": "Isbeddel kasta oo la qoray, isbeddel kasta oo dib loo celin karo",
    "ps": [
     "\"3 Result\" waxay tusaysaa qoraal-hoosaadyada la beddelay sidoo kalena **waxay liis garaysaa isbeddel kasta**: xariiqee, sadarkee, laga bilaabo maxaa ilaa maxaa.",
     "Haddii aadan rabin mid ka mid ah, guji liiska si aad dib ugu celiso gelitaankaas kaliya — uma baahna in wax laga beddelo miiska ereyada oo dib loo wado. Markaad faraxsan tahay, guji \"Download\" ama \"Copy\"."
    ],
    "img": {
     "file": "glossary-out",
     "alt": "Aagga natiijada oo wata liiska isbeddellada shaqsiyeed",
     "cap": "Isbeddel kasta waa la qoray; guji mid aanad rabin si aad dib ugu celiso"
    }
   },
   {
    "h2": "Waxa la taabtay la'aanta",
    "ps": [
     "**Xilliyada, sadarrada habka ASS iyo VTT `NOTE` blocks lama taabto hal xaraf.** Beddeliddu waxay khusaysaa qoraalka wadahadalka kaliya, weligoodna ma khuseeyaan sadarrada qaab-dhismeedka.",
     "Miiska ereyada weligii wax kama beddelo faylkaaga qoraal-hoosaadka si otomaatig ah — natiijadu waa soo-bax cusub oo asalkuna wuxuu ahaanayaa sida uu yahay."
    ]
   },
   {
    "h2": "Su'aalaha badanaa la isu weydiiyo",
    "ps": [
     "**Maxaa eray loogu beddeli waayay?** Hubi baaxadda marka hore: iyadoo \"second line only\" la doortay, gelitaannada leh hal sadar oo kaliya waxay ahaanayaan kuwo aan la taaban. Dabadeed hubi waafajinta erey-dhammaystiran, taas oo joojisa waafajinta aan ahayn ereyo keligood taagan.",
     "**Maxay Shiinuhu weli u beddelaan qaybaha hoose ee erayada iyadoo waafajinta erey-dhammaystiran la calaamadiyay?** Taasi waa la filayaa. Shiinaha iyo Jabaanka ma kala soocaan erayada oo wata meelo bannaan, markaa qalabku ma go'aamin karo xuduudaha erayada waafajinta erey-dhammaystiranina wax saameyn ah kuma leh halkaas.",
     "**Sideen dib ugu celiyaa wax walba qalad ka dib?** Dib u celi gelitaannada mid mid liiska isbeddelka; si aad dib uga bilowdo gabi ahaanba, tirtir miiska ereyada oo ku dar qoraal-hoosaadyada mar kale.",
     "**Sadarrada habka ASS ma lagu beddeli karaa si kadis ah?** Maya. Sadarrada habka iyo blocks-ka `NOTE` waxay ka baxsan yihiin baaxadda; qoraalka wadahadalka kaliya ayaa qayb qaata."
    ]
   },
   {
    "h2": "Arrimaha gaarka ah",
    "ps": [
     "Qoraal-hoosaadyada iyo miiska ereyada waxaa lagu farsameeyaa gebi ahaanba biraawsarka: waxba lama soo raro waxna ma dhex maro server. Miiska ereyada lama kaydiyo, markaa waa madhan yahay marka xigta ee aad furto bogga."
    ]
   },
   {
    "h2": "Qalabka iyo hagayaasha la xiriira",
    "ps": [
     "In la dhiso miiska ereyada iyo sida loo ilaaliyo mid xilli ciyaareed ah, eeg [[Miiska ereyada: ilaalinta xilli ciyaareedka oo siman|/guides/subtitle-glossary.html]]; haddii nuxurku yahay mid wasakh ah (calaamadaha biyaha, SDH cues) wad [[Nadiifinta qoraal-hoosaadka|/clean.html]] marka hore; marka magacyada la dejiyo oo aad u baahan tahay luqado kale aado [[Tarjumaadda qoraal-hoosaadka|/translate.html]]; oo ku wad natiijada [[QC-da qoraal-hoosaadka|/qc.html]]."
    ]
   }
  ]
 },
 "hanconv": {
  "seo": {
   "title": "Beddelka Qoraal-hoosaadyada Fududeynta iyo Hiddaha – Taiwan iyo Hong Kong – AI-SRTSub",
   "desc": "Socodka sagaalka jiho: Taiwan oo leh ama aan lahayn erayada gobolka, Hong Kong oo ah qaabkeeda gaarka ah, oo dhammaantood dib loogu beddeli karo fududeyn. Kaliya wada-hadalka ayaa isbeddela; xilliyadu halkooday joogaan.",
   "h1": "Sida loo beddelo qoraal-hoosaadyada Shiinaha ee fududeynta iyo hiddaha",
   "intro": "Haddii qoraal-hoosaad loo diro Taiwan, Hong Kong ama dhulka weyn, waxay beddleysaa labada eray iyo qaababka xarfaha. Sagaal jiho oo laga xusho, waxaana la beddelaa oo keliya wada-hadalka — xilliyada, lambarrada tusmada iyo xarumaha qaabka ASS waligood lama taabto.",
   "ctaText": "Fur qalabka beddelka"
  },
  "body": [
   {
    "h2": "Waxa qalabkani qabto",
    "ps": [
     "Beddelka u dhexeeya fududeynta iyo hiddaha ma aha oo keliya in xaraf kasta si ka duwan loo qoro. Erayga fudud ee la mid ah wuxuu u dhigmaa erayo kala duwan gobollada kala duwan — erayga \"software\" wuu ku kala duwan yahay Taiwan iyo dhulka weyn, Hong Kong-na waxay leedahay nooc kale. Qalabka beddelku wuxuu kuwan ka dhigayaa kuwo kala saaran:"
    ]
   },
   {
    "h2": "Soo dejinta iyo ogaanshaha",
    "ps": [
     "Soo jiid fayl ama ka raadi mid — SRT, VTT, ASS iyo TXT waa la taageeraa — ama ku dheji nuxurka qoraal-hoosaadka sanduuqa si toos ah. Qaabka waxaa loo ogaadaa si toos ah waxaana lagu muujiyaa agagaarka \"Qaabka la ogaaday\"."
    ],
    "img": {
     "file": "hanconv-up",
     "alt": "Aagga soo dejinta beddelaha: aagga dhicista iyo sanduuqa dhejinta, iyadoo qaabka la ogaaday uu kor ku yaal",
     "cap": "SRT / VTT / ASS / TXT, qaabka waxaa la ogaadaa si toos ah"
    }
   },
   {
    "h2": "Dooqashada sagaalka jiho",
    "ps": [
     "Sagaalka jiho ee hoos yimaada \"Beddel ku zuuji\" waxay u qaybsamaan saddex kooxood. **Fududeynta → hiddaha**: hiddaha guud, Taiwan (beddel erayada), Taiwan (xarfaha kaliya), Hong Kong. **Hiddaha → fududeynta**: guud, ka yimid Taiwan, ka yimid Hong Kong. **Hiddaha ilaa hiddaha**: qaababka Taiwan, qaababka Hong Kong.",
     "Dooqashada \"Erayada Taiwan\" waxay sidoo kale beddeshaa erayada gobolka: erayga \"software\" wuxuu noqdaa midka Taiwan iyo sidoo kale erayga \"macluumaadka\"; \"Xarfaha Taiwan\" waxay beddeshaan oo keliya sida xarfaha loo qoro waxayna ka tageysaa erayadaada sidooda. Hong Kong waa kiis kale oo gabi ahaanba isticmaala eray kale oo loogu talagalay \"software\". Si aad dib ugu beddesho fududeynta, isticmaal kooxda hoose — waa inaad sheegtaa nooca hiddaha ee aad ka imaneysaan, sababtoo ah qoraalka Taiwan iyo Hong Kong waxay qaataan waddooyin kala duwan oo dib loogu noqdo."
    ],
    "img": {
     "file": "hanconv-dir",
     "alt": "Beddel kaarka: liiska hoos u dhaca ee meesha loo socdo oo muujinaya \"Fududeynta → Hiddaha Taiwan (beddel erayada)\" la doortay",
     "cap": "Jihooyinku waxay ku jiraan liiska hoos u dhaca ee \"Beddel ku zuuji\" saddex kooxood; kanina waa Taiwan oo leh isbeddello erayada ah"
    }
   },
   {
    "h2": "Natiijada iyo dhoofinta",
    "ps": [
     "Aagga natiijada waxay muujineysaa qoraal-hoosaadkii la beddelay isla markiiba, iyadoo wadata bar xogeed oo bixisa tirada khadka guud iyo inta xariiq ee isbeddeshay. Haddii uusan waxba isbeddelin waxaad heleysaa tilmaam ah in faylku uusan ku jirin xarfaha Shiinaha — kaliya xarfaha Han ayaa la beddelaa, markaa qoraal-hoosaad dhammaantiis Laatiin ah ama lambarro ah wuxuu ahaanayaa sidii uu ahaa.",
     "Kadib soo dejiso ama koobi garee. Sumadda luqadda ayaa la geliyaa magaca faylka — `demo.srt` waxay noqotaa `demo.zh-TW.srt` oo loogu talagalay hiddaha Taiwan, `.zh-Hant` ee hiddaha guud, iyo `.zh-Hans` marka dib loogu beddelayo fududeynta."
    ],
    "img": {
     "file": "hanconv-out",
     "alt": "Aagga natiijada: qoraal-hoosaadka la beddelay iyo bar xogeedka",
     "cap": "Bar xogeedku waxay muujineysaa tirada wadarta guud iyo kuwa isbeddelay; soo deji ama ka koobi garee halkaan"
    }
   },
   {
    "h2": "Waxa aan weligood la taaban",
    "ps": [
     "Kaliya wada-hadalka ayaa la beddelaa. Xilliyada, lambarrada tusmada iyo khadadka qaabka ASS lama taabto gabi ahaanba — natiijadu waa diyaar in la isticmaalo iyada oo aan dib loo samayn wax qaabayn ah."
    ]
   },
   {
    "h2": "Su'aalaha Badanaa La Is Weydiiyo",
    "ps": [
     "**Waa maxay sababta beddeluhu uusan u beddelin erayga \"nadiif\"?** Khariidadaha hal-ilaa-badan waxaa lagu xalliyaa eray ahaan: macnaha \"nadiif\" iyo macnaha \"qalalan\" waxay wadaagaan hal qaab oo hidde ah, halka macnaha \"jirridda geedka\" uu isticmaalo mid kale. Miisaska waxay ka yimaaddeen OpenCC, iyagoo la jaanqaadaya weedho dhan halkii ay ka ahaan lahaayeen xarfo keli keli ah.",
     "**Waa maxay farqiga u dhexeeya hiddaha Taiwan iyo Hong Kong?** Erayada: erayga \"software\" wuu ku kala duwan yahay labada u dhexeeya. Dooro jihada gobolka aad u dhiibeyso.",
     "**Tirada xarfaha ma isbeddeshay beddelka kadib?** Kaliya xarfaha Han ayaa la isku beddelay — ma jiraan wax gelitaanno ah oo lagu daray ama laga saaray mana jiro xilli la dhaqaajiyay. Haddii tirada xariiqdu isbeddeshay, hubi in qaabka si sax ah loo ogaaday.",
     "**Qaamuuska ma guuleysstay in la soo raro?** Boggu wuxuu kuu sheegayaa inaad dib u soo dejiso oo aad dib u daydo. Wuxuu ku rartaa maxalliyan, markaa ma jirto baahi loo qabo in qoraal-hoosaadyada meel la geliyo."
    ]
   },
   {
    "h2": "Asturnaanta",
    "ps": [
     "Beddelku wuxuu si buuxda uga shaqeeyaa biraawsarkaaga. Ma jiro nuxur qoraal-hoosaad ah oo waligiis loo dirayo adeege."
    ]
   },
   {
    "h2": "Qalabka iyo hagayaasha la xiriira",
    "ps": [
     "Haddii waxa aad u baahan tahay ay tahay fududeynta ilaa hiddaha, eeg [[U beddel qoraal-hoosaadyada fududeynta hiddaha|/guides/srt-simplified-to-traditional.html]]; sababta ay uga badantahay beddelka xarfaha, eeg [[Fududeynta iyo hiddaha ma aha beddel xaraf ah|/guides/simplified-traditional-chinese.html]]; si loogu tarjumo luqad kale, [[Tarjumaadda qoraal-hoosaadka|/translate.html]]."
    ]
   }
  ]
 },
 "how-to-make-lrc-file": {
  "seo": {
   "title": "Sida loo waafajiyo erayada heesaha LRC - Hal xariiq halkii eray, ku dhufo - AI-SRTSub",
   "desc": "Samee fayl LRC ah oo ka billow eber: ku dheji hal xariiq halkii eray, ku dhufo wakhtiga adiga oo dhageysanaya, gaabanayaasha muhiimka ah, goorta la boodboodayo xariiq, LRC ama SRT, iyo waxa la sameeyo marka wakhtigu leexdo.",
   "h1": "Sida loo waafajiyo erayada heesaha LRC",
   "intro": "Faylka LRC waa mid fudud oo ah \"hal xariiq oo eray ah oo lagu daray hal dhibic oo wakhti ah\". Samaynta mid waxaa loo yaqaan waafajin: qabashada xilliga ay xariiq kasta billaabato.",
   "ctaText": "Fur qalabka waafajinta erayada"
  },
  "body": [
   {
    "h2": "Waxa ay tahay waafajinta dhab ahaantii",
    "ps": [
     "Qaab-dhismeedka faylka LRC wuxuu noqon karaa mid aad u fudud: hal eray oo xariiqdii ah, mid kasta waxaa ka horreeya summada wakhtiga ee `[mm:ss.xx]`. Marka ciyaaryahan uu gaaro xariiq, wuxuu muujiyaa erayadaas xilligaas.",
     "Markaa shaqada oo dhan ee \"samaynta LRC\" waa in la meeleeyo dhibic wakhti ah xariiq kasta oo eray ah — mana jirto mishiin kuu qaban kara taas, sababtoo ah go'aaminta halka ay xariiqdu ka billaabato in la qaado waxay qaadataa dhageysi."
    ]
   },
   {
    "h2": "Imisa wareeg ayay heesuhu u baahan yihiin",
    "ps": [
     "Waxaa mudan in laga fikiro daqiiqad ka hor inta aadan billaabin; waxay badbaadisaa inta badan shaqada dib u eegista:"
    ],
    "img": {
     "file": "lrc-tap2",
     "alt": "Ciyaar, shaambad-xariiqdaan, ka noqo-hal-xariiq iyo ka bood-xariiqdaan kontaroolada aagga ku dhufashada",
     "cap": "Riixitaanka Enter inta lagu jiro ciyaarta waa mid siman; ma shaambadaysay xariiqda khaldan? Riix Z oo dib u shaambadee"
    }
   },
   {
    "h2": "Dhejinta erayada waxay go'aamisaa sida ay u siman tahay inta kale",
    "ps": [
     "Ku dheji erayada hal xariiq halkii eray; khadadka maran waa la boodaa. Kala goynta xariiqda ee aad dhejiso waa xariiqyada aad waafajin doonto hadhow — u kala jab xariiqro badan hadda waxaadna ku dhufan doontaa jeer badan hadhow.",
     "Dhejinta LRC jirta sidoo kale way shaqaysaa: calaamadaha wakhtiga `[mm:ss.xx]` waa la aqoonsadaa, kadib soo dejinta waxaad **ka sii wadaysaa xariiqda ugu horreysa ee aan lahayn wakhti**, si xariiqyada hore loo waafajiyay aan loo dib u samayn.",
     "Taas macnaheedu waa LRC kala bar ah waa la keydin karaa oo dib loogu dhejin karaa hadhow si loo sii wado."
    ],
    "img": {
     "file": "lrc-paste2",
     "alt": "Aagga dhejinta erayada iyo badhanka falanqaynta erayada",
     "cap": "Hal xariiq halkii eray; dhejinta LRC dhammaystiran waxay akhrisaa wakhtiyada jira si aad u sii waddo"
    }
   },
   {
    "h2": "Dhoofinta LRC ama SRT",
    "ps": [
     "**Ciyaaryahanka muusikada, dhoofi LRC.** foobar2000, dhammaan noocyada ciyaartoyda iyo qalabka leh muujinta erayada way akhriyaan.",
     "**Si aad erayada ugu geliso fiidiyow ama aad uga sii shaqeyso, dhoofi SRT.** Raadadka erayada fiidiyowga, qalabka erayada iyo softwiijka wax ka beddelka waxay akhriyaan SRT. Dhoofinta xariiq kasta waxay jirtaa ilaa inta midka xiga uu ka billaabowdo, xariiqda ugu dambaysana waxay dib ugu dhacdaa 2 ilbiriqsi.",
     "Labaduba waxay dhoofiyaan kaliya xariiqyada leh wakhtiga — xariiqyada la booday waligood ma soo galaan faylka."
    ],
    "img": {
     "file": "lrc-export",
     "alt": "Soodejiso-LRC, soodejiso-SRT iyo badhannada koobiga ee aagga dhoofinta",
     "cap": "LRC ee ciyaartoyda, SRT ee fiidiyowga; kaliya xariiqyada leh wakhtiga ayaa la dhoofiyaa"
    }
   },
   {
    "h2": "Waxyaabo yar oo sahlan in si khaldan loo fahmo",
    "ps": [
     "**Wax walba ma yar bay ka leexdeen waafajinta ka dib? Isticmaal magdhow (offset).** Dhoofi SRT oo u wareeji sidii hal shay [[Hagaajinta wakhtiga|/shift.html]]; way ka dhaqso badan tahay in dib loo waafajiyo xariiq-xariiq.",
     "**Leexitaanku ma korayaa sida ay heesuhu u socdaan? Taas waa dhibaato xawaare ah.** Marka xawaaraha ciyaarta iyo xawaaraha duubista ay kala duwan yihiin, qaladku wuxuu ku korayaa dhanka dhammaadka, taasina waxay u baahan tahay cabbir saamayn leh, ee ma aha magdhow keliya.",
     "**Gaabanayaashu waxay dareemaan dabiici haddii aad si wadajir ah u isticmaasho.** Meel bannaan (Space) ayaa ciyaarta iyo joojinta maamusha, Enter waxay shaambadaysaa xariiqda hadda, Z waxay ka noqotaa hal xariiq — riix Enter si toos ah inta lagu jiro ciyaarta halkii aad ka beddeli lahayd jiirka iyo kiiboodhka.",
     "**Tayada maqalku waxay saameyneysaa saxnaanta.** Isha codadka cad waxay u sahlanaan tahay in la raaco; duubista nool iyo ilaha leh muusikada gadaal ka ciyaysa ee codka weyn leh ayaa aad uga adag."
    ]
   },
   {
    "h2": "Qalabka iyo hagayaasha la xiriira",
    "ps": [
     "Si aad u hesho hage dhammaystiran eeg [[Sida loo isticmaalo qalabka waafajinta erayada|/guides/lrc.html]]; si aad LRC jirta ugu beddesho qoraal-hoosaad eeg [[LRC ilaa SRT|/guides/lrc-to-srt.html]]; haddii SRT-ga la dhoofiyay si khaldan loo waafajiyay isticmaal [[Hagaajinta wakhtiga|/shift.html]]; oo natiijada dhex mari [[Hubinta Tayada Qoraal-hoosaadka|/qc.html]]."
    ]
   }
  ]
 },
 "lrc": {
  "seo": {
   "title": "Qalabka waafajinta erayada heesaha – Soo deji hees, ku dheji erayada, ku dhufo – AI-SRTSub",
   "desc": "Soo deji hees, ku dheji erayada, ku dhufo taariikh wakhtiyeed xariiqdii adiga oo dhageysanaya, oo dhoofi LRC ama SRT. Space ayaa ciyaara oo joojiya, Enter waxay shaambadaysaa xariiqda, Z waxay ka noqotaa, gacmuhu waxay saaran yihiin kiiboodhka.",
   "h1": "Sida loo isticmaalo qalabka waafajinta erayada heesaha",
   "intro": "Soo deji hees, ku dheji erayada, ku dhufo taariikh wakhtiyeed xariiq kasta adiga oo dhageysanaya, oo dhoofi LRC ama SRT caadiga ah. Maqalku wuxuu ka shaqeeyaa maxalliyan waligiisna lama soo geliyo.",
   "ctaText": "Fur qalabka waafajinta erayada heesaha"
  },
  "body": [
   {
    "h2": "Waxa qalabkani qabto",
    "ps": [
     "Sii hees fayl erayada heesaha ah oo lagula heesi karo: hal xariiq halkii eray, xariiq kasta waxay wadataa dhibic wakhti ah. Ciyaartoydu waxay akhriyaan LRC, raadadka erayada waxay akhriyaan SRT, labadaba waxaa laga dhoofin karaa halkan."
    ]
   },
   {
    "h2": "1 Soo deji heesaha",
    "ps": [
     "Tiirka koowaad ee dhinaca bidix waxay qaadataa fayl maqal ah: **MP3, M4A, FLAC, WAV iyo OGG** dhammaantood way shaqeeyaan. Maqalku wuxuu ka shaqeeyaa maxalliyan waligiisna lama soo geliyo.",
     "Tayada maqalku ma saameyneyso saxnaanta wakhtiga, laakiin isha codadka cad ayaa sahlan in la raaco; duubista nool iyo ilaha leh muusikada gadaal ka ciyaysa ee codka weyn leh ayaa si weyn uga adag in la waafajiyo."
    ],
    "img": {
     "file": "lrc-up",
     "alt": "Aagga soo dejinta heesaha ee qalabka waafajinta erayada heesaha",
     "cap": "MP3 / M4A / FLAC / WAV / OGG dhammaantood way shaqeeyaan, maqalkuna wuxuu ka shaqeeyaa maxalliyan oo keliya"
    }
   },
   {
    "h2": "2 Ku dheji erayada heesaha",
    "ps": [
     "Ku dheji erayada tiirka labaad, **hal xariiq halkii eray**; khadadka maran waa la boodaa si toos ah. Kadib guji \"Falanqee erayada\".",
     "Dhejinta LRC jirta sidoo kala way shaqaysaa — calaamadaha wakhtiga ee `[mm:ss.xx]` waa la aqoonsadaa, kadib soo dejinta waxaad ka sii wadaysaa xariiqda ugu horreysa ee aan lahayn wakhti, si xariiqyada hore loo waafajiyay aan loo dib u samayn."
    ],
    "img": {
     "file": "lrc-paste",
     "alt": "Aagga dhejinta erayada iyo badhanka falanqaynta erayada",
     "cap": "Ku dheji hal xariiq halkii eray, ama ku dheji LRC dhammaystiran oo u oggolow qalabku inuu akhriyo wakhtiyada jira"
    }
   },
   {
    "h2": "3 Ku dhufo adiga oo dhageysanaya",
    "ps": [
     "Ciyaar heesta oo riix Enter xilliga ay xariiqdu billaabato (ama guji \"Shaambadee xariiqdaan\"); wakhtiga xariiqdaas waa la diiwaangeliyaa calaamadduna waxay u booddaa tan xigta.",
     "Gaabanayaasha: **space** waxay ciyaartaa oo joojisaa, **Enter** waxay shaambadaysaa xariiqda hadda, **Z** waxay ka noqotaa hal xariiq. Riixitaanka Enter inta lagu jiro ciyaarta waa habka ugu siman ee loo shaqeeyo — ma jiraan beddelasho dib iyo hor leh oo u dhexeeya jiirka iyo kiiboodhka.",
     "Ma shaambadaysay xariiqda khaldan? Riix Z si aad uga noqoto oo dib u shaambad. Haddii aadan rabin inaad gabi ahaanba shaambadaysid xariiq (qayb muusig ah oo keliya), guji \"Ka bood xariiqdaan\" mana ka dhex muuqan doonto dhoofinta."
    ],
    "img": {
     "file": "lrc-tap",
     "alt": "Aagga ciyaarta, shaambadaynta iyo ka boodidda ee aagga ku dhufashada",
     "cap": "Space waxay ciyaartaa oo joojisaa, Enter waxay shaambadaysaa xariiqda hadda, Z waxay ka noqotaa — gacmuhu waxay saaran yihiin kiiboodhka"
    }
   },
   {
    "h2": "4 Dhoofi",
    "ps": [
     "Tiirka afraad waxay samaysaa dhoofinta: **Soo deji LRC** ee ciyaartoyda, **Soo deji SRT** ee raadadka erayada fiidiyowga, ama \"Koobi\" si aad qoraalka si toos ah u qaadato.",
     "Kaliya xariiqyada leh wakhtiga ayaa la dhoofiyaa; xariiqyada la booday waligood ma soo galaan faylka. Dhoofinta SRT xariiq kasta waxay jirtaa ilaa inta midka xiga uu ka billaabowdo, xariiqda ugu dambaysana waxay dib ugu dhacdaa 2 ilbiriqsi."
    ],
    "img": {
     "file": "lrc-out",
     "alt": "Soodejiso-LRC, soodejiso-SRT iyo badhannada koobiga ee aagga dhoofinta",
     "cap": "LRC ee ciyaartoyda, SRT ee fiidiyowga; kaliya xariiqyada leh wakhtiga ayaa la dhoofiyaa"
    }
   },
   {
    "h2": "Waxa aan la taaban",
    "ps": [
     "Qoraalka erayada heesaha lama dib u qoro. Waafajintu waxay ku daraysaa kaliya hal dhibic wakhti ah xariiqdii mana taabto erayada aad dhejisay.",
     "Markaad soo dejiso LRC jirta, xariiqyada hore u watay summada wakhtiga waxay hayaan wakhtigoodii asalka ahaa waxaadna ka shaambadaysaa kaliya xariiqda ugu horreysa ee aan wakhtiga lahayn ilaa dhammaadka."
    ]
   },
   {
    "h2": "Su'aalaha badanaa la is weydiiyo",
    "ps": [
     "**Waa maxay sababta qaar ka mid ah xariiqyadu uga maqan yihiin dhoofinta?** Xariiqyada la booday iyo kuwa aan lahayn wakhtiga waligood ma soo galaan faylka. Ku noqo tallaabada saddexaad oo ku dar, ama xaqiiji in loogu talagalay in la boodo.",
     "**Wakhtiyada ma la beddeli karaa inta ka dambeysa?** Haddii aad rabto inaad wax yar u wareejiso wax walba shaambadaynta ka dib, dhoofi SRT oo isticmaal [[Hagaajinta wakhtiga|/shift.html]] si aad u magdhawdo ama u cabbirto sidii hal shay.",
     "**LRC ama SRT — kee baan dhoofiyaa?** LRC ee ciyaartoyda muusikada (foobar2000, macaamiisha qulqulka, dhammaan noocyada ciyaartoyda); SRT marka erayada ay tahay inay fadhiistaan fiidiyowga ama lagu sii shaqeeyo qalabka qoraal-hoosaadka.",
     "**Imisa ayay qaadataa hal hees?** Waxay ku xiran tahay inta xariiq ee jirta iyo sida aad u saxan tahay. Hees soddon ama afartan xariiq ah, daqiiqado yar inta u dhaxaysa markaad aqoon u leedahay socodka; daba-galka saxnaanta heerka eray waxay qaadataa wakhti dheer."
    ]
   },
   {
    "h2": "Asturnaanta",
    "ps": [
     "Maqalka iyo erayada waxaa lagu shaqeeyaa si buuxda biraawsarka: waxba lama soo geliyo waxna ma dhex maro adeege. Maqalka waa la furtaa oo waxaa lagu ciyaaraa maxalliyan oo keliya."
    ]
   },
   {
    "h2": "Qalabka iyo hagayaasha la xiriira",
    "ps": [
     "Haddii aad hore u lahayd LRC oo aad rabto qoraal-hoosaad eeg [[LRC ilaa SRT|/guides/lrc-to-srt.html]]; si aad u ogaato fikirka iyo dhibaatooyinka ka dambeeya waafajinta eeg [[Sida loo waafajiyo erayada heesaha LRC|/guides/how-to-make-lrc-file.html]]; haddii SRT-ga la dhoofiyay uu khaldan yahay isticmaal [[Hagaajinta wakhtiga|/shift.html]]; oo natiijada dhex mari [[Hubinta Tayada Qoraal-hoosaadka|/qc.html]]."
    ]
   }
  ]
 },
 "lrc-to-srt": {
  "seo": {
   "title": "Beddelaha LRC ilaa SRT – U beddel Erayada Heesaha Qoraal-hoosaad – AI-SRTSub",
   "desc": "U beddel erayada heesaha LRC qoraal-hoosaad SRT: xariiq kasta waxay jirtaa ilaa inta midka xiga uu billaabowdo, tilmaanta ugu dambeysa waxay heleysaa 3 ilbiriqsi. Heesaha ka weyn 60 daqiiqo si sax ah ayay u aqriyaan. Wuxuu ka shaqeeyaa biraawsarkaaga.",
   "h1": "LRC ilaa SRT",
   "intro": "U beddel faylasha erayada heesaha LRC SRT: soo jiid faylka, dooro SRT, soo deji. Waqtiyada dhammaadka waxaa si toos ah looga buuxiyaa xariiqda xigta.",
   "ctaText": "Beddel LRC → SRT"
  },
  "body": [
   {
    "h2": "Sida LRC uga duwan tahay SRT",
    "ps": [
     "LRC waa qaab erayo heeso ah: xariiq kasta waxay wadataa oo keliya wakhtiga \"billaabista heesidda\" ee `[minutes:seconds.cents]` **iyo ma laha wakhti dhammaad**; tilmaam kasta oo SRT ah waxay u baahan tahay bilow iyo dhammaad labadaba. Marka udub-dhexaadka beddelku waa buuxinta wakhtiyada dhammaadka."
    ],
    "img": {
     "file": "convert-upload-lrc",
     "alt": "Aagga soo dejinta: fayl LRC ah oo la raray, oo loo aqoonsaday LRC",
     "cap": "Fayl erayo heeso ah oo leh [00:12.50] wakhtiyada waxaa loo aqoonsadaa LRC isla markiiba"
    }
   },
   {
    "h2": "Sida wakhtiyada dhammaadka loo buuxiyo",
    "ps": [
     "Xeerku waa mid fudud: **xariiq kasta waxay jirtaa ilaa inta midka xiga uu billaabowdo**; xariiqda ugu dambeysa ma laha mid \"xiga\", markaas waxay heleysaa 3 ilbiriqsi. Sidoo kale, wakhtiyada LRC waxay wataan oo keliya daqiiqado iyo ilbiriqsiyo — saacado ma laha — goobta daqiiqaduna ma sii socoto (62:05 waxay la macno tahay 1 saac 2 daqiiqo 5 ilbiriqsi), marka raadadka dheer ee dheeraadka ah sida isku-dhafka DJ waxay u aqriyaan si sax ah."
    ]
   },
   {
    "h2": "Sida loo beddelo",
    "ps": [
     "Fur [[beddelaha|/convert.html]], ku rid LRC-ga, dooro **SRT - SubRip** sida wax-soo-saarka, kadib beddel oo soo deji. Waa mid waxtar u leh fiidiyowyada muusikada iyo gelinta erayada heesaha sida qoraal-hoosaadyada ciyaartoyda; SRT-ga la dhoofiyay waxaa loo beddeli karaa VTT si loogu isticmaalo shabakadda."
    ]
   }
  ]
 },
 "make-bilingual-subtitles": {
  "seo": {
   "title": "Laba Hab oo Loo Sameeyo Qoraal-hoosaadyada Labada Luqadood – AI-SRTSub",
   "desc": "Qoraal-hoosaadyada labada luqadood waxay ku yimaadaan laba nooc: laba xariiq oo hal tilmaam ah, ama laba tilmaam oo isku wakhti ah. Faa'iidooyinka, khasaaraha, iyo sida loogu beddelo mid ilaa midka kale. – AI-SRTSub",
   "h1": "Laba Hab oo Loo Sameeyo Qoraal-hoosaadyada Labada Luqadood",
   "intro": "Qoraal-hoosaadka labada luqadood ee isku mid ah wuxuu qarin karaa laba qaab-dhismeed oo kala duwan. Baro sida loo kala saaro, samaynta, kala-goyska, iyo beddelka ayaa dhammaantood joojin doona inay ku dhibaan.",
   "ctaText": "La shaqee qoraal-hoosaadyada labada luqadood"
  },
  "body": [
   {
    "h2": "Sida Laba Nooc Ay U Eg Yihiin",
    "ps": [
     "**Nooca B: laba tilmaam oo isku wakhti ah.** Hal xariiq oo wada-hadal ah waxay noqotaa laba tilmaam oo qoraal-hoosaad ah oo kala duwan oo leh wakhti isku mid ah — mid Ingiriisi ah, mid Shiine ah — oo la is dul saaray. Tani waa habka ugu caansan ee loo dhiso qoraal-hoosaadyada ASS ee labada luqadood leh."
    ]
   },
   {
    "h2": "Meesha Nooc Kasta Uu Ku Liito",
    "ps": [
     "Qodobka daciifka ah ee Nooca A waa **ogaanshaha**: kala-goynta raadadku waxay ku xiran tahay nidaamka qoraalka, markaa lammaanaha Shiinaha iyo Ingiriisiga ama Jabbaanka iyo Ingiriisiga waxay ku kala baxaan hal eegmo, halka **isku-darka wada wadaaga hal qoraal** — Ingiriisiga oo lagu daray Faransiiska, ama Shiinaha oo lagu daray kanji Jabbaan ah — aan la kala saari karin. Qodobka daciifka ah ee Nooca B waa **soosaarka**: labada wakhti waa inay si sax ah isugu dhigmaan oo isku-dubaridkooda gacanta lagu qabto waa daal; ciyaartooyda qaar waxay sidoo kale soo bandhigaan labada tilmaam ee isku wakhtiga ah, iyagoo ciriiriyey shaashadda. Xeerka suulka: isticmaal Nooca A qoraal-hoosaadka dhammaaday ee loogu talagalay daawadayaasha; isticmaal Nooca B marka aad u baahan tahay inaad kala soocdo raadadka shaqo dheeraad ah."
    ]
   },
   {
    "h2": "Lada Waddada",
    "ps": [
     "**Ka dhis qoraal-hoosaadka labada luqadood midka asalka ah**: isticmaal [[Tarjumaadda Qoraal-hoosaadka AI|/translate.html]] oo dooro “Labada luqadood · kan asalka ah oo kor ku yaal” ama “Labada luqadood · kan la turjumay oo kor ku yaal” marka la dhoofinayo — waxaad si toos ah u heleysaa Nooca A; doorashada ASS waxay sidoo kale bixisaa laba qaab, “kor iyo hoose ayaa la is dul saaray” iyo “laba xariiq oo xagga hoose ah”.",
     "**Isku dar laba raad ama u beddel noocyada u dhexeeya**: isticmaal [[Qalabka Siibitaanka Qoraal-hoosaadka Labada Luqadood|/bilingual.html]] iyo habka “ku dar hal galis oo laba xariiq ah” — Nooca B ayaa soo galaya, Nooca A ayaana soo baxaya; marka loo socdo dhinaca kale, “u kala qaybi laba fayl” waxay qaadataa Nooca A ama B waxayna soo saartaa laba raad oo madaxbannaan."
    ],
    "img": {
     "file": "bilingual-modes",
     "alt": "Afarta hab ee siibaha labada luqadood; “ku dar hal galis oo laba xariiq ah” waxay isku daraysaa laba tilmaam oo wadaaga wakhti isku mid ah",
     "cap": "“Ku dar hal galis oo laba xariiq ah”: Nooca B wuxuu noqonayaa Nooca A"
    }
   },
   {
    "h2": "Qalabka Ciyaari Doona",
    "ps": [
     "Ciyaartooyda shabakadda (HTML5 ``) iyo inta badan ciyaartooyda mobillada waxay si kalsooni leh u maamulaan Nooca A; ciyaartooyda kombiyuutarka (VLC, mpv, PotPlayer) waxay aqbalaan labadaba waxayna xitaa siin karaan labada tilmaam ee isku wakhtiga ah midabyo iyo meelo kala duwan. Marka laga shakiyeptaba, dhoofi Nooca A sida SRT — waa midka ugu safarka wanaagsan. Wixii ku saabsan farqiga u dhexeeya qaababka laftooda, eeg [[SRT, VTT ama ASS: Kee Ayay Tahay Inaad Isticmaasho|/guides/subtitle-format-comparison.html]]."
    ],
    "img": {
     "file": "translate-export",
     "alt": "Xulashada qaabka labada luqadood ee guddiga dhoofinta qalabka tarjumaadda",
     "cap": "Dooro kala-dambeynta xariiqda labada luqadood isla marka la dhoofinayo — hal tallaabo ayaana lagu dhammeeyaa"
    }
   },
   {
    "h2": "Su'aalaha Badanaa La Is Weydiiyo",
    "ps": [
     "**Qoraal-hoosaadka labada luqadood wuxuu u muuqdaa mid cidhiiri ah — maxaan sameeyaa?** Xakamee ballaca xariiqda: guddiga dhoofinta ee qalabka tarjumaadda wuxuu leeyahay dejin “ballaca xariiqda labada luqadood”; xariiq yar oo cidhiiri ah waxay la macno tahay xarfo yar oo tilmaamkiiba ah iyo shaashad nadiif ah.",
     "**Waxaan rabayaa kaliya hal raad.** Qalabka siibitaanka ee “kaydi kan asalka ah oo keliya / kaydi tarjumaadda oo keliya” wuxuu ku maamulaa hal gujis, eeg [[U kala qaybi Qoraal-hoosaadka Labada Luqadood Labada Raad|/guides/split-bilingual-subtitles.html]]."
    ]
   }
  ]
 },
 "merge": {
  "seo": {
   "title": "Isku darka subtitles-ka labada luqood iyo kuwa qaabaysan – Isku dar, habee, dhoofso – AI-SRTSub",
   "desc": "Isku dar laba fayl oo subtitle ah si aad u hesho hal waddo oo laba luqood ah, dib u habee faylka laba luqood ah ee jira, ama qaabee mid keli-luqad ah: hababka lammaanaynta, ASS iyo VTT templates.",
   "h1": "Sida loo isticmaaloisku darka labada luqood iyo subtitles-ka saamaynta gaarka ah",
   "intro": "Isku dar laba fayl oo subtitle ah hal waddo oo laba luqood ah, ama si toos ah u habee subtitles-ka: farshaxanka, midabka, dulmarka iyo boosku waa waxa aad aragto waa waxa aad hesho.",
   "ctaText": "Fur qalabka subtitle-ka saamaynta gaarka ah"
  },
  "body": [
   {
    "h2": "Waxa qalabkani qabto",
    "ps": [
     "Boggan keliya wuxuu daboolayaa saddex shaqo: isku darka feylasha asalka ah iyo kuwa la turjumay oo loo beddelayo hal fayl oo laba luqood ah, hagaajinta nidaamka iyo qaabka faylka hore u ahaa laba luqood, iyo ku darida saamaynta gaarka ah fayl keli-luqad ah."
    ]
   },
   {
    "h2": "Saddex shaqo, hal bog",
    "ps": [
     "Qeybta sare ee boggu waxay leedahay saddex tab: **Isku dar laba fayl**, **Hagaaji fayl laba luqood ah**, **Fayl keli-luqad ah**. Xulashadaadu waxay go'aaminaysaa inta tiir ee soo gelinta ah ee ka muuqata dhinaca bidix.",
     "Marka la isku darayo laba fayl, dhinaca bidix wuxuu hayaa laba tiir, \"1 Subtitles-ka asalka ah\" iyo \"2 Subtitles-ka la turjumay\"; mid walba wuxuu aqbalaa fayl la soo geliyay ama qoraal toos ah loo soo guuriyay."
    ],
    "img": {
     "file": "merge-mode",
     "alt": "Saddexda tab ee xagga sare ee qalabka subtitle-ka saamaynta gaarka ah iyo goobta soo gelinta ee bidixda",
     "cap": "Saddex tab oo xagga sare ah; doorashada \"Isku dar laba fayl\" waxay keenaysaa tiir asal ah iyo mid turjuman oo dhinaca bidix ah"
    }
   },
   {
    "h2": "Sida labada fayl loo lammaaneeyo",
    "ps": [
     "Shayga ugu horreeya ee hoos yimaada \"3 Dejinta isku darka\" waa habka lammaanaynta: **Lammaane siday u kala horreeyaan · isticmaal waqtiga asalka ah**, **Lammaane waqtiga · isticmaal waqtiga asalka ah**, **Lammaane siday u kala horreeyaan · isticmaal waqtiga la turjumay**.",
     "Marka labada fayl ay leeyihiin tiro isku mid ah oo ah galitaanno isku xigxiga, lammaanaynta siday u kala horreeyaan ayaa ah tan ugu ammaan badan. Marka tiradu kala duwanaato, lammaane waqtiga oo u daa qalabku inuu is waafajiyo.",
     "Hoos waxaa ku yaal qaab-dhismeedka qoraalka (si otomaatig ah loo ogaado / laba xariiq galitaan kasta / lammaane is bedbeddelaya) iyo kala horreynta (asalka xagga sare / turjumaadda xagga sare)."
    ],
    "img": {
     "file": "merge-pair",
     "alt": "Habka lammaanaynta, qaab-dhismeedka qoraalka iyo fursadaha kala horreynta ee hoos yimaada dejinta isku darka",
     "cap": "Habka lammaanaynta ayaa go'aaminaya xariiqda la socota midda kale, waqtiga la isticmaalayana halkaan ayaa lagu dejiyaa"
    }
   },
   {
    "h2": "Hagaaji shayga qaabka mid mid",
    "ps": [
     "Gudiga qaabku wuxuu fadhiyaa dhinaca midig. Marka aad dhoofineyso ASS, xannibaadda \"Muuqaalka ASS\" ayaa khusaysa: qaabeynta, cabbirka, midabka, hufnaanta, farta, geesiga, iyo waxyaabo kale.",
     "Marka aad dhoofineyso qaabeynta WebVTT ee laba luqood ah, xannibaadda \"Qaabka WebVTT\" ayaa khusaysa: waxaad bedeli kartaa xariiqda toosan, booska jiifka, cabbirka ballaca, iyo qiimaha toosinta ee cue-ga oo dhan.",
     "Marka aad dhammeyso waxaad keydin kartaa natiijada adoo ka dhigaya preset oo dib u isticmaali kartaa markii dambe adiga oo ka dooranaya \"Laga soo bilaabo preset-yada la keydiyay\" oo gujinaya \"Codso\"."
    ],
    "img": {
     "file": "merge-style",
     "alt": "Halbeegyada gudiga muuqaalka ASS ee dhinaca midig",
     "cap": "Cabbirka, midabka, dulmarka, hooska iyo toosinta waa kuwo la hagaajin karo, natiijadana waa la keydin karaa"
    }
   },
   {
    "h2": "Hubi horudhaca ka hor inta aanad dhoofin",
    "ps": [
     "\"Horudhaca isku darka\" waa miis: #, waqtiga, asalka, turjumaadda, qaabka. Baarka sare wuxuu shaandheeyaa safafka shakiga leh iyadoo la adeegsanayo **leh saamaynta codka**, **leh horgalaha ku hadlaaha**, **ka gaaban 1 ilbiriqsi**, **ka badan laba xariiq** iyo **xawaaraha akhriska oo la dhaafay**, ama erey furaha ah oo aad qorto.",
     "Gujinta booska qaabka ee safku waxay ballaarisaa tifaftiraha booskaas waxayna qortaa kaliya safafka isticmaalaya; \"Tirtir dhammaan wax ka beddelka\" waxay soo celisaa wax ka beddel kasta oo gacanta lagu sameeyay.",
     "Marka ay u ekaato mid sax ah, aad \"4 Dhoofso\": soo deji faylka subtitle-ka ama koobiyeey waxa ku jira."
    ],
    "img": {
     "file": "merge-preview",
     "alt": "Miiska horudhaca isku darka iyo baarka shaandhayntiisa",
     "cap": "Horudhacu waa dhoofinta; shaandhee safafka shakiga leh ama ballaari hal boos oo qaab ah"
    }
   },
   {
    "h2": "Waxa aan la taaban",
    "ps": [
     "Isbeddellada qaabku waxay beddelaan muuqaalka kaliya, waligoodna ma beddelaan wadahadalka. Qoraalka asalka ah iyo turjumaaddu lagama beddelo xaraf keliya inta lagu jiro isku darka.",
     "Marka aad dhoofineyso SRT ama \"VTT oo aan lahayn qaabayn\", macluumaad qaab ah laguma qoro faylka — boggu wuxuu kuu sheegayaa in VTT uusan lahayn xannibaad STYLE ah oo ciyaartoygu isticmaali doono muuqaalkiisa caadiga ah."
    ]
   },
   {
    "h2": "Su'aalaha badanaa la is weydiiyo",
    "ps": [
     "**Waa maxay haddii labada fayl ay leeyihiin tirooyin galitaan oo kala duwan?** Isticmaal \"Lammaane waqtiga\" oo qalabku wuxuu ku waafajinayaa dhowaanshaha.",
     "**Waa maxay haddii ciyaaryahanku uu iska indhatiro qaabeynta ASS ee la dhoofiyay?** Qaababka waxaa lagu keydiyaa gudaha faylka, laakiin taageerada ciyaartoyga ee ASS waa kala duwan tahay.",
     "**Sidee baan ugu noqdaa template-kii ugu horreeyay ka dib markii aan kharribay?** \"Soo celi halbeegyada caadiga ah\" ee xannibaadda ASS iyo \"Soo celi caadiyaha template-ka\" ee xannibaadda VTT mid walba wuxuu dib u dejiyaa qaybtiisa.",
     "**Waa maxay toddobada saf ee tusaalaha ku jira?** Waxay yihiin tusaale ku dhex jira, si aad u aragto sida isku darku u eg yahay; tusaalaha lama dhoofin karo."
    ]
   },
   {
    "h2": "Asturnaanta",
    "ps": [
     "Subtitles-ka waxaa lagu habeeyaa si buuxda biraawsarka dhexdiisa: wax la soo geliyo ma jiraan wax kalena server ma dhex maraan. Xir biraawsarka oo wax walba oo fadhigaas ah waa dabar go'ayaan."
    ]
   },
   {
    "h2": "Qalabka iyo hagayaasha la xiriira",
    "ps": [
     "Si aad u kala qaybiso fayl laba luqood ah oo dib loogu celiyo laba waddo isticmaal [[Bilingual split|/bilingual.html]]; si aad u samayso mid kasoo horjeeda oo aad hal luqad ugu beddesho fayl laba luqood ah eeg [[Two ways to make bilingual subtitles|/guides/make-bilingual-subtitles.html]]; ku socodsii natiijada [[Subtitle QC|/qc.html]]; xilli dhan hal mar isticmaal [[Batch conversion|/batch.html]]."
    ]
   }
  ]
 },
 "qc": {
  "seo": {
   "title": "Sida loo Isticmaalo Subtitle QC – Hubinta Waqtiga iyo Qaab-dhismeedka – AI-SRTSub",
   "desc": "Subtitle QC: 17 sharci ayaa qabta isdabamarinta, ballaca safka, xawaaraha akhriska iyo joojinta, heerarka 27 luqood. Kala bar waa hagaajin hal-gujis ah.",
   "h1": "Sida loo Isticmaalo Subtitle QC",
   "intro": "Kahor inta aanad dhiibin subtitles-ka, ku socodsii bogga QC si loo eego waqtiga iyo qaab-dhismeedka: waxa la hubiyo, sida loo akhriyo warbixinta, iyo dhibaatooyinka lagu hagaajin karo hal gujis.",
   "ctaText": "Fur Subtitle QC"
  },
  "body": [
   {
    "h2": "Waxa Qalabkani U Qabto",
    "ps": [
     "Subtitles-ka u muuqda kuwa sax ah ayaa badanaa soo bandhiga waqtiyo isdaba maraya, safaf aad u ballaaran, ama xawaare akhris oo sarreeya. Bogga QC wuxuu taxayaa dhibaatooyinkan mid mid:"
    ]
   },
   {
    "h2": "Dooro Shuruucda Luqadda Marka Hore",
    "ps": [
     "Hoostiisa \"Hubi shuruucda luqaddeee\" waxaad ku dejinaysaa shan heer: **ballaca ugu badnaan ee hal saf** (42 unug oo kala bar ah oo ah jiifka si caadi ah, 36 ee laba jibbaaran, 28 ee taagan), **xadka xawaaraha akhriska** (18 unug oo ballac ah ilbiriqsikii Shiinaha, Jabbaan iyo Kuuriya, 20 luqadaha kale), **muddada ugu yar ee 833 millisekant**, **muddada ugu badan ee 7000 millisekant**, iyo **ugu badnaan 2 xariiq**. U deji luqadda subtitle-ka si ay si otomaatig ah u ogaato ama mid ka mid ah 27-ka gacanta uga dooro; jihada shaashaddu waxay beddeshaa kaliya heerka ballaca safka - xawaaraha akhriska, muddada iyo tirada xariiqda waxay ahaanayaan sidooda. Unugyada kala bar ah waa cabbirka la wadaago: hal hanzi wuxuu tiriyaa sida 2, hal xaraf oo Laatiin ah sida 1 - ballaca safka oo ah 42 wuxuu u dhigmaa 21 hanzi ama 42 xaraf."
    ],
    "img": {
     "file": "qc-rules",
     "alt": "Dejinta QC: shan sanduuq oo gelinta heerarka ah oo ay dheer yihiin menu-yada luqadda iyo jihada shaashadda",
     "cap": "Shan heer + luqad + jiho; heerarka caadiga ah waxay waafaqsan yihiin dhaqanka caadiga ah ee warshadaha"
    }
   },
   {
    "h2": "Akhrinta Warbixinta",
    "ps": [
     "17-ka sharci waxay soo sheegaan natiijooyinka saddex heer: **qaladaad** (qoraal qalloocan, qaabka waqtiga), **digniino** (galitaanno madhan, isdaba marin, muddooyin gaaban ama dheer, xawaaraha akhriska oo dhaafo xadka), iyo **talooyin** (booska jebinta xariiqda, meelaha bannaan). Gelitaan kasta wuxuu wataa lambarka galitaanka."
    ],
    "img": {
     "file": "qc-report",
     "alt": "Goobta warbixinta QC: natiijooyinka oo loo qaybiyay qalad, digniin iyo talo",
     "cap": "Warbixin saddex-heer ah: natiijo kasta waxay wadataa lambarka galitaanka iyo qiyamka la cabbiray"
    }
   },
   {
    "h2": "Hagaajinta iyo Dhoofinta",
    "ps": [
     "Kaarka \"Hagaaji & dhoofso\" wuxuu taxayaa kaliya **alaabada si otomaatig ah loo hagaajin karo**: duubista, ka saaridda galitaannada madhan, ku darida meelaha bannaan, beddelidda joojinta; **alaabada beddela waqtiga** (isdhaafsiga bilowga iyo dhammaadka, wareejinta isdaba marinta) waa kuwo aan la calaamadin. Guji \"Codso hagaajinta\" oo hubin cusub ayaa si otomaatig ah u shaqaynaysa. **Xawaaraha akhriska ee ka sarreeya xadka ma laha hagaajin otomaatig ah** — turjumaadda waa in gacanta lagu soo gaabiyaa. Ka dib hagaajinta, dhoofso SRT ama VTT, ama guji \"Soo deji warbixinta\" si aad u keydiso warbixin `.qc.txt` ah."
    ],
    "img": {
     "file": "qc-fix",
     "alt": "Kaarka hagaajinta: sanduuqyada calaamadaynta ee alaabada si otomaatig ah loo hagaajin karo iyo badhanka Codso hagaajinta",
     "cap": "Kaliya alaabada otomaatigga ah ayaa soo gala liiska; hagaajinta beddeleysa waqtiga lama calaamadiyo si caadi ah"
    }
   },
   {
    "h2": "Su'aalaha Badanaa la Is Weydiiyo",
    "ps": [
     "**Waa maxay sababta ASS-kaygu aan loo dhoofin karin?** QC waxay dhoofisaa kaliya SRT iyo VTT; ASS waa la geliyaa laakiin dib uma soo baxdo. Si aad u ilaaliso saamaynta ASS, kala shaqee [[Format Converter|/convert.html]] marka hore.",
     "**Waa maxay macnaha xawaaraha akhriska ee 18?** Shiinaha, Jabbaan iyo Kuuriya xadka waa 9 xaraf oo buuxa ilbiriqsikii (18 unug oo kala bar ah); luqadaha kale waxay helayaan 20 unug oo kala bar ah ilbiriqsikii.",
     "**Koodhka faylkaygu waa jabay — ma la hubin karaa weli?** QC waxay akhrisaa UTF-8 kaliya; hagaaji koodhka bogga dayactirka qoraalka qalloocan marka hore.",
     "**Ma taaban doontaa waqtiga aan haysto?** Maaha ilaa inta aad ka tagayso kooxda \"beddeleysa waqtiga\" adigoon calaamadin; xataa marka la calaamadiyo, isbeddel kasta waa la sharxayaa ka hor intaan la codsan."
    ]
   },
   {
    "h2": "Hagayaasha La Xiriira",
    "ps": [
     "Subtitles-ka si dhakhso ah u socda oo adag in la akhriyo — eeg hagaha loo qoondeeyay [[Subtitles Too Fast to Read|/guides/subtitle-too-fast.html]]. Waxa la hubiyo ka hor inta aan la dhiibin — liiska hubinta waa [[What to Check Before Delivery|/guides/subtitle-quality-check.html]]. Waqtiga ka lumaya habsami-u-socodka waa dhibaato kale — eeg [[Subtitles Drifting Out of Sync|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "remove-subtitle-ads": {
  "seo": {
   "title": "Ka Saar Xayeysiisyada & Calaamadaha Biyaha ee Subtitles-ka – AI-SRTSub",
   "desc": "Ka xaaq calaamadaha biyaha iyo xayeysiisyada subtitles-ka: URL-yada, credits-ka fansub iyo tags-ka encoded by waxaa lagu tirtiraa hal gujis, oo ay la socdaan galitaannada nuqulka ah iyo kuwa madhan. – AI-SRTSub",
   "h1": "Ka Saar Xayeysiisyada iyo Calaamadaha Biyaha Subtitles-ka",
   "intro": "URL-yada, credits-ka iyo galitaannada promo ee ku qarsan subtitles-kaaga waxaa hal mar lagu tirtiraa xeerarka calaamadaha biyaha ee nadiifiyaha — oo tirtirid kasta oo khalad ah dib ayaa loo soo celin karaa galitaan kasta.",
   "ctaText": "Nadiifi calaamadaha biyaha ee subtitle-ka"
  },
  "body": [
   {
    "h2": "Waa maxay calaamadahan biyaha ah",
    "ps": [
     "Subtitles-ka laga soo dejiyo internet-ka badanaa waxay helaan galitaanno dheeraad ah bilowga ama dhammaadka (mararka qaarkood dhexda sidoo kale): URL-yada, cinwaannada iimaylka, magacyada kooxaha fansub, `encoded by` / `translated by` credits, magacyada goobaha sida opensubtitles, iyo xariiqyada sida \"raac akoonkayaga WeChat\" ama \"ujeedooyin waxbarasho keliya\". Waxay yihiin galitaanno subtitle oo caadi ah — oo wata waqti, oo qaadanaya xariiq — markaa ciyaartoydu ma tirtiri karaan; waa in lagu ogaadaa nuxurka."
    ]
   },
   {
    "h2": "Halkaa lagu sameeyo",
    "ps": [
     "Fur [[Subtitle Cleaner|/clean.html]] oo soo gali subtitle-kaaga; kooxda \"Calaamadaha biyaha & galitaannada qashinka ah\" horay bay u leedahay \"Ka saar calaamadaha biyaha iyo xayeysiisyada\", \"Ka saar galitaannada nuqulka ah\" iyo \"Ka saar galitaannada madhan\" oo la calaamadiyay si caadi ah, nadiifintiisuna si otomaatig ah ayay u bilaabanaysaa. Ogaanshu wuxuu ka shaqeeyaa laba heer: **calaamadaha adag** sida URL-yada, iimaylada, kooxaha fansub iyo magacyada goobaha waxay tirtiraan galitaanka oo dhan markay ku dhacaan dherer kasta; **calaamadaha jilicsan** sida @handles, credits-ka \"encoded\" ama \"proofread\" waxaa lagu qiimeeyaa kaliya galitaannada gaaban ee aan ka badnayn 40 xaraf, si looga fogaado in la gooyo wada-hadalka dheer. Galitaannada laba luqood ah marka hore xariiqyada calaamadaha biyaha ayaa laga xaaqaa xariiq xariiq halka xariiqyada wada-hadalka la hayo; galitaanka waxaa loo tirtiraa si dhan ah oo kaliya haddii raadadka calaamadaha biyuhu ay soo haaraan ka dib xaaqidda."
    ],
    "img": {
     "file": "clean-opts",
     "alt": "Shaashada fursadaha nadiifinta: saddexda sanduuq ee kooxda calaamadaha biyaha iyo galitaannada qashinka ah",
     "cap": "Kooxda \"Calaamadaha biyaha & galitaannada qashinka ah\" waa mid shaqaynaysa si caadi ah — looma baahna habayn gacanta ah"
    }
   },
   {
    "h2": "Dib-u-eegis iyo dhoofin",
    "ps": [
     "Liiska isbeddelka, galitaan kasta oo la tirtiray wuxuu wataa summada \"watermark & ad\" — eeg si aad u xaqiiqiso in aan waxba looga saarin si khalad ah; haddii mid uu u ekaado mid khalad ah, guji \"Soo celi\" si aad dib ugu celiso. Mar alla markii la xaqiiqiyo, soo deji: magaca faylku wuxuu si otomaatig ah u helayaa summada `.clean`. Nadiifinta waxaa maxalli ah oo ka dhex socota biraawsarkaaga; subtitles-kaaga waligood meel looma diro."
    ]
   }
  ]
 },
 "repair": {
  "seo": {
   "title": "Sida loo Dayactiro Subtitles-ka Qalloocan – Ogaansada Koodhka – AI-SRTSub",
   "desc": "Socodka: ogoo koodhka asalka ah (GBK / Big5 / Shift_JIS / EUC-KR), kala sarraysii dayactirka, ka dib keydi UTF-8 oo wata BOM ama GBK. Waqtiga iyo nambaradu weligood ma beddelaan.",
   "h1": "Sida loo dayactiro subtitles-ka qalloocan",
   "intro": "Faylka subtitle-ka ee ka buuxa xarfaha qashinka ah nadif ma aha — waxaa lagu akhriyay koodh khaldan. Qalabka dayactirka wuxuu ogaadaa koodhka asalka ah wuxuuna dib u soo celiyaa xarfaha saxda ah.",
   "ctaText": "Fur qalabka dayactirka qallooca"
  },
  "body": [
   {
    "h2": "Waxa qalabkani qabto",
    "ps": [
     "Bytes-yada isla, marka loo akhriyo sida UTF-8 iyo marka loo akhriyo sida GBK waxay soo saaraan laba qaybood oo xarfo ah oo kala duwan — faylku ma jabin, waxaa la furay koodh khaldan. Waa kan waxa qalabka dayactirku qabto:"
    ]
   },
   {
    "h2": "Soogeli faylka, ha ku dhejin",
    "ps": [
     "Labadu meelood ee laga soo galo waxay dayactiri karaan xaddi kala duwan oo waxyeello ah, markaa **soo geli faylka haddii aad awooddo**. Adigoo wata fayl, bytes-yada asalka ah weli way jiraan: qalabku wuxuu isku dayaa hal koodh ka dib mid kale, oo marka uu aqoonsado GBK wuxuu u furayaa sida GBK — wax la qiyaaso ma jiraan. Qoraalka lagu soo dhejiyay ma aha bytes cayriin ah. Waqtiga uu biraawsarku dhiibo xarigga, qaladku hore ayuu u dhacay, markaa qalabku wuxuu keliya ka shaqayn karaa dib u dhac oo wuxuu qaadan karaa waxa uu heli karo.",
     "Haddii qoraalka la soo dhejiyay uu hore u haysto xarfa beddelka ah (su'aashaas sanduuqa ku jirta ``), bytes-yada asalka ah way tageen oo wax aan ahayn ma soo celin karaan. Boggu si cad bay taas u sheegaysaa: kor u noqo oo isticmaal \"Dooro fayl\" si aad u soo geliso asalka."
    ],
    "img": {
     "file": "repair-up",
     "alt": "Aagga soo gelinta bogga dayactirka: aagga hoos u dhigista iyo sanduuqa dhejinta, iyadoo koodhka la ogaaday uu ka muuqdo xagga sare",
     "cap": "Jiid faylka ama ka raadi; sanduuqa dhejinta wuxuu fadhiyaa hoose oo wuxuu dayactiri karaa wax aad uga yar"
    }
   },
   {
    "h2": "Waxa ogaansagu kuu sheegayo",
    "ps": [
     "Markaad soo geliso, kaarka ogaansagu wuxuu bixiyaa xukun. **Lama helin wax qallooc ah**: nuxurku si fiican buu u akhrismayaa siduu yahay; haddii ciyaaryahankaagu weli tusi la'yahay qashin, ciyaaryahanka ayaa isticmaalay koodh khaldan — hoos u dhaadhac \"Keydi sida\", dooro mid kale oo sii faylkaas. Marka uu **u ekaado mid qalloocan**, kaarku wuxuu taxayaa raadadka uu helay:"
    ],
    "img": {
     "file": "repair-diag",
     "alt": "Kaarka ogaanshaha: xukunka oo ay dheer yihiin raadadka qallooca ee ku qoran xariiq xariiq",
     "cap": "Ogaanshu wuxuu taxayaa raadadka iyadoo loo eegayo nooca halkii uu ka dhihi lahaa \"waa mid qalloocan\""
    }
   },
   {
    "h2": "Sida musharixiinta loo kala sarraysiiyo, iyo sida loo doorto",
    "ps": [
     "Hoostiisa \"Tirooyin lagu hagaajiyo tan\", musharixiinta waxaa lagu taxay nidaamka **midka ugu dhow luqadda dhabta ah**, illaa 12 ka mid ah, mid walbana waxaa lagu calaamadiyay lammaanaha koodhka ee laga akhriyay loona akhriyay. Guji mid si aad u aragto sida ay u egtahay, dooro, ka dib hoos u dhaadhac si aad u keydiso. Ma ku qanacsanid? Isticmaal \"Keydi sida ay tahay\" si aad ugu noqoto asalka.",
     "Nidaamku wuxuu ka yimaadaa dhibco: qaybta xarfaha caadiga ah, xarigyada calaamadaha, gidaarrada xarfaha qarsoon, dhammaan waa la miisaamay. **Haddii aysan jirin dhibco si cad u fiican, wax talo ah lama bixiyo** — ma riixi doono musharrax kala bar sax ah si uu u yeesho mid. Qoraalka la qalloociyay laba jeer (la keydiyay si khaldan hal mar, ka dibna la dayactiray si khaldan hal mar) wuxuu helayaa hal wareeg oo dheeraad ah oo xalinta dambe ah musharixiinta ugu sarreeya, markaa wax kasta oo ku dhex jira laba lakab weli waa la badbaadin karaa."
    ],
    "img": {
     "file": "repair-fix",
     "alt": "Liiska musharixiinta dayactirka oo lagu kala sarraysiiyay inta ay u eeg yihiin luqad dhabta ah, mid walbana wuxuu wataa lammaanaha koodhkiisa",
     "cap": "Musharixiinta oo lagu kala sarraysiiyay \"midka ugu dhow luqadda dhabta ah\", mid walbana wuxuu tusayaa koodhka ay khusayso"
    }
   },
   {
    "h2": "Keydinta saxda ah waa tallaabada ugu dambeysa",
    "ps": [
     "Natiijada la dayactiray weli waa in si sax ah loo keydiyaa. Marka ciyaaryahanku uusan ogaan karin UTF-8, keydinta sida **UTF-8 oo wata BOM** (ciyaartooyda Windows waxay ku tiirsan yihiin BOM) ama sida **GBK** caadi ahaan way dejisaa. Waxaad u keydin kartaa sida UTF-8, UTF-8 (oo wata BOM), GBK, Big5, Shift_JIS ama EUC-KR; haddii wax aysan ku habboonayn, waxaa laguu sheegayaa inaaddoorato mid kale (GBK ma qaadi karo Kuuriya). Faylasha la soo dejiyay waxay helayaan `-fixed` oo lagu daray magaca.",
     "Marka koodhka la ogaaday uusan ahayn UTF-8, \"Keydi sida\" horay bay ugu sii diyaarsan tahay UTF-8 oo wata BOM adiga. Markaad adigu taabato liiska hoos u dhaca, way joojinaysaa qiyaasta."
    ],
    "img": {
     "file": "repair-out",
     "alt": "Aagga natiijada: sanduuqa qoraalka oo wata liiska keydinta iyo badhanka soo dejinta",
     "cap": "Dooro koodh, ka dib soo deji — magaca faylku wuxuu helayaa -fixed oo lagu daray"
    }
   },
   {
    "h2": "Waxa aan la taaban weligood",
    "ps": [
     "Xarfaha si khaldan loo akhriyay oo keliya ayaa la beddelaa. Nambarada tixraaca, waqtiga iyo xariiqyada qaabka ASS lagama beddelo habakaan."
    ]
   },
   {
    "h2": "Su'aalaha Badanaa La Is Weydiiyo",
    "ps": [
     "**Waan soo geliyay faylka, markaa maxaan weli u baahanahay inaan dib u keydiyo?** Faylka laftiisu waa fiican yahay; waxa jaban waa ciyaaryahanka oo ku akhriyaya koodh khaldan. Xaaladdaas wax xaraf ah oo ku jira qoraalka uma baahna beddel — kaliya keydi koobi sida UTF-8 oo wata BOM ama GBK oo sii ciyaaryahanka.",
     "**Maxaan loo dayactiri karin qoraalka la soo dhejiyay?** Marka xarigga beddelka uu ka muuqdo nuxurka la soo dhejiyay, bytes-yada asalka ah waa tageen oo ma jiro wax laga soo bilaabo xagga dambe. Kor u noqo oo isticmaal \"Dooro fayl\" si aad u soo geliso asalka.",
     "**Musharraxaan doonayo kuma jiro liiska?** Wax talo ah lama bixiyo ilaa uu dhibco si cad uga fiican yahay waxa aad hore u haysatay. Isku day inaad beddesho koodhka la ogaaday oo u daa inuu dib u kala sarraysiiyo.",
     "**Imisa fayl hal mar?** Hal mar mid. Soo deji dayactirka, ka dib geli faylka xiga."
    ]
   },
   {
    "h2": "Asturnaanta",
    "ps": [
     "Ogaanshaha iyo dayactirku waxay si buuxda uga dhex shaqeeyaan biraawsarkaaga. Wax nuxur subtitle ah sooma maro server."
    ]
   },
   {
    "h2": "Qalabka iyo hagayaasha la xiriira",
    "ps": [
     "Halka ay ka yimaadaan subtitles-ka qalloocan iyo sababta ay ugu dambeeyaan inay sidaas u ekaadaan — eeg [[Halka ay ka yimaadaan subtitles-ka qalloocan|/guides/subtitle-garbled-characters.html]]; koodhku waa fiican yahay laakiin nuxurku waa wasakh — isticmaal [[Nadiifinta subtitle-ka|/clean.html]]; si loo hubiyo waqtiga iyo xawaaraha akhriska — [[Subtitle QC|/qc.html]]."
    ]
   }
  ]
 },
 "sbv-to-srt": {
  "seo": {
   "title": "Beddelaha SBV ilaa SRT – Beddel Subtitles-ka YouTube – AI-SRTSub",
   "desc": "Beddel subtitles-ka SBV ee laga soo dejiyay YouTube-ka oo u beddel SRT si aad ugu isticmaasho CapCut, Premiere, iyo ciyaartooyda. Qiimaha waqtigu waa sidisii — qaab-dhismeedka oo keliya ayaa is beddelaya.",
   "h1": "SBV ilaa SRT",
   "intro": "U beddel subtitles-ka SBV ee YouTube-ka kuwo SRT ah: soo jiid faylka, dooro SRT, soo deji. Qiimaha waqtigu waa mid aan la taaban — qaab-dhismeedka oo keliya ayaa is beddelaya.",
   "ctaText": "Beddel SBV → SRT"
  },
  "body": [
   {
    "h2": "Waxa SBV yahay iyo halka uu ka yimaado",
    "ps": [
     "SBV waa **qaabka subtitle-ka ee YouTube**: soo dejinta \"faylasha subtitle\" ee ka imanaya YouTube-ka badanaa waxay ku siinaysaa .sbv. Qaab-dhismeedkeedu wuu ka fudud yahay SRT — waqtiyada billowga iyo dhammaadka waxay ku jiraan **hal xariiq** oo ay kala soocayaan faasas, qoraalku wuxuu ku xigaa si toos ah hoosta, mana jiraan nambarada cue-ga."
    ]
   },
   {
    "h2": "Sababta ay ciyaartooydu u diidaan",
    "ps": [
     "Ka baxsan YouTube laftiisa, inta badan software-ka tafatirka iyo ciyaartooydu ma taageeraan SBV. Wuxuu ka maqan yahay baloogga nambarada wuxuuna u qoraa xariiqdiisa waqtiga si ka duwan SRT, markaa beddelidda magaca kordhinta waxba ma tarayso — qaab-dhismeedka waa in dib loo dhiso dhab ahaantii."
    ],
    "img": {
     "file": "convert-upload-sbv",
     "alt": "Aagga soo gelinta: fayl SBV ah oo la riday, oo loo aqoonsaday inuu yahay SBV",
     "cap": "SBV waxaa loo aqoonsadaa sida uu yahay, looma baahna in la beddelo magaca kordhinta"
    }
   },
   {
    "h2": "Sida loo beddelo",
    "ps": [
     "Fur [[converter|/convert.html]], soo geli SBV-ga, dooro **SRT - SubRip** sida wax-soo-saarka, ka dib beddel oo soo deji. Nambarada cue-ga waxaa loo qoondeeyaa si cusub, jebinta xariiqda asalka ah ee ku jirta cue dhexdeedana waxaa lagu mideeyaa hal xariiq (SRT waxay oggolaataa cue-yo badan oo xariiq ah; SBV halkaan waxaa looga dhoofiyaa hal xariiq)."
    ]
   }
  ]
 },
 "shift": {
  "seo": {
   "title": "Sida loo beddelo Waqtiga Subtitle-ka (Offset, Scale, Two Anchors) – AI-SRTSub",
   "desc": "Hagaha tifaftiraha waqtiga oo sawirro wata: soo rar subtitles, ku dar tallaabooyin hagaajin, sixitaanka labada barrooc, iyo dhoofinta.",
   "h1": "Tifaftiraha Waqtiga: Hagaha Tallaabo-tallaabo",
   "intro": "Hagahani wuxuu ku tusi doonaa qalabka bilow ilaa dhammaad: soo rar subtitles, ku dar tallaabooyin hagaajin, samee hubin, sax cue kasta, oo dhoofi.",
   "ctaText": "Fur tifaftiraha waqtiga"
  },
  "body": [
   {
    "h2": "Soo rar subtitles-kaaga",
    "ps": [
     "Jiid faylasha sanduuqa dhibcaha leh ama guji si aad mid u doorato; sidoo kale waxaad **ku dhejin kartaa nuxurka** si toos ah sanduuqa qoraalka. Qaabka waxaa lagu ogaadaa kordhinta iyo nuxurka labadaba, natiijaduna waxay ka muuqataa calaamadda qaabka. Gelitaannada la taageero: srt, vtt, ass (oo ay ku jirto ssa), sbv, lrc iyo txt."
    ],
    "img": {
     "file": "shift-upload",
     "alt": "Aagga soo dejinta: muunad subtitle ah oo la soo raray, oo loo aqoonsaday SRT",
     "cap": "Magaca faylka iyo qaabka la ogaaday waxay ka muuqdaan meesha laga soo dejiyo; sanduuqa qoraalka waa la bedeli karaa."
    }
   },
   {
    "h2": "Ku dar tallaabooyin hagaajin",
    "ps": [
     "Hagaajintu waxay samaysaa **silsilad tallaabooyin ah**: tallaabo kasta waxay qabataa hal shaqo waxayna qaadataa hal lambar, iyada oo qaybteeda lagu muujiyay sanduuqa dhexdiisa. Tallaabooyinka waxay ka shaqeeyaan kor ilaa hoos, iyo beddelidda tallaabo kasta **waxay dib u xisaabinaysaa wax walba oo ka yimid subtitles-kii asalka ahaa** — markaa waad dib ugu noqon kartaa oo aad wax ka bedeli kartaa lambar wakhti kasta adigoon khalkhalin."
    ]
   },
   {
    "h2": "Sixitaanka labada barrooc",
    "ps": [
     "Marka aadan aqoonin cayrinta ilbiriqsi ama saamiga, isticmaal laba barrooc: marka la daro, **laba \"hadda\" beerood ayaa si toos ah loo buuxiyaa** laga bilaabo cue-ka ugu horreeya iyo kan ugu dambeeya ee faylkaaga. Waxaad buuxisaa oo keliya beeraha \"bartilmaameedka\" - wakhtiyada ay tahay in cue-yadaasi dhab ahaantii soo muuqdaan. Wax kasta oo dhexdooda ah dib ayaa loo faafiyaa si siman."
    ],
    "img": {
     "file": "shift-step-two",
     "alt": "Sixitaanka labada barrooc: wakhtiyada hadda si toos ah ayaa loo buuxiyay, wakhtiyada bartilmaameedka ah ee la gelinayo",
     "cap": "Beeraha hadda waxay ka yimaadaan faylkaaga; beeraha bartilmaameedka ah waa wakhtiyada saxda ah ee aad ku aragto fiidiyowga."
    }
   },
   {
    "h2": "Hubinta waqtiga iyo sixitaanka cue kasta",
    "ps": [
     "Ka dib markaad socodsiiso tallaabooyinka, akhri **hubinta waqtiga**: cue-yada aadka u gaaban, aadka u dheer, ee aadka u cufan ee akhriska, sadarrada aadka u ballaadhan, ama cue-yada is dulsaaran dhammaantood waa la qoraa. Hubintu **waxay calaamadisaa oo keliya dhibaatooyinka mana beddesho wax walba** iyada oo keligeed ah. Afarta xukun ee caadiga ah waa 0.833 s mudada ugu yar, 7 s ugu badnaan, 9 xaraf ilbiriqsiba xawaaraha akhriska iyo 21 xaraf sadarkiiba — dhammaantood waa kuwo laga beddeli karo bogga. Hoostiisa, sixitaanka cue kasta wuxuu kuu oggolaanayaa inaad midoobiso laba cue oo deris ah, kala qaybiso mid, ama aad toos u beddesho bilowgiisa iyo dhammaadkiisa; sixitaan kasta waa la noqon karaa."
    ]
   },
   {
    "h2": "Dhoofi natiijada",
    "ps": [
     "Guddiga natiijadu waxay tusaysaa wakhtiyada asalka ah iyo kuwa la hagaajiyay **garab iyo garab** si fudud loo hubiyo. Qaabka wax-soo-saarka wuxuu u noqdaa qaabka gelitaanka sidii caadiga ahayd, laakiin waxaad u beddeli kartaa mid kasta oo ka mid ah srt, vtt, ass, sbv, lrc ama txt ka hor inta aadan soo dejisan."
    ],
    "img": {
     "file": "shift-result",
     "alt": "Guddiga natiijada: ka hor iyo ka dib wakhtiyada garab iyo garab, oo wata badhamada soo dejinta iyo koobiyaynta",
     "cap": "Wakhtiyada asalka ah dhinaca bidix, kuwa la hagaajiyay dhinaca midig; soo deji marka hubinta degdega ah ay u egtahay mid sax ah."
    }
   }
  ]
 },
 "shift-subtitle-timing": {
  "seo": {
   "title": "Sida Loo Soo Horaysiyo ama Loo Dib U Dhigo Dhammaan Subtitle-ada – AI-SRTSub",
   "desc": "Cue kasta wuu daahay lacag isku mid ah: isticmaal tallaabada wareejinta ee tifaftiraha waqtiga - geli hal lambar oo taban ama togan oo dhammaan cue-yada kor u wada qaad.",
   "h1": "U Guuri Faylka Subtitle-ka oo Dhan Hore ama Dib",
   "intro": "Maqalku wuu bilaabmaa, subtitle-kuna wuxuu soo baxayaa goor dambe - isla markaana cue kasta wuxuu daahay lacag isku mid ah. Taasi waa magdhow leeg: hal lambar ayaa hagaajinaya.",
   "ctaText": "Fur tifaftiraha waqtiga"
  },
  "body": [
   {
    "h2": "Marka hore xaqiiji in cue kasta uu daahay lacag isku mid ah",
    "ps": [
     "Si degdeg ah u hubi hal cue oo u dhow bilowga, mid dhexda ku jira iyo mid dhammaadka ah. Haddii saddexdoodaba ay daahan yihiin si ku dhow lacag isku mid ah, waa **magdhow leeg**, oo hal tallaabo oo wareejin ah ayaa hagaajinaysa. Haddii bilowgu sax yahay oo leexashadu ay kordhiso xagga dhammaadka, taasi waa dhibaato kale - eeg [[subtitles getting more and more out of sync|/guides/subtitles-out-of-sync.html]]."
    ]
   },
   {
    "h2": "Waxa la gelinayo: taban si loo hormariyo, togan si loo dib u dhigo",
    "ps": [
     "Tifaftiraha waqtiga, ku dar tallaabada **Wareaji dhammaan** oo geli magdhowga sanduuqa qiimaha: subtitles-ka daahan waxay qaataan lambar taban si hore loogu soo jiido; kuwa hore u socdana waxay qaataan lambar togan si dib loogu riixo. Haddii subtitles-ku ay daahan yihiin 1.5 ilbiriqsi, geli **-1.5** — unuggu waa ilbiriqsi."
    ],
    "img": {
     "file": "shift-step-shift",
     "alt": "Wareaji dhammaan tallaabada iyadoo -1.5 ilbiriqsi la geliyay",
     "cap": "Lambarka taban wuxuu oo jiidayaa faylka oo dhan horay; unugga waxaa lagu qoray sanduuqa dhexdiisa, oo ah ilbiriqsi."
    }
   },
   {
    "h2": "Socodsii oo hubi cue-ga ugu horreeya",
    "ps": [
     "Ka dib marka la isticmaalo, guddiga natiijadu wuxuu qoraa wakhtiyada asalka ah iyo kuwa cusub ee cue kasta **garab iyo garab**. Marka hore hubi cue-ga ugu horreeya: wakhtiga cusub ee bilowgu ma ku dhacayaa qaabka uu sadarku ka hadlayo? Kadib si degdeg ah u hubi mid dhexda ku jira. Cue kasta wuxuu u guurayaa lacag isku mid ah wuxuuna ilaalinayaa muddadiisa."
    ]
   },
   {
    "h2": "Dhoofi",
    "ps": [
     "Marka hubinta degdega ahi ay u egtahay mid sax ah, si toos ah u soo deji. Qaabka wax-soo-saarku wuxuu ku noqonayaa qaabka gelitaanka waxaana loo beddeli karaa wax kale. Isbeddelku wuxuu taabanayaa oo keliya wakhtiyada — mana aha xaraf keliya oo qoraal ah."
    ]
   }
  ]
 },
 "simplified-traditional-chinese": {
  "seo": {
   "title": "Ma aha Beddelashada Xarfaha - Erayada Hal-ka-badan iyo kuwa Gobolka – AI-SRTSub",
   "desc": "Saddex waxyaalmood ayaa tan ka dhigaysa mid adag: khariidadaha hal-ilaa-badan ee lagu xalliyo erayga, erayada kala duwan ee Taiwan iyo Hong Kong, iyo beddelidda wadahadalka oo keliya. Hel saddexdoodaba si sax ah oo dib u eegis bini'aadam ah ma jiri doonto.",
   "h1": "Fududayn vs dhaqameed ma aha beddelashada xarfaha",
   "intro": "Xarafka dhaqameed ee beddelaya mid fudud wuxuu ku xidhan yahay xarafka ku xiga. Taasi waa sababta beddeliddan aan loogu samayn karin si indho la'aan ah oo loo beddelayo hal xaraf mar.",
   "ctaText": "Fur beddeleeyaha"
  },
  "body": [
   {
    "h2": "Marka koowaad: hal foom oo fudud, dhowr kuwa dhaqameed ah",
    "ps": [
     "Fududayntu waxay ku soo koobtay dhowr xaraf oo dhaqameed hal foom oo fudud. Dib ugu noqoshada dhinaca kale, hal xaraf oo fudud wuxuu u dhigmaa dhowr kuwa dhaqameed ah, doorashada mid ka mid ah waxay ku xidhan tahay waxa ay la lammaansan tahay:",
     "Beddelidda xaraf xaraf waxay dhammaantood ku soo koobaysaa isla mid waxayna khaladaysaa tusaale kasta. Xallinta **eray ahaan** waa waxa kala saara — miisaska waxay ka yimaadayaan OpenCC, iyagoo la mid ah weedhaha ka hor xarfaha keligood ah. Tusaale ahaan:"
    ]
   },
   {
    "h2": "Marka labaad: Taiwan iyo Hong Kong isku mid ma aha",
    "ps": [
     "Waxaa jira hal lakab oo kale ka dib markaad u beddesho dhaqameed: erayga isla eg waxaa si kala duwan loogu qoraa Taiwan iyo Hong Kong. Erayga \"software\" waa hal shay oo Taiwan ah iyo mid kale oo Hong Kong ah, Taiwanse-kuna waxay isticmaashaa eraygeeda \"macluumaadka\".",
     "Sidaas darteed jihooyinka kala duwan. Dhaqanka Taiwan xitaa wuxuu u kala qaybsamaa \"beddel ereyada\" iyo \"glafyada oo keliya\" - glafyada oo keliya waxay hayaan erayadaada jira, halka beddelka ereyada uu beddelayo ereyada gobolka sidoo kale. Hong Kong waxay heleysaa jiho u gaar ah."
    ],
    "img": {
     "file": "hanconv-dir",
     "alt": "U beddel kaarka: liiska hoos u dhaca ee meesha loo socdo oo muujinaya \"Fudud → Dhaqanka Taiwan (beddel ereyada)\"",
     "cap": "Taiwan waxay bixisaa isbeddellada erayada ama glafyada oo keliya; Hong Kong waxay leedahay jihadeeda"
    }
   },
   {
    "h2": "Marka saddexaad: wadahadalka oo keliya waa in la taabtaa",
    "ps": [
     "Faylka subtitle ma aha wadahadalka oo keliya. Tirooyinka tusaha, wakhtiyada iyo xarumaha qaabka ASS ayaa ku jira halkaas sidoo kala, mana aha hal xaraf oo ka mid ah kuwaas in la beddelo — ASS style khadadka gaar ahaan, maadaama ay ka kooban yihiin magacyada amarka Ingiriiska ee jebiya waqtiga loola dhaqmo sida wadahadalka.",
     "Marka beddelku wuxuu dhacaa ka dib markii la falanqeeyo qaabka: SRT, VTT, ASS iyo TXT mid kastaa wuxuu aqoonsadaa qaybta ah wadahadalka, waxaana la beddelaa oo keliya xarfaha ku jira dhexdiisa. Wakhtiyada iyo qaababka way badbaadaan iyagoo aan la taaban, iyada oo aan lahayn qaabayn dib loo habeeyo."
    ],
    "img": {
     "file": "hanconv-out",
     "alt": "Aagga natiijada: subtitle la beddelay iyo bar tirakoobka oo muujinaya tirada sadarrada la beddelay",
     "cap": "Bar-ka tirakoobka wuxuu tusiyaa inta sadar ee is beddelay; qaabaynta waa la ilaaliyaa sidii ay ahayd"
    }
   },
   {
    "h2": "Dib ugu noqoshada fudud: ka digtoonow",
    "ps": [
     "U beddelidda dhaqameedka una beddelidda fudud sidoo kale waxay u baahan tahay inaad sheegto **nooca dhaqameed ee aad ka imanayso**: caadiga ah, Taiwan iyo Hong Kong waa saddex waddo oo kala duwan, sababtoo ah erayada gobolka waa in loo soo celiyo erayga caadiga ah ka hor intaan la beddelin. Dooro jihada khaldan oo erayada gobolka waxay u badbaadaan wax-soo-saarka fudud.",
     "Kooxda hoose ee sagaalka jiho waa midda dib u beddelaysa: dhaqameed → fudud, Taiwan → fudud, Hong Kong → fudud."
    ]
   },
   {
    "h2": "Qalabka iyo hagayaasha la xiriira",
    "ps": [
     "Hagaha buuxa — [[How to convert simplified and traditional subtitles|/guides/hanconv.html]]; haddii waxa aad u baahan tahay oo keliya ay tahay fudud ilaa dhaqameed — [[Convert simplified subtitles to traditional|/guides/srt-simplified-to-traditional.html]]; si aad luqad kale ugu turjunto, [[Subtitle translation|/translate.html]]."
    ]
   }
  ]
 },
 "split": {
  "seo": {
   "title": "Kala-saarka iyo Isku-dubaridka Subtitle-ada – Cut by block, chain in order – AI-SRTSub",
   "desc": "Ka jar hal fayl qaybo iyadoo loo eegayo muddada ama tirada cue-ga, dib uga bilow mid kasta eber, ama ku xidh dhowr fayl si xidhiidh ah.",
   "h1": "Sida loo kala saaro oo loo midoobiyo subtitle-ada",
   "intro": "Ka jar hal fayl oo dheer qaybo, ama midoobi dhowr fayl oo kala firdhiyey hal fayl.",
   "ctaText": "Fur kala-saarka iyo isku-dubaridka"
  },
  "body": [
   {
    "h2": "Waxa qalabkani qabto",
    "ps": [
     "Qaybinta qaybaha, qaybinta qaybaha hoose iyo isku-darka ilaha dhammaantood waxay la kulmaan is waafajin la'aan u dhaxaysa blocks-ka subtitle iyo blocks-ka fiidiyowga."
    ]
   },
   {
    "h2": "Marka hore dooro jar ama midoobi",
    "ps": [
     "Laba tab oo dusha sare ah: **Kala saar: hal fayl qaybo** iyo **Midoobi: dhowr fayl hal fayl**.",
     "Gudaha \"1 Ku dar subtitles\" waxaad soo gelisaa fayl ama waxaad dhajisaa qoraal; haddii aad dooratay mid khaldan, guji \"Nadiifi\". Boggani wuxuu akhriyaa UTF-8 oo keliya — haddii koodhku jabo aado [[Garbled text repair|/repair.html]] marka hore."
    ],
    "img": {
     "file": "split-mode",
     "alt": "Labada tab ee dusha sare ee bogga kala-saarka iyo isku-dubaridka",
     "cap": "Jarista iyo midoobiddu waa laba tab; fursadaha tallaabada labaad waxay raacayaan doorashadaada"
    }
   },
   {
    "h2": "Sida loo jaro",
    "ps": [
     "Hoosta \"2 Sida loo jaro\" dooro saldhigga: **muddada** (hal qayb daqiiqad kasta oo X ah) ama **tirada cue** (hal qayb cue kasta oo X ah), kadibna geli lambar.",
     "Calaamadee \"Dib u bilow qayb kasta 0:00\" iyo qayb kasta oo ka dhalata waxay ka bilaabataa eber — isticmaal tan marka aad soo geliso qaybaha oo aad siisay qayb kasta ciyaaryahan keligood ah.",
     "Jariddu waxay ku dhacdaa oo keliya xuduudaha cue: marka subtitle aad u dheer uu dul saaran yahay barta jarista, cue-ga oo dhan wuxuu ku jiraa qaybta hore."
    ],
    "img": {
     "file": "split-cut",
     "alt": "Muddada iyo xulashooyinka tirada cue iyadoo uu daaran yahay furaha dib-u-bilowga-eber ee bogga kala-saarka",
     "cap": "Ku jar muddada ama tirada cue, oo si ikhtiyaari ah dib ugu billow qayb kasta 0:00"
    }
   },
   {
    "h2": "Sida loo midoobiyo",
    "ps": [
     "Hoosta \"2 Sida loo midoobiyo\" dooro habka: **Ku xidh si xidhiidh ah** waxay beddeshaa faylka dambe si uu u bilaabmo ka dib marka kan hore dhammaado, iyada oo aan jirin isdhexgal u dhexeeya qaybaha; **Isku dhex dar jadwalka wakhtiga** waxay haysaa wakhtiyada asalka ah ee fayl kasta waxayna u kala soocdaa wakhtiga bilowga.",
     "Isticmaal ku xidhida si xidhiidh ah marka faylashu yihiin qaybta koowaad iyo labaad ee hal qayb, ama marka qaybaha si gaar ah loo saxay ay tahay in dib loo isu keeno; isticmaal isku dhexdarka jadwalka wakhtiga marka faylasha ay ka tirsan yihiin shaashadda si wada jir ah, sida raad asal ah iyo raad la turjumay.",
     "Ka dib midoobidda, nambarada cue waxaa dib loogu tiriyaa si toos ah mana jiro eray wadahadal ah oo isbeddelaya."
    ],
    "img": {
     "file": "split-join",
     "alt": "Xulashooyinka ku-xidhka-sii-socoshada iyo isku-dhex-dhaafka-jadwalka-waqtiga ee bogga midoobidda",
     "cap": "Ku xidhida si xidhiidh ah waxay ku habboon tahay laba qaybood oo ah hal qayb; isku dhex-dhaafka jadwalka wakhtiga wuxuu ku habboon yahay raad asal ah iyo mid la turjumay"
    }
   },
   {
    "h2": "Qaadashada natiijada",
    "ps": [
     "\"3 Natiijada\" dhinaca midig waxay dhoofisaa **SRT** iyo **VTT**; guji \"Soo deji\" ama \"Nuqul\".",
     "Marka aad kala saarayso waxaad isticmaali kartaa \"Soo deji qayb kasta\", taasoo kaydinaysa qayb kasta oo la jaray hal mar halkii ay ka noqon lahayd hal gujin qayb kasta."
    ],
    "img": {
     "file": "split-out",
     "alt": "Dookh qaabka SRT/VTT oo wata badhamada soo-dejinta iyo soo-deji-qayb-kasta ee aagga natiijada",
     "cap": "Natiijooyinka kala-saarka waxaa lagu soo dejisan karaa qayb-qayb; faylka midoobay waa la soo dejiyaa ama waa la koobiyeeyaa si toos ah"
    }
   },
   {
    "h2": "Waxa aan la taaban",
    "ps": [
     "Ma jiro xaraf wadahadal ah oo isbeddelaya. Boggani wuxuu beddelaa oo keliya kuwa cue ee ka tirsan qaybta iyo sida loo tiriyey; nuxurka gelitaanku wuxuu ahaanayaa sida ay yihiin.",
     "Iyadoo \"Ku xidh si xidhiidh ah\" wakhtiyada faylasha dambe waa la beddelaa guud ahaan — taasi waa waxa midoobiddu u baahan tahay; iyadoo \"Isku dhex dar jadwalka wakhtiga\" wakhti kasta oo asal ah waa la ilaaliyaa."
    ]
   },
   {
    "h2": "Su'aalaha badanaa la is weydiiyo",
    "ps": [
     "**Waa maxay haddii qaybta dambe ay noqoto mid aad u gaaban?** Taasi waa caadi. Inta soo hartay ee aan buuxinayn qayb waxay noqotaa qaybteeda halkii la buuxin lahaa.",
     "**Miyaa la kala saari doonaa jumlad dhexda u jirta barta jarinta?** Maya. Jariddu waxay ku dhacdaa xuduudaha gelitaanka oo keliya, cue-ga ka gudbana wuxuu ku jiraa qaybta hore.",
     "**Ka dib isku-dhex-dhaafka, sidee laba cue oo wakhtiyo isku mid ah leh loo kala soocaa?** Iyadoo la raacayo wakhtiga bilowga; marka wakhtiyada bilowgu isku mid yihiin, nidaamkii aad ku dartay faylasha waa la ilaaliyaa.",
     "**ASS ma la kala saari karaa?** Boggani wuxuu maamulaa SRT iyo VTT. U beddel ASS una beddel SRT ama VTT [[Format conversion|/convert.html]] marka hore."
    ]
   },
   {
    "h2": "Asturnaanta",
    "ps": [
     "Subtitle-ada waxaa lagu habeeyaa gabi ahaanba biraawsarka dhexdiisa: waxba lama soo geliyo waxna server ma dhex maro. Xidh bogga oo nuxurkii wuu tagay."
    ]
   },
   {
    "h2": "Qalabka iyo hagayaasha la xiriira",
    "ps": [
     "Si aad laba fayl ugu midoobiso raad laba luuqadood ah (halkii aad ka ahaan lahayd hal qayb) isticmaal [[Bilingual merging and special effects|/guides/merge.html]]; haddii jadwalka wakhtigu uu dhan yahay aado [[Timeline adjustment|/shift.html]]; mid xilli buuxa ah isticmaal [[Batch conversion|/batch.html]]; oo socodsii [[Subtitle QC|/qc.html]] marka aad dhammaystirto."
    ]
   }
  ]
 },
 "split-bilingual-subtitles": {
  "seo": {
   "title": "U qaybi Subtitle-ada Laba-luuqadlaha ah Laba Raad – AI-SRTSub",
   "desc": "U qaybi subtitle-ada laba-luuqadlaha ah laba fayl: raadadka asalka ah iyo kuwa la turjumay waxay u soo dejiyaan si gooni ah iyagoo wata magacyo kala duwan; labada foom waa la aqoonsaday. – AI-SRTSub",
   "h1": "U qaybi Subtitle-ada Laba-luuqadlaha ah Laba Raad",
   "intro": "Hal subtitle oo laba-luuqadood ah wuxuu noqdaa laba fayl - \"asal\" iyo \"turjumaad\": soo rar, dooro u-qaybi-laba, soo deji mid kasta, iyadoo jadwalka wakhtigu uu sidii yahay.",
   "ctaText": "U qaybi subtitle-ada laba-luuqadlaha ah"
  },
  "body": [
   {
    "h2": "Marka aad u baahan tahay inaad kala qaybiso",
    "ps": [
     "Ciyaaryahankaagu wuxuu rabaa oo keliya hal raad luuqad keliya ah; ama waxaad rabtaa raadka turjumaadda ee dib-u-turjumaad, ama raadka asalka ah si aad ugu lammaaniso nooc kale oo la turjumay. Subtitle-ka laba-luuqadlaha ahi waa midkood **hal cue oo leh laba sadar** (asal hal sadar ah, turjumaad kan kale ah) ama **laba cue oo kala gooni ah oo wada wadaagaya isla jadwalka wakhtiga** — labadaba waa la kala qaybin karaa."
    ]
   },
   {
    "h2": "Halka lagu sameeyo",
    "ps": [
     "Fur [[Bilingual Subtitle Stripper|/bilingual.html]] oo ku dhex rid subtitle-kaaga. Qalabku wuxuu ogaadaa foomka laba-luuqadlaha ah si toos ah: hal cue oo leh laba sadar waxaa lagu kala qaybiyaa nidaamka qoraalka, laba cue oo ku jira isla jadwalka wakhtiga ayaa lagu kala qaybiyaa habaynta. Dooro **U qaybi laba** liiska hoos u dhaca ee habka oo guji Bilow (ama u oggolow inuu si toos ah dib ugu shaqeeyo). Aagga natiijada wuxuu tusiyaa laba qaybood: midka lagu calaamadiyay `.orig` waa raadka asalka ah, midka lagu calaamadiyay `.dst` waa raadka turjumaadda — guji “Soo deji” mid kasta; labada raad waxay wadaagaan isla jadwalka wakhtiga oo sax ah."
    ],
    "img": {
     "file": "bilingual-split",
     "alt": "Natiijada kala-qaybinta: raadka asalka ah iyo raadka turjumaadda oo ah laba qaybood, mid kastaa wuxuu leeyahay badhanka soo-dejinta",
     "cap": "U qaybi laba: .orig raadka asalka ah + .dst raadka turjumaadda, mid kastaa si gooni ah ayaa loo soo dejiyay"
    }
   },
   {
    "h2": "Hal dhib oo caadi ah",
    "ps": [
     "**Hal cue oo leh laba sadar oo ku jira luuqado wadaagaya isla alifbeetada (soo qaado Ingiriisi iyo Faransiis) lama kala qaybin karo.** Marka raadadka la kala saaro nidaamka qoraalka, kuwaas waxay tirsadaan hal nidaam waxaana loola dhaqmaa sidii hal-luuqadle. U beddel waxa ku jira foomka isla-jadwalka-waqtiga B marka hore, kadibna kala qaybi; foomka labada cue wuxuu ku lammaaniyaa jadwalka wakhtiga mana daneeyo luuqadda. Wixii ku saabsan faahfaahinta labada foom, eeg [[Two ways to make bilingual subtitles|/guides/make-bilingual-subtitles.html]]."
    ]
   }
  ]
 },
 "srt-file-format": {
  "seo": {
   "title": "Waa Maxay Faylka SRT? Sida loo Furo oo loo Wax-ka-beddelo – AI-SRTSub",
   "desc": "Qaab-dhismeedka faylasha hooseed ee SRT (SubRip): lambarka, safka waqtiga, qoraalka. Sida loo furo, sababta ciyaartoygu u diido, iyo sida loo hagaajiyo qoraalka qalloocan.",
   "h1": "Sharaxaadda Qaab-dhismeedka Faylka SRT",
   "intro": "SRT waa qaabka ugu caansan ee qoraalka hoose: qoraal cad, qaab fudud, meel kasta laga aqbalo. Hagahan wuxuu soo bandhigayaa qaab-dhismeedkiisa, sida loo furo, iyo sida loo hagaajiyo khaladaadka caadiga ah.",
   "ctaText": "Fur beddelaha qoraalka hoose"
  },
  "body": [
   {
    "h2": "Sida uu faylka SRT u eegyahay",
    "ps": [
     "SRT (SubRip) waa qoraal caadi ah — tifaftiraha qoraalka kastaaba wuu furaa. Qayb walba waxay leedahay saddex qaybood: **safka lambarka**, **safka waqtiga**, iyo **qoraalka**, oo ay kala soocaan safaf madhan. Safka waqtiga wuxuu akhriyaa `00:00:01,000 --> 00:00:03,500` — ogow **hakadka** ka hor millisiriisyada, ee ma aha dhibic."
    ],
    "img": {
     "file": "convert-upload",
     "alt": "Aagga soo gelinta: faylka SRT oo la soo raray oo muujinaya lambarrada iyo waqtiga",
     "cap": "Qaybta saddexda qaybood ee caadiga ah ee SRT: lambarka, safka waqtiga, qoraalka"
    }
   },
   {
    "h2": "Sida loo furo",
    "ps": [
     "Si aad u akhriso waxa ku jira: guji midig oo ku fur kasta oo **tifaftiraha qoraalka** ah. Si aad ula isticmaasho muuqaal: u beddel magaca faylka si uu **ula mid noqdo magaca faylka muuqaalka** (bixinta kordhinta), labadaba geli isla galka, iyo ciyaartoyda sida VLC, PotPlayer, ama mpv waxay u raraan si toos ah; waxaad sidoo kale u jiidi kartaa daaqadda ciyaarta."
    ]
   },
   {
    "h2": "Hagaajinta diidmada iyo qoraalka qalloocan",
    "ps": [
     "**Xarfaha qalloocan**: faylku ma aha UTF-8 — dib ugu keydi UTF-8 tifaftirahaaga. **Waxba ma muuqdaan**: hubi in safka waqtiga uu isticmaalo hakad (oo aan ahayn dhibic) oo aan lambarrada qaybta la jabin (ciyaartoyda badankood waxay dulqaataan bannaanada, qaar ma yeelaan). **Faylku waa HTML ama JSON**: ilaha soo dejintu waa khalad; mar kale soo qaado."
    ]
   },
   {
    "h2": "Waxa SRT uu qaadi karo iyo waxa uusan qaadi karin",
    "ps": [
     "SRT wuxuu wataa qoraal iyo waqti kaliya: **ma jiraan qaabab** (farta, midabada), **ma jiro meelayn** (halka ay shaashadda ka taallo), **ma jiraan saameyn**. Kuwaas waxay u baahan yihiin ASS — eeg [[SRT to ASS|/guides/srt-to-ass.html]]. Si aad u aragto isbarbardhigga dhinac-dhinaca ah ee dhammaan qaababka, eeg [[isbarbardhigga qaabka qoraalka hoose|/guides/subtitle-format-comparison.html]]."
    ]
   }
  ]
 },
 "srt-fps-converter": {
  "seo": {
   "title": "Beddelaha Heerka Kala-guurka ee SRT – Beddel Heerka Joogitaanka Qoraalka Hoose – AI-SRTSub",
   "desc": "Filimku waa 24fps, baahintu waa 25fps, qoraalkuna wuu sii luminayaa daqiiqad kasta: cabbir wakhtiga 0.96 hal mar oo faylku wuxuu degayaa heerka la rabo.",
   "h1": "Beddelka Heerka Joogitaanka Qoraalka Hoose: 24fps ilaa 25fps",
   "intro": "Ku ciyaar qoraalka hoose ee filim 24fps ah ilo 25fps ah waxayna luminayaan in ka badan ilbidhiqsi daqiiqad kasta — dhamaadka dhibcaha waxay dib uga dhaceen daqiiqado. Hal cabbir ayaa hagaajinaya.",
   "ctaText": "Fur tifaftiraha waqtiga"
  },
  "body": [
   {
    "h2": "Sababta aan isku mid ahayn ee heerka joogitaanka ay uga dhigto qoraalka hoose inuu dabcayo",
    "ps": [
     "Beddelka heerka joogitaanka wuxuu dib u akhriyaa **isku wakhti hoostiisa laba saacadood oo kala duwan**. Filim 100-daqiiqo ah oo ah 24fps wuxuu leeyahay 6000 s × 24 = **144,000 jirridood**; ilo 25fps ah jirridahaas 144,000 waxay ku ciyaaraan 5760 ilbidhiqsi — **96 daqiiqo**. Filimka oo dhan wuxuu socdaa 4 daqiiqo oo gaaban, markaa calaamad ku jirta daqiiqada 50aad waxay muuqataa ilaa 2 daqiiqo oo dambe, qoraalka hoose ee dhibcaha dhamaadka ayaan waligeed soo muuqan."
    ]
   },
   {
    "h2": "Qaaciddada iyo sababaha caadiga ah",
    "ps": [
     "Heerka la rabo ÷ heerka asalka ah = dhufteeyaha. **24 ilaa 25: ku dhufo 0.96** (24÷25); wadada kale, 25 ilaa 24: 1.0417. **25 ilaa 23.976: ku dhufo 0.959**; wadada kale: 1.0427. Tifaftiraha waqtiga ku dar tallaabada **Cabbir heer ahaan** oo geli arrinta sanduuqa qiimaha."
    ],
    "img": {
     "file": "shift-step-rate",
     "alt": "Cabbir tallaabada heerka oo ay ku jirto 0.96",
     "cap": "0.96 waa 24÷25; tilmaamaha bogga xitaa waxay sheegayaan beddelka heerka joogitaanka oo ah isticmaal caadi ah."
    }
   },
   {
    "h2": "Marka aadan aqoon labada heer",
    "ps": [
     "Haddii aadan heli karin heerka joogitaanka isha, ha qiyaasin arrinta — adeegso **laba barroosin** beddelkeeda: qaado wakhtiga muuqashada dhabta ah ee calaamadda koowaad iyo tan ugu dambaysa laba dhibcood ahaan, wax kasta oo u dhexeeyaana dib ayaa loo fidiyaa si le'eg. Eeg [[qoraalka hoose oo sii kordhaya mid aan is waafaqsanayn|/guides/subtitles-out-of-sync.html]]."
    ]
   },
   {
    "h2": "Waxa la hubiyo kadib",
    "ps": [
     "Cabbiriddu waxay dhaqaajisaa bilow kasta iyo dhammaad kasta; muddada calaamaduhu waxay ku fidaan isla arrintaas. Kadib markaad socodsiiso, xaqiiji labada daraf: calaamadda ugu horreysa (qaladka asalka ah ee ugu yar) iyo tan ugu dambaysa (midda ugu weyn). Haddii labada daraf ay is waafaqaan, wax kasta oo u dhexeeyaana way is waafaqayaan."
    ]
   }
  ]
 },
 "srt-simplified-to-traditional": {
  "seo": {
   "title": "Beddel Qoraalka Hoos ee Fududeynaya Dhaqameedka – Taiwan ama Hong Kong – AI-SRTSub",
   "desc": "U beddel qoraalka hoose ee Shiinaha fudud oo u beddel dhaqameed: dooro Taiwanese (oo leh ama aan lahayn erayada gobolka) ama Hong Kong. Khariidadaha hal-ilaa-badan waxay ku xalliyaan erey ahaan. Kaliya wadahadalku wuu is beddelaa; waqtigu waa sidisii.",
   "h1": "U beddel qoraalka hoose ee fududeynaya dhaqameedka",
   "intro": "Qoraalka hoose ee Shiinaha ee fudud ee loogu talagalay daawadayaasha Taiwan ama Hong Kong wuxuu u baahan yahay in la beddelo oo keliya — laakiin labada gobol waxay rabaan waxyaabo kala duwan, doorashada jihada khalanna waxay ku siinaysaa erayo aysan dadka deegaanku isticmaalin.",
   "ctaText": "Beddel qoraalkan hoose"
  },
  "body": [
   {
    "h2": "Baahida",
    "ps": [
     "Qoraalkaaga hoose waa Shiine fudud waxayna tahay inay gaaraan daawadayaasha Taiwan ama Hong Kong. Sixitaanka xarfaha mid mid maaha mid dhab ah — hal qayb waxay leedahay boqolaal calaamado ah — labada gobolna ma rabaan qoraal dhaqameed isku mid ah: erayadu waa kala duwan yihiin, jihada khaldanna waxay soo saartaa erayo uusan qof deegaanku isticmaali doonin."
    ]
   },
   {
    "h2": "Meesha lagu sameeyo",
    "ps": [
     "Fur [[Beddelka Fudud-dhaqameedka|/hanconv.html]], jiid qoraalka hoose, oo dooro mid ka mid ah jihada fudud → dhaqameed ee hoos yimaada \"Convert to\": dhaqameed guud, Taiwanese (beddel erayada), Taiwanese (glyphs oo kaliya) ama Hong Kong. Beddelku wuxuu dhacaa si degdeg ah aagga natiijaduna waxay muujinaysaa qoraalka hoose ee dhammaaday, oo diyaar u ah in la soo dejiyo.",
     "**Daawadayaasha Taiwan**: dooro \"Taiwanese (change wording)\" haddii erayada gobolka ay tahay inay sidoo kale isbedelaan — \"software\" iyo \"information\" waxay noqonayaan kuwa u dhigma Taiwan — ama \"Taiwanese (glyphs only)\" haddii aad rabto qaababka xarfaha la bedelay adigoo ilaalinaya erayadaadii asalka ahaa. **Daawadayaasha Hong Kong**: dooro \"Hong Kong\", halkaas oo \"software\" lagu qoro qaab kale."
    ],
    "img": {
     "file": "hanconv-dir",
     "alt": "Kaarka Beddelka: liiska hoos u dhaca ee meesha loo socdo oo muujinaya \"Simplified → Taiwanese traditional (change wording)\"",
     "cap": "Taiwan iyo Hong Kong waa jihooyin gooni ah oo leh erayo kala duwan"
    }
   },
   {
    "h2": "Khaladaadka caadiga ah",
    "ps": [
     "**Ha ka baqin khariidadaha hal-ilaa-badan**: xarafka fudud ee isku midka ah ee ereyada \"clean\", \"dry\" iyo \"tree trunk\" wuxuu ku hagaa xarfaha dhaqameed ee kala duwan. Miisasku waxay tan ku xalliyaan weedh ahaan, markaa wax walba looma simo hal xaraf.",
     "**Kaliya wadahadalka waa la beddelay**: waqtiga, lambarrada tusaha iyo xarumaha qaabka ASS waa kuwo aan la taaban, markaa natiijadu waa diyaar in la isticmaalo.",
     "**Waxba ma aysan isbedelin? Hubi ka hor inta aadan nixin**: haddii baarista xaaladdu ay soo sheegto 0 xariiq oo la beddelay, ama faylku ma laha xarfaha Shiinaha ama qaabka si khaldan ayaa loo ogaaday — hubi in \"Detected format\" uu la mid yahay waxaad soo gelisay."
    ]
   },
   {
    "h2": "La xiriira",
    "ps": [
     "Sharaxaadda buuxda ee dhammaan sagaalka jiho — [[Sida loo beddelo qoraalka hoose ee fudud iyo dhaqameedka|/guides/hanconv.html]]; sababta ay uga badan tahay beddelka xarfaha — [[Fudud vs dhaqameed ma aha beddelka xarfaha|/guides/simplified-traditional-chinese.html]]; dhaqameedka dib loogu celiyo fudud sidoo kale wuxuu ku nool yahay [[Beddelka Fudud-dhaqameedka|/hanconv.html]]."
    ]
   }
  ]
 },
 "srt-to-ass": {
  "seo": {
   "title": "Beddelaha SRT ilaa ASS – U beddel Qoraalka Hoose Online – AI-SRTSub",
   "desc": "U beddel qoraalka hoose ee SRT kuna beddel ASS (Advanced SubStation Alpha) oo leh shiraac 1920×1080 ah iyo qaab caadi ah oo nadiif ah, oo diyaar u ah in si fudud loogu shubo ciyaartoy kasta. Waxay ka shaqaysaa biraawsarkaaga.",
   "h1": "SRT ilaa ASS",
   "intro": "U beddel qoraalka hoose ee SRT mid ASS ah: soo jiid faylka, dooro ASS, soo dejiso. Shiraac 1920×1080 ah iyo qaab caadi ah oo nadiif ah ayaa kuu soo baxaya.",
   "ctaText": "Beddel SRT → ASS"
  },
  "body": [
   {
    "h2": "Marka aad u baahan tahay ASS",
    "ps": [
     "Isticmaal ASS marka qoraalka hoose ee la shubay uu u baahan yahay **meelayn fiican iyo xakamaynta qaabka**: wuxuu wataa fikrado uusan SRT lahayn — cabbirka shiraaca, qaababka farshaxanka, iyo toosinta. mpv, PotPlayer, VLC, iyo ciyaartoyda badankoodu waxay si toos ah u taageeraan."
    ]
   },
   {
    "h2": "Sida ay natiijadu u eegtahay",
    "ps": [
     "Qalabku wuxuu dib u dhisayaa madax caadi ah: **shiraac 1920×1080 ah**, duubitaan caqli-gal ah (WrapStyle 0), iyo hal qaab oo Default ah — Arial 54, qoraal cad oo leh xad madow, xagga hoose ee dhexe. Qayb walba waxay isticmaashaa qaabkan."
    ],
    "img": {
     "file": "convert-opt-ass",
     "alt": "Qaabka wax-soo-saarka ee hoos u dhaca oo leh ASS - Advanced SubStation la doortay",
     "cap": "Dooro ASS sida wax-soo-saarka oo soo dejiso marka aad beddesho"
    }
   },
   {
    "h2": "Miyuu qaabku sii jirayaa?",
    "ps": [
     "SRT ma laha fikrad qaabaysan oo billow ah. Haddii ishaadu ay hore u ahayd ASS, beddeliddu waxay **dib u dhisaysaa qaabka caadiga ah mana haynayso kii asalka ahaa** — isticmaali tifaftiraha qoraalka hoose ee gaarka ah si aad dib ugu qaabayso ASS. Waqtiga iyo qoraalkuba wax ma noqonayaan labada dhinacba."
    ]
   }
  ]
 },
 "srt-to-excel": {
  "seo": {
   "title": "U beddel Qoraalka Hoose Excel – Sax Saxitaan Sadarba Sadar – AI-SRTSub",
   "desc": "U dhoofi qoraalka hoose ee SRT Excel: hal sadar halkii calaamadood afar sadar — tusaha, bilowga, dhammaadka iyo qoraalka. Waqtiga waxaa loo haystaa qoraal ahaan, jebinta sadarkuna waa sidoodii, xaashida la tafaftirayna waxaa loo beddeli karaa qoraal hoose.",
   "h1": "U beddel qoraalka hoose Excel",
   "intro": "Sax-saxidda boqolaal calaamado ah oo ku jira tifaftiraha qoraalka waa mid daal badan. Excel-ka calaamad kastaa waa sadar, markaa sifaynta, faallooyinka iyo helitaanka-iyo-beddelka dhammaantood waa la heli karaa — tafaftirkuna wuxuu dib ugu noqonayaa SRT-gaaga.",
   "ctaText": "U dhoofi Excel"
  },
  "body": [
   {
    "h2": "Baahida",
    "ps": [
     "Sax-saxidda, beddelka ereyada badan, ama u qaybinta shaqada dhowr qof dhexdooda — dhammaanteed waxay uga socotaa si dhakhso badan xaashida marka loo eego qoraalka caadiga ah. SRT-ga laftiisu waa qoraal caadi ah, laakiin qaab-dhismeedka calaamaddiisa (tusaha, wakhtiga, wadahadalka) wuxuu si fiican ula jaan qaadayaa afar sadar oo faafinta ah."
    ]
   },
   {
    "h2": "Meesha lagu sameeyo",
    "ps": [
     "Fur [[Beddelka miiska qoraalka hoose ⇄|/table.html]], u beddel \"to table\", soo jiid SRT-ga, horudhacuna wuxuu ka buuxsamayaa hal sadar halkii calaamadood afar sadar — tusaha, bilowga, dhammaadka, qoraalka. Guji \"Download Excel (.xlsx)\" waana adiga kuu gaar ah. VTT waxaa loo taageeraa si la mid ah.",
     "Markaad dhammayso tafaftirka: u beddel habka \"to subtitle\", dib u geli xaashida, waxaad heli doontaa SRT mar kale. Xeerku waa saddex sadar oo loogu talagalay bilowga, dhammaadka iyo qoraalka (Ingiriisiga Start / End / Text sidoo kale way shaqeeyaan), si kasta oo ay u kala horreeyaan."
    ],
    "img": {
     "file": "table-prev",
     "alt": "Horudhaca miiska: calaamad kasta oo SRT ah oo ah sadar afar sadar ah, oo wata baarka xaaladda",
     "cap": "SRT oo loo habeeyay afar sadar, oo dib loogu beddeli karo si la mid ah"
    }
   },
   {
    "h2": "Khaladaadka caadiga ah",
    "ps": [
     "**Horta hagaaji calaamadaynta jabtay**: boggan wuxuu akhriyaa UTF-8 kaliya. Shaashad ka buuxda calaamado su'aal ah ama sanduuqyo waxay la macne tahay safar aad ku tagayso [[Hagaajinta Mojibake|/repair.html]] marka hore.",
     "**CSV ama xlsx**: dooro .xlsx marka faylku galayo Excel, si aan loogu beddelin tiirka wakhtiga; CSV waa mid la qaadan karo laakiin Excel wuxuu u akhrin karaa si kale — u deji tiirka wakhtiga \"Text\" haddii ay taasi dhacdo.",
     "**ASS ma shaqeeyo**: ASS waxay wadataa tilmaamo qaabeed, markaa u beddel SRT ka hor inta aanad gelin miiska."
    ]
   },
   {
    "h2": "La xiriira",
    "ps": [
     "Socodka labada jiho ee buuxa — [[Sida loo beddelo qoraalka hoose loogu beddelo Excel / CSV|/guides/table.html]]; turjumidda kadib — [[Turjumaadda qoraalka hoose|/translate.html]]; gudubka ugu dambeeya ka hor inta aan la keenin — [[QC Qoraalka hoose|/qc.html]]."
    ]
   }
  ]
 },
 "srt-to-vtt": {
  "seo": {
   "title": "Beddelaha SRT ilaa VTT – Beddel Qoraalka Hoose Online – AI-SRTSub",
   "desc": "U beddel qoraalka hoose ee SRT qaabka VTT (WebVTT) walxaha raadraaca ee HTML5. Hakadka calaamadaha waqtiga wuxuu si toos ah u noqdaa dhibco. Waxay ka shaqaysaa biraawsarkaaga, waxna lama soo geliyo.",
   "h1": "SRT ilaa VTT",
   "intro": "U beddel qoraalka hoose ee SRT qaabka VTT: soo rid faylka, dooro VTT, soo degso. Calaamadaha waqtiga waxaa loo habeeyay qaabka shabakadda, dhammaanteed waxay ka dhacdaa biraawsarkaaga.",
   "ctaText": "Beddel SRT → VTT"
  },
  "body": [
   {
    "h2": "Goorta aad u baahan tahay VTT",
    "ps": [
     "Ciyaartooyda shabakadda (curiyaha HTML5 ``), soo gelinta qoraalka hoose ee YouTube, iyo ciyaartooyda badankooda ku saleysan biraawsarka waxay aqbalaan **VTT (WebVTT)** keliya — ee ma aha SRT. Haddii waxa aad haysaa ay tahay SRT keliya, hal beddelid ayaa ka dhigaysa mid shaqeeya."
    ]
   },
   {
    "h2": "Sida ay labada qaab u kala duwan yihiin",
    "ps": [
     "Waxyaabaha ku jira waa kuwo isku mid ah ku dhawaad; saddex shay ayaa si duwan loo qoraa: **safka madaxa ee WEBVTT** (oo looga baahan yahay VTT); **kala-sooca millisekiiqanka** ee calaamadaha waqtiga — SRT waxay isticmaashaa hakad (00:00:01,000) halka VTT ay isticmaasho dhibic (00:00:01.000); iyo VTT waxay oggolaataa baloogyada NOTE iyo STYLE kuwaas oo uusan SRT oggolayn."
    ],
    "img": {
     "file": "convert-result",
     "alt": "Natiijada beddelidda oo muujinaysa madaxa WEBVTT iyo calaamadaha waqtiga ee dhibcaha leh",
     "cap": "VTT-ga la beddelay: safka koowaad ee WEBVTT, calaamadaha waqtiga ee dhibcaha leh"
    }
   },
   {
    "h2": "Sida loo beddelo",
    "ps": [
     "Fur [[beddelaha|/convert.html]], geli SRT-ga, dooro **VTT - WebVTT** oo ah halka ay wax ka soo baxayaan, dabadeed beddel oo soo degso. Nidaamka safafka, qiimaha waqtiga, iyo qoraalka safafka badan leh dhammaantood waa sidii ay ahaayeen — waxaa is beddelaya naxwaha keliya. Ma rabtaa dhinaca kale? Eeg [[VTT ilaa SRT|/guides/vtt-to-srt.html]]."
    ]
   }
  ]
 },
 "subtitle-format-comparison": {
  "seo": {
   "title": "SRT vs VTT vs ASS vs SBV vs LRC – Waa Kee Nooca Qoraalka Hoose – AI-SRTSub",
   "desc": "Isbarbar dhigga awoodaha shan nooc oo qoraalka hoose ah: qaabeynta qoraalka, meelaynta, saxnaanta waqtiga, halka uu mid walba ka tirsan yahay, iyo sida loogu beddelo dhexdooda.",
   "h1": "Doorashada Nooca Qoraalka Hoose: SRT / VTT / ASS / SBV / LRC",
   "intro": "Qoraalka hoose ee la mid ah ee lagu kaydiyay shan nooc wuxuu u adeegaa shan sayid oo kala duwan. Tilmaamahan ayaa barbar dhigaya waxa uu nooc walba qaban karo iyo sida loogu kala guuro dhexdooda.",
   "ctaText": "Fur beddelaha qoraalka hoose"
  },
  "body": [
   {
    "h2": "Ku dooro nooc hal jumlad ah",
    "ps": [
     "Ku raridda ciyaartooy, waafaqsanaanta ugu badan → **SRT**; ciyaartooyda shabakadda (HTML5 track) ama soo gelinta YouTube → **VTT**; fartaada, midabada, meelaynta, saamaynta → **ASS**; laga soo dejiyay YouTube → **SBV** (u beddel SRT si aad u kordhiso taageerada); erayada heesaha, heesista saf-safka ah → **LRC**."
    ],
    "img": {
     "file": "convert-opt",
     "alt": "Liiska soo-baxa ee nooca soo-baxa: lix nooc oo la beegsanayo",
     "cap": "Lixda bartilmaameed ee dhoofinta ee beddelaha waxay daboolayaan nooc kasta oo ku jira hagahan"
    }
   },
   {
    "h2": "Isbarbar dhigga awoodaha",
    "ps": [
     "**SRT**: qoraal cad + waqti, qaabayn ama meelayn ma leh, horyaalka waafaqsanaanta. **VTT**: qoraal + waqti, ay taageeraan biraawsarradu si dabiici ah, wuxuu qaadi karaa meelayn iyo qaabeyn aas-aasiga ah, dhibic ka hor millisegiisyada. **ASS**: qoraal + waqti + qaabayn buuxda (farta, midabada, qadka dibadda, meelaynta, saamaynta), waqti ilaa senti-sekiis. **SBV**: nooca qoraalka hoose ee ugu yar ee YouTube, bilow iyo dhamaad hal saf ah. **LRC**: nooca erayada heesaha, wakhtiyada billowga keliya, ma laha waqtiyo dhammaad, qaabayn ma leh."
    ]
   },
   {
    "h2": "Wadooyinka u dhexeeya noocyada",
    "ps": [
     "Mid kasta oo ka mid ah kuwan ayaa labada dhinacba loogu beddelaa [[beddelaha|/convert.html]]: akhrisku wuxuu taageeraa srt, vtt, ass (oo ay ku jirto ssa), sbv, lrc, txt; dhoofintu waxay taageertaa srt, vtt, ass, sbv, lrc, txt. Wadooyinka caadiga ah mid walba wuxuu leeyahay hagaha u gaarka ah: [[SRT ilaa VTT|/guides/srt-to-vtt.html]], [[VTT ilaa SRT|/guides/vtt-to-srt.html]], [[SRT ilaa ASS|/guides/srt-to-ass.html]], [[ASS ilaa SRT|/guides/ass-to-srt.html]], [[SBV ilaa SRT|/guides/sbv-to-srt.html]], [[LRC ilaa SRT|/guides/lrc-to-srt.html]]."
    ]
   },
   {
    "h2": "Waxa ay beddeliddu lumiso",
    "ps": [
     "U beddelidda SRT waxay had iyo jeer tuurtaa qaabaynta iyo meelaynta (SRT ma qaadi karo iyaga). U beddelidda ASS qalabkan **waxay dib u dhisaysaa qaab caadi ah mana hayso midkii asalka ahaa**. LRC ilaa SRT waxay u baahan tahay waqtiyada dhammaadka in la buuxiyo (saf kastaa wuxuu jiraa ilaa kan xiga; kan ugu dambeeya wuxuu helayaa 3 sekiis). Qiimayaasha waqtiga iyo qoraalku waxay ahaadaan kuwo isku mid ah jiho kasta."
    ]
   }
  ]
 },
 "subtitle-garbled-characters": {
  "seo": {
   "title": "Halka uu ka yimaaddo Mojibake-ga Qoraalka Hoose – Ogow, Hagaaji – AI-SRTSub",
   "desc": "Mojibake waxay la mid tahay akhrin khaldan, ee ma aha fayl burburay. Xarfaha beddelka ah, derbiyada xarfaha lahjadda leh iyo xarfaha qasan waxay tilmaamayaan sabab — baro kuwa soo noqon kara iyo kuwa aan weligood soo noqonayn.",
   "h1": "Halka uu ka yimaaddo mojibake-ga qoraalka hoose",
   "intro": "Isla bytes-kii oo loo akhriyey sida UTF-8 iyo sida GBK waxay soo saaraan laba qaybood oo xarfo ah oo kala duwan. Sida uu qoraalka qasani u muuqdo waa caddayn toos ah oo muujinaysa tallaabada khaldantay.",
   "ctaText": "Fur qalabka lagu hagaajiyo mojibake"
  },
  "body": [
   {
    "h2": "Faylku waa fiican yahay — si khaldan ayaa loo akhriyey",
    "ps": [
     "Waxa uu faylka qoraalka hoose kaydiyaa waa bytes. In bytes loo beddelo xarfo waxay u baahan tahay in la ogaado codaynta lagu qoray — haddii aad taas khaldanto waxaad heleysaa mojibake. Hal byte kama maqna faylka; mar labaad ku akhri codaynta saxda ah xarfihiina way soo noqonayaan.",
     "Taas waxay u qaybisaa shaqada laba: **soo saaridda codayntii uu ka bilaabmay**, iyo **in loo kaydiyo sidii codayn uu ciyaartooygaagu garan karo**. Tan koowaad waxay ka timaaddaa tijaabinta furitaanka codaynta iyo dhibcaha, tan labaadna waa kaydinta nuqul. Waxay xalliyaan dhibaatooyin kala duwan."
    ]
   },
   {
    "h2": "Shan muuqaal, shan sabab",
    "ps": [
     "Mojibake maaha mid kala-sooc la'aan ah — sida uu u muuqdo wuxuu muujinayaa waxa sababay:"
    ],
    "img": {
     "file": "repair-diag",
     "alt": "Kaarka ogaanshaha oo taxaya nooc kasta oo ka mid ah calaamadaha mojibake",
     "cap": "Ogaanshuhu wuxuu u kala saaraa mojibake sabab ahaan halkii uu isku dari lahaa"
    }
   },
   {
    "h2": "Sababta aan loo hagaajin karin xarafka beddelka ah",
    "ps": [
     "Xarafka beddelka ah waa xadka kala qaybiya. A `` waxay ka dhigan tahay in bytes-kii hore loo tuuray **tallaabo hore** (badiyaa barnaamij akhriyey faylka oo dib u kaydiyey), waxna lagama diiwaangelin waxa luntay. Waqtigaas wax laga soo hor mari karo ma jiraan — qofna ma hagaajin karo.",
     "Sida darteed bogga hagaajintu wuxuu u maamulaa labada xaaladood si kala duwan. Soo geli fayl oo bytes-kii asalka ahaa waa sidoodii, taasoo u oggolaanaysa inuu tijaabiyo codayn kasta; haddii qoraalka la soo dhejiyay uu horay u haysto xarafka beddelka ah, si cad ayuu u sheegayaa: \"lama hagaajin karo, fadlan soo geli faylka asalka ah\".",
     "Waxaa sidoo kale jira kiiska lidka ku ah: nuxurku si fiican buu u akhrismayaa laakiin ciyaartooygaagu weli wuxuu tusiyaa qashin. Faylku cillad ma laha — **ciyaartooygu wuxuu doortay codayn khaldan**. Tafatirka qoraalku wax ma taraayo; kaydi nuqul sida UTF-8 oo wata BOM ama GBK oo u dhiib."
    ],
    "img": {
     "file": "repair-up",
     "alt": "Aagga soo gelinta: jiid-iyo-soo-daji iyo ku-dheji laba meelood oo laga soo galo",
     "cap": "Soo geli faylka haddii aad awooddo — bytes oo sidooda ah waxay ka dhigan tahay in wax la hagaajiyo jiro"
    }
   },
   {
    "h2": "Waxa uu barbar dhigayo inta uu hagaajinayo",
    "ps": [
     "Qalabku wuxuu tijaabiyaa codayn kasta oo suurtagal ah, dabadeed wuxuu dhibco siiyaa natiijo kasta: inta ka samaysan xarfo caadi ah, haddii ay jiraan xarfo lahjadaysan, xarfo calaamado ah, haddii xarfaha CJK ay yihiin derbiyo xarfo aan la aqoon. Natiijada ugu dhibcaha fiican waxay aadaysaa liiska sare.",
     "**Haddii aysan jirin dhibco si cad u fiican, wax talo ah lama bixinayo** — waxaa roon in lagu yiraahdo \"kan si fiican buu u akhrismayaa sida uu yahay\" intii lagu siin lahaa wax u eg luqad si daciif ah. Qoraalka la qasay laba jeer (oo si xun loo kaydiyey hal mar, dabadeed si xun loo hagaajiyey hal mar) wuxuu helayaa wareeg dheeraad ah oo ah xallinta dambe ee musharixiinta ugu sarreysa."
    ],
    "img": {
     "file": "repair-fix",
     "alt": "Liiska musharixiinta oo loo kala soocay dhibco ahaan, mid walbana lagu calaamadiyay lammaanaha codayntiisa",
     "cap": "Musharixiinta oo loo kala horreeysiiyay dhibco — ma jiro guuleyste cad, ma jiro talo soo jeedin ah"
    }
   },
   {
    "h2": "Kaydinta codaynta saxda ah waxay dhammaystiraysaa shaqada",
    "ps": [
     "Qoraalka la hagaajiyay weli waa in loo kaydiyaa sida codayn uu ciyaartooygaagu aqoonsan yahay. Ciyaartooyda Windows waxay inta badan ku tiirsan yihiin BOM si ay u ogaadaan codaynta, markaa **UTF-8 oo wata BOM** waa tan ugu fudud; qalabka duugga ah iyo ciyaartooyda gobollo qaar waxay rabaan GBK. Waad dooran kartaa UTF-8, UTF-8 (oo wata BOM), GBK, Big5, Shift_JIS ama EUC-KR, waxaana lagu sheegi doonaa inaad doorato mid kale haddii uusan wax ku habboonayn (GBK ma qaadi karo Kuuriyaan)."
    ],
    "img": {
     "file": "repair-out",
     "alt": "Aagga natiijada: liiska soo-baxa ee kaydi-sida-codaynta iyo badhanka soo dejiska",
     "cap": "Kaydi sida wax uu ciyaartooygu aqoonsan yahay oo mojibake si dhab ah ayaa loo xalliyey"
    }
   },
   {
    "h2": "Qalabka iyo hagayaasha la xiriira",
    "ps": [
     "Tilmaamaha buuxa — [[Sida loo hagaajiyo qoraalka hoose ee mojibake|/guides/repair.html]]; waxa uu faylka SRT dhab ahaantii kaydiyo — [[Waxa ku jira faylka SRT|/guides/srt-file-format.html]]; codayntu waa fiican tahay laakiin nuxurku waa wasakh (calaamadaha biyaha, xayaysiisyada, calaamadaha dadka maqalku naafada ka yahay) — [[Nadiifinta qoraalka hoose|/clean.html]]."
    ]
   }
  ]
 },
 "subtitle-glossary": {
  "seo": {
   "title": "Miiska ereyada: hal xilli, hal eray bixin – Goobta loo dhisayo – AI-SRTSub",
   "desc": "Miiska ereyada wuxuu hagaajiyaa erayga isku midka ah ee si khalad ah loo turjumay: goobta loo dhisayo, sida loogu isticmaalo xilli dhan, sababta waafajinta erayga oo dhan aysan waxba uga qaban Shiinaha, iyo waxa aan la siin karin.",
   "h1": "Miiska ereyada: ilaalinta xilliga oo iswaafaqsan",
   "intro": "Marka magacu yahay A qeybta koowaad iyo B qeybta toddobaad, daawadayaashu waxay u maleynayaan inay yihiin laba jilaa. Miiska ereyada wuxuu ka hortagayaa arrintaas — wuxuu hagaajiyaa sida wax loogu yeero.",
   "ctaText": "Fur beddelka ereyada ee ballaaran"
  },
  "body": [
   {
    "h2": "Miiska ereyada wuxuu hagaajiyaa iswaafaq la'aanta",
    "ps": [
     "Dhibaatooyinka erey bixinta ee qoraal-hoosaadyada waxay leeyihiin laba nooc: \"eraygan si khaldan ayaa loo turjumay\" iyo \"erayga la midka ah ayaa si duwan loo turjumay hal meel ilaa meel kale\". Kan koowaad waa dhibaato qaamuus; kan labaad waa waxa uu miiska ereyada u taagan yahay.",
     "Kan labaad waa mid caadi ah oo adag in la ogaado: `Thor` waxay noqotaa \"Thor\" qeybta koowaad iyo \"Donar\" qeybta toddobaad, qeyb kastaana waxay u muuqataa mid sax ah iyada oo gaar ah halka taxanaha guud ahaan uu ka dhigayo daawadayaasha inay u maleeyaan in jilaa cusub soo baxay. Miiska ereyada wuxuu ka dhigaa \"soo saaristani waxay u yeertaa Thor\" sharci la fulin karo oo lagu dabaqayo faylka qoraal-hoosaadka oo dhan hal mar."
    ]
   },
   {
    "h2": "Marka ay mudan tahay in la dhiso",
    "ps": [
     "Fayl kasta oo qoraal-hoosaad ah uma baahna miiska ereyada. Kiisaska caddaynaya mid waa kuwan badanaa:"
    ],
    "img": {
     "file": "glossary-rules",
     "alt": "Xeerarka beddelka ee loo qaybiyay qaybo miiska ereyada dhexdiisa ah",
     "cap": "Isticmaal faallooyinka # si aad u ururiso xeerarka, iyo si aad mid u demiso ku-meel-gaar ah adigoo wax ka beddelaya"
    }
   },
   {
    "h2": "Haynta hal miis xilli dhan",
    "ps": [
     "Miiska ereyada waxaa loo hayaa **si tartiib-tartiib ah**: deji magacyada qeybta koowaad, kadib ku dar xeer mar kasta oo eray cusub oo la xiriira uu soo baxo, iyo dhammaadka xilliga miiska waa la dhameeyay. Xilliga xiga ee taxanaha isla halkaas ka bilow.",
     "Qor xeerarka inyar oo ballaaran intii loo baahnahaa – mar haddii aad go'aansatay \"Thor\", ku dar \"Donar -> Thor\" sidoo san, si qoraal-hoosaadka qof kale loo waafajiyo isla mar ahaantaana.",
     "Mar walba akhri **liiska isbeddelka** kadib: wuxuu magacaabaa calaamad kasta, xariiq kasta iyo waxa noqday waxa. Waa meesha keliya ee aad ku xaqiijin karto in isbeddelku sax ahaa oo aan la badinin, gelis kasta oo aanad jeclaynna waxaa dib loogu celin karaa hal gujin."
    ],
    "img": {
     "file": "glossary-diff",
     "alt": "Liiska isbeddelada shakhsi ahaaneed ee aagga natiijada",
     "cap": "Isbeddel kasta waa la qoray; guji mid aanad rabin si aad dib ugu celiso"
    }
   },
   {
    "h2": "Waxa aan la siin karin miiska ereyada",
    "ps": [
     "Miiska ereyada wuxuu beddelaa **erayada**. Saddexdaan shay waxay ka baxsan yihiin shaqadiisa, waana inaysan noqon:",
     "**Naxwaha iyo qaab-dhismeedka jumlada** – ma beddeli kartid eray oo ma ka dhigi kartid jumlad; shaqada heerka jumlada waxay ku noqotaa [[Subtitle translation|/translate.html]] ama qof bini'aadam ah.",
     "**Nadiifinta nuxurka** – tirtiridda xariiqyada oo dhan sida astaamaha biyaha lagu calaamadiyo, xayeysiisyada iyo calaamadaha SDH waxay leedahay [[Subtitle cleaning|/clean.html]]; xeerarka miiska ereyada way beddelaan, ma tirtiraan xariiqyada.",
     "**Jadwalka wakhtiga** – miiska ereyada waligiis ma taabto wakhtiga. Wixii ku saabsan magdhowga caalamiga ah ama dhibaatada heerka tag [[Timeline adjustment|/shift.html]]."
    ]
   },
   {
    "h2": "Waxyaabo yar oo sahlan in si khaldan loo fahmo",
    "ps": [
     "**Shiinuhu weli wuxuu beddelaa xarfaha hoose iyadoo la saxay waafajinta erayga oo dhan – taasi waa caadi.** Shiinaha iyo Jabbaanku kuma kala saaraan erayada meel bannaan, markaa qalabku ma go'aamin karo xadka erayada waafajinta erayga oo dhan wax saameyn ah kuma leh halkaas; `art` ma taaban doonto `start` ilaalintu waxay u shaqeysaa Ingiriiska oo keliya.",
     "**Nidaamku wuxuu beddelaa natiijada.** Xeerarku waxay ka socdaan kor ilaa hoos waxaana qoraalka uu soo saaray hal xeer dib loogu baaraa xeerarka hoose ee ku jira. Beddel A oo ku beddel B kadibna B ku beddel C waxaadna ku dambayn doontaa C.",
     "**Si aad u beddesho turjumaadda oo keliya, deji baaxadda.** Faylka labada luqadood ah, dooro \"xariiqda labaad oo keliya\"; gelitaannada leh hal xariiq oo keliya ayaa sidooda ahaada labada dejin ee hal-xariiq ah hoostooda – qalabku ma qiyaaso dhinaca ay tahay asalka.",
     "**Miiska ereyada lama kaydiyo.** Waa madhan yahay mar kasta oo aad furto bogga, markaa hayso faylkaaga qoraalka ah oo sii gudbi."
    ]
   },
   {
    "h2": "Qalabka iyo hagayaasha la xiriira",
    "ps": [
     "Si aad u hesho hage dhammaystiran eeg [[How to batch-replace terms in subtitles|/guides/glossary.html]]; haddii nuxurku wasakh yahay soco [[Subtitle cleaning|/clean.html]] marka hore; mar haddii magacyada la dejiyay oo aad u baahan tahay luqado kale tag [[Subtitle translation|/translate.html]]; oo ku soco natiijada [[Subtitle QC|/qc.html]]."
    ]
   }
  ]
 },
 "subtitle-quality-check": {
  "seo": {
   "title": "Liiska Hubinta QC ee Qoraalka Hoose ee Ka Hor Bixinta – AI-SRTSub",
   "desc": "Liiska bixinta qoraalka hoose: isdhexgalka, xawaaraha akhriska, ballaca safka iyo habacsanaanta dhibcaha ayaa inta badan fashilma. Ku socodsii 17-ka sharci ee QC — kala bar dhibaatooyinka waa kuwo hal guji lagu hagaajiyo.",
   "h1": "Waxa la Hubinayo ka Hor Inta Aan la Bixin",
   "intro": "Qoraallada hoose ee dhammaaday diyaar uma ahan in la bixiyo: dhibaatooyinka ay daawadayaashu arkaan marka ugu horreysa ee ay eegaan waa kuwa saxda ah ee aadan arki karin ka dib markaad daawatay boqol jeer. Tilmaamahan ayaa daboolaya imtixaankaas ugu dambeeya.",
   "ctaText": "Ku socodsii Hubinta QC ee Qoraalka Hoose"
  },
  "body": [
   {
    "h2": "Sababta Aadan Iskaba Arki Karin Dhibaatooyinka",
    "ps": [
     "Qof kasta oo sameeya qoraalka hoose wuxuu si fiican u yaqaan nuxurka — waxaad ogtahay waxa saf kasta uu sheegayo marka xigta, markaa wax walba uma muuqdaan kuwo aad u dheereeya; waxaad aragtay qaabdhismeedka boqol jeer, indhahaguna waxay iska dhaafeen cilladaha. Markaa hubinta ka hor bixinta kuma tiirsanaan karto \"mar labaad ka daawashada sare\" — waa in lagu **cabiraa nambarro**: xawaaraha akhriska, ballaca safka, muddada, isdhexgalka. Tirada ha go'aamiso."
    ]
   },
   {
    "h2": "Lixda Fashil ee Ugu Badan",
    "ps": [
     "Waxaa loo kala horreeysiiyay sida ay u dumiyaan bixinta:"
    ]
   },
   {
    "h2": "Sida loo Hubiyo",
    "ps": [
     "Fur [[Subtitle QC|/qc.html]] oo soo rid qoraalkaaga hoose; u deji luqadda inay si otomaatig ah u ogaato (27 luqadood, mid walba leh heerarka sharcigeeda). Warbixintu waxay taxaysaa natiijooyinka saddex heer — **ciladaha / digtoonaanta / talooyinka** — mid walba oo wata nambarka gelitaanka iyo qiimaha la cabiray. Ciladaha waa in la xalliyaa (qoraal qasan, qaabka waqtiga, dhamaadka ka hor bilaabidda, nambarada jabay); digtoonaantu waxay ku xiran tahay kiiska (isdhexgalka, xawaaraha akhriska, ballaca safka, muddada); talooyinka waa qurxinta (booska saf-jebinta, meelaha bannaan, calaamadaha qodobaysan)."
    ],
    "img": {
     "file": "qc-report",
     "alt": "Warbixinta QC: liiska arrimaha ee saddexda heer, helitaan kasta oo wata lambarka gelitaanka iyo isbarbardhigga cabbirka iyo xadka",
     "cap": "Warbixin saddex heer ah oo bixisa nambarka gelitaanka iyo qiimaha la cabiray ee helitaan kasta"
    }
   },
   {
    "h2": "Waxa Lagu Hagaajin Karo Hal Guji",
    "ps": [
     "Nambaraynta, gelitaannada madhan, dib-u-duubista, meelaha bannaan iyo calaamadaha qodobaysan — wax kasta oo **ka tagaya wakhtiga isbeddel la'aan** — si otomaatig ah ayaa loo hagaajin karaa; hagaajinta **beddelaasha wakhtiga** (is-weydaarsiga bilowga iyo dhammaadka, beddelashada isdhexgalka, dhimista ama fidinta muddada) waa kuwa aan la calaamadin qaab ahaan oo waa in la calaamadiyaa oo keliya ka dib marka aad xaqiijiso saamaynta. **Xawaaraha akhriska ee ka sarreeya xadka ma laha hagaajin otomaatig ah** — mashiinku ma ogaan karo erayga la jarayo, markaa adigu gaabi tarjumaadda ama xoogaa fududee wakhtiga; eeg [[Qoraalka Hoose oo Dhaqso Badan in la Akhriyo|/guides/subtitle-too-fast.html]]. Ka dib hagaajinta, hubin cusub ayaa si otomaatig ah u socota, warbixintuna waxay tirisaa oo keliya waxa la hagaajiyay dhab ahaantii."
    ]
   },
   {
    "h2": "Intaad Ku Jirto",
    "ps": [
     "Bogga warbixintu wuxuu soo dejisan karaa warbixin qoraal cad ah `.qc.txt` si toos ah — ku lifaaq bixinta si dhinaca kalena uu hal mar u arko waxa aad hubisay. Qoraallada hoose ee dhawaan la turjumay, ku socodsii QC ka hor bixinta; leexashada wakhtiga guud waa nooc kale oo dhibaato ah — haddii xawaaraha akhrisku weli fashilmo ka dib hubinta, eeg [[Qoraalka Hoose oo ka Baxaya Isku-dubbaridka|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "subtitle-speed-converter": {
  "seo": {
   "title": "Isbarbar-dhigga Qoraallada Hoose Kadib Isbeddelka Xawaaraha Muuqaalka – AI-SRTSub",
   "desc": "Muuqaalku waa la dedejiyey ama la gaabiyey oo qoraalladii hoose ma sii wada jaanqaadaysan: geli tirada xawaaraha tallaabada miisaanka heerka si waqtiga oo dhan ula fidsamo muuqaalka.",
   "h1": "Hagaaji Qoraallada Hoose Kadib Isbeddelka Xawaaraha Muuqaalka",
   "intro": "Muuqaalku wuxuu noqday mid aad u dheereeya ama gaabis ah guud ahaan, qoraalladii hoose waxay ku hareen xawaarihii asalka ahaa — wax kasta oo meel ka baxsan waa qalad. Geli tirada oo waqtiga oo dhan wuxuu la jaanqaadayaa muuqaalka.",
   "ctaText": "Fur tafatiraha waqtiga"
  },
  "body": [
   {
    "h2": "Goorta la isticmaalayo heer halkii ay ka ahaan lahayd beddelid",
    "ps": [
     "Muuqaalka waa la dedejiyey ama la gaabiyey **guud ahaan** (tusaale 0.9x ama 1.25x softweerka tafatirka) iyadoo calaamad kasta ay ilaalineyso laxankeedii asalka ahaa: bilawgu waa siman yahay, iyo inta aad sii socoto ayaa sii xumaanaysa — oo leh saameyn joogto ah. Taasi waa dhibaato heer ah. Haddii faylka oo dhan si fudud looga leexiyo qaddar go'an oo aan kor,,,,\\ lahayn, beddeliddu waa ku filan tahay — eeg [[u guurinta faylka qoraalka hoose ee hore ama dib|/guides/shift-subtitle-timing.html]]."
    ]
   },
   {
    "h2": "Tirada la gelinayo",
    "ps": [
     "Qoraallada hoose waa inay raacaan muuqaalka, markaa geli **tirada uu muuqaalku dhab ahaantii ku beddelmay**: dedejinta 1.25x waxay ka dhigan tahay in waqtiyada calaamaduhu ku dhuftaan 1.25 si ay u gaaraan; gaabis 0.9x wuxuu ku dhuftaa 0.9. Tafatiraha waqtiga, ku dar tallaabada **Miisaanka heerka** oo geli tirada sanduuqa qiimaha."
    ],
    "img": {
     "file": "shift-step-rate",
     "alt": "Miisaanka heerka tallaabada leh qiimaha sanduuqa",
     "cap": "Tiro ka sarraysa 1 waxay fidisaa waqtiga (muuqaalka la dedejiyey), ka hooseysa 1 way cidhiidhisaa (midka la gaabiyey)."
    }
   },
   {
    "h2": "Sida ay arrintani uga duwan tahay beddelidda",
    "ps": [
     "Beddeliddu waxay **dhaqaajisaa** waqtiga calaamad kasta qaddar go'an oo mid ah isla markaana waxay ilaalisaa muddada calaamadda; heerku wuxuu **ku dhuftaa** bilowga iyo dhammaadka labadaba, markaa muddooyinka ayaa iyaguna isbeddelaya. Kadib isbeddelka xawaaraha, muddada lafteedu waa isbeddeshay — taasi waa sababta saxda ah ee loo baahan yahay heer."
    ]
   },
   {
    "h2": "Haddii aadan hubin tirada",
    "ps": [
     "Marka qodobku lumo, dib ugu noqo **laba barro-cuskadeed**: geli waqtiyada fiidiyowga dhabta ah ee qoraalka koowaad iyo kan ugu dambeeya wax walbana inta u dhaxaysa si siman ayay u kala baxayaan — taas oo la mid ah xallinta qodobka saxan. Eeg [[subtitles getting more and more out of sync|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "subtitle-too-fast": {
  "seo": {
   "title": "Qoraallada Hoose oo Aad u Dheereeya Akhriska – Hagaaji Xawaaraha Akhriska – AI-SRTSub",
   "desc": "Qoraallada hoose oo aad u dheereeya si loo akhriyo — muddo gaaban ama qoraal dheer? QC waxay calaamadaysaa gelitaannada ka sarreeya 20 xaraf/ilbiriqsi (9 hanzi ee CJK); muddada si otomaatig ah ayay u hagaajisaa, qoraalku wuxuu u baahan yahay tafatir.",
   "h1": "Qoraallada Hoose oo Aad u Dheereeya Akhriska",
   "intro": "Daawadayaashu ma sii wadaan joojinta? Sababtu waa xawaaraha akhriska. Sida loo cabbiro, sida loo hagaajiyo, iyo goorta la tafatirayo qoraalka halkii laga ahaan lahaa waqtiga — dhammaan hal hage.",
   "ctaText": "Hubi Xawaaraha Akhriska"
  },
  "body": [
   {
    "h2": "Waa Maxay Xawaaraha Akhriska?",
    "ps": [
     "Xawaaraha akhriska waa si fudud **in daawadayaashu ay dhammaystiri karaan akhrinta qoraalka hoose inta uu joogo shaashadda**. Xisaabtu waa mid toosan: ballaca qoraalka oo loo qaybiyey ilbiriqisyada shaashadda. Xadka guud ee warshadaha: 9 xaraf oo buuxa ilbiriqsigii Shiinaha, Jabaanku iyo Kuuriyada (18 qaybood oo badh-ballac ah), 20 qaybood oo badh-ballac ah ilbiriqsigii luqadaha kale. Sadar 20-hanzi ah oo soconaya 1 ilbiriqsi wuxuu noqonayaa 40 qaybood oo ballac ah ilbiriqsigii — in ka badan laba jibaar xadka, mana dhici doonto in daawadayaashu ay dhammaystiraan."
    ]
   },
   {
    "h2": "Marka Hore, Kala Saar Nooca Xawaaraha Ah",
    "ps": [
     "“Aad u dheereeya akhriska” waa dhab ahaantii laba dhibaato oo kala duwan: **muddo gaaban** — calaamaddu way go'aysaa hal ama laba boqol oo millisekind kadib, inta badan waa qalad waqti ah ama haraaga tafatirka; **qoraal dheer** — muddada waa hagaagsan tahay, laakiin sadarku wuxuu buuxiyey 30 hanzi, mana jiro xad xawaare ah oo badbaadin doona. Hagaajintu waa kuwo iska soo horjeeda, markaa marka hore soo saar midka aad haysato."
    ],
    "img": {
     "file": "qc-rules",
     "alt": "Dejinta xadka xawaaraha akhriska ee bogga QC, oo asal ahaan ah 18 ee CJK iyo 20 ee luqadaha kale",
     "cap": "Xadka xawaaraha akhriska ee QC: 18 qaybood oo ballac ah ilbiriqsigii CJK, 20 ee luqadaha kale"
    }
   },
   {
    "h2": "Sida Loo Hubiyo",
    "ps": [
     "Fur [[Subtitle QC|/qc.html]] oo ku rid qoraalladaada hoose. Warbixinta, “muddo gaaban” waa digniin muujinaysa millisekindyada la cabbiray (xadka: 833 millisekind); “xawaaraha aan la akhrin karin” waa natiijo u gaar ah oo muujinaysa qaybaha ballaca ee la cabbiray ilbiriqsigii. Qoraallada labada luqadood leh kaliya sadarka lagu qoray luqadda la beegsanayo ayaa la tiriyaa — labada luqadood lama isu geeyo."
    ]
   },
   {
    "h2": "Sida Loo Hagaajiyo",
    "ps": [
     "**Muddo gaaban**: waxaa lagu hagaajin karaa hal guji — calaamadda si otomaatig ah ayaa loo kordhiyaa ilaa 833 millisekind, iyada oo aan la dhaaafin bilowga calaamadda xigtay (hagaajinta waa inaysan abuurin is-dul-saaritaan cusub). **Qoraal dheer**: ma jiro hagaajin otomaatig ah — mashiinku ma ogaan karo erayga la goynayo. Laba waddo, doorashadaadu waa adiga: gaabiso tarjumaadda (guji unugga qalabka tarjumaadda si aad u tafatirto), ama fidi muddada calaamaddan (kaliya haddii uu jiro farqi ka hor calaamadda xigtay; dhibaatada guud ee waqtiga eeg [[Timeline Shift|/shift.html]]). Dib u wado QC kadib si aad u xaqiijiso in xawaaraha akhrisku uu ku soo laabtay xadka gudihiisa."
    ]
   },
   {
    "h2": "Ha Dhaafinin Xadka",
    "ps": [
     "Buuxinta xadka xawaaraha macnaheedu ma ahan daawasho raaxo leh: buuxinta calaamad kasta ilaa 9 xaraf ilbiriqsigii waxay ka dhigaysaa filimka oo dhan mid daal badan. Soo-jeedin ahaan, ku joog agagaarka 70% xadka inta badan waqtiga, oo u ogolow meelaha wadahadalku ku badan yahay inay xoogaa dhaafaan mararka qaarkood. Xannibaadaha qoraalka hoose ee si xad dhaaf ah u libiqsan waa dhibaato naftooda ah — wado dhammaan cabbiraadaha ka hor inta aan la dhiibin, eeg [[What to Check Before Delivery|/guides/subtitle-quality-check.html]]."
    ]
   }
  ]
 },
 "subtitles-out-of-sync": {
  "seo": {
   "title": "Ma Rabtaa in Qoraallada Hoose ay Sii Badanayaan oo ay Ka Baxayaan Jaanqaadka? Hagaaji – AI-SRTSub",
   "desc": "Waxay ku bilaabmaysaa si fiican, ilbiriqsiyo yar oo dib u dhac ah dhexdii filimka, oo aan la isticmaali karin dhammaadka: taasi waa leexasho horumar leh, inta badan waa is-waafajin la'aan xawaaraha sawirka ama isbeddel xawaaraha muuqaalka ah. Labo barroosin ayaa hagaajinaysa.",
   "h1": "Qoraallada Hoose oo Sii Badanaya kana Baxaya Jaanqaadka: Sababaha iyo Hagaajinta",
   "intro": "Waa fiican tahay bilowga, laba ilbiriqsi oo dambeysa nus saac kadib, rajona ma leh dhammaadka. Noocan ah leexashada aan iswaafaqsaneyn waxay leedahay sababo la yaqaan — iyo hagaajin la yaqaan.",
   "ctaText": "Hagaaji faylkan"
  },
  "body": [
   {
    "h2": "Marka Hore Kala Saar Lada Nooc ee Is-waafajin La'aanta Ah",
    "ps": [
     "Is-waafajin la'aantu waxay timaaddaa laba nooc: **leexasho siman** waxay ka dhigan tahay in calaamad kasta ay dambaynaysaa (ama horraynaysaa) qaddar isku mid ah, oo ku dhowaad isu eg bilow ilaa dhammaad; **leexasho horumar leh** waxay ka dhigan tahay in bilawgu sax yahay oo khaldusku kor u kacayo dhanka dhammaadka, suurtogalna ay tahay inuu gaaro daqiiqado. Maqaalkani wuxuu ku saabsan yahay nooca labaad — kan koowaad, eeg [[moving the whole subtitle file earlier or later|/guides/shift-subtitle-timing.html]]."
    ]
   },
   {
    "h2": "Sababta ay u sii leexanayso",
    "ps": [
     "Leexashadu waxay ka timaaddaa **laba saacadood oo kala duwan**: seddexda sababood ee ugu badan waa (1) is-waafajin la'aanta xawaaraha sawirka — qoraallada hoose ee filim 24fps ah oo ku jira il 25fps ah waxay lumiyaan in ka badan hal ilbiriqsi daqiiqaddii; (2) muuqaalka waa la dedejiyey ama la gaabiyey halka qoraallada hoose ay haysteen xawaarihii asalka ahaa; (3) duubista VFR (xawaaraha sawirka ee doorsooma) taasoo waqtigeedu yahay mid aan sinnayn bilowgiiba. Waxa ay wadaagaan: khaldusku wuxuu u kordhayaa si toos ah (linearly) waqtiga ciyaarta."
    ]
   },
   {
    "h2": "Ku Hagaaji Labo Barroosin",
    "ps": [
     "Maaddaama khaldusku uu u kordhayo si toos ah, ku xiridda waqti sax ah cidhif kasta iyo dib u faafinta dhexda si siman ayaa wax walba dib u soo celinaysa. Tafatiraha waqtiga, ku dar **hagaajinta labada barroosin**: labada beerood ee \"hadda\" waxaa si otomaatig ah loogu buuxiyaa waqtiyada asalka ah ee faylkan; waxaad daawaneysaa muuqaalka oo aad gelisaa **goorta calaamadaha koowaad iyo tan ugu dambeysa ay dhab ahaantii soo baxayaan** labada beerood ee \"beegsiga\"."
    ],
    "img": {
     "file": "shift-step-two",
     "alt": "Hagaajinta labada barroosin: waqtiyada hadda waa la buuxiyey, waqtiyada beegsiga waa la gelinayaa",
     "cap": "Qaado barroosinnada labada cidhif — khalduska asalka ah ee ugu yar iyo kan ugu weyn — oo wax kasta oo dhexdooda ah ayaa dib u faafaya si siman."
    }
   },
   {
    "h2": "Sida Loo Xaqiijiyo Natiijada",
    "ps": [
     "Kadib socodsiinta, guddiga natiijada wuxuu ku qorayaa waqtiyada asalka ah iyo kuwa cusub ee calaamad kasta **garab iyo garab**. Si gaar ah u hubi saddex meelood: calaamadda koowaad, mid dhexda ku jirta, iyo tan ugu dambeysa — saddexda boos ee leh khalduska asalka ah ee ugu yar, dhexe iyo ugu weyn. Haddii saddexdooduba ay degaan, faylka oo dhan waa dejiyaa."
    ],
    "img": {
     "file": "shift-result",
     "alt": "Guddiga natiijada: waqtiyada ka hor iyo ka dib garab iyo garab, oo wata badhanka soo dejinta",
     "cap": "Waqtiyada cusub ee calaamadaha dhexda waa inay ku dhacaan labada cidhif dhexdooda — waa calaamad muujinaysa in saamigu sax yahay."
    }
   },
   {
    "h2": "Goorta Aanay Labo Barroosin Ku Filnayn",
    "ps": [
     "Hagaajinta labada barroosin waxay u qaadanaysaa in khaldusku yahay mid **toos ah**. Haddii isha ay tahay duubista shaashadda VFR oo leh boodboodka xawaaraha sawirka ee bartamaha faylka, jiidid toos ah ma hagaajin karto dhexda — qaado calaamad dhexda ah oo si cad u khaldan oo ah barta saddexaad, kala qaybi faylka halkaas, oo ku soco hagaajinta labada barroosin nus kasta. Sidoo kale, kadib hagaajinta, dib u daawo qaybta dhexda xawaaraha caadiga ah si aad u xaqiijiso in aanay jirin wax leexasho maxalli ah oo hartay."
    ]
   }
  ]
 },
 "table": {
  "seo": {
   "title": "Beddelka Qoraallada Hoose ee Excel / CSV – Labada Jiho – AI-SRTSub",
   "desc": "Socodka labada jiho: dhoofi SRT/VTT una dhoofi Excel ama CSV si loo hubiyo saf-saf, kadibna dib u soo geli xaashida la tafatiray oo ah qoraallo hoose. Saddex tiir ayaa loo baahan yahay, nidaam kasta ha ahaadee; wakhtiga waxaa loo hayaa sidii qoraal.",
   "h1": "Sida loo beddelo qoraallada hoose loona geeyo Excel / CSV",
   "intro": "Hubinta iyo turjumiddu waxay ku fudud yihiin xaashida xisaabta. Dhoofi qoraallada hoose una dhoofi Excel ama CSV, tafatir saf-saf, kadibna dib u beddel — tiirarka wakhtigu waxay ahaadaan qoraal, jebinta sadararada gudaha wadahadalkana waa la ilaaliyaa.",
   "ctaText": "Fur beddelaha xaashida"
  },
  "body": [
   {
    "h2": "Waxa qalabkani qabto",
    "ps": [
     "Qoraallada hoose waa safafka calaamadaha xaashiduna waa safafka diiwaannada — marka ay noqoto xaashi, hubinta, faallooyinka iyo turjumaadda tirada badan dhammaantood waxaa lagu samayn karaa qalab aad horay u aqoonaysay. Labada jiho waa la taageerayaa:"
    ]
   },
   {
    "h2": "Soo geli oo dooro jiho",
    "ps": [
     "Jiid fayl ama ka raadi mid. Jiho kasta waxay u baahan tahay nooc fayl oo duwan: **ilaa xaashida** waxay qaadataa faylasha qoraalka hoose (SRT / VTT), **ilaa qoraalka hoose** waxay qaadataa faylasha xaashida (CSV / Excel, labadaba .xlsx iyo .xls). Dooro qaabka qaldan oo boggu wuxuu kuu sheegayaa nooca fayl ee qaabkani doonayo.",
     "⚠️ Boggan wuxuu akhriyaa UTF-8 oo keliya. Haddii qoraalkaaga hoose uu furmo isagoo ka buuxa calaamadaha su'aasha ama sanduuqyo, maraan marka hore [[Mojibake repair|/repair.html]] — calaamadaynta jabtay waxay halkan u akhrisaa oo keliya sidii calaamado beddel ah."
    ],
    "img": {
     "file": "table-up",
     "alt": "Aagga soo dejinta beddelaha xaashida: aagga la jiido iyo labada beddelayaal ee habka",
     "cap": "Hab kasta wuxuu doonayaa fayl duwan: qoraallada hoose gudaha, xaashida dibadda — iyo dib"
    }
   },
   {
    "h2": "Dhoofinta Qoraallada Hoose ee Xaashida",
    "ps": [
     "Dooro \"to table\", ku rid qoraal hoose, oo hor-u-eegisku wuxuu taxayaa calaamad kasta: index, start, end, text. Baarka tirakoobku wuxuu bixiyaa tirada calaamadaha iyo wadarta muddada. Kadib riix \"Download Excel (.xlsx)\" ama \"Download CSV\".",
     "Farqiga u dhexeeya labada: .xlsx waa fayl xaashi oo dhab ah halkaas oo uusan Excel dib ugu qaabayn karin tiirkaaga wakhtiga gadaashaada; CSV waa mid la qaadi karo, laakiin Excel laga yaabaa inuu u fasiro tiirka wakhtiga si kale marka uu furayo. Haddii ay taasi dhacdo, dooro tiirka wakhtiga oo u deji qaabkiisa \"Text\" — ama kaliya isticmaal .xlsx."
    ],
    "img": {
     "file": "table-prev",
     "alt": "Hor-u-eegiska xaashida: index, start, end iyo tiirarka text ee wata baarka tirakoobka",
     "cap": "Calaamad kasta waa la hor-u-eegay; baarka tirakoobku wuxuu bixiyaa tirada calaamadaha iyo wadarta muddada"
    }
   },
   {
    "h2": "Dib u Soo Gelinta Xaashida ee Qoraallada Hoose",
    "ps": [
     "Dooro \"to subtitle\", ku rid xaashida, oo halkan waa xeerka tiirka: waxay u baahan tahay saddex tiir oo ah **start, end iyo text** (madaxyada Ingiriiska Start / End / Text sidoo kale way shaqeeyaan), **nidaam kasta**. `00:00:01,500` iyo `00:00:01.500` labadaba waa la aqbalay; safafka aan la falanqeyn karin waa la boodaa halkii lagu xukumi lahaa faylka oo dhan.",
     "Natiijada waxaa lagu taxay calaamad calaamad ah hor-u-eegiska; xaqiiji, kadibna soo dejiso SRT ama VTT. Haddii saddexdaas tiir ay maqan yihiin waxaad heli fariin kuu sheegaysa inaad hubiso madaxyada — inta badan sababtoo ah magacaabin kale ayaa la isticmaalay markii la dhoofinayay, ama madaxa safka ma aha safka koowaad."
    ],
    "img": {
     "file": "table-back",
     "alt": "Aagga natiijada qoraalka hoose: qoraallada hoose ee la soo geliyey oo calaamad calaamad ah loo taxay",
     "cap": "Tiirarka aan la aqoonsan waa la soo sheegaa, waligoodna si aamusan looma ilaawo"
    }
   },
   {
    "h2": "Su'aalaha Badanaa La Is Weydiiyo",
    "ps": [
     "**Excel ma tusayaa tiirka wakhtiga si khaldan?** Isticmaal .xlsx oo waligeed ma dhacdo. Haddii ay qasab tahay inaad isticmaasho CSV: dooro tiirka wakhtiga oo u deji qaabka unugga \"Text\" ka hor inta aadan furin.",
     "**Madaxyada tiirarku ma qasab baa inay noqdaan Ingiriis?** Maya. Start / End / Text waxaa lagu aqoonsadaa luqad kasta oo boggani taageero, xarafka weyn iyo kan yarina muhiim ma ahan.",
     "**Jebinta sadararadayadu ma sidiisii bay ku yihiin dib u soo gelinta ka dib?** Haa. Jebinta sadararada ee gudaha wadahadalka waa la ilaaliyaa, ilaa iyo xirmada asalka ah.",
     "**ASS ma la taageerayaa?** Boggan wuxuu maareeyaa SRT iyo VTT oo keliya. ASS waxay wadataa tilmaamaha qaabka — marka hore u beddel SRT adoo adeegsanaya [[Format converter|/convert.html]].",
     "**Immisa faylalka ah hal mar?** Hal. Si aad u wado tobnaadyo ama boqolaal, adeegso [[Batch conversion|/batch.html]] (taas oo beddesha qaababka oo keliya mana marto xaashida xisaabta)."
    ]
   },
   {
    "h2": "Asturnaanta",
    "ps": [
     "Beddelku wuxuu si buuxda uga dhex shaqeeyaa biraawsarkaaga. Wax ka mid ah nuxurka qoraalka hoose laguma diro serbar."
    ]
   },
   {
    "h2": "Qalabka iyo Hagayaasha La Xiriira",
    "ps": [
     "Haddii waxa aad rabto uu yahay oo keliya tillaabada qoraalka hoose loo beddelayo Excel, eeg [[Convert subtitles to Excel|/guides/srt-to-excel.html]]; si aad u turjunto luqad kale ka dib, [[Subtitle translation|/translate.html]]; tobnaadyo faylal ah hal mar — [[Batch conversion|/batch.html]]."
    ]
   }
  ]
 },
 "translate": {
  "seo": {
   "title": "Turjumaadda Qoraallada Hoose ee AI – ka soo rar ilaa dhoofinta labada luqadood – AI-SRTSub",
   "desc": "Turjumi qoraallada hoose adoo adeegsanaya AI: ku shub SRT/VTT/ASS, ka dooro 100 luqadood, ku midee magacyada eray-bixinta, dhoofi qoraallo laba luqadood leh. Bilaash in la billaabo, furaha API ee gaarka ah waa la taageerayaa.",
   "h1": "Sida loo Isticmaalo Turjumaadda Qoraallada Hoose ee AI",
   "intro": "Hannaanka dhammaystiran ee hal fayl oo qoraal hoose ah, laga bilaabo soo-gelinta ilaa turjumaadda iyo dhoofinta: waxa ku jira shaashadda, waxa la gujinayo, iyo waxa aad ka helayso tallaabo kasta.",
   "ctaText": "Fur qalabka turjumaadda"
  },
  "body": [
   {
    "h2": "Waxa Qalabkani Qabto",
    "ps": [
     "Wuxuu ka turjumaa qoraallada hoose hal luqad ilaa mid kale wuxuuna dhoofiyaa fayl qoraal hoose oo diyaar u ah isticmaalka. Baahiyaasha caadiga ah:"
    ]
   },
   {
    "h2": "Soo Geli Qoraallada Hoose",
    "ps": [
     "Guji \"Choose subtitle file\" ama ku dheji qoraalka hoose si toos ah sanduuqa gelitaanka bidixda. Lix qaab ayaa la taageerayaa: SRT, VTT, ASS, SSA, SBV iyo TXT. Ma haysatid fayl gacanta ku jira? Guji \"Load sample\" si aad u aragto sida uu u shaqeynayo. Marka la falanqeeyo, tiirka dhexbeedku wuxuu muujinayaa miiska qoraalka hoose oo wata tusmo, wakhti iyo qoraalka asalka ah ee gelitaan kasta."
    ],
    "img": {
     "file": "translate-upload",
     "alt": "Aagga soo dejinta ee qalabka turjumaadda: dooro faylka qoraalka hoose, sanduuqa dhejiska iyo badhanka muunadda-cusub",
     "cap": "Tiirka bidix \"Import subtitles\": dooro fayl, ku dheji qoraal ama soo rar muunad"
    }
   },
   {
    "h2": "Dooro Luqadda iyo Qaabka",
    "ps": [
     "\"Source language\" waxay ku jiri kartaa ogaanshaha-otomaatiga ah; \"target language\" waxaa laga doortaa 100 luqadood. Shan qaab oo turjumaad ah ayaa la heli karaa: Balanced (asal ahaan), Conversational, Formal professional, Dub-style iyo Custom. \"Dub-style\" waxay ku habboon tahay wada-hadalka filimada iyo telefishanka; \"Formal professional\" waxay ku habboon tahay dukumentiyada iyo koorsooyinka."
    ],
    "img": {
     "file": "translate-lang",
     "alt": "Dejinta luqadda iyo qaabka turjumaadda: luqadda asalka, sanduuqyada hoos u dhaca ee luqadda la beegsanayo iyo shanta qaab",
     "cap": "\"Language\" iyo \"translation style\": asalku wuxuu si otomaatig ah u ogaan karaa, 75 xulasho oo la beegsanayo"
    }
   },
   {
    "h2": "Eray-bixinta: ku hay magacyada kuwo is waafaqsan",
    "ps": [
     "AI-du waxay u turjuntaa qaybo-qaybo, markaa magaca oo kale wuxuu ku soo bixi karaa laba siyood oo kala duwan qaybo kala duwan dhexdeoda. Ku qor sharciyada \"source → must be translated as\" eray-bixinta; qayb kasta ka hor qalabku wuxuu baaraa oo raacaa ciyaar kasta. Hal sharci safkiiba; falaaraha waxay noqon karaan `->`, `=>`, `→` ama Tab; erayga asalka ah ee keligood ah wuxuu ka dhigan yahay inaan la turjumin; hingaad dhowr ah ayaa wadaagi kara hal turjumaad iyada oo loo marayo `|`. Guji \"✨ AI extract\" si aad uga dhigto AI inay ka soo saarto magacyada gaarka ah ee muuqaalka miiska marka hore, kadibna u tafatir oo turjumi."
    ],
    "img": {
     "file": "translate-glossary",
     "alt": "Aagga eray-bixinta iyo magacyada gaarka ah: sanduuqa gelitaanka eray-bixinta oo wata AI extract iyo badhannada keydinta",
     "cap": "Eray-bixinta \"Unified names\": magacyada gaarka ah ee AI-ga laga soo saaray, si otomaatig ah loogu raray fiidiyowyada cusub mar alla markii la keydiyo"
    }
   },
   {
    "h2": "Hannaanka Turjumaadda",
    "ps": [
     "Guji \"▶ Start translation\" ee baarka sare. Xariijinta tirakoobka dhexbeedka waxay muujinaysaa gelitaannada, kuwa la turjumay, buuxiyeyaasha la nadiifiyey iyo kooxaha jumladaha ee isdhaafsan waqtiga dhabta ah; baarka horumarku wuxuu muujinayaa wakhtiga la qiyaasayo ee haray iyo calaamadaha la isticmaalay. Inta aad turjumayso, guji unug kasta oo turjumaad ah ee miiska si aad u tafatirto qoraalka — isbeddellada waxaa lagu kaydiyaa mashiinkaaga waxayna ka badbaadaan cusboonaysiinta. Xidh bogga badhtamaha socodka waxaana lagu siin doonaa inaad ka sii waddo halkii uu ka joojiyey. Marka hal jumlad ay ku fidsan tahay gelitaanno dhowr ah, kooxda waa la mideeyaa, la turjumaa waxaana lagu buuxiyaa muddada."
    ],
    "img": {
     "file": "translate-workspace",
     "alt": "Goobta shaqada ee turjumaadda: xariijinta tirakoobka, baarka horumarka iyo miiska qoraalka hoose ee la tafatiri karo",
     "cap": "Goobta shaqada dhexbeedka: xariijinta tirakoobka + baarka horumarka + miiska qoraalka hoose ee guji-si-aad-u-tafatirto"
    }
   },
   {
    "h2": "Dhoofinta",
    "ps": [
     "Tiirka midig ka dooro foomka nuxurka marka hore: turjumaad keliya (hal luqad ah), laba luqadood oo asalku dusha ka yahay, ama laba luqadood oo turjumaaddu dusha ka tahay; kadib qaabka faylka: SRT, WebVTT, SBV, ASS ama TXT. Doorashada ASS waxay ku dareysaa laba hab-raac: shaashadaha qaybsan ee sare/hoose iyo sadarrada hoose ee is dul saaran. Nuxurka iyo qaabku waxay si xor ah ugu biiraan 14 qaab dhoofin ah. Ballaca sadarka labada luqadood waxaa loo dejiyaa si gooni ah. Guji \"Download subtitles\" si aad u keydiso faylka, ama \"Copy to clipboard\" si aad si toos ah ugu dhejiso."
    ],
    "img": {
     "file": "translate-export",
     "alt": "Guddiga dhoofinta: saddex nooc oo nuxur ah, shan qaab oo fayl ah iyo dejinta ballaca sadarka labada luqadood",
     "cap": "Dhoofinta tiirka midig: dooro foomka nuxurka marka hore, kadibna qaabka faylka"
    }
   },
   {
    "h2": "Kharashka iyo Asturnaanta",
    "ps": [
     "Qaabka asalka ah uma baahna diiwaangelin iyo furaha toona — wuxuu si toos ah uga shaqeeyaa qaybo cayiman oo codsi kasta ah: xadka maalinlaha ah ee IP kasta oo lagu daray gunnada maalinlaha ah ee goobta oo dhan. Dufcadyada waaweyn, geli furahaaga API ee hoos yimaada \"Translation engine\". Asturnaanta, sida ku xusan ogeysiiska bogga: qoraallada hoose ee qaabka asalka ah waxaa loo sii gudbiyaa adeegaha boggan adoo sii marinaya bixiyaha; API-ga gaarka ah waxaa si toos ah u maamula bixiyaha aad geliso, furuhuna wuxuu ku jiraa biraawsarkaaga. Falanqaynta, duubista sadarka iyo habaynta labada luqadood dhammaantood waxay ka dhex shaqeeyaan biraawsarkaaga maxalli ahaan."
    ]
   },
   {
    "h2": "Su'aalaha Badanaa La Is Weydiiyo",
    "ps": [
     "**Luqado kale miyaa ku dhex jira turjumaadda?** Qalabku wuxuu ogaadaa leexashada luqadda wuxuuna dib u turjumaa si otomaatig ah; haddii gelitaanno yar ay weli u muuqdaan kuwo khaldan, guji unugga oo ku hagaaji gacanta.",
     "**Ka wararran xarumaha gabayada?** \"Content filtering\" waxay bixisaa saddex xulasho oo ku saabsan heesaha: turjumi heesaha, hayso asalka ama tirtir.",
     "**Turjumaadaha magacyada ee aan is waafaqsanayn?** Ku dar hingaadyada aan isla beegnayn eray-bixinta oo dib u turjumi; eray-bixintu waxay mudnaan siisaa dejinta caalamiga ah ee \"proper-noun handling\".",
     "**Ma rabtaa Ingiriis dusha iyo Shiine hoos?** Dooro \"Bilingual · original on top\" marka aad dhoofinayso; Shiinaha oo dusha ah iyo Ingiriiska oo hooseeya, dooro \"Bilingual · translation on top\"."
    ]
   },
   {
    "h2": "Qalabka iyo Hagayaasha La Xiriira",
    "ps": [
     "Qaab khaldan? Ku billow [[format conversion|/convert.html]]; wakhtigu waa qalad? Isticmaal [[timeline adjustment|/shift.html]]; ka hor inta aadan gacanta gelin, geli adoo marinaya [[subtitle quality check|/guides/subtitle-quality-check.html]]."
    ]
   }
  ]
 },
 "translate-english-to-chinese": {
  "seo": {
   "title": "Turjumiadda Xarfaha Ingiriiska ee Shiineeska – AI-SRTSub",
   "desc": "Turjum xarfaha Ingiriiska illaa Shiinees: geli SRT/VTT/ASS, dooro Shiinees fudud ama dhaqameed, oo dhoofi xarfaha Shiineeska keliya ama laba-luuqadlaha ah. – AI-SRTSub",
   "h1": "Turjumi Xarfaha Ingiriiska ee Shiineeska",
   "intro": "SRT-ga Ingiriiska ayaa soo gala, xarfaha Shiineeska (ama laba-luuqadle ah ee Ingiriis-Shiinees) ayaa ka soo baxa: geli, dooro luuqadda la rabo, dhoofi — dhammaan hal bog.",
   "ctaText": "Turjum xarfaha Ingiriiska"
  },
  "body": [
   {
    "h2": "Markaad u baahan tahay",
    "ps": [
     "Xarfaha aad soo dejisay waa Ingiriis keliya oo ma la socon kartid; ama waxaad rabtaa xarfaha Shiineeska ah xubnaha qoyska ee aan akhrin Ingiriiska. Waxaad u baahan tahay waxay ku timaaddaa mid ka mid ah saddex qaab — **xarfaha Shiineeska keliya**, ama xarfaha laba-luuqadlaha ah iyadoo **Shiineesku kor ku jiro, Ingiriiskuna hooseeyo** ama **Ingiriisku kor ku jiro, Shiineeskuna hooseeyo** — qalabkanina wuxuu soo saaraa saddexdaba."
    ]
   },
   {
    "h2": "Sida loo sameeyo",
    "ps": [
     "Fur [[Turjumaanka Xarfaha AI|/translate.html]] oo ku rid faylkaaga xarfaha Ingiriiska (SRT, VTT, ASS, SSA, SBV iyo TXT dhammaantood waa la aqoonsaday, ama kaliya ku dheji qoraalka). Ka tag “Luuqadda asalka ah” ogaanshaha-otomaatigga ah, u deji “Luuqadda la rabo” Shiinees Fudud ama Dhaqameed, oo guji “▶ Bilow turjumaadda”. Mark ay dhammaato, dooro qaabka nuxurka ee guddiga dhoofinta ee dhinaca midig: turjumaad keliya (hal-luuqad), laba-luuqadle · asalka oo kor ah (Ingiriisku kor, Shiineesku hoose), ama laba-luuqadle · turjumaadda oo kor ah (Shiineesku kor, Ingiriisku hoose), dabadeed dooro qaabka faylka oo soo dejiso."
    ],
    "img": {
     "file": "translate-export",
     "alt": "Guddiga dhoofinta: turjumaad keliya, laba-luuqadle oo asal ah kor ku jiro, iyo laba-luuqadle oo turjumaad kor ku jiro",
     "cap": "Dooro qaabka nuxurka marka la dhoofinayo: Shiinees keliya, ama laba-luuqadle ah oo Ingiriisku-kor / Shiineesku-kor yahay"
    }
   },
   {
    "h2": "Laba dhibaato oo caadi ah",
    "ps": [
     "**Magacyada si aan joogto ahayn loo turjumay?** AI-du waxay u turjumtaa qayb-qayb, markaa magaca oo kale wuxuu soo bixi karaa laba siyood. Geli lamaanaha “asalka → magaca la turjumay” eray-bixinta (tusaale. `Watson → Huasheng`) si ay u ahaato mid midaysan oo dhan.",
     "**Xarfaha ma ka leexanayaan sawirka?** Turjum marka hore, dabadeed hagaaji wakhtiga: qalabka wakhtiga ee korka goobta shaqadu wuxuu leeyahay xakamaynta magdhowga caalamiga ah iyo miisaanka — eeg [[Xarfaha waxay ka baxayaan waqtigii loogu talagalay dhamaadka|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "videosub": {
  "seo": {
   "title": "Soo saaridda xarfaha fiidiyowga ee ku dhex jira – Jidadka MKV / MP4 – AI-SRTSub",
   "desc": "Akhri jidadka xarfaha ee ku dhex jira MKV, WebM, MP4 iyo MOV oo dhoofi SRT / VTT / ASS / TXT. Soo raritaan ma jiro, beddelid ma jiro, jid kasta waa la taxay.",
   "h1": "Sida loo soo saaro xarfaha ku dhex jira fiidiyowga",
   "intro": "Akhri jidka xarfaha ee ku xidhan gudaha MKV / MP4 si toos ah oo ah SRT — fiidiyowga weligiis lama soo geliyo, wax walba waxaa lagu akhriyaa biraawsarka.",
   "ctaText": "Fur soo saaridda xarfaha fiidiyowga"
  },
  "body": [
   {
    "h2": "Waxa qalabkani sameeyo",
    "ps": [
     "Xarfaha waxaa lagu xidhi karaa faylka fiidiyowga halkii ay taagnaan lahaayeen iyagoo keli ah. Si aad u beddesho, u turjunto ama u lammaanayso waa inaad marka hore soo saartaa — taasi waa waxa keli ah ee boggani sameeyo."
    ]
   },
   {
    "h2": "1 Ku dar fiidiyowga",
    "ps": [
     "Jiid faylka fiidiyowga oo geli tiirka koowaad ama guji si aad mid u doorato. **MKV / WebM** iyo **MP4 / MOV** keliya ayaa la aqoonsaday; weelasha kale ma soo saari doonaan wax jid ah.",
     "Faylku weligiis kama baxo kombuyuutarkaaga — ma jiro tallaabo soo raritaan ah. Qalabku wuxuu ku akhriyaa qaybo yaryar oo magdhow ah, markaa filim dhowr gigabayt ah ma buuxiyo xusuusta, laakiin akhrinta koowaad waxay tahay in la baaro macluumaadka jidka hal mar."
    ],
    "img": {
     "file": "videosub-up",
     "alt": "Aagga ku-dar-fiidiyowga ee bogga soo saaridda xarfaha ku dhex jira",
     "cap": "MKV / WebM iyo MP4 / MOV waa la taageeray, faylkuna weligiis kama baxo mashiinkaaga"
    }
   },
   {
    "h2": "2 Jidadka xarfaha ee ku dhex jira",
    "ps": [
     "Mark ay akhrisku dhammaato, tiirka labaad wuxuu taxayaa jidadka xarfaha ee faylka ku jira **hal halkii safba**, oo badanaa leh luuqad iyo magac jid (tusaale \"Shiinees\", \"Ingiriis\", \"Qasab ah\"). Guji saf si aad u soo saarto jidkaas.",
     "Mark uu faylku haysto hal jid oo xaraf ah keliya, soo saariddu waxay bilaabmaysaa si otomaatig ah — gujin looma baahna.",
     "**Xarfaha sawirka lama soo saari karo**: Blu-ray PGS iyo xarfaha DVD waa sawiriso ku dhex jira qulqulka oo aan lahayn qoraal la qaato, bogguna si cad ayuu u sheegayaa; kuwaas waxay u baahan yihiin OCR."
    ],
    "img": {
     "file": "videosub-track",
     "alt": "Liiska jidadka xarfaha ee ku dhex jira, hal saf halkii marba",
     "cap": "Hal jid halkii safba; marka uu jiro hal keliya, soo saariddu waxay bilaabmaysaa si otomaatig ah"
    }
   },
   {
    "h2": "3 Natiijada",
    "ps": [
     "\"3 Natiijo\" ee dhinaca midig waxay tusaysaa qoraalka xarfaha ee la soo saaray, iyadoo qaabka dhoofinta uu kor ku yaal: **SRT / VTT / ASS / TXT**. Guji \"Soo deji\" ama \"Koobi\".",
     "Mark uu jidka asalka ahi yahay ASS, madaxa qaabkiisa iyo xallintiisa waxay soo noqonayaan iyagoo aan is beddelin — dhoofinta sida ASS waxay ilaalisaa iyaga, halka dhoofinta sida SRT ay siddo qoraalka keliya."
    ],
    "img": {
     "file": "videosub-out",
     "alt": "Aagga natiijada oo wata doorashada qaabka SRT / VTT / ASS / TXT",
     "cap": "Afar qaab dhoofin; isha ASS waxay haysataa madaxa qaabkeeda iyo xallinteeda"
    }
   },
   {
    "h2": "Waxa aan la taaban",
    "ps": [
     "Faylka fiidiyowga laftiisa lama taabto gabi ahaanba — akhrin keliya, wax qorid ma jiro, beddelid ma jiro, dib-u-habayn ma jiro.",
     "Nuxurka xarfaha wuxuu soo baxayaa sida uu yahay: qiyaas sumadeyn ma jiro, sixid wakhti ma jiro. Haddii xarfaha la soo saaray ay qalloocan yihiin, taasi waa dhibaato sumadeyn ah oo ku jirta jidka asalka ah — u gee [[Dayactirka qoraalka qalloocan|/repair.html]]."
    ]
   },
   {
    "h2": "Su'aalaha badanaa la isu weydiiyo",
    "ps": [
     "**Ma jirtaa dhab ahaantii hab lagu maareeyo xarfaha sawirka (PGS / DVD)?** Maya boggan ma aha — waa sawiriso aan lahayn lakab qoraal ah. OCR waa inuu horreeyaa, bogganina ma sameeyo taas.",
     "**Xarfaha la soo saaray wakhtigooda waa la khaldamay — maxay tahay?** Boggan ma saxayo wakhtiyada; waxa soo baxaya waa waxa halkaa joogay. Wixii ku saabsan magdhow caalami ah ama dhibaato heer ah isticmaal [[Hagaajinta wakhtiga|/shift.html]].",
     "**Maxay qaadataa wakhti dheer inta aan waxba dhicin?** Fayl weyn waa in la baaro qayb-qayb si loo helo macluumaadka jidka, oo inta uu faylku weyn yahay waa marka uu wakhti dheer qaadanayo; tani waxay ka dhacdaa maxalliyan oo wax xidhiidh ah la leedahay ma jiro xidhiidhkaaga.",
     "**Ma isticmaali karaa boggan xarfaha dibadda?** Uma baahnid — .srt / .ass dibadda ah ayaa si toos ah u gala [[Beddelka qaabka|/convert.html]] ama qalab kale. Boggan waxaa loogu talagalay xarfaha ku dhex xidhan fiidiyowga."
    ]
   },
   {
    "h2": "Asturnaanta",
    "ps": [
     "Fiidiyowga waxaa si buuxda loogu akhriyaa biraawsarka: waxba lama soo geliyo, waxba lama beddelo, waxba ma dhex maraan adeegye. Xir bogga oo xogta la akhriyay waa la sii daayaa."
    ]
   },
   {
    "h2": "Qalabka iyo hagayaasha la xiriira",
    "ps": [
     "Si aad u turjunto waxa aad soo saarto tag [[Turjumaadda xarfaha|/translate.html]], si aad uga dhigto laba-luuqadle eeg [[Laba hab oo loogu sameeyo xarfaha laba-luuqadlaha ah|/guides/make-bilingual-subtitles.html]]; wixii ku saabsan farqiga u dhexeeya jidadka ku dhex jira iyo kuwa dibadda, iyo kuwa la soo saari karo, eeg [[Sida xarfaha looga soo saaro fiidiyowga|/guides/extract-subtitles-from-video.html]]."
    ]
   }
  ]
 },
 "vtt-to-srt": {
  "seo": {
   "title": "Beddelka VTT ilaa SRT – Beddel Xarfaha WebVTT – AI-SRTSub",
   "desc": "U beddel xarfaha VTT (WebVTT) SRT tafatirayaasha iyo ciyaartooyda qaata SRT keliya. Madaxa WEBVTT iyo xannibadaha NOTE waa la nadiifiyaa si otomaatig ah. Wuxuu ka shaqeeyaa biraawsarkaaga.",
   "h1": "VTT ilaa SRT",
   "intro": "U beddel xarfaha VTT (WebVTT) SRT: geli faylka, dooro SRT, soo deji. Madaxa iyo xannibadaha qoraalka hoose waa la nadiifiyaa waxaana wakhtigu ku noqdaa calaamadda comma-ha.",
   "ctaText": "Beddel VTT → SRT"
  },
  "body": [
   {
    "h2": "Markaad u baahan tahay SRT dib u soo celin",
    "ps": [
     "CapCut, Premiere, ciyaartooyda desktop-ka badankooda, iyo qalabka xarfaha ee duugga ah waxay aqbalaan **SRT** keliya. Xarfaha laga soo dejiyay shabakadda ama YouTube waxay badanaa ku yimaadaan VTT — u beddel SRT si aad si toos ah ugu soo dejiso."
    ]
   },
   {
    "h2": "Waxa laga nadiifiyo VTT-ga",
    "ps": [
     "**Khadka madaxa WEBVTT**, xannibadaha NOTE, xannibadaha STYLE/REGION, iyo habaynta cue ka dib khadka wakhtiga (sida align:start) ma aha qoraal xaraf — waa la tuuraa si otomaatig ah; lambarraynta waa la soo celiyaa oo kala-sooca millisekundigu wuxuu ka beddelaa dhibic wuxuuna ku noqdaa comma."
    ],
    "img": {
     "file": "convert-upload-vtt",
     "alt": "Aagga soo gelinta: faylka VTT oo la raray, oo loo aqoonsaday VTT ahaan",
     "cap": "Fayl leh madaxa WEBVTT waxaa loo aqoonsadaa VTT isla markiiba"
    }
   },
   {
    "h2": "Sida loo beddelo",
    "ps": [
     "Fur [[beddelaha|/convert.html]], geli VTT-ga, dooro **SRT - SubRip** sida wax-soo-saarka, dabadeed beddel oo soo deji. Qoraalka iyo qiimayaasha wakhtigu way is beddelayaan."
    ],
    "img": {
     "file": "convert-result-srt",
     "alt": "Natiijada beddelka: lambarraynta SRT oo wata wakhtiyada comma-ha",
     "cap": "SRT-ga la beddelay: lambarrada cue + wakhtiyada comma"
    }
   }
  ]
 }
};
