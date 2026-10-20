/* i18n/gd-eu.js —— 43 篇指南页的eu译文（由 _mkgd.js 生成，勿手改）
 * 源：_gd/eu.json（Gemini 翻译，_gemgd.js 产出）
 * 结构：{ <slug>: { seo:{title,desc,h1,intro,ctaText}, body:[{h2,ps[],img}] } }
 * ⚠️ server.js 自己 require 它，不被任何 html 引用 —— 部署时必须显式加进传输列表。
 */
module.exports = {
 "ass-to-srt": {
  "seo": {
   "title": "ASS - SRT bihurtzailea – Bihurtu ASS/SSA azpitituluak – AI-SRTSub",
   "desc": "Bihurtu ASS (eta SSA) azpitituluak SRT soilera: testua eta denborak bere horretan ateratzen dira, eta estilo-etiketak atzean geratzen dira. SRT soilik onartzen duten softwareetarako. Nabigatzailean exekutatzen da.",
   "h1": "ASS-tik SRTra",
   "intro": "Bihurtu ASS (edo SSA) azpitituluak SRT: askatu fitxategia, hautatu SRT, eta deskargatu. Testua eta denborak bere horretan ateratzen dira; estilo-etiketek ez dute jarraitzen.",
   "ctaText": "Bihurtu ASS → SRT"
  },
  "body": [
   {
    "h2": "SRT noiz behar duzun",
    "ps": [
     "Edizio-suiteak, telebistako erreproduzitzaileak, itzulpen-tresnak — beheragoko urrats askok **SRT** besterik ez dute onartzen. ASSko estilo eta kokapen apaingarriek ez dute balio hor, beraz, SRT soila da aukerarik seguruena."
    ]
   },
   {
    "h2": "Zer gertatzen zaie estilo-etiketei",
    "ps": [
     "ASSko seinale bakoitza `{\\fonts}` bezalako gainidazketa-etiketak dituen lerro bat da, kolorea, mugimendua edo efektuak adierazteko. SRTra bihurtzean, **etiketa horiek eta estiloak kendu** egiten dira, eta testua eta denborak bakarrik mantentzen dira; `\\N` lerro-jauziak benetako lerro-jauzi bihurtzen dira. SSA fitxategiak ere irakur daitezke."
    ],
    "img": {
     "file": "convert-result-srt",
     "alt": "Bihurketa-emaitza: ASS-tik ateratako SRT zenbakikuntza eta testua",
     "cap": "Ateratako SRT-a: seinale bakoitzeko zenbaki bat, testu garbia"
    }
   },
   {
    "h2": "Nola bihurtu",
    "ps": [
     "Ireki [[bihurtzailea|/convert.html]], jarri ASS fitxategia (.ssa ere balio du), aukeratu **SRT - SubRip** irteera gisa, eta bihurtu eta deskargatu. Alderantziz egin nahi duzu? Ikusi [[SRT-tik ASSra|/guides/srt-to-ass.html]]."
    ]
   }
  ]
 },
 "batch": {
  "seo": {
   "title": "Nola bihurtu azpitituluak sorta-sorta – Ehunka fitxategi ZIP bakar batean – AI-SRTSub",
   "desc": "Argibidea: sartu SRT/VTT fitxategi mordoa, bihurtu formatu bakarrera, eta deskargatu ZIP bakarra. Zenbakituak berriro, denbora-markak normalizatuak, eta fitxategi baliogabeak fitxategi-altean sartu beharrean markatuta.",
   "h1": "Nola bihurtu azpitituluak sorta-sorta",
   "intro": "Denboraldi osoko azpitituluek formatu berean amaitu ohi dute, eta banan-banan igotzeak betiko irauten du. Utzi denak hemen, bihurtu denak batera eta deskargatu ZIP bat — analizatu ezin diren fitxategiak markatu egiten dira, isilean artxiboan sartu beharrean.",
   "ctaText": "Ireki sorta-bihurketa"
  },
  "body": [
   {
    "h2": "Zer egiten duen tresna honek",
    "ps": [
     "Denboraldi osoko edo bilduma bateko azpitituluek uniformeak izan behar dute gainontzerakoa egin aurretik. Hona hemen sorta-orriak zer egiten duen:"
    ]
   },
   {
    "h2": "Fitxategiak gehitzea",
    "ps": [
     "Arrastatu azpititulu-fitxategi batzuk marratutako koadrora batera, edo egin klik eta hautatu hainbat batera. Fitxategi-zerrendak bakoitza erakusten du: analizatutako fitxategiek seinale-kopurua erakusten dute, eta analizatu gabeak ezagutu ez direla adierazteko markatzen dira. Goiko barrak fitxategi-kopurua, seinale-kopurua eta zenbat ez diren ezagutu batu egiten ditu.",
     "⚠️ Orri honek UTF-8 soilik irakurtzen du. Kodeketa hautsia duen edozer (galdera-ikur edo koadro multzo bat) [[Mojibake-konponketa|/repair.html]] bidez pasa beharko lehenbizi."
    ],
    "img": {
     "file": "batch-list",
     "alt": "Fitxategi-zerrenda: izena eta seinale-kopurua fitxategi bakoitzeko, ezagutu ez direnak gorriz markatuta",
     "cap": "Fitxategi bakoitza zerrendatuta, eta ezagutu ez direnak unean bertan markatuta"
    }
   },
   {
    "h2": "Zer bihurtu dena",
    "ps": [
     "Hautatu helburu-formatua \"Bihurtu guztiak hona\" atalean — SRT edo VTT. Zerrendako fitxategi bakoitza formatu horretan birsortzen da ondoren: seinale-zenbakiak goitik birzenbakituak, denbora-markak helburura normalizatuak (SRTk milisegundoak komaz bereizten ditu, VTTk puntuz).",
     "**Jatorrizko fitxategi-izenak mantendu egiten dira eta luzapena bakarrik aldatzen da**; izen bikoiztuei zenbaki bat gehi zaie ezer ez gainidazteko."
    ],
    "img": {
     "file": "batch-up",
     "alt": "Helburu-formatu hautatzailea eta zerrendaren egoera, estatistika-barrak fitxategi eta seinale kopurua erakusten duela",
     "cap": "Hautatu helburu-formatu bat eta fitxategi guztiak birsortu egiten dira; fitxategi-izenek luzapena soilik aldatzen dute"
    }
   },
   {
    "h2": "Paketatzea eta deskargatzea",
    "ps": [
     "Egin klik \"Paketatu ZIP bakarrean eta deskargatu\" aukeran eta artxiboak bihurtutako fitxategi guztiak ditu barruan. **Seinale ezagungarririk ez duten fitxategiak kanpoan geratzen dira** — zerrendan jarraitzen dute, markatuta, arrakasta izan balute bezala nahastu beharrean. Paketatu ondoren, barruan zenbat fitxategi dauden adierazten dizun kopurua lortzen duzu."
    ],
    "img": {
     "file": "batch-zip",
     "alt": "Paketatze-eremua: ZIP deskargatzeko botoia eta paketatze-emaitzaren mezua",
     "cap": "Ezagutu ez diren fitxategiak artxibotik kanpo geratzen dira eta zerrendan markatuta jarraitzen dute"
    }
   },
   {
    "h2": "Zergatik markatzen den fitxategi bat ezezagun gisa",
    "ps": [
     "Fitxategi bat markatu egiten da bertatik seinalerik ezin denean irakurri. Ohiko hiru arrazoi: ez da azpititulu bat ere (esate baterako, galdutako .txt irakurri-nazazu bat), kodeketa ez da UTF-8 (beraz, ordezkapen-karaktere gisa bakarrik irakurtzen da), edo edukia bloke bakar batean laututa dago denbora-markarik gabe.",
     "Markatutako fitxategiak banaka landu daitezke: kodeketa-arazoak [[Mojibake-konponketa|/repair.html]] bidera bidali, eta formatu-arazoak [[Formatuz aldatzailea|/convert.html]] bidera bihurketa bakar bat egiteko zerrendara itzuli aurretik."
    ]
   },
   {
    "h2": "Maiz egiten diren galderak",
    "ps": [
     "**Zenbat fitxategi gehi ditzaket?** Ez dago muga zorrotz estrategikorik; nabigatzailearen memoriaren araberakoa da, eta ehunka SRT fitxategi ondo moldatu ohi dira.",
     "**Nire elkarrizketa aldatzen al du?** Ez. Sorta-bihurketak edukiontzi-formatua soilik aldatzen du — seinaleak birzenbakituz eta denbora-markak normalizatuz —, inoiz ez elkarrizketa-hitz bat ere.",
     "**Edukia aldatu behar badut zer?** Orri honek formatuak soilik bihurtzen ditu. Denbora masiboki aldatzeko, erabili [[Denbora-doikuntza|/shift.html]]; hitzak aldatzeko, erabili [[Termino-ordezkapena|/glossary.html]]; biek fitxategiz fitxategi lan egiten dute.",
     "**Onartzen al da ASS?** Orri honek SRT eta VTT artean soilik bihurtzen du. ASSk estiloa darama — erabili [[Formatuz aldatzailea|/convert.html]] horretan banaka."
    ]
   },
   {
    "h2": "Pribatutasuna",
    "ps": [
     "Bihurketa eta paketatzea guztiz zure nabigatzailean exekutatzen dira. Azpitituluen edukirik ez zaio inoiz zerbitzari bati bidaltzen."
    ]
   },
   {
    "h2": "Erlazionatutako tresnak eta gidak",
    "ps": [
     "Zer aldatu denboraldi oso baterako eta zein ordenatan — [[Denboraldi osoko azpitituluak sorta-batean editatzen|/guides/batch-convert-srt.html]]; fitxategi bakar baterako formatu gehiago — [[Formatuz aldatzailea|/convert.html]]; kalkulu-orri batean zuzentzea — [[Azpititulua ⇄ taula|/table.html]]."
    ]
   }
  ]
 },
 "batch-convert-srt": {
  "seo": {
   "title": "Denboraldi oso bat sorta-batean editatzea – Zer eskalatzen den, zer ez – AI-SRTSub",
   "desc": "Denboraldi batek aldaketa bera behar du nonahi: formatu uniformea, denbora-desplazamendua, terminologia. Hona hemen igarobide bakarrean bukatzen dena, eta nola kudeatu analizatzen ez diren fitxategiak.",
   "h1": "Denboraldi osoko azpitituluak sorta-batean editatzea",
   "intro": "Hamarnaka azpititulu-fitxategi aldatu behar direnean, normalean aldaketa bera izaten da aldi bakoitzean. Zein zati egin daitezkeen igarobide bakarrean jakiteak banan-banan ibiltzeak baino denbora askoz gehiago aurrezten du.",
   "ctaText": "Ireki sorta-bihurketa"
  },
  "body": [
   {
    "h2": "Normalean aldaketa bera izaten da nonahi",
    "ps": [
     "Azpitituluak oker ateratzen direnean denboraldi oso batean, oso gutxitan izaten du atal bakoitzak bere arazo pribatua; normalean atal guztietan eragiten duen kausa bakarra izaten da: argitalpen-talde berak enkodedatu zituen guztiak (beraz, formatua eta ur-markak bat datoz), guztiak bideo-bertsio berberera sinkronizatu ziren (beraz, desplazamenduaren norabidea eta kopurua bat datoz), edo transliterazioak banandu egin ziren denboraldian zehar.",
     "Egiaztatu bi atal lehenik —bat goiztiarra, bat berantiarra— eta ziurtatu benetan **arazo bera** dela ezer sortaka hasi aurretik. Biek bat ez badatoz, hori ezin du sortaka egiteak konpondu."
    ]
   },
   {
    "h2": "Igarobide bakarrean egin daitekeena",
    "ps": [
     "**Formatua bateratzea** da benetan igarobide bakarrean bukatzen den gauza bakarra: arrastatu SRT eta VTT fitxategi mordoa [[Sorta-bihurketa|/batch.html]] batera, hautatu helburu-formatua eta deskargatu ZIP bat. Birzenbaketa eta denbora-marken normalizazioa urrats berean gertatzen dira, eta elkarrizketa-hitz bat bera ere ez da aldatzen."
    ],
    "img": {
     "file": "batch-list",
     "alt": "Sorta-orriko fitxategi-zerrenda: seinale-kopurua fitxategi bakoitzeko, ezagutu ez direnak gorriz markatuta",
     "cap": "Formatu uniformea da igarobide bakar batean benetan bukatzen den gauza bakarra"
    }
   },
   {
    "h2": "Fitxategiz fitxategi egin behar dena",
    "ps": [
     "Hauek ez dute sarrerarik sorta-bitartekoan eta fitxategiko pasada bat behar dute — nahiz eta normalean **behin bakarrik egin behar den eta gero denboraldi osoari aplikatzen zaion** baliokide bat egon:"
    ]
   },
   {
    "h2": "Ordena egokia lortu",
    "ps": [
     "Hainbat gauza egin behar direnean, okerreko ordenak berrlanak esan nahi du. Jarraitu honako ordena hau:",
     "**Konpondu kodeketa** → **bateratu formatua** → **aldatu edukia** (ur-markak, terminologia, denbora) → **QC amaieran**. Formatuak bihurtzea kodeketa konpondu aurretik mojibake bat ematen du beste edukiontzi batean; edukia aldatzea formatuak bateratu aurretik tresnen laguntza ez-koherentearekin lan egitea da."
    ],
    "img": {
     "file": "batch-zip",
     "alt": "Paketatze-eremua: ZIP deskargatzeko botoia eta emaitzaren mezua",
     "cap": "Bateratu formatuak lehenik, aldatu edukia ondoren"
    }
   },
   {
    "h2": "Ezagutu ez diren fitxategiak kudeatzea",
    "ps": [
     "Sorta-bihurketa-prozesuan ezezagun gisa markatutako fitxategiak ZIPtik kanpo geratzen dira eta zerrendan jarraitzen dute. Ohiko hiru arrazoi: ez da azpititulu-fitxategi bat (irakurri-nazazu fitxategi bat), kodeketa ez da UTF-8, edo edukia bloke bakar batean laututa dago denbora-markarik gabe.",
     "Kodeketa-arazoak [[Mojibake-konponketa|/repair.html]] bidera bidaltzen dira banaka; formatu-arazoak [[Formatuz aldatzailea|/convert.html]] bidera zerrendara itzuli aurretik. **Ez behartu fitxategi ezezagunak artxiboan sartzea zenbakia soilik igotzeko** — zure erreproduzitzailean falta den atal bat aurkitzeak honek aurrezten duen minutua baino askoz gehiago balio du."
    ]
   },
   {
    "h2": "Erlazionatutako tresnak eta gidak",
    "ps": [
     "Sorta-argibide osoa — [[Nola bihurtu azpitituluak sorta-sorta|/guides/batch.html]]; denbora-desplazamendu uniformeak — [[Nola doitu azpitituluen denbora|/guides/shift.html]]; azken pasada bat banatu aurretik — [[Azpitituluen QC|/qc.html]]."
    ]
   }
  ]
 },
 "bilingual": {
  "seo": {
   "title": "Nola zatitu edo batu azpititulu bikoiztuak – AI-SRTSub",
   "desc": "Azpititulu bikoiztuak banatzeko lau modu: pista bakarra mantendu, bi fitxategitan banatu, edo bi lerroko sarrera bakarrean batu. Nabigatzailean bertan.",
   "h1": "Nola zatitu azpititulu bikoiztuak",
   "intro": "Azpititulu bikoiztuak banatu, batu edo pista bakarra mantendu nahi duzu? Gida honek lau moduak azaltzen ditu: detekzioak nola funtzionatzen duen, zein modu aukeratu eta esportatzean zer lortzen duzun.",
   "ctaText": "Ireki azpititulu bikoiztuen zatitzailea"
  },
  "body": [
   {
    "h2": "Zertarako balio du tresna honek?",
    "ps": [
     "Azpititulu bikoiztuak dituzu eta pista bakarra nahi duzu —edo alderantziz, bi pistak zatitu edo batu nahi dituzu:"
    ]
   },
   {
    "h2": "Eduki bikoiztua nola hautematen duen",
    "ps": [
     "Pista bikoitzeko azpitituluak bi modutakoak izan ohi dira, eta tresnak bakoitza ezagutzen du —**hizkuntza asmatu gabe**: **A forma (sarrera bat, bi lerro)** idazkera-sistemaren arabera banatzen ditu pistak —kana, hangul, hanzi, latina eta beste sistema batzuk, guztira hamar; bi sistema ezberdinek bikoiztua dela esan nahi dute, eta lehenengo agertzen dena da jatorrizkoa. Sistema bakarra (bitan banatutako txinatar lerro luze bat, adibidez) monoklisa gisa hartzen da eta bere horretan mantentzen da. **B forma (denbora-marka berbera duten bi sarrera bereiz)** kokapenaren arabera banatzen ditu pistak; denbora-marka berean dauden bi sarrerek bikote bat osatzen dute, lehenengoa jatorrizkotzat hartzen da, eta alfabeto latinoa partekatzen duten konbinazioak, ingelesa eta frantsesa edo ingelesa eta alemana bezalakoak, behar bezala bereizten dira. Eduki bikoizturik hautematen ez denean, modu-hautatzailea eta Hasi botoia grisatuta geratzen dira ohar argi batekin, emaitza okerretan ez zatitzeko."
    ]
   },
   {
    "h2": "Lau moduak",
    "ps": [
     "Aukeratu lauetako bat “Zein nahi duzu?” goitibeherako menutik: **Mantendu jatorrizkoa soilik** eta **Mantendu itzulpena soilik** aukera bakoitzak fitxategi bat sortzen du; **Zatitu bitan** aukerak jatorrizko fitxategi bat eta itzulpen fitxategi bat sortzen ditu, eta fitxategi-izenak automatikoki etiketatzen dira `.orig` / `.dst` gainidazketak ekiditeko; **Batu bi lerroko sarrera bakarrean** aukerak bikote bakoitza sarrera bikoiztu bihurtzen du —jatorrizkoa lerro batean, itzulpena bestean—, bikote monoklisoak bere horretan mantentzen diren bitartean eta bigarren lerrorik asmatu gabe. Moduak edo irteera-formatuak aldatzen dituzunean, lehendik dagoen edukia automatikoki exekutatzen da berriro —ez da Hasi berriro sakatu beharrik."
    ],
    "img": {
     "file": "bilingual-modes",
     "alt": "Modu-hautaketa azpititulu bikoiztuen zatitzailean: mantendu jatorrizkoa, mantendu itzulpena, zatitu bitan, batu bi lerroko sarrera bakarrean",
     "cap": "Lau modu: pista bat mantendu, bitan zatitu, edo bi lerroko sarrera batean batu"
    }
   },
   {
    "h2": "Sarrera eta Irteera",
    "ps": [
     "Zazpi formatu irakurtzen ditu —SRT, VTT, ASS, SSA, SBV, LRC, TXT (fitxategi-luzapena lehenstsi, eduki-detekzioa ordezko gisa)— eta lau esportatzen ditu: SRT, VTT, ASS, TXT. Sarrera eta irteera konbinazioak balio du, beraz, formatuen arteko bihurketa bidean gertatzen da. ASS formatuko `\\N` lerro-jauziak benetako lerro-jauzi bihurtzen dira berriro, eta efektu-etiketak ezabatzen dira beste formatu batera esportatzean."
    ]
   },
   {
    "h2": "Emaitzak eta Esportazioa",
    "ps": [
     "Emaitzak osorik agertzen dira irakurtzeko soilik den testu-koadro batean, fitxategi bakoitza sarrera-kopuruarekin eta iraupen osoaren estatistikekin; Deskargatu eta Kopiatu botoiek fitxategia zuzenean eramaten dute. Emaitzen eremua aurrebista bat da —hemen ez da testurik edo denbora-markarik editatzen. Aldaketak egiteko, esportatu lehenbizi eta erabili dagokion tresna gero."
    ],
    "img": {
     "file": "bilingual-result",
     "alt": "Emaitzen eremua: irakurtzeko soilik den aurrebista, sarrera-kopuruaren estatistikak eta deskargatu/kopiatu botoiak",
     "cap": "Testu osoko aurrebista + sarrera eta iraupen estatistikak + deskargatu eta kopiatu"
    }
   },
   {
    "h2": "Ohiko galderak",
    "ps": [
     "**Sarrera batean ingelesa agertzen da lerro batean eta frantsesa bestean — zergatik ez du zatitzen?** A formak idazkera-sistemaren arabera banatzen ditu pistak, beraz, sarrera bakar batean sistema bakarra partekatzen duten bi hizkuntza ezin dira bereizi. B forma gisa egituratu (denbora-lerro bereko bi sarrera) eta kokapenean oinarritutako zatiketak funtzionatuko du.",
     "**Fitxategi bakarra deskargan?** “Mantendu jatorrizkoa soilik”, “Mantendu itzulpena soilik” eta “Batu bi lerroko sarrera bakarrean” aukerek fitxategi bakarra sortzen dute diseinuz; “Zatitu bitan” aukerak bakarrik ematen dizkizu bi, `.orig` / `.dst` etiketadunak.",
     "**Pilako prozesamendua egin dezaket?** Fitxategi bat aldi berean; ilarak ez dira onartzen.",
     "**Nire azpitituluak igotzen ditu?** Ez — analisia eta esportazioa zure nabigatzailean bakarrik exekutatzen dira."
    ]
   },
   {
    "h2": "Lotutako gidak",
    "ps": [
     "Bi pista azkar zatitzeko, ikusi [[Azpititulu Bikoiztuak Bi Pistatan Zatitzea|/guides/split-bilingual-subtitles.html]]; azpititulu bikoiztuak nola egiten diren jakiteko, ikusi [[Azpititulu Bikoiztuak Egiteko Bi Modu|/guides/make-bilingual-subtitles.html]]; eta itzulpen automatikorako, erabili [[AI Azpitituluen Itzulpena|/translate.html]]."
    ]
   }
  ]
 },
 "clean": {
  "seo": {
   "title": "Azpititulu garbitzailea – kendu ur-markak, iragarkiak, SDH – AI-SRTSub",
   "desc": "Azpititulu garbitzailea: 13 arauk ur-markak, iragarkiak, SDH oharrak, HTML etiketak eta bikoiztuak kentzen dituzte; aldaketa bakoitzak diferentzia du eta desegin daiteke. SRT/VTT/ASS, dena nabigatzailean.",
   "h1": "Nola erabili azpititulu garbitzailea",
   "intro": "Webetik deskargatutako azpitituluek askotan ur-markak, iragarkiak eta SDH oharrak izaten dituzte. Garbitzaileak 13 arau aplikatzen ditu aldi berean, eta aldaketa bakoitza ikusgai eta itzulgarria da.",
   "ctaText": "Ireki azpititulu garbitzailea"
  },
  "body": [
   {
    "h2": "Zer egiten du tresna honek?",
    "ps": [
     "Deskargatutako azpititulu-fitxategiek askotan eduki desegokia izaten dute. Garbitzaileak arauetan oinarritutako urrats batean kentzen ditu:"
    ]
   },
   {
    "h2": "Kargatu eta detektatu",
    "ps": [
     "Arrastatu fitxategi bat edo sakatu kargatzeko —SRT, VTT, ASS, SSA eta TXT onartzen dira— edo itsatsi azpitituluen testua zuzenean. Kodeketa automatikoki antzematen da: UTF-8 dekodetzeak ordezkapen-karaktereak sortzen baditu, GBK edo Big5-ra itzultzen da, eta orrialdeak \"Kodeketa honela konponduta: {encoding}\" erakusten du. Pista bikoitzeko azpititulu bikoiztuak kargatzen badituzu (bi denbora-lerro berdin, txinatar bat eta ingeles bat), pista bikoitz bakar batean batzen dira \"jatorrizkoa goian / itzulpena goian\" aukerarekin."
    ]
   },
   {
    "h2": "13 arauak konfiguratzen",
    "ps": [
     "Interfazeak 13 aukera-lauki dituzten lau talde ditu: **Etiketak eta formatua** (ASS efektuak, HTML etiketak, kontrol-karaktereak, berrordenatu ordenatu ondoren), **SDH eta soinu-efektuak** (SDH oharrak, hizlarien etiketak, musika-lerro hutsak), **Ur-markak eta zabor-sarrerak** (ur-markak eta iragarkiak, sarrera bikoiztuak, sarrera hutsak), **Testu-konponketak** (puntuazioa eta tartekatzea, maiuskulen konponketa, lerro laburrak batzea). \"Galdu ezinezkoak eta seguruak\" direnak bakarrik daude aktibatuta lehenespenez; edukia gal dezaketenak (musika-lerroak, maiuskulen konponketa, lerro laburrak batzea) desaktibatuta daude — markatu behar direnean. Elementu bakoitzak ⓘ argibide bat du, eta aukera-lauki bat aldatzean berehala exekutatzen da berriro."
    ],
    "img": {
     "file": "clean-opts",
     "alt": "Garbitzeko aukeren interfazea: 13 aukera-laukitako lau talde, aktibo daudenak goian erakutsita",
     "cap": "Lau talde, 13 arau; galerarik ez dutenak bakarrik lehenespenez, aldaketak berehala aplikatzen dira"
    }
   },
   {
    "h2": "Aldaketen diferentzia eta desegitea",
    "ps": [
     "Emaitzak ez dira zuzenean gainidazten: aldaketa bakoitza diferentzia-taula batean zerrendatzen da arauaren etiketarekin (sarrera hau zergatik editatu edo ezabatu den). Bat berreskuratu nahi duzu? Egin klik \"Berreskuratu\" aukeran errenkada horretan; \"Berreskuratu guztiak\" aukerak dena itzultzen du klik bakar batean, eta berriro klik eginez gero garbiketa osoa berriro aplikatzen da. Estatistika-barrak jatorrizkoaren, garbituaren, ezabatuaren, aldatuaren eta berreskuratuaren kopuruak erakusten ditu."
    ],
    "img": {
     "file": "clean-diff",
     "alt": "Aldaketen diferentzia-taula: indizea, denbora, jatorrizko testua eta garbitua alderatuta, arau-etiketa errenkada bakoitzean",
     "cap": "Aldaketa bakoitzak arau-etiketa bat darama; berreskuratu errenkada bakarrak edo denak batera"
    }
   },
   {
    "h2": "Aurrebista eta esportazioa",
    "ps": [
     "Txandakatu \"Garbitua / Jatorrizkoa\" bista batzuen artean. Jatorrizko bistan, ezabatutako sarrerak marratuta eta \"Ezabatuta\" gisa markatuta daude, eta esportatutako fitxategiak aurrebistarekin bat egiten du zehatz-mehatz. Esportazio-formatuak: SRT (lehenetsia), VTT, ASS (iturria ASS denean eskuragarri, estiloaren atala dagoen bezala mantenduz), eta denbora-lerrorik gabeko TXT testu soila. Fitxategi-izenak `.clean` marka bat jasotzen du automatikoki."
    ],
    "img": {
     "file": "clean-preview",
     "alt": "Testu osoko aurrebista: bista garbituak eta jatorrizkoak, kopuruak erakusten dituen estatistika-barra batekin",
     "cap": "Bi aurrebista bista, ikusten duzuna lortzen duzuna da"
    }
   },
   {
    "h2": "Ohiko galderak",
    "ps": [
     "**Elkarrizketa normala okerrean ezabatuko du?** Ur-marken arauak lehenik ur-marken lerroak kentzen ditu (elkarrizketa-lerroak sarrera bikoiztuen barruan mantenduz) eta arrastoak geratzen badira bakarrik ezabatzen du sarrera osoa; SDH kentzeak 40 karaktere edo gutxiago dituzten SDH gako-hitzak dituzten parentesien arteko edukiak bakarrik ukitzen ditu —parentesi arteko elkarrizketa arruntak bertan geratzen dira.",
     "**Nola bereizten dira musika-lerro hutsak elkarrizketa barruko mu-sikatik?** Lerro bakoitza ♪ musika-notaz edo [music] bezalako markaz inguratuta dagoen sarrerak bakarrik ezabatzen dira; musika duten elkarrizketak mantendu egiten dira.",
     "**Hizlarien etiketek txinatar testua jo dezakete?** Lerroaren hasieran bi puntu jarraituz dituen maiuskulazko izen alfanumeriko bat bakarrik (`GEORGE:` bezalakoa) bat dator; txinatar bi puntudun esaldiek ez dute inoiz bat egiten.",
     "**Hainbat fitxategi aldi berean garbitu ditzaket?** Ez — fitxategi bat exekuzio bakoitzeko. Deskargatu emaitza, eta ondoren kargatu hurrengoa."
    ]
   },
   {
    "h2": "Pribatutasuna",
    "ps": [
     "Garbiketa zure nabigatzailean bakarrik exekutatzen da; ez da inoiz azpitituluen edukirik bidaltzen zerbitzari batera."
    ]
   },
   {
    "h2": "Lotutako tresnak eta gidak",
    "ps": [
     "Ur-markak eta iragarkiak kentzera bideratutako gida azkar bat ikusteko, ikusi [[kendu azpitituluen iragarkiak eta ur-markak|/guides/remove-subtitle-ads.html]]; pasa ezazu fitxategia [[azpitituluen kalitate-kontrolaren|/guides/subtitle-quality-check.html]] bidez entregatu aurretik; eta formatuak aldatzeko, erabili [[formatu bihurketa|/convert.html]]."
    ]
   }
  ]
 },
 "convert": {
  "seo": {
   "title": "Azpitituluen formatuak bihurtu (SRT, VTT, ASS, SBV, LRC, TXT) – AI-SRTSub",
   "desc": "Bihurgailuaren gida bisuala: gehitu fitxategi bat, ikusi detektatutako formatua, aukeratu irteerakoa, kudeatu elebidunak eta deskargatu. Dena arakatzailean.",
   "h1": "Azpitituluen formatu-bihurgailuaren gida",
   "intro": "Gida honek orrialdea goitik behera azaltzen du: kargatu azpititulu bat, baieztatu detektatutako formatua, aukeratu irteerako formatua eta deskargatu. Dena zure arakatzailean exekutatzen da — fitxategirik ez da inoiz zure gailutik ateratzen.",
   "ctaText": "Ireki azpitituluen bihurgailua"
  },
  "body": [
   {
    "h2": "Kargatu zure azpitituluak",
    "ps": [
     "Arrastatu fitxategi bat marratutako koadrora edo egin klik bat hautatzeko; **edukia zuzenean itsatsi** dezakezu testu-koadroan. Formatua bai luzapenetik bai edukitik detektatzen da, eta emaitza formatu-etiketan agertzen da."
    ],
    "img": {
     "file": "convert-upload",
     "alt": "Igoera-eremua: SRT lagin bat kargatuta, SRT gisa detektatuta",
     "cap": "Detektatutako formatua etiketan agertzen da — begiratu hemen lehenengo zalantzarik izanez gero"
    }
   },
   {
    "h2": "Aukeratu irteerako formatua",
    "ps": [
     "Hautatu helburuko formatua goitibeherako menutik: sei aukera — srt, vtt, ass, sbv, lrc, txt. Ass formatura bihurtzean 1920×1080 estilo lehenetsi finko bat berreraikitzen da (testu zuria, ertz beltza, behean erdian) eta **ez ditu jatorrizko letra-tipoak edo koloreak mantentzen**; txt-k testua soilik esportatzen du, denborarik gabe."
    ],
    "img": {
     "file": "convert-opt",
     "alt": "Irteerako formatuaren goitibeherako menua VTT hautatuta duela",
     "cap": "Irteerako formatuak ez du sarrerakoa jarraitzen — zuk aukeratzen duzu"
    }
   },
   {
    "h2": "Eduki elebidunen kudeaketa",
    "ps": [
     "Fitxategia elebiduna bada (bi lerro cue batean, edo cue tartekatuak), diseinua dagoen bezala mantentzen da bihurketan zehar. \"Mantendu elebiduna\" aukeratzeak bi hizkuntzak goiko eta beheko lerroetan banatzen ditu, bakoitza bere aldetik berriro doituz; kontrola desaktibatu egiten da testu elebidunik detektatzen ez denean."
    ]
   },
   {
    "h2": "Bihurtu eta deskargatu",
    "ps": [
     "Sakatu \"Bihurtu\": emaitzen panelak cue kopurua eta iraupen osoa erakusten ditu, testua aztertzeko prest dagoela. Egin klik **Deskargatu** botoian fitxategia gordetzeko, edo **Kopiatu** testua zuzenean hartzeko. Bihurketak ez du inoiz denbora-baliorik aldatzen — formatua bakarrik berridazten du. Cueak berriro denboran kokatzeko, erabili [[denbora-tresna|/shift.html]]."
    ],
    "img": {
     "file": "convert-result",
     "alt": "Emaitzen panela: cue kopurua eta iraupen osoa deskargatzeko eta kopiatzeko botoiekin",
     "cap": "6 cue, 0:23 guztira — begiratu testua deskargatu aurretik"
    }
   }
  ]
 },
 "extract": {
  "seo": {
   "title": "Testu soila atera azpitituluetatik – Bi diseinu, bost garbiketa – AI-SRTSub",
   "desc": "Atera elkarrizketak azpitituluetatik testu soil garbi gisa: paragrafo jarraituak edo lerro bat cue bakoitzeko, eta SDH cueek, ur-markek, bikoiztuek, aurrizkiek eta letrek kentzen dutena.",
   "h1": "Nola atera testu soila azpitituluetatik",
   "intro": "Atera elkarrizketa azpititulu-fitxategi batetik testu soil garbi gisa: cue-zenbakiak, denbora-lerroak eta estilo-etiketak automatikoki kentzen dira, emaitza artikulu gisa irakur dadin edo elkarrizketa-zerrenda gisa balio dezan.",
   "ctaText": "Ireki testu soil ateratzailea"
  },
  "body": [
   {
    "h2": "Zer egiten du tresna honek",
    "ps": [
     "Azpititulu-fitxategi bateko elkarrizketa besterik ez zaio axola irakurleari; gainerakoa erreproduzitzailearentzako egitura da — cue-zenbakiak, denbora-lerroak, estilo-etiketak. Orrialde honek egitura kentzen du eta hitzak mantentzen ditu."
    ]
   },
   {
    "h2": "Jarri barruan, ez soilik igo",
    "ps": [
     "Ezkerreko «1 Gehitu azpitituluak» zutabeak igotako fitxategi bat onartzen du, eta azpitituluen edukia zuzenean ere itsatsi dezakezu testu-koadroan. Okerreko fitxategia aukeratu baduzu, egin klik «Garbitu» aukeran eta hasi berriro.",
     "Orrialde honek fitxategiak UTF-8 gisa irakurtzen ditu. Azpitituluak galdera-marka edo koadro horma gisa irekitzen badira, kodifikazioa hautsita dago — bihurtu UTF-8ra [[Kodeketa-konponketa|/repair.html]] erabiliz lehenbizi, eta gero itzuli hona."
    ],
    "img": {
     "file": "extract-up",
     "alt": "Testu soil ateratzailearen azpitituluak gehitzeko eremua",
     "cap": "Igo fitxategi bat, edo itsatsi azpitituluen edukia zuzenean testu-koadroan"
    }
   },
   {
    "h2": "Bi diseinuen artean aukeratzea",
    "ps": [
     "«2 Erauzketa-aukerak» atalaren goialdean diseinua dago: **Paragrafo jarraituak** aukerak testua etenetan eta esaldi-amaierako puntuazioan mozten du artikulu baten antzera irakur dadin; **Lerro bat cue bakoitzeko** aukerak azpititulu sarrera bakoitzeko lerro bat ematen du, jatorrizko fitxategiko sarrerekin bat etorriz banan-banan.",
     "Elkarrizketa oharretarako kopiatzeak, itzulpena lantzeak edo prose gisa irakurtzeak paragrafo jarraituak eskatzen ditu; elkarrizketa-orri bat eraikitzeak, jatorrizkoarekin lerroz lerro konparatzeak edo beste tresna bati elikatzeak cue bakoitzeko lerro bat eskatzen du."
    ],
    "img": {
     "file": "extract-opt",
     "alt": "Diseinua eta garbiketa-etengailuak erauzketa-aukeren azpian",
     "cap": "Aukeratu diseinu bat; beheko bost etengailuek zein eduki mota kentzen den erabakitzen dute"
    }
   },
   {
    "h2": "Bost garbiketa bakoitzak zer kentzen duen",
    "ps": [
     "**Kendu SDH cueak**: parentarteko soinu-deskribapenak ezabatzen ditu, hala nola \"(urratsak)\" edo \"[musika]\", eta elkarrizketa mantentzen du.",
     "**Kendu ur-markak eta iragarkiak**: zaleen azpitituluen kredituak, URLak eta kanal-izenak bezalako lerroak kentzen ditu.",
     "**Kendu aldameneko bikoiztuak**: esaldi bera bi aldiz segidan agertzen denean (erreprodukzio akats bat) kopia bakarra mantentzen da; urrunago dauden bikoiztuek esanahia dute eta bere horretan uzten dira.",
     "**Kendu hizlarien aurrizkiak**: \"JOHN: Kaixo\" testua \"Kaixo\" bihurtzen da. Desaktibatuta lehenespenez — gidoi estiloetako testuak nork hitz egiten duen erakutsi behar du.",
     "**Saltatu abesti-lerroak**: erabat \"♪ … ♪\" diren lerroak saltatu egiten dira. Desaktibatuta lehenespenez — letrak ere hitzak dira."
    ],
    "img": {
     "file": "extract-clean",
     "alt": "Bost garbiketa-etengailuak eta haien deskribapenak erauzketa-aukeren azpian",
     "cap": "Etengailu bakoitzak zer kentzen duen adierazten du bere eskuinean; markatu behar dituzunak"
    }
   },
   {
    "h2": "Emaitza eramatea",
    "ps": [
     "Eskumako «3 Emaitza» zutabeak ateratako testua zuzenean erakusten du eta aukera bat aldatu bezain laster berrakurtzen du.",
     "Konforme zaudenean, egin klik «Deskargatu» botoian .txt bat gordetzeko edo «Kopiatu» botoian testua zurekin eramateko. Hitzen artean zuriunerik uzten ez duten hizkuntzetarako, hala nola txinera eta japoniera, lerro-elkarketak arau desberdinak jarraitzen ditu, eta tresnak hizkuntzaren arabera kudeatzen du hori automatikoki."
    ],
    "img": {
     "file": "extract-out",
     "alt": "Emaitza-eremua deskargatzeko eta kopiatzeko botoiekin",
     "cap": "Emaitza zuzenean eguneratzen da; deskargatu .txt gisa edo kopiatu zuzenean"
    }
   },
   {
    "h2": "Ukitu gabe uzten dena",
    "ps": [
     "Elkarrizketa bera ez da berriidazten. Garbiketa-etengailuek zein lerro edo bloke oso kentzen diren bakarrik erabakitzen dute; ez dute inoiz sarrera baten idazkera aldatzen.",
     "Denbora-lerroak eta cue-zenbakiak ez dira ateratzen soilik, ez dira aldatzen eta gero ateratzen — jatorrizko fitxategia ukitu gabe geratzen da, eta orrialde honek ez du denbora-lerroak dituen esportaziorik eskaintzen. Lan hori [[Formatuen bihurketa|/convert.html]] tresnarena da."
    ]
   },
   {
    "h2": "Ohiko galderak",
    "ps": [
     "**ASS estilo-etiketek testuan jarraitzen al dute?** Ez. ASS `{}` gainidazketa-blokeak kendu egiten dira eta elkarrizketa bakarrik geratzen da.",
     "**Fitxategi elebidun bat bi lerro gisa ala bat gisa ateratzen da?** Sarrerak zituen lerro adina; orrialde honek ez ditu batzen eta ez ditu banatzen — bereizteko, erabili [[Zatiketa elebiduna|/bilingual.html]].",
     "**Zergatik mantentzen dira hizlarien aurrizkiak lehenespenez?** \"JOHN: Kaixo\" testuko izena informazio erabilgarria izan ohi da maiz (gidoiak, elkarrizketa-orriak), eta kentzeak zaila egiten du jakitea nor ari den hitz egiten, beraz, aukera zure esku uzten da.",
     "**LRC abesti-fitxategiak ere atera daitezke?** Bai. LRC denbora-etiketak kendu egiten dira eta abesti-lerroak geratzen dira; abestirik nahi ez baduzu, markatu \"Saltatu abesti-lerroak\"."
    ]
   },
   {
    "h2": "Pribatutasuna",
    "ps": [
     "Azpitituluak arakatzailean bakarrik prozesatzen dira: ez da ezer igotzen eta ez da ezer zerbitzari batetik pasatzen. Testua uneko orrialdean bakarrik geratzen da eta freskatzean garbitu egiten da."
    ]
   },
   {
    "h2": "Lotutako tresnak eta gidak",
    "ps": [
     "Azpititulu-fitxategi batek zer daukan benetan ulertzeko, ikusi [[Zer dago SRT fitxategi baten barruan|/guides/srt-file-format.html]]; ateratako elkarrizketa itzultzeko, joan hona: [[Azpitituluen itzulpena|/translate.html]]; taula bihurtzeko, erabili [[Azpitituluak Excel/CSV formatura|/guides/srt-to-excel.html]]; eta exekutatu [[Azpitituluen kalitate-kontrola|/qc.html]] edozer eman aurretik."
    ]
   }
  ]
 },
 "extract-subtitles-from-video": {
  "seo": {
   "title": "Azpitituluak bideo batetik ateratzea – Kapsulatutakoak ala kanpokoak – AI-SRTSub",
   "desc": "Zer daraman MKV / WebM / MP4 / MOV bakoitzak, testu, ASS, WebVTT eta mov_text pistak nola desberdintzen diren, zergatik irudi-azpitituluek (PGS / DVD) ez duten testurik, eta zer egin ateratzean.",
   "h1": "Azpitituluak bideo batetik ateratzea",
   "intro": "Azpitituluak bideo-fitxategi baten barruan egon daitezke edo hari kanpotik lotuta egon daitezke. Barruan, edukiontziko pista bat dira; haiek ateratzeak ez dauka zerikusirik transkodetzearekin.",
   "ctaText": "Ireki bideo-azpitituluen erauzketa"
  },
  "body": [
   {
    "h2": "Non bizi diren azpitituluak: kapsulatutakoak eta kanpokoak",
    "ps": [
     "Bideo-fitxategi bat (MKV, MP4) bideo-pista bat, audio-pista bat eta azpititulu-pista batzuk aldi berean edukitzen dituen edukiontzi bat da. Barruan zigilatuta dauden azpitituluak **kapsulatutakoak** dira; kanpoan dagoen .srt / .ass fitxategi bereizia **kanpokoa** da, eta kapsulatutako pista bati **muxeatutakoa** ere deitzen zaio.",
     "Kanpoko azpitituluak dauden bezala erabil daitezke. Arazoa kapsulatutakoekin dator: editatzeko, itzultzeko edo jatorrizko fitxategitik abiatuta pista elebidun bat sortzeko, ez daukazu azpititulu-fitxategirik eskura — lehenik eta behin pista edukiontziatik irakurri behar duzu. Urrats hau ez da transkodetzea: bideoa ez da berriro kodetzen, edukiontziari dagoeneko gordeta dituen datuak bakarrik irakurtzen zaizkio."
    ]
   },
   {
    "h2": "Edukiontzi bakoitzak zer daraman",
    "ps": [
     "Edukiontzi desberdinek azpititulu-formatu desberdinak daramatzate, eta ateratzeko zailtasuna ere aldatu egiten da:"
    ],
    "img": {
     "file": "videosub-which",
     "alt": "Kapsulatutako azpitituluen erauzketa-orriak zerrendatutako azpititulu-pistak",
     "cap": "Pista bat errenkadako, normalean hizkuntza eta pista-izen batekin; bakarra dagoenean automatikoki ateratzen da"
    }
   },
   {
    "h2": "Zergatik ezin diren irudi-azpitituluak atera",
    "ps": [
     "Blu-ray PGS eta DVD azpitituluek ez dute karaktererik gordetzen, alfa kanala duen irudi sorta bat baizik. Erreproduzitzaile batek erakusten dituenean, irudi bat itsasten ari da, ez testua errendatzen.",
     "Beraz, pista horretan ez dago irakurtzeko testurik — ez da tresnak onartzen ez duelako, ez dagoelako inolako karaktererik. Orrialdeak argi eta garbi esaten du horrelako batekin topo egiten duenean.",
     "Hitzak lortzeko modu bakarra irudi horietako karaktereak lehenik ezagutzea da (OCR) eta horretatik abiatuta azpitituluak sortzea. Hori pista bat ateratzetik bereizitako prozesu bat da."
    ]
   },
   {
    "h2": "Ateratzearen ondoren ohi datorrena",
    "ps": [
     "Ateratzen dena zegoen bezalako pista da: tresnak ez du kodifikaziorik asmatzen eta ez ditu denbora-lerroak zuzentzen. Beraz, bi gauza sortzen dira maiz:",
     "Bata **testu hondatua** da — jatorrizko pistan arazo bat dago kodifikazioarekin eta hondatuta ateratzen da baita ere; joan hona: [[Nola konpondu testu hondatua|/guides/repair.html]] kodifikazioa identifikatzeko. Bestea **gaizki egokitutako denbora** da — jatorrizkoak sarrerako logotipo bat duelako ala fotograma-abiadurak bat ez datozelako, emaitza oro har desbideratuta geratzen da; erabili [[Denbora-lerroaren doikuntza|/shift.html]] hura desplazatzeko edo eskalatzeko.",
     "Horren ostean, itzultzeko, joan hona: [[Azpitituluen itzulpena|/translate.html]], eta elebidun egiteko, ikusi hemen: [[Azpititulu elebidunak egiteko bi modu|/guides/make-bilingual-subtitles.html]]."
    ],
    "img": {
     "file": "videosub-formats",
     "alt": "Emaitzaren eremua SRT / VTT / ASS / TXT esportazio-formatuekin",
     "cap": "Ateratako azpitituluak lau formatutan esporta daitezke; ASS jatorrizko batek bere estilo-goiburua eta bereizmena mantentzen ditu"
    }
   },
   {
    "h2": "Gaizki ulertzeko errazak diren zenbait kontu",
    "ps": [
     "**Azpitituluak ateratzea ez datza horiek bideoan txertatzean.** Bideoa ez da berriro kodetzen, beraz, irudiaren kalitateari eta audioari ez die eragiten.",
     "**Ateratzeak ez dio jatorrizko fitxategiari eragiten.** Irakurtzeko soilik, inoiz idatzi gabe, eta bideoaren byte bakarra ere ez da aldatzen.",
     "**Fitxategi handi bat motela izatea ez da konexio arazoa.** Tresnak pista-informazioa zati bana eskaneatzen du, eta zenbat eta handiagoa izan fitxategia, orduan eta denbora gehiago behar du; hori guztia lokalean gertatzen da.",
     "**Kanpoko azpitituluek ez dute orrialde hau behar.** .srt / .ass fitxategi bat baduzu, joan zuzenean hona: [[Formatuen bihurketa|/convert.html]]; bideo baten barruan zigilatuta dauden azpitituluek bakarrik behar dute aurretik erauzketa bat."
    ]
   },
   {
    "h2": "Lotutako tresnak eta gidak",
    "ps": [
     "Gida osoa ikusteko, ikusi hemen: [[Nola atera bideo batean kapsulatutako azpitituluak|/guides/videosub.html]]; ateratzen duzuna itzultzeko, joan hona: [[Azpitituluen itzulpena|/translate.html]], elebidun egiteko, ikusi hemen: [[Azpititulu elebidunak egiteko bi modu|/guides/make-bilingual-subtitles.html]]; testu hondatuetarako, hasi hemen: [[Testu hondatuen konponketa|/repair.html]]."
    ]
   }
  ]
 },
 "fps-23-976-vs-25": {
  "seo": {
   "title": "Zer diote benetan 23.976 / 24 / 25 / 30 fps-ek – Azpitituluen denbora – AI-SRTSub",
   "desc": "23.976 ez da 24 eta 29.97 ez da 30 — galdutako % 0,1a NTSC koloretik dator, PALek filmak % 4 azkarrago exekutatzen dituen bitartean. Nola aldatzen dituzten hauek azpitituluen denborak, eta nola bihurtu haien artean.",
   "h1": "Zer diote benetan 23.976 / 24 / 25 / 30 fps-ek",
   "intro": "23.976 eta 24ren arteko % 0,1eko aldea telebistaren historiako ondare bat da. PAL sistemaren % 4rekin batera, filma aurrera joan ahala azpitituluak sinkronizaziotik gero eta gehiago urruntzearen arrazoia da hori.",
   "ctaText": "Ireki denbora-doikuntza"
  },
  "body": [
   {
    "h2": "Zenbaki bakoitza zer den",
    "ps": [
     "Fotograma-abiadura segundu batean zenbat irudi erakusten diren da. Gehien ikusten dituzun lauak:"
    ]
   },
   {
    "h2": "% 0,1a nondik datorren",
    "ps": [
     "23.976 = 24 × 1000/1001 da, eta 29.97 = 30 × 1000/1001. 1000/1001 hori NTSCri kolorea gehitzearen ondarea da: kolorearen azpipertsona sartzeko, lehendik zeuden zuri-beltzeko hartzaileak apurtu gabe, eremu-abiadura 60 Hz-tik 59.94 Hz-ra jaitsi zen (60 × 1000/1001), eta fotograma-abiadura berarekin batera jaitsi zen.",
     "Emaitza: filmak 23.976-n emititzen dira NTSC eskualdeetan 24 izan beharrean. Aldaketa % 0,1ekoa da, hau da, 3.6 segundo ordu batean — ia nabarmena bere aldetik, baina ez nahasi beheko % 4koarekin eta inoiz ez konbinatu biak kalkulu bakarrean."
    ]
   },
   {
    "h2": "% 4a nondik datorren",
    "ps": [
     "PAL eskualdeetan 25 fps-tan proiektatzen da. Filmak 24 fps-tan filmatzen dira eta besterik gabe 25-tan erreproduzitzen dira — fotograma bakar bat ere ez da gehitzen edo kentzen, beraz, erreprodukzioa % 4 azkarrago doa (25/24 ≈ 1.0417). 100 minutuko film batek 96 minutu irauten du bere PAL bertsioan.",
     "Hori da **noraez progresiboaren** jatorria: jatorrizkoaren eta bideoaren arabera egindako azpitituluak PAL bertsioan zehatz-mehatz bat datoz hasieran eta lau minuturen aldea dute kredituetarako. Mugimendu global bakar batek ezin du hori salbatu; ratioaren arabera berrskalatu behar da."
    ],
    "img": {
     "file": "shift-step-rate",
     "alt": "Denbora-orriaren abiadura atala: ratioa sartzeko koadroa",
     "cap": "Berrskalatu ratioaren arabera — balio bakar batek film osoa hartzen du"
    }
   },
   {
    "h2": "Nola bihurtu",
    "ps": [
     "Bihurtzea film osoan aplikatzen den ratio bakar batez biderkatzea da:"
    ]
   },
   {
    "h2": "Zein daukazun antzematea",
    "ps": [
     "Ratioa asmatu beharrean, aurkitu denbora zuzena ziurtzat jotzen duzun bi une — normalean elkarrizketako lehen eta azken lerroak — eta esan tresinari \"lerro hau 00:00:12an egon behar da eta bestea 01:35:40an\"; film osoa linealki luzatzen du bi puntu horien artean. Hori \"bi puntuko ainguraketa\" da, eta ez du zure aldetik fotograma-abiaduraren aritmetikarik behar.",
     "Fotograma-abiadura zuk zeuk baieztatzeko, egiaztatu zure erreproduzitzailea edo multimedia-informazioaren tresna bat. `1080p.WEB` bezalako fitxategi-izen batek fotograma-abiaduraren arrastorik ez duenean, bi puntuko ainguraketa da bide seguruena."
    ],
    "img": {
     "file": "shift-step-two",
     "alt": "Denbora-orriaren bi puntuko ainguraren atala: denbora-markak sartzeko bi errenkada",
     "cap": "Bi puntuko ainguraketak ez du fotograma-abiadurarik behar — bi denbora-marka soilik"
    }
   },
   {
    "h2": "Lotutako tresnak eta gidak",
    "ps": [
     "Fotograma-abiaduraren bihurketa bera — [[Azpitituluen fotograma-abiaduraren bihurketa|/guides/srt-fps-converter.html]]; abiadura doikuntza — [[Azpitituluen abiaduraren bihurketa|/guides/subtitle-speed-converter.html]]; desplazamendu globala ala noraez progresiboa den ziur ez egonez gero — [[Azpitituluak sinkronizaziotik gero eta gehiago urruntzen ari dira|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "glossary": {
  "seo": {
   "title": "Terminoen ordezkapen sorta azpitituluen artean – Taula bakar batek fitxategi bat konpontzen du – AI-SRTSub",
   "desc": "Arau bat lerroko, -> , => , → edo Tab bidez bereizita, iruzkinetarako #-ekin. Hitz osoko bat-etorria, maiuskula/minuskula bereizketa, cue elebidunaren lehen edo bigarren lerroa, aldaketa bakoitza zerrendatuta eta desegin daitekeena.",
   "h1": "Nola ordezkatu terminoak sortan azpitituluetan",
   "intro": "Termino-taula bakar batek azpititulu-fitxategi oso baten idazkera koherente bihurtzen du aldi berean — denbora-lerroak, ASS estiloak eta VTT NOTE blokeak ez ditu karaktere bakar batek ere ukitzen.",
   "ctaText": "Ireki terminoen ordezkapen sortua"
  },
  "body": [
   {
    "h2": "Zer egiten du tresna honek",
    "ps": [
     "Modu desberdinetan itzulitako hitz bera, itzulpen automatikoarekin noraezean dabiltzan izenak eta lekuak, zure konbentzioekin bat etorri behar duten beste norbaiten azpitituluak — horiek guztiek ezaugarri komun bat dute: aldatzen dena hitza da, ez egitura. Orrialde honek hitzak bakarrik aldatzen ditu."
    ]
   },
   {
    "h2": "Bi sarrera: azpitituluak eta terminoen taula",
    "ps": [
     "Ezkerreko «1 Gehitu azpitituluak» zutabeak azpititulu-fitxategi bat onartzen du, edo edukia zuzenean itsatsi dezakezu; okerreko fitxategia aukeratu baduzu, egin klik «Garbitu» aukeran.",
     "Eskumako «2 Terminoen taula» zutabeak arauak gordetzen ditu. **Arau bat lerroko**, termino zaharra eta termino berria `->` , `=>` , `→` edo Tab bidez bereizita — laurak balio dute. `#` ikurrarekin hasten diren lerroak iruzkinak dira eta ez dute parte hartzen ordezkapenean.",
     "Formatuarekin ziur ez zaudenean, egin klik \"Bete adibide bat\" aukeran eta editatu hori."
    ],
    "img": {
     "file": "glossary-up",
     "alt": "Terminoen ordezkapen orrialdearen azpitituluak gehitzeko eremua eta termino-taularen sarrera",
     "cap": "Azpitituluak ezkerrean, arauak eskuinean; arau bat lerroko, termino zaharra eta berria -> bidez bereizita"
    }
   },
   {
    "h2": "Nola idatzi terminoen taula",
    "ps": [
     "Arau bat lerroko: uneko termino eta ezkerrean, eskuinean zer bihurtu behar den. Adibidez, `Thor -> Donar` aukerak fitxategiko \"Thor\" guztiak \"Donar\" bihurtzen ditu.",
     "Iruzkinak `#` ikurrarekin hasten dira eta oso erabilgarriak dira arau-talde bat etiketatzeko (adibidez, \"# 1. denboraldiaren izenen konponketak\"), eta arau bat behin-behinean desaktibatzeko — jarri `#` bat aurrean ezabatu beharrean.",
     "Arauak goitik behera exekutatzen dira; arau batek sortutako testua beheragoko arauek berriro aztertzen dute. Ordenak axola duenean (esaterako, lehenik A B-rekin ordezkatu eta gero B C-rekin), gogoan izan hori."
    ],
    "img": {
     "file": "glossary-table",
     "alt": "Ordezkapen-arauen lerro eta lerro gehiago termino-taularen sarreran",
     "cap": "Arau bat lerroko; #-ekin hasten diren lerroak iruzkinak dira eta arau bat behin-behinean desaktiba dezakete"
    }
   },
   {
    "h2": "Hiru etengailuek zer egiten duten",
    "ps": [
     "**Eremua**: `guztia` / `lehen lerroa soilik` / `bigarren lerroa soilik`. Fitxategi elebidun batean, hautatu \"bigarren lerroa soilik\" itzulpena bakarrik aldatu nahi duzunean; lerro bakarra duten sarrerek ukitu gabe jarraitzen dute lerro bakarreko bi ezarpenetan — tresnak ez du asmatzen zein alde den jatorrizkoa.",
     "**Hitz osoa**: hitz gisa bakarrik dauden terminoak bakarrik ordezkatzen ditu, beraz, `art` hitzak ez du `start` ukituko. Hitzen artean zuriunerik uzten ez duten hizkuntzatzean, hala nola txinera eta japoniera, etengailu honek ez du eraginik — ordezkapenak azpikaraktereetan funtzionatzen du hor.",
     "**Maiuskula/minuskula bereizketa**: desaktibatuta lehenespenez, beraz, `CEO` eta `ceo` biak ordezkatzen dira; markatuta dagoenean, idazkera bera dutenak bakarrik ordezkatzen dira."
    ],
    "img": {
     "file": "glossary-opt",
     "alt": "Termino-taularen azpiko eremua, hitz osokoa eta maiuskula/minuskula etengailuak",
     "cap": "Eremuak zein lerro aldatzen den erabakitzen du; hitz osoak eta maiuskulak terminoa zein zorrotz parekatzen den erabakitzen dute"
    }
   },
   {
    "h2": "Aldaketa bakoitza zerrendatuta, aldaketa bakoitza desegin daiteke",
    "ps": [
     "«3 Emaitza» atalak ordezkatutako azpitituluak erakusten ditu eta baita **aldaketa bakoitza zerrendatzen** ere: zein cue, zein lerro, zerk zer bihurtu duen.",
     "Horietako bat nahi ez baduzu, egin klik zerrendan sarrera hura bakarrik desegiteko — ez da termino-taula editatu eta berriro exekutatu beharrik. Konforme zaudenean, egin klik «Deskargatu» edo «Kopiatu» botoian."
    ],
    "img": {
     "file": "glossary-out",
     "alt": "Emaitzaren eremua banakako aldaketa-zerrendarekin",
     "cap": "Aldaketa bakoitza zerrendatuta dago; egin klik nahi ez duzun batean hura desegiteko"
    }
   },
   {
    "h2": "Ukitu gabe uzten dena",
    "ps": [
     "**Denbora-lerroak, ASS estilo-lerroak eta VTT `NOTE` blokeak ez ditu karaktere bakar batek ere ukitzen.** Ordezkapena elkarrizketa-testuari bakarrik aplikatzen zaio, inoiz ez egitura-lerroei.",
     "Terminoen taulak ez du inoiz zure azpititulu-fitxategia automatikoki aldatzen — emaitza irteera berri bat da eta jatorrizkoa dagoen bezala geratzen da."
    ]
   },
   {
    "h2": "Ohiko galderak",
    "ps": [
     "**Zergatik ez da termino bat ordezkatu?** Egiaztatu eremua lehenbizi: \"bigarren lerroa soilik\" hautatuta dagoela, lerro bakarra duten sarrerek ukitu gabe jarraitzen dute. Ondoren, egiaztatu hitz osoko bat-etorria, hitz bakarrak ez diren bat-etorriak gelditzen dituena.",
     "**Zergatik jarraitzen du txinerak azpikaraktereak ordezkatzen hitz osoko bat-etorria markatuta egonda ere?** Hori espero zen bezalakoa da. Txinera eta japonierak ez dituzte hitzak zuriunez bereizten, beraz, tresnak ezin ditu hitz-mugak zehaztu eta hitz osoko bat-etortzeak ez du eraginik han.",
     "**Nola itzul dezaket dena atzera akats baten ondoren?** Desegin sarrerak banan-banan aldaketa-zerrendan; dena hutsetik hasteko, garbitu terminoen taula eta gehitu azpitituluak berriro.",
     "**ASS estilo-lerroak nahigabe alda daitezke?** Ez. Estilo-lerroak eta `NOTE` blokeak esparrutik kanpo daude; elkarrizketa-testuak bakarrik hartzen du parte."
    ]
   },
   {
    "h2": "Pribatutasuna",
    "ps": [
     "Azpitituluak eta terminoen taula arakatzailean bakarrik prozesatzen dira: ez da ezer igotzen eta ez da ezer zerbitzari batetik pasatzen. Terminoen taula ez da gordetzen, beraz, hutsik dago orrialdea berriro irekitzen duzun hurrengo aldian."
    ]
   },
   {
    "h2": "Lotutako tresnak eta gidak",
    "ps": [
     "Terminoen taula bat nola eraiki eta bat denboraldi oso batean nola mantendu jakiteko, ikusi [[Termino-taulak: denboraldi bat koherente mantentzea|/guides/subtitle-glossary.html]]; edukia zikina bada (ur-markak, SDH cueak), exekutatu [[Azpitituluen garbiketa|/clean.html]] lehenbizi; izenak finkatuta daudenean eta beste hizkuntza batzuk behar dituzunean, joan hona: [[Azpitituluen itzulpena|/translate.html]]; eta exekutatu emaitza [[Azpitituluen kalitate-kontrola|/qc.html]] bidez."
    ]
   }
  ]
 },
 "hanconv": {
  "seo": {
   "title": "Txinatar sinplifikatuaren eta tradizionalaren arteko bihurketa – AI-SRTSub",
   "desc": "Bederatzi norabideen gida: taiwanera tokiko hiztegiarekin edo gabe, Hong Kong berezitasun gisa, eta dena sinplifikatuerako itzultzeko aukera. Elkarrizketak bakarrik aldatzen dira; denborak bere horretan geratzen dira.",
   "h1": "Nola bihurtu txinatar azpititulu sinplifikatuak eta tradizionalak",
   "intro": "Azpititulu bat Taiwanera, Hong Kongera edo kontinenteera bidaltzeak hitzak zein karaktere-formak aldatzen ditu. Bederatzi norabide aukeran, eta elkarrizketa soilik bihurtzen da: denborak, zenbakiak eta ASS estilo-lerroak ez dira inoiz ukitzen.",
   "ctaText": "Ireki bihurgailua"
  },
  "body": [
   {
    "h2": "Zer egiten du tresna honek",
    "ps": [
     "Sinplifikatuaren eta tradizionalaren arteko bihurketa ez da soilik karaktere bakoitza modu ezberdinean idaztea. Hitz sinplifikatu berberak eskualde ezberdinetan hitz ezberdinei erantzuten die — \"software\" hitza desberdina da Taiwanen eta kontinentean, eta Hong Kongek beste bertsio bat du. Bihurgailuak hauek bereizten ditu:"
    ]
   },
   {
    "h2": "Kargatzea eta detekzioa",
    "ps": [
     "Arrastatu fitxategi bat edo bilatu bat — SRT, VTT, ASS eta TXT onartzen dira — edo itsatsi azpitituluen edukia zuzenean laukian. Formatua automatikoki detektatzen da eta \"Detektatutako formatua\" testuaren ondoan agertzen da."
    ],
    "img": {
     "file": "hanconv-up",
     "alt": "Bihurgailuaren kargatze-eremua: jarezteko gunea eta itsasteko koadroa, detektatutako formatua gainean duela",
     "cap": "SRT / VTT / ASS / TXT, formatua automatikoki detektatuta"
    }
   },
   {
    "h2": "Bederatzi norabideen artean aukeratzea",
    "ps": [
     "\"Bihurtu hona\" aukeraren peko bederatzi norabideak hiru taldetan banatzen dira. **Sinplifikatua → tradizionala**: tradizional generikoa, taiwandarra (hiztegia aldatuta), taiwandarra (glifoak soilik), Hong Kongekoa. **Tradizionala → sinplifikatua**: generikoa, taiwandarretik, Hong Kongetik. **Tradizionaletik tradizionalera**: Taiwaneko formak, Hong Kongeko formak.",
     "\"Taiwaneko hiztegia\" aukeratzean, tokiko hiztegia ere aldatzen da: \"software\" hitza Taiwaneko bihurtzen da, baita \"informazioa\" ere; \"Taiwaneko glifoak\" aukerak karaktereak nola idazten diren bakarrik aldatzen du, eta zure hiztegia ukitu gabe uzten du. Hong Kong beste kasu bat da erabat, eta beste hitz bat erabiltzen du \"software\" adierazteko. Sinplifikatura itzultzeko, erabili beheko taldea — zein jatorri tradizionaletatik zatozen zehaztu behar duzu, taiwandar eta Hong Kongeko testuek bide ezberdinak hartzen dituztelako atzera egiteko."
    ],
    "img": {
     "file": "hanconv-dir",
     "alt": "Bihurtu txartela: helmugako goitibeherako menua \"Sinplifikatua → Taiwaneko tradizionala (hiztegia aldatuta)\" hautatuta duela",
     "cap": "Norabideak \"Bihurtu hona\" goitibeherako menuan daude hiru taldetan banatuta; hau hiztegi-aldaketak dituen taiwandarra da"
    }
   },
   {
    "h2": "Emaitza eta esportazioa",
    "ps": [
     "Emaitza-eremuak bihurtutako azpititulua berehala erakusten du, eta estatistika-barra batek lerro-kopuru totala eta zenbat lerro aldatu diren adierazten du. Ezer aldatu ez bada, fitxategiak agian ez duela txinatar karaktererik gogoraraziko dizun ohar bat jasoko duzu — Han karaktereak soilik bihurtzen dira; beraz, latindar edota zenbakizko azpititulu bat bere horretan geratzen da.",
     "Ondoren, deskargatu edo kopiatu. Hizkuntza-etiketa bat txertatzen da fitxategi-izenean — `demo.srt` fitxategiak `demo.zh-TW.srt` izena hartzen du Taiwaneko tradizionalerako, `.zh-Hant` tradizional generikorako, eta `.zh-Hans` sinplifikatura itzultzean."
    ],
    "img": {
     "file": "hanconv-out",
     "alt": "Eremu emaitza: azpititulu bihurtua eta estatistika-barra",
     "cap": "Estatistika-barrak lerro total eta aldatuen kopuruak erakusten ditu; deskargatu edo kopiatu hemendik"
    }
   },
   {
    "h2": "Inoiz ukitzen ez dena",
    "ps": [
     "Elkarrizketak soilik bihurtzen dira. Denborak, zenbakiak eta ASS estilo-lerroak ez dira inola ere ukitzen — emaitza erabiltzeko prest dago formatu bakar bat berrantolatu behar izan gabe."
    ]
   },
   {
    "h2": "Maiz egindako galderak",
    "ps": [
     "**Zergatik ez du bihurgailuak aldatu \"garbi\" hitza?** Zenbait kasutan esanahiaren arabera bereizten da: \"garbi\" zentzuak eta \"lehor\" zentzuak forma tradizional bera partekatzen dute, eta \"zuhaitz-enbor\" zentzuak, aldiz, beste bat erabiltzen du. Taulak OpenCC-tik datoz, karaktere bakarrak baino esaldi osoak lotuz.",
     "**Zein da Taiwaneko eta Hong Kongeko tradizionalaren arteko aldea?** Hiztegia: \"software\" hitza desberdina da bakoitzean. Aukeratu entregatu behar duzun eskualdeari dagokion norabidea.",
     "**Karaktere-kopurua aldatu egin da bihurketaren ondoren?** Han karaktereak bakarrik ordezkatzen dira — ez da sarrerarik gehiabatzen edo kentzen, eta ez da denborarik mugitzen. Lerro-kopurua aldatu bada, egiaztatu formatua behar bezala detektatu den.",
     "**Hiztegiak huts egin du kargatzean?** Orrialdeak freskatu eta berriro saiatzeko eskatzen dizu. Lokalean kargatzen da, beraz, ez dago azpitituluak inora kargatu beharrik."
    ]
   },
   {
    "h2": "Pribatutasuna",
    "ps": [
     "Bihurketa zure arakatzailean soilik exekutatzen da. Azpitituluen edukirik ez da zerbitzari batera bidaltzen."
    ]
   },
   {
    "h2": "Lotutako tresnak eta gidak",
    "ps": [
     "Behar duzun bakarra sinplifikatua tradizionalera pasatzea bada, ikusi [[Bihurtu azpititulu sinplifikatuak tradizionaletara|/guides/srt-simplified-to-traditional.html]]; zergatik den karaktereak aldatzea baino zerbait gehiago, ikusi [[Txinatar sinplifikatuaren eta tradizionalaren arteko aldea karaktere-aldaketa hutsa baino haratago doa|/guides/simplified-traditional-chinese.html]]; beste hizkuntza batera itzultzeko, [[Azpitituluen itzulpena|/translate.html]]."
    ]
   }
  ]
 },
 "how-to-make-lrc-file": {
  "seo": {
   "title": "Nola sinkronizatu LRC letrak – Lerro bat letro bakoitzeko, sakatu erritmoan – AI-SRTSub",
   "desc": "Sortu LRC fitxategi bat hutsetik: itsatsi lehenengo lerro bat letro bakoitzeko, sakatu denbora entzuten duzun bitartean, eta ezagutu lasterbide egokiak, lerro bat noiz saltatu, LRC ala SRT, eta zer egin denborak aldentzen direnean.",
   "h1": "Nola sinkronizatu LRC letrak",
   "intro": "LRC fitxategi bat \"letra-lerro bat gehi denbora-puntu bat\" besterik ez da. Hori egiteari denboratzea deritzo: lerro bakoitza hasten den unea jasotzea.",
   "ctaText": "Ireki letra-sinkronizaziorako tresna"
  },
  "body": [
   {
    "h2": "Zer den funtsean denboratzea",
    "ps": [
     "LRC fitxategi baten egitura oso sinplea da: letra bat lerroko, bakoitzaren aurretik `[mm:ss.xx]` denbora-etiketa bat duela. Erreproduzitzaile batek lerro batera iristean, letra hori erakusten du une horretan.",
     "Beraz, \"LRC bat egitearen\" zeregina da letra-lerro bakoitzari denbora-puntu bat esleitzea — eta makina batek ezin du hori zure ordez egin, lerro bat noiz hasten den entzutea eskatzen duelako."
    ]
   },
   {
    "h2": "Abesti batek zenbat saio behar dituen",
    "ps": [
     "Hasi aurretik minutu bateko gogoeta egitea merezi du; horrela, berregite lan gehienak aurreztuko dituzu:"
    ],
    "img": {
     "file": "lrc-tap2",
     "alt": "Erreproduzitu, marka-lerro hau, desegin-lerro-bat eta saltatu-lerro-hau kontrolak erritmoan sakatzeko eremuan",
     "cap": "Erreprodukzioan zehar Sartu sakatzea da errazena; okerreko lerroa markatu duzu? Sakatu Z eta markatu berriro"
    }
   },
   {
    "h2": "Letrak itsasteak gainerako guztia zein erraz joango den zehazten du",
    "ps": [
     "Itsatsi letrak lerro bat letro bakoitzeko; hutsuneak salto egiten dira. Itsasten dituzun lerro-etendurak gero denboratuko dituzun lerroak izango dira — zatitu lerro gehiagotan orain eta gehiagotan sakatu beharko duzu gero.",
     "Lehendik dagoen LRC bat itsasteak ere balio du: bere `[mm:ss.xx]` denbora-etiketak ezagutzen dira, eta inportatu ondoren **denborarik gabeko lehen lerrotik jarraitzen duzu**, beraz, lehendik denboratuta dauden lerroak ez dira berriro egin behar.",
     "Horrek esan nahi du erdi amaitutako LRC bat gorde eta geroago berriro itsatsi daitekeela jarraitzeko."
    ],
    "img": {
     "file": "lrc-paste2",
     "alt": "Letrak itsasteko eremua eta letrak aztertzeko botoia",
     "cap": "Lerro bat letro bakoitzeko; LRC oso bat itsasteak lehendik dauden denborak irakurtzen ditu jarraitu ahal izateko"
    }
   },
   {
    "h2": "Esportatu LRC edo SRT",
    "ps": [
     "**Musika-erreproduzitzaile baterako, esportatu LRC.** foobar2000-k, mota guztietako erreproduzitzaileek eta letra-bistaratzea duten gailuek irakurtzen dute.",
     "**Bideo batean letrak jartzeko edo gehiago prozesatzeko, esportatu SRT.** Bideo-azpitituluen pistek, azpititulu-tresnek eta edizio-softwareak SRT irakurtzen dute. Esportazioan lerro bakoitzak hurrengoa hasi arte irauten du, eta azken lerroak 2 segundora jotzen du.",
     "Bi aukerek denbora duten lerroak soilik esportatzen dituzte — saltatutako lerroak ez dira inoiz fitxategian sartzen."
    ],
    "img": {
     "file": "lrc-export",
     "alt": "LRC deskargatzeko, SRT deskargatzeko eta kopiatzeko botoiak esportazio-eremuan",
     "cap": "LRC erreproduzitzaileentzat, SRT bideoarentzat; denbora duten lerroak soilik esportatzen dira"
    }
   },
   {
    "h2": "Gaizki egiteko errazak diren zenbait gauza",
    "ps": [
     "**Dena apur bat desados dago denboratu ondoren? Erabili desplazamendu bat.** Esportatu SRT eta mugitu osorik [[Denbora-lerroaren doikuntza|/shift.html]] erabiliz; askoz azkarragoa da lerroz lerro berriro denboratzea baino.",
     "**Desbideratzea handitu egiten da abestiak aurrera egin ahala? Hori erritmo arazoa da.** Erreprodukzio-abiadura eta grabaketa-abiadura desberdinak direnean, akatsa amaiera aldera handitzen da, eta horrek eskala proportzionala eskatzen du, ez desplazamendu bat.",
     "**Lasterbideak naturalak sentitzen dira soilik elkarrekin erabiltzen dituzunean.** Zuriuneak erreproduzitu eta eten egiten du, Sartu-k uneko lerroa markatzen du, Z-k lerro bat desegiten du — sakatu Sartu zuzenean erreprodukzioan zehar saguaren eta teklatuaren artean aldatu beharrean.",
     "**Audioaren kalitateak zehaztasunean eragin du.** Ahots argiak dituen iturri bat jarraitzeko errazagoa da; zuzeneko grabaketak eta atzeko musika ozeneko iturriak nabarmen zailagoak dira."
    ]
   },
   {
    "h2": "Lotutako tresnak eta gidak",
    "ps": [
     "Gida osoa ikusteko, ikusi [[Nola erabili letra-sinkronizaziorako tresna|/guides/lrc.html]]; lehendik dagoen LRC bat azpititulu bihurtzeko, ikusi [[LRC-tik SRT-ra|/guides/lrc-to-srt.html]]; esportatutako SRTaren denbora okerra bada, erabili [[Denbora-lerroaren doikuntza|/shift.html]]; eta exekutatu emaitza [[Azpitituluen kalitate-kontrola|/qc.html]] erabiliz."
    ]
   }
  ]
 },
 "lrc": {
  "seo": {
   "title": "Letren sinkronizaziorako tresna – Kargatu abesti bat, itsatsi letrak eta jarraitu erritmoa – AI-SRTSub",
   "desc": "Kargatu abesti bat, itsatsi letrak, sakatu denbora-marka bat lerroko entzuten duzun bitartean, eta esportatu LRC edo SRT. Zuriuneak erreproduzitu eta eten egiten du, Sartu-k lerroa markatzen du, Z-k desegin egiten du, eta eskuak teklatuan mantentzen dira.",
   "h1": "Nola erabili letra-sinkronizaziorako tresna",
   "intro": "Kargatu abesti bat, itsatsi letrak, sakatu denbora-marka bat lerro bakoitzeko entzuten duzun bitartean, eta esportatu LRC edo SRT estandarra. Audioa lokalean erreproduzitzen da eta ez da inoiz igotzen.",
   "ctaText": "Ireki letra-sinkronizaziorako tresna"
  },
  "body": [
   {
    "h2": "Zer egiten du tresna honek",
    "ps": [
     "Eman abesti bati harekin batera abesteko letra-fitxategi bat: lerro bat letro bakoitzeko, lerro bakoitzak denbora-puntu bat duelarik. Erreproduzitzaileek LRC irakurtzen dute, azpitituluen pistek SRT irakurtzen dute, eta biak esporta daitezke hemen."
    ]
   },
   {
    "h2": "1 Kargatu abestia",
    "ps": [
     "Ezkerreko lehen zutabeak audio-fitxategi bat hartzen du: **MP3, M4A, FLAC, WAV eta OGG** formatuek balio dute. Audioa lokalean erreproduzitzen da eta ez da inoiz igotzen.",
     "Audioaren kalitateak ez du denboratzearen zehaztasunean eragiten, baina ahots argiak dituen iturri bat jarraitzeko errazagoa da; zuzeneko grabaketak eta atzeko musika ozeneko iturriak nabarmen zailagoak dira sinkronizatzen."
    ],
    "img": {
     "file": "lrc-up",
     "alt": "Letra-sinkronizaziorako tresnaren abestia kargatzeko eremua",
     "cap": "MP3 / M4A / FLAC / WAV / OGG formatuek balio dute, eta audioa lokalean bakarrik erreproduzitzen da"
    }
   },
   {
    "h2": "2 Itsatsi letrak",
    "ps": [
     "Itsatsi letrak bigarren zutabean, **lerro bat letro bakoitzeko**; hutsuneak automatikoki saltatzen dira. Ondoren, sakatu \"Aztertu letrak\".",
     "Lehendik dagoen LRC bat itsasteak ere balio du — bere `[mm:ss.xx]` denbora-etiketak ezagutzen dira, eta inportatu ondoren denborarik gabeko lehen lerrotik aurrera jarraitzen duzu, beraz, lehendik denboratuta dauden lerroak ez dira berriro egin behar."
    ],
    "img": {
     "file": "lrc-paste",
     "alt": "Letrak itsasteko eremua eta letrak aztertzeko botoia",
     "cap": "Itsatsi lerro bat letro bakoitzeko, edo itsatsi LRC oso bat eta utzi tresinari lehendik dauden denborak irakurtzen"
    }
   },
   {
    "h2": "3 Sakatu erritmoan entzuten duzun bitartean",
    "ps": [
     "Erreproduzitu abestia eta sakatu Sartu lerro bat hasten den unean (edo egin klik \"Markatu lerro hau\" aukeran); lerro horren denbora erregistratzen da eta kurtsorea hurrengora pasatzen da.",
     "Lasterbideak: **zuriunea** erreproduzitu eta eten egiten da, **Sartu**-k uneko lerroa markatzen du, **Z**-k lerro bat desegiten du. Erreprodukzioan zehar Sartu sakatzea da lan egiteko modurik leunena — ez da saguaren eta teklatuaren artean etengabe aldatu behar.",
     "Okerreko lerroa markatu duzu? Sakatu Z desegiteko eta markatu berriro. Lerro bat inola ere markatu nahi ez baduzu (instrumental bat, musika hutsik dagoen pasarte bat), sakatu \"Saltatu lerro hau\" eta ez da agertuko esportazioan."
    ],
    "img": {
     "file": "lrc-tap",
     "alt": "Erreproduzitu, marka-lerro hau, desegin-lerro-bat eta saltatu-lerro-hau kontrolak erritmoan sakatzeko eremuan",
     "cap": "Zuriuneak erreproduzitu eta eten egiten du, Sartu-k uneko lerroa markatzen du, Z-k desegiten du — eskuak teklatuan mantentzen dira"
    }
   },
   {
    "h2": "4 Esportatu",
    "ps": [
     "Laugarren zutabeak egiten du esportazioa: **Deskargatu LRC** erreproduzitzaileentzat, **Deskargatu SRT** bideo-azpitituluen pistetarako, edo \"Kopiatu\" testua zuzenean hartzeko.",
     "Denbora duten lerroak soilik esportatzen dira; saltatutako lerroak ez dira inoiz fitxategian sartzen. SRT esportazioan lerro bakoitzak hurrengoa hasi arte irauten du, eta azken lerroak 2 segundora jotzen du."
    ],
    "img": {
     "file": "lrc-out",
     "alt": "LRC deskargatzeko, SRT deskargatzeko eta kopiatzeko botoiak esportazio-eremuan",
     "cap": "LRC erreproduzitzaileentzat, SRT bideoarentzat; denbora duten lerroak soilik esportatzen dira"
    }
   },
   {
    "h2": "Ukitu gabe geratzen dena",
    "ps": [
     "Letraren testua ez da berridazten. Denboratzeak denbora-puntu bat bakarrik gehiatzen dio lerro bakoitzari, eta ez ditu inoiz ukitzen itsatsi dituzun hitzak.",
     "Lehendik dagoen LRC bat inportatzen duzunean, denbora-etiketa bat duten lerroek jatorrizko denbora mantentzen dute, eta denborarik gabeko lehen lerrotik aurrera bakarrik markatzen duzu."
    ]
   },
   {
    "h2": "Maiz egindako galderak",
    "ps": [
     "**Zergatik falta dira zenbait lerro esportaziotik?** Saltatutako lerroak eta denborarik ez duten lerroak ez dira inoiz fitxategian sartzen. Itzuli hirugarren urratsera eta gehitu ezazu, edo berretsi saltatzeko asmoa zegoela.",
     "**Denborak alda daitezke ondoren?** Markatu ondoren dena pixka bat mugitu nahi baduzu, esportatu SRT eta erabili [[Denbora-lerroaren doikuntza|/shift.html]] hura osorik desplazar edo eskalatzeko.",
     "**LRC ala SRT — zein esportatu behar dut?** LRC musika-erreproduzitzaileentzat (foobar2000, streaming bezeroak, mota guztietako erreproduzitzaileak); SRT letrak bideo batean jarri behar direnean edo azpititulu-tresnekin gehiago prozesatu behar direnean.",
     "**Zenbat denbora behar du abesti batek?** Lerro zenbat dauden eta zein zehatza izan nahi duzunaren araberakoa da. Hogeita hamar edo berrogei lerroko abesti baterako, minutu batzuk saio bakoitzeko fluxua ezagutzen duzunean; hitz-mailako zehaztasuna bilatzeak denbora gehiago eskatzen du."
    ]
   },
   {
    "h2": "Pribatutasuna",
    "ps": [
     "Audioa eta letrak arakatzailean soilik prozesatzen dira: ez da ezer igotzen eta ez da ezer igarotzen zerbitzari batetik. Audioa deskodetu eta lokalean bakarrik erreproduzitzen da."
    ]
   },
   {
    "h2": "Lotutako tresnak eta gidak",
    "ps": [
     "Dagoeneko LRC bat baduzu eta azpitituluak nahi badituzu, ikusi [[LRC-tik SRT-ra|/guides/lrc-to-srt.html]]; denboratzearen atzean dagoen arrazoia eta zailtasunak ezagutzeko, ikusi [[Nola sinkronizatu LRC letrak|/guides/how-to-make-lrc-file.html]]; esportatutako SRTaren denbora okerra bada, erabili [[Denbora-lerroaren doikuntza|/shift.html]]; eta exekutatu emaitza [[Azpitituluen kalitate-kontrola|/qc.html]] erabiliz."
    ]
   }
  ]
 },
 "lrc-to-srt": {
  "seo": {
   "title": "LRC fitxategiak SRT bihurtzeko tresna – Bihurtu letrak azpititulu – AI-SRTSub",
   "desc": "Bihurtu LRC letrak SRT azpititulu: lerro bakoitzak hurrengoa hasi arte irauten du, eta azkenak 3 segundo jasotzen ditu. 60 minutu baino gehiagoko abestiek zuzen funtzionatzen dute.",
   "h1": "LRC fitxategitik SRTra",
   "intro": "Bihurtu LRC letra fitxategiak SRT formatura: jaregin fitxategia, hautatu SRT eta deskargatu. Amaiera-orduak automatikoki betetzen dira hurrengo lerrotik abiatuta.",
   "ctaText": "Bihurtu LRC → SRT"
  },
  "body": [
   {
    "h2": "Nola bereizten den LRC formatua SRT formatutik",
    "ps": [
     "LRC abestien letra-formatu bat da: lerro bakoitzak `[minutes:seconds.cents]` formatuko **hasiera-ordua soilik dauka eta ez du amaiera-ordurik**; SRT azpititulu batek hasiera eta amaiera biak behar ditu. Hori dela eta, bihurketaren muina amaiera-orduak betetzea da."
    ],
    "img": {
     "file": "convert-upload-lrc",
     "alt": "Fitxategiak kargatzeko eremua: LRC fitxategi bat kargatuta eta LRC gisa detektatuta",
     "cap": "[00:12.50] denbora-markak dituen letra-fitxategi bat berehala detektatzen da LRC gisa"
    }
   },
   {
    "h2": "Nola betetzen diren amaiera-orduak",
    "ps": [
     "Araua sinplea da: **lerro bakoitzak hurrengoa hasi arte irauten du**; azken lerroak ez du \"hurrengorik\", beraz, 3 segundo jasotzen ditu. Gainera, LRC denbora-markek minutuak eta segundoak soilik dituzte —ordurik ez—, eta minutu-eremuak ez du mugarik gainditzen (62:05 ordu 1 eta 2 minutu 5 segundora dagokio); horrela, DJen nahasketak bezalako pista luzeek ongi funtzionatzen dute."
    ]
   },
   {
    "h2": "Nola bihurtu",
    "ps": [
     "Ireki [[converter|/convert.html]], jaregin LRC fitxategia, aukeratu **SRT - SubRip** irteera gisa, eta egin bihurketa eta deskargatu. Erabilgarria da bideoklipetarako eta erreproduzitzaileetan azpititulu gisa jartzeko; esportatutako SRT fitxategia berriro VTT bihurtu daiteke webguneetarako."
    ]
   }
  ]
 },
 "make-bilingual-subtitles": {
  "seo": {
   "title": "Bi hizkuntzetako azpitituluak sortzeko bi modu – AI-SRTSub",
   "desc": "Bi hizkuntzetako azpitituluak bi modutan ager daitezke: bi lerro sekuentzia berean, edo bi sekuentzia denbora-lerro berean. Abantailak, desabantailak eta nola aldatu. – AI-SRTSub",
   "h1": "Bi hizkuntzetako azpitituluak sortzeko bi modu",
   "intro": "Bi hizkuntzetako azpititulu berberak bi diseinu desberdin ezkutatu ditzake. Ikasi biak bereizten, eta egitea, zatitzea eta bihurtzea ez zaizkizu gehiago nahasiko.",
   "ctaText": "Lan egin bi hizkuntzetako azpitituluekin"
  },
  "body": [
   {
    "h2": "Nolakoak diren bi formak",
    "ps": [
     "**B forma: bi sekuentzia denbora-lerro berean.** Elkarrizketa-lerro bat denbora-doikuntza berberak dituzten bi azpititulu-sekuentzia bereizietan bihurtzen da —bat ingelesez, beste bat txineraz—, bata bestearen gainean jarrita. Hau da ASS bi hizkuntzetako azpitituluak eraikitzeko modurik ohikoena."
    ]
   },
   {
    "h2": "Zein den bakoitzaren muga",
    "ps": [
     "A formaren ahulgunea **detekzioa** da: pistak zatitzea idazketa-sisteman oinarritzen da; beraz, txinera-ingelesa edo japoniera-ingelesa bikoteak begi bistan bereizten dira, eta **idazketa-sistema bera partekatzen duten konbinazioak** —ingelesa eta frantsesa, edo txinera eta japonierazko kanjiak— ezin dira bereizi. B formaren ahulgunea **ekoizpena** da: bi denbora-lerroek bat etorri behar dute zehatz-mehatz, eta eskuz lerrokatzea neketsua da; gainera, erreproduzitzaile batzuek denbora-lerro bereko bi sekuentziak marrazten dituzte, pantaila betez. Arau orokorra: erabili A forma ikusleei zuzendutako azpititulu amaituetarako; erabili B forma pistak bereizi behar dituzunean lan gehiago egiteko."
    ]
   },
   {
    "h2": "Bi bideak",
    "ps": [
     "**Eraiki bi hizkuntzetako azpitituluak jatorrizkotik**: erabili [[AI Subtitle Translation|/translate.html]] eta hautatu \"Bilingual · original on top\" edo \"Bilingual · translation on top\" esportatzean —A forma zuzenean lortuko duzu; ASS aukeratzeak bi diseinu ere eskaintzen ditu, \"stacked top and bottom\" eta \"two lines at the bottom\".",
     "**Batu bi pista edo bihurtu forma batetik bestera**: erabili [[Bilingual Subtitle Stripper|/bilingual.html]] eta bere \"merge into one two-line entry\" modua —B forma sartu, A forma irten; bestaldera joateko, \"split into two files\" aukerak A edo B forma hartzen du eta bi pista independente ematen ditu."
    ],
    "img": {
     "file": "bilingual-modes",
     "alt": "Bi hizkuntzetako kentzailearen lau moduak; \"merge into one two-line entry\" aukerak denbora-lerro bera partekatzen duten bi sekuentzia batzen ditu",
     "cap": "\"Merge into one two-line entry\": B forma A bihurtzen da"
    }
   },
   {
    "h2": "Zein gailutan erreproduzituko den",
    "ps": [
     "Web-erreproduzitzaileek (HTML5 ``) eta mugikorreko erreproduzitzaile gehienek fidagarritasun handiagoz kudeatzen dute A forma; mahaigaineko erreproduzitzaileek (VLC, mpv, PotPlayer) biak onartzen dituzte eta denbora-lerro bereko bi sekuentziei kolore eta kokapen desberdinak ere eman diezazkiekete. Zalantzarik baduzu, esportatu A forma SRT gisa —hori da ongien moldatzen dena. Formatuen arteko desberdintasunetarako, ikus [[SRT, VTT or ASS: Which Should You Use|/guides/subtitle-format-comparison.html]]."
    ],
    "img": {
     "file": "translate-export",
     "alt": "Itzulpen-tresnaren esportazio-paneleko bi hizkuntzetako estilo-aukerak",
     "cap": "Hautatu bi hizkuntzetako lerroen ordena esportatzean bertan —pauso bat eta eginda dago"
    }
   },
   {
    "h2": "Ohiko galderak",
    "ps": [
     "**Bi hizkuntzetako azpitituluak estuak dirudite —zer egin dezaket?** Kontrolatu lerroaren zabalera: itzulpen-tresnaren esportazio-panelak \"bilingual line width\" ezarpena du; lerro estuago batek sekuentziako karaktere gutxiago eta pantaila garbiagoa dakar.",
     "**Pista bakarra nahi dut soilik.** Kentzailearen \"keep original only / keep translation only\" aukerak klik bakar batean ebatziko du; ikus [[Split Bilingual Subtitles into Two Tracks|/guides/split-bilingual-subtitles.html]]."
    ]
   }
  ]
 },
 "merge": {
  "seo": {
   "title": "Azpititulu bikoiztuak eta estilodunak elkartzea – Elkartu, estilizatu, esportatu – AI-SRTSub",
   "desc": "Konbinatu bi azpititulu-fitxategi pista bikoiztu batean, berritu lehendik dagoen fitxategi bikoiztu baten estiloa, edo eman estiloa hizkuntza bakarrekoari: parekatze-moduak, ASS eta VTT txantiloiak, eta zer formatu esportatu.",
   "h1": "Nola erabili hizkuntza bikoitzeko bat-egitea eta efektu berezietako azpitituluak",
   "intro": "Konbinatu bi azpititulu-fitxategi pista bikoiztu bakarrean, edo estilizatu azpitituluak zuzenean: letra-tipoa, kolorea, ertza eta kokapena ikusten duzuna da lortzen duzuna, eta aurrebista esportatzearekin bat dator.",
   "ctaText": "Ireki efektu berezietako azpitituluen tresna"
  },
  "body": [
   {
    "h2": "Zer egiten du tresna honek",
    "ps": [
     "Orrialde honek hiru zeregin betetzen ditu benetan: jatorrizko azpititulu-fitxategi bat eta itzulitako bat fitxategi bikoiztu batean elkartzea, lehendik bikoiztuta dagoen fitxategi baten ordena eta estiloa doitzea, eta hizkuntza bakarreko fitxategi bati efektu bereziak gehitzea. Hirurek estilo-parametro berberak eta aurrebista bera partekatzen dituzte."
    ]
   },
   {
    "h2": "Hiru zeregin, orrialde bat",
    "ps": [
     "Orrialdearen goialdean hiru fitxa daude: **Elkartu bi fitxategi**, **Doitu fitxategi bikoiztu bat**, **Hizkuntza bakarreko fitxategia**. Zure aukerak erabakitzen du zenbat sarrera-zutabe agertuko diren ezkerrean.",
     "Bi fitxategi elkartzean, ezkerraldeak bi zutabe ditu, \"1 Jatorrizko azpitituluak\" eta \"2 Itzulitako azpitituluak\"; bakoitzak igo berri den fitxategi bat edo zuzenean itsatsitako testua onartzen ditu. Fitxategi bikoiztu bat doitzeak eta hizkuntza bakarreko fitxategi bati estiloa emateak zutabe bakarra besterik ez dute behar."
    ],
    "img": {
     "file": "merge-mode",
     "alt": "Efektu berezietako azpitituluen tresnaren goialdeko hiru fitxak eta ezkerreko sarrera-eremua",
     "cap": "Hiru fitxa goialdean; \"Elkartu bi fitxategi\" hautatzean, jatorrizko zutabe bat eta itzulitako zutabe bat agertzen dira ezkerrean"
    }
   },
   {
    "h2": "Nola parekatzen diren bi fitxategi",
    "ps": [
     "\"3 Bat-egitearen ezarpenak\" ataleko lehen aukera parekatze-modua da: **Parekatu ordenaren arabera · erabili jatorrizko denbora-lerroa**, **Parekatu denbora-lerroaren arabera · erabili jatorrizko denbora-lerroa**, **Parekatu ordenaren arabera · erabili itzulitako denbora-lerroa**.",
     "Bi fitxategiek sarrera kopuru bera eta ordena bera dutenean, ordenaren arabera parekatzea da seguruena. Zenbakiak desberdinak direnean (alde batek sarrerak batu ditu, besteak banatu), parekatu denbora-lerroaren arabera eta utzi tresnari hurbiltasunaren arabera parekatzen. Zein denbora-lerro erabili zein fitxategi den zehatzagoaren arabera erabakitzen da —normalean jatorrizkoa—.",
     "Horren azpian testuaren egitura (auto-detekzioa / bi lerro sarrerako / txandakako bikoteak) eta ordena daude (jatorrizkoa goian / itzulpena goian)."
    ],
    "img": {
     "file": "merge-pair",
     "alt": "Parekatze-modua, testuaren egitura eta ordenaren aukerak bat-egitearen ezarpenen azpian",
     "cap": "Parekatze-moduak erabakitzen du zein lerro doan zeinekin, eta zein denbora-lerro erabili hemen ere ezartzen da"
    }
   },
   {
    "h2": "Doitu estiloa elementuz elementu",
    "ps": [
     "Estilo-panela eskuinean dago. ASS esportatzen duzunean, \"ASS itxura\" blokea aplikatzen da: diseinua (zatitua · goian eta behean banatuta / pilatuta · bi lerro behean), tamaina, kolorea, opakutasuna, letra-tipoa, letra lodia, etzana, letren arteko tartea, ertza, ertzerako kolorea, itzala/atzealdea (bat ere ez / itzala / atzealdea), sakonera, ildoaren kolorea, ildoaren opakutasuna, lerrokatze horizontala (behean · ezkerrean / behean · erdian / behean · eskuinean) eta itzulpenaren (nagusia) lerroaren behealdetik dagoen distantzia, gehi jatorrizko (bigarren mailako) lerroaren letra-tipoa, itzala/atzealdea eta ezkerreko/eskuineko marjinak.",
     "VTT estilo bikoiztua esportatzen duzunean, \"WebVTT estiloa\" blokea aplikatzen da: sei aurrezarpenez gain (estandarra / trinkoa / zinematografikoa / goian / eskuragarria / bertikala), lerro bertikala, aingura (behean / goian / erdian), posizio horizontala, zabaleraren tamaina, lerrokatze-balioa eta sekuentzia osoaren lerro-altuera alda ditzakezu, gehi itzulpen-lerroaren atzeko kolorea, atzeko opakutasuna eta ertzaren zabalera; jatorrizko lerroak estilo nagusia heredatu dezake edo bereizi gisa ezarri.",
     "Amaitzean, emaitza aurrezarpen gisa gorde dezakezu eta berriro erabili geroago \"Gordetako aurrezarpenak\" atalean hautatuta eta \"Aplikatu\" sakatuta."
    ],
    "img": {
     "file": "merge-style",
     "alt": "Eskuineko ASS itxura panelaren parametroak",
     "cap": "Tamaina, kolorea, ertza, itzala/atzealdea eta lerrokatzea guztiak dira pertsonalizagarriak, eta emaitza aurrezarpen gisa gorde daiteke"
    }
   },
   {
    "h2": "Begiratu aurrebistari esportatu aurretik",
    "ps": [
     "\"Bat-egitearen aurrebista\" taula bat da: #, denbora, jatorrizkoa, itzulpena, estiloa. Goiko barrak susmagarriak diren errenkadak iragazten ditu \"soinu-efektuak ditu\", \"hizlariaren aurrizkia du\", \"segundo 1 baino laburragoa\", \"bi lerro baino gehiago\" eta \"irakurketa-abiadura gainditua\" irizpideen arabera, edo idazten duzun gako-hitz baten arabera.",
     "Errenkada baten estiloaren zirrikituan klik egitean, zirrikitu horren editorea zabaltzen da eta hura erabiltzen duten errenkadak bakarrik zerrendatzen ditu; \"Garbitu gainidazketa guztiak\" aukerak eskuzko gainidazketa oro txantiloiara itzultzen du. Azpiko denbora-lerroa doitzeko eremuak desplazamendu globala (emandako sekuentzia batetik abiatuta) eta eskala proportzionala kudeatzen ditu.",
     "Behar bezala ikusten denean, joan \"4 Esportatu\" atalera: deskargatu azpititulu-fitxategia edo kopiatu bere edukiak."
    ],
    "img": {
     "file": "merge-preview",
     "alt": "Bat-egitearen aurrebistaren taula eta bere iragazki-barra",
     "cap": "Aurrebista esportazioa bera da; iragazi errenkada susmagarriak motaren arabera edo zabaldu estilo-zirrikitu bakar bat"
    }
   },
   {
    "h2": "Zer geratzen den ukitu gabe",
    "ps": [
     "Estilizazioak itxura soilik aldatzen du, inoiz ez elkarrizketa. Jatorrizkoaren eta itzulpenaren testua ez da karaktere bakar batez ere aldatzen bat-egitean zehar; aurrebistaren azpiko doitze-eremuan nahita aldatzen ez baduzu behintzat, denbora-lerroa aukeratutako fitxategitik dator.",
     "SRT edo \"estilorik gabeko VTT\" esportatzen duzunean, ez da estilo-informaziorik idazten fitxategian — orrialdeak esaten dizu VTTk ez duela STYLE blokerik eta erreproduzitzaileak berezko itxura erabiliko duela. Estiloa nahi baduzu, aukeratu VTT estilo bikoiztua edo ASS."
    ]
   },
   {
    "h2": "Ohiko galderak",
    "ps": [
     "**Zer gertatzen da bi fitxategiek sarrera kopuru desberdina badute?** Erabili \"Parekatu denbora-lerroaren arabera\" eta tresnak hurbiltasunaren arabera parekatuko du; parekatu ezin dituen sarrerak ez dira asmatzen.",
     "**Zer gertatzen da erreproduzitzaile batek esportatutako ASS bateko estiloei kasurik egiten ez bazaie?** Estiloak fitxategiaren barruan gordetzen dira, baina erreproduzitzaile batzuek ASS euskarri mugatua dute. Itxura eramangarriagoa nahi baduzu, esportatu VTT estilo bikoiztua.",
     "**Nola itzul naiteke hasierako txantiloiara hondatu ondoren?** ASS blokean \"Berrezarri lehenetsitako parametroak\" eta VTT blokean \"Berrezarri txantiloi lehenetsiak\" aukerek euren atal propioa berrezartzen dute.",
     "**Zein dira lagineko zazpi errenkadak?** Adibide integratua dira, bat-egite batek nolakoa ematen duen ikusi ahal izateko soilik daude hor; lagina ezin da esportatu. Kargatu zure azpitituluak eta egin klik bat-egitearen aurrebistan, eta automatikoki ordezkatuko dira."
    ]
   },
   {
    "h2": "Pribatutasuna",
    "ps": [
     "Azpitituluak nabigatzailean bertan prozesatzen dira osorik: ez da ezer igotzen eta ez da ezer pasatzen zerbitzari batetik. Itxi nabigatzailea eta saio horretako gauza guztiak desagertu egingo dira."
    ]
   },
   {
    "h2": "Lotutako tresnak eta gidak",
    "ps": [
     "Fitxategi bikoiztu bat bi pistatan banatzeko, erabili [[Bikoiztuen banaketa|/bilingual.html]]; alderantziz egiteko eta hizkuntza bakarreko fitxategi bat bikoiztu bihurtzeko, ikusi [[Azpititulu bikoiztuak egiteko bi modu|/guides/make-bilingual-subtitles.html]]; exekutatu emaitza [[Azpitituluen kalitate-kontrolaren|/qc.html]] bidez; denboraldi oso baterako batera, erabili [[Batch bihurtzea|/batch.html]]."
    ]
   }
  ]
 },
 "qc": {
  "seo": {
   "title": "Nola erabili azpitituluen kalitate-kontrola – Denbora-lerroaren eta diseinuaren egiaztapena – AI-SRTSub",
   "desc": "Azpitituluen QC: 17 arauk gainjarpenak, lerro-zabalera, irakurketa-abiadura eta puntuazioa hautematen dituzte, 27 hizkuntzatako atalaseekin. Erdiak klik bateko konponketak dira; deskargatu txostena.",
   "h1": "Nola erabili azpitituluen kalitate-kontrola",
   "intro": "Azpitituluak entregatu aurretik, pasa itzazu QC orritik denbora eta diseinua egiaztatzeko: zer egiaztatzen den, nola irakurri txostena eta zein arazo konpon daitezkeen klik bakar batekin — dena hemen azaltzen da.",
   "ctaText": "Ireki azpitituluen kalitate-kontrola"
  },
  "body": [
   {
    "h2": "Zertarako balio du tresna honek",
    "ps": [
     "Begi hutsez ondo ikusten diren azpitituluek entregatzean denbora-lerro gainjarriak, gehiegi zabaldutako lerroak edo irakurketa-abiadura altuegia dutela egiaztatu ohi dute. QC orriak arazo horiek banan-banan zerrendatzen ditu:"
    ]
   },
   {
    "h2": "Aukeratu lehenik hizkuntzaren arauak",
    "ps": [
     "“Zein hizkuntzaren arauen arabera egiaztatu” atalean bost atalase ezartzen dituzu: **lerro bakarreko gehienezko zabalera** (42 zabalera erdiko unitate horizontalki lehenetsita, 36 karraturako, 28 bertikaletarako), **irakurketa-abiaduraren muga** (18 zabalera-unitate segundoko txinerarako, japonierarako eta koreerarako, 20 beste hizkuntzetarako), **gutxieneko iraupena 833 milisegundokoa**, **gehienezko iraupena 7000 milisegundokoa**, eta **gehienez 2 lerro**. Ezarri azpitituluen hizkuntza automatikoki detektatzeko edo hautatu 27etako bat eskuz; pantailaren orientazioak lerro-zabalera maila soilik aldatzen du — irakurketa-abiadurak, iraupenak eta lerro-kopuruak bere horrean jarraitzen dute. Zabalera erdiko unitateak neurri partekatua dira: hanzi batek 2 balio du, letra latindar bakarrak 1 — 42ko lerro-zabalera 21 hanziren edo 42 letraren baliokidea da."
    ],
    "img": {
     "file": "qc-rules",
     "alt": "QC ezarpenak: bost atalase sarrera-kutxa gehi azpitituluen hizkuntzaren eta pantailaren orientazioaren goitibeherako menuak",
     "cap": "Bost atalase + hizkuntza + orientazioa; balio lehenetsiak industriako praktika arruntarekin bat datoz"
    }
   },
   {
    "h2": "Txostena irakurtzen",
    "ps": [
     "17 arauen txostenak hiru mailatan ematen ditu aurkikuntzak: **akatsak** (testu nahasia, denbora-markaren formatua, hasiera baino lehenago amaitzea, hautsitako zenbakikuntza), **abisuak** (sarrera hutsak, gainjarpenak, iraupen laburegiak edo luzeegiak, muga gainditutako irakurketa-abiadura, lerro zabalegiak, bi lerro baino gehiago), eta **aholkuak** (lerro-jauziaren posizioa, hasierako edo amaierako zuriuneak, falta diren zuriuneak, puntuazio arauak eta beste). Aurkikuntza bakoitzak sarrera-zenbakia eta “neurtutakoa X, atalasea Y” xehetasuna dakar, eta zerrenda mailaren arabera iragazi daiteke. Sarrera bikoiztuek salbuespenak dituzte: bi formak automatikoki detektatzen dira, gainjarpenen egiaztapenek bikote osoa salbuespenean uzten dute, eta irakurketa-abiadurak helburuko hizkuntzan idatzitako lerroa bakarrik kontatzen du."
    ],
    "img": {
     "file": "qc-report",
     "alt": "QC txostenaren eremua: akatsen, abisuen eta aholkuen arabera taldekatutako aurkikuntzak, bakoitza sarrera-zenbakiarekin eta neurtutako balioarekin",
     "cap": "Hiru mailako txostena: aurkikuntza bakoitzak bere sarrera-zenbakia eta neurketa/atalase balioak dakar"
    }
   },
   {
    "h2": "Konpontzea eta esportatzea",
    "ps": [
     "“Konpondu eta esportatu” txartelak **berez konpon daitezkeen** elementuak soilik zerrendatzen ditu: berriro lerrokatzea, sarrera hutsak kentzea, falta diren zuriuneak gehitzea, puntuazioa hizkuntzaren arauen arabera ordezkatzea, berriro zenbakitzea — denbora ukitzen utzi ez eta beste guztia markatuta dago lehenetsita; **denbora aldatzen duten elementuak** (hasiera eta amaiera trukatzea, gainjarpenak mugitzea, iraupenak moztea edo luzatzea) desmarkatuta daude lehenetsita — markatu eragina zuk zeuk egiaztatu ondoren. Sakatu “Aplikatu konponketak” eta egiaztapen berri bat automatikoki exekutatzen da; kontagailuak benetan konpondu dena bakarrik kontatzen du — berriro lerrokatu ezin izan diren lerroak ez dira zenbakietan handitzen. **Mugaz gaindiko irakurketa-abiadurak ez du konponketa automatikorik**: makinaperek ez dakite zein hitz moztu, beraz, itzulpena eskuz laburtu behar da edo denbora egokitu. Konpondu ondoren, esportatu SRT edo VTT, edo sakatu “Deskargatu txostena” testu arrunteko `.qc.txt` txostena gordetzeko."
    ],
    "img": {
     "file": "qc-fix",
     "alt": "Konponketa-txartela: elementu auto-konpongarrietarako laukizuzenak eta Aplikatu konponketak botoia",
     "cap": "Auto-konpongarri diren elementuek bakarrik osatzen dute zerrenda; denbora aldatzen duten konponketak lehenetsita desmarkatuta daude"
    }
   },
   {
    "h2": "Ohiko galderak",
    "ps": [
     "**Zergatik ezin da nire ASS esportatu?** QC-k SRT eta VTT soilik esportatzen ditu; ASS sartzen da baina ez da ateratzen. ASS efektuak mantentzeko, pentsatu ezazu lehenik [[Formatuen Bihurgailua|/convert.html]] bidez.",
     "**Zer esan nahi du 18ko irakurketa-abiadurak?** Txinerarako, japonierarako eta koreerarako muga segundoko 9 karaktere osoko da (zabalera erdiko 18 unitate); beste hizkuntzetakoek segundoko 20 zabalera erdiko unitate dituzte. Hauek dira erosotasun-maila arruntak, eta sarrera-kutxak horiek aldatzeko aukera ematen dizu.",
     "**Nire fitxategiaren kodeketa apurtuta dago — oraindik egiaztatu daiteke?** QC-k UTF-8 soilik irakurtzen du; konpondu lehenik kodeketa testu nahasiaren konponketa-orrian.",
     "**Ukituko al du nire denbora-lerroa?** Ez “denbora aldatzen du” taldea desmarkatuta uzten duzun bitartean; markatuta egon arren, aldaketa bakoitza zehazten da konponketa aplikatu aurretik."
    ]
   },
   {
    "h2": "Lotutako gidak",
    "ps": [
     "Azpitituluak irakurtzeko azkaregi pasatzen ari direnean — ikusi gidatutako gida hau: [[Azpitituluak irakurtzeko azkaregiak dira|/guides/subtitle-too-fast.html]]. Entregatu aurretik zer egiaztatu behar den — egiaztapen-zerrenda hemen dago: [[Zer egiaztatu entregatu aurretik|/guides/subtitle-quality-check.html]]. Sinkronizaziotik kanpo noraezean dabilen denbora-lerroa beste arazo mota bat da — ikusi [[Sinkronizaziotik kanpo dabiltzan azpitituluak|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "remove-subtitle-ads": {
  "seo": {
   "title": "Kendu iragarkiak eta ur-markak azpitituluetatik – AI-SRTSub",
   "desc": "Garbitu ur-markak eta iragarkiak azpitituluetatik: URLak, fansub-en kredituak eta encoded by etiketak klik batean ezabatzen dira, baita sarrera bikoiztuak eta hutsak ere. – AI-SRTSub",
   "h1": "Kendu iragarkiak eta ur-markak azpitituluetatik",
   "intro": "Zure azpitituluetan ezkutatutako URLak, kredituak eta promozio-sarrerak pasaldi batean garbitzen dira garbitzailearen ur-marka arauen bidez — eta oker egindako edozein ezabatze sarreraz sarrera desegin daiteke.",
   "ctaText": "Garbitu azpitituluen ur-markak"
  },
  "body": [
   {
    "h2": "Zer dira ur-marka hauek",
    "ps": [
     "Linean deskargatutako azpitituluek sarritan sarrera gehigarriak izaten dituzte hasieran edo amaieran (batzuetan erdian ere bai): URLak, helbide elektronikoak, fansub taldeen izenak, `encoded by` / `translated by` kredituak, opensubtitles bezalako gune-izenak, eta “jarraitu gure WeChat kontua” edo “ikasketa-helburuetarako soilik” bezalako lerroak. Ohiko azpititulu-sarrerak dira — denbora-lerro batekin, lerro bat hartuz —, beraz, erreproduzitzaileek ezin dituzte kendu; edukiaren arabera detektatu behar dira."
    ]
   },
   {
    "h2": "Non egin",
    "ps": [
     "Ireki [[Azpitituluen garbitzailea|/clean.html]] eta sartu zure azpititulua; “Ur-markak eta zabor-sarrerak” taldeak jada aktibatuta ditu “Kendu ur-markak eta iragarkiak”, “Kendu sarrera bikoiztuak” eta “Kendu sarrera hutsak” aukerak lehenetsita, eta garbiketa automatikoki hasten da. Detekzioak bi mailatan funtzionatzen du: **seinale gogorrek** (URLak, posta elektronikoak, fansub taldeak eta gune-izenak kasu) sarrera osoa ezabatzen dute edozein luzeratan jotzean; **seinale leunek** (@ erabiltzaile-izenak, “encoded” edo “proofread” kredituak) 40 karaktere baino gehiago ez dituzten sarrera laburretan bakarrik ebaluatzen dira, elkarrizketa luzeak ez mozteko. Sarrera bikoiztuek lehenik ur-marka lerroak kentzen dituzte lerroz lerro elkarrizketa-lerroak mantentzen diren bitartean; sarrera osoa ezabatzen da soilik ur-markaren arrastoak geratzen badira kendu ondoren."
    ],
    "img": {
     "file": "clean-opts",
     "alt": "Garbiketa-aukeren pantaila: ur-marken eta zabor-sarreren taldearen hiru laukizuzen",
     "cap": "“Ur-markak eta zabor-sarrerak” taldea aktibatuta dago lehenetsita — ez da eskuzko konfiguraziorik behar"
    }
   },
   {
    "h2": "Berrikusi eta esportatu",
    "ps": [
     "Aldaketa-zerrendan, ezabatutako sarrera bakoitzak “ur-marka eta iragarkia” etiketa dakar — begiratu ziurtatzeko ez dela ezer kendu akatsez; bat okerra dela iruditzen bazaizu, sakatu “Berreskuratu” hura jatorrizko tokian jartzeko. Behin betiereko egiaztapenaren ondoren, deskargatu: fitxategi-izenak `.clean` marka bat jasotzen du automatikoki. Garbiketa lokalki exekutatzen da zure nabigatzailean; zure azpitituluak ez dira inon bidaltzen."
    ]
   }
  ]
 },
 "repair": {
  "seo": {
   "title": "Nola konpondu mojibake azpitituluak – Detektatu kodeketa – AI-SRTSub",
   "desc": "Argibidea: detektatu jatorrizko kodeketa (GBK / Big5 / Shift_JIS / EUC-KR), sailkatu konponketak gehien hizkuntza diruditenaren arabera, eta gorde UTF-8 BOM-ekin edo GBK. Denborak eta zenbakiak ez dira inoiz aldatzen.",
   "h1": "Nola konpondu mojibake azpitituluak",
   "intro": "Zabor-karakterez betetako azpititulu-fitxategi bat oso gutxitan egoten da hondatuta — okerreko kodeketarekin irakurri da besterik gabe. Konpontzeko tresnak jatorrizko kodeketa detektatzen du eta karaktere egokiak jartzen ditu bere lekuan, indize-zenbakiak eta denborak ukitu gabe utziz.",
   "ctaText": "Ireki mojibakeak konpontzeko tresna"
  },
  "body": [
   {
    "h2": "Zer egiten du tresna honek",
    "ps": [
     "Byte berberak UTF-8 gisa irakurrita eta GBK gisa irakurrita guztiz bestelako bi karaktere-multzo sortzen dituzte — fitxategia ez dago hondatuta, okerreko kodeketarekin deskodetu zen. Hona here konpontzeko tresnak zer egiten duen:"
    ]
   },
   {
    "h2": "Igo fitxategia, ez itsatsi",
    "ps": [
     "Bi sarrera-puntuek kalte-kopuru desberdinak konpon ditzakete, beraz, **igo fitxategia ahal baduzu**. Fitxategi batekin, jatorrizko byteak hor daude oraindik: tresnak kodeketa bat bestearen atzetik probatzen du, eta GBK ezagutzen duenean GBK gisa deskodetzen du — ez da ezer asmatu behar. Itsatsita iristen den testua ez da jada byte gordina. Nabigatzailea katea ematen denerako, akatsa jadanik gertatu da, beraz, tresnak atzerantz lan egin eta lortu dezakeena baino ezin du hartu.",
     "Itsatsitako testuak jadanik ordezkapen-karaktere badauka (koadro barruko galdera-marka hori ``), jatorrizko byteak aspaldidanik joan dira eta ezin ditu ezer atzera ekarri. Orrialdeak argi eta garbi esaten du: igo eta erabili \"Aukeratu fitxategia\" jatorrizkoa igotzeko."
    ],
    "img": {
     "file": "repair-up",
     "alt": "Konponketa orrialdearen karga-eremua: jaregiteko eremua eta itsasteko koadroa, detektatutako kodeketa gainean agertzen dela",
     "cap": "Arrastatu fitxategia barrura edo arakatu bilatzeko; itsasteko koadroa azpian dago eta askoz gutxiago konpon dezake"
    }
   },
   {
    "h2": "Zer esaten ari zaizun diagnosia",
    "ps": [
     "Igo ondoren, diagnosi-txartelak epai bat ematen du. **Ez da mojibarkerik aurkitu**; edukia ondo irakurtzen da dagoen bezala; erreproduzitzaileak zaborra erakusten jarraitzen badu, erreproduzitzaileak okerreko kodeketa erabili du — joan behera \"Gorde honela\" atalera, aukeratu beste bat eta eman fitxategi hori. **Mojibake itxura duenean**, txartelak aurkitutako aztarna zerrendatzen du:"
    ],
    "img": {
     "file": "repair-diag",
     "alt": "Diagnosi-txartela: epaia eta mojibake aztarna bakoitza lerroz lerro zerrendatuta",
     "cap": "Diagnosiak aztarnak motaren arabera zerrendatzen ditu \"mojibakea da\" esan beharrean"
    }
   },
   {
    "h2": "Hautagaiak nola sailkatzen diren eta nola aukeratu",
    "ps": [
     "\"Hau konpontzeko moduak\" atalean, hautagaiak **benetako hizkuntzaren antza gehien duena lehenik** ordenan zerrendatzen dira, 12 arte, bakoitza irakurri zenetik irakurri zeneko kodeketa-bikotearekin etiketatuta. Egin klik batean nola ikusten den ikusteko, aukeratu, eta joan behera gordetzeko. Ez zaude gustura? Erabili \"Mantendu dagoen bezala\" jatorrizkora itzultzeko.",
     "Ordena puntuazio batetik dator: karaktere arrunten proportzioa, azentu-kateak, sinbolo-kateak, karaktere ilunen hormak, denak kontuan hartuta. **Puntuazio bat garbi hobea ez bada, ez da ezer gomendatzen** — ez dio hautagai erdi-sinesgarri bati bultzada egingo bakarra izateko soilik. Bitan desitxuratutako testuak (behin gaizki gordeta, gero behin gaizki konponduta) atzeranzko ebazpen txanda gehigarri bat jasotzen du hautagai nagusietan, beraz, bi geruzen barruan dagoen edozer salbatu daiteke oraindik."
    ],
    "img": {
     "file": "repair-fix",
     "alt": "Hautagaien konponketa-zerrenda benetako hizkuntzaren antza duenaren arabera sailkatuta, bakoitza bere kodeketa-bikotearekin etiketatuta",
     "cap": "Hautagaiak \"benetako hizkuntzaren antza gehien duena\" irizpidearen arabera sailkatuta, bakoitzak inplikatutako kodeketak erakusten dituela"
    }
   },
   {
    "h2": "Behar bezala gordetzea da azken urratsa",
    "ps": [
     "Konpondutako emaitza oraindik behar bezala gorde behar da. Erreproduzitzaile batek UTF-8 detektatu ezin duenean, **UTF-8 BOM-ekin** (Windows erreproduzitzaileak BOM-ean oinarritzen dira) edo **GBK** gisa gordetzeak konpontzen du normalean. UTF-8, UTF-8 (BOM-ekin), GBK, Big5, Shift_JIS edo EUC-KR gisa gorde dezakezu; zerbait egokitzen ez bada, beste bat aukeratzeko esango dizu (GBK-k ezin du koreerera eduki). Deskargatutako fitxategiek `-fixed` gehitzen diote izenari.",
     "Detektatutako kodeketa UTF-8 ez denean, \"Gorde honela\" dagoeneko aurrez ezarrita dago UTF-8 BOM-ekin aukerarekin zuretzat. Goitibeherako menua zuk zeuk ukitzen duzunean, ez zaizu gehiago aurreratzen saiatuko."
    ],
    "img": {
     "file": "repair-out",
     "alt": "Emaitza-eremua: testu-koadroa gorde-honela goitibeherako menuarekin eta deskargatzeko botoiarekin",
     "cap": "Aukeratu kodeketa bat, eta deskargatu — fitxategi-izenari -fixed gehitzen zaio"
    }
   },
   {
    "h2": "Zer ez den inoiz ukitzen",
    "ps": [
     "Gaizki irakurritako karaktereak soilik ordezkatzen dira. Indize-zenbakiak, denborak eta ASS estilo-lerroak ez dira inola ere aldatzen."
    ]
   },
   {
    "h2": "Ohiko galderak",
    "ps": [
     "**Fitxategia igo dut, beraz, zergatik gorde behar dut berriro?** Fitxategia bera ondo dago normalean; hautsitakoa da erreproduzitzaileak okerreko kodeketarekin irakurtzea. Kasu horretan testuko karaktere bakar batek ere ez du aldaketarik behar — gorde kopia bat UTF-8 gisa BOM-ekin edo GBK-rekin eta eman hori erreproduzitzaileari.",
     "**Zergatik ezin dira itsatsitako testuak konpondu?** Ordezkapen-karaktere itsatsitako edukian agertzen denean, jatorrizko byteak desagertuta daude eta ez dago zergatik arrazonatu atzerantz. Igo eta erabili \"Aukeratu fitxategia\" jatorrizkoa igotzeko.",
     "**Nuk hau nahi dudan hautagaia ez da agertzen?** Ez da ezer gomendatzen dagoeneko duzuna baino nabarmen hobea ez bada. Saiatu detektatutako kodeketa beste batera aldatzen eta utzi berriro sailkatzen.",
     "**Zenbat fitxategi batera?** Banan-banan. Deskargatu konponketa, eta sartu hurrengo fitxategia."
    ]
   },
   {
    "h2": "Pribatutasuna",
    "ps": [
     "Detekzioa eta konponketa zure nabigatzailean bertan exekutatzen dira osorik. Ez da azpitituluen edukirik bidaltzen zerbitzari batera."
    ]
   },
   {
    "h2": "Lotutako tresnak eta gidak",
    "ps": [
     "Mojibakea nondik datorren eta zergatik amaitzen duen horrelako itxurarekin — ikusi [[Nondik datoz azpitituluen mojibakeak|/guides/subtitle-garbled-characters.html]]; kodeketa ondo dago baina edukia zikina da — erabili [[Azpitituluen garbiketa|/clean.html]]; denbora eta irakurketa-abiadura egiaztatzeko — [[Azpitituluen kalitate-kontrola|/qc.html]]."
    ]
   }
  ]
 },
 "sbv-to-srt": {
  "seo": {
   "title": "SBV - SRT Bihurgailua – Bihurtu YouTube-ko azpitituluak – AI-SRTSub",
   "desc": "Bihurtu YouTubetik deskargatutako SBV azpitituluak SRT bihurtu CapCut, Premiere eta erreproduzitzaileentzako. Denbora-balioek ukitu gabe jarraitzen dute — diseinua bakarrik aldatzen da. Zure nabigatzailean exekutatzen da.",
   "h1": "SBV - SRT",
   "intro": "Bihurtu YouTube-ko SBV azpitituluak SRT: jaregin fitxategia, hautatu SRT, deskargatu. Denbora-balioak ukitu gabe daude — egitura bakarrik aldatzen da.",
   "ctaText": "Bihurtu SBV → SRT"
  },
  "body": [
   {
    "h2": "Zer den SBV eta nondik datorren",
    "ps": [
     "SBV **YouTube-ren azpititulu-formatua da**: YouTubetik \"azpititulu-fitxategiak\" deskargatzean .sbv bat lortzen duzu sarritan. Bere egitura SRT baino sinpleagoa da — hasierako eta amaierako denborak **lerro bakarrean** daude komaz bereizita, testua zuzenean azpian agertzen da, eta ez dago sekuentzia-zenbakirik."
    ]
   },
   {
    "h2": "Zergatik baztertzen duten erreproduzitzaileek",
    "ps": [
     "YouTube-tik kanpo, editatzeko software gehienek eta erreproduzitzaileek ez dute SBV onartzen. Zenbakitze-blokea falta zaio eta bere denbora-lerroa SRT-tik desberdin idazten du, beraz, luzapena berrizendatzeak ez du ezertarako balio — egitura benetan berreraiki behar da."
    ],
    "img": {
     "file": "convert-upload-sbv",
     "alt": "Karga-eremua: SBV fitxategi bat kargatuta, SBV gisa detektatuta",
     "cap": "SBV gisa detektatzen da dagoen bezala, ez da luzapena berrizendatu behar"
    }
   },
   {
    "h2": "Nola bihurtu",
    "ps": [
     "Ireki [[bihurgailua|/convert.html]], jaregin SBV-a, aukeratu **SRT - SubRip** irteera gisa, eta ondoren bihurtu eta deskargatu. Sekuentzia-zenbakiak berri esleitzen dira, eta sekuentzia bateko jatorrizko lerro-jauziak lerro bakar batean batzen dira (SRT-k lerro askotako sekuentziak onartzen ditu; SBV lerro bakarrean esportatzen da hemen)."
    ]
   }
  ]
 },
 "shift": {
  "seo": {
   "title": "Nola aldatu azpitituluen denboraketa (Desplazamendua, Eskala, Bi Aingura) – AI-SRTSub",
   "desc": "Denboraketa-editorearen gida ilustratua: kargatu azpitituluak, gehitu doikuntza-urratsak, bi aingurako zuzenketa, sekuentzia bakoitzeko doikuntzak eta esportazioa.",
   "h1": "Denboraketa-editorea: Urratsez urrats gida",
   "intro": "Gida honek tresna goitik behera azaltzen du: kargatu azpitituluak, gehitu doikuntza-urratsak, exekutatu egiaztapenak, doitu zehatz-mehatz sekuentzia bakoitza, eta esportatu.",
   "ctaText": "Ireki denboraketa-editorea"
  },
  "body": [
   {
    "h2": "Kargatu zure azpitituluak",
    "ps": [
     "Arrastatu fitxategi bat puntudun koadrora edo klikatu bat hautatzeko; **edukiak zuzenean ere itsatsi ditzakezu** testu-koadroan. Formatua luzapenetik zein edukitik detektatzen da, eta emaitza formatuaren txipan agertzen da. Onartutako sarrerak: srt, vtt, ass (ssa barne), sbv, lrc eta txt."
    ],
    "img": {
     "file": "shift-upload",
     "alt": "Kargatze-eremua: lagin-azpititulu bat kargatuta, SRT gisa detektatuta",
     "cap": "Fitxategiaren izena eta detektatutako formatua jaurtiketa-zonaren azpian agertzen dira; testu-koadroak editagarri jarraitzen du."
    }
   },
   {
    "h2": "Gehitu doikuntza-urratsak",
    "ps": [
     "Doikuntzak **urrats-kate bat** osatzen dute: urrats bakoitzak lan bat egiten du eta zenbaki bat hartzen du, bere unitatea koadroaren barnean agertzen dela. Urratsak goitik behera aplikatzen dira, eta edozein urrats aldatzeak **jatorrizko azpitituluetatik abiatuta dena berregiten du**; beraz, edozein unetan atzera egin eta zenbaki bat alda dezakezu nahaspilarik sortu gabe."
    ]
   },
   {
    "h2": "Bi aingurako zuzenketa",
    "ps": [
     "Desplazamendua segundotan ez dakizunean eta ratioa ere ez dakizunean, erabili bi aingura: behin gehituta, **\"egungo\" bi eremuak automatikoki betetzen dira** fitxategiko lehen eta azken sekuentziatik abiatuta. \"Helburuko\" eremuak bakarrik betetzen dituzu: sekuentzia horiek benetan agertu behar duten uneak. Tarteko guztia proportzionalki berriro zabaltzen da."
    ],
    "img": {
     "file": "shift-step-two",
     "alt": "Bi aingurako zuzenketa: egungo denborak automatikoki beteta, sarrera-helburuko denborak",
     "cap": "Egungo eremuak zure fitxategitik datoz; helburuko eremuak bideoan ikusten dituzun denbora zuzenak dira."
    }
   },
   {
    "h2": "Denbora-lerroaren egiaztapena eta sekuentzia bakoitzeko doikuntzak",
    "ps": [
     "Urratsak exekutatu ondoren, irakurri **denbora-lerroaren egiaztapena**: iraupen laburregia duten, luzeegia duten, irakurtzeko trinkoelegiak diren, lerro zabalegiak dituzten edo gainjartzen diren sekuentziak zerrendatzen dira. Egiaztapenak **arazoak soilik seinalatzen ditu eta ez du ezer aldatzen** bere kabuz. Lau erregela lehenetsiak honakoak dira: 0,833 s gutxieneko iraupena, 7 s gehienezkoa, segundoko 9 karaktereko irakurketa-abiadura eta lerroko 21 karaktere — denak orrian editagarriak. Horren azpian, sekuentzia bakoitzeko doikuntzei esker, ondoko bi sekuentzia batu ditzakezu, bat banatu, edo bere hasiera eta amaiera zuzenean editatu; edizio bakoitza desegin daiteke."
    ]
   },
   {
    "h2": "Esportatu emaitza",
    "ps": [
     "Emaitzaren panelak jatorrizko denborak eta doitutakoak **albo-alboan** erakusten ditu, erraz egiaztatu ahal izateko. Irteera-formatua sarrerako formatua izaten da lehenetsiz, baina srt, vtt, ass, sbv, lrc edo txt formatuetako edozein hauta dezakezu deskargatu aurretik."
    ],
    "img": {
     "file": "shift-result",
     "alt": "Emaitzaren panela: aurreko eta ondorengo denborak albo-alboan, deskargatzeko eta kopiatzeko botoiekin",
     "cap": "Jatorrizko denborak ezkerrean, doitutakoak eskuinean; deskargatu egiaztapena zuzen dagoela ikusten duzunean."
    }
   }
  ]
 },
 "shift-subtitle-timing": {
  "seo": {
   "title": "Nola aurreratu edo atzeratu azpititulu guztiak – AI-SRTSub",
   "desc": "Sekuentzia bakoitza kopuru berdinarekin atzeratuta dago: erabili denboraketa-editorearen desplazamendu-urratsa — idatzi zenbaki negatibo edo positibo bat eta sekuentzia guztiak batera mugituko dira.",
   "h1": "Mugitu azpititulu-fitxategi osoa lehenago edo beranduago",
   "intro": "Audioa hasten da, azpititulua berandu agertzen da, eta sekuentzia bakoitza kopuru berdinarekin dago atzeratuta. Hori desplazamendu uniformea da: zenbaki bakar batek konpontzen du.",
   "ctaText": "Ireki denboraketa-editorea"
  },
  "body": [
   {
    "h2": "Lehenik eta behin, egiaztatu sekuentzia guztiak kopuru berdinarekin daudela atzeratuta",
    "ps": [
     "Begiratu hasierako sekuentzia bat, erdikoa eta amaierako bat. Hirurak kopuru berdinarekin atzeratuta badaude gutxi gorabehera, **desplazamendu uniforme** bat da, eta desplazamendu-urrats bakar batek konpontzen du. Hasiera zuzena bada eta desfasajea amaierarantz handitzen bada, hori beste arazo bat da — ikusi [[azpitituluak gero eta gehiago deszinkronizatzen ari dira|/guides/subtitles-out-of-sync.html]]."
    ]
   },
   {
    "h2": "Zer idatzi: negatiboa aurreratzeko, positiboa atzeratzeko",
    "ps": [
     "Denboraketa-editorean, gehitu **Aldatu dena** urrats bat eta idatzi desplazamendua balioaren koadroan: berandu dabiltzan azpitituluek zenbaki negatibo bat hartzen dute lehenagora ekartzeko; goiz dabiltzanek zenbaki positibo bat hartzen dute beranduagora bultzatzeko. Azpitituluak 1,5 segundu berandu badaude, idatzi **-1.5** — unitatea segundotan da."
    ],
    "img": {
     "file": "shift-step-shift",
     "alt": "Aldatu dena urratsa -1,5 segundorekin sartuta",
     "cap": "Zenbaki negatibo batek fitxategi osoa lehenagora ekartzen du; unitatea koadroaren barruan idatzita dago, segundotan."
    }
   },
   {
    "h2": "Exekutatu eta egiaztatu lehen sekuentzia",
    "ps": [
     "Aplikatu ondoren, emaitzen panelak sekuentzia bakoitzaren jatorrizko denborak eta berriak **albo-alboan** erakusten ditu. Egiaztatu lehen sekuentzia lehenik: hasierako denbora berria lerroa ahoskatzen den fotograman erortzen al da? Ondoren, egiaztatu erdialdeko bat. Sekuentzia bakoitza kopuru berdinarekin mugitzen da eta bere iraupena mantentzen du."
    ]
   },
   {
    "h2": "Esportatu",
    "ps": [
     "Egiaztapena zuzena dela dirudienean, deskargatu zuzenean. Irteera-formatua sarrerako formatua izaten da lehenetsiz, eta beste batera alda daiteke. Aldaketak denborak bakarrik ukitzen ditu — ez testuaren karaktere bakar bat ere."
    ]
   }
  ]
 },
 "simplified-traditional-chinese": {
  "seo": {
   "title": "Ez da karaktere-truke soil bat – Bat-askotarako eta eskualdeko hitzak – AI-SRTSub",
   "desc": "Hiru gauzak egiten dute hau zaila: hitz bidez ebatzitako bat-askotarako mapaketak, Taiwan eta Hong Kongeko hiztegi desberdinak, eta elkarrizketak soilik bihurtzea. Hirurak ondo egin, eta ez da giza lan berririk beharko.",
   "h1": "Sinplifikatua eta tradizionala ez dira karaktere-truke soil bat",
   "intro": "Zein karaktere tradizionalek ordezkatzen duen sinplifikatu bat ondoko karakterearen araberakoa da. Horregatik, bihurketa hau ezin da egin aldi berean karaktere bat itsuki trukatuta.",
   "ctaText": "Ireki bihurgailua"
  },
  "body": [
   {
    "h2": "Lehenik: forma sinplifikatu bat, zenbait tradizional",
    "ps": [
     "Sinplifikazioak karaktere tradizional batzuk forma sinplifikatu bakar batean bildu zituen. Alderantziz egitean, karaktere sinplifikatu bat hainbat tradizionali dagokie, eta horien artean aukeratzea zerekin parekatuta dagoenaren araberakoa da:",
     "Karaktereak banan-banan trukatzeak guztiak gauza berdinean biltzen ditu eta kasu guztiak oker ateratzen ditu. **Hitz bidez** ebaztea da bereizten dituena — taulak OpenCC-renak dira, esaldiak karaktere bakarren aurretik parekatuz. Adibidez:"
    ]
   },
   {
    "h2": "Bigarrenik: Taiwan eta Hong Kong ez dira gauza bera",
    "ps": [
     "Geruza bat gehiago dago tradizionalera bihurtu ondoren: hitz bera desberdin idazten da Taiwanen eta Hong Kongen. \"Software\" hitza gauza bat da Taiwanen eta beste bat Hong Kongen, eta Taiwanek bere hitza erabiltzen du \"informazioa\" adierazteko.",
     "Horregatik dira norabide bereiziak. Taiwandar tradizionalak \"hitzez aldatzea\" eta \"glifoak soilik\" ere bereizten ditu — glifoek soilik lehendik duzun hiztegia mantentzen dute, eta hitzak aldatzeak eskualdeko terminoak ere aldatzen ditu. Hong Kongek bere norabide propioa du."
    ],
    "img": {
     "file": "hanconv-dir",
     "alt": "Bihurtu txartelera: helmugako goitibeherako menuan \"Sinplifikatua → Taiwandar tradizionala (hitzak aldatuta)\" ageri da",
     "cap": "Taiwanek hitz-aldaketak edo glifoak soilik eskaintzen ditu; Hong Kongek bere norabide propioa du"
    }
   },
   {
    "h2": "Hirugarrenik: elkarrizketa soilik ukitu behar da",
    "ps": [
     "Azpititulu-fitxategi bat ez da elkarrizketa soilik. Indize-zenbakiak, denborak eta ASS estilo lerroak ere hor daude, eta horietako karaktere bat bera ere ez litzateke bihurtu behar — ASS estilo lerroak batez ere, elkarrizketa gisa tratatzen diren unean bertan huts egiten duten zuzentarau ingelesak dituztelako.",
     "Beraz, bihurketa formatuaren arabera aztertu ondoren gertatzen da: SRT, VTT, ASS eta TXT formatuek zein zati den elkarrizketa identifikatzen dute, eta haren barruko karaktereak soilik bihurtzen dira. Denborak eta estiloak ukitu gabe irauten dute, berregiteko formaturik gabe."
    ],
    "img": {
     "file": "hanconv-out",
     "alt": "Eremuaren emaitza: bihurtutako azpititulua eta aldatutako lerro kopurua erakusten duen estatistika-barra",
     "cap": "Estatistika-barrak zenbat lerro aldatu diren erakusten du; formatua bere horretan gordetzen da"
    }
   },
   {
    "h2": "Sinplifikatura itzultzea: kontuz ibili",
    "ps": [
     "Tradizionala sinplifikatura bihurtzeak ere **zein aldaera tradizionaletatik zatozen** adieraztea eskatzen du: generikoa, Taiwandar eta Hong Kong hiru bide desberdin dira, eskualdeko hiztegia hitz generikora leheneratu behar delako hura bihurtu ahal izan aurretik. Okerreko norabidea aukeratzen baduzu, eskualdeko hiztegiak irteera sinplifikatuan bizirik irauten du.",
     "Bederatzi norabideen talde beherekoa da atzera bihurtzen duena: tradizionala → sinplifikatua, Taiwandarra → sinplifikatua, Hong Kongekoa → sinplifikatua."
    ]
   },
   {
    "h2": "Erlazionatutako tresnak eta gidak",
    "ps": [
     "Gida osoa — [[Nola bihurtu azpititulu sinplifikatuak eta tradizionalak|/guides/hanconv.html]]; behar duzun bakarra sinplifikatua tradizionalera bihurtzea bada — [[Bihurtu azpititulu sinplifikatuak tradizionalera|/guides/srt-simplified-to-traditional.html]]; beste hizkuntza batera itzultzeko, [[Azpitituluen itzulpena|/translate.html]]."
    ]
   }
  ]
 },
 "split": {
  "seo": {
   "title": "Azpitituluak zatitu eta elkartzea – Moztu blokearen arabera, kateatu ordenan – AI-SRTSub",
   "desc": "Moztu fitxategi bat segmentutan iraupenaren edo sekuentzia kopuruaren arabera, bakoitza hutsetik berrabiarazi, edo kateatu zenbait fitxategi ordenan edo tartekatu denbora-lerroaren arabera. Sekuentzia-zenbakiak berriro numeratu dira, testua ukitu gabe.",
   "h1": "Nola zatitu eta elkartu azpitituluak",
   "intro": "Moztu azpititulu-fitxategi luze bat segmentutan, edo elkartu barreiatutako zenbait fitxategi bakar batean. Mozketa beti sarrera-muga batean gertatzen da — esaldi bat ez da inoiz erdiz moztu.",
   "ctaText": "Ireki zatiketa eta elkarketa"
  },
  "body": [
   {
    "h2": "Zer egiten du tresna honek",
    "ps": [
     "Pasarteak zatitzeak, segmentuak zatitzeak eta iturriak konbinatzeak bat-etorriz ezak berdinarekin topo egiten dute azpititulu-blokeen eta bideo-blokeen artean: fitxategi bat moztu behar da edo zenbait konbinatu. Orrialde honek biak kudeatzen ditu, fitxa bana bakoitzeko."
    ]
   },
   {
    "h2": "Lehenik eta behin, aukeratu moztu edo elkartu",
    "ps": [
     "Bi fitxa goialdean: **Zatitu: fitxategi bat segmentutan** eta **Elkartu: zenbait fitxategi bakar batean**. Beheko bigarren urratseko aukerak zure aukerarekin aldatzen dira.",
     "\"1 Gehitu azpitituluak\" atalean fitxategi bat kargatzen duzu edo testua itsasten duzu; okerrekoa aukeratu baduzu, egin klik \"Garbitu\" aukeran. Orrialde honek UTF-8 soilik irakurtzen du — kodetzea hondatuta badago (galdera-marken edo koadroen horma bat) joan [[Testu hondatuaren konponketa|/repair.html]] atalera lehenik."
    ],
    "img": {
     "file": "split-mode",
     "alt": "Zatitzeko eta elkartzeko orrialdearen goialdeko bi fitxak",
     "cap": "Moztu eta elkartu bi fitxa dira; bigarren urratseko aukerek zure aukerari jarraitzen diote"
    }
   },
   {
    "h2": "Nola moztu",
    "ps": [
     "\"2 Nola moztu\" atalean, aukeratu oinarria: **iraupena** (segmentu bat X minutu behin) edo **sekuentzia-kopurua** (segmentu bat X sekuentzia behin), eta sartu zenbaki bat.",
     "Markatu \"Berrabiarazi segmentu bakoitza 0:00ean\" eta sortutako segmentu bakoitzak hutsetik kontatzen du — erabili hau pasarteak kargatzen dituzunean eta segmentu bakoitza erreproduzitzaile bati bere aldetik ematen diozunean. Utzi markatu gabe jatorrizko denbora-markak mantentzeko, segmentu bakoitza jatorrizko bideoaren posizioarekin bat etor dadin.",
     "Mozketa sekuentzia-mugetan bakarrik gertatzen da: oso luzea den azpititulu batek mozteko puntua gainditzen duenean, sekuentzia osoa lehenagoko segmentuan geratzen da."
    ],
    "img": {
     "file": "split-cut",
     "alt": "Iraupenaren eta sekuentzia-kopuruaren aukerak berrabiarazi-hutsean etengailuarekin zatiketa-orrialdean",
     "cap": "Moztu iraupenaren edo sekuentzia-kopuruaren arabera, eta aukeran berrabiarazi segmentu bakoitza 0:00ean"
    }
   },
   {
    "h2": "Nola elkartu",
    "ps": [
     "\"2 Nola elkartu\" atalean, aukeratu metodoa: **Kateatu ordenan** aukerak ondorengo fitxategia mugitzen du lehenagokoa amaitu eta gero hasteko, segmentuen arteko gainjartzerik gabe; **Tartekatu denbora-lerroaren arabera** aukerak fitxategi bakoitzaren jatorrizko denbora-markak mantentzen ditu eta hasiera-denboraren arabera ordenatzen du.",
     "Erabili kateatu ordenan fitxategiak pasarte baten lehen eta bigarren erdia direnean, edo bereizita zuzendutako erdiak berriro elkartu behar direnean; erabili tartekatu denbora-lerroaren arabera fitxategiak pantailan elkarrekin egon behar dutenean, hala nola jatorrizko pista bat eta itzulitako pista bat.",
     "Elkarketa baten ondoren, sekuentzia-zenbakiak automatikoki berriro numeratzen dira eta elkarrizketaren hitz bat bera ere ez da aldatzen."
    ],
    "img": {
     "file": "split-join",
     "alt": "Kateatu ordenan eta tartekatu denbora-lerroaren arabera aukerak elkarketa-orrialdean",
     "cap": "Kateatu ordenan aukera pasarte baten bi erdientzat egokia da; tartekatu denbora-lerroaren arabera aukera jatorrizko eta itzulitako pista batentzat egokia da"
    }
   },
   {
    "h2": "Emaitza eramatea",
    "ps": [
     "Eskuineko \"3 Emaitza\" atalak **SRT** eta **VTT** esportatzen ditu; egin klik \"Deskargatu\" edo \"Kopiatu\" aukeran.",
     "Zatitzean, \"Deskargatu segmentu guztiak\" erabil dezakezu, moztutako segmentu bakoitza aldi berean gordetzen duena segmentu bakoitzeko klik bat egin beharrean."
    ],
    "img": {
     "file": "split-out",
     "alt": "SRT/VTT formatuaren aukera deskargatzeko eta segmentu guztiak deskargatzeko botoiekin emaitzaren eremuan",
     "cap": "Zatiketaren emaitzak segmentuz segmentu deskarga daitezke; elkartutako fitxategi bat zuzenean deskargatzen edo kopiatzen da"
    }
   },
   {
    "h2": "Zer geratzen den ukitu gabe",
    "ps": [
     "Elkarrizketaren karaktere bat bera ere ez da aldatzen. Orrialde honek zein sekuentzia zein segmentutakoak diren eta nola numeratuta dauden soilik aldatzen du; sarreren edukiek bere horretan jarraitzen dute.",
     "\"Kateatu ordenan\" aukerarekin, ondorengo fitxategien denbora-markak osorik mugitzen dira — horixe eskatzen du elkartzeak; \"Tartekatu denbora-lerroaren arabera\" aukerarekin, jatorrizko denbora-marka guztiak gordetzen dira."
    ]
   },
   {
    "h2": "Ohiko galderak",
    "ps": [
     "**Zer gertatzen da azken segmentua oso laburra amaitzen bada?** Hori normala da. Segmentu oso bat betetzen ez duen soberakina bere segmentu bihurtzen da betegarri jarri beharrean.",
     "**Mozteko puntua gainditzen duen esaldi bat zatituko al da?** Ez. Mozketak sarrera-mugetan bakarrit gertatzen dira, eta marra gurutzatzen duen sekuentzia lehenagoko segmentuan geratzen da.",
     "**Tartekatu ondoren, nola ordenatzen dira denbora berdinak dituzten bi sekuentzia?** Hasiera-denboraren arabera; hasiera-denborak berdinak direnean, fitxategiak gehitu dituzun ordena mantentzen da.",
     "**ASS zatitu daiteke?** Orrialde honek SRT eta VTT kudeatzen ditu. Bihurtu ASS SRT edo VTT formatura [[Formatuaren bihurketa|/convert.html]] erabiliz lehenik."
    ]
   },
   {
    "h2": "Pribatutasuna",
    "ps": [
     "Azpitituluak arakatzailean bakarrik prozesatzen dira: ez da ezer kargatzen eta ez da ezer zerbitzari batetik igarotzen. Itxi orrialdea eta edukia desagertu egiten da."
    ]
   },
   {
    "h2": "Erlazionatutako tresnak eta gidak",
    "ps": [
     "Bi fitxategi hizkuntza biko piste batean konbinatzeko (pasarte batean baino gehiago) erabili [[Euskarri bikoitzeko bat-egitea eta efektu bereziak|/guides/merge.html]]; denbora-lerro osoa gaizki badago, joan [[Denbora-lerroaren doikuntza|/shift.html]] atalera; denboraldi oso baterako, erabili [[Sortako bihurketa|/batch.html]]; eta exekutatu [[Azpitituluen kalitate-kontrola|/qc.html]] amaitzen duzunean."
    ]
   }
  ]
 },
 "split-bilingual-subtitles": {
  "seo": {
   "title": "Banatu azpititulu bikoitzak bi pistatan – AI-SRTSub",
   "desc": "Banatu azpititulu bikoitzak bi fitxategitan: jatorrizko eta itzulpen pistak bereizita deskargatzen dira izen bereiziekin; bi formak ezagutzen dira. – AI-SRTSub",
   "h1": "Banatu azpititulu bikoitzak bi pistatan",
   "intro": "Azpititulu bikoitz bat bi fitxategi bihurtzen da — “jatorrizkoa” eta “itzulpena”: kargatu, aukeratu bitan banatzea, deskargatu bakoitza, denbora-lerroak bere horretan mantenduta.",
   "ctaText": "Banatu azpititulu bikoitzak"
  },
  "body": [
   {
    "h2": "Noiz behar duzu banatu",
    "ps": [
     "Zure erreproduzitzaileak hizkuntza bakarreko pista bat bakarrik nahi du; edo itzulpen-pista nahi duzu berriz itzultzeko, edo jatorrizko pista beste bertsio itzuli batekin parekatzeko. Azpititulu bikoitza **bi lerroko sekuentzia bat** da (jatorrizkoa lerro batean, itzulpena bestean) edo **denbora-lerro bera partekatzen duten bi sekuentzia bereizi** — biak bana daitezke."
    ]
   },
   {
    "h2": "Non egin",
    "ps": [
     "Ireki [[Azpititulu bikoitzen kentzailea|/bilingual.html]] eta jaregin zure azpititulua. Tresnak forma bikoitza automatikoki detektatzen du: bi lerroko sekuentzia bat idazketa-sistemaren arabera banatzen da, denbora-lerro bereko bi sekuentzia ordenaren arabera. Aukeratu **Banatu bitan** moduaren goitibeherako menuan eta egin klik Hasi (edo utzi berriro exekutatzen automatikoki). Emaitzaren eremuak bi zati erakusten ditu: `.orig` etiketatutakoa jatorrizko pista da, `.dst` etiketatutakoa itzulpen-pista da — egin klik “Deskargatu” aukeran bakoitzarentzat; bi pistek denbora-lerro zehatz bera partekatzen dute."
    ],
    "img": {
     "file": "bilingual-split",
     "alt": "Banaketaren emaitza: jatorrizko pista eta itzulpen-pista bi zatitan, bakoitza deskargatzeko botoi batekin",
     "cap": "Banatu bitan: .orig jatorrizko pista + .dst itzulpen-pista, bakoitza bere aldetik deskargatuta"
    }
   },
   {
    "h2": "Ohiko akats bat",
    "ps": [
     "**Alfabeto bera partekatzen duten hizkuntzetako bi lerroko sekuentzia bat (esaterako, ingelesa eta frantsesa) ezin da banatu.** Pistak idazketa-sistemaren arabera bereizten direnean, horiek sistema bakar gisa hartzen dira eta elebakar gisa tratatzen dira. Bihurtu halako edukia denbora-lerro bereko B formara lehenik, eta gero banatu; bi sekuentziako formak denbora-lerroaren arabera parekatzen du eta ez dio hizkuntzari erreparatzen. Bi Formen nondik norakoak ezagutzeko, ikusi [[Azpititulu bikoitzak egiteko bi modu|/guides/make-bilingual-subtitles.html]]."
    ]
   }
  ]
 },
 "srt-file-format": {
  "seo": {
   "title": "Zer da SRT fitxategi bat? Nola ireki eta editatu – AI-SRTSub",
   "desc": "SRT (SubRip) azpititulu fitxategien egitura: zenbakia, denbora-lerroa eta testua. Nola ireki testu-editore batean, zergatik baztertzen duen erreproduzitzaile batek eta nola konpondu testu nahasia eta denbora-marken akatsak.",
   "h1": "SRT azpititulu fitxategiaren formatuaren azalpena",
   "intro": "SRT azpititulu formatu unibertsalena da: testu hutsa, egitura sinplea eta ia edonon onartua. Gida honek bere egitura aztertzen du, nola ireki eta ohiko akatsak nola konpondu erakusten du.",
   "ctaText": "Ireki azpititulu bihurgailua"
  },
  "body": [
   {
    "h2": "Nolakoa den SRT fitxategi bat",
    "ps": [
     "SRT (SubRip) testu hutsa da; edonolako testu-editorek ireki dezake. Sekuentzia bakoitzak hiru zati ditu: **zenbaki-lerroa**, **denbora-lerroa** eta **testua**, lerro hutsez bereizita. Denbora-lerroak hau dio: `00:00:01,000 --> 00:00:03,500` — kontuan izan **koma** bat dagoela milisegundoen aurretik, ez puntua."
    ],
    "img": {
     "file": "convert-upload",
     "alt": "Kargatze-eremua: zenbakiak eta denborak erakusten dituen SRT fitxategi kargatua",
     "cap": "SRT sekuentziaren hiru zati estandarrak: zenbakia, denbora-lerroa eta testua"
    }
   },
   {
    "h2": "Nola ireki",
    "ps": [
     "Edukia irakurtzeko: egin klik eskuineko botoiaz eta ireki edozein **testu-editorekiko**. Bideo batekin erabiltzeko: aldatu fitxategiaren izena **bideoaren fitxategi-izenarekin bat et Dadin** (luzapena kontuan hartu gabe), jarri biak karpeta berean, eta VLC, PotPlayer edo mpv bezalako erreproduzitzaileek automatikoki kargatuko dute; erreprodukzio-leihoaren gainera arrastatu ere egin dezakezu."
    ]
   },
   {
    "h2": "Bazterketak eta testu nahasia konpontzea",
    "ps": [
     "**Karaktere nahasiak**: fitxategia ez da UTF-8 — gorde berriro UTF-8 gisa zure editorean. **Ez da ezer agertzen**: egiaztatu denbora-lerroak koma bat erabiltzen duela (ez punturik) eta sekuentzia-zenbakiak ez daudela hautsita (erreproduzitzaile gehienek hutsuneak onartzen dituzte, batzuek ez). **Fitxategia HTML edo JSON da**: deskargatzeko iturria okerra zen; deskargatu berriro."
    ]
   },
   {
    "h2": "Zer eduki dezakeen eta zer ez SRTk",
    "ps": [
     "SRTk testua eta denbora bakarrik garraiatzen ditu: **estilorik gabe** (letra-tiporik, kolorerik gabe), **kokapenik gabe** (pantailaren zein lekutan), **efekturik gabe**. Horiek ASS behar dute — ikusi [[SRT eta ASS arteko bihurketa|/guides/srt-to-ass.html]]. Formatu guztien alderaketa bat ikusteko, ikusi [[azpititulu formatuen alderaketa|/guides/subtitle-format-comparison.html]]."
    ]
   }
  ]
 },
 "srt-fps-converter": {
  "seo": {
   "title": "SRT FPS Bihurgailua – Aldatu Azpitituluen Fotograma-Tasa – AI-SRTSub",
   "desc": "Filmak 24 fps ditu, telebistak 25 fps, eta azpitituluak gero eta gehiago atzeratzen dira: eskalatu denbora-lerroa 0.96rekin behin eta fitxategi osoa xede-tasara egokituko da.",
   "h1": "Azpitituluen Fotograma-Tasaren Bihurketa: 24fps-tik 25fps-ra",
   "intro": "Erabili 24 fps-ko film baten azpitituluak 25 fps-ko iturri batean, eta minutu bakoitzean segundo bat baino gehiago galduko dute; amaierako kredituetarako minutu batzuk atzeratuta egongo dira. Eskalatze bakar batek konpontzen du.",
   "ctaText": "Ireki denbora-editorea"
  },
  "body": [
   {
    "h2": "Zergatik sortzen duen desfasajea fotograma-tasa desegokiak",
    "ps": [
     "Fotograma-tasa bihurtzeak **denbora-tarte bera bi erloju desberdinen pean** irakurtzen du berriro. 24fps-ko 100 minutuko film batek 6000 s × 24 = **144,000 frames** ditu; 25fps-ko iturri batean 144,000 fotograma horiek 5760 segundotan erreproduzitzen dira — **96 minutes**. Film osoa 4 minutu laburragoa da, beraz, 50. minutuko sekuentzia 2 minutu inguru beranduago agertzen da, eta amaierako kredituen azpititulua ez da inoiz agertzen."
    ]
   },
   {
    "h2": "Formula eta faktore arruntak",
    "ps": [
     "Xede-tasa zati jatorrizko tasa = biderkatzailea. **24-tik 25-ra: bider 0.96** (24÷25); alderantziz, 25-tik 24ra: 1.0417. **25-tik 23.976ra: bider 0.959**; alderantziz: 1.0427. Denbora-editorean gehitu **Eskalatu tasaren arabera** urrats bat eta sartu faktorea balioaren koadroan."
    ],
    "img": {
     "file": "shift-step-rate",
     "alt": "Eskalatu tasaren arabera urratsa 0.96 sartuta duela",
     "cap": "0.96, 24÷25 da; orrialdeko argibideak fotograma-tasaren bihurketa erabilera arrunt gisa aipatzen du gainera."
    }
   },
   {
    "h2": "Bi tasak ezagutzen ez dituzunean",
    "ps": [
     "Iturriaren fotograma-tasa aurkitzen ez baduzu, ez asmatu faktorea — erabili **bi aingura** horren ordezkari gisa: hartu lehen eta azken sekuentziaren benetako agerpen-denbora bi puntu gisa, eta tarteko guztia proportzionalki luzatuko da. Ikusi [[azpitituluak gero eta desinkronizatuago egotea|/guides/subtitles-out-of-sync.html]]."
    ]
   },
   {
    "h2": "Ondoren zer egiaztatu behar den",
    "ps": [
     "Eskalatzeak hasiera eta amaiera guztiak mugitzen ditu; sekuentziaren iraupenak faktore berberaz luzatzen dira. Exekutatu ondoren, egiaztatu bi muturrak: lehen sekuentzia (jatorrizko akats txikiena) eta azkena (handiena). Bi muturrek bat badatoz, tarteko guztia ere bai."
    ]
   }
  ]
 },
 "srt-simplified-to-traditional": {
  "seo": {
   "title": "Bihurtu Txinera Sinplifikatuko Azpitituluak Tradizionalera – Taiwan edo Hong Kong – AI-SRTSub",
   "desc": "Bihurtu txinera sinplifikatuko azpitituluak tradizionalera: hautatu Taiwangoa (eskualdeko hiztegiarekin edo gabe) edo Hong Kongekoa. Bat-asko baliokidetzak hitzaren arabera ebazten dira. Elkarrizketa bakarrik aldatzen da; denborak bere horretan geratzen dira.",
   "h1": "Bihurtu txinera sinplifikatuko azpitituluak tradizionalera",
   "intro": "Txinera sinplifikatuko azpititulu batek ikusle taiwandar edo hongkonetar batengana iritsi behar duenean, bihurtzea besterik ez du behar; baina bi eskualdeek gauza desberdinak nahi dituzte, eta norabide okerra aukeratzeak bertakoek erabiltzen ez dituzten hitzak ekarriko dizkizu.",
   "ctaText": "Bihurtu azpititulu hau"
  },
  "body": [
   {
    "h2": "Beharra",
    "ps": [
     "Zure azpitituluak txinera sinplifikatua dira eta Taiwaneko edo Hong Kongeko ikusleengana iritsi behar dute. Karaktereen banakako zuzenketak egitea ez da bideragarria —atal bakar batek ehunka sekuentzia ditu—, eta bi eskualdeek ez dute testu tradizional bera nahi: hiztegia desberdina da, eta norabide okerrak bertako inork erabiliko ez lukeen hizkera sortzen du."
    ]
   },
   {
    "h2": "Non egin",
    "ps": [
     "Ireki [[Sinplifikatuaren eta tradizionalaren arteko bihurketa|/hanconv.html]], arrastatu azpititulua barnera eta hautatu \"Bihurtu hona\" atalean sinplifikatuaren eta tradizionalaren arteko norabideetako bat: tradizional generikoa, Taiwangoa (hizkera aldatuta), Taiwangoa (glifoak soilik) edo Hong Kongekoa. Bihurketa berehala gertatzen da eta emaitzen eremuak azpititulu amaitua erakusten du, deskargatzeko prest.",
     "**Ikusle taiwandarrentzat**: hautatu \"Taiwangoa (hizkera aldatuta)\" eskualdeko hiztegia ere aldatu behar bada —\"software\" eta \"informazioa\" hitzak haien baliokide taiwandar bihurtzen dira— edo \"Taiwangoa (glifoak soilik)\" karaktere-formak aldatzea nahi baduzu jatorrizko hizkera mantenduz. **Ikusle hongkonetarrentzat**: hautatu \"Hong Kong\", non \"software\" beste forma batekin idazten den."
    ],
    "img": {
     "file": "hanconv-dir",
     "alt": "Bihurtu hona txartela: helmugako goitibeherako menua \"Sinplifikatua → Taiwango tradizionala (hizkera aldatuta)\" erakusten duena",
     "cap": "Taiwan eta Hong Kong hiztegi desberdina duten bi norabide bereizi dira"
    }
   },
   {
    "h2": "Ohiko arazoak",
    "ps": [
     "**Ez izan beldurrik bat-asko baliokidetzei**: \"garbitu\", \"lehor\" eta \"zuhaitz-enbor\" hitzetako karaktere sinplifikatu bera karaktere tradizional desberdinetara egokitzen da. Taulek esaldi bakoitzaren arabera ebazten dute hau, dena karaktere bakar batean ez laburtzeko.",
     "**Elkarrizketa bakarrik bihurtzen da**: denborak, indize-zenbakiak eta ASS estilo-lerroak ukitu gabe geratzen dira, beraz, emaitza erabiltzeko prest dago.",
     "**Ez da ezer aldatu? Egiaztatu izutu aurretik**: estatistika-barrak aldatutako 0 lerro salatzen baditu, fitxategiak ez du txinerazko karaktererik edo formatua gaizki antzeman da — egiaztatu \"Antzemandako formatua\" kargatu duzunarekin bat datorrela."
    ]
   },
   {
    "h2": "Erlaitza",
    "ps": [
     "Bederatzi norabideen azalpen osoa — [[Nola bihurtu azpititulu sinplifikatuak eta tradizionalak|/guides/hanconv.html]]; zergatik den karaktereak trukatzea baino gehiago — [[Sinplifikatua eta tradizionala ez da karaktere-truke soil bat|/guides/simplified-traditional-chinese.html]]; tradizionaletik sinplifikaturako itzulera hemen ere aurki daiteke: [[Sinplifikatuaren eta tradizionalaren arteko bihurketa|/hanconv.html]]."
    ]
   }
  ]
 },
 "srt-to-ass": {
  "seo": {
   "title": "SRT-tik ASSrako Bihurgailua – Bihurtu Azpitituluak Sarean – AI-SRTSub",
   "desc": "Bihurtu SRT azpitituluak ASS (Advanced SubStation Alpha) formatura 1920×1080ko mihise batekin eta lehenetsitako estilo garbi batekin, edozein erreproduzitzailetan zuzenean kargatzeko moduan. Zure arakatzailean exekutatzen da.",
   "h1": "SRT-tik ASSra",
   "intro": "Bihurtu SRT azpitituluak ASS formatura: askatu fitxategia, hautatu ASS eta deskargatu. 1920×1080ko mihise bat eta lehenetsitako estilo garbi bat sortuko dira zuretzat.",
   "ctaText": "Bihurtu SRT → ASS"
  },
  "body": [
   {
    "h2": "Noiz behar duzun ASS",
    "ps": [
     "Erabili ASS kargatutako azpititulu batek **kokapen eta estilo kontrol hobea** behar duenean: SRTk ez dituen kontzeptuak garraiatzen ditu: mihisearen tamaina, letra-tipoen estiloak, lerrokatzea. mpv, PotPlayer, VLC eta erreproduzitzaile gehienek zuzenean onartzen dute."
    ]
   },
   {
    "h2": "Nolakoa den irteera",
    "ps": [
     "Tresnak goiburu estandar bat berreraikitzen du: **1920×1080ko mihisea**, itzulbiratze adimenduna (WrapStyle 0) eta Estilo lehenetsi bakar bat — Arial 54, testu zuria ertz beltzarekin, behealdean zentratuta. Sekuentzia bakoitzak estilo ഇത് erabiltzen du."
    ],
    "img": {
     "file": "convert-opt-ass",
     "alt": "Irteerako formatuaren goitibeherako menua ASS - Advanced SubStation hautatuta duela",
     "cap": "Hautatu ASS irteera gisa eta deskargatu bihurtu ondoren"
    }
   },
   {
    "h2": "Estiloak mantentzen dira?",
    "ps": [
     "SRTk ez du estilo kontzepturik hasieratik. Eta zure iturria jatorriz ere ASS bada, bihurtzeak **estilo lehenetsia berreraikitzen du eta ez du jatorrizkoa mantentzen** — erabili azpititulu-editore espezializatu bat ASS estiloa aldatzeko. Denborak eta testuak ez dute aldaketarik jasaten."
    ]
   }
  ]
 },
 "srt-to-excel": {
  "seo": {
   "title": "Bihurtu Azpitituluak Excelera – Zuzendu Errenkadaz Errenkada – AI-SRTSub",
   "desc": "Esportatu SRT azpitituluak Excelera: errenkada bat sekuentziako lau zutabetan banatuta — indizea, hasiera, amaiera eta testua. Denbora testu gisa mantentzen da, lerro-jauziak osorik, eta editatutako orria berriro azpititulu bihur daiteke.",
   "h1": "Bihurtu azpitituluak Excelera",
   "intro": "Testu-editore batean ehunka sekuentzia zuzentzea nekatzailea da. Excelen sekuentzia bakoitza errenkada bat da, beraz, iragaztea, iruzkinak egitea eta bilatu-eta-ordezkatu aukerak eskuragarri daude — eta aldaketak zure SRTra itzul daitezke.",
   "ctaText": "Esportatu Excelera"
  },
  "body": [
   {
    "h2": "Beharra",
    "ps": [
     "Zuzenketak egitea, hitzak masiboki aldatzea edo lana hainbat pertsonen artean banatzea askoz azkarragoa da kalkulu-orri batean testu soilean baino. SRT bera testu hutsa da, baina bere sekuentzia-egiturak (indizea, denborak, elkarrizketa) ezin hobeto bat egiten du lau zutabekin."
    ]
   },
   {
    "h2": "Non egin",
    "ps": [
     "Ireki [[Azpitituluak ⇄ taula bihurketa|/table.html]], aldatu modua \"talera\" (to table), arrastatu SRT-a, eta aurrebista sekuentziako errenkada batez eta lau zutabex beteko da — indizea, hasiera, amaiera, testua. Sakatu \"Deskargatu Excel (.xlsx)\" eta zurea da. VTT formatuak ere modu berean onartzen dira.",
     "Edizioarekin amaitzen duzunean: aldatu modua \"azpititulura\" (to subtitle), sartu orria berriro, eta SRT bat lortuko duzu berriro. Araua hasiera, amaiera eta testurako hiru zutabe erabiltzea da (ingelesezko Start / End / Text ere balio dute), edozein ordenatan."
    ],
    "img": {
     "file": "table-prev",
     "alt": "Taularen aurrebista: SRT sekuentzia bakoitza lau zutabetako errenkada gisa, estatistika-barrarekin",
     "cap": "Lau zutabetan antolatutako SRT-a, modu berean alderantziz bihurtzeko moduan"
    }
   },
   {
    "h2": "Ohiko arazoak",
    "ps": [
     "**Konpondu lehenik kodeketa apurtua**: orrialde honek UTF-8 bakarrik irakurtzen du. Galdera-marken edo karratuen pantaila batek esan nahi du lehenik [[Mojibake-ren konponketa|/repair.html]] erabili behar duzula.",
     "**CSV edo xlsx**: aukeratu .xlsx fitxategia Excelera doanean, denbora-zutabea berriro ez formatzeko; CSV eramangarriagoa da, baina baliteke Excel-ek beste zerbait bezala irakurtzea — ezarri denbora-zutabea \"Testua\" gisa hori gertatzen bada.",
     "**ASS-ek ez du funtzionatzen**: ASS-ek estilo-direktibak dituen arte, bihurtu SRTra taulan sartu aurretik."
    ]
   },
   {
    "h2": "Erlaitza",
    "ps": [
     "Bi norabideko gida osoa — [[Nola bihurtu azpitituluak Excelera / CSVra|/guides/table.html]]; ondoren itzultzea — [[Azpitituluen itzulpena|/translate.html]]; azken azterketa banatu aurretik — [[Azpitituluen kalitate-kontrola|/qc.html]]."
    ]
   }
  ]
 },
 "srt-to-vtt": {
  "seo": {
   "title": "SRT-tik VTTra Bihurgailua – Bihurtu Azpitituluak Sarean – AI-SRTSub",
   "desc": "Bihurtu SRT azpitituluak VTT (WebVTT) formatura HTML5 track elementetarako. Denbora-marken komak automatikoki puntu bihurtzen dira. Nabigatzailean exekutatzen da, ez da ezer kargatzen.",
   "h1": "SRT-tik VTTra",
   "intro": "Bihurtu SRT azpitituluak VTT: jarri fitxategia, hautatu VTT eta deskargatu. Denbora-markak web formatura egokitzen dira, dena zure nabigatzailean.",
   "ctaText": "Bihurtu SRT → VTT"
  },
  "body": [
   {
    "h2": "Noiz behar duzun VTT",
    "ps": [
     "Web erreproduzitzaileek (HTML5 `` elementuak), YouTube-ko azpitituluen kargak eta nabigatzailean oinarritutako erreproduzitzaile gehienek **VTT (WebVTT)** baino ez dute onartzen, ez SRT. SRT baino ez baduzu, bihurketa bakar batek funtziona dezan lortuko du."
    ]
   },
   {
    "h2": "Bi formatuen arteko aldea",
    "ps": [
     "Edukia ia berdina da; hiru gauza idazten dira ezberdin: **WEBVTT goiburuko lerroa** (beharrezkoa VTTn); denbora-marketako **milisekundo-bereizlea** — SRTk koma erabiltzen du (00:00:01,000) eta VTTk puntua (00:00:01.000); eta VTTk SRTk ez dituen NOTE eta STYLE blokeak onartzen ditu."
    ],
    "img": {
     "file": "convert-result",
     "alt": "WEBVTT goiburua eta puntudun denbora-markak erakusten dituen bihurketa-emaitza",
     "cap": "Bihurtutako VTT-a: WEBVTT lehen lerroa, puntudun denbora-markak"
    }
   },
   {
    "h2": "Nola bihurtu",
    "ps": [
     "Ireki [[bihurgailua|/convert.html]], jarri SRT-a, hautatu **VTT - WebVTT** irteera gisa, eta gero bihurtu eta deskargatu. Sekuentziaren ordena, denbora-balioak eta lerro anitzeko testua bere horretan mantentzen dira; sintaxia bakarrik aldatzen da. Alderantziz egin nahi duzu? Ikusi [[VTT-tik SRTra|/guides/vtt-to-srt.html]]."
    ]
   }
  ]
 },
 "subtitle-format-comparison": {
  "seo": {
   "title": "SRT vs VTT vs ASS vs SBV vs LRC – Zein Azpititulu Formatua – AI-SRTSub",
   "desc": "Bost azpititulu-formatu arrunten gaitasunen konparaketa: testuaren estiloa, posizionamendua, denboraren zehaztasuna, bakoitza nora dagokien eta haien artean nola bihurtu.",
   "h1": "Azpititulu Formatu bat Aukeratzen: SRT / VTT / ASS / SBV / LRC",
   "intro": "Bost formatutan gordetako azpititulu berberak bost helburu ezberdin betetzen ditu. Gida honek formatu bakoitzak zer egin dezakeen eta haien artean nola mugitu alderatzen du.",
   "ctaText": "Ireki azpititulu-bihurgailua"
  },
  "body": [
   {
    "h2": "Aukeratu formatu bat esaldi batean",
    "ps": [
     "Erreproduzitzaile batean kargatzea, bateragarritasun maximoa → **SRT**; web erreproduzitzaileak (HTML5 track) edo YouTube-ko karga → **VTT**; letra-tipoak, koloreak, posizionamendua, efektuak → **ASS**; YouTubetik deskargatuta → **SBV** (bihurtu SRTra euskarria zabaltzeko); abestien letrak, lerroz lerro abestea → **LRC**."
    ],
    "img": {
     "file": "convert-opt",
     "alt": "Irteera-formatuaren goitibeherako menua: sei helburu-formatu",
     "cap": "Bihurgailuko sei esportazio-helburuek gida honetako formatu guztiak estaltzen dituzte"
    }
   },
   {
    "h2": "Gaitasunen konparaketa",
    "ps": [
     "**SRT**: testu arrunta + denbora, estilorik edo posizionamendurik gabe, bateragarritasunaren txapelduna. **VTT**: testua + denbora, nabigatzaileek berez onartzen dute, posizionamendua eta oinarrizko estiloa eraman ditzake, puntua milisekundoen aurretik. **ASS**: testua + denbora + estilo osoa (letra-tipoak, koloreak, inguruneak, posizionamendua, efektuak), denbora zentisegundoetaraino. **SBV**: Youtubeko azpititulu-formatu minimoa, hasiera eta amaiera lerro berean. **LRC**: letren formatua, hasierako orduak soilik, amaierako ordurik gabe, estilorik gabe."
    ]
   },
   {
    "h2": "Formatuen arteko bideak",
    "ps": [
     "Horietako edonork bi norabidetan bihurtzen du [[bihurgailua|/convert.html]] helbidean: irakurketak srt, vtt, ass (ssa barne), sbv, lrc, txt onartzen ditu; esportazioak srt, vtt, ass, sbv, lrc, txt onartzen ditu. Ohiko bide bakoitzak bere gida du: [[SRT-tik VTTra|/guides/srt-to-vtt.html]], [[VTT-tik SRTra|/guides/vtt-to-srt.html]], [[SRT-tik ASScra|/guides/srt-to-ass.html]], [[ASS-tik SRTra|/guides/ass-to-srt.html]], [[SBV-tik SRTra|/guides/sbv-to-srt.html]], [[LRC-tik SRTra|/guides/lrc-to-srt.html]]."
    ]
   },
   {
    "h2": "Bihurketek galtzen dutena",
    "ps": [
     "SRTra bihurtzean beti galtzen dira estiloa eta posizionamendua (SRTk ezin ditu gorde). Tresna honekin ASSra bihurtzean **lehenetsitako estilo bat berreraikitzen da eta ez da jatorrizkoa mantentzen**. LRC-tik SRTra igarotzeko amaiera-orduak bete behar dira (lerro bakoitzak hurrengoaren arte irauten du; azkenak 3 segundo lortzen ditu). Denbora-balioak eta testua berdin mantentzen dira norabide guztietan."
    ]
   }
  ]
 },
 "subtitle-garbled-characters": {
  "seo": {
   "title": "Non-tiratako Azpitituluak nondik datozkion – Antzeman eta Konpondu – AI-SRTSub",
   "desc": "Non-tiratako testuak irakurketa oker bat esan nahi du, ez hondatutako fitxategi bat. Ordezkapen-karaktereek, azentu dun letren hormek eta karaktere ilunen ilarek kausa bat adierazten dute.",
   "h1": "Non-tiratako azpitituluak nondik datozkion",
   "intro": "Byte berdinak UTF-8 gisa eta GBK gisa irakurrita guztiz desberdinak diren karaktere multzo bi bihurtzen dira. Zabor-testua zein urrats oker joan den frogatzen du.",
   "ctaText": "Ireki non-tiratakoak konpontzeko tresna"
  },
  "body": [
   {
    "h2": "Fitxategia ondo dago — gaizki irakurri zen",
    "ps": [
     "Azpititulu-fitxategi batek gordetzen duena byteak dira. Byteak karaktere bihurtzeak zein kodetzekotan idatzi ziren jakitea eskatzen du; horretan huts eginez gero, testu okerra lortzen da. Ez da byte bakar bat ere faltan fitxategian; irakurri berriro kodetze egokiarekin eta karaktereak itzuliko dira.",
     "Horrek lana bitan banatzen du: **zein kodetzekorekin hasi zen asmatzea**, eta **zure erreproduzitzaileak antzeman dezakeen kodetze gisa gordetzea**. Lehenengoa proben bidezko deskodetze eta puntuaziotik dator, bigarrena kopia bat gordetzetik. Arazo ezberdinak konpontzen dituzte."
    ]
   },
   {
    "h2": "Bost itxura, bost kausa",
    "ps": [
     "Testu okerra ez da ausazkoa — nola ikusten denak zerk eragin zuen salatzen du:"
    ],
    "img": {
     "file": "repair-diag",
     "alt": "Non-tiratako mota bakoitza zerrendatzen duen diagnosi-txartela",
     "cap": "Diagnosiak kausaren arabera sailkatzen ditu non-tiratakoak, dena batera pilatu beharrean"
    }
   },
   {
    "h2": "Zergatik ezin den ordezkapen-karaktere konpondu",
    "ps": [
     "Ordezkapen-karaktere hori muga-lerroa da. `` karaktereak byteak **aurreko urrats batean** (normalean fitxategia irakurri eta berriro gorde duen programa batzuetan) bota zirela esan nahi du, eta ez zela ezer erregistratu zer galdu zen. Une horretan ez dago atzerantz arrazoitzeko ezerrik — inork ezin du konpondu.",
     "Beraz, konponketa-orriak bi kasu ezberdin kudeatzen ditu. Kargatu fitxategia eta jatorrizko byteak osorik badaude, kodetze bakoitza probatzeko aukera emanez; itsatsitako testuak ordezkapen-karaktere badauka, argi eta garbi esaten du: \"ezzin da konpondu, mesedez kargatu jatorrizko fitxategia\".",
     "Alderantzizko kasua ere badago: edukia ezin hobeto irakurtzen da baina zure erreproduzitzaileak oraindik zaborra erakusten du. Fitxategia ez da errua duena — **erreproduzitzaileak kodetze okerra aukeratu zuen**. Testua editatzeak ez du balioko; gorde kopia bat BOMdun UTF-8 edo GBK gisa eta eman hori."
    ],
    "img": {
     "file": "repair-up",
     "alt": "Kargatzeko eremua: arrastatu eta jaregin eta itsatsi sarrera-puntu gisa",
     "cap": "Kargatu fitxategia ahal baduzu — byteak osorik egoteak konpontzeko zerbait esan nahi du"
    }
   },
   {
    "h2": "Konpontzen ari den bitartean zer alderatzen ari den",
    "ps": [
     "Tresnak kodetze sinesgarri guztiak probatzen ditu, ondoren emaitza bakoitza puntuatzen du: zer neurritan dagoen osatuta karaktere arruntez, azentu kateak edo sinbolo kateak ote dauden, eta CJK zatikoak karaktere ilunen hormak ote diren. Puntuaziorik onena lortzen duena zerrendaren goialdera doa.",
     "**Puntuaziorik ez bada argi eta garbi hobea, ez da ezer gomendatzen** — hobe da \"hau dagoen bezala irakurtzen da\" esatea hizkuntzaren antza soilik duen zerbaitekin engainatzea baino. Bitan hondatutako testuari (behin gaizki gordea, eta gero gaizki konpondua) atzeranzko ebazpenaren txanda gehigarri bat aplikatzen zaio hautagai nagusietan."
    ],
    "img": {
     "file": "repair-fix",
     "alt": "Puntuazioaren arabera sailkatutako hautagaien zerrenda, bakoitza bere kodetze-bikotearekin etiketatuta",
     "cap": "Puntuazioaren arabera sailkatutako hautagaiak — irabazle garbirik ez, gomendiorik ez"
    }
   },
   {
    "h2": "Kodetze egokia gordetzeak lana amaitzen du",
    "ps": [
     "Konpondutako testua zure erreproduzitzaileak ezagutzen duen kodetze gisa gorde behar da oraindik. Windows-eko erreproduzitzaileek normalean BOM-ean oinarritzen dira kodetzea antzemateko; beraz, **BOMdun UTF-8** da arazorik gutxien ematen duena; hardware zaharreko eta eskualdeko zenbait erreproduzitzailek GBK nahiago dute. UTF-8, UTF-8 (BOMdun), GBK, Big5, Shift_JIS edo EUC-KR aukera ditzakezu, eta zerbaitek ez badu balio beste bat aukeratzeko esango zaizu (GBK-k ezin du koreera eduki)."
    ],
    "img": {
     "file": "repair-out",
     "alt": "Emaitzaren eremua: gorde gisa kodetzearen goitibeherako menua eta deskargatzeko botoia",
     "cap": "Gorde erreproduzitzaileak ezagutzen duen zerbait bezala eta non-tiratakoak benetan konponduta geratuko dira"
    }
   },
   {
    "h2": "Erlazionatutako tresnak eta gidak",
    "ps": [
     "Urratsez urrats gida osoa — [[Nola konpondu azpititulu non-tiratakoak|/guides/repair.html]]; zer gordetzen duen benetan SRT fitxategi batek — [[Zer dago SRT fitxategi baten barruan|/guides/srt-file-format.html]]; kodetzea ondo dago baina edukia zikina da (ur-markak, iragarkiak, entzumen-urritasuneko etiketak) — [[Azpitituluen garbiketa|/clean.html]]."
    ]
   }
  ]
 },
 "subtitle-glossary": {
  "seo": {
   "title": "Termino-taulak: denboraldi bat, hiztegi bat – Noiz sortu – AI-SRTSub",
   "desc": "Termino-taula batek modu inkonsistentean itzulitako hitza konpontzen du: noiz sortu, denboraldi batean zehar nola berrerabili, eta zer ez eman hari.",
   "h1": "Termino-taulak: denboraldi bat koherente mantentzea",
   "intro": "Izen bat lehenengo atalean A denean eta zazpigarren atalean B, ikusleek bi pertsonaia direla pentsatzen dute. Termino-taula batek horixe galarazten du: gauzei nola deitzen zaien konpontzen du.",
   "ctaText": "Ireki terminoen ordezkapen multzoa"
  },
  "body": [
   {
    "h2": "Termino-taula batek inkonsistentzia konpontzen du",
    "ps": [
     "Azpitituluen idazkera-arazoak bi motatakoak dira: \"hitz hau gaizki itzulita dago\" eta \"hitz bera leku batetik bestera ezberdin itzulita dago\". Lehenengoa hiztegi-arazo bat da; bigarrena termino-taula bat zertarako den da.",
     "Bigarrena ohikoagoa eta antzematen zailagoa da: `Thor` \"Thor\" bihurtzen da lehenengo atalean eta \"Donar\" zazpigarrenean, eta atal bakoitza ondo ikusten da bere aldetik, serieak orokorrean ikusleari pertsonaia berri bat agertu zaiola pentsarazten dion bitartean. Termino-taula batek \"ekoizpen honek Thor deitzen dio\" arau exekutable bihurtzen du azpititulu-fitxategi osoari aldi berean aplikatuta."
    ]
   },
   {
    "h2": "Noiz merezi duen bat sortzea",
    "ps": [
     "Azpititulu-fitxategi guztiek ez dute termino-taula bat behar. Bat egiaztatzen duten kasuak normalean hauek dira:"
    ],
    "img": {
     "file": "glossary-rules",
     "alt": "Termino-taula batean kategoriaren arabera taldekatutako ordezkapen-arauak",
     "cap": "Erabili # iruzkinak arauak taldekatzeko, eta bat aldi baterako desaktibatzeko editatzen duzun bitartean"
    }
   },
   {
    "h2": "Taula bat denboraldi oso batean mantentzea",
    "ps": [
     "Termino-taula bat **inkrementalki** mantentzen da: finkatu izenak lehenengo atalean, ondoren gehitu arau bat termino berri bat agertzen den bakoitzean, eta denboraldia amaitzerako taula osatuta egongo da. Serie beraren hurrengo denboraldirako, hasi hortik.",
     "Idatzi arauak behar baino pixka bat zabalago — \"Thor\" aukeratu ondoren, gehitu \"Donar -> Thor\" ere, beste norbaiten azpitituluak lerro berean egokitu ahal izateko.",
     "Irakurri beti **aldaketa-zerrenda** geroago: sekuentzia bakoitza, lerro bakoitza eta zer zeri bihurtu den izendatzen ditu. Aldaketa zuzena izan dela eta ez gehiegizkoa ziurtatu dezakezun leku bakarra da, eta nahi ez duzun sarrera klik bakar batekin desegin daiteke."
    ],
    "img": {
     "file": "glossary-diff",
     "alt": "Banakako aldaketen zerrenda emaitzaren eremuan",
     "cap": "Aldaketa bakoitza zerrendatzen da; egin klik nahi ez duzun batean hura desegiteko"
    }
   },
   {
    "h2": "Zer ez zaion termino-taula bati eman behar",
    "ps": [
     "Termino-taula batek **hitzak** aldatzen ditu. Hiru gauza hauek bere lan-esparrutik kanpo daude, eta egon behar dute:",
     "**Gramatika eta esaldi-egitura** — ezin duzu hitz bat esaldi bihurtu; esaldi mailako lana [[Azpitituluen itzulpena|/translate.html]]ra edo gizaki batera itzultzen da.",
     "**Edukiaren garbiketa** — lerro osoak ezabatzea, hala nola ur-markak, iragarkiak eta SDH sekuentziak, [[Azpitituluen garbiketa|/clean.html]] zerbitzuari dagokio; termino-taulen arazoek ordeztu egiten dute, ez dituzte lerroak ezabatzen.",
     "**Denbora-lerroak** — termino-taula batek ez du inoiz denborarik ukitzen. Desplazamendu global baterako edo tasa-arazo baterako, joan hona: [[Denbora-lerroaren doikuntza|/shift.html]]."
    ]
   },
   {
    "h2": "Gaizki ulertzeko errazak diren zenbait gauza",
    "ps": [
     "**Txinerak azpikateak ordezkatzen ditu oraindik hitz osoko bat-etortzea markatuta egonda ere — hori normala da.** Txinera- eta japoniera-hizkuntzek ez dituzte hitzak zuriunez bereizten, beraz, tresnak ezin ditu hitzen mugak zehaztu eta hitz osoko bat-etortzeak ez du eraginik bertan; `art` karaktereak ez du ukituko `start` babesa ingeleserako bakarrik funtzionatzen baitu.",
     "**Ordenak emaitza aldatzen du.** Arauek goitik behera egiten dute lan eta arau batek sortutako testua azpian dituen arauek berriro aztertzen dute. Ordeztu A B-rekin eta gero B C-rekin eta azkenean C lortuko duzu.",
     "**Itzulpena bakarrik aldatzeko, ezarri barrutia.** Fitxategi bikoiztu batean, hautatu \"bigarren lerroa soilik\"; lerro bakarra duten sarrerek ukitu gabe jarraitzen dute lerro bakarreko ezarpen horietan — tresnak ez du asmatzen zein aldetik den jatorrizkoa.",
     "**Termino-taula ez da gordetzen.** hutsik egoten da orri hau irekitzen duzun bakoitzean, beraz, gorde ezazu zeure testu-fitxategia eta pasa aurrera."
    ]
   },
   {
    "h2": "Erlazionatutako tresnak eta gidak",
    "ps": [
     "Urratsez urrats gida osoa ikusteko, ikusi [[Nola ordezkatu terminoak multzoka azpitituluetan|/guides/glossary.html]]; edukia zikina bada, exekutatu [[Azpitituluen garbiketa|/clean.html]] lehenengo; izenak finkatuta daudenean eta beste hizkuntza batzuk behar dituzunean, joan [[Azpitituluen itzulpena|/translate.html]]ra; eta exekutatu emaitza [[Azpitituluen QCa|/qc.html]] bidez."
    ]
   }
  ]
 },
 "subtitle-quality-check": {
  "seo": {
   "title": "Entrega Aurreko Azpitituluen QC Zerrenda – AI-SRTSub",
   "desc": "Azpitituluak entregatzeko egiaztapen-zerrenda: gainjarriek, irakurketa-abiadurak, lerro-zabalera eta puntuazioak huts egiten dute gehienetan. Exekutatu 17 QC arauak.",
   "h1": "Zer Egiaztatu Entregatu Aurretik",
   "intro": "Amaitutako azpitituluak ez daude prest entregatzeko: ikusleek lehen begiratuan antzematen dituzten arazoak ehun aldiz ikusi ondoren ikusi ezin dituzun berberak dira. Egiaztapen-zerrenda honek azken urrats hori hartzen du barne.",
   "ctaText": "Exekutatu azpitituluen QC egiaztapen bat"
  },
  "body": [
   {
    "h2": "Zergatik Ezin Duzun Zeuk Arazoak Ikusi",
    "ps": [
     "Azpitituluak egiten dituen edonork oso ondo ezagutzen du edukia — badakizu hurrengo lerroak zer dioen, beraz, ez da ezer azkarregi sentitzen; diseinua ehun aldiz ikusi duzu, eta zure begiek akatsak saltatzen dituzte bere kabuz. Beraz, entregatu aurreko egiaztapenak ezin du “goitik berriro ikustean” oinarritu; **zenbakien arabera neurtu** behar da: irakurketa-abiadura, lerro-zabalera, iraupena, gainjarriak. Utzi zenbakiek erabakitzen."
    ]
   },
   {
    "h2": "Sei Hutsegite Ohikoenak",
    "ps": [
     "Entregatze bat hondatzen duten maiztasunaren arabera sailkatuta:"
    ]
   },
   {
    "h2": "Nola Egiaztatu",
    "ps": [
     "Ireki [[Azpitituluen QCa|/qc.html]] eta bota zure azpitituluak barruan; ezarri hizkuntza auto-detekziorako (27 hizkuntza, bakoitza bere arau-mailarekin). Txostenak hiru mailatako aurkikuntzak zerrendatzen ditu — **erroreak / abisuak / aholkuak** — bakoitza sarrera-zenbakiarekin eta neurtutako balioarekin. Erroreei aurre egin behar zaie (testu hondatua, denbora-markaren formatua, hasiera baino lehenago amaitu, zenbakikuntza apurtua); abisuak kasuaren araberakoak dira (gainjarriak, irakurketa-abiadura, lerro-zabalera, iraupena); aholkuak distira emateko dira (lerro-jauziaren posizioa, zuriuneak, puntuazioa)."
    ],
    "img": {
     "file": "qc-report",
     "alt": "QC txostena: hiru mailatako arazoen zerrenda, aurkikuntza bakoitza sarrera-zenbakiarekin eta neurtutako eta atalasearen arteko konparazioarekin",
     "cap": "Sarrera-zenbakia eta aurkikuntza bakoitzaren neurtutako balioa ematen dituen hiru mailatako txostena"
    }
   },
   {
    "h2": "Klik Batekin Konpon Daitezkeena",
    "ps": [
     "Zenbakikuntza, hutsik dauden sarrerak, berriz lerrokatzea, zuriuneak eta puntuazioa — **denbora-lerroa ukitu gabe uzten duen** edozer — automatikoki konpon daiteke; **denbora-lerroa aldatzen duten** konponketak (hasiera eta amaiera trukatzea, gainjarriak mugitzea, iraupenak moztea edo luzatzea) deshautatuta daude lehenetsi gisa eta eragina baieztatu ondoren bakarrik hautatu behar dira. **Mugaz gaindiko irakurketa-abiadurak ez du auto-konponketarik** — makinapuntuak ezin du jakin zein hitz moztu behar den, beraz, laburtu itzulpena zeuk edo arindu denbora-lerroa pixka bat; ikusi [[Irakurtzeko Azkarregiak Diren Azpitituluak|/guides/subtitle-too-fast.html]]. Konpondu ondoren, egiaztapen berri bat exekutatzen da automatikoki, eta txostenak benetan konpondutakoa soilik kontatzen du."
    ]
   },
   {
    "h2": "Horretan Ari Zarela",
    "ps": [
     "Txostenaren orriak testu arrunteko `.qc.txt` txosten bat deskargatu dezake zuzenean — erantsi entregari beste aldeak begirada batean ikus dezan zer egiaztatu duzun. Berriki itzulitako azpitituluentzat, exekutatu QC entregatu baino lehen; denbora-lerroaren jario orokorra beste arazo mota bat da — irakurketa-abiadurak huts egiten badu oraindik egiaztatu ondoren, ikusi [[Sinkronizaziotik Kanpo Desplazatzen Diren Azpitituluak|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "subtitle-speed-converter": {
  "seo": {
   "title": "Sinkronizatu azpidatziak bideoaren abiadura aldatu ondoren – AI-SRTSub",
   "desc": "Bideoa azkartu edo moteldu da eta azpidatziak ez datoz bat: sartu abiadura-faktorea tasaren araberako eskailera-urratsean eta denbora-lerro osoa bideoarekin batera luzatuko da.",
   "h1": "Doitu azpidatziak bideoaren abiadura-aldaketa baten ondoren",
   "intro": "Bideoa azkarragoa edo motelagoa bihurtu da oro har, azpidatziak jatorrizko erritmoan geratu diren bitartean — puntu baten ondoren dagoen guztia desfasatuta dago. Sartu faktorea eta denbora-lerro osoa bideoarekin batera eskalatuko da.",
   "ctaText": "Ireki denboraren editorea"
  },
  "body": [
   {
    "h2": "Noiz erabili tasa bat desplazamendu baten ordez",
    "ps": [
     "Bideoa **osorik** azkartu edo moteldu zen (esaterako, 0.9x edo 1.25x bideoa editatzeko softwarean) seinale bakoitzak bere jatorrizko erritmoari eusten zion bitartean: hasierak bat egiten du, eta zenbat eta urrunago orduan eta okerragoa da — ratio konstante batekin. Hori tasa-arazo bat da. Fitxategi osoa kopuru finko batekin soilik mugitzen bada hazi gabe, desplazamendu bat nahikoa da — ikusi [[azpidatzi-fitxategi osoa lehenago edo geroago mugitzea|/guides/shift-subtitle-timing.html]]."
    ]
   },
   {
    "h2": "Zein zenbaki sartu behar den",
    "ps": [
     "Azpidatziek bideoa jarraitu behar dute; beraz, sartu **bideoak benetan aldaketa izan duen faktorea**: 1.25x-ko azkartze batek esan nahi du seinalearen denborak 1.25ekin biderkatzen direla harrapatzeko; 0.9x-ko moteltze batek 0.9rekin biderkatzen du. Denboraren editorean, gehitu **Eskalatu tasaren arabera** urrats bat eta jarri faktorea balioaren koadroan."
    ],
    "img": {
     "file": "shift-step-rate",
     "alt": "Eskalatu tasaren arabera urratsa faktore batekin balioaren koadroan",
     "cap": "1etik gorako faktore batek denbora-lerroa luzatzen du (azkartutako bideo baterako), eta 1etik beherakoak konprimitu egiten du (moteldu baterako)."
    }
   },
   {
    "h2": "Honek desplazamendu batetik nola bereizten den",
    "ps": [
     "Desplazamendu batek seinale bakoitzaren denborak kopuru finko berdinarekin **mugitzen** ditu eta seinalearen iraupenak mantentzen ditu; tasak hasiera eta amaiera **biderkatzen** ditu, beraz, iraupenak ere eskalatzen dira. Abiadura-aldaketa baten ondoren iraupenak berak aldatu egin dira — horregatik zehazki behar da tasa bat."
    ]
   },
   {
    "h2": "Faktoreaz ziur ez zaudenean",
    "ps": [
     "Faktorea galtzen denean, jo **bi ainguretara**: sartu lehenengo eta azken seinalearen benetako bideo-denborak eta tarteko guztia proportzionalki zabalduko da — faktore egokia ebaztearen baliokidea. Ikusi [[azpidatziak gero eta desfasatuago egotea|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "subtitle-too-fast": {
  "seo": {
   "title": "Irakurtzeko Azkarregiak Diren Azpidatziak – Konpondu Irakurketa-abiadura – AI-SRTSub",
   "desc": "Irakurtzeko azkarregiak diren azpidatziak — iraupen laburra edo testu luzea? QC-k 20 karaktere/segundo baino gehiagoko sarrerak markatzen ditu (9 hanzi CJK-rako); iraupenak automatikoki konpontzen dira, testuak edizioa behar du.",
   "h1": "Irakurtzeko azkarregiak diren azpidatziak",
   "intro": "Ikusleek etengabe ematen diote pausari? Erruduna irakurketa-abiadura da. Nola neurtu, nola konpondu eta noiz editatu testua denboraren ordez — dena gida bakarrean.",
   "ctaText": "Egiaztatu irakurketa-abiadura"
  },
  "body": [
   {
    "h2": "Zer da irakurketa-abiadura?",
    "ps": [
     "Irakurketa-abiadura besterik ez da **ikusleek azpidatzi bat pantailan irauten duen denboran irakurtzen amaitu dezaketen ala ez**. Matematika zuzena da: testuaren zabalera pantailako segundoz zatituta. Industriako ohiko mugak: segundoko 9 karaktere oso txinera, japoniera eta korearrerako (18 unitate erdi-zabal), segundoko 20 unitate erdi-zabal beste hizkuntzetarako. 1 segundo irauten duen 20 hanziko lerro batek segundoko 40 zabalera-unitate ematen ditu — mugaren bikoitza baino gehiago, eta ikusleek ez dute inoiz amaituko."
    ]
   },
   {
    "h2": "Lehenik eta behin, bereizi zein azkartasun mota den",
    "ps": [
     "“Irakurtzeko azkarregia” bi arazo desberdin dira, egia esan: **iraupen laburregia** — seinalea ehun edo berrehun milisegundoren buruan mozten da, normalean denbora-akats bat edo edizio-hondar bat; **testu luzeegia** — iraupena ona da, baina lerroak 30 hanzi biltzen ditu, eta ez dago abiadura-mugarik hura salbatuko duenik. Konponbideak aurkakoak dira; beraz, jakin ezazu zein daukazun lehenago."
    ],
    "img": {
     "file": "qc-rules",
     "alt": "Irakurketa-abiaduraren mugaren ezarpena QC orrian, CJK-rako 18-ra eta beste hizkuntzetarako 20ra lehenetsita",
     "cap": "QC irakurketa-abiaduraren atalaseak: segundoko 18 zabalera-unitate CJK-rako, 20 beste hizkuntzetarako."
    }
   },
   {
    "h2": "Nola egiaztatu",
    "ps": [
     "Ireki [[Azpidatzien QC|/qc.html]] eta askatu azpidatziak bertan. Txostenean, \"iraupen laburregia\" neurtutako milisegundoak erakusten dituen abisua da (atalasea: 833 milisegundo); \"irakurtzeko moduko abiadura ez\" neurtutako segundoko zabalera-unitateak erakusten dituen bere aurkikuntza da. Elebidun azpidatzietarako helburuko hizkuntzan idatzitako lerroak bakarrik balio du — bi hizkuntzak ez dira elkarrekin gehitzen."
    ]
   },
   {
    "h2": "Nola konpondu",
    "ps": [
     "**Iraupen laburregia**: klik bakar batekin konpon daiteke — seinalea automatikoki luzatzen da 833 milisegundora, hurrengo seinalearen hasiera igaro gabe (konponbide batek ezin du gainjarpen berririk sortu). **Testu luzeegia**: ez dago konponbide automatikorik — makinaparatuek ez dakite zein hitz moztu behar den. Bi bide, zure aukera: itzulpena laburtu (egin klik itzulpen-tresnaren gelaxkan hura editatzeko), edo luzatu seinale honen iraupena (hurrengo seinalearen aurretik tartea badago soilik; denbora-lerro osoaren arazoetarako, ikusi [[Denbora-lerroaren desplazamendua|/shift.html]]). Exekutatu QC berriro ondoren, irakurketa-abiadura atalasearen barruan dagoela berresteko."
    ]
   },
   {
    "h2": "Ez zuzendu gehiegi",
    "ps": [
     "Abiadura-muga betetzeak ez du esan nahi ikuspegi erosoa denik: seinale bakoitza segundoko 9 karakterera arte estutzeak film osoa nekagarri bihurtzen du. Arau orokor gisa, egon atalasearen % 70aren inguruan denbora gehienetan, eta utzi elkarrizketaz jositako pasarteak apur bat pasatzen noizean behin. Maizegi keinu egiten duten azpidatzi-blokeak arazo bat dira berezkotasunez — exekutatu metrika multzo osoa entregatu aurretik, ikusi [[Zer egiaztatu entregatu aurretik|/guides/subtitle-quality-check.html]]."
    ]
   }
  ]
 },
 "subtitles-out-of-sync": {
  "seo": {
   "title": "Azpidatziak gero eta gehiago desfasatzen dira? Konpondu – AI-SRTSub",
   "desc": "Hasieran ondo, erdialdean segundo batzuk atzeratuta, amaieran erabilezin: hori progresiboa da, normalean fotograma-tasa ez-etortzea edo bideoaren abiadura-aldaketa. Bi aingurek konpontzen dute.",
   "h1": "Azpidatziak gero eta gehiago desfasatzen dira: zergatiak eta konponbideak",
   "intro": "Hasieran ondo, ordu erdi igarota bi segundo berandu, eta amaieran itxaropenik gabe. Deslerkatze mota honek zergati ezagunak ditu — eta konponbide ezaguna.",
   "ctaText": "Konpondu fitxategi hau"
  },
  "body": [
   {
    "h2": "Lehenik eta behin, bereizi bi deslerkatze motak",
    "ps": [
     "Deslerkatzea bi motatakoa izan daiteke: **desplazamendu uniforme** batek esan nahi du seinale bakoitza kopuru berdin batekin atzeratuta (edo aurreratuta) dagoela, hasieratik amaierara gutxi gorabehera berdin mantenduz; **desbideratze progresiboa** k esan nahi du hasiera zuzena dela eta akatsa amaierarantz handitzen dela, agian minutuetara iritsiz. Artikulu hau bigarren motari buruzkoa da — lehenengoarako, ikusi [[azpidatzi-fitxategi osoa lehenago edo geroago mugitzea|/guides/shift-subtitle-timing.html]]."
    ]
   },
   {
    "h2": "Zergatik desfasatzen den gero eta gehiago",
    "ps": [
     "Desbideratzea **bi erloju desberdinetatik** dator: ohikoenak hiru dira (1) fotograma-tasa ez datorrela bat — 24fps-ko film baten azpidatziek 25fps-ko iturri batean minutu bakoitzeko segundo bat baino gehiago galtzen dute; (2) bideoa azkartu edo moteldu egin zela, azpidatziek jatorrizko erritmoari eusten zioten bitartean; (3) VFR (aldagaien fotograma-tasa) grabaketa bat, bere denbora-lerroa irregularra dena hasieratik. Komunean dutena: akatsa erreprodukzio-denborarekin linealki handitzen da gutxi gorabehera."
    ]
   },
   {
    "h2": "Konpondu bi aingurapean",
    "ps": [
     "Akatsa linealki handitzen denez, mutur bakoitzean denbora zuzen bat finkatzeak eta erdikoa proportzionalki berriro zabaltzeak dena bere onera ekartzen du. Denboraren editorean, gehitu **bi aingurako zuzenketa**: \"unekoa\" izeneko bi eremuak fitxategi honetako jatorrizko denborekin betetzen dira automatikoki; bideoa ikusi eta sartu **lehenengo eta azken seinalea benetan agertzen direneko unea** \"helburua\" izeneko bi eremuetan."
    ],
    "img": {
     "file": "shift-step-two",
     "alt": "Bi aingurako zuzenketa: uneko denborak automatikoki beteta, helburuko denborak sartzeko",
     "cap": "Hartu aingurak bi muturretan — jatorrizko akatsik txikiena eta handiena —, eta tarteko guztia proportzionalki zabaltzen da berriro."
    }
   },
   {
    "h2": "Nola egiaztatu emaitza",
    "ps": [
     "Exekutatu ondoren, emaitzen panelak seinale bakoitzaren jatorrizko denborak eta berriak **alboan** zerrendatzen ditu. Begiratu hiru leku hauetan: lehenengo seinalea, erdiko bat eta azkena — jatorrizko akats txikiena, ertaina eta handiena duten hiru posizioak. Hirurak betetzen badira, fitxategi osoak ere bai."
    ],
    "img": {
     "file": "shift-result",
     "alt": "Emaitzen panela: aurreko eta ondorengo denborak alboan, deskargatzeko botoiarekin",
     "cap": "Erdiko seinaleen denbora berriek bi muturren artean egon behar dute — proportzioa egokia den seinale."
    }
   },
   {
    "h2": "Bi aingura nahikoa ez direnean",
    "ps": [
     "Bi aingurako zuzenketak akatsa **lineala** dela onartzen du. Iturria erdiko fotograma-tasa jauzia duen VFR pantaila-grabaketa bat bada, tirada lineal batek ezin du erdikoa konpondu — hartu bistako desfasatzea duen erdiko seinale bat hirugarren puntu gisa, zatitu fitxategia bertan, eta exekutatu bi aingurako zuzenketa erdi bakoitzean. Gainera, konpondu ondoren, berriro ikusi erdiko zatia abiadura normalean, tokiko deslerkatzerik ez dela geratzen egiaztatzeko."
    ]
   }
  ]
 },
 "table": {
  "seo": {
   "title": "Azpidatzia Excel / CSV bihurtzea – Bi noranzkoak – AI-SRTSub",
   "desc": "Noranzko biko ibilbidea: esportatu SRT/VTT Excel edo CSV-ra lerroz lerro zuzentzeko, eta gero inportatu editatutako orria berriro azpidatzi gisa. Hiru zutabe behar dira, edozein ordenatan; denbora testu gisa gordetzen da.",
   "h1": "Nola bihurtu azpidatziak Excel / CSV formatura",
   "intro": "Zuzentzea eta itzultzea errazagoa da kalkulu-orri batean. Esportatu azpidatziak Excel edo CSV-ra, editatu lerroz lerro, eta gero bihurtu berriro — denbora-zutabeek testu gisa jarraitzen dute, eta elkarrizketako lerro-jauziak gorde egiten dira.",
   "ctaText": "Ireki taularen bihurgailua"
  },
  "body": [
   {
    "h2": "Tresna honek zer egiten duen",
    "ps": [
     "Azpidatziak seinaleen errenkadak dira eta kalkulu-orriak erregistroen errenkadak — behin orri bat denean, zuzenketa, iruzkinak eta masa-itzulpena ezagutzen dituzun tresnekin egin daitezke. Bi noranzkoak onartzen dira:"
    ]
   },
   {
    "h2": "Kargatu eta aukeratu noranzko bat",
    "ps": [
     "Arrastatu fitxategi bat barrura edo bilatu bat. Noranzko bakoitzak beste fitxategi mota bat behar du: **taulara** aukerak azpidatzi fitxategiak hartzen ditu (SRT / VTT), **azpidatzira** aukerak kalkulu-orri fitxategiak hartzen ditu (CSV / Excel, .xlsx zein .xls). Modu okerra aukeratzen baduzu, orriak moduak zein fitxategi mota nahi duen esango dizu.",
     "⚠️ Orri honek UTF-8 soilik irakurtzen du. Zure azpidatzia galdera-ikur edo koadro betez beteta irekitzen bada, exekutatu [[Mojibake-ren konponketa|/repair.html]] bidez lehenik — kodetze hautsia orri honetan ordezkapen-karaktere gisa baino ez da irakurtzen."
    ],
    "img": {
     "file": "table-up",
     "alt": "Taularen bihurgailuaren kargatze-eremua: jaregiteko gunea eta bi modu-etengailuak",
     "cap": "Modu bakoitzak beste fitxategi bat nahi du: azpidatziak sartu, kalkulu-orria atera — eta berriro"
    }
   },
   {
    "h2": "Azpidatziak taula batera esportatzea",
    "ps": [
     "Aukeratu \"taulara\", askatu azpidatzi bat, eta aurrebistak seinale bakoitza zerrendatzen du: indizea, hasiera, amaiera, testua. Estatistika-barrak seinale-kopurua eta iraupen osoa ematen ditu. Ondoren, sakatu \"Deskargatu Excel (.xlsx)\" edo \"Deskargatu CSV\".",
     "Biek duten aldea: .xlsx benetako kalkulu-orri fitxategi bat da, non Excel-ek ezin baitu zure denbora-zutabea berrantolatu zure bizkar atzean; CSV eramangarriagoa da, baina Excel-ek denbora-zutabea beste zerbait bezala interpreta dezake irekitzean. Hori gertatzen bada, hautatu denbora-zutabea eta ezarri bere formatua \"Testu\" gisa — edo erabili .xlsx besterik gabe."
    ],
    "img": {
     "file": "table-prev",
     "alt": "Taularen aurrebista: indizea, hasiera, amaiera eta testu-zutabeak estatistika-barrakoarekin",
     "cap": "Seinale guztiak aurreikusi dira; estatistika-barrak seinale-kopurua eta iraupen osoa ematen ditu"
    }
   },
   {
    "h2": "Taula bat azpidatzietara berriro inportatzea",
    "ps": [
     "Aukeratu \"azpidatzira\", askatu orria barruan, eta hona hemen zutabearen araua: hiru zutabe behar ditu honetarako: **hasiera, amaiera eta testua** (Ingelesezko Goiburuak Start / End / Text ere balio dute), **edozein ordenatan**. `00:00:01,500` eta `00:00:01.500` biak onartzen dira; analizatu ezin diren errenkadak saltatu egiten dira fitxategi osoa gaitzetsi beharrean.",
     "Emaitza seinalez seinale zerrendatzen da aurrebistan; berretsi, eta gero deskargatu SRT edo VTT. Hiru zutabe horiek falta badira, goiburuak egiaztatzeko esaten dizun mezu bat jasoko duzu — normalean esportatzean beste izendapen bat erabili zelako, edo goiburu-errenkada ez delako lehena."
    ],
    "img": {
     "file": "table-back",
     "alt": "Azpidatziaren emaitza-eremua: inportatutako azpidatziak seinalez seinale zerrendatuta",
     "cap": "Aitortu ez diren zutabeen berri ematen da, inoiz ez da isilean baztertzen"
    }
   },
   {
    "h2": "Maiz egindako galderak",
    "ps": [
     "**Excel-ek denbora-zutabea gaizki erakusten du?** Erabili .xlsx eta hori ez da inoiz gertatzen. CSV erabili behar baduzu: hautatu denbora-zutabea eta ezarri gelaxkaren formatua \"Testu\" gisa ireki aurretik.",
     "**Zutabeen goiburuek ingelesez egon behar al dute?** Ez. Start / End / Text orri honek onartzen duen edozein hizkuntzatan ezagutzen dira, eta maiuskulak eta minuskulak ez dira garrantzitsuak.",
     "**Ene lerro-jauziek bertan jarraitzen al dute inportatu ondoren?** Bai. Elkarrizketaren barruko lerro-jauziak gorde egiten dira, jatorrizko egokitzapeneraino.",
     "**ASS onartzen al da?** Orri honek SRT eta VTT soilik kudeatzen ditu. ASS-k estilo-zuzentarauak daramatza — bihurtu SRTra [[Formatuen bihurgailua|/convert.html]] erabiliz lehenik.",
     "**Zenbat fitxategi aldi berean?** Bat. Dozenaka edo ehunka prozesatzeko, erabili [[Pakete bidezko bihurketa|/batch.html]] (formatuak soilik bihurtzen dituena eta taula batetik igarotzen ez dena)."
    ]
   },
   {
    "h2": "Pribatutasuna",
    "ps": [
     "Bihurketa zure arakatzailean bakarrik exekutatzen da. Ez da azpidatzi-edukirik bidaltzen zerbitzari batera inola ere."
    ]
   },
   {
    "h2": "Erlazionatutako tresnak eta gidak",
    "ps": [
     "Nahi duzun guztia azpidatzia Excel-era pasatzea bada, ikusi [[Bihurtu azpidatziak Excel-era|/guides/srt-to-excel.html]]; ondoren beste hizkuntza batera itzultzeko, [[Azpidatzien itzulpena|/translate.html]]; dozenaka fitxategi aldi berean — [[Pakete bidezko bihurketa|/batch.html]]."
    ]
   }
  ]
 },
 "translate": {
  "seo": {
   "title": "AI azpidatzien itzulpena – kargatu eta esportatu elebiduna – AI-SRTSub",
   "desc": "Itzuli azpidatziak AI bidez: kargatu SRT/VTT/ASS, aukeratu 100 hizkuntzaren artean, bateratu izenak glosario batekin eta esportatu azpidatzi elebidunak. Doako hasiera, API giltza propioa onartzen da.",
   "h1": "Nola erabili AI azpidatzien itzulpena",
   "intro": "Azpidatzi fitxategi bakar baterako lan-fluxu osoa, kargatzetik hasi, itzulpenetik igaro eta esportazioraino: zer dago pantailan, zer sakatu eta zer lortzen duzun urrats bakoitzean.",
   "ctaText": "Ireki itzulpen-tresna"
  },
  "body": [
   {
    "h2": "Tresna honek zer egiten duen",
    "ps": [
     "Azpidatziak hizkuntza batetik bestera itzultzen ditu eta erabiltzeko prest dagoen azpidatzi fitxategi bat esportatzen du. Behar ohikoenak:"
    ]
   },
   {
    "h2": "Kargatu azpidatziak",
    "ps": [
     "Egin klik \"Kargatu azpidatzi fitxategia\" aukeran edo itsatsi azpidatzi-testua zuzenean ezkerreko sarrera-koadroan. Sei formatu onartzen dira: SRT, VTT, ASS, SSA, SBV eta TXT. Ez duzu fitxategirik eskura? Egin klik \"Kargatu adibidea\" aukeran hura ekintzan ikusteko. Behin analizatuta, erdiko zutabeak azpidatzi-taula bat erakusten du sarrera bakoitzeko indizea, denbora-lerroa eta jatorrizko testua dituena."
    ],
    "img": {
     "file": "translate-upload",
     "alt": "Itzulpen-tresnaren inportazio-eremua: aukeratu azpidatzi fitxategia, itsasteko koadroa eta adibidea kargatzeko botoia",
     "cap": "Ezkerreko zutabea \"Kargatu azpidatziak\": hautatu fitxategi bat, itsatsi testua edo kargatu adibidea"
    }
   },
   {
    "h2": "Aukeratu hizkuntza eta estiloa",
    "ps": [
     "\"Jatorrizko hizkuntza\" auto-detekzioan egon daiteke; \"helburuko hizkuntza\" 100 hizkuntzaren artean aukeratzen da. Bost itzulpen-estilo daude erabilgarri: Orekatua (lehenetsia), Elkarrizketakoa, Profesional formala, Bikoizketa-estilokoa eta Pertsonalizatua. \"Bikoizketa-estiloa\" film eta telesailen elkarrizketei egokitzen zaie; \"Profesional formala\", dokumental eta ikastaroei."
    ],
    "img": {
     "file": "translate-lang",
     "alt": "Hizkuntzaren eta itzulpen-estiloaren ezarpenak: jatorrizko hizkuntza, helburuko hizkuntzaren goitibeherakoak eta bost estilo",
     "cap": "\"Hizkuntza\" eta \"itzulpen-estiloa\": jatorrizkoak auto-detekta dezake, 75 helburu-aukera"
    }
   },
   {
    "h2": "Glosarioa: mantendu izenak koherente",
    "ps": [
     "AIk sortaka itzultzen du, beraz, izen bera bi modu desberdinetan atera daiteke sortu desberdinetan. Idatzi \"jatorrizkoa → honela itzuli behar da\" arauak glosarioan; sortu bakoitzaren aurretik tresnak aztertu eta bat etortze bakoitza jarraitzen du. Errenkada bakoitzeko arau bat; geziak `->`, `=>`, `→` edo Tab izan daitezke; iturri-termino bakar batek itzuli gabe uztea esan nahi du; hainbat idazkerak errendatze bakarra parteka dezakete `|` bidez. Egin klik \"✨ AI erauzi\" aukeran AIri bideoaren izen propioak taulara lehenik ateratzeko eskatzeko, eta gero editatu eta itzuli."
    ],
    "img": {
     "file": "translate-glossary",
     "alt": "Glosarioaren eta izen propioen eremua: glosarioaren sarrera-koadroa AI erauzi eta gordetzeko botoiekin",
     "cap": "\"Izen bateratuak\" glosarioa: AI bidez erauziko izen propioak, bideo berrietarako automatikoki kargatzen direnak behin gordeta"
    }
   },
   {
    "h2": "Itzulpen-prozesua",
    "ps": [
     "Egin klik goiko barrako \"▶ Hasi itzulpena\" aukeran. Erdiko estatistika-bandak sarrerak, itzulitakoak, betegarriak garbituta eta sarrera arteko esaldi-taldeak erakusten ditu denbora errealean; aurrerapen-barrak geratzen den denbora estimatua eta erabilitako tokenak erakusten ditu. Itzultzen ari zaren bitartean, egin klik taulako edozein itzulpen-zelakatan testua editatzeko — aldaketak zure ordenagailuan gordetzen dira eta freskatze bat gainditzen dute. Itxi orria exekuzioaren erdian eta itzuli zinen tokian jarraitzeko aukera emango zaizu. Esaldi batek hainbat sarrera hartzen dituenean, taldea batu, itzuli eta iraupenaren arabera berriz betetzen da."
    ],
    "img": {
     "file": "translate-workspace",
     "alt": "Itzulpen-lan eremua: estatistika-banda, aurrerapen-barra eta editagarria den azpidatzi-taula",
     "cap": "Erdiko lan-eremua: estatistika-banda + aurrerapen-barra + klik eginez editatzeko moduko azpidatzi-taula"
    }
   },
   {
    "h2": "Esportatu",
    "ps": [
     "Eskuin zutabean aukeratu edukiaren forma lehenik: itzulpena soilik (bakar hizkuntzakoa), elebiduna jatorrizkoa goian duela, edo elebiduna itzulpena goian duela; ondoren, fitxategi-formatua: SRT, WebVTT, SBV, ASS edo TXT. ASS hautatzeak bi diseinu gehitzen ditu: goiko/beheko pantailak zatituta eta beheko lerro pilatuak. Edukia eta formatua libreki konbinatzen dira 14 esportazio-estilotan. Lerro-zabalera elebiduna aparte ezartzen da. Egin klik \"Deskargatu azpidatziak\" aukeran fitxategia gordetzeko, edo \"Kopiatu arbelera\" aukeran zuzenean itsteko."
    ],
    "img": {
     "file": "translate-export",
     "alt": "Esportazio-panela: hiru edukiaren forma, bost fitxategi-formatu eta lerro-zabalera elebidunaren ezarpenak",
     "cap": "Eskuineko zutabearen esportazioa: aukeratu edukiaren forma lehenik, eta gero fitxategi-formatua"
    }
   },
   {
    "h2": "Kostua eta pribatutasuna",
    "ps": [
     "Eredu lehenetsiak ez du erregistrorik eta ez giltzarik behar — moldatzen da koadroekin eskaera bakoitzeko kuotekin: eguneko muga IP bakoitzeko gehi site-mailako eguneko hobaria. Sorta handietarako, sartu zure API giltza propioa \"Itzulpen-motorra\" azpian. Pribatutasuna, orriko oharraren arabera: eredu lehenetsiaren azpidatziak gune honetako zerbitzariaren bidez hornitzailera bideratzen dira; API pertsonalizatua sartzen duzun hornitzaileak kudeatzen du zuzenean, eta giltzak zure arakatzailean jarraitzen du. Analisia, lerro-zulaketa eta diseinu elebiduna tokian bertan exekutatzen dira arakatzailean."
    ]
   },
   {
    "h2": "Maiz egindako galderak",
    "ps": [
     "**Beste hizkuntza batzuk nahastu dira itzulpenean?** Tresnak hizkuntza-desbideratzea detektatzen du eta automatikoki berriro itzultzen du; sarrera batzuek oker dirauela oraindik ere, egin klik gelaxkan eta konpondu eskuz.",
     "**Zer gertatzen da kanta-lerroekin?** \"Edukia iragaztea\" aukerak hiru aukera eskaintzen ditu letretarako: letrak itzuli, jatorrizkoari eutsi edo ezabatu.",
     "**Izenen itzulpen koherenteak ez?** Gehitu idazkera koherenteak glosarioari eta itzuli berriro; glosarioak lehentasuna du \"izen propioen kudeaketa\" ezarpen globalaren aurrean.",
     "**Ingelesa goian eta txinera behean nahi dituzu?** Aukeratu \"Elebiduna · jatorrizkoa goian\" esportatzerakoan; txinera goian eta ingelesa behean nahi baduzu, aukeratu \"Elebiduna · itzulpena goian\"."
    ]
   },
   {
    "h2": "Erlazionatutako tresnak eta gidak",
    "ps": [
     "Formatu okerra? Hasi [[formatu-aldaketa|/convert.html]] bidez; denbora-lerroa desitxuratuta? Erabili [[denbora-lerroaren doikuntza|/shift.html]]; entregatu aurretik, exekutatu [[azpidatzien kalitate-egiaztapena|/guides/subtitle-quality-check.html]] bidez."
    ]
   }
  ]
 },
 "translate-english-to-chinese": {
  "seo": {
   "title": "Itzuli ingelesezko azpidatziak txinerara – AI-SRTSub",
   "desc": "Itzuli ingelesezko azpidatziak txinerara: igo SRT/VTT/ASS fitxategiak, hautatu Txinera Sinplifikatua edo Tradizionala, eta esportatu txinera hutsa edo elebitzak. – AI-SRTSub",
   "h1": "Itzuli ingelesezko azpidatziak txinerara",
   "intro": "Ingelesezko SRT sartu, txinerazko (edo ingeles-txinerazko elebitza) azpidatziak atera: igo, hautatu helburuko hizkuntza, esportatu — dena orrialde bakarrean.",
   "ctaText": "Itzuli ingelesezko azpidatziak"
  },
  "body": [
   {
    "h2": "Noiz behar duzun",
    "ps": [
     "Deskargatu duzun azpidatzia ingelesez bakarrik dago eta ezin duzu erritmoari eutsi; edo txinerazko azpidatziak nahi dituzu ingelesa irakurtzen ez duten senideentzat. Behar duzuna hiru modu hauetako batean dator — **txinerazko azpidatziak soilik**, edo elebitzak **txinera goian, ingelesa behean** nahiz **ingelesa goian, txinera behean** — eta tresna honek hirurak sortzen ditu."
    ]
   },
   {
    "h2": "Nola egin",
    "ps": [
     "Ireki [[AI Azpidatzi Itzultzailea|/translate.html]] eta jaregin zure ingelesezko azpidatzi fitxategia (SRT, VTT, ASS, SSA, SBV eta TXT onartzen dira, edo besterik gabe itsatsi testua). Utzi «Jatorrizko hizkuntza» auto-detekzioan, ezarri «Helburuko hizkuntza» Txinera Sinplifikatua edo Tradizionalera, eta sakatu «▶ Hasi itzultzen». Amaitzean, hautatu edukiaren formatu bat eskuineko esportazio-panelean: itzulpena soilik (hizkuntza bakarrekoa), elebiduna · jatorrizkoa goian (ingelesa goian, txinera behean), edo elebiduna · itzulpena goian (txinera goian, ingelesa behean); ondoren, hautatu fitxategi-formatu bat eta deskargatu."
    ],
    "img": {
     "file": "translate-export",
     "alt": "Esportazio-panela: itzulpena soilik, elebiduna jatorrizkoa goian, eta elebiduna itzulpena goian",
     "cap": "Hautatu edukiaren formatua esportatzean: txinera soilik, edo ingelesa goian / txinera goian duten elebitzak"
    }
   },
   {
    "h2": "Bi arazo arrunta",
    "ps": [
     "**Izenak modu inkonsistentean itzulita?** Adimen artifizialak sortaka itzultzen du, beraz, izen berberak bi modu desberdin eman ditzake. Sartu «jatorrizkoa → itzulitako izena» bikoteak glosarioan (adibidez, `Watson → Huasheng`) dena berdina mantentzeko uneoro.",
     "**Azpidatziak iruditik deskoordinatzen ari dira?** Itzuli lehenbizi, eta gero konpondu denbora-tartea: lan-mahaiaren goialdeko denbora-lerroaren tresna-barrak desplazamendu eta eskala globalaren kontrola du — ikusi [[Azpidatziak sinkronizaziotik kanpo geratzen dira amaiera aldera|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "videosub": {
  "seo": {
   "title": "Bideoetako azpitik txertatutako azpidatziak ateratzen – MKV / MP4 pistak – AI-SRTSub",
   "desc": "Irakurri zuzenean MKV, WebM, MP4 eta MOV fitxategien barruko azpidatzi pistak eta esportatu SRT / VTT / ASS / TXT formatuan. Kargatzerik ez, transkodifikaziorik ez, hizkuntza pista guztiak zerrendatuta, irudi-azpidatziak ohartarazita.",
   "h1": "Nola atera bideo batean txertatutako azpidatziak",
   "intro": "Irakurri zuzenean MKV edo MP4 baten barruan zigilatutako azpidatzi pista SRT gisa — bideoa ez da inoiz kargatzen, dena arakatzailean irakurtzen da.",
   "ctaText": "Ireki bideo-azpidatziak ateratzeko tresna"
  },
  "body": [
   {
    "h2": "Tresna honek zer egiten duen",
    "ps": [
     "Azpidatziak bideo-fitxategi baten barruan egon daitezke zigilatuta, bakarrik egon beharrean. Editatzeko, itzultzeko edo parekatzeko, lehenik eta behin atera egin behar dituzu — horixe egiten du orrialde honek."
    ]
   },
   {
    "h2": "1 Gehitu bideoa",
    "ps": [
     "Arrastatu bideo-fitxategi bat lehen zutabera edo egin klik bat hautatzeko. **MKV / WebM** eta **MP4 / MOV** bakarrik ezagutzen dira; beste edukiontzi batzuek ez dute pistarik emango.",
     "Fitxategiak ez du inoiz zure ordenagailua uzten — ez dago kargatze-urratzik. Tresnak zati txikitan irakurtzen du desplazamenduaren bidez, beraz, hainbat gigabyteko film batek ez du memoria betetzen, baina lehenengo irakurketak pista-informazioa eskaneatu behar du behin."
    ],
    "img": {
     "file": "videosub-up",
     "alt": "Txertatutako azpidatziak ateratzeko orrialdeko bideoa gehitzeko eremua",
     "cap": "MKV / WebM eta MP4 / MOV onartzen dira, eta fitxategiak ez du inoiz zure ekipoa uzten"
    }
   },
   {
    "h2": "2 Txertatutako azpidatzi pistak",
    "ps": [
     "Irakurketa amaitutakoan, bigarren zutabeak fitxategiko azpidatzi pistak zerrendatzen ditu **lerroko bat**, normalean hizkuntza batekin eta pista-izen batekin (adibidez, \"Txinera\", \"Ingelesa\", \"Behartua\"). Egin klik errenkada batean pista hori ateratzeko.",
     "Fitxategiak azpidatzi pista bakarra duenean, erauztea automatikoki hasten da — ez da klik egin beharrik.",
     "**Irudi-azpidatziak ezin dira atera**: Blu-ray PGS eta DVD azpidatziak korrontean erreta dauden argazkiak dira, hartzeko testurik gabe, eta orrialdeak argi eta garbi esaten du; horiek OCR behar dute."
    ],
    "img": {
     "file": "videosub-track",
     "alt": "Txertatutako azpidatzi pisten zerrenda, errenkadako bat",
     "cap": "Pista bat errenkadako; bakarra dagoenean, erauztea automatikoki hasten da"
    }
   },
   {
    "h2": "3 Emaitza",
    "ps": [
     "Eskuin aldeko \"3 Emaitza\" atalak ateratako azpidatzi testua erakusten du, gainean esportazio-formatua duela: **SRT / VTT / ASS / TXT**. Egin klik \"Deskargatu\" edo \"Kopiatu\" aukeran.",
     "Jatorrizko pista ASS denean, bere estilo-goiburua eta bereizmena aldatu gabe itzultzen dira — ASS gisa esportatzeak mantendu egiten ditu, eta SRT gisa esportatzeak testua bakarrik daramana."
    ],
    "img": {
     "file": "videosub-out",
     "alt": "Emaitzaren eremua SRT / VTT / ASS / TXT formatu aukerarekin",
     "cap": "Lau esportazio-formatu; ASS jatorri batek bere estilo-goiburua eta bereizmena mantentzen ditu"
    }
   },
   {
    "h2": "Ukitu gabe geratzen dena",
    "ps": [
     "Bideo-fitxategia bera ez da ukitzen — irakurtzeko soilik, idazketarik gabe, transkodifikaziorik gabe, remuxing-ik gabe.",
     "Azpidatzien edukia den bezala ateratzen da: kodetze-asmakizunik gabe, denbora-lerroaren zuzenketarik gabe. Ateratako azpidatziak gaizki ikusten badira, hori jatorrizko pistako kodetze-arazo bat da — eraman hona: [[Testu hondatuen konponketa|/repair.html]]."
    ]
   },
   {
    "h2": "Ohiko galderak",
    "ps": [
     "**Benetan al dago irudi-azpidatziak kudeatzeko modurik (PGS / DVD)?** Ez orrialde honetan — testu-geruzarik gabeko argazkiak dira. OCRk lehenengo etorri behar du, eta orrialde honek ez du hori egiten.",
     "**Ateratako azpidatziak gaizki sinkronizatuta daude — zergatik?** Orrialde honek ez du denbora-lerroa zuzentzen; ateratzen dena zegoena da. Desplazamendu global bat edo tasa-arazo bat konpontzeko, erabili [[Denbora-lerroaren doitzea|/shift.html]].",
     "**Zergatik irauten du hainbeste ezer gertatu aurretik?** Fitxategi handi bat zati batzuetan eskaneatu behar da pista-informazioa lortzeko, eta zen eta fitxategia handiagoa orduan eta gehiago irauten du; hau lokalean gertatzen da eta ez du zerikusirik zure konexioarekin.",
     "**Erabili al dezaket orrialde hau kanpoko azpidatzi fitxategietarako?** Ez duzu behar — kanpoko .srt / .ass bat zuzenean sartzen da [[Formatu bihurketa|/convert.html]] tresnan edo beste batean. Orrialde hau bideo baten barruan zigilatuta dauden azpidatzietarako da."
    ]
   },
   {
    "h2": "Pribatutasuna",
    "ps": [
     "Bideoa arakatzailean bakarrik irakurtzen da: ez da ezer kargatzen, ez da ezer transkodifikatzen, ez da ezer zerbitzari batetik pasatzen. Itxi orrialdea eta irakurritako datuak askatu egiten dira."
    ]
   },
   {
    "h2": "Lotutako tresnak eta gidak",
    "ps": [
     "Ateratzen duzuna itzultzeko, joan hona: [[Azpidatzien itzulpena|/translate.html]]; elebidun egiteko, ikusi [[Azpidatzi elebidunak egiteko bi modu|/guides/make-bilingual-subtitles.html]]; txertatutako eta kanpoko pisten arteko aldea zein den eta zein atera daitezkeen jakiteko, ikusi [[Nola atera azpidatziak bideo batetik|/guides/extract-subtitles-from-video.html]]."
    ]
   }
  ]
 },
 "vtt-to-srt": {
  "seo": {
   "title": "VTT-tik SRTra bihurgailua – Bihurtu WebVTT azpidatziak – AI-SRTSub",
   "desc": "Bihurtu VTT (WebVTT) azpidatziak SRTra, SRT soilik onartzen duten editore eta erreproduzitzaileentzat. WEBVTT goiburua eta NOTE blokeak automatikoki garbitzen dira. Zure arakatzailean exekutatzen da.",
   "h1": "VTT-tik SRTra",
   "intro": "Bihurtu VTT (WebVTT) azpidatziak SRT: utzi fitxategia, hautatu SRT, deskargatu. Goiburua eta ohar-blokeak garbitu egiten dira eta denbora-markak komadun notaziora itzultzen dira.",
   "ctaText": "Bihurtu VTT → SRT"
  },
  "body": [
   {
    "h2": "Noiz behar duzun SRT berriro",
    "ps": [
     "CapCut-ek, Premiere-k, mahaigaineko erreproduzitzaile gehienek eta azpidatzi tresna zaharragoek **SRT** soilik onartzen dute. Webetik edo YouTube-tik deskargatutako azpidatziak VTT formatuan etorri ohi dira — bihurtu SRTra zuzenean inportatzeko."
    ]
   },
   {
    "h2": "VTT-tik garbitzen dena",
    "ps": [
     "**WEBVTT goiburuko lerroa**, NOTE blokeak, STYLE/REGION blokeak eta denbora-lerroaren ondorengo sekuentzia-ezarpenak (align:start bezalakoak) ez dira azpidatzi-testua — automatikoki baztertzen dira; zenbakikuntza berrezartzen da eta milisegundoen bereizlea puntutik komara itzultzen da."
    ],
    "img": {
     "file": "convert-upload-vtt",
     "alt": "Kargatzeko eremua: VTT fitxategia kargatuta, VTT gisa detektatuta",
     "cap": "WEBVTT goiburua duen fitxategia VTT gisa detektatzen da berehala"
    }
   },
   {
    "h2": "Nola bihurtu",
    "ps": [
     "Ireki [[bihurgailua|/convert.html]], utzi VTT fitxategia bertan, aukeratu **SRT - SubRip** irteera gisa, eta ondoren bihurtu eta deskargatu. Testuak eta denbora-balioak ukitu gabe geratzen dira."
    ],
    "img": {
     "file": "convert-result-srt",
     "alt": "Bihurtzearen emaitza: SRT zenbakikuntza komadun denbora-markekin",
     "cap": "Bihurtutako SRT-a: sekuentzia-zenbakiak + komadun denbora-markak"
    }
   }
  ]
 }
};
