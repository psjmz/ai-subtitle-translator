/* i18n/gd-sq.js —— 43 篇指南页的sq译文（由 _mkgd.js 生成，勿手改）
 * 源：_gd/sq.json（Gemini 翻译，_gemgd.js 产出）
 * 结构：{ <slug>: { seo:{title,desc,h1,intro,ctaText}, body:[{h2,ps[],img}] } }
 * ⚠️ server.js 自己 require 它，不被任何 html 引用 —— 部署时必须显式加进传输列表。
 */
module.exports = {
 "ass-to-srt": {
  "seo": {
   "title": "Përkthyes i ASS në SRT – Konvertoni Nëntitujt ASS/SSA – AI-SRTSub",
   "desc": "Konvertoni nëtitujt ASS (dhe SSA) në SRT të thjeshtë: teksti dhe koha nxirren ashtu siç janë, ndërsa etiketat e stilit mbeten pas. Për softuerët që pranojnë vetëm SRT. Ekzekutohet në shfletuesin tuaj.",
   "h1": "ASS në SRT",
   "intro": "Ktheni nëtitujt ASS (ose SSA) në SRT: hidhni skedarin, zgjidhni SRT, shkarkojeni. Teksti dhe koha nxirren ashtu siç janë; etiketat e stilit nuk ruhen.",
   "ctaText": "Konvertoni ASS → SRT"
  },
  "body": [
   {
    "h2": "Kur ju duhet SRT përsëri",
    "ps": [
     "Suitet e editimit, kutitë e marrjes (set-top boxes), lexuesit e TV-ve, mjetet e përkthimit — shumë hapa më poshtë pranojnë vetëm **SRT**. Stilizimet dhe pozicionimet e bukura në ASS nuk vlejnë atje, ndaj SRT-ja e thjeshtë është zgjidhja më e sigurtë."
    ]
   },
   {
    "h2": "Çfarë u ndodh etiketave të stilit",
    "ps": [
     "Çdo skenë e ASS është një rresht dialogu (Dialogue) teksti i të cilit shpesh mbart etiketa mbivendosjeje si `{\\fonts}` për ngjyrën, lëvizjen ose efektet. Konvertimi në SRT **i heq këto etiketa së bashku me stilizimin**, duke ruajtur vetëm tekstin dhe kohën; thyerjet e rreshtave `\\N` bëhen thyerje të vërteta rreshtash. Skedarët SSA janë gjithashtu të lexueshëm."
    ],
    "img": {
     "file": "convert-result-srt",
     "alt": "Rezultati i konvertimit: numërtimi dhe teksti i SRT të nxjerra nga ASS",
     "cap": "SRT-ja e nxjerrë: një numër për çdo skenë, tekst i pastër"
    }
   },
   {
    "h2": "Si të konvertoni",
    "ps": [
     "Hapni [[konvertuesin|/convert.html]], hidhni skedarin ASS (edhe .ssa bën punë), zgjidhni **SRT - SubRip** si format daljeje, pastaj konvertoni dhe shkarkoni. Po shkoni në drejtimin e kundërt? Shihni [[SRT në ASS|/guides/srt-to-ass.html]]."
    ]
   }
  ]
 },
 "batch": {
  "seo": {
   "title": "Si të konvertoni në masë nëtitujt – Qindra në një ZIP të vetëm – AI-SRTSub",
   "desc": "Udhëzues: hidhni dhjetëra skedarë SRT/VTT, konvertojini në një format të vetëm, shkarkoni një ZIP të vetëm. Të rinumërtuar, kohëmatësit e normalizuar, skedarët e papërpunuar të shënuar në vend që të fshihen fshehurazi në arkiv.",
   "h1": "Si të konvertoni në masë nëtitujt",
   "intro": "Një sezon i tërë nëtitujsh zakonisht duhet të përfundojë në një format të vetëm, dhe ngarkimi i tyre një nga një kërkon pafundësisht kohë. Hidhini të gjitha këtu, konvertojini së bashku dhe shkarkoni një ZIP të vetëm — skedarët që nuk mund të përpunohen shënohen, dhe nuk bashkohen kurrë fshehurazi sikur të kishin funksionuar.",
   "ctaText": "Hapni konvertimin në masë"
  },
  "body": [
   {
    "h2": "Çfarë bën ky mjet",
    "ps": [
     "Nëntitujt për një sezon të tërë ose një kompletzakonisht duhet të jenë uniformë para se të mund të bëhet ndonjë gjë tjetër me to. Ja çfarë bën faqja e përpunimit në masë:"
    ]
   },
   {
    "h2": "Shtimi i skedarëve",
    "ps": [
     "Tërhiqni disa skedarë nëtitujsh në kutinë me vija së bashku, ose klikoni dhe zgjidhni shumë prej tyre menjëherë. Lista e skedarëve tregon secilin: skedarët e përpunuar shfaqin numrin e skenave të tyre, ndërsa ata të papërpunuar shënohen thjesht si të panjohur. Shiriti i sipërm llogarit totalin e skedarëve, skenave dhe sa prej tyre mbetën të panjohura.",
     "⚠️ Kjo faqe lexon vetëm UTF-8. Çdo gjë me kodim të prishur (një ekran plot me pikëpyetje ose katrorë) duhet të kalojë paraprakisht te [[Rregullimi i tekstit të korruptuar|/repair.html]]."
    ],
    "img": {
     "file": "batch-list",
     "alt": "Lista e skedarëve: emri dhe numri i skenave për çdo skedar, ata të panjohur të shënuar me të kuqe",
     "cap": "Çdo skedar i listuar, dhe ata të panjohur të shënuar në vend"
    }
   },
   {
    "h2": "Në çfarë të konvertohet gjithçka",
    "ps": [
     "Zgjidhni formatin e synuar te \"Konverto të gjitha në\" — SRT ose VTT. Çdo skedar në listë rigjenerohet më pas në atë format: numrat e skenave rinumërohen nga fillimi, kohëmatësit normalizohen në formatin e synuar (SRT ndan milisekondat me presje, VTT me pikë).",
     "**Emrat origjinalë të skedarëve ruhen dhe vetëm prapashtesa ndryshon**; emrat e dyfishtë marrin një numër shtesë në fund që të mos mbishkruhet asgjë."
    ],
    "img": {
     "file": "batch-up",
     "alt": "Zgjedhësi i formatit të synuar dhe gjendja e listës, me shiritin e statistikave që tregon numrin e skedarëve dhe skenave",
     "cap": "Zgjidhni një format të synuar dhe çdo skedar rigjenerohet; skedarëve u ndryshon vetëm prapashtesa"
    }
   },
   {
    "h2": "Paketimi dhe shkarkimi",
    "ps": [
     "Klikoni \"Paketo në një ZIP të vetëm dhe shkarko\" dhe arkivi përmban çdo skedar të konvertuar. **Skedarët pa skena të njohura qëndrojnë jashtë arkivit** — ato mbeten në listë, të shënuara, në vend që të përzihen sikur të kishin pasur sukses. Pasi të paketohet, ju merrni një numër se sa skedarë ndodhen brenda."
    ],
    "img": {
     "file": "batch-zip",
     "alt": "Zona e paketimit: butoni i shkarkimit të ZIP-it dhe mesazhi i rezultatit të paketimit",
     "cap": "Skedarët e panjohur qëndrojnë jashtë arkivit dhe mbeten të shënuar në listë"
    }
   },
   {
    "h2": "Pse një skedar shënohet si i panjohur",
    "ps": [
     "Një skedar shënohet kur asnjë skenë nuk mund të lexohet prej tij. Tre arsyet e zakonshme: nuk është fare nëtitull (p.sh. një skedar i vetmuar lexme .txt), kodimi nuk është UTF-8 (kështu që lexohet vetëm si karaktere zëvendësuese), ose përmbajtja është shembur në një bllok të vetëm pa kohëmatës.",
     "Skedarët e shënuar mund të trajtohen individualisht: problemet e kodimit shkojnë te [[Rregullimi i tekstit të korruptuar|/repair.html]], problemet e formatit te [[Konvertuesi i formateve|/convert.html]] për një konvertim të vetëm para se të kthehen përsëri në listë."
    ]
   },
   {
    "h2": "Pyetjet e bëra shpesh",
    "ps": [
     "**Sa skedarë mund të shtoj?** Nuk ka ndonjë kufi të rreptë; kjo varet nga kujtesa e shfletuesit tuaj, dhe disa qindra skedarë SRT zakonisht funksionojnë mirë.",
     "**A e ndryshon dialogun tim?** Jo. Konvertimi në masë ndryshon vetëm formatin e kontejnerit — duke rinumëruar skenat dhe duke normalizuar kohëmatësit — kurrë asnjë fjalë të vetme dialogu.",
     "**Po sikur të duhet të ndryshoj përmbajtjen?** Kjo faqe vetëm konverton formatet. Për të ndryshuar kohën në masë përdorni [[Përshtatja e kohës|/shift.html]]; për të ndryshuar fjalorin përdorni [[Zëvendësimi i termave|/glossary.html]]; të dyja funksionojnë skedar pas skedari.",
     "**A mbështetet ASS-ja?** Kjo faqe konverton vetëm midis SRT dhe VTT. ASS mban stilizim — përdorni [[Konvertuesi i formateve|/convert.html]] mbi të individualisht."
    ]
   },
   {
    "h2": "Privatësia",
    "ps": [
     "Konvertimi dhe paketimi ekzekutohen plotësisht në shfletuesin tuaj. Asnjë përmbajtje nëtitulli nuk i dërgohet kurrë ndonjë serveri."
    ]
   },
   {
    "h2": "Mjete dhe udhëzues të ngjashëm",
    "ps": [
     "Çfarë të ndryshoni për një sezon të tërë dhe në çfarë renditjeje — [[Editimi në masë i një sezoni të tërë nëtitujsh|/guides/batch-convert-srt.html]]; më shumë formate për një skedar të vetëm — [[Konvertuesi i formateve|/convert.html]]; kontrolli i saktësisë në një fletëllogaritëse — [[Nëntituj ⇄ tabelë|/table.html]]."
    ]
   }
  ]
 },
 "batch-convert-srt": {
  "seo": {
   "title": "Editimi në Masë i një Sezoni të Tërë – Çfarë Përshtatet në Masë, Çfarë Jo – AI-SRTSub",
   "desc": "Një sezon zakonisht ka nevojë për të njëjtin ndryshim kudo: format uniform, zhvendosje kohe, terminologji. Këtu është se çfarë përfundon në një kalim të vetëm, çfarë nuk mundet, dhe si të trajtoni skedarët që dështojnë të përpunohen.",
   "h1": "Editimi në masë i një sezoni të tërë nëtitujsh",
   "intro": "Kur dhjetëra skedarë nëtitujsh kanë nevojë për ndryshim, zakonisht është i njëjti ndryshim çdo herë. Të kuptuarit se cilat pjesë mund të bëhen në një kalim të vetëm kursen shumë më tepër kohë sesa të lodheni duke i bërë ato një nga një.",
   "ctaText": "Hapni konvertimin në masë"
  },
  "body": [
   {
    "h2": "Zakonisht është i njëjti ndryshim kudo",
    "ps": [
     "Kur nëtitujt dalin keq për një sezon të tërë, rrallëherë çdo episod ka problemin e tij privat — zakonisht është një shkak i vetëm që prek çdo episod: i njëjti grup publikues i ka koduar të gjitha (kështu që formatii dhe filigranët përputhen), të gjitha janë sinkronizuar me të njëjtin version videoje (kështu që drejtimi dhe sasia e zhvendosjes përputhen), ose transliterimet kanë devijuar gjatë gjithë sezonit.",
     "Kontrolloni paraprakisht dy episode — një në fillim, një në fund — dhe konfirmoni se është vërtetë **i njëjti problem** para se të bëni ndonjë gjë në masë. Nëse të dy nuk përputhen, kjo nuk është diçka që përpunimi në masë mund ta rregullojë."
    ]
   },
   {
    "h2": "Çfarë mund të bëhet në një kalim të vetëm",
    "ps": [
     "**Bashkimi i formatit** është e vetmja gjë që përfundon vërtet në një kalim të vetëm: tërhiqni dhjetëra skedarë SRT dhe VTT te [[Konvertimi në masë|/batch.html]] së bashku, zgjidhni formatin e synuar dhe shkarkoni një ZIP të vetëm. Rinumërimi dhe normalizimi i kohëmatësve ndodhin në atë hap të vetëm, dhe asnjë fjalë e vetme dialogu nuk ndryshon."
    ],
    "img": {
     "file": "batch-list",
     "alt": "Lista e skedarëve në faqen e përpunimit në masë: numri i skenave për skedar, të panjohurit të shënuar me të kuqe",
     "cap": "Formati uniform është e vetmja gjë që përfundon vërtet në një kalim të vetëm"
    }
   },
   {
    "h2": "Çfarë duhet bërë skedar pas skedari",
    "ps": [
     "Këto nuk kanë pikë hyrjeje në masë dhe kërkojnë nga një kalim për çdo skedar — megjithëse zakonisht ka një ekuivalent që **duhet të bëhet vetëm një herë dhe më pas zbatohet për të gjithë sezonin**:"
    ]
   },
   {
    "h2": "Vini rendin si duhet",
    "ps": [
     "Kur duhen bërë disa gjëra, rendi i gabuar do të thotë ribërje. Ndiqni këtë renditje:",
     "**Rregulloni kodimin** → **bashkoni formatin** → **ndryshoni përmbajtjen** (filigranët, terminologjinë, kohën) → **kontrolloni cilësinë në fund**. Konvertimi i formateve para se të rregulloni kodimin thjesht ju jep tekst të korruptuar në një kontejner tjetër; ndryshimi i përmbajtjes para se formatet të bashkohen do të thotë të punoni me mbështetje jo të qëndrueshme mjetesh."
    ],
    "img": {
     "file": "batch-zip",
     "alt": "Zona e paketimit: butoni i shkarkimit të ZIP-it dhe mesazhi i rezultatit",
     "cap": "Bashkoni formatet e para, ndryshoni përmbajtjen më pas"
    }
   },
   {
    "h2": "Trajtimi i skedarëve që nuk u njohën",
    "ps": [
     "Skedarët e shënuar si të panjohur në konvertimin në masë lihen jashtë skedarit ZIP dhe mbeten në listë. Tre arsyet e zakonshme: nuk është skedar nëtitulli (një skedar lexme i vetmuar), kodimi nuk është UTF-8, ose përmbajtja është shembur në një bllok të vetëm pa kohëmatës.",
     "Problemet e kodimit shkojnë te [[Rregullimi i tekstit të korruptuar|/repair.html]] individualisht; problemet e formatit te [[Konvertuesi i formateve|/convert.html]] para se t'i vendosni përsëri në listë. **Mos i detyroni skedarët e panjohur të futen në arkiv vetëm për të rritur numrin** — zbulimi i një episodi të humbur në lexuesin tuaj kushton shumë më tepër se minuta që kjo kursen."
    ]
   },
   {
    "h2": "Mjete dhe udhëzues të ngjashëm",
    "ps": [
     "Udhëzuesi i plotë i përpunimit në masë — [[Si të konvertoni në masë nëtitujt|/guides/batch.html]]; zhvendosjet uniforme të kohës — [[Si të rregulloni kohën e nëtitujve|/guides/shift.html]]; një kalim i fundit para dorëzimit — [[Kontrolli i cilësisë së nëtitujve|/qc.html]]."
    ]
   }
  ]
 },
 "bilingual": {
  "seo": {
   "title": "Si të Ndani ose Bashkoni Nëntitujt Dygjuhësh – AI-SRTSub",
   "desc": "Katër mënyra për të hequr nëtitujt dygjuhësh: mbani vetëm një gjurmë, ndani në dy skedarë, ose bashkoni në një hyrje me dy rreshta. Të dyja format e zbuluara automatikisht, në shfletuesin tuaj.",
   "h1": "Si të Hiqni Nëntitujt Dygjuhësh",
   "intro": "Dëshironi të ndani nëtitujt dygjuhësh, t'i bashkoni, ose të mbani vetëm një gjurmë? Ky udhëzues kalon nëpër të katër modalitetet: se si funksionon zbulimi, cilin modalitet të zgjidhni dhe çfarë përfitoni në eksport.",
   "ctaText": "Hapni Heqësin e Nëntitujve Dygjuhësh"
  },
  "body": [
   {
    "h2": "Për Çfarë Shërben Ky Mjet",
    "ps": [
     "Ju keni nëtituj dygjuhësh, por doni vetëm njërën nga gjurmët — ose anasjelltas, doni të ndani ose bashkoni dy gjurmët:"
    ]
   },
   {
    "h2": "Si Zbulon Përmbajtjen Dygjuhësh",
    "ps": [
     "Nëntitujt dygjuhësh me dy gjurmë vijnë në dy forma të zakonshme, dhe mjeti njeh secilën prej tyre — **pa e gatuar gjuhën**: **Forma A (një hyrje, dy rreshta)** ndan gjurmët sipas sistemit të shkrimit — kana, hangul, hanzi, latinisht dhe sisteme të tjera, dhjetë në total; dy sisteme të ndryshme do të thonë dygjuhësh, dhe cilado që shfaqet e para llogaritet si origjinale. Një sistem i vetëm (një rresht i gjatë kinez i mbështjellë në dy, për shembull) trajtohet si njëgjuhësh dhe mbahet ashtu siç është. **Forma B (dy hyrje të ndseara me kohë identike)** ndan gjurmët sipas pozicionit — dy hyrjet në të njëjtën kohë formojnë një çift, e para llogaritet si origjinale, dhe kombinimet që ndajnë alfabetin latin, si anglisht-frëngjisht ose anglisht-gjermanisht, ndahen saktë gjithashtu. Kur nuk zbulohet përmbajtje dygjuhëshe, zgjedhësi i modalitetit dhe butoni \"Fillo\" zbehen së bashku me një njoftim të qartë, kështu që nuk detyron kurrë ndarjen në rezultate të gabuara."
    ]
   },
   {
    "h2": "Katër Modalitetet",
    "ps": [
     "Zgjidhni një nga të katërta te menyja rënëse \"Cilën dëshironi?\": **Mbaj vetëm origjinalin** dhe **Mbaj vetëm përkthimin** secila prodhon një skedar të vetëm; **Ndaj në dy** prodhon një skedar origjinal dhe një skedar përkthimi, me emrat e skedarëve të etiketuar automatikisht `.orig` / `.dst` për të parandaluar mbishkrimet; **Bashko në një hyrje me dy rreshta** kthen çdo çift në një hyrje dygjuhëshe — origjinali në njërin rresht, përkthimi në tjetrin — ndërsa çiftet njëgjuhëshe mbahen ashtu siç janë dhe nuk shpiket asnjë rresht i dytë. Kur ndryshoni modalitetet ose formatet e daljes, përmbajtja ekzistuese rinis automatikisht — nuk ka nevojë të klikoni përsëri \"Fillo\"."
    ],
    "img": {
     "file": "bilingual-modes",
     "alt": "Zgjedhja e modalitetit te heqësi dygjuhësh: mbaj origjinalin, mbaj përkthimin, ndaj në dy, bashko në një hyrje me dy rreshta",
     "cap": "Katër modalitete: mbani një gjurmë, ndani në dy, ose bashkoni në një hyrje me dy rreshta"
    }
   },
   {
    "h2": "Hyrja dhe Dalja",
    "ps": [
     "Lexon shtatë formate — SRT, VTT, ASS, SSA, SBV, LRC, TXT (prapashtesa e skedarit e para, zbulimi i përmbajtjes si rezervë) — dhe eksporton katër: SRT, VTT, ASS, TXT. Çdo kombinim hyrje-dalje funksionon, kështu që konvertimi ndër-format ndodh gjatë rrugës. Thyerjet e rreshtave në ASS `\\N` rivendosen në thyerje të vërteta rreshtash, dhe etiketat e efekteve hiqen gjatë eksportit ndër-format."
    ]
   },
   {
    "h2": "Rezultatet dhe Eksporti",
    "ps": [
     "Rezultatet shfaqen plotësisht në një kuti teksti vetëm për lexim, secili skedar me statistika të numrit të hyrjeve dhe kohëzgjatjes totale; butona \"Shkarko\" dhe \"Kopjo\" e marrin skedarin drejtpërdrejt. Zona e rezultateve është një pamje paraprake — nuk ka asnjë editim teksti ose kohe këtu. Për të bërë ndryshime, eksportoni së pari, pastaj përdorni mjetin përkatës."
    ],
    "img": {
     "file": "bilingual-result",
     "alt": "Zona e rezultateve të ndarjes: pamje paraprake vetëm për lexim, statistika të numrit të hyrjeve dhe butona shkarkimi/kopjimi",
     "cap": "Pamje paraprake me tekst të plotë + statistika të hyrjeve dhe kohëzgjatjes + shkarko dhe kopjo"
    }
   },
   {
    "h2": "Pyetjet e bëra shpesh",
    "ps": [
     "**Një hyrje ka anglisht në njërin rresht dhe frëngjisht në tjetrin — pse nuk ndahet?** Forma A ndan gjurmët sipas sistemit të shkrimit, kështu që dy gjuhë që ndajnë një sistem të vetëm brenda një hyrjeje të vetme nuk mund të ndahen. Ristrukturoni atë si Formën B (dy hyrje në të njëjtën kohë) dhe ndarja e bazuar në pozicion do të funksionojë.",
     "**Vetëm një skedar në shkarkim?** \"Mbaj vetëm origjinalin\", \"Mbaj vetëm përkthimin\" dhe \"Bashko në një hyrje me dy rreshta\" prodhojnë secila nga një skedar të vetëm nga dizajni; vetëm \"Ndaj në dy\" ju jep dy, të etiketuar `.orig` / `.dst`.",
     "**A mund të përpunoj në masë?** Një skedar në të njëjtën kohë; radhët nuk mbështeten.",
     "**A i ngarkon njoftimet e mia të nëtitujve?** Jo — analizimi dhe eksporti ekzekutohen plotësisht në shfletuesin tuaj."
    ]
   },
   {
    "h2": "Udhëzues të Ngjashëm",
    "ps": [
     "Për mënyrën e shpejtë për të ndarë dy gjurmë shihni [[Ndarja e nëtitujve dygjuhësh në dy gjurmë|/guides/split-bilingual-subtitles.html]]; për mënyrën se si krijohen nëtitujt dygjuhësh shihni [[Dy Mënyra për të Krijuar Nëntituj Dygjuhësh|/guides/make-bilingual-subtitles.html]]; për përkthim makinë përdorni [[Përkthimi i nëtitujve me AI|/translate.html]]."
    ]
   }
  ]
 },
 "clean": {
  "seo": {
   "title": "Pastruesi i nëtitujve – hiqni filigranët, reklamat, SDH – AI-SRTSub",
   "desc": "Pastruesi i nëtitujve: rregullat e 13 heqin filigranët, reklamat, titujt SDH, etiketat HTML, dublikatat; çdo ndryshim ka një krahasim (diff) dhe mund të zhbëhet. SRT/VTT/ASS, të gjitha në shfletues.",
   "h1": "Si të përdorni pastruesin e nëtitujve",
   "intro": "Nëntitujt e shkarkuar nga uebi shpesh mbajnë filigranë, reklama dhe tituj SDH. Pastruesi zbaton rregullat e 13 në një kalim të vetëm, dhe çdo ndryshim krahasohet dhe mund të kthehet mbrapsht.",
   "ctaText": "Hapni pastruesin e nëtitujve"
  },
  "body": [
   {
    "h2": "Çfarë bën ky mjet",
    "ps": [
     "Skedarët e shkarkuar të nëtitujve shpesh mbajnë gjëra që nuk duhet t'i kenë. Pastruesi i heq ato në një kalim të bazuar në rregulla:"
    ]
   },
   {
    "h2": "Ngarko dhe zbulo",
    "ps": [
     "Tërhiqni një skedar ose klikoni për të ngarkuar — SRT, VTT, ASS, SSA dhe TXT mbështeten — ose ngjitni tekstin e nëtitujve direkt. Kodimi zbulohet automatikisht: nëse dekodimi UTF-8 prodhon karaktere zëvendësuese, kthehet te GBK ose Big5, dhe faqja tregon \"Kodimi u rregullua si {encoding}\". Nëse ngarkoni nëtituj dygjuhësh me dy gjurmë (dy kohë identike, një kinez dhe një anglisht), ato bashkohen në një gjurmë dygjuhëshe me një çelës \"origjinali lart / përkthimi lart\"."
    ]
   },
   {
    "h2": "Konfigurimi i rregullave të 13",
    "ps": [
     "Ndërfaqja ka katër grupe me kutitë e zgjedhjes të 13: **Etiketat dhe formatimi** (efektet ASS, etiketimet HTML, karakteret e kontrollit, rinumëro pas renditjes), **SDH dhe efektet zanore** (titujt SDH, etiketat e folësve, rreshtat e pastër të këngëve), **Filigranët dhe hyrjet e panevojshme** (filigranët dhe reklamat, hyrjet e dyfishta, hyrjet boshe), **Rregullimet e tekstit** (pikësimi dhe hapësirat, rregullimi i shkronjave të mëdha, bashkimi i rreshtave të shkurtër). Vetëm artikujt \"pa humbje dhe të sigurt\" janë aktivë si parazgjedhje; artikujt që mund të humbasin përmbajtje (rreshtat e këngëve, rregullimi i shkronjave të mëdha, bashkimi i rreshtave të shkurtër) janë të fikur — zgjidhni ata kur është e nevojshme. Çdo artikull ka një këshillë me kalimin e mausit ⓘ, dhe çdo ndryshim i kutisë së zgjedhjes rivendoset menjëherë."
    ],
    "img": {
     "file": "clean-opts",
     "alt": "Ndërfaqja e opsioneve të pastrimit: katër grupe kutish zgjedhjeje të 13, numri aktiv shfaqet lart",
     "cap": "Katër grupe, rregullat e 13; vetëm artikujt pa humbje të aktivizuar si parazgjedhje, ndryshimet zbatohen menjëherë"
    }
   },
   {
    "h2": "Krahasimi i ndryshimeve (diff) dhe zhbërja",
    "ps": [
     "Rezultatet nuk mbishkruhen direkt: çdo ndryshim është i listuar në një tabelë krahasimi me një etiketë rregulli (pse kjo hyrje u redaktua ose u fshi). Dëshironi ta ktheni mbrapsht? Klikoni \"Rivendos\" në atë rresht; \"Rivendos të gjitha\" kthen gjithçka mbrapsht me një klikim, dhe klikimi i tij përsëri zbaton përsëri pastrimin e plotë. Shiriti i statistikave tregon numrat për origjinal / të pastruar / të fshirë / të modifikuar / të rivendosur."
    ],
    "img": {
     "file": "clean-diff",
     "alt": "Tabela e krahasimit të ndryshimeve: indeksi, koha, teksti origjinal kundrejt të pastruar, etiketa e rregullit në çdo rresht",
     "cap": "Çdo ndryshim mban një etiketë rregulli; rivendosni rreshtat individualë ose të gjithë menjëherë"
    }
   },
   {
    "h2": "Pamja paraprake dhe eksporti",
    "ps": [
     "Kaloni ndërmjet pamjeve \"Të pastruara / Origjinale\". Në pamjen origjinale, hyrjet e fshira kanë një vijë përmes dhe shënohen \"Të fshira\", dhe skedari i eksportuar përputhet saktësisht me pamjen paraprake. Formatet e eksportit: SRT (parazgjedhje), VTT, ASS (në dispozicion kur burimi është ASS, me seksionin e stilit të ruajtur ashtu siç është), dhe TXT me tekst të thjeshtë pa kohëmatës. Emri i skedarit merr automatikisht një shënues `.clean`."
    ],
    "img": {
     "file": "clean-preview",
     "alt": "Pamje paraprake me tekst të plotë: pamjet e pastruara dhe origjinale me një shirit statistikash që tregon numrat",
     "cap": "Dy pamje paraprake, ajo që shihni është ajo që merrni"
    }
   },
   {
    "h2": "Pyetjet e bëra shpesh",
    "ps": [
     "**A do të fshijë dialogun normal gabimisht?** Rregullis i filigranëve fillimisht heq rreshtat e filigranëve (duke ruajtur rreshtat e dialogut brenda hyrjeve dygjuhëshe) dhe fshin të gjithë hyrjen vetëm nëse mbesin gjurmë; heqja e SDH prek vetëm përmbajtjen në kllapa me fjalë kyçe SDH që është 40 karaktere ose më e shkurtër — dialogu i zakonshëm në kllapa mbetet.",
     "**Si dallohen rreshtat e pastër të këngëve nga tekstet brenda dialogut?** Vetëm hyrjet ku çdo rresht i vetëm mbështillet në nota muzikore ♪ ose shënues si [music] fshihen; dialogu që përmban tekste këngësh ruhet.",
     "**A mund të prekin etiketat e folësve tekstin kinez?** Vetëm një emër alfanumerik me shkronja të mëdha në fillim të rreshtit i ndjekur nga një zorrë e trashë (si `GEORGE:`) përputhet; fjalitë me zorrë të trashë kineze nuk përputhen kurrë.",
     "**A mund të pastroj skedarë të shumtë menjëherë?** Jo — një skedar për çdo ekzekutim. Shkarkoni rezultatin, pastaj ngarkoni të radhës."
    ]
   },
   {
    "h2": "Privatësia",
    "ps": [
     "Pastrimi ekzekutohet plotësisht në shfletuesin tuaj; asnjë përmbajtje nëtitulli nuk i dërgohet kurrë ndonjë serveri."
    ]
   },
   {
    "h2": "Mjete dhe udhëzues të ngjashëm",
    "ps": [
     "Për një udhëzues të shkurtër të përqendruar te heqja e filigranëve dhe reklamave, shihni [[hiqni reklamat dhe filigranët e nëtitujve|/guides/remove-subtitle-ads.html]]; kaloni skedarin tuaj përmes [[kontrollit të cilësisë së nëtitujve|/guides/subtitle-quality-check.html]] para se ta dorëzoni; për të ndryshuar formatet përdorni [[konvertimin e formateve|/convert.html]]."
    ]
   }
  ]
 },
 "convert": {
  "seo": {
   "title": "Si të Konvertoni Formatet e Nëntitujve (SRT, VTT, ASS, SBV, LRC, TXT) – AI-SRTSub",
   "desc": "Një udhëzues i ilustruar i konvertuesit: hidhni një skedar, kontrolloni formatin e zbuluar, zgjidhni formatin e daljes, trajtoni tekstin dygjuhësh dhe shkarkoni. Gjithçka ekzekutohet në shfletuesin tuaj.",
   "h1": "Udhëzues për Konvertuesin e Formateve të Nëntitujve",
   "intro": "Ky udhëzues kalon faqen nga lart poshtë: ngarkoni një nëtitull, konfirmoni formatin e zbuluar, zgjidhni formatin e daljes dhe shkarkoni. Gjithçka ekzekutohet në shfletuesin tuaj — asnjë skedar nuk largohet kurrë nga pajisja juaj.",
   "ctaText": "Hapni konvertuesin e nëtitujve"
  },
  "body": [
   {
    "h2": "Ngarkoni nëtitujt tuaj",
    "ps": [
     "Tërhiqni një skedar në kutinë me vija ose klikoni për të zgjedhur një; ju mund të **ngjitni gjithashtu përmbajtjen** direkt në kutinë e tekstit. Formati zbulohet si nga prapashtesa ashtu edhe nga përmbajtja, dhe rezultati shfaqet në etiketën e formatit."
    ],
    "img": {
     "file": "convert-upload",
     "alt": "Zona e ngarkimit: një SRT shembull i ngarkuar, i zbuluar si SRT",
     "cap": "Formati i zbuluar shfaqet në etiketë — kontrolloni këtu në radhë të parë nëse keni dyshime"
    }
   },
   {
    "h2": "Zgjidhni formatin e daljes",
    "ps": [
     "Zgjidhni formatin e synuar nga menyja rënëse: gjashtë opsione — srt, vtt, ass, sbv, lrc, txt. Konvertimi në ass rindërton një stil parazgjedhjeje fiks 1920×1080 (tekst i bardhë, kontur i zi, në qendër poshtë) dhe **nuk ruan fontet ose ngjyrat origjinale**; txt eksporton vetëm tekstin, pa kohëmatës."
    ],
    "img": {
     "file": "convert-opt",
     "alt": "Menyja rënëse e formatit të daljes me VTT të zgjedhur",
     "cap": "Formati i daljes nuk ndjek hyrjen — ju e zgjidhni atë"
    }
   },
   {
    "h2": "Trajtimi dygjuhësh",
    "ps": [
     "Nëse skedari është dygjuhësh (dy rreshta në një skenë, ose skena të ndërthurura), paraqitja ruhet ashtu siç është gjatë konvertimit. Zgjedhja e \"mbaj dygjuhësh\" ndan dy gjuhët në rreshta të sipërm dhe të poshtëm, secili i mbështjellur përsëri më vete; kontrolli çaktivizohet kur nuk zbulohet tekst dygjuhësh."
    ]
   },
   {
    "h2": "Konverto dhe shkarko",
    "ps": [
     "Klikoni \"Konverto\": paneli i rezultateve tregon numrin e skenave dhe kohëzgjatjen totale, me tekstin gati për t'u inspektuar. Klikoni **Shkarko** për të ruajtur skedarin, ose **Kopjo** për të marrë tekstin direkt. Konvertimi nuk ndryshon kurrë asnjë vlerë kohe — ai rishkruan vetëm formatin. Për të ritimuar skenat, përdorni [[mjetin e kohës|/shift.html]]."
    ],
    "img": {
     "file": "convert-result",
     "alt": "Paneli i rezultateve: numri i skenave dhe kohëzgjatja totale me butonat e shkarkimit dhe kopjimit",
     "cap": "6 skena, 0:23 totale — shfletoni tekstin para se ta shkarkoni"
    }
   }
  ]
 },
 "extract": {
  "seo": {
   "title": "Nxjerrja e tekstit të thjeshtë nga nëtitujt – Dy paraqitje, pesë pastrime – AI-SRTSub",
   "desc": "Nxjerrni dialogun nga nëtitujt si tekst i thjeshtë i pastër: paragrafë të vazhdueshëm ose një rresht për çdo skenë, dhe çfarë heqin pesë çelësat për skenat SDH, filigranët, dublikatat, parashtesat dhe tekstet e këngëve.",
   "h1": "Si të nxirrni tekst të thjeshtë nga nëtitujt",
   "intro": "Tërhiqni dialogun jashtë një skedari nëtitulli si tekst të thjeshtë të pastër: numrat e skenave, kohëmatësit dhe etiketimet e stilit hiqen automatikisht, kështu që rezultati lexohet si një artikull ose funksionon si një listë dialogu.",
   "ctaText": "Hapni nxjerrësin e tekstit të thjeshtë"
  },
  "body": [
   {
    "h2": "Çfarë bën ky mjet",
    "ps": [
     "Vetëm dialogu në një skedar nëtitulli ka rëndësi për një lexues; pjesa tjetër është strukturë e krijuar për një lexues — numrat e skenave, kohëmatësit, etiketimet e stilit. Kjo faqe heq strukturën dhe mban fjalët."
    ]
   },
   {
    "h2": "Hidheni atë, jo vetëm ngarkoni",
    "ps": [
     "Kolona \"1 Shto nëtituj\" në të majtë pranon një skedar të ngarkuar, dhe ju mund të ngjitni gjithashtu përmbajtjen e nëtitujve direkt në kutinë e tekstit. Nëse keni zgjedhur skedarin e gabuar, klikoni \"Pastro\" dhe filloni përsëri.",
     "Kjo faqe lexon skedarët si UTF-8. Nëse nëtitujt hapen si një mur me pikëpyetje ose kuti, kodimi është i prishur — konvertojeni atë në UTF-8 te [[Rregullimi i tekstit të korruptuar|/repair.html]] fillimisht, pastaj kthehuni përsëri."
    ],
    "img": {
     "file": "extract-up",
     "alt": "Zona e shtimit të nëtitujve të nxjerrësit të tekstit të thjeshtë",
     "cap": "Ngarkoni një skedar, ose ngjitni përmbajtjen e nëtitujve direkt në kutinë e tekstit"
    }
   },
   {
    "h2": "Zgjedhja midis dy paraqitjeve",
    "ps": [
     "Në krye të \"2 Opsionet e nxjerrjes\" është paraqitja: **Paragrafë të vazhdueshëm** ndan tekstin në pauza dhe shenja pikësimi të mbylljes së fjalisë kështu që lexohet si një artikull; **Një rresht për çdo skenë** jep një rresht për çdo hyrje nëtitulli, duke u përputhur një për një me hyrjet e skedarit origjinal.",
     "Kopjimi i dialogut për shënime, ushtrimi i përkthimit ose leximi i tij si prozë kërkon paragrafë të vazhdueshëm; ndërtimi i një flete dialogu, krahasimi rresht për rresht me origjinalin ose ushqimi i një mjeti tjetër kërkon një rresht për çdo skenë."
    ],
    "img": {
     "file": "extract-opt",
     "alt": "Opsionet e paraqitjes dhe çelësat e pastrimit nën opsionet e nxjerrjes",
     "cap": "Zgjidhni një paraqitje; pesë çelësat më poshtë vendosin se çfarë lloj përmbajtjeje hiqet"
    }
   },
   {
    "h2": "Çfarë heq secili nga pesë pastrimet",
    "ps": [
     "**Hiq skenat SDH**: fshin përshkrimet e zërit në kllapa si \"(hapa)\" ose \"[music]\" dhe ruan dialogun.",
     "**Hiq filigranët dhe reklamat**: heq rreshtat si kreditet e fansub-eve, URL-të dhe emrat e kanaleve.",
     "**Hiq fqinjët e dyfishtë**: kur e njëjta fjali shfaqet dy herë rresht (një defekt riprodhimi) mbahet vetëm një kopje; dublikatat më larg mbajnë kuptim dhe lihen të qetë.",
     "**Hiq parashtesat e folësve**: \"JOHN: Përshëndetje\" bëhet \"Përshëndetje\". E fikur si parazgjedhje — teksti në stil skenari duhet të tregojë se kush po flet.",
     "**Anashkalo rreshtat e këngëve**: rreshtat që janë plotësisht \"♪ … ♪\" anashkalohen. Të fikur si parazgjedhje — tekstet e këngëve janë gjithashtu fjalë."
    ],
    "img": {
     "file": "extract-clean",
     "alt": "Pesë çelësat e pastrimit dhe përshkrimet e tyre nën opsionet e nxjerrjes",
     "cap": "Çdo çelës tregon se çfarë heq në të djathtë të tij; zgjidhni ato që ju duhen"
    }
   },
   {
    "h2": "Marrja e rezultatit",
    "ps": [
     "Kolona \"3 Rezultati\" në të djathtë tregon tekstin e nxjerrë drejtpërdrejt dhe rifreskohet sapo të ndryshoni një opsion.",
     "Kur të jeni të kënaqur, klikoni \"Shkarko\" për të ruajtur një .txt ose \"Kopjo\" për të marrë tekstin me vete. Për gjuhët që nuk ndajnë fjalët me hapësira, si kinezishtja dhe japonishtja, bashkimi i rreshtave ndjek rregulla të ndryshme, dhe mjeti e trajton këtë për çdo gjuhë automatikisht."
    ],
    "img": {
     "file": "extract-out",
     "alt": "Zona e rezultatit me butonat e shkarkimit dhe kopjimit",
     "cap": "Rezultati përditësohet drejtpërdrejt; shkarkojeni si txt ose kopjojeni direkt"
    }
   },
   {
    "h2": "Çfarë lihet e paprekur",
    "ps": [
     "Vetë dialogu nuk rishkruhet. Çelësat e pastrimit vendosin vetëm se cilët rreshta të tërë ose blloqe hiqen; ato nuk ndryshojnë kurrë fjalët e një hyrjeje.",
     "Kohëmatësit dhe numrat e skenave thjesht nuk dalin, nuk ndryshojnë dhe pastaj dalin — skedari origjinal është i paprekur, dhe kjo faqe nuk ofron eksport me kohëmatës. Kjo punë i përket [[Konvertimit të formateve|/convert.html]]."
    ]
   },
   {
    "h2": "Pyetje të zakonshme",
    "ps": [
     "**A qëndrojnë etiketimet e stilit ASS në tekst?** Jo. Blloqet e mbivendosjes ASS `{}` hiqen dhe vetëm dialogu mbetet.",
     "**A del një skedar dygjuhësh si dy rreshta apo një?** Aq rreshta sa kishte hyrja; kjo faqe as nuk i bashkon dhe as nuk i ndan — për t'i ndarë përdorni [[Ndarjen dygjuhëshe|/bilingual.html]].",
     "**Pse ruhen parashtesat e folësve si parazgjedhje?** Emri në \"JOHN: Përshëndetje\" është shpesh informacion i dobishëm (skenarë, fleta dialogu), dhe heqja e tij e bën të vështirë të thuhet se kush po flet, kështu që zgjedhja i lihet juve.",
     "**A mund të nxirren gjithashtu skedarët e teksteve të këngëve LRC?** Po. Etiketimet e kohës LRC hiqen dhe rreshtat e teksteve të këngëve mbeten; nëse nuk doni tekste këngësh, zgjidhni \"Anashkalo rreshtat e këngëve\"."
    ]
   },
   {
    "h2": "Privatësia",
    "ps": [
     "Nëntitujt përpunohen plotësisht në shfletues: asgjë nuk ngarkohet dhe asgjë nuk kalon përmes një serveri. Teksti qëndron vetëm në faqen aktuale dhe fshihet kur rifreskohet."
    ]
   },
   {
    "h2": "Mjete dhe udhëzues të ngjashëm",
    "ps": [
     "Për të kuptuar se çfarë përmban në të vërtetë një skedar nëtitulli shihni [[Çfarë ka brenda një skedari SRT|/guides/srt-file-format.html]]; për të përkthyer dialogun e nxjerrë shkoni te [[Përkthimi i nëtitujve|/translate.html]]; për ta kthyer atë në një tabelë përdorni [[Nëntitujt në Excel/CSV|/guides/srt-to-excel.html]]; dhe ekzekutoni [[Kontrollin e cilësisë së nëtitujve|/qc.html]] para se të dorëzoni ndonjë gjë."
    ]
   }
  ]
 },
 "extract-subtitles-from-video": {
  "seo": {
   "title": "Nxjerrja e nëtitujve nga një video – Të integruar kundrejt të jashtëm – AI-SRTSub",
   "desc": "Çfarë mbajnë MKV / WebM / MP4 / MOV secili, sesi ndryshojnë gjurmët e tekstit, ASS, WebVTT dhe mov_text, pse nëtitujt e imazhit (PGS / DVD) nuk kanë tekst, dhe çfarë të bëni pas nxjerrjes.",
   "h1": "Nxjerrja e nëtitujve nga një video",
   "intro": "Nëntitujt mund të jetojnë brenda një skedari videoje ose të qëndrojnë vetëm jashtë tij. Brenda, ata janë një gjurmë në kontejner — nxjerrja e tyre nuk ka të bëjë fare me transkodimin.",
   "ctaText": "Hapni nxjerrjen e nëtitujve të videos"
  },
  "body": [
   {
    "h2": "Ku jetojnë nëtitujt: të integruar dhe të jashtëm",
    "ps": [
     "Një skedar videoje (MKV, MP4) është një kontejner që mban një gjurmë videoje, një gjurmë audioje dhe gjurmë nëtitujsh në të njëjtën kohë. Nëntitujt e mbyllur brenda janë **të integruar**; një skedar i veçantë .srt / .ass që ndodhet jashtë është **i jashtëm**, dhe një gjurmë e integruar quhet gjithashtu **e bashkangjitur (muxed in)**.",
     "Nëntitujt e jashtëm mund të përdoren ashtu siç janë. Problemi janë ato të integruar: për t'i edituar, për t'i përkthyer ose për të ndërtuar një gjurmë dygjuhëshe nga origjinali, nuk keni asnjë skedar nëtitulli në dorë — duhet të lexoni gjurmën jashtë kontejnerit fillimisht. Ky hap nuk është transkodim: videoja nuk kodohet përsëri, lexohen vetëm të dhënat e ruajtura tashmë në kontejner."
    ]
   },
   {
    "h2": "Cili kontejner mban çfarë",
    "ps": [
     "Kontejnerë të ndryshëm mbajnë formate të ndryshme nëtitujsh, dhe vështirësia e nxjerrjes ndryshuje gjithashtu:"
    ],
    "img": {
     "file": "videosub-which",
     "alt": "Gjurmët e nëtitujve të listuara nga faqja e nxjerrjes së nëtitujve të integruar",
     "cap": "Një gjurmë për çdo rresht, zakonisht me një gjuhë dhe një emër gjurme; kur ka vetëm një, ajo nxirret automatikisht"
    }
   },
   {
    "h2": "Pse nëtitujt e imazhit nuk mund të nxirren",
    "ps": [
     "Nëntitujt Blu-ray PGS dhe DVD ruajnë fare karaktere, vetëm një seri imazhesh me një kanal alfa. Kur një lexues i tregon ato, ai po ngjit një foto, jo duke renderuar tekst.",
     "Pra nuk ka asnjë tekst në një gjurmë të tillë për t'u lexuar — nuk është se mjeti nuk e mbështet atë, është se nuk ka karaktere atje. Faqja thotë qartë kur ndeshet me një të tillë.",
     "E vetmja mënyrë për të marrë fjalë është të njihni më parë karakteret në ato imazhe (OCR) dhe të ndërtoni nëtituj nga kjo. Ky është një proces i veçantë nga tërheqja e një gjurme jashtë."
    ]
   },
   {
    "h2": "Çfarë vjen zakonisht pas nxjerrjes",
    "ps": [
     "Ajo që del është gjurma ashtu siç ishte: mjeti nuk merr me mend kodimet dhe nuk korrigjon kohëmatësit. Kështu që dy gjëra dalin shpesh:",
     "Njëra është **teksti i korruptuar** — një problem kodimi në gjurmën e burimit që del i korruptuar njësoj; shkoni te [[Si të rregulloni tekstin e korruptuar|/guides/repair.html]] për të identifikuar kodimin. Tjetra është **koha e gabuar** — pavarësisht nëse burimi ka një logo hyrëse, ose shpejtësitë e kuadrove nuk përputhen, rezultati zhvendoset në të tutje si një i tërë; përdorni [[Përshtatjen e kohës|/shift.html]] për ta zhvendosur ose shkallëzuar atë.",
     "Pas kësaj, për të përkthyer shkoni te [[Përkthimi i nëtitujve|/translate.html]], dhe për ta bërë atë dygjuhësh shihni [[Dy mënyra për të krijuar nëtituj dygjuhësh|/guides/make-bilingual-subtitles.html]]."
    ],
    "img": {
     "file": "videosub-formats",
     "alt": "Zona e rezultatit me formatet e eksportit SRT / VTT / ASS / TXT",
     "cap": "Nëntitujt e nxjerrë mund të eksportohen në katër formate; një burim ASS muan kokën e stilit dhe rezolucionin e tij"
    }
   },
   {
    "h2": "Disa gjëra që gabohen lehtë",
    "ps": [
     "**Nxjerrja e nëtitujve nuk është futja e tyre brenda (burning them in).** Videoja nuk kodohet përsëri, kështu që cilësia e imazhit dhe audioja nuk preken.",
     "**Nxjerrja nuk prek skedarin origjinal.** Vetëm për lexim, nuk shkruhet kurrë, dhe asnjë bajt i videos nuk ndryshon.",
     "**Një skedar i madh që është i ngadaltë nuk është një problem lidhjeje.** Mjeti skanon informacionin e gjurmëve copë pas cope, dhe sa më i madh të jetë skedari aq më shumë kohë duhet; e gjithë kjo ndodh në vend (lokalisht).",
     "**Nëntitujt e jashtëm nuk kanë nevojë për këtë faqe.** Nëse keni një .srt / .ass, shkoni drejtpërdrejt te [[Konvertimi i formateve|/convert.html]]; vetëm nëtitujt e mbyllur brenda një videoje kanë nevojë për nxjerrje paraprake."
    ]
   },
   {
    "h2": "Mjete dhe udhëzues të ngjashëm",
    "ps": [
     "Për udhëzuesin e plotë shihni [[Si të nxirrni nëtituj të integruar në një video|/guides/videosub.html]]; për të përkthyer atë që nxirrni shkoni te [[Përkthimi i nëtitujve|/translate.html]], për ta bërë dygjuhësh shihni [[Dy mënyra për të krijuar nëtituj dygjuhësh|/guides/make-bilingual-subtitles.html]]; për tekst të korruptuar filloni me [[Rregullimi i tekstit të korruptuar|/repair.html]]."
    ]
   }
  ]
 },
 "fps-23-976-vs-25": {
  "seo": {
   "title": "Çfarë do të thonë vërtet 23.976 / 24 / 25 / 30 fps – Koha e nëtitujve – AI-SRTSub",
   "desc": "23.976 nuk është 24 dhe 29.97 nuk është 30 — 0.1% që mungon vjen nga ngjyra NTSC, ndërsa PAL i lë filmat 4% më shpejt. Se si këto zhvendosin kohën e nëtitujve tuaj, dhe si të konvertoni ndërmjet tyre.",
   "h1": "Çfarë do të thonë vërtet 23.976 / 24 / 25 / 30 fps",
   "intro": "Pika 0.1% midis 23.976 dhe 24 është një mbetje nga historia e televizionit. Së bashku me 4% të PAL-it, ajo është arsyeja pse nëtitujt largohen më tej nga sinkronizimi ndërsa një film vazhdon.",
   "ctaText": "Hapni përshtatjen e kohës"
  },
  "body": [
   {
    "h2": "Çfarë është secili numër",
    "ps": [
     "Shpejtësia e kuadrove është se sa imazhe shfaqen në një sekondë. Të katër që i takoni më shpesh:"
    ]
   },
   {
    "h2": "Nga vjen 0.1%",
    "ps": [
     "23.976 = 24 × 1000/1001, dhe 29.97 = 30 × 1000/1001. Ky 1000/1001 është një mbetje nga shtimi i ngjyrës te NTSC: për të futur nënmbajtësin e ngjyrës pa prishur marrësit ekzistues bardh e zi, shpejtësia e fushës u ul nga 60 Hz në 59.94 Hz (60 × 1000/1001), dhe shpejtësia e kuadrove u ul bashkë me të.",
     "Rezultati: filmat transmetohen me 23.976 në rajonet NTSC në vend të 24. Dallimi është 0.1%, ose 3.6 sekonda gjatë një ore — vështirë se i dukshëm më vete, por mos e ngatërroni me 4% më poshtë dhe mos i kombinoni kurrë të dyja në një llogaritje të vetme."
    ]
   },
   {
    "h2": "Nga vjen 4%",
    "ps": [
     "Rajonet PAL shfaqin me 25 fps. Filmat xhirohen me 24 fps dhe thjesht luhen me 25 — asnjë kuadër i shtuar ose i hequr, kështu që riprodhimi ecën 4% më shpejt (25/24 ≈ 1.0417). Një film 100-minutësh zgjat 96 minuta në versionin e tij PAL.",
     "Ky është burimi i **devijimit progresiv**: nëtitujt e bërë kundrejt origjinalit dhe videos në versionin PAL përputhen saktësisht në fillim dhe janë katër minuta larg nga kreditet. Asnjë zhvendosje globale nuk mund ta shpëtojë këtë; duhet të shkallëzohet me raport."
    ],
    "img": {
     "file": "shift-step-rate",
     "alt": "Seksioni i shpejtësisë së faqes së kohës: kutia e futjes së raportit",
     "cap": "Shkallëzo sipas raportit — një vlerë mbulon të gjithë filmin"
    }
   },
   {
    "h2": "Si të konvertoni",
    "ps": [
     "Konvertimi do të thotë shumëzim me një raport të vetëm që zbatohet në të gjithë filmin:"
    ]
   },
   {
    "h2": "Si të dalloni se cilin keni",
    "ps": [
     "Në vend që të merrni me mend raportin, gjeni dy momente koha e saktë e të cilëve jeni të sigurt — zakonisht rreshti i parë dhe i fundit i dialogut — dhe i thoni mjetit \"ky rresht duhet të jetë në 00:00:12 dhe ai tjetri në 01:35:40\"; ai shtrin të gjithë filmin në mënyrë lineare midis këtyre dy pikave. Kjo është \"ankorimi me dy pika\", dhe nuk kërkon aritmetikë të shpejtësisë së kuadrove nga ju.",
     "Për të konfirmuar vetë shpejtësinë e kuadrove, kontrolloni lexuesin tuaj ose një mjet informacioni mediash. Kur një emër skedari si `1080p.WEB` nuk mban asnjë sugjerim të shpejtësisë së kuadrove, ankorimi me dy pika është rruga më e sigurtë."
    ],
    "img": {
     "file": "shift-step-two",
     "alt": "Seksioni i ankorimit me dy pika i faqes së kohës: dy rreshta hyrjesh kohëmatëse",
     "cap": "Ankorimi me dy pika nuk ka nevojë për shpejtësi kuadri — vetëm dy kohëmatës"
    }
   },
   {
    "h2": "Mjete dhe udhëzues të ngjashëm",
    "ps": [
     "Vetë konvertimi i shpejtësisë së kuadrove — [[Konvertimi i shpejtësisë së kuadrove të nëtitujve|/guides/srt-fps-converter.html]]; rregullimi i shpejtësisë — [[Konvertimi i shpejtësisë së nëtitujve|/guides/subtitle-speed-converter.html]]; i pasigurt nëse është një zhvendosje globale apo devijim progresiv — [[Nëntitujt që largohen më shumë nga sinkronizimi|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "glossary": {
  "seo": {
   "title": "Zëvendësimi i termave në masë në nëtituj – Një tabelë rregullon një skedar – AI-SRTSub",
   "desc": "Një rregull për rresht, i ndarë me -> , => , → ose Tab, me # për komentet. Përputhje e fjalëve të plota, ndjeshmëria ndaj madhësisë së shkronjave, rreshti i parë ose i dytë i një skene dygjuhëshe, çdo ndryshim i listuar dhe i kthyeshëm.",
   "h1": "Si të zëvendësoni termat në masë në nëtituj",
   "intro": "Një tabelë termash e bën fjalorin e një skedari të tërë nëtitulli të qëndrueshëm menjëherë — kohëmatësit, stilet ASS dhe blloqet VTT NOTE nuk preken nga asnjë karaktere i vetëm.",
   "ctaText": "Hapni zëvendësimin e termave në masë"
  },
  "body": [
   {
    "h2": "Çfarë bën ky mjet",
    "ps": [
     "I njëjti fjalë i përkthyer në dy mënyra të ndryshme, emrat dhe vendet që deviojnë me përkthimin e makinës, nëtitujt e dikujt tjetër që duhet të përputhen me konventat tuaja — të gjitha këto ndajnë një tipar: ajo që ndryshon është një fjalë, jo struktura. Kjo faqe ndryshon vetëm fjalët."
    ]
   },
   {
    "h2": "Dy hyrje: nëtitujt dhe një tabelë termash",
    "ps": [
     "Kolona \"1 Shto nëtituj\" në të majtë merr një skedar nëtitulli, ose mund të ngjitni përmbajtjen drejtpërdrejt; nëse keni zgjedhur skedarin e gabuar, klikoni \"Pastro\".",
     "Kolona \"2 Tabela e termit\" në të drejtë mban rregullat. **Një rregull për rresht**, me termin e vjetër dhe termin e ri të ndarë nga `->` , `=>` , `→` ose një Tab — të katërta funksionojnë. Rreshtat që fillojnë me `#` janë komente dhe nuk marrin pjesë në zëvendësim.",
     "Nëse nuk jeni të sigurt për formatin, klikoni \"Plotëso një shembull\" dhe redaktoni atë."
    ],
    "img": {
     "file": "glossary-up",
     "alt": "Zona e shtimit të nëtitujve dhe hyrja e tabelës së termit të faqes së zëvendësimit të termave",
     "cap": "Nëntitujt majtas, rregullat djathtas; një rregull për rresht, termi i vjetër dhe termi i ri të ndarë nga ->"
    }
   },
   {
    "h2": "Si të shkruani tabelën e termit",
    "ps": [
     "Një rregull për rresht: termi aktual majtas, çfarë duhet të bëhet djathtas. Për shembull `Thor -> Donar` zëvendëson çdo \"Thor\" në skedar me \"Donar\".",
     "Komentet fillojnë me `#` dhe janë të dobishme për etiketimin e një grupi rregullash (për shembull \"# rregullimet e emrave të sezonit 1\"), dhe për fikjen e një rregulli përkohësisht — thjesht vendosni një `#` përpara në vend që ta fshini.",
     "Rregullat ekzekutohen nga lart poshtë; teksti i prodhuar nga një rregull skanohet përsëri nga rregullat poshtë tij. Kur rendi ka rëndësi (p.sh., zëvendësoni A me B së pari dhe pastaj B me C), mbani parasysh këtë."
    ],
    "img": {
     "file": "glossary-table",
     "alt": "Rresht pas rreshti rregullash zëvendësimi në hyrjen e tabelës së termit",
     "cap": "Një rregull për rresht; rreshtat që fillojnë me # janë komente dhe mund të fikni një rregull përkohësisht"
    }
   },
   {
    "h2": "Çfarë bëjnë tre çelësat",
    "ps": [
     "**Fusha e veprimit (Scope)**: `all` / `first line only` / `second line only`. Në një skedar dygjuhësh, zgjidhni \"vetëm rreshti i dytë\" kur doni të ndryshoni vetëm përkthimin; hyrjet që kanë vetëm një rresht mbeten të paprekura nën çdo cilësi me një rresht — mjeti nuk merr me mend se cila anë është origjinali.",
     "**Fjalë e plotë**: zëvendëson vetëm termat që qëndrojnë vetëm si një fjalë, kështu që `art` nuk do të prekë `start`. Për gjuhët që nuk ndajnë fjalët me hapësira, si kinezishtja dhe japonishtja, ky çelës nuk ka efekt — zëvendësimi funksionon mbi nënstringa atje.",
     "**I ndjeshëm ndaj madhësisë së shkronjave**: i fikur si parazgjedhje, kështu që `CEO` dhe `ceo` zëvendësohen të dyja; kur zgjidhet, zëvendësohet vetëm drejtshkrimi i saktë."
    ],
    "img": {
     "file": "glossary-opt",
     "alt": "Çelësat e fushës së veprimit, fjalës së plotë dhe ndjeshmërisë ndaj madhësisë së shkronjave nën tabelën e termit",
     "cap": "Fusha e veprimit vendos se cili rresht ndryshon; fjalët e plota dhe shkronjat vendosin se sa rreptë përputhet një term"
    }
   },
   {
    "h2": "Çdo ndryshim i listuar, çdo ndryshim i kthyeshëm",
    "ps": [
     "\"3 Rezultati\" tregon nëtitujt e zëvendësuar dhe gjithashtu **liston çdo ndryshim**: cila skenë, cili rresht, nga çfarë në çfarë.",
     "Nëse nuk doni një prej tyre, klikoni atë në listë për të kthyer mbrapsht vetëm atë hyrje — nuk ka nevojë të redaktoni tabelën e termit dhe ta ekzekutoni përsëri. Kur të jeni të kënaqur, klikoni \"Shkarko\" ose \"Kopjo\"."
    ],
    "img": {
     "file": "glossary-out",
     "alt": "Zona e rezultatit me listën e ndryshimeve individuale",
     "cap": "Çdo ndryshim është i listuar; klikoni një që nuk e doni për ta kthyer mbrapsht"
    }
   },
   {
    "h2": "Çfarë lihet e paprekur",
    "ps": [
     "**Kohëmatësit, rreshtat e stilit ASS dhe blloqet VTT `NOTE` nuk preken nga asnjë karaktere i vetëm.** Zëvendësimi zbatohet vetëm për tekstin e dialogut, kurrë për rreshtat strukturorë.",
     "Tabela e termit nuk modifikon kurrë skedarin tuaj të nëtitujve automatikisht — rezultati është një dalje e re dhe origjinali qëndron ashtu siç është."
    ]
   },
   {
    "h2": "Pyetje të zakonshme",
    "ps": [
     "**Pse një term nuk u zëvendësua?** Kontrolloni fushën e veprimit së pari: me \"vetëm rreshti i dytë\" të zgjedhur, hyrjet që kanë vetëm një rresht mbeten të paprekura. Pastaj kontrolloni përputhjen e fjalëve të plota, e cila ndalon përputhjet që nuk janë fjalë më vete.",
     "**Pse kinezishtja i zëvendëson ende nënstringat me përputhjen e fjalëve të plota të zgjedhur?** Kjo pritet. Kinezishtja dhe japonishtja nuk ndajnë fjalët me hapësira, kështu që mjeti nuk mund të përcaktojë kufijtë e fjalëve dhe përputhja e fjalëve të plota nuk ka asnjë efekt atje.",
     "**Si mund t'i kthej të gjitha mbrapsht pas një gabimi?** Ktheni mbrapsht hyrjet një nga një në listën e ndryshimeve; për të filluar përsëri nga e para, pastroni tabelën e termit dhe shtoni përsëri nëtitujt.",
     "**A mund të ndryshohen rreshtat e stilit ASS aksidentalisht?** Jo. Rreshtat e stilit dhe blloqet `NOTE` janë jashtë fushës së veprimit; vetëm teksti i dialogut merr pjesë."
    ]
   },
   {
    "h2": "Privatësia",
    "ps": [
     "Nëntitujt dhe tabela e termit përpunohen plotësisht në shfletues: asgjë nuk ngarkohet dhe asgjë nuk kalon përmes një serveri. Tabela e termit nuk ruhet, kështu që ajo është bosh herën tjetër që hani faqen."
    ]
   },
   {
    "h2": "Mjete dhe udhëzues të ngjashëm",
    "ps": [
     "Nëse duhet të ndërtoni një tabelë termash dhe si ta mbani atë të qëndrueshme në një sezon, shihni [[Tabelat e termave: mbajtja e një sezoni të qëndrueshëm|/guides/subtitle-glossary.html]]; nëse përmbajtja është e ndotur (filigranë, skena SDH) ekzekutoni [[Pastrimin e nëtitujve|/clean.html]] fillimisht; pasi emrat të jenë vendosur dhe t'ju duhen gjuhë të tjera shkoni te [[Përkthimi i nëtitujve|/translate.html]]; dhe ekzekutoni rezultatin përmes [[Kontrollit të cilësisë së nëtitujve|/qc.html]]."
    ]
   }
  ]
 },
 "hanconv": {
  "seo": {
   "title": "Konvertimi i Nëntitujve të Thjeshtuar–Tradicionalë – Tajvan vs Hong Kong – AI-SRTSub",
   "desc": "Udhëzues i nëntë drejtimeve: tajvaneze me ose pa fjalor rajonal, Hong Kongu si shija e tij, e gjitha e konvertueshme përsëri në të thjeshtuar. Ndryshon vetëm dialogu; kohët mbeten në vend.",
   "h1": "Si të konvertoni nëtitujt kinezë të thjeshtuar dhe tradicionalë",
   "intro": "Pavarësisht nëse një nëtitull shkon në Tajvan, Hong Kong ose kontinent, ndryshon si fjalori ashtu edhe forma e karaktereve. Nëntë drejtime për të zgjedhur, dhe vetëm dialogu konvertohet — kohët, numrat e indeksit dhe rreshtat e stilit ASS nuk preken kurrë.",
   "ctaText": "Hapni konvertuesin"
  },
  "body": [
   {
    "h2": "Çfarë bën ky mjet",
    "ps": [
     "Konvertimi midis të thjeshtuarës dhe tradicionales nuk është thjesht shkrimi i secilit karakter ndryshe. I njëjti fjalë i thjeshtuar u përgjigjet fjalëve të ndryshme në rajone të ndryshme — fjala për \"softuer\" ndryshon midis Tajvanit dhe kontinentit, dhe Hong Kongu ka një version tjetër. Konvertuesi i mban këto të ndara:"
    ]
   },
   {
    "h2": "Ngarko dhe zbulo",
    "ps": [
     "Tërhiqni një skedar ose kërkoni për një — SRT, VTT, ASS dhe TXT mbështeten — ose ngjitni tekstin e nëtitujve direkt në kuti. Formati zbulohet automatikisht dhe shfaqet pranë \"Formati i zbuluar\"."
    ],
    "img": {
     "file": "hanconv-up",
     "alt": "Zona e ngarkimit të konvertuesit: zona e tërheqjes dhe kutia e ngjitjes, me formatin e zbuluar lart",
     "cap": "SRT / VTT / ASS / TXT, formati i zbuluar automatikisht"
    }
   },
   {
    "h2": "Zgjedhja ndërmjet nëntë drejtimeve",
    "ps": [
     "Nëntë drejtimet nën \"Konverto në\" ndahen në tri grupe. **E thjeshtuar → tradicionale**: tradicionale gjenerike, tajvaneze (ndryshim fjalori), tajvaneze (vetëm glife), Hong Kong. **Tradicionale → e thjeshtuar**: gjenerike, nga tajvaneze, nga Hong Kongu. **Tradicionale në tradicionale**: format tajvaneze, format e Hong Kongut.",
     "Zgjedhja e \"Fjalorit tajvanez\" ndërron gjithashtu fjalorin rajonal: fjala për \"softuer\" bëhet ajo tajvaneze dhe po kështu edhe fjala për \"informacion\"; \"Glifet tajvaneze\" ndryshojnë vetëm mënyrën se cilat karaktere shkruhen dhe lënë fjalorin tuaj të qetë. Hong Kongu është një rast tjetër tërësisht dhe përdor një fjalë tjetër për \"softuer\". Për t'u kthyer te e thjeshtuar, përdorni grupin më poshtë — duhet të thoni se nga cila larmi tradicionale po vini, sepse teksti tajvanez dhe ai i Hong Kongut marrin rrugë të ndryshme për t'u kthyer."
    ],
    "img": {
     "file": "hanconv-dir",
     "alt": "Karta e konvertimit në: menyja rënëse e destinacionit që tregon \"E thjeshtuar → Tradicionale tajvaneze (ndryshim fjalori)\" e zgjedhur",
     "cap": "Drejtimet jetojnë në menynë rënëse \"Konverto në\" në tri grupe; kjo është tajvaneze me ndryshime fjalori"
    }
   },
   {
    "h2": "Rezultati dhe eksporti",
    "ps": [
     "Zona e rezultatit tregon nëtitullin e konvertuar menjëherë, me një shirit statistikash që jep numrin total të rreshtave dhe sa rreshta kanë ndryshuar. Nëse asgjë nuk ka ndryshuar fare, merrni një sugjerim se skedari mund të mos përmbajë asnjë karakter kinez — vetëm karakteret Han konvertohen, kështu që një nëtitull tërësisht latin ose numerik mbetet saktësisht ashtu siç ishte.",
     "Pastaj shkarkoni ose kopjoni. Një etiketë gjuhe futet në emrin e skedarit — `demo.srt` bëhet `demo.zh-TW.srt` për tradicionale tajvaneze, `.zh-Hant` për tradicionale gjenerike, dhe `.zh-Hans` kur konvertohet përsëri në të thjeshtuar."
    ],
    "img": {
     "file": "hanconv-out",
     "alt": "Zona e rezultatit: nëtitulli i konvertuar dhe shiriti i statistikave",
     "cap": "Shiriti i statistikave tregon numrin total dhe të ndryshuar të rreshtave; shkarkoni ose kopjoni nga këtu"
    }
   },
   {
    "h2": "Çfarë nuk preket kurrë",
    "ps": [
     "Vetëm dialogu konvertohet. Kohëmatësit, numrat e indeksit dhe rreshtat e stilit ASS nuk preken fare — rezultati është gati për t'u përdorur pa ribërë asnjë formatim."
    ]
   },
   {
    "h2": "Pyetjet e bëra shpesh",
    "ps": [
     "**Pse konvertuesi nuk e ndryshoi fjalën për \"pastër\"?** Përputhjet një-shumë zgjidhen me fjalë: kuptimi \"i pastër\" dhe kuptimi \"i thatë\" ndajnë një formë tradicionale, ndërsa kuptimi \"trung druri\" përdor një tjetër. Tabelat vijnë nga OpenCC, duke u përputhur me fraza të plota sesa me karaktere të vetme.",
     "**Cili është ndryshimi midis tradicionales tajvaneze dhe asaj të Hong Kongut?** Fjalori: fjala për \"softuer\" ndryshon midis të dyjave. Zgjidhni drejtimin për rajonin ku po dërgoni.",
     "**Numri i karaktereve ndryshoi pas konvertimit?** Vetëm karakteret Han ndërrohen — asnjë hyrje nuk shtohet ose hiqet dhe asnjë kohë nuk lëviz. Nëse numri i rreshtave ka ndryshuar, kontrolloni nëse formati është zbuluar saktë.",
     "**Fjalori dështoi të ngarkohej?** Faqja ju thotë të rifreskoni dhe të provoni përsëri. Ai ngarkohet lokalisht, kështu që nuk ka nevojë të ngarkoni nëtituj askund."
    ]
   },
   {
    "h2": "Privatësia",
    "ps": [
     "Konvertimi ekzekutohet plotësisht në shfletuesin tuaj. Asnjë përmbajtje nëtitulli nuk i dërgohet kurrë ndonjë serveri."
    ]
   },
   {
    "h2": "Mjete dhe udhëzues të ngjashëm",
    "ps": [
     "Nëse gjithçka që ju duhet është e thjeshtuar në tradicionale, shihni [[Konvertoni nëtitujt e thjeshtuar në tradicionalë|/guides/srt-simplified-to-traditional.html]]; pse bëhet fjalë për më shumë sesa thjesht ndërrimin e karaktereve, shihni [[E thjeshtuar vs tradicionale nuk është një ndryshim karakteresh|/guides/simplified-traditional-chinese.html]]; për të përkthyer në një gjuhë tjetër, [[Përkthimi i nëtitujve|/translate.html]]."
    ]
   }
  ]
 },
 "how-to-make-lrc-file": {
  "seo": {
   "title": "Si të sinkronizoni tekstet LRC – Një rresht për tekst, trokitni ndërkohë – AI-SRTSub",
   "desc": "Ndërtoni një skedar LRC nga e para: ngjitni një rresht teksti për rresht, trokitni kohën ndërkohë që dëgjoni, shkurtoret që kanë rëndësi, kur të kapërceni një rresht, LRC ose SRT, dhe çfarë të bëni kur koha shmanget.",
   "h1": "Si të sinkronizoni tekstet LRC",
   "intro": "Një skedar LRC është thjesht \"një rresht teksti plus një pikë kohe\". Krijimi i tij quhet sinkronizim: kapja e çastit kur fillon secili rresht.",
   "ctaText": "Hapni mjetin e sinkronizimit të teksteve"
  },
  "body": [
   {
    "h2": "Çfarë është në të vërtetë sinkronizimi",
    "ps": [
     "Struktura e një skedari LRC vështirë se mund të jetë më e thjeshtë: një rresht teksti për rresht, secili i paraprirë nga një etiketë kohe `[mm:ss.xx]`. Kur një luajtës arrin në një rresht, ai e shfaq atë tekst në atë moment.",
     "Pra, i gjithë puna e \"krijimit të një LRC\" është caktimi i një pike kohe për çdo rresht teksti — dhe asnjë makinë nuk mund ta bëjë këtë për ju, sepse vendosja se ku fillon të këndohet një rresht kërkon dëgjim."
    ]
   },
   {
    "h2": "Sa kalime i duhen një këngë",
    "ps": [
     "Vlen një minutë mendimi para se të filloni; kursen pjesën më të madhe të punës së përsëritur:"
    ],
    "img": {
     "file": "lrc-tap2",
     "alt": "Kontrollet e luajtjes, vulos-këtë-rresht, zhbëj-një-rresht dhe kapërce-këtë-rresht në zonën e trokitjes",
     "cap": "Shtypja e Enter gjatë riprodhimit është më e buta; keni vulosur rreshtin e gabuar? Shtypni Z dhe vulosni përsëri"
    }
   },
   {
    "h2": "Ngjitja e teksteve përcakton se sa e qetë shkon pjesa tjetër",
    "ps": [
     "Ngjitni tekstet një rresht për tekst; rreshtat e zbrazët kapërcehen. Ndarjet e rreshtave që ngjitni janë rreshtat që do t'i vendosni kohën më vonë — ndajini në më shumë rreshta tani dhe do të trokitni më shumë herë më vonë.",
     "Ngjitja e një LRC ekzistuese funksionon gjithashtu: etiketat e saj të kohës `[mm:ss.xx]` njihen, dhe pas importimit ju **vazhdoni nga rreshti i parë pa kohë**, kështu që rreshtat e sinkronizuar tashmë nuk duhet të ribëhen.",
     "Kjo do të thotë se një LRC gjysmë e e përfunduar mund të ruhet dhe të ngjitet përsëri më vonë për të vazhduar."
    ],
    "img": {
     "file": "lrc-paste2",
     "alt": "Zona e ngjitjes së teksteve dhe butoni i analizimit të teksteve",
     "cap": "Një rresht për tekst; ngjitja e një LRC të plotë lexon kohët ekzistuese në mënyrë që të mund të vazhdoni"
    }
   },
   {
    "h2": "Export LRC or SRT :: Eksporto LRC ose SRT",
    "ps": [
     "**Për një luajtës muzikor, eksportoni LRC.** foobar2000, lloj-lloj luajtësish dhe pajisjesh me shfaqje tekstesh e lexojnë atë.",
     "**Për të vendosur tekste në video ose për t'i përpunuar më tej, eksportoni SRT.** Pjesët e titrave të videos, mjetet e titrave dhe softuerët e redaktimit lexojnë SRT. Në eksport, secili rresht zgjat derisa të fillojë i radhës, dhe rreshti i fundit kthehet te 2 sekonda.",
     "Të dyja eksportojnë vetëm rreshta që kanë një kohë — rreshtat e kapërcyer nuk hyjnë kurrë në skedar."
    ],
    "img": {
     "file": "lrc-export",
     "alt": "Butonat e shkarkimit-LRC, shkarkimit-SRT dhe kopjimit në zonën e eksportit",
     "cap": "LRC për luajtësit, SRT për videon; eksportohen vetëm rreshtat me kohë"
    }
   },
   {
    "h2": "Disa gjëra që gabohen lehtë",
    "ps": [
     "**Gjithçka është pak jashtë orarit pas sinkronizimit? Përdorni një zhvendosje.** Eksportoni SRT dhe zhvendoseni atë si e tërë me [[Timeline adjustment|/shift.html]]; shumë më e shpejtë sesa risinkronizimi rresht pas rreshti.",
     "**Zhvendosja rritet ndërsa kënga vazhdon? Ky është një problem shkalle.** Kur shpejtësia e riprodhimit dhe shpejtësia e regjistrimit ndryshojnë, gabimi rritet drejt fundit, dhe kjo kërkon shkallëzim proporcional, jo një zhvendosje.",
     "**Shkurtoret duken natyrale vetëm nëse i përdorni së bashku.** Hapësira luan dhe ndalon, Enter vulos rreshtin aktual, Z zhbën një rresht — shtypni direkt Enter gjatë riprodhimit në vend që të kaloni midis miut dhe tastierës.",
     "**Cilësia e audios ndikon te saktësia.** Një burim me vokale të qarta është më i lehtë për t'u ndjekur; regjistrimet live dhe burimet me pjesë mbështetëse me zë të lartë janë dukshëm më të vështira."
    ]
   },
   {
    "h2": "Mjete dhe udhëzues të ngjashëm",
    "ps": [
     "Për udhëzuesin e plotë shihni [[How to use the lyric sync tool|/guides/lrc.html]]; për ta kthyer një LRC ekzistuese në titra shihni [[LRC to SRT|/guides/lrc-to-srt.html]]; nëse SRT-ja e eksportuar është e pasaktë në kohë, përdorni [[Timeline adjustment|/shift.html]]; dhe kaloni rezultatin përmes [[Subtitle QC|/qc.html]]."
    ]
   }
  ]
 },
 "lrc": {
  "seo": {
   "title": "Mjeti i sinkronizimit të teksteve – Ngarkoni një këngë, ngjitni tekstet, trokitni ndërkohë – AI-SRTSub",
   "desc": "Ngarkoni një këngë, ngjitni tekstet, trokitni një kohëshënues për rresht ndërkohë që dëgjoni, dhe eksportoni LRC ose SRT. Hapësira luan dhe ndalon, Enter vulos rreshtin, Z zhbën, duart qëndrojnë në tastierë.",
   "h1": "Si të përdorni mjetin e sinkronizimit të teksteve",
   "intro": "Ngarkoni një këngë, ngjitni tekstet, trokitni një kohëshënues për çdo rresht ndërkohë që dëgjoni, dhe eksportoni LRC ose SRT standarde. Audioja luhet lokalisht dhe nuk ngarkohet kurrë.",
   "ctaText": "Hapni mjetin e sinkronizimit të teksteve"
  },
  "body": [
   {
    "h2": "What this tool does :: Çfarë bën ky mjet",
    "ps": [
     "Jepini një këngë një skedar teksti që mund të këndohet: një rresht për tekst, çdo rresht mban një pikë kohe. Luajtësit lexojnë LRC, pjesët e titrave lexojnë SRT, dhe të dyja mund të eksportohen këtu."
    ]
   },
   {
    "h2": "1 Load the song :: 1 Ngarko këngën",
    "ps": [
     "Kolona e parë në të majtë pranon një skedar audio: **MP3, M4A, FLAC, WAV dhe OGG** funksionojnë të gjitha. Audioja luhet lokalisht dhe nuk ngarkohet kurrë.",
     "Cilësia e audios nuk ndikon në saktësinë e kohës, por një burim me vokale të qarta është më i lehtë për t'u ndjekur; regjistrimet live dhe burimet me muzikë sfondi të lartë janë dukshëm më të vështira për t'u sinkronizuar."
    ],
    "img": {
     "file": "lrc-up",
     "alt": "Zona e ngarkimit të këngës e mjetit të sinkronizimit të teksteve",
     "cap": "MP3 / M4A / FLAC / WAV / OGG funksionojnë të gjitha, dhe audioja luhet vetëm lokalisht"
    }
   },
   {
    "h2": "2 Paste the lyrics :: 2 Ngjit tekstet",
    "ps": [
     "Ngjitni tekstet në kolonën e dytë, **një rresht për tekst**; rreshtat e zbrazët kapërcehen automatikisht. Pastaj klikoni \"Analizo tekstet\".",
     "Ngjitja e një LRC ekzistuese funksionon gjithashtu — etiketat e saj të kohës `[mm:ss.xx]` njihen, dhe pas importimit vazhdoni nga rreshti i parë pa kohë, kështu që rreshtat që janë tashmë të sinkronizuar nuk duhet të ribëhen."
    ],
    "img": {
     "file": "lrc-paste",
     "alt": "Zona e ngjitjes së teksteve dhe butoni i analizimit të teksteve",
     "cap": "Ngjitni një rresht për tekst, ose ngjitni një LRC të plotë dhe lëreni mjetin të lexojë kohët ekzistuese"
    }
   },
   {
    "h2": "3 Trokitni ndërkohë që dëgjoni",
    "ps": [
     "Luani këngën dhe shtypni Enter në momentin kur fillon një rresht (ose klikoni \"Vulos këtë rresht\"); koha për atë rresht regjistrohet dhe kursori kalon te i radhës.",
     "Shkurtoret: **hapsira** luan dhe ndalon, **Enter** vulos rreshtin aktual, **Z** zhbën një rresht. Shtypja e Enter gjatë riprodhimit është mënyra më e qetë për të punuar — pa kaluar shpesh midis miut dhe tastierës.",
     "Keni vulosur rreshtin e gabuar? Shtypni Z për ta zhbërë dhe vulosni përsëri. Nëse nuk doni ta vulosni fare një rresht (një ndërprerje instrumentale, një kalim thjesht muzikor), klikoni \"Kapërce këtë rresht\" dhe ai nuk do të shfaqet në eksport."
    ],
    "img": {
     "file": "lrc-tap",
     "alt": "Kontrollet e luajtjes, vulos-këtë-rresht, zhbëj-një-rresht dhe kapërce-këtë-rresht në zonën e trokitjes",
     "cap": "Hapësira luan dhe ndalon, Enter vulos rreshtin aktual, Z zhbën — duart qëndrojnë në tastierë"
    }
   },
   {
    "h2": "4 Export :: 4 Eksporto",
    "ps": [
     "Kolona e katërt bën eksportin: **Shkarko LRC** për luajtësit, **Shkarko SRT** për pjesët e titrave të videos, ose \"Kopjo\" për ta marrë tekstin drejtpërdrejt.",
     "Eksportohen vetëm rreshtat me kohë; rreshtat e kapërcyer nuk hyjnë kurrë në skedar. Në eksportin SRT, secili rresht zgjat derisa të fillojë i radhës, dhe rreshti i fundit kthehet te 2 sekonda."
    ],
    "img": {
     "file": "lrc-out",
     "alt": "Butonat e shkarkimit-LRC, shkarkimit-SRT dhe kopjimit në zonën e eksportit",
     "cap": "LRC për luajtësit, SRT për videon; eksportohen vetëm rreshtat me kohë"
    }
   },
   {
    "h2": "Çfarë lihet e paprekur",
    "ps": [
     "Teksti i këngës nuk rishkruhet. Kohëzgjatja shton vetëm një pikë kohe për rresht dhe nuk i prek kurrë fjalët që keni ngjitur.",
     "Kur importoni një LRC ekzistuese, rreshtat që mbajnë tashmë një etiketë kohe mbajnë kohën e tyre origjinale dhe ju vulosni vetëm nga rreshti i parë i pasinkronizuar e tutje."
    ]
   },
   {
    "h2": "Common questions :: Pyetje të shpeshta",
    "ps": [
     "**Pse mungojnë disa rreshta nga eksporti?** Rreshtat e kapërcyer dhe rreshtat pa kohë nuk hyjnë kurrë në skedar. Kthehuni te hapi i tretë dhe shtojini, ose konfirmoni se ishte dashur të kapërceheshin.",
     "**A mund të ndryshohen kohët më vonë?** Nëse doni ta zhvendosni pak gjithçka pas vulosjes, eksportoni SRT dhe përdorni [[Timeline adjustment|/shift.html]] për ta zhvendosur ose shkallëzuar atë si e tërë.",
     "**LRC apo SRT — cilën duhet të eksportoj?** LRC për luajtësit e muzikës (foobar2000, klientët e transmetimit, lloj-lloj luajtësish); SRT kur tekstet duhet të vendosen në video ose të përpunohen më tej me mjete titrash.",
     "**Sa kohë i duhet një kënge?** Varet nga sa rreshta ka dhe sa të saktë doni të jeni. Për një këngë me tridhjetë ose dyzet rreshta, pak minuta për kalim pasi të dini rrjedhën; ndjekja e saktësisë në nivel fjalie kërkon më shumë kohë."
    ]
   },
   {
    "h2": "Privacy :: Privatësia",
    "ps": [
     "Audioja dhe tekstet përpunohen tërësisht në shfletues: asgjë nuk ngarkohet dhe asgjë nuk kalon përmes një serveri. Audioja dekodohet dhe luhet vetëm lokalisht."
    ]
   },
   {
    "h2": "Mjete dhe udhëzues të ngjashëm",
    "ps": [
     "Nëse keni tashmë një LRC dhe doni titra, shihni [[LRC to SRT|/guides/lrc-to-srt.html]]; për mendimin dhe grackat pas sinkronizimit shihni [[How to sync LRC lyrics|/guides/how-to-make-lrc-file.html]]; nëse SRT-ja e eksportuar nuk është e saktë, përdorni [[Timeline adjustment|/shift.html]]; dhe kaloni rezultatin përmes [[Subtitle QC|/qc.html]]."
    ]
   }
  ]
 },
 "lrc-to-srt": {
  "seo": {
   "title": "Konvertuesi LRC në SRT – Ktheni tekstet në titra – AI-SRTSub",
   "desc": "Konvertoni tekstet LRC në titra SRT: secili rresht zgjat derisa të fillojë i radhës, shenja e fundit merr 3 sekonda. Këngët mbi 60 minuta lexohen saktë. Ekzekutohet në shfletuesin tuaj.",
   "h1": "LRC to SRT :: LRC në SRT",
   "intro": "Ktheni skedarët e teksteve LRC në SRT: hidhni skedarin, zgjidhni SRT, shkarkoni. Kohët e mbarimit plotësohen automatikisht nga rreshti tjetër.",
   "ctaText": "Convert LRC → SRT :: Konverto LRC → SRT"
  },
  "body": [
   {
    "h2": "Si ndryshon LRC nga SRT",
    "ps": [
     "LRC është një format tekstesh: çdo rresht mban vetëm një kohë \"fillimi të këngës\" në `[minutes:seconds.cents]` dhe **asnjë kohë mbarimi**; çdo shenjë SRT ka nevojë si për një fillim ashtu edhe për një mbarim. Pra, thelbi i konvertimit është plotësimi i kohëve të mbarimit."
    ],
    "img": {
     "file": "convert-upload-lrc",
     "alt": "Zona e ngarkimit: një skedar LRC i ngarkuar, u zbulua si LRC",
     "cap": "Një skedar teksti me kohëshënues [00:12.50] zbulohet si LRC menjëherë"
    }
   },
   {
    "h2": "Si plotësohen kohët e mbarimit",
    "ps": [
     "Rregulli është i thjeshtë: **secili rresht zgjat derisa të fillojë i radhës**; rreshti i fundit nuk ka \"tjetër\", kështu që merr 3 sekonda. Gjithashtu, kohëshënuesit e LRC mbajnë vetëm minuta dhe sekonda — pa orë — dhe fusha e minutave nuk mbartet (62:05 do të thotë 1 orë 2 min 5 s), kështu që skedarët tepër të gjatë si mikset e DJ-ve lexohen saktë."
    ]
   },
   {
    "h2": "How to convert :: Si të konvertoni",
    "ps": [
     "Hapni [[converter|/convert.html]], hidhni LRC-në, zgjidhni **SRT - SubRip** si dalje, pastaj konvertoni dhe shkarkoni. I dobishëm për videot muzikore dhe për montimin e teksteve si titra në luajtës; SRT-ja e eksportuar mund të konvertohet përsëri në VTT për web."
    ]
   }
  ]
 },
 "make-bilingual-subtitles": {
  "seo": {
   "title": "Dy Mnyra për të Krijuar Titra Dygjuhëshe – AI-SRTSub",
   "desc": "Titrat dygjuhëshe vijnë në dy forma: dy rreshta në një shenjë, ose dy shenja në të njëjtën vijë kohore. Të mirat, të këqijat dhe si të kaloni mes tyre. – AI-SRTSub",
   "h1": "Dy Mnyra për të Krijuar Titra Dygjuhëshe",
   "intro": "I njëjti titull dygjuhësh mund të fshehë dy paraqitje krejtësisht të ndryshme. Mësoni t'i dalloni ato, dhe krijimi, ndarja e konvertimi nuk do t'ju ngatërrojnë më.",
   "ctaText": "Punoni me titra dygjuhëshe"
  },
  "body": [
   {
    "h2": "Si Duken Dy Format",
    "ps": [
     "**Forma B: dy shenja në të njëjtën vijë kohore.** Një rresht dialogu bëhet dy shenja të ndara titrash me kohëzgjatje identike — një anglisht, një kinezisht — të vendosura sipër njëra-tjetrës. Kjo është mënyra më e zakonshme se si ndërtohen titrat dygjuhëshe ASS."
    ]
   },
   {
    "h2": "Ku Çdo Njëri Çedon",
    "ps": [
     "Pika e dobët e Formës A është **zbulimi**: ndarja e pjesëve mbështetet te sistemi i shkrimit, kështu që çiftet kinezisht-anglisht ose japonisht-anglisht ndahen me një shikim, ndërsa **kombinimet që ndajnë një shkrim të vetëm** — anglisht plus frëngjisht, ose kinezisht plus kanji japonez — nuk mund të dallohen. Pika e dobët e Formës B është **prodhimi**: dy vijat kohore duhet të përputhen saktësisht dhe rreshtimi i tyre me dorë është i lodhshëm; disa luajtës gjithashtu shfaqin të dyja shenjat e së njëjtës vijë kohore, duke mbushur ekranin. Rregull i përgjithshëm: përdorni Formën A për titrat e përfunduara të destinuara për shikuesit; përdorni Formën B kur ju duhet të ndani pjesët për punë të mëtejshme."
    ]
   },
   {
    "h2": "The Two Routes :: Dy Rrugët",
    "ps": [
     "**Ndërtoni titra dygjuhëshe nga origjinali**: përdorni [[AI Subtitle Translation|/translate.html]] dhe zgjidhni “Dygjuhëshe · origjinali sipër” ose “Dygjuhëshe · përkthimi sipër” gjatë eksportit — ju merrni Formën A direkt; zgjedhja e ASS ofron gjithashtu dy paraqitje, “të vendosura sipër dhe poshtë” dhe “dy rreshta në fund”.",
     "**Bashko dy pjesë ose konverto midis formave**: përdorni [[Bilingual Subtitle Stripper|/bilingual.html]] dhe modalitetin e tij “bashko në një hyrje me dy rreshta” — Forma B brenda, Forma A jashtë; duke shkuar në drejtimin tjetër, “nda në dy skedarë” merr Formën A ose B brenda dhe jep dy pjesë të pavarura jashtë."
    ],
    "img": {
     "file": "bilingual-modes",
     "alt": "Katër modalitetet e zhveshësit dygjuhësh; “bashko në një hyrje me dy rreshta” bashkon dy shenja që ndajnë një vijë kohore",
     "cap": "“Bashko në një hyrje me dy rreshta”: Forma B bëhet Forma A"
    }
   },
   {
    "h2": "Cila Pajisje do ta Luajë Atë",
    "ps": [
     "Luajtësit e web-it (HTML5 `<track>`) dhe shumica e luajtësve celularë e trajtojnë Formën A më me besueshmëri; luajtësit e desktopit (VLC, mpv, PotPlayer) i pranojnë të dyja dhe madje mund t'u japin dy shenjave të së njëjtës vijë kohore ngjyra dhe pozicione të ndryshme. Kur keni dyshime, eksportoni Formën A si SRT — është më e sigurta. Për ndryshimet midis vetë formateve, shihni [[SRT, VTT or ASS: Which Should You Use|/guides/subtitle-format-comparison.html]]."
    ],
    "img": {
     "file": "translate-export",
     "alt": "Opsionet e stilit dygjuhësh në panelin e eksportit të mjetit të përkthimit",
     "cap": "Zgjidhni rendin e rreshtave dygjuhësh direkt në eksport — një hap dhe është kryer"
    }
   },
   {
    "h2": "FAQ :: Pyetje të Shpeshta",
    "ps": [
     "**Titrat dygjuhëshe duken të ngushta — çfarë mund të bëj?** Kontrolloni gjerësinë e rreshtit: paneli i eksportit të mjetit të përkthimit ka një cilësim “gjerësia e rreshtit dygjuhësh”; një rresht më i ngushtë do të thotë më pak karaktere për shenjë dhe një ekran më i pastër.",
     "**Dua vetëm një pjesë.** Opsioni i zhveshësit “mbaj vetëm origjinalin / mbaj vetëm përkthimin” e trajton atë me një klikim, shihni [[Split Bilingual Subtitles into Two Tracks|/guides/split-bilingual-subtitles.html]]."
    ]
   }
  ]
 },
 "merge": {
  "seo": {
   "title": "Bashkimi i titrave dygjuhëshe dhe me stile – Bashko, stilo, eksporto – AI-SRTSub",
   "desc": "Bashkoni dy skedarë titrash në një pjesë dygjuhëshe, ristilojeni një skedar dygjuhësh ekzistues, ose stiloni një me një gjuhë të vetme: modalitetet e çiftimit, shabllonet ASS dhe VTT, dhe cilin format ta eksportoni.",
   "h1": "Si të përdorni bashkimin dygjuhësh dhe titrat me efekte speciale",
   "intro": "Kombinoni dy skedarë titrash në një pjesë të vetme dygjuhëshe, ose stiloni titrat direkt: fonti, ngjyra, konturi dhe pozicioni janë pikërisht ato që shihni, dhe pamja paraprake përputhet me eksportin.",
   "ctaText": "Hapni mjetin e titrave me efekte speciale"
  },
  "body": [
   {
    "h2": "What this tool does :: Çfarë bën ky mjet",
    "ps": [
     "Kjo faqe në fakt mbulon tri punë: bashkimin e një skedari titrash origjinal dhe të përkthyer në një skedar të vetëm dygjuhësh, rregullimin e rendit dhe stilit të një skedari që është tashmë dygjuhësh, dhe shtimin e efekteve speciale në një skedar me një gjuhë të vetme. Të tria ndajnë të njëjtët parametra stili dhe të njëjtën pamje paraprake."
    ]
   },
   {
    "h2": "Three jobs, one page :: Tri punë, një faqe",
    "ps": [
     "Pjesa e sipërme e faqes ka tri skeda: **Bashko dy skedarë**, **Rregullo një skedar dygjuhësh**, **Skedar me një gjuhë të vetme**. Zgjedhja juaj përcakton se sa kolona hyrëse shfaqen në të majtë.",
     "Kur bashkoni dy skedarë, ana e majtë mban dy kolona, \"1 Titrat origjinale\" dhe \"2 Titrat e përkthyera\"; secila pranon një skedar të ngarkuar ose tekst të ngjitur drejtpërdrejt. Rregullimi i një skedari dygjuhësh dhe stilimi i një skedari me një gjuhë të vetme kërkojnë secili vetëm një kolonë."
    ],
    "img": {
     "file": "merge-mode",
     "alt": "Tri skedat në krye të mjetit të titrave me efekte speciale dhe zona e hyrjes në të majtë",
     "cap": "Tri skeda në krye; zgjedhja e \"Bashko dy skedarë\" sjell një kolonë origjinale dhe të përkthyer në të majtë"
    }
   },
   {
    "h2": "Se si çiftohen dy skedarë",
    "ps": [
     "Elementi i parë nën \"3 Cilësimet e bashkimit\" është modaliteti i çiftimit: **Çifto sipas rendit · përdor vijën kohore origjinale**, **Çifto sipas vijës kohore · përdor vijën kohore origjinale**, **Çifto sipas rendit · përdor vijën kohore të përkthyer**.",
     "Kur të dy skedarët kanë të njëjtin numër hyrjesh në të njëjtin rend, çiftimi sipas rendit është më i sigurt. Kur numrat ndryshojnë (njëra anë ka bashkuar hyrje, tjetra i ka ndarë), çiftoni sipas vijës kohore dhe lëreni mjetin të përputhet sipas afërsisë. Cilën vijë kohore për të përdorur varet se cili skedar është më i saktë — zakonisht origjinali.",
     "Më poshtë janë struktura e tekstit (zbulim automatik / dy rreshta për hyrje / çifte alternative) dhe rendi (origjinali sipër / përkthimi sipër)."
    ],
    "img": {
     "file": "merge-pair",
     "alt": "Modaliteti i çiftimit, struktura e tekstit dhe opsionet e rendit nën cilësimet e bashkimit",
     "cap": "Modaliteti i çiftimit vendos se cili rresht shkon me cilin, dhe vija kohore e kujt për t'u përdorur vendoset këtu gjithashtu"
    }
   },
   {
    "h2": "Rregulloni stilin element pas elementi",
    "ps": [
     "Paneli i stilit ndodhet në të djathtë. Kur eksportoni ASS, zbatohet blloku \"Pamja e ASS\": paraqitja (e ndarë · e ndarë sipër dhe poshtë / e vendosur · dy rreshta në fund), madhësia, ngjyra, errësira, fonti, e trashë, e pjerrët, hapësira e shkronjave, konturi, ngjyra e konturit, hija/sfondi (asnjë / hije / sfond), thellësia, ngjyra e kufirit, errësira e kufirit, rreshtimi horizontal (fund · majtas / fund · qendër / fund · djathtas) dhe distanca nga fundi i rreshtit të përkthimit (parësor), plus fonti, hija/sfondi dhe margjinat majtas/djathtas të rreshtit origjinal (dytësor).",
     "Kur eksportoni stilimin dygjuhësh VTT, zbatohet blloku \"Stili WebVTT\": mbi gjashtë paracaktimet (standard / kompakt / kinematografik / sipër / i aksesueshëm / portret) mund të ndryshoni vijën vertikale, spirancën (fund / sipër / qendër), pozicionin horizontal, madhësinë e gjerësisë, vlerën e rreshtimit dhe lartësinë e rreshtit të gjithë shenjës, plus ngjyrën e sfondit, errësirën e sfondit dhe gjerësinë e konturit të rreshtit të përkthimit; rreshti origjinal mund të trashëgojë stilin kryesor ose të vendoset veçmas.",
     "Kur të keni mbaruar, mund ta ruani rezultatin si një paracaktim dhe ta ripërdorni më vonë duke e zgjedhur atë te \"Nga paracaktimet e ruajtura\" dhe duke klikuar \"Apliko\"."
    ],
    "img": {
     "file": "merge-style",
     "alt": "Parametrat e panelit të pamjes ASS në të djathtë",
     "cap": "Madhësia, ngjyra, konturi, hija/sfondi dhe rreshtimi janë të gjitha të rregullueshme, dhe rezultati mund të ruhet si një paracaktim"
    }
   },
   {
    "h2": "Kontrolloni pamjen paraprake para se të eksportoni",
    "ps": [
     "\"Pamja paraprake e bashkimit\" është një tabelë: #, koha, origjinali, përkthimi, stili. Shiriti sipër filtruan rreshtat e dyshimtë sipas \"ka efekte zëri\", \"ka një parashtesë folësi\", \"më i shkurtër se 1 sekonda\", \"më shumë se dy rreshta\" dhe \"shpejtësia e leximit u tejkalua\", ose sipas një fjale kyçe që ju shkruani.",
     "Klikimi te foleja e stilit të një rreshti zgjeron redaktuesin e asaj foleje dhe liston vetëm rreshtat që e përdorin atë; \"Pastro të gjitha mbishkrimet\" kthen çdo mbishkrim manual te shablloni. Zona e rregullimit të vijës kohore më poshtë trajton një zhvendosje globale (nga një shenjë e dhënë) dhe shkallëzim proporcional.",
     "Sapo të duket e saktë, shkoni te \"4 Eksporto\": shkarkoni skedarin e titrave ose kopjoni përmbajtjen e tij."
    ],
    "img": {
     "file": "merge-preview",
     "alt": "Tabela e pamjes paraprake të bashkimit dhe shiriti i filtrave të saj",
     "cap": "Pamja paraprake është eksporti; filtruan rreshtat e dyshimtë sipas llojit ose zgjeroni një fole të vetme stili"
    }
   },
   {
    "h2": "Çfarë lihet e paprekur",
    "ps": [
     "Stilimi ndryshon vetëm pamjen, kurrë dialogun. Teksti i origjinalit dhe i përkthimit nuk ndryshohet nga asnjë karakter i vetëm gjatë bashkimit; nëse nuk e ndryshoni qëllimisht në zonën e rregullimit poshtë pamjes paraprake, vija kohore vjen nga skedari që keni zgjedhur.",
     "Kur eksportoni SRT ose \"VTT pa stilim\", asnjë informacion stili nuk shkruhet në skedar — faqja ju tregon se VTT nuk ka asnjë bllok STYLE dhe luajtësi do të përdorë pamjen e tij të paracaktuar. Nëse doni stilim, zgjidhni stilimin dygjuhësh VTT ose ASS."
    ]
   },
   {
    "h2": "Common questions :: Pyetje të shpeshta",
    "ps": [
     "**Po sikur dy skedarët të kenë numra të ndryshëm hyrjesh?** Përdorni \"Çifto sipas vijës kohore\" dhe mjeti përputhet sipas afërsisë; hyrjet që nuk mund t'i përputhë nuk shpinden.",
     "**Po sikur një luajtës të shpërfillë stilimin në një ASS të eksportuar?** Stilet ruhen brenda skedarit, por mbështetja e luajtësit për ASS ndryshon. Nëse ju duhet një pamje më e lëvizshme, eksportoni stilimin dygjuhësh VTT.",
     "**Si të kthehem te shablloni fillestar pasi ta kem prishur?** \"Rikthe parametrat e paracaktuar\" në bllokun ASS dhe \"Rikthe parazgjedhjet e shabllonit\" në bllokun VTT rivendosin secili seksionin e tyre.",
     "**Çfarë janë shtatë rreshtat në mostër?** Ato janë një shembull i integruar, vetëm atje që të mund të shihni se si duket një bashkim; mostra nuk mund të eksportohet. Ngarkoni titrat tuaja dhe klikoni pamjen paraprake të bashkimit dhe ato zëvendësohen automatikisht."
    ]
   },
   {
    "h2": "Privacy :: Privatësia",
    "ps": [
     "Titrat përpunohen tërësisht në shfletues: asgjë nuk ngarkohet dhe asgjë nuk kalon përmes një serveri. Mbyllni shfletuesin dhe gjithçka nga ai sesion është zhdukur."
    ]
   },
   {
    "h2": "Mjete dhe udhëzues të ngjashëm",
    "ps": [
     "Për të ndarë një skedar dygjuhësh përsëri në dy pjesë përdorni [[Bilingual split|/bilingual.html]]; për të shkuar në drejtimin tjetër dhe për ta kthyer një gjuhë të vetme në një skedar dygjuhësh shihni [[Two ways to make bilingual subtitles|/guides/make-bilingual-subtitles.html]]; kaloni rezultatin përmes [[Subtitle QC|/qc.html]]; për një sezon të tërë menjëherë përdorni [[Batch conversion|/batch.html]]."
    ]
   }
  ]
 },
 "qc": {
  "seo": {
   "title": "Si të Përdorni QC të Titrave – Kontrolli i Vijës Kohore & Paraqitjes – AI-SRTSub",
   "desc": "QC i titrave: rregullat 17 kapin mbivendosjet, gjerësinë e rreshtit, shpejtësinë e leximit dhe pikësimin, pragjet për 27 gjuhë. Gjysma janë rregullime me një klikim; shkarkoni raportin.",
   "h1": "Si të Përdorni QC të Titrave",
   "intro": "Para se t'i dorëzoni titrat, kalojini përmes faqes QC për kohëzgjatjen dhe paraqitjen: çfarë kontrollohet, si të lexohet raporti, dhe cilat probleme mund të rregullohen me një klikim — të gjitha të mbuluara këtu.",
   "ctaText": "Open Subtitle QC :: Hapni QC të Titrave"
  },
  "body": [
   {
    "h2": "Për Çfarë Shërben Ky Mjet",
    "ps": [
     "Titrat që duken mirë me sy të lirë shpesh dalin se kanë vija kohore të mbivendosura, rreshta tepër të gjerë, ose shpejtësi leximi shumë të lartë pasi të dorëzohen. Faqja QC i liston këto probleme një nga një:"
    ]
   },
   {
    "h2": "Zgjidhni Fillimisht Rregullat e Gjuhës",
    "ps": [
     "Nën “Kontrollo sipas rregullave të cilës gjuhë” ju vendosni pesë pragje: **gjerësia maksimale e një rreshti të vetëm** (42 njësi gjysmë-gjerësie për pamjen horizontale si parazgjedhje, 36 për katrore, 28 për portret), **kufiri i shpejtësisë së leximit** (18 njësi gjerësie për sekondë për kinezisht, japonisht dhe koreanisht, 20 për gjuhët e tjera), **kohëzgjatja minimale prej 833 milisekondash**, **kohëzgjatja maksimale prej 7000 milisekondash**, dhe **së shumti 2 rreshta**. Vendosni gjuhën e titrave në zbulim automatik ose zgjidhni njërën nga 27 manualisht; orientimi i ekranit ndryshon vetëm shkallën e gjerësisë së rreshtit — shpejtësia e leximit, kohëzgjatjet dhe numri i rreshtave mbeten siç janë. Njësitë gjysmë-gjerësie janë masa e pëabaytë: një hanzi llogaritet si 2, një shkronjë latine si 1 — një gjerësi rreshti prej 42 barazohet me 21 hanzi ose 42 shkronja."
    ],
    "img": {
     "file": "qc-rules",
     "alt": "Cilësimet QC: pesë kuti hyrjeje pragjesh plus menusë rënëse të gjuhës së titrave dhe orientimit të ekranit",
     "cap": "Pesë pragje + gjuhë + orientim; parazgjedhjet përputhen me praktikën e zakonshme të industrisë"
    }
   },
   {
    "h2": "Reading the Report :: Leximi i Raportit",
    "ps": [
     "Rregullat 17 raportojnë gjetjet në tri nivele: **gabime** (tekst i prishur, formati i kohëshënuesit, mbarimi më herët se fillimi, numërim i prishur), **paralajmërime** (hyrje të zbrazëta, mbivendosje, kohëzgjatje shumë të shkurtra ose shumë të gjata, shpejtësi leximi mbi kufirin, rreshta tepër të gjerë, më shumë se dy rreshta), dhe **këshilla** (pozicioni i ndarjes së rreshtit, hapësirat para ose pas, hapësira të humbura, normat e pikësimit, dhe më shumë). Çdo gjetje mban numrin e hyrjes dhe një detaj “e matur X, pragu Y”, dhe lista mund të filtrohet sipas nivelit. Hyrjet dygjuhëshe marrin përjashtime: të dyja format zbulohen automatikisht, kontrollet e mbivendosjes përjashtojnë të gjithë çiftin, dhe shpejtësia e leximit llogarit vetëm rreshtin e shkruar në gjuhën e synuar."
    ],
    "img": {
     "file": "qc-report",
     "alt": "Zona e raportit QC: gjetjet e grupuara sipas gabimit, paralajmërimit dhe këshillës, secila me numrin e hyrjes dhe vlerën e matur",
     "cap": "Një raport me tri nivele: çdo gjetje mban numrin e saj të hyrjes dhe vlerat e matura/prag"
    }
   },
   {
    "h2": "Fixing and Exporting :: Rregullimi dhe Eksportimi",
    "ps": [
     "Karta “Rregullo & eksporto” liston vetëm elementë **të rregullueshëm automatikisht**: rimbeshtjellja, heqja e hyrjeve të zbrazëta, shtimi i hapësirave të humbura, zëvendësimi i pikësimit sipas normave të gjuhës, rinumërimi — gjithçka që e lë kohën të paprekur është zgjedhur si parazgjedhje; **elementët që ndryshojnë kohën** (ndryshimi i fillimit dhe mbarimit, zhvendosja e mbivendosjeve, shkurtimi ose zgjatja e kohëzgjatjeve) janë të pazgjedhur si parazgjedhje — zgjidhni pasi të kontrolloni vetë ndikimin. Klikoni “Apliko rregullimet” dhe një kontroll i freskët ekzekutohet automatikisht; llogaritësi numëron vetëm atë që u rregullua vërtet — rreshtat që nuk mund të rimbështilleshin nuk fryhen në numra. **Shpejtësia e leximit mbi kufirin nuk ka rregullim automatik**: makina nuk mund ta di se cilën fjalë të presë, kështu që përkthimi duhet të shkurtohet me dorë ose koha të rregullohet. Pas rregullimit, eksportoni SRT ose VTT, ose klikoni “Shkarko raportin” për të ruajtur një raport tekst të thjeshtë `.qc.txt`."
    ],
    "img": {
     "file": "qc-fix",
     "alt": "Karta e rregullimit: kutitë e zgjedhjes për elementët e rregullueshëm automatikisht dhe butoni Apliko rregullimet",
     "cap": "Vetëm elementët e rregullueshëm automatikisht hyjnë në listë; rregullimet që ndryshojnë kohën janë të pazgjedhura si parazgjedhje"
    }
   },
   {
    "h2": "FAQ :: Pyetje të Shpeshta",
    "ps": [
     "**Pse nuk mund të eksportohet ASS-ja ime?** QC eksporton vetëm SRT dhe VTT; ASS hyn por nuk del jashtë. Për të ruajtur efektet ASS, mendojeni mirë te [[FormatConverter|/convert.html]] paraprakisht.",
     "**Çfarë do të thotë një shpejtësi leximi prej 18?** Për kinezisht, japonisht dhe koreanisht kufiri është 9 karaktere me gjerësi të plotë për sekondë (18 njësi gjysmë-gjerësie); gjuhët e tjera marrin 20 njësi gjysmë-gjerësie për sekondë. Këto janë nivelet e zakonshme të rehatisë, dhe kutia e hyrjes ju lejon t'i ndryshoni ato.",
     "**Kodimi i skedarit tim është prishur — a mund të kontrollohet ende?** QC lexon vetëm UTF-8; rregulloni kodimin në faqen e riparimit të tekstit të prishur paraprakisht.",
     "**A do të prekë vijën time kohore?** Për sa kohë që e lini grupin “ndryshon kohën” të pazgjedhur; edhe kur është zgjedhur, çdo ndryshim tregohet qartë para se të aplikohet rregullimi."
    ]
   },
   {
    "h2": "Related Guides :: Udhëzues të Ngjashëm",
    "ps": [
     "Titrat që kalojnë shumë shpejt për t'u lexuar — shihni udhëzuesin e dedikuar [[Subtitles Too Fast to Read|/guides/subtitle-too-fast.html]]. Çfarë duhet të kontrolloni para dorëzimit — lista e kontrollit është te [[What to Check Before Delivery|/guides/subtitle-quality-check.html]]. Një vijë kohore që del jashtë sinkronizimit është një lloj tjetër problemi — shihni [[Subtitles Drifting Out of Sync|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "remove-subtitle-ads": {
  "seo": {
   "title": "Hiqni Reklamat & Shenjat e Ujit nga Titrat – AI-SRTSub",
   "desc": "Hiqni shenjat e ujit dhe reklamat nga titrat: URL-të, kreditet e fansub-ve dhe etiketat e kodimit pastrohen me një klikim, plus hyrjet e dyfishta dhe të zbrazëta. – AI-SRTSub",
   "h1": "Hiqni Reklamat dhe Shenjat e Ujit nga Titrat",
   "intro": "URL-të, kreditet dhe hyrjet promovuese të fshehura në titrat tuaja pastrohen në një kalim nga rregullat e shenjave të ujit të pastruesit — dhe çdo fshirje gabimi mund të zhbëhet hyrje pas hyrjeje.",
   "ctaText": "Pastro shenjat e ujit të titrave"
  },
  "body": [
   {
    "h2": "Çfarë janë këto shenja uji",
    "ps": [
     "Titrat e shkarkuara në internet shpesh marrin hyrje shtesë në fillim ose në fund (ndonjëherë edhe në mes): URL, adresa email-i, emra grupesh fansub-i, kredite `encoded by` / `translated by`, emra faqesh si opensubtitles, dhe rreshta si “na ndiqni në llogarinë tonë WeChat” ose “vetëm për qëllime studimi”. Ato janë hyrje normale titrash — me një vijë kohore, që zënë një rresht — kështu që luajtësit nuk mund t'i heqin; ato duhet të zbulohen nga përmbajtja."
    ]
   },
   {
    "h2": "Where to do it :: Ku ta bëni atë",
    "ps": [
     "Hapni [[Subtitle Cleaner|/clean.html]] dhe hidhni titrin tuaj; grupi “Shenjat e ujit & hyrjet e panevojshme” tashmë ka të zgjedhura “Hiq shenjat e ujit dhe reklamat”, “Hiq hyrjet e dyfishta” dhe “Hiq hyrjet e zbrazëta” si parazgjedhje, dhe pastrimi fillon automatikisht. Zbulimi funksionon në dy nivele: **sinjale të forta** si URL, email-e, grupe fansub-i dhe emra faqesh fshijnë të gjithë hyrjen në një goditje në çdo gjatësi; **sinjale të buta** si @handle, kredite “të koduara” ose “të korrigjuara” vlerësohen vetëm në hyrje të shkurtra prej jo më shumë se 40 karaktere, për të shmangur prerjen e dialogëve të gjatë. Hyrjet dygjuhëshe fillimisht u hiqen rreshtat e shenjave të ujit rresht pas rreshti ndërkohë që rreshtat e dialogut mbahen; hyrja fshihet e plotë vetëm nëse mbeten gjurmë të shenjave të ujit pas heqjes."
    ],
    "img": {
     "file": "clean-opts",
     "alt": "Ekrani i opsioneve të pastrimit: tri kutitë e zgjedhjes të grupit të shenjave të ujit dhe hyrjeve të panevojshme",
     "cap": "Grupi “Shenjat e ujit & hyrjet e panevojshme” është i aktivizuar si parazgjedhje — nuk nevojitet konfigurim manual"
    }
   },
   {
    "h2": "Review and export :: Rishiko dhe eksporto",
    "ps": [
     "Në listën e ndryshimeve, çdo hyrje e fshirë mban një etiketë “shenjë uji & reklamë” — hidhni një sy për të konfirmuar se asgjë nuk u hoq gabimisht; nëse diçka duket gabim, klikoni “Rikthe” për ta vendosur përsëri. Pasi të konfirmohet, shkarkoni: emri i skedarit merr një shënues `.clean` automatikisht. Pastrimi ekzekutohet lokalisht në shfletuesin tuaj; titrat tuaja nuk dërgohen kurrë diku."
    ]
   }
  ]
 },
 "repair": {
  "seo": {
   "title": "Si të Riparoni Titrat Mojibake – Zbuloni Kodimin – AI-SRTSub",
   "desc": "Udhëzues: zbuloni kodimin origjinal (GBK / Big5 / Shift_JIS / EUC-KR), renditni riparimet sipas asaj që lexohet më shumë si gjuhë, pastaj ruani UTF-8 me BOM ose GBK. Kohëzgjatjet dhe numrat e indeksit nuk ndryshojnë kurrë.",
   "h1": "Si të riparoni titrat mojibake",
   "intro": "Një skedar titrash plot me karaktere të prishura rrallë është i dëmtuar — ai thjesht u lexua me kodimin e gabuar. Mjeti i riparimit zbulon kodimin origjinal dhe rikthen karakteret e duhura, duke lënë të paprekur numrat e indeksit dhe kohëzgjatjet.",
   "ctaText": "Hapni mjetin e riparimit të mojibake"
  },
  "body": [
   {
    "h2": "What this tool does :: Çfarë bën ky mjet",
    "ps": [
     "Të aji bajta të lexuar si UTF-8 dhe të lexuar si GBK prodhojnë dy grupe krejtësisht të ndryshme karakteresh — skedari nuk është i dëmtuar, ai u dekodua me kodimin e gabuar. Këtu është se çfarë bën mjeti i riparimit:"
    ]
   },
   {
    "h2": "Ngarkoni skedarin, mos e ngjitni atë",
    "ps": [
     "Dy pikat e hyrjes mund të riparojnë sasi të ndryshme dëmtimi, prandaj **ngarkoni skedarin nëse mundeni**. Me një skedar, bajtat origjinale janë ende atje: mjeti provon një kodim pas tjetrit, dhe pasi njeh GBK, ai dekodon si GBK — asgjë nuk duhet të merret me mend. Teksti që mbërrin me ngjitje nuk janë më bajta të papërpunuara. Deri në kohën kur shfletuesi dorëzon vargun, gabimi ka ndodhur tashmë, kështu që mjeti mund të punojë vetëm mbrapsht dhe të marrë atë që mund të marrë.",
     "Nëse teksti i ngjitur përmban tashmë karakterin zëvendësues (atë pyetje të futur në kuti `�`), bajtat origjinale janë zhdukur prej kohësh dhe asgjë nuk mund t'i kthejë ato mbrapsht. Faqja e thotë hapur: kthehuni lart dhe përdorni \"Zgjidh skedarin\" për të ngarkuar origjinalin."
    ],
    "img": {
     "file": "repair-up",
     "alt": "Zona e ngarkimit të faqes së riparimit: zona e lëshimit dhe kutia e ngjitjes, me kodimin e zbuluar të shfaqur më sipër",
     "cap": "Zvarritni skedarin brenda ose kërkoni për të; kutia e ngjitjes qëndron poshtë dhe mund të riparojë shumë më pak"
    }
   },
   {
    "h2": "Çfarë po ju tregon diagnoza",
    "ps": [
     "Sapo të ngarkoni, karta e diagnozës jep një vendim. **Nuk u gjet asnjë mojibake**: përmbajtja lexohet mirë siç është; nëse luajtësi juaj tregon ende karaktere të prishura, luajtësi përdori kodimin e gabuar — zbritni te \"Ruaj si\", zgjidhni një tjetër dhe dorëzoni atë skedar. Kur **duket si mojibake**, karta liston se cilën gjurmë gjeti:"
    ],
    "img": {
     "file": "repair-diag",
     "alt": "Karta e diagnozës: vendimi plus çdo gjurmë mojibake e listuar rresht pas rreshti",
     "cap": "Diagnoza liston gjurmët sipas llojit në vend që thjesht të thotë \"është mojibake\""
    }
   },
   {
    "h2": "Si renditen kandidatët dhe si të zgjidhni",
    "ps": [
     "Nën \"Mënyrat për ta rregulluar këtë\", kandidatët janë të listuar në rendin **fillimisht-më-i-ngjashëm-me-gjuhën-e-vërtetë**, deri në 12 prej tyre, secili i etiketuar me çiftin e kodimeve nga dhe në të cilat u lexua. Klikoni një për të parë se si duket, zgjidheni, pastaj lëvizni poshtë për të ruajtur. Nuk jeni të kënaqur? Përdorni \"Mbaj siç është\" për t'u kthyer te origjinali.",
     "Rendi vjen nga një pikëzim: pjesa e karaktereve të zakonshme, vargjet e aksenteve, vargjet e simboleve, muret e karaktereve të errëta, të gjitha të peshuara. **Nëse asnjë pikëzim nuk është qartësisht më i mirë, asgjë nuk rekomandohet** — ai nuk do t'ju shtyjë një kandidat gjysmë të besueshëm vetëm për të pasur një të tillë. Teksti që u dëmtua dy herë (u ruajt gabim një herë, pastaj u riparua gabim një herë) merr edhe një raund shtesë të zgjidhjes mbrapsht për kandidatët kryesorë, kështu që çdo gjë brenda dy shtresave mund të shpëtohet ende."
    ],
    "img": {
     "file": "repair-fix",
     "alt": "Lista e kandidatëve të riparimit e renditur sipas asaj se sa lexohet si gjuhë e vërtetë, secila e etiketuar me çiftin e saj të kodimit",
     "cap": "Kandidatët e renditur sipas \"më të ngjashmit me gjuhën e vërtetë\", secili duke treguar kodimet e përfshira"
    }
   },
   {
    "h2": "Ruajtja e duhur është hapi i fundit",
    "ps": [
     "Një rezultat i riparuar duhet të ruhet përsëri siç duhet. Kur një luajtës nuk mund të zbulojë UTF-8, ruajtja si **UTF-8 me BOM** (luajtësit e Windows mbështeten te BOM) ose si **GBK** zakonisht e zgjidh atë. Mund të ruani si UTF-8, UTF-8 (me BOM), GBK, Big5, Shift_JIS ose EUC-KR; nëse diçka nuk përshtatet, ju thuhet të zgjidhni një tjetër (GBK nuk mund të mbajë koreanishten). Skedarët e shkarkuar marrin `-fixed` të shtuar në emër.",
     "Kur kodimi i zbuluar nuk është UTF-8, \"Ruaj si\" është tashmë i paracaktuar në UTF-8 me BOM për ju. Sapo të prekni vetë menunë rënëse, ajo ndalon së dyshuari ndaj jush."
    ],
    "img": {
     "file": "repair-out",
     "alt": "Zona e rezultatit: kutia e tekstit me menunë rënëse ruaj-si dhe butonin e shkarkimit",
     "cap": "Zgjidhni një kodim, pastaj shkarkoni — emrit të skedarit i shtohet -fixed"
    }
   },
   {
    "h2": "Çfarë nuk preket kurrë",
    "ps": [
     "Vetëm karakteret e lexuara gabimisht zëvendësohen. Numrat e indeksit, kohëzgjatjet dhe rreshtat e stilit ASS nuk ndryshohen në asnjë mënyrë."
    ]
   },
   {
    "h2": "FAQ :: Pyetje të Shpeshta",
    "ps": [
     "**E ngarkova skedarin, atëherë pse më duhet ta ruaj përsëri?** Vetë skedari zakonisht është në rregull; ajo që është prishur është luajtëse që e lexon atë me kodimin e gabuar. Në atë rast, asnjë karakter në tekst nuk ka nevojë për ndryshim — thjesht ruani një kopje si UTF-8 me BOM ose GBK dhe jepjani atë luajtësit.",
     "**Pse nuk mund të riparohet teksti i ngjitur?** Sapo karakteri zëvendësues shfaqet në përmbajtjen e ngjitur, bajtat origjinale janë zhdukur dhe nuk ka asgjë për të arsyetuar mbrapsht. Kthehuni lart dhe përdorni \"Zgjidh skedarin\" për të ngarkuar origjinalin.",
     "**Kandidati që dua nuk është i listuar?** Asgjë nuk rekomundohet nëse nuk merr pikë qartësisht më të mira se ajo që keni tashmë. Provoni të kaloni kodimin e zbuluar te një tjetër dhe lëreni të rirenditet.",
     "**Sa skedarë menjëherë?** Një nga një. Shkarkoni riparimin, pastaj ushqeni skedarin tjetër."
    ]
   },
   {
    "h2": "Privacy :: Privatësia",
    "ps": [
     "Zbulimi dhe riparimi ekzekutohen tërësisht në shfletuesin tuaj. Asnjë përmbajtje titrash nuk dërgohet kurrë në një server."
    ]
   },
   {
    "h2": "Mjete dhe udhëzues të ngjashëm",
    "ps": [
     "Nga vjen mojibake dhe pse përfundon duke u dukur kështu — shihni [[Where subtitle mojibake comes from|/guides/subtitle-garbled-characters.html]]; kodimi është në rregull por përmbajtja është e ndotur — përdorni [[Subtitle cleanup|/clean.html]]; për të kontrolluar kohën dhe shpejtësinë e leximit — [[Subtitle QC|/qc.html]]."
    ]
   }
  ]
 },
 "sbv-to-srt": {
  "seo": {
   "title": "Konvertuesi SBV në SRT – Konvertoni Titrat e YouTube – AI-SRTSub",
   "desc": "Konvertoni titrat SBV të shkarkuara nga YouTube në SRT për CapCut, Premiere dhe luajtës. Vlerat e kohës mbeten të paprekura — ndryshon vetëm paraqitja. Ekzekutohet në shfletuesin tuaj.",
   "h1": "SBV to SRT :: SBV në SRT",
   "intro": "Ktheni titrat SBV të YouTube në SRT: hidhni skedarin, zgjidhni SRT, shkarkoni. Vlerat e kohës janë të paprekura — ndryshon vetëm struktura.",
   "ctaText": "Convert SBV → SRT :: Konverto SBV → SRT"
  },
  "body": [
   {
    "h2": "Çfarë është SBV dhe nga vjen ai",
    "ps": [
     "SBV është **formati i titrave të YouTube**: shkarkimi i \"skedarëve të titrave\" nga YouTube shpesh ju jep një .sbv. Struktura e tij është më e thjeshtë se SRT — kohët e fillimit dhe të mbarimit qëndrojnë në **një rresht** të ndara me presje, teksti pason direkt poshtë, dhe nuk ka numra shenjash."
    ]
   },
   {
    "h2": "Pse luajtësit e refuzojnë atë",
    "ps": [
     "Jashtë vetë YouTube, shumica e softuerëve të redaktimit dhe luajtësve nuk e mbështesin SBV. Atij i mungon blloku i numërimit dhe shkruan rreshtin e tij të kohës ndryshe nga SRT, kështu që riemërtimi i prapashtesës nuk bën asgjë — struktura duhet të rindërtohet vërtet."
    ],
    "img": {
     "file": "convert-upload-sbv",
     "alt": "Zona e ngarkimit: një skedar SBV i ngarkuar, u zbulua si SBV",
     "cap": "SBV zbulohet ashtu siç është, nuk kërkohet riemërtim prapashtese"
    }
   },
   {
    "h2": "How to convert :: Si të konvertoni",
    "ps": [
     "Hapni [[converter|/convert.html]], hidhni SBV-në, zgjidhni **SRT - SubRip** si dalje, pastaj konvertoni dhe shkarkoni. Numrat e shenjave caktohen nga e para, dhe ndarjet origjinale të rreshtave brenda një shenje bashkohen në një rresht të vetëm (SRT lejon shenja me shumë rreshta; SBV eksportohet me një rresht të vetëm këtu)."
    ]
   }
  ]
 },
 "shift": {
  "seo": {
   "title": "Si të Zhvendosni Kohën e Titrave (Zhvendosje, Shkallë, Dy Spiranca) – AI-SRTSub",
   "desc": "Një udhëzues i ilustruar i redaktuesit të kohës: ngarkoni titrat, shtoni hapa rregullimi, korrigjim me dy spiranca, rregullime për çdo shenjë dhe eksport.",
   "h1": "Redaktuesi i Kohës: Udhëzues Hach pas Hapi",
   "intro": "Ky udhëzues kalon mjetin nga lart poshtë: ngarkoni titrat, shtoni hapa rregullimi, ekzekutoni kontrollet, akordoni imtësisht për çdo shenjë, dhe eksportoni.",
   "ctaText": "Hapni redaktuesin e kohës"
  },
  "body": [
   {
    "h2": "Load your subtitles :: Ngarkoni titrat tuaja",
    "ps": [
     "Zvarritni një skedar në kutinë me vija ose klikoni për të zgjedhur një; gjithashtu mund të **ngjitni përmbajtjen** drejtpërdrejt në kutinë e tekstit. Formati zbulohet si nga prapashtesa ashtu edhe nga përmbajtja, dhe rezultati shfaqet në çipin e formatit. Hyrjet e mbështetura: srt, vtt, ass (përfsh. ssa), sbv, lrc dhe txt."
    ],
    "img": {
     "file": "shift-upload",
     "alt": "Zona e ngarkimit: një titull mostër i ngarkuar, u zbulua si SRT",
     "cap": "Emri i skedarit dhe formati i zbuluar shfaqen nën zonën e lëshimit; kutia e tekstit mbetet e ndryshueshme."
    }
   },
   {
    "h2": "Add adjustment steps :: Shtoni hapa rregullimi",
    "ps": [
     "Rregullimet formojnë një **tubacion hapash**: çdo hap bën një punë dhe merr një numër, me njësinë e tij të shfaqur brenda kutisë. Hapat zbatohen nga lart poshtë, dhe ndryshimi i çdo hapi **rilogarit gjithçka nga titrat origjinale** — kështu që mund të ktheheni pas dhe të rregulloni një numër në çdo kohë pa bërë rrëmujë."
    ]
   },
   {
    "h2": "Korrigjimi me dy spiranca",
    "ps": [
     "Kur nuk dini as zhvendosjen në sekonda dhe as raportin, përdorni dy spiranca: pasi të shtohen, **të dy fushat \"aktuale\" plotësohen automatikisht** nga shenja e parë dhe e fundit e skedarit tuaj. Ju plotësoni vetëm fushat \"e synuara\" — kohët kur ato shenja duhet të shfaqen në të vërtetë. Çdo gjë në mes rishpërndahet në mënyrë proporcionale."
    ],
    "img": {
     "file": "shift-step-two",
     "alt": "Korrigjimi me dy spiranca: kohët aktuale të plotësuara automatikisht, kohët e synuara për t'u futur",
     "cap": "Fushat aktuale vijnë nga skedari juaj; fushat e synuara janë kohët e sakta që shihni në video."
    }
   },
   {
    "h2": "Kontrolli i vijës kohore dhe rregullimet për çdo shenjë",
    "ps": [
     "Pas ekzekutimit të hapave, lexoni **kontrollin e vijës kohore**: shenjat që janë shumë të shkurtra, shumë të gjata, shumë të dendura për t'u lexuar, rreshtat që janë shumë të gjerë, ose shenjat e mbivendosura listohen të gjitha. Kontrolli **shënon vetëm problemet dhe nuk ndryshon kurrë asgjë** vetë. Katër vizorët e paracaktuar janë kohëzgjatja minimale 0.833 s, maksimumi 7 s, shpejtësia e leximit 9 karaktere për sekondë dhe 21 karaktere për rresht — të gjitha të ndryshueshme në faqe. Më poshtë, rregullimet për çdo shenjë ju lejojnë të bashkoni dy shenja fqinje, të ndani një, ose të redaktoni fillimin dhe mbarimin e saj direkt; çdo redaktim mund të zhbëhet."
    ]
   },
   {
    "h2": "Export the result :: Eksporto rezultatin",
    "ps": [
     "Paneli i rezultatit tregon kohët origjinale dhe të rregulluara **krah për krah** për kontroll të lehtë në vend. Formati i daljes është parazgjedhur në formatin e hyrjes, por ju mund të kaloni në cilindo nga srt, vtt, ass, sbv, lrc ose txt para se ta shkarkoni."
    ],
    "img": {
     "file": "shift-result",
     "alt": "Paneli i rezultatit: kohët para dhe pas krah për krah, me butona shkarkimi dhe kopjimi",
     "cap": "Kohët origjinale në të majtë, të rregulluara në të djathtë; shkarkoni pasi kontrolli në vend të duket i saktë."
    }
   }
  ]
 },
 "shift-subtitle-timing": {
  "seo": {
   "title": "Si të Zhvendosni Të Gjitha Titrat më Herët ose më Vonë – AI-SRTSub",
   "desc": "Çdo shenjë vonohet me të njëjtën sasi: përdorni hapin e zhvendosjes së redaktuesit të kohës — futni një numër negativ ose pozitiv dhe të gjitha shenjat lëvizin së bashku.",
   "h1": "Lëvizni të Gjithë Skedarin e Titrave më Herët ose më Vonë",
   "intro": "Audioja fillon, titri shfaqet vonë — dhe çdo shenjë e vetme vonohet me të njëjtën sasi. Kjo është një zhvendosje uniforme: një numër e rregullon atë.",
   "ctaText": "Hapni redaktuesin e kohës"
  },
  "body": [
   {
    "h2": "Së pari konfirmoni se çdo shenjë vonohet me të njëjtën sasi",
    "ps": [
     "Kontrolloni në vend një shenjë pranë fillimit, një në mes dhe një në fund. Nëse të tria vonohen me afërsisht të njëjtën sasi, kjo është një **zhvendosje uniforme**, dhe një hap zhvendosjeje e rregullon atë. Nëse fillimi është i saktë dhe zhvendosja rritet drejt fundit, ky është një problem tjetër — shihni [[subtitles getting more and more out of sync|/guides/subtitles-out-of-sync.html]]."
    ]
   },
   {
    "h2": "Çfarë të futni: negative për të avancuar, pozitive për të vonuar",
    "ps": [
     "Në redaktuesin e kohës, shtoni një hap **Zhvendos të gjitha** dhe futni zhvendosjen në kutinë e vlerave: titrat që vonohen marrin një numër negativ për t'i tërhequr më herët; që shfaqen herët marrin një numër pozitiv për t'i shtyrë më vonë. Nëse titrat vonohen 1.5 sekonda, futni **-1.5** — njësia është sekonda."
    ],
    "img": {
     "file": "shift-step-shift",
     "alt": "Hapi i zhvendosjes së të gjithave me -1.5 sekonda të futura",
     "cap": "Një numër negativ tërheq të gjithë skedarin më herët; njësia është e shkruar brenda kutisë, në sekonda."
    }
   },
   {
    "h2": "Ekzekutoni atë dhe kontrolloni shenjën e parë",
    "ps": [
     "Pas aplikimit, paneli i rezultatit liston kohët origjinale dhe të reja të çdo shenje **krah për krah**. Kontrolloni shenjën e parë fillimisht: a bie koha e re e fillimit në kornizën ku flitet rreshti? Pastaj kontrolloni në vend një në mes. Çdo shenjë lëviz me të njëjtën sasi dhe mban kohëzgjatjen e saj."
    ]
   },
   {
    "h2": "Export :: Eksporto",
    "ps": [
     "Sapo kontrolli në vend të duket i saktë, shkarkoni direkt. Formati i daljes është parazgjedhur në formatin e hyrjes dhe mund të kalojë në diçka tjetër. Ndryshimi prek vetëm kohët — jo një karakter të vetëm teksti."
    ]
   }
  ]
 },
 "simplified-traditional-chinese": {
  "seo": {
   "title": "Nuk është një Ndryshim Karaktereve – Një-shumë dhe Fjalë Rajonale – AI-SRTSub",
   "desc": "Tri gjëra e bëjnë këtë të vështirë: mapimet një-shumë të zgjidhura sipas fjalës, fjalori i ndryshëm i Tajvanit dhe Hong Kongut, dhe konvertimi vetëm i dialogut. Bëjini të tria të sakta dhe nuk pason asnjë punë e përsëritur njerëzore.",
   "h1": "E thjeshtuar vs tradicionale nuk është një ndryshim karakteresh",
   "intro": "Cili karakter tradicional zëvendëson një të thjeshtuar varet nga karakteri pranë tij. Kjo është arsyeja pse ky konvertim nuk mund të bëhet duke ndryshuar verbërisht një nga një karakter.",
   "ctaText": "Open the converter :: Hapni konvertuesin"
  },
  "body": [
   {
    "h2": "Së pari: një formë e thjeshtuar, disa tradicionale",
    "ps": [
     "Thjeshtimi përmblodhi disa karaktere tradicionale në një formë të thjeshtuar. Duke u kthyer në drejtimin tjetër, një karakter i thjeshtuar i korrespondon disa atyre tradicionale, dhe zgjedhja mes tyre varet nga ajo me të cilën çiftohet:",
     "Ndryshimi i karaktereve një nga një i përmbledh të gjitha në të njëjtin dhe e bën çdo rast të gabuar. Zgjidhja **sipas fjalës** është ajo që i ndan ato — tabelat vijnë nga OpenCC, duke përputhur fjalitë para karaktereve të vetme. Për shembull:"
    ]
   },
   {
    "h2": "Së dyti: Tajvani dhe Hong Kongu nuk janë e njëjta gjë",
    "ps": [
     "Ka edhe një shtresë tjetër pas konvertimit në tradicionale: e njëjta fjalë shkruhet ndryshe në Tajvan dhe Hong Kong. Fjala për \"software\" është një gjë në Tajvan dhe një tjetër në Hong Kong, dhe Tajvani përdor fjalën e tij për \"informacion\".",
     "Prandaj drejtimet janë të ndara. Tradicionalja tajvaneze madje ndahet në \"ndrysho fjalorin\" dhe \"vetëm glife\" — vetëm glifet ruajnë fjalorin tuaj ekzistues, ndërsa ndryshimi i fjalorit ndryshon edhe termat rajonalë. Hong Kongu merr një drejtim të vetin."
    ],
    "img": {
     "file": "hanconv-dir",
     "alt": "Karta e konvertimit në: menuja rënëse e destinacionit tregon \"E thjeshtuar → Tradicionale tajvaneze (ndrysho fjalorin)\"",
     "cap": "Tajvani ofron ndryshime fjalori ose vetëm glife; Hong Kongu ka drejtimin e vet"
    }
   },
   {
    "h2": "Së treti: vetëm dialogu duhet të preket",
    "ps": [
     "Një skedar titrash nuk është vetëm dialog. Numrat e indeksit, kohëzgjatjet dhe rreshtat e stilit ASS janë atje gjithashtu, dhe asnjë karakter i tyre nuk duhet të konvertohet — veçanërisht rreshtat e stilit ASS, pasi ato përmbajnë emra direktivash në anglisht që prishen në momentin që trajtohen si dialog.",
     "Pra, konvertimi ndodh pas analizimit sipas formatit: SRT, VTT, ASS dhe TXT identifikojnë secili se cila pjesë është dialog, dhe vetëm karakteret brenda tij konvertohen. Kohëzgjatjet dhe stilet mbijetojnë të paprekura, pa pasur nevojë të ribëhet formatimi."
    ],
    "img": {
     "file": "hanconv-out",
     "alt": "Zona e rezultatit: titri i konvertuar dhe shiriti i statistikave që tregon numrin e rreshtave të ndryshuar",
     "cap": "Shiriti i statistikave tregon se sa rreshta ndryshuan; formatimi ruhet siç është"
    }
   },
   {
    "h2": "Kthimi te e thjeshtuar: kini kujdes",
    "ps": [
     "Konvertimi i tradicionales në të thjeshtuar kërkon gjithashtu që ju të thoni **nga cila larmi tradicionale po vini**: gjenerike, tajvaneze dhe Hong Kongu janë tri rrugë të ndryshme, sepse fjalori rajonal duhet t'i rikthehet fjalës gjenerike para se të mund të konvertohet. Zgjidhni drejtimin e gabuar dhe fjalori rajonal mbijeton në daljen e thjeshtuar.",
     "Grupi i poshtëm i nëntë drejtimeve është ai që konverton mbrapsht: tradicionale → e thjeshtuar, tajvaneze → e thjeshtuar, Hong Kong → e thjeshtuar."
    ]
   },
   {
    "h2": "Mjete dhe udhëzues të ngjashëm",
    "ps": [
     "Udhëzuesi i plotë — [[How to convert simplified and traditional subtitles|/guides/hanconv.html]]; nëse gjithçka që ju nevojitet është nga e thjeshtuar në tradicionale — [[Convert simplified subtitles to traditional|/guides/srt-simplified-to-traditional.html]]; për të përkthyer në një gjuhë tjetër, [[Subtitle translation|/translate.html]]."
    ]
   }
  ]
 },
 "split": {
  "seo": {
   "title": "Ndarja dhe bashkimi i titrave – Prit sipas bllokut, lidh në rend – AI-SRTSub",
   "desc": "Prit një skedar në segmente sipas kohëzgjatjes ose numrit të sinjaleve, rinis secilin në zero, ose lidh disa skedarë në rend ose ndërthuri ata sipas vijës kohore. Numrat e sinjaleve u ridalën, teksti mbeti i paprekur.",
   "h1": "Si të ndani dhe të bashkoni titrat",
   "intro": "Prit një skedar të gjatë titrash në segmente, ose bashko disa skedarë të shpërndarë në një. Prerja bie gjithmonë në një kufi hyrjeje — një fjali nuk pritet kurrë përgjysmë.",
   "ctaText": "Open split and join :: Hap ndarjen dhe bashkimin"
  },
  "body": [
   {
    "h2": "What this tool does :: Çfarë bën ky mjet",
    "ps": [
     "Ndarja e episodeve, ndarja e segmenteve dhe kombinimi i burimeve çojnë të gjitha në të njëjtin mospërputhje mes bllokut të titrave dhe blloqeve të videos: ose një skedar duhet të pritet ose disa duhet të kombinohen. Kjo faqe trajton të dyja, nga një skedë secila."
    ]
   },
   {
    "h2": "Së pari zgjidhni prerjen ose bashkimin",
    "ps": [
     "Dy skeda në krye: **Ndaj: një skedar në segmente** dhe **Bashko: disa skedarë në një**. Opsionet e hapit të dytë më poshtë ndryshojnë me zgjedhjen tuaj.",
     "Te \"1 Shto titrat\" ju ngarkoni një skedar ose ngjitni tekst; nëse keni zgjedhur atë të gabuar, klikoni \"Pastro\". Kjo faqe lexon vetëm UTF-8 — nëse kodimi është i dëmtuar (një mur me pikëpyetje ose kutia) shkoni te [[Rregullimi i tekstit të korruptuar|/repair.html]] më parë."
    ],
    "img": {
     "file": "split-mode",
     "alt": "Dy skedat në krye të faqes së ndarjes dhe bashkimit",
     "cap": "Prerja dhe bashkimi janë dy skeda; opsionet e hapit të dytë ndjekin zgjedhjen tuaj"
    }
   },
   {
    "h2": "How to cut :: Si të prisni",
    "ps": [
     "Nën \"2 Si të prisni\" zgjidhni bazën: **kohëzgjatja** (një segment çdo X minuta) ose **numri i sinjaleve** (një segment çdo X sinjale), më pas vendosni një numër.",
     "Zgjidhni \"Rinis secilin segment në 0:00\" dhe çdo segment që rezulton numëron nga zeroja — përdorni këtë kur ngarkoni episode dhe i jepni çdo segmenti një lojtari më vete. Lëreni të pashënuar për të ruajtur vulat kohore origjinale, kështu që çdo segment përafrohet përsëri me pozicionin e tij në videon burimore.",
     "Prerja bie vetëm në kufijtë e sinjaleve: kur një titull shumë i gjatë shtrihet në pikën e prerjes, i gjithë sinjali mbetet në segmentin e mëparshëm."
    ],
    "img": {
     "file": "split-cut",
     "alt": "Opsionet e kohëzgjatjes dhe numrit të sinjaleve me çelësin e rinisjes në zero në faqen e ndarjes",
     "cap": "Prit sipas kohëzgjatjes ose sipas numrit të sinjaleve, dhe sipas dëshirës rinis çdo segment në 0:00"
    }
   },
   {
    "h2": "How to join :: Si të bashkoheni",
    "ps": [
     "Nën \"2 Si të bashkoheni\" zgjidhni metodën: **Lidh në rend** zhvendos skedarin e mëvonshëm në mënyrë që të fillojë pasi të përfundojë ai i mëparshmi, pa mbivendosje mes segmenteve; **Ndërthuri sipas vijës kohore** ruan vulat kohore origjinale të secilit skedar dhe i rendit sipas kohës së fillimit.",
     "Përdorni lidhjen në rend kur skedarët janë gjysma e parë dhe e dytë e një episodi, ose kur gjysmat e korrektyruara veçmas duhet të bashkohen përsëri; përdorni ndërthurjen sipas vijës kohore kur skedarët i përkasin ekranit së bashku, si p.sh. një gjurmë origjinale dhe një gjurmë e përkthyer.",
     "Pas një bashkimi, numrat e sinjaleve ridalen automatikisht dhe asnjë fjalë dialogu nuk ndryshon."
    ],
    "img": {
     "file": "split-join",
     "alt": "Opsionet e lidhjes në rend dhe ndërthurjes sipas vijës kohore në faqen e bashkimit",
     "cap": "Lidhja në rend i përshtatet dy gjysmave të një episodi; ndërthurja sipas vijës kohore i përshtatet një gjurme origjinale dhe të përkthyer"
    }
   },
   {
    "h2": "Marrja e rezultatit",
    "ps": [
     "\"3 Rezultati\" në të djathtë eksporton **SRT** dhe **VTT**; klikoni \"Shkarko\" ose \"Kopjo\".",
     "Kur ndani, mund të përdorni \"Shkarko çdo segment\", i cili ruan çdo segment të prerë menjëherë në vend të një klikimi për segment."
    ],
    "img": {
     "file": "split-out",
     "alt": "Zgjedhja e formatit SRT/VTT me butonat e shkarkimit dhe të shkarkimit të çdo segmenti në zonën e rezultatit",
     "cap": "Rezultatet e ndarjes mund të shkarkohen segment pas segmenti; një skedar i bashkuar shkarkohet ose kopjohet direkt"
    }
   },
   {
    "h2": "Çfarë lihet e paprekur",
    "ps": [
     "Asnjë karakter dialogu nuk ndryshon. Kjo faqe ndryshon vetëm se cilat sinjale i përkasin cilit segment dhe si numërohen ato; përmbajtja e hyrjeve mbetet siç është.",
     "Me \"Lidh në rend\" vulat kohore të skedarëve të mëvonshëm zhvendosen në tërësi — kjo është ajo që kërkon bashkimi; me \"Ndërthuri sipas vijës kohore\" ruhet çdo vulë kohore origjinale."
    ]
   },
   {
    "h2": "Common questions :: Pyetje të shpeshta",
    "ps": [
     "**Po sikur segmenti i fundit të dalë shumë i shkurtër?** Kjo është normale. Pjesa e mbetur që nuk mbush një segment të plotë bëhet segmenti i vet në vend që të mbushet.",
     "**A do të ndahet një fjali që shtrihet mbi pikën e prerjes?** Jo. Prerjet bien vetëm në kufijtë e hyrjeve, dhe një sinjal që kalon vijën mbetet në segmentin e mëparshëm.",
     "**Pas ndërthurjes, si renditen dy sinjale me kohë identike?** Sipas kohës së fillimit; kur kohët e fillimit janë të barabarta, ruhet rendi në të cilin keni shtuar skedarët.",
     "**A mund të ndahet ASS?** Kjo faqe trajton SRT dhe VTT. Konvertoni ASS në SRT ose VTT me [[Konvertimi i formatit|/convert.html]] fillimisht."
    ]
   },
   {
    "h2": "Privacy :: Privatësia",
    "ps": [
     "Titrat përpunohen tërësisht në shfletues: asgjë nuk ngarkohet dhe asgjë nuk kalon përmes një serveri. Mbyllni faqen dhe përmbajtja zhduket."
    ]
   },
   {
    "h2": "Mjete dhe udhëzues të ngjashëm",
    "ps": [
     "Për të kombinuar dy skedarë në një gjurmë dygjuhëshe (në vend të një episodi) përdorni [[Bashkimi dygjuhësh dhe efektet speciale|/guides/merge.html]]; nëse e gjithë vija kohore është gabim, shkoni te [[Rregullimi i vijës kohore|/shift.html]]; për vlerën e një sezoni të tërë përdorni [[Konvertimi në grup|/batch.html]]; dhe ekzekutoni [[Kontrolli i cilësisë së titrave|/qc.html]] kur të keni mbaruar."
    ]
   }
  ]
 },
 "split-bilingual-subtitles": {
  "seo": {
   "title": "Ndaj titrat dygjuhëshe në dy gjurmë – AI-SRTSub",
   "desc": "Ndaj titrat dygjuhëshe në dy skedarë: gjurma origjinale dhe e përkthimit shkarkohen veçmas me emra të dallueshëm; të dyja format njihen. – AI-SRTSub",
   "h1": "Ndaj titrat dygjuhëshe në dy gjurmë",
   "intro": "Një titull dygjuhësh bëhet dy skedarë — “origjinal” dhe “përkthim”: ngarkoni, zgjidhni ndarjen në dy, shkarkoni secilin, me vijat kohore të mbajtura të paprekura.",
   "ctaText": "Ndaj titrat dygjuhëshe"
  },
  "body": [
   {
    "h2": "Kur ju duhet të ndani",
    "ps": [
     "Lojtari juaj dëshiron vetëm një gjurmë me një gjuhë të vetme; ose ju doni gjurmën e përkthimit për një ri-përkthim, ose gjurmën origjinale për ta çiftuar me një version tjetër të përkthyer. Një titull dygjuhësh është ose **një sinjal me dy rreshta** (origjinali në një rresht, përkthimi në tjetrin) ose **dy sinjale të ndara që ndajnë të njëjtën vijë kohore** — të dyja mund të ndahen."
    ]
   },
   {
    "h2": "Where to do it :: Ku ta bëni këtë",
    "ps": [
     "Hapni [[Heqësi i titrave dygjuhëshe|/bilingual.html]] dhe hidhni brenda titullin tuaj. Mjeti zbulon formën dygjuhëshe automatikisht: një sinjal me dy rreshta ndahet sipas sistemit të shkrimit, dy sinjale në të njëjtën vijë kohore sipas rendit. Zgjidhni **Ndaj në dy** në menynë rënëse të modalitetit dhe klikoni Fillo (ose lëreni të rinisë automatikisht). Zona e rezultatit tregon dy pjesë: ajo e etiketuar me `.orig` është gjurma origjinale, ajo e etiketuar me `.dst` është gjurma e përkthimit — klikoni “Shkarko” për secilën; dy gjurmët ndajnë saktësisht të njëjtën vijë kohore."
    ],
    "img": {
     "file": "bilingual-split",
     "alt": "Rezultati i ndarjes: gjurma origjinale dhe gjurma e përkthimit si dy pjesë, secila me një buton shkarkimi",
     "cap": "Ndarë në dy: .orig gjurma origjinale + .dst gjurma e përkthimit, të shkarkuara secila më vete"
    }
   },
   {
    "h2": "One common pitfall :: Një kurth i zakonshëm",
    "ps": [
     "**Një sinjal me dy rreshta në gjuhë që ndajnë të njëjtin alfabet (p.sh. anglisht plus frëngjisht) nuk mund të ndahet.** Kur gjurmët ndahen sipas sistemit të shkrimit, ato llogariten si një sistem dhe trajtohen si njëgjuhëshe. Konvertoni një përmbajtje të tillë në formën e të njëjtës vijë kohore B fillimisht, më pas ndajeni; forma me dy sinjale çiftohet sipas vijës kohore dhe nuk shqetësohet për gjuhën. Për të kuptuar hollësitë e të dyja formave, shihni [[Dy mënyra për të bërë titra dygjuhëshe|/guides/make-bilingual-subtitles.html]]."
    ]
   }
  ]
 },
 "srt-file-format": {
  "seo": {
   "title": "Çfarë është një skedar SRT? Si ta hapni dhe ta redaktoni atë – AI-SRTSub",
   "desc": "Anatomia e skedarëve të titrave SRT (SubRip): numri, vija e kohës, teksti. Si të hapni një të tillë në një redaktues teksti, pse një lojtar e refuzon atë, dhe si të rregulloni tekstin e korruptuar dhe gabimet e vulave kohore.",
   "h1": "Formati i skedarit SRT shpjegohet",
   "intro": "SRT është formati më universal i titrave: tekst i thjeshtë, strukturë e thjeshtë, i pranuar pothuajse kudo. Ky udhëzues shpalos strukturën e tij, se si ta hapni dhe si të rregulloni dështimet e zakonshme.",
   "ctaText": "Hapni konvertuesin e titrave"
  },
  "body": [
   {
    "h2": "Si duket një skedar SRT",
    "ps": [
     "SRT (SubRip) është tekst i thjeshtë — çdo redaktues teksti e hap atë. Çdo sinjal ka tri pjesë: një **rresht numri**, një **rresht kohor** dhe **tekstin**, të ndarë nga rreshta të zbrazët. Vija kohore lexon `00:00:01,000 --> 00:00:03,500` — vini re **presjen** para milisekondave, jo një pikë."
    ],
    "img": {
     "file": "convert-upload",
     "alt": "Zona e ngarkimit: një skedar SRT i ngarkuar që tregon numrat dhe kohën",
     "cap": "Sinjali standard me tri pjesë i SRT: numri, vija kohore, teksti"
    }
   },
   {
    "h2": "How to open it :: Si ta hapni",
    "ps": [
     "Për të lexuar përmbajtjen: klikoni me të djathtën dhe hapni me çdo **redaktues teksti**. Për ta përdorur me një video: ridrejtoni skedarine përputhni me emrin e skedarit të videos (përveç prapashtesës), vendosni të dyja në të njëjtin dosje, dhe lojtarë si VLC, PotPlayer ose mpv e ngarkojnë atë automatikisht; mund ta tërhiqni gjithashtu në dritaren e luajtjes."
    ]
   },
   {
    "h2": "Rregullimi i refuzimeve dhe tekstit të korruptuar",
    "ps": [
     "**Karaktere të korruptuara**: skedari nuk është UTF-8 — ruajeni përsëri si UTF-8 në redaktuesin tuaj. **Asgjë nuk shfaqet**: kontrolloni që vija kohore përdor një presje (jo një pikë) dhe se numrat e sinjaleve nuk janë të thyer (shumica e lojtarëve tolerojnë boshllëqet, disa jo). **Skedari është HTML ose JSON**: burimi i shkarkimit ishte i gabuar; merreni përsëri."
    ]
   },
   {
    "h2": "Çfarë mund dhe nuk mund të mbajë SRT",
    "ps": [
     "SRT mban vetëm tekst dhe kohë: **pa stile** (fonte, ngjyra), **pa pozicionim** (ku në ekran), **pa efekte**. Këto kanë nevojë për ASS — shihni [[SRT në ASS|/guides/srt-to-ass.html]]. Për një krahasim krah për krah të të gjitha formateve, shihni [[krahasimi i formatit të titrave|/guides/subtitle-format-comparison.html]]."
    ]
   }
  ]
 },
 "srt-fps-converter": {
  "seo": {
   "title": "Konvertuesi SRT FPS – Ndrysho shpejtësinë e kuadrove të titrave – AI-SRTSub",
   "desc": "Filmi është 24fps, transmetimi është 25fps, dhe titrat zhvendosen më shumë çdo minutë: shkallëzoni vijën kohore me 0.96 një herë dhe i gjithë skedari arrin në shkallën e synuar.",
   "h1": "Konvertimi i shpejtësisë së kuadrove të titrave: nga 24fps në 25fps",
   "intro": "Luani titrat e një filmi 24fps në një burim 25fps dhe ato humbasin mbi një sekondë çdo minutë — deri te titrat e fundit ato janë minuta prapa. Një shkallëzim e rregullon këtë.",
   "ctaText": "Hapni redaktuesin e kohës"
  },
  "body": [
   {
    "h2": "Pse mospërputhja e shpejtësisë së kuadrove bën që titrat të zhvendosen",
    "ps": [
     "Një konvertim i shpejtësisë së kuadrove ri-lexon **të njëjtën hapësirë kohe nën dy ora të ndryshme**. Një film 24fps prej 100 minutash ka 6000 s × 24 = **144,000 kuadro**; në një burim 25fps ato 144,000 kuadro luajnë në 5760 sekonda — **96 minuta**. I gjithë filmi zgjat 4 minuta më pak, kështu që një sinjal në minutën 50 shfaqet rreth 2 minuta me vonesë, dhe titulli i fundit nuk shfaqet kurrë."
    ]
   },
   {
    "h2": "Formula dhe faktorët e zakonshëm",
    "ps": [
     "Shkalla e synuar ÷ shkalla origjinale = shumëzuesi. **24 në 25: shumëzo me 0.96** (24÷25); në drejtimin tjetër, 25 në 24: 1.0417. **25 në 23.976: shumëzo me 0.959**; në drejtimin tjetër: 1.0427. Në redaktuesin e kohës shtoni një hap **Shkallëzo sipas shpejtësisë** dhe vendosni faktorin në kutinë e vlerës."
    ],
    "img": {
     "file": "shift-step-rate",
     "alt": "Hapi i shkallëzimit sipas shpejtësisë me 0.96 të futur",
     "cap": "0.96 është 24÷25; sugjerimi në faqe përmend madje konvertimin e shpejtësisë së kuadrove si një përdorim të zakonshëm."
    }
   },
   {
    "h2": "Kur nuk i dini dy shpejtësitë",
    "ps": [
     "Nëse nuk e gjeni shpejtësinë e kuadrove të burimit, mos e merrni me mend faktorin — përdorni **dy spiranca** në vend të kësaj: merrni kohën e vërtetë të shfaqjes së sinjalit të parë dhe të fundit si dy pika, dhe çdo gjë në mes shtrihet përsëri në mënyrë proporcionale. Shihni [[titrat po dalin gjithnjë e më shumë jashtë sinkronizimit|/guides/subtitles-out-of-sync.html]]."
    ]
   },
   {
    "h2": "Çfarë duhet të kontrolloni më pas",
    "ps": [
     "Shkallëzimi lëviz çdo fillim dhe fund; kohëzgjatjet e sinjaleve shtrihen me të njëjtin faktor. Pas ekzekutimit, verifikoni dy skajet: sinjalin e parë (gabimi më i vogël origjinal) dhe të fundit (më i madhi). Nëse të dy skajet përputhen, gjithçka në mes përputhet gjithashtu."
    ]
   }
  ]
 },
 "srt-simplified-to-traditional": {
  "seo": {
   "title": "Konverto titrat e thjeshtuar në tradicional – Tajvan ose Hong Kong – AI-SRTSub",
   "desc": "Kthejini titrat kinezë të thjeshtuar në tradicionalë: zgjidhni tajvaneze (me ose pa fjalor rajonal) ose Hong Kong. Përputhjet një-shumë zgjidhen sipas fjalës. Vetëm dialogu ndryshon; kohët mbeten në vend.",
   "h1": "Konverto titrat e thjeshtuar në tradicionalë",
   "intro": "Një titull kinez i thjeshtuar që drejtohet për një audiencë tajvaneze ose të Hong Kongut ka nevojë vetëm për konvertim — por dy rajonet duan gjëra të ndryshme, dhe zgjedhja e drejtimit të gabuar ju jep fjalë që vendasit nuk i përdorin.",
   "ctaText": "Konverto këtë titull"
  },
  "body": [
   {
    "h2": "The need :: Nevoja",
    "ps": [
     "Titrat tuaj janë kinezisht i thjeshtuar dhe duhet t'u arrijnë shikuesve në Tajvan ose Hong Kong. Rregullimi i karaktereve një nga një nuk është realist — një episod i vetëm ka qindra sinjale — dhe dy rajonet nuk duan të njëjtin tekst tradicional: fjalori ndryshon, dhe drejtimi i gabuar prodhon fjalë që asnjë vendas nuk do t'i përdorte."
    ]
   },
   {
    "h2": "Where to do it :: Ku ta bëni këtë",
    "ps": [
     "Hapni [[Konvertimi i thjeshtuar-tradicional|/hanconv.html]], tërhiqni titullin brenda, dhe zgjidhni një nga drejtimet i thjeshtuar → tradicional te \"Konverto në\": tradicional gjenerik, tajvanez (ndrysho fjalorin), tajvanez (vetëm glifat) ose Hong Kong. Konvertimi ndodh menjëherë dhe zona e rezultatit tregon titullin e përfunduar, gati për t'u shkarkuar.",
     "**Për një audiencë tajvaneze**: zgjidhni \"Tajvaneze (ndrysho fjalorin)\" nëse fjalori rajonal duhet të ndryshojë gjithashtu — \"softueri\" dhe \"informacioni\" bëhen ekuivalentët e lor tajvanez — ose \"Tajvaneze (vetëm glifat)\" nëse doni që format e karaktereve të ndryshojnë duke ruajtur fjalorin tuaj origjinal. **Për një audiencë të Hong Kongut**: zgjidhni \"Hong Kong\", ku \"softueri\" shkruhet me një formë tjetër."
    ],
    "img": {
     "file": "hanconv-dir",
     "alt": "Karta e konvertimit: menyja rënëse e destinacionit që tregon \"E thjeshtuar → Tradicionale tajvaneze (ndrysho fjalorin)\"",
     "cap": "Tajvani dhe Hong Kongu janë drejtime të ndara me fjalor të ndryshëm"
    }
   },
   {
    "h2": "Common pitfalls :: Kurthe të zakonshme",
    "ps": [
     "**Mos kini frikë nga përputhjet një-shumë**: i njëjti karakter i thjeshtuar në fjalët për \"të pastër\", \"të tharë\" dhe \"trung druri\" përputhet me karaktere të ndryshme tradicionale. Tabelat e zgjidhin këtë me anë të frazave, kështu që gjithçka nuk shembet në një karakter të vetëm.",
     "**Vetëm dialogu konvertohet**: kohët, numrat e indeksit dhe rreshtat e stilit ASS janë të paprekur, kështu që rezultati është gati për t'u përdorur.",
     "**Asgjë nuk ndryshoi? Kontrolloni para se të panikoseni**: nëse shiriti i statistikave raporton 0 rreshta të ndryshuar, ose skedari nuk ka karaktere kineze ose formati është zbuluar gabimisht — kontrolloni që \"Formati i zbuluar\" të përputhet me atë që keni ngarkuar."
    ]
   },
   {
    "h2": "Related :: Të ngjashme",
    "ps": [
     "Shpjegimi i plotë i të nëntë drejtimeve — [[Si të konvertoni titrat e thjeshtuar dhe tradicionalë|/guides/hanconv.html]]; pse është më shumë sesa thjesht ndërrimi i karaktereve — [[E thjeshtuar vs tradicionale nuk është një ndërrim karakteresh|/guides/simplified-traditional-chinese.html]]; tradicionale mbrapsht tek e thjeshtuar gjendet gjithashtu te [[Konvertimi i thjeshtuar-tradicional|/hanconv.html]]."
    ]
   }
  ]
 },
 "srt-to-ass": {
  "seo": {
   "title": "Konvertuesi SRT në ASS – Konverto titrat në internet – AI-SRTSub",
   "desc": "Konvertoni titrat SRT në ASS (Advanced SubStation Alpha) me një kanavacë 1920×1080 dhe një stil të pastër të paracaktuar, gati për t'u ngarkuar në çdo lojtar. Ekzekutohet në shfletuesin tuaj.",
   "h1": "SRT to ASS :: SRT në ASS",
   "intro": "Ktheni titrat SRT në ASS: hidhni skedarin, zgjidhni ASS, shkarkoni. Një kanavacë 1920×1080 dhe një stil i pastër i paracaktuar gjenerohen për ju.",
   "ctaText": "Convert SRT → ASS :: Konverto SRT → ASS"
  },
  "body": [
   {
    "h2": "When you need ASS :: Kur ju duhet ASS",
    "ps": [
     "Përdorni ASS kur një titull i ngarkuar ka nevojë për **pozicionim më të mirë dhe kontroll stili**: ai mbart koncepte që SRT i mungojnë — madhësia e kanavacës, stilet e fonteve, drejtimi. mpv, PotPlayer, VLC dhe shumica e lojtarëve e mbështesin atë drejtpërdrejt."
    ]
   },
   {
    "h2": "Si duket dalja",
    "ps": [
     "Mjeti rindërton një kryefaqe standarde: një kanavacë **1920×1080**, mbështjellje e mençur (WrapStyle 0) dhe një stil i vetëm i paracaktuar — Arial 54, tekst i bardhë me skicë të zezë, i vendosur në qendër poshtë. Çdo sinjal përdor këtë stil."
    ],
    "img": {
     "file": "convert-opt-ass",
     "alt": "Menyja rënëse e formatit të daljes me ASS - Advanced SubStation të zgjedhur",
     "cap": "Zgjidhni ASS si dalje dhe shkarkoni pas konvertimit"
    }
   },
   {
    "h2": "A ruhen stilet?",
    "ps": [
     "SRT nuk ka koncept stili në radhë të parë. Dhe nëse burimi juaj është tashmë ASS, konvertimi **rindërton stilin e paracaktuar dhe nuk mban atë origjinal** — përdorni një redaktues të dedikuar titrash për ristylimin e ASS. Koha dhe teksti mbeten të paprekura në çdo rast."
    ]
   }
  ]
 },
 "srt-to-excel": {
  "seo": {
   "title": "Konverto titrat në Excel – Korrektyro rresht pas rreshti – AI-SRTSub",
   "desc": "Eksportoni titrat SRT në Excel: një rresht për sinjal në katër kolona — indeks, fillim, fund dhe tekst. Koha mbahet si tekst, ndërprerjet e rreshtave të paprekura, dhe fleta e redaktuar mund të konvertohet përsëri në titra.",
   "h1": "Konverto titrat në Excel",
   "intro": "Korrektimi i qindra sinjaleve në një redaktues teksti është rraskapitës. Në Excel çdo sinjal është një rresht, kështu që filtrimi, komentimi dhe kërkim-zëvendësimi bëhen të disponueshme — dhe redaktimet kthehen përsëri në SRT-në tuaj.",
   "ctaText": "Export to Excel :: Eksporto në Excel"
  },
  "body": [
   {
    "h2": "The need :: Nevoja",
    "ps": [
     "Korrektimi, ndryshimet masive të fjalëve, ose ndarja e punës mes disa personave — e gjithë kjo lëviz shumë më shpejt në një fletë sesa në tekst të thjeshtë. Vetë SRT është tekst i thjeshtë, por struktura e tij e sinjaleve (indeksi, koha, dialogu) përputhet saktësisht me katër kolona të fletëllogaritjes."
    ]
   },
   {
    "h2": "Where to do it :: Ku ta bëni këtë",
    "ps": [
     "Hapni [[Konvertimi i titrave ⇄ tabelë|/table.html]], kaloni te \"në tabelë\", tërhiqni SRT-në brenda, dhe pamja paraprake mbushet me një rresht për sinjal në katër kolona — indeks, fillim, fund, tekst. Goditni \"Shkarko Excel (.xlsx)\" dhe ai është i yaji. VTT mbështetet në të njëjtën mënyrë.",
     "Kur të keni mbaruar redaktimin: ndryshoni modalitetin në \"në titull\", futni fletën përsëri, dhe ju merrni përsëri një SRT. Rregulli është tri kolona për fillimin, fundin dhe tekstin (Fillimi / Fundi / Teksti në anglisht funksionojnë gjithashtu), në çdo rend."
    ],
    "img": {
     "file": "table-prev",
     "alt": "Pamja paraprake e tabelës: çdo sinjal SRT si një rresht në katër kolona, me shiritin e statistikave",
     "cap": "SRT i vendosur si katër kolona, i konvertueshëm përsëri në të njëjtën mënyrë"
    }
   },
   {
    "h2": "Common pitfalls :: Kurthe të zakonshme",
    "ps": [
     "**Rregulloni kodimin e dëmtuar fillimisht**: kjo faqe lexon vetëm UTF-8. Një ekran plot me pikëpyetje ose kuti do të thotë një udhëtim te [[Rregullimi i Mojibake|/repair.html]] fillimisht.",
     "**CSV ose xlsx**: zgjidhni .xlsx kur skedari do të futet në Excel, kështu që kolona e kohës nuk mund të riformatohet; CSV është më e lëvizshme, por Excel mund ta lexojë atë si diçka tjetër — vendosni kolonën e kohës në \"Tekst\" nëse kjo ndodh.",
     "**ASS nuk funksionon**: ASS mban direktiva stili, prandaj konvertojeni në SRT para se ta vendosni në një tabelë."
    ]
   },
   {
    "h2": "Related :: Të ngjashme",
    "ps": [
     "Udhëzuesi i plotë dy-drejtimësh — [[Si të konvertoni titrat në Excel / CSV|/guides/table.html]]; përkthimi pas kësaj — [[Përkthimi i titrave|/translate.html]]; një kalim i fundit para dorëzimit — [[Kontrolli i cilësisë së titrave|/qc.html]]."
    ]
   }
  ]
 },
 "srt-to-vtt": {
  "seo": {
   "title": "Konvertuesi SRT në VTT – Konverto titrat në internet – AI-SRTSub",
   "desc": "Konvertoni titrat SRT në VTT (WebVTT) për elementët e gjurmëve HTML5. Presjet e vulave kohore bëhen pika automatikisht. Ekzekutohet në shfletuesin tuaj, asgjë nuk ngarkohet.",
   "h1": "SRT to VTT :: SRT në VTT",
   "intro": "Ktheni titrat SRT në VTT: hidhni skedarin, zgjidhni VTT, shkarkoni. Vulat kohore rishkruhen për formatin e uebit, të gjitha në shfletuesin tuaj.",
   "ctaText": "Convert SRT → VTT :: Konverto SRT → VTT"
  },
  "body": [
   {
    "h2": "When you need VTT :: Kur ju duhet VTT",
    "ps": [
     "Lojtarët e uebit (elementi HTML5 `<track>`), ngarkimi i titrave në YouTube dhe shumica e lojtarëve të bazuar në shfletues pranojnë vetëm **VTT (WebVTT)** — jo SRT. Nëse gjithçka që keni është SRT, një konvertim e bën atë të funksionojë."
    ]
   },
   {
    "h2": "Si ndryshojnë të dy formatet",
    "ps": [
     "Përmbajtja është pothuajse identike; tri gjëra shkruhen ndryshe: **rreshti i kryefaqes WEBVTT** (i kërkuar në VTT); **ndarësi i milisekondave** në vulat kohore — SRT përdor një presje (000001,000) ndërsa VTT përdor një pikë (000001.000); dhe VTT lejon blloqe NOTE dhe STYLE që SRT nuk i lejon."
    ],
    "img": {
     "file": "convert-result",
     "alt": "Rezultati i konvertimit që tregon kryefaqen WEBVTT dhe vulat kohore me pikë",
     "cap": "VTT i konvertuar: rreshti i parë WEBVTT, vulat kohore me pikë"
    }
   },
   {
    "h2": "How to convert :: Si të konvertoni",
    "ps": [
     "Hapni [[konvertuesin|/convert.html]], hidhni SRT-në brenda, zgjidhni **VTT - WebVTT** si dalje, më pas konvertoni dhe shkarkoni. Renditja e sinjaleve, vlerat e kohës dhe teksti me shumë rreshta mbahen të gjitha siç janë — vetëm sintaksa ndryshon. Po shkoni në drejtimin tjetër? Shihni [[VTT në SRT|/guides/vtt-to-srt.html]]."
    ]
   }
  ]
 },
 "subtitle-format-comparison": {
  "seo": {
   "title": "SRT vs VTT vs ASS vs SBV vs LRC – Cili format titrash – AI-SRTSub",
   "desc": "Një krahasim i aftësive të pesë formateve të zakonshme të titrave: stilimi i tekstit, pozicionimi, saktësia e kohës, se ku i përket secili dhe si të konvertoni mes tyre.",
   "h1": "Zgjedhja e një formati titrash: SRT / VTT / ASS / SBV / LRC",
   "intro": "I njëjti titull i ruajtur në pesë formate u shërben pesë zotërinjve të ndryshëm. Ky udhëzues krahason se çfarë mund të bëjë secili format dhe si të lëvizni mes tyre.",
   "ctaText": "Hapni konvertuesin e titrave"
  },
  "body": [
   {
    "h2": "Zgjidhni një format në një fjali",
    "ps": [
     "Ngarkimi në një lojtar, pajtueshmëria maksimale → **SRT**; lojtarët e uebit (gjurma HTML5) ose ngarkimi në YouTube → **VTT**; fontet, ngjyrat, pozicionimi, efektet → **ASS**; shkarkuar nga YouTube → **SBV** (konverto në SRT për të zgjeruar mbështetjen); tekstet e këngëve, këndimi rresht pas rreshti → **LRC**."
    ],
    "img": {
     "file": "convert-opt",
     "alt": "Menyja rënëse e formatit të daljes: gjashtë formate të synuara",
     "cap": "Gjashtë objektivat e eksportit në konvertues mbulojnë çdo format në këtë udhëzues"
    }
   },
   {
    "h2": "Krahasimi i aftësive",
    "ps": [
     "**SRT**: tekst i thjeshtë + kohë, pa stilim apo pozicionim, kampioni i pajtueshmërisë. **VTT**: tekst + kohë, i mbështetur në mënyrë native nga shfletuesit, mund të mbajë pozicionim dhe stilim bazë, pikë para milisekondave. **ASS**: tekst + kohë + stilim i plotë (fonte, ngjyra, skica, pozicionim, efekte), koha në qindëshe sekonde. **SBV**: formati minimal i titrave të YouTube, fillimi dhe fundi në një rresht. **LRC**: formati i teksteve të këngëve, vetëm kohët e fillimit, pa kohë përfundimi, pa stilim."
    ]
   },
   {
    "h2": "Rrugët mes formateve",
    "ps": [
     "Çdonjëri prej këtyre konvertohet në të dyja drejtimet në [[konvertues|/convert.html]]: leximi mbështet srt, vtt, ass (prfsh. ssa), sbv, lrc, txt; eksportimi mbështet srt, vtt, ass, sbv, lrc, txt. Rrugët e zakonshme secila kanë udhëzuesin e tyre: [[SRT në VTT|/guides/srt-to-vtt.html]], [[VTT në SRT|/guides/vtt-to-srt.html]], [[SRT në ASS|/guides/srt-to-ass.html]], [[ASS në SRT|/guides/ass-to-srt.html]], [[SBV në SRT|/guides/sbv-to-srt.html]], [[LRC në SRT|/guides/lrc-to-srt.html]]."
    ]
   },
   {
    "h2": "Çfarë humbasin konvertimet",
    "ps": [
     "Konvertimi në SRT gjithmonë heq stilimin dhe pozicionimin (SRT nuk mund t'i mbajë ato). Konvertimi në ASS me këtë mjet **rindërton një stil të paracaktuar dhe nuk mban atë origjinal**. LRC në SRT ka nevojë që kohët e fundit të plotësohen (çdo rresht zgjat deri në të ardhmen; i fundit merr 3 sekonda). Vlerat e kohës dhe teksti mbeten identike në çdo drejtim."
    ]
   }
  ]
 },
 "subtitle-garbled-characters": {
  "seo": {
   "title": "Nga vjen Mojibake i titrave – Vëreni re, rregullojeni – AI-SRTSub",
   "desc": "Mojibake do të thotë një lexim i gabuar, jo një skedar i dëmtuar. Karakteret zëvendësuese, muret e shkronjave me theks dhe vargjet e karaktereve të errëta tregojnë secili për një shkak — mësoni se cilat rikuperohen dhe cilat kurrë.",
   "h1": "Nga vjen mojibake i titrave",
   "intro": "Të njëjtët bajt të lexuar si UTF-8 dhe të lexuar si GBK dalin si dy grupe karakteresh plotësisht të ndryshme. Mënyra se si duket teksti i mbeturinave është dëshmi e drejtpërdrejtë se cili hap shkoi keq.",
   "ctaText": "Hapni mjetin e riparimit të mojibake"
  },
  "body": [
   {
    "h2": "Skedari është në rregull — është lexuar gabim",
    "ps": [
     "Ajo që ruan një skedar titrash janë bajtet. Kthimi i bajteve në karaktere kërkon të dihet se në cilin kodim janë shkruar ato — kuptojeni gabim këtë dhe merrni mojibake. Asnjë bajt i vetëm nuk mungon në skedar; lexojeni përsëri me kodimin e duhur dhe karakteret kthehen.",
     "Kjo e ndan punën në dy pjesë: **përcaktimi se cili ishte kodimi fillestar**, dhe **ruajtja e tij si një kodim që lojtari juaj mund ta zbulojë**. E para vjen nga dekodimi provues dhe vlerësimi, e dyta nga ruajtja e një kopjeje. Ato zgjidhin probleme të ndryshme."
    ]
   },
   {
    "h2": "Pesë pamje, pesë shkaqe",
    "ps": [
     "Mojibake nuk është i rastësishëm — mënyra se si duket tregon se çfarë e shkaktoi atë:"
    ],
    "img": {
     "file": "repair-diag",
     "alt": "Karta e diagnostikimit që liston çdo lloj gjurme mojibake",
     "cap": "Diagnostikimi rendit mojibake sipas shkakut në vend që t'i bashkojë ato së bashku"
    }
   },
   {
    "h2": "Pse karakteri zëvendësues nuk mund të riparohet",
    "ps": [
     "Karakteri zëvendësues është vija ndarëse. Një `�` do të thotë se bajtet ishin hedhur tashmë **në një hap të mëparshëm** (zakonisht ndonjë program që lexon skedarin dhe e ruan përsëri), dhe asgjë nuk u regjistrua rreth asaj që u hoq. Në atë pikë nuk ka asgjë për të arsyetuar mbrapsht — askush nuk mund ta riparojë atë.",
     "Kështu që faqja e riparimit trajton dy raste ndryshe. Ngarkoni një skedar dhe bajtet origjinale janë të paprekura, duke e lënë atë të provojë çdo kodim; nëse teksti i ngjitur përmban tashmë karakterin zëvendësues, ai thotë qartë: \"nuk mund të riparohet, ju lutemi ngarkoni skedarin origjinal\".",
     "Ekziston gjithashtu rasti i kundërt: përmbajtja lexohet në mënyrë të përkryer por lojtari juaj ende shfaq mbeturina. Skedari nuk ka faj — **lojtari zgjodhi kodimin e gabuar**. Redaktimi i tekstit nuk do të ndihmojë; ruani një kopje si UTF-8 me BOM ose GBK dhe jepjani atë."
    ],
    "img": {
     "file": "repair-up",
     "alt": "Zona e ngarkimit: tërheqja-dhe-lëshimi dhe ngjitja si dy pika hyrjeje",
     "cap": "Ngarkoni skedarin nëse mundeni — bajtet e paprekura do të thonë se ka diçka për t'u riparuar"
    }
   },
   {
    "h2": "Çfarë po krahason gjatë riparimit",
    "ps": [
     "Mjeti provon çdo kodim të mundshëm, më pas vlerëson çdo rezultat: sa prej tij përbëhet nga karaktere të zakonshme, nëse ka vargje aksentesh, vargje simbole, nëse vargjet CJK janë mure me karaktere të errëta. Rezultati me vlerësimin më të lartë shkon në krye të listës.",
     "**Nëse asnjë vlerësim nuk është qartësisht më i mirë, asgjë nuk rekomandohet** — më mirë t'ju them \"kjo lexohet mirë siç është\" sesa t'ju mbyll gojën me diçka që vetëm përafërsisht i ngjan gjuhës. Teksti i dëmtuar dy herë (ruajtur gabim një herë, pastaj riparuar gabim një herë) merr një raund shtesë të zgjidhjes mbrapsht te kandidatët kryesorë."
    ],
    "img": {
     "file": "repair-fix",
     "alt": "Lista e kandidatëve e renditur sipas pikëve, secila e etiketuar me çiftin e saj të kodimit",
     "cap": "Kandidatët e renditur sipas pikëve — pa fitues të qartë, pa rekomandim"
    }
   },
   {
    "h2": "Ruajtja e kodimit të duhur përfundon punën",
    "ps": [
     "Teksti i riparuar duhet të ruhet ende si një kodim që lojtari juaj e njeh. Lojtarët në Windows zakonisht mbështeten te BOM për të zbuluar kodimin, kështu që **UTF-8 me BOM** është më pak i mundimshëm; pajisjet më të vjetra dhe disa lojtarë rajonalë duan GBK. Mund të zgjidhni UTF-8, UTF-8 (me BOM), GBK, Big5, Shift_JIS ose EUC-KR, dhe do t'ju thuhet të zgjidhni një tjetër nëse diçka nuk përshtatet (GBK nuk mund të mbajë koreanisht)."
    ],
    "img": {
     "file": "repair-out",
     "alt": "Zona e rezultatit: menyja rënëse e kodimit ruaj-si dhe butoni i shkarkimit",
     "cap": "Ruajeni si diçka që lojtari e njeh dhe mojibake zgjidhet vërtet"
    }
   },
   {
    "h2": "Mjete dhe udhëzues të ngjashëm",
    "ps": [
     "Udhëzuesi i plotë — [[Si të riparoni titrat e korruptuar (mojibake)|/guides/repair.html]]; çfarë ruan në të vërtetë një skedar SRT — [[Çfarë ka brenda një skedari SRT|/guides/srt-file-format.html]]; kodimi është në rregull por përmbajtja është e ndotur (filigranë, reklama, etiketa për të dëmtuarit) — [[Pastrimi i titrave|/clean.html]]."
    ]
   }
  ]
 },
 "subtitle-glossary": {
  "seo": {
   "title": "Tabelat e termave: një sezon, një fjalor – Kur të ndërtoni një të tillë – AI-SRTSub",
   "desc": "Një tabelë termash rregullon të njëjtën fjalë të paraqitur në mënyrë jo të qëndrueshme: kur të ndërtoni një të tillë, si ta ripërdorni nëpër një sezon, pse përputhja e fjalës së plotë nuk bën asgjë në kinezisht dhe çfarë të mos i dorëzoni asaj.",
   "h1": "Tabelat e termave: mbajtja e një sezoni të qëndrueshëm",
   "intro": "Kur një emër është A në episodin një dhe B në episodin shtatë, shikuesit mendojnë se ata janë dy karaktere. Një tabelë termash parandalon pikërisht këtë — ajo rregullon se si quhen gjërat.",
   "ctaText": "Hap zëvendësimin e termave në grup"
  },
  "body": [
   {
    "h2": "Një tabelë termash rregullon mospërputhjen",
    "ps": [
     "Problemet e fjalorit në titra vijnë në dy lloje: \"kjo fjalë është përkthyer gabim\" dhe \"e njëjta fjalë është përkthyer ndryshe nga një vend në tjetrin\". E para është një problem fjalori; e dyta është ajo për të cilën shërben një tabelë termash.",
     "E dyta është edhe më e zakonshme edhe më e vështirë për t'u vënë re: `Thor` bëhet \"Thor\" në episodin një dhe \"Donar\" në episodin shtatë, dhe çdo episod duket mirë më vete ndërsa seriali në tërësi i bën shikuesit të mendojnë se u shfaq një karakter i ri. Një tabelë termash e kthen \"ky prodhim e quan atë Thor\" në një rregull të ekzekutueshëm të zbatuar për të gjithë skedarin e titrave menjëherë."
    ]
   },
   {
    "h2": "Kur ia vlen të ndërtosh një të tillë",
    "ps": [
     "Jo çdo skedar titrash ka nevojë për një tabelë termash. Rastet që e justifikojnë një të tillë zakonisht janë këto:"
    ],
    "img": {
     "file": "glossary-rules",
     "alt": "Rregullat e zëvendësimit të grupuara sipas kategorisë në një tabelë termash",
     "cap": "Përdorni komente # për të grupuar rregullat, dhe për të çaktivizuar një përkohësisht gjatë redaktimit"
    }
   },
   {
    "h2": "Mbajtja e një tabele nëpër një sezon",
    "ps": [
     "Një tabelë termash mirëmbahet **në mënyrë shtesë**: vendosni emrat në episodin një, më pas shtoni një rregull sa herë që shfaqet një term i ri, dhe deri në fund të sezonit tabela është e plotë. Për sezonin e ardhshëm të të njëjtit serial, filloni prej saj.",
     "Shkruani rregulla pak më të gjera sesa nevojitet rreptësisht — pasi të keni vendosur për \"Thor\", shtoni edhe \"Donar -> Thor\", kështu që titrat e dikujt tjetër mund të sillen në përputhje në të njëjtin kalim.",
     "Lexoni gjithmonë **listën e ndryshimeve** pas kësaj: ajo emërton çdo sinjal, çdo rresht dhe se çfarë u bë çfarë. Është i vetmi vend ku mund të konfirmoni se ndryshimi ishte i duhur dhe jo i ekzagjeruar, dhe çdo hyrje që nuk ju pëlqen mund të zhbëhet me një klikim."
    ],
    "img": {
     "file": "glossary-diff",
     "alt": "Lista e ndryshimeve individuale në zonën e rezultatit",
     "cap": "Çdo ndryshim është i listuar; klikoni një që nuk e doni për ta zhbërë atë"
    }
   },
   {
    "h2": "Çfarë të mos i dorëzoni një tabele termash",
    "ps": [
     "Një tabelë termash ndryshon **fjalë**. Këto tri gjëra janë jashtë punës së saj, dhe duhet të jenë:",
     "**Gramatika dhe struktura e fjalive** — ju nuk mund ta ktheni një fjalë në një fjali; puna në nivel fjalie kthehet te [[Përkthimi i titrave|/translate.html]] ose te një njeri.",
     "**Pastrimi i përmbajtjes** — heqja e rreshtave të të rrethuarve si filigranë, reklama dhe sinjale SDH i përket [[Pastrimi i titrave|/clean.html]]; rregullat e tabelës së termave zëvendësojnë, ato nuk fshijnë rreshta.",
     "**Vilat kohore** — një tabelë termash nuk prek kurrë kohën. Për një zhvendosje globale ose një problem shpejtësie, shkoni te [[Rregullimi i vijës kohore|/shift.html]]."
    ]
   },
   {
    "h2": "Disa gjëra që gabohen lehtë",
    "ps": [
     "**Kinezishtja ende zëvendëson nënstringjet me përputhjen e fjalës së plotë të zgjedhur — kjo është normale.** Kinezishtja dhe japonishtja nuk i ndajnë fjalët me hapësira, kështu që mjeti nuk mund të përcaktojë kufijtë e fjalëve dhe përputhja e fjalës së plotë nuk ka efekt atje; `art` nuk do të prekë `start` mbrojtja funksionon vetëm për anglishten.",
     "**Rendi ndryshon rezultatin.** Rregullat ekzekutohen nga lart poshtë dhe teksti i prodhuar nga një rregull skanohet përsëri nga rregullat poshtë tij. Zëvendësoni A me B dhe pastaj B me C dhe përfundoni me C.",
     "**Për të ndryshuar vetëm përkthimin, vendosni fushëveprimin.** Në një skedar dygjuhësh, zgjidhni \"vetëm rreshti i dytë\"; hyrjet me vetëm një rresht mbeten të paprekura nën çdo cilësi me një rresht — mjeti nuk merr me mend se cila anë është origjinali.",
     "**Tabela e termave nuk ruhet.** Ajo është e zbrazët çdo herë që hapni faqen, ndaj mbani skedarin tuaj të tekstit dhe përcilleni atë."
    ]
   },
   {
    "h2": "Mjete dhe udhëzues të ngjashëm",
    "ps": [
     "Për udhëzuesin e plotë shihni [[Si të zëvendësoni termat në grup në titra|/guides/glossary.html]]; nëse përmbajtja është e ndotur, ekzekutoni [[Pastrimi i titrave|/clean.html]] fillimisht; pasi emrat të jenë vendosur dhe ju duhen gjuhë të tjera, shkoni te [[Përkthimi i titrave|/translate.html]]; dhe ekzekutoni rezultatin përmes [[Kontrolli i cilësisë së titrave|/qc.html]]."
    ]
   }
  ]
 },
 "subtitle-quality-check": {
  "seo": {
   "title": "Lista e kontrollit të cilësisë së titrave para dorëzimit – AI-SRTSub",
   "desc": "Lista e kontrollit të dorëzimit të titrave: mbivendosjet, shpejtësia e leximit, gjerësia e rreshtit dhe pikësimi dështojnë më shpesh. Ekzekutoni rregullat e QC të 17 — gjysma e problemeve janë rregullime me një klikim.",
   "h1": "Çfarë duhet të kontrolloni para dorëzimit",
   "intro": "Titrat e përfunduar nuk janë gati për t'u dorëzuar: problemet që shikuesit i vënë re që në shikim të parë janë pikërisht ato që nuk mund t'i shihni pasi i keni parë njëqind herë. Kjo listë kontrolli mbulon atë kalim përfundimtar.",
   "ctaText": "Ekzekuto një kontroll QC të titrave"
  },
  "body": [
   {
    "h2": "Pse nuk mund t'i shihni vetë problemet",
    "ps": [
     "Kushdo që bën titra e njoh përmbajtjen shumë mirë — e dini se çfarë thotë çdo rresht në vazhdim, kështu që asgjë nuk duket kurrë shumë e shpejtë; ju keni parë paraqitjen qindra herë, dhe sytë tuaj i kalojnë të metat vetë. Kështu që kontrolli para dorëzimit nuk mund të mbështetet te “ta shikosh përsëri nga e para” — ai duhet të jetë **i matur kundrejt numrave**: shpejtësia e leximit, gjerësia e rreshtit, kohëzgjatja, mbivendosjet. Lërini shifrat të vendosin."
    ]
   },
   {
    "h2": "Gjashtë dështimet më të zakonshme",
    "ps": [
     "Të renditura sipas shpeshtësisë me të cilën ato fundosin një dorëzim:"
    ]
   },
   {
    "h2": "How to Check :: Si të kontrolloni",
    "ps": [
     "Hapni [[Kontrolli i cilësisë së titrave|/qc.html]] dhe hidhni titrat tuaj brenda; vendosni gjuhën në zbulim automatik (27 gjuhë, secila me nivelet e veta të rregullave). Raporti liston gjetjet në tri nivele — **gabime / paralajmërime / sugjerime** — secila me numrin e hyrjes dhe vlerën e matur. Gabimet duhet të trajtohen (teksti i korruptuar, formati i vulave kohore, fundi më herët se fillimi, numërimi i prishur); paralajmërimet varen nga rasti (mbivendosjet, shpejtësia e leximit, gjerësia e rreshtit, kohëzgjatja); sugjerimet janë lustrimi (pozicioni i ndarjes së rreshtit, hapësirat, pikësimi)."
    ],
    "img": {
     "file": "qc-report",
     "alt": "Raporti i QC: një listë problemesh me tri nivele, secila gjetje me numrin e hyrjes dhe krahasimin e vlerës së matur kundrejt pragut",
     "cap": "Një raport me tri nivele që jep numrin e hyrjes dhe vlerën e matur për çdo gjetje"
    }
   },
   {
    "h2": "Çfarë mund të rregullohet me një klikim",
    "ps": [
     "Numërimi, hyrjet e zbrazëta, mbështjellja e re, hapësirat dhe pikësimi — çdo gjë që **e lë kohën të paprekur** — mund të rregullohet automatikisht; rregullimet që **ndryshojnë kohën** (shkëmbimi i fillimit dhe fundit, zhvendosja e mbivendosjeve, shkurtimi ose zgjatja e kohëzgjatjeve) janë të pashënuara si parazgjedhje dhe duhet të zgjidhen vetëm pasi të konfirmoni ndikimin. **Shpejtësia e leximit mbi kufirin nuk ka rregullim automatik** — makina nuk mund ta di se cilën fjalë të presë, ndaj shkurtoni përkthimin vetë ose lëshoni pak kohën; shihni [[Titra shumë të shpejta për t'u lexuar|/guides/subtitle-too-fast.html]]. Pas rregullimit, një kontroll i ri ekzekutohet automatikisht, dhe raporti numëron vetëm atë që u rregullua vërtet."
    ]
   },
   {
    "h2": "While You’re At It :: Ndërkohë që jeni duke e bërë këtë",
    "ps": [
     "Faqja e raportit mund të shkarkojë drejtpërdrejt një raport `.qc.txt` me tekst të thjeshtë — bashkëngjitni atë te dorëzimi në mënyrë që pala tjetër të shohë me një shikim se çfarë keni kontrolluar. Për titrat e përkthyer rishtas, ekzekutoni QC para dorëzimit; zhvendosja e përgjithshme e vijës kohore është një lloj tjetër problemi — nëse shpejtësia e leximit dështon ende pas kontrollit, shihni [[Titra që zhvendosen jashtë sinkronizimit|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "subtitle-speed-converter": {
  "seo": {
   "title": "Sinkronizo titrat pas ndryshimit të shpejtësisë së videos – AI-SRTSub",
   "desc": "Video u përshpejtua ose u ngadalësua dhe titrat nuk përputhen më: futni faktorin e shpejtësisë në hapin e shkallëzimit sipas shpejtësisë dhe e gjithë vija kohore shtrihet me videon.",
   "h1": "Rregullo titrat pas një ndryshimi të shpejtësisë së videos",
   "intro": "Video u bë më e shpejtë ose më e ngadalësuar në përgjithësi, titrat qëndruan në ritmin origjinal — çdo gjë pas një pike është gabim. Futni faktorin dhe e gjithë vija kohore shkallëzohet me videon.",
   "ctaText": "Hapni redaktuesin e kohës"
  },
  "body": [
   {
    "h2": "Kur të përdorni një shpejtësi në vend të një zhvendosjeje",
    "ps": [
     "Video u përshpejtua ose u ngadalësua **në tërësi** (p.sh. 0.9x ose 1.25x në softuerin e redaktimit) ndërsa çdo sinjal ruajti ritmin e tij origjinal: fillimi përputhet, dhe sa më larg të shkoni aq më keq bëhet — me një raport konstant. Ky është një problem shpejtësie. Nëse i gjithë skedari thjesht zhvendoset me një sasi të fiksuar pa u rritur, një zhvendosje mjafton — shihni [[zhvendosja e të gjithë skedarit të titrave më herët ose më vonë|/guides/shift-subtitle-timing.html]]."
    ]
   },
   {
    "h2": "Cilin numër të futni",
    "ps": [
     "Titrat duhet të ndjekin videon, prandaj futni **faktorin me të cilin video ndryshoi në të vërtetë**: një përshpejtësi 1.25x do të thotë se kohët e sinjaleve shumëzohen me 1.25 për të arritur; një ngadalësim 0.9x shumëzohet me 0.9. Në redaktuesin e kohës, shtoni një hap **Shkallëzo sipas shpejtësisë** dhe vendosni faktorin në kutinë e vlerës."
    ],
    "img": {
     "file": "shift-step-rate",
     "alt": "Hapi i shkallëzimit sipas shpejtësisë me një faktor në kutinë e vlerës",
     "cap": "Një faktor mbi 1 shtrin vijën kohore (për një video të përshpejtuar), nën 1 e ngjesh atë (për një të ngadalësuar)."
    }
   },
   {
    "h2": "Si ndryshon kjo nga një zhvendosje",
    "ps": [
     "Një zhvendosje **lëviz** kohët e çdo sinjali me të njëjtën sasi të fiksuar dhe mban kohëzgjatjet e sinjaleve; një shpejtësi **shumëzon** si fillimin ashtu edhe fundin, kështu që kohëzgjatjet shkallëzohen gjithashtu. Pas një ndryshimi shpejtësie, vetë kohëzgjatjet kanë ndryshuar — kjo është pikërsisht arsyeja pse kërkohet një shpejtësi."
    ]
   },
   {
    "h2": "Nëse nuk o jeni të sigurt për faktorin",
    "ps": [
     "Kur faktori humbet, kthehuni te **dy spiranca**: futni kohët e vërteta të videos së sinjalit të parë dhe të fundit dhe çdo gjë në mes përhapet në mënyrë proporcionale — e barabartë me gjetjen e faktorit të duhur. Shihni [[titrat po dalin gjithnjë e më shumë jashtë sinkronizimit|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "subtitle-too-fast": {
  "seo": {
   "title": "Titra shumë të shpejta për t'u lexuar – Rregullo shpejtësinë e leximit – AI-SRTSub",
   "desc": "Titra shumë të shpejta për t'u lexuar — kohëzgjatje e shkurtër apo tekst i gjatë? QC shënon hyrjet mbi 20 karaktere/sekondë (9 hanzi për CJK); kohëzgjatjet rregullohen automatikisht, teksti ka nevojë për redaktim.",
   "h1": "Titra shumë të shpejta për t'u lexuar",
   "intro": "Shikuesit vazhdojnë të shtypin pauzë? Fajtori është shpejtësia e leximit. Si ta matni atë, si ta rregulloni dhe kur të redaktoni tekstin kundrejt kohës — të gjitha në një udhëzues.",
   "ctaText": "Check Reading Speed :: Kontrollo shpejtësinë e leximit"
  },
  "body": [
   {
    "h2": "Çfarë është shpejtësia e leximit?",
    "ps": [
     "Shpejtësia e leximit është thjesht **nëse shikuesit mund të mbarojnë leximin e një titulli brenda kohës që ai qëndron në ekran**. Matematika është e drejtpërdrejtë: gjerësia e tekstit pjesëtuar me sekondat në ekran. Kufijtë e zakonshëm të industrisë: 9 karaktere me gjerësi të plotë për sekondë për kinezisht, japonisht dhe koreanisht (18 njësi me gjysmë gjerësie), 20 njësi me gjysmë gjerësie për sekondë për gjuhët e tjera. Një rresht me 20 hanzi që zgjat 1 sekondë dalin 40 njësi gjerësie për sekondë — më shumë se dyfishi i kufirit, dhe shikuesit nuk do ta mbarojnë kurrë atë."
    ]
   },
   {
    "h2": "Së pari, dalloni se çfarë lloj shpejtësie",
    "ps": [
     "\"Shumë i shpejtë për t'u lexuar\" është në të vërtetë dy probleme të ndryshme: **kohëzgjatje shumë e shkurtër** — sinjali ndërpritet pas një ose dyqind milisekondash, zakonisht një gabim kohor ose një mbetje redaktimi; **tekst shumë i gjatë** — kohëzgjatja është në rregull, por rreshti ngjesh 30 hanzi, dhe asnjë kufizim shpejtësie nuk do ta shpëtojë atë. Rregullimet janë të kundërta, ndaj kuptoni se cilin keni fillimisht."
    ],
    "img": {
     "file": "qc-rules",
     "alt": "Cilësimi i kufirit të shpejtësisë së leximit në faqen e QC, me parazgjedhje 18 për CJK dhe 20 për gjuhët e tjera",
     "cap": "Pragjet e shpejtësisë së leximit të QC: 18 njësi gjerësie për sekondë për CJK, 20 për gjuhët e tjera"
    }
   },
   {
    "h2": "How to Check :: Si të kontrolloni",
    "ps": [
     "Hapni [[Kontrolli i cilësisë së titrave|/qc.html]] dhe hidhni titrat tuaj brenda. Në raport, “kohëzgjatje shumë e shkurtër” është një paralajmërim që tregon milisekondat e matura (pragu: 833 milisekonda); “shpejtësi e palexueshme” është gjetja e saj që tregon njësitë e gjerësisë së matura për sekondë. Për titrat dygjuhësh llogaritet vetëm rreshti i shkruar në gjuhën e synuar — të dyja gjuhët nuk mblidhen së bashku."
    ]
   },
   {
    "h2": "How to Fix It :: Si ta rregulloni",
    "ps": [
     "**Kohëzgjatje shumë e shkurtër**: e rregullueshme me një klikim — sinjali zgjatet automatikisht në 833 milisekonda, pa kaluar fillimin e sinjalit tjetër (një rregullim nuk duhet të krijojë mbivendosje të reja). **Tekst shumë i gjatë** — pa rregullim automatik — makina nuk mund ta di se cilën fjalë të presë. Dy rrugë, zgjedhja juaj: shkurtoni përkthimin (klikoni qelizën në mjetin e përkthimit për ta redaktuar atë), ose shtrini kohëzgjatjen e këtij sinjali (vetëm nëse ka një boshllëk para sinjalit tjetër; për probleme të përgjithshme të vijës kohore shihni [[Zhvendosja e vijës kohore|/shift.html]]). Ekzekutoni QC përsëri pas kësaj për të konfirmuar se shpejtësia e leximit është kthyer brenda pragut."
    ]
   },
   {
    "h2": "Don’t Overcorrect :: Mos e teproni me rregullimin",
    "ps": [
     "Përmbushja e kufirit të shpejtësisë nuk do të thotë shikim i rehatshëm: ngjeshja e çdo sinjali deri në 9 karaktere për sekondë e bën të gjithë filmin të lodhshëm. Si rregull i përgjithshëm, qëndroni rreth 70% të pragut pjesën më të madhe të kohës, dhe lejoni që pasazhet e dendura në dialog të kalojnë pak herë pas here. Blloqet e titrave që pulsojnë shumë shpesh janë një problem në vetvete — ekzekutoni grupin e plotë të metrikave para dorëzimit, shihni [[Çfarë duhet të kontrolloni para dorëzimit|/guides/subtitle-quality-check.html]]."
    ]
   }
  ]
 },
 "subtitles-out-of-sync": {
  "seo": {
   "title": "Titrat zhvendosen gjithnjë e më shumë jashtë sinkronizimit? Rregullojeni – AI-SRTSub",
   "desc": "Fillon mirë, disa sekonda prapa nga mesi i filmit, i papërdorshëm në fund: kjo është zhvendosje progresive, zakonisht një mospërputhje e shpejtësisë së kuadrove ose një ndryshim i shpejtësisë së videos. Dy spiranca e rregullojnë këtë.",
   "h1": "Titrat zhvendosen gjithnjë e më shumë jashtë sinkronizimit: Shkaqet dhe rregullimet",
   "intro": "Mirë në fillim, nja dy sekonda me vonesë pas gjysmë ore, e pashpresë në fund. Këtë lloj mospërputhjeje zhvendosjeje ka shkaqe të njohura — dhe një rregullim të njohur.",
   "ctaText": "Fix this file :: Rregullo këtë skedar"
  },
  "body": [
   {
    "h2": "Së pari dalloni dy llojet e mospërputhjes",
    "ps": [
     "Mospërputhja vjen në dy lloje: një **zhvendosje uniforme** do të thotë se çdo sinjal është vonë (ose herët) me të njëjtën sasi, afërsisht e barabartë nga fillimi në fund; **zhvendosja progresive** do të thotë se fillimi është i saktë dhe gabimi rritet drejt fundit, duke arritur ndoshta minuta. Ky artikull flet për llojin e dytë — për të parin, shihni [[zhvendosja e të gjithë skedarit të titrave më herët ose më vonë|/guides/shift-subtitle-timing.html]]."
    ]
   },
   {
    "h2": "Pse zhvendoset gjithnjë e më shumë",
    "ps": [
     "Zhvendosja vjen nga **dy ora të ndryshme**: tre shkaqet më të zakonshme janë (1) një mospërputhje e shpejtësisë së kuadrove — titrat e një filmi 24fps në një burim 25fps humbasin mbi një sekondë për minutë; (2) video u përshpejtua ose u ngadalësua ndërsa titrat ruajtën ritmin e tyre origjinal; (3) një regjistrim VFR (shpejtësi e ndryshueshme kuadrove) vija kohore e të cilit është e pabarabartë në fillim. Çfarë ndajnë ata: gabimi rritet afërsisht në mënyrë lineare me kohën e luajtjes."
    ]
   },
   {
    "h2": "Rregulloni atë me dy spiranca",
    "ps": [
     "Për shkak se gabimi rritet në mënyrë lineare, fiksimi i një kohe të saktë në çdo skaj dhe rishpërndarja e mesit në mënyrë proporcionale kthen gjithçka në vend. Në redaktuesin e kohës, shtoni **korrigjimin me dy spiranca**: dy fushat \"aktuale\" plotësohen automatikisht me kohët origjinale të këtij skedari; ju shikoni videon dhe futni **kur sinjali i parë dhe i fundit shfaqen në të vërtetë** në dy fushat \"të synuara\"."
    ],
    "img": {
     "file": "shift-step-two",
     "alt": "Korrigjimi me dy spiranca: kohët aktuale të plotësuara automatikisht, kohët e synuara për t'u futur",
     "cap": "Merrni spirancat në dy skajet — gabimin origjinal më të vogël dhe më të madh — dhe çdo gjë në mes rishpërndahet në mënyrë proporcionale."
    }
   },
   {
    "h2": "Si të verifikoni rezultatin",
    "ps": [
     "Pas ekzekutimit, paneli i rezultatit liston kohët origjinale dhe të reja të çdo sinjali **krah për krah**. Kontrolloni tri vende: sinjalin e parë, një në mes dhe të fundit — tri pozicionet me gabimin origjinal më të vogël, të mesëm dhe më të madh. Nëse të treja bien në vend, i gjithë skedari e bën këtë."
    ],
    "img": {
     "file": "shift-result",
     "alt": "Paneli i rezultatit: kohët para dhe pas krah për krah, me buton shkarkimi",
     "cap": "Kohët e ja të sinjaleve të mesit duhet të bien midis dy skajeve — një shenjë se proporcioni është i duhur."
    }
   },
   {
    "h2": "Kur dy spiranca nuk mjaftojnë",
    "ps": [
     "Korrigjimi me dy spiranca presupozon se gabimi është **linear**. Nëse burimi është një regjistrim ekrani VFR me një kërcim të shpejtësisë së kuadrove në mes të skedarit, një tërheqje lineare nuk mund të rregullojë mesin — merrni një sinjal mesatar dukshëm të gabuar si një pikë të tretë, ndajni skedarin atje dhe ekzekutoni korrigjimin me dy spiranca në secilën gjysmë. Gjithashtu, pas rregullimit, rishikoni pjesën e mesme me shpejtësi normale për të konfirmuar se nuk ka mbetur asnjë mospërputhje lokale."
    ]
   }
  ]
 },
 "table": {
  "seo": {
   "title": "Konvertimi i Nëntitujve në Excel / CSV – Të Dy Drejtimet – AI-SRTSub",
   "desc": "Udhëzues dykahësh: eksporto SRT/VTT në Excel ose CSV për korrigjim rresht pas rreshti, më pas importo skedarin e redaktuar përsëri si nëntituj. Nevojiten tre shtylla, në çdo renditje; koha mbahet si tekst.",
   "h1": "Si të konvertoni nëntitujt në Excel / CSV",
   "intro": "Korrigjimi dhe përkthimi janë më të lehtë në një fletëllogaritëse. Eksporto nëntitujt në Excel ose CSV, redakto rresht pas rreshti, pastaj konverto përsëri — shtyllat e kohës mbeten tekst dhe ndarjet e rreshtave brenda dialogut ruhen.",
   "ctaText": "Hap konvertuesin e tabelave"
  },
  "body": [
   {
    "h2": "Çfarë bën ky mjet",
    "ps": [
     "Nëntitujt janë rreshta sinjalizuesish dhe fletëllogaritëset janë rreshta të dhënash — pasi të jetë bërë fletë, korrigjimi, komentimi dhe përkthimi masiv mund të bëhen të gjitha me mjetet që tashmë i njihni. Të dy drejtimet mbështeten:"
    ]
   },
   {
    "h2": "Ngarko dhe zgjidh një drejtim",
    "ps": [
     "Tërhiq një skedar brenda ose kërko për të. Çdo drejtim ka nevojë për një lloj tjetër skedari: **në tabelë** merr skedarë nëntitujsh (SRT / VTT), **në nëntitull** merr skedarë fletëllogaritëse (CSV / Excel, të dy .xlsx dhe .xls). Zgjidh modalitetin e gabuar dhe faqja ju tregon se cilin lloj skedari kërkon ai modalitet.",
     "⚠️ Kjo faqe lexon vetëm UTF-8. Nëse nëntitulli juaj hapet si një ekran plot me pikëpyetje ose kuti, kalojeni paraprakisht përmes [[Riparimi i shkronjave të prishura|/repair.html]] — kodimi i prishur lexohet vetëm si karaktere zëvendësuese këtu."
    ],
    "img": {
     "file": "table-up",
     "alt": "Zona e ngarkimit të konvertuesit të tabelave: zona e lëshimit dhe dy çelësat e modalitetit",
     "cap": "Çdo modalitet kërkon një skedar tjetër: nëntitujt brenda, fletëllogaritësja jashtë — dhe anasjelltas"
    }
   },
   {
    "h2": "Eksportimi i nëntitujve në një tabelë",
    "ps": [
     "Zgjidh \"në tabelë\", lësho një nëntitull brenda, dhe pamja paraprake liston çdo sinjalizim: indeksin, fillimin, mbarimin, tekstin. Shiriti i statistikave jep numrin e sinjalizimeve dhe kohëzgjatjen totale. Më pas kliko \"Shkarko Excel (.xlsx)\" ose \"Shkarko CSV\".",
     "Dallimi mes të dyjave: .xlsx është një skedar i vërtetë fletëllogaritëse ku Excel nuk mund të riformatojë shtyllën tuaj të kohës pas shpinës suaj; CSV është më e lëvizshme, por Excel mund ta interpretojë shtyllën e kohës si diçka tjetër kur e hap atë. Nëse kjo ndodh, zgjidhni shtyllën e kohës dhe caktoni formatin e saj në \"Tekst\" — ose thjesht përdorni .xlsx."
    ],
    "img": {
     "file": "table-prev",
     "alt": "Pamja paraprake e tabelës: shtyllat e indeksit, fillimit, mbarimit dhe tekstit me shiritin e statistikave",
     "cap": "Çdo sinjalizim i shfaqur paraprakisht; shiriti i statistikave jep numrin e sinjalizimeve dhe kohëzgjatjen totale"
    }
   },
   {
    "h2": "Importimi i një tabele përsëri në nëntituj",
    "ps": [
     "Zgjidh \"në nëntitull\", lësho fletën brenda, dhe ja rregulla e shtyllave: ajo ka nevojë për tre shtylla për **fillimin, mbarimin dhe tekstin** (titujt anglisht Start / End / Text funksionojnë gjithashtu), në **çfarëdo renditjeje**. `00:00:01,500` dhe `00:00:01.500` pranohen të dyja; rreshtat që nuk mund të analizohen anashkalohen në vend që të dënojnë të gjithë skedarin.",
     "Rezultati listohet sinjalizim pas sinjalizimi në pamjen paraprake; konfirmo, pastaj shkarko SRT ose VTT. Nëse ato tre shtylla mungojnë, merrni një mesazh që ju thotë të kontrolloni titujt — zakonisht sepse është përdorur një emërtim tjetër gjatë eksportimit, ose rreshti i titullit nuk është rreshti i parë."
    ],
    "img": {
     "file": "table-back",
     "alt": "Zona e rezultateve të nëntitujve: nëntitujt e importuar të listuar sinjalizim pas sinjalizimi",
     "cap": "Shtyllat e panjohura raportohen, nuk anashkalohen kurrë në heshtje"
    }
   },
   {
    "h2": "Pyetje të Shpeshta",
    "ps": [
     "**Excel-i e shfaq shtyllën e kohës gabim?** Përdor .xlsx dhe kjo nuk ndodh kurrë. Nëse duhet të përdorësh CSV: zgjidh shtyllën e kohës dhe cakto formatin e qelisë në \"Tekst\" para se ta hapësh.",
     "**A duhet që titujt e shtyllave të jenë në anglisht?** Jo. Start / End / Text njihen në çdo gjuhë që kjo faqe mbështet, dhe madhësia e shkronjave nuk ka rëndësi.",
     "**A janë ende aty ndarjet e rreshtave të mi pas importimit?** Po. Ndarjet e rreshtave brenda dialogut ruhen, deri te mbështjellja origjinale.",
     "**A mbështetet ASS?** Kjo faqe trajton vetëm SRT dhe VTT. ASS mbart direktiva stili — konvertoje në SRT me [[Konvertuesi i formateve|/convert.html]] në radhë të parë.",
     "**Sa skedarë menjëherë?** Një. Për të përpunuar dhjetëra ose qindra, përdor [[Konvertimi në grupe|/batch.html]] (e cila vetëm konverton formatet dhe nuk kalon përmes një tabele)."
    ]
   },
   {
    "h2": "Privatësia",
    "ps": [
     "Konvertimi ekzekutohet tërësisht në shfletuesin tuaj. Asnjë përmbajtje e nëntitujve nuk i dërgohet kurrë një serveri."
    ]
   },
   {
    "h2": "Mjete dhe udhëzues të ngjashëm",
    "ps": [
     "Nëse gjithçka që dëshironi është hapi i nëntitullit në Excel, shihni [[Konverto nëntitujt në Excel|/guides/srt-to-excel.html]]; për të përkthyer në një gjuhë tjetër më vonë, [[Përkthimi i nëntitujve|/translate.html]]; dhjetëra skedarë menjëherë — [[Konvertimi në grupe|/batch.html]]."
    ]
   }
  ]
 },
 "translate": {
  "seo": {
   "title": "Përkthimi i nëntitujve me AI – ngarko në eksport dygjuhësh – AI-SRTSub",
   "desc": "Përkthe nëntitujt me AI: ngarko SRT/VTT/ASS, zgjidh nga 100 gjuhë, unifiko emrat me një fjalor, eksporto nëntituj dygjuhësh. Falas për të filluar, mbështetet çelësi juaj i API-së.",
   "h1": "Si të përdorni përkthimin e nëntitujve me AI",
   "intro": "Rrejti i plotë i punës për një skedar nëntitujsh, nga ngarkimi përmes përkthimit te eksporti: çfarë është në ekran, çfarë të klikoni dhe çfarë merrni në çdo hap.",
   "ctaText": "Hap mjetin e përkthimit"
  },
  "body": [
   {
    "h2": "Çfarë bën ky mjet",
    "ps": [
     "Përkthen nëntitujt nga një gjuhë në një tjetër dhe eksporton një skedar nëntitujsh gati për përdorim. Nevojat tipike:"
    ]
   },
   {
    "h2": "Ngarko nëntitujt",
    "ps": [
     "Kliko \"Zgjidh skedarin e nëntitujve\" ose ngjit tekstin e nëntitujve drejtpërdrejt në kutinë e hyrjes majtas. Gjashtë formate mbështeten: SRT, VTT, ASS, SSA, SBV dhe TXT. Nuk keni skedar në dorë? Kliko \"Ngarko mostrën\" për ta parë në veprim. Pasi të jetë analizuar, shtylla e mesme tregon një tabelë nëntitujsh me një indeks, vijë kohore dhe tekst burimor për çdo hyrje."
    ],
    "img": {
     "file": "translate-upload",
     "alt": "Zona e importit të mjetit të përkthimit: zgjidh skedarin e nëntitujve, kutia e ngjitjes dhe butoni i ngarkimit të mostrës",
     "cap": "Shtylla e majtë \"Importo nëntitujt\": zgjidh një skedar, ngjit tekst ose ngarko një mostër"
    }
   },
   {
    "h2": "Zgjidh gjuhën dhe stilin",
    "ps": [
     "\"Gjuha burimore\" mund të mbetet në zbulim automatik; \"gjuha e synuar\" zgjidhet nga 100 gjuhë. Pesë stile përkthimi janë në dispozicion: Të ekuilibruar (parazgjedhje), Bisedor, Profesional formal, Stili i dublimit dhe Përshtatur. \"Stili i dublimit\" i përshtatet dialogut të filmave dhe TV; \"Profesional formal\" i përshtatet dokumentarëve dhe kurseve."
    ],
    "img": {
     "file": "translate-lang",
     "alt": "Cilësimet e gjuhës dhe stilit të përkthimit: gjuha burimore, menutë rënëse të gjuhës së synuar dhe pesë stilet",
     "cap": "\"Gjuha\" dhe \"stili i përkthimit\": burimi mund të zbulojë automatikisht, 75 zgjedhje të synuara"
    }
   },
   {
    "h2": "Fjalori: mbaj emrat e qëndrueshëm",
    "ps": [
     "AI përkthen në grupe, kështu që i njëjti emër mund të dalë në dy mënyra të ndryshme në grupe të ndryshme. Shkruani rregulla \"burimi → duhet të përkthehet si\" në fjalor; para çdo grupi mjeti e skanon atë dhe ndjek çdo përputhje. Një rregull për rresht; shigjetat mund të jenë `->`, `=>`, `→` ose Tab; një term burimor i vetëm do të thotë ta mbash të papërkthyer; disa drejtshkrime mund të ndajnë një interpretim përmes `|`. Kliko \"✨ Nxirr me AI\" për ta bërë AI të nxjerrë emrat e përveçëm nga videoja në tabelë fillimisht, pastaj redakto dhe përkthe."
    ],
    "img": {
     "file": "translate-glossary",
     "alt": "Fjalori dhe zona e emrave të përveçëm: kutia e hyrjes së fjalorit me butonat e nxjerrjes me AI dhe ruajtjes",
     "cap": "Fjalori i \"emrave të unifikuar\": emra të përveçëm të nxjerrur me AI, të ngarkuar automatikisht për videot e reja sapo të ruhen"
    }
   },
   {
    "h2": "Procesi i përkthimit",
    "ps": [
     "Kliko \"▶ Fillo përkthimin\" në shiritin e sipërm. Shiriti i statistikave të mesit tregon hyrjet, të përkthyera, mbushësit e pastruar dhe grupet e fjalive ndër-hyrje në kohë reale; shiriti i progresit tregon kohën e vlerësuar të mbetur dhe shenjat e përdorura. Gjatë përkthimit, kliko çdo qeli përkthimi në tabelë për të redaktuar tekstin — ndryshimet ruhen në makinën tuaj dhe i mbijetojnë një rifreskimi. Mbyll faqen në mes të procesit dhe do t'ju ofrohet të vazhdoni aty ku u la. Kur një fjali shtrihet në disa hyrje, grupi bashkohet, përkthehet dhe rimbushet sipas kohëzgjatjes."
    ],
    "img": {
     "file": "translate-workspace",
     "alt": "Hapësira e punës e përkthimit: shiriti i statistikave, shiriti i progresit dhe tabela e nëntitujve e redaktueshme",
     "cap": "Hapësira e punës e mesit: shiriti i statistikave + shiriti i progresit + tabela e nëntitujve me klikim për të redaktuar"
    }
   },
   {
    "h2": "Eksporti",
    "ps": [
     "Në shtyllën e djathtë zgjidhni formën e përmbajtjes fillimisht: vetëm përkthim (monogjuhësh), dygjuhësh me origjinalin sipër, ose dygjuhësh me përkthimin sipër; pastaj formatin e skedarit: SRT, WebVTT, SBV, ASS ose TXT. Zgjedhja e ASS shton dy raorde: ekrane të ndara sipër/poshtë dhe rreshta të grumbulluar poshtë. Përmbajtja dhe formati kombinohen lirshëm në 14 stile eksporti. Gjerësia e rreshtit dygjuhësh vendoset veçmas. Kliko \"Shkarko nëntitujt\" për të ruajtur skedarin, ose \"Kopjo në memorien e fragmenteve\" për ta ngjitur menjëherë."
    ],
    "img": {
     "file": "translate-export",
     "alt": "Paneli i eksportit: tre forma përmbajtjeje, pesë formate skedarësh dhe cilësime të gjerësisë së rreshtit dygjuhësh",
     "cap": "Eksporti i shtyllës së djathtë: zgjidh formën e përmbajtjes fillimisht, pastaj formatin e skedarit"
    }
   },
   {
    "h2": "Kostoja dhe privatësia",
    "ps": [
     "Modeli i paracaktuar nuk kërkon regjistrim dhe as çelës — ai punon menjëherë nga kutia me kuota për kërkesë: një kufi ditor për IP plus një leje ditore për të gjithë faqen. Për grupe të mëdha, futni çelësin tuaj të API-së nën \"Motori i përkthimit\". Privatësia, sipas njoftimit në faqe: nëntitujt për modelin e paracaktuar përcillen përmes serverit të kësaj faqeje te furnizuesi; një API e personalizuar trajtohet drejtpërdrejt nga furnizuesi që futni, dhe çelësi mbetet në shfletuesin tuaj. Analiza, mbështjellja e rreshtave dhe skema dygjuhëshe ekzekutohen të gjitha lokalisht në shfletues."
    ]
   },
   {
    "h2": "Pyetje të Shpeshta",
    "ps": [
     "**Gjuhë të tjera të përziera në përkthim?** Mjeti zbulon devijimin e gjuhës dhe ri-përkthen automatikisht; nëse disa hyrje ende duken gabim, kliko qelinë dhe rregulloji ato me dorë.",
     "**Po rreshtat e teksteve të këngëve?** \"Filtrimi i përmbajtjes\" ofron tri opsione për tekstet e këngëve: përkthe tekstet, mbaj origjinalin ose fshiji ato.",
     "**Përkthime jo të qëndrueshme të emrave?** Shto drejshkrimet e paqëndrueshme te fjalori dhe përkthe përsëri; fjalori ka përparësi ndaj cilësimit global \"trajtimi i emrave të përveçëm\".",
     "**Dëshironi anglisht sipër dhe kinezisht poshtë?** Zgjidh \"Dygjuhësh · origjinali sipër\" kur eksportoni; për kinezisht sipër dhe anglisht poshtë, zgjidh \"Dygjuhësh · përkthimi sipër\"."
    ]
   },
   {
    "h2": "Mjete dhe udhëzues të ngjashëm",
    "ps": [
     "Format i gabuar? Fillo me [[konvertimi i formatit|/convert.html]]; vija kohore nuk përputhet? Përdor [[rregullimi i vijës kohore|/shift.html]]; para se ta dorëzoni, kalojeni përmes [[kontrolli i cilësisë së nëntitujve|/guides/subtitle-quality-check.html]]."
    ]
   }
  ]
 },
 "translate-english-to-chinese": {
  "seo": {
   "title": "Përkthe nëntitujt nga anglishtja në kinezisht – AI-SRTSub",
   "desc": "Përkthe nëntitujt nga anglishtja në kinezisht: ngarko SRT/VTT/ASS, zgjidh të thjeshtuar ose tradicional, dhe eksporto nëntituj vetëm në kinezisht ose dygjuhësh. – AI-SRTSub",
   "h1": "Përkthe nëntitujt nga anglishtja në kinezisht",
   "intro": "SRT anglisht brenda, nëntituj kinezisht (ose dygjuhësh anglisht-kinezisht) jashtë: ngarko, zgjidh gjuhën e synuar, eksporto — të gjitha në një faqe.",
   "ctaText": "Përkthe nëntitujt nga anglishtja"
  },
  "body": [
   {
    "h2": "Kur ju nevojitet",
    "ps": [
     "Nëntitulli që keni shkarkuar është vetëm në anglisht dhe nuk mund të arrini të kuptoni; ose dëshironi nëntituj në kinezisht për anëtarët e familjes që nuk lexojnë anglisht. Ajo që ju nevojitet vjen në një nga tri format — **nëntituj vetëm në kinezisht**, ose nëntituj dygjuhësh me **kinezisht sipër, anglisht poshtë** ose **anglisht sipër, kinezisht poshtë** — dhe ky mjet nxjerr të tria."
    ]
   },
   {
    "h2": "Si ta bëni",
    "ps": [
     "Hap [[Përkthyesin e nëntitujve me AI|/translate.html]] dhe lësho skedarin tuaj të nëntitujve në anglisht (SRT, VTT, ASS, SSA, SBV dhe TXT njihen të gjitha, ose thjesht ngjit tekstin). Lër “Gjuha burimore” në zbulim automatik, cakto “Gjuha e synuar” në kinezisht të thjeshtuar ose tradicional, dhe kliko “▶ Fillo përkthimin”. Kur të përfundojë, zgjidh një formë përmbajtjeje në panelin e eksportit djathtas: vetëm përkthim (monogjuhësh), dygjuhësh · origjinali sipër (anglisht lart, kinezisht poshtë), ose dygjuhësh · përkthimi sipër (kinezisht lart, anglisht poshtë), pastaj zgjidh një format skedari dhe shkarko."
    ],
    "img": {
     "file": "translate-export",
     "alt": "Paneli i eksportit: vetëm përkthim, dygjuhësh me origjinalin sipër, dhe dygjuhësh me përkthimin sipër",
     "cap": "Zgjidh formën e përmbajtjes në eksport: vetëm kinezisht, ose dygjuhësh me anglishten lart / kinezishten lart"
    }
   },
   {
    "h2": "Dy probleme të zakonshme",
    "ps": [
     "**Emrat e përkthyer në mënyrë jo të qëndrueshme?** AI përkthen në grupe, kështu që i njëjti emër mund të dalë në dy mënyra. Vendos çifte “burimi → emri i përkthyer” në fjalor (p.sh. `Watson → Huasheng`) për ta mbajtur atë uniform në të gjithë skedarin.",
     "**Nëntitujt që devijojnë nga pamja?** Përkthe së pari, pastaj rregullo kohën: shiriti i veglave të vijës kohore në krye të banakut të punës ka një komandë të zhvendosjes dhe shkallës globale — shih [[Nëntitujt humbasin sinkronizimin drejt fundit|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "videosub": {
  "seo": {
   "title": "Nxjerrja e nëntitujve të integruar të videos – gjurmët MKV / MP4 – AI-SRTSub",
   "desc": "Lexo drejtpërdrejt gjurmët e nëntitujve brenda MKV, WebM, MP4 dhe MOV dhe eksporto SRT / VTT / ASS / TXT. Pa ngarkim, pa transkodim, çdo gjuhë e listuar, nëntitujt me imazh të theksuar.",
   "h1": "Si të nxirrni nëntitujt e integruar në një video",
   "intro": "Lexo gjurmën e nëntitujve të mbyllur brenda një MKV / MP4 drejtpërdrejt si SRT — videoja nuk ngarkohet kurrë, gjithçka lexohet në shfletues.",
   "ctaText": "Hap nxjerrjen e nëntitujve të videos"
  },
  "body": [
   {
    "h2": "Çfarë bën ky mjet",
    "ps": [
     "Nëntitujt mund të mbyllen brenda një skedari videoje në vend që të qëndrojnë vetëm. Për t'i redaktuar, përkthyer ose çiftuar, fillimisht duhet t'i nxirrni — kjo është e vetmja gjë që bën kjo faqe."
    ]
   },
   {
    "h2": "1 Shto videon",
    "ps": [
     "Tërhiq një skedar videoje në shtyllën e parë ose kliko për të zgjedhur një. Vetëm **MKV / WebM** dhe **MP4 / MOV** njihen; kontejnerë të tjerë nuk do të japin asnjë gjurmë.",
     "Skedari nuk largohet kurrë nga kompjuteri juaj — nuk ka asnjë hap ngarkimi. Mjeti lexon në copa të vogla sipas zhvendosjes, kështu që një film me shumë gigabajt nuk e mbush memorien, por leximi i parë duhet të skanojë informacionin e gjurmës një herë."
    ],
    "img": {
     "file": "videosub-up",
     "alt": "Zona e shtimit të videos e faqes së nxjerrjes së nëntitujve të integruar",
     "cap": "MKV / WebM dhe MP4 / MOV mbështeten, dhe skedari nuk largohet kurrë nga makina juaj"
    }
   },
   {
    "h2": "2 Gjurmët e nëntitujve të integruar",
    "ps": [
     "Sapo të përfundojë leximi, shtylla e dytë liston gjurmët e nëntitujve në skedar **një për rresht**, zakonisht me një gjuhë dhe një emër gjurme (për shembull \"Kinezisht\", \"Anglisht\", \"Me detyrim\"). Kliko një rresht për të nxjerrë atë gjurmë.",
     "Kur skedari mban vetëm një gjurmë nëntitujsh, nxjerrja fillon automatikisht — nuk kërkohet asnjë klikim.",
     "**Nëntitujt me imazh nuk mund të nxirren**: Nëntitujt Blu-ray PGS dhe DVD janë fotografi të ngulitura në rrjedhë pa tekst për t'u marrë, dhe faqja e thotë këtë qartësisht; ato kërkojnë OCR."
    ],
    "img": {
     "file": "videosub-track",
     "alt": "Lista e gjurmëve të nëntitujve të integruar, një për rresht",
     "cap": "Një gjurmë për rresht; kur ka vetëm një, nxjerrja fillon automatikisht"
    }
   },
   {
    "h2": "3 Rezultati",
    "ps": [
     "\"Rezultati 3\" djathtas tregon tekstin e nëntitujve të nxjerrë, me formatin e eksportit sipër tij: **SRT / VTT / ASS / TXT**. Kliko \"Shkarko\" ose \"Kopjo\".",
     "Kur gjurma burimore është ASS, kreu i saj i stilit dhe rezolucioni kthehen të pandryshuara — eksportimi si ASS i ruan ato, ndërsa eksportimi si SRT mbart vetëm tekstin."
    ],
    "img": {
     "file": "videosub-out",
     "alt": "Zona e rezultateve me zgjedhjen e formatit SRT / VTT / ASS / TXT",
     "cap": "Katër formate eksporti; një burim ASS ruan kreun e tij të stilit dhe rezolucionin"
    }
   },
   {
    "h2": "Çfarë lihet e paprekur",
    "ps": [
     "Vetë skedari i videos nuk preket fare — vetëm lexim, pa shkrim, pa transkodim, pa remuxing.",
     "Përmbajtja e nëntitujve del siç është: pa hamendësim kodimi, pa korrigjim të vijës kohore. Nëse nëntitujt e nxjerrë janë të padeshifrueshëm, ky është një problem kodimi në gjurmën burimore — çojeni te [[Riparimi i tekstit të padeshifrueshëm|/repair.html]]."
    ]
   },
   {
    "h2": "Pyetje të zakonshme",
    "ps": [
     "**A nuk ka vërtet asnjë mënyrë për të trajtuar nëntitujt me imazh (PGS / DVD)?** Jo në këtë faqe — ato janë fotografi pa shtresë teksti. OCR duhet të vijë e para, dhe kjo faqe nuk e bën këtë.",
     "**Nëntitujt e nxjerrë kanë kohëmatje të gabuar — pse?** Kjo faqe nuk korrigjon vijat kohore; ajo që del është ajo që ishte atje. Për një zhvendosje globale ose një problem shpejtësie, përdor [[Rregullimi i vijës kohore|/shift.html]].",
     "**Pse duhet kaq shumë kohë para se të ndodhë diçka?** Një skedar i madh duhet të skanohet copë pas cope për informacionin e gjurmës, dhe sa më i madh të jetë skedari aq më shumë kohë duhet; kjo ndodh lokalisht dhe nuk ka të bëjë fare me lidhjen tuaj.",
     "**A mund ta përdor këtë faqe për skedarë të jashtëm nëntitujsh?** Nuk keni nevojë — një .srt / .ass i jashtëm shkon drejtpërdrejt te [[Konvertimi i formateve|/convert.html]] ose një mjet tjetër. Kjo faqe është për nëntituj që janë mbyllur brenda një videoje."
    ]
   },
   {
    "h2": "Privatësia",
    "ps": [
     "Videoja lexohet tërësisht në shfletues: asgjë nuk ngarkohet, asgjë nuk transkodohet, asgjë nuk kalon përmes një serveri. Mbyll faqen dhe të dhënat që u lexuan lirohen."
    ]
   },
   {
    "h2": "Mjete dhe udhëzues të ngjashëm",
    "ps": [
     "Për të përkthyer atë që nxirrni, shkoni te [[Përkthimi i nëntitujve|/translate.html]], për ta bërë atë dygjuhësh shihni [[Dy mënyra për të bërë nëntituj dygjuhësh|/guides/make-bilingual-subtitles.html]]; për ndryshimin midis gjurmëve të integruara dhe të jashtme, dhe cilat mund të nxirren, shihni [[Si të nxirrni nëntitujt nga një video|/guides/extract-subtitles-from-video.html]]."
    ]
   }
  ]
 },
 "vtt-to-srt": {
  "seo": {
   "title": "Konvertuesi VTT në SRT – Konverto nëntitujt WebVTT – AI-SRTSub",
   "desc": "Konverto nëntitujt VTT (WebVTT) në SRT për redaktues dhe luajtës që pranojnë vetëm SRT. Kreu WEBVTT dhe blloqet NOTE pastrohen automatikisht. Ekzekutohet në shfletuesin tuaj.",
   "h1": "VTT në SRT",
   "intro": "Kthe nëntitujt VTT (WebVTT) në SRT: lësho skedarin, zgjidh SRT, shkarko. Kreu dhe blloqet e shënimeve pastrohen dhe vulat kohore kthehen te shënimi me presje.",
   "ctaText": "Konverto VTT → SRT"
  },
  "body": [
   {
    "h2": "Kur ju nevojitet SRT përsëri",
    "ps": [
     "CapCut, Premiere, shumica e luajtësve të desktopit dhe mjetet më të vjetra të nëntitujve pranojnë vetëm **SRT**. Nëntitujt e shkarkuar nga uebi ose nga YouTube zakonisht vijnë si VTT — konvertojini ato në SRT për t'i importuar direkt."
    ]
   },
   {
    "h2": "Çfarë pastrohet nga VTT",
    "ps": [
     "Rreshti i kreut **WEBVTT**, blloqet NOTE, blloqet STYLE/REGION dhe cilësimet e sinjalizimeve pas rreshtit të kohës (si align:start) nuk janë tekst nëntitujsh — ato hiqen automatikisht; numerësimi restaurohet dhe ndarësi i milisekondave kthehet nga pikë në presje."
    ],
    "img": {
     "file": "convert-upload-vtt",
     "alt": "Zona e ngarkimit: një skedar VTT i ngarkuar, i zbuluar si VTT",
     "cap": "Një skedar me një kre WEBVTT zbulohet si VTT menjëherë"
    }
   },
   {
    "h2": "Si të konvertoni",
    "ps": [
     "Hap [[konvertuesin|/convert.html]], lësho VTT-në, zgjidh **SRT - SubRip** si dalje, pastaj konverto dhe shkarko. Vlerat e tekstit dhe kohës mbeten të paprekura."
    ],
    "img": {
     "file": "convert-result-srt",
     "alt": "Rezultati i konvertimit: numerësimi SRT me vula kohore me presje",
     "cap": "SRT e konvertuar: numrat e sinjalizimeve + vulat kohore me presje"
    }
   }
  ]
 }
};
