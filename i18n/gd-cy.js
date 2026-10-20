/* i18n/gd-cy.js —— 43 篇指南页的cy译文（由 _mkgd.js 生成，勿手改）
 * 源：_gd/cy.json（Gemini 翻译，_gemgd.js 产出）
 * 结构：{ <slug>: { seo:{title,desc,h1,intro,ctaText}, body:[{h2,ps[],img}] } }
 * ⚠️ server.js 自己 require 它，不被任何 html 引用 —— 部署时必须显式加进传输列表。
 */
module.exports = {
 "ass-to-srt": {
  "seo": {
   "title": "Trosi ASS i SRT – Trosi Is-deitlau ASS/SSA – AI-SRTSub",
   "desc": "Trosi is-deitlau ASS (a SSA) i SRT plaen: caiff y testun a’r amseriad eu tynnu fel y maent, ac mae’r tagiau arddull yn cael their gadael ar ôl. Ar gyfer meddalwedd sy’n derbyn SRT yn unig. Yn rhedeg yn eich porwr.",
   "h1": "Trosi ASS i SRT",
   "intro": "Trosi is-deitlau ASS (neu SSA) yn SRT: gollwng y ffeil, dewis SRT, lawrlwytho. Caiff y testun a’r amseriad eu tynnu fel y maent; nid yw tagiau arddull yn trosglwyddo.",
   "ctaText": "Trosi ASS → SRT"
  },
  "body": [
   {
    "h2": "Pan fydd angen SRT yn ôl ar frys",
    "ps": [
     "Pecynnau golygu, set-top boxes, chwaraewr teledu, pecynnau offer cyfieithu — mae digon o gamau lawr yr afon yn derbyn **SRT** yn unig. Does dim diben ar yr arddullio a’r lleoli ffansi yn ASS yno, felly SRT plaen yw’r opsiwn kaetaf."
    ]
   },
   {
    "h2": "Beth sy'n digwydd i dagiau arddull",
    "ps": [
     "Mae pob ciw ASS yn linell Ddialog (Dialogue) y mae ei thetestun yn amel yn cario tagiau diystyru fel `{\\fonts}` ar gyfer lliw, symudiad, neu effeithiau. Mae trosi i SRT **yn gollwng y tagiau hyn ynghyd â’r arddull**, gan gadw testun ac amseriad yn unig; mae toriadau llinell `\\N` yn troi’n doriadau llinell go iawn. Mae ffeiliau SSA yn ddarllenadwy hefyd."
    ],
    "img": {
     "file": "convert-result-srt",
     "alt": "Canlyniad y broses drosi: rhifo a testun SRT wedi'u tynnu o ASS",
     "cap": "Yr SRT a dynnwyd: un rhif fesul ciw, testun glân"
    }
   },
   {
    "h2": "Sut i drosi",
    "ps": [
     "Agorwch y [[converter|/convert.html]], gollwng y ffeil ASS ynddo (mae .ssa yn gweithio hefyd), dewiswch **SRT - SubRip** fel y ddyfais allbwn, yna trosi a lawrlwytho. Eisiau mynd y ffordd arall? Gweler [[SRT to ASS|/guides/srt-to-ass.html]]."
    ]
   }
  ]
 },
 "batch": {
  "seo": {
   "title": "Sut i Drosi Is-deitlau mewn Swp – Cannoedd i mewn i Un ZIP – AI-SRTSub",
   "desc": "Canllaw cam wrth gam: gollwng dwsinau o ffeiliau SRT/VTT, eu trosi i un fformat, a lawrlwytho un ZIP. Wedi'u hail-rifo, stampiau amser wedi'u normaleiddio, ffeiliau heb eu dadansoddi wedi'u nodi yn hytrach na llusgo i mewn i’r archif.",
   "h1": "Sut i drosi is-deitlau mewn swp",
   "intro": "Fel rheol, mae angen i dymor cyfan o is-deitlau orffen mewn un fformat, ac mae eu lwytho i fyny fesul un yn cymryd amser maith. Gollwng nhw i gyd yma, eu trosi gyda’i gilydd a lawrlwytho un ZIP — mae ffeiliau na ellir eu dadansoddi yn cael eu nodi, heb eu cynnwys yn dawel fel petasen nhw wedi gweithio.",
   "ctaText": "Agor trosi swp"
  },
  "body": [
   {
    "h2": "Beth mae'r offeryn hwn yn ei wneud",
    "ps": [
     "Fel arcle, mae angen i is-deitlau ar gyfer tymor cyfan neu set fodfedd fod yn unffurf cyn y gellir gwneud unrhyw beth arall gyda nhw. Dyma beth mae tudalen y swp yn ei wneud:"
    ]
   },
   {
    "h2": "Ychwanegu ffeiliau",
    "ps": [
     "Llusgwch sawl ffeil is-deitil i'r blwch dotiedig gyda'i gilydd, neu cliciwch a dewis lluosog ar unwaith. Mae'r rhestr ffeiliau yn dangos pob un: mae ffeiliau wedi'u dadansoddi yn dangos eu cyfrif ciw, ac mae'r rhai heb eu dadansoddi yn cael eu marcio'n syml fel rhai nas cydnabuwyd. Mae'r bar uchaf yn crynhoi cyfrif y ffeiliau, cyfrif y ciwiau, a faint ohonynt nas cydnabuwyd.",
     "⚠️ Mae'r dudalen hon yn darllen UTF-8 yn unig. Dylai unrhyw beth sydd â chodio wedi torri (sgrin lawn o farciau cwestiwn neu flychau) fynd drwy [[Mojibake repair|/repair.html]] yn gyntaf."
    ],
    "img": {
     "file": "batch-list",
     "alt": "Rhestr ffeiliau: enw a chyfrif ciw fesul ffeil, y rhai nas cydnabuwyd wedi'u marcio mewn coch",
     "cap": "Pob ffeil wedi'u rhestru, a'r rhai nas cydnabuwyd wedi'u nodi ar y fan a'r lle"
    }
   },
   {
    "h2": "Beth i drosi popeth iddo",
    "ps": [
     "Dewiswch y fformat targed o dan \"Convert all to\" — SRT neu VTT. Wedi hynny, caiff pob ffeil yn y rhestr ei ail-greu yn y fformat hwnnw: rhifau ciw wedi'u hail-rifo o'r brig, stampiau amser wedi'u normaleiddio i'r targed (mae SRT yn gwahanu milieiliad â choma, VTT â dot).",
     "**Caiff enwau ffeiliau gwreiddiol eu cadw a dim ond yr estyniad sy'n newid**; caiff enwau dyblyg rif wedi'i ychwanegu fel nad oes dim yn trosysgrifennu unrhyw beth."
    ],
    "img": {
     "file": "batch-up",
     "alt": "Dewisydd fformat targed a thalaith y rhestr, gyda'r bar ystadegau yn dangos cyfrif ffeiliau a chiwiau",
     "cap": "Dewiswch fformat targed ac mae pob ffeil yn ail-greu; dim ond yr estyniad sy'n newid mewn enwau ffeiliau"
    }
   },
   {
    "h2": "Pecynnu a lawrlwytho",
    "ps": [
     "Cliciwch \"Pack into one ZIP and download\" ac mae’r archif yn cynnwys pob ffeil wedi’i throsi. **Mae ffeiliau heb giwiau y gellir eu cydnabod yn aros y tu allan i’r archif** — maen nhw’n aros yn y rhestr, wedi’u nodi, yn hytrach na chael eu cymysgu fel petasen nhw wedi llwyddo. Unwaith y cânt eu pecynnu, cewch gyfrif o faint o ffeiliau sydd y tu mewn."
    ],
    "img": {
     "file": "batch-zip",
     "alt": "Ardal becynnu: botwm lawrlwytho ZIP a neges canlyniad pecynnu",
     "cap": "Mae ffeiliau nas cydnabuwyd yn aros y tu allan i’r archif ac yn aros wedi’u nodi yn y rhestr"
    }
   },
   {
    "h2": "Pam mae ffeil yn cael ei nodi fel un nas cydnabuwyd",
    "ps": [
     "Caiff ffeil ei nodi pan na ellir darllen unrhyw giwiau ohoni. Tri rheswm arferol: nid is-deitil ydy hi o gwbl (dyweder ffeil .txt readme goll), nid yw’r amgodio yn UTF-8 (felly mae’n darllen fel dim ond nodau amnewid), neu mae’r cynnwys wedi’i wastadtu i un bloc heb stampiau amser.",
     "Gellir delio â ffeiliau wedi'u nodi fesul un: mae problemau amgodio yn mynd i [[Mojibake repair|/repair.html]], a phroblemau fformat i [[Format converter|/convert.html]] ar gyfer trosi unigol cyn mynd yn ôl i’r rhestr."
    ]
   },
   {
    "h2": "Cwestiynau Cyffredin (FAQ)",
    "ps": [
     "**Faint o ffeiliau y the gallaf eu hychwanegu?** Nid oes termyn caeth; mae’n dibynnu ar gof eich porwr, ac mae ychydig gannoedd o ffeiliau SRT fel arfer yn iawn.",
     "**A yw’n newid fy niolog?** Na. Dim ond fformat y cynhwysydd y mae trosi mewn swp yn ei newid — ail-rifo ciwiau a normaleiddio stampiau amser — byth un gair o ddiolog.",
     "**Beth os oes angen i mi newid y cynnwys?** Dim ond fformatau y mae’r dudalen hon yn eu trosi. I newid amseriad ar raddfa fawr, defnyddiwch [[Timing adjustment|/shift.html]]; i newid geiriau, defnyddiwch [[Term replacement|/glossary.html]]; mae’r ddau yn gweithio ffeil fesul ffeil.",
     "**A yw ASS yn cael ei gefnogi?** Mae’r dudalen hon yn trosi rhwng SRT a VTT yn unig. Mae ASS yn cario arddullio — defnyddiwch [[Format converter|/convert.html]] arno fesul un."
    ]
   },
   {
    "h2": "Preifatrwydd",
    "ps": [
     "Mae trosi a phecynnu yn rhedeg yn gyfan gwbl yn eich porwr. Ni chanfuwyd bod unrhyw gynnwys is-deitil yn cael ei anfon at weinydd erioed."
    ]
   },
   {
    "h2": "Offer a chanllawiau cysylltiedig",
    "ps": [
     "Beth i'w newid ar gyfer tymor cyfan a pha drefn — [[Batch editing a whole season of subtitles|/guides/batch-convert-srt.html]]; mwy o fformatau ar gyfer ffeil unigol — [[Format converter|/convert.html]]; golygu a phrawfddarllen mewn taenlên — [[Subtitle ⇄ table|/table.html]]."
    ]
   }
  ]
 },
 "batch-convert-srt": {
  "seo": {
   "title": "Golygu Tymor Cyfan mewn Swp – Beth sy'n Graddio, Beth sydd ddim – AI-SRTSub",
   "desc": "Fel rheol, mae angen yr un newid ar dymor ym mhobman: fformat unffurf, gwrthbwyso amseriad, terminoleg. Dyma beth sy'n gorffen mewn un pas, beth na all, a sut i drin ffeiliau sy'n methu â dadansoddi.",
   "h1": "Golygu tymor cyfan o is-deitlau mewn swp",
   "intro": "Pan fydd angen newid dwsinau o ffeiliau is-deitil, fel rheol yr un newid yw hi bob tro. Mae gwybod pa rannau y gellir eu gwneud mewn un pas yn arbed llawer mwy o amser na gweithio drwyddynt fesul un.",
   "ctaText": "Agor trosi swp"
  },
  "body": [
   {
    "h2": "Fel rheol yr un newid yw hi ym mhobman",
    "ps": [
     "Pan fydd is-deitlau'n mynd o le ar gyfer tymor cyfan, prin y bydd gan bob pennod ei phroblem breifat ei hun — fel rheol un achos sy'n glanio ar bob pennod: yr un grŵp rhyddhau a’mpiodiodd i gyd (felly mae’r fformat a’r nodau dŵr yn cyfateb), cafodd pob un ohonynt eu trefnu yn ôl yr un fersiwn fideo (felly mae cyfeiriad a maint y gwrthbwyso'n cytuno), neu fe wnaeth trawslythreniadau grwpio ar draws y tymor.",
     "Gwiriwch ddwy bennod yn gyntaf — un gynnar, un hwyr — a chadarnhewch mai gwir yw **yr un broblem** cyn gwneud swp. Os yw’r ddwy yn anghytuno, nid yw hwn yn rhywbeth y gall swp ei drwsio."
    ]
   },
   {
    "h2": "Beth y gellir ei wneud mewn un pas",
    "ps": [
     "**Unedoli’r fformat** yw’r unig beth sy’n gorffen yn ddilys mewn un pas: llusgwch ddwsinau o ffeiliau SRT a VTT i [[Batch conversion|/batch.html]] gyda’i gilydd, dewiswch y fformat targed a lawrlwytho un ZIP. Mae ail-rifo a normaleiddio stampiau amser yn digwydd yn yr un cam hwnnw, ac nid oes un gair o ddiolog yn newid."
    ],
    "img": {
     "file": "batch-list",
     "alt": "Rhestr ffeiliau tudalen swp: cyfrif ciw fesul ffeil, y rhai nas cydnabuwyd wedi'u marcio mewn coch",
     "cap": "Fformat unffurf yw'r un peth sy'n gorffen yn wirioneddol mewn un pas sengl"
    }
   },
   {
    "h2": "Beth sydd angen ei wneud ffeil fesul ffeil",
    "ps": [
     "Nid oes gan y rhain bwynt mynediad swp ac mae angen pas fesul ffeil arnynt — er bod yna un cyfatebol fel rheol sydd **dim ond angen ei wneud unwaith ac yna'n berthnasol i'r tymor cyfan**:"
    ]
   },
   {
    "h2": "Cael y drefn yn gywir",
    "ps": [
     "Pan fydd angen gwneud sawl peth, mae trefn anghywir yn golygu ail-wneud. Ewch yn y drefn hon:",
     "**Trwsio amgodio** → **unedoli fformat** → **newid cynnwys** (nodau dŵr, terminoleg, amseriad) → **QC olaf**. Mae trosi fformatau cyn trwsio amgodio dim ond yn rhoi mojibake mewn cynhwysydd gwahanol; mae newid cynnwys cyn i fformatau gael eu hunedoli yn golygu gweithio gyda chefnogaeth offer anghyson."
    ],
    "img": {
     "file": "batch-zip",
     "alt": "Ardal becynnu: botwm lawrlwytho ZIP a neges canlyniad",
     "cap": "Unedoli fformatau yn gyntaf, newid cynnwys wedyn"
    }
   },
   {
    "h2": "Trin ffeiliau nas cydnabuwyd",
    "ps": [
     "Mae ffeiliau a nodwyd fel rhai nas cydnabuwyd mewn trosi swp yn cael eu gadael allan o’r ZIP ac yn aros yn y rhestr. Tri rheswm arferol: nid ffeil is-deitil ydy hi (ffeil readme goll), nid yw’r amgodio yn UTF-8, neu cafodd y cynnwys ei wastadtu i un bloc heb stampiau amser.",
     "Mae problemau amgodio yn mynd i [[Mojibake repair|/repair.html]] fesul un; problemau fformat i [[Format converter|/convert.html]] cyn eu rhoi yn ôl yn y rhestr. **Peidiwch â gorfodi ffeiliau nas cydnabuwyd i mewn i’r archif dim ond i gynyddu’r cyfrif** — mae darganfod pennod ar goll yn eich chwaraewr yn costio llawer mwy na’r funud y mae hyn yn ei arbed."
    ]
   },
   {
    "h2": "Offer a chanllawiau cysylltiedig",
    "ps": [
     "Y rhaglen swp lawn — [[How to batch convert subtitles|/guides/batch.html]]; gwrthbwyso amseriad unffurf — [[How to adjust subtitle timing|/guides/shift.html]]; pas olaf cyn ei ddanfon — [[Subtitle QC|/qc.html]]."
    ]
   }
  ]
 },
 "bilingual": {
  "seo": {
   "title": "Sut i Rannu neu Uno Is-deitlau Dwyieithog – AI-SRTSub",
   "desc": "Pedwar ffordd i gael gwared ar is-deitlau dwyieithog: cadw un trac yn unig, rhannu yn ddwy ffeil, neu uno yn un gofnod dwy linell. Mae’r ddau ffurf yn cael eu canfod yn awtomatig, yn eich porwr.",
   "h1": "Sut i Gael Gwared ar Is-deitlau Dwyieithog",
   "intro": "Eisiau rhannu is-deitlau dwyieithog, eu uno, neu gadw un trac yn unig? Mae’r canllaw hwn yn mynd drwy bob un o’r pedwar dull: sut mae canfod yn gweithio, pa ddull i’r dewis, a beth gewch chi ar allbwn.",
   "ctaText": "Agor y Datgysylltydd Is-deitlau Dwyieithog"
  },
  "body": [
   {
    "h2": "Beth yw Pwrpas yr Offeryn Hwn",
    "ps": [
     "Oes gennych chi is-deitlau dwyieithog ond dim ond un o’r tracau rydych chi ei eisiau — neu i’r gwrthwyneb, rydych chi eisiau rhannu neu uno’r ddau trac:"
    ]
   },
   {
    "h2": "Sut mae'n Canfod Cynnwys Dwyieithog",
    "ps": [
     "Mae is-deitlau dwyieithog dau drac yn dod mewn dwy ffurf gyffredin, ac mae’r offeryn yn cydnabod pob un — **heb ddyfalu’r iaith**: **Ffurf A (un cofnod, dwy linell)** yn rhannu tracau yn ôl system ysgrifennu — kana, hangul, hanzi, Lladin a systemau eraill, deg i gyd; mae dwy system wahanol yn golygu dwyieithog, ac mae p'un bynnag sy'n ymddangos gyntaf yn cyfrif fel y gwreiddiol. Caiff system sengl (llinell Tsieineiddio hir wedi’i lapio mewn dwy, er enghraifft) ei thrin fel uniaith a’i chadw fel y mae. **Ffurf B (dau gofnod ar wahân gydag amseriad unfath)** yn rhannu tracau yn ôl lleoliad — mae’r ddau gofnod yn yr un stamp amser yn ffurfio pâr, mae’r cyntaf yn cyfrif fel y gwreiddiol, a gellir gwahanu cyfuniadau sy’n rhannu’r wyddor Ladin, fel Saesneg-Ffrangeg neu Saesneg-Almaeneg, yn gywir hefyd. Pan na chanfyddir unrhyw gynnwys dwyieithog, mae dewisydd y modd a’r botwm Dechrau yn cael eu llwydo ynghyd â hysbysiad clir, felly ni fydd byth yn gorfodi rhannu i ganlyniadau anghywir."
    ]
   },
   {
    "h2": "Y Pedwar Modd",
    "ps": [
     "Dewiswch un o bedwar yn y gwymplen “Pa un rydych chi ei eisiau?”: mae **Cadw gwreiddiol yn unig** a **Cadw cyfieithiad yn unig** pob un yn cynhyrchu un ffeil; mae **Rhannu yn ddwy** yn cynhyrchu ffeil wreiddiol a ffeil gyfieithu, gydag enwau ffeiliau wedi’u tagio’n awtomatig `.orig` / `.dst` i atal trosysgrifiadau; mae **Uno yn un gofnod dwy linell** yn troi pob pâr yn gofnod dwyieithog — gwreiddiol ar un linell, cyfieithiad ar y llall — tra bod parau uniaith yn cael eu cadw fel y maent ac nid oes ail linell yn cael ei ddyfeisio. Pan fyddwch chi’n newid moddau neu fformatau allbwn, mae cynnwys presennol yn rhedeg eto’n awtomatig — dim angen clicio Dechrau eto."
    ],
    "img": {
     "file": "bilingual-modes",
     "alt": "Dewis modd yn y datgysylltydd dwyieithog: cadw gwreiddiol, cadw cyfieithiad, rhannu yn ddwy, uno yn un gofnod dwy linell",
     "cap": "Pedwar modd: cadw un trac, rhannu yn ddwy, neu uno yn un gofnod dwy linell"
    }
   },
   {
    "h2": "Mewnbwn ac Allbwn",
    "ps": [
     "Yn darllen saith fformat — SRT, VTT, ASS, SSA, SBV, LRC, TXT (estyniad ffeil gyntaf, sniffio cynnwys fel wrth gefn) — ac yn halltu pedwar: SRT, VTT, ASS, TXT. Mae unrhyw gyfuniad mewnbwn-allbwn yn gweithio, felly mae trosi traws-fformat yn digwydd ar hyd y ffordd. Caiff toriadau llinell ASS `\\N` eu adfer i doriadau llinell go iawn, ac mae tagiau effeithiau yn cael eu tynnu ar allbwn traws-fformat."
    ]
   },
   {
    "h2": "Canlyniadau a Allbwn",
    "ps": [
     "Dangosir y canlyniadau yn llawn mewn blwch testun darllen yn unig, pob ffeil gyda chyfrif cofnodion ac ystadegau cyfanswm hyd; mae'r botymau Lawrlwytho a Gopïo yn mynd â’r ffeil i ffwrdd yn uniongyrchol. Rhagolwg yw ardal y canlyniadau — nid oes golygu testun na cham amser yma. I wneud newidiadau, allbwn yn gyntaf, yna defnyddiwch yr offeryn cyfatebol."
    ],
    "img": {
     "file": "bilingual-result",
     "alt": "Ardal canlyniadau stripio: rhagolwg darllen yn unig, ystadegau cyfrif cofnodion, a botymau lawrlwytho/gopïo",
     "cap": "Rhagolwg testun llawn + ystadegau cyfrif a hyd + lawrlwytho a chopïo"
    }
   },
   {
    "h2": "Cwestiynau Cyffredin (FAQ)",
    "ps": [
     "**Mae gan un cofnod Saesneg ar un linell a Ffrangeg ar y llall — pam na fydd yn rhannu?** Mae Ffurf A yn rhannu tracau yn ôl system ysgrifennu, felly ni ellir gwahanu dwy iaith sy'n rhannu un system o fewn un cofnod. Ail-strwythurwch ef fel Ffurf B (dau gofnod ar yr un llinell amser) a bydd rhannu ar sail lleoliad yn gweithio.",
     "**Dim ond un ffeil yn y lawrlwythiad?** Mae “Cadw gwreiddiol yn unig”, “Cadw cyfieithiad yn unig” a “Uno yn un gofnod dwy linell” pob un yn cynhyrchu un ffeil yn ôl dyluniad; dim ond “Rhannu yn ddwy” sy’n rhoi dau i chi, wedi’u tagio `.orig` / `.dst`.",
     "**A allaf brosesu mewn swp?** Un ffeil ar y tro; ni chefnogir ciwiau.",
     "**A yw’n llwytho fy is-deitlau i fyny?** Na — mae dadansoddi ac allbwn yn rhedeg yn gyfan gwbl yn eich porwr."
    ]
   },
   {
    "h2": "Canllawiau Cysylltiedig",
    "ps": [
     "Ar gyfer y ffordd gyflym i rannu dau drac gweler [[Splitting Bilingual Subtitles into Two Tracks|/guides/split-bilingual-subtitles.html]]; ar gyfer sut y caiff is-deitlau dwyieithog eu gwneud gweler [[Two Ways to Make Bilingual Subtitles|/guides/make-bilingual-subtitles.html]]; ar gyfer cyfieithu peiriant defnyddiwch [[AI Subtitle Translation|/translate.html]]."
    ]
   }
  ]
 },
 "clean": {
  "seo": {
   "title": "Glanhawr Is-deitlau – cael gwared ar nodau dŵr, hysbysebion, SDH – AI-SRTSub",
   "desc": "Glanhawr is-deitlau: mae rheolau 13 yn tynnu nodau dŵr, hysbysebion, capsiynau SDH, tagiau HTML, dyblygu; mae gan bob newid ddiff a gellir ei ddatwneud. SRT/VTT/ASS, i gyd yn y porwr.",
   "h1": "Sut i ddefnyddio'r glanhawr is-deitlau",
   "intro": "Mae is-deitlau a lawrlwythwyd o'r we yn aml yn cario nodau dŵr, hysbysebion a chapsiynau SDH. Mae'r glanhawr yn defnyddio rheolau 13 mewn un pas, ac mae pob newid yn cael ei ddiffio a'i wrthdroi.",
   "ctaText": "Agor y glanhawr is-deitlau"
  },
  "body": [
   {
    "h2": "Beth mae'r offeryn hwn yn ei wneud",
    "ps": [
     "Mae ffeiliau is-deitil a lawrlwythwyd yn aml yn cario pethau na ddylen nhw eu cario. Mae'r glanhawr yn eu tynnu mewn un pas yn seiliedig ar reolau:"
    ]
   },
   {
    "h2": "Llwytho i fyny a chanfod",
    "ps": [
     "Llusgwch ffeil i mewn neu cliciwch i lwytho i fyny — cefnogir SRT, VTT, ASS, SSA a TXT — neu gludwch destun is-deitil yn uniongyrchol. Mae amgodio yn cael ei synhwyro’n awtomatig: os yw dadgodio UTF-8 yn cynhyrchu nodau amnewid, mae’n disgyn yn ôl i GBK neu Big5, ac mae’r dudalen yn dangos \"Encoding fixed as {encoding}\". Os byddwch chi'n llwytho is-deitlau dwyieithog dau drac (dwy linell amser unfath, un Tsieineiddio ac un Saesneg), cânt eu uno yn un trac dwyieithog gyda switsh \"gwreiddiol ar y brig / cyfieithiad ar y brig\"."
    ]
   },
   {
    "h2": "Ffurfweddu rheolau 13",
    "ps": [
     "Mae gan y rhyngwyneb bedwar grŵp gyda blychau ticio 13: **Tagiau a fformatio** (effeithiau ASS, tagiau HTML, nodau rheoli, ail-rifo ar ôl didoli), **SDH ac effeithiau sain** (capsiynau SDH, labeli siaradwyr, llinellau liryrau pur), **Nodau dŵr a chofnodion sothach** (nodau dŵr a hysbysebion, cofnodion dyblyg, cofnodion gwag), **Trwsio testun** (punctuation a gofod, trwsio priflythrennau i gyd, uno llinellau byr). Dim ond eitemau \"colled-dibris a sicr\" sydd ymlaen yn ddiofyn; mae eitemau a all ollwng cynnwys (llinellau liryrau, trwsio priflythrennau, uno llinellau byr) i ffwrdd — ticiwch nhw pan fo angen. Mae gan bob eitem domen hofran ⓘ, ac mae unrhyw newid i’r blwch ticio yn ail-redeg yn syth."
    ],
    "img": {
     "file": "clean-opts",
     "alt": "Rhyngwyneb opsiynau glanhau: pedwar grŵp o flychau ticio 13, cyfrif gweithredol yn dangos ar y brig",
     "cap": "Pedwar grŵp, rheolau 13; dim ond eitemau di-golled ymlaen yn ddiofyn, mae newidiadau'n cymryd effaith ar unwaith"
    }
   },
   {
    "h2": "Newid diff a dadwneud",
    "ps": [
     "Nid yw canlyniadau'n cael eu trosysgrifennu'n uniongyrchol: rhestrir pob newid mewn tabl diff gyda thag rheol (pam y cafodd y cofnod hwn ei olygu neu ei ddileu). Eisiau un yn ôl? Cliciwch \"Restore\" ar y rhes honno; mae \"Restore all\" yn dod â phopeth yn ôl mewn un clic, ac mae clicio arno eto yn ail-gymhwyso'r glanhau llawn. Mae'r bar ystadegau yn dangos cyfrif ar gyfer gwreiddiol / glanhau / dileu / addasu / adfer."
    ],
    "img": {
     "file": "clean-diff",
     "alt": "Tabl diff newid: mynegai, amser, testun gwreiddiol yn erbyn testun glân, tag rheol ar bob rhes",
     "cap": "Mae pob newid yn cario tag rheol; adfer rhes sengl neu bob un ar unwaith"
    }
   },
   {
    "h2": "Rhagolwg ac allbwn",
    "ps": [
     "Togl rhwng golygfeydd \"Glanhau / Gwreiddiol\". Yn y olygfa wreiddiol, mae cofnodion a ddilëwyd wedi'u croesi allan a'u marcio \"Deleted\", ac mae’r ffeil a allbynnwyd yn cyd-fynd â’r rhagolwg yn union. Fformatau allbwn: SRT (diofyn), VTT, ASS (ar gael pan fo’r ffynhonnell yn ASS, gyda’r adran arddull wedi’i chadw fel y mae), a TXT testun plaen heb linellau amser. Mae'r enw ffeil yn cael marc `.clean` yn awtomatig."
    ],
    "img": {
     "file": "clean-preview",
     "alt": "Rhagolwg testun llawn: golygfeydd glân a gwreiddiol gyda bar ystadegau yn dangos cyfrif",
     "cap": "Dwy olygfa ragolwg, beth rydych chi'n ei weld yw beth rydych chi'n ei gael"
    }
   },
   {
    "h2": "Cwestiynau Cyffredin (FAQ)",
    "ps": [
     "**A fydd yn dileu deialog arferol trwy gamgymeriad?** Mae rheol y nod dŵr yn gyntaf yn tynnu llinellau nod dŵr (gan gadw llinellau deialog o fewn cofnodion dwyieithog) ac yn dim ond dileu’r cofnod cyfan os oes olion yn aros; mae tynnu SDH ddim ond yn cyffwrdd â chynnwys mewn cromfachau gyda geiriau allweddol SDH sy’n 40 nod neu lai — mae deialog rhwng cromfachau arferol yn aros.",
     "**Sut mae llinellau liryrau pur yn cael eu gwahanu oddi wrth liryrau o fewn deialog?** Dim ond cofnodion lle mae pob llinell sengl wedi’i lapio mewn nodau cerddoriaeth ♪ neu farciau fel [music] sy’n cael eu dileu; caiff deialog sy’n cynnwys liryrau ei chadw.",
     "**A allai labeli siaradwyr daro testun Tsieineiddio?** Dim ond enw alffaniwmerig priflythrennau i gyd ar ddechrau llinell a ddilynir gan golyn (fel `GEORGE:`) sy'n cyfateb; byth y bydd brawddegau colon Tsieineiddio yn gwneud hynny.",
     "**A allaf lanhau sawl ffeil ar unwaith?** Na — un ffeil fesul rhediad. Lawrlwythwch y canlyniad, yna lwythwch y nesaf i fyny."
    ]
   },
   {
    "h2": "Preifatrwydd",
    "ps": [
     "Mae glanhau yn rhedeg yn gyfan gwbl yn eich porwr; ni chanfuwyd bod unrhyw gynnwys is-deitil yn cael ei anfon at weinydd erioed."
    ]
   },
   {
    "h2": "Offer a chanllawiau cysylltiedig",
    "ps": [
     "Ar gyfer canllaw byr sy'n canolbwyntio ar dynnu nodau dŵr a hysbysebion, gweler [[remove subtitle ads and watermarks|/guides/remove-subtitle-ads.html]]; rhedeg eich ffeil trwy’r [[subtitle quality check|/guides/subtitle-quality-check.html]] cyn ei drosglwyddo; i newid fformatau defnyddiwch [[format conversion|/convert.html]]."
    ]
   }
  ]
 },
 "convert": {
  "seo": {
   "title": "Sut i Trosi Fformatau Is-deitlau (SRT, VTT, ASS, SBV, LRC, TXT) – AI-SRTSub",
   "desc": "Canllaw darluniadol i'r trosi: gollwng ffeil, gwirio'r fformat a ganfuwyd, dewis y fformat allbwn, trin testun dwyieithog, a lawrlwytho. Mae popeth yn rhedeg yn eich porwr.",
   "h1": "Canllaw Trosi Fformat Is-deitlau",
   "intro": "Mae'r canllaw hwn yn mynd trwy'r dudalen o'r brig i'r gwaelod: llwytho is-deitil, cadarnhau'r fformat a ganfuwyd, dewis y fformat allbwn, a lawrlwytho. Mae popeth yn rhedeg yn eich porwr — does dim ffeil byth yn gadael eich dyfais.",
   "ctaText": "Agor y trosi is-deitlau"
  },
  "body": [
   {
    "h2": "Llwytho eich is-deitlau",
    "ps": [
     "Llusgwch ffeil i'r blwch dotiedig neu cliciwch i ddewis un; gallwch hefyd **gludo'r cynnwys** yn uniongyrchol i'r blwch testun. Mae'r fformat yn cael ei ganfod o'r estyniad a'r cynnwys, ac mae'r canlyniad yn dangos yn y tag fformat."
    ],
    "img": {
     "file": "convert-upload",
     "alt": "Ardal lwytho i fyny: SRT sampl wedi'i lwytho, wedi'i ganfod fel SRT",
     "cap": "Mae'r fformat a ganfuwyd yn dangos yn y tag — gwiriwch yma yn gyntaf os oes gennych amheuaeth"
    }
   },
   {
    "h2": "Dewis y fformat allbwn",
    "ps": [
     "Dewiswch y fformat targed o'r gwymplen: chwe opsiwn — srt, vtt, ass, sbv, lrc, txt. Mae trosi i ass yn ailadeiladu arddull diofyn sefydlog 1920×1080 (testun gwyn, amlinelliad du, gwaelod canol) ac **nid yw’n cadw’r ffontiau na’r lliwiau gwreiddiol**; mae txt yn halltu testun yn unig, heb amseriad."
    ],
    "img": {
     "file": "convert-opt",
     "alt": "Gwymplen fformat allbwn gyda VTT wedi'i ddewis",
     "cap": "Nid yw'r fformat allbwn yn dilyn y mewnbwn — rydych chi'n ei ddewis"
    }
   },
   {
    "h2": "Trin testun dwyieithog",
    "ps": [
     "Os yw'r ffeil yn dwyieithog (dwy linell mewn un ciw, neu giwiau rhyng-gysylltiedig), cedwir y gosodiad fel y mae wrth drosi. Mae dewis \"keep bilingual\" yn rhannu'r ddwy iaith yn linellau uchaf ac isaf, pob un wedi'i lapio o'r newydd ar ei ben ei hun; mae'r rheolydd wedi'i analluogi pan na chanfyddir testun dwyieithog."
    ]
   },
   {
    "h2": "Trosi a lawrlwytho",
    "ps": [
     "Cliciwch \"Convert\": mae panel y canlyniad yn dangos cyfrif y ciwiau a chyfanswm yr hyd, gyda'r testun yn barod i'w archwilio. Cliciwch **Download** i gadw'r ffeil, neu **Copy** i gymryd y testun yn uniongyrchol. Nid yw trosi byth yn newid unrhyw werthoedd amseriad — dim ond ailsgrifennu'r fformat y mae. I ail-amseru ciwiau, defnyddiwch yr [[timing tool|/shift.html]]."
    ],
    "img": {
     "file": "convert-result",
     "alt": "Panel canlyniad: cyfrif ciw a chyfanswm hyd gyda botymau lawrlwytho a chopïo",
     "cap": "6 ciwiau, 0:23 cyfanswm — sganio'r testun cyn lawrlwytho"
    }
   }
  ]
 },
 "extract": {
  "seo": {
   "title": "Tynnu Testun Plaen o Is-deitlau – Dau gynllun, pum glanhau – AI-SRTSub",
   "desc": "Tynnu deialog o is-deitlau fel testun plaen glân: paragraffau parhaus neu un linell fesul ciw, a beth mae'r pum switsh ar gyfer ciwiau SDH, nodau dŵr, dyblygu, blaen-ddodiaid a liryrau yn eu tynnu.",
   "h1": "Sut i tynnu testun plaen o is-deitlau",
   "intro": "Tynnu'r deialog allan o ffeil is-deitil fel testun plaen glân: mae rhifau ciwiau, llinellau amser a tagiau arddull yn cael eu tynnu'n awtomatig, felly mae'r canlyniad yn darllen fel erthygl neu'n gweithio fel rhestr ddeialog.",
   "ctaText": "Agor y tynnwr testun plaen"
  },
  "body": [
   {
    "h2": "Beth mae'r offeryn hwn yn ei wneud",
    "ps": [
     "Dim ond y deialog mewn ffeil is-deitil sy'n bwysig i ddarllennydd; strwythur ar gyfer chwaraewr yw'r gweddill — rhifau ciwiau, llinellau amser, tagiau arddull. Mae'r dudalen hon yn tynnu'r strwythur ac yn cadw'r geiriau."
    ]
   },
   {
    "h2": "Ei ollwng ynddo, nid dim ond llwytho i fyny",
    "ps": [
     "Mae colofn \"1 Add subtitles\" ar y chwith yn derbyn ffeil a lwythwyd i fyny, a gallwch hefyd ludo cynnwys is-deitil yn uniongyrchol i'r blwch testun. Os gwnaethoch chi ddewis y ffeil anghywir, cliciwch \"Clear\" a dechrau eto.",
     "Mae'r dudalen hon yn darllen ffeiliau fel UTF-8. Os yw'r is-deitlau'n agor fel wal o farciau cwestiwn neu flychau, mae'r amgodio wedi torri — trosi i UTF-8 yn [[Garbled text repair|/repair.html]] yn gyntaf, yna dewch yn ôl."
    ],
    "img": {
     "file": "extract-up",
     "alt": "Ardal ychwanegu is-deitlau y tynnwr testun plaen",
     "cap": "Llwytho ffeil i fyny, neu ludo cynnwys is-deitil yn uniongyrchol i'r blwch testun"
    }
   },
   {
    "h2": "Dewis rhwng y dau gynllun",
    "ps": [
     "Ar frig \"2 Extraction options\" mae'r cynllun: mae **Continuous paragraphs** yn torri testun wrth seibiau a phunctuation diwedd brawddeg fel ei fod yn darllen fel erthygl; mae **One line per cue** yn rhoi un linell fesul cofnod is-deitil, gan gyd-fynd â chofnodion y ffeil wreiddiol un wrth un.",
     "Mae copïo deialog ar gyfer nodiadau, ymarfer cyfieithu neu ei ddarllen fel rhyddiaith yn galw am baragraffau parhaus; mae adeiladu taflen ddeialog, cymharu llinell wrth linell gyda'r gwreiddiol neu fwydo offeryn arall yn galw am un linell fesul ciw."
    ],
    "img": {
     "file": "extract-opt",
     "alt": "Y cynllun a'r switshis glanhau o dan yr opsiynau tynnu",
     "cap": "Dewiswch un cynllun; mae'r pum switsh isod yn penderfynu pa fath o gynnwys sy'n cael ei dynnu"
    }
   },
   {
    "h2": "Beth mae pob un o'r pum glanhau yn ei dynnu",
    "ps": [
     "**Remove SDH cues**: yn dileu disgrifiadau sain mewn cromfachau megis \"(footsteps)\" neu \"[music]\" ac yn cadw'r deialog.",
     "**Remove watermarks and ads**: yn gollwng llinellau fel credydau fansub, URLs a dolenni sianel.",
     "**Remove duplicate neighbours**: pan fydd yr un frawddeg yn ymddangos ddwywaith yn olynol (nam chwarae) dim ond un copi sy'n cael fynnu; mae dyblygu ymhellach i ffwrdd yn cario ystyr ac yn cael eu gadael ar ben eu hunain.",
     "**Remove speaker prefixes**: mae \"JOHN: Hello\" yn troi'n \"Hello\". I ffwrdd yn ddiofyn — mae angen i destun ar ffurf sgript ddangos pwy sy'n siarad.",
     "**Skip lyric lines**: mae llinellau sy'n gyfan gwbl yn \"♪ … ♪\" yn cael eu hepgor. I ffwrdd yn ddiofyn — geiriau yw liryrau hefyd."
    ],
    "img": {
     "file": "extract-clean",
     "alt": "Y pum switsh glanhau a' kanilang ddisgrifiadau o dan yr opsiynau tynnu",
     "cap": "Mae pob switsh yn dweud beth mae'n ei dynnu ar ei dde; ticiwch y rhai sydd eu hangen arnoch"
    }
   },
   {
    "h2": "Cymryd y canlyniad i ffwrdd",
    "ps": [
     "Mae colofn \"3 Result\" ar y dde yn dangos y testun a dynnwyd yn fyw ac yn ailgyfrifo cyn gynted ag y byddwch chi'n newid opsiwn.",
     "Pan fyddwch chi'n hapus, cliciwch \"Download\" i gadw .txt neu \"Copy\" i gymryd y testun gyda chi. Ar gyfer iethoedd nad ydynt yn gwahanu geiriau â gofodau, megis Tsieineiddio a Japaneaidd, mae uno llinellau yn dilyn rheolau gwahanol, ac mae'r offeryn yn trin hynny fesul iaith yn awtomatig."
    ],
    "img": {
     "file": "extract-out",
     "alt": "Ardal y canlyniad gyda'r botymau lawrlwytho a chopïo",
     "cap": "Mae'r canlyniad yn diweddaru'n fyw; ei lawrlwytho fel txt neu ei gopïo'n uniongyrchol"
    }
   },
   {
    "h2": "Beth sy'n cael ei adael heb ei gyffwrdd",
    "ps": [
     "Nid yw'r deialog ei hun yn cael ei ailsgrifennu. Dim ond penderfynu pa linellau cyfan neu flociau sy'n cael eu gollwng y mae'r switshis glanhau; byth yn newid geiriad cofnod.",
     "Nid yw llinellau amser a rhifau ciwiau yn cael eu hallbwn, nid ydynt yn cael eu newid ac yna'n cael eu hallbwn — mae'r ffeil wreiddiol heb ei chyffwrdd, ac nid yw'r dudalen hon yn cynnig allbwn gyda llinellau amser. Perchnog hynny yw [[Format conversion|/convert.html]]."
    ]
   },
   {
    "h2": "Cwestiynau cyffredin",
    "ps": [
     "**A yw tagiau arddull ASS yn aros yn y testun?** Na. Mae blociau diystyru ASS `{}` yn cael eu tynnu a dim ond y deialog sy'n aros.",
     "**A yw ffeil dwyieithog yn dod allan fel dwy linell neu un?** Cyn gymaint o linellau ag a oedd gan y cofnod; nid yw'r dudalen hon yn uno nac yn eu rhannu — i'n gwahanu defnyddiwch [[Bilingual split|/bilingual.html]].",
     "**Pam mae blaen-ddodiaid siaradwyr yn cael eu cadw yn ddiofyn?** Mae'r enw yn \"JOHN: Hello\" yn aml yn ddefnyddiol gwybodaeth (sgriptiau, taflenni deialog), ac mae ei dynnu yn ei gwneud hi'n anodd dweud pwy sy'n siarad, felly caiff y dewis ei adael i chi.",
     "**A ellir tynnu ffeiliau liryrau LRC hefyd?** Ie. Mae tagiau amser LRC yn cael eu tynnu ac mae'r llinellau liryrau yn aros; os nad ydych chi eisiau liryrau, ticiwch \"Skip lyric lines\"."
    ]
   },
   {
    "h2": "Preifatrwydd",
    "ps": [
     "Mae is-deitlau'n cael eu prosesu'n gyfan gwbl yn y porwr: dim yn cael ei lwytho i fyny a dim yn mynd trwy weinydd. Mae'r testun yn aros ar y dudalen gyfredol yn unig ac yn cael ei glirio ar adnewyddu."
    ]
   },
   {
    "h2": "Offer a chanllawiau cysylltiedig",
    "ps": [
     "I ddeall beth mae ffeil is-deitil yn ei gynnwys mewn gwirionedd gweler [[What is inside an SRT file|/guides/srt-file-format.html]]; i gyfieithu'r deialog a dynnwyd ewch i [[Subtitle translation|/translate.html]]; i' તેને droi'n daenlên defnyddiwch [[Subtitles to Excel/CSV|/guides/srt-to-excel.html]]; a rhedwch [[Subtitle QC|/qc.html]] cyn trosysgrifennu unrhyw beth."
    ]
   }
  ]
 },
 "extract-subtitles-from-video": {
  "seo": {
   "title": "Cael is-deitlau allan o fideo – Wedi'u mewnwneud yn erbyn allanol – AI-SRTSub",
   "desc": "Beth mae MKV / WebM / MP4 / MOV yn ei gario, sut mae testun, ASS, WebVTT a thraciau mov_text yn gwahanu, pam nad oes gan is-deitlau delwedd (PGS / DVD) unrhyw destun, a beth i'w wneud ar ôl tynnu.",
   "h1": "Cael is-deitlau allan o fideo",
   "intro": "Gall is-deitlau fyw y tu mewn i ffeil fideo neu sefyll ar ben eu hunain y tu allan iddi. Y tu mewn, trac yn y cynhwysydd ydyn nhw — does gan dynnu nhw ddim i'w wneud â thraws-godi.",
   "ctaText": "Agor tynnu is-deitlau fideo"
  },
  "body": [
   {
    "h2": "Ble mae is-deitlau'n byw: wedi'u mewnwneud a rhai allanol",
    "ps": [
     "Mae ffeil fideo (MKV, MP4) yn gynhwysydd sy'n dal trac fideo, trac sain a thraciau is-deitil ar yr un pryd. Mae is-deitlau wedi'u selio y tu mewn **wedi'u mewnwneud**; mae ffeil .srt / .ass ar wahân yn eistedd y tu allan **yn allanol**, a gelwir trac mewnwneud hefyd yn **muxed in**.",
     "Gellir defnyddio is-deitlau allanol fel y maent. Y broblem yw'r rhai mewnwneud: i'ם golygu, eu cyfieithu neu adeiladu trac dwyieithog o'r gwreiddiol, does gennych chi ddim ffeil is-deitil wrth law — mae'n rhaid i chi ddarllen y trac allan o'r cynhwysydd yn gyntaf. Nid yw'r cam hwn yn draz-godi: nid yw'r fideo'n cael ei ail-amgodi, dim ond y data sydd eisoes wedi'i storio yn y cynhwysydd sy'n cael ei ddarllen."
    ]
   },
   {
    "h2": "Pa gynhwysydd sy'n cario beth",
    "ps": [
     "Mae gwahanol gynhwysyddion yn dal gwahanol fformatau is-deitil, ac mae anhawster tynnu hefyd yn wahanol:"
    ],
    "img": {
     "file": "videosub-which",
     "alt": "Y traciau is-deitil a restrir gan y dudalen tynnu is-deitil mewnwneud",
     "cap": "Un trac fesul rhes, fel arfer gydag iaith ac enw trac; pan fydd dim ond un mae'n cael ei dynnu'n awtomatig"
    }
   },
   {
    "h2": "Pam na ellir tynnu is-deitlau delwedd",
    "ps": [
     "Nid yw is-deitlau Blu-ray PGS a DVD yn storio unrhyw nodau o gwbl, dim ond cyfres o ddelweddau gyda sianel alffa. Pan fydd chwaraewr yn eu dangos mae'n gludo llun, nid yn rendro testun.",
     "Felly does dim testun mewn trac o'r fath i'w ddarllen — nid nad yw'r offeryn yn ei gefnogi, ond nad oes unrhyw nodau yno. Mae'r dudalen yn dweud yn glir pan fydd yn rhedeg i mewn i un.",
     "Yr unig ffordd i gael geiriau yw adnabod y nodau yn y delweddau hynny yn gyntaf (OCR) ac adeiladu is-deitlau o hwnnw. Proses ar wahân yw hon oddi wrth dynnu trac allan."
    ]
   },
   {
    "h2": "Beth sy'n dod ar ôl tynnu fel arfer",
    "ps": [
     "Yr hyn sy'n dod allan yw'r trac fel yr oedd: nid yw'r offeryn yn dyfalu amgodio ac nid yw'n cywiro llinellau amser. Felly mae dau beth yn codi'n amel:",
     "Un yw **testun wedi'u cam-amgodi** — problem amgodio yn y trac ffynhonnell sy'n dod allan wedi'i gam-amgodi beth bynnag; ewch i [[How to repair garbled text|/guides/repair.html]] i nodi'r amgodio. Y llall yw **amseriad anghywir** — p'un a oes gan y ffynhonnell logo intro, neu nad yw'r cyfraddau ffrâm yn cyd-fynd, mae'r canlyniad wedi'i wrthbwyso fel cyfanrwydd; defnyddiwch [[Timeline adjustment|/shift.html]] i wrthbwyso neu raddio.",
     "Ar ôl hynny, i gyfieithu ewch i [[Subtitle translation|/translate.html]], ac i'w wneud yn dwyieithog gweler [[Two ways to make bilingual subtitles|/guides/make-bilingual-subtitles.html]]."
    ],
    "img": {
     "file": "videosub-formats",
     "alt": "Ardal y canlyniad gyda'r fformatau allbwn SRT / VTT / ASS / TXT",
     "cap": "Gellir allbwn is-deitlau a dynnwyd mewn pedwar fformat; mae ffynhonnell ASS yn cadw ei bennawd arddull a'i benderfyniad"
    }
   },
   {
    "h2": "Ychydig o bethau hawdd i'w cael yn anghywir",
    "ps": [
     "**Nid yw tynnu is-deitlau yn eu llosgi i mewn.** Nid yw'r fideo'n cael ei ail-amgodi, felly nid yw ansawdd y ddelwedd na'r sain yn cael eu heffeithio.",
     "**Nid yw tynnu yn effeithio ar y ffeil wreiddiol.** Darllen yn unig, byth wedi'i hysgrifennu, ac nid oes un beit o'r fideo'n newid.",
     "**Nid yw ffeil fawr sy'n araf yn broblem cysylltiad.** Mae'r offeryn yn sganio gwybodaeth trac fesul bloc, a mwyaf y ffeil hwy y mae'n cymryd; mae popeth yn digwydd yn lleol.",
     "**Nid oes angen y dudalen hon ar is-deitlau allanol.** Os oes gennych .srt / .ass, ewch yn syth i [[Format conversion|/convert.html]]; dim ond is-deitlau sydd wedi'u selio y tu mewn i fideo sydd angen eu tynnu yn gyntaf."
    ]
   },
   {
    "h2": "Offer a chanllawiau cysylltiedig",
    "ps": [
     "Ar gyfer y rhaglen lawn gweler [[How to extract subtitles embedded in a video|/guides/videosub.html]]; i gyfieithu'r hyn rydych chi'n ei dynnu ewch i [[Subtitle translation|/translate.html]], i'w wneud yn dwyieithog gweler [[Two ways to make bilingual subtitles|/guides/make-bilingual-subtitles.html]]; ar gyfer testun wedi'i gam-amgodi dechreuwch gyda [[Garbled text repair|/repair.html]]."
    ]
   }
  ]
 },
 "fps-23-976-vs-25": {
  "seo": {
   "title": "Beth mae 23.976 / 24 / 25 / 30 fps yn ei olygu mewn gwirionedd – Amseriad Is-deitlau – AI-SRTSub",
   "desc": "Nid yw 23.976 yn 24 ac nid yw 29.97 yn 30 — mae'r 0.1% coll yn dod o liw NTSC, tra bod PAL yn rhedeg ffilmiau 4% yn gyflym. Sut mae'r rhain yn symud amseriad eich is-deitil, a sut i trosi rhyyntynt.",
   "h1": "Beth mae 23.976 / 24 / 25 / 30 fps yn ei olygu mewn gwirionedd",
   "intro": "Mae'r bwlch 0.1% rhwng 23.976 a 24 yn weddill o hanes teledu. Ynghyd â PAL 4%, dyma'r rheswm pam mae is-deitlau'n drifto ymhellach allan o gydamseriad wrth i ffilm fynd ymlaen.",
   "ctaText": "Agor addasu amseriad"
  },
  "body": [
   {
    "h2": "Beth yw pob rhif",
    "ps": [
     "Cyfradd ffrâm yw sawl llun sy'n cael eu dangos mewn un eiliad. Y pedwar rydych chi'n cwrdd â nhw fwyaf aml:"
    ]
   },
   {
    "h2": "Lle mae'r 0.1% yn dod o",
    "ps": [
     "23.976 = 24 × 1000/1001, ac 29.97 = 30 × 1000/1001. Mae'r 1000/1001 hwnnw'n weddill o ychwanegu lliw at NTSC: i wasgu'r is-gario lliw i mewn heb dorri derbynwyr du-a-gwyn presennol, cafodd y gyfradd maes ei gollwng o 60 Hz i 59.94 Hz (60 × 1000/1001), a gostyngodd y gyfradd ffrâm gydag ef.",
     "Y canlyniad: mae ffilmiau'n ymddangos ar 23.976 mewn rhanbarthau NTSC yn lle 24. Y gwahaniaeth yw 0.1%, neu 3.6 eiliad dros awr — prin yn weladwy ar ei ben ei hun, ond peidiwch â'i gymysgu â'r 4% isod a pheidiwch byth â chyfuno'r ddau mewn un cyfrifiad."
    ]
   },
   {
    "h2": "Lle mae'r 4% yn dod o",
    "ps": [
     "Mae sgriniau rhanbarth PAL yn rhedeg ar 25 ffrâm yr eiliad. Mae ffilmiau'n cael their saethu ar 24 ffrâm yr eiliad ac yn cael eu chwarae yn syml ar 25 — heb ychwanegu na thynnu un ffrâm, felly mae'r chwarae yn rhedeg 4% yn gyflymach (25/24 ≈ 1.0417). Mae ffilm 100 munud yn rhedeg am 96 munud yn ei fersiwn PAL.",
     "Dyna wraidd **drifft blaengar**: mae is-deitlau a wnaed yn erbyn y gwreiddiol a fideo yn y fersiwn PAL yn cyfateb yn union yn y dechrau ac yn bedwar munud ar wahân erbyn y credydau. Ni gall unrhyw symudiad byd-eang achub hwnny; mae'n rhaid ei raddio yn ôl cymhareb."
    ],
    "img": {
     "file": "shift-step-rate",
     "alt": "Adran cyflymder tudalen amseriad: y blwch mewnbwn cymhareb",
     "cap": "Graddio yn ôl cymhareb — un werth yn cwmpasu'r ffilm gyfan"
    }
   },
   {
    "h2": "Sut i trosi",
    "ps": [
     "Mae trosi yn golygu lluosi â chymhareb sengl sy'n berthnasol ar draws y ffilm gyfan:"
    ]
   },
   {
    "h2": "Dweud pa un sydd gennych chi",
    "ps": [
     "Yn hytrach na dyfalu'r gymhareb, dewch o hyd i ddau foment y mae eu amseriad cywir yn sicr gennych — fel rheol llinell gyntaf ac olaf y deialog — a dywedwch wrth yr offeryn \"dylai'r llinell hon fod ar 00:00:12 a honno ar 01:35:40\"; mae'n hymestyn y ffilm gyfan yn llinol rhwng y ddau bwynt hynny. Dyna \"angori dau bwynt\", ac nid oes angen rhifyddiaeth cyfradd ffrâm gennych.",
     "I gadarnhau'r gyfradd ffrâm eich hun, gwiriwch eich chwaraewr neu offeryn gwybodaeth cyfryngau. Pan nad oes gan enw ffeil fel `1080p.WEB` unrhyw awgrym cyfradd ffrâm, angori dau bwynt yw'r llwybr kaetaf."
    ],
    "img": {
     "file": "shift-step-two",
     "alt": "Adran angor dau bwynt tudalen amseriad: dwy res o fewnbwn stampiau amser",
     "cap": "Nid oes angen cyfradd ffrâm ar angori dau bwynt — dim ond dau stamp amser"
    }
   },
   {
    "h2": "Offer a chanllawiau cysylltiedig",
    "ps": [
     "Trosi cyfradd ffrâm ei hun — [[Subtitle frame rate conversion|/guides/srt-fps-converter.html]]; addasu cyflymder — [[Subtitle speed conversion|/guides/subtitle-speed-converter.html]]; ansicr p'un a yw'n wrthbwyso byd-eang neu ddrifft blaengar — [[Subtitles drifting further out of sync|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "glossary": {
  "seo": {
   "title": "Amnewid termau mewn swp mewn is-deitlau – Un tabl yn trwsio ffeil – AI-SRTSub",
   "desc": "Un rheol fesul llinell, wedi'u gwahanu gan -> , => , → neu Tab, gyda # ar gyfer sylwadau. Cyfateb geiriau llawn, sensitifrwydd achos, llinell gyntaf neu ail o giw dwyieithog, pob newid wedi'i restru a gellir ei wrthdroi.",
   "h1": "Sut i amnewid termau mewn swp mewn is-deitlau",
   "intro": "Mae un tabl termau yn gwneud geiriad ffeil is-deitil gyfan yn gyson ar un ymgyrch — nid yw llinellau amser, arddulliau ASS a blociau VTT NOTE yn cael eu cyffru gan un nod sengl.",
   "ctaText": "Agor amnewid termau mewn swp"
  },
  "body": [
   {
    "h2": "Beth mae'r offeryn hwn yn ei wneud",
    "ps": [
     "Yr un gair wedi'i gyfieithu mewn dwy ffordd wahanol, enwau a lleoedd yn drifto gyda chyfieithu peiriant, is-deitlau rhywun arall sydd angen cyd-fynd â' നിങ്ങളുടെ confensiynau eich hun: mae'r rhain i gyd yn rhannu un nodwedd: yr hyn sy'n newid yw gair, nid y strwythur. Mae'r dudalen hon yn newid geiriau yn unig."
    ]
   },
   {
    "h2": "Dau fewnbwn: is-deitlau a thabl termau",
    "ps": [
     "Mae colofn \"1 Add subtitles\" ar y chwith yn cymryd ffeil is-deitil, neu gallwch ludo'r cynnwys yn uniongyrchol; os gwnaethoch chi ddewis y ffeil anghywir, cliciwch \"Clear\".",
     "Mae colofn \"2 Term table\" ar y dde yn dal y rheolau. **Un rheol fesul llinell**, gyda'r term hen a'r term newydd wedi'u gwahanu gan `->` , `=>` , `→` neu Tab — mae pob un o'r pedwar yn gweithio. Mae llinellau sy'n dechrau gyda `#` yn sylwadau ac nid ydynt yn cymryd rhan mewn amnewid.",
     "Os ydych chi'n ansicr am y fformat, cliciwch \"Fill in an example\" a golygu hwnnw."
    ],
    "img": {
     "file": "glossary-up",
     "alt": "Ardal ychwanegu is-deitlau a mewnbwn tabl termau y dudalen amnewid termau",
     "cap": "Is-deitlau ar y chwith, rheolau ar y dde; un rheol fesul llinell, hen term a therm newydd wedi'u gwahanu gan ->"
    }
   },
   {
    "h2": "Sut i ysgrifennu'r tabl termau",
    "ps": [
     "Un rheol fesul llinell: y term cyfredol ar y chwith, yr hyn y dylai fod yn ddefnyddiol ar y dde. Er enghraifft mae `Thor -> Donar` yn amnewid pob \"Thor\" yn y ffeil gyda \"Donar\".",
     "Mae sylwadau'n dechrau gyda `#` ac maent yn ddefnyddiol ar gyfer labelu grŵp o reolau (er enghraifft \"# season 1 name fixes\"), ac ar gyfer diffodd rheol dros dro — rhowch `#` o flaen yn hytrach na'i ddileu.",
     "Mae rheolau'n rhedeg o'r brig i'r gwaelod; mae testun a gynhyrchir gan un rheol yn cael ei sganio eto gan y rheolau isod iddo. Pan fo trefn yn bwysig (dyweder, amnewid A gyda B yn gyntaf ac yna B gyda C), cadwch hynny mewn cof."
    ],
    "img": {
     "file": "glossary-table",
     "alt": "Llinell ar ôl llinell o reolau amnewid ym mewnbwn y tabl termau",
     "cap": "Un rheol fesul llinell; mae llinellau sy'n dechrau gyda # yn sylwadau a gellir diffodd rheol dros dro"
    }
   },
   {
    "h2": "Beth mae'r tri switsh yn ei wneud",
    "ps": [
     "**Scope**: `all` / `first line only` / `second line only`. Mewn ffeil dwyieithog, dewiswch \"second line only\" pan fyddwch chi eisiau newid y cyfieithiad yn unig; mae cofnodion sydd ond â un linell yn aros heb eu cyffru o dan unrhyw leoliad llinell-sengl — nid yw'r offeryn yn dyfalu pa ochr yw'r gwreiddiol.",
     "**Whole word**: yn amnewid dim ond termau sy'n sefyll ar ben eu hunain fel gair, felly ni fydd `art` yn cyffwrdd â `start`. Ar gyfer iethoedd nad ydynt yn gwahanu geiriau â gofodau, megis Tsieineiddio a Japaneaidd, does gan y switsh hwn ddim effaith — mae amnewid yn gweithio ar is-linynnau yno.",
     "**Case sensitive**: i ffwrdd yn ddiofyn, felly mae `CEO` a `ceo` ill dau yn cael eu hamsyniad; pan fydd wedi'i dicio, dim ond yr un sillafu union sy'n cael ei amnewid."
    ],
    "img": {
     "file": "glossary-opt",
     "alt": "Y switshis cwmpas, gair llawn a sensitif i achos o dan y tabl termau",
     "cap": "Mae cwmpas yn penderfynu pa linell sy'n newid; mae gair llawn ac achos yn penderfynu pa mor gaeth y mae term yn cyd-fynd"
    }
   },
   {
    "h2": "Pob newid wedi'i restru, pob newid gellir ei wrthdroi",
    "ps": [
     "Mae \"3 Result\" yn dangos yr is-deitlau a amnewidiwyd ac hefyd **yn rhestru pob newid**: pa giw, pa linell, o beth i beth.",
     "Os nad ydych chi eisiau un ohonynt, cliciwch arno yn y rhestr i ddatwneud y cofnod hwnnw yn unig — dim angen golygu'r tabl termau ac ail-redeg. Pan fyddwch chi'n hapus, cliciwch \"Download\" neu \"Copy\"."
    ],
    "img": {
     "file": "glossary-out",
     "alt": "Ardal y canlyniad gyda rhestr o newidiadau unigol",
     "cap": "Mae pob newid wedi'i restru; cliciwch un nad ydych chi eisiau i'w ddatwneud"
    }
   },
   {
    "h2": "Beth sy'n cael ei adael heb ei gyffwrdd",
    "ps": [
     "**Nid yw llinellau amser, llinellau arddull ASS a blociau VTT `NOTE` yn cael eu cyffru gan un nod sengl.** Mae amnewid yn berthnasol i destun deialog yn unig, byth i linellau strwythurol.",
     "Nid yw'r tabl termau byth yn addasu eich ffeil is-deitil yn awtomatig — allbwn newydd yw'r canlyniad ac mae'r gwreiddiol yn aros fel y mae."
    ]
   },
   {
    "h2": "Cwestiynau cyffredin",
    "ps": [
     "**Pam na amnewidiwyd term?** Gwiriwch y cwmpas yn gyntaf: gyda \"second line only\" wedi'i ddewis, mae cofnodion sydd ond â un linell yn aros heb eu cyffru. Yna gwiriwch gyfateb geiriau llawn, sy'n stopio cyfatebion nad ydynt yn eiriau ar ben eu hunain.",
     "**Pam mae Tsieineiddio'n dal i amnewid is-linynnau gyda chyfateb geiriau llawn wedi'i dicio?** Disgwylir hynny. Nid yw Tsieineiddio a Japaneaidd yn gwahanu geiriau â gofodau, felly ni all yr offeryn bennu ffiniau geiriau ac nid oes gan gyfateb geiriau llawn ddim effaith yno.",
     "**Sut mae rholio popeth yn ôl ar ôl camgymeriad?** Datwneud cofnodion fesul un yn y rhestr newid; i ddechrau dros oddi ar y dechrau, cliriwch y tabl termau ac ychwanegu'r is-deitlau eto.",
     "**A ellir newid llinellau arddull ASS drwy ddamwain?** Na. Mae llinellau arddull a blociau `NOTE` y tu allan i gwmpas; dim ond testun deialog sy'n cymryd rhan."
    ]
   },
   {
    "h2": "Preifatrwydd",
    "ps": [
     "Mae is-deitlau a'r tabl termau yn cael eu prosesu'n gyfan gwbl yn y porwr: dim yn cael ei lwytho i fyny a dim yn mynd trwy weinydd. Nid yw'r tabl termau yn cael ei storio, felly mae'n wag y tro nesaf y byddwch chi'n agor y dudalen."
    ]
   },
   {
    "h2": "Offer a chanllawiau cysylltiedig",
    "ps": [
     "P'un a ddylid adeiladu tabl termau a sut i gynnal un ar draws tymor, gweler [[Term tables: keeping a season consistent|/guides/subtitle-glossary.html]]; os yw'r cynnwys yn fudr (nodau dŵr, ciwiau SDH) rhedwch [[Subtitle cleaning|/clean.html]] yn gyntaf; unwaith y bydd yr enwau wedi'u setlo ac mae angen iethoedd eraill ewch i [[Subtitle translation|/translate.html]]; a rhedwch y canlyniad trwy [[Subtitle QC|/qc.html]]."
    ]
   }
  ]
 },
 "hanconv": {
  "seo": {
   "title": "Trosi Is-deitlau Symledig–Traddodiadol – Taiwan yn erbyn Hong Kong – AI-SRTSub",
   "desc": "Canllaw i'r naw cyfeiriad: Taiwanese gyda neu heb eirfa ranbarthol, Hong Kong fel ei flas ei hun, popeth yn drosiadwy yn ôl i symledig. Dim ond deialog sy'n newid; mae amseriadau yn aros yn eu lle.",
   "h1": "Sut i trosi is-deitlau Tsieineiddio Symledig a Thraddodiadol",
   "intro": "P'un a yw is-deitil yn mynd i Taiwan, Hong Kong neu'r tir mawr mae'n newid geiriad a siapiau nodau. Naw cyfeiriad i ddewis ohonynt, a dim ond deialog sy'n cael ei throsi — nid oes byth cyffwrdd ag amseriadau, rhifau mynegai a llinellau arddull ASS.",
   "ctaText": "Agor y trosi"
  },
  "body": [
   {
    "h2": "Beth mae'r offeryn hwn yn ei wneud",
    "ps": [
     "Nid yw trosi rhwng symledig a thraddodiadol dim ond yn ysgrifennu pob nod yn wahanol. Mae'r un gair symledig yn cyfateb i eiriau gwahanol mewn gwahanol ranbarthau — mae'r gair am \"feddalwedd\" yn wahanol rhwng Taiwan a'r tir mawr, ac mae gan Hong Kong fersiwn arall eto. Mae'r trosi yn cadw'r rhain ar wahân:"
    ]
   },
   {
    "h2": "Llwytho i fyny a chanfod",
    "ps": [
     "Llusgwch ffeil i mewn neu bori am un — cefnogir SRT, VTT, ASS a TXT — neu gludwch gynnwys is-deitil yn uniongyrchol i'r blwch. Mae'r fformat yn cael ei ganfod yn awtomatig ac yn dangos nesaf at \"Detected format\"."
    ],
    "img": {
     "file": "hanconv-up",
     "alt": "Ardal lwytho trosi: parth gollwng a blwch pastio, gyda'r fformat a ganfuwyd uchod",
     "cap": "SRT / VTT / ASS / TXT, fformat wedi'i ganfod yn awtomatig"
    }
   },
   {
    "h2": "Dewis ymhlith y naw cyfeiriad",
    "ps": [
     "Mae'r naw cyfeiriad o dan \"Convert to\" yn disgyn i dri grŵp. **Symledig → traddodiadol**: traddodiadol generig, Taiwanese (newid geiriad), Taiwanese (glyffau yn unig), Hong Kong. **Traddodiadol → symledig**: generig, o Taiwanese, o Hong Kong. **Traddodiadol i draddodiadol**: ffurfiau Taiwan, ffurfiau Hong Kong.",
     "Mae dewis \"Taiwan wording\" yn cyfnewid geirfa ranbarthol hefyd: mae'r gair am \"feddalwedd\" yn dod yn un Taiwanese ac felly hefyd y gair am \"wybodaeth\"; mae \"Taiwan glyphs\" yn newid dim ond sut mae nodau'n cael eu hysgrifennu ac yn gadael eich geiriad ar ben ei hun. Achos arall yn llwyr yw Hong Kong ac mae'n defnyddio gair arall eto am \"feddalwedd\". I drosi'n ôl i symledig, defnyddiwch y grŵp isod — mae'n rhaid i chi ddweud pa amrywiaeth draddodiadol y rydych chi'n dod ohoni, oherwydd mae testun Taiwanese a Hong Kong yn cymryd llwybrau gwahanol yn ôl."
    ],
    "img": {
     "file": "hanconv-dir",
     "alt": "Cerdyn Convert to: gwymplen cyrchfan yn dangos \"Simplified → Taiwanese traditional (change wording)\" wedi'i ddewis",
     "cap": "Mae cyfeiriadau'n byw yn y gwymplen \"Convert to\" mewn tri grŵp; hwn yw Taiwanese gyda newidiadau geiriad"
    }
   },
   {
    "h2": "Canlyniad ac allbwn",
    "ps": [
     "Mae ardal y canlyniad yn dangos yr is-deitil a drosiwyd yn syth, gyda bar ystadegau yn rhoi cyfanswm y llinellau a faint o linellau a newidiodd. Os na newidiodd dim o gwbl cewch awgrym y gall y ffeil beidio â chynnwys unrhyw nodau Tsieineiddio — dim ond nodau Han sy'n cael eu trosi, felly mae is-deitil pob-Lladin neu bob-rhif yn aros yn union fel yr oedd.",
     "Yna lawrlwytho neu gopïo. Mae tag iaith yn cael ei fewnosod yn yr enw ffeil — mae `demo.srt` yn dod yn `demo.zh-TW.srt` ar gyfer traddodiadol Taiwanese, `.zh-Hant` ar gyfer traddodiadol generig, a `.zh-Hans` wrth drosi'n ôl i symledig."
    ],
    "img": {
     "file": "hanconv-out",
     "alt": "Ardal canlyniad: is-deitil a drosiwyd a bar ystadegau",
     "cap": "Mae'r bar ystadegau yn dangos cyfanswm a chyfrif llinellau a newidiodd; lawrlwytho neu gopïo o yma"
    }
   },
   {
    "h2": "Beth nad yw byth yn cael ei gyffru",
    "ps": [
     "Dim ond deialog sy'n cael ei throsi. Nid oes cyffru o gwbl ar amseriadau, rhifau mynegai a llinellau arddull ASS — mae'r canlyniad yn barod i'w ddefnyddio heb ailwneud unrhyw fformatio."
    ]
   },
   {
    "h2": "Cwestiynau cyffredin",
    "ps": [
     "**Pam na newidiodd y trosi y gair am \"clean\"?** Mae mapiau un-i-lawer yn cael eu datrys gan air: mae'r synnwyr \"clean\" a'r synnwyr \"dry\" yn rhannu un ffurf draddodiadol, tra bod y synnwyr \"tree trunk\" yn defnyddio un wahanol. Mae'r tablau'n dod o OpenCC, gan gyd-fynd â ymadrozzion cyfan yn hytrach nag un nod.",
     "**Beth yw'r gwahaniaeth rhwng traddodiadol Taiwanese a Hong Kong?** Y geirfa: mae'r gair am \"feddalwedd\" yn wahanol rhwng y ddau. Dewiswch y cyfeiriad ar gyfer y rhanbarth rydych chi'n ei ddanfon iddo.",
     "**A newidiodd cyfrif y nodau ar ôl trosi?** Dim ond nodau Han sy'n cael eu cyfnewid — ni chwanegir na thynnir unrhyw gofnodion ac ni symudwyd unrhyw amseriad. Os bu newid yn y cyfrif llinellau, gwiriwch p'un a gafodd y fformat ei ganfod yn gywir.",
     "**Methu â llwytho'r geiriadur?** Mae'r dudalen yn dweud wrthych chi am adnewyddu ac ail-geisio. Mae'n llwytho'n lleol, felly does dim angen llwytho is-deitlau i fyny i unrhyw le."
    ]
   },
   {
    "h2": "Preifatrwydd",
    "ps": [
     "Mae trosi yn rhedeg yn gyfan gwbl yn eich porwr. Ni chanfuwyd bod unrhyw gynnwys is-deitil yn cael ei anfon at weinydd erioed."
    ]
   },
   {
    "h2": "Offer a chanllawiau cysylltiedig",
    "ps": [
     "Os mai dim ond symledig i draddodiadol sydd angen arnoch chi, gweler [[Convert simplified subtitles to traditional|/guides/srt-simplified-to-traditional.html]]; pam ei fod yn ymwneud â mwy na chyfnewid nodau, gweler [[Simplified vs traditional is not a character swap|/guides/simplified-traditional-chinese.html]]; i gyfieithu i iaith arall, [[Subtitle translation|/translate.html]]."
    ]
   }
  ]
 },
 "how-to-make-lrc-file": {
  "seo": {
   "title": "Sut i gysoni geiriau LRC – Un llinell fesul geiriau, tapiwch wrth i chi fynd – AI-SRTSub",
   "desc": "Adeiladu ffeil LRC o’r dechrau: gludwch un llinell o eiriau fesur llinell, tapiwch yr amser wrth i chi wrando, y llwybrau byr sy’n cyfri, pryd i hepgor llinell, LRC neu SRT, a beth i’w wneud pan fydd yr amseru’n crwydro.",
   "h1": "Sut i gydamseru geiriau LRC",
   "intro": "Dim ond \"un llinell eiriau ynghyd ag un pwynt amser\" yw ffeil LRC. Gelwir creu un yn amseru: cipio’r eicon y mae pob llinell yn dechrau.",
   "ctaText": "Agor y offeryn cydamseru geiriau"
  },
  "body": [
   {
    "h2": "Beth yw amseru mewn gwirionedd",
    "ps": [
     "Gallai strwythur ffeil LRC ddim bod yn symlach: un llinell o eiriau fesur llinell, pob un wedi’i rhagflaenu gan dag amser `[mm:ss.xx]`. Pan fydd chwaraewr yn cyrraedd llinell, mae’n dangos y geiriau hynny yn yr eicon hwnnw.",
     "Felly tasg gyfan \"creu LRC\" yw dynodi pwynt amser i bob llinell o eiriau — ac ni all unrhyw beiriant wneud hynny i chi, oherwydd mae penderfynu ble mae llinell yn dechrau gael ei chanu yn gofyn am wrando."
    ]
   },
   {
    "h2": "Faint o basiau y mae cân eu hangen",
    "ps": [
     "Mae’n werth munud o feddwl cyn i chi ddechrau; mae’n arbed y rhan fwyaf o’r ail-weithio:"
    ],
    "img": {
     "file": "lrc-tap2",
     "alt": "Y rheolyddion chwarae, stampio-y-llinell-hon, dad-wneud-un-llinell a hepgor-y-llinell-hon yn yr ardal dapio",
     "cap": "Pwyso Enter yn ystod chwarae yw’r mwyaf llyfn; stampio’r llinell anghywir? Pwyswch Z a stampio eto"
    }
   },
   {
    "h2": "Mae gludo’r geiriau yn penderfynu pa mor llyfn y mae’r gweddill yn mynd",
    "ps": [
     "Gludwch y geiriau un llinell fesur llinell; mae llinellau gwag yn cael eu hepgor. Y toriadau llinell rydych chi’n eu gludo yw’r llinellau y byddwch chi’n eu hamseru wedyn — torrwch nhw yn fwy o linellau nawr a byddwch chi’n tapio mwy o weithiau wedyn.",
     "Mae gludo LRC presennol yn gweithio hefyd: mae ei dagiau amser `[mm:ss.xx]` yn cael eu cydnabod, ac ar ôl mewnforio rydych chi **yn bwrw mlaen o’r llinell gyntaf heb amser**, fel nad oes rhaid ail-wneud llinellau sydd eisoes wedi’u hamseru.",
     "Mae hynny’n golygu y gellir cadw LRC hanner gorffenedig a’i gludo yn ôl yn ddiweddarach i barhau."
    ],
    "img": {
     "file": "lrc-paste2",
     "alt": "Yr ardal gludo geiriau a’r botwm dadansoddi geiriau",
     "cap": "Un llinell fesur llinell; mae gludo LRC cyfan yn darllen yr amserau presennol fel y gallwch chi fwrw mlaen"
    }
   },
   {
    "h2": "Export LRC or SRT :: Allforio LRC neu SRT",
    "ps": [
     "**Ar gyfer chwaraewr cerddoriaeth, allforiwch LRC.** Mae foobar2000, pob math o chwaraewyr a dyfeisiau sydd â dangosydd geiriau yn ei ddarllen.",
     "**I roi geiriau ar fideo neu eu prosesu ymhellach, allforiwch SRT.** Mae traciau is-deitlau fideo, offer is-deitlau a meddalwedd golygu yn darllen SRT. Yn yr allforio mae pob llinell yn parhau hyd nes y bydd yr un nesaf yn dechrau, ac mae’r llinell olaf yn disgyn yn ôl i 2 eiliad.",
     "Mae’r ddau yn allforio dim ond y llinellau sydd ag amser — nid yw llinellau a hepgorwyd byth yn mynd i mewn i’r ffeil."
    ],
    "img": {
     "file": "lrc-export",
     "alt": "Y botymau lawrlwytho-LRC, lawrlwytho-SRT a chopïo yn yr ardal allforio",
     "cap": "LRC ar gyfer chwaraewyr, SRT ar gyfer fideo; dim ond llinellau gydag amser sy’n cael eu hallforio"
    }
   },
   {
    "h2": "Ychydig o bethau sy’n hawdd eu gwneud yn anghywir",
    "ps": [
     "**Popeth ychydig allan ar ôl amseru? Defnyddiwch wrthbwytsiwr.** Allforiwch SRT a’నాన్ని symud fel cyfanwaith gyda [[Addasu llinell amser|/shift.html]]; llawer cyflymach nag ail-amseru llinell fesur llinell.",
     "**Mae’r crwydro yn tyfu wrth i’r gân fynd ymlaen? Problem cyfradd yw honna.** Pan fydd cyflymder chwarae a chyflymder recordio yn wahanol, mae’r gwall yn tyfu tuag at y diwedd, ac mae angen graddio cyfrannol ar hynny, nid gwrthbwytsiwr.",
     "**Dim ond os byddwch chi’n eu defnyddio gyda’ថ្ងed y mae llwybrau byr yn teimlo’n naturiol.** Mae Space yn chwarae ac yn seibio, mae Enter yn stampio’r llinell gyfredol, mae Z yn dad-wneud un llinell — pwyswch Enter yn uniongyrchol yn ystod chwarae yn lle newid rhwng llygoden a bysellfwrdd.",
     "**Mae ansawdd sain yn effeithio ar gywirdeb.** Mae ffynhonnell â lleisiol clir yn haws ei dilyn; mae recordiadau byw a ffynhonnellau â thraciau cefnogi swnllyd yn amlwg yn galetach."
    ]
   },
   {
    "h2": "Offer a chanllawiau cysylltiedig",
    "ps": [
     "Ar gyfer y cam wrth gam llawn gweler [[Sut i ddefnyddio’r offeryn cydamseru geiriau|/guides/lrc.html]]; i droi LRC presennol yn is-deitlau gweler [[LRC i SRT|/guides/lrc-to-srt.html]]; os yw’r SRT a allforiwyd wedi’i amseru’n anghywir defnyddiwch [[Addasu llinell amser|/shift.html]]; a rhedeg y canlyniad drwy [[Rheoli Ansawdd Is-deitlau|/qc.html]]."
    ]
   }
  ]
 },
 "lrc": {
  "seo": {
   "title": "Offeryn cydamseru geiriau – Llwytho cân, gludo geiriau, tapio i gyd – AI-SRTSub",
   "desc": "Llwythwch gân, gludwch y geiriau, tapiwch stamp amser fesur llinell wrth i chi wrando, ac allforiwch LRC neu SRT. Mae Space yn chwarae ac yn seibio, mae Enter yn stampio’r llinell, mae Z yn dad-wneud, mae’r dwylo’n aros ar y bysellfwrdd.",
   "h1": "Sut i ddefnyddio’r offeryn cydamseru geiriau",
   "intro": "Llwythwch gân, gludwch y geiriau, tapiwch stamp amser ar gyfer pob llinell wrth i chi wrando, ac allforiwch LRC neu SRT safonol. Mae’r sain yn chwarae’n lleol ac nid yw byth yn cael ei lwytho i fyny.",
   "ctaText": "Agor yr offeryn cydamseru geiriau"
  },
  "body": [
   {
    "h2": "What this tool does :: Beth mae’r offeryn hwn yn ei wneud",
    "ps": [
     "Rhoi ffeil geiriau i gân y gellir canu iddi: un llinell fesur geiriau, pob llinell yn cario pwynt amser. Mae chwaraewyr yn darllen LRC, traciau is-deitlau yn darllen SRT, a gellir allforio’r ddau yma."
    ]
   },
   {
    "h2": "1 Load the song :: 1 Llwytho’r gân",
    "ps": [
     "Mae’r golofn gyntaf ar y chwith yn derbyn ffeil sain: mae **MP3, M4A, FLAC, WAV a OGG** i gyd yn gweithio. Mae’r sain yn chwarae’n lleol ac nid yw byth yn cael ei lwytho i fyny.",
     "Nid yw ansawdd sain yn effeithio ar gywirdeb amseru, ond mae ffynhonnell â lleisiol clir yn haws ei dilyn; mae recordiadau byw a ffynhonnellau â thraciau cefnogi swnllyd yn amlwg yn galetach i’w cydamseru."
    ],
    "img": {
     "file": "lrc-up",
     "alt": "Ardal llwytho-cân yr offeryn cydamseru geiriau",
     "cap": "Mae MP3 / M4A / FLAC / WAV / OGG i gyd yn gweithio, ac mae’r sain yn chwarae’n lleol yn unig"
    }
   },
   {
    "h2": "2 Paste the lyrics :: 2 Gludo’r geiriau",
    "ps": [
     "Gludwch y geiriau i’r ail golofn, **un llinell fesur geiriau**; mae llinellau gwag yn cael eu hepgor yn awtomatig. Yna cliciwch \"Dadansoddi geiriau\".",
     "Mae gludo LRC presennol yn gweithio hefyd — mae ei dagiau amser `[mm:ss.xx]` yn cael eu cydnabod, ac ar ôl mewnforio rydych chi’n bwrw mlaen o’r llinell gyntaf heb amser, fel nad oes rhaid ail-wneud llinellau sydd eisoes wedi’u hamseru."
    ],
    "img": {
     "file": "lrc-paste",
     "alt": "Yr ardal gludo geiriau a’r botwm dadansoddi geiriau",
     "cap": "Gludwch un llinell fesur geiriau, neu gludwch LRC cyfan a gadewch i’r offeryn ddarllen yr amserau presennol"
    }
   },
   {
    "h2": "3 Tapiwch i gyd wrth i chi wrando",
    "ps": [
     "Chwaraewch y gân a phwyswch Enter yn yr eicon y mae llinell yn dechrau (neu cliciwch \"Stampio’r llinell hon\"); mae’r amser ar gyfer y llinell honno’n cael ei gofnodi ac mae’r cyrchwr yn neidio i’r un nesaf.",
     "Llwybrau byr: mae **space** yn chwarae ac yn seibio, mae **Enter** yn stampio’r llinell gyfredol, mae **Z** yn dad-wneud un llinell. Pwyso Enter yn ystod chwarae yw’r ffordd fwyaf llyfn i weithio — dim symud yn ôl ac ymlaen rhwng llygoden a bysellfwrdd.",
     "Wedi stampio’r llinell anghywir? Pwyswch Z i’w dad-wneud a stampio eto. Os nad ydych chi eisiau stampio llinell o gwbl (seibiant offerynnol, darn cerddorol yn unig), cliciwch \"Hepgor y llinell hon\" ac ni fydd yn ymddangos yn yr allforio."
    ],
    "img": {
     "file": "lrc-tap",
     "alt": "Y rheolyddion chwarae, stampio-y-llinell-hon, dad-wneud-un-llinell a hepgor-y-llinell-hon yn yr ardal dapio",
     "cap": "Mae Space yn chwarae ac yn seibio, mae Enter yn stampio’r llinell gyfredol, mae Z yn dad-wneud — mae’r dwylo’n aros ar y bysellfwrdd"
    }
   },
   {
    "h2": "4 Export :: 4 Allforio",
    "ps": [
     "Y bedwaredd golofn sy’n gwneud yr allforio: **Lawrlwytho LRC** ar gyfer chwaraewyr, **Lawrlwytho SRT** ar gyfer traciau is-deitlau fideo, neu \"Copïo\" i gymryd y testun yn uniongyrchol.",
     "Dim ond llinellau gydag amser sy’n cael eu hallforio; nid yw llinellau a hepgorwyd byth yn mynd i mewn i’r ffeil. Yn yr allforio SRT mae pob llinell yn parhau hyd nes y bydd yr un nesaf yn dechrau, ac mae’r llinell olaf yn disgyn yn ôl i 2 eiliad."
    ],
    "img": {
     "file": "lrc-out",
     "alt": "Y botymau lawrlwytho-LRC, lawrlwytho-SRT a chopïo yn yr ardal allforio",
     "cap": "LRC ar gyfer chwaraewyr, SRT ar gyfer fideo; dim ond llinellau gydag amser sy’n cael eu hallforio"
    }
   },
   {
    "h2": "Beth sy’n cael ei adael heb ei gyffwrdd",
    "ps": [
     "Nid yw testun y geiriau yn cael ei ail-ysgrifennu. Dim ond ychwanegu un pwynt amser fesur llinell y mae amseru yn ei wneud ac nid yw byth yn cyffwrdd y geiriau a gaeodd.",
     "Pan fyddwch chi’n mewnforio LRC presennol, mae llinellau sy’n cario tag amser eisoes yn cadw eu hamser gwreiddiol ac rydych chi’n stampio dim ond o’r llinell gyntaf heb amser ymlaen."
    ]
   },
   {
    "h2": "Common questions :: Cwestiynau cyffredin",
    "ps": [
     "**Pam fod rhai llinellau ar goll o’r allforio?** Nid yw llinellau a hepgorwyd a llinellau heb amser byth yn mynd i mewn i’r ffeil. Ewch yn ôl i gam tri a’ त्यांचे ychwanegu, neu gadarnhewch eu bod i’w hepgor.",
     "**A ellir newid yr amserau wedyn?** Os ydych chi eisiau symud popeth ychydig ar ôl stampio, allforiwch SRT a defnyddiwch [[Addasu llinell amser|/shift.html]] i wrthbwyso neu raddio fel cyfanwaith.",
     "**LRC neu SRT — pa un ddylwn i ei allforio?** LRC ar gyfer chwaraewyr cerddoriaeth (foobar2000, cleientiaid ffrydio, pob math o chwaraewyr); SRT pan fydd yn rhaid i’r geiriau eistedd ar fideo neu gael eu prosesu ymhellach gydag offer is-deitlau.",
     "**Faint o amser y mae un gân yn ei gymryd?** Mae’n dibynnu ar faint o linellau sydd yna a pha mor fanwl rydych chi eisiau bod. Ar gyfer cân o ddeg ar hugain neu ddeg ar ddeg ar hugain o linellau, ychydig funudau fesur pas unwaith y byddwch chi’n adnabod y llif; mae hico wir gywirdeb lefel gair yn cymryd mwy o amser."
    ]
   },
   {
    "h2": "Privacy :: Preifatrwydd",
    "ps": [
     "Mae sain a geiriau yn cael eu prosesu’n gyfan gwbl yn y porwr: ni lwythir dim i fyny ac nid yw dim yn mynd trwy weinydd. Mae’r sain yn cael ei ddadgodio a’i chwarae’n lleol yn unig."
    ]
   },
   {
    "h2": "Offer a chanllawiau cysylltiedig",
    "ps": [
     "Os oes gennych LRC eisoes ac eisiau is-deitlau gweler [[LRC to SRT|/guides/lrc-to-srt.html]]; ar gyfer y meddwl a'r peryglon y tu ôl i amseru gweler [[How to sync LRC lyrics|/guides/how-to-make-lrc-file.html]]; os yw'r SRT Allforio i ffwrdd defnyddiwch [[Timeline adjustment|/shift.html]]; a rhedeg y canlyniad trwy [[Subtitle QC|/qc.html]]."
    ]
   }
  ]
 },
 "lrc-to-srt": {
  "seo": {
   "title": "Trawsnewidydd LRC i SRT – Troi Geiriau yn Is-deitlau – AI-SRTSub",
   "desc": "Trawsnewid geiriau LRC yn is-deitlau SRT: mae pob llinell yn parhau nes bod yr un nesaf yn dechrau, mae’r ciw olaf yn cael 3 eiliad. Mae caneuon dros 60 munud yn darllen yn gywir. Yn rhedeg yn eich porwr.",
   "h1": "LRC to SRT :: LRC i SRT",
   "intro": "Troi ffeiliau geiriau LRC yn SRT: gollwng y ffeil, dewis SRT, lawrlwytho. Mae amserau gorffen yn cael eu llenwi o’r linell nesaf yn awtomatig.",
   "ctaText": "Convert LRC → SRT :: Trawsnewid LRC → SRT"
  },
  "body": [
   {
    "h2": "Sut mae LRC yn wahanol i SRT",
    "ps": [
     "Fformat geiriau yw LRC: mae pob llinell yn cario amser \"dechrau canu\" yn `[minutes:seconds.cents]` a **dim amser gorffen**; mae angen dechrau a gorffen ar bob ciw SRT. Felly craidd y trawsnewid yw llenwi’r amserau gorffen."
    ],
    "img": {
     "file": "convert-upload-lrc",
     "alt": "Ardal lwytho i fyny: ffeil LRC wedi’i llwytho, ei chanfod fel LRC",
     "cap": "Mae ffeil geiriau gyda stampiau amser [00:12.50] yn cael ei chanfod fel LRC ar unwaith"
    }
   },
   {
    "h2": "Sut mae amserau gorffen yn cael eu llenwi",
    "ps": [
     "Y rheol yw’n syml: **mae pob llinell yn parhau nes bod yr un nesaf yn dechrau**; nid oes gan y llinell olaf \"nesaf\", felly mae’n cael 3 eiliad. Hefyd, mae stampiau amser LRC yn cario cofnodion munudau ac eiliadau yn unig — dim oriau — ac nid yw’r maes munud yn cario drosodd (62:05 yn golygu 1 awr 2 mun 5 eiliad), felly mae traciau hir iawn fel cymysgion DJ yn darllen yn gywir."
    ]
   },
   {
    "h2": "How to convert :: Sut i drawsnewid",
    "ps": [
     "Agorwch y [[trawsnewidydd|/convert.html]], gollyngwch yr LRC i mewn, dewiswch **SRT - SubRip** fel y datbusiad, yna trawsnewidiwch a lawrlwythwch. Yn ddefnyddiol ar gyfer fideos cerddoriaeth ac ar gyfer gosod geiriau fel is-deitlau mewn chwaraewyr; gellir trawsnewid yr SRT a allforiwyd eto i VTT ar gyfer y gwe."
    ]
   }
  ]
 },
 "make-bilingual-subtitles": {
  "seo": {
   "title": "Dau Ffordd i Wneud Is-deitlau Dwyieithog – AI-SRTSub",
   "desc": "Daw is-deitlau dwyieithog mewn dau ffurf: dwy linell mewn un ciw, neu ddau giw ar yr un llinell amser. Manteision, anfanteision, a sut i newid rhyngddynt. – AI-SRTSub",
   "h1": "Dau Ffordd i Wneud Is-deitlau Dwyieithog",
   "intro": "Gall yr un is-deitlid dwyieithog guddio dau gynllun gwahanol iawn. Dysgwch i’ jejich wahaniaethu, a bydd gwneud, hollti, a thrawsnewid i gyd yn stopio eich drysu.",
   "ctaText": "Gweithio gydag is-deitlau dwyieithog"
  },
  "body": [
   {
    "h2": "Sut mae’r Ddau Ffurf yn Edrych",
    "ps": [
     "**Ffurf B: dau giw ar yr un llinell amser.** Mae un llinell o ddeialog yn troi’n ddau giw is-deitlid ar wahân gydag amseru unfath — un Saesneg, un Tsieinëeg — wedi’u tynnu wedi’u pentyrru ar ben ei gilydd. Dyma’r ffordd fwyaf cyffredin y caiff is-deitlau ASS dwyieithog eu hadeiladu."
    ]
   },
   {
    "h2": "Lle mae Pob Un yn Byrhau",
    "ps": [
     "Pwynt gwan Ffurf A yw **canfod**: mae hollti’r traciau yn dibynnu ar y system ysgrifennu, felly mae parau Tsieinëeg-Saesneg neu Japaneaidd-Saesneg yn gwahanu ar yr olwg gyntaf, tra na ellir gwahanu **cyfuniadau sy’n rhannu un sgript sengl** — Saesneg ynghyd â Ffrangeg, neu Tsieinëeg ynghyd â kanji Japaneaidd. Pwynt gwan Ffurf B yw **cynhyrchu**: rhaid i’r ddwy linell amser gydweddu’n union ac mae eu cyd-fynd â llaw yn flinedig; mae rhai chwaraewyr hefyd yn tynnu’r ddau giw yr un llinell amser, gan orlawn y sgrin. Rheol bawd: defnyddiwch Ffurf A ar gyfer is-deitlau gorffenedig a fwriedir ar gyfer gwylwyr; defnyddiwch Ffurf B pan fydd angen i chi dynnu’r traciau ar wahân ar gyfer gwaith pellach."
    ]
   },
   {
    "h2": "The Two Routes :: Y Ddau Lwybr",
    "ps": [
     "**Adeiladu is-deitlau dwyieithog o’r gwreiddiol**: defnyddiwch [[Cyfieithu Is-deitlau AI|/translate.html]] a dewiswch “Dwyieithog · gwreiddiol ar ben” neu “Dwyieithog · cyfieithiad ar ben” wrth allforio — cewch Ffurf A yn uniongyrchol; mae dewis ASS hefyd yn cynnig dau gynllun, “wedi’u pentyrru brig a gwaelod” a “dwy linell ar y gwaelod”.",
     "**Uno dau drac neu drawsnewid rhwng ffurfiau**: defnyddiwch [[Stripper Is-deitlau Dwyieithog|/bilingual.html]] a’i fodd “uno i mewn i un gofnod dwy linell” — Ffurf B i mewn, Ffurf A allan; mynd y ffordd arall, mae “hollti yn ddwy ffeil” yn cymryd Ffurf A neu B i mewn ac yn rhoi dau drac annibynnol allan."
    ],
    "img": {
     "file": "bilingual-modes",
     "alt": "Pedwar modd y stripper dwyieithog; mae “uno i mewn i un gofnod dwy linell” yn uno dau giw sy’n rhannu llinell amser",
     "cap": "“Uno i mewn i un gofnod dwy linell”: mae Ffurf B yn troi’n Ffurf A"
    }
   },
   {
    "h2": "Pa Ddyfais fydd yn ei Chwarae",
    "ps": [
     "Mae chwaraewyr gwe (HTML5 `<track>`) a’r mwyaf o chwaraewyr symudol yn trin Ffurf A yn fwy dibynadwy; mae chwaraewyr bwrdd gwaith (VLC, mpv, PotPlayer) yn derbyn y ddau a gallant hyd yn oed roi gwahanol liwiau a safleoedd i’r ddau giw yr un llinell amser. Pan fyddwch mewn amheuaeth, allforiwch Ffurf A fel SRT — mae’n teithio orau. Am y gwahaniaethau rhwng y fformatau eu hunain, gweler [[SRT, VTT neu ASS: Pa Un Dylewch Chi Ei Ddefnyddio|/guides/subtitle-format-comparison.html]]."
    ],
    "img": {
     "file": "translate-export",
     "alt": "Y opsiynau arddull dwyieithog ym mhot panel allforio’r offeryn cyfieithu",
     "cap": "Dewiswch drefn y llinell ddwyieithog yn syth wrth allforio — un cam ac mae wedi’i wneud"
    }
   },
   {
    "h2": "FAQ :: Cwestiynau Cyffredin",
    "ps": [
     "**Mae is-deitlau dwyieithog yn edrych yn gyfyngedig — beth alla i ei wneud?** Rheolwch led y llinell: mae gan banel allforio’r offeryn cyfieithu osodiad “led llinell ddwyieithog”; mae llinell gulach yn golygu llai o gymeriadau fesur ciw a sgrin lanach.",
     "**Dim ond un trac rydw i eisiau.** Mae “cadw gwreiddiol yn unig / cadw cyfieithiad yn unig” y stripper yn ei drin mewn un clic, gweler [[Hollti Is-deitlau Dwyieithog yn Ddau Drac|/guides/split-bilingual-subtitles.html]]."
    ]
   }
  ]
 },
 "merge": {
  "seo": {
   "title": "Uno is-deitlau dwyieithog a stiloed – Uno, stilo, allforio – AI-SRTSub",
   "desc": "Uno dau ffeil is-deitlid yn drac dwyieithog, ail-stilo ffeil dwyieithog bresennol, neu stilo un iaith: moddau paru, y templedi ASS a VTT, a pha fformat i’w allforio.",
   "h1": "Sut i ddefnyddio uno dwyieithog ac is-deitlau effaith arbennig",
   "intro": "Cyfuno dau ffeil is-deitlid yn un trac dwyieithog, neu stilo is-deitlau’n uniongyrchol: mae ffont, lliw, amlinell a safle yn beth-rydych-chi-’n-ei-weld-yw-beth-gewch, ac mae’r rhagolwg yn cyfateb i’r allforio.",
   "ctaText": "Agor yr offeryn is-deitlid effaith arbennig"
  },
  "body": [
   {
    "h2": "What this tool does :: Beth mae’r offeryn hwn yn ei wneud",
    "ps": [
     "Mae’r un dudalen hon mewn gwirionedd yn cwmpasu tri swydd: uno ffeil is-deitlid wreiddiol a chyfieithiedig yn un ffeil ddwyieithog, addasu trefn ac arddull ffeil sydd eisoes yn ddwyieithog, ac ychwanegu effeithiau arbennig at ffeil un iaith. Mae’r tri yn rhannu’r un paramedrau arddull a’r un rhagolwg."
    ]
   },
   {
    "h2": "Three jobs, one page :: Tri swydd, un dudalen",
    "ps": [
     "Mae gan ben y dudalen dri thab: **Uno dau ffeil**, **Addasu ffeil ddwyieithog**, **Ffeil un iaith**. Eich dewis chi sy’n penderfynu pa nifer o golofniadau mewnbwn sy’n ymddangos ar y chwith.",
     "Wrth uno dau ffeil, mae’r ochr chweched yn dal dwy golofn, \"1 Is-deitlau gwreiddiol\" a \"2 Is-deitlau cyfieithiedig\"; mae pob un yn derbyn ffeil a lwythwyd i fyny neu destun a gludwyd yn syth i mewn. Mae addasu ffeil ddwyieithog a stilo ffeil un iaith bob un angen dim ond un colofn."
    ],
    "img": {
     "file": "merge-mode",
     "alt": "Y tri thab ar ben yr offeryn is-deitlid effaith arbennig a’r ardal fewnbwn ar y chwith",
     "cap": "Tri thab ar y brig; mae dewis \"Uno dau ffeil\" yn dod â cholofn wreiddiol a chyfieithiedig ar y chwith"
    }
   },
   {
    "h2": "Sut mae dau ffeil yn cael eu paru",
    "ps": [
     "Yr eitem gyntaf o dan \"3 Gosodiadau uno\" yw’r modd paru: **Paru yn ôl trefn · defnyddio’r llinell amser wreiddiol**, **Paru yn ôl llinell amser · defnyddio’r llinell amser wreiddiol**, **Paru yn ôl trefn · defnyddio’r llinell amser gyfieithiedig**.",
     "Pan fo’r ddwy ffeil yr un nifer o gofnodion yn yr un drefn, paru yn ôl trefn yw’r mwyaf diogel. Pan fydd y niferoedd yn wahanol (un ochr wedi uno cofnodion, y llall wedi’u hollti), parwch yn ôl llinell amser a gadewch i’r offeryn gydweddu yn ôl agosrwydd. Pwy llinell amser i’w ddefnyddio sy’n dibynnu ar pa ffeil sy’n fwy cywir — fel arfer y gwreiddiol.",
     "Isod mae’r strwythur testun (canfod yn awtomatig / dwy linell fesur gofnod / parau sy’n cyfnewid) a’r drefn (gwreiddiol ar ben / cyfieithiad ar ben)."
    ],
    "img": {
     "file": "merge-pair",
     "alt": "Opsiynau modd paru, strwythur testun a threfn o dan osodiadau uno",
     "cap": "Mae’r modd paru yn penderfynu pa linell sy’n mynd â phwy, ac mae pwy llinell amser i’w ddefnyddio wedi’i osod yma hefyd"
    }
   },
   {
    "h2": "Addasu’r arddull eitem fesur eitem",
    "ps": [
     "Mae’r panel arddull yn eistedd ar y dde. Pan fyddwch chi’n allforio ASS, mae’r bloc \"Ymddangosiad ASS\" yn berthnasol: cynllun (wedi’i hollti · wedi’i wahanu brig a gwaelod / wedi’i pentyrru · dwy linell ar y gwaelod), y maint, lliw, didreiddedd, ffont, trwchus, italig, bwlch llythrennau, amlinell, lliw amlinell, cysgod/cefnlen (dim / cysgod / cefnlen), dyfnder, lliw ffin, didreiddedd ffin, aliniad llorweddol (gwaelod · chwith / gwaelod · canol / gwaelod · dde) a phellter o waelod y llinell gyfieithu (sylfaenol), ynghyd â ffont, cysgod/cefnlen a ymylon chwith/dde y llinell wreiddiol (eilradd).",
     "Pan fyddwch chi’n allforio stilo VTT dwyieithog, mae’r bloc \"Arddull WebVTT\" yn berthnasol: ar ben chwe rhagosodiad (safonol / cryno / sinematig / brig / hygyrch / portread) gallwch chi theulu’r linell fertigol, yr angor (gwaelod / brig / canol), y safle llorweddol, maint y lled, gwerth yr aliniad a uchder llinell y ciw cyfan, ynghyd â lliw cefnlen, didreiddedd cefnlen a lled amlinell y llinell gyfieithu; gall y llinell wreiddiol etifeddu’r brif arddull neu gael ei gosod ar wahân.",
     "Pan fyddwch chi wedi gorffen gallwch chi gadw’r canlyniad fel rhagosodiad a’i ail-ddefnyddio yn ddiweddarach drwy ei ddewis o dan \"O ragosodiadau a gadwyd\" a chlicio \"Cymhwyso\"."
    ],
    "img": {
     "file": "merge-style",
     "alt": "Paramedrau’r panel ymddangosiad ASS ar y dde",
     "cap": "Mae maint, lliw, amlinell, cysgod/cefnlen ac aliniad i gyd yn addasadwy, a gellir cadw’r canlyniad fel rhagosodiad"
    }
   },
   {
    "h2": "Gwiriwch y rhagolwg cyn allforio",
    "ps": [
     "Mae \"Rhagolwg uno\" yn dabl: #, amser, gwreiddiol, cyfieithiad, arddull. Mae’r bar uchod yn hidlo rhesi a ddrwgdybir yn ôl \"mae ganddo effeithiau sain\", \"mae ganddo ragddodiad siaradwr\", \"yn fyrrach na 1 eiliad\", \"mwy na dwy linell\" a \"chyflymder darllen wedi’i ragori\", neu yn ôl gair allweddol rydych chi’n ei deipio.",
     "Mae clicio ar slot arddull rhes yn ehangu golygydd y slot hwnnw ac yn rhestru’r rhesi sy’n ei ddefnyddio yn unig; mae \"Clirio pob gwrthwneudiad\" yn dychwelyd pob gwrthwneudiad llaw i’r templed. Mae’r ardal addasu llinell amser isod yn trin gwrthbwytsiwr byd-eang (o giw penodol) a graddio cyfrannol.",
     "Unwaith y bydd yn edrych yn gywir, ewch i \"4 Allforio\": lawrlwythwch y ffeil is-deitlid neu gopïwch ei chynnwys."
    ],
    "img": {
     "file": "merge-preview",
     "alt": "Tabl rhagolwg yr uno a’i far hidlo",
     "cap": "Y rhagolwg yw’r allforio; hidlwch rhesi a ddrwgdybir yn ôl math neu ehangwch un slot arddull sengl"
    }
   },
   {
    "h2": "Beth sy’n cael ei adael heb ei gyffwrdd",
    "ps": [
     "Mae stilo yn newid ymddangosiad yn unig, byth deialog. Nid yw testun y gwreiddiol a’r cyfieithiad yn cael ei newid gan un cymeriad sengl yn ystod yr uno; oni bai eich bod yn ei newid yn fwriadol yn yr ardal addasu isod y rhagolwg, daw’r llinell amser o’r ffeil a ddewisoch.",
     "Pan fyddwch chi’n allforio SRT neu \"VTT heb stilo\", ni ysgrifennir unrhyw wybodaeth arddull i mewn i’r ffeil — mae’r dudalen yn dweud wrthych nad oes gan y VTT floc STYLE a bydd y chwaraewr yn defnyddio ei ymddangosiad diofyn. Os ydych chi eisiau stilo, dewiswch stilo VTT dwyieithog neu ASS."
    ]
   },
   {
    "h2": "Common questions :: Cwestiynau cyffredin",
    "ps": [
     "**Beth os oes gan y ddwy ffeil niferoedd cofnodion gwahanol?** Defnyddiwch \"Paru yn ôl llinell amser\" ac mae’r offeryn yn cydweddu yn ôl agosrwydd; nid yw cofnodion na all eu cydweddu yn cael eu dyfeisio.",
     "**Beth os bydd chwaraewr yn anwybyddu’r stilo mewn ASS a allforiwyd?** Mae’r arddulliau’n cael eu storio y tu mewn i’r ffeil, ond mae cefnogaeth chwaraewyr i ASS yn amrywio. Os oes angen golwg fwy cludadwy arnoch, allforiwch stilo VTT dwyieithog.",
     "**Sut ydw i’n mynd yn ôl i’r templed cychwynnol ar ôl ei ddifrodi?** Mae \"Adfer paramedrau diofyn\" yn y bloc ASS ac \"Adfer diofynion templed\" yn y bloc VTT pob un yn ailosod eu hadran eu hunain.",
     "**Beth yw’r saith rhes yn y sampl?** Enghraifft adeiledig ydyn nhw, yno yn unig fel y gallwch chi weld sut mae uno yn edrych; ni ellir allforio’r sampl. Llwythwch eich is-deitlau eich hun a cliciwch y rhagolwg uno ac maen nhw’n cael eu disodli’n awtomatig."
    ]
   },
   {
    "h2": "Privacy :: Preifatrwydd",
    "ps": [
     "Mae is-deitlau yn cael eu prosesu’n gyfan gwbl yn y porwr: ni lwythir dim i fyny ac nid yw dim yn mynd trwy weinydd. Cau’r porwr a bydd popeth o’r sesiwn honno wedi mynd."
    ]
   },
   {
    "h2": "Offer a chanllawiau cysylltiedig",
    "ps": [
     "I hollti ffeil ddwyieithog yn ôl yn ddau drac defnyddiwch [[Hollti dwyieithog|/bilingual.html]]; i fynd y ffordd arall a throi un iaith yn ffeil ddwyieithog gweler [[Dau ffordd i wneud is-deitlau dwyieithog|/guides/make-bilingual-subtitles.html]]; rhedeg y canlyniad drwy [[Rheoli Ansawdd Is-deitlau|/qc.html]]; am dymor cyfan ar unwaith defnyddiwch [[Trawsnewid swp|/batch.html]]."
    ]
   }
  ]
 },
 "qc": {
  "seo": {
   "title": "Sut i Ddefnyddio Rheoli Ansawdd Is-deitlau – Gwirio Llinell Amser a Chynllun – AI-SRTSub",
   "desc": "Rheoli Ansawdd Is-deitlau: mae rheolau 17 yn dal gorgyffiriadau, lled llinell, cyflymder darllen ac atalnodi, trothwyon fesur iethoedd 27. Mae hanner yn drwsio un clic; lawrlwythwch y adroddiad.",
   "h1": "Sut i Ddefnyddio Rheoli Ansawdd Is-deitlau",
   "intro": "Cyn i chi drosglwyddo is-deitlau, rhedwch nhw trwy dudalen rheoli ansawdd ar gyfer amseru a chynllun: beth sy’n cael ei wirio, sut i ddarllen yr adroddiad, a pha faterion y gellir eu trwsio gydag un clic — pob un wedi’i gwmpasu yma.",
   "ctaText": "Open Subtitle QC :: Agor Rheoli Ansawdd Is-deitlau"
  },
  "body": [
   {
    "h2": "Beth Yw’r Offeryn Hwn Ar Gyfer",
    "ps": [
     "Mae is-deitlau sy’n edrych yn iawn i’r llygad noeth yn aml yn troi allan i fod â llinellau amser yn gorgyffiri, llinellau sy’n rhy eang, neu gyflymder darllen rhy uchel unwaith y’u cyflwynir. Mae tudalen rheoli ansawdd yn rhestru’r materion hyn un wrth un:"
    ]
   },
   {
    "h2": "Dewiswch Reolau’r Iaith yn Gyntaf",
    "ps": [
     "O dan “Gwirio yn ôl rheolau pa iaith” rydych chi’n gosod pum trothwy: **lled un llinell fwyaf** (42 uned lled-hanner ar gyfer tirwedd yn ddiofyn, 36 ar gyfer sgwâr, 28 ar gyfer portread), **cyfyngiad cyflymder darllen** (18 uned lled yr eiliad ar gyfer Tsieinëeg, Japaneaidd a Coreeg, 20 ar gyfer iethoedd eraill), **hyd lleiaf o 833 milieiliad**, **hyd mwyaf o 7000 milieiliad**, a **fan bellaf 2 linell**. Gosodwch iaith yr is-deitlid i’w chanfod yn awtomatig neu ddewiswch un o’r 27 â llaw; dim ond haen lled llinell y mae cyfeiriadedd sgrin yn ei newid — mae cyflymder darllen, hyd a nifer y llinellau yn aros fel y maent. Unedau lled-hanner yw’r mesur cyffredin: mae un hanzi yn cyfrif fel 2, un llythyren Ladin fel 1 — mae lled llinell o 42 yn hafal i 21 hanzi neu 42 llythyren."
    ],
    "img": {
     "file": "qc-rules",
     "alt": "Gosodiadau rheoli ansawdd: pum blwch mewnbwn trothwy ynghyd â iaith is-deitlid a gwymplenni cyfeiriadedd sgrin",
     "cap": "Pum trothwy + iaith + cyfeiriadedd; mae’r rhagosodiadau’n cydweddu ag ymarfer cyffredin y diwydiant"
    }
   },
   {
    "h2": "Reading the Report :: Darllen yr Adroddiad",
    "ps": [
     "Mae’r adroddiad rheolau 17 yn adrodd canfyddiadau ar dri lefel: **gwallau** (testun dryslyd, fformat stamp amser, gorffen yn gynharach na dechrau, niferoedd wedi’u torri), **rhybuddion** (cofnodion gwag, gorgyffiriadau, hydoedd rhy byrrau neu ry hir, cyflymder darllen dros y cyfyngiad, llinellau rhy eang, mwy na dwy linell), ac **awgrymiadau** (safle torri llinell, bylchau ar y dechrau neu’r diwedd, bylchau ar goll, normau atalnodi, a mwy). Mae pob canfyddiad yn cario rhif y cofnod a manylion “mesuredig X, trothwy Y”, a gellir hidlo’r rhestr yn ôl lefel. Mae cofnodion dwyieithog yn cael esemptionau: mae’r ddau ffurf yn cael eu hanfod yn awtomatig, mae gwiriadau gorgyffirio yn esemptio’r pâr cyfan, ac mae cyflymder darllen yn cyfrif dim ond y llinell a ysgrifennwyd yn yr iaith darged."
    ],
    "img": {
     "file": "qc-report",
     "alt": "Ardal adroddiad rheoli ansawdd: canfyddiadau wedi’u grwpio yn ôl gwall, rhybudd ac awgrym, pob un â rhif cofnod a gwerth mesuredig",
     "cap": "Adroddiad tair lefel: mae pob canfyddiad yn cario ei rif cofnod a’i werthoedd mesuredig/trothwy"
    }
   },
   {
    "h2": "Fixing and Exporting :: Trwsio ac Allforio",
    "ps": [
     "Mae’r cerdyn “Trwsio ac allforio” yn rhestru eitemau **hunan-drasadwy** yn unig: ail-lapio, tynnu cofnodion gwag, ychwanegu bylchau ar goll, disodli atalnodi fesur normau iaith, ail-rifo — mae popeth sy’n gadael yr amseru heb ei gyffwrdd wedi’i dicio yn ddiofyn; mae **eitemau sy’n newid amseru** (cyfnewid dechrau a gorffen, symud gorgyffiriadau, tocio neu ymestyn hydoedd) heb eu ticio yn ddiofyn — ticiwch nhw ar ôl gwirio’r effaith eich hun. Cliciwch “Cymhwyso trwsiadau” ac mae gwiriad newydd yn rhedeg yn awtomatig; dim ond yr hyn a ddrwsiwyd yn ddidwyll y mae’r cyfrif yn ei gyfrif — nid yw llinellau na ellid eu hail-lapio yn cael eu chwyddo i mewn i’r niferoedd. **Nid oes hunan-drwsio ar gyfer cyflymder darllen dros y cyfyngiad**: ni all y peiriant wybod pa air i’ അന്തu, felly mae’n rhaid i’r cyfieithiad gael ei fyrhau â llaw neu i’r amseru gael ei addasu. Ar ôl trwsio, allforiwch SRT neu VTT, o cliciwch “Lawrlwytho adroddiad” i gadw adroddiad testun plaen `.qc.txt`."
    ],
    "img": {
     "file": "qc-fix",
     "alt": "Y cerdyn trwsio: blychau ticio ar gyfer eitemau hunan-drasadwy a’r botwm Cymhwyso trwsiadau",
     "cap": "Dim ond eitemau hunan-drasadwy sy’n gwneud y rhestr; mae trwsiadau sy’n newid amseru heb eu ticio yn ddiofyn"
    }
   },
   {
    "h2": "FAQ :: Cwestiynau Cyffredin",
    "ps": [
     "**Pam na ellir allforio fy ASS?** Mae rheoli ansawdd yn allforio SRT a VTT yn unig; mae ASS yn mynd i mewn ond nid yw’n dod allan. I gadw effeithiau ASS, meddyliwch amdano yn gyntaf yn [[Trawsnewidydd Fformat|/convert.html]].",
     "**Beth mae cyflymder darllen o 18 yn ei olygu?** Ar gyfer Tsieinëeg, Japaneaidd a Coreeg y cap yw 9 cymeriad lled-llawn yr eiliad (18 uned lled-hanner); mae iethoedd eraill yn cael 20 uned lled-hanner yr eiliad. Dyma’r haenau cysur cyffredin, ac mae’r blwch mewnbwn yn eich galluogi i’u newid.",
     "**Mae amgodio fy ffeil wedi torri — a ellir ei wirio o hyd?** Mae rheoli ansawdd yn darllen UTF-8 yn unig; trwsiwch yr amgodio ar dudalen atgyweirio testun dryslyd yn gyntaf.",
     "**A fydd yn cyffwrdd fy llinell amser?** Dim cyn belled ag y byddwch chi’n gadael y grŵp “newidiadau amseru” heb ei dicio; hyd yn oed pan fydd wedi’i dicio, mae pob newid yn cael ei sillafu cyn i’r trwsiad gael ei gymhwyso."
    ]
   },
   {
    "h2": "Related Guides :: Canllawiau Cysylltiedig",
    "ps": [
     "Is-deitlau yn fflachio heibio yn rhy gyflym i’n darllen — gweler y canllaw pwrpasol [[Is-deitlau Rhy Gyflym i’w Darllen|/guides/subtitle-too-fast.html]]. Beth i’കളും wirio cyn ei ddanfon — mae’r rhestr wirio yn [[Beth i’i Wirio Cyn ei Ddanfon|/guides/subtitle-quality-check.html]]. Mae llinell amser sy’n crwydro allan o gydamseriad yn fath gwahanol o broblem — gweler [[Is-deitlau’n Crwydro Allan o Gydamseriad|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "remove-subtitle-ads": {
  "seo": {
   "title": "Tynnu Hysbysebion a Nodau Dŵr o Is-deitlau – AI-SRTSub",
   "desc": "Diosg nodau dŵr a hysbysebion o is-deitlau: mae URLs, credydau fansub a thagiau wedi’u amgodio gan yn cael eu clirio mewn un clic, ynghyd â chofnodion dyblyg a gwag. – AI-SRTSub",
   "h1": "Tynnu Hysbysebion a Nodau Dŵr o Is-deitlau",
   "intro": "Mae URLs, credydau a chofnodion promo sydd wedi’u cuddio yn eich is-deitlau yn cael eu clirio mewn un pas gan reolau nod dŵr y glanhawr — a gellir dad-wneud unrhyw ddiwytiad anghywir cofnod fesur cofnod.",
   "ctaText": "Glanhau nodau dŵr is-deitlid"
  },
  "body": [
   {
    "h2": "Beth yw’r nodau dŵr hyn",
    "ps": [
     "Mae is-deitlau a ddadlwythwyd ar-lein yn aml yn cael cofnodion ychwanegol ar y dechrau neu’r diwedd (weithiau yn y canol hefyd): URLs, cyfeiriadau e-bost, enwau grwpiau fansub, credydau `encoded by` / `translated by`, enwau gwefannau fel opensubtitles, a llinellau fel “dilynwch ein cyfrif WeChat” neu “at ddibenion astudio yn unig”. Cofnodion is-deitlid arferol ydyn nhw — gyda llinell amser, yn cymryd llinell — fel na all chwaraewyr eu tynnu; mae’n rhaid iddynt gael eu hanfod yn ôl cynnwys."
    ]
   },
   {
    "h2": "Where to do it :: Ble i’w wneud",
    "ps": [
     "Agorwch y [[Glanhawr Is-deitlau|/clean.html]] a gollwng eich is-deitlid i mewn; mae gan y grŵp “Nodau dŵr a chofnodion sbwriel” eisoes “Tynnu nodau dŵr a hysbysebion”, “Tynnu cofnodion dyblyg” a “Tynnu cofnodion gwag” wedi’u ticio yn ddiofyn, ac mae glanhau yn dechrau yn awtomatig. Mae canfod yn gweithio ar ddau lefel: mae **signalau caled** fel URLs, e-byst, grwpiau fansub ac enwau gwefannau yn dileu’r cofnod cyfan ar darawiad ar unrhyw hyd; mae **signalau meddal** fel @handles, credydau “amgodio” neu “profi ddarllen” yn cael eu barnu yn unig mewn cofnodion byr o ddim mwy na 40 cymeriad, er mwyn osgoi tocio deialog hir. Mae gan gofnodion dwyieithog linellau nod dŵr yn cael eu diosg yn gyntaf llinell fesur llinell tra bod llinellau deialog yn cael eu cadw; mae’r cofnod yn cael ei ddiffodd yn gyfan os bydd olion nod dŵr yn aros ar ôl diosg."
    ],
    "img": {
     "file": "clean-opts",
     "alt": "Sgrin opsiynau glanhau: y tri blwch ticio o’r grŵp nodau dŵr a chofnodion sbwriel",
     "cap": "Mae’r grŵp “Nodau dŵr a chofnodion sbwriel” ymlaen yn ddiofyn — dim angen gosod llaw"
    }
   },
   {
    "h2": "Review and export :: Adolygu ac allforio",
    "ps": [
     "Yn y rhestr newidiadau, mae pob cofnod a ddiddymwyd yn cario tag “nod dŵr a hysbyseb” — sbytiwch ef i gadarnhau na ddiddymwyd dim trwy gamgymeriad; os bydd un yn edrych yn anghywir, cliciwch “Adfer” i’w roi yn ôl. Unwaith y cadarnheir, lawrlwythwch: mae enw’r ffeil yn cael marc `.clean` yn awtomatig. Mae glanhau yn rhedeg yn lleol yn eich porwr; nid yw eich is-deitlau byth yn cael eu hanci i unrhyw le."
    ]
   }
  ]
 },
 "repair": {
  "seo": {
   "title": "Sut i Atgyweirio Is-deitlau Mojibake – Canfod yr Amgodio – AI-SRTSub",
   "desc": "Cam wrth gam: canfod yr amgodio gwreiddiol (GBK / Big5 / Shift_JIS / EUC-KR), rhestru atgyweiriadau yn ôl yr hyn sy’n darllen fwyaf fel iaith, yna cadw UTF-8 gyda BOM neu GBK. Nid yw amserau a rhifau mynegai byth yn newid.",
   "h1": "Sut i atgyweirio is-deitlau mojibake",
   "intro": "Mae ffeil is-deitlid sy’n llawn cymeriadau sbwriel anaml yn llygredig — dim ond cafodd ei darllen gyda’r amgodio anghywir. Mae’r offeryn atgyweirio yn canfod yr amgodio gwreiddiol ac yn rhoi’r cymeriadau cywir yn ôl, gan adael rhifau mynegai ac amserau ar un ben.",
   "ctaText": "Agor yr offeryn atgyweirio mojibake"
  },
  "body": [
   {
    "h2": "What this tool does :: Beth mae’r offeryn hwn yn ei wneud",
    "ps": [
     "Mae’r un beitiau wedi’u darllen fel UTF-8 a’u darllen fel GBK yn cynhyrchu dau set hollol wahanol o gymeriadau — nid yw’r ffeil wedi’i difrodi, cafodd ei dadgodio gyda’r amgodio anghywir. Dyma beth mae’r offeryn atgyweirio yn ei wneud:"
    ]
   },
   {
    "h2": "Llwythwch y ffeil i fyny, peidiwch â’i gludo",
    "ps": [
     "Gall y ddau bwynt mynediad atgyweirio gwahanol symiau o ddifrod, felly **llwythwch y ffeil i fyny os gallwch chi**. Gyda ffeil, mae’r beitiau gwreiddiol yno o hyd: mae’r offeryn yn ceisio un amgodio ar ôl y llall, ac unwaith y bydd yn cydnabod GBK mae’n dadgodio fel GBK — nid oes angen dyfalu dim. Nid yw testun sy’n cyrraedd trwy gludo yn beitiau crai mwyach. Erbyn i’r porwr drosglwyddo’r llinyn, mae’r camgymeriad eisoes wedi digwydd, felly dim ond gweithio yn ôl a chymryd yr hyn y gall ei gael y gall yr offeryn.",
     "Os yw testun a gludwyd eisoes yn cynnwys y cymeriad disodli (y marc cwestiwn hwnnw wedi’i focsio `�`), mae’r beitiau gwreiddiol wedi mynd ers llawer dydd ac ni all dim eu dwyn yn ôl. Mae’r dudalen yn dweud hynny’n uniongyrchol: ewch yn ôl i fyny a defnyddio \"Dewis ffeil\" i lwytho’r gwreiddiol i fyny."
    ],
    "img": {
     "file": "repair-up",
     "alt": "Ardal lwytho i fyny tudalen atgyweirio: parth gollwng a blwch gludo, gyda’r amgodio a ganfuwyd yn cael ei ddangos uchod",
     "cap": "Llusgwch y ffeil i mewn neu bori amdani; mae’r blwch gludo yn eistedd isod a gall atgyweirio llawer llai"
    }
   },
   {
    "h2": "Beth mae’r diagnosis yn ei ddweud wrthych",
    "ps": [
     "Unwaith y byddwch chi’n llwytho i fyny, mae’r cerdyn diagnosis yn rhoi dyfarniad. **Dim mojibake wedi’i ganfod**: mae’r cynnwys yn darllen yn dda fel y mae; os yw eich chwaraewr yn dangos sbwriel o hyd, defnyddiodd y chwaraewr yr amgodio anghywir — ewch i lawr i \"Cadw fel\", dewiswch un arall a rhoi’r ffeil honno iddo. Pan mae’n **edrych fel mojibake**, mae’r cerdyn yn rhestru pa olion a ddaeth o hyd iddo:"
    ],
    "img": {
     "file": "repair-diag",
     "alt": "Cerdyn diagnosis: dyfarniad ynghyd â phob olion mojibake wedi’u rhestru llinell fesur llinell",
     "cap": "Mae diagnosis yn rhestru olion yn ôl math yn lle dweud \"mojibake ydyw\" yn unig"
    }
   },
   {
    "h2": "Sut mae ymgeiswyr yn cael eu rhestru, a sut i ddewis",
    "ps": [
     "O dan \"Ffyrdd o drwsio hwn\", mae ymgeiswyr wedi’u rhestru yn nhrefn **mwyaf-fel-iaith-wir-yn-gyntaf**, hyd at 12 ohonynt, pob un wedi’i labelu â’r pâr o amgodiadau y cafodd ei ddarllen ohono ac iddo. Cliciwch un i weld sut mae’n edrych, ei ddewis, yna sgroliwch i lawr i gadw. Ddim yn hapus? Defnyddiwch \"Cadw fel y mae\" i ddisgyn yn ôl i’r gwreiddiol.",
     "Daw’r drefn o sgôr: cyfran o gymeriadau cyffredin, llinynnau o acenion, llinynnau o symbolau, waliau o gymeriadau anglud, i gyd wedi’u pwyso i mewn. **Os nad oes sgôr yn amlwg yn well, ni argymhellir dim** — ni fydd yn gwthio ymgeiswyr hanner credadwy atoch dim ond i gael un. Mae testun a gafodd ei niweidio ddwywaith (wedi’i gadw’n anghywir unwaith, yna’n cael ei atgyweirio’n anghywir unwaith) yn cael un rownd ychwanegol o ddatrys yn ôl ar yr ymgeiswyr uchaf, felly gellir achub unrhyw beth o fewn dwy haen o hyd."
    ],
    "img": {
     "file": "repair-fix",
     "alt": "Rhestr atgyweirio ymgeiswyr wedi’i rhestru yn ôl faint mae’n darllen fel iaith wir, pob un wedi’i labelu â’i phâr amgodio",
     "cap": "Ymgeiswyr wedi’u rhestru yn ôl \"mwyaf fel iaith wir\", pob un yn dangos yr amgodiadau sy’n gysylltiedig"
    }
   },
   {
    "h2": "Cadw’n gywir yw’r cam olaf",
    "ps": [
     "Mae angen dal i gadw canlyniad wedi’i atgyweirio’n gywir. Pan na all chwaraewr ddatgan UTF-8, mae cadw fel **UTF-8 gyda BOM** (mae chwaraewyr Windows yn dibynnu ar y BOM) neu fel **GBK** fel arfer yn ei setlo. Gallwch gadw fel UTF-8, UTF-8 (gyda BOM), GBK, Big5, Shift_JIS neu EUC-KR; os nad yw rhywbeth yn ffitio, dywedir wrthych am ddewis un arall (ni all GBK ddal Coreeg). Mae ffeiliau a ddadlwythwyd yn cael `-fixed` wedi’u hychwanegu at yr enw.",
     "Pan nad yw’r amgodio a ganfuwyd yn UTF-8, mae \"Cadw fel\" eisoes wedi’i osod ymlaen llaw i UTF-8 gyda BOM i chi. Unwaith y byddwch chi’n cyffwrdd y gwymplen eich hun, mae’n stopio dyfalu chi."
    ],
    "img": {
     "file": "repair-out",
     "alt": "Ardal canlyniad: blwch testun gyda gwymplen cadw-fel a botwm lawrlwytho",
     "cap": "Dewiswch amgodio, yna lawrlwythwch — mae -fixed yn cael ei ychwanegu at enw’r ffeil"
    }
   },
   {
    "h2": "Beth na fydd byth yn cael ei gyffwrdd",
    "ps": [
     "Dim ond y cymeriadau a ddarllenwyd yn anghywir sy’n cael eu disodli. Nid yw rhifau mynegai, amserau a llinellau arddull ASS yn cael eu newid mewn unrhyw ffordd."
    ]
   },
   {
    "h2": "FAQ :: Cwestiynau Cyffredin",
    "ps": [
     "**Mi wnes i lwytho’r ffeil i fyny, felly pam mae’n rhaid i mi ei chadw eto?** Mae’r ffeil ei hun fel arfer yn iawn; yr hyn sydd wedi torri yw’r chwaraewr yn ei darllen gyda’r amgodio anghywir. Yn yr achos hwnnw nid oes angen newid un cymeriad yn y testun — cadwch gopi fel UTF-8 gyda BOM neu GBK a rhoddwch hwnnw i’r chwaraewr.",
     "**Pam na ellir atgyweirio testun a gludwyd?** Unwaith y bydd y cymeriad disodli yn ymddangos mewn cynnwys a gludwyd, mae’r beitiau gwreiddiol wedi mynd ac nid oes dim i resymu yn ôl ohono. Ewch yn ôl i fyny a defnyddio \"Dewis ffeil\" i lwytho’r gwreiddiol i fyny.",
     "**Nid yw’r ymgeiswyr yr wyf ei eisiau wedi’u rhestru?** Nid argymhellir dim oni bai ei fod yn sgorio yn aml yn well na’r hyn sydd gennych eisoes. Ceisiwch newid yr amgodio a ganfuwyd i un arall a gadael iddo ail-restru.",
     "**Faint o ffeiliau ar unwaith?** Un ar y tro. Lawrlwythwch yr atgyweiriad, yna bwydwch y ffeil nesaf i mewn."
    ]
   },
   {
    "h2": "Privacy :: Preifatrwydd",
    "ps": [
     "Mae canfod ac atgyweirio yn rhedeg yn gyfan gwbl yn eich porwr. Nid yw cynnwys is-deitlid byth yn cael ei anfon i weinydd."
    ]
   },
   {
    "h2": "Offer a chanllawiau cysylltiedig",
    "ps": [
     "O ble mae mojibake yn dod a pham mae’n gorffen felly — gweler [[O ble mae mojibake is-deitlid yn dod|/guides/subtitle-garbled-characters.html]]; mae’r amgodio yn iawn ond mae’r cynnwys yn fudr — defnyddiwch [[Glanhau is-deitlau|/clean.html]]; i wirio amseru a chyflymder darllen — [[Rheoli Ansawdd Is-deitlau|/qc.html]]."
    ]
   }
  ]
 },
 "sbv-to-srt": {
  "seo": {
   "title": "Trawsnewidydd SBV i SRT – Trawsnewid Is-deitlau YouTube – AI-SRTSub",
   "desc": "Trawsnewid is-deitlau SBV a ddadlwythwyd o YouTube yn SRT ar gyfer CapCut, Premiere, a chwaraewyr. Mae gwerthoedd amseru’n aros heb eu cyffwrdd — dim ond y cynllun sy’n newid. Yn rhedeg yn eich porwr.",
   "h1": "SBV to SRT :: SBV i SRT",
   "intro": "Troi is-deitlau SBV YouTube yn SRT: gollwng y ffeil, dewis SRT, lawrlwytho. Mae’r gwerthoedd amseru heb eu cyffwrdd — dim ond y strwythur sy’n newid.",
   "ctaText": "Convert SBV → SRT :: Trawsnewid SBV → SRT"
  },
  "body": [
   {
    "h2": "Beth yw SBV a o ble mae’n dod",
    "ps": [
     "Mae SBV yn **fformat is-deitlid YouTube**: mae lawrlwytho \"ffeiliau is-deitlid\" o YouTube yn aml yn rhoi .sbv i chi. Mae ei strwythur yn symlach na SRT — mae amserau dechrau a gorffen yn eistedd ar **un llinell** wedi’u gwahanu gan goma, mae’r testun yn dilyn yn union o dan hynny, ac nid oes rhifau ciw."
    ]
   },
   {
    "h2": "Pam mae chwaraewyr yn ei wrthod",
    "ps": [
     "Tu allan i YouTube ei hun, nid yw’r mwyaf o feddalwedd golygu a chwaraewyr yn cefnogi SBV. Mae’n ddiffygiol o’r bloc rhifo ac yn ysgrifennu ei linell amser yn wahanol i SRT, felly nid yw ailenwi’r estyniad yn gwneud dim — mae’n rhaid ailadeiladu’r strwythur go iawn."
    ],
    "img": {
     "file": "convert-upload-sbv",
     "alt": "Ardal lwytho i fyny: ffeil SBV wedi’i llwytho, ei chanfod fel SBV",
     "cap": "Mae SBV yn cael ei ganfod fel y mae, dim angen ailenwi estyniad"
    }
   },
   {
    "h2": "How to convert :: Sut i drawsnewid",
    "ps": [
     "Agorwch y [[trawsnewidydd|/convert.html]], gollyngwch yr SBV i mewn, dewiswch **SRT - SubRip** fel y datbusiad, yna trawsnewidiwch a lawrlwythwch. Mae rhifau ciw yn cael eu neilltuo’n ffres, ac mae’r toriadau llinell gwreiddiol y tu mewn i giw yn cael eu uno yn un llinell (mae SRT yn caniatáu ciwiau aml-linell; mae SBV yn cael ei allforio fel un llinell yma)."
    ]
   }
  ]
 },
 "shift": {
  "seo": {
   "title": "Sut i Symud Amseru Is-deitlau (Gwrthbwytsiwr, Graddfa, Dau Angor) – AI-SRTSub",
   "desc": "Cam wrth gam darluniadol o’r golygydd amseru: llwytho is-deitlau, ychwanegu camau addasu, cywiriad dau-angor, mân-drefniadau fesur ciw ac allforio.",
   "h1": "Golygydd Amseru: Canllaw Cam wrth Gam",
   "intro": "Mae’r canllaw hwn yn cerdded yr offeryn o’r brig i’r gwaelod: llwytho is-deitlau, ychwanegu camau addasu, rhedeg y gwiriadau, mân-drefnu fesur ciw, ac allforio.",
   "ctaText": "Agor y golygydd amseru"
  },
  "body": [
   {
    "h2": "Load your subtitles :: Llwythwch eich is-deitlau",
    "ps": [
     "Llusgwch ffeil i mewn i’r blwch dotiog neu cliciwch i ddewis un; gallwch hefyd **gludo’r cynnwys** yn syth i’r blwch testun. Mae’r fformat yn cael ei ganfod o’r estyniad a’r cynnwys, ac mae’r canlyniad yn dangos yn y sglodion fformat. Mewnbwn a gefnogir: srt, vtt, ass (gan gynnwys ssa), sbv, lrc a txt."
    ],
    "img": {
     "file": "shift-upload",
     "alt": "Ardal lwytho i fyny: is-deitlid sampl wedi’i lwytho, ei chanfod fel SRT",
     "cap": "Mae enw’r ffeil a’r fformat a ganfuwyd yn ymddangos o dan y parth gollwng; mae’r blwch testun yn aros yn oladwy."
    }
   },
   {
    "h2": "Add adjustment steps :: Ychwanegu camau addasu",
    "ps": [
     "Mae addasumiadau’n ffurfio **piblinell o gamau**: mae pob cam yn gwneud un swydd ac yn cymryd un rhif, gyda’i uned yn cael ei dangos y tu mewn i’r blwch. Mae camau’n berthnasol o’r brig i’r gwaelod, ac mae newid unrhyw gam yn **ailgyfrifo popeth o’r is-deitlau gwreiddiol** — fel y gallwch chi fynd yn ôl ac addasu rhif ar unrhyw adeg heb wneud llanast."
    ]
   },
   {
    "h2": "Cywiriad dau-angor",
    "ps": [
     "Pan nad ydych chi’n gwybod y gwrthbwytsiwr mewn eiliadau na’r gymhareb, defnyddiwch ddau angor: unwaith y’u hychwanegir, mae’r **dau faes \"cyfredol\" yn cael eu llenwi’n awtomatig** o giw cyntaf ac olaf eich ffeil. Rydych chi’n llenwi’r meysydd \"targed\" yn unig — yr amserau y dylai’r ciwiau hynny ymddangos mewn gwirionedd. Mae popeth rhyngddynt yn cael ei ail-wasgaru’n gyfrannol."
    ],
    "img": {
     "file": "shift-step-two",
     "alt": "Cywiriad dau-angor: amserau cyfredol wedi’u llenwi’n awtomatig, amserau targed i’w cofnodi",
     "cap": "Daw’r meysydd cyfredol o’r ffeil; yr amserau targed yw’r amserau cywir a welwch yn y fideo."
    }
   },
   {
    "h2": "Gwiriad llinell amser a mân-drefniadau fesur ciw",
    "ps": [
     "Ar ôl rhedeg y camau, darllenwch y **gwiriad llinell amser**: mae ciwiau sy’n rhy byrrau, yn rhy hir, yn rhy drwchus i’n darllen, llinellau sy’n rhy eang, neu giwiau sy’n gorgyffiri i gyd yn cael eu rhestru. Mae’r gwiriad yn **fflagio materion yn unig ac nid yw byth yn newid dim** ar ei ben in. Y pedwar rheolwr diofyn yw hyd lleiaf o 0.833 eiliad, uchafswm o 7, cyflymder darllen o 9 cymeriad yr eiliad a 21 cymeriad fesur llinell — pob un yn addasadwy ar y dudalen. Isod, mae mân-drefniadau fesur ciw yn eich galluogi i uno dau giw cyfagos, hollti un, neu olygu ei ddechrau a’i ddiwedd yn uniongyrchol; gellir dad-wneud pob golygiad."
    ]
   },
   {
    "h2": "Export the result :: Allforio’r canlyniad",
    "ps": [
     "Mae’r panel canlyniad yn dangos yr amserau gwreiddiol a addaswyd **ochr yn ochr** ar gyfer gwirio fanwl hawdd. Mae’r fformat datbusiad yn ddiofyn i’r fformat mewnbwn, ond gallwch chi newid i unrhyw un o srt, vtt, ass, sbv, lrc neu txt cyn lawrlwytho."
    ],
    "img": {
     "file": "shift-result",
     "alt": "Panel canlyniad: amserau cyn ac ar ôl ochr yn ochr, gyda botymau lawrlwytho a chopïo",
     "cap": "Amserau gwreiddiol ar y chwith, wedi’u haddasu ar y dde; lawrlwythwch unwaith y bydd y gwiriad fanwl yn edrych yn gywir."
    }
   }
  ]
 },
 "shift-subtitle-timing": {
  "seo": {
   "title": "Sut i Symud Pob Is-deitlid yn Gynharach neu’n Hwyrach – AI-SRTSub",
   "desc": "Mae pob ciw yn hwyr gan yr un swydd yma: defnyddiwch gam symud y golygydd amseru — cofnodwch un rhif negyddol neu bositif a bydd pob ciw yn symud gyda’i gilydd.",
   "h1": "Symud y Ffeil Is-deitlid Gyfan yn Gynharach neu’n Hwyrach",
   "intro": "Mae’r sain yn dechrau, mae’r is-deitlid yn ymddangos yn hwyr — ac mae pob un ciw yn hwyr gan yr un swydd. Gwrthbwytsiwr unffurf yw hwnnw: mae un rhif yn ei drwsio.",
   "ctaText": "Agor y golygydd amseru"
  },
  "body": [
   {
    "h2": "Yn gyntaf cadarnhewch fod pob ciw yn hwyr gan yr un swydd",
    "ps": [
     "Gwiriwch un ciw ger y dechrau, un yn y canol ac un ar y diwedd. Os yw’r tri yn hwyr gan fras yr un swydd, mae’n **wrthbwytsiwr unffurf**, ac mae un cam symud yn ei drwsio. Os yw’r dechrau yn gywir ac mae’r crwydro yn tyfu tuag at y diwedd, mae honno’n broblem wahanol — gweler [[is-deitlau yn cael mwy a mwy allan o gydamseriad|/guides/subtitles-out-of-sync.html]]."
    ]
   },
   {
    "h2": "Beth i’w gofnodi: negyddol i symud ymlaen, positif i oedi",
    "ps": [
     "Yn y golygydd amseru, ychwanegwch gam **Symud pob un** a chofnodwch y gwrthbwytsiwr yn y blwch gwerth: mae is-deitlau sy’n rhedeg yn hwyr yn cymryd rhif negyddol i’u tynnu’n gynharach; mae rhedeg yn gynnar yn cymryd rhif positif i’u gwthio’n hwyrach. Os yw’r is-deitlau yn 1.5 eiliad yn hwyr, cofnodwch **-1.5** — yr uned yw eiliadau."
    ],
    "img": {
     "file": "shift-step-shift",
     "alt": "Cam symud pob un gyda -1.5 eiliad wedi’u cofnodi",
     "cap": "Mae rhif negyddol yn tynnu’r ffeil gyfan yn gynharach; mae’r uned wedi’i hysgrifennu y tu mewn i’r blwch, mewn eiliadau."
    }
   },
   {
    "h2": "Rhedwch ef a gwiriwch y ciw cyntaf",
    "ps": [
     "Ar ôl cymhwyso, mae’r panel canlyniad yn rhestru amserau gwreiddiol a newydd pob ciw **ochr yn ochr**. Gwiriwch y ciw cyntaf yn gyntaf: a yw’r amser dechrau newydd yn glanio ar y ffrâm y mae’r llinell yn cael ei siarad arni? Yna gwiriwch un yn y canol. Mae pob ciw yn symud gan yr un swydd ac yn cadw ei hyd ei hun."
    ]
   },
   {
    "h2": "Export :: Allforio",
    "ps": [
     "Unwaith y bydd y gwiriad fanwl yn edrych yn gywir, lawrlwythwch yn uniongyrchol. Mae’r fformat datbusiad yn ddiofyn i’r fformat mewnbwn a gellir ei newid i rywbeth arall. Mae’r newid yn cyffwrdd amserau yn unig — nid un cymeriad sengl o destun."
    ]
   }
  ]
 },
 "simplified-traditional-chinese": {
  "seo": {
   "title": "Nid Cyfnewid Cymeriad Yw — Un-i-Bawb a Geiriau Rhanbarthol – AI-SRTSub",
   "desc": "Mae tri pheth yn gwneud hyn yn anodd: mapiau un-i-lawer wedi’u datrys yn ôl gair, geirfa wahanol Taiwan a Hong Kong, a thrawsnewid deialog yn unig. Cael y tri yn gywir ac ni fydd unrhyw ail-weithio dynol yn dilyn.",
   "h1": "Nid cyfnewid cymeriad yw syml vs traddodiadol",
   "intro": "Pa gymeriad traddodiadol sy’n disodli un syml yn dibynnu ar y cymeriad nes af ato. Dyna pam na ellir gwneud y trawsnewid hwn drwy gyfnewid un cymeriad ar y tro yn ddall.",
   "ctaText": "Open the converter :: Agor y trawsnewidydd"
  },
  "body": [
   {
    "h2": "Yn gyntaf: un ffurf syml, sawl un draddodiadol",
    "ps": [
     "Roedd symleiddio wedi cwympo sawl cymeriad traddodiadol yn un ffurf syml. Mynd yn ôl y ffordd arall, mae un cymeriad syml yn cyfateb i sawl un traddodiadol, ac mae dewis rhyngddynt yn dibynnu ar yr hyn y mae wedi’i baru ag ef:",
     "Mae cyfnewid cymeriad fesur cymeriad yn eu cwympo i gyd i’r un peth ac yn cael pob achos yn anghywir. Datrys **yn ôl gair** yw’r hyn sy’n eu gwahanu — daw’r tablau o OpenCC, gan gydweddu ymadroddion cyn cymeriadau sengl. Er enghraifft:"
    ]
   },
   {
    "h2": "Yn ail: nid yw Taiwan a Hong Kong yr un peth",
    "ps": [
     "Mae un haen arall ar ôl trawsnewid i draddodiadol: mae’r un gair yn cael ei ysgrifennu’n wahanol yn Taiwan a Hong Kong. Mae’r gair am \"feddalwedd\" yn un peth yn Taiwan ac yn un arall yn Hong Kong, a mae Taiwan yn defnyddio ei air ei hun am \"wybodaeth\".",
     "Felly’r cyfarwyddiadau ar wahân. Mae traddodiadol Taiwan hyd yn oed yn hollti yn \"newid geiriad\" a \"glyffau yn unig\" — mae glyffau yn unig yn cadw eich geirfa bresennol, tra bod newid geiriad yn cyfnewid telerau rhanbarthol hefyd. Mae Hong Kong yn cael cyfeiriad ei hun."
    ],
    "img": {
     "file": "hanconv-dir",
     "alt": "Trawsnewid i gerdyn: gwymplen cyrchfan yn dangos \"Syml → Traddodiadol Taiwan (newid geiriad)\"",
     "cap": "Mae Taiwan yn cynnig newidiadau geiriad neu glyffau yn unig; mae gan Hong Kong ei gyfeiriad ei hun"
    }
   },
   {
    "h2": "Yn drydydd: dim ond deialog y dylid ei gyffwrdd",
    "ps": [
     "Nid deialog yn unig yw ffeil is-deitlid. Mae rhifau mynegai, amserau a llinellau arddull ASS yno hefyd, ac ni ddylid trawsnewid un cymeriad o rheini — llinellau arddull ASS yn enwedig, oherwydd maen nhw’n cynnwys enwau cyfarwyddyd Saesneg sy’n torri yr eicon y cânt eu trin fel deialog.",
     "Felly mae trawsnewid yn digwydd ar ôl dadansoddi yn ôl fformat: mae SRT, VTT, ASS a TXT pob un yn nodi pa ran sy’n ddeialog, a dim ond y cymeriadau y tu mewn iddo sy’n cael eu trawsnewid. Mae amserau ac arddulliau’n goroesi heb eu cyffwrdd, heb unrhyw fformatio i’w ail-wneud."
    ],
    "img": {
     "file": "hanconv-out",
     "alt": "Ardal canlyniad: is-deitlid a thrawsnewidiwyd a bar ystadegau yn dangos nifer y llinellau a newidiwyd",
     "cap": "Mae’r bar ystadegau yn dangos sawl llinell a newidiodd; mae fformatio yn cael ei gadw fel y mae"
    }
   },
   {
    "h2": "Mynd yn ôl i syml: gwyliwch allan",
    "ps": [
     "Mae trawsnewid traddodiadol yn syml hefyd angen i chi ddweud **pa amrywiaeth draddodiadol y rydych chi’n dod ohoni**: mae generig, Taiwan a Hong Kong yn dair llwybr gwahanol, oherwydd mae’n rhaid adfer geirfa ranbarthol i’r gair generig cyn y gellir ei thrawsnewid. Dewiswch y cyfeiriad anghywir ac mae geirfa ranbarthol yn goroesi i’r datbusiad syml.",
     "Y grŵp isaf o’r naw cyfeiriad yw’r un sy’n trawsnewid yn ôl: traddodiadol → syml, Taiwan → syml, Hong Kong → syml."
    ]
   },
   {
    "h2": "Offer a chanllawiau cysylltiedig",
    "ps": [
     "Y cam wrth gam llawn — [[Sut i drawsnewid is-deitlau syml a thraddodiadol|/guides/hanconv.html]]; os y cyfan sydd ei angen arnoch yw syml i draddodiadol — [[Trawsnewid is-deitlau syml i draddodiadol|/guides/srt-simplified-to-traditional.html]]; i gyfieithu i iaith arall, [[Cyfieithu is-deitlau|/translate.html]]."
    ]
   }
  ]
 },
 "split": {
  "seo": {
   "title": "Rhannu ac unois isdeitlau – Torri fesur bloc, cadwyno yn nhrefn – AI-SRTSub",
   "desc": "Torri un ffeil yn segmentau yn ôl hyd neu gyfrif ciwiau, ailddechrau pob un ar ddim, neu gadwyno sawl ffeil yn nhrefn neu eu rhyngddodi drwy’r llinell amser. Rhifau ciwiau wedi’u hailrifu, testun heb ei gyffwrdd.",
   "h1": "Sut i rannu ac uno isdeitlau",
   "intro": "Torri un ffeil isdeitlau hir yn segmentau, neu uno sawl ffeil wasgaredig yn un. Mae’r toriad bob amser yn syrthio ar ffin cofnod — chaiff brawdd hanner torri byth.",
   "ctaText": "Agor rhannu ac uno"
  },
  "body": [
   {
    "h2": "Beth mae’r offeryn hwn yn ei wneud",
    "ps": [
     "Mae rhannu penodau, rhannu segmentau a chyfuno ffynonellau i gyd yn arwain at yr un anghydweddiad rhwng blociau isdeitlau a blociau fideo: mae’n rhaid torri un ffeil neu gyfuno sawl un. Mae’r dudalen hon yn trin y ddau, un tab yr un."
    ]
   },
   {
    "h2": "Dewis torri neu uno yn gyntaf",
    "ps": [
     "Dau dab ar y brig: **Rhannu: un ffeil yn segmentau** a **Uno: sawl ffeil yn un**. Mae’r opsiynau cam dau isod yn newid yn ôl eich dewis.",
     "Yn \"1 Ychwanegu isdeitlau\" rydych chi’n uwchlwytho ffeil neu’n pastio testun; os gwnaethoch chi ddewis yr un anghywir, cliciwch \"Clirio\". Dim ond UTF-8 mae’r dudalen hon yn ei ddarllen — os yw’r amgodio wedi torri (wal o farciau cwestiwn neu flychau) ewch i [[Atgyweirio testun llygredig|/repair.html]] yn gyntaf."
    ],
    "img": {
     "file": "split-mode",
     "alt": "Y dau dab ar frig y dudalen rhannu ac uno",
     "cap": "Mae torri ac uno yn ddau dab; mae’r opsiynau cam dau yn dilyn eich dewis"
    }
   },
   {
    "h2": "Sut i dorri",
    "ps": [
     "O dan \"2 Sut i dorri\" dewiswch y sail: **hyd** (un segment bob X munud) neu **cyfrif ciwiau** (un segment bob X ciw), yna rhowch rif.",
     "Ticiwch \"Ailddechrau pob segment ar 0 : 00\" ac mae pob segment canlyniad yn cyfrif o ddim - defnyddiwch hwn pan fyddwch chi’n uwchlwytho penodau ac yn rhoi pob segment i chwaraewr ar ei ben ei hun. Gadewch ef heb ei dicio i gadw’r stampiau amser gwreiddiol, fel bod pob segment yn dal i alinio â’i safle yn y fideo ffynhonnell.",
     "Dim ond ar ffiniau ciwiau y mae’r toriad yn syrthio: pan fydd isdeitlau hir iawn yn rhychwantu pwynt y toriad, mae’r ciw cyfan yn aros yn y segment cynharach."
    ],
    "img": {
     "file": "split-cut",
     "alt": "Yr opsiynau hyd a chyfrif ciwiau gyda’r switsh ailddechrau-ar-ddim ar y dudalen rhannu",
     "cap": "Torri yn ôl hyd neu gyfrif ciwiau, a dewisol ailddechrau pob segment ar 0 : 00"
    }
   },
   {
    "h2": "Sut i uno",
    "ps": [
     "O dan \"2 Sut i uno\" dewiswch y dull: Mae **Cadwyno yn nhrefn** yn symud y ffeil ddiweddarach fel ei bod yn dechrau ar ôl i’r un gynharach orffen, heb orgyffwrdd rhwng segmentau; Mae **Rhyngddodi drwy linell amser** yn cadw stampiau amser gwreiddiol pob ffeil ac yn trefnu yn ôl amser dechrau.",
     "Defnyddiwch gadwyno yn nhrefn pan fydd y ffeiliau yn hanner cyntaf ac ail hanner pennod, neu pan fydd hannerau a broffwydwyd ar wahân yn gorfod cael eu rhoi at ei gilydd; defnyddiwch ryngddodi drwy linell amser pan fydd y ffeiliau yn perthyn ar y sgrin gyda’+$’ ei gilydd, megis trac gwreiddiol a thrac a gyfieithwyd.",
     "Ar ôl uno, caiff y rhifau ciwiau eu hailrifu yn awtomatig ac nid yw gair o ddeialog yn newid."
    ],
    "img": {
     "file": "split-join",
     "alt": "Yr opsiynau cadwyno-yn-nhrefn a rhyngddodi-drwy-linell-amser ar y dudalen uno",
     "cap": "Mae cadwyno yn nhrefn yn addas ar gyfer dau hanner pennod; mae rhyngddodi drwy linell amser yn addas ar gyfer trac gwreiddiol a thrac a gyfieithwyd"
    }
   },
   {
    "h2": "Cymryd y canlyniad i ffwrdd",
    "ps": [
     "Mae \"3 Canlyniad\" ar y dde yn allforio **SRT** a **VTT**; cliciwch \"Lawrlwytho\" neu \"Copïo\".",
     "Wrth rannu gallwch ddefnyddio \"Lawrlwytho pob segment\", sy’n cadw pob segment wedi’i dorri ar unwaith yn lle un clic fesur segment."
    ],
    "img": {
     "file": "split-out",
     "alt": "Y dewis fformat SRT/VTT gyda botymau lawrlwytho a lawrlwytho-pob-segment yn yr ardal ganlyniadau",
     "cap": "Gellir lawrlwytho canlyniadau rhannu segment fesur segment; mae ffeil wedi’i uno yn cael ei lawrlwytho neu ei gopïo’n uniongyrchol"
    }
   },
   {
    "h2": "Beth sy’n cael ei adael heb ei gyffwrdd",
    "ps": [
     "Nid yw cymeriad o ddeialog yn newid. Dim ond pa ciwiau sy’n perthyn i ba segment a sut maen nhw’n cael eu rhifo mae’r dudalen hon yn ei newid; mae cynnwys y cofnodion yn aros fel y maen nhw.",
     "Gyda \"Cadwyno yn nhrefn\" caiff stampiau amser y ffeiliau diweddarach eu symud fel cyfanwaith — dyna mae uno yn ei thestygu; gyda \"Rhyngddodi drwy linell amser\" caiff pob stamp amser gwreiddiol ei gadw."
    ]
   },
   {
    "h2": "Cwestiynau cyffredin",
    "ps": [
     "**Beth os bydd y segment olaf yn gorffen yn fyr iawn?** Mae hynny’n arferol. Y gweddill nad yw’n llenwi segment cyfan yw ei segment ei hun yn lle cael ei badio.",
     "**A fydd brawdd sy’n rhychwantu pwynt y toriad yn cael ei rannu?** Na fydd. Mae toriadau’n syrthio ar ffiniau cofnod yn unig, ac mae ciw sy’n croesi’r llinell yn aros yn y segment cynharach.",
     "**Ar ôl rhyngddodi, sut mae dau giw gydag amseroedd unfath yn cael eu trefnu?** Yn ôl amser dechrau; pan fo’اعات dechrau yn gyfartal, cedwir y drefn y gwnaethoch ychwanegu’r ffeiliau ynddi.",
     "**A ellir rannu ASS?** Mae’r dudalen hon yn trin SRT a VTT. Trosglwyddwch ASS i SRT neu VTT gyda [[Trosi fformat|/convert.html]] yn gyntaf."
    ]
   },
   {
    "h2": "Preifatrwydd",
    "ps": [
     "Mae isdeitlau yn cael eu prosesu’n gyfan gwbl yn y porwr: ni chaiff dim ei uwchlwytho a does dim yn mynd drwy weinydd. Cau’r dudalen ac mae’r cynnwys wedi mynd."
    ]
   },
   {
    "h2": "Offer a chanllawiau cysylltiedig",
    "ps": [
     "I gyfuno dwy ffeil yn drac dwyieithog (yn hytrach nag i un bennod) defnyddiwch [[Cyfuno dwyieithog ac effeithiau arbennig|/guides/merge.html]]; os yw’r llinell amser gyfan i ffwrdd ewch i [[Addasu llinell amser|/shift.html]]; ar gyfer gwerth tymor cyfan defnyddiwch [[Trosi swp|/batch.html]]; a rhedeg [[QC Isdeitlau|/qc.html]] pan fyddwch wedi gorffen."
    ]
   }
  ]
 },
 "split-bilingual-subtitles": {
  "seo": {
   "title": "Rhannu Isdeitlau Dwyieithog yn Ddau Trac – AI-SRTSub",
   "desc": "Rhannu isdeitlau dwyieithog yn ddwy ffeil: mae traciau gwreiddiol a chyfieithu yn lawrlwytho ar wahân enwau gwahanol; cydnabyddir y ddau ffurf. – AI-SRTSub",
   "h1": "Rhannu Isdeitlau Dwyieithog yn Ddau Trac",
   "intro": "Mae un isdeitl dwyieithog yn dod yn ddwy ffeil — “gwreiddiol” a “chyfieithu”: uwchlwytho, dewis rhannu-yn-ddau, lawrlwytho pob un, gyda’r llinellau amser yn cael eu cadw’n gyfan.",
   "ctaText": "Rhannu isdeitlau dwyieithog"
  },
  "body": [
   {
    "h2": "Pan fydd angen i chi rannu",
    "ps": [
     "Dim ond trac un-iaith y mae eich chwaraewr ei eisiau; neu rydych chi eisiau’r trac cyfieithu ar gyfer ail-gyfieithu, neu’r trac gwreiddiol i’w baru â fersiwn gyfieithiedig arall. Mae isdeitl dwyieithog naill ai’n **un ciw gyda dwy linell** (gwreiddiol ar un linell, cyfieithiad ar y llall) neu **dau giw ar wahân yn rhannu’r un llinell amser** — gellir rannu’r ddau."
    ]
   },
   {
    "h2": "Ble i’w wneud",
    "ps": [
     "Agorwch y [[Tynnydd Isdeitlau Dwyieithog|/bilingual.html]] a gollwng eich isdeitl i mewn. Mae’r offeryn yn canfod y ffurf dwyieithog yn awtomatig: mae un ciw gyda dwy linell yn cael ei rannu trwy system ysgrifennu, dau giw ar yr un llinell amser trwy drefn. Dewiswch **Rhannu yn ddau** yn y ddewislen ostwng modd a chliciwch Dechrau (neu gadewch iddo redeg eto’n awtomatig). Mae’r ardal ganlyniadau yn dangos dau ddarn: yr un sydd â’r tag `.orig` yw’r trac gwreiddiol, yr un sydd â’r tag `.dst` yw’r trac cyfieithu — cliciwch “Lawrlwytho” ar gyfer pob un; mae’r ddau drac yn rhannu’r un union linell amser."
    ],
    "img": {
     "file": "bilingual-split",
     "alt": "Canlyniad rhannu: y trac gwreiddiol a’r trac cyfieithu fel dau ddarn, pob un gyda botymau lawrlwytho",
     "cap": "Rhannu yn ddau: .orig trac gwreiddiol + .dst trac cyfieithu, lawrlwytho pob un ar ei ben ei hun"
    }
   },
   {
    "h2": "Un perygl cyffredin",
    "ps": [
     "**Ni ellir rannu un ciw gyda dwy linell mewn ie那时候 sy’n rhannu’r un wyddor (dyweder Saesneg a Ffrangeg).** Pan fydd traciau’n cael eu gwahanu gan system ysgrifennu, mae’r rhai hynny’n cyfrif fel un system ac yn cael eu trin fel rhai uniaith. Trosglwyddwch gynnwys o’r fath i ffurf yr un llinell amser B yn gyntaf, yna rhannwch; mae’r ffurf dau giw yn paru yn ôl llinell amser ac nid yw’n malio am iaith. Ar gyfer manylion y ddwy ffurf, gweler [[Dwy ffordd i wneud isdeitlau dwyieithog|/guides/make-bilingual-subtitles.html]]."
    ]
   }
  ]
 },
 "srt-file-format": {
  "seo": {
   "title": "Beth yw Ffeil SRT? Sut i’w Agor a’i Golygu – AI-SRTSub",
   "desc": "Anatomeg ffeiliau isdeitlau SRT (SubRip): rhif, llinell amseru, testun. Sut i agor un mewn golygydd testun, pam mae chwaraewr yn ei wrthod, a sut i drwsio testun llygredig a gwallau stamp amser.",
   "h1": "Esbonio Fformat Ffeil SRT",
   "intro": "SRT yw’r fformat isdeitlau mwyaf cyffredinol: testun plaen, strwythur syml, derbynnir bron ym mhob man. Mae’r canllaw hwn yn datgymalu ei strwythur, sut i’w agor, a sut i drwsio methiannau cyffredin.",
   "ctaText": "Agor y trosi isdeitlau"
  },
  "body": [
   {
    "h2": "Sut olwg sydd ar ffeil SRT",
    "ps": [
     "Mae SRT (SubRip) yn destun plaen — mae unrhyw olygydd testun yn ei agor. Mae gan bob ciw dair rhan: **llinell rhif**, **llinell amseru**, a’r **testun**, wedi’u hanaien gan linellau gwag. Mae’r llinell amseru yn darllen `00:00:01,000 --> 00:00:03,500` — sylwch ar y **comi** cyn yr milieiliadau, nid dot."
    ],
    "img": {
     "file": "convert-upload",
     "alt": "Ardal uwchlwytho: ffeil SRT wedi’i lwytho yn dangos rhifau ac amseru",
     "cap": "Ciw tair rhan safonol SRT: rhif, llinell amseru, testun"
    }
   },
   {
    "h2": "Sut i’w agor",
    "ps": [
     "I ddarllen y cynnwys: cliciwch ar y dde a’i agor gydag unrhyw **olygydd testun**. I’w ddefnyddio gyda fideo: ailenw’r ffeil i **gyfateb i enw ffeil y fideo** (estyniad o’r neilltu), rhoi’r ddau yn yr un ffolder, ac mae chwaraewray fel VLC, PotPlayer, neu mpv yn ei lwytho’n awtomatig; gallwch hefyd ei lusgo ar yr ffenestr chwarae."
    ]
   },
   {
    "h2": "Trwsio gwrthodiadau a thestun llygredig",
    "ps": [
     "**Nodau llygredig**: nid UTF-8 yw’r ffeil — cadwch hi fel UTF-8 yn eich golygydd. **Dim yn dangos**: gwiriwch fod y llinell amseru yn defnyddio comi (nid dot) ac nad yw rhifau ciwiau wedi torri (mae’r rhan fwyaf o chwaraewyr yn goddef bylchau, nid yw rhai). **HTML neu JSON yw’r ffeil** ; roedd ffynhonnell y lawrlwytho yn anghywir; ewch i’w chael eto."
    ]
   },
   {
    "h2": "Beth y gall SRT ei ddal a’ന്നും gall ei ddal",
    "ps": [
     "Mae SRT yn cario testun ac amseru yn unig: **dim steiliau** (ffontiau, lliwiau), **dim lleoli** (ble ar y sgrin), **dim effeithiau**. Mae angen ASS ar y rheinak — gweler [[SRT i ASS|/guides/srt-to-ass.html]]. Ar gyfer cyd-fynd o bob fformat, gweler [[cymhariaeth fformat isdeitlau|/guides/subtitle-format-comparison.html]]."
    ]
   }
  ]
 },
 "srt-fps-converter": {
  "seo": {
   "title": "Trawsnewidydd FPS SRT – Newid Cyfradd Ffrâm Isdeitlau – AI-SRTSub",
   "desc": "Ffilm yw 24fps, darlledu yw 25fps, ac mae isdeitlau’n driftio mwy bob munud: graddiwch y llinell amser gan 0.96 unwaith ac mae’r ffeil gyfan yn glanio ar y gyfradd darged.",
   "h1": "Trosi Cyfradd Ffrâm Isdeitlau: 24fps i 25fps",
   "intro": "Chwarae isdeitlau ffilm 24fps ar ffynhonnell 25fps ac maen nhw’n colli dros eiliad bob munud — erbyn y credydau diwedd maen nhw funudau ar ôl. Mae un graddio yn ei drwsio.",
   "ctaText": "Agor y golygydd amseru"
  },
  "body": [
   {
    "h2": "Pam mae anghydweddiad cyfradd ffrâm yn gwneud isdeitlau’n driftio",
    "ps": [
     "Mae trosi cyfradd ffrâm yn ail-ddarllen **yr un rhychwant o amser o dan ddau gloc gwahanol**. Mae gan ffilm 24fps 100 munud 6000 s × 24 = ** 144,000 ffrâm**; ar ffynhonnell 25fps mae’r framiau 144,000 hynny’n chwarae mewn 5760 eiliad — ** 96 munud**. Mae’r ffilm gyfan yn rhedeg 4 munud yn fyr, felly mae ciw ym munud 50 yn ymddangos tua 2 munud yn hwyr, ac nid yw isdeitlau’r credydau diwedd yn dangos o gwbl."
    ]
   },
   {
    "h2": "Y fformiwla a’r ffactorau cyffredin",
    "ps": [
     "Cyfradd darged ÷ cyfradd wreiddiol = y lluosydd. **24 i 25: lluosi â 0.96** (24÷25); y ffordd arall, 25 i 24: 1.0417. **25 i 23.976: lluosi â 0.959**; y ffordd arall: 1.0427. Yn y golygydd amseru ychwanegwch gam **Graddio yn ôl cyfradd** a rhowch y ffactor yn y blwch gwerth."
    ],
    "img": {
     "file": "shift-step-rate",
     "alt": "Graddio yn ôl cam cyfradd gyda 0.96 wedi’i gofnodi",
     "cap": "Mae 0.96 yn 24÷25; mae’r awgrym ar y dudalen hyd yn oed yn sôn am drosi cyfradd ffrâm fel defnydd cyffredin."
    }
   },
   {
    "h2": "Pan nad ydych chi’n gwybod y ddwy gyfradd",
    "ps": [
     "Os na allwch chi ddod o hyd i gyfradd ffrâm y ffynhonnell, peidiwch â dyfalu’r ffactor — defnyddiwch **ddau angor** yn lle hynny: cymerwch wir amser ymddangosiad y ciw cyntaf a’r olaf fel dau bwynt, ac mae popeth yn y canol yn cael ei ymestyn yn ôl yn gymesur. Gweler [[isdeitlau yn dod yn fwy a mwy allan o gydamseru|/guides/subtitles-out-of-sync.html]]."
    ]
   },
   {
    "h2": "Beth i’w wirio wedyn",
    "ps": [
     "Mae graddio yn symud pob dechrau a diwedd; mae hydoedd ciwiau yn ymestyn gan yr un ffactor. Ar ôl rhedeg, gwiriwch y ddau eithaf: y ciw cyntaf (gwall gwreiddiol lleiaf) a’r olaf (mwyaf). Os yw’r ddau ben yn cyd-fynd, mae popeth yn y canol yn gwneud hynny hefyd."
    ]
   }
  ]
 },
 "srt-simplified-to-traditional": {
  "seo": {
   "title": "Trosi Isdeitlau Syml i Draddodiadol – Taiwan neu Hong Kong – AI-SRTSub",
   "desc": "Troi isdeitlau Tsieineaidd syml i draddodiadol: dewiswch Taiwan (gyda neu heb eirfa ranbarthol) neu Hong Kong. Mae mapiau un-i-lawer yn datrys yn ôl gair. Dim ond deialog sy’n newid; mae amseru’n aros yn ei le.",
   "h1": "Trosi isdeitlau syml i draddodiadol",
   "intro": "Dim ond troi sydd angen isdeitl Tsieineaidd syml sy’n mynd at gynulleidfa yn Taiwan neu Hong Kong — ond mae’r ddau ranbarth eisiau pethau gwahanol, ac mae dewis y cyfeiriad anghywir yn rhoi geiriau nad yw’r bobl leol yn eu defnyddio.",
   "ctaText": "Trosi’r isdeitl hwn"
  },
  "body": [
   {
    "h2": "Y angen",
    "ps": [
     "Mae eich isdeitlau yn Tsieineaidd syml ac mae’n rhaid iddynt gyrraedd gwylwyr yn Taiwan neu Hong Kong. Nid yw trwsio’r nodau fesur un yn realistig — mae gan un bennod gannoedd o giwiau — ac nid yw’r ddau ranbarth eisiau’r un testun traddodiadol: mae’r eirfa’n wahanol, ac mae’r cyfeiriad anghywir yn cynhyrchu geiriau na fyddai unrhyw leol yn eu defnyddio."
    ]
   },
   {
    "h2": "Ble i’w wneud",
    "ps": [
     "Agorwch [[Trosi syml-traddodiadol|/hanconv.html]], llusgwch yr isdeitl i mewn, a dewiswch un o’r cyfeiriad syml → traddodiadol o dan \"Trosi i\": traddodiadol generig, Taiwan (newid geirfa), Taiwan (glipiau yn unig) neu Hong Kong. Mae trosi’n digwydd ar unwaith ac mae’r ardal ganlyniadau yn dangos yr isdeitl gorffenedig, yn barod i’w lawrlwytho.",
     "**Ar gyfer cynulleidfa yn Taiwan**: dewiswch \"Taiwan (newid geirfa)\" os dylai geirfa ranbarthol newid hefyd — mae \"meddalwedd\" a \"gwybodaeth\" yn dod yn gyfatebion Taiwan — neu \"Taiwan (glipiau yn unig)\" os ydych chi eisiau i siapiau’r nodau newid wrth gadw eich geirfa wreiddiol. **Ar gyfer cynulleidfa yn Hong Kong**: dewiswch \"Hong Kong\", lle mae \"meddalwedd\" yn cael ei ysgrifennu gyda ffurf arall eto."
    ],
    "img": {
     "file": "hanconv-dir",
     "alt": "Cerdyn trosi i: dewislen ostwng cyrchfan yn dangos \"Syml → Traddodiadol Taiwan (newid geirfa)\"",
     "cap": "Mae Taiwan a Hong Kong yn gyfeiriadau ar wahân gydag eirfa wahanol"
    }
   },
   {
    "h2": "Peryglon cyffredin",
    "ps": [
     "**Peidiwch ag ofni mapiau un-i-lawer**: mae’r un cymeriad syml yn y geiriau ar gyfer \"glân\", \"sych\" a \"phren pren\" yn mapio i gymeriadau traddodiadol gwahanol. Mae’r tablau yn datrys hyn trwy ymadrodd, felly nid yw popeth yn cael ei wastatáu i un cymeriad.",
     "**Dim ond deialog sy’n cael ei drosi**: mae amseru, rhifau mynegai a llinellau steil ASS heb eu cyffwrdd, felly mae’r canlyniad yn barod i’w ddefnyddio.",
     "**Dim wedi newid? Gwiriwch cyn i chi banicio**: os yw’r bar ystadegau yn adrodd 0 llinellau wedi’u newid, nid oes gan y ffeil unrhyw gymeriadau Tsieineaidd neu cafodd y fformat ei ganfod yn anghywir — gwiriwch fod \"Fformat a ganfuwyd\" yn cyfateb i’r hyn a uwchlwythwyd gennych."
    ]
   },
   {
    "h2": "Cysylltiedig",
    "ps": [
     "Esboniad llawn o’r naw cyfeiriad i gyd — [[Sut i drosi isdeitlau syml a thraddodiadol|/guides/hanconv.html]]; pam ei fod yn fwy na chyfnewid nodau — [[Nid yw syml vs traddodiadol yn gyfnewid nodau|/guides/simplified-traditional-chinese.html]]; mae traddodiadol yn ôl i syml hefyd yn byw yn [[Trosi syml-traddodiadol|/hanconv.html]]."
    ]
   }
  ]
 },
 "srt-to-ass": {
  "seo": {
   "title": "Trawsnewidydd SRT i ASS – Trosi Isdeitlau Ar-lein – AI-SRTSub",
   "desc": "Trosi isdeitlau SRT i ASS (Advanced SubStation Alpha) gyda chanfas 1920×1080 a steil diofyn glân, yn barod i’w lwytho o’r neilltu mewn unrhyw chwaraewr. Yn rhedeg yn eich porwr.",
   "h1": "SRT i ASS",
   "intro": "Troi isdeitlau SRT yn ASS: gollwng y ffeil, dewis ASS, lawrlwytho. Mae canfas 1920×1080 a steil diofyn glân yn cael eu cynhóchi i chi.",
   "ctaText": "Trosi SRT → ASS"
  },
  "body": [
   {
    "h2": "Pan fydd angen ASS arnoch chi",
    "ps": [
     "Defnyddiwch ASS pan fydd angen **rheolaeth well ar leoli a steil** ar isdeitl a lwythwyd o’r neilltu: mae’n cario cysyniadau nad oes gan SRT — maint y canfas, steiliau ffont, aliniad. Mae mpv, PotPlayer, VLC, a’r rhan fwyaf o chwaraewyr yn ei gefnogi’n uniongyrchol."
    ]
   },
   {
    "h2": "Sut olwg sydd ar y ddarpariaeth",
    "ps": [
     "Mae’r offeryn yn ailadeiladu pennawd safonol: **canfas 1920×1080**, lapio clyfar (WrapStyle 0), a steil Diofyn sengl — Arial 54, testun gwyn gydag amlinelliad du, gwaelod wedi’i ganoli. Mae pob ciw yn defnyddio’r steil hwn."
    ],
    "img": {
     "file": "convert-opt-ass",
     "alt": "Dewislen ostwng fformat allbwn gyda ASS - Advanced SubStation wedi’i ddewis",
     "cap": "Dewiswch ASS fel yr allbwn a lawrlwytho ar ôl trosi"
    }
   },
   {
    "h2": "A yw steiliau’n cael eu cadw?",
    "ps": [
     "Nid oes gan SRT unrhyw gysyniad steil i ddechrau. Ac os yw’r ffynhonnell eisoes yn ASS, mae trosi **yn ailadeiladu’r steil diofyn ac nid yw’n cadw’r un wreiddiol** — defnyddiwch olygydd isdeitlau pwrpasol ar gyfer ailsteilio ASS. Nid yw amseru a thestun yn cael eu heffeithio yn y naill ffordd na’r llall."
    ]
   }
  ]
 },
 "srt-to-excel": {
  "seo": {
   "title": "Trosi Isdeitlau i Excel – Proffread Fesur Rhes – AI-SRTSub",
   "desc": "Allforio isdeitlau SRT i Excel: un rhes fesur ciw dros bedair colofn — mynegai, dechrau, diwedd a thestun. Amser wedi’i gadw fel testun, toriadau llinell yn gyfan, a gellir trosi’r ddalen olygedig yn ôl i isdeitlau.",
   "h1": "Trosi isdeitlau i Excel",
   "intro": "Mae proffread cannoedd o giwiau mewn golygydd testun yn flinedig. Yn Excel mae pob ciw yn rhes, felly mae hidlo, gwneud sylwadau a dod o hyd-a-disodli i gyd yn dod ar gael — ac mae’r golygiadau’n mynd yn ôl i’ch SRT.",
   "ctaText": "Allforio i Excel"
  },
  "body": [
   {
    "h2": "Yr angen",
    "ps": [
     "Proffread, newidiadau geiriau swmp, neu rannu’r swydd rhwng sawl person — mae hynny i gyd yn symud llawer cyflymach mewn dalen nag yn nhestun plaen. Mae SRT ei hun yn destun plaen, en mae ei strwythur ciw (mynegai, amseru, deialog) yn mapio’n daclus ar bedair colofn taenlen."
    ]
   },
   {
    "h2": "Ble i’w wneud",
    "ps": [
     "Agorwch [[Trosi isdeitlau ⇄ tabl|/table.html]], newidiwch i \"i dabl\", llusgwch yr SRT i mewn, ac mae’r rhagolwg yn llenwi gydag un rhes fesur ciw dros bedair colofn — mynegai, dechrau, diwedd, testun. Taro \"Lawrlwytho Excel (.xlsx)\" ac mae’n eiddo i chi. Cefnir VTT yn yr un fmod.",
     "Pan fyddwch chi wedi gorffen golygu: newidiwch y modd i \"i isdeitl\", rhowch y ddalen yn ôl i mewn, a gewch chi SRT eto. Y rheol yw tair colofn ar gyfer dechrau, diwedd a thestun (mae English Start / End / Text yn gweithio hefyd), mewn unrhyw drefn."
    ],
    "img": {
     "file": "table-prev",
     "alt": "Rhagolwg tabl: pob ciw SRT fel rhes dros bedair colofn, gyda’r bar ystadegau",
     "cap": "SRT wedi’i osod fel pedair colofn, gellir ei drosi yn ôl yn yr un modd"
    }
   },
   {
    "h2": "Peryglon cyffredin",
    "ps": [
     "**Trwsiwch amgodio wedi torri yn gyntaf**: dim ond UTF-8 y mae’r dudalen hon yn ei ddarddar. Mae sgrin o farciau cwestiwn neu flychau yn golygu taith i [[Atgyweirio mojibake|/repair.html]] yn gyntaf.",
     "**CSV neu xlsx**: dewiswch .xlsx pan fydd y ffeil yn mynd i Excel, fel na ellir ail-fformatio’r golofn amser; mae CSV yn fwy cludadwy ond gall Excel ei ddarddar fel rhywbeth arall — gosodwch y golofn amser i \"Testun\" os digwydd hynny.",
     "**Nid yw ASS yn gweithio**: mae ASS yn cario cyfarwyddiadau steil, felly trosi i SRT cyn ei roi mewn tabl."
    ]
   },
   {
    "h2": "Cysylltiedig",
    "ps": [
     "Y cam wrth gam llawn dwy-ffordd — [[Sut i drosi isdeitlau i Excel / CSV|/guides/table.html]]; cyfieithu wedyn — [[Cyfieithu isdeitlau|/translate.html]]; llinell derfyn olaf cyn cyflwyno — [[QC Isdeitlau|/qc.html]]."
    ]
   }
  ]
 },
 "srt-to-vtt": {
  "seo": {
   "title": "Trawsnewidydd SRT i VTT – Trosi Isdeitlau Ar-lein – AI-SRTSub",
   "desc": "Trosi isdeitlau SRT i VTT (WebVTT) ar gyfer elfennau trac HTML5. Mae comi stampiau amser yn dod yn dotiau yn awtomatig. Yn rhedeg yn eich porwr, nid oes dim yn cael ei uwchlwytho.",
   "h1": "SRT i VTT",
   "intro": "Troi isdeitlau SRT yn VTT: gollwng y ffeil, dewis VTT, lawrlwytho. Mae stampiau amser yn cael eu hail-ysgrifennu ar gyfer y fformat gwe, i gyd yn eich porwr.",
   "ctaText": "Trosi SRT → VTT"
  },
  "body": [
   {
    "h2": "Pan fydd angen VTT arnoch chi",
    "ps": [
     "Mae chwaraewyr gwe (yr elfen HTML5 `<track>`), uwchlwytho isdeitlau YouTube, a’r rhan fwyaf o chwaraewyr sy’n seiliedig ar borwr yn derbyn **VTT (WebVTT)** yn unig — nid SRT. Os mai SRT yn unig sydd gennych, mae un trosi yn ei wneud yn gweithio."
    ]
   },
   {
    "h2": "Sut mae’r ddau fformat yn wahanol",
    "ps": [
     "Mae’r cynnwys bron yn unfath; mae tair peth wedi’u hysgrifennu’n wahanol: y **llinell bennawd WEBVTT** (gynnwys yn VTT); y **gwahanydd milieiliad** mewn stampiau amser — mae SRT yn defnyddio comi (00 : 00 : 01,000) tra bod VTT yn defnyddio dot (00 : 00 : 01.000); ac mae VTT yn caniatáu blociau NOTE a STYLE nad yw SRT yn eu gwneud."
    ],
    "img": {
     "file": "convert-result",
     "alt": "Canlyniad trosi yn dangos pennawd WEBVTT a stampiau amser dot",
     "cap": "Y VTT wedi’i drosi: llinell gyntaf WEBVTT, stampiau amser dot"
    }
   },
   {
    "h2": "Sut i drosi",
    "ps": [
     "Agorwch y [[trawsnewidydd|/convert.html]], gollwng yr SRT i mewn, dewiswch **VTT - WebVTT** fel yr allbwn, yna trosi a lawrlwytho. Mae trefn ciwiau, gwerthoedd amseru, a thestun am-linell i gyd yn cael eu cadw fel y maent — dim ond y cystrawen sy’n newid. Mynd y ffordd arall? Gweler [[VTT i SRT|/guides/vtt-to-srt.html]]."
    ]
   }
  ]
 },
 "subtitle-format-comparison": {
  "seo": {
   "title": "SRT vs VTT vs ASS vs SBV vs LRC – Pa Fformat Isdeitlau – AI-SRTSub",
   "desc": "Cymhariaeth gallu o bump fformat isdeitlau cyffredin: steilio testun, lleoli, manwl gywirdeb amseru, lle mae pob un yn perthyn, a sut i drosi rhyyntynt.",
   "h1": "Dewis Fformat Isdeitlau: SRT / VTT / ASS / SBV / LRC",
   "intro": "Mae’r un isdeitl a gadwyd mewn pum fformat yn gwasanaethu pum meistr gwahanol. Mae’r canllaw hwn yn cymharu beth y gall pob fformat ei wneud a sut i symud rhyyntynt.",
   "ctaText": "Agor y trosi isdeitlau"
  },
  "body": [
   {
    "h2": "Dewis fformat mewn un frawddeg",
    "ps": [
     "Llwytho o’r neilltu i chwaraewr, cydnawsedd uchaf → **SRT**; chwaraewyr gwe (trac HTML5) neu uwchlwytho YouTube → **VTT**; ffontiau, lliwiau, lleoli, effeithiau → **ASS**; wedi’u lawrlwytho o YouTube → **SBV** (trosi i SRT i ymestyn cefnogaeth); geiriau cân, canu fesur linell → **LRC**."
    ],
    "img": {
     "file": "convert-opt",
     "alt": "Dewislen ostwng fformat allbwn: chwe fformat targed",
     "cap": "Mae’r chwe tharged allforio yn y trawsnewidydd yn cwmpasu pob fformat yn y canllaw hwn"
    }
   },
   {
    "h2": "Cymhariaeth gallu",
    "ps": [
     "**SRT**: testun plaen + amseru, dim steilio na lleoli, y pencampwr cydnawsedd. **VTT**: testun + amseru, a gefnogir yn frodorol gan borwyr, gall gario lleoli a steilio sylfaenol, dot cyn milieiliadau. **ASS**: testun + amseru + steilio llawn (ffontiau, lliwiau, amlinelliadau, lleoli, effeithiau), amseru i gantfeiliadau. **SBV**: fformat isdeitlau lleiaf YouTube, dechrau a diwedd ar un linell. **LRC**: fformat geiriau cân, amseroedd dechrau yn unig, dim amseroedd diwedd, dim steilio."
    ]
   },
   {
    "h2": "Llwybrau rhwng fformat",
    "ps": [
     "Mae unrhyw un o’r rhain yn trosi’r ddwy ffordd yn y [[trawsnewidydd|/convert.html]]: mae darllen yn cefnogi srt, vtt, ass (gan gynnwys ssa), sbv, lrc, txt; mae allforio yn cefnogi srt, vtt, ass, sbv, lrc, txt. Mae gan bob llwybr cyffredin ei ganllaw ei hun: [[SRT i VTT|/guides/srt-to-vtt.html]], [[VTT i SRT|/guides/vtt-to-srt.html]], [[SRT i ASS|/guides/srt-to-ass.html]], [[ASS i SRT|/guides/ass-to-srt.html]], [[SBV i SRT|/guides/sbv-to-srt.html]], [[LRC i SRT|/guides/lrc-to-srt.html]]."
    ]
   },
   {
    "h2": "Beth mae trosi yn ei golli",
    "ps": [
     "Mae trosi i SRT bob amser yn gollwng steilio a lleoli (ni all SRT eu dal). Mae trosi i ASS gyda’r offeryn hwn **yn ailadeiladu steil diofyn ac nid yw’n cadw’r un wreiddiol**. Mae angen llenwi amseroedd diwedd LRC (mae pob llinell yn para tan y nesaf; mae’r olaf yn cael 3 eiliad). Mae gwerthoedd amseru a thestun yn aros yn union yr un fath ym mhob cyfeiriad."
    ]
   }
  ]
 },
 "subtitle-garbled-characters": {
  "seo": {
   "title": "O ble mae Mojibake Isdeitlau yn Dod – Ei Ganfod, Ei Drwsio – AI-SRTSub",
   "desc": "Mae Mojibake yn golygu darlleniad anghywir, nid ffeil wedi’i difrodi. Mae nodau newid, waliau o lythrennau acennog a rhediadau o nodau anamlwg pob un yn pwyntio at achos — dysgwch pa rai sy’n adfer a pa rai na fydd byth yn gwneud hynny.",
   "h1": "O ble mae mojibake isdeitlau yn dod",
   "intro": "Mae’r un beitiau’n cael eu darllen fel UTF-8 ac yn cael eu darllen fel GBK yn dod allan fel dau set hollol wahanol o nodau. Mae sut olwg sy’n ar y testun sothach yn dystiolaeth uniongyrchol o ba gam a aeth yn anghywir.",
   "ctaText": "Agor yr offeryn atgyweirio mojibake"
  },
  "body": [
   {
    "h2": "Mae’r ffeil yn iawn — cafodd ei darllen yn anghywir",
    "ps": [
     "Yr hyn mae ffeil isdeitlau yn ei storio yw beitiau. Mae troi beitiau yn nodau yn gofyn am wybod pa amgodio y cawsant eu hysgrifennu ynddo — cewch hynny’n anghywir a chewch fojibake. Nid oes un beit yn aros ar goll o’r ffeil; darllenwch ef eto gyda’r amgodio cywir a bydd y nodau’n dod yn ôl.",
     "Mae hynny’n rannu’r swydd yn ddau: **gweithio allan pa amgodio y dechreuodd fel**, a **ei gadw fel amgodio y gall eich chwaraewr ei ganfod**. Mae’r cyntaf yn dod o ddadgodio prawf a sgorio, yr ail o gadw copi. Maen nhw’n datrys problemau gwahanol."
    ]
   },
   {
    "h2": "Pump golwg, pum achos",
    "ps": [
     "Nid yw Mojibake yn ar hap — mae sut olwg sydd arno yn rhoi i ffwrdd yr hyn a achosodd ef:"
    ],
    "img": {
     "file": "repair-diag",
     "alt": "Cerdyn diagnosis yn rhestru pob math o drac mojibake",
     "cap": "Mae diagnosis yn trefnu mojibake yn ôl achos yn hytrach na’i glystyru gyda’i gilydd"
    }
   },
   {
    "h2": "Pam na ellir atgyweirio’r nod newid",
    "ps": [
     "Y nod newid yw’r llinell rannu. Mae `�` yn golygu bod y beitiau eisoes wedi’u taflu i ffwrdd **ar gam cynharach** (fel arfer rhyw raglen yn darllen y ffeil a’i chadw eto), a chaiff dim ei gofio am yr hyn a ddisgynwyd. Ar y pwynt hwnnw does dim byd i resymu yn ôl ohono — ni theimlid neb yn gallu ei atgyweirio.",
     "Felly mae’r dudalen atgyweirio yn trin dau achos yn wahanol. Uwchlwythwch ffeil ac mae’r beitiau gwreiddiol yn gyfan, gan ganiatáu iddo roi cynnig ar bob amgodio; os yw testun wedi’i bastio eisoes yn cynnwys y nod newid, mae’n dweud hynny’n eglur: \"ni ellir ei atgyweirio, uwchlwythwch y ffeil wreiddiol os gwelwch yn dda\".",
     "Mae yna achos gwrthwyneb hefyd: mae’r cynnwys yn darllen yn berffaith dda ond mae’ch chwaraewr yn dal i ddangos sothach. Nid yw’r ffeil ar fai — **dewisodd y chwaraewr yr amgodio anghywir**. Ni fydd golygu’r testun yn helpu; cadwch gopïo fel UTF-8 gyda BOM neu GBK a’i roi iddo."
    ],
    "img": {
     "file": "repair-up",
     "alt": "Ardal uwchlwytho: llusgo-a-gollwng a phastio fel dau bwynt mynediad",
     "cap": "Uwchlwythwch y ffeil os gallwch chi — mae beitiau cyfan yn golygu rhywbeth i’w atgyweirio"
    }
   },
   {
    "h2": "Beth mae’n ei gymharu wrth atgyweirio",
    "ps": [
     "Mae’r offeryn yn rhoi cynnig ar bob amgodio credadwy, yna’n sgorio pob canlyniad: faint ohono sydd wedi’i wneud o nodau cyffredin, p’a fo yna linynnau o acenion, llinynnau o symbolau, p’a fo’r rhediadau CJK yn waliau o nodau anamlwg. Mae’r canlyniad sy’n sgorio gorau yn mynd i frig y rhestr.",
     "**Os nad oes sgor yn glir well, argymhellir dim** — gwell dweud wrthych chi \"mae hwn yn darllen yn dda fel y mae\" na’ch ffugio chi gyda rhywbeth sy’n ymdebygu’n fras yn unig i iaith. Mae testun wedi’i ddifrodi ddwywaith (wedi’i gadw’n anghywir unwaith, yna’n cael ei atgyweirio’n anghywir unwaith) yn cael un rownd ychwanegol o ddatrys yn ôl ar y prif ymgeiswyr."
    ],
    "img": {
     "file": "repair-fix",
     "alt": "Rhestr ymgeiswyr wedi’i threfnu yn ôl sgor, pob un â label gyda’i phâr amgodio",
     "cap": "Ymgeiswyr wedi’u rhestru yn ôl sgor — dim enillydd clir, dim argymhelliad"
    }
   },
   {
    "h2": "Mae cadw’r amgodio cywir yn gorffen y swydd",
    "ps": [
     "Mae’n rhaid i destun a atgyweiriwyd gael ei gadw o hyd fel amgodio y mae eich chwaraewr yn ei adnabod. Fel arfer mae chwaraewyr ar Windows yn dibynnu ar y BOM i ganfod amgodio, felly **UTF-8 gyda BOM** yw’r llai o ffwdan; mae hen galedwedd a rhai chwaraewyr rhanbarthol eisiau GBK. Gallwch ddewis UTF-8, UTF-8 (gyda BOM), GBK, Big5, Shift_JIS neu EUC-KR, a byddwch yn cael eich dweud i ddewis un arall os nad yw rhywbeth yn ffitio (ni all GBK ddal Coreeg)."
    ],
    "img": {
     "file": "repair-out",
     "alt": "Ardal ganlyniadau: cadw-fel dewislen ostwng amgodio a botwm lawrlwytho",
     "cap": "Cadwch ef fel rhywbeth y mae’r chwaraewr yn ei adnabod ac mae mojibake wedi’i ddatrys yn wirioneddol"
    }
   },
   {
    "h2": "Offer a chanllawiau cysylltiedig",
    "ps": [
     "Y cam wrth gam llawn — [[Sut i atgyweirio isdeitlau mojibake|/guides/repair.html]]; beth mae ffeil SRT yn ei storio mewn gwirionedd — [[Beth sydd y tu mewn i ffeil SRT|/guides/srt-file-format.html]]; mae’r amgodio yn iawn ond mae’r cynnwys yn fudr (nodau dyfrnod, hysbysebion, tagiau nam ar y clyw) — [[Glanhau isdeitlau|/clean.html]]."
    ]
   }
  ]
 },
 "subtitle-glossary": {
  "seo": {
   "title": "Tablau telerau: un tymor, un geirfa – Pryd i adeiladu un – AI-SRTSub",
   "desc": "Mae tabl telerau yn trwsio’r un gair a gyflwynir yn anghyson: pryd i adeiladu un, sut i’l ail-ddefnyddio ar draws tymor, pam nad yw paru gair-cyfan yn gwneud dim yn Tsieineaidd, a beth i beidio â’i roi iddo.",
   "h1": "Tablau telerau: cadw tymor yn gyson",
   "intro": "Pan fo enw yn A ym mhennod un a B ym mhennod saith, mae gwylwyr yn meddwl eu bod yn ddau gymeriad. Mae tabl telerau yn atal hynny’n union — mae’n trwsio beth yw enwau pethau.",
   "ctaText": "Agor disodli telerau swp"
  },
  "body": [
   {
    "h2": "Mae tabl telerau yn trwsio anghysondeb",
    "ps": [
     "Mae problemau geirfa mewn isdeitlau’n dod mewn dau fath: \"mae’r gair hwn wedi’i gyfieithu’n anghywir\" a \"mae’r un gair wedi’i gyfieithu’n wahanol o un lle i’ന്നെu\". Problem geiriadur yw’r gyntaf; yr ail yw’r hyn y mae tabl telerau ar ei gyfer.",
     "Mae’r ail yn fwy cyffredin ac yn galetach i’w weld: mae `Thor` yn dod yn \"Thor\" ym mhennod un a \"Donar\" ym mhennod saith, ac mae pob pennod yn edrych yn dda ar ei phen ei hun tra bod y gyfres fel cyfanwaith yn gwneud i wylwyr feddwl bod cymeriad newydd wedi ymddangos. Mae tabl telerau yn troi \"mae’r cynhyrchiad hwn yn ei alw ef yn Thor\" yn rheol weithredol a gymhwysir i’r ffeil isdeitlau gyfan ar unwaith."
    ]
   },
   {
    "h2": "Pryd y mae’n werth adeiladu un",
    "ps": [
     "Nid oes angen tabl telerau ar bob ffeil isdeitlau. Y kesoedd sy’n cyfiawnhau un yw’r rhain fel arfer:"
    ],
    "img": {
     "file": "glossary-rules",
     "alt": "Rheolau disodli wedi’u grwpio yn ôl categori mewn tabl telerau",
     "cap": "Defnyddiwch sylwadau # i grwpio rheolau, ac i ddiffodd un dros dro wrth olygu"
    }
   },
   {
    "h2": "Cadw un tabl ar draws tymor",
    "ps": [
     "Mae tabl telerau yn cael ei gynnal **yn gynyddol**: setlwch yr enwau ym mhennod un, yna ychwanegwch reol pryd bynnag y mae term newydd yn ymddangos, ac erbyn diwedd y tymor mae’r tabl yn gyflawn. Ar gyfer y tymor nesaf o’r un gyfres, dechreuwch ohono.",
     "Ysgrifennwch reolau ychydig yn ehangach nag a oedd angen yn llym — unwaith y byddwch wedi penderfynu ar \"Thor\", ychwanegwch \"Donar -> Thor\" hefyd, fel y gellir dod ag isdeitlau rhywun arall i linell yn yr un pas.",
     "Darllenwch y **restr newidiadau** bob amser wedyn: mae’n enwi pob ciw, pob llinell a beth a ddaeth yn beth. Dyma’r unig le lle gallwch gadarnhau bod y newid yn iawn ac nid dros ben llestri, a gellir gwrthdroi unrhyw gofnod nad ydych yn ei hoffi gyda chlic."
    ],
    "img": {
     "file": "glossary-diff",
     "alt": "Y rhestr o newidiadau unigol yn yr ardal ganlyniadau",
     "cap": "Mae pob newid wedi’i restru; cliciwch un nad ydych chi’n ei eisiau i’w wrthdroi"
    }
   },
   {
    "h2": "Beth i beidio â’i roi i dabl telerau",
    "ps": [
     "Mae tabl telerau yn newid **geiriau**. Mae’r tri pheth hyn y tu allan i’w swydd, a dylent fod:",
     "**Gramadeg a strwythur brawddeg** — ni allwch droi gair yn frawddeg; mae gwaith lefel brawddeg yn mynd yn ôl i [[Cyfieithu isdeitlau|/translate.html]] neu i fod dynol.",
     "**Glanhau cynnwys** — mae gollwng llinellau cyfan megis dyfrnodau, hysbysebion a ciwiau SDH yn perthyn i [[Glanhau isdeitlau|/clean.html]]; mae rheolau tabl telerau yn disodli, nid ydynt yn dileu llinellau.",
     "**Llinellau amser** — nid yw tabl telerau byth yn cyffwrdd ag amser. Ar gyfer gwrthbwyso byd-eang neu broblem gyfradd ewch i [[Addasu llinell amser|/shift.html]]."
    ]
   },
   {
    "h2": "Ychydig o bethau hawdd eu cael yn anghywir",
    "ps": [
     "**Mae Tsieineaidd yn dal i ddisodli is-linynnau gyda pharu gair-cyfan wedi’i dicio — mae hynny’n arferol.** Nid yw Tsieineaidd a Japaneaidd yn gwahanu geiriau â bylchau, felly ni all yr offeryn bennu ffiniau geiriau ac nid oes gan baru gair-cyfan unrhyw effaith yno; ni fydd y `art` yn cyffwrdd â diogelwch `start` yn gweithio i Saesneg yn unig.",
     "**Mae trefn yn newid y canlyniad.** Mae rheolau’n rhedeg o’r brig i’r gwaelod ac mae testun a gynhyrchwyd gan un rheol yn cael ei sganio eto gan y rheolau isod iddo. Disodlwch A â B yna B â C a byddwch yn gorffen gyda C.",
     "**I newid y cyfieithiad yn unig, gosodwch yr skop.** Mewn ffeil dwyieithog, dewiswch \"ail linell yn unig\"; mae cofnodion â dim ond un linell yn aros heb eu cyffwrdd o dan y naill osodiad un-linell — nid yw’r offeryn yn dyfalu pa ochr yw’r un wreiddiol.",
     "**Nid yw’r tabl telerau yn cael ei gadw.** Mae’n wag bob tro y byddwch chi’n agor y dudalen, felly cadwch eich ffeil destun eich hun a’i phasio ymlaen."
    ]
   },
   {
    "h2": "Offer a chanllawiau cysylltiedig",
    "ps": [
     "Ar gyfer y cam wrth gam llawn gweler [[Sut i swp-ddisodli telerau mewn isdeitlau|/guides/glossary.html]]; os yw’r cynnwys yn fudr rhedeg [[Glanhau isdeitlau|/clean.html]] yn gyntaf; unwaith y bydd yr enwau wedi setlo ac mae angen ieithoedd eraill arnoch chi ewch i [[Cyfieithu isdeitlau|/translate.html]]; a rhedeg y canlyniad trwy [[QC Isdeitlau|/qc.html]]."
    ]
   }
  ]
 },
 "subtitle-quality-check": {
  "seo": {
   "title": "Rhestr Wirio QC Isdeitlau Cyn Cyflwyno – AI-SRTSub",
   "desc": "Rhestr wirio cyflwyno isdeitlau: mae gorgyffwrdd, cyflymder darllen, lled llinell ac atalnodi yn methu amlaf. Rhedeg y rheolau QC 17 — mae hanner y problemau yn atgyweiriadau un-clic.",
   "h1": "Beth i’w Wirio Cyn Cyflwyno",
   "intro": "Nid yw isdeitlau gorffenedig yn barod i’w cyflwyno: y problemau y mae gwylwyr yn eu gweld ar yr olwg gyntaf yw’r rhai yn union na allwch chi eu gweld ar ôl gwylio cant o weithiau. Mae’r restr wirio hon yn cynnwys y pas terfynol hwnnw.",
   "ctaText": "Rhedeg Gwiriad QC Isdeitlau"
  },
  "body": [
   {
    "h2": "Pam Na Allwch Chi Weld y Problemau Eich Hun",
    "ps": [
     "Mae unrhyw un sy’n gwneud isdeitlau yn adnabod y cynnwys yn rhy dda — rydych chi’n gwybod beth mae pob llinell yn ei ddweud nesaf, felly does dim yn teimlo’n rhy gyflym; rydych chi wedi gweld y dyluniad gannoedd o weithiau, a mae’ch llygaid yn hepgor y diffygion ar eu pen their hun. Felly ni all y gwiriad cyn cyflwyno ddibynnu ar “ei wylio eto o’r brig” — mae’n rhaid iddo gael ei **fesur yn erbyn rhifau**: cyflymder darllen, lled llinell, hyd, gorgyffwrdd. Gadewch i’r ffigyrau benderfynu."
    ]
   },
   {
    "h2": "Y Chwe Methiant Mwyaf Cyffredin",
    "ps": [
     "Wedi’u rhestru yn ôl pa mor aml maen nhw’n suddo cyflwyniad:"
    ]
   },
   {
    "h2": "Sut i Wirio",
    "ps": [
     "Agorwch [[QC Isdeitlau|/qc.html]] a gollwng eich isdeitlau i mewn; gosodwch yr iaith i ganfod yn awtomatig (27 iaith, pob un â’i haenau rheol ei hun). Mae’r adroddiad yn rhestru canfyddiadau ar dri lefel — **gwallau / rhybuddion / awgrymiadau** — pob un â rhif y cofnod a’r gwerth a fesurwyd. Rhaid delio â gwallau (testun llygredig, fformat stamp amser, diweddarach na dechrau, rhifau wedi’u torri); mae rhybuddion yn dibynnu ar yr achos (gorgyffwrdd, cyflymder darllen, lled llinell, hyd); awgrymiadau yw’r sglein (lleoliad torri-llinell, spaziau, atalnodi)."
    ],
    "img": {
     "file": "qc-report",
     "alt": "Adroddiad QC: rhestr materion tair lefel, pob darganfyddiad gyda rhif cofnod a chymhariaeth mesur-vs-trothwy",
     "cap": "Adroddiad tair lefel yn rhoi rhif y cofnod a’r gwerth mesuriedig ar gyfer pob darganfyddiad"
    }
   },
   {
    "h2": "Beth Gellir ei Drwsio gydag Un Clic",
    "ps": [
     "Rhifo, cofnodion gwag, ail-lapio, spaziau ac atalnodi — unrhyw beth sy’n **gadał yr amseru heb ei gyffwrdd** — gellir ei drwsio’n awtomatig; mae atgyweiriadau sy’n **newid yr amseru** (cyfnewid dechrau a diwedd, symud gorgyffwrdd, tocio neu ymestyn hydoedd) heb eu ticio yn ddiofyn a dylid eu ticio dim ond ar ôl i chi gadarnhau’r effaith. **Nid oes gan gyflymder darllen dros y terfyn unrhyw atgyweiriad awtomatig** — ni all y peiriant wybod pa air i’w dorri, felly byrhau’r cyfieithiad eich hun neu lacio’r amseru ychydig; gweler [[Isdeitlau yn Rhy Gyflym i’w Darllen|/guides/subtitle-too-fast.html]]. Ar ôl trwsio, mae gwiriad newydd yn rhedeg yn awtomatig, ac mae’r adroddiad yn cyfrif dim ond yr hyn a ddrwsiwyd yn wirioneddol."
    ]
   },
   {
    "h2": "Tra Rydych Chi Arno",
    "ps": [
     "Gall tudalen yr adroddiad lawrlwytho adroddiad testun plaen `.qc.txt` yn uniongyrchol — cysylltwch ef â’r cyflwyniad fel að bydd yr ochr arall yn gweld ar yr olwg gyntaf yr hyn a wnaethoch chi ei wirio. Ar gyfer isdeitlau a gyfieithwyd yn ddiweddar, rhedwch QC cyn cyflwyno; mae drifft llinell amser gyfan yn fath gwahanol o broblem — os yw cyflymder darllen yn dal i fethu ar ôl gwirio, gweler [[Isdeitlau’n Driftio Allan o Gydamseru|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "subtitle-speed-converter": {
  "seo": {
   "title": "Cydamseru Isdeitlau Ar ôl Newid Cyflymder Fideo – AI-SRTSub",
   "desc": "Cafodd fideo ei gyflymu neu ei arafu ac nid yw’r isdeitlau’n ffitio mwyach: rhowch y ffactor cyflymder yn y cam graddio-yn-ôl-cyfradd ac mae’r llinell amser gyfan yn ymestyn gyda’r fideo.",
   "h1": "Addasu Isdeitlau Ar ôl Newid Cyflymder Fideo",
   "intro": "Cafodd y fideo ei gyflymu neu ei arafu yn gyffredinol, arhosodd yr isdeitlau ar y cyflymder gwreiddiol — mae popeth ar ôl pwynt i ffwrdd. Rhowch y ffactor ac mae’r llinell amser gyfan yn graddio gyda’r fideo.",
   "ctaText": "Agor y golygydd amseru"
  },
  "body": [
   {
    "h2": "Pryd i ddefnyddio cyfradd yn lle symudiad",
    "ps": [
     "Cafodd y fideo ei gyflymu neu ei arafu **fel cyfanwaith** (dyweder 0 .9x neu 1 .25x yn y meddalwedd golygu) tra arhosodd pob ciw ar ei rhythm gwreiddiol: mae’r dechrau’n cyd-fynd, a’r pellach y byddwch chi’n mynd y gwaethaf y mae’n ei gael — gyda chymhareb gyson. Problem cyfradd yw honna. Os yw’r ffeil gyfan wedi’i gwrthbwyso’n syml gan swm sefydlog heb dyfu, mae symudiad yn ddigon — gweler [[symud y ffeil isdeitlau gyfan yn gynharach neu yn hwyrach|/guides/shift-subtitle-timing.html]]."
    ]
   },
   {
    "h2": "Pa rif i’w gofnodi",
    "ps": [
     "Mae’n rhaid i isdeitlau ddilyn y fideo, felly rhowch **y ffactor y newidiodd y fideo ganddo mewn gwirionedd**: mae cyflymiad 1 .25x yn golygu fod amseroedd ciwiau’n lluosi â 1.25 i ddal i fyny; mae arafiad 0 .9x yn lluosi â 0.9. Yn y golygydd amseru, ychwanegwch gam **Graddio yn ôl cyfradd** a rhowch y ffactor yn y blwch gwerth."
    ],
    "img": {
     "file": "shift-step-rate",
     "alt": "Graddio yn ôl cam cyfradd gyda ffactor yn y blwch gwerth",
     "cap": "Mae ffactor uwchlaw 1 yn ymestyn y llinell amser (ar gyfer fideo a gyflymwyd), islaw 1 yn ei gywasgu (ar gyfer un a arafwyd)."
    }
   },
   {
    "h2": "Sut mae hwn yn wahanol i symudiad",
    "ps": [
     "Mae symudiad yn **symud** amseroedd pob ciw gan yr un swm sefydlog ac yn cadw hydoedd ciwiau; mae cyfradd yn **lluosi** dechrau a diwedd, felly mae hydoedd yn graddio hefyd. Ar ôl newid cyflymder mae’r hydoedd eu hunain wedi newid — dyna pam yn union y mae angen cyfradd."
    ]
   },
   {
    "h2": "Os nad ydych chi’n siwr am y ffactor",
    "ps": [
     "Pan fydd y ffactor ar goll, disgynnwch yn ôl ar **ddau angor**: rhowch wir amseroedd fideo y ciw cyntaf a’r olaf ac mae popeth yn y canol yn lledaenu allan yn gymesur — yn cyfateb i ddatrys ar gyfer y ffactor cywir. Gweler [[isdeitlau yn dod yn fwy a mwy allan o gydamseru|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "subtitle-too-fast": {
  "seo": {
   "title": "Isdeitlau yn Rhy Gyflym i’w Darllen – Trwsio Cyflymder Darllen – AI-SRTSub",
   "desc": "Isdeitlau yn rhy gyflym i’w darllen — hyd byr neu destun hir? Mae QC yn nodi cofnodion dros 20 nod/eiliad (9 hanzi ar gyfer CJK); mae hydoedd yn cael eu trwsio’n awtomatig, mae angen golygu testun.",
   "h1": "Isdeitlau yn Rhy Gyflym i’w Darllen",
   "intro": "Mae gwylwyr yn dal i daro saib? Y troseddwr yw cyflymder darllen. Sut i’w fesur, sut i’l drwsio, a phryd i olygu’r testun yn erbyn yr amseru — i gyd mewn un canllaw.",
   "ctaText": "Gwiriwch Gyflymder Darllen"
  },
  "body": [
   {
    "h2": "Beth yw Cyflymder Darllen?",
    "ps": [
     "Cyflymder darllen yw’n syml **p’a fo gwylwyr yn gallu gorffen darllen isdeitl o fewn yr amser y mae’n aros ar y sgrin**. Mae’r fathemateg yn syml: lled testun wedi’u rannu gan eiliad ar y sgrin. Capiau diwydiant cyffredin: 9 nod lled-lawn yr eiliad ar gyfer Tsieineaidd, Japaneaidd a Choreeg (18 uned lled-hanner), 20 uned lled-hanner yr eiliad ar gyfer ieithoedd eraill. Mae llinell 20-hanzi sy’n para 1 eiliad yn gweithio allan i fod yn 40 uned led yr eiliad — mwy na dwbl y cap, ac ni fydd gwylwyr yn ei orffen byth."
    ]
   },
   {
    "h2": "Yn Gyntaf, Dweud Ar Wahân Pa Fath o Gyflym",
    "ps": [
     "Mae \"Rhy gyflym i’w ddarllen\" mewn gwirionedd yn ddwy broblem wahanol: **hyd rhy byr** — mae’r ciw yn torri i ffwrdd ar ôl un neu ddau gant milieiliad, fel arfer gwall amseru neu weddillion golygu; **testun rhy hir** — mae’r hyd yn iawn, ond mae’r linell yn stwffio 30 hanzi, ac ni fydd dim terfyn cyflymder yn ei achub. Mae’r atgyweiriadau yn wrthwynebiadau, felly gwnewch allan pa un sydd gennych chi yn gyntaf."
    ],
    "img": {
     "file": "qc-rules",
     "alt": "Y gosodiad terfyn cyflymder darllen yn y dudalen QC, yn ddiofyn i 18 ar gyfer CJK ac 20 ar gyfer ieithoedd eraill",
     "cap": "Trothwyon cyflymder darllen QC: 18 uned led yr eiliad ar gyfer CJK, 20 ar gyfer ieithoedd eraill"
    }
   },
   {
    "h2": "Sut i Wirio",
    "ps": [
     "Agorwch [[QC Isdeitlau|/qc.html]] a gollwng eich isdeitlau i mewn. Yn yr adroddiad, mae “hyd rhy byr” yn rhybudd sy’n dangos y milieiliadau a fesurwyd (trothwy: 833 milieiliad); mae “cyflymder anddarllenadwy” yn ddadguddiad ar ei ben ei hun sy’n dangos yr unedau led yr eiliad a fesurwyd. Ar gyfer isdeitlau dwyieithog dim ond y linell a ysgrifennwyd yn yr iaith darged sy’n cyfrif — nid yw’r ddwy iaith yn cael eu hychwanegu at ei gilydd."
    ]
   },
   {
    "h2": "Sut i’s Trwsio",
    "ps": [
     "**Hyd rhy byr**: gellir ei drwsio gydag un clic — mae’r ciw yn cael ei ymestyn yn awtomatig i 833 milieiliad, heb basio dechrau’r ciw nesaf (rhaid i atgyweiriad beidio â chreu gorgyffwrdd newydd). **Testun rhy hir**: dim atgyweiriad awtomatig — ni all y peiriant wybog pa air i’w dorri. Dau lwybr, eich dewis: byrhau’r cyfieithiad (cliciwch y gell yn yr offeryn cyfieithu i’w olygu), neu ymestyn hyd y ciw hwn (dim ond os oes bwlch cyn y ciw nesaf; ar gyfer trafferth llinell amser gyfan gweler [[Symudiad Llinell Amser|/shift.html]]). Rhedwch QC eto wedyn i gadarnhau bod y cyflymder darllen yn ôl o dan y trothwy."
    ]
   },
   {
    "h2": "Peidiwch â Dros-gywiro",
    "ps": [
     "Nid yw cyrraedd y terfyn cyflymder yn golygu gwylio cyfforddus: mae stwffio pob ciw yn iawn hyd at 9 nod yr eiliad yn gwneud y ffilm gyfan yn flinedig. Fel rheol bawd, aros tua 70% o’r trothwy y rhan fwyaf o’r amser, a gadael i ddyfyniadau trwchus o ddeialog fynd dros ychydig weithiau. Mae blociau isdeitlau sy’n fflachio’n rhy aml yn broblem ynddynt eu hunain — rhedwch y set lawn o fetrigau cyn cyflwyno, gweler [[Beth i’w Wirio Cyn Cyflwyno|/guides/subtitle-quality-check.html]]."
    ]
   }
  ]
 },
 "subtitles-out-of-sync": {
  "seo": {
   "title": "Isdeitlau’n Driftio Mwy a Mwy Allan o Gydamseru? Ei Drwsio – AI-SRTSub",
   "desc": "Dechrau’n iawn, ychydig eiliadau y ôl erbyn canol y ffilm, yn anaddas i’w ddefnyddio ar y diwedd: drifft blaengar yw hwnnw, fel arfer anghydweddiad cyfradd ffrâm neu newid cyflymder fideo. Dau angor yn ei drwsio.",
   "h1": "Isdeitlau’n Driftio Ymhellach ac Ymhellach Allan o Gydamseru: Achosion ac Atgyweiriadau",
   "intro": "Yn iawn yn y dechrau, cwpl o eiliadau’n hwyr erbyn hanner awr, yn ddi-baid ar y diwedd. Mae gan y math hwn o gamaliniad drifftio achosion hysbys — ac atgyweiriad hysbys.",
   "ctaText": "Trwsio’r ffeil hon"
  },
  "body": [
   {
    "h2": "Dweud y ddau fath o gamaliniad ar wahân yn gyntaf",
    "ps": [
     "Mae camaliniad yn dod mewn dau fath: mae **gwrthbwyso unffurf** yn golygu bod pob ciw yn hwyr (neu’n gynnar) gan yr un swm, yn fras yn gyfartal o ddechrau i ddiwedd; mae **drifft blaengar** yn golygu bod y dechrau’n gywir ac mae’r gwall yn tyfu tuag at y diwedd, gan gyrraedd munudau o bosibl. Mae’r erthygl hon am yr ail fath — ar gyfer y cyntaf, gweler [[symud y ffeil isdeitlau gyfan yn gynharach neu yn hwyrach|/guides/shift-subtitle-timing.html]]."
    ]
   },
   {
    "h2": "Pam mae’n driftio mwy a mwy",
    "ps": [
     "Mae drifft yn dod o **ddau gloc gwahanol**: y tri achos mwyaf cyffredin yw (1) anghydweddiad cyfradd ffrâm — mae isdeitlau ffilm 24fps ar ffynhonnell 25fps yn colli dros eiliad y funud; (2) cafodd y fideo ei gyflymu neu ei arafu tra cadwodd yr isdeitlau eu cyflymder gwreiddiol; (3) recordiad VFR (cyfradd ffrâm amrywiol) y mae ei linell amser yn anwastad i ddechrau. Beth maen nhw’n ei rannu: mae’r gwall yn tyfu’n fras yn llinol gydag amser chwarae."
    ]
   },
   {
    "h2": "Ei drwsio gyda dau angor",
    "ps": [
     "Oherwydd bod y gwall yn tyfu’n llinol, mae pinio amser cywir ym mhob pen ac ail-ledaenu’r canol yn gymesur yn rhoi popeth yn ôl. Yn y golygydd amseru, ychwanegwch **gywiriad dau angor**: mae’r ddau faes \"cyfredol\" yn cael eu llenwi’n awtomatig ag amseroedd gwreiddiol y ffeil hon; rydych chi’n gwylio’r fideo ac yn rhoi **pryd mae’r ciw cyntaf a’r olaf yn ymddangos mewn gwirionedd** yn y ddau faes \"targed\"."
    ],
    "img": {
     "file": "shift-step-two",
     "alt": "Cywiriad dau angor: amseroedd cyfredol wedi’u llenwi’n awtomatig, amseroedd targed i’w cofnodi",
     "cap": "Cymerwch yr angorau yn y ddau eithaf — gwall gwreiddiol lleiaf a mwyaf — ac mae popeth rhyngddynt yn ail-ledaenu’n gymesur."
    }
   },
   {
    "h2": "Sut i wirio’r canlyniad",
    "ps": [
     "Ar ôl rhedeg, mae’r panel canlyniadau yn rhestru amseroedd gwreiddiol a newydd pob ciw **ochr yn ochr**. Sbot-wiriwch dair lle: y ciw cyntaf, un yn y canol, a’r olaf — y tri safle gyda’r gwall gwreiddiol lleiaf, canolig a mwyaf. Os bydd y tri yn glanio, mae’r ffeil gyfan yn gwneud hynny."
    ],
    "img": {
     "file": "shift-result",
     "alt": "Panel canlyniadau: amseroedd cyn ac ar ôl ochr yn ochr, gyda botwm lawrlwytho",
     "cap": "Dylai amseroedd newydd ciwiau canol syrthio rhwng y ddau ben — arwydd bod y gyfran yn iawn."
    }
   },
   {
    "h2": "Pan nad yw dau angor yn ddigon",
    "ps": [
     "Mae cywiriad dau angor yn cymryd bod y gwall yn **llinol**. Os yw’r ffynhonnell yn recordiad sgrin VFR gyda neid gyfradd ffrâm canol-ffeil, ni all tyniad llinol drwsio’r canol — cymerwch giw canol amlwg i ffwrdd fel trydydd pwynt, rannwch y ffeil yno, a rhedeg cywiriad dau angor ar bob hanner. Hefyd, ar ôl trwsio, ail-wylio’r adran ganol ar gyflymder arferol i gadarnhau nad oes camaliniad lleol ar ôl."
    ]
   }
  ]
 },
 "table": {
  "seo": {
   "title": "Trosi Isdeitlau i Excel / CSV – Y Dwy Gyfeiriad – AI-SRTSub",
   "desc": "Canllaw dwy-ffordd: allforio SRT/VTT i Excel neu CSV ar gyfer prawf-ddarllen fesur rhes, yna ei allforio yn ôl fel isdeitlau. Mae angen tair colofn, unrhyw drefn; cadwir yr amser fel testun.",
   "h1": "Sut i drosi isdeitlau i Excel / CSV",
   "intro": "Mae prawf-ddarllen a chyfieithu yn haws mewn taenlen. Allforiwch isdeitlau i Excel neu CSV, golygwch fesur rhes, yna eu trosi yn ôl — mae colofnau amser yn aros fel testun, ac mae toriadau llinell o fewn deialog yn cael eu cadw.",
   "ctaText": "Agor y troswr tabl"
  },
  "body": [
   {
    "h2": "What this tool does :: Beth mae'r offeryn hwn yn ei wneud",
    "ps": [
     "Mae isdeitlau yn rhesi o gliwiau ac mae taenlenni yn rhesi o gofnodion — unwaith y bydd yn daenlen, gellir gwneud prawf-ddarllen, nodi a chyfieithu swmp i gyd gydag offer rydych chi eisoes yn eu gwybod. Cefnogir y ddwy gyfeiriad:"
    ]
   },
   {
    "h2": "Lanlwytho a dewis cyfeiriad",
    "ps": [
     "Llusgwch ffeil i mewn neu bori amdani. Mae angen math gwahanol o ffeil ar bob cyfeiriad: mae **i dabl** yn cymryd ffeiliau isdeitlau (SRT / VTT), mae **i isdeitl** yn cymryd ffeiliau taenlen (CSV / Excel, .xlsx ac .xls y ddau). Dewiswch y modd anghywir a bydd y dudalen yn dweud wrthych pa fath o ffeil y mae'r modd hwnnw ei eisiau.",
     "⚠️ Mae'r dudalen hon yn darllen UTF-8 yn unig. Os bydd eich isdeitl yn agor fel sgrin lawn o farciau cwestiwn neu flychau, rhedwch ef trwy [[Atgyweirio Mojibake|/repair.html]] yn gyntaf — mae amgodio toredig yn darllen fel dim ond nodau amnewid yma."
    ],
    "img": {
     "file": "table-up",
     "alt": "Ardal lanlwytho'r troswr tabl: parth gollwng a'r ddau switsh modd",
     "cap": "Mae pob modd eisiau ffeil wahanol: isdeitlau i mewn, taenlen allan — ac yn ôl"
    }
   },
   {
    "h2": "Allforio isdeitlau i dabl",
    "ps": [
     "Dewiswch \"i dabl\", gollwng isdeitl i mewn, ac mae'r rhagolwg yn rhestru pob cliw: mynegai, dechrau, diwedd, testun. Mae'r bar ystadegau yn rhoi cyfrif y cliwiau a'r cyfanswm hyd. Yna taro \"Lawrlwytho Excel (.xlsx)\" neu \"Lawrlwytho CSV\".",
     "Y gwahaniaeth rhwng y ddau: ffeil taenlen go iawn yw .xlsx lle na theifl Excel ail-fformatiedig ar eich colofn amser y tu ôl i'ch cefn; mae CSV yn fwy cludadwy, ond gall Excel ddehongli'r golofn amser fel rhywbeth arall wrth ei agor. Os digwydd hynny, dewiswch y golofn amser a gosod ei fformat i \"Testun\" — neu defnyddiwch .xlsx yn syml."
    ],
    "img": {
     "file": "table-prev",
     "alt": "Rhagolwg tabl: colofnau mynegai, dechrau, diwedd a thestun gyda'r bar ystadegau",
     "cap": "Pob cliw wedi'i ragweld; mae'r bar ystadegau yn rhoi cyfrif cliwiau a chyfanswm hyd"
    }
   },
   {
    "h2": "Mewnforio tabl yn ôl i isdeitlau",
    "ps": [
     "Dewiswch \"i isdeitl\", gollwng y ddalen i mewn, a dyma reol y golofn: mae angen tair colofn ar gyfer **dechrau, diwedd a thestun** (mae pennynnau Saesneg Start / End / Text yn gweithio hefyd), mewn **unrhyw drefn**. Derbynnir `00:00:01,500` a `00:00:01.500` y ddau; hepgorir rhesi na ellir eu dosrannu yn hytrach na dedfrydu'r ffeil gyfan.",
     "Rhestrir y canlyniad cliw wrth gliw yn y rhagolwg; cadarnhewch, yna lawrlwythwch SRT neu VTT. Os yw'r tair colofn hyn ar goll cewch neges yn dweud wrthych am wirio'r pennynnau — fel rheol oherwydd bod enw gwahanol wedi'i ddefnyddio wrth allforio, neu nad yw'r rhes bennyn yn rhes un."
    ],
    "img": {
     "file": "table-back",
     "alt": "Ardal canlyniad isdeitlau: isdeitlau wedi'i fewnforio wedi'u rhestru cliw wrth gliw",
     "cap": "Adroddir ar golofnau nas cydnabyddir, byth yn cael eu hanwybyddu'n ddistaw"
    }
   },
   {
    "h2": "FAQ :: Cwestiynau Cyffredin",
    "ps": [
     "**Mae Excel yn dangos y golofn amser yn anghywir?** Defnyddiwch .xlsx ac ni ddigwydd byth. Os rhaid i chi ddefnyddio CSV: dewiswch y golofn amser a gosod fformat y gell i \"Testun\" cyn ei agor.",
     "**A oes yn rhaid i bennynnau'r golofn fod yn Saesneg?** Na. Cydnabyddir Start / End / Text mewn unrhyw iaith y mae'r dudalen hon yn ei chefnogi, ac nid yw priflythrennau/llythrennau bach yn bwysig.",
     "**A yw fy nhoriadau llinell yn dal yno ar ôl mewnforio?** Oes. Cedwir toriadau llinell o fewn deialog, yr holl ffordd i'r lapio gwreiddiol.",
     "**A gefnogir ASS?** Mae'r dudalen hon yn trin SRT a VTT yn unig. Mae ASS yn cludo cyfarwyddiadau arddull — trowch ef yn SRT gyda [[Troswr fformat|/convert.html]] yn gyntaf.",
     "**Faint o ffeiliau ar un tro?** Un. I brosesu dwsinau neu gannoedd, defnyddiwch [[Trosi swmp|/batch.html]] (sy'n trosi fformatau yn unig ac nad yw'n mynd trwy dabl)."
    ]
   },
   {
    "h2": "Privacy :: Preifatrwydd",
    "ps": [
     "Mae trosi yn rhedeg yn llwyr yn eich porwr. Ni anfonir unrhyw gynnwys isdeitlau i weinydd erioed."
    ]
   },
   {
    "h2": "Offer a chanllawiau cysylltiedig",
    "ps": [
     "Os y cyfan rydych chi ei eisiau yw'r cam isdeitl-i-Excel, gweler [[Trosi isdeitlau i Excel|/guides/srt-to-excel.html]]; i gyfieithu i iaith arall wedyn, [[Cyfieithu isdeitlau|/translate.html]]; dwsinau o ffeiliau ar un tro — [[Trosi swmp|/batch.html]]."
    ]
   }
  ]
 },
 "translate": {
  "seo": {
   "title": "Cyfieithu isdeitlau AI – lanlwytho i allforio dwyieithog – AI-SRTSub",
   "desc": "Cyfieithu isdeitlau gydag AI: lanlwytho SRT/VTT/ASS, dewis o 100 iaith, uno enwau gyda geiriadur, allforio isdeitlau dwyieithog. Am ddim i ddechrau, cefnogir allwedd API eich hun.",
   "h1": "Sut i ddefnyddio cyfieithu isdeitlau AI",
   "intro": "Y llif gwaith cyflawn ar gyfer un ffeil isdeitl, o lanlwytho trwy gyfieithu i allforio: beth sydd ar y sgrin, beth i'd clicio, a beth rydych chi'n ei gael ym mhob cam.",
   "ctaText": "Agor yr offeryn cyfieithu"
  },
  "body": [
   {
    "h2": "What this tool does :: Beth mae'r offeryn hwn yn ei wneud",
    "ps": [
     "Yn cyfieithu isdeitlau o un iaith i iaith arall ac yn allforio ffeil isdeitl barod i'w defnyddio. Anghenion nodweddiadol:"
    ]
   },
   {
    "h2": "Upload subtitles :: Lanlwytho isdeitlau",
    "ps": [
     "Cliciwch \"Dewis ffeil isdeitl\" neu gludwch destun isdeitl yn uniongyrchol i'r blwch mewnbun chwith. Cefnogir chwe fformat: SRT, VTT, ASS, SSA, SBV a TXT. Dim ffeil wrth law? Cliciwch \"Llwytho sampl\" i'ch gweld yn ymarferol. Unwaith y caiff ei ddosrannu, mae'r golofn ganol yn dangos tabl isdeitlau gyda mynegai, llinell amser a thestun ffynhonnell ar gyfer pob cofnod."
    ],
    "img": {
     "file": "translate-upload",
     "alt": "Ardal fewnforio'r offeryn cyfieithu: dewis ffeil isdeitl, blwch gludo a botwm llwytho-sampl",
     "cap": "Colofn chwith \"Mewnforio isdeitlau\": dewis ffeil, gludo testun neu lwytho sampl"
    }
   },
   {
    "h2": "Dewis iaith ac arddull",
    "ps": [
     "Gall \"Iaith ffynhonnell\" aros ar awto-ddarganfod; dewisir yr \"iaith darged\" o 100 iaith. Mae pump arddull cyfieithu ar gael: Cydbwysedd (rhagosodol), Sgwrsio, Proffesiynol ffurfiol, Arddull-dub a Phersonol. Mae \"Arddull-dub\" yn addas ar gyfer deialog ffilm a theledu; mae \"Proffesiynol ffurfiol\" yn addas ar gyfer rhaglenni dogfen a chyrsiau."
    ],
    "img": {
     "file": "translate-lang",
     "alt": "Gosodiadau iaith ac arddull cyfieithu: iaith ffynhonnell, dewislenni disgyn i lawr iaith darged a phum arddull",
     "cap": "\"Iaith\" ac \"arddull cyfieithu\": gall ffynhonnell awto-ddarganfod, 75 opsiwn targed"
    }
   },
   {
    "h2": "Geiriadur: cadw enwau'n gyson",
    "ps": [
     "Mae'r AI yn cyfieithu mewn sypiau, felly gall yr un enw ddod allan mewn dwy ffordd wahanol mewn gwahanol sypiau. Ysgrifennwch reolau \"ffynhonnell → rhaid ei gyfieithu fel\" i'r geiriadur; cyn pob swp mae'r offeryn yn ei sganio ac yn dilyn pob gêm. Un rheol fesur llinell; gall saethau fod yn `->`, `=>`, `→` ou Tab; mae term ffynhonnell unig yn golygu ei gadw heb ei gyfieithu; gall sawl sillafu rannu un cyflwyniad trwy `|`. Cliciwch \"✨ AI extract\" i gael yr AI i dynnu'r enwau priod o'r fideo i'r tabl yn gyntaf, yna golygu a chyfieithu."
    ],
    "img": {
     "file": "translate-glossary",
     "alt": "Ardal geiriadur ac enw priod: blwch mewnbun geiriadur gyda botymau tynnu allan AI a chadw",
     "cap": "Geiriadur \"Enwau unedig\": tynnu enwau priod allan ag AI, wedi'u llwytho'n awtomatig ar gyfer fideos newydd unwaith y cânt eu cadw"
    }
   },
   {
    "h2": "Y broses gyfieithu",
    "ps": [
     "Cliciwch \"▶ Dechrau cyfieithu\" yn y bar uchaf. Mae stribed ystadegau'r canol yn dangos cofnodion, wedi'u cyfieithu, llenwr wedi'i glirio a grwpiau brawddegau traws-gofnod mewn amser real; mae'r bar cynnydd yn dangos yr amser bras sy'n wedill a'r tocynnau a ddefnyddiwyd. Wrth gyfieithu, cliciwch unrhyw gell gyfieithu yn y tabl i olygu'r testun — storir y newidiadau ar eich peiriant ac maent yn goroesi adnewyddiad. Cae'r dudalen yng nghanol y rhediad a chynigir i chi ailddechrau o ble y gadawyd. Pan fydd un frawddeg yn rhychwantu sawl cofnod, mae'r grŵp yn cael ei uno, ei gyfieithu a'i ail-lenwi yn ôl hyd."
    ],
    "img": {
     "file": "translate-workspace",
     "alt": "Gweithle cyfieithu: stribed ystadegau, bar cynnydd a thabl isdeitlau y gellir ei olygu",
     "cap": "Gweithle canol: stribed ystadegau + bar cynnydd + tabl isdeitlau clicio-i-olygu"
    }
   },
   {
    "h2": "Export :: Allforio",
    "ps": [
     "Yn y golofn dde dewiswch y ffurf gynnwys yn gyntaf: cyfieithu yn unig (unieithog), dwyieithog gyda'r gwreiddiol ar dop, neu ddwyieithog gyda'r cyfieithiad ar dop; yna fformat y ffeil: SRT, WebVTT, SBV, ASS neu TXT. Mae dewis ASS yn ychwanegu dau gynllun: sgriniau hollt uchaf/gwaelod a llinellau gwaelod stacio. Mae cynnwys a fformat yn cyfuno'n rhydd i 14 arddull allforio. Gosodir lled llinell ddwyieithog ar wahân. Cliciwch \"Lawrlwytho isdeitlau\" i gadw'r ffeil, neu \"Copïo i'r clipfwrdd\" i'w gludo yn syth."
    ],
    "img": {
     "file": "translate-export",
     "alt": "Panel allforio: tair ffurf gynnwys, pum fformat ffeil a gosodiadau lled llinell ddwyieithog",
     "cap": "Allforio colofn dde: dewiswch y ffurf gynnwys yn gyntaf, yna fformat y ffeil"
    }
   },
   {
    "h2": "Cost and privacy :: Cost a phreifatrwydd",
    "ps": [
     "Nid oes angen cofrestru na chywirdeb ar y model rhagosodol — mae'n gweithio allan o'r bocs gyda chwotâu fesur cais: cap dyddiol fesur IP ynghyd â lwfans dyddiol ledled y wefan. Ar gyfer swmp mawr, nodwch eich allwedd API eich hun o dan \"Peiriant cyfieithu\". Preifatrwydd, fesur y hysbysiad ar y dudalen: caiff isdeitlau ar gyfer y model rhagosodol eu trosglwyddo trwy weinydd y wefan hon i'r darparwr; caiff API personol ei drin yn uniongyrchol gan y darparwr a nodwch, ac mae'r allwedd yn aros yn eich porwr. Mae dosrannu, lapio llinellau a chynllun dwyieithog i gyd yn rhedeg yn lleol yn y porwr."
    ]
   },
   {
    "h2": "FAQ :: Cwestiynau Cyffredin",
    "ps": [
     "**Ieithoedd eraill wedi'u cymysgu yn y cyfieithiad?** Mae'r offeryn yn canfod cryndod iaith ac yn ail-gyfieithu'n awtomatig; os yw ychydig o gofnodion yn dal i edrych yn anghywir, cliciwch y gell a'u trwsio â llaw.",
     "**Beth am linellau geiriau?** Mae \"Hidlo cynnwys\" yn cynnig tair opsiwn ar gyfer geiriau: cyfieithu'r geiriau, cadw'r gwreiddiol neu eu dileu.",
     "**Cyfieithiadau anghyson o enwau?** Ychwanegwch y sillafu anghyson at y geiriadur a chyfieithu eto; mae'r geiriadur yn cael blaenoriaeth dros osodiad byd-eang \"trin enwau priod\".",
     "**Eisiau Saesneg ar dop a Tsieinëeg isod?** Dewiswch \"Dwyieithog · gwreiddiol ar dop\" wrth allforio; ar gyfer Tsieinëeg ar dop a Saesneg isod, dewiswch \"Dwyieithog · cyfieithiad ar dop\"."
    ]
   },
   {
    "h2": "Offer a chanllawiau cysylltiedig",
    "ps": [
     "Fformat anghywir? Dechreuwch gyda [[trosi fformat|/convert.html]]; llinell amser i ffwrdd? Defnyddiwch [[addasu llinell amser|/shift.html]]; cyn ei drosglwyddo, rhedwch ef trwy'r [[gwiriad ansawdd isdeitlau|/guides/subtitle-quality-check.html]]."
    ]
   }
  ]
 },
 "translate-english-to-chinese": {
  "seo": {
   "title": "Cyfieithu Isdeitlau Saesneg i Tsieinëeg – AI-SRTSub",
   "desc": "Cyfieithu isdeitlau Saesneg i Tsieinëeg: lanlwytho SRT/VTT/ASS, dewis Symledig neu Draddodiadol, ac allforio isdeitlau Tsieinëeg yn unig neu ddwyieithog. – AI-SRTSub",
   "h1": "Cyfieithu Isdeitlau Saesneg i Tsieinëeg",
   "intro": "SRT Saesneg i mewn, isdeitlau Tsieinëeg (neu Saesneg-Tsieinëeg dwyieithog) allan: lanlwytho, dewis yr iaith darged, allforio — i gyd ar un dudalen.",
   "ctaText": "Cyfieithu isdeitlau Saesneg"
  },
  "body": [
   {
    "h2": "When you need it :: Pryd sydd ei angen arnoch",
    "ps": [
     "Mae'r isdeitl a dlawrlwythwyd gennych yn Saesneg yn unig ac ni allwch gadw i fyny; neu rydych chi eisiau isdeitlau Tsieinëeg i aelodau teulu nad ydynt yn darllen Saesneg. Daw'r hyn sydd ei angen arnoch mewn un o dair ffurf — **isdeitlau Tsieinëeg yn unig**, neu isdeitlau dwyieithog gyda **Tsieinëeg ar dop, Saesneg isod** neu **Saesneg ar dop, Tsieinëeg isod** — ac mae'r offeryn hwn yn allbwn y tri."
    ]
   },
   {
    "h2": "How to do it :: Sut i'w wneud",
    "ps": [
     "Agorwch y [[Cyfieithydd Isdeitlau AI|/translate.html]] a gollwng eich ffeil isdeitl Saesneg (mae SRT, VTT, ASS, SSA, SBV a TXT i gyd yn cael eu cydnabod, neu gludwch y testun). Gadewch “Iaith ffynhonnell” ar awto-ddarganfod, gosodwch “Iaith darged” i Tsieinëeg Symledig neu Draddodiadol, a chliciwch “▶ Dechrau cyfieithu”. Pan fydd yn gorffen, dewiswch ffurf gynnwys yn y panel allforio ar y dde: cyfieithu yn unig (unieithog), dwyieithog · gwreiddiol ar dop (Saesneg uchod, Tsieinëeg isod), neu ddwyieithog · cyfieithiad ar dop (Tsieinëeg uchod, Saesneg isod), yna dewiswch fformat ffeil a'i lawrlwytho."
    ],
    "img": {
     "file": "translate-export",
     "alt": "Panel allforio: cyfieithu yn unig, dwyieithog gyda'r gwreiddiol ar dop, a dwyieithog gyda'r cyfieithiad ar dop",
     "cap": "Dewiswch ffurf y cynnwys wrth allforio: Tsieinëeg yn unig, neu ddwyieithog Saesneg-ar-dop / Tsieinëeg-ar-dop"
    }
   },
   {
    "h2": "Two common problems :: Dau broblem gyffredin",
    "ps": [
     "**Enwau wedi'u cyfieithu'n anghyson?** Mae'r AI yn cyfieithu mewn sypiau, felly gall yr un enw ddod allan mewn dwy ffordd. Rhowch bariau “ffynhonnell → enw wedi'i gyfieithu” yn y geiriadur (ee `Watson → Huasheng`) i'w gadw'n unffurf drwyddi draw.",
     "**Isdeitlau yn crwydro o'r llun?** Cyfieithwch yn gyntaf, yna trwsiwch yr amseriad: mae gan far offer y llinell amser ar frig y gweithle reolwr gwrthbwyso a graddfa fyd-eang — gweler [[Mae isdeitlau yn colli cydamseriad tuag at y diwedd|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "videosub": {
  "seo": {
   "title": "Tynnu isdeitlau fideo mewnol – traciau MKV / MP4 – AI-SRTSub",
   "desc": "Darllen y traciau isdeitlau y tu mewn i MKV, WebM, MP4 a MOV yn syth ac allforio SRT / VTT / ASS / TXT. Dim lanlwytho, dim traws-amgodio, pob trac iaith wedi'i restru, isdeitlau delwedd wedi'u galw allan.",
   "h1": "Sut i dynnu isdeitlau sydd wedi'u mewnwirio mewn fideo",
   "intro": "Darllen y trac isdeitl a seliwyd y tu mewn i MKV / MP4 yn syth fel SRT — ni lwythir y fideo i fyny byth, darllenir popeth yn y porwr.",
   "ctaText": "Agor tynnu isdeitlau fideo"
  },
  "body": [
   {
    "h2": "What this tool does :: Beth mae'r offeryn hwn yn ei wneud",
    "ps": [
     "Gellir selio isdeitlau y tu mewn i ffeil fideo yn hytrach na sefyll ar eu pen eu hunain. I'w golygu, eu cyfieithu neu eu paru mae'n rhaid i chi eu cael allan yn gyntaf — dyna'r un peth y mae'r dudalen hon yn ei wneud."
    ]
   },
   {
    "h2": "1 Add the video :: 1 Ychwanegu'r fideo",
    "ps": [
     "Llusgwch ffeil fideo i'r golofn gyntaf neu cliciwch i ddewis un. Dim ond **MKV / WebM** a **MP4 / MOV** sy'n cael eu cydnabod; fydd cynwysyddion eraill ddim yn cynhyrchu unrhyw trac.",
     "Nid yw'r ffeil yn gadael eich cyfrifiadur byth — nid oes cam lanlwytho. Mae'r offeryn yn darllen mewn darnau bach fesur gwrthbwyso, felly nid yw ffilm aml-gigabeit yn llenwi'r cof, ond mae'n rhaid i'r darlleniad cyntaf sganio trwy'r wybodaeth trac unwaith."
    ],
    "img": {
     "file": "videosub-up",
     "alt": "Ardal ychwanegu-fideo'r dudalen tynnu isdeitlau mewnol",
     "cap": "Cefnogir MKV / WebM a MP4 / MOV, ac nid yw'r ffeil yn gadael eich peiriant byth"
    }
   },
   {
    "h2": "2 Y traciau isdeitlau mewnol",
    "ps": [
     "Unwaith y bydd y darlleniad yn gorffen, mae'r ail golofn yn rhestru'r traciau isdeitlau yn y ffeil **un fesur rhes**, fel rheol gydag iaith ac enw trac (er enghraifft \"Tsieinëeg\", \"Saesneg\", \"Gorfodol\"). Cliciwch res i dynnu'r trac hwnnw.",
     "Pan fydd y ffeil yn dal dim ond un trac isdeitl, mae'r tynnu'n dechrau'n awtomatig — dim angen clicio.",
     "**Ni ellir tynnu isdeitlau delwedd**: mae isdeitlau PGS Blu-ray a DVD yn ddelweddau wedi'u llosgi yn y llif heb destun i'w gymryd, ac mae'r dudalen yn dweud hynny'n eglur; mae angen OCR ar y rhe റേ."
    ],
    "img": {
     "file": "videosub-track",
     "alt": "Y rhestr o draciau isdeitlau mewnol, un fesur rhes",
     "cap": "Un trac fesur rhes; pan nad oes ond un, mae tynnu'n dechrau'n awtomatig"
    }
   },
   {
    "h2": "3 The result :: 3 Y canlyniad",
    "ps": [
     "Mae \"3 Result\" ar y dde yn dangos y testun isdeitlau a dynnwyd, gyda'r fformat allforio uwchben: **SRT / VTT / ASS / TXT**. Cliciwch \"Lawrlwytho\" neu \"Copïo\".",
     "Pan fo'r trac ffynhonnell yn ASS, mae ei bennyn arddull ei hun a'r cydraniad yn dod yn ôl heb eu newid — mae allforio fel ASS yn eu cadw, tra bod allforio fel SRT yn cludo'r testun yn unig."
    ],
    "img": {
     "file": "videosub-out",
     "alt": "Yr ardal ganlyniad gyda'r dewis fformat SRT / VTT / ASS / TXT",
     "cap": "Pedwar fformat allforio; mae ffynhonnell ASS yn cadw ei bennyn arddull a'i chydraniad"
    }
   },
   {
    "h2": "Beth sy'n cael ei adael heb ei gyffwrdd",
    "ps": [
     "Ni chyffysir y ffeil fideo ei hun o gwbl — darllen yn unig, dim ysgrifennu, dim traws-amgodio, dim ail-gymysgu.",
     "Daw cynnwys yr isdeitlau allan fel y mae: dim dyfalu amgodio, dim cywiro llinell amser. Os yw'r isdeitlau a dynnwyd wedi'u llygru, mae hwnnw'n broblem amgodio yn y trac ffynhonnell — ewch ju ag ef i [[Atgyweirio testun llygredig|/repair.html]]."
    ]
   },
   {
    "h2": "Common questions :: Cwestiynau cyffredin",
    "ps": [
     "**A oes gwir ddim ffordd i drin isdeitlau delwedd (PGS / DVD)?** Nid ar y dudalen hon — lluniau heb haen destun ydynt. Rhaid i OCR ddod gyntaf, ac nid yw'r dudalen hon yn gwneud hynny.",
     "**Mae'r isdeitlau a dynnwyd wedi'u hamseru'n anghywir — pam?** Nid yw'r dudalen hon yn cywiro llinellau amser; yr hyn sy'n dod allan yw'r hyn oedd yno. Ar gyfer gwrthbwyso byd-eang neu broblem gyfradd defnyddiwch [[Addasu llinell amser|/shift.html]].",
     "**Pam mae'n cymryd cymaint o amser cyn i unrhyw beth ddigwydd?** Mae'n rhaid sganio ffeil fawr darn wrth ddarn am wybodaeth trac, a po fwyaf y ffeil y mwyaf o amser y mae'n ei gymryd; mae hyn yn digwydd yn lleol ac nid oes a wnelo â'ך gysylltiad.",
     "**A gaf i ddefnyddio'r dudalen hon ar gyfer ffeiliau isdeitlau allanol?** Nid oes angen i chi wneud — mae .srt / .ass allanol yn mynd yn syth i [[Trosi fformat|/convert.html]] neu offeryn arall. Mae'r dudalen hon ar gyfer isdeitlau sydd wedi'u selio y tu mewn i fideo."
    ]
   },
   {
    "h2": "Privacy :: Preifatrwydd",
    "ps": [
     "Darllenir y fideo yn llwyr yn y porwr: ni lwythir dim i fyny, dim yn cael ei draws-amgodio, dim yn mynd trwy weinydd. Cae'r dudalen a chaiff y data a ddarllenwyd ei ryddhau."
    ]
   },
   {
    "h2": "Offer a chanllawiau cysylltiedig",
    "ps": [
     "I gyfieithu'r hyn rydych chi'n ei dynnu ewch i [[Cyfieithu isdeitlau|/translate.html]], i'w wneud yn ddwyieithog gweler [[Dwy ffordd i wneud isdeitlau dwyieithog|/guides/make-bilingual-subtitles.html]]; am y gwahaniaeth rhwng traciau mewnol ac allanol, a pha rai y gellir eu tynnu, gweler [[Sut i gael isdeitlau allan o fideo|/guides/extract-subtitles-from-video.html]]."
    ]
   }
  ]
 },
 "vtt-to-srt": {
  "seo": {
   "title": "Troswr VTT i SRT – Trosi Isdeitlau WebVTT – AI-SRTSub",
   "desc": "Trosi isdeitlau VTT (WebVTT) i SRT ar gyfer golygyddion a chwaraewyr sy'n cymryd SRT yn unig. Mae pennyn WEBVTT a blociau NOTE yn cael eu glanhau'n awtomatig. Yn rhedeg yn eich porwr.",
   "h1": "VTT to SRT :: VTT i SRT",
   "intro": "Troi isdeitlau VTT (WebVTT) yn SRT: gollwng y ffeil, dewis SRT, lawrlwytho. Mae'r pennyn a'r blociau nodiadau yn cael eu glanhau ac mae'r stampiau amser yn mynd yn ôl i nodiant comma.",
   "ctaText": "Convert VTT → SRT :: Trosi VTT → SRT"
  },
  "body": [
   {
    "h2": "Pryd mae angen SRT yn ôl",
    "ps": [
     "Mae CapCut, Premiere, y mwyafrif o chwaraewyr bwrdd gwaith, ac offer isdeitlau hŷn yn derbyn **SRT** yn unig. Mae isdeitlau a dlawrlwythwyd o'r we neu o YouTube fel arfer yn dod fel VTT — eu trosi i SRT i'w mewnforio'n uniongyrchol."
    ]
   },
   {
    "h2": "Beth sy'n cael ei lanhau o'r VTT",
    "ps": [
     "Nid testun isdeitlau yw llinell bennyn **WEBVTT**, blociau NOTE, blociau STYLE/REGION, a gosodiadau cliw ar ôl y llinell amseru (fel align:start) — maent yn cael eu gollwng yn awtomatig; adferir rhifo ac mae'r gwahanydd milieiliad yn mynd yn ôl o dot i goma."
    ],
    "img": {
     "file": "convert-upload-vtt",
     "alt": "Ardal lanlwytho: ffeil VTT wedi'i llwytho, wedi'i chanfod fel VTT",
     "cap": "Mae ffeil gyda phennyn WEBVTT yn cael ei chanfod fel VTT ar unwaith"
    }
   },
   {
    "h2": "How to convert :: Sut i drosi",
    "ps": [
     "Agorwch y [[troswr|/convert.html]], gollwng y VTT i mewn, dewiswch **SRT - SubRip** fel yr allbwn, yna trosi a lawrlwytho. Mae'r gwerthoedd testun ac amseru yn aros heb eu cyffwrdd."
    ],
    "img": {
     "file": "convert-result-srt",
     "alt": "Canlyniad trosi: rhifo SRT gyda stampiau amser coma",
     "cap": "Yr SRT wedi'i drosi: rhifau cliw + stampiau amser coma"
    }
   }
  ]
 }
};
